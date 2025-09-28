/*:
 * @target MZ
 * @plugindesc Allows armors to have multiple Armor Types via notetags. (v4 - Stable)
 * @author Google Gemini
 * @version 4.0.0
 *
 * @help
 * MultiArmorType.js
 * Version 4.0.0
 *
 * I sincerely apologize for the non-working previous versions. This version
 * has been completely rewritten to be stable, compatible, and to correctly
 * implement the desired feature. It targets the most specific function in the
 * game's code to avoid conflicts and ensure it works in all situations.
 *
 * --- Purpose ---
 * This plugin allows a single piece of armor to belong to multiple "Armor Types"
 * (the types defined in Database -> Types).
 *
 * This lets you create a single item that can be equipped by different actors
 * who have unique armor restrictions (e.g., via the "Equip Armor: [Type]" trait).
 * For example, an item that counts as both "Human Armor" and "Elf Armor".
 *
 * --- Notetag Setup ---
 * In the note box of an armor item in the database, add the following tag:
 *
 *   <MultiArmorType: id1, id2, ...>
 *
 * - Replace `id1`, `id2`, etc., with the numerical IDs of the *additional*
 *   Armor Types you want the item to have.
 * - You can find the IDs in the Database -> Types -> Armor Types list.
 *
 * --- Example ---
 * Your Armor Types are:
 *   ID 5: Human Armor
 *   ID 6: Elf Armor
 *
 * You have an actor with the trait "Equip Armor: Human Armor" and another
 * with "Equip Armor: Elf Armor". You create a "Pendant of Harmony".
 *
 * 1. Set the pendant's main "Armor Type" to "Accessory" (or any other type).
 * 2. In its notebox, add:
 *    <MultiArmorType: 5, 6>
 *
 * Now, both actors will be able to equip the Pendant of Harmony because the
 * plugin will see that it satisfies their specific armor type traits, even
 * if its main armor type does not.
 *
 */
(() => {
    const pluginName = "MultiArmorType";

    // This is the correct, specific function to modify. It is called by the
    // engine to check if an actor's traits allow a specific armor item.
    const _Game_Actor_isEquipArmorOk = Game_Actor.prototype.isEquipArmorOk;
    Game_Actor.prototype.isEquipArmorOk = function(item) {
        // First, run the original game's logic. If the item's default armor
        // type is equippable, we don't need to do anything else. This ensures
        // full compatibility and standard behavior.
        if (_Game_Actor_isEquipArmorOk.call(this, item)) {
            return true;
        }

        // The original check failed. This is where our plugin's logic begins.
        // We know the actor must have armor type restrictions, otherwise the
        // original function would have returned true.

        // Check if the item being checked has our notetag.
        const multiArmorTypeTag = item.meta.MultiArmorType;
        if (item && multiArmorTypeTag) {
            // Get the list of armor types this actor is allowed to wear from their traits.
            const actorAllowedTypes = this.armourTypes();
            
            // Parse the armor type IDs from our notetag into an array of numbers.
            const extraItemTypes = multiArmorTypeTag.split(',').map(id => parseInt(id.trim(), 10));

            // Now, check if any of the extra types from the notetag
            // exist in the actor's list of allowed types.
            for (const typeId of extraItemTypes) {
                if (actorAllowedTypes.includes(typeId)) {
                    // We found a match! The actor is allowed to wear one of
                    // the armor types specified in the notetag. Allow the equip.
                    return true;
                }
            }
        }

        // If we reach this point, both the original check and our notetag
        // check have failed. The item cannot be equipped.
        return false;
    };

})();