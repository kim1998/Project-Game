/*:
 * @plugindesc Changes "Use" for Weapons/Armor to "Equip", allowing actor selection with sprites. Disables equipment if no actor can equip it.
 * @author Kimo
 * @target MZ
 * @version 1.4.0
 * @url Optional URL to your plugin's page or repository
 *
 * @help EquipFromItems.js
 *
 * This plugin alters the behavior of the item menu (Scene_Item).
 * When you have a Weapon or Armor selected and choose the "Use" command
 * (or press OK/Enter), instead of trying to use the item, it will attempt
 * to equip that item.
 *
 * If only one party member can equip the item, it equips automatically.
 * If multiple party members can equip it, a window appears allowing you
 * to select which actor should receive the equipment. This window now
 * also shows the actor's walking character sprite.
 *
 * Equipment items (Weapons/Armor) will be grayed out (disabled) in the
 * item list if NO actor currently in the party can equip them.
 *
 * How it works:
 * 1. Modifies `Window_ItemList.isEnabled` to check `actor.canEquip(item)` for
 *    all party members if the item is equipment. If none can, it's disabled.
 * 2. Intercepts the 'Ok' action on the item window (`Scene_Item.onItemOk`).
 * 3. Checks if the item is Weapon/Armor. If disabled, OK does nothing. If enabled, proceeds.
 * 4. Filters party members to find who can equip the item (`actor.canEquip`).
 * 5. If 1 actor can equip, calls the equip logic directly.
 * 6. If 2+ actors can equip, shows `Window_EquipTargetActor` (with sprites).
 * 7. Selecting an actor triggers the equip logic for that actor.
 * 8. Equip logic finds the first available slot and calls `actor.changeEquip`.
 * 9. Plays sounds based on success/failure and settings.
 *
 * Note:
 * - Equipping items this way does NOT consume them.
 * - It equips to the first available slot matching the equipment type.
 * - Requires character spritesheets to be set up correctly for actors.
 *
 * Compatibility:
 * - Should be compatible with most plugins unless they heavily modify
 *   Scene_Item, Window_ItemList, item usage, or actor equipping.
 *
 * Version History:
 * 1.4.0: Added actor character sprites to the EquipTargetActor window.
 *        Adjusted item height in EquipTargetActor window.
 * 1.3.0: Added check to disable Weapons/Armor in the item list if no
 *        party member can equip them (`Window_ItemList.isEnabled` override).
 * 1.2.0: Fixed actor names not displaying in the selection window.
 *        Added parameters for actor window position/size.
 * 1.1.0: Added actor selection window for multiple eligible actors.
 *        Refactored equip logic into a separate method.
 * 1.0.0: Initial Release (direct equip to current actor).
 *
 * @param playEquipSound
 * @text Play Equip Sound
 * @desc Play the default equip sound effect when equipping via the item menu?
 * @type boolean
 * @default true
 *
 * @param playBuzzerOnFail
 * @text Play Buzzer on Fail
 * @desc Play a buzzer sound if the actor cannot equip the item, no slot is found, or equip fails?
 * @type boolean
 * @default true
 *
 * @param actorWindowX
 * @text Actor Window X
 * @desc X position of the actor selection window. Can use formulas (e.g., Graphics.boxWidth / 2 - this.windowWidth() / 2).
 * @type string
 * @default Graphics.boxWidth / 2 - this.windowWidth() / 2
 *
 * @param actorWindowY
 * @text Actor Window Y
 * @desc Y position of the actor selection window. Can use formulas (e.g., Graphics.boxHeight / 2 - this.windowHeight() / 2).
 * @type string
 * @default Graphics.boxHeight / 2 - this.windowHeight() / 2
 *
 * @param actorWindowWidth
 * @text Actor Window Width
 * @desc Width of the actor selection window.
 * @type number
 * @min 160
 * @default 240
 *
 * @param spriteOffsetY
 * @text Actor Sprite Offset Y
 * @desc Vertical offset for the actor sprite in the selection window. - for up, + for down.
 * @type number
 * @default -7
 * 
 */

