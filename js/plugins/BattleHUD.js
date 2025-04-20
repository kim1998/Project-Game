/*:
 * @plugindesc v1.10 Moves windows, transparent command/skill/item options, hides status, custom cols.
 * @author Kimo
 * @target MZ
 *
 * @help
 * BattleHUD.js
 * Version 1.15
 *
 * This plugin repositions Actor Command/Help windows near the active actor,
 * optionally makes the command window transparent with customizable button widths,
 * and hides the default party status window during battle.
 *
 * Configuration:
 * - Command Window Offset X/Y: Position relative to actor sprite.
 * - Move Help Window?: Toggles Help Window movement.
 * - Help Window Offset X/Y: Help window position relative to command window.
 * - Default Command X/Y: Position when no actor is active (-1 for original).
 * - Hide Battle Status Window: Set to YES to remove the default party status window.
 * - Make Command Window Transparent?: Set to YES for transparent commands.
 * - Transparent Command Padding: Internal padding for text/cursor positioning.
 * - Command Button Width: Fixed width for each command button (-1 for default).
 * - Make Skill/Item Window Transparent?: Set to YES for frameless skill/item lists.
 * - Skill/Item Transparent Padding: Internal padding within transparent skill/item buttons.
 * - Skill/Item Window Opacity: Background opacity (0-255). Ignored if transparent is ON.
 * - Skill/Item Window Columns: Number of columns in skill/item lists.
 *
 * Screen Clamping (Automatic):
 * Windows are kept on screen. Help Window may move below Command Window.
 *
 * Note:
 * - Conflicts may occur with other UI plugins. Adjust plugin order.
 * - Transparency mode overrides windowskin settings for background/frame.
 * - Hiding the status window removes the default display of party HP/MP/States.
 *   You may need other plugins or UI elements to display this information.
 *
 * Changelog:
 * v1.15: Added Dynamic Skill/Item Height option.
 * v1.14: Fixed skill cost crash by using correct actor methods.
 * v1.13: Fixed skill cost drawing being outside button bounds.
 * v1.12: Restored skill cost drawing for transparent skill window.
 * v1.11: Fixed standardPadding crash during skill/item window init.
 * v1.10: Added transparent/frameless option and padding for Skill/Item windows.
 * v1.9: Added opacity and column parameters for Skill/Item windows in battle.
 * v1.8: Added Battle Status Window hiding option. Use drawTextEx for transparent commands.
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
 * @param --- Battle Status Window ---
 *
 * @param hideStatusWindow
 * @text Hide Battle Status Window?
 * @desc Hides the default party status window at the bottom/top of the battle screen.
 * @type boolean
 * @on YES
 * @off NO
 * @default true
 *
 * @param --- Appearance (Actor Command) ---
 * @parent --- Command Window ---
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
 * @param --- Skill/Item Window ---
 *
 * @param makeSkillItemWindowTransparent
 * @text Make Skill/Item Window Transparent?
 * @desc Makes the frame and background of the Skill/Item windows invisible (like actor commands).
 * @type boolean
 * @on YES
 * @off NO
 * @default false
 *
 * @param skillItemTransparentPadding
 * @parent makeSkillItemWindowTransparent
 * @text Skill/Item Transparent Padding
 * @desc Internal padding (pixels) for text/cursor positioning in transparent Skill/Item windows.
 * @type number
 * @min 0
 * @default 4
 *
 * @param skillItemWindowOpacity
 * @text Skill/Item Window Opacity
 * @desc Background opacity (0-255). Ignored if "Make Transparent" is ON.
 * @type number
 * @min 0
 * @max 255
 * @default 255
 *
 * @param skillItemWindowCols
 * @text Skill/Item Window Columns
 * @desc Number of columns to display in the Skill and Item windows in battle.
 * @type number
 * @min 1
 * @max 8
 * @default 2
 * 
 * @param skillItemWindowX
 * @text Window X
 * @desc X coordinate for Skill/Item windows. -1 uses default position.
 * @type number
 * @min -1
 * @default -1
 *
 * @param skillItemWindowY
 * @text Window Y
 * @desc Y coordinate for Skill/Item windows. -1 uses default position.
 * @type number
 * @min -1
 * @default -1
 *
 * @param skillItemWindowWidth
 * @text Window Width
 * @desc Width for Skill/Item windows. -1 uses default width calculation.
 * @type number
 * @min -1
 * @default -1
 *
 * @param skillItemWindowHeight
 * @text Window Height
 * @desc Height for Skill/Item windows. -1 uses default height calculation.
 * @type number
 * @min -1
 * @default -1
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

    // Status Window Param
    const hideStatusWindow = params.hideStatusWindow === "true";

    // Appearance Params
    const makeWindowTransparent = params.makeWindowTransparent === "true";
    const transparentCommandPadding = parseInt(params.transparentCommandPadding || "4");
    const commandButtonWidth = parseInt(params.commandButtonWidth || "-1");

    // Skill/Item Window Params
    const skillItemWindowX = parseInt(params.skillItemWindowX || "-1");
    const skillItemWindowY = parseInt(params.skillItemWindowY || "-1");
    const skillItemWindowWidth = parseInt(params.skillItemWindowWidth || "-1");
    const skillItemWindowHeight = parseInt(params.skillItemWindowHeight || "-1");
    const makeSkillItemWindowTransparent = params.makeSkillItemWindowTransparent === "true";
    const skillItemTransparentPadding = parseInt(params.skillItemTransparentPadding || "4");
    const skillItemWindowOpacity = parseInt(params.skillItemWindowOpacity || "255");
    const skillItemWindowCols = Math.max(1, parseInt(params.skillItemWindowCols || "2"));

    let originalCommandX = 0;
    let originalCommandY = 0;
    let originalHelpX = 0;
    let originalHelpY = 0;
    let originalPositionsStored = false;
    let sceneRef = null;
    let originalCommandWindowWidth = 0;
    let originalCommandWindowHeight = 0;


    // --- Battle Status Window Hiding ---
    if (hideStatusWindow) {
        // This completely overrides the function that normally shows/hides the status window.
        // By always calling close(), we effectively keep it hidden.
        Scene_Battle.prototype.updateStatusWindowVisibility = function() {
            if (this._statusWindow) { // Add safety check
                this._statusWindow.close();
            }
        };

        // Optional: Ensure it starts closed/hidden if the scene recreates windows
        const _Scene_Battle_createStatusWindow = Scene_Battle.prototype.createStatusWindow;
        Scene_Battle.prototype.createStatusWindow = function() {
            _Scene_Battle_createStatusWindow.call(this);
            if (this._statusWindow) {
                this._statusWindow.hide();
                this._statusWindow.close();
            }
        };
    }


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
        requestAnimationFrame(() => {
            if (sceneRef === this) {
                 resetWindowPositions.call(this);
            }
        });
    };

    // --- Position Windows Near Actor ---
    const _Scene_Battle_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
    Scene_Battle.prototype.startActorCommandSelection = function() {
         if (this._actorCommandWindow) {
            this._actorCommandWindow.ensureCorrectWindowSize();
         }
        _Scene_Battle_startActorCommandSelection.call(this);
        const actor = BattleManager.actor();
        const commandWindow = this._actorCommandWindow;
        const helpWindow = this._helpWindow;
        if (!commandWindow) return;
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
            commandWindow.ensureCorrectWindowSize();
            if (commandWindow.x !== targetX || commandWindow.y !== targetY) {
               commandWindow.x = targetX;
               commandWindow.y = targetY;
            }
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
        // ... (same as v1.7) ...
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
        // ... (same as v1.7) ...
        if (!this._transparencyApplied) {
            this.padding = 0;
            this.setBackgroundType(2);
            if (this._backSprite) this._backSprite.visible = false;
            if (this._frameSprite) this._frameSprite.visible = false;
            if (this._contentsSprite) this._contentsSprite.opacity = 255;
            if (this._pauseSignSprite) this._pauseSignSprite.visible = false;
            this._transparencyApplied = true;
        }
    };
    Window_ActorCommand.prototype.removeTransparencySettings = function() {
        // ... (same as v1.7) ...
        if (this._transparencyApplied || this._transparencyApplied === undefined) {
            this.padding = this.standardPadding();
            this.setBackgroundType(0);
            if (this._backSprite) this._backSprite.visible = true;
            if (this._frameSprite) this._frameSprite.visible = true;
            this._transparencyApplied = false;
        }
    };

     // Helper to ensure the overall window size is correct
    Window_ActorCommand.prototype.ensureCorrectWindowSize = function() {
        // ... (same as v1.7) ...
        let targetWidth = originalCommandWindowWidth;
        let targetHeight = originalCommandWindowHeight;
        let needsResize = false;
         if (typeof this.windowHeight !== 'function' || typeof this.calculateCustomWindowWidth !== 'function') {
             targetWidth = originalCommandWindowWidth > 0 ? originalCommandWindowWidth : (this.width || 100);
             targetHeight = originalCommandWindowHeight > 0 ? originalCommandWindowHeight : (this.height || 50);
             if (this.width !== targetWidth || this.height !== targetHeight) { needsResize = true; }
         } else {
            if (makeWindowTransparent && commandButtonWidth > 0) {
                targetWidth = this.calculateCustomWindowWidth();
                targetHeight = this.windowHeight();
                if (this.width !== targetWidth || this.height !== targetHeight) { needsResize = true; }
            } else {
                 targetWidth = originalCommandWindowWidth;
                 targetHeight = originalCommandWindowHeight;
                 if (this.width !== originalCommandWindowWidth || this.height !== originalCommandWindowHeight) { needsResize = true; }
            }
        }
        if (needsResize && targetWidth > 0 && targetHeight > 0) {
             this.width = targetWidth;
             this.height = targetHeight;
             this.createContents();
             if (this._transparencyApplied) {
                 if (this._backSprite) this._backSprite.visible = false;
                 if (this._frameSprite) this._frameSprite.visible = false;
                 if (this._contentsSprite) this._contentsSprite.opacity = 255;
             }
        }
    };

     // Helper to calculate width based on custom item width
     Window_ActorCommand.prototype.calculateCustomWindowWidth = function() {
        // ... (same as v1.7) ...
        const cols = typeof this.maxCols === 'function' ? this.maxCols() : 1;
        return commandButtonWidth * cols;
     };

        // --- Skill/Item Window Customizations ---

    // Helper function to apply shared transparency settings (Unchanged)
    function applySkillItemTransparencySettings(windowInstance) {
        // ... (code from v1.11) ...
        if (!windowInstance._transparencyApplied) {
            windowInstance.padding = 0;
            windowInstance.setBackgroundType(2);
            if (windowInstance._backSprite) windowInstance._backSprite.visible = false;
            if (windowInstance._frameSprite) windowInstance._frameSprite.visible = false;
            if (windowInstance._contentsSprite) windowInstance._contentsSprite.opacity = 255;
            if (windowInstance._pauseSignSprite) windowInstance._pauseSignSprite.visible = false;
            windowInstance._transparencyApplied = true;
        }
    }

    // Helper function to remove shared transparency settings (Unchanged)
    function removeSkillItemTransparencySettings(windowInstance) {
        // ... (code from v1.11) ...
        if (windowInstance._transparencyApplied || windowInstance._transparencyApplied === undefined) {
            windowInstance.padding = windowInstance.standardPadding();
            windowInstance.setBackgroundType(0);
            if (windowInstance._backSprite) windowInstance._backSprite.visible = true;
            if (windowInstance._frameSprite) windowInstance._frameSprite.visible = true;
            windowInstance._transparencyApplied = false;
        }
    }

    // --- Helper to Position Help Window ---
    function positionHelpWindowAbove(targetWindow) {
        const helpWindow = sceneRef?._helpWindow; // Get help window reference from scene
        if (moveHelpWindow && helpWindow && targetWindow && targetWindow.visible) {
            const targetX = targetWindow.x;
            const targetY = targetWindow.y;
            const targetWidth = targetWindow.width; // Use target width for potential centering later if desired

            // Calculate Help Window Position based on Target Window
            // Use existing offsets relative to the target window
            let targetHelpX = targetX + helpOffsetX;
            // helpOffsetY is gap below help window, subtract help height to place above
            let targetHelpY = targetY + helpOffsetY - helpWindow.height;

            // --- Screen Clamping ---
            const screenWidth = Graphics.boxWidth;
            const screenHeight = Graphics.boxHeight;

            // Adjust Y if it goes off-screen top (place below instead?) - Less common here
            if (targetHelpY < 0) {
                 // Option 1: Stick to top edge
                 targetHelpY = 0;
                 // Option 2: Try placing below target (might overlap actor command though)
                 // targetHelpY = targetY + targetWindow.height - helpOffsetY; // Caution: Potential overlap
            }

            // Clamp X
            targetHelpX = Math.round(Math.max(0, Math.min(targetHelpX, screenWidth - helpWindow.width)));
            // Clamp Y (final bottom check)
            targetHelpY = Math.round(Math.max(0, Math.min(targetHelpY, screenHeight - helpWindow.height)));

            // Move the window
            helpWindow.x = targetHelpX;
            helpWindow.y = targetHelpY;

            // Ensure help window is visible (though usually handled by the calling command)
            helpWindow.show();

        } else if (helpWindow) {
            // If conditions not met (e.g., moveHelpWindow is false), ensure help window uses default logic
            // This might involve hiding it or letting the actor command positioning take over later.
            // For now, just don't move it based on the skill/item window.
            // Consider if it should be explicitly hidden: helpWindow.hide(); ?
        }
    }

    // When Skill window opens
    const _Scene_Battle_commandSkill = Scene_Battle.prototype.commandSkill;
    Scene_Battle.prototype.commandSkill = function() {
        _Scene_Battle_commandSkill.call(this); // Let original logic run first (activates skill window)
        // Now, position help window above the skill window
        if (this._skillWindow) { // Check if skill window exists
            positionHelpWindowAbove(this._skillWindow);
        }
    };

    // When Item window opens
    const _Scene_Battle_commandItem = Scene_Battle.prototype.commandItem;
    Scene_Battle.prototype.commandItem = function() {
        _Scene_Battle_commandItem.call(this); // Let original logic run first (activates item window)
        // Now, position help window above the item window
        if (this._itemWindow) { // Check if item window exists
            positionHelpWindowAbove(this._itemWindow);
        }
    };

    // Shared modifications for both Skill and Item Windows
    function modifySkillItemWindowPrototypes(Window_Class) {

        // Apply Opacity or Transparency during Initialization (Unchanged)
        const _Window_Initialize = Window_Class.prototype.initialize;
        Window_Class.prototype.initialize = function(rect) {
            // ... (code from v1.11) ...
            _Window_Initialize.call(this, rect);
            this._transparencyApplied = false;
            if (makeSkillItemWindowTransparent) {
                applySkillItemTransparencySettings(this);
                this.padding = 0;
            } else {
                this.backOpacity = skillItemWindowOpacity;
            }
        };

        // Override Column Count (Unchanged)
        Window_Class.prototype.maxCols = function() {
            return skillItemWindowCols;
        };

        // --- Modifications for Transparent Mode ---
        if (makeSkillItemWindowTransparent) {

            // --- REMOVED updatePadding override --- (Same as v1.11)

            // Override refresh methods for frame/back/pause ONLY if transparent (Unchanged)
            const _Window_refreshBack = Window.prototype._refreshBack;
            Window_Class.prototype._refreshBack = function() {
                if (!this._transparencyApplied) _Window_refreshBack.call(this);
            };
            const _Window_refreshFrame = Window.prototype._refreshFrame;
            Window_Class.prototype._refreshFrame = function() {
                 if (!this._transparencyApplied) _Window_refreshFrame.call(this);
            };
             const _Window_updatePauseSign = Window.prototype._updatePauseSign;
             Window_Class.prototype._updatePauseSign = function() {
                 _Window_updatePauseSign.call(this);
                 if (this._transparencyApplied && this._pauseSignSprite) this._pauseSignSprite.visible = false;
             };

            // Adjust item Rect calculation for cursor positioning (Unchanged)
             const _Window_itemRect = Window_Class.prototype.itemRect;
             Window_Class.prototype.itemRect = function(index) {
                 // ... (code from v1.11) ...
                 const rect = _Window_itemRect.call(this, index);
                 if (this._transparencyApplied) {
                     rect.x += skillItemTransparentPadding;
                     rect.y += skillItemTransparentPadding;
                     rect.width -= skillItemTransparentPadding * 2;
                     rect.height -= skillItemTransparentPadding * 2;
                 }
                 return rect;
             };

             // --- REMOVED drawItem override from here ---

             // Adjust itemHeight to add padding for cursor spacing (Unchanged)
             const _Window_itemHeight = Window_Class.prototype.itemHeight;
             Window_Class.prototype.itemHeight = function() {
                 // ... (code from v1.11) ...
                 const baseHeight = _Window_itemHeight.call(this);
                 if (this._transparencyApplied) {
                     const lh = typeof this.lineHeight === 'function' ? this.lineHeight() : Window_Base._lineHeight;
                     return lh + skillItemTransparentPadding * 2;
                 }
                 return baseHeight;
             };

             // Ensure refresh reapplies visuals (Unchanged)
            const _Window_refresh = Window_Class.prototype.refresh;
            Window_Class.prototype.refresh = function() {
                // ... (code from v1.11) ...
                 if (this._transparencyApplied) {
                     if (this._backSprite) this._backSprite.visible = false;
                     if (this._frameSprite) this._frameSprite.visible = false;
                     if (this._contentsSprite) this._contentsSprite.opacity = 255;
                 }
                _Window_refresh.call(this);
            };

        } // End if (makeSkillItemWindowTransparent)
    }

    // Helper function to apply custom geometry
    function applyCustomSkillItemGeometry(originalRectFunction) {
        const rect = originalRectFunction.call(this); // Get default rect first
        if (skillItemWindowX !== -1) {
            rect.x = skillItemWindowX;
        }
        if (skillItemWindowY !== -1) {
            rect.y = skillItemWindowY;
        }
        if (skillItemWindowWidth !== -1) {
            rect.width = skillItemWindowWidth;
        }
        if (skillItemWindowHeight !== -1) {
            rect.height = skillItemWindowHeight;
        }
        return rect;
    }

    // Alias the rect methods in Scene_Battle
    const _Scene_Battle_skillWindowRect = Scene_Battle.prototype.skillWindowRect;
    Scene_Battle.prototype.skillWindowRect = function() {
        // Call helper to potentially modify the default rect
        return applyCustomSkillItemGeometry.call(this, _Scene_Battle_skillWindowRect);
    };

    const _Scene_Battle_itemWindowRect = Scene_Battle.prototype.itemWindowRect;
    Scene_Battle.prototype.itemWindowRect = function() {
        // Call helper to potentially modify the default rect
        return applyCustomSkillItemGeometry.call(this, _Scene_Battle_itemWindowRect);
    };
    // Apply the shared modifications to both window types
    modifySkillItemWindowPrototypes(Window_BattleSkill);
    modifySkillItemWindowPrototypes(Window_BattleItem);

    // --- Specific drawItem overrides for Transparent Mode ---
    if (makeSkillItemWindowTransparent) {

        // Override drawItem for BattleSkill to include cost
        const _Window_BattleSkill_drawItem = Window_BattleSkill.prototype.drawItem;
        Window_BattleSkill.prototype.drawItem = function(index) {
            // Check the flag directly, although this override only runs if global flag is true
            if (this._transparencyApplied) {
                const skill = this.itemAt(index);
                if (skill) {
                    const rect = this.itemLineRect(index); // Base rectangle for the item slot
                    const PADDING = skillItemTransparentPadding;
                    // Calculate drawing area based on full item width minus padding
                    const drawX = rect.x + PADDING;
                    const drawY = rect.y + PADDING;
                    const drawWidth = this.itemWidth() - PADDING * 2;

                    this.changePaintOpacity(this.isEnabled(skill));
                    this.drawItemName(skill, drawX, drawY, drawWidth);
                    // --- ADDED: Draw skill cost, using the same padded area ---
                    this.drawSkillCost(skill, drawX - 35, drawY, drawWidth);
                    this.changePaintOpacity(1);
                }
            } else {
                // Fallback to original method if transparency somehow gets disabled on this instance
                _Window_BattleSkill_drawItem.call(this, index);
            }
        };

        // Override drawItem for BattleItem (Corrected to include item number)
        const _Window_BattleItem_drawItem = Window_BattleItem.prototype.drawItem;
        Window_BattleItem.prototype.drawItem = function(index) {
            if (this._transparencyApplied) {
                const item = this.itemAt(index);
                if (item) {
                    const rect = this.itemLineRect(index); // Base rectangle
                    const PADDING = skillItemTransparentPadding;
                    // Calculate drawing area based on full item width minus padding
                    const drawX = rect.x + PADDING;
                    const drawY = rect.y + PADDING;
                    // Width available for drawing content (name + number)
                    const drawWidth = this.itemWidth() - PADDING * 2;

                    this.changePaintOpacity(this.isEnabled(item));

                    // 1. Draw Item Name (and Icon) using padded coords/width
                    this.drawItemName(item, drawX, drawY, drawWidth);

                    // 2. Draw Item Number using padded coords/width
                    // The drawItemNumber method itself handles right-alignment within the given width.
                    // It also checks if the window type needs numbers ($gameParty.numItems).
                    this.drawItemNumber(item, drawX - 35, drawY, drawWidth); // <-- ADDED THIS LINE

                    this.changePaintOpacity(1); // Reset opacity
                }
            } else {
                // Fallback to original method if not transparent
                _Window_BattleItem_drawItem.call(this, index);
            }
        };

    } // End if (makeSkillItemWindowTransparent) for specific overrides

    // Apply the modifications to both window types (Unchanged from v1.10)
    modifySkillItemWindowPrototypes(Window_BattleSkill);
    modifySkillItemWindowPrototypes(Window_BattleItem);


    if (makeWindowTransparent) {

        // 1. Override Initialization (same as v1.7)
        const _Window_ActorCommand_initialize_transparent = Window_ActorCommand.prototype.initialize;
        Window_ActorCommand.prototype.initialize = function(rect) {
            _Window_ActorCommand_initialize_transparent.call(this, rect);
            this._transparencyApplied = false;
            this.applyTransparencySettings();
        };

        // 2. Ensure padding stays zero (same as v1.7)
        const _Window_ActorCommand_updatePadding_transparent = Window_ActorCommand.prototype.updatePadding;
        Window_ActorCommand.prototype.updatePadding = function() {
            if (this._transparencyApplied) this.padding = 0;
            else _Window_ActorCommand_updatePadding_transparent.call(this);
        };

        // 3. Override refresh methods (Conditional - Same as v1.7)
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

        // 4. Adjust item Rect calculation (Using padding - Same as v1.7)
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

        // 5. Override drawItem -> USE drawTextEx
        const _Window_ActorCommand_drawItem_transparent = Window_ActorCommand.prototype.drawItem;
        Window_ActorCommand.prototype.drawItem = function(index) {
            if (this._transparencyApplied) {
                const rect = this.itemLineRect(index); // Use itemLineRect for positioning base
                const commandName = this.commandName(index);
                // Apply padding to get drawing coordinates
                const drawX = rect.x + transparentCommandPadding;
                const drawY = rect.y + transparentCommandPadding;
                // Calculate available width using itemWidth() and padding
                const availableWidth = this.itemWidth() - transparentCommandPadding * 2;

                this.resetTextColor();
                this.changePaintOpacity(this.isCommandEnabled(index));

                // --- USE drawTextEx ---
                this.drawTextEx(commandName, drawX, drawY, availableWidth);

            } else {
                 // Use original drawItem if not transparent
                 _Window_ActorCommand_drawItem_transparent.call(this, index);
            }
        };

        // 6. Adjust itemHeight (Using padding - Same as v1.7)
         const _Window_ActorCommand_itemHeight_transparent = Window_ActorCommand.prototype.itemHeight;
         Window_ActorCommand.prototype.itemHeight = function() {
             const baseHeight = _Window_ActorCommand_itemHeight_transparent.call(this);
             if (this._transparencyApplied) {
                 // Ensure lineHeight is available
                 const lh = typeof this.lineHeight === 'function' ? this.lineHeight() : Window_Base._lineHeight;
                 return lh + transparentCommandPadding * 2;
             }
             return baseHeight;
         };

        // 7. Override itemWidth (Same as v1.7)
        const _Window_ActorCommand_itemWidth_transparent = Window_ActorCommand.prototype.itemWidth;
        Window_ActorCommand.prototype.itemWidth = function() {
            if (makeWindowTransparent && commandButtonWidth > 0) {
                 return commandButtonWidth;
             }
             return _Window_ActorCommand_itemWidth_transparent.call(this);
        };

         // 8. Override windowWidth (Same as v1.7)
         const _Window_ActorCommand_windowWidth_transparent = Window_ActorCommand.prototype.windowWidth;
         Window_ActorCommand.prototype.windowWidth = function() {
             if (makeWindowTransparent && commandButtonWidth > 0) {
                 if (typeof this.calculateCustomWindowWidth === 'function') {
                    return this.calculateCustomWindowWidth();
                 } else {
                     return _Window_ActorCommand_windowWidth_transparent.call(this);
                 }
             }
             return _Window_ActorCommand_windowWidth_transparent.call(this);
         };


        // 9. Ensure refresh reapplies visuals (Same as v1.7)
        const _Window_ActorCommand_refresh_transparent = Window_ActorCommand.prototype.refresh;
        Window_ActorCommand.prototype.refresh = function() {
             if (this._transparencyApplied) {
                 if (this._backSprite) this._backSprite.visible = false;
                 if (this._frameSprite) this._frameSprite.visible = false;
                 if (this._contentsSprite) this._contentsSprite.opacity = 255;
             }
            _Window_ActorCommand_refresh_transparent.call(this);
        };

        // 10. Ensure size is checked when commands change (Same as v1.7)
        const _Window_ActorCommand_makeCommandList_transparent = Window_ActorCommand.prototype.makeCommandList;
        Window_ActorCommand.prototype.makeCommandList = function() {
            _Window_ActorCommand_makeCommandList_transparent.call(this);
            this.ensureCorrectWindowSize();
        };

        // 11. Size check on setup (Same as v1.7)
         const _Window_ActorCommand_setup = Window_ActorCommand.prototype.setup;
         Window_ActorCommand.prototype.setup = function(actor) {
             _Window_ActorCommand_setup.call(this, actor);
             // ensureCorrectWindowSize is called by makeCommandList
         };


    } // End if (makeWindowTransparent)

})();