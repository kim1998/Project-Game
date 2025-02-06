//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.57;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.57] [ItemsEquipsCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Items_and_Equips_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Items & Equips Core makes improvements to the RPG Maker MZ item and
 * equipment dedicated scenes (including the shop) and how they're handled.
 * From more item categories, better parameter control, rulings, and more, game
 * devs are able to take control over key aspects of their game's items.
 *
 * Features include all (but not limited to) the following:
 *
 * * Modifying the appearances to the Item Scene, Equip Scene, and Shop Scene.
 * * Categorizing items in unique and multiple categories.
 * * Item Scene and Shop Scene will now display detailed information on items.
 * * NEW! marker can be displayed over recently acquired items in-game.
 * * Equipment notetags to adjust parameters past the editor limitations.
 * * Equipment Rulings to adjust what slot types can and can't be unequipped
 *   and/or optimized.
 * * Equipment Type Handling offers more control over equipment loadouts.
 * * Items sold in shops can be hidden/shown based on Switches.
 * * Items sold in shops can have varying prices adjusted by notetags.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Equipment Type Handling
 *
 * - Characters will no longer have one universal equipment slot setting.
 * Classes can have different equipment type loadouts, made possible through
 * the usage of notetags. Also, equipment types of matching names would be
 * treated as the same type, where previously, they would be different types.
 * This means if you have two "Accessory" slots, be it in the form of notetags
 * or through the Database > Types tab, they can both equip the same type of
 * accessories.
 *
 * - The Change Equip event command is now updated to reflect this new change.
 * When processing an equip change, the slot changed will go to the first
 * empty slot of matching type. If all of the actor's matching slot types are
 * equipped, then the equip will replace the last slot available.
 *
 * ---
 *
 * Shop Status Window
 *
 * - The Status Window found in the Shop Scene was originally barren and did
 * not display much information at all. This is changed through this plugin's
 * new features. While the contents of the Shop Status Window can be customized
 * through the Plugin Parameters, it is a change that cannot be reversed and
 * for the better since it gives players the much needed information revolving
 * around the game's items.
 *
 * ---
 *
 * Core Engine Compatibility: Modern Controls
 *
 * - If the VisuStella Core Engine is added to your game with Modern Controls
 * enabled, then the Item Menu Scene, Equip Menu Scene, and Shop Menu Scene's
 * controls will be changed a bit.
 *
 * - The Item Menu Scene will automatically have the Item List Window active,
 * with using the Left/Right (for single column) or Page Up/Page Down (for
 * multi-columns) to navigate between the Item Categories. Similar will occur
 * when trying to sell items in the Shop Menu Scene.
 *
 * - The Equip Menu Scene will automatically have the Equip Slots Window active
 * and only activate the command window upon moving up to it.
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 * 
 * ---
 * 
 * VisuMZ_1_BattleCore
 * 
 * Changing the "Damage Multiplier" or "Healing Multiplier" vocabulary for the
 * Item and Equip Core's Shop Status Window is not done with the Item and Equip
 * Core's Plugin Parameters if you have the Battle Core installed.
 * 
 * Instead, go to Battle Core's Plugin Parameters, Damage Settings, Damage
 * Styles, and adjust the style's version of the "Damage Multiplier" or
 * "Healing Multiplier" text instead.
 * 
 * Why does this work this way? Because not all damage styles work off
 * "Multipliers" so in order for it to convey the proper message to the player,
 * each damage style has its own vocabulary to be more accurate.
 * 
 * In case you forget about that, when you visit the Item and Equip Core's
 * plugin parameters for these, it should also remind you in the parameter's
 * description on where to change it.
 * 
 * ---
 *
 * VisuMZ_2_WeaponSwapSystem
 *
 * The custom equip slots feature from the VisuStella MZ Items and Equips Core
 * allowed you to add in extra weapon slots. This is now curated up to a max
 * of one weapon slot per character. This needs to be done to make the Weapon
 * Swap System viable.
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
 * ---
 *
 * === General ===
 * 
 * These notetags affect the Items, Weapons, and Armors on a general scale.
 *
 * ---
 *
 * <Max: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the maximum quantity that can be held for this item.
 * - Replace 'x' with a number value to determine the maximum amount.
 *
 * ---
 *
 * <Color: x>
 * <Color: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor, Skill Notetags
 * - Determines the color of the object inside the in-game menus.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <Category: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace 'x' with a category name to mark this item as.
 *
 * ---
 *
 * <Categories>
 *  x
 *  x
 * </Categories>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace each 'x' with a category name to mark this item as.
 *
 * ---
 * 
 * <Conserve: x%>
 * 
 * - Used for: Item
 * - Gives the item a percent chance when used to not consume the item.
 * - Replace 'x' with a number representing the percent chance to successfully
 *   conserve the item.
 * - If an item cannot be consumed, conserve chance will be 100% regardless.
 * 
 * ---
 * 
 * <ID Sort Priority: x>
 * 
 * - Used for: Item, Weapon, and Armor Notetags
 * - Used for Scene_Item, Scene_Equip, Scene_Battle, and Scene_Shop's sell
 *   option (only when selling).
 * - Changes sorting priority by ID for item, weapon, or armor to 'x'. 
 *   - Default priority level is '50'.
 * - Items, weapons, and armors with higher priority values will be sorted
 *   higher up on the list while lower values will be lower on the list.
 * 
 * ---
 *
 * === Item Accessibility Notetags ===
 *
 * The following notetags allow you to choose when items can/cannot be used
 * based on switches.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, item will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, item will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Item Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if an item can be accessible by code.
 *
 * ---
 *
 * <JS Item Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Item Enable>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on JavaScript code.
 * - If the actor this is disabled for is the only party member, it will not be
 *   visible in the item list unless the VisuStella Battle Core is installed.
 *   - If the VisuStella Battle Core is installed, then all battle scope items
 *     will be visible even if they're disabled.
 * - Replace 'code' to determine the type enabled status of the item.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   item will be enabled or not.
 * - The 'user' variable refers to the user with the item.
 * - The 'item' variable refers to the item being checked.
 * - All other item conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === Equipment Notetags ===
 *
 * The following notetags provide equipment-related effects from deciding what
 * equip slots can be given to classes to the base parameter changes asigned
 * to weapons and armors.
 *
 * ---
 *
 * <Equip Slots>
 *  slotName
 *  slotName
 *  slotName
 * </Equip Slots>
 *
 * - Used for: Class Notetags
 * - Changes the equipment slot loadout for any actor who is that class.
 * - Replace 'slotName' with an Equipment Type name from Database > Types.
 *   This is case-sensitive.
 * - Insert or remove as many "slotName" equipment types as needed.
 *
 * ---
 *
 * <param: +x>
 * <param: -x>
 *
 * - Used for: Weapon, Armor Notetags
 * - Changes the base parameter value for the equip item.
 * - Replace 'param' with any of the following: 'MaxHP', 'MaxMP', 'ATK', 'DEF',
 *   'MAT', 'MDF', 'AGI', or 'LUK' to change that specific parameter's value.
 *   - These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * - Replace 'x' with a number value to set the parameter value to.
 * - This allows you to bypass the Database Editor's number limitations.
 *
 * ---
 * 
 * <Equip Copy Limit: x>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Sets a maximum number of copies that the actor can wear of this equipment.
 * - Replace 'x' with a number value to determine the copy limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: Actors can only equip one copy of the "One-of-a-Kind Ring"
 *   on at any time despite having empty accessory slots because the ring has a
 *   <Equip Copy Limit: 1> notetag.
 * 
 * ---
 * 
 * <Equip Weapon Type Limit: x>
 * 
 * - Used for: Weapon
 * - This weapon cannot be equipped with other weapons of the same type once
 *   the limited amount has been reached.
 * - Replace 'x' with a number value to determine the weapon type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: A dualwielding warrior who can only equip one sword and a
 *   dagger but never two swords or two daggers because the swords and daggers
 *   all have the <Equip Weapon Type Limit: 1> notetags on them.
 * 
 * ---
 * 
 * <Equip Armor Type Limit: x>
 * 
 * - Used for: Armor
 * - This armor cannot be equipped with other armors of the same type once the
 *   limited amount has been reached.
 * - Replace 'x' with a number value to determine the armor type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: People cannot equip more than two glove accessories on at a
 *   time because the glove is a "Glove" armor-type and each glove item has the
 *   <Equip Armor Type Limit: 2> notetags on them.
 * 
 * ---
 * 
 * <Party Artifact>
 * <Troop Artifact>
 * 
 * <Stackable Party Artifact>
 * <Stackable Troop Artifact>
 * 
 * - Used for: Armor
 * - This armor cannot be equipped at all. However, by simply being in the
 *   party's inventory, its parameter bonuses and traits will be applied
 *   globally throughout the whole party or troop (depending on the notetag).
 * - Add both notetags to affect both groups.
 * - The normal versions of the notetag is only applied once regardless of the
 *   number of copies are found in the party's inventory.
 * - The stackable versions of the notetag will have the bonuses and traits
 *   stacked multiple times relative to the number of copies found in the
 *   party's inventory.
 * - This item will NOT be added during the setup phase for Battle Tests.
 *   - If you want to add the item, do it manually.
 * 
 * ---
 * 
 * <Equip For Class Only: x>
 * <Equip For Classes Only: x, x, x>
 * <Equip For Class Only: name>
 * <Equip For Classes Only: name, name, name>
 * 
 * - Used for: Weapon, Armor Notetags
 * - This piece of equipment can only be worn by members with 'x' as the main
 *   class. If there are multiple classes listed, at least one of them need to
 *   be the actor's main class.
 * - Replace 'x' with a number representing the ID of the class required.
 * - For the 'name' variant, replace 'name' with the name of the required class
 *   the actor needs to have in order to equip this object.
 * 
 * ---
 * 
 * <Equip Requirements>
 *  requirement
 *  requirement
 *  requirement
 * </Equip Requirements>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Defines a requirement(s) for the actor to meet in order for the equip item
 *   to be equippable.
 * - Failure to meet these requirements will cause the equipment to unequip
 *   automatically.
 *   - Keep in mind that in some cases, this will not happen immediately.
 *     Things like switches will require the actor to meet its cache clear
 *     in order to trigger the automatic unequip.
 *   - Some ways to trigger a cache clear would be to change the actor's HP/MP,
 *     or adding and then removing a state for the actor (preferrably an unused
 *     state that has no real effect).
 * - Replace 'requirement' with one of the settings bellow:
 * - Add multiple 'requirement' lines for more requirements.
 * 
 *   Requirements:
 *
 *   param > x
 *   param >= x
 *   param === x
 *   param <= x
 *   param < x
 *   - Replace 'param' with 'level', 'maxhp', 'maxmp', 'atk', 'def', 'mat',
 *     'mdf', 'agi', or 'luk'.
 *   - This will make the piece of equipment require the actor's base parameter
 *     to be greater than (>), greater than or equal to (>=), equal to (===),
 *     less than or equal to (<=), or less than (<).
 *   - This is NOT the value for the total parameter, only the base parameter.
 *   - The base parameter is calculated by the user's class parameter value and
 *     any bonuses received through permanent stat increases.
 *
 *   learned skill: x
 *   learned skill: name
 *   - This will make the piece of equipment require the actor to have learned
 *     skill 'x'. 
 *   - If 'name' is used, priority will be given to the skill with the highest
 *     ID in the database.
 *   - The actor needs to have LEARNED the skill. This means that if you have
 *     added a skill to the actor's kit through a trait, it will not count.
 *
 *   switch: x
 *   - This will require switch X to be on.
 *   - If it isn't, the piece of equipment cannot be worn.
 *   - Insert multiple of these to add more switches that are are required to
 *     be on.
 * 
 *   ***NOTE 1***
 *   There is no "class: x" for these equip requirements. Instead, use the
 *   <Equip For Class Only: x> notetags.
 * 
 *   ***NOTE 2***
 *   For those wondering where "unique only" is, that does not exist in this
 *   plugin. Instead, use the <Equip Copy Limit: x> notetag listed above.
 * 
 *   Example A:
 * 
 *     <Equip Requirements>
 *     level >= 20
 *     </Equip Requirements>
 * 
 *     - Requires the user to be at least level 20 in order to equip.
 * 
 *   Example B:
 * 
 *     <Equip Requirements>
 *     atk >= 50
 *     def <= 50
 *     </Equip Requirements>
 *     - Requires the user have at least 50 base ATK to equip.
 *     - Requires the user to be under 50 base DEF to equip.
 * 
 * ---
 * 
 * <Added EType: x>
 * <Added ETypes: x, x, x>
 * 
 * - Used for: Armor Notetags
 * - This is for armors only and does NOT work with weapons!
 * - Allows a piece of armor to belong to multiple ETypes. This means a glove
 *   can be equipped as "Armgear" or as an "Accessory" if you so choose.
 * - Replace 'x' with a number representing the ID of the EType you wish to add
 *   to the list of ETypes.
 *   - Insert multiple 'x' entries to add more than one EType ID.
 * 
 * ---
 * 
 * <Cursed>
 * 
 * - Used for: Weapon, Armor Notetags
 * - If this weapon or armor is equipped, it cannot manually be removed by the
 *   player until it is purified.
 * - To remove it, it must be done by event commands, script calls, or through
 *   the Purify-related Plugin Commands provided by this plugin.
 * - Once purified, the weapon or armor will become unequipped unless it has a
 *   purify transformation.
 *   - If the newly transformed weapon/armor is equippable, it will remain in
 *     the actor's equipment slots.
 * - If you are using VisuMZ_2_WeaponSwapSystem, weapons cannot become cursed
 *   in order to allow free weapon swapping. Weaponry will not be cursed
 *   if VisuMZ_2_WeaponSwapSystem is installed.
 * 
 * ---
 * 
 * <Purify Transform: id>
 * <Purify Transform: name>
 * 
 * - Used for: Weapon, Armor Notetags
 * - If this notetag is present on a <Cursed> weapon or armor, then upon the
 *   actor receiving purification, the weapon or armor will transform into a
 *   different item.
 * - Replace 'id' with a number representing the transformed weapon/armor's ID.
 * - Replace 'name' with text representing the transformed weapon/armor's name.
 * - Weapons can only transform into weapons.
 * - Armors can only transform into armors.
 * 
 * ---
 *
 * === JavaScript Notetags: Equipment ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * adjust the parameter through code.
 *
 * ---
 *
 * <JS Parameters>
 *  MaxHP = code;
 *  MaxMP = code;
 *  ATK = code;
 *  DEF = code;
 *  MAT = code;
 *  MDF = code;
 *  AGI = code;
 *  LUK = code;
 * </JS Parameters>
 *
 * - Used for: Weapon, Armor Notetags
 * - Uses JavaScript to determine the values for the basic parameters based on
 *   the code used to calculate its value.
 * - The variables 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', and
 *   'LUK' are used to determine the finalized value of the parameter. This
 *   variable is case sensitive.
 * - If a parameter is not present, its value will be treated as +0.
 * 
 * '''WARNING!''' If you are trying to calculate a value based off a full
 * parameter value, such as "ATK = user.atk * 0.10", it's going to break and
 * will cause an infinite loop. Use base parameter values instead.
 *
 * ---
 *
 * === Status Window Notetags ===
 *
 * The following notetags will affect the Shop Status Window info. If for any
 * reason the data that is displayed is not to your liking or insufficient,
 * you can change it up using the following notetags.
 *
 * ---
 *
 * <Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Status Info>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - If you do not like the generated data that's displayed, you can change it
 *   using this notetag to display what you want.
 * - Replace 'key' with one of the following for skills and items:
 *   - Consumable
 *   - Quantity
 *   - Occasion
 *   - Scope
 *   - Speed
 *   - Success Rate
 *   - Repeat
 *   - Hit Type
 *   - Element
 *   - Damage Multiplier
 *   - HP Recovery
 *   - MP Recovery
 *   - TP Recovery
 *   - HP Damage
 *   - MP Damage
 *   - TP Damage
 *   - User TP Gain
 *   - Added Effects
 *   - Removed Effects
 * - Replace 'key' with one of the following for weapons and armors:
 *   - 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', or 'LUK'
 *   - For those with VisuMZ_0_CoreEngine:
 *     - 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT', 'HRG', 'MRG', 'TRG'
 *     - 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR', 'MDR', 'FDR', 'EXR'
 *   - Only relevant if the Draw Style for equipment is "classic" or "double".
 * - Replace 'data' with the text data you want to visually appear. You may use
 *   text codes for this.
 * - This only affects info entries that are already visible and won't make
 *   other categories suddenly appear.
 * - For clarity regarding "Damage Multiplier" and "HP Recovery"/"HP Damage":
 *   - "Damage Multiplier" refers to the amount determined by damage formulas.
 *   - "HP Recovery"/"HP Damage" refers to the "Recover HP" database effect.
 *   - Likewise, the same will apply to "MP Recovery"/"MP Damage" if the damage
 *     formula type is to deal MP recovery/damage instead.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * <Custom Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Custom Status Info>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - If you want custom categories and data to be displayed for your items that
 *   aren't provided by the Shop Status Window Info to begin with, you can use
 *   this notetag to add in your own entries.
 *   - When used with weapon or armor database objects, this information is
 *     only relevant if the Draw Style for equipment is "classic" or "double".
 * - Replace 'key' with text of the exact label you want. You may use text
 *   codes for this.
 * - Replace 'data' with text of the exact text data you want. You may use text
 *   codes for this.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 * 
 * <Status Style: Compare>
 * <Status Style: Classic>
 * <Status Style: Double>
 *
 * - Used for: Weapon, Armor Notetags
 * - Changes up the way the shop status window displays data for this database
 *   object in particular.
 *     - Compare - Compares selected equip to equipped gear
 *       - Lists all main party actors
 *       - Displays the parameter differences when equipped
 *       - Calculates custom JS values
 *     - Classic - Shows basic parameters of selected equip
 *       - Involves no actors, only shows the item's stats
 *       - Shows weapon or armor specific parameters
 *       - Does not show custom JS values as those are calculated per actor
 *       - Does not show custom parameters as those are calculated per actor
 *       - Use <Status Info> and <Custom Status Info> notetags to overwrite or
 *         add custom data to classic equip data
 *     - Double - Shows basic parameters in double columns
 *       - Involves no actors, only shows the item's stats
 *       - Shows weapon or armor specific parameters
 *       - Does not show custom JS values as those are calculated per actor
 *       - Does not show custom parameters as those are calculated per actor
 *       - Use <Status Info> and <Custom Status Info> notetags to overwrite or
 *         add custom data to classic equip data
 * 
 * ---
 * 
 * <Custom Status Parameters: name, name, name>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Requires VisuMZ_0_CoreEngine!
 *   - This will not work otherwise!
 * - Customize which parameters are displayed for this equipment object's shop
 *   status window.
 *   - This ONLY applies to the shop status window and not other windows.
 * - Replace 'name' with any of the following to display custom parameters:
 *   - 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', and 'LUK'
 *   - 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT', 'HRG', 'MRG', 'TRG'
 *   - 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR', 'MDR', 'FDR', 'EXR'
 *   - Does not work with custom parameters as those are calculated per actor.
 * - Parameters will be displayed in the order inserted into the notetag.
 *
 * ---
 * 
 * <Shop Picture Name: filename>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Enables a shop picture for the status window. This image can be seen in
 *   the item scene, shop scene, and skill scene if enabled.
 * - If this notetag is not used, there will be no image.
 * - Replace 'filename' with the filename of the graphic to use from the game
 *   project's img/pictures/ folder. Filenames are case sensitive. Leave out
 *   the filename extension from the notetag.
 * - Use the supporting notetags to determine where the image appears. If not,
 *   they will default to the background, fit to the window dimensions,
 *   centered at the middle of the window.
 * 
 * ---
 * 
 * <Shop Picture Layer: Background>
 * <Shop Picture Layer: Foreground>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines which layer the graphic will be drawn on.
 * - If the background layer is selected, the picture will appear behind the
 *   data text.
 * - If the foreground layer is selected, the picture will appear in front of
 *   the data text.
 * - If this notetag is not used, it will default to the background layer.
 * 
 * ---
 * 
 * <Shop Picture Max Width: x>
 * <Shop Picture Max Height: y>
 * <Shop Picture Max Dimensions: x, y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines the maximum width and/or height for the image.
 * - This means the image will be automatically scaled proportionally to that
 *   width or height as long as everything else does not break boundaries.
 * - Replace 'x' and 'y' with number values representing the maximum dimensions
 *   the image can be in pixels.
 * - If these notetags are not used, the image will be automatically scaled to
 *   the dimensions of the shop status window.
 * 
 * ---
 * 
 * <Shop Picture Alignment: Left>
 * <Shop Picture Alignment: Center>
 * <Shop Picture Alignment: Right>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the horizontal alignment for the image.
 * - Left, center, right determines how it's aligned horizontally if the
 *   image does not horizontally fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'center' alignment.
 * 
 * ---
 * 
 * <Shop Picture Position: Top>
 * <Shop Picture Position: Middle>
 * <Shop Picture Position: Bottom>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the vertical position for the image.
 * - Top, middle, bottom determines how it's positioned vertically if the
 *   image does not vertically fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'middle' position.
 * 
 * ---
 * 
 * <Shop Picture Offset X: +x>
 * <Shop Picture Offset X: -x>
 * 
 * <Shop Picture Offset Y: +y>
 * <Shop Picture Offset Y: -y>
 * 
 * <Shop Picture Offset: +x, +y>
 * <Shop Picture Offset: -y, -y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Offsets the X and Y positions of the image in the shop status window.
 * - X offsets adjust the horizontal position by x pixels.
 *   - Positive goes right.
 *   - Negative goes left.
 * - Y offsets adjust the horizontal position by y pixels.
 *   - Positive goes down.
 *   - Negative goes up.
 * - Replace 'x' and 'y' with number values representing the pixels to offset
 *   the image by. The '+' and '-' signs are required.
 * - If none of these notetags are used, there will be no offsets.
 * 
 * ---
 * 
 * <Shop Picture Opacity: x>
 * <Shop Picture Opacity: x%>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the opacity of the image used.
 * - When using 'x' and not 'x%', use a number between 0 and 255.
 *   - The closer to 0, the more transparent the image is.
 *   - The closer to 255, the more opaque the image is.
 * - When using 'x%' and not 'x', use a number between 0% and 100%.
 *   - The closer to 0%, the more transparent the image is.
 *   - The closer to 100%, the more opaque the image is.
 * 
 * ---
 *
 * === Shop Menu Notetags ===
 *
 * These notetags adjust how prices and such are managed inside the Shop Menu
 * as well as whether or not some items are visible depending on switch states.
 *
 * ---
 *
 * <Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Adjusts the buying price for this item.
 * - Replace 'x' with a number depicting the desired value for the buy price.
 * - This allows you to bypass the RPG Maker MZ editor's limitation of 999,999.
 *
 * ---
 *
 * <Can Sell>
 * <Cannot Sell>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Makes the item either always sellable or cannot be sold.
 * - This bypasses the game's internal hard-coding to prevent items with a
 *   price of 0 from being able to be sold.
 * - This bypasses the game's internal hard-coding to always allow items with
 *   a price value of being able to be sold.
 *
 * ---
 *
 * <Sell Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the sell price to be something different than the default amount.
 * - Replace 'x' with a number depicting the desired value for the sell price.
 *
 * ---
 *
 * <Show Shop Switch: x>
 *
 * <Show Shop All Switches: x,x,x>
 * <Show Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Shop Switch: x>
 *
 * <Hide Shop All Switches: x,x,x>
 * <Hide Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Cannot Sell Switch: x>
 *
 * <Cannot Sell All Switches: x,x,x>
 * <Cannot Sell Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the sellability of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's sellability.
 * - If 'All' notetag variant is used, item cannot be sold until all switches
 *   are ON. Otherwise, it can be sold.
 * - If 'Any' notetag variant is used, item cannot be sold if any of the
 *   switches are ON. Otherwise, it can be sold.
 *
 * ---
 * 
 * <Buy Turn On Switch: x>
 * <Buy Turn On Switches: x, x, x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - When this item, weapon, or armor is bought in the shop scene, turn on the
 *   switch(es) 'x'.
 * - Replace 'x' with a number representing the ID of the switch to turn on.
 *   - Insert multiple 'x' values to turn on multiple switches upon buying.
 * 
 * ---
 * 
 * <Buy Turn Off Switch: x>
 * <Buy Turn Off Switches: x, x, x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - When this item, weapon, or armor is bought in the shop scene, turn off the
 *   switch(es) 'x'.
 * - Replace 'x' with a number representing the ID of the switch to turn off.
 *   - Insert multiple 'x' values to turn off multiple switches upon buying.
 * 
 * ---
 * 
 * <Sell Turn On Switch: x>
 * <Sell Turn On Switches: x, x, x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - When this item, weapon, or armor is sold in the shop scene, turn on the
 *   switch(es) 'x'.
 * - Replace 'x' with a number representing the ID of the switch to turn on.
 *   - Insert multiple 'x' values to turn on multiple switches upon selling.
 * 
 * ---
 * 
 * <Sell Turn Off Switch: x>
 * <Sell Turn Off Switches: x, x, x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - When this item, weapon, or armor is sold in the shop scene, turn off the
 *   switch(es) 'x'.
 * - Replace 'x' with a number representing the ID of the switch to turn off.
 *   - Insert multiple 'x' values to turn off multiple switches upon selling.
 * 
 * ---
 *
 * === JavaScript Notetags: Shop Menu ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Buy and Sell prices.
 *
 * ---
 *
 * <JS Buy Price>
 *  code
 *  code
 *  price = code;
 * </JS Buy Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the buying 'price' of the item.
 * - Insert the final buy price into the 'price' variable.
 * - The 'item' variable refers to the item being bought.
 *
 * ---
 *
 * <JS Sell Price>
 *  code
 *  code
 *  price = code;
 * </JS Sell Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the selling 'price' of the item.
 * - Insert the final sell price into the 'price' variable.
 * - The 'item' variable refers to the item being sold.
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
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Equip Slots
 * - Forcefully change the actor(s) equip slots.
 * - These will persist through class changes.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Equip Slots:
 *   - Insert the equip slots you want the actor(s) to have.
 *   - These entries are case-sensitive.
 *
 * ---
 *
 * Actor: Reset Equip Slots
 * - Reset any forced equip slots for the actor(s).
 * - Equip slots will then be based on class.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Purify Plugin Commands ===
 * 
 * ---
 * 
 * Purify: Target Actor(s)
 * - Purifies target actor(s) of any cursed weapons or armors.
 * - Cannot be used in battle.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 * ---
 * 
 * Purify: Whole Party
 * - Purifies whole party of any cursed weapons or armors.
 * - Cannot be used in battle.
 * 
 * ---
 * 
 * === Shop Plugin Commands ===
 * 
 * ---
 *
 * Shop: Advanced
 * - Make it easier to put together inventories for a shop.
 * - WARNING: Does not allow for event-specific prices.
 *
 *   Step 1: Item ID's
 *   - Select which Item ID ranges to add.
 *
 *   Step 2: Weapon ID's
 *   - Select which Weapon ID ranges to add.
 *
 *   Step 3: Armor ID's
 *   - Select which Armor ID ranges to add.
 *
 *   Step 4: Purchase Only?
 *   - Make the shop purchase-only?
 * 
 *   Optional:
 * 
 *     Blacklist
 *     - A list of categories to blacklist from the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 * 
 *     Whitelist
 *     - A list of categories to whitelist for the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 *
 * This Plugin Command primarily functions as an alternative to the editor's
 * "Shop Processing" event command as that one requires you to add items one at
 * a time, making it extremely tedious to add large amounts of items. This
 * Plugin Command will mitigate that by allowing ID ranges to determine which
 * items to make available.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Menu Settings
 * ============================================================================
 *
 * The Item Menu Settings allow you to adjust specifics on how key objects and
 * windows in the Item Menu Scene operate.
 *
 * ---
 *
 * General Window
 *
 *   Use Updated Layout:
 *   - Use the Updated Item Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *   - If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *
 * ---
 *
 * Item Quantity
 *
 *   Item Max:
 *   Weapon Max:
 *   Armor Max:
 *   - The default maximum quantity for items, weapons, and/or armors.
 * 
 *   Quantity Format:
 *   - How to display an item's quantity.
 *   - %1 - Item Quantity
 *
 *   Font Size:
 *   - Default font size for item quantity.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Item Menu?:
 *   - Show the Shop Status Window in the Item Menu?
 *   - This is enabled if the Updated Layout is on.
 *
 *   Adjust List Window?:
 *   - Automatically adjust the Item List Window in the Item Menu if using the
 *     Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Status Window in the
 *     Item Menu.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Switch Category:
 *   - Button assist text used for switching categories.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Categories
 * ============================================================================
 *
 * Item Categories appear both in the Item Menu Scene and Shop Menu Scene (but
 * only under the Sell command). These Plugin Parameters give you the ability
 * to add in the specific categories you want displayed, remove the ones you
 * don't, and associate them with icons.
 *
 * ---
 *
 * List
 *
 *   Category List
 *   - A list of the item categories displayed in the Item/Shop menus.
 * 
 *     Type:
 *     - A list of the item categories displayed in the Item/Shop menus.
 *     - Replace x with ID numbers or text.
 *     - AllItems, RegularItems, KeyItems
 *     - HiddenItemA, HiddenItemB
 *     - Consumable, Nonconsumable
 *     - AlwaysUsable, BattleUsable, FieldUsable, NeverUsable
 *     - AllWeapons, WType:x
 *     - AllArmors, AType:x, EType:x
 *     - Category:x
 * 
 *     Icon:
 *     - Icon used for this category.
 *     - Use 0 for no icon.
 * 
 *     Visibility Switch:
 *     - This Switch must be turned ON in order for the category to show.
 *     - Use 0 for no Switch requirement.
 * 
 *     Sort By:
 *     - Sort this category (in Scene_Item and Scene_Shop only) this way.
 *
 *   Style:
 *   - How do you wish to draw categorie entries in the Category Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 *
 *   Text Alignment
 *   - Decide how you want the text to be aligned.
 *
 * ---
 *
 * Vocabulary
 *
 *   Hidden Item A
 *   Hidden Item B
 *   Consumable
 *   Nonconsumable
 *   Always Usable
 *   Battle Usable
 *   Field Usable
 *   Never Usable
 *   - How these categories are named in the Item Menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: NEW! Labels
 * ============================================================================
 *
 * Whenever the player receives a new item(s), a NEW! Label can be placed on
 * top of the item's icon when browsing a menu displaying the item(s). This is
 * a quality of life addition from more modern RPG's to help players figure out
 * what they've recently received. The following are Plugin Parameters made to
 * adjust how the NEW! Labels are handled in-game.
 *
 * ---
 *
 * NEW! Labels
 * 
 *   Use NEW! Labels?:
 *   - Use the NEW! Labels or not?
 * 
 *   Icon:
 *   - The icon index used to represent the NEW! text.
 *   - Use 0 to not draw any icons.
 * 
 *   Text:
 *   - The text written on the NEW! Label.
 * 
 *     Font Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     Font Size:
 *     - The font size used for the NEW! text.
 * 
 *   Fade Limit:
 *   - What's the upper opaque limit before reversing?
 * 
 *   Fade Speed:
 *   - What's the fade speed of the NEW! Label?
 * 
 *   Offset X:
 *   - How much to offset the NEW! Label's X position by.
 * 
 *   Offset Y:
 *   - How much to offset the NEW! Label's Y position by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equip Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust the Equipment Menu Scene, ranging from using
 * a more updated and modern layout, changing the styles of other windows, and
 * other key visual aspects of the Equip Menu Scene. Other settings here allow
 * you to adjust how equipment operate under certain rulings, too.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Equip Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 * 
 *     Param Font Size:
 *     - The font size used for parameter values.
 * 
 *     Show Menu Portraits?:
 *     - If Main Menu Core is installed, display the Menu Portraits instead of
 *       the actor's face in the status window?
 * 
 *     JS: Portrait Upper:
 *     - If Menu Portraits are available, this is code used to draw the upper
 *       data like this in the Status Window.
 * 
 *     JS: Face Upper:
 *     - If faces used used, this is code used to draw the upper data like this
 *       in the Status Window.
 * 
 *     JS: Parameter Lower:
 *     - Code to determine how parameters are drawn in the Status Window.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 * 
 *   Status Window Width:
 *   - The usual width of the status window if using the non-Updated Equip
 *     Menu Layout.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *   Cursed Equip Popup:
 *   - Text popup appears when an actor equips a cursed weapon/armor.
 *   - Text codes allowed.
 *   - Requires VisuMZ_0_CoreEngine!
 *   - Empty to not use.
 *   -  %1 - Actor, %2 - Equip, %3 - Icon.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Equip Icon:
 *   - The icon used for the Equip command.
 * 
 *     Help Description:
 *     - Help description used when this command is selected.
 *     - Text codes allowed.
 * 
 *   Add Optimize Command?:
 *   - Add the "Optimize" command to the Command Window?
 * 
 *     Help Description:
 *     - Help description used when this command is selected.
 *     - Text codes allowed.
 * 
 *     Optimize Icon:
 *     - The icon used for the Optimize command.
 * 
 *   Add Clear Command?:
 *   - Add the "Clear" command to the Command Window?
 * 
 *     Help Description:
 *     - Help description used when this command is selected.
 *     - Text codes allowed.
 * 
 *     Clear Icon:
 *     - The icon used for the Clear command.
 *
 * ---
 *
 * Remove Equip
 * 
 *   Icon:
 *   - Icon used for equipment removal.
 * 
 *   Text:
 *   - Text used for equipment removal.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing items?
 *
 * ---
 *
 * Rulings
 * 
 *   Equip-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * 
 *   Non-Removable Types:
 *   - Insert ID's of the Equipment Types that must always have an item
 *     equipped and cannot be empty.
 * 
 *   Non-Optimized Types:
 *   - Insert ID's of the Equipment Types that will be ignored when equipment
 *     is being optimized.
 *
 * ---
 *
 * Button Assist Window
 *
 *   SHIFT: Remove:
 *   - Button assist text used for the SHIFT Remove Shortcut.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you a number of options to adjust the Shop
 * Menu Scene. These options range from enabling an updated and modern layout,
 * adjust how various key visual aspects appear, and determine how prices can
 * be affected when it comes to selling them or buying them (for coders).
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Shop Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 * 
 * Switches:
 * 
 *   Switch: Buy:
 *   - Buying items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 *   Switch: Sell
 *   - Selling items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 * ---
 *
 * Command Window
 * 
 *   Hide Unavailable?:
 *   - Hide all unavailable commands like when a shop is set to Purchase Only?
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Buy Icon:
 *   - The icon used for the Buy command.
 * 
 *   Sell Icon:
 *   - The icon used for the Sell command.
 * 
 *   Cancel Icon:
 *   - The icon used for the Cancel command.
 * 
 *   Rename "Cancel":
 *   - Rename Cancel to something more logical for the Shop Menu Scene.
 *
 * ---
 *
 * Prices
 * 
 *   Sell Price Rate:
 *   - The default sell price rate.
 * 
 *   JS: Buy Price:
 *   - Modificatons made to the buy price before finalizing it.
 * 
 *   JS: Sell Price:
 *   - Modificatons made to the sell price before finalizing it.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Small Increment:
 *   Large Increment:
 *   - Text used for changing amount bought/sold.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Status Window
 * ============================================================================
 *
 * These Plugin Parameters focuses on the Shop Status Window and determines how
 * its data is displayed.
 *
 * ---
 *
 * General
 * 
 *   Window Width:
 *   - The usual width of the status window.
 * 
 *   Parameter Font Size:
 *   - Font size used for parameter changes.
 * 
 *   Translucent Opacity:
 *   - Opacity setting used for translucent window objects.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Equipment Data
 * 
 *   Data Style:
 *   - How do you wish to display equipment data?
 *     - Compare - Compares selected equip to equipped gear
 *       - Lists all main party actors
 *       - Displays the parameter differences when equipped
 *       - Calculates custom JS values
 *     - Classic - Shows basic parameters of selected equip
 *       - Involves no actors, only shows the item's stats
 *       - Shows weapon or armor specific parameters
 *       - Does not show custom JS values as those are calculated per actor
 *       - Does not show custom parameters as those are calculated per actor
 *       - Use <Status Info> and <Custom Status Info> notetags to overwrite or
 *         add custom data to classic equip data
 *     - Double - Shows basic parameters in double columns
 *       - Involves no actors, only shows the item's stats
 *       - Shows weapon or armor specific parameters
 *       - Does not show custom JS values as those are calculated per actor
 *       - Does not show custom parameters as those are calculated per actor
 *       - Use <Status Info> and <Custom Status Info> notetags to overwrite or
 *         add custom data to classic equip data
 * 
 *     Compare Style:
 * 
 *       Already Equipped:
 *       - Marker used to show an actor cannot equip an item.
 * 
 *       Can't Equip:
 *       - Marker used to show an actor cannot equip an item.
 * 
 *       No Changes:
 *       - Marker used to show no changes have occurred.
 * 
 *       JS: Draw Equip Data:
 *       - Code used to draw the equipment data for the Shop Status Window.
 * 
 *     Classic Style:
 * 
 *       Added Weapon Params:
 *       Added Armor Params:
 *       - Display these parameters when a weapon/armor is selected.
 *       - Requires VisuMZ_0_CoreEngine!
 * 
 *       JS: Draw Equip Data:
 *       - Code used to draw the equipment data for the Shop Status Window.
 * 
 *     Double Style:
 * 
 *       Added Weapon Params:
 *       Added Armor Params:
 *       - Display these parameters when a weapon/armor is selected.
 *       - Requires VisuMZ_0_CoreEngine!
 * 
 *       JS: Draw Equip Data:
 *       - Code used to draw the equipment data for the Shop Status Window.
 * 
 *   Delay MS:
 *   - How many milliseconds (MS) to delay the preview update?
 *   - This is to prevent lag spikes for equips only.
 *
 * ---
 *
 * Item Data
 * 
 *   Max State/Buff Icons:
 *   - Maximum number of icons that can be displayed for Add/Remove
 *     States/Buffs.
 * 
 *   Multiplier Standard:
 *   - Constant standard to filter out random values when calculating the
 *     damage multiplier.
 * 
 *   JS: Draw Item Data:
 *   - Code used to draw the item data for the Shop Status Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Consumable:
 *   Occasions:
 *   Scope:
 *   Speed:
 *   Success Rate:
 *   Repeats:
 *   Hit Type:
 *   Element:
 *   Damage Type:
 *   Effects:
 *   - Vocabulary used for these data entries.
 *   - Some of these have Plugin Parameters have sub-entries.
 * 
 *   NOTE: Regarding Damage Labels
 * 
 *   If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * 
 *   Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
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
 * Version 1.57: January 16, 2025
 * * Bug Fixes!
 * ** Fixed an issue where certain icons were not aligning properly at
 *    different line height settings. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added extra clarity for <Status Info> notetag:
 * *** For clarity regarding "Damage Multiplier" and "HP Recovery"/"HP Damage":
 * **** "Damage Multiplier" refers to the amount determined by damage formulas.
 * **** "HP Recovery"/"HP Damage" refers to the "Recover HP" database effect.
 * **** Likewise, the same will apply to "MP Recovery"/"MP Damage" if the
 *      damage formula type is to deal MP recovery/damage instead.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Status Style: type>
 * **** Changes up the way the shop status window displays data for this
 *      database object in particular.
 * *** <Custom Status Parameters: name, name, name>
 * **** Customize which parameters are displayed for this equipment object's
 *      shop status window.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.56: December 19, 2024
 * * Bug Fixes!
 * ** Fixed a bug where newly added equipment would cause crashes upon
 *    interaction. Fix made by Irina.
 * 
 * Version 1.55: November 14, 2024
 * * Bug Fixes!
 * ** Fixed a bug where you can no longer attempt to equip an actor with zero
 *    equip slots and causing a crash. Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated <Status Info>
 * *** Used for: Skill, Item, Weapon, Armor Notetags
 * **** Replace 'key' with one of the following for weapons and armors:
 * ***** 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', or 'LUK'
 * ***** For those with VisuMZ_0_CoreEngine:
 * ****** 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT', 'HRG', 'MRG', 'TRG'
 * ****** 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR', 'MDR', 'FDR', 'EXR'
 * **** Only relevant if the Draw Style for equipment is "classic" or "double".
 * ** Updated <Custom Status Info> notetag:
 * *** Used for: Skill, Item, Weapon, Armor Notetags
 * **** When used with weapon or armor database objects, this information is
 *      only relevant if the Draw Style for equipment is "classic" or "double".
 * * New Feature!
 * ** New Plugin Parameters: 
 * *** Parameters > Shop Status Window > Data Style:
 * **** How do you wish to display equipment data?
 * ***** Compare - Compares selected equip to equipped gear
 * ****** Lists all main party actors
 * ****** Displays the parameter differences when equipped
 * ****** Calculates custom JS values
 * ***** Classic - Shows basic parameters of selected equip
 * ***** Double - Shows basic parameters in double columns
 * ****** Involves no actors, only shows the item's stats
 * ****** Shows weapon or armor specific parameters
 * ****** Does not show custom JS values as those are calculated per actor
 * ****** Does not show custom parameters as those are calculated per actor
 * ****** Use <Status Info> and <Custom Status Info> notetags to overwrite or
 *        add custom data to classic equip data
 * **** Data Style > Classic Style:
 * **** Data Style > Double Style:
 * ***** Added Weapon Params
 * ***** Added Armor Params
 * ****** Display these parameters when a weapon/armor is selected.
 * ****** Requires VisuMZ_0_CoreEngine!
 * 
 * Version 1.54: October 17, 2024
 * * Feature Update!
 * ** If "Modern Controls" is selected while "Remove Equip" and "Optimize" are
 *    gone from the Equip Menu, right click will exit the menu. Feature added
 *    by Arisu.
 * 
 * Version 1.53: July 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added warning to <JS Parameters>:
 * *** If you are trying to calculate a value based off a full parameter value,
 *     such as "ATK = user.atk * 0.10", it's going to break and will cause an
 *     infinite loop. Use base parameter values instead.
 * * New Features!
 * ** New notetags added by Irina:
 * *** <ID Sort Priority: x>
 * **** Used for Scene_Item, Scene_Equip, Scene_Battle, and Scene_Shop's sell
 *      option (only when selling).
 * **** Changes sorting priority by ID for item, weapon, or armor to 'x'. 
 * **** Default priority level is '50'.
 * **** Items, weapons, and armors with higher priority values will be sorted
 *      higher up on the list while lower values will be lower on the list.
 * 
 * Version 1.52: May 16, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Item Categories > Category List > Category > Sorted By:
 * **** You can now sort specific item categories by ID or Name.
 * **** Only usable within Scene_Item and Scene_Shop.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.51: December 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug where if an item is unequipped, it may cause a crash. Fix
 *    made by Arisu.
 * ** Fixed a bug where <Proxy: id> did not properly give the proxy item. Fix
 *    made by Arisu.
 * 
 * Version 1.50: November 16, 2023
 * * Bug Fixes!
 * ** <JS Buy Price> and <JS Sell Price> was not working properly. Fix made
 *    by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Cursed>
 * **** If this weapon or armor is equipped, it cannot manually be removed by
 *      the player until it is purified.
 * **** To remove it, it must be done by event commands, script calls, or
 *     through the Purify-related Plugin Commands provided by this plugin.
 * **** Once purified, the weapon or armor will become unequipped unless it has
 *     a purify transformation.
 * **** If the newly transformed weapon/armor is equippable, it will remain in
 *     the actor's equipment slots.
 * **** If you are using VisuMZ_2_WeaponSwapSystem, weapons cannot become
 *      cursed in order to allow free weapon swapping. Weaponry will not be
 *      cursed if VisuMZ_2_WeaponSwapSystem is installed.
 * *** <Purify Transform: id>
 * *** <Purify Transform: name>
 * **** If this notetag is present on a <Cursed> weapon or armor, then upon the
 *      actor receiving purification, the weapon or armor will transform into a
 *      different item.
 * ** New Plugin Commands added by Arisu:
 * *** Purify: Target Actor(s)
 * **** Purifies target actor(s) of any cursed weapons or armors.
 * *** Purify: Whole Party
 * **** Purifies whole party of any cursed weapons or armors.
 * ** Added "Cursed Equip Popup" to Equip Scene Plugin Parameters.
 * *** Text popup appears when an actor equips a cursed weapon/armor.
 * ** Added "Ally or Enemy" or "Enemy or Ally" scopes to Shop Status Window
 *    Plugin Parameters.
 * *** If unused, will default to "1 Ally" or "1 Enemy" like usual.
 *     Added by Irina.
 * 
 * Version 1.49: October 12, 2023
 * * Bug Fixes!
 * ** Fixed a problem where for weapon types, all weapon types are listed in
 *    the equip menu even when the actor cannot equip them (though they would
 *    be disabled). Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Olivia and sponsored by AndyL:
 * *** <Added EType: x>
 * *** <Added ETypes: x, x, x>
 * **** This is for armors only and does NOT work with weapons!
 * **** Allows a piece of armor to belong to multiple ETypes. This means a
 *      glove can be equipped as "Armgear" or as an "Accessory" if you so
 *      choose.
 * 
 * Version 1.48: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a problem where the help window position of the non-updated layout
 *    would appear in the wrong position. Fix made by Irina.
 * * Optimization Update!
 * ** Plugin should run more optimized when weapons and armors exceed 2000
 *    in database quantity.
 * 
 * Version 1.47: July 13, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause the shop status window to display incorrect
 *    removed buffs and debuffs. Fix made by Olivia.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Changes made to dynamic shop listings in order to update upon listing
 *    changes rather than having to enter and exit the shop again. Update made
 *    by Arisu.
 * * New Features!
 * ** New notetag effects added by Arisu and sponsored by AndyL:
 * *** <Conserve: x%>
 * **** Gives the item a percent chance when used to not consume the item.
 * *** <Buy Turn On Switches: x, x, x>
 * *** <Buy Turn Off Switches: x, x, x>
 * *** <Sell Turn On Switches: x, x, x>
 * *** <Sell Turn Off Switches: x, x, x>
 * **** When buying/selling an item, weapon, or armor with these notetags,
 *      turn on/off switch(es) 'x'.
 * *** New Plugin Parameters added by Arisu:
 * **** Params > Settings > Shop Status Window > Equipment Data > Delay MS:
 * ***** How many milliseconds (MS) to delay the preview update?
 * ***** This is to prevent lag spikes for equips only.
 * 
 * Version 1.46: June 15, 2023
 * * Bug Fixes!
 * ** Fixed a problem where the help and input modes are not adequately
 *    adjusted when not used with the updated layout or without the Options
 *    Core custom UI placement. Fix made by Arisu.
 * 
 * Version 1.45: May 18, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause equip slots to not be recognized properly if
 *    the equip slot name ends in a space.
 * 
 * Version 1.44: April 13, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag effects added by Arisu and sponsored by Anon:
 * *** <Equip For Class Only: x>
 * *** <Equip For Classes Only: x, x, x>
 * *** <Equip For Class Only: name>
 * *** <Equip For Classes Only: name, name, name>
 * **** The piece of equipment can only be worn by the listed classes.
 * *** <Equip Requirements> notetag added.
 * **** Define multiple requirements that the actor needs to meet in order for
 *      this equip item to be equippable.
 * **** See help file for more information on the types of requirements that
 *      can be added.
 * 
 * Version 1.43: March 16, 2023
 * * Bug Fixes!
 * ** Artifact armors should now update and refresh the party members' cache
 *    upon acquisition. Fix made by Olivia.
 * 
 * Version 1.42: February 16, 2023
 * * Bug Fixes!
 * ** Proxy items should no longer cause infinite loops if they're made to
 *    reference other proxy items in a circular fashion. Instead, they just
 *    give the exact first found proxy instead of cycling through others.
 *    Fix made by Arisu.
 * 
 * Version 1.41: December 15, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by Anon:
 * *** Equip Scene > Equip Command > Help Description
 * *** Equip Scene > Optimize Command > Help Description
 * *** Equip Scene > Clear Command > Help Description
 * **** Help description used when these commands are selected.
 * 
 * Version 1.40: October 20, 2022
 * * Feature Update!
 * ** For the shop status window, when comparing equipment of a type where
 *    there are multiple equipment slots (such as accessories), the plugin will
 *    now check for an empty equipment slot first and then make calculations
 *    there. Otherwise, it will use the first available equipment slot of that
 *    type regardless of the equipped item. Update made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.39: September 29, 2022:
 * * Feature Update!
 * ** Changed the default code for the equip scene's status window display to
 *    prevent the face graphic and basic actor stats from going above the
 *    window boundaries if there are too many parameters displayed in the
 *    status window at a time.
 * ** If you already have this plugin installed the changes will not be
 *    reflected unless you do the following:
 * **** BACKUP your game project.
 * **** REMOVE this plugin from the Plugin Manager list.
 * **** REINSTALL this plugin into the Plugin Manager list.
 * **** SAVE the game project.
 * 
 * Version 1.38: March 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New mechanics and notetags added by Olivia and sponsored by Anon:
 * *** <Party Artifact>
 * *** <Troop Artifact>
 * *** <Stackable Party Artifact>
 * *** <Stackable Troop Artifact>
 * **** Armors only! This armor cannot be equipped at all. However, by simply
 *      being in the party's inventory, its parameter bonuses and traits will
 *      be applied globally throughout the whole party or troop (depending on
 *      the notetag). Add both notetags to affect both groups.
 * **** The normal versions of the notetag is only applied once regardless of
 *      the number of copies are found in the party's inventory.
 * **** The stackable versions of the notetag will have the bonuses and traits
 *      stacked multiple times relative to the number of copies found in the
 *      party's inventory.
 * **** This item will NOT be added during the setup phase for Battle Tests.
 * ***** If you want to add the item, do it manually.
 * 
 * Version 1.37: December 23, 2021
 * * Compatibility Update
 * ** Created foundation for proxy items to be used in any applicable system
 *    and extension plugins. Update made by Arisu.
 * 
 * Version 1.36: December 2, 2021
 * * Feature Update!
 * ** For those using custom parameters from the Core Engine and do not have
 *    the parameters all-capitalized, the plugin will automatically do it for
 *    you to prevent errors. Update made by Olivia.
 * 
 * Version 1.35: November 18, 2021
 * * Compatibility Update!
 * ** If this plugin's updated scene is disabled, the Help Window locations for
 *    the Item, Equip, and Shop Scenes should now be at their designated
 *    locations as calculated by the VisuMZ Core Engine instead of the RMMZ
 *    default location. Update made by Irina.
 * 
 * Version 1.34: October 28, 2021
 * * Feature Update
 * ** Added fail safe checks for projects that are using old data for starting
 *    equipment that no longer exist, thus preventing the game from opening.
 *    Update made by Arisu.
 * 
 * Version 1.33: August 6, 2021
 * * Documentation Update!
 * ** Removed "Weapon" and "Armor" from "Used For" for <Status Info>. This was
 *    an unintended piece of documentation.
 * 
 * Version 1.32: July 23, 2021
 * * Bug Fixes!
 * ** Fixed a bug that would cause armor duplication when changing to classes
 *    with unaligned equipment slot types. Fix made by Arisu.
 * 
 * Version 1.31: July 9, 2021
 * * Feature Update!
 * ** Added a failsafe for price manipulation JavaScript to never have prices
 *    drop below 0 if possible. Update made by Arisu.
 * 
 * Version 1.30: July 2, 2021
 * * Documentation Update!
 * ** Added an extra note to the help file for the following:
 *    Plugin Parameters > Item Menu Settings > List Window > Columns
 * *** If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *    
 * 
 * Version 1.29: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Feature Update!
 * ** Phantom data when changing equipment types in the database should no
 *    longer affect actors with cached equip ID's. Update made by Arisu.
 * 
 * Version 1.28: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.27: May 21, 2021
 * * Bug Fixes!
 * ** Using the mouse right click in the Equip Scene while inside of the item
 *    to slot window will no longer exit the Equip Scene. Fix made by Yanfly.
 * 
 * Version 1.26: April 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** "VisuStella MZ Compatibility" added VisuMZ_1_BattleCore section regarding
 *    Damage Multiplier and Healing Multiplier vocabulary settings to reduce
 *    commonly asked questions.
 * * New Features!
 * ** New notetags added by Irina and sponsored by Archeia:
 * *** <Shop Picture Name: filename>
 * *** <Shop Picture Layer: x>
 * *** <Shop Picture Max Width: x>
 * *** <Shop Picture Max Height: y>
 * *** <Shop Picture Max Dimensions: x, y>
 * *** <Shop Picture Alignment: x>
 * *** <Shop Picture Position: y>
 * *** <Shop Picture Offset X: +x>
 * *** <Shop Picture Offset X: -x>
 * *** <Shop Picture Offset Y: +y>
 * *** <Shop Picture Offset Y: -y>
 * *** <Shop Picture Offset: +x, +y>
 * *** <Shop Picture Offset: -x, -y>
 * *** <Shop Picture Opacity: x>
 * *** <Shop Picture Opacity: x%>
 * **** Add images from the game project's img/pictures/ folder to display in
 *      the Shop Status Window.
 * 
 * Version 1.25: April 23, 2021
 * * Documentation Update!
 * ** Added clarity to the <param: +x> and <param: -x> notetags:
 * *** These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * 
 * Version 1.24: April 16, 2021
 * * Bug Fixes!
 * ** Changing an actor's equipment slots to past their original amount will no
 *    longer yield errors with duplicate slot types. Fix made by Arisu.
 * ** Completely selling an item should now refresh the help window to the new
 *    selected item's help description. Fix made by Arisu.
 * * Optimization Update!
 * ** Non-removable equipment restrictions for the equipment scene are now
 *    better optimized. Update made by Olivia.
 * 
 * Version 1.23: April 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_4_BreakShields plugin.
 * 
 * Version 1.21: March 5, 2021
 * * Feature Update!
 * ** Custom equipment slots are disabled during Battle Testing for better
 *    accuracy and results.
 * 
 * Version 1.20: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Buy
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Sell
 * **** Buying/selling items in the Shop Scene turns this Switch to ON.
 * **** Switch reverts to OFF whenever the Shop Scene opens.
 * **** These switches can be used after a "Shop Processing" event command to
 *      determine if the player has bought an item, bought and sold an item,
 *      sold an item, or neither.
 * 
 * Version 1.19: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Irina.
 * *** <Equip Copy Limit: x>
 * **** Sets a maximum number of copies that the actor can wear of this
 *      equipment. Usage Example: Actors can only equip one copy of the
 *      "One-of-a-Kind Ring" on at any time despite having empty accessory
 *      slots because the ring has a <Equip Copy Limit: 1> notetag.
 * *** <Equip Weapon Type Limit: x>
 * **** This weapon cannot be equipped with other weapons of the same type once
 *      the limited amount has been reached. Usage Example: A dualwielding
 *      warrior who can only equip one sword and a dagger but never two swords
 *      or two daggers because the swords and daggers all have the
 *      <Equip Weapon Type Limit: 1> notetags on them.
 * *** <Equip Armor Type Limit: x>
 * **** This armor cannot be equipped with other armors of the same type once
 *      the limited amount has been reached. Usage Example: People cannot equip
 *      more than two glove accessories on at a time because the glove is a
 *      "Glove" armor-type and each glove item has the
 *      <Equip Armor Type Limit: 2> notetags on them.
 * 
 * Version 1.18: January 15, 2021
 * * Bug Fixes!
 * ** Pressing "Shift" to remove equipment will now refresh the status window
 *    unlike before. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Item Menu Settings > Background Type
 * 
 * Version 1.17: January 1, 2021
 * * Bug Fixes!
 * ** Equipping should be working properly again. Fix made by Yanfly.
 * 
 * Version 1.16: December 25, 2020
 * * Bug Fixes!
 * ** Equip-Adjust HP/MP should work properly now. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that if the VisuStella
 *    Battle Core is installed, then all battle scope items are visible, but
 *    not necessarily enabled if they are disabled otherwise.
 * 
 * Version 1.15: December 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that it removes the
 *    usable item from visibility as well if the actor unable to use it is the
 *    only person in the party.
 * 
 * Version 1.14: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.13: December 4, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Actor: Change Equip Slots
 * *** Actor: Reset Equip Slots
 * **** These plugin commands allow you to forcefully change the equip slots
 *      available to an actor regardless of the slots provided by its class as
 *      well as reset them.
 * 
 * Version 1.12: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 8, 2020
 * * Bug Fix!
 * ** Font size ratio for the shop status window now scales to a hard coded
 *    value to prevent smaller font sizes from expanding icon sizes. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Currency display in the shop menu is now reflected upon how the plugin
 *    parameters set them to display. Update made by Arisu.
 * 
 * Version 1.10: November 1, 2020
 * * Feature Update!
 * ** Modern Controls compatibility with Core Engine no longer enables the
 *    Item Categories window and child classes to utilize the Home/End keys.
 * 
 * Version 1.09: October 25, 2020
 * * Bug Fixes!
 * ** "All Items" category should now display the "Items" text. Fix by Irina.
 * ** WType, AType, and EType categories now work with text. Fix by Irina.
 *
 * Version 1.08: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: October 11, 2020
 * * Bug Fixes!
 * ** XParams and SParams in the Window_EquipStatus window will no longer show
 *    a non-percentile difference if the original value is not a whole value.
 *    Fix made by Yanfly.
 * 
 * Version 1.06: October 4, 2020
 * * Bug Fixes!
 * ** Select Item event command now displays the default amount of columns
 *    instead of whatever setting is made with the plugin parameters.
 * 
 * Version 1.05: September 27, 2020
 * * Bug Fixes!
 * ** When using the updated shop layout, leaving the sell option will no
 *    longer cause the dummy window to appear.
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Pressing Shift to quickly remove equipment should no longer crash the
 *    game. This will also clear the help window text. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** If both Optimize and Clear commands have been removed and using modern
 *    controls, pressing up at the top of the slot window list will not go to
 *    the window. Fix made by Yanfly.
 * ** If both Optimize and Clear commands have been removed, the window will no
 *    longer appear and the slot window will be moved upward to fill any empty
 *    spaces. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added in NEW! Label to let you adjust the font face.
 * ** New Plugin Parameters added in Equip Menu Scene Settings for disabling
 *    the back rectangles and/or changing their colors.
 * ** New Plugin Parameters added in Shop Status Window Settings for disabling
 *    the back rectangles and/or changing their colors.
 * 
 * Version 1.02: August 30, 2020
 * * Documentation Fix!
 * ** Added: NOTE: Regarding Damage Labels
 * *** If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * *** Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 * *** Documentation update added by Yanfly.
 * 
 * Version 1.01: August 23, 2020
 * * Added failsafe to prevent non-existent equipment (because the database
 *   entries have been deleted) from being equipped as initial equipment.
 *   Fix made by Olivia.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeEquipSlots
 * @text Actor: Change Equip Slots
 * @desc Forcefully change the actor(s) equip slots.
 * These will persist through class changes.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 * 
 * @arg Slots:arraystr
 * @text Equip Slots
 * @type string[]
 * @desc Insert the equip slots you want the actor(s) to have.
 * These entries are case-sensitive.
 * @default ["Weapon","Shield","Head","Body","Accessory"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorResetEquipSlots
 * @text Actor: Reset Equip Slots
 * @desc Reset any forced equip slots for the actor(s).
 * Equip slots will then be based on class.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Purify
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PurifyActors
 * @text Purify: Target Actor(s)
 * @desc Purifies target actor(s) of any cursed weapons or armors.
 * Cannot be used in battle.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PurifyParty
 * @text Purify: Whole Party
 * @desc Purifies whole party of any cursed weapons or armors.
 * Cannot be used in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Shop
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BatchShop
 * @text Shop: Advanced
 * @desc Make it easier to put together inventories for a shop.
 * WARNING: Does not allow for event-specific prices.
 *
 * @arg Step1
 * @text Step 1: Item ID's
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type item
 * @desc Select which Item ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type item
 * @desc Select which Item ID to end at.
 * @default 4
 *
 * @arg Step2
 * @text Step 2: Weapon ID's
 *
 * @arg Step2Start:num
 * @text Range Start
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to start from.
 * @default 1
 *
 * @arg Step2End:num
 * @text Range End
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to end at.
 * @default 4
 *
 * @arg Step3
 * @text Step 3: Armor ID's
 *
 * @arg Step3Start:num
 * @text Range Start
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to start from.
 * @default 1
 *
 * @arg Step3End:num
 * @text Range End
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to end at.
 * @default 4
 *
 * @arg PurchaseOnly:eval
 * @text Step 4: Purchase Only?
 * @type boolean
 * @on Purchase-Only
 * @off Sell Accessible
 * @desc Make the shop purchase-only?
 * @default false
 * 
 * @arg Optional
 * 
 * @arg Blacklist:arraystr
 * @text Blacklisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to blacklist from the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 * 
 * @arg Whitelist:arraystr
 * @text Whitelisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to whitelist for the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
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
 * @param ItemsEquipsCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemScene:struct
 * @text Item Menu Settings
 * @type struct<ItemScene>
 * @desc Change the Item Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","ListWindow":"","ListWindowCols:num":"1","ItemQt":"","MaxItems:num":"99","MaxWeapons:num":"99","MaxArmors:num":"99","ItemQuantityFmt:str":"×%1","ItemQuantityFontSize:num":"22","ShopStatusWindow":"","ShowShopStatus:eval":"true","ItemSceneAdjustItemList:eval":"true","ItemMenuStatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._itemWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._itemWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","ButtonAssist":"","buttonAssistCategory:str":"Switch Category"}
 *
 * @param Categories:struct
 * @text Item Categories
 * @parent ItemScene:struct
 * @type struct<Categories>
 * @desc Change the categories displayed in the Item/Shop menus.
 * @default {"MainList":"","List:arraystruct":"[\"{\\\"Type:str\\\":\\\"FieldUsable\\\",\\\"Icon:num\\\":\\\"208\\\"}\",\"{\\\"Type:str\\\":\\\"BattleUsable\\\",\\\"Icon:num\\\":\\\"218\\\"}\",\"{\\\"Type:str\\\":\\\"NeverUsable\\\",\\\"Icon:num\\\":\\\"302\\\"}\",\"{\\\"Type:str\\\":\\\"AllWeapons\\\",\\\"Icon:num\\\":\\\"97\\\"}\",\"{\\\"Type:str\\\":\\\"EType:2\\\",\\\"Icon:num\\\":\\\"128\\\"}\",\"{\\\"Type:str\\\":\\\"EType:3\\\",\\\"Icon:num\\\":\\\"131\\\"}\",\"{\\\"Type:str\\\":\\\"EType:4\\\",\\\"Icon:num\\\":\\\"137\\\"}\",\"{\\\"Type:str\\\":\\\"EType:5\\\",\\\"Icon:num\\\":\\\"145\\\"}\",\"{\\\"Type:str\\\":\\\"KeyItems\\\",\\\"Icon:num\\\":\\\"195\\\"}\"]","Style:str":"icon","TextAlign:str":"center","Vocabulary":"","HiddenItemA:str":"Special Items","HiddenItemB:str":"Unique Items","Consumable:str":"Consumable","Nonconsumable:str":"Nonconsumable","AlwaysUsable:str":"Usable","BattleUsable:str":"Battle","FieldUsable:str":"Field","NeverUsable:str":"Materials"}
 *
 * @param New:struct
 * @text NEW! Labels
 * @parent ItemScene:struct
 * @type struct<NewLabel>
 * @desc Change how NEW! Labels apply to your game project.
 * @default {"Enable:eval":"true","Icon:num":"0","Text:str":"NEW!","FontColor:str":"17","FontFace:str":"Verdana","FontSize:str":"16","FadeLimit:num":"360","FadeSpeed:num":"4","OffsetX:num":"0","OffsetY:num":"4"}
 *
 * @param EquipScene:struct
 * @text Equip Menu Settings
 * @type struct<EquipScene>
 * @desc Adjust the settings regarding the Equip Menu Scene.
 * @default {"General":"","EnableLayout:eval":"true","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth - 128 - padding;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.max(0, Math.floor((limitHeight - ImageManager.faceHeight) / 2));\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.max(0, Math.floor((limitHeight - dataHeight) / 2));\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","LayoutStyle:str":"upper/right","StatusWindowWidth:num":"312","DrawBackRect:eval":"true","BackRectColor:str":"19","CursedTextPopup:json":"\"%1 is cursed by %3%2!\"","Command":"","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconEquip:num":"136","equipCmdDesc:json":"\"Pick and choose equipment to change.\"","CommandAddOptimize:eval":"true","optimizeCmdDesc:json":"\"Equip the strongest available equipment.\"","CmdIconOptimize:num":"137","CommandAddClear:eval":"true","clearCmdDesc:json":"\"Remove all available equipment.\"","CmdIconClear:num":"135","RemoveEquip":"","RemoveEquipIcon:num":"16","RemoveEquipText:str":"Remove","ShiftShortcutKey:eval":"true","Rulings":"","EquipAdjustHpMp:eval":"true","NonRemoveETypes:arraynum":"[]","NonOptimizeETypes:arraynum":"[]","ButtonAssist":"","buttonAssistRemove:str":"Unequip"}
 *
 * @param ShopScene:struct
 * @text Shop Menu Settings
 * @type struct<ShopScene>
 * @desc Change the Shop Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","Command":"","CmdHideDisabled:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconBuy:num":"208","CmdIconSell:num":"314","CmdIconCancel:num":"82","CmdCancelRename:str":"Exit","Prices":"","SellPriceRate:num":"0.50","BuyPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","SellPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","ButtonAssist":"","buttonAssistSmallIncrement:str":"-1/+1","buttonAssistLargeIncrement:str":"-10/+10"}
 *
 * @param StatusWindow:struct
 * @text Shop Status Window
 * @parent ShopScene:struct
 * @type struct<StatusWindow>
 * @desc Change the Item Status Window settings.
 * @default {"General":"","Width:num":"352","ParamChangeFontSize:num":"22","Translucent:num":"64","DrawBackRect:eval":"true","BackRectColor:str":"19","EquipData":"","EquipDataStyle:str":"compare","EquipDataCompare":"","AlreadyEquipMarker:str":"E","CannotEquipMarker:str":"-","NoChangeMarker:str":"-","DrawEquipData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nconst paramheight = this.gaugeLineHeight() + 8;\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Parameter Names\\nconst params = this.actorParams();\\nconst backY = y;\\ny = height - (params.length * paramheight) - 4;\\nlet paramX = x;\\nlet paramWidth = 0;\\nlet tableY = y;\\nfor (const paramId of params) {\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\n    y += paramheight;\\n}\\n\\n// Draw Actor Data\\nconst actorMax = $gameParty.maxBattleMembers();\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\nparamWidth = width - (actorWidth * actorMax);\\nfor (const actor of $gameParty.battleMembers()) {\\n    const index = $gameParty.battleMembers().indexOf(actor);\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\n    this.changePaintOpacity(actor.canEquip(this._item));\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\n    let actorY = tableY;\\n\\n    // Draw Parameter Changes\\n    for (const paramId of params) {\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\n        actorY += paramheight;\\n    }\\n}\\n\\n// Draw Back Rectangles\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\nfor (let i = 0; i < actorMax; i++) {\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\n}\\nfor (const paramId of params) {\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\n    for (let i = 0; i < actorMax; i++) {\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\n    }\\n    tableY += paramheight;\\n}\"","EquipDataClassic":"","ClassicWeaponParameters:arraystr":"[\"HIT\"]","ClassicArmorParameters:arraystr":"[\"EVA\"]","DrawEquipClassicData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Item Weapon Type or Armor Type\\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\\n\\n// Draw Parameter Values\\nconst params = this.actorParams();\\nfor (const paramId of params) {\\n    if (this.isCustomParameter(paramId)) continue;\\n    this.drawActorParamClassic(paramId, x, y, width);\\n    y += lineHeight;\\n}\\n\\n// Draw Custom Entries\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","EquipDataDouble":"","DoubleWeaponParameters:arraystr":"[\"HIT\",\"CNT\"]","DoubleArmorParameters:arraystr":"[\"EVA\",\"GRD\"]","DrawEquipDoubleData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Item Weapon Type or Armor Type\\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\\n\\n// Draw Parameter Values\\nconst params = this.actorParams();\\nfor (const paramId of params) {\\n    if (this.isCustomParameter(paramId)) continue;\\n    this.drawActorParamClassic(paramId, x, y, hw);\\n    if (x === hw) {\\n        y += lineHeight;\\n        x = 0;\\n    } else {\\n        x = hw;\\n    }\\n}\\n// Realign\\nif (x === hw) {\\n    this.drawItemDarkRect(hw, y, hw, lineHeight);\\n    y += lineHeight;\\n    x = 0;\\n}\\n\\n// Draw Custom Entries\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","EquipDelayMS:num":"240","ItemData":"","ItemGeneral":"","MaxIcons:num":"8","MultiplierStandard:num":"1000000","DrawItemData:func":"\"const lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\n\\n// Draw Main Item Properties\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\nif (this._item.occasion < 3) {\\n    y = this.drawItemDamage(x, y, width);\\n    y = this.drawItemEffects(x, y, width);\\n}\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Draw Remaining Item Properties\\nif (this._item.occasion < 3) {\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\n}\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","Vocabulary":"","LabelConsume:str":"Consumable","Consumable:str":"✔","NotConsumable:str":"✘","Occasions":"","Occasion0:str":"Anytime Use","Occasion1:str":"Battle-Only","Occasion2:str":"Field-Only","Occasion3:str":"-","Scope":"","Scope0:str":"No Target","Scope1:str":"1 Foe","Scope2:str":"All Foes","Scope3:str":"Random Foe","Scope4:str":"2 Random Foes","Scope5:str":"3 Random Foes","Scope6:str":"4 Random Foes","Scope7:str":"1 Ally","Scope8:str":"Alive Allies","Scope9:str":"Dead Ally","Scope10:str":"Dead Allies","Scope11:str":"User","Scope12:str":"Any Ally","Scope13:str":"All Allies","Scope14:str":"Everybody","BattleCore":"","ScopeRandomAny:str":"%1 Random Units","ScopeRandomEnemies:str":"%1 Random Foes","ScopeRandomAllies:str":"%1 Random Allies","ScopeAlliesButUser:str":"Other Allies","ScopeAllyOrEnemy:str":"Ally/Enemy","ScopeEnemyOrAlly:str":"Enemy/Ally","LabelSpeed:str":"Speed","Speed2000:str":"Fastest","Speed1000:str":"Faster","Speed1:str":"Fast","Speed0:str":"Normal","SpeedNeg999:str":"Slow","SpeedNeg1999:str":"Slower","SpeedNeg2000:str":"Slowest","LabelSuccessRate:str":"Accuracy","LabelRepeats:str":"Hits","LabelHitType:str":"Type","HitType0:str":"Neutral","HitType1:str":"Physical","HitType2:str":"Magical","LabelElement:str":"Element","ElementWeapon:str":"\\I[97]Weapon","ElementNone:str":"\\I[160]No Element","DamageType":"","DamageType1:str":"%1 Damage Multiplier","DamageType2:str":"%1 Damage Multiplier","DamageType3:str":"%1 Recovery Multiplier","DamageType4:str":"%1 Recovery Multiplier","DamageType5:str":"%1 Drain Multiplier","DamageType6:str":"%1 Drain Multiplier","Effects":"","LabelRecoverHP:str":"%1 Recovery","LabelRecoverMP:str":"%1 Recovery","LabelRecoverTP:str":"%1 Recovery","LabelSelfGainTP:str":"User %1","LabelDamageHP:str":"%1 Damage","LabelDamageMP:str":"%1 Damage","LabelDamageTP:str":"%1 Damage","LabelApply:str":"Applies","LabelRemove:str":"Removes","EquipType":"","WeaponType:str":"Weapon Type","ArmorType:str":"Armor Type","NoEquipTypeResult:str":"-"}
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
 * Item Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Item Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ItemQt
 * @text Item Quantity
 *
 * @param MaxItems:num
 * @text Item Max
 * @parent ItemQt
 * @desc The default maximum quantity for items.
 * @default 99
 *
 * @param MaxWeapons:num
 * @text Weapon Max
 * @parent ItemQt
 * @desc The default maximum quantity for weapons.
 * @default 99
 *
 * @param MaxArmors:num
 * @text Armor Max
 * @parent ItemQt
 * @desc The default maximum quantity for armors.
 * @default 99
 *
 * @param ItemQuantityFmt:str
 * @text Quantity Format
 * @parent ItemQt
 * @desc How to display an item's quantity.
 * %1 - Item Quantity
 * @default ×%1
 *
 * @param ItemQuantityFontSize:num
 * @text Font Size
 * @parent ItemQt
 * @desc Default font size for item quantity.
 * @default 22
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Item Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Item Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param ItemSceneAdjustItemList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Item List Window in the Item Menu if using the Shop Status Window?
 * @default true
 *
 * @param ItemMenuStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Status Window in the Item Menu.
 * @default "const width = this.statusWidth();\nconst height = this._itemWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._itemWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistCategory:str
 * @text Switch Category
 * @parent ButtonAssist
 * @desc Button assist text used for switching categories.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Switch Category
 *
 */
/* ----------------------------------------------------------------------------
 * Item Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~Categories:
 *
 * @param MainList
 * @text List
 * 
 * @param List:arraystruct
 * @text Category List
 * @parent MainList
 * @type struct<Category>[]
 * @desc A list of the item categories displayed in the Item/Shop menus.
 * @default ["{\"Type:str\":\"RegularItems\",\"Icon:num\":\"208\"}","{\"Type:str\":\"AllWeapons\",\"Icon:num\":\"97\"}","{\"Type:str\":\"AllArmors\",\"Icon:num\":\"137\"}","{\"Type:str\":\"KeyItems\",\"Icon:num\":\"195\"}"]
 *
 * @param Style:str
 * @text Category Style
 * @parent MainList
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw categorie entries in the Category Window?
 * @default icon
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @parent MainList
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Vocabulary
 *
 * @param HiddenItemA:str
 * @text Hidden Item A
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Special Items
 *
 * @param HiddenItemB:str
 * @text Hidden Item B
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Unique Items
 *
 * @param Consumable:str
 * @text Consumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Consumable
 *
 * @param Nonconsumable:str
 * @text Nonconsumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Nonconsumable
 *
 * @param AlwaysUsable:str
 * @text Always Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Usable
 *
 * @param BattleUsable:str
 * @text Battle Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Battle
 *
 * @param FieldUsable:str
 * @text Field Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Field
 *
 * @param NeverUsable:str
 * @text Never Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Materials
 *
 */
/* ----------------------------------------------------------------------------
 * Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param Type:str
 * @text Type
 * @type combo
 * @option AllItems
 * @option 
 * @option RegularItems
 * @option KeyItems
 * @option HiddenItemA
 * @option HiddenItemB
 * @option 
 * @option Consumable
 * @option Nonconsumable
 * @option 
 * @option AlwaysUsable
 * @option BattleUsable
 * @option FieldUsable
 * @option NeverUsable
 * @option 
 * @option AllWeapons
 * @option WType:x
 * @option 
 * @option AllArmors
 * @option AType:x
 * @option 
 * @option EType:x
 * @option 
 * @option Category:x
 * @option
 * @desc A list of the item categories displayed in the Item/Shop
 * menus. Replace x with ID numbers or text.
 * @default RegularItems
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 * @param SwitchID:num
 * @text Visibility Switch
 * @type switch
 * @desc This Switch must be turned ON in order for the category to show.
 * Use 0 for no Switch requirement.
 * @default 0
 *
 * @param SortBy:str
 * @text Sorted By
 * @type select
 * @option ID
 * @option Name
 * @desc Sort this category (in Scene_Item and Scene_Shop only) this way.
 * @default ID
 *
 */
/* ----------------------------------------------------------------------------
 * New Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NewLabel:
 *
 * @param Enable:eval
 * @text Use NEW! Labels?
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the NEW! Labels or not?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @desc The icon index used to represent the NEW! text.
 * Use 0 to not draw any icons.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc The text written on the NEW! Label.
 * @default NEW!
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param FontFace:str
 * @text Font Face
 * @parent Text:str
 * @desc Font face used for the NEW! Label.
 * @default Verdana
 *
 * @param FontSize:str
 * @text Font Size
 * @parent Text:str
 * @desc The font size used for the NEW! text.
 * @default 16
 *
 * @param FadeLimit:num
 * @text Fade Limit
 * @desc What's the upper opaque limit before reversing?
 * @default 360
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @desc What's the fade speed of the NEW! Label?
 * @default 4
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the NEW! Label's X position by.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the NEW! Label's Y position by.
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Equip Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/right
 *
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent EnableLayout:eval
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent EnableLayout:eval
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth - 128 - padding;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.max(0, Math.floor((limitHeight - ImageManager.faceHeight) / 2));\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.max(0, Math.floor((limitHeight - dataHeight) / 2));\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent EnableLayout:eval
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}"
 *
 * @param StatusWindowWidth:num
 * @text Status Window Width
 * @parent General
 * @desc The usual width of the status window if using the 
 * non-Updated Equip Menu Layout.
 * @default 312
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param CursedTextPopup:json
 * @text Cursed Equip Popup
 * @parent General
 * @type note
 * @desc %1 - Actor, %2 - Equip, %3 - Icon. Text codes allowed.
 * Requires VisuMZ_0_CoreEngine! Empty to not use.
 * @default "%1 is cursed by %3%2!"
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconEquip:num
 * @text Equip Icon
 * @parent Command
 * @desc The icon used for the Equip command.
 * @default 136
 *
 * @param equipCmdDesc:json
 * @text Help Description
 * @parent CmdIconEquip:num
 * @type note
 * @desc Help description used when this command is selected.
 * Text codes allowed.
 * @default "Pick and choose equipment to change."
 *
 * @param CommandAddOptimize:eval
 * @text Add Optimize Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Optimize" command to the Command Window?
 * @default true
 *
 * @param optimizeCmdDesc:json
 * @text Help Description
 * @parent CommandAddOptimize:eval
 * @type note
 * @desc Help description used when this command is selected.
 * Text codes allowed.
 * @default "Equip the strongest available equipment."
 *
 * @param CmdIconOptimize:num
 * @text Optimize Icon
 * @parent CommandAddOptimize:eval
 * @desc The icon used for the Optimize command.
 * @default 137
 *
 * @param CommandAddClear:eval
 * @text Add Clear Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Clear" command to the Command Window?
 * @default true
 *
 * @param clearCmdDesc:json
 * @text Help Description
 * @parent CommandAddClear:eval
 * @type note
 * @desc Help description used when this command is selected.
 * Text codes allowed.
 * @default "Remove all available equipment."
 *
 * @param CmdIconClear:num
 * @text Clear Icon
 * @parent CommandAddClear:eval
 * @desc The icon used for the Clear command.
 * @default 135
 *
 * @param RemoveEquip
 * @text Remove Equip
 *
 * @param RemoveEquipIcon:num
 * @text Icon
 * @parent RemoveEquip
 * @desc Icon used for equipment removal.
 * @default 16
 *
 * @param RemoveEquipText:str
 * @text Text
 * @parent RemoveEquip
 * @desc Text used for equipment removal.
 * @default Remove
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent RemoveEquip
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing items?
 * @default true

 * @param Rulings
 *
 * @param EquipAdjustHpMp:eval
 * @text Equip-Adjust HP/MP
 * @parent Rulings
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * @default true
 * 
 * @param NonRemoveETypes:arraynum
 * @text Non-Removable Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that must always have
 * an item equipped and cannot be empty.
 * @default []
 *
 * @param NonOptimizeETypes:arraynum
 * @text Non-Optimized Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that will be ignored
 * when equipment is being optimized.
 * @default []
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistRemove:str
 * @text SHIFT: Remove
 * @parent ButtonAssist
 * @desc Button assist text used for the SHIFT Remove Shortcut.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Unequip
 * 
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Shop Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param Switches
 *
 * @param SwitchBuy:num
 * @text Switch: Buy
 * @parent Switches
 * @type switch
 * @desc Buying items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param SwitchSell:num
 * @text Switch: Sell
 * @parent Switches
 * @type switch
 * @desc Selling items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdHideDisabled:eval
 * @text Hide Unavailable?
 * @parent Command
 * @type boolean
 * @on Hide
 * @off Default
 * @desc Hide all unavailable commands like when a shop is set to Purchase Only?
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconBuy:num
 * @text Buy Icon
 * @parent Command
 * @desc The icon used for the Buy command.
 * @default 208
 *
 * @param CmdIconSell:num
 * @text Sell Icon
 * @parent Command
 * @desc The icon used for the Sell command.
 * @default 314
 *
 * @param CmdIconCancel:num
 * @text Cancel Icon
 * @parent Command
 * @desc The icon used for the Cancel command.
 * @default 82
 *
 * @param CmdCancelRename:str
 * @text Rename "Cancel"
 * @parent Command
 * @desc Rename Cancel to something more logical for the Shop Menu Scene.
 * @default Exit
 *
 * @param Prices
 *
 * @param SellPriceRate:num
 * @text Sell Price Rate
 * @parent Prices
 * @desc The default sell price rate.
 * @default 0.50
 *
 * @param BuyPriceJS:func
 * @text JS: Buy Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the buy price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 *
 * @param SellPriceJS:func
 * @text JS: Sell Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the sell price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 * 
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistSmallIncrement:str
 * @text Small Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -1/+1
 *
 * @param buttonAssistLargeIncrement:str
 * @text Large Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -10/+10
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Status Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusWindow:
 *
 * @param General
 *
 * @param Width:num
 * @text Window Width
 * @parent General
 * @desc The usual width of the status window.
 * @default 352
 *
 * @param ParamChangeFontSize:num
 * @text Parameter Font Size
 * @parent General
 * @desc Font size used for parameter changes.
 * @default 22
 *
 * @param Translucent:num
 * @text Translucent Opacity
 * @parent General
 * @desc Opacity setting used for translucent window objects.
 * @default 64
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EquipData
 * @text Equipment Data
 * 
 * @param EquipDataStyle:str
 * @text Data Style
 * @parent EquipData
 * @type select
 * @option Compare - Compares selected equip to equipped gear
 * @value compare
 * @option Classic - Shows basic parameters of selected equip
 * @value classic
 * @option Double - Shows basic parameters in double columns
 * @value double
 * @desc How do you wish to display equipment data?
 * @default compare
 *
 * @param EquipDataCompare
 * @text Compare Style
 * @parent EquipDataStyle:str
 *
 * @param AlreadyEquipMarker:str
 * @text Already Equipped
 * @parent EquipDataCompare
 * @desc Marker used to show an actor cannot equip an item.
 * @default E
 *
 * @param CannotEquipMarker:str
 * @text Can't Equip
 * @parent EquipDataCompare
 * @desc Marker used to show an actor cannot equip an item.
 * @default -
 *
 * @param NoChangeMarker:str
 * @text No Changes
 * @parent EquipDataCompare
 * @desc Marker used to show no changes have occurred.
 * @default -
 *
 * @param DrawEquipData:func
 * @text JS: Draw Equip Data
 * @parent EquipDataCompare
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nconst paramheight = this.gaugeLineHeight() + 8;\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Parameter Names\nconst params = this.actorParams();\nconst backY = y;\ny = height - (params.length * paramheight) - 4;\nlet paramX = x;\nlet paramWidth = 0;\nlet tableY = y;\nfor (const paramId of params) {\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\n    y += paramheight;\n}\n\n// Draw Actor Data\nconst actorMax = $gameParty.maxBattleMembers();\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\nparamWidth = width - (actorWidth * actorMax);\nfor (const actor of $gameParty.battleMembers()) {\n    const index = $gameParty.battleMembers().indexOf(actor);\n    const actorX = paramX + paramWidth + (index * actorWidth);\n    this.changePaintOpacity(actor.canEquip(this._item));\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\n    let actorY = tableY;\n\n    // Draw Parameter Changes\n    for (const paramId of params) {\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\n        actorY += paramheight;\n    }\n}\n\n// Draw Back Rectangles\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\nfor (let i = 0; i < actorMax; i++) {\n    const actorX = paramX + paramWidth + (i * actorWidth);\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\n}\nfor (const paramId of params) {\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\n    for (let i = 0; i < actorMax; i++) {\n        const actorX = paramX + paramWidth + (i * actorWidth);\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\n    }\n    tableY += paramheight;\n}"
 *
 * @param EquipDataClassic
 * @text Classic Style
 * @parent EquipDataStyle:str
 *
 * @param ClassicWeaponParameters:arraystr
 * @text Added Weapon Params
 * @parent EquipDataClassic
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc Display these parameters when a weapon is selected.
 * Requires VisuMZ_0_CoreEngine!
 * @default ["HIT"]
 *
 * @param ClassicArmorParameters:arraystr
 * @text Added Armor Params
 * @parent EquipDataClassic
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc Display these parameters when an armor is selected.
 * Requires VisuMZ_0_CoreEngine!
 * @default ["EVA"]
 *
 * @param DrawEquipClassicData:func
 * @text JS: Draw Equip Data
 * @parent EquipDataClassic
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Item Weapon Type or Armor Type\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\n\n// Draw Parameter Values\nconst params = this.actorParams();\nfor (const paramId of params) {\n    if (this.isCustomParameter(paramId)) continue;\n    this.drawActorParamClassic(paramId, x, y, width);\n    y += lineHeight;\n}\n\n// Draw Custom Entries\ny = this.drawItemCustomEntries(x, y, width);\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param EquipDataDouble
 * @text Double Style
 * @parent EquipDataStyle:str
 *
 * @param DoubleWeaponParameters:arraystr
 * @text Added Weapon Params
 * @parent EquipDataDouble
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc Display these parameters when a weapon is selected.
 * Requires VisuMZ_0_CoreEngine!
 * @default ["HIT","CNT"]
 *
 * @param DoubleArmorParameters:arraystr
 * @text Added Armor Params
 * @parent EquipDataDouble
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc Display these parameters when an armor is selected.
 * Requires VisuMZ_0_CoreEngine!
 * @default ["EVA","GRD"]
 *
 * @param DrawEquipDoubleData:func
 * @text JS: Draw Equip Data
 * @parent EquipDataDouble
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Item Weapon Type or Armor Type\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\n\n// Draw Parameter Values\nconst params = this.actorParams();\nfor (const paramId of params) {\n    if (this.isCustomParameter(paramId)) continue;\n    this.drawActorParamClassic(paramId, x, y, hw);\n    if (x === hw) {\n        y += lineHeight;\n        x = 0;\n    } else {\n        x = hw;\n    }\n}\n// Realign\nif (x === hw) {\n    this.drawItemDarkRect(hw, y, hw, lineHeight);\n    y += lineHeight;\n    x = 0;\n}\n\n// Draw Custom Entries\ny = this.drawItemCustomEntries(x, y, width);\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param EquipDelayMS:num
 * @text Delay MS
 * @parent EquipData
 * @type number
 * @min 1
 * @max 999
 * @desc How many milliseconds (MS) to delay the preview update?
 * This is to prevent lag spikes for equips only.
 * @default 240
 *
 * @param ItemData
 * @text Item Data
 *
 * @param ItemGeneral
 * @parent ItemData
 * @text Data Settings
 *
 * @param MaxIcons:num
 * @text Max State/Buff Icons
 * @parent ItemGeneral
 * @desc Maximum number of icons that can be displayed for Add/Remove States/Buffs.
 * @default 8
 *
 * @param MultiplierStandard:num
 * @text Multiplier Standard
 * @parent ItemGeneral
 * @desc Constant standard to filter out random values when calculating the damage multiplier.
 * @default 1000000
 *
 * @param DrawItemData:func
 * @text JS: Draw Item Data
 * @parent ItemGeneral
 * @type note
 * @desc Code used to draw the item data for the Shop Status Window.
 * @default "const lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\n\n// Draw Main Item Properties\nif (this.drawItemConsumable(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\nif (this._item.occasion < 3) {\n    y = this.drawItemDamage(x, y, width);\n    y = this.drawItemEffects(x, y, width);\n}\ny = this.drawItemCustomEntries(x, y, width);\n\n// Draw Remaining Item Properties\nif (this._item.occasion < 3) {\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\n    if (this.drawItemHitType(x, y, hw)) y += 0;\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\n}\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param Vocabulary
 * @parent ItemData
 *
 * @param LabelConsume:str
 * @text Consumable
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Consumable
 *
 * @param Consumable:str
 * @text Yes
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✔
 *
 * @param NotConsumable:str
 * @text No
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✘
 *
 * @param Occasions
 * @parent Vocabulary
 *
 * @param Occasion0:str
 * @text Always
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Anytime Use
 *
 * @param Occasion1:str
 * @text Battle Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Battle-Only
 *
 * @param Occasion2:str
 * @text Menu Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Field-Only
 *
 * @param Occasion3:str
 * @text Never
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default -
 *
 * @param Scope
 * @parent Vocabulary
 *
 * @param Scope0:str
 * @text None
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default No Target
 *
 * @param Scope1:str
 * @text 1 Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Foe
 *
 * @param Scope2:str
 * @text All Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Foes
 *
 * @param Scope3:str
 * @text 1 Random Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Random Foe
 *
 * @param Scope4:str
 * @text 2 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 2 Random Foes
 *
 * @param Scope5:str
 * @text 3 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 3 Random Foes
 *
 * @param Scope6:str
 * @text 4 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 4 Random Foes
 *
 * @param Scope7:str
 * @text 1 Ally
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Ally
 *
 * @param Scope8:str
 * @text All Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Alive Allies
 *
 * @param Scope9:str
 * @text 1 Ally (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Ally
 *
 * @param Scope10:str
 * @text All Allies (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Allies
 *
 * @param Scope11:str
 * @text The User
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default User
 *
 * @param Scope12:str
 * @text 1 Ally (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Any Ally
 *
 * @param Scope13:str
 * @text All Allies (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Allies
 *
 * @param Scope14:str
 * @text Enemies & Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Everybody
 *
 * @param BattleCore
 * @text Battle Core Support
 * @parent Vocabulary
 *
 * @param ScopeRandomAny:str
 * @text x Random Any
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Any> notetag.
 * @default %1 Random Units
 *
 * @param ScopeRandomEnemies:str
 * @text x Random Enemies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Enemies> notetag.
 * @default %1 Random Foes
 *
 * @param ScopeRandomAllies:str
 * @text x Random Allies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Allies> notetag.
 * @default %1 Random Allies
 *
 * @param ScopeAlliesButUser:str
 * @text All Allies But User
 * @parent BattleCore
 * @desc Vocabulary used for <Target: All Allies But User> notetag.
 * @default Other Allies
 *
 * @param ScopeAllyOrEnemy:str
 * @text Ally or Enemy
 * @parent BattleCore
 * @desc Vocabulary used for <Target: Ally or Enemy> notetag.
 * @default Ally/Enemy
 *
 * @param ScopeEnemyOrAlly:str
 * @text Enemy or Ally
 * @parent BattleCore
 * @desc Vocabulary used for <Target: Enemy or Ally> notetag.
 * @default Enemy/Ally
 *
 * @param LabelSpeed:str
 * @text Speed
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Speed
 *
 * @param Speed2000:str
 * @text >= 2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fastest
 *
 * @param Speed1000:str
 * @text >= 1000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Faster
 *
 * @param Speed1:str
 * @text >= 1 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fast
 *
 * @param Speed0:str
 * @text == 0 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Normal
 *
 * @param SpeedNeg999:str
 * @text >= -999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slow
 *
 * @param SpeedNeg1999:str
 * @text >= -1999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slower
 *
 * @param SpeedNeg2000:str
 * @text <= -2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slowest
 *
 * @param LabelSuccessRate:str
 * @text Success Rate
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Accuracy
 *
 * @param LabelRepeats:str
 * @text Repeats
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Hits
 *
 * @param LabelHitType:str
 * @text Hit Type
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Type
 *
 * @param HitType0:str
 * @text Certain Hit
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Neutral
 *
 * @param HitType1:str
 * @text Physical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Physical
 *
 * @param HitType2:str
 * @text Magical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Magical
 *
 * @param LabelElement:str
 * @text Element
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Element
 *
 * @param ElementWeapon:str
 * @text Weapon-Based
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[97]Weapon
 *
 * @param ElementNone:str
 * @text Nonelement Element
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[160]No Element
 *
 * @param DamageType
 * @text Damage Type
 * @parent Vocabulary
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param Effects
 * @parent Vocabulary
 *
 * @param LabelRecoverHP:str
 * @text Recover HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverMP:str
 * @text Recover MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverTP:str
 * @text Recover TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelSelfGainTP:str
 * @text Self Gain TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default User %1
 *
 * @param LabelDamageHP:str
 * @text Damage HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageMP:str
 * @text Damage MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageTP:str
 * @text Damage TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelApply:str
 * @text Add State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Applies
 *
 * @param LabelRemove:str
 * @text Remove State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Removes
 *
 * @param EquipType
 * @parent Vocabulary
 * @text Equip Type
 *
 * @param WeaponType:str
 * @text Weapon Type
 * @parent EquipType
 * @desc Vocabulary used for this data entry.
 * @default Weapon Type
 *
 * @param ArmorType:str
 * @text Armor Type
 * @parent EquipType
 * @desc Vocabulary used for this data entry.
 * @default Armor Type
 *
 * @param NoEquipTypeResult:str
 * @text No Equip Type
 * @parent EquipType
 * @desc Marker used to show an unlisted equip type.
 * @default -
 *
 */
//=============================================================================

function _0x2d08(_0xfd8d24,_0x43fb28){const _0x18d77b=_0x18d7();return _0x2d08=function(_0x2d0819,_0x208603){_0x2d0819=_0x2d0819-0x159;let _0x6a1910=_0x18d77b[_0x2d0819];return _0x6a1910;},_0x2d08(_0xfd8d24,_0x43fb28);}const _0x166c6b=_0x2d08;(function(_0x54705c,_0x230834){const _0x53928a=_0x2d08,_0x337e09=_0x54705c();while(!![]){try{const _0x25ddbc=parseInt(_0x53928a(0x2fe))/0x1+parseInt(_0x53928a(0x52b))/0x2+-parseInt(_0x53928a(0x35d))/0x3*(parseInt(_0x53928a(0x345))/0x4)+-parseInt(_0x53928a(0x351))/0x5+-parseInt(_0x53928a(0x489))/0x6*(-parseInt(_0x53928a(0x5a9))/0x7)+parseInt(_0x53928a(0x1ab))/0x8+-parseInt(_0x53928a(0x17a))/0x9*(parseInt(_0x53928a(0x34c))/0xa);if(_0x25ddbc===_0x230834)break;else _0x337e09['push'](_0x337e09['shift']());}catch(_0x25f88b){_0x337e09['push'](_0x337e09['shift']());}}}(_0x18d7,0x396f3));var label=_0x166c6b(0x435),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x166c6b(0x3df)](function(_0x591137){const _0x1ffd18=_0x166c6b;return _0x591137['status']&&_0x591137[_0x1ffd18(0x56d)][_0x1ffd18(0x175)]('['+label+']');})[0x0];VisuMZ[label][_0x166c6b(0x43a)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x166c6b(0x58c)]=function(_0x594c53,_0x20466b){const _0x6f8169=_0x166c6b;for(const _0xf64830 in _0x20466b){if(_0xf64830[_0x6f8169(0x346)](/(.*):(.*)/i)){const _0x418ae1=String(RegExp['$1']),_0x3c9ad4=String(RegExp['$2'])[_0x6f8169(0x255)]()[_0x6f8169(0x507)]();let _0x5dd6cc,_0x1812f7,_0x12c145;switch(_0x3c9ad4){case'NUM':_0x5dd6cc=_0x20466b[_0xf64830]!==''?Number(_0x20466b[_0xf64830]):0x0;break;case _0x6f8169(0x44b):_0x1812f7=_0x20466b[_0xf64830]!==''?JSON[_0x6f8169(0x2f1)](_0x20466b[_0xf64830]):[],_0x5dd6cc=_0x1812f7[_0x6f8169(0x436)](_0x1e3fb7=>Number(_0x1e3fb7));break;case _0x6f8169(0x355):_0x5dd6cc=_0x20466b[_0xf64830]!==''?eval(_0x20466b[_0xf64830]):null;break;case _0x6f8169(0x1a8):_0x1812f7=_0x20466b[_0xf64830]!==''?JSON['parse'](_0x20466b[_0xf64830]):[],_0x5dd6cc=_0x1812f7[_0x6f8169(0x436)](_0x41cffc=>eval(_0x41cffc));break;case _0x6f8169(0x2ef):_0x5dd6cc=_0x20466b[_0xf64830]!==''?JSON[_0x6f8169(0x2f1)](_0x20466b[_0xf64830]):'';break;case _0x6f8169(0x32d):_0x1812f7=_0x20466b[_0xf64830]!==''?JSON[_0x6f8169(0x2f1)](_0x20466b[_0xf64830]):[],_0x5dd6cc=_0x1812f7[_0x6f8169(0x436)](_0xcd12=>JSON[_0x6f8169(0x2f1)](_0xcd12));break;case'FUNC':_0x5dd6cc=_0x20466b[_0xf64830]!==''?new Function(JSON['parse'](_0x20466b[_0xf64830])):new Function(_0x6f8169(0x18c));break;case _0x6f8169(0x2d0):_0x1812f7=_0x20466b[_0xf64830]!==''?JSON[_0x6f8169(0x2f1)](_0x20466b[_0xf64830]):[],_0x5dd6cc=_0x1812f7[_0x6f8169(0x436)](_0x2f5beb=>new Function(JSON['parse'](_0x2f5beb)));break;case _0x6f8169(0x3d7):_0x5dd6cc=_0x20466b[_0xf64830]!==''?String(_0x20466b[_0xf64830]):'';break;case _0x6f8169(0x3f2):_0x1812f7=_0x20466b[_0xf64830]!==''?JSON[_0x6f8169(0x2f1)](_0x20466b[_0xf64830]):[],_0x5dd6cc=_0x1812f7[_0x6f8169(0x436)](_0x1b39ab=>String(_0x1b39ab));break;case _0x6f8169(0x216):_0x12c145=_0x20466b[_0xf64830]!==''?JSON[_0x6f8169(0x2f1)](_0x20466b[_0xf64830]):{},_0x594c53[_0x418ae1]={},VisuMZ[_0x6f8169(0x58c)](_0x594c53[_0x418ae1],_0x12c145);continue;case'ARRAYSTRUCT':_0x1812f7=_0x20466b[_0xf64830]!==''?JSON['parse'](_0x20466b[_0xf64830]):[],_0x5dd6cc=_0x1812f7[_0x6f8169(0x436)](_0xd94012=>VisuMZ['ConvertParams']({},JSON[_0x6f8169(0x2f1)](_0xd94012)));break;default:continue;}_0x594c53[_0x418ae1]=_0x5dd6cc;}}return _0x594c53;},(_0x4cf706=>{const _0x55fe58=_0x166c6b,_0x499ceb=_0x4cf706[_0x55fe58(0x32f)];for(const _0x1bdae7 of dependencies){if(!Imported[_0x1bdae7]){alert(_0x55fe58(0x3d2)['format'](_0x499ceb,_0x1bdae7)),SceneManager[_0x55fe58(0x36b)]();break;}}const _0x28b7f7=_0x4cf706[_0x55fe58(0x56d)];if(_0x28b7f7[_0x55fe58(0x346)](/\[Version[ ](.*?)\]/i)){const _0x459770=Number(RegExp['$1']);_0x459770!==VisuMZ[label][_0x55fe58(0x597)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x55fe58(0x505)](_0x499ceb,_0x459770)),SceneManager[_0x55fe58(0x36b)]());}if(_0x28b7f7['match'](/\[Tier[ ](\d+)\]/i)){const _0xe88115=Number(RegExp['$1']);_0xe88115<tier?(alert(_0x55fe58(0x394)[_0x55fe58(0x505)](_0x499ceb,_0xe88115,tier)),SceneManager[_0x55fe58(0x36b)]()):tier=Math[_0x55fe58(0x2aa)](_0xe88115,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x55fe58(0x43a)],_0x4cf706[_0x55fe58(0x161)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x166c6b(0x32f)],_0x166c6b(0x25e),_0x259099=>{const _0x2a3bc3=_0x166c6b;VisuMZ[_0x2a3bc3(0x58c)](_0x259099,_0x259099);const _0x2f7c67=_0x259099[_0x2a3bc3(0x49c)][_0x2a3bc3(0x436)](_0x17c4e0=>$gameActors[_0x2a3bc3(0x4b3)](_0x17c4e0)),_0x5b00a4=_0x259099[_0x2a3bc3(0x481)][_0x2a3bc3(0x436)](_0x37db42=>$dataSystem[_0x2a3bc3(0x244)][_0x2a3bc3(0x47a)](_0x37db42[_0x2a3bc3(0x507)]()));for(const _0x34e01a of _0x2f7c67){if(!_0x34e01a)continue;_0x34e01a[_0x2a3bc3(0x521)](_0x5b00a4);}}),PluginManager[_0x166c6b(0x246)](pluginData[_0x166c6b(0x32f)],_0x166c6b(0x200),_0x1762f1=>{const _0x28e37e=_0x166c6b;VisuMZ['ConvertParams'](_0x1762f1,_0x1762f1);const _0x224a0f=_0x1762f1['Actors'][_0x28e37e(0x436)](_0x3c0b26=>$gameActors['actor'](_0x3c0b26));for(const _0x288132 of _0x224a0f){if(!_0x288132)continue;_0x288132[_0x28e37e(0x3dd)]();}}),PluginManager['registerCommand'](pluginData[_0x166c6b(0x32f)],_0x166c6b(0x284),_0x5035d1=>{const _0x1e2e4a=_0x166c6b;if($gameParty[_0x1e2e4a(0x1a0)]())return;VisuMZ[_0x1e2e4a(0x58c)](_0x5035d1,_0x5035d1);const _0x51770d=_0x5035d1[_0x1e2e4a(0x49c)][_0x1e2e4a(0x436)](_0x33ed17=>$gameActors['actor'](_0x33ed17));for(const _0x46667b of _0x51770d){if(!_0x46667b)continue;_0x46667b[_0x1e2e4a(0x534)]();}}),PluginManager['registerCommand'](pluginData[_0x166c6b(0x32f)],_0x166c6b(0x171),_0x1170f6=>{const _0x534747=_0x166c6b;if($gameParty['inBattle']())return;$gameParty[_0x534747(0x534)]();}),PluginManager[_0x166c6b(0x246)](pluginData[_0x166c6b(0x32f)],_0x166c6b(0x174),_0x1fea4f=>{const _0x46bb7c=_0x166c6b;VisuMZ['ConvertParams'](_0x1fea4f,_0x1fea4f);const _0x23380d=[],_0x1d2489=_0x1fea4f[_0x46bb7c(0x205)][_0x46bb7c(0x436)](_0x39b91c=>_0x39b91c[_0x46bb7c(0x255)]()[_0x46bb7c(0x507)]()),_0x2fbc1c=_0x1fea4f[_0x46bb7c(0x58f)]['map'](_0x3c3c00=>_0x3c3c00[_0x46bb7c(0x255)]()[_0x46bb7c(0x507)]()),_0x3d6113=_0x1fea4f[_0x46bb7c(0x527)]>=_0x1fea4f[_0x46bb7c(0x3c1)]?_0x1fea4f[_0x46bb7c(0x3c1)]:_0x1fea4f[_0x46bb7c(0x527)],_0x44f7b9=_0x1fea4f[_0x46bb7c(0x527)]>=_0x1fea4f[_0x46bb7c(0x3c1)]?_0x1fea4f['Step1End']:_0x1fea4f[_0x46bb7c(0x3c1)],_0x1f376a=Array(_0x44f7b9-_0x3d6113+0x1)[_0x46bb7c(0x412)]()[_0x46bb7c(0x436)]((_0x3dd0ad,_0x1d0b4f)=>_0x3d6113+_0x1d0b4f);for(const _0x129b84 of _0x1f376a){const _0x1e7234=$dataItems[_0x129b84];if(!_0x1e7234)continue;if(!VisuMZ['ItemsEquipsCore'][_0x46bb7c(0x379)](_0x1e7234,_0x1d2489,_0x2fbc1c))continue;_0x23380d[_0x46bb7c(0x1c9)]([0x0,_0x129b84,0x0,_0x1e7234[_0x46bb7c(0x192)]]);}const _0x3788a2=_0x1fea4f[_0x46bb7c(0x44a)]>=_0x1fea4f['Step2Start']?_0x1fea4f[_0x46bb7c(0x4cf)]:_0x1fea4f[_0x46bb7c(0x44a)],_0x35c9e1=_0x1fea4f[_0x46bb7c(0x44a)]>=_0x1fea4f['Step2Start']?_0x1fea4f[_0x46bb7c(0x44a)]:_0x1fea4f[_0x46bb7c(0x4cf)],_0x37fbc1=Array(_0x35c9e1-_0x3788a2+0x1)[_0x46bb7c(0x412)]()[_0x46bb7c(0x436)]((_0xf38350,_0x20dbb5)=>_0x3788a2+_0x20dbb5);for(const _0xe25bed of _0x37fbc1){const _0x2d4cdc=$dataWeapons[_0xe25bed];if(!_0x2d4cdc)continue;if(!VisuMZ['ItemsEquipsCore'][_0x46bb7c(0x379)](_0x2d4cdc,_0x1d2489,_0x2fbc1c))continue;_0x23380d[_0x46bb7c(0x1c9)]([0x1,_0xe25bed,0x0,_0x2d4cdc[_0x46bb7c(0x192)]]);}const _0x379880=_0x1fea4f[_0x46bb7c(0x37e)]>=_0x1fea4f[_0x46bb7c(0x421)]?_0x1fea4f[_0x46bb7c(0x421)]:_0x1fea4f['Step3End'],_0x4bb632=_0x1fea4f[_0x46bb7c(0x37e)]>=_0x1fea4f[_0x46bb7c(0x421)]?_0x1fea4f['Step3End']:_0x1fea4f[_0x46bb7c(0x421)],_0xc7414f=Array(_0x4bb632-_0x379880+0x1)[_0x46bb7c(0x412)]()[_0x46bb7c(0x436)]((_0x305e84,_0x194990)=>_0x379880+_0x194990);for(const _0x1b1d8c of _0xc7414f){const _0x1c5c64=$dataArmors[_0x1b1d8c];if(!_0x1c5c64)continue;if(!VisuMZ['ItemsEquipsCore'][_0x46bb7c(0x379)](_0x1c5c64,_0x1d2489,_0x2fbc1c))continue;_0x23380d[_0x46bb7c(0x1c9)]([0x2,_0x1b1d8c,0x0,_0x1c5c64['price']]);}SceneManager[_0x46bb7c(0x1c9)](Scene_Shop),SceneManager[_0x46bb7c(0x4e7)](_0x23380d,_0x1fea4f[_0x46bb7c(0x567)]);}),VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x379)]=function(_0x3b8a22,_0x3481b2,_0x25b85e){const _0xaa4a5a=_0x166c6b;if(_0x3b8a22[_0xaa4a5a(0x32f)][_0xaa4a5a(0x507)]()==='')return![];if(_0x3b8a22['name'][_0xaa4a5a(0x346)](/-----/i))return![];const _0x44deb0=_0x3b8a22[_0xaa4a5a(0x51c)];if(_0x3481b2[_0xaa4a5a(0x514)]>0x0)for(const _0x3e6016 of _0x3481b2){if(!_0x3e6016)continue;if(_0x44deb0[_0xaa4a5a(0x175)](_0x3e6016))return![];}if(_0x25b85e['length']>0x0){for(const _0x48828c of _0x25b85e){if(!_0x48828c)continue;if(_0x44deb0[_0xaa4a5a(0x175)](_0x48828c))return!![];}return![];}return!![];},VisuMZ['ItemsEquipsCore'][_0x166c6b(0x477)]=Scene_Boot[_0x166c6b(0x3f4)][_0x166c6b(0x437)],Scene_Boot[_0x166c6b(0x3f4)][_0x166c6b(0x437)]=function(){const _0x1e0778=_0x166c6b;this[_0x1e0778(0x4d7)](),VisuMZ[_0x1e0778(0x435)][_0x1e0778(0x477)][_0x1e0778(0x2b5)](this),this[_0x1e0778(0x442)](),VisuMZ[_0x1e0778(0x435)]['SetupProxyItemGroups'](),VisuMZ['ItemsEquipsCore']['SetupArtifactItemIDs']();},Scene_Boot['prototype'][_0x166c6b(0x4d7)]=function(){const _0x52bf02=_0x166c6b;VisuMZ['ItemsEquipsCore'][_0x52bf02(0x497)]={},VisuMZ[_0x52bf02(0x435)]['RegExp'][_0x52bf02(0x390)]=[],VisuMZ[_0x52bf02(0x435)][_0x52bf02(0x497)][_0x52bf02(0x19a)]=[];const _0x28772c=[_0x52bf02(0x2d3),_0x52bf02(0x21d),_0x52bf02(0x48b),_0x52bf02(0x245),_0x52bf02(0x361),'MDF',_0x52bf02(0x2ac),_0x52bf02(0x552)];for(const _0x4e5ee1 of _0x28772c){const _0x32aafe=_0x52bf02(0x15a)[_0x52bf02(0x505)](_0x4e5ee1);VisuMZ[_0x52bf02(0x435)][_0x52bf02(0x497)][_0x52bf02(0x390)][_0x52bf02(0x1c9)](new RegExp(_0x32aafe,'i'));const _0x48e2ce=_0x52bf02(0x32b)[_0x52bf02(0x505)](_0x4e5ee1);VisuMZ[_0x52bf02(0x435)]['RegExp'][_0x52bf02(0x19a)][_0x52bf02(0x1c9)](new RegExp(_0x48e2ce,'g'));}},Scene_Boot[_0x166c6b(0x3f4)]['process_VisuMZ_ItemsEquipsCore_Notetags']=function(){const _0x995a58=_0x166c6b;if(VisuMZ[_0x995a58(0x4bb)])return;this['process_VisuMZ_ItemsEquipsCore_EquipSlots']();const _0x1df536=[$dataItems,$dataWeapons,$dataArmors];for(const _0x2de8b2 of _0x1df536){for(const _0x5d2aaf of _0x2de8b2){if(!_0x5d2aaf)continue;VisuMZ[_0x995a58(0x435)]['Parse_Notetags_Category'](_0x5d2aaf,_0x2de8b2),VisuMZ[_0x995a58(0x435)][_0x995a58(0x367)](_0x5d2aaf,_0x2de8b2),VisuMZ[_0x995a58(0x435)][_0x995a58(0x46a)](_0x5d2aaf,_0x2de8b2),VisuMZ[_0x995a58(0x435)][_0x995a58(0x2a6)](_0x5d2aaf,_0x2de8b2),VisuMZ['ItemsEquipsCore'][_0x995a58(0x340)](_0x5d2aaf,_0x2de8b2);}}},Scene_Boot[_0x166c6b(0x3f4)]['process_VisuMZ_ItemsEquipsCore_EquipSlots']=function(){const _0x175296=_0x166c6b;for(const _0x3e0ab6 of $dataClasses){if(!_0x3e0ab6)continue;VisuMZ['ItemsEquipsCore'][_0x175296(0x4a0)](_0x3e0ab6);}},VisuMZ['ItemsEquipsCore'][_0x166c6b(0x506)]=VisuMZ[_0x166c6b(0x506)],VisuMZ[_0x166c6b(0x506)]=function(_0x7c40ed){const _0x569dcc=_0x166c6b;VisuMZ['ItemsEquipsCore'][_0x569dcc(0x506)]['call'](this,_0x7c40ed),VisuMZ[_0x569dcc(0x435)][_0x569dcc(0x4a0)](_0x7c40ed);},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x236)]=VisuMZ[_0x166c6b(0x236)],VisuMZ['ParseItemNotetags']=function(_0x455e65){const _0x1393ce=_0x166c6b;VisuMZ[_0x1393ce(0x435)][_0x1393ce(0x236)][_0x1393ce(0x2b5)](this,_0x455e65),VisuMZ[_0x1393ce(0x435)]['Parse_Notetags_Batch'](_0x455e65,$dataItems);},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x54f)]=VisuMZ['ParseWeaponNotetags'],VisuMZ[_0x166c6b(0x54f)]=function(_0x1f0d72){const _0x549ce1=_0x166c6b;VisuMZ[_0x549ce1(0x435)][_0x549ce1(0x54f)][_0x549ce1(0x2b5)](this,_0x1f0d72),VisuMZ[_0x549ce1(0x435)][_0x549ce1(0x259)](_0x1f0d72,$dataWeapons);},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x418)]=VisuMZ[_0x166c6b(0x418)],VisuMZ[_0x166c6b(0x418)]=function(_0x472de2){const _0x2ae65d=_0x166c6b;VisuMZ[_0x2ae65d(0x435)][_0x2ae65d(0x418)][_0x2ae65d(0x2b5)](this,_0x472de2),VisuMZ[_0x2ae65d(0x435)][_0x2ae65d(0x259)](_0x472de2,$dataArmors);},VisuMZ[_0x166c6b(0x435)]['Parse_Notetags_EquipSlots']=function(_0x48cf5b){const _0x1e325f=_0x166c6b;_0x48cf5b[_0x1e325f(0x190)]=[];const _0x133dc4=$dataSystem[_0x1e325f(0x244)][_0x1e325f(0x436)](_0x117f56=>_0x117f56?_0x117f56[_0x1e325f(0x507)]():'');if(!BattleManager[_0x1e325f(0x264)]()&&_0x48cf5b[_0x1e325f(0x1a6)]['match'](/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)){const _0x2f6c7f=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x49208a of _0x2f6c7f){const _0x55ece1=_0x133dc4[_0x1e325f(0x47a)](_0x49208a[_0x1e325f(0x507)]());if(_0x55ece1>0x0)_0x48cf5b[_0x1e325f(0x190)][_0x1e325f(0x1c9)](_0x55ece1);}}else for(const _0x57c21c of _0x133dc4){const _0x462d1d=_0x133dc4[_0x1e325f(0x47a)](_0x57c21c[_0x1e325f(0x507)]());if(_0x462d1d>0x0)_0x48cf5b['equipSlots']['push'](_0x462d1d);}},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x259)]=function(_0x3e8f5f,_0x27a46c){const _0x41027e=_0x166c6b;VisuMZ[_0x41027e(0x435)]['Parse_Notetags_Category'](_0x3e8f5f,_0x27a46c),VisuMZ[_0x41027e(0x435)][_0x41027e(0x367)](_0x3e8f5f,_0x27a46c),VisuMZ[_0x41027e(0x435)]['Parse_Notetags_ParamValues'](_0x3e8f5f,_0x27a46c),VisuMZ[_0x41027e(0x435)]['Parse_Notetags_ParamJS'](_0x3e8f5f,_0x27a46c),VisuMZ[_0x41027e(0x435)]['Parse_Notetags_EnableJS'](_0x3e8f5f,_0x27a46c);},VisuMZ['ItemsEquipsCore'][_0x166c6b(0x5a4)]=function(_0x4619bf,_0x350769){const _0x170f75=_0x166c6b;_0x4619bf['categories']=[];const _0x2710d5=_0x4619bf[_0x170f75(0x1a6)]||'',_0xbb5aaf=_0x2710d5['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0xbb5aaf)for(const _0x2851cf of _0xbb5aaf){_0x2851cf[_0x170f75(0x346)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0xc2f76a=String(RegExp['$1'])[_0x170f75(0x255)]()[_0x170f75(0x507)]()[_0x170f75(0x3c7)](',');for(const _0x52af9a of _0xc2f76a){_0x4619bf[_0x170f75(0x51c)][_0x170f75(0x1c9)](_0x52af9a[_0x170f75(0x507)]());}}if(_0x2710d5[_0x170f75(0x346)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x40f330=RegExp['$1']['split'](/[\r\n]+/);for(const _0x317353 of _0x40f330){_0x4619bf[_0x170f75(0x51c)][_0x170f75(0x1c9)](_0x317353[_0x170f75(0x255)]()[_0x170f75(0x507)]());}}},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x1a7)]=function(_0x50af97,_0x253f28){const _0x587fc5=_0x166c6b;if(!_0x50af97)return;_0x50af97[_0x587fc5(0x2c2)]=0x32;const _0x4629e7=_0x50af97['note']||'';_0x4629e7['match'](/<(?:|ID )SORT(?:|ING)[ ]PRIORITY:[ ](\d+)>/i)&&(_0x50af97[_0x587fc5(0x2c2)]=Number(RegExp['$1']));},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x367)]=function(_0x9077e2,_0x3d3e18){const _0xfb1042=_0x166c6b;_0x9077e2[_0xfb1042(0x1a6)][_0xfb1042(0x346)](/<PRICE:[ ](\d+)>/i)&&(_0x9077e2[_0xfb1042(0x192)]=Number(RegExp['$1']));},VisuMZ['ItemsEquipsCore'][_0x166c6b(0x46a)]=function(_0x389574,_0xbcbe0a){const _0x348adf=_0x166c6b;if(_0xbcbe0a===$dataItems)return;for(let _0x4986ef=0x0;_0x4986ef<0x8;_0x4986ef++){const _0x23b689=VisuMZ[_0x348adf(0x435)][_0x348adf(0x497)][_0x348adf(0x390)][_0x4986ef];_0x389574['note']['match'](_0x23b689)&&(_0x389574[_0x348adf(0x516)][_0x4986ef]=parseInt(RegExp['$1']));}},VisuMZ[_0x166c6b(0x435)]['paramJS']={},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x2a6)]=function(_0x41924a,_0x4d341d){const _0x1ae6ac=_0x166c6b;if(_0x4d341d===$dataItems)return;if(_0x41924a[_0x1ae6ac(0x1a6)][_0x1ae6ac(0x346)](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){const _0x51d98c=String(RegExp['$1']),_0x10560b=(_0x4d341d===$dataWeapons?_0x1ae6ac(0x1f2):_0x1ae6ac(0x267))[_0x1ae6ac(0x505)](_0x41924a['id']),_0x30565b=_0x1ae6ac(0x326)[_0x1ae6ac(0x505)](_0x51d98c);for(let _0x13336e=0x0;_0x13336e<0x8;_0x13336e++){if(_0x51d98c['match'](VisuMZ[_0x1ae6ac(0x435)][_0x1ae6ac(0x497)][_0x1ae6ac(0x19a)][_0x13336e])){const _0x334f8b=_0x1ae6ac(0x221)[_0x1ae6ac(0x505)](_0x10560b,_0x13336e);VisuMZ[_0x1ae6ac(0x435)]['paramJS'][_0x334f8b]=new Function('item',_0x1ae6ac(0x44f),_0x30565b);}}}},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x3c4)]={},VisuMZ[_0x166c6b(0x435)]['Parse_Notetags_EnableJS']=function(_0x400760,_0x510781){const _0x112a61=_0x166c6b;if(_0x510781!==$dataItems)return;if(_0x400760[_0x112a61(0x1a6)][_0x112a61(0x346)](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){const _0x5d74e2=String(RegExp['$1']),_0x5a58bf=_0x112a61(0x1f5)[_0x112a61(0x505)](_0x5d74e2);VisuMZ[_0x112a61(0x435)][_0x112a61(0x3c4)][_0x400760['id']]=new Function(_0x112a61(0x1b4),_0x5a58bf);}},DataManager[_0x166c6b(0x1d0)]=function(_0x468044){const _0x468455=_0x166c6b;return this[_0x468455(0x45f)](_0x468044)&&_0x468044[_0x468455(0x31a)]===0x2;},DataManager[_0x166c6b(0x232)]=function(_0x3f237){const _0x475a25=_0x166c6b;if(!_0x3f237)return 0x63;else return _0x3f237[_0x475a25(0x1a6)]['match'](/<MAX:[ ](\d+)>/i)?parseInt(RegExp['$1']):this[_0x475a25(0x2b4)](_0x3f237);},DataManager[_0x166c6b(0x2b4)]=function(_0x40ffb5){const _0x296820=_0x166c6b;if(this[_0x296820(0x45f)](_0x40ffb5))return VisuMZ['ItemsEquipsCore'][_0x296820(0x43a)][_0x296820(0x167)][_0x296820(0x2bc)];else{if(this[_0x296820(0x4e6)](_0x40ffb5))return VisuMZ['ItemsEquipsCore'][_0x296820(0x43a)]['ItemScene'][_0x296820(0x5a8)];else{if(this[_0x296820(0x3c2)](_0x40ffb5))return VisuMZ[_0x296820(0x435)][_0x296820(0x43a)][_0x296820(0x167)][_0x296820(0x3ca)];}}},DataManager[_0x166c6b(0x369)]=function(_0x3cddeb){const _0xcf00fe=_0x166c6b;_0x3cddeb=_0x3cddeb[_0xcf00fe(0x255)]()['trim'](),this[_0xcf00fe(0x4b8)]=this['_classIDs']||{};if(this['_classIDs'][_0x3cddeb])return this['_classIDs'][_0x3cddeb];for(const _0x2b6574 of $dataClasses){if(!_0x2b6574)continue;let _0x4e3b21=_0x2b6574['name'];_0x4e3b21=_0x4e3b21[_0xcf00fe(0x5a5)](/\x1I\[(\d+)\]/gi,''),_0x4e3b21=_0x4e3b21[_0xcf00fe(0x5a5)](/\\I\[(\d+)\]/gi,''),this['_classIDs'][_0x4e3b21[_0xcf00fe(0x255)]()[_0xcf00fe(0x507)]()]=_0x2b6574['id'];}return this[_0xcf00fe(0x4b8)][_0x3cddeb]||0x0;},DataManager[_0x166c6b(0x37f)]=function(_0x520d6d){const _0x4f175c=_0x166c6b;_0x520d6d=_0x520d6d[_0x4f175c(0x255)]()['trim'](),this[_0x4f175c(0x44e)]=this[_0x4f175c(0x44e)]||{};if(this[_0x4f175c(0x44e)][_0x520d6d])return this[_0x4f175c(0x44e)][_0x520d6d];for(const _0x318bfa of $dataSkills){if(!_0x318bfa)continue;this[_0x4f175c(0x44e)][_0x318bfa[_0x4f175c(0x32f)][_0x4f175c(0x255)]()[_0x4f175c(0x507)]()]=_0x318bfa['id'];}return this[_0x4f175c(0x44e)][_0x520d6d]||0x0;},DataManager['getItemIdWithName']=function(_0x2e9d3b){const _0x3adbd6=_0x166c6b;_0x2e9d3b=_0x2e9d3b[_0x3adbd6(0x255)]()[_0x3adbd6(0x507)](),this[_0x3adbd6(0x266)]=this['_itemIDs']||{};if(this[_0x3adbd6(0x266)][_0x2e9d3b])return this[_0x3adbd6(0x266)][_0x2e9d3b];for(const _0x5c116c of $dataItems){if(!_0x5c116c)continue;this[_0x3adbd6(0x266)][_0x5c116c[_0x3adbd6(0x32f)]['toUpperCase']()[_0x3adbd6(0x507)]()]=_0x5c116c['id'];}return this['_itemIDs'][_0x2e9d3b]||0x0;},DataManager['getWeaponIdWithName']=function(_0x46497b){const _0xb830d1=_0x166c6b;_0x46497b=_0x46497b[_0xb830d1(0x255)]()[_0xb830d1(0x507)](),this[_0xb830d1(0x479)]=this['_weaponIDs']||{};if(this[_0xb830d1(0x479)][_0x46497b])return this[_0xb830d1(0x479)][_0x46497b];for(const _0x336c5a of $dataWeapons){if(!_0x336c5a)continue;this[_0xb830d1(0x479)][_0x336c5a[_0xb830d1(0x32f)][_0xb830d1(0x255)]()[_0xb830d1(0x507)]()]=_0x336c5a['id'];}return this[_0xb830d1(0x479)][_0x46497b]||0x0;},DataManager['getArmorIdWithName']=function(_0x26c421){const _0x497bae=_0x166c6b;_0x26c421=_0x26c421[_0x497bae(0x255)]()[_0x497bae(0x507)](),this[_0x497bae(0x34b)]=this[_0x497bae(0x34b)]||{};if(this['_armorIDs'][_0x26c421])return this['_armorIDs'][_0x26c421];for(const _0x5d50a8 of $dataArmors){if(!_0x5d50a8)continue;this['_armorIDs'][_0x5d50a8[_0x497bae(0x32f)][_0x497bae(0x255)]()[_0x497bae(0x507)]()]=_0x5d50a8['id'];}return this[_0x497bae(0x34b)][_0x26c421]||0x0;},DataManager[_0x166c6b(0x295)]=function(_0x14c303){const _0x47e953=_0x166c6b;_0x14c303=_0x14c303['toUpperCase']()[_0x47e953(0x507)](),this['_etypeIDs']=this[_0x47e953(0x4e8)]||{};if(this[_0x47e953(0x4e8)][_0x14c303])return this[_0x47e953(0x4e8)][_0x14c303];for(const _0x56041c of $dataSystem[_0x47e953(0x244)]){this[_0x47e953(0x4e8)][_0x56041c[_0x47e953(0x255)]()[_0x47e953(0x507)]()]=$dataSystem[_0x47e953(0x244)][_0x47e953(0x47a)](_0x56041c);}return this[_0x47e953(0x4e8)][_0x14c303]||0x0;},VisuMZ['ItemsEquipsCore']['SetupProxyItemGroups']=function(){const _0x1492dd=_0x166c6b;VisuMZ[_0x1492dd(0x435)][_0x1492dd(0x3e0)]($dataItems),VisuMZ[_0x1492dd(0x435)][_0x1492dd(0x3e0)]($dataWeapons),VisuMZ[_0x1492dd(0x435)][_0x1492dd(0x3e0)]($dataArmors);},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x3e0)]=function(_0x28238d){const _0x5e4ea3=_0x166c6b;for(const _0x444e1a of _0x28238d){if(!_0x444e1a)continue;if(!DataManager[_0x5e4ea3(0x408)](_0x444e1a))continue;const _0x2d5066=DataManager[_0x5e4ea3(0x380)](_0x444e1a),_0x55cb44=['name',_0x5e4ea3(0x15d),'description'];for(const _0x5449a2 of _0x55cb44){_0x444e1a[_0x5449a2]=_0x2d5066[_0x5449a2];}}},DataManager[_0x166c6b(0x408)]=function(_0x581ca5){const _0x3c6fe3=_0x166c6b;if(!_0x581ca5)return![];if(!_0x581ca5['note'])return![];return _0x581ca5&&_0x581ca5[_0x3c6fe3(0x1a6)][_0x3c6fe3(0x346)](/<PROXY:[ ](.*)>/i);},DataManager[_0x166c6b(0x380)]=function(_0x2d8316){const _0x32c616=_0x166c6b;return this['isProxyItem'](_0x2d8316)?this[_0x32c616(0x281)](_0x2d8316)||_0x2d8316:_0x2d8316;},DataManager[_0x166c6b(0x281)]=function(_0x32d5f0){const _0x5bc327=_0x166c6b;_0x32d5f0[_0x5bc327(0x1a6)][_0x5bc327(0x346)](/<PROXY:[ ](.*)>/i);const _0x20ab0e=RegExp['$1'][_0x5bc327(0x507)](),_0xada0ec=/^\d+$/[_0x5bc327(0x4d1)](_0x20ab0e);if(this[_0x5bc327(0x45f)](_0x32d5f0)){const _0x258650=_0xada0ec?Number(_0x20ab0e):DataManager[_0x5bc327(0x540)](_0x20ab0e);return $dataItems[_0x258650]||_0x32d5f0;}else{if(this['isWeapon'](_0x32d5f0)){const _0x2a1896=_0xada0ec?Number(_0x20ab0e):DataManager[_0x5bc327(0x269)](_0x20ab0e);return $dataWeapons[_0x2a1896]||_0x32d5f0;}else{if(this[_0x5bc327(0x3c2)](_0x32d5f0)){const _0x2811c0=_0xada0ec?Number(_0x20ab0e):DataManager[_0x5bc327(0x2ee)](_0x20ab0e);return $dataArmors[_0x2811c0]||_0x32d5f0;}}}return _0x32d5f0;},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x4f6)]=Window_ItemList[_0x166c6b(0x3f4)][_0x166c6b(0x1b4)],Window_ItemList[_0x166c6b(0x3f4)][_0x166c6b(0x1b4)]=function(){const _0x4a403f=_0x166c6b;if($gameTemp['_bypassProxy'])return VisuMZ[_0x4a403f(0x435)]['Window_ItemList_item']['call'](this);return DataManager[_0x4a403f(0x380)](VisuMZ[_0x4a403f(0x435)][_0x4a403f(0x4f6)][_0x4a403f(0x2b5)](this));},Window_ItemList[_0x166c6b(0x3f4)][_0x166c6b(0x577)]=function(){const _0x51f1a7=_0x166c6b;return VisuMZ[_0x51f1a7(0x435)][_0x51f1a7(0x4f6)]['call'](this);},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x4e1)]=Window_ShopBuy[_0x166c6b(0x3f4)]['item'],Window_ShopBuy[_0x166c6b(0x3f4)]['item']=function(){const _0x371128=_0x166c6b;if($gameTemp[_0x371128(0x24f)])return VisuMZ[_0x371128(0x435)]['Window_ShopBuy_item']['call'](this);return DataManager['getProxyItem'](VisuMZ[_0x371128(0x435)]['Window_ShopBuy_item']['call'](this));},Window_ShopBuy[_0x166c6b(0x3f4)]['proxyItem']=function(){const _0xccc372=_0x166c6b;return VisuMZ[_0xccc372(0x435)]['Window_ShopBuy_item']['call'](this);},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x4a9)]=Game_Item[_0x166c6b(0x3f4)]['setObject'],Game_Item[_0x166c6b(0x3f4)][_0x166c6b(0x17d)]=function(_0x120aea){const _0x1c8906=_0x166c6b;if(DataManager[_0x1c8906(0x408)](_0x120aea))return;VisuMZ['ItemsEquipsCore']['Game_Item_setObject'][_0x1c8906(0x2b5)](this,_0x120aea);},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x3b8)]=function(){const _0x8213a3=_0x166c6b;this[_0x8213a3(0x1f4)]={'partyArtifactIDs':[],'troopArtifactIDs':[]};for(const _0x5f594c of $dataArmors){if(!_0x5f594c)continue;if(!DataManager[_0x8213a3(0x504)](_0x5f594c))continue;DataManager[_0x8213a3(0x19b)](_0x5f594c)&&this['artifactIDs'][_0x8213a3(0x166)][_0x8213a3(0x1c9)](_0x5f594c['id']),DataManager[_0x8213a3(0x28c)](_0x5f594c)&&this[_0x8213a3(0x1f4)][_0x8213a3(0x2e9)][_0x8213a3(0x1c9)](_0x5f594c['id']);}},DataManager[_0x166c6b(0x504)]=function(_0x2ed492){const _0x57066b=_0x166c6b;if(!this[_0x57066b(0x3c2)](_0x2ed492))return![];const _0x58af04=_0x2ed492['note'];if(!_0x58af04)return![];if(_0x58af04[_0x57066b(0x346)](/<(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x58af04[_0x57066b(0x346)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x58af04[_0x57066b(0x346)](/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x58af04[_0x57066b(0x346)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager[_0x166c6b(0x1fd)]=function(_0x3f4875){const _0xac012a=_0x166c6b;if(!this[_0xac012a(0x504)](_0x3f4875))return![];const _0x4c8296=_0x3f4875[_0xac012a(0x1a6)];if(!_0x4c8296)return![];if(_0x4c8296[_0xac012a(0x346)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x4c8296[_0xac012a(0x346)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager[_0x166c6b(0x19b)]=function(_0x2b6876){const _0x12a353=_0x166c6b;if(!this[_0x12a353(0x504)](_0x2b6876))return![];const _0xeea014=_0x2b6876[_0x12a353(0x1a6)];if(!_0xeea014)return![];if(_0xeea014[_0x12a353(0x346)](/<(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0xeea014[_0x12a353(0x346)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager[_0x166c6b(0x28c)]=function(_0x4e7241){const _0x379ddb=_0x166c6b;if(!this[_0x379ddb(0x504)](_0x4e7241))return![];const _0x4cc523=_0x4e7241['note'];if(!_0x4cc523)return![];if(_0x4cc523['match'](/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x4cc523[_0x379ddb(0x346)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x220)]=Game_BattlerBase['prototype'][_0x166c6b(0x43f)],Game_BattlerBase[_0x166c6b(0x3f4)]['canEquip']=function(_0x182afa){const _0x3583cf=_0x166c6b;if(DataManager[_0x3583cf(0x504)](_0x182afa))return![];if(!DataManager['meetsClassRequirements'](this,_0x182afa))return![];if(!DataManager[_0x3583cf(0x1b6)](this,_0x182afa))return![];return VisuMZ[_0x3583cf(0x435)][_0x3583cf(0x220)][_0x3583cf(0x2b5)](this,_0x182afa);},VisuMZ[_0x166c6b(0x435)]['Game_BattlerBase_param_artifact']=Game_BattlerBase[_0x166c6b(0x3f4)][_0x166c6b(0x40a)],Game_BattlerBase[_0x166c6b(0x3f4)]['param']=function(_0x3e9fb1){const _0x56f9d6=_0x166c6b;this[_0x56f9d6(0x44c)]=!![];const _0x54819e=VisuMZ[_0x56f9d6(0x435)]['Game_BattlerBase_param_artifact'][_0x56f9d6(0x2b5)](this,_0x3e9fb1);return this[_0x56f9d6(0x44c)]=undefined,_0x54819e;},VisuMZ[_0x166c6b(0x435)]['Game_Actor_artifact']=Game_Actor[_0x166c6b(0x3f4)][_0x166c6b(0x563)],Game_Actor[_0x166c6b(0x3f4)][_0x166c6b(0x563)]=function(){const _0x5122d7=_0x166c6b;this[_0x5122d7(0x210)]=!![];const _0x5b2919=VisuMZ['ItemsEquipsCore']['Game_Actor_artifact'][_0x5122d7(0x2b5)](this);return this['_allowArtifactTraitObjects']=undefined,_0x5b2919;},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x257)]=Game_Actor[_0x166c6b(0x3f4)]['equips'],Game_Actor[_0x166c6b(0x3f4)]['equips']=function(){const _0x24e90a=_0x166c6b,_0x19ee5b=VisuMZ[_0x24e90a(0x435)][_0x24e90a(0x257)][_0x24e90a(0x2b5)](this);if(this[_0x24e90a(0x210)]||this[_0x24e90a(0x44c)]){const _0x3a604c=_0x19ee5b[_0x24e90a(0x1c5)]($gameParty[_0x24e90a(0x29a)]());return _0x3a604c;}else return _0x19ee5b;},VisuMZ['ItemsEquipsCore']['Game_BattlerBase_paramPlus_artifact']=Game_BattlerBase[_0x166c6b(0x3f4)][_0x166c6b(0x4c7)],Game_BattlerBase[_0x166c6b(0x3f4)][_0x166c6b(0x4c7)]=function(_0x5a73b7){const _0x57d9f2=_0x166c6b;let _0x35ee87=VisuMZ[_0x57d9f2(0x435)]['Game_BattlerBase_paramPlus_artifact'][_0x57d9f2(0x2b5)](this,_0x5a73b7);if(this[_0x57d9f2(0x3ba)]===Game_Enemy)for(const _0x2c86a1 of $gameParty[_0x57d9f2(0x1a1)]()){if(_0x2c86a1)_0x35ee87+=_0x2c86a1[_0x57d9f2(0x516)][_0x5a73b7];}return _0x35ee87;},VisuMZ[_0x166c6b(0x435)]['Game_Enemy_traitObjects_artifact']=Game_Enemy[_0x166c6b(0x3f4)]['traitObjects'],Game_Enemy[_0x166c6b(0x3f4)][_0x166c6b(0x563)]=function(){const _0x4f3a44=_0x166c6b;let _0x15ba4c=VisuMZ[_0x4f3a44(0x435)][_0x4f3a44(0x488)][_0x4f3a44(0x2b5)](this);return _0x15ba4c[_0x4f3a44(0x1c5)]($gameParty['troopArtifacts']());},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x1dc)]=Game_Party[_0x166c6b(0x3f4)][_0x166c6b(0x18f)],Game_Party[_0x166c6b(0x3f4)][_0x166c6b(0x18f)]=function(_0x5c6f2e,_0x4f7285,_0x312655){const _0x5883fa=_0x166c6b;VisuMZ['ItemsEquipsCore']['Game_Party_gainItem_artifact'][_0x5883fa(0x2b5)](this,_0x5c6f2e,_0x4f7285,_0x312655);if(DataManager[_0x5883fa(0x504)](_0x5c6f2e)){let _0x409edc=$gameParty[_0x5883fa(0x4c5)]();if($gameParty[_0x5883fa(0x1a0)]())_0x409edc=_0x409edc[_0x5883fa(0x1c5)]($gameTroop[_0x5883fa(0x3a4)]());for(const _0x44e71e of _0x409edc){if(!_0x44e71e)continue;_0x44e71e[_0x5883fa(0x59f)]={};}}},Game_Party[_0x166c6b(0x3f4)][_0x166c6b(0x29a)]=function(){const _0x1ba7a5=_0x166c6b;let _0x15521a=[];const _0x2887ec=VisuMZ[_0x1ba7a5(0x435)]['artifactIDs']['partyArtifactIDs'];if(_0x2887ec)for(const _0x3bb4a5 of _0x2887ec){const _0x60ff79=$dataArmors[_0x3bb4a5];if(!_0x60ff79)continue;if(!this[_0x1ba7a5(0x47b)](_0x60ff79))continue;let _0xc31b34=0x1;if(DataManager[_0x1ba7a5(0x1fd)](_0x60ff79))_0xc31b34=this[_0x1ba7a5(0x383)](_0x60ff79);while(_0xc31b34--)_0x15521a['push'](_0x60ff79);}return _0x15521a;},Game_Party[_0x166c6b(0x3f4)][_0x166c6b(0x1a1)]=function(){const _0x301756=_0x166c6b;let _0x8f48af=[];const _0x4c0a94=VisuMZ['ItemsEquipsCore']['artifactIDs'][_0x301756(0x2e9)];if(_0x4c0a94)for(const _0x5d1248 of _0x4c0a94){const _0x3e1bb1=$dataArmors[_0x5d1248];if(!_0x3e1bb1)continue;if(!this[_0x301756(0x47b)](_0x3e1bb1))continue;let _0x41626b=0x1;if(DataManager[_0x301756(0x1fd)](_0x3e1bb1))_0x41626b=this[_0x301756(0x383)](_0x3e1bb1);while(_0x41626b--)_0x8f48af[_0x301756(0x1c9)](_0x3e1bb1);}return _0x8f48af;},Game_Party[_0x166c6b(0x3f4)][_0x166c6b(0x4bc)]=function(){const _0x14cfc4=_0x166c6b;return this[_0x14cfc4(0x29a)]()[_0x14cfc4(0x1c5)](this[_0x14cfc4(0x1a1)]());},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x3b7)]=Game_Party[_0x166c6b(0x3f4)][_0x166c6b(0x278)],Game_Party[_0x166c6b(0x3f4)][_0x166c6b(0x278)]=function(){const _0x2d83da=_0x166c6b;VisuMZ[_0x2d83da(0x435)]['Game_Party_setupBattleTestItems_artifact'][_0x2d83da(0x2b5)](this),this[_0x2d83da(0x485)]();},Game_Party[_0x166c6b(0x3f4)][_0x166c6b(0x485)]=function(){const _0x20574f=_0x166c6b,_0x218793=$gameParty[_0x20574f(0x3b2)]()['filter'](_0xa0dffd=>DataManager['isArtifact'](_0xa0dffd));for(const _0x5309e0 of _0x218793){const _0x32ad33=this['numItems'](_0x5309e0);if(_0x32ad33)this[_0x20574f(0x314)](_0x5309e0,_0x32ad33);}},DataManager['meetsClassRequirements']=function(_0x5979ac,_0x23b3ee){const _0x9a6f4f=_0x166c6b;if(this[_0x9a6f4f(0x45f)](_0x23b3ee))return![];if(!_0x5979ac)return![];if($gameTemp[_0x9a6f4f(0x3c8)])return!![];if(BattleManager['isBattleTest']())return!![];const _0x5e691a=this[_0x9a6f4f(0x399)](_0x23b3ee);if(_0x5e691a['length']<=0x0)return!![];return _0x5e691a[_0x9a6f4f(0x175)](_0x5979ac[_0x9a6f4f(0x1ed)]()['id']);},DataManager[_0x166c6b(0x399)]=function(_0x15391c){const _0x107697=_0x166c6b;if(!_0x15391c)return[];this['_getClassRequirements']=this[_0x107697(0x198)]||{};const _0xf52ff6='%1-%2'['format'](this[_0x107697(0x4e6)](_0x15391c)?_0x107697(0x1eb):_0x107697(0x208),_0x15391c['id']);if(this[_0x107697(0x198)][_0xf52ff6]!==undefined)return this[_0x107697(0x198)][_0xf52ff6];let _0xb38782=[];const _0xee351c=_0x15391c[_0x107697(0x1a6)]||'';if(_0xee351c[_0x107697(0x346)](/<EQUIP FOR CLASS(?:|ES) ONLY:[ ](.*)>/i)){const _0x3924d8=String(RegExp['$1'])[_0x107697(0x3c7)](',')['map'](_0xb07450=>_0xb07450[_0x107697(0x507)]());for(const _0x7766d6 of _0x3924d8){const _0x3153d3=/^\d+$/[_0x107697(0x4d1)](_0x7766d6);_0x3153d3?_0xb38782[_0x107697(0x1c9)](Number(_0x7766d6)):_0xb38782['push'](DataManager['getClassIdWithName'](_0x7766d6));}}return this[_0x107697(0x198)][_0xf52ff6]=_0xb38782,this[_0x107697(0x198)][_0xf52ff6];},DataManager[_0x166c6b(0x1b6)]=function(_0x43f777,_0x123cbf){const _0x223f3f=_0x166c6b;if(this[_0x223f3f(0x45f)](_0x123cbf))return![];if(!_0x43f777)return![];if($gameTemp[_0x223f3f(0x3c8)])return!![];if(BattleManager[_0x223f3f(0x264)]())return!![];const _0x676773=this[_0x223f3f(0x280)](_0x123cbf);for(const _0x28c208 of _0x676773){if(!this[_0x223f3f(0x433)](_0x43f777,_0x28c208))return![];}return!![];},DataManager[_0x166c6b(0x280)]=function(_0x14e91f){const _0x5b4842=_0x166c6b;if(!_0x14e91f)return[];this[_0x5b4842(0x348)]=this[_0x5b4842(0x348)]||{};const _0x2c039e=_0x5b4842(0x221)[_0x5b4842(0x505)](this[_0x5b4842(0x4e6)](_0x14e91f)?'WEAPON':'ARMOR',_0x14e91f['id']);if(this[_0x5b4842(0x348)][_0x2c039e]!==undefined)return this[_0x5b4842(0x348)][_0x2c039e];let _0x4c83cc=[];const _0x116c7f=_0x14e91f[_0x5b4842(0x1a6)]||'';return _0x116c7f[_0x5b4842(0x346)](/<EQUIP(?:|MENT)[ ]REQUIREMENT(?:|S)>\s*([\s\S]*)\s*<\/EQUIP(?:|MENT)[ ]REQUIREMENT(?:|S)>/i)&&(_0x4c83cc=String(RegExp['$1'])[_0x5b4842(0x3c7)](/[\r\n]+/)),this[_0x5b4842(0x348)][_0x2c039e]=_0x4c83cc,this[_0x5b4842(0x348)][_0x2c039e];},DataManager[_0x166c6b(0x433)]=function(_0x565c17,_0x46fa18){const _0x1f5bb0=_0x166c6b;if(_0x46fa18[_0x1f5bb0(0x346)](/(?:LEVEL|LV|LVL)[ ](>|>=|===|<=|<)[ ](\d+)/i)){const _0x533f99=String(RegExp['$1'])['trim'](),_0x537994=Number(RegExp['$2']);switch(_0x533f99){case'>':return _0x565c17[_0x1f5bb0(0x46e)]>_0x537994;case'>=':return _0x565c17[_0x1f5bb0(0x46e)]>=_0x537994;case'===':return _0x565c17[_0x1f5bb0(0x46e)]===_0x537994;case'<=':return _0x565c17[_0x1f5bb0(0x46e)]<=_0x537994;case'<':return _0x565c17['level']<_0x537994;}return![];}if(_0x46fa18[_0x1f5bb0(0x346)](/(MAXHP|MAXMP|MHP|MMP)[ ](>|>=|===|<=|<)[ ](\d+)/i)){const _0x52e37f=String(RegExp['$1'])[_0x1f5bb0(0x1cb)]()['trim'](),_0x330122=String(RegExp['$2'])['trim'](),_0x495666=Number(RegExp['$3']);let _0x2e77f3=0x0;if([_0x1f5bb0(0x4b2),_0x1f5bb0(0x4f1)][_0x1f5bb0(0x175)](_0x52e37f))_0x2e77f3=0x1;const _0x342d6b=_0x565c17['_paramPlus'][_0x2e77f3]||0x0;switch(_0x330122){case'>':return _0x565c17[_0x1f5bb0(0x35f)](_0x2e77f3)+_0x342d6b>_0x495666;case'>=':return _0x565c17[_0x1f5bb0(0x35f)](_0x2e77f3)+_0x342d6b>=_0x495666;case _0x1f5bb0(0x39a):return _0x565c17['paramBase'](_0x2e77f3)+_0x342d6b===_0x495666;case'<=':return _0x565c17['paramBase'](_0x2e77f3)+_0x342d6b<=_0x495666;case'<':return _0x565c17['paramBase'](_0x2e77f3)+_0x342d6b<_0x495666;}return![];}if(_0x46fa18[_0x1f5bb0(0x346)](/(ATK|DEF|MAT|MDF|AGI|LUK)[ ](>|>=|===|<=|<)[ ](\d+)/i)){const _0x5d20ea=String(RegExp['$1'])[_0x1f5bb0(0x1cb)]()[_0x1f5bb0(0x507)](),_0x42f97c=String(RegExp['$2'])['trim'](),_0x273483=Number(RegExp['$3']),_0x1f3e20=[_0x1f5bb0(0x43c),'def',_0x1f5bb0(0x1de),_0x1f5bb0(0x4fc),'agi',_0x1f5bb0(0x510)];let _0x3142d0=_0x1f3e20[_0x1f5bb0(0x47a)](_0x5d20ea)+0x2;if(_0x3142d0<0x2)return![];const _0x3b06f2=_0x565c17[_0x1f5bb0(0x46b)][_0x3142d0]||0x0;switch(_0x42f97c){case'>':return _0x565c17[_0x1f5bb0(0x35f)](_0x3142d0)+_0x3b06f2>_0x273483;case'>=':return _0x565c17[_0x1f5bb0(0x35f)](_0x3142d0)+_0x3b06f2>=_0x273483;case _0x1f5bb0(0x39a):return _0x565c17[_0x1f5bb0(0x35f)](_0x3142d0)+_0x3b06f2===_0x273483;case'<=':return _0x565c17[_0x1f5bb0(0x35f)](_0x3142d0)+_0x3b06f2<=_0x273483;case'<':return _0x565c17[_0x1f5bb0(0x35f)](_0x3142d0)+_0x3b06f2<_0x273483;}return![];}if(_0x46fa18[_0x1f5bb0(0x346)](/LEARNED SKILL:[ ](\d+)/i)){const _0x32622d=Number(RegExp['$1']);return _0x565c17['isLearnedSkill'](_0x32622d);}else{if(_0x46fa18[_0x1f5bb0(0x346)](/LEARNED SKILL:[ ](.*)/i)){const _0x10c7f4=String(RegExp['$1']),_0x36d33b=this['getSkillIdWithName'](_0x10c7f4);return _0x565c17['isLearnedSkill'](_0x36d33b);}}if(_0x46fa18[_0x1f5bb0(0x346)](/SWITCH:[ ](\d+)/i)){const _0xe81798=Number(RegExp['$1']);return $gameSwitches[_0x1f5bb0(0x2c7)](_0xe81798);}return!![];},DataManager['getEtypeIDs']=function(_0x1299d9){const _0x292135=_0x166c6b;return this[_0x292135(0x3c2)](_0x1299d9)?this[_0x292135(0x3d1)](_0x1299d9):[_0x1299d9[_0x292135(0x400)]||0x0];},DataManager[_0x166c6b(0x3d1)]=function(_0x710355){const _0x26b926=_0x166c6b;this[_0x26b926(0x480)]=this[_0x26b926(0x480)]||{};if(this['_cache_etypeIDs'][_0x710355['id']]!==undefined)return this['_cache_etypeIDs'][_0x710355['id']];this[_0x26b926(0x480)][_0x710355['id']]=[_0x710355[_0x26b926(0x400)]||0x0];const _0x269099=_0x710355[_0x26b926(0x1a6)]||'';if(_0x269099[_0x26b926(0x346)](/<ADDED ETYPE(?:|S):[ ](.*)>/i)){const _0x4a204c=String(RegExp['$1'])[_0x26b926(0x3c7)](',')[_0x26b926(0x436)](_0x309bcd=>_0x309bcd[_0x26b926(0x507)]());for(const _0x52a2d2 of _0x4a204c){const _0x2b070a=/^\d+$/[_0x26b926(0x4d1)](_0x52a2d2);let _0x29bdf9=0x0;_0x2b070a?_0x29bdf9=Number(_0x52a2d2):_0x29bdf9=this[_0x26b926(0x295)](_0x52a2d2),_0x29bdf9>0x1&&this[_0x26b926(0x480)][_0x710355['id']][_0x26b926(0x1c9)](_0x29bdf9);}}return this[_0x26b926(0x480)][_0x710355['id']];},Game_BattlerBase['prototype'][_0x166c6b(0x511)]=function(_0xdadbd9){const _0x2929df=_0x166c6b;return this[_0x2929df(0x46d)](_0xdadbd9[_0x2929df(0x443)])&&!this[_0x2929df(0x414)](_0xdadbd9['etypeId'])&&DataManager[_0x2929df(0x23a)](_0xdadbd9)['every'](_0x174df2=>!this['isEquipTypeSealed'](_0x174df2));},DataManager[_0x166c6b(0x57c)]=function(_0x46d450){const _0x574702=_0x166c6b;if(!this[_0x574702(0x4e6)](_0x46d450)&&!this[_0x574702(0x3c2)](_0x46d450))return![];if(Imported[_0x574702(0x2d1)]&&this['isWeapon'](_0x46d450))return![];if(!_0x46d450['note'])return![];return _0x46d450[_0x574702(0x1a6)]['match'](/<CURSED>/i);},DataManager[_0x166c6b(0x475)]=function(_0x142b54){const _0xb91abb=_0x166c6b;if(!_0x142b54)return _0x142b54;if(!this[_0xb91abb(0x4e6)](_0x142b54)&&!this[_0xb91abb(0x3c2)](_0x142b54))return _0x142b54;if(_0x142b54['note'][_0xb91abb(0x346)](/<PURIFY TRANSFORM:[ ](.*)>/i)){const _0x3eb7e3=String(RegExp['$1'])[_0xb91abb(0x507)](),_0x58f803=/^\d+$/['test'](_0x3eb7e3);if(_0x58f803){if(this[_0xb91abb(0x4e6)](_0x142b54))return $dataWeapons[Number(_0x3eb7e3)];if(this[_0xb91abb(0x3c2)](_0x142b54))return $dataArmors[Number(_0x3eb7e3)];}else{if(this[_0xb91abb(0x4e6)](_0x142b54))return $dataWeapons[this[_0xb91abb(0x269)](_0x3eb7e3)];if(this['isArmor'](_0x142b54))return $dataArmors[this['getArmorIdWithName'](_0x3eb7e3)];}}return _0x142b54;},Game_Party[_0x166c6b(0x3f4)][_0x166c6b(0x534)]=function(){const _0x4bacc9=_0x166c6b,_0x57defd=this[_0x4bacc9(0x4c5)]();for(const _0x3d77c0 of _0x57defd){if(!_0x3d77c0)continue;_0x3d77c0[_0x4bacc9(0x534)]();}},Game_Actor[_0x166c6b(0x3f4)]['purifyCursedEquips']=function(){const _0x96cb67=_0x166c6b,_0x494a6c=this[_0x96cb67(0x190)]()[_0x96cb67(0x514)];for(let _0x23fe95=0x0;_0x23fe95<_0x494a6c;_0x23fe95++){const _0x40d68f=this[_0x96cb67(0x378)][_0x23fe95];if(!_0x40d68f)continue;const _0x3337ac=_0x40d68f[_0x96cb67(0x50a)]();if(!DataManager['isCursedItem'](_0x3337ac))continue;let _0x39601d=DataManager[_0x96cb67(0x475)](_0x3337ac);this[_0x96cb67(0x2e1)](_0x3337ac,_0x39601d)?(!this[_0x96cb67(0x378)][_0x23fe95]&&(this[_0x96cb67(0x378)][_0x23fe95]=new Game_Item()),this['_equips'][_0x23fe95][_0x96cb67(0x17d)](_0x39601d),this[_0x96cb67(0x1f1)]()):this[_0x96cb67(0x22f)](_0x23fe95,null);}},Game_Actor['prototype'][_0x166c6b(0x2e1)]=function(_0x115e59,_0x5a9a77){const _0x2bd182=_0x166c6b;if(_0x115e59===_0x5a9a77)return![];const _0x553ae1=DataManager['getEtypeIDs'](_0x5a9a77);if(!_0x553ae1[_0x2bd182(0x175)](_0x115e59[_0x2bd182(0x400)]))return![];if(DataManager[_0x2bd182(0x4e6)](_0x5a9a77))return this[_0x2bd182(0x409)](_0x5a9a77['wtypeId']);else{if(DataManager[_0x2bd182(0x3c2)](_0x5a9a77))return this[_0x2bd182(0x46d)](_0x5a9a77['atypeId']);}return![];},TextManager[_0x166c6b(0x2b9)]={'helpDesc':{'equip':VisuMZ['ItemsEquipsCore']['Settings']['EquipScene'][_0x166c6b(0x41f)]??_0x166c6b(0x4d8),'optimize':VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x43a)][_0x166c6b(0x4e2)][_0x166c6b(0x273)]??'Equip\x20the\x20strongest\x20available\x20equipment.','clear':VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x43a)][_0x166c6b(0x4e2)][_0x166c6b(0x178)]??_0x166c6b(0x1ef)}},ColorManager[_0x166c6b(0x4cb)]=function(_0x13d9b5){const _0x2a9c7b=_0x166c6b;if(!_0x13d9b5)return this[_0x2a9c7b(0x57a)]();else{if(_0x13d9b5[_0x2a9c7b(0x1a6)][_0x2a9c7b(0x346)](/<COLOR:[ ](\d+)>/i))return this[_0x2a9c7b(0x3fe)](Number(RegExp['$1'])[_0x2a9c7b(0x1ce)](0x0,0x1f));else return _0x13d9b5[_0x2a9c7b(0x1a6)][_0x2a9c7b(0x346)](/<COLOR:[ ]#(.*)>/i)?'#'+String(RegExp['$1']):this[_0x2a9c7b(0x57a)]();}},ColorManager['getColor']=function(_0x471178){const _0x36b81d=_0x166c6b;return _0x471178=String(_0x471178),_0x471178['match'](/#(.*)/i)?_0x36b81d(0x277)[_0x36b81d(0x505)](String(RegExp['$1'])):this[_0x36b81d(0x3fe)](Number(_0x471178));},SceneManager['isSceneShop']=function(){const _0xe92fc6=_0x166c6b;return this[_0xe92fc6(0x538)]&&this[_0xe92fc6(0x538)][_0xe92fc6(0x3ba)]===Scene_Shop;},Game_Temp[_0x166c6b(0x3f4)]['newLabelEnabled']=function(){const _0x547ea9=_0x166c6b;if(this[_0x547ea9(0x2e3)])return![];return VisuMZ[_0x547ea9(0x435)][_0x547ea9(0x43a)][_0x547ea9(0x500)][_0x547ea9(0x229)];},VisuMZ[_0x166c6b(0x20f)]=VisuMZ['ItemsEquipsCore'][_0x166c6b(0x43a)][_0x166c6b(0x247)]['MultiplierStandard'],VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x15b)]=Game_BattlerBase[_0x166c6b(0x3f4)][_0x166c6b(0x40a)],Game_BattlerBase[_0x166c6b(0x3f4)][_0x166c6b(0x40a)]=function(_0x5ad425){const _0x56a131=_0x166c6b;return this['_shopStatusMenuMode']?this[_0x56a131(0x4d6)]?VisuMZ['ShopMenuStatusStandard']:0x1:VisuMZ[_0x56a131(0x435)][_0x56a131(0x15b)][_0x56a131(0x2b5)](this,_0x5ad425);},VisuMZ[_0x166c6b(0x435)]['Game_BattlerBase_meetsItemConditions']=Game_BattlerBase[_0x166c6b(0x3f4)][_0x166c6b(0x586)],Game_BattlerBase[_0x166c6b(0x3f4)][_0x166c6b(0x586)]=function(_0xb0a747){const _0x1fc530=_0x166c6b;if(!_0xb0a747)return![];if(!VisuMZ[_0x1fc530(0x435)][_0x1fc530(0x58b)][_0x1fc530(0x2b5)](this,_0xb0a747))return![];if(!this['meetsItemConditionsNotetags'](_0xb0a747))return![];if(!this['meetsItemConditionsJS'](_0xb0a747))return![];return!![];},Game_BattlerBase[_0x166c6b(0x3f4)][_0x166c6b(0x2fa)]=function(_0xdc7d9c){const _0x12c100=_0x166c6b;if(!this[_0x12c100(0x50b)](_0xdc7d9c))return![];return!![];},Game_BattlerBase[_0x166c6b(0x3f4)][_0x166c6b(0x50b)]=function(_0x5da6d5){const _0x331b82=_0x166c6b,_0xe34fe0=_0x5da6d5[_0x331b82(0x1a6)];if(_0xe34fe0[_0x331b82(0x346)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x29cdb8=JSON[_0x331b82(0x2f1)]('['+RegExp['$1'][_0x331b82(0x346)](/\d+/g)+']');for(const _0x355e15 of _0x29cdb8){if(!$gameSwitches[_0x331b82(0x2c7)](_0x355e15))return![];}return!![];}if(_0xe34fe0['match'](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3ea0bd=JSON['parse']('['+RegExp['$1'][_0x331b82(0x346)](/\d+/g)+']');for(const _0x8f937b of _0x3ea0bd){if(!$gameSwitches['value'](_0x8f937b))return![];}return!![];}if(_0xe34fe0['match'](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x253422=JSON[_0x331b82(0x2f1)]('['+RegExp['$1'][_0x331b82(0x346)](/\d+/g)+']');for(const _0x280345 of _0x253422){if($gameSwitches[_0x331b82(0x2c7)](_0x280345))return!![];}return![];}if(_0xe34fe0[_0x331b82(0x346)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x43e85b=JSON[_0x331b82(0x2f1)]('['+RegExp['$1'][_0x331b82(0x346)](/\d+/g)+']');for(const _0x22c4ef of _0x43e85b){if(!$gameSwitches[_0x331b82(0x2c7)](_0x22c4ef))return!![];}return![];}if(_0xe34fe0[_0x331b82(0x346)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1a2db7=JSON[_0x331b82(0x2f1)]('['+RegExp['$1'][_0x331b82(0x346)](/\d+/g)+']');for(const _0x1ea580 of _0x1a2db7){if(!$gameSwitches[_0x331b82(0x2c7)](_0x1ea580))return!![];}return![];}if(_0xe34fe0['match'](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3491a9=JSON[_0x331b82(0x2f1)]('['+RegExp['$1'][_0x331b82(0x346)](/\d+/g)+']');for(const _0x4f780e of _0x3491a9){if($gameSwitches[_0x331b82(0x2c7)](_0x4f780e))return![];}return!![];}return!![];},Game_BattlerBase['prototype']['meetsItemConditionsJS']=function(_0x375e4f){const _0x47938b=_0x166c6b,_0x4175b0=_0x375e4f['note'],_0x400e49=VisuMZ['ItemsEquipsCore'][_0x47938b(0x3c4)];return _0x400e49[_0x375e4f['id']]?_0x400e49[_0x375e4f['id']][_0x47938b(0x2b5)](this,_0x375e4f):!![];},Game_Actor[_0x166c6b(0x3f4)]['clearEquipments']=function(){const _0x575c65=_0x166c6b,_0x2e8a87=this['equipSlots']()['length'];for(let _0x86054c=0x0;_0x86054c<_0x2e8a87;_0x86054c++){if(this[_0x575c65(0x49e)](_0x86054c))this[_0x575c65(0x22f)](_0x86054c,null);}},Game_Actor['prototype'][_0x166c6b(0x49e)]=function(_0x2a7990){const _0x592a19=_0x166c6b;return this[_0x592a19(0x33a)]()[_0x592a19(0x175)](this[_0x592a19(0x190)]()[_0x2a7990])?![]:this[_0x592a19(0x4dc)](_0x2a7990);},Game_Actor[_0x166c6b(0x3f4)]['nonRemovableEtypes']=function(){const _0x43d358=_0x166c6b;return VisuMZ[_0x43d358(0x435)][_0x43d358(0x43a)][_0x43d358(0x4e2)][_0x43d358(0x248)];},Game_Actor[_0x166c6b(0x3f4)][_0x166c6b(0x368)]=function(){const _0x31c520=_0x166c6b,_0x2b8a4c=this[_0x31c520(0x190)]()['length'];for(let _0x40d6a3=0x0;_0x40d6a3<_0x2b8a4c;_0x40d6a3++){if(this[_0x31c520(0x180)](_0x40d6a3))this[_0x31c520(0x22f)](_0x40d6a3,null);}for(let _0x236e56=0x0;_0x236e56<_0x2b8a4c;_0x236e56++){if(this[_0x31c520(0x180)](_0x236e56))this['changeEquip'](_0x236e56,this[_0x31c520(0x447)](_0x236e56));}},Game_Actor[_0x166c6b(0x3f4)][_0x166c6b(0x180)]=function(_0x36e684){const _0x3e7cf7=_0x166c6b;return this[_0x3e7cf7(0x55f)]()[_0x3e7cf7(0x175)](this[_0x3e7cf7(0x190)]()[_0x36e684])?![]:this[_0x3e7cf7(0x4dc)](_0x36e684);},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x2b2)]=Game_Actor[_0x166c6b(0x3f4)][_0x166c6b(0x4dc)],Game_Actor['prototype']['isEquipChangeOk']=function(_0x8d7aa5){const _0x40a99f=_0x166c6b;!this[_0x40a99f(0x378)][_0x8d7aa5]&&(this[_0x40a99f(0x378)][_0x8d7aa5]=new Game_Item());const _0x40e3be=this[_0x40a99f(0x378)][_0x8d7aa5];if(_0x40e3be){const _0x401ba7=_0x40e3be[_0x40a99f(0x50a)]();if(DataManager['isCursedItem'](_0x401ba7))return![];}return VisuMZ[_0x40a99f(0x435)]['Game_Actor_isEquipChangeOk'][_0x40a99f(0x2b5)](this,_0x8d7aa5);},Game_Actor[_0x166c6b(0x3f4)][_0x166c6b(0x55f)]=function(){const _0x5b2ccf=_0x166c6b;return VisuMZ[_0x5b2ccf(0x435)]['Settings'][_0x5b2ccf(0x4e2)][_0x5b2ccf(0x176)];},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x26d)]=Game_Actor['prototype']['tradeItemWithParty'],Game_Actor[_0x166c6b(0x3f4)][_0x166c6b(0x2f3)]=function(_0x384abc,_0x40c0f7){const _0x1f8e80=_0x166c6b;if(this[_0x1f8e80(0x2bb)])return![];$gameTemp[_0x1f8e80(0x2e3)]=!![];const _0x299fd4=VisuMZ[_0x1f8e80(0x435)][_0x1f8e80(0x26d)][_0x1f8e80(0x2b5)](this,_0x384abc,_0x40c0f7);return $gameTemp['_bypassNewLabel']=![],_0x299fd4;},Game_Actor[_0x166c6b(0x3f4)][_0x166c6b(0x446)]=function(_0x5d5bef,_0x2d628f){const _0x5ab48d=this['getNextAvailableEtypeId'](_0x5d5bef);if(_0x5ab48d<0x0)return;const _0x460334=_0x5d5bef===0x1?$dataWeapons[_0x2d628f]:$dataArmors[_0x2d628f];this['changeEquip'](_0x5ab48d,_0x460334);},Game_Actor[_0x166c6b(0x3f4)][_0x166c6b(0x184)]=function(_0x2d1512){const _0x24d4c6=_0x166c6b;let _0x44e24a=0x0;const _0x18b4d1=this[_0x24d4c6(0x190)](),_0x4d3bae=this[_0x24d4c6(0x591)]();for(let _0x49582d=0x0;_0x49582d<_0x18b4d1[_0x24d4c6(0x514)];_0x49582d++){if(_0x18b4d1[_0x49582d]===_0x2d1512){_0x44e24a=_0x49582d;if(!_0x4d3bae[_0x49582d])return _0x44e24a;}}return _0x44e24a;},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x428)]=Game_Actor['prototype'][_0x166c6b(0x4c7)],Game_Actor['prototype'][_0x166c6b(0x4c7)]=function(_0x165334){const _0x1616d7=_0x166c6b;let _0x23a734=VisuMZ[_0x1616d7(0x435)][_0x1616d7(0x428)][_0x1616d7(0x2b5)](this,_0x165334);for(const _0x2fe960 of this['equips']()){if(_0x2fe960)_0x23a734+=this[_0x1616d7(0x322)](_0x2fe960,_0x165334);}return _0x23a734;},Game_Actor[_0x166c6b(0x3f4)]['paramPlusItemsEquipsCoreCustomJS']=function(_0x435ac4,_0x2deb7c){const _0x32cc77=_0x166c6b;if(this['_calculatingJSParameters'])return 0x0;const _0x250894=(DataManager[_0x32cc77(0x4e6)](_0x435ac4)?_0x32cc77(0x1f2):_0x32cc77(0x267))[_0x32cc77(0x505)](_0x435ac4['id']),_0x30684e='%1-%2'['format'](_0x250894,_0x2deb7c);if(VisuMZ[_0x32cc77(0x435)][_0x32cc77(0x595)][_0x30684e]){this[_0x32cc77(0x1ee)]=!![];const _0x1d8869=VisuMZ['ItemsEquipsCore'][_0x32cc77(0x595)][_0x30684e]['call'](this,_0x435ac4,_0x2deb7c);return this['_calculatingJSParameters']=![],_0x1d8869;}else return 0x0;},Game_Actor[_0x166c6b(0x3f4)]['setShopStatusWindowMode']=function(_0x5e5f9e){const _0xbc50c0=_0x166c6b;this[_0xbc50c0(0x467)]=!![],this['_shopStatusMenuAlly']=_0x5e5f9e;},Game_Actor[_0x166c6b(0x3f4)][_0x166c6b(0x496)]=function(_0x18c6c6){const _0xde65c7=_0x166c6b;_0x18c6c6=this[_0xde65c7(0x539)](_0x18c6c6);const _0x506a6e=this[_0xde65c7(0x190)]();this[_0xde65c7(0x378)]=[];for(let _0x2f5e80=0x0;_0x2f5e80<_0x506a6e['length'];_0x2f5e80++){this[_0xde65c7(0x378)][_0x2f5e80]=new Game_Item();}for(let _0x457905=0x0;_0x457905<_0x506a6e['length'];_0x457905++){const _0x129ec5=_0x506a6e[_0x457905],_0x327733=this[_0xde65c7(0x4c6)](_0x18c6c6,_0x129ec5);if(this[_0xde65c7(0x43f)](_0x327733))this[_0xde65c7(0x378)][_0x457905][_0xde65c7(0x17d)](_0x327733);}this[_0xde65c7(0x50e)](!![]),this['refresh']();},Game_Actor[_0x166c6b(0x3f4)][_0x166c6b(0x539)]=function(_0x4a679d){const _0x3ea0c5=_0x166c6b,_0x184412=[];for(let _0x2d712b=0x0;_0x2d712b<_0x4a679d[_0x3ea0c5(0x514)];_0x2d712b++){const _0x5287d3=_0x4a679d[_0x2d712b];if(_0x5287d3<=0x0)continue;const _0x5d7807=$dataSystem['equipTypes'][_0x2d712b+0x1];if(_0x5d7807===$dataSystem[_0x3ea0c5(0x244)][0x1]||_0x2d712b===0x1&&this[_0x3ea0c5(0x558)]())_0x184412[_0x3ea0c5(0x1c9)]($dataWeapons[_0x5287d3]);else{if(BattleManager[_0x3ea0c5(0x264)]()){const _0x2709ec=$dataArmors[_0x5287d3];_0x2709ec&&_0x2709ec[_0x3ea0c5(0x400)]===_0x2d712b+0x1&&_0x184412[_0x3ea0c5(0x1c9)](_0x2709ec);}else{const _0x489278=$dataArmors[_0x5287d3];_0x489278&&_0x489278[_0x3ea0c5(0x400)]===_0x2d712b+0x1&&_0x184412[_0x3ea0c5(0x1c9)](_0x489278);}}}return _0x184412;},Game_Actor[_0x166c6b(0x3f4)]['getMatchingInitEquip']=function(_0x398a23,_0x29d65b){const _0x225079=_0x166c6b;for(const _0x264d3a of _0x398a23){if(!_0x264d3a)continue;if(_0x264d3a[_0x225079(0x400)]===_0x29d65b)return _0x398a23[_0x225079(0x59a)](_0x398a23['indexOf'](_0x264d3a),0x1),_0x264d3a;}return null;},Game_Actor[_0x166c6b(0x3f4)]['equipSlots']=function(){const _0x257ee8=_0x166c6b,_0x3b6d2b=VisuMZ[_0x257ee8(0x435)][_0x257ee8(0x366)](this[_0x257ee8(0x3fd)]||this['currentClass']()['equipSlots']);if(_0x3b6d2b['length']>=0x2&&this[_0x257ee8(0x558)]())_0x3b6d2b[0x1]=0x1;return _0x3b6d2b;},Game_Actor['prototype'][_0x166c6b(0x521)]=function(_0x437f04){const _0x42ad73=_0x166c6b;_0x437f04[_0x42ad73(0x2e8)](0x0),_0x437f04[_0x42ad73(0x2e8)](-0x1),this[_0x42ad73(0x3fd)]=_0x437f04,this[_0x42ad73(0x1f1)](),this['updateChangedSlots']();},Game_Actor[_0x166c6b(0x3f4)][_0x166c6b(0x3dd)]=function(){const _0x142e49=_0x166c6b;this[_0x142e49(0x3fd)]=undefined,this[_0x142e49(0x1f1)](),this['updateChangedSlots']();},Game_Actor['prototype'][_0x166c6b(0x215)]=function(){const _0x2f6beb=_0x166c6b;let _0x36c4f9=this[_0x2f6beb(0x190)]()[_0x2f6beb(0x514)];while(this[_0x2f6beb(0x378)]['length']>_0x36c4f9){const _0x2534f6=this[_0x2f6beb(0x378)][this[_0x2f6beb(0x378)]['length']-0x1];_0x2534f6&&_0x2534f6[_0x2f6beb(0x50a)]()&&$gameParty['gainItem'](_0x2534f6['object'](),0x1),this[_0x2f6beb(0x378)][_0x2f6beb(0x2a7)]();}while(_0x36c4f9>this[_0x2f6beb(0x378)][_0x2f6beb(0x514)]){this[_0x2f6beb(0x378)][_0x2f6beb(0x1c9)](new Game_Item());}},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x159)]=Game_Actor['prototype']['changeClass'],Game_Actor[_0x166c6b(0x3f4)][_0x166c6b(0x1d5)]=function(_0x540aad,_0xa1ebee){const _0xd9f786=_0x166c6b;VisuMZ['ItemsEquipsCore']['Game_Actor_changeClass'][_0xd9f786(0x2b5)](this,_0x540aad,_0xa1ebee),this['updateChangedSlots']();},Game_Actor[_0x166c6b(0x3f4)]['prepareNewEquipSlotsOnLoad']=function(){const _0x2e557b=_0x166c6b,_0x21dbf0=this['equipSlots']();for(let _0x1a94ac=0x0;_0x1a94ac<_0x21dbf0['length'];_0x1a94ac++){if(!this['_equips'][_0x1a94ac])this[_0x2e557b(0x378)][_0x1a94ac]=new Game_Item();}this[_0x2e557b(0x50e)](![]),this['refresh']();},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x25f)]=Game_Actor[_0x166c6b(0x3f4)][_0x166c6b(0x22f)],Game_Actor['prototype'][_0x166c6b(0x22f)]=function(_0x1c094b,_0xadf0f){const _0xa04055=_0x166c6b;if(!this[_0xa04055(0x2bb)]){const _0x137974=JsonEx[_0xa04055(0x32c)](this);_0x137974[_0xa04055(0x2bb)]=!![],this[_0xa04055(0x53e)](_0x1c094b,_0xadf0f),this[_0xa04055(0x292)](_0x137974);}else this[_0xa04055(0x53e)](_0x1c094b,_0xadf0f);},VisuMZ['ItemsEquipsCore'][_0x166c6b(0x52e)]=Game_Actor['prototype']['forceChangeEquip'],Game_Actor[_0x166c6b(0x3f4)]['forceChangeEquip']=function(_0x36a936,_0x29fc8f){const _0x21c048=_0x166c6b;!this['_equips'][_0x36a936]&&(this['_equips'][_0x36a936]=new Game_Item());if(!this[_0x21c048(0x2bb)]){const _0x2618ee=JsonEx[_0x21c048(0x32c)](this);_0x2618ee[_0x21c048(0x2bb)]=!![],VisuMZ[_0x21c048(0x435)][_0x21c048(0x52e)]['call'](this,_0x36a936,_0x29fc8f),this[_0x21c048(0x292)](_0x2618ee);}else VisuMZ['ItemsEquipsCore']['Game_Actor_forceChangeEquip'][_0x21c048(0x2b5)](this,_0x36a936,_0x29fc8f);},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x338)]=Game_Actor[_0x166c6b(0x3f4)][_0x166c6b(0x3f1)],Game_Actor[_0x166c6b(0x3f4)][_0x166c6b(0x3f1)]=function(_0x58c782){const _0x464ca0=_0x166c6b;if(!this['_tempActor']){const _0x224f66=JsonEx['makeDeepCopy'](this);_0x224f66['_tempActor']=!![],VisuMZ[_0x464ca0(0x435)][_0x464ca0(0x338)][_0x464ca0(0x2b5)](this,_0x58c782),this[_0x464ca0(0x292)](_0x224f66);}else VisuMZ[_0x464ca0(0x435)][_0x464ca0(0x338)][_0x464ca0(0x2b5)](this,_0x58c782);},Game_Actor[_0x166c6b(0x3f4)][_0x166c6b(0x50e)]=function(_0x250bd7){const _0x30b64d=_0x166c6b;if(this[_0x30b64d(0x423)])return;let _0x5362d8=0x0;for(;;){_0x5362d8++;if(_0x5362d8>0x3)break;const _0x40be52=this[_0x30b64d(0x190)](),_0x4a1033=this['equips'](),_0x5b0e10=_0x4a1033[_0x30b64d(0x514)];let _0x3eac37=![];for(let _0x1b79e8=0x0;_0x1b79e8<_0x5b0e10;_0x1b79e8++){const _0x5f436b=_0x4a1033[_0x1b79e8];if(!_0x5f436b)continue;const _0x3a3d90=DataManager[_0x30b64d(0x23a)](_0x5f436b);if(!this[_0x30b64d(0x43f)](_0x5f436b)||!_0x3a3d90['includes'](_0x40be52[_0x1b79e8])){!_0x250bd7&&this[_0x30b64d(0x2f3)](null,_0x5f436b);if(!this[_0x30b64d(0x2bb)]){const _0x241ff3=JsonEx[_0x30b64d(0x32c)](this);_0x241ff3[_0x30b64d(0x2bb)]=!![],this[_0x30b64d(0x378)][_0x1b79e8]['setObject'](null),this['_bypassReleaseUnequippableItemsItemsEquipsCore']=!![],this[_0x30b64d(0x292)](_0x241ff3),this['_bypassReleaseUnequippableItemsItemsEquipsCore']=undefined;}else{if(this[_0x30b64d(0x378)][_0x1b79e8])this[_0x30b64d(0x378)][_0x1b79e8][_0x30b64d(0x17d)](null);else continue;}_0x3eac37=!![];}}if(!_0x3eac37)break;}},Game_Actor[_0x166c6b(0x3f4)][_0x166c6b(0x292)]=function(_0x584f8f){const _0xfe89e0=_0x166c6b;if(this[_0xfe89e0(0x2bb)])return;if(!VisuMZ[_0xfe89e0(0x435)]['Settings'][_0xfe89e0(0x4e2)][_0xfe89e0(0x3fc)])return;const _0x29e460=Math[_0xfe89e0(0x2eb)](_0x584f8f['hpRate']()*this[_0xfe89e0(0x339)]),_0x415eea=Math[_0xfe89e0(0x2eb)](_0x584f8f[_0xfe89e0(0x44d)]()*this[_0xfe89e0(0x4f1)]);if(this['hp']>0x0)this['setHp'](_0x29e460);if(this['mp']>0x0)this['setMp'](_0x415eea);},Game_Actor[_0x166c6b(0x3f4)][_0x166c6b(0x53e)]=function(_0x1022ef,_0x1ff7f2){const _0x7bda0b=_0x166c6b;if(!this[_0x7bda0b(0x2f3)](_0x1ff7f2,this[_0x7bda0b(0x591)]()[_0x1022ef]))return;if(_0x1ff7f2){const _0x14553c=DataManager[_0x7bda0b(0x23a)](_0x1ff7f2);if(!_0x14553c[_0x7bda0b(0x175)](this[_0x7bda0b(0x190)]()[_0x1022ef]))return;}!this[_0x7bda0b(0x378)][_0x1022ef]&&(this[_0x7bda0b(0x378)][_0x1022ef]=new Game_Item());this['_equips'][_0x1022ef]['setObject'](_0x1ff7f2);if(VisuMZ[_0x7bda0b(0x435)][_0x7bda0b(0x242)](_0x1ff7f2)){const _0x4c7101=VisuMZ[_0x7bda0b(0x435)][_0x7bda0b(0x43a)][_0x7bda0b(0x4e2)][_0x7bda0b(0x52c)]||'',_0x4be86b=this[_0x7bda0b(0x32f)](),_0x530b01=_0x7bda0b(0x4b6)['format'](_0x1ff7f2[_0x7bda0b(0x15d)]),_0x198e2d=_0x1ff7f2[_0x7bda0b(0x32f)]||'';let _0x142f30=_0x4c7101[_0x7bda0b(0x505)](_0x4be86b,_0x530b01,_0x198e2d);if(VisuMZ[_0x7bda0b(0x285)][_0x7bda0b(0x597)]>=1.79&&_0x142f30[_0x7bda0b(0x514)]>0x0)$textPopup(_0x142f30);}this[_0x7bda0b(0x1f1)]();},VisuMZ['ItemsEquipsCore'][_0x166c6b(0x242)]=function(_0x38aebb){const _0x2ba45f=_0x166c6b;if(!_0x38aebb)return![];if(!Imported[_0x2ba45f(0x4ef)])return![];if(VisuMZ[_0x2ba45f(0x285)][_0x2ba45f(0x597)]<1.79)return![];return DataManager[_0x2ba45f(0x57c)](_0x38aebb);},Game_Actor['prototype'][_0x166c6b(0x447)]=function(_0x4f5a43){const _0x4524c3=_0x166c6b,_0x163d4a=this[_0x4524c3(0x190)]()[_0x4f5a43],_0x3156a6=$gameParty['equipItems']()['filter'](_0x2c3315=>DataManager[_0x4524c3(0x23a)](_0x2c3315)['includes'](_0x163d4a)&&this[_0x4524c3(0x43f)](_0x2c3315)&&!DataManager['isCursedItem'](_0x2c3315));let _0x3c23d6=null,_0x306ab6=-0x3e8;for(let _0x30177d=0x0;_0x30177d<_0x3156a6['length'];_0x30177d++){const _0x258b1e=this[_0x4524c3(0x3ff)](_0x3156a6[_0x30177d]);_0x258b1e>_0x306ab6&&(_0x306ab6=_0x258b1e,_0x3c23d6=_0x3156a6[_0x30177d]);}return _0x3c23d6;},VisuMZ['ItemsEquipsCore']['Game_Party_initialize']=Game_Party['prototype']['initialize'],Game_Party['prototype'][_0x166c6b(0x344)]=function(){const _0xdf652e=_0x166c6b;VisuMZ[_0xdf652e(0x435)]['Game_Party_initialize'][_0xdf652e(0x2b5)](this),this[_0xdf652e(0x3ed)](),this['initShopTrackingData']();},Game_Party[_0x166c6b(0x3f4)][_0x166c6b(0x3ed)]=function(){const _0x4cd00e=_0x166c6b;this[_0x4cd00e(0x207)]=[];},Game_Party['prototype'][_0x166c6b(0x1fb)]=function(_0x193c09){const _0x19b59f=_0x166c6b;if(!$gameTemp['newLabelEnabled']())return![];if(this[_0x19b59f(0x207)]===undefined)this[_0x19b59f(0x3ed)]();let _0x3a971b='';if(DataManager[_0x19b59f(0x45f)](_0x193c09))_0x3a971b='item-%1'['format'](_0x193c09['id']);else{if(DataManager[_0x19b59f(0x4e6)](_0x193c09))_0x3a971b=_0x19b59f(0x1b7)[_0x19b59f(0x505)](_0x193c09['id']);else{if(DataManager[_0x19b59f(0x3c2)](_0x193c09))_0x3a971b=_0x19b59f(0x1cf)[_0x19b59f(0x505)](_0x193c09['id']);else return;}}return this[_0x19b59f(0x207)]['includes'](_0x3a971b);},Game_Party[_0x166c6b(0x3f4)][_0x166c6b(0x430)]=function(_0x15f86d){const _0x2e0035=_0x166c6b;if(!$gameTemp[_0x2e0035(0x30e)]())return;if(this['_newItemsList']===undefined)this[_0x2e0035(0x3ed)]();let _0x37faaa='';if(DataManager[_0x2e0035(0x45f)](_0x15f86d))_0x37faaa='item-%1'[_0x2e0035(0x505)](_0x15f86d['id']);else{if(DataManager[_0x2e0035(0x4e6)](_0x15f86d))_0x37faaa=_0x2e0035(0x1b7)[_0x2e0035(0x505)](_0x15f86d['id']);else{if(DataManager[_0x2e0035(0x3c2)](_0x15f86d))_0x37faaa='armor-%1'[_0x2e0035(0x505)](_0x15f86d['id']);else return;}}if(!this[_0x2e0035(0x207)][_0x2e0035(0x175)](_0x37faaa))this[_0x2e0035(0x207)][_0x2e0035(0x1c9)](_0x37faaa);},Game_Party['prototype'][_0x166c6b(0x553)]=function(_0x1a7cc5){const _0x18b6ca=_0x166c6b;if(!$gameTemp[_0x18b6ca(0x30e)]())return;if(this[_0x18b6ca(0x207)]===undefined)this[_0x18b6ca(0x3ed)]();let _0x483d79='';if(DataManager[_0x18b6ca(0x45f)](_0x1a7cc5))_0x483d79=_0x18b6ca(0x2cb)[_0x18b6ca(0x505)](_0x1a7cc5['id']);else{if(DataManager[_0x18b6ca(0x4e6)](_0x1a7cc5))_0x483d79='weapon-%1'[_0x18b6ca(0x505)](_0x1a7cc5['id']);else{if(DataManager['isArmor'](_0x1a7cc5))_0x483d79=_0x18b6ca(0x1cf)[_0x18b6ca(0x505)](_0x1a7cc5['id']);else return;}}this[_0x18b6ca(0x207)][_0x18b6ca(0x175)](_0x483d79)&&this[_0x18b6ca(0x207)][_0x18b6ca(0x59a)](this['_newItemsList']['indexOf'](_0x483d79),0x1);},VisuMZ['ItemsEquipsCore'][_0x166c6b(0x2cf)]=Game_Party['prototype'][_0x166c6b(0x383)],Game_Party[_0x166c6b(0x3f4)][_0x166c6b(0x383)]=function(_0x430aae){const _0x424948=_0x166c6b;if(DataManager[_0x424948(0x408)](_0x430aae))_0x430aae=DataManager['getProxyItem'](_0x430aae);return VisuMZ[_0x424948(0x435)][_0x424948(0x2cf)][_0x424948(0x2b5)](this,_0x430aae);},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x3e3)]=Game_Party[_0x166c6b(0x3f4)][_0x166c6b(0x18f)],Game_Party[_0x166c6b(0x3f4)][_0x166c6b(0x18f)]=function(_0x57bedf,_0x4af338,_0x316771){const _0x536945=_0x166c6b;if(DataManager[_0x536945(0x408)](_0x57bedf))_0x57bedf=null;const _0x4e4695=this[_0x536945(0x383)](_0x57bedf);VisuMZ[_0x536945(0x435)][_0x536945(0x3e3)][_0x536945(0x2b5)](this,_0x57bedf,_0x4af338,_0x316771);if(this['numItems'](_0x57bedf)>_0x4e4695)this[_0x536945(0x430)](_0x57bedf);},Game_Party[_0x166c6b(0x3f4)][_0x166c6b(0x41a)]=function(_0x3aef3d){const _0x32d9e2=_0x166c6b;if(DataManager[_0x32d9e2(0x408)](_0x3aef3d))_0x3aef3d=DataManager[_0x32d9e2(0x380)](_0x3aef3d);return DataManager[_0x32d9e2(0x232)](_0x3aef3d);},VisuMZ[_0x166c6b(0x435)]['Game_Party_consumeItem']=Game_Party[_0x166c6b(0x3f4)]['consumeItem'],Game_Party[_0x166c6b(0x3f4)]['consumeItem']=function(_0x4e166b){const _0x3f021c=_0x166c6b;if(_0x4e166b){const _0x1937f0=_0x4e166b[_0x3f021c(0x1a6)]||'';if(_0x1937f0[_0x3f021c(0x346)](/<(?:CONSERVE|PRESERVE):[ ](\d+)([%％])>/i)){const _0x501999=Number(RegExp['$1'])*0.01;if(Math[_0x3f021c(0x551)]()<_0x501999)return;}}VisuMZ[_0x3f021c(0x435)][_0x3f021c(0x460)][_0x3f021c(0x2b5)](this,_0x4e166b);},Game_Party[_0x166c6b(0x3f4)]['initShopTrackingData']=function(){this['_shopTrackingData']={'buy':{'gold':0x0,'items':{}},'sell':{'gold':0x0,'items':{}}};},Game_Party[_0x166c6b(0x3f4)][_0x166c6b(0x33c)]=function(){const _0x3a83e2=_0x166c6b;return this[_0x3a83e2(0x3d6)]===undefined&&this[_0x3a83e2(0x41b)](),this[_0x3a83e2(0x3d6)];},Game_Party[_0x166c6b(0x3f4)][_0x166c6b(0x53f)]=function(_0x2dbf6b,_0x476406){const _0x39d047=_0x166c6b;if(!_0x476406)return 0x0;this[_0x39d047(0x3d6)]===undefined&&this[_0x39d047(0x41b)]();const _0x561e73=this[_0x39d047(0x33c)]();if(!_0x561e73[_0x2dbf6b])return 0x0;if(_0x476406==='gold')return _0x561e73[_0x2dbf6b][_0x39d047(0x270)]=_0x561e73[_0x2dbf6b][_0x39d047(0x270)]||0x0,_0x561e73[_0x2dbf6b]['gold'];else{if(DataManager[_0x39d047(0x45f)](_0x476406))key=_0x39d047(0x2cb)[_0x39d047(0x505)](_0x476406['id']);else{if(DataManager[_0x39d047(0x4e6)](_0x476406))key='weapon-%1'[_0x39d047(0x505)](_0x476406['id']);else{if(DataManager['isArmor'](_0x476406))key=_0x39d047(0x1cf)[_0x39d047(0x505)](_0x476406['id']);else return 0x0;}}}return _0x561e73[_0x2dbf6b]['items'][key]=_0x561e73[_0x2dbf6b][_0x39d047(0x49b)][key]||0x0,_0x561e73[_0x2dbf6b]['items'][key];},Game_Party[_0x166c6b(0x3f4)][_0x166c6b(0x223)]=function(_0x27a655){const _0x295ba8=_0x166c6b;return this[_0x295ba8(0x53f)](_0x295ba8(0x535),_0x27a655);},Game_Party[_0x166c6b(0x3f4)]['getShopTrackingItemSell']=function(_0x25c44c){const _0x235332=_0x166c6b;return this[_0x235332(0x53f)](_0x235332(0x542),_0x25c44c);},Game_Party['prototype'][_0x166c6b(0x185)]=function(){const _0x5d82bf=_0x166c6b;return this[_0x5d82bf(0x53f)](_0x5d82bf(0x535),'gold');},Game_Party[_0x166c6b(0x3f4)][_0x166c6b(0x376)]=function(){const _0xbf5a88=_0x166c6b;return this[_0xbf5a88(0x53f)](_0xbf5a88(0x542),'gold');},Game_Party[_0x166c6b(0x3f4)][_0x166c6b(0x549)]=function(_0x4269e2,_0x2fb8ae,_0x370326){const _0x46de39=_0x166c6b;if(!_0x2fb8ae)return;if(_0x370326<=0x0)return;this['_shopTrackingData']===undefined&&this[_0x46de39(0x41b)]();const _0x17b87e=this[_0x46de39(0x33c)]();if(!_0x17b87e[_0x4269e2])return;if(_0x2fb8ae==='gold'){_0x17b87e[_0x4269e2][_0x46de39(0x270)]=_0x17b87e[_0x4269e2][_0x46de39(0x270)]||0x0,_0x17b87e[_0x4269e2][_0x46de39(0x270)]+=_0x370326;return;}else{if(DataManager[_0x46de39(0x45f)](_0x2fb8ae))key=_0x46de39(0x2cb)['format'](_0x2fb8ae['id']);else{if(DataManager[_0x46de39(0x4e6)](_0x2fb8ae))key=_0x46de39(0x1b7)[_0x46de39(0x505)](_0x2fb8ae['id']);else{if(DataManager[_0x46de39(0x3c2)](_0x2fb8ae))key=_0x46de39(0x1cf)[_0x46de39(0x505)](_0x2fb8ae['id']);else return;}}}_0x17b87e[_0x4269e2][_0x46de39(0x49b)][key]=_0x17b87e[_0x4269e2]['items'][key]||0x0,_0x17b87e[_0x4269e2][_0x46de39(0x49b)][key]+=_0x370326;},Game_Party[_0x166c6b(0x3f4)][_0x166c6b(0x4df)]=function(_0x221ae8,_0x530873){const _0x38ca18=_0x166c6b;this[_0x38ca18(0x549)](_0x38ca18(0x535),_0x221ae8,_0x530873);},Game_Party[_0x166c6b(0x3f4)][_0x166c6b(0x578)]=function(_0x2870a9,_0x2a82b0){const _0x1afe43=_0x166c6b;this[_0x1afe43(0x549)](_0x1afe43(0x542),_0x2870a9,_0x2a82b0);},Game_Party[_0x166c6b(0x3f4)][_0x166c6b(0x26e)]=function(_0x4de53b){const _0x525267=_0x166c6b;this[_0x525267(0x549)](_0x525267(0x535),_0x525267(0x270),_0x4de53b);},Game_Party['prototype'][_0x166c6b(0x226)]=function(_0x28d2c7){const _0x861e9c=_0x166c6b;this['addShopTrackingItem'](_0x861e9c(0x542),_0x861e9c(0x270),_0x28d2c7);},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x214)]=Scene_ItemBase[_0x166c6b(0x3f4)][_0x166c6b(0x4ea)],Scene_ItemBase['prototype'][_0x166c6b(0x4ea)]=function(){const _0x1eb31d=_0x166c6b;VisuMZ['ItemsEquipsCore'][_0x1eb31d(0x214)]['call'](this),this[_0x1eb31d(0x1c0)][_0x1eb31d(0x330)]();},Scene_Item[_0x166c6b(0x3f4)][_0x166c6b(0x188)]=function(){const _0x108963=_0x166c6b;if(ConfigManager[_0x108963(0x31d)]&&ConfigManager[_0x108963(0x3d4)]!==undefined)return ConfigManager['uiHelpPosition'];else return this[_0x108963(0x4a2)]()?this[_0x108963(0x298)]()[_0x108963(0x346)](/LOWER/i):Scene_ItemBase['prototype'][_0x108963(0x188)]['call'](this);},Scene_Item[_0x166c6b(0x3f4)][_0x166c6b(0x193)]=function(){const _0x52199a=_0x166c6b;if(ConfigManager[_0x52199a(0x31d)]&&ConfigManager[_0x52199a(0x2be)]!==undefined)return ConfigManager[_0x52199a(0x2be)];else return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x52199a(0x298)]()['match'](/RIGHT/i):Scene_ItemBase[_0x52199a(0x3f4)][_0x52199a(0x193)][_0x52199a(0x2b5)](this);},Scene_Item[_0x166c6b(0x3f4)][_0x166c6b(0x298)]=function(){const _0x3aa6a5=_0x166c6b;return VisuMZ['ItemsEquipsCore'][_0x3aa6a5(0x43a)][_0x3aa6a5(0x167)]['LayoutStyle'];},Scene_Item['prototype']['isUseModernControls']=function(){const _0x39f13f=_0x166c6b;return this[_0x39f13f(0x3e9)]&&this['_categoryWindow'][_0x39f13f(0x2b0)]();},Scene_Item[_0x166c6b(0x3f4)][_0x166c6b(0x4a2)]=function(){const _0x1bc867=_0x166c6b;return VisuMZ[_0x1bc867(0x435)][_0x1bc867(0x43a)][_0x1bc867(0x167)]['EnableLayout'];},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x54d)]=Scene_Item[_0x166c6b(0x3f4)][_0x166c6b(0x3f9)],Scene_Item['prototype'][_0x166c6b(0x3f9)]=function(){const _0x84e1f7=_0x166c6b;VisuMZ[_0x84e1f7(0x435)][_0x84e1f7(0x54d)]['call'](this),this[_0x84e1f7(0x2b0)]()&&this[_0x84e1f7(0x26a)]();},VisuMZ['ItemsEquipsCore'][_0x166c6b(0x37d)]=Scene_Item[_0x166c6b(0x3f4)][_0x166c6b(0x593)],Scene_Item['prototype']['helpWindowRect']=function(){const _0x445ac8=_0x166c6b;return this[_0x445ac8(0x4a2)]()?this[_0x445ac8(0x580)]():VisuMZ[_0x445ac8(0x435)]['Scene_Item_helpWindowRect'][_0x445ac8(0x2b5)](this);},Scene_Item[_0x166c6b(0x3f4)]['helpWindowRectItemsEquipsCore']=function(){const _0x18d8fc=_0x166c6b,_0x487647=0x0,_0xd5eebc=this['helpAreaTop'](),_0x5c6497=Graphics[_0x18d8fc(0x596)],_0x519375=this[_0x18d8fc(0x1e4)]();return new Rectangle(_0x487647,_0xd5eebc,_0x5c6497,_0x519375);},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x401)]=Scene_Item[_0x166c6b(0x3f4)][_0x166c6b(0x359)],Scene_Item['prototype'][_0x166c6b(0x359)]=function(){const _0x2f6de3=_0x166c6b;VisuMZ[_0x2f6de3(0x435)][_0x2f6de3(0x401)][_0x2f6de3(0x2b5)](this),this[_0x2f6de3(0x2b0)]()&&this[_0x2f6de3(0x218)]();},Scene_Item[_0x166c6b(0x3f4)]['postCreateCategoryWindowItemsEquipsCore']=function(){const _0x99c92a=_0x166c6b;delete this[_0x99c92a(0x3e9)][_0x99c92a(0x431)]['ok'],delete this[_0x99c92a(0x3e9)][_0x99c92a(0x431)][_0x99c92a(0x520)];},VisuMZ['ItemsEquipsCore']['Scene_Item_categoryWindowRect']=Scene_Item['prototype']['categoryWindowRect'],Scene_Item['prototype'][_0x166c6b(0x1d7)]=function(){const _0x277394=_0x166c6b;return this[_0x277394(0x4a2)]()?this['categoryWindowRectItemsEquipsCore']():VisuMZ[_0x277394(0x435)]['Scene_Item_categoryWindowRect'][_0x277394(0x2b5)](this);},Scene_Item['prototype'][_0x166c6b(0x293)]=function(){const _0x326259=_0x166c6b,_0x318f95=0x0,_0x5f1e0a=this['mainAreaTop'](),_0x2a4629=Graphics[_0x326259(0x596)],_0x3e03cd=this[_0x326259(0x469)](0x1,!![]);return new Rectangle(_0x318f95,_0x5f1e0a,_0x2a4629,_0x3e03cd);},VisuMZ['ItemsEquipsCore'][_0x166c6b(0x571)]=Scene_Item['prototype']['createItemWindow'],Scene_Item['prototype'][_0x166c6b(0x429)]=function(){const _0x281e7e=_0x166c6b;VisuMZ[_0x281e7e(0x435)][_0x281e7e(0x571)]['call'](this),this[_0x281e7e(0x2b0)]()&&this['postCreateItemWindowModernControls'](),this[_0x281e7e(0x474)]()&&this['createStatusWindow']();},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x1e1)]=Scene_Item[_0x166c6b(0x3f4)][_0x166c6b(0x39e)],Scene_Item['prototype']['itemWindowRect']=function(){const _0x587b47=_0x166c6b;if(this[_0x587b47(0x4a2)]())return this['itemWindowRectItemsEquipsCore']();else{const _0x2a2fd4=VisuMZ[_0x587b47(0x435)][_0x587b47(0x1e1)][_0x587b47(0x2b5)](this);return this[_0x587b47(0x474)]()&&this[_0x587b47(0x1ea)]()&&(_0x2a2fd4[_0x587b47(0x3aa)]-=this[_0x587b47(0x554)]()),_0x2a2fd4;}},Scene_Item['prototype'][_0x166c6b(0x2dd)]=function(){const _0x311c6b=_0x166c6b,_0x533636=this[_0x311c6b(0x193)]()?this['statusWidth']():0x0,_0x5e9972=this[_0x311c6b(0x3e9)]['y']+this[_0x311c6b(0x3e9)][_0x311c6b(0x459)],_0x20dc98=Graphics['boxWidth']-this[_0x311c6b(0x554)](),_0x2ac95c=this['mainAreaBottom']()-_0x5e9972;return new Rectangle(_0x533636,_0x5e9972,_0x20dc98,_0x2ac95c);},Scene_Item[_0x166c6b(0x3f4)][_0x166c6b(0x28d)]=function(){const _0x28f168=_0x166c6b;this[_0x28f168(0x1c0)]['setHandler'](_0x28f168(0x520),this[_0x28f168(0x5a7)]['bind'](this));},Scene_Item[_0x166c6b(0x3f4)]['allowCreateStatusWindow']=function(){const _0x58ff5d=_0x166c6b;return this[_0x58ff5d(0x4a2)]()?!![]:VisuMZ[_0x58ff5d(0x435)]['Settings'][_0x58ff5d(0x167)]['ShowShopStatus'];},Scene_Item[_0x166c6b(0x3f4)][_0x166c6b(0x1ea)]=function(){const _0x550687=_0x166c6b;return VisuMZ[_0x550687(0x435)][_0x550687(0x43a)][_0x550687(0x167)][_0x550687(0x2c9)];},Scene_Item['prototype']['createStatusWindow']=function(){const _0x3f2ba5=_0x166c6b,_0x3362c8=this[_0x3f2ba5(0x2e5)]();this[_0x3f2ba5(0x39d)]=new Window_ShopStatus(_0x3362c8),this[_0x3f2ba5(0x1f6)](this['_statusWindow']),this['_itemWindow'][_0x3f2ba5(0x54c)](this[_0x3f2ba5(0x39d)]);const _0x1e62a0=VisuMZ[_0x3f2ba5(0x435)][_0x3f2ba5(0x43a)][_0x3f2ba5(0x167)][_0x3f2ba5(0x172)];this[_0x3f2ba5(0x39d)][_0x3f2ba5(0x583)](_0x1e62a0||0x0);},Scene_Item['prototype'][_0x166c6b(0x2e5)]=function(){const _0x1d7fcb=_0x166c6b;return this[_0x1d7fcb(0x4a2)]()?this[_0x1d7fcb(0x32e)]():VisuMZ[_0x1d7fcb(0x435)]['Settings'][_0x1d7fcb(0x167)][_0x1d7fcb(0x2b1)]['call'](this);},Scene_Item['prototype']['statusWindowRectItemsEquipsCore']=function(){const _0x3649b3=_0x166c6b,_0x36529a=this[_0x3649b3(0x554)](),_0x2c5957=this[_0x3649b3(0x1c0)][_0x3649b3(0x459)],_0x4bf088=this[_0x3649b3(0x193)]()?0x0:Graphics[_0x3649b3(0x596)]-this[_0x3649b3(0x554)](),_0x4aa055=this[_0x3649b3(0x1c0)]['y'];return new Rectangle(_0x4bf088,_0x4aa055,_0x36529a,_0x2c5957);},Scene_Item[_0x166c6b(0x3f4)][_0x166c6b(0x554)]=function(){const _0x85e94a=_0x166c6b;return Scene_Shop[_0x85e94a(0x3f4)]['statusWidth']();},Scene_Item[_0x166c6b(0x3f4)][_0x166c6b(0x45d)]=function(){const _0xff94c3=_0x166c6b;if(!this[_0xff94c3(0x298)]())return![];if(!this[_0xff94c3(0x2b0)]())return![];if(!this['_itemWindow'])return![];if(!this['_itemWindow'][_0xff94c3(0x544)])return![];return this['updatedLayoutStyle']()&&this['isUseModernControls']();},Scene_Item[_0x166c6b(0x3f4)][_0x166c6b(0x3de)]=function(){const _0x514ee1=_0x166c6b;if(this[_0x514ee1(0x45d)]())return this['_itemWindow'][_0x514ee1(0x1ad)]()===0x1?TextManager[_0x514ee1(0x381)](_0x514ee1(0x27b),'right'):TextManager[_0x514ee1(0x381)](_0x514ee1(0x42e),_0x514ee1(0x16b));return Scene_ItemBase[_0x514ee1(0x3f4)][_0x514ee1(0x3de)][_0x514ee1(0x2b5)](this);},Scene_Item[_0x166c6b(0x3f4)]['buttonAssistText1']=function(){const _0x2f5088=_0x166c6b;if(this[_0x2f5088(0x45d)]())return VisuMZ[_0x2f5088(0x435)]['Settings'][_0x2f5088(0x167)][_0x2f5088(0x26c)];return Scene_ItemBase[_0x2f5088(0x3f4)][_0x2f5088(0x2f9)][_0x2f5088(0x2b5)](this);},Scene_Equip[_0x166c6b(0x3f4)][_0x166c6b(0x397)]=function(){const _0x3b0805=_0x166c6b;Scene_ItemBase[_0x3b0805(0x3f4)][_0x3b0805(0x397)]['call'](this),this[_0x3b0805(0x315)]();},Scene_Equip[_0x166c6b(0x3f4)][_0x166c6b(0x188)]=function(){const _0x5e392f=_0x166c6b;if(ConfigManager[_0x5e392f(0x31d)]&&ConfigManager[_0x5e392f(0x3d4)]!==undefined)return ConfigManager[_0x5e392f(0x3d4)];else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x5e392f(0x298)]()[_0x5e392f(0x346)](/LOWER/i);else Scene_MenuBase[_0x5e392f(0x3f4)][_0x5e392f(0x193)]['call'](this);}},Scene_Equip['prototype'][_0x166c6b(0x193)]=function(){const _0x5270f3=_0x166c6b;if(ConfigManager[_0x5270f3(0x31d)]&&ConfigManager[_0x5270f3(0x2be)]!==undefined)return ConfigManager['uiInputPosition'];else{if(this[_0x5270f3(0x4a2)]())return this[_0x5270f3(0x298)]()[_0x5270f3(0x346)](/RIGHT/i);else Scene_MenuBase[_0x5270f3(0x3f4)]['isRightInputMode']['call'](this);}},Scene_Equip[_0x166c6b(0x3f4)]['updatedLayoutStyle']=function(){const _0x4a9120=_0x166c6b;return VisuMZ[_0x4a9120(0x435)]['Settings'][_0x4a9120(0x4e2)]['LayoutStyle'];},Scene_Equip[_0x166c6b(0x3f4)][_0x166c6b(0x2b0)]=function(){const _0x38bb8d=_0x166c6b;return this[_0x38bb8d(0x4e9)]&&this['_commandWindow']['isUseModernControls']();},Scene_Equip[_0x166c6b(0x3f4)][_0x166c6b(0x4a2)]=function(){const _0x59f17d=_0x166c6b;return VisuMZ['ItemsEquipsCore'][_0x59f17d(0x43a)][_0x59f17d(0x4e2)][_0x59f17d(0x2fd)];},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x47d)]=Scene_Equip[_0x166c6b(0x3f4)]['create'],Scene_Equip[_0x166c6b(0x3f4)][_0x166c6b(0x3f9)]=function(){const _0x48e7ec=_0x166c6b;VisuMZ[_0x48e7ec(0x435)][_0x48e7ec(0x47d)]['call'](this),this[_0x48e7ec(0x2b0)]()&&this['commandEquip']();},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x530)]=Scene_Equip[_0x166c6b(0x3f4)][_0x166c6b(0x593)],Scene_Equip['prototype'][_0x166c6b(0x593)]=function(){const _0x2b9699=_0x166c6b;return this[_0x2b9699(0x4a2)]()?this[_0x2b9699(0x580)]():VisuMZ[_0x2b9699(0x435)][_0x2b9699(0x530)][_0x2b9699(0x2b5)](this);},Scene_Equip[_0x166c6b(0x3f4)][_0x166c6b(0x580)]=function(){const _0x44003b=_0x166c6b,_0x366852=0x0,_0x25036a=this[_0x44003b(0x2de)](),_0x469ca4=Graphics[_0x44003b(0x596)],_0x55efad=this[_0x44003b(0x1e4)]();return new Rectangle(_0x366852,_0x25036a,_0x469ca4,_0x55efad);},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x2c4)]=Scene_Equip[_0x166c6b(0x3f4)][_0x166c6b(0x2e5)],Scene_Equip[_0x166c6b(0x3f4)][_0x166c6b(0x2e5)]=function(){const _0x26c5b3=_0x166c6b;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x26c5b3(0x32e)]():VisuMZ[_0x26c5b3(0x435)][_0x26c5b3(0x2c4)][_0x26c5b3(0x2b5)](this);},Scene_Equip[_0x166c6b(0x3f4)]['statusWindowRectItemsEquipsCore']=function(){const _0xff6176=_0x166c6b,_0x391077=this[_0xff6176(0x193)]()?0x0:Graphics[_0xff6176(0x596)]-this[_0xff6176(0x554)](),_0x3335f6=this['mainAreaTop'](),_0x7dcb7f=this['statusWidth'](),_0x27141c=this[_0xff6176(0x2ce)]();return new Rectangle(_0x391077,_0x3335f6,_0x7dcb7f,_0x27141c);},VisuMZ[_0x166c6b(0x435)]['Scene_Equip_createCommandWindow']=Scene_Equip[_0x166c6b(0x3f4)][_0x166c6b(0x39f)],Scene_Equip[_0x166c6b(0x3f4)][_0x166c6b(0x39f)]=function(){const _0x19cae4=_0x166c6b;VisuMZ[_0x19cae4(0x435)][_0x19cae4(0x1cd)]['call'](this);if(this[_0x19cae4(0x230)])this[_0x19cae4(0x4e9)][_0x19cae4(0x473)](this[_0x19cae4(0x230)]);},VisuMZ['ItemsEquipsCore']['Scene_Equip_commandWindowRect']=Scene_Equip['prototype'][_0x166c6b(0x2df)],Scene_Equip[_0x166c6b(0x3f4)][_0x166c6b(0x2df)]=function(){const _0x4534d0=_0x166c6b;return this['isUseItemsEquipsCoreUpdatedLayout']()?this['commandWindowRectItemsEquipsCore']():VisuMZ['ItemsEquipsCore'][_0x4534d0(0x21b)][_0x4534d0(0x2b5)](this);},Scene_Equip[_0x166c6b(0x3f4)][_0x166c6b(0x550)]=function(){const _0x125d9e=_0x166c6b,_0x1ff0f2=VisuMZ[_0x125d9e(0x435)]['Settings'][_0x125d9e(0x4e2)];return _0x1ff0f2['CommandAddOptimize']||_0x1ff0f2[_0x125d9e(0x324)];},Scene_Equip[_0x166c6b(0x3f4)][_0x166c6b(0x541)]=function(){const _0x344425=_0x166c6b,_0x5cab24=this[_0x344425(0x550)](),_0x7ea446=this[_0x344425(0x193)]()?this[_0x344425(0x554)]():0x0,_0x3d256f=this['mainAreaTop'](),_0x160a3c=Graphics[_0x344425(0x596)]-this[_0x344425(0x554)](),_0x2b4e2b=_0x5cab24?this[_0x344425(0x469)](0x1,!![]):0x0;return new Rectangle(_0x7ea446,_0x3d256f,_0x160a3c,_0x2b4e2b);},VisuMZ['ItemsEquipsCore'][_0x166c6b(0x3ae)]=Scene_Equip[_0x166c6b(0x3f4)][_0x166c6b(0x388)],Scene_Equip[_0x166c6b(0x3f4)]['createSlotWindow']=function(){const _0x3d1174=_0x166c6b;VisuMZ[_0x3d1174(0x435)][_0x3d1174(0x3ae)]['call'](this),this[_0x3d1174(0x2b0)]()&&this['postCreateSlotWindowItemsEquipsCore']();},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x4eb)]=Scene_Equip[_0x166c6b(0x3f4)][_0x166c6b(0x354)],Scene_Equip[_0x166c6b(0x3f4)][_0x166c6b(0x354)]=function(){const _0x3b08a1=_0x166c6b;return this[_0x3b08a1(0x4a2)]()?this[_0x3b08a1(0x3e5)]():VisuMZ[_0x3b08a1(0x435)][_0x3b08a1(0x4eb)]['call'](this);},Scene_Equip[_0x166c6b(0x3f4)]['slotWindowRectItemsEquipsCore']=function(){const _0x35ee3b=_0x166c6b,_0x16bb9f=this[_0x35ee3b(0x2df)](),_0x3453a8=this[_0x35ee3b(0x193)]()?this['statusWidth']():0x0,_0xac666a=_0x16bb9f['y']+_0x16bb9f[_0x35ee3b(0x459)],_0x314a28=Graphics[_0x35ee3b(0x596)]-this['statusWidth'](),_0x122412=this[_0x35ee3b(0x2ce)]()-_0x16bb9f['height'];return new Rectangle(_0x3453a8,_0xac666a,_0x314a28,_0x122412);},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x271)]=Scene_Equip[_0x166c6b(0x3f4)]['itemWindowRect'],Scene_Equip[_0x166c6b(0x3f4)]['itemWindowRect']=function(){const _0x1235ee=_0x166c6b;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x1235ee(0x354)]():VisuMZ[_0x1235ee(0x435)][_0x1235ee(0x271)][_0x1235ee(0x2b5)](this);},Scene_Equip[_0x166c6b(0x3f4)][_0x166c6b(0x554)]=function(){const _0x43b531=_0x166c6b;return this['isUseItemsEquipsCoreUpdatedLayout']()?this['geUpdatedLayoutStatusWidth']():VisuMZ[_0x43b531(0x435)]['Settings'][_0x43b531(0x4e2)][_0x43b531(0x1c1)];},Scene_Equip[_0x166c6b(0x3f4)][_0x166c6b(0x253)]=function(){const _0x3a0981=_0x166c6b;return Math[_0x3a0981(0x523)](Graphics[_0x3a0981(0x596)]/0x2);},Scene_Equip['prototype']['postCreateSlotWindowItemsEquipsCore']=function(){const _0x3b7a3b=_0x166c6b;this[_0x3b7a3b(0x36e)]['setHandler'](_0x3b7a3b(0x520),this[_0x3b7a3b(0x5a7)][_0x3b7a3b(0x343)](this)),this[_0x3b7a3b(0x36e)][_0x3b7a3b(0x4f2)]('pagedown',this['nextActor'][_0x3b7a3b(0x343)](this)),this['_slotWindow'][_0x3b7a3b(0x4f2)](_0x3b7a3b(0x42e),this[_0x3b7a3b(0x403)][_0x3b7a3b(0x343)](this));},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x410)]=Scene_Equip[_0x166c6b(0x3f4)][_0x166c6b(0x395)],Scene_Equip[_0x166c6b(0x3f4)]['commandEquip']=function(){const _0x4bb298=_0x166c6b;this[_0x4bb298(0x2b0)]()&&(this[_0x4bb298(0x4e9)][_0x4bb298(0x382)](),this[_0x4bb298(0x4e9)][_0x4bb298(0x2c5)]()),VisuMZ[_0x4bb298(0x435)][_0x4bb298(0x410)]['call'](this);},VisuMZ[_0x166c6b(0x435)]['Scene_Equip_onSlotOk']=Scene_Equip[_0x166c6b(0x3f4)]['onSlotOk'],Scene_Equip[_0x166c6b(0x3f4)][_0x166c6b(0x451)]=function(){const _0x2d4dea=_0x166c6b;this[_0x2d4dea(0x36e)][_0x2d4dea(0x17f)]()>=0x0?(VisuMZ[_0x2d4dea(0x435)][_0x2d4dea(0x3ab)][_0x2d4dea(0x2b5)](this),this['onSlotOkAutoSelect']()):(this[_0x2d4dea(0x36e)][_0x2d4dea(0x569)](0x0),this['_slotWindow'][_0x2d4dea(0x1ec)]());},Scene_Equip[_0x166c6b(0x3f4)][_0x166c6b(0x2a2)]=function(){const _0x59cf87=_0x166c6b;this[_0x59cf87(0x1c0)]['refresh']();const _0x4a0aa1=this[_0x59cf87(0x36e)][_0x59cf87(0x1b4)](),_0x1931c6=this['_itemWindow'][_0x59cf87(0x4e0)]['indexOf'](_0x4a0aa1),_0x123e92=Math['floor'](this[_0x59cf87(0x1c0)]['maxVisibleItems']()/0x2)-0x1;this[_0x59cf87(0x1c0)][_0x59cf87(0x569)](_0x1931c6>=0x0?_0x1931c6:0x0),this['_itemWindow']['_scrollDuration']>0x1&&(this[_0x59cf87(0x1c0)][_0x59cf87(0x26b)]=0x1,this['_itemWindow']['updateSmoothScroll']()),this[_0x59cf87(0x1c0)][_0x59cf87(0x31e)](this['_itemWindow']['index']()-_0x123e92);},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x43e)]=Scene_Equip[_0x166c6b(0x3f4)][_0x166c6b(0x212)],Scene_Equip[_0x166c6b(0x3f4)][_0x166c6b(0x212)]=function(){const _0x256b70=_0x166c6b;VisuMZ[_0x256b70(0x435)][_0x256b70(0x43e)]['call'](this),this[_0x256b70(0x2b0)]()&&(this['_commandWindow'][_0x256b70(0x569)](0x0),this['_slotWindow']['deactivate']());},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x186)]=Scene_Equip[_0x166c6b(0x3f4)][_0x166c6b(0x18a)],Scene_Equip[_0x166c6b(0x3f4)]['onActorChange']=function(){const _0x181645=_0x166c6b;VisuMZ[_0x181645(0x435)][_0x181645(0x186)]['call'](this),this[_0x181645(0x2b0)]()&&(this['_commandWindow'][_0x181645(0x2c5)](),this[_0x181645(0x4e9)][_0x181645(0x382)](),this[_0x181645(0x36e)]['smoothSelect'](0x0),this[_0x181645(0x36e)][_0x181645(0x1ec)]());},Scene_Equip['prototype'][_0x166c6b(0x3c3)]=function(){const _0x568aa8=_0x166c6b;if(!this[_0x568aa8(0x36e)])return![];if(!this[_0x568aa8(0x36e)][_0x568aa8(0x544)])return![];return this['_slotWindow'][_0x568aa8(0x543)]();},Scene_Equip[_0x166c6b(0x3f4)][_0x166c6b(0x34a)]=function(){const _0x482cd2=_0x166c6b;if(this[_0x482cd2(0x3c3)]())return TextManager[_0x482cd2(0x548)](_0x482cd2(0x194));return Scene_MenuBase[_0x482cd2(0x3f4)][_0x482cd2(0x34a)][_0x482cd2(0x2b5)](this);},Scene_Equip[_0x166c6b(0x3f4)][_0x166c6b(0x235)]=function(){const _0x2acdb8=_0x166c6b;if(this[_0x2acdb8(0x3c3)]())return VisuMZ[_0x2acdb8(0x435)][_0x2acdb8(0x43a)][_0x2acdb8(0x4e2)][_0x2acdb8(0x564)];return Scene_MenuBase[_0x2acdb8(0x3f4)][_0x2acdb8(0x235)][_0x2acdb8(0x2b5)](this);},Scene_Equip[_0x166c6b(0x3f4)][_0x166c6b(0x27d)]=function(){const _0x2ec15b=_0x166c6b;if(this['buttonAssistSlotWindowShift']())return this[_0x2ec15b(0x328)][_0x2ec15b(0x3aa)]/0x5/-0x3;return Scene_MenuBase['prototype'][_0x2ec15b(0x27d)]['call'](this);},Scene_Equip[_0x166c6b(0x3f4)][_0x166c6b(0x5a7)]=function(){SceneManager['pop']();},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x3e4)]=Scene_Load['prototype']['reloadMapIfUpdated'],Scene_Load[_0x166c6b(0x3f4)]['reloadMapIfUpdated']=function(){const _0x565f95=_0x166c6b;VisuMZ[_0x565f95(0x435)][_0x565f95(0x3e4)][_0x565f95(0x2b5)](this),this[_0x565f95(0x370)]();},Scene_Load['prototype'][_0x166c6b(0x370)]=function(){const _0x4abd0e=_0x166c6b;if($gameSystem[_0x4abd0e(0x313)]()!==$dataSystem['versionId'])for(const _0x273269 of $gameActors[_0x4abd0e(0x4e0)]){if(_0x273269)_0x273269['prepareNewEquipSlotsOnLoad']();}},Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x188)]=function(){const _0x49a868=_0x166c6b;if(ConfigManager[_0x49a868(0x31d)]&&ConfigManager[_0x49a868(0x3d4)]!==undefined)return ConfigManager[_0x49a868(0x3d4)];else{if(this[_0x49a868(0x4a2)]())return this[_0x49a868(0x298)]()[_0x49a868(0x346)](/LOWER/i);else Scene_MenuBase[_0x49a868(0x3f4)][_0x49a868(0x193)][_0x49a868(0x2b5)](this);}},Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x193)]=function(){const _0x280b24=_0x166c6b;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x280b24(0x2be)]!==undefined)return ConfigManager['uiInputPosition'];else{if(this[_0x280b24(0x4a2)]())return this[_0x280b24(0x298)]()[_0x280b24(0x346)](/RIGHT/i);else Scene_MenuBase['prototype']['isRightInputMode'][_0x280b24(0x2b5)](this);}},Scene_Shop['prototype'][_0x166c6b(0x298)]=function(){const _0x47da2c=_0x166c6b;return VisuMZ[_0x47da2c(0x435)][_0x47da2c(0x43a)][_0x47da2c(0x29d)][_0x47da2c(0x519)];},Scene_Shop[_0x166c6b(0x3f4)]['isUseModernControls']=function(){const _0x1e5f3d=_0x166c6b;return this[_0x1e5f3d(0x3e9)]&&this['_categoryWindow'][_0x1e5f3d(0x2b0)]();},Scene_Shop['prototype'][_0x166c6b(0x4a2)]=function(){const _0x54ce25=_0x166c6b;return VisuMZ[_0x54ce25(0x435)]['Settings'][_0x54ce25(0x29d)][_0x54ce25(0x2fd)];},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x317)]=Scene_Shop[_0x166c6b(0x3f4)]['prepare'],Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x20d)]=function(_0x47913c,_0x452170){const _0x9acc78=_0x166c6b;_0x47913c=VisuMZ[_0x9acc78(0x435)]['deepCopy'](_0x47913c),VisuMZ[_0x9acc78(0x435)][_0x9acc78(0x317)]['call'](this,_0x47913c,_0x452170),this[_0x9acc78(0x29b)]();},Scene_Shop['prototype'][_0x166c6b(0x29b)]=function(){const _0x146fbf=_0x166c6b;this[_0x146fbf(0x21c)]=0x0;const _0xc1fe0b=[];for(const _0x34684f of this[_0x146fbf(0x302)]){this[_0x146fbf(0x51d)](_0x34684f)?this['_goodsCount']++:_0xc1fe0b[_0x146fbf(0x1c9)](_0x34684f);}for(const _0x4ed281 of _0xc1fe0b){this[_0x146fbf(0x302)][_0x146fbf(0x2e8)](_0x4ed281);}},Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x51d)]=function(_0x27fcf8){if(_0x27fcf8[0x0]>0x2||_0x27fcf8[0x0]<0x0)return![];const _0x41499a=[$dataItems,$dataWeapons,$dataArmors][_0x27fcf8[0x0]][_0x27fcf8[0x1]];if(!_0x41499a)return![];return!![];},VisuMZ[_0x166c6b(0x435)]['Scene_Shop_create']=Scene_Shop['prototype'][_0x166c6b(0x3f9)],Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x3f9)]=function(){const _0x5f0964=_0x166c6b;VisuMZ[_0x5f0964(0x435)][_0x5f0964(0x40b)][_0x5f0964(0x2b5)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this['postCreateItemsEquipsCore'](),this[_0x5f0964(0x58e)]();},Scene_Shop['prototype']['postCreateItemsEquipsCore']=function(){const _0x2cf0ac=_0x166c6b;this['_dummyWindow']['hide'](),this[_0x2cf0ac(0x31c)][_0x2cf0ac(0x1db)](),this['_buyWindow'][_0x2cf0ac(0x382)](),this['_statusWindow'][_0x2cf0ac(0x1db)]();},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x234)]=Scene_Shop['prototype']['helpWindowRect'],Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x593)]=function(){const _0xed6fca=_0x166c6b;return this[_0xed6fca(0x4a2)]()?this[_0xed6fca(0x580)]():VisuMZ['ItemsEquipsCore'][_0xed6fca(0x234)][_0xed6fca(0x2b5)](this);},Scene_Shop['prototype'][_0x166c6b(0x580)]=function(){const _0x891430=_0x166c6b,_0x27e776=0x0,_0x1565b1=this[_0x891430(0x2de)](),_0x2c6ffc=Graphics[_0x891430(0x596)],_0x3fccc1=this[_0x891430(0x1e4)]();return new Rectangle(_0x27e776,_0x1565b1,_0x2c6ffc,_0x3fccc1);},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x182)]=Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x45a)],Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x45a)]=function(){const _0x4a2650=_0x166c6b;return this[_0x4a2650(0x4a2)]()?this[_0x4a2650(0x509)]():VisuMZ['ItemsEquipsCore']['Scene_Shop_goldWindowRect'][_0x4a2650(0x2b5)](this);},Scene_Shop['prototype'][_0x166c6b(0x509)]=function(){const _0x3b961c=_0x166c6b,_0x7860b8=this[_0x3b961c(0x3d5)](),_0x3f6382=this['calcWindowHeight'](0x1,!![]),_0x1fa8e2=this['isRightInputMode']()?0x0:Graphics[_0x3b961c(0x596)]-_0x7860b8,_0xafeb09=this[_0x3b961c(0x323)]();return new Rectangle(_0x1fa8e2,_0xafeb09,_0x7860b8,_0x3f6382);},VisuMZ[_0x166c6b(0x435)]['Scene_Shop_commandWindowRect']=Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x2df)],Scene_Shop['prototype']['commandWindowRect']=function(){const _0x4ed1e8=_0x166c6b;return this[_0x4ed1e8(0x4a2)]()?this['commandWindowRectItemsEquipsCore']():VisuMZ[_0x4ed1e8(0x435)][_0x4ed1e8(0x1c3)][_0x4ed1e8(0x2b5)](this);},Scene_Shop[_0x166c6b(0x3f4)]['commandWindowRectItemsEquipsCore']=function(){const _0x594f53=_0x166c6b,_0x3d0e0f=this[_0x594f53(0x193)]()?this[_0x594f53(0x3d5)]():0x0,_0x421e3e=this['mainAreaTop'](),_0x225225=Graphics[_0x594f53(0x596)]-this[_0x594f53(0x3d5)](),_0x31792f=this[_0x594f53(0x469)](0x1,!![]);return new Rectangle(_0x3d0e0f,_0x421e3e,_0x225225,_0x31792f);},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x1dd)]=Scene_Shop['prototype'][_0x166c6b(0x365)],Scene_Shop['prototype'][_0x166c6b(0x365)]=function(){const _0x39a9b0=_0x166c6b;return this[_0x39a9b0(0x4a2)]()?this[_0x39a9b0(0x57d)]():VisuMZ[_0x39a9b0(0x435)][_0x39a9b0(0x1dd)][_0x39a9b0(0x2b5)](this);},Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x57d)]=function(){const _0x2ad1d8=_0x166c6b,_0x42f854=this[_0x2ad1d8(0x4e9)]['y']+this[_0x2ad1d8(0x4e9)][_0x2ad1d8(0x459)],_0x25a333=Graphics['boxWidth']-this[_0x2ad1d8(0x554)](),_0x5ab175=this['isRightInputMode']()?Graphics[_0x2ad1d8(0x596)]-_0x25a333:0x0,_0x6070ba=this[_0x2ad1d8(0x2ce)]()-this[_0x2ad1d8(0x4e9)][_0x2ad1d8(0x459)];return new Rectangle(_0x5ab175,_0x42f854,_0x25a333,_0x6070ba);},VisuMZ['ItemsEquipsCore'][_0x166c6b(0x233)]=Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x2e5)],Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x2e5)]=function(){const _0x15c9c2=_0x166c6b;return this[_0x15c9c2(0x4a2)]()?this[_0x15c9c2(0x32e)]():VisuMZ[_0x15c9c2(0x435)]['Scene_Shop_statusWindowRect']['call'](this);},Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x32e)]=function(){const _0x3c89fe=_0x166c6b,_0x58bb71=this[_0x3c89fe(0x554)](),_0x296b93=this[_0x3c89fe(0x2ce)]()-this[_0x3c89fe(0x4e9)][_0x3c89fe(0x459)],_0x2c66a2=this[_0x3c89fe(0x193)]()?0x0:Graphics['boxWidth']-_0x58bb71,_0x343fe5=this[_0x3c89fe(0x4e9)]['y']+this[_0x3c89fe(0x4e9)][_0x3c89fe(0x459)];return new Rectangle(_0x2c66a2,_0x343fe5,_0x58bb71,_0x296b93);},VisuMZ['ItemsEquipsCore']['Scene_Shop_buyWindowRect']=Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x39c)],Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x39c)]=function(){const _0x5942ed=_0x166c6b;return this[_0x5942ed(0x4a2)]()?this[_0x5942ed(0x2f5)]():VisuMZ[_0x5942ed(0x435)][_0x5942ed(0x2ec)][_0x5942ed(0x2b5)](this);},Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x2f5)]=function(){const _0x2476aa=_0x166c6b,_0x4b3147=this[_0x2476aa(0x4e9)]['y']+this[_0x2476aa(0x4e9)][_0x2476aa(0x459)],_0x8a0fab=Graphics[_0x2476aa(0x596)]-this[_0x2476aa(0x554)](),_0x45b908=this['mainAreaHeight']()-this['_commandWindow'][_0x2476aa(0x459)],_0x14ecdc=this[_0x2476aa(0x193)]()?Graphics[_0x2476aa(0x596)]-_0x8a0fab:0x0;return new Rectangle(_0x14ecdc,_0x4b3147,_0x8a0fab,_0x45b908);},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x4e3)]=Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x359)],Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x359)]=function(){const _0x3762bd=_0x166c6b;VisuMZ[_0x3762bd(0x435)]['Scene_Shop_createCategoryWindow'][_0x3762bd(0x2b5)](this),this[_0x3762bd(0x2b0)]()&&this[_0x3762bd(0x218)]();},VisuMZ['ItemsEquipsCore'][_0x166c6b(0x498)]=Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x1d7)],Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x1d7)]=function(){const _0x94bf3f=_0x166c6b;return this[_0x94bf3f(0x4a2)]()?this[_0x94bf3f(0x293)]():VisuMZ['ItemsEquipsCore'][_0x94bf3f(0x498)][_0x94bf3f(0x2b5)](this);},Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x293)]=function(){const _0x2b01d3=_0x166c6b,_0x3a647b=this[_0x2b01d3(0x4e9)]['y'],_0x44f23f=this[_0x2b01d3(0x4e9)][_0x2b01d3(0x3aa)],_0x46f533=this[_0x2b01d3(0x469)](0x1,!![]),_0x650a05=this[_0x2b01d3(0x193)]()?Graphics['boxWidth']-_0x44f23f:0x0;return new Rectangle(_0x650a05,_0x3a647b,_0x44f23f,_0x46f533);},Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x218)]=function(){const _0x4cb837=_0x166c6b;delete this[_0x4cb837(0x3e9)]['_handlers']['ok'],delete this['_categoryWindow'][_0x4cb837(0x431)][_0x4cb837(0x520)];},VisuMZ['ItemsEquipsCore'][_0x166c6b(0x349)]=Scene_Shop[_0x166c6b(0x3f4)]['createSellWindow'],Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x584)]=function(){const _0x22a321=_0x166c6b;VisuMZ['ItemsEquipsCore'][_0x22a321(0x349)]['call'](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x22a321(0x471)]();},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x454)]=Scene_Shop['prototype'][_0x166c6b(0x2d5)],Scene_Shop['prototype'][_0x166c6b(0x2d5)]=function(){const _0x2bfc28=_0x166c6b;return this[_0x2bfc28(0x4a2)]()?this[_0x2bfc28(0x347)]():VisuMZ['ItemsEquipsCore'][_0x2bfc28(0x454)][_0x2bfc28(0x2b5)](this);},Scene_Shop['prototype']['sellWindowRectItemsEquipsCore']=function(){const _0x117a5e=_0x166c6b,_0x307641=this['_categoryWindow']['y']+this[_0x117a5e(0x3e9)][_0x117a5e(0x459)],_0x2b0d52=Graphics[_0x117a5e(0x596)]-this['statusWidth'](),_0x45f83e=this[_0x117a5e(0x2ce)]()-this[_0x117a5e(0x3e9)]['height'],_0x33a7a8=this[_0x117a5e(0x193)]()?Graphics[_0x117a5e(0x596)]-_0x2b0d52:0x0;return new Rectangle(_0x33a7a8,_0x307641,_0x2b0d52,_0x45f83e);},Scene_Shop['prototype'][_0x166c6b(0x471)]=function(){const _0x2fa4c8=_0x166c6b;this['_sellWindow']['setStatusWindow'](this[_0x2fa4c8(0x39d)]);},Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x554)]=function(){const _0x285154=_0x166c6b;return VisuMZ[_0x285154(0x435)][_0x285154(0x43a)][_0x285154(0x247)][_0x285154(0x29e)];},VisuMZ[_0x166c6b(0x435)]['Scene_Shop_activateSellWindow']=Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x5a6)],Scene_Shop[_0x166c6b(0x3f4)]['activateSellWindow']=function(){const _0x5cc767=_0x166c6b;VisuMZ['ItemsEquipsCore'][_0x5cc767(0x272)][_0x5cc767(0x2b5)](this),this[_0x5cc767(0x4a2)]()&&this[_0x5cc767(0x39d)]['show'](),this[_0x5cc767(0x55b)][_0x5cc767(0x4aa)]();},VisuMZ['ItemsEquipsCore'][_0x166c6b(0x2bd)]=Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x17c)],Scene_Shop[_0x166c6b(0x3f4)]['commandBuy']=function(){const _0x132476=_0x166c6b;VisuMZ[_0x132476(0x435)][_0x132476(0x2bd)][_0x132476(0x2b5)](this),this[_0x132476(0x4a2)]()&&this[_0x132476(0x219)]();},Scene_Shop[_0x166c6b(0x3f4)]['commandBuyItemsEquipsCore']=function(){const _0x27afe0=_0x166c6b;this['_buyWindowLastIndex']=this[_0x27afe0(0x3a0)]||0x0,this['_buyWindow']['smoothSelect'](this[_0x27afe0(0x3a0)]);},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x2a9)]=Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x3f3)],Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x3f3)]=function(){const _0x53f0ac=_0x166c6b;VisuMZ[_0x53f0ac(0x435)][_0x53f0ac(0x2a9)][_0x53f0ac(0x2b5)](this),this[_0x53f0ac(0x4a2)]()&&this[_0x53f0ac(0x3da)](),this[_0x53f0ac(0x2b0)]()&&(this[_0x53f0ac(0x3e9)][_0x53f0ac(0x569)](0x0),this['onCategoryOk']());},Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x3da)]=function(){const _0x5e7a6c=_0x166c6b;this[_0x5e7a6c(0x31c)][_0x5e7a6c(0x4f8)](),this[_0x5e7a6c(0x4e9)][_0x5e7a6c(0x4f8)]();},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x34e)]=Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x599)],Scene_Shop[_0x166c6b(0x3f4)]['onBuyCancel']=function(){const _0x422e31=_0x166c6b;VisuMZ['ItemsEquipsCore']['Scene_Shop_onBuyCancel']['call'](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x422e31(0x55e)]();},Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x55e)]=function(){const _0x1d7797=_0x166c6b;this['_buyWindowLastIndex']=this['_buyWindow']['index'](),this[_0x1d7797(0x31c)][_0x1d7797(0x1db)](),this['_buyWindow'][_0x1d7797(0x382)](),this[_0x1d7797(0x31c)]['smoothScrollTo'](0x0,0x0),this[_0x1d7797(0x39d)][_0x1d7797(0x1db)](),this['_dummyWindow'][_0x1d7797(0x4f8)]();},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x1b1)]=Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x18b)],Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x18b)]=function(){const _0x746122=_0x166c6b;VisuMZ[_0x746122(0x435)][_0x746122(0x1b1)]['call'](this),this[_0x746122(0x4a2)]()&&this[_0x746122(0x332)]();},Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x332)]=function(){const _0x361740=_0x166c6b;this[_0x361740(0x31c)]['show'](),this[_0x361740(0x4e9)][_0x361740(0x1db)]();},VisuMZ['ItemsEquipsCore'][_0x166c6b(0x19c)]=Scene_Shop['prototype'][_0x166c6b(0x1d2)],Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x1d2)]=function(){const _0x31f6e3=_0x166c6b;$gameTemp[_0x31f6e3(0x24f)]=!![],VisuMZ[_0x31f6e3(0x435)][_0x31f6e3(0x19c)][_0x31f6e3(0x2b5)](this),$gameTemp['_bypassProxy']=![],this[_0x31f6e3(0x1e6)]=this['_buyWindow'][_0x31f6e3(0x1b4)]();},VisuMZ['ItemsEquipsCore'][_0x166c6b(0x47e)]=Scene_Shop['prototype'][_0x166c6b(0x590)],Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x590)]=function(){const _0x451440=_0x166c6b;$gameTemp[_0x451440(0x24f)]=!![],this[_0x451440(0x1e6)]=this[_0x451440(0x31c)][_0x451440(0x1b4)]();const _0x5e0bd8=VisuMZ[_0x451440(0x435)][_0x451440(0x47e)][_0x451440(0x2b5)](this);return $gameTemp[_0x451440(0x24f)]=![],this[_0x451440(0x1e6)]=this['_buyWindow']['item'](),_0x5e0bd8;},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x3bd)]=Scene_Shop['prototype']['onSellOk'],Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x1f3)]=function(){const _0x12328b=_0x166c6b;VisuMZ[_0x12328b(0x435)][_0x12328b(0x3bd)]['call'](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x12328b(0x425)]();},Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x425)]=function(){const _0x480772=_0x166c6b;this[_0x480772(0x3e9)]['show']();},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x4bd)]=Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x41e)],Scene_Shop[_0x166c6b(0x3f4)]['onSellCancel']=function(){const _0x5b0d56=_0x166c6b;VisuMZ[_0x5b0d56(0x435)][_0x5b0d56(0x4bd)]['call'](this),this[_0x5b0d56(0x2b0)]()&&this['onCategoryCancel'](),this[_0x5b0d56(0x4a2)]()&&this[_0x5b0d56(0x173)][_0x5b0d56(0x4f8)]();},Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x20a)]=function(_0x2c196e){const _0x5097ad=_0x166c6b,_0x49b03a=this[_0x5097ad(0x1e6)];this[_0x5097ad(0x1e6)]=_0x2c196e;const _0x54258e=this['sellingPrice']();return this[_0x5097ad(0x1e6)]=_0x49b03a,_0x54258e;},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x35b)]=Scene_Shop[_0x166c6b(0x3f4)]['sellingPrice'],Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x513)]=function(){const _0x3587fa=_0x166c6b;let _0x25b334=this[_0x3587fa(0x331)]();const _0x400ecc=this[_0x3587fa(0x1e6)];return _0x25b334=VisuMZ[_0x3587fa(0x435)][_0x3587fa(0x43a)][_0x3587fa(0x29d)][_0x3587fa(0x50c)][_0x3587fa(0x2b5)](this,_0x400ecc,_0x25b334),_0x25b334;},Scene_Shop['prototype'][_0x166c6b(0x331)]=function(){const _0x1e963a=_0x166c6b;let _0x2fbc2a=this[_0x1e963a(0x1e6)][_0x1e963a(0x192)];if(!this[_0x1e963a(0x1e6)])return 0x0;else{if(this['_item'][_0x1e963a(0x1a6)][_0x1e963a(0x346)](/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)){const _0x3d3740=String(RegExp['$1']);window['item']=this['_item'],window[_0x1e963a(0x192)]=_0x2fbc2a*this[_0x1e963a(0x4cc)]();try{eval(_0x3d3740);}catch(_0x32abb8){if($gameTemp[_0x1e963a(0x3ee)]())console[_0x1e963a(0x1e7)](_0x32abb8);}let _0x3e7bd4=window['price'];window[_0x1e963a(0x1b4)]=undefined,window[_0x1e963a(0x192)]=undefined;if(isNaN(_0x3e7bd4))_0x3e7bd4=0x0;return Math[_0x1e963a(0x523)](_0x3e7bd4);}else return this[_0x1e963a(0x1e6)][_0x1e963a(0x1a6)][_0x1e963a(0x346)](/<SELL PRICE:[ ](\d+)>/i)?parseInt(RegExp['$1']):Math[_0x1e963a(0x523)](this[_0x1e963a(0x209)]());}},Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x209)]=function(){return this['_item']['price']*this['sellPriceRate']();},Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x4cc)]=function(){const _0x4b8eb5=_0x166c6b;return VisuMZ[_0x4b8eb5(0x435)][_0x4b8eb5(0x43a)][_0x4b8eb5(0x29d)][_0x4b8eb5(0x225)];},Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x45d)]=function(){const _0x411286=_0x166c6b;if(!this[_0x411286(0x298)]())return![];if(!this[_0x411286(0x2b0)]())return![];if(!this['_sellWindow'])return![];if(!this[_0x411286(0x55b)][_0x411286(0x544)])return![];return this[_0x411286(0x298)]()&&this[_0x411286(0x2b0)]();},Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x3de)]=function(){const _0x327ad6=_0x166c6b;if(this[_0x327ad6(0x45d)]())return this[_0x327ad6(0x55b)][_0x327ad6(0x1ad)]()===0x1?TextManager[_0x327ad6(0x381)](_0x327ad6(0x27b),'right'):TextManager[_0x327ad6(0x381)](_0x327ad6(0x42e),'pagedown');else{if(this['_numberWindow']&&this[_0x327ad6(0x587)][_0x327ad6(0x544)])return TextManager['getInputMultiButtonStrings'](_0x327ad6(0x27b),_0x327ad6(0x2f8));}return Scene_MenuBase[_0x327ad6(0x3f4)]['buttonAssistKey1'][_0x327ad6(0x2b5)](this);},Scene_Shop['prototype'][_0x166c6b(0x1b3)]=function(){const _0x35d1a0=_0x166c6b;if(this['_numberWindow']&&this['_numberWindow'][_0x35d1a0(0x544)])return TextManager[_0x35d1a0(0x381)]('up',_0x35d1a0(0x377));return Scene_MenuBase[_0x35d1a0(0x3f4)][_0x35d1a0(0x1b3)][_0x35d1a0(0x2b5)](this);},Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x2f9)]=function(){const _0x2b6634=_0x166c6b;if(this[_0x2b6634(0x45d)]())return VisuMZ[_0x2b6634(0x435)]['Settings'][_0x2b6634(0x167)][_0x2b6634(0x26c)];else{if(this[_0x2b6634(0x587)]&&this[_0x2b6634(0x587)][_0x2b6634(0x544)])return VisuMZ[_0x2b6634(0x435)]['Settings'][_0x2b6634(0x29d)]['buttonAssistSmallIncrement'];}return Scene_MenuBase[_0x2b6634(0x3f4)]['buttonAssistText1'][_0x2b6634(0x2b5)](this);},Scene_Shop['prototype']['buttonAssistText2']=function(){const _0x20f7fb=_0x166c6b;if(this['_numberWindow']&&this[_0x20f7fb(0x587)][_0x20f7fb(0x544)])return VisuMZ[_0x20f7fb(0x435)][_0x20f7fb(0x43a)][_0x20f7fb(0x29d)][_0x20f7fb(0x508)];return Scene_MenuBase['prototype'][_0x20f7fb(0x303)][_0x20f7fb(0x2b5)](this);},Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x58e)]=function(){const _0x5bdb44=_0x166c6b;if(!SceneManager[_0x5bdb44(0x360)]())return;const _0x777a6f=VisuMZ[_0x5bdb44(0x435)]['Settings']['ShopScene'];_0x777a6f[_0x5bdb44(0x547)]&&$gameSwitches[_0x5bdb44(0x1b5)](_0x777a6f['SwitchBuy'],![]),_0x777a6f['SwitchSell']&&$gameSwitches[_0x5bdb44(0x1b5)](_0x777a6f[_0x5bdb44(0x352)],![]);},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x26f)]=Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x45e)],Scene_Shop[_0x166c6b(0x3f4)]['doBuy']=function(_0x10e91e){const _0x3c3532=_0x166c6b;VisuMZ[_0x3c3532(0x435)][_0x3c3532(0x26f)][_0x3c3532(0x2b5)](this,_0x10e91e),this['onBuyItem'](this[_0x3c3532(0x1e6)],_0x10e91e);if(_0x10e91e<=0x0)return;const _0xb02db7=VisuMZ[_0x3c3532(0x435)][_0x3c3532(0x43a)][_0x3c3532(0x29d)];_0xb02db7[_0x3c3532(0x547)]&&$gameSwitches[_0x3c3532(0x1b5)](_0xb02db7[_0x3c3532(0x547)],!![]),this['_buyWindow']['refresh'](),this['_sellWindow'][_0x3c3532(0x1f1)]();},Scene_Shop[_0x166c6b(0x3f4)]['onBuyItem']=function(_0x26f0f3,_0x2d649a){const _0x2d71e4=_0x166c6b;this[_0x2d71e4(0x1d3)](_0x26f0f3,_0x2d649a),$gameParty['addShopTrackingItemBuy'](_0x26f0f3,_0x2d649a),$gameParty['addShopTrackingGoldBuy'](_0x2d649a*this['buyingPrice']());},Scene_Shop[_0x166c6b(0x3f4)]['processShopCondListingOnBuyItem']=function(_0x3e342f,_0x49d15a){const _0x133a1a=_0x166c6b;if(!_0x3e342f)return;if(!_0x49d15a)return;const _0x482bb2=VisuMZ[_0x133a1a(0x435)][_0x133a1a(0x1c2)],_0x2f1830=_0x3e342f['note']||'';if(_0x2f1830[_0x133a1a(0x346)](_0x482bb2[_0x133a1a(0x2af)])){const _0x85d1bd=String(RegExp['$1'])['split'](',')['map'](_0x1a20c8=>Number(_0x1a20c8));for(const _0x1d9a54 of _0x85d1bd){$gameSwitches['setValue'](_0x1d9a54,!![]);}}if(_0x2f1830[_0x133a1a(0x346)](_0x482bb2[_0x133a1a(0x282)])){const _0x5c0bec=String(RegExp['$1'])[_0x133a1a(0x3c7)](',')[_0x133a1a(0x436)](_0x34d2d1=>Number(_0x34d2d1));for(const _0x38dfd5 of _0x5c0bec){$gameSwitches[_0x133a1a(0x1b5)](_0x38dfd5,![]);}}},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x320)]=Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x335)],Scene_Shop['prototype']['doSell']=function(_0x1e44ef){const _0x2d80f7=_0x166c6b;VisuMZ[_0x2d80f7(0x435)][_0x2d80f7(0x320)]['call'](this,_0x1e44ef),this[_0x2d80f7(0x52a)](this[_0x2d80f7(0x1e6)],_0x1e44ef);if(_0x1e44ef<=0x0)return;const _0x14ae7b=VisuMZ[_0x2d80f7(0x435)][_0x2d80f7(0x43a)][_0x2d80f7(0x29d)];_0x14ae7b[_0x2d80f7(0x547)]&&$gameSwitches[_0x2d80f7(0x1b5)](_0x14ae7b[_0x2d80f7(0x352)],!![]),this['_buyWindow']['refresh'](),this['_sellWindow'][_0x2d80f7(0x1f1)]();},Scene_Shop['prototype']['onSellItem']=function(_0x2f1493,_0x318c74){const _0x26b9df=_0x166c6b;this['processShopCondListingOnSellItem'](_0x2f1493,_0x318c74),$gameParty[_0x26b9df(0x578)](_0x2f1493,_0x318c74),$gameParty['addShopTrackingGoldSell'](_0x318c74*this[_0x26b9df(0x513)]());},Scene_Shop[_0x166c6b(0x3f4)][_0x166c6b(0x3f5)]=function(_0x45c0cf,_0x33e4c7){const _0x120f10=_0x166c6b;if(!_0x45c0cf)return;if(!_0x33e4c7)return;const _0x3bb6c=VisuMZ[_0x120f10(0x435)][_0x120f10(0x1c2)],_0x4a030b=_0x45c0cf[_0x120f10(0x1a6)]||'';if(_0x4a030b[_0x120f10(0x346)](_0x3bb6c[_0x120f10(0x372)])){const _0x1cd46f=String(RegExp['$1'])[_0x120f10(0x3c7)](',')['map'](_0x4071a4=>Number(_0x4071a4));for(const _0x4549c8 of _0x1cd46f){$gameSwitches[_0x120f10(0x1b5)](_0x4549c8,!![]);}}if(_0x4a030b['match'](_0x3bb6c[_0x120f10(0x1d8)])){const _0x50d7a0=String(RegExp['$1'])[_0x120f10(0x3c7)](',')[_0x120f10(0x436)](_0x77b3fc=>Number(_0x77b3fc));for(const _0x9181c9 of _0x50d7a0){$gameSwitches[_0x120f10(0x1b5)](_0x9181c9,![]);}}};function _0x18d7(){const _0x302020=['%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','getItemDamageElementLabel','uiHelpPosition','mainCommandWidth','_shopTrackingData','STR','alterSkillName','Speed1','commandSellItemsEquipsCore','createBitmap','find','forceResetEquipSlots','buttonAssistKey1','filter','SetupProxyItemGroup','drawItemEffectsAddedStatesBuffs','MDF','Game_Party_gainItem','Scene_Load_reloadMapIfUpdated','slotWindowRectItemsEquipsCore','SpeedNeg999','ClassicArmorParameters','addLoadListener','_categoryWindow','Scene_Battle','meetsShopListingConditions','VisuMZ_1_BattleCore','initNewItemsList','isPlaytest','EFFECT_ADD_BUFF','placeItemNewLabel','discardEquip','ARRAYSTR','commandSell','prototype','processShopCondListingOnSellItem','setItem','LabelHitType','DrawPortraitJS','create','getParamValueClassicCore','iconWidth','EquipAdjustHpMp','_forcedSlots','textColor','calcEquipItemPerformance','etypeId','Scene_Item_createCategoryWindow','changePaintOpacity','previousActor','NAME','cursorPagedown','refreshItemsEquipsCoreNoMenuImage','categoryStyleCheck','isProxyItem','isEquipWtypeOk','param','Scene_Shop_create','100%','getItemConsumableLabel','Categories','_doubleTouch','Scene_Equip_commandEquip','drawItemActorMenuImage','fill','removeState','isEquipTypeSealed','CONSUMABLE','getItemRepeatsLabel','EFFECT_REMOVE_STATE','ParseArmorNotetags','drawItemEffectsMpRecovery','maxItems','initShopTrackingData','user','value2','onSellCancel','equipCmdDesc','isHoverEnabled','Step3Start','IconSet','_bypassReleaseUnequippableItemsItemsEquipsCore','sortListItemScene','onSellOkItemsEquipsCore','categoryNameWindowDrawBackground','onTouchSelect','Game_Actor_paramPlus','createItemWindow','getItemEffectsTpDamageLabel','TCR','MaxIcons','itemLineRect','pageup','dataId','setNewItem','_handlers','equip2','meetsEquipRequirement','changeTextColor','ItemsEquipsCore','map','onDatabaseLoaded','drawTextEx','isEquipCommandAdded','Settings','playCancel','atk','LabelApply','Scene_Equip_onSlotCancel','canEquip','DrawEquipData','drawItemEffectsTpDamage','process_VisuMZ_ItemsEquipsCore_Notetags','atypeId','drawItemEffectsTpRecovery','drawItemName','changeEquipById','bestEquipItem','drawParamsItemsEquipsCore','drawEquipData','Step2End','ARRAYNUM','_allowArtifactParamBase','mpRate','_skillIDs','paramId','commandName','onSlotOk','updateCommandNameWindow','KeyItemProtect','Scene_Shop_sellWindowRect','successRate','isSoleArmorType','Window_EquipStatus_refresh','onTouchOk','height','goldWindowRect','MANUAL','helpDescriptionText','buttonAssistItemListRequirement','doBuy','isItem','Game_Party_consumeItem','getItemsEquipsCoreBackColor1','setShopStatusWindowMode','changeBuff','traits','createCommandNameWindow','MenuPortraits','_shopStatusMenuMode','createNewLabelSprite','calcWindowHeight','Parse_Notetags_ParamValues','_paramPlus','LabelConsume','isEquipAtypeOk','level','OffsetY','Window_ItemList_colSpacing','postCreateSellWindowItemsEquipsCore','hitIndex','setHelpWindow','allowCreateStatusWindow','getPurifyTransformation','SpeedNeg2000','Scene_Boot_onDatabaseLoaded','_customItemInfo','_weaponIDs','indexOf','hasItem','playCursorSound','Scene_Equip_create','Scene_Shop_buyingPrice','playBuzzerSound','_cache_etypeIDs','Slots','AlreadyEquipMarker','HP\x20RECOVERY','getItemHitTypeText','removeBattleTestArtifacts','equip','drawItemEffectsRemovedStatesBuffs','Game_Enemy_traitObjects_artifact','1108902nWJKIg','commandStyle','ATK','getTextColor','REMOVED\x20EFFECTS','drawUpdatedParamName','selfTP','CmdTextAlign','limitedPageUpDownSceneCheck','helpDesc','drawEquipDataDouble','_slotId','isPageChangeRequested','initEquips','RegExp','Scene_Shop_categoryWindowRect','speed','getItemEffectsTpRecoveryText','items','Actors','SUCCESS\x20RATE','isClearEquipOk','Window_ItemList_drawItem','Parse_Notetags_EquipSlots','localeCompare','isUseItemsEquipsCoreUpdatedLayout','tpGain','drawItemStyleIcon','setCategory','EquipDataStyle','SwitchID','BackRectColor','Game_Item_setObject','updateHelp','ElementWeapon','textSizeEx','_money','drawItemQuantity','isHovered','commandStyleCheck','drawItem','maxmp','actor','CRI','cursorDown','\x5cI[%1]','allowShiftScrolling','_classIDs','ScopeRandomAny','removeStateBuffChanges','ParseAllNotetags','artifacts','Scene_Shop_onSellCancel','EFFECT_RECOVER_MP','flatHP','allowCommandWindowCursorUp','drawParamName','Scene_Equip','RemoveEquipIcon','processCursorMoveModernControls','allMembers','getMatchingInitEquip','paramPlus','Style','getItemEffectsHpDamageLabel','English','getItemColor','sellPriceRate','onTouchSelectModernControls','LabelRepeats','Step2Start','NoEquipTypeResult','test','damageColor','SortByIDandPriority','toggleType','currencyUnit','_shopStatusMenuAlly','process_VisuMZ_ItemsEquipsCore_RegExp','Pick\x20and\x20choose\x20equipment\x20to\x20change.','setHelpWindowItem','blt','revertGlobalNamespaceVariables','isEquipChangeOk','_category','DoubleArmorParameters','addShopTrackingItemBuy','_data','Window_ShopBuy_item','EquipScene','Scene_Shop_createCategoryWindow','drawItemCustomEntries','isCursorMovable','isWeapon','prepareNextScene','_etypeIDs','_commandWindow','activateItemWindow','Scene_Equip_slotWindowRect','number','Window_ItemCategory_initialize','getParamValueClassicNoCore','VisuMZ_0_CoreEngine','actorId','mmp','setHandler','isSellCommandEnabled','elementId','TRG','Window_ItemList_item','REC','hide','commandNameWindowCenter','MRF','ADDED\x20EFFECTS','mdf','forceChangeEquip','categoryNameWindowDrawText','WeaponType','New','isHandled','hideAdditionalSprites','isDrawItemNumber','isArtifact','format','ParseClassNotetags','trim','buttonAssistLargeIncrement','goldWindowRectItemsEquipsCore','object','checkItemConditionsSwitchNotetags','SellPriceJS','\x5cI[%1]%2','releaseUnequippableItems','commandNameWindowDrawBackground','luk','canEquipArmor','icon','sellingPrice','length','Damage\x20Formula\x20Error\x20for\x20%1','params','visible','FadeSpeed','LayoutStyle','drawActorParamClassic','HIT','categories','isGoodShown','getItemEffects','categoryList','cancel','forceChangeEquipSlots','getItemsEquipsCoreBackColor2','floor','NeverUsable','onTouchCancel','EFFECT_REMOVE_BUFF','Step1End','Scope%1','hasOwnProperty','onSellItem','308822ozitJF','CursedTextPopup','updateNewLabelOpacity','Game_Actor_forceChangeEquip','HiddenItemB','Scene_Equip_helpWindowRect','FontSize','Icon','refreshCursor','purifyCursedEquips','buy','AllWeapons','NotConsumable','_scene','convertInitEquipsToItems','currentExt','auto','setItemWindow','Window_ShopBuy_price','changeEquipBase','getShopTrackingItem','getItemIdWithName','commandWindowRectItemsEquipsCore','sell','isShiftRemoveShortcutEnabled','active','itemAt','canSortListItemScene','SwitchBuy','getInputButtonString','addShopTrackingItem','MCR','Speed1000','setStatusWindow','Scene_Item_create','canUse','ParseWeaponNotetags','shouldCommandWindowExist','random','LUK','clearNewItem','statusWidth','drawItemStyleIconText','gaugeBackColor','actorParams','isDualWield','isTriggered','ScopeAllyOrEnemy','_sellWindow','drawCustomShopGraphic','MP\x20RECOVERY','onBuyCancelItemsEquipsCore','nonOptimizeEtypes','update','drawItemScope','Weapon\x20Type','traitObjects','buttonAssistRemove','Speed0','itemPadding','PurchaseOnly','drawItemData','smoothSelect','ScopeAlliesButUser','OCCASION','Window_Selectable_refresh','description','drawEquipDataCompare','isMainMenuCoreMenuImageOptionAvailable','contentsBack','Scene_Item_createItemWindow','weapon','anyEmptyEquipSlotsOfSameEtype','isCustomParameter','powerDownColor','getItemSpeedLabel','proxyItem','addShopTrackingItemSell','colSpacing','normalColor','wtypeId','isCursedItem','numberWindowRectItemsEquipsCore','HiddenItemA','every','helpWindowRectItemsEquipsCore','CommandAddOptimize','resetTextColor','setBackgroundType','createSellWindow','makeCommandList','meetsItemConditions','_numberWindow','getItemSuccessRateLabel','getItemEffectsSelfTpGainText','drawItemConsumable','Game_BattlerBase_meetsItemConditions','ConvertParams','isClearCommandAdded','resetShopSwitches','Whitelist','buyingPrice','equips','getItemRepeatsText','helpWindowRect','drawCustomShopGraphicLoad','paramJS','boxWidth','version','getEquipDataStyle','onBuyCancel','splice','hitType','addSellCommand','getItemDamageAmountText','TextAlign','_cache','Window_ItemList_makeItemList','drawActorParamDifference','AllItems','currentSymbol','Parse_Notetags_Category','replace','activateSellWindow','popScene','MaxWeapons','7hOwYDj','Game_Actor_changeClass','<%1:[\x20]([\x5c+\x5c-]\x5cd+)>','Game_BattlerBase_param','TGR','iconIndex','isArray','removeBuff','categoryItemTypes','parameters','iconText','processCursorSpecialCheckModernControls','getItemEffectsMpRecoveryLabel','addCommand','partyArtifactIDs','ItemScene','REPEAT','foreground','drawItemEffectsHpDamage','pagedown','loadFaceImages','armorTypes','prepareRefreshItemsEquipsCoreLayout','GRD','isEquipItem','PurifyParty','ItemMenuStatusBgType','_dummyWindow','BatchShop','includes','NonOptimizeETypes','isVisuMzLocalizationEnabled','clearCmdDesc','CNT','15957sEgefc','equipHasCustomParams','commandBuy','setObject','playOkSound','index','isOptimizeEquipOk','innerHeight','Scene_Shop_goldWindowRect','DrawIcons','getNextAvailableEtypeId','getShopTrackingGoldBuy','Scene_Equip_onActorChange','getItemEffectsAddedStatesBuffsText','isBottomHelpMode','isEquipCommandEnabled','onActorChange','onCategoryCancel','return\x200','ScopeEnemyOrAlly','USER\x20TP\x20GAIN','gainItem','equipSlots','EVA','price','isRightInputMode','shift','formula','EFFECT_REMOVE_DEBUFF','_purchaseOnly','_getClassRequirements','Scene_Shop','BorderRegExp','isPartyArtifact','Scene_Shop_onBuyOk','_categoryNameWindow','createCategoryNameWindow','_tempActorB','inBattle','troopArtifacts','CmdStyle','ArmorType','addClearCommand','FDR','note','Parse_Notetags_Sorting','ARRAYEVAL','makeItemList','isClearCommandEnabled','1838616yRjeHV','getItemEffectsHpRecoveryLabel','maxCols','Window_ShopStatus_setItem','KeyItems','_newLabelOpacityUpperLimit','Scene_Shop_onCategoryCancel','playEquip','buttonAssistKey2','item','setValue','meetsEquipRequirements','weapon-%1','addCancelCommand','CEV','some','cursorPageup','consumable','LabelRecoverTP','Speed2000','processTouchModernControls','_itemWindow','StatusWindowWidth','ShopListingRegExp','Scene_Shop_commandWindowRect','fontSize','concat','processDrawIcon','CmdCancelRename','_commandNameWindow','push','addItemCategory','toLowerCase','%1%','Scene_Equip_createCommandWindow','clamp','armor-%1','isKeyItem','resetFontSettings','onBuyOk','processShopCondListingOnBuyItem','drawItemDarkRect','changeClass','isRepeated','categoryWindowRect','SellTurnSwitchOff','getItemEffectsRemovedStatesBuffsText','drawItemDamage','show','Game_Party_gainItem_artifact','Scene_Shop_numberWindowRect','mat','DrawEquipDoubleData','rateHP','Scene_Item_itemWindowRect','drawItemDamageElement','middle','helpAreaHeight','SpeedNeg1999','_item','log','smallParamFontSize','DrawFaceJS','adjustItemWidthByStatus','WEAPON','activate','currentClass','_calculatingJSParameters','Remove\x20all\x20available\x20equipment.','OffsetX','refresh','W%1','onSellOk','artifactIDs','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','addWindow','customEquipParams','compare','drawUpdatedAfterParamValue','Occasion%1','isNewItem','paramValueByName','isStackableArtifact','isOpen','getEmptyEquipSlotOfSameEtype','ActorResetEquipSlots','addBuyCommand','double','Window_EquipSlot_isEnabled','isShowNew','Blacklist','getItemEffectsMpRecoveryText','_newItemsList','ARMOR','baseSellingPrice','sellPriceOfItem','isOptimizeCommandAdded','innerWidth','prepare','contents','ShopMenuStatusStandard','_allowArtifactTraitObjects','EquipDelayMS','onSlotCancel','+%1','Scene_ItemBase_activateItemWindow','updateChangedSlots','STRUCT','optKeyItemsNumber','postCreateCategoryWindowItemsEquipsCore','commandBuyItemsEquipsCore','powerUpColor','Scene_Equip_commandWindowRect','_goodsCount','MaxMP','SortBy','getItemDamageElementText','Game_BattlerBase_canEquip_artifact','%1-%2','getItemEffectsHpDamageText','getShopTrackingItemBuy','HRG','SellPriceRate','addShopTrackingGoldSell','drawItemRepeats','isBuyCommandEnabled','Enable','placeNewLabel','value1','LabelRemove','classic','buffIconIndex','changeEquip','_helpWindow','DrawItemData','maxItemAmount','Scene_Shop_statusWindowRect','Scene_Shop_helpWindowRect','buttonAssistText3','ParseItemNotetags','drawItemDamageAmount','categoryNameWindowCenter','getItemEffectsHpRecoveryText','getEtypeIDs','MRG','scope','_actor','clearNewLabelFromItem','getColor','drawPossession','ScopeRandomAllies','CheckCursedItemMsg','prepareItemCustomData','equipTypes','DEF','registerCommand','StatusWindow','NonRemoveETypes','drawItemEffectsHpRecovery','textWidth','TP\x20DAMAGE','UNDEFINED!','getItemSpeedText','VisuMZ_1_SkillsStatesCore','_bypassProxy','HP\x20DAMAGE','BattleUsable','fillRect','geUpdatedLayoutStatusWidth','ElementNone','toUpperCase','ShiftShortcutKey','Game_Actor_equips_artifacts','LabelSuccessRate','Parse_Notetags_Batch','paramchangeTextColor','DrawBackRect','hideNewLabelSprites','onTouchSelectModern','ActorChangeEquipSlots','Game_Actor_changeEquip','drawItemEquipSubType','systemColor','hideDisabledCommands','getItemEffectsTpRecoveryLabel','isBattleTest','opacity','_itemIDs','A%1','drawItemHitType','getWeaponIdWithName','onCategoryOk','_scrollDuration','buttonAssistCategory','Game_Actor_tradeItemWithParty','addShopTrackingGoldBuy','Scene_Shop_doBuy','gold','Scene_Equip_itemWindowRect','Scene_Shop_activateSellWindow','optimizeCmdDesc','paintOpacity','Text','drawNewLabelText','#%1','setupBattleTestItems','drawItemSpeed','+%1%','left','refreshDelay','buttonAssistOffset3','addInnerChild','bitmap','getEquipRequirements','switchProxyItem','BuyTurnSwitchOff','damage','PurifyActors','CoreEngine','goodsToItem','_newLabelOpacity','MAXHP','processDownCursorSpecialCheckModernControls','Window_ItemList_updateHelp','setItemDelay','isTroopArtifact','postCreateItemWindowModernControls','getItemDamageAmountLabel','Window_ShopBuy_goodsToItem','getItemQuantityText','drawItemCustomEntryLine','equipAdjustHpMp','categoryWindowRectItemsEquipsCore','getMenuImage','getEtypeIdWithName','fontSizeRatio','drawIcon','updatedLayoutStyle','ItemQuantityFontSize','partyArtifacts','adjustHiddenShownGoods','ItemQuantityFmt','ShopScene','Width','paramValueFontSize','FadeLimit','drawEquipDataClassic','onSlotOkAutoSelect','getDamageStyle','sort','getItemDamageAmountLabelOriginal','Parse_Notetags_ParamJS','pop','Window_ShopCommand_initialize','Scene_Shop_commandSell','max','loadPicture','AGI','rateMP','top','BuyTurnSwitchOn','isUseModernControls','ItemMenuStatusRect','Game_Actor_isEquipChangeOk','HideAnySwitches','defaultItemMax','call','HideAllSwitches','itemDataFontSize','Translucent','ITEMS_EQUIPS_CORE','initNewLabelSprites','_tempActor','MaxItems','Scene_Shop_commandBuy','uiInputPosition','setupItemDamageTempActors','weaponTypes','_itemData','sortPriority','select','Scene_Equip_statusWindowRect','deactivate','drawNewLabelIcon','value','equipSlotIndex','ItemSceneAdjustItemList','PDR','item-%1','maxBattleMembers','ceil','mainAreaHeight','Game_Party_numItems','ARRAYFUNC','VisuMZ_2_WeaponSwapSystem','drawText','MaxHP','CannotEquipMarker','sellWindowRect','removeDebuff','DrawEquipClassicData','getItemEffectsRemovedStatesBuffsLabel','fontFace','Window_Selectable_setHelpWindowItem','addItemCategories','isSoleWeaponType','itemWindowRectItemsEquipsCore','helpAreaTop','commandWindowRect','_newLabelSprites','isPurifyItemSwapOk','battleMembers','_bypassNewLabel','CustomParamNames','statusWindowRect','canConsumeItem','getItemEffectsMpDamageLabel','remove','troopArtifactIDs','MDR','round','Scene_Shop_buyWindowRect','CmdIconCancel','getArmorIdWithName','JSON','addChild','parse','cursorLeft','tradeItemWithParty','setText','buyWindowRectItemsEquipsCore','NoChangeMarker','getItemOccasionText','right','buttonAssistText1','meetsItemConditionsNotetags','drawUpdatedBeforeParamValue','ExtDisplayedParams','EnableLayout','341296bxgYMy','values','cursorRight','Window_EquipItem_isEnabled','_goods','buttonAssistText2','CmdIconSell','occasion','0000','Window_ShopBuy_refresh','drawItemEffects','Nonconsumable','optimize','DamageType%1','drawing','ParamChangeFontSize','newLabelEnabled','isClicked','LabelSelfGainTP','isOptimizeCommandEnabled','PHA','versionId','loseItem','refreshActor','MP\x20DAMAGE','Scene_Shop_prepare','RegularItems','processShiftRemoveShortcut','itypeId','processHandling','_buyWindow','uiMenuStyle','setTopRow','_newLabelOpacityChange','Scene_Shop_doSell','HIT\x20TYPE','paramPlusItemsEquipsCoreCustomJS','mainAreaTop','CommandAddClear','mainFontSize','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','getItemEffectsMpDamageText','_buttonAssistWindow','drawItemEffectsSelfTpGain','Window_EquipCommand_initialize','\x5cb%1\x5cb','makeDeepCopy','ARRAYJSON','statusWindowRectItemsEquipsCore','name','callUpdateHelp','determineBaseSellingPrice','onCategoryCancelItemsEquipsCore','getItemDamageAmountLabelBattleCore','lineHeight','doSell','getItemEffectsTpDamageText','isCommandEnabled','Game_Actor_discardEquip','mhp','nonRemovableEtypes','getItemScopeText','getShopTrackingData','AlwaysUsable','Scene_Item','Param','Parse_Notetags_EnableJS','min','makeItemData','bind','initialize','932SAQRLp','match','sellWindowRectItemsEquipsCore','_getEquipRequirements','Scene_Shop_createSellWindow','buttonAssistKey3','_armorIDs','2890yPiWDL','Window_ShopSell_isEnabled','Scene_Shop_onBuyCancel','onMenuImageLoad','windowPadding','451200QqDOKs','SwitchSell','getPrototypeOf','slotWindowRect','EVAL','isEnabled','Scope7','clear','createCategoryWindow','categoryStyle','Scene_Shop_sellingPrice','DAMAGE\x20MULTIPLIER','933Gsnxdq','center','paramBase','isSceneShop','MAT','Window_ItemList_maxCols','text','getItemConsumableText','numberWindowRect','deepCopy','Parse_Notetags_Prices','optimizeEquipments','getClassIdWithName','TP\x20RECOVERY','exit','drawItemNumber','drawUpdatedParamValueDiff','_slotWindow','drawItemCost','refreshActorEquipSlotsIfUpdated','(+%1)','SellTurnSwitchOn','LabelDamageMP','?????','SPEED','getShopTrackingGoldSell','down','_equips','IncludeShopItem','_resetFontSize','isUseParamNamesWithIcons','addEquipCommand','Scene_Item_helpWindowRect','Step3End','getSkillIdWithName','getProxyItem','getInputMultiButtonStrings','deselect','numItems','updateCategoryNameWindow','flatMP','CmdIconClear','keyItem','createSlotWindow','isPressed','EQUIP_DELAY_MS','gainTP','iconHeight','FieldUsable','MAXMP','Window_Selectable_initialize','EquipParams','LabelSpeed','Armor\x20Type','checkShiftRemoveShortcut','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','commandEquip','getItemDamageAmountTextOriginal','start','addState','getClassRequirements','===','Window_EquipItem_includes','buyWindowRect','_statusWindow','itemWindowRect','createCommandWindow','_buyWindowLastIndex','category','money','drawItemOccasion','members','_list','Type','drawItemEffectsMpDamage','itemTextAlign','createTempActorEquips','width','Scene_Equip_onSlotOk','DoubleWeaponParameters','_tempActorA','Scene_Equip_createSlotWindow','drawItemKeyData','Consumable','possession','armors','drawItemEquipType','type','modifiedBuyPriceItemsEquipsCore','isSkill','Game_Party_setupBattleTestItems_artifact','SetupArtifactItemIDs','isCancelled','constructor','getItemHitTypeLabel','code','Scene_Shop_onSellOk','drawCurrencyValue','background','addOptimizeCommand','Step1Start','isArmor','buttonAssistSlotWindowShift','itemEnableJS','itemHasEquipLimit','commandNameWindowDrawText','split','_checkEquipRequirements','addStateBuffChanges','MaxArmors','move','_resetFontColor','getItemEffectsAddedStatesBuffsLabel','scrollTo','setTempActor','n/a','getEtypeIDsCache'];_0x18d7=function(){return _0x302020;};return _0x18d7();}function Sprite_NewLabel(){const _0x294c0b=_0x166c6b;this[_0x294c0b(0x344)](...arguments);}Sprite_NewLabel[_0x166c6b(0x3f4)]=Object[_0x166c6b(0x3f9)](Sprite[_0x166c6b(0x3f4)]),Sprite_NewLabel[_0x166c6b(0x3f4)][_0x166c6b(0x3ba)]=Sprite_NewLabel,Sprite_NewLabel[_0x166c6b(0x3f4)][_0x166c6b(0x344)]=function(){const _0x3630e1=_0x166c6b;Sprite['prototype'][_0x3630e1(0x344)][_0x3630e1(0x2b5)](this),this[_0x3630e1(0x3db)]();},Sprite_NewLabel[_0x166c6b(0x3f4)][_0x166c6b(0x3db)]=function(){const _0x249f40=_0x166c6b,_0x21c717=ImageManager['iconWidth'],_0x8e87a4=ImageManager[_0x249f40(0x38c)];this[_0x249f40(0x27f)]=new Bitmap(_0x21c717,_0x8e87a4),this[_0x249f40(0x2c6)](),this[_0x249f40(0x276)]();},Sprite_NewLabel[_0x166c6b(0x3f4)][_0x166c6b(0x2c6)]=function(){const _0x272675=_0x166c6b,_0x13aa0b=VisuMZ[_0x272675(0x435)]['Settings'][_0x272675(0x500)][_0x272675(0x532)];if(_0x13aa0b<=0x0)return;const _0x2c35b0=ImageManager['loadSystem'](_0x272675(0x422)),_0x4e2bd8=ImageManager[_0x272675(0x3fb)],_0x59152c=ImageManager[_0x272675(0x38c)],_0x106226=_0x13aa0b%0x10*_0x4e2bd8,_0x4e80b8=Math[_0x272675(0x523)](_0x13aa0b/0x10)*_0x59152c;this[_0x272675(0x27f)][_0x272675(0x4da)](_0x2c35b0,_0x106226,_0x4e80b8,_0x4e2bd8,_0x59152c,0x0,0x0);},Sprite_NewLabel[_0x166c6b(0x3f4)][_0x166c6b(0x276)]=function(){const _0x49904c=_0x166c6b,_0x283e29=VisuMZ[_0x49904c(0x435)]['Settings'][_0x49904c(0x500)],_0x230f6a=_0x283e29[_0x49904c(0x275)];if(_0x230f6a==='')return;const _0x4f8da9=ImageManager['iconWidth'],_0x4198cd=ImageManager['iconHeight'];this['bitmap'][_0x49904c(0x2d9)]=_0x283e29['FontFace']||$gameSystem['mainFontFace'](),this[_0x49904c(0x27f)][_0x49904c(0x3fe)]=this['getTextColor'](),this[_0x49904c(0x27f)]['fontSize']=_0x283e29[_0x49904c(0x531)],this['bitmap'][_0x49904c(0x2d2)](_0x230f6a,0x0,_0x4198cd/0x2,_0x4f8da9,_0x4198cd/0x2,_0x49904c(0x35e));},Sprite_NewLabel[_0x166c6b(0x3f4)][_0x166c6b(0x48c)]=function(){const _0x4fdd6d=_0x166c6b,_0x23a487=VisuMZ[_0x4fdd6d(0x435)]['Settings'][_0x4fdd6d(0x500)]['FontColor'];return _0x23a487['match'](/#(.*)/i)?'#'+String(RegExp['$1']):ColorManager[_0x4fdd6d(0x3fe)](_0x23a487);},Window_Base['prototype'][_0x166c6b(0x445)]=function(_0x4a59a8,_0x3f8815,_0x4f90dd,_0x44b06a){const _0x55fafe=_0x166c6b;if(_0x4a59a8){const _0x376d8b=_0x4f90dd+(this[_0x55fafe(0x334)]()-ImageManager[_0x55fafe(0x38c)])/0x2,_0x22a17c=ImageManager[_0x55fafe(0x3fb)]+0x4,_0x9990e5=Math[_0x55fafe(0x2aa)](0x0,_0x44b06a-_0x22a17c);this[_0x55fafe(0x434)](ColorManager[_0x55fafe(0x4cb)](_0x4a59a8)),this['drawIcon'](_0x4a59a8[_0x55fafe(0x15d)],_0x3f8815,_0x376d8b),this[_0x55fafe(0x2d2)](_0x4a59a8[_0x55fafe(0x32f)],_0x3f8815+_0x22a17c,_0x4f90dd,_0x9990e5),this[_0x55fafe(0x582)]();}},Window_Base[_0x166c6b(0x3f4)][_0x166c6b(0x36c)]=function(_0x4c98e8,_0x3a0f2d,_0x25cfd1,_0x21879f){const _0x26c10a=_0x166c6b;if(this['isDrawItemNumber'](_0x4c98e8)){this[_0x26c10a(0x1d1)]();const _0x1b6f13=VisuMZ['ItemsEquipsCore'][_0x26c10a(0x43a)][_0x26c10a(0x167)],_0x382d28=_0x1b6f13[_0x26c10a(0x29c)],_0x5228d4=_0x382d28['format']($gameParty['numItems'](_0x4c98e8));this['contents'][_0x26c10a(0x1c4)]=_0x1b6f13[_0x26c10a(0x299)],this['drawText'](_0x5228d4,_0x3a0f2d,_0x25cfd1,_0x21879f,_0x26c10a(0x2f8)),this[_0x26c10a(0x1d1)]();}},Window_Base[_0x166c6b(0x3f4)][_0x166c6b(0x503)]=function(_0x3bbe50){const _0x12e645=_0x166c6b;if(DataManager[_0x12e645(0x1d0)](_0x3bbe50))return $dataSystem[_0x12e645(0x217)];return!![];},Window_Base[_0x166c6b(0x3f4)][_0x166c6b(0x1d4)]=function(_0x5aa778,_0x422685,_0x414245,_0x1677c7,_0x442b83){const _0x1a09e8=_0x166c6b;_0x442b83=Math[_0x1a09e8(0x2aa)](_0x442b83||0x1,0x1);while(_0x442b83--){_0x1677c7=_0x1677c7||this[_0x1a09e8(0x334)](),this['contentsBack'][_0x1a09e8(0x274)]=0xa0;const _0xb0cc47=ColorManager[_0x1a09e8(0x556)]();this[_0x1a09e8(0x570)][_0x1a09e8(0x252)](_0x5aa778+0x1,_0x422685+0x1,_0x414245-0x2,_0x1677c7-0x2,_0xb0cc47),this[_0x1a09e8(0x570)][_0x1a09e8(0x274)]=0xff;}},VisuMZ[_0x166c6b(0x435)]['Window_Selectable_initialize']=Window_Selectable[_0x166c6b(0x3f4)][_0x166c6b(0x344)],Window_Selectable[_0x166c6b(0x3f4)][_0x166c6b(0x344)]=function(_0x16be95){const _0x1553a3=_0x166c6b;this['initNewLabelSprites'](),VisuMZ[_0x1553a3(0x435)][_0x1553a3(0x38f)][_0x1553a3(0x2b5)](this,_0x16be95);},Window_Selectable[_0x166c6b(0x3f4)][_0x166c6b(0x2ba)]=function(){const _0x333897=_0x166c6b;this[_0x333897(0x2e0)]={},this[_0x333897(0x287)]=0xff,this[_0x333897(0x31f)]=VisuMZ[_0x333897(0x435)][_0x333897(0x43a)][_0x333897(0x500)][_0x333897(0x518)],this[_0x333897(0x1b0)]=VisuMZ[_0x333897(0x435)]['Settings'][_0x333897(0x500)][_0x333897(0x2a0)];},Window_Selectable[_0x166c6b(0x3f4)][_0x166c6b(0x204)]=function(){return![];},VisuMZ['ItemsEquipsCore'][_0x166c6b(0x2da)]=Window_Selectable[_0x166c6b(0x3f4)][_0x166c6b(0x4d9)],Window_Selectable[_0x166c6b(0x3f4)][_0x166c6b(0x4d9)]=function(_0x4a58f0){const _0x29721e=_0x166c6b;VisuMZ[_0x29721e(0x435)][_0x29721e(0x2da)][_0x29721e(0x2b5)](this,_0x4a58f0);if(this[_0x29721e(0x204)]())this[_0x29721e(0x23e)](_0x4a58f0);},Window_Selectable[_0x166c6b(0x3f4)][_0x166c6b(0x23e)]=function(_0x6bba65){const _0x572be7=_0x166c6b;if(!_0x6bba65)return;$gameParty[_0x572be7(0x553)](_0x6bba65);let _0x5adfbe='';if(DataManager['isItem'](_0x6bba65))_0x5adfbe=_0x572be7(0x2cb)[_0x572be7(0x505)](_0x6bba65['id']);else{if(DataManager[_0x572be7(0x4e6)](_0x6bba65))_0x5adfbe=_0x572be7(0x1b7)[_0x572be7(0x505)](_0x6bba65['id']);else{if(DataManager[_0x572be7(0x3c2)](_0x6bba65))_0x5adfbe=_0x572be7(0x1cf)[_0x572be7(0x505)](_0x6bba65['id']);else return;}}const _0x49719f=this[_0x572be7(0x2e0)][_0x5adfbe];if(_0x49719f)_0x49719f[_0x572be7(0x4f8)]();},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x56c)]=Window_Selectable[_0x166c6b(0x3f4)][_0x166c6b(0x1f1)],Window_Selectable[_0x166c6b(0x3f4)][_0x166c6b(0x1f1)]=function(){const _0x4de718=_0x166c6b;this[_0x4de718(0x25c)](),VisuMZ['ItemsEquipsCore'][_0x4de718(0x56c)][_0x4de718(0x2b5)](this);},Window_Selectable[_0x166c6b(0x3f4)][_0x166c6b(0x25c)]=function(){const _0x472e94=_0x166c6b;for(const _0xbaae1b of Object[_0x472e94(0x2ff)](this[_0x472e94(0x2e0)])){_0xbaae1b[_0x472e94(0x4f8)]();}},VisuMZ['ItemsEquipsCore']['Window_Selectable_update']=Window_Selectable[_0x166c6b(0x3f4)][_0x166c6b(0x560)],Window_Selectable[_0x166c6b(0x3f4)][_0x166c6b(0x560)]=function(){const _0x359245=_0x166c6b;this['updateNewLabelOpacity'](),VisuMZ[_0x359245(0x435)]['Window_Selectable_update'][_0x359245(0x2b5)](this);},Window_Selectable[_0x166c6b(0x3f4)][_0x166c6b(0x52d)]=function(){const _0x3ad2ab=_0x166c6b;if(!this[_0x3ad2ab(0x204)]())return;const _0x1c6285=this[_0x3ad2ab(0x1b0)];this[_0x3ad2ab(0x287)]+=this[_0x3ad2ab(0x31f)];(this['_newLabelOpacity']>=_0x1c6285||this[_0x3ad2ab(0x287)]<=0x0)&&(this[_0x3ad2ab(0x31f)]*=-0x1);this[_0x3ad2ab(0x287)]=this[_0x3ad2ab(0x287)]['clamp'](0x0,_0x1c6285);for(const _0x588d8d of Object['values'](this[_0x3ad2ab(0x2e0)])){_0x588d8d[_0x3ad2ab(0x265)]=this[_0x3ad2ab(0x287)];}},Window_Selectable[_0x166c6b(0x3f4)]['createNewLabelSprite']=function(_0x4443ee){const _0x14a3d7=_0x166c6b,_0x3db637=this[_0x14a3d7(0x2e0)];if(_0x3db637[_0x4443ee])return _0x3db637[_0x4443ee];else{const _0x1f07c2=new Sprite_NewLabel();return _0x3db637[_0x4443ee]=_0x1f07c2,this[_0x14a3d7(0x27e)](_0x1f07c2),_0x1f07c2;}},Window_Selectable['prototype'][_0x166c6b(0x22a)]=function(_0x23f83d,_0x3c574c,_0x4aa891){const _0x49da6c=_0x166c6b;let _0x83a130='';if(DataManager[_0x49da6c(0x45f)](_0x23f83d))_0x83a130=_0x49da6c(0x2cb)[_0x49da6c(0x505)](_0x23f83d['id']);else{if(DataManager[_0x49da6c(0x4e6)](_0x23f83d))_0x83a130=_0x49da6c(0x1b7)[_0x49da6c(0x505)](_0x23f83d['id']);else{if(DataManager['isArmor'](_0x23f83d))_0x83a130=_0x49da6c(0x1cf)[_0x49da6c(0x505)](_0x23f83d['id']);else return;}}const _0x239fdf=this[_0x49da6c(0x468)](_0x83a130);_0x239fdf[_0x49da6c(0x3cb)](_0x3c574c,_0x4aa891),_0x239fdf[_0x49da6c(0x1db)](),_0x239fdf[_0x49da6c(0x265)]=this[_0x49da6c(0x287)];},Window_ItemCategory[_0x166c6b(0x51f)]=VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x43a)][_0x166c6b(0x40e)]['List'],Window_ItemCategory[_0x166c6b(0x160)]=[_0x166c6b(0x57e),_0x166c6b(0x52f),'Nonconsumable',_0x166c6b(0x3b0),_0x166c6b(0x33d),'BattleUsable','FieldUsable','NeverUsable'],VisuMZ['ItemsEquipsCore'][_0x166c6b(0x4ed)]=Window_ItemCategory['prototype'][_0x166c6b(0x344)],Window_ItemCategory[_0x166c6b(0x3f4)][_0x166c6b(0x344)]=function(_0x4107c5){const _0x522d1f=_0x166c6b;VisuMZ[_0x522d1f(0x435)][_0x522d1f(0x4ed)][_0x522d1f(0x2b5)](this,_0x4107c5),this[_0x522d1f(0x19e)](_0x4107c5);},Window_ItemCategory[_0x166c6b(0x3f4)][_0x166c6b(0x19e)]=function(_0x33cbba){const _0x536a87=_0x166c6b,_0x4d406e=new Rectangle(0x0,0x0,_0x33cbba['width'],_0x33cbba['height']);this[_0x536a87(0x19d)]=new Window_Base(_0x4d406e),this[_0x536a87(0x19d)][_0x536a87(0x265)]=0x0,this['addChild'](this['_categoryNameWindow']),this[_0x536a87(0x384)]();},Window_ItemCategory['prototype']['isUseModernControls']=function(){const _0x1dec44=_0x166c6b;return Imported[_0x1dec44(0x4ef)]&&Window_HorzCommand['prototype'][_0x1dec44(0x2b0)]['call'](this);},Window_ItemCategory[_0x166c6b(0x3f4)]['processCursorHomeEndTrigger']=function(){},Window_ItemCategory[_0x166c6b(0x3f4)][_0x166c6b(0x17e)]=function(){const _0x34691f=_0x166c6b;if(!this[_0x34691f(0x2b0)]())Window_HorzCommand[_0x34691f(0x3f4)][_0x34691f(0x17e)][_0x34691f(0x2b5)](this);},Window_ItemCategory[_0x166c6b(0x3f4)]['maxCols']=function(){const _0x44ef3f=_0x166c6b;return this['_list']?this[_0x44ef3f(0x41a)]():0x4;},Window_ItemCategory[_0x166c6b(0x3f4)][_0x166c6b(0x560)]=function(){const _0xe8dbef=_0x166c6b;Window_HorzCommand[_0xe8dbef(0x3f4)][_0xe8dbef(0x560)]['call'](this),this[_0xe8dbef(0x1c0)]&&this[_0xe8dbef(0x1c0)][_0xe8dbef(0x4a5)](this[_0xe8dbef(0x53a)]());},Window_ItemCategory[_0x166c6b(0x3f4)][_0x166c6b(0x4c4)]=function(){const _0x3ba708=_0x166c6b;if(this[_0x3ba708(0x4e5)]()){const _0x23cf95=this['index']();if(this[_0x3ba708(0x1c0)]&&this['_itemWindow']['maxCols']()<=0x1)Input[_0x3ba708(0x1d6)]('right')&&this[_0x3ba708(0x300)](Input[_0x3ba708(0x559)](_0x3ba708(0x2f8))),Input[_0x3ba708(0x1d6)](_0x3ba708(0x27b))&&this[_0x3ba708(0x2f2)](Input[_0x3ba708(0x559)](_0x3ba708(0x27b)));else this[_0x3ba708(0x1c0)]&&this[_0x3ba708(0x1c0)][_0x3ba708(0x1ad)]()>0x1&&(Input[_0x3ba708(0x1d6)](_0x3ba708(0x16b))&&!Input[_0x3ba708(0x389)](_0x3ba708(0x194))&&this[_0x3ba708(0x300)](Input['isTriggered'](_0x3ba708(0x16b))),Input[_0x3ba708(0x1d6)]('pageup')&&!Input[_0x3ba708(0x389)](_0x3ba708(0x194))&&this[_0x3ba708(0x2f2)](Input['isTriggered'](_0x3ba708(0x42e))));this[_0x3ba708(0x17f)]()!==_0x23cf95&&this[_0x3ba708(0x47c)]();}},Window_ItemCategory[_0x166c6b(0x3f4)][_0x166c6b(0x31b)]=function(){const _0x36b45c=_0x166c6b;if(this[_0x36b45c(0x2b0)]())return;Window_HorzCommand[_0x36b45c(0x3f4)][_0x36b45c(0x31b)][_0x36b45c(0x2b5)](this);},Window_ItemCategory[_0x166c6b(0x3f4)][_0x166c6b(0x420)]=function(){const _0x300060=_0x166c6b;return this[_0x300060(0x2b0)]()?![]:Window_HorzCommand[_0x300060(0x3f4)][_0x300060(0x420)][_0x300060(0x2b5)](this);},Window_ItemCategory[_0x166c6b(0x3f4)][_0x166c6b(0x1bf)]=function(){const _0x5a3d5e=_0x166c6b;if(this['isOpenAndActive']()){TouchInput[_0x5a3d5e(0x559)]()&&this[_0x5a3d5e(0x427)](!![]);if(TouchInput[_0x5a3d5e(0x30f)]())this[_0x5a3d5e(0x458)]();else TouchInput[_0x5a3d5e(0x3b9)]()&&this[_0x5a3d5e(0x525)]();}},Window_ItemCategory[_0x166c6b(0x3f4)]['onTouchSelect']=function(_0x293793){const _0x241dcf=_0x166c6b;this[_0x241dcf(0x2b0)]()?this[_0x241dcf(0x25d)](!![]):Window_HorzCommand[_0x241dcf(0x3f4)][_0x241dcf(0x427)][_0x241dcf(0x2b5)](this,_0x293793);},Window_ItemCategory['prototype'][_0x166c6b(0x25d)]=function(_0x51c20a){const _0xddb63e=_0x166c6b;this[_0xddb63e(0x40f)]=![];if(this[_0xddb63e(0x4e5)]()){const _0x3cb7b3=this[_0xddb63e(0x17f)](),_0x134b4c=this[_0xddb63e(0x472)]();_0x134b4c>=0x0&&_0x134b4c!==this[_0xddb63e(0x17f)]()&&this[_0xddb63e(0x2c3)](_0x134b4c),_0x51c20a&&this[_0xddb63e(0x17f)]()!==_0x3cb7b3&&this[_0xddb63e(0x47c)]();}},Window_ItemCategory['prototype'][_0x166c6b(0x585)]=function(){const _0x1b487b=_0x166c6b;this[_0x1b487b(0x2db)](),this['select'](this[_0x1b487b(0x17f)]());},Window_ItemCategory[_0x166c6b(0x3f4)][_0x166c6b(0x2db)]=function(){for(const _0x3f8dab of Window_ItemCategory['categoryList']){this['addItemCategory'](_0x3f8dab);}},Window_ItemCategory['prototype'][_0x166c6b(0x1ca)]=function(_0x27def3){const _0x2078f2=_0x166c6b,_0x34c948=_0x27def3[_0x2078f2(0x3a6)],_0x5806e3=_0x27def3[_0x2078f2(0x532)],_0x2d7fc8=_0x27def3[_0x2078f2(0x4a7)]||0x0;if(_0x2d7fc8>0x0&&!$gameSwitches[_0x2078f2(0x2c7)](_0x2d7fc8))return;let _0x4e69fe='',_0xff5569=_0x2078f2(0x3a1),_0x1b2457=_0x34c948;if(_0x34c948['match'](/Category:(.*)/i))_0x4e69fe=String(RegExp['$1'])[_0x2078f2(0x507)]();else{if(Window_ItemCategory[_0x2078f2(0x160)][_0x2078f2(0x175)](_0x34c948))_0x4e69fe=VisuMZ[_0x2078f2(0x435)]['Settings']['Categories'][_0x34c948];else{if([_0x2078f2(0x5a2),_0x2078f2(0x318)][_0x2078f2(0x175)](_0x34c948))_0x4e69fe=TextManager[_0x2078f2(0x1b4)];else{if(_0x34c948===_0x2078f2(0x1af))_0x4e69fe=TextManager[_0x2078f2(0x387)];else{if(_0x34c948==='AllWeapons')_0x4e69fe=TextManager[_0x2078f2(0x572)];else{if(_0x34c948==='AllArmors')_0x4e69fe=TextManager['armor'];else{if(_0x34c948[_0x2078f2(0x346)](/WTYPE:(\d+)/i))_0x4e69fe=$dataSystem[_0x2078f2(0x2c0)][Number(RegExp['$1'])]||'';else{if(_0x34c948[_0x2078f2(0x346)](/ATYPE:(\d+)/i))_0x4e69fe=$dataSystem[_0x2078f2(0x16d)][Number(RegExp['$1'])]||'';else _0x34c948[_0x2078f2(0x346)](/ETYPE:(\d+)/i)&&(_0x4e69fe=$dataSystem[_0x2078f2(0x244)][Number(RegExp['$1'])]||'');}}}}}}}if(TextManager['parseLocalizedText']&&TextManager[_0x2078f2(0x177)]()){const _0xd2f3c3=_0x4e69fe['toLowerCase']()[_0x2078f2(0x507)]();if($dataLocalization[_0xd2f3c3]&&_0xd2f3c3[_0x2078f2(0x514)]>0x0){const _0x16dad2=ConfigManager['textLocale']||_0x2078f2(0x4ca);_0x4e69fe=$dataLocalization[_0xd2f3c3][_0x16dad2]||_0x2078f2(0x24c);}}_0x5806e3>0x0&&this[_0x2078f2(0x35a)]()!==_0x2078f2(0x363)&&(_0x4e69fe=_0x2078f2(0x50d)[_0x2078f2(0x505)](_0x5806e3,_0x4e69fe)),this[_0x2078f2(0x165)](_0x4e69fe,_0xff5569,!![],_0x1b2457);},Window_ItemCategory[_0x166c6b(0x3f4)][_0x166c6b(0x3a8)]=function(){const _0x42cbb3=_0x166c6b;return VisuMZ[_0x42cbb3(0x435)]['Settings'][_0x42cbb3(0x40e)][_0x42cbb3(0x59e)];},Window_ItemCategory[_0x166c6b(0x3f4)][_0x166c6b(0x4b1)]=function(_0x3cac51){const _0x1e125a=_0x166c6b,_0x249b65=this['categoryStyleCheck'](_0x3cac51);if(_0x249b65==='iconText')this['drawItemStyleIconText'](_0x3cac51);else _0x249b65==='icon'?this[_0x1e125a(0x4a4)](_0x3cac51):Window_HorzCommand[_0x1e125a(0x3f4)][_0x1e125a(0x4b1)][_0x1e125a(0x2b5)](this,_0x3cac51);},Window_ItemCategory[_0x166c6b(0x3f4)][_0x166c6b(0x35a)]=function(){const _0x239ee4=_0x166c6b;return VisuMZ[_0x239ee4(0x435)][_0x239ee4(0x43a)][_0x239ee4(0x40e)][_0x239ee4(0x4c8)];},Window_ItemCategory[_0x166c6b(0x3f4)][_0x166c6b(0x407)]=function(_0x7f3130){const _0x115ab6=_0x166c6b;if(_0x7f3130<0x0)return'text';const _0x2cab91=this[_0x115ab6(0x35a)]();if(_0x2cab91!==_0x115ab6(0x53b))return _0x2cab91;else{const _0x32e7a7=this[_0x115ab6(0x450)](_0x7f3130);if(_0x32e7a7['match'](/\\I\[(\d+)\]/i)){const _0x4bf052=this[_0x115ab6(0x42d)](_0x7f3130),_0x37f34a=this[_0x115ab6(0x4ac)](_0x32e7a7)[_0x115ab6(0x3aa)];return _0x37f34a<=_0x4bf052['width']?_0x115ab6(0x162):_0x115ab6(0x512);}else return _0x115ab6(0x363);}},Window_ItemCategory[_0x166c6b(0x3f4)][_0x166c6b(0x555)]=function(_0x4f4e17){const _0x410b08=_0x166c6b,_0x3f94f7=this['itemLineRect'](_0x4f4e17),_0x2feccb=this['commandName'](_0x4f4e17),_0x207d90=this[_0x410b08(0x4ac)](_0x2feccb)[_0x410b08(0x3aa)];this['changePaintOpacity'](this[_0x410b08(0x337)](_0x4f4e17));const _0x136d20=this[_0x410b08(0x3a8)]();if(_0x136d20==='right')this[_0x410b08(0x438)](_0x2feccb,_0x3f94f7['x']+_0x3f94f7['width']-_0x207d90,_0x3f94f7['y'],_0x207d90);else{if(_0x136d20===_0x410b08(0x35e)){const _0x580026=_0x3f94f7['x']+Math[_0x410b08(0x523)]((_0x3f94f7[_0x410b08(0x3aa)]-_0x207d90)/0x2);this['drawTextEx'](_0x2feccb,_0x580026,_0x3f94f7['y'],_0x207d90);}else this[_0x410b08(0x438)](_0x2feccb,_0x3f94f7['x'],_0x3f94f7['y'],_0x207d90);}},Window_ItemCategory[_0x166c6b(0x3f4)][_0x166c6b(0x4a4)]=function(_0x5932bb){const _0x2a6e85=_0x166c6b,_0x4e6df9=this[_0x2a6e85(0x450)](_0x5932bb);if(_0x4e6df9['match'](/\\I\[(\d+)\]/i)){const _0x4119cb=Number(RegExp['$1'])||0x0,_0x9b0a73=this[_0x2a6e85(0x42d)](_0x5932bb),_0x579de9=_0x9b0a73['x']+Math[_0x2a6e85(0x523)]((_0x9b0a73[_0x2a6e85(0x3aa)]-ImageManager[_0x2a6e85(0x3fb)])/0x2),_0x298cc7=_0x9b0a73['y']+(_0x9b0a73[_0x2a6e85(0x459)]-ImageManager['iconHeight'])/0x2;this['drawIcon'](_0x4119cb,_0x579de9,_0x298cc7);}},VisuMZ[_0x166c6b(0x435)]['Window_ItemCategory_setItemWindow']=Window_ItemCategory[_0x166c6b(0x3f4)][_0x166c6b(0x53c)],Window_ItemCategory[_0x166c6b(0x3f4)][_0x166c6b(0x53c)]=function(_0x165eb3){const _0xd6196c=_0x166c6b;VisuMZ['ItemsEquipsCore']['Window_ItemCategory_setItemWindow']['call'](this,_0x165eb3),_0x165eb3[_0xd6196c(0x3e9)]=this;},Window_ItemCategory[_0x166c6b(0x3f4)][_0x166c6b(0x330)]=function(){const _0x19329e=_0x166c6b;Window_HorzCommand[_0x19329e(0x3f4)]['callUpdateHelp'][_0x19329e(0x2b5)](this);if(this[_0x19329e(0x19d)])this[_0x19329e(0x384)]();},Window_ItemCategory[_0x166c6b(0x3f4)]['updateCategoryNameWindow']=function(){const _0xf120f=_0x166c6b,_0x3b1a5d=this[_0xf120f(0x19d)];_0x3b1a5d[_0xf120f(0x20e)]['clear']();const _0x463237=this[_0xf120f(0x407)](this[_0xf120f(0x17f)]());if(_0x463237==='icon'){const _0x29e8a9=this[_0xf120f(0x42d)](this[_0xf120f(0x17f)]());let _0x1f8857=this[_0xf120f(0x450)](this[_0xf120f(0x17f)]());_0x1f8857=_0x1f8857[_0xf120f(0x5a5)](/\\I\[(\d+)\]/gi,''),_0x3b1a5d[_0xf120f(0x1d1)](),this[_0xf120f(0x426)](_0x1f8857,_0x29e8a9),this[_0xf120f(0x4fe)](_0x1f8857,_0x29e8a9),this[_0xf120f(0x238)](_0x1f8857,_0x29e8a9);}},Window_ItemCategory[_0x166c6b(0x3f4)][_0x166c6b(0x426)]=function(_0x435105,_0x4a761c){},Window_ItemCategory[_0x166c6b(0x3f4)][_0x166c6b(0x4fe)]=function(_0x4e1dcf,_0x2e57e6){const _0x1d1afd=_0x166c6b,_0x383b1e=this[_0x1d1afd(0x19d)];_0x383b1e[_0x1d1afd(0x2d2)](_0x4e1dcf,0x0,_0x2e57e6['y'],_0x383b1e[_0x1d1afd(0x20c)],_0x1d1afd(0x35e));},Window_ItemCategory[_0x166c6b(0x3f4)][_0x166c6b(0x238)]=function(_0x3d5791,_0x2c1acc){const _0xdf6ed0=_0x166c6b,_0x49c2da=this[_0xdf6ed0(0x19d)],_0x1f40b2=$gameSystem[_0xdf6ed0(0x350)](),_0x56764f=_0x2c1acc['x']+Math[_0xdf6ed0(0x523)](_0x2c1acc[_0xdf6ed0(0x3aa)]/0x2)+_0x1f40b2;_0x49c2da['x']=_0x49c2da[_0xdf6ed0(0x3aa)]/-0x2+_0x56764f,_0x49c2da['y']=Math['floor'](_0x2c1acc['height']/0x2);},Window_ItemList['prototype'][_0x166c6b(0x4c4)]=function(){const _0x480481=_0x166c6b;if(this[_0x480481(0x4e5)]()){const _0x505aab=this[_0x480481(0x17f)]();if(this[_0x480481(0x1ad)]()<=0x1)!this[_0x480481(0x501)](_0x480481(0x16b))&&Input[_0x480481(0x559)](_0x480481(0x16b))&&this[_0x480481(0x405)](),!this['isHandled'](_0x480481(0x42e))&&Input['isTriggered'](_0x480481(0x42e))&&this[_0x480481(0x1bb)]();else this[_0x480481(0x1ad)]()>0x1&&(Input[_0x480481(0x1d6)](_0x480481(0x2f8))&&this[_0x480481(0x300)](Input[_0x480481(0x559)]('right')),Input[_0x480481(0x1d6)](_0x480481(0x27b))&&this['cursorLeft'](Input[_0x480481(0x559)](_0x480481(0x27b))),this[_0x480481(0x491)]()?(Input[_0x480481(0x559)](_0x480481(0x16b))&&Input['isPressed'](_0x480481(0x194))&&this[_0x480481(0x405)](),Input['isTriggered'](_0x480481(0x42e))&&Input['isPressed']('shift')&&this[_0x480481(0x1bb)]()):(Input[_0x480481(0x559)](_0x480481(0x16b))&&this[_0x480481(0x405)](),Input[_0x480481(0x559)](_0x480481(0x42e))&&this[_0x480481(0x1bb)]()));Input[_0x480481(0x1d6)]('down')&&(Input[_0x480481(0x389)](_0x480481(0x194))&&this[_0x480481(0x4b7)]()?this['cursorPagedown']():this[_0x480481(0x4b5)](Input['isTriggered']('down'))),Input[_0x480481(0x1d6)]('up')&&(Input[_0x480481(0x389)](_0x480481(0x194))&&this[_0x480481(0x4b7)]()?this[_0x480481(0x1bb)]():this['cursorUp'](Input[_0x480481(0x559)]('up'))),Imported[_0x480481(0x4ef)]&&this['processCursorHomeEndTrigger'](),this[_0x480481(0x17f)]()!==_0x505aab&&this[_0x480481(0x47c)]();}},Window_ItemList[_0x166c6b(0x3f4)]['limitedPageUpDownSceneCheck']=function(){const _0x3ed096=_0x166c6b,_0x24328b=SceneManager[_0x3ed096(0x538)],_0x5ddf7f=[Scene_Item,Scene_Shop];return _0x5ddf7f[_0x3ed096(0x175)](_0x24328b[_0x3ed096(0x3ba)]);},Window_ItemList[_0x166c6b(0x3f4)][_0x166c6b(0x1ec)]=function(){const _0x10a587=_0x166c6b;Window_Selectable['prototype'][_0x10a587(0x1ec)][_0x10a587(0x2b5)](this),this['_categoryWindow']&&this[_0x10a587(0x3e9)][_0x10a587(0x2b0)]()&&this[_0x10a587(0x3e9)][_0x10a587(0x1ec)]();},Window_ItemList['prototype'][_0x166c6b(0x2c5)]=function(){const _0x49b8b0=_0x166c6b;Window_Selectable[_0x49b8b0(0x3f4)][_0x49b8b0(0x2c5)][_0x49b8b0(0x2b5)](this),this['_categoryWindow']&&this[_0x49b8b0(0x3e9)]['isUseModernControls']()&&this[_0x49b8b0(0x3e9)][_0x49b8b0(0x2c5)]();},Window_ItemList['prototype']['setCategory']=function(_0x47886f){const _0x2bec3a=_0x166c6b;this['_category']!==_0x47886f&&(this[_0x2bec3a(0x4dd)]=_0x47886f,this[_0x2bec3a(0x1f1)](),this[_0x2bec3a(0x3e9)]&&this[_0x2bec3a(0x3e9)]['isUseModernControls']()?this[_0x2bec3a(0x569)](0x0):this[_0x2bec3a(0x3ce)](0x0,0x0));},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x362)]=Window_ItemList[_0x166c6b(0x3f4)][_0x166c6b(0x1ad)],Window_ItemList[_0x166c6b(0x3f4)]['maxCols']=function(){const _0x5e7bc5=_0x166c6b;if(SceneManager['_scene'][_0x5e7bc5(0x3ba)]===Scene_Battle)return VisuMZ['ItemsEquipsCore'][_0x5e7bc5(0x362)][_0x5e7bc5(0x2b5)](this);else return SceneManager[_0x5e7bc5(0x538)]['constructor']===Scene_Map?VisuMZ[_0x5e7bc5(0x435)]['Window_ItemList_maxCols'][_0x5e7bc5(0x2b5)](this):VisuMZ[_0x5e7bc5(0x435)][_0x5e7bc5(0x43a)]['ItemScene']['ListWindowCols'];},VisuMZ['ItemsEquipsCore'][_0x166c6b(0x470)]=Window_ItemList[_0x166c6b(0x3f4)][_0x166c6b(0x579)],Window_ItemList[_0x166c6b(0x3f4)]['colSpacing']=function(){const _0x244d92=_0x166c6b;return this[_0x244d92(0x1ad)]()<=0x1?Window_Selectable[_0x244d92(0x3f4)][_0x244d92(0x579)][_0x244d92(0x2b5)](this):VisuMZ[_0x244d92(0x435)][_0x244d92(0x470)][_0x244d92(0x2b5)](this);},Window_ItemList[_0x166c6b(0x3f4)]['includes']=function(_0x453fd2){const _0x4d6812=_0x166c6b;switch(this['_category']){case'AllItems':return DataManager[_0x4d6812(0x45f)](_0x453fd2);case _0x4d6812(0x318):return DataManager[_0x4d6812(0x45f)](_0x453fd2)&&_0x453fd2[_0x4d6812(0x31a)]===0x1;case _0x4d6812(0x1af):return DataManager['isItem'](_0x453fd2)&&_0x453fd2['itypeId']===0x2;case _0x4d6812(0x57e):return DataManager[_0x4d6812(0x45f)](_0x453fd2)&&_0x453fd2[_0x4d6812(0x31a)]===0x3;case _0x4d6812(0x52f):return DataManager[_0x4d6812(0x45f)](_0x453fd2)&&_0x453fd2[_0x4d6812(0x31a)]===0x4;case'Consumable':return DataManager['isItem'](_0x453fd2)&&_0x453fd2['consumable'];case _0x4d6812(0x309):return DataManager['isItem'](_0x453fd2)&&!_0x453fd2['consumable'];case _0x4d6812(0x33d):return DataManager[_0x4d6812(0x45f)](_0x453fd2)&&[0x0][_0x4d6812(0x175)](_0x453fd2[_0x4d6812(0x305)]);case _0x4d6812(0x251):return DataManager[_0x4d6812(0x45f)](_0x453fd2)&&[0x0,0x1][_0x4d6812(0x175)](_0x453fd2[_0x4d6812(0x305)]);case _0x4d6812(0x38d):return DataManager[_0x4d6812(0x45f)](_0x453fd2)&&[0x0,0x2][_0x4d6812(0x175)](_0x453fd2[_0x4d6812(0x305)]);case _0x4d6812(0x524):return DataManager[_0x4d6812(0x45f)](_0x453fd2)&&[0x3][_0x4d6812(0x175)](_0x453fd2[_0x4d6812(0x305)]);case _0x4d6812(0x536):return DataManager['isWeapon'](_0x453fd2);case'AllArmors':return DataManager['isArmor'](_0x453fd2);default:if(this[_0x4d6812(0x4dd)]['match'](/WTYPE:(\d+)/i))return DataManager[_0x4d6812(0x4e6)](_0x453fd2)&&_0x453fd2[_0x4d6812(0x57b)]===Number(RegExp['$1']);else{if(this[_0x4d6812(0x4dd)][_0x4d6812(0x346)](/WTYPE:(.*)/i)){const _0x24d7da=$dataSystem['weaponTypes'][_0x4d6812(0x47a)](String(RegExp['$1'])[_0x4d6812(0x507)]());return DataManager[_0x4d6812(0x4e6)](_0x453fd2)&&_0x453fd2[_0x4d6812(0x57b)]===_0x24d7da;}else{if(this['_category'][_0x4d6812(0x346)](/ATYPE:(\d+)/i))return DataManager[_0x4d6812(0x3c2)](_0x453fd2)&&_0x453fd2[_0x4d6812(0x443)]===Number(RegExp['$1']);else{if(this['_category'][_0x4d6812(0x346)](/ATYPE:(.*)/i)){const _0x132dc8=$dataSystem[_0x4d6812(0x16d)][_0x4d6812(0x47a)](String(RegExp['$1'])[_0x4d6812(0x507)]());return DataManager[_0x4d6812(0x3c2)](_0x453fd2)&&_0x453fd2[_0x4d6812(0x443)]===_0x132dc8;}else{if(this[_0x4d6812(0x4dd)][_0x4d6812(0x346)](/ETYPE:(\d+)/i))return!!_0x453fd2&&_0x453fd2[_0x4d6812(0x400)]===Number(RegExp['$1']);else{if(this[_0x4d6812(0x4dd)][_0x4d6812(0x346)](/ETYPE:(.*)/i)){const _0x1ec9b8=$dataSystem[_0x4d6812(0x244)][_0x4d6812(0x47a)](String(RegExp['$1'])[_0x4d6812(0x507)]());return DataManager[_0x4d6812(0x3c2)](_0x453fd2)&&_0x453fd2[_0x4d6812(0x400)]===_0x1ec9b8;}else{if(this[_0x4d6812(0x4dd)]['match'](/Category:(.*)/i))return!!_0x453fd2&&_0x453fd2[_0x4d6812(0x51c)]['includes'](String(RegExp['$1'])[_0x4d6812(0x255)]()[_0x4d6812(0x507)]());}}}}}}}return![];},VisuMZ['ItemsEquipsCore'][_0x166c6b(0x5a0)]=Window_ItemList[_0x166c6b(0x3f4)][_0x166c6b(0x1a9)],Window_ItemList[_0x166c6b(0x3f4)][_0x166c6b(0x1a9)]=function(){const _0x4cf960=_0x166c6b;VisuMZ[_0x4cf960(0x435)][_0x4cf960(0x5a0)][_0x4cf960(0x2b5)](this);if(this[_0x4cf960(0x546)]())this['sortListItemScene']();},Window_ItemList['prototype']['canSortListItemScene']=function(){const _0x18b8c8=_0x166c6b,_0x4644b1=[_0x18b8c8(0x3ea),_0x18b8c8(0x33e),_0x18b8c8(0x4c2),_0x18b8c8(0x199)],_0x47f1ca=SceneManager[_0x18b8c8(0x538)];return _0x4644b1[_0x18b8c8(0x175)](_0x47f1ca['constructor'][_0x18b8c8(0x32f)]);},Window_ItemList[_0x166c6b(0x3f4)][_0x166c6b(0x424)]=function(){const _0x27daeb=_0x166c6b,_0xa023d8=Window_ItemCategory[_0x27daeb(0x51f)],_0x1d3dc1=_0xa023d8[_0x27daeb(0x3dc)](_0x4ea7a2=>_0x4ea7a2[_0x27daeb(0x3a6)]===this[_0x27daeb(0x4dd)]);if(!_0x1d3dc1){VisuMZ[_0x27daeb(0x435)][_0x27daeb(0x4d3)](this[_0x27daeb(0x4e0)]);return;}const _0x112454=((_0x1d3dc1[_0x27daeb(0x21e)]??'ID')||'ID')[_0x27daeb(0x255)]()[_0x27daeb(0x507)]();_0x112454===_0x27daeb(0x404)?this[_0x27daeb(0x4e0)]['sort']((_0x26ccef,_0x210243)=>{const _0x2b8073=_0x27daeb;if(!!_0x26ccef&&!!_0x210243)return _0x26ccef[_0x2b8073(0x32f)][_0x2b8073(0x4a1)](_0x210243['name']);return 0x0;}):VisuMZ[_0x27daeb(0x435)][_0x27daeb(0x4d3)](this[_0x27daeb(0x4e0)]);},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x4d3)]=function(_0x1817dd){const _0x27ba37=_0x166c6b;return _0x1817dd[_0x27ba37(0x2a4)]((_0x2e52c4,_0x3ca3fa)=>{const _0x1ace82=_0x27ba37;if(!!_0x2e52c4&&!!_0x3ca3fa){if(_0x2e52c4[_0x1ace82(0x2c2)]===undefined)VisuMZ['ItemsEquipsCore'][_0x1ace82(0x1a7)](_0x2e52c4);if(_0x3ca3fa[_0x1ace82(0x2c2)]===undefined)VisuMZ[_0x1ace82(0x435)][_0x1ace82(0x1a7)](_0x3ca3fa);const _0x48c50c=_0x2e52c4['sortPriority'],_0xacb4c3=_0x3ca3fa['sortPriority'];if(_0x48c50c!==_0xacb4c3)return _0xacb4c3-_0x48c50c;return _0x2e52c4['id']-_0x3ca3fa['id'];}return 0x0;}),_0x1817dd;},Window_ItemList['prototype'][_0x166c6b(0x204)]=function(){return!![];},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x49f)]=Window_ItemList[_0x166c6b(0x3f4)][_0x166c6b(0x4b1)],Window_ItemList[_0x166c6b(0x3f4)][_0x166c6b(0x4b1)]=function(_0x5e73ed){const _0x5dbf72=_0x166c6b;VisuMZ[_0x5dbf72(0x435)][_0x5dbf72(0x49f)]['call'](this,_0x5e73ed),this[_0x5dbf72(0x3f0)](_0x5e73ed);},Window_ItemList[_0x166c6b(0x3f4)]['drawItemNumber']=function(_0x195ad9,_0x56d509,_0x206fe4,_0x514a49){const _0x1dac1d=_0x166c6b;Window_Selectable['prototype'][_0x1dac1d(0x36c)][_0x1dac1d(0x2b5)](this,_0x195ad9,_0x56d509,_0x206fe4,_0x514a49);},Window_ItemList['prototype'][_0x166c6b(0x3f0)]=function(_0x1a9c66){const _0x12f027=_0x166c6b,_0x36cd29=this[_0x12f027(0x545)](_0x1a9c66);if(!_0x36cd29||!this['isShowNew']())return;if(!$gameParty['isNewItem'](_0x36cd29))return;const _0x5416df=this[_0x12f027(0x42d)](_0x1a9c66),_0x1bd7db=_0x5416df['x'],_0x37200=_0x5416df['y']+(this['lineHeight']()-ImageManager[_0x12f027(0x38c)])/0x2,_0x918b09=VisuMZ[_0x12f027(0x435)][_0x12f027(0x43a)][_0x12f027(0x500)][_0x12f027(0x1f0)],_0x15bdf3=VisuMZ[_0x12f027(0x435)][_0x12f027(0x43a)][_0x12f027(0x500)][_0x12f027(0x46f)];this[_0x12f027(0x22a)](_0x36cd29,_0x1bd7db+_0x918b09,_0x37200+_0x15bdf3);},Window_ItemList[_0x166c6b(0x3f4)][_0x166c6b(0x54c)]=function(_0x4be7c6){const _0x1d8f98=_0x166c6b;this[_0x1d8f98(0x39d)]=_0x4be7c6,this[_0x1d8f98(0x330)]();},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x28a)]=Window_ItemList[_0x166c6b(0x3f4)][_0x166c6b(0x4aa)],Window_ItemList['prototype'][_0x166c6b(0x4aa)]=function(){const _0x10122d=_0x166c6b;VisuMZ[_0x10122d(0x435)][_0x10122d(0x28a)]['call'](this),this[_0x10122d(0x39d)]&&this[_0x10122d(0x39d)][_0x10122d(0x3ba)]===Window_ShopStatus&&this[_0x10122d(0x39d)][_0x10122d(0x3f6)](this[_0x10122d(0x1b4)]());},Window_BattleItem['prototype']['isEnabled']=function(_0x13b92b){const _0x126c23=_0x166c6b;return BattleManager[_0x126c23(0x4b3)]()?BattleManager[_0x126c23(0x4b3)]()[_0x126c23(0x54e)](_0x13b92b):Window_ItemList[_0x126c23(0x3f4)][_0x126c23(0x356)]['call'](this,_0x13b92b);},Window_EventItem[_0x166c6b(0x3f4)]['isShowNew']=function(){return![];},Window_EquipStatus[_0x166c6b(0x3f4)]['isUseItemsEquipsCoreUpdatedLayout']=function(){const _0x3efcc9=_0x166c6b;return VisuMZ[_0x3efcc9(0x435)][_0x3efcc9(0x43a)][_0x3efcc9(0x4e2)][_0x3efcc9(0x2fd)];},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x457)]=Window_EquipStatus[_0x166c6b(0x3f4)][_0x166c6b(0x1f1)],Window_EquipStatus[_0x166c6b(0x3f4)][_0x166c6b(0x1f1)]=function(){const _0x3d6546=_0x166c6b;this[_0x3d6546(0x502)](),this['resetFontSettings']();if(this[_0x3d6546(0x23d)])this['_actor'][_0x3d6546(0x1f1)]();this[_0x3d6546(0x4a2)]()?this['prepareRefreshItemsEquipsCoreLayout']():VisuMZ[_0x3d6546(0x435)]['Window_EquipStatus_refresh'][_0x3d6546(0x2b5)](this);},Window_EquipStatus[_0x166c6b(0x3f4)][_0x166c6b(0x16e)]=function(){const _0x771ca3=_0x166c6b;this[_0x771ca3(0x20e)][_0x771ca3(0x358)]();if(!this[_0x771ca3(0x23d)])return;if(this['isMainMenuCoreMenuImageOptionAvailable']()){const _0x5f1074=ImageManager[_0x771ca3(0x2ab)](this['_actor'][_0x771ca3(0x294)]());_0x5f1074[_0x771ca3(0x3e8)](this[_0x771ca3(0x34f)]['bind'](this));}else this['refreshItemsEquipsCoreNoMenuImage']();},Window_EquipStatus[_0x166c6b(0x3f4)][_0x166c6b(0x56f)]=function(){const _0x8fc924=_0x166c6b;return Imported['VisuMZ_1_MainMenuCore']&&this[_0x8fc924(0x23d)]['getMenuImage']()!==''&&VisuMZ[_0x8fc924(0x435)][_0x8fc924(0x43a)][_0x8fc924(0x4e2)][_0x8fc924(0x466)];},Window_EquipStatus[_0x166c6b(0x3f4)][_0x166c6b(0x34f)]=function(){const _0x580a8f=_0x166c6b;VisuMZ[_0x580a8f(0x435)][_0x580a8f(0x43a)][_0x580a8f(0x4e2)][_0x580a8f(0x3f8)][_0x580a8f(0x2b5)](this),this[_0x580a8f(0x448)]();},Window_EquipStatus[_0x166c6b(0x3f4)][_0x166c6b(0x406)]=function(){const _0x3ccf29=_0x166c6b;VisuMZ[_0x3ccf29(0x435)][_0x3ccf29(0x43a)]['EquipScene'][_0x3ccf29(0x1e9)][_0x3ccf29(0x2b5)](this),this[_0x3ccf29(0x448)]();},Window_EquipStatus[_0x166c6b(0x3f4)][_0x166c6b(0x448)]=function(){const _0x3cb8d4=_0x166c6b;this['resetFontSettings'](),VisuMZ[_0x3cb8d4(0x435)][_0x3cb8d4(0x43a)]['EquipScene']['DrawParamJS'][_0x3cb8d4(0x2b5)](this);},Window_EquipStatus['prototype'][_0x166c6b(0x411)]=function(_0x37f4e5,_0x21722b,_0x24fbd8,_0x4f718d,_0xf0971d){const _0x3bdf13=_0x166c6b,_0x8aea02=ImageManager[_0x3bdf13(0x2ab)](_0x37f4e5['getMenuImage']()),_0x2d2711=this[_0x3bdf13(0x20c)]-_0x8aea02['width'];_0x21722b+=_0x2d2711/0x2;if(_0x2d2711<0x0)_0x4f718d-=_0x2d2711;Window_StatusBase['prototype']['drawItemActorMenuImage'][_0x3bdf13(0x2b5)](this,_0x37f4e5,_0x21722b,_0x24fbd8,_0x4f718d,_0xf0971d);},Window_EquipStatus[_0x166c6b(0x3f4)][_0x166c6b(0x557)]=function(){const _0x13e46e=_0x166c6b;return Imported[_0x13e46e(0x4ef)]?VisuMZ['CoreEngine'][_0x13e46e(0x43a)][_0x13e46e(0x33f)]['ExtDisplayedParams']:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_EquipStatus[_0x166c6b(0x3f4)][_0x166c6b(0x29f)]=function(){const _0x29ff6b=_0x166c6b;return VisuMZ[_0x29ff6b(0x435)][_0x29ff6b(0x43a)][_0x29ff6b(0x4e2)]['ParamValueFontSize'];},Window_EquipStatus[_0x166c6b(0x3f4)][_0x166c6b(0x37b)]=function(){const _0x405d05=_0x166c6b;return Imported[_0x405d05(0x4ef)]&&VisuMZ[_0x405d05(0x285)]['Settings'][_0x405d05(0x33f)][_0x405d05(0x183)];},Window_EquipStatus['prototype'][_0x166c6b(0x48e)]=function(_0xdcadd5,_0x3a6cf8,_0xea71d8,_0x338a97){const _0x2d0830=_0x166c6b,_0x5b2b37=this[_0x2d0830(0x566)]();Imported[_0x2d0830(0x4ef)]?this['drawParamText'](_0x3a6cf8+_0x5b2b37,_0xea71d8,_0x338a97,_0xdcadd5,![]):this[_0x2d0830(0x2d2)](TextManager['param'](_0xdcadd5),_0x3a6cf8+_0x5b2b37,_0xea71d8,_0x338a97);},Window_EquipStatus[_0x166c6b(0x3f4)][_0x166c6b(0x2fb)]=function(_0x4730c8,_0xd7ff99,_0x228b8b,_0x43f3cc){const _0x43f517=_0x166c6b,_0x5f4ab9=this[_0x43f517(0x566)]();let _0x3edd1c=0x0;Imported[_0x43f517(0x4ef)]?_0x3edd1c=this['_actor']['paramValueByName'](_0x4730c8,!![]):_0x3edd1c=this[_0x43f517(0x23d)][_0x43f517(0x40a)](_0x4730c8);const _0x5cb174=_0x3edd1c;this[_0x43f517(0x2d2)](_0x3edd1c,_0xd7ff99,_0x228b8b,_0x43f3cc-_0x5f4ab9,_0x43f517(0x2f8));},Window_EquipStatus[_0x166c6b(0x3f4)][_0x166c6b(0x1f9)]=function(_0xcbdb10,_0x137f1f,_0x2cf5a3,_0x4dbfe9){const _0x2e6514=_0x166c6b,_0x882c02=this[_0x2e6514(0x566)]();let _0x1dcafa=0x0,_0x594abc=0x0,_0x107151='';if(this[_0x2e6514(0x2bb)]){Imported['VisuMZ_0_CoreEngine']?(_0x1dcafa=this['_actor'][_0x2e6514(0x1fc)](_0xcbdb10,![]),_0x594abc=this[_0x2e6514(0x2bb)][_0x2e6514(0x1fc)](_0xcbdb10,![]),_0x107151=this[_0x2e6514(0x2bb)][_0x2e6514(0x1fc)](_0xcbdb10,!![])):(_0x1dcafa=this[_0x2e6514(0x23d)][_0x2e6514(0x40a)](_0xcbdb10),_0x594abc=this[_0x2e6514(0x2bb)]['param'](_0xcbdb10),_0x107151=this[_0x2e6514(0x2bb)][_0x2e6514(0x40a)](_0xcbdb10));const _0x2abb91=_0x1dcafa,_0x56e855=_0x594abc;diffValue=_0x56e855-_0x2abb91,this[_0x2e6514(0x434)](ColorManager[_0x2e6514(0x25a)](diffValue)),this[_0x2e6514(0x2d2)](_0x107151,_0x137f1f,_0x2cf5a3,_0x4dbfe9-_0x882c02,_0x2e6514(0x2f8));}},Window_EquipStatus[_0x166c6b(0x3f4)][_0x166c6b(0x36d)]=function(_0x15fe4a,_0x4d3d85,_0x10c738,_0x297ff4){const _0x4630fd=_0x166c6b,_0x27a6b9=this[_0x4630fd(0x566)]();let _0x1b85f8=0x0,_0x43a8ea=0x0,_0x5895b8=![];if(this[_0x4630fd(0x2bb)]){Imported[_0x4630fd(0x4ef)]?(_0x1b85f8=this[_0x4630fd(0x23d)]['paramValueByName'](_0x15fe4a,![]),_0x43a8ea=this['_tempActor']['paramValueByName'](_0x15fe4a,![]),_0x5895b8=String(this[_0x4630fd(0x23d)][_0x4630fd(0x1fc)](_0x15fe4a,!![]))['match'](/([%％])/i)):(_0x1b85f8=this[_0x4630fd(0x23d)][_0x4630fd(0x40a)](_0x15fe4a),_0x43a8ea=this[_0x4630fd(0x2bb)][_0x4630fd(0x40a)](_0x15fe4a),_0x5895b8=_0x1b85f8%0x1!==0x0||_0x43a8ea%0x1!==0x0);const _0x16f5d3=_0x1b85f8,_0x981ea6=_0x43a8ea,_0x187e00=_0x981ea6-_0x16f5d3;let _0x4334d7=_0x187e00;if(_0x5895b8)_0x4334d7=Math[_0x4630fd(0x2eb)](_0x187e00*0x64)+'%';_0x187e00!==0x0&&(this[_0x4630fd(0x434)](ColorManager[_0x4630fd(0x25a)](_0x187e00)),_0x4334d7=(_0x187e00>0x0?_0x4630fd(0x371):'(%1)')[_0x4630fd(0x505)](_0x4334d7),this[_0x4630fd(0x2d2)](_0x4334d7,_0x4d3d85+_0x27a6b9,_0x10c738,_0x297ff4,_0x4630fd(0x27b)));}},Window_EquipStatus['prototype'][_0x166c6b(0x1d4)]=function(_0x1d1772,_0x5a667e,_0x634be6,_0x3a410e,_0x48a7c6){const _0x165c7e=_0x166c6b;if(VisuMZ[_0x165c7e(0x435)][_0x165c7e(0x43a)]['EquipScene'][_0x165c7e(0x25b)]===![])return;_0x48a7c6=Math[_0x165c7e(0x2aa)](_0x48a7c6||0x1,0x1);while(_0x48a7c6--){_0x3a410e=_0x3a410e||this[_0x165c7e(0x334)](),this[_0x165c7e(0x20e)]['paintOpacity']=0xa0;const _0x52081c=ColorManager[_0x165c7e(0x522)]();this[_0x165c7e(0x20e)]['fillRect'](_0x1d1772+0x1,_0x5a667e+0x1,_0x634be6-0x2,_0x3a410e-0x2,_0x52081c),this[_0x165c7e(0x20e)]['paintOpacity']=0xff;}},ColorManager['getItemsEquipsCoreBackColor2']=function(){const _0x1ee1f7=_0x166c6b,_0x5ece30=VisuMZ['ItemsEquipsCore'][_0x1ee1f7(0x43a)][_0x1ee1f7(0x4e2)];let _0x238094=_0x5ece30[_0x1ee1f7(0x4a8)]!==undefined?_0x5ece30[_0x1ee1f7(0x4a8)]:0x13;return ColorManager[_0x1ee1f7(0x23f)](_0x238094);},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x32a)]=Window_EquipCommand[_0x166c6b(0x3f4)][_0x166c6b(0x344)],Window_EquipCommand[_0x166c6b(0x3f4)]['initialize']=function(_0x5072d2){const _0x287059=_0x166c6b;VisuMZ[_0x287059(0x435)][_0x287059(0x32a)][_0x287059(0x2b5)](this,_0x5072d2),this['createCommandNameWindow'](_0x5072d2);},Window_EquipCommand[_0x166c6b(0x3f4)][_0x166c6b(0x465)]=function(_0x5b6685){const _0xc83bbf=_0x166c6b,_0x50a559=new Rectangle(0x0,0x0,_0x5b6685[_0xc83bbf(0x3aa)],_0x5b6685[_0xc83bbf(0x459)]);this['_commandNameWindow']=new Window_Base(_0x50a559),this[_0xc83bbf(0x1c8)][_0xc83bbf(0x265)]=0x0,this[_0xc83bbf(0x2f0)](this[_0xc83bbf(0x1c8)]),this[_0xc83bbf(0x452)]();},Window_EquipCommand[_0x166c6b(0x3f4)][_0x166c6b(0x330)]=function(){const _0x45b755=_0x166c6b;Window_HorzCommand[_0x45b755(0x3f4)][_0x45b755(0x330)][_0x45b755(0x2b5)](this);if(this[_0x45b755(0x1c8)])this[_0x45b755(0x452)]();},Window_EquipCommand[_0x166c6b(0x3f4)][_0x166c6b(0x452)]=function(){const _0x2dd82a=_0x166c6b,_0x15c7bd=this['_commandNameWindow'];_0x15c7bd[_0x2dd82a(0x20e)][_0x2dd82a(0x358)]();const _0xa3f64f=this[_0x2dd82a(0x4b0)](this[_0x2dd82a(0x17f)]());if(_0xa3f64f===_0x2dd82a(0x512)){const _0x3bbbbf=this[_0x2dd82a(0x42d)](this[_0x2dd82a(0x17f)]());let _0x4ea298=this['commandName'](this['index']());_0x4ea298=_0x4ea298[_0x2dd82a(0x5a5)](/\\I\[(\d+)\]/gi,''),_0x15c7bd[_0x2dd82a(0x1d1)](),this[_0x2dd82a(0x50f)](_0x4ea298,_0x3bbbbf),this[_0x2dd82a(0x3c6)](_0x4ea298,_0x3bbbbf),this['commandNameWindowCenter'](_0x4ea298,_0x3bbbbf);}},Window_EquipCommand[_0x166c6b(0x3f4)][_0x166c6b(0x50f)]=function(_0x28d902,_0x4cc182){},Window_EquipCommand[_0x166c6b(0x3f4)][_0x166c6b(0x3c6)]=function(_0x29b9d5,_0x3714bc){const _0x22f3c7=_0x166c6b,_0x129b5c=this[_0x22f3c7(0x1c8)];_0x129b5c[_0x22f3c7(0x2d2)](_0x29b9d5,0x0,_0x3714bc['y'],_0x129b5c[_0x22f3c7(0x20c)],'center');},Window_EquipCommand['prototype'][_0x166c6b(0x4f9)]=function(_0x3eb971,_0x741e90){const _0x4a81cb=_0x166c6b,_0x7fb09d=this[_0x4a81cb(0x1c8)],_0xa4f539=$gameSystem[_0x4a81cb(0x350)](),_0x30b1f8=_0x741e90['x']+Math[_0x4a81cb(0x523)](_0x741e90[_0x4a81cb(0x3aa)]/0x2)+_0xa4f539;_0x7fb09d['x']=_0x7fb09d[_0x4a81cb(0x3aa)]/-0x2+_0x30b1f8,_0x7fb09d['y']=Math[_0x4a81cb(0x523)](_0x741e90['height']/0x2);},Window_EquipCommand[_0x166c6b(0x3f4)][_0x166c6b(0x2b0)]=function(){const _0x120923=_0x166c6b;return Imported[_0x120923(0x4ef)]&&Window_HorzCommand[_0x120923(0x3f4)]['isUseModernControls'][_0x120923(0x2b5)](this);},Window_EquipCommand['prototype']['playOkSound']=function(){const _0x3183be=_0x166c6b;if(this['currentSymbol']()===_0x3183be(0x486))Window_HorzCommand[_0x3183be(0x3f4)][_0x3183be(0x17e)][_0x3183be(0x2b5)](this);},Window_EquipCommand['prototype'][_0x166c6b(0x4c4)]=function(){const _0x2a35f1=_0x166c6b;!this[_0x2a35f1(0x163)]()&&Window_HorzCommand[_0x2a35f1(0x3f4)]['processCursorMoveModernControls'][_0x2a35f1(0x2b5)](this);},Window_EquipCommand[_0x166c6b(0x3f4)][_0x166c6b(0x163)]=function(){const _0x8c968c=_0x166c6b;if(!this['isCursorMovable']())return![];if(SceneManager['_scene'][_0x8c968c(0x3ba)]!==Scene_Equip)return![];return Input[_0x8c968c(0x559)](_0x8c968c(0x377))&&this[_0x8c968c(0x289)](),![];},Window_EquipCommand[_0x166c6b(0x3f4)][_0x166c6b(0x289)]=function(){const _0x2f10de=_0x166c6b;this[_0x2f10de(0x47c)](),SceneManager['_scene'][_0x2f10de(0x395)](),SceneManager[_0x2f10de(0x538)]['_slotWindow'][_0x2f10de(0x569)](-0x1);},Window_EquipCommand[_0x166c6b(0x3f4)][_0x166c6b(0x1ad)]=function(){const _0x2ff392=_0x166c6b;return this[_0x2ff392(0x3a5)]?this[_0x2ff392(0x3a5)][_0x2ff392(0x514)]:0x3;},Window_EquipCommand[_0x166c6b(0x3f4)]['processTouchModernControls']=function(){const _0xd9fb76=_0x166c6b;if(this[_0xd9fb76(0x1fe)]()&&this[_0xd9fb76(0x517)]&&SceneManager['_scene'][_0xd9fb76(0x3ba)]===Scene_Equip){if(this[_0xd9fb76(0x420)]()&&TouchInput[_0xd9fb76(0x4af)]())this[_0xd9fb76(0x4cd)](![]);else TouchInput[_0xd9fb76(0x559)]()&&this[_0xd9fb76(0x4cd)](!![]);TouchInput[_0xd9fb76(0x30f)]()&&this['onTouchOk']();}},Window_EquipCommand['prototype']['onTouchSelectModernControls']=function(_0x451079){const _0x4237cc=_0x166c6b;this[_0x4237cc(0x40f)]=![];const _0x383203=this[_0x4237cc(0x17f)](),_0x146dc2=this['hitIndex'](),_0x3ec000=SceneManager[_0x4237cc(0x538)][_0x4237cc(0x36e)];if(_0x3ec000[_0x4237cc(0x1fe)]()&&_0x3ec000[_0x4237cc(0x517)]){if(_0x146dc2>=0x0)_0x146dc2===this['index']()&&(this[_0x4237cc(0x40f)]=!![]),this[_0x4237cc(0x1ec)](),this['select'](_0x146dc2);else _0x3ec000[_0x4237cc(0x472)]()>=0x0&&(this[_0x4237cc(0x2c5)](),this[_0x4237cc(0x382)]());}_0x451079&&this['index']()!==_0x383203&&this[_0x4237cc(0x47c)]();},Window_EquipCommand[_0x166c6b(0x3f4)][_0x166c6b(0x585)]=function(){const _0x3551a3=_0x166c6b;this[_0x3551a3(0x37c)](),this['addOptimizeCommand'](),this[_0x3551a3(0x1a4)]();},Window_EquipCommand[_0x166c6b(0x3f4)][_0x166c6b(0x1f1)]=function(){const _0x361152=_0x166c6b;Window_HorzCommand[_0x361152(0x3f4)][_0x361152(0x1f1)][_0x361152(0x2b5)](this),this[_0x361152(0x533)]();},Window_EquipCommand['prototype'][_0x166c6b(0x37c)]=function(){const _0x280787=_0x166c6b;if(!this[_0x280787(0x439)]())return;const _0xa40bbe=this['commandStyle'](),_0xa474ae=VisuMZ[_0x280787(0x435)][_0x280787(0x43a)][_0x280787(0x4e2)]['CmdIconEquip'],_0x362b83=_0xa40bbe===_0x280787(0x363)?TextManager[_0x280787(0x432)]:_0x280787(0x50d)[_0x280787(0x505)](_0xa474ae,TextManager[_0x280787(0x432)]),_0x42e985=this['isEquipCommandEnabled']();this[_0x280787(0x165)](_0x362b83,_0x280787(0x486),_0x42e985);},Window_EquipCommand[_0x166c6b(0x3f4)][_0x166c6b(0x439)]=function(){return!this['isUseModernControls']();},Window_EquipCommand[_0x166c6b(0x3f4)][_0x166c6b(0x189)]=function(){return!![];},Window_EquipCommand[_0x166c6b(0x3f4)][_0x166c6b(0x3c0)]=function(){const _0x287f05=_0x166c6b;if(!this[_0x287f05(0x20b)]())return;const _0x3a1ee8=this[_0x287f05(0x48a)](),_0x116948=VisuMZ[_0x287f05(0x435)][_0x287f05(0x43a)]['EquipScene']['CmdIconOptimize'],_0x3328d6=_0x3a1ee8==='text'?TextManager[_0x287f05(0x30a)]:_0x287f05(0x50d)['format'](_0x116948,TextManager[_0x287f05(0x30a)]),_0xf05730=this[_0x287f05(0x311)]();this[_0x287f05(0x165)](_0x3328d6,'optimize',_0xf05730);},Window_EquipCommand['prototype'][_0x166c6b(0x20b)]=function(){const _0x4bff7d=_0x166c6b;return VisuMZ['ItemsEquipsCore'][_0x4bff7d(0x43a)][_0x4bff7d(0x4e2)][_0x4bff7d(0x581)];},Window_EquipCommand[_0x166c6b(0x3f4)]['isOptimizeCommandEnabled']=function(){return!![];},Window_EquipCommand['prototype'][_0x166c6b(0x1a4)]=function(){const _0x2ee937=_0x166c6b;if(!this['isClearCommandAdded']())return;const _0x17c186=this[_0x2ee937(0x48a)](),_0xc1614b=VisuMZ[_0x2ee937(0x435)][_0x2ee937(0x43a)]['EquipScene'][_0x2ee937(0x386)],_0x231c42=_0x17c186===_0x2ee937(0x363)?TextManager[_0x2ee937(0x358)]:'\x5cI[%1]%2'[_0x2ee937(0x505)](_0xc1614b,TextManager[_0x2ee937(0x358)]),_0x3685e5=this['isClearCommandEnabled']();this[_0x2ee937(0x165)](_0x231c42,'clear',_0x3685e5);},Window_EquipCommand['prototype'][_0x166c6b(0x58d)]=function(){const _0x3534c7=_0x166c6b;return VisuMZ[_0x3534c7(0x435)][_0x3534c7(0x43a)][_0x3534c7(0x4e2)][_0x3534c7(0x324)];},Window_EquipCommand[_0x166c6b(0x3f4)][_0x166c6b(0x1aa)]=function(){return!![];},Window_EquipCommand[_0x166c6b(0x3f4)][_0x166c6b(0x3a8)]=function(){const _0x3c9944=_0x166c6b;return VisuMZ['ItemsEquipsCore'][_0x3c9944(0x43a)][_0x3c9944(0x4e2)]['CmdTextAlign'];},Window_EquipCommand[_0x166c6b(0x3f4)]['drawItem']=function(_0x1ab903){const _0x4a6ac2=_0x166c6b,_0x87579c=this[_0x4a6ac2(0x4b0)](_0x1ab903);if(_0x87579c===_0x4a6ac2(0x162))this[_0x4a6ac2(0x555)](_0x1ab903);else _0x87579c===_0x4a6ac2(0x512)?this[_0x4a6ac2(0x4a4)](_0x1ab903):Window_HorzCommand['prototype'][_0x4a6ac2(0x4b1)][_0x4a6ac2(0x2b5)](this,_0x1ab903);},Window_EquipCommand[_0x166c6b(0x3f4)][_0x166c6b(0x48a)]=function(){const _0x401b94=_0x166c6b;return VisuMZ[_0x401b94(0x435)]['Settings'][_0x401b94(0x4e2)]['CmdStyle'];},Window_EquipCommand['prototype'][_0x166c6b(0x4b0)]=function(_0x3ea915){const _0xe1ac55=_0x166c6b;if(_0x3ea915<0x0)return _0xe1ac55(0x363);const _0x50d85e=this[_0xe1ac55(0x48a)]();if(_0x50d85e!==_0xe1ac55(0x53b))return _0x50d85e;else{if(this[_0xe1ac55(0x41a)]()>0x0){const _0x4b4966=this[_0xe1ac55(0x450)](_0x3ea915);if(_0x4b4966['match'](/\\I\[(\d+)\]/i)){const _0x168a3f=this[_0xe1ac55(0x42d)](_0x3ea915),_0x25d0a7=this[_0xe1ac55(0x4ac)](_0x4b4966)['width'];return _0x25d0a7<=_0x168a3f[_0xe1ac55(0x3aa)]?_0xe1ac55(0x162):_0xe1ac55(0x512);}}}return _0xe1ac55(0x363);},Window_EquipCommand[_0x166c6b(0x3f4)][_0x166c6b(0x555)]=function(_0x3f2d1c){const _0x1773f8=_0x166c6b,_0x31e9a4=this[_0x1773f8(0x42d)](_0x3f2d1c),_0x4ab1d4=this[_0x1773f8(0x450)](_0x3f2d1c),_0x215875=this[_0x1773f8(0x4ac)](_0x4ab1d4)[_0x1773f8(0x3aa)];this[_0x1773f8(0x402)](this['isCommandEnabled'](_0x3f2d1c));const _0x4573c3=this[_0x1773f8(0x3a8)]();if(_0x4573c3==='right')this[_0x1773f8(0x438)](_0x4ab1d4,_0x31e9a4['x']+_0x31e9a4[_0x1773f8(0x3aa)]-_0x215875,_0x31e9a4['y'],_0x215875);else{if(_0x4573c3===_0x1773f8(0x35e)){const _0x5f4155=_0x31e9a4['x']+Math[_0x1773f8(0x523)]((_0x31e9a4[_0x1773f8(0x3aa)]-_0x215875)/0x2);this['drawTextEx'](_0x4ab1d4,_0x5f4155,_0x31e9a4['y'],_0x215875);}else this[_0x1773f8(0x438)](_0x4ab1d4,_0x31e9a4['x'],_0x31e9a4['y'],_0x215875);}},Window_EquipCommand[_0x166c6b(0x3f4)][_0x166c6b(0x4a4)]=function(_0x5ae844){const _0xba350c=_0x166c6b;this[_0xba350c(0x450)](_0x5ae844)[_0xba350c(0x346)](/\\I\[(\d+)\]/i);const _0x571e12=Number(RegExp['$1'])||0x0,_0x530311=this[_0xba350c(0x42d)](_0x5ae844),_0x5b1411=_0x530311['x']+Math[_0xba350c(0x523)]((_0x530311['width']-ImageManager['iconWidth'])/0x2),_0x11d697=_0x530311['y']+(_0x530311[_0xba350c(0x459)]-ImageManager['iconHeight'])/0x2;this['drawIcon'](_0x571e12,_0x5b1411,_0x11d697);},Window_EquipCommand[_0x166c6b(0x3f4)][_0x166c6b(0x4b3)]=function(){const _0x362593=_0x166c6b,_0x5be0f0=SceneManager[_0x362593(0x538)];if(_0x5be0f0&&_0x5be0f0['user'])return _0x5be0f0[_0x362593(0x41c)]();return null;},Window_EquipCommand[_0x166c6b(0x3f4)][_0x166c6b(0x4aa)]=function(){const _0x435343=_0x166c6b;Window_Command['prototype'][_0x435343(0x4aa)][_0x435343(0x2b5)](this),this['_helpWindow'][_0x435343(0x2f4)](this[_0x435343(0x45c)]());},Window_EquipCommand['prototype'][_0x166c6b(0x45c)]=function(){const _0x470156=_0x166c6b,_0xa552fa=this[_0x470156(0x5a3)]();switch(_0xa552fa){case'equip':return TextManager[_0x470156(0x2b9)]['helpDesc'][_0x470156(0x486)];case _0x470156(0x30a):return TextManager[_0x470156(0x2b9)][_0x470156(0x492)]['optimize'];case _0x470156(0x358):return TextManager['ITEMS_EQUIPS_CORE'][_0x470156(0x492)]['clear'];default:return'';}},Window_EquipSlot[_0x166c6b(0x3f4)]['isUseModernControls']=function(){const _0x2f0344=_0x166c6b;return Imported[_0x2f0344(0x4ef)]&&Window_HorzCommand['prototype'][_0x2f0344(0x2b0)][_0x2f0344(0x2b5)](this);},Window_EquipSlot[_0x166c6b(0x3f4)][_0x166c6b(0x1ec)]=function(){const _0x5b1dc4=_0x166c6b;Window_StatusBase[_0x5b1dc4(0x3f4)][_0x5b1dc4(0x1ec)][_0x5b1dc4(0x2b5)](this),this[_0x5b1dc4(0x330)]();},Window_EquipSlot[_0x166c6b(0x3f4)]['processCursorMove']=function(){const _0x55d183=_0x166c6b;Window_StatusBase['prototype']['processCursorMove']['call'](this),this[_0x55d183(0x393)]();},Window_EquipSlot['prototype']['checkShiftRemoveShortcut']=function(){const _0x20e8b1=_0x166c6b;if(!this['isShiftRemoveShortcutEnabled']())return;if(Input[_0x20e8b1(0x559)]('shift')&&this['item']()){const _0x28bde6=SceneManager[_0x20e8b1(0x538)][_0x20e8b1(0x23d)];_0x28bde6&&(this['canShiftRemoveEquipment'](this[_0x20e8b1(0x17f)]())?(this[_0x20e8b1(0x319)](),this[_0x20e8b1(0x4aa)]()):this[_0x20e8b1(0x47f)]());}},Window_EquipSlot[_0x166c6b(0x3f4)]['canShiftRemoveEquipment']=function(_0x4af875){const _0x23e2cb=_0x166c6b,_0xdc2370=SceneManager[_0x23e2cb(0x538)][_0x23e2cb(0x23d)];if(!_0xdc2370)return;if(!_0xdc2370[_0x23e2cb(0x4dc)](_0x4af875))return![];const _0x23c345=_0xdc2370['equipSlots']()[_0x4af875];if(_0xdc2370[_0x23e2cb(0x33a)]()['includes'](_0x23c345))return![];return!![];;},Window_EquipSlot[_0x166c6b(0x3f4)][_0x166c6b(0x319)]=function(){const _0x16b281=_0x166c6b;SoundManager[_0x16b281(0x1b2)]();const _0xbf0ecf=SceneManager[_0x16b281(0x538)][_0x16b281(0x23d)];_0xbf0ecf[_0x16b281(0x22f)](this[_0x16b281(0x17f)](),null),this[_0x16b281(0x1f1)](),this[_0x16b281(0x1c0)][_0x16b281(0x1f1)](),this[_0x16b281(0x330)]();const _0x3c4689=SceneManager['_scene'][_0x16b281(0x39d)];if(_0x3c4689)_0x3c4689[_0x16b281(0x1f1)]();},Window_EquipSlot[_0x166c6b(0x3f4)][_0x166c6b(0x543)]=function(){const _0x2723fa=_0x166c6b;if(!this['active'])return![];if(!VisuMZ[_0x2723fa(0x435)][_0x2723fa(0x43a)][_0x2723fa(0x4e2)][_0x2723fa(0x256)])return![];return!![];},Window_EquipSlot['prototype'][_0x166c6b(0x4c4)]=function(){const _0x51d33d=_0x166c6b;!this['processCursorSpecialCheckModernControls']()&&Window_StatusBase[_0x51d33d(0x3f4)][_0x51d33d(0x4c4)]['call'](this);},Window_EquipSlot[_0x166c6b(0x3f4)][_0x166c6b(0x163)]=function(){const _0x6be4d1=_0x166c6b;if(!this[_0x6be4d1(0x4e5)]())return![];if(SceneManager[_0x6be4d1(0x538)][_0x6be4d1(0x3ba)]!==Scene_Equip)return![];if(this[_0x6be4d1(0x4c0)]())return this[_0x6be4d1(0x47c)](),Input[_0x6be4d1(0x358)](),SceneManager[_0x6be4d1(0x538)][_0x6be4d1(0x212)](),![];else{if(Input[_0x6be4d1(0x1d6)]('down')){const _0x3fc783=this['index']();return Input[_0x6be4d1(0x389)](_0x6be4d1(0x194))?this[_0x6be4d1(0x405)]():this[_0x6be4d1(0x4b5)](Input['isTriggered'](_0x6be4d1(0x377))),this[_0x6be4d1(0x17f)]()!==_0x3fc783&&this[_0x6be4d1(0x47c)](),!![];}else{if(this['isShiftShortcutKeyForRemove']()&&Input[_0x6be4d1(0x559)](_0x6be4d1(0x194)))return!![];}}return![];},Window_EquipSlot[_0x166c6b(0x3f4)][_0x166c6b(0x4c0)]=function(){const _0xedd9e0=_0x166c6b;if(this['index']()!==0x0)return![];const _0x3e27b3=VisuMZ['ItemsEquipsCore']['Settings'][_0xedd9e0(0x4e2)];if(!_0x3e27b3[_0xedd9e0(0x581)]&&!_0x3e27b3[_0xedd9e0(0x324)])return![];return Input[_0xedd9e0(0x559)]('up');},Window_EquipSlot[_0x166c6b(0x3f4)]['isShiftShortcutKeyForRemove']=function(){const _0x580e0f=_0x166c6b;return VisuMZ['ItemsEquipsCore'][_0x580e0f(0x43a)]['EquipScene']['ShiftShortcutKey'];},Window_EquipSlot[_0x166c6b(0x3f4)][_0x166c6b(0x1bf)]=function(){const _0x3c16d3=_0x166c6b;if(this[_0x3c16d3(0x1fe)]()&&this['visible']&&SceneManager[_0x3c16d3(0x538)]['constructor']===Scene_Equip){if(this[_0x3c16d3(0x420)]()&&TouchInput['isHovered']())this[_0x3c16d3(0x4cd)](![]);else TouchInput['isTriggered']()&&this['onTouchSelectModernControls'](!![]);if(TouchInput[_0x3c16d3(0x30f)]())this[_0x3c16d3(0x458)]();else{if(TouchInput[_0x3c16d3(0x3b9)]()){const _0x39e6da=VisuMZ[_0x3c16d3(0x435)][_0x3c16d3(0x43a)][_0x3c16d3(0x4e2)];this[_0x3c16d3(0x2b0)]()&&this[_0x3c16d3(0x544)]&&!_0x39e6da['CommandAddOptimize']&&!_0x39e6da[_0x3c16d3(0x324)]?(SoundManager[_0x3c16d3(0x43b)](),SceneManager[_0x3c16d3(0x2a7)]()):this[_0x3c16d3(0x525)]();}}}},Window_EquipSlot[_0x166c6b(0x3f4)][_0x166c6b(0x4cd)]=function(_0x303c48){const _0x17f9c1=_0x166c6b;this[_0x17f9c1(0x40f)]=![];const _0x2a06f5=this[_0x17f9c1(0x17f)](),_0x530045=this[_0x17f9c1(0x472)](),_0x260d34=SceneManager[_0x17f9c1(0x538)][_0x17f9c1(0x4e9)];if(_0x260d34[_0x17f9c1(0x1fe)]()&&_0x260d34[_0x17f9c1(0x517)]){if(_0x530045>=0x0)_0x530045===this[_0x17f9c1(0x17f)]()&&(this['_doubleTouch']=!![]),this[_0x17f9c1(0x1ec)](),this['select'](_0x530045),_0x260d34[_0x17f9c1(0x2c5)]();else _0x260d34[_0x17f9c1(0x472)]()>=0x0&&(this[_0x17f9c1(0x2c5)](),this[_0x17f9c1(0x382)](),_0x260d34['activate']());}_0x303c48&&this['index']()!==_0x2a06f5&&this[_0x17f9c1(0x47c)]();},Window_EquipSlot['prototype'][_0x166c6b(0x2c8)]=function(){const _0x321061=_0x166c6b;return this[_0x321061(0x17f)]();},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x203)]=Window_EquipSlot[_0x166c6b(0x3f4)][_0x166c6b(0x356)],Window_EquipSlot['prototype'][_0x166c6b(0x356)]=function(_0x505766){const _0x152eb0=_0x166c6b;if(this[_0x152eb0(0x41a)]()<=0x0)return![];return VisuMZ[_0x152eb0(0x435)][_0x152eb0(0x203)]['call'](this,_0x505766);},VisuMZ['ItemsEquipsCore'][_0x166c6b(0x39b)]=Window_EquipItem[_0x166c6b(0x3f4)][_0x166c6b(0x175)],Window_EquipItem[_0x166c6b(0x3f4)][_0x166c6b(0x175)]=function(_0x2fb15f){const _0x4a873c=_0x166c6b;if(_0x2fb15f===null&&this[_0x4a873c(0x33a)]()[_0x4a873c(0x175)](this['etypeId']()))return![];else{$gameTemp[_0x4a873c(0x3c8)]=!![];let _0x280ea2=VisuMZ['ItemsEquipsCore'][_0x4a873c(0x39b)][_0x4a873c(0x2b5)](this,_0x2fb15f);if(!_0x280ea2&&_0x2fb15f&&DataManager[_0x4a873c(0x3c2)](_0x2fb15f)){const _0x3243ce=_0x2fb15f[_0x4a873c(0x443)]||0x0;if(this[_0x4a873c(0x23d)]&&this[_0x4a873c(0x23d)]['isEquipAtypeOk'](_0x3243ce)){const _0x5012cf=DataManager[_0x4a873c(0x23a)](_0x2fb15f);_0x5012cf[_0x4a873c(0x175)](this[_0x4a873c(0x400)]())&&(_0x280ea2=!![]);}}return $gameTemp[_0x4a873c(0x3c8)]=undefined,_0x280ea2;}},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x301)]=Window_EquipItem['prototype'][_0x166c6b(0x356)],Window_EquipItem[_0x166c6b(0x3f4)][_0x166c6b(0x356)]=function(_0x4384a3){const _0x425385=_0x166c6b;if(_0x4384a3&&this[_0x425385(0x23d)]){if(this[_0x425385(0x3c5)](_0x4384a3))return![];if(this[_0x425385(0x2dc)](_0x4384a3))return![];if(this[_0x425385(0x456)](_0x4384a3))return![];if(!this['_actor'][_0x425385(0x43f)](_0x4384a3))return![];}if(!_0x4384a3)return!this['nonRemovableEtypes']()[_0x425385(0x175)](this['etypeId']());return VisuMZ[_0x425385(0x435)][_0x425385(0x301)]['call'](this,_0x4384a3);},Window_EquipItem[_0x166c6b(0x3f4)][_0x166c6b(0x3c5)]=function(_0x30c577){const _0x22d9b6=_0x166c6b,_0xa9f64a=_0x30c577['note'];if(_0xa9f64a['match'](/<EQUIP COPY LIMIT:[ ](\d+)>/i)){const _0x3faa96=Number(RegExp['$1'])||0x1;let _0x38e9fb=0x0;const _0x3847e6=this['_actor'][_0x22d9b6(0x591)](),_0x46ba38=SceneManager[_0x22d9b6(0x538)]['_slotWindow']['equipSlotIndex']();_0x3847e6[_0x46ba38]=null;for(const _0x11d62f of _0x3847e6){if(!_0x11d62f)continue;if(DataManager[_0x22d9b6(0x4e6)](_0x30c577)===DataManager[_0x22d9b6(0x4e6)](_0x11d62f)){if(_0x30c577['id']===_0x11d62f['id'])_0x38e9fb+=0x1;}}return _0x38e9fb>=_0x3faa96;}else return![];},Window_EquipItem[_0x166c6b(0x3f4)]['isSoleWeaponType']=function(_0x1ec96d){const _0x5f71ef=_0x166c6b;if(!DataManager['isWeapon'](_0x1ec96d))return![];const _0x582ea6=/<EQUIP WEAPON TYPE LIMIT:[ ](\d+)>/i;let _0x20b677=0x0;const _0x3d6644=this['_actor'][_0x5f71ef(0x591)](),_0x48f490=SceneManager[_0x5f71ef(0x538)][_0x5f71ef(0x36e)][_0x5f71ef(0x2c8)]();_0x3d6644[_0x48f490]=null;for(const _0x1c819f of _0x3d6644){if(!_0x1c819f)continue;if(!DataManager['isWeapon'](_0x1c819f))continue;if(_0x1ec96d['wtypeId']===_0x1c819f[_0x5f71ef(0x57b)]){_0x20b677+=0x1;if(_0x1ec96d[_0x5f71ef(0x1a6)][_0x5f71ef(0x346)](_0x582ea6)){const _0x113d21=Number(RegExp['$1'])||0x1;if(_0x20b677>=_0x113d21)return!![];}if(_0x1c819f['note']['match'](_0x582ea6)){const _0x5ae44f=Number(RegExp['$1'])||0x1;if(_0x20b677>=_0x5ae44f)return!![];}}}return![];},Window_EquipItem[_0x166c6b(0x3f4)][_0x166c6b(0x456)]=function(_0x209f80){const _0x2719df=_0x166c6b;if(!DataManager['isArmor'](_0x209f80))return![];const _0x166617=/<EQUIP ARMOR TYPE LIMIT:[ ](\d+)>/i;let _0x4f2ea1=0x0;const _0x172e3e=this[_0x2719df(0x23d)][_0x2719df(0x591)](),_0x15e28f=SceneManager['_scene'][_0x2719df(0x36e)][_0x2719df(0x2c8)]();_0x172e3e[_0x15e28f]=null;for(const _0x241ca3 of _0x172e3e){if(!_0x241ca3)continue;if(!DataManager[_0x2719df(0x3c2)](_0x241ca3))continue;if(_0x209f80[_0x2719df(0x443)]===_0x241ca3[_0x2719df(0x443)]){_0x4f2ea1+=0x1;if(_0x209f80['note'][_0x2719df(0x346)](_0x166617)){const _0x3bf505=Number(RegExp['$1'])||0x1;if(_0x4f2ea1>=_0x3bf505)return!![];}if(_0x241ca3[_0x2719df(0x1a6)]['match'](_0x166617)){const _0x87ef70=Number(RegExp['$1'])||0x1;if(_0x4f2ea1>=_0x87ef70)return!![];}}}return![];},Window_EquipItem[_0x166c6b(0x3f4)][_0x166c6b(0x33a)]=function(){const _0x197bb2=_0x166c6b;return VisuMZ[_0x197bb2(0x435)][_0x197bb2(0x43a)][_0x197bb2(0x4e2)]['NonRemoveETypes'];},Window_EquipItem[_0x166c6b(0x3f4)][_0x166c6b(0x4b1)]=function(_0x254820){const _0x462159=_0x166c6b,_0x2c85ad=this['itemAt'](_0x254820);_0x2c85ad?Window_ItemList[_0x462159(0x3f4)][_0x462159(0x4b1)][_0x462159(0x2b5)](this,_0x254820):this['drawRemoveItem'](_0x254820);},Window_EquipItem[_0x166c6b(0x3f4)]['drawRemoveItem']=function(_0x548cbd){const _0x508028=_0x166c6b;this[_0x508028(0x402)](this['isEnabled'](null));const _0x3423de=VisuMZ[_0x508028(0x435)]['Settings'][_0x508028(0x4e2)],_0x582e1a=this[_0x508028(0x42d)](_0x548cbd),_0x554c6a=_0x582e1a['y']+(this[_0x508028(0x334)]()-ImageManager[_0x508028(0x38c)])/0x2,_0x5b794c=ImageManager[_0x508028(0x3fb)]+0x4,_0x232cfb=Math['max'](0x0,_0x582e1a[_0x508028(0x3aa)]-_0x5b794c);this[_0x508028(0x582)](),this[_0x508028(0x297)](_0x3423de[_0x508028(0x4c3)],_0x582e1a['x'],_0x554c6a),this[_0x508028(0x2d2)](_0x3423de['RemoveEquipText'],_0x582e1a['x']+_0x5b794c,_0x582e1a['y'],_0x232cfb),this[_0x508028(0x402)](!![]);},Window_EquipItem[_0x166c6b(0x3f4)][_0x166c6b(0x4aa)]=function(){const _0x55ec0b=_0x166c6b;Window_ItemList[_0x55ec0b(0x3f4)][_0x55ec0b(0x4aa)]['call'](this);if(this[_0x55ec0b(0x23d)]&&this[_0x55ec0b(0x39d)]&&this[_0x55ec0b(0x494)]>=0x0){const _0x4a1ab4=JsonEx[_0x55ec0b(0x32c)](this[_0x55ec0b(0x23d)]);_0x4a1ab4[_0x55ec0b(0x2bb)]=!![],_0x4a1ab4[_0x55ec0b(0x4fd)](this[_0x55ec0b(0x494)],this[_0x55ec0b(0x1b4)]()),this['_statusWindow'][_0x55ec0b(0x3cf)](_0x4a1ab4);}},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x2a8)]=Window_ShopCommand[_0x166c6b(0x3f4)]['initialize'],Window_ShopCommand[_0x166c6b(0x3f4)]['initialize']=function(_0x27cb3f){const _0x2b47d1=_0x166c6b;VisuMZ[_0x2b47d1(0x435)][_0x2b47d1(0x2a8)]['call'](this,_0x27cb3f),this[_0x2b47d1(0x465)](_0x27cb3f);},Window_ShopCommand[_0x166c6b(0x3f4)][_0x166c6b(0x465)]=function(_0x3a68ec){const _0x45ab5e=_0x166c6b,_0x38d621=new Rectangle(0x0,0x0,_0x3a68ec[_0x45ab5e(0x3aa)],_0x3a68ec[_0x45ab5e(0x459)]);this[_0x45ab5e(0x1c8)]=new Window_Base(_0x38d621),this[_0x45ab5e(0x1c8)][_0x45ab5e(0x265)]=0x0,this[_0x45ab5e(0x2f0)](this[_0x45ab5e(0x1c8)]),this['updateCommandNameWindow']();},Window_ShopCommand[_0x166c6b(0x3f4)]['callUpdateHelp']=function(){const _0xa21ad5=_0x166c6b;Window_HorzCommand[_0xa21ad5(0x3f4)][_0xa21ad5(0x330)][_0xa21ad5(0x2b5)](this);if(this[_0xa21ad5(0x1c8)])this['updateCommandNameWindow']();},Window_ShopCommand['prototype'][_0x166c6b(0x452)]=function(){const _0xba4291=_0x166c6b,_0x1f3a38=this[_0xba4291(0x1c8)];_0x1f3a38[_0xba4291(0x20e)][_0xba4291(0x358)]();const _0x31de19=this[_0xba4291(0x4b0)](this[_0xba4291(0x17f)]());if(_0x31de19===_0xba4291(0x512)){const _0x3d8c76=this[_0xba4291(0x42d)](this['index']());let _0x128ba1=this[_0xba4291(0x450)](this[_0xba4291(0x17f)]());_0x128ba1=_0x128ba1[_0xba4291(0x5a5)](/\\I\[(\d+)\]/gi,''),_0x1f3a38['resetFontSettings'](),this['commandNameWindowDrawBackground'](_0x128ba1,_0x3d8c76),this[_0xba4291(0x3c6)](_0x128ba1,_0x3d8c76),this[_0xba4291(0x4f9)](_0x128ba1,_0x3d8c76);}},Window_ShopCommand[_0x166c6b(0x3f4)]['commandNameWindowDrawBackground']=function(_0x1c16d9,_0x1e2b55){},Window_ShopCommand[_0x166c6b(0x3f4)][_0x166c6b(0x3c6)]=function(_0x5cc380,_0x219bbf){const _0x153839=_0x166c6b,_0x402f93=this[_0x153839(0x1c8)];_0x402f93['drawText'](_0x5cc380,0x0,_0x219bbf['y'],_0x402f93[_0x153839(0x20c)],_0x153839(0x35e));},Window_ShopCommand[_0x166c6b(0x3f4)]['commandNameWindowCenter']=function(_0x1079b3,_0x1a48a2){const _0x14ac1b=_0x166c6b,_0xf122b4=this['_commandNameWindow'],_0x311221=$gameSystem['windowPadding'](),_0x135d38=_0x1a48a2['x']+Math[_0x14ac1b(0x523)](_0x1a48a2[_0x14ac1b(0x3aa)]/0x2)+_0x311221;_0xf122b4['x']=_0xf122b4['width']/-0x2+_0x135d38,_0xf122b4['y']=Math['floor'](_0x1a48a2[_0x14ac1b(0x459)]/0x2);},Window_ShopCommand[_0x166c6b(0x3f4)][_0x166c6b(0x1ad)]=function(){const _0x2c9282=_0x166c6b;return this[_0x2c9282(0x3a5)]?this[_0x2c9282(0x3a5)][_0x2c9282(0x514)]:0x3;},Window_ShopCommand[_0x166c6b(0x3f4)][_0x166c6b(0x262)]=function(){const _0x51b8bf=_0x166c6b;return VisuMZ[_0x51b8bf(0x435)][_0x51b8bf(0x43a)][_0x51b8bf(0x29d)]['CmdHideDisabled'];},Window_ShopCommand['prototype'][_0x166c6b(0x585)]=function(){const _0x4b9b4d=_0x166c6b;this[_0x4b9b4d(0x201)](),this[_0x4b9b4d(0x59c)](),this[_0x4b9b4d(0x1b8)]();},Window_ShopCommand[_0x166c6b(0x3f4)][_0x166c6b(0x1f1)]=function(){const _0x93eba9=_0x166c6b;Window_HorzCommand[_0x93eba9(0x3f4)]['refresh']['call'](this),this[_0x93eba9(0x533)]();},Window_ShopCommand[_0x166c6b(0x3f4)]['addBuyCommand']=function(){const _0x33881b=_0x166c6b,_0x3a1e3b=this[_0x33881b(0x48a)](),_0xdccb0=VisuMZ[_0x33881b(0x435)][_0x33881b(0x43a)][_0x33881b(0x29d)]['CmdIconBuy'],_0x3f9b73=_0x3a1e3b===_0x33881b(0x363)?TextManager[_0x33881b(0x535)]:'\x5cI[%1]%2'[_0x33881b(0x505)](_0xdccb0,TextManager[_0x33881b(0x535)]),_0x5f17f0=this[_0x33881b(0x228)]();if(this[_0x33881b(0x262)]()&&!_0x5f17f0)return;this[_0x33881b(0x165)](_0x3f9b73,_0x33881b(0x535),_0x5f17f0);},Window_ShopCommand[_0x166c6b(0x3f4)]['isBuyCommandEnabled']=function(){const _0x32b6e5=_0x166c6b;return SceneManager[_0x32b6e5(0x538)]['constructor']===Scene_Shop?SceneManager[_0x32b6e5(0x538)][_0x32b6e5(0x21c)]>0x0:!![];},Window_ShopCommand[_0x166c6b(0x3f4)]['addSellCommand']=function(){const _0x6e1a21=_0x166c6b,_0x6b8968=this['commandStyle'](),_0x48bef8=VisuMZ['ItemsEquipsCore'][_0x6e1a21(0x43a)][_0x6e1a21(0x29d)][_0x6e1a21(0x304)],_0x2e41e0=_0x6b8968===_0x6e1a21(0x363)?TextManager[_0x6e1a21(0x542)]:'\x5cI[%1]%2'[_0x6e1a21(0x505)](_0x48bef8,TextManager[_0x6e1a21(0x542)]),_0x2902e2=this[_0x6e1a21(0x4f3)]();if(this['hideDisabledCommands']()&&!_0x2902e2)return;this[_0x6e1a21(0x165)](_0x2e41e0,_0x6e1a21(0x542),_0x2902e2);},Window_ShopCommand[_0x166c6b(0x3f4)][_0x166c6b(0x4f3)]=function(){const _0x11faa8=_0x166c6b;return!this[_0x11faa8(0x197)];},Window_ShopCommand[_0x166c6b(0x3f4)][_0x166c6b(0x1b8)]=function(){const _0x450fbe=_0x166c6b,_0x253c7a=this[_0x450fbe(0x48a)](),_0x4ac4ff=VisuMZ[_0x450fbe(0x435)]['Settings']['ShopScene'][_0x450fbe(0x2ed)],_0x2d4c6a=VisuMZ[_0x450fbe(0x435)][_0x450fbe(0x43a)]['ShopScene'][_0x450fbe(0x1c7)],_0x2ce3f7=_0x253c7a===_0x450fbe(0x363)?_0x2d4c6a:_0x450fbe(0x50d)[_0x450fbe(0x505)](_0x4ac4ff,_0x2d4c6a);this[_0x450fbe(0x165)](_0x2ce3f7,_0x450fbe(0x520));},Window_ShopCommand[_0x166c6b(0x3f4)][_0x166c6b(0x3a8)]=function(){const _0x9da5b7=_0x166c6b;return VisuMZ[_0x9da5b7(0x435)][_0x9da5b7(0x43a)]['ShopScene'][_0x9da5b7(0x490)];},Window_ShopCommand[_0x166c6b(0x3f4)][_0x166c6b(0x4b1)]=function(_0xfb3688){const _0x4d2431=_0x166c6b,_0x9ab77b=this[_0x4d2431(0x4b0)](_0xfb3688);if(_0x9ab77b===_0x4d2431(0x162))this['drawItemStyleIconText'](_0xfb3688);else _0x9ab77b===_0x4d2431(0x512)?this[_0x4d2431(0x4a4)](_0xfb3688):Window_HorzCommand[_0x4d2431(0x3f4)][_0x4d2431(0x4b1)]['call'](this,_0xfb3688);},Window_ShopCommand[_0x166c6b(0x3f4)]['commandStyle']=function(){const _0x2f3e60=_0x166c6b;return VisuMZ[_0x2f3e60(0x435)][_0x2f3e60(0x43a)][_0x2f3e60(0x29d)][_0x2f3e60(0x1a2)];},Window_ShopCommand[_0x166c6b(0x3f4)]['commandStyleCheck']=function(_0x2ae7f0){const _0x2af5b8=_0x166c6b;if(_0x2ae7f0<0x0)return _0x2af5b8(0x363);const _0x1ba463=this[_0x2af5b8(0x48a)]();if(_0x1ba463!==_0x2af5b8(0x53b))return _0x1ba463;else{if(this[_0x2af5b8(0x41a)]()>0x0){const _0x50d963=this[_0x2af5b8(0x450)](_0x2ae7f0);if(_0x50d963[_0x2af5b8(0x346)](/\\I\[(\d+)\]/i)){const _0x352a6a=this[_0x2af5b8(0x42d)](_0x2ae7f0),_0x3945c3=this['textSizeEx'](_0x50d963)[_0x2af5b8(0x3aa)];return _0x3945c3<=_0x352a6a['width']?_0x2af5b8(0x162):_0x2af5b8(0x512);}}}return _0x2af5b8(0x363);},Window_ShopCommand[_0x166c6b(0x3f4)]['drawItemStyleIconText']=function(_0x249319){const _0x4bab96=_0x166c6b,_0x2d32e8=this[_0x4bab96(0x42d)](_0x249319),_0x3b2e05=this[_0x4bab96(0x450)](_0x249319),_0x502e20=this[_0x4bab96(0x4ac)](_0x3b2e05)[_0x4bab96(0x3aa)];this['changePaintOpacity'](this['isCommandEnabled'](_0x249319));const _0x38c913=this[_0x4bab96(0x3a8)]();if(_0x38c913==='right')this[_0x4bab96(0x438)](_0x3b2e05,_0x2d32e8['x']+_0x2d32e8[_0x4bab96(0x3aa)]-_0x502e20,_0x2d32e8['y'],_0x502e20);else{if(_0x38c913===_0x4bab96(0x35e)){const _0x55e2a9=_0x2d32e8['x']+Math[_0x4bab96(0x523)]((_0x2d32e8[_0x4bab96(0x3aa)]-_0x502e20)/0x2);this['drawTextEx'](_0x3b2e05,_0x55e2a9,_0x2d32e8['y'],_0x502e20);}else this[_0x4bab96(0x438)](_0x3b2e05,_0x2d32e8['x'],_0x2d32e8['y'],_0x502e20);}},Window_ShopCommand[_0x166c6b(0x3f4)][_0x166c6b(0x4a4)]=function(_0x45b680){const _0x16515a=_0x166c6b;this['commandName'](_0x45b680)[_0x16515a(0x346)](/\\I\[(\d+)\]/i);const _0x29e795=Number(RegExp['$1'])||0x0,_0x545f99=this[_0x16515a(0x42d)](_0x45b680),_0x4b82fd=_0x545f99['x']+Math[_0x16515a(0x523)]((_0x545f99['width']-ImageManager[_0x16515a(0x3fb)])/0x2),_0x8f2dec=_0x545f99['y']+(_0x545f99[_0x16515a(0x459)]-ImageManager[_0x16515a(0x38c)])/0x2;this[_0x16515a(0x297)](_0x29e795,_0x4b82fd,_0x8f2dec);},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x307)]=Window_ShopBuy['prototype'][_0x166c6b(0x1f1)],Window_ShopBuy[_0x166c6b(0x3f4)][_0x166c6b(0x1f1)]=function(){const _0x38efde=_0x166c6b;this['updateMoneyAmount'](),VisuMZ[_0x38efde(0x435)][_0x38efde(0x307)][_0x38efde(0x2b5)](this);},Window_ShopBuy[_0x166c6b(0x3f4)]['updateMoneyAmount']=function(){const _0x85f633=_0x166c6b;SceneManager['_scene'][_0x85f633(0x3ba)]===Scene_Shop&&(this[_0x85f633(0x4ad)]=SceneManager[_0x85f633(0x538)][_0x85f633(0x3a2)]());},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x53d)]=Window_ShopBuy[_0x166c6b(0x3f4)]['price'],Window_ShopBuy['prototype'][_0x166c6b(0x192)]=function(_0x261631){const _0x3cd1d0=_0x166c6b;if(!_0x261631)return 0x0;let _0x3424fb=VisuMZ['ItemsEquipsCore'][_0x3cd1d0(0x53d)]['call'](this,_0x261631);return Math[_0x3cd1d0(0x2aa)](0x0,this['modifiedBuyPriceItemsEquipsCore'](_0x261631,_0x3424fb));},Window_ShopBuy[_0x166c6b(0x3f4)][_0x166c6b(0x3b5)]=function(_0x5c3f4f,_0xae2ebe){const _0x1c75b8=_0x166c6b,_0xe1312d=_0x5c3f4f[_0x1c75b8(0x1a6)]||'';if(_0xe1312d[_0x1c75b8(0x346)](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){const _0x1a53e5=String(RegExp['$1']);window[_0x1c75b8(0x192)]=_0xae2ebe,window[_0x1c75b8(0x1b4)]=_0x5c3f4f;try{eval(_0x1a53e5);}catch(_0x494652){if($gameTemp[_0x1c75b8(0x3ee)]())console[_0x1c75b8(0x1e7)](_0x494652);}_0xae2ebe=window[_0x1c75b8(0x192)],window[_0x1c75b8(0x192)]=undefined,window[_0x1c75b8(0x1b4)]=undefined;}_0xae2ebe=VisuMZ[_0x1c75b8(0x435)][_0x1c75b8(0x43a)][_0x1c75b8(0x29d)]['BuyPriceJS']['call'](this,_0x5c3f4f,_0xae2ebe);if(isNaN(_0xae2ebe))_0xae2ebe=0x0;return Math[_0x1c75b8(0x523)](_0xae2ebe);},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x28f)]=Window_ShopBuy['prototype'][_0x166c6b(0x286)],Window_ShopBuy[_0x166c6b(0x3f4)][_0x166c6b(0x286)]=function(_0x24e341){const _0x34bb7f=_0x166c6b,_0x3a963f=VisuMZ['ItemsEquipsCore'][_0x34bb7f(0x28f)][_0x34bb7f(0x2b5)](this,_0x24e341);return _0x3a963f&&!this['meetsShopListingConditions'](_0x3a963f)?null:_0x3a963f;},VisuMZ[_0x166c6b(0x435)]['ShopListingRegExp']={'ShowAllSwitches':/<SHOW SHOP (?:ALL |)SWITCH(?:|ES):[ ](.*)>/i,'ShowAnySwitches':/<SHOW SHOP ANY SWITCH(?:|ES):[ ](.*)>/i,'HideAllSwitches':/<HIDE SHOP (?:ALL |)SWITCH(?:|ES):[ ](.*)>/i,'HideAnySwitches':/<HIDE SHOP ANY SWITCH(?:|ES):[ ](.*)>/i,'BuyTurnSwitchOn':/<BUY TURN ON SWITCH(?:|ES):[ ](.*)>/i,'BuyTurnSwitchOff':/<BUY TURN OFF SWITCH(?:|ES):[ ](.*)>/i,'SellTurnSwitchOn':/<SELL TURN ON SWITCH(?:|ES):[ ](.*)>/i,'SellTurnSwitchOff':/<SELL TURN OFF SWITCH(?:|ES):[ ](.*)>/i},Window_ShopBuy[_0x166c6b(0x3f4)][_0x166c6b(0x3eb)]=function(_0x344451){const _0x4befd1=_0x166c6b;if(!_0x344451)return![];const _0x57808e=VisuMZ['ItemsEquipsCore'][_0x4befd1(0x1c2)],_0xf79bae=_0x344451?_0x344451[_0x4befd1(0x1a6)]||'':'';if(_0xf79bae[_0x4befd1(0x346)](_0x57808e['ShowAllSwitches'])){const _0x103a51=String(RegExp['$1'])[_0x4befd1(0x3c7)](',')[_0x4befd1(0x436)](_0x5f4e37=>Number(_0x5f4e37));if(_0x103a51[_0x4befd1(0x1ba)](_0x198c97=>!$gameSwitches[_0x4befd1(0x2c7)](_0x198c97)))return![];}if(_0xf79bae[_0x4befd1(0x346)](_0x57808e['ShowAnySwitches'])){const _0x448ef5=String(RegExp['$1'])[_0x4befd1(0x3c7)](',')['map'](_0x40932f=>Number(_0x40932f));if(_0x448ef5[_0x4befd1(0x57f)](_0x550353=>!$gameSwitches[_0x4befd1(0x2c7)](_0x550353)))return![];}if(_0xf79bae[_0x4befd1(0x346)](_0x57808e[_0x4befd1(0x2b6)])){const _0x468b6f=String(RegExp['$1'])[_0x4befd1(0x3c7)](',')[_0x4befd1(0x436)](_0x2b1ad9=>Number(_0x2b1ad9));if(_0x468b6f[_0x4befd1(0x57f)](_0x50ba0b=>$gameSwitches[_0x4befd1(0x2c7)](_0x50ba0b)))return![];}if(_0xf79bae[_0x4befd1(0x346)](_0x57808e[_0x4befd1(0x2b3)])){const _0x57e625=String(RegExp['$1'])[_0x4befd1(0x3c7)](',')[_0x4befd1(0x436)](_0x2ad7e3=>Number(_0x2ad7e3));if(_0x57e625[_0x4befd1(0x1ba)](_0x1f52b0=>$gameSwitches['value'](_0x1f52b0)))return![];}return!![];},Window_ShopBuy[_0x166c6b(0x3f4)][_0x166c6b(0x4b1)]=function(_0x37025f){const _0x3ace9f=_0x166c6b;this[_0x3ace9f(0x1d1)]();const _0x754947=this[_0x3ace9f(0x545)](_0x37025f),_0x457e40=this[_0x3ace9f(0x42d)](_0x37025f),_0xc825ea=_0x457e40['width'];this[_0x3ace9f(0x402)](this['isEnabled'](_0x754947)),this[_0x3ace9f(0x445)](_0x754947,_0x457e40['x'],_0x457e40['y'],_0xc825ea),this['drawItemCost'](_0x754947,_0x457e40),this[_0x3ace9f(0x402)](!![]);},Window_ShopBuy[_0x166c6b(0x3f4)][_0x166c6b(0x36f)]=function(_0x568e4d,_0x5f4611){const _0x208458=_0x166c6b,_0x39397d=this[_0x208458(0x192)](_0x568e4d);this[_0x208458(0x3be)](_0x39397d,TextManager[_0x208458(0x4d5)],_0x5f4611['x'],_0x5f4611['y'],_0x5f4611['width']);},Window_ShopSell[_0x166c6b(0x3f4)]['maxCols']=function(){const _0xef66cc=_0x166c6b;return SceneManager[_0xef66cc(0x538)]['isUseItemsEquipsCoreUpdatedLayout']()?0x1:0x2;},VisuMZ[_0x166c6b(0x435)]['Window_ShopSell_isEnabled']=Window_ShopSell[_0x166c6b(0x3f4)]['isEnabled'],Window_ShopSell[_0x166c6b(0x3f4)][_0x166c6b(0x356)]=function(_0x31b534){const _0x46b3bf=_0x166c6b;if(!_0x31b534)return![];const _0x52f2fc=_0x31b534['note'];if(_0x52f2fc['match'](/<CANNOT SELL>/i))return![];if(_0x52f2fc[_0x46b3bf(0x346)](/<CAN SELL>/i))return!![];if(_0x52f2fc[_0x46b3bf(0x346)](/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x9049f9=JSON['parse']('['+RegExp['$1'][_0x46b3bf(0x346)](/\d+/g)+']');for(const _0xd34942 of _0x9049f9){if(!$gameSwitches[_0x46b3bf(0x2c7)](_0xd34942))return![];}}if(_0x52f2fc['match'](/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1c38f4=JSON['parse']('['+RegExp['$1'][_0x46b3bf(0x346)](/\d+/g)+']');for(const _0x8682b3 of _0x1c38f4){if(!$gameSwitches[_0x46b3bf(0x2c7)](_0x8682b3))return![];}}if(_0x52f2fc[_0x46b3bf(0x346)](/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3cb434=JSON[_0x46b3bf(0x2f1)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0xd7ccff of _0x3cb434){if($gameSwitches[_0x46b3bf(0x2c7)](_0xd7ccff))return![];}}return VisuMZ[_0x46b3bf(0x435)][_0x46b3bf(0x34d)][_0x46b3bf(0x2b5)](this,_0x31b534);},Window_ShopStatus[_0x166c6b(0x38a)]=VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x43a)][_0x166c6b(0x247)][_0x166c6b(0x211)]??0xf0,VisuMZ['ItemsEquipsCore'][_0x166c6b(0x1ae)]=Window_ShopStatus[_0x166c6b(0x3f4)]['setItem'],Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x3f6)]=function(_0x5c2efe){const _0x152801=_0x166c6b;_0x5c2efe=DataManager[_0x152801(0x380)](_0x5c2efe),DataManager[_0x152801(0x4e6)](_0x5c2efe)||DataManager[_0x152801(0x3c2)](_0x5c2efe)?this['setItemDelay'](_0x5c2efe):VisuMZ[_0x152801(0x435)][_0x152801(0x1ae)]['call'](this,_0x5c2efe);},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x28b)]=function(_0x271ed6){const _0x37a206=_0x166c6b;this[_0x37a206(0x1e6)]=_0x271ed6;const _0x363047=Window_ShopStatus[_0x37a206(0x38a)];setTimeout(this[_0x37a206(0x27c)][_0x37a206(0x343)](this,_0x271ed6),_0x363047);},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x27c)]=function(_0x2bd664){const _0x52e31d=_0x166c6b;this[_0x52e31d(0x1e6)]===_0x2bd664&&this['refresh']();},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x495)]=function(){return![];},Window_ShopStatus[_0x166c6b(0x3f4)]['loadFaceImages']=function(){const _0x289e0c=_0x166c6b;Window_StatusBase[_0x289e0c(0x3f4)][_0x289e0c(0x16c)][_0x289e0c(0x2b5)](this);for(const _0x1c805c of $gameParty['members']()){ImageManager['loadCharacter'](_0x1c805c['characterName']());}},Window_ShopStatus['prototype']['translucentOpacity']=function(){const _0x5d0fdf=_0x166c6b;return VisuMZ[_0x5d0fdf(0x435)]['Settings']['StatusWindow'][_0x5d0fdf(0x2b8)];},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x1f1)]=function(){const _0x2c0159=_0x166c6b;this[_0x2c0159(0x20e)][_0x2c0159(0x358)](),this[_0x2c0159(0x570)][_0x2c0159(0x358)](),this[_0x2c0159(0x1e6)]&&(this[_0x2c0159(0x1d1)](),this[_0x2c0159(0x402)](!![]),this[_0x2c0159(0x243)](),this[_0x2c0159(0x170)]()?this[_0x2c0159(0x449)]():this[_0x2c0159(0x568)](),this[_0x2c0159(0x55c)]());},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x240)]=function(_0x44211c,_0x44459d){const _0x29e4df=_0x166c6b;if(!this[_0x29e4df(0x170)]()&&!DataManager[_0x29e4df(0x45f)](this[_0x29e4df(0x1e6)]))return;const _0x2afd2b=this[_0x29e4df(0x20c)]-this[_0x29e4df(0x566)]()-_0x44211c,_0x1f08d4=this[_0x29e4df(0x24a)](_0x29e4df(0x306));this[_0x29e4df(0x434)](ColorManager[_0x29e4df(0x261)]()),this[_0x29e4df(0x2d2)](TextManager['possession'],_0x44211c+this[_0x29e4df(0x566)](),_0x44459d,_0x2afd2b-_0x1f08d4),this[_0x29e4df(0x582)](),this[_0x29e4df(0x36c)](this[_0x29e4df(0x1e6)],_0x44211c,_0x44459d,_0x2afd2b);},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x1d4)]=function(_0x39c8c4,_0x1d78ae,_0x4e6903,_0x29411c,_0x2cfa6f){const _0x55a130=_0x166c6b;if(VisuMZ[_0x55a130(0x435)][_0x55a130(0x43a)][_0x55a130(0x247)][_0x55a130(0x25b)]===![])return;_0x2cfa6f=Math[_0x55a130(0x2aa)](_0x2cfa6f||0x1,0x1);while(_0x2cfa6f--){_0x29411c=_0x29411c||this['lineHeight'](),this[_0x55a130(0x570)][_0x55a130(0x274)]=0xa0;const _0x2c5eb3=ColorManager[_0x55a130(0x461)]();this[_0x55a130(0x570)][_0x55a130(0x252)](_0x39c8c4+0x1,_0x1d78ae+0x1,_0x4e6903-0x2,_0x29411c-0x2,_0x2c5eb3),this[_0x55a130(0x570)][_0x55a130(0x274)]=0xff;}},ColorManager[_0x166c6b(0x461)]=function(){const _0x3aac58=_0x166c6b,_0x1818f2=VisuMZ['ItemsEquipsCore']['Settings'][_0x3aac58(0x247)];let _0x2a11b0=_0x1818f2[_0x3aac58(0x4a8)]!==undefined?_0x1818f2[_0x3aac58(0x4a8)]:0x13;return ColorManager['getColor'](_0x2a11b0);},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x449)]=function(){const _0x571613=_0x166c6b,_0x738a8e=this[_0x571613(0x598)]();if(_0x738a8e===_0x571613(0x1f8))this[_0x571613(0x56e)]();else _0x738a8e==='double'?this['drawEquipDataDouble']():this[_0x571613(0x2a1)]();},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x598)]=function(){const _0x1db22c=_0x166c6b;let _0x36feec=VisuMZ[_0x1db22c(0x435)][_0x1db22c(0x43a)][_0x1db22c(0x247)][_0x1db22c(0x4a6)]??_0x1db22c(0x1f8);const _0x4d02f9=/<STATUS STYLE:[ ](.*)>/i;return this[_0x1db22c(0x1e6)]&&this[_0x1db22c(0x1e6)]['note']&&this[_0x1db22c(0x1e6)]['note'][_0x1db22c(0x346)](_0x4d02f9)&&(_0x36feec=String(RegExp['$1'])[_0x1db22c(0x1cb)]()[_0x1db22c(0x507)]()),_0x36feec;},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x56e)]=function(){const _0x4fc727=_0x166c6b;this['_tempActor']=null;if(VisuMZ['ItemsEquipsCore'][_0x4fc727(0x43a)][_0x4fc727(0x247)][_0x4fc727(0x440)]){VisuMZ[_0x4fc727(0x435)][_0x4fc727(0x43a)][_0x4fc727(0x247)][_0x4fc727(0x440)]['call'](this);return;}const _0x4f0b16=this[_0x4fc727(0x334)](),_0x11505e=this['gaugeLineHeight']()+0x8;let _0x365bbc=0x0,_0x499adb=0x0,_0x41c909=this[_0x4fc727(0x20c)],_0x1c7b64=this[_0x4fc727(0x181)],_0x1518ec=Math[_0x4fc727(0x523)](_0x41c909/0x2),_0x49f92d=_0x365bbc+_0x41c909-_0x1518ec;this['drawItemName'](this[_0x4fc727(0x1e6)],_0x365bbc+this[_0x4fc727(0x566)](),_0x499adb,_0x41c909-this[_0x4fc727(0x566)]()*0x2),this['drawItemDarkRect'](_0x365bbc,_0x499adb,_0x41c909),_0x499adb+=_0x4f0b16;if(this['drawItemEquipType'](_0x365bbc,_0x499adb,_0x1518ec))_0x499adb+=0x0;if(this[_0x4fc727(0x4ae)](_0x49f92d,_0x499adb,_0x1518ec))_0x499adb+=_0x4f0b16;const _0x2765da=this[_0x4fc727(0x557)](),_0x38c249=_0x499adb;_0x499adb=_0x1c7b64-_0x2765da[_0x4fc727(0x514)]*_0x11505e-0x4;let _0x1bdcd2=_0x365bbc,_0x893861=0x0,_0xacf37=_0x499adb;for(const _0x229773 of _0x2765da){_0x893861=Math[_0x4fc727(0x2aa)](this[_0x4fc727(0x4c1)](_0x229773,_0x365bbc+0x4,_0x499adb+0x4,_0x41c909),_0x893861),_0x499adb+=_0x11505e;}const _0x1d68a2=$gameParty[_0x4fc727(0x2cc)](),_0x2c4d03=Math[_0x4fc727(0x523)]((_0x41c909-_0x893861)/_0x1d68a2);_0x893861=_0x41c909-_0x2c4d03*_0x1d68a2;for(const _0x1a90e7 of $gameParty[_0x4fc727(0x2e2)]()){const _0x38ee34=$gameParty[_0x4fc727(0x2e2)]()[_0x4fc727(0x47a)](_0x1a90e7),_0x3f28fb=_0x1bdcd2+_0x893861+_0x38ee34*_0x2c4d03;this['changePaintOpacity'](_0x1a90e7[_0x4fc727(0x43f)](this[_0x4fc727(0x1e6)])),this['drawActorCharacter'](_0x1a90e7,_0x3f28fb+_0x2c4d03/0x2,_0xacf37);let _0x5cfba9=_0xacf37;for(const _0x192671 of _0x2765da){const _0x2cfbac=_0x5cfba9-(_0x4f0b16-_0x11505e)/0x2;this['drawActorParamDifference'](_0x1a90e7,_0x192671,_0x3f28fb,_0x2cfbac,_0x2c4d03),_0x5cfba9+=_0x11505e;}}this[_0x4fc727(0x1d4)](_0x1bdcd2,_0x38c249,_0x893861,_0xacf37-_0x38c249);for(let _0x3310a1=0x0;_0x3310a1<_0x1d68a2;_0x3310a1++){const _0x256d02=_0x1bdcd2+_0x893861+_0x3310a1*_0x2c4d03;this[_0x4fc727(0x1d4)](_0x256d02,_0x38c249,_0x2c4d03,_0xacf37-_0x38c249);}for(const _0x2cc8fa of _0x2765da){this[_0x4fc727(0x1d4)](_0x1bdcd2,_0xacf37,_0x893861,_0x11505e);for(let _0x58732d=0x0;_0x58732d<_0x1d68a2;_0x58732d++){const _0x584a16=_0x1bdcd2+_0x893861+_0x58732d*_0x2c4d03;this['drawItemDarkRect'](_0x584a16,_0xacf37,_0x2c4d03,_0x11505e);}_0xacf37+=_0x11505e;}},Window_ShopStatus['prototype'][_0x166c6b(0x2a1)]=function(){const _0x588713=_0x166c6b;this[_0x588713(0x2bb)]=null;if(VisuMZ[_0x588713(0x435)]['Settings'][_0x588713(0x247)]['DrawEquipClassicData']){VisuMZ[_0x588713(0x435)][_0x588713(0x43a)][_0x588713(0x247)][_0x588713(0x2d7)][_0x588713(0x2b5)](this);return;}const _0x4f6111=this[_0x588713(0x334)]();let _0x431bb4=0x0,_0x119786=0x0,_0x5c3be4=this['innerWidth'],_0x1a7281=this[_0x588713(0x181)],_0x453650=Math[_0x588713(0x523)](_0x5c3be4/0x2),_0x230771=_0x431bb4+_0x5c3be4-_0x453650;this[_0x588713(0x445)](this[_0x588713(0x1e6)],_0x431bb4+this['itemPadding'](),_0x119786,_0x5c3be4-this[_0x588713(0x566)]()*0x2),this[_0x588713(0x1d4)](_0x431bb4,_0x119786,_0x5c3be4),_0x119786+=_0x4f6111;if(this[_0x588713(0x3b3)](_0x431bb4,_0x119786,_0x453650))_0x119786+=0x0;if(this['drawItemQuantity'](_0x230771,_0x119786,_0x453650))_0x119786+=_0x4f6111;if(this[_0x588713(0x260)](_0x431bb4,_0x119786,_0x5c3be4))_0x119786+=_0x4f6111;const _0x2d4866=this[_0x588713(0x557)]();for(const _0xac1238 of _0x2d4866){if(this[_0x588713(0x574)](_0xac1238))continue;this[_0x588713(0x51a)](_0xac1238,_0x431bb4,_0x119786,_0x5c3be4),_0x119786+=_0x4f6111;}_0x119786=this[_0x588713(0x4e4)](_0x431bb4,_0x119786,_0x5c3be4),this['drawItemDarkRect'](_0x431bb4,_0x119786,_0x5c3be4,_0x1a7281-_0x119786);},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x493)]=function(){const _0x1de44c=_0x166c6b;this[_0x1de44c(0x2bb)]=null;if(VisuMZ[_0x1de44c(0x435)][_0x1de44c(0x43a)][_0x1de44c(0x247)][_0x1de44c(0x1df)]){VisuMZ[_0x1de44c(0x435)][_0x1de44c(0x43a)][_0x1de44c(0x247)][_0x1de44c(0x1df)][_0x1de44c(0x2b5)](this);return;}const _0x1f79d0=this[_0x1de44c(0x334)]();let _0x1be2e0=0x0,_0x2f72ff=0x0,_0x3fcf89=this[_0x1de44c(0x20c)],_0x369580=this['innerHeight'],_0x62b30c=Math['floor'](_0x3fcf89/0x2),_0x32f940=_0x1be2e0+_0x3fcf89-_0x62b30c;this[_0x1de44c(0x445)](this[_0x1de44c(0x1e6)],_0x1be2e0+this['itemPadding'](),_0x2f72ff,_0x3fcf89-this[_0x1de44c(0x566)]()*0x2),this[_0x1de44c(0x1d4)](_0x1be2e0,_0x2f72ff,_0x3fcf89),_0x2f72ff+=_0x1f79d0;if(this[_0x1de44c(0x3b3)](_0x1be2e0,_0x2f72ff,_0x62b30c))_0x2f72ff+=0x0;if(this[_0x1de44c(0x4ae)](_0x32f940,_0x2f72ff,_0x62b30c))_0x2f72ff+=_0x1f79d0;if(this['drawItemEquipSubType'](_0x1be2e0,_0x2f72ff,_0x3fcf89))_0x2f72ff+=_0x1f79d0;const _0x19abfb=this['actorParams']();for(const _0x499653 of _0x19abfb){if(this[_0x1de44c(0x574)](_0x499653))continue;this[_0x1de44c(0x51a)](_0x499653,_0x1be2e0,_0x2f72ff,_0x62b30c),_0x1be2e0===_0x62b30c?(_0x2f72ff+=_0x1f79d0,_0x1be2e0=0x0):_0x1be2e0=_0x62b30c;}_0x1be2e0===_0x62b30c&&(this[_0x1de44c(0x1d4)](_0x62b30c,_0x2f72ff,_0x62b30c,_0x1f79d0),_0x2f72ff+=_0x1f79d0,_0x1be2e0=0x0),_0x2f72ff=this['drawItemCustomEntries'](_0x1be2e0,_0x2f72ff,_0x3fcf89),this[_0x1de44c(0x1d4)](_0x1be2e0,_0x2f72ff,_0x3fcf89,_0x369580-_0x2f72ff);},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x3b3)]=function(_0x28d7b1,_0x2bc6d2,_0x275119){const _0x50f746=_0x166c6b;if(!this[_0x50f746(0x170)]())return![];const _0x18c1a2=$dataSystem[_0x50f746(0x244)][this['_item'][_0x50f746(0x400)]];return this['drawItemKeyData'](_0x18c1a2,_0x28d7b1,_0x2bc6d2,_0x275119,!![]),this[_0x50f746(0x1d4)](_0x28d7b1,_0x2bc6d2,_0x275119),this[_0x50f746(0x1d1)](),!![];},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x260)]=function(_0x354df0,_0x4c5d95,_0x5dea83){const _0x2c1046=_0x166c6b;if(!this[_0x2c1046(0x170)]())return![];let _0x4e2ac8='',_0x4570f7='';const _0x45d12b=VisuMZ['ItemsEquipsCore'][_0x2c1046(0x43a)]['StatusWindow'];return DataManager[_0x2c1046(0x4e6)](this[_0x2c1046(0x1e6)])?(_0x4e2ac8=_0x45d12b[_0x2c1046(0x4ff)]??_0x2c1046(0x562),_0x4570f7=$dataSystem[_0x2c1046(0x2c0)][this['_item'][_0x2c1046(0x57b)]]||_0x45d12b[_0x2c1046(0x4d0)]||'-'):(_0x4e2ac8=_0x45d12b[_0x2c1046(0x1a3)]??_0x2c1046(0x392),_0x4570f7=$dataSystem[_0x2c1046(0x16d)][this['_item'][_0x2c1046(0x443)]]||_0x45d12b[_0x2c1046(0x4d0)]||'-'),this['drawItemKeyData'](_0x4e2ac8,_0x354df0,_0x4c5d95,_0x5dea83,!![]),this['drawItemKeyData'](_0x4570f7,_0x354df0,_0x4c5d95,_0x5dea83,![],_0x2c1046(0x2f8)),this[_0x2c1046(0x1d4)](_0x354df0,_0x4c5d95,_0x5dea83),this[_0x2c1046(0x1d1)](),!![];},Window_ShopStatus[_0x166c6b(0x3f4)]['getItemQuantityText']=function(){const _0x2c078d=_0x166c6b,_0x37ab0a=VisuMZ[_0x2c078d(0x435)][_0x2c078d(0x43a)][_0x2c078d(0x167)][_0x2c078d(0x29c)];return _0x37ab0a[_0x2c078d(0x505)]($gameParty[_0x2c078d(0x383)](this['_item']));},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x557)]=function(){const _0x32565a=_0x166c6b;let _0x59957f=[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];if(Imported[_0x32565a(0x4ef)]){_0x59957f=VisuMZ[_0x32565a(0x285)][_0x32565a(0x43a)]['Param'][_0x32565a(0x2fc)];if(this[_0x32565a(0x17b)]())return this['customEquipParams']();const _0x519724=VisuMZ[_0x32565a(0x435)]['Settings'][_0x32565a(0x247)];if(this[_0x32565a(0x598)]()===_0x32565a(0x22d)){if(DataManager[_0x32565a(0x4e6)](this[_0x32565a(0x1e6)]))_0x59957f=_0x59957f[_0x32565a(0x1c5)](_0x519724['ClassicWeaponParameters']||[]);if(DataManager[_0x32565a(0x3c2)](this[_0x32565a(0x1e6)]))_0x59957f=_0x59957f[_0x32565a(0x1c5)](_0x519724[_0x32565a(0x3e7)]||[]);}else{if(this['getEquipDataStyle']()===_0x32565a(0x202)){if(DataManager[_0x32565a(0x4e6)](this['_item']))_0x59957f=_0x59957f[_0x32565a(0x1c5)](_0x519724[_0x32565a(0x3ac)]||[]);if(DataManager[_0x32565a(0x3c2)](this[_0x32565a(0x1e6)]))_0x59957f=_0x59957f[_0x32565a(0x1c5)](_0x519724[_0x32565a(0x4de)]||[]);}}}return _0x59957f=_0x59957f[_0x32565a(0x436)](_0x13a444=>typeof _0x13a444===_0x32565a(0x4ec)?_0x13a444:_0x13a444[_0x32565a(0x255)]()[_0x32565a(0x507)]()),_0x59957f;},Window_ShopStatus[_0x166c6b(0x3f4)]['smallParamFontSize']=function(){const _0x3c4f01=_0x166c6b;return VisuMZ[_0x3c4f01(0x435)][_0x3c4f01(0x43a)][_0x3c4f01(0x247)][_0x3c4f01(0x30d)];},Window_ShopStatus[_0x166c6b(0x3f4)]['drawParamName']=function(_0x37e895,_0x3ba3eb,_0xd33e79,_0x544b04){const _0x179dad=_0x166c6b;this[_0x179dad(0x1d1)](),this['contents'][_0x179dad(0x1c4)]=this[_0x179dad(0x1e8)]();let _0x495425=this[_0x179dad(0x24a)](TextManager[_0x179dad(0x40a)](_0x37e895))+0x4+_0x3ba3eb;return Imported[_0x179dad(0x4ef)]?(this['drawParamText'](_0x3ba3eb,_0xd33e79,_0x544b04,_0x37e895,!![]),VisuMZ[_0x179dad(0x285)][_0x179dad(0x43a)][_0x179dad(0x33f)][_0x179dad(0x183)]&&(_0x495425+=ImageManager[_0x179dad(0x3fb)]+0x4)):(this['changeTextColor'](ColorManager['systemColor']()),this[_0x179dad(0x2d2)](TextManager[_0x179dad(0x40a)](_0x37e895),_0x3ba3eb,_0xd33e79,_0x544b04)),this[_0x179dad(0x1d1)](),_0x495425;},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x5a1)]=function(_0x236dca,_0x883bd,_0x73afe0,_0x56a9af,_0x25e99c){const _0x352127=_0x166c6b;_0x73afe0+=this[_0x352127(0x566)](),_0x25e99c-=this[_0x352127(0x566)]()*0x2;const _0xa2efe2=VisuMZ[_0x352127(0x435)][_0x352127(0x43a)][_0x352127(0x247)];this[_0x352127(0x20e)]['fontSize']=_0xa2efe2['ParamChangeFontSize'],this[_0x352127(0x402)](_0x236dca[_0x352127(0x43f)](this[_0x352127(0x1e6)]));if(_0x236dca['isEquipped'](this['_item'])&&!_0x236dca[_0x352127(0x573)](this[_0x352127(0x1e6)])){const _0x1fc424=_0xa2efe2[_0x352127(0x482)];this['drawText'](_0x1fc424,_0x73afe0,_0x56a9af,_0x25e99c,_0x352127(0x35e));}else{if(_0x236dca[_0x352127(0x43f)](this[_0x352127(0x1e6)])){const _0x38eb1e=this[_0x352127(0x3a9)](_0x236dca);let _0x2488ce=0x0,_0x2d69cb=0x0,_0x43c593=0x0;Imported[_0x352127(0x4ef)]?(_0x2488ce=_0x38eb1e[_0x352127(0x1fc)](_0x883bd),_0x2d69cb=_0x2488ce-_0x236dca[_0x352127(0x1fc)](_0x883bd),this[_0x352127(0x434)](ColorManager[_0x352127(0x25a)](_0x2d69cb)),_0x43c593=(_0x2d69cb>=0x0?'+':'')+VisuMZ['ConvertNumberToString'](_0x2d69cb,0x0,_0x883bd)):(_0x2488ce=_0x38eb1e[_0x352127(0x40a)](_0x883bd),_0x2d69cb=_0x2488ce-_0x236dca[_0x352127(0x40a)](_0x883bd),this[_0x352127(0x434)](ColorManager[_0x352127(0x25a)](_0x2d69cb)),_0x43c593=(_0x2d69cb>=0x0?'+':'')+_0x2d69cb),_0x43c593==='+0'&&(_0x43c593=_0xa2efe2[_0x352127(0x2f6)]),this[_0x352127(0x2d2)](_0x43c593,_0x73afe0,_0x56a9af,_0x25e99c,_0x352127(0x35e));}else{const _0x4aa11e=_0xa2efe2[_0x352127(0x2d4)];this[_0x352127(0x2d2)](_0x4aa11e,_0x73afe0,_0x56a9af,_0x25e99c,_0x352127(0x35e));}}this[_0x352127(0x1d1)](),this[_0x352127(0x402)](!![]);},Window_ShopStatus[_0x166c6b(0x3f4)]['createTempActorEquips']=function(_0x3a4ef1){const _0x2a2d65=_0x166c6b;if(this['needsNewTempActor'](_0x3a4ef1)){const _0x2e4c02=JsonEx['makeDeepCopy'](_0x3a4ef1);_0x2e4c02[_0x2a2d65(0x2bb)]=!![];const _0x2bf4ae=_0x2e4c02[_0x2a2d65(0x1ff)](this['_item']);_0x2bf4ae>=0x0&&_0x2e4c02[_0x2a2d65(0x4fd)](_0x2bf4ae,this[_0x2a2d65(0x1e6)]),this['_tempActor']=_0x2e4c02;}return this[_0x2a2d65(0x2bb)];},Window_ShopStatus[_0x166c6b(0x3f4)]['needsNewTempActor']=function(_0x1924de){const _0x1a7470=_0x166c6b;if(!this[_0x1a7470(0x2bb)])return!![];return this[_0x1a7470(0x2bb)][_0x1a7470(0x4f0)]()!==_0x1924de[_0x1a7470(0x4f0)]();},Game_Actor[_0x166c6b(0x3f4)][_0x166c6b(0x573)]=function(_0x3b2f59){const _0x4f4f33=_0x166c6b;if(!_0x3b2f59)return![];const _0x20a411=_0x3b2f59[_0x4f4f33(0x400)],_0x1b7bc2=this[_0x4f4f33(0x190)]();for(let _0x288bd2=0x0;_0x288bd2<_0x1b7bc2['length'];_0x288bd2++){const _0x5e4dbc=_0x1b7bc2[_0x288bd2];if(_0x5e4dbc!==_0x20a411)continue;if(!this[_0x4f4f33(0x591)]()[_0x288bd2])return!![];}return![];},Game_Actor['prototype'][_0x166c6b(0x1ff)]=function(_0x3c5ff7){const _0x775b88=_0x166c6b;if(!_0x3c5ff7)return-0x1;const _0x16b19b=_0x3c5ff7['etypeId'],_0x4e6c97=this[_0x775b88(0x190)]();let _0x4bcfcd=-0x1;for(let _0x566149=0x0;_0x566149<_0x4e6c97[_0x775b88(0x514)];_0x566149++){const _0x11a16a=_0x4e6c97[_0x566149];if(_0x11a16a!==_0x16b19b)continue;if(!this[_0x775b88(0x591)]()[_0x566149])return _0x566149;if(_0x4bcfcd<0x0)_0x4bcfcd=_0x566149;}return _0x4bcfcd;},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x51a)]=function(_0x8c685b,_0x83c087,_0x4d6168,_0xbeba39){const _0x3ae777=_0x166c6b,_0x40a755=TextManager[_0x3ae777(0x40a)](_0x8c685b);this[_0x3ae777(0x3af)](_0x40a755,_0x83c087,_0x4d6168,_0xbeba39,!![]);let _0xd6af38='+0';Imported['VisuMZ_0_CoreEngine']?_0xd6af38=this[_0x3ae777(0x3fa)](_0x8c685b):_0xd6af38=this[_0x3ae777(0x4ee)](_0x8c685b),this['drawItemKeyData'](_0xd6af38,_0x83c087,_0x4d6168,_0xbeba39,![],'right'),this['drawItemDarkRect'](_0x83c087,_0x4d6168,_0xbeba39);},Window_ShopStatus['prototype'][_0x166c6b(0x574)]=function(_0x248a77){const _0x57a47e=_0x166c6b;return Imported[_0x57a47e(0x4ef)]?!!VisuMZ['CoreEngine'][_0x57a47e(0x2e4)][_0x248a77]:![];},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x3fa)]=function(_0x5aafea){const _0x10c876=_0x166c6b;if(this['_customItemInfo'][_0x5aafea])return this['_customItemInfo'][_0x5aafea];const _0x526431=[_0x10c876(0x288),_0x10c876(0x38e),'ATK',_0x10c876(0x245),_0x10c876(0x361),'MDF',_0x10c876(0x2ac),_0x10c876(0x552)],_0x161a8f=[_0x10c876(0x51b),_0x10c876(0x191),_0x10c876(0x4b4),'CEV','MEV',_0x10c876(0x4fa),_0x10c876(0x179),_0x10c876(0x224),_0x10c876(0x23b),_0x10c876(0x4f5)],_0x868f45=['TGR',_0x10c876(0x16f),_0x10c876(0x4f7),_0x10c876(0x312),_0x10c876(0x54a),'TCR',_0x10c876(0x2ca),_0x10c876(0x2ea),'FDR','EXR'];if(_0x526431[_0x10c876(0x175)](_0x5aafea)){const _0x194488=_0x526431[_0x10c876(0x47a)](_0x5aafea),_0x10181d=this[_0x10c876(0x1e6)][_0x10c876(0x516)][_0x194488]||0x0;return this[_0x10c876(0x434)](ColorManager[_0x10c876(0x25a)](_0x10181d)),(_0x10181d>=0x0?'+':'')+String(_0x10181d);}else{if(_0x161a8f[_0x10c876(0x175)](_0x5aafea)){const _0x1713cc=_0x161a8f[_0x10c876(0x47a)](_0x5aafea);let _0x497170=0x0;for(const _0x3fbe69 of this['_item'][_0x10c876(0x464)]){if(_0x3fbe69['code']!==0x16)continue;_0x3fbe69[_0x10c876(0x42f)]===_0x1713cc&&(_0x497170+=_0x3fbe69[_0x10c876(0x2c7)]||0x0);}return this[_0x10c876(0x434)](ColorManager[_0x10c876(0x25a)](_0x497170)),_0x497170*=0x64,(_0x497170>=0x0?'+':'')+String(_0x497170)+'%';}else{if(_0x868f45[_0x10c876(0x175)](_0x5aafea)){const _0x5c1a7a=_0x868f45[_0x10c876(0x47a)](_0x5aafea);let _0x195dcf=0x1;for(const _0x4406d2 of this['_item'][_0x10c876(0x464)]){if(_0x4406d2[_0x10c876(0x3bc)]!==0x17)continue;_0x4406d2[_0x10c876(0x42f)]===_0x5c1a7a&&(_0x195dcf*=_0x4406d2['value']||0x0);}let _0x1500be=0x1;if(['TGR',_0x10c876(0x54a),_0x10c876(0x2ca),_0x10c876(0x2ea),'FDR'][_0x10c876(0x175)](_0x5aafea))_0x1500be=-0x1;return this[_0x10c876(0x434)](ColorManager[_0x10c876(0x25a)]((_0x195dcf-0x1)*_0x1500be)),_0x195dcf*=0x64,String(_0x195dcf)+'%';}}}return'';},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x4ee)]=function(_0xd50c31){const _0x12dc2a=_0x166c6b,_0xa3276f=[_0x12dc2a(0x288),'MAXMP',_0x12dc2a(0x48b),_0x12dc2a(0x245),_0x12dc2a(0x361),_0x12dc2a(0x3e2),_0x12dc2a(0x2ac),_0x12dc2a(0x552)],_0x2e72bc=_0xa3276f[_0xd50c31]||_0x12dc2a(0x3d0);if(this[_0x12dc2a(0x478)][_0x2e72bc])return this[_0x12dc2a(0x478)][_0x2e72bc];const _0x1b46c0=Number(this[_0x12dc2a(0x1e6)][_0x12dc2a(0x516)][_0xd50c31]||0x0);return this[_0x12dc2a(0x434)](ColorManager[_0x12dc2a(0x25a)](_0x1b46c0)),(_0x1b46c0>=0x0?'+':'')+String(_0x1b46c0);},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x17b)]=function(){const _0x169ae5=_0x166c6b,_0x2ee722=/<CUSTOM STATUS PARAM(?:|S|ETERS):[ ](.*)>/i;return this[_0x169ae5(0x1e6)]&&this['_item'][_0x169ae5(0x1a6)]&&this[_0x169ae5(0x1e6)][_0x169ae5(0x1a6)][_0x169ae5(0x346)](_0x2ee722);},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x1f7)]=function(){const _0x1b2b7b=_0x166c6b,_0x1db3d4=/<CUSTOM STATUS PARAM(?:|S|ETERS):[ ](.*)>/i;this[_0x1b2b7b(0x1e6)]['note'][_0x1b2b7b(0x346)](_0x1db3d4);const _0x56e367=String(RegExp['$1'])[_0x1b2b7b(0x3c7)](',')[_0x1b2b7b(0x436)](_0x308816=>_0x308816[_0x1b2b7b(0x255)]()[_0x1b2b7b(0x507)]()),_0x5b335c=['MAXHP','MAXMP',_0x1b2b7b(0x48b),'DEF',_0x1b2b7b(0x361),_0x1b2b7b(0x3e2),_0x1b2b7b(0x2ac),_0x1b2b7b(0x552)],_0x47050b=[_0x1b2b7b(0x51b),_0x1b2b7b(0x191),'CRI',_0x1b2b7b(0x1b9),'MEV',_0x1b2b7b(0x4fa),'CNT','HRG',_0x1b2b7b(0x23b),_0x1b2b7b(0x4f5)],_0x371bae=[_0x1b2b7b(0x15c),_0x1b2b7b(0x16f),_0x1b2b7b(0x4f7),_0x1b2b7b(0x312),'MCR',_0x1b2b7b(0x42b),_0x1b2b7b(0x2ca),'MDR',_0x1b2b7b(0x1a5),'EXR'];let _0x31acc5=[];for(const _0xb552e3 of _0x56e367){if(_0x5b335c[_0x1b2b7b(0x175)](_0xb552e3))_0x31acc5['push'](_0xb552e3);if(_0x47050b[_0x1b2b7b(0x175)](_0xb552e3))_0x31acc5['push'](_0xb552e3);if(_0x371bae[_0x1b2b7b(0x175)](_0xb552e3))_0x31acc5['push'](_0xb552e3);}return _0x31acc5;},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x568)]=function(){const _0x18abf3=_0x166c6b;VisuMZ[_0x18abf3(0x435)]['Settings'][_0x18abf3(0x247)][_0x18abf3(0x231)]['call'](this);},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x445)]=function(_0x1ae355,_0x9b4eb7,_0x1c68cf,_0x34c1ab){const _0x5cdc9d=_0x166c6b,_0x348d6c=DataManager[_0x5cdc9d(0x3b6)](_0x1ae355,_0x9b4eb7,_0x1c68cf,_0x34c1ab)&&Imported[_0x5cdc9d(0x24e)],_0x417665=_0x1ae355?_0x1ae355['name']:'';if(_0x348d6c)Window_SkillList['prototype'][_0x5cdc9d(0x3d8)][_0x5cdc9d(0x2b5)](this,_0x1ae355);Window_Base['prototype'][_0x5cdc9d(0x445)]['call'](this,_0x1ae355,_0x9b4eb7,_0x1c68cf,_0x34c1ab);if(_0x348d6c)_0x1ae355[_0x5cdc9d(0x32f)]=_0x417665;},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x243)]=function(){const _0xfad0e5=_0x166c6b;this[_0xfad0e5(0x478)]={};if(!this[_0xfad0e5(0x1e6)])return;const _0x2d4c94=this['_item'][_0xfad0e5(0x1a6)];if(_0x2d4c94[_0xfad0e5(0x346)](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){const _0x276b8c=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x17ef3d of _0x276b8c){if(_0x17ef3d[_0xfad0e5(0x346)](/(.*):[ ](.*)/i)){const _0x98763=String(RegExp['$1'])['toUpperCase']()['trim'](),_0x15d29b=String(RegExp['$2'])['trim']();this[_0xfad0e5(0x478)][_0x98763]=_0x15d29b;}}}},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x2b7)]=function(){const _0x1a349a=_0x166c6b;return Math['max'](0x1,$gameSystem[_0x1a349a(0x325)]()-0x4);},Window_ShopStatus['prototype'][_0x166c6b(0x1d1)]=function(){const _0x2c21ab=_0x166c6b;Window_StatusBase[_0x2c21ab(0x3f4)][_0x2c21ab(0x1d1)]['call'](this),this[_0x2c21ab(0x20e)]['fontSize']=this[_0x2c21ab(0x37a)]||this[_0x2c21ab(0x20e)][_0x2c21ab(0x1c4)],this[_0x2c21ab(0x20e)][_0x2c21ab(0x3fe)]=this[_0x2c21ab(0x3cc)]||this[_0x2c21ab(0x20e)][_0x2c21ab(0x3fe)];},Window_ShopStatus['prototype'][_0x166c6b(0x296)]=function(){const _0x2ec847=_0x166c6b;return this[_0x2ec847(0x20e)][_0x2ec847(0x1c4)]/$gameSystem[_0x2ec847(0x325)]();},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x297)]=function(_0x33eb9f,_0x5aca32,_0x2cc5bb){const _0x2449d1=_0x166c6b,_0x16d216=ImageManager['loadSystem'](_0x2449d1(0x422)),_0x46d6df=ImageManager[_0x2449d1(0x3fb)],_0x511f25=ImageManager[_0x2449d1(0x38c)],_0x2dd44f=_0x33eb9f%0x10*_0x46d6df,_0x4ecb03=Math[_0x2449d1(0x523)](_0x33eb9f/0x10)*_0x511f25,_0x499937=Math[_0x2449d1(0x2cd)](_0x46d6df*this[_0x2449d1(0x296)]()),_0x14b4c7=Math[_0x2449d1(0x2cd)](_0x511f25*this[_0x2449d1(0x296)]());this[_0x2449d1(0x20e)][_0x2449d1(0x4da)](_0x16d216,_0x2dd44f,_0x4ecb03,_0x46d6df,_0x511f25,_0x5aca32,_0x2cc5bb,_0x499937,_0x14b4c7);},Window_ShopStatus['prototype'][_0x166c6b(0x1c6)]=function(_0x160bfb,_0x202924){const _0x4a8859=_0x166c6b;if(_0x202924[_0x4a8859(0x30c)]){let _0xd70824=0x2;this[_0x4a8859(0x334)]()>0x24&&(_0xd70824=Math[_0x4a8859(0x523)]((this[_0x4a8859(0x334)]()-ImageManager[_0x4a8859(0x38c)])/0x2)),this[_0x4a8859(0x297)](_0x160bfb,_0x202924['x'],_0x202924['y']+_0xd70824);}_0x202924['x']+=Math[_0x4a8859(0x2cd)](ImageManager['iconWidth']*this[_0x4a8859(0x296)]());if(this[_0x4a8859(0x296)]()===0x1)_0x202924['x']+=0x4;},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x3af)]=function(_0x5314bd,_0x1b0024,_0x2ad2b3,_0x1391a6,_0x3982fc,_0x45944c){const _0x250228=_0x166c6b;_0x5314bd=_0x5314bd||'',_0x45944c=_0x45944c||_0x250228(0x27b),this[_0x250228(0x37a)]=this[_0x250228(0x2b7)](),this[_0x250228(0x3cc)]=_0x3982fc?ColorManager[_0x250228(0x261)]():this['contents'][_0x250228(0x3fe)],_0x1b0024+=this[_0x250228(0x566)](),_0x1391a6-=this[_0x250228(0x566)]()*0x2;const _0x2c6d13=this[_0x250228(0x4ac)](_0x5314bd);if(_0x45944c===_0x250228(0x35e))_0x1b0024=_0x1b0024+Math[_0x250228(0x523)]((_0x1391a6-_0x2c6d13[_0x250228(0x3aa)])/0x2);else _0x45944c==='right'&&(_0x1b0024=_0x1b0024+_0x1391a6-_0x2c6d13[_0x250228(0x3aa)]);_0x2ad2b3+=(this[_0x250228(0x334)]()-_0x2c6d13[_0x250228(0x459)])/0x2,this[_0x250228(0x438)](_0x5314bd,_0x1b0024,_0x2ad2b3,_0x1391a6),this[_0x250228(0x37a)]=undefined,this[_0x250228(0x3cc)]=undefined,this[_0x250228(0x1d1)]();},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x58a)]=function(_0x4a59cf,_0x4f6a25,_0x29591d){const _0x11206e=_0x166c6b;if(!DataManager['isItem'](this[_0x11206e(0x1e6)]))return![];const _0x109226=this[_0x11206e(0x40d)]();this[_0x11206e(0x3af)](_0x109226,_0x4a59cf,_0x4f6a25,_0x29591d,!![]);const _0x37921b=this[_0x11206e(0x364)]();return this[_0x11206e(0x3af)](_0x37921b,_0x4a59cf,_0x4f6a25,_0x29591d,![],'right'),this[_0x11206e(0x1d4)](_0x4a59cf,_0x4f6a25,_0x29591d),this[_0x11206e(0x1d1)](),!![];},Window_ShopStatus['prototype'][_0x166c6b(0x40d)]=function(){const _0x1701b6=_0x166c6b;return VisuMZ[_0x1701b6(0x435)][_0x1701b6(0x43a)][_0x1701b6(0x247)][_0x1701b6(0x46c)];},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x364)]=function(){const _0x5af2c1=_0x166c6b,_0x3d99d9=_0x5af2c1(0x415);if(this['_customItemInfo'][_0x3d99d9])return this[_0x5af2c1(0x478)][_0x3d99d9];return this[_0x5af2c1(0x2e6)]()?VisuMZ[_0x5af2c1(0x435)][_0x5af2c1(0x43a)][_0x5af2c1(0x247)][_0x5af2c1(0x3b0)]:VisuMZ[_0x5af2c1(0x435)][_0x5af2c1(0x43a)]['StatusWindow'][_0x5af2c1(0x537)];},Window_ShopStatus['prototype'][_0x166c6b(0x2e6)]=function(){const _0x372ea9=_0x166c6b;return VisuMZ['CoreEngine']&&VisuMZ[_0x372ea9(0x285)]['Settings']['QoL'][_0x372ea9(0x453)]&&DataManager['isKeyItem'](this['_item'])?![]:this[_0x372ea9(0x1e6)][_0x372ea9(0x1bc)];},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x4ae)]=function(_0x184737,_0x34e52c,_0x2e6705){const _0x309472=_0x166c6b;if(!this['isEquipItem']()&&!DataManager[_0x309472(0x45f)](this['_item']))return![];if(DataManager[_0x309472(0x1d0)](this['_item'])&&!$dataSystem[_0x309472(0x217)]){const _0x40a50e=TextManager['keyItem'];this[_0x309472(0x3af)](_0x40a50e,_0x184737,_0x34e52c,_0x2e6705,!![],_0x309472(0x35e));}else{const _0x36c54b=TextManager[_0x309472(0x3b1)];this[_0x309472(0x3af)](_0x36c54b,_0x184737,_0x34e52c,_0x2e6705,!![]);const _0x1cc90f=this[_0x309472(0x290)]();this['drawItemKeyData'](_0x1cc90f,_0x184737,_0x34e52c,_0x2e6705,![],'right');}return this['drawItemDarkRect'](_0x184737,_0x34e52c,_0x2e6705),this[_0x309472(0x1d1)](),!![];},Window_ShopStatus[_0x166c6b(0x3f4)]['getItemQuantityText']=function(){const _0x36bc18=_0x166c6b,_0x23499b='QUANTITY';if(this[_0x36bc18(0x478)][_0x23499b])return this[_0x36bc18(0x478)][_0x23499b];const _0x1937a1=VisuMZ['ItemsEquipsCore']['Settings']['ItemScene']['ItemQuantityFmt'];return _0x1937a1[_0x36bc18(0x505)]($gameParty[_0x36bc18(0x383)](this[_0x36bc18(0x1e6)]));},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x3a3)]=function(_0x422531,_0x78916,_0x16f2a7){const _0x1500a2=_0x166c6b,_0x4a884a=this[_0x1500a2(0x2f7)]();return this[_0x1500a2(0x3af)](_0x4a884a,_0x422531,_0x78916,_0x16f2a7,![],_0x1500a2(0x35e)),this['drawItemDarkRect'](_0x422531,_0x78916,_0x16f2a7),this[_0x1500a2(0x1d1)](),!![];},Window_ShopStatus[_0x166c6b(0x3f4)]['getItemOccasionText']=function(){const _0x595a7a=_0x166c6b,_0x2c5784=_0x595a7a(0x56b);if(this[_0x595a7a(0x478)][_0x2c5784])return this[_0x595a7a(0x478)][_0x2c5784];const _0x3aaf07=VisuMZ[_0x595a7a(0x435)][_0x595a7a(0x43a)][_0x595a7a(0x247)],_0x14fef1=_0x595a7a(0x1fa)[_0x595a7a(0x505)](this[_0x595a7a(0x1e6)]['occasion']);return _0x3aaf07[_0x14fef1];},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x561)]=function(_0x14ef73,_0x3614aa,_0x8d64e6){const _0x4394ec=_0x166c6b,_0x14b7d4=this[_0x4394ec(0x33b)]();return this[_0x4394ec(0x3af)](_0x14b7d4,_0x14ef73,_0x3614aa,_0x8d64e6,![],'center'),this['drawItemDarkRect'](_0x14ef73,_0x3614aa,_0x8d64e6),this[_0x4394ec(0x1d1)](),!![];},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x33b)]=function(){const _0x3a3edb=_0x166c6b,_0x573a50='SCOPE';if(this[_0x3a3edb(0x478)][_0x573a50])return this[_0x3a3edb(0x478)][_0x573a50];const _0x329e15=VisuMZ['ItemsEquipsCore'][_0x3a3edb(0x43a)][_0x3a3edb(0x247)];if(Imported['VisuMZ_1_BattleCore']){const _0x1b5946=this['_item'][_0x3a3edb(0x1a6)];if(_0x1b5946['match'](/<TARGET:[ ](.*)>/i)){const _0x22afbe=String(RegExp['$1']);if(_0x22afbe[_0x3a3edb(0x346)](/(\d+) RANDOM ANY/i))return _0x329e15[_0x3a3edb(0x4b9)][_0x3a3edb(0x505)](Number(RegExp['$1']));else{if(_0x22afbe[_0x3a3edb(0x346)](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i))return _0x329e15['ScopeRandomEnemies']['format'](Number(RegExp['$1']));else{if(_0x22afbe[_0x3a3edb(0x346)](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i))return _0x329e15[_0x3a3edb(0x241)][_0x3a3edb(0x505)](Number(RegExp['$1']));else{if(_0x22afbe[_0x3a3edb(0x346)](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i))return _0x329e15[_0x3a3edb(0x56a)];else{if(_0x22afbe[_0x3a3edb(0x346)](/ALLY OR ENEMY/i))return _0x329e15[_0x3a3edb(0x55a)]||_0x329e15[_0x3a3edb(0x357)];else{if(_0x22afbe[_0x3a3edb(0x346)](/ENEMY OR ALLY/i))return _0x329e15[_0x3a3edb(0x18d)]||_0x329e15['Scope1'];}}}}}}}const _0x42dcf9=_0x3a3edb(0x528)[_0x3a3edb(0x505)](this[_0x3a3edb(0x1e6)][_0x3a3edb(0x23c)]);return _0x329e15[_0x42dcf9];},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x279)]=function(_0x329b1d,_0x2bb451,_0x32c54d){const _0x4df94a=_0x166c6b,_0x5cc6fe=this[_0x4df94a(0x576)]();this[_0x4df94a(0x3af)](_0x5cc6fe,_0x329b1d,_0x2bb451,_0x32c54d,!![]);const _0x3469c9=this[_0x4df94a(0x24d)]();return this[_0x4df94a(0x3af)](_0x3469c9,_0x329b1d,_0x2bb451,_0x32c54d,![],_0x4df94a(0x2f8)),this['drawItemDarkRect'](_0x329b1d,_0x2bb451,_0x32c54d),this[_0x4df94a(0x1d1)](),!![];},Window_ShopStatus[_0x166c6b(0x3f4)]['getItemSpeedLabel']=function(){const _0x278f8b=_0x166c6b;return VisuMZ['ItemsEquipsCore'][_0x278f8b(0x43a)][_0x278f8b(0x247)][_0x278f8b(0x391)];},Window_ShopStatus['prototype'][_0x166c6b(0x24d)]=function(){const _0x29573b=_0x166c6b,_0x144696=_0x29573b(0x375);if(this[_0x29573b(0x478)][_0x144696])return this[_0x29573b(0x478)][_0x144696];const _0x499363=this[_0x29573b(0x1e6)][_0x29573b(0x499)];if(_0x499363>=0x7d0)return VisuMZ[_0x29573b(0x435)][_0x29573b(0x43a)]['StatusWindow'][_0x29573b(0x1be)];else{if(_0x499363>=0x3e8)return VisuMZ[_0x29573b(0x435)][_0x29573b(0x43a)][_0x29573b(0x247)][_0x29573b(0x54b)];else{if(_0x499363>0x0)return VisuMZ[_0x29573b(0x435)][_0x29573b(0x43a)][_0x29573b(0x247)][_0x29573b(0x3d9)];else{if(_0x499363===0x0)return VisuMZ[_0x29573b(0x435)]['Settings'][_0x29573b(0x247)][_0x29573b(0x565)];else{if(_0x499363>-0x3e8)return VisuMZ[_0x29573b(0x435)][_0x29573b(0x43a)][_0x29573b(0x247)][_0x29573b(0x3e6)];else{if(_0x499363>-0x7d0)return VisuMZ[_0x29573b(0x435)][_0x29573b(0x43a)][_0x29573b(0x247)][_0x29573b(0x1e5)];else return _0x499363<=-0x7d0?VisuMZ[_0x29573b(0x435)][_0x29573b(0x43a)][_0x29573b(0x247)][_0x29573b(0x476)]:_0x29573b(0x374);}}}}}},Window_ShopStatus[_0x166c6b(0x3f4)]['drawItemSuccessRate']=function(_0x24e681,_0x3612a6,_0x585beb){const _0x3ec3f5=_0x166c6b,_0x84f804=this['getItemSuccessRateLabel']();this[_0x3ec3f5(0x3af)](_0x84f804,_0x24e681,_0x3612a6,_0x585beb,!![]);const _0x5baf43=this['getItemSuccessRateText']();return this[_0x3ec3f5(0x3af)](_0x5baf43,_0x24e681,_0x3612a6,_0x585beb,![],_0x3ec3f5(0x2f8)),this['drawItemDarkRect'](_0x24e681,_0x3612a6,_0x585beb),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x588)]=function(){const _0x2047c7=_0x166c6b;return VisuMZ['ItemsEquipsCore'][_0x2047c7(0x43a)][_0x2047c7(0x247)][_0x2047c7(0x258)];},Window_ShopStatus[_0x166c6b(0x3f4)]['getItemSuccessRateText']=function(){const _0x25612b=_0x166c6b,_0x42c3f7=_0x25612b(0x49d);if(this[_0x25612b(0x478)][_0x42c3f7])return this[_0x25612b(0x478)][_0x42c3f7];if(Imported['VisuMZ_1_BattleCore']){const _0x309197=this[_0x25612b(0x1e6)]['note'];if(_0x309197[_0x25612b(0x346)](/<ALWAYS HIT>/i))return _0x25612b(0x40c);else{if(_0x309197[_0x25612b(0x346)](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return _0x25612b(0x1cc)[_0x25612b(0x505)](Number(RegExp['$1']));}}return _0x25612b(0x1cc)[_0x25612b(0x505)](this[_0x25612b(0x1e6)][_0x25612b(0x455)]);},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x227)]=function(_0x50c01e,_0x586f82,_0x48438e){const _0x24b5c5=_0x166c6b,_0x4fc95c=this[_0x24b5c5(0x416)]();this[_0x24b5c5(0x3af)](_0x4fc95c,_0x50c01e,_0x586f82,_0x48438e,!![]);const _0x284e29=this[_0x24b5c5(0x592)]();return this[_0x24b5c5(0x3af)](_0x284e29,_0x50c01e,_0x586f82,_0x48438e,![],'right'),this[_0x24b5c5(0x1d4)](_0x50c01e,_0x586f82,_0x48438e),this[_0x24b5c5(0x1d1)](),!![];},Window_ShopStatus['prototype'][_0x166c6b(0x416)]=function(){const _0x47dd73=_0x166c6b;return VisuMZ[_0x47dd73(0x435)]['Settings'][_0x47dd73(0x247)][_0x47dd73(0x4ce)];},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x592)]=function(){const _0x362df8=_0x166c6b,_0x4129fc=_0x362df8(0x168);if(this[_0x362df8(0x478)][_0x4129fc])return this[_0x362df8(0x478)][_0x4129fc];const _0x46352d='×%1';return _0x46352d[_0x362df8(0x505)](this[_0x362df8(0x1e6)]['repeats']);},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x268)]=function(_0x2a0668,_0x23e2a4,_0x2c51e9){const _0xb6902c=_0x166c6b,_0x81497c=this[_0xb6902c(0x3bb)]();this['drawItemKeyData'](_0x81497c,_0x2a0668,_0x23e2a4,_0x2c51e9,!![]);const _0x2d9a64=this['getItemHitTypeText']();return this[_0xb6902c(0x3af)](_0x2d9a64,_0x2a0668,_0x23e2a4,_0x2c51e9,![],_0xb6902c(0x2f8)),this[_0xb6902c(0x1d4)](_0x2a0668,_0x23e2a4,_0x2c51e9),this[_0xb6902c(0x1d1)](),!![];},Window_ShopStatus['prototype'][_0x166c6b(0x3bb)]=function(){const _0x40a710=_0x166c6b;return VisuMZ[_0x40a710(0x435)]['Settings'][_0x40a710(0x247)][_0x40a710(0x3f7)];},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x484)]=function(){const _0x41f286=_0x166c6b,_0xcff05d=_0x41f286(0x321);if(this[_0x41f286(0x478)][_0xcff05d])return this[_0x41f286(0x478)][_0xcff05d];if(DataManager['isToggleSkill']&&DataManager['isToggleSkill'](this['_item']))return TextManager[_0x41f286(0x4d4)];const _0x3da2a1=VisuMZ[_0x41f286(0x435)][_0x41f286(0x43a)][_0x41f286(0x247)],_0xa83a6='HitType%1'['format'](this[_0x41f286(0x1e6)][_0x41f286(0x59b)]);return _0x3da2a1[_0xa83a6];},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x1da)]=function(_0x45f4a0,_0x21c701,_0xc8cf8f){const _0xdac04b=_0x166c6b;if(this['_item']['damage'][_0xdac04b(0x3b4)]<=0x0)return _0x21c701;if(this[_0xdac04b(0x1e2)](_0x45f4a0,_0x21c701,_0xc8cf8f))_0x21c701+=this['lineHeight']();if(this['drawItemDamageAmount'](_0x45f4a0,_0x21c701,_0xc8cf8f))_0x21c701+=this[_0xdac04b(0x334)]();return this[_0xdac04b(0x1d1)](),_0x21c701;},Window_ShopStatus[_0x166c6b(0x3f4)]['drawItemDamageElement']=function(_0x3bf339,_0x566f75,_0xff8cda){const _0x5ef2ce=_0x166c6b,_0x1bfeb3=this[_0x5ef2ce(0x3d3)]();this[_0x5ef2ce(0x3af)](_0x1bfeb3,_0x3bf339,_0x566f75,_0xff8cda,!![]);const _0x4c5af0=this[_0x5ef2ce(0x21f)]();return this['drawItemKeyData'](_0x4c5af0,_0x3bf339,_0x566f75,_0xff8cda,![],_0x5ef2ce(0x2f8)),this['drawItemDarkRect'](_0x3bf339,_0x566f75,_0xff8cda),this[_0x5ef2ce(0x1d1)](),!![];},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x3d3)]=function(){const _0x2c1815=_0x166c6b;return VisuMZ[_0x2c1815(0x435)][_0x2c1815(0x43a)][_0x2c1815(0x247)]['LabelElement'];},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x21f)]=function(){const _0x342c51=_0x166c6b,_0x5b4d86='ELEMENT';if(this[_0x342c51(0x478)][_0x5b4d86])return this['_customItemInfo'][_0x5b4d86];if(this[_0x342c51(0x1e6)][_0x342c51(0x283)][_0x342c51(0x4f4)]<=-0x1)return VisuMZ[_0x342c51(0x435)][_0x342c51(0x43a)]['StatusWindow'][_0x342c51(0x4ab)];else return this[_0x342c51(0x1e6)][_0x342c51(0x283)][_0x342c51(0x4f4)]===0x0?VisuMZ[_0x342c51(0x435)]['Settings'][_0x342c51(0x247)][_0x342c51(0x254)]:$dataSystem['elements'][this['_item'][_0x342c51(0x283)][_0x342c51(0x4f4)]];},Window_ShopStatus['prototype'][_0x166c6b(0x237)]=function(_0x540826,_0x1f7483,_0x49c812){const _0x1426e6=_0x166c6b,_0x40d3a4=this['getItemDamageAmountLabel']();this['drawItemKeyData'](_0x40d3a4,_0x540826,_0x1f7483,_0x49c812,!![]),this[_0x1426e6(0x2bf)]();const _0x263b19=this[_0x1426e6(0x59d)](),_0x8d4812=ColorManager[_0x1426e6(0x4d2)]([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this[_0x1426e6(0x1e6)][_0x1426e6(0x283)][_0x1426e6(0x3b4)]]);return this[_0x1426e6(0x434)](_0x8d4812),this[_0x1426e6(0x3af)](_0x263b19,_0x540826,_0x1f7483,_0x49c812,![],_0x1426e6(0x2f8)),this['drawItemDarkRect'](_0x540826,_0x1f7483,_0x49c812),this[_0x1426e6(0x1d1)](),!![];},Window_ShopStatus['prototype'][_0x166c6b(0x28e)]=function(){const _0x494b5f=_0x166c6b;return Imported['VisuMZ_1_BattleCore']&&DataManager['getDamageStyle'](this['_item'])!=='MANUAL'?this[_0x494b5f(0x333)]():this[_0x494b5f(0x2a5)]();},Window_ShopStatus['prototype'][_0x166c6b(0x2a5)]=function(){const _0x32228a=_0x166c6b,_0x1a356b=VisuMZ['ItemsEquipsCore'][_0x32228a(0x43a)][_0x32228a(0x247)],_0x3666d9=_0x32228a(0x30b)[_0x32228a(0x505)](this[_0x32228a(0x1e6)][_0x32228a(0x283)][_0x32228a(0x3b4)]),_0x570651=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this[_0x32228a(0x1e6)]['damage'][_0x32228a(0x3b4)]];return _0x1a356b[_0x3666d9][_0x32228a(0x505)](_0x570651);},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x2bf)]=function(){const _0x2d78e2=_0x166c6b,_0x3b9b27=$gameActors['actor'](0x1);this[_0x2d78e2(0x3ad)]=JsonEx['makeDeepCopy'](_0x3b9b27),this[_0x2d78e2(0x19f)]=JsonEx['makeDeepCopy'](_0x3b9b27);},Window_ShopStatus['prototype'][_0x166c6b(0x59d)]=function(){const _0x6c18ea=_0x166c6b,_0x1908c5=_0x6c18ea(0x35c);if(this['_customItemInfo'][_0x1908c5])return this['_customItemInfo'][_0x1908c5];return Imported[_0x6c18ea(0x3ec)]&&DataManager[_0x6c18ea(0x2a3)](this['_item'])!==_0x6c18ea(0x45b)?this['getItemDamageAmountTextBattleCore']():this[_0x6c18ea(0x396)]();},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x396)]=function(){const _0x14c603=_0x166c6b;window['a']=this[_0x14c603(0x3ad)],window['b']=this[_0x14c603(0x19f)],this[_0x14c603(0x3ad)][_0x14c603(0x462)](!![]),this[_0x14c603(0x19f)]['setShopStatusWindowMode']([0x3,0x4]['includes'](this[_0x14c603(0x1e6)][_0x14c603(0x283)][_0x14c603(0x3b4)]));let _0x1fe5fb=this[_0x14c603(0x1e6)]['damage'][_0x14c603(0x195)];try{const _0x317cfb=Math['max'](eval(_0x1fe5fb),0x0)/window['a'][_0x14c603(0x43c)];return this[_0x14c603(0x4db)](),isNaN(_0x317cfb)?'?????':_0x14c603(0x1cc)['format'](Math['round'](_0x317cfb*0x64));}catch(_0x5c56ce){return $gameTemp[_0x14c603(0x3ee)]()&&(console['log'](_0x14c603(0x515)['format'](this[_0x14c603(0x1e6)]['name'])),console[_0x14c603(0x1e7)](_0x5c56ce)),this[_0x14c603(0x4db)](),_0x14c603(0x374);}},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x4db)]=function(){window['a']=undefined,window['b']=undefined;},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x308)]=function(_0x14d0d7,_0x2a1e60,_0x5720b1){const _0x4c86aa=_0x166c6b;if(!this[_0x4c86aa(0x342)]())return _0x2a1e60;if(this[_0x4c86aa(0x249)](_0x14d0d7,_0x2a1e60,_0x5720b1))_0x2a1e60+=this[_0x4c86aa(0x334)]();if(this['drawItemEffectsMpRecovery'](_0x14d0d7,_0x2a1e60,_0x5720b1))_0x2a1e60+=this['lineHeight']();if(this['drawItemEffectsTpRecovery'](_0x14d0d7,_0x2a1e60,_0x5720b1))_0x2a1e60+=this[_0x4c86aa(0x334)]();if(this[_0x4c86aa(0x16a)](_0x14d0d7,_0x2a1e60,_0x5720b1))_0x2a1e60+=this[_0x4c86aa(0x334)]();if(this[_0x4c86aa(0x3a7)](_0x14d0d7,_0x2a1e60,_0x5720b1))_0x2a1e60+=this[_0x4c86aa(0x334)]();if(this[_0x4c86aa(0x441)](_0x14d0d7,_0x2a1e60,_0x5720b1))_0x2a1e60+=this[_0x4c86aa(0x334)]();if(this[_0x4c86aa(0x329)](_0x14d0d7,_0x2a1e60,_0x5720b1))_0x2a1e60+=this[_0x4c86aa(0x334)]();if(this[_0x4c86aa(0x3e1)](_0x14d0d7,_0x2a1e60,_0x5720b1))_0x2a1e60+=this[_0x4c86aa(0x334)]();if(this[_0x4c86aa(0x487)](_0x14d0d7,_0x2a1e60,_0x5720b1))_0x2a1e60+=this[_0x4c86aa(0x334)]();return this[_0x4c86aa(0x1d1)](),_0x2a1e60;},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x51e)]=function(){return this['_item']['effects'];},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x342)]=function(){const _0x47eb68=_0x166c6b;let _0x22f42e=![];this[_0x47eb68(0x2c1)]={'rateHP':0x0,'flatHP':0x0,'rateMP':0x0,'flatMP':0x0,'gainTP':0x0,'selfTP':0x0,'addState':[],'removeState':[],'changeBuff':[0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0],'removeBuff':[],'removeDebuff':[],'addStateBuffChanges':![],'removeStateBuffChanges':![]};const _0x31eb0e=this[_0x47eb68(0x51e)]();for(const _0x1d03b1 of _0x31eb0e){switch(_0x1d03b1[_0x47eb68(0x3bc)]){case Game_Action['EFFECT_RECOVER_HP']:this[_0x47eb68(0x2c1)][_0x47eb68(0x1e0)]+=_0x1d03b1[_0x47eb68(0x22b)],this[_0x47eb68(0x2c1)][_0x47eb68(0x4bf)]+=_0x1d03b1[_0x47eb68(0x41d)],_0x22f42e=!![];break;case Game_Action[_0x47eb68(0x4be)]:this[_0x47eb68(0x2c1)][_0x47eb68(0x2ad)]+=_0x1d03b1['value1'],this[_0x47eb68(0x2c1)][_0x47eb68(0x385)]+=_0x1d03b1[_0x47eb68(0x41d)],_0x22f42e=!![];break;case Game_Action['EFFECT_GAIN_TP']:this[_0x47eb68(0x2c1)][_0x47eb68(0x38b)]+=_0x1d03b1[_0x47eb68(0x22b)],_0x22f42e=!![];break;case Game_Action['EFFECT_ADD_STATE']:this['_itemData'][_0x47eb68(0x398)][_0x47eb68(0x1c9)](_0x1d03b1[_0x47eb68(0x42f)]),_0x22f42e=!![];break;case Game_Action[_0x47eb68(0x417)]:this[_0x47eb68(0x2c1)][_0x47eb68(0x413)][_0x47eb68(0x1c9)](_0x1d03b1['dataId']),this['_itemData'][_0x47eb68(0x4ba)]=!![],_0x22f42e=!![];break;case Game_Action[_0x47eb68(0x3ef)]:this[_0x47eb68(0x2c1)]['changeBuff'][_0x1d03b1[_0x47eb68(0x42f)]]+=0x1,_0x22f42e=!![];break;case Game_Action['EFFECT_ADD_DEBUFF']:this[_0x47eb68(0x2c1)][_0x47eb68(0x463)][_0x1d03b1[_0x47eb68(0x42f)]]-=0x1,_0x22f42e=!![];break;case Game_Action[_0x47eb68(0x526)]:this[_0x47eb68(0x2c1)][_0x47eb68(0x15f)]['push'](_0x1d03b1[_0x47eb68(0x42f)]),this[_0x47eb68(0x2c1)]['removeStateBuffChanges']=!![],_0x22f42e=!![];break;case Game_Action[_0x47eb68(0x196)]:this[_0x47eb68(0x2c1)][_0x47eb68(0x2d6)][_0x47eb68(0x1c9)](_0x1d03b1[_0x47eb68(0x42f)]),this[_0x47eb68(0x2c1)][_0x47eb68(0x4ba)]=!![],_0x22f42e=!![];break;}}if(this[_0x47eb68(0x2c1)][_0x47eb68(0x398)][_0x47eb68(0x514)]>0x0)this[_0x47eb68(0x2c1)][_0x47eb68(0x3c9)]=!![];for(let _0x84134c=0x0;_0x84134c<this['_itemData']['changeBuff'][_0x47eb68(0x514)];_0x84134c++){if(this['_itemData'][_0x47eb68(0x463)][_0x84134c]!==0x0)this['_itemData']['addStateBuffChanges']=!![];}this[_0x47eb68(0x1e6)][_0x47eb68(0x4a3)]!==0x0&&(this[_0x47eb68(0x2c1)]['selfTP']=this['_item'][_0x47eb68(0x4a3)],_0x22f42e=!![]);const _0x301e90=[_0x47eb68(0x483),_0x47eb68(0x55d),'TP\x20RECOVERY',_0x47eb68(0x250),'MP\x20DAMAGE',_0x47eb68(0x24b),'USER\x20TP\x20GAIN',_0x47eb68(0x4fb),_0x47eb68(0x48d)];for(const _0x32784e of _0x301e90){if(this[_0x47eb68(0x478)][_0x32784e]){_0x22f42e=!![];break;}}return _0x22f42e;},Window_ShopStatus[_0x166c6b(0x3f4)]['drawItemEffectsHpRecovery']=function(_0x9a5572,_0x1d7a5a,_0x575a01){const _0x4cdabd=_0x166c6b,_0x584819=_0x4cdabd(0x483);if(this['_itemData']['rateHP']<=0x0&&this[_0x4cdabd(0x2c1)][_0x4cdabd(0x4bf)]<=0x0&&!this[_0x4cdabd(0x478)][_0x584819])return![];const _0x5ef73a=this[_0x4cdabd(0x1ac)]();this[_0x4cdabd(0x3af)](_0x5ef73a,_0x9a5572,_0x1d7a5a,_0x575a01,!![]);const _0x39da99=this['getItemEffectsHpRecoveryText']();return this['changeTextColor'](ColorManager[_0x4cdabd(0x4d2)](0x1)),this[_0x4cdabd(0x3af)](_0x39da99,_0x9a5572,_0x1d7a5a,_0x575a01,![],_0x4cdabd(0x2f8)),this[_0x4cdabd(0x1d4)](_0x9a5572,_0x1d7a5a,_0x575a01),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x1ac)]=function(){const _0x35b1c1=_0x166c6b,_0x3f47e9=VisuMZ[_0x35b1c1(0x435)][_0x35b1c1(0x43a)][_0x35b1c1(0x247)]['LabelRecoverHP'];return _0x3f47e9[_0x35b1c1(0x505)](TextManager['hp']);},Window_ShopStatus['prototype'][_0x166c6b(0x239)]=function(){const _0x3baf05=_0x166c6b,_0xdab4f2=_0x3baf05(0x483);if(this[_0x3baf05(0x478)][_0xdab4f2])return this[_0x3baf05(0x478)][_0xdab4f2];let _0x42a734='';if(this[_0x3baf05(0x2c1)][_0x3baf05(0x1e0)]>0x0)_0x42a734+=_0x3baf05(0x27a)[_0x3baf05(0x505)](Math['floor'](this[_0x3baf05(0x2c1)][_0x3baf05(0x1e0)]*0x64));if(this[_0x3baf05(0x2c1)][_0x3baf05(0x1e0)]>0x0&&this[_0x3baf05(0x2c1)][_0x3baf05(0x4bf)]>0x0)_0x42a734+='\x20';if(this[_0x3baf05(0x2c1)][_0x3baf05(0x4bf)]>0x0)_0x42a734+=_0x3baf05(0x213)[_0x3baf05(0x505)](this[_0x3baf05(0x2c1)]['flatHP']);return _0x42a734;},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x419)]=function(_0x13b49b,_0x207347,_0x5d3916){const _0xc47d08=_0x166c6b,_0xd42a81=_0xc47d08(0x55d);if(this[_0xc47d08(0x2c1)][_0xc47d08(0x2ad)]<=0x0&&this[_0xc47d08(0x2c1)]['flatMP']<=0x0&&!this[_0xc47d08(0x478)][_0xd42a81])return![];const _0x2d2e78=this[_0xc47d08(0x164)]();this[_0xc47d08(0x3af)](_0x2d2e78,_0x13b49b,_0x207347,_0x5d3916,!![]);const _0x3668f9=this[_0xc47d08(0x206)]();return this['changeTextColor'](ColorManager[_0xc47d08(0x4d2)](0x3)),this[_0xc47d08(0x3af)](_0x3668f9,_0x13b49b,_0x207347,_0x5d3916,![],'right'),this['drawItemDarkRect'](_0x13b49b,_0x207347,_0x5d3916),this[_0xc47d08(0x1d1)](),!![];},Window_ShopStatus['prototype'][_0x166c6b(0x164)]=function(){const _0x4fab92=_0x166c6b,_0x4a1777=VisuMZ[_0x4fab92(0x435)][_0x4fab92(0x43a)][_0x4fab92(0x247)]['LabelRecoverMP'];return _0x4a1777[_0x4fab92(0x505)](TextManager['mp']);},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x206)]=function(){const _0x3a58f6=_0x166c6b,_0x510390=_0x3a58f6(0x55d);if(this[_0x3a58f6(0x478)][_0x510390])return this['_customItemInfo'][_0x510390];let _0x5d403a='';if(this[_0x3a58f6(0x2c1)][_0x3a58f6(0x2ad)]>0x0)_0x5d403a+=_0x3a58f6(0x27a)[_0x3a58f6(0x505)](Math['floor'](this[_0x3a58f6(0x2c1)][_0x3a58f6(0x2ad)]*0x64));if(this['_itemData'][_0x3a58f6(0x2ad)]>0x0&&this[_0x3a58f6(0x2c1)][_0x3a58f6(0x385)]>0x0)_0x5d403a+='\x20';if(this['_itemData']['flatMP']>0x0)_0x5d403a+=_0x3a58f6(0x213)['format'](this[_0x3a58f6(0x2c1)][_0x3a58f6(0x385)]);return _0x5d403a;},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x444)]=function(_0x4acecc,_0x47e1a1,_0xbac3bc){const _0x36f9d9=_0x166c6b,_0x22487c=_0x36f9d9(0x36a);if(this[_0x36f9d9(0x2c1)][_0x36f9d9(0x38b)]<=0x0&&!this[_0x36f9d9(0x478)][_0x22487c])return![];const _0x2e9ae2=this['getItemEffectsTpRecoveryLabel']();this[_0x36f9d9(0x3af)](_0x2e9ae2,_0x4acecc,_0x47e1a1,_0xbac3bc,!![]);const _0x39b273=this[_0x36f9d9(0x49a)]();return this['changeTextColor'](ColorManager[_0x36f9d9(0x21a)]()),this[_0x36f9d9(0x3af)](_0x39b273,_0x4acecc,_0x47e1a1,_0xbac3bc,![],_0x36f9d9(0x2f8)),this[_0x36f9d9(0x1d4)](_0x4acecc,_0x47e1a1,_0xbac3bc),this[_0x36f9d9(0x1d1)](),!![];},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x263)]=function(){const _0x6d5475=_0x166c6b,_0x58f3c9=VisuMZ['ItemsEquipsCore']['Settings'][_0x6d5475(0x247)][_0x6d5475(0x1bd)];return _0x58f3c9[_0x6d5475(0x505)](TextManager['tp']);},Window_ShopStatus[_0x166c6b(0x3f4)]['getItemEffectsTpRecoveryText']=function(){const _0x24ce0a=_0x166c6b,_0xb85cae=_0x24ce0a(0x36a);if(this['_customItemInfo'][_0xb85cae])return this[_0x24ce0a(0x478)][_0xb85cae];let _0x205186='';return _0x205186+=_0x24ce0a(0x213)[_0x24ce0a(0x505)](this[_0x24ce0a(0x2c1)][_0x24ce0a(0x38b)]),_0x205186;},Window_ShopStatus[_0x166c6b(0x3f4)]['drawItemEffectsSelfTpGain']=function(_0x3e3f63,_0x42f58f,_0x422669){const _0x33eed1=_0x166c6b,_0x1e5123=_0x33eed1(0x18e);if(this[_0x33eed1(0x2c1)][_0x33eed1(0x48f)]===0x0&&!this[_0x33eed1(0x478)][_0x1e5123])return![];const _0x564b4e=this['getItemEffectsSelfTpGainLabel']();this[_0x33eed1(0x3af)](_0x564b4e,_0x3e3f63,_0x42f58f,_0x422669,!![]);const _0x284bdb=this['getItemEffectsSelfTpGainText']();return this[_0x33eed1(0x2c1)][_0x33eed1(0x48f)]>0x0?this[_0x33eed1(0x434)](ColorManager['powerUpColor']()):this['changeTextColor'](ColorManager[_0x33eed1(0x575)]()),this[_0x33eed1(0x3af)](_0x284bdb,_0x3e3f63,_0x42f58f,_0x422669,![],_0x33eed1(0x2f8)),this[_0x33eed1(0x1d4)](_0x3e3f63,_0x42f58f,_0x422669),this[_0x33eed1(0x1d1)](),!![];},Window_ShopStatus[_0x166c6b(0x3f4)]['getItemEffectsSelfTpGainLabel']=function(){const _0x3bb682=_0x166c6b,_0x5caa8b=VisuMZ[_0x3bb682(0x435)][_0x3bb682(0x43a)][_0x3bb682(0x247)][_0x3bb682(0x310)];return _0x5caa8b[_0x3bb682(0x505)](TextManager['tp']);},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x589)]=function(){const _0x39848f=_0x166c6b,_0x537c8a=_0x39848f(0x18e);if(this[_0x39848f(0x478)][_0x537c8a])return this[_0x39848f(0x478)][_0x537c8a];let _0x47ac2b='';return this['_itemData']['selfTP']>0x0?_0x47ac2b+='+%1'[_0x39848f(0x505)](this[_0x39848f(0x2c1)][_0x39848f(0x48f)]):_0x47ac2b+='%1'[_0x39848f(0x505)](this[_0x39848f(0x2c1)][_0x39848f(0x48f)]),_0x47ac2b;},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x16a)]=function(_0x1720d4,_0x20cb77,_0xaddd4e){const _0x58258c=_0x166c6b,_0x48d168=_0x58258c(0x250);if(this[_0x58258c(0x2c1)][_0x58258c(0x1e0)]>=0x0&&this['_itemData'][_0x58258c(0x4bf)]>=0x0&&!this[_0x58258c(0x478)][_0x48d168])return![];const _0x122b44=this[_0x58258c(0x4c9)]();this[_0x58258c(0x3af)](_0x122b44,_0x1720d4,_0x20cb77,_0xaddd4e,!![]);const _0x886df6=this[_0x58258c(0x222)]();return this[_0x58258c(0x434)](ColorManager[_0x58258c(0x4d2)](0x0)),this[_0x58258c(0x3af)](_0x886df6,_0x1720d4,_0x20cb77,_0xaddd4e,![],_0x58258c(0x2f8)),this[_0x58258c(0x1d4)](_0x1720d4,_0x20cb77,_0xaddd4e),this[_0x58258c(0x1d1)](),!![];},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x4c9)]=function(){const _0x5e57f8=_0x166c6b,_0x1cf619=VisuMZ[_0x5e57f8(0x435)]['Settings'][_0x5e57f8(0x247)]['LabelDamageHP'];return _0x1cf619[_0x5e57f8(0x505)](TextManager['hp']);},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x222)]=function(){const _0x3c9e1c=_0x166c6b,_0x65f30a=_0x3c9e1c(0x250);if(this[_0x3c9e1c(0x478)][_0x65f30a])return this[_0x3c9e1c(0x478)][_0x65f30a];let _0x289282='';if(this['_itemData'][_0x3c9e1c(0x1e0)]<0x0)_0x289282+=_0x3c9e1c(0x1cc)[_0x3c9e1c(0x505)](Math['floor'](this['_itemData'][_0x3c9e1c(0x1e0)]*0x64));if(this[_0x3c9e1c(0x2c1)][_0x3c9e1c(0x1e0)]<0x0&&this['_itemData'][_0x3c9e1c(0x4bf)]<0x0)_0x289282+='\x20';if(this[_0x3c9e1c(0x2c1)]['flatHP']<0x0)_0x289282+='%1'[_0x3c9e1c(0x505)](this[_0x3c9e1c(0x2c1)][_0x3c9e1c(0x4bf)]);return _0x289282;},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x3a7)]=function(_0x3eedb5,_0xf7f260,_0x108ece){const _0x4984c5=_0x166c6b,_0x3ba049=_0x4984c5(0x316);if(this[_0x4984c5(0x2c1)]['rateMP']>=0x0&&this[_0x4984c5(0x2c1)][_0x4984c5(0x385)]>=0x0&&!this[_0x4984c5(0x478)][_0x3ba049])return![];const _0xdc93f9=this[_0x4984c5(0x2e7)]();this[_0x4984c5(0x3af)](_0xdc93f9,_0x3eedb5,_0xf7f260,_0x108ece,!![]);const _0x134bd9=this[_0x4984c5(0x327)]();return this[_0x4984c5(0x434)](ColorManager['damageColor'](0x2)),this['drawItemKeyData'](_0x134bd9,_0x3eedb5,_0xf7f260,_0x108ece,![],'right'),this[_0x4984c5(0x1d4)](_0x3eedb5,_0xf7f260,_0x108ece),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype'][_0x166c6b(0x2e7)]=function(){const _0x5394de=_0x166c6b,_0x3de1ae=VisuMZ[_0x5394de(0x435)][_0x5394de(0x43a)]['StatusWindow'][_0x5394de(0x373)];return _0x3de1ae[_0x5394de(0x505)](TextManager['mp']);},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x327)]=function(){const _0x175bc5=_0x166c6b,_0x254de3=_0x175bc5(0x316);if(this[_0x175bc5(0x478)][_0x254de3])return this[_0x175bc5(0x478)][_0x254de3];let _0x1758f5='';if(this[_0x175bc5(0x2c1)][_0x175bc5(0x2ad)]<0x0)_0x1758f5+=_0x175bc5(0x1cc)[_0x175bc5(0x505)](Math[_0x175bc5(0x523)](this[_0x175bc5(0x2c1)][_0x175bc5(0x2ad)]*0x64));if(this[_0x175bc5(0x2c1)][_0x175bc5(0x2ad)]<0x0&&this['_itemData']['flatMP']<0x0)_0x1758f5+='\x20';if(this[_0x175bc5(0x2c1)][_0x175bc5(0x385)]<0x0)_0x1758f5+='%1'[_0x175bc5(0x505)](this[_0x175bc5(0x2c1)][_0x175bc5(0x385)]);return _0x1758f5;},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x441)]=function(_0x12ce64,_0x1cda26,_0x1e75f6){const _0x4b1f35=_0x166c6b,_0x528998='TP\x20DAMAGE';if(this[_0x4b1f35(0x2c1)][_0x4b1f35(0x38b)]>=0x0&&!this[_0x4b1f35(0x478)][_0x528998])return![];const _0x4cd05d=this['getItemEffectsTpDamageLabel']();this[_0x4b1f35(0x3af)](_0x4cd05d,_0x12ce64,_0x1cda26,_0x1e75f6,!![]);const _0x33db33=this[_0x4b1f35(0x336)]();return this[_0x4b1f35(0x434)](ColorManager['powerDownColor']()),this[_0x4b1f35(0x3af)](_0x33db33,_0x12ce64,_0x1cda26,_0x1e75f6,![],_0x4b1f35(0x2f8)),this[_0x4b1f35(0x1d4)](_0x12ce64,_0x1cda26,_0x1e75f6),this[_0x4b1f35(0x1d1)](),!![];},Window_ShopStatus['prototype'][_0x166c6b(0x42a)]=function(){const _0x2dab14=_0x166c6b,_0x53cae5=VisuMZ['ItemsEquipsCore'][_0x2dab14(0x43a)]['StatusWindow']['LabelDamageTP'];return _0x53cae5[_0x2dab14(0x505)](TextManager['tp']);},Window_ShopStatus[_0x166c6b(0x3f4)]['getItemEffectsTpDamageText']=function(){const _0x2d62ce=_0x166c6b,_0xd08427=_0x2d62ce(0x24b);if(this[_0x2d62ce(0x478)][_0xd08427])return this['_customItemInfo'][_0xd08427];let _0x409c9f='';return _0x409c9f+='%1'['format'](this[_0x2d62ce(0x2c1)][_0x2d62ce(0x38b)]),_0x409c9f;},Window_ShopStatus['prototype']['drawItemEffectsAddedStatesBuffs']=function(_0x5d2d10,_0x5ab3ca,_0x378854){const _0xf235df=_0x166c6b,_0x1dc69c=_0xf235df(0x4fb);if(!this['_itemData'][_0xf235df(0x3c9)]&&!this[_0xf235df(0x478)][_0x1dc69c])return![];const _0x289c15=this['getItemEffectsAddedStatesBuffsText']();if(_0x289c15[_0xf235df(0x514)]<=0x0)return![];const _0x3b1b2a=this['getItemEffectsAddedStatesBuffsLabel']();return this[_0xf235df(0x3af)](_0x3b1b2a,_0x5d2d10,_0x5ab3ca,_0x378854,!![]),this[_0xf235df(0x3af)](_0x289c15,_0x5d2d10,_0x5ab3ca,_0x378854,![],_0xf235df(0x2f8)),this[_0xf235df(0x1d4)](_0x5d2d10,_0x5ab3ca,_0x378854),this[_0xf235df(0x1d1)](),!![];},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x3cd)]=function(){const _0x477cce=_0x166c6b;return VisuMZ[_0x477cce(0x435)][_0x477cce(0x43a)][_0x477cce(0x247)][_0x477cce(0x43d)];},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x187)]=function(){const _0x2d6894=_0x166c6b,_0x493bd9=_0x2d6894(0x4fb);if(this[_0x2d6894(0x478)][_0x493bd9])return this[_0x2d6894(0x478)][_0x493bd9];let _0x3727c4='',_0x5ea7b2=0x0;const _0x2a8f15=0x8;for(const _0x3ba5cd of this['_itemData'][_0x2d6894(0x398)]){const _0x55246c=$dataStates[_0x3ba5cd];if(_0x55246c&&_0x55246c[_0x2d6894(0x15d)]>0x0){_0x3727c4+=_0x2d6894(0x4b6)[_0x2d6894(0x505)](_0x55246c[_0x2d6894(0x15d)]),_0x5ea7b2++;if(_0x5ea7b2>=_0x2a8f15)return _0x3727c4;}}for(let _0x446682=0x0;_0x446682<this['_itemData'][_0x2d6894(0x463)][_0x2d6894(0x514)];_0x446682++){const _0x5acfe8=this[_0x2d6894(0x2c1)][_0x2d6894(0x463)][_0x446682],_0xb8f0ef=Game_BattlerBase[_0x2d6894(0x3f4)][_0x2d6894(0x22e)](_0x5acfe8,_0x446682);if(_0xb8f0ef>0x0){_0x3727c4+='\x5cI[%1]'[_0x2d6894(0x505)](_0xb8f0ef),_0x5ea7b2++;if(_0x5ea7b2>=_0x2a8f15)return _0x3727c4;}}return _0x3727c4;},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x487)]=function(_0x5a8d13,_0x3429af,_0x35b7ca){const _0x470139=_0x166c6b,_0x57d2c5=_0x470139(0x48d);if(!this[_0x470139(0x2c1)]['removeStateBuffChanges']&&!this['_customItemInfo'][_0x57d2c5])return![];const _0x5d2397=this['getItemEffectsRemovedStatesBuffsLabel']();this[_0x470139(0x3af)](_0x5d2397,_0x5a8d13,_0x3429af,_0x35b7ca,!![]);const _0xc64b48=this[_0x470139(0x1d9)]();return this[_0x470139(0x3af)](_0xc64b48,_0x5a8d13,_0x3429af,_0x35b7ca,![],_0x470139(0x2f8)),this['drawItemDarkRect'](_0x5a8d13,_0x3429af,_0x35b7ca),this[_0x470139(0x1d1)](),!![];},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x2d8)]=function(){const _0x5de965=_0x166c6b;return VisuMZ['ItemsEquipsCore']['Settings'][_0x5de965(0x247)][_0x5de965(0x22c)];},Window_ShopStatus['prototype']['getItemEffectsRemovedStatesBuffsText']=function(){const _0x5e4809=_0x166c6b,_0x114e51=_0x5e4809(0x48d);if(this[_0x5e4809(0x478)][_0x114e51])return this[_0x5e4809(0x478)][_0x114e51];let _0x4b0647='',_0x241225=0x0;const _0x157ec9=VisuMZ[_0x5e4809(0x435)]['Settings'][_0x5e4809(0x247)][_0x5e4809(0x42c)];for(const _0x102142 of this['_itemData']['removeState']){const _0xd17b8b=$dataStates[_0x102142];if(_0xd17b8b&&_0xd17b8b[_0x5e4809(0x15d)]>0x0){_0x4b0647+='\x5cI[%1]'[_0x5e4809(0x505)](_0xd17b8b['iconIndex']),_0x241225++;if(_0x241225>=_0x157ec9)return _0x4b0647;}}for(let _0x124af0=0x0;_0x124af0<this[_0x5e4809(0x2c1)][_0x5e4809(0x15f)]['length'];_0x124af0++){const _0x51d3dc=this[_0x5e4809(0x2c1)]['removeBuff'][_0x124af0],_0xcaaa33=Game_BattlerBase[_0x5e4809(0x3f4)]['buffIconIndex'](0x1,_0x51d3dc);if(_0xcaaa33>0x0){_0x4b0647+=_0x5e4809(0x4b6)[_0x5e4809(0x505)](_0xcaaa33),_0x241225++;if(_0x241225>=_0x157ec9)return _0x4b0647;}}for(let _0x1bdcf3=0x0;_0x1bdcf3<this[_0x5e4809(0x2c1)][_0x5e4809(0x2d6)]['length'];_0x1bdcf3++){const _0x4387ff=this['_itemData'][_0x5e4809(0x2d6)][_0x1bdcf3],_0x736426=Game_BattlerBase[_0x5e4809(0x3f4)][_0x5e4809(0x22e)](-0x1,_0x4387ff);if(_0x736426>0x0){_0x4b0647+=_0x5e4809(0x4b6)['format'](_0x736426),_0x241225++;if(_0x241225>=_0x157ec9)return _0x4b0647;}}return _0x4b0647;},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x4e4)]=function(_0x271799,_0x1e0cc0,_0x237aa7){const _0x25cff7=_0x166c6b;if(this[_0x25cff7(0x1e6)]['note'][_0x25cff7(0x346)](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){const _0x35e52d=String(RegExp['$1'])[_0x25cff7(0x3c7)](/[\r\n]+/);for(const _0x5465ee of _0x35e52d){if(_0x5465ee[_0x25cff7(0x346)](/(.*):[ ](.*)/i)){const _0x44ab90=String(RegExp['$1'])[_0x25cff7(0x507)](),_0x2986c7=String(RegExp['$2'])[_0x25cff7(0x507)]();this[_0x25cff7(0x291)](_0x44ab90,_0x2986c7,_0x271799,_0x1e0cc0,_0x237aa7),_0x1e0cc0+=this[_0x25cff7(0x334)]();}}}return this[_0x25cff7(0x1d1)](),_0x1e0cc0;},Window_ShopStatus[_0x166c6b(0x3f4)][_0x166c6b(0x291)]=function(_0x15d121,_0x274f33,_0x52dc1c,_0x1612ca,_0x490618){const _0x1b5ec8=_0x166c6b;this[_0x1b5ec8(0x3af)](_0x15d121,_0x52dc1c,_0x1612ca,_0x490618,!![]),this[_0x1b5ec8(0x3af)](_0x274f33,_0x52dc1c,_0x1612ca,_0x490618,![],_0x1b5ec8(0x2f8)),this[_0x1b5ec8(0x1d4)](_0x52dc1c,_0x1612ca,_0x490618),this[_0x1b5ec8(0x1d1)]();},Window_ShopStatus['prototype'][_0x166c6b(0x55c)]=function(){const _0xc4816f=_0x166c6b;if(!this['_item'])return;const _0x10ebc4=this['_item'][_0xc4816f(0x1a6)],_0x3f1896=/<SHOP (?:PICTURE|IMAGE|PICTURE NAME|PICTURE FILENAME|IMAGE NAME|IMAGE FILENAME):[ ](.*)>/gi,_0x283b6b=_0x10ebc4[_0xc4816f(0x346)](_0x3f1896);if(_0x283b6b)for(const _0x21b315 of _0x283b6b){_0x21b315[_0xc4816f(0x346)](_0x3f1896);const _0x172be0=String(RegExp['$1'])[_0xc4816f(0x507)]()||'';if(_0x172be0==='')continue;const _0x102bbb=ImageManager['loadPicture'](_0x172be0);_0x102bbb[_0xc4816f(0x3e8)](this[_0xc4816f(0x594)][_0xc4816f(0x343)](this,_0x102bbb,this[_0xc4816f(0x1e6)]));}},Window_ShopStatus['prototype'][_0x166c6b(0x594)]=function(_0x2e9080,_0x43f8dc){const _0x42e9f7=_0x166c6b;if(this[_0x42e9f7(0x1e6)]!==_0x43f8dc)return;if(!_0x2e9080)return;if(_0x2e9080[_0x42e9f7(0x3aa)]<=0x0||_0x2e9080[_0x42e9f7(0x459)]<=0x0)return;const _0x17e07c=_0x43f8dc[_0x42e9f7(0x1a6)];let _0x46dc35='background';_0x17e07c[_0x42e9f7(0x346)](/<SHOP (?:PICTURE|IMAGE) LAYER:[ ]FOREGROUND>/i)&&(_0x46dc35=_0x42e9f7(0x169));const _0x134f1f=_0x46dc35===_0x42e9f7(0x3bf)?this[_0x42e9f7(0x570)]:this[_0x42e9f7(0x20e)];let _0x5c0416=this[_0x42e9f7(0x20c)],_0x1d86db=this[_0x42e9f7(0x181)];_0x17e07c[_0x42e9f7(0x346)](/<SHOP (?:PICTURE|IMAGE) MAX WIDTH:[ ](\d+)>/i)&&(_0x5c0416=Number(RegExp['$1']));_0x17e07c[_0x42e9f7(0x346)](/<SHOP (?:PICTURE|IMAGE) MAX HEIGHT:[ ](\d+)>/i)&&(_0x1d86db=Number(RegExp['$1']));_0x17e07c[_0x42e9f7(0x346)](/<SHOP (?:PICTURE|IMAGE) MAX DIMENSIONS:[ ](\d+),[ ]*(\d+)>/i)&&(_0x5c0416=Number(RegExp['$1']),_0x1d86db=Number(RegExp['$2']));const _0x29f850=Math[_0x42e9f7(0x341)](0x1,_0x5c0416/_0x2e9080[_0x42e9f7(0x3aa)],_0x1d86db/_0x2e9080[_0x42e9f7(0x459)]);let _0x1c05c0=0x0,_0x385785=0x0,_0x3d87a0=Math[_0x42e9f7(0x523)](_0x2e9080['width']*_0x29f850),_0x3a363b=Math[_0x42e9f7(0x523)](_0x2e9080[_0x42e9f7(0x459)]*_0x29f850),_0x3003e2='center';_0x17e07c[_0x42e9f7(0x346)](/<SHOP (?:PICTURE|IMAGE) (?:ALIGN|ALIGNMENT):[ ](LEFT|CENTER|RIGHT)>/i)&&(_0x3003e2=String(RegExp['$1'])[_0x42e9f7(0x1cb)]()[_0x42e9f7(0x507)]());if(_0x3003e2===_0x42e9f7(0x27b))_0x1c05c0=0x0;else _0x3003e2===_0x42e9f7(0x35e)?_0x1c05c0=Math[_0x42e9f7(0x2eb)]((this['innerWidth']-_0x3d87a0)/0x2):_0x1c05c0=this['innerWidth']-_0x3d87a0;let _0x11283e=_0x42e9f7(0x1e3);_0x17e07c['match'](/<SHOP (?:PICTURE|IMAGE) POSITION:[ ](TOP|MIDDLE|BOTTOM)>/i)&&(_0x11283e=String(RegExp['$1'])[_0x42e9f7(0x1cb)]()[_0x42e9f7(0x507)]());if(_0x11283e===_0x42e9f7(0x2ae))_0x385785=0x0;else _0x11283e===_0x42e9f7(0x1e3)?_0x385785=Math[_0x42e9f7(0x2eb)]((this[_0x42e9f7(0x181)]-_0x3a363b)/0x2):_0x385785=this[_0x42e9f7(0x181)]-_0x3a363b;_0x17e07c[_0x42e9f7(0x346)](/<SHOP (?:PICTURE|IMAGE) OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0x1c05c0+=Number(RegExp['$1']));_0x17e07c['match'](/<SHOP (?:PICTURE|IMAGE) OFFSET Y:[ ]([\+\-]\d+)>/i)&&(_0x385785+=Number(RegExp['$1']));_0x17e07c[_0x42e9f7(0x346)](/<SHOP (?:PICTURE|IMAGE) OFFSET:[ ]([\+\-]\d+),[ ]*([\+\-]\d+)>/i)&&(_0x1c05c0+=Number(RegExp['$1']),_0x385785+=Number(RegExp['$2']));let _0xf9074e=0xff;if(_0x17e07c[_0x42e9f7(0x346)](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)>/i))_0xf9074e=Number(RegExp['$1']);else _0x17e07c[_0x42e9f7(0x346)](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)([%％])>/i)&&(_0xf9074e=Math[_0x42e9f7(0x2eb)](Number(RegExp['$1'])*0.01*0xff)[_0x42e9f7(0x1ce)](0x0,0xff));_0x134f1f[_0x42e9f7(0x274)]=_0xf9074e,_0x134f1f['blt'](_0x2e9080,0x0,0x0,_0x2e9080[_0x42e9f7(0x3aa)],_0x2e9080[_0x42e9f7(0x459)],_0x1c05c0,_0x385785,_0x3d87a0,_0x3a363b),_0x134f1f[_0x42e9f7(0x274)]=0xff;},VisuMZ[_0x166c6b(0x435)][_0x166c6b(0x366)]=function(_0x4df1e3){const _0x43fb0f=_0x166c6b;if(_0x4df1e3===null||typeof _0x4df1e3!==_0x43fb0f(0x50a))return _0x4df1e3;const _0x5c6d53=Array[_0x43fb0f(0x15e)](_0x4df1e3)?[]:Object['create'](Object[_0x43fb0f(0x353)](_0x4df1e3));for(const _0x4db599 in _0x4df1e3){Object[_0x43fb0f(0x3f4)][_0x43fb0f(0x529)][_0x43fb0f(0x2b5)](_0x4df1e3,_0x4db599)&&(_0x5c6d53[_0x4db599]=typeof _0x4df1e3[_0x4db599]===_0x43fb0f(0x50a)&&_0x4df1e3[_0x4db599]!==null?VisuMZ[_0x43fb0f(0x435)]['deepCopy'](_0x4df1e3[_0x4db599]):_0x4df1e3[_0x4db599]);}return _0x5c6d53;};