//=============================================================================
// Theo - Skill Cooldown
//=============================================================================
// Author: TheoAllen
// Version: 1.1.0
//=============================================================================
/*:
 * @plugindesc [v1.1.0] Adds a cooldown system for skills. Can trigger common events on completion.
 * @author TheoAllen
 * @target MZ
 * @url https://github.com/TheoAllen/TheoAllen_MZPlugins
 *
 * @help
 * === Introduction ===
 * This plugin adds a cooldown system for skills in RPG Maker MZ.
 * After a skill with a cooldown is used, the battler must wait a specified
 * number of turns before using it again.
 *
 * === How to Use ===
 * 1. Place the plugin in your project's js/plugins folder.
 * 2. Activate the plugin through the Plugin Manager.
 * 3. Add notetags to the skills you want to have cooldowns.
 *
 * === Notetags ===
 * Add these tags to the Note box of a Skill in the database:
 *
 * <cooldown: turns>
 * Sets the number of turns the skill will be on cooldown after use.
 * Replace 'turns' with a number (e.g., <cooldown: 3>).
 *
 * <cd_event: id>
 * (Optional) Specifies the ID of a Common Event to trigger when this skill's
 * cooldown finishes (reaches 0 turns) for the battler.
 * Replace 'id' with the Common Event ID (e.g., <cd_event: 5>).
 * The common event will be queued to run at the next available opportunity
 * (usually after the current troop event page finishes or on the map).
 *
 * === Example ===
 * A skill with the following notetags:
 * <cooldown: 5>
 * <cd_event: 10>
 *
 * Will have a 5-turn cooldown after use. When the cooldown count reaches 0
 * at the end of a turn, Common Event 10 will be triggered.
 *
 * === Important Notes ===
 * - Cooldowns decrease at the end of each battler's turn (`onTurnEnd`).
 * - Cooldowns are reset at the start and end of battles.
 * - The skill cost window will display the remaining cooldown turns instead
 *   of the skill cost if the skill is on cooldown.
 *
 * === Changelog ===
 * v1.1.0 (Kimo's Edit):
 *  - Added <cd_event: id> notetag to trigger a common event on cooldown end.
 *  - Refactored database loading slightly.
 * v1.0.0:
 *  - Initial release.
 *
 */
