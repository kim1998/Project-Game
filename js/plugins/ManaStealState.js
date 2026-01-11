/*:
    @target MZ
    @plugindesc Adds advanced notetags to skills, states, weapons, and armor.
    @help
    This plugin enhances skills, states, weapons, and armor with special
    notetags for mana steal, double hits, and action repeats.

    --- Notetag Details ---

    <manaSteal: x, y>
    - Can be used on: Skills, States, Weapons, Armor
    - When you deal HP damage, you have a chance to recover MP.
    - x: The chance to trigger (e.g., 0.5 for 50%).
    - y: The percentage of damage to gain as MP (e.g., 0.1 for 10%).
    - Note: All successful manaSteal effects from any source will stack.

    <doubleHit: x>
    - Can be used on: Skills, States, Weapons, Armor
    - Gives Skill ID 2 a chance to strike twice. This notetag will
      only work when the active skill is Skill ID 2.
    - x: The chance to trigger (e.g., 0.25 for 25%).

    <repeat: x, y, z>
    - Can be used on: Skills, States, Weapons, Armor
    - Gives the action a chance to repeat multiple times.
    - x: The chance to trigger (e.g., 0.1 for 10%).
    - y: The minimum number of repeats.
    - z: The maximum number of repeats.

    --- Priority for doubleHit & repeat ---

    Since only one repeat effect can apply at a time, they are
    checked in a specific order. The first one to successfully trigger
    is the one that will be used.

    1. The Skill/Item being actively used.
    2. Equipped Weapons and Armor.
    3. Active States on the user.
    4. Other Skills the user has learned (for passive effects).

    On any single item, <repeat> is checked before <doubleHit>.
*/

(function () {
    const _Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function (target) {
        _Game_Action_apply.call(this, target);
        
        if (target.isEnemy() && this.subject().isActor() && target.result().hpDamage > 0) {
            const damageDealt = target.result().hpDamage;
            let totalMpGain = 0;
            const manaStealRegex = /<manaSteal:\s*([\d.]+)\s*,\s*([\d.]+)\s*>/i;

            const processManaSteal = (item) => {
                if (!item) return;
                const match = item.note.match(manaStealRegex);
                if (match) {
                    const chance = parseFloat(match[1]);
                    const mpPercentage = parseFloat(match[2]);
                    if (Math.random() < chance) {
                        totalMpGain += Math.floor(damageDealt * mpPercentage);
                    }
                }
            };
            
            const sources = [
                ...this.subject().states(),
                ...this.subject().equips(),
                ...this.subject().skills()
            ];

            sources.forEach(processManaSteal);

            if (totalMpGain > 0) {
                this.subject().gainMp(totalMpGain);
            }
        }
    };

    const _Game_Action_numRepeats = Game_Action.prototype.numRepeats;
    Game_Action.prototype.numRepeats = function () {
        let baseRepeats = _Game_Action_numRepeats.call(this);

        if (!this.subject() || !this.subject().isActor()) {
            return baseRepeats;
        }

        //const repeatRegex = /<repeat:\s*([\d.]+)\s*,\s*(\d+)\s*,\s*(\d+)\s*>/i;
        const doubleHitRegex = /<doubleHit:\s*([\d.]+)\s*>/i;

        const checkSourceForRepeats = (source) => {
            if (!source || !source.note) return null;

            // <repeat> tag has priority
            // const repeatMatch = source.note.match(repeatRegex);
            // if (repeatMatch) {
            //     const chance = parseFloat(repeatMatch[1]);
            //     if (Math.random() < chance) {
            //         const min = parseInt(repeatMatch[2]);
            //         const max = parseInt(repeatMatch[3]);
            //         return Math.floor(Math.random() * (max - min + 1)) + min;
            //     }
            // }
            
            // Check for <doubleHit>, but ONLY if the current action is Skill ID 2
            const doubleHitMatch = source.note.match(doubleHitRegex);
            if (doubleHitMatch && this.isSkill() && this.item().id === 2) {
                const chance = parseFloat(doubleHitMatch[1]);
                if (Math.random() < chance) {
                    return 2;
                }
            }
            return null;
        };

        let newRepeats = null;

        // Priority 1: The Skill or Item being used
        newRepeats = checkSourceForRepeats(this.item());
        if (newRepeats !== null) return newRepeats;

        // Priority 2: Equipped weapons and armor
        for (const equip of this.subject().equips()) {
            newRepeats = checkSourceForRepeats(equip);
            if (newRepeats !== null) return newRepeats;
        }

        // Priority 3: Active states
        for (const state of this.subject().states()) {
            newRepeats = checkSourceForRepeats(state);
            if (newRepeats !== null) return newRepeats;
        }
        
        // Priority 4: Other learned skills (for passive effects)
        for (const skill of this.subject().skills()) {
            if (this.isSkill() && this.item().id === skill.id) continue;
            newRepeats = checkSourceForRepeats(skill);
            if (newRepeats !== null) return newRepeats;
        }

        return baseRepeats;
    };

})();

