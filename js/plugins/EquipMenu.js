/*:
 * @plugindesc Reworks Scene_Equip: 3-column layout, persistent windows, smaller slot font/width.
 * @author YourName (or AI Generated)
 * @target MZ
 * @version 1.3.2
 * @help EquipMenu.js
 *
 * Removes Equip/Optimize/Clear commands.
 * Creates a 3-column layout: Status | Slots | Items.
 * Slot window is active on entry.
 * Windows remain visible when inactive.
 * Slot window uses smaller font and has reduced width.
 * Fixes slotName function error in slot drawing.
 *
 * @param slotWindowWidth
 * @text Slot Window Width
 * @desc The width (in pixels) for the middle Equipment Slot window.
 * @type number
 * @default 200
 *
 * @param slotFontSize
 * @text Slot Name Font Size
 * @desc The font size used for slot names (Weapon, Head, etc.). Default game font size is usually 26.
 * @type number
 * @default 22
 *
 * @basedOn Version 1.3.1
 */

(() => {
    'use strict';

    const scriptName = "EquipMenu"; // Use the filename
    const parameters = PluginManager.parameters(scriptName);
    const slotWindowWidth = parseInt(parameters['slotWindowWidth'] || 200);
    const slotFontSize = parseInt(parameters['slotFontSize'] || 22);

    // --- Helper Function for Window Heights ---
    const Window_Base_calcWindowHeight = function(numLines, selectable) {
        const padding = $gameSystem.windowPadding() * 2;
        if (selectable) {
            return numLines * Window_Selectable.prototype.itemLineHeight() + padding;
        } else {
            return numLines * Window_Base.prototype.lineHeight() + padding;
        }
    };

    // --- Prevent Command Window Creation ---
    Scene_Equip.prototype.createCommandWindow = function() { /* Do nothing */ };

    // --- Modify Scene Creation ---
    const _Scene_Equip_create = Scene_Equip.prototype.create;
    Scene_Equip.prototype.create = function() {
        _Scene_Equip_create.call(this);
        if (this._slotWindow && this._itemWindow) {
             this._slotWindow.setItemWindow(this._itemWindow);
        }
        this.activateSlotWindow();
    };

    // --- Window Activation Helpers (Keep windows visible) ---
    Scene_Equip.prototype.activateSlotWindow = function() {
        if (this._statusWindow) this._statusWindow.activate();
        if (this._slotWindow) {
            this._slotWindow.activate();
            this._slotWindow.select(this._slotWindow.index() >= 0 ? this._slotWindow.index() : 0);
        }
        if (this._itemWindow) {
            this._itemWindow.deactivate();
            this._itemWindow.deselect();
            this._itemWindow.show(); // Keep visible
        }
    };

    Scene_Equip.prototype.activateItemWindow = function() {
        if (this._statusWindow) this._statusWindow.activate();
        if (this._slotWindow) {
            this._slotWindow.deactivate();
            this._slotWindow.show(); // Keep visible
        }
        if (this._itemWindow) {
            this._itemWindow.activate();
            this._itemWindow.select(0);
            this._itemWindow.show(); // Ensure visible
        }
    };

    // --- Slot/Item OK/Cancel Handlers ---
    Scene_Equip.prototype.onSlotOk = function() {
        this.activateItemWindow();
    };

    Scene_Equip.prototype.onSlotCancel = function() {
        this.popScene();
    };

    Scene_Equip.prototype.onItemOk = function() {
        SoundManager.playEquip();
        const slotId = this._slotWindow.index();
        const item = this._itemWindow.item();
        this.actor().changeEquip(slotId, item);
        this.activateSlotWindow(); // Return focus to slots
        // Refresh windows AFTER activation change
        this._slotWindow.refresh();
        this._itemWindow.refresh();
        this._statusWindow.refresh();
    };

    Scene_Equip.prototype.onItemCancel = function() {
        this.activateSlotWindow();
    };

    // --- Window Layout Definitions ---

    // Help Window Rect (Top, Full Width)
    Scene_Equip.prototype.helpWindowRect = function() {
        const wx = 0;
        const wy = 0;
        const ww = Graphics.boxWidth;
        const wh = Window_Base_calcWindowHeight(2, false);
        return new Rectangle(wx, wy, ww, wh);
    };

    // Status Window Rect (Left Column) - Adjusted width slightly if needed
    Scene_Equip.prototype.statusWindowRect = function() {
        const helpHeight = this.helpWindowRect().height;
        const wx = 0;
        const wy = helpHeight;
        const totalWidth = Graphics.boxWidth;
        const itemWindowMinWidth = 240;
        // Use parameter directly as window might not exist yet during initial calculation
        const currentSlotWidth = slotWindowWidth;
        const statusWidth = Math.max(180, totalWidth - currentSlotWidth - itemWindowMinWidth);

        const ww = statusWidth;
        const wh = Graphics.boxHeight - helpHeight;
        return new Rectangle(wx, wy, ww, wh);
    };

    // Slot Window Rect (Middle Column) - Uses plugin parameter for width
    Scene_Equip.prototype.slotWindowRect = function() {
        const statusRect = this.statusWindowRect(); // Use the potentially recalculated status width
        const helpHeight = this.helpWindowRect().height;
        const wx = statusRect.width; // Position right of status window
        const wy = helpHeight;
        const ww = slotWindowWidth; // Use the parameter value
        const wh = Graphics.boxHeight - helpHeight;
        return new Rectangle(wx, wy, ww, wh);
    };

    // Item Window Rect (Right Column) - Adjusted based on others
    Scene_Equip.prototype.itemWindowRect = function() {
        const statusRect = this.statusWindowRect();
        const slotRect = this.slotWindowRect();
        const helpHeight = this.helpWindowRect().height;
        const wx = statusRect.width + slotRect.width;
        const wy = helpHeight;
        const ww = Graphics.boxWidth - wx; // Remaining width
        const wh = Graphics.boxHeight - helpHeight;
        return new Rectangle(wx, wy, ww, wh);
    };


    // --- Window Creation Overrides (Using new Rects) ---

    const _Scene_Equip_createStatusWindow = Scene_Equip.prototype.createStatusWindow;
    Scene_Equip.prototype.createStatusWindow = function() {
        const rect = this.statusWindowRect();
        this._statusWindow = new Window_EquipStatus(rect);
        this._statusWindow.setHelpWindow(this._helpWindow);
        this.addWindow(this._statusWindow);
        this._statusWindow.show();
    };

    const _Scene_Equip_createSlotWindow = Scene_Equip.prototype.createSlotWindow;
    Scene_Equip.prototype.createSlotWindow = function() {
        const rect = this.slotWindowRect();
        this._slotWindow = new Window_EquipSlot(rect);
        this._slotWindow.setHelpWindow(this._helpWindow);
        this._slotWindow.setStatusWindow(this._statusWindow);
        this._slotWindow.setHandler("ok", this.onSlotOk.bind(this));
        this._slotWindow.setHandler("cancel", this.onSlotCancel.bind(this));
        this._slotWindow.setHandler("index_change", this.onSlotChange.bind(this));
        this.addWindow(this._slotWindow);
        this._slotWindow.show();
    };

    const _Scene_Equip_createItemWindow = Scene_Equip.prototype.createItemWindow;
    Scene_Equip.prototype.createItemWindow = function() {
        const rect = this.itemWindowRect();
        this._itemWindow = new Window_EquipItem(rect);
        this._itemWindow.setHelpWindow(this._helpWindow);
        this._itemWindow.setStatusWindow(this._statusWindow);
        this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
        this._itemWindow.setHandler("cancel", this.onItemCancel.bind(this));
        this.addWindow(this._itemWindow);
        this._itemWindow.hide();
        this._itemWindow.deactivate();
    };

    // --- Slot Change Handler ---
    if (!Scene_Equip.prototype.onSlotChange) {
       Scene_Equip.prototype.onSlotChange = function() {
           if (this._slotWindow && this._itemWindow) {
               this._itemWindow.setSlotId(this._slotWindow.index());
           }
       };
   } else {
        const _Scene_Equip_onSlotChange_alias = Scene_Equip.prototype.onSlotChange;
        Scene_Equip.prototype.onSlotChange = function() {
            _Scene_Equip_onSlotChange_alias.call(this);
            if (this._slotWindow && this._itemWindow) {
               this._itemWindow.setSlotId(this._slotWindow.index());
           }
        }
   }

   // Ensure 'index_change' handler exists and is called on cursor move
   const _Window_EquipSlot_cursorMoved = Window_EquipSlot.prototype.cursorMoved;
   Window_EquipSlot.prototype.cursorMoved = function() {
       if (_Window_EquipSlot_cursorMoved) {
            _Window_EquipSlot_cursorMoved.call(this);
       } else {
            Window_Selectable.prototype.cursorMoved.call(this);
            this.callUpdateHelp();
       }
       if (this.active) {
           this.callHandler("index_change");
       }
   }
   // Ensure index_change is called when selection changes programmatically too
    const _Window_EquipSlot_select = Window_EquipSlot.prototype.select;
    Window_EquipSlot.prototype.select = function(index) {
        const needsHandlerCall = this.index() !== index;
        _Window_EquipSlot_select.call(this, index);
        if (this.active && needsHandlerCall) {
            this.callHandler("index_change");
        }
    };


    // --- Actor Refresh ---
   const _Scene_Equip_refreshActor = Scene_Equip.prototype.refreshActor;
   Scene_Equip.prototype.refreshActor = function() {
       _Scene_Equip_refreshActor.call(this);
       if (this._slotWindow && this._itemWindow && this.actor()) {
           const slotId = this._slotWindow.index();
           this._itemWindow.setActor(this.actor());
           this._itemWindow.setSlotId(slotId >= 0 ? slotId : 0);
       }
       this.activateSlotWindow();
   };


    // --- Modify Slot Window Drawing ---
    Window_EquipSlot.prototype.drawItem = function(index) {
        const actor = this._actor;
        if (!actor) {
            return;
        }
        const rect = this.itemLineRect(index);
        const enabled = actor.isEquipChangeOk(index);

        // --- Get slot name ---
        const slots = actor.equipSlots();
        const slotType = slots[index];
        const slotName = slotType ? $dataSystem.equipTypes[slotType] : "";

        // --- Get equipped item ---
        const item = this.itemAt(index);

        // --- Define layout variables ---
        const nameIndent = 4; // Indent for slot name from left edge
        const spacing = 8;    // Space between slot name area and item name area
        const iconWidth = ImageManager.iconWidth;
        const itemTextPadding = 4; // Internal padding between icon and text

        // --- Draw Slot Name (Left Aligned) ---
        this.changePaintOpacity(enabled);
        const originalFontSize = this.contents.fontSize;
        this.contents.fontSize = slotFontSize; // Use parameter value

        // Calculate width for slot name (e.g., up to 40% of the rect width)
        const maxSlotNameWidth = Math.floor(rect.width * 0.40);
        const slotNameActualWidth = this.textWidth(slotName);
        const slotNameDrawWidth = Math.min(slotNameActualWidth, maxSlotNameWidth);

        // Draw the slot name
        this.drawText(slotName, rect.x + nameIndent, rect.y, slotNameDrawWidth, "left");

        this.contents.fontSize = originalFontSize; // Restore font size for item name

        // --- Calculate Item Area Boundaries ---
        // Where the available space for the item starts
        const itemAreaStartX = rect.x + nameIndent + slotNameDrawWidth + spacing;
        // Where the available space for the item ends (right edge of the line rect)
        const itemAreaEndX = rect.x + rect.width;
        // The total width available in the item area
        const itemAreaWidth = Math.max(0, itemAreaEndX - itemAreaStartX);

        // --- Draw Item Icon & Name (Manually, Right Aligned) ---
        if (item && itemAreaWidth > 0) {
            // Calculate the actual width needed to display the item (icon + padding + name)
            const itemNameWidth = this.textWidth(item.name);
            const totalItemDrawWidth = iconWidth + itemTextPadding + itemNameWidth;

            // Determine starting X for the icon to achieve right alignment within the item area.
            // Start drawing at the beginning of the item area if the needed width exceeds available space,
            // otherwise, calculate X so the right edge lines up with itemAreaEndX.
            const iconStartX = Math.max(itemAreaStartX, itemAreaEndX - totalItemDrawWidth);

            // Draw Icon (only if it fits within the calculated item area)
            if (iconStartX + iconWidth <= itemAreaEndX) {
                this.drawIcon(item.iconIndex, iconStartX, rect.y + 2);
            }

            // Determine starting X and maximum width for the text part
            const textStartX = iconStartX + iconWidth + itemTextPadding;
            // Text can draw from its start position up to the end of the item area
            const textMaxWidth = Math.max(0, itemAreaEndX - textStartX);

            // Draw Text (only if there's space for it)
            if (textMaxWidth > 0) {
                // Draw the item name, clipped to the available textMaxWidth
                this.drawText(item.name, textStartX, rect.y, textMaxWidth, "left");
            }

        } else if (itemAreaWidth > 0) { // Draw '---' placeholder if no item
            const placeholderText = "---";
            const placeholderWidth = this.textWidth(placeholderText);

            // Calculate starting X to right-align the placeholder within the item area
            const placeholderX = Math.max(itemAreaStartX, itemAreaEndX - placeholderWidth);
            // Calculate the actual width to draw (limited by available space)
            const placeholderDrawWidth = Math.min(placeholderWidth, itemAreaEndX - placeholderX);


            this.changePaintOpacity(false); // Dim the placeholder
            // Draw the placeholder text, clipped if necessary
            this.drawText(placeholderText, placeholderX, rect.y, placeholderDrawWidth, "left");
            this.changePaintOpacity(true);
        }

        this.changePaintOpacity(true); // Ensure opacity is fully restored at the end
    };

})(); // End IIFE