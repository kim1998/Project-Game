//=============================================================================
// NonCombatantActors.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Allows specific actors to be in the party but not participate in combat.
 * @author Your Name (Or AI)
 * @url Optional URL
 * @version 1.0.1
 *
 * @help NonCombatantActors.js
 *
 * This plugin allows you to designate certain actors as "non-combatants".
 * These actors will be part of the $gameParty, visible in menus (like Status,
 * Formation reserves), and can use skills outside of battle if applicable,
 * but they will NOT:
 *   - Appear on the battle screen.
 *   - Be included in the turn order.
 *   - Be targetable by allies or enemies in battle.
 *   - Count towards the maximum number of battle members.
 *
 * How to Use:
 * 1. Go to the Actors tab in the Database.
 * 2. Find the actor you want to make a non-combatant.
 * 3. In their "Note" box, add the following tag:
 *    <NonCombatant>
 *
 * That's it! Any actor with this tag will be excluded from combat participation.
 *
 * Example:
 * You might have a quest giver NPC or a young child character who follows the
 * party but doesn't fight. Add <NonCombatant> to their actor notes.
 *
 * Compatibility:
 * - This plugin overrides the `Game_Party.prototype.battleMembers` method.
 *   Plugins that also modify this method might conflict. Ensure this plugin
 *   is placed appropriately in the plugin list (generally, modifications to
 *   core functions like this might work better lower down, but test).
 * - It relies on the standard way battle members are determined. Plugins that
 *   drastically change the battle system or party setup might need patches.
 *
 * Note on Formation Scene:
 * Because this plugin filters `battleMembers`, the Formation scene should
 * automatically reflect who is *actually* participating in battle in the
 * active slots. Non-combatant actors should only appear in the reserve list
 * or be visually distinct if placed in an "active" slot by another plugin
 * that bypasses standard formation logic (which is unlikely for the default
 * scene). They cannot be *swapped* into the active battle formation by the
 * default scene logic because they won't be considered valid battle members
 * to fill those slots.
 *
 * Version History:
 * 1.0.0: Initial Release
 * 1.0.1: Added check for $dataActors existence in isNonCombatant.
 *
 */

(() => {
    'use strict';

    const PLUGIN_NAME = "NonCombatantActors";
    const NON_COMBATANT_TAG = "NonCombatant";

    //=============================================================================
    // Game_Actor
    //=============================================================================

    // Add a helper function to quickly check if an actor is a non-combatant
    Game_Actor.prototype.isNonCombatant = function() {
        // Ensure the actor data exists before checking meta
        if ($dataActors[this.actorId()]) {
            return !!$dataActors[this.actorId()].meta[NON_COMBATANT_TAG];
        }
        return false; // Actor data not found, assume not non-combatant
    };

    //=============================================================================
    // Game_Party
    //=============================================================================

    // Alias the original battleMembers function
    const _Game_Party_battleMembers = Game_Party.prototype.battleMembers;

    /**
     * Returns the array of actors who CAN participate in battle.
     * This filters out any actor marked with the <NonCombatant> tag.
     * @returns {Game_Actor[]} The list of actors for battle.
     */
    Game_Party.prototype.battleMembers = function() {
        // Get all members first (respecting original party order)
        const allMembers = this.allMembers();
        const combatants = [];

        // Iterate through all party members
        for (const actor of allMembers) {
            // If the actor is NOT a non-combatant, add them to the potential list
            if (actor && !actor.isNonCombatant()) {
                combatants.push(actor);
            }
            // Stop adding if we have reached the maximum number of *combatant* actors
            if (combatants.length >= this.maxBattleMembers()) {
                break;
            }
        }
        return combatants;

        /*
        // --- Alternative approach using filter and slice ---
        // This is cleaner but potentially slightly less performant if the party is huge,
        // as it filters the whole list first. For typical party sizes, it's fine.
        return this.allMembers()
            .filter(actor => actor && !actor.isNonCombatant()) // Keep only combatants
            .slice(0, this.maxBattleMembers());               // Take only the max allowed
        */
    };

    // Note: We don't need to modify Scene_Formation directly because it relies on
    // Game_Party.prototype.battleMembers() to determine who is displayed in the
    // active party slots. By correctly overriding battleMembers, the formation
    // scene should implicitly handle non-combatants correctly (they won't be
    // considered part of the "battle members" group shown at the top/left).

})();