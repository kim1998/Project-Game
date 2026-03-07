/*:
 * @target MZ
 * @plugindesc Allows the player to select a skill or state and stores the ID in a variable.
 * @author Your Name
 * @version 1.0
 *
 * @command selectSkillState
 * @text Select Skill / State
 * @desc Opens a window to select a skill or state. Halts event processing until finished.
 *
 * @arg variableId
 * @type variable
 * @default 1
 * @text Variable ID
 * @desc The variable to store the selected ID. State IDs are stored as (1000 + ID).
 *
 * @arg listType
 * @type select
 * @option Skill
 * @value skill
 * @option State
 * @value state
 * @option Both
 * @value both
 * @default both
 * @text List Type
 * @desc The type of items to display in the selection window.
 *
 * @arg listSource
 * @type select
 * @option Party (Learned Skills / Active States)
 * @value party
 * @option Database (All Skills / All States)
 * @value database
 * @default party
 * @text List Source
 * @desc List only what the party currently has, or list everything in the database?
 */

(() => {
    const pluginName = "MapSelectSkillState";

    //=============================================================================
    // Plugin Command
    //=============================================================================

    PluginManager.registerCommand(pluginName, "selectSkillState", function(args) {
        const variableId = Number(args.variableId);
        const listType = args.listType;
        const listSource = args.listSource;

        $gameTemp.setMapSkillStateVariableId(variableId);
        
        const scene = SceneManager._scene;
        if (scene instanceof Scene_Map) {
            scene.startMapSkillStateSelection(listType, listSource);
            this.setWaitMode('mapSkillStateSelect');
        }
    });

    //=============================================================================
    // Game_Interpreter
    //=============================================================================

    const _Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function() {
        if (this._waitMode === 'mapSkillStateSelect') {
            const scene = SceneManager._scene;
            const isWaiting = scene._mapSkillStateWindow && scene._mapSkillStateWindow.active;
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
        const isWindowActive = scene._mapSkillStateWindow && scene._mapSkillStateWindow.active;
        return _Window_Message_isBusy.call(this) || isWindowActive;
    };

    //=============================================================================
    // Game_Temp
    //=============================================================================

    const _Game_Temp_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function() {
        _Game_Temp_initialize.call(this);
        this._mapSkillStateVariableId = 0;
    };

    Game_Temp.prototype.mapSkillStateVariableId = function() {
        return this._mapSkillStateVariableId;
    };

    Game_Temp.prototype.setMapSkillStateVariableId = function(variableId) {
        this._mapSkillStateVariableId = variableId;
    };

    //=============================================================================
    // Scene_Map
    //=============================================================================

    const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        _Scene_Map_createAllWindows.call(this);
        this.createMapSkillStateWindow();
    };

    Scene_Map.prototype.createMapSkillStateWindow = function() {
        const rect = new Rectangle(0, 0, 480, 320);
        rect.x = (Graphics.boxWidth - rect.width) / 2;
        rect.y = (Graphics.boxHeight - rect.height) / 2;
        this._mapSkillStateWindow = new Window_MapSkillStateList(rect);
        this._mapSkillStateWindow.setHandler("ok", this.onMapSkillStateOk.bind(this));
        this._mapSkillStateWindow.setHandler("cancel", this.onMapSkillStateCancel.bind(this));
        this.addWindow(this._mapSkillStateWindow);
    };

    Scene_Map.prototype.startMapSkillStateSelection = function(listType, listSource) {
        this._mapSkillStateWindow.setListConfig(listType, listSource);
        this._mapSkillStateWindow.show();
        this._mapSkillStateWindow.activate();
    };

    Scene_Map.prototype.onMapSkillStateOk = function() {
        const item = this._mapSkillStateWindow.item();
        const variableId = $gameTemp.mapSkillStateVariableId();
        let valueToStore = 0;

        if (item) {
            // Distinguish State from Skill. States have 'restriction', Skills have 'stypeId'.
            const isState = item.hasOwnProperty('restriction');
            
            if (isState) {
                valueToStore = item.id + 1000;
            } else {
                valueToStore = item.id;
            }
        }

        $gameVariables.setValue(variableId, valueToStore);
        this._mapSkillStateWindow.hide();
        this._mapSkillStateWindow.deactivate();
    };

    Scene_Map.prototype.onMapSkillStateCancel = function() {
        const variableId = $gameTemp.mapSkillStateVariableId();
        $gameVariables.setValue(variableId, 0);
        this._mapSkillStateWindow.hide();
        this._mapSkillStateWindow.deactivate();
    };

    //=============================================================================
    // Window_MapSkillStateList
    //=============================================================================

    function Window_MapSkillStateList() {
        this.initialize(...arguments);
    }

    Window_MapSkillStateList.prototype = Object.create(Window_Selectable.prototype);
    Window_MapSkillStateList.prototype.constructor = Window_MapSkillStateList;

    Window_MapSkillStateList.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this._data = [];
        this.hide();
    };

    Window_MapSkillStateList.prototype.maxCols = function() {
        return 1;
    };

    Window_MapSkillStateList.prototype.maxItems = function() {
        return this._data ? this._data.length : 0;
    };

    Window_MapSkillStateList.prototype.item = function() {
        return this.itemAt(this.index());
    };

    Window_MapSkillStateList.prototype.itemAt = function(index) {
        return this._data && index >= 0 ? this._data[index] : null;
    };

    // Draw the item without any numbers/quantities, using the full width.
    Window_MapSkillStateList.prototype.drawItem = function(index) {
        const item = this.itemAt(index);
        if (item) {
            const rect = this.itemLineRect(index);
            this.changePaintOpacity(this.isEnabled(item));
            this.drawItemName(item, rect.x, rect.y, rect.width);
            this.changePaintOpacity(1);
        }
    };

    Window_MapSkillStateList.prototype.isEnabled = function(item) {
        return true;
    };

    Window_MapSkillStateList.prototype.makeItemList = function(listType, listSource) {
        this._data = [];
        let combinedItems = [];

        if (listSource === "database") {
            // Load everything directly from the MZ database global arrays
            if (listType === "both" || listType === "skill") {
                combinedItems = combinedItems.concat($dataSkills);
            }
            if (listType === "both" || listType === "state") {
                combinedItems = combinedItems.concat($dataStates);
            }
        } else {
            // Load only what the party members currently have
            for (const actor of $gameParty.members()) {
                if (listType === "both" || listType === "skill") {
                    for (const skill of actor.skills()) {
                        combinedItems.push(skill);
                    }
                }
                if (listType === "both" || listType === "state") {
                    for (const state of actor.states()) {
                        combinedItems.push(state);
                    }
                }
            }
        }

        // Create a unique list to avoid duplicates
        const uniqueItems = [...new Set(combinedItems)];

        // Filter out nulls, empty entries, and basic attack/guard skills if needed
        for (const item of uniqueItems) {
            if (!item || !item.name || item.name === "") continue;
            this._data.push(item);
        }
    };

    Window_MapSkillStateList.prototype.setListConfig = function(listType, listSource) {
        this.makeItemList(listType, listSource);
        this.refresh();
        this.select(0);
        this.scrollTo(0, 0);
    };

    Window_MapSkillStateList.prototype.refresh = function() {
        Window_Selectable.prototype.refresh.call(this);
    };

})();