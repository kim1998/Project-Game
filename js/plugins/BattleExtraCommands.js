/*:
 * @plugindesc Adds 'Exit to Menu' and 'Load Game' commands to the Battle Party Command window.
 * @author Kimo
 * @target MZ
 * @version 1.0.1
 *
 * @param loadCommandText
 * @text Load Command Text
 * @desc The text displayed for the 'Load Game' command.
 * @type string
 * @default Load Game
 * 
 * @param exitCommandText
 * @text Exit Command Text
 * @desc The text displayed for the 'Exit to Main Menu' command.
 * @type string
 * @default Exit to Menu
 *
 * @help BattleExtraCommands.js
 *
 * This plugin adds two new commands to the party command window that appears
 * at the start of each battle turn (usually showing 'Fight' and 'Escape').
 *
 * Commands Added:
 * - Exit to Menu: Immediately exits the battle and returns to the main title screen.
 *   The game state is not saved automatically.
 * - Load Game: Immediately exits the battle and goes to the load game screen.
 *   The game state is not saved automatically.
 *
 * How to Use:
 * 1. Save this code as a .js file (e.g., BattleExtraCommands.js) in your
 *    project's js/plugins folder.
 * 2. Open the Plugin Manager in RPG Maker MZ (Tools -> Plugin Manager).
 * 3. Add a new plugin and select BattleExtraCommands from the list.
 * 4. Configure the command text parameters if desired.
 * 5. Make sure the plugin is turned ON.
 * 6. Start a battle, and the new commands should appear below "Escape".
 *
 * Compatibility:
 * - Should be compatible with most plugins.
 * - If another plugin heavily modifies Scene_Battle's party command window creation
 *   or Window_PartyCommand's command list creation, there might be conflicts.
 *   Place this plugin lower in the load order if issues arise.
 *
 * Version History:
 * 1.0.0 - Initial Release
 * 1.0.1 - Added BattleManager.abort() to prevent potential battle processing issues
 *         after selecting the command but before the scene transition completes.
 *         Added closing the command window visually.
 */

(() => {
    'use strict';

    const pluginName = 'BattleExtraCommands';
    const parameters = PluginManager.parameters(pluginName);

    const exitCommandText = parameters['exitCommandText'] || 'Exit to Menu';
    const loadCommandText = parameters['loadCommandText'] || 'Load Game';

    // Define symbols for the new commands to avoid typos
    const SYMBOL_EXIT_TO_TITLE = 'exitToTitle';
    const SYMBOL_LOAD_GAME = 'loadGame';

    // --- Add commands to the Party Command Window ---

    // Alias the original makeCommandList method
    const _Window_PartyCommand_makeCommandList = Window_PartyCommand.prototype.makeCommandList;
    Window_PartyCommand.prototype.makeCommandList = function() {
        // Call the original method first (adds Fight, Escape)
        _Window_PartyCommand_makeCommandList.call(this);

        // Add the new commands
        // addCommand(name, symbol, enabled, extData)
        this.addCommand(loadCommandText, SYMBOL_LOAD_GAME, true);
        this.addCommand(exitCommandText, SYMBOL_EXIT_TO_TITLE, true);
    };

    // --- Set up handlers for the new commands in Scene_Battle ---

    // Alias the original createPartyCommandWindow method
    const _Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
    Scene_Battle.prototype.createPartyCommandWindow = function() {
        // Call the original method first (creates window, sets default handlers)
        _Scene_Battle_createPartyCommandWindow.call(this);

        // Add handler for the "Load Game" command
        this._partyCommandWindow.setHandler(SYMBOL_LOAD_GAME, this.commandLoadGame.bind(this));
        // Add handler for the "Exit to Title" command
        // setHandler(symbol, method)
        this._partyCommandWindow.setHandler(SYMBOL_EXIT_TO_TITLE, this.commandExitToTitle.bind(this));

    };

    // --- Define the handler methods on Scene_Battle ---

    // Method executed when "Exit to Title" is selected
    Scene_Battle.prototype.commandExitToTitle = function() {
        this._partyCommandWindow.close(); // Close the command window visually
        SoundManager.playCancel();        // Play the standard cancel sound
        BattleManager.abort();            // Crucial: Stop battle processing immediately
        AudioManager.fadeOutBgm(1);       // Fade out Battle BGM (1 second)
        AudioManager.fadeOutBgs(1);       // Fade out Battle BGS (1 second)
        AudioManager.fadeOutMe(1);        // Fade out Battle ME (1 second)
        SceneManager.goto(Scene_Title);   // Transition to the Title Screen
        // MZ handles fadeout automatically on scene transition, but explicit fade can be smoother
    };

    // Method executed when "Load Game" is selected
    Scene_Battle.prototype.commandLoadGame = function() {
        this._partyCommandWindow.close(); // Close the command window visually
        SoundManager.playCancel();        // Play the standard cancel sound
        BattleManager.abort();            // Crucial: Stop battle processing immediately
        AudioManager.fadeOutBgm(1);       // Fade out Battle BGM (1 second)
        AudioManager.fadeOutBgs(1);       // Fade out Battle BGS (1 second)
        AudioManager.fadeOutMe(1);        // Fade out Battle ME (1 second)
        SceneManager.goto(Scene_Load);    // Transition to the Load Game Screen
    };

})();