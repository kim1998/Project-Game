//=============================================================================
// VisuStella MZ - Extra Enemy Drops
// VisuMZ_4_ExtraEnemyDrops.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_ExtraEnemyDrops = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ExtraEnemyDrops = VisuMZ.ExtraEnemyDrops || {};
VisuMZ.ExtraEnemyDrops.version = 1.10;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.10] [ExtraEnemyDrops]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Extra_Enemy_Drops_VisuStella_MZ
 * @base VisuMZ_4_ExtraEnemyDrops
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * By default, RPG Maker MZ limits enemies to only drop up to 3 items max and
 * at very limited drop rates. This plugin allows you to add more than 3 items
 * at drop and at custom rates that aren't limited to a demoninator value.
 * 
 * This plugin also gives the functionality to force specific drops or give any
 * additional bonus drops to make some battles give different rewards despite
 * having the same types of enemies encountered before.
 * 
 * And if you have the VisuStella Battle Core, drops can be visible on the
 * battlefield and spring out of the enemies as they collapse!
 *
 * Features include all (but not limited to) the following:
 * 
 * * More than 3 drops per enemy can be given.
 * * Drop probability is a percentile value and not a demoniator setting.
 * * Make Conditional Drops that only appear depending on the events that took
 *   place during the battle.
 * * JavaScript notetags that let you make conditional drops based on code.
 * * New plugin commands to allow for forced drops and/or bonus drops.
 * * Forced drops will override any existing drops made from the enemy troop.
 * * Bonus drops will be additional drops in addition to those dropped from the
 *   enemy troop.
 * * If you have the Battle Core, drops become visible on the battlefield.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Forced Enemy Drops
 * 
 * - If forced enemy drops are used (through a Plugin Command), then all other
 * drop-related functions will be ignored in favor of the forced enemy drops.
 * This is because all forced drops are made to favor a specific set of drops
 * ordered by the game developer.
 * 
 * - This will prevent visual drops from appearing, too. Any visual drops that
 * have already been made present will also disappear.
 *
 * ---
 *
 * ============================================================================
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * Visual Drops (Battle Core)
 *
 * - Drops become visible on the battlefield. Once an enemy is defeated, visual
 * drops will appear out of their former position. These drops are shown as
 * icons, representing the EXP, Gold, and Drop Items an enemy will yield if the
 * battle is won.
 * 
 * - This feature can be disabled.
 * 
 * - If this feature is enabled, there is a slight change to the drop system.
 * Previously, drops are determined at the end of battle. Now, to visibly
 * appear upon the defeat of an enemy, they are then determined at the moment
 * of their death.
 * 
 * - What this means is, if an EXP or Gold boost is applied after they've been
 * defeated, it will not be retroactive and apply to the drops that become
 * visible on the battlefield. As a result, the player has to be tactical in
 * when they defeat the enemies after applying the EXP and Gold buffs.
 * 
 * - Depending on the Plugin Parameter settings, if an enemy revives, their
 * drops can be reset. If the reset is allowed, the player can acquire a whole
 * different set of drops upon the enemy's subsequent defeats. This feature can
 * be turned off.
 * 
 * - A reviving enemy will cause its visual drops to disappear.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 * 
 * === General Drop-Related Notetags ===
 * 
 * The following notetags are related to giving enemies additional drops with
 * more control over probability rates.
 * 
 * ---
 *
 * <Item Drop id: x%>
 * <Item Drop id To id: x%>
 * <Item Drop name: x%>
 * 
 * <Weapon Drop id: x%>
 * <Weapon Drop id To id: x%>
 * <Weapon Drop name: x%>
 * 
 * <Armor Drop id: x%>
 * <Armor Drop id To id: x%>
 * <Armor Drop name: x%>
 *
 * - Used for: Enemy Notetags
 * - Gives the enemy 'x' percent chance to drop the designated item, weapon,
 *   or armor.
 * - Replace 'id' with the ID of the item, weapon, or armor you wish to assign
 *   to the enemy as a potential drop.
 *   - For 'id To id' variants, insert the starting ID and ending ID for the
 *     items, weapons, and/or armors you wish to add as a batch. This will
 *     ignore any entries without a name or with ----- in its name.
 * - With the 'name' notetag variant, replace 'name' with the name of the item,
 *   weapon, or armor you wish to assign to the enemy as a potential drop.
 * - Replace 'x' with a number representing the percentile probability chance
 *   of successfully acquiring that item as a drop.
 * - Insert multiple copies of these notetags if you wish to include more drops
 *   for the enemies.
 * 
 * Examples:
 * 
 * <Item Drop 5: 20%>
 * <Item Drop 5 To 10: 20%>
 * <Item Drop Potion: 30%>
 * 
 * <Weapon Drop 27: 45%>
 * <Weapon Drop 27 To 37: 45%>
 * <Weapon Drop Blade of Reckoning: 55%>
 * 
 * <Armor Drop 19: 72%>
 * <Armor Drop 19 To 23: 72%>
 * <Armor Drop Flame Shield: 90%>
 *
 * ---
 *
 * <Drops>
 *  Item id: x%
 *  Item id To id: x%
 *  Item name: x%
 *  Weapon id: x%
 *  Weapon id To id: x%
 *  Weapon name: x%
 *  Armor id: x%
 *  Armor id To id: x%
 *  Armor name: x%
 * </Drops>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - Creates a batch list of item, weapon, armor drops.
 * - This isn't any different than creating individual copies of the above
 *   notetags as far as results go, but some may prefer this approach to make
 *   the drop table look "cleaner".
 * - Replace 'id' with the ID of the item, weapon, or armor you wish to assign
 *   to the enemy as a potential drop.
 *   - For 'id To id' variants, insert the starting ID and ending ID for the
 *     items, weapons, and/or armors you wish to add as a batch. This will
 *     ignore any entries without a name or with ----- in its name.
 * - With the 'name' notetag variant, replace 'name' with the name of the item,
 *   weapon, or armor you wish to assign to the enemy as a potential drop.
 * - Replace 'x' with a number representing the percentile probability chance
 *   of successfully acquiring that item as a drop.
 * 
 * Example:
 *
 * <Drops>
 *  Item 5: 20%
 *  Item Potion: 30%
 *  Weapon 27: 45%
 *  Weapon Blade of Reckoning: 55%
 *  Armor 72: 72%
 *  Armor Flame Shield: 90%
 * </Drops>
 *
 * ---
 * 
 * === Conditional Drop-Related Notetags ===
 * 
 * Conditional drops are drops that only appear once specific conditions have
 * been met. For each condition met, their chances of dropping can be raised
 * higher or lower.
 * 
 * ---
 * 
 * <Conditional Item id Drop>
 *  condition: +x%
 *  condition: +x%
 *  condition: -x%
 *  condition: -x%
 * </Conditional Item id Drop>
 * 
 * <Conditional Item id To id Drops>
 *  condition: +x%
 *  condition: +x%
 *  condition: -x%
 *  condition: -x%
 * </Conditional Item id To id Drops>
 * 
 * <Conditional Item name Drop>
 *  condition: +x%
 *  condition: +x%
 *  condition: -x%
 *  condition: -x%
 * </Conditional Item name Drop>
 * 
 * <Conditional Weapon id Drop>
 *  condition: +x%
 *  condition: +x%
 *  condition: -x%
 *  condition: -x%
 * </Conditional Weapon id Drop>
 * 
 * <Conditional Weapon id To id Drop>
 *  condition: +x%
 *  condition: +x%
 *  condition: -x%
 *  condition: -x%
 * </Conditional Weapon id To id Drop>
 * 
 * <Conditional Weapon name Drop>
 *  condition: +x%
 *  condition: +x%
 *  condition: -x%
 *  condition: -x%
 * </Conditional Weapon name Drop>
 * 
 * <Conditional Armor id Drop>
 *  condition: +x%
 *  condition: +x%
 *  condition: -x%
 *  condition: -x%
 * </Conditional Armor id Drop>
 * 
 * <Conditional Armor id To id Drop>
 *  condition: +x%
 *  condition: +x%
 *  condition: -x%
 *  condition: -x%
 * </Conditional Armor id To id Drop>
 * 
 * <Conditional Armor name Drop>
 *  condition: +x%
 *  condition: +x%
 *  condition: -x%
 *  condition: -x%
 * </Conditional Armor name Drop>
 *
 * - Used for: Enemy Notetags
 * - Create conditional item, weapon, and/or armor drops for this enemy.
 * - Insert multiples of these notetags if you want more than one conditional
 *   drop for this enemy.
 * - Use the associated item, weapon, or armor type notetag for the type of
 *   conditional drop you want for the enemy.
 * - Replace 'id' with the ID number of the item, weapon, or armor to drop.
 *   - For 'id To id' variants, insert the starting ID and ending ID for the
 *     items, weapons, and/or armors you wish to add as a batch. This will
 *     ignore any entries without a name or with ----- in its name.
 * - Replace 'name' with the name of the item, weapon, or armor to drop.
 * - Replace 'condition' with any of the conditions listed in below section.
 * - Replace 'x' with the increase or decrease in percentage drop chance.
 * 
 * ---
 * 
 * -=-=- Condition List -=-=-
 *
 * Replace 'condition' in the notetags in the above section with any of the
 * following to make conditions. These conditions are also used in the Plugin
 * Parameters for the default conditions, too.
 * 
 * ---
 *
 * x >= y
 * x > y
 * x === y
 * x !== y
 * x < y
 * x <= y
 * 
 * - Replace 'x' and 'y' with any of the following:
 *
 * - 'Switch x' (replace 'x' with a number) for switch x's current state.
 * - 'TRUE', 'FALSE', 'ON', 'OFF' for the opposite x/y value.
 * - Using any of these boolean modifiers must be paired with '===' or '!=='
 *
 * - 'Variable x' (replace 'x' with a number) for variable x's current value.
 * - A numeric value representing a hard number.
 * - '50%' or any other percentile number to represent a rate.
 * - '0.5' or any other float number to represent a rate.
 * 
 * - 'Item id Count' for the number of specific items the party owns.
 *   - Replace 'id' with the ID of the item.
 * - 'Item name Count' for the number of specific items the party owns.
 *   - Replace 'name' with the ID of the item.
 * 
 * - 'Weapon id Count' for the number of specific weapons the party owns.
 *   - Replace 'id' with the ID of the weapon.
 * - 'Weapon name Count' for the number of specific weapons the party owns.
 *   - Replace 'name' with the ID of the weapon.
 * 
 * - 'Armor id Count' for the number of specific armors the party owns.
 *   - Replace 'id' with the ID of the armor.
 * - 'Armor name Count' for the number of specific armors the party owns.
 *   - Replace 'name' with the ID of the armor.
 * 
 * - 'Alive Members' for the number of alive party members when drops are
 *   being determined.
 * 
 * - 'Battle Members' for the number of participating party members in battle.
 * 
 * - 'Battle Turns' for the number of turns passed in battle when drops are
 *   being determined.
 * 
 * - 'Dead Members' for the number of dead party members when drops are
 *   being determined.
 * 
 * - 'Death Turn' for the turn the enemy died. If an enemy was revived during
 *   battle, then take the most recent turn the enemy has died.
 * 
 * - 'Enemy Level' for the current level of the enemy if using the 'level'
 *   property for the Game_Enemy object.
 * 
 * - 'Party Gold' for the party's current gold value when drops are
 *   being determined.
 * 
 * - 'Party Members' for the number of total party members in battle.
 * 
 * - 'Times type id Struck' for the number of times the enemy was struck
 *   with 'type' 'id' during battle.
 * - Replace 'type' with 'Element' for the number of times the enemy was struck
 *   with specific elemental damage.
 * - Replace 'type' with 'Item' for the number of times the enemy was struck
 *   with a specific item.
 * - Replace 'type' with 'Skill' for the number of times the enemy was struck
 *   with a specific skill.
 * - Replace 'type' with 'SType' for the number of times the enemy was struck
 *   by any skill of a specifici skill type.
 * - Replace 'type' with 'State' for the number of times the enemy was struck
 *   with a specific state.
 * - Replace 'id' with the type's ID.
 * 
 * - 'Times type name Struck' for the number of times the enemy was struck
 *   with 'type' 'name' during battle.
 * - Replace 'type' with 'Element' for the number of times the enemy was struck
 *   with specific elemental damage.
 * - Replace 'type' with 'Item' for the number of times the enemy was struck
 *   with a specific item.
 * - Replace 'type' with 'Skill' for the number of times the enemy was struck
 *   with a specific skill.
 * - Replace 'type' with 'SType' for the number of times the enemy was struck
 *   by any skill of a specifici skill type.
 * - Replace 'type' with 'State' for the number of times the enemy was struck
 *   with a specific state.
 * - Replace 'name' with the type's name in the database.
 * 
 * ---
 * 
 * Always
 * 
 * - This condition is always met. Use this to set a base drop chance.
 * 
 * ---
 * 
 * Random x%
 * 
 * - Offers a random 'x' chance to increase/decrease drop chance.
 * 
 * ---
 * 
 * Last Strike type id
 * Last Strike type name
 * 
 * - Checks the condition to see if the last struck action against the enemy
 *   was done by a specific action.
 * - Replace 'type' with 'Element' for the last struck element.
 * - Replace 'type' with 'Item' for the last struck item if it was an item.
 *   This will override the 'Skill' and 'SType' types.
 * - Replace 'type' with 'Skill' for the last struck skill if it was a skill.
 *   This will override the 'Item' type.
 * - Replace 'type' with 'SType' for the last struck skill type if it was
 *   a skill. This will override the 'Item' type.
 * - Replace 'type' with 'State' for the last struck state.
 * 
 * ---
 * 
 * Examples:
 * 
 * The following are some examples on how these conditional drops are used:
 * 
 * ---
 * 
 * <Conditional Item Potion Drop>
 *  Always: +20%
 *  Death Turn <= 3: +50%
 * </Conditional Item Potion Drop>
 * 
 * - Conditional drop is the Potion item.
 * - It has a base chance of 20%.
 * - If the enemy was defeated during or before turn 3, increase the drop
 *   chance by another 50%.
 * 
 * ---
 * 
 * <Conditional Weapon Mithril Sword Drop>
 *  Always: +100%
 *  Times SType Magic Struck: -10%
 *  Times SType Spell Struck: -10%
 * </Conditional Weapon Mithril Sword Drop>
 * 
 * - Conditional drop is the Mithril Sword weapon.
 * - It starts off with a 100% chance of a drop.
 * - Each time the enemy is struck with 'Magic' or 'Spell' type attacks,
 *   the drop chance decreases by 10%.
 * 
 * ---
 * 
 * <Conditional Armor Elemental Cloak Drop>
 *  Times Element Fire Struck: +10%
 *  Times Element Ice Struck: +10%
 *  Times Element Thunder Struck: +10%
 *  Times Element Physical Struck: -20%
 *  Times Skill Element Force Struck: +50%
 * </Conditional Armor Elemental Cloak Drop>
 * 
 * - Conditional drop is the Elemental Cloak armor.
 * - Each time the enemy is struck by 'Fire', 'Ice', or 'Thunder' damage,
 *   increase the drop chance by 10%.
 * - Each time the enemy is struck by 'Physical' damage, decrease the drop
 *   chance by 10%.
 * - Each time the enemy is struck by the specific skill 'Element Force',
 *   increase the drop chance by +50%.
 * 
 * ---
 *
 * === JavaScript Notetags: Drops ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over conditional enemy drop manipulation.
 *
 * ---
 *
 * <JS Drops>
 *  code
 *  code
 *  drops.push($dataItems[1]);
 *  drops.push($dataWeapons[2]);
 *  drops.push($dataArmors[3]);
 * </JS Drops>
 *
 * - Used for: Enemy Notetags
 * - Replace 'code' with JavaScript code to make conditional checks in order
 *   to determine which items, weapons, and/or armors would be added to the
 *   drop pool.
 * - The 'drops' variable is an array which contains all of the currently
 *   existing drops from the enemy this notetag is on. It will be returned as
 *   an array upon running the notetag's JavaScript code.
 * - Add to or remove from the 'drops' variable to change up its contents.
 *
 * ---
 * 
 * === Visual Drop-Related Notetags ===
 * 
 * For those who want to customize how some items, weapons, or armors appear as
 * visual drops, use the following notetags.
 * 
 * ---
 *
 * <Visual Drop Icon: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Forces the drop item, weapon, or armor to appear as a different icon.
 * - Replace 'x' with the ID of the icon you wish to show.
 *
 * ---
 *
 * <Visual Drop Rarity: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Sets the item, weapon, or armor drop to be a specific rarity.
 * - Replace 'x' with a rarity value between 0 and 10. The settings applied to
 *   the visual drop will be based on their Plugin Parameter settings.
 * - This is mutually exclusive from the <Visual Drop Tint Color: r, g, b, k>
 *   and <Visual Drop Tint Duration: x> notetags.
 *
 * ---
 *
 * <Visual Drop Tint Color: r, g, b, k>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Sets the tint of visual drop item when it's visible on the battlefield.
 * - Replace 'r' with a red value between -255 and 255.
 * - Replace 'g' with a green value between -255 and 255.
 * - Replace 'b' with a blue value between -255 and 255.
 * - Replace 'k' with a gray value between 0 and 255.
 * - This does not work with the <Visual Drop Rarity: x> notetag.
 *
 * ---
 *
 * <Visual Drop Tint Duration: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Sets the duration of the tint effect.
 * - Replace 'x' with the number of frames to tint the visual drop. The lower
 *   the number, the faster the tint pulses. The higher the number, the slower
 *   the tint pulses.
 *
 * ---
 *
 * <Visual Drop Spawn SFX: filename>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - When the item, weapon, or armor's visual drop spawns on the battlefield,
 *   play a sound effect.
 * - Replace 'filename' with the name of a sound effect from the game project's
 *   /audio/se/ folder. Do not include the file extension.
 * - Example: <Visual Drop Spawn SFX: Float1>
 *
 * ---
 *
 * <Visual Drop Bounce Height: x%>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Alters how bouncy this visual drop is as it spawns on the battlefield.
 * - Replace 'x' with a percentage value on how much higher the visual drop
 *   should bounce than normal (whatever is set in the Plugin Parameters).
 *
 * ---
 *
 * <Visual Drop Bounce SFX: filename>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - When the item, weapon, or armor's visual drop bounces on the battlefield,
 *   play a sound effect.
 * - Replace 'filename' with the name of a sound effect from the game project's
 *   /audio/se/ folder. Do not include the file extension.
 * - Example: <Visual Drop Bounce SFX: Float1>
 *
 * ---
 *
 * <Visual Drop Flag: Rainbow>
 * <Visual Drop Flag: Additive>
 * <Visual Drop Flag: Multiply>
 * <Visual Drop Flag: Screen>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Adds visual effects to visual drop when it's on the battlefield.
 * - The 'Rainbow' effect causes the icon's hue to constantly change.
 * - The 'Additive', 'Multiply', and 'Screen', effects are blend modes.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Bonus Reward Plugin Commands ===
 * 
 * ---
 *
 * Bonus Rewards: Clear
 * - Clears all bonus drops.
 *
 * ---
 *
 * Bonus Rewards: Set EXP
 * - Determines additional EXP the player will get in battle by this value.
 *
 *   EXP:
 *   - Determines additional EXP the player will get in battle by this value.
 *
 * ---
 *
 * Bonus Rewards: Set Gold
 * - Determines additional Gold the player will get in battle by this value.
 *
 *   Gold:
 *   - Determines additional Gold the player will get in battle by this value.
 *
 * ---
 *
 * Bonus Rewards: Add Item
 * - Adds the bonus drop the player earns from this battle to have the
 *   following item given at a specific quantity.
 *
 *   Item ID:
 *   - Which item do you wish to give the player?
 *
 *   Quantity:
 *   - How many copies of the bonus drop to give the player.
 *
 * ---
 *
 * Bonus Rewards: Add Weapon
 * - Adds the bonus drop the player earns from this battle to have the
 *   following weapon given at a specific quantity.
 *
 *   Weapon ID:
 *   - Which weapon do you wish to give the player?
 *
 *   Quantity:
 *   - How many copies of the bonus drop to give the player.
 *
 * ---
 *
 * Bonus Rewards: Add Armor
 * - Adds the bonus drop the player earns from this battle to have the
 *   following armor given at a specific quantity.
 *
 *   Armor ID:
 *   - Which armor do you wish to give the player?
 *
 *   Quantity:
 *   - How many copies of the bonus drop to give the player.
 *
 * ---
 * 
 * === Forced Reward Plugin Commands ===
 * 
 * ---
 *
 * Forced Rewards: Clear
 * - Clears all forced drops.
 *
 * ---
 *
 * Forced Rewards: Set EXP
 * - Change the amount of EXP the player will get in battle to this value.
 *
 *   EXP:
 *   - Change the amount of EXP the player will get in battle to this value.
 *
 * ---
 *
 * Forced Rewards: Set Gold
 * - Change the amount of Gold the player will get in battle to this value.
 *
 *   Gold:
 *   - Change the amount of Gold the player will get in battle to this value.
 *
 * ---
 *
 * Forced Rewards: Add Item
 * - Adds the forced drop the player earns from this battle to have the
 *   following item given at a specific quantity.
 *
 *   Item ID:
 *   - Which item do you wish to give the player?
 *
 *   Quantity:
 *   - How many copies of the forced drop to give the player.
 *
 * ---
 *
 * Forced Rewards: Add Weapon
 * - Adds the forced drop the player earns from this battle to have the
 *   following weapon given at a specific quantity.
 *
 *   Weapon ID:
 *   - Which weapon do you wish to give the player?
 *
 *   Quantity:
 *   - How many copies of the forced drop to give the player.
 *
 * ---
 *
 * Forced Rewards: Add Armor
 * - Adds the forced drop the player earns from this battle to have the
 *   following armor given at a specific quantity.
 *
 *   Armor ID:
 *   - Which armor do you wish to give the player?
 *
 *   Quantity:
 *   - How many copies of the forced drop to give the player.
 *
 * ---
 * 
 * === Visual Drop Plugin Commands ===
 * 
 * ---
 *
 * Visual Drops: Visibility
 * - Sets the visibility of visual drops during battle.
 *
 *   Visible:
 *   - Show visual drops during battle?
 *   - This will be reset at the start of next battle.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These settings govern the way Visual Drops are handled. These are global
 * rules that apply to all Visual Drops made through this plugin, from the
 * calculations made to determine their radius distance to the number of
 * bounces the drops make to whether or not the drops have shadows.
 *
 * ---
 *
 * General
 * 
 *   Enable?
 *   - Enable Visual Drops?
 *   - You know you want to.
 * 
 *   Reviving Resets Drops:
 *   - Do reviving enemies reset drops?
 *   - For more information, read the Extra Features section.
 *
 * ---
 *
 * Position
 * 
 *   Base Radius:
 *   - Base radius amount for drops.
 * 
 *   +Radius Per Drop:
 *   - Increase radius by this much per extra drop.
 * 
 *   Spin Degrees:
 *   - How many degrees do you want the icon to spin in its largest bounce?
 *   - Use 0 for no spin.
 * 
 *   Delay Between Drops:
 *   - How many milliseconds to delay the appearance of each visual drop?
 *   - Use 0 for no delay.
 * 
 *   Field of View Y:
 *   - What's the distortion rate for the field of view for the item
 *     positioning distribution.
 *
 * ---
 *
 * Bounce
 * 
 *   Bounce Duration:
 *   - Duration of the highest bounce.
 * 
 *   Bounce Total:
 *   - How many times do you want visual drops to bounce?
 *   - Use 0 for no bounces.
 * 
 *   Bounce Height:
 *   - The maximum height for the visual drops to fly out at.
 *   - This will decrease with each bounce.
 * 
 *   Bounce Reduction:
 *   - The rate at which each bounce reduces the duration and height by.
 *
 * ---
 *
 * Bounce SFX
 * 
 *   Filename:
 *   - Filename of the sound effect played.
 * 
 *   Volume:
 *   - Volume of the sound effect played.
 * 
 *   Pitch:
 *   - Pitch of the sound effect played.
 * 
 *   Pan:
 *   - Pan of the sound effect played.
 *
 * ---
 *
 * Icons
 * 
 *   Offset Y Rate:
 *   - At which rate do you want to offset the visual drop icons off the
 *     ground by?
 * 
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 * ---
 *
 * Shadow
 * 
 *   Show Shadow:
 *   - Show the shadow sprite?
 * 
 *   Shadow Filename:
 *   - Filename used for the visual drop shadow.
 * 
 *   Shadow Offset X:
 *   - Offset the shadow sprite X by this amount.
 *   - Negative numbers go left. Positive numbers go right.
 * 
 *   Shadow Offset Y:
 *   - Offset the shadow sprite Y by this amount.
 *   - Negative numbers go up. Positive numbers go down.
 * 
 *   Shadow Opacity:
 *   - Opacity level of the shadow.
 *   - 0 for transparent. 255 for opaque.
 *
 * ---
 *
 * Opacity
 * 
 *   Fade After Bounce:
 *   - Fade out the visual drops after they finish bouncing?
 * 
 *   Fade After Delay:
 *   - How many milliseconds to delay the fading by if the above option is
 *     selected?
 * 
 *   Opacity Fade Speed:
 *   - What speed should the opacity level fade out by?
 *   - Higher numbers are faster.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: EXP Settings
 * ============================================================================
 *
 * EXP can be depicted as a visual drop from the enemy. Depending on how much
 * EXP the enemy would give, a different setting can be used, determining the
 * icon used and which rarity effect to apply.
 *
 * ---
 *
 * General
 * 
 *   Show EXP Drop:
 *   - Show visual drops for EXP?
 *
 * ---
 *
 * Settings 1 through 10
 * 
 *   EXP Value:
 *   - How much EXP minimum to use this setting?
 * 
 *   Icon:
 *   - Which icon to use for this setting?
 * 
 *   Rarity:
 *   - Which rarity to use for this setting?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold can be depicted as a visual drop from the enemy. Depending on how much
 * Gold the enemy would give, a different setting can be used, determining the
 * icon used and which rarity effect to apply.
 *
 * ---
 *
 * General
 * 
 *   Show Gold Drop:
 *   - Show visual drops for Gold?
 *
 * ---
 *
 * Settings 1 through 10
 * 
 *   Gold Value:
 *   - How much Gold minimum to use this setting?
 * 
 *   Icon:
 *   - Which icon to use for this setting?
 * 
 *   Rarity:
 *   - Which rarity to use for this setting?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Enemy Drops Settings
 * ============================================================================
 *
 * These are the usual enemy drops that you're used to. These will factor in
 * extra drops, conditional drops, and drops added through JavaScript as well.
 * You can choose to have the enemy drops reveal their real icons or keep it
 * a surprise for when the player finally access the Victory Aftermath screen.
 *
 * ---
 *
 * General
 * 
 *   Show Enemy Drops:
 *   - Show visual drops for enemy drops?
 * 
 *   Use Unique Icons:
 *   - Show the icons of the drops?
 *   - If not, use the ones below.
 *
 * ---
 *
 * Common Icons
 * 
 *   Common Item Icon:
 *   Common Weapon Icon:
 *   Common Armor Icon:
 *   - What icon do you want to use for common items, weapons, and armors?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Rarity Settings
 * ============================================================================
 *
 * Visual Drop rarities are found in 11 tiers, No Rarity and Rarities 1 through
 * 10. How you use these rarities is up to you, the game dev. However, items of
 * a matching rarity level will display the same tints, durations, and flags.
 * Although more flags can be added later through notetags, matching rarities
 * will exhibit a common ground of flags.
 *
 * ---
 *
 * General
 * 
 *   Show Rarities:
 *   - Show visual effects for different rarities?
 *
 * ---
 *
 * No Rarity and Rarities 1 through 10
 * 
 *   Tint:
 *   - Tone settings for this rarity.
 *   - Format: [Red, Green, Blue, Gray]
 * 
 *   Duration:
 *   - What duration do you want for this rarity?
 * 
 *   Flags:
 *   - What flags do you want to apply to this rarity?
 *   - Flags:
 *     - Rainbow
 *     - Additive
 *     - Multiply
 *     - Screen
 *     - Bounce Height x%
 *     - Bounce SFX: filename 
 *     - Spawn SFX: filename
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.10: July 18, 2024
 * * Feature Update!
 * ** Removed null and undefined drops from drop pool due to incorrect name
 *    spelling in notetags. Update made by Olivia.
 * 
 * Version 1.09: January 18, 2024
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: January 13, 2022
 * * Feature Update!
 * ** Using a space at the start of a line inbetween batch notetags will no
 *    longer cause the contents inside to not work. Update made by Olivia.
 *
 * Version 1.07: June 18, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.06: March 19, 2021
 * * Bug Fixes!
 * ** Console no longer displays debug messages from last version.
 *    Fix made by Irina.
 * 
 * Version 1.05: February 12, 2021
 * * Bug Fixes!
 * ** Opacity Fade Speed Plugin Parameter now allows you to alter the value
 *    up to 255 now. Fix made by Irina.
 * ** EXP Setting 10 and Gold Setting 10 will no longer be hard limited.
 *    Fix made by Irina.
 * 
 * Version 1.04: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Updates!
 * ** Many of the notetags now have a batch variant to add items, weapons, or
 *    armors into the drop pool en masse. Updated by Yanfly.
 * 
 * Version 1.03: November 22, 2020
 * * Compatibility Update!
 * ** Non-conditional drops should be more compatible with other plugins.
 *    Update made by Yanfly.
 * 
 * Version 1.02: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.01: October 18, 2020
 * * Feature Update!
 * ** Bounce SFX pitch plugin parameter is now uncapped.
 *
 * Version 1.00: October 9, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BonusRewardsClear
 * @text Bonus Rewards: Clear
 * @desc Clears all bonus drops.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BonusExpSet
 * @text Bonus Rewards: Set EXP
 * @desc Determines additional EXP the player will get in battle by this value.
 *
 * @arg value:eval
 * @text EXP
 * @desc Determines additional EXP the player will get in battle by this value.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BonusGoldSet
 * @text Bonus Rewards: Set Gold
 * @desc Determines additional Gold the player will get in battle by this value.
 *
 * @arg value:eval
 * @text Gold
 * @desc Determines additional Gold the player will get in battle by this value.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BonusAddItem
 * @text Bonus Rewards: Add Item
 * @desc Adds the bonus drop the player earns from this battle to have
 * the following item given at a specific quantity.
 *
 * @arg id:num
 * @text Item ID
 * @type item
 * @desc Which item do you wish to give the player?
 * @default 1
 *
 * @arg quantity:eval
 * @text Quantity
 * @desc How many copies of the bonus drop to give the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BonusAddWeapon
 * @text Bonus Rewards: Add Weapon
 * @desc Adds the bonus drop the player earns from this battle to have
 * the following weapon given at a specific quantity.
 *
 * @arg id:num
 * @text Weapon ID
 * @type weapon
 * @desc Which weapon do you wish to give the player?
 * @default 1
 *
 * @arg quantity:eval
 * @text Quantity
 * @desc How many copies of the bonus drop to give the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BonusAddArmor
 * @text Bonus Rewards: Add Armor
 * @desc Adds the bonus drop the player earns from this battle to have
 * the following armor given at a specific quantity.
 *
 * @arg id:num
 * @text Armor ID
 * @type armor
 * @desc Which armor do you wish to give the player?
 * @default 1
 *
 * @arg quantity:eval
 * @text Quantity
 * @desc How many copies of the bonus drop to give the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ForcedRewardsClear
 * @text Forced Rewards: Clear
 * @desc Clears all forced drops.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ForcedExpSet
 * @text Forced Rewards: Set EXP
 * @desc Change the amount of EXP the player will get in battle to this value.
 *
 * @arg value:eval
 * @text EXP
 * @desc Change the amount of EXP the player will get in battle to this value.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ForcedGoldSet
 * @text Forced Rewards: Set Gold
 * @desc Change the amount of Gold the player will get in battle to this value.
 *
 * @arg value:eval
 * @text Gold
 * @desc Change the amount of Gold the player will get in battle to this value.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ForcedAddItem
 * @text Forced Rewards: Add Item
 * @desc Adds the forced drop the player earns from this battle to have
 * the following item given at a specific quantity.
 *
 * @arg id:num
 * @text Item ID
 * @type item
 * @desc Which item do you wish to give the player?
 * @default 1
 *
 * @arg quantity:eval
 * @text Quantity
 * @desc How many copies of the forced drop to give the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ForcedAddWeapon
 * @text Forced Rewards: Add Weapon
 * @desc Adds the forced drop the player earns from this battle to have
 * the following weapon given at a specific quantity.
 *
 * @arg id:num
 * @text Weapon ID
 * @type weapon
 * @desc Which weapon do you wish to give the player?
 * @default 1
 *
 * @arg quantity:eval
 * @text Quantity
 * @desc How many copies of the forced drop to give the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ForcedAddArmor
 * @text Forced Rewards: Add Armor
 * @desc Adds the forced drop the player earns from this battle to have
 * the following armor given at a specific quantity.
 *
 * @arg id:num
 * @text Armor ID
 * @type armor
 * @desc Which armor do you wish to give the player?
 * @default 1
 *
 * @arg quantity:eval
 * @text Quantity
 * @desc How many copies of the forced drop to give the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VisualDropVisible
 * @text Visual Drops: Visibility
 * @desc Sets the visibility of visual drops during battle.
 *
 * @arg Visible:eval
 * @text Visible
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show visual drops during battle?
 * This will be reset at the start of next battle.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Template
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param VisualDrops
 * @text Visual Drops
 *
 * @param General:struct
 * @text General Settings
 * @parent VisualDrops
 * @type struct<General>
 * @desc General settings regarding Visual Drops.
 * @default {"General":"","Enable:eval":"true","resetOnRevive:eval":"true","Position":"","radius:num":"20","radiusPerIcon:num":"5","angle:num":"1800","msDelay:num":"250","yRateFoV:num":"0.44","Bounce":"","duration:num":"60","bounces:num":"10","height:num":"100","bounceReduction:num":"0.75","SFX":"","sfxFilename:str":"Coin","sfxVolume:num":"90","sfxPitch:num":"100","sfxPan:num":"0","Icons":"","iconOffsetRate:num":"-1.75","iconJumpEasing:str":"Linear","Shadow":"","showShadow:eval":"true","shadowFilename:str":"Shadow1","shadowOffsetX:num":"0","shadowOffsetY:num":"8","shadowOpacity:num":"255","Opacity":"","fadeAfterBounce:eval":"false","fadeAfterDelay:num":"2000","opacityFadeOut:num":"8"}
 *
 * @param Exp:struct
 * @text EXP Settings
 * @parent VisualDrops
 * @type struct<Exp>
 * @desc Settings regarding EXP for Visual Drops.
 * @default {"General":"","show:eval":"true","Setting1":"","Value1:num":"1","Icon1:num":"73","Rarity1:num":"0","Setting2":"","Value2:num":"50","Icon2:num":"73","Rarity2:num":"1","Setting3":"","Value3:num":"100","Icon3:num":"89","Rarity3:num":"2","Setting4":"","Value4:num":"500","Icon4:num":"89","Rarity4:num":"3","Setting5":"","Value5:num":"1000","Icon5:num":"88","Rarity5:num":"4","Setting6":"","Value6:num":"2500","Icon6:num":"88","Rarity6:num":"5","Setting7":"","Value7:num":"5000","Icon7:num":"87","Rarity7:num":"6","Setting8":"","Value8:num":"10000","Icon8:num":"87","Rarity8:num":"7","Setting9":"","Value9:num":"25000","Icon9:num":"84","Rarity9:num":"8","Setting10":"","Value10:num":"50000","Icon10:num":"84","Rarity10:num":"9"}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @parent VisualDrops
 * @type struct<Gold>
 * @desc Settings regarding Gold for Visual Drops.
 * @default {"General":"","show:eval":"true","Setting1":"","Value1:num":"1","Icon1:num":"314","Rarity1:num":"0","Setting2":"","Value2:num":"50","Icon2:num":"314","Rarity2:num":"1","Setting3":"","Value3:num":"100","Icon3:num":"196","Rarity3:num":"2","Setting4":"","Value4:num":"500","Icon4:num":"196","Rarity4:num":"3","Setting5":"","Value5:num":"1000","Icon5:num":"313","Rarity5:num":"4","Setting6":"","Value6:num":"5000","Icon6:num":"313","Rarity6:num":"5","Setting7":"","Value7:num":"10000","Icon7:num":"303","Rarity7:num":"6","Setting8":"","Value8:num":"50000","Icon8:num":"303","Rarity8:num":"7","Setting9":"","Value9:num":"100000","Icon9:num":"300","Rarity9:num":"8","Setting10":"","Value10:num":"500000","Icon10:num":"300","Rarity10:num":"9"}
 *
 * @param Drop:struct
 * @text Enemy Drops Settings
 * @parent VisualDrops
 * @type struct<Drop>
 * @desc Settings regarding enemy drops for Visual Drops.
 * @default {"General":"","show:eval":"true","uniqueIcons:eval":"true","CommonIcons":"","commonItemIcon:num":"208","commonWeaponIcon:num":"210","commonArmorsIcon:num":"210"}
 *
 * @param Rarity:struct
 * @text Rarity Settings
 * @parent VisualDrops
 * @type struct<Rarity>
 * @desc Settings regarding enemy drops for Visual Drops.
 * @default {"General":"","show:eval":"true","Setting0":"","Tint0:eval":"[0, 0, 0, 0]","Duration0:num":"180","Flags0:arraystr":"[]","Setting1":"","Tint1:eval":"[0, 30, 60, 20]","Duration1:num":"180","Flags1:arraystr":"[]","Setting2":"","Tint2:eval":"[30, 60, 0, 40]","Duration2:num":"160","Flags2:arraystr":"[]","Setting3":"","Tint3:eval":"[60, 0, 30, 60]","Duration3:num":"140","Flags3:arraystr":"[]","Setting4":"","Tint4:eval":"[0, 60, 60, 80]","Duration4:num":"120","Flags4:arraystr":"[]","Setting5":"","Tint5:eval":"[60, 60, 0, 100]","Duration5:num":"100","Flags5:arraystr":"[]","Setting6":"","Tint6:eval":"[60, 0, 60, 120]","Duration6:num":"80","Flags6:arraystr":"[]","Setting7":"","Tint7:eval":"[0, 0, 60, 140]","Duration7:num":"70","Flags7:arraystr":"[]","Setting8":"","Tint8:eval":"[0, 60, 0, 160]","Duration8:num":"60","Flags8:arraystr":"[]","Setting9":"","Tint9:eval":"[60, 0, 0, 180]","Duration9:num":"50","Flags9:arraystr":"[]","Setting10":"","Tint10:eval":"[0, 0, 0, 0]","Duration10:num":"40","Flags10:arraystr":"[\"Rainbow\"]","SpecialEffects":"","RainbowHueSpeed:num":"4"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable Visual Drops?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable Visual Drops?
 * You know you want to.
 * @default true
 *
 * @param resetOnRevive:eval
 * @text Reviving Resets Drops 
 * @parent General
 * @type boolean
 * @on Resets
 * @off Already Set
 * @desc Do reviving enemies reset drops?
 * @default true
 * 
 * @param Position
 *
 * @param radius:num
 * @text Base Radius
 * @parent Position
 * @type number
 * @min 1
 * @desc Base radius amount for drops.
 * @default 20
 *
 * @param radiusPerIcon:num
 * @text +Radius Per Drop
 * @parent Position
 * @type number
 * @min 0
 * @desc Increase radius by this much per extra drop.
 * @default 5
 *
 * @param angle:num
 * @text Spin Degrees
 * @parent Position
 * @type number
 * @min 0
 * @desc How many degrees do you want the icon to spin in its
 * largest bounce? Use 0 for no spin.
 * @default 1800
 *
 * @param msDelay:num
 * @text Delay Between Drops
 * @parent Position
 * @type number
 * @min 0
 * @desc How many milliseconds to delay the appearance of each
 * visual drop? Use 0 for no delay.
 * @default 250
 *
 * @param yRateFoV:num
 * @text Field of View Y
 * @parent Position
 * @desc What's the distortion rate for the field of view
 * for the item positioning distribution.
 * @default 0.44
 * 
 * @param Bounce
 *
 * @param duration:num
 * @text Bounce Duration
 * @parent Bounce
 * @type number
 * @min 1
 * @desc Duration of the highest bounce.
 * @default 60
 *
 * @param bounces:num
 * @text Bounce Total
 * @parent Bounce
 * @type number
 * @min 0
 * @desc How many times do you want visual drops to bounce?
 * Use 0 for no bounces.
 * @default 10
 *
 * @param height:num
 * @text Bounce Height
 * @parent Bounce
 * @type number
 * @min 0
 * @desc The maximum height for the visual drops to fly out at.
 * This will decrease with each bounce.
 * @default 100
 *
 * @param bounceReduction:num
 * @text Bounce Reduction
 * @parent Bounce
 * @desc The rate at which each bounce reduces the duration
 * and height by.
 * @default 0.75
 * 
 * @param SFX
 * @text Bounce SFX
 *
 * @param sfxFilename:str
 * @text Filename
 * @parent SFX
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Coin
 *
 * @param sfxVolume:num
 * @text Volume
 * @parent SFX
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param sfxPitch:num
 * @text Pitch
 * @parent SFX
 * @type number
 * @max 100
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param sfxPan:num
 * @text Pan
 * @parent SFX
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param Icons
 *
 * @param iconOffsetRate:num
 * @text Offset Y Rate
 * @parent Icons
 * @desc At which rate do you want to offset the visual drop
 * icons off the ground by?
 * @default -1.75
 *
 * @param iconJumpEasing:str
 * @text Movement Easing
 * @parent Icons
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @param Shadow
 *
 * @param showShadow:eval
 * @text Show Shadow
 * @parent Shadow
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the shadow sprite?
 * @default true
 *
 * @param shadowFilename:str
 * @text Shadow Filename
 * @parent Shadow
 * @type file
 * @dir img/system/
 * @desc Filename used for the visual drop shadow.
 * @default Shadow1
 *
 * @param shadowOffsetX:num
 * @text Shadow Offset X
 * @parent Shadow
 * @desc Offset the shadow sprite X by this amount.
 * Negative numbers go left. Positive numbers go right.
 * @default 0
 *
 * @param shadowOffsetY:num
 * @text Shadow Offset Y
 * @parent Shadow
 * @desc Offset the shadow sprite Y by this amount.
 * Negative numbers go up. Positive numbers go down.
 * @default 8
 *
 * @param shadowOpacity:num
 * @text Shadow Opacity
 * @parent Shadow
 * @type number
 * @min 0
 * @max 255
 * @desc Opacity level of the shadow.
 * 0 for transparent. 255 for opaque.
 * @default 255
 * 
 * @param Opacity
 *
 * @param fadeAfterBounce:eval
 * @text Fade After Bounce
 * @parent Opacity
 * @type boolean
 * @on Fade
 * @off Keep
 * @desc Fade out the visual drops after they finish bouncing?
 * @default false
 *
 * @param fadeAfterDelay:num
 * @text Fade After Delay
 * @parent Opacity
 * @type number
 * @min 0
 * @desc How many milliseconds to delay the fading by if the
 * above option is selected?
 * @default 2000
 *
 * @param opacityFadeOut:num
 * @text Opacity Fade Speed
 * @parent Opacity
 * @type number
 * @max 255
 * @desc What speed should the opacity level fade out by?
 * Higher numbers are faster.
 * @default 8
 *
 */
/* ----------------------------------------------------------------------------
 * EXP Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Exp:
 * 
 * @param General
 *
 * @param show:eval
 * @text Show EXP Drop
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show visual drops for EXP?
 * @default true
 * 
 * @param Setting1
 * @text Setting 1
 *
 * @param Value1:num
 * @text EXP Value
 * @parent Setting1
 * @type number
 * @desc How much EXP minimum to use this setting?
 * @default 1
 *
 * @param Icon1:num
 * @text Icon
 * @parent Setting1
 * @desc Which icon to use for this setting?
 * @default 73
 *
 * @param Rarity1:num
 * @text Rarity
 * @parent Setting1
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 0
 * 
 * @param Setting2
 * @text Setting 2
 *
 * @param Value2:num
 * @text EXP Value
 * @parent Setting2
 * @type number
 * @desc How much EXP minimum to use this setting?
 * @default 50
 *
 * @param Icon2:num
 * @text Icon
 * @parent Setting2
 * @desc Which icon to use for this setting?
 * @default 73
 *
 * @param Rarity2:num
 * @text Rarity
 * @parent Setting2
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 1
 * 
 * @param Setting3
 * @text Setting 3
 *
 * @param Value3:num
 * @text EXP Value
 * @parent Setting3
 * @type number
 * @desc How much EXP minimum to use this setting?
 * @default 100
 *
 * @param Icon3:num
 * @text Icon
 * @parent Setting3
 * @desc Which icon to use for this setting?
 * @default 89
 *
 * @param Rarity3:num
 * @text Rarity
 * @parent Setting3
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 2
 * 
 * @param Setting4
 * @text Setting 4
 *
 * @param Value4:num
 * @text EXP Value
 * @parent Setting4
 * @type number
 * @desc How much EXP minimum to use this setting?
 * @default 500
 *
 * @param Icon4:num
 * @text Icon
 * @parent Setting4
 * @desc Which icon to use for this setting?
 * @default 89
 *
 * @param Rarity4:num
 * @text Rarity
 * @parent Setting4
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 3
 * 
 * @param Setting5
 * @text Setting 5
 *
 * @param Value5:num
 * @text EXP Value
 * @parent Setting5
 * @type number
 * @desc How much EXP minimum to use this setting?
 * @default 1000
 *
 * @param Icon5:num
 * @text Icon
 * @parent Setting5
 * @desc Which icon to use for this setting?
 * @default 88
 *
 * @param Rarity5:num
 * @text Rarity
 * @parent Setting5
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 4
 * 
 * @param Setting6
 * @text Setting 6
 *
 * @param Value6:num
 * @text EXP Value
 * @parent Setting6
 * @type number
 * @desc How much EXP minimum to use this setting?
 * @default 2500
 *
 * @param Icon6:num
 * @text Icon
 * @parent Setting6
 * @desc Which icon to use for this setting?
 * @default 88
 *
 * @param Rarity6:num
 * @text Rarity
 * @parent Setting6
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 5
 * 
 * @param Setting7
 * @text Setting 7
 *
 * @param Value7:num
 * @text EXP Value
 * @parent Setting7
 * @type number
 * @desc How much EXP minimum to use this setting?
 * @default 5000
 *
 * @param Icon7:num
 * @text Icon
 * @parent Setting7
 * @desc Which icon to use for this setting?
 * @default 87
 *
 * @param Rarity7:num
 * @text Rarity
 * @parent Setting7
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 6
 * 
 * @param Setting8
 * @text Setting 8
 *
 * @param Value8:num
 * @text EXP Value
 * @parent Setting8
 * @type number
 * @desc How much EXP minimum to use this setting?
 * @default 10000
 *
 * @param Icon8:num
 * @text Icon
 * @parent Setting8
 * @desc Which icon to use for this setting?
 * @default 87
 *
 * @param Rarity8:num
 * @text Rarity
 * @parent Setting8
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 7
 * 
 * @param Setting9
 * @text Setting 9
 *
 * @param Value9:num
 * @text EXP Value
 * @parent Setting9
 * @type number
 * @desc How much EXP minimum to use this setting?
 * @default 25000
 *
 * @param Icon9:num
 * @text Icon
 * @parent Setting9
 * @desc Which icon to use for this setting?
 * @default 84
 *
 * @param Rarity9:num
 * @text Rarity
 * @parent Setting9
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 8
 * 
 * @param Setting10
 * @text Setting 10
 *
 * @param Value10:num
 * @text EXP Value
 * @parent Setting10
 * @type number
 * @desc How much EXP minimum to use this setting?
 * @default 50000
 *
 * @param Icon10:num
 * @text Icon
 * @parent Setting10
 * @desc Which icon to use for this setting?
 * @default 84
 *
 * @param Rarity10:num
 * @text Rarity
 * @parent Setting10
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 9
 *
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param General
 *
 * @param show:eval
 * @text Show Gold Drop
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show visual drops for Gold?
 * @default true
 * 
 * @param Setting1
 * @text Setting 1
 *
 * @param Value1:num
 * @text Gold Value
 * @parent Setting1
 * @type number
 * @desc How much Gold minimum to use this setting?
 * @default 1
 *
 * @param Icon1:num
 * @text Icon
 * @parent Setting1
 * @desc Which icon to use for this setting?
 * @default 314
 *
 * @param Rarity1:num
 * @text Rarity
 * @parent Setting1
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 0
 * 
 * @param Setting2
 * @text Setting 2
 *
 * @param Value2:num
 * @text Gold Value
 * @parent Setting2
 * @type number
 * @desc How much Gold minimum to use this setting?
 * @default 50
 *
 * @param Icon2:num
 * @text Icon
 * @parent Setting2
 * @desc Which icon to use for this setting?
 * @default 314
 *
 * @param Rarity2:num
 * @text Rarity
 * @parent Setting2
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 1
 * 
 * @param Setting3
 * @text Setting 3
 *
 * @param Value3:num
 * @text Gold Value
 * @parent Setting3
 * @type number
 * @desc How much Gold minimum to use this setting?
 * @default 100
 *
 * @param Icon3:num
 * @text Icon
 * @parent Setting3
 * @desc Which icon to use for this setting?
 * @default 196
 *
 * @param Rarity3:num
 * @text Rarity
 * @parent Setting3
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 2
 * 
 * @param Setting4
 * @text Setting 4
 *
 * @param Value4:num
 * @text Gold Value
 * @parent Setting4
 * @type number
 * @desc How much Gold minimum to use this setting?
 * @default 500
 *
 * @param Icon4:num
 * @text Icon
 * @parent Setting4
 * @desc Which icon to use for this setting?
 * @default 196
 *
 * @param Rarity4:num
 * @text Rarity
 * @parent Setting4
 * @type number
 * @desc Which rarity to use for this setting?
 * @default 3
 * 
 * @param Setting5
 * @text Setting 5
 *
 * @param Value5:num
 * @text Gold Value
 * @parent Setting5
 * @type number
 * @desc How much Gold minimum to use this setting?
 * @default 1000
 *
 * @param Icon5:num
 * @text Icon
 * @parent Setting5
 * @desc Which icon to use for this setting?
 * @default 313
 *
 * @param Rarity5:num
 * @text Rarity
 * @parent Setting5
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 4
 * 
 * @param Setting6
 * @text Setting 6
 *
 * @param Value6:num
 * @text Gold Value
 * @parent Setting6
 * @type number
 * @desc How much Gold minimum to use this setting?
 * @default 5000
 *
 * @param Icon6:num
 * @text Icon
 * @parent Setting6
 * @desc Which icon to use for this setting?
 * @default 313
 *
 * @param Rarity6:num
 * @text Rarity
 * @parent Setting6
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 5
 * 
 * @param Setting7
 * @text Setting 7
 *
 * @param Value7:num
 * @text Gold Value
 * @parent Setting7
 * @type number
 * @desc How much Gold minimum to use this setting?
 * @default 10000
 *
 * @param Icon7:num
 * @text Icon
 * @parent Setting7
 * @desc Which icon to use for this setting?
 * @default 303
 *
 * @param Rarity7:num
 * @text Rarity
 * @parent Setting7
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 6
 * 
 * @param Setting8
 * @text Setting 8
 *
 * @param Value8:num
 * @text Gold Value
 * @parent Setting8
 * @type number
 * @desc How much Gold minimum to use this setting?
 * @default 50000
 *
 * @param Icon8:num
 * @text Icon
 * @parent Setting8
 * @desc Which icon to use for this setting?
 * @default 303
 *
 * @param Rarity8:num
 * @text Rarity
 * @parent Setting8
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 7
 * 
 * @param Setting9
 * @text Setting 9
 *
 * @param Value9:num
 * @text Gold Value
 * @parent Setting9
 * @type number
 * @desc How much Gold minimum to use this setting?
 * @default 100000
 *
 * @param Icon9:num
 * @text Icon
 * @parent Setting9
 * @desc Which icon to use for this setting?
 * @default 300
 *
 * @param Rarity9:num
 * @text Rarity
 * @parent Setting9
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 8
 * 
 * @param Setting10
 * @text Setting 10
 *
 * @param Value10:num
 * @text Gold Value
 * @parent Setting10
 * @type number
 * @desc How much Gold minimum to use this setting?
 * @default 500000
 *
 * @param Icon10:num
 * @text Icon
 * @parent Setting10
 * @desc Which icon to use for this setting?
 * @default 300
 *
 * @param Rarity10:num
 * @text Rarity
 * @parent Setting10
 * @type number
 * @min 0
 * @max 10
 * @desc Which rarity to use for this setting?
 * @default 9
 *
 */
/* ----------------------------------------------------------------------------
 * Drop Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Drop:
 *
 * @param General
 *
 * @param show:eval
 * @text Show Enemy Drops
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show visual drops for enemy drops?
 * @default true
 *
 * @param uniqueIcons:eval
 * @text Use Unique Icons
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the icons of the drops?
 * If not, use the ones below.
 * @default true
 *
 * @param CommonIcons
 * @text Common Icons
 *
 * @param commonItemIcon:num
 * @text Common Item Icon
 * @parent CommonIcons
 * @desc What icon do you want to use for common items?
 * @default 208
 *
 * @param commonWeaponIcon:num
 * @text Common Weapon Icon
 * @parent CommonIcons
 * @desc What icon do you want to use for common weapons?
 * @default 210
 *
 * @param commonArmorsIcon:num
 * @text Common Armor Icon
 * @parent CommonIcons
 * @desc What icon do you want to use for common armors?
 * @default 210
 *
 */
/* ----------------------------------------------------------------------------
 * Rarity Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Rarity:
 *
 * @param General
 *
 * @param show:eval
 * @text Show Rarities
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show visual effects for different rarities?
 * @default true
 * 
 * @param Setting0
 * @text No Rarity
 *
 * @param Tint0:eval
 * @text Tint
 * @parent Setting0
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 *
 * @param Duration0:num
 * @text Duration
 * @parent Setting0
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 180
 *
 * @param Flags0:arraystr
 * @text Flags
 * @parent Setting0
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting1
 * @text Rarity 1
 *
 * @param Tint1:eval
 * @text Tint
 * @parent Setting1
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 30, 60, 20]
 *
 * @param Duration1:num
 * @text Duration
 * @parent Setting1
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 180
 *
 * @param Flags1:arraystr
 * @text Flags
 * @parent Setting1
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting2
 * @text Rarity 2
 *
 * @param Tint2:eval
 * @text Tint
 * @parent Setting2
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [30, 60, 0, 40]
 *
 * @param Duration2:num
 * @text Duration
 * @parent Setting2
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 160
 *
 * @param Flags2:arraystr
 * @text Flags
 * @parent Setting2
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting3
 * @text Rarity 3
 *
 * @param Tint3:eval
 * @text Tint
 * @parent Setting3
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [60, 0, 30, 60]
 *
 * @param Duration3:num
 * @text Duration
 * @parent Setting3
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 140
 *
 * @param Flags3:arraystr
 * @text Flags
 * @parent Setting3
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting4
 * @text Rarity 4
 *
 * @param Tint4:eval
 * @text Tint
 * @parent Setting4
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 60, 60, 80]
 *
 * @param Duration4:num
 * @text Duration
 * @parent Setting4
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 120
 *
 * @param Flags4:arraystr
 * @text Flags
 * @parent Setting4
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting5
 * @text Rarity 5
 *
 * @param Tint5:eval
 * @text Tint
 * @parent Setting5
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [60, 60, 0, 100]
 *
 * @param Duration5:num
 * @text Duration
 * @parent Setting5
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 100
 *
 * @param Flags5:arraystr
 * @text Flags
 * @parent Setting5
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting6
 * @text Rarity 6
 *
 * @param Tint6:eval
 * @text Tint
 * @parent Setting6
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [60, 0, 60, 120]
 *
 * @param Duration6:num
 * @text Duration
 * @parent Setting6
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 80
 *
 * @param Flags6:arraystr
 * @text Flags
 * @parent Setting6
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting7
 * @text Rarity 7
 *
 * @param Tint7:eval
 * @text Tint
 * @parent Setting7
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 60, 140]
 *
 * @param Duration7:num
 * @text Duration
 * @parent Setting7
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 70
 *
 * @param Flags7:arraystr
 * @text Flags
 * @parent Setting7
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting8
 * @text Rarity 8
 *
 * @param Tint8:eval
 * @text Tint
 * @parent Setting8
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 60, 0, 160]
 *
 * @param Duration8:num
 * @text Duration
 * @parent Setting8
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 60
 *
 * @param Flags8:arraystr
 * @text Flags
 * @parent Setting8
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting9
 * @text Rarity 9
 *
 * @param Tint9:eval
 * @text Tint
 * @parent Setting9
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [60, 0, 0, 180]
 *
 * @param Duration9:num
 * @text Duration
 * @parent Setting9
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 50
 *
 * @param Flags9:arraystr
 * @text Flags
 * @parent Setting9
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default []
 * 
 * @param Setting10
 * @text Rarity 10
 *
 * @param Tint10:eval
 * @text Tint
 * @parent Setting10
 * @desc Tone settings for this rarity.
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 *
 * @param Duration10:num
 * @text Duration
 * @parent Setting10
 * @type number
 * @min 1
 * @desc What duration do you want for this rarity?
 * @default 40
 *
 * @param Flags10:arraystr
 * @text Flags
 * @parent Setting10
 * @type combo[]
 * @option Rainbow
 * @option Additive
 * @option Multiply
 * @option Screen
 * @option Bounce Height x%
 * @option Spawn SFX: filename
 * @desc What flags do you want to apply to this rarity?
 * @default ["Rainbow"]
 * 
 * @param SpecialEffects
 * @text Special Effects
 *
 * @param RainbowHueSpeed:num
 * @text Rainbow Hue Speed
 * @parent SpecialEffects
 * @type number
 * @min 1
 * @desc How fast do you want the Rainbow effect to change hue?
 * @default 4
 *
 */
//=============================================================================

const _0x265405=_0x297b;(function(_0x36f222,_0x30cabd){const _0x3b5a79=_0x297b,_0x4d7292=_0x36f222();while(!![]){try{const _0x2a2e55=-parseInt(_0x3b5a79(0x1b4))/0x1+-parseInt(_0x3b5a79(0x1ee))/0x2+parseInt(_0x3b5a79(0x279))/0x3+parseInt(_0x3b5a79(0x1d4))/0x4*(-parseInt(_0x3b5a79(0x1e9))/0x5)+-parseInt(_0x3b5a79(0x18b))/0x6*(-parseInt(_0x3b5a79(0x170))/0x7)+parseInt(_0x3b5a79(0x140))/0x8*(-parseInt(_0x3b5a79(0x1b7))/0x9)+-parseInt(_0x3b5a79(0x25a))/0xa*(-parseInt(_0x3b5a79(0x293))/0xb);if(_0x2a2e55===_0x30cabd)break;else _0x4d7292['push'](_0x4d7292['shift']());}catch(_0x19e48a){_0x4d7292['push'](_0x4d7292['shift']());}}}(_0x4017,0x9701d));var label='ExtraEnemyDrops',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x265405(0x181)](function(_0xa2cba7){const _0x381352=_0x265405;return _0xa2cba7['status']&&_0xa2cba7[_0x381352(0x24b)][_0x381352(0x275)]('['+label+']');})[0x0];function _0x297b(_0x4db5e4,_0x165462){const _0x4017c5=_0x4017();return _0x297b=function(_0x297bdb,_0x1faa9e){_0x297bdb=_0x297bdb-0x13e;let _0x2f2608=_0x4017c5[_0x297bdb];return _0x2f2608;},_0x297b(_0x4db5e4,_0x165462);}VisuMZ[label][_0x265405(0x19b)]=VisuMZ[label][_0x265405(0x19b)]||{},VisuMZ[_0x265405(0x260)]=function(_0x17e9d5,_0x2c4c2c){const _0x3483ca=_0x265405;for(const _0x4db4d5 in _0x2c4c2c){if(_0x4db4d5[_0x3483ca(0x1aa)](/(.*):(.*)/i)){const _0x37d666=String(RegExp['$1']),_0x42b506=String(RegExp['$2'])[_0x3483ca(0x1d9)]()[_0x3483ca(0x1e1)]();let _0x3432c9,_0x2c170c,_0x58ff6c;switch(_0x42b506){case _0x3483ca(0x1e8):_0x3432c9=_0x2c4c2c[_0x4db4d5]!==''?Number(_0x2c4c2c[_0x4db4d5]):0x0;break;case _0x3483ca(0x27f):_0x2c170c=_0x2c4c2c[_0x4db4d5]!==''?JSON[_0x3483ca(0x1f0)](_0x2c4c2c[_0x4db4d5]):[],_0x3432c9=_0x2c170c[_0x3483ca(0x151)](_0x2667da=>Number(_0x2667da));break;case'EVAL':_0x3432c9=_0x2c4c2c[_0x4db4d5]!==''?eval(_0x2c4c2c[_0x4db4d5]):null;break;case _0x3483ca(0x153):_0x2c170c=_0x2c4c2c[_0x4db4d5]!==''?JSON['parse'](_0x2c4c2c[_0x4db4d5]):[],_0x3432c9=_0x2c170c[_0x3483ca(0x151)](_0x15a685=>eval(_0x15a685));break;case _0x3483ca(0x20d):_0x3432c9=_0x2c4c2c[_0x4db4d5]!==''?JSON[_0x3483ca(0x1f0)](_0x2c4c2c[_0x4db4d5]):'';break;case _0x3483ca(0x261):_0x2c170c=_0x2c4c2c[_0x4db4d5]!==''?JSON[_0x3483ca(0x1f0)](_0x2c4c2c[_0x4db4d5]):[],_0x3432c9=_0x2c170c[_0x3483ca(0x151)](_0x5f208b=>JSON[_0x3483ca(0x1f0)](_0x5f208b));break;case _0x3483ca(0x25c):_0x3432c9=_0x2c4c2c[_0x4db4d5]!==''?new Function(JSON['parse'](_0x2c4c2c[_0x4db4d5])):new Function(_0x3483ca(0x1a9));break;case'ARRAYFUNC':_0x2c170c=_0x2c4c2c[_0x4db4d5]!==''?JSON['parse'](_0x2c4c2c[_0x4db4d5]):[],_0x3432c9=_0x2c170c[_0x3483ca(0x151)](_0x496da1=>new Function(JSON[_0x3483ca(0x1f0)](_0x496da1)));break;case _0x3483ca(0x1b0):_0x3432c9=_0x2c4c2c[_0x4db4d5]!==''?String(_0x2c4c2c[_0x4db4d5]):'';break;case _0x3483ca(0x14f):_0x2c170c=_0x2c4c2c[_0x4db4d5]!==''?JSON[_0x3483ca(0x1f0)](_0x2c4c2c[_0x4db4d5]):[],_0x3432c9=_0x2c170c[_0x3483ca(0x151)](_0x342b7d=>String(_0x342b7d));break;case _0x3483ca(0x262):_0x58ff6c=_0x2c4c2c[_0x4db4d5]!==''?JSON[_0x3483ca(0x1f0)](_0x2c4c2c[_0x4db4d5]):{},_0x3432c9=VisuMZ['ConvertParams']({},_0x58ff6c);break;case _0x3483ca(0x1ea):_0x2c170c=_0x2c4c2c[_0x4db4d5]!==''?JSON[_0x3483ca(0x1f0)](_0x2c4c2c[_0x4db4d5]):[],_0x3432c9=_0x2c170c['map'](_0x30f2f4=>VisuMZ['ConvertParams']({},JSON[_0x3483ca(0x1f0)](_0x30f2f4)));break;default:continue;}_0x17e9d5[_0x37d666]=_0x3432c9;}}return _0x17e9d5;},(_0x45c2f0=>{const _0x1c1611=_0x265405,_0x286ee4=_0x45c2f0[_0x1c1611(0x240)];for(const _0x5dde8b of dependencies){if(!Imported[_0x5dde8b]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x1c1611(0x160)](_0x286ee4,_0x5dde8b)),SceneManager['exit']();break;}}const _0x2ba0ee=_0x45c2f0[_0x1c1611(0x24b)];if(_0x2ba0ee[_0x1c1611(0x1aa)](/\[Version[ ](.*?)\]/i)){const _0x17bf5c=Number(RegExp['$1']);_0x17bf5c!==VisuMZ[label][_0x1c1611(0x145)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x1c1611(0x160)](_0x286ee4,_0x17bf5c)),SceneManager[_0x1c1611(0x246)]());}if(_0x2ba0ee[_0x1c1611(0x1aa)](/\[Tier[ ](\d+)\]/i)){const _0x6a95bc=Number(RegExp['$1']);_0x6a95bc<tier?(alert(_0x1c1611(0x223)[_0x1c1611(0x160)](_0x286ee4,_0x6a95bc,tier)),SceneManager[_0x1c1611(0x246)]()):tier=Math[_0x1c1611(0x17b)](_0x6a95bc,tier);}VisuMZ[_0x1c1611(0x260)](VisuMZ[label][_0x1c1611(0x19b)],_0x45c2f0[_0x1c1611(0x21e)]);})(pluginData),PluginManager[_0x265405(0x234)](pluginData[_0x265405(0x240)],_0x265405(0x1f3),_0x5840e5=>{const _0x289b35=_0x265405;VisuMZ[_0x289b35(0x260)](_0x5840e5,_0x5840e5),$gameTroop[_0x289b35(0x286)]();}),PluginManager[_0x265405(0x234)](pluginData[_0x265405(0x240)],_0x265405(0x256),_0x35b48b=>{const _0x451035=_0x265405;VisuMZ[_0x451035(0x260)](_0x35b48b,_0x35b48b);const _0x3dee29=_0x35b48b[_0x451035(0x28d)];$gameTroop[_0x451035(0x225)](_0x3dee29);}),PluginManager['registerCommand'](pluginData[_0x265405(0x240)],_0x265405(0x187),_0x3b43e6=>{const _0xd9e593=_0x265405;VisuMZ[_0xd9e593(0x260)](_0x3b43e6,_0x3b43e6);const _0x549619=_0x3b43e6[_0xd9e593(0x28d)];$gameTroop[_0xd9e593(0x188)](_0x549619);}),PluginManager[_0x265405(0x234)](pluginData[_0x265405(0x240)],_0x265405(0x1c6),_0x288e09=>{const _0x466d88=_0x265405;VisuMZ['ConvertParams'](_0x288e09,_0x288e09);const _0x30d7f5=_0x288e09['id'],_0x54d0fc=_0x288e09[_0x466d88(0x20c)];$gameTroop['addBonusItemDrop'](_0x30d7f5,_0x54d0fc);}),PluginManager[_0x265405(0x234)](pluginData[_0x265405(0x240)],_0x265405(0x20a),_0x2cf6c0=>{const _0x113c0b=_0x265405;VisuMZ[_0x113c0b(0x260)](_0x2cf6c0,_0x2cf6c0);const _0x460311=_0x2cf6c0['id'],_0x1770a9=_0x2cf6c0[_0x113c0b(0x20c)];$gameTroop[_0x113c0b(0x172)](_0x460311,_0x1770a9);}),PluginManager[_0x265405(0x234)](pluginData[_0x265405(0x240)],_0x265405(0x23e),_0x1a4952=>{const _0x4f733b=_0x265405;VisuMZ[_0x4f733b(0x260)](_0x1a4952,_0x1a4952);const _0x143d7e=_0x1a4952['id'],_0x22cf3c=_0x1a4952[_0x4f733b(0x20c)];$gameTroop[_0x4f733b(0x13f)](_0x143d7e,_0x22cf3c);}),PluginManager[_0x265405(0x234)](pluginData['name'],'ForcedRewardsClear',_0x45e237=>{const _0x1cd0ae=_0x265405;VisuMZ[_0x1cd0ae(0x260)](_0x45e237,_0x45e237),$gameTroop[_0x1cd0ae(0x14e)]();}),PluginManager['registerCommand'](pluginData['name'],'ForcedExpSet',_0x3e7fdf=>{const _0x5a19d5=_0x265405;VisuMZ[_0x5a19d5(0x260)](_0x3e7fdf,_0x3e7fdf);const _0x225e99=_0x3e7fdf[_0x5a19d5(0x28d)];$gameTroop[_0x5a19d5(0x28f)](_0x225e99);}),PluginManager[_0x265405(0x234)](pluginData[_0x265405(0x240)],_0x265405(0x1d0),_0x594873=>{const _0x38aac6=_0x265405;VisuMZ['ConvertParams'](_0x594873,_0x594873);const _0x1a45e0=_0x594873[_0x38aac6(0x28d)];$gameTroop[_0x38aac6(0x27d)](_0x1a45e0);}),PluginManager[_0x265405(0x234)](pluginData['name'],_0x265405(0x1ba),_0x4c8eec=>{const _0xb0d000=_0x265405;VisuMZ[_0xb0d000(0x260)](_0x4c8eec,_0x4c8eec);const _0x68f2a4=_0x4c8eec['id'],_0x2d14cc=_0x4c8eec['quantity'];$gameTroop[_0xb0d000(0x1ff)](_0x68f2a4,_0x2d14cc);}),PluginManager[_0x265405(0x234)](pluginData['name'],_0x265405(0x15a),_0x3897be=>{const _0x46d4c8=_0x265405;VisuMZ['ConvertParams'](_0x3897be,_0x3897be);const _0x32c2b3=_0x3897be['id'],_0x1ef099=_0x3897be[_0x46d4c8(0x20c)];$gameTroop[_0x46d4c8(0x214)](_0x32c2b3,_0x1ef099);}),PluginManager[_0x265405(0x234)](pluginData[_0x265405(0x240)],_0x265405(0x1db),_0x32579c=>{const _0x215a51=_0x265405;VisuMZ[_0x215a51(0x260)](_0x32579c,_0x32579c);const _0x2ee7a6=_0x32579c['id'],_0x5762fe=_0x32579c[_0x215a51(0x20c)];$gameTroop[_0x215a51(0x167)](_0x2ee7a6,_0x5762fe);}),PluginManager['registerCommand'](pluginData['name'],_0x265405(0x252),_0x5f0c9a=>{const _0x346a2a=_0x265405;VisuMZ[_0x346a2a(0x260)](_0x5f0c9a,_0x5f0c9a);const _0x592d5c=_0x5f0c9a[_0x346a2a(0x155)];BattleManager[_0x346a2a(0x19a)]=_0x592d5c;}),VisuMZ[_0x265405(0x202)][_0x265405(0x1ab)]=Scene_Boot['prototype'][_0x265405(0x184)],Scene_Boot['prototype']['onDatabaseLoaded']=function(){const _0x2d61aa=_0x265405;VisuMZ[_0x2d61aa(0x202)]['Scene_Boot_onDatabaseLoaded'][_0x2d61aa(0x217)](this),this['process_VisuMZ_ExtraEnemyDrops_Notetags']();},Scene_Boot[_0x265405(0x242)]['process_VisuMZ_ExtraEnemyDrops_Notetags']=function(){const _0x33218d=_0x265405;if(VisuMZ[_0x33218d(0x161)])return;this[_0x33218d(0x1ec)](),this['process_VisuMZ_ExtraEnemyDrops_JS_Notetags']();},Scene_Boot['prototype'][_0x265405(0x1ec)]=function(){const _0x4a9b24=_0x265405;for(const _0x28b98e of $dataEnemies){if(!_0x28b98e)continue;VisuMZ['ExtraEnemyDrops'][_0x4a9b24(0x231)](_0x28b98e);}},Scene_Boot[_0x265405(0x242)]['process_VisuMZ_ExtraEnemyDrops_JS_Notetags']=function(){const _0x300816=_0x265405;for(const _0x3983c4 of $dataEnemies){if(!_0x3983c4)continue;if(_0x3983c4[_0x300816(0x1cc)][_0x300816(0x1aa)](/<JS DROPS>\s*([\s\S]*)\s*<\/JS DROPS>/i)){const _0x51c711=String(RegExp['$1']);VisuMZ['ExtraEnemyDrops'][_0x300816(0x1f7)](_0x3983c4,_0x51c711);}}},VisuMZ[_0x265405(0x202)][_0x265405(0x26e)]=VisuMZ[_0x265405(0x26e)],VisuMZ[_0x265405(0x26e)]=function(_0x316586){const _0x2bb2d5=_0x265405;VisuMZ[_0x2bb2d5(0x202)][_0x2bb2d5(0x26e)][_0x2bb2d5(0x217)](this,_0x316586),VisuMZ[_0x2bb2d5(0x202)]['createDrops'](_0x316586);if(_0x316586[_0x2bb2d5(0x1cc)]['match'](/<JS DROPS>\s*([\s\S]*)\s*<\/JS DROPS>/i)){const _0x3b576b=String(RegExp['$1']);VisuMZ[_0x2bb2d5(0x202)][_0x2bb2d5(0x1f7)](_0x316586,_0x3b576b);}},VisuMZ[_0x265405(0x202)]['createDrops']=function(_0x1412b9){const _0xeffefb=_0x265405,_0x859413=_0x1412b9[_0xeffefb(0x1cc)],_0x2b1458=_0x859413[_0xeffefb(0x1aa)](/<(.*?) (?:DROP|DROPS)[ ](.*):[ ](\d+)([%％])>/gi);if(_0x2b1458)for(const _0x1c7185 of _0x2b1458){const _0x2aeba5={'kind':0x0,'dataId':0x0,'denominator':0x1};if(_0x1c7185['match'](/<(.*?) (?:DROP|DROPS)[ ](\d+)[ ](?:THROUGH|to)[ ](\d+):[ ](\d+)([%％])>/i)){const _0x2ac459=VisuMZ[_0xeffefb(0x202)][_0xeffefb(0x1de)](RegExp['$1']),_0x4df06d=Number(RegExp['$2']),_0x1da0ec=Number(RegExp['$3']),_0x1c3551=0x1/(Number(RegExp['$4'])*0.01);if(_0x2ac459>0x0)for(let _0x4b8fd3=_0x4df06d;_0x4b8fd3<=_0x1da0ec;_0x4b8fd3++){const _0x4f6d63={'kind':_0x2ac459,'dataId':_0x4b8fd3,'denominator':_0x1c3551};VisuMZ[_0xeffefb(0x202)][_0xeffefb(0x186)](_0x4f6d63)&&_0x1412b9['dropItems'][_0xeffefb(0x205)](_0x4f6d63);}continue;}else{if(_0x1c7185[_0xeffefb(0x1aa)](/<(.*?) (?:DROP|DROPS)[ ](\d+):[ ](\d+)([%％])>/i))_0x2aeba5[_0xeffefb(0x1fa)]=VisuMZ['ExtraEnemyDrops']['getDatabaseKind'](RegExp['$1']),_0x2aeba5[_0xeffefb(0x25b)]=Number(RegExp['$2']),_0x2aeba5[_0xeffefb(0x16d)]=0x1/(Number(RegExp['$3'])*0.01);else{if(_0x1c7185[_0xeffefb(0x1aa)](/<(.*?) (?:DROP|DROPS)[ ](.*):[ ](\d+)([%％])>/i))_0x2aeba5[_0xeffefb(0x1fa)]=VisuMZ[_0xeffefb(0x202)][_0xeffefb(0x1de)](RegExp['$1']),_0x2aeba5['dataId']=VisuMZ[_0xeffefb(0x202)]['getDatabaseItemID'](RegExp['$1'],RegExp['$2']),_0x2aeba5[_0xeffefb(0x16d)]=0x1/(Number(RegExp['$3'])*0.01);else continue;}}if(_0x2aeba5[_0xeffefb(0x1fa)]<0x0||_0x2aeba5[_0xeffefb(0x25b)]<0x0)continue;_0x1412b9['dropItems']['push'](_0x2aeba5);}if(_0x859413['match'](/<(?:DROP|DROPS)>\s*([\s\S]*)\s*<\/(?:DROP|DROPS)>/i)){const _0x15d40e=String(RegExp['$1']),_0x5bf7b3=_0x15d40e['match'](/(.*?)[ ](.*):[ ](\d+)([%％])/gi);if(_0x5bf7b3)for(let _0x13ea3f of _0x5bf7b3){_0x13ea3f=_0x13ea3f['trim']();const _0x79842e={'kind':0x0,'dataId':0x0,'denominator':0x1};if(_0x13ea3f[_0xeffefb(0x1aa)](/(.*?)[ ](\d+)[ ](?:THROUGH|to)[ ](\d+):[ ](\d+)([%％])/i)){const _0x451b14=VisuMZ[_0xeffefb(0x202)]['getDatabaseKind'](RegExp['$1']),_0x45887f=Number(RegExp['$2']),_0x56107e=Number(RegExp['$3']),_0x261b95=0x1/(Number(RegExp['$4'])*0.01);if(_0x451b14>0x0)for(let _0x2c6cfa=_0x45887f;_0x2c6cfa<=_0x56107e;_0x2c6cfa++){const _0x298e91={'kind':_0x451b14,'dataId':_0x2c6cfa,'denominator':_0x261b95};VisuMZ['ExtraEnemyDrops']['checkValidDrop'](_0x298e91)&&_0x1412b9['dropItems'][_0xeffefb(0x205)](_0x298e91);}continue;}else{if(_0x13ea3f[_0xeffefb(0x1aa)](/(.*?)[ ](\d+):[ ](\d+)([%％])/i))_0x79842e[_0xeffefb(0x1fa)]=VisuMZ[_0xeffefb(0x202)][_0xeffefb(0x1de)](RegExp['$1']),_0x79842e['dataId']=Number(RegExp['$2']),_0x79842e[_0xeffefb(0x16d)]=0x1/(Number(RegExp['$3'])*0.01);else{if(_0x13ea3f[_0xeffefb(0x1aa)](/(.*?)[ ](.*):[ ](\d+)([%％])/i))_0x79842e[_0xeffefb(0x1fa)]=VisuMZ[_0xeffefb(0x202)][_0xeffefb(0x1de)](RegExp['$1']),_0x79842e[_0xeffefb(0x25b)]=VisuMZ[_0xeffefb(0x202)][_0xeffefb(0x1f1)](RegExp['$1'],RegExp['$2']),_0x79842e[_0xeffefb(0x16d)]=0x1/(Number(RegExp['$3'])*0.01);else continue;}}if(_0x79842e['kind']<0x0||_0x79842e[_0xeffefb(0x25b)]<0x0)continue;_0x1412b9[_0xeffefb(0x241)]['push'](_0x79842e);}}},VisuMZ[_0x265405(0x202)]['checkValidDrop']=function(_0x34c793){const _0x3c47ef=_0x265405;if(!_0x34c793)return![];const _0xa97ea=_0x34c793[_0x3c47ef(0x1fa)],_0x544bb9=_0x34c793['dataId'];let _0x3a0ecb=null;if(_0xa97ea===0x1)_0x3a0ecb=$dataItems[_0x544bb9];else{if(_0xa97ea===0x2)_0x3a0ecb=$dataWeapons[_0x544bb9];else _0xa97ea===0x3?_0x3a0ecb=$dataArmors[_0x544bb9]:_0x3a0ecb=null;}if(!_0x3a0ecb)return![];if(_0x3a0ecb[_0x3c47ef(0x240)]['trim']()==='')return![];if(_0x3a0ecb['name'][_0x3c47ef(0x1aa)](/-----/i))return![];return!![];},VisuMZ[_0x265405(0x202)]['JS']={},VisuMZ[_0x265405(0x202)][_0x265405(0x1f7)]=function(_0x460015,_0x495e23){const _0x23bbea=_0x265405,_0x4d2e9b=_0x23bbea(0x26d)[_0x23bbea(0x160)](_0x495e23),_0x524bdc=_0x460015['id'];VisuMZ[_0x23bbea(0x202)]['JS'][_0x524bdc]=new Function(_0x4d2e9b);},DataManager['getItemIdWithName']=function(_0xc411f9){const _0x12cabe=_0x265405;_0xc411f9=_0xc411f9[_0x12cabe(0x1d9)]()[_0x12cabe(0x1e1)](),this[_0x12cabe(0x24e)]=this[_0x12cabe(0x24e)]||{};if(this[_0x12cabe(0x24e)][_0xc411f9])return this[_0x12cabe(0x24e)][_0xc411f9];for(const _0x5e3656 of $dataItems){if(!_0x5e3656)continue;this[_0x12cabe(0x24e)][_0x5e3656[_0x12cabe(0x240)]['toUpperCase']()['trim']()]=_0x5e3656['id'];}return this['_itemIDs'][_0xc411f9]||0x0;},DataManager[_0x265405(0x1b2)]=function(_0x478f21){const _0x1ef888=_0x265405;_0x478f21=_0x478f21['toUpperCase']()['trim'](),this[_0x1ef888(0x1fb)]=this[_0x1ef888(0x1fb)]||{};if(this[_0x1ef888(0x1fb)][_0x478f21])return this[_0x1ef888(0x1fb)][_0x478f21];for(const _0x10976f of $dataWeapons){if(!_0x10976f)continue;this['_weaponIDs'][_0x10976f[_0x1ef888(0x240)]['toUpperCase']()[_0x1ef888(0x1e1)]()]=_0x10976f['id'];}return this[_0x1ef888(0x1fb)][_0x478f21]||0x0;},DataManager['getArmorIdWithName']=function(_0x55524c){const _0x1022c0=_0x265405;_0x55524c=_0x55524c['toUpperCase']()[_0x1022c0(0x1e1)](),this['_armorIDs']=this[_0x1022c0(0x1be)]||{};if(this[_0x1022c0(0x1be)][_0x55524c])return this[_0x1022c0(0x1be)][_0x55524c];for(const _0x1f29db of $dataArmors){if(!_0x1f29db)continue;this[_0x1022c0(0x1be)][_0x1f29db[_0x1022c0(0x240)][_0x1022c0(0x1d9)]()[_0x1022c0(0x1e1)]()]=_0x1f29db['id'];}return this[_0x1022c0(0x1be)][_0x55524c]||0x0;},DataManager[_0x265405(0x236)]=function(_0x845790){const _0x486b55=_0x265405;_0x845790=_0x845790['toUpperCase']()[_0x486b55(0x1e1)](),this[_0x486b55(0x239)]=this[_0x486b55(0x239)]||{};if(this['_skillIDs'][_0x845790])return this[_0x486b55(0x239)][_0x845790];for(const _0xe7ec43 of $dataSkills){if(!_0xe7ec43)continue;this[_0x486b55(0x239)][_0xe7ec43['name'][_0x486b55(0x1d9)]()[_0x486b55(0x1e1)]()]=_0xe7ec43['id'];}return this[_0x486b55(0x239)][_0x845790]||0x0;},DataManager[_0x265405(0x230)]=function(_0x47063f){const _0x2ca115=_0x265405;_0x47063f=_0x47063f['toUpperCase']()['trim'](),this[_0x2ca115(0x1f5)]=this[_0x2ca115(0x1f5)]||{};if(this[_0x2ca115(0x1f5)][_0x47063f])return this['_stypeIDs'][_0x47063f];for(let _0x27d69d=0x1;_0x27d69d<0x64;_0x27d69d++){if(!$dataSystem[_0x2ca115(0x1bb)][_0x27d69d])continue;let _0x25866c=$dataSystem[_0x2ca115(0x1bb)][_0x27d69d][_0x2ca115(0x1d9)]()[_0x2ca115(0x1e1)]();_0x25866c=_0x25866c['replace'](/\x1I\[(\d+)\]/gi,''),_0x25866c=_0x25866c[_0x2ca115(0x272)](/\\I\[(\d+)\]/gi,''),this[_0x2ca115(0x1f5)][_0x25866c]=_0x27d69d;}return this[_0x2ca115(0x1f5)][_0x47063f]||0x0;},DataManager[_0x265405(0x215)]=function(_0x4ca613){const _0xef1d0e=_0x265405;_0x4ca613=_0x4ca613[_0xef1d0e(0x1d9)]()[_0xef1d0e(0x1e1)](),this[_0xef1d0e(0x23c)]=this[_0xef1d0e(0x23c)]||{};if(this[_0xef1d0e(0x23c)][_0x4ca613])return this[_0xef1d0e(0x23c)][_0x4ca613];for(const _0x154fe5 of $dataStates){if(!_0x154fe5)continue;this[_0xef1d0e(0x23c)][_0x154fe5[_0xef1d0e(0x240)][_0xef1d0e(0x1d9)]()['trim']()]=_0x154fe5['id'];}return this[_0xef1d0e(0x23c)][_0x4ca613]||0x0;},DataManager[_0x265405(0x1d6)]=function(_0xd9ac7b){const _0x2328ed=_0x265405;_0xd9ac7b=_0xd9ac7b[_0x2328ed(0x1d9)]()[_0x2328ed(0x1e1)](),this[_0x2328ed(0x19c)]=this['_elementIDs']||{};if(this[_0x2328ed(0x19c)][_0xd9ac7b])return this[_0x2328ed(0x19c)][_0xd9ac7b];let _0x5c8467=0x1;for(const _0x3c61ee of $dataSystem[_0x2328ed(0x1c3)]){if(!_0x3c61ee)continue;let _0x33d985=_0x3c61ee[_0x2328ed(0x1d9)]();_0x33d985=_0x33d985[_0x2328ed(0x272)](/\x1I\[(\d+)\]/gi,''),_0x33d985=_0x33d985['replace'](/\\I\[(\d+)\]/gi,''),this[_0x2328ed(0x19c)][_0x33d985]=_0x5c8467,_0x5c8467++;}return this['_elementIDs'][_0xd9ac7b]||0x0;},SceneManager[_0x265405(0x1cf)]=function(){const _0x4bb2ef=_0x265405;return this[_0x4bb2ef(0x1f9)]&&this[_0x4bb2ef(0x1f9)][_0x4bb2ef(0x169)]===Scene_Battle;},VisuMZ['ExtraEnemyDrops'][_0x265405(0x244)]=Game_Action[_0x265405(0x242)][_0x265405(0x190)],Game_Action[_0x265405(0x242)][_0x265405(0x190)]=function(_0x4d669c){const _0x39856d=_0x265405;_0x4d669c[_0x39856d(0x158)](this),VisuMZ['ExtraEnemyDrops'][_0x39856d(0x244)][_0x39856d(0x217)](this,_0x4d669c);},VisuMZ[_0x265405(0x202)][_0x265405(0x264)]=Game_Battler['prototype'][_0x265405(0x258)],Game_Battler[_0x265405(0x242)][_0x265405(0x258)]=function(_0x53e997){const _0x5c2e17=_0x265405;VisuMZ[_0x5c2e17(0x202)][_0x5c2e17(0x264)][_0x5c2e17(0x217)](this,_0x53e997),this[_0x5c2e17(0x1ed)]();},Game_Battler[_0x265405(0x242)][_0x265405(0x1ed)]=function(){const _0x10be6c=_0x265405;this[_0x10be6c(0x235)]={'deathTurn':0x0,'timesStruckSkills':{},'timesStruckSTypes':{},'timesStruckItems':{},'timesStruckStates':{},'timesStruckElements':{},'lastStruckType':_0x10be6c(0x197),'lastStruckSkill':0x0,'lastStruckSType':0x0,'lastStruckItem':0x0,'lastStruckState':0x0,'lastStruckElement':0x0};},Game_Battler[_0x265405(0x242)][_0x265405(0x1c8)]=function(){const _0x4921dc=_0x265405;return this['_conditionalDropsTrackedData']===undefined&&this[_0x4921dc(0x1ed)](),this['_conditionalDropsTrackedData'];},Game_Battler[_0x265405(0x242)][_0x265405(0x163)]=function(){const _0x4435b7=_0x265405;return this[_0x4435b7(0x1c8)]()[_0x4435b7(0x276)]||0x0;},Game_Battler['prototype'][_0x265405(0x199)]=function(_0x28aa2d,_0x535a05,_0x2a0c06){const _0x3ae6fe=_0x265405,_0x1b79d5=this[_0x3ae6fe(0x1c8)]();_0x2a0c06=_0x2a0c06||0x1;const _0x46d3f7=_0x3ae6fe(0x206)[_0x3ae6fe(0x160)](_0x28aa2d);if(!_0x1b79d5[_0x46d3f7])return;_0x1b79d5[_0x46d3f7][_0x535a05]=_0x1b79d5[_0x46d3f7][_0x535a05]||0x0,_0x1b79d5[_0x46d3f7][_0x535a05]+=_0x2a0c06;const _0x5f4c95=_0x3ae6fe(0x238)[_0x3ae6fe(0x160)](_0x28aa2d);_0x1b79d5[_0x5f4c95]=_0x535a05,['Item','Skill'][_0x3ae6fe(0x275)](_0x28aa2d)&&(_0x1b79d5['lastStruckType']=_0x28aa2d);},Game_Battler['prototype']['timesStruckSkill']=function(_0x2a87da){const _0x5a8027=_0x265405,_0x6c664c=this[_0x5a8027(0x1c8)]()[_0x5a8027(0x292)];return _0x6c664c[_0x2a87da]||0x0;},Game_Battler[_0x265405(0x242)][_0x265405(0x175)]=function(_0x540df8){const _0x282bdf=_0x265405,_0x29505b=this['getConditionalDropsTrackedData']()[_0x282bdf(0x1eb)];return _0x29505b[_0x540df8]||0x0;},Game_Battler['prototype'][_0x265405(0x1a2)]=function(_0x2736e5){const _0x41ca73=_0x265405,_0x244f74=this[_0x41ca73(0x1c8)]()[_0x41ca73(0x18f)];return _0x244f74[_0x2736e5]||0x0;},Game_Battler[_0x265405(0x242)][_0x265405(0x247)]=function(_0x54d36f){const _0x46a839=_0x265405,_0x3c69a1=this[_0x46a839(0x1c8)]()['timesStruckStates'];return _0x3c69a1[_0x54d36f]||0x0;},Game_Battler[_0x265405(0x242)]['timesStruckElement']=function(_0x2169b8){const _0x686a8a=_0x265405,_0x4898ac=this['getConditionalDropsTrackedData']()[_0x686a8a(0x1a5)];return _0x4898ac[_0x2169b8]||0x0;},Game_Battler['prototype']['applyTimesStruck']=function(_0x11e0fe){const _0x1208c0=_0x265405,_0x5a035f=_0x11e0fe[_0x1208c0(0x213)]();if(!_0x5a035f)return;if(_0x11e0fe[_0x1208c0(0x28b)]())this[_0x1208c0(0x199)]('Item',_0x5a035f['id']);else{if(_0x11e0fe[_0x1208c0(0x22e)]())this[_0x1208c0(0x199)](_0x1208c0(0x224),_0x5a035f['id']),this[_0x1208c0(0x199)](_0x1208c0(0x21d),_0x5a035f[_0x1208c0(0x17e)]);else return;}let _0x53dd16=[];if(Imported[_0x1208c0(0x21f)])_0x53dd16=_0x11e0fe['elements']();else _0x11e0fe['item']()[_0x1208c0(0x171)][_0x1208c0(0x23a)]<0x0?_0x53dd16=_0x11e0fe['subject']()[_0x1208c0(0x1d7)]():_0x53dd16=[_0x11e0fe[_0x1208c0(0x213)]()[_0x1208c0(0x171)][_0x1208c0(0x23a)]];while(_0x53dd16[_0x1208c0(0x182)]>0x0){const _0x5edb75=_0x53dd16[_0x1208c0(0x22c)]();if(_0x5edb75>0x0)this[_0x1208c0(0x199)](_0x1208c0(0x156),_0x5edb75);}},Game_Battler[_0x265405(0x242)][_0x265405(0x1ca)]=function(){const _0x207ca2=_0x265405,_0x3f9ede=this[_0x207ca2(0x1c8)]();_0x3f9ede[_0x207ca2(0x276)]=this[_0x207ca2(0x294)]();},VisuMZ[_0x265405(0x202)][_0x265405(0x207)]=Game_BattlerBase[_0x265405(0x242)][_0x265405(0x196)],Game_BattlerBase[_0x265405(0x242)][_0x265405(0x196)]=function(_0x42c693){const _0xb9a4e0=_0x265405,_0x2b24b6=this[_0xb9a4e0(0x25d)](_0x42c693);VisuMZ['ExtraEnemyDrops'][_0xb9a4e0(0x207)][_0xb9a4e0(0x217)](this,_0x42c693),this[_0xb9a4e0(0x25d)](_0x42c693)&&(this['addTimesStruck'](_0xb9a4e0(0x211),_0x42c693),!_0x2b24b6&&_0x42c693===this[_0xb9a4e0(0x20e)]()&&this[_0xb9a4e0(0x1ca)]());},VisuMZ[_0x265405(0x202)][_0x265405(0x1ac)]=Game_Enemy[_0x265405(0x242)][_0x265405(0x290)],Game_Enemy[_0x265405(0x242)][_0x265405(0x290)]=function(){const _0x19bcaa=_0x265405;let _0x323829=VisuMZ['ExtraEnemyDrops'][_0x19bcaa(0x1ac)][_0x19bcaa(0x217)](this);return _0x323829=this[_0x19bcaa(0x1a8)](_0x323829),VisuMZ[_0x19bcaa(0x202)][_0x19bcaa(0x1bf)](_0x323829);},Game_Enemy[_0x265405(0x242)][_0x265405(0x1a8)]=function(_0x186d30){const _0x46cf2a=_0x265405;return _0x186d30=this['addExtraEnemyDropsSingles'](_0x186d30),_0x186d30=this['addExtraEnemyDropsBatch'](_0x186d30),_0x186d30=this[_0x46cf2a(0x17d)](_0x186d30),_0x186d30=this[_0x46cf2a(0x28e)](_0x186d30),_0x186d30;},Game_Enemy[_0x265405(0x242)][_0x265405(0x259)]=function(_0x195dee){const _0x8ee4db=_0x265405;return _0x195dee;const _0x430066=this[_0x8ee4db(0x13e)]()['note'],_0x2c190f=this[_0x8ee4db(0x148)](),_0x5f7ef6=_0x430066[_0x8ee4db(0x1aa)](/<(.*?) DROP[ ](.*):[ ](\d+)([%％])>/gi);if(_0x5f7ef6)for(const _0x2c603d of _0x5f7ef6){let _0x56bd9c=$dataItems,_0x3eb61b=null,_0xaae693=0x0;if(_0x2c603d[_0x8ee4db(0x1aa)](/<(.*?) DROP[ ](\d+):[ ](\d+)([%％])>/i))_0x56bd9c=VisuMZ['ExtraEnemyDrops'][_0x8ee4db(0x1e7)](RegExp['$1']),_0x3eb61b=_0x56bd9c[Number(RegExp['$2'])],_0xaae693=Number(RegExp['$3'])*0.01;else _0x2c603d[_0x8ee4db(0x1aa)](/<(.*?) DROP[ ](.*):[ ](\d+)([%％])>/i)&&(_0x3eb61b=VisuMZ[_0x8ee4db(0x202)][_0x8ee4db(0x18e)](RegExp['$1'],RegExp['$2']),_0xaae693=Number(RegExp['$3'])*0.01);_0x3eb61b&&Math[_0x8ee4db(0x1c7)]()<_0xaae693*_0x2c190f&&_0x195dee[_0x8ee4db(0x205)](_0x3eb61b);}return _0x195dee;},Game_Enemy[_0x265405(0x242)][_0x265405(0x1cb)]=function(_0x487669){const _0x4a6a1a=_0x265405;return _0x487669;const _0x1d12b3=this[_0x4a6a1a(0x13e)]()[_0x4a6a1a(0x1cc)],_0x158d71=this[_0x4a6a1a(0x148)]();if(_0x1d12b3[_0x4a6a1a(0x1aa)](/<(?:DROP|DROPS)>\s*([\s\S]*)\s*<\/(?:DROP|DROPS)>/i)){const _0x28bfbb=String(RegExp['$1']),_0x161ed5=_0x28bfbb[_0x4a6a1a(0x1aa)](/(.*?)[ ](.*):[ ](\d+)([%％])/gi);if(_0x161ed5){let _0x51a983=$dataItems;for(const _0x3eb961 of _0x161ed5){let _0x162342=null,_0x4d98f7=0x0;if(_0x3eb961['match'](/(.*?)[ ](\d+):[ ](\d+)([%％])/i))_0x51a983=VisuMZ['ExtraEnemyDrops']['getDatabase'](RegExp['$1']),_0x162342=_0x51a983[Number(RegExp['$2'])],_0x4d98f7=Number(RegExp['$3'])*0.01;else _0x3eb961['match'](/(.*?)[ ](.*):[ ](\d+)([%％])/i)&&(_0x162342=VisuMZ[_0x4a6a1a(0x202)]['getDatabaseItem'](RegExp['$1'],RegExp['$2']),_0x4d98f7=Number(RegExp['$3'])*0.01);_0x162342&&Math[_0x4a6a1a(0x1c7)]()<_0x4d98f7*_0x158d71&&_0x487669['push'](_0x162342);}}}return _0x487669;},VisuMZ[_0x265405(0x202)][_0x265405(0x1e7)]=function(_0x192b85){const _0x2aa72a=_0x265405;_0x192b85=_0x192b85[_0x2aa72a(0x1d9)]()[_0x2aa72a(0x1e1)]();if(['I',_0x2aa72a(0x282),_0x2aa72a(0x26b)][_0x2aa72a(0x275)](_0x192b85))return $dataItems;if(['W',_0x2aa72a(0x208),_0x2aa72a(0x237)][_0x2aa72a(0x275)](_0x192b85))return $dataWeapons;if(['A',_0x2aa72a(0x1bc),_0x2aa72a(0x1b8)][_0x2aa72a(0x275)](_0x192b85))return $dataArmors;if(['S',_0x2aa72a(0x269),_0x2aa72a(0x165)]['includes'](_0x192b85))return $dataSkills;if(['T',_0x2aa72a(0x143),_0x2aa72a(0x150)][_0x2aa72a(0x275)](_0x192b85))return $dataStates;return $dataItems;},VisuMZ['ExtraEnemyDrops'][_0x265405(0x1de)]=function(_0x28f6f0){const _0x411810=_0x265405;_0x28f6f0=_0x28f6f0[_0x411810(0x1d9)]()[_0x411810(0x1e1)]();if(['I','ITEM',_0x411810(0x26b)]['includes'](_0x28f6f0))return 0x1;if(['W',_0x411810(0x208),_0x411810(0x237)][_0x411810(0x275)](_0x28f6f0))return 0x2;if(['A',_0x411810(0x1bc),_0x411810(0x1b8)][_0x411810(0x275)](_0x28f6f0))return 0x3;return 0x0;},VisuMZ['ExtraEnemyDrops']['getDatabaseItem']=function(_0x22a972,_0x29acae){const _0x61c1d1=_0x265405;_0x22a972=_0x22a972[_0x61c1d1(0x1d9)]()[_0x61c1d1(0x1e1)]();if(['I','ITEM',_0x61c1d1(0x26b)][_0x61c1d1(0x275)](_0x22a972))return $dataItems[DataManager[_0x61c1d1(0x1da)](_0x29acae)];if(['W',_0x61c1d1(0x208),_0x61c1d1(0x237)][_0x61c1d1(0x275)](_0x22a972))return $dataWeapons[DataManager[_0x61c1d1(0x1b2)](_0x29acae)];if(['A',_0x61c1d1(0x1bc),_0x61c1d1(0x1b8)][_0x61c1d1(0x275)](_0x22a972))return $dataArmors[DataManager['getArmorIdWithName'](_0x29acae)];if(['S',_0x61c1d1(0x269),'SKILLS']['includes'](_0x22a972))return $dataSkills[DataManager[_0x61c1d1(0x236)](_0x29acae)];if(['T',_0x61c1d1(0x143),_0x61c1d1(0x150)][_0x61c1d1(0x275)](_0x22a972))return $dataStates[DataManager['getStateIdWithName'](_0x29acae)];return null;},VisuMZ[_0x265405(0x202)][_0x265405(0x1f1)]=function(_0x218293,_0x1e0285){const _0x1bb030=_0x265405;_0x218293=_0x218293[_0x1bb030(0x1d9)]()['trim']();if(['I','ITEM',_0x1bb030(0x26b)][_0x1bb030(0x275)](_0x218293)){const _0x47b40c=$dataItems[DataManager['getItemIdWithName'](_0x1e0285)];return _0x47b40c?_0x47b40c['id']:0x0;}if(['W','WEAPON',_0x1bb030(0x237)]['includes'](_0x218293)){const _0x1179cc=$dataWeapons[DataManager[_0x1bb030(0x1b2)](_0x1e0285)];return _0x1179cc?_0x1179cc['id']:0x0;}if(['A',_0x1bb030(0x1bc),'ARMORS'][_0x1bb030(0x275)](_0x218293)){const _0x3ea7b9=$dataArmors[DataManager[_0x1bb030(0x1b5)](_0x1e0285)];return _0x3ea7b9?_0x3ea7b9['id']:0x0;}return 0x0;},VisuMZ['ExtraEnemyDrops'][_0x265405(0x1bf)]=function(_0x2eb5a4){const _0x4cfa4e=_0x265405;_0x2eb5a4=_0x2eb5a4['remove'](null)[_0x4cfa4e(0x1d1)](undefined),_0x2eb5a4[_0x4cfa4e(0x263)]((_0x1c2f96,_0x3485b3)=>_0x1c2f96['id']-_0x3485b3['id']);const _0xfec895=_0x2eb5a4[_0x4cfa4e(0x181)](_0x515547=>DataManager['isItem'](_0x515547)),_0x518e6e=_0x2eb5a4[_0x4cfa4e(0x181)](_0x1fa50f=>DataManager['isWeapon'](_0x1fa50f)),_0x1e1ac9=_0x2eb5a4[_0x4cfa4e(0x181)](_0x5e636f=>DataManager[_0x4cfa4e(0x173)](_0x5e636f));let _0x5d2bf2=_0xfec895[_0x4cfa4e(0x295)](_0x518e6e)[_0x4cfa4e(0x295)](_0x1e1ac9);return _0x5d2bf2;},Game_Enemy[_0x265405(0x242)]['addExtraEnemyDropsJS']=function(_0x30f7c0){const _0x1200df=_0x265405,_0x3ee609=this[_0x1200df(0x13e)]()['id'];if(!VisuMZ[_0x1200df(0x202)]['JS'][_0x3ee609])return _0x30f7c0;return VisuMZ['ExtraEnemyDrops']['JS'][_0x3ee609][_0x1200df(0x217)](this,_0x30f7c0);},Game_Enemy[_0x265405(0x242)][_0x265405(0x17d)]=function(_0x28a295){const _0x4f09cc=_0x265405,_0x31320c=this[_0x4f09cc(0x13e)]()[_0x4f09cc(0x1cc)][_0x4f09cc(0x1fe)](/[\r\n]+/);let _0x46211b=null,_0x5af82a=0x0;for(const _0x29c81e of _0x31320c){if(!_0x29c81e)continue;if(!_0x46211b&&_0x29c81e[_0x4f09cc(0x1aa)](/<CONDITIONAL (ITEM|WEAPON|ARMOR) (\d+)[ ](?:THROUGH|to)[ ](\d+) (?:DROP|DROPS)>/i)){const _0x47d851=VisuMZ['ExtraEnemyDrops'][_0x4f09cc(0x1e7)](RegExp['$1']),_0x3c5d25=Number(RegExp['$2']),_0x298d3c=Number(RegExp['$3']);_0x46211b=[];for(let _0x5b338e=_0x3c5d25;_0x5b338e<=_0x298d3c;_0x5b338e++){const _0x2db178=_0x47d851[_0x5b338e]||null;_0x2db178&&_0x2db178[_0x4f09cc(0x240)]['trim']()!==''&&!_0x2db178[_0x4f09cc(0x240)]['match'](/-----/i)&&_0x46211b[_0x4f09cc(0x205)](_0x2db178);}_0x5af82a=0x0;}else{if(!_0x46211b&&_0x29c81e[_0x4f09cc(0x1aa)](/<CONDITIONAL (ITEM|WEAPON|ARMOR) (\d+) (?:DROP|DROPS)>/i)){const _0x245325=VisuMZ['ExtraEnemyDrops'][_0x4f09cc(0x1e7)](RegExp['$1']);_0x46211b=[_0x245325[Number(RegExp['$2'])]||null],_0x5af82a=0x0;}else{if(!_0x46211b&&_0x29c81e['match'](/<CONDITIONAL (ITEM|WEAPON|ARMOR) (.*) (?:DROP|DROPS)>/i))_0x46211b=[VisuMZ[_0x4f09cc(0x202)][_0x4f09cc(0x18e)](RegExp['$1'],RegExp['$2'])],_0x5af82a=0x0;else{if(_0x46211b&&_0x29c81e[_0x4f09cc(0x1aa)](/<\/CONDITIONAL (.*) (?:DROP|DROPS)>/i)){for(const _0x580104 of _0x46211b){if(Math['random']()<_0x5af82a)_0x28a295[_0x4f09cc(0x205)](_0x580104);}_0x46211b=null,_0x5af82a=0x0;}else{if(_0x46211b&&_0x29c81e[_0x4f09cc(0x1aa)](/(.*):[ ]([\+\-]\d+)([%％])/i)){const _0x1fd7bf=String(RegExp['$1']),_0x4fe0ca=Number(RegExp['$2'])*0.01;this[_0x4f09cc(0x1bd)](_0x1fd7bf)&&(_0x5af82a+=_0x4fe0ca);}}}}}}return _0x28a295;},Game_Enemy['prototype'][_0x265405(0x1bd)]=function(_0x4e98c2){const _0x247af4=_0x265405;if(_0x4e98c2[_0x247af4(0x1aa)](/\bALWAYS\b/i))return!![];else{if(_0x4e98c2['match'](/\bRANDOM[ ](\d+)([%％])\b/i)){const _0x2299e5=Number(RegExp['$1'])*0.01;return Math['random']()<_0x2299e5;}else{if(_0x4e98c2['match'](/\bLAST (?:STRIKE|STRUCK)[ ](ELEMENT|ITEM|SKILL|STYPE|STATE)[ ](\d+)\b/i)){let _0x2e181e=String(RegExp['$1'])[_0x247af4(0x22d)]();const _0x2445ca=Number(RegExp['$2']);_0x2e181e=_0x2e181e['charAt'](0x0)[_0x247af4(0x1d9)]()+_0x2e181e[_0x247af4(0x176)](0x1);if(_0x2e181e['match'](/STYPE/i))_0x2e181e=_0x247af4(0x21d);const _0x175233=this[_0x247af4(0x1c8)]();if(_0x2e181e===_0x247af4(0x14a)&&_0x175233[_0x247af4(0x15e)]!==_0x247af4(0x14a))return![];if(_0x2e181e===_0x247af4(0x224)&&_0x175233[_0x247af4(0x15e)]!==_0x247af4(0x224))return![];if(_0x2e181e===_0x247af4(0x21d)&&_0x175233[_0x247af4(0x15e)]!==_0x247af4(0x224))return![];const _0x4e28c4=_0x247af4(0x238)['format'](_0x2e181e);return _0x175233[_0x4e28c4]===_0x2445ca;}else{if(_0x4e98c2[_0x247af4(0x1aa)](/\bLAST (?:STRIKE|STRUCK)[ ](ELEMENT|ITEM|SKILL|STYPE|STATE)[ ](.*)\b/i)){let _0x4d56b1=String(RegExp['$1'])[_0x247af4(0x22d)]();const _0x13d8d6=String(RegExp['$2']),_0x3a7558=this[_0x247af4(0x1c8)]();let _0x25a6d0=0x0;switch(_0x4d56b1['toUpperCase']()['trim']()){case _0x247af4(0x15d):_0x25a6d0=DataManager['getElementIdWithName'](_0x13d8d6);return _0x3a7558[_0x247af4(0x25f)]===_0x25a6d0;case'ITEM':if(_0x3a7558[_0x247af4(0x15e)]!==_0x247af4(0x14a))return![];_0x25a6d0=DataManager[_0x247af4(0x1da)](_0x13d8d6);return _0x3a7558[_0x247af4(0x26f)]===_0x25a6d0;case'SKILL':if(_0x3a7558[_0x247af4(0x15e)]!==_0x247af4(0x224))return![];_0x25a6d0=DataManager[_0x247af4(0x236)](_0x13d8d6);return _0x3a7558[_0x247af4(0x193)]===_0x25a6d0;case _0x247af4(0x249):if(_0x3a7558['lastStruckType']!==_0x247af4(0x224))return![];_0x25a6d0=DataManager['getStypeIdWithName'](_0x13d8d6);return _0x3a7558[_0x247af4(0x198)]===_0x25a6d0;case _0x247af4(0x143):_0x25a6d0=DataManager[_0x247af4(0x215)](_0x13d8d6);return _0x3a7558['lastStruckState']===_0x25a6d0;default:return![];}}else{let _0xa11347=VisuMZ[_0x247af4(0x202)][_0x247af4(0x1ef)](this,_0x4e98c2);try{return eval(_0xa11347);}catch(_0x40986e){return![];}}}}}},VisuMZ[_0x265405(0x202)]['convertConditionToCode']=function(_0x2c2f81,_0x34d6bc){const _0x18cd85=_0x265405;while(_0x34d6bc[_0x18cd85(0x1aa)](/\b\\V\[(\d+)\]\b/gi)){_0x34d6bc=_0x34d6bc[_0x18cd85(0x272)](/\b\\V\[(\d+)\]\b/gi,(_0x2d8a16,_0x406709)=>$gameVariables[_0x18cd85(0x28d)](parseInt(_0x406709)));}while(_0x34d6bc[_0x18cd85(0x1aa)](/\bVARIABLE (\d+)\b/gi)){_0x34d6bc=_0x34d6bc['replace'](/\bVARIABLE (\d+)\b/gi,(_0x327c18,_0xcf55c0)=>$gameVariables['value'](parseInt(_0xcf55c0)));}return _0x34d6bc=_0x34d6bc[_0x18cd85(0x272)](/\\S\[(\d+)\] ON/gi,(_0x194bbf,_0x2bbe56)=>String($gameSwitches[_0x18cd85(0x28d)](parseInt(_0x2bbe56))===!![])),_0x34d6bc=_0x34d6bc['replace'](/\\S\[(\d+)\] OFF/gi,(_0x1bae36,_0x170c31)=>String($gameSwitches['value'](parseInt(_0x170c31))===![])),_0x34d6bc=_0x34d6bc[_0x18cd85(0x272)](/\\S\[(\d+)\]/gi,(_0x58631e,_0x234020)=>String($gameSwitches[_0x18cd85(0x28d)](parseInt(_0x234020)))),_0x34d6bc=_0x34d6bc[_0x18cd85(0x272)](/SWITCH (\d+) ON/gi,(_0x10dfe3,_0xbef077)=>String($gameSwitches['value'](parseInt(_0xbef077))===!![])),_0x34d6bc=_0x34d6bc[_0x18cd85(0x272)](/SWITCH (\d+) OFF/gi,(_0x5942cf,_0x13fa15)=>String($gameSwitches[_0x18cd85(0x28d)](parseInt(_0x13fa15))===![])),_0x34d6bc=_0x34d6bc['replace'](/SWITCH (\d+)/gi,(_0x158e69,_0x23fa4b)=>String($gameSwitches[_0x18cd85(0x28d)](parseInt(_0x23fa4b)))),_0x34d6bc=_0x34d6bc[_0x18cd85(0x272)](/\bON\b/gi,'true'),_0x34d6bc=_0x34d6bc[_0x18cd85(0x272)](/\bOFF\b/gi,_0x18cd85(0x16b)),_0x34d6bc=_0x34d6bc[_0x18cd85(0x272)](/\bTRUE\b/gi,_0x18cd85(0x277)),_0x34d6bc=_0x34d6bc[_0x18cd85(0x272)](/\bFALSE\b/gi,_0x18cd85(0x16b)),_0x34d6bc=_0x34d6bc[_0x18cd85(0x272)](/\b(ITEM|WEAPON|ARMOR)[ ](\d+)[ ]COUNT\b/gi,(_0x421eb4,_0x13f64f,_0x861d4c)=>{const _0x40ea4e=VisuMZ['ExtraEnemyDrops']['getDatabase'](_0x13f64f),_0x258d37=_0x40ea4e[Number(_0x861d4c)]||null;return _0x258d37?$gameParty['numItems'](_0x258d37):0x0;}),_0x34d6bc=_0x34d6bc[_0x18cd85(0x272)](/\b(ITEM|WEAPON|ARMOR)[ ](.*)[ ]COUNT\b/gi,(_0x29ad22,_0x2bba2a,_0x5a5c9a)=>{const _0x4d3a8c=_0x18cd85,_0x1fb281=VisuMZ[_0x4d3a8c(0x202)][_0x4d3a8c(0x18e)](_0x2bba2a,_0x5a5c9a);return _0x1fb281?$gameParty[_0x4d3a8c(0x174)](_0x1fb281):0x0;}),_0x34d6bc=_0x34d6bc[_0x18cd85(0x272)](/\bTIMES[ ](ELEMENT|ITEM|SKILL|STYPE|STATE)[ ](\d+)[ ](?:STRIKE|STRUCK)\b/gi,(_0x589aad,_0x435cf0,_0x24c4e0)=>{const _0x10ccb8=_0x18cd85;let _0xe7c324=_0x435cf0;const _0x3ddfd4=_0x24c4e0;_0xe7c324=_0xe7c324['charAt'](0x0)[_0x10ccb8(0x1d9)]()+_0xe7c324[_0x10ccb8(0x176)](0x1);if(_0xe7c324[_0x10ccb8(0x1aa)](/STYPE/i))_0xe7c324=_0x10ccb8(0x21d);const _0x202090=_0x10ccb8(0x16c)['format'](_0xe7c324);if(_0x2c2f81[_0x202090])return _0x2c2f81[_0x202090](_0x3ddfd4);return 0x0;}),_0x34d6bc=_0x34d6bc[_0x18cd85(0x272)](/\bTIMES[ ](ELEMENT|ITEM|SKILL|STYPE|STATE)[ ](.*)[ ](?:STRIKE|STRUCK)\b/gi,(_0x3817e3,_0x290713,_0x5ead5d)=>{const _0x2530bc=_0x18cd85;let _0x4030af=_0x290713;const _0x5121af=_0x5ead5d;let _0x4b0f0c=0x0;switch(_0x4030af[_0x2530bc(0x1d9)]()['trim']()){case _0x2530bc(0x15d):_0x4b0f0c=DataManager[_0x2530bc(0x1d6)](_0x5121af);break;case _0x2530bc(0x282):_0x4b0f0c=DataManager['getItemIdWithName'](_0x5121af);break;case _0x2530bc(0x269):_0x4b0f0c=DataManager[_0x2530bc(0x236)](_0x5121af);break;case'STYPE':_0x4b0f0c=DataManager['getStypeIdWithName'](_0x5121af);break;case _0x2530bc(0x143):_0x4b0f0c=DataManager[_0x2530bc(0x215)](_0x5121af);break;default:return 0x0;}_0x4030af=_0x4030af[_0x2530bc(0x22b)](0x0)[_0x2530bc(0x1d9)]()+_0x4030af[_0x2530bc(0x176)](0x1);if(_0x4030af[_0x2530bc(0x1aa)](/STYPE/i))_0x4030af=_0x2530bc(0x21d);const _0x5be6c0=_0x2530bc(0x16c)['format'](_0x4030af);if(_0x2c2f81[_0x5be6c0])return _0x2c2f81[_0x5be6c0](_0x4b0f0c);return 0x0;}),_0x34d6bc=_0x34d6bc[_0x18cd85(0x272)](/\bALIVE MEMBERS\b/gi,$gameParty[_0x18cd85(0x233)]()['length']),_0x34d6bc=_0x34d6bc[_0x18cd85(0x272)](/\bBATTLE MEMBERS\b/gi,$gameParty[_0x18cd85(0x1fc)]()[_0x18cd85(0x182)]),_0x34d6bc=_0x34d6bc[_0x18cd85(0x272)](/\bBATTLE TURNS\b/gi,$gameTroop[_0x18cd85(0x294)]()),_0x34d6bc=_0x34d6bc[_0x18cd85(0x272)](/\bDEAD MEMBERS\b/gi,$gameParty['deadMembers']()['length']),_0x34d6bc=_0x34d6bc[_0x18cd85(0x272)](/\bDEATH TURN\b/gi,_0x2c2f81[_0x18cd85(0x163)]()||0x1),_0x34d6bc=_0x34d6bc[_0x18cd85(0x272)](/\bENEMY LEVEL\b/gi,_0x2c2f81['level']||0x1),_0x34d6bc=_0x34d6bc[_0x18cd85(0x272)](/\bPARTY GOLD\b/gi,$gameParty[_0x18cd85(0x26c)]()),_0x34d6bc=_0x34d6bc[_0x18cd85(0x272)](/\bPARTY MEMBERS\b/gi,$gameParty['members']()[_0x18cd85(0x182)]),_0x34d6bc;},VisuMZ[_0x265405(0x202)][_0x265405(0x1cd)]=Game_Troop[_0x265405(0x242)][_0x265405(0x142)],Game_Troop[_0x265405(0x242)]['clear']=function(){const _0x2d37a9=_0x265405;VisuMZ[_0x2d37a9(0x202)][_0x2d37a9(0x1cd)][_0x2d37a9(0x217)](this),this[_0x2d37a9(0x14e)](),this[_0x2d37a9(0x286)]();},Game_Troop[_0x265405(0x242)][_0x265405(0x14e)]=function(){const _0x50de7c=_0x265405;this[_0x50de7c(0x250)]={'exp':undefined,'gold':undefined,'drops':undefined};},Game_Troop[_0x265405(0x242)]['clearBonusRewards']=function(){const _0x55c772=_0x265405;this[_0x55c772(0x21a)]={'exp':0x0,'gold':0x0,'drops':[]};},VisuMZ[_0x265405(0x202)][_0x265405(0x15f)]=Game_Troop['prototype'][_0x265405(0x26a)],Game_Troop[_0x265405(0x242)][_0x265405(0x26a)]=function(){const _0x3f7a5a=_0x265405;if(this[_0x3f7a5a(0x250)]===undefined)this[_0x3f7a5a(0x14e)]();if(this['_bonusRewards']===undefined)this['clearBonusRewards']();let _0x540dee=this[_0x3f7a5a(0x28c)]?this[_0x3f7a5a(0x28c)]():0x1,_0x48a03c=this[_0x3f7a5a(0x250)][_0x3f7a5a(0x273)]===undefined?VisuMZ[_0x3f7a5a(0x202)][_0x3f7a5a(0x15f)]['call'](this):this[_0x3f7a5a(0x250)][_0x3f7a5a(0x273)]*_0x540dee;return Math[_0x3f7a5a(0x23f)](Math[_0x3f7a5a(0x17b)](_0x48a03c+(this['_bonusRewards']['exp']||0x0),0x0));},VisuMZ['ExtraEnemyDrops'][_0x265405(0x1f6)]=Game_Troop['prototype']['goldTotal'],Game_Troop[_0x265405(0x242)][_0x265405(0x222)]=function(){const _0x486833=_0x265405;if(this[_0x486833(0x250)]===undefined)this['clearForcedRewards']();if(this['_bonusRewards']===undefined)this[_0x486833(0x286)]();let _0x1ec45b=this[_0x486833(0x296)]?this[_0x486833(0x296)]():0x1,_0x302209=this[_0x486833(0x250)][_0x486833(0x26c)]===undefined?VisuMZ['ExtraEnemyDrops'][_0x486833(0x1f6)]['call'](this):this[_0x486833(0x250)][_0x486833(0x26c)]*_0x1ec45b;return Math[_0x486833(0x23f)](Math[_0x486833(0x17b)](_0x302209+(this[_0x486833(0x21a)][_0x486833(0x26c)]||0x0)*this[_0x486833(0x296)](),0x0));},VisuMZ[_0x265405(0x202)][_0x265405(0x1ae)]=Game_Troop['prototype'][_0x265405(0x290)],Game_Troop[_0x265405(0x242)][_0x265405(0x290)]=function(){const _0x58e854=_0x265405;if(this['_forcedRewards']===undefined)this[_0x58e854(0x14e)]();if(this[_0x58e854(0x21a)]===undefined)this[_0x58e854(0x286)]();let _0x35959d=this[_0x58e854(0x250)][_0x58e854(0x27b)]===undefined?VisuMZ['ExtraEnemyDrops'][_0x58e854(0x1ae)][_0x58e854(0x217)](this):this[_0x58e854(0x250)][_0x58e854(0x27b)];return _0x35959d[_0x58e854(0x295)](this[_0x58e854(0x21a)][_0x58e854(0x27b)]);},Game_Troop[_0x265405(0x242)][_0x265405(0x28f)]=function(_0x1722c3){const _0x5ca931=_0x265405;if(this[_0x5ca931(0x250)]===undefined)this[_0x5ca931(0x14e)]();if(this[_0x5ca931(0x21a)]===undefined)this[_0x5ca931(0x286)]();this[_0x5ca931(0x250)][_0x5ca931(0x273)]=Math[_0x5ca931(0x17b)](0x0,Math[_0x5ca931(0x23f)](_0x1722c3));},Game_Troop['prototype'][_0x265405(0x225)]=function(_0x1e01f6){const _0x5775aa=_0x265405;if(this[_0x5775aa(0x250)]===undefined)this[_0x5775aa(0x14e)]();if(this[_0x5775aa(0x21a)]===undefined)this[_0x5775aa(0x286)]();this['_bonusRewards']['exp']=Math[_0x5775aa(0x17b)](0x0,Math[_0x5775aa(0x23f)](_0x1e01f6));},Game_Troop['prototype'][_0x265405(0x27d)]=function(_0x3f8a90){const _0x1c12f7=_0x265405;if(this['_forcedRewards']===undefined)this[_0x1c12f7(0x14e)]();if(this[_0x1c12f7(0x21a)]===undefined)this['clearBonusRewards']();this['_forcedRewards'][_0x1c12f7(0x26c)]=Math[_0x1c12f7(0x17b)](0x0,Math[_0x1c12f7(0x23f)](_0x3f8a90));},Game_Troop[_0x265405(0x242)][_0x265405(0x188)]=function(_0x555326){const _0x1b96c8=_0x265405;if(this[_0x1b96c8(0x250)]===undefined)this[_0x1b96c8(0x14e)]();if(this[_0x1b96c8(0x21a)]===undefined)this[_0x1b96c8(0x286)]();this[_0x1b96c8(0x21a)][_0x1b96c8(0x26c)]=Math[_0x1b96c8(0x17b)](0x0,Math[_0x1b96c8(0x23f)](_0x555326));},Game_Troop[_0x265405(0x242)]['addForcedItemDrop']=function(_0xb351a6,_0xdbb00b){const _0x5a59f7=_0x265405;if(this[_0x5a59f7(0x250)]===undefined)this[_0x5a59f7(0x14e)]();if(this[_0x5a59f7(0x21a)]===undefined)this['clearBonusRewards']();_0xdbb00b=_0xdbb00b||0x1,this['_forcedRewards'][_0x5a59f7(0x27b)]=this[_0x5a59f7(0x250)][_0x5a59f7(0x27b)]||[];while(_0xdbb00b--){const _0x377979=$dataItems[_0xb351a6];if(_0x377979)this['_forcedRewards'][_0x5a59f7(0x27b)][_0x5a59f7(0x205)](_0x377979);}},Game_Troop[_0x265405(0x242)][_0x265405(0x214)]=function(_0x555338,_0x27a877){const _0x4e9fe9=_0x265405;if(this[_0x4e9fe9(0x250)]===undefined)this['clearForcedRewards']();if(this[_0x4e9fe9(0x21a)]===undefined)this[_0x4e9fe9(0x286)]();_0x27a877=_0x27a877||0x1,this[_0x4e9fe9(0x250)]['drops']=this[_0x4e9fe9(0x250)][_0x4e9fe9(0x27b)]||[];while(_0x27a877--){const _0x4bc6af=$dataWeapons[_0x555338];if(_0x4bc6af)this[_0x4e9fe9(0x250)]['drops']['push'](_0x4bc6af);}},Game_Troop[_0x265405(0x242)][_0x265405(0x167)]=function(_0x4fbef7,_0x7a0850){const _0xea926b=_0x265405;if(this[_0xea926b(0x250)]===undefined)this[_0xea926b(0x14e)]();if(this[_0xea926b(0x21a)]===undefined)this[_0xea926b(0x286)]();_0x7a0850=_0x7a0850||0x1,this[_0xea926b(0x250)][_0xea926b(0x27b)]=this[_0xea926b(0x250)]['drops']||[];while(_0x7a0850--){const _0x12677f=$dataArmors[_0x4fbef7];if(_0x12677f)this[_0xea926b(0x250)][_0xea926b(0x27b)]['push'](_0x12677f);}},Game_Troop[_0x265405(0x242)][_0x265405(0x1e5)]=function(_0x23a129,_0x57e32d){const _0x734bc7=_0x265405;if(this['_forcedRewards']===undefined)this[_0x734bc7(0x14e)]();if(this[_0x734bc7(0x21a)]===undefined)this[_0x734bc7(0x286)]();_0x57e32d=_0x57e32d||0x1;while(_0x57e32d--){const _0x5a97ff=$dataItems[_0x23a129];if(_0x5a97ff)this[_0x734bc7(0x21a)][_0x734bc7(0x27b)][_0x734bc7(0x205)](_0x5a97ff);}},Game_Troop[_0x265405(0x242)]['addBonusWeaponDrop']=function(_0x899559,_0x2d91aa){const _0x2487f7=_0x265405;if(this['_forcedRewards']===undefined)this['clearForcedRewards']();if(this[_0x2487f7(0x21a)]===undefined)this[_0x2487f7(0x286)]();_0x2d91aa=_0x2d91aa||0x1;while(_0x2d91aa--){const _0x42d6c7=$dataWeapons[_0x899559];if(_0x42d6c7)this[_0x2487f7(0x21a)][_0x2487f7(0x27b)]['push'](_0x42d6c7);}},Game_Troop[_0x265405(0x242)][_0x265405(0x13f)]=function(_0x9e59f2,_0x2b0df6){const _0x360419=_0x265405;if(this['_forcedRewards']===undefined)this[_0x360419(0x14e)]();if(this[_0x360419(0x21a)]===undefined)this[_0x360419(0x286)]();_0x2b0df6=_0x2b0df6||0x1;while(_0x2b0df6--){const _0x53cffc=$dataArmors[_0x9e59f2];if(_0x53cffc)this[_0x360419(0x21a)][_0x360419(0x27b)]['push'](_0x53cffc);}},Game_Troop[_0x265405(0x242)][_0x265405(0x19d)]=function(){const _0x37c19a=_0x265405;if(this[_0x37c19a(0x250)]===undefined)this['clearForcedRewards']();return this[_0x37c19a(0x250)][_0x37c19a(0x27b)]!==undefined;};function _0x4017(){const _0x2153e8=['Game_Troop_clear','Game_BattlerBase_eraseState','isSceneBattle','ForcedGoldSet','remove','opacityFadeOut','cos','11484AFQyxz','setRarity','getElementIdWithName','attackElements','updateDuration','toUpperCase','getItemIdWithName','ForcedAddArmor','updateFlagData','makeDeepCopy','getDatabaseKind','isDead','VisuMZ_0_CoreEngine','trim','randomInt','rotationConstant','RAINBOW','addBonusItemDrop','hue','getDatabase','NUM','1095gRclQZ','ARRAYSTRUCT','timesStruckSTypes','process_VisuMZ_ExtraEnemyDrops_Drops_Notetags','createConditionalDropsTrackedData','1613344HbZBvR','convertConditionToCode','parse','getDatabaseItemID','_visualDrops','BonusRewardsClear','removeVisualDrops','_stypeIDs','Game_Troop_goldTotal','createJS','getExpGoldDropIcon','_scene','kind','_weaponIDs','battleMembers','height','split','addForcedItemDrop','updateJumpHeight','loadSystem','ExtraEnemyDrops','calculateJumpHeight','createIconSprite','push','timesStruck%1s','Game_BattlerBase_addNewState','WEAPON','iconIndex','BonusAddWeapon','initMembers','quantity','JSON','deathStateId','targetX','sfxFilename','State','setTargetDestination','item','addForcedWeaponDrop','getStateIdWithName','_iconSprite','call','rarityTint','Enable','_bonusRewards','Duration%1','targetOpacity','SType','parameters','VisuMZ_1_ElementStatusCore','commonItemIcon','rarityFrames','goldTotal','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Skill','setBonusExp','Spriteset_Battle_createLowerLayer','rarityDuration','opacityRate','updateOpacity','fadeAfterBounce','charAt','shift','toLowerCase','isSkill','Game_Enemy_setup','getStypeIdWithName','createDrops','Duration0','aliveMembers','registerCommand','_conditionalDropsTrackedData','getSkillIdWithName','WEAPONS','lastStruck%1','_skillIDs','elementId','_battlerContainer','_stateIDs','bounceReduction','BonusAddArmor','round','name','dropItems','prototype','iconHeight','Game_Action_applyItemUserEffect','msDelay','exit','timesStruckState','createShadowSprite','STYPE','sfxPan','description','clamp','playSe','_itemIDs','Gold','_forcedRewards','resetOnRevive','VisualDropVisible','create','createLowerLayer','MULTIPLY','BonusExpSet','Tint%1','onBattleStart','addExtraEnemyDropsSingles','30tboDny','dataId','FUNC','isStateAffected','setTintInformation','lastStruckElement','ConvertParams','ARRAYJSON','STRUCT','sort','Game_Battler_onBattleStart','applyEasing','_visualDropSprites','baseY','bounces','SKILL','expTotal','ITEMS','gold','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20enemy\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20drops\x20=\x20arguments[0];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Array\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20drops;\x0a\x20\x20\x20\x20','ParseEnemyNotetags','lastStruckItem','createInitialPosition','bounceSFX','replace','exp','Drop','includes','deathTurn','true','setHue','3208716CqgrpB','baseX','drops','startSpecialSFX','setForcedGold','Rarity','ARRAYNUM','Exp','anchor','ITEM','_spriteset','addChild','yRateFoV','clearBonusRewards','duration','uniqueIcons','createVisualDrops','initialize','isItem','expRate','value','addExtraEnemyDropsJS','setForcedExp','makeDropItems','commonArmorsIcon','timesStruckSkills','4808166fRXjrk','turnCount','concat','goldRate','enemy','addBonusArmorDrop','89704qktVDn','isAlive','clear','STATE','update','version','BattleManager_initMembers','Game_Enemy_exp','dropItemRate','restoreVisualDrops','Item','_data','eraseState','shadowFilename','clearForcedRewards','ARRAYSTR','STATES','map','battler','ARRAYEVAL','startFadeOut','Visible','Element','VisualDrops','applyTimesStruck','Flags0','ForcedAddWeapon','_shadowSprite','setFrame','ELEMENT','lastStruckType','Game_Troop_expTotal','format','ParseAllNotetags','_baseX','getDeathTurn','createSprites','SKILLS','createChildren','addForcedArmorDrop','angle','constructor','shadowOffsetX','false','timesStruck%1','denominator','findTargetDropSprite','opacityModifier','2612218YOTiYY','damage','addBonusWeaponDrop','isArmor','numItems','timesStruckSType','slice','setup','bind','isWeapon','min','max','jumpHeight','addExtraEnemyDropsConditional','stypeId','find','updatePosition','filter','length','iconWidth','onDatabaseLoaded','isEnemy','checkValidDrop','BonusGoldSet','setBonusGold','SCREEN','Game_Enemy_gold','6fUiwzl','BOUNCE\x20SFX:\x20%1','show','getDatabaseItem','timesStruckItems','applyItemUserEffect','bitmap','RainbowHueSpeed','lastStruckSkill','calculatePosition','addVisualDrops','addNewState','none','lastStruckSType','addTimesStruck','_visualDropsVisible','Settings','_elementIDs','hasForcedDrops','_rotationConstant','resetVisualDrops','General','VisuMZ_1_BattleCore','timesStruckItem','pow','sfxPitch','timesStruckElements','targetY','updateTint','addExtraEnemyDrops','return\x200','match','Scene_Boot_onDatabaseLoaded','Game_Enemy_makeDropItems','opacity','Game_Troop_makeDropItems','SPAWN\x20SFX:\x20%1','STR','Linear','getWeaponIdWithName','updateRotation','352515SLIsts','getArmorIdWithName','updateFlags','279YiNHke','ARMORS','flags','ForcedAddItem','skillTypes','ARMOR','meetsExtraEnemyDropsCondition','_armorIDs','sortDrops','_baseY','Tint0','ApplyEasing','elements','iconOffsetRate','blendMode','BonusAddItem','random','getConditionalDropsTrackedData','getItemDropIcons','registerDeathTurn','addExtraEnemyDropsBatch','note'];_0x4017=function(){return _0x2153e8;};return _0x4017();}if(Imported[_0x265405(0x1a1)]&&VisuMZ[_0x265405(0x202)][_0x265405(0x19b)][_0x265405(0x1a0)][_0x265405(0x219)]){VisuMZ[_0x265405(0x157)]=VisuMZ['VisualDrops']||{},VisuMZ[_0x265405(0x157)]['BattleManager_initMembers']=BattleManager[_0x265405(0x20b)],BattleManager[_0x265405(0x20b)]=function(){const _0x1e60bc=_0x265405;$gameTemp['_visualDropSprites']=[],BattleManager[_0x1e60bc(0x19a)]=!![],VisuMZ[_0x1e60bc(0x157)][_0x1e60bc(0x146)][_0x1e60bc(0x217)](this);},VisuMZ[_0x265405(0x157)][_0x265405(0x207)]=Game_BattlerBase[_0x265405(0x242)][_0x265405(0x196)],Game_BattlerBase['prototype'][_0x265405(0x196)]=function(_0x10d8ab){const _0x38c071=_0x265405,_0x10b38c=this[_0x38c071(0x141)]();VisuMZ[_0x38c071(0x157)][_0x38c071(0x207)]['call'](this,_0x10d8ab);if(!Imported[_0x38c071(0x1a1)])return;if(!this[_0x38c071(0x185)]())return;if(!SceneManager[_0x38c071(0x1cf)]())return;const _0x37121e=SceneManager[_0x38c071(0x1f9)]['_spriteset'];if(!_0x37121e)return;_0x10b38c&&this[_0x38c071(0x1df)]()&&_0x37121e[_0x38c071(0x289)](this);},VisuMZ[_0x265405(0x157)][_0x265405(0x1ce)]=Game_BattlerBase[_0x265405(0x242)][_0x265405(0x14c)],Game_BattlerBase['prototype'][_0x265405(0x14c)]=function(_0x1950a0){const _0x41bb39=_0x265405,_0x294029=this[_0x41bb39(0x1df)]();VisuMZ[_0x41bb39(0x157)]['Game_BattlerBase_eraseState'][_0x41bb39(0x217)](this,_0x1950a0);if(!Imported[_0x41bb39(0x1a1)])return;if(!this[_0x41bb39(0x185)]())return;if(!SceneManager['isSceneBattle']())return;const _0x1ef883=SceneManager[_0x41bb39(0x1f9)][_0x41bb39(0x283)];if(!_0x1ef883)return;if(_0x294029&&this[_0x41bb39(0x141)]()){_0x1ef883[_0x41bb39(0x1f4)](this);if(VisuMZ[_0x41bb39(0x202)][_0x41bb39(0x19b)][_0x41bb39(0x1a0)][_0x41bb39(0x251)])this[_0x41bb39(0x19f)]();}},VisuMZ[_0x265405(0x157)][_0x265405(0x22f)]=Game_Enemy[_0x265405(0x242)][_0x265405(0x177)],Game_Enemy[_0x265405(0x242)][_0x265405(0x177)]=function(_0xeda3a1,_0xf0f681,_0x1ca4ab){const _0x905144=_0x265405;VisuMZ[_0x905144(0x157)][_0x905144(0x22f)]['call'](this,_0xeda3a1,_0xf0f681,_0x1ca4ab);},Game_Enemy[_0x265405(0x242)][_0x265405(0x19f)]=function(){this['_visualDrops']={};},VisuMZ[_0x265405(0x157)][_0x265405(0x147)]=Game_Enemy['prototype']['exp'],Game_Enemy[_0x265405(0x242)]['exp']=function(){const _0x326c32=_0x265405;this[_0x326c32(0x1f2)]=this[_0x326c32(0x1f2)]||{};if(this[_0x326c32(0x1f2)][_0x326c32(0x273)]!==undefined)return this['_visualDrops'][_0x326c32(0x273)];return this[_0x326c32(0x1f2)][_0x326c32(0x273)]=VisuMZ[_0x326c32(0x157)]['Game_Enemy_exp'][_0x326c32(0x217)](this),this[_0x326c32(0x1f2)][_0x326c32(0x273)];},VisuMZ[_0x265405(0x157)][_0x265405(0x18a)]=Game_Enemy[_0x265405(0x242)][_0x265405(0x26c)],Game_Enemy[_0x265405(0x242)][_0x265405(0x26c)]=function(){const _0x29ca9d=_0x265405;this[_0x29ca9d(0x1f2)]=this[_0x29ca9d(0x1f2)]||{};if(this['_visualDrops'][_0x29ca9d(0x26c)]!==undefined)return this[_0x29ca9d(0x1f2)]['gold'];return this[_0x29ca9d(0x1f2)][_0x29ca9d(0x26c)]=VisuMZ[_0x29ca9d(0x157)][_0x29ca9d(0x18a)]['call'](this),this[_0x29ca9d(0x1f2)][_0x29ca9d(0x26c)];},VisuMZ['VisualDrops'][_0x265405(0x1ac)]=Game_Enemy[_0x265405(0x242)][_0x265405(0x290)],Game_Enemy['prototype']['makeDropItems']=function(){const _0x167cae=_0x265405;this['_visualDrops']=this[_0x167cae(0x1f2)]||{};if(this[_0x167cae(0x1f2)]['drops']!==undefined)return this[_0x167cae(0x1f2)][_0x167cae(0x27b)];return this['_visualDrops'][_0x167cae(0x27b)]=VisuMZ[_0x167cae(0x157)][_0x167cae(0x1ac)][_0x167cae(0x217)](this),this[_0x167cae(0x1f2)][_0x167cae(0x27b)];},Spriteset_Battle['prototype'][_0x265405(0x1f4)]=function(_0x2e6638){const _0x125ac5=_0x265405;if(!_0x2e6638)return;$gameTemp['_visualDropSprites']=$gameTemp[_0x125ac5(0x266)]||[];const _0x471dc5=[];for(const _0x242b96 of $gameTemp[_0x125ac5(0x266)]){if(!_0x242b96)continue;if(_0x242b96['enemy']!==_0x2e6638)continue;const _0x11b4c0=this[_0x125ac5(0x16e)](_0x242b96);if(!_0x11b4c0)continue;_0x11b4c0['startFadeOut'](),_0x471dc5['push'](_0x242b96);}for(const _0x3e5e1a of _0x471dc5){$gameTemp[_0x125ac5(0x266)][_0x125ac5(0x1d1)](_0x3e5e1a);}},Spriteset_Battle[_0x265405(0x242)][_0x265405(0x16e)]=function(_0x58cad1){const _0x256b29=_0x265405;return this['_battlerContainer']['children'][_0x256b29(0x17f)](_0x53eadf=>_0x53eadf[_0x256b29(0x14b)]===_0x58cad1);},Spriteset_Battle['prototype'][_0x265405(0x289)]=function(_0x152f2f){const _0x2e11c1=_0x265405,_0x92d8d6=VisuMZ[_0x2e11c1(0x202)]['Settings'];if(!_0x152f2f)return;let _0x30d884=[];_0x92d8d6[_0x2e11c1(0x280)][_0x2e11c1(0x18d)]&&_0x30d884[_0x2e11c1(0x205)](VisuMZ['VisualDrops'][_0x2e11c1(0x1f8)](_0x152f2f,_0x2e11c1(0x280)));_0x92d8d6[_0x2e11c1(0x24f)][_0x2e11c1(0x18d)]&&_0x30d884[_0x2e11c1(0x205)](VisuMZ['VisualDrops'][_0x2e11c1(0x1f8)](_0x152f2f,_0x2e11c1(0x24f)));_0x92d8d6[_0x2e11c1(0x274)]['show']&&(_0x30d884=_0x30d884['concat'](VisuMZ[_0x2e11c1(0x157)]['getItemDropIcons'](_0x152f2f)));const _0x286acc=VisuMZ['VisualDrops'][_0x2e11c1(0x164)](_0x152f2f,_0x30d884);$gameTemp[_0x2e11c1(0x266)]=$gameTemp[_0x2e11c1(0x266)]||[];let _0x931388=0x0;for(const _0x5536fb of _0x286acc){if(!_0x5536fb)continue;$gameTemp[_0x2e11c1(0x266)][_0x2e11c1(0x205)](_0x5536fb['_data']),setTimeout(this[_0x2e11c1(0x195)][_0x2e11c1(0x178)](this,_0x5536fb),_0x931388),_0x931388+=_0x92d8d6[_0x2e11c1(0x1a0)][_0x2e11c1(0x245)];}},Spriteset_Battle['prototype'][_0x265405(0x195)]=function(_0x3d8da2){const _0x2371d8=_0x265405;if(!SceneManager[_0x2371d8(0x1cf)]())return;this[_0x2371d8(0x23b)][_0x2371d8(0x284)](_0x3d8da2),_0x3d8da2[_0x2371d8(0x27c)]();},VisuMZ[_0x265405(0x157)][_0x265405(0x1f8)]=function(_0x5d8a6e,_0x4bb863){const _0x340b6b=_0x265405;if(!_0x5d8a6e)return 0x0;const _0x510da9=VisuMZ[_0x340b6b(0x202)][_0x340b6b(0x19b)][_0x4bb863],_0x51aaed=VisuMZ['ExtraEnemyDrops'][_0x340b6b(0x19b)]['Rarity'],_0x223360=_0x4bb863===_0x340b6b(0x280)?_0x5d8a6e[_0x340b6b(0x273)]():_0x5d8a6e['gold']();let _0x5e2b72=0x0,_0x39a9c5=0x0,_0x310d62=_0x51aaed[_0x340b6b(0x1c1)],_0x2054e7=_0x51aaed[_0x340b6b(0x232)],_0x3c1956=JsonEx['makeDeepCopy'](_0x51aaed[_0x340b6b(0x159)]);for(let _0x9d5b0f=0x1;_0x9d5b0f<=0xa;_0x9d5b0f++){const _0x42dac4='Value%1'[_0x340b6b(0x160)](_0x9d5b0f),_0x51e3da='Icon%1'[_0x340b6b(0x160)](_0x9d5b0f),_0x55589b='Rarity%1'[_0x340b6b(0x160)](_0x9d5b0f);if(_0x510da9[_0x42dac4]<_0x5e2b72)continue;if(_0x223360<_0x510da9[_0x42dac4])continue;_0x5e2b72=_0x510da9[_0x42dac4],_0x39a9c5=_0x510da9[_0x51e3da];const _0x4bca47=_0x510da9[_0x55589b]['clamp'](0x0,0xa);_0x310d62=_0x51aaed[_0x340b6b(0x257)[_0x340b6b(0x160)](_0x4bca47)]||[0x0,0x0,0x0,0x0],_0x2054e7=_0x51aaed[_0x340b6b(0x21b)[_0x340b6b(0x160)](_0x4bca47)]||0x1,_0x3c1956=_0x51aaed['Flags%1'[_0x340b6b(0x160)](_0x4bca47)]||[];}return[_0x39a9c5,_0x310d62,_0x2054e7,_0x3c1956];},VisuMZ[_0x265405(0x157)][_0x265405(0x1c9)]=function(_0x625b53){const _0x2d53c5=_0x265405,_0xc9bc0=[],_0x39cc0a=_0x625b53[_0x2d53c5(0x290)](),_0x41427b=VisuMZ['ExtraEnemyDrops'][_0x2d53c5(0x19b)]['Drop'],_0x58e345=VisuMZ['ExtraEnemyDrops'][_0x2d53c5(0x19b)][_0x2d53c5(0x27e)];for(const _0x5a00fa of _0x39cc0a){if(!_0x5a00fa)continue;const _0x5c86b7=[];if(_0x5a00fa[_0x2d53c5(0x1cc)]['match'](/<VISUAL DROP ICON:[ ](\d+)>/i))_0x5c86b7[_0x2d53c5(0x205)](Number(RegExp['$1'])||0x0);else{if(_0x41427b[_0x2d53c5(0x288)])_0x5c86b7[_0x2d53c5(0x205)](_0x5a00fa['iconIndex']);else{if(DataManager[_0x2d53c5(0x28b)](_0x5a00fa))_0x5c86b7['push'](_0x41427b[_0x2d53c5(0x220)]);else{if(DataManager[_0x2d53c5(0x179)](_0x5a00fa))_0x5c86b7[_0x2d53c5(0x205)](_0x41427b['commonWeaponIcon']);else DataManager[_0x2d53c5(0x173)](_0x5a00fa)&&_0x5c86b7['push'](_0x41427b[_0x2d53c5(0x291)]);}}}if(_0x5a00fa[_0x2d53c5(0x1cc)][_0x2d53c5(0x1aa)](/<VISUAL DROP RARITY:[ ](\d+)>/i)){const _0x1a61dd=Number(RegExp['$1'])[_0x2d53c5(0x24c)](0x0,0xa);_0x5c86b7[_0x2d53c5(0x205)](_0x58e345[_0x2d53c5(0x257)[_0x2d53c5(0x160)](_0x1a61dd)]||[0x0,0x0,0x0,0x0]),_0x5c86b7['push'](_0x58e345[_0x2d53c5(0x21b)['format'](_0x1a61dd)]||0xb4),_0x5c86b7[_0x2d53c5(0x205)](_0x58e345['Flags%1'[_0x2d53c5(0x160)](_0x1a61dd)]||[]);}else{if(_0x5a00fa[_0x2d53c5(0x1cc)][_0x2d53c5(0x1aa)](/<VISUAL DROP TINT COLOR:[ ](.*)>/i)){let _0x5a519e=String(RegExp['$1'])['split'](',')['map'](_0x37e942=>Number(_0x37e942)[_0x2d53c5(0x24c)](-0xff,0xff));while(_0x5a519e[_0x2d53c5(0x182)]<0x4)_0x5a519e[_0x2d53c5(0x205)](0x0);_0x5c86b7[_0x2d53c5(0x205)](_0x5a519e);}else _0x5c86b7[_0x2d53c5(0x205)](_0x58e345['Tint0']);_0x5a00fa[_0x2d53c5(0x1cc)]['match'](/<VISUAL DROP TINT DURATION:[ ](\d+)>/i)?_0x5c86b7[_0x2d53c5(0x205)](Number(RegExp['$1'])||0xb4):_0x5c86b7[_0x2d53c5(0x205)](_0x58e345['TintDuration0']),_0x5c86b7[_0x2d53c5(0x205)](JsonEx[_0x2d53c5(0x1dd)](_0x58e345[_0x2d53c5(0x159)]));}const _0x4b4cba=_0x5a00fa[_0x2d53c5(0x1cc)][_0x2d53c5(0x1aa)](/<VISUAL DROP FLAG:[ ](.*)>/gi);if(_0x4b4cba)for(const _0x48c1a9 of _0x4b4cba){_0x48c1a9[_0x2d53c5(0x1aa)](/<VISUAL DROP FLAG:[ ](.*)>/i);const _0x2bb29e=String(RegExp['$1']);_0x5c86b7[_0x5c86b7[_0x2d53c5(0x182)]-0x1][_0x2d53c5(0x205)](_0x2bb29e);}if(_0x5a00fa['note'][_0x2d53c5(0x1aa)](/<VISUAL DROP SFX:[ ](.*)>/i)){const _0x152200='SPAWN\x20SFX:\x20%1'[_0x2d53c5(0x160)](String(RegExp['$1']));_0x5c86b7[_0x5c86b7[_0x2d53c5(0x182)]-0x1][_0x2d53c5(0x205)](_0x152200);}if(_0x5a00fa[_0x2d53c5(0x1cc)][_0x2d53c5(0x1aa)](/<VISUAL DROP SPAWN SFX:[ ](.*)>/i)){const _0x4532e1=_0x2d53c5(0x1af)['format'](String(RegExp['$1']));_0x5c86b7[_0x5c86b7[_0x2d53c5(0x182)]-0x1][_0x2d53c5(0x205)](_0x4532e1);}if(_0x5a00fa[_0x2d53c5(0x1cc)][_0x2d53c5(0x1aa)](/<VISUAL DROP BOUNCE HEIGHT:[ ](\d+)([%％])>/i)){const _0x3205a5='BOUNCE\x20HEIGHT\x20%1%'[_0x2d53c5(0x160)](Number(RegExp['$1']));_0x5c86b7[_0x5c86b7[_0x2d53c5(0x182)]-0x1]['push'](_0x3205a5);}if(_0x5a00fa[_0x2d53c5(0x1cc)]['match'](/<VISUAL DROP BOUNCE SFX:[ ](.*)>/i)){const _0xf1df61=_0x2d53c5(0x18c)[_0x2d53c5(0x160)](String(RegExp['$1']));_0x5c86b7[_0x5c86b7[_0x2d53c5(0x182)]-0x1][_0x2d53c5(0x205)](_0xf1df61);}_0xc9bc0[_0x2d53c5(0x205)](_0x5c86b7);}return _0xc9bc0;},VisuMZ[_0x265405(0x157)][_0x265405(0x164)]=function(_0x3d14ba,_0x5e7283){const _0x5c3725=_0x265405;_0x5e7283=_0x5e7283[_0x5c3725(0x181)](_0x2367df=>_0x2367df[0x0]!==0x0);if(_0x5e7283[_0x5c3725(0x182)]<=0x0)return[];const _0x1d954b=VisuMZ['ExtraEnemyDrops']['Settings']['General'],_0xf02392=0x168/_0x5e7283['length'],_0x2fd977=_0x3d14ba[_0x5c3725(0x152)](),_0x207343=[];let _0x4f7a5e=Math[_0x5c3725(0x1e2)](0x168);for(const _0x7c1e05 of _0x5e7283){if(_0x7c1e05[0x0]<=0x0)continue;const _0x5b8951=new Sprite_VisualDrop(_0x3d14ba,_0x7c1e05);_0x207343['push'](_0x5b8951);if(_0x2fd977&&_0x5e7283[_0x5c3725(0x182)]>0x1){const _0x393d92=_0x1d954b['radius']+_0x1d954b['radiusPerIcon']*_0x5e7283[_0x5c3725(0x182)],_0x14dfda=_0x393d92*Math[_0x5c3725(0x1d3)](_0x4f7a5e*Math['PI']/0xb4),_0x24073f=_0x393d92*(Math['sin'](_0x4f7a5e*Math['PI']/0xb4)*_0x1d954b[_0x5c3725(0x285)]);_0x5b8951[_0x5c3725(0x212)](_0x14dfda+_0x2fd977[_0x5c3725(0x162)],_0x24073f+_0x2fd977[_0x5c3725(0x1c0)]),_0x4f7a5e+=_0xf02392;}}return _0x207343;},VisuMZ[_0x265405(0x157)][_0x265405(0x226)]=Spriteset_Battle[_0x265405(0x242)][_0x265405(0x254)],Spriteset_Battle['prototype'][_0x265405(0x254)]=function(){const _0x386385=_0x265405;VisuMZ[_0x386385(0x157)][_0x386385(0x226)][_0x386385(0x217)](this),this['restoreVisualDrops']();},Spriteset_Battle[_0x265405(0x242)][_0x265405(0x149)]=function(){const _0x598a98=_0x265405;$gameTemp['_visualDropSprites']=$gameTemp['_visualDropSprites']||[];for(const _0x4903f4 of $gameTemp[_0x598a98(0x266)]){if(!_0x4903f4)continue;const _0x5369f8=new Sprite_VisualDrop(_0x4903f4[_0x598a98(0x13e)],_0x4903f4[_0x598a98(0x209)],_0x4903f4);this[_0x598a98(0x23b)][_0x598a98(0x284)](_0x5369f8);}};function Sprite_VisualDrop(){const _0x1be5a9=_0x265405;this[_0x1be5a9(0x28a)](...arguments);}Sprite_VisualDrop[_0x265405(0x242)]=Object[_0x265405(0x253)](Sprite['prototype']),Sprite_VisualDrop['prototype'][_0x265405(0x169)]=Sprite_VisualDrop,Sprite_VisualDrop[_0x265405(0x242)][_0x265405(0x28a)]=function(_0x43f3d,_0xaf673d,_0x416e5e){const _0x19dca3=_0x265405;_0x416e5e?(this[_0x19dca3(0x14b)]=_0x416e5e,this['_baseX']=this['_data'][_0x19dca3(0x27a)],this[_0x19dca3(0x1c0)]=this[_0x19dca3(0x14b)][_0x19dca3(0x267)]):this[_0x19dca3(0x14b)]=this[_0x19dca3(0x270)](_0x43f3d,_0xaf673d),Sprite['prototype'][_0x19dca3(0x28a)][_0x19dca3(0x217)](this),this[_0x19dca3(0x166)]();},Sprite_VisualDrop[_0x265405(0x242)][_0x265405(0x270)]=function(_0x2bb277,_0x2e0f07){const _0x4cb1f3=_0x265405,_0x500152=VisuMZ[_0x4cb1f3(0x202)][_0x4cb1f3(0x19b)][_0x4cb1f3(0x1a0)],_0x54f7f1=_0x2bb277[_0x4cb1f3(0x152)]();_0x2e0f07=JsonEx[_0x4cb1f3(0x1dd)](_0x2e0f07);const _0x27acf1={'enemy':_0x2bb277,'iconIndex':_0x2e0f07[0x0],'duration':_0x500152[_0x4cb1f3(0x287)],'angle':_0x500152[_0x4cb1f3(0x168)],'jumpHeight':0x0,'bounces':_0x500152[_0x4cb1f3(0x268)],'bounceSFX':_0x500152['sfxFilename'],'targetX':_0x54f7f1[_0x4cb1f3(0x162)],'targetY':_0x54f7f1['_baseY'],'targetOpacity':0xff,'opacityModifier':0x1,'rarityFrames':0x0,'rarityTint':_0x2e0f07[0x1]||[0x0,0x0,0x0,0x0],'rarityDuration':_0x2e0f07[0x2]||0xb4,'flags':_0x2e0f07[0x3]||[]};this[_0x4cb1f3(0x162)]=_0x54f7f1[_0x4cb1f3(0x162)],this[_0x4cb1f3(0x1c0)]=_0x54f7f1[_0x4cb1f3(0x1c0)],_0x27acf1[_0x4cb1f3(0x27a)]=this[_0x4cb1f3(0x162)],_0x27acf1[_0x4cb1f3(0x267)]=this[_0x4cb1f3(0x1c0)],_0x27acf1['flags']=_0x27acf1[_0x4cb1f3(0x1b9)][_0x4cb1f3(0x151)](_0x4436ce=>String(_0x4436ce));for(const _0x28c70c of _0x27acf1[_0x4cb1f3(0x1b9)]){if(!_0x28c70c)continue;if(_0x28c70c[_0x4cb1f3(0x1aa)](/BOUNCE SFX: (.*)/i)){const _0x4579f4=String(RegExp['$1']);_0x27acf1[_0x4cb1f3(0x271)]=_0x4579f4;}}return _0x27acf1;},Sprite_VisualDrop[_0x265405(0x242)][_0x265405(0x166)]=function(){const _0xa2df5f=_0x265405;this[_0xa2df5f(0x248)](),this['createIconSprite'](),this[_0xa2df5f(0x229)](!![]);},Sprite_VisualDrop[_0x265405(0x242)][_0x265405(0x248)]=function(){const _0xc1e33d=_0x265405,_0x3610e6=VisuMZ['ExtraEnemyDrops'][_0xc1e33d(0x19b)]['General'];if(!_0x3610e6['showShadow'])return;this[_0xc1e33d(0x15b)]=new Sprite(),this['_shadowSprite'][_0xc1e33d(0x191)]=ImageManager[_0xc1e33d(0x201)](_0x3610e6[_0xc1e33d(0x14d)]),this[_0xc1e33d(0x15b)]['anchor']['x']=0.5,this[_0xc1e33d(0x15b)][_0xc1e33d(0x281)]['y']=0x1,this[_0xc1e33d(0x15b)]['x']=_0x3610e6[_0xc1e33d(0x16a)],this[_0xc1e33d(0x15b)]['y']=_0x3610e6['shadowOffsetY'],this[_0xc1e33d(0x15b)]['opacity']=_0x3610e6['shadowOpacity'],this[_0xc1e33d(0x284)](this[_0xc1e33d(0x15b)]);},Sprite_VisualDrop[_0x265405(0x242)][_0x265405(0x204)]=function(){const _0x50e4f2=_0x265405,_0x2a7c3e=VisuMZ[_0x50e4f2(0x202)]['Settings']['General'];this['_iconSprite']=new Sprite(),this[_0x50e4f2(0x216)][_0x50e4f2(0x191)]=ImageManager['loadSystem']('IconSet'),this['_iconSprite']['anchor']['x']=0.5,this['_iconSprite']['anchor']['y']=0.5,this[_0x50e4f2(0x216)][_0x50e4f2(0x267)]=Math[_0x50e4f2(0x23f)](ImageManager[_0x50e4f2(0x243)]/_0x2a7c3e[_0x50e4f2(0x1c4)]),this[_0x50e4f2(0x216)]['y']=this[_0x50e4f2(0x216)][_0x50e4f2(0x267)];const _0x18e6c0=this[_0x50e4f2(0x14b)][_0x50e4f2(0x209)],_0x3b01c1=ImageManager[_0x50e4f2(0x183)],_0x24ae26=ImageManager['iconHeight'],_0x23bee6=_0x18e6c0%0x10*_0x3b01c1,_0x48c0af=Math['floor'](_0x18e6c0/0x10)*_0x24ae26;this['_iconSprite'][_0x50e4f2(0x15c)](_0x23bee6,_0x48c0af,_0x3b01c1,_0x24ae26),this['addChild'](this[_0x50e4f2(0x216)]);},Sprite_VisualDrop[_0x265405(0x242)][_0x265405(0x212)]=function(_0x24c44a,_0x178506){const _0x371080=_0x265405;this[_0x371080(0x14b)]['targetX']=Math[_0x371080(0x23f)](_0x24c44a),this[_0x371080(0x14b)][_0x371080(0x1a6)]=Math[_0x371080(0x23f)](_0x178506);},Sprite_VisualDrop[_0x265405(0x242)][_0x265405(0x1d5)]=function(_0x48d8e2){const _0x301e85=_0x265405,_0x22ba5b=VisuMZ[_0x301e85(0x202)]['Settings']['Rarity'],_0x3f70f8=(_0x22ba5b[_0x301e85(0x257)[_0x301e85(0x160)](_0x48d8e2)]||[0x0,0x0,0x0,0x0])[_0x301e85(0x151)](_0x156d6d=>Number(_0x156d6d)['clamp'](-0xff,0xff)),_0x2ce51d=_0x22ba5b[_0x301e85(0x21b)['format'](_0x48d8e2)]||0x0;this[_0x301e85(0x25e)](_0x3f70f8,_0x2ce51d);},Sprite_VisualDrop[_0x265405(0x242)]['setTintInformation']=function(_0x1ae27e,_0x318942){const _0x589728=_0x265405;this[_0x589728(0x14b)][_0x589728(0x218)]=JsonEx[_0x589728(0x1dd)](_0x1ae27e),this[_0x589728(0x14b)][_0x589728(0x227)]=_0x318942;},Sprite_VisualDrop[_0x265405(0x242)]['setFlags']=function(_0x12de57){const _0x1d3347=_0x265405;this['_data'][_0x1d3347(0x1b9)]=JsonEx[_0x1d3347(0x1dd)](_0x12de57)['map'](_0x47fdd6=>String(_0x47fdd6));},Sprite_VisualDrop[_0x265405(0x242)][_0x265405(0x154)]=function(){const _0x478d3c=_0x265405;this[_0x478d3c(0x14b)][_0x478d3c(0x21c)]=0x0;},Sprite_VisualDrop[_0x265405(0x242)]['startSpecialSFX']=function(){const _0x3244b7=_0x265405;for(const _0x273720 of this[_0x3244b7(0x14b)][_0x3244b7(0x1b9)]){if(!_0x273720)continue;if(_0x273720[_0x3244b7(0x1aa)](/\bSPAWN SFX:[ ](.*)\b/i)){const _0x3f988b={'name':String(RegExp['$1']),'volume':0x5a,'pitch':0x64,'pan':0x0};AudioManager[_0x3244b7(0x24d)](_0x3f988b);}}},Sprite_VisualDrop[_0x265405(0x242)][_0x265405(0x144)]=function(){const _0x1d7b76=_0x265405;Sprite[_0x1d7b76(0x242)]['update'][_0x1d7b76(0x217)](this),this[_0x1d7b76(0x229)]();if(this['opacity']<=0x0)return;this[_0x1d7b76(0x1b6)](),this[_0x1d7b76(0x1b3)](),this[_0x1d7b76(0x200)](),this[_0x1d7b76(0x194)](),this[_0x1d7b76(0x180)](),this[_0x1d7b76(0x1a7)](),this[_0x1d7b76(0x1d8)]();},Sprite_VisualDrop[_0x265405(0x242)]['updateFlags']=function(){const _0x39b993=_0x265405;for(const _0x11e5d5 of this[_0x39b993(0x14b)][_0x39b993(0x1b9)]){if(!_0x11e5d5)continue;this[_0x39b993(0x1dc)](_0x11e5d5);}},Sprite_VisualDrop[_0x265405(0x242)][_0x265405(0x1dc)]=function(_0x567fc2){const _0x5af3bd=_0x265405,_0x4d9935=VisuMZ['ExtraEnemyDrops'][_0x5af3bd(0x19b)][_0x5af3bd(0x27e)];switch(_0x567fc2[_0x5af3bd(0x1d9)]()[_0x5af3bd(0x1e1)]()){case _0x5af3bd(0x1e4):this['_data'][_0x5af3bd(0x1e6)]=this[_0x5af3bd(0x14b)][_0x5af3bd(0x1e6)]||0x0,this[_0x5af3bd(0x14b)][_0x5af3bd(0x1e6)]+=_0x4d9935[_0x5af3bd(0x192)],this[_0x5af3bd(0x216)][_0x5af3bd(0x278)](this[_0x5af3bd(0x14b)][_0x5af3bd(0x1e6)]);break;case'ADDITIVE':this[_0x5af3bd(0x216)][_0x5af3bd(0x1c5)]=0x1;break;case _0x5af3bd(0x255):this[_0x5af3bd(0x216)][_0x5af3bd(0x1c5)]=0x2;break;case _0x5af3bd(0x189):this[_0x5af3bd(0x216)][_0x5af3bd(0x1c5)]=0x3;break;};},Sprite_VisualDrop['prototype'][_0x265405(0x229)]=function(_0x562c39){const _0x421641=_0x265405,_0x4ead73=VisuMZ[_0x421641(0x202)][_0x421641(0x19b)][_0x421641(0x1a0)],_0x3307d1=this[_0x421641(0x14b)]['targetOpacity'][_0x421641(0x24c)](0x0,0xff)*this[_0x421641(0x228)]();if(this[_0x421641(0x1ad)]>_0x3307d1)this[_0x421641(0x1ad)]=Math['max'](this[_0x421641(0x1ad)]-_0x4ead73[_0x421641(0x1d2)],_0x3307d1);else this[_0x421641(0x1ad)]<_0x3307d1&&(this[_0x421641(0x1ad)]=Math[_0x421641(0x17a)](this['opacity']+_0x4ead73[_0x421641(0x1d2)],_0x3307d1));if(_0x562c39)this[_0x421641(0x1ad)]=_0x3307d1;},Sprite_VisualDrop[_0x265405(0x242)][_0x265405(0x228)]=function(){const _0x1b6379=_0x265405;if(!BattleManager[_0x1b6379(0x19a)])return 0x0;if($gameTroop[_0x1b6379(0x19d)]())return 0x0;return this['_data'][_0x1b6379(0x16f)];},Sprite_VisualDrop[_0x265405(0x242)][_0x265405(0x1b3)]=function(){const _0x2462c0=_0x265405;this[_0x2462c0(0x14b)]['duration']>0x0?this[_0x2462c0(0x216)][_0x2462c0(0x168)]-=this[_0x2462c0(0x1e3)]():this[_0x2462c0(0x216)][_0x2462c0(0x168)]=0x0;},Sprite_VisualDrop['prototype'][_0x265405(0x1e3)]=function(){const _0x412d59=_0x265405;if(this[_0x412d59(0x19e)]!==undefined)return this[_0x412d59(0x19e)];const _0x83ff41=VisuMZ['ExtraEnemyDrops'][_0x412d59(0x19b)][_0x412d59(0x1a0)];return this[_0x412d59(0x19e)]=_0x83ff41[_0x412d59(0x168)]/_0x83ff41[_0x412d59(0x287)],this['_rotationConstant'];},Sprite_VisualDrop[_0x265405(0x242)][_0x265405(0x200)]=function(){const _0x29dcb7=_0x265405;this[_0x29dcb7(0x14b)][_0x29dcb7(0x287)]>0x0?this['_data'][_0x29dcb7(0x17c)]=this[_0x29dcb7(0x203)]():this[_0x29dcb7(0x14b)][_0x29dcb7(0x17c)]=0x0,this['_iconSprite']['y']=this['_iconSprite'][_0x29dcb7(0x267)]-this[_0x29dcb7(0x14b)][_0x29dcb7(0x17c)];},Sprite_VisualDrop[_0x265405(0x242)][_0x265405(0x203)]=function(){const _0x47acb6=_0x265405,_0x9e1126=VisuMZ[_0x47acb6(0x202)][_0x47acb6(0x19b)][_0x47acb6(0x1a0)],_0x51d293=_0x9e1126['bounces'],_0x3ae5bc=this[_0x47acb6(0x14b)]['bounces'],_0x1aabd6=Math[_0x47acb6(0x1a3)](_0x9e1126['bounceReduction'],_0x51d293-_0x3ae5bc),_0x5da54f=Math[_0x47acb6(0x23f)](_0x9e1126[_0x47acb6(0x1fd)]*_0x1aabd6),_0x5a1b2a=Math[_0x47acb6(0x23f)](_0x9e1126['duration']*_0x1aabd6),_0x561374=this['_data'][_0x47acb6(0x287)],_0x575216=_0x561374,_0x39fbde=_0x5a1b2a-_0x575216,_0x3ecdd6=_0x5a1b2a/0x2,_0x3aee0b=_0x5da54f,_0x53ab7e=-_0x3aee0b/Math[_0x47acb6(0x1a3)](_0x3ecdd6,0x2),_0xd2681b=_0x53ab7e*Math[_0x47acb6(0x1a3)](_0x39fbde-_0x3ecdd6,0x2)+_0x3aee0b;let _0x4bfe43=0x1;for(const _0x4bd738 of this['_data'][_0x47acb6(0x1b9)]){if(!_0x4bd738)continue;_0x4bd738[_0x47acb6(0x1aa)](/BOUNCE HEIGHT (\d+)([%％])/i)&&(_0x4bfe43*=Number(RegExp['$1'])/0x64);}return _0xd2681b*_0x4bfe43;},Sprite_VisualDrop[_0x265405(0x242)][_0x265405(0x194)]=function(){const _0xbe94ee=_0x265405;if(this['_data'][_0xbe94ee(0x287)]>0x0){const _0x137cd2=VisuMZ['ExtraEnemyDrops'][_0xbe94ee(0x19b)][_0xbe94ee(0x1a0)],_0x353734=this[_0xbe94ee(0x14b)]['duration'],_0x1ef204=_0x137cd2[_0xbe94ee(0x287)],_0x39d085=_0x137cd2['iconJumpEasing'];Imported[_0xbe94ee(0x1e0)]?(this[_0xbe94ee(0x162)]=this[_0xbe94ee(0x265)](this[_0xbe94ee(0x162)],this[_0xbe94ee(0x14b)][_0xbe94ee(0x20f)],_0x353734,_0x1ef204,_0x39d085),this[_0xbe94ee(0x1c0)]=this[_0xbe94ee(0x265)](this[_0xbe94ee(0x1c0)],this[_0xbe94ee(0x14b)][_0xbe94ee(0x1a6)],_0x353734,_0x1ef204,_0x39d085)):(this[_0xbe94ee(0x162)]=(this[_0xbe94ee(0x162)]*(_0x353734-0x1)+this['_data'][_0xbe94ee(0x20f)])/_0x353734,this['_baseY']=(this[_0xbe94ee(0x1c0)]*(_0x353734-0x1)+this[_0xbe94ee(0x14b)]['targetY'])/_0x353734);}else this['_baseX']=this['_data']['targetX'],this['_baseY']=this['_data'][_0xbe94ee(0x1a6)];this[_0xbe94ee(0x14b)][_0xbe94ee(0x27a)]=this[_0xbe94ee(0x162)],this['_data'][_0xbe94ee(0x267)]=this[_0xbe94ee(0x1c0)];},Sprite_VisualDrop[_0x265405(0x242)][_0x265405(0x265)]=function(_0x1fac3b,_0x28ec65,_0x5099ea,_0x58bf53,_0x336df0){const _0x418420=_0x265405,_0x50e290=VisuMZ[_0x418420(0x1c2)]((_0x58bf53-_0x5099ea)/_0x58bf53,_0x336df0||'Linear'),_0x5eb9f5=VisuMZ[_0x418420(0x1c2)]((_0x58bf53-_0x5099ea+0x1)/_0x58bf53,_0x336df0||_0x418420(0x1b1)),_0x4f0d05=(_0x1fac3b-_0x28ec65*_0x50e290)/(0x1-_0x50e290);return _0x4f0d05+(_0x28ec65-_0x4f0d05)*_0x5eb9f5;},Sprite_VisualDrop[_0x265405(0x242)][_0x265405(0x180)]=function(){const _0x1f3f8a=_0x265405;this['x']=this[_0x1f3f8a(0x162)],this['y']=this['_baseY'];},Sprite_VisualDrop[_0x265405(0x242)][_0x265405(0x1a7)]=function(){const _0x52de11=_0x265405;if(!VisuMZ[_0x52de11(0x202)][_0x52de11(0x19b)]['Rarity']['show'])return;const _0x99aa3b=this[_0x52de11(0x14b)];_0x99aa3b[_0x52de11(0x221)]++;const _0x18c6d4=_0x99aa3b[_0x52de11(0x221)]%_0x99aa3b[_0x52de11(0x227)],_0x20cc8b=_0x99aa3b[_0x52de11(0x227)]-_0x18c6d4,_0x211934=_0x99aa3b[_0x52de11(0x227)]/0x2,_0x2b5d1f=0x1,_0x2a1965=-_0x2b5d1f/Math[_0x52de11(0x1a3)](_0x211934,0x2),_0x7cbe1a=_0x2a1965*Math[_0x52de11(0x1a3)](_0x20cc8b-_0x211934,0x2)+_0x2b5d1f,_0x14bc59=_0x99aa3b[_0x52de11(0x218)]['map'](_0xeb1402=>_0xeb1402*_0x7cbe1a);this[_0x52de11(0x216)]['setColorTone'](_0x14bc59);},Sprite_VisualDrop[_0x265405(0x242)][_0x265405(0x1d8)]=function(){const _0x2529f4=_0x265405;this['_data'][_0x2529f4(0x287)]--;if(this[_0x2529f4(0x14b)][_0x2529f4(0x287)]===0x0&&this['_data'][_0x2529f4(0x268)]>=0x0){this['_data'][_0x2529f4(0x268)]-=0x1;const _0x206fa2=VisuMZ[_0x2529f4(0x202)]['Settings'][_0x2529f4(0x1a0)],_0x56e075=_0x206fa2['bounces'],_0xf41336=this[_0x2529f4(0x14b)][_0x2529f4(0x268)],_0x3887f0=Math['pow'](_0x206fa2[_0x2529f4(0x23d)],_0x56e075-_0xf41336);if(this[_0x2529f4(0x14b)][_0x2529f4(0x268)]>=0x0)this[_0x2529f4(0x14b)]['duration']=Math[_0x2529f4(0x23f)](_0x206fa2[_0x2529f4(0x287)]*_0x3887f0);else _0x206fa2[_0x2529f4(0x22a)]&&setTimeout(this['startFadeOut'][_0x2529f4(0x178)](this),_0x206fa2['fadeAfterDelay']);if(_0x206fa2[_0x2529f4(0x210)]){const _0x40d4b3={'name':this[_0x2529f4(0x14b)][_0x2529f4(0x271)],'volume':Math[_0x2529f4(0x23f)](_0x206fa2['sfxVolume']*_0x3887f0),'pitch':_0x206fa2[_0x2529f4(0x1a4)],'pan':_0x206fa2[_0x2529f4(0x24a)]};AudioManager['playSe'](_0x40d4b3);}}};};