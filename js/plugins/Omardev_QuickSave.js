//=============================================================================
// Omardev_QuickSave.js v1.2.0
//=============================================================================
// ----------------------------------------------------------------------------
// Copyright (c) 2025 Omardev. All rights reserved.
// 
// This work is licensed under the terms of the MIT license.  
// For a copy, see <https://opensource.org/licenses/MIT>.
// ----------------------------------------------------------------------------
// Version
// 1.2.0 - Added feature to open the load menu with the 'L' key.
// 1.1.0 - Added feature to open the save menu with the 'S' key.
// 1.0.0 - Initial release
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Quickly save the game, or open the save/load menu with hotkeys.
 * @author Omardev
 *
 * @param SaveSlot
 * @text Save Slot
 * @desc Slot number where the game will be saved 
 * @type number
 * @min 0
 * @default 1
 *
 * @param SaveKey
 * @text Quick Save Key
 * @desc Key that will trigger the quick save. Use key names like 'P', 'Q', etc.
 * @type text
 * @default P
 *
 * @param ShowMessage
 * @text Show Save Message
 * @desc Show a message when the game is saved
 * @type boolean
 * @default true
 *
 * @param SaveSuccessText
 * @text Success Message
 * @desc Message shown when game is saved successfully
 * @type text
 * @default Game Saved!
 *
 * @command SetQuickSave
 * @text Set Quick Save
 * @desc Enables or disables the quick save functionality
 *
 * @arg enabled
 * @type boolean
 * @text Enable Quick Save
 * @desc True to enable quick save, False to disable it
 * @default true
 *
 * @help
 * Quick Save Plugin
 * =====================================
 * 
 * This plugin allows players to quickly save their game in a specific slot
 * by pressing a configurable key. It also allows opening the save menu
 * by pressing the 'S' key and the load menu with the 'L' key.
 * 
 * Features:
 * - Configurable quick save key
 * - Press 'S' to open the save menu
 * - Press 'L' to open the load menu
 * - Configurable save slot for quick save
 * - Visual feedback when quick saving
 * - Won't save/load during events or battle
 * - Can be enabled/disabled through plugin commands
 * 
 * Plugin Commands:
 *   SetQuickSave enabled: true/false - Enables or disables quick save functionality
 * 
 * Usage:
 * - Set up your preferred quick save key and slot in the plugin parameters.
 * - Press the configured key during gameplay to quick save.
 * - Press the 'S' key to open the save menu.
 * - Press the 'L' key to open the load menu.
 * - Use plugin command to control when quick save is available.
 * 
 * The save/load features will only work when they are normally allowed
 * in the game (not during battles, events, etc.)
 */

(() => {
    const pluginName = "Omardev_QuickSave";
    const parameters = PluginManager.parameters(pluginName);
    
    // Plugin parameters
    const saveSlot = Number(parameters["SaveSlot"] || 1);
    const saveKey = String(parameters["SaveKey"] || "P").toLowerCase();
    const showMessage = parameters["ShowMessage"] !== "false";
    const successText = String(parameters["SaveSuccessText"] || "Game Saved!");

    // Quick save state tracker
    let isQuickSaveEnabled = true;

    // Register plugin command
    PluginManager.registerCommand(pluginName, "SetQuickSave", args => {
        isQuickSaveEnabled = args.enabled === "true";
    });

    // Helper function to check if saving is allowed for quick save
    const canQuickSave = () => {
        return isQuickSaveEnabled && 
               $gameSystem.isSaveEnabled() &&
               !$gameMessage.isBusy() && 
               !$gamePlayer.isMoving();
    };
    
    // Helper function to check if the save menu can be opened
    const canOpenSaveMenu = () => {
        return $gameSystem.isSaveEnabled() && SceneManager._scene instanceof Scene_Map;
    };
    
    // Helper function to check if the load menu can be opened
    const canOpenLoadMenu = () => {
        return !SceneManager.isSceneChanging() && 
               DataManager.isAnySavefileExists() && 
               SceneManager._scene instanceof Scene_Map;
    };

    // Create save message window class
    function Window_SaveMessage() {
        this.initialize(...arguments); //I was in the hell, looking at heaven, i was a machine, and you.., you live a dream..
    }

    Window_SaveMessage.prototype = Object.create(Window_Base.prototype);
    Window_SaveMessage.prototype.constructor = Window_SaveMessage;

    Window_SaveMessage.prototype.initialize = function() {
        const width = 240;
        const height = 80;
        const x = (Graphics.boxWidth - width) / 2;
        const y = Graphics.boxHeight / 4;
        Window_Base.prototype.initialize.call(this, new Rectangle(x, y, width, height));
        this.opacity = 0;
        this.contentsOpacity = 0;
        this.hide();
    };

    Window_SaveMessage.prototype.showMessage = function(message) {
        this.contents.clear();
        this.drawText(message, 0, 0, this.width - 40, 'center');
        this.show();
        this.opacity = 0;
        this.contentsOpacity = 255;
        setTimeout(() => this.fadeOut(), 1000);
    };

    Window_SaveMessage.prototype.fadeOut = function() {
        this.contentsOpacity -= 8;
        if (this.contentsOpacity > 0) {
            setTimeout(() => this.fadeOut(), 20);
        } else {
            this.hide();
        }
    };

    // Hook into Scene_Map to create our save message window
    const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        _Scene_Map_createAllWindows.call(this);
        this._saveMessageWindow = new Window_SaveMessage();
        this.addWindow(this._saveMessageWindow);
    };

    // Add key listener
    document.addEventListener("keydown", function(event) {
        const lowerCaseKey = event.key.toLowerCase();

        // Quick Save logic
        if (lowerCaseKey === saveKey && canQuickSave()) {
            const scene = SceneManager._scene;
            
            if (scene && scene instanceof Scene_Map) {
                SoundManager.playSave();
                $gameSystem.onBeforeSave();
                
                DataManager.saveGame(saveSlot)
                    .then(() => {
                        //StorageManager.cleanForageKeys();
                        if (showMessage && scene._saveMessageWindow) {
                            scene._saveMessageWindow.showMessage(successText);
                        }
                    })
                    .catch(() => {
                        SoundManager.playBuzzer();
                    });
            }
        // Open Save Menu
        } else if (lowerCaseKey === 's' && canOpenSaveMenu()) {
            SceneManager.push(Scene_Save);
        // Open Load Menu
        } else if (lowerCaseKey === 'l' && canOpenLoadMenu()) {
            SceneManager.push(Scene_Load);
        // Open Item Menu
        } else if (lowerCaseKey === 'i' && canOpenLoadMenu()) {
            SceneManager.push(Scene_Item);
        // Open Options Menu
        } else if (lowerCaseKey === 'o' && canOpenLoadMenu()) {
            SceneManager.push(Scene_Options);
        } else if (lowerCaseKey === 'j' && canOpenLoadMenu()) {
            Ayatam.QUEST.openQuestMenu();
        } else if (lowerCaseKey === 'k' && canOpenLoadMenu()) {
            SceneManager.push(Scene_Skill);
        }
        
    });
})();