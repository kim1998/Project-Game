/*:
 * @target MZ
 * @plugindesc Customizes the turnEndOnMap behavior for Game_Actor.
 * @help This plugin modifies the turnEndOnMap function to perform map damage
 * only when the actor has taken HP damage.
 */

(() => {
    const _Game_Actor_turnEndOnMap = Game_Actor.prototype.turnEndOnMap;
    Game_Actor.prototype.turnEndOnMap = function() {
        if ($gameParty.steps() % this.stepsForTurn() === 0) {
            //this.onTurnEnd();
            if (this.result().hpDamage > 0) {
                this.performMapDamage();
            }
        }
    };
})();
