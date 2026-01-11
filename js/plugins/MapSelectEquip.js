/*:
 * @target MZ
 * @plugindesc Allows selecting a weapon/armor from inventory and equipped items.
 * @author Your Name
 * @version 1.3
 *
 * @command selectEquip
 * @text Select Equip
 * @desc Opens a window to select a weapon or armor. Halts event processing until finished.
 *
 * @arg variableId
 * @type variable
 * @default 1
 * @text Variable ID
 * @desc The variable to store the selected ID. Armor IDs are stored as (1000 + ID).
 *
 * @arg equipType
 * @type select
 * @option Weapon
 * @value weapon
 * @option Armor
 * @value armor
 * @option Both
 * @value both
 * @default both
 * @text Equipment Type
 * @desc The type of equipment to display in the selection window.
 */

(() => {
    const pluginName = "MapSelectEquip";

    //=============================================================================
    // Plugin Command
    //=============================================================================

    PluginManager.registerCommand(pluginName, "selectEquip", function(args) {
        const variableId = Number(args.variableId);
        const equipType = args.equipType;

        $gameTemp.setMapEquipVariableId(variableId);
        
        const scene = SceneManager._scene;
        if (scene instanceof Scene_Map) {
            scene.startMapEquipSelection(equipType);
            this.setWaitMode('mapEquipSelect');
        }
    });

    //=============================================================================
    // Game_Interpreter
    //=============================================================================

    const _Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function() {
        if (this._waitMode === 'mapEquipSelect') {
            const scene = SceneManager._scene;
            const isWaiting = scene._mapEquipWindow && scene._mapEquipWindow.active;
            if (!isWaiting) {
                this._waitMode = '';
            }
            return isWaiting;
        }
        return _Game_Interpreter_updateWaitMode.call(this);
    };

    //=============================================================================
    // Window_Message
    //=============================================================================

    const _Window_Message_isBusy = Window_Message.prototype.isBusy;
    Window_Message.prototype.isBusy = function() {
        const scene = SceneManager._scene;
        const isEquipWindowActive = scene._mapEquipWindow && scene._mapEquipWindow.active;
        return _Window_Message_isBusy.call(this) || isEquipWindowActive;
    };

    //=============================================================================
    // Game_Temp
    //=============================================================================

    const _Game_Temp_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function() {
        _Game_Temp_initialize.call(this);
        this._mapEquipVariableId = 0;
    };

    Game_Temp.prototype.mapEquipVariableId = function() {
        return this._mapEquipVariableId;
    };

    Game_Temp.prototype.setMapEquipVariableId = function(variableId) {
        this._mapEquipVariableId = variableId;
    };

    //=============================================================================
    // Scene_Map
    //=============================================================================

    const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        _Scene_Map_createAllWindows.call(this);
        this.createMapEquipWindow();
    };

    Scene_Map.prototype.createMapEquipWindow = function() {
        const rect = new Rectangle(0, 0, 480, 320);
        rect.x = (Graphics.boxWidth - rect.width) / 2;
        rect.y = (Graphics.boxHeight - rect.height) / 2;
        this._mapEquipWindow = new Window_MapEquipList(rect);
        this._mapEquipWindow.setHandler("ok", this.onMapEquipOk.bind(this));
        this._mapEquipWindow.setHandler("cancel", this.onMapEquipCancel.bind(this));
        this.addWindow(this._mapEquipWindow);
    };

    Scene_Map.prototype.startMapEquipSelection = function(equipType) {
        this._mapEquipWindow.setEquipType(equipType);
        this._mapEquipWindow.show();
        this._mapEquipWindow.activate();
    };

    Scene_Map.prototype.onMapEquipOk = function() {
        const item = this._mapEquipWindow.item();
        const variableId = $gameTemp.mapEquipVariableId();
        let valueToStore = 0;

        if (item) {
            if (DataManager.isArmor(item)) {
                valueToStore = item.id + 1000;
            } else {
                valueToStore = item.id;
            }
        }

        $gameVariables.setValue(variableId, valueToStore);
        this._mapEquipWindow.hide();
        this._mapEquipWindow.deactivate();
    };

    Scene_Map.prototype.onMapEquipCancel = function() {
        const variableId = $gameTemp.mapEquipVariableId();
        $gameVariables.setValue(variableId, 0);
        this._mapEquipWindow.hide();
        this._mapEquipWindow.deactivate();
    };

    //=============================================================================
    // Window_MapEquipList
    //=============================================================================

    function Window_MapEquipList() {
        this.initialize(...arguments);
    }

    Window_MapEquipList.prototype = Object.create(Window_Selectable.prototype);
    Window_MapEquipList.prototype.constructor = Window_MapEquipList;

    Window_MapEquipList.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this._data = [];
        this.hide();
    };

    Window_MapEquipList.prototype.maxCols = function() {
        return 1;
    };

    Window_MapEquipList.prototype.maxItems = function() {
        return this._data ? this._data.length : 0;
    };

    Window_MapEquipList.prototype.item = function() {
        return this.itemAt(this.index());
    };

    Window_MapEquipList.prototype.itemAt = function(index) {
        return this._data && index >= 0 ? this._data[index] : null;
    };

    Window_MapEquipList.prototype.drawItem = function(index) {
        const item = this.itemAt(index);
        if (item) {
            const rect = this.itemLineRect(index);
            const numberWidth = this.numberWidth();
            this.changePaintOpacity(this.isEnabled(item));
            this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
            this.drawItemNumber(item, rect.x, rect.y, rect.width);
            this.changePaintOpacity(1);
        }
    };

    Window_MapEquipList.prototype.numberWidth = function() {
        return this.textWidth("000");
    };
    
    Window_MapEquipList.prototype.drawItemNumber = function(item, x, y, width) {
        if (this.needsNumber()) {
            this.drawText(":", x, y, width - this.textWidth("00"), "right");
            this.drawText($gameParty.numItems(item), x, y, width, "right");
        }
    };

    Window_MapEquipList.prototype.needsNumber = function() {
        return true;
    };

    Window_MapEquipList.prototype.isEnabled = function(item) {
        return true;
    };

    // -- MODIFIED FUNCTION --
    Window_MapEquipList.prototype.makeItemList = function(equipType) {
        this._data = [];
        
        // Start with items from the inventory.
        let combinedItems = $gameParty.allItems();

        // Add equipped items from all party members.
        for (const actor of $gameParty.members()) {
            for (const equip of actor.equips()) {
                if (equip) {
                    combinedItems.push(equip);
                }
            }
        }

        // Create a unique list to avoid showing the same item multiple times.
        // For example, if you have 1 Iron Sword in inventory and 1 equipped.
        const uniqueItems = [...new Set(combinedItems)];

        // Filter the combined, unique list based on the selected type.
        for (const item of uniqueItems) {
            if (!item) continue;
            const isWeapon = DataManager.isWeapon(item);
            const isArmor = DataManager.isArmor(item);

            if (equipType === "both" && (isWeapon || isArmor)) {
                this._data.push(item);
            } else if (equipType === "weapon" && isWeapon) {
                this._data.push(item);
            } else if (equipType === "armor" && isArmor) {
                this._data.push(item);

            }
        }
    };

    Window_MapEquipList.prototype.setEquipType = function(equipType) {
        this.makeItemList(equipType);
        this.refresh();
        this.select(0);
        this.scrollTo(0, 0);
    };

    Window_MapEquipList.prototype.refresh = function() {
        Window_Selectable.prototype.refresh.call(this);
    };

})();