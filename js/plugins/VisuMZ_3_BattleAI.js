//=============================================================================
// VisuStella MZ - Battle A.I.
// VisuMZ_3_BattleAI.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_BattleAI = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleAI = VisuMZ.BattleAI || {};
VisuMZ.BattleAI.version = 1.28;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.28] [BattleAI]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_AI_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This Battle A.I. plugin changes up how enemies and any Auto Battle actors
 * behave by implementing many new key components to their decision making
 * process in battle. These new compotents are: A.I. Styles, A.I. Levels, 
 * Rating Variance, A.I. Conditions, and Influencing TGR Weight.
 *
 * With these new key components put together, you can transform RPG Maker MZ's
 * highly primitive A.I. into something more intelligent. Auto Battle actors
 * can also base their A.I. patterns off an enemy's A.I. in order to behave in
 * more desirable ways during battle as well.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Different A.I. Styles to allow for various ways to setup enemy A.I.
 * * Set A.I. Levels for enemies and Auto Battle actors.
 * * A.I. Levels can be set on a global scale or individual scale.
 * * Set rating variance levels to prioritize actions or randomize them.
 * * These include notetags to change them on a per individual basis.
 * * Create action conditions to make certain skills usable by the A.I. under
 *   specific circumstances.
 * * Action conditions are split between 'ALL' and 'ANY' types which require
 *   either all conditions to be met or at least one condition to be met.
 * * A large selection of condition notetags to use to help customize the best
 *   case situations on when to use a skill and which target to pick.
 * * Default condition settings can be made in the Plugin Parameters to make an
 *   entire database of skills become conditional for A.I. usage.
 * * Influence TGR weight to make certain targets more desirable for specific
 *   types of actions.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * - VisuMZ_1_BattleCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
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
 * Auto Battle A.I. for Actors
 *
 * - With this plugin, there is an option to let certain classes reference
 * specific enemy A.I. patterns to decide which skills to use during battle.
 * If the reference option is not used, the actor will use default Auto Battle
 * evaluations to determine which skills to use instead.
 *
 * ---
 * 
 * A.I. Styles
 * 
 * - There are currently four different A.I. Styles. Actors and enemies can
 * default to a different one globally, or changed individually using notetags.
 * Read more about them in the A.I. Styles section.
 * 
 * ---
 *
 * A.I. Levels
 *
 * - Enemies and actors can be given different A.I. Levels. The higher one's
 * A.I. Level, the more they are to follow conditions. With Level 100 A.I.
 * Level, an A.I. will never disobey a condition. On the other hand, lower
 * A.I. Levels may possibly ignore certain conditions and act as if they are
 * fulfilled.
 *
 * ---
 *
 * A.I. Rating Variance
 *
 * - In the RPG Maker database editor, when deciding an enemy's Action Patterns
 * you can decide on the action's "rating". The rating is a value from 1 to 9
 * where 9 gets the highest priority and 1 gets the lowest. RPG Maker, by
 * default, will sometimes dip the rating a few levels lower to allow lower
 * ratings and bypass the priority system.
 *
 * - This plugin allows you to set the variance level through Plugin Parameters
 * on a global scale or notetags on an individual basis to allow for larger,
 * smaller, or no variance on ratings at all.
 *
 * ---
 *
 * A.I. Conditions for Skill Usage
 *
 * - Enemies and any actors that use Auto Battle A.I. with a reference can only
 * use certain skills as long as specific conditions have been met. These
 * conditions are split between 'ALL' condition sets and 'ANY' condition sets.
 *
 * - 'ALL' condition sets require all of the set's conditions to be met in
 * order for the skill to be used by the A.I.
 *
 * - 'ANY' condition sets require at least one of the set's conditions to be
 * met in order for the skill to be used by the A.I.
 *
 * - A variety of conditions can be inserted into each condition set to make
 * for some very specific usage conditions. These will also help filter out
 * which targets to pick from, too.
 *
 * ---
 *
 * TGR Weight on A.I. Target Selection
 *
 * - TGR is a special parameter in RPG Maker MZ that represents "Target Rate".
 * The higher one's TGR, the more likely they are to become the target of an
 * attack. This plugin allows various things to influence the TGR weight to
 * make certain targets more likely to be targets for attack.
 *
 * - Elemental influence rates on the TGR weight mean that if a target receives
 * more damage from an elemental attack, the TGR weight becomes higher for that
 * skill when determining a target. The higher the elemental damage received,
 * the more the TGR weight shifts upward.
 *
 * - Evasion and Magic Evasion rates do the opposite. The higher a potential
 * target's evasion and magic evasion rate is (for physical and magical skills)
 * the lower the TGR weight becomes for that potential target.
 *
 * - By default Plugin Parameter settings, TGR weight shifting requires the
 * enemy troop to have "knowledge" on the party's element rates, evasion, and
 * magic evasion properties. Enemy troops would have to hit actors with element
 * based attacks to learn the actor's resistance levels, physical attacks to
 * learn the actor's evasion, and magical attacks to learn the actor's magic
 * evasion levels.
 *
 * ---
 *
 * ============================================================================
 * A.I. Styles
 * ============================================================================
 * 
 * There are currently four different A.I. Styles. These determine how the
 * A.I. acts and behaves. You can change the A.I. Style used globally through
 * the Plugin Parameters or individually for classes and enemies through the
 * usage of notetags.
 * 
 * Read below to understand each style and its rules:
 * 
 * ---
 * 
 * Classic Style
 * 
 * "Classic" style is the traditional and default RPG Maker MZ A.I. style.
 * It puts emphasis on the Rating system, where skills with higher ratings are
 * given more priority than skills with lower ratings within variance.
 * 
 * - Action Pattern conditions must be met.
 * - Skill must be usable (able to pay its cost and it isn't disabled).
 * - Skill A.I. conditions must be met.
 * - Priority is given towards actions with higher Ratings.
 * - Rating variance will be determined by Plugin Parameters and/or notetags.
 * - A.I. Level can affect whether or not A.I. Conditions would be ignored.
 * - After applying Ratings, Rating Variances, and A.I. Conditions, if there
 *   are still multiple actions to choose from, pick from the remaining actions
 *   randomly.
 * - If no actions are valid, then do nothing.
 * 
 * ---
 * 
 * Gambit Style
 * 
 * - "Gambit" style is the style from Yanfly Engine Plugin's Battle A.I. Core.
 * It goes down the list of skills with top-down priority as long as they meet
 * the Action Pattern conditions and A.I. conditions. Ratings will be ignored.
 * 
 * - Priority starts from top of skill list and goes to bottom of skill list.
 * - Action Pattern conditions must be met.
 * - Skill must be usable (able to pay its cost and it isn't disabled).
 * - Skill A.I. conditions must be met.
 * - Priority is given towards actions located higher on the list.
 * - Actions towards the bottom of the list will have lower priority.
 * - Ratings and Rating Variance has no bearing on whether or not an action
 *   will be picked.
 * - A.I. Level can affect whether or not A.I. Conditions would be ignored.
 * - If no actions are valid, then do nothing.
 * 
 * ---
 * 
 * Casual Style
 * 
 * - "Casual" style takes a lighter approach to A.I. It ignores the Ratings
 * system and doesn't care about the order of actions either. Instead, the
 * only thing this A.I. Style cares about are the A.I. Conditions. All valid
 * actions after that are randomly picked from.
 * 
 * - Action Pattern conditions must be met.
 * - Skill must be usable (able to pay its cost and it isn't disabled).
 * - Skill A.I. conditions must be met.
 * - There is no priority system for Ratings or Order.
 * - A.I. Level does not matter here.
 * - A random action will be selected from a group of remaining valid actions.
 * - If no actions are valid, then do nothing.
 * 
 * ---
 * 
 * Random Style
 * 
 * - "Random" style simply does not care about ratings or order. It only cares
 * if the skill's can be used (can pay for the cost) and Action Pattern
 * conditions. It does not care about A.I. Conditions, Ratings, or Order.
 * 
 * - Action Pattern conditions must be met.
 * - Skill must be usable (able to pay its cost and it isn't disabled).
 * - Skill A.I. conditions are ignored.
 * - There is no priority system for Ratings or Order.
 * - A.I. Level does not matter here.
 * - A random action will be selected from a group of remaining valid actions.
 * - If no actions are valid, then do nothing.
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
 * === General A.I. Settings Notetags ===
 *
 * These notetags set the general A.I. related settings for enemies and any
 * actors that use A.I. (requires Auto Battle and has a reference A.I.).
 *
 * ---
 * 
 * <AI Style: x>
 * 
 * - Used for: Class, Enemy Notetags
 * - Replace 'x' with 'Classic', 'Gambit', 'Casual', or 'Random' without the
 *   quotes. Example: <AI Style: Gambit>
 * - Determines the A.I. style used. Refer to the A.I. Styles section on the
 *   various types of styles.
 * - For actors, place this inside the associated class's notebox instead.
 * - For actors, this does not apply if there is no referenced enemy A.I. list.
 * - Setup the reference enemy through either the Plugin Parameters or by using
 *   the <Reference AI: Enemy id> notetag found below.
 * 
 * ---
 *
 * <AI Level: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Designates the unit's A.I. level if A.I. is to be used.
 * - Replace 'x' with a number from 0 to 100.
 * - Units with higher A.I. Levels will be more strict about conditions.
 * - Units with lower A.I. Levels will be more lax about conditions.
 *
 * ---
 *
 * <AI Rating Variance: x>
 * 
 * - Used for: Actor, Enemy Notetags
 * - Sets the variance amount when determining A.I. actions by rating.
 * - Replace 'x' with a number between 0 and 9.
 * - 0 for no variance.
 * - Lower numbers for less variance.
 * - Higher numbers for more variance.
 *
 * ---
 *
 * <Reference AI: Enemy id>
 * <Reference AI: name>
 *
 * - Used for: Class Notetags
 * - Causes any actor using this class that has the Auto Battle trait to use
 *   a specific enemy's attack pattern (ratings, conditions, etc.) to determine
 *   which skill to use in battle.
 * - Replace 'id' with a number representing the enemy's ID to reference.
 * - Replace 'name' with the name the enemy to reference.
 * - Actors are only able to use skills they would normally have access to.
 *   - Actors need to have LEARNED the skill.
 *   - Actors need to be able to access the skill's SKILL TYPE.
 *   - Actors need to have the RESOURCES to pay for the skill.
 * - If you cannot figure out why an auto battle actor cannot use a specific
 *   skill, turn OFF auto battle and see if you can use the skill normally.
 *
 * ---
 *
 * <No Reference AI>
 *
 * - Used for: Class Notetags
 * - Prevents the class from using any enemies as their reference A.I. pattern
 *   (including the one set in the Plugin Parameters).
 *
 * ---
 *
 * === Skill A.I. Condition Notetags ===
 *
 * Insert these notetags into the noteboxes of skills that you'd like to give
 * custom A.I. conditions for. The 'All' version of the notetags require every
 * condition to be met while the 'Any' version of the notetags require only one
 * of the conditions to be met. 
 *
 * If both are used together, then the 'All' conditions must be completely
 * fulfilled while the 'Any' conditions need only one to be fulfilled.
 *
 * ---
 *
 * <All AI Conditions>
 *  condition
 *  condition
 *  condition
 * </All AI Conditions>
 * 
 * - Used for: Skill
 * - Add/remove as many conditions as needed for the skill.
 * - All conditions must be met in order for this to become a valid skill for
 *   the AI to use.
 * - This can be used together with <Any AI Conditions>. If either of these
 *   notetags exist, do not use the Plugin Parameter defaul conditions.
 * - This will not inherit default 'All' conditions in the Plugin Parameters.
 * - Replace 'condition' with any of the following Condition List below.
 *
 * ---
 *
 * <Any AI Conditions>
 *  condition
 *  condition
 *  condition
 * </Any AI Conditions>
 * 
 * - Used for: Skill
 * - Add/remove as many conditions as needed for the skill.
 * - As long as one condition is met, this becomes a valid skill for the AI
 *   to use. If none of them are met, this skill becomes invalid for AI use.
 * - This can be used together with <All AI Conditions>. If either of these
 *   notetags exist, do not use the Plugin Parameter defaul conditions.
 * - This will not inherit default 'Any' conditions in the Plugin Parameters.
 * - Replace 'condition' with any of the following Condition List below.
 *
 * ---
 *
 * <No AI Conditions>
 * 
 * - Used for: Skill
 * - Removes any default 'All' and 'Any' conditions for this skill.
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
 * - A numeric value representing a hard number.
 * - '50%' or any other percentile number to represent a rate.
 * - '0.5' or any other float number to represent a rate.
 *
 * - 'Variable x' (replace 'x' with a number) for variable x's current value.
 *
 * - 'HP%', 'MP%', 'TP%' for HP, MP, and TP rates respectively.
 * - 'MaxHP', 'MaxMP', 'MaxTP' for the potential target's respective values.
 * - 'Level' for the potential target's level. Requires VisuMZ_0_CoreEngine for
 *   this to affect enemies.
 * - 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK' for the potential target's total
 *   parameter value.
 *
 * - 'param Buff Stacks' for the potential target's current Buff stacks.
 *   - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 * - 'param Debuff Stacks' for the potential target's current Debuff stacks.
 *   - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * - 'param Buff Turns' for potential target's current buff turn duration.
 *   - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *   - Returns 0 if the potential target is not affected by that buff.
 * - 'param Debuff Turns' for potential target's current debuff turn duration.
 *   - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *   - Returns 0 if the potential target is not affected by that debuff.
 *
 * - 'State id Turns' or 'State name Turns' for potential target's current turn
 *   duration on that particular state.
 *   - Replace 'id' with a number representing the ID of the state.
 *   - Replace 'name' with the state's name.
 *   - Returns 0 if the potential target is not affected by that state.
 *   - Returns the max safe number value if the potential target is has that
 *     state as a passive state.
 *
 * - 'Element id Rate', 'Element name Rate', 'name Element Rate'
 *   - Returns a (float) value of the potential target's element's rate.
 *   - Replace 'id' with the ID of the element whose rate is to be checked.
 *   - Replace 'name' with the name of the element whose rate is to be checked.
 *     - Ignore any text codes in the element name.
 *
 * - 'Team Alive Members'
 *   - Returns a number value indicating how many alive members there are on
 *     the potential target's team.
 *
 * - 'Team Dead Members'
 *   - Returns a number value indicating how many dead members there are on
 *     the potential target's team.
 * 
 * - When no keyword matches are found, the comparison value will be
 *   interpreted as JavaScript code. If the JavaScript code fails, it will
 *   default to a 0 value.
 * 
 *   *NOTE* JavaScript cannot be used without comparison operators to reduce
 *   error. This means if you want to check if a switch is on or not, don't
 *   simply use "$gameSwitches.value(42)" as it does not have any comparison
 *   operators. Instead, use "$gameSwitches.value(42) === true" to check.
 *
 *   *NOTE* To make any of these conditions base off of the user instead, add
 *   the word 'user' before the condition as such:
 *
 *   user hp% >= 0.50
 *   user atk buff stacks === 2
 *   user team alive members < 3
 *
 * ---
 *
 * Always
 *
 * - Going to be valid no matter what.
 *
 * ---
 *
 * x% Chance
 * 
 * - Replace 'x' with a number value representing the percent chance this skill
 *   would pass as valid.
 *
 * ---
 *
 * Switch x On
 * Switch x Off
 *
 * - Replace 'x' with the ID of the switch to check as ON/OFF.
 *
 * ---
 *
 * User is Actor
 * User is Enemy
 * Target is Actor
 * Target is Enemy
 *
 * - Requires the user or potential target to be an actor/enemy.
 *
 * ---
 *
 * User Has State id
 * User Has State name
 * Target Has State id
 * Target Has State name
 *
 * - Replace 'id' with the ID of the state the user or potential target needs
 *   to have.
 * - Replace 'name' with the name of the state the target needs to have.
 *
 * ---
 *
 * User Not State id
 * User Not State name
 * Target Not State id
 * Target Not State name
 *
 * - Replace 'id' with the ID of the state the user or potential target
 *   cannot have.
 * - Replace 'name' with the name of the state the target cannot have.
 *
 * ---
 *
 * User Has param Buff 
 * User Has param Debuff 
 * Target Has param Buff 
 * Target Has param Debuff 
 *
 * - Requires user or potential target to have the associated parameter 
 *   buff/debuff at any stack level.
 * - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * ---
 *
 * User Has param Max Buff 
 * User Has param Max Debuff
 * Target Has param Max Buff 
 * Target Has param Max Debuff
 *
 * - Requires potential user or target to have the associated parameter 
 *   buff/debuff at maxed out stacks.
 * - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * ---
 *
 * User Not param Buff 
 * User Not param Debuff 
 * Target Not param Buff 
 * Target Not param Debuff 
 *
 * - Requires user or potential target to not have the associated parameter 
 *   buff/debuff at any stack level.
 * - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * ---
 *
 * User Not param Max Buff 
 * User Not param Max Debuff 
 * Target Not param Max Buff 
 * Target Not param Max Debuff 
 *
 * - Requires user or potential target to not have the associated parameter 
 *   buff/debuff at maxed out stacks.
 * - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * ---
 *
 * === A.I. => TGR Weight Notetags ===
 *
 * You can set how much influence on TGR weights actors and enemies will place
 * when determining valid targets for their actions.
 *
 * ---
 *
 * <AI Element Rate Influence: x.x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets how much TGR weight influence is given based on the element rate.
 * - Replace 'x.x' with a numberic value representing the influence rate.
 *
 * ---
 *
 * <Bypass AI Element Rate Influence>
 *
 * - Used for: Actor, Enemy Notetags
 * - Makes the actor/enemy not factor in element rates when calculating TGR
 *   weights to determine action targets.
 *
 * ---
 *
 * <AI EVA Influence: x.x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets how much TGR weight influence is given based on the EVA rate.
 * - Replace 'x.x' with a numberic value representing the influence rate.
 *
 * ---
 *
 * <Bypass AI EVA Influence>
 *
 * - Used for: Actor, Enemy Notetags
 * - Makes the actor/enemy not factor in EVA rates when calculating TGR
 *   weights to determine action targets.
 *
 * ---
 *
 * <AI MEV Influence: x.x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets how much TGR weight influence is given based on the MEV rate.
 * - Replace 'x.x' with a numberic value representing the influence rate.
 *
 * ---
 *
 * <Bypass AI MEV Influence>
 *
 * - Used for: Actor, Enemy Notetags
 * - Makes the actor/enemy not factor in MEV rates when calculating TGR
 *   weights to determine action targets.
 *
 * ---
 *
 * <AI PDR Influence: x.x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets how much TGR weight influence is given based on the PDR rate.
 * - Replace 'x.x' with a numberic value representing the influence rate.
 *
 * ---
 *
 * <Bypass AI PDR Influence>
 *
 * - Used for: Actor, Enemy Notetags
 * - Makes the actor/enemy not factor in PDR rates when calculating TGR
 *   weights to determine action targets.
 *
 * ---
 *
 * <AI MDR Influence: x.x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets how much TGR weight influence is given based on the MDR rate.
 * - Replace 'x.x' with a numberic value representing the influence rate.
 *
 * ---
 *
 * <Bypass AI MDR Influence>
 *
 * - Used for: Actor, Enemy Notetags
 * - Makes the actor/enemy not factor in MDR rates when calculating TGR
 *   weights to determine action targets.
 *
 * ---
 * 
 * === Specific A.I. Targeting Notetags ===
 * 
 * Specific A.I. targeting means the user will ignore any TGR influences when
 * it comes to pick out of a group of valid candidates to come down to one
 * target. This only affects skills where the user must select a specific
 * target, meaning it will ignore the effects of random and AoE scopes.
 * 
 * ---
 *
 * <AI Target: type>
 *
 * - Used for: Skill Notetags
 * - Bypasses TGR influence in favor of picking a specific target out of a
 *   group of valid targets (does not pick from outside the valid target group)
 *   for a skill target.
 * - Replace 'type' with any of the following:
 * 
 *   ----------------------------   -------------------------------------------
 *   Type                           Description
 *   ----------------------------   -------------------------------------------
 *   User                           Always picks the user if available
 *   First                          Always picks the first valid candidate
 *   Last                           Always picks the last valid candidate
 *   ----------------------------   -------------------------------------------
 *   Highest Level                  Picks candidate with highest level
 *   ----------------------------   -------------------------------------------
 *   Highest MaxHP                  Picks candidate with highest MaxHP
 *   Highest HP                     Picks candidate with highest current HP
 *   Highest HP%                    Picks candidate with highest HP ratio
 *   ----------------------------   -------------------------------------------
 *   Highest MaxMP                  Picks candidate with highest MaxMP
 *   Highest MP                     Picks candidate with highest current MP
 *   Highest MP%                    Picks candidate with highest MP ratio
 *   ----------------------------   -------------------------------------------
 *   Highest MaxTP                  Picks candidate with highest MaxTP
 *   Highest TP                     Picks candidate with highest current TP
 *   Highest TP%                    Picks candidate with highest TP ratio
 *   ----------------------------   -------------------------------------------
 *   Highest ATK                    Picks candidate with highest ATK parameter
 *   Highest DEF                    Picks candidate with highest DEF parameter
 *   Highest MAT                    Picks candidate with highest MAT parameter
 *   Highest MDF                    Picks candidate with highest MDF parameter
 *   Highest AGI                    Picks candidate with highest AGI parameter
 *   Highest LUK                    Picks candidate with highest LUK parameter
 *   ----------------------------   -------------------------------------------
 *   Highest HIT                    Picks candidate with highest HIT parameter
 *   Highest EVA                    Picks candidate with highest EVA parameter
 *   Highest CRI                    Picks candidate with highest CRI parameter
 *   Highest CEV                    Picks candidate with highest CEV parameter
 *   Highest MEV                    Picks candidate with highest MEV parameter
 *   Highest MRF                    Picks candidate with highest MRF parameter
 *   Highest CNT                    Picks candidate with highest CNT parameter
 *   Highest HRG                    Picks candidate with highest HRG parameter
 *   Highest MRG                    Picks candidate with highest MRG parameter
 *   Highest TRG                    Picks candidate with highest TRG parameter
 *   ----------------------------   -------------------------------------------
 *   Highest TGR                    Picks candidate with highest TGR parameter
 *   Highest GRD                    Picks candidate with highest GRD parameter
 *   Highest REC                    Picks candidate with highest REC parameter
 *   Highest PHA                    Picks candidate with highest PHA parameter
 *   Highest MCR                    Picks candidate with highest MCR parameter
 *   Highest TCR                    Picks candidate with highest TCR parameter
 *   Highest PDR                    Picks candidate with highest PDR parameter
 *   Highest MDR                    Picks candidate with highest MDR parameter
 *   Highest FDR                    Picks candidate with highest FDR parameter
 *   Highest EXR                    Picks candidate with highest EXR parameter
 *   ----------------------------   -------------------------------------------
 *   Highest State Count            Picks candidate with most states (any)
 *   Highest Positive State Count   Picks candidate with most positive states
 *   Highest Negative State Count   Picks candidate with most negative states
 *   *Note: These require VisuMZ_1_SkillsStatesCore
 *   ----------------------------   -------------------------------------------
 *   Lowest Level                   Picks candidate with lowest level
 *   ----------------------------   -------------------------------------------
 *   Lowest MaxHP                   Picks candidate with lowest MaxHP
 *   Lowest HP                      Picks candidate with lowest current HP
 *   Lowest HP%                     Picks candidate with lowest HP ratio
 *   ----------------------------   -------------------------------------------
 *   Lowest MaxMP                   Picks candidate with lowest MaxMP
 *   Lowest MP                      Picks candidate with lowest current MP
 *   Lowest MP%                     Picks candidate with lowest MP ratio
 *   ----------------------------   -------------------------------------------
 *   Lowest MaxTP                   Picks candidate with lowest MaxTP
 *   Lowest TP                      Picks candidate with lowest current TP
 *   Lowest TP%                     Picks candidate with lowest TP ratio
 *   ----------------------------   -------------------------------------------
 *   Lowest ATK                     Picks candidate with lowest ATK parameter
 *   Lowest DEF                     Picks candidate with lowest DEF parameter
 *   Lowest MAT                     Picks candidate with lowest MAT parameter
 *   Lowest MDF                     Picks candidate with lowest MDF parameter
 *   Lowest AGI                     Picks candidate with lowest AGI parameter
 *   Lowest LUK                     Picks candidate with lowest LUK parameter
 *   ----------------------------   -------------------------------------------
 *   Lowest HIT                     Picks candidate with lowest HIT parameter
 *   Lowest EVA                     Picks candidate with lowest EVA parameter
 *   Lowest CRI                     Picks candidate with lowest CRI parameter
 *   Lowest CEV                     Picks candidate with lowest CEV parameter
 *   Lowest MEV                     Picks candidate with lowest MEV parameter
 *   Lowest MRF                     Picks candidate with lowest MRF parameter
 *   Lowest CNT                     Picks candidate with lowest CNT parameter
 *   Lowest HRG                     Picks candidate with lowest HRG parameter
 *   Lowest MRG                     Picks candidate with lowest MRG parameter
 *   Lowest TRG                     Picks candidate with lowest TRG parameter
 *   ----------------------------   -------------------------------------------
 *   Lowest TGR                     Picks candidate with lowest TGR parameter
 *   Lowest GRD                     Picks candidate with lowest GRD parameter
 *   Lowest REC                     Picks candidate with lowest REC parameter
 *   Lowest PHA                     Picks candidate with lowest PHA parameter
 *   Lowest MCR                     Picks candidate with lowest MCR parameter
 *   Lowest TCR                     Picks candidate with lowest TCR parameter
 *   Lowest PDR                     Picks candidate with lowest PDR parameter
 *   Lowest MDR                     Picks candidate with lowest MDR parameter
 *   Lowest FDR                     Picks candidate with lowest FDR parameter
 *   Lowest EXR                     Picks candidate with lowest EXR parameter
 *   ----------------------------   -------------------------------------------
 *   Lowest State Count             Picks candidate with least states (any)
 *   Lowest Positive State Count    Picks candidate with least positive states
 *   Lowest Negative State Count    Picks candidate with least negative states
 *   *Note: These require VisuMZ_1_SkillsStatesCore
 *   ----------------------------   -------------------------------------------
 * 
 * ---
 *
 * ============================================================================
 * Regarding $gameTroop.turnCount() for A.I. Conditions
 * ============================================================================
 * 
 * ---
 * 
 * Short Answer:
 *
 * Battle A.I. conditions do NOT support the conditions $gameTroop.turnCount()
 * or user.turnCount() or target.turnCount() for A.I. Conditions.
 * 
 * Instead, use RPG Maker MZ's built-in action editor's turn requirement to
 * make do with the same effect.
 *
 * ---
 * 
 * Long Answer:
 * 
 * The turnCount() functions are not valid for A.I. Conditions and disabled due
 * to all the problems they cause. The reason being is because actions are
 * determined before the turn count increases. This is how RPG Maker MZ handles
 * it by default.
 * 
 * The reason why this does not work is due to the following code found in
 * RPG Maker MZ's core scripts:
 * 
 *   Game_Battler.prototype.turnCount = function() {
 *       if (BattleManager.isTpb()) {
 *           return this._tpbTurnCount;
 *       } else {
 *           return $gameTroop.turnCount() + 1;
 *       }
 *   };
 * 
 * What that means the turn count will always be off by 1. So upon determining
 * the action initially, the match would come off as correct. However, as the
 * turn actually starts and reaches the enemy or actor's turn, the turn count
 * check would read differently and return incorrect information, causing the
 * battler to forfeit their actions.
 * 
 * This facet of RPG Maker MZ can be updated and changed, but it is better that
 * it doesn't in order to maintain compatibility with the rest of the plugins
 * available that utilize the turn counter.
 * 
 * The work around to this problem is, instead, to use the enemy database tab's
 * action editor and apply a Turn Condition to match the required turn instead.
 * You know, the thing with Skill and Rating, where you select which skill for
 * the enemy to use instead.
 * 
 * HOWEVER!
 * 
 * If you are willing to use an "Experimental" feature, aka one that is not
 * heavily tested and may potentially result in unintended side effects, go to:
 * 
 *  Plugin Parameters > A.I. General Settings > Experimental > On-The-Spot A.I.
 * 
 * And set that to "true" without the quotes. This will forcefully remove the
 * +1 towards the count and forcefully make enemies re-evaluate actions upon
 * the start of the string of their actions. This comes with some side effects
 * that will potentially give A.I. advantages or disadvantages depending on the
 * battle system type. Action Speed becomes something that can be abused as it
 * is normally something that is determined based on the queued actions. A.I.
 * can pick a high speed weak action and then switch it for a slow speed strong
 * action. There is no proper fix to this due to how on-the-spot A.I. works as
 * it is ill-fitted for speed-relative battle systems. You have been warned.
 * 
 * In the event that this Plugin Parameter IS enabled, then using the turnCount
 * JavaScript code should work again due to the normalization of how the turn
 * property is calculated.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: A.I. General Settings
 * ============================================================================
 *
 * These settings determine the global settings for general Battle A.I. usage.
 *
 * ---
 * 
 * A.I. Style
 * 
 *   Actor Style:
 *   - Which A.I. style do you want for referenced actors to use?
 *   - This does not apply to non-referenced actors.
 * 
 *   Enemy Style:
 *   - Which A.I. style do you want for enemies to use?
 * 
 *   Refer to the A.I. Styles list for a list of valid styles.
 * 
 * ---
 *
 * A.I. Level
 * 
 *   Actor A.I. Level:
 *   - Default A.I. level used for actor A.I.
 *   - Levels: 0-100. Higher is stricter.
 * 
 *   Enemy A.I. Level:
 *   - Default A.I. level used for enemy A.I.
 *   - Levels: 0-100. Higher is stricter.
 *
 * ---
 *
 * A.I. Ratings
 * 
 *   Actor Rating Variance:
 *   - How much to allow variance from the A.I. rating by?
 *   - 0 for no variance. Higher numbers for more variance.
 * 
 *   Enemy Rating Variance:
 *   - How much to allow variance from the A.I. rating by?
 *   - 0 for no variance. Higher numbers for more variance.
 *
 * ---
 *
 * Reference
 * 
 *   Actor => AI Reference:
 *   - Which enemy A.I. should the actor reference by default?
 *   - Use 0 for no references.
 *
 * ---
 *
 * Knowledge
 * 
 *   Learn Knowledge:
 *   - Requires enemies/actors to test the knowledge of the opponents before
 *     using specific conditions.
 * 
 *   Unknown Element Rate:
 *   - What should A.I. treat unknown element rates as?
 *
 * ---
 * 
 * Experimental
 * 
 *   On-The-Spot A.I.:
 *   - A.I. enemies/actors determine actions on the spot when it's their turn.
 * 
 *     No Idle Chant:
 *     - Requires On-The-Spot A.I. enabled.
 *     - For A.I. Battlers, disables idle chant motions due to inconsistency.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: A.I. Default Conditions
 * ============================================================================
 *
 * You can set certain conditions to be used as defaults for all skills that
 * lack the <All AI Conditions> and <Any AI Conditions>. If either of those
 * notetags exist, none of these defaults will be used for those skills. These
 * settings will allow you to set both 'All' and 'Any' conditions for defaults.
 *
 * ---
 *
 * Enable?
 * 
 *   All Conditions:
 *   - Create default 'ALL' conditions for all skills without any AI notetags?
 * 
 *   Any Conditions:
 *   - Create default 'ANY' conditions for all skills without any AI notetags?
 *
 * ---
 *
 * HP Damage
 * MP Damage
 * HP Recover
 * MP Recover
 * HP Drain
 * MP Drain
 * 
 *   All Conditions:
 *   - Default 'ALL' conditions used for related skills.
 * 
 *   Any Conditions:
 *   - Default 'ANY' conditions used for related skills.
 *
 * ---
 *
 * Add State
 * Remove State
 * 
 *   All Conditions:
 *   - Default 'ALL' conditions used for related skills.
 *   - %1 - Dynamic values (ie state ID's).
 * 
 *   Any Conditions:
 *   - Default 'ANY' conditions used for related skills.
 *   - %1 - Dynamic values (ie state ID's).
 *
 * ---
 *
 * Add Buff
 * Remove Buff
 * Add Debuff
 * Remove Debuff
 * 
 *   All Conditions:
 *   - Default 'ANY' conditions used for related skills.
 *   - %1 - Dynamic values (ie param's).
 * 
 *   Any Conditions:
 *   - Default 'ALL' conditions used for related skills.
 *   - %1 - Dynamic values (ie state ID's).
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: A.I. => TGR Weight Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you to set whether or not you'd like for 
 * weight influence when deciding targets for actions and how much to influence
 * the TGR weight by.
 *
 * ---
 *
 * Weight
 * 
 *   Element Rate => TGR:
 *   - Makes all A.I. consider elemental rates when considering TGR weight
 *     by default?
 * 
 *     Influence Rate:
 *     - This determines the default level of influence elemental rates have on
 *       TGR weight.
 * 
 *   EVA Rate => TGR:
 *   - Makes all A.I. consider EVA rates when considering TGR weight
 *     by default?
 * 
 *     Influence Rate:
 *     - This determines the default level of influence EVA rates have on
 *       TGR weight.
 * 
 *   MEV Rate => TGR:
 *   - Makes all A.I. consider MEV rates when considering TGR weight
 *     by default?
 * 
 *     Influence Rate:
 *     - This determines the default level of influence MEV rates have on
 *       TGR weight.
 * 
 *   PDR Rate => TGR:
 *   - Makes all A.I. consider PDR rates when considering TGR weight
 *     by default?
 * 
 *     Influence Rate:
 *     - This determines the default level of influence PDR rates have on
 *       TGR weight.
 * 
 *   MDR Rate => TGR:
 *   - Makes all A.I. consider MDR rates when considering TGR weight
 *     by default?
 * 
 *     Influence Rate:
 *     - This determines the default level of influence MDR rates have on
 *       TGR weight.
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
 * Version 1.28: Version 1.10: January 16, 2025
 * * Compatibility Update!
 * ** Added better compatibility with Battle Grid System regarding scopes.
 * 
 * Version 1.27: November 14, 2024
 * * Compatibility Update!
 * ** Added better compatibility with Skill Cooldowns' <Once Per Turn> notetag.
 * 
 * Version 1.26: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <AI PDR Influence: x.x>
 * *** <AI MDR Influence: x.x>
 * **** Sets how much TGR weight influence is given based on the PDR/MDR rate.
 * *** <Bypass AI PDR Influence>
 * *** <Bypass AI MDR Influence>
 * **** Makes the actor/enemy not factor in PDR/MDR rates when calculating TGR
 *      weights to determine action targets.
 * ** New Plugin Parameters added by Arisu:
 * *** Parameters > Weights > PDR Rate => TGR
 * *** Parameters > Weights > PDR Rate => TGR > Influence Rate
 * *** Parameters > Weights > MDR Rate => TGR
 * *** Parameters > Weights > MDR Rate => TGR > Influence Rate
 * **** Alters the default PDR/MDR Influence rate.
 * 
 * Version 1.25: June 13, 2024
 * * Feature Updates!
 * ** Reduced AI thinking times. Update made by Olivia.
 * 
 * Version 1.24: March 14, 2024
 * * Bug Fixes!
 * ** Fixed a bug that would cause an infinite loop with certain battle systems
 *    under on the spot AI setting. Fix made by Olivia.
 * 
 * Version 1.23: January 18, 2024
 * * Compatibility Update!
 * ** Updated better compatibility with Battle System - STB and Auto Skill
 *    Triggers to prevent infinite loops. Update made by Olivia.
 * 
 * Version 1.22: December 14, 2023
 * * Compatibility Update!
 * ** Updated better compatibility for the new Battle System FTB, ETB, and PTB
 *    updates. Update made by Olivia.
 * 
 * Version 1.21: April 13, 2023
 * * Bug Fixes!
 * ** Fixed a bug that prevented enemies from using skills that had the
 *    <Target: x Random Any> notetag. Fix made by Irina.
 * 
 * Version 1.20: February 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for Battle Core updated version 1.74
 *    new features.
 * 
 * Version 1.19: January 20, 2023
 * * Bug Fixes!
 * ** On-The-Spot A.I. no longer overwrites Forced Actions. Fix made by Arisu.
 * * Compatibility Update!
 * ** Added compatibility functionality for Battle Core updated version 1.73
 *    new features.
 * 
 * Version 1.18: May 19, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** General Settings > Experimental > On-The-Spot A.I. > No Idle Chant
 * **** Requires On-The-Spot A.I. enabled.
 * **** For A.I. Battlers, disables idle chant motions due to inconsistency.
 * 
 * Version 1.17: May 12, 2022
 * * Feature Update!
 * ** Better RNG calculation when using the x% Chance conditional. Update made
 *    by Arisu.
 * 
 * Version 1.16: February 24, 2022
 * * Feature Update!
 * ** Randomization between zero variance A.I. is now better.
 * ** A.I. will no longer keep unusable skills in a skill queue and replace
 *    them with new ones.
 * 
 * Version 1.15: December 2, 2021
 * * Compatibility Update!
 * ** AI for skills and items should now work if their scope is
 *    <Target: All Allies But User>. Update made by Irina.
 * 
 * Version 1.14: October 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Notetag section "Condition List" updated with the following:
 * *** *NOTE* JavaScript cannot be used without comparison operators to reduce
 *     error. This means if you want to check if a switch is on or not, don't
 *     simply use "$gameSwitches.value(42)" as it does not have any comparison
 *     operators. Instead, use "$gameSwitches.value(42) === true" to check.
 * ** Updated section "Regarding $gameTroop.turnCount() for A.I. Conditions"
 * * New Experimental Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** A.I. General Settings > Experimental > On-The-Spot A.I.
 * **** A.I. enemies/actors determine actions on the spot when it's their turn.
 * **** Functions akin to YEP's Battle A.I. Core where enemies determine new
 *      actions on the spot. Doing so will forcefully change the way the Turn
 *      Count is handled for Game_Battler to not utilize the +1.
 * **** This will forcefully remove the +1 towards the count and forcefully
 *      make enemies re-evaluate actions upon the start of the string of their
 *      actions. This comes with some side effects that will potentially give
 *      A.I. advantages or disadvantages depending on the battle system type.
 *      Action Speed becomes something that can be abused as it is normally
 *      something that is determined based on the queued actions. A.I. can pick
 *      a high speed weak action and then switch it for a slow speed strong
 *      action. There is no proper fix to this due to how on-the-spot A.I.
 *      works as it is ill-fitted for speed-relative battle systems. You have
 *      been warned.
 * **** In the event that this Plugin Parameter IS enabled, then using the
 *      turnCount JavaScript code should work again due to the normalization of
 *      how the turn property is calculated.
 * * Optimization Update!
 * ** Updated last version's newest change to be more optimized and occur upon
 *    each iteration of a new subject being determined to account for better
 *    check timing. Update made by Yanfly.
 * 
 * Version 1.13: October 13, 2021
 * * Feature Update!
 * ** A.I. Battlers with no currently determined actions, upon the start of the
 *    time frame for what would be their action, will have one more chance of
 *    determining a new action to use as to not waste their turns.
 * ** This does NOT mean that the A.I. Battlers will adjust their actions for
 *    one with a higher rating. The readjustment will only occur if there are
 *    no actions determined for that instance and only a one time window upon
 *    the start of the time frame for what would be their action.
 * ** Update made by Arisu.
 * 
 * Version 1.12: October 7, 2021
 * * Documentation Update!
 * ** Added section "Regarding $gameTroop.turnCount() for A.I. Conditions".
 * * Feature Update!
 * ** Any A.I. Conditions found with "turnCount()" will be automatically
 *    disabled in order to reduce confusion. This is due to how turnCount()
 *    functions do not accurately depict the current Turn Count depending on
 *    when the function runs. Update made by Olivia.
 * 
 * Version 1.11: September 30, 2021
 * * Bug Fixes!
 * ** Patched up a rare occurance of predetermined actions still having
 *    priority despite having no valid targets. Fix made by Olivia.
 * 
 * Version 1.10: September 23, 2021
 * * Bug Fixes!
 * ** Fixed a bug that caused "highest" and "lowest" target schemes to be
 *    inverted. Fix made by Olivia.
 * 
 * Version 1.09: July 9, 2021
 * * Bug Fixes!
 * ** Fixed a bug that caused "highest" and "lowest" target schemes to be
 *    inverted. Fix made by Arisu.
 * 
 * Version 1.08: April 16, 2021
 * * Feature Update!
 * ** Cached randomization seeds should no longer conflict with certain scope
 *    types. Update made by Irina.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: January 22, 2021
 * * Bug Fixes!
 * ** <AI Target: x> notetags should no longer crashes. Fix made by Irina.
 * 
 * Version 1.06: January 8, 2021
 * * Feature Update!
 * ** For those using classic mode with a variance level of 0, action lists
 *    will be better shuffled to provide more variation between selected
 *    skills. Update made by Irina.
 * 
 * Version 1.05: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Yanfly!
 * *** <AI Target: type>
 * **** Bypasses TGR influence in favor of picking a specific target out of a
 *      group of valid targets (does not pick from outside the valid target
 *      group) for a skill target. Read documentation to see targeting types.
 * 
 * Version 1.04: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for notetag <Reference AI: Enemy id>
 * *** - Actors are only able to use skills they would normally have access to.
 *       - Actors need to have LEARNED the skill.
 *       - Actors need to be able to access the skill's SKILL TYPE.
 *       - Actors need to have the RESOURCES to pay for the skill.
 *     - If you cannot figure out why an auto battle actor cannot use a
 *       specific skill, turn OFF auto battle and see if you can use the skill
 *       normally.
 * 
 * Version 1.03: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.02: November 1, 2020
 * * Bug Fixes!
 * ** Charmed battlers will no longer vanish when attack one another. Fix made
 *    by Yanfly.
 * 
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** <All AI Conditiosn> and <Any AI Conditions> notetags are now fixed and
 *    should work properly. Fix made by Yanfly.
 *
 * Version 1.00: September 30, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BattleAI
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text A.I. General Settings
 * @type struct<General>
 * @desc General settings pertaining to A.I.
 * @default {"AIStyle":"","ActorStyleAI:str":"classic","EnemyStyleAI:str":"classic","AILevel":"","ActorAILevel:num":"100","EnemyAILevel:num":"100","AIRating":"","ActorRatingVariance:num":"1","EnemyRatingVariance:num":"3","Reference":"","ActorAIReference:num":"0","Knowledge":"","LearnKnowledge:eval":"true","UnknownElementRate:num":"1.00"}
 *
 * @param Default:struct
 * @text A.I. Default Conditions
 * @type struct<Default>
 * @desc Give certain types of skills default conditions.
 * @default {"Enable?":"","EnableAllCon:eval":"true","EnableAnyCon:eval":"true","HpDamage":"","HpDamageAll:json":"\"\"","HpDamageAny:json":"\"Always\"","MpDamage":"","MpDamageAll:json":"\"Target MP > 0\"","MpDamageAny:json":"\"\"","HpRecover":"","HpRecoverAll:json":"\"\"","HpRecoverAny:json":"\"Target HP < Target MaxHP\"","MpRecover":"","MpRecoverAll:json":"\"\"","MpRecoverAny:json":"\"Target MP < Target MaxMP\"","HpDrain":"","HpDrainAll:json":"\"\"","HpDrainAny:json":"\"User HP < User MaxHP\"","MpDrain":"","MpDrainAll:json":"\"Target MP > 0\"","MpDrainAny:json":"\"\"","AddState":"","AddStateAll:json":"\"\"","AddStateAny:json":"\"Target Not State %1\\nTarget State %1 Turns <= 1\"","RemoveState":"","RemoveStateAll:json":"\"\"","RemoveStateAny:json":"\"Target Has State %1\"","AddBuff":"","AddBuffAll:json":"\"\"","AddBuffAny:json":"\"Target Not %1 Max Buff\\nTarget %1 Buff Turns <= 1\"","RemoveBuff":"","RemoveBuffAll:json":"\"\"","RemoveBuffAny:json":"\"Target Has %1 Buff\"","AddDebuff":"","AddDebuffAll:json":"\"\"","AddDebuffAny:json":"\"Target Not %1 Max Debuff\\nTarget %1 Debuff Turns <= 1\"","RemoveDebuff":"","RemoveDebuffAll:json":"\"\"","RemoveDebuffAny:json":"\"Target Has %1 Debuff\""}
 *
 * @param Weight:struct
 * @text A.I. => TGR Weight
 * @type struct<Weight>
 * @desc How do certain properties translate to TGR weight?
 * @default {"ElementTgr:eval":"true","ElementTgrRate:num":"1.25","EvaTgr:eval":"true","EvaTgrRate:num":"1.50","MevTgr:eval":"true","MevTgrRate:num":"2.00"}
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
 * A.I. General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param AIStyle
 * @text A.I. Style
 *
 * @param ActorStyleAI:str
 * @text Actor Style
 * @parent AIStyle
 * @type select
 * @option Classic (Rating-Based with Rating Variance)
 * @value classic
 * @option Gambit (Order-Based, Ignores Rating System)
 * @value gambit
 * @option Casual (Random but follows A.I. Conditions)
 * @value casual
 * @option Random (Pure Random, ignores A.I. Conditions)
 * @value random
 * @desc Which A.I. style do you want for referenced actors to use?
 * This does not apply to non-referenced actors.
 * @default classic
 *
 * @param EnemyStyleAI:str
 * @text Enemy Style
 * @parent AIStyle
 * @type select
 * @option Classic (Rating-Based with Rating Variance)
 * @value classic
 * @option Gambit (Order-Based, Ignores Rating System)
 * @value gambit
 * @option Casual (Random but follows A.I. Conditions)
 * @value casual
 * @option Random (Pure Random, ignores A.I. Conditions)
 * @value random
 * @desc Which A.I. style do you want for enemies to use?
 * @default classic
 *
 * @param AILevel
 * @text A.I. Level
 *
 * @param ActorAILevel:num
 * @text Actor A.I. Level
 * @parent AILevel
 * @type number
 * @min 0
 * @max 100
 * @desc Default A.I. level used for actor A.I.
 * Levels: 0-100. Higher is stricter.
 * @default 100
 *
 * @param EnemyAILevel:num
 * @text Enemy A.I. Level
 * @parent AILevel
 * @type number
 * @min 0
 * @max 100
 * @desc Default A.I. level used for enemy A.I.
 * Levels: 0-100. Higher is stricter.
 * @default 100
 *
 * @param AIRating
 * @text A.I. Ratings
 *
 * @param ActorRatingVariance:num
 * @text Actor Rating Variance
 * @parent AIRating
 * @type number
 * @min 0
 * @max 9
 * @desc How much to allow variance from the A.I. rating by?
 * 0 for no variance. Higher numbers for more variance.
 * @default 1
 *
 * @param EnemyRatingVariance:num
 * @text Enemy Rating Variance
 * @parent AIRating
 * @type number
 * @min 0
 * @max 9
 * @desc How much to allow variance from the A.I. rating by?
 * 0 for no variance. Higher numbers for more variance.
 * @default 3
 *
 * @param Reference
 *
 * @param ActorAIReference:num
 * @text Actor => AI Reference
 * @parent Reference
 * @type enemy
 * @desc Which enemy A.I. should the actor reference by default?
 * Use 0 for no references.
 * @default 0
 *
 * @param Knowledge
 *
 * @param LearnKnowledge:eval
 * @text Learn Knowledge
 * @parent Knowledge
 * @type boolean
 * @on Require
 * @off Don't Require
 * @desc Requires enemies/actors to test the knowledge of
 * the opponents before using specific conditions.
 * @default true
 *
 * @param UnknownElementRate:num
 * @text Unknown Element Rate
 * @parent LearnKnowledge:eval
 * @desc What should A.I. treat unknown element rates as?
 * @default 1.00
 * 
 * @param Experimental
 * 
 * @param OnSpotAI:eval
 * @text On-The-Spot A.I.
 * @parent Experimental
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc A.I. enemies/actors determine actions on the
 * spot when it's their turn.
 * @default false
 * 
 * @param SpotRemoveMotions:eval
 * @text No Idle Chant
 * @parent OnSpotAI:eval
 * @type boolean
 * @on Remove Idle Chanting
 * @off Allow Idle Chanting
 * @desc Requires On-The-Spot A.I. enabled. For A.I. Battlers,
 * disables idle chant motions due to inconsistency.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * A.I. Default Conditions
 * ----------------------------------------------------------------------------
 */
/*~struct~Default:
 *
 * @param Enable?
 *
 * @param EnableAllCon:eval
 * @text All Conditions
 * @parent Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Create default 'ALL' conditions for all skills
 * without any AI notetags?
 * @default true
 *
 * @param EnableAnyCon:eval
 * @text Any Conditions
 * @parent Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Create default 'ANY' conditions for all skills
 * without any AI notetags?
 * @default true
 *
 * @param HpDamage
 * @text HP Damage
 * 
 * @param HpDamageAll:json
 * @text All Conditions
 * @parent HpDamage
 * @type note
 * @desc Default 'ALL' conditions used for HP damage skills.
 * @default ""
 * 
 * @param HpDamageAny:json
 * @text Any Conditions
 * @parent HpDamage
 * @type note
 * @desc Default 'ANY' conditions used for HP damage skills.
 * @default "Always"
 *
 * @param MpDamage
 * @text MP Damage
 * 
 * @param MpDamageAll:json
 * @text All Conditions
 * @parent MpDamage
 * @type note
 * @desc Default 'ALL' conditions used for MP damage skills.
 * @default "Target MP > 0"
 *
 * @param MpDamageAny:json
 * @text Any Conditions
 * @parent MpDamage
 * @type note
 * @desc Default 'ANY' conditions used for MP damage skills.
 * @default ""
 *
 * @param HpRecover
 * @text HP Recover
 * 
 * @param HpRecoverAll:json
 * @text All Conditions
 * @parent HpRecover
 * @type note
 * @desc Default 'ALL' conditions used for HP recovery skills.
 * @default ""
 *
 * @param HpRecoverAny:json
 * @text Any Conditions
 * @parent HpRecover
 * @type note
 * @desc Default 'ANY' conditions used for HP recovery skills.
 * @default "Target HP < Target MaxHP"
 *
 * @param MpRecover
 * @text MP Recover
 * 
 * @param MpRecoverAll:json
 * @text All Conditions
 * @parent MpRecover
 * @type note
 * @desc Default 'ALL' conditions used for MP recovery skills.
 * @default ""
 *
 * @param MpRecoverAny:json
 * @text Any Conditions
 * @parent MpRecover
 * @type note
 * @desc Default 'ANY' conditions used for MP recovery skills.
 * @default "Target MP < Target MaxMP"
 *
 * @param HpDrain
 * @text HP Drain
 * 
 * @param HpDrainAll:json
 * @text All Conditions
 * @parent HpDrain
 * @type note
 * @desc Default 'ALL' conditions used for HP drain skills.
 * @default ""
 *
 * @param HpDrainAny:json
 * @text Any Conditions
 * @parent HpDrain
 * @type note
 * @desc Default 'ANY' conditions used for HP drain skills.
 * @default "User HP < User MaxHP"
 *
 * @param MpDrain
 * @text MP Drain
 * 
 * @param MpDrainAll:json
 * @text All Conditions
 * @parent MpDrain
 * @type note
 * @desc Default 'ALL' conditions used for MP drain skills.
 * @default "Target MP > 0"
 *
 * @param MpDrainAny:json
 * @text Any Conditions
 * @parent MpDrain
 * @type note
 * @desc Default 'ANY' conditions used for MP drain skills.
 * @default ""
 *
 * @param AddState
 * @text Add State
 * 
 * @param AddStateAll:json
 * @text All Conditions
 * @parent AddState
 * @type note
 * @desc Default 'ALL' conditions used for adding states.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param AddStateAny:json
 * @text Any Conditions
 * @parent AddState
 * @type note
 * @desc Default 'ANY' conditions used for adding states.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Not State %1\nTarget State %1 Turns <= 1"
 *
 * @param RemoveState
 * @text Remove State
 * 
 * @param RemoveStateAll:json
 * @text All Conditions
 * @parent RemoveState
 * @type note
 * @desc Default 'ALL' conditions used for removing states.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param RemoveStateAny:json
 * @text Any Conditions
 * @parent RemoveState
 * @type note
 * @desc Default 'ANY' conditions used for removing states.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Has State %1"
 *
 * @param AddBuff
 * @text Add Buff
 * 
 * @param AddBuffAll:json
 * @text All Conditions
 * @parent AddBuff
 * @type note
 * @desc Default 'ALL' conditions used for adding buffs.
 * %1 - Dynamic values (ie param names).
 * @default ""
 *
 * @param AddBuffAny:json
 * @text Any Conditions
 * @parent AddBuff
 * @type note
 * @desc Default 'ANY' conditions used for adding buffs.
 * %1 - Dynamic values (ie param's).
 * @default "Target Not %1 Max Buff\nTarget %1 Buff Turns <= 1"
 *
 * @param RemoveBuff
 * @text Remove Buff
 * 
 * @param RemoveBuffAll:json
 * @text All Conditions
 * @parent RemoveBuff
 * @type note
 * @desc Default 'ALL' conditions used for removing buffs.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param RemoveBuffAny:json
 * @text Any Conditions
 * @parent RemoveBuff
 * @type note
 * @desc Default 'ANY' conditions used for removing buffs.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Has %1 Buff"
 *
 * @param AddDebuff
 * @text Add Debuff
 * 
 * @param AddDebuffAll:json
 * @text All Conditions
 * @parent AddDebuff
 * @type note
 * @desc Default 'ALL' conditions used for adding debuffs.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param AddDebuffAny:json
 * @text Any Conditions
 * @parent AddDebuff
 * @type note
 * @desc Default 'ANY' conditions used for adding debuffs.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Not %1 Max Debuff\nTarget %1 Debuff Turns <= 1"
 *
 * @param RemoveDebuff
 * @text Remove Debuff
 * 
 * @param RemoveDebuffAll:json
 * @text All Conditions
 * @parent RemoveDebuff
 * @type note
 * @desc Default 'ALL' conditions used for removing debuffs.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param RemoveDebuffAny:json
 * @text Any Conditions
 * @parent RemoveDebuff
 * @type note
 * @desc Default 'ANY' conditions used for removing debuffs.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Has %1 Debuff"
 *
 */
/* ----------------------------------------------------------------------------
 * A.I. => TGR Weight Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Weight:
 *
 * @param ElementTgr:eval
 * @text Element Rate => TGR
 * @type boolean
 * @on Influence
 * @off Normal
 * @desc Makes all A.I. consider elemental rates when considering
 * TGR weight by default?
 * @default true
 *
 * @param ElementTgrRate:num
 * @text Influence Rate
 * @parent ElementTgr:eval
 * @desc This determines the default level of influence elemental
 * rates have on TGR weight.
 * @default 1.25
 *
 * @param EvaTgr:eval
 * @text EVA Rate => TGR
 * @type boolean
 * @on Influence
 * @off Normal
 * @desc Makes all A.I. consider EVA rates when considering
 * TGR weight by default?
 * @default true
 *
 * @param EvaTgrRate:num
 * @text Influence Rate
 * @parent EvaTgr:eval
 * @desc This determines the default level of influence EVA
 * rates have on TGR weight.
 * @default 1.50
 *
 * @param MevTgr:eval
 * @text MEV Rate => TGR
 * @type boolean
 * @on Influence
 * @off Normal
 * @desc Makes all A.I. consider MEV rates when considering
 * TGR weight by default?
 * @default true
 *
 * @param MevTgrRate:num
 * @text Influence Rate
 * @parent MevTgr:eval
 * @desc This determines the default level of influence MEV
 * rates have on TGR weight.
 * @default 2.00
 *
 * @param PdrTgr:eval
 * @text PDR Rate => TGR
 * @type boolean
 * @on Influence
 * @off Normal
 * @desc Makes all A.I. consider PDR rates when considering
 * TGR weight by default?
 * @default true
 *
 * @param PdrTgrRate:num
 * @text Influence Rate
 * @parent PdrTgr:eval
 * @desc This determines the default level of influence PDR
 * rates have on TGR weight.
 * @default 1.25
 *
 * @param MdrTgr:eval
 * @text MDR Rate => TGR
 * @type boolean
 * @on Influence
 * @off Normal
 * @desc Makes all A.I. consider MDR rates when considering
 * TGR weight by default?
 * @default true
 *
 * @param MdrTgrRate:num
 * @text Influence Rate
 * @parent MdrTgr:eval
 * @desc This determines the default level of influence MDR
 * rates have on TGR weight.
 * @default 1.50
 *
 */
//=============================================================================

const _0x26c7a9=_0x37de;(function(_0x42fd03,_0x62080f){const _0x465aa9=_0x37de,_0x26f1aa=_0x42fd03();while(!![]){try{const _0xf0fc03=-parseInt(_0x465aa9(0x13e))/0x1+parseInt(_0x465aa9(0x13c))/0x2+-parseInt(_0x465aa9(0x284))/0x3+-parseInt(_0x465aa9(0x2bb))/0x4+parseInt(_0x465aa9(0x1e3))/0x5*(-parseInt(_0x465aa9(0x24e))/0x6)+parseInt(_0x465aa9(0x227))/0x7*(parseInt(_0x465aa9(0x1b7))/0x8)+-parseInt(_0x465aa9(0x15b))/0x9*(-parseInt(_0x465aa9(0x229))/0xa);if(_0xf0fc03===_0x62080f)break;else _0x26f1aa['push'](_0x26f1aa['shift']());}catch(_0x4d82f0){_0x26f1aa['push'](_0x26f1aa['shift']());}}}(_0x5027,0x3f159));var label=_0x26c7a9(0x275),tier=tier||0x0,dependencies=[_0x26c7a9(0x246)],pluginData=$plugins['filter'](function(_0x174b9f){const _0xb55079=_0x26c7a9;return _0x174b9f[_0xb55079(0x1a8)]&&_0x174b9f['description'][_0xb55079(0x1f9)]('['+label+']');})[0x0];VisuMZ[label][_0x26c7a9(0x1cd)]=VisuMZ[label][_0x26c7a9(0x1cd)]||{},VisuMZ[_0x26c7a9(0x2ba)]=function(_0x507ea1,_0x597fb7){const _0x23d395=_0x26c7a9;for(const _0x14062d in _0x597fb7){if(_0x14062d['match'](/(.*):(.*)/i)){const _0x4655f7=String(RegExp['$1']),_0xe4eb45=String(RegExp['$2'])[_0x23d395(0x1bc)]()[_0x23d395(0x255)]();let _0x4a586c,_0x4e1f4c,_0x3da21f;switch(_0xe4eb45){case _0x23d395(0x230):_0x4a586c=_0x597fb7[_0x14062d]!==''?Number(_0x597fb7[_0x14062d]):0x0;break;case _0x23d395(0x222):_0x4e1f4c=_0x597fb7[_0x14062d]!==''?JSON[_0x23d395(0x148)](_0x597fb7[_0x14062d]):[],_0x4a586c=_0x4e1f4c[_0x23d395(0x23f)](_0x101847=>Number(_0x101847));break;case _0x23d395(0x236):_0x4a586c=_0x597fb7[_0x14062d]!==''?eval(_0x597fb7[_0x14062d]):null;break;case _0x23d395(0x2a3):_0x4e1f4c=_0x597fb7[_0x14062d]!==''?JSON[_0x23d395(0x148)](_0x597fb7[_0x14062d]):[],_0x4a586c=_0x4e1f4c[_0x23d395(0x23f)](_0x4e6a3a=>eval(_0x4e6a3a));break;case _0x23d395(0x25d):_0x4a586c=_0x597fb7[_0x14062d]!==''?JSON[_0x23d395(0x148)](_0x597fb7[_0x14062d]):'';break;case _0x23d395(0x14c):_0x4e1f4c=_0x597fb7[_0x14062d]!==''?JSON[_0x23d395(0x148)](_0x597fb7[_0x14062d]):[],_0x4a586c=_0x4e1f4c['map'](_0xb2c6d1=>JSON[_0x23d395(0x148)](_0xb2c6d1));break;case _0x23d395(0x181):_0x4a586c=_0x597fb7[_0x14062d]!==''?new Function(JSON['parse'](_0x597fb7[_0x14062d])):new Function(_0x23d395(0x13b));break;case'ARRAYFUNC':_0x4e1f4c=_0x597fb7[_0x14062d]!==''?JSON[_0x23d395(0x148)](_0x597fb7[_0x14062d]):[],_0x4a586c=_0x4e1f4c[_0x23d395(0x23f)](_0x458c71=>new Function(JSON[_0x23d395(0x148)](_0x458c71)));break;case _0x23d395(0x2aa):_0x4a586c=_0x597fb7[_0x14062d]!==''?String(_0x597fb7[_0x14062d]):'';break;case _0x23d395(0x1d1):_0x4e1f4c=_0x597fb7[_0x14062d]!==''?JSON[_0x23d395(0x148)](_0x597fb7[_0x14062d]):[],_0x4a586c=_0x4e1f4c[_0x23d395(0x23f)](_0x3ae61c=>String(_0x3ae61c));break;case _0x23d395(0x1a7):_0x3da21f=_0x597fb7[_0x14062d]!==''?JSON['parse'](_0x597fb7[_0x14062d]):{},_0x4a586c=VisuMZ[_0x23d395(0x2ba)]({},_0x3da21f);break;case _0x23d395(0x24b):_0x4e1f4c=_0x597fb7[_0x14062d]!==''?JSON[_0x23d395(0x148)](_0x597fb7[_0x14062d]):[],_0x4a586c=_0x4e1f4c[_0x23d395(0x23f)](_0x382585=>VisuMZ[_0x23d395(0x2ba)]({},JSON[_0x23d395(0x148)](_0x382585)));break;default:continue;}_0x507ea1[_0x4655f7]=_0x4a586c;}}return _0x507ea1;},(_0x5dff09=>{const _0x5992bf=_0x26c7a9,_0xf82f0d=_0x5dff09[_0x5992bf(0x22d)];for(const _0x2edbc1 of dependencies){if(!Imported[_0x2edbc1]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x5992bf(0x144)](_0xf82f0d,_0x2edbc1)),SceneManager[_0x5992bf(0x1a2)]();break;}}const _0x3faa3f=_0x5dff09[_0x5992bf(0x28a)];if(_0x3faa3f[_0x5992bf(0x29e)](/\[Version[ ](.*?)\]/i)){const _0x50f6c7=Number(RegExp['$1']);_0x50f6c7!==VisuMZ[label][_0x5992bf(0x1d4)]&&(alert(_0x5992bf(0x2b8)['format'](_0xf82f0d,_0x50f6c7)),SceneManager[_0x5992bf(0x1a2)]());}if(_0x3faa3f['match'](/\[Tier[ ](\d+)\]/i)){const _0x314549=Number(RegExp['$1']);_0x314549<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0xf82f0d,_0x314549,tier)),SceneManager['exit']()):tier=Math['max'](_0x314549,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x5992bf(0x1cd)],_0x5dff09[_0x5992bf(0x1e7)]);})(pluginData);function _0x37de(_0x8c8417,_0x237ab4){const _0x5027dc=_0x5027();return _0x37de=function(_0x37de1b,_0x48772c){_0x37de1b=_0x37de1b-0x137;let _0x283b06=_0x5027dc[_0x37de1b];return _0x283b06;},_0x37de(_0x8c8417,_0x237ab4);}function _0x5027(){const _0x2d35dd=['mdr','bypassElementTgr','actorId','_elementIDs','doesTargetMeetCondition','doesAIApplyEvaTgrInfluence','JSON','doesTargetMeetAIConditions','isActionValid','forceValidTargets','isForNotUser','Game_Battler_onBattleEnd','eva','MpDamage%1','EnemyAILevel','VisuMZ_2_BattleSystemFTB','isForFriend','VisuMZ_2_BattleSystemFTB\x20needs\x20to\x20be\x20updated\x20','EVA','elementRate','VisuMZ_1_SkillsStatesCore','meetsSwitchCondition','POSITIVE\x20STATE\x20COUNT','elementIds','makeDefaultConditions','The\x20reason\x20is\x20due\x20to\x20the\x20turnCount()\x20function.\x0a','initBattleAI','enemy','value1','FDR','BattleAI','gambit','states','note','doesAIApplyMevTgrInfluence','Game_Troop_setup','makeActions','determineLineValue','numActions','The\x20following\x20line\x20is\x20not\x20supported\x20by\x20Battle\x20A.I.:\x0a\x0a','makeValidTargets','OnSpotAI','canGuard','LUK','anyCondition','1165677gWyPmR','debuff','split','RemoveState%1','AI\x20Manager\x20could\x20not\x20determine\x20this\x20value:\x20%1','isForAnyone','description','casual','EFFECT_ADD_BUFF','setAiTgrInfluences','bypassMevTgr','mpRate','_forceValidTargets','max','_stateIDs','getDefaultAnyConditions','tpRate','isForAnyoneFocusOpponents','Game_Unit_randomTarget','turnCount','setSkill','DEF','EFFECT_REMOVE_BUFF','removeOncePerTurnAction','TP%','Game_Battler_onBattleStart','match','isPlaytest','Game_Action_isForOpponentBattleCore','hpRate','mevInfluenceRate','ARRAYEVAL','EFFECT_ADD_DEBUFF','EFFECT_RECOVER_MP','elementKnowledgeRate','buff','isForOpponent','getAllConditions','STR','reduce','opponentsUnit','maxTp','RemoveDebuff%1','TGR','VisuMZ_2_BattleSystemPTB','CEV','enemyId','EXR','VisuMZ_2_BattleSystemETB\x20needs\x20to\x20be\x20updated\x20','currentClass','referenceEnemyForAI','MAXTP','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','POSITIVE','ConvertParams','1569912OTEvrm','MDF','NEGATIVE\x20STATE\x20COUNT','forcedTargets','aiKnowledge','return\x200','32960SHCUKw','isMax%1Affected','289286xMIvzq','prototype','itemTargetCandidates','Game_Unit_aliveMembers','isBuffAffected','Game_Unit_initialize','format','_aiKnowledge','endAction','EvaTgrRate','parse','onBattleEnd','clearActions','mhp','ARRAYJSON','mev','apply','General','ActorAIReference','NEGATIVE','randomInt','actor','Game_Action_makeTargets','_onSpotMadeActionsDeterminedByAI','makeDeepCopy','value','classic','determineActionByAIisStillValid','BattleManager_getNextSubject','319779oDFnHV','aiApplyPdrTgrInfluenceRate','elementInfluenceRate','HpRecover%1','doesTargetMeetAnyConditions','MpRecover%1','_rngChance','CRI','ElementTgrRate','meetsPartyLevelCondition','addXParamAIKnowledge','_forceAction','getElementIdWithName','value2','floor','MevTgr','getNextSubject','elements','selectAllActionsRandom','param','%1\x20%2\x20%3','revive','aiTgrInfluence','EFFECT_ADD_STATE','makeAutoBattleActionsWithEnemyAI','Game_Battler_isChanting','Game_Action_apply','is%1Affected','aiLevel','filter','aiRatingVariance','ActorStyleAI','toLowerCase','getDefaultAllConditions','mmp','ElementTgr','EnemyRatingVariance','user','FUNC','push','BattleManager_startAction','onBattleStart','HpDrain%1','passesAILevel','pdrInfluenceRate','BattleManager_endAction','remove','meetsStateCondition','HP%','type','needsSelection','subject','ShuffleArray','isSTB','aiApplyEvaTgrInfluenceRate','doesTargetMeetAllConditions','aiEvaTgr','random','MAX_SAFE_INTEGER','applyBattleAI','Game_Battler_makeActions','isTpb','_regexp','hasXParamAIKnowledge','noCondition','bypassPdrTgr','VisuMZ_1_ElementStatusCore','meetsHpCondition','canAttack','charAt','aliveMembers','exit','clearForcedTargets','Game_Enemy_isActionValid','CNT','action','STRUCT','status','isChanting','usableSkills','BattleSystemETB','isEnemy','aiApplyElementalTgrInfluenceRate','aiApplyMevTgrInfluenceRate','guardSkillId','currentAction','Game_BattlerBase_revive','getStateIdWithName','_subject','log','VisuMZ_2_AggroControlSystem','isSkill','8sCyuqU','level','Game_Battler_turnCount','filterForcedTargeting','AddState%1','toUpperCase','RemoveBuff%1','bypassMdrTgr','isActor','HpDamage%1','selectAllActionsClassic','onAllActionsEnd','slice','isForOpponentBattleCore','evaInfluenceRate','getAnyConditions','statesByCategory','VisuMZ_2_BattleSystemPTB\x20needs\x20to\x20be\x20updated\x20','selectAllActionsGambit','FIRST','attackElements','effects','Settings','hasElementAIKnowledge','setEnemyAction','EnemyStyleAI','ARRAYSTR','Game_Battler_onAllActionsEnd','attackSkillId','version','Default','aiApplyMdrTgrInfluenceRate','meetsCondition','All','GRD','Game_BattlerBase_sparam','Game_BattlerBase_die','isPhysical','isMagical','AddBuff%1','Game_Temp_initialize','PHA','selectAllActions','in\x20order\x20for\x20VisuMZ_3_BattleAI\x20to\x20work.','61895dGMdrF','clearAiTgrInfluence','isStateAffected','Weight','parameters','EnableAllCon','concat','skillId','Any','MCR','doesAIApplyPdrTgrInfluence','Game_Action_itemTargetCandidates','PDR','aiMevTgr','HRG','MdrTgr','PdrTgr','elementRates','For\x20more\x20information,\x20view\x20the\x20help\x20file.','code','evaRates','makeAutoBattleActions','includes','die','initialize','isForDeadFriend','isDamage','clamp','VisuMZ_2_BattleSystemSTB','_alertTurnCount','BattleSystemPTB','MRG','STATE\x20COUNT','isConfused','allCondition','_applyAIForcedTargetFilters','AGI','startAction','AI\x20Manager\x20condition\x20cannot\x20be\x20met:\x20%1','_stateTurns','_buffTurns','elementId','ALWAYS','isForEveryone','MRF','randomTarget','aiTarget','isFTB','MAXHP','getEnemyIdWithName','TRG','selectAction','xparam','isConditionalAI','bypassEvaTgr','damage','addElementAIKnowledge','MAXMP','makeTargets','ATK','canUse','doesAIApplyElementalTgrInfluence','sparam','ARRAYNUM','MP%','HIT','LearnKnowledge','aiStyle','1855763HxVhra','autoRemovalTiming','340AWOcRE','isForBattleGrid','EFFECT_REMOVE_DEBUFF','isDebuffAffected','name','ActorRatingVariance','_bypassAiValidCheck','NUM','addAIKnowledge','friendsUnit','hasValidTargets','MdrTgrRate','isForAnyoneFocusFriends','EVAL','Game_Actor_makeAutoBattleActions','_aiTgrInfluence','checkSkillTargets','clearAIKnowledge','dataId','determineNewValidAIAction','indexOf','LEVEL','map','item','replace','meetsMpCondition','isAutoBattle','elementInfluence','MAT','VisuMZ_1_BattleCore','highestTgrMember','rating','EFFECT_REMOVE_STATE','EnableAnyCon','ARRAYSTRUCT','AddDebuff%1','isAggroAffected','78sIFEIA','applyBattleAiTgrInfluences','call','doesAIApplyMdrTgrInfluence','pdr','isDetermineActionByAI','length','trim','determineTargetActionByAIisStillValid'];_0x5027=function(){return _0x2d35dd;};return _0x5027();}function AIManager(){throw new Error('This\x20is\x20a\x20static\x20class');}AIManager[_0x26c7a9(0x199)]={'noCondition':/<NO AI (?:TARGETS|CONDITION|CONDITIONS)>/i,'allCondition':/<ALL AI (?:TARGETS|CONDITION|CONDITIONS)>\s*([\s\S]*)\s*<\/ALL AI (?:TARGETS|CONDITION|CONDITIONS)>/i,'anyCondition':/<ANY AI (?:TARGETS|CONDITION|CONDITIONS)>\s*([\s\S]*)\s*<\/ANY AI (?:TARGETS|CONDITION|CONDITIONS)>/i,'bypassElementTgr':/<(?:NO|BYPASS) AI (?:ELEMENT|ELEMENTAL|ELEMENT RATE) INFLUENCE>/i,'bypassEvaTgr':/<(?:NO|BYPASS) AI (?:EVA|EVASION) INFLUENCE>/i,'bypassMevTgr':/<(?:NO|BYPASS) AI (?:MEV|MAGIC EVASION) INFLUENCE>/i,'bypassPdrTgr':/<(?:NO|BYPASS) AI (?:PDR|PHYSICAL DAMAGE RATE) INFLUENCE>/i,'bypassMdrTgr':/<(?:NO|BYPASS) AI (?:MDR|MAGICAL DAMAGE RATE) INFLUENCE>/i,'aiElementTgr':/<AI (?:ELEMENT|ELEMENTAL|ELEMENT RATE) INFLUENCE: (.*)>/i,'aiEvaTgr':/<AI (?:EVA|EVASION) INFLUENCE: (.*)>/i,'aiMevTgr':/<AI (?:MEV|MAGIC EVASION) INFLUENCE: (.*)>/i,'aiPdrTgr':/<AI (?:PDR|PHYSICAL DAMAGE RATE) INFLUENCE: (.*)>/i,'aiMdrTgr':/<AI (?:MDR|MAGICAL DAMAGE RATE) INFLUENCE: (.*)>/i,'aiLevel':/<AI LEVEL: (\d+)>/i,'aiRatingVariance':/<AI RATING VARIANCE: (\d+)>/i,'aiTarget':/<AI (?:TARGET|TARGETS):[ ](.*)>/i,'aiStyle':/<AI STYLE:[ ](.*)>/i},AIManager[_0x26c7a9(0x218)]=function(_0x5e3f50){const _0x38c6af=_0x26c7a9;if(!_0x5e3f50)return![];return this['getAllConditions'](_0x5e3f50)[_0x38c6af(0x254)]>0x0||this[_0x38c6af(0x1c6)](_0x5e3f50)[_0x38c6af(0x254)]>0x0;},AIManager[_0x26c7a9(0x2a9)]=function(_0x43a9b1){const _0x451484=_0x26c7a9;if(_0x43a9b1['note']['match'](AIManager['_regexp'][_0x451484(0x19b)]))return[];else return _0x43a9b1[_0x451484(0x278)][_0x451484(0x29e)](AIManager[_0x451484(0x199)][_0x451484(0x205)])?String(RegExp['$1'])[_0x451484(0x286)](/[\r\n]+/)['remove'](''):this[_0x451484(0x17c)](_0x43a9b1);},AIManager[_0x26c7a9(0x1c6)]=function(_0x5d6582){const _0x4bec4d=_0x26c7a9;if(_0x5d6582[_0x4bec4d(0x278)]['match'](AIManager['_regexp'][_0x4bec4d(0x19b)]))return[];else return _0x5d6582[_0x4bec4d(0x278)][_0x4bec4d(0x29e)](AIManager[_0x4bec4d(0x199)][_0x4bec4d(0x283)])?String(RegExp['$1'])[_0x4bec4d(0x286)](/[\r\n]+/)[_0x4bec4d(0x189)](''):this[_0x4bec4d(0x293)](_0x5d6582);},AIManager[_0x26c7a9(0x17c)]=function(_0x2a65f0){const _0x22da06=_0x26c7a9;if(!VisuMZ[_0x22da06(0x275)]['Settings'][_0x22da06(0x1d5)][_0x22da06(0x1e8)])return[];if(_0x2a65f0[_0x22da06(0x278)]['match'](AIManager[_0x22da06(0x199)]['anyCondition']))return[];return this['makeDefaultConditions'](_0x2a65f0,_0x22da06(0x1d8));},AIManager[_0x26c7a9(0x293)]=function(_0x161dba){const _0x33224b=_0x26c7a9;if(!VisuMZ[_0x33224b(0x275)][_0x33224b(0x1cd)][_0x33224b(0x1d5)][_0x33224b(0x24a)])return[];if(_0x161dba[_0x33224b(0x278)]['match'](AIManager[_0x33224b(0x199)][_0x33224b(0x205)]))return[];return this[_0x33224b(0x26f)](_0x161dba,_0x33224b(0x1eb));},AIManager[_0x26c7a9(0x26f)]=function(_0x5a3ef1,_0x124225){const _0x21916f=_0x26c7a9;if(!_0x5a3ef1)return[];const _0x4334c6=VisuMZ[_0x21916f(0x275)][_0x21916f(0x1cd)][_0x21916f(0x1d5)],_0x51dcb7=[_0x21916f(0x213),_0x21916f(0x21c),_0x21916f(0x21e),_0x21916f(0x299),_0x21916f(0x245),_0x21916f(0x137),'AGI',_0x21916f(0x282)],_0x44dad4=_0x5a3ef1[_0x21916f(0x21a)][_0x21916f(0x18c)],_0x7bf0c0=_0x5a3ef1[_0x21916f(0x1cc)];let _0x2bc701=[],_0x5cce84='',_0x376f4f='';switch(_0x44dad4){case 0x1:_0x5cce84=_0x21916f(0x1c0)[_0x21916f(0x144)](_0x124225),_0x376f4f=_0x4334c6[_0x5cce84],_0x2bc701=_0x2bc701[_0x21916f(0x1e9)](_0x376f4f['split'](/[\r\n]+/)[_0x21916f(0x189)](''));break;case 0x2:_0x5cce84=_0x21916f(0x264)[_0x21916f(0x144)](_0x124225),_0x376f4f=_0x4334c6[_0x5cce84],_0x2bc701=_0x2bc701[_0x21916f(0x1e9)](_0x376f4f[_0x21916f(0x286)](/[\r\n]+/)[_0x21916f(0x189)](''));break;case 0x3:_0x5cce84=_0x21916f(0x15e)[_0x21916f(0x144)](_0x124225),_0x376f4f=_0x4334c6[_0x5cce84],_0x2bc701=_0x2bc701[_0x21916f(0x1e9)](_0x376f4f[_0x21916f(0x286)](/[\r\n]+/)['remove'](''));break;case 0x4:_0x5cce84=_0x21916f(0x160)['format'](_0x124225),_0x376f4f=_0x4334c6[_0x5cce84],_0x2bc701=_0x2bc701[_0x21916f(0x1e9)](_0x376f4f[_0x21916f(0x286)](/[\r\n]+/)[_0x21916f(0x189)](''));break;case 0x5:_0x5cce84=_0x21916f(0x185)[_0x21916f(0x144)](_0x124225),_0x376f4f=_0x4334c6[_0x5cce84],_0x2bc701=_0x2bc701[_0x21916f(0x1e9)](_0x376f4f[_0x21916f(0x286)](/[\r\n]+/)[_0x21916f(0x189)](''));break;case 0x6:_0x5cce84='MpDrain%1'[_0x21916f(0x144)](_0x124225),_0x376f4f=_0x4334c6[_0x5cce84],_0x2bc701=_0x2bc701[_0x21916f(0x1e9)](_0x376f4f[_0x21916f(0x286)](/[\r\n]+/)[_0x21916f(0x189)](''));break;}for(const _0x2b5857 of _0x7bf0c0){if(!_0x2b5857)continue;switch(_0x2b5857[_0x21916f(0x1f6)]){case Game_Action['EFFECT_RECOVER_HP']:if(_0x2b5857[_0x21916f(0x273)]>0x0||_0x2b5857[_0x21916f(0x168)]>0x0)_0x5cce84='HpRecover%1'[_0x21916f(0x144)](_0x124225),_0x376f4f=_0x4334c6[_0x5cce84],_0x2bc701=_0x2bc701[_0x21916f(0x1e9)](_0x376f4f[_0x21916f(0x286)](/[\r\n]+/)[_0x21916f(0x189)](''));else(_0x2b5857['value1']<0x0||_0x2b5857[_0x21916f(0x168)]<0x0)&&(_0x5cce84=_0x21916f(0x1c0)['format'](_0x124225),_0x376f4f=_0x4334c6[_0x5cce84],_0x2bc701=_0x2bc701[_0x21916f(0x1e9)](_0x376f4f[_0x21916f(0x286)](/[\r\n]+/)[_0x21916f(0x189)]('')));break;case Game_Action[_0x21916f(0x2a5)]:if(_0x2b5857[_0x21916f(0x273)]>0x0||_0x2b5857[_0x21916f(0x168)]>0x0)_0x5cce84='MpRecover%1'[_0x21916f(0x144)](_0x124225),_0x376f4f=_0x4334c6[_0x5cce84],_0x2bc701=_0x2bc701[_0x21916f(0x1e9)](_0x376f4f['split'](/[\r\n]+/)[_0x21916f(0x189)](''));else(_0x2b5857[_0x21916f(0x273)]<0x0||_0x2b5857['value2']<0x0)&&(_0x5cce84=_0x21916f(0x264)['format'](_0x124225),_0x376f4f=_0x4334c6[_0x5cce84],_0x2bc701=_0x2bc701[_0x21916f(0x1e9)](_0x376f4f[_0x21916f(0x286)](/[\r\n]+/)[_0x21916f(0x189)]('')));break;case Game_Action[_0x21916f(0x172)]:if(_0x2b5857[_0x21916f(0x23b)]===0x0)continue;_0x5cce84=_0x21916f(0x1bb)['format'](_0x124225),_0x376f4f=_0x4334c6[_0x5cce84]['format'](_0x2b5857[_0x21916f(0x23b)]),_0x2bc701=_0x2bc701[_0x21916f(0x1e9)](_0x376f4f['split'](/[\r\n]+/)['remove'](''));break;case Game_Action[_0x21916f(0x249)]:_0x5cce84=_0x21916f(0x287)[_0x21916f(0x144)](_0x124225),_0x376f4f=_0x4334c6[_0x5cce84][_0x21916f(0x144)](_0x2b5857[_0x21916f(0x23b)]),_0x2bc701=_0x2bc701[_0x21916f(0x1e9)](_0x376f4f[_0x21916f(0x286)](/[\r\n]+/)[_0x21916f(0x189)](''));break;case Game_Action[_0x21916f(0x28c)]:_0x5cce84=_0x21916f(0x1de)[_0x21916f(0x144)](_0x124225),_0x376f4f=_0x4334c6[_0x5cce84][_0x21916f(0x144)](_0x51dcb7[_0x2b5857[_0x21916f(0x23b)]]),_0x2bc701=_0x2bc701[_0x21916f(0x1e9)](_0x376f4f[_0x21916f(0x286)](/[\r\n]+/)['remove'](''));break;case Game_Action[_0x21916f(0x2a4)]:_0x5cce84=_0x21916f(0x24c)[_0x21916f(0x144)](_0x124225),_0x376f4f=_0x4334c6[_0x5cce84][_0x21916f(0x144)](_0x51dcb7[_0x2b5857[_0x21916f(0x23b)]]),_0x2bc701=_0x2bc701['concat'](_0x376f4f[_0x21916f(0x286)](/[\r\n]+/)[_0x21916f(0x189)](''));break;case Game_Action[_0x21916f(0x29a)]:_0x5cce84=_0x21916f(0x1bd)[_0x21916f(0x144)](_0x124225),_0x376f4f=_0x4334c6[_0x5cce84][_0x21916f(0x144)](_0x51dcb7[_0x2b5857[_0x21916f(0x23b)]]),_0x2bc701=_0x2bc701['concat'](_0x376f4f['split'](/[\r\n]+/)[_0x21916f(0x189)](''));break;case Game_Action[_0x21916f(0x22b)]:_0x5cce84=_0x21916f(0x2ae)['format'](_0x124225),_0x376f4f=_0x4334c6[_0x5cce84][_0x21916f(0x144)](_0x51dcb7[_0x2b5857[_0x21916f(0x23b)]]),_0x2bc701=_0x2bc701[_0x21916f(0x1e9)](_0x376f4f[_0x21916f(0x286)](/[\r\n]+/)[_0x21916f(0x189)](''));break;}}return _0x2bc701;},AIManager['forceValidTargets']=function(_0x332e64,_0x2a7427){const _0x1011e7=_0x26c7a9;this['_forceValidTargets']=this[_0x1011e7(0x27f)](_0x332e64,_0x2a7427);},AIManager[_0x26c7a9(0x1a3)]=function(){const _0x49504b=_0x26c7a9;this[_0x49504b(0x290)]=[];},AIManager[_0x26c7a9(0x139)]=function(){const _0x1f2729=_0x26c7a9;return this['_forceValidTargets']=this[_0x1f2729(0x290)]||[],this[_0x1f2729(0x290)];},AIManager['hasForcedTargets']=function(){const _0x5e0e68=_0x26c7a9;return this[_0x5e0e68(0x139)]()[_0x5e0e68(0x254)]>0x0;},AIManager[_0x26c7a9(0x233)]=function(_0x3a00dc,_0x5a4105){const _0x2bff4a=_0x26c7a9;if(!_0x3a00dc)return![];if(!_0x5a4105)return![];if(!DataManager[_0x2bff4a(0x1b6)](_0x5a4105))return;return this[_0x2bff4a(0x218)](_0x5a4105)?this[_0x2bff4a(0x27f)](_0x3a00dc,_0x5a4105)['length']>=0x1:!![];},AIManager[_0x26c7a9(0x27f)]=function(_0x34a54c,_0x3f09bd){const _0x3ee077=_0x26c7a9;let _0xfe945f=[];if(this[_0x3ee077(0x218)](_0x3f09bd)){const _0x3bd8f0=this[_0x3ee077(0x2a9)](_0x3f09bd),_0x444998=this[_0x3ee077(0x1c6)](_0x3f09bd),_0xf471b4=new Game_Action(_0x34a54c);_0xf471b4[_0x3ee077(0x298)](_0x3f09bd['id']);let _0x271c03=AIManager[_0x3ee077(0x239)](_0x34a54c,_0xf471b4);this[_0x3ee077(0x161)]=Math[_0x3ee077(0x194)](),_0xfe945f=_0x271c03[_0x3ee077(0x178)](_0x419010=>this[_0x3ee077(0x25e)](_0x34a54c,_0x419010,_0x3f09bd,_0x3bd8f0,_0x444998));}return _0xfe945f;},AIManager[_0x26c7a9(0x239)]=function(_0x356f51,_0x3f25aa){const _0xda23d5=_0x26c7a9;let _0x38a174=[];if(Imported[_0xda23d5(0x1b5)]&&_0x3f25aa[_0xda23d5(0x24d)]()){const _0x517563=_0x3f25aa['isForOpponent']()?_0x356f51[_0xda23d5(0x2ac)]():_0x356f51[_0xda23d5(0x232)]();_0x38a174=[_0x517563[_0xda23d5(0x247)]()];}else{if(_0x3f25aa[_0xda23d5(0x20e)]())_0x38a174=$gameParty[_0xda23d5(0x1a1)]()[_0xda23d5(0x1e9)]($gameTroop['aliveMembers']());else{if(_0x3f25aa[_0xda23d5(0x289)]&&_0x3f25aa[_0xda23d5(0x289)]()){const _0x47ad21=_0x3f25aa[_0xda23d5(0x240)]()['scope'];if(_0x3f25aa[_0xda23d5(0x295)]())_0x38a174=_0x356f51[_0xda23d5(0x2ac)]()[_0xda23d5(0x1a1)]();else _0x3f25aa[_0xda23d5(0x235)]()&&(_0x38a174=_0x356f51[_0xda23d5(0x232)]()[_0xda23d5(0x1a1)]());}else{if(_0x3f25aa[_0xda23d5(0x2a8)]())_0x38a174=_0x356f51['opponentsUnit']()[_0xda23d5(0x1a1)]();else{if(_0x3f25aa['isForDeadFriend']())_0x38a174=_0x356f51[_0xda23d5(0x232)]()['deadMembers']();else _0x3f25aa[_0xda23d5(0x267)]()&&!_0x3f25aa[_0xda23d5(0x1fc)]()&&(_0x38a174=_0x356f51['friendsUnit']()[_0xda23d5(0x1a1)]());}}}}return _0x3f25aa[_0xda23d5(0x261)]&&_0x3f25aa[_0xda23d5(0x261)]()&&_0x38a174[_0xda23d5(0x189)](_0x356f51),_0x38a174;},AIManager[_0x26c7a9(0x25e)]=function(_0x49737d,_0x3eac6c,_0x3ec414,_0x4e07a2,_0x2694af){const _0xc23f42=_0x26c7a9;return this[_0xc23f42(0x192)](_0x49737d,_0x3eac6c,_0x3ec414,_0x4e07a2)&&this[_0xc23f42(0x15f)](_0x49737d,_0x3eac6c,_0x3ec414,_0x2694af);},AIManager[_0x26c7a9(0x192)]=function(_0x4edd5b,_0x253e83,_0x144a9a,_0x8dfac8){const _0x2cb2a0=_0x26c7a9;if(_0x8dfac8['length']<=0x0)return!![];for(const _0x555356 of _0x8dfac8){if(!_0x555356)continue;if(_0x555356[_0x2cb2a0(0x254)]<=0x0)continue;if(!this['passesAILevel'](_0x4edd5b))return!![];if(!this['doesTargetMeetCondition'](_0x4edd5b,_0x253e83,_0x144a9a,_0x555356))return![];}return!![];},AIManager[_0x26c7a9(0x15f)]=function(_0x409008,_0x576201,_0x4208ae,_0x71bac9){const _0x34a0b0=_0x26c7a9;if(_0x71bac9['length']<=0x0)return!![];for(const _0x45d155 of _0x71bac9){if(!_0x45d155)continue;if(_0x45d155[_0x34a0b0(0x254)]<=0x0)continue;if(!this[_0x34a0b0(0x186)](_0x409008))return!![];if(this[_0x34a0b0(0x25b)](_0x409008,_0x576201,_0x4208ae,_0x45d155))return!![];}return![];},AIManager[_0x26c7a9(0x186)]=function(_0x5c81cd){const _0x9a88f2=_0x26c7a9,_0x35c5e9=_0x5c81cd[_0x9a88f2(0x177)]();return Math['randomInt'](0x64)<_0x35c5e9;},AIManager[_0x26c7a9(0x25b)]=function(_0x1beaee,_0x51746d,_0x941ae7,_0x9e3789){const _0x20428d=_0x26c7a9,_0x15b04d=[_0x20428d(0x213),'MAXMP','ATK',_0x20428d(0x299),_0x20428d(0x245),_0x20428d(0x137),'AGI',_0x20428d(0x282)];if(_0x9e3789[_0x20428d(0x1bc)]()[_0x20428d(0x255)]()===_0x20428d(0x20d))return!![];const _0x3dc3bd=_0x1beaee;if(!VisuMZ[_0x20428d(0x275)][_0x20428d(0x1cd)][_0x20428d(0x14f)][_0x20428d(0x280)]){if(_0x9e3789['match'](/turnCount\(\)/i)){if($gameTemp[_0x20428d(0x29f)]()&&!this[_0x20428d(0x200)]){let _0x338e3f=_0x20428d(0x27e);_0x338e3f+=_0x9e3789+'\x0a\x0a',_0x338e3f+=_0x20428d(0x270),_0x338e3f+=_0x20428d(0x1f5),alert(_0x338e3f),this[_0x20428d(0x200)]=!![];}return![];}}if(_0x9e3789[_0x20428d(0x29e)](/(.*) (\>=|\>|===|!==|\<|\<=) (.*)/i)){const _0x543321=[String(RegExp['$1']),String(RegExp['$2']),String(RegExp['$3'])],_0x24cf09=this[_0x20428d(0x27c)](_0x1beaee,_0x51746d,_0x941ae7,_0x543321[0x0]),_0x57923e=_0x543321[0x1],_0x18c837=this['determineLineValue'](_0x1beaee,_0x51746d,_0x941ae7,_0x543321[0x2]);window[_0x20428d(0x180)]=window['a']=window['b']=undefined;const _0x4986e6=_0x20428d(0x16f)[_0x20428d(0x144)](_0x24cf09,_0x57923e,_0x18c837);try{return eval(_0x4986e6);}catch(_0xa4f90c){return $gameTemp[_0x20428d(0x29f)]()&&(console[_0x20428d(0x1b4)](_0x20428d(0x209)['format'](_0x9e3789)),console[_0x20428d(0x1b4)](_0xa4f90c)),!![];}}else{if(_0x9e3789[_0x20428d(0x29e)](/(\d+\.?\d*)([%％]) CHANCE/i)){const _0x31b0f4=Number(RegExp['$1'])*0.01;return this['_rngChance']<_0x31b0f4;}else{if(_0x9e3789[_0x20428d(0x29e)](/SWITCH (\d+) (ON|OFF|TRUE|FALSE)/i)){const _0x117528=Number(RegExp['$1']),_0x2785c9=String(RegExp['$2'])[_0x20428d(0x17b)](),_0x228a10=_0x2785c9[_0x20428d(0x29e)](/ON|TRUE/i);return $gameSwitches[_0x20428d(0x157)](_0x117528)===_0x228a10;}else{if(_0x9e3789[_0x20428d(0x29e)](/(.*) IS ACTOR/i)){const _0x11828c=String(RegExp['$1'])['match'](/(?:USER|SUBJECT)/i)?_0x3dc3bd:_0x51746d;return _0x11828c[_0x20428d(0x1bf)]();}else{if(_0x9e3789[_0x20428d(0x29e)](/(.*) IS ENEMY/i)){const _0x275901=String(RegExp['$1'])[_0x20428d(0x29e)](/(?:USER|SUBJECT)/i)?_0x3dc3bd:_0x51746d;return _0x275901[_0x20428d(0x1ac)]();}else{if(_0x9e3789['match'](/(.*) HAS STATE (\d+)/i)){const _0x3461ab=$dataStates[Number(RegExp['$2'])],_0x32da37=String(RegExp['$1'])[_0x20428d(0x29e)](/(?:USER|SUBJECT)/i)?_0x3dc3bd:_0x51746d;return _0x32da37[_0x20428d(0x277)]()[_0x20428d(0x1f9)](_0x3461ab);}else{if(_0x9e3789[_0x20428d(0x29e)](/(.*) HAS STATE (.*)/i)){const _0xc50e71=$dataStates[DataManager[_0x20428d(0x1b2)](RegExp['$2'])],_0x2f0454=String(RegExp['$1'])[_0x20428d(0x29e)](/(?:USER|SUBJECT)/i)?_0x3dc3bd:_0x51746d;return _0x2f0454[_0x20428d(0x277)]()[_0x20428d(0x1f9)](_0xc50e71);}else{if(_0x9e3789[_0x20428d(0x29e)](/(.*) NOT STATE (\d+)/i)){const _0xa9e248=$dataStates[Number(RegExp['$2'])],_0x4251a7=String(RegExp['$1'])[_0x20428d(0x29e)](/(?:USER|SUBJECT)/i)?_0x3dc3bd:_0x51746d;return!_0x4251a7['states']()[_0x20428d(0x1f9)](_0xa9e248);}else{if(_0x9e3789[_0x20428d(0x29e)](/(.*) NOT STATE (.*)/i)){const _0xc09871=$dataStates[DataManager[_0x20428d(0x1b2)](RegExp['$2'])],_0x54eca4=String(RegExp['$1'])[_0x20428d(0x29e)](/(?:USER|SUBJECT)/i)?_0x3dc3bd:_0x51746d;return!_0x54eca4[_0x20428d(0x277)]()[_0x20428d(0x1f9)](_0xc09871);}else{if(_0x9e3789[_0x20428d(0x29e)](/(.*) HAS (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF)/i)){const _0x3d5a70=_0x15b04d[_0x20428d(0x23d)](String(RegExp['$2'])[_0x20428d(0x1bc)]()[_0x20428d(0x255)]()),_0x1b333b=String(RegExp['$3'])[_0x20428d(0x17b)]()[_0x20428d(0x255)](),_0x1c612b=String(RegExp['$1'])['match'](/(?:USER|SUBJECT)/i)?_0x3dc3bd:_0x51746d,_0x95196b=_0x20428d(0x176)[_0x20428d(0x144)](_0x1b333b[_0x20428d(0x1a0)](0x0)['toUpperCase']()+_0x1b333b[_0x20428d(0x1c3)](0x1));return _0x1c612b[_0x95196b](_0x3d5a70);}else{if(_0x9e3789[_0x20428d(0x29e)](/(.*) HAS (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) MAX (BUFF|DEBUFF)/i)){const _0x10c0d4=_0x15b04d[_0x20428d(0x23d)](String(RegExp['$2'])[_0x20428d(0x1bc)]()[_0x20428d(0x255)]()),_0x2d031a=String(RegExp['$3'])['toLowerCase']()[_0x20428d(0x255)](),_0x2c2ade=String(RegExp['$1'])[_0x20428d(0x29e)](/(?:USER|SUBJECT)/i)?_0x3dc3bd:_0x51746d,_0x40fd63=_0x20428d(0x13d)[_0x20428d(0x144)](_0x2d031a[_0x20428d(0x1a0)](0x0)[_0x20428d(0x1bc)]()+_0x2d031a[_0x20428d(0x1c3)](0x1));return _0x2c2ade[_0x40fd63](_0x10c0d4);}else{if(_0x9e3789[_0x20428d(0x29e)](/(.*) NOT (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF)/i)){const _0x257f09=_0x15b04d['indexOf'](String(RegExp['$2'])['toUpperCase']()[_0x20428d(0x255)]()),_0x57da97=String(RegExp['$3'])[_0x20428d(0x17b)]()[_0x20428d(0x255)](),_0x1d4a28=String(RegExp['$1'])[_0x20428d(0x29e)](/(?:USER|SUBJECT)/i)?_0x3dc3bd:_0x51746d,_0x26202e='is%1Affected'[_0x20428d(0x144)](_0x57da97[_0x20428d(0x1a0)](0x0)[_0x20428d(0x1bc)]()+_0x57da97[_0x20428d(0x1c3)](0x1));return!_0x1d4a28[_0x26202e](_0x257f09);}else{if(_0x9e3789[_0x20428d(0x29e)](/(.*) NOT (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) MAX (BUFF|DEBUFF)/i)){const _0x18f73f=_0x15b04d[_0x20428d(0x23d)](String(RegExp['$2'])[_0x20428d(0x1bc)]()[_0x20428d(0x255)]()),_0x3c18df=String(RegExp['$3'])[_0x20428d(0x17b)]()['trim'](),_0x4bcd06=String(RegExp['$1'])['match'](/(?:USER|SUBJECT)/i)?_0x3dc3bd:_0x51746d,_0x26413e=_0x20428d(0x13d)[_0x20428d(0x144)](_0x3c18df['charAt'](0x0)['toUpperCase']()+_0x3c18df[_0x20428d(0x1c3)](0x1));return!_0x4bcd06[_0x26413e](_0x18f73f);}}}}}}}}}}}}}return!![];},AIManager[_0x26c7a9(0x27c)]=function(_0x3bd42a,_0x275399,_0x33b303,_0x362421){const _0x4b6c4c=_0x26c7a9,_0x274f57=[_0x4b6c4c(0x213),'MAXMP','ATK',_0x4b6c4c(0x299),_0x4b6c4c(0x245),'MDF',_0x4b6c4c(0x207),_0x4b6c4c(0x282)];window['user']=_0x3bd42a,window['a']=user,window['b']=_0x275399;const _0x46a656=_0x362421,_0xe6e2fa=user['opponentsUnit']();let _0x1ec455=_0x362421['match'](/(?:USER|SUBJECT)/i)?user:_0x275399;_0x362421=_0x362421[_0x4b6c4c(0x241)](/\b(\d+)([%％])/gi,(_0x5d6c7d,_0x9cd95e)=>Number(_0x9cd95e)*0.01);if(_0x362421[_0x4b6c4c(0x29e)](/(?:VAR|VARIABLE) (\d+)/i))return $gameVariables[_0x4b6c4c(0x157)](Number(RegExp['$1']));if(_0x362421[_0x4b6c4c(0x29e)](/TEAM ALIVE MEMBERS/i))return _0x1ec455[_0x4b6c4c(0x232)]()[_0x4b6c4c(0x1a1)]()[_0x4b6c4c(0x254)];if(_0x362421['match'](/TEAM DEAD MEMBERS/i))return _0x1ec455[_0x4b6c4c(0x232)]()['deadMembers']()['length'];if(_0x362421[_0x4b6c4c(0x29e)](/ELEMENT (\d+) RATE/i)){const _0x1d5ea7=Number(RegExp['$1']);return this['elementKnowledgeRate'](_0x3bd42a,_0x275399,_0x1ec455,_0x1d5ea7);}else{if(_0x362421[_0x4b6c4c(0x29e)](/ELEMENT (.*) RATE/i)){const _0x1d4620=DataManager[_0x4b6c4c(0x167)](String(RegExp['$1']));return this[_0x4b6c4c(0x2a6)](_0x3bd42a,_0x275399,_0x1ec455,_0x1d4620);}else{if(_0x362421['match'](/(.*) ELEMENT RATE/i)){const _0x427578=DataManager[_0x4b6c4c(0x167)](String(RegExp['$1']));return this[_0x4b6c4c(0x2a6)](_0x3bd42a,_0x275399,_0x1ec455,_0x427578);}}}if(_0x362421[_0x4b6c4c(0x29e)](/(MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF) (?:LEVEL|STACK|STACKS)/i)){const _0x17ec50=_0x274f57[_0x4b6c4c(0x23d)](String(RegExp['$1'])[_0x4b6c4c(0x1bc)]()[_0x4b6c4c(0x255)]()),_0x36cfd9=String(RegExp['$2'])[_0x4b6c4c(0x17b)]()[_0x4b6c4c(0x255)]();return _0x1ec455[_0x4b6c4c(0x2a7)](_0x17ec50)*(_0x36cfd9==='buff'?0x1:-0x1);}if(_0x362421[_0x4b6c4c(0x29e)](/(MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF) (?:TURN|TURNS)/i)){const _0x4de4af=_0x274f57[_0x4b6c4c(0x23d)](String(RegExp['$1'])[_0x4b6c4c(0x1bc)]()[_0x4b6c4c(0x255)]()),_0x2fec14=String(RegExp['$2'])['toLowerCase']()[_0x4b6c4c(0x255)]();if(_0x2fec14==='buff'&&_0x1ec455[_0x4b6c4c(0x142)](_0x4de4af))return _0x1ec455[_0x4b6c4c(0x20b)][_0x4de4af];else{if(_0x2fec14===_0x4b6c4c(0x285)&&_0x1ec455[_0x4b6c4c(0x22c)](_0x4de4af))return _0x1ec455[_0x4b6c4c(0x20b)][_0x4de4af];}return 0x0;}if(_0x362421[_0x4b6c4c(0x29e)](/STATE (\d+) (?:TURN|TURNS)/i)){const _0x310b4f=Number(RegExp['$1']);if(_0x1ec455['isStateAffected'](_0x310b4f)){const _0x4e0868=$dataStates[_0x310b4f];return _0x4e0868&&_0x4e0868[_0x4b6c4c(0x228)]===0x0?Number[_0x4b6c4c(0x195)]:_0x1ec455[_0x4b6c4c(0x20a)][_0x310b4f]||0x0;}else return _0x1ec455['states']()[_0x4b6c4c(0x1f9)]($dataStates[_0x310b4f])?Number['MAX_SAFE_INTEGER']:0x0;}else{if(_0x362421[_0x4b6c4c(0x29e)](/STATE (.*) (?:TURN|TURNS)/i)){const _0x7aa86d=DataManager[_0x4b6c4c(0x1b2)](RegExp['$1']);if(_0x1ec455[_0x4b6c4c(0x1e5)](_0x7aa86d)){const _0x31ce9e=$dataStates[_0x7aa86d];return _0x31ce9e&&_0x31ce9e['autoRemovalTiming']===0x0?Number['MAX_SAFE_INTEGER']:_0x1ec455[_0x4b6c4c(0x20a)][_0x7aa86d]||0x0;}else return _0x1ec455[_0x4b6c4c(0x277)]()[_0x4b6c4c(0x1f9)]($dataStates[_0x7aa86d])?Number[_0x4b6c4c(0x195)]:0x0;}}if(_0x362421[_0x4b6c4c(0x29e)](/\bHP([%％])/i))return _0x1ec455[_0x4b6c4c(0x2a1)]();else{if(_0x362421[_0x4b6c4c(0x29e)](/\bMP([%％])/i))return _0x1ec455['mpRate']();else{if(_0x362421[_0x4b6c4c(0x29e)](/\bTP([%％])/i))return _0x1ec455[_0x4b6c4c(0x294)]();else{if(_0x362421[_0x4b6c4c(0x29e)](/\b(?:MAXHP|MAX HP|MHP)\b/i))return _0x1ec455[_0x4b6c4c(0x14b)];else{if(_0x362421['match'](/\b(?:MAXMP|MAX MP|MMP)\b/i))return _0x1ec455[_0x4b6c4c(0x17d)];else{if(_0x362421['match'](/\b(?:MAXTP|MAX TP|MTP)\b/i))return _0x1ec455[_0x4b6c4c(0x2ad)]();}}}}}if(_0x362421['match'](/\b(LEVEL|HP|MP|TP|ATK|DEF|MAT|MDF|AGI|LUK)\b/i))return _0x1ec455[String(RegExp['$1'])[_0x4b6c4c(0x17b)]()[_0x4b6c4c(0x255)]()];try{return eval(_0x362421);}catch(_0x39bf5a){return $gameTemp[_0x4b6c4c(0x29f)]()&&(console['log'](_0x4b6c4c(0x288)[_0x4b6c4c(0x144)](_0x46a656)),console[_0x4b6c4c(0x1b4)](_0x39bf5a)),0x0;}},AIManager['elementKnowledgeRate']=function(_0x3d3353,_0x3225c0,_0x52e070,_0x273a5d){const _0x2cd508=_0x26c7a9;if(_0x3d3353['isActor']()===_0x52e070[_0x2cd508(0x1bf)]())return _0x52e070['elementRate'](_0x273a5d);else return _0x52e070[_0x2cd508(0x2ac)]()[_0x2cd508(0x1ce)](_0x273a5d,_0x52e070)?_0x52e070[_0x2cd508(0x26a)](_0x273a5d):VisuMZ[_0x2cd508(0x275)][_0x2cd508(0x1cd)][_0x2cd508(0x14f)]['UnknownElementRate'];},AIManager['filterForcedTargeting']=function(_0x25d3d9,_0x9f0480){const _0x1330dd=_0x26c7a9;if(!_0x9f0480)return;if(!_0x9f0480[_0x1330dd(0x278)][_0x1330dd(0x29e)](AIManager['_regexp'][_0x1330dd(0x211)]))return;const _0x556b53=String(RegExp['$1'])[_0x1330dd(0x1bc)]()['trim']();let _0x327cca=this['createFilterTarget'](_0x25d3d9,_0x556b53);_0x327cca&&(this[_0x1330dd(0x290)]=[_0x327cca]);},AIManager['createFilterTarget']=function(_0xdccd15,_0x381d5f){const _0x96b9c2=_0x26c7a9,_0x25a0b4=['MAXHP',_0x96b9c2(0x21c),_0x96b9c2(0x21e),_0x96b9c2(0x299),_0x96b9c2(0x245),'MDF','AGI','LUK'],_0x2fff15=[_0x96b9c2(0x224),_0x96b9c2(0x269),_0x96b9c2(0x162),_0x96b9c2(0x2b1),'MEV',_0x96b9c2(0x20f),_0x96b9c2(0x1a5),_0x96b9c2(0x1f1),_0x96b9c2(0x202),_0x96b9c2(0x215)],_0x1db804=[_0x96b9c2(0x2af),_0x96b9c2(0x1d9),'REC',_0x96b9c2(0x1e0),_0x96b9c2(0x1ec),'TCR',_0x96b9c2(0x1ef),'MDR',_0x96b9c2(0x274),_0x96b9c2(0x2b3)];let _0x724052=null;if(_0x381d5f==='USER'){if(this[_0x96b9c2(0x290)]['includes'](_0xdccd15))return _0xdccd15;}else{if(_0x381d5f===_0x96b9c2(0x1ca))return this[_0x96b9c2(0x290)][0x0];else{if(_0x381d5f==='LAST')return this[_0x96b9c2(0x290)][this[_0x96b9c2(0x290)][_0x96b9c2(0x254)]-0x1];else{if(_0x381d5f['match'](/(HIGHEST|LOWEST)[ ](.*)/i)){const _0x260b10=String(RegExp['$1'])[_0x96b9c2(0x1bc)]()[_0x96b9c2(0x255)]()==='HIGHEST',_0x522300=!_0x260b10,_0x8aa402=String(RegExp['$2'])['toUpperCase']()[_0x96b9c2(0x255)]();if(_0x25a0b4[_0x96b9c2(0x1f9)](_0x8aa402)){const _0x5723ab=_0x25a0b4['indexOf'](_0x8aa402);_0x724052=this[_0x96b9c2(0x290)][0x0];for(const _0x4fa45d of this[_0x96b9c2(0x290)]){if(_0x260b10&&_0x4fa45d[_0x96b9c2(0x16e)](_0x5723ab)>_0x724052[_0x96b9c2(0x16e)](_0x5723ab))_0x724052=_0x4fa45d;if(_0x522300&&_0x4fa45d[_0x96b9c2(0x16e)](_0x5723ab)<_0x724052[_0x96b9c2(0x16e)](_0x5723ab))_0x724052=_0x4fa45d;}return _0x724052;}if(_0x2fff15[_0x96b9c2(0x1f9)](_0x8aa402)){const _0x495c61=_0x2fff15[_0x96b9c2(0x23d)](_0x8aa402);_0x724052=this[_0x96b9c2(0x290)][0x0];for(const _0x41cb6e of this[_0x96b9c2(0x290)]){if(_0x260b10&&_0x41cb6e[_0x96b9c2(0x217)](_0x495c61)>_0x724052[_0x96b9c2(0x217)](_0x495c61))_0x724052=_0x41cb6e;if(_0x522300&&_0x41cb6e[_0x96b9c2(0x217)](_0x495c61)<_0x724052['xparam'](_0x495c61))_0x724052=_0x41cb6e;}return _0x724052;}if(_0x1db804[_0x96b9c2(0x1f9)](_0x8aa402)){const _0x248e8d=_0x1db804[_0x96b9c2(0x23d)](_0x8aa402);_0x724052=this[_0x96b9c2(0x290)][0x0];for(const _0x2d1475 of this[_0x96b9c2(0x290)]){if(_0x260b10&&_0x2d1475[_0x96b9c2(0x221)](_0x248e8d)>_0x724052[_0x96b9c2(0x221)](_0x248e8d))_0x724052=_0x2d1475;if(_0x522300&&_0x2d1475['sparam'](_0x248e8d)<_0x724052[_0x96b9c2(0x221)](_0x248e8d))_0x724052=_0x2d1475;}return _0x724052;}if(_0x8aa402==='HP'){_0x724052=this['_forceValidTargets'][0x0];for(const _0x4f1403 of this[_0x96b9c2(0x290)]){if(_0x260b10&&_0x4f1403['hp']>_0x724052['hp'])_0x724052=_0x4f1403;if(_0x522300&&_0x4f1403['hp']<_0x724052['hp'])_0x724052=_0x4f1403;}return _0x724052;}if(_0x8aa402===_0x96b9c2(0x18b)){_0x724052=this['_forceValidTargets'][0x0];for(const _0xbefb3c of this['_forceValidTargets']){if(_0x260b10&&_0xbefb3c['hpRate']()>_0x724052[_0x96b9c2(0x2a1)]())_0x724052=_0xbefb3c;if(_0x522300&&_0xbefb3c[_0x96b9c2(0x2a1)]()<_0x724052['hpRate']())_0x724052=_0xbefb3c;}return _0x724052;}if(_0x8aa402==='MP'){_0x724052=this[_0x96b9c2(0x290)][0x0];for(const _0x29671c of this['_forceValidTargets']){if(_0x260b10&&_0x29671c['mp']>_0x724052['mp'])_0x724052=_0x29671c;if(_0x522300&&_0x29671c['mp']<_0x724052['mp'])_0x724052=_0x29671c;}return _0x724052;}if(_0x8aa402===_0x96b9c2(0x223)){_0x724052=this['_forceValidTargets'][0x0];for(const _0x44d156 of this[_0x96b9c2(0x290)]){if(_0x260b10&&_0x44d156[_0x96b9c2(0x28f)]()>_0x724052[_0x96b9c2(0x28f)]())_0x724052=_0x44d156;if(_0x522300&&_0x44d156['mpRate']()<_0x724052[_0x96b9c2(0x28f)]())_0x724052=_0x44d156;}return _0x724052;}if(_0x8aa402==='TP'){_0x724052=this['_forceValidTargets'][0x0];for(const _0xafcee5 of this[_0x96b9c2(0x290)]){if(_0x260b10&&_0xafcee5['tp']>_0x724052['tp'])_0x724052=_0xafcee5;if(_0x522300&&_0xafcee5['tp']<_0x724052['tp'])_0x724052=_0xafcee5;}return _0x724052;}if(_0x8aa402===_0x96b9c2(0x29c)){_0x724052=this[_0x96b9c2(0x290)][0x0];for(const _0x1e808d of this['_forceValidTargets']){if(_0x260b10&&_0x1e808d[_0x96b9c2(0x294)]()>_0x724052[_0x96b9c2(0x294)]())_0x724052=_0x1e808d;if(_0x522300&&_0x1e808d['tpRate']()<_0x724052[_0x96b9c2(0x294)]())_0x724052=_0x1e808d;}return _0x724052;}if(_0x8aa402===_0x96b9c2(0x2b7)){_0x724052=this['_forceValidTargets'][0x0];for(const _0x2b4b80 of this[_0x96b9c2(0x290)]){if(_0x260b10&&_0x2b4b80[_0x96b9c2(0x2ad)]()>_0x724052[_0x96b9c2(0x2ad)]())_0x724052=_0x2b4b80;if(_0x522300&&_0x2b4b80[_0x96b9c2(0x2ad)]()<_0x724052[_0x96b9c2(0x2ad)]())_0x724052=_0x2b4b80;}return _0x724052;}if(_0x8aa402===_0x96b9c2(0x23e)){_0x724052=this[_0x96b9c2(0x290)][0x0];for(const _0x1b9f31 of this[_0x96b9c2(0x290)]){if(_0x260b10&&(_0x1b9f31['level']||0x0)>(_0x724052[_0x96b9c2(0x1b8)]||0x0))_0x724052=_0x1b9f31;if(_0x522300&&(_0x1b9f31[_0x96b9c2(0x1b8)]||0x0)<(_0x724052['level']||0x0))_0x724052=_0x1b9f31;}return _0x724052;}if(_0x8aa402===_0x96b9c2(0x203)&&Imported[_0x96b9c2(0x26b)]){_0x724052=this[_0x96b9c2(0x290)][0x0];for(const _0x49efbb of this[_0x96b9c2(0x290)]){if(_0x260b10&&_0x49efbb[_0x96b9c2(0x277)]()[_0x96b9c2(0x254)]>_0x724052[_0x96b9c2(0x277)]()[_0x96b9c2(0x254)])_0x724052=_0x49efbb;if(_0x522300&&_0x49efbb[_0x96b9c2(0x277)]()[_0x96b9c2(0x254)]<_0x724052[_0x96b9c2(0x277)]()['length'])_0x724052=_0x49efbb;}return _0x724052;}if(_0x8aa402===_0x96b9c2(0x26d)&&Imported[_0x96b9c2(0x26b)]){_0x724052=this[_0x96b9c2(0x290)][0x0];const _0x31c428=_0x96b9c2(0x2b9);for(const _0x449f85 of this[_0x96b9c2(0x290)]){if(_0x260b10&&_0x449f85[_0x96b9c2(0x1c7)](_0x31c428)['length']>_0x724052['statesByCategory'](_0x31c428)[_0x96b9c2(0x254)])_0x724052=_0x449f85;if(_0x522300&&_0x449f85[_0x96b9c2(0x1c7)](_0x31c428)[_0x96b9c2(0x254)]<_0x724052['statesByCategory'](_0x31c428)['length'])_0x724052=_0x449f85;}return _0x724052;}if(_0x8aa402===_0x96b9c2(0x138)&&Imported[_0x96b9c2(0x26b)]){_0x724052=this[_0x96b9c2(0x290)][0x0];const _0x3f7bad=_0x96b9c2(0x151);for(const _0x40b8b9 of this[_0x96b9c2(0x290)]){if(_0x260b10&&_0x40b8b9['statesByCategory'](_0x3f7bad)[_0x96b9c2(0x254)]>_0x724052[_0x96b9c2(0x1c7)](_0x3f7bad)[_0x96b9c2(0x254)])_0x724052=_0x40b8b9;if(_0x522300&&_0x40b8b9[_0x96b9c2(0x1c7)](_0x3f7bad)[_0x96b9c2(0x254)]<_0x724052[_0x96b9c2(0x1c7)](_0x3f7bad)[_0x96b9c2(0x254)])_0x724052=_0x40b8b9;}return _0x724052;}}}}}return null;},DataManager['getElementIdWithName']=function(_0x598135){const _0x1023da=_0x26c7a9;_0x598135=_0x598135[_0x1023da(0x1bc)]()[_0x1023da(0x255)](),this['_elementIDs']=this[_0x1023da(0x25a)]||{};if(this[_0x1023da(0x25a)][_0x598135])return this[_0x1023da(0x25a)][_0x598135];let _0x555487=0x1;for(const _0x277c89 of $dataSystem[_0x1023da(0x16c)]){if(!_0x277c89)continue;let _0x5e107f=_0x277c89['toUpperCase']();_0x5e107f=_0x5e107f[_0x1023da(0x241)](/\x1I\[(\d+)\]/gi,''),_0x5e107f=_0x5e107f[_0x1023da(0x241)](/\\I\[(\d+)\]/gi,''),this['_elementIDs'][_0x5e107f]=_0x555487,_0x555487++;}return this['_elementIDs'][_0x598135]||0x0;},DataManager[_0x26c7a9(0x1b2)]=function(_0x5eab0c){const _0x192065=_0x26c7a9;_0x5eab0c=_0x5eab0c[_0x192065(0x1bc)]()['trim'](),this[_0x192065(0x292)]=this[_0x192065(0x292)]||{};if(this[_0x192065(0x292)][_0x5eab0c])return this['_stateIDs'][_0x5eab0c];for(const _0x5e6ff7 of $dataStates){if(!_0x5e6ff7)continue;this['_stateIDs'][_0x5e6ff7['name'][_0x192065(0x1bc)]()[_0x192065(0x255)]()]=_0x5e6ff7['id'];}return this['_stateIDs'][_0x5eab0c]||0x0;},VisuMZ[_0x26c7a9(0x275)][_0x26c7a9(0x15a)]=BattleManager[_0x26c7a9(0x16b)],BattleManager[_0x26c7a9(0x16b)]=function(){const _0x10a545=_0x26c7a9,_0xf76384=VisuMZ[_0x10a545(0x275)][_0x10a545(0x15a)][_0x10a545(0x250)](this);if(_0xf76384&&_0xf76384[_0x10a545(0x253)]()){const _0x22136c=_0xf76384['currentAction']();if(!_0x22136c||_0x22136c&&!_0x22136c[_0x10a545(0x240)]())_0xf76384[_0x10a545(0x27b)]();else{if(VisuMZ[_0x10a545(0x275)][_0x10a545(0x1cd)][_0x10a545(0x14f)]['OnSpotAI']){if(_0x22136c&&_0x22136c[_0x10a545(0x166)])return _0xf76384;_0xf76384[_0x10a545(0x27b)](),Imported[_0x10a545(0x1ff)]&&this[_0x10a545(0x190)]()&&(_0xf76384[_0x10a545(0x155)]=!![]);}}}return _0xf76384;},VisuMZ[_0x26c7a9(0x275)][_0x26c7a9(0x183)]=BattleManager[_0x26c7a9(0x208)],BattleManager['startAction']=function(){const _0x432930=_0x26c7a9;this[_0x432930(0x159)](),this[_0x432930(0x1b3)][_0x432930(0x1b0)]()?VisuMZ[_0x432930(0x275)][_0x432930(0x183)][_0x432930(0x250)](this):this[_0x432930(0x146)]();},VisuMZ[_0x26c7a9(0x275)][_0x26c7a9(0x188)]=BattleManager[_0x26c7a9(0x146)],BattleManager[_0x26c7a9(0x146)]=function(){const _0x597a05=_0x26c7a9;this['determineActionByAIisStillValid'](),VisuMZ[_0x597a05(0x275)][_0x597a05(0x188)][_0x597a05(0x250)](this);},BattleManager[_0x26c7a9(0x159)]=function(){const _0x28896d=_0x26c7a9;this[_0x28896d(0x256)](this[_0x28896d(0x1b3)]);},BattleManager[_0x26c7a9(0x256)]=function(_0x3fa8a7){const _0x7b9ee0=_0x26c7a9;if(!_0x3fa8a7)return;if(_0x3fa8a7[_0x7b9ee0(0x226)]()===_0x7b9ee0(0x194))return;if(!_0x3fa8a7[_0x7b9ee0(0x253)]())return;const _0x52ee51=_0x3fa8a7[_0x7b9ee0(0x1b0)]();if(!_0x52ee51)return;if(_0x52ee51[_0x7b9ee0(0x166)])return;const _0x865ffa=_0x52ee51[_0x7b9ee0(0x240)]();if(_0x3fa8a7[_0x7b9ee0(0x22f)])return;if(AIManager[_0x7b9ee0(0x233)](_0x3fa8a7,_0x865ffa)&&_0x3fa8a7[_0x7b9ee0(0x21f)](_0x865ffa))return;_0x3fa8a7['determineNewValidAIAction']();},VisuMZ[_0x26c7a9(0x275)][_0x26c7a9(0x1df)]=Game_Temp[_0x26c7a9(0x13f)][_0x26c7a9(0x1fb)],Game_Temp[_0x26c7a9(0x13f)][_0x26c7a9(0x1fb)]=function(){const _0x1f72b8=_0x26c7a9;VisuMZ[_0x1f72b8(0x275)][_0x1f72b8(0x1df)][_0x1f72b8(0x250)](this),this[_0x1f72b8(0x1e4)]();},Game_Temp['prototype'][_0x26c7a9(0x1e4)]=function(){this['_aiTgrInfluence']={'action':null,'elementInfluence':![],'elementInfluenceRate':0x0,'elementIds':[],'evaInfluenceRate':0x0,'mevInfluenceRate':0x0,'pdrInfluenceRate':0x0,'mdrInfluenceRate':0x0};},Game_Temp[_0x26c7a9(0x13f)][_0x26c7a9(0x171)]=function(){const _0x3198ac=_0x26c7a9;if(this[_0x3198ac(0x238)]===undefined)this[_0x3198ac(0x1e4)]();return this[_0x3198ac(0x238)];},Game_Temp[_0x26c7a9(0x13f)][_0x26c7a9(0x28d)]=function(_0x1aef9f,_0x58ebc3){const _0x557afb=_0x26c7a9;this[_0x557afb(0x1e4)]();const _0x12d3ba=this[_0x557afb(0x171)]();_0x12d3ba[_0x557afb(0x1a6)]=_0x58ebc3;if(_0x1aef9f[_0x557afb(0x220)]()){_0x12d3ba[_0x557afb(0x244)]=!![],_0x12d3ba['elementInfluenceRate']=_0x1aef9f[_0x557afb(0x1ad)](),_0x12d3ba[_0x557afb(0x26e)]=[];if(Imported[_0x557afb(0x19d)])_0x12d3ba[_0x557afb(0x26e)]=_0x12d3ba[_0x557afb(0x26e)]['concat'](_0x58ebc3[_0x557afb(0x16c)]());else _0x58ebc3['item']()[_0x557afb(0x21a)][_0x557afb(0x20c)]<0x0?_0x12d3ba[_0x557afb(0x26e)]=_0x12d3ba['elementIds'][_0x557afb(0x1e9)](_0x1aef9f[_0x557afb(0x1cb)]()):_0x12d3ba[_0x557afb(0x26e)][_0x557afb(0x182)](_0x58ebc3['item']()['damage']['elementId']);}_0x58ebc3[_0x557afb(0x1dc)]()&&_0x1aef9f[_0x557afb(0x25c)]()&&(_0x12d3ba[_0x557afb(0x1c5)]=_0x1aef9f[_0x557afb(0x191)]()),_0x58ebc3[_0x557afb(0x1dc)]()&&_0x58ebc3[_0x557afb(0x1fd)]()&&_0x1aef9f[_0x557afb(0x1ed)]()&&(_0x12d3ba[_0x557afb(0x187)]=_0x1aef9f[_0x557afb(0x15c)]()),_0x58ebc3[_0x557afb(0x1dd)]()&&_0x1aef9f[_0x557afb(0x279)]()&&(_0x12d3ba[_0x557afb(0x2a2)]=_0x1aef9f['aiApplyMevTgrInfluenceRate']()),_0x58ebc3[_0x557afb(0x1dd)]()&&_0x58ebc3[_0x557afb(0x1fd)]()&&_0x1aef9f[_0x557afb(0x251)]()&&(_0x12d3ba['mdrInfluenceRate']=_0x1aef9f[_0x557afb(0x1d6)]());},VisuMZ[_0x26c7a9(0x275)][_0x26c7a9(0x154)]=Game_Action[_0x26c7a9(0x13f)][_0x26c7a9(0x21d)],Game_Action[_0x26c7a9(0x13f)]['makeTargets']=function(){const _0xae2b67=_0x26c7a9;this[_0xae2b67(0x1b6)]()&&this['subject']()['isDetermineActionByAI']()&&(AIManager[_0xae2b67(0x260)](this['subject'](),this[_0xae2b67(0x240)]()),this[_0xae2b67(0x18d)]()&&AIManager[_0xae2b67(0x1ba)](this['subject'](),this[_0xae2b67(0x240)]()));$gameTemp[_0xae2b67(0x28d)](this[_0xae2b67(0x18e)](),this);const _0xbead0e=VisuMZ[_0xae2b67(0x275)][_0xae2b67(0x154)][_0xae2b67(0x250)](this);return $gameTemp['clearAiTgrInfluence'](),AIManager[_0xae2b67(0x1a3)](),_0xbead0e;},VisuMZ['BattleAI'][_0x26c7a9(0x1ee)]=Game_Action[_0x26c7a9(0x13f)]['itemTargetCandidates'],Game_Action[_0x26c7a9(0x13f)][_0x26c7a9(0x140)]=function(){const _0x38348b=_0x26c7a9,_0x23e04a=this['subject'](),_0x571d2f=this['item']();let _0xe6eeba=VisuMZ[_0x38348b(0x275)]['Game_Action_itemTargetCandidates'][_0x38348b(0x250)](this);if(_0x23e04a[_0x38348b(0x253)]()&&AIManager[_0x38348b(0x233)](_0x23e04a,_0x571d2f)){let _0x49159e=AIManager[_0x38348b(0x27f)](_0x23e04a,_0x571d2f);_0xe6eeba=_0xe6eeba[_0x38348b(0x178)](_0x57efb4=>_0x49159e['includes'](_0x57efb4));}return _0xe6eeba;},VisuMZ[_0x26c7a9(0x275)]['Game_Action_apply']=Game_Action[_0x26c7a9(0x13f)][_0x26c7a9(0x14e)],Game_Action['prototype'][_0x26c7a9(0x14e)]=function(_0x1d4a78){const _0x4e4226=_0x26c7a9;VisuMZ[_0x4e4226(0x275)][_0x4e4226(0x175)][_0x4e4226(0x250)](this,_0x1d4a78),this['applyBattleAI'](_0x1d4a78);},Game_Action['prototype'][_0x26c7a9(0x196)]=function(_0x224940){const _0x5bc85c=_0x26c7a9;if(!_0x224940)return;if(this['subject']()[_0x5bc85c(0x1bf)]()===_0x224940['isActor']())return;let _0xb13ac5=[];if(Imported[_0x5bc85c(0x19d)])_0xb13ac5=this['elements']();else this[_0x5bc85c(0x240)]()[_0x5bc85c(0x21a)][_0x5bc85c(0x20c)]<0x0?_0xb13ac5=this[_0x5bc85c(0x18e)]()[_0x5bc85c(0x1cb)]():_0xb13ac5=[this[_0x5bc85c(0x240)]()[_0x5bc85c(0x21a)][_0x5bc85c(0x20c)]];_0x224940['addAIKnowledge'](_0xb13ac5,this['isPhysical'](),this['isMagical']());},VisuMZ[_0x26c7a9(0x275)][_0x26c7a9(0x2a0)]=Game_Action[_0x26c7a9(0x13f)]['isForOpponentBattleCore'],Game_Action[_0x26c7a9(0x13f)][_0x26c7a9(0x1c4)]=function(){const _0x6c6891=_0x26c7a9,_0x5bfc15=this[_0x6c6891(0x240)]()['scope'];if(_0x5bfc15[_0x6c6891(0x29e)](/ANY/i)){if(Imported['VisuMZ_2_BattleGridSystem']&&this[_0x6c6891(0x22a)]()){}else return!![];}return VisuMZ[_0x6c6891(0x275)][_0x6c6891(0x2a0)][_0x6c6891(0x250)](this);},VisuMZ[_0x26c7a9(0x275)][_0x26c7a9(0x1da)]=Game_BattlerBase[_0x26c7a9(0x13f)]['sparam'],Game_BattlerBase[_0x26c7a9(0x13f)][_0x26c7a9(0x221)]=function(_0x2510bc){const _0x4de281=_0x26c7a9;let _0x311940=VisuMZ[_0x4de281(0x275)][_0x4de281(0x1da)][_0x4de281(0x250)](this,_0x2510bc);return _0x2510bc===0x0&&(_0x311940*=this[_0x4de281(0x24f)]()),_0x311940;},Game_BattlerBase[_0x26c7a9(0x13f)][_0x26c7a9(0x24f)]=function(){const _0x398558=_0x26c7a9,_0x5c5177=$gameTemp[_0x398558(0x171)](),_0x20daac=this[_0x398558(0x2ac)]();if(Imported['VisuMZ_4_AggroControl']){if(_0x5c5177[_0x398558(0x1a6)]&&_0x5c5177['action'][_0x398558(0x24d)]())return 0x1;}let _0x43e0a6=0x1;if(_0x5c5177[_0x398558(0x244)])for(const _0x4e7a2c of _0x5c5177[_0x398558(0x26e)]){_0x20daac['hasElementAIKnowledge'](_0x4e7a2c,this)&&(_0x43e0a6*=this['elementRate'](_0x4e7a2c)*_0x5c5177[_0x398558(0x15d)]);}_0x20daac[_0x398558(0x19a)](_0x398558(0x263),this)&&(_0x43e0a6*=0x1-this[_0x398558(0x263)]*_0x5c5177['evaInfluenceRate']);_0x20daac['hasXParamAIKnowledge'](_0x398558(0x14d),this)&&(_0x43e0a6*=0x1-this['mev']*_0x5c5177['mevInfluenceRate']);{_0x43e0a6*=0x1+((this[_0x398558(0x252)]-0x1)*_0x5c5177[_0x398558(0x187)]??0x0),_0x43e0a6*=0x1+((this[_0x398558(0x257)]-0x1)*_0x5c5177['mdrInfluenceRate']??0x0);}return _0x43e0a6[_0x398558(0x1fe)](0.001,0x3e8);},Game_BattlerBase[_0x26c7a9(0x13f)][_0x26c7a9(0x226)]=function(){const _0x40f3d2=_0x26c7a9;return _0x40f3d2(0x158);},VisuMZ[_0x26c7a9(0x275)]['Game_BattlerBase_die']=Game_BattlerBase[_0x26c7a9(0x13f)][_0x26c7a9(0x1fa)],Game_BattlerBase[_0x26c7a9(0x13f)][_0x26c7a9(0x1fa)]=function(){const _0x146004=_0x26c7a9;this[_0x146004(0x155)]=![],VisuMZ[_0x146004(0x275)][_0x146004(0x1db)][_0x146004(0x250)](this);},VisuMZ[_0x26c7a9(0x275)][_0x26c7a9(0x1b1)]=Game_BattlerBase[_0x26c7a9(0x13f)][_0x26c7a9(0x170)],Game_BattlerBase['prototype'][_0x26c7a9(0x170)]=function(){const _0x5cdf23=_0x26c7a9;this[_0x5cdf23(0x155)]=![],VisuMZ[_0x5cdf23(0x275)][_0x5cdf23(0x1b1)][_0x5cdf23(0x250)](this);},VisuMZ['BattleAI'][_0x26c7a9(0x29d)]=Game_Battler[_0x26c7a9(0x13f)][_0x26c7a9(0x184)],Game_Battler[_0x26c7a9(0x13f)][_0x26c7a9(0x184)]=function(_0x885efb){const _0x33752e=_0x26c7a9;this['_onSpotMadeActionsDeterminedByAI']=![],VisuMZ['BattleAI'][_0x33752e(0x29d)]['call'](this,_0x885efb);},VisuMZ[_0x26c7a9(0x275)][_0x26c7a9(0x262)]=Game_Battler[_0x26c7a9(0x13f)][_0x26c7a9(0x149)],Game_Battler[_0x26c7a9(0x13f)][_0x26c7a9(0x149)]=function(){const _0xcdc1a1=_0x26c7a9;this[_0xcdc1a1(0x155)]=![],VisuMZ[_0xcdc1a1(0x275)]['Game_Battler_onBattleEnd'][_0xcdc1a1(0x250)](this);},VisuMZ[_0x26c7a9(0x275)][_0x26c7a9(0x1d2)]=Game_Battler['prototype'][_0x26c7a9(0x1c2)],Game_Battler[_0x26c7a9(0x13f)][_0x26c7a9(0x1c2)]=function(){const _0x544535=_0x26c7a9;this[_0x544535(0x155)]=![],VisuMZ[_0x544535(0x275)][_0x544535(0x1d2)]['call'](this);},VisuMZ[_0x26c7a9(0x275)][_0x26c7a9(0x197)]=Game_Battler[_0x26c7a9(0x13f)][_0x26c7a9(0x27b)],Game_Battler[_0x26c7a9(0x13f)]['makeActions']=function(){const _0xd0287b=_0x26c7a9;if(this[_0xd0287b(0x155)])return;VisuMZ['BattleAI'][_0xd0287b(0x197)][_0xd0287b(0x250)](this);},VisuMZ[_0x26c7a9(0x275)]['Game_Battler_isChanting']=Game_Battler[_0x26c7a9(0x13f)][_0x26c7a9(0x1a9)],Game_Battler[_0x26c7a9(0x13f)][_0x26c7a9(0x1a9)]=function(){const _0x177c85=_0x26c7a9;if(this['isDetermineActionByAI']()){const _0x3d3a34=VisuMZ[_0x177c85(0x275)]['Settings'][_0x177c85(0x14f)];if(_0x3d3a34[_0x177c85(0x280)]&&_0x3d3a34['SpotRemoveMotions'])return![];}return VisuMZ[_0x177c85(0x275)][_0x177c85(0x174)][_0x177c85(0x250)](this);},Game_Battler[_0x26c7a9(0x13f)][_0x26c7a9(0x253)]=function(){const _0x3ce806=_0x26c7a9;if(this[_0x3ce806(0x204)]())return![];return!![];},Game_Battler[_0x26c7a9(0x13f)][_0x26c7a9(0x23c)]=function(){},Game_Battler['prototype'][_0x26c7a9(0x220)]=function(){const _0x2b862a=_0x26c7a9;if(this[_0x2b862a(0x1bf)]()||this['isEnemy']()){const _0x4dc750=this['isActor']()?this[_0x2b862a(0x153)]()[_0x2b862a(0x278)]:this['enemy']()[_0x2b862a(0x278)];if(_0x4dc750[_0x2b862a(0x29e)](AIManager['_regexp'][_0x2b862a(0x258)]))return![];else{if(_0x4dc750[_0x2b862a(0x29e)](AIManager[_0x2b862a(0x199)]['aiElementTgr']))return this['aiApplyElementalTgrInfluenceRate']()>0x0;}}return VisuMZ[_0x2b862a(0x275)][_0x2b862a(0x1cd)][_0x2b862a(0x1e6)][_0x2b862a(0x17e)];},Game_Battler[_0x26c7a9(0x13f)]['aiApplyElementalTgrInfluenceRate']=function(){const _0x1e528a=_0x26c7a9;if(this['isActor']()||this[_0x1e528a(0x1ac)]()){const _0x5b02a5=this[_0x1e528a(0x1bf)]()?this[_0x1e528a(0x153)]()[_0x1e528a(0x278)]:this[_0x1e528a(0x272)]()[_0x1e528a(0x278)];if(_0x5b02a5['match'](AIManager[_0x1e528a(0x199)]['aiElementTgr']))return eval(RegExp['$1']);}return VisuMZ[_0x1e528a(0x275)][_0x1e528a(0x1cd)]['Weight'][_0x1e528a(0x163)];},Game_Battler[_0x26c7a9(0x13f)][_0x26c7a9(0x25c)]=function(){const _0x104484=_0x26c7a9;if(this[_0x104484(0x1bf)]()||this['isEnemy']()){const _0x4849c9=this[_0x104484(0x1bf)]()?this['actor']()[_0x104484(0x278)]:this[_0x104484(0x272)]()[_0x104484(0x278)];if(_0x4849c9[_0x104484(0x29e)](AIManager[_0x104484(0x199)][_0x104484(0x219)]))return![];else{if(_0x4849c9[_0x104484(0x29e)](AIManager[_0x104484(0x199)][_0x104484(0x193)]))return this[_0x104484(0x191)]()>0x0;}}return VisuMZ['BattleAI'][_0x104484(0x1cd)][_0x104484(0x1e6)]['EvaTgr'];},Game_Battler[_0x26c7a9(0x13f)]['aiApplyEvaTgrInfluenceRate']=function(){const _0x539813=_0x26c7a9;if(this[_0x539813(0x1bf)]()||this[_0x539813(0x1ac)]()){const _0x36c7b1=this[_0x539813(0x1bf)]()?this['actor']()[_0x539813(0x278)]:this['enemy']()[_0x539813(0x278)];if(_0x36c7b1[_0x539813(0x29e)](AIManager[_0x539813(0x199)][_0x539813(0x193)]))return eval(RegExp['$1']);}return VisuMZ[_0x539813(0x275)]['Settings'][_0x539813(0x1e6)][_0x539813(0x147)];},Game_Battler[_0x26c7a9(0x13f)][_0x26c7a9(0x279)]=function(){const _0x32813f=_0x26c7a9;if(this[_0x32813f(0x1bf)]()||this[_0x32813f(0x1ac)]()){const _0x19c40d=this[_0x32813f(0x1bf)]()?this[_0x32813f(0x153)]()[_0x32813f(0x278)]:this[_0x32813f(0x272)]()['note'];if(_0x19c40d[_0x32813f(0x29e)](AIManager[_0x32813f(0x199)][_0x32813f(0x28e)]))return![];else{if(_0x19c40d[_0x32813f(0x29e)](AIManager[_0x32813f(0x199)][_0x32813f(0x1f0)]))return this['aiApplyMevTgrInfluenceRate']()>0x0;}}return VisuMZ[_0x32813f(0x275)][_0x32813f(0x1cd)]['Weight'][_0x32813f(0x16a)];},Game_Battler['prototype'][_0x26c7a9(0x1ae)]=function(){const _0xffb55d=_0x26c7a9;if(this[_0xffb55d(0x1bf)]()||this['isEnemy']()){const _0x1a2397=this[_0xffb55d(0x1bf)]()?this[_0xffb55d(0x153)]()[_0xffb55d(0x278)]:this[_0xffb55d(0x272)]()[_0xffb55d(0x278)];if(_0x1a2397[_0xffb55d(0x29e)](AIManager['_regexp'][_0xffb55d(0x1f0)]))return eval(RegExp['$1']);}return VisuMZ[_0xffb55d(0x275)][_0xffb55d(0x1cd)][_0xffb55d(0x1e6)]['MevTgrRate'];},Game_Battler['prototype'][_0x26c7a9(0x1ed)]=function(){const _0x208090=_0x26c7a9;if(this[_0x208090(0x1bf)]()||this[_0x208090(0x1ac)]()){const _0x22d904=this[_0x208090(0x1bf)]()?this[_0x208090(0x153)]()[_0x208090(0x278)]:this[_0x208090(0x272)]()[_0x208090(0x278)];if(_0x22d904['match'](AIManager[_0x208090(0x199)][_0x208090(0x19c)]))return![];else{if(_0x22d904[_0x208090(0x29e)](AIManager['_regexp']['aiPdrTgr']))return this[_0x208090(0x15c)]()>0x0;}}return VisuMZ[_0x208090(0x275)][_0x208090(0x1cd)][_0x208090(0x1e6)][_0x208090(0x1f3)]??!![];},Game_Battler['prototype']['aiApplyPdrTgrInfluenceRate']=function(){const _0x1cc482=_0x26c7a9;if(this[_0x1cc482(0x1bf)]()||this[_0x1cc482(0x1ac)]()){const _0x2c1cc3=this['isActor']()?this['actor']()[_0x1cc482(0x278)]:this[_0x1cc482(0x272)]()[_0x1cc482(0x278)];if(_0x2c1cc3['match'](AIManager[_0x1cc482(0x199)]['aiPdrTgr']))return eval(RegExp['$1']);}return VisuMZ[_0x1cc482(0x275)][_0x1cc482(0x1cd)][_0x1cc482(0x1e6)]['PdrTgrRate']??1.25;},Game_Battler[_0x26c7a9(0x13f)][_0x26c7a9(0x251)]=function(){const _0x591a8a=_0x26c7a9;if(this[_0x591a8a(0x1bf)]()||this[_0x591a8a(0x1ac)]()){const _0x549715=this[_0x591a8a(0x1bf)]()?this[_0x591a8a(0x153)]()[_0x591a8a(0x278)]:this['enemy']()[_0x591a8a(0x278)];if(_0x549715[_0x591a8a(0x29e)](AIManager[_0x591a8a(0x199)][_0x591a8a(0x1be)]))return![];else{if(_0x549715[_0x591a8a(0x29e)](AIManager['_regexp']['aiMdrTgr']))return this[_0x591a8a(0x1d6)]()>0x0;}}return VisuMZ['BattleAI'][_0x591a8a(0x1cd)]['Weight'][_0x591a8a(0x1f2)]??!![];},Game_Battler[_0x26c7a9(0x13f)][_0x26c7a9(0x1d6)]=function(){const _0x3356f0=_0x26c7a9;if(this[_0x3356f0(0x1bf)]()||this[_0x3356f0(0x1ac)]()){const _0x3cd71e=this[_0x3356f0(0x1bf)]()?this[_0x3356f0(0x153)]()['note']:this['enemy']()['note'];if(_0x3cd71e[_0x3356f0(0x29e)](AIManager[_0x3356f0(0x199)]['aiMdrTgr']))return eval(RegExp['$1']);}return VisuMZ[_0x3356f0(0x275)][_0x3356f0(0x1cd)][_0x3356f0(0x1e6)][_0x3356f0(0x234)]??1.5;},Game_Battler[_0x26c7a9(0x13f)]['aiLevel']=function(){const _0x31d554=_0x26c7a9,_0x1d16df=VisuMZ[_0x31d554(0x275)][_0x31d554(0x1cd)][_0x31d554(0x14f)];if(this['isActor']()||this[_0x31d554(0x1ac)]()){const _0xc83307=this[_0x31d554(0x1bf)]()?this[_0x31d554(0x153)]()['note']:this[_0x31d554(0x272)]()['note'];if(_0xc83307[_0x31d554(0x29e)](AIManager[_0x31d554(0x199)]['aiLevel']))return Number(RegExp['$1'])[_0x31d554(0x1fe)](0x0,0x64);else{if(this[_0x31d554(0x1bf)]())return _0x1d16df['ActorAILevel'];else{if(this[_0x31d554(0x1ac)]())return _0x1d16df[_0x31d554(0x265)];}}}return _0x1d16df[_0x31d554(0x265)];},Game_Battler[_0x26c7a9(0x13f)][_0x26c7a9(0x231)]=function(_0x4f6920,_0x67f97e,_0x3be645){const _0x55a654=_0x26c7a9,_0x7a483d=this[_0x55a654(0x2ac)]();if(_0x4f6920&&_0x4f6920['length']>0x0)for(const _0xf7ab7e of _0x4f6920){_0x7a483d[_0x55a654(0x21b)](_0xf7ab7e,this);}_0x67f97e&&_0x7a483d[_0x55a654(0x165)](_0x55a654(0x1f7),this),_0x3be645&&_0x7a483d[_0x55a654(0x165)]('mevRates',this);},Game_Battler[_0x26c7a9(0x13f)]['hasXParamAIKnowledge']=function(_0x219885){const _0x133b9a=_0x26c7a9,_0x218e92=this[_0x133b9a(0x2ac)]();return _0x218e92[_0x133b9a(0x19a)](_0x219885,this);},Game_Battler[_0x26c7a9(0x13f)]['aiRatingVariance']=function(){const _0x2cce4e=_0x26c7a9,_0x29881b=VisuMZ['BattleAI'][_0x2cce4e(0x1cd)][_0x2cce4e(0x14f)];if(this[_0x2cce4e(0x1bf)]()||this[_0x2cce4e(0x1ac)]()){const _0x1f9d5d=this[_0x2cce4e(0x1bf)]()?this[_0x2cce4e(0x153)]()[_0x2cce4e(0x278)]:this[_0x2cce4e(0x272)]()['note'];if(_0x1f9d5d['match'](AIManager['_regexp'][_0x2cce4e(0x179)]))return Number(RegExp['$1'])[_0x2cce4e(0x1fe)](0x0,0x9);else{if(this['isActor']())return _0x29881b[_0x2cce4e(0x22e)][_0x2cce4e(0x1fe)](0x0,0x9);else{if(this[_0x2cce4e(0x1ac)]())return _0x29881b[_0x2cce4e(0x17f)][_0x2cce4e(0x1fe)](0x0,0x9);}}}return _0x29881b['EnemyRatingVariance'][_0x2cce4e(0x1fe)](0x0,0x9);},VisuMZ['BattleAI'][_0x26c7a9(0x1b9)]=Game_Battler['prototype'][_0x26c7a9(0x297)],Game_Battler[_0x26c7a9(0x13f)][_0x26c7a9(0x297)]=function(){const _0x27db68=_0x26c7a9;if(BattleManager[_0x27db68(0x198)]())return VisuMZ[_0x27db68(0x275)]['Game_Battler_turnCount'][_0x27db68(0x250)](this);if(VisuMZ[_0x27db68(0x275)][_0x27db68(0x1cd)][_0x27db68(0x14f)]['OnSpotAI']){if(this['checkTeamBasedTurnCountAI']())return VisuMZ[_0x27db68(0x275)][_0x27db68(0x1b9)][_0x27db68(0x250)](this);return $gameTroop['turnCount']();}else return VisuMZ[_0x27db68(0x275)][_0x27db68(0x1b9)][_0x27db68(0x250)](this);},Game_Battler[_0x26c7a9(0x13f)]['checkTeamBasedTurnCountAI']=function(){const _0x40f6c0=_0x26c7a9;if(Imported[_0x40f6c0(0x266)]&&BattleManager[_0x40f6c0(0x212)]()){if(VisuMZ['BattleSystemFTB'][_0x40f6c0(0x1d4)]<1.11){let _0x365ae3='';_0x365ae3+=_0x40f6c0(0x268),_0x365ae3+=_0x40f6c0(0x1e2),alert(_0x365ae3),SceneManager['exit']();}return!![];}else{if(Imported['VisuMZ_2_BattleSystemETB']&&BattleManager[_0x40f6c0(0x212)]()){if(VisuMZ[_0x40f6c0(0x1ab)][_0x40f6c0(0x1d4)]<1.08){let _0x3cae9b='';_0x3cae9b+=_0x40f6c0(0x2b4),_0x3cae9b+=_0x40f6c0(0x1e2),alert(_0x3cae9b),SceneManager['exit']();}return!![];}else{if(Imported[_0x40f6c0(0x2b0)]&&BattleManager[_0x40f6c0(0x212)]()){if(VisuMZ[_0x40f6c0(0x201)][_0x40f6c0(0x1d4)]<1.08){let _0x41191d='';_0x41191d+=_0x40f6c0(0x1c8),_0x41191d+=_0x40f6c0(0x1e2),alert(_0x41191d),SceneManager['exit']();}return!![];}}}return![];},Game_Actor[_0x26c7a9(0x13f)]['isDetermineActionByAI']=function(){const _0x3ddd8a=_0x26c7a9;if(this['isConfused']())return![];return this[_0x3ddd8a(0x243)]()&&this[_0x3ddd8a(0x2b6)]();},Game_Actor[_0x26c7a9(0x13f)][_0x26c7a9(0x2b6)]=function(){const _0x516730=_0x26c7a9,_0x22781d=this['currentClass']()[_0x516730(0x278)];if(_0x22781d[_0x516730(0x29e)](/<NO REFERENCE AI>/i))return null;else{if(_0x22781d['match'](/<REFERENCE AI: ENEMY (\d+)>/i))return $dataEnemies[Number(RegExp['$1'])];else{if(_0x22781d[_0x516730(0x29e)](/<REFERENCE AI: (.*)>/i))return $dataEnemies[DataManager[_0x516730(0x214)](String(RegExp['$1']))];}}return $dataEnemies[VisuMZ['BattleAI']['Settings']['General'][_0x516730(0x150)]];},Game_Actor[_0x26c7a9(0x13f)][_0x26c7a9(0x226)]=function(){const _0x107ce9=_0x26c7a9,_0x12c0d4=this[_0x107ce9(0x2b5)]()[_0x107ce9(0x278)];if(_0x12c0d4[_0x107ce9(0x29e)](AIManager[_0x107ce9(0x199)][_0x107ce9(0x226)]))return String(RegExp['$1'])[_0x107ce9(0x17b)]()['trim']();return VisuMZ[_0x107ce9(0x275)]['Settings']['General'][_0x107ce9(0x17a)];},Game_Actor[_0x26c7a9(0x13f)][_0x26c7a9(0x23c)]=function(){const _0xedf7ef=_0x26c7a9;Game_Battler[_0xedf7ef(0x13f)][_0xedf7ef(0x23c)][_0xedf7ef(0x250)](this),this[_0xedf7ef(0x1f8)]();},VisuMZ[_0x26c7a9(0x275)][_0x26c7a9(0x237)]=Game_Actor['prototype'][_0x26c7a9(0x1f8)],Game_Actor[_0x26c7a9(0x13f)][_0x26c7a9(0x1f8)]=function(){const _0x4c419c=_0x26c7a9;this[_0x4c419c(0x253)]()?this[_0x4c419c(0x173)]():VisuMZ[_0x4c419c(0x275)][_0x4c419c(0x237)][_0x4c419c(0x250)](this);},Game_Actor['prototype']['makeAutoBattleActionsWithEnemyAI']=function(){const _0x54b53d=_0x26c7a9;if(this[_0x54b53d(0x27d)]()>0x0){const _0x222feb=this[_0x54b53d(0x1aa)]();if(this[_0x54b53d(0x19f)]())_0x222feb[_0x54b53d(0x182)]($dataSkills[this['attackSkillId']()]);if(this[_0x54b53d(0x281)]())_0x222feb[_0x54b53d(0x182)]($dataSkills[this[_0x54b53d(0x1af)]()]);const _0x3a8f8c=this[_0x54b53d(0x2b6)](),_0xc46622=JsonEx[_0x54b53d(0x156)](_0x3a8f8c['actions']);for(const _0x4d7c6f of _0xc46622){if(_0x4d7c6f[_0x54b53d(0x1ea)]===0x1)_0x4d7c6f[_0x54b53d(0x1ea)]=this[_0x54b53d(0x1d3)]();if(_0x4d7c6f['skillId']===0x2)_0x4d7c6f[_0x54b53d(0x1ea)]=this[_0x54b53d(0x1af)]();}const _0x3332ec=_0xc46622[_0x54b53d(0x178)](_0x186512=>this[_0x54b53d(0x25f)](_0x186512)&&_0x222feb[_0x54b53d(0x1f9)]($dataSkills[_0x186512['skillId']]));if(_0x3332ec[_0x54b53d(0x254)]>0x0){this[_0x54b53d(0x1e1)](_0x3332ec);return;}}VisuMZ['BattleAI']['Game_Actor_makeAutoBattleActions'][_0x54b53d(0x250)](this);},Game_Actor[_0x26c7a9(0x13f)][_0x26c7a9(0x1d7)]=function(_0x5f2504){const _0x812376=_0x26c7a9;return Game_Enemy[_0x812376(0x13f)][_0x812376(0x1d7)][_0x812376(0x250)](this,_0x5f2504);},Game_Actor[_0x26c7a9(0x13f)]['meetsTurnCondition']=function(_0x413f37,_0xb5d7de){const _0x2ce33c=_0x26c7a9;return Game_Enemy[_0x2ce33c(0x13f)]['meetsTurnCondition'][_0x2ce33c(0x250)](this,_0x413f37,_0xb5d7de);},Game_Actor['prototype'][_0x26c7a9(0x19e)]=function(_0x492a65,_0x430e72){const _0x4b76b4=_0x26c7a9;return Game_Enemy['prototype'][_0x4b76b4(0x19e)][_0x4b76b4(0x250)](this,_0x492a65,_0x430e72);},Game_Actor[_0x26c7a9(0x13f)][_0x26c7a9(0x242)]=function(_0x2f3695,_0x5b12d0){const _0x49362f=_0x26c7a9;return Game_Enemy[_0x49362f(0x13f)][_0x49362f(0x242)][_0x49362f(0x250)](this,_0x2f3695,_0x5b12d0);},Game_Actor[_0x26c7a9(0x13f)][_0x26c7a9(0x18a)]=function(_0x1dbe6c){const _0x4a4a55=_0x26c7a9;return Game_Enemy[_0x4a4a55(0x13f)][_0x4a4a55(0x18a)]['call'](this,_0x1dbe6c);},Game_Actor[_0x26c7a9(0x13f)][_0x26c7a9(0x164)]=function(_0x3d14de){const _0x53ec53=_0x26c7a9;return Game_Enemy['prototype'][_0x53ec53(0x164)][_0x53ec53(0x250)](this,_0x3d14de);},Game_Actor[_0x26c7a9(0x13f)][_0x26c7a9(0x26c)]=function(_0x4ea306){const _0x5a37fb=_0x26c7a9;return Game_Enemy[_0x5a37fb(0x13f)][_0x5a37fb(0x26c)][_0x5a37fb(0x250)](this,_0x4ea306);},Game_Enemy[_0x26c7a9(0x13f)][_0x26c7a9(0x226)]=function(){const _0x5c389a=_0x26c7a9,_0x21df16=this[_0x5c389a(0x272)]()[_0x5c389a(0x278)];if(_0x21df16[_0x5c389a(0x29e)](AIManager['_regexp'][_0x5c389a(0x226)]))return String(RegExp['$1'])[_0x5c389a(0x17b)]()[_0x5c389a(0x255)]();return VisuMZ['BattleAI'][_0x5c389a(0x1cd)][_0x5c389a(0x14f)][_0x5c389a(0x1d0)];},VisuMZ[_0x26c7a9(0x275)][_0x26c7a9(0x1a4)]=Game_Enemy[_0x26c7a9(0x13f)][_0x26c7a9(0x25f)],Game_Enemy[_0x26c7a9(0x13f)][_0x26c7a9(0x25f)]=function(_0x5603e3){const _0x31532f=_0x26c7a9;if(!VisuMZ['BattleAI'][_0x31532f(0x1a4)][_0x31532f(0x250)](this,_0x5603e3))return![];if(this['aiStyle']()==='random')return!![];return AIManager[_0x31532f(0x233)](this,$dataSkills[_0x5603e3[_0x31532f(0x1ea)]]);},Game_Actor['prototype'][_0x26c7a9(0x25f)]=function(_0x474ec4){const _0x32b830=_0x26c7a9;return Game_Enemy[_0x32b830(0x13f)][_0x32b830(0x25f)][_0x32b830(0x250)](this,_0x474ec4);},Game_Enemy['prototype'][_0x26c7a9(0x216)]=function(_0x44bbc1,_0x19630f){const _0x408dee=_0x26c7a9,_0x538bda=_0x44bbc1[_0x408dee(0x2ab)]((_0x24bd5a,_0xb8c46b)=>_0x24bd5a+_0xb8c46b[_0x408dee(0x248)]-_0x19630f,0x0);if(_0x538bda>=0x0){let _0x4d81d2=Math[_0x408dee(0x152)](_0x538bda);for(const _0x77d44c of _0x44bbc1){_0x4d81d2-=_0x77d44c[_0x408dee(0x248)]-_0x19630f;if(_0x4d81d2<=0x0)return this[_0x408dee(0x29b)]&&this['removeOncePerTurnAction'](_0x77d44c),_0x77d44c;}}else return null;},Game_Actor['prototype']['selectAction']=function(_0x4ec763,_0xdc6437){const _0x3d2390=_0x26c7a9;return Game_Enemy[_0x3d2390(0x13f)][_0x3d2390(0x216)]['call'](this,_0x4ec763,_0xdc6437);},Game_Enemy[_0x26c7a9(0x13f)][_0x26c7a9(0x1e1)]=function(_0x110327){const _0x3a766e=_0x26c7a9,_0x3b09c2=String(this[_0x3a766e(0x226)]())[_0x3a766e(0x17b)]()['trim']();if([_0x3a766e(0x194),_0x3a766e(0x28b)][_0x3a766e(0x1f9)](_0x3b09c2))this[_0x3a766e(0x16d)](_0x110327);else _0x3b09c2===_0x3a766e(0x276)?this[_0x3a766e(0x1c9)](_0x110327):this[_0x3a766e(0x1c1)](_0x110327);},Game_Actor[_0x26c7a9(0x13f)][_0x26c7a9(0x1e1)]=function(_0x50a38e){const _0x4bc638=_0x26c7a9;Game_Enemy[_0x4bc638(0x13f)][_0x4bc638(0x1e1)][_0x4bc638(0x250)](this,_0x50a38e);},Game_Battler[_0x26c7a9(0x13f)]['selectAllActionsClassic']=function(_0x2c4ebd){const _0x197c32=_0x26c7a9,_0x5e7444=Math[_0x197c32(0x291)](..._0x2c4ebd[_0x197c32(0x23f)](_0x1bc7f1=>_0x1bc7f1[_0x197c32(0x248)])),_0x492285=_0x5e7444-this['aiRatingVariance'](),_0x20da3a=this[_0x197c32(0x27d)]();_0x2c4ebd=_0x2c4ebd['filter'](_0x5956eb=>_0x5956eb['rating']>=_0x492285);for(let _0x1dfbef=0x0;_0x1dfbef<_0x20da3a;_0x1dfbef++){_0x2c4ebd=VisuMZ['BattleAI'][_0x197c32(0x18f)](_0x2c4ebd);const _0x72a819=this[_0x197c32(0x216)](_0x2c4ebd,_0x492285);this[_0x197c32(0x1a6)](_0x1dfbef)['setEnemyAction'](_0x72a819);}},VisuMZ[_0x26c7a9(0x275)]['ShuffleArray']=function(_0x54de43){const _0x56af15=_0x26c7a9;var _0x19d443,_0x1cbcee,_0x4dd264;for(_0x4dd264=_0x54de43[_0x56af15(0x254)]-0x1;_0x4dd264>0x0;_0x4dd264--){_0x19d443=Math[_0x56af15(0x169)](Math[_0x56af15(0x194)]()*(_0x4dd264+0x1)),_0x1cbcee=_0x54de43[_0x4dd264],_0x54de43[_0x4dd264]=_0x54de43[_0x19d443],_0x54de43[_0x19d443]=_0x1cbcee;}return _0x54de43;},Game_Battler[_0x26c7a9(0x13f)][_0x26c7a9(0x1c9)]=function(_0x2e1ce7){const _0xccf00d=_0x26c7a9;for(let _0x52545d=0x0;_0x52545d<this[_0xccf00d(0x27d)]();_0x52545d++){const _0x4e7852=_0x2e1ce7[0x0];this[_0xccf00d(0x1a6)](_0x52545d)[_0xccf00d(0x1cf)](_0x4e7852);}},Game_Battler['prototype'][_0x26c7a9(0x16d)]=function(_0x4dbdbe){const _0x201fd5=_0x26c7a9;for(let _0x3a6d48=0x0;_0x3a6d48<this[_0x201fd5(0x27d)]();_0x3a6d48++){const _0x15e519=_0x4dbdbe[Math[_0x201fd5(0x152)](_0x4dbdbe[_0x201fd5(0x254)])];this[_0x201fd5(0x1a6)](_0x3a6d48)[_0x201fd5(0x1cf)](_0x15e519);}},Game_Enemy[_0x26c7a9(0x13f)][_0x26c7a9(0x23c)]=function(){const _0x207dc5=_0x26c7a9;Game_Battler[_0x207dc5(0x13f)][_0x207dc5(0x23c)][_0x207dc5(0x250)](this);if(this[_0x207dc5(0x27d)]()>0x0){const _0x2d641e=this[_0x207dc5(0x272)]()['actions']['filter'](_0x288320=>this[_0x207dc5(0x25f)](_0x288320));_0x2d641e[_0x207dc5(0x254)]>0x0?this[_0x207dc5(0x1e1)](_0x2d641e):this[_0x207dc5(0x14a)]();}},VisuMZ[_0x26c7a9(0x275)][_0x26c7a9(0x143)]=Game_Unit[_0x26c7a9(0x13f)][_0x26c7a9(0x1fb)],Game_Unit[_0x26c7a9(0x13f)][_0x26c7a9(0x1fb)]=function(){const _0x1459b2=_0x26c7a9;VisuMZ[_0x1459b2(0x275)][_0x1459b2(0x143)][_0x1459b2(0x250)](this),this[_0x1459b2(0x271)]();},Game_Unit[_0x26c7a9(0x13f)][_0x26c7a9(0x271)]=function(){const _0x473b41=_0x26c7a9;this['_applyAIForcedTargetFilters']=![],this[_0x473b41(0x23a)]();},VisuMZ[_0x26c7a9(0x275)][_0x26c7a9(0x141)]=Game_Unit[_0x26c7a9(0x13f)][_0x26c7a9(0x1a1)],Game_Unit['prototype'][_0x26c7a9(0x1a1)]=function(){const _0x3cc7bb=_0x26c7a9;let _0x329f68=VisuMZ['BattleAI'][_0x3cc7bb(0x141)][_0x3cc7bb(0x250)](this);if(this[_0x3cc7bb(0x206)]){const _0x524d38=AIManager[_0x3cc7bb(0x139)]();_0x329f68=_0x329f68[_0x3cc7bb(0x178)](_0x1e34c3=>_0x524d38[_0x3cc7bb(0x1f9)](_0x1e34c3));}return _0x329f68;},VisuMZ[_0x26c7a9(0x275)][_0x26c7a9(0x296)]=Game_Unit['prototype'][_0x26c7a9(0x210)],Game_Unit[_0x26c7a9(0x13f)]['randomTarget']=function(){const _0x3ae56a=_0x26c7a9;AIManager['hasForcedTargets']()&&(this[_0x3ae56a(0x206)]=!![]);const _0x557b0f=VisuMZ[_0x3ae56a(0x275)][_0x3ae56a(0x296)]['call'](this);return this[_0x3ae56a(0x206)]=![],_0x557b0f;},Game_Unit[_0x26c7a9(0x13f)]['clearAIKnowledge']=function(){const _0x113922=_0x26c7a9;this[_0x113922(0x145)]={'evaRates':[],'mevRates':[],'elementRates':{}};},Game_Unit['prototype'][_0x26c7a9(0x13a)]=function(){const _0x5bb6eb=_0x26c7a9;if(this['_aiKnowledge']===undefined)this[_0x5bb6eb(0x23a)]();return this[_0x5bb6eb(0x145)];},Game_Unit[_0x26c7a9(0x13f)][_0x26c7a9(0x165)]=function(_0x2b2491,_0x5e0fd1){const _0x3e5344=_0x26c7a9;this['aiKnowledge']()[_0x2b2491]=this['aiKnowledge']()[_0x2b2491]||[];const _0x5a3361=_0x5e0fd1[_0x3e5344(0x1bf)]()?_0x5e0fd1[_0x3e5344(0x259)]():_0x5e0fd1[_0x3e5344(0x2b2)]();!this[_0x3e5344(0x13a)]()[_0x2b2491][_0x3e5344(0x1f9)](_0x5a3361)&&this[_0x3e5344(0x13a)]()[_0x2b2491]['push'](_0x5a3361);},Game_Unit[_0x26c7a9(0x13f)][_0x26c7a9(0x19a)]=function(_0x45c648,_0x2d0d0d){const _0x442196=_0x26c7a9;if(!VisuMZ[_0x442196(0x275)][_0x442196(0x1cd)][_0x442196(0x14f)]['LearnKnowledge'])return!![];const _0xbcd737=_0x45c648[_0x442196(0x29e)](/EVA/i)?_0x442196(0x1f7):'mevRates';this[_0x442196(0x13a)]()[_0xbcd737]=this[_0x442196(0x13a)]()[_0xbcd737]||[];const _0x3255a3=_0x2d0d0d[_0x442196(0x1bf)]()?_0x2d0d0d['actorId']():_0x2d0d0d[_0x442196(0x2b2)]();return this[_0x442196(0x13a)]()[_0xbcd737][_0x442196(0x1f9)](_0x3255a3);},Game_Unit[_0x26c7a9(0x13f)][_0x26c7a9(0x21b)]=function(_0x41bec4,_0xe358d3){const _0x32fb61=_0x26c7a9;this[_0x32fb61(0x13a)]()[_0x32fb61(0x1f4)]=this[_0x32fb61(0x13a)]()[_0x32fb61(0x1f4)]||{};const _0x3b2b42=this[_0x32fb61(0x13a)]()[_0x32fb61(0x1f4)];_0x3b2b42[_0x41bec4]=_0x3b2b42[_0x41bec4]||[];const _0x2a549f=_0xe358d3[_0x32fb61(0x1bf)]()?_0xe358d3[_0x32fb61(0x259)]():_0xe358d3[_0x32fb61(0x2b2)]();!_0x3b2b42[_0x41bec4][_0x32fb61(0x1f9)](_0x2a549f)&&_0x3b2b42[_0x41bec4]['push'](_0x2a549f);},Game_Unit['prototype'][_0x26c7a9(0x1ce)]=function(_0x42efe4,_0x55e5e7){const _0x3eaaaa=_0x26c7a9;if(!VisuMZ[_0x3eaaaa(0x275)][_0x3eaaaa(0x1cd)][_0x3eaaaa(0x14f)][_0x3eaaaa(0x225)])return!![];this[_0x3eaaaa(0x13a)]()['elementRates']=this[_0x3eaaaa(0x13a)]()[_0x3eaaaa(0x1f4)]||{};const _0xa566cd=this[_0x3eaaaa(0x13a)]()[_0x3eaaaa(0x1f4)];_0xa566cd[_0x42efe4]=_0xa566cd[_0x42efe4]||[];const _0x10d72e=_0x55e5e7[_0x3eaaaa(0x1bf)]()?_0x55e5e7['actorId']():_0x55e5e7[_0x3eaaaa(0x2b2)]();return _0xa566cd[_0x42efe4][_0x3eaaaa(0x1f9)](_0x10d72e);},VisuMZ[_0x26c7a9(0x275)][_0x26c7a9(0x27a)]=Game_Troop['prototype']['setup'],Game_Troop[_0x26c7a9(0x13f)]['setup']=function(_0x149202){const _0x37f074=_0x26c7a9;VisuMZ[_0x37f074(0x275)]['Game_Troop_setup'][_0x37f074(0x250)](this,_0x149202),this[_0x37f074(0x23a)]();};