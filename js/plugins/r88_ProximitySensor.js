/*:
@target MZ
@plugindesc Calculates proximity and line of sight.
@author reflector88
@url https://reflector88.itch.io/
@help 

"Proximity Sensor 1.4"
This plugin activates a switch/self-switch when an event is in proximity to
the player. This is useful for roaming enemies, stealth sequences, and traps.
Also has options for direction, line of sight, and stealth kills.

Update
-V1.1 Added "Facing in a Line"
-V1.2 Switches now toggle; improved compatibility
-V1.3 Fixed crashing when used with certain pixel movement scripts
-V1.4 Added "Enable Stealth Kill" plugin command
____________________________________________________________________________
CONFIGURATION
1. Open the event commands window and select "Plugin Command"

2. Select the type of proximity you want to use:
    "All Directions" - Checks in every direction.
    "Facing" - Checks only the direction the event is facing.
    "Orthogonal Directions" - Checks only in a cross shape.
    "Facing in a Line" - Combination of Facing and Orthogonal.

3. Set Operator and Distance to determine the event's sight range
    (i.e. "less than 3" checks if the player is less than 3 tiles away)

4. Set the Switch and/or Self-Switch to toggle when event is in proximity.

5. Use the "Enable Stealth Kill" command to interact with the event

6. Set Region ID and/or Terrain Tag to denote obstacles in the map editor.
____________________________________________________________________________

TERMS OF USE
This plugin is free to use in both commercial and non-commercial projects,
though please credit me.


@param Obstacle Region ID
@type number
@desc Regions with this ID will block line of sight.
@default 1

@param Obstacle Terrain Tag
@type number
@desc Terrain with this tag will block line of sight.
@default 1

@command Basic
@text All Directions
@desc Checks if this event is in proximity of the player.

    @arg Operator
    @type select
    @option less than @option less than or equal to @option equals @option greater than or equal to @option greater than
    @default less than or equal to
    @desc The comparison operator.

    @arg Distance
    @type number
    @default 3
    @desc The distance to be compared with the player's proximity to this event.

    @arg Self-Switch
    @type select
    @option 0 @option A @option B @option C @option D
    @default A
    @desc Switch is toggled if the proximity condition is fulfilled.

    @arg Switch
    @type switch
    @default 0
    @desc Switch is toggled if the proximity condition is fulfilled.

@command Facing
@text Facing
@desc Checks if this event is facing and in proximity of the player.

    @arg Operator
    @type select
    @option less than @option less than or equal to @option equals @option greater than or equal to @option greater than
    @default less than or equal to
    @desc The comparison operator.

    @arg Distance
    @type number
    @default 3
    @desc The distance to be compared with the player's proximity to this event.

    @arg Self-Switch
    @type select
    @option 0 @option A @option B @option C @option D
    @default A
    @desc Switch is toggled if the proximity condition is fulfilled.

    @arg Switch
    @type switch
    @default 0
    @desc Switch is toggled if the proximity condition is fulfilled.

@command Orthogonal
@text Orthogonal Directions
@desc Checks if this event is in proximity of and in line with the player.

    @arg Operator
    @type select
    @option less than @option less than or equal to @option equals @option greater than or equal to @option greater than
    @default less than or equal to
    @desc The comparison operator.

    @arg Distance
    @type number
    @default 3
    @desc The distance to be compared with the player's proximity to this event.

    @arg Self-Switch
    @type select
    @option 0 @option A @option B @option C @option D
    @default A
    @desc Switch is toggled if the proximity condition is fulfilled.

    @arg Switch
    @type switch
    @default 0
    @desc Switch is toggled if the proximity condition is fulfilled.

@command FacingLine
@text Facing in a Line
@desc Checks if this event is in proximity, in line, and facing the player.

    @arg Operator
    @type select
    @option less than @option less than or equal to @option equals @option greater than or equal to @option greater than
    @default less than or equal to
    @desc The comparison operator.

    @arg Distance
    @type number
    @default 3
    @desc The distance to be compared with the player's proximity to this event.

    @arg Self-Switch
    @type select
    @option 0 @option A @option B @option C @option D
    @default A
    @desc Switch is toggled if the proximity condition is fulfilled.

    @arg Switch
    @type switch
    @default 0
    @desc Switch is toggled if the proximity condition is fulfilled.


@command EnableStealthKill
@text Enable Stealth Kill
@desc Allows you to interact with the event to activate a switch.

    @arg Self-Switch
    @type select
    @option 0 @option A @option B @option C @option D
    @default B
    @desc Switch is toggled when player interacts.

    @arg Switch
    @type switch
    @default 0
    @desc Switch is toggled when player interacts.
*/

