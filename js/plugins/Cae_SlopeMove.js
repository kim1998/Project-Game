// ==================================================
// Cae_SlopeMove.js
// ==================================================

/**
 * @file Cae_SlopeMove.js (RMMZ)
 * Simulate slopes using regions and diagonal movement.
 * @author Caethyril
 * @version 1.3
 */

//#region Plugin Header
/*:
 * @target MZ
 * @plugindesc v1.3 - Makes left-right movement go up/down slopes.
 * @author Caethyril
 * @url https://forums.rpgmakerweb.com/index.php?threads/125657/
 * 
 * @help Features:
 *   Set slope regions in the plugin parameters:
 *     - "Up" slopes go this way:   /
 *     - "Down" slopes go this way: \
 *   Place slope regions in diagonal lines along passable slopes.
 *   Diagonal movement will be checked when moving from a slope region.
 *   Slope (up/down) and move (left/right) determine which tile is checked.
 *   If that tile's slope (up/down) is the same then move diagonally!
 * 
 * Plugin Commands:
 *   Add    - add slope regions during gameplay.
 *   Remove - remove slope regions during gameplay.
 *   Toggle - remove slope regions if active, else add them.
 * 
 *  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Terms of use:
 *   This plugin is free to use and/or modify, under these conditions:
 *     - None of the original plugin header is removed.
 *     - Credit is given to Caethyril for the original work.
 * 
 *  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Compatibility:
 *   Aliases:   Game_CharacterBase:
 *                moveStraight, moveDiagonally, checkEventTriggerTouchFront
 *              Game_Player:
 *                moveStraight, moveDiagonally
 *              Game_Character:
 *                turnTowardCharacter, turnAwayFromCharacter
 *              DataManager:
 *                createGameObjects, makeSaveContents, extractSaveContents
 *   Defines:   Game_CharacterBase:
 *                isSlopeThru, getSlopeNext, slopeCheck
 *   This plugin adds data to save files iff its Add Save Data param = true.
 * 
 *  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Changelog:
 *   v1.3 (2022-06-26): Fixed - Face Away from Player works with Face Sideways.
 *   v1.2 (2021-09-06): Added - safety check for improved compatibility.
 *   v1.1 (2020-08-22): Fixed - plugin data should now save/load correctly.
 *   v1.0 (2020-08-21): Initial release! Rewrite of RMMV version.
 * 
 * @command Add
 * @desc Add a slope region during gameplay.
 * 
 * @arg Slope
 * @type combo
 * @option Up
 * @option Down
 * @desc Choose the slope direction.
 * 
 * @arg Regions
 * @type number[]
 * @min 1
 * @max 255
 * @desc Slope region IDs to add.
 * @default []
 * 
 * @command Remove
 * @desc Remove a slope region during gameplay.
 * 
 * @arg Slope
 * @type combo
 * @option Up
 * @option Down
 * @desc Choose the slope direction.
 * 
 * @arg Regions
 * @type number[]
 * @min 1
 * @max 255
 * @desc Slope region IDs to remove.
 * @default []
 * 
 * @command Toggle
 * @desc Toggle slope regions during gameplay.
 * 
 * @arg Slope
 * @type combo
 * @option Up
 * @option Down
 * @desc Choose the slope direction.
 * 
 * @arg Regions
 * @type number[]
 * @min 1
 * @max 255
 * @desc Slope region IDs to toggle.
 * (Remove if it is a slope region, add if not.)
 * @default []
 * 
 * @param Up Slope Regions
 * @type number[]
 * @min 1
 * @max 255
 * @desc Region IDs used for up slopes /
 * @default []
 * 
 * @param Down Slope Regions
 * @type number[]
 * @min 1
 * @max 255
 * @desc Region IDs used for down slopes \
 * @default []
 * 
 * @param Move Through
 * @type boolean
 * @desc If true, slope moves force through on. Useful for narrow stairs. Same as Characters priority events still block.
 * @default true
 * 
 * @param Face Sideways
 * @type boolean
 * @desc If true, will prioritise side-facing directions when turning toward characters where x & y distances are equal.
 * @default true
 * 
 * @param Add Save Data
 * @type boolean
 * @desc If true, add slope region data to save files.
 * Unnecessary if not using the plugin commands.
 * @default false
 * 
 * @param --- Advanced ---
 * @type select
 * @desc Advanced internal configuration options.
 * 
 * @param Save Property: Up
 * @parent --- Advanced ---
 * @type string
 * @desc Key for the "Up" slope data property in save files.
 * @default slopeMoveRegUp
 * 
 * @param Save Property: Down
 * @parent --- Advanced ---
 * @type string
 * @desc Key for the "Down" slope data property in save files.
 * @default slopeMoveRegDown
 */
