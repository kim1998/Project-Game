/*:
 * @plugindesc [CORRECTED] Stores potential damage before hit/miss checks.
 * @author Your Name
 * @help
 * This plugin correctly captures the potential damage of any skill or item
 * and stores it in game variables BEFORE any hit or miss checks occur.
 *
 * This version fixes the critical bug where missing an attack would result
 * in the variables not being updated.
 *
 * It works by intercepting the action's "apply" command, calculating the
 * potential damage immediately, storing it, and then allowing the original
 * action to proceed.
 *
 * --- IMPORTANT ---
 * Place this plugin BELOW VisuStella's Battle Core in the plugin list.
 *
 * @param baseVariableId
 * @text Base Damage Variable ID
 * @desc Stores the damage calculated directly from the formula, BEFORE variance. Set to 0 to disable.
 * @type variable
 * @default 20
 *
 * @param variedVariableId
 * @text Varied Damage Variable ID
 * @desc Stores the damage AFTER variance has been applied. Set to 0 to disable.
 * @type variable
 * @default 21
 */

(() => {
    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const BASE_VARIABLE_ID = parseInt(parameters['baseVariableId'] || '20');
    const VARIED_VARIABLE_ID = parseInt(parameters['variedVariableId'] || '21');

    // --- Alias the core Game_Action.apply method ---
    const _alias_Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        
        // --- Custom Logic: Run this BEFORE the original function ---
        // We only perform this logic for skills/items that are meant to deal damage.
        if (this.isDamage()) {
            try {
                const item = this.item();
                
                // Step 1: Evaluate the damage formula to get the base damage.
                // This is the number calculated before variance or any other modifiers.
                const baseDamage = this.evalDamageFormula(target);

                // Step 2: Apply the skill's variance to the base damage.
                const variedDamage = this.applyVariance(baseDamage, item.damage.variance);

                // Step 3: Store the results in the specified game variables.
                // This happens every single time, regardless of a future hit or miss.
                if (BASE_VARIABLE_ID > 0) {
                    $gameVariables.setValue(BASE_VARIABLE_ID, Math.max(0, baseDamage));
                }
                if (VARIED_VARIABLE_ID > 0) {
                    $gameVariables.setValue(VARIED_VARIABLE_ID, Math.max(0, variedDamage));
                }

            } catch (e) {
                console.error("Error in StorePotentialDamage plugin:", e);
                // If something goes wrong, ensure variables are set to 0 to avoid using old data.
                if (BASE_VARIABLE_ID > 0) $gameVariables.setValue(BASE_VARIABLE_ID, 0);
                if (VARIED_VARIABLE_ID > 0) $gameVariables.setValue(VARIED_VARIABLE_ID, 0);
            }
        }
        
        // --- Original Function Call ---
        // Now that we've stored our values, let the game proceed with the original
        // apply function, which will perform the hit/miss check and deal damage.
        _alias_Game_Action_apply.call(this, target);
    };

})();