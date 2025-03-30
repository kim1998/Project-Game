/*:
 * @plugindesc Replaces Actor Command Window with individual buttons positioned around the active actor. (v1.1 - Fix makeCommandList error)
 * @author Your Name (or AI Friend)
 * @target MZ
 * @version 1.1
 *
 * @param commandAttackText
 * @text Attack Command Text
 * @desc Text displayed for the Attack command button. Uses TextManager if empty.
 * @default
 *
 * @param commandSkillText
 * @text Skill Command Text
 * @desc Text displayed for the Skill command button. Uses TextManager if empty.
 * @default
 *
 * @param commandGuardText
 * @text Guard Command Text
 * @desc Text displayed for the Guard command button. Uses TextManager if empty.
 * @default
 *
 * @param commandItemText
 * @text Item Command Text
 * @desc Text displayed for the Item command button. Uses TextManager if empty.
 * @default
 *
 * @param buttonWidth
 * @text Button Width
 * @type number
 * @min 10
 * @desc The width of the clickable area and background for command buttons.
 * @default 80
 *
 * @param buttonHeight
 * @text Button Height
 * @type number
 * @min 10
 * @desc The height of the clickable area and background for command buttons.
 * @default 36
 *
 * @param verticalOffset
 * @text Vertical Offset (Attack/Guard)
 * @type number
 * @desc Vertical distance from actor sprite center for Attack (up) and Guard (down).
 * @default 50
 *
 * @param horizontalOffset
 * @text Horizontal Offset (Skill/Item)
 * @type number
 * @desc Horizontal distance from actor sprite center for Skill (left) and Item (right).
 * @default 70
 *
 * @param buttonPadding
 * @text Button Text Padding
 * @type number
 * @desc Padding inside the button background for the text.
 * @default 8
 *
 * @param buttonFontSize
 * @text Button Font Size
 * @type number
 * @min 1
 * @desc Font size for the command button text. 0 for default.
 * @default 20
 *
 * @param buttonBackColor
 * @text Button Background Color
 * @desc Background color in rgba(R, G, B, Alpha) format. Leave empty for default windowskin.
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param buttonHighlightColor
 * @text Button Highlight Color
 * @desc Background color when button is selected. rgba(R, G, B, Alpha). Leave empty for default cursor/tint.
 * @default rgba(100, 100, 200, 0.8)
 *
 * @param buttonDisabledColor
 * @text Button Disabled Color Tone
 * @desc Color Tone [R, G, B, Gray] applied to disabled buttons. (-255 to 255, Gray 0-255)
 * @default [-80, -80, -80, 100]
 *
 * @param useCursorSprite
 * @text Use Cursor Sprite
 * @type boolean
 * @desc Use a moving cursor sprite instead of changing background color for selection.
 * @default false
 * @on YES
 * @off NO
 *
 * @param cursorOffsetX
 * @text Cursor Offset X
 * @parent useCursorSprite
 * @type number
 * @desc Horizontal offset of the cursor relative to the button top-left.
 * @default -4
 *
 * @param cursorOffsetY
 * @text Cursor Offset Y
 * @parent useCursorSprite
 * @type number
 * @desc Vertical offset of the cursor relative to the button top-left.
 * @default -4
 *
 * @help CmdButtonsAroundActor.js (v1.1)
 *
 * Replaces the standard actor command window with individual, clickable command
 * buttons positioned around the currently active actor in Side-View battles.
 *
 * Fixed crash caused by calling makeCommandList on actor object.
 * Now manually builds command list within the scene.
 * Added parameter for disabled button color tone.
 *
 * How it positions (relative to actor sprite center):
 * - Attack: Above the actor.
 * - Skill: Left of the actor.
 * - Item: Right of the actor.
 * - Guard: Below the actor.
 *
 * Keyboard Navigation:
 * - Up/Down: Selects Attack/Guard.
 * - Left/Right: Selects Skill/Item.
 * - OK (Enter/Z): Confirms selection.
 * - Cancel (Esc/X): Goes back.
 *
 * This plugin heavily modifies Scene_Battle's command handling. It might
 * conflict with other plugins that also modify actor command input or display.
 *
 * Primarily designed for Side-View Battle Systems.
 *
 * Requires careful setup of button size and offsets in parameters to look good.
 */