//#endregion Plugin Header

(function() {
'use strict';

    const NAMESPACE   = 'SlopeMove';
    const PLUGIN_NAME = 'Cae_' + NAMESPACE;
    const ERR_PRE     = PLUGIN_NAME + '.js ';
    const ERR_NOPARAM = ERR_PRE + 'could not find its parameters!\nCheck the plugin is named correctly and try again.';

    window.CAE = window.CAE || {};              // Author namespace

    (($, U) => {

        Object.defineProperty($, 'VERSION', { value: 1.3 });    // Version declaration
        window.Imported = window.Imported || {};                // Import namespace
        Imported[PLUGIN_NAME] = $.VERSION;                      // Import declaration

    // ======== Utility (share) ======== //

        (function(f) { if (U[f]) return;
            /** 
             * For use with Array.filter: rejects duplicate array elements.
             * @memberof CAE.Utils
             * @name filterUnique
             */
            U[f] = function(e, i, arr) { return arr.indexOf(e) === i; }
        })('filterUnique');

    // ======== Parameter stuff ======== //

        void (p => {

            if (!p) { SceneManager.showDevTools(); throw new Error(ERR_NOPARAM); };

            $.thru = p['Move Through'] === 'true';
            $.side = p['Face Sideways'] === 'true';
            $.save = p['Add Save Data'] === 'true';

            Object.defineProperty($, 'SAVE_UP', {
                value: (v => v ? v : 'slopeMoveRegUp')(String(p['Save Property: Up'] || '').trim())
            });

            Object.defineProperty($, 'SAVE_DN', {
                value: (v => v ? v : 'slopeMoveRegDn')(String(p['Save Property: Down'] || '').trim())
            });

        })($.params = PluginManager.parameters(PLUGIN_NAME));

    // ========= Init Routines ========= //

        /** Initialises slope region data. */
        $._initRegions = function() {
            $.rUp = JSON.parse($.params['Up Slope Regions'] || '[]').map(Number).filter(U.filterUnique);
            $.rDn = JSON.parse($.params['Down Slope Regions'] || '[]').map(Number).filter(U.filterUnique);
        };
        $._initRegions();

    // ======== Utility (local) ======== //

        /**
         * @param {Boolean} isUp Slope type: true (up) or false (down)
         * @returns {Number[]} Corresponding array of active slope region IDs.
         */
        $.getSlopeArr = function(isUp) { return isUp ? $.rUp : $.rDn; };

        /**
         * Calculates the appropriate y-movement corresponding to the input left/right direction and slope gradient.
         * @param {Number} d - direction: 4 (left) or 6 (right)
         * @param {Number} m - slope gradient: 1 (up) or -1 (down)
         * @returns {Number} The corresponding y-movement: 2 (down) or 8 (up)
         */
        $.getYMove = function(d, m) { return 5 + 3 * m * (d - 5); };

        /**
         * Converts an input direction to an offset in its axis.
         * @param {Number} d - numpad direction: 2, 4, 6, or 8
         * @returns {Number} direction of offset: 1 or -1
         */
        $.dirToOffset = function(d) {
            switch (d) {
                case 4: case 8: return -1;
                case 6: case 2: return  1;
                default:        return  0;
            }
        };

        /**
         * Converts input offsets dx and dy to a facing direction.
         * Bias to side-facing directions when offsets are equal.
         * @param {Number} dx - x-axis offset: 1 or -1
         * @param {Number} dy - y-axis offset: 1 or -1
         * @returns {Number} Numpad direction: 2, 4, 6, or 8
         */
        $.getDirectionByOffset = function(dx, dy) {
            if (Math.abs(dy) > Math.abs(dx)) {
                return dy > 0 ? 8 : 2;
            } else {
                return dx > 0 ? 4 : 6;
            }
        };

        /**
         * Converts two input coordinate pairs to a direction (1 facing 2).
         * Prefers side-facing directions when x & y separations are equal.
         * @param {Number} x1 - X coordinate of agent 1
         * @param {Number} y1 - Y coordinate of agent 1
         * @param {Number} x2 - X coordinate of agent 2
         * @param {Number} y2 - Y coordinate of agent 2
         * @returns {Number} Numpad direction: 2, 4, 6, or 8
         */
        $.getDirectionByCoords = function(x1, y1, x2, y2) {
            const dx = $gameMap.deltaX(x1, x2);
            const dy = $gameMap.deltaY(y1, y2);
            return $.getDirectionByOffset(dx, dy);
        };

        /**
         * For compatibility with OverpassTile plugin.
         * @param {Number} x - X coordinate of tile
         * @param {Number} y - Y coordinate of tile
         * @returns {Boolean} True iff tile is an overpass
         */
        $.isOverpassTile = function(x, y) {
            // Like this in case it gets called on a scene without a spriteset/tilemap.
            const tilemap = SceneManager._scene._spriteset?._tilemap || this;
            return Tilemap.prototype._isOverpassPosition.call(tilemap, x, y);
        };

        /**
         * Checks whether a region ID denotes an "Up" slope.
         * @param {Number} regionId - Region ID to check
         * @returns {Boolean} True iff given region is an "Up" slope
         */
        $.isSlopeUp = function(regionId) { return $.getSlopeArr(true).includes(regionId); };

        /**
         * Checks whether a region ID denotes a "Down" slope.
         * @param {Number} regionId - Region ID to check
         * @returns {Boolean} True iff given region is a "Down" slope
         */
        $.isSlopeDn = function(regionId) { return $.getSlopeArr(false).includes(regionId); };

        /**
         * Checks whether diagonal movement should be processed.
         * Move direction must be left or right and there must be a non-zero slope gradient.
         * @param {Number} d - Numpad direction of movement
         * @param {Number} m - Gradient of slope: 1, 0, or -1
         * @returns {Boolean} True iff move is left/right and slope is non-zero
         */
        $.isSlopeMove = function(d, m) { return [4,6].includes(d) && m !== 0; };

        /**
         * Adds a region to the specified slope list.
         * @param {Boolean} isUp - Slope type: true (up) or false (down)
         * @param {Number} regionId - Region ID to add
         * @returns {Boolean} True iff region was not already present in the list
         */
        $.addRegion = function(isUp, regionId) {
            const arr = $.getSlopeArr(isUp);
            if (!arr.includes(regionId)) {
                arr.push(regionId);
                return true;
            }
            return false;
        };

        /**
         * Removes a region from the specified slope list.
         * @param {Boolean} isUp - Slope type: true (up) or false (down)
         * @param {Number} regionId - Region ID to remove
         * @returns {Boolean} True iff region was present in the list and has been removed
         */
        $.removeRegion = function(isUp, regionId) {
            const arr = $.getSlopeArr(isUp);
            const ix = arr.indexOf(regionId);
            if (ix > -1) {
                arr.splice(ix, 1);
                return true;
            }
            return false;
        };

        /**
         * Checks for region in specified slope list: removes it if present, adds it if not.
         * @param {Boolean} isUp - Slope type: true (up) or false (down)
         * @param {Number} regionId - Region ID to toggle
         * @returns {Boolean} True
         */
        $.toggleRegion = function(isUp, regionId) {
            const arr = $.getSlopeArr(isUp);
            const ix = arr.indexOf(regionId);
            if (ix > -1) arr.splice(ix, 1);
            else arr.push(regionId);
            return true;
        };

    // ======== Plugin Commands ======== //

        $.com = {
            /**
             * @param {{"Slope":string,"Regions":string}} args - Raw command arguments
             * @returns {{isUp:Boolean,r:Number[]}} Type-parsed command arguments
             */
            parseSlopeArgs: function(args) {
                const r = JSON.parse(args.Regions || '[]');
                return {
                    isUp: String(args.Slope || '').toUpperCase() === 'UP',
                    r: Array.isArray(r) ? r.map(n => parseInt(n, 10)) : []
                };
            },
            /**
             * Plugin command: add slope regions during gameplay.
             * @param {{"Slope":string,"Regions":string}} args - Plugin command arguments.
             * @returns {Boolean} True iff all specified regions were added successfully.
             */
            add: function(args) {
                const g = $.com.parseSlopeArgs(args);
                return g.r.reduce((a, c) => $.addRegion(g.isUp, c) || a, false);
            },
            /**
             * Plugin command: remove slope regions during gameplay.
             * @param {{"Slope":string,"Regions":string}} args - Plugin command arguments.
             * @returns {Boolean} True iff all specified regions were removed successfully.
             */
            rem: function(args) {
                const g = $.com.parseSlopeArgs(args);
                return g.r.reduce((a, c) => $.removeRegion(g.isUp, c) || a, false);
            },
            /**
             * Plugin command: toggle slope regions on/off during gameplay.
             * @param {{"Slope":string,"Regions":string}} args - Plugin command arguments.
             * @returns {Boolean} True iff all specified regions were toggled successfully.
             */
            tog: function(args) {
                const g = $.com.parseSlopeArgs(args);
                return g.r.reduce((a, c) => $.toggleRegion(g.isUp, c) || a, false);
            }
        };
        PluginManager.registerCommand(PLUGIN_NAME, 'Add', $.com.add);
        PluginManager.registerCommand(PLUGIN_NAME, 'Remove', $.com.rem);
        PluginManager.registerCommand(PLUGIN_NAME, 'Toggle', $.com.tog);

    // ============ Extends ============ //

        /**
         * Checks a given tile to see whether the automatic through should be enabled.
         * @param {Number} x - X coordinate of tile to check
         * @param {Number} y - Y coordinate of tile to check
         * @returns {Boolean} True iff "Move Through" parameter is true and there are no colliding characters on the tile
         */
        Game_CharacterBase.prototype.isSlopeThru = function(x, y) {
            if (!$.thru) return false;                      // Insta-nope if parameter ain't set
            return !this.isCollidedWithCharacters(x, y);    // Collide with characters (player, events, vehicles)
        };

        /**
         * Gets the next tile for slope movement given the current move direction and slope.
         * @param {Number} d - Numpad move direction
         * @param {Number} m - Slope gradient: -1, 0, or 1
         * @returns {{x:Number,y:Number}} tile coordinates
         */
        Game_CharacterBase.prototype.getSlopeNext = function(d, m) {
            return {    
                x: $gameMap.roundXWithDirection(this.x, d),
                y: $gameMap.roundYWithDirection(this.y, $.getYMove(d, m))
            };
        };

        /**
         * Gets the current slope gradient for this character.
         * @param {Number} d - Numpad move direction
         * @returns {Number} Slope gradient: -1, 0, or 1
         */
        Game_CharacterBase.prototype.slopeCheck = function(d) {
            if ($.isOverpassTile(this.x, this.y) && !this._higherLevel) return 0;           // No slope moves under overpass
            if (!$.isSlopeMove(d)) return 0;                                                // Slope only in given direction
            const r0 = $gameMap.regionId(this.x, this.y);                                   // Get current tile region
            const tU = this.getSlopeNext(d,  1), tD = this.getSlopeNext(d, -1);             // Target up-/down-slope tiles
            const rU = $gameMap.regionId(tU.x, tU.y), rD = $gameMap.regionId(tD.x, tD.y);   // Target tiles' region IDs
            if ($.isSlopeUp(r0) && $.isSlopeUp(rU)) {                                       // If current and target are up
                return  1;                                                                  // Return 1 = up-slope
            } else if ($.isSlopeDn(r0) && $.isSlopeDn(rD)) {                                // If current and target are down
                return -1;                                                                  // Return -1 = down-slope
            }
            return 0;                                                                       // Else zero, no slope
        };

    // ========== Alterations ========== //

        $.alias = $.alias || {};        // This plugin's alias namespace

        // Alias! Make sideways moves go diagonally if on a slope.
        void (alias => {
            Game_CharacterBase.prototype.moveStraight = function(d) {
                const slope = this.slopeCheck(d);
                if ($.isSlopeMove(d, slope)) {                                      // If you're slopin' up or down
                    this.setDirection(d);                                           // Make sure you're facing sideways
                    const wasThru = this.isThrough();                               // Remember if you're passin' thru
                    const dest = this.getSlopeNext(d, slope);                       // Get destination tile, too
                    this.setThrough(wasThru || this.isSlopeThru(dest.x, dest.y));   // Something something through on
                    this.moveDiagonally(d, $.getYMove(d, slope));                   // Here's the diagonal move you were after!
                    this.setThrough(wasThru);                                       // Restore original through flag
                } else {
                    alias.apply(this, arguments);                                   // Else callback
                }
            };
        })($.alias.Game_CharacterBase_moveStraight = Game_CharacterBase.prototype.moveStraight);

        // Alias! To prevent follower glitches (bunching/teleporting).
        void (alias => {
            Game_Player.prototype.moveStraight = function(d) {
                const slope = this.slopeCheck(d);
                if (!$.isSlopeMove(d, slope)) alias.apply(this, arguments);
                else Game_Character.prototype.moveStraight.apply(this, arguments);
            };
        })($.alias.Game_Player_moveStraight = Game_Player.prototype.moveStraight);
        
        // Alias! On-slope event trigger: Touch.
        void (alias => {
            Game_CharacterBase.prototype.moveDiagonally = function(horz, vert) {
                alias.apply(this, arguments);
                if (!this.isMovementSucceeded()) {                                  // If move was blocked
                    const dx = $.dirToOffset(horz), dy = $.dirToOffset(vert);       // Offsets from input directions
                    const dest = { x: this.x + dx, y: this.y + dy };                // Get attempted move location
                    if (this.isCollidedWithCharacters(dest.x, dest.y)) {            // If collided
                        this.checkEventTriggerTouch(dest.x, dest.y);                // Check trigger
                    }
                }
            };
        })($.alias.Game_CharacterBase_moveDiagonally = Game_CharacterBase.prototype.moveDiagonally);

        // Alias! On-slope event trigger: Touch (normal priority).
        void (alias => {
            Game_CharacterBase.prototype.checkEventTriggerTouchFront = function(d) {
                const slope = this.slopeCheck(d);
                if (slope === 0) alias.apply(this, arguments);
                else {
                    const dest = this.getSlopeNext(d, slope);
                    if (this.isCollidedWithCharacters(dest.x, dest.y)) this.checkEventTriggerTouch(dest.x, dest.y);
                }
            };
        })($.alias.Game_CharacterBase_checkEventTriggerTouchFront = Game_CharacterBase.prototype.checkEventTriggerTouchFront);

        // Alias! On-slope event trigger: Action Button.
        void (alias => {
            Game_Player.prototype.checkEventTriggerThere = function(triggers) {        // Checks for activating events on slope
                const d = this.direction();
                const slope = this.slopeCheck(d);
                if (slope === 0) alias.apply(this, arguments);
                else {                                // I'm on a slope!
                    if (this.canStartLocalEvents()) {
                        const dest = this.getSlopeNext(d, slope);
                        this.startMapEvent(dest.x, dest.y, triggers, true);
                    }
                }
            };
        })($.alias.Game_Player_checkEventTriggerThere = Game_Player.prototype.checkEventTriggerThere);

        // Alias! If option set, prefer side facing when abs(dx) = abs(dy) (e.g. slope collisions)
        void (alias => {
            Game_Character.prototype.turnTowardCharacter = function(character) {
                if ($.side) {
                    const d = $.getDirectionByCoords(this.x, this.y, character.x, character.y);
                    this.setDirection(d);
                } else alias.apply(this, arguments);
            };
        })($.alias.Game_Character_turnTowardCharacter = Game_Character.prototype.turnTowardCharacter);

        // Alias! If option set, prefer side facing when abs(dx) = abs(dy) (e.g. slope collisions)
        void (alias => {
            Game_Character.prototype.turnAwayFromCharacter = function(character) {
                if ($.side) {
                    const d = $.getDirectionByCoords(this.x, this.y, character.x, character.y);
                    this.setDirection(this.reverseDir(d));
                } else alias.apply(this, arguments);
            };
        })($.alias.Game_Character_turnAwayFromCharacter = Game_Character.prototype.turnAwayFromCharacter)

        // Alias! Initialise slope regions on new game.
        void (alias => {
            DataManager.createGameObjects = function() {
                alias.apply(this, arguments);
                $._initRegions();
            }
        })($.alias.DataManager_createGameObjects = DataManager.createGameObjects);

        // Alias! If option set, add slope regions to save files.
        void (alias => {
            DataManager.makeSaveContents = function() {
                let contents = alias.apply(this, arguments);
                if ($.save) {
                    contents[$.SAVE_UP] = $.getSlopeArr(true);
                    contents[$.SAVE_DN] = $.getSlopeArr(false);
                }
                return contents;
            };
        })($.alias.DataManager_makeSaveContents = DataManager.makeSaveContents);

        // Alias! If present in save data, extract slope regions.
        void (alias => {
            DataManager.extractSaveContents = function(contents) {
                alias.apply(this, arguments);
                $._initRegions();
                const upData = contents[$.SAVE_UP], dnData = contents[$.SAVE_DN];
                if ($.save && (upData || dnData)) {
                    if (upData) $.rUp = upData;
                    if (dnData) $.rDn = dnData;
                }
            };
        })($.alias.DataManager_extractSaveContents = DataManager.extractSaveContents);

    })(CAE[NAMESPACE] = CAE[NAMESPACE] || {}, CAE.Utils = CAE.Utils || {});

})();