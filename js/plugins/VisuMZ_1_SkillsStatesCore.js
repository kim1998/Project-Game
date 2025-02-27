//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.49;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.49] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Action End Removal for States
 * 
 * - If your Plugin Parameter settings for "Action End Update" are enabled,
 * then "Action End" has been updated so that it actually applies per action
 * used instead of just being at the start of a battler's action set.
 * 
 * - However, there are side effects to this: if a state has the "Cannot Move"
 * restriction along with the "Action End" removal timing, then unsurprisingly,
 * the state will never wear off because it's now based on actual actions
 * ending. To offset this and remove confusion, "Action End" auto-removal
 * timings for states with "Cannot Move" restrictions will be turned into
 * "Turn End" auto-removal timings while the "Action End Update" is enabled.
 * 
 * - This automatic change won't make it behave like an "Action End" removal
 * timing would, but it's better than completely softlocking a battler.
 * 
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 * 
 * State Displays
 * 
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 * 
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 * 
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 * 
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
 * 
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
 *
 * ---
 *
 * ============================================================================
 * Slip Damage Popup Clarification
 * ============================================================================
 * 
 * Slip Damage popups only show one popup for HP, MP, and TP each and it is the
 * grand total of all the states and effects combined regardless of the number
 * of states and effects on a battler. This is how it is in vanilla RPG Maker
 * MZ and this is how we intend for it to be with the VisuStella MZ library.
 * 
 * This is NOT a bug!
 * 
 * The reason we are not changing this is because it does not properly relay
 * information to the player accurately. When multiple popups appear, players
 * only have roughly a second and a half to calculate it all for any form of
 * information takeaway. We feel it is better suited for the player's overall
 * convenience to show a cummulative change and steer the experience towards a
 * more positive one.
 *
 * ============================================================================
 * Passive State Clarification
 * ============================================================================
 * 
 * This section will explain various misconceptions regarding passive states.
 * No, passive states do not work the same way as states code-wise. Yes, they
 * use the same effects as states mechanically, but there are differences.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
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
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 * 
 * <List Name: name>
 * 
 * - Used for: Skill Notetags
 * - Makes the name of the skill appear different when show in the skill list.
 * - Using \V[x] as a part of the name will display that variable.
 * 
 * ---
 * 
 * <ID Sort Priority: x>
 * 
 * - Used for: Skill Notetags
 * - Used for Scene_Skill.
 * - Changes sorting priority by ID for skills to 'x'. 
 *   - Default priority level is '50'.
 * - Skills with higher priority values will be sorted higher up on the list
 *   while lower values will be lower on the list.
 * 
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will raise/lower the cost of any skill that uses the
 *   'type' cost by a specified amount.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a rate value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 *   - Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 * 
 * === Item Cost-Related Notetags ===
 * 
 * ---
 * 
 * <Item Cost: x name>
 * <Weapon Cost: x name>
 * <Armor Cost: x name>
 * 
 * - Used for: Skill Notetags
 * - The skill will consume items, weapons, and/or armors in order to be used.
 *   - Even non-consumable items will be consumed.
 * - Replace 'x' with a number representing the respective item cost.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * - Insert multiples of this notetag to consume multiple items, weapons,
 *   and/or armors.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 * 
 * Examples:
 * 
 *   <Item Cost: 5 Magic Water>
 *   <Item Cost: 2 Antidote>
 *   <Weapon Cost: 1 Short Sword>
 *   <Armor Cost: 3 Cloth Armor>
 * 
 * ---
 *
 * <Item Cost Max: x name>
 * <Item Cost Min: x name>
 *
 * <Weapon Cost Max: x name>
 * <Weapon Cost Min: x name>
 *
 * <Armor Cost Max: x name>
 * <Armor Cost Min: x name>
 * 
 * - Used for: Skill Notetags
 * - Sets up a maximum/minimum cost for the item, weapon, armor type costs.
 * - Replace 'x' with a number representing the maximum or minimum cost.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * 
 * Examples:
 * 
 *   <Item Cost Max: 10 Magic Water>
 *   <Item Cost Min: 2 Antidote>
 *   <Weapon Cost Max: 3 Short Sword>
 *   <Armor Cost Min: 1 Cloth Armor>
 * 
 * ---
 *
 * <Item Cost: +x name>
 * <Item Cost: -x name>
 *
 * <Weapon Cost: +x name>
 * <Weapon Cost: -x name>
 *
 * <Armor Cost: +x name>
 * <Armor Cost: -x name>
 * 
 * <Item Cost: x% name>
 * <Weapon Cost: x% name>
 * <Armor Cost: x% name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will raise/lower the item, weapon, and/or armor costs of
 *   any skill that costs those items, weapons, and/or armors by x%.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a rate value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * - Insert multiples of this notetag to consume multiple items, weapons,
 *   and/or armors.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 * 
 * Examples:
 * 
 *   <Item Cost: +1 Magic Water>
 *   <Item Cost: -2 Antidote>
 *   <Weapon Cost: 50% Short Sword>
 *   <Armor Cost: 200% Cloth Armor>
 * 
 * ---
 * 
 * <Replace Item name1 Cost: name2>
 * <Replace Weapon name1 Cost: name2>
 * <Replace Armor name1 Cost: name2>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will not consume 'name1' items, weapons, or armors.
 *   Instead, the cost will be redirected to 'name2' items, weapons, or armors.
 *   - Even non-consumable items will be consumed.
 * - Replace 'name1' with text representing the respective item, weapon, or
 *   armor that is the original cost type.
 * - Replace 'name2' with text representing the respective item, weapon, or
 *   armor that will be consumed instead.
 * 
 * Examples:
 * 
 *   <Replace Item Magic Water Cost: Potion>
 *   <Replace Item Antidote Cost: Dispel Herb>
 *   <Replace Weapon Short Sword Cost: Falchion>
 *   <Replace Armor Cloth Armor Cost: Leather Armor>
 * 
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 * - This allows this state to be added to an already dead battler, too.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 * 
 * <Bypass State Damage Removal: id>
 * <Bypass State Damage Removal: id, id, id>
 * 
 * <Bypass State Damage Removal: name>
 * <Bypass State Damage Removal: name, name, name>
 * 
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used to attack an enemy with the listed state that
 *   would normally have on damage removal (ie Sleep).
 * - For 'id' variant, replace each 'id' with a number representing the state's
 *   ID to bypass the damage removal for.
 * - For 'name' variant, replace each 'name' with the state's name to bypass
 *   the damage removal for.
 * - This can be used for attacks like "Dream Eater" that would prevent waking
 *   up a sleeping opponent.
 * 
 * ---
 * 
 * <Bypass State Damage Removal as Attacker: id>
 * <Bypass State Damage Removal as Attacker: id, id, id>
 * 
 * <Bypass State Damage Removal as Attacker: name>
 * <Bypass State Damage Removal as Attacker: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - When an attacker with an associated trait object that has this notetag
 *   would attack an enemy with the listed state, bypass on damage removal.
 * - For 'id' variant, replace each 'id' with a number representing the state's
 *   ID to bypass the damage removal for.
 * - For 'name' variant, replace each 'name' with the state's name to bypass
 *   the damage removal for.
 * - This can be used for effects like "Sleep Striker" that would prevent the
 *   attacker from waking up a sleeping opponent.
 * 
 * ---
 * 
 * <Bypass State Damage Removal as Target: id>
 * <Bypass State Damage Removal as Target: id, id, id>
 * 
 * <Bypass State Damage Removal as Target: name>
 * <Bypass State Damage Removal as Target: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - When a target with an associated trait object that has this notetag is
 *   attacked as the target with the listed state, bypass on damage removal.
 * - For 'id' variant, replace each 'id' with a number representing the state's
 *   ID to bypass the damage removal for.
 * - For 'name' variant, replace each 'name' with the state's name to bypass
 *   the damage removal for.
 * - This can be used for effects like "Deep Sleep" that would prevent the
 *   attacked target from waking up.
 * 
 * ---
 * 
 * <Resist State Category: name>
 * <Resist State Categories: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 * 
 * <Resist State Categories>
 *  name
 *  name
 *  name
 * </Resist State Categories>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 *
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 * 
 * <Remove Other x States>
 * 
 * - Used for: State Notetags
 * - When the state with this notetag is added, remove other 'x' category
 *   states from the battler (except for the state being added).
 * - Replace 'x' with a category name to remove from.
 * - Insert multiples of this to remove different types of categories.
 * - Useful for thing state types like stances and forms that there is usually
 *   only one active at a time.
 * 
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 * 
 * <Max Turns: x>
 * 
 * - Used for: State Notetags
 * - Determines the upper limit on the maximum number of turns for this state.
 * - Replace 'x' with a number representing the maximum number of turns used
 *   for this state.
 * - If no notetag is used, refer to the default setting found in the Plugin
 *   Parameters under "State Settings".
 * 
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 * 
 * <JS Slip Refresh>
 * 
 * - Used for: State Notetags
 * - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
 *   start of each regeneration phase to allow for dynamic damage ranges.
 * 
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 * 
 * === Aura & Miasma Notetags ===
 * 
 * Auras are a type passive that affects an allied party. Miasmas are a type of
 * passive that affects an opposing party. Auras and Miasmas only need to come
 * from a single source to give an entire party or troop a passive provided
 * that the battler emitting the aura/miasma is alive and in battle.
 * 
 * ---
 * 
 * <Aura State: x>
 * <Aura States: x, x, x>
 * 
 * <Aura State: name>
 * <Aura States: name, name, name>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy Notetags
 * - Emits an aura that affects the battler's allies and gives each affected
 *   member passive state(s) 'x'.
 * - Replace 'x' with a number to determine which state to add as a passive
 *   generated by this aura.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive generated by this aura.
 * - Note: If you plan on applying an aura effect through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 * 
 * ---
 * 
 * <Miasma State: x>
 * <Miasma States: x, x, x>
 * 
 * <Miasma State: name>
 * <Miasma States: name, name, name>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy Notetags
 * - Emits an miasma that affects the battler's opponents and gives each
 *   affected member passive state(s) 'x'.
 * - Miasmas do NOT apply outside of battle.
 * - Replace 'x' with a number to determine which state to add as a passive
 *   generated by this miasma.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive generated by this miasma.
 * - Note: If you plan on applying a miasma effect through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 * 
 * ---
 * 
 * <Not User Aura>
 * <Aura Not For User>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Prevents the emitting user from being affected by the related aura.
 * 
 * ---
 * 
 * <Allow Dead Aura>
 * <Allow Dead Miasma>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Allows aura/miasma to continue emitting even after the emitting user is
 *   in a dead state.
 * - When used with Actor, Class, Skill, Weapon, Armor, Enemy objects, it will
 *   only affect the auras/miasmas emitted from that object.
 * - When used with States, the effect will take place as long as it is used
 *   as an aura or miasma regardless of where it is emitting from.
 * - Takes priority over <Dead Aura Only> and <Dead Miasma Only> notetags.
 * 
 * ---
 * 
 * <Dead Aura Only>
 * <Dead Miasma Only>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Allows aura/miasma to only emit if the emitting user is in a dead state.
 * - When used with Actor, Class, Skill, Weapon, Armor, Enemy objects, it will
 *   only affect the auras/miasmas emitted from that object.
 * - When used with States, the effect will take place as long as it is used
 *   as an aura or miasma regardless of where it is emitting from.
 * 
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 * 
 * **NOTE** Not everything can be used as a custom JS Passive Condition due to
 * limitations of the code. There are failsafe checks to prevent infinite loops
 * and some passive conditions will not register for this reason and the
 * conditional checks will behave as if the passive states have NOT been
 * applied for this reason. Such examples include the following:
 * 
 * - A passive state that requires another passive state
 * - A passive state that requires a trait effect from another state
 * - A passive state that requires a parameter value altered by another state
 * - A passive state that requires equipment to be worn but its equipment type
 *   access is provided by another state.
 * - Anything else that is similar in style.
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
 * === Skill Cost Plugin Commands ===
 * 
 * ---
 * 
 * Skill Cost: Emulate Actor Pay
 * - Target actor(s) emulates paying for skill cost.
 * - 
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) will pay skill cost.
 * 
 *   Skill ID:
 *   - What is the ID of the skill to emulate paying the skill cost for?
 * 
 * ---
 * 
 * Skill Cost: Emulate Enemy Pay
 * - Target enemy(s) emulates paying for skill cost.
 * - 
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) will pay skill cost.
 * 
 *   Skill ID:
 *   - What is the ID of the skill to emulate paying the skill cost for?
 * 
 * ---
 * 
 * === State Turns Plugin Commands ===
 * 
 * ---
 * 
 * State Turns: Actor State Turns Change By
 * - Changes actor(s) state turns by an amount.
 * - Only works on states that can have turns.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns By:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Actor State Turns Change To
 * - Changes actor(s) state turns to a specific value.
 * - Only works on states that can have turns.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns To:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Enemy State Turns Change By
 * - Changes enemy(s) state turns by an amount.
 * - Only works on states that can have turns.
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns By:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Enemy State Turns Change To
 * - Changes enemy(s) state turns to a specific value.
 * - Only works on states that can have turns.
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns To:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
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
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 * 
 *   Window Width:
 *   - What is the desired pixel width of this window?
 *   - Default: 240
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Sort: Alphabetical:
 *   - Insert the ID's of Skill Types you want sorted alphabetically.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gauge Settings
 * ============================================================================
 *
 * Settings in regards to how skill cost gauges function and appear.
 *
 * ---
 *
 * Labels
 * 
 *   Font Type:
 *   - Which font type should be used for labels?
 * 
 *   Match Label Color:
 *   - Match the label color to the Gauge Color being used?
 * 
 *     Match: Gauge # ?:
 *     - Which Gauge Color should be matched?
 * 
 *     Preset: Gauge Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *   Solid Outline:
 *   - Make the label outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * Values
 * 
 *   Font Type:
 *   - Which font type should be used for values?
 * 
 *   Solid Outline:
 *   - Make the value outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 * 
 *   Action End Update:
 *   - States with "Action End" auto-removal will also update turns at the end
 *     of each action instead of all actions.
 * 
 *   Turn End on Map:
 *   - Update any state and buff turns on the map after this many steps.
 *   - Use 0 to disable.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 * 
 * Cache
 * 
 *   Switch Refresh?:
 *   - Refresh all battle members when switches are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Switch changes during battle in order to
 *     prevent lag spikes.
 * 
 *   Variable Refresh?:
 *   - Refresh all battle members when variables are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Variable changes during battle in order to
 *     prevent lag spikes.
 * 
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.49: February 20, 2025
 * * Bug Fixes!
 * ** Fixed a bug where causing a dead battler to refresh afterwards would
 *    yield multiple death states on that battler. Fix made by Arisu.
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Better compatibility with different icon sizes.
 * 
 * Version 1.48: December 19, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Auras & Miasmas added by Olivia:
 * *** Auras are a type passive that affects an allied party. Miasmas are a
 *     type of passive that affects an opposing party. Auras and Miasmas only
 *     need to come from a single source to give an entire party or troop a
 *     passive provided that the battler emitting the aura/miasma is alive and
 *     in battle.
 * ** New Notetags added by Olivia:
 * *** <Aura State: x>
 * **** Emits an aura that affects the battler's allies and gives each affected
 *      member passive state(s) 'x'.
 * *** <Miasma State: x>
 * **** Emits an aura that affects the battler's opponents and gives each
 *      affected member passive state(s) 'x'.
 * *** <Not User Aura>
 * **** Prevents the emitting user from being affected by the related aura.
 * *** <Allow Dead Aura>
 * *** <Allow Dead Miasma>
 * **** Allows aura/miasma to continue emitting even after the emitting user is
 *      in a dead state.
 * *** <Dead Aura Only>
 * *** <Dead Miasma Only>
 * **** Allows aura/miasma to only emit if the emitting user is in a dead state
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.47: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <Bypass State Damage Removal: id/name>
 * **** When this skill/item is used to attack an enemy with the listed state
 *      that would normally have on damage removal (ie Sleep).
 * **** This can be used for attacks like "Dream Eater" that would prevent
 *      waking up a sleeping opponent.
 * *** <Bypass State Damage Removal as Attacker: id/name>
 * **** When an attacker with an associated trait object that has this notetag
 *      would attack an enemy with the listed state, bypass on damage removal.
 * **** This can be used for effects like "Sleep Striker" that would prevent
 *      the attacker from waking up a sleeping opponent.
 * *** <Bypass State Damage Removal as Target: id/name>
 * **** When a target with an associated trait object that has this notetag is
 *      attacked as the target with the listed state, bypass on damage removal.
 * **** This can be used for effects like "Deep Sleep" that would prevent the
 *      attacked target from waking up.
 * 
 * Version 1.46: July 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Skill Settings > Skill Types > Sort: Alphabetical
 * **** Insert the ID's of Skill Types you want sorted alphabetically.
 * ** New notetags added by Irina:
 * *** <ID Sort Priority: x>
 * **** Used for Scene_Skill.
 * **** Changes sorting priority by ID for skill to 'x'. 
 * **** Default priority level is '50'.
 * **** Skills with higher priority values will be sorted higher up on the list
 *      while lower values will be lower on the list.
 * 
 * Version 1.45: May 16, 2024
 * * Bug Fixes!
 * ** Fixed a problem with passive state conditional notetags not working
 *    properly. Fix made by Irina.
 * 
 * Version 1.44: April 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where passive states would not appear. Fix made by Olivia.
 * ** Fixed a bug where a crash would occur if certain plugins cleared the
 *    passive state cache midway through trying to register it. Fix by Olivia.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * ** States with lots and lots of text data within their notes will no longer
 *    cause FPS drops.
 * 
 * Version 1.43: January 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Skill Cost: Emulate Actor Pay
 * *** Skill Cost: Emulate Enemy Pay
 * **** Target actor(s)/enemy(s) emulates paying for skill cost.
 * *** State Turns: Actor State Turns Change By
 * *** State Turns: Actor State Turns Change To
 * *** State Turns: Enemy State Turns Change By
 * *** State Turns: Enemy State Turns Change To
 * **** Changes actor(s)/enemy(s) state turns to a specific value/by an amount.
 * **** Only works on states that can have turns.
 * 
 * Version 1.42: November 16, 2023
 * * Bug Fixes!
 * ** 'origin' variable was not working properly for <JS On Expire State>
 *    JavaScript notetag. Should now be working properly. Fix made by Irina.
 * 
 * Version 1.41: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug that prevented <Max Turns: x> for states from working due to
 *    one of the recent updates. Fix made by Arisu.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Apparently, we never put <Max Turns: x> in the help notetag section.
 *    Woops... It's there now.
 * 
 * Version 1.40: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug involving the "Item Cost" skill cost type found in the Plugin
 *    Parameters when involving consumable items.
 * *** If you want to acquire these settings for an already-existing project,
 *     do either of the following:
 * **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
 *      list and install the newest version.
 * **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
 *      then copy over the "Item Cost" plugin parameters found in the "Skill
 *      Cost Types" plugin parameter settings to your current project.
 * 
 * Version 1.39: July 13, 2023
 * * Feature Update!
 * ** Updated the "Item Cost" skill cost type found in the Plugin Parameters to
 *    no longer consume items that are key items or nonconsumable.
 * *** If you want to acquire these settings for an already-existing project,
 *     do either of the following:
 * **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
 *      list and install the newest version.
 * **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
 *      then copy over the "Item Cost" plugin parameters found in the "Skill
 *      Cost Types" plugin parameter settings to your current project.
 * 
 * Version 1.38: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added segment to <Replace x Gauge: type> in documentation:
 * *** Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
 * * New Features!
 * ** New "Skill Cost Type" and notetags added by Arisu and sponsored by FAQ.
 * *** <Item Cost: x name>
 * *** <Weapon Cost: x name>
 * *** <Armor Cost: x name>
 * **** The skill will consume items, weapons, and/or armors in order to be
 *      used. Even non-consumable items will be consumed.
 * *** <Item Cost Max/Min: x name>
 * *** <Weapon Cost Max/Min: x name>
 * *** <Armor Cost Max/Min: x name>
 * **** Sets up a maximum/minimum cost for the item, weapon, armor type costs.
 * *** <Item Cost: x% name>
 * *** <Weapon Cost: x% name>
 * *** <Armor Cost: x% name>
 * **** Alters cost rate of skills that would consume item, weapon, or armor.
 * *** <Item Cost: +/-x name>
 * *** <Weapon Cost: +/-x name>
 * *** <Armor Cost: +/-x name>
 * **** Alters flat costs of skills that would consume item, weapon, or armor.
 * *** <Replace Item name1 Cost: name2>
 * *** <Replace Weapon name1 Cost: name2>
 * *** <Replace Armor name1 Cost: name2>
 * **** Replaces item, weapon, or armor to be consumed for another type.
 * *** Projects with the Skills and States Core already installed will not have
 *     this update, but you can copy over the settings from a new project with
 *     the following steps:
 * **** Create a new project. Install Skills and States Core. Open up the new
 *      project's 'Skill Cost Types'.
 * **** Right click the 'Item Cost' option(s) and click copy.
 * **** Go to the target project's Skills and States Core's 'Skill Cost Types'
 *      plugin parameter. Paste the command where you want it to go.
 * **** Only 'Item Cost' is needed as it encompasses all three types for item,
 *      weapon, and armor costs.
 * 
 * Version 1.38: February 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.37: January 20, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused equipment to unequip if the needed equipment
 *    traits came from passive states upon learning new skills. Fix by Irina.
 * 
 * Version 1.36: December 15, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** When enemies are defeated with their entire party having a state with the
 *    <Group Defeat> notetag, then the party will gain EXP, Gold, and Drops
 *    before when they wouldn't. Update made by Irina.
 * * New Features!
 * ** New Plugin Parameter added by Irina!
 * *** Plugin Parameters > Skill Settings > Skill Type Window > Window Width
 * **** What is the desired pixel width of this window? Default: 240
 * 
 * Verison 1.35: October 13, 2022
 * * Feature Update!
 * ** Default values for Passive States > Cache > Switch Refresh? and Variable
 *    Refresh? are now set to "false" in order to prevent sudden lag spikes for
 *    those who are unfamiliar with how this setting works.
 * ** Update made by Irina.
 * 
 * Version 1.34: September 29, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Gauge Settings
 * **** These settings allow you to make minor tweaks to how the gauges look
 *      ranging from the color used for the labels to the outline types used
 *      for the values.
 * 
 * Version 1.33: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a crash that occurs when performing a custom action sequence
 *    without a skill attached to it. Fix made by Olivia.
 * 
 * Version 1.32: June 16, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Passive State Settings > Cache > Switch Refresh?
 * *** Plugin Parameters > Passive State Settings > Cache > Variable Refresh?
 * **** Refresh all battle members when switches/variables are changed in
 *      battle?
 * **** This is primarily used for passive state conditions involve parameters
 *      that do not update due to cached data until a refresh occurs.
 * **** If this is on, do not spam Switch/Variable changes during battle in
 *      order to prevent lag spikes.
 * 
 * Version 1.31: April 28, 2022
 * * Bug Fixes!
 * ** Custom Slip Damage JS is now totalled correctly into regular slip damage
 *    totals for damage popups. Fix made by Olivia.
 * 
 * Version 1.30: April 14, 2022
 * * Feature Update!
 * ** Changed the state data removal timing to be after JS notetag effects
 *    take place in order for data such as origin data to remain intact. Update
 *    made by Irina.
 * 
 * Version 1.29: March 31, 2022
 * * Bug Fixes!
 * ** Fixed an error with <State x Category Remove: y> not countaing correctly
 *    unless the state count matched the exact amount. The notetag effect
 *    should work properly now. Fix made by Olivia.
 * 
 * Version 1.28: March 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** <State x Category Remove: All> updated to allow multiple cases in a
 *    single notebox. Updated by Arisu.
 * * New Features!
 * ** New Notetag added by Arisu and sponsored by Archeia!
 * *** <Remove Other x States>
 * **** When the state with this notetag is added, remove other 'x' category
 *      states from the battler (except for the state being added).
 * **** Useful for thing state types like stances and forms that there is
 *      usually only one active at a time.
 * 
 * Version 1.27: January 27, 2022
 * * Bug Fixes!
 * ** Custom JS Slip Damage/Healing values should now be recalculated on
 *    demand. Fix made by Olivia.
 * 
 * Version 1.26: January 20, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Conditional Passive Bypass check is now stronger to prevent even more
 *    infinite loops from happening. Update made by Olivia.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > State Settings > General > Turn End on Map
 * **** Update any state and buff turns on the map after this many steps.
 * **** Use 0 to disable.
 * 
 * Version 1.25: November 11, 2021
 * * Bug Fixes!
 * ** Hidden skill notetags should no longer crash upon not detecting actors
 *    for learned skills. Fix made by Olivia.
 * 
 * Version 1.24: November 4, 2021
 * * Documentation Update!
 * ** Added section: "Slip Damage Popup Clarification"
 * *** Slip Damage popups only show one popup for HP, MP, and TP each and it is
 *     the grand total of all the states and effects combined regardless of the
 *     number of states and effects on a battler. This is how it is in vanilla
 *     RPG Maker MZ and this is how we intend for it to be with the VisuStella
 *     MZ library.
 * *** This is NOT a bug!
 * *** The reason we are not changing this is because it does not properly
 *     relay information to the player accurately. When multiple popups appear,
 *     players only have roughly a second and a half to calculate it all for
 *     any form of information takeaway. We feel it is better suited for the
 *     player's overall convenience to show a cummulative change and steer the
 *     experience towards a more positive one.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.23: September 17, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * *** Skill Cost Types Plugin Parameters need to be updated for those who want
 *     the updated gauges. This can be done easily with the following steps:
 * **** Step 1: Create a new project.
 * **** Step 2: Install Skills and States Core version 1.23 into it.
 * **** Step 3: Copy the Plugin Parameter Settings for "Skill Cost Types".
 * **** Step 4: Return back to your original project.
 * **** Step 5: Paste Plugin Parameter Settings on top of "Skill Cost Types".
 * 
 * Version 1.22: August 6, 2021
 * * Documentation Update!
 * ** "Action End Removal for States" under Major Updates is changed to:
 * *** If your Plugin Parameter settings for "Action End Update" are enabled,
 *     then "Action End" has been updated so that it actually applies per
 *     action used instead of just being at the start of a battler's action
 *     set.
 * *** However, there are side effects to this: if a state has the "Cannot
 *     Move" restriction along with the "Action End" removal timing, then
 *     unsurprisingly, the state will never wear off because it's now based on
 *     actual actions ending. To offset this and remove confusion, "Action End"
 *     auto-removal timings for states with "Cannot Move" restrictions will be
 *     turned into "Turn End" auto-removal timings while the "Action End
 *     Update" is enabled.
 * *** This automatic change won't make it behave like an "Action End" removal
 *     timing would, but it's better than completely softlocking a battler.
 * * Feature Update!
 * ** Those using "Cannot Move" states with "Action End" auto-removal will now
 *    have be automatically converted into "Turn End" auto-removal if the
 *    plugin parameter "Action End Update" is set to true. Update by Irina.
 * 
 * Version 1.21: July 30, 2021
 * * Documentation Update!
 * ** Expanded "Action End Removal for States" section in Major Changes.
 * *** These changes have been in effect since Version 1.07 but have not been
 *     explained in excess detail in the documentation since.
 * **** Action End has been updated so that it actually applies per action used
 *      instead of just being at the start of a battler's action set. However,
 *      there are side effects to this: if a state has the "Cannot Move"
 *      restriction along with the "Action End" removal timing, then
 *      unsurprisingly, the state will never wear off because it's now based on
 *      actual actions ending. There are two solutions to this:
 * **** Don't make "Cannot Move" restriction states with "Action End". This is
 *      not a workaround. This is how the state removal is intended to work
 *      under the new change.
 * **** Go to the Skills & States Core Plugin Parameters, go to State
 *      Setttings, look for "Action End Update", and set it to false. You now
 *      reverted the removal timing system back to how it originally was in RPG
 *      Maker MZ's default battle system where it only updates based on an
 *      action set rather than per actual action ending.
 * 
 * Version 1.20: June 18, 2021
 * * Feature Update!
 * ** Updated automatic caching for conditional passive states to update more
 *    efficiently. Update made by Arisu.
 * 
 * Version 1.19: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.18: May 21, 2021
 * * Documentation Update
 * ** Added "Passive State Clarification" section.
 * *** As there is a lot of confusion regarding how passive states work and how
 *     people still miss the explanations found in the "Passive State Notetags"
 *     section AND the "Plugin Parameters: Passive State Settings", we are
 *     adding a third section to explain how they work.
 * *** All three sections will contain the full detailed explanation of how
 *     passive states work to clear common misconceptions about them.
 * 
 * Version 1.17: May 7, 2021
 * * Bug Fixes
 * ** State category removal is now usable outside of battle. Fix by Irina.
 * 
 * Version 1.16: April 30, 2021
 * * Bug Fixes!
 * ** When states with step removal have the <No Recover All Clear> or
 *    <No Death Clear> notetags, their step counter is no longer reset either.
 *    Fix made by Irina.
 * * New Features!
 * ** New notetag added by Arisu!
 * *** <List Name: name>
 * **** Makes the name of the skill appear different when show in the skill
 *      list. Using \V[x] as a part of the name will display that variable.
 * 
 * Version 1.15: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.14: March 12, 2021
 * * Bug Fixes!
 * ** Max HP Buff/Debuff should now display its turn counter. Fix by Yanfly.
 * * Documentation Update!
 * ** For the <JS Passive Condition>, we've added documentation on the
 *    limitations of passive conditions since they have been reported as bug
 *    reports, when in reality, they are failsafes to prevent infinite loops.
 *    Such limitations include the following:
 * *** A passive state that requires another passive state
 * *** A passive state that requires a trait effect from another state
 * *** A passive state that requires a parameter value altered by another state
 * *** A passive state that requires equipment to be worn but its equipment
 *     type access is provided by another state.
 * *** Anything else that is similar in style.
 * 
 * Version 1.13: February 26, 2021
 * * Documentation Update!
 * ** For <JS type Slip Damage> and <JS type Slip Heal> notetags, added the
 *    following notes:
 * *** When these states are applied via action effects, the slip calculations
 *     are one time calculations made upon applying and the damage is cached to
 *     be used for future on regeneration calculations.
 * *** For that reason, do not include game mechanics here such as adding
 *     states, buffs, debuffs, etc. as this notetag is meant for calculations
 *     only. Use the VisuStella Battle Core's <JS Pre-Regenerate> and
 *     <JS Post-Regenerate> notetags for game mechanics instead.
 * *** Passive states and states with the <JS Slip Refresh> notetag are exempt
 *     from the one time calculation and recalculated each regeneration phase.
 * * Feature Update!
 * ** Changed slip refresh requirements to entail <JS Slip Refresh> notetag for
 *    extra clarity. Update made by Olivia.
 * 
 * Version 1.12: February 19, 2021
 * * Feature Update
 * ** Changed the way passive state infinite stacking as a blanket coverage.
 *    Update made by Olivia.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent passive states from infinitely stacking. Fix
 *    made by Olivia.
 * 
 * Version 1.10: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Skill Settings > Background Type
 * 
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 * 
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 * 
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 * 
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
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
 * @command SkillActorPaySkillCost
 * @text Skill Cost: Emulate Actor Pay
 * @desc Target actor(s) emulates paying for skill cost.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) will pay skill cost.
 * @default ["1"]
 *
 * @arg SkillID:num
 * @text Skill ID
 * @type skill
 * @desc What is the ID of the skill to emulate paying the skill cost for?
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillEnemyPaySkillCost
 * @text Skill Cost: Emulate Enemy Pay
 * @desc Target enemy(s) emulates paying for skill cost.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) will pay skill cost.
 * @default ["1"]
 *
 * @arg SkillID:num
 * @text Skill ID
 * @type skill
 * @desc What is the ID of the skill to emulate paying the skill cost for?
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_StateTurns
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsActorChangeBy
 * @text State Turns: Actor State Turns Change By
 * @desc Changes actor(s) state turns by an amount.
 * Only works on states that can have turns.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns By
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default +1
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if actor(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsActorChangeTo
 * @text State Turns: Actor State Turns Change To
 * @desc Changes actor(s) state turns to a specific value.
 * Only works on states that can have turns.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns To
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default 10
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if actor(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsEnemyChangeBy
 * @text State Turns: Enemy State Turns Change By
 * @desc Changes enemy(s) state turns by an amount.
 * Only works on states that can have turns.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns By
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default +1
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if enemy(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsEnemyChangeTo
 * @text State Turns: Enemy State Turns Change To
 * @desc Changes enemy(s) state turns to a specific value.
 * Only works on states that can have turns.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns To
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default 10
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if enemy(s) does not have it applied?
 * @default true
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
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst label = TextManager.hpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst label = TextManager.mpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst label = TextManager.tpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Item Cost\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = {\\\\n    items: {},\\\\n    weapons: {},\\\\n    armors: {},\\\\n};\\\\n\\\\n// Gather Cost Notetags\\\\n{ // Item Costs\\\\n    const notetag = /<ITEM COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.items[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Costs\\\\n    const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.weapons[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Costs\\\\n    const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.armors[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Declare Trait Objects\\\\nconst traitObjects = user.traitObjects();\\\\n\\\\n// Apply Cost Rate Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Cost Rate Modifiers\\\\n        const notetag = /<ITEM COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] = Math.ceil(cost.items[entry.id] * rate);\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Cost Rate Modifiers\\\\n        const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] = Math.ceil(cost.weapons[entry.id] * rate);\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Cost Rate Modifiers\\\\n        const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] = Math.ceil(cost.armors[entry.id] * rate);\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Flat Cost Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Flat Cost Modifiers\\\\n        const notetag = /<ITEM COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] += flat;\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Flat Cost Modifiers\\\\n        const notetag = /<WEAPON COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] += flat;\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Flat Cost Modifiers\\\\n        const notetag = /<ARMOR COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] += flat;\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Set Cost Limits\\\\n{ // Item Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ITEM COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.min(max, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ITEM COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.max(min, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<WEAPON COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.min(max, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<WEAPON COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.max(min, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ARMOR COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.min(max, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ARMOR COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.max(min, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Replacement Costs\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Replacement Costs\\\\n        const notetag = /<REPLACE ITEM (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.items[entry1.id]) {\\\\n                    cost.items[entry2.id] = cost.items[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Replacement Costs\\\\n        const notetag = /<REPLACE WEAPON (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.weapons[entry1.id]) {\\\\n                    cost.weapons[entry2.id] = cost.weapons[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Replacement Costs\\\\n        const notetag = /<REPLACE ARMOR (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.armors[entry1.id]) {\\\\n                    cost.armors[entry2.id] = cost.armors[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return cost data\\\\nreturn cost;\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Individual Costs\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.items[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return True\\\\nreturn true;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj && obj.consumable) {\\\\n            if (obj.itypeId !== 2) {\\\\n                const costAmount = cost.items[id];\\\\n                $gameParty.loseItem(obj, costAmount);\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Keys\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\n\\\\n// Return False\\\\nreturn keys.some(key => Object.keys(cost[key]).length > 0);\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\nfor (const key of keys) {\\\\n    const database = [$dataItems, $dataWeapons, $dataArmors][keys.indexOf(key)];\\\\n    const costData = cost[key];\\\\n    const idList = Object.keys(costData).sort((a, b) => a - b);\\\\n    for (const id of idList) {\\\\n        const obj = database[id];\\\\n        const iconIndex = obj.iconIndex;\\\\n        const costAmount = costData[id];\\\\n        text += '\\\\\\\\\\\\\\\\I[%1]×%2 '.format(iconIndex, costAmount);\\\\n    }\\\\n}\\\\n\\\\n// Return text\\\\nreturn text.trim();\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Don't Draw Anything\\\\n// This does not work as a gauge.\\\"\"}"]
 *
 * @param Gauge:struct
 * @text Gauge Settings
 * @parent Skills:struct
 * @type struct<Gauge>
 * @desc Settings in regards to how skill cost gauges function and appear.
 * @default {"Labels":"","LabelFontMainType:str":"main","MatchLabelColor:eval":"true","MatchLabelGaugeColor:num":"2","PresetLabelGaugeColor:num":"16","LabelOutlineSolid:eval":"true","LabelOutlineWidth:num":"3","Values":"","ValueFontMainType:str":"number","ValueOutlineSolid:eval":"true","ValueOutlineWidth:num":"3"}
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
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
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
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
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 * 
 * @param CmdWidth:num
 * @text Window Width
 * @parent SkillTypeWindow
 * @type number
 * @min 1
 * @desc What is the desired pixel width of this window?
 * Default: 240
 * @default 240
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
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillSceneStatusBgType:num
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
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param SortSkillTypesAbc:arraynum
 * @text Sort: Alphabetical
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of Skill Types you want sorted alphabetically.
 * @default []
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param Labels
 *
 * @param LabelFontMainType:str
 * @text Font Type
 * @parent Labels
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for labels?
 * @default main
 *
 * @param MatchLabelColor:eval
 * @text Match Label Color
 * @parent Labels
 * @type boolean
 * @on Match
 * @off Preset
 * @desc Match the label color to the Gauge Color being used?
 * @default true
 *
 * @param MatchLabelGaugeColor:num
 * @text Match: Gauge # ?
 * @parent MatchLabelColor:eval
 * @type number
 * @min 1
 * @max 2
 * @desc Which Gauge Color should be matched?
 * @default 2
 *
 * @param PresetLabelGaugeColor:num
 * @text Preset: Gauge Color
 * @parent MatchLabelColor:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param LabelOutlineSolid:eval
 * @text Solid Outline
 * @parent Labels
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the label outline a solid black color?
 * @default true
 *
 * @param LabelOutlineWidth:num
 * @text Outline Width
 * @parent Labels
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 * @param Values
 *
 * @param ValueFontMainType:str
 * @text Font Type
 * @parent Values
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for values?
 * @default number
 *
 * @param ValueOutlineSolid:eval
 * @text Solid Outline
 * @parent Values
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the value outline a solid black color?
 * @default true
 *
 * @param ValueOutlineWidth:num
 * @text Outline Width
 * @parent Values
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text Action End Update
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc States with "Action End" auto-removal will also update
 * turns at the end of each action instead of all actions.
 * @default true
 *
 * @param TurnEndOnMap:num
 * @text Turn End on Map
 * @parent General
 * @type number
 * @desc Update any state and buff turns on the map after
 * this many steps. Use 0 to disable.
 * @default 20
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param Cache
 *
 * @param RefreshCacheSwitch:eval
 * @text Switch Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when switches are changed in battle?
 * @default false
 *
 * @param RefreshCacheVar:eval
 * @text Variable Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when variables are changed in battle?
 * @default false
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

const _0x13ab2e=_0x2088;(function(_0x66ce85,_0x1dc111){const _0x50e5d3=_0x2088,_0x2a4b3a=_0x66ce85();while(!![]){try{const _0x274e41=parseInt(_0x50e5d3(0x3bf))/0x1+parseInt(_0x50e5d3(0x3ab))/0x2+parseInt(_0x50e5d3(0x350))/0x3+-parseInt(_0x50e5d3(0x183))/0x4*(parseInt(_0x50e5d3(0x346))/0x5)+-parseInt(_0x50e5d3(0x308))/0x6+parseInt(_0x50e5d3(0x3c6))/0x7*(-parseInt(_0x50e5d3(0x3be))/0x8)+-parseInt(_0x50e5d3(0x222))/0x9*(parseInt(_0x50e5d3(0x3cc))/0xa);if(_0x274e41===_0x1dc111)break;else _0x2a4b3a['push'](_0x2a4b3a['shift']());}catch(_0x104059){_0x2a4b3a['push'](_0x2a4b3a['shift']());}}}(_0x48a5,0x5ad53));var label=_0x13ab2e(0x25d),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x8d113){const _0x56bcd0=_0x13ab2e;return _0x8d113[_0x56bcd0(0x2eb)]&&_0x8d113[_0x56bcd0(0x2a2)]['includes']('['+label+']');})[0x0];function _0x48a5(){const _0xa08a06=['Costs','onEraseStateCustomJS','getCurrentStateActiveUser','getAuraPassiveStatesFromObj','commandNameWindowCenter','traitObjects','Scene_Skill_helpWindowRect','drawActorBuffTurns','_stateIDs','_statusWindow','MaxTurns','currentMaxValueSkillsStatesCore','Parse_Notetags_State_PassiveJS','valueFontSize','ShowData','version','initialize','state','floor','slipMp','_stateOrigin','setBackgroundType','menuActor','RefreshCacheSwitch','ActorIDs','applyItemUserEffect','MeetsAuraNoteConditions','_states','_skillChangesFromState','stateEraseJS','rgba(0,\x200,\x200,\x200)','stateAddJS','die','gaugeBackColor','_passiveStateResults','Game_Action_testApply','regenerateAll','mainAreaHeight','Game_Troop_setup','resetStateCounts','Sprite_Gauge_currentMaxValue','isSkillCostShown','text','_costSettings','makeItemList','updateTurnDisplaySprite','addCommand','stateTpSlipDamageJS','1175164yHSkDy','increaseBuff','meetsSkillConditionsGlobalJS','gaugeLineHeight','CheckIncompatibleStates','drawParamText','Global','Game_BattlerBase_resetStateCounts','addAuraPassiveStateIDs','ListWindowCols','applyDebuffTurnManipulationEffects','getCurrentTroopUniqueID','exit','mainCommandWidth','Sprite_Gauge_setup','user','stateHpSlipHealJS','skill','drawItemStyleIcon','77576WFrEoP','588288yFQHaB','LabelOutlineSolid','canChangeSkillsThroughStateEffects','addStateTurns','addWindow','ParseSkillNotetags','addPassiveStatesByNotetag','413AWCYXZ','getCurrentStateOriginKey','getStateRetainType','randomInt','getSkillChangesFromState','isTargetBypassRemoveStatesByDamage','3287410mRoKsq','skillTpCost','stateTpSlipHealJS','FUNC','labelFontFace','VisuMZ_0_CoreEngine','refreshAllMembers','createAllSkillCostText','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','clamp','damage','currentMaxValue','heal','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','removeBuff','concat','_battler','scrollTo','_tempActor','ShowTurns','convertGaugeTypeSkillsStatesCore','isUseModernControls','autoRemovalTiming','_bypassRemoveStateDamage_value','setStateRetainType','setBuffTurns','Game_BattlerBase_initMembers','getClassIdWithName','Game_Switches_onChange','itemWindowRectSkillsStatesCore','onRegenerateCustomStateDamageOverTime','onExpireBuffGlobalJS','ReapplyRules','updateCommandNameWindow','CheckVisibleSkillNotetags','isUseSkillsStatesCoreUpdatedLayout','refresh','_actor','setStatusWindow','drawText','splice','_cache','_skillIDs','sortSkillList','EnableLayout','clearStateRetainType','getStateData','PresetLabelGaugeColor','buff','_stateRetainType','keys','_cache_getPassiveStatesFromObj','eraseState','isActor','_categoryWindow','shopStatusWidth','localeCompare','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','makeCurrentTroopUniqueID','placeGauge','anySwitchOn','CanPayJS','ParseClassIDs','recover\x20all','iconIndex','getPassiveStateConditionSwitchData','meetsPassiveStateConditionSwitches','isGroupDefeatStateAffected','Game_Variables_onChange','CheckVisibleBattleNotetags','changeSkillsThroughStateEffects','_stateMaxTurns','call','getStateOrigin','isDead','applyBuffTurnManipulationEffects','testSkillStatesCoreNotetags','parse','add','canPaySkillCost','isPassiveStateStackable','_buffs','commandName','name','initMembers','MDF','gaugeColor1','initMembersSkillsStatesCore','stypeId','Armor-%1-%2','helpWindowRect','sortPriority','none','attacker','Game_BattlerBase_clearStates','remove','deadMembers','normalColor','stateCategoriesResisted','mainFontFace','isStateAddable','setStypeId','Sprite_StateIcon_updateFrame','return\x200','itemTextAlign','StateID','priority','addState','removeStatesByCategory','addBuffTurns','match','drawActorStateData','action','stateHpSlipDamageJS','Window_SkillType_initialize','ValueFontMainType','Game_Actor_skillTypes','Turns','drawActorIcons','maxTurns','Parse_Notetags_Skill_JS','Gauge','setItem','maxSlipDamage','meetsPassiveStateConditionJS','anchor','getAuraPassiveStateIDs','createKeyJS','Item-%1-%2','ARRAYSTRUCT','onAddState','_scene','callUpdateHelp','_buffTurns','_tempBattler','Game_BattlerBase_increaseBuff','EVAL','TurnFontSize','Window_SkillList_drawItem','clearAllStateOrigins','drawFullGauge','active','gainHp','parameters','itemWindowRect','1068Kmyuof','_shopStatusWindow','ActionEndUpdate','getStateOriginByKey','MeetsAuraStateConditions','StateTurnsActorChangeBy','Scene_Skill_statusWindowRect','commandNameWindowDrawBackground','STR','canClearState','map','Game_Action_executeHpDamage_bypassStateDmgRemoval','<actor-%1>','checkSkillConditionsNotetags','createPassiveStatesCache','onEraseDebuffGlobalJS','Skills','checkSkillTypeMatch','iconWidth','isAppeared','lineHeight','CalcJS','registerCommand','Param','setup','bypassRemoveStatesByDamage','convertTargetToStateOriginKey','textSizeEx','setStateOrigin','helpWindowRectSkillsStatesCore','log','setStateDisplay','enemyId','onEraseBuffJS','round','deathStateId','_currentTroopUniqueID','DEF','isSkillTypeMatchForUse','bitmap','Parse_Notetags_State_ApplyRemoveLeaveJS','helpAreaTop','_stateTurns','boxWidth','useDigitGrouping','Parse_Notetags_Skill_Cost','Game_BattlerBase_die','multiclasses','CheckVisibleSwitchNotetags','hasSkill','onAddStateCustomJS','setPassiveStateSlipDamageJS','item','_checkingTraitsSetSkillsStatesCore','greater','learnSkill','_classIDs','index','reset','target','drawActorIconsAllTurnCounters','drawActorStateTurns','Sprite_StateIcon_loadBitmap','RefreshCacheVar','isBuffExpired','enemy','_stateSteps','SkillID','STRUCT','Game_BattlerBase_eraseState','createSkillCostText','paramBuffRate','Scene_Skill_itemWindowRect','max','labelOutlineWidth','Game_Actor_learnSkill','%1%','uiInputPosition','Window_SkillList_setActor','AGI','isStateResist','subject','statesByCategory','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','allSwitchOn','MAT','icon','format','_result','Settings','skills','meetsSkillConditions','_animationIndex','contents','passiveStateObjects','onExpireBuff','windowPadding','textColor','meetsPassiveStateGlobalConditionJS','push','_stateData','ParseStateNotetags','ValueOutlineSolid','Scene_Boot_onDatabaseLoaded','fontBold','EnemyIndex','Skill-%1-%2','replace','shopStatusWindowRectSkillsStatesCore','drawItem','split','skillTypeWindowRect','categories','createItemWindow','Game_BattlerBase_addNewState','Game_Battler_regenerateAll','mpCost','equipPassives','ParseSkillChangessIntoData','valueFontFace','paramValueByName','Game_BattlerBase_isStateResist','statusWindowRectSkillsStatesCore','Game_BattlerBase_refresh','onAddStateMakeCustomSlipValues','clear','skillCostSeparator','commandStyle','_turnDisplaySprite','isAllDead','value','TextJS','stateTurns','onEraseStateGlobalJS','uiHelpPosition','drawExtendedParameter','placeExactGauge','_endingBattle','process_VisuMZ_SkillsStatesCore_CheckForAuras','stateMaximumTurns','skillMpCost','addPassiveStates','isMaxDebuffAffected','ColorDebuff','StateTurnsEnemyChangeBy','itemLineRect','clearStateData','setupSkillsStatesCore','standardIconWidth','standardIconHeight','onChange','loadBitmap','alterSkillName','_lastStatesActionEndFrameCount','regenerateAllSkillsStatesCore','CmdStyle','rgba(0,\x200,\x200,\x201)','Parse_Notetags_State_SlipEffectJS','setStateData','9mhWrAR','addNewState','SkillEnemyPaySkillCost','BattleManager_endAction','buttonAssistText1','makeCommandName','_stored_buffColor','meetsPassiveStateConditions','commandStyleCheck','addBuff','battleMembers','addChild','AutoAddState','ANY','isRightInputMode','Game_Battler_addDebuff','SkillSceneStatusBgType','passiveStateIDs','auraStateIDs','buffIconIndex','onAddDebuffGlobalJS','skillVisibleJS','_data','createCommandNameWindow','GaugeDrawJS','meetsStateCondition','ATK','stateColor','_stateDisplay','center','removeState','setStateTurns','AURA_SYSTEM_ENABLED','PassiveConditionJS','canUse','onDatabaseLoaded','ColorNeutral','StateTurnsActorChangeTo','_cache_CheckBypassRemoveStatesByDamage','onEraseDebuffJS','removeStatesAuto','getSkillTypes','currentValueSkillsStatesCore','labelColor','IconStypeMagic','fontSize','drawTextEx','changePaintOpacity','applyStateTurnManipulationEffects','ARRAYEVAL','JSON','Game_BattlerBase_meetsSkillConditions','CoreEngine','eraseBuff','onAddDebuff','numberFontFace','_stored_state-%1-color','executeHpDamage','Game_Action_applyItemUserEffect','SkillsStatesCore','note','drawItemStyleIconText','onEraseStateJS','indexOf','statePassiveConditionJS','Game_BattlerBase_eraseBuff','addPassiveStatesTraitSets','ARRAYFUNC','outlineColor','setActor','CheckBypassRemoveStatesByDamage','_stypeId','statusWindowRect','_currentActor','debuffTurns','createShopStatusWindow','isPlaytest','overwriteBuffTurns','Game_Battler_addBuff','updateStatesActionEnd','_checkingPassiveStates','onExpireDebuffGlobalJS','test','\x5cI[%1]%2','meetsPassiveStateConditionClasses','GaugeMaxJS','toLowerCase','currentClass','updateHelp','drawSkillCost','MAXHP','min','onEraseBuffGlobalJS','BattleHiddenSkillTypes','HiddenSkillTypes','mainAreaTop','getColor','redrawSkillsStatesCore','includes','stateId','removeStatesByDamage','usableSkills','uiMenuStyle','members','isCommandEnabled','ARRAYJSON','_cache_getPassiveStateConditionClassesData','Game_BattlerBase_traitsSet','updateStateTurns','aliveMembers','filter','CmdWidth','labelFontSize','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20','checkSkillConditionsSwitchNotetags','_skills','isSkillHidden','StateTurnsEnemyChangeTo','Game_Actor_forgetSkill','isStateAffected','isSceneBattle','process_VisuMZ_SkillsStatesCore_Notetags','restriction','Name','addDebuffTurns','MAXMP','onExpireState','isLearnedSkill','description','onExpireDebuff','hasStateCategory','LabelFontMainType','<enemy-%1>','_skillTypeWindow','skillLearn','allowCreateShopStatusWindow','Parse_Notetags_Skill_Sorting','drawActorBuffRates','frameCount','GaugeCurrentJS','height','chanceByDamage','groupDefeat','Game_Battler_addState','States','PassiveStates','hasState','ignore','applySkillsStatesCoreEffects','slipTp','onAddBuff','stateMpSlipHealJS','anySwitchOff','_cache_getPassiveStateConditionSwitchData','Window_SkillList_updateHelp','NUM','states','death','_bypassRemoveStateDamage_user','SortSkillTypesAbc','currentDisplayedValue','Scene_Skill_createItemWindow','checkShowHideJS','clearStates','Actor','calcWindowHeight','onRemoveState','makeSuccess','traitsSet','Game_Player_refresh','getStateIdWithName','gainMp','getStateReapplyRulings','actor','allBattleMembers','isDebuffAffected','innerWidth','getStypeIdWithName','inBattle','commandNameWindowDrawText','isBottomHelpMode','hpDamage','getPassiveStateConditionClassesData','ceil','Parse_Notetags_State_Category','Sprite_Gauge_currentValue','Scene_Skill_skillTypeWindowRect','addDebuff','ColorPositive','process_VisuMZ_SkillsStatesCore_Skill_Notetags','mainFontSize','_stored_debuffColor','fillRect','getStateDisplay','recoverAll','constructor','removeByDamage','success','decreaseBuff','isUserBypassRemoveStatesByDamage','innerHeight','status','isStateRemoved','process_VisuMZ_SkillsStatesCore_State_Notetags','sort','helpAreaHeight','isStateCategoryResisted','skillTypes','checkCacheKey','resetTextColor','ValueOutlineWidth','prototype','_stypeIDs','stateExpireJS','_subject','buffTurns','onAddDebuffJS','ShowShopStatus','Game_BattlerBase_overwriteBuffTurns','SkillActorPaySkillCost','Actor-%1-%2','skillEnableJS','redraw','actions','isSkillUsableForAutoBattle','Game_BattlerBase_skillTpCost','isBuffOrDebuffAffected','adjustSkillCost','onEraseDebuff','convertPassiveStates','2627052dxfBbF','currentValue','Game_BattlerBase_recoverAll','iconText','toUpperCase','Game_Battler_isStateAddable','drawExtendedSkillsStatesCoreStatus','number','_checkingVisuMzPassiveStateObjects','_bypassRemoveStateDamage_action','stateMpSlipDamageJS','trim','ARRAYSTR','itemAt','_commandNameWindow','canSortSkillTypeList','ShowJS','_itemWindow','DataFontSize','ALL','ConvertParams','allSwitchOff','stepsForTurn','setDebuffTurns','updateVisibility','updatedLayoutStyle','multiClass','updateFrame','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','checkShowHideNotetags','changeTextColor','addPassiveStatesByPluginParameters','Game_BattlerBase_skillMpCost','%1-%2-%3','labelOutlineColor','isStateCategoryAffected','onAddBuffGlobalJS','onBattleEnd','Sprite_Gauge_gaugeRate','makeResistedStateCategories','getSkillIdWithName','_colorCache','prepareResetStateCounts','meetsSkillConditionsEnableJS','onExpireDebuffJS','addPassiveStatesFromOtherPlugins','Sprite_Gauge_initMembers','resetFontSettings','DisplayedParams','ColorNegative','isPartyAllAffectedByGroupDefeatStates','shift','valueOutlineWidth','tpCost','VisuMZ_1_ElementStatusCore','mpDamage','SkillConditionJS','onExpireStateGlobalJS','paySkillCost','_cache_getAuraPassiveStatesFromObj','shopStatusWindowRect','Window_SkillList_includes','2395JrhsFS','createTurnDisplaySprite','onExpireBuffJS','clearStatesWithStateRetain','DataOffsetY','Sprite_Gauge_redraw','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','Game_Unit_isAllDead','TurnEndOnMap','length','1988340MnSSNi','onAddStateGlobalJS','applyStateCategoryRemovalEffects','changeOutlineColor','Window_StatusBase_drawActorIcons','slipHp','ARRAYNUM','width','getColorDataFromPluginParameters','includesSkillsStatesCore','clearStateOrigin','onAddBuffJS','Game_BattlerBase_states','retrieveStateColor','slice','gaugeRate','buffColor','TurnOffsetY','VisuMZ_1_ItemsEquipsCore','_hidden','DataOffsetX','right','endAction','clearStateDisplay','onEraseBuff','onExpireStateCustomJS','onExpireStateJS','Game_Battler_onBattleEnd','forgetSkill','LabelOutlineWidth','makeAdditionalSkillCostText','equipBattleSkills','Buffs','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','removeStatesByCategoryAll','getPassiveStatesFromObj','passiveStates','buttonAssistSwitch','#%1','valueOutlineColor','adjustItemWidthByShopStatus','Game_Unit_deadMembers','isBuffAffected'];_0x48a5=function(){return _0xa08a06;};return _0x48a5();}function _0x2088(_0x49f959,_0xac3299){const _0x48a5c3=_0x48a5();return _0x2088=function(_0x208834,_0x5cdc40){_0x208834=_0x208834-0x129;let _0x40424e=_0x48a5c3[_0x208834];return _0x40424e;},_0x2088(_0x49f959,_0xac3299);}VisuMZ[label][_0x13ab2e(0x1dc)]=VisuMZ[label][_0x13ab2e(0x1dc)]||{},VisuMZ[_0x13ab2e(0x31c)]=function(_0x26bf65,_0x3e326a){const _0x212252=_0x13ab2e;for(const _0x476408 in _0x3e326a){if(_0x476408[_0x212252(0x160)](/(.*):(.*)/i)){const _0x1f756e=String(RegExp['$1']),_0x3551ab=String(RegExp['$2'])[_0x212252(0x30c)]()[_0x212252(0x313)]();let _0x336e08,_0x2ff83a,_0x3f679b;switch(_0x3551ab){case _0x212252(0x2bd):_0x336e08=_0x3e326a[_0x476408]!==''?Number(_0x3e326a[_0x476408]):0x0;break;case _0x212252(0x356):_0x2ff83a=_0x3e326a[_0x476408]!==''?JSON[_0x212252(0x13f)](_0x3e326a[_0x476408]):[],_0x336e08=_0x2ff83a[_0x212252(0x18d)](_0x22d39d=>Number(_0x22d39d));break;case _0x212252(0x17a):_0x336e08=_0x3e326a[_0x476408]!==''?eval(_0x3e326a[_0x476408]):null;break;case _0x212252(0x253):_0x2ff83a=_0x3e326a[_0x476408]!==''?JSON['parse'](_0x3e326a[_0x476408]):[],_0x336e08=_0x2ff83a[_0x212252(0x18d)](_0x5147bc=>eval(_0x5147bc));break;case _0x212252(0x254):_0x336e08=_0x3e326a[_0x476408]!==''?JSON['parse'](_0x3e326a[_0x476408]):'';break;case _0x212252(0x28b):_0x2ff83a=_0x3e326a[_0x476408]!==''?JSON[_0x212252(0x13f)](_0x3e326a[_0x476408]):[],_0x336e08=_0x2ff83a[_0x212252(0x18d)](_0x3c0cca=>JSON[_0x212252(0x13f)](_0x3c0cca));break;case _0x212252(0x3cf):_0x336e08=_0x3e326a[_0x476408]!==''?new Function(JSON[_0x212252(0x13f)](_0x3e326a[_0x476408])):new Function(_0x212252(0x159));break;case _0x212252(0x265):_0x2ff83a=_0x3e326a[_0x476408]!==''?JSON[_0x212252(0x13f)](_0x3e326a[_0x476408]):[],_0x336e08=_0x2ff83a['map'](_0x2e02f9=>new Function(JSON['parse'](_0x2e02f9)));break;case _0x212252(0x18b):_0x336e08=_0x3e326a[_0x476408]!==''?String(_0x3e326a[_0x476408]):'';break;case _0x212252(0x314):_0x2ff83a=_0x3e326a[_0x476408]!==''?JSON[_0x212252(0x13f)](_0x3e326a[_0x476408]):[],_0x336e08=_0x2ff83a[_0x212252(0x18d)](_0x44b19c=>String(_0x44b19c));break;case _0x212252(0x1c7):_0x3f679b=_0x3e326a[_0x476408]!==''?JSON[_0x212252(0x13f)](_0x3e326a[_0x476408]):{},_0x26bf65[_0x1f756e]={},VisuMZ[_0x212252(0x31c)](_0x26bf65[_0x1f756e],_0x3f679b);continue;case _0x212252(0x173):_0x2ff83a=_0x3e326a[_0x476408]!==''?JSON[_0x212252(0x13f)](_0x3e326a[_0x476408]):[],_0x336e08=_0x2ff83a['map'](_0x5c712c=>VisuMZ[_0x212252(0x31c)]({},JSON[_0x212252(0x13f)](_0x5c712c)));break;default:continue;}_0x26bf65[_0x1f756e]=_0x336e08;}}return _0x26bf65;},(_0x201810=>{const _0x2ffadb=_0x13ab2e,_0x4d844b=_0x201810[_0x2ffadb(0x145)];for(const _0x338564 of dependencies){if(!Imported[_0x338564]){alert(_0x2ffadb(0x3d9)[_0x2ffadb(0x1da)](_0x4d844b,_0x338564)),SceneManager[_0x2ffadb(0x3b7)]();break;}}const _0x48babe=_0x201810[_0x2ffadb(0x2a2)];if(_0x48babe[_0x2ffadb(0x160)](/\[Version[ ](.*?)\]/i)){const _0x33496d=Number(RegExp['$1']);_0x33496d!==VisuMZ[label][_0x2ffadb(0x38a)]&&(alert(_0x2ffadb(0x324)[_0x2ffadb(0x1da)](_0x4d844b,_0x33496d)),SceneManager[_0x2ffadb(0x3b7)]());}if(_0x48babe[_0x2ffadb(0x160)](/\[Tier[ ](\d+)\]/i)){const _0x2434c6=Number(RegExp['$1']);_0x2434c6<tier?(alert(_0x2ffadb(0x12b)[_0x2ffadb(0x1da)](_0x4d844b,_0x2434c6,tier)),SceneManager['exit']()):tier=Math[_0x2ffadb(0x1cc)](_0x2434c6,tier);}VisuMZ[_0x2ffadb(0x31c)](VisuMZ[label]['Settings'],_0x201810[_0x2ffadb(0x181)]);})(pluginData),PluginManager['registerCommand'](pluginData['name'],_0x13ab2e(0x2fd),_0x357fa5=>{const _0x35dd02=_0x13ab2e;VisuMZ[_0x35dd02(0x31c)](_0x357fa5,_0x357fa5);const _0x4cbe23=_0x357fa5[_0x35dd02(0x393)]||[],_0x1e1d8c=Number(_0x357fa5[_0x35dd02(0x1c6)]),_0x32ce1b=$dataSkills[_0x1e1d8c];if(!_0x32ce1b)return;for(const _0x34e4b6 of _0x4cbe23){const _0x551291=$gameActors[_0x35dd02(0x2cf)](_0x34e4b6);if(!_0x551291)continue;_0x551291[_0x35dd02(0x342)](_0x32ce1b);}}),PluginManager[_0x13ab2e(0x199)](pluginData[_0x13ab2e(0x145)],_0x13ab2e(0x224),_0xca37db=>{const _0xb3d169=_0x13ab2e;VisuMZ[_0xb3d169(0x31c)](_0xca37db,_0xca37db);const _0x1744e1=_0xca37db[_0xb3d169(0x1ec)]||[],_0x26a5ae=Number(_0xca37db[_0xb3d169(0x1c6)]),_0x1ce0ef=$dataSkills[_0x26a5ae];if(!_0x1ce0ef)return;for(const _0x30ff8c of _0x1744e1){const _0xf2db24=$gameTroop[_0xb3d169(0x289)]()[_0x30ff8c];if(!_0xf2db24)continue;_0xf2db24[_0xb3d169(0x342)](_0x1ce0ef);}}),PluginManager[_0x13ab2e(0x199)](pluginData[_0x13ab2e(0x145)],_0x13ab2e(0x188),_0x4dfa50=>{const _0x297f8a=_0x13ab2e;VisuMZ[_0x297f8a(0x31c)](_0x4dfa50,_0x4dfa50);const _0x1eb1f9=_0x4dfa50[_0x297f8a(0x393)]||[],_0x44f02f=Number(_0x4dfa50[_0x297f8a(0x15b)]),_0x48627b=Number(_0x4dfa50['Turns']),_0x19eee2=_0x4dfa50[_0x297f8a(0x22e)];for(const _0x53d6f0 of _0x1eb1f9){const _0x5be141=$gameActors['actor'](_0x53d6f0);if(!_0x5be141)continue;_0x19eee2&&!_0x5be141[_0x297f8a(0x299)](_0x44f02f)?(_0x5be141['addState'](_0x44f02f),_0x5be141[_0x297f8a(0x241)](_0x44f02f,_0x48627b)):_0x5be141[_0x297f8a(0x3c2)](_0x44f02f,_0x48627b);}}),PluginManager[_0x13ab2e(0x199)](pluginData['name'],_0x13ab2e(0x247),_0x2498e4=>{const _0x54ea3b=_0x13ab2e;VisuMZ[_0x54ea3b(0x31c)](_0x2498e4,_0x2498e4);const _0x1f2055=_0x2498e4['ActorIDs']||[],_0x501182=Number(_0x2498e4['StateID']),_0x3e3722=Math[_0x54ea3b(0x1cc)](Number(_0x2498e4[_0x54ea3b(0x167)]),0x0),_0x4acbd4=_0x2498e4[_0x54ea3b(0x22e)];for(const _0x60b352 of _0x1f2055){const _0x2aa0f8=$gameActors[_0x54ea3b(0x2cf)](_0x60b352);if(!_0x2aa0f8)continue;_0x4acbd4&&!_0x2aa0f8[_0x54ea3b(0x299)](_0x501182)&&_0x2aa0f8[_0x54ea3b(0x15d)](_0x501182),_0x2aa0f8[_0x54ea3b(0x241)](_0x501182,_0x3e3722);}}),PluginManager[_0x13ab2e(0x199)](pluginData[_0x13ab2e(0x145)],_0x13ab2e(0x213),_0x49dea2=>{const _0x509fae=_0x13ab2e;if(!$gameParty[_0x509fae(0x2d4)]())return;VisuMZ[_0x509fae(0x31c)](_0x49dea2,_0x49dea2);const _0x404979=_0x49dea2['EnemyIndex']||[],_0x4fb8da=Number(_0x49dea2[_0x509fae(0x15b)]),_0x4e5ac1=Number(_0x49dea2['Turns']),_0x2cd6e6=_0x49dea2[_0x509fae(0x22e)];for(const _0x21395c of _0x404979){const _0x3f94e4=$gameTroop['members']()[_0x21395c];if(!_0x3f94e4)continue;_0x2cd6e6&&!_0x3f94e4[_0x509fae(0x299)](_0x4fb8da)?(_0x3f94e4[_0x509fae(0x15d)](_0x4fb8da),_0x3f94e4[_0x509fae(0x241)](_0x4fb8da,_0x4e5ac1)):_0x3f94e4[_0x509fae(0x3c2)](_0x4fb8da,_0x4e5ac1);}}),PluginManager[_0x13ab2e(0x199)](pluginData[_0x13ab2e(0x145)],_0x13ab2e(0x297),_0x42e120=>{const _0x29c766=_0x13ab2e;if(!$gameParty[_0x29c766(0x2d4)]())return;VisuMZ[_0x29c766(0x31c)](_0x42e120,_0x42e120);const _0xc33236=_0x42e120[_0x29c766(0x1ec)]||[],_0x107be3=Number(_0x42e120[_0x29c766(0x15b)]),_0x46e24b=Math[_0x29c766(0x1cc)](Number(_0x42e120[_0x29c766(0x167)]),0x0),_0x11fff7=_0x42e120[_0x29c766(0x22e)];for(const _0x98a194 of _0xc33236){const _0x118cb8=$gameTroop[_0x29c766(0x289)]()[_0x98a194];if(!_0x118cb8)continue;_0x11fff7&&!_0x118cb8[_0x29c766(0x299)](_0x107be3)&&_0x118cb8['addState'](_0x107be3),_0x118cb8[_0x29c766(0x241)](_0x107be3,_0x46e24b);}}),VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x1ea)]=Scene_Boot[_0x13ab2e(0x2f5)]['onDatabaseLoaded'],Scene_Boot['prototype'][_0x13ab2e(0x245)]=function(){const _0x24bbd8=_0x13ab2e;VisuMZ[_0x24bbd8(0x25d)][_0x24bbd8(0x1ea)]['call'](this),this[_0x24bbd8(0x29b)](),VisuMZ['SkillsStatesCore'][_0x24bbd8(0x3af)]();},Scene_Boot['prototype'][_0x13ab2e(0x29b)]=function(){const _0x1cb3bf=_0x13ab2e;this[_0x1cb3bf(0x20d)]();if(VisuMZ['ParseAllNotetags'])return;this[_0x1cb3bf(0x2df)](),this[_0x1cb3bf(0x2ed)]();},Scene_Boot['prototype']['process_VisuMZ_SkillsStatesCore_Skill_Notetags']=function(){const _0x4f1017=_0x13ab2e;for(const _0x39d746 of $dataSkills){if(!_0x39d746)continue;VisuMZ['SkillsStatesCore']['Parse_Notetags_Skill_Cost'](_0x39d746),VisuMZ[_0x4f1017(0x25d)][_0x4f1017(0x2aa)](_0x39d746),VisuMZ['SkillsStatesCore'][_0x4f1017(0x16a)](_0x39d746);}},Scene_Boot[_0x13ab2e(0x2f5)]['process_VisuMZ_SkillsStatesCore_State_Notetags']=function(){const _0x12b6b4=_0x13ab2e;for(const _0x3541da of $dataStates){if(!_0x3541da)continue;VisuMZ['SkillsStatesCore'][_0x12b6b4(0x2da)](_0x3541da),VisuMZ['SkillsStatesCore'][_0x12b6b4(0x387)](_0x3541da),VisuMZ['SkillsStatesCore'][_0x12b6b4(0x220)](_0x3541da),VisuMZ['SkillsStatesCore'][_0x12b6b4(0x1ab)](_0x3541da);}},VisuMZ['SkillsStatesCore'][_0x13ab2e(0x3c4)]=VisuMZ[_0x13ab2e(0x3c4)],VisuMZ[_0x13ab2e(0x3c4)]=function(_0x32cec7){const _0x55fbcb=_0x13ab2e;VisuMZ[_0x55fbcb(0x25d)][_0x55fbcb(0x3c4)][_0x55fbcb(0x13a)](this,_0x32cec7),VisuMZ[_0x55fbcb(0x25d)]['Parse_Notetags_Skill_Cost'](_0x32cec7),VisuMZ[_0x55fbcb(0x25d)][_0x55fbcb(0x2aa)](_0x32cec7),VisuMZ[_0x55fbcb(0x25d)][_0x55fbcb(0x16a)](_0x32cec7);},VisuMZ[_0x13ab2e(0x25d)]['ParseStateNotetags']=VisuMZ['ParseStateNotetags'],VisuMZ['ParseStateNotetags']=function(_0x6016ff){const _0x3c0f70=_0x13ab2e;VisuMZ['SkillsStatesCore'][_0x3c0f70(0x1e8)][_0x3c0f70(0x13a)](this,_0x6016ff),VisuMZ[_0x3c0f70(0x25d)][_0x3c0f70(0x2da)](_0x6016ff),VisuMZ[_0x3c0f70(0x25d)][_0x3c0f70(0x387)](_0x6016ff),VisuMZ[_0x3c0f70(0x25d)][_0x3c0f70(0x220)](_0x6016ff),VisuMZ[_0x3c0f70(0x25d)][_0x3c0f70(0x1ab)](_0x6016ff);},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x1b0)]=function(_0x1bc9b0){const _0x2a5024=_0x13ab2e,_0x40b348=_0x1bc9b0[_0x2a5024(0x25e)];_0x40b348[_0x2a5024(0x160)](/<MP COST:[ ](\d+)>/i)&&(_0x1bc9b0[_0x2a5024(0x1f7)]=Number(RegExp['$1'])),_0x40b348['match'](/<TP COST:[ ](\d+)>/i)&&(_0x1bc9b0[_0x2a5024(0x33d)]=Number(RegExp['$1']));},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x2aa)]=function(_0xb72465){const _0x7366f9=_0x13ab2e;if(!_0xb72465)return;_0xb72465[_0x7366f9(0x14d)]=0x32;const _0x4dc987=_0xb72465[_0x7366f9(0x25e)]||'';_0x4dc987['match'](/<(?:|ID )SORT(?:|ING)[ ]PRIORITY:[ ](\d+)>/i)&&(_0xb72465['sortPriority']=Number(RegExp['$1']));},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x2ff)]={},VisuMZ['SkillsStatesCore'][_0x13ab2e(0x237)]={},VisuMZ[_0x13ab2e(0x25d)]['Parse_Notetags_Skill_JS']=function(_0x5049fc){const _0x4bb568=_0x13ab2e,_0x3af2c2=_0x5049fc[_0x4bb568(0x25e)];if(_0x3af2c2[_0x4bb568(0x160)](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x1e5de1=String(RegExp['$1']),_0x21271d=_0x4bb568(0x1d6)['format'](_0x1e5de1);VisuMZ[_0x4bb568(0x25d)][_0x4bb568(0x2ff)][_0x5049fc['id']]=new Function(_0x4bb568(0x3bc),_0x21271d);}if(_0x3af2c2[_0x4bb568(0x160)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x4d5ca4=String(RegExp['$1']),_0x47279f=_0x4bb568(0x371)[_0x4bb568(0x1da)](_0x4d5ca4);VisuMZ[_0x4bb568(0x25d)][_0x4bb568(0x237)][_0x5049fc['id']]=new Function(_0x4bb568(0x3bc),_0x47279f);}},VisuMZ['SkillsStatesCore']['Parse_Notetags_State_Category']=function(_0x31b9b9){const _0x58f88c=_0x13ab2e;_0x31b9b9['categories']=[_0x58f88c(0x31b),_0x58f88c(0x22f)];const _0x2cf9d0=_0x31b9b9['note'],_0x120889=_0x2cf9d0[_0x58f88c(0x160)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x120889)for(const _0x3b8226 of _0x120889){_0x3b8226[_0x58f88c(0x160)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x64b6b1=String(RegExp['$1'])[_0x58f88c(0x30c)]()['trim']()[_0x58f88c(0x1f1)](',');for(const _0x16d836 of _0x64b6b1){_0x31b9b9[_0x58f88c(0x1f3)][_0x58f88c(0x1e6)](_0x16d836[_0x58f88c(0x313)]());}}if(_0x2cf9d0[_0x58f88c(0x160)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x36105d=RegExp['$1'][_0x58f88c(0x1f1)](/[\r\n]+/);for(const _0x32c1ec of _0x36105d){_0x31b9b9[_0x58f88c(0x1f3)][_0x58f88c(0x1e6)](_0x32c1ec['toUpperCase']()[_0x58f88c(0x313)]());}}_0x2cf9d0[_0x58f88c(0x160)](/<POSITIVE STATE>/i)&&_0x31b9b9[_0x58f88c(0x1f3)]['push']('POSITIVE'),_0x2cf9d0[_0x58f88c(0x160)](/<NEGATIVE STATE>/i)&&_0x31b9b9[_0x58f88c(0x1f3)][_0x58f88c(0x1e6)]('NEGATIVE');},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x262)]={},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x387)]=function(_0x4ed014){const _0x449491=_0x13ab2e,_0x26b57b=_0x4ed014[_0x449491(0x25e)];if(_0x26b57b['match'](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x47ce29=String(RegExp['$1']),_0x425fe9=_0x449491(0x3d4)['format'](_0x47ce29);VisuMZ[_0x449491(0x25d)][_0x449491(0x262)][_0x4ed014['id']]=new Function(_0x449491(0x38c),_0x425fe9);}},VisuMZ['SkillsStatesCore'][_0x13ab2e(0x163)]={},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x3bb)]={},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x312)]={},VisuMZ['SkillsStatesCore']['stateMpSlipHealJS']={},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x3aa)]={},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x3ce)]={},VisuMZ[_0x13ab2e(0x25d)]['Parse_Notetags_State_SlipEffectJS']=function(_0x57cd60){const _0xd895a7=_0x13ab2e,_0x18fdb8=_0x57cd60[_0xd895a7(0x25e)],_0x5456df=_0xd895a7(0x293);if(_0x18fdb8[_0xd895a7(0x160)](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0x1ff262=String(RegExp['$1']),_0x16eb6d=_0x5456df['format'](_0x1ff262,_0xd895a7(0x3d6),-0x1,'slipHp');VisuMZ[_0xd895a7(0x25d)][_0xd895a7(0x163)][_0x57cd60['id']]=new Function(_0xd895a7(0x285),_0x16eb6d);}else{if(_0x18fdb8[_0xd895a7(0x160)](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0x9c7a5b=String(RegExp['$1']),_0x1ec9d5=_0x5456df[_0xd895a7(0x1da)](_0x9c7a5b,'heal',0x1,_0xd895a7(0x355));VisuMZ[_0xd895a7(0x25d)][_0xd895a7(0x3bb)][_0x57cd60['id']]=new Function(_0xd895a7(0x285),_0x1ec9d5);}}if(_0x18fdb8[_0xd895a7(0x160)](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){const _0x3657a7=String(RegExp['$1']),_0x482d63=_0x5456df['format'](_0x3657a7,'damage',-0x1,_0xd895a7(0x38e));VisuMZ[_0xd895a7(0x25d)][_0xd895a7(0x312)][_0x57cd60['id']]=new Function(_0xd895a7(0x285),_0x482d63);}else{if(_0x18fdb8[_0xd895a7(0x160)](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){const _0x327085=String(RegExp['$1']),_0x493af4=_0x5456df[_0xd895a7(0x1da)](_0x327085,_0xd895a7(0x3d8),0x1,_0xd895a7(0x38e));VisuMZ[_0xd895a7(0x25d)][_0xd895a7(0x2b9)][_0x57cd60['id']]=new Function(_0xd895a7(0x285),_0x493af4);}}if(_0x18fdb8[_0xd895a7(0x160)](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){const _0xe3074e=String(RegExp['$1']),_0x4bba7c=_0x5456df[_0xd895a7(0x1da)](_0xe3074e,_0xd895a7(0x3d6),-0x1,_0xd895a7(0x2b7));VisuMZ[_0xd895a7(0x25d)][_0xd895a7(0x3aa)][_0x57cd60['id']]=new Function('stateId',_0x4bba7c);}else{if(_0x18fdb8[_0xd895a7(0x160)](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){const _0x34b3b4=String(RegExp['$1']),_0x328bf4=_0x5456df[_0xd895a7(0x1da)](_0x34b3b4,_0xd895a7(0x3d8),0x1,'slipTp');VisuMZ['SkillsStatesCore'][_0xd895a7(0x3ce)][_0x57cd60['id']]=new Function('stateId',_0x328bf4);}}},VisuMZ[_0x13ab2e(0x25d)]['stateAddJS']={},VisuMZ[_0x13ab2e(0x25d)]['stateEraseJS']={},VisuMZ['SkillsStatesCore']['stateExpireJS']={},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x1ab)]=function(_0x370c39){const _0x14aba2=_0x13ab2e,_0x73b39f=_0x370c39[_0x14aba2(0x25e)],_0xc92f45=_0x14aba2(0x34c);if(_0x73b39f['match'](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0x5037bf=String(RegExp['$1']),_0x10839c=_0xc92f45[_0x14aba2(0x1da)](_0x5037bf);VisuMZ['SkillsStatesCore']['stateAddJS'][_0x370c39['id']]=new Function(_0x14aba2(0x285),_0x10839c);}if(_0x73b39f[_0x14aba2(0x160)](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x52d440=String(RegExp['$1']),_0x5de462=_0xc92f45['format'](_0x52d440);VisuMZ['SkillsStatesCore']['stateEraseJS'][_0x370c39['id']]=new Function(_0x14aba2(0x285),_0x5de462);}if(_0x73b39f['match'](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0x30d53b=String(RegExp['$1']),_0x5c00a4=_0xc92f45[_0x14aba2(0x1da)](_0x30d53b);VisuMZ[_0x14aba2(0x25d)]['stateExpireJS'][_0x370c39['id']]=new Function(_0x14aba2(0x285),_0x5c00a4);}},VisuMZ['SkillsStatesCore'][_0x13ab2e(0x3af)]=function(){const _0x58a368=_0x13ab2e;if(!VisuMZ[_0x58a368(0x25d)][_0x58a368(0x1dc)][_0x58a368(0x2b2)]['ActionEndUpdate'])return;for(const _0x43fcc6 of $dataStates){if(!_0x43fcc6)continue;_0x43fcc6[_0x58a368(0x29c)]===0x4&&_0x43fcc6[_0x58a368(0x3e2)]===0x1&&(_0x43fcc6[_0x58a368(0x3e2)]=0x2);}},VisuMZ[_0x13ab2e(0x25d)]['createKeyJS']=function(_0x1c3528,_0x1e1511){const _0x789d94=_0x13ab2e;if(VisuMZ['createKeyJS'])return VisuMZ[_0x789d94(0x171)](_0x1c3528,_0x1e1511);let _0x5a30fc='';if($dataActors[_0x789d94(0x284)](_0x1c3528))_0x5a30fc=_0x789d94(0x2fe)['format'](_0x1c3528['id'],_0x1e1511);if($dataClasses['includes'](_0x1c3528))_0x5a30fc='Class-%1-%2'[_0x789d94(0x1da)](_0x1c3528['id'],_0x1e1511);if($dataSkills['includes'](_0x1c3528))_0x5a30fc=_0x789d94(0x1ed)[_0x789d94(0x1da)](_0x1c3528['id'],_0x1e1511);if($dataItems[_0x789d94(0x284)](_0x1c3528))_0x5a30fc=_0x789d94(0x172)[_0x789d94(0x1da)](_0x1c3528['id'],_0x1e1511);if($dataWeapons['includes'](_0x1c3528))_0x5a30fc='Weapon-%1-%2'['format'](_0x1c3528['id'],_0x1e1511);if($dataArmors[_0x789d94(0x284)](_0x1c3528))_0x5a30fc=_0x789d94(0x14b)[_0x789d94(0x1da)](_0x1c3528['id'],_0x1e1511);if($dataEnemies['includes'](_0x1c3528))_0x5a30fc='Enemy-%1-%2'[_0x789d94(0x1da)](_0x1c3528['id'],_0x1e1511);if($dataStates[_0x789d94(0x284)](_0x1c3528))_0x5a30fc='State-%1-%2'[_0x789d94(0x1da)](_0x1c3528['id'],_0x1e1511);return _0x5a30fc;},DataManager[_0x13ab2e(0x3e7)]=function(_0x3bb5ea){const _0x19998f=_0x13ab2e;_0x3bb5ea=_0x3bb5ea[_0x19998f(0x30c)]()['trim'](),this[_0x19998f(0x1bb)]=this[_0x19998f(0x1bb)]||{};if(this['_classIDs'][_0x3bb5ea])return this[_0x19998f(0x1bb)][_0x3bb5ea];for(const _0x47ac36 of $dataClasses){if(!_0x47ac36)continue;let _0x227937=_0x47ac36[_0x19998f(0x145)];_0x227937=_0x227937['replace'](/\x1I\[(\d+)\]/gi,''),_0x227937=_0x227937[_0x19998f(0x1ee)](/\\I\[(\d+)\]/gi,''),this[_0x19998f(0x1bb)][_0x227937[_0x19998f(0x30c)]()[_0x19998f(0x313)]()]=_0x47ac36['id'];}return this[_0x19998f(0x1bb)][_0x3bb5ea]||0x0;},DataManager[_0x13ab2e(0x24b)]=function(_0x5609e6){const _0x1cdb25=_0x13ab2e;this[_0x1cdb25(0x2f6)]=this[_0x1cdb25(0x2f6)]||{};if(this[_0x1cdb25(0x2f6)][_0x5609e6['id']])return this['_stypeIDs'][_0x5609e6['id']];this[_0x1cdb25(0x2f6)][_0x5609e6['id']]=[_0x5609e6[_0x1cdb25(0x14a)]];if(_0x5609e6[_0x1cdb25(0x25e)][_0x1cdb25(0x160)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x432084=JSON[_0x1cdb25(0x13f)]('['+RegExp['$1'][_0x1cdb25(0x160)](/\d+/g)+']');this[_0x1cdb25(0x2f6)][_0x5609e6['id']]=this[_0x1cdb25(0x2f6)][_0x5609e6['id']][_0x1cdb25(0x3db)](_0x432084);}else{if(_0x5609e6[_0x1cdb25(0x25e)]['match'](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x28fa0d=RegExp['$1'][_0x1cdb25(0x1f1)](',');for(const _0x473fa5 of _0x28fa0d){const _0xa13e93=DataManager[_0x1cdb25(0x2d3)](_0x473fa5);if(_0xa13e93)this['_stypeIDs'][_0x5609e6['id']][_0x1cdb25(0x1e6)](_0xa13e93);}}}return this[_0x1cdb25(0x2f6)][_0x5609e6['id']];},DataManager[_0x13ab2e(0x2d3)]=function(_0x3d55f6){const _0x4a22cb=_0x13ab2e;_0x3d55f6=_0x3d55f6[_0x4a22cb(0x30c)]()['trim'](),this[_0x4a22cb(0x2f6)]=this[_0x4a22cb(0x2f6)]||{};if(this[_0x4a22cb(0x2f6)][_0x3d55f6])return this['_stypeIDs'][_0x3d55f6];for(let _0x2635aa=0x1;_0x2635aa<0x64;_0x2635aa++){if(!$dataSystem[_0x4a22cb(0x2f1)][_0x2635aa])continue;let _0x4dea75=$dataSystem[_0x4a22cb(0x2f1)][_0x2635aa][_0x4a22cb(0x30c)]()[_0x4a22cb(0x313)]();_0x4dea75=_0x4dea75[_0x4a22cb(0x1ee)](/\x1I\[(\d+)\]/gi,''),_0x4dea75=_0x4dea75['replace'](/\\I\[(\d+)\]/gi,''),this[_0x4a22cb(0x2f6)][_0x4dea75]=_0x2635aa;}return this[_0x4a22cb(0x2f6)][_0x3d55f6]||0x0;},DataManager[_0x13ab2e(0x330)]=function(_0x559fac){const _0x288d6e=_0x13ab2e;_0x559fac=_0x559fac[_0x288d6e(0x30c)]()[_0x288d6e(0x313)](),this[_0x288d6e(0x3f6)]=this['_skillIDs']||{};if(this['_skillIDs'][_0x559fac])return this['_skillIDs'][_0x559fac];for(const _0x36a8e1 of $dataSkills){if(!_0x36a8e1)continue;this[_0x288d6e(0x3f6)][_0x36a8e1[_0x288d6e(0x145)]['toUpperCase']()['trim']()]=_0x36a8e1['id'];}return this['_skillIDs'][_0x559fac]||0x0;},DataManager[_0x13ab2e(0x2cc)]=function(_0x3c9336){const _0x8fc849=_0x13ab2e;_0x3c9336=_0x3c9336[_0x8fc849(0x30c)]()[_0x8fc849(0x313)](),this[_0x8fc849(0x383)]=this['_stateIDs']||{};if(this[_0x8fc849(0x383)][_0x3c9336])return this['_stateIDs'][_0x3c9336];for(const _0x18cf6a of $dataStates){if(!_0x18cf6a)continue;this[_0x8fc849(0x383)][_0x18cf6a['name']['toUpperCase']()['trim']()]=_0x18cf6a['id'];}return this[_0x8fc849(0x383)][_0x3c9336]||0x0;},DataManager[_0x13ab2e(0x20e)]=function(_0x517001){const _0x110f9c=_0x13ab2e;this[_0x110f9c(0x139)]=this[_0x110f9c(0x139)]||{};if(this[_0x110f9c(0x139)][_0x517001])return this[_0x110f9c(0x139)][_0x517001];return $dataStates[_0x517001][_0x110f9c(0x25e)][_0x110f9c(0x160)](/<MAX TURNS:[ ](\d+)>/i)?this[_0x110f9c(0x139)][_0x517001]=Number(RegExp['$1']):this[_0x110f9c(0x139)][_0x517001]=VisuMZ[_0x110f9c(0x25d)][_0x110f9c(0x1dc)][_0x110f9c(0x2b2)][_0x110f9c(0x385)],this[_0x110f9c(0x139)][_0x517001];},DataManager[_0x13ab2e(0x3ca)]=function(_0x7b7570){const _0x3971aa=_0x13ab2e;if(!_0x7b7570)return{};this['_skillChangesFromState']=this[_0x3971aa(0x397)]||{};if(this[_0x3971aa(0x397)][_0x7b7570['id']]!==undefined)return this[_0x3971aa(0x397)][_0x7b7570['id']];const _0x4b2822=_0x7b7570['note']||'',_0x3133e1={};{const _0x3defc4=_0x4b2822[_0x3971aa(0x160)](/<SKILL CHANGE(?:|S):[ ](.*)[ ]>>>[ ](.*)>/gi);if(_0x3defc4)for(const _0x5833fb of _0x3defc4){_0x5833fb[_0x3971aa(0x160)](/<SKILL CHANGE(?:|S):[ ](.*)[ ]>>>[ ](.*)>/gi);let _0x3a31f7=String(RegExp['$1']),_0x596ec8=String(RegExp['$2']);VisuMZ[_0x3971aa(0x25d)][_0x3971aa(0x1f9)](_0x3133e1,_0x3a31f7,_0x596ec8);}}if(_0x4b2822[_0x3971aa(0x160)](/<SKILL CHANGE(?:|S)>\s*([\s\S]*)\s*<\/SKILL CHANGE(?:|S)>/i)){const _0x415d3e=String(RegExp['$1'])['split'](/[\r\n]+/)['remove']('');for(const _0x9a1439 of _0x415d3e){if(_0x9a1439[_0x3971aa(0x160)](/(.*)[ ]>>>[ ](.*)/i)){let _0x117980=String(RegExp['$1']),_0x5e0888=String(RegExp['$2']);VisuMZ[_0x3971aa(0x25d)][_0x3971aa(0x1f9)](_0x3133e1,_0x117980,_0x5e0888);}}}return this[_0x3971aa(0x397)][_0x7b7570['id']]=_0x3133e1,this[_0x3971aa(0x397)][_0x7b7570['id']];},VisuMZ[_0x13ab2e(0x25d)]['ParseSkillChangessIntoData']=function(_0x2631a4,_0x3a000a,_0x3cbca3){const _0x3f5cc1=_0x13ab2e;/^\d+$/['test'](_0x3a000a)?_0x3a000a=Number(_0x3a000a):_0x3a000a=DataManager[_0x3f5cc1(0x330)](_0x3a000a),/^\d+$/[_0x3f5cc1(0x274)](_0x3cbca3)?_0x3cbca3=Number(_0x3cbca3):_0x3cbca3=DataManager[_0x3f5cc1(0x330)](_0x3cbca3),_0x2631a4[_0x3a000a]=_0x3cbca3;},ColorManager[_0x13ab2e(0x358)]=function(_0x46a370,_0x420fbb){const _0x5de740=_0x13ab2e;return _0x420fbb=String(_0x420fbb),this[_0x5de740(0x331)]=this[_0x5de740(0x331)]||{},_0x420fbb['match'](/#(.*)/i)?this[_0x5de740(0x331)][_0x46a370]=_0x5de740(0x376)[_0x5de740(0x1da)](String(RegExp['$1'])):this[_0x5de740(0x331)][_0x46a370]=this[_0x5de740(0x1e4)](Number(_0x420fbb)),this[_0x5de740(0x331)][_0x46a370];},ColorManager[_0x13ab2e(0x282)]=function(_0x3351a0){const _0x2e3dc6=_0x13ab2e;return _0x3351a0=String(_0x3351a0),_0x3351a0[_0x2e3dc6(0x160)](/#(.*)/i)?_0x2e3dc6(0x376)[_0x2e3dc6(0x1da)](String(RegExp['$1'])):this[_0x2e3dc6(0x1e4)](Number(_0x3351a0));},ColorManager['stateColor']=function(_0x17f24d){const _0xc2dff1=_0x13ab2e;if(typeof _0x17f24d==='number')_0x17f24d=$dataStates[_0x17f24d];const _0x45f24a=_0xc2dff1(0x25a)[_0xc2dff1(0x1da)](_0x17f24d['id']);this[_0xc2dff1(0x331)]=this['_colorCache']||{};if(this['_colorCache'][_0x45f24a])return this[_0xc2dff1(0x331)][_0x45f24a];const _0x1834d2=this[_0xc2dff1(0x35d)](_0x17f24d);return this[_0xc2dff1(0x358)](_0x45f24a,_0x1834d2);},ColorManager[_0x13ab2e(0x35d)]=function(_0x4f7b47){const _0x11e3bf=_0x13ab2e,_0x4802f0=_0x4f7b47[_0x11e3bf(0x25e)];if(_0x4802f0[_0x11e3bf(0x160)](/<TURN COLOR:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x4802f0['match'](/<POSITIVE STATE>/i))return VisuMZ['SkillsStatesCore'][_0x11e3bf(0x1dc)][_0x11e3bf(0x2b2)][_0x11e3bf(0x2de)];else return _0x4802f0['match'](/<NEGATIVE STATE>/i)?VisuMZ['SkillsStatesCore'][_0x11e3bf(0x1dc)][_0x11e3bf(0x2b2)][_0x11e3bf(0x339)]:VisuMZ[_0x11e3bf(0x25d)][_0x11e3bf(0x1dc)][_0x11e3bf(0x2b2)][_0x11e3bf(0x246)];}},ColorManager[_0x13ab2e(0x360)]=function(){const _0x1e5bb4=_0x13ab2e,_0x3de467=_0x1e5bb4(0x228);this[_0x1e5bb4(0x331)]=this[_0x1e5bb4(0x331)]||{};if(this['_colorCache'][_0x3de467])return this[_0x1e5bb4(0x331)][_0x3de467];const _0x6ef602=VisuMZ[_0x1e5bb4(0x25d)][_0x1e5bb4(0x1dc)]['Buffs']['ColorBuff'];return this[_0x1e5bb4(0x358)](_0x3de467,_0x6ef602);},ColorManager['debuffColor']=function(){const _0x1ca13e=_0x13ab2e,_0x182e6e=_0x1ca13e(0x2e1);this['_colorCache']=this[_0x1ca13e(0x331)]||{};if(this['_colorCache'][_0x182e6e])return this['_colorCache'][_0x182e6e];const _0x2fd5f6=VisuMZ[_0x1ca13e(0x25d)][_0x1ca13e(0x1dc)][_0x1ca13e(0x370)][_0x1ca13e(0x212)];return this[_0x1ca13e(0x358)](_0x182e6e,_0x2fd5f6);},SceneManager[_0x13ab2e(0x29a)]=function(){const _0x45b2a0=_0x13ab2e;return this[_0x45b2a0(0x175)]&&this['_scene'][_0x45b2a0(0x2e5)]===Scene_Battle;},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x225)]=BattleManager[_0x13ab2e(0x366)],BattleManager[_0x13ab2e(0x366)]=function(){const _0x1306b1=_0x13ab2e;this[_0x1306b1(0x271)](),VisuMZ[_0x1306b1(0x25d)][_0x1306b1(0x225)]['call'](this);},BattleManager['updateStatesActionEnd']=function(){const _0x550ca4=_0x13ab2e,_0x20cf8e=VisuMZ[_0x550ca4(0x25d)]['Settings'][_0x550ca4(0x2b2)];if(!_0x20cf8e)return;if(_0x20cf8e[_0x550ca4(0x185)]===![])return;if(!this[_0x550ca4(0x2f8)])return;this[_0x550ca4(0x2f8)][_0x550ca4(0x271)]();},Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x271)]=function(){const _0x1f8a28=_0x13ab2e;if(BattleManager['_phase']!==_0x1f8a28(0x162))return;if(this['_lastStatesActionEndFrameCount']===Graphics['frameCount'])return;this[_0x1f8a28(0x21c)]=Graphics[_0x1f8a28(0x2ac)];for(const _0x51b77b of this['_states']){const _0x130370=$dataStates[_0x51b77b];if(!_0x130370)continue;if(_0x130370[_0x1f8a28(0x3e2)]!==0x1)continue;this['_stateTurns'][_0x51b77b]>0x0&&this[_0x1f8a28(0x1ad)][_0x51b77b]--;}this[_0x1f8a28(0x24a)](0x1);},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x28e)]=function(){const _0x1e3065=_0x13ab2e,_0x503dad=VisuMZ[_0x1e3065(0x25d)][_0x1e3065(0x1dc)]['States'];for(const _0x15da72 of this[_0x1e3065(0x396)]){const _0x74a9ed=$dataStates[_0x15da72];if(_0x503dad&&_0x503dad[_0x1e3065(0x185)]!==![]){if(_0x74a9ed&&_0x74a9ed['autoRemovalTiming']===0x1)continue;}this['_stateTurns'][_0x15da72]>0x0&&this[_0x1e3065(0x1ad)][_0x15da72]--;}},VisuMZ['SkillsStatesCore'][_0x13ab2e(0x3e8)]=Game_Switches[_0x13ab2e(0x2f5)][_0x13ab2e(0x219)],Game_Switches[_0x13ab2e(0x2f5)]['onChange']=function(){const _0x5e681e=_0x13ab2e;VisuMZ[_0x5e681e(0x25d)][_0x5e681e(0x3e8)]['call'](this);const _0x472eb4=VisuMZ['SkillsStatesCore'][_0x5e681e(0x1dc)]['PassiveStates'][_0x5e681e(0x392)]??!![];if(!_0x472eb4)return;if(SceneManager[_0x5e681e(0x29a)]())for(const _0x45cea9 of BattleManager[_0x5e681e(0x2d0)]()){if(_0x45cea9)_0x45cea9[_0x5e681e(0x3f0)]();}},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x136)]=Game_Variables[_0x13ab2e(0x2f5)][_0x13ab2e(0x219)],Game_Variables[_0x13ab2e(0x2f5)][_0x13ab2e(0x219)]=function(){const _0x3ee77b=_0x13ab2e;VisuMZ['SkillsStatesCore'][_0x3ee77b(0x136)]['call'](this);const _0x292e12=VisuMZ[_0x3ee77b(0x25d)][_0x3ee77b(0x1dc)][_0x3ee77b(0x2b3)][_0x3ee77b(0x1c2)]??!![];if(!_0x292e12)return;if(SceneManager[_0x3ee77b(0x29a)]())for(const _0x150298 of BattleManager['allBattleMembers']()){if(_0x150298)_0x150298[_0x3ee77b(0x3f0)]();}},VisuMZ[_0x13ab2e(0x25d)]['Game_Action_applyItemUserEffect']=Game_Action[_0x13ab2e(0x2f5)][_0x13ab2e(0x394)],Game_Action[_0x13ab2e(0x2f5)][_0x13ab2e(0x394)]=function(_0x158d6a){const _0x282f26=_0x13ab2e;VisuMZ[_0x282f26(0x25d)][_0x282f26(0x25c)][_0x282f26(0x13a)](this,_0x158d6a),this[_0x282f26(0x2b6)](_0x158d6a);},Game_Action['prototype'][_0x13ab2e(0x2b6)]=function(_0x366a2a){const _0x220df4=_0x13ab2e;this[_0x220df4(0x352)](_0x366a2a),this[_0x220df4(0x252)](_0x366a2a),this[_0x220df4(0x13d)](_0x366a2a),this['applyDebuffTurnManipulationEffects'](_0x366a2a);},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x39e)]=Game_Action['prototype']['testApply'],Game_Action['prototype']['testApply']=function(_0x25b9ad){const _0x4c4c30=_0x13ab2e;if(this[_0x4c4c30(0x13e)](_0x25b9ad))return!![];return VisuMZ[_0x4c4c30(0x25d)][_0x4c4c30(0x39e)]['call'](this,_0x25b9ad);},Game_Action['prototype']['testSkillStatesCoreNotetags']=function(_0xcc0341){const _0x39fac0=_0x13ab2e;if(!this[_0x39fac0(0x1b7)]())return;const _0x543897=this[_0x39fac0(0x1b7)]()['note'];if(_0x543897[_0x39fac0(0x160)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){const _0xb20f02=String(RegExp['$1']);if(_0xcc0341[_0x39fac0(0x32b)](_0xb20f02))return!![];}if(_0x543897['match'](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){const _0x3af186=Number(RegExp['$1']);if(_0xcc0341[_0x39fac0(0x299)](_0x3af186))return!![];}else{if(_0x543897[_0x39fac0(0x160)](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){const _0x39fc71=DataManager[_0x39fac0(0x2cc)](RegExp['$1']);if(_0xcc0341[_0x39fac0(0x299)](_0x39fc71))return!![];}}return![];},Game_Action[_0x13ab2e(0x2f5)][_0x13ab2e(0x352)]=function(_0x268de3){const _0x598f74=_0x13ab2e;if(_0x268de3[_0x598f74(0x2be)]()[_0x598f74(0x34f)]<=0x0)return;const _0x1e5c49=this[_0x598f74(0x1b7)]()[_0x598f74(0x25e)];{const _0x49b4bb=_0x1e5c49[_0x598f74(0x160)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/gi);if(_0x49b4bb)for(const _0x5a0bbf of _0x49b4bb){_0x5a0bbf[_0x598f74(0x160)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0x3a11b1=String(RegExp['$1']);_0x268de3[_0x598f74(0x372)](_0x3a11b1);}}{const _0x2c5305=_0x1e5c49['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x2c5305)for(const _0x3e1825 of _0x2c5305){_0x3e1825[_0x598f74(0x160)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x6a0552=String(RegExp['$1']),_0x49f0a1=Number(RegExp['$2']);_0x268de3[_0x598f74(0x15e)](_0x6a0552,_0x49f0a1);}}},Game_Action[_0x13ab2e(0x2f5)][_0x13ab2e(0x252)]=function(_0x2f2a44){const _0x315051=_0x13ab2e,_0x5bce67=this[_0x315051(0x1b7)]()[_0x315051(0x25e)],_0x11cfdc=_0x5bce67['match'](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x11cfdc)for(const _0x6ffa66 of _0x11cfdc){let _0x43456c=0x0,_0x50f066=0x0;if(_0x6ffa66[_0x315051(0x160)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x43456c=Number(RegExp['$1']),_0x50f066=Number(RegExp['$2']);else _0x6ffa66[_0x315051(0x160)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x43456c=DataManager['getStateIdWithName'](RegExp['$1']),_0x50f066=Number(RegExp['$2']));_0x2f2a44['setStateTurns'](_0x43456c,_0x50f066),this[_0x315051(0x2c9)](_0x2f2a44);}const _0x3efff1=_0x5bce67[_0x315051(0x160)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x3efff1)for(const _0x175f4a of _0x3efff1){let _0x20e741=0x0,_0x4e38bc=0x0;if(_0x175f4a['match'](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x20e741=Number(RegExp['$1']),_0x4e38bc=Number(RegExp['$2']);else _0x175f4a['match'](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x20e741=DataManager[_0x315051(0x2cc)](RegExp['$1']),_0x4e38bc=Number(RegExp['$2']));_0x2f2a44[_0x315051(0x3c2)](_0x20e741,_0x4e38bc),this[_0x315051(0x2c9)](_0x2f2a44);}},Game_Action['prototype'][_0x13ab2e(0x13d)]=function(_0x5f4548){const _0x100759=_0x13ab2e,_0x34c69c=[_0x100759(0x27c),_0x100759(0x29f),_0x100759(0x23c),'DEF',_0x100759(0x1d8),_0x100759(0x147),_0x100759(0x1d2),'LUK'],_0x5cdc2e=this[_0x100759(0x1b7)]()[_0x100759(0x25e)],_0x3517d6=_0x5cdc2e[_0x100759(0x160)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x3517d6)for(const _0x48052e of _0x3517d6){_0x48052e['match'](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x4c301f=_0x34c69c[_0x100759(0x261)](String(RegExp['$1'])[_0x100759(0x30c)]()),_0x5e53a0=Number(RegExp['$2']);_0x4c301f>=0x0&&(_0x5f4548[_0x100759(0x3e5)](_0x4c301f,_0x5e53a0),this[_0x100759(0x2c9)](_0x5f4548));}const _0x391dc0=_0x5cdc2e[_0x100759(0x160)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x391dc0)for(const _0x3852e7 of _0x3517d6){_0x3852e7['match'](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x23d4a8=_0x34c69c[_0x100759(0x261)](String(RegExp['$1'])[_0x100759(0x30c)]()),_0x1dda32=Number(RegExp['$2']);_0x23d4a8>=0x0&&(_0x5f4548['addBuffTurns'](_0x23d4a8,_0x1dda32),this[_0x100759(0x2c9)](_0x5f4548));}},Game_Action['prototype'][_0x13ab2e(0x3b5)]=function(_0x4bbf44){const _0x4759a5=_0x13ab2e,_0x386060=[_0x4759a5(0x27c),_0x4759a5(0x29f),_0x4759a5(0x23c),_0x4759a5(0x1a8),_0x4759a5(0x1d8),'MDF',_0x4759a5(0x1d2),'LUK'],_0x5556ea=this[_0x4759a5(0x1b7)]()['note'],_0x1a9812=_0x5556ea[_0x4759a5(0x160)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x1a9812)for(const _0x103e64 of _0x1a9812){_0x103e64['match'](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x5ec311=_0x386060[_0x4759a5(0x261)](String(RegExp['$1'])[_0x4759a5(0x30c)]()),_0x134fb2=Number(RegExp['$2']);_0x5ec311>=0x0&&(_0x4bbf44[_0x4759a5(0x31f)](_0x5ec311,_0x134fb2),this[_0x4759a5(0x2c9)](_0x4bbf44));}const _0x319767=_0x5556ea[_0x4759a5(0x160)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x319767)for(const _0x44049d of _0x1a9812){_0x44049d[_0x4759a5(0x160)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x23c831=_0x386060[_0x4759a5(0x261)](String(RegExp['$1'])['toUpperCase']()),_0x57151a=Number(RegExp['$2']);_0x23c831>=0x0&&(_0x4bbf44[_0x4759a5(0x29e)](_0x23c831,_0x57151a),this[_0x4759a5(0x2c9)](_0x4bbf44));}},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x3e6)]=Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x146)],Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x146)]=function(){const _0xbe120a=_0x13ab2e;this[_0xbe120a(0x3f5)]={},this[_0xbe120a(0x149)](),VisuMZ['SkillsStatesCore'][_0xbe120a(0x3e6)][_0xbe120a(0x13a)](this);},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x149)]=function(){const _0x5173ea=_0x13ab2e;this[_0x5173ea(0x3fd)]='',this['_stateData']={},this[_0x5173ea(0x23e)]={},this['_stateOrigin']={};},Game_BattlerBase['prototype'][_0x13ab2e(0x2f2)]=function(_0x57e80b){const _0x409735=_0x13ab2e;return this[_0x409735(0x3f5)]=this['_cache']||{},this[_0x409735(0x3f5)][_0x57e80b]!==undefined;},VisuMZ[_0x13ab2e(0x25d)]['Game_BattlerBase_refresh']=Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x3f0)],Game_BattlerBase['prototype']['refresh']=function(){const _0x3ca156=_0x13ab2e;this[_0x3ca156(0x3f5)]={},VisuMZ[_0x3ca156(0x25d)][_0x3ca156(0x1fe)][_0x3ca156(0x13a)](this);},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x1c8)]=Game_BattlerBase[_0x13ab2e(0x2f5)]['eraseState'],Game_BattlerBase['prototype'][_0x13ab2e(0x400)]=function(_0x590243){const _0x42cafa=_0x13ab2e;let _0x2ceeb2=this[_0x42cafa(0x299)](_0x590243);VisuMZ[_0x42cafa(0x25d)]['Game_BattlerBase_eraseState'][_0x42cafa(0x13a)](this,_0x590243);if(_0x2ceeb2&&!this[_0x42cafa(0x299)](_0x590243))this['onRemoveState'](_0x590243);},Game_BattlerBase[_0x13ab2e(0x2f5)]['onRemoveState']=function(_0x510cdf){const _0x1c325c=_0x13ab2e;this['clearStateData'](_0x510cdf),this[_0x1c325c(0x367)](_0x510cdf);},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x36b)]=Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x32d)],Game_Battler[_0x13ab2e(0x2f5)]['onBattleEnd']=function(){const _0x596575=_0x13ab2e;VisuMZ[_0x596575(0x25d)][_0x596575(0x36b)][_0x596575(0x13a)](this),this[_0x596575(0x17d)]();},VisuMZ[_0x13ab2e(0x25d)]['Game_BattlerBase_resetStateCounts']=Game_BattlerBase['prototype'][_0x13ab2e(0x3a2)],Game_BattlerBase[_0x13ab2e(0x2f5)]['resetStateCounts']=function(_0x2bca34){const _0x32506a=_0x13ab2e,_0x49ad80=$dataStates[_0x2bca34],_0x377c69=this['stateTurns'](_0x2bca34),_0x1e4060=this[_0x32506a(0x2ce)](_0x49ad80)['toLowerCase']()[_0x32506a(0x313)]();switch(_0x1e4060){case _0x32506a(0x2b5):if(_0x377c69<=0x0)this['prepareResetStateCounts'](_0x2bca34);break;case _0x32506a(0x1bd):this[_0x32506a(0x332)](_0x2bca34);break;case _0x32506a(0x1b9):this['prepareResetStateCounts'](_0x2bca34),this[_0x32506a(0x1ad)][_0x2bca34]=Math[_0x32506a(0x1cc)](this[_0x32506a(0x1ad)][_0x2bca34],_0x377c69);break;case _0x32506a(0x140):this[_0x32506a(0x332)](_0x2bca34),this['_stateTurns'][_0x2bca34]+=_0x377c69;break;default:this[_0x32506a(0x332)](_0x2bca34);break;}if(this[_0x32506a(0x299)](_0x2bca34)){const _0x5616b7=DataManager[_0x32506a(0x20e)](_0x2bca34);this[_0x32506a(0x1ad)][_0x2bca34]=this[_0x32506a(0x1ad)][_0x2bca34][_0x32506a(0x3d5)](0x0,_0x5616b7);}},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x332)]=function(_0x41d473){const _0x47b806=_0x13ab2e;VisuMZ[_0x47b806(0x25d)][_0x47b806(0x3b2)]['call'](this,_0x41d473);},Game_BattlerBase['prototype'][_0x13ab2e(0x2ce)]=function(_0x350b33){const _0x5cec78=_0x13ab2e,_0x11c797=_0x350b33['note'];return _0x11c797[_0x5cec78(0x160)](/<REAPPLY RULES:[ ](.*)>/i)?String(RegExp['$1']):VisuMZ['SkillsStatesCore'][_0x5cec78(0x1dc)][_0x5cec78(0x2b2)][_0x5cec78(0x3ec)];},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x2fc)]=Game_BattlerBase['prototype'][_0x13ab2e(0x26f)],Game_BattlerBase[_0x13ab2e(0x2f5)]['overwriteBuffTurns']=function(_0x41b5d0,_0x246382){const _0x543c0c=_0x13ab2e,_0x2b74aa=VisuMZ[_0x543c0c(0x25d)]['Settings'][_0x543c0c(0x370)][_0x543c0c(0x3ec)],_0xdc892e=this['buffTurns'](_0x41b5d0);switch(_0x2b74aa){case _0x543c0c(0x2b5):if(_0xdc892e<=0x0)this[_0x543c0c(0x177)][_0x41b5d0]=_0x246382;break;case _0x543c0c(0x1bd):this[_0x543c0c(0x177)][_0x41b5d0]=_0x246382;break;case _0x543c0c(0x1b9):this[_0x543c0c(0x177)][_0x41b5d0]=Math[_0x543c0c(0x1cc)](_0xdc892e,_0x246382);break;case'add':this[_0x543c0c(0x177)][_0x41b5d0]+=_0x246382;break;default:VisuMZ[_0x543c0c(0x25d)][_0x543c0c(0x2fc)][_0x543c0c(0x13a)](this,_0x41b5d0,_0x246382);break;}const _0x37ae77=VisuMZ[_0x543c0c(0x25d)][_0x543c0c(0x1dc)][_0x543c0c(0x370)]['MaxTurns'];this[_0x543c0c(0x177)][_0x41b5d0]=this['_buffTurns'][_0x41b5d0]['clamp'](0x0,_0x37ae77);},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x135)]=function(){const _0x9bb56b=_0x13ab2e;if(this['_cache']['groupDefeat']!==undefined)return this['_cache'][_0x9bb56b(0x2b0)];this[_0x9bb56b(0x3f5)][_0x9bb56b(0x2b0)]=![];const _0x29f115=this['states']();for(const _0x5064f8 of _0x29f115){if(!_0x5064f8)continue;if(_0x5064f8[_0x9bb56b(0x25e)][_0x9bb56b(0x160)](/<GROUP DEFEAT>/i)){this[_0x9bb56b(0x3f5)][_0x9bb56b(0x2b0)]=!![];break;}}return this[_0x9bb56b(0x3f5)]['groupDefeat'];},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x379)]=Game_Unit['prototype'][_0x13ab2e(0x152)],Game_Unit[_0x13ab2e(0x2f5)]['deadMembers']=function(){const _0x5ecce7=_0x13ab2e;let _0x51d9e8=VisuMZ[_0x5ecce7(0x25d)]['Game_Unit_deadMembers'][_0x5ecce7(0x13a)](this);return BattleManager[_0x5ecce7(0x20c)]&&(_0x51d9e8=_0x51d9e8[_0x5ecce7(0x3db)](this['members']()['filter'](_0x4ba98d=>_0x4ba98d['isGroupDefeatStateAffected']()))),_0x51d9e8;},VisuMZ['SkillsStatesCore'][_0x13ab2e(0x150)]=Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x2c5)],Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x2c5)]=function(){const _0x5b7e7b=_0x13ab2e;this[_0x5b7e7b(0x3c8)]()!==''?this[_0x5b7e7b(0x349)]():(VisuMZ[_0x5b7e7b(0x25d)][_0x5b7e7b(0x150)][_0x5b7e7b(0x13a)](this),this[_0x5b7e7b(0x149)]());},Game_Actor[_0x13ab2e(0x2f5)][_0x13ab2e(0x2c5)]=function(){const _0x1b44bf=_0x13ab2e;this['_stateSteps']=this[_0x1b44bf(0x1c5)]||{},Game_Battler[_0x1b44bf(0x2f5)][_0x1b44bf(0x2c5)][_0x1b44bf(0x13a)](this);},Game_BattlerBase['prototype'][_0x13ab2e(0x349)]=function(){const _0x3c9ef6=_0x13ab2e,_0x1a4680=this[_0x3c9ef6(0x2be)]();for(const _0x26f114 of _0x1a4680){if(_0x26f114&&this[_0x3c9ef6(0x18c)](_0x26f114))this[_0x3c9ef6(0x400)](_0x26f114['id']);}this[_0x3c9ef6(0x3f5)]={};},Game_BattlerBase['prototype'][_0x13ab2e(0x18c)]=function(_0x347385){const _0x1c9b49=_0x13ab2e,_0x22880d=this[_0x1c9b49(0x3c8)]();if(_0x22880d!==''){const _0x5160c1=_0x347385[_0x1c9b49(0x25e)];if(_0x22880d===_0x1c9b49(0x2bf)&&_0x5160c1[_0x1c9b49(0x160)](/<NO DEATH CLEAR>/i))return![];if(_0x22880d===_0x1c9b49(0x131)&&_0x5160c1[_0x1c9b49(0x160)](/<NO RECOVER ALL CLEAR>/i))return![];}return this['isStateAffected'](_0x347385['id']);},Game_BattlerBase[_0x13ab2e(0x2f5)]['getStateRetainType']=function(){const _0x1bdbed=_0x13ab2e;return this[_0x1bdbed(0x3fd)];},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x3e4)]=function(_0x5975c0){const _0xcbb367=_0x13ab2e;this[_0xcbb367(0x3fd)]=_0x5975c0;},Game_BattlerBase['prototype'][_0x13ab2e(0x3f9)]=function(){const _0x4f48dc=_0x13ab2e;this[_0x4f48dc(0x3fd)]='';},VisuMZ['SkillsStatesCore'][_0x13ab2e(0x1b1)]=Game_BattlerBase['prototype'][_0x13ab2e(0x39b)],Game_BattlerBase[_0x13ab2e(0x2f5)]['die']=function(){const _0x33c392=_0x13ab2e;this[_0x33c392(0x3e4)](_0x33c392(0x2bf)),VisuMZ[_0x33c392(0x25d)]['Game_BattlerBase_die'][_0x33c392(0x13a)](this),this['clearStateRetainType']();},VisuMZ['SkillsStatesCore']['Game_BattlerBase_recoverAll']=Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x2e4)],Game_BattlerBase['prototype'][_0x13ab2e(0x2e4)]=function(){const _0x2c0428=_0x13ab2e;this[_0x2c0428(0x3e4)]('recover\x20all'),VisuMZ['SkillsStatesCore'][_0x2c0428(0x30a)][_0x2c0428(0x13a)](this),this['clearStateRetainType']();},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x305)]=function(_0x2f4fb1,_0x4a41f9,_0x57100b){return _0x4a41f9;},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x141)]=function(_0x31b9d2){const _0x14ac5b=_0x13ab2e;for(settings of VisuMZ[_0x14ac5b(0x25d)]['Settings'][_0x14ac5b(0x37b)]){let _0x34f55c=settings[_0x14ac5b(0x198)][_0x14ac5b(0x13a)](this,_0x31b9d2);_0x34f55c=this[_0x14ac5b(0x305)](_0x31b9d2,_0x34f55c,settings);if(!settings[_0x14ac5b(0x12f)]['call'](this,_0x31b9d2,_0x34f55c))return![];}return!![];},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x342)]=function(_0x3f89fe){const _0x287eb7=_0x13ab2e;for(settings of VisuMZ[_0x287eb7(0x25d)][_0x287eb7(0x1dc)]['Costs']){let _0x22c7a2=settings[_0x287eb7(0x198)]['call'](this,_0x3f89fe);_0x22c7a2=this[_0x287eb7(0x305)](_0x3f89fe,_0x22c7a2,settings),settings['PayJS'][_0x287eb7(0x13a)](this,_0x3f89fe,_0x22c7a2);}},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x255)]=Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x1de)],Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x1de)]=function(_0x3424d3){const _0x2c7cb7=_0x13ab2e;if(!_0x3424d3)return![];if(!VisuMZ[_0x2c7cb7(0x25d)][_0x2c7cb7(0x255)][_0x2c7cb7(0x13a)](this,_0x3424d3))return![];if(!this[_0x2c7cb7(0x190)](_0x3424d3))return![];if(!this[_0x2c7cb7(0x333)](_0x3424d3))return![];if(!this[_0x2c7cb7(0x3ad)](_0x3424d3))return![];return!![];},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x190)]=function(_0x358ff2){const _0x5d243a=_0x13ab2e;if(!this[_0x5d243a(0x294)](_0x358ff2))return![];return!![];},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x294)]=function(_0x203360){const _0x360819=_0x13ab2e,_0x3025d6=_0x203360['note'];if(_0x3025d6[_0x360819(0x160)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5c96e0=JSON[_0x360819(0x13f)]('['+RegExp['$1'][_0x360819(0x160)](/\d+/g)+']');for(const _0x27c839 of _0x5c96e0){if(!$gameSwitches[_0x360819(0x205)](_0x27c839))return![];}return!![];}if(_0x3025d6[_0x360819(0x160)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x520fc4=JSON['parse']('['+RegExp['$1'][_0x360819(0x160)](/\d+/g)+']');for(const _0xb9bd6e of _0x520fc4){if(!$gameSwitches[_0x360819(0x205)](_0xb9bd6e))return![];}return!![];}if(_0x3025d6[_0x360819(0x160)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x25024f=JSON[_0x360819(0x13f)]('['+RegExp['$1'][_0x360819(0x160)](/\d+/g)+']');for(const _0x5507ad of _0x25024f){if($gameSwitches[_0x360819(0x205)](_0x5507ad))return!![];}return![];}if(_0x3025d6[_0x360819(0x160)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5d990a=JSON[_0x360819(0x13f)]('['+RegExp['$1'][_0x360819(0x160)](/\d+/g)+']');for(const _0xb0dd48 of _0x5d990a){if(!$gameSwitches['value'](_0xb0dd48))return!![];}return![];}if(_0x3025d6['match'](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5a159e=JSON[_0x360819(0x13f)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2df5b3 of _0x5a159e){if(!$gameSwitches[_0x360819(0x205)](_0x2df5b3))return!![];}return![];}if(_0x3025d6[_0x360819(0x160)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1f160f=JSON[_0x360819(0x13f)]('['+RegExp['$1'][_0x360819(0x160)](/\d+/g)+']');for(const _0x3ef899 of _0x1f160f){if($gameSwitches[_0x360819(0x205)](_0x3ef899))return![];}return!![];}return!![];},Game_BattlerBase[_0x13ab2e(0x2f5)]['meetsSkillConditionsEnableJS']=function(_0x48f71a){const _0x1cec2c=_0x13ab2e,_0x3e6f5e=_0x48f71a[_0x1cec2c(0x25e)],_0x45e9f9=VisuMZ[_0x1cec2c(0x25d)][_0x1cec2c(0x2ff)];return _0x45e9f9[_0x48f71a['id']]?_0x45e9f9[_0x48f71a['id']][_0x1cec2c(0x13a)](this,_0x48f71a):!![];},Game_BattlerBase['prototype'][_0x13ab2e(0x3ad)]=function(_0x262b17){const _0x19befa=_0x13ab2e;return VisuMZ[_0x19befa(0x25d)]['Settings'][_0x19befa(0x193)][_0x19befa(0x340)][_0x19befa(0x13a)](this,_0x262b17);},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x328)]=Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x20f)],Game_BattlerBase[_0x13ab2e(0x2f5)]['skillMpCost']=function(_0xe6052e){const _0x4b4e17=_0x13ab2e;for(settings of VisuMZ[_0x4b4e17(0x25d)][_0x4b4e17(0x1dc)][_0x4b4e17(0x37b)]){if(settings[_0x4b4e17(0x29d)]['toUpperCase']()==='MP'){let _0x4dfc4a=settings[_0x4b4e17(0x198)][_0x4b4e17(0x13a)](this,_0xe6052e);return _0x4dfc4a=this[_0x4b4e17(0x305)](_0xe6052e,_0x4dfc4a,settings),_0x4dfc4a;}}return VisuMZ[_0x4b4e17(0x25d)][_0x4b4e17(0x328)][_0x4b4e17(0x13a)](this,_0xe6052e);},VisuMZ['SkillsStatesCore'][_0x13ab2e(0x303)]=Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x3cd)],Game_BattlerBase['prototype'][_0x13ab2e(0x3cd)]=function(_0x34e92d){const _0x43b8b9=_0x13ab2e;for(settings of VisuMZ['SkillsStatesCore'][_0x43b8b9(0x1dc)]['Costs']){if(settings[_0x43b8b9(0x29d)][_0x43b8b9(0x30c)]()==='TP'){let _0x487d5d=settings[_0x43b8b9(0x198)][_0x43b8b9(0x13a)](this,_0x34e92d);return _0x487d5d=this[_0x43b8b9(0x305)](_0x34e92d,_0x487d5d,settings),_0x487d5d;}}return VisuMZ[_0x43b8b9(0x25d)][_0x43b8b9(0x303)][_0x43b8b9(0x13a)](this,_0x34e92d);},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x2b4)]=function(_0xa5447e){const _0x4e4a01=_0x13ab2e;if(typeof _0xa5447e===_0x4e4a01(0x30f))_0xa5447e=$dataStates[_0xa5447e];return this[_0x4e4a01(0x2be)]()[_0x4e4a01(0x284)](_0xa5447e);},VisuMZ['SkillsStatesCore'][_0x13ab2e(0x35c)]=Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x2be)],Game_BattlerBase['prototype'][_0x13ab2e(0x2be)]=function(){const _0x3b2d58=_0x13ab2e;let _0x22526b=VisuMZ[_0x3b2d58(0x25d)]['Game_BattlerBase_states'][_0x3b2d58(0x13a)](this);if($gameTemp['_checkingPassiveStates'])return _0x22526b;return $gameTemp[_0x3b2d58(0x272)]=!![],this['addPassiveStates'](_0x22526b),$gameTemp[_0x3b2d58(0x272)]=undefined,_0x22526b;},Game_BattlerBase['prototype'][_0x13ab2e(0x210)]=function(_0x37a773){const _0x26c3b5=_0x13ab2e,_0x5aa4e5=this[_0x26c3b5(0x374)]();for(state of _0x5aa4e5){if(!state)continue;if(!this[_0x26c3b5(0x142)](state)&&_0x37a773['includes'](state))continue;_0x37a773[_0x26c3b5(0x1e6)](state);}_0x5aa4e5[_0x26c3b5(0x34f)]>0x0&&_0x37a773[_0x26c3b5(0x2ee)]((_0x20dad5,_0x51c526)=>{const _0x3ffb37=_0x26c3b5,_0x55404d=_0x20dad5[_0x3ffb37(0x15c)],_0x552ebf=_0x51c526[_0x3ffb37(0x15c)];if(_0x55404d!==_0x552ebf)return _0x552ebf-_0x55404d;return _0x20dad5-_0x51c526;});},Game_BattlerBase[_0x13ab2e(0x2f5)]['isPassiveStateStackable']=function(_0x42472d){const _0x44068e=_0x13ab2e;return _0x42472d[_0x44068e(0x25e)][_0x44068e(0x160)](/<PASSIVE STACKABLE>/i);},VisuMZ['SkillsStatesCore'][_0x13ab2e(0x28d)]=Game_BattlerBase['prototype'][_0x13ab2e(0x2ca)],Game_BattlerBase[_0x13ab2e(0x2f5)]['traitsSet']=function(_0x4fe622){const _0x5e3789=_0x13ab2e;this[_0x5e3789(0x1b8)]=!![];let _0x1381c5=VisuMZ[_0x5e3789(0x25d)]['Game_BattlerBase_traitsSet'][_0x5e3789(0x13a)](this,_0x4fe622);return this[_0x5e3789(0x1b8)]=undefined,_0x1381c5;},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x307)]=function(){const _0x2f46cc=_0x13ab2e;let _0x430f8a=[];this[_0x2f46cc(0x39d)]=this[_0x2f46cc(0x39d)]||{};for(;;){_0x430f8a=[];let _0x7ef2bf=!![];for(const _0x552923 of this['_cache'][_0x2f46cc(0x374)]){const _0x4779fe=$dataStates[_0x552923];if(!_0x4779fe)continue;let _0x51685c=this[_0x2f46cc(0x229)](_0x4779fe);this[_0x2f46cc(0x39d)][_0x552923]!==_0x51685c&&(_0x7ef2bf=![],this['_passiveStateResults'][_0x552923]=_0x51685c);if(!_0x51685c)continue;_0x430f8a['push'](_0x4779fe);}if(_0x7ef2bf)break;else{if(!this[_0x2f46cc(0x1b8)])this[_0x2f46cc(0x3f0)]();this['createPassiveStatesCache']();}}return _0x430f8a;},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x229)]=function(_0x3bfc97){const _0x4874aa=_0x13ab2e;if(!this[_0x4874aa(0x276)](_0x3bfc97))return![];if(!this[_0x4874aa(0x134)](_0x3bfc97))return![];if(!this[_0x4874aa(0x16e)](_0x3bfc97))return![];if(!this[_0x4874aa(0x1e5)](_0x3bfc97))return![];return!![];},Game_BattlerBase[_0x13ab2e(0x2f5)]['meetsPassiveStateConditionClasses']=function(_0x4a9b65){return!![];},Game_Actor[_0x13ab2e(0x2f5)][_0x13ab2e(0x276)]=function(_0x1053ce){const _0x203775=_0x13ab2e,_0x4fdd68=DataManager[_0x203775(0x2d8)](_0x1053ce);if(_0x4fdd68[_0x203775(0x279)]['length']>0x0){const _0xba1ab2=_0x4fdd68['currentClass'];if(!_0xba1ab2[_0x203775(0x284)](this[_0x203775(0x279)]()))return![];}if(_0x4fdd68[_0x203775(0x322)][_0x203775(0x34f)]>0x0){const _0x4d5960=_0x4fdd68['multiClass'];let _0x5a666e=[this[_0x203775(0x279)]()];Imported['VisuMZ_2_ClassChangeSystem']&&this[_0x203775(0x1b2)]&&(_0x5a666e=this[_0x203775(0x1b2)]());if(_0x4d5960[_0x203775(0x290)](_0x4e6bd7=>_0x5a666e[_0x203775(0x284)](_0x4e6bd7))['length']<=0x0)return![];}return Game_BattlerBase[_0x203775(0x2f5)]['meetsPassiveStateConditionClasses'][_0x203775(0x13a)](this,_0x1053ce);},DataManager[_0x13ab2e(0x2d8)]=function(_0x396a9b){const _0xccdd66=_0x13ab2e,_0x3fcd4d={'currentClass':[],'multiClass':[]};if(!_0x396a9b)return _0x3fcd4d;this['_cache_getPassiveStateConditionClassesData']=this[_0xccdd66(0x28c)]||{};if(this[_0xccdd66(0x28c)][_0x396a9b['id']]!==undefined)return this['_cache_getPassiveStateConditionClassesData'][_0x396a9b['id']];const _0x53b466=_0x396a9b[_0xccdd66(0x25e)]||'';if(_0x53b466[_0xccdd66(0x160)](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0x39056=String(RegExp['$1'])[_0xccdd66(0x1f1)](',')[_0xccdd66(0x18d)](_0x239929=>_0x239929[_0xccdd66(0x313)]());_0x3fcd4d[_0xccdd66(0x279)]=VisuMZ[_0xccdd66(0x25d)]['ParseClassIDs'](_0x39056);}if(_0x53b466[_0xccdd66(0x160)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){const _0x465abc=String(RegExp['$1'])[_0xccdd66(0x1f1)](',')['map'](_0x10d43c=>_0x10d43c[_0xccdd66(0x313)]());_0x3fcd4d[_0xccdd66(0x322)]=VisuMZ['SkillsStatesCore']['ParseClassIDs'](_0x465abc);}return this[_0xccdd66(0x28c)][_0x396a9b['id']]=_0x3fcd4d,this[_0xccdd66(0x28c)][_0x396a9b['id']];},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x130)]=function(_0x3fe412){const _0x8b0c00=_0x13ab2e,_0x59a6b0=[];for(let _0x56b57f of _0x3fe412){_0x56b57f=(String(_0x56b57f)||'')[_0x8b0c00(0x313)]();const _0x4fcde2=/^\d+$/[_0x8b0c00(0x274)](_0x56b57f);_0x4fcde2?_0x59a6b0[_0x8b0c00(0x1e6)](Number(_0x56b57f)):_0x59a6b0[_0x8b0c00(0x1e6)](DataManager['getClassIdWithName'](_0x56b57f));}return _0x59a6b0[_0x8b0c00(0x18d)](_0x6d5bcd=>$dataClasses[Number(_0x6d5bcd)])[_0x8b0c00(0x151)](null);},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x134)]=function(_0xdb439a){const _0x3b61ab=_0x13ab2e,_0x1b6070=DataManager['getPassiveStateConditionSwitchData'](_0xdb439a);if(_0x1b6070[_0x3b61ab(0x1d7)]&&_0x1b6070[_0x3b61ab(0x1d7)][_0x3b61ab(0x34f)]>0x0){const _0x1c14ae=_0x1b6070['allSwitchOn'];for(const _0x246950 of _0x1c14ae){if(!$gameSwitches[_0x3b61ab(0x205)](_0x246950))return![];}}if(_0x1b6070[_0x3b61ab(0x12e)]&&_0x1b6070[_0x3b61ab(0x12e)][_0x3b61ab(0x34f)]>0x0){const _0x125c88=_0x1b6070[_0x3b61ab(0x12e)];let _0x41dc5d=!![];for(const _0x3ec399 of _0x125c88){if($gameSwitches['value'](_0x3ec399)){_0x41dc5d=![];break;}}if(_0x41dc5d)return![];}if(_0x1b6070[_0x3b61ab(0x31d)]&&_0x1b6070[_0x3b61ab(0x31d)][_0x3b61ab(0x34f)]>0x0){const _0x52e2c3=_0x1b6070[_0x3b61ab(0x31d)];for(const _0x3d1987 of _0x52e2c3){if($gameSwitches[_0x3b61ab(0x205)](_0x3d1987))return![];}}if(_0x1b6070[_0x3b61ab(0x2ba)]&&_0x1b6070[_0x3b61ab(0x2ba)][_0x3b61ab(0x34f)]>0x0){const _0x137872=_0x1b6070[_0x3b61ab(0x2ba)];let _0x55431b=!![];for(const _0x164e4b of _0x137872){if(!$gameSwitches[_0x3b61ab(0x205)](_0x164e4b)){_0x55431b=![];break;}}if(_0x55431b)return![];}return!![];},DataManager[_0x13ab2e(0x133)]=function(_0x3de4a9){const _0x2a03c3=_0x13ab2e;let _0x28a263={'allSwitchOn':[],'anySwitchOn':[],'allSwitchOff':[],'anySwitchOff':[]};if(!_0x3de4a9)return _0x28a263;const _0x166431=_0x3de4a9['id'];this['_cache_getPassiveStateConditionSwitchData']=this[_0x2a03c3(0x2bb)]||{};if(this['_cache_getPassiveStateConditionSwitchData'][_0x166431]!==undefined)return this[_0x2a03c3(0x2bb)][_0x166431];const _0x15c5de=_0x3de4a9[_0x2a03c3(0x25e)]||'';return _0x15c5de[_0x2a03c3(0x160)](/PASSIVE CONDITION(?:| ALL)[ ](?:SWITCH|SWITCHES)[ ]ON:[ ](.*)>/i)&&(_0x28a263['allSwitchOn']=String(RegExp['$1'])[_0x2a03c3(0x1f1)](',')[_0x2a03c3(0x18d)](_0x180e3b=>Number(_0x180e3b))),_0x15c5de[_0x2a03c3(0x160)](/PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ](.*)>/i)&&(_0x28a263['anySwitchOn']=String(RegExp['$1'])[_0x2a03c3(0x1f1)](',')[_0x2a03c3(0x18d)](_0x413520=>Number(_0x413520))),_0x15c5de[_0x2a03c3(0x160)](/PASSIVE CONDITION(?:| ALL)[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ](.*)>/i)&&(_0x28a263[_0x2a03c3(0x31d)]=String(RegExp['$1'])[_0x2a03c3(0x1f1)](',')['map'](_0x5d3f35=>Number(_0x5d3f35))),_0x15c5de[_0x2a03c3(0x160)](/PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ](.*)>/i)&&(_0x28a263[_0x2a03c3(0x2ba)]=String(RegExp['$1'])[_0x2a03c3(0x1f1)](',')[_0x2a03c3(0x18d)](_0x6fa64b=>Number(_0x6fa64b))),this[_0x2a03c3(0x2bb)][_0x166431]=_0x28a263,this[_0x2a03c3(0x2bb)][_0x166431];},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x16e)]=function(_0x12d878){const _0x59f976=_0x13ab2e,_0x182f29=VisuMZ[_0x59f976(0x25d)][_0x59f976(0x262)];if(_0x182f29[_0x12d878['id']]&&!_0x182f29[_0x12d878['id']][_0x59f976(0x13a)](this,_0x12d878))return![];return!![];},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x1e5)]=function(_0x14cc3e){const _0x150461=_0x13ab2e;return VisuMZ['SkillsStatesCore'][_0x150461(0x1dc)][_0x150461(0x2b3)][_0x150461(0x243)][_0x150461(0x13a)](this,_0x14cc3e);},Game_BattlerBase['prototype']['passiveStates']=function(){const _0x4a4606=_0x13ab2e;if(this['checkCacheKey']('passiveStates'))return this[_0x4a4606(0x307)]();if(this[_0x4a4606(0x310)])return[];return this['_checkingVisuMzPassiveStateObjects']=!![],this[_0x4a4606(0x191)](),this[_0x4a4606(0x310)]=undefined,this[_0x4a4606(0x307)]();},Game_BattlerBase[_0x13ab2e(0x2f5)]['createPassiveStatesCache']=function(){const _0x19dd83=_0x13ab2e;this['_checkingVisuMzPassiveStateObjects']=!![],this[_0x19dd83(0x3f5)][_0x19dd83(0x374)]=[],this['addPassiveStatesFromOtherPlugins'](),this[_0x19dd83(0x3c5)](),this[_0x19dd83(0x327)](),Game_BattlerBase[_0x19dd83(0x242)]&&this['addAuraPassiveStateIDs'](),this[_0x19dd83(0x3f5)]['passiveStates']=this[_0x19dd83(0x3f5)][_0x19dd83(0x374)][_0x19dd83(0x2ee)]((_0x2964f4,_0xa7b82c)=>_0x2964f4-_0xa7b82c),this['_checkingVisuMzPassiveStateObjects']=undefined;},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x335)]=function(){const _0x193ba8=_0x13ab2e;if(Imported[_0x193ba8(0x33e)])this[_0x193ba8(0x264)]();},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x1e1)]=function(){return[];},Game_BattlerBase['prototype'][_0x13ab2e(0x3c5)]=function(){const _0x243f0c=_0x13ab2e,_0x885cff=this[_0x243f0c(0x3f5)][_0x243f0c(0x374)]||[],_0x31d7e8=this[_0x243f0c(0x1e1)]();this[_0x243f0c(0x3f5)][_0x243f0c(0x374)]=_0x885cff||[];for(const _0x2c71a0 of _0x31d7e8){if(!_0x2c71a0)continue;const _0x4fd2b1=DataManager[_0x243f0c(0x373)](_0x2c71a0);for(const _0x576699 of _0x4fd2b1){this[_0x243f0c(0x3f5)][_0x243f0c(0x374)][_0x243f0c(0x1e6)](_0x576699);}}},DataManager['getPassiveStatesFromObj']=function(_0x193e77){const _0x132815=_0x13ab2e;if(!_0x193e77)return[];const _0x3fe0da=VisuMZ[_0x132815(0x25d)][_0x132815(0x171)](_0x193e77,_0x132815(0x233));this[_0x132815(0x3ff)]=this[_0x132815(0x3ff)]||{};if(this['_cache_getPassiveStatesFromObj'][_0x3fe0da]!==undefined)return this[_0x132815(0x3ff)][_0x3fe0da];const _0x18921d=[],_0x65c8dc=_0x193e77[_0x132815(0x25e)]||'',_0x5d0437=/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi,_0x45c497=_0x65c8dc[_0x132815(0x160)](_0x5d0437);if(_0x45c497)for(const _0x5b7a95 of _0x45c497){_0x5b7a95[_0x132815(0x160)](_0x5d0437);const _0x9446b0=String(RegExp['$1'])[_0x132815(0x1f1)](',')[_0x132815(0x18d)](_0x3b09f2=>_0x3b09f2['trim']());for(const _0x4a5bbd of _0x9446b0){const _0x45f7d2=/^\d+$/['test'](_0x4a5bbd);let _0x8c532a=0x0;_0x45f7d2?_0x8c532a=Number(_0x4a5bbd):_0x8c532a=DataManager[_0x132815(0x2cc)](_0x4a5bbd),_0x8c532a&&_0x18921d[_0x132815(0x1e6)](_0x8c532a);}}return this[_0x132815(0x3ff)][_0x3fe0da]=_0x18921d,this[_0x132815(0x3ff)][_0x3fe0da];},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x327)]=function(){const _0x140ba6=_0x13ab2e,_0x472f91=VisuMZ[_0x140ba6(0x25d)][_0x140ba6(0x1dc)]['PassiveStates'][_0x140ba6(0x3b1)];this[_0x140ba6(0x3f5)][_0x140ba6(0x374)]=this[_0x140ba6(0x3f5)][_0x140ba6(0x374)][_0x140ba6(0x3db)](_0x472f91);},Game_BattlerBase['AURA_SYSTEM_ENABLED']=![],Scene_Boot[_0x13ab2e(0x2f5)]['process_VisuMZ_SkillsStatesCore_CheckForAuras']=function(){const _0x32ddb5=_0x13ab2e,_0x59cb9d=[$dataActors,$dataClasses,$dataSkills,$dataWeapons,$dataArmors,$dataEnemies];for(const _0x42accf of _0x59cb9d){for(const _0x3d9c32 of _0x42accf){if(!_0x3d9c32)continue;const _0x15a72f=_0x3d9c32[_0x32ddb5(0x25e)]||'';if(_0x15a72f[_0x32ddb5(0x160)](/<(?:AURA|MIASMA) (?:STATE|STATES):[ ](.*)>/gi)){Game_BattlerBase[_0x32ddb5(0x242)]=!![];break;}}}},Game_BattlerBase['prototype'][_0x13ab2e(0x3b3)]=function(){const _0x20417a=_0x13ab2e;if(this[_0x20417a(0x13c)]())return;if(!this[_0x20417a(0x196)]())return;const _0x528969=this[_0x20417a(0x3f5)][_0x20417a(0x374)]||[],_0x580ec1=this,_0x683be1=this['friendsUnit']()[_0x20417a(0x170)](!![],_0x580ec1),_0x3f7a63=$gameParty[_0x20417a(0x2d4)]()?this['opponentsUnit']()[_0x20417a(0x170)](![],_0x580ec1):[];this[_0x20417a(0x3f5)]['passiveStates']=_0x528969||[],this[_0x20417a(0x3f5)]['passiveStates']=this[_0x20417a(0x3f5)]['passiveStates']['concat'](_0x683be1)[_0x20417a(0x3db)](_0x3f7a63);},Game_Unit[_0x13ab2e(0x2f5)][_0x13ab2e(0x170)]=function(_0x12eb25,_0xd49236){const _0x30793=_0x13ab2e;let _0xd61d9e=[];const _0x201c91=this===$gameParty?this[_0x30793(0x22c)]():this[_0x30793(0x289)]();for(const _0x498ae1 of _0x201c91){if(!_0x498ae1)continue;if(!_0x498ae1[_0x30793(0x196)]())continue;const _0x1b453a=_0x498ae1['passiveStateObjects']();for(const _0x48d49c of _0x1b453a){if(!_0x48d49c)continue;if(!VisuMZ['SkillsStatesCore']['MeetsAuraObjConditions'](_0x48d49c,_0x12eb25,_0x498ae1,_0xd49236))continue;let _0x5b7c30=DataManager[_0x30793(0x37e)](_0x48d49c,_0x12eb25);for(const _0x8c5599 of _0x5b7c30){if(!VisuMZ[_0x30793(0x25d)][_0x30793(0x187)](_0x8c5599,_0x12eb25,_0x498ae1,_0xd49236))continue;_0xd61d9e[_0x30793(0x1e6)](_0x8c5599),!_0xd49236[_0x30793(0x299)](_0x8c5599)&&_0xd49236[_0x30793(0x19f)](_0x8c5599,_0x498ae1);}}}return _0xd61d9e;},DataManager[_0x13ab2e(0x37e)]=function(_0x130b75,_0x2afa4d){const _0x1ac776=_0x13ab2e;if(!_0x130b75)return[];const _0x1b6753=_0x2afa4d?_0x1ac776(0x234):'miasmaStateIDs',_0x55926f=VisuMZ['SkillsStatesCore'][_0x1ac776(0x171)](_0x130b75,_0x1b6753);this[_0x1ac776(0x343)]=this[_0x1ac776(0x343)]||{};if(this[_0x1ac776(0x343)][_0x55926f]!==undefined)return this[_0x1ac776(0x343)][_0x55926f];const _0x92e5b7=[],_0x1d7bee=_0x130b75['note']||'',_0x3302f6=_0x2afa4d?/<AURA (?:STATE|STATES):[ ](.*)>/gi:/<MIASMA (?:STATE|STATES):[ ](.*)>/gi,_0x329a7c=_0x1d7bee['match'](_0x3302f6);if(_0x329a7c)for(const _0x4986cc of _0x329a7c){_0x4986cc['match'](_0x3302f6);const _0x6102f4=String(RegExp['$1'])[_0x1ac776(0x1f1)](',')['map'](_0x414e46=>_0x414e46[_0x1ac776(0x313)]());for(const _0x55f150 of _0x6102f4){const _0x592350=/^\d+$/[_0x1ac776(0x274)](_0x55f150);let _0x27eb40=0x0;_0x592350?_0x27eb40=Number(_0x55f150):_0x27eb40=DataManager[_0x1ac776(0x2cc)](_0x55f150),_0x27eb40&&_0x92e5b7['push'](_0x27eb40);}}return this[_0x1ac776(0x343)][_0x55926f]=_0x92e5b7,this[_0x1ac776(0x343)][_0x55926f];},VisuMZ[_0x13ab2e(0x25d)]['MeetsAuraObjConditions']=function(_0x341a75,_0x5513eb,_0x412857,_0x1c8ad0){const _0x45648b=_0x13ab2e;if(!_0x341a75)return![];if(_0x341a75['autoRemovalTiming']!==undefined&&_0x341a75[_0x45648b(0x169)]!==undefined)return![];const _0x4b535a=_0x341a75['note']||'';if(!VisuMZ[_0x45648b(0x25d)][_0x45648b(0x395)](_0x4b535a,_0x5513eb,_0x412857,_0x1c8ad0))return![];return!![];},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x187)]=function(_0x2c8b5d,_0xfc276,_0x484086,_0x2cc7bb){const _0x439abf=_0x13ab2e,_0x99cb74=$dataStates[_0x2c8b5d];if(!_0x99cb74)return![];const _0x2fb82a=_0x99cb74[_0x439abf(0x25e)]||'';if(!VisuMZ['SkillsStatesCore'][_0x439abf(0x395)](_0x2fb82a,_0xfc276,_0x484086,_0x2cc7bb))return![];return!![];},VisuMZ['SkillsStatesCore'][_0x13ab2e(0x395)]=function(_0x1fa300,_0x436e02,_0x52daa4,_0x1d89e0){const _0x1c2207=_0x13ab2e;_0x1fa300=_0x1fa300||'';if(_0x52daa4['isDead']()){if(_0x436e02&&_0x1fa300[_0x1c2207(0x160)](/<ALLOW DEAD AURA>/i)){}else{if(!_0x436e02&&_0x1fa300['match'](/<ALLOW DEAD MIASMA>/i)){}else{if(_0x436e02&&_0x1fa300[_0x1c2207(0x160)](/<DEAD AURA ONLY>/i)){}else{if(!_0x436e02&&_0x1fa300[_0x1c2207(0x160)](/<DEAD MIASMA ONLY>/i)){}else return![];}}}}else{if(_0x436e02&&_0x1fa300[_0x1c2207(0x160)](/<DEAD AURA ONLY>/i))return![];else{if(!_0x436e02&&_0x1fa300[_0x1c2207(0x160)](/<DEAD MIASMA ONLY>/i))return![];}}if(_0x436e02){if(_0x1fa300[_0x1c2207(0x160)](/<AURA NOT FOR USER>/i)){if(_0x52daa4===_0x1d89e0)return![];}else{if(_0x1fa300[_0x1c2207(0x160)](/<NOT USER AURA>/i)){if(_0x52daa4===_0x1d89e0)return![];}}}return!![];},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x207)]=function(_0x4805f9){const _0x3f0465=_0x13ab2e;if(typeof _0x4805f9!==_0x3f0465(0x30f))_0x4805f9=_0x4805f9['id'];return this[_0x3f0465(0x1ad)][_0x4805f9]||0x0;},Game_BattlerBase[_0x13ab2e(0x2f5)]['setStateTurns']=function(_0xcb498b,_0x582b2a){const _0x1a8ccd=_0x13ab2e;if(typeof _0xcb498b!==_0x1a8ccd(0x30f))_0xcb498b=_0xcb498b['id'];if(this[_0x1a8ccd(0x299)](_0xcb498b)){const _0x48108e=DataManager[_0x1a8ccd(0x20e)](_0xcb498b);this[_0x1a8ccd(0x1ad)][_0xcb498b]=_0x582b2a[_0x1a8ccd(0x3d5)](0x0,_0x48108e);if(this['_stateTurns'][_0xcb498b]<=0x0)this[_0x1a8ccd(0x240)](_0xcb498b);}},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x3c2)]=function(_0x3e53f0,_0x10585b){const _0x19e646=_0x13ab2e;if(typeof _0x3e53f0!==_0x19e646(0x30f))_0x3e53f0=_0x3e53f0['id'];this[_0x19e646(0x299)](_0x3e53f0)&&(_0x10585b+=this[_0x19e646(0x207)](_0x3e53f0),this[_0x19e646(0x241)](_0x3e53f0,_0x10585b));},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x263)]=Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x257)],Game_BattlerBase[_0x13ab2e(0x2f5)]['eraseBuff']=function(_0x58c524){const _0x3cf4c5=_0x13ab2e,_0x26c76c=this[_0x3cf4c5(0x143)][_0x58c524];VisuMZ[_0x3cf4c5(0x25d)][_0x3cf4c5(0x263)][_0x3cf4c5(0x13a)](this,_0x58c524);if(_0x26c76c>0x0)this[_0x3cf4c5(0x368)](_0x58c524);if(_0x26c76c<0x0)this[_0x3cf4c5(0x306)](_0x58c524);},VisuMZ['SkillsStatesCore']['Game_BattlerBase_increaseBuff']=Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x3ac)],Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x3ac)]=function(_0x47df21){const _0x2d832d=_0x13ab2e;VisuMZ[_0x2d832d(0x25d)][_0x2d832d(0x179)]['call'](this,_0x47df21);if(!this['isBuffOrDebuffAffected'](_0x47df21))this[_0x2d832d(0x257)](_0x47df21);},VisuMZ[_0x13ab2e(0x25d)]['Game_BattlerBase_decreaseBuff']=Game_BattlerBase['prototype'][_0x13ab2e(0x2e8)],Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x2e8)]=function(_0x49aa37){const _0x190d22=_0x13ab2e;VisuMZ['SkillsStatesCore']['Game_BattlerBase_decreaseBuff']['call'](this,_0x49aa37);if(!this[_0x190d22(0x304)](_0x49aa37))this[_0x190d22(0x257)](_0x49aa37);},Game_BattlerBase['prototype']['onEraseBuff']=function(_0x48629b){},Game_BattlerBase[_0x13ab2e(0x2f5)]['onEraseDebuff']=function(_0x2ee6c8){},Game_BattlerBase['prototype']['isMaxBuffAffected']=function(_0xc7c891){const _0x3f09b1=_0x13ab2e;return this[_0x3f09b1(0x143)][_0xc7c891]===VisuMZ[_0x3f09b1(0x25d)]['Settings'][_0x3f09b1(0x370)]['StackBuffMax'];},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x211)]=function(_0x31218e){const _0x58fcb1=_0x13ab2e;return this[_0x58fcb1(0x143)][_0x31218e]===-VisuMZ[_0x58fcb1(0x25d)]['Settings'][_0x58fcb1(0x370)]['StackDebuffMax'];},VisuMZ[_0x13ab2e(0x25d)]['Game_BattlerBase_buffIconIndex']=Game_BattlerBase['prototype'][_0x13ab2e(0x235)],Game_BattlerBase['prototype'][_0x13ab2e(0x235)]=function(_0x1fde49,_0x3b56f4){const _0x44e092=_0x13ab2e;return _0x1fde49=_0x1fde49[_0x44e092(0x3d5)](-0x2,0x2),VisuMZ[_0x44e092(0x25d)]['Game_BattlerBase_buffIconIndex'][_0x44e092(0x13a)](this,_0x1fde49,_0x3b56f4);},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x1ca)]=function(_0x1e33fc){const _0x4cc957=_0x13ab2e,_0x33506c=this['_buffs'][_0x1e33fc];return VisuMZ[_0x4cc957(0x25d)][_0x4cc957(0x1dc)]['Buffs']['MultiplierJS']['call'](this,_0x1e33fc,_0x33506c);},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x2f9)]=function(_0x51bcf4){const _0x45d79d=_0x13ab2e;return this[_0x45d79d(0x177)][_0x51bcf4]||0x0;},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x26c)]=function(_0xc67717){const _0x556377=_0x13ab2e;return this[_0x556377(0x2f9)](_0xc67717);},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x3e5)]=function(_0x4712c6,_0x30b825){const _0x2a4abe=_0x13ab2e;if(this[_0x2a4abe(0x37a)](_0x4712c6)){const _0x3ffd2e=VisuMZ['SkillsStatesCore'][_0x2a4abe(0x1dc)]['Buffs'][_0x2a4abe(0x385)];this[_0x2a4abe(0x177)][_0x4712c6]=_0x30b825[_0x2a4abe(0x3d5)](0x0,_0x3ffd2e);}},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x15f)]=function(_0x512848,_0xf63dd6){const _0x338d0d=_0x13ab2e;this[_0x338d0d(0x37a)](_0x512848)&&(_0xf63dd6+=this[_0x338d0d(0x2f9)](stateId),this[_0x338d0d(0x3e5)](_0x512848,_0xf63dd6));},Game_BattlerBase['prototype'][_0x13ab2e(0x31f)]=function(_0x45ef87,_0x12e867){const _0x5d4ba4=_0x13ab2e;if(this[_0x5d4ba4(0x2d1)](_0x45ef87)){const _0x8250cd=VisuMZ[_0x5d4ba4(0x25d)][_0x5d4ba4(0x1dc)]['Buffs'][_0x5d4ba4(0x385)];this[_0x5d4ba4(0x177)][_0x45ef87]=_0x12e867[_0x5d4ba4(0x3d5)](0x0,_0x8250cd);}},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x29e)]=function(_0x3b630c,_0x49312c){const _0x4334ce=_0x13ab2e;this[_0x4334ce(0x2d1)](_0x3b630c)&&(_0x49312c+=this['buffTurns'](stateId),this[_0x4334ce(0x31f)](_0x3b630c,_0x49312c));},Game_BattlerBase[_0x13ab2e(0x2f5)]['stateData']=function(_0x3907a9){const _0x50c306=_0x13ab2e;if(typeof _0x3907a9!==_0x50c306(0x30f))_0x3907a9=_0x3907a9['id'];return this['_stateData']=this[_0x50c306(0x1e7)]||{},this[_0x50c306(0x1e7)][_0x3907a9]=this[_0x50c306(0x1e7)][_0x3907a9]||{},this[_0x50c306(0x1e7)][_0x3907a9];},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x3fa)]=function(_0x492cef,_0x4e6bb2){const _0x343f2e=_0x13ab2e;if(typeof _0x492cef!==_0x343f2e(0x30f))_0x492cef=_0x492cef['id'];const _0xc98b53=this['stateData'](_0x492cef);return _0xc98b53[_0x4e6bb2];},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x221)]=function(_0x1bbd21,_0xdf5f1a,_0x5d3bce){if(typeof _0x1bbd21!=='number')_0x1bbd21=_0x1bbd21['id'];const _0x2132b0=this['stateData'](_0x1bbd21);_0x2132b0[_0xdf5f1a]=_0x5d3bce;},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x215)]=function(_0x167bd4){const _0x253d11=_0x13ab2e;if(typeof _0x167bd4!=='number')_0x167bd4=_0x167bd4['id'];this[_0x253d11(0x1e7)]=this[_0x253d11(0x1e7)]||{},this['_stateData'][_0x167bd4]={};},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x2e3)]=function(_0x21a82e){const _0x24a623=_0x13ab2e;if(typeof _0x21a82e!=='number')_0x21a82e=_0x21a82e['id'];return this[_0x24a623(0x23e)]=this[_0x24a623(0x23e)]||{},this[_0x24a623(0x23e)][_0x21a82e]===undefined&&(this['_stateDisplay'][_0x21a82e]=''),this[_0x24a623(0x23e)][_0x21a82e];},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x1a2)]=function(_0xa76cb6,_0x5ddc10){const _0x188dbd=_0x13ab2e;if(typeof _0xa76cb6!==_0x188dbd(0x30f))_0xa76cb6=_0xa76cb6['id'];this[_0x188dbd(0x23e)]=this[_0x188dbd(0x23e)]||{},this[_0x188dbd(0x23e)][_0xa76cb6]=_0x5ddc10;},Game_BattlerBase[_0x13ab2e(0x2f5)]['clearStateDisplay']=function(_0x3a8381){const _0x49093e=_0x13ab2e;if(typeof _0x3a8381!=='number')_0x3a8381=_0x3a8381['id'];this['_stateDisplay']=this[_0x49093e(0x23e)]||{},this[_0x49093e(0x23e)][_0x3a8381]='';},Game_BattlerBase['prototype'][_0x13ab2e(0x13b)]=function(_0x224f30){const _0x30aca7=_0x13ab2e;if(typeof _0x224f30!==_0x30aca7(0x30f))_0x224f30=_0x224f30['id'];this[_0x30aca7(0x38f)]=this['_stateOrigin']||{},this['_stateOrigin'][_0x224f30]=this[_0x30aca7(0x38f)][_0x224f30]||_0x30aca7(0x3ba);const _0x37c84a=this['_stateOrigin'][_0x224f30];return this[_0x30aca7(0x186)](_0x37c84a);},Game_BattlerBase['prototype'][_0x13ab2e(0x19f)]=function(_0x7e3198,_0x3dc5d0){const _0x2da656=_0x13ab2e;this[_0x2da656(0x38f)]=this[_0x2da656(0x38f)]||{};const _0x189beb=_0x3dc5d0?this[_0x2da656(0x19d)](_0x3dc5d0):this[_0x2da656(0x3c7)]();this[_0x2da656(0x38f)][_0x7e3198]=_0x189beb;},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x35a)]=function(_0x274efb){const _0x5ae3d7=_0x13ab2e;this['_stateOrigin']=this[_0x5ae3d7(0x38f)]||{},delete this[_0x5ae3d7(0x38f)][_0x274efb];},Game_BattlerBase['prototype'][_0x13ab2e(0x17d)]=function(){const _0x3a4162=_0x13ab2e;this[_0x3a4162(0x38f)]={};},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x3c7)]=function(){const _0x50fea2=_0x13ab2e,_0x2414bc=this[_0x50fea2(0x37d)]();return this['convertTargetToStateOriginKey'](_0x2414bc);},Game_BattlerBase['prototype'][_0x13ab2e(0x37d)]=function(){const _0x5c6cbc=_0x13ab2e;if($gameParty['inBattle']()){if(BattleManager[_0x5c6cbc(0x2f8)])return BattleManager[_0x5c6cbc(0x2f8)];else{if(BattleManager[_0x5c6cbc(0x26b)])return BattleManager[_0x5c6cbc(0x26b)];}}else{const _0x411ac8=SceneManager[_0x5c6cbc(0x175)];if(![Scene_Map,Scene_Item][_0x5c6cbc(0x284)](_0x411ac8['constructor']))return $gameParty[_0x5c6cbc(0x391)]();}return this;},Game_BattlerBase[_0x13ab2e(0x2f5)]['convertTargetToStateOriginKey']=function(_0x3511a0){const _0x587f81=_0x13ab2e;if(!_0x3511a0)return _0x587f81(0x3ba);if(_0x3511a0[_0x587f81(0x401)]())return _0x587f81(0x18f)['format'](_0x3511a0['actorId']());else{const _0x41b898=_0x587f81(0x2a6)[_0x587f81(0x1da)](_0x3511a0[_0x587f81(0x1a3)]()),_0x31d6c8='<member-%1>'['format'](_0x3511a0[_0x587f81(0x1bc)]()),_0x1d6948='<troop-%1>'['format']($gameTroop[_0x587f81(0x3b6)]());return'%1\x20%2\x20%3'[_0x587f81(0x1da)](_0x41b898,_0x31d6c8,_0x1d6948);}return _0x587f81(0x3ba);},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x186)]=function(_0x41e8aa){const _0x4d7fac=_0x13ab2e;if(_0x41e8aa==='user')return this;else{if(_0x41e8aa['match'](/<actor-(\d+)>/i))return $gameActors[_0x4d7fac(0x2cf)](Number(RegExp['$1']));else{if($gameParty[_0x4d7fac(0x2d4)]()&&_0x41e8aa[_0x4d7fac(0x160)](/<troop-(\d+)>/i)){const _0x5d1e48=Number(RegExp['$1']);if(_0x5d1e48===$gameTroop[_0x4d7fac(0x3b6)]()){if(_0x41e8aa[_0x4d7fac(0x160)](/<member-(\d+)>/i))return $gameTroop[_0x4d7fac(0x289)]()[Number(RegExp['$1'])];}}if(_0x41e8aa['match'](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}}return this;},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x2b1)]=Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x15d)],Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x15d)]=function(_0x5bdece){const _0x5abb3f=_0x13ab2e,_0x3eb1cc=this[_0x5abb3f(0x156)](_0x5bdece);VisuMZ['SkillsStatesCore'][_0x5abb3f(0x2b1)][_0x5abb3f(0x13a)](this,_0x5bdece);if(_0x3eb1cc&&this['hasState']($dataStates[_0x5bdece])){this['onAddState'](_0x5bdece);;}},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x30d)]=Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x156)],Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x156)]=function(_0x1ba911){const _0x43908c=_0x13ab2e,_0xf72959=$dataStates[_0x1ba911];if(_0xf72959&&_0xf72959[_0x43908c(0x25e)][_0x43908c(0x160)](/<NO DEATH CLEAR>/i))return!this[_0x43908c(0x1d3)](_0x1ba911)&&!this['isStateRestrict'](_0x1ba911)&&!this[_0x43908c(0x1db)][_0x43908c(0x2ec)](_0x1ba911);return VisuMZ[_0x43908c(0x25d)]['Game_Battler_isStateAddable'][_0x43908c(0x13a)](this,_0x1ba911);},VisuMZ[_0x13ab2e(0x25d)]['Game_BattlerBase_addNewState']=Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x223)],Game_BattlerBase[_0x13ab2e(0x2f5)]['addNewState']=function(_0x56d25b){const _0x548689=_0x13ab2e;VisuMZ[_0x548689(0x25d)][_0x548689(0x1f5)][_0x548689(0x13a)](this,_0x56d25b);if(_0x56d25b===this[_0x548689(0x1a6)]())while(this[_0x548689(0x396)][_0x548689(0x290)](_0x3ef728=>_0x3ef728===this[_0x548689(0x1a6)]())[_0x548689(0x34f)]>0x1){const _0x4786a7=this['_states'][_0x548689(0x261)](this[_0x548689(0x1a6)]());this[_0x548689(0x396)][_0x548689(0x3f4)](_0x4786a7,0x1);}},Game_Battler['prototype'][_0x13ab2e(0x174)]=function(_0x1a9bd3){const _0x5cc9a1=_0x13ab2e;this[_0x5cc9a1(0x19f)](_0x1a9bd3),this['removeOtherStatesOfSameCategory'](_0x1a9bd3),this[_0x5cc9a1(0x1ff)](_0x1a9bd3),this[_0x5cc9a1(0x1b5)](_0x1a9bd3),this[_0x5cc9a1(0x351)](_0x1a9bd3);},Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x2c8)]=function(_0x220ba3){const _0x1aa21a=_0x13ab2e;this['onEraseStateCustomJS'](_0x220ba3),this['onEraseStateGlobalJS'](_0x220ba3),Game_BattlerBase[_0x1aa21a(0x2f5)][_0x1aa21a(0x2c8)][_0x1aa21a(0x13a)](this,_0x220ba3);},Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x24a)]=function(_0x3e2b89){const _0x567fff=_0x13ab2e;for(const _0x2d3453 of this['states']()){this['isStateExpired'](_0x2d3453['id'])&&_0x2d3453[_0x567fff(0x3e2)]===_0x3e2b89&&(this['removeState'](_0x2d3453['id']),this[_0x567fff(0x2a0)](_0x2d3453['id']),this['onExpireStateGlobalJS'](_0x2d3453['id']));}},Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x2a0)]=function(_0x1c8c27){const _0x398cdd=_0x13ab2e;this[_0x398cdd(0x369)](_0x1c8c27);},Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x1b5)]=function(_0x2877c){const _0x47863e=_0x13ab2e;if(this[_0x47863e(0x3de)]||this[_0x47863e(0x178)])return;const _0x49a50e=VisuMZ[_0x47863e(0x25d)][_0x47863e(0x39a)];if(_0x49a50e[_0x2877c])_0x49a50e[_0x2877c]['call'](this,_0x2877c);},Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x37c)]=function(_0x29cdea){const _0x3da555=_0x13ab2e;if(this[_0x3da555(0x3de)]||this[_0x3da555(0x178)])return;const _0x332ee4=VisuMZ[_0x3da555(0x25d)][_0x3da555(0x398)];if(_0x332ee4[_0x29cdea])_0x332ee4[_0x29cdea][_0x3da555(0x13a)](this,_0x29cdea);},Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x369)]=function(_0x313b21){const _0x481dca=_0x13ab2e;if(this['_tempActor']||this['_tempBattler'])return;const _0x56027=VisuMZ[_0x481dca(0x25d)][_0x481dca(0x2f7)];if(_0x56027[_0x313b21])_0x56027[_0x313b21]['call'](this,_0x313b21);},Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x351)]=function(_0x2c64b4){const _0x464fc6=_0x13ab2e;if(this[_0x464fc6(0x3de)]||this[_0x464fc6(0x178)])return;try{VisuMZ[_0x464fc6(0x25d)][_0x464fc6(0x1dc)][_0x464fc6(0x2b2)]['onAddStateJS'][_0x464fc6(0x13a)](this,_0x2c64b4);}catch(_0x1f7c0f){if($gameTemp['isPlaytest']())console[_0x464fc6(0x1a1)](_0x1f7c0f);}},Game_Battler['prototype'][_0x13ab2e(0x208)]=function(_0x54f033){const _0x1cbc29=_0x13ab2e;if(this[_0x1cbc29(0x3de)]||this['_tempBattler'])return;try{VisuMZ['SkillsStatesCore'][_0x1cbc29(0x1dc)]['States'][_0x1cbc29(0x260)][_0x1cbc29(0x13a)](this,_0x54f033);}catch(_0x445c8b){if($gameTemp[_0x1cbc29(0x26e)]())console['log'](_0x445c8b);}},Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x341)]=function(_0x59f7d6){const _0x142d4b=_0x13ab2e;if(this[_0x142d4b(0x3de)]||this[_0x142d4b(0x178)])return;try{VisuMZ[_0x142d4b(0x25d)][_0x142d4b(0x1dc)][_0x142d4b(0x2b2)][_0x142d4b(0x36a)][_0x142d4b(0x13a)](this,_0x59f7d6);}catch(_0x4e9ef0){if($gameTemp[_0x142d4b(0x26e)]())console['log'](_0x4e9ef0);}},Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x1d5)]=function(_0x367a57){const _0x4b52c2=_0x13ab2e;return _0x367a57=_0x367a57[_0x4b52c2(0x30c)]()[_0x4b52c2(0x313)](),this['states']()[_0x4b52c2(0x290)](_0x4e44fc=>_0x4e44fc[_0x4b52c2(0x1f3)][_0x4b52c2(0x284)](_0x367a57));},Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x15e)]=function(_0x2c4164,_0x5414a0){const _0x374c85=_0x13ab2e;_0x2c4164=_0x2c4164['toUpperCase']()[_0x374c85(0x313)](),_0x5414a0=_0x5414a0||0x0;const _0xef26b2=this[_0x374c85(0x1d5)](_0x2c4164),_0x373e55=[];for(const _0xad875a of _0xef26b2){if(!_0xad875a)continue;if(_0x5414a0<=0x0)break;_0x373e55['push'](_0xad875a['id']),this['_result'][_0x374c85(0x2e7)]=!![],_0x5414a0--;}while(_0x373e55[_0x374c85(0x34f)]>0x0){this[_0x374c85(0x240)](_0x373e55[_0x374c85(0x33b)]());}},Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x372)]=function(_0x5738d3,_0x4745ea){const _0x469b30=_0x13ab2e;_0x5738d3=_0x5738d3[_0x469b30(0x30c)]()[_0x469b30(0x313)](),_0x4745ea=_0x4745ea||[];const _0x3c4758=this['statesByCategory'](_0x5738d3),_0x36a2b3=[];for(const _0x59e578 of _0x3c4758){if(!_0x59e578)continue;if(_0x4745ea[_0x469b30(0x284)](_0x59e578))continue;_0x36a2b3[_0x469b30(0x1e6)](_0x59e578['id']),this[_0x469b30(0x1db)][_0x469b30(0x2e7)]=!![];}while(_0x36a2b3[_0x469b30(0x34f)]>0x0){this[_0x469b30(0x240)](_0x36a2b3[_0x469b30(0x33b)]());}},Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x32b)]=function(_0x1d5a7d){return this['totalStateCategoryAffected'](_0x1d5a7d)>0x0;},Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x2a4)]=function(_0x1b4fb0){return this['totalStateCategory'](_0x1b4fb0)>0x0;},Game_Battler[_0x13ab2e(0x2f5)]['totalStateCategoryAffected']=function(_0x51940f){const _0x1c4698=_0x13ab2e,_0x503929=this[_0x1c4698(0x1d5)](_0x51940f)['filter'](_0x56f74e=>this[_0x1c4698(0x299)](_0x56f74e['id']));return _0x503929[_0x1c4698(0x34f)];},Game_Battler[_0x13ab2e(0x2f5)]['totalStateCategory']=function(_0x201a06){const _0x342def=_0x13ab2e,_0x30c211=this[_0x342def(0x1d5)](_0x201a06);return _0x30c211[_0x342def(0x34f)];},VisuMZ['SkillsStatesCore'][_0x13ab2e(0x1fc)]=Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x1d3)],Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x1d3)]=function(_0x8810f6){const _0x51fffe=_0x13ab2e,_0x44ad87=$dataStates[_0x8810f6];if(_0x44ad87&&_0x44ad87['categories'][_0x51fffe(0x34f)]>0x0)for(const _0x2372c3 of _0x44ad87['categories']){if(this[_0x51fffe(0x2f0)](_0x2372c3))return!![];}return VisuMZ[_0x51fffe(0x25d)]['Game_BattlerBase_isStateResist'][_0x51fffe(0x13a)](this,_0x8810f6);},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x2f0)]=function(_0x3d62ef){const _0x28c13c=_0x13ab2e;let _0x2a771b=_0x28c13c(0x154);if(this[_0x28c13c(0x2f2)](_0x2a771b))return this[_0x28c13c(0x3f5)][_0x2a771b][_0x28c13c(0x284)](_0x3d62ef);return this[_0x28c13c(0x3f5)][_0x2a771b]=this[_0x28c13c(0x32f)](),this[_0x28c13c(0x3f5)][_0x2a771b][_0x28c13c(0x284)](_0x3d62ef);},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x32f)]=function(){const _0x1e5a21=_0x13ab2e,_0x4aed0b=/<RESIST STATE (?:CATEGORY|CATEGORIES):[ ](.*)>/gi,_0x45db48=/<RESIST STATE (?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/RESIST STATE (?:CATEGORY|CATEGORIES)>/i;let _0x4babf2=[];for(const _0x2fbaa7 of this[_0x1e5a21(0x380)]()){if(!_0x2fbaa7)continue;const _0x4ef341=_0x2fbaa7[_0x1e5a21(0x25e)],_0x15e85f=_0x4ef341[_0x1e5a21(0x160)](_0x4aed0b);if(_0x15e85f)for(const _0x2d8a76 of _0x15e85f){_0x2d8a76[_0x1e5a21(0x160)](_0x4aed0b);const _0x4b1e6a=String(RegExp['$1'])[_0x1e5a21(0x1f1)](',')[_0x1e5a21(0x18d)](_0x131bcf=>String(_0x131bcf)[_0x1e5a21(0x30c)]()[_0x1e5a21(0x313)]());_0x4babf2=_0x4babf2[_0x1e5a21(0x3db)](_0x4b1e6a);}if(_0x4ef341['match'](_0x45db48)){const _0x39231d=String(RegExp['$1'])[_0x1e5a21(0x1f1)](/[\r\n]+/)[_0x1e5a21(0x18d)](_0x2d077b=>String(_0x2d077b)[_0x1e5a21(0x30c)]()['trim']());_0x4babf2=_0x4babf2['concat'](_0x39231d);}}return _0x4babf2;},Game_BattlerBase[_0x13ab2e(0x2f5)]['removeOtherStatesOfSameCategory']=function(_0x4c27bf){const _0x2a40fa=_0x13ab2e,_0x5b1113=$dataStates[_0x4c27bf];if(!_0x5b1113)return;const _0x555602=_0x5b1113[_0x2a40fa(0x25e)]||'',_0x935015=_0x555602[_0x2a40fa(0x160)](/<REMOVE OTHER (.*) STATES>/gi);if(_0x935015){const _0x3f6e82=[_0x5b1113];for(const _0x123972 of _0x935015){_0x123972[_0x2a40fa(0x160)](/<REMOVE OTHER (.*) STATES>/i);const _0x4a8b12=String(RegExp['$1']);this['removeStatesByCategoryAll'](_0x4a8b12,_0x3f6e82);}}},Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x286)]=function(){const _0xb74835=_0x13ab2e;for(const _0xac22b9 of this[_0xb74835(0x2be)]()){if(!_0xac22b9)continue;if(!this[_0xb74835(0x299)](_0xac22b9['id']))continue;if(!_0xac22b9[_0xb74835(0x2e6)])continue;if(this[_0xb74835(0x19c)](_0xac22b9))continue;Math[_0xb74835(0x3c9)](0x64)<_0xac22b9[_0xb74835(0x2af)]&&this[_0xb74835(0x240)](_0xac22b9['id']);}},VisuMZ[_0x13ab2e(0x25d)]['Game_Action_executeHpDamage_bypassStateDmgRemoval']=Game_Action[_0x13ab2e(0x2f5)][_0x13ab2e(0x25b)],Game_Action['prototype'][_0x13ab2e(0x25b)]=function(_0x1280e3,_0x439119){const _0x259706=_0x13ab2e;$gameTemp[_0x259706(0x311)]=this[_0x259706(0x1b7)](),$gameTemp[_0x259706(0x2c0)]=this[_0x259706(0x1d4)](),$gameTemp[_0x259706(0x3e3)]=_0x439119,VisuMZ['SkillsStatesCore'][_0x259706(0x18e)][_0x259706(0x13a)](this,_0x1280e3,_0x439119),$gameTemp[_0x259706(0x311)]=undefined,$gameTemp[_0x259706(0x2c0)]=undefined,$gameTemp[_0x259706(0x3e3)]=undefined;},Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x19c)]=function(_0x5c1eca){const _0xb6c62f=_0x13ab2e;if($gameTemp[_0xb6c62f(0x311)]){const _0x1731aa=$gameTemp['_bypassRemoveStateDamage_action'],_0x59c511=/<BYPASS STATE DAMAGE REMOVAL:[ ](.*)>/gi;if(DataManager['CheckBypassRemoveStatesByDamage'](_0x5c1eca,_0x1731aa,_0x59c511,_0xb6c62f(0x162)))return!![];}if($gameTemp[_0xb6c62f(0x2c0)]){const _0x324bbe=$gameTemp[_0xb6c62f(0x2c0)];if(_0x324bbe[_0xb6c62f(0x2e9)](_0x5c1eca))return!![];}if(this[_0xb6c62f(0x3cb)](_0x5c1eca))return!![];return![];},Game_Battler[_0x13ab2e(0x2f5)]['isUserBypassRemoveStatesByDamage']=function(_0x3e40cb){const _0x6e5297=_0x13ab2e,_0x208b4c=/<BYPASS STATE DAMAGE REMOVAL AS (?:ATTACKER|USER):[ ](.*)>/gi;for(const _0x28d496 of this[_0x6e5297(0x380)]()){if(!_0x28d496)continue;if(DataManager[_0x6e5297(0x268)](_0x3e40cb,_0x28d496,_0x208b4c,_0x6e5297(0x14f)))return!![];}return![];},Game_Battler['prototype'][_0x13ab2e(0x3cb)]=function(_0xc9e9a4){const _0x5c8333=_0x13ab2e,_0x59b608=/<BYPASS STATE DAMAGE REMOVAL AS (?:TARGET|VICTIM):[ ](.*)>/gi;for(const _0xba3294 of this['traitObjects']()){if(!_0xba3294)continue;if(DataManager[_0x5c8333(0x268)](_0xc9e9a4,_0xba3294,_0x59b608,_0x5c8333(0x1be)))return!![];}return![];},DataManager['CheckBypassRemoveStatesByDamage']=function(_0x213a70,_0xa9a408,_0x174caf,_0x2a9aa5){const _0x262db1=_0x13ab2e,_0x2fc361=_0x262db1(0x329)['format'](_0xa9a408['name'],_0xa9a408['id'],_0x2a9aa5);this[_0x262db1(0x248)]=this[_0x262db1(0x248)]||{};if(this[_0x262db1(0x248)][_0x2fc361]!==undefined)return this[_0x262db1(0x248)][_0x2fc361][_0x262db1(0x284)](_0x213a70['id']);const _0x19229b=[],_0x107a75=_0xa9a408[_0x262db1(0x25e)][_0x262db1(0x160)](_0x174caf);if(_0x107a75)for(const _0x3331ba of _0x107a75){_0x3331ba[_0x262db1(0x160)](_0x174caf);const _0x133021=String(RegExp['$1'])[_0x262db1(0x1f1)](',')[_0x262db1(0x18d)](_0x4d76fc=>_0x4d76fc[_0x262db1(0x313)]());for(let _0x440d6e of _0x133021){_0x440d6e=(String(_0x440d6e)||'')[_0x262db1(0x313)]();if(_0x440d6e[_0x262db1(0x160)](/(\d+)[ ](?:THROUGH|to)[ ](\d+)/i)){const _0x5a1162=Math[_0x262db1(0x27d)](Number(RegExp['$1']),Number(RegExp['$2'])),_0x4e379e=Math['max'](Number(RegExp['$1']),Number(RegExp['$2']));for(let _0x3d30dc=_0x5a1162;_0x3d30dc<=_0x4e379e;_0x3d30dc++)elements[_0x262db1(0x1e6)](_0x3d30dc);continue;}const _0x4c3f2c=/^\d+$/[_0x262db1(0x274)](_0x440d6e);_0x4c3f2c?entryID=Number(_0x440d6e):entryID=DataManager['getStateIdWithName'](_0x440d6e),entryID&&_0x19229b[_0x262db1(0x1e6)](entryID);}}return this['_cache_CheckBypassRemoveStatesByDamage'][_0x2fc361]=_0x19229b,this['_cache_CheckBypassRemoveStatesByDamage'][_0x2fc361][_0x262db1(0x284)](_0x213a70['id']);},VisuMZ[_0x13ab2e(0x25d)]['Game_Battler_addBuff']=Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x22b)],Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x22b)]=function(_0xaaf840,_0x4a870c){const _0x202a41=_0x13ab2e;VisuMZ['SkillsStatesCore'][_0x202a41(0x270)][_0x202a41(0x13a)](this,_0xaaf840,_0x4a870c),this['isBuffAffected'](_0xaaf840)&&this['onAddBuff'](_0xaaf840,_0x4a870c);},Game_Battler[_0x13ab2e(0x2f5)]['isBuffPrevented']=function(_0x5ddacc){},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x231)]=Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x2dd)],Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x2dd)]=function(_0xce94f0,_0xb2df6){const _0x266efe=_0x13ab2e;VisuMZ[_0x266efe(0x25d)][_0x266efe(0x231)][_0x266efe(0x13a)](this,_0xce94f0,_0xb2df6),this[_0x266efe(0x2d1)](_0xce94f0)&&this[_0x266efe(0x258)](_0xce94f0,_0xb2df6);},Game_Battler[_0x13ab2e(0x2f5)]['removeBuffsAuto']=function(){const _0x324450=_0x13ab2e;for(let _0x2f2902=0x0;_0x2f2902<this['buffLength']();_0x2f2902++){if(this[_0x324450(0x1c3)](_0x2f2902)){const _0x3301e2=this[_0x324450(0x143)][_0x2f2902];this[_0x324450(0x3da)](_0x2f2902);if(_0x3301e2>0x0)this[_0x324450(0x1e2)](_0x2f2902);if(_0x3301e2<0x0)this[_0x324450(0x2a3)](_0x2f2902);}}},Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x2b8)]=function(_0x1d8db4,_0x2119a4){this['onAddBuffGlobalJS'](_0x1d8db4,_0x2119a4);},Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x258)]=function(_0x219b3f,_0x3fa2b5){const _0x406f68=_0x13ab2e;this[_0x406f68(0x236)](_0x219b3f,_0x3fa2b5);},Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x368)]=function(_0x255750){const _0x1aeef6=_0x13ab2e;Game_BattlerBase[_0x1aeef6(0x2f5)][_0x1aeef6(0x368)][_0x1aeef6(0x13a)](this,_0x255750),this[_0x1aeef6(0x27e)](_0x255750);},Game_Battler['prototype'][_0x13ab2e(0x306)]=function(_0x1a0c91){const _0x277feb=_0x13ab2e;Game_BattlerBase[_0x277feb(0x2f5)][_0x277feb(0x306)][_0x277feb(0x13a)](this,_0x1a0c91),this[_0x277feb(0x192)](_0x1a0c91);},Game_Battler['prototype'][_0x13ab2e(0x1e2)]=function(_0x507174){this['onExpireBuffGlobalJS'](_0x507174);},Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x2a3)]=function(_0x29a730){const _0x45d58b=_0x13ab2e;this[_0x45d58b(0x273)](_0x29a730);},Game_Battler['prototype'][_0x13ab2e(0x32c)]=function(_0x59440c,_0x595a5c){const _0x261ffb=_0x13ab2e;VisuMZ['SkillsStatesCore'][_0x261ffb(0x1dc)]['Buffs'][_0x261ffb(0x35b)][_0x261ffb(0x13a)](this,_0x59440c,_0x595a5c);},Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x236)]=function(_0x236c4d,_0x26830c){const _0x277343=_0x13ab2e;VisuMZ[_0x277343(0x25d)]['Settings'][_0x277343(0x370)][_0x277343(0x2fa)]['call'](this,_0x236c4d,_0x26830c);},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x27e)]=function(_0x41cc6d){const _0x48e779=_0x13ab2e;VisuMZ[_0x48e779(0x25d)][_0x48e779(0x1dc)][_0x48e779(0x370)][_0x48e779(0x1a4)][_0x48e779(0x13a)](this,_0x41cc6d);},Game_BattlerBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x192)]=function(_0x45061e){const _0x530e9a=_0x13ab2e;VisuMZ['SkillsStatesCore']['Settings'][_0x530e9a(0x370)][_0x530e9a(0x249)][_0x530e9a(0x13a)](this,_0x45061e);},Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x3eb)]=function(_0x250d5d){const _0xe40d48=_0x13ab2e;VisuMZ['SkillsStatesCore'][_0xe40d48(0x1dc)]['Buffs'][_0xe40d48(0x348)][_0xe40d48(0x13a)](this,_0x250d5d);},Game_Battler['prototype'][_0x13ab2e(0x273)]=function(_0x13a4e9){const _0x414f09=_0x13ab2e;VisuMZ['SkillsStatesCore'][_0x414f09(0x1dc)][_0x414f09(0x370)][_0x414f09(0x334)][_0x414f09(0x13a)](this,_0x13a4e9);},Game_Battler[_0x13ab2e(0x2f5)]['onAddStateMakeCustomSlipValues']=function(_0x18deff){const _0x5191b6=_0x13ab2e,_0x442dd7=VisuMZ['SkillsStatesCore'],_0xf0163f=[_0x5191b6(0x163),_0x5191b6(0x3bb),_0x5191b6(0x312),_0x5191b6(0x2b9),'stateTpSlipDamageJS',_0x5191b6(0x3ce)];for(const _0x31c2ff of _0xf0163f){_0x442dd7[_0x31c2ff][_0x18deff]&&_0x442dd7[_0x31c2ff][_0x18deff]['call'](this,_0x18deff);}},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x1f6)]=Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x39f)],Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x39f)]=function(){const _0x27be4d=_0x13ab2e;this['recalculateSlipDamageJS'](),VisuMZ['SkillsStatesCore'][_0x27be4d(0x1f6)][_0x27be4d(0x13a)](this),this[_0x27be4d(0x1b6)](),this[_0x27be4d(0x21d)]();},Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x1b6)]=function(){const _0x501e4f=_0x13ab2e;for(const _0x543fd6 of this['passiveStates']()){if(!_0x543fd6)continue;this[_0x501e4f(0x1ff)](_0x543fd6['id']);}},Game_Battler[_0x13ab2e(0x2f5)]['recalculateSlipDamageJS']=function(){const _0x5dcbfe=_0x13ab2e;for(const _0x2654b9 of this[_0x5dcbfe(0x2be)]()){if(!_0x2654b9)continue;_0x2654b9[_0x5dcbfe(0x25e)][_0x5dcbfe(0x160)](/<JS SLIP REFRESH>/i)&&this[_0x5dcbfe(0x1ff)](_0x2654b9['id']);}},Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x21d)]=function(){const _0x420fd8=_0x13ab2e;if(!this['isAlive']())return;const _0x51fc40=this[_0x420fd8(0x2be)]();for(const _0x2479cf of _0x51fc40){if(!_0x2479cf)continue;this[_0x420fd8(0x3ea)](_0x2479cf);}},Game_Battler[_0x13ab2e(0x2f5)][_0x13ab2e(0x3ea)]=function(_0x4b1f90){const _0x526542=_0x13ab2e,_0x35c6ed=this[_0x526542(0x3fa)](_0x4b1f90['id'],_0x526542(0x355))||0x0,_0x206699=-this[_0x526542(0x16d)](),_0x1eb630=Math[_0x526542(0x1cc)](_0x35c6ed,_0x206699);if(_0x1eb630!==0x0){const _0x2110c0=this[_0x526542(0x1db)]['hpDamage']||0x0;this[_0x526542(0x180)](_0x1eb630),this['_result'][_0x526542(0x2d7)]+=_0x2110c0;}const _0x2b705a=this[_0x526542(0x3fa)](_0x4b1f90['id'],_0x526542(0x38e))||0x0;if(_0x2b705a!==0x0){const _0x4202c0=this[_0x526542(0x1db)][_0x526542(0x33f)]||0x0;this[_0x526542(0x2cd)](_0x2b705a),this[_0x526542(0x1db)]['mpDamage']+=_0x4202c0;}const _0x47ab79=this[_0x526542(0x3fa)](_0x4b1f90['id'],_0x526542(0x2b7))||0x0;_0x47ab79!==0x0&&this['gainSilentTp'](_0x47ab79);},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x166)]=Game_Actor[_0x13ab2e(0x2f5)][_0x13ab2e(0x2f1)],Game_Actor[_0x13ab2e(0x2f5)][_0x13ab2e(0x2f1)]=function(){const _0x1ac675=_0x13ab2e,_0x21b0d4=VisuMZ[_0x1ac675(0x25d)]['Game_Actor_skillTypes'][_0x1ac675(0x13a)](this),_0xff61f0=VisuMZ[_0x1ac675(0x25d)]['Settings'][_0x1ac675(0x193)];let _0x33b4aa=_0xff61f0[_0x1ac675(0x280)];return $gameParty['inBattle']()&&(_0x33b4aa=_0x33b4aa[_0x1ac675(0x3db)](_0xff61f0[_0x1ac675(0x27f)])),_0x21b0d4[_0x1ac675(0x290)](_0x5b41e6=>!_0x33b4aa[_0x1ac675(0x284)](_0x5b41e6));},Game_Actor[_0x13ab2e(0x2f5)][_0x13ab2e(0x287)]=function(){const _0x308cbd=_0x13ab2e;return this[_0x308cbd(0x1dd)]()['filter'](_0x580741=>this[_0x308cbd(0x302)](_0x580741));},Game_Actor[_0x13ab2e(0x2f5)][_0x13ab2e(0x302)]=function(_0x2b2b15){const _0x107f93=_0x13ab2e;if(!this[_0x107f93(0x244)](_0x2b2b15))return![];if(!_0x2b2b15)return![];if(!this[_0x107f93(0x1a9)](_0x2b2b15))return![];if(this[_0x107f93(0x296)](_0x2b2b15))return![];return!![];},Game_Actor[_0x13ab2e(0x2f5)][_0x13ab2e(0x1a9)]=function(_0x431fa4){const _0x599f3f=_0x13ab2e,_0x2a77d7=this['skillTypes'](),_0x60d918=DataManager[_0x599f3f(0x24b)](_0x431fa4),_0x409e84=_0x2a77d7[_0x599f3f(0x290)](_0x1927fc=>_0x60d918[_0x599f3f(0x284)](_0x1927fc));return _0x409e84[_0x599f3f(0x34f)]>0x0;},Game_Actor[_0x13ab2e(0x2f5)]['isSkillHidden']=function(_0x50268c){const _0x26369c=_0x13ab2e;if(!VisuMZ[_0x26369c(0x25d)][_0x26369c(0x137)](this,_0x50268c))return!![];if(!VisuMZ[_0x26369c(0x25d)][_0x26369c(0x1b3)](this,_0x50268c))return!![];if(!VisuMZ['SkillsStatesCore'][_0x26369c(0x3ee)](this,_0x50268c))return!![];return![];},Game_Actor[_0x13ab2e(0x2f5)][_0x13ab2e(0x1e1)]=function(){const _0x365902=_0x13ab2e;let _0x26d1d1=[this[_0x365902(0x2cf)](),this[_0x365902(0x279)]()];_0x26d1d1=_0x26d1d1['concat'](this['equips']()[_0x365902(0x290)](_0x2bdbfc=>_0x2bdbfc));for(const _0x2fe277 of this[_0x365902(0x295)]){const _0x4be0e9=$dataSkills[_0x2fe277];if(!_0x4be0e9)continue;_0x26d1d1[_0x365902(0x1e6)](_0x4be0e9);}return _0x26d1d1;},Game_Actor[_0x13ab2e(0x2f5)][_0x13ab2e(0x327)]=function(){const _0x4880e0=_0x13ab2e;Game_Battler[_0x4880e0(0x2f5)][_0x4880e0(0x327)]['call'](this);const _0x4ce1cb=VisuMZ[_0x4880e0(0x25d)]['Settings']['PassiveStates'][_0x4880e0(0x2c6)];this[_0x4880e0(0x3f5)][_0x4880e0(0x374)]=this['_cache']['passiveStates'][_0x4880e0(0x3db)](_0x4ce1cb);},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x1ce)]=Game_Actor[_0x13ab2e(0x2f5)][_0x13ab2e(0x1ba)],Game_Actor['prototype'][_0x13ab2e(0x1ba)]=function(_0x4ef559){const _0x40c4e7=_0x13ab2e;VisuMZ[_0x40c4e7(0x25d)][_0x40c4e7(0x1ce)][_0x40c4e7(0x13a)](this,_0x4ef559),this[_0x40c4e7(0x3f5)]={},this[_0x40c4e7(0x374)]();},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x298)]=Game_Actor[_0x13ab2e(0x2f5)][_0x13ab2e(0x36c)],Game_Actor[_0x13ab2e(0x2f5)]['forgetSkill']=function(_0x22a476){const _0x56a42c=_0x13ab2e;VisuMZ['SkillsStatesCore']['Game_Actor_forgetSkill'][_0x56a42c(0x13a)](this,_0x22a476),this['_cache']={},this['passiveStates']();},Game_Actor[_0x13ab2e(0x2f5)][_0x13ab2e(0x31e)]=function(){const _0x4acfaa=_0x13ab2e;return VisuMZ['SkillsStatesCore'][_0x4acfaa(0x1dc)][_0x4acfaa(0x2b2)][_0x4acfaa(0x34e)]??0x14;},Game_Enemy[_0x13ab2e(0x2f5)][_0x13ab2e(0x1e1)]=function(){const _0x22125e=_0x13ab2e;let _0x21ccf4=[this['enemy']()];return _0x21ccf4['concat'](this[_0x22125e(0x1dd)]());},Game_Enemy[_0x13ab2e(0x2f5)][_0x13ab2e(0x327)]=function(){const _0x340b4a=_0x13ab2e;Game_Battler[_0x340b4a(0x2f5)][_0x340b4a(0x327)][_0x340b4a(0x13a)](this);const _0x3adb71=VisuMZ[_0x340b4a(0x25d)][_0x340b4a(0x1dc)][_0x340b4a(0x2b3)]['Enemy'];this[_0x340b4a(0x3f5)]['passiveStates']=this[_0x340b4a(0x3f5)]['passiveStates'][_0x340b4a(0x3db)](_0x3adb71);},Game_Enemy[_0x13ab2e(0x2f5)][_0x13ab2e(0x1dd)]=function(){const _0x4869e9=_0x13ab2e,_0xb5adb5=[];for(const _0x5a6e1e of this[_0x4869e9(0x1c4)]()[_0x4869e9(0x301)]){const _0x1c2c49=$dataSkills[_0x5a6e1e['skillId']];if(_0x1c2c49&&!_0xb5adb5[_0x4869e9(0x284)](_0x1c2c49))_0xb5adb5[_0x4869e9(0x1e6)](_0x1c2c49);}return _0xb5adb5;},Game_Enemy['prototype'][_0x13ab2e(0x23b)]=function(_0x54ae4f){const _0x470607=_0x13ab2e;return this[_0x470607(0x2b4)]($dataStates[_0x54ae4f]);},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x34d)]=Game_Unit[_0x13ab2e(0x2f5)]['isAllDead'],Game_Unit[_0x13ab2e(0x2f5)][_0x13ab2e(0x204)]=function(){const _0x57d7c4=_0x13ab2e;if(this[_0x57d7c4(0x33a)]())return!![];return VisuMZ['SkillsStatesCore'][_0x57d7c4(0x34d)][_0x57d7c4(0x13a)](this);},Game_Unit[_0x13ab2e(0x2f5)][_0x13ab2e(0x33a)]=function(){const _0x3fecf1=_0x13ab2e,_0x54a958=this[_0x3fecf1(0x28f)]();for(const _0x58d584 of _0x54a958){if(!_0x58d584[_0x3fecf1(0x135)]())return![];}return!![];},Game_Unit[_0x13ab2e(0x2f5)]['refreshAllMembers']=function(){const _0x53b377=_0x13ab2e;for(const _0x4c0ffb of this['members']()){if(!_0x4c0ffb)continue;_0x4c0ffb[_0x53b377(0x3f0)]();}},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x2cb)]=Game_Player['prototype'][_0x13ab2e(0x3f0)],Game_Player['prototype'][_0x13ab2e(0x3f0)]=function(){const _0x5bebb7=_0x13ab2e;VisuMZ['SkillsStatesCore'][_0x5bebb7(0x2cb)]['call'](this),$gameParty[_0x5bebb7(0x3d2)](),$gameParty[_0x5bebb7(0x2d4)]()&&$gameTroop[_0x5bebb7(0x3d2)]();},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x3a1)]=Game_Troop[_0x13ab2e(0x2f5)]['setup'],Game_Troop[_0x13ab2e(0x2f5)]['setup']=function(_0x309bcc){const _0x2ab52e=_0x13ab2e;VisuMZ['SkillsStatesCore']['Game_Troop_setup']['call'](this,_0x309bcc),this[_0x2ab52e(0x12c)]();},Game_Troop['prototype'][_0x13ab2e(0x12c)]=function(){const _0x29267a=_0x13ab2e;this[_0x29267a(0x1a7)]=Graphics[_0x29267a(0x2ac)];},Game_Troop[_0x13ab2e(0x2f5)]['getCurrentTroopUniqueID']=function(){const _0x4a493e=_0x13ab2e;return this[_0x4a493e(0x1a7)]=this[_0x4a493e(0x1a7)]||Graphics[_0x4a493e(0x2ac)],this[_0x4a493e(0x1a7)];},Scene_Skill[_0x13ab2e(0x2f5)][_0x13ab2e(0x2d6)]=function(){const _0x31eee8=_0x13ab2e;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x31eee8(0x209)]!==undefined)return ConfigManager[_0x31eee8(0x209)];else{if(this[_0x31eee8(0x3ef)]())return this['updatedLayoutStyle']()['match'](/LOWER/i);else Scene_ItemBase[_0x31eee8(0x2f5)][_0x31eee8(0x230)][_0x31eee8(0x13a)](this);}},Scene_Skill[_0x13ab2e(0x2f5)][_0x13ab2e(0x230)]=function(){const _0xe075d=_0x13ab2e;if(ConfigManager[_0xe075d(0x288)]&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager[_0xe075d(0x1d0)];else return this[_0xe075d(0x3ef)]()?this[_0xe075d(0x321)]()[_0xe075d(0x160)](/RIGHT/i):Scene_ItemBase[_0xe075d(0x2f5)][_0xe075d(0x230)][_0xe075d(0x13a)](this);},Scene_Skill[_0x13ab2e(0x2f5)][_0x13ab2e(0x321)]=function(){const _0x1465d3=_0x13ab2e;return VisuMZ[_0x1465d3(0x25d)][_0x1465d3(0x1dc)][_0x1465d3(0x193)]['LayoutStyle'];},Scene_Skill[_0x13ab2e(0x2f5)][_0x13ab2e(0x3e1)]=function(){const _0x4f2b85=_0x13ab2e;return this[_0x4f2b85(0x402)]&&this[_0x4f2b85(0x402)][_0x4f2b85(0x3e1)]();},Scene_Skill[_0x13ab2e(0x2f5)][_0x13ab2e(0x3ef)]=function(){const _0x50c72c=_0x13ab2e;return VisuMZ[_0x50c72c(0x25d)]['Settings'][_0x50c72c(0x193)][_0x50c72c(0x3f8)];},VisuMZ['SkillsStatesCore']['Scene_Skill_helpWindowRect']=Scene_Skill[_0x13ab2e(0x2f5)][_0x13ab2e(0x14c)],Scene_Skill[_0x13ab2e(0x2f5)][_0x13ab2e(0x14c)]=function(){const _0x1ee4a7=_0x13ab2e;return this[_0x1ee4a7(0x3ef)]()?this[_0x1ee4a7(0x1a0)]():VisuMZ[_0x1ee4a7(0x25d)][_0x1ee4a7(0x381)]['call'](this);},Scene_Skill[_0x13ab2e(0x2f5)][_0x13ab2e(0x1a0)]=function(){const _0x1a381d=_0x13ab2e,_0xf4eea3=0x0,_0x4ad27a=this[_0x1a381d(0x1ac)](),_0x4a450c=Graphics[_0x1a381d(0x1ae)],_0x25864c=this[_0x1a381d(0x2ef)]();return new Rectangle(_0xf4eea3,_0x4ad27a,_0x4a450c,_0x25864c);},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x2dc)]=Scene_Skill[_0x13ab2e(0x2f5)][_0x13ab2e(0x1f2)],Scene_Skill[_0x13ab2e(0x2f5)][_0x13ab2e(0x1f2)]=function(){const _0x133380=_0x13ab2e;return this[_0x133380(0x3ef)]()?this['skillTypeWindowRectSkillsStatesCore']():VisuMZ[_0x133380(0x25d)][_0x133380(0x2dc)][_0x133380(0x13a)](this);},Scene_Skill[_0x13ab2e(0x2f5)]['mainCommandWidth']=function(){const _0x5c7570=_0x13ab2e;return VisuMZ[_0x5c7570(0x25d)][_0x5c7570(0x1dc)][_0x5c7570(0x193)][_0x5c7570(0x291)]??Scene_MenuBase[_0x5c7570(0x2f5)][_0x5c7570(0x3b8)][_0x5c7570(0x13a)](this);},Scene_Skill['prototype']['skillTypeWindowRectSkillsStatesCore']=function(){const _0x4107ac=_0x13ab2e,_0x5ac3eb=this[_0x4107ac(0x3b8)](),_0x33da31=this[_0x4107ac(0x2c7)](0x3,!![]),_0x26dc89=this[_0x4107ac(0x230)]()?Graphics['boxWidth']-_0x5ac3eb:0x0,_0x38f17f=this[_0x4107ac(0x281)]();return new Rectangle(_0x26dc89,_0x38f17f,_0x5ac3eb,_0x33da31);},VisuMZ[_0x13ab2e(0x25d)]['Scene_Skill_statusWindowRect']=Scene_Skill[_0x13ab2e(0x2f5)][_0x13ab2e(0x26a)],Scene_Skill[_0x13ab2e(0x2f5)][_0x13ab2e(0x26a)]=function(){const _0x15520c=_0x13ab2e;return this['isUseSkillsStatesCoreUpdatedLayout']()?this[_0x15520c(0x1fd)]():VisuMZ[_0x15520c(0x25d)][_0x15520c(0x189)][_0x15520c(0x13a)](this);},Scene_Skill[_0x13ab2e(0x2f5)]['statusWindowRectSkillsStatesCore']=function(){const _0x2b283e=_0x13ab2e,_0x935f14=Graphics[_0x2b283e(0x1ae)]-this['mainCommandWidth'](),_0x53d4e3=this['_skillTypeWindow'][_0x2b283e(0x2ae)],_0x4f277a=this['isRightInputMode']()?0x0:Graphics['boxWidth']-_0x935f14,_0x3599d1=this[_0x2b283e(0x281)]();return new Rectangle(_0x4f277a,_0x3599d1,_0x935f14,_0x53d4e3);},VisuMZ['SkillsStatesCore'][_0x13ab2e(0x2c3)]=Scene_Skill[_0x13ab2e(0x2f5)][_0x13ab2e(0x1f4)],Scene_Skill[_0x13ab2e(0x2f5)][_0x13ab2e(0x1f4)]=function(){const _0x148f4f=_0x13ab2e;VisuMZ[_0x148f4f(0x25d)][_0x148f4f(0x2c3)][_0x148f4f(0x13a)](this),this[_0x148f4f(0x2a9)]()&&this['createShopStatusWindow']();},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x1cb)]=Scene_Skill[_0x13ab2e(0x2f5)][_0x13ab2e(0x182)],Scene_Skill[_0x13ab2e(0x2f5)][_0x13ab2e(0x182)]=function(){const _0x3a69d5=_0x13ab2e;if(this['isUseSkillsStatesCoreUpdatedLayout']())return this['itemWindowRectSkillsStatesCore']();else{const _0x22a84b=VisuMZ[_0x3a69d5(0x25d)][_0x3a69d5(0x1cb)][_0x3a69d5(0x13a)](this);return this[_0x3a69d5(0x2a9)]()&&this['adjustItemWidthByShopStatus']()&&(_0x22a84b[_0x3a69d5(0x357)]-=this[_0x3a69d5(0x129)]()),_0x22a84b;}},Scene_Skill[_0x13ab2e(0x2f5)][_0x13ab2e(0x3e9)]=function(){const _0x1b0cc2=_0x13ab2e,_0x475f0c=Graphics[_0x1b0cc2(0x1ae)]-this[_0x1b0cc2(0x129)](),_0x5909e7=this[_0x1b0cc2(0x3a0)]()-this[_0x1b0cc2(0x384)][_0x1b0cc2(0x2ae)],_0xe06db2=this[_0x1b0cc2(0x230)]()?Graphics[_0x1b0cc2(0x1ae)]-_0x475f0c:0x0,_0x12dacf=this[_0x1b0cc2(0x384)]['y']+this[_0x1b0cc2(0x384)][_0x1b0cc2(0x2ae)];return new Rectangle(_0xe06db2,_0x12dacf,_0x475f0c,_0x5909e7);},Scene_Skill[_0x13ab2e(0x2f5)][_0x13ab2e(0x2a9)]=function(){const _0x12a69b=_0x13ab2e;if(!Imported[_0x12a69b(0x362)])return![];else return this['isUseSkillsStatesCoreUpdatedLayout']()?!![]:VisuMZ['SkillsStatesCore']['Settings'][_0x12a69b(0x193)][_0x12a69b(0x2fb)];},Scene_Skill['prototype'][_0x13ab2e(0x378)]=function(){const _0x43ed3b=_0x13ab2e;return VisuMZ[_0x43ed3b(0x25d)][_0x43ed3b(0x1dc)][_0x43ed3b(0x193)]['SkillSceneAdjustSkillList'];},Scene_Skill[_0x13ab2e(0x2f5)][_0x13ab2e(0x26d)]=function(){const _0x2ae35b=_0x13ab2e,_0x5a3e21=this['shopStatusWindowRect']();this[_0x2ae35b(0x184)]=new Window_ShopStatus(_0x5a3e21),this[_0x2ae35b(0x3c3)](this[_0x2ae35b(0x184)]),this[_0x2ae35b(0x319)]['setStatusWindow'](this[_0x2ae35b(0x184)]);const _0x4d6726=VisuMZ[_0x2ae35b(0x25d)][_0x2ae35b(0x1dc)][_0x2ae35b(0x193)][_0x2ae35b(0x232)];this['_shopStatusWindow'][_0x2ae35b(0x390)](_0x4d6726||0x0);},Scene_Skill['prototype'][_0x13ab2e(0x344)]=function(){const _0x1e0729=_0x13ab2e;return this['isUseSkillsStatesCoreUpdatedLayout']()?this[_0x1e0729(0x1ef)]():VisuMZ[_0x1e0729(0x25d)][_0x1e0729(0x1dc)][_0x1e0729(0x193)]['SkillMenuStatusRect'][_0x1e0729(0x13a)](this);},Scene_Skill[_0x13ab2e(0x2f5)][_0x13ab2e(0x1ef)]=function(){const _0x571aaa=_0x13ab2e,_0x586e0b=this[_0x571aaa(0x129)](),_0x7f27ac=this[_0x571aaa(0x319)][_0x571aaa(0x2ae)],_0x62c6e8=this[_0x571aaa(0x230)]()?0x0:Graphics['boxWidth']-this['shopStatusWidth'](),_0x633de2=this[_0x571aaa(0x319)]['y'];return new Rectangle(_0x62c6e8,_0x633de2,_0x586e0b,_0x7f27ac);},Scene_Skill[_0x13ab2e(0x2f5)][_0x13ab2e(0x129)]=function(){return Imported['VisuMZ_1_ItemsEquipsCore']?Scene_Shop['prototype']['statusWidth']():0x0;},Scene_Skill['prototype'][_0x13ab2e(0x226)]=function(){const _0x5c0b9f=_0x13ab2e;return this[_0x5c0b9f(0x2a7)]&&this[_0x5c0b9f(0x2a7)][_0x5c0b9f(0x17f)]?TextManager[_0x5c0b9f(0x375)]:'';},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x336)]=Sprite_Gauge[_0x13ab2e(0x2f5)][_0x13ab2e(0x146)],Sprite_Gauge[_0x13ab2e(0x2f5)][_0x13ab2e(0x146)]=function(){const _0x4f3f64=_0x13ab2e;VisuMZ['SkillsStatesCore'][_0x4f3f64(0x336)][_0x4f3f64(0x13a)](this),this[_0x4f3f64(0x3a6)]=null;},VisuMZ['SkillsStatesCore'][_0x13ab2e(0x3b9)]=Sprite_Gauge[_0x13ab2e(0x2f5)][_0x13ab2e(0x19b)],Sprite_Gauge[_0x13ab2e(0x2f5)][_0x13ab2e(0x19b)]=function(_0x50d258,_0x5e1a68){const _0x33a8b0=_0x13ab2e;this[_0x33a8b0(0x216)](_0x50d258,_0x5e1a68),_0x5e1a68=_0x5e1a68[_0x33a8b0(0x278)](),VisuMZ[_0x33a8b0(0x25d)][_0x33a8b0(0x3b9)][_0x33a8b0(0x13a)](this,_0x50d258,_0x5e1a68);},Sprite_Gauge['prototype'][_0x13ab2e(0x216)]=function(_0x5a7d27,_0xe531ce){const _0x583b63=_0x13ab2e,_0x21d213=VisuMZ[_0x583b63(0x25d)][_0x583b63(0x1dc)][_0x583b63(0x37b)]['filter'](_0x336d80=>_0x336d80['Name'][_0x583b63(0x30c)]()===_0xe531ce[_0x583b63(0x30c)]());_0x21d213[_0x583b63(0x34f)]>=0x1?this[_0x583b63(0x3a6)]=_0x21d213[0x0]:this['_costSettings']=null;},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x2db)]=Sprite_Gauge[_0x13ab2e(0x2f5)]['currentValue'],Sprite_Gauge[_0x13ab2e(0x2f5)][_0x13ab2e(0x309)]=function(){const _0xa4068d=_0x13ab2e;return this[_0xa4068d(0x3dc)]&&this['_costSettings']?this[_0xa4068d(0x24c)]():VisuMZ['SkillsStatesCore'][_0xa4068d(0x2db)][_0xa4068d(0x13a)](this);},Sprite_Gauge[_0x13ab2e(0x2f5)][_0x13ab2e(0x24c)]=function(){const _0x2e2783=_0x13ab2e;return this['_costSettings'][_0x2e2783(0x2ad)][_0x2e2783(0x13a)](this[_0x2e2783(0x3dc)]);},VisuMZ['SkillsStatesCore'][_0x13ab2e(0x3a3)]=Sprite_Gauge[_0x13ab2e(0x2f5)][_0x13ab2e(0x3d7)],Sprite_Gauge[_0x13ab2e(0x2f5)][_0x13ab2e(0x3d7)]=function(){const _0x147b10=_0x13ab2e;return this[_0x147b10(0x3dc)]&&this[_0x147b10(0x3a6)]?this['currentMaxValueSkillsStatesCore']():VisuMZ[_0x147b10(0x25d)][_0x147b10(0x3a3)]['call'](this);},Sprite_Gauge[_0x13ab2e(0x2f5)][_0x13ab2e(0x386)]=function(){const _0x370bef=_0x13ab2e;return this[_0x370bef(0x3a6)][_0x370bef(0x277)][_0x370bef(0x13a)](this[_0x370bef(0x3dc)]);},VisuMZ['SkillsStatesCore'][_0x13ab2e(0x32e)]=Sprite_Gauge[_0x13ab2e(0x2f5)]['gaugeRate'],Sprite_Gauge[_0x13ab2e(0x2f5)]['gaugeRate']=function(){const _0x4d77ca=_0x13ab2e,_0x1a8a78=VisuMZ[_0x4d77ca(0x25d)][_0x4d77ca(0x32e)][_0x4d77ca(0x13a)](this);return _0x1a8a78[_0x4d77ca(0x3d5)](0x0,0x1);},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x34b)]=Sprite_Gauge[_0x13ab2e(0x2f5)][_0x13ab2e(0x300)],Sprite_Gauge[_0x13ab2e(0x2f5)][_0x13ab2e(0x300)]=function(){const _0x5f2a1c=_0x13ab2e;this[_0x5f2a1c(0x3dc)]&&this[_0x5f2a1c(0x3a6)]?(this[_0x5f2a1c(0x1aa)]['clear'](),this[_0x5f2a1c(0x283)]()):VisuMZ[_0x5f2a1c(0x25d)][_0x5f2a1c(0x34b)][_0x5f2a1c(0x13a)](this);},Sprite_Gauge[_0x13ab2e(0x2f5)][_0x13ab2e(0x2c2)]=function(){const _0xc3bd4e=_0x13ab2e;let _0xfab45e=this[_0xc3bd4e(0x309)]();return Imported['VisuMZ_0_CoreEngine']&&this[_0xc3bd4e(0x1af)]()&&(_0xfab45e=VisuMZ['GroupDigits'](_0xfab45e)),_0xfab45e;},Sprite_Gauge[_0x13ab2e(0x2f5)][_0x13ab2e(0x283)]=function(){const _0x1e2a35=_0x13ab2e;this[_0x1e2a35(0x1aa)]['clear'](),this[_0x1e2a35(0x3a6)][_0x1e2a35(0x23a)][_0x1e2a35(0x13a)](this);},Sprite_Gauge['prototype'][_0x13ab2e(0x17e)]=function(_0x596264,_0x164d6b,_0x7eddf8,_0x27ca1f,_0x4e1048,_0x42ebbb){const _0x432ae0=_0x13ab2e,_0x167272=this[_0x432ae0(0x35f)](),_0x3bd6a7=Math[_0x432ae0(0x38d)]((_0x4e1048-0x2)*_0x167272),_0x28e662=_0x42ebbb-0x2,_0x53d7a7=this[_0x432ae0(0x39c)]();this[_0x432ae0(0x1aa)][_0x432ae0(0x2e2)](_0x7eddf8,_0x27ca1f,_0x4e1048,_0x42ebbb,_0x53d7a7),this[_0x432ae0(0x1aa)]['gradientFillRect'](_0x7eddf8+0x1,_0x27ca1f+0x1,_0x3bd6a7,_0x28e662,_0x596264,_0x164d6b);},Sprite_Gauge['prototype'][_0x13ab2e(0x3d0)]=function(){const _0x327bb1=_0x13ab2e,_0x419c50=VisuMZ[_0x327bb1(0x25d)][_0x327bb1(0x1dc)]['Gauge'];return _0x419c50[_0x327bb1(0x2a5)]===_0x327bb1(0x30f)?$gameSystem[_0x327bb1(0x259)]():$gameSystem[_0x327bb1(0x155)]();},Sprite_Gauge[_0x13ab2e(0x2f5)][_0x13ab2e(0x292)]=function(){const _0x244298=_0x13ab2e,_0x343c20=VisuMZ['SkillsStatesCore'][_0x244298(0x1dc)][_0x244298(0x16b)];return _0x343c20['LabelFontMainType']===_0x244298(0x30f)?$gameSystem['mainFontSize']()-0x6:$gameSystem[_0x244298(0x2e0)]()-0x2;},Sprite_Gauge['prototype'][_0x13ab2e(0x1fa)]=function(){const _0x4a179f=_0x13ab2e,_0x2d38a9=VisuMZ[_0x4a179f(0x25d)][_0x4a179f(0x1dc)][_0x4a179f(0x16b)];return _0x2d38a9[_0x4a179f(0x165)]===_0x4a179f(0x30f)?$gameSystem[_0x4a179f(0x259)]():$gameSystem[_0x4a179f(0x155)]();},Sprite_Gauge[_0x13ab2e(0x2f5)][_0x13ab2e(0x388)]=function(){const _0x5dce90=_0x13ab2e,_0xcf8594=VisuMZ[_0x5dce90(0x25d)]['Settings'][_0x5dce90(0x16b)];return _0xcf8594['ValueFontMainType']===_0x5dce90(0x30f)?$gameSystem[_0x5dce90(0x2e0)]()-0x6:$gameSystem[_0x5dce90(0x2e0)]()-0x2;},Sprite_Gauge['prototype'][_0x13ab2e(0x24d)]=function(){const _0x258973=_0x13ab2e,_0x20f6b3=VisuMZ['SkillsStatesCore'][_0x258973(0x1dc)]['Gauge'];if(_0x20f6b3['MatchLabelColor']){if(_0x20f6b3['MatchLabelGaugeColor']===0x1)return this[_0x258973(0x148)]();else{if(_0x20f6b3['MatchLabelGaugeColor']===0x2)return this['gaugeColor2']();}}const _0x20656f=_0x20f6b3[_0x258973(0x3fb)];return ColorManager[_0x258973(0x282)](_0x20656f);},Sprite_Gauge['prototype'][_0x13ab2e(0x32a)]=function(){const _0x2e5bee=_0x13ab2e,_0x304c9a=VisuMZ[_0x2e5bee(0x25d)][_0x2e5bee(0x1dc)]['Gauge'];if(this[_0x2e5bee(0x1cd)]()<=0x0)return _0x2e5bee(0x399);else return _0x304c9a[_0x2e5bee(0x3c0)]?_0x2e5bee(0x21f):ColorManager[_0x2e5bee(0x266)]();},Sprite_Gauge[_0x13ab2e(0x2f5)][_0x13ab2e(0x1cd)]=function(){const _0x2c671c=_0x13ab2e;return VisuMZ['SkillsStatesCore'][_0x2c671c(0x1dc)][_0x2c671c(0x16b)][_0x2c671c(0x36d)]||0x0;},Sprite_Gauge[_0x13ab2e(0x2f5)][_0x13ab2e(0x377)]=function(){const _0xb58c76=_0x13ab2e,_0x102f60=VisuMZ[_0xb58c76(0x25d)]['Settings'][_0xb58c76(0x16b)];if(this['valueOutlineWidth']()<=0x0)return _0xb58c76(0x399);else return _0x102f60[_0xb58c76(0x1e9)]?_0xb58c76(0x21f):ColorManager[_0xb58c76(0x266)]();},Sprite_Gauge['prototype'][_0x13ab2e(0x33c)]=function(){const _0x1d2906=_0x13ab2e;return VisuMZ['SkillsStatesCore'][_0x1d2906(0x1dc)][_0x1d2906(0x16b)][_0x1d2906(0x2f4)]||0x0;},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x1c1)]=Sprite_StateIcon[_0x13ab2e(0x2f5)][_0x13ab2e(0x21a)],Sprite_StateIcon[_0x13ab2e(0x2f5)]['loadBitmap']=function(){const _0x7aacf8=_0x13ab2e;VisuMZ[_0x7aacf8(0x25d)][_0x7aacf8(0x1c1)]['call'](this),this[_0x7aacf8(0x347)]();},Sprite_StateIcon[_0x13ab2e(0x2f5)][_0x13ab2e(0x347)]=function(){const _0x50293f=_0x13ab2e,_0x5bf271=Window_Base[_0x50293f(0x2f5)][_0x50293f(0x197)]();this['_turnDisplaySprite']=new Sprite(),this[_0x50293f(0x203)][_0x50293f(0x1aa)]=new Bitmap(ImageManager[_0x50293f(0x195)],_0x5bf271),this['_turnDisplaySprite']['anchor']['x']=this[_0x50293f(0x16f)]['x'],this['_turnDisplaySprite'][_0x50293f(0x16f)]['y']=this[_0x50293f(0x16f)]['y'],this['addChild'](this[_0x50293f(0x203)]),this[_0x50293f(0x1e0)]=this[_0x50293f(0x203)][_0x50293f(0x1aa)];},VisuMZ[_0x13ab2e(0x25d)]['Sprite_StateIcon_updateFrame']=Sprite_StateIcon[_0x13ab2e(0x2f5)][_0x13ab2e(0x323)],Sprite_StateIcon[_0x13ab2e(0x2f5)][_0x13ab2e(0x323)]=function(){const _0x521b48=_0x13ab2e;VisuMZ[_0x521b48(0x25d)][_0x521b48(0x158)]['call'](this),this['updateTurnDisplaySprite']();},Sprite_StateIcon[_0x13ab2e(0x2f5)][_0x13ab2e(0x3f3)]=function(_0x19b8bb,_0x39f846,_0x46f82a,_0x5458c3,_0x484a47){const _0x628504=_0x13ab2e;this[_0x628504(0x1e0)][_0x628504(0x3f3)](_0x19b8bb,_0x39f846,_0x46f82a,_0x5458c3,this[_0x628504(0x1e0)]['height'],_0x484a47);},Sprite_StateIcon['prototype'][_0x13ab2e(0x3a8)]=function(){const _0x5a1b00=_0x13ab2e;this[_0x5a1b00(0x337)](),this[_0x5a1b00(0x1e0)][_0x5a1b00(0x200)]();const _0x50cb21=this[_0x5a1b00(0x3dc)];if(!_0x50cb21)return;const _0x4a2db8=_0x50cb21[_0x5a1b00(0x2be)]()[_0x5a1b00(0x290)](_0x54e145=>_0x54e145[_0x5a1b00(0x132)]>0x0),_0x5f5785=[...Array(0x8)[_0x5a1b00(0x3fe)]()]['filter'](_0x11db6b=>_0x50cb21[_0x5a1b00(0x3fc)](_0x11db6b)!==0x0),_0x153a03=this[_0x5a1b00(0x1df)],_0x108e58=_0x4a2db8[_0x153a03];if(_0x108e58)Window_Base[_0x5a1b00(0x2f5)][_0x5a1b00(0x1c0)][_0x5a1b00(0x13a)](this,_0x50cb21,_0x108e58,0x0,0x0),Window_Base['prototype']['drawActorStateData']['call'](this,_0x50cb21,_0x108e58,0x0,0x0);else{const _0x3dd3bf=_0x5f5785[_0x153a03-_0x4a2db8[_0x5a1b00(0x34f)]];if(_0x3dd3bf===undefined)return;Window_Base[_0x5a1b00(0x2f5)][_0x5a1b00(0x382)]['call'](this,_0x50cb21,_0x3dd3bf,0x0,0x0),Window_Base['prototype'][_0x5a1b00(0x2ab)][_0x5a1b00(0x13a)](this,_0x50cb21,_0x3dd3bf,0x0,0x0);}},Sprite_StateIcon[_0x13ab2e(0x2f5)][_0x13ab2e(0x337)]=function(){const _0x599e9a=_0x13ab2e;this[_0x599e9a(0x1e0)]['fontFace']=$gameSystem['mainFontFace'](),this[_0x599e9a(0x1e0)]['fontSize']=$gameSystem[_0x599e9a(0x2e0)](),this[_0x599e9a(0x2f3)]();},Sprite_StateIcon[_0x13ab2e(0x2f5)][_0x13ab2e(0x2f3)]=function(){const _0xb2bfb8=_0x13ab2e;this[_0xb2bfb8(0x326)](ColorManager[_0xb2bfb8(0x153)]()),this[_0xb2bfb8(0x353)](ColorManager[_0xb2bfb8(0x266)]());},Sprite_StateIcon[_0x13ab2e(0x2f5)][_0x13ab2e(0x326)]=function(_0x19c19f){const _0xcc0089=_0x13ab2e;this[_0xcc0089(0x1e0)][_0xcc0089(0x1e4)]=_0x19c19f;},Sprite_StateIcon[_0x13ab2e(0x2f5)][_0x13ab2e(0x353)]=function(_0x717991){const _0x3f13df=_0x13ab2e;this['contents'][_0x3f13df(0x266)]=_0x717991;},Sprite_StateIcon[_0x13ab2e(0x2f5)]['hide']=function(){const _0x19ea70=_0x13ab2e;this[_0x19ea70(0x363)]=!![],this[_0x19ea70(0x320)]();},Window_Base[_0x13ab2e(0x2f5)][_0x13ab2e(0x27b)]=function(_0x1225a3,_0xc88bb4,_0x5b3799,_0x1d60ab,_0x4e7634){const _0x32b031=_0x13ab2e,_0xed4e90=this['createAllSkillCostText'](_0x1225a3,_0xc88bb4),_0x10522b=this[_0x32b031(0x19e)](_0xed4e90,_0x5b3799,_0x1d60ab,_0x4e7634),_0x365f29=_0x5b3799+_0x4e7634-_0x10522b[_0x32b031(0x357)];this[_0x32b031(0x250)](_0xed4e90,_0x365f29,_0x1d60ab,_0x4e7634),this[_0x32b031(0x337)]();},Window_Base['prototype'][_0x13ab2e(0x3d3)]=function(_0x39e950,_0x14808c){const _0x5cbfd3=_0x13ab2e;let _0x4671cd='';for(settings of VisuMZ[_0x5cbfd3(0x25d)][_0x5cbfd3(0x1dc)]['Costs']){if(!this['isSkillCostShown'](_0x39e950,_0x14808c,settings))continue;if(_0x4671cd[_0x5cbfd3(0x34f)]>0x0)_0x4671cd+=this[_0x5cbfd3(0x201)]();_0x4671cd+=this['createSkillCostText'](_0x39e950,_0x14808c,settings);}_0x4671cd=this[_0x5cbfd3(0x36e)](_0x39e950,_0x14808c,_0x4671cd);if(_0x14808c[_0x5cbfd3(0x25e)][_0x5cbfd3(0x160)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x4671cd['length']>0x0)_0x4671cd+=this[_0x5cbfd3(0x201)]();_0x4671cd+=String(RegExp['$1']);}return _0x4671cd;},Window_Base[_0x13ab2e(0x2f5)][_0x13ab2e(0x36e)]=function(_0x5227cc,_0x3f888f,_0x35ae56){return _0x35ae56;},Window_Base[_0x13ab2e(0x2f5)][_0x13ab2e(0x3a4)]=function(_0x3ba87b,_0x3e86aa,_0x24e6c3){const _0x5c9e5f=_0x13ab2e;let _0x3cf988=_0x24e6c3[_0x5c9e5f(0x198)][_0x5c9e5f(0x13a)](_0x3ba87b,_0x3e86aa);return _0x3cf988=_0x3ba87b[_0x5c9e5f(0x305)](_0x3e86aa,_0x3cf988,_0x24e6c3),_0x24e6c3[_0x5c9e5f(0x318)][_0x5c9e5f(0x13a)](_0x3ba87b,_0x3e86aa,_0x3cf988,_0x24e6c3);},Window_Base[_0x13ab2e(0x2f5)][_0x13ab2e(0x1c9)]=function(_0xd581d4,_0x2c2798,_0x10d708){const _0x1320b8=_0x13ab2e;let _0x354bc9=_0x10d708[_0x1320b8(0x198)][_0x1320b8(0x13a)](_0xd581d4,_0x2c2798);return _0x354bc9=_0xd581d4[_0x1320b8(0x305)](_0x2c2798,_0x354bc9,_0x10d708),_0x10d708[_0x1320b8(0x206)]['call'](_0xd581d4,_0x2c2798,_0x354bc9,_0x10d708);},Window_Base[_0x13ab2e(0x2f5)]['skillCostSeparator']=function(){return'\x20';},Window_Base[_0x13ab2e(0x2f5)]['drawActorIcons']=function(_0x18b3ae,_0x2ff245,_0x5de925,_0xd96730){const _0x1484f1=_0x13ab2e;if(!_0x18b3ae)return;VisuMZ[_0x1484f1(0x25d)][_0x1484f1(0x354)][_0x1484f1(0x13a)](this,_0x18b3ae,_0x2ff245,_0x5de925,_0xd96730),this['drawActorIconsAllTurnCounters'](_0x18b3ae,_0x2ff245,_0x5de925,_0xd96730);},Window_Base[_0x13ab2e(0x2f5)][_0x13ab2e(0x1bf)]=function(_0x3dec39,_0x25d5e9,_0x4d6c59,_0x36e1f3){const _0x31670a=_0x13ab2e;_0x36e1f3=_0x36e1f3||0x90;const _0x1c2b98=ImageManager['standardIconWidth']||0x20,_0xca48bb=ImageManager[_0x31670a(0x218)]||0x20,_0x46d767=_0x1c2b98,_0x2bb966=_0x3dec39['allIcons']()[_0x31670a(0x35e)](0x0,Math[_0x31670a(0x38d)](_0x36e1f3/_0x46d767)),_0x12d04b=_0x3dec39[_0x31670a(0x2be)]()[_0x31670a(0x290)](_0x56c7d0=>_0x56c7d0[_0x31670a(0x132)]>0x0),_0x1cce04=[...Array(0x8)[_0x31670a(0x3fe)]()][_0x31670a(0x290)](_0x4aefd0=>_0x3dec39[_0x31670a(0x3fc)](_0x4aefd0)!==0x0),_0x4498d9=[];let _0x8c16f4=_0x25d5e9;for(let _0x1e1254=0x0;_0x1e1254<_0x2bb966[_0x31670a(0x34f)];_0x1e1254++){this['resetFontSettings']();const _0xa03382=_0x12d04b[_0x1e1254];if(_0xa03382)!_0x4498d9[_0x31670a(0x284)](_0xa03382)&&this[_0x31670a(0x1c0)](_0x3dec39,_0xa03382,_0x8c16f4,_0x4d6c59),this[_0x31670a(0x161)](_0x3dec39,_0xa03382,_0x8c16f4,_0x4d6c59),_0x4498d9[_0x31670a(0x1e6)](_0xa03382);else{const _0x12cca5=_0x1cce04[_0x1e1254-_0x12d04b[_0x31670a(0x34f)]];this[_0x31670a(0x382)](_0x3dec39,_0x12cca5,_0x8c16f4,_0x4d6c59),this[_0x31670a(0x2ab)](_0x3dec39,_0x12cca5,_0x8c16f4,_0x4d6c59);}_0x8c16f4+=_0x46d767;}},Window_Base['prototype'][_0x13ab2e(0x1c0)]=function(_0x42c8a3,_0x1f9b9c,_0x26473f,_0x507ca2){const _0x3a1ece=_0x13ab2e;if(!VisuMZ['SkillsStatesCore'][_0x3a1ece(0x1dc)][_0x3a1ece(0x2b2)][_0x3a1ece(0x3df)])return;if(!_0x42c8a3[_0x3a1ece(0x299)](_0x1f9b9c['id']))return;if(_0x1f9b9c[_0x3a1ece(0x3e2)]===0x0)return;if(_0x1f9b9c[_0x3a1ece(0x25e)][_0x3a1ece(0x160)](/<HIDE STATE TURNS>/i))return;const _0x462e04=ImageManager[_0x3a1ece(0x217)]||0x20,_0x9f46c=_0x462e04,_0x263290=_0x42c8a3[_0x3a1ece(0x207)](_0x1f9b9c['id']),_0xcd5de5=ColorManager[_0x3a1ece(0x23d)](_0x1f9b9c);this[_0x3a1ece(0x326)](_0xcd5de5),this[_0x3a1ece(0x353)](_0x3a1ece(0x21f)),this[_0x3a1ece(0x1e0)]['fontBold']=!![],this[_0x3a1ece(0x1e0)][_0x3a1ece(0x24f)]=VisuMZ[_0x3a1ece(0x25d)][_0x3a1ece(0x1dc)][_0x3a1ece(0x2b2)][_0x3a1ece(0x17b)],_0x26473f+=VisuMZ[_0x3a1ece(0x25d)][_0x3a1ece(0x1dc)][_0x3a1ece(0x2b2)]['TurnOffsetX'],_0x507ca2+=VisuMZ[_0x3a1ece(0x25d)][_0x3a1ece(0x1dc)][_0x3a1ece(0x2b2)][_0x3a1ece(0x361)],this[_0x3a1ece(0x3f3)](_0x263290,_0x26473f,_0x507ca2,_0x9f46c,'right'),this['contents'][_0x3a1ece(0x1eb)]=![],this[_0x3a1ece(0x337)]();},Window_Base[_0x13ab2e(0x2f5)][_0x13ab2e(0x161)]=function(_0x59cac7,_0x1e5f6e,_0x3099db,_0x450ac3){const _0x3e59a4=_0x13ab2e;if(!VisuMZ[_0x3e59a4(0x25d)][_0x3e59a4(0x1dc)][_0x3e59a4(0x2b2)][_0x3e59a4(0x389)])return;const _0x4048f4=ImageManager[_0x3e59a4(0x217)]||0x20,_0x96c7ac=ImageManager['standardIconHeight']||0x20,_0x10b2d8=_0x4048f4,_0x2400f0=_0x96c7ac/0x2,_0x4bc327=ColorManager[_0x3e59a4(0x153)]();this[_0x3e59a4(0x326)](_0x4bc327),this['changeOutlineColor'](_0x3e59a4(0x21f)),this[_0x3e59a4(0x1e0)][_0x3e59a4(0x1eb)]=!![],this[_0x3e59a4(0x1e0)][_0x3e59a4(0x24f)]=VisuMZ[_0x3e59a4(0x25d)][_0x3e59a4(0x1dc)][_0x3e59a4(0x2b2)][_0x3e59a4(0x31a)],_0x3099db+=VisuMZ[_0x3e59a4(0x25d)][_0x3e59a4(0x1dc)]['States'][_0x3e59a4(0x364)],_0x450ac3+=VisuMZ[_0x3e59a4(0x25d)][_0x3e59a4(0x1dc)][_0x3e59a4(0x2b2)][_0x3e59a4(0x34a)];const _0x3263e6=String(_0x59cac7[_0x3e59a4(0x2e3)](_0x1e5f6e['id']));this[_0x3e59a4(0x3f3)](_0x3263e6,_0x3099db,_0x450ac3,_0x10b2d8,_0x3e59a4(0x23f)),this[_0x3e59a4(0x1e0)]['fontBold']=![],this[_0x3e59a4(0x337)]();},Window_Base['prototype']['drawActorBuffTurns']=function(_0x1a1d7a,_0x4fa17b,_0xe36260,_0x40ddbe){const _0x516353=_0x13ab2e;if(!VisuMZ[_0x516353(0x25d)][_0x516353(0x1dc)][_0x516353(0x370)][_0x516353(0x3df)])return;const _0x5c3de0=_0x1a1d7a[_0x516353(0x3fc)](_0x4fa17b);if(_0x5c3de0===0x0)return;const _0x5d3848=_0x1a1d7a[_0x516353(0x2f9)](_0x4fa17b),_0x35cdcb=ImageManager[_0x516353(0x195)],_0xa93cc0=_0x5c3de0>0x0?ColorManager[_0x516353(0x360)]():ColorManager['debuffColor']();this[_0x516353(0x326)](_0xa93cc0),this['changeOutlineColor'](_0x516353(0x21f)),this[_0x516353(0x1e0)][_0x516353(0x1eb)]=!![],this[_0x516353(0x1e0)]['fontSize']=VisuMZ['SkillsStatesCore'][_0x516353(0x1dc)]['Buffs'][_0x516353(0x17b)],_0xe36260+=VisuMZ[_0x516353(0x25d)]['Settings']['Buffs']['TurnOffsetX'],_0x40ddbe+=VisuMZ['SkillsStatesCore'][_0x516353(0x1dc)][_0x516353(0x370)]['TurnOffsetY'],this['drawText'](_0x5d3848,_0xe36260,_0x40ddbe,_0x35cdcb,'right'),this['contents'][_0x516353(0x1eb)]=![],this[_0x516353(0x337)]();},Window_Base[_0x13ab2e(0x2f5)][_0x13ab2e(0x2ab)]=function(_0x11a6a8,_0x39f722,_0xa2070e,_0x4b6d92){const _0x2cf43c=_0x13ab2e;if(!VisuMZ['SkillsStatesCore'][_0x2cf43c(0x1dc)][_0x2cf43c(0x370)][_0x2cf43c(0x389)])return;const _0x44cf14=_0x11a6a8['paramBuffRate'](_0x39f722),_0x26a728=_0x11a6a8['buff'](_0x39f722),_0x22eed8=ImageManager[_0x2cf43c(0x217)]||0x20,_0x1f0548=ImageManager[_0x2cf43c(0x218)]||0x20,_0x1381bd=_0x22eed8,_0x25116d=_0x1f0548/0x2,_0x552ba6=_0x26a728>0x0?ColorManager['buffColor']():ColorManager['debuffColor']();this[_0x2cf43c(0x326)](_0x552ba6),this[_0x2cf43c(0x353)](_0x2cf43c(0x21f)),this[_0x2cf43c(0x1e0)][_0x2cf43c(0x1eb)]=!![],this[_0x2cf43c(0x1e0)][_0x2cf43c(0x24f)]=VisuMZ[_0x2cf43c(0x25d)]['Settings'][_0x2cf43c(0x370)]['DataFontSize'],_0xa2070e+=VisuMZ[_0x2cf43c(0x25d)][_0x2cf43c(0x1dc)][_0x2cf43c(0x370)][_0x2cf43c(0x364)],_0x4b6d92+=VisuMZ['SkillsStatesCore'][_0x2cf43c(0x1dc)]['Buffs'][_0x2cf43c(0x34a)];const _0x2ca3d3=_0x2cf43c(0x1cf)[_0x2cf43c(0x1da)](Math[_0x2cf43c(0x1a5)](_0x44cf14*0x64));this['drawText'](_0x2ca3d3,_0xa2070e,_0x4b6d92,_0x1381bd,_0x2cf43c(0x23f)),this[_0x2cf43c(0x1e0)][_0x2cf43c(0x1eb)]=![],this[_0x2cf43c(0x337)]();},VisuMZ['SkillsStatesCore']['Window_StatusBase_placeGauge']=Window_StatusBase[_0x13ab2e(0x2f5)]['placeGauge'],Window_StatusBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x12d)]=function(_0x5ce7ad,_0x248a39,_0x27f019,_0x6773cf){const _0x50b2a0=_0x13ab2e;if(_0x5ce7ad[_0x50b2a0(0x401)]())_0x248a39=this[_0x50b2a0(0x3e0)](_0x5ce7ad,_0x248a39);this[_0x50b2a0(0x20b)](_0x5ce7ad,_0x248a39,_0x27f019,_0x6773cf);},Window_StatusBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x20b)]=function(_0x594e25,_0x3a8da2,_0x6789d,_0x3b7c98){const _0x302daa=_0x13ab2e;if([_0x302daa(0x14e),'untitled'][_0x302daa(0x284)](_0x3a8da2[_0x302daa(0x278)]()))return;VisuMZ[_0x302daa(0x25d)]['Window_StatusBase_placeGauge']['call'](this,_0x594e25,_0x3a8da2,_0x6789d,_0x3b7c98);},Window_StatusBase[_0x13ab2e(0x2f5)]['convertGaugeTypeSkillsStatesCore']=function(_0x5d4e7a,_0xbff933){const _0x27b1c9=_0x13ab2e,_0x482a44=_0x5d4e7a['currentClass']()[_0x27b1c9(0x25e)];if(_0xbff933==='hp'&&_0x482a44[_0x27b1c9(0x160)](/<REPLACE HP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0xbff933==='mp'&&_0x482a44[_0x27b1c9(0x160)](/<REPLACE MP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else return _0xbff933==='tp'&&_0x482a44[_0x27b1c9(0x160)](/<REPLACE TP GAUGE:[ ](.*)>/i)?String(RegExp['$1']):_0xbff933;}},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x354)]=Window_StatusBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x168)],Window_StatusBase[_0x13ab2e(0x2f5)][_0x13ab2e(0x168)]=function(_0x3f7938,_0x5cfc0e,_0x101c6b,_0x221441){const _0x698403=_0x13ab2e;if(!_0x3f7938)return;Window_Base[_0x698403(0x2f5)][_0x698403(0x168)][_0x698403(0x13a)](this,_0x3f7938,_0x5cfc0e,_0x101c6b,_0x221441);},VisuMZ[_0x13ab2e(0x25d)]['Window_SkillType_initialize']=Window_SkillType[_0x13ab2e(0x2f5)][_0x13ab2e(0x38b)],Window_SkillType[_0x13ab2e(0x2f5)][_0x13ab2e(0x38b)]=function(_0x5cbbcc){const _0xb84282=_0x13ab2e;VisuMZ[_0xb84282(0x25d)][_0xb84282(0x164)]['call'](this,_0x5cbbcc),this[_0xb84282(0x239)](_0x5cbbcc);},Window_SkillType[_0x13ab2e(0x2f5)][_0x13ab2e(0x239)]=function(_0x446cdf){const _0x41660d=_0x13ab2e,_0x44529a=new Rectangle(0x0,0x0,_0x446cdf['width'],_0x446cdf[_0x41660d(0x2ae)]);this[_0x41660d(0x316)]=new Window_Base(_0x44529a),this[_0x41660d(0x316)]['opacity']=0x0,this[_0x41660d(0x22d)](this[_0x41660d(0x316)]),this[_0x41660d(0x3ed)]();},Window_SkillType[_0x13ab2e(0x2f5)][_0x13ab2e(0x176)]=function(){const _0x2b808e=_0x13ab2e;Window_Command[_0x2b808e(0x2f5)][_0x2b808e(0x176)][_0x2b808e(0x13a)](this);if(this[_0x2b808e(0x316)])this[_0x2b808e(0x3ed)]();},Window_SkillType[_0x13ab2e(0x2f5)][_0x13ab2e(0x3ed)]=function(){const _0x3cb75d=_0x13ab2e,_0x371da0=this[_0x3cb75d(0x316)];_0x371da0[_0x3cb75d(0x1e0)][_0x3cb75d(0x200)]();const _0x158049=this['commandStyleCheck'](this[_0x3cb75d(0x1bc)]());if(_0x158049==='icon'&&this['maxItems']()>0x0){const _0x45d81c=this['itemLineRect'](this[_0x3cb75d(0x1bc)]());let _0x5beebc=this['commandName'](this[_0x3cb75d(0x1bc)]());_0x5beebc=_0x5beebc[_0x3cb75d(0x1ee)](/\\I\[(\d+)\]/gi,''),_0x371da0[_0x3cb75d(0x337)](),this[_0x3cb75d(0x18a)](_0x5beebc,_0x45d81c),this[_0x3cb75d(0x2d5)](_0x5beebc,_0x45d81c),this[_0x3cb75d(0x37f)](_0x5beebc,_0x45d81c);}},Window_SkillType[_0x13ab2e(0x2f5)][_0x13ab2e(0x18a)]=function(_0x2466ed,_0x4b8706){},Window_SkillType[_0x13ab2e(0x2f5)]['commandNameWindowDrawText']=function(_0x9707a,_0x1e26c9){const _0x56f298=_0x13ab2e,_0x260897=this[_0x56f298(0x316)];_0x260897[_0x56f298(0x3f3)](_0x9707a,0x0,_0x1e26c9['y'],_0x260897['innerWidth'],_0x56f298(0x23f));},Window_SkillType[_0x13ab2e(0x2f5)][_0x13ab2e(0x37f)]=function(_0x4937da,_0x193686){const _0x1e7891=_0x13ab2e,_0x6d1541=this[_0x1e7891(0x316)],_0x5e677e=$gameSystem[_0x1e7891(0x1e3)](),_0x8fec2c=_0x193686['x']+Math[_0x1e7891(0x38d)](_0x193686[_0x1e7891(0x357)]/0x2)+_0x5e677e;_0x6d1541['x']=_0x6d1541[_0x1e7891(0x357)]/-0x2+_0x8fec2c,_0x6d1541['y']=Math[_0x1e7891(0x38d)](_0x193686[_0x1e7891(0x2ae)]/0x2);},Window_SkillType['prototype']['isUseModernControls']=function(){const _0x3bd709=_0x13ab2e;return Imported['VisuMZ_0_CoreEngine']&&Window_Command[_0x3bd709(0x2f5)][_0x3bd709(0x3e1)][_0x3bd709(0x13a)](this);},Window_SkillType['prototype']['makeCommandList']=function(){const _0x142394=_0x13ab2e;if(!this['_actor'])return;const _0x76ddb1=this[_0x142394(0x3f1)][_0x142394(0x2f1)]();for(const _0x940707 of _0x76ddb1){const _0x59e252=this[_0x142394(0x227)](_0x940707);this[_0x142394(0x3a9)](_0x59e252,_0x142394(0x3bc),!![],_0x940707);}},Window_SkillType['prototype']['makeCommandName']=function(_0x100dcd){const _0x343a1a=_0x13ab2e;let _0x3e0f9f=$dataSystem[_0x343a1a(0x2f1)][_0x100dcd];if(_0x3e0f9f[_0x343a1a(0x160)](/\\I\[(\d+)\]/i))return _0x3e0f9f;if(this['commandStyle']()===_0x343a1a(0x3a5))return _0x3e0f9f;const _0x49f4ec=VisuMZ[_0x343a1a(0x25d)][_0x343a1a(0x1dc)][_0x343a1a(0x193)],_0x13f343=$dataSystem['magicSkills']['includes'](_0x100dcd),_0x25ec4f=_0x13f343?_0x49f4ec[_0x343a1a(0x24e)]:_0x49f4ec['IconStypeNorm'];return _0x343a1a(0x275)[_0x343a1a(0x1da)](_0x25ec4f,_0x3e0f9f);},Window_SkillType['prototype'][_0x13ab2e(0x15a)]=function(){const _0xf17bbc=_0x13ab2e;return VisuMZ[_0xf17bbc(0x25d)][_0xf17bbc(0x1dc)][_0xf17bbc(0x193)]['CmdTextAlign'];},Window_SkillType[_0x13ab2e(0x2f5)]['drawItem']=function(_0x2e9ccc){const _0x14e2c2=_0x13ab2e,_0x3b18fe=this[_0x14e2c2(0x22a)](_0x2e9ccc);if(_0x3b18fe===_0x14e2c2(0x30b))this[_0x14e2c2(0x25f)](_0x2e9ccc);else _0x3b18fe==='icon'?this[_0x14e2c2(0x3bd)](_0x2e9ccc):Window_Command['prototype'][_0x14e2c2(0x1f0)][_0x14e2c2(0x13a)](this,_0x2e9ccc);},Window_SkillType[_0x13ab2e(0x2f5)][_0x13ab2e(0x202)]=function(){const _0x1c321a=_0x13ab2e;return VisuMZ[_0x1c321a(0x25d)][_0x1c321a(0x1dc)][_0x1c321a(0x193)][_0x1c321a(0x21e)];},Window_SkillType['prototype'][_0x13ab2e(0x22a)]=function(_0x4cc270){const _0x2f8b12=_0x13ab2e;if(_0x4cc270<0x0)return _0x2f8b12(0x3a5);const _0x4de9d3=this[_0x2f8b12(0x202)]();if(_0x4de9d3!=='auto')return _0x4de9d3;else{if(this['maxItems']()>0x0){const _0xb61d1d=this[_0x2f8b12(0x144)](_0x4cc270);if(_0xb61d1d['match'](/\\I\[(\d+)\]/i)){const _0x598fec=this[_0x2f8b12(0x214)](_0x4cc270),_0x227dc1=this['textSizeEx'](_0xb61d1d)[_0x2f8b12(0x357)];return _0x227dc1<=_0x598fec[_0x2f8b12(0x357)]?'iconText':_0x2f8b12(0x1d9);}}}return'text';},Window_SkillType[_0x13ab2e(0x2f5)][_0x13ab2e(0x25f)]=function(_0x320dae){const _0x2e9a40=_0x13ab2e,_0x27afe0=this['itemLineRect'](_0x320dae),_0x212551=this[_0x2e9a40(0x144)](_0x320dae),_0x46e333=this[_0x2e9a40(0x19e)](_0x212551)['width'];this[_0x2e9a40(0x251)](this[_0x2e9a40(0x28a)](_0x320dae));const _0xfe5c56=this[_0x2e9a40(0x15a)]();if(_0xfe5c56===_0x2e9a40(0x365))this[_0x2e9a40(0x250)](_0x212551,_0x27afe0['x']+_0x27afe0['width']-_0x46e333,_0x27afe0['y'],_0x46e333);else{if(_0xfe5c56===_0x2e9a40(0x23f)){const _0x1b98f3=_0x27afe0['x']+Math['floor']((_0x27afe0[_0x2e9a40(0x357)]-_0x46e333)/0x2);this['drawTextEx'](_0x212551,_0x1b98f3,_0x27afe0['y'],_0x46e333);}else this['drawTextEx'](_0x212551,_0x27afe0['x'],_0x27afe0['y'],_0x46e333);}},Window_SkillType[_0x13ab2e(0x2f5)][_0x13ab2e(0x3bd)]=function(_0x50f58b){const _0x5abf54=_0x13ab2e;this[_0x5abf54(0x144)](_0x50f58b)[_0x5abf54(0x160)](/\\I\[(\d+)\]/i);const _0x31551a=Number(RegExp['$1'])||0x0,_0x4caecb=this[_0x5abf54(0x214)](_0x50f58b),_0x3d349b=_0x4caecb['x']+Math['floor']((_0x4caecb['width']-ImageManager[_0x5abf54(0x195)])/0x2),_0x3b9b2b=_0x4caecb['y']+(_0x4caecb['height']-ImageManager['iconHeight'])/0x2;this['drawIcon'](_0x31551a,_0x3d349b,_0x3b9b2b);},VisuMZ['SkillsStatesCore']['Window_SkillStatus_refresh']=Window_SkillStatus['prototype'][_0x13ab2e(0x3f0)],Window_SkillStatus[_0x13ab2e(0x2f5)]['refresh']=function(){const _0x41a971=_0x13ab2e;VisuMZ['SkillsStatesCore']['Window_SkillStatus_refresh'][_0x41a971(0x13a)](this);if(this['_actor'])this[_0x41a971(0x30e)]();},Window_SkillStatus[_0x13ab2e(0x2f5)][_0x13ab2e(0x30e)]=function(){const _0x4b4090=_0x13ab2e;if(!Imported[_0x4b4090(0x3d1)])return;if(!Imported['VisuMZ_1_MainMenuCore'])return;const _0x1b4168=this['gaugeLineHeight']();let _0x5873a9=this['colSpacing']()/0x2+0xb4+0xb4+0xb4,_0x3ee89a=this[_0x4b4090(0x2d2)]-_0x5873a9-0x2;if(_0x3ee89a>=0x12c){const _0x31c509=VisuMZ[_0x4b4090(0x256)][_0x4b4090(0x1dc)][_0x4b4090(0x19a)][_0x4b4090(0x338)],_0x3b128d=Math[_0x4b4090(0x38d)](_0x3ee89a/0x2)-0x18;let _0x1452e6=_0x5873a9,_0x3f9148=Math['floor']((this[_0x4b4090(0x2ea)]-Math[_0x4b4090(0x2d9)](_0x31c509[_0x4b4090(0x34f)]/0x2)*_0x1b4168)/0x2),_0x1fa602=0x0;for(const _0x15560a of _0x31c509){this[_0x4b4090(0x20a)](_0x1452e6,_0x3f9148,_0x3b128d,_0x15560a),_0x1fa602++,_0x1fa602%0x2===0x0?(_0x1452e6=_0x5873a9,_0x3f9148+=_0x1b4168):_0x1452e6+=_0x3b128d+0x18;}}this[_0x4b4090(0x337)]();},Window_SkillStatus[_0x13ab2e(0x2f5)][_0x13ab2e(0x20a)]=function(_0x286183,_0x32a2e2,_0x5d4bc0,_0x2e3455){const _0xcbe0de=_0x13ab2e,_0x4e67eb=this[_0xcbe0de(0x3ae)]();this[_0xcbe0de(0x337)](),this[_0xcbe0de(0x3b0)](_0x286183,_0x32a2e2,_0x5d4bc0,_0x2e3455,!![]),this[_0xcbe0de(0x2f3)](),this[_0xcbe0de(0x1e0)][_0xcbe0de(0x24f)]-=0x8;const _0x57dd78=this[_0xcbe0de(0x3f1)][_0xcbe0de(0x1fb)](_0x2e3455,!![]);this[_0xcbe0de(0x1e0)][_0xcbe0de(0x3f3)](_0x57dd78,_0x286183,_0x32a2e2,_0x5d4bc0,_0x4e67eb,_0xcbe0de(0x365));},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x345)]=Window_SkillList['prototype'][_0x13ab2e(0x284)],Window_SkillList['prototype'][_0x13ab2e(0x284)]=function(_0x14f496){const _0x4c0d0c=_0x13ab2e;if(this[_0x4c0d0c(0x269)]<=0x0)return![];return this['includesSkillsStatesCore'](_0x14f496);},VisuMZ[_0x13ab2e(0x25d)]['Window_SkillList_maxCols']=Window_SkillList[_0x13ab2e(0x2f5)]['maxCols'],Window_SkillList[_0x13ab2e(0x2f5)]['maxCols']=function(){const _0x451e62=_0x13ab2e;return SceneManager[_0x451e62(0x175)]['constructor']===Scene_Battle?VisuMZ[_0x451e62(0x25d)]['Window_SkillList_maxCols'][_0x451e62(0x13a)](this):VisuMZ['SkillsStatesCore'][_0x451e62(0x1dc)][_0x451e62(0x193)][_0x451e62(0x3b4)];},VisuMZ[_0x13ab2e(0x25d)]['Window_SkillList_setActor']=Window_SkillList[_0x13ab2e(0x2f5)]['setActor'],Window_SkillList[_0x13ab2e(0x2f5)][_0x13ab2e(0x267)]=function(_0x43e3a0){const _0x40fb35=_0x13ab2e,_0x3312a3=this[_0x40fb35(0x3f1)]!==_0x43e3a0;VisuMZ[_0x40fb35(0x25d)][_0x40fb35(0x1d1)][_0x40fb35(0x13a)](this,_0x43e3a0),_0x3312a3&&(this[_0x40fb35(0x384)]&&this['_statusWindow'][_0x40fb35(0x2e5)]===Window_ShopStatus&&this[_0x40fb35(0x384)][_0x40fb35(0x16c)](this['itemAt'](0x0)));},Window_SkillList['prototype'][_0x13ab2e(0x157)]=function(_0x3decbf){const _0x3461de=_0x13ab2e;if(this[_0x3461de(0x269)]===_0x3decbf)return;if(!_0x3decbf)return;this[_0x3461de(0x269)]=_0x3decbf,this[_0x3461de(0x3f0)](),this[_0x3461de(0x3dd)](0x0,0x0),this[_0x3461de(0x384)]&&this[_0x3461de(0x384)][_0x3461de(0x2e5)]===Window_ShopStatus&&this['_statusWindow'][_0x3461de(0x16c)](this[_0x3461de(0x315)](0x0));},Window_SkillList['prototype'][_0x13ab2e(0x359)]=function(_0x5e3bf6){const _0x50f4ea=_0x13ab2e;if(!_0x5e3bf6)return VisuMZ[_0x50f4ea(0x25d)]['Window_SkillList_includes'][_0x50f4ea(0x13a)](this,_0x5e3bf6);if(!this[_0x50f4ea(0x194)](_0x5e3bf6))return![];if(!this[_0x50f4ea(0x325)](_0x5e3bf6))return![];if(!this[_0x50f4ea(0x2c4)](_0x5e3bf6))return![];return!![];},Window_SkillList[_0x13ab2e(0x2f5)][_0x13ab2e(0x194)]=function(_0x11d31e){const _0x26aa39=_0x13ab2e;return DataManager[_0x26aa39(0x24b)](_0x11d31e)[_0x26aa39(0x284)](this[_0x26aa39(0x269)]);},Window_SkillList[_0x13ab2e(0x2f5)][_0x13ab2e(0x325)]=function(_0x35edaa){const _0x2c7c21=_0x13ab2e;if(!VisuMZ['SkillsStatesCore'][_0x2c7c21(0x137)](this[_0x2c7c21(0x3f1)],_0x35edaa))return![];if(!VisuMZ[_0x2c7c21(0x25d)][_0x2c7c21(0x1b3)](this[_0x2c7c21(0x3f1)],_0x35edaa))return![];if(!VisuMZ[_0x2c7c21(0x25d)][_0x2c7c21(0x3ee)](this[_0x2c7c21(0x3f1)],_0x35edaa))return![];return!![];},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x137)]=function(_0x54c7bd,_0xdde3f8){const _0x3428aa=_0x13ab2e,_0x25da4f=_0xdde3f8[_0x3428aa(0x25e)];if(_0x25da4f[_0x3428aa(0x160)](/<HIDE IN BATTLE>/i)&&$gameParty[_0x3428aa(0x2d4)]())return![];else return _0x25da4f[_0x3428aa(0x160)](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty[_0x3428aa(0x2d4)]()?![]:!![];},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x1b3)]=function(_0x7abf78,_0x14b995){const _0x540e77=_0x13ab2e,_0x48a70c=_0x14b995[_0x540e77(0x25e)];if(_0x48a70c[_0x540e77(0x160)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x43a626=JSON['parse']('['+RegExp['$1'][_0x540e77(0x160)](/\d+/g)+']');for(const _0x1000cc of _0x43a626){if(!$gameSwitches['value'](_0x1000cc))return![];}return!![];}if(_0x48a70c[_0x540e77(0x160)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x47d797=JSON[_0x540e77(0x13f)]('['+RegExp['$1'][_0x540e77(0x160)](/\d+/g)+']');for(const _0x20c58e of _0x47d797){if(!$gameSwitches[_0x540e77(0x205)](_0x20c58e))return![];}return!![];}if(_0x48a70c[_0x540e77(0x160)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x88ccb4=JSON[_0x540e77(0x13f)]('['+RegExp['$1'][_0x540e77(0x160)](/\d+/g)+']');for(const _0x4946b7 of _0x88ccb4){if($gameSwitches[_0x540e77(0x205)](_0x4946b7))return!![];}return![];}if(_0x48a70c[_0x540e77(0x160)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1b7149=JSON['parse']('['+RegExp['$1'][_0x540e77(0x160)](/\d+/g)+']');for(const _0x4b78d9 of _0x1b7149){if(!$gameSwitches[_0x540e77(0x205)](_0x4b78d9))return!![];}return![];}if(_0x48a70c[_0x540e77(0x160)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x47118c=JSON['parse']('['+RegExp['$1'][_0x540e77(0x160)](/\d+/g)+']');for(const _0xe6e785 of _0x47118c){if(!$gameSwitches['value'](_0xe6e785))return!![];}return![];}if(_0x48a70c[_0x540e77(0x160)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3cbbb2=JSON[_0x540e77(0x13f)]('['+RegExp['$1'][_0x540e77(0x160)](/\d+/g)+']');for(const _0x50c88f of _0x3cbbb2){if($gameSwitches[_0x540e77(0x205)](_0x50c88f))return![];}return!![];}return!![];},VisuMZ['SkillsStatesCore'][_0x13ab2e(0x3ee)]=function(_0x411df1,_0x5b551b){const _0x103533=_0x13ab2e,_0x1c4da7=_0x5b551b[_0x103533(0x25e)];if(_0x1c4da7['match'](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x8bb3b9=JSON[_0x103533(0x13f)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x48d7fe of _0x8bb3b9){if(!_0x411df1['isLearnedSkill'](_0x48d7fe))return![];}return!![];}else{if(_0x1c4da7['match'](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x194bde=RegExp['$1'][_0x103533(0x1f1)](',');for(const _0x117a12 of _0x194bde){const _0x301f04=DataManager[_0x103533(0x330)](_0x117a12);if(!_0x301f04)continue;if(!_0x411df1[_0x103533(0x2a1)](_0x301f04))return![];}return!![];}}if(_0x1c4da7['match'](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4cb068=JSON[_0x103533(0x13f)]('['+RegExp['$1'][_0x103533(0x160)](/\d+/g)+']');for(const _0xb52eef of _0x4cb068){if(!_0x411df1['isLearnedSkill'](_0xb52eef))return![];}return!![];}else{if(_0x1c4da7[_0x103533(0x160)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x12951f=RegExp['$1'][_0x103533(0x1f1)](',');for(const _0x3198c4 of _0x12951f){const _0x599199=DataManager['getSkillIdWithName'](_0x3198c4);if(!_0x599199)continue;if(!_0x411df1[_0x103533(0x2a1)](_0x599199))return![];}return!![];}}if(_0x1c4da7[_0x103533(0x160)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4de9dd=JSON[_0x103533(0x13f)]('['+RegExp['$1'][_0x103533(0x160)](/\d+/g)+']');for(const _0x4f645f of _0x4de9dd){if(_0x411df1[_0x103533(0x2a1)](_0x4f645f))return!![];}return![];}else{if(_0x1c4da7['match'](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x54ca3e=RegExp['$1'][_0x103533(0x1f1)](',');for(const _0x465cc5 of _0x54ca3e){const _0x4b69ac=DataManager['getSkillIdWithName'](_0x465cc5);if(!_0x4b69ac)continue;if(_0x411df1['isLearnedSkill'](_0x4b69ac))return!![];}return![];}}if(_0x1c4da7[_0x103533(0x160)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2c3c5a=JSON[_0x103533(0x13f)]('['+RegExp['$1'][_0x103533(0x160)](/\d+/g)+']');for(const _0x415503 of _0x2c3c5a){if(!_0x411df1[_0x103533(0x2a1)](_0x415503))return!![];}return![];}else{if(_0x1c4da7[_0x103533(0x160)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x2406d1=RegExp['$1'][_0x103533(0x1f1)](',');for(const _0x50eba0 of _0x2406d1){const _0x5bf74f=DataManager[_0x103533(0x330)](_0x50eba0);if(!_0x5bf74f)continue;if(!_0x411df1[_0x103533(0x2a1)](_0x5bf74f))return!![];}return![];}}if(_0x1c4da7[_0x103533(0x160)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x38eba6=JSON[_0x103533(0x13f)]('['+RegExp['$1'][_0x103533(0x160)](/\d+/g)+']');for(const _0x2b8641 of _0x38eba6){if(!_0x411df1[_0x103533(0x2a1)](_0x2b8641))return!![];}return![];}else{if(_0x1c4da7[_0x103533(0x160)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x390fb9=RegExp['$1'][_0x103533(0x1f1)](',');for(const _0x6f5da9 of _0x390fb9){const _0x450ab9=DataManager[_0x103533(0x330)](_0x6f5da9);if(!_0x450ab9)continue;if(!_0x411df1[_0x103533(0x2a1)](_0x450ab9))return!![];}return![];}}if(_0x1c4da7[_0x103533(0x160)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2ac437=JSON[_0x103533(0x13f)]('['+RegExp['$1'][_0x103533(0x160)](/\d+/g)+']');for(const _0x58ba63 of _0x2ac437){if(_0x411df1[_0x103533(0x2a1)](_0x58ba63))return![];}return!![];}else{if(_0x1c4da7['match'](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x269651=RegExp['$1'][_0x103533(0x1f1)](',');for(const _0x1b4171 of _0x269651){const _0x54ce7b=DataManager[_0x103533(0x330)](_0x1b4171);if(!_0x54ce7b)continue;if(_0x411df1[_0x103533(0x2a1)](_0x54ce7b))return![];}return!![];}}if(_0x1c4da7[_0x103533(0x160)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x79c7c1=JSON[_0x103533(0x13f)]('['+RegExp['$1'][_0x103533(0x160)](/\d+/g)+']');for(const _0x54ea59 of _0x79c7c1){if(!_0x411df1[_0x103533(0x1b4)](_0x54ea59))return![];}return!![];}else{if(_0x1c4da7[_0x103533(0x160)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1645cd=RegExp['$1'][_0x103533(0x1f1)](',');for(const _0x22e04c of _0x1645cd){const _0x175a61=DataManager[_0x103533(0x330)](_0x22e04c);if(!_0x175a61)continue;if(!_0x411df1[_0x103533(0x1b4)](_0x175a61))return![];}return!![];}}if(_0x1c4da7[_0x103533(0x160)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x8c2c08=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x350e89 of _0x8c2c08){if(!_0x411df1[_0x103533(0x1b4)](_0x350e89))return![];}return!![];}else{if(_0x1c4da7[_0x103533(0x160)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0xe5bd10=RegExp['$1']['split'](',');for(const _0x407ea7 of _0xe5bd10){const _0x502389=DataManager[_0x103533(0x330)](_0x407ea7);if(!_0x502389)continue;if(!_0x411df1[_0x103533(0x1b4)](_0x502389))return![];}return!![];}}if(_0x1c4da7[_0x103533(0x160)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x544e0f=JSON['parse']('['+RegExp['$1'][_0x103533(0x160)](/\d+/g)+']');for(const _0x246961 of _0x544e0f){if(_0x411df1[_0x103533(0x1b4)](_0x246961))return!![];}return![];}else{if(_0x1c4da7['match'](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x484a78=RegExp['$1'][_0x103533(0x1f1)](',');for(const _0x5f0433 of _0x484a78){const _0x4b985a=DataManager[_0x103533(0x330)](_0x5f0433);if(!_0x4b985a)continue;if(_0x411df1[_0x103533(0x1b4)](_0x4b985a))return!![];}return![];}}if(_0x1c4da7[_0x103533(0x160)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x161eec=JSON[_0x103533(0x13f)]('['+RegExp['$1'][_0x103533(0x160)](/\d+/g)+']');for(const _0x2bbbbd of _0x161eec){if(!_0x411df1[_0x103533(0x1b4)](_0x2bbbbd))return!![];}return![];}else{if(_0x1c4da7['match'](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x3fb726=RegExp['$1']['split'](',');for(const _0x28677d of _0x3fb726){const _0x3f922b=DataManager['getSkillIdWithName'](_0x28677d);if(!_0x3f922b)continue;if(!_0x411df1[_0x103533(0x1b4)](_0x3f922b))return!![];}return![];}}if(_0x1c4da7['match'](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x214129=JSON['parse']('['+RegExp['$1'][_0x103533(0x160)](/\d+/g)+']');for(const _0x1b1a6d of _0x214129){if(!_0x411df1[_0x103533(0x1b4)](_0x1b1a6d))return!![];}return![];}else{if(_0x1c4da7[_0x103533(0x160)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x402bf1=RegExp['$1'][_0x103533(0x1f1)](',');for(const _0x4ac982 of _0x402bf1){const _0x2d121c=DataManager[_0x103533(0x330)](_0x4ac982);if(!_0x2d121c)continue;if(!_0x411df1[_0x103533(0x1b4)](_0x2d121c))return!![];}return![];}}if(_0x1c4da7[_0x103533(0x160)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x312c92=JSON[_0x103533(0x13f)]('['+RegExp['$1'][_0x103533(0x160)](/\d+/g)+']');for(const _0x545bc3 of _0x312c92){if(_0x411df1['hasSkill'](_0x545bc3))return![];}return!![];}else{if(_0x1c4da7[_0x103533(0x160)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x3f7d69=RegExp['$1']['split'](',');for(const _0x23a5df of _0x3f7d69){const _0x2aba25=DataManager['getSkillIdWithName'](_0x23a5df);if(!_0x2aba25)continue;if(_0x411df1[_0x103533(0x1b4)](_0x2aba25))return![];}return!![];}}return!![];},Window_SkillList['prototype'][_0x13ab2e(0x2c4)]=function(_0x5a81ae){const _0x135190=_0x13ab2e,_0x127621=_0x5a81ae[_0x135190(0x25e)],_0x4b98ee=VisuMZ[_0x135190(0x25d)][_0x135190(0x237)];return _0x4b98ee[_0x5a81ae['id']]?_0x4b98ee[_0x5a81ae['id']]['call'](this,_0x5a81ae):!![];},VisuMZ['SkillsStatesCore']['Window_SkillList_makeItemList']=Window_SkillList[_0x13ab2e(0x2f5)][_0x13ab2e(0x3a7)],Window_SkillList['prototype'][_0x13ab2e(0x3a7)]=function(){const _0x2346fc=_0x13ab2e;VisuMZ[_0x2346fc(0x25d)]['Window_SkillList_makeItemList'][_0x2346fc(0x13a)](this),this[_0x2346fc(0x317)]()&&this[_0x2346fc(0x3f7)](),this['canChangeSkillsThroughStateEffects']()&&this[_0x2346fc(0x138)]();},Window_SkillList[_0x13ab2e(0x2f5)][_0x13ab2e(0x317)]=function(){return!![];},Window_SkillList[_0x13ab2e(0x2f5)][_0x13ab2e(0x3f7)]=function(){const _0x61e18a=_0x13ab2e,_0xf109b=VisuMZ[_0x61e18a(0x25d)][_0x61e18a(0x1dc)][_0x61e18a(0x193)][_0x61e18a(0x2c1)]||[];return _0xf109b&&_0xf109b[_0x61e18a(0x284)](this[_0x61e18a(0x269)])?this['_data'][_0x61e18a(0x2ee)]((_0x53acb9,_0x99160c)=>{const _0x353023=_0x61e18a;if(!!_0x53acb9&&!!_0x99160c)return _0x53acb9[_0x353023(0x145)][_0x353023(0x12a)](_0x99160c['name']);return 0x0;}):VisuMZ['SkillsStatesCore']['SortByIDandPriority'](this['_data']),this[_0x61e18a(0x238)];},VisuMZ[_0x13ab2e(0x25d)]['SortByIDandPriority']=function(_0x36cb7e){const _0x3e127f=_0x13ab2e;return _0x36cb7e[_0x3e127f(0x2ee)]((_0x194334,_0x3eb9d2)=>{const _0x26645d=_0x3e127f;if(!!_0x194334&&!!_0x3eb9d2){if(_0x194334[_0x26645d(0x14d)]===undefined)VisuMZ[_0x26645d(0x25d)][_0x26645d(0x2aa)](_0x194334);if(_0x3eb9d2[_0x26645d(0x14d)]===undefined)VisuMZ['SkillsStatesCore'][_0x26645d(0x2aa)](_0x3eb9d2);const _0xf343dc=_0x194334[_0x26645d(0x14d)],_0x4a557f=_0x3eb9d2['sortPriority'];if(_0xf343dc!==_0x4a557f)return _0x4a557f-_0xf343dc;return _0x194334['id']-_0x3eb9d2['id'];}return 0x0;}),_0x36cb7e;},VisuMZ[_0x13ab2e(0x25d)]['SortByIDandPriorityUsingIDs']=function(_0x57c975){const _0x156667=_0x13ab2e;return _0x57c975[_0x156667(0x2ee)]((_0x6f15c6,_0x820339)=>{const _0x5e7a9b=_0x156667,_0x144bf6=$dataSkills[_0x6f15c6],_0x2c57c8=$dataSkills[_0x820339];if(!!_0x144bf6&&!!_0x2c57c8){if(_0x144bf6[_0x5e7a9b(0x14d)]===undefined)VisuMZ[_0x5e7a9b(0x25d)][_0x5e7a9b(0x2aa)](_0x144bf6);if(_0x2c57c8[_0x5e7a9b(0x14d)]===undefined)VisuMZ['SkillsStatesCore'][_0x5e7a9b(0x2aa)](_0x2c57c8);const _0x163992=_0x144bf6[_0x5e7a9b(0x14d)],_0x525f45=_0x2c57c8[_0x5e7a9b(0x14d)];if(_0x163992!==_0x525f45)return _0x525f45-_0x163992;return _0x6f15c6-_0x820339;}return 0x0;}),_0x57c975;},Window_SkillList[_0x13ab2e(0x2f5)][_0x13ab2e(0x3c1)]=function(){const _0x3bfb5f=_0x13ab2e;if(!this[_0x3bfb5f(0x3f1)])return![];if([_0x3bfb5f(0x2a8),_0x3bfb5f(0x36f),_0x3bfb5f(0x1f8)][_0x3bfb5f(0x284)](this['_stypeId']))return![];return!![];},Window_SkillList[_0x13ab2e(0x2f5)]['changeSkillsThroughStateEffects']=function(){const _0x50e1b1=_0x13ab2e,_0x15fac9=this['_actor']['states']();for(const _0x3f29ca of _0x15fac9){const _0x5a49c4=DataManager[_0x50e1b1(0x3ca)](_0x3f29ca);for(const _0xd8f19a in _0x5a49c4){const _0x707fe7=$dataSkills[Number(_0xd8f19a)]||null,_0x2cbdd9=$dataSkills[Number(_0x5a49c4[_0xd8f19a])]||null;while(this[_0x50e1b1(0x238)][_0x50e1b1(0x284)](_0x707fe7)){const _0x1a8689=this[_0x50e1b1(0x238)][_0x50e1b1(0x261)](_0x707fe7);this['_data'][_0x1a8689]=_0x2cbdd9;}}}},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x17c)]=Window_SkillList[_0x13ab2e(0x2f5)][_0x13ab2e(0x1f0)],Window_SkillList[_0x13ab2e(0x2f5)][_0x13ab2e(0x1f0)]=function(_0x5308df){const _0x22ae34=_0x13ab2e,_0x1c082a=this[_0x22ae34(0x315)](_0x5308df),_0x24dcc=_0x1c082a?_0x1c082a[_0x22ae34(0x145)]:'';if(_0x1c082a)this['alterSkillName'](_0x1c082a);VisuMZ[_0x22ae34(0x25d)][_0x22ae34(0x17c)]['call'](this,_0x5308df);if(_0x1c082a)_0x1c082a[_0x22ae34(0x145)]=_0x24dcc;},Window_SkillList[_0x13ab2e(0x2f5)][_0x13ab2e(0x21b)]=function(_0x1674eb){const _0x5a2619=_0x13ab2e;if(_0x1674eb&&_0x1674eb[_0x5a2619(0x25e)][_0x5a2619(0x160)](/<LIST NAME:[ ](.*)>/i)){_0x1674eb[_0x5a2619(0x145)]=String(RegExp['$1'])['trim']();for(;;){if(_0x1674eb[_0x5a2619(0x145)][_0x5a2619(0x160)](/\\V\[(\d+)\]/gi))_0x1674eb['name']=_0x1674eb[_0x5a2619(0x145)][_0x5a2619(0x1ee)](/\\V\[(\d+)\]/gi,(_0x5d6a16,_0x157d2a)=>$gameVariables[_0x5a2619(0x205)](parseInt(_0x157d2a)));else break;}}},Window_SkillList['prototype'][_0x13ab2e(0x27b)]=function(_0x3880ca,_0x4a162d,_0x4953e2,_0x415424){const _0x1db116=_0x13ab2e;Window_Base[_0x1db116(0x2f5)][_0x1db116(0x27b)][_0x1db116(0x13a)](this,this['_actor'],_0x3880ca,_0x4a162d,_0x4953e2,_0x415424);},Window_SkillList[_0x13ab2e(0x2f5)][_0x13ab2e(0x3f2)]=function(_0x2056fe){const _0x96a815=_0x13ab2e;this[_0x96a815(0x384)]=_0x2056fe,this['callUpdateHelp']();},VisuMZ[_0x13ab2e(0x25d)][_0x13ab2e(0x2bc)]=Window_SkillList[_0x13ab2e(0x2f5)]['updateHelp'],Window_SkillList[_0x13ab2e(0x2f5)][_0x13ab2e(0x27a)]=function(){const _0x52828f=_0x13ab2e;VisuMZ['SkillsStatesCore'][_0x52828f(0x2bc)]['call'](this),this[_0x52828f(0x384)]&&this[_0x52828f(0x384)][_0x52828f(0x2e5)]===Window_ShopStatus&&this['_statusWindow']['setItem'](this[_0x52828f(0x1b7)]());};