(() => {
    'use strict';

    const pluginName = "CmdButtonsAroundActor";
    const params = PluginManager.parameters(pluginName);

    const commandTextOverrides = {
        attack: params.commandAttackText || null,
        skill: params.commandSkillText || null,
        guard: params.commandGuardText || null,
        item: params.commandItemText || null
    };

    const config = {
        buttonWidth: parseInt(params.buttonWidth) || 80,
        buttonHeight: parseInt(params.buttonHeight) || 36,
        verticalOffset: parseInt(params.verticalOffset) || 50,
        horizontalOffset: parseInt(params.horizontalOffset) || 70,
        padding: parseInt(params.buttonPadding) || 8,
        fontSize: parseInt(params.buttonFontSize) || 0, // 0 uses default
        backColor: params.buttonBackColor || "",
        highlightColor: params.buttonHighlightColor || "",
        disabledTone: JSON.parse(params.buttonDisabledColor || "[-80, -80, -80, 100]"),
        useCursor: params.useCursorSprite === 'true',
        cursorOffsetX: parseInt(params.cursorOffsetX) || -4,
        cursorOffsetY: parseInt(params.cursorOffsetY) || -4,
    };

    // --- Global State (on Scene_Battle) ---
    // _customActorCommands: holds { sprite: Sprite, command: commandData }
    // _customCommandIndex: index of the selected command in _customActorCommands
    // _customCommandActive: boolean, true if these buttons should be interactive
    // _customCursorSprite: the selection cursor sprite, if used
    Scene_Battle.prototype.initCustomActorCommandMembers = function() {
        this._customActorCommands = [];
        this._customCommandIndex = 0;
        this._customCommandActive = false;
        this._customCursorSprite = null;
    };

    const _Scene_Battle_initialize = Scene_Battle.prototype.initialize;
    Scene_Battle.prototype.initialize = function() {
        _Scene_Battle_initialize.call(this);
        this.initCustomActorCommandMembers();
    };

    const _Scene_Battle_terminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function() {
        // Clean up sprites explicitly before terminating
        this.cleanupCustomActorCommandDisplay();
        _Scene_Battle_terminate.call(this);
    };

     Scene_Battle.prototype.cleanupCustomActorCommandDisplay = function() {
        if (this._customActorCommands) {
             this._customActorCommands.forEach(cmd => {
                 if (cmd.sprite && cmd.sprite.parent) {
                     cmd.sprite.parent.removeChild(cmd.sprite);
                 }
             });
             this._customActorCommands = [];
        }
         if (this._customCursorSprite && this._customCursorSprite.parent) {
             this._customCursorSprite.parent.removeChild(this._customCursorSprite);
             this._customCursorSprite = null;
         }
         this._customCommandActive = false; // Ensure state is reset
     };

    // --- Helper: Find Actor Sprite ---
    function findActorSprite(actor) {
        if (SceneManager._scene instanceof Scene_Battle && SceneManager._scene._spriteset) {
            const sprites = SceneManager._scene._spriteset._actorSprites;
            return sprites ? sprites.find(sprite => sprite && sprite._actor === actor) : null;
        }
        return null;
    }

    // --- Helper: Clamp Position ---
    function clamp(value, min, max) {
        return Math.max(min, Math.min(value, max));
    }

    // --- Create Custom Command Display Objects ---
    const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        _Scene_Battle_createAllWindows.call(this);
        // Prevent default actor command window from ever showing/activating
        if (this._actorCommandWindow) {
            this._actorCommandWindow.visible = false;
            this._actorCommandWindow.active = false;
            this._actorCommandWindow.opacity = 0; // Make doubly sure it's invisible
            this._actorCommandWindow.close();
        }
        this.createCustomActorCommandDisplay(); // Creates container/cursor
    };

    Scene_Battle.prototype.createCustomActorCommandDisplay = function() {
        // Re-initialize arrays and flags here too, in case scene is reused
        this.initCustomActorCommandMembers();

        // Create cursor sprite if needed
        if (config.useCursor) {
            this._customCursorSprite = new Sprite();
            try {
                this._customCursorSprite.bitmap = ImageManager.loadSystem("Window");
                 // Wait for bitmap to load before setting frame? MZ might handle this better.
                 // Let's assume it works for now. Refine if cursor doesn't appear.
                const skin = ImageManager.loadSystem("Window");
                const pw = skin.width / 3; // Window pattern width
                const ph = skin.height / 2; // Window pattern height
                const sx = pw; // Cursor X position in windowskin (usually middle pattern)
                const sy = ph; // Cursor Y position in windowskin
                const wid = pw / 2; // Cursor width (usually half pattern)
                const hei = ph / 2; // Cursor height
                 this._customCursorSprite.setFrame(sx, sy, wid, hei);
            } catch (e) {
                console.error("Failed to load Window skin for cursor sprite.", e);
                 // Fallback: create a simple shape?
                this._customCursorSprite.bitmap = new Bitmap(24, 24);
                this._customCursorSprite.bitmap.drawCircle(12, 12, 10, 'blue');
            }

            this._customCursorSprite.anchor.x = 0.5;
            this._customCursorSprite.anchor.y = 0.5;
            this._customCursorSprite.visible = false;
            this.addChild(this._customCursorSprite); // Add directly to scene
        }
    };

    // --- Modify Start Actor Command Selection ---
    const _Scene_Battle_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
    Scene_Battle.prototype.startActorCommandSelection = function() {
        // Don't call original, it activates the default window
        this._statusWindow.deselect();
        this._statusWindow.close(); // Close status window

        this.setupCustomActorCommands(); // Build list and create sprites
        if (this._customActorCommands.length > 0) {
            this._customCommandActive = true;
            this._customCommandIndex = 0; // Start selection at the first command
            this.updateCustomCommandDisplay(); // Position and show commands
            this.updateCustomCommandSelectionVisuals(); // Highlight first command
        } else {
            // No commands available? Should not usually happen, but maybe skip turn?
            console.warn("No actor commands generated for:", BattleManager.actor());
             this.selectNextCommand(); // Or handle appropriately
        }
    };


    // --- Setup Command Data & Sprites (v1.3 - Enhanced Skill Debug) ---
    Scene_Battle.prototype.setupCustomActorCommands = function() {
        const actor = BattleManager.actor();
        if (!actor) {
            //console.error("CmdButtonsAroundActor: No actor found in BattleManager!"); // Debug
            return;
        }
        //console.log(`CmdButtonsAroundActor: Setting up commands for ${actor.name()}`); // Debug

        // Clear previous display objects
        this.cleanupCustomActorCommandDisplay();
        this.createCustomActorCommandDisplay(); // Recreate cursor if needed

        // --- Build the Command List (Attack, Skill, Item only) ---
        const commands = [];
        const addCommand = (name, symbol, enabled = true, ext = null) => {
            //console.log(`CmdButtonsAroundActor: Adding command data: ${name}, Symbol: ${symbol}, Enabled: ${enabled}`); // Debug
            commands.push({ name: name, symbol: symbol, enabled: enabled, ext: ext });
        };

        // 1. Attack Command
        //console.log(`CmdButtonsAroundActor: Checking Attack... Can Attack? ${actor.canAttack()}`); // Debug
        addCommand(TextManager.attack, 'attack', actor.canAttack());

        // 2. Skill Command (Check if actor has ANY usable skill types)
        //console.log(`CmdButtonsAroundActor: Checking Skills...`); // Debug
        const skillTypes = actor.skillTypes();
        //console.log(`CmdButtonsAroundActor: Actor Skill Types: [${skillTypes.join(',')}]`); // Debug
        let hasSkills = false;
        if (skillTypes.length > 0 && actor.canInput()) {
                //console.log(`CmdButtonsAroundActor: Actor can input. Checking specific skills...`); // Debug
                const allSkills = actor.skills();
                //console.log(`CmdButtonsAroundActor: Actor All Skills Count: ${allSkills.length}`); // Debug
                // Check if any skill of these types is usable by the actor
                hasSkills = allSkills.some(skill => {
                    const stypeMatch = skillTypes.includes(skill.stypeId);
                    const canUse = actor.canUse(skill);
                    // console.log(`CmdButtonsAroundActor:   - Skill: ${skill.name}, Type: ${skill.stypeId}, TypeMatch: ${stypeMatch}, CanUse: ${canUse}`); // Verbose Debug
                    return stypeMatch && canUse;
                });
                //console.log(`CmdButtonsAroundActor: Found usable skill matching types? ${hasSkills}`); // Debug
        } else {
                //console.log(`CmdButtonsAroundActor: Actor cannot input skills or has no skill types.`); // Debug
        }
        // Only add if actor can input AND has usable skills
        if (hasSkills) {
            addCommand(TextManager.skill, 'skill', true); // Enabled check happens when selecting skill list
        } else {
                //console.log(`CmdButtonsAroundActor: SKILL COMMAND NOT ADDED.`); // Debug Highlight
        }


        // 3. Item Command
        const canUseItem = $gameParty.canUseItems ? $gameParty.canUseItems() : true; // Compatibility check
        const itemCheck = canUseItem && ($gameParty.hasMaxItemsLimit ? !$gameParty.isMaxItems() : true) && $gameParty.canInput();
        //console.log(`CmdButtonsAroundActor: Checking Item... Can Use? ${itemCheck}`); // Debug
        addCommand(TextManager.item, 'item', itemCheck);

        // --- Create Sprites for the generated commands ---
        //console.log("CmdButtonsAroundActor: Final command list to create sprites for:", commands.map(c => c.symbol)); // Debug
        commands.forEach(command => {
            const button = this.createCommandButton(command);
            this._customActorCommands.push({ sprite: button, command: command });
            this.addChild(button); // Add sprite to the scene
        });

        // Ensure cursor is above buttons if used
        if (this._customCursorSprite && this.children.includes(this._customCursorSprite)) {
                this.setChildIndex(this._customCursorSprite, this.children.length - 1);
        } else if (this._customCursorSprite && !this.children.includes(this._customCursorSprite)) {
                this.addChild(this._customCursorSprite);
        }

        // If no commands were added (should be rare), deactivate
        if (this._customActorCommands.length === 0) {
            this._customCommandActive = false;
            //console.warn("CmdButtonsAroundActor: No commands generated for actor, deactivating custom commands."); // Debug
        } else {
                //console.log(`CmdButtonsAroundActor: Setup complete. ${this._customActorCommands.length} command sprites created.`); // Debug
        }
    };

    Scene_Battle.prototype.createCommandButton = function(command) {
        const rect = new Rectangle(0, 0, config.buttonWidth, config.buttonHeight);
        const sprite = new Sprite();
        sprite.bitmap = new Bitmap(rect.width, rect.height);

        if (config.fontSize > 0) {
            sprite.bitmap.fontSize = config.fontSize;
        }

        // Use TextManager name unless overridden by parameter
        let text = command.name;
        if (commandTextOverrides[command.symbol]) {
             text = commandTextOverrides[command.symbol];
        }

        // Set background
        if (!config.backColor) { // Use windowskin
            const skin = ImageManager.loadSystem("Window");
            try {
                Window_Base.prototype.drawWindowBackground.call({_windowskin: skin, contents: sprite.bitmap, padding: 0}, rect);
            }catch(e){
                sprite.bitmap.fillAll('grey'); // Fallback
            }
            // if (skin && !skin.isError()) {
            //     Window_Base.prototype.drawWindowBackground.call({_windowskin: skin, contents: sprite.bitmap, padding: 0}, rect);
            // } else {
            //     sprite.bitmap.fillAll('grey'); // Fallback
            // }
        } else {
            sprite.bitmap.fillAll(config.backColor);
        }

        // Draw text
        sprite.bitmap.textColor = ColorManager.normalColor(); // Will be overridden by tone for disabled
        sprite.bitmap.drawText(text, config.padding, 0, rect.width - config.padding * 2, rect.height, 'center');

        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        sprite.visible = false; // Initially hidden

        // Apply disabled state visually (using tone)
        sprite.setColorTone(command.enabled ? [0, 0, 0, 0] : config.disabledTone);


        return sprite;
    };


    // --- Update Command Display Position and Visibility (v1.3 - Enhanced Skill Debug) ---
    Scene_Battle.prototype.updateCustomCommandDisplay = function() {
        if (!this._customCommandActive) {
            // ... (hiding logic remains the same) ...
            return;
        }

        const actor = BattleManager.actor();
        const actorSprite = findActorSprite(actor);

        if (!actor || !actorSprite) {
                // ... (hiding logic remains the same) ...
            return;
        }

        const baseX = actorSprite.x;
        const baseY = actorSprite.y - (actorSprite.height ? actorSprite.height / 2 : 32); // Approx visual center Y

        // console.log(`CmdButtonsAroundActor UpdateDisplay: Actor=${actor.name()}, BaseX=${baseX}, BaseY=${baseY}`); // Optional Frame Debug

        this._customActorCommands.forEach(cmdData => {
            const sprite = cmdData.sprite;
            const command = cmdData.command;
            let targetX = baseX;
            let targetY = baseY;

            // Position based on command symbol
            switch (command.symbol) {
                case 'attack':
                    targetY -= config.verticalOffset;
                    break;
                case 'skill':
                    targetX -= config.horizontalOffset;
                        // --- Specific Skill Sprite Debug ---
                        // console.log(`CmdButtonsAroundActor UpdateDisplay SKILL: TargetX=${targetX}, TargetY=${targetY}, CurrentVisible=${sprite.visible}`); // Debug
                    break;
                // Guard case removed
                case 'item':
                    targetX += config.horizontalOffset;
                    break;
                default: // Other commands (unlikely now)
                    targetY -= config.verticalOffset + config.buttonHeight + 5;
                    break;
            }

            sprite.x = clamp(targetX, sprite.width / 2, Graphics.boxWidth - sprite.width / 2);
            sprite.y = clamp(targetY, sprite.height / 2, Graphics.boxHeight - sprite.height / 2);

            // Ensure visibility is explicitly set true if active
            const intendedVisibility = this._customCommandActive;
            if (sprite.visible !== intendedVisibility) {
                    // console.log(`CmdButtonsAroundActor UpdateDisplay ${command.symbol}: Setting visibility to ${intendedVisibility}`); // Debug Visibility Change
                    sprite.visible = intendedVisibility;
            }

                // --- Log final state for Skill sprite ---
                if(command.symbol === 'skill') {
                // console.log(`CmdButtonsAroundActor UpdateDisplay SKILL FINAL: X=${sprite.x}, Y=${sprite.y}, Visible=${sprite.visible}, Parent=${sprite.parent ? 'Scene' : 'None'}`); // Final State Debug
                }

        });

        // Update cursor position AFTER buttons are positioned and potentially made visible
        this.updateCustomCommandSelectionVisuals();
    };


    // --- Update Visual Selection ---
    Scene_Battle.prototype.updateCustomCommandSelectionVisuals = function() {
        if (!this._customCommandActive || !this._customActorCommands || this._customActorCommands.length === 0) {
             if(this._customCursorSprite) this._customCursorSprite.visible = false;
            return;
        }

        const selectedCommandData = this._customActorCommands[this._customCommandIndex];

        if (config.useCursor) {
            // Position cursor
            if (this._customCursorSprite && selectedCommandData && selectedCommandData.sprite.visible) {
                const targetSprite = selectedCommandData.sprite;
                 // Position cursor relative to the button's visual top-left
                this._customCursorSprite.x = targetSprite.x - (targetSprite.width * targetSprite.anchor.x) + config.cursorOffsetX;
                this._customCursorSprite.y = targetSprite.y - (targetSprite.height * targetSprite.anchor.y) + config.cursorOffsetY;
                 // Adjust size if needed? Default cursor is fixed size. Maybe scale it?
                 // this._customCursorSprite.scale.x = targetSprite.width / (this._customCursorSprite.width || 32);
                 // this._customCursorSprite.scale.y = targetSprite.height / (this._customCursorSprite.height || 32);
                 this._customCursorSprite.visible = true;
            } else if (this._customCursorSprite) {
                 this._customCursorSprite.visible = false;
            }

            // Ensure non-selected buttons don't have highlight (handled by initial creation/tone)

        } else {
            // Use background highlight (via tint or color change)
             if(this._customCursorSprite) this._customCursorSprite.visible = false;

            this._customActorCommands.forEach((cmdData, index) => {
                const sprite = cmdData.sprite;
                if (!sprite || !sprite.bitmap) return;

                 const isSelected = (index === this._customCommandIndex);
                 const isEnabled = cmdData.command.enabled;

                 let targetTone = isEnabled ? [0, 0, 0, 0] : config.disabledTone;
                 let targetColor = config.backColor; // For solid color mode

                if (isSelected && isEnabled) {
                    if (config.highlightColor) {
                         // Option 1: If using solid colors, change the fill color (requires redraw - less efficient)
                         // sprite.bitmap.clear();
                         // sprite.bitmap.fillAll(config.highlightColor);
                         // Redraw text... -> this is messy. Let's prefer tint.

                         // Option 2: Apply a highlight tint
                         targetTone = [68, 68, 128, 0]; // Example highlight tint (additive blueish)
                         // targetColor = config.highlightColor; // Use if redrawing above
                    } else if (!config.backColor) {
                         // Option 3: If using windowskin, apply a standard selection tint
                         targetTone = [0, 0, 80, 80]; // Example windowskin selection tint
                    } else {
                         // Option 4: Default highlight for solid color (brighter tint?)
                         targetTone = [30, 30, 60, 0]; // Slight bright tint
                    }
                } else if (!isEnabled) {
                    targetTone = config.disabledTone; // Ensure disabled tone overrides selection if disabled
                }


                // Apply the calculated tone
                sprite.setColorTone(targetTone);

                // If using solid colors AND highlight color, redraw logic would go here (but tint is preferred)
                // if (config.backColor && config.highlightColor && isSelected && isEnabled) { ... redraw ... }
                // else if (config.backColor) { ... redraw with backColor ... }
            });
        }
    };


    // --- Process Custom Input (v1.2 - Simplified for Attack/Skill/Item) ---
    Scene_Battle.prototype.processCustomActorCommandInput = function() {
        if (!this._customCommandActive || !this._customActorCommands || this._customActorCommands.length === 0) {
            return; // Exit if not active or no commands
        }

        let moved = false; // Flag to check if any directional input was processed
        const lastIndex = this._customCommandIndex; // Store current index before processing
        let intendedIndex = lastIndex; // Start with the current index as the target

        // --- Find Indices (will be -1 if command doesn't exist for this actor) ---
        const attackIndex = this._customActorCommands.findIndex(cmd => cmd.command.symbol === 'attack');
        const skillIndex = this._customActorCommands.findIndex(cmd => cmd.command.symbol === 'skill');
        const itemIndex = this._customActorCommands.findIndex(cmd => cmd.command.symbol === 'item');

        // --- Uncomment for deep debugging ---
        //console.log(`--- Input Frame ---`);
        //console.log(`Current Index: ${lastIndex} (Symbol: ${this._customActorCommands[lastIndex]?.command.symbol})`);
        //console.log(`Indices Found: Attack=${attackIndex}, Skill=${skillIndex}, Item=${itemIndex}`);


        // --- Determine Intended Index based on Input ---
        if (Input.isRepeated('down')) {
            moved = true;
            // No command below Attack, Skill, or Item in this layout
            // console.log("Input: DOWN - No change expected."); // Debug
            intendedIndex = lastIndex; // Explicitly stay put
        } else if (Input.isRepeated('up')) {
            moved = true;
            // Only move up to Attack if currently on Skill or Item
            if ((lastIndex === skillIndex || lastIndex === itemIndex) && attackIndex !== -1) {
                // console.log("Input: UP - Target: Attack"); // Debug
                intendedIndex = attackIndex;
            } else {
                // console.log("Input: UP - No change expected."); // Debug
                intendedIndex = lastIndex; // Stay put if on Attack or Attack doesn't exist
            }
        } else if (Input.isRepeated('right')) {
            moved = true;
            // Move right to Item if currently on Attack or Skill
            if ((lastIndex === attackIndex || lastIndex === skillIndex) && itemIndex !== -1) {
                // console.log("Input: RIGHT - Target: Item"); // Debug
                intendedIndex = itemIndex;
            } else {
                // console.log("Input: RIGHT - No change expected."); // Debug
                intendedIndex = lastIndex; // Stay put if on Item or Item doesn't exist
            }
        } else if (Input.isRepeated('left')) {
            moved = true;
            // Move left to Skill if currently on Attack or Item
            if ((lastIndex === attackIndex || lastIndex === itemIndex) && skillIndex !== -1) {
                // console.log("Input: LEFT - Target: Skill"); // Debug
                intendedIndex = skillIndex;
            } else {
                // console.log("Input: LEFT - No change expected."); // Debug
                intendedIndex = lastIndex; // Stay put if on Skill or Skill doesn't exist
            }
        }

        // --- Update State ONLY if Index Intends to Change ---
        if (moved && intendedIndex !== lastIndex) {
            console.log(`Index Change Approved: ${lastIndex} -> ${intendedIndex}`); // Debug
            this._customCommandIndex = intendedIndex; // Update the actual index
            console.log(`New Index: ${this._customCommandIndex}`); // Debug
            SoundManager.playCursor();
            this.updateCustomCommandSelectionVisuals(); // Update visuals based on the NEW index
        } else if (moved) {
                console.log(`Move attempted, but index remains ${lastIndex}.`); // Debug
        }


        // --- Confirmation ---
        if (Input.isTriggered('ok')) {
                // Ensure we check the command at the potentially updated index
                const selectedCommandData = this._customActorCommands[this._customCommandIndex];
                // console.log(`OK Triggered. Selected Index: ${this._customCommandIndex}`, selectedCommandData); // Debug

                if (selectedCommandData && selectedCommandData.command.enabled) {
                    SoundManager.playOk();
                    this._customCommandActive = false; // Deactivate custom input
                    this.cleanupCustomActorCommandDisplay(); // Hide buttons & cursor

                    // Execute the command
                    const symbol = selectedCommandData.command.symbol;
                    // console.log(`Executing command: ${symbol}`); // Debug
                    switch (symbol) {
                        case 'attack': this.commandAttack(); break;
                        case 'skill': this.commandSkill(); break;
                        // NOTE: Guard case removed
                        case 'item': this.commandItem(); break;
                        default:
                            console.warn("Unhandled command symbol:", symbol);
                            this.selectNextCommand();
                            break;
                    }
                } else {
                    // console.log(`OK Failed: Command disabled or not found at index ${this._customCommandIndex}`); // Debug
                    SoundManager.playBuzzer(); // Command is disabled or doesn't exist at index
                }
        }
        // --- Cancellation ---
        else if (Input.isTriggered('cancel')) {
            // console.log("Cancel Triggered."); // Debug
            SoundManager.playCancel();
            this._customCommandActive = false;
            this.cleanupCustomActorCommandDisplay();
            this.selectPreviousCommand();
        }
    }; // End of processCustomActorCommandInput
    

    // --- Integrate Input Processing into Scene Update ---
    // (This function remains the same as v1.1)
    const _Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        // --- Integrate Input Processing into Scene Update (v1.3 - Added Pre-Update Log) ---
        const _Scene_Battle_update_Alias_CmdBtns = Scene_Battle.prototype.update; // Use unique alias
        Scene_Battle.prototype.update = function() {

            // --- Log index at the VERY START of the update cycle ---
            if (this._customCommandActive) { // Only log when our commands *should* be active
                console.log(`CmdButtonsAroundActor --- FRAME START --- Index = ${this._customCommandIndex}`); // Debug Start of Frame
            }

            const isSceneActive = this.isActive();
            _Scene_Battle_update_Alias_CmdBtns.call(this); // Call original update (and other plugins aliasing update)

            // --- Our input processing happens AFTER original update ---
            if (isSceneActive && this._customCommandActive) {
                // console.log(`CmdButtonsAroundActor Processing Input... Current Index = ${this._customCommandIndex}`); // Debug Before Input Process
                this.processCustomActorCommandInput();
                this.updateCustomCommandDisplay(); // Position buttons (includes calling updateCustomCommandSelectionVisuals)
                // console.log(`CmdButtonsAroundActor Input Processed. Index NOW = ${this._customCommandIndex}`); // Debug After Input Process
            }

            // --- Log index at the VERY END of the update cycle ---
            if (this._customCommandActive) { // Only log when our commands *should* be active
                // console.log(`CmdButtonsAroundActor --- FRAME END --- Index = ${this._customCommandIndex}`); // Debug End of Frame
            }
        };
        const isSceneActive = this.isActive();
        _Scene_Battle_update.call(this);

        if (isSceneActive && this._customCommandActive) {
            this.processCustomActorCommandInput();
            // It's generally better to update display positions *before* processing input
            // in case actor sprite moves mid-frame, though unlikely here.
            this.updateCustomCommandDisplay();
            // Note: updateCustomCommandSelectionVisuals is now called *inside* processInput if index changes.
        }
    };

     // --- Handle Window Closing/Deactivation ---
     // Make sure buttons are hidden when scene changes state
     const _Scene_Battle_changeInputWindow = Scene_Battle.prototype.changeInputWindow;
     Scene_Battle.prototype.changeInputWindow = function() {
          // --- Problematic block removed ---
          // The logic to hide the display (cleanupCustomActorCommandDisplay) and
          // set _customCommandActive = false is handled correctly by the OK press,
          // Cancel press, and command execution handlers. Adding a check here
          // based on a non-existent BattleManager function caused the crash
          // and was likely redundant anyway.
 
          // --- Call the original function ---
          // This original function is responsible for activating/deactivating
          // the correct core windows (like Skill List, Item List, Status Window)
          // when the input focus changes.
          _Scene_Battle_changeInputWindow.call(this);
     };

    // --- Overwrite command[Whatever] methods to ensure our state is reset ---
    // (These are called AFTER the OK press is processed)
    const _Scene_Battle_commandAttack = Scene_Battle.prototype.commandAttack;
    Scene_Battle.prototype.commandAttack = function() {
        this._customCommandActive = false; // Ensure flag is false
        _Scene_Battle_commandAttack.call(this);
    };

    const _Scene_Battle_commandSkill = Scene_Battle.prototype.commandSkill;
    Scene_Battle.prototype.commandSkill = function() {
        this._customCommandActive = false;
        _Scene_Battle_commandSkill.call(this);
    };

    const _Scene_Battle_commandGuard = Scene_Battle.prototype.commandGuard;
    Scene_Battle.prototype.commandGuard = function() {
        this._customCommandActive = false;
        _Scene_Battle_commandGuard.call(this);
    };

    const _Scene_Battle_commandItem = Scene_Battle.prototype.commandItem;
    Scene_Battle.prototype.commandItem = function() {
        this._customCommandActive = false;
        _Scene_Battle_commandItem.call(this);
    };

    const _Scene_Battle_selectPreviousCommand = Scene_Battle.prototype.selectPreviousCommand;
    Scene_Battle.prototype.selectPreviousCommand = function() {
        this._customCommandActive = false; // Ensure cleaned up on cancel
        this.cleanupCustomActorCommandDisplay();
        _Scene_Battle_selectPreviousCommand.call(this);
    };

})();