(() => {
    'use strict';

    const pluginName = "EquipFromItems";
    const parameters = PluginManager.parameters(pluginName);
    const paramPlayEquipSound = parameters['playEquipSound'] === 'true';
    const paramPlayBuzzerOnFail = parameters['playBuzzerOnFail'] === 'true';
    const paramActorWindowXFormula = parameters['actorWindowX'] || 'Graphics.boxWidth / 2 - this.windowWidth() / 2';
    const paramActorWindowYFormula = parameters['actorWindowY'] || 'Graphics.boxHeight / 2 - this.windowHeight() / 2';
    const paramActorWindowWidth = Number(parameters['actorWindowWidth'] || 240);
    const paramSpriteOffsetY = Number(parameters['spriteOffsetY'] || -7);

    //=============================================================================
    // Window_ItemList
    //=============================================================================

    const _Window_ItemList_isEnabled = Window_ItemList.prototype.isEnabled;
    Window_ItemList.prototype.isEnabled = function(item) {
        if (!item) {
            return false;
        }
        if (DataManager.isWeapon(item) || DataManager.isArmor(item)) {
            return $gameParty.members().some(actor => actor.canEquip(item));
        } else {
            return _Window_ItemList_isEnabled.call(this, item);
        }
    };


    //=============================================================================
    // Window_EquipTargetActor
    //=============================================================================
    // New window class to select the target actor for equipping

    function Window_EquipTargetActor() {
        this.initialize(...arguments);
    }

    Window_EquipTargetActor.prototype = Object.create(Window_Selectable.prototype);
    Window_EquipTargetActor.prototype.constructor = Window_EquipTargetActor;

    Window_EquipTargetActor.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this._actors = [];
        this._item = null;
        this.openness = 0;
        this.deactivate();
    };

    // --- NEW --- Define item height to fit character sprite
    Window_EquipTargetActor.prototype.itemHeight = function() {
        // Standard character sprite height is 48. Add some padding.
        // Or just use 48 if tight on space. Let's use 48.
        return 48;
    };

    Window_EquipTargetActor.prototype.setInfo = function(actors, item) {
        this._actors = actors;
        this._item = item;
        this.updatePlacement();
        this.refresh();
        this.select(0);
        this.open();
        this.activate();
    };

    Window_EquipTargetActor.prototype.updatePlacement = function() {
        const width = this.windowWidth();
        const height = this.windowHeight(); // Will now use the new itemHeight
        const x = eval(paramActorWindowXFormula);
        const y = eval(paramActorWindowYFormula);

        if (this.x !== x || this.y !== y || this.width !== width || this.height !== height) {
            this.move(x, y, width, height);
            this.createContents();
        }
    };

    Window_EquipTargetActor.prototype.windowWidth = function() {
        return paramActorWindowWidth;
    };

    Window_EquipTargetActor.prototype.windowHeight = function() {
        return this.fittingHeight(this.numVisibleRows()); // fittingHeight uses itemHeight internally
    };

    Window_EquipTargetActor.prototype.numVisibleRows = function() {
        return Math.min(this.maxItems(), 8);
    };

    Window_EquipTargetActor.prototype.maxItems = function() {
        return this._actors ? this._actors.length : 0;
    };

    Window_EquipTargetActor.prototype.item = function(index) {
        return this.maxItems() > 0 && index >= 0 ? this._actors[index] : null;
    };

    Window_EquipTargetActor.prototype.currentItem = function() {
        return this.item(this.index());
    };

    // --- MODIFIED --- Draw item with character sprite
    Window_EquipTargetActor.prototype.drawItem = function(index) {
        const actor = this.item(index);
        if (actor) {
            const rect = this.itemLineRect(index); // Rect for the entire line
            const itemHeight = this.itemHeight() + paramSpriteOffsetY;  // Use the overridden itemHeight
            const spriteWidth = 48; // Standard width
            const spriteHeight = 48; // Standard height

            // Calculate position for the character sprite
            // Center the 48x48 sprite vertically within the itemHeight rect
            // drawCharacter draws based on bottom-center point
            const spriteDrawX = rect.x + spriteWidth / 2 + this.itemPadding(); // Center X in the first 48px block + padding
            const spriteDrawY = rect.y + itemHeight; // Align bottom of sprite with bottom of the line rect

            // Draw the character sprite
            this.drawCharacter(
                actor.characterName(),
                actor.characterIndex(),
                spriteDrawX,
                spriteDrawY
            );

            // Calculate position and width for the text (actor name)
            const textX = rect.x + spriteWidth + this.itemPadding() * 2; // Start text after sprite + padding
            const textY = rect.y; // Align text vertically like normal
            const textWidth = rect.width - (textX - rect.x); // Remaining width

            // Draw the actor name
            this.drawText(actor.name(), textX, textY, textWidth, 'left');
        }
    };

    Window_EquipTargetActor.prototype.isCurrentItemEnabled = function() {
        return true;
    };

    Window_EquipTargetActor.prototype.processOk = function() {
        if (this.isCurrentItemEnabled()) {
            this.playOkSound();
            this.updateInputData();
            this.deactivate();
            this.callOkHandler();
        } else {
            this.playBuzzerSound();
        }
    };

    Window_EquipTargetActor.prototype.processCancel = function() {
        Window_Selectable.prototype.processCancel.call(this);
    };


    //=============================================================================
    // Scene_Item
    //=============================================================================
    // (No changes needed in Scene_Item from version 1.3.0)

    const _Scene_Item_create = Scene_Item.prototype.create;
    Scene_Item.prototype.create = function() {
        _Scene_Item_create.call(this);
        this.createActorEquipWindow();
    };

    Scene_Item.prototype.createActorEquipWindow = function() {
        const rect = new Rectangle(0, 0, 1, 1); // Initial temporary rect
        this._actorEquipWindow = new Window_EquipTargetActor(rect);
        this._actorEquipWindow.setHandler('ok', this.onActorEquipOk.bind(this));
        this._actorEquipWindow.setHandler('cancel', this.onActorEquipCancel.bind(this));
        this.addWindow(this._actorEquipWindow);
    };

    const _Scene_Item_onItemOk_EquipPlugin = Scene_Item.prototype.onItemOk;
    Scene_Item.prototype.onItemOk = function() {
        const item = this.item();

        if (item && (DataManager.isWeapon(item) || DataManager.isArmor(item))) {
            const eligibleActors = $gameParty.members().filter(actor => actor.canEquip(item));

            if (eligibleActors.length === 0) {
                if (paramPlayBuzzerOnFail) SoundManager.playBuzzer();
                this.activateItemWindow();
            } else if (eligibleActors.length === 1) {
                this.equipItemToActor(eligibleActors[0], item);
                this.activateItemWindow();
            } else {
                this._itemWindow.deactivate();
                this._actorEquipWindow.setInfo(eligibleActors, item);
            }
        } else {
            _Scene_Item_onItemOk_EquipPlugin.call(this);
        }
    };

    Scene_Item.prototype.equipItemToActor = function(actor, item) {
        if (!actor || !item) return false;

        const etypeId = item.etypeId;
        const slots = actor.equipSlots();
        let targetSlotId = -1;
        let firstSlotWithItem = -1;

        for (let i = 0; i < slots.length; i++) {
            if (slots[i] === etypeId) {
                const currentEquip = actor.equips()[i];
                if (!currentEquip) {
                    targetSlotId = i;
                    break;
                } else if (currentEquip !== item) {
                     targetSlotId = i;
                     break;
                } else if (firstSlotWithItem < 0) {
                    firstSlotWithItem = i;
                }
            }
        }

        if (targetSlotId < 0 && firstSlotWithItem >= 0) {
            targetSlotId = firstSlotWithItem;
        }

        if (targetSlotId >= 0) {
             const lastItem = actor.equips()[targetSlotId];
             actor.changeEquip(targetSlotId, item);

             if (actor.equips()[targetSlotId] === item && lastItem !== item) {
                 if (paramPlayEquipSound) SoundManager.playEquip();
                 if (this._statusWindow) this._statusWindow.refresh();
                 if (this._itemWindow) this._itemWindow.refresh();
                 return true;
             } else if (lastItem === item) {
                 if (paramPlayBuzzerOnFail) SoundManager.playBuzzer();
                 return false;
             } else {
                 if (paramPlayBuzzerOnFail) SoundManager.playBuzzer();
                 return false;
             }
        } else {
            if (paramPlayBuzzerOnFail) SoundManager.playBuzzer();
            return false;
        }
    };

    Scene_Item.prototype.onActorEquipOk = function() {
        const targetActor = this._actorEquipWindow.currentItem();
        const itemToEquip = this._actorEquipWindow._item;

        if (targetActor && itemToEquip) {
            this.equipItemToActor(targetActor, itemToEquip);
        } else {
             if (paramPlayBuzzerOnFail) SoundManager.playBuzzer();
        }

        this._actorEquipWindow.close();
        this.activateItemWindow();
    };

    Scene_Item.prototype.onActorEquipCancel = function() {
        this._actorEquipWindow.close();
        this.activateItemWindow();
    };

    const _Scene_Item_onItemCancel = Scene_Item.prototype.onItemCancel;
    Scene_Item.prototype.onItemCancel = function() {
        _Scene_Item_onItemCancel.call(this);
         if (this._actorEquipWindow && this._actorEquipWindow.isOpen()) {
            this._actorEquipWindow.close();
        }
    };

    const _Scene_Item_onActorChange = Scene_Item.prototype.onActorChange;
    Scene_Item.prototype.onActorChange = function() {
        _Scene_Item_onActorChange.call(this);
         if (this._actorEquipWindow && this._actorEquipWindow.isOpen()) {
            this._actorEquipWindow.close();
            this.activateItemWindow();
        }
        if (this._statusWindow) {
            this._statusWindow.setActor($gameParty.menuActor());
        }
    };

})();