var Theo = Theo || {};
Theo.SkillCD = function() {
    const _ = Theo.SkillCD;
    const $ = Game_Battler.prototype;
    const WSKILL = Window_SkillList.prototype; // Alias for Window_SkillList prototype

    _.PLUGIN_NAME = 'Theo_SkillCooldown';
    _.version = '1.1.0';

    // --- Parameters --- (None currently, but good practice to have a section)

    // --- Regex ---
    _.cooldownRGX = /<\s*cooldown\s*:\s*(\d+)\s*>/i;
    _.cdEventRGX = /<\s*cd_event\s*:\s*(\d+)\s*>/i; // Regex for the common event tag

    // --- Battler Cooldown Management ---
    // Battler property to store cooldowns { skillId: turns }
    // Initialized in initMembers alias.

    _.skillInCooldown = function(skillId) {
        // Check if the skill exists in cooldowns and has turns remaining > 0
        return this._cooldowns && this._cooldowns[String(skillId)] && this._cooldowns[String(skillId)] > 0;
    };

    _.resetCooldown = function() {
        // Resets all cooldowns for the battler
        this._cooldowns = {};
    };

    _.updateCooldown = function() {
        // Decrements cooldowns and checks for completion + common event triggers
        if (!this._cooldowns) return; // Safety check

        Object.keys(this._cooldowns).forEach(skillIdStr => {
            const currentCooldown = this._cooldowns[skillIdStr];
            if (currentCooldown > 0) {
                this._cooldowns[skillIdStr] -= 1; // Decrement cooldown

                // Check if cooldown just reached 0
                if (this._cooldowns[skillIdStr] === 0) {
                    const skillId = parseInt(skillIdStr);
                    const skillData = $dataSkills[skillId];

                    // Check if skill exists and has a common event ID configured
                    if (skillData && skillData._cdEventId && skillData._cdEventId > 0) {
                        //console.log(`Battler ${this.name()} Skill ${skillId} cooldown finished. Triggering CE ${skillData._cdEventId}`); // Debug log
                        $gameTemp.reserveCommonEvent(skillData._cdEventId);
                    }
                }
            }
        });
    };

    _.setCooldown = function(skillId, turn) {
        // Sets a specific skill's cooldown duration
        if (!this._cooldowns) { this._cooldowns = {}; } // Ensure exists
        if (turn > 0) { // Only set if cooldown duration is positive
            this._cooldowns[String(skillId)] = turn;
        }
    };

    // --- Aliasing Core Functions ---

    // Initialize members
    _.initMembers = $.initMembers;
    $.initMembers = function() {
        _.initMembers.call(this);
        _.resetCooldown.call(this); // Initialize/reset cooldowns on battler creation
    };

    // Update cooldowns at turn end
    _.onTurnEnd = $.onTurnEnd;
    $.onTurnEnd = function() {
        _.onTurnEnd.call(this);
        _.updateCooldown.call(this); // Update cooldowns after other turn-end effects
    };

    // Reset cooldowns on battle start
    _.onBattleStart = $.onBattleStart;
    $.onBattleStart = function(advantageous) {
        _.resetCooldown.call(this); // Reset before standard battle start logic
        _.onBattleStart.call(this, advantageous);
    };

    // Reset cooldowns on battle end
    _.onBattleEnd = $.onBattleEnd;
    $.onBattleEnd = function() {
        _.resetCooldown.call(this); // Reset before standard battle end logic
        _.onBattleEnd.call(this);
    };

    // Set cooldown after paying skill cost (i.e., after successful use)
    _.paySkillCost = $.paySkillCost;
    $.paySkillCost = function(skill) {
        _.paySkillCost.call(this, skill); // Pay cost first
        // Check if the skill has a cooldown defined (_skillCD is loaded from notetag)
        if (skill && skill._skillCD > 0) {
            _.setCooldown.call(this, skill.id, skill._skillCD);
        }
    };

    // Prevent using skill if on cooldown
    _.canPaySkillCost = $.canPaySkillCost;
    $.canPaySkillCost = function(skill) {
        // Must meet original conditions AND not be in cooldown
        return _.canPaySkillCost.call(this, skill) && !_.skillInCooldown.call(this, skill.id);
    };

    // --- Aliasing Window_SkillList ---

    // Draw cooldown status in the skill list window
    _.drawSkillCost = WSKILL.drawSkillCost;
    WSKILL.drawSkillCost = function(skill, x, y, width) {
        if (this._actor && _.skillInCooldown.call(this._actor, skill.id)) {
            // If skill is on cooldown for the current actor
            this.changeTextColor(ColorManager.textColor(8)); // Use a disabled/specific color
            const remainingTurns = this._actor._cooldowns[String(skill.id)];
            const text = remainingTurns + (remainingTurns === 1 ? " Turn" : " Turns"); // Pluralization
            // Draw text aligned to the right in the cost area
            this.drawText(text, x, y, width, "right");
            return; // Stop here, don't draw original cost
        }
        // If not on cooldown, draw the original cost
        _.drawSkillCost.call(this, skill, x, y, width);
    };

    // --- DataManager Loading ---

    _.dbLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        if (!_.dbLoaded.call(this)) { return false; };
        // Check if our custom data has already been loaded
        if (!_.skillDataProcessed) {
            this.processSkillCooldownNotetags();
            _.skillDataProcessed = true; // Set flag to prevent reprocessing
        }
        return true;
    };

    DataManager.processSkillCooldownNotetags = function() {
        // Iterate through all skills in the database ($dataSkills)
        for (const skill of $dataSkills) {
            if (skill) { // Check if the skill data exists (index 0 is null)
                _.loadDBSkillData(skill); // Process notetags for this skill
            }
        }
    };

    _.loadDBSkillData = function(dbSkill) {
        // Initialize custom properties
        dbSkill._skillCD = 0;
        dbSkill._cdEventId = 0; // Initialize common event ID property

        const notedata = dbSkill.note.split(/[\r\n]+/); // Split note into lines

        // Process each line of the notetag
        for (const line of notedata) {
            let match;
            if ((match = line.match(_.cooldownRGX))) {
                dbSkill._skillCD = parseInt(match[1]) || 0; // Store cooldown turns
            } else if ((match = line.match(_.cdEventRGX))) {
                dbSkill._cdEventId = parseInt(match[1]) || 0; // Store common event ID
            }
        }
    };

} // End Theo.SkillCD function definition

Theo.SkillCD(); // Initialize the plugin