/*:
 * @target MZ
 * @plugindesc Adds mana steal to states.
 * @help
 * This plugin lets you assign a mana recovery effect to states via a note tag.
 *
 * How to use:
 * 1. Add <manaSteal: x, y> to state notetag.
 * 2. x is the chance to trigger the effect between 0 and 1.
 * 3. y is the percentage of damage dealt to gain as MP between 0 and 1.
 * 
 * 1. Add <doubleHit: x> to skill notetag.
 * 2. x is the chance to trigger the effect between 0 and 1.
 * 
 * 1. Add <repeat: x, y, z> to skill notetag.
 * 2. x is the chance to trigger the effect between 0 and 1.
 * 3. y is the minimum amount of repeats.
 * 4. z is the maximum amount of repeats.
 */

(function() {
    const _Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        _Game_Action_apply.call(this, target);
        //Only proceed if the target is an enemy and the subject is an actor.
        if (target.isEnemy() && this.subject().isActor()) {
            const damageDealt = target.result().hpDamage;
            if (damageDealt > 0) {
                let totalMpGain = 0;
                //Loops through all skills on the actor
                this.subject().skills().forEach(skill => {
                    ///Checks if the notetag is: <manaSteal: x, y>
                    const regex = /<manaSteal:\s*([\d.]+)\s*,\s*([\d.]+)\s*>/i;
                    const match = skill.note.match(regex);
                    if (match) {
                        const chance = parseFloat(match[1]);
                        const mpPercentage = parseFloat(match[2]);
                        if (Math.random() < chance) {
                            totalMpGain = Math.floor(damageDealt * mpPercentage);
                        }
                    }
                });
                this.subject().states().forEach(state => {
                    //Checks if the notetag is: <manaSteal: x, y>
                    const regex = /<manaSteal:\s*([\d.]+)\s*,\s*([\d.]+)\s*>/i;
                    const match = state.note.match(regex);
                    if (match) {
                        const chance = parseFloat(match[1]);
                        const mpPercentage = parseFloat(match[2]);
                        if (Math.random() < chance) {
                            totalMpGain = Math.floor(damageDealt * mpPercentage);
                        }
                    }
                });
                if (totalMpGain > 0) {
                    this.subject().gainMp(totalMpGain);
                }
            }
        }
    };
    const _Game_Action_numRepeats = Game_Action.prototype.numRepeats;
    Game_Action.prototype.numRepeats = function() {
        let repeats = this.item().repeats;
        if (this.isAttack()) {
            repeats += this.subject().attackTimesAdd();
        }

        // Check if the current skill is the specific skill you want to apply the repeat logic to
        const specificSkillId = 2;
        if (this.item().id === specificSkillId) {
            this.subject().skills().forEach(skill => {
                const repeatReg = /<doubleHit:\s*([\d.]+)\s*>/i;
                const repeatMatch = skill.note.match(repeatReg);
                if (repeatMatch) {
                    const chance = parseFloat(repeatMatch[1]);

                    if (Math.random() < chance) {
                        repeats = 2;
                    }
                }
            });
        }
        // Check if the current skill has the <repeat: x> notetag
        const repeatReg = /<repeat:\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*>/i;
        const repeatMatch = this.item().note.match(repeatReg);
        if (repeatMatch) {
            const repeatCount = parseInt(repeatMatch[1]);
            const min = parseInt(repeatMatch[2]);
            const max = parseInt(repeatMatch[3]);
            repeats = Math.floor(Math.random() * (max - min + 1)) + min;
        }
        return Math.floor(repeats);

    };
})();
