//=============================================================================
// VisuStella MZ - Weapon Unleash
// VisuMZ_4_WeaponUnleash.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_WeaponUnleash = true;

var VisuMZ = VisuMZ || {};
VisuMZ.WeaponUnleash = VisuMZ.WeaponUnleash || {};
VisuMZ.WeaponUnleash.version = 1.04;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.04] [WeaponUnleash]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Weapon_Unleash_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Weapon Unleash plugin lets you give battlers a chance to perform a skill
 * that's different from the usual Attack or Guard action they have. Unleashes
 * work off a success rate system, meaning they can but not always occur.
 *
 * In addition to Unleashes, replacements for the default Attack and Guard
 * actions also available through this plugin. Unlike Unleashes, replacements
 * are always present. Though, if an Unleash manages to succeed, they will take
 * over the replacement skill.
 *
 * Each of these features can help alleviate the monotony of using the same
 * commands over and over throughout the game, giving more life to the battle
 * system and keeping it fresh and interesting.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Weapon Unleashes allow Attack commands to perform a different skill at a
 *   percentile chance.
 * * Guard Unleashes, in addition, allow Guard commands to perform a different
 *   skill at a percentile chance.
 * * On the other hand, Replace Attack and Replace Guard traits will straight
 *   up replace the default Attack and Guard commands respectively.
 * * If an Unleash succeeds, it will override the replacement skills.
 * * Add JavaScript effects that run upon Unleash triggers.
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
 * Understanding Weapon Unleashes and Guard Unleashes
 * ============================================================================
 * 
 * If a battler (actor or enemy) has an associated Weapon or Guard Unleash
 * notetag applied to itself (either directly, states, skills, or equipment), 
 * then it has a percent chance of performing an Unleash instead.
 * 
 * The Attack command can trigger Weapon Unleashes.
 * 
 * The Guard command can trigger Guard Unleashes.
 * 
 * In order for an Unleash to trigger, the battler must be able to use the
 * skill normally. This means if the Unleash skill costs MP to use and the
 * battler does not have enough MP, then the Unleash skill will not be
 * performed. Likewise, if the Unleash skill is on cooldown, it will not
 * trigger either.
 * 
 * If a battler has multiple Weapon or Guard Unleash traits, the game will go
 * through each trait one by one, taking whichever Unleash succeeds first.
 * 
 * When an Unleash triggers, if the Plugin Parameter settings allow for it,
 * then an animation will play (if Core Engine is installed) and a text popup
 * will be shown (if Battle Core is installed). At this point, any JavaScript
 * effects that trigger upon Unleash will also run, too.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Unleash-Related Notetags ===
 *
 * The following notetags are related to Unleashes, which have a percent chance
 * of trigger upon selecting "Attack" or "Guard" commands in-battle.
 *
 * ---
 *
 * <Weapon Unleash id: x%>
 * <Weapon Unleash name: x%>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Gives this object a trait that allows the affiliated battler a chance to
 *   perform an action other than "Attack" when selected.
 * - Replace 'id' with either the skill's ID or name you wish for the "Attack"
 *   command to have a chance of activating.
 * - Replace 'x' with a number representing the percentile chance to activate
 *   the Unleash skill.
 * - If a battler has multiple Weapon Unleash traits, the game will go through
 *   each trait one by one, taking whichever Unleash skill succeeds first.
 *
 * ---
 *
 * <Guard Unleash id: x%>
 * <Guard Unleash name: x%>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Gives this object a trait that allows the affiliated battler a chance to
 *   perform an action other than "Guard" when selected.
 * - Replace 'id' with either the skill's ID or name you wish for the "Guard"
 *   command to have a chance of activating.
 * - Replace 'x' with a number representing the percentile chance to activate
 *   the Unleash skill.
 * - If a battler has multiple Guard Unleash traits, the game will go through
 *   each trait one by one, taking whichever Unleash skill succeeds first.
 *
 * ---
 *
 * <Weapon Unleash: +x%>
 * <Weapon Unleash: -x%>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Raises/Lowers the activation chance of all Weapon Unleashes by x%.
 * - Replace 'x' with a number representing the additive increase/decrease of
 *   all Weapon Unleash success rates.
 *
 * ---
 *
 * <Weapon Unleash id: +x%>
 * <Weapon Unleash id: -x%>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Raises/Lowers the activation chance of the listed Weapon Unleash by x%.
 * - Replace 'id' with either the skill's ID or name you wish to increase the
 *   Weapon Unleash success rate for.
 * - Replace 'x' with a number representing the additive increase/decrease of
 *   the specified Weapon Unleash success rates.
 *
 * ---
 *
 * <Guard Unleash: +x%>
 * <Guard Unleash: -x%>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Raises/Lowers the activation chance of all Guard Unleashes by x%.
 * - Replace 'x' with a number representing the additive increase/decrease of
 *   all Guard Unleash success rates.
 *
 * ---
 *
 * <Guard Unleash id: +x%>
 * <Guard Unleash id: -x%>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Raises/Lowers the activation chance of the listed Guard Unleash by x%.
 * - Replace 'id' with either the skill's ID or name you wish to increase the
 *   Guard Unleash success rate for.
 * - Replace 'x' with a number representing the additive increase/decrease of
 *   the specified Guard Unleash success rates.
 *
 * ---
 *
 * === JavaScript Notetags: Unleash-Related ===
 *
 * The following notetags are made for users with JavaScript knowledge to
 * determine which Unleash skill will be used (if at all).
 *
 * ---
 *
 * <JS Weapon Unleash>
 *  code
 *  code
 *  id = code;
 * </JS Weapon Unleash>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Determines the Weapon Unleash skill ID to use.
 * - Replace 'code' with JavaScript code to determine the skill ID to use.
 * - The 'user' is the battler who is attempting to unleash the skill.
 * - The 'id' variable is the skill ID that the character will use for the
 *   "Weapon Unleash".
 * - Hint: The Unleashes occur at a 100% success rate. If you wish to make a
 *   percent chance success rate, check for a random number, and make it use
 *   the desired skill ID if it passes, and the default attack skill ID if it
 *   does not pass.
 *
 * ---
 *
 * <JS Guard Unleash>
 *  code
 *  code
 *  id = code;
 * </JS Guard Unleash>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Determines the Guard Unleash skill ID to use.
 * - Replace 'code' with JavaScript code to determine the skill ID to use.
 * - The 'user' is the battler who is attempting to unleash the skill.
 * - The 'id' variable is the skill ID that the character will use for the
 *   "Guard Unleash".
 * - Hint: The Unleashes occur at a 100% success rate. If you wish to make a
 *   percent chance success rate, check for a random number, and make it use
 *   the desired skill ID if it passes, and the default attack skill ID if it
 *   does not pass.
 *
 * ---
 * 
 * <JS On Unleash>
 *  code
 *  code
 *  code
 * </JS On Unleash>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - This code runs when any kind of Unleash, Weapon or Guard, triggers.
 * - Runs 'code' with JavaScript code to determine any effects that occur.
 * - The 'user' is the battler who is currently using the unleash skill.
 * - The 'id' variable is the skill ID being unleashed.
 * - The 'skill' variable is the skill being unleashed.
 * 
 * ---
 * 
 * <JS On Weapon Unleash>
 *  code
 *  code
 *  code
 * </JS On Weapon Unleash>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - This code runs when a Weapon Unleash triggers.
 * - Runs 'code' with JavaScript code to determine any effects that occur.
 * - The 'user' is the battler who is currently using the unleash skill.
 * - The 'id' variable is the skill ID being unleashed.
 * - The 'skill' variable is the skill being unleashed.
 * 
 * ---
 * 
 * <JS On Guard Unleash>
 *  code
 *  code
 *  code
 * </JS On Guard Unleash>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - This code runs when a Guard Unleash triggers.
 * - Runs 'code' with JavaScript code to determine any effects that occur.
 * - The 'user' is the battler who is currently using the unleash skill.
 * - The 'id' variable is the skill ID being unleashed.
 * - The 'skill' variable is the skill being unleashed.
 * 
 * ---
 *
 * === Replace-Related Notetags ===
 *
 * Skill replacement traits will replace the "Attack" and "Guard" commands in
 * battle with other skills. They will always be replaced unless an Unleash
 * successfully triggers and overrides them.
 *
 * ---
 *
 * <Replace Attack: id>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Replaces the battler's Attack command in battle with a different skill.
 * - Replace 'id' with the skill's ID or name you wish to replace the battler's
 *   Attack command with.
 * - If a Weapon Unleash occurs, the Weapon Unleash will take priority over the
 *   Replace Attack skill.
 * - If a battler has multiple Replace Attack traits, the game will go through
 *   each trait one by one, taking whichever replaced skill is found first.
 *
 * ---
 *
 * <Replace Guard: id>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Replaces the battler's Guard command in battle with a different skill.
 * - Replace 'id' with the skill's ID or name you wish to replace the battler's
 *   Guard command with.
 * - If a Weapon Unleash occurs, the Weapon Unleash will take priority over the
 *   Replace Guard skill.
 * - If a battler has multiple Replace Guard traits, the game will go through
 *   each trait one by one, taking whichever replaced skill is found first.
 *
 * ---
 *
 * === JavaScript Notetags: Replace-Related ===
 *
 * The following notetags are made for users with JavaScript knowledge to
 * determine which replacement skill will be used (if at all).
 *
 * ---
 *
 * <JS Replace Attack>
 *  code
 *  code
 *  id = code;
 * </JS Replace Attack>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Determines the Replace Attack skill ID to use.
 * - Replace 'code' with JavaScript code to determine the skill ID to use.
 * - The 'id' variable is the skill ID that the character will use for the
 *   attack replacement.
 *
 * ---
 *
 * <JS Replace Guard>
 *  code
 *  code
 *  id = code;
 * </JS Replace Guard>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Determines the Replace Guard skill ID to use.
 * - Replace 'code' with JavaScript code to determine the skill ID to use.
 * - The 'id' variable is the skill ID that the character will use for the
 *   attack replacement.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Weapon Unleash Settings
 * ============================================================================
 *
 * Special effects regarding Weapon Unleashes. These include animations and
 * text popups that appear visually along with mechanical effects that can be
 * extended upon with JavaScript.
 *
 * ---
 *
 * Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - Requires VisuMZ_0_CoreEngine.
 *
 * ---
 *
 * Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 *   - Requires VisuMZ_1_BattleCore.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: On Unleash:
 *   - Code ran when a Weapon Unleash triggers.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Guard Unleash Settings
 * ============================================================================
 *
 * Special effects regarding Guard Unleashes. These include animations and
 * text popups that appear visually along with mechanical effects that can be
 * extended upon with JavaScript.
 *
 * ---
 *
 * Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - Requires VisuMZ_0_CoreEngine.
 *
 * ---
 *
 * Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 *   - Requires VisuMZ_1_BattleCore.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: On Unleash:
 *   - Code ran when a Guard Unleash triggers.
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
 * Version 1.04: June 16, 2022
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.03: February 24, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.02: December 6, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.01: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.00: September 25, 2020
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
 * @param WeaponUnleash
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Weapon:struct
 * @text Weapon Unleash Settings
 * @type struct<Weapon>
 * @desc Special effects regarding Weapon Unleashes.
 * @default {"Animation":"","AnimationID:num":"12","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"UNLEASH!","TextColor:str":"0","FlashColor:eval":"[255, 0, 0, 160]","FlashDuration:num":"60","JavaScript":"","OnUnleashJS:func":"\"// Declare Constants\\nconst user = arguments[0];\\nconst skillID = arguments[1];\\nconst skill = $dataSkills[skillID];\\n\\n// Perform Action\\n\""}
 *
 * @param Guard:struct
 * @text Guard Unleash Settings
 * @type struct<Guard>
 * @desc Special effects regarding Guard Unleashes.
 * @default {"Animation":"","AnimationID:num":"49","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"UNLEASH!","TextColor:str":"0","FlashColor:eval":"[0, 255, 0, 160]","FlashDuration:num":"60","JavaScript":"","OnUnleashJS:func":"\"// Declare Constants\\nconst user = arguments[0];\\nconst skillID = arguments[1];\\nconst skill = $dataSkills[skillID];\\n\\n// Perform Action\\n\""}
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
 * Weapon Unleash Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Weapon:
 *
 * @param Animation
 *
 * @param AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Requires VisuMZ_0_CoreEngine.
 * @default 12
 *
 * @param Mirror:eval
 * @text Mirror Animation
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param Mute:eval
 * @text Mute Animation
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param Popups
 *
 * @param PopupText:str
 * @text Text
 * @parent Popups
 * @desc Text displayed upon the effect activating.
 * Requires VisuMZ_1_BattleCore.
 * @default UNLEASH!
 *
 * @param TextColor:str
 * @text Text Color
 * @parent Popups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent Popups
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param JavaScript
 *
 * @param OnUnleashJS:func
 * @text JS: On Unleash
 * @parent JavaScript
 * @type note
 * @desc Code ran when a Weapon Unleash triggers.
 * @default "// Declare Constants\nconst user = arguments[0];\nconst skillID = arguments[1];\nconst skill = $dataSkills[skillID];\n\n// Perform Action\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Guard Unleash Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Guard:
 *
 * @param Animation
 *
 * @param AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Requires VisuMZ_0_CoreEngine.
 * @default 49
 *
 * @param Mirror:eval
 * @text Mirror Animation
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param Mute:eval
 * @text Mute Animation
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param Popups
 *
 * @param PopupText:str
 * @text Text
 * @parent Popups
 * @desc Text displayed upon the effect activating.
 * Requires VisuMZ_1_BattleCore.
 * @default UNLEASH!
 *
 * @param TextColor:str
 * @text Text Color
 * @parent Popups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 255, 0, 160]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent Popups
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param JavaScript
 *
 * @param OnUnleashJS:func
 * @text JS: On Unleash
 * @parent JavaScript
 * @type note
 * @desc Code ran when a Guard Unleash triggers.
 * @default "// Declare Constants\nconst user = arguments[0];\nconst skillID = arguments[1];\nconst skill = $dataSkills[skillID];\n\n// Perform Action\n"
 *
 */
