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
 * @param restrictions
 * @text Slot Restrictions
 * @desc Rules for restricting visible equip slots for specific actors.
 * @type struct<Restriction>[]
 * @default []
 *
 * @basedOn Version 1.3.0
 */

/*~struct~Restriction:
 * @param actorId
 * @text Actor ID
 * @desc The actor this restriction applies to.
 * @type actor
 * @default 0
 *
 * @param allowedEquipTypeIds
 * @text Allowed Equip Type IDs
 * @desc List of Equip Type IDs (Database > Types) this actor CAN see/use. Others are hidden.
 * @type number[]
 * @default []
 * 
 */

(() => {
    'use strict';

    const scriptName = "EquipMenu";
    const parameters = PluginManager.parameters(scriptName);
    const slotWindowWidth = parseInt(parameters['slotWindowWidth'] || 200);
    const slotFontSize = parseInt(parameters['slotFontSize'] || 22);

    // --- Process Restrictions ---
    const parsedRestrictions = JSON.parse(parameters['restrictions'] || "[]");
    const actorRestrictions = {}; // Map: actorId -> Set<allowedEquipTypeId>
    for (const restriction of parsedRestrictions) {
        try {
            const data = JSON.parse(restriction);
            const actorId = parseInt(data.actorId);
            const allowedIds = JSON.parse(data.allowedEquipTypeIds || "[]").map(idStr => parseInt(idStr));
            if (actorId > 0 && allowedIds.length > 0) {
                actorRestrictions[actorId] = new Set(allowedIds);
            }
        } catch (e) {
            console.error(`Error parsing restriction: ${restriction}`, e);
        }
    }

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
        // Item window needs the *original* slot index
        const originalSlotId = this._slotWindow.originalSlotIndex(this._slotWindow.index());
        if (originalSlotId >= 0) { // Check if valid mapping exists
             this._itemWindow.setSlotId(originalSlotId);
             this.activateItemWindow();
        } else {
            // Should not happen if filtering is correct, but handle defensively
            SoundManager.playBuzzer();
            this._slotWindow.activate();
        }
    };

    Scene_Equip.prototype.onSlotCancel = function() {
        this.popScene();
    };

    Scene_Equip.prototype.onItemOk = function() {
        SoundManager.playEquip();
        // We need the *original* slot index from the visual index
        const visualIndex = this._slotWindow.index();
        const originalSlotId = this._slotWindow.originalSlotIndex(visualIndex);
        const item = this._itemWindow.item();

        if (originalSlotId >= 0) { // Check valid mapping
            this.actor().changeEquip(originalSlotId, item);
            this.activateSlotWindow(); // Return focus to slots
            // Refresh windows AFTER activation change
            this._slotWindow.refresh();
            this._itemWindow.refresh(); // Item list might change (e.g., dual wield)
            this._statusWindow.refresh();
        } else {
             // Should not happen, but indicates an issue mapping index
             SoundManager.playBuzzer();
             this.activateSlotWindow(); // Go back to slots
             this._slotWindow.refresh(); // Refresh just in case
             this._statusWindow.refresh();
        }
    };

    Scene_Equip.prototype.onItemCancel = function() {
        this.activateSlotWindow();
    };

    // --- Slot Change Handler ---
    Scene_Equip.prototype.onSlotChange = function() {
        // Called when the selected slot index changes in Window_EquipSlot
        // Update item window using the *original* slot index
        const visualIndex = this._slotWindow.index();
        const originalSlotId = this._slotWindow.originalSlotIndex(visualIndex);

        if (this._itemWindow && originalSlotId >= 0) {
            this._itemWindow.setSlotId(originalSlotId);
        }
        // Update help window too if needed
        if (this._helpWindow && this._slotWindow) {
            this._slotWindow.callUpdateHelp(); // Let the slot window update help
        }
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
        const actor = this.actor();
        // Refresh status and slot windows (slot window rebuilds its map in setActor)
        if (this._statusWindow) this._statusWindow.setActor(actor);
        if (this._slotWindow) this._slotWindow.setActor(actor);
 
        // Refresh item window AFTER slot window has rebuilt its map
        if (this._itemWindow && this._slotWindow) {
            const visualIndex = this._slotWindow.index();
            const originalSlotId = this._slotWindow.originalSlotIndex(visualIndex);
            this._itemWindow.setActor(actor);
            // Set slot ID based on the potentially new filtered list's current selection
            this._itemWindow.setSlotId(originalSlotId >= 0 ? originalSlotId : -1); // Pass -1 if no valid slot selected
        }
        this.activateSlotWindow(); // Ensure correct window is active
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

    // ========================================================================
    // == Window_EquipSlot Modifications for Filtering ==
    // ========================================================================

    // --- Store Filtered Map ---
    // Add a property to store the mapping: visual index -> original index
    const _Window_EquipSlot_initialize = Window_EquipSlot.prototype.initialize;
    Window_EquipSlot.prototype.initialize = function(rect) {
        // Initialize the map *BEFORE* calling the parent initialize method.
        this._filteredSlotMap = [];
        // Now call the original initialize, which might trigger refresh/maxItems
        _Window_EquipSlot_initialize.call(this, rect);
        // We no longer need to initialize it here again.
    };

    // --- Build Filtered Map ---
    // New method to create the mapping based on restrictions
    Window_EquipSlot.prototype.buildFilteredSlotMap = function() {
        this._filteredSlotMap = [];
        if (!this._actor) {
            return;
        }

        const actorId = this._actor.actorId();
        const restrictionSet = actorRestrictions[actorId]; // Get Set of allowed type IDs
        const originalSlots = this._actor.equipSlots(); // Array of equip type IDs

        for (let i = 0; i < originalSlots.length; i++) {
            const equipTypeId = originalSlots[i];
            // If no restriction OR if the slot's type ID is in the allowed set
            if (!restrictionSet || restrictionSet.has(equipTypeId)) {
                this._filteredSlotMap.push(i); // Add the original index 'i' to our map
            }
        }
        // Ensure selection is valid after filtering
        this.refresh(); // Refresh draws items based on the new map size
        this.select(Math.min(this.index(), this.maxItems() - 1)); // Clamp selection
        if (this.maxItems() === 0) {
             this.select(-1); // No selectable items
        } else if (this.index() < 0 && this.maxItems() > 0) {
            this.select(0); // Select first if nothing was selected
        }

    };

    // --- Original Slot Index Lookup ---
    // New method to get original index from visual index
    Window_EquipSlot.prototype.originalSlotIndex = function(visualIndex) {
        if (visualIndex >= 0 && visualIndex < this._filteredSlotMap.length) {
            return this._filteredSlotMap[visualIndex];
        }
        return -1; // Invalid index
    };

    // --- Update Actor Handling ---
    // Rebuild map when actor changes
    const _Window_EquipSlot_setActor = Window_EquipSlot.prototype.setActor;
    Window_EquipSlot.prototype.setActor = function(actor) {
        if (this._actor !== actor) {
            _Window_EquipSlot_setActor.call(this, actor); // Call original first
            this.buildFilteredSlotMap(); // Build map for the new actor
            // Scene refresh handles calling handlers/updating other windows
        }
    };

    // --- Override Max Items ---
    // Return the size of the filtered list
    Window_EquipSlot.prototype.maxItems = function() {
        return this._filteredSlotMap.length;
    };

    // --- Override Item Retrieval ---
    // Use the map to get the item from the correct original slot
    Window_EquipSlot.prototype.item = function() {
        // Window_Selectable.item() relies on index() and itemAt(index)
        // We override itemAt instead for consistency
        return this.itemAt(this.index());
    };

    Window_EquipSlot.prototype.itemAt = function(visualIndex) {
        const originalIndex = this.originalSlotIndex(visualIndex);
        return originalIndex >= 0 && this._actor ? this._actor.equips()[originalIndex] : null;
    };

    // --- Override Slot Name Retrieval ---
    // Use the map to get the name for the correct original slot
    Window_EquipSlot.prototype.slotName = function(visualIndex) {
        const originalIndex = this.originalSlotIndex(visualIndex);
        if (originalIndex >= 0 && this._actor) {
            const slotType = this._actor.equipSlots()[originalIndex];
            return $dataSystem.equipTypes[slotType];
        }
        return "";
    };

    // --- Override isEnabled Check ---
    // Use the map to check the correct original slot
    Window_EquipSlot.prototype.isEnabled = function(visualIndex) {
         const originalIndex = this.originalSlotIndex(visualIndex);
         return originalIndex >= 0 && this._actor ? this._actor.isEquipChangeOk(originalIndex) : false;
    };

    // --- Modify Slot Window Drawing ---
    // It now uses the overridden itemAt, slotName, isEnabled which use the mapping.
    // We just need to ensure it calls isEnabled correctly.
    Window_EquipSlot.prototype.drawItem = function(index) { // index is visualIndex here
        const actor = this._actor;
        if (!actor) {
            return;
        }
        const rect = this.itemLineRect(index);
        const enabled = this.isEnabled(index); // Uses the overridden isEnabled

        // --- Get slot name using overridden method ---
        const slotName = this.slotName(index);

        // --- Get equipped item using overridden method ---
        const item = this.itemAt(index);

        // --- Layout and Drawing (same as previous version, relying on mapped getters) ---
        const nameIndent = 4;
        const spacing = 8;
        const iconWidth = ImageManager.iconWidth;
        const itemTextPadding = 4;

        // --- Draw Slot Name (Left Aligned) ---
        this.changePaintOpacity(enabled);
        const originalFontSize = this.contents.fontSize;
        this.contents.fontSize = slotFontSize;

        const maxSlotNameWidth = Math.floor(rect.width * 0.40);
        const slotNameActualWidth = this.textWidth(slotName);
        const slotNameDrawWidth = Math.min(slotNameActualWidth, maxSlotNameWidth);
        this.drawText(slotName, rect.x + nameIndent, rect.y, slotNameDrawWidth, "left");

        this.contents.fontSize = originalFontSize;

        // --- Calculate Item Area Boundaries ---
        const itemAreaStartX = rect.x + nameIndent + slotNameDrawWidth + spacing;
        const itemAreaEndX = rect.x + rect.width;
        const itemAreaWidth = Math.max(0, itemAreaEndX - itemAreaStartX);

        // --- Draw Item Icon & Name (Manually, Right Aligned) ---
        if (item && itemAreaWidth > 0) {
            const itemNameWidth = this.textWidth(item.name);
            const totalItemDrawWidth = iconWidth + itemTextPadding + itemNameWidth;
            const iconStartX = Math.max(itemAreaStartX, itemAreaEndX - totalItemDrawWidth);

            if (iconStartX + iconWidth <= itemAreaEndX) {
                this.drawIcon(item.iconIndex, iconStartX, rect.y + 2);
            }

            const textStartX = iconStartX + iconWidth + itemTextPadding;
            const textMaxWidth = Math.max(0, itemAreaEndX - textStartX);
            if (textMaxWidth > 0) {
                this.drawText(item.name, textStartX, rect.y, textMaxWidth, "left");
            }
        } else if (itemAreaWidth > 0) { // Draw '---' placeholder
            const placeholderText = "---";
            const placeholderWidth = this.textWidth(placeholderText);
            const placeholderX = Math.max(itemAreaStartX, itemAreaEndX - placeholderWidth);
            const placeholderDrawWidth = Math.min(placeholderWidth, itemAreaEndX - placeholderX);

            this.changePaintOpacity(false);
            this.drawText(placeholderText, placeholderX, rect.y, placeholderDrawWidth, "left");
            this.changePaintOpacity(true);
        }

        this.changePaintOpacity(true);
    };

})(); // End IIFE