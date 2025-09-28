/*:
 * @plugindesc Makes skills with the "Magical Attack" hit type inherit the hit rate from physical attacks.
 * @author Google Gemini
 *
 * @help MagicalHitRateInherit.js
 *
 * This plugin changes the hit rate calculation for skills with the "Magical Attack"
 * hit type. By default, these skills do not factor in the user's hit rate (accuracy).
 * With this plugin, they will use the same hit rate calculation as physical attacks.
 *
 * This means the success of a magical attack will be determined by:
 *   Skill's Success Rate * User's Hit Rate
 *
 * No plugin commands are necessary. Simply install and enable the plugin.
 */

(() => {
    const _Game_Action_itemHit = Game_Action.prototype.itemHit;
    Game_Action.prototype.itemHit = function(target) {
        if (this.isMagical()) {
            return this.item().successRate * 0.01 * this.subject().hit;
        } else {
            return _Game_Action_itemHit.call(this, target);
        }
    };
})();