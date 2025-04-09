/*:
 * @plugindesc v1.7 Moves Actor Command/Help windows near actor, option for transparent/custom width commands.
 * @author Your Name (or AI Assistant)
 * @target MZ
 * @url URL_TO_PLUGIN_INFO
 *
 * @help
 * BattleHUD.js
 * Version 1.7
 *
 * This plugin repositions Actor Command/Help windows near the active actor
 * and optionally makes the command window transparent with customizable
 * button widths.
 *
 * New in v1.7:
 * - Fixed crash "this.windowHeight is not a function" during initialization
 *   by adjusting the timing of window size calculations.
 * - Size checks are now triggered reliably after initialization is complete.
 * - Added more safety checks for robustness.
 *
 * Configuration:
 * - Command Window Offset X/Y: Position relative to actor sprite.
 * - Move Help Window?: Toggles Help Window movement.
 * - Help Window Offset X/Y: Help window position relative to command window.
 * - Default Command X/Y: Position when no actor is active (-1 for original).
 * - Make Command Window Transparent?: Set to YES for transparent commands.
 * - Transparent Command Padding: Internal padding for text/cursor positioning.
 * - Command Button Width: Fixed width for each command button (-1 for default).
 *
 * Screen Clamping (Automatic):
 * Windows are kept on screen. Help Window may move below Command Window.
 *
 * Note:
 * - Conflicts may occur with other UI plugins. Adjust plugin order.
 * - Transparency mode overrides windowskin settings for background/frame.
 *
 * Changelog:
 * v1.7: Fixed windowHeight crash during init by correcting resize timing. Added safety checks.
 * v1.6: Added Command Button Width parameter for transparent mode. Adjusted window width accordingly.
 * v1.5: Changed frameless approach to transparency, removed dynamic resizing.
 * v1.4: Fixed "numVisibleRows is not a function" crash during frameless init.
 * v1.3: Fixed initialization crash in frameless mode by changing approach.
 * v1.2: Added frameless command window option. Dynamic resizing for frameless.
 * v1.1: Improved handling of sprite finding. Added window existence checks.
 * v1.0: Initial release.
 *
 * @param --- Command Window ---
 *
 * @param commandOffsetX
 * @text Offset X
 * @desc Horizontal offset from the actor's sprite center. Negative=Left, Positive=Right.
 * @type number
 * @min -2000
 * @max 2000
 * @default 0
 *
 * @param commandOffsetY
 * @text Offset Y
 * @desc Vertical offset from the actor's sprite top edge. Negative=Up, Positive=Down.
 * @type number
 * @min -2000
 * @max 2000
 * @default -100
 *
 * @param --- Help Window ---
 *
 * @param moveHelpWindow
 * @text Move Help Window?
 * @desc Also move the Help Window along with the Command Window?
 * @type boolean
 * @on YES
 * @off NO
 * @default true
 *
 * @param helpOffsetX
 * @parent moveHelpWindow
 * @text Offset X
 * @desc Horizontal offset relative to the Command Window's position.
 * @type number
 * @min -2000
 * @max 2000
 * @default 0
 *
 * @param helpOffsetY
 * @parent moveHelpWindow
 * @text Offset Y (Above)
 * @desc Vertical offset relative to the Command Window's top edge (places Help Window ABOVE). Smaller neg value = more space.
 * @type number
 * @min -2000
 * @max 2000
 * @default -10
 *
 * @param --- Default Position ---
 *
 * @param defaultCommandX
 * @text Default X
 * @desc X position when no actor is active. -1 uses the original position.
 * @type number
 * @min -1
 * @default -1
 *
 * @param defaultCommandY
 * @text Default Y
 * @desc Y position when no actor is active. -1 uses the original position.
 * @type number
 * @min -1
 * @default -1
 *
 * @param --- Appearance ---
 *
 * @param makeWindowTransparent
 * @text Make Command Window Transparent?
 * @desc Makes the frame and background of the actor command window invisible.
 * @type boolean
 * @on YES
 * @off NO
 * @default true
 *
 * @param transparentCommandPadding
 * @parent makeWindowTransparent
 * @text Transparent Command Padding
 * @desc Internal padding (pixels) for text/cursor positioning in transparent mode.
 * @type number
 * @min 0
 * @default 4
 *
 * @param commandButtonWidth
 * @parent makeWindowTransparent
 * @text Command Button Width
 * @desc Fixed width (pixels) for each command button in transparent mode. -1 uses default calculation.
 * @type number
 * @min -1
 * @default 120
 *
 */