//=============================================================================

const _0x2650eb=_0x264c;(function(_0xe5236,_0x1437b8){const _0x520d0e=_0x264c,_0x446dcf=_0xe5236();while(!![]){try{const _0x58eba2=parseInt(_0x520d0e(0x116))/0x1+parseInt(_0x520d0e(0x141))/0x2+-parseInt(_0x520d0e(0xf9))/0x3*(-parseInt(_0x520d0e(0x11e))/0x4)+parseInt(_0x520d0e(0x10a))/0x5+-parseInt(_0x520d0e(0x149))/0x6*(-parseInt(_0x520d0e(0x14d))/0x7)+-parseInt(_0x520d0e(0x125))/0x8*(-parseInt(_0x520d0e(0xed))/0x9)+-parseInt(_0x520d0e(0x13f))/0xa*(parseInt(_0x520d0e(0xf3))/0xb);if(_0x58eba2===_0x1437b8)break;else _0x446dcf['push'](_0x446dcf['shift']());}catch(_0x4bcacc){_0x446dcf['push'](_0x446dcf['shift']());}}}(_0x1125,0x3bbb5));function _0x264c(_0xd805ce,_0x25b5cb){const _0x1125e5=_0x1125();return _0x264c=function(_0x264c61,_0x136e51){_0x264c61=_0x264c61-0xde;let _0x146957=_0x1125e5[_0x264c61];return _0x146957;},_0x264c(_0xd805ce,_0x25b5cb);}function _0x1125(){const _0x5156aa=['setAttack','Game_BattlerBase_attackSkillId','Game_BattlerBase_refresh','PopupText','user.guardSkillId()','ARRAYNUM','ARRAYEVAL','JSON','traitObjects','Class-%1-%2','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20id\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20$dataSkills[id];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20item\x20=\x20skill;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','meetUnleashConditions','REPLACE-GUARD','getUnleashSuccessRateBonus','concat','Game_BattlerBase_initMembers','ParseClassNotetags','STRUCT','status','canUse','trim','map','skills','OnUnleashJS','push','207uTqXTd','skillId','createUnleashReplaceJS','AnimationMute','call','getAttackSkillId','8869751gLkmvJ','Armor-%1-%2','%1-UNLEASH','attackSkillId','max','Window_ActorCommand_setup','3moFoEV','GUARD-UNLEASH','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20item\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20id\x20=\x20%2;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20id;\x0a\x20\x20\x20\x20','isGuard','createUnleashReplaceFuncCode','onUnleash','GUARD','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','name','ParseWeaponNotetags','setGuard','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','initMembers','getSkillIdWithName','ON-GUARD-UNLEASH','ParseActorNotetags','version','821200ffJeuj','ParseStateNotetags','ARRAYJSON','checkForGenericUnleashTraits','exit','getGuardSkillId','_checking_VisuMZ_UnleashNotetags','checkForWeaponUnleash','Weapon','ARRAYSTRUCT','onDatabaseLoaded','refresh','126298PaUcJk','guardSkillId','_cache','isAttack','ParseEnemyNotetags','createKeyJS','actions','processUnleashProperties','35620xBbvRX','Skill-%1-%2','note','TextColor','subject','Enemy-%1-%2','EVAL','47584aoHTcg','checkObjectForUnleashTraits','match','processUnleashNotetags','_guardUnleash','setSkill','prototype','parameters','Game_BattlerBase_guardSkillId','Guard','setup','Item-%1-%2','_subject','ParseArmorNotetags','format','ON-%1-UNLEASH','includes','createOnUnleashFuncCode','applyUnleashSkill','createOnUnleashJS','checkCacheKey','Scene_Boot_onDatabaseLoaded','startAction','ON-UNLEASH','parse','WEAPON-UNLEASH','10RvWyTR','Parse_Notetags_ProcessJS','507004cSgtRI','enemy','ParseSkillNotetags','requestFauxAnimation','REPLACE-ATTACK','WeaponUnleash','VisuMZ_0_CoreEngine','toUpperCase','74742YoMbwp','ON-WEAPON-UNLEASH','State-%1-%2','clear','203yWplnG','onUnleashJS','ConvertParams','STR','_skillIDs','Settings','hasAttackGuardSkillAsUnleash','WEAPON','return\x200'];_0x1125=function(){return _0x5156aa;};return _0x1125();}var label=_0x2650eb(0x146),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x4a8eb9){const _0x2e1050=_0x2650eb;return _0x4a8eb9[_0x2e1050(0xe6)]&&_0x4a8eb9['description'][_0x2e1050(0x135)]('['+label+']');})[0x0];VisuMZ[label][_0x2650eb(0x152)]=VisuMZ[label]['Settings']||{},VisuMZ['ConvertParams']=function(_0x3746eb,_0x29862b){const _0x3b348a=_0x2650eb;for(const _0x32252e in _0x29862b){if(_0x32252e['match'](/(.*):(.*)/i)){const _0x491e52=String(RegExp['$1']),_0x2bf144=String(RegExp['$2'])[_0x3b348a(0x148)]()[_0x3b348a(0xe8)]();let _0x2b6c44,_0x50f3a4,_0x469a8f;switch(_0x2bf144){case'NUM':_0x2b6c44=_0x29862b[_0x32252e]!==''?Number(_0x29862b[_0x32252e]):0x0;break;case _0x3b348a(0x15b):_0x50f3a4=_0x29862b[_0x32252e]!==''?JSON[_0x3b348a(0x13d)](_0x29862b[_0x32252e]):[],_0x2b6c44=_0x50f3a4[_0x3b348a(0xe9)](_0xd37375=>Number(_0xd37375));break;case _0x3b348a(0x124):_0x2b6c44=_0x29862b[_0x32252e]!==''?eval(_0x29862b[_0x32252e]):null;break;case _0x3b348a(0x15c):_0x50f3a4=_0x29862b[_0x32252e]!==''?JSON[_0x3b348a(0x13d)](_0x29862b[_0x32252e]):[],_0x2b6c44=_0x50f3a4[_0x3b348a(0xe9)](_0x46ccac=>eval(_0x46ccac));break;case _0x3b348a(0x15d):_0x2b6c44=_0x29862b[_0x32252e]!==''?JSON[_0x3b348a(0x13d)](_0x29862b[_0x32252e]):'';break;case _0x3b348a(0x10c):_0x50f3a4=_0x29862b[_0x32252e]!==''?JSON[_0x3b348a(0x13d)](_0x29862b[_0x32252e]):[],_0x2b6c44=_0x50f3a4['map'](_0x308914=>JSON['parse'](_0x308914));break;case'FUNC':_0x2b6c44=_0x29862b[_0x32252e]!==''?new Function(JSON[_0x3b348a(0x13d)](_0x29862b[_0x32252e])):new Function(_0x3b348a(0x155));break;case'ARRAYFUNC':_0x50f3a4=_0x29862b[_0x32252e]!==''?JSON[_0x3b348a(0x13d)](_0x29862b[_0x32252e]):[],_0x2b6c44=_0x50f3a4[_0x3b348a(0xe9)](_0x3694e7=>new Function(JSON[_0x3b348a(0x13d)](_0x3694e7)));break;case _0x3b348a(0x150):_0x2b6c44=_0x29862b[_0x32252e]!==''?String(_0x29862b[_0x32252e]):'';break;case'ARRAYSTR':_0x50f3a4=_0x29862b[_0x32252e]!==''?JSON[_0x3b348a(0x13d)](_0x29862b[_0x32252e]):[],_0x2b6c44=_0x50f3a4[_0x3b348a(0xe9)](_0x9578ed=>String(_0x9578ed));break;case _0x3b348a(0xe5):_0x469a8f=_0x29862b[_0x32252e]!==''?JSON[_0x3b348a(0x13d)](_0x29862b[_0x32252e]):{},_0x2b6c44=VisuMZ[_0x3b348a(0x14f)]({},_0x469a8f);break;case _0x3b348a(0x113):_0x50f3a4=_0x29862b[_0x32252e]!==''?JSON[_0x3b348a(0x13d)](_0x29862b[_0x32252e]):[],_0x2b6c44=_0x50f3a4[_0x3b348a(0xe9)](_0x30787a=>VisuMZ[_0x3b348a(0x14f)]({},JSON[_0x3b348a(0x13d)](_0x30787a)));break;default:continue;}_0x3746eb[_0x491e52]=_0x2b6c44;}}return _0x3746eb;},(_0x20ffe6=>{const _0x2bf141=_0x2650eb,_0x155e7e=_0x20ffe6['name'];for(const _0x1ead7e of dependencies){if(!Imported[_0x1ead7e]){alert(_0x2bf141(0x104)['format'](_0x155e7e,_0x1ead7e)),SceneManager[_0x2bf141(0x10e)]();break;}}const _0x26513c=_0x20ffe6['description'];if(_0x26513c['match'](/\[Version[ ](.*?)\]/i)){const _0x19d6e7=Number(RegExp['$1']);_0x19d6e7!==VisuMZ[label][_0x2bf141(0x109)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x155e7e,_0x19d6e7)),SceneManager[_0x2bf141(0x10e)]());}if(_0x26513c['match'](/\[Tier[ ](\d+)\]/i)){const _0x4a187d=Number(RegExp['$1']);_0x4a187d<tier?(alert(_0x2bf141(0x100)[_0x2bf141(0x133)](_0x155e7e,_0x4a187d,tier)),SceneManager['exit']()):tier=Math[_0x2bf141(0xf7)](_0x4a187d,tier);}VisuMZ[_0x2bf141(0x14f)](VisuMZ[label]['Settings'],_0x20ffe6[_0x2bf141(0x12c)]);})(pluginData),VisuMZ[_0x2650eb(0x146)][_0x2650eb(0x13a)]=Scene_Boot['prototype'][_0x2650eb(0x114)],Scene_Boot[_0x2650eb(0x12b)][_0x2650eb(0x114)]=function(){const _0x3b48fa=_0x2650eb;VisuMZ[_0x3b48fa(0x146)][_0x3b48fa(0x13a)][_0x3b48fa(0xf1)](this),this['process_VisuMZ_WeaponUnleash_Notetags']();},Scene_Boot[_0x2650eb(0x12b)]['process_VisuMZ_WeaponUnleash_Notetags']=function(){const _0x17871a=_0x2650eb;if(VisuMZ['ParseAllNotetags'])return;const _0x5b78fc=$dataActors['concat']($dataClasses,$dataSkills,$dataWeapons,$dataArmors,$dataEnemies,$dataStates);for(const _0x2cc87b of _0x5b78fc){if(!_0x2cc87b)continue;VisuMZ['WeaponUnleash'][_0x17871a(0x140)](_0x2cc87b);}},VisuMZ[_0x2650eb(0x146)][_0x2650eb(0x108)]=VisuMZ[_0x2650eb(0x108)],VisuMZ[_0x2650eb(0x108)]=function(_0x4e0f38){const _0xa76c9d=_0x2650eb;VisuMZ['WeaponUnleash'][_0xa76c9d(0x108)]['call'](this,_0x4e0f38),VisuMZ[_0xa76c9d(0x146)][_0xa76c9d(0x140)](_0x4e0f38);},VisuMZ[_0x2650eb(0x146)]['ParseClassNotetags']=VisuMZ[_0x2650eb(0xe4)],VisuMZ[_0x2650eb(0xe4)]=function(_0x174ae9){const _0x25ebd8=_0x2650eb;VisuMZ[_0x25ebd8(0x146)][_0x25ebd8(0xe4)][_0x25ebd8(0xf1)](this,_0x174ae9),VisuMZ[_0x25ebd8(0x146)][_0x25ebd8(0x140)](_0x174ae9);},VisuMZ[_0x2650eb(0x146)][_0x2650eb(0x143)]=VisuMZ[_0x2650eb(0x143)],VisuMZ[_0x2650eb(0x143)]=function(_0x475f37){const _0x52014f=_0x2650eb;VisuMZ[_0x52014f(0x146)]['ParseSkillNotetags']['call'](this,_0x475f37),VisuMZ[_0x52014f(0x146)][_0x52014f(0x140)](_0x475f37);},VisuMZ['WeaponUnleash'][_0x2650eb(0x102)]=VisuMZ[_0x2650eb(0x102)],VisuMZ[_0x2650eb(0x102)]=function(_0x4d8e4a){const _0x38c8cf=_0x2650eb;VisuMZ[_0x38c8cf(0x146)][_0x38c8cf(0x102)][_0x38c8cf(0xf1)](this,_0x4d8e4a),VisuMZ['WeaponUnleash'][_0x38c8cf(0x140)](_0x4d8e4a);},VisuMZ[_0x2650eb(0x146)][_0x2650eb(0x132)]=VisuMZ[_0x2650eb(0x132)],VisuMZ['ParseArmorNotetags']=function(_0x4f6053){const _0x4b613a=_0x2650eb;VisuMZ[_0x4b613a(0x146)][_0x4b613a(0x132)][_0x4b613a(0xf1)](this,_0x4f6053),VisuMZ[_0x4b613a(0x146)][_0x4b613a(0x140)](_0x4f6053);},VisuMZ[_0x2650eb(0x146)]['ParseEnemyNotetags']=VisuMZ[_0x2650eb(0x11a)],VisuMZ[_0x2650eb(0x11a)]=function(_0x1e8de5){const _0x3a1d5b=_0x2650eb;VisuMZ['WeaponUnleash'][_0x3a1d5b(0x11a)][_0x3a1d5b(0xf1)](this,_0x1e8de5),VisuMZ[_0x3a1d5b(0x146)]['Parse_Notetags_ProcessJS'](_0x1e8de5);},VisuMZ['WeaponUnleash'][_0x2650eb(0x10b)]=VisuMZ['ParseStateNotetags'],VisuMZ[_0x2650eb(0x10b)]=function(_0x5d93f2){const _0x5b318d=_0x2650eb;VisuMZ[_0x5b318d(0x146)][_0x5b318d(0x10b)][_0x5b318d(0xf1)](this,_0x5d93f2),VisuMZ[_0x5b318d(0x146)][_0x5b318d(0x140)](_0x5d93f2);},VisuMZ[_0x2650eb(0x146)]['Parse_Notetags_ProcessJS']=function(_0x3aa213){const _0x46316a=_0x2650eb;_0x3aa213[_0x46316a(0x120)][_0x46316a(0x127)](/<JS WEAPON UNLEASH>\s*([\s\S]*)\s*<\/JS WEAPON UNLEASH>/i)&&VisuMZ[_0x46316a(0x146)][_0x46316a(0xef)](_0x3aa213,_0x46316a(0x13e),RegExp['$1']),_0x3aa213['note']['match'](/<JS GUARD UNLEASH>\s*([\s\S]*)\s*<\/JS GUARD UNLEASH>/i)&&VisuMZ['WeaponUnleash'][_0x46316a(0xef)](_0x3aa213,_0x46316a(0xfa),RegExp['$1']),_0x3aa213['note'][_0x46316a(0x127)](/<JS REPLACE ATTACK>\s*([\s\S]*)\s*<\/JS REPLACE ATTACK>/i)&&VisuMZ[_0x46316a(0x146)][_0x46316a(0xef)](_0x3aa213,'REPLACE-ATTACK',RegExp['$1']),_0x3aa213['note']['match'](/<JS REPLACE GUARD>\s*([\s\S]*)\s*<\/JS REPLACE GUARD>/i)&&VisuMZ[_0x46316a(0x146)]['createUnleashReplaceJS'](_0x3aa213,_0x46316a(0xe0),RegExp['$1']),_0x3aa213[_0x46316a(0x120)][_0x46316a(0x127)](/<JS ON UNLEASH>\s*([\s\S]*)\s*<\/JS ON UNLEASH>/i)&&VisuMZ[_0x46316a(0x146)][_0x46316a(0x138)](_0x3aa213,_0x46316a(0x13c),RegExp['$1']),_0x3aa213['note'][_0x46316a(0x127)](/<JS ON WEAPON UNLEASH>\s*([\s\S]*)\s*<\/JS ON WEAPON UNLEASH>/i)&&VisuMZ[_0x46316a(0x146)][_0x46316a(0x138)](_0x3aa213,_0x46316a(0x14a),RegExp['$1']),_0x3aa213[_0x46316a(0x120)][_0x46316a(0x127)](/<JS ON GUARD UNLEASH>\s*([\s\S]*)\s*<\/JS ON GUARD UNLEASH>/i)&&VisuMZ[_0x46316a(0x146)][_0x46316a(0x138)](_0x3aa213,_0x46316a(0x107),RegExp['$1']);},VisuMZ[_0x2650eb(0x146)]['JS']={},VisuMZ['WeaponUnleash']['createUnleashReplaceJS']=function(_0x4bc4c3,_0x57de66,_0x4b1256){const _0x2e1e02=_0x2650eb,_0x23bef4=VisuMZ[_0x2e1e02(0x146)][_0x2e1e02(0xfd)](_0x57de66,_0x4b1256),_0x379fe8=VisuMZ[_0x2e1e02(0x146)]['createKeyJS'](_0x4bc4c3,_0x57de66);VisuMZ[_0x2e1e02(0x146)]['JS'][_0x379fe8]=new Function(_0x23bef4);},VisuMZ[_0x2650eb(0x146)][_0x2650eb(0xfd)]=function(_0x41bfa7,_0x53bb3d){const _0x42a0c0=_0x2650eb;let _0x58e663='user.attackSkillId()';switch(_0x41bfa7[_0x42a0c0(0x148)]()[_0x42a0c0(0xe8)]()){case'WEAPON-UNLEASH':case _0x42a0c0(0x145):_0x58e663='user.attackSkillId()';break;case _0x42a0c0(0xfa):case _0x42a0c0(0xe0):_0x58e663=_0x42a0c0(0x15a);break;}return _0x42a0c0(0xfb)[_0x42a0c0(0x133)](_0x53bb3d,_0x58e663);},VisuMZ[_0x2650eb(0x146)][_0x2650eb(0x138)]=function(_0x56f66b,_0x49e95c,_0x482b1b){const _0x21e238=_0x2650eb,_0x5a7026=VisuMZ[_0x21e238(0x146)]['createOnUnleashFuncCode'](_0x49e95c,_0x482b1b),_0x30eaf2=VisuMZ[_0x21e238(0x146)][_0x21e238(0x11b)](_0x56f66b,_0x49e95c);VisuMZ[_0x21e238(0x146)]['JS'][_0x30eaf2]=new Function(_0x5a7026);},VisuMZ[_0x2650eb(0x146)][_0x2650eb(0x136)]=function(_0x592969,_0x10fc50){const _0x36e762=_0x2650eb;return _0x36e762(0xde)[_0x36e762(0x133)](_0x10fc50);},VisuMZ[_0x2650eb(0x146)][_0x2650eb(0x11b)]=function(_0x2ccb6a,_0x123208){const _0x511fe0=_0x2650eb;if(VisuMZ[_0x511fe0(0x11b)])return VisuMZ[_0x511fe0(0x11b)](_0x2ccb6a,_0x123208);let _0x1f0988='';if($dataActors[_0x511fe0(0x135)](_0x2ccb6a))_0x1f0988='Actor-%1-%2'[_0x511fe0(0x133)](_0x2ccb6a['id'],_0x123208);if($dataClasses['includes'](_0x2ccb6a))_0x1f0988=_0x511fe0(0x15f)['format'](_0x2ccb6a['id'],_0x123208);if($dataSkills[_0x511fe0(0x135)](_0x2ccb6a))_0x1f0988=_0x511fe0(0x11f)[_0x511fe0(0x133)](_0x2ccb6a['id'],_0x123208);if($dataItems[_0x511fe0(0x135)](_0x2ccb6a))_0x1f0988=_0x511fe0(0x130)[_0x511fe0(0x133)](_0x2ccb6a['id'],_0x123208);if($dataWeapons[_0x511fe0(0x135)](_0x2ccb6a))_0x1f0988='Weapon-%1-%2'[_0x511fe0(0x133)](_0x2ccb6a['id'],_0x123208);if($dataArmors['includes'](_0x2ccb6a))_0x1f0988=_0x511fe0(0xf4)[_0x511fe0(0x133)](_0x2ccb6a['id'],_0x123208);if($dataEnemies['includes'](_0x2ccb6a))_0x1f0988=_0x511fe0(0x123)[_0x511fe0(0x133)](_0x2ccb6a['id'],_0x123208);if($dataStates[_0x511fe0(0x135)](_0x2ccb6a))_0x1f0988=_0x511fe0(0x14b)[_0x511fe0(0x133)](_0x2ccb6a['id'],_0x123208);return _0x1f0988;},DataManager[_0x2650eb(0x106)]=function(_0x153903){const _0x49bbdc=_0x2650eb;_0x153903=_0x153903[_0x49bbdc(0x148)]()[_0x49bbdc(0xe8)](),this[_0x49bbdc(0x151)]=this[_0x49bbdc(0x151)]||{};if(this[_0x49bbdc(0x151)][_0x153903])return this['_skillIDs'][_0x153903];for(const _0x5d18ab of $dataSkills){if(!_0x5d18ab)continue;this[_0x49bbdc(0x151)][_0x5d18ab[_0x49bbdc(0x101)][_0x49bbdc(0x148)]()[_0x49bbdc(0xe8)]()]=_0x5d18ab['id'];}return this['_skillIDs'][_0x153903]||0x0;},VisuMZ['WeaponUnleash']['BattleManager_startAction']=BattleManager[_0x2650eb(0x13b)],BattleManager['startAction']=function(){const _0x5cfe86=_0x2650eb;this[_0x5cfe86(0x111)](),VisuMZ[_0x5cfe86(0x146)]['BattleManager_startAction'][_0x5cfe86(0xf1)](this);},BattleManager[_0x2650eb(0x111)]=function(){const _0x5d68c3=_0x2650eb,_0x209649=this[_0x5d68c3(0x131)],_0x214583=_0x209649['currentAction']();if(_0x214583)_0x214583[_0x5d68c3(0x11d)]();},Game_Action[_0x2650eb(0x12b)][_0x2650eb(0x11d)]=function(){const _0x161184=_0x2650eb;if(!this[_0x161184(0x122)]())return;if(!this['item']())return;if(this[_0x161184(0x119)]())this[_0x161184(0x128)](_0x161184(0x154));else this[_0x161184(0xfc)]()&&this[_0x161184(0x128)]('GUARD');},Game_Action[_0x2650eb(0x12b)]['processUnleashNotetags']=function(_0x1a1ba9){const _0x3e6753=_0x2650eb,_0xeac2a1=this[_0x3e6753(0x122)]()[_0x3e6753(0x15e)]()[_0x3e6753(0xe2)](this[_0x3e6753(0x122)]()[_0x3e6753(0xea)]());for(const _0x68a258 of _0xeac2a1){if(!_0x68a258)continue;if(this[_0x3e6753(0x126)](_0x1a1ba9,_0x68a258))break;}},Game_Action[_0x2650eb(0x12b)][_0x2650eb(0x126)]=function(_0x5dc72b,_0x3e85e6){const _0x52009a=_0x2650eb;if(this[_0x52009a(0x10d)](_0x5dc72b,_0x3e85e6))return!![];if(this['checkForJSUnleashTraits'](_0x5dc72b,_0x3e85e6))return!![];return![];},Game_Action['prototype']['checkForGenericUnleashTraits']=function(_0x38bbc6,_0x4af0d9){const _0x16ec4d=_0x2650eb,_0x1eca4=_0x4af0d9[_0x16ec4d(0x120)][_0x16ec4d(0x127)](/<(.*) UNLEASH (.*):[ ](\d+)([%％])>/gi);if(_0x1eca4)for(const _0x1e99f2 of _0x1eca4){if(_0x1e99f2[_0x16ec4d(0x127)](/<(.*) UNLEASH (.*):[ ](\d+)([%％])>/i)){const _0x392c47=String(RegExp['$1'])[_0x16ec4d(0x148)]()[_0x16ec4d(0xe8)](),_0x39cb2f=DataManager[_0x16ec4d(0x106)](RegExp['$2'])||Number(RegExp['$2']),_0x409004=Number(RegExp['$3'])*0.01;if(_0x392c47!==_0x38bbc6)continue;if(this[_0x16ec4d(0x137)](_0x38bbc6,_0x39cb2f,_0x409004))return!![];}}return![];},Game_Action[_0x2650eb(0x12b)]['checkForJSUnleashTraits']=function(_0x1838ea,_0x4f896e){const _0x1a46ec=_0x2650eb,_0x2704a9=_0x1a46ec(0xf5)['format'](_0x1838ea[_0x1a46ec(0x148)]()['trim']()),_0x3d0922=VisuMZ[_0x1a46ec(0x146)][_0x1a46ec(0x11b)](_0x4f896e,_0x2704a9);if(VisuMZ[_0x1a46ec(0x146)]['JS'][_0x3d0922]){const _0x535423=VisuMZ['WeaponUnleash']['JS'][_0x3d0922]['call'](this,this[_0x1a46ec(0x122)](),_0x4f896e);if(this[_0x1a46ec(0x137)](_0x1838ea,_0x535423,0x1))return!![];}return![];},Game_Action[_0x2650eb(0x12b)][_0x2650eb(0x137)]=function(_0x7d199a,_0x4995b8,_0x1e5658){const _0x45af81=_0x2650eb;_0x1e5658+=this['subject']()['getUnleashSuccessRateBonus'](_0x7d199a,_0x4995b8);if(this[_0x45af81(0x153)](_0x7d199a,_0x4995b8))return![];if(!this[_0x45af81(0xdf)](_0x4995b8,_0x1e5658))return![];this['setSkill'](_0x4995b8);if(_0x7d199a===_0x45af81(0x154))this['onUnleash'](_0x45af81(0x112),_0x4995b8),this['_weaponUnleash']=!![];else _0x7d199a===_0x45af81(0xff)&&(this[_0x45af81(0xfe)](_0x45af81(0x12e),_0x4995b8),this[_0x45af81(0x129)]=!![]);return!![];},Game_Action[_0x2650eb(0x12b)]['hasAttackGuardSkillAsUnleash']=function(_0x4f1ef2,_0x5d7166){const _0x3df739=_0x2650eb;if(_0x4f1ef2===_0x3df739(0x154))return this[_0x3df739(0x122)]()[_0x3df739(0xf6)]()===_0x5d7166;else{if(_0x4f1ef2==='GUARD')return this[_0x3df739(0x122)]()['guardSkillId']()===_0x5d7166;}return![];},Game_Action[_0x2650eb(0x12b)]['meetUnleashConditions']=function(_0x4b1dc3,_0x3cfeb0){const _0x460faf=_0x2650eb;if(Math['random']()>_0x3cfeb0)return![];const _0x3563eb=$dataSkills[_0x4b1dc3];if(!_0x3563eb)return![];if(!this[_0x460faf(0x122)]())return![];if(!this['subject']()[_0x460faf(0xe7)](_0x3563eb))return![];return!![];},Game_Action[_0x2650eb(0x12b)][_0x2650eb(0xfe)]=function(_0x121b44,_0x15cefe){const _0x396240=_0x2650eb,_0x1fe764=VisuMZ[_0x396240(0x146)][_0x396240(0x152)][_0x121b44];if(!_0x1fe764)return;const _0x485d22=this[_0x396240(0x122)]();if(!_0x485d22)return;if(Imported[_0x396240(0x147)]){const _0x317843=[_0x485d22],_0x5ce7d4=_0x1fe764['AnimationID'],_0x184971=_0x1fe764['AnimationMirror'],_0x4d398f=_0x1fe764[_0x396240(0xf0)];$gameTemp[_0x396240(0x144)](_0x317843,_0x5ce7d4,_0x184971,_0x4d398f);}if(Imported['VisuMZ_1_BattleCore']){const _0x3318cf=_0x1fe764[_0x396240(0x159)],_0x3ea726={'textColor':_0x1fe764[_0x396240(0x121)]||0x0,'flashColor':_0x1fe764['FlashColor']||[0x0,0x0,0x0,0x0],'flashDuration':_0x1fe764['FlashDuration']||0x3c};_0x485d22['setupTextPopup'](_0x3318cf,_0x3ea726);}_0x1fe764[_0x396240(0xeb)]&&_0x1fe764[_0x396240(0xeb)][_0x396240(0xf1)](this,_0x485d22,_0x15cefe),_0x485d22[_0x396240(0x14e)](_0x121b44,_0x15cefe);},Game_Action['prototype']['setEnemyAction']=function(_0xd3f1f2){const _0x1fb035=_0x2650eb;if(_0xd3f1f2){const _0x4ea84e=_0xd3f1f2[_0x1fb035(0xee)];if(_0x4ea84e===0x1&&this[_0x1fb035(0x122)]()['attackSkillId']()!==0x1)this[_0x1fb035(0x156)]();else _0x4ea84e===0x2&&this[_0x1fb035(0x122)]()[_0x1fb035(0x117)]()!==0x2?this[_0x1fb035(0x103)]():this[_0x1fb035(0x12a)](_0x4ea84e);}else this[_0x1fb035(0x14c)]();},VisuMZ[_0x2650eb(0x146)][_0x2650eb(0xe3)]=Game_BattlerBase['prototype'][_0x2650eb(0x105)],Game_BattlerBase[_0x2650eb(0x12b)][_0x2650eb(0x105)]=function(){const _0x59f660=_0x2650eb;this['_cache']={},VisuMZ[_0x59f660(0x146)][_0x59f660(0xe3)][_0x59f660(0xf1)](this);},VisuMZ[_0x2650eb(0x146)][_0x2650eb(0x158)]=Game_BattlerBase[_0x2650eb(0x12b)]['refresh'],Game_BattlerBase[_0x2650eb(0x12b)][_0x2650eb(0x115)]=function(){const _0x3b0851=_0x2650eb;this[_0x3b0851(0x118)]={},VisuMZ['WeaponUnleash'][_0x3b0851(0x158)]['call'](this);},Game_BattlerBase[_0x2650eb(0x12b)][_0x2650eb(0x139)]=function(_0x51d499){const _0x4b2e10=_0x2650eb;return this['_cache']=this['_cache']||{},this[_0x4b2e10(0x118)][_0x51d499]!==undefined;},VisuMZ['WeaponUnleash'][_0x2650eb(0x157)]=Game_BattlerBase[_0x2650eb(0x12b)]['attackSkillId'],Game_BattlerBase[_0x2650eb(0x12b)][_0x2650eb(0xf6)]=function(){const _0x19e662=_0x2650eb;if(this[_0x19e662(0x110)])return VisuMZ[_0x19e662(0x146)][_0x19e662(0x157)][_0x19e662(0xf1)](this);const _0x598cb5=_0x19e662(0xf6);if(this[_0x19e662(0x139)](_0x598cb5))return this[_0x19e662(0x118)][_0x598cb5];return this[_0x19e662(0x118)][_0x598cb5]=this['getAttackSkillId'](),this[_0x19e662(0x118)][_0x598cb5];},Game_BattlerBase['prototype'][_0x2650eb(0xf2)]=function(){const _0x9f4469=_0x2650eb,_0x1fde22=this[_0x9f4469(0x15e)]()['concat'](this[_0x9f4469(0xea)]());for(const _0x75dfed of _0x1fde22){if(!_0x75dfed)continue;if(_0x75dfed['note'][_0x9f4469(0x127)](/<REPLACE ATTACK:[ ](.*)>/i)){const _0x173771=DataManager['getSkillIdWithName'](RegExp['$1'])||Number(RegExp['$1']);if($dataSkills[_0x173771])return _0x173771;}const _0x242739=_0x9f4469(0x145),_0x26a21e=VisuMZ['WeaponUnleash']['createKeyJS'](_0x75dfed,_0x242739);if(VisuMZ[_0x9f4469(0x146)]['JS'][_0x26a21e]){this[_0x9f4469(0x110)]=!![];const _0x1d619b=VisuMZ[_0x9f4469(0x146)]['JS'][_0x26a21e]['call'](this,this,_0x75dfed);this[_0x9f4469(0x110)]=![];if($dataSkills[_0x1d619b])return _0x1d619b;}}return VisuMZ[_0x9f4469(0x146)][_0x9f4469(0x157)][_0x9f4469(0xf1)](this);},VisuMZ[_0x2650eb(0x146)]['Game_BattlerBase_guardSkillId']=Game_BattlerBase['prototype'][_0x2650eb(0x117)],Game_BattlerBase[_0x2650eb(0x12b)][_0x2650eb(0x117)]=function(){const _0x39acad=_0x2650eb;if(this[_0x39acad(0x110)])return VisuMZ[_0x39acad(0x146)]['Game_BattlerBase_guardSkillId'][_0x39acad(0xf1)](this);const _0x56f29e=_0x39acad(0x117);if(this[_0x39acad(0x139)](_0x56f29e))return this[_0x39acad(0x118)][_0x56f29e];return this[_0x39acad(0x118)][_0x56f29e]=this[_0x39acad(0x10f)](),this[_0x39acad(0x118)][_0x56f29e];},Game_BattlerBase[_0x2650eb(0x12b)][_0x2650eb(0x10f)]=function(){const _0xf80b5c=_0x2650eb,_0x86d2=this[_0xf80b5c(0x15e)]()[_0xf80b5c(0xe2)](this['skills']());for(const _0x41f746 of _0x86d2){if(!_0x41f746)continue;if(_0x41f746[_0xf80b5c(0x120)][_0xf80b5c(0x127)](/<REPLACE GUARD:[ ](.*)>/i)){const _0x23a9b3=DataManager[_0xf80b5c(0x106)](RegExp['$1'])||Number(RegExp['$1']);if($dataSkills[_0x23a9b3])return _0x23a9b3;}const _0x115e3e=_0xf80b5c(0xe0),_0x3fc741=VisuMZ[_0xf80b5c(0x146)][_0xf80b5c(0x11b)](_0x41f746,_0x115e3e);if(VisuMZ['WeaponUnleash']['JS'][_0x3fc741]){this[_0xf80b5c(0x110)]=!![];const _0x3fbdf9=VisuMZ[_0xf80b5c(0x146)]['JS'][_0x3fc741][_0xf80b5c(0xf1)](this,this,_0x41f746);this[_0xf80b5c(0x110)]=![];if($dataSkills[_0x3fbdf9])return _0x3fbdf9;}}return VisuMZ[_0xf80b5c(0x146)][_0xf80b5c(0x12d)][_0xf80b5c(0xf1)](this);},Game_BattlerBase[_0x2650eb(0x12b)][_0x2650eb(0xe1)]=function(_0x107f10,_0x1b6941){const _0x33efeb=_0x2650eb,_0x571692=this['traitObjects']()[_0x33efeb(0xe2)](this[_0x33efeb(0xea)]());let _0x4e6fa8=0x0;for(const _0x577d19 of _0x571692){if(!_0x577d19)continue;const _0x9ac019=_0x577d19[_0x33efeb(0x120)];if(_0x107f10===_0x33efeb(0x154)){_0x9ac019['match'](/<WEAPON UNLEASH:[ ]([\+\-]\d+)([%％])>/i)&&(_0x4e6fa8+=Number(RegExp['$1'])*0.01);if(_0x9ac019[_0x33efeb(0x127)](/<WEAPON UNLEASH (.*):[ ]([\+\-]\d+)([%％])>/i)){const _0x5ef450=DataManager[_0x33efeb(0x106)](RegExp['$1'])||Number(RegExp['$1']);_0x5ef450===_0x1b6941&&$dataSkills[_0x5ef450]&&(_0x4e6fa8+=Number(RegExp['$2'])*0.01);}}else{if(_0x107f10===_0x33efeb(0xff)){_0x9ac019['match'](/<GUARD UNLEASH:[ ]([\+\-]\d+)([%％])>/i)&&(_0x4e6fa8+=Number(RegExp['$1'])*0.01);if(_0x9ac019[_0x33efeb(0x127)](/<GUARD UNLEASH (.*):[ ]([\+\-]\d+)([%％])>/i)){const _0x410c75=DataManager[_0x33efeb(0x106)](RegExp['$1'])||Number(RegExp['$1']);_0x410c75===_0x1b6941&&$dataSkills[_0x410c75]&&(_0x4e6fa8+=Number(RegExp['$2'])*0.01);}}}}return _0x4e6fa8;},Game_Battler[_0x2650eb(0x12b)][_0x2650eb(0x14e)]=function(_0x204cf2,_0x4f5a82){const _0x4c0baa=_0x2650eb,_0x313c4d=this[_0x4c0baa(0x15e)]()[_0x4c0baa(0xe2)](this['skills']());for(const _0x4b789e of _0x313c4d){if(!_0x4b789e)continue;const _0x30c196=VisuMZ['WeaponUnleash'][_0x4c0baa(0x11b)](_0x4b789e,'ON-UNLEASH');VisuMZ[_0x4c0baa(0x146)]['JS'][_0x30c196]&&VisuMZ[_0x4c0baa(0x146)]['JS'][_0x30c196][_0x4c0baa(0xf1)](this,this,_0x4f5a82);const _0x612624=VisuMZ[_0x4c0baa(0x146)][_0x4c0baa(0x11b)](_0x4b789e,_0x4c0baa(0x134)[_0x4c0baa(0x133)](_0x204cf2[_0x4c0baa(0x148)]()[_0x4c0baa(0xe8)]()));VisuMZ[_0x4c0baa(0x146)]['JS'][_0x612624]&&VisuMZ[_0x4c0baa(0x146)]['JS'][_0x612624][_0x4c0baa(0xf1)](this,this,_0x4f5a82);}},Game_Enemy[_0x2650eb(0x12b)][_0x2650eb(0xea)]=function(){const _0x53963b=_0x2650eb,_0x5f5c92=[];for(const _0x215e28 of this[_0x53963b(0x142)]()[_0x53963b(0x11c)]){const _0x3f3dce=$dataSkills[_0x215e28['skillId']];if(_0x3f3dce&&!_0x5f5c92[_0x53963b(0x135)](_0x3f3dce))_0x5f5c92[_0x53963b(0xec)](_0x3f3dce);}return _0x5f5c92;},VisuMZ[_0x2650eb(0x146)][_0x2650eb(0xf8)]=Window_ActorCommand[_0x2650eb(0x12b)][_0x2650eb(0x12f)],Window_ActorCommand[_0x2650eb(0x12b)]['setup']=function(_0x3758ed){const _0x870c37=_0x2650eb;if(_0x3758ed)_0x3758ed['refresh']();VisuMZ['WeaponUnleash'][_0x870c37(0xf8)][_0x870c37(0xf1)](this,_0x3758ed);};