(() => {
    'use strict';
    var r88 = r88 || {};
    r88.PS = r88.PS || {};
    r88.PS.parameters = PluginManager.parameters('r88_ProximitySensor');
    r88.PS.regionId = r88.PS.parameters["Obstacle Region ID"];
    r88.PS.terrainTag = r88.PS.parameters["Obstacle Terrain Tag"];

    function r88_isProx(args) {
        const playerX = $gamePlayer.x;
        const playerY = $gamePlayer.y;
        const eventX = $gameMap.event(this._eventId).x;
        const eventY = $gameMap.event(this._eventId).y;
        const operator = args['Operator'];
        const distance = args['Distance'];
        const proximity = (Math.sqrt(Math.pow(eventX - playerX, 2) +
            Math.pow(eventY - playerY, 2)));

        switch (operator) {
            case 'less than': return proximity < distance;
            case 'less than or equal to': return proximity <= distance;
            case 'equals': return proximity === distance;
            case 'greater than or equal to': return proximity >= distance;
            case 'greater than': return proximity > distance;
            default: return false;
        }
    }

    function r88_isFacing() {
        const dir = $gameMap.event(this._eventId).direction();
        const playerX = $gamePlayer.x;
        const playerY = $gamePlayer.y;
        const eventX = $gameMap.event(this._eventId).x;
        const eventY = $gameMap.event(this._eventId).y;

        if (dir == 2 && eventY < playerY || dir == 8 && eventY > playerY
            || dir == 4 && eventX > playerX || dir == 6 && eventX < playerX) {
            return true;
        } else {
            return false;
        }
    }

    function r88_isOrthogonal() {
        const playerX = $gamePlayer.x;
        const playerY = $gamePlayer.y;
        const eventX = $gameMap.event(this._eventId).x;
        const eventY = $gameMap.event(this._eventId).y;

        return playerX === eventX || playerY === eventY;
    }

    // Bresenham Algorithm for line of sight calculation
    function r88_inLineOfSight() {
        const tileCoords = [];
        const playerX = $gamePlayer.x;
        const playerY = $gamePlayer.y;
        const eventX = $gameMap.event(this._eventId).x;
        const eventY = $gameMap.event(this._eventId).y;
        const distanceX = Math.abs(playerX - eventX);
        const distanceY = Math.abs(playerY - eventY);
        const incrementX = (eventX < playerX) ? 1 : -1;
        const incrementY = (eventY < playerY) ? 1 : -1;
        let tileX = eventX;
        let tileY = eventY;
        let error = distanceX - distanceY;


        const hypotenuse = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
        let tileHypotenuse = Math.sqrt(Math.pow(tileX - eventX, 2) + Math.pow(tileY - eventY, 2));


        while (tileHypotenuse < hypotenuse) {
            tileCoords.push([tileX, tileY]);

            const error2 = 2 * error;
            if (error2 > -distanceY) {
                error -= distanceY;
                tileX += incrementX;
            }
            if (error2 < distanceX) {
                error += distanceX;
                tileY += incrementY;
            }

            tileHypotenuse = Math.sqrt(Math.pow(tileX - eventX, 2) + Math.pow(tileY - eventY, 2));
        }

        for (let i = 0; i < tileCoords.length; i++) {
            if ($gameMap.regionId(tileCoords[i][0], tileCoords[i][1]) == r88.PS.regionId ||
                $gameMap.terrainTag(tileCoords[i][0], tileCoords[i][1]) == r88.PS.terrainTag)
                return false;
        }
        return true;

    }

    function r88_canStealthKill(args) {
        const playerX = $gamePlayer.x;
        const playerY = $gamePlayer.y;
        const eventX = $gameMap.event(this._eventId).x;
        const eventY = $gameMap.event(this._eventId).y;
        const proximity = (Math.sqrt(Math.pow(eventX - playerX, 2) +
            Math.pow(eventY - playerY, 2)));
        const dir = $gamePlayer.direction();
        const playerIsFacingEnemy = (dir == 2 && playerY < eventY || dir == 8 && playerY > eventY
            || dir == 4 && playerX > eventX || dir == 6 && playerX < eventX);

        return playerIsFacingEnemy && proximity <= 1;
    }

    function r88_FlipSwitch(args) {
        if (r88_inLineOfSight.call(this)) {

            if (args['Self-Switch'] !== '0') {
                $gameSelfSwitches.setValue([this._mapId, this._eventId,
                args['Self-Switch']], !$gameSelfSwitches.value([this._mapId, this._eventId,
                args['Self-Switch']]));
            }
            $gameSwitches.setValue(args['Switch'], !$gameSwitches.value(args['Switch']));
        }
    }

    // User-defined plugin commands
    function r88_basicProx(args) {
        if (r88_isProx.call(this, args)) {
            r88_FlipSwitch.call(this, args);
        }
    }

    function r88_facingProx(args) {
        if (r88_isProx.call(this, args) && r88_isFacing.call(this)) {
            r88_FlipSwitch.call(this, args);
        }
    }

    function r88_orthogonalProx(args) {
        if (r88_isProx.call(this, args) && r88_isOrthogonal.call(this)) {
            r88_FlipSwitch.call(this, args);
        }
    }

    function r88_facingLineProx(args) {
        if (r88_isProx.call(this, args) && r88_isFacing.call(this) && r88_isOrthogonal.call(this)) {
            r88_FlipSwitch.call(this, args);
        }
    }

    function r88_enableStealthKill(args) {
        if (r88_canStealthKill.call(this, args) && Input.isPressed("ok")) {
            r88_FlipSwitch.call(this, args);
        }
    }


    PluginManager.registerCommand("r88_ProximitySensor", "Basic", r88_basicProx);
    PluginManager.registerCommand("r88_ProximitySensor", "Facing", r88_facingProx);
    PluginManager.registerCommand("r88_ProximitySensor", "Orthogonal", r88_orthogonalProx);
    PluginManager.registerCommand("r88_ProximitySensor", "FacingLine", r88_facingLineProx);
    PluginManager.registerCommand("r88_ProximitySensor", "EnableStealthKill", r88_enableStealthKill);
})();