(() => {
    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const params = PluginManager.parameters(pluginName);

    // Positioning Params
    const commandOffsetX = parseInt(params.commandOffsetX || "0");
    const commandOffsetY = parseInt(params.commandOffsetY || "-100");
    const moveHelpWindow = params.moveHelpWindow === "true";
    const helpOffsetX = parseInt(params.helpOffsetX || "0");
    const helpOffsetY = parseInt(params.helpOffsetY || "-10");
    const defaultCommandX = parseInt(params.defaultCommandX || "-1");
    const defaultCommandY = parseInt(params.defaultCommandY || "-1");

    // Appearance Params
    const makeWindowTransparent = params.makeWindowTransparent === "true";
    const transparentCommandPadding = parseInt(params.transparentCommandPadding || "4");
    const commandButtonWidth = parseInt(params.commandButtonWidth || "-1");

    let originalCommandX = 0;
    let originalCommandY = 0;
    let originalHelpX = 0;
    let originalHelpY = 0;
    let originalPositionsStored = false;
    let sceneRef = null;
    let originalCommandWindowWidth = 0;
    let originalCommandWindowHeight = 0;


    // --- Store Original Positions & Size ---
    const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        _Scene_Battle_createAllWindows.call(this);
        sceneRef = this;
        if (!originalPositionsStored) {
            if (this._actorCommandWindow) {
                originalCommandX = this._actorCommandWindow.x;
                originalCommandY = this._actorCommandWindow.y;
                originalCommandWindowWidth = this._actorCommandWindow.width;
                originalCommandWindowHeight = this._actorCommandWindow.height;
            } else {
                console.warn(`${pluginName}: Actor Command Window not found during creation.`);
            }
            if (this._helpWindow) {
                originalHelpX = this._helpWindow.x;
                originalHelpY = this._helpWindow.y;
            } else {
                 console.warn(`${pluginName}: Help Window not found during creation.`);
            }
            originalPositionsStored = true;
        }
        // Reset positions after a short delay to ensure window is fully ready
        requestAnimationFrame(() => {
            if (sceneRef === this) { // Check if scene is still the same
                 resetWindowPositions.call(this);
            }
        });
        // resetWindowPositions.call(this); // Direct call is too early
    };

    // --- Position Windows Near Actor ---
    const _Scene_Battle_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
    Scene_Battle.prototype.startActorCommandSelection = function() {
         // Ensure window width is correct based on custom item width *before* positioning
         // This should be safe now as the window is fully initialized.
         if (this._actorCommandWindow) {
            this._actorCommandWindow.ensureCorrectWindowSize();
         }

        _Scene_Battle_startActorCommandSelection.call(this); // Default logic first

        const actor = BattleManager.actor();
        const commandWindow = this._actorCommandWindow;
        const helpWindow = this._helpWindow;

        if (!commandWindow) return;

        // --- Repositioning Logic ---
        if (actor && this._spriteset && this._spriteset._actorSprites) {
            const targetSprite = this._spriteset._actorSprites.find(sprite => sprite && sprite._actor === actor);
            if (targetSprite) {
                const spriteX = targetSprite.x;
                const spriteY = targetSprite.y;
                const spriteWidth = targetSprite.width;
                let targetCmdX = spriteX + (spriteWidth / 2) + commandOffsetX - (commandWindow.width / 2);
                let targetCmdY = spriteY + commandOffsetY;
                const screenWidth = Graphics.boxWidth;
                const screenHeight = Graphics.boxHeight;
                targetCmdX = Math.round(Math.max(0, Math.min(targetCmdX, screenWidth - commandWindow.width)));
                targetCmdY = Math.round(Math.max(0, Math.min(targetCmdY, screenHeight - commandWindow.height)));
                commandWindow.x = targetCmdX;
                commandWindow.y = targetCmdY;

                // Help Window Positioning
                if (moveHelpWindow && helpWindow) {
                    let targetHelpX = targetCmdX + helpOffsetX;
                    let targetHelpY = targetCmdY + helpOffsetY - helpWindow.height;
                    const helpFitsAbove = targetHelpY >= 0;
                    const helpCanFitBelow = (targetCmdY + commandWindow.height - helpOffsetY + helpWindow.height) <= screenHeight;
                    if (!helpFitsAbove && helpCanFitBelow) {
                         targetHelpY = targetCmdY + commandWindow.height - helpOffsetY;
                    } else if (!helpFitsAbove && !helpCanFitBelow) {
                        targetHelpY = 0;
                    }
                    targetHelpY = Math.max(0, targetHelpY);
                    targetHelpX = Math.round(Math.max(0, Math.min(targetHelpX, screenWidth - helpWindow.width)));
                    targetHelpY = Math.round(Math.max(0, Math.min(targetHelpY, screenHeight - helpWindow.height)));
                    helpWindow.x = targetHelpX;
                    helpWindow.y = targetHelpY;
                } else if (helpWindow) {
                     resetHelpWindowPosition.call(this);
                }
            } else {
                if (actor) console.warn(`${pluginName}: Could not find sprite for actor ${actor.name()}. Using default position.`);
                resetWindowPositions.call(this);
            }
        } else {
            resetWindowPositions.call(this);
        }
    };

     // --- Helper function to reset positions ---
    function resetWindowPositions() {
        const commandWindow = this._actorCommandWindow;
        if (commandWindow) {
            const targetX = (defaultCommandX === -1) ? originalCommandX : defaultCommandX;
            const targetY = (defaultCommandY === -1) ? originalCommandY : defaultCommandY;

            // Ensure correct size *first*
            commandWindow.ensureCorrectWindowSize();

            // Then set position
            if (commandWindow.x !== targetX || commandWindow.y !== targetY) {
               commandWindow.x = targetX;
               commandWindow.y = targetY;
            }

            // Apply/remove transparency settings
            if (makeWindowTransparent) {
                commandWindow.applyTransparencySettings();
            } else {
                commandWindow.removeTransparencySettings();
            }
        }
        resetHelpWindowPosition.call(this);
    }

    // --- Helper function to reset only the help window (Unchanged) ---
    function resetHelpWindowPosition() {
        // ... (same as v1.6) ...
         const helpWindow = this._helpWindow;
         const commandWindow = this._actorCommandWindow;
         if (!helpWindow) return;
         if (moveHelpWindow && commandWindow) {
            let targetHelpX = commandWindow.x + helpOffsetX;
            let targetHelpY = commandWindow.y + helpOffsetY - helpWindow.height;
            const screenWidth = Graphics.boxWidth;
            const screenHeight = Graphics.boxHeight;
            const helpFitsAboveDefault = targetHelpY >= 0;
            const helpCanFitBelowDefault = (commandWindow.y + commandWindow.height - helpOffsetY + helpWindow.height) <= screenHeight;
            if (!helpFitsAboveDefault && helpCanFitBelowDefault) {
                 targetHelpY = commandWindow.y + commandWindow.height - helpOffsetY;
            } else if (!helpFitsAboveDefault && !helpCanFitBelowDefault) {
                targetHelpY = 0;
            }
            targetHelpY = Math.max(0, targetHelpY);
            targetHelpX = Math.round(Math.max(0, Math.min(targetHelpX, screenWidth - helpWindow.width)));
            targetHelpY = Math.round(Math.max(0, Math.min(targetHelpY, screenHeight - helpWindow.height)));
            if (helpWindow.x !== targetHelpX || helpWindow.y !== targetHelpY) {
                helpWindow.x = targetHelpX;
                helpWindow.y = targetHelpY;
            }
        } else if (!moveHelpWindow) {
             if (helpWindow.x !== originalHelpX || helpWindow.y !== originalHelpY) {
                 helpWindow.x = originalHelpX;
                 helpWindow.y = originalHelpY;
             }
        }
    }

    // --- Reset Positions on Scene/Phase Changes (Unchanged) ---
    const _Scene_Battle_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
    Scene_Battle.prototype.startPartyCommandSelection = function() {
        if (originalPositionsStored) resetWindowPositions.call(this);
        _Scene_Battle_startPartyCommandSelection.call(this);
    };
    const _Scene_Battle_endCommandSelection = Scene_Battle.prototype.endCommandSelection;
    Scene_Battle.prototype.endCommandSelection = function() {
         _Scene_Battle_endCommandSelection.call(this);
         if (originalPositionsStored) resetWindowPositions.call(this);
    };

    // --- Reset flags on Battle End (Unchanged) ---
    const _Scene_Battle_terminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function() {
        _Scene_Battle_terminate.call(this);
        originalPositionsStored = false; sceneRef = null;
    };
     const _Scene_Battle_popScene = Scene_Battle.prototype.popScene;
     Scene_Battle.prototype.popScene = function() {
         originalPositionsStored = false; sceneRef = null;
        _Scene_Battle_popScene.call(this);
     };


    // --- Transparent Actor Command Window Modifications ---

    // Add/Modify helper methods on Window_ActorCommand prototype
    Window_ActorCommand.prototype.applyTransparencySettings = function() {
        // ... (same as v1.6) ...
        if (!this._transparencyApplied) {
            this.padding = 0; // Use 0 padding for transparent look
            this.setBackgroundType(2);
            if (this._backSprite) this._backSprite.visible = false;
            if (this._frameSprite) this._frameSprite.visible = false;
            if (this._contentsSprite) this._contentsSprite.opacity = 255;
            if (this._pauseSignSprite) this._pauseSignSprite.visible = false;
            this._transparencyApplied = true;
            // Don't refresh here, let the caller handle it if needed
            // this.refresh();
        }
    };
    Window_ActorCommand.prototype.removeTransparencySettings = function() {
        // ... (same as v1.6) ...
        if (this._transparencyApplied || this._transparencyApplied === undefined) { // Check undefined for safety on first run
            this.padding = this.standardPadding(); // Restore standard padding
            this.setBackgroundType(0);
            if (this._backSprite) this._backSprite.visible = true;
            if (this._frameSprite) this._frameSprite.visible = true;
            this._transparencyApplied = false;
             // Don't refresh here
            // this.refresh();
        }
    };

     // Helper to ensure the overall window size is correct
    Window_ActorCommand.prototype.ensureCorrectWindowSize = function() {
        let targetWidth = originalCommandWindowWidth;
        let targetHeight = originalCommandWindowHeight;
        let needsResize = false;

         // Safety check: Ensure necessary methods exist before calculation
         if (typeof this.windowHeight !== 'function' || typeof this.calculateCustomWindowWidth !== 'function') {
             console.warn(`${pluginName}: Cannot calculate window size yet. Methods missing.`);
             // Attempt to use original stored size if available
             targetWidth = originalCommandWindowWidth > 0 ? originalCommandWindowWidth : (this.width || 100);
             targetHeight = originalCommandWindowHeight > 0 ? originalCommandWindowHeight : (this.height || 50);
             if (this.width !== targetWidth || this.height !== targetHeight) {
                needsResize = true;
             }
             // Skip further custom calculation if methods aren't ready
         } else {
             // Proceed with calculation
            if (makeWindowTransparent && commandButtonWidth > 0) {
                targetWidth = this.calculateCustomWindowWidth();
                targetHeight = this.windowHeight(); // Should be safe to call now
                if (this.width !== targetWidth || this.height !== targetHeight) {
                    needsResize = true;
                }
            } else {
                 // Reset to original size if transparency/custom width is off
                 targetWidth = originalCommandWindowWidth;
                 targetHeight = originalCommandWindowHeight;
                 if (this.width !== originalCommandWindowWidth || this.height !== originalCommandWindowHeight) {
                     needsResize = true;
                 }
            }
        }


        if (needsResize && targetWidth > 0 && targetHeight > 0) {
             this.width = targetWidth;
             this.height = targetHeight;
             this.createContents(); // Need to recreate contents for new size
             if (this._transparencyApplied) { // Re-apply transparency visuals after resize
                 if (this._backSprite) this._backSprite.visible = false;
                 if (this._frameSprite) this._frameSprite.visible = false;
                 if (this._contentsSprite) this._contentsSprite.opacity = 255;
             }
             // Don't refresh here, let the caller (e.g., the original refresh) handle drawing
             // this.refresh();
        }
    };

     // Helper to calculate width based on custom item width
     Window_ActorCommand.prototype.calculateCustomWindowWidth = function() {
        // Safety check for maxCols
        const cols = typeof this.maxCols === 'function' ? this.maxCols() : 1;
        return commandButtonWidth * cols;
     };


    if (makeWindowTransparent) {

        // 1. Override Initialization
        const _Window_ActorCommand_initialize_transparent = Window_ActorCommand.prototype.initialize;
        Window_ActorCommand.prototype.initialize = function(rect) {
            // --- REMOVED modification of rect before base init ---
            _Window_ActorCommand_initialize_transparent.call(this, rect); // Base init
            this._transparencyApplied = false; // Init flag BEFORE applying settings
            this.applyTransparencySettings();
            // --- REMOVED ensureCorrectWindowSize call from here ---
        };

        // 2. Ensure padding stays zero if transparency is applied (same as v1.6)
        const _Window_ActorCommand_updatePadding_transparent = Window_ActorCommand.prototype.updatePadding;
        Window_ActorCommand.prototype.updatePadding = function() {
            if (this._transparencyApplied) this.padding = 0;
            else _Window_ActorCommand_updatePadding_transparent.call(this);
        };

        // 3. Override refresh methods (Conditional - Same as v1.6)
        const _Window_ActorCommand_refreshBack_transparent = Window.prototype._refreshBack;
        Window_ActorCommand.prototype._refreshBack = function() {
            if (!this._transparencyApplied) _Window_ActorCommand_refreshBack_transparent.call(this);
        };
        const _Window_ActorCommand_refreshFrame_transparent = Window.prototype._refreshFrame;
        Window_ActorCommand.prototype._refreshFrame = function() {
             if (!this._transparencyApplied) _Window_ActorCommand_refreshFrame_transparent.call(this);
        };
         const _Window_ActorCommand_updatePauseSign_transparent = Window.prototype._updatePauseSign;
         Window_ActorCommand.prototype._updatePauseSign = function() {
             _Window_ActorCommand_updatePauseSign_transparent.call(this);
             if (this._transparencyApplied && this._pauseSignSprite) this._pauseSignSprite.visible = false;
         };

        // 4. Adjust item Rect calculation (Using padding - Same as v1.6)
        Window_ActorCommand.prototype.itemRect = function(index) {
            const rect = Window_Selectable.prototype.itemRect.call(this, index);
             if (this._transparencyApplied) {
                 rect.x += transparentCommandPadding;
                 rect.y += transparentCommandPadding;
                 rect.width -= transparentCommandPadding * 2;
                 rect.height -= transparentCommandPadding * 2;
             }
            return rect;
        };

        // 5. Override drawItem (Using padding - Same as v1.6)
        const _Window_ActorCommand_drawItem_transparent = Window_ActorCommand.prototype.drawItem;
        Window_ActorCommand.prototype.drawItem = function(index) {
            if (this._transparencyApplied) {
                const rect = this.itemLineRect(index);
                const align = this.itemTextAlign();
                this.resetTextColor();
                this.changePaintOpacity(this.isCommandEnabled(index));
                this.drawTextEx(this.commandName(index), rect.x + transparentCommandPadding, rect.y, rect.width - transparentCommandPadding * 2, align);
            } else {
                 _Window_ActorCommand_drawItem_transparent.call(this, index);
            }
        };

        // 6. Adjust itemHeight (Using padding - Same as v1.6)
         const _Window_ActorCommand_itemHeight_transparent = Window_ActorCommand.prototype.itemHeight;
         Window_ActorCommand.prototype.itemHeight = function() {
             const baseHeight = _Window_ActorCommand_itemHeight_transparent.call(this);
             if (this._transparencyApplied) {
                 return this.lineHeight() + transparentCommandPadding * 2;
             }
             return baseHeight;
         };

        // 7. Override itemWidth (Same as v1.6)
        const _Window_ActorCommand_itemWidth_transparent = Window_ActorCommand.prototype.itemWidth;
        Window_ActorCommand.prototype.itemWidth = function() {
            if (makeWindowTransparent && commandButtonWidth > 0) {
                 return commandButtonWidth;
             }
             return _Window_ActorCommand_itemWidth_transparent.call(this);
        };

         // 8. Override windowWidth (Same as v1.6)
         const _Window_ActorCommand_windowWidth_transparent = Window_ActorCommand.prototype.windowWidth;
         Window_ActorCommand.prototype.windowWidth = function() {
             if (makeWindowTransparent && commandButtonWidth > 0) {
                 // Safety check: ensure calculateCustomWindowWidth exists
                 if (typeof this.calculateCustomWindowWidth === 'function') {
                    return this.calculateCustomWindowWidth();
                 } else {
                     // Fallback if method isn't ready
                     return _Window_ActorCommand_windowWidth_transparent.call(this);
                 }
             }
             return _Window_ActorCommand_windowWidth_transparent.call(this);
         };


        // 9. Ensure refresh *doesn't* call ensureCorrectWindowSize prematurely
        const _Window_ActorCommand_refresh_transparent = Window_ActorCommand.prototype.refresh;
        Window_ActorCommand.prototype.refresh = function() {
             // --- REMOVED ensureCorrectWindowSize call from here ---

             if (this._transparencyApplied) {
                 // Re-assert visual state before drawing contents
                 if (this._backSprite) this._backSprite.visible = false;
                 if (this._frameSprite) this._frameSprite.visible = false;
                 if (this._contentsSprite) this._contentsSprite.opacity = 255;
             }
            _Window_ActorCommand_refresh_transparent.call(this); // Call original refresh
        };

        // 10. Ensure size is checked when commands change (using makeCommandList)
        const _Window_ActorCommand_makeCommandList_transparent = Window_ActorCommand.prototype.makeCommandList;
        Window_ActorCommand.prototype.makeCommandList = function() {
            _Window_ActorCommand_makeCommandList_transparent.call(this);
            // Trigger a size check *after* the command list is built
            // This is a safe time to potentially resize.
            this.ensureCorrectWindowSize();
        };

        // 11. Also check size when setup is called (covers actor changes)
         const _Window_ActorCommand_setup = Window_ActorCommand.prototype.setup;
         Window_ActorCommand.prototype.setup = function(actor) {
             _Window_ActorCommand_setup.call(this, actor);
             // makeCommandList is called within setup, which now triggers ensureCorrectWindowSize.
             // No extra call needed here unless makeCommandList override is removed.
         };


    } // End if (makeWindowTransparent)

})();