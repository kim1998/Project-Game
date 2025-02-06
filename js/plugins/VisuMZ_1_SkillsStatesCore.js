//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.48;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.48] [SkillsStatesCore]
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

const _0x3a8e42=_0x3946;(function(_0x17a974,_0x471699){const _0xfbdefa=_0x3946,_0x370b30=_0x17a974();while(!![]){try{const _0xc82925=parseInt(_0xfbdefa(0x1e5))/0x1+-parseInt(_0xfbdefa(0x1e1))/0x2*(parseInt(_0xfbdefa(0x306))/0x3)+-parseInt(_0xfbdefa(0x253))/0x4+parseInt(_0xfbdefa(0x1a2))/0x5+-parseInt(_0xfbdefa(0x1e4))/0x6+parseInt(_0xfbdefa(0x2cd))/0x7*(-parseInt(_0xfbdefa(0x199))/0x8)+parseInt(_0xfbdefa(0x39d))/0x9*(parseInt(_0xfbdefa(0x16d))/0xa);if(_0xc82925===_0x471699)break;else _0x370b30['push'](_0x370b30['shift']());}catch(_0x5cf75d){_0x370b30['push'](_0x370b30['shift']());}}}(_0xe3d6,0x2a5c6));function _0xe3d6(){const _0x561ae2=['_checkingPassiveStates','Parse_Notetags_Skill_Cost','onExpireBuffGlobalJS','_stateData','isSkillUsableForAutoBattle','Game_BattlerBase_traitsSet','normalColor','skillTpCost','ParseAllNotetags','opponentsUnit','recalculateSlipDamageJS','Game_BattlerBase_increaseBuff','CheckVisibleBattleNotetags','fontBold','_stateSteps','Sprite_Gauge_initMembers','Item-%1-%2','States','stateHpSlipHealJS','VisuMZ_0_CoreEngine','resetStateCounts','removeStatesByDamage','_stateIDs','_stateMaxTurns','getClassIdWithName','textSizeEx','item','die','ParseClassIDs','skillTypes','autoRemovalTiming','ParseSkillChangessIntoData','_battler','<member-%1>','isRightInputMode','currentMaxValueSkillsStatesCore','setupSkillsStatesCore','IconStypeNorm','itemTextAlign','stateExpireJS','maxTurns','shift','PayJS','canChangeSkillsThroughStateEffects','onEraseDebuff','updatedLayoutStyle','ARRAYSTRUCT','indexOf','applySkillsStatesCoreEffects','canSortSkillTypeList','eraseState','makeCommandName','outlineColor','Scene_Skill_createItemWindow','refresh','onAddStateGlobalJS','restriction','Game_BattlerBase_eraseBuff','onRemoveState','buffIconIndex','_result','untitled','commandStyleCheck','fillRect','index','MatchLabelColor','changeSkillsThroughStateEffects','resetTextColor','exit','passiveStates','StateTurnsActorChangeTo','drawActorIcons','note','drawText','commandNameWindowDrawText','StateID','sortSkillList','removeBuff','toUpperCase','toLowerCase','_animationIndex','fontFace','isActor','test','onRegenerateCustomStateDamageOverTime','_passiveStateResults','usableSkills','setBackgroundType','buffLength','Game_BattlerBase_resetStateCounts','hasStateCategory','_bypassRemoveStateDamage_value','isSkillTypeMatchForUse','currentValue','slipMp','_currentTroopUniqueID','clearStateOrigin','Game_BattlerBase_refresh','sort','ARRAYNUM','isPassiveStateStackable','ValueOutlineSolid','Game_BattlerBase_recoverAll','TextJS','priority','Window_SkillList_drawItem','<actor-%1>','getSkillTypes','recoverAll','removeState','addDebuffTurns','stateId','SkillsStatesCore','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','success','updateStatesActionEnd','SkillConditionJS','Enemy-%1-%2','stateColor','getStypeIdWithName','_currentActor','Gauge','Game_Player_refresh','\x5cI[%1]%2','DisplayedParams','createPassiveStatesCache','setBuffTurns','clearStateData','currentMaxValue','_data','onEraseStateGlobalJS','ColorDebuff','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','onAddStateMakeCustomSlipValues','Game_Battler_addState','removeOtherStatesOfSameCategory','onAddBuffJS','match','iconHeight','status','drawParamText','getPassiveStateConditionSwitchData','_cache','mainAreaTop','skillVisibleJS','SortSkillTypesAbc','gradientFillRect','applyDebuffTurnManipulationEffects','filter','checkShowHideNotetags','chanceByDamage','updateStateTurns','ListWindowCols','battleMembers','AutoAddState','AURA_SYSTEM_ENABLED','makeCurrentTroopUniqueID','1492460wffxSn','AGI','lineHeight','remove','max','clearAllStateOrigins','isBuffPrevented','setActor','text','adjustItemWidthByShopStatus','_buffTurns','stateMpSlipDamageJS','ARRAYJSON','%1%','add','SortByIDandPriorityUsingIDs','placeGauge','removeStatesByCategory','regenerateAll','maxItems','_itemWindow','states','includesSkillsStatesCore','Scene_Boot_onDatabaseLoaded','_classIDs','redrawSkillsStatesCore','makeResistedStateCategories','Game_BattlerBase_states','initMembersSkillsStatesCore','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','ReapplyRules','getStateReapplyRulings','drawActorStateTurns','drawFullGauge','_cache_getPassiveStateConditionSwitchData','Parse_Notetags_State_PassiveJS','Game_Actor_skillTypes','drawSkillCost','CmdTextAlign','State-%1-%2','bypassRemoveStatesByDamage','_stored_buffColor','_shopStatusWindow','MDF','492248PDOBTi','StateTurnsEnemyChangeTo','_costSettings','death','bitmap','Scene_Skill_itemWindowRect','drawExtendedSkillsStatesCoreStatus','stateTpSlipHealJS','addCommand','1588720PSasIC','innerWidth','LayoutStyle','Game_Troop_setup','onEraseDebuffGlobalJS','textColor','_tempActor','Window_SkillStatus_refresh','ColorNeutral','Turns','onChange','innerHeight','setDebuffTurns','opacity','ShowShopStatus','setup','stepsForTurn','parse','meetsPassiveStateConditions','itemWindowRectSkillsStatesCore','currentValueSkillsStatesCore','Game_Battler_regenerateAll','updateFrame','onDatabaseLoaded','actor','labelFontFace','changeTextColor','convertPassiveStates','meetsStateCondition','Window_StatusBase_placeGauge','ARRAYEVAL','Window_SkillList_maxCols','drawActorBuffTurns','Param','_checkingVisuMzPassiveStateObjects','onExpireState','state','allSwitchOn','user','isSkillCostShown','_skills','LUK','description','shopStatusWindowRectSkillsStatesCore','drawActorStateData','skillTypeWindowRectSkillsStatesCore','getStateOriginByKey','Parse_Notetags_Skill_Sorting','center','greater','constructor','action','totalStateCategoryAffected','setPassiveStateSlipDamageJS','Game_Unit_deadMembers','Sprite_Gauge_currentValue','adjustSkillCost','_states','keys','helpAreaHeight','applyStateCategoryRemovalEffects','applyItemUserEffect','valueFontSize','603276kyRzuJ','stateEraseJS','numberFontFace','1072410pMyLVe','120591XpRaEL','statusWidth','setStateDisplay','fontSize','drawActorBuffRates','Scene_Skill_skillTypeWindowRect','width','Actor-%1-%2','Window_SkillList_updateHelp','addPassiveStatesByNotetag','map','buttonAssistText1','getCurrentTroopUniqueID','makeItemList','_subject','SkillSceneStatusBgType','TurnEndOnMap','stateData','addBuffTurns','calcWindowHeight','DataFontSize','isAppeared','process_VisuMZ_SkillsStatesCore_Notetags','onBattleEnd','Scene_Skill_helpWindowRect','updateCommandNameWindow','meetsPassiveStateConditionJS','CheckIncompatibleStates','onEraseDebuffJS','subject','auto','canUse','checkSkillConditionsSwitchNotetags','Enemy','stateAddJS','paramBuffRate','categories','ShowTurns','enemyId','getPassiveStatesFromObj','meetsSkillConditionsGlobalJS','addBuff','name','uiInputPosition','Weapon-%1-%2','currentClass','CanPayJS','resetFontSettings','clamp','labelOutlineWidth','trim','getStateRetainType','Game_Actor_forgetSkill','isPartyAllAffectedByGroupDefeatStates','stypeId','checkSkillTypeMatch','ParseStateNotetags','frameCount','checkCacheKey','Game_Battler_onBattleEnd','CalcJS','members','iconIndex','_phase','sortPriority','clearStatesWithStateRetain','onExpireDebuffJS','addPassiveStatesFromOtherPlugins','MaxTurns','_cache_CheckBypassRemoveStatesByDamage','Game_BattlerBase_overwriteBuffTurns','Game_BattlerBase_decreaseBuff','callUpdateHelp','windowPadding','isBuffExpired','hasState','length','onExpireBuffJS','registerCommand','drawItemStyleIcon','MeetsAuraNoteConditions','onAddState','ShowJS','_stypeId','tpCost','Game_BattlerBase_skillMpCost','slice','TurnOffsetX','addPassiveStates','getStateIdWithName','JSON','onEraseBuffGlobalJS','Window_SkillType_initialize','convertTargetToStateOriginKey','Game_BattlerBase_clearStates','VisuMZ_1_MainMenuCore','clearStates','onEraseBuff','groupDefeat','ActionEndUpdate','equipPassives','actions','_bypassRemoveStateDamage_user','getCurrentStateActiveUser','hasSkill','contents','isDead','onAddBuff','_categoryWindow','makeCommandList','682636eutWeM','number','forgetSkill','SortByIDandPriority','onAddBuffGlobalJS','executeHpDamage','onAddDebuffJS','icon','itemWindowRect','helpWindowRectSkillsStatesCore','HiddenSkillTypes','valueFontFace','ActorIDs','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','LabelOutlineWidth','Game_BattlerBase_skillTpCost','getStateData','stateHpSlipDamageJS','aliveMembers','parameters','statusWindowRect','Game_BattlerBase_buffIconIndex','onAddStateJS','clear','PassiveStates','helpWindowRect','onEraseStateJS','_cache_getAuraPassiveStatesFromObj','updateTurnDisplaySprite','ARRAYSTR','MAT','overwriteBuffTurns','active','onExpireStateCustomJS','skillCostSeparator','shopStatusWidth','return\x200','ColorNegative','isStateRemoved','_stateOrigin','SkillID','increaseBuff','Sprite_Gauge_gaugeRate','Parse_Notetags_State_ApplyRemoveLeaveJS','_stateDisplay','learnSkill','passiveStateIDs','setItem','paySkillCost','isTargetBypassRemoveStatesByDamage','gainMp','refreshAllMembers','_statusWindow','Game_Battler_isStateAddable','SkillSceneAdjustSkillList','totalStateCategory','BattleHiddenSkillTypes','slipHp','getSkillChangesFromState','debuffColor','min','isLearnedSkill','statesByCategory','isDebuffAffected','_bypassRemoveStateDamage_action','isUserBypassRemoveStatesByDamage','checkShowHideJS','setStateOrigin','createItemWindow','buff','createTurnDisplaySprite','isStateAddable','skills','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','mainAreaHeight','StateTurnsEnemyChangeBy','BattleManager_endAction','addWindow','_colorCache','DataOffsetX','ARRAYFUNC','mainFontFace','testSkillStatesCoreNotetags','Skill-%1-%2','addDebuff','ValueOutlineWidth','mainFontSize','ValueFontMainType','canPaySkillCost','_skillTypeWindow','ShowData','EVAL','MAXHP','Sprite_StateIcon_loadBitmap','_stateTurns','gainHp','itemLineRect','equips','stateMaximumTurns','Game_Variables_onChange','itemAt','isPlaytest','isCommandEnabled','getAuraPassiveStateIDs','_stypeIDs','isUseModernControls','Game_BattlerBase_meetsSkillConditions','onExpireDebuff','isStateResist','randomInt','Game_Battler_addDebuff','onEraseStateCustomJS','prepareResetStateCounts','skillMpCost','drawTextEx','hide','allSwitchOff','damage','MeetsAuraStateConditions','STR','createSkillCostText','meetsPassiveStateGlobalConditionJS','7YveKsm','eraseBuff','getColor','ConvertParams','onAddDebuffGlobalJS','<troop-%1>','updateVisibility','log','decreaseBuff','addStateTurns','ColorPositive','CheckBypassRemoveStatesByDamage','isAllDead','process_VisuMZ_SkillsStatesCore_State_Notetags','slipTp','meetsSkillConditions','push','gaugeColor2','skillEnableJS','_checkingTraitsSetSkillsStatesCore','makeAdditionalSkillCostText','skillTypeWindowRect','isBuffOrDebuffAffected','VisuMZ_1_ElementStatusCore','_cache_getPassiveStatesFromObj','POSITIVE','rgba(0,\x200,\x200,\x201)','Game_Action_applyItemUserEffect','split','enemy','isStateAffected','recover\x20all','format','inBattle','initialize','currentDisplayedValue','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','passiveStateObjects','multiclasses','Sprite_Gauge_currentMaxValue','Name','_skillChangesFromState','drawItem','Window_SkillList_makeItemList','setStateTurns','ignore','Global','commandStyle','rgba(0,\x200,\x200,\x200)','gaugeRate','paramValueByName','FUNC','reset','#%1','NEGATIVE','height','iconWidth','3UYDVDj','removeStatesAuto','_scene','gaugeBackColor','_cache_getPassiveStateConditionClassesData','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','onAddStateCustomJS','Game_Unit_isAllDead','isSceneBattle','PassiveConditionJS','_actor','drawActorIconsAllTurnCounters','stateTpSlipDamageJS','equipBattleSkills','attacker','commandName','retrieveStateColor','isStateCategoryResisted','drawItemStyleIconText','Settings','gaugeLineHeight','getAuraPassiveStatesFromObj','Sprite_Gauge_redraw','Game_Action_executeHpDamage_bypassStateDmgRemoval','SkillEnemyPaySkillCost','Buffs','_stateRetainType','allIcons','_buffs','stateTurns','replace','MeetsAuraObjConditions','addPassiveStatesByPluginParameters','valueOutlineColor','includes','anySwitchOff','target','Scene_Skill_statusWindowRect','Actor','LabelOutlineSolid','makeSuccess','IconStypeMagic','convertGaugeTypeSkillsStatesCore','_skillIDs','multiClass','valueOutlineWidth','SkillActorPaySkillCost','changeOutlineColor','clearStateDisplay','isBuffAffected','addPassiveStatesTraitSets','updateHelp','Parse_Notetags_State_Category','_stored_debuffColor','initMembers','canClearState','addAuraPassiveStateIDs','onEraseBuffJS','Parse_Notetags_State_SlipEffectJS','commandNameWindowDrawBackground','onAddDebuff','onExpireDebuffGlobalJS','MAXMP','StackBuffMax','setStateRetainType','LabelFontMainType','prototype','onExpireStateGlobalJS','Game_BattlerBase_eraseState','Class-%1-%2','endAction','meetsSkillConditionsEnableJS','Sprite_StateIcon_updateFrame','CheckVisibleSkillNotetags','createKeyJS','getColorDataFromPluginParameters','createAllSkillCostText','Costs','Parse_Notetags_Skill_JS','statePassiveConditionJS','allBattleMembers','GaugeCurrentJS','Game_Switches_onChange','DataOffsetY','Window_StatusBase_drawActorIcons','magicSkills','stateCategoriesResisted','getStateDisplay','_hidden','clearStateRetainType','loadBitmap','boxWidth','round','isStateRestrict','MatchLabelGaugeColor','CheckVisibleSwitchNotetags','buffColor','anchor','traitsSet','Game_BattlerBase_initMembers','process_VisuMZ_SkillsStatesCore_Skill_Notetags','isGroupDefeatStateAffected','value','stateMpSlipHealJS','onExpireBuff','redraw','floor','call','concat','alterSkillName','testApply','_commandNameWindow','_endingBattle','EnemyIndex','getSkillIdWithName','iconText','heal','getPassiveStateConditionClassesData','auraStateIDs','ParseSkillNotetags','Skills','traitObjects','_tempBattler','right','mpDamage','meetsPassiveStateConditionClasses','GaugeDrawJS','meetsPassiveStateConditionSwitches','ALL','isUseSkillsStatesCoreUpdatedLayout','ATK','buffTurns','scrollTo','setStatusWindow','createCommandNameWindow','shopStatusWindowRect','getCurrentStateOriginKey','isStateExpired','changePaintOpacity','Game_Battler_addBuff','StateTurnsActorChangeBy','allowCreateShopStatusWindow','applyStateTurnManipulationEffects','hpDamage','addState','NUM','anySwitchOn','_turnDisplaySprite','mainCommandWidth','statusWindowRectSkillsStatesCore','process_VisuMZ_SkillsStatesCore_CheckForAuras','27qTWvoa','Game_BattlerBase_die','mpCost','actorId','setStateData','placeExactGauge','CmdWidth','ColorBuff','removeStatesByCategoryAll'];_0xe3d6=function(){return _0x561ae2;};return _0xe3d6();}function _0x3946(_0x19038e,_0x5d63a7){const _0xe3d69e=_0xe3d6();return _0x3946=function(_0x394639,_0x25cf23){_0x394639=_0x394639-0x13f;let _0x3d9470=_0xe3d69e[_0x394639];return _0x3d9470;},_0x3946(_0x19038e,_0x5d63a7);}var label=_0x3a8e42(0x140),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x3a8e42(0x164)](function(_0x38087d){const _0x22b482=_0x3a8e42;return _0x38087d[_0x22b482(0x15b)]&&_0x38087d['description']['includes']('['+label+']');})[0x0];VisuMZ[label][_0x3a8e42(0x319)]=VisuMZ[label][_0x3a8e42(0x319)]||{},VisuMZ[_0x3a8e42(0x2d0)]=function(_0xc50617,_0x1f4888){const _0x5c4cc8=_0x3a8e42;for(const _0x35839c in _0x1f4888){if(_0x35839c[_0x5c4cc8(0x159)](/(.*):(.*)/i)){const _0x1da99f=String(RegExp['$1']),_0x56cfd1=String(RegExp['$2'])[_0x5c4cc8(0x3f4)]()[_0x5c4cc8(0x217)]();let _0x39ecdd,_0x2559b0,_0x41a79f;switch(_0x56cfd1){case _0x5c4cc8(0x397):_0x39ecdd=_0x1f4888[_0x35839c]!==''?Number(_0x1f4888[_0x35839c]):0x0;break;case _0x5c4cc8(0x409):_0x2559b0=_0x1f4888[_0x35839c]!==''?JSON[_0x5c4cc8(0x1b3)](_0x1f4888[_0x35839c]):[],_0x39ecdd=_0x2559b0[_0x5c4cc8(0x1ef)](_0x4aa31f=>Number(_0x4aa31f));break;case _0x5c4cc8(0x2ae):_0x39ecdd=_0x1f4888[_0x35839c]!==''?eval(_0x1f4888[_0x35839c]):null;break;case _0x5c4cc8(0x1c0):_0x2559b0=_0x1f4888[_0x35839c]!==''?JSON['parse'](_0x1f4888[_0x35839c]):[],_0x39ecdd=_0x2559b0[_0x5c4cc8(0x1ef)](_0x421e04=>eval(_0x421e04));break;case _0x5c4cc8(0x23f):_0x39ecdd=_0x1f4888[_0x35839c]!==''?JSON['parse'](_0x1f4888[_0x35839c]):'';break;case _0x5c4cc8(0x179):_0x2559b0=_0x1f4888[_0x35839c]!==''?JSON[_0x5c4cc8(0x1b3)](_0x1f4888[_0x35839c]):[],_0x39ecdd=_0x2559b0[_0x5c4cc8(0x1ef)](_0x31170b=>JSON[_0x5c4cc8(0x1b3)](_0x31170b));break;case _0x5c4cc8(0x300):_0x39ecdd=_0x1f4888[_0x35839c]!==''?new Function(JSON[_0x5c4cc8(0x1b3)](_0x1f4888[_0x35839c])):new Function(_0x5c4cc8(0x277));break;case _0x5c4cc8(0x2a3):_0x2559b0=_0x1f4888[_0x35839c]!==''?JSON['parse'](_0x1f4888[_0x35839c]):[],_0x39ecdd=_0x2559b0[_0x5c4cc8(0x1ef)](_0x4ac0bd=>new Function(JSON[_0x5c4cc8(0x1b3)](_0x4ac0bd)));break;case _0x5c4cc8(0x2ca):_0x39ecdd=_0x1f4888[_0x35839c]!==''?String(_0x1f4888[_0x35839c]):'';break;case _0x5c4cc8(0x270):_0x2559b0=_0x1f4888[_0x35839c]!==''?JSON[_0x5c4cc8(0x1b3)](_0x1f4888[_0x35839c]):[],_0x39ecdd=_0x2559b0[_0x5c4cc8(0x1ef)](_0xe31c22=>String(_0xe31c22));break;case'STRUCT':_0x41a79f=_0x1f4888[_0x35839c]!==''?JSON[_0x5c4cc8(0x1b3)](_0x1f4888[_0x35839c]):{},_0xc50617[_0x1da99f]={},VisuMZ[_0x5c4cc8(0x2d0)](_0xc50617[_0x1da99f],_0x41a79f);continue;case _0x5c4cc8(0x3d4):_0x2559b0=_0x1f4888[_0x35839c]!==''?JSON[_0x5c4cc8(0x1b3)](_0x1f4888[_0x35839c]):[],_0x39ecdd=_0x2559b0['map'](_0x415ed6=>VisuMZ[_0x5c4cc8(0x2d0)]({},JSON['parse'](_0x415ed6)));break;default:continue;}_0xc50617[_0x1da99f]=_0x39ecdd;}}return _0xc50617;},(_0x1599d2=>{const _0x2592c3=_0x3a8e42,_0x4d56ac=_0x1599d2[_0x2592c3(0x20f)];for(const _0x172b7e of dependencies){if(!Imported[_0x172b7e]){alert(_0x2592c3(0x154)[_0x2592c3(0x2ed)](_0x4d56ac,_0x172b7e)),SceneManager['exit']();break;}}const _0x47035a=_0x1599d2[_0x2592c3(0x1cc)];if(_0x47035a[_0x2592c3(0x159)](/\[Version[ ](.*?)\]/i)){const _0x2ee554=Number(RegExp['$1']);_0x2ee554!==VisuMZ[label]['version']&&(alert(_0x2592c3(0x2f1)['format'](_0x4d56ac,_0x2ee554)),SceneManager['exit']());}if(_0x47035a[_0x2592c3(0x159)](/\[Tier[ ](\d+)\]/i)){const _0x5e4681=Number(RegExp['$1']);_0x5e4681<tier?(alert(_0x2592c3(0x29c)[_0x2592c3(0x2ed)](_0x4d56ac,_0x5e4681,tier)),SceneManager[_0x2592c3(0x3ea)]()):tier=Math[_0x2592c3(0x171)](_0x5e4681,tier);}VisuMZ[_0x2592c3(0x2d0)](VisuMZ[label][_0x2592c3(0x319)],_0x1599d2[_0x2592c3(0x266)]);})(pluginData),PluginManager[_0x3a8e42(0x233)](pluginData[_0x3a8e42(0x20f)],_0x3a8e42(0x334),_0x2aaca9=>{const _0x4c8032=_0x3a8e42;VisuMZ['ConvertParams'](_0x2aaca9,_0x2aaca9);const _0x537f05=_0x2aaca9[_0x4c8032(0x25f)]||[],_0x210b19=Number(_0x2aaca9[_0x4c8032(0x27b)]),_0x222652=$dataSkills[_0x210b19];if(!_0x222652)return;for(const _0xf941c5 of _0x537f05){const _0x5b3716=$gameActors['actor'](_0xf941c5);if(!_0x5b3716)continue;_0x5b3716[_0x4c8032(0x283)](_0x222652);}}),PluginManager[_0x3a8e42(0x233)](pluginData[_0x3a8e42(0x20f)],_0x3a8e42(0x31e),_0x18b881=>{const _0x293770=_0x3a8e42;VisuMZ[_0x293770(0x2d0)](_0x18b881,_0x18b881);const _0x1d5e40=_0x18b881[_0x293770(0x377)]||[],_0x5a86b4=Number(_0x18b881[_0x293770(0x27b)]),_0x3ec3c9=$dataSkills[_0x5a86b4];if(!_0x3ec3c9)return;for(const _0x3a9eba of _0x1d5e40){const _0x13135d=$gameTroop[_0x293770(0x222)]()[_0x3a9eba];if(!_0x13135d)continue;_0x13135d[_0x293770(0x283)](_0x3ec3c9);}}),PluginManager[_0x3a8e42(0x233)](pluginData[_0x3a8e42(0x20f)],_0x3a8e42(0x392),_0x4c4b1c=>{const _0x8c92f9=_0x3a8e42;VisuMZ[_0x8c92f9(0x2d0)](_0x4c4b1c,_0x4c4b1c);const _0x7637d3=_0x4c4b1c[_0x8c92f9(0x25f)]||[],_0x49f539=Number(_0x4c4b1c['StateID']),_0x263ea7=Number(_0x4c4b1c[_0x8c92f9(0x1ab)]),_0x145c99=_0x4c4b1c[_0x8c92f9(0x16a)];for(const _0x13117c of _0x7637d3){const _0x2bd437=$gameActors[_0x8c92f9(0x1ba)](_0x13117c);if(!_0x2bd437)continue;_0x145c99&&!_0x2bd437['isStateAffected'](_0x49f539)?(_0x2bd437[_0x8c92f9(0x396)](_0x49f539),_0x2bd437[_0x8c92f9(0x2f9)](_0x49f539,_0x263ea7)):_0x2bd437[_0x8c92f9(0x2d6)](_0x49f539,_0x263ea7);}}),PluginManager[_0x3a8e42(0x233)](pluginData['name'],_0x3a8e42(0x3ec),_0xb3784f=>{const _0x344663=_0x3a8e42;VisuMZ[_0x344663(0x2d0)](_0xb3784f,_0xb3784f);const _0x20035f=_0xb3784f[_0x344663(0x25f)]||[],_0x1af004=Number(_0xb3784f[_0x344663(0x3f1)]),_0x5282ad=Math[_0x344663(0x171)](Number(_0xb3784f['Turns']),0x0),_0x50506a=_0xb3784f['AutoAddState'];for(const _0x2436d6 of _0x20035f){const _0x676023=$gameActors['actor'](_0x2436d6);if(!_0x676023)continue;_0x50506a&&!_0x676023[_0x344663(0x2eb)](_0x1af004)&&_0x676023[_0x344663(0x396)](_0x1af004),_0x676023[_0x344663(0x2f9)](_0x1af004,_0x5282ad);}}),PluginManager[_0x3a8e42(0x233)](pluginData['name'],_0x3a8e42(0x29e),_0x22a815=>{const _0x5291a8=_0x3a8e42;if(!$gameParty[_0x5291a8(0x2ee)]())return;VisuMZ[_0x5291a8(0x2d0)](_0x22a815,_0x22a815);const _0x4cda98=_0x22a815['EnemyIndex']||[],_0x16fa06=Number(_0x22a815[_0x5291a8(0x3f1)]),_0x2eb9a8=Number(_0x22a815['Turns']),_0x4192e7=_0x22a815['AutoAddState'];for(const _0x47265f of _0x4cda98){const _0xc13d66=$gameTroop[_0x5291a8(0x222)]()[_0x47265f];if(!_0xc13d66)continue;_0x4192e7&&!_0xc13d66[_0x5291a8(0x2eb)](_0x16fa06)?(_0xc13d66['addState'](_0x16fa06),_0xc13d66[_0x5291a8(0x2f9)](_0x16fa06,_0x2eb9a8)):_0xc13d66['addStateTurns'](_0x16fa06,_0x2eb9a8);}}),PluginManager[_0x3a8e42(0x233)](pluginData[_0x3a8e42(0x20f)],_0x3a8e42(0x19a),_0x251e27=>{const _0x422bbd=_0x3a8e42;if(!$gameParty[_0x422bbd(0x2ee)]())return;VisuMZ[_0x422bbd(0x2d0)](_0x251e27,_0x251e27);const _0x151a82=_0x251e27[_0x422bbd(0x377)]||[],_0x18e8ce=Number(_0x251e27[_0x422bbd(0x3f1)]),_0x11ff0c=Math[_0x422bbd(0x171)](Number(_0x251e27[_0x422bbd(0x1ab)]),0x0),_0x12b6a9=_0x251e27[_0x422bbd(0x16a)];for(const _0x145525 of _0x151a82){const _0x5d6a68=$gameTroop[_0x422bbd(0x222)]()[_0x145525];if(!_0x5d6a68)continue;_0x12b6a9&&!_0x5d6a68['isStateAffected'](_0x18e8ce)&&_0x5d6a68[_0x422bbd(0x396)](_0x18e8ce),_0x5d6a68[_0x422bbd(0x2f9)](_0x18e8ce,_0x11ff0c);}}),VisuMZ['SkillsStatesCore'][_0x3a8e42(0x184)]=Scene_Boot[_0x3a8e42(0x348)][_0x3a8e42(0x1b9)],Scene_Boot[_0x3a8e42(0x348)][_0x3a8e42(0x1b9)]=function(){const _0x3ecc7f=_0x3a8e42;VisuMZ[_0x3ecc7f(0x140)][_0x3ecc7f(0x184)][_0x3ecc7f(0x371)](this),this[_0x3ecc7f(0x1fb)](),VisuMZ[_0x3ecc7f(0x140)][_0x3ecc7f(0x200)]();},Scene_Boot[_0x3a8e42(0x348)]['process_VisuMZ_SkillsStatesCore_Notetags']=function(){const _0x2d1080=_0x3a8e42;this['process_VisuMZ_SkillsStatesCore_CheckForAuras']();if(VisuMZ[_0x2d1080(0x3ae)])return;this[_0x2d1080(0x36a)](),this[_0x2d1080(0x2da)]();},Scene_Boot[_0x3a8e42(0x348)]['process_VisuMZ_SkillsStatesCore_Skill_Notetags']=function(){const _0x56cb3a=_0x3a8e42;for(const _0xc3e08f of $dataSkills){if(!_0xc3e08f)continue;VisuMZ[_0x56cb3a(0x140)][_0x56cb3a(0x3a7)](_0xc3e08f),VisuMZ[_0x56cb3a(0x140)][_0x56cb3a(0x1d1)](_0xc3e08f),VisuMZ[_0x56cb3a(0x140)][_0x56cb3a(0x354)](_0xc3e08f);}},Scene_Boot[_0x3a8e42(0x348)]['process_VisuMZ_SkillsStatesCore_State_Notetags']=function(){const _0x7650f7=_0x3a8e42;for(const _0x100e8d of $dataStates){if(!_0x100e8d)continue;VisuMZ['SkillsStatesCore'][_0x7650f7(0x33a)](_0x100e8d),VisuMZ[_0x7650f7(0x140)]['Parse_Notetags_State_PassiveJS'](_0x100e8d),VisuMZ[_0x7650f7(0x140)][_0x7650f7(0x340)](_0x100e8d),VisuMZ[_0x7650f7(0x140)]['Parse_Notetags_State_ApplyRemoveLeaveJS'](_0x100e8d);}},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x37d)]=VisuMZ[_0x3a8e42(0x37d)],VisuMZ[_0x3a8e42(0x37d)]=function(_0x3ce239){const _0x1b817d=_0x3a8e42;VisuMZ[_0x1b817d(0x140)][_0x1b817d(0x37d)][_0x1b817d(0x371)](this,_0x3ce239),VisuMZ[_0x1b817d(0x140)]['Parse_Notetags_Skill_Cost'](_0x3ce239),VisuMZ[_0x1b817d(0x140)]['Parse_Notetags_Skill_Sorting'](_0x3ce239),VisuMZ['SkillsStatesCore']['Parse_Notetags_Skill_JS'](_0x3ce239);},VisuMZ[_0x3a8e42(0x140)]['ParseStateNotetags']=VisuMZ[_0x3a8e42(0x21d)],VisuMZ['ParseStateNotetags']=function(_0x467039){const _0x3aef63=_0x3a8e42;VisuMZ[_0x3aef63(0x140)][_0x3aef63(0x21d)][_0x3aef63(0x371)](this,_0x467039),VisuMZ[_0x3aef63(0x140)][_0x3aef63(0x33a)](_0x467039),VisuMZ[_0x3aef63(0x140)][_0x3aef63(0x190)](_0x467039),VisuMZ[_0x3aef63(0x140)]['Parse_Notetags_State_SlipEffectJS'](_0x467039),VisuMZ[_0x3aef63(0x140)][_0x3aef63(0x27e)](_0x467039);},VisuMZ['SkillsStatesCore'][_0x3a8e42(0x3a7)]=function(_0x4f581c){const _0x1aa19f=_0x3a8e42,_0x1063a7=_0x4f581c['note'];_0x1063a7['match'](/<MP COST:[ ](\d+)>/i)&&(_0x4f581c[_0x1aa19f(0x39f)]=Number(RegExp['$1'])),_0x1063a7[_0x1aa19f(0x159)](/<TP COST:[ ](\d+)>/i)&&(_0x4f581c[_0x1aa19f(0x239)]=Number(RegExp['$1']));},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x1d1)]=function(_0x2cbf12){const _0x29683b=_0x3a8e42;if(!_0x2cbf12)return;_0x2cbf12[_0x29683b(0x225)]=0x32;const _0x5b9874=_0x2cbf12[_0x29683b(0x3ee)]||'';_0x5b9874[_0x29683b(0x159)](/<(?:|ID )SORT(?:|ING)[ ]PRIORITY:[ ](\d+)>/i)&&(_0x2cbf12[_0x29683b(0x225)]=Number(RegExp['$1']));},VisuMZ['SkillsStatesCore'][_0x3a8e42(0x2df)]={},VisuMZ['SkillsStatesCore']['skillVisibleJS']={},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x354)]=function(_0xd3dda7){const _0x5d4a45=_0x3a8e42,_0x2f51ad=_0xd3dda7[_0x5d4a45(0x3ee)];if(_0x2f51ad[_0x5d4a45(0x159)](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x5d557f=String(RegExp['$1']),_0x12514f=_0x5d4a45(0x18a)[_0x5d4a45(0x2ed)](_0x5d557f);VisuMZ['SkillsStatesCore'][_0x5d4a45(0x2df)][_0xd3dda7['id']]=new Function('skill',_0x12514f);}if(_0x2f51ad['match'](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x4ec87a=String(RegExp['$1']),_0x3711ab=_0x5d4a45(0x30b)[_0x5d4a45(0x2ed)](_0x4ec87a);VisuMZ[_0x5d4a45(0x140)][_0x5d4a45(0x160)][_0xd3dda7['id']]=new Function('skill',_0x3711ab);}},VisuMZ['SkillsStatesCore']['Parse_Notetags_State_Category']=function(_0x22299c){const _0x49d2f0=_0x3a8e42;_0x22299c[_0x49d2f0(0x209)]=[_0x49d2f0(0x386),'ANY'];const _0x91eaf6=_0x22299c['note'],_0x712bb5=_0x91eaf6['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x712bb5)for(const _0x2418ca of _0x712bb5){_0x2418ca[_0x49d2f0(0x159)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x587d2a=String(RegExp['$1'])[_0x49d2f0(0x3f4)]()[_0x49d2f0(0x217)]()[_0x49d2f0(0x2e9)](',');for(const _0x4dabd7 of _0x587d2a){_0x22299c[_0x49d2f0(0x209)][_0x49d2f0(0x2dd)](_0x4dabd7[_0x49d2f0(0x217)]());}}if(_0x91eaf6['match'](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x35ef17=RegExp['$1'][_0x49d2f0(0x2e9)](/[\r\n]+/);for(const _0x391209 of _0x35ef17){_0x22299c[_0x49d2f0(0x209)][_0x49d2f0(0x2dd)](_0x391209[_0x49d2f0(0x3f4)]()['trim']());}}_0x91eaf6[_0x49d2f0(0x159)](/<POSITIVE STATE>/i)&&_0x22299c[_0x49d2f0(0x209)]['push'](_0x49d2f0(0x2e6)),_0x91eaf6['match'](/<NEGATIVE STATE>/i)&&_0x22299c[_0x49d2f0(0x209)]['push'](_0x49d2f0(0x303));},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x355)]={},VisuMZ['SkillsStatesCore'][_0x3a8e42(0x190)]=function(_0xbb73ce){const _0x1a5dd0=_0x3a8e42,_0x312087=_0xbb73ce[_0x1a5dd0(0x3ee)];if(_0x312087[_0x1a5dd0(0x159)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x531f18=String(RegExp['$1']),_0x4ad416=_0x1a5dd0(0x260)[_0x1a5dd0(0x2ed)](_0x531f18);VisuMZ['SkillsStatesCore'][_0x1a5dd0(0x355)][_0xbb73ce['id']]=new Function(_0x1a5dd0(0x1c6),_0x4ad416);}},VisuMZ[_0x3a8e42(0x140)]['stateHpSlipDamageJS']={},VisuMZ['SkillsStatesCore'][_0x3a8e42(0x3b8)]={},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x178)]={},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x36d)]={},VisuMZ['SkillsStatesCore']['stateTpSlipDamageJS']={},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x1a0)]={},VisuMZ['SkillsStatesCore'][_0x3a8e42(0x340)]=function(_0x2144f9){const _0x4f9462=_0x3a8e42,_0x486593=_0x2144f9[_0x4f9462(0x3ee)],_0x2dcd77='\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20';if(_0x486593[_0x4f9462(0x159)](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0x2129c2=String(RegExp['$1']),_0x5f47ce=_0x2dcd77[_0x4f9462(0x2ed)](_0x2129c2,'damage',-0x1,_0x4f9462(0x28c));VisuMZ[_0x4f9462(0x140)][_0x4f9462(0x264)][_0x2144f9['id']]=new Function(_0x4f9462(0x13f),_0x5f47ce);}else{if(_0x486593[_0x4f9462(0x159)](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0xf4c9cb=String(RegExp['$1']),_0x2d0214=_0x2dcd77[_0x4f9462(0x2ed)](_0xf4c9cb,_0x4f9462(0x37a),0x1,_0x4f9462(0x28c));VisuMZ['SkillsStatesCore']['stateHpSlipHealJS'][_0x2144f9['id']]=new Function(_0x4f9462(0x13f),_0x2d0214);}}if(_0x486593[_0x4f9462(0x159)](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){const _0x5f38d2=String(RegExp['$1']),_0x29996d=_0x2dcd77[_0x4f9462(0x2ed)](_0x5f38d2,'damage',-0x1,_0x4f9462(0x404));VisuMZ[_0x4f9462(0x140)]['stateMpSlipDamageJS'][_0x2144f9['id']]=new Function(_0x4f9462(0x13f),_0x29996d);}else{if(_0x486593[_0x4f9462(0x159)](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){const _0x254f18=String(RegExp['$1']),_0x5b6245=_0x2dcd77[_0x4f9462(0x2ed)](_0x254f18,_0x4f9462(0x37a),0x1,_0x4f9462(0x404));VisuMZ['SkillsStatesCore'][_0x4f9462(0x36d)][_0x2144f9['id']]=new Function(_0x4f9462(0x13f),_0x5b6245);}}if(_0x486593[_0x4f9462(0x159)](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){const _0x27371b=String(RegExp['$1']),_0x18f90b=_0x2dcd77[_0x4f9462(0x2ed)](_0x27371b,_0x4f9462(0x2c8),-0x1,_0x4f9462(0x2db));VisuMZ[_0x4f9462(0x140)][_0x4f9462(0x312)][_0x2144f9['id']]=new Function(_0x4f9462(0x13f),_0x18f90b);}else{if(_0x486593['match'](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){const _0x423be2=String(RegExp['$1']),_0x13d2f3=_0x2dcd77['format'](_0x423be2,_0x4f9462(0x37a),0x1,_0x4f9462(0x2db));VisuMZ[_0x4f9462(0x140)][_0x4f9462(0x1a0)][_0x2144f9['id']]=new Function(_0x4f9462(0x13f),_0x13d2f3);}}},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x207)]={},VisuMZ['SkillsStatesCore'][_0x3a8e42(0x1e2)]={},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x3cd)]={},VisuMZ['SkillsStatesCore'][_0x3a8e42(0x27e)]=function(_0x5c345d){const _0x5d4cd0=_0x3a8e42,_0x1800bb=_0x5c345d[_0x5d4cd0(0x3ee)],_0x34308b=_0x5d4cd0(0x141);if(_0x1800bb['match'](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0x229091=String(RegExp['$1']),_0x481059=_0x34308b[_0x5d4cd0(0x2ed)](_0x229091);VisuMZ[_0x5d4cd0(0x140)][_0x5d4cd0(0x207)][_0x5c345d['id']]=new Function('stateId',_0x481059);}if(_0x1800bb['match'](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x5a5a1e=String(RegExp['$1']),_0x8bddbc=_0x34308b['format'](_0x5a5a1e);VisuMZ['SkillsStatesCore'][_0x5d4cd0(0x1e2)][_0x5c345d['id']]=new Function(_0x5d4cd0(0x13f),_0x8bddbc);}if(_0x1800bb[_0x5d4cd0(0x159)](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0x158972=String(RegExp['$1']),_0x1b863d=_0x34308b[_0x5d4cd0(0x2ed)](_0x158972);VisuMZ[_0x5d4cd0(0x140)][_0x5d4cd0(0x3cd)][_0x5c345d['id']]=new Function(_0x5d4cd0(0x13f),_0x1b863d);}},VisuMZ[_0x3a8e42(0x140)]['CheckIncompatibleStates']=function(){const _0x462127=_0x3a8e42;if(!VisuMZ[_0x462127(0x140)][_0x462127(0x319)][_0x462127(0x3b7)][_0x462127(0x248)])return;for(const _0x1f456f of $dataStates){if(!_0x1f456f)continue;_0x1f456f[_0x462127(0x3de)]===0x4&&_0x1f456f[_0x462127(0x3c4)]===0x1&&(_0x1f456f[_0x462127(0x3c4)]=0x2);}},VisuMZ[_0x3a8e42(0x140)]['createKeyJS']=function(_0x596900,_0x1263f1){const _0x397c86=_0x3a8e42;if(VisuMZ[_0x397c86(0x350)])return VisuMZ['createKeyJS'](_0x596900,_0x1263f1);let _0x415fe2='';if($dataActors[_0x397c86(0x328)](_0x596900))_0x415fe2=_0x397c86(0x1ec)['format'](_0x596900['id'],_0x1263f1);if($dataClasses[_0x397c86(0x328)](_0x596900))_0x415fe2=_0x397c86(0x34b)[_0x397c86(0x2ed)](_0x596900['id'],_0x1263f1);if($dataSkills[_0x397c86(0x328)](_0x596900))_0x415fe2=_0x397c86(0x2a6)[_0x397c86(0x2ed)](_0x596900['id'],_0x1263f1);if($dataItems[_0x397c86(0x328)](_0x596900))_0x415fe2=_0x397c86(0x3b6)[_0x397c86(0x2ed)](_0x596900['id'],_0x1263f1);if($dataWeapons[_0x397c86(0x328)](_0x596900))_0x415fe2=_0x397c86(0x211)[_0x397c86(0x2ed)](_0x596900['id'],_0x1263f1);if($dataArmors['includes'](_0x596900))_0x415fe2='Armor-%1-%2'[_0x397c86(0x2ed)](_0x596900['id'],_0x1263f1);if($dataEnemies[_0x397c86(0x328)](_0x596900))_0x415fe2=_0x397c86(0x145)[_0x397c86(0x2ed)](_0x596900['id'],_0x1263f1);if($dataStates[_0x397c86(0x328)](_0x596900))_0x415fe2=_0x397c86(0x194)[_0x397c86(0x2ed)](_0x596900['id'],_0x1263f1);return _0x415fe2;},DataManager[_0x3a8e42(0x3be)]=function(_0x3f07b4){const _0x1edbb8=_0x3a8e42;_0x3f07b4=_0x3f07b4[_0x1edbb8(0x3f4)]()[_0x1edbb8(0x217)](),this[_0x1edbb8(0x185)]=this['_classIDs']||{};if(this['_classIDs'][_0x3f07b4])return this[_0x1edbb8(0x185)][_0x3f07b4];for(const _0x5ca0b9 of $dataClasses){if(!_0x5ca0b9)continue;let _0x38e7fd=_0x5ca0b9[_0x1edbb8(0x20f)];_0x38e7fd=_0x38e7fd[_0x1edbb8(0x324)](/\x1I\[(\d+)\]/gi,''),_0x38e7fd=_0x38e7fd[_0x1edbb8(0x324)](/\\I\[(\d+)\]/gi,''),this['_classIDs'][_0x38e7fd['toUpperCase']()[_0x1edbb8(0x217)]()]=_0x5ca0b9['id'];}return this[_0x1edbb8(0x185)][_0x3f07b4]||0x0;},DataManager['getSkillTypes']=function(_0x247812){const _0x578e32=_0x3a8e42;this['_stypeIDs']=this[_0x578e32(0x2bb)]||{};if(this['_stypeIDs'][_0x247812['id']])return this[_0x578e32(0x2bb)][_0x247812['id']];this[_0x578e32(0x2bb)][_0x247812['id']]=[_0x247812[_0x578e32(0x21b)]];if(_0x247812[_0x578e32(0x3ee)][_0x578e32(0x159)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1e3c9c=JSON[_0x578e32(0x1b3)]('['+RegExp['$1'][_0x578e32(0x159)](/\d+/g)+']');this['_stypeIDs'][_0x247812['id']]=this[_0x578e32(0x2bb)][_0x247812['id']][_0x578e32(0x372)](_0x1e3c9c);}else{if(_0x247812[_0x578e32(0x3ee)][_0x578e32(0x159)](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x67685a=RegExp['$1'][_0x578e32(0x2e9)](',');for(const _0x1af6f1 of _0x67685a){const _0x5b6a35=DataManager[_0x578e32(0x147)](_0x1af6f1);if(_0x5b6a35)this['_stypeIDs'][_0x247812['id']][_0x578e32(0x2dd)](_0x5b6a35);}}}return this['_stypeIDs'][_0x247812['id']];},DataManager[_0x3a8e42(0x147)]=function(_0x5cf101){const _0x43ab55=_0x3a8e42;_0x5cf101=_0x5cf101[_0x43ab55(0x3f4)]()[_0x43ab55(0x217)](),this[_0x43ab55(0x2bb)]=this[_0x43ab55(0x2bb)]||{};if(this[_0x43ab55(0x2bb)][_0x5cf101])return this[_0x43ab55(0x2bb)][_0x5cf101];for(let _0x378676=0x1;_0x378676<0x64;_0x378676++){if(!$dataSystem[_0x43ab55(0x3c3)][_0x378676])continue;let _0x3ca12b=$dataSystem['skillTypes'][_0x378676][_0x43ab55(0x3f4)]()[_0x43ab55(0x217)]();_0x3ca12b=_0x3ca12b[_0x43ab55(0x324)](/\x1I\[(\d+)\]/gi,''),_0x3ca12b=_0x3ca12b[_0x43ab55(0x324)](/\\I\[(\d+)\]/gi,''),this[_0x43ab55(0x2bb)][_0x3ca12b]=_0x378676;}return this[_0x43ab55(0x2bb)][_0x5cf101]||0x0;},DataManager[_0x3a8e42(0x378)]=function(_0x3bfd17){const _0x11c4a2=_0x3a8e42;_0x3bfd17=_0x3bfd17['toUpperCase']()[_0x11c4a2(0x217)](),this[_0x11c4a2(0x331)]=this[_0x11c4a2(0x331)]||{};if(this[_0x11c4a2(0x331)][_0x3bfd17])return this['_skillIDs'][_0x3bfd17];for(const _0x279030 of $dataSkills){if(!_0x279030)continue;this[_0x11c4a2(0x331)][_0x279030[_0x11c4a2(0x20f)][_0x11c4a2(0x3f4)]()[_0x11c4a2(0x217)]()]=_0x279030['id'];}return this[_0x11c4a2(0x331)][_0x3bfd17]||0x0;},DataManager[_0x3a8e42(0x23e)]=function(_0xebb4f0){const _0x40fbab=_0x3a8e42;_0xebb4f0=_0xebb4f0[_0x40fbab(0x3f4)]()['trim'](),this[_0x40fbab(0x3bc)]=this[_0x40fbab(0x3bc)]||{};if(this['_stateIDs'][_0xebb4f0])return this[_0x40fbab(0x3bc)][_0xebb4f0];for(const _0x5a8cf4 of $dataStates){if(!_0x5a8cf4)continue;this[_0x40fbab(0x3bc)][_0x5a8cf4[_0x40fbab(0x20f)][_0x40fbab(0x3f4)]()[_0x40fbab(0x217)]()]=_0x5a8cf4['id'];}return this[_0x40fbab(0x3bc)][_0xebb4f0]||0x0;},DataManager[_0x3a8e42(0x2b5)]=function(_0xda174){const _0x53fbc2=_0x3a8e42;this['_stateMaxTurns']=this['_stateMaxTurns']||{};if(this[_0x53fbc2(0x3bd)][_0xda174])return this[_0x53fbc2(0x3bd)][_0xda174];return $dataStates[_0xda174][_0x53fbc2(0x3ee)][_0x53fbc2(0x159)](/<MAX TURNS:[ ](\d+)>/i)?this[_0x53fbc2(0x3bd)][_0xda174]=Number(RegExp['$1']):this[_0x53fbc2(0x3bd)][_0xda174]=VisuMZ['SkillsStatesCore']['Settings'][_0x53fbc2(0x3b7)][_0x53fbc2(0x229)],this['_stateMaxTurns'][_0xda174];},DataManager[_0x3a8e42(0x28d)]=function(_0x14a4e7){const _0x2f7322=_0x3a8e42;if(!_0x14a4e7)return{};this[_0x2f7322(0x2f6)]=this[_0x2f7322(0x2f6)]||{};if(this[_0x2f7322(0x2f6)][_0x14a4e7['id']]!==undefined)return this[_0x2f7322(0x2f6)][_0x14a4e7['id']];const _0x2c7421=_0x14a4e7[_0x2f7322(0x3ee)]||'',_0x11fac1={};{const _0x3766cd=_0x2c7421[_0x2f7322(0x159)](/<SKILL CHANGE(?:|S):[ ](.*)[ ]>>>[ ](.*)>/gi);if(_0x3766cd)for(const _0x6e4dc6 of _0x3766cd){_0x6e4dc6[_0x2f7322(0x159)](/<SKILL CHANGE(?:|S):[ ](.*)[ ]>>>[ ](.*)>/gi);let _0x15fbaa=String(RegExp['$1']),_0x3378bc=String(RegExp['$2']);VisuMZ[_0x2f7322(0x140)]['ParseSkillChangessIntoData'](_0x11fac1,_0x15fbaa,_0x3378bc);}}if(_0x2c7421[_0x2f7322(0x159)](/<SKILL CHANGE(?:|S)>\s*([\s\S]*)\s*<\/SKILL CHANGE(?:|S)>/i)){const _0x4ffb4c=String(RegExp['$1'])[_0x2f7322(0x2e9)](/[\r\n]+/)[_0x2f7322(0x170)]('');for(const _0x3038c1 of _0x4ffb4c){if(_0x3038c1[_0x2f7322(0x159)](/(.*)[ ]>>>[ ](.*)/i)){let _0xa8f051=String(RegExp['$1']),_0x4f18ae=String(RegExp['$2']);VisuMZ[_0x2f7322(0x140)][_0x2f7322(0x3c5)](_0x11fac1,_0xa8f051,_0x4f18ae);}}}return this[_0x2f7322(0x2f6)][_0x14a4e7['id']]=_0x11fac1,this[_0x2f7322(0x2f6)][_0x14a4e7['id']];},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x3c5)]=function(_0x510010,_0x3c8da9,_0x5f5b7d){const _0x2bb169=_0x3a8e42;/^\d+$/['test'](_0x3c8da9)?_0x3c8da9=Number(_0x3c8da9):_0x3c8da9=DataManager[_0x2bb169(0x378)](_0x3c8da9),/^\d+$/[_0x2bb169(0x3f9)](_0x5f5b7d)?_0x5f5b7d=Number(_0x5f5b7d):_0x5f5b7d=DataManager['getSkillIdWithName'](_0x5f5b7d),_0x510010[_0x3c8da9]=_0x5f5b7d;},ColorManager[_0x3a8e42(0x351)]=function(_0x3e99ab,_0x3952c3){const _0x1cbffe=_0x3a8e42;return _0x3952c3=String(_0x3952c3),this[_0x1cbffe(0x2a1)]=this[_0x1cbffe(0x2a1)]||{},_0x3952c3['match'](/#(.*)/i)?this['_colorCache'][_0x3e99ab]=_0x1cbffe(0x302)['format'](String(RegExp['$1'])):this[_0x1cbffe(0x2a1)][_0x3e99ab]=this[_0x1cbffe(0x1a7)](Number(_0x3952c3)),this[_0x1cbffe(0x2a1)][_0x3e99ab];},ColorManager['getColor']=function(_0x2758e5){const _0x516aa4=_0x3a8e42;return _0x2758e5=String(_0x2758e5),_0x2758e5['match'](/#(.*)/i)?_0x516aa4(0x302)['format'](String(RegExp['$1'])):this[_0x516aa4(0x1a7)](Number(_0x2758e5));},ColorManager['stateColor']=function(_0x4141e4){const _0x52dcf=_0x3a8e42;if(typeof _0x4141e4===_0x52dcf(0x254))_0x4141e4=$dataStates[_0x4141e4];const _0x1fafd4='_stored_state-%1-color'[_0x52dcf(0x2ed)](_0x4141e4['id']);this['_colorCache']=this[_0x52dcf(0x2a1)]||{};if(this[_0x52dcf(0x2a1)][_0x1fafd4])return this['_colorCache'][_0x1fafd4];const _0x173ba8=this[_0x52dcf(0x316)](_0x4141e4);return this[_0x52dcf(0x351)](_0x1fafd4,_0x173ba8);},ColorManager[_0x3a8e42(0x316)]=function(_0x1d2460){const _0x383d7e=_0x3a8e42,_0x12889f=_0x1d2460['note'];if(_0x12889f[_0x383d7e(0x159)](/<TURN COLOR:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x12889f['match'](/<POSITIVE STATE>/i))return VisuMZ[_0x383d7e(0x140)][_0x383d7e(0x319)][_0x383d7e(0x3b7)][_0x383d7e(0x2d7)];else return _0x12889f[_0x383d7e(0x159)](/<NEGATIVE STATE>/i)?VisuMZ[_0x383d7e(0x140)][_0x383d7e(0x319)][_0x383d7e(0x3b7)][_0x383d7e(0x278)]:VisuMZ[_0x383d7e(0x140)][_0x383d7e(0x319)][_0x383d7e(0x3b7)][_0x383d7e(0x1aa)];}},ColorManager[_0x3a8e42(0x366)]=function(){const _0x346541=_0x3a8e42,_0x1a5c9c=_0x346541(0x196);this[_0x346541(0x2a1)]=this['_colorCache']||{};if(this[_0x346541(0x2a1)][_0x1a5c9c])return this['_colorCache'][_0x1a5c9c];const _0x136a38=VisuMZ[_0x346541(0x140)][_0x346541(0x319)][_0x346541(0x31f)][_0x346541(0x3a4)];return this['getColorDataFromPluginParameters'](_0x1a5c9c,_0x136a38);},ColorManager[_0x3a8e42(0x28e)]=function(){const _0x139943=_0x3a8e42,_0x336622=_0x139943(0x33b);this[_0x139943(0x2a1)]=this[_0x139943(0x2a1)]||{};if(this['_colorCache'][_0x336622])return this[_0x139943(0x2a1)][_0x336622];const _0x16ed09=VisuMZ[_0x139943(0x140)]['Settings'][_0x139943(0x31f)][_0x139943(0x153)];return this[_0x139943(0x351)](_0x336622,_0x16ed09);},SceneManager[_0x3a8e42(0x30e)]=function(){const _0x439e49=_0x3a8e42;return this['_scene']&&this[_0x439e49(0x308)][_0x439e49(0x1d4)]===Scene_Battle;},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x29f)]=BattleManager['endAction'],BattleManager[_0x3a8e42(0x34c)]=function(){const _0x19b32f=_0x3a8e42;this['updateStatesActionEnd'](),VisuMZ[_0x19b32f(0x140)][_0x19b32f(0x29f)][_0x19b32f(0x371)](this);},BattleManager[_0x3a8e42(0x143)]=function(){const _0x357364=_0x3a8e42,_0x1cea76=VisuMZ[_0x357364(0x140)]['Settings']['States'];if(!_0x1cea76)return;if(_0x1cea76[_0x357364(0x248)]===![])return;if(!this[_0x357364(0x1f3)])return;this[_0x357364(0x1f3)][_0x357364(0x143)]();},Game_Battler['prototype'][_0x3a8e42(0x143)]=function(){const _0x1bb933=_0x3a8e42;if(BattleManager[_0x1bb933(0x224)]!=='action')return;if(this['_lastStatesActionEndFrameCount']===Graphics[_0x1bb933(0x21e)])return;this['_lastStatesActionEndFrameCount']=Graphics[_0x1bb933(0x21e)];for(const _0x30e60b of this[_0x1bb933(0x1db)]){const _0x2db547=$dataStates[_0x30e60b];if(!_0x2db547)continue;if(_0x2db547[_0x1bb933(0x3c4)]!==0x1)continue;this[_0x1bb933(0x2b1)][_0x30e60b]>0x0&&this['_stateTurns'][_0x30e60b]--;}this['removeStatesAuto'](0x1);},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x167)]=function(){const _0x38d635=_0x3a8e42,_0x2a4e0d=VisuMZ[_0x38d635(0x140)][_0x38d635(0x319)][_0x38d635(0x3b7)];for(const _0x33aef9 of this[_0x38d635(0x1db)]){const _0x2bf3e1=$dataStates[_0x33aef9];if(_0x2a4e0d&&_0x2a4e0d[_0x38d635(0x248)]!==![]){if(_0x2bf3e1&&_0x2bf3e1[_0x38d635(0x3c4)]===0x1)continue;}this[_0x38d635(0x2b1)][_0x33aef9]>0x0&&this[_0x38d635(0x2b1)][_0x33aef9]--;}},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x358)]=Game_Switches[_0x3a8e42(0x348)][_0x3a8e42(0x1ac)],Game_Switches[_0x3a8e42(0x348)][_0x3a8e42(0x1ac)]=function(){const _0x594b56=_0x3a8e42;VisuMZ[_0x594b56(0x140)][_0x594b56(0x358)]['call'](this);const _0x39114f=VisuMZ[_0x594b56(0x140)][_0x594b56(0x319)][_0x594b56(0x26b)]['RefreshCacheSwitch']??!![];if(!_0x39114f)return;if(SceneManager[_0x594b56(0x30e)]())for(const _0x20d720 of BattleManager[_0x594b56(0x356)]()){if(_0x20d720)_0x20d720['refresh']();}},VisuMZ[_0x3a8e42(0x140)]['Game_Variables_onChange']=Game_Variables[_0x3a8e42(0x348)][_0x3a8e42(0x1ac)],Game_Variables['prototype']['onChange']=function(){const _0x5b7edd=_0x3a8e42;VisuMZ[_0x5b7edd(0x140)][_0x5b7edd(0x2b6)][_0x5b7edd(0x371)](this);const _0x2cadc7=VisuMZ[_0x5b7edd(0x140)][_0x5b7edd(0x319)][_0x5b7edd(0x26b)]['RefreshCacheVar']??!![];if(!_0x2cadc7)return;if(SceneManager[_0x5b7edd(0x30e)]())for(const _0x294ef3 of BattleManager[_0x5b7edd(0x356)]()){if(_0x294ef3)_0x294ef3[_0x5b7edd(0x3dc)]();}},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x2e8)]=Game_Action[_0x3a8e42(0x348)][_0x3a8e42(0x1df)],Game_Action[_0x3a8e42(0x348)][_0x3a8e42(0x1df)]=function(_0x563fa0){const _0x2e932c=_0x3a8e42;VisuMZ['SkillsStatesCore'][_0x2e932c(0x2e8)][_0x2e932c(0x371)](this,_0x563fa0),this[_0x2e932c(0x3d6)](_0x563fa0);},Game_Action[_0x3a8e42(0x348)][_0x3a8e42(0x3d6)]=function(_0x1784df){const _0x1a20b4=_0x3a8e42;this[_0x1a20b4(0x1de)](_0x1784df),this[_0x1a20b4(0x394)](_0x1784df),this['applyBuffTurnManipulationEffects'](_0x1784df),this[_0x1a20b4(0x163)](_0x1784df);},VisuMZ[_0x3a8e42(0x140)]['Game_Action_testApply']=Game_Action[_0x3a8e42(0x348)]['testApply'],Game_Action[_0x3a8e42(0x348)][_0x3a8e42(0x374)]=function(_0x4ce81e){const _0x2ae0bf=_0x3a8e42;if(this[_0x2ae0bf(0x2a5)](_0x4ce81e))return!![];return VisuMZ[_0x2ae0bf(0x140)]['Game_Action_testApply'][_0x2ae0bf(0x371)](this,_0x4ce81e);},Game_Action[_0x3a8e42(0x348)][_0x3a8e42(0x2a5)]=function(_0x296ee2){const _0x4835cd=_0x3a8e42;if(!this[_0x4835cd(0x3c0)]())return;const _0x3e6b9e=this[_0x4835cd(0x3c0)]()[_0x4835cd(0x3ee)];if(_0x3e6b9e['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){const _0x38da93=String(RegExp['$1']);if(_0x296ee2['isStateCategoryAffected'](_0x38da93))return!![];}if(_0x3e6b9e[_0x4835cd(0x159)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){const _0x5da6df=Number(RegExp['$1']);if(_0x296ee2[_0x4835cd(0x2eb)](_0x5da6df))return!![];}else{if(_0x3e6b9e[_0x4835cd(0x159)](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){const _0x4b3fe6=DataManager[_0x4835cd(0x23e)](RegExp['$1']);if(_0x296ee2[_0x4835cd(0x2eb)](_0x4b3fe6))return!![];}}return![];},Game_Action[_0x3a8e42(0x348)][_0x3a8e42(0x1de)]=function(_0x6676a2){const _0x10c744=_0x3a8e42;if(_0x6676a2[_0x10c744(0x182)]()[_0x10c744(0x231)]<=0x0)return;const _0x73668c=this[_0x10c744(0x3c0)]()[_0x10c744(0x3ee)];{const _0x28e600=_0x73668c[_0x10c744(0x159)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/gi);if(_0x28e600)for(const _0x2cb622 of _0x28e600){_0x2cb622[_0x10c744(0x159)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0x357ada=String(RegExp['$1']);_0x6676a2[_0x10c744(0x3a5)](_0x357ada);}}{const _0x5cbb1c=_0x73668c[_0x10c744(0x159)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x5cbb1c)for(const _0x1bb896 of _0x5cbb1c){_0x1bb896[_0x10c744(0x159)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x115407=String(RegExp['$1']),_0x318e6d=Number(RegExp['$2']);_0x6676a2['removeStatesByCategory'](_0x115407,_0x318e6d);}}},Game_Action[_0x3a8e42(0x348)][_0x3a8e42(0x394)]=function(_0x48101c){const _0x371df7=_0x3a8e42,_0x1c774d=this['item']()['note'],_0x4c2b87=_0x1c774d[_0x371df7(0x159)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x4c2b87)for(const _0xa5133b of _0x4c2b87){let _0x2bb496=0x0,_0xc317a0=0x0;if(_0xa5133b[_0x371df7(0x159)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x2bb496=Number(RegExp['$1']),_0xc317a0=Number(RegExp['$2']);else _0xa5133b[_0x371df7(0x159)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x2bb496=DataManager[_0x371df7(0x23e)](RegExp['$1']),_0xc317a0=Number(RegExp['$2']));_0x48101c[_0x371df7(0x2f9)](_0x2bb496,_0xc317a0),this[_0x371df7(0x32e)](_0x48101c);}const _0x323d0c=_0x1c774d[_0x371df7(0x159)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x323d0c)for(const _0x19eea2 of _0x323d0c){let _0x5ecbb2=0x0,_0x57238c=0x0;if(_0x19eea2[_0x371df7(0x159)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x5ecbb2=Number(RegExp['$1']),_0x57238c=Number(RegExp['$2']);else _0x19eea2[_0x371df7(0x159)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x5ecbb2=DataManager[_0x371df7(0x23e)](RegExp['$1']),_0x57238c=Number(RegExp['$2']));_0x48101c[_0x371df7(0x2d6)](_0x5ecbb2,_0x57238c),this['makeSuccess'](_0x48101c);}},Game_Action[_0x3a8e42(0x348)]['applyBuffTurnManipulationEffects']=function(_0x2018fd){const _0x33249d=_0x3a8e42,_0x3dc7b8=[_0x33249d(0x2af),'MAXMP',_0x33249d(0x388),'DEF',_0x33249d(0x271),_0x33249d(0x198),_0x33249d(0x16e),_0x33249d(0x1cb)],_0x5f3256=this['item']()[_0x33249d(0x3ee)],_0x2c55ee=_0x5f3256[_0x33249d(0x159)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x2c55ee)for(const _0x1a05f9 of _0x2c55ee){_0x1a05f9[_0x33249d(0x159)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x104c63=_0x3dc7b8['indexOf'](String(RegExp['$1'])[_0x33249d(0x3f4)]()),_0x67db84=Number(RegExp['$2']);_0x104c63>=0x0&&(_0x2018fd[_0x33249d(0x14e)](_0x104c63,_0x67db84),this[_0x33249d(0x32e)](_0x2018fd));}const _0x3229f8=_0x5f3256[_0x33249d(0x159)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x3229f8)for(const _0x2c98b4 of _0x2c55ee){_0x2c98b4[_0x33249d(0x159)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x3400eb=_0x3dc7b8[_0x33249d(0x3d5)](String(RegExp['$1'])[_0x33249d(0x3f4)]()),_0xc58013=Number(RegExp['$2']);_0x3400eb>=0x0&&(_0x2018fd['addBuffTurns'](_0x3400eb,_0xc58013),this[_0x33249d(0x32e)](_0x2018fd));}},Game_Action['prototype'][_0x3a8e42(0x163)]=function(_0x4c67c7){const _0x58f3c6=_0x3a8e42,_0x4ef40d=[_0x58f3c6(0x2af),_0x58f3c6(0x344),'ATK','DEF',_0x58f3c6(0x271),_0x58f3c6(0x198),'AGI','LUK'],_0x2654de=this[_0x58f3c6(0x3c0)]()[_0x58f3c6(0x3ee)],_0x421568=_0x2654de[_0x58f3c6(0x159)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x421568)for(const _0x5c0615 of _0x421568){_0x5c0615[_0x58f3c6(0x159)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x5a90f8=_0x4ef40d['indexOf'](String(RegExp['$1'])[_0x58f3c6(0x3f4)]()),_0x31e772=Number(RegExp['$2']);_0x5a90f8>=0x0&&(_0x4c67c7[_0x58f3c6(0x1ae)](_0x5a90f8,_0x31e772),this[_0x58f3c6(0x32e)](_0x4c67c7));}const _0xcaa78a=_0x2654de[_0x58f3c6(0x159)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0xcaa78a)for(const _0x5c0c40 of _0x421568){_0x5c0c40[_0x58f3c6(0x159)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x585076=_0x4ef40d['indexOf'](String(RegExp['$1'])['toUpperCase']()),_0x3a2de6=Number(RegExp['$2']);_0x585076>=0x0&&(_0x4c67c7[_0x58f3c6(0x414)](_0x585076,_0x3a2de6),this[_0x58f3c6(0x32e)](_0x4c67c7));}},VisuMZ['SkillsStatesCore'][_0x3a8e42(0x369)]=Game_BattlerBase[_0x3a8e42(0x348)]['initMembers'],Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x33c)]=function(){const _0x2066ef=_0x3a8e42;this['_cache']={},this[_0x2066ef(0x189)](),VisuMZ[_0x2066ef(0x140)][_0x2066ef(0x369)]['call'](this);},Game_BattlerBase[_0x3a8e42(0x348)]['initMembersSkillsStatesCore']=function(){const _0x39c222=_0x3a8e42;this[_0x39c222(0x320)]='',this[_0x39c222(0x3a9)]={},this[_0x39c222(0x27f)]={},this['_stateOrigin']={};},Game_BattlerBase['prototype']['checkCacheKey']=function(_0x17ec64){const _0x1cdcf8=_0x3a8e42;return this[_0x1cdcf8(0x15e)]=this[_0x1cdcf8(0x15e)]||{},this[_0x1cdcf8(0x15e)][_0x17ec64]!==undefined;},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x407)]=Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x3dc)],Game_BattlerBase[_0x3a8e42(0x348)]['refresh']=function(){const _0x5eeed3=_0x3a8e42;this[_0x5eeed3(0x15e)]={},VisuMZ[_0x5eeed3(0x140)][_0x5eeed3(0x407)][_0x5eeed3(0x371)](this);},VisuMZ['SkillsStatesCore'][_0x3a8e42(0x34a)]=Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x3d8)],Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x3d8)]=function(_0x570e87){const _0x23a578=_0x3a8e42;let _0x26d3f0=this[_0x23a578(0x2eb)](_0x570e87);VisuMZ[_0x23a578(0x140)][_0x23a578(0x34a)]['call'](this,_0x570e87);if(_0x26d3f0&&!this[_0x23a578(0x2eb)](_0x570e87))this[_0x23a578(0x3e0)](_0x570e87);},Game_BattlerBase['prototype'][_0x3a8e42(0x3e0)]=function(_0x43c782){const _0x57ded6=_0x3a8e42;this[_0x57ded6(0x14f)](_0x43c782),this[_0x57ded6(0x336)](_0x43c782);},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x220)]=Game_Battler[_0x3a8e42(0x348)]['onBattleEnd'],Game_Battler[_0x3a8e42(0x348)][_0x3a8e42(0x1fc)]=function(){const _0x322c78=_0x3a8e42;VisuMZ[_0x322c78(0x140)][_0x322c78(0x220)][_0x322c78(0x371)](this),this['clearAllStateOrigins']();},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x3ff)]=Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x3ba)],Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x3ba)]=function(_0xfe7f28){const _0x2565bb=_0x3a8e42,_0x271014=$dataStates[_0xfe7f28],_0x518645=this[_0x2565bb(0x323)](_0xfe7f28),_0x3b236b=this[_0x2565bb(0x18c)](_0x271014)[_0x2565bb(0x3f5)]()['trim']();switch(_0x3b236b){case _0x2565bb(0x2fa):if(_0x518645<=0x0)this[_0x2565bb(0x2c3)](_0xfe7f28);break;case _0x2565bb(0x301):this[_0x2565bb(0x2c3)](_0xfe7f28);break;case _0x2565bb(0x1d3):this[_0x2565bb(0x2c3)](_0xfe7f28),this[_0x2565bb(0x2b1)][_0xfe7f28]=Math['max'](this[_0x2565bb(0x2b1)][_0xfe7f28],_0x518645);break;case'add':this[_0x2565bb(0x2c3)](_0xfe7f28),this['_stateTurns'][_0xfe7f28]+=_0x518645;break;default:this[_0x2565bb(0x2c3)](_0xfe7f28);break;}if(this[_0x2565bb(0x2eb)](_0xfe7f28)){const _0x317f99=DataManager[_0x2565bb(0x2b5)](_0xfe7f28);this[_0x2565bb(0x2b1)][_0xfe7f28]=this[_0x2565bb(0x2b1)][_0xfe7f28][_0x2565bb(0x215)](0x0,_0x317f99);}},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x2c3)]=function(_0x158a1d){const _0x1a2195=_0x3a8e42;VisuMZ[_0x1a2195(0x140)]['Game_BattlerBase_resetStateCounts'][_0x1a2195(0x371)](this,_0x158a1d);},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x18c)]=function(_0x2eafe6){const _0x8874d1=_0x3a8e42,_0x488e33=_0x2eafe6[_0x8874d1(0x3ee)];return _0x488e33[_0x8874d1(0x159)](/<REAPPLY RULES:[ ](.*)>/i)?String(RegExp['$1']):VisuMZ['SkillsStatesCore'][_0x8874d1(0x319)]['States']['ReapplyRules'];},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x22b)]=Game_BattlerBase[_0x3a8e42(0x348)]['overwriteBuffTurns'],Game_BattlerBase['prototype'][_0x3a8e42(0x272)]=function(_0x6acefb,_0x358ad1){const _0x5628c1=_0x3a8e42,_0x49feb6=VisuMZ[_0x5628c1(0x140)][_0x5628c1(0x319)]['Buffs'][_0x5628c1(0x18b)],_0x5b6204=this['buffTurns'](_0x6acefb);switch(_0x49feb6){case _0x5628c1(0x2fa):if(_0x5b6204<=0x0)this['_buffTurns'][_0x6acefb]=_0x358ad1;break;case _0x5628c1(0x301):this[_0x5628c1(0x177)][_0x6acefb]=_0x358ad1;break;case _0x5628c1(0x1d3):this[_0x5628c1(0x177)][_0x6acefb]=Math[_0x5628c1(0x171)](_0x5b6204,_0x358ad1);break;case _0x5628c1(0x17b):this[_0x5628c1(0x177)][_0x6acefb]+=_0x358ad1;break;default:VisuMZ[_0x5628c1(0x140)][_0x5628c1(0x22b)][_0x5628c1(0x371)](this,_0x6acefb,_0x358ad1);break;}const _0x18bcd0=VisuMZ[_0x5628c1(0x140)][_0x5628c1(0x319)][_0x5628c1(0x31f)][_0x5628c1(0x229)];this[_0x5628c1(0x177)][_0x6acefb]=this[_0x5628c1(0x177)][_0x6acefb][_0x5628c1(0x215)](0x0,_0x18bcd0);},Game_BattlerBase['prototype'][_0x3a8e42(0x36b)]=function(){const _0x530965=_0x3a8e42;if(this[_0x530965(0x15e)][_0x530965(0x247)]!==undefined)return this[_0x530965(0x15e)][_0x530965(0x247)];this[_0x530965(0x15e)][_0x530965(0x247)]=![];const _0x274b45=this['states']();for(const _0x5424b7 of _0x274b45){if(!_0x5424b7)continue;if(_0x5424b7[_0x530965(0x3ee)]['match'](/<GROUP DEFEAT>/i)){this['_cache'][_0x530965(0x247)]=!![];break;}}return this['_cache'][_0x530965(0x247)];},VisuMZ['SkillsStatesCore'][_0x3a8e42(0x1d8)]=Game_Unit['prototype']['deadMembers'],Game_Unit[_0x3a8e42(0x348)]['deadMembers']=function(){const _0x4c43e7=_0x3a8e42;let _0x22d6b5=VisuMZ[_0x4c43e7(0x140)][_0x4c43e7(0x1d8)][_0x4c43e7(0x371)](this);return BattleManager[_0x4c43e7(0x376)]&&(_0x22d6b5=_0x22d6b5[_0x4c43e7(0x372)](this[_0x4c43e7(0x222)]()['filter'](_0x346adc=>_0x346adc[_0x4c43e7(0x36b)]()))),_0x22d6b5;},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x243)]=Game_BattlerBase['prototype'][_0x3a8e42(0x245)],Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x245)]=function(){const _0x261327=_0x3a8e42;this['getStateRetainType']()!==''?this[_0x261327(0x226)]():(VisuMZ[_0x261327(0x140)][_0x261327(0x243)]['call'](this),this[_0x261327(0x189)]());},Game_Actor[_0x3a8e42(0x348)][_0x3a8e42(0x245)]=function(){const _0x3d0ecf=_0x3a8e42;this[_0x3d0ecf(0x3b4)]=this[_0x3d0ecf(0x3b4)]||{},Game_Battler[_0x3d0ecf(0x348)][_0x3d0ecf(0x245)][_0x3d0ecf(0x371)](this);},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x226)]=function(){const _0x4a1fb3=_0x3a8e42,_0x357051=this[_0x4a1fb3(0x182)]();for(const _0x293b4a of _0x357051){if(_0x293b4a&&this[_0x4a1fb3(0x33d)](_0x293b4a))this[_0x4a1fb3(0x3d8)](_0x293b4a['id']);}this[_0x4a1fb3(0x15e)]={};},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x33d)]=function(_0x291e5c){const _0xb6b095=_0x3a8e42,_0x172c8e=this[_0xb6b095(0x218)]();if(_0x172c8e!==''){const _0xd7aeb6=_0x291e5c[_0xb6b095(0x3ee)];if(_0x172c8e===_0xb6b095(0x19c)&&_0xd7aeb6[_0xb6b095(0x159)](/<NO DEATH CLEAR>/i))return![];if(_0x172c8e===_0xb6b095(0x2ec)&&_0xd7aeb6['match'](/<NO RECOVER ALL CLEAR>/i))return![];}return this[_0xb6b095(0x2eb)](_0x291e5c['id']);},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x218)]=function(){const _0x119d6f=_0x3a8e42;return this[_0x119d6f(0x320)];},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x346)]=function(_0x33d932){this['_stateRetainType']=_0x33d932;},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x35f)]=function(){const _0x1a5ffa=_0x3a8e42;this[_0x1a5ffa(0x320)]='';},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x39e)]=Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x3c1)],Game_BattlerBase['prototype']['die']=function(){const _0x3209d0=_0x3a8e42;this['setStateRetainType'](_0x3209d0(0x19c)),VisuMZ['SkillsStatesCore'][_0x3209d0(0x39e)][_0x3209d0(0x371)](this),this[_0x3209d0(0x35f)]();},VisuMZ[_0x3a8e42(0x140)]['Game_BattlerBase_recoverAll']=Game_BattlerBase[_0x3a8e42(0x348)]['recoverAll'],Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x412)]=function(){const _0x1cf80d=_0x3a8e42;this[_0x1cf80d(0x346)]('recover\x20all'),VisuMZ[_0x1cf80d(0x140)][_0x1cf80d(0x40c)][_0x1cf80d(0x371)](this),this['clearStateRetainType']();},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x1da)]=function(_0x418b80,_0x1f1d38,_0x3a489f){return _0x1f1d38;},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x2ab)]=function(_0x29bb55){const _0x621a59=_0x3a8e42;for(settings of VisuMZ['SkillsStatesCore'][_0x621a59(0x319)][_0x621a59(0x353)]){let _0x532d19=settings[_0x621a59(0x221)]['call'](this,_0x29bb55);_0x532d19=this[_0x621a59(0x1da)](_0x29bb55,_0x532d19,settings);if(!settings[_0x621a59(0x213)][_0x621a59(0x371)](this,_0x29bb55,_0x532d19))return![];}return!![];},Game_BattlerBase['prototype']['paySkillCost']=function(_0x4211b8){const _0x2f1908=_0x3a8e42;for(settings of VisuMZ['SkillsStatesCore'][_0x2f1908(0x319)][_0x2f1908(0x353)]){let _0x3c5ba1=settings['CalcJS'][_0x2f1908(0x371)](this,_0x4211b8);_0x3c5ba1=this['adjustSkillCost'](_0x4211b8,_0x3c5ba1,settings),settings[_0x2f1908(0x3d0)]['call'](this,_0x4211b8,_0x3c5ba1);}},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x2bd)]=Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x2dc)],Game_BattlerBase['prototype'][_0x3a8e42(0x2dc)]=function(_0x2773df){const _0x4cb7f7=_0x3a8e42;if(!_0x2773df)return![];if(!VisuMZ[_0x4cb7f7(0x140)][_0x4cb7f7(0x2bd)]['call'](this,_0x2773df))return![];if(!this['checkSkillConditionsNotetags'](_0x2773df))return![];if(!this['meetsSkillConditionsEnableJS'](_0x2773df))return![];if(!this[_0x4cb7f7(0x20d)](_0x2773df))return![];return!![];},Game_BattlerBase['prototype']['checkSkillConditionsNotetags']=function(_0xb46c2b){const _0x11f754=_0x3a8e42;if(!this[_0x11f754(0x205)](_0xb46c2b))return![];return!![];},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x205)]=function(_0x1769f2){const _0x2d7968=_0x3a8e42,_0x5b87eb=_0x1769f2[_0x2d7968(0x3ee)];if(_0x5b87eb[_0x2d7968(0x159)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x14300d=JSON['parse']('['+RegExp['$1'][_0x2d7968(0x159)](/\d+/g)+']');for(const _0x2f38b8 of _0x14300d){if(!$gameSwitches['value'](_0x2f38b8))return![];}return!![];}if(_0x5b87eb[_0x2d7968(0x159)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x10ab59=JSON[_0x2d7968(0x1b3)]('['+RegExp['$1'][_0x2d7968(0x159)](/\d+/g)+']');for(const _0x4821e6 of _0x10ab59){if(!$gameSwitches['value'](_0x4821e6))return![];}return!![];}if(_0x5b87eb['match'](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x30c94c=JSON[_0x2d7968(0x1b3)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x4dbd78 of _0x30c94c){if($gameSwitches[_0x2d7968(0x36c)](_0x4dbd78))return!![];}return![];}if(_0x5b87eb[_0x2d7968(0x159)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x19f6a6=JSON[_0x2d7968(0x1b3)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x4a2fb6 of _0x19f6a6){if(!$gameSwitches[_0x2d7968(0x36c)](_0x4a2fb6))return!![];}return![];}if(_0x5b87eb[_0x2d7968(0x159)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x546179=JSON[_0x2d7968(0x1b3)]('['+RegExp['$1'][_0x2d7968(0x159)](/\d+/g)+']');for(const _0x25e278 of _0x546179){if(!$gameSwitches[_0x2d7968(0x36c)](_0x25e278))return!![];}return![];}if(_0x5b87eb[_0x2d7968(0x159)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1e20a9=JSON[_0x2d7968(0x1b3)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x4c02ba of _0x1e20a9){if($gameSwitches[_0x2d7968(0x36c)](_0x4c02ba))return![];}return!![];}return!![];},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x34d)]=function(_0x38c6ab){const _0x2747b9=_0x3a8e42,_0x4c57dd=_0x38c6ab[_0x2747b9(0x3ee)],_0x24665f=VisuMZ[_0x2747b9(0x140)][_0x2747b9(0x2df)];return _0x24665f[_0x38c6ab['id']]?_0x24665f[_0x38c6ab['id']]['call'](this,_0x38c6ab):!![];},Game_BattlerBase[_0x3a8e42(0x348)]['meetsSkillConditionsGlobalJS']=function(_0x1c9afb){const _0x2de4db=_0x3a8e42;return VisuMZ[_0x2de4db(0x140)][_0x2de4db(0x319)][_0x2de4db(0x37e)][_0x2de4db(0x144)][_0x2de4db(0x371)](this,_0x1c9afb);},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x23a)]=Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x2c4)],Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x2c4)]=function(_0x131d6b){const _0x502618=_0x3a8e42;for(settings of VisuMZ[_0x502618(0x140)][_0x502618(0x319)][_0x502618(0x353)]){if(settings[_0x502618(0x2f5)]['toUpperCase']()==='MP'){let _0x47dac3=settings[_0x502618(0x221)][_0x502618(0x371)](this,_0x131d6b);return _0x47dac3=this[_0x502618(0x1da)](_0x131d6b,_0x47dac3,settings),_0x47dac3;}}return VisuMZ[_0x502618(0x140)][_0x502618(0x23a)][_0x502618(0x371)](this,_0x131d6b);},VisuMZ['SkillsStatesCore'][_0x3a8e42(0x262)]=Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x3ad)],Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x3ad)]=function(_0x21ce97){const _0x41ff0f=_0x3a8e42;for(settings of VisuMZ[_0x41ff0f(0x140)][_0x41ff0f(0x319)][_0x41ff0f(0x353)]){if(settings['Name'][_0x41ff0f(0x3f4)]()==='TP'){let _0xa9b0c1=settings['CalcJS']['call'](this,_0x21ce97);return _0xa9b0c1=this[_0x41ff0f(0x1da)](_0x21ce97,_0xa9b0c1,settings),_0xa9b0c1;}}return VisuMZ['SkillsStatesCore'][_0x41ff0f(0x262)][_0x41ff0f(0x371)](this,_0x21ce97);},Game_BattlerBase[_0x3a8e42(0x348)]['hasState']=function(_0x47bdcf){const _0x482db0=_0x3a8e42;if(typeof _0x47bdcf===_0x482db0(0x254))_0x47bdcf=$dataStates[_0x47bdcf];return this[_0x482db0(0x182)]()[_0x482db0(0x328)](_0x47bdcf);},VisuMZ[_0x3a8e42(0x140)]['Game_BattlerBase_states']=Game_BattlerBase[_0x3a8e42(0x348)]['states'],Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x182)]=function(){const _0x395990=_0x3a8e42;let _0x584b98=VisuMZ['SkillsStatesCore'][_0x395990(0x188)]['call'](this);if($gameTemp['_checkingPassiveStates'])return _0x584b98;return $gameTemp[_0x395990(0x3a6)]=!![],this[_0x395990(0x23d)](_0x584b98),$gameTemp[_0x395990(0x3a6)]=undefined,_0x584b98;},Game_BattlerBase[_0x3a8e42(0x348)]['addPassiveStates']=function(_0x58b6ca){const _0x45950a=_0x3a8e42,_0x50adf1=this['passiveStates']();for(state of _0x50adf1){if(!state)continue;if(!this[_0x45950a(0x40a)](state)&&_0x58b6ca[_0x45950a(0x328)](state))continue;_0x58b6ca[_0x45950a(0x2dd)](state);}_0x50adf1[_0x45950a(0x231)]>0x0&&_0x58b6ca[_0x45950a(0x408)]((_0xcb8afb,_0x41bfcd)=>{const _0x53fdbe=_0x45950a,_0x1bae37=_0xcb8afb[_0x53fdbe(0x40e)],_0x546e04=_0x41bfcd[_0x53fdbe(0x40e)];if(_0x1bae37!==_0x546e04)return _0x546e04-_0x1bae37;return _0xcb8afb-_0x41bfcd;});},Game_BattlerBase['prototype'][_0x3a8e42(0x40a)]=function(_0x1ca359){const _0x2a409e=_0x3a8e42;return _0x1ca359['note'][_0x2a409e(0x159)](/<PASSIVE STACKABLE>/i);},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x3ab)]=Game_BattlerBase[_0x3a8e42(0x348)]['traitsSet'],Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x368)]=function(_0x10e477){const _0x589087=_0x3a8e42;this[_0x589087(0x2e0)]=!![];let _0x5adaca=VisuMZ['SkillsStatesCore']['Game_BattlerBase_traitsSet'][_0x589087(0x371)](this,_0x10e477);return this[_0x589087(0x2e0)]=undefined,_0x5adaca;},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x1bd)]=function(){const _0x4a6a79=_0x3a8e42;let _0x3fea44=[];this[_0x4a6a79(0x3fb)]=this[_0x4a6a79(0x3fb)]||{};for(;;){_0x3fea44=[];let _0x3f40ea=!![];for(const _0x245334 of this[_0x4a6a79(0x15e)][_0x4a6a79(0x3eb)]){const _0x1fb354=$dataStates[_0x245334];if(!_0x1fb354)continue;let _0x3c9b75=this[_0x4a6a79(0x1b4)](_0x1fb354);this['_passiveStateResults'][_0x245334]!==_0x3c9b75&&(_0x3f40ea=![],this[_0x4a6a79(0x3fb)][_0x245334]=_0x3c9b75);if(!_0x3c9b75)continue;_0x3fea44[_0x4a6a79(0x2dd)](_0x1fb354);}if(_0x3f40ea)break;else{if(!this[_0x4a6a79(0x2e0)])this[_0x4a6a79(0x3dc)]();this['createPassiveStatesCache']();}}return _0x3fea44;},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x1b4)]=function(_0x1a093b){const _0x36a774=_0x3a8e42;if(!this[_0x36a774(0x383)](_0x1a093b))return![];if(!this['meetsPassiveStateConditionSwitches'](_0x1a093b))return![];if(!this[_0x36a774(0x1ff)](_0x1a093b))return![];if(!this[_0x36a774(0x2cc)](_0x1a093b))return![];return!![];},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x383)]=function(_0xe15c6){return!![];},Game_Actor[_0x3a8e42(0x348)][_0x3a8e42(0x383)]=function(_0x4f7af6){const _0x253899=_0x3a8e42,_0x118a16=DataManager['getPassiveStateConditionClassesData'](_0x4f7af6);if(_0x118a16['currentClass'][_0x253899(0x231)]>0x0){const _0x33458e=_0x118a16[_0x253899(0x212)];if(!_0x33458e[_0x253899(0x328)](this[_0x253899(0x212)]()))return![];}if(_0x118a16[_0x253899(0x332)][_0x253899(0x231)]>0x0){const _0x31e6a8=_0x118a16[_0x253899(0x332)];let _0x3deef0=[this['currentClass']()];Imported['VisuMZ_2_ClassChangeSystem']&&this[_0x253899(0x2f3)]&&(_0x3deef0=this[_0x253899(0x2f3)]());if(_0x31e6a8[_0x253899(0x164)](_0x38f631=>_0x3deef0[_0x253899(0x328)](_0x38f631))[_0x253899(0x231)]<=0x0)return![];}return Game_BattlerBase['prototype'][_0x253899(0x383)]['call'](this,_0x4f7af6);},DataManager[_0x3a8e42(0x37b)]=function(_0x33b77b){const _0x293ae5=_0x3a8e42,_0x1a477a={'currentClass':[],'multiClass':[]};if(!_0x33b77b)return _0x1a477a;this[_0x293ae5(0x30a)]=this[_0x293ae5(0x30a)]||{};if(this[_0x293ae5(0x30a)][_0x33b77b['id']]!==undefined)return this[_0x293ae5(0x30a)][_0x33b77b['id']];const _0x34e527=_0x33b77b[_0x293ae5(0x3ee)]||'';if(_0x34e527[_0x293ae5(0x159)](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0x4824a1=String(RegExp['$1'])[_0x293ae5(0x2e9)](',')[_0x293ae5(0x1ef)](_0x43e199=>_0x43e199[_0x293ae5(0x217)]());_0x1a477a['currentClass']=VisuMZ[_0x293ae5(0x140)][_0x293ae5(0x3c2)](_0x4824a1);}if(_0x34e527[_0x293ae5(0x159)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){const _0x7073cc=String(RegExp['$1'])['split'](',')['map'](_0x140872=>_0x140872[_0x293ae5(0x217)]());_0x1a477a['multiClass']=VisuMZ['SkillsStatesCore'][_0x293ae5(0x3c2)](_0x7073cc);}return this[_0x293ae5(0x30a)][_0x33b77b['id']]=_0x1a477a,this[_0x293ae5(0x30a)][_0x33b77b['id']];},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x3c2)]=function(_0x361621){const _0x3dc7ee=_0x3a8e42,_0x3188bd=[];for(let _0x33a9a2 of _0x361621){_0x33a9a2=(String(_0x33a9a2)||'')[_0x3dc7ee(0x217)]();const _0x5d0c43=/^\d+$/[_0x3dc7ee(0x3f9)](_0x33a9a2);_0x5d0c43?_0x3188bd[_0x3dc7ee(0x2dd)](Number(_0x33a9a2)):_0x3188bd[_0x3dc7ee(0x2dd)](DataManager[_0x3dc7ee(0x3be)](_0x33a9a2));}return _0x3188bd['map'](_0x134264=>$dataClasses[Number(_0x134264)])[_0x3dc7ee(0x170)](null);},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x385)]=function(_0xcbfcb2){const _0x3f9e92=_0x3a8e42,_0x16fd1b=DataManager[_0x3f9e92(0x15d)](_0xcbfcb2);if(_0x16fd1b['allSwitchOn']&&_0x16fd1b['allSwitchOn'][_0x3f9e92(0x231)]>0x0){const _0x589c17=_0x16fd1b[_0x3f9e92(0x1c7)];for(const _0x1ecd00 of _0x589c17){if(!$gameSwitches[_0x3f9e92(0x36c)](_0x1ecd00))return![];}}if(_0x16fd1b[_0x3f9e92(0x398)]&&_0x16fd1b['anySwitchOn'][_0x3f9e92(0x231)]>0x0){const _0x739082=_0x16fd1b[_0x3f9e92(0x398)];let _0x39fabe=!![];for(const _0x57d3db of _0x739082){if($gameSwitches[_0x3f9e92(0x36c)](_0x57d3db)){_0x39fabe=![];break;}}if(_0x39fabe)return![];}if(_0x16fd1b[_0x3f9e92(0x2c7)]&&_0x16fd1b['allSwitchOff'][_0x3f9e92(0x231)]>0x0){const _0x278462=_0x16fd1b['allSwitchOff'];for(const _0x31a580 of _0x278462){if($gameSwitches['value'](_0x31a580))return![];}}if(_0x16fd1b[_0x3f9e92(0x329)]&&_0x16fd1b[_0x3f9e92(0x329)][_0x3f9e92(0x231)]>0x0){const _0x3c25e4=_0x16fd1b['anySwitchOff'];let _0x22aa90=!![];for(const _0x22783d of _0x3c25e4){if(!$gameSwitches[_0x3f9e92(0x36c)](_0x22783d)){_0x22aa90=![];break;}}if(_0x22aa90)return![];}return!![];},DataManager[_0x3a8e42(0x15d)]=function(_0x3869de){const _0x21ae18=_0x3a8e42;let _0x3e3a22={'allSwitchOn':[],'anySwitchOn':[],'allSwitchOff':[],'anySwitchOff':[]};if(!_0x3869de)return _0x3e3a22;const _0x3c2c48=_0x3869de['id'];this[_0x21ae18(0x18f)]=this['_cache_getPassiveStateConditionSwitchData']||{};if(this[_0x21ae18(0x18f)][_0x3c2c48]!==undefined)return this[_0x21ae18(0x18f)][_0x3c2c48];const _0x32d80d=_0x3869de[_0x21ae18(0x3ee)]||'';return _0x32d80d[_0x21ae18(0x159)](/PASSIVE CONDITION(?:| ALL)[ ](?:SWITCH|SWITCHES)[ ]ON:[ ](.*)>/i)&&(_0x3e3a22[_0x21ae18(0x1c7)]=String(RegExp['$1'])[_0x21ae18(0x2e9)](',')[_0x21ae18(0x1ef)](_0x4a47fb=>Number(_0x4a47fb))),_0x32d80d[_0x21ae18(0x159)](/PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ](.*)>/i)&&(_0x3e3a22[_0x21ae18(0x398)]=String(RegExp['$1'])['split'](',')[_0x21ae18(0x1ef)](_0x40cdc9=>Number(_0x40cdc9))),_0x32d80d[_0x21ae18(0x159)](/PASSIVE CONDITION(?:| ALL)[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ](.*)>/i)&&(_0x3e3a22[_0x21ae18(0x2c7)]=String(RegExp['$1'])[_0x21ae18(0x2e9)](',')['map'](_0x228ab4=>Number(_0x228ab4))),_0x32d80d['match'](/PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ](.*)>/i)&&(_0x3e3a22[_0x21ae18(0x329)]=String(RegExp['$1'])[_0x21ae18(0x2e9)](',')[_0x21ae18(0x1ef)](_0x2e252c=>Number(_0x2e252c))),this[_0x21ae18(0x18f)][_0x3c2c48]=_0x3e3a22,this[_0x21ae18(0x18f)][_0x3c2c48];},Game_BattlerBase[_0x3a8e42(0x348)]['meetsPassiveStateConditionJS']=function(_0x17d332){const _0x5844b6=_0x3a8e42,_0x261182=VisuMZ[_0x5844b6(0x140)]['statePassiveConditionJS'];if(_0x261182[_0x17d332['id']]&&!_0x261182[_0x17d332['id']][_0x5844b6(0x371)](this,_0x17d332))return![];return!![];},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x2cc)]=function(_0xddcaac){const _0x3cfa15=_0x3a8e42;return VisuMZ[_0x3cfa15(0x140)][_0x3cfa15(0x319)][_0x3cfa15(0x26b)][_0x3cfa15(0x30f)][_0x3cfa15(0x371)](this,_0xddcaac);},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x3eb)]=function(){const _0x111037=_0x3a8e42;if(this[_0x111037(0x21f)](_0x111037(0x3eb)))return this['convertPassiveStates']();if(this['_checkingVisuMzPassiveStateObjects'])return[];return this[_0x111037(0x1c4)]=!![],this[_0x111037(0x14d)](),this[_0x111037(0x1c4)]=undefined,this[_0x111037(0x1bd)]();},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x14d)]=function(){const _0xc5ea4c=_0x3a8e42;this[_0xc5ea4c(0x1c4)]=!![],this[_0xc5ea4c(0x15e)]['passiveStates']=[],this[_0xc5ea4c(0x228)](),this[_0xc5ea4c(0x1ee)](),this[_0xc5ea4c(0x326)](),Game_BattlerBase[_0xc5ea4c(0x16b)]&&this['addAuraPassiveStateIDs'](),this['_cache']['passiveStates']=this[_0xc5ea4c(0x15e)][_0xc5ea4c(0x3eb)]['sort']((_0x13767a,_0x34f030)=>_0x13767a-_0x34f030),this[_0xc5ea4c(0x1c4)]=undefined;},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x228)]=function(){const _0x53f35d=_0x3a8e42;if(Imported[_0x53f35d(0x2e4)])this[_0x53f35d(0x338)]();},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x2f2)]=function(){return[];},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x1ee)]=function(){const _0x4e2404=_0x3a8e42,_0x32e786=this['_cache'][_0x4e2404(0x3eb)]||[],_0x47503a=this[_0x4e2404(0x2f2)]();this[_0x4e2404(0x15e)][_0x4e2404(0x3eb)]=_0x32e786||[];for(const _0x35baed of _0x47503a){if(!_0x35baed)continue;const _0x2aa3e9=DataManager[_0x4e2404(0x20c)](_0x35baed);for(const _0x5d62cd of _0x2aa3e9){this['_cache']['passiveStates'][_0x4e2404(0x2dd)](_0x5d62cd);}}},DataManager['getPassiveStatesFromObj']=function(_0x128848){const _0x27144a=_0x3a8e42;if(!_0x128848)return[];const _0x356a09=VisuMZ[_0x27144a(0x140)]['createKeyJS'](_0x128848,_0x27144a(0x281));this[_0x27144a(0x2e5)]=this['_cache_getPassiveStatesFromObj']||{};if(this[_0x27144a(0x2e5)][_0x356a09]!==undefined)return this[_0x27144a(0x2e5)][_0x356a09];const _0x4b3fd8=[],_0x10bb9c=_0x128848[_0x27144a(0x3ee)]||'',_0x129402=/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi,_0x106602=_0x10bb9c[_0x27144a(0x159)](_0x129402);if(_0x106602)for(const _0x59e6 of _0x106602){_0x59e6[_0x27144a(0x159)](_0x129402);const _0x1e49b9=String(RegExp['$1'])['split'](',')[_0x27144a(0x1ef)](_0x11f62c=>_0x11f62c[_0x27144a(0x217)]());for(const _0x5e05a3 of _0x1e49b9){const _0x2350d9=/^\d+$/[_0x27144a(0x3f9)](_0x5e05a3);let _0x43a82b=0x0;_0x2350d9?_0x43a82b=Number(_0x5e05a3):_0x43a82b=DataManager['getStateIdWithName'](_0x5e05a3),_0x43a82b&&_0x4b3fd8[_0x27144a(0x2dd)](_0x43a82b);}}return this[_0x27144a(0x2e5)][_0x356a09]=_0x4b3fd8,this[_0x27144a(0x2e5)][_0x356a09];},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x326)]=function(){const _0x2fa78d=_0x3a8e42,_0x2e3030=VisuMZ[_0x2fa78d(0x140)][_0x2fa78d(0x319)]['PassiveStates'][_0x2fa78d(0x2fb)];this[_0x2fa78d(0x15e)]['passiveStates']=this['_cache'][_0x2fa78d(0x3eb)]['concat'](_0x2e3030);},Game_BattlerBase[_0x3a8e42(0x16b)]=![],Scene_Boot[_0x3a8e42(0x348)][_0x3a8e42(0x39c)]=function(){const _0xac92de=_0x3a8e42,_0x40d874=[$dataActors,$dataClasses,$dataSkills,$dataWeapons,$dataArmors,$dataEnemies];for(const _0xc64afd of _0x40d874){for(const _0x112de9 of _0xc64afd){if(!_0x112de9)continue;const _0x155727=_0x112de9[_0xac92de(0x3ee)]||'';if(_0x155727[_0xac92de(0x159)](/<(?:AURA|MIASMA) (?:STATE|STATES):[ ](.*)>/gi)){Game_BattlerBase[_0xac92de(0x16b)]=!![];break;}}}},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x33e)]=function(){const _0x2e31a4=_0x3a8e42;if(this[_0x2e31a4(0x24f)]())return;if(!this[_0x2e31a4(0x1fa)]())return;const _0x1ec2ff=this[_0x2e31a4(0x15e)][_0x2e31a4(0x3eb)]||[],_0x299e6b=this,_0x2e7409=this['friendsUnit']()['getAuraPassiveStateIDs'](!![],_0x299e6b),_0x12e9d7=$gameParty[_0x2e31a4(0x2ee)]()?this[_0x2e31a4(0x3af)]()[_0x2e31a4(0x2ba)](![],_0x299e6b):[];this[_0x2e31a4(0x15e)][_0x2e31a4(0x3eb)]=_0x1ec2ff||[],this[_0x2e31a4(0x15e)]['passiveStates']=this['_cache'][_0x2e31a4(0x3eb)]['concat'](_0x2e7409)[_0x2e31a4(0x372)](_0x12e9d7);},Game_Unit[_0x3a8e42(0x348)][_0x3a8e42(0x2ba)]=function(_0x5bba74,_0x443ca7){const _0x485d3b=_0x3a8e42;let _0x1f1ea5=[];const _0x1a5cc3=this===$gameParty?this[_0x485d3b(0x169)]():this['members']();for(const _0x3d4292 of _0x1a5cc3){if(!_0x3d4292)continue;if(!_0x3d4292['isAppeared']())continue;const _0x85c32b=_0x3d4292[_0x485d3b(0x2f2)]();for(const _0x5a01d0 of _0x85c32b){if(!_0x5a01d0)continue;if(!VisuMZ[_0x485d3b(0x140)]['MeetsAuraObjConditions'](_0x5a01d0,_0x5bba74,_0x3d4292,_0x443ca7))continue;let _0x2b6194=DataManager[_0x485d3b(0x31b)](_0x5a01d0,_0x5bba74);for(const _0x2637d7 of _0x2b6194){if(!VisuMZ['SkillsStatesCore'][_0x485d3b(0x2c9)](_0x2637d7,_0x5bba74,_0x3d4292,_0x443ca7))continue;_0x1f1ea5[_0x485d3b(0x2dd)](_0x2637d7),!_0x443ca7['isStateAffected'](_0x2637d7)&&_0x443ca7[_0x485d3b(0x296)](_0x2637d7,_0x3d4292);}}}return _0x1f1ea5;},DataManager[_0x3a8e42(0x31b)]=function(_0x4a6012,_0x4b9c9f){const _0x35a0be=_0x3a8e42;if(!_0x4a6012)return[];const _0x4c32aa=_0x4b9c9f?_0x35a0be(0x37c):'miasmaStateIDs',_0x18717d=VisuMZ[_0x35a0be(0x140)][_0x35a0be(0x350)](_0x4a6012,_0x4c32aa);this['_cache_getAuraPassiveStatesFromObj']=this[_0x35a0be(0x26e)]||{};if(this['_cache_getAuraPassiveStatesFromObj'][_0x18717d]!==undefined)return this['_cache_getAuraPassiveStatesFromObj'][_0x18717d];const _0x45df0a=[],_0x519ed6=_0x4a6012[_0x35a0be(0x3ee)]||'',_0x484efc=_0x4b9c9f?/<AURA (?:STATE|STATES):[ ](.*)>/gi:/<MIASMA (?:STATE|STATES):[ ](.*)>/gi,_0xa9b617=_0x519ed6['match'](_0x484efc);if(_0xa9b617)for(const _0x3d6db5 of _0xa9b617){_0x3d6db5['match'](_0x484efc);const _0x1739be=String(RegExp['$1'])[_0x35a0be(0x2e9)](',')['map'](_0xd501fd=>_0xd501fd[_0x35a0be(0x217)]());for(const _0x24aa3d of _0x1739be){const _0x1d1777=/^\d+$/[_0x35a0be(0x3f9)](_0x24aa3d);let _0x250060=0x0;_0x1d1777?_0x250060=Number(_0x24aa3d):_0x250060=DataManager[_0x35a0be(0x23e)](_0x24aa3d),_0x250060&&_0x45df0a[_0x35a0be(0x2dd)](_0x250060);}}return this[_0x35a0be(0x26e)][_0x18717d]=_0x45df0a,this['_cache_getAuraPassiveStatesFromObj'][_0x18717d];},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x325)]=function(_0x38885f,_0x1bf0cd,_0x34e0af,_0x2174cc){const _0x43cbfd=_0x3a8e42;if(!_0x38885f)return![];if(_0x38885f[_0x43cbfd(0x3c4)]!==undefined&&_0x38885f[_0x43cbfd(0x3ce)]!==undefined)return![];const _0x5c62c6=_0x38885f[_0x43cbfd(0x3ee)]||'';if(!VisuMZ[_0x43cbfd(0x140)][_0x43cbfd(0x235)](_0x5c62c6,_0x1bf0cd,_0x34e0af,_0x2174cc))return![];return!![];},VisuMZ[_0x3a8e42(0x140)]['MeetsAuraStateConditions']=function(_0x107011,_0x311f8c,_0x2dd3cf,_0x544582){const _0x54c7b1=_0x3a8e42,_0x5efc06=$dataStates[_0x107011];if(!_0x5efc06)return![];const _0x300cc4=_0x5efc06[_0x54c7b1(0x3ee)]||'';if(!VisuMZ[_0x54c7b1(0x140)][_0x54c7b1(0x235)](_0x300cc4,_0x311f8c,_0x2dd3cf,_0x544582))return![];return!![];},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x235)]=function(_0x3b1c54,_0x39eb6c,_0x4f7789,_0x2f53ff){const _0x5ba3ca=_0x3a8e42;_0x3b1c54=_0x3b1c54||'';if(_0x4f7789['isDead']()){if(_0x39eb6c&&_0x3b1c54[_0x5ba3ca(0x159)](/<ALLOW DEAD AURA>/i)){}else{if(!_0x39eb6c&&_0x3b1c54[_0x5ba3ca(0x159)](/<ALLOW DEAD MIASMA>/i)){}else{if(_0x39eb6c&&_0x3b1c54[_0x5ba3ca(0x159)](/<DEAD AURA ONLY>/i)){}else{if(!_0x39eb6c&&_0x3b1c54[_0x5ba3ca(0x159)](/<DEAD MIASMA ONLY>/i)){}else return![];}}}}else{if(_0x39eb6c&&_0x3b1c54['match'](/<DEAD AURA ONLY>/i))return![];else{if(!_0x39eb6c&&_0x3b1c54[_0x5ba3ca(0x159)](/<DEAD MIASMA ONLY>/i))return![];}}if(_0x39eb6c){if(_0x3b1c54['match'](/<AURA NOT FOR USER>/i)){if(_0x4f7789===_0x2f53ff)return![];}else{if(_0x3b1c54[_0x5ba3ca(0x159)](/<NOT USER AURA>/i)){if(_0x4f7789===_0x2f53ff)return![];}}}return!![];},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x323)]=function(_0x3fb2da){const _0x5730e1=_0x3a8e42;if(typeof _0x3fb2da!=='number')_0x3fb2da=_0x3fb2da['id'];return this[_0x5730e1(0x2b1)][_0x3fb2da]||0x0;},Game_BattlerBase['prototype'][_0x3a8e42(0x2f9)]=function(_0x1a5be2,_0x2153f3){const _0x2a59ce=_0x3a8e42;if(typeof _0x1a5be2!==_0x2a59ce(0x254))_0x1a5be2=_0x1a5be2['id'];if(this[_0x2a59ce(0x2eb)](_0x1a5be2)){const _0xef016d=DataManager['stateMaximumTurns'](_0x1a5be2);this[_0x2a59ce(0x2b1)][_0x1a5be2]=_0x2153f3[_0x2a59ce(0x215)](0x0,_0xef016d);if(this[_0x2a59ce(0x2b1)][_0x1a5be2]<=0x0)this[_0x2a59ce(0x413)](_0x1a5be2);}},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x2d6)]=function(_0x21ee1d,_0x898cd8){const _0xf91110=_0x3a8e42;if(typeof _0x21ee1d!==_0xf91110(0x254))_0x21ee1d=_0x21ee1d['id'];this[_0xf91110(0x2eb)](_0x21ee1d)&&(_0x898cd8+=this[_0xf91110(0x323)](_0x21ee1d),this[_0xf91110(0x2f9)](_0x21ee1d,_0x898cd8));},VisuMZ['SkillsStatesCore'][_0x3a8e42(0x3df)]=Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x2ce)],Game_BattlerBase['prototype'][_0x3a8e42(0x2ce)]=function(_0x41941d){const _0x223272=_0x3a8e42,_0x5a83a3=this[_0x223272(0x322)][_0x41941d];VisuMZ[_0x223272(0x140)]['Game_BattlerBase_eraseBuff']['call'](this,_0x41941d);if(_0x5a83a3>0x0)this[_0x223272(0x246)](_0x41941d);if(_0x5a83a3<0x0)this[_0x223272(0x3d2)](_0x41941d);},VisuMZ['SkillsStatesCore'][_0x3a8e42(0x3b1)]=Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x27c)],Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x27c)]=function(_0x560c6a){const _0xaaf7f5=_0x3a8e42;VisuMZ['SkillsStatesCore'][_0xaaf7f5(0x3b1)][_0xaaf7f5(0x371)](this,_0x560c6a);if(!this[_0xaaf7f5(0x2e3)](_0x560c6a))this[_0xaaf7f5(0x2ce)](_0x560c6a);},VisuMZ[_0x3a8e42(0x140)]['Game_BattlerBase_decreaseBuff']=Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x2d5)],Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x2d5)]=function(_0x1988ad){const _0x5b5fb7=_0x3a8e42;VisuMZ[_0x5b5fb7(0x140)][_0x5b5fb7(0x22c)][_0x5b5fb7(0x371)](this,_0x1988ad);if(!this[_0x5b5fb7(0x2e3)](_0x1988ad))this['eraseBuff'](_0x1988ad);},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x246)]=function(_0xe14a43){},Game_BattlerBase[_0x3a8e42(0x348)]['onEraseDebuff']=function(_0x50a738){},Game_BattlerBase[_0x3a8e42(0x348)]['isMaxBuffAffected']=function(_0x5a7238){const _0x334362=_0x3a8e42;return this[_0x334362(0x322)][_0x5a7238]===VisuMZ['SkillsStatesCore'][_0x334362(0x319)][_0x334362(0x31f)][_0x334362(0x345)];},Game_BattlerBase[_0x3a8e42(0x348)]['isMaxDebuffAffected']=function(_0x54acef){const _0x15e21e=_0x3a8e42;return this['_buffs'][_0x54acef]===-VisuMZ[_0x15e21e(0x140)][_0x15e21e(0x319)][_0x15e21e(0x31f)]['StackDebuffMax'];},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x268)]=Game_BattlerBase['prototype'][_0x3a8e42(0x3e1)],Game_BattlerBase['prototype'][_0x3a8e42(0x3e1)]=function(_0x5d360c,_0x24a83f){const _0x362537=_0x3a8e42;return _0x5d360c=_0x5d360c['clamp'](-0x2,0x2),VisuMZ[_0x362537(0x140)][_0x362537(0x268)][_0x362537(0x371)](this,_0x5d360c,_0x24a83f);},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x208)]=function(_0x2dbf07){const _0x43caec=_0x3a8e42,_0xc3ee66=this[_0x43caec(0x322)][_0x2dbf07];return VisuMZ[_0x43caec(0x140)][_0x43caec(0x319)]['Buffs']['MultiplierJS'][_0x43caec(0x371)](this,_0x2dbf07,_0xc3ee66);},Game_BattlerBase['prototype'][_0x3a8e42(0x389)]=function(_0x42c7c1){return this['_buffTurns'][_0x42c7c1]||0x0;},Game_BattlerBase['prototype']['debuffTurns']=function(_0x13a686){const _0x31e6e0=_0x3a8e42;return this[_0x31e6e0(0x389)](_0x13a686);},Game_BattlerBase[_0x3a8e42(0x348)]['setBuffTurns']=function(_0x1fc4c0,_0x698a04){const _0x49c06a=_0x3a8e42;if(this[_0x49c06a(0x337)](_0x1fc4c0)){const _0x357400=VisuMZ[_0x49c06a(0x140)][_0x49c06a(0x319)][_0x49c06a(0x31f)][_0x49c06a(0x229)];this['_buffTurns'][_0x1fc4c0]=_0x698a04['clamp'](0x0,_0x357400);}},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x1f7)]=function(_0x267ef0,_0x1d1283){const _0x2ea852=_0x3a8e42;this[_0x2ea852(0x337)](_0x267ef0)&&(_0x1d1283+=this[_0x2ea852(0x389)](stateId),this[_0x2ea852(0x14e)](_0x267ef0,_0x1d1283));},Game_BattlerBase[_0x3a8e42(0x348)]['setDebuffTurns']=function(_0x39abcf,_0x484cdf){const _0x326e2c=_0x3a8e42;if(this['isDebuffAffected'](_0x39abcf)){const _0x2b3d7e=VisuMZ[_0x326e2c(0x140)]['Settings'][_0x326e2c(0x31f)][_0x326e2c(0x229)];this[_0x326e2c(0x177)][_0x39abcf]=_0x484cdf[_0x326e2c(0x215)](0x0,_0x2b3d7e);}},Game_BattlerBase[_0x3a8e42(0x348)]['addDebuffTurns']=function(_0x598f91,_0x39f97f){const _0x406afe=_0x3a8e42;this[_0x406afe(0x292)](_0x598f91)&&(_0x39f97f+=this[_0x406afe(0x389)](stateId),this[_0x406afe(0x1ae)](_0x598f91,_0x39f97f));},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x1f6)]=function(_0x546cf8){const _0x525cd7=_0x3a8e42;if(typeof _0x546cf8!==_0x525cd7(0x254))_0x546cf8=_0x546cf8['id'];return this['_stateData']=this[_0x525cd7(0x3a9)]||{},this['_stateData'][_0x546cf8]=this[_0x525cd7(0x3a9)][_0x546cf8]||{},this[_0x525cd7(0x3a9)][_0x546cf8];},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x263)]=function(_0x99afa5,_0x18b2b9){const _0x1f1f62=_0x3a8e42;if(typeof _0x99afa5!==_0x1f1f62(0x254))_0x99afa5=_0x99afa5['id'];const _0x2ef7c8=this[_0x1f1f62(0x1f6)](_0x99afa5);return _0x2ef7c8[_0x18b2b9];},Game_BattlerBase['prototype'][_0x3a8e42(0x3a1)]=function(_0x28f15e,_0x3e0d0c,_0x1065d9){const _0x20b282=_0x3a8e42;if(typeof _0x28f15e!==_0x20b282(0x254))_0x28f15e=_0x28f15e['id'];const _0x498d4b=this['stateData'](_0x28f15e);_0x498d4b[_0x3e0d0c]=_0x1065d9;},Game_BattlerBase[_0x3a8e42(0x348)]['clearStateData']=function(_0x4d5356){const _0x378730=_0x3a8e42;if(typeof _0x4d5356!=='number')_0x4d5356=_0x4d5356['id'];this[_0x378730(0x3a9)]=this[_0x378730(0x3a9)]||{},this[_0x378730(0x3a9)][_0x4d5356]={};},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x35d)]=function(_0x42fc07){const _0x3bc9aa=_0x3a8e42;if(typeof _0x42fc07!==_0x3bc9aa(0x254))_0x42fc07=_0x42fc07['id'];return this[_0x3bc9aa(0x27f)]=this[_0x3bc9aa(0x27f)]||{},this[_0x3bc9aa(0x27f)][_0x42fc07]===undefined&&(this[_0x3bc9aa(0x27f)][_0x42fc07]=''),this['_stateDisplay'][_0x42fc07];},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x1e7)]=function(_0xa4b662,_0x499738){const _0x5e0782=_0x3a8e42;if(typeof _0xa4b662!==_0x5e0782(0x254))_0xa4b662=_0xa4b662['id'];this[_0x5e0782(0x27f)]=this[_0x5e0782(0x27f)]||{},this[_0x5e0782(0x27f)][_0xa4b662]=_0x499738;},Game_BattlerBase[_0x3a8e42(0x348)]['clearStateDisplay']=function(_0x57cbb1){const _0x1f85a3=_0x3a8e42;if(typeof _0x57cbb1!==_0x1f85a3(0x254))_0x57cbb1=_0x57cbb1['id'];this['_stateDisplay']=this['_stateDisplay']||{},this[_0x1f85a3(0x27f)][_0x57cbb1]='';},Game_BattlerBase['prototype']['getStateOrigin']=function(_0x4539a6){const _0x30de79=_0x3a8e42;if(typeof _0x4539a6!=='number')_0x4539a6=_0x4539a6['id'];this[_0x30de79(0x27a)]=this[_0x30de79(0x27a)]||{},this[_0x30de79(0x27a)][_0x4539a6]=this['_stateOrigin'][_0x4539a6]||'user';const _0x1c0eb0=this[_0x30de79(0x27a)][_0x4539a6];return this[_0x30de79(0x1d0)](_0x1c0eb0);},Game_BattlerBase[_0x3a8e42(0x348)]['setStateOrigin']=function(_0x5ea822,_0x42aaf7){const _0x1f1bf8=_0x3a8e42;this[_0x1f1bf8(0x27a)]=this[_0x1f1bf8(0x27a)]||{};const _0x106c26=_0x42aaf7?this[_0x1f1bf8(0x242)](_0x42aaf7):this[_0x1f1bf8(0x38e)]();this[_0x1f1bf8(0x27a)][_0x5ea822]=_0x106c26;},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x406)]=function(_0x16d7f1){const _0x1a62ab=_0x3a8e42;this[_0x1a62ab(0x27a)]=this[_0x1a62ab(0x27a)]||{},delete this['_stateOrigin'][_0x16d7f1];},Game_BattlerBase['prototype'][_0x3a8e42(0x172)]=function(){const _0x5f1f92=_0x3a8e42;this[_0x5f1f92(0x27a)]={};},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x38e)]=function(){const _0x5aa135=this['getCurrentStateActiveUser']();return this['convertTargetToStateOriginKey'](_0x5aa135);},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x24c)]=function(){const _0x46e5ac=_0x3a8e42;if($gameParty[_0x46e5ac(0x2ee)]()){if(BattleManager['_subject'])return BattleManager[_0x46e5ac(0x1f3)];else{if(BattleManager[_0x46e5ac(0x148)])return BattleManager[_0x46e5ac(0x148)];}}else{const _0x433479=SceneManager[_0x46e5ac(0x308)];if(![Scene_Map,Scene_Item][_0x46e5ac(0x328)](_0x433479[_0x46e5ac(0x1d4)]))return $gameParty['menuActor']();}return this;},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x242)]=function(_0x224a1e){const _0x53b3b2=_0x3a8e42;if(!_0x224a1e)return _0x53b3b2(0x1c8);if(_0x224a1e[_0x53b3b2(0x3f8)]())return _0x53b3b2(0x410)[_0x53b3b2(0x2ed)](_0x224a1e[_0x53b3b2(0x3a0)]());else{const _0x53ff88='<enemy-%1>'['format'](_0x224a1e[_0x53b3b2(0x20b)]()),_0x30c399=_0x53b3b2(0x3c7)[_0x53b3b2(0x2ed)](_0x224a1e[_0x53b3b2(0x3e6)]()),_0x584985=_0x53b3b2(0x2d2)['format']($gameTroop['getCurrentTroopUniqueID']());return'%1\x20%2\x20%3'[_0x53b3b2(0x2ed)](_0x53ff88,_0x30c399,_0x584985);}return _0x53b3b2(0x1c8);},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x1d0)]=function(_0x740320){const _0x4f0c07=_0x3a8e42;if(_0x740320===_0x4f0c07(0x1c8))return this;else{if(_0x740320[_0x4f0c07(0x159)](/<actor-(\d+)>/i))return $gameActors[_0x4f0c07(0x1ba)](Number(RegExp['$1']));else{if($gameParty[_0x4f0c07(0x2ee)]()&&_0x740320['match'](/<troop-(\d+)>/i)){const _0xc6d8c4=Number(RegExp['$1']);if(_0xc6d8c4===$gameTroop[_0x4f0c07(0x1f1)]()){if(_0x740320[_0x4f0c07(0x159)](/<member-(\d+)>/i))return $gameTroop[_0x4f0c07(0x222)]()[Number(RegExp['$1'])];}}if(_0x740320[_0x4f0c07(0x159)](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}}return this;},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x156)]=Game_Battler[_0x3a8e42(0x348)][_0x3a8e42(0x396)],Game_Battler['prototype'][_0x3a8e42(0x396)]=function(_0x2589d7){const _0x493770=_0x3a8e42,_0x40831b=this[_0x493770(0x29a)](_0x2589d7);VisuMZ[_0x493770(0x140)][_0x493770(0x156)][_0x493770(0x371)](this,_0x2589d7);if(_0x40831b&&this[_0x493770(0x230)]($dataStates[_0x2589d7])){this[_0x493770(0x236)](_0x2589d7);;}},VisuMZ['SkillsStatesCore'][_0x3a8e42(0x288)]=Game_Battler['prototype'][_0x3a8e42(0x29a)],Game_Battler['prototype']['isStateAddable']=function(_0x2676dd){const _0x5c7616=_0x3a8e42,_0x32a709=$dataStates[_0x2676dd];if(_0x32a709&&_0x32a709[_0x5c7616(0x3ee)][_0x5c7616(0x159)](/<NO DEATH CLEAR>/i))return!this['isStateResist'](_0x2676dd)&&!this[_0x5c7616(0x363)](_0x2676dd)&&!this[_0x5c7616(0x3e2)][_0x5c7616(0x279)](_0x2676dd);return VisuMZ[_0x5c7616(0x140)]['Game_Battler_isStateAddable'][_0x5c7616(0x371)](this,_0x2676dd);},Game_Battler[_0x3a8e42(0x348)]['onAddState']=function(_0x2ae0ad){const _0x6eeb91=_0x3a8e42;this[_0x6eeb91(0x296)](_0x2ae0ad),this[_0x6eeb91(0x157)](_0x2ae0ad),this[_0x6eeb91(0x155)](_0x2ae0ad),this['onAddStateCustomJS'](_0x2ae0ad),this[_0x6eeb91(0x3dd)](_0x2ae0ad);},Game_Battler['prototype'][_0x3a8e42(0x3e0)]=function(_0x272832){const _0x16cac2=_0x3a8e42;this[_0x16cac2(0x2c2)](_0x272832),this[_0x16cac2(0x152)](_0x272832),Game_BattlerBase[_0x16cac2(0x348)][_0x16cac2(0x3e0)][_0x16cac2(0x371)](this,_0x272832);},Game_Battler[_0x3a8e42(0x348)][_0x3a8e42(0x307)]=function(_0x3398e9){const _0x523a36=_0x3a8e42;for(const _0x22cbc7 of this[_0x523a36(0x182)]()){this[_0x523a36(0x38f)](_0x22cbc7['id'])&&_0x22cbc7[_0x523a36(0x3c4)]===_0x3398e9&&(this[_0x523a36(0x413)](_0x22cbc7['id']),this[_0x523a36(0x1c5)](_0x22cbc7['id']),this[_0x523a36(0x349)](_0x22cbc7['id']));}},Game_Battler[_0x3a8e42(0x348)][_0x3a8e42(0x1c5)]=function(_0x12d7f6){const _0xdd6c76=_0x3a8e42;this[_0xdd6c76(0x274)](_0x12d7f6);},Game_Battler['prototype'][_0x3a8e42(0x30c)]=function(_0x5bf1bb){const _0x3714a4=_0x3a8e42;if(this[_0x3714a4(0x1a8)]||this[_0x3714a4(0x380)])return;const _0x4a515a=VisuMZ[_0x3714a4(0x140)]['stateAddJS'];if(_0x4a515a[_0x5bf1bb])_0x4a515a[_0x5bf1bb][_0x3714a4(0x371)](this,_0x5bf1bb);},Game_Battler['prototype'][_0x3a8e42(0x2c2)]=function(_0x32181c){const _0x29ace4=_0x3a8e42;if(this['_tempActor']||this['_tempBattler'])return;const _0x200749=VisuMZ['SkillsStatesCore'][_0x29ace4(0x1e2)];if(_0x200749[_0x32181c])_0x200749[_0x32181c]['call'](this,_0x32181c);},Game_Battler[_0x3a8e42(0x348)][_0x3a8e42(0x274)]=function(_0x5c1e30){const _0x523f0a=_0x3a8e42;if(this[_0x523f0a(0x1a8)]||this['_tempBattler'])return;const _0xe0f894=VisuMZ[_0x523f0a(0x140)][_0x523f0a(0x3cd)];if(_0xe0f894[_0x5c1e30])_0xe0f894[_0x5c1e30][_0x523f0a(0x371)](this,_0x5c1e30);},Game_Battler['prototype'][_0x3a8e42(0x3dd)]=function(_0x5a17fe){const _0x31a868=_0x3a8e42;if(this[_0x31a868(0x1a8)]||this['_tempBattler'])return;try{VisuMZ[_0x31a868(0x140)][_0x31a868(0x319)]['States'][_0x31a868(0x269)][_0x31a868(0x371)](this,_0x5a17fe);}catch(_0x295a80){if($gameTemp[_0x31a868(0x2b8)]())console[_0x31a868(0x2d4)](_0x295a80);}},Game_Battler[_0x3a8e42(0x348)][_0x3a8e42(0x152)]=function(_0x26fd80){const _0x21156e=_0x3a8e42;if(this[_0x21156e(0x1a8)]||this['_tempBattler'])return;try{VisuMZ[_0x21156e(0x140)]['Settings'][_0x21156e(0x3b7)][_0x21156e(0x26d)][_0x21156e(0x371)](this,_0x26fd80);}catch(_0x60f88b){if($gameTemp[_0x21156e(0x2b8)]())console[_0x21156e(0x2d4)](_0x60f88b);}},Game_Battler[_0x3a8e42(0x348)]['onExpireStateGlobalJS']=function(_0x2f500a){const _0x24e2bb=_0x3a8e42;if(this[_0x24e2bb(0x1a8)]||this[_0x24e2bb(0x380)])return;try{VisuMZ[_0x24e2bb(0x140)][_0x24e2bb(0x319)][_0x24e2bb(0x3b7)]['onExpireStateJS'][_0x24e2bb(0x371)](this,_0x2f500a);}catch(_0x3882e6){if($gameTemp[_0x24e2bb(0x2b8)]())console[_0x24e2bb(0x2d4)](_0x3882e6);}},Game_Battler[_0x3a8e42(0x348)][_0x3a8e42(0x291)]=function(_0x2cecb6){const _0x2e6210=_0x3a8e42;return _0x2cecb6=_0x2cecb6[_0x2e6210(0x3f4)]()[_0x2e6210(0x217)](),this[_0x2e6210(0x182)]()['filter'](_0x5cdb6b=>_0x5cdb6b[_0x2e6210(0x209)]['includes'](_0x2cecb6));},Game_Battler[_0x3a8e42(0x348)][_0x3a8e42(0x17e)]=function(_0x322321,_0x256119){const _0x10b1d0=_0x3a8e42;_0x322321=_0x322321[_0x10b1d0(0x3f4)]()['trim'](),_0x256119=_0x256119||0x0;const _0x577931=this[_0x10b1d0(0x291)](_0x322321),_0x26b875=[];for(const _0x32589f of _0x577931){if(!_0x32589f)continue;if(_0x256119<=0x0)break;_0x26b875[_0x10b1d0(0x2dd)](_0x32589f['id']),this[_0x10b1d0(0x3e2)]['success']=!![],_0x256119--;}while(_0x26b875[_0x10b1d0(0x231)]>0x0){this[_0x10b1d0(0x413)](_0x26b875[_0x10b1d0(0x3cf)]());}},Game_Battler[_0x3a8e42(0x348)][_0x3a8e42(0x3a5)]=function(_0x2d0972,_0x49cf09){const _0x5ec644=_0x3a8e42;_0x2d0972=_0x2d0972['toUpperCase']()[_0x5ec644(0x217)](),_0x49cf09=_0x49cf09||[];const _0x35cae4=this[_0x5ec644(0x291)](_0x2d0972),_0x32ee78=[];for(const _0x5e7d02 of _0x35cae4){if(!_0x5e7d02)continue;if(_0x49cf09[_0x5ec644(0x328)](_0x5e7d02))continue;_0x32ee78['push'](_0x5e7d02['id']),this['_result'][_0x5ec644(0x142)]=!![];}while(_0x32ee78[_0x5ec644(0x231)]>0x0){this[_0x5ec644(0x413)](_0x32ee78[_0x5ec644(0x3cf)]());}},Game_Battler[_0x3a8e42(0x348)]['isStateCategoryAffected']=function(_0x1569e5){const _0x78364c=_0x3a8e42;return this[_0x78364c(0x1d6)](_0x1569e5)>0x0;},Game_Battler[_0x3a8e42(0x348)][_0x3a8e42(0x400)]=function(_0x219928){return this['totalStateCategory'](_0x219928)>0x0;},Game_Battler[_0x3a8e42(0x348)][_0x3a8e42(0x1d6)]=function(_0x376eb9){const _0x2f2216=_0x3a8e42,_0x2fc20f=this[_0x2f2216(0x291)](_0x376eb9)[_0x2f2216(0x164)](_0x4c9ccc=>this['isStateAffected'](_0x4c9ccc['id']));return _0x2fc20f['length'];},Game_Battler[_0x3a8e42(0x348)][_0x3a8e42(0x28a)]=function(_0xfe7df0){const _0x494118=_0x3a8e42,_0x2893f5=this[_0x494118(0x291)](_0xfe7df0);return _0x2893f5[_0x494118(0x231)];},VisuMZ[_0x3a8e42(0x140)]['Game_BattlerBase_isStateResist']=Game_BattlerBase[_0x3a8e42(0x348)]['isStateResist'],Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x2bf)]=function(_0x1673a5){const _0x3864fb=_0x3a8e42,_0x1d03ea=$dataStates[_0x1673a5];if(_0x1d03ea&&_0x1d03ea[_0x3864fb(0x209)][_0x3864fb(0x231)]>0x0)for(const _0x51924c of _0x1d03ea['categories']){if(this[_0x3864fb(0x317)](_0x51924c))return!![];}return VisuMZ[_0x3864fb(0x140)]['Game_BattlerBase_isStateResist'][_0x3864fb(0x371)](this,_0x1673a5);},Game_BattlerBase[_0x3a8e42(0x348)]['isStateCategoryResisted']=function(_0x478e89){const _0x5ba865=_0x3a8e42;let _0x539c3f=_0x5ba865(0x35c);if(this[_0x5ba865(0x21f)](_0x539c3f))return this[_0x5ba865(0x15e)][_0x539c3f][_0x5ba865(0x328)](_0x478e89);return this[_0x5ba865(0x15e)][_0x539c3f]=this[_0x5ba865(0x187)](),this[_0x5ba865(0x15e)][_0x539c3f][_0x5ba865(0x328)](_0x478e89);},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x187)]=function(){const _0x51e8ca=_0x3a8e42,_0x6334e9=/<RESIST STATE (?:CATEGORY|CATEGORIES):[ ](.*)>/gi,_0x5817d4=/<RESIST STATE (?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/RESIST STATE (?:CATEGORY|CATEGORIES)>/i;let _0x74d40d=[];for(const _0x4e6206 of this[_0x51e8ca(0x37f)]()){if(!_0x4e6206)continue;const _0x25edc9=_0x4e6206['note'],_0x456856=_0x25edc9[_0x51e8ca(0x159)](_0x6334e9);if(_0x456856)for(const _0x48a608 of _0x456856){_0x48a608[_0x51e8ca(0x159)](_0x6334e9);const _0x392d31=String(RegExp['$1'])[_0x51e8ca(0x2e9)](',')[_0x51e8ca(0x1ef)](_0x37d2da=>String(_0x37d2da)[_0x51e8ca(0x3f4)]()['trim']());_0x74d40d=_0x74d40d[_0x51e8ca(0x372)](_0x392d31);}if(_0x25edc9[_0x51e8ca(0x159)](_0x5817d4)){const _0x1d1482=String(RegExp['$1'])[_0x51e8ca(0x2e9)](/[\r\n]+/)[_0x51e8ca(0x1ef)](_0xfc3c4b=>String(_0xfc3c4b)[_0x51e8ca(0x3f4)]()[_0x51e8ca(0x217)]());_0x74d40d=_0x74d40d[_0x51e8ca(0x372)](_0x1d1482);}}return _0x74d40d;},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x157)]=function(_0x417b32){const _0x1db232=_0x3a8e42,_0x381fd8=$dataStates[_0x417b32];if(!_0x381fd8)return;const _0x161885=_0x381fd8[_0x1db232(0x3ee)]||'',_0x5d1586=_0x161885[_0x1db232(0x159)](/<REMOVE OTHER (.*) STATES>/gi);if(_0x5d1586){const _0x2cabba=[_0x381fd8];for(const _0x141a5f of _0x5d1586){_0x141a5f[_0x1db232(0x159)](/<REMOVE OTHER (.*) STATES>/i);const _0x3214d3=String(RegExp['$1']);this[_0x1db232(0x3a5)](_0x3214d3,_0x2cabba);}}},Game_Battler[_0x3a8e42(0x348)][_0x3a8e42(0x3bb)]=function(){const _0x4084fe=_0x3a8e42;for(const _0x2aed1b of this['states']()){if(!_0x2aed1b)continue;if(!this[_0x4084fe(0x2eb)](_0x2aed1b['id']))continue;if(!_0x2aed1b['removeByDamage'])continue;if(this['bypassRemoveStatesByDamage'](_0x2aed1b))continue;Math[_0x4084fe(0x2c0)](0x64)<_0x2aed1b[_0x4084fe(0x166)]&&this['removeState'](_0x2aed1b['id']);}},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x31d)]=Game_Action[_0x3a8e42(0x348)][_0x3a8e42(0x258)],Game_Action['prototype'][_0x3a8e42(0x258)]=function(_0x3be311,_0x5860db){const _0x396a3b=_0x3a8e42;$gameTemp[_0x396a3b(0x293)]=this[_0x396a3b(0x3c0)](),$gameTemp[_0x396a3b(0x24b)]=this[_0x396a3b(0x202)](),$gameTemp[_0x396a3b(0x401)]=_0x5860db,VisuMZ[_0x396a3b(0x140)][_0x396a3b(0x31d)][_0x396a3b(0x371)](this,_0x3be311,_0x5860db),$gameTemp[_0x396a3b(0x293)]=undefined,$gameTemp[_0x396a3b(0x24b)]=undefined,$gameTemp[_0x396a3b(0x401)]=undefined;},Game_Battler['prototype'][_0x3a8e42(0x195)]=function(_0x8b41fc){const _0x3947bf=_0x3a8e42;if($gameTemp[_0x3947bf(0x293)]){const _0x5df7e9=$gameTemp[_0x3947bf(0x293)],_0x4c8d40=/<BYPASS STATE DAMAGE REMOVAL:[ ](.*)>/gi;if(DataManager[_0x3947bf(0x2d8)](_0x8b41fc,_0x5df7e9,_0x4c8d40,_0x3947bf(0x1d5)))return!![];}if($gameTemp[_0x3947bf(0x24b)]){const _0x2b6f83=$gameTemp[_0x3947bf(0x24b)];if(_0x2b6f83[_0x3947bf(0x294)](_0x8b41fc))return!![];}if(this[_0x3947bf(0x284)](_0x8b41fc))return!![];return![];},Game_Battler[_0x3a8e42(0x348)][_0x3a8e42(0x294)]=function(_0x5574dd){const _0x5e23da=_0x3a8e42,_0x1999a4=/<BYPASS STATE DAMAGE REMOVAL AS (?:ATTACKER|USER):[ ](.*)>/gi;for(const _0x1f2f07 of this[_0x5e23da(0x37f)]()){if(!_0x1f2f07)continue;if(DataManager[_0x5e23da(0x2d8)](_0x5574dd,_0x1f2f07,_0x1999a4,_0x5e23da(0x314)))return!![];}return![];},Game_Battler[_0x3a8e42(0x348)][_0x3a8e42(0x284)]=function(_0x179035){const _0x45c78d=_0x3a8e42,_0x2c3045=/<BYPASS STATE DAMAGE REMOVAL AS (?:TARGET|VICTIM):[ ](.*)>/gi;for(const _0x2e765c of this[_0x45c78d(0x37f)]()){if(!_0x2e765c)continue;if(DataManager[_0x45c78d(0x2d8)](_0x179035,_0x2e765c,_0x2c3045,_0x45c78d(0x32a)))return!![];}return![];},DataManager['CheckBypassRemoveStatesByDamage']=function(_0x121a93,_0x59344d,_0x1907a1,_0x565e71){const _0x540ccc=_0x3a8e42,_0x8244f1='%1-%2-%3'[_0x540ccc(0x2ed)](_0x59344d[_0x540ccc(0x20f)],_0x59344d['id'],_0x565e71);this[_0x540ccc(0x22a)]=this[_0x540ccc(0x22a)]||{};if(this[_0x540ccc(0x22a)][_0x8244f1]!==undefined)return this[_0x540ccc(0x22a)][_0x8244f1][_0x540ccc(0x328)](_0x121a93['id']);const _0x3db4dd=[],_0x239ba9=_0x59344d[_0x540ccc(0x3ee)][_0x540ccc(0x159)](_0x1907a1);if(_0x239ba9)for(const _0x478b1b of _0x239ba9){_0x478b1b[_0x540ccc(0x159)](_0x1907a1);const _0x7470c0=String(RegExp['$1'])[_0x540ccc(0x2e9)](',')[_0x540ccc(0x1ef)](_0xd6c955=>_0xd6c955['trim']());for(let _0x28ade5 of _0x7470c0){_0x28ade5=(String(_0x28ade5)||'')['trim']();if(_0x28ade5[_0x540ccc(0x159)](/(\d+)[ ](?:THROUGH|to)[ ](\d+)/i)){const _0x22c17b=Math[_0x540ccc(0x28f)](Number(RegExp['$1']),Number(RegExp['$2'])),_0x4b44d7=Math[_0x540ccc(0x171)](Number(RegExp['$1']),Number(RegExp['$2']));for(let _0x587aa5=_0x22c17b;_0x587aa5<=_0x4b44d7;_0x587aa5++)elements[_0x540ccc(0x2dd)](_0x587aa5);continue;}const _0x1563c5=/^\d+$/[_0x540ccc(0x3f9)](_0x28ade5);_0x1563c5?entryID=Number(_0x28ade5):entryID=DataManager[_0x540ccc(0x23e)](_0x28ade5),entryID&&_0x3db4dd[_0x540ccc(0x2dd)](entryID);}}return this[_0x540ccc(0x22a)][_0x8244f1]=_0x3db4dd,this['_cache_CheckBypassRemoveStatesByDamage'][_0x8244f1]['includes'](_0x121a93['id']);},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x391)]=Game_Battler['prototype'][_0x3a8e42(0x20e)],Game_Battler[_0x3a8e42(0x348)][_0x3a8e42(0x20e)]=function(_0x5a0e80,_0x307c34){const _0x44e049=_0x3a8e42;VisuMZ[_0x44e049(0x140)][_0x44e049(0x391)]['call'](this,_0x5a0e80,_0x307c34),this[_0x44e049(0x337)](_0x5a0e80)&&this['onAddBuff'](_0x5a0e80,_0x307c34);},Game_Battler[_0x3a8e42(0x348)][_0x3a8e42(0x173)]=function(_0x11c1a6){},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x2c1)]=Game_Battler[_0x3a8e42(0x348)][_0x3a8e42(0x2a7)],Game_Battler[_0x3a8e42(0x348)]['addDebuff']=function(_0x4ed7de,_0x2a55b4){const _0x49edb3=_0x3a8e42;VisuMZ['SkillsStatesCore'][_0x49edb3(0x2c1)][_0x49edb3(0x371)](this,_0x4ed7de,_0x2a55b4),this[_0x49edb3(0x292)](_0x4ed7de)&&this[_0x49edb3(0x342)](_0x4ed7de,_0x2a55b4);},Game_Battler[_0x3a8e42(0x348)]['removeBuffsAuto']=function(){const _0x1ba7fb=_0x3a8e42;for(let _0x5247a1=0x0;_0x5247a1<this[_0x1ba7fb(0x3fe)]();_0x5247a1++){if(this[_0x1ba7fb(0x22f)](_0x5247a1)){const _0x45a2c0=this[_0x1ba7fb(0x322)][_0x5247a1];this[_0x1ba7fb(0x3f3)](_0x5247a1);if(_0x45a2c0>0x0)this['onExpireBuff'](_0x5247a1);if(_0x45a2c0<0x0)this[_0x1ba7fb(0x2be)](_0x5247a1);}}},Game_Battler[_0x3a8e42(0x348)][_0x3a8e42(0x250)]=function(_0x82a5d3,_0x47179b){const _0x556e5e=_0x3a8e42;this[_0x556e5e(0x257)](_0x82a5d3,_0x47179b);},Game_Battler[_0x3a8e42(0x348)][_0x3a8e42(0x342)]=function(_0x1dbe3d,_0x27b1ae){const _0x5c367b=_0x3a8e42;this[_0x5c367b(0x2d1)](_0x1dbe3d,_0x27b1ae);},Game_Battler[_0x3a8e42(0x348)]['onEraseBuff']=function(_0x4934e2){const _0x1016e1=_0x3a8e42;Game_BattlerBase[_0x1016e1(0x348)][_0x1016e1(0x246)][_0x1016e1(0x371)](this,_0x4934e2),this[_0x1016e1(0x240)](_0x4934e2);},Game_Battler[_0x3a8e42(0x348)][_0x3a8e42(0x3d2)]=function(_0xbceaec){const _0x4c607e=_0x3a8e42;Game_BattlerBase[_0x4c607e(0x348)][_0x4c607e(0x3d2)][_0x4c607e(0x371)](this,_0xbceaec),this['onEraseDebuffGlobalJS'](_0xbceaec);},Game_Battler['prototype'][_0x3a8e42(0x36e)]=function(_0x323ae8){const _0x4d7e77=_0x3a8e42;this[_0x4d7e77(0x3a8)](_0x323ae8);},Game_Battler[_0x3a8e42(0x348)][_0x3a8e42(0x2be)]=function(_0x38f58d){const _0x4d1707=_0x3a8e42;this[_0x4d1707(0x343)](_0x38f58d);},Game_Battler[_0x3a8e42(0x348)][_0x3a8e42(0x257)]=function(_0x4e7296,_0x1bde93){const _0x5a2089=_0x3a8e42;VisuMZ[_0x5a2089(0x140)][_0x5a2089(0x319)]['Buffs'][_0x5a2089(0x158)][_0x5a2089(0x371)](this,_0x4e7296,_0x1bde93);},Game_Battler['prototype']['onAddDebuffGlobalJS']=function(_0x8ecad5,_0x5e70b8){const _0x31a99f=_0x3a8e42;VisuMZ[_0x31a99f(0x140)][_0x31a99f(0x319)][_0x31a99f(0x31f)][_0x31a99f(0x259)][_0x31a99f(0x371)](this,_0x8ecad5,_0x5e70b8);},Game_BattlerBase[_0x3a8e42(0x348)][_0x3a8e42(0x240)]=function(_0x3bc94f){const _0x3e9b81=_0x3a8e42;VisuMZ[_0x3e9b81(0x140)]['Settings'][_0x3e9b81(0x31f)][_0x3e9b81(0x33f)]['call'](this,_0x3bc94f);},Game_BattlerBase['prototype'][_0x3a8e42(0x1a6)]=function(_0x19461b){const _0x2248ae=_0x3a8e42;VisuMZ[_0x2248ae(0x140)][_0x2248ae(0x319)][_0x2248ae(0x31f)][_0x2248ae(0x201)]['call'](this,_0x19461b);},Game_Battler['prototype'][_0x3a8e42(0x3a8)]=function(_0x422f21){const _0x4f4be4=_0x3a8e42;VisuMZ['SkillsStatesCore'][_0x4f4be4(0x319)][_0x4f4be4(0x31f)][_0x4f4be4(0x232)][_0x4f4be4(0x371)](this,_0x422f21);},Game_Battler[_0x3a8e42(0x348)][_0x3a8e42(0x343)]=function(_0x1d7ffe){const _0x5c125b=_0x3a8e42;VisuMZ[_0x5c125b(0x140)][_0x5c125b(0x319)]['Buffs'][_0x5c125b(0x227)][_0x5c125b(0x371)](this,_0x1d7ffe);},Game_Battler['prototype'][_0x3a8e42(0x155)]=function(_0x3dffd0){const _0x39a98d=_0x3a8e42,_0x4875de=VisuMZ[_0x39a98d(0x140)],_0x1f2ae8=[_0x39a98d(0x264),_0x39a98d(0x3b8),_0x39a98d(0x178),_0x39a98d(0x36d),_0x39a98d(0x312),_0x39a98d(0x1a0)];for(const _0x2414fc of _0x1f2ae8){_0x4875de[_0x2414fc][_0x3dffd0]&&_0x4875de[_0x2414fc][_0x3dffd0][_0x39a98d(0x371)](this,_0x3dffd0);}},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x1b7)]=Game_Battler[_0x3a8e42(0x348)][_0x3a8e42(0x17f)],Game_Battler[_0x3a8e42(0x348)]['regenerateAll']=function(){const _0x4bd632=_0x3a8e42;this[_0x4bd632(0x3b0)](),VisuMZ[_0x4bd632(0x140)][_0x4bd632(0x1b7)][_0x4bd632(0x371)](this),this[_0x4bd632(0x1d7)](),this['regenerateAllSkillsStatesCore']();},Game_Battler[_0x3a8e42(0x348)][_0x3a8e42(0x1d7)]=function(){const _0x33f686=_0x3a8e42;for(const _0x34cdb5 of this[_0x33f686(0x3eb)]()){if(!_0x34cdb5)continue;this[_0x33f686(0x155)](_0x34cdb5['id']);}},Game_Battler[_0x3a8e42(0x348)][_0x3a8e42(0x3b0)]=function(){const _0xbff1d6=_0x3a8e42;for(const _0x402214 of this[_0xbff1d6(0x182)]()){if(!_0x402214)continue;_0x402214[_0xbff1d6(0x3ee)][_0xbff1d6(0x159)](/<JS SLIP REFRESH>/i)&&this[_0xbff1d6(0x155)](_0x402214['id']);}},Game_Battler['prototype']['regenerateAllSkillsStatesCore']=function(){if(!this['isAlive']())return;const _0x5988d1=this['states']();for(const _0x325d76 of _0x5988d1){if(!_0x325d76)continue;this['onRegenerateCustomStateDamageOverTime'](_0x325d76);}},Game_Battler['prototype'][_0x3a8e42(0x3fa)]=function(_0x4d82bf){const _0x1556b7=_0x3a8e42,_0xef72fc=this[_0x1556b7(0x263)](_0x4d82bf['id'],'slipHp')||0x0,_0x5a8413=-this['maxSlipDamage'](),_0x2b3451=Math[_0x1556b7(0x171)](_0xef72fc,_0x5a8413);if(_0x2b3451!==0x0){const _0x1085ee=this[_0x1556b7(0x3e2)][_0x1556b7(0x395)]||0x0;this[_0x1556b7(0x2b2)](_0x2b3451),this[_0x1556b7(0x3e2)][_0x1556b7(0x395)]+=_0x1085ee;}const _0x1534da=this[_0x1556b7(0x263)](_0x4d82bf['id'],'slipMp')||0x0;if(_0x1534da!==0x0){const _0x569106=this['_result'][_0x1556b7(0x382)]||0x0;this[_0x1556b7(0x285)](_0x1534da),this[_0x1556b7(0x3e2)][_0x1556b7(0x382)]+=_0x569106;}const _0x2d05f5=this[_0x1556b7(0x263)](_0x4d82bf['id'],_0x1556b7(0x2db))||0x0;_0x2d05f5!==0x0&&this['gainSilentTp'](_0x2d05f5);},VisuMZ[_0x3a8e42(0x140)]['Game_Actor_skillTypes']=Game_Actor[_0x3a8e42(0x348)]['skillTypes'],Game_Actor[_0x3a8e42(0x348)]['skillTypes']=function(){const _0x50c806=_0x3a8e42,_0x2c9f12=VisuMZ[_0x50c806(0x140)][_0x50c806(0x191)]['call'](this),_0x2a8077=VisuMZ[_0x50c806(0x140)][_0x50c806(0x319)][_0x50c806(0x37e)];let _0x2d2dd2=_0x2a8077[_0x50c806(0x25d)];return $gameParty['inBattle']()&&(_0x2d2dd2=_0x2d2dd2[_0x50c806(0x372)](_0x2a8077[_0x50c806(0x28b)])),_0x2c9f12[_0x50c806(0x164)](_0x10e3cd=>!_0x2d2dd2['includes'](_0x10e3cd));},Game_Actor[_0x3a8e42(0x348)][_0x3a8e42(0x3fc)]=function(){const _0x183c5d=_0x3a8e42;return this[_0x183c5d(0x29b)]()[_0x183c5d(0x164)](_0x1008da=>this[_0x183c5d(0x3aa)](_0x1008da));},Game_Actor[_0x3a8e42(0x348)]['isSkillUsableForAutoBattle']=function(_0x225afa){const _0x426d29=_0x3a8e42;if(!this[_0x426d29(0x204)](_0x225afa))return![];if(!_0x225afa)return![];if(!this[_0x426d29(0x402)](_0x225afa))return![];if(this['isSkillHidden'](_0x225afa))return![];return!![];},Game_Actor[_0x3a8e42(0x348)]['isSkillTypeMatchForUse']=function(_0x35b2ba){const _0x2d7756=_0x3a8e42,_0x5a61bc=this[_0x2d7756(0x3c3)](),_0x2f58d0=DataManager[_0x2d7756(0x411)](_0x35b2ba),_0x326c93=_0x5a61bc['filter'](_0x2fb508=>_0x2f58d0['includes'](_0x2fb508));return _0x326c93['length']>0x0;},Game_Actor[_0x3a8e42(0x348)]['isSkillHidden']=function(_0x46c31b){const _0x475013=_0x3a8e42;if(!VisuMZ[_0x475013(0x140)][_0x475013(0x3b2)](this,_0x46c31b))return!![];if(!VisuMZ[_0x475013(0x140)][_0x475013(0x365)](this,_0x46c31b))return!![];if(!VisuMZ[_0x475013(0x140)][_0x475013(0x34f)](this,_0x46c31b))return!![];return![];},Game_Actor[_0x3a8e42(0x348)]['passiveStateObjects']=function(){const _0x2fdd96=_0x3a8e42;let _0x54bd5a=[this[_0x2fdd96(0x1ba)](),this[_0x2fdd96(0x212)]()];_0x54bd5a=_0x54bd5a[_0x2fdd96(0x372)](this[_0x2fdd96(0x2b4)]()[_0x2fdd96(0x164)](_0x30099e=>_0x30099e));for(const _0x293c4d of this[_0x2fdd96(0x1ca)]){const _0x497893=$dataSkills[_0x293c4d];if(!_0x497893)continue;_0x54bd5a[_0x2fdd96(0x2dd)](_0x497893);}return _0x54bd5a;},Game_Actor[_0x3a8e42(0x348)][_0x3a8e42(0x326)]=function(){const _0x5927b2=_0x3a8e42;Game_Battler[_0x5927b2(0x348)][_0x5927b2(0x326)][_0x5927b2(0x371)](this);const _0x46f482=VisuMZ[_0x5927b2(0x140)][_0x5927b2(0x319)][_0x5927b2(0x26b)][_0x5927b2(0x32c)];this[_0x5927b2(0x15e)]['passiveStates']=this[_0x5927b2(0x15e)][_0x5927b2(0x3eb)][_0x5927b2(0x372)](_0x46f482);},VisuMZ[_0x3a8e42(0x140)]['Game_Actor_learnSkill']=Game_Actor[_0x3a8e42(0x348)][_0x3a8e42(0x280)],Game_Actor[_0x3a8e42(0x348)][_0x3a8e42(0x280)]=function(_0x5bec80){const _0x15e4d0=_0x3a8e42;VisuMZ['SkillsStatesCore']['Game_Actor_learnSkill'][_0x15e4d0(0x371)](this,_0x5bec80),this['_cache']={},this[_0x15e4d0(0x3eb)]();},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x219)]=Game_Actor[_0x3a8e42(0x348)][_0x3a8e42(0x255)],Game_Actor[_0x3a8e42(0x348)][_0x3a8e42(0x255)]=function(_0x4a60d8){const _0x2f8d7c=_0x3a8e42;VisuMZ['SkillsStatesCore'][_0x2f8d7c(0x219)][_0x2f8d7c(0x371)](this,_0x4a60d8),this[_0x2f8d7c(0x15e)]={},this[_0x2f8d7c(0x3eb)]();},Game_Actor['prototype'][_0x3a8e42(0x1b2)]=function(){const _0x1d3df7=_0x3a8e42;return VisuMZ['SkillsStatesCore'][_0x1d3df7(0x319)][_0x1d3df7(0x3b7)][_0x1d3df7(0x1f5)]??0x14;},Game_Enemy[_0x3a8e42(0x348)][_0x3a8e42(0x2f2)]=function(){const _0x51cb43=_0x3a8e42;let _0x11cb7a=[this[_0x51cb43(0x2ea)]()];return _0x11cb7a[_0x51cb43(0x372)](this[_0x51cb43(0x29b)]());},Game_Enemy['prototype']['addPassiveStatesByPluginParameters']=function(){const _0x50cd2e=_0x3a8e42;Game_Battler[_0x50cd2e(0x348)][_0x50cd2e(0x326)][_0x50cd2e(0x371)](this);const _0xf81574=VisuMZ['SkillsStatesCore'][_0x50cd2e(0x319)][_0x50cd2e(0x26b)][_0x50cd2e(0x206)];this[_0x50cd2e(0x15e)][_0x50cd2e(0x3eb)]=this[_0x50cd2e(0x15e)]['passiveStates'][_0x50cd2e(0x372)](_0xf81574);},Game_Enemy[_0x3a8e42(0x348)][_0x3a8e42(0x29b)]=function(){const _0x23bc23=_0x3a8e42,_0xc07168=[];for(const _0x4cfe6a of this[_0x23bc23(0x2ea)]()[_0x23bc23(0x24a)]){const _0x421ea8=$dataSkills[_0x4cfe6a['skillId']];if(_0x421ea8&&!_0xc07168[_0x23bc23(0x328)](_0x421ea8))_0xc07168[_0x23bc23(0x2dd)](_0x421ea8);}return _0xc07168;},Game_Enemy[_0x3a8e42(0x348)][_0x3a8e42(0x1be)]=function(_0x3cc544){const _0x426007=_0x3a8e42;return this[_0x426007(0x230)]($dataStates[_0x3cc544]);},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x30d)]=Game_Unit[_0x3a8e42(0x348)][_0x3a8e42(0x2d9)],Game_Unit['prototype'][_0x3a8e42(0x2d9)]=function(){const _0x4bb1d2=_0x3a8e42;if(this['isPartyAllAffectedByGroupDefeatStates']())return!![];return VisuMZ[_0x4bb1d2(0x140)][_0x4bb1d2(0x30d)][_0x4bb1d2(0x371)](this);},Game_Unit['prototype'][_0x3a8e42(0x21a)]=function(){const _0xc039da=_0x3a8e42,_0x23e72a=this[_0xc039da(0x265)]();for(const _0x31fc1f of _0x23e72a){if(!_0x31fc1f[_0xc039da(0x36b)]())return![];}return!![];},Game_Unit[_0x3a8e42(0x348)][_0x3a8e42(0x286)]=function(){const _0x29d32c=_0x3a8e42;for(const _0x4d000d of this[_0x29d32c(0x222)]()){if(!_0x4d000d)continue;_0x4d000d[_0x29d32c(0x3dc)]();}},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x14a)]=Game_Player[_0x3a8e42(0x348)]['refresh'],Game_Player[_0x3a8e42(0x348)][_0x3a8e42(0x3dc)]=function(){const _0x23097f=_0x3a8e42;VisuMZ[_0x23097f(0x140)][_0x23097f(0x14a)][_0x23097f(0x371)](this),$gameParty['refreshAllMembers'](),$gameParty[_0x23097f(0x2ee)]()&&$gameTroop['refreshAllMembers']();},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x1a5)]=Game_Troop[_0x3a8e42(0x348)][_0x3a8e42(0x1b1)],Game_Troop[_0x3a8e42(0x348)]['setup']=function(_0x1ccc57){const _0x325c2a=_0x3a8e42;VisuMZ['SkillsStatesCore'][_0x325c2a(0x1a5)][_0x325c2a(0x371)](this,_0x1ccc57),this[_0x325c2a(0x16c)]();},Game_Troop[_0x3a8e42(0x348)][_0x3a8e42(0x16c)]=function(){const _0x1b3fd4=_0x3a8e42;this[_0x1b3fd4(0x405)]=Graphics[_0x1b3fd4(0x21e)];},Game_Troop[_0x3a8e42(0x348)][_0x3a8e42(0x1f1)]=function(){const _0x3f51eb=_0x3a8e42;return this[_0x3f51eb(0x405)]=this[_0x3f51eb(0x405)]||Graphics[_0x3f51eb(0x21e)],this[_0x3f51eb(0x405)];},Scene_Skill[_0x3a8e42(0x348)]['isBottomHelpMode']=function(){const _0x451ac8=_0x3a8e42;if(ConfigManager['uiMenuStyle']&&ConfigManager['uiHelpPosition']!==undefined)return ConfigManager['uiHelpPosition'];else{if(this[_0x451ac8(0x387)]())return this[_0x451ac8(0x3d3)]()['match'](/LOWER/i);else Scene_ItemBase[_0x451ac8(0x348)][_0x451ac8(0x3c8)][_0x451ac8(0x371)](this);}},Scene_Skill[_0x3a8e42(0x348)][_0x3a8e42(0x3c8)]=function(){const _0x5456cf=_0x3a8e42;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x5456cf(0x210)]!==undefined)return ConfigManager[_0x5456cf(0x210)];else return this[_0x5456cf(0x387)]()?this[_0x5456cf(0x3d3)]()[_0x5456cf(0x159)](/RIGHT/i):Scene_ItemBase[_0x5456cf(0x348)][_0x5456cf(0x3c8)][_0x5456cf(0x371)](this);},Scene_Skill[_0x3a8e42(0x348)][_0x3a8e42(0x3d3)]=function(){const _0x179d48=_0x3a8e42;return VisuMZ[_0x179d48(0x140)][_0x179d48(0x319)][_0x179d48(0x37e)][_0x179d48(0x1a4)];},Scene_Skill['prototype'][_0x3a8e42(0x2bc)]=function(){const _0x4480dc=_0x3a8e42;return this[_0x4480dc(0x251)]&&this[_0x4480dc(0x251)]['isUseModernControls']();},Scene_Skill['prototype'][_0x3a8e42(0x387)]=function(){const _0x24d3c4=_0x3a8e42;return VisuMZ[_0x24d3c4(0x140)]['Settings'][_0x24d3c4(0x37e)]['EnableLayout'];},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x1fd)]=Scene_Skill['prototype'][_0x3a8e42(0x26c)],Scene_Skill[_0x3a8e42(0x348)][_0x3a8e42(0x26c)]=function(){const _0x52ca9f=_0x3a8e42;return this[_0x52ca9f(0x387)]()?this[_0x52ca9f(0x25c)]():VisuMZ[_0x52ca9f(0x140)][_0x52ca9f(0x1fd)][_0x52ca9f(0x371)](this);},Scene_Skill[_0x3a8e42(0x348)][_0x3a8e42(0x25c)]=function(){const _0x428d2f=_0x3a8e42,_0x27c276=0x0,_0x2f82f8=this['helpAreaTop'](),_0x12f6f5=Graphics[_0x428d2f(0x361)],_0x301356=this[_0x428d2f(0x1dd)]();return new Rectangle(_0x27c276,_0x2f82f8,_0x12f6f5,_0x301356);},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x1ea)]=Scene_Skill[_0x3a8e42(0x348)][_0x3a8e42(0x2e2)],Scene_Skill['prototype']['skillTypeWindowRect']=function(){const _0x5ad038=_0x3a8e42;return this[_0x5ad038(0x387)]()?this[_0x5ad038(0x1cf)]():VisuMZ['SkillsStatesCore'][_0x5ad038(0x1ea)][_0x5ad038(0x371)](this);},Scene_Skill['prototype'][_0x3a8e42(0x39a)]=function(){const _0x2836d5=_0x3a8e42;return VisuMZ[_0x2836d5(0x140)]['Settings']['Skills'][_0x2836d5(0x3a3)]??Scene_MenuBase['prototype'][_0x2836d5(0x39a)][_0x2836d5(0x371)](this);},Scene_Skill[_0x3a8e42(0x348)][_0x3a8e42(0x1cf)]=function(){const _0x2f4cc8=_0x3a8e42,_0x5d4c19=this[_0x2f4cc8(0x39a)](),_0x24bdc5=this[_0x2f4cc8(0x1f8)](0x3,!![]),_0xef782c=this[_0x2f4cc8(0x3c8)]()?Graphics[_0x2f4cc8(0x361)]-_0x5d4c19:0x0,_0x438a2d=this['mainAreaTop']();return new Rectangle(_0xef782c,_0x438a2d,_0x5d4c19,_0x24bdc5);},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x32b)]=Scene_Skill[_0x3a8e42(0x348)]['statusWindowRect'],Scene_Skill['prototype'][_0x3a8e42(0x267)]=function(){const _0x2f9156=_0x3a8e42;return this['isUseSkillsStatesCoreUpdatedLayout']()?this[_0x2f9156(0x39b)]():VisuMZ[_0x2f9156(0x140)][_0x2f9156(0x32b)][_0x2f9156(0x371)](this);},Scene_Skill[_0x3a8e42(0x348)][_0x3a8e42(0x39b)]=function(){const _0x13ee70=_0x3a8e42,_0x1078bb=Graphics[_0x13ee70(0x361)]-this[_0x13ee70(0x39a)](),_0x561637=this['_skillTypeWindow'][_0x13ee70(0x304)],_0x5158d3=this['isRightInputMode']()?0x0:Graphics[_0x13ee70(0x361)]-_0x1078bb,_0x345ec9=this[_0x13ee70(0x15f)]();return new Rectangle(_0x5158d3,_0x345ec9,_0x1078bb,_0x561637);},VisuMZ['SkillsStatesCore'][_0x3a8e42(0x3db)]=Scene_Skill[_0x3a8e42(0x348)][_0x3a8e42(0x297)],Scene_Skill[_0x3a8e42(0x348)][_0x3a8e42(0x297)]=function(){const _0x54a6c1=_0x3a8e42;VisuMZ[_0x54a6c1(0x140)][_0x54a6c1(0x3db)][_0x54a6c1(0x371)](this),this[_0x54a6c1(0x393)]()&&this['createShopStatusWindow']();},VisuMZ['SkillsStatesCore']['Scene_Skill_itemWindowRect']=Scene_Skill['prototype'][_0x3a8e42(0x25b)],Scene_Skill[_0x3a8e42(0x348)][_0x3a8e42(0x25b)]=function(){const _0x20fa72=_0x3a8e42;if(this[_0x20fa72(0x387)]())return this[_0x20fa72(0x1b5)]();else{const _0x381e2a=VisuMZ[_0x20fa72(0x140)][_0x20fa72(0x19e)][_0x20fa72(0x371)](this);return this[_0x20fa72(0x393)]()&&this[_0x20fa72(0x176)]()&&(_0x381e2a['width']-=this[_0x20fa72(0x276)]()),_0x381e2a;}},Scene_Skill['prototype'][_0x3a8e42(0x1b5)]=function(){const _0xac7a9e=_0x3a8e42,_0x22577a=Graphics[_0xac7a9e(0x361)]-this[_0xac7a9e(0x276)](),_0x4894ca=this[_0xac7a9e(0x29d)]()-this[_0xac7a9e(0x287)][_0xac7a9e(0x304)],_0x158030=this['isRightInputMode']()?Graphics[_0xac7a9e(0x361)]-_0x22577a:0x0,_0x1efc3f=this[_0xac7a9e(0x287)]['y']+this[_0xac7a9e(0x287)][_0xac7a9e(0x304)];return new Rectangle(_0x158030,_0x1efc3f,_0x22577a,_0x4894ca);},Scene_Skill[_0x3a8e42(0x348)][_0x3a8e42(0x393)]=function(){const _0x20630a=_0x3a8e42;if(!Imported['VisuMZ_1_ItemsEquipsCore'])return![];else return this[_0x20630a(0x387)]()?!![]:VisuMZ['SkillsStatesCore']['Settings'][_0x20630a(0x37e)][_0x20630a(0x1b0)];},Scene_Skill[_0x3a8e42(0x348)][_0x3a8e42(0x176)]=function(){const _0x459aca=_0x3a8e42;return VisuMZ[_0x459aca(0x140)][_0x459aca(0x319)][_0x459aca(0x37e)][_0x459aca(0x289)];},Scene_Skill[_0x3a8e42(0x348)]['createShopStatusWindow']=function(){const _0x5953f5=_0x3a8e42,_0x40c1d4=this[_0x5953f5(0x38d)]();this[_0x5953f5(0x197)]=new Window_ShopStatus(_0x40c1d4),this[_0x5953f5(0x2a0)](this['_shopStatusWindow']),this[_0x5953f5(0x181)][_0x5953f5(0x38b)](this[_0x5953f5(0x197)]);const _0x39934f=VisuMZ[_0x5953f5(0x140)][_0x5953f5(0x319)][_0x5953f5(0x37e)][_0x5953f5(0x1f4)];this[_0x5953f5(0x197)][_0x5953f5(0x3fd)](_0x39934f||0x0);},Scene_Skill[_0x3a8e42(0x348)][_0x3a8e42(0x38d)]=function(){const _0x17942f=_0x3a8e42;return this[_0x17942f(0x387)]()?this[_0x17942f(0x1cd)]():VisuMZ[_0x17942f(0x140)][_0x17942f(0x319)]['Skills']['SkillMenuStatusRect'][_0x17942f(0x371)](this);},Scene_Skill[_0x3a8e42(0x348)]['shopStatusWindowRectSkillsStatesCore']=function(){const _0x4f102c=_0x3a8e42,_0x4c658c=this[_0x4f102c(0x276)](),_0x29c93c=this['_itemWindow'][_0x4f102c(0x304)],_0x2e1799=this[_0x4f102c(0x3c8)]()?0x0:Graphics['boxWidth']-this['shopStatusWidth'](),_0x41cb34=this[_0x4f102c(0x181)]['y'];return new Rectangle(_0x2e1799,_0x41cb34,_0x4c658c,_0x29c93c);},Scene_Skill['prototype'][_0x3a8e42(0x276)]=function(){const _0x45b9be=_0x3a8e42;return Imported['VisuMZ_1_ItemsEquipsCore']?Scene_Shop['prototype'][_0x45b9be(0x1e6)]():0x0;},Scene_Skill[_0x3a8e42(0x348)][_0x3a8e42(0x1f0)]=function(){const _0x493eeb=_0x3a8e42;return this[_0x493eeb(0x2ac)]&&this[_0x493eeb(0x2ac)][_0x493eeb(0x273)]?TextManager['buttonAssistSwitch']:'';},VisuMZ['SkillsStatesCore'][_0x3a8e42(0x3b5)]=Sprite_Gauge[_0x3a8e42(0x348)][_0x3a8e42(0x33c)],Sprite_Gauge[_0x3a8e42(0x348)][_0x3a8e42(0x33c)]=function(){const _0x55936a=_0x3a8e42;VisuMZ[_0x55936a(0x140)][_0x55936a(0x3b5)][_0x55936a(0x371)](this),this[_0x55936a(0x19b)]=null;},VisuMZ['SkillsStatesCore']['Sprite_Gauge_setup']=Sprite_Gauge[_0x3a8e42(0x348)][_0x3a8e42(0x1b1)],Sprite_Gauge[_0x3a8e42(0x348)][_0x3a8e42(0x1b1)]=function(_0xf16fd8,_0x2f7776){const _0x1089a2=_0x3a8e42;this[_0x1089a2(0x3ca)](_0xf16fd8,_0x2f7776),_0x2f7776=_0x2f7776['toLowerCase'](),VisuMZ[_0x1089a2(0x140)]['Sprite_Gauge_setup'][_0x1089a2(0x371)](this,_0xf16fd8,_0x2f7776);},Sprite_Gauge['prototype']['setupSkillsStatesCore']=function(_0x2178cc,_0x513d58){const _0x26e65=_0x3a8e42,_0x23fff2=VisuMZ[_0x26e65(0x140)][_0x26e65(0x319)][_0x26e65(0x353)]['filter'](_0x445566=>_0x445566[_0x26e65(0x2f5)]['toUpperCase']()===_0x513d58[_0x26e65(0x3f4)]());_0x23fff2[_0x26e65(0x231)]>=0x1?this[_0x26e65(0x19b)]=_0x23fff2[0x0]:this['_costSettings']=null;},VisuMZ['SkillsStatesCore'][_0x3a8e42(0x1d9)]=Sprite_Gauge[_0x3a8e42(0x348)][_0x3a8e42(0x403)],Sprite_Gauge[_0x3a8e42(0x348)]['currentValue']=function(){const _0x291849=_0x3a8e42;return this['_battler']&&this[_0x291849(0x19b)]?this[_0x291849(0x1b6)]():VisuMZ[_0x291849(0x140)]['Sprite_Gauge_currentValue'][_0x291849(0x371)](this);},Sprite_Gauge[_0x3a8e42(0x348)][_0x3a8e42(0x1b6)]=function(){const _0xd9dfac=_0x3a8e42;return this['_costSettings'][_0xd9dfac(0x357)]['call'](this[_0xd9dfac(0x3c6)]);},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x2f4)]=Sprite_Gauge[_0x3a8e42(0x348)]['currentMaxValue'],Sprite_Gauge['prototype'][_0x3a8e42(0x150)]=function(){const _0x1c74c3=_0x3a8e42;return this['_battler']&&this[_0x1c74c3(0x19b)]?this['currentMaxValueSkillsStatesCore']():VisuMZ[_0x1c74c3(0x140)][_0x1c74c3(0x2f4)]['call'](this);},Sprite_Gauge[_0x3a8e42(0x348)][_0x3a8e42(0x3c9)]=function(){const _0x342b7c=_0x3a8e42;return this[_0x342b7c(0x19b)]['GaugeMaxJS'][_0x342b7c(0x371)](this['_battler']);},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x27d)]=Sprite_Gauge[_0x3a8e42(0x348)][_0x3a8e42(0x2fe)],Sprite_Gauge[_0x3a8e42(0x348)][_0x3a8e42(0x2fe)]=function(){const _0x534742=_0x3a8e42,_0x4f5b10=VisuMZ[_0x534742(0x140)]['Sprite_Gauge_gaugeRate'][_0x534742(0x371)](this);return _0x4f5b10[_0x534742(0x215)](0x0,0x1);},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x31c)]=Sprite_Gauge[_0x3a8e42(0x348)][_0x3a8e42(0x36f)],Sprite_Gauge['prototype'][_0x3a8e42(0x36f)]=function(){const _0x2e4315=_0x3a8e42;this['_battler']&&this[_0x2e4315(0x19b)]?(this['bitmap']['clear'](),this[_0x2e4315(0x186)]()):VisuMZ[_0x2e4315(0x140)][_0x2e4315(0x31c)]['call'](this);},Sprite_Gauge[_0x3a8e42(0x348)][_0x3a8e42(0x2f0)]=function(){const _0x22be4b=_0x3a8e42;let _0x16d731=this['currentValue']();return Imported[_0x22be4b(0x3b9)]&&this['useDigitGrouping']()&&(_0x16d731=VisuMZ['GroupDigits'](_0x16d731)),_0x16d731;},Sprite_Gauge[_0x3a8e42(0x348)][_0x3a8e42(0x186)]=function(){const _0x4b46ac=_0x3a8e42;this['bitmap']['clear'](),this['_costSettings'][_0x4b46ac(0x384)][_0x4b46ac(0x371)](this);},Sprite_Gauge[_0x3a8e42(0x348)][_0x3a8e42(0x18e)]=function(_0x291948,_0x44df83,_0x511d6b,_0x58bf34,_0x51b372,_0x4dd19f){const _0x10ce3c=_0x3a8e42,_0x4b3766=this[_0x10ce3c(0x2fe)](),_0x405f99=Math[_0x10ce3c(0x370)]((_0x51b372-0x2)*_0x4b3766),_0x2a1984=_0x4dd19f-0x2,_0x3929ba=this[_0x10ce3c(0x309)]();this[_0x10ce3c(0x19d)][_0x10ce3c(0x3e5)](_0x511d6b,_0x58bf34,_0x51b372,_0x4dd19f,_0x3929ba),this[_0x10ce3c(0x19d)][_0x10ce3c(0x162)](_0x511d6b+0x1,_0x58bf34+0x1,_0x405f99,_0x2a1984,_0x291948,_0x44df83);},Sprite_Gauge[_0x3a8e42(0x348)][_0x3a8e42(0x1bb)]=function(){const _0x265f52=_0x3a8e42,_0xbe37f5=VisuMZ[_0x265f52(0x140)][_0x265f52(0x319)][_0x265f52(0x149)];return _0xbe37f5[_0x265f52(0x347)]==='number'?$gameSystem[_0x265f52(0x1e3)]():$gameSystem['mainFontFace']();},Sprite_Gauge[_0x3a8e42(0x348)]['labelFontSize']=function(){const _0x28b52f=_0x3a8e42,_0x2c94a0=VisuMZ[_0x28b52f(0x140)][_0x28b52f(0x319)]['Gauge'];return _0x2c94a0[_0x28b52f(0x347)]===_0x28b52f(0x254)?$gameSystem['mainFontSize']()-0x6:$gameSystem['mainFontSize']()-0x2;},Sprite_Gauge[_0x3a8e42(0x348)][_0x3a8e42(0x25e)]=function(){const _0x19acd9=_0x3a8e42,_0x24558e=VisuMZ['SkillsStatesCore']['Settings'][_0x19acd9(0x149)];return _0x24558e[_0x19acd9(0x2aa)]===_0x19acd9(0x254)?$gameSystem[_0x19acd9(0x1e3)]():$gameSystem[_0x19acd9(0x2a4)]();},Sprite_Gauge[_0x3a8e42(0x348)][_0x3a8e42(0x1e0)]=function(){const _0x32210d=_0x3a8e42,_0xc025a2=VisuMZ[_0x32210d(0x140)][_0x32210d(0x319)][_0x32210d(0x149)];return _0xc025a2[_0x32210d(0x2aa)]==='number'?$gameSystem[_0x32210d(0x2a9)]()-0x6:$gameSystem[_0x32210d(0x2a9)]()-0x2;},Sprite_Gauge[_0x3a8e42(0x348)]['labelColor']=function(){const _0x366583=_0x3a8e42,_0xce5b96=VisuMZ[_0x366583(0x140)][_0x366583(0x319)][_0x366583(0x149)];if(_0xce5b96[_0x366583(0x3e7)]){if(_0xce5b96['MatchLabelGaugeColor']===0x1)return this['gaugeColor1']();else{if(_0xce5b96[_0x366583(0x364)]===0x2)return this[_0x366583(0x2de)]();}}const _0x276e54=_0xce5b96['PresetLabelGaugeColor'];return ColorManager[_0x366583(0x2cf)](_0x276e54);},Sprite_Gauge[_0x3a8e42(0x348)]['labelOutlineColor']=function(){const _0x5546bc=_0x3a8e42,_0x7c4759=VisuMZ['SkillsStatesCore'][_0x5546bc(0x319)][_0x5546bc(0x149)];if(this['labelOutlineWidth']()<=0x0)return _0x5546bc(0x2fd);else return _0x7c4759[_0x5546bc(0x32d)]?_0x5546bc(0x2e7):ColorManager[_0x5546bc(0x3da)]();},Sprite_Gauge[_0x3a8e42(0x348)][_0x3a8e42(0x216)]=function(){const _0x4b8763=_0x3a8e42;return VisuMZ[_0x4b8763(0x140)]['Settings'][_0x4b8763(0x149)][_0x4b8763(0x261)]||0x0;},Sprite_Gauge[_0x3a8e42(0x348)][_0x3a8e42(0x327)]=function(){const _0x5b6db0=_0x3a8e42,_0x134834=VisuMZ[_0x5b6db0(0x140)]['Settings'][_0x5b6db0(0x149)];if(this['valueOutlineWidth']()<=0x0)return _0x5b6db0(0x2fd);else return _0x134834[_0x5b6db0(0x40b)]?'rgba(0,\x200,\x200,\x201)':ColorManager['outlineColor']();},Sprite_Gauge['prototype'][_0x3a8e42(0x333)]=function(){const _0x1da8ad=_0x3a8e42;return VisuMZ['SkillsStatesCore'][_0x1da8ad(0x319)][_0x1da8ad(0x149)][_0x1da8ad(0x2a8)]||0x0;},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x2b0)]=Sprite_StateIcon['prototype'][_0x3a8e42(0x360)],Sprite_StateIcon[_0x3a8e42(0x348)][_0x3a8e42(0x360)]=function(){const _0x3852d1=_0x3a8e42;VisuMZ[_0x3852d1(0x140)][_0x3852d1(0x2b0)]['call'](this),this[_0x3852d1(0x299)]();},Sprite_StateIcon['prototype'][_0x3a8e42(0x299)]=function(){const _0x13479d=_0x3a8e42,_0x81c432=Window_Base[_0x13479d(0x348)][_0x13479d(0x16f)]();this[_0x13479d(0x399)]=new Sprite(),this['_turnDisplaySprite']['bitmap']=new Bitmap(ImageManager[_0x13479d(0x305)],_0x81c432),this[_0x13479d(0x399)]['anchor']['x']=this[_0x13479d(0x367)]['x'],this[_0x13479d(0x399)]['anchor']['y']=this['anchor']['y'],this['addChild'](this['_turnDisplaySprite']),this[_0x13479d(0x24e)]=this[_0x13479d(0x399)]['bitmap'];},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x34e)]=Sprite_StateIcon[_0x3a8e42(0x348)][_0x3a8e42(0x1b8)],Sprite_StateIcon[_0x3a8e42(0x348)][_0x3a8e42(0x1b8)]=function(){const _0x42da72=_0x3a8e42;VisuMZ[_0x42da72(0x140)]['Sprite_StateIcon_updateFrame']['call'](this),this[_0x42da72(0x26f)]();},Sprite_StateIcon[_0x3a8e42(0x348)]['drawText']=function(_0x2aedfd,_0x401bd3,_0x352691,_0x4626c1,_0x46abca){const _0x2600f5=_0x3a8e42;this[_0x2600f5(0x24e)]['drawText'](_0x2aedfd,_0x401bd3,_0x352691,_0x4626c1,this[_0x2600f5(0x24e)][_0x2600f5(0x304)],_0x46abca);},Sprite_StateIcon[_0x3a8e42(0x348)][_0x3a8e42(0x26f)]=function(){const _0x4939ec=_0x3a8e42;this[_0x4939ec(0x214)](),this[_0x4939ec(0x24e)][_0x4939ec(0x26a)]();const _0xe76d8b=this[_0x4939ec(0x3c6)];if(!_0xe76d8b)return;const _0x164b41=_0xe76d8b['states']()[_0x4939ec(0x164)](_0x336e7d=>_0x336e7d[_0x4939ec(0x223)]>0x0),_0x5c72c1=[...Array(0x8)[_0x4939ec(0x1dc)]()][_0x4939ec(0x164)](_0x3261e6=>_0xe76d8b[_0x4939ec(0x298)](_0x3261e6)!==0x0),_0x3b849a=this[_0x4939ec(0x3f6)],_0x57bde1=_0x164b41[_0x3b849a];if(_0x57bde1)Window_Base['prototype'][_0x4939ec(0x18d)][_0x4939ec(0x371)](this,_0xe76d8b,_0x57bde1,0x0,0x0),Window_Base[_0x4939ec(0x348)][_0x4939ec(0x1ce)][_0x4939ec(0x371)](this,_0xe76d8b,_0x57bde1,0x0,0x0);else{const _0xd8a879=_0x5c72c1[_0x3b849a-_0x164b41[_0x4939ec(0x231)]];if(_0xd8a879===undefined)return;Window_Base[_0x4939ec(0x348)]['drawActorBuffTurns'][_0x4939ec(0x371)](this,_0xe76d8b,_0xd8a879,0x0,0x0),Window_Base['prototype'][_0x4939ec(0x1e9)][_0x4939ec(0x371)](this,_0xe76d8b,_0xd8a879,0x0,0x0);}},Sprite_StateIcon[_0x3a8e42(0x348)][_0x3a8e42(0x214)]=function(){const _0x384090=_0x3a8e42;this['contents'][_0x384090(0x3f7)]=$gameSystem['mainFontFace'](),this[_0x384090(0x24e)][_0x384090(0x1e8)]=$gameSystem[_0x384090(0x2a9)](),this[_0x384090(0x3e9)]();},Sprite_StateIcon[_0x3a8e42(0x348)][_0x3a8e42(0x3e9)]=function(){const _0x56efe9=_0x3a8e42;this[_0x56efe9(0x1bc)](ColorManager['normalColor']()),this[_0x56efe9(0x335)](ColorManager[_0x56efe9(0x3da)]());},Sprite_StateIcon[_0x3a8e42(0x348)][_0x3a8e42(0x1bc)]=function(_0x3387de){const _0x16c4cf=_0x3a8e42;this[_0x16c4cf(0x24e)][_0x16c4cf(0x1a7)]=_0x3387de;},Sprite_StateIcon['prototype']['changeOutlineColor']=function(_0x32a35e){const _0x34d6af=_0x3a8e42;this['contents'][_0x34d6af(0x3da)]=_0x32a35e;},Sprite_StateIcon[_0x3a8e42(0x348)][_0x3a8e42(0x2c6)]=function(){const _0x2ee6e1=_0x3a8e42;this[_0x2ee6e1(0x35e)]=!![],this[_0x2ee6e1(0x2d3)]();},Window_Base[_0x3a8e42(0x348)][_0x3a8e42(0x192)]=function(_0x41e410,_0x570614,_0x184797,_0x32b299,_0x245960){const _0x1c179f=_0x3a8e42,_0x51e743=this[_0x1c179f(0x352)](_0x41e410,_0x570614),_0x1e1031=this[_0x1c179f(0x3bf)](_0x51e743,_0x184797,_0x32b299,_0x245960),_0x5112aa=_0x184797+_0x245960-_0x1e1031[_0x1c179f(0x1eb)];this[_0x1c179f(0x2c5)](_0x51e743,_0x5112aa,_0x32b299,_0x245960),this[_0x1c179f(0x214)]();},Window_Base[_0x3a8e42(0x348)][_0x3a8e42(0x352)]=function(_0xdb995e,_0x4914b3){const _0x345c8a=_0x3a8e42;let _0x4560ae='';for(settings of VisuMZ[_0x345c8a(0x140)][_0x345c8a(0x319)][_0x345c8a(0x353)]){if(!this[_0x345c8a(0x1c9)](_0xdb995e,_0x4914b3,settings))continue;if(_0x4560ae[_0x345c8a(0x231)]>0x0)_0x4560ae+=this[_0x345c8a(0x275)]();_0x4560ae+=this[_0x345c8a(0x2cb)](_0xdb995e,_0x4914b3,settings);}_0x4560ae=this[_0x345c8a(0x2e1)](_0xdb995e,_0x4914b3,_0x4560ae);if(_0x4914b3[_0x345c8a(0x3ee)][_0x345c8a(0x159)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x4560ae[_0x345c8a(0x231)]>0x0)_0x4560ae+=this[_0x345c8a(0x275)]();_0x4560ae+=String(RegExp['$1']);}return _0x4560ae;},Window_Base['prototype'][_0x3a8e42(0x2e1)]=function(_0x3ddca9,_0x5a9d52,_0x3df75b){return _0x3df75b;},Window_Base[_0x3a8e42(0x348)][_0x3a8e42(0x1c9)]=function(_0x3a09dd,_0x170526,_0x1dec5f){const _0x377d45=_0x3a8e42;let _0xe8dd6f=_0x1dec5f['CalcJS'][_0x377d45(0x371)](_0x3a09dd,_0x170526);return _0xe8dd6f=_0x3a09dd[_0x377d45(0x1da)](_0x170526,_0xe8dd6f,_0x1dec5f),_0x1dec5f[_0x377d45(0x237)][_0x377d45(0x371)](_0x3a09dd,_0x170526,_0xe8dd6f,_0x1dec5f);},Window_Base['prototype'][_0x3a8e42(0x2cb)]=function(_0x3b9af7,_0x4927ba,_0x3cb0d5){const _0x57f237=_0x3a8e42;let _0x283344=_0x3cb0d5[_0x57f237(0x221)][_0x57f237(0x371)](_0x3b9af7,_0x4927ba);return _0x283344=_0x3b9af7[_0x57f237(0x1da)](_0x4927ba,_0x283344,_0x3cb0d5),_0x3cb0d5[_0x57f237(0x40d)]['call'](_0x3b9af7,_0x4927ba,_0x283344,_0x3cb0d5);},Window_Base[_0x3a8e42(0x348)][_0x3a8e42(0x275)]=function(){return'\x20';},Window_Base['prototype'][_0x3a8e42(0x3ed)]=function(_0x301295,_0x287e59,_0x1ac7d4,_0x48b358){const _0x23f96d=_0x3a8e42;if(!_0x301295)return;VisuMZ[_0x23f96d(0x140)][_0x23f96d(0x35a)][_0x23f96d(0x371)](this,_0x301295,_0x287e59,_0x1ac7d4,_0x48b358),this[_0x23f96d(0x311)](_0x301295,_0x287e59,_0x1ac7d4,_0x48b358);},Window_Base[_0x3a8e42(0x348)][_0x3a8e42(0x311)]=function(_0x3f7c75,_0x392bec,_0x298b9c,_0x7789c8){const _0xcddb84=_0x3a8e42;_0x7789c8=_0x7789c8||0x90;const _0x2c267c=ImageManager[_0xcddb84(0x305)],_0x257511=_0x3f7c75[_0xcddb84(0x321)]()[_0xcddb84(0x23b)](0x0,Math[_0xcddb84(0x370)](_0x7789c8/_0x2c267c)),_0x4622a1=_0x3f7c75[_0xcddb84(0x182)]()[_0xcddb84(0x164)](_0x3b7b02=>_0x3b7b02[_0xcddb84(0x223)]>0x0),_0x41e460=[...Array(0x8)[_0xcddb84(0x1dc)]()][_0xcddb84(0x164)](_0x1ec55f=>_0x3f7c75['buff'](_0x1ec55f)!==0x0),_0x373b84=[];let _0x130d2d=_0x392bec;for(let _0x550080=0x0;_0x550080<_0x257511[_0xcddb84(0x231)];_0x550080++){this[_0xcddb84(0x214)]();const _0x15ed2b=_0x4622a1[_0x550080];if(_0x15ed2b)!_0x373b84[_0xcddb84(0x328)](_0x15ed2b)&&this['drawActorStateTurns'](_0x3f7c75,_0x15ed2b,_0x130d2d,_0x298b9c),this[_0xcddb84(0x1ce)](_0x3f7c75,_0x15ed2b,_0x130d2d,_0x298b9c),_0x373b84['push'](_0x15ed2b);else{const _0x590fad=_0x41e460[_0x550080-_0x4622a1[_0xcddb84(0x231)]];this[_0xcddb84(0x1c2)](_0x3f7c75,_0x590fad,_0x130d2d,_0x298b9c),this['drawActorBuffRates'](_0x3f7c75,_0x590fad,_0x130d2d,_0x298b9c);}_0x130d2d+=_0x2c267c;}},Window_Base[_0x3a8e42(0x348)][_0x3a8e42(0x18d)]=function(_0x294d32,_0x1d66a0,_0x2c4df0,_0x3fa11f){const _0xfa1d95=_0x3a8e42;if(!VisuMZ['SkillsStatesCore'][_0xfa1d95(0x319)][_0xfa1d95(0x3b7)][_0xfa1d95(0x20a)])return;if(!_0x294d32['isStateAffected'](_0x1d66a0['id']))return;if(_0x1d66a0[_0xfa1d95(0x3c4)]===0x0)return;if(_0x1d66a0[_0xfa1d95(0x3ee)]['match'](/<HIDE STATE TURNS>/i))return;const _0x2639ce=_0x294d32['stateTurns'](_0x1d66a0['id']),_0x1004c=ImageManager[_0xfa1d95(0x305)],_0x36b79b=ColorManager[_0xfa1d95(0x146)](_0x1d66a0);this['changeTextColor'](_0x36b79b),this['changeOutlineColor']('rgba(0,\x200,\x200,\x201)'),this[_0xfa1d95(0x24e)][_0xfa1d95(0x3b3)]=!![],this[_0xfa1d95(0x24e)]['fontSize']=VisuMZ[_0xfa1d95(0x140)][_0xfa1d95(0x319)][_0xfa1d95(0x3b7)]['TurnFontSize'],_0x2c4df0+=VisuMZ[_0xfa1d95(0x140)][_0xfa1d95(0x319)][_0xfa1d95(0x3b7)]['TurnOffsetX'],_0x3fa11f+=VisuMZ[_0xfa1d95(0x140)]['Settings'][_0xfa1d95(0x3b7)]['TurnOffsetY'],this[_0xfa1d95(0x3ef)](_0x2639ce,_0x2c4df0,_0x3fa11f,_0x1004c,'right'),this[_0xfa1d95(0x24e)][_0xfa1d95(0x3b3)]=![],this[_0xfa1d95(0x214)]();},Window_Base[_0x3a8e42(0x348)][_0x3a8e42(0x1ce)]=function(_0x1e4bf9,_0x5706ee,_0x6d55f4,_0x34f09c){const _0x338261=_0x3a8e42;if(!VisuMZ[_0x338261(0x140)][_0x338261(0x319)][_0x338261(0x3b7)][_0x338261(0x2ad)])return;const _0x4b417d=ImageManager[_0x338261(0x305)],_0x291681=ImageManager[_0x338261(0x15a)]/0x2,_0x460162=ColorManager[_0x338261(0x3ac)]();this[_0x338261(0x1bc)](_0x460162),this[_0x338261(0x335)](_0x338261(0x2e7)),this[_0x338261(0x24e)][_0x338261(0x3b3)]=!![],this[_0x338261(0x24e)]['fontSize']=VisuMZ[_0x338261(0x140)][_0x338261(0x319)][_0x338261(0x3b7)]['DataFontSize'],_0x6d55f4+=VisuMZ[_0x338261(0x140)][_0x338261(0x319)][_0x338261(0x3b7)][_0x338261(0x2a2)],_0x34f09c+=VisuMZ['SkillsStatesCore'][_0x338261(0x319)]['States'][_0x338261(0x359)];const _0x4446af=String(_0x1e4bf9['getStateDisplay'](_0x5706ee['id']));this[_0x338261(0x3ef)](_0x4446af,_0x6d55f4,_0x34f09c,_0x4b417d,_0x338261(0x1d2)),this[_0x338261(0x24e)]['fontBold']=![],this[_0x338261(0x214)]();},Window_Base[_0x3a8e42(0x348)]['drawActorBuffTurns']=function(_0x5936ef,_0xcfc27a,_0x5e553d,_0xcb48d5){const _0x204463=_0x3a8e42;if(!VisuMZ[_0x204463(0x140)]['Settings']['Buffs'][_0x204463(0x20a)])return;const _0x2a0a38=_0x5936ef[_0x204463(0x298)](_0xcfc27a);if(_0x2a0a38===0x0)return;const _0x4cd72f=_0x5936ef[_0x204463(0x389)](_0xcfc27a),_0x175985=ImageManager[_0x204463(0x305)],_0x2dcfff=_0x2a0a38>0x0?ColorManager[_0x204463(0x366)]():ColorManager['debuffColor']();this[_0x204463(0x1bc)](_0x2dcfff),this[_0x204463(0x335)](_0x204463(0x2e7)),this[_0x204463(0x24e)][_0x204463(0x3b3)]=!![],this['contents']['fontSize']=VisuMZ[_0x204463(0x140)][_0x204463(0x319)][_0x204463(0x31f)]['TurnFontSize'],_0x5e553d+=VisuMZ[_0x204463(0x140)][_0x204463(0x319)][_0x204463(0x31f)][_0x204463(0x23c)],_0xcb48d5+=VisuMZ['SkillsStatesCore'][_0x204463(0x319)][_0x204463(0x31f)]['TurnOffsetY'],this[_0x204463(0x3ef)](_0x4cd72f,_0x5e553d,_0xcb48d5,_0x175985,_0x204463(0x381)),this[_0x204463(0x24e)][_0x204463(0x3b3)]=![],this[_0x204463(0x214)]();},Window_Base[_0x3a8e42(0x348)][_0x3a8e42(0x1e9)]=function(_0x1b1b93,_0x837b3e,_0x124634,_0x15e1ab){const _0x1e59ce=_0x3a8e42;if(!VisuMZ[_0x1e59ce(0x140)][_0x1e59ce(0x319)][_0x1e59ce(0x31f)][_0x1e59ce(0x2ad)])return;const _0x5e6448=_0x1b1b93[_0x1e59ce(0x208)](_0x837b3e),_0xecc64d=_0x1b1b93['buff'](_0x837b3e),_0x2e64c8=ImageManager['iconWidth'],_0x525955=ImageManager[_0x1e59ce(0x15a)]/0x2,_0x37bb7a=_0xecc64d>0x0?ColorManager[_0x1e59ce(0x366)]():ColorManager[_0x1e59ce(0x28e)]();this[_0x1e59ce(0x1bc)](_0x37bb7a),this[_0x1e59ce(0x335)](_0x1e59ce(0x2e7)),this[_0x1e59ce(0x24e)]['fontBold']=!![],this[_0x1e59ce(0x24e)][_0x1e59ce(0x1e8)]=VisuMZ[_0x1e59ce(0x140)]['Settings'][_0x1e59ce(0x31f)][_0x1e59ce(0x1f9)],_0x124634+=VisuMZ[_0x1e59ce(0x140)]['Settings']['Buffs'][_0x1e59ce(0x2a2)],_0x15e1ab+=VisuMZ[_0x1e59ce(0x140)][_0x1e59ce(0x319)][_0x1e59ce(0x31f)][_0x1e59ce(0x359)];const _0x72fef2=_0x1e59ce(0x17a)['format'](Math[_0x1e59ce(0x362)](_0x5e6448*0x64));this['drawText'](_0x72fef2,_0x124634,_0x15e1ab,_0x2e64c8,_0x1e59ce(0x1d2)),this[_0x1e59ce(0x24e)][_0x1e59ce(0x3b3)]=![],this[_0x1e59ce(0x214)]();},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x1bf)]=Window_StatusBase[_0x3a8e42(0x348)][_0x3a8e42(0x17d)],Window_StatusBase['prototype'][_0x3a8e42(0x17d)]=function(_0x12ba4a,_0x37a268,_0xb7118,_0x3986bf){const _0xcaa2a2=_0x3a8e42;if(_0x12ba4a[_0xcaa2a2(0x3f8)]())_0x37a268=this[_0xcaa2a2(0x330)](_0x12ba4a,_0x37a268);this[_0xcaa2a2(0x3a2)](_0x12ba4a,_0x37a268,_0xb7118,_0x3986bf);},Window_StatusBase['prototype'][_0x3a8e42(0x3a2)]=function(_0x5e4a58,_0x32b26e,_0x3e5c95,_0x7170c0){const _0x417327=_0x3a8e42;if(['none',_0x417327(0x3e3)][_0x417327(0x328)](_0x32b26e[_0x417327(0x3f5)]()))return;VisuMZ[_0x417327(0x140)][_0x417327(0x1bf)][_0x417327(0x371)](this,_0x5e4a58,_0x32b26e,_0x3e5c95,_0x7170c0);},Window_StatusBase['prototype'][_0x3a8e42(0x330)]=function(_0x24c2ac,_0x1cc3a6){const _0x5b7ce2=_0x3a8e42,_0x294c19=_0x24c2ac['currentClass']()[_0x5b7ce2(0x3ee)];if(_0x1cc3a6==='hp'&&_0x294c19['match'](/<REPLACE HP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x1cc3a6==='mp'&&_0x294c19[_0x5b7ce2(0x159)](/<REPLACE MP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else return _0x1cc3a6==='tp'&&_0x294c19['match'](/<REPLACE TP GAUGE:[ ](.*)>/i)?String(RegExp['$1']):_0x1cc3a6;}},VisuMZ[_0x3a8e42(0x140)]['Window_StatusBase_drawActorIcons']=Window_StatusBase[_0x3a8e42(0x348)][_0x3a8e42(0x3ed)],Window_StatusBase[_0x3a8e42(0x348)][_0x3a8e42(0x3ed)]=function(_0x2caea7,_0x1d9097,_0x9fcba2,_0x365134){const _0x4d3df7=_0x3a8e42;if(!_0x2caea7)return;Window_Base[_0x4d3df7(0x348)][_0x4d3df7(0x3ed)][_0x4d3df7(0x371)](this,_0x2caea7,_0x1d9097,_0x9fcba2,_0x365134);},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x241)]=Window_SkillType[_0x3a8e42(0x348)][_0x3a8e42(0x2ef)],Window_SkillType[_0x3a8e42(0x348)]['initialize']=function(_0x130201){const _0x47f9bb=_0x3a8e42;VisuMZ[_0x47f9bb(0x140)]['Window_SkillType_initialize'][_0x47f9bb(0x371)](this,_0x130201),this['createCommandNameWindow'](_0x130201);},Window_SkillType[_0x3a8e42(0x348)][_0x3a8e42(0x38c)]=function(_0x2c7dea){const _0xf465f9=_0x3a8e42,_0x1e0ac6=new Rectangle(0x0,0x0,_0x2c7dea[_0xf465f9(0x1eb)],_0x2c7dea['height']);this['_commandNameWindow']=new Window_Base(_0x1e0ac6),this['_commandNameWindow'][_0xf465f9(0x1af)]=0x0,this['addChild'](this[_0xf465f9(0x375)]),this['updateCommandNameWindow']();},Window_SkillType['prototype']['callUpdateHelp']=function(){const _0x3cb4c9=_0x3a8e42;Window_Command['prototype'][_0x3cb4c9(0x22d)][_0x3cb4c9(0x371)](this);if(this[_0x3cb4c9(0x375)])this[_0x3cb4c9(0x1fe)]();},Window_SkillType[_0x3a8e42(0x348)][_0x3a8e42(0x1fe)]=function(){const _0x5b578b=_0x3a8e42,_0x210a3a=this[_0x5b578b(0x375)];_0x210a3a[_0x5b578b(0x24e)]['clear']();const _0x4613d8=this[_0x5b578b(0x3e4)](this['index']());if(_0x4613d8===_0x5b578b(0x25a)&&this['maxItems']()>0x0){const _0x53d17f=this[_0x5b578b(0x2b3)](this[_0x5b578b(0x3e6)]());let _0x4c0389=this['commandName'](this['index']());_0x4c0389=_0x4c0389[_0x5b578b(0x324)](/\\I\[(\d+)\]/gi,''),_0x210a3a[_0x5b578b(0x214)](),this[_0x5b578b(0x341)](_0x4c0389,_0x53d17f),this[_0x5b578b(0x3f0)](_0x4c0389,_0x53d17f),this['commandNameWindowCenter'](_0x4c0389,_0x53d17f);}},Window_SkillType[_0x3a8e42(0x348)][_0x3a8e42(0x341)]=function(_0x3380ce,_0x48b1b4){},Window_SkillType[_0x3a8e42(0x348)]['commandNameWindowDrawText']=function(_0x5ca434,_0x20ed8e){const _0x5bd8c7=_0x3a8e42,_0x56c7fc=this['_commandNameWindow'];_0x56c7fc[_0x5bd8c7(0x3ef)](_0x5ca434,0x0,_0x20ed8e['y'],_0x56c7fc['innerWidth'],_0x5bd8c7(0x1d2));},Window_SkillType[_0x3a8e42(0x348)]['commandNameWindowCenter']=function(_0x3ff08b,_0x221fa9){const _0x3fa2fa=_0x3a8e42,_0x426eac=this[_0x3fa2fa(0x375)],_0x42a5cd=$gameSystem[_0x3fa2fa(0x22e)](),_0x3cc357=_0x221fa9['x']+Math[_0x3fa2fa(0x370)](_0x221fa9[_0x3fa2fa(0x1eb)]/0x2)+_0x42a5cd;_0x426eac['x']=_0x426eac[_0x3fa2fa(0x1eb)]/-0x2+_0x3cc357,_0x426eac['y']=Math[_0x3fa2fa(0x370)](_0x221fa9[_0x3fa2fa(0x304)]/0x2);},Window_SkillType[_0x3a8e42(0x348)][_0x3a8e42(0x2bc)]=function(){const _0x34cef3=_0x3a8e42;return Imported[_0x34cef3(0x3b9)]&&Window_Command['prototype'][_0x34cef3(0x2bc)][_0x34cef3(0x371)](this);},Window_SkillType[_0x3a8e42(0x348)][_0x3a8e42(0x252)]=function(){const _0x2f61ae=_0x3a8e42;if(!this[_0x2f61ae(0x310)])return;const _0x5e0f68=this[_0x2f61ae(0x310)]['skillTypes']();for(const _0x180025 of _0x5e0f68){const _0xe41325=this[_0x2f61ae(0x3d9)](_0x180025);this[_0x2f61ae(0x1a1)](_0xe41325,'skill',!![],_0x180025);}},Window_SkillType[_0x3a8e42(0x348)][_0x3a8e42(0x3d9)]=function(_0x201fe3){const _0x252e8d=_0x3a8e42;let _0x2e3260=$dataSystem['skillTypes'][_0x201fe3];if(_0x2e3260[_0x252e8d(0x159)](/\\I\[(\d+)\]/i))return _0x2e3260;if(this['commandStyle']()==='text')return _0x2e3260;const _0x2bf2d8=VisuMZ[_0x252e8d(0x140)][_0x252e8d(0x319)][_0x252e8d(0x37e)],_0x5cbfe5=$dataSystem[_0x252e8d(0x35b)][_0x252e8d(0x328)](_0x201fe3),_0x11edf5=_0x5cbfe5?_0x2bf2d8[_0x252e8d(0x32f)]:_0x2bf2d8[_0x252e8d(0x3cb)];return _0x252e8d(0x14b)['format'](_0x11edf5,_0x2e3260);},Window_SkillType['prototype'][_0x3a8e42(0x3cc)]=function(){const _0x565590=_0x3a8e42;return VisuMZ['SkillsStatesCore'][_0x565590(0x319)][_0x565590(0x37e)][_0x565590(0x193)];},Window_SkillType[_0x3a8e42(0x348)][_0x3a8e42(0x2f7)]=function(_0x3dda82){const _0x1551bc=_0x3a8e42,_0x2333b2=this[_0x1551bc(0x3e4)](_0x3dda82);if(_0x2333b2===_0x1551bc(0x379))this[_0x1551bc(0x318)](_0x3dda82);else _0x2333b2===_0x1551bc(0x25a)?this[_0x1551bc(0x234)](_0x3dda82):Window_Command[_0x1551bc(0x348)]['drawItem'][_0x1551bc(0x371)](this,_0x3dda82);},Window_SkillType[_0x3a8e42(0x348)][_0x3a8e42(0x2fc)]=function(){const _0x39395c=_0x3a8e42;return VisuMZ[_0x39395c(0x140)][_0x39395c(0x319)]['Skills']['CmdStyle'];},Window_SkillType[_0x3a8e42(0x348)][_0x3a8e42(0x3e4)]=function(_0x10f31c){const _0x2a4ea7=_0x3a8e42;if(_0x10f31c<0x0)return _0x2a4ea7(0x175);const _0x221de2=this[_0x2a4ea7(0x2fc)]();if(_0x221de2!==_0x2a4ea7(0x203))return _0x221de2;else{if(this[_0x2a4ea7(0x180)]()>0x0){const _0x2afc82=this['commandName'](_0x10f31c);if(_0x2afc82[_0x2a4ea7(0x159)](/\\I\[(\d+)\]/i)){const _0x31f639=this[_0x2a4ea7(0x2b3)](_0x10f31c),_0x100ace=this[_0x2a4ea7(0x3bf)](_0x2afc82)['width'];return _0x100ace<=_0x31f639['width']?_0x2a4ea7(0x379):_0x2a4ea7(0x25a);}}}return _0x2a4ea7(0x175);},Window_SkillType[_0x3a8e42(0x348)]['drawItemStyleIconText']=function(_0x58e7cc){const _0x43a03c=_0x3a8e42,_0x4e717d=this[_0x43a03c(0x2b3)](_0x58e7cc),_0x2c9fc2=this[_0x43a03c(0x315)](_0x58e7cc),_0x284fc4=this[_0x43a03c(0x3bf)](_0x2c9fc2)[_0x43a03c(0x1eb)];this[_0x43a03c(0x390)](this[_0x43a03c(0x2b9)](_0x58e7cc));const _0x5eb5b4=this[_0x43a03c(0x3cc)]();if(_0x5eb5b4==='right')this['drawTextEx'](_0x2c9fc2,_0x4e717d['x']+_0x4e717d[_0x43a03c(0x1eb)]-_0x284fc4,_0x4e717d['y'],_0x284fc4);else{if(_0x5eb5b4===_0x43a03c(0x1d2)){const _0x2d29b6=_0x4e717d['x']+Math[_0x43a03c(0x370)]((_0x4e717d[_0x43a03c(0x1eb)]-_0x284fc4)/0x2);this['drawTextEx'](_0x2c9fc2,_0x2d29b6,_0x4e717d['y'],_0x284fc4);}else this[_0x43a03c(0x2c5)](_0x2c9fc2,_0x4e717d['x'],_0x4e717d['y'],_0x284fc4);}},Window_SkillType[_0x3a8e42(0x348)][_0x3a8e42(0x234)]=function(_0x4bf3ae){const _0x31b49a=_0x3a8e42;this[_0x31b49a(0x315)](_0x4bf3ae)[_0x31b49a(0x159)](/\\I\[(\d+)\]/i);const _0x1341ba=Number(RegExp['$1'])||0x0,_0x56723a=this['itemLineRect'](_0x4bf3ae),_0x454c66=_0x56723a['x']+Math[_0x31b49a(0x370)]((_0x56723a['width']-ImageManager[_0x31b49a(0x305)])/0x2),_0x456315=_0x56723a['y']+(_0x56723a[_0x31b49a(0x304)]-ImageManager[_0x31b49a(0x15a)])/0x2;this['drawIcon'](_0x1341ba,_0x454c66,_0x456315);},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x1a9)]=Window_SkillStatus['prototype'][_0x3a8e42(0x3dc)],Window_SkillStatus['prototype']['refresh']=function(){const _0x5531c8=_0x3a8e42;VisuMZ[_0x5531c8(0x140)][_0x5531c8(0x1a9)]['call'](this);if(this['_actor'])this[_0x5531c8(0x19f)]();},Window_SkillStatus['prototype'][_0x3a8e42(0x19f)]=function(){const _0xab6c2c=_0x3a8e42;if(!Imported[_0xab6c2c(0x3b9)])return;if(!Imported[_0xab6c2c(0x244)])return;const _0x1318e4=this[_0xab6c2c(0x31a)]();let _0xd0f56d=this['colSpacing']()/0x2+0xb4+0xb4+0xb4,_0x245fe7=this[_0xab6c2c(0x1a3)]-_0xd0f56d-0x2;if(_0x245fe7>=0x12c){const _0x184ca0=VisuMZ['CoreEngine'][_0xab6c2c(0x319)][_0xab6c2c(0x1c3)][_0xab6c2c(0x14c)],_0x16a680=Math['floor'](_0x245fe7/0x2)-0x18;let _0x2b67fe=_0xd0f56d,_0x54a543=Math[_0xab6c2c(0x370)]((this[_0xab6c2c(0x1ad)]-Math['ceil'](_0x184ca0[_0xab6c2c(0x231)]/0x2)*_0x1318e4)/0x2),_0x493587=0x0;for(const _0x5f0577 of _0x184ca0){this['drawExtendedParameter'](_0x2b67fe,_0x54a543,_0x16a680,_0x5f0577),_0x493587++,_0x493587%0x2===0x0?(_0x2b67fe=_0xd0f56d,_0x54a543+=_0x1318e4):_0x2b67fe+=_0x16a680+0x18;}}this[_0xab6c2c(0x214)]();},Window_SkillStatus['prototype']['drawExtendedParameter']=function(_0x21ba9f,_0xcf6304,_0x260c13,_0x4a795b){const _0xefc9b6=_0x3a8e42,_0x13f806=this['gaugeLineHeight']();this[_0xefc9b6(0x214)](),this[_0xefc9b6(0x15c)](_0x21ba9f,_0xcf6304,_0x260c13,_0x4a795b,!![]),this['resetTextColor'](),this[_0xefc9b6(0x24e)]['fontSize']-=0x8;const _0x35f592=this[_0xefc9b6(0x310)][_0xefc9b6(0x2ff)](_0x4a795b,!![]);this[_0xefc9b6(0x24e)][_0xefc9b6(0x3ef)](_0x35f592,_0x21ba9f,_0xcf6304,_0x260c13,_0x13f806,'right');},VisuMZ[_0x3a8e42(0x140)]['Window_SkillList_includes']=Window_SkillList[_0x3a8e42(0x348)][_0x3a8e42(0x328)],Window_SkillList['prototype'][_0x3a8e42(0x328)]=function(_0x3c1e99){const _0x3c7d4a=_0x3a8e42;if(this[_0x3c7d4a(0x238)]<=0x0)return![];return this[_0x3c7d4a(0x183)](_0x3c1e99);},VisuMZ['SkillsStatesCore'][_0x3a8e42(0x1c1)]=Window_SkillList['prototype']['maxCols'],Window_SkillList[_0x3a8e42(0x348)]['maxCols']=function(){const _0x3d9f03=_0x3a8e42;return SceneManager[_0x3d9f03(0x308)]['constructor']===Scene_Battle?VisuMZ[_0x3d9f03(0x140)]['Window_SkillList_maxCols'][_0x3d9f03(0x371)](this):VisuMZ['SkillsStatesCore'][_0x3d9f03(0x319)][_0x3d9f03(0x37e)][_0x3d9f03(0x168)];},VisuMZ[_0x3a8e42(0x140)]['Window_SkillList_setActor']=Window_SkillList['prototype'][_0x3a8e42(0x174)],Window_SkillList[_0x3a8e42(0x348)][_0x3a8e42(0x174)]=function(_0x3a948e){const _0x20cf63=_0x3a8e42,_0x419eab=this['_actor']!==_0x3a948e;VisuMZ[_0x20cf63(0x140)]['Window_SkillList_setActor'][_0x20cf63(0x371)](this,_0x3a948e),_0x419eab&&(this[_0x20cf63(0x287)]&&this[_0x20cf63(0x287)]['constructor']===Window_ShopStatus&&this[_0x20cf63(0x287)][_0x20cf63(0x282)](this[_0x20cf63(0x2b7)](0x0)));},Window_SkillList[_0x3a8e42(0x348)]['setStypeId']=function(_0x32b557){const _0x457f23=_0x3a8e42;if(this[_0x457f23(0x238)]===_0x32b557)return;if(!_0x32b557)return;this[_0x457f23(0x238)]=_0x32b557,this[_0x457f23(0x3dc)](),this[_0x457f23(0x38a)](0x0,0x0),this[_0x457f23(0x287)]&&this[_0x457f23(0x287)][_0x457f23(0x1d4)]===Window_ShopStatus&&this[_0x457f23(0x287)][_0x457f23(0x282)](this['itemAt'](0x0));},Window_SkillList[_0x3a8e42(0x348)][_0x3a8e42(0x183)]=function(_0x4dcb6f){const _0x14750d=_0x3a8e42;if(!_0x4dcb6f)return VisuMZ[_0x14750d(0x140)]['Window_SkillList_includes']['call'](this,_0x4dcb6f);if(!this[_0x14750d(0x21c)](_0x4dcb6f))return![];if(!this[_0x14750d(0x165)](_0x4dcb6f))return![];if(!this[_0x14750d(0x295)](_0x4dcb6f))return![];return!![];},Window_SkillList[_0x3a8e42(0x348)][_0x3a8e42(0x21c)]=function(_0x2f4261){const _0x593021=_0x3a8e42;return DataManager[_0x593021(0x411)](_0x2f4261)[_0x593021(0x328)](this[_0x593021(0x238)]);},Window_SkillList[_0x3a8e42(0x348)][_0x3a8e42(0x165)]=function(_0x1fb899){const _0x24308e=_0x3a8e42;if(!VisuMZ[_0x24308e(0x140)][_0x24308e(0x3b2)](this[_0x24308e(0x310)],_0x1fb899))return![];if(!VisuMZ['SkillsStatesCore'][_0x24308e(0x365)](this['_actor'],_0x1fb899))return![];if(!VisuMZ[_0x24308e(0x140)][_0x24308e(0x34f)](this['_actor'],_0x1fb899))return![];return!![];},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x3b2)]=function(_0x36a804,_0x3c80c9){const _0x3e54c8=_0x3a8e42,_0x54112c=_0x3c80c9[_0x3e54c8(0x3ee)];if(_0x54112c['match'](/<HIDE IN BATTLE>/i)&&$gameParty[_0x3e54c8(0x2ee)]())return![];else return _0x54112c[_0x3e54c8(0x159)](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty[_0x3e54c8(0x2ee)]()?![]:!![];},VisuMZ[_0x3a8e42(0x140)]['CheckVisibleSwitchNotetags']=function(_0x4ec5ef,_0x4d1874){const _0x34cf67=_0x3a8e42,_0x4a2a38=_0x4d1874[_0x34cf67(0x3ee)];if(_0x4a2a38[_0x34cf67(0x159)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xc28dc2=JSON[_0x34cf67(0x1b3)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5e5cf5 of _0xc28dc2){if(!$gameSwitches[_0x34cf67(0x36c)](_0x5e5cf5))return![];}return!![];}if(_0x4a2a38[_0x34cf67(0x159)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xd836f2=JSON[_0x34cf67(0x1b3)]('['+RegExp['$1'][_0x34cf67(0x159)](/\d+/g)+']');for(const _0x565a11 of _0xd836f2){if(!$gameSwitches['value'](_0x565a11))return![];}return!![];}if(_0x4a2a38[_0x34cf67(0x159)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3a7b26=JSON['parse']('['+RegExp['$1'][_0x34cf67(0x159)](/\d+/g)+']');for(const _0xf496f1 of _0x3a7b26){if($gameSwitches[_0x34cf67(0x36c)](_0xf496f1))return!![];}return![];}if(_0x4a2a38[_0x34cf67(0x159)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5772f8=JSON[_0x34cf67(0x1b3)]('['+RegExp['$1'][_0x34cf67(0x159)](/\d+/g)+']');for(const _0xda9fd1 of _0x5772f8){if(!$gameSwitches[_0x34cf67(0x36c)](_0xda9fd1))return!![];}return![];}if(_0x4a2a38['match'](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3b83b2=JSON['parse']('['+RegExp['$1'][_0x34cf67(0x159)](/\d+/g)+']');for(const _0x120984 of _0x3b83b2){if(!$gameSwitches[_0x34cf67(0x36c)](_0x120984))return!![];}return![];}if(_0x4a2a38[_0x34cf67(0x159)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x39af9b=JSON[_0x34cf67(0x1b3)]('['+RegExp['$1'][_0x34cf67(0x159)](/\d+/g)+']');for(const _0x6a860d of _0x39af9b){if($gameSwitches[_0x34cf67(0x36c)](_0x6a860d))return![];}return!![];}return!![];},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x34f)]=function(_0x3ec94c,_0x3512f6){const _0x30231e=_0x3a8e42,_0x52045b=_0x3512f6['note'];if(_0x52045b[_0x30231e(0x159)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1b3bdb=JSON[_0x30231e(0x1b3)]('['+RegExp['$1'][_0x30231e(0x159)](/\d+/g)+']');for(const _0x15e6db of _0x1b3bdb){if(!_0x3ec94c['isLearnedSkill'](_0x15e6db))return![];}return!![];}else{if(_0x52045b[_0x30231e(0x159)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x19027d=RegExp['$1'][_0x30231e(0x2e9)](',');for(const _0x1cc4ad of _0x19027d){const _0x508821=DataManager[_0x30231e(0x378)](_0x1cc4ad);if(!_0x508821)continue;if(!_0x3ec94c[_0x30231e(0x290)](_0x508821))return![];}return!![];}}if(_0x52045b[_0x30231e(0x159)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3b0c81=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x50742a of _0x3b0c81){if(!_0x3ec94c['isLearnedSkill'](_0x50742a))return![];}return!![];}else{if(_0x52045b['match'](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x595b97=RegExp['$1'][_0x30231e(0x2e9)](',');for(const _0xcecad8 of _0x595b97){const _0x424cc8=DataManager[_0x30231e(0x378)](_0xcecad8);if(!_0x424cc8)continue;if(!_0x3ec94c[_0x30231e(0x290)](_0x424cc8))return![];}return!![];}}if(_0x52045b[_0x30231e(0x159)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x22880b=JSON['parse']('['+RegExp['$1'][_0x30231e(0x159)](/\d+/g)+']');for(const _0x4325fa of _0x22880b){if(_0x3ec94c['isLearnedSkill'](_0x4325fa))return!![];}return![];}else{if(_0x52045b[_0x30231e(0x159)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0xe1259c=RegExp['$1'][_0x30231e(0x2e9)](',');for(const _0x5d4d0b of _0xe1259c){const _0x15b264=DataManager['getSkillIdWithName'](_0x5d4d0b);if(!_0x15b264)continue;if(_0x3ec94c[_0x30231e(0x290)](_0x15b264))return!![];}return![];}}if(_0x52045b['match'](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5b6aa8=JSON[_0x30231e(0x1b3)]('['+RegExp['$1'][_0x30231e(0x159)](/\d+/g)+']');for(const _0x1e0489 of _0x5b6aa8){if(!_0x3ec94c[_0x30231e(0x290)](_0x1e0489))return!![];}return![];}else{if(_0x52045b[_0x30231e(0x159)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x179f2e=RegExp['$1'][_0x30231e(0x2e9)](',');for(const _0x4198c9 of _0x179f2e){const _0x1a0d00=DataManager['getSkillIdWithName'](_0x4198c9);if(!_0x1a0d00)continue;if(!_0x3ec94c[_0x30231e(0x290)](_0x1a0d00))return!![];}return![];}}if(_0x52045b['match'](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x554c54=JSON[_0x30231e(0x1b3)]('['+RegExp['$1'][_0x30231e(0x159)](/\d+/g)+']');for(const _0x50ef74 of _0x554c54){if(!_0x3ec94c[_0x30231e(0x290)](_0x50ef74))return!![];}return![];}else{if(_0x52045b['match'](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x24c8da=RegExp['$1'][_0x30231e(0x2e9)](',');for(const _0x2a742e of _0x24c8da){const _0xe488f1=DataManager[_0x30231e(0x378)](_0x2a742e);if(!_0xe488f1)continue;if(!_0x3ec94c[_0x30231e(0x290)](_0xe488f1))return!![];}return![];}}if(_0x52045b['match'](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x56e6bc=JSON[_0x30231e(0x1b3)]('['+RegExp['$1'][_0x30231e(0x159)](/\d+/g)+']');for(const _0x2d7171 of _0x56e6bc){if(_0x3ec94c[_0x30231e(0x290)](_0x2d7171))return![];}return!![];}else{if(_0x52045b[_0x30231e(0x159)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0xad4e84=RegExp['$1'][_0x30231e(0x2e9)](',');for(const _0x1d520f of _0xad4e84){const _0x176f85=DataManager[_0x30231e(0x378)](_0x1d520f);if(!_0x176f85)continue;if(_0x3ec94c[_0x30231e(0x290)](_0x176f85))return![];}return!![];}}if(_0x52045b[_0x30231e(0x159)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x477da5=JSON[_0x30231e(0x1b3)]('['+RegExp['$1'][_0x30231e(0x159)](/\d+/g)+']');for(const _0x43ff8f of _0x477da5){if(!_0x3ec94c[_0x30231e(0x24d)](_0x43ff8f))return![];}return!![];}else{if(_0x52045b[_0x30231e(0x159)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x574e53=RegExp['$1']['split'](',');for(const _0xc3fd19 of _0x574e53){const _0x40a847=DataManager[_0x30231e(0x378)](_0xc3fd19);if(!_0x40a847)continue;if(!_0x3ec94c['hasSkill'](_0x40a847))return![];}return!![];}}if(_0x52045b[_0x30231e(0x159)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5d93f5=JSON[_0x30231e(0x1b3)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x38bbf9 of _0x5d93f5){if(!_0x3ec94c[_0x30231e(0x24d)](_0x38bbf9))return![];}return!![];}else{if(_0x52045b[_0x30231e(0x159)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x18a0ae=RegExp['$1'][_0x30231e(0x2e9)](',');for(const _0x2ee274 of _0x18a0ae){const _0x355dc1=DataManager[_0x30231e(0x378)](_0x2ee274);if(!_0x355dc1)continue;if(!_0x3ec94c[_0x30231e(0x24d)](_0x355dc1))return![];}return!![];}}if(_0x52045b[_0x30231e(0x159)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5e69ac=JSON[_0x30231e(0x1b3)]('['+RegExp['$1'][_0x30231e(0x159)](/\d+/g)+']');for(const _0x2beccd of _0x5e69ac){if(_0x3ec94c[_0x30231e(0x24d)](_0x2beccd))return!![];}return![];}else{if(_0x52045b['match'](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x16ff51=RegExp['$1'][_0x30231e(0x2e9)](',');for(const _0x306346 of _0x16ff51){const _0x3b1d3a=DataManager[_0x30231e(0x378)](_0x306346);if(!_0x3b1d3a)continue;if(_0x3ec94c[_0x30231e(0x24d)](_0x3b1d3a))return!![];}return![];}}if(_0x52045b['match'](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x471d25=JSON[_0x30231e(0x1b3)]('['+RegExp['$1'][_0x30231e(0x159)](/\d+/g)+']');for(const _0x4191a9 of _0x471d25){if(!_0x3ec94c[_0x30231e(0x24d)](_0x4191a9))return!![];}return![];}else{if(_0x52045b[_0x30231e(0x159)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x9e9458=RegExp['$1'][_0x30231e(0x2e9)](',');for(const _0x3f748c of _0x9e9458){const _0x2ec0da=DataManager[_0x30231e(0x378)](_0x3f748c);if(!_0x2ec0da)continue;if(!_0x3ec94c[_0x30231e(0x24d)](_0x2ec0da))return!![];}return![];}}if(_0x52045b['match'](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2199b8=JSON[_0x30231e(0x1b3)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5982e3 of _0x2199b8){if(!_0x3ec94c[_0x30231e(0x24d)](_0x5982e3))return!![];}return![];}else{if(_0x52045b[_0x30231e(0x159)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x26b536=RegExp['$1']['split'](',');for(const _0xae5adb of _0x26b536){const _0x33b808=DataManager[_0x30231e(0x378)](_0xae5adb);if(!_0x33b808)continue;if(!_0x3ec94c[_0x30231e(0x24d)](_0x33b808))return!![];}return![];}}if(_0x52045b['match'](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x440257=JSON[_0x30231e(0x1b3)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3dadf3 of _0x440257){if(_0x3ec94c[_0x30231e(0x24d)](_0x3dadf3))return![];}return!![];}else{if(_0x52045b[_0x30231e(0x159)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0xcd38c9=RegExp['$1'][_0x30231e(0x2e9)](',');for(const _0x58d766 of _0xcd38c9){const _0x37955c=DataManager[_0x30231e(0x378)](_0x58d766);if(!_0x37955c)continue;if(_0x3ec94c['hasSkill'](_0x37955c))return![];}return!![];}}return!![];},Window_SkillList[_0x3a8e42(0x348)][_0x3a8e42(0x295)]=function(_0xf1acf1){const _0x2a1b1e=_0x3a8e42,_0xd7e415=_0xf1acf1[_0x2a1b1e(0x3ee)],_0x3b27f0=VisuMZ[_0x2a1b1e(0x140)]['skillVisibleJS'];return _0x3b27f0[_0xf1acf1['id']]?_0x3b27f0[_0xf1acf1['id']][_0x2a1b1e(0x371)](this,_0xf1acf1):!![];},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x2f8)]=Window_SkillList['prototype'][_0x3a8e42(0x1f2)],Window_SkillList[_0x3a8e42(0x348)][_0x3a8e42(0x1f2)]=function(){const _0x943ddc=_0x3a8e42;VisuMZ[_0x943ddc(0x140)]['Window_SkillList_makeItemList'][_0x943ddc(0x371)](this),this[_0x943ddc(0x3d7)]()&&this['sortSkillList'](),this[_0x943ddc(0x3d1)]()&&this[_0x943ddc(0x3e8)]();},Window_SkillList[_0x3a8e42(0x348)][_0x3a8e42(0x3d7)]=function(){return!![];},Window_SkillList['prototype'][_0x3a8e42(0x3f2)]=function(){const _0x1caa39=_0x3a8e42,_0x515b7b=VisuMZ[_0x1caa39(0x140)][_0x1caa39(0x319)][_0x1caa39(0x37e)][_0x1caa39(0x161)]||[];return _0x515b7b&&_0x515b7b['includes'](this[_0x1caa39(0x238)])?this[_0x1caa39(0x151)][_0x1caa39(0x408)]((_0x13a770,_0x463ff4)=>{const _0x31af7d=_0x1caa39;if(!!_0x13a770&&!!_0x463ff4)return _0x13a770[_0x31af7d(0x20f)]['localeCompare'](_0x463ff4[_0x31af7d(0x20f)]);return 0x0;}):VisuMZ[_0x1caa39(0x140)][_0x1caa39(0x256)](this[_0x1caa39(0x151)]),this[_0x1caa39(0x151)];},VisuMZ[_0x3a8e42(0x140)]['SortByIDandPriority']=function(_0x31dfbc){return _0x31dfbc['sort']((_0x2e5ffd,_0x1dac21)=>{const _0x36ee5f=_0x3946;if(!!_0x2e5ffd&&!!_0x1dac21){if(_0x2e5ffd[_0x36ee5f(0x225)]===undefined)VisuMZ['SkillsStatesCore']['Parse_Notetags_Skill_Sorting'](_0x2e5ffd);if(_0x1dac21['sortPriority']===undefined)VisuMZ[_0x36ee5f(0x140)][_0x36ee5f(0x1d1)](_0x1dac21);const _0x29eff8=_0x2e5ffd[_0x36ee5f(0x225)],_0x2b3bb5=_0x1dac21['sortPriority'];if(_0x29eff8!==_0x2b3bb5)return _0x2b3bb5-_0x29eff8;return _0x2e5ffd['id']-_0x1dac21['id'];}return 0x0;}),_0x31dfbc;},VisuMZ['SkillsStatesCore'][_0x3a8e42(0x17c)]=function(_0x2a4594){const _0x74b8e6=_0x3a8e42;return _0x2a4594[_0x74b8e6(0x408)]((_0x89e2a6,_0x1f56ad)=>{const _0x2a83b9=_0x74b8e6,_0x3adc59=$dataSkills[_0x89e2a6],_0x164c4c=$dataSkills[_0x1f56ad];if(!!_0x3adc59&&!!_0x164c4c){if(_0x3adc59[_0x2a83b9(0x225)]===undefined)VisuMZ[_0x2a83b9(0x140)][_0x2a83b9(0x1d1)](_0x3adc59);if(_0x164c4c['sortPriority']===undefined)VisuMZ[_0x2a83b9(0x140)][_0x2a83b9(0x1d1)](_0x164c4c);const _0x24939a=_0x3adc59[_0x2a83b9(0x225)],_0x35d7e3=_0x164c4c[_0x2a83b9(0x225)];if(_0x24939a!==_0x35d7e3)return _0x35d7e3-_0x24939a;return _0x89e2a6-_0x1f56ad;}return 0x0;}),_0x2a4594;},Window_SkillList[_0x3a8e42(0x348)][_0x3a8e42(0x3d1)]=function(){const _0x44081b=_0x3a8e42;if(!this['_actor'])return![];if(['skillLearn',_0x44081b(0x313),_0x44081b(0x249)][_0x44081b(0x328)](this[_0x44081b(0x238)]))return![];return!![];},Window_SkillList[_0x3a8e42(0x348)][_0x3a8e42(0x3e8)]=function(){const _0x2a4fd3=_0x3a8e42,_0x4d88dc=this[_0x2a4fd3(0x310)]['states']();for(const _0x2c963b of _0x4d88dc){const _0x2a3992=DataManager[_0x2a4fd3(0x28d)](_0x2c963b);for(const _0x455d9d in _0x2a3992){const _0x35d8ac=$dataSkills[Number(_0x455d9d)]||null,_0x2553bd=$dataSkills[Number(_0x2a3992[_0x455d9d])]||null;while(this['_data'][_0x2a4fd3(0x328)](_0x35d8ac)){const _0x3e149f=this[_0x2a4fd3(0x151)][_0x2a4fd3(0x3d5)](_0x35d8ac);this[_0x2a4fd3(0x151)][_0x3e149f]=_0x2553bd;}}}},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x40f)]=Window_SkillList[_0x3a8e42(0x348)][_0x3a8e42(0x2f7)],Window_SkillList['prototype']['drawItem']=function(_0x574c0b){const _0x3deac2=_0x3a8e42,_0x3d2546=this['itemAt'](_0x574c0b),_0x17a20b=_0x3d2546?_0x3d2546[_0x3deac2(0x20f)]:'';if(_0x3d2546)this[_0x3deac2(0x373)](_0x3d2546);VisuMZ[_0x3deac2(0x140)]['Window_SkillList_drawItem'][_0x3deac2(0x371)](this,_0x574c0b);if(_0x3d2546)_0x3d2546[_0x3deac2(0x20f)]=_0x17a20b;},Window_SkillList[_0x3a8e42(0x348)][_0x3a8e42(0x373)]=function(_0x4f2ddf){const _0x41f8b7=_0x3a8e42;if(_0x4f2ddf&&_0x4f2ddf[_0x41f8b7(0x3ee)][_0x41f8b7(0x159)](/<LIST NAME:[ ](.*)>/i)){_0x4f2ddf[_0x41f8b7(0x20f)]=String(RegExp['$1'])[_0x41f8b7(0x217)]();for(;;){if(_0x4f2ddf[_0x41f8b7(0x20f)][_0x41f8b7(0x159)](/\\V\[(\d+)\]/gi))_0x4f2ddf[_0x41f8b7(0x20f)]=_0x4f2ddf[_0x41f8b7(0x20f)][_0x41f8b7(0x324)](/\\V\[(\d+)\]/gi,(_0x5d4233,_0x4d2c03)=>$gameVariables['value'](parseInt(_0x4d2c03)));else break;}}},Window_SkillList['prototype']['drawSkillCost']=function(_0x3d3f6b,_0x93119b,_0x1ad211,_0x45b5ca){const _0x2b7381=_0x3a8e42;Window_Base[_0x2b7381(0x348)][_0x2b7381(0x192)][_0x2b7381(0x371)](this,this[_0x2b7381(0x310)],_0x3d3f6b,_0x93119b,_0x1ad211,_0x45b5ca);},Window_SkillList[_0x3a8e42(0x348)][_0x3a8e42(0x38b)]=function(_0x2e07af){const _0x4b172b=_0x3a8e42;this[_0x4b172b(0x287)]=_0x2e07af,this[_0x4b172b(0x22d)]();},VisuMZ[_0x3a8e42(0x140)][_0x3a8e42(0x1ed)]=Window_SkillList[_0x3a8e42(0x348)]['updateHelp'],Window_SkillList[_0x3a8e42(0x348)][_0x3a8e42(0x339)]=function(){const _0x175bc1=_0x3a8e42;VisuMZ['SkillsStatesCore'][_0x175bc1(0x1ed)][_0x175bc1(0x371)](this),this['_statusWindow']&&this[_0x175bc1(0x287)][_0x175bc1(0x1d4)]===Window_ShopStatus&&this[_0x175bc1(0x287)]['setItem'](this[_0x175bc1(0x3c0)]());};