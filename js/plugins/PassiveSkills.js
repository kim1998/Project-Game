/*:
 * @target MZ
 * @plugindesc (v1.2) Permanently adds a state if a skill with <passiveState: stateId> is learned and permanently removes a state if a skill with <removeState: stateId> is learned.
 * @help
 * ------------------------------------------------------------------
 * How to Use:
 * ------------------------------------------------------------------
 * 1. Open a Skill’s note box in the database.
 * 2. For permanent state addition, add a notetag:
 *    <passiveState: 3>
 *    (Replace “3” with the desired state ID.)
 *
 * 3. For permanent state removal, add a notetag:
 *    <removeState: 4>
 *    (Replace “4” with the state ID you want permanently removed.)
 *
 * When an actor learns a skill with a passive or removal notetag, the plugin
 * recalculates the actor’s permanent states. This happens immediately upon
 * learning a skill, during refresh, and when a battle ends.
 *
 * If a state is both added by a passive skill and removed by another, the removal
 * takes precedence.
 *
 * ------------------------------------------------------------------
 * Terms of Use:
 * Free to use and modify for your projects.
 */
(function() {
    "use strict";

    // Helper: Extract state IDs from a skill's note that match the given regex.
    function extractStateIds(skill, regex) {
        const stateIds = [];
        const note = skill.note;
        let match;
        while ((match = regex.exec(note)) !== null) {
            const stateId = Number(match[1]);
            if (stateId > 0 && !stateIds.includes(stateId)) {
                stateIds.push(stateId);
            }
        }
        return stateIds;
    }

    function extractPassiveStateIds(skill) {
        return extractStateIds(skill, /<passiveState:\s*(\d+)>/gi);
    }

    function extractRemovalStateIds(skill) {
        return extractStateIds(skill, /<removeState:\s*(\d+)>/gi);
    }

    // Extend Game_Actor to store our permanent state arrays.
    const _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
    Game_Actor.prototype.initMembers = function() {
        _Game_Actor_initMembers.call(this);
        this._permanentPassiveStates = [];
        this._permanentRemovalStates = [];
    };

    // Recalculate permanent state effects when a new skill is learned.
    const _Game_Actor_learnSkill = Game_Actor.prototype.learnSkill;
    Game_Actor.prototype.learnSkill = function(skillId) {
        _Game_Actor_learnSkill.call(this, skillId);
        this.applyPermanentStateEffects();
    };

    // Recalculate permanent state effects on refresh.
    const _Game_Actor_refresh = Game_Actor.prototype.refresh;
    Game_Actor.prototype.refresh = function() {
        _Game_Actor_refresh.call(this);
        this.applyPermanentStateEffects();
    };

    // Reapply effects after battle (in case battle added/removed states).
    const _Game_Actor_onBattleEnd = Game_Actor.prototype.onBattleEnd;
    Game_Actor.prototype.onBattleEnd = function() {
        _Game_Actor_onBattleEnd.call(this);
        this.applyPermanentStateEffects();
    };

    // Main function: remove states that should be permanently removed and add
    // passive states (if they aren’t overridden by removal states).
    Game_Actor.prototype.applyPermanentStateEffects = function() {
        // 1. Calculate removal states from all learned skills.
        let removalStateIds = [];
        this.skills().forEach(skill => {
            extractRemovalStateIds(skill).forEach(id => {
                if (!removalStateIds.includes(id)) {
                    removalStateIds.push(id);
                }
            });
        });
        this._permanentRemovalStates = removalStateIds;

        // Remove any states that are in the removal list.
        removalStateIds.forEach(stateId => {
            if (this.isStateAffected(stateId)) {
                // Use the base method to bypass any overrides.
                Game_Battler.prototype.eraseState.call(this, stateId);
            }
        });

        // 2. Calculate passive states from all learned skills.
        let passiveStateIds = [];
        this.skills().forEach(skill => {
            extractPassiveStateIds(skill).forEach(id => {
                if (!passiveStateIds.includes(id)) {
                    passiveStateIds.push(id);
                }
            });
        });
        this._permanentPassiveStates = passiveStateIds;

        // 3. Add passive states that are not in the removal list.
        passiveStateIds.forEach(stateId => {
            if (!removalStateIds.includes(stateId) && !this.isStateAffected(stateId)) {
                this.addState(stateId);
            }
        });
    };

})();
