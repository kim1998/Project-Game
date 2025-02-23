//=============================================================================
// VisuStella MZ - Victory Aftermath
// VisuMZ_3_VictoryAftermath.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_VictoryAftermath = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VictoryAftermath = VisuMZ.VictoryAftermath || {};
VisuMZ.VictoryAftermath.version = 1.17;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.17] [VictoryAftermath]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Victory_Aftermath_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Victory Aftermath plugin consolidates the rewards granted upon finishing
 * a battle successfully into one screen (or more if there are level ups).
 * This helps reduce the amount of button presses needed to display similar
 * information by default. The level up screens will also display parameter
 * changes and new skills acquired in addition to victory quotes.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Consolidates EXP, Gold, and Items acquired through battle rewards into one
 *   battle screen.
 * * EXP gauges for currently active battle party will be displayed on the same
 *   screen to indicate progress.
 * * Upon leveling up, individual screens can be shown (optionally) to display
 *   parameter changes, new skills acquired, and level up quotes.
 * * Plugin Commands can be used to clear/add new quotes at any time.
 * * Plugin Commands can be used by bypass certain parts of the Victory
 *   Aftermath segments or the entire thing completely.
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
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_0_CoreEngine
 *
 * - The EXP gauge colors will match the color settings found in the Core
 * Engine's Plugin Parameters instead of defaulting to specific colors.
 *
 * - The continue message will display any changed input keys designated by
 * the Core Engine's Plugin Parameters.
 *
 * ---
 *
 * VisuMZ_1_MainMenuCore
 *
 * - Upon leveling up, the Menu Image will show up (optional) as a bust during
 * the quote segment.
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
 * <Level Up Quotes>
 *  text
 *  text
 *  text
 *  text
 *  <New Quote>
 *  text
 *  text
 *  text
 *  text
 *  <New Quote>
 *  text
 *  text
 *  text
 *  text
 * </Level Up Quotes>
 *
 * - Used for: Actor Notetags
 * - Description
 * - Replace 'text' with the text you'd want the actor to say when leveling up.
 * - The <New Quote> tag is used between the <Level Up Quotes> notetags to
 *   separate quotes.
 * - If an actor has multiple quotes (due to the <New Quote> notetag), then a
 *   random quote will be selected upon level up.
 * - If this notetag is not found inside an actor's notebox, a random level up
 *   quote will be selected from the Plugin Parameters => Level Up => Quotes =>
 *   Level Up Quotes plugin parameter.
 *
 * ---
 *
 * <New Skill Quotes>
 *  text
 *  text
 *  text
 *  text
 *  <New Quote>
 *  text
 *  text
 *  text
 *  text
 *  <New Quote>
 *  text
 *  text
 *  text
 *  text
 * </New Skill Quotes>
 *
 * - Used for: Actor Notetags
 * - Description
 * - Replace 'text' with the text you'd want the actor to say when leveling up
 *   in addition to learning a new skill upon leveling up.
 * - The <New Quote> tag is used between the <New Skill Quotes> notetags to
 *   separate quotes.
 * - If an actor has multiple quotes (due to the <New Quote> notetag), then a
 *   random quote will be selected upon level up and learning a new skill.
 * - If this notetag is not found inside an actor's notebox, a random new skill
 *   quote will be selected from the Plugin Parameters => Level Up => Quotes =>
 *   New Skill Quotes plugin parameter.
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
 * Actor: Add Level Up Quotes
 * - Add new entries target actor's level up quotes.
 *
 *   Actor ID:
 *   - Select ID of target actor to add quotes for.
 *
 *   New Quotes:
 *   - Add new entries to actor's level up quotes.
 *   - Text codes allowed. %1 - Actor's Name
 *
 * ---
 *
 * Actor: Add New Skill Quotes
 * - Add new entries target actor's new skill quotes.
 *
 *   Actor ID:
 *   - Select ID of target actor to add quotes for.
 *
 *   New Quotes:
 *   - Add new entries to actor's new skill quotes.
 *   - Text codes allowed. %1 - Actor's Name
 *
 * ---
 *
 * Actor: Clear Level Up Quotes
 * - Clear target actor's level up quotes.
 *
 *   Actor ID:
 *   - Select ID of target actor to clear quotes for.
 *
 * ---
 *
 * Actor: Clear New Skill Quotes
 * - Clear target actor's new skill quotes.
 *
 *   Actor ID:
 *   - Select ID of target actor to clear quotes for.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Bypass Victory Motion
 * - Bypass actors performing their victory motion?
 *
 *   Bypass?:
 *   - Bypass actors performing their victory motion?
 *
 * ---
 *
 * System: Bypass Victory Music
 * - Bypass playing the victory music?
 *
 *   Bypass?:
 *   - Bypass playing the victory music?
 *
 * ---
 *
 * System: Bypass Victory Phase
 * - Bypass the entire victory phase and all aspects about it?
 *
 *   Bypass?:
 *   - Bypass the entire victory phase and all aspects about it?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * The general settings Plugin Parameters control the overall settings found
 * within the main aspects of the Victory Aftermath sequence.
 *
 * ---
 *
 * General Settings
 * 
 *   Fade In Speed:
 *   - Fade in speed for the victory window.
 * 
 *   Hide Delay (MS):
 *   - Delay in milliseconds before hiding the UI Windows.
 * 
 *   Show Delay (MS):
 *   - Delay in milliseconds before showing the Victory Windows.
 * 
 *   Update Duration:
 *   - Duration in frames on updating actor EXP gauges.
 * 
 *   Auto Skip Auto Battle?:
 *   - Skip the Victory Aftermath sequence if the player has decided to use
 *     the party Auto Battle command?
 * 
 *   Mirror Contents?:
 *   - Mirror the positions of EXP, Gold, and Items?
 * 
 *   Show EXP Gauges?:
 *   - Show the EXP Gauges of the main party members for the first screen of
 *     the Victory Aftermath?
 *   - This is added for those with large parties and cannot fit everything
 *     into one screen for all party members and would prefer not showing any
 *     EXP Gauges at all instead.
 *
 * ---
 * 
 * Collapse Effect
 * 
 *   Normal Collapse Wait?:
 *   - Wait for the normal collapse effect to finish?
 * 
 *   Boss Collapse Wait?:
 *   - Wait for the boss collapse effect to finish?
 * 
 * ---
 * 
 * Victory Music
 * 
 *   Victory BGM:
 *   - Background music to play during the victory sequence.
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
 * ============================================================================
 * Plugin Parameters: Reward Strips Settings
 * ============================================================================
 *
 * Reward strip settings that appear in the first screen of the Victory
 * Aftermath. These are used to let you have control over what rewards are
 * displayed at the end of each battle and can be used to display custom data
 * from other plugins as well.
 *
 * ---
 *
 * Reward Strip
 * 
 *   Label:
 *   - This one doesn't have any use other than being a label to  quickly
 *     determine what this one is for.
 * 
 *   JS: Show:
 *   - Code used to determine if the reward strip is shown.
 * 
 *   JS: Text:
 *   - Code used to determine if the text displayed as the category.
 * 
 *   JS: Data:
 *   - Code used to determine what data should be displayed in the
 *     reward strip.
 *
 * ---
 * 
 * The default parameters for this will be updated from time to time as more
 * VisuStella MZ plugins are released to add in extra displayed resources that
 * the party can gain from battle.
 *
 * ============================================================================
 * Plugin Parameters: Level Up Settings
 * ============================================================================
 *
 * When actors level up, extra screens will be displayed in the Victory
 * Aftermath sequence. Alter these settings to best fit your game.
 *
 * ---
 *
 * General
 * 
 *   Enable?:
 *   - Enable the Level Up portion of the Victory Aftermath phase?
 * 
 *   Show Face?:
 *   - Show the actor's face?
 * 
 *   Show Param Change?:
 *   - Show an extra column for parameter value differences?
 * 
 *     Hide Level?:
 *     - Hide the level change in the parameter value differences?
 * 
 *   Shown Max Skills:
 *   - The maximum amount of skills that are displayed.
 *   - This is due to limited screen space.
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
 * Quotes
 * 
 *   Level Up Quotes:
 *   - A list of generic level up quotes for those who don't have the
 *     <Level Up Quote> notetags.
 *   - %1 - Actor Name
 * 
 *   New Skill Quotes:
 *   - A list of generic level up quotes for those who don't have the
 *     <New Skill Quote> notetags.
 *   - %1 - Actor Name
 *
 * ---
 *
 * VisuMZ_1_MainMenuCore
 * - The following Plugin Parameters require VisuMZ_1_MainMenuCore.
 * 
 *   Show Bust?:
 *   - Show the actor's menu image as a bust?
 * 
 *   Bust Position X:
 *   - Positon to center the actor's menu image bust.
 *   - You may use JavaScript code.
 * 
 *   Bust Position Y:
 *   - Positon to anchor the actor's menu image bust.
 *   - You may use JavaScript code.
 * 
 *   Bust Scale:
 *   - The amount to scale the actor's menu image bust.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Vocabulary Settings
 * ============================================================================
 *
 * There's certain diction used in the Victory Aftermath plugin that's not set
 * anywhere else in the game. Change the settings to make it fit your game.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Continue Format:
 *   - Text format for continue message.
 *   - %1 - OK key, %2 - Cancel key
 * 
 *   OK Button:
 *   - Text used to represent the OK button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Cancel Button:
 *   - Text used to represent the Cancel button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Level Format:
 *   - Text format for actor level.
 *   - %1 - Level
 * 
 *   Level Up:
 *   - Text format for reaching a level up.
 * 
 *   Sound Effect:
 *   - Sound effect played when a level up occurs.
 * 
 *     Volume:
 *     - Volume of the sound effect played.
 * 
 *     Pitch:
 *     - Pitch of the sound effect played.
 * 
 *     Pan:
 *     - Pan of the sound effect played.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors
 *     from the Window Skin.
 * 
 *   New Skill Format:
 *   - Text format describing that a new skill has been learned.
 *   - %1 - Actor Name
 * 
 *   Reward Items:
 *   - Text displayed for items rewarded.
 * 
 *   Victory Title:
 *   - Text displayed at the top of the victory screen.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.17: December 15, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: January 6, 2022
 * * Bug Fixes!
 * ** Fixed incorrect level change display text. Fix made by Olivia.
 * 
 * Version 1.15: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** Battle Core's post-battle common events should now load properly. This
 *     incompatibility is due to RPG Maker MZ 1.4.0's core scripts added in
 *     a common event queue clear. Update made by Olivia.
 * 
 * Version 1.14: December 9, 2021
 * * Feature Update!
 * ** Victory Aftermath gauges now automatically round to the nearest pixel
 *    rather than be on half pixels with specific resolutions. Update by Irina.
 * 
 * Version 1.13: September 23, 2021
 * * Bug Fixes!
 * ** Values for parameter differences should no longer be hidden or the same
 *    as the previous values. Fix made by Irina.
 * 
 * Version 1.12: August 27, 2021
 * * Bug Fixes!
 * ** X-Parameters and S-Parameters shown in the level up stat changes should
 *    now display the percentage signs properly. Fix made by Olivia.
 * 
 * Version 1.11: July 9, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.10: March 12, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia!
 * *** Plugin Parameters > General > Show EXP Gauges?
 * **** Show the EXP Gauges of the main party members for the first screen of
 *      the Victory Aftermath?
 * **** This is added for those with large parties and cannot fit everything
 *      into one screen for all party members and would prefer not showing any
 *      EXP Gauges at all instead.
 * 
 * Version 1.09: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu!
 * *** Plugin Parameters > Vocab > Level Up > Volume
 * *** Plugin Parameters > Vocab > Level Up > Pitch
 * *** Plugin Parameters > Vocab > Level Up > Pan
 * **** For the people who want more control over the level up sound effect.
 * 
 * Version 1.08: December 11, 2020
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Feature Updates!
 * ** The default Plugin Parameter for "Reward Strips" have been updated to
 *    contain compatibility for a future plugin.
 * 
 * Version 1.07: December 4, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Plugin Parameter added by Olivia:
 * ** Plugin Parameters > Level Up Settings > Hide Level?
 * *** Hide the level change in the parameter value differences when comparing
 *     the stat changes from the previous level to the next.
 * 
 * Version 1.06: November 29, 2020
 * * Bug Fixed!
 * ** The default reward strips Plugin Parameters data is now updated for the
 *    SP display costs to show the Skill Points data instead of Ability Points
 *    data. Fix made by Arisu.
 * 
 * Version 1.05: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New plugin parameter added by Arisu.
 * *** Plugin Parameters > Reward Strips
 * **** Reward strip settings that appear in the first screen of the Victory
 *      Aftermath. These are used to let you have control over what rewards are
 *      displayed at the end of each battle and can be used to display custom
 *      data from other plugins as well.
 * 
 * Version 1.04: October 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New plugin parameter added by Olivia.
 * *** Plugin Parameters > General > Mirror Contents?
 * **** Mirror the positions of EXP, Gold, and Items?
 * 
 * Version 1.03: October 18, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** BGM pitch plugin parameter is now uncapped.
 * * New Features!
 * ** New plugin parameters added by Yanfly.
 * *** Plugin Parameters > General > Collapse Effect > Normal Collapse Wait?
 * *** Plugin Parameters > General > Collapse Effect > Boss Collapse Wait?
 * **** These settings enable you to decide if you want the Victory Aftermath
 *      to wait until collapse effects are finished before continuing.
 * *** Plugin Parameters > General > Music > Volume
 * *** Plugin Parameters > General > Music > Pitch
 * *** Plugin Parameters > General > Music > Pan
 * **** Adjusts the volume, pitch, and pan of the victory music.
 * 
 * Version 1.02: September 13, 2020
 * * Feature Update!
 * ** Victory Aftermath windows now wait until all boss collapse effects are
 *    done before showing. Update added by Olivia.
 * * New Features!
 * ** New Plugin Parameter under General Settings: Auto Skip Auto Battle?
 * *** Skip the Victory Aftermath sequence if the player has decided to use the
 *     party Auto Battle command?
 * *** Feature added by Olivia
 * 
 * Version 1.01: September 6, 2020
 * * New Features!
 * ** New Plugin Parameters added in Level Up Settings for disabling
 *    the back rectangles and/or changing their colors.
 *
 * Version 1.00: August 26, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorQuotesLevelUpAdd
 * @text Actor: Add Level Up Quotes
 * @desc Add new entries target actor's level up quotes.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select ID of target actor to add quotes for.
 * @default 1
 *
 * @arg NewQuotes:arrayjson
 * @text New Quotes
 * @type note[]
 * @desc Add new entries to actor's level up quotes.
 * Text codes allowed. %1 - Actor's Name
 * @default ["\"\\\\c[6]%1\\\\c[0]\\n\\\"Text\\\"\""]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorQuotesNewSkillAdd
 * @text Actor: Add New Skill Quotes
 * @desc Add new entries target actor's new skill quotes.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select ID of target actor to add quotes for.
 * @default 1
 *
 * @arg NewQuotes:arrayjson
 * @text New Quotes
 * @type note[]
 * @desc Add new entries to actor's new skill quotes.
 * Text codes allowed. %1 - Actor's Name
 * @default ["\"\\\\c[6]%1\\\\c[0]\\n\\\"Text\\\"\""]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorQuotesLevelUpClear
 * @text Actor: Clear Level Up Quotes
 * @desc Clear target actor's level up quotes.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select ID of target actor to clear quotes for.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorQuotesNewSkillClear
 * @text Actor: Clear New Skill Quotes
 * @desc Clear target actor's new skill quotes.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select ID of target actor to clear quotes for.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemBypassVictoryMotion
 * @text System: Bypass Victory Motion
 * @desc Bypass actors performing their victory motion?
 *
 * @arg Bypass:eval
 * @text Bypass?
 * @type boolean
 * @on Bypass
 * @off Normal
 * @desc Bypass actors performing their victory motion?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemBypassVictoryMusic
 * @text System: Bypass Victory Music
 * @desc Bypass playing the victory music?
 *
 * @arg Bypass:eval
 * @text Bypass?
 * @type boolean
 * @on Bypass
 * @off Normal
 * @desc Bypass playing the victory music?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemBypassVictoryPhase
 * @text System: Bypass Victory Phase
 * @desc Bypass the entire victory phase and all aspects about it?
 *
 * @arg Bypass:eval
 * @text Bypass?
 * @type boolean
 * @on Bypass
 * @off Normal
 * @desc Bypass the entire victory phase and all aspects about it?
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
 * @param VictoryAftermath
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
 * @text General Settings
 * @type struct<General>
 * @desc General settings pertaining to the Victory Aftermath phase.
 * @default {"General":"","FadeInSpeed:num":"8","HideDelayMS:num":"1500","ShowDelayMS:num":"2000","UpdateDuration:num":"180","AutoBattleAutoSkip:eval":"true","MirrorContents:eval":"false","Collapse":"","WaitRegularCollapse:eval":"true","WaitBossCollapse:eval":"true","Music":"","Bgm:str":"Ship3","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @param Rewards:arraystruct
 * @text Reward Strips
 * @parent General:struct
 * @type struct<Rewards>[]
 * @desc Reward strip settings that appear in the first screen of the Victory Aftermath.
 * @default ["{\"Label\":\"EXP\",\"Show:func\":\"\\\"return true;\\\"\",\"Text:func\":\"\\\"return TextManager.exp;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.exp;\\\"\"}","{\"Label\":\"Gold\",\"Show:func\":\"\\\"return true;\\\"\",\"Text:func\":\"\\\"return TextManager.currencyUnit;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.gold;\\\"\"}","{\"Label\":\"AP (Skill Learn System)\",\"Show:func\":\"\\\"return Imported.VisuMZ_2_SkillLearnSystem &&\\\\n    VisuMZ.SkillLearnSystem.Settings.AbilityPoints.ShowVictory;\\\"\",\"Text:func\":\"\\\"return TextManager.abilityPointsAbbr;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.abilityPoints;\\\"\"}","{\"Label\":\"CP (Class Change System)\",\"Show:func\":\"\\\"return Imported.VisuMZ_2_ClassChangeSystem &&\\\\n    VisuMZ.ClassChangeSystem.Settings.ClassPoints.ShowVictory;\\\"\",\"Text:func\":\"\\\"return TextManager.classPointsAbbr;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.classPoints;\\\"\"}","{\"Label\":\"JP (Class Change System)\",\"Show:func\":\"\\\"return Imported.VisuMZ_2_ClassChangeSystem &&\\\\n    VisuMZ.ClassChangeSystem.Settings.JobPoints.ShowVictory;\\\"\",\"Text:func\":\"\\\"return TextManager.jobPointsAbbr;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.jobPoints;\\\"\"}","{\"Label\":\"SP (Skill Learn System)\",\"Show:func\":\"\\\"return Imported.VisuMZ_2_SkillLearnSystem &&\\\\n    VisuMZ.SkillLearnSystem.Settings.SkillPoints.ShowVictory;\\\"\",\"Text:func\":\"\\\"return TextManager.skillPointsAbbr;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.skillPoints;\\\"\"}"]
 *
 * @param LevelUp:struct
 * @text Level Up Settings
 * @type struct<LevelUp>
 * @desc Settings pertaining to the Level Up portion of the Victory Aftermath phase.
 * @default {"General":"","Enable:eval":"true","ShowFace:eval":"false","ShowParamDiff:eval":"true","HideLevelDiff:eval":"false","MaxSkills:num":"8","DelayBuffer:num":"200","DrawBackRect:eval":"true","BackRectColor:str":"19","Quotes":"","LevelUpQuotes:arrayjson":"[\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"Alright! A level up!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"Yes! I've leveled up!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"Oh? I've leveled up!?\\\\n This is awesome!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"Looks like I've become stronger!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"I feel like I'm getting used to battle.\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"The power! I can feel it!\\\\\\\"\\\"\"]","NewSkillQuotes:arrayjson":"[\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"Looks like I've acquired a new skill!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"This new skill should come in handy.\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"It seems I've learned something new!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"I've acquired a new power!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"This should be useful for future battles.\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"I wonder what this new skill is like?\\\\\\\"\\\"\"]","MainMenuCore":"","ShowBust:eval":"true","BustPosX:str":"Graphics.width * 0.25","BustPosY:str":"Graphics.height","BustScale:num":"1.20"}
 *
 * @param Vocab:struct
 * @text Vocabulary
 * @type struct<Vocab>
 * @desc The vocabulary used for this plugin and related settings.
 * @default {"ContinueFmt:str":"Press %1 or %2 to continue","KeyOK:str":"OK","KeyCancel:str":"Cancel","LvFmt:str":"LV %1","LvUp:str":"LEVEL UP!","LvUpSfx:str":"Up4","LvUpVolume:num":"90","LvUpPitch:num":"100","LvUpPan:num":"0","LvUpColor:str":"17","NewSkill:str":"%1 has learned:","RewardItems:str":"Items Obtained","Victory:str":"Victory!"}
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
 * @param FadeInSpeed:num
 * @text Fade In Speed
 * @parent General
 * @desc Fade in speed for the victory window.
 * @default 8
 *
 * @param HideDelayMS:num
 * @text Hide Delay (MS)
 * @parent General
 * @desc Delay in milliseconds before hiding the UI Windows.
 * @default 1500
 *
 * @param ShowDelayMS:num
 * @text Show Delay (MS)
 * @parent General
 * @desc Delay in milliseconds before showing the Victory Windows.
 * @default 2000
 *
 * @param UpdateDuration:num
 * @text Update Duration
 * @parent General
 * @desc Duration in frames on updating actor EXP gauges.
 * @default 180
 *
 * @param AutoBattleAutoSkip:eval
 * @text Skip Auto Battle?
 * @parent General
 * @type boolean
 * @on Skip
 * @off Don't Skip
 * @desc Skip the Victory Aftermath sequence if the player has
 * decided to use the party Auto Battle command?
 * @default true
 *
 * @param MirrorContents:eval
 * @text Mirror Contents?
 * @parent General
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the positions of EXP, Gold, and Items?
 * @default false
 *
 * @param ShowExpGauges:eval
 * @text Show EXP Gauges?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the EXP Gauges of the main party members
 * for the first screen of the Victory Aftermath?
 * @default true
 * 
 * @param Collapse
 * @text Collapse Effect
 *
 * @param WaitRegularCollapse:eval
 * @text Normal Collapse Wait?
 * @parent Collapse
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait for the normal collapse effect to finish?
 * @default true
 *
 * @param WaitBossCollapse:eval
 * @text Boss Collapse Wait?
 * @parent Collapse
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait for the boss collapse effect to finish?
 * @default true
 * 
 * @param Music
 * @text Victory Music
 *
 * @param Bgm:str
 * @text Victory BGM
 * @parent Music
 * @type file
 * @dir audio/bgm/
 * @desc Background music to play during the victory sequence.
 * @default Ship3
 *
 * @param volume:num
 * @text Volume
 * @parent Music
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param pitch:num
 * @text Pitch
 * @parent Music
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param pan:num
 * @text Pan
 * @parent Music
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Rewards Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Rewards:
 *
 * @param Label
 * @desc This one doesn't have any use other than being a label to 
 * quickly determine what this one is for.
 * @default Untitled
 *
 * @param Show:func
 * @text JS: Show
 * @type note
 * @desc Code used to determine if the reward strip is shown.
 * @default "return true;"
 *
 * @param Text:func
 * @text JS: Text
 * @type note
 * @desc Code used to determine if the text displayed as the category.
 * @default "return 'Untitled';"
 *
 * @param Data:func
 * @text JS: Data
 * @type note
 * @desc Code used to determine what data should be displayed in the reward strip.
 * @default "return 0;"
 *
 */
/* ----------------------------------------------------------------------------
 * Level Up Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LevelUp:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the Level Up portion of the Victory Aftermath phase?
 * @default true
 *
 * @param ShowFace:eval
 * @text Show Face?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the actor's face?
 * @default false
 *
 * @param ShowParamDiff:eval
 * @text Show Param Change?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show an extra column for parameter value differences?
 * @default true
 *
 * @param HideLevelDiff:eval
 * @text Hide Level?
 * @parent ShowParamDiff:eval
 * @type boolean
 * @on Hide
 * @off Normal
 * @desc Hide the level change in the parameter value differences?
 * @default false
 *
 * @param MaxSkills:num
 * @text Shown Max Skills
 * @parent General
 * @desc The maximum amount of skills that are displayed.
 * This is due to limited screen space.
 * @default 8
 *
 * @param DelayBuffer:num
 * @text Delay Buffer
 * @parent General
 * @type number
 * @desc How many milliseconds to wait in between playing
 * each level up sound effect?
 * @default 200
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
 * @param Quotes
 *
 * @param LevelUpQuotes:arrayjson
 * @text Level Up Quotes
 * @parent Quotes
 * @type note[]
 * @desc A list of generic level up quotes for those who don't
 * have the <Level Up Quote> notetags. %1 - Actor Name
 * @default ["\"\\\\c[6]%1\\\\c[0]\\n\\\"Alright! A level up!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"Yes! I've leveled up!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"Oh? I've leveled up!?\\n This is awesome!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"Looks like I've become stronger!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"I feel like I'm getting used to battle.\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"The power! I can feel it!\\\"\""]
 *
 * @param NewSkillQuotes:arrayjson
 * @text New Skill Quotes
 * @parent Quotes
 * @type note[]
 * @desc A list of generic level up quotes for those who don't
 * have the <New Skill Quote> notetags. %1 - Actor Name
 * @default ["\"\\\\c[6]%1\\\\c[0]\\n\\\"Looks like I've acquired a new skill!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"This new skill should come in handy.\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"It seems I've learned something new!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"I've acquired a new power!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"This should be useful for future battles.\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"I wonder what this new skill is like?\\\"\""]
 *
 * @param MainMenuCore
 * @text VisuMZ_1_MainMenuCore
 *
 * @param ShowBust:eval
 * @text Show Bust?
 * @parent MainMenuCore
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the actor's menu image as a bust?
 * @default true
 *
 * @param BustPosX:str
 * @text Bust Position X
 * @parent MainMenuCore
 * @desc Positon to center the actor's menu image bust.
 * You may use JavaScript code.
 * @default Graphics.width * 0.25
 *
 * @param BustPosY:str
 * @text Bust Position Y
 * @parent MainMenuCore
 * @desc Positon to anchor the actor's menu image bust.
 * You may use JavaScript code.
 * @default Graphics.height
 *
 * @param BustScale:num
 * @text Bust Scale
 * @parent MainMenuCore
 * @desc The amount to scale the actor's menu image bust.
 * @default 1.20
 *
 */
/* ----------------------------------------------------------------------------
 * Vocabulary Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Vocab:
 *
 * @param ContinueFmt:str
 * @text Continue Format
 * @desc Text format for continue message.
 * %1 - OK key, %2 - Cancel key
 * @default Press %1 or %2 to continue
 *
 * @param KeyOK:str
 * @text OK Button
 * @parent ContinueFmt:str
 * @desc Text used to represent the OK button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default OK
 *
 * @param KeyCancel:str
 * @text Cancel Button
 * @parent ContinueFmt:str
 * @desc Text used to represent the Cancel button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default Cancel
 *
 * @param LvFmt:str
 * @text Level Format
 * @desc Text format for actor level.
 * %1 - Level
 * @default LV %1
 *
 * @param LvUp:str
 * @text Level Up
 * @desc Text format for reaching a level up.
 * @default LEVEL UP!
 *
 * @param LvUpSfx:str
 * @text Sound Effect
 * @parent LvUp:str
 * @type file
 * @dir audio/se/
 * @desc Sound effect played when a level up occurs.
 * @default Up4
 *
 * @param LvUpVolume:num
 * @text Volume
 * @parent LvUpSfx:str
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param LvUpPitch:num
 * @text Pitch
 * @parent LvUpSfx:str
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param LvUpPan:num
 * @text Pan
 * @parent LvUpSfx:str
 * @desc Pan of the sound effect played.
 * @default 0
 *
 * @param LvUpColor:str
 * @text Text Color
 * @parent LvUp:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param NewSkill:str
 * @text New Skill Format
 * @desc Text format describing that a new skill has been learned.
 * %1 - Actor Name
 * @default %1 has learned:
 *
 * @param RewardItems:str
 * @text Reward Items
 * @desc Text displayed for items rewarded.
 * @default Items Obtained
 *
 * @param Victory:str
 * @text Victory Title
 * @desc Text displayed at the top of the victory screen.
 * @default Victory!
 *
 */
//=============================================================================

const _0x4b7043=_0x43df;(function(_0xdd9d1e,_0x2bd321){const _0xd04715=_0x43df,_0xf3efa3=_0xdd9d1e();while(!![]){try{const _0x178ab3=-parseInt(_0xd04715(0x276))/0x1*(-parseInt(_0xd04715(0xec))/0x2)+-parseInt(_0xd04715(0x275))/0x3*(-parseInt(_0xd04715(0x1dc))/0x4)+parseInt(_0xd04715(0xda))/0x5+parseInt(_0xd04715(0x114))/0x6+parseInt(_0xd04715(0xb6))/0x7*(parseInt(_0xd04715(0x18b))/0x8)+parseInt(_0xd04715(0x203))/0x9+-parseInt(_0xd04715(0x200))/0xa*(parseInt(_0xd04715(0x18c))/0xb);if(_0x178ab3===_0x2bd321)break;else _0xf3efa3['push'](_0xf3efa3['shift']());}catch(_0x16d281){_0xf3efa3['push'](_0xf3efa3['shift']());}}}(_0x46dd,0x43713));var label='VictoryAftermath',tier=tier||0x0,dependencies=['VisuMZ_1_BattleCore'],pluginData=$plugins['filter'](function(_0x438b8e){const _0x34c7f4=_0x43df;return _0x438b8e[_0x34c7f4(0xf7)]&&_0x438b8e[_0x34c7f4(0x24c)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x4b7043(0x187)]=VisuMZ[label][_0x4b7043(0x187)]||{},VisuMZ[_0x4b7043(0x24a)]=function(_0x2f32b5,_0x14f536){const _0x1c1b29=_0x4b7043;for(const _0x4b4fea in _0x14f536){if(_0x1c1b29(0x202)==='EGbjR')this[_0x1c1b29(0x100)](...arguments);else{if(_0x4b4fea[_0x1c1b29(0x280)](/(.*):(.*)/i)){const _0x312715=String(RegExp['$1']),_0x3b7f50=String(RegExp['$2'])[_0x1c1b29(0x18a)]()[_0x1c1b29(0x1a3)]();let _0x5caf32,_0x18bc9f,_0x1c3e5e;switch(_0x3b7f50){case'NUM':_0x5caf32=_0x14f536[_0x4b4fea]!==''?Number(_0x14f536[_0x4b4fea]):0x0;break;case'ARRAYNUM':_0x18bc9f=_0x14f536[_0x4b4fea]!==''?JSON[_0x1c1b29(0xb5)](_0x14f536[_0x4b4fea]):[],_0x5caf32=_0x18bc9f[_0x1c1b29(0x10f)](_0x13250b=>Number(_0x13250b));break;case _0x1c1b29(0xf5):_0x5caf32=_0x14f536[_0x4b4fea]!==''?eval(_0x14f536[_0x4b4fea]):null;break;case _0x1c1b29(0xe6):_0x18bc9f=_0x14f536[_0x4b4fea]!==''?JSON[_0x1c1b29(0xb5)](_0x14f536[_0x4b4fea]):[],_0x5caf32=_0x18bc9f[_0x1c1b29(0x10f)](_0x2e3ba0=>eval(_0x2e3ba0));break;case _0x1c1b29(0xba):_0x5caf32=_0x14f536[_0x4b4fea]!==''?JSON[_0x1c1b29(0xb5)](_0x14f536[_0x4b4fea]):'';break;case _0x1c1b29(0x1b9):_0x18bc9f=_0x14f536[_0x4b4fea]!==''?JSON[_0x1c1b29(0xb5)](_0x14f536[_0x4b4fea]):[],_0x5caf32=_0x18bc9f[_0x1c1b29(0x10f)](_0x4444d5=>JSON[_0x1c1b29(0xb5)](_0x4444d5));break;case _0x1c1b29(0x154):_0x5caf32=_0x14f536[_0x4b4fea]!==''?new Function(JSON[_0x1c1b29(0xb5)](_0x14f536[_0x4b4fea])):new Function(_0x1c1b29(0x1f8));break;case _0x1c1b29(0x1b3):_0x18bc9f=_0x14f536[_0x4b4fea]!==''?JSON['parse'](_0x14f536[_0x4b4fea]):[],_0x5caf32=_0x18bc9f['map'](_0x155e85=>new Function(JSON['parse'](_0x155e85)));break;case'STR':_0x5caf32=_0x14f536[_0x4b4fea]!==''?String(_0x14f536[_0x4b4fea]):'';break;case _0x1c1b29(0xf6):_0x18bc9f=_0x14f536[_0x4b4fea]!==''?JSON['parse'](_0x14f536[_0x4b4fea]):[],_0x5caf32=_0x18bc9f[_0x1c1b29(0x10f)](_0x1dc3d7=>String(_0x1dc3d7));break;case'STRUCT':_0x1c3e5e=_0x14f536[_0x4b4fea]!==''?JSON[_0x1c1b29(0xb5)](_0x14f536[_0x4b4fea]):{},_0x5caf32=VisuMZ[_0x1c1b29(0x24a)]({},_0x1c3e5e);break;case _0x1c1b29(0x1f2):_0x18bc9f=_0x14f536[_0x4b4fea]!==''?JSON[_0x1c1b29(0xb5)](_0x14f536[_0x4b4fea]):[],_0x5caf32=_0x18bc9f[_0x1c1b29(0x10f)](_0x18757a=>VisuMZ[_0x1c1b29(0x24a)]({},JSON[_0x1c1b29(0xb5)](_0x18757a)));break;default:continue;}_0x2f32b5[_0x312715]=_0x5caf32;}}}return _0x2f32b5;},(_0x1dae8a=>{const _0x11a0af=_0x4b7043,_0x59ed48=_0x1dae8a[_0x11a0af(0xf3)];for(const _0xdbc5c2 of dependencies){if(_0x11a0af(0x1ef)===_0x11a0af(0x1ef)){if(!Imported[_0xdbc5c2]){if(_0x11a0af(0x189)!==_0x11a0af(0x189)){this[_0x11a0af(0x22f)][_0x11a0af(0x1b2)](_0x11a0af(0x175),_0xdf3526,_0x481c25,_0x23d17c,_0x1750c3,_0x11a0af(0x14c));return;}else{alert(_0x11a0af(0xfd)['format'](_0x59ed48,_0xdbc5c2)),SceneManager[_0x11a0af(0x11d)]();break;}}}else this['_duration']=0x0;}const _0x42fe83=_0x1dae8a['description'];if(_0x42fe83[_0x11a0af(0x280)](/\[Version[ ](.*?)\]/i)){if('Vdajr'!==_0x11a0af(0x1d7))this[_0x11a0af(0x269)]={'bypassVictoryMusic':![],'bypassVictoryPhase':![],'bypassVictoryMotion':![]};else{const _0x426c65=Number(RegExp['$1']);if(_0x426c65!==VisuMZ[label]['version']){if('pFjGH'!==_0x11a0af(0x26c))return![];else alert(_0x11a0af(0x248)[_0x11a0af(0x103)](_0x59ed48,_0x426c65)),SceneManager['exit']();}}}if(_0x42fe83['match'](/\[Tier[ ](\d+)\]/i)){const _0xb9ca53=Number(RegExp['$1']);_0xb9ca53<tier?_0x11a0af(0x212)==='JsOhK'?this[_0x11a0af(0x1f4)](_0x11a0af(0x136)):(alert(_0x11a0af(0x147)['format'](_0x59ed48,_0xb9ca53,tier)),SceneManager['exit']()):tier=Math[_0x11a0af(0x223)](_0xb9ca53,tier);}VisuMZ[_0x11a0af(0x24a)](VisuMZ[label]['Settings'],_0x1dae8a[_0x11a0af(0x112)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x4b7043(0xf3)],_0x4b7043(0xf1),_0x2d475e=>{const _0x3a9ad5=_0x4b7043;VisuMZ[_0x3a9ad5(0x24a)](_0x2d475e,_0x2d475e);const _0x9e8c97=$gameActors[_0x3a9ad5(0x152)](_0x2d475e['ActorID']),_0x321abd=_0x2d475e['NewQuotes'];if(_0x9e8c97){if(_0x3a9ad5(0x196)!==_0x3a9ad5(0x196))return!![];else while(_0x321abd[_0x3a9ad5(0x199)]>0x0){if('TSYQH'===_0x3a9ad5(0x145))return _0x33b469=_0x386d76(_0x16a2d6),this['_colorCache']=this[_0x3a9ad5(0x220)]||{},_0x149632[_0x3a9ad5(0x280)](/#(.*)/i)?this[_0x3a9ad5(0x220)][_0x19636b]=_0x3a9ad5(0x113)[_0x3a9ad5(0x103)](_0x1628bb(_0x485c4a['$1'])):this[_0x3a9ad5(0x220)][_0x6bb407]=this['textColor'](_0x58728e(_0x341ff6)),this['_colorCache'][_0x1cb8bd];else _0x9e8c97['levelUpQuotes']()[_0x3a9ad5(0x259)](_0x321abd[_0x3a9ad5(0x169)]());}}}),PluginManager[_0x4b7043(0x1a1)](pluginData['name'],'ActorQuotesNewSkillAdd',_0x5501f0=>{const _0x376692=_0x4b7043;VisuMZ[_0x376692(0x24a)](_0x5501f0,_0x5501f0);const _0x71c7d3=$gameActors[_0x376692(0x152)](_0x5501f0['ActorID']),_0x58d7f9=_0x5501f0[_0x376692(0x207)];if(_0x71c7d3)while(_0x58d7f9[_0x376692(0x199)]>0x0){_0x376692(0x109)!==_0x376692(0x191)?_0x71c7d3[_0x376692(0x160)]()['push'](_0x58d7f9[_0x376692(0x169)]()):this[_0x376692(0x172)]=this[_0x376692(0x129)]['contentsOpacity'];}}),PluginManager[_0x4b7043(0x1a1)](pluginData[_0x4b7043(0xf3)],_0x4b7043(0x241),_0x13e2f8=>{const _0x163756=_0x4b7043;VisuMZ[_0x163756(0x24a)](_0x13e2f8,_0x13e2f8);const _0x5758b3=$gameActors['actor'](_0x13e2f8['ActorID']);if(_0x5758b3){if(_0x163756(0x22d)!==_0x163756(0x22d))_0x2ed664[_0x163756(0x1fd)][_0x163756(0xdb)][_0x163756(0x1b1)](this),this[_0x163756(0xd6)]();else while(_0x5758b3[_0x163756(0x197)]()['length']>0x0){_0x5758b3[_0x163756(0x197)]()[_0x163756(0x169)]();}}}),PluginManager[_0x4b7043(0x1a1)](pluginData[_0x4b7043(0xf3)],'ActorQuotesNewSkillClear',_0x13440f=>{const _0x54f91f=_0x4b7043;VisuMZ[_0x54f91f(0x24a)](_0x13440f,_0x13440f);const _0x1ff869=$gameActors[_0x54f91f(0x152)](_0x13440f['ActorID']);if(_0x1ff869){if('mGTPE'===_0x54f91f(0x16c))_0x260809=_0x4f7abd[_0x54f91f(0x249)];else while(_0x1ff869['newSkillQuotes']()[_0x54f91f(0x199)]>0x0){_0x1ff869[_0x54f91f(0x160)]()[_0x54f91f(0x169)]();}}}),PluginManager[_0x4b7043(0x1a1)](pluginData[_0x4b7043(0xf3)],_0x4b7043(0x28a),_0x329167=>{const _0x5a9a5c=_0x4b7043;VisuMZ[_0x5a9a5c(0x24a)](_0x329167,_0x329167),$gameSystem[_0x5a9a5c(0x131)]()[_0x5a9a5c(0x1c3)]=_0x329167[_0x5a9a5c(0x188)];}),PluginManager['registerCommand'](pluginData[_0x4b7043(0xf3)],'SystemBypassVictoryMusic',_0x147dda=>{const _0x562731=_0x4b7043;VisuMZ['ConvertParams'](_0x147dda,_0x147dda),$gameSystem[_0x562731(0x131)]()['bypassVictoryMusic']=_0x147dda['Bypass'];}),PluginManager['registerCommand'](pluginData[_0x4b7043(0xf3)],_0x4b7043(0x11e),_0xe7610d=>{const _0x3f40db=_0x4b7043;VisuMZ['ConvertParams'](_0xe7610d,_0xe7610d),$gameSystem[_0x3f40db(0x131)]()['bypassVictoryPhase']=_0xe7610d['Bypass'];}),TextManager['victoryContinueFmt']=VisuMZ[_0x4b7043(0x1fd)][_0x4b7043(0x187)][_0x4b7043(0x1c6)][_0x4b7043(0x231)],TextManager['victoryKeyOk']=VisuMZ[_0x4b7043(0x1fd)][_0x4b7043(0x187)]['Vocab'][_0x4b7043(0x286)],TextManager[_0x4b7043(0x12b)]=VisuMZ[_0x4b7043(0x1fd)][_0x4b7043(0x187)][_0x4b7043(0x1c6)]['KeyCancel'],TextManager[_0x4b7043(0x22c)]=VisuMZ[_0x4b7043(0x1fd)][_0x4b7043(0x187)]['Vocab'][_0x4b7043(0x115)],TextManager[_0x4b7043(0x27b)]=VisuMZ[_0x4b7043(0x1fd)]['Settings']['Vocab'][_0x4b7043(0x253)],TextManager[_0x4b7043(0x1d0)]=VisuMZ[_0x4b7043(0x1fd)][_0x4b7043(0x187)][_0x4b7043(0x1c6)][_0x4b7043(0x1c7)],TextManager['victoryDisplayTitle']=VisuMZ[_0x4b7043(0x1fd)][_0x4b7043(0x187)][_0x4b7043(0x1c6)][_0x4b7043(0x135)],TextManager['victoryNewSkillFmt']=VisuMZ[_0x4b7043(0x1fd)]['Settings'][_0x4b7043(0x1c6)][_0x4b7043(0x26d)],TextManager[_0x4b7043(0x1ec)]=function(_0x3999a9){const _0x1b1ca1=_0x4b7043,_0x42401b=VisuMZ[_0x1b1ca1(0x1fd)][_0x1b1ca1(0x187)][_0x1b1ca1(0x1e4)][_0x1b1ca1(0x219)];if(!_0x3999a9)return _0x42401b[Math['randomInt'](_0x42401b[_0x1b1ca1(0x199)])];if(!_0x3999a9[_0x1b1ca1(0x245)]())return _0x42401b[Math[_0x1b1ca1(0x116)](_0x42401b[_0x1b1ca1(0x199)])];const _0x19e6c7=_0x3999a9['levelUpQuotes']();if(_0x19e6c7[_0x1b1ca1(0x199)]>0x0)return _0x19e6c7[Math['randomInt'](_0x19e6c7[_0x1b1ca1(0x199)])];return _0x42401b[Math[_0x1b1ca1(0x116)](_0x42401b[_0x1b1ca1(0x199)])];},TextManager['quoteLevelSkill']=function(_0x342755){const _0xc71ab2=_0x4b7043,_0x4bb90d=VisuMZ[_0xc71ab2(0x1fd)][_0xc71ab2(0x187)][_0xc71ab2(0x1e4)][_0xc71ab2(0x21b)];if(!_0x342755)return _0x4bb90d[Math[_0xc71ab2(0x116)](_0x4bb90d['length'])];if(!_0x342755['isActor']())return _0x4bb90d[Math[_0xc71ab2(0x116)](_0x4bb90d['length'])];const _0x23f3cc=_0x342755['newSkillQuotes']();if(_0x23f3cc[_0xc71ab2(0x199)]>0x0)return _0x23f3cc[Math[_0xc71ab2(0x116)](_0x23f3cc[_0xc71ab2(0x199)])];return _0x4bb90d[Math[_0xc71ab2(0x116)](_0x4bb90d['length'])];},ColorManager[_0x4b7043(0x19e)]=function(_0x3c905f,_0x2a14c4){const _0x42d58c=_0x4b7043;_0x2a14c4=String(_0x2a14c4),this[_0x42d58c(0x220)]=this[_0x42d58c(0x220)]||{};if(_0x2a14c4[_0x42d58c(0x280)](/#(.*)/i))this[_0x42d58c(0x220)][_0x3c905f]='#%1'[_0x42d58c(0x103)](String(RegExp['$1']));else{if(_0x42d58c(0x25a)!==_0x42d58c(0x1c0))this[_0x42d58c(0x220)][_0x3c905f]=this['textColor'](Number(_0x2a14c4));else return this[_0x42d58c(0x193)]&&this['_victoryContinueWindow'][_0x42d58c(0x23a)]();}return this['_colorCache'][_0x3c905f];},ColorManager[_0x4b7043(0x1d6)]=function(_0x159c5c){const _0x2dfc94=_0x4b7043;return _0x159c5c=String(_0x159c5c),_0x159c5c[_0x2dfc94(0x280)](/#(.*)/i)?_0x2dfc94(0x113)['format'](String(RegExp['$1'])):this[_0x2dfc94(0x178)](Number(_0x159c5c));},ColorManager[_0x4b7043(0x151)]=function(){const _0x160095=_0x4b7043,_0x5495b0=_0x160095(0x1e1);this[_0x160095(0x220)]=this['_colorCache']||{};if(this[_0x160095(0x220)][_0x5495b0])return this[_0x160095(0x220)][_0x5495b0];const _0x166e80=VisuMZ[_0x160095(0x1fd)][_0x160095(0x187)][_0x160095(0x1c6)]['LvUpColor'];return this['getColorDataFromPluginParameters'](_0x5495b0,_0x166e80);},SoundManager['playVictoryLevelUpSFX']=function(){const _0x530ad9=_0x4b7043;if(this[_0x530ad9(0x165)])return;if(!this[_0x530ad9(0x17b)]){const _0x2249df=VisuMZ[_0x530ad9(0x1fd)][_0x530ad9(0x187)][_0x530ad9(0x1c6)];this[_0x530ad9(0x17b)]={'name':_0x2249df[_0x530ad9(0x238)]||'','volume':_0x2249df[_0x530ad9(0x153)]??0x5a,'pitch':_0x2249df['LvUpPitch']??0x64,'pan':_0x2249df[_0x530ad9(0x1b5)]??0x0};}this[_0x530ad9(0x17b)]['name']!==''&&(_0x530ad9(0x28d)!==_0x530ad9(0x28d)?(this[_0x530ad9(0x23d)]=_0x1bafe4['_victoryUpdateDuration'],this[_0x530ad9(0x171)]=this[_0x530ad9(0x152)]()[_0x530ad9(0x249)],this['_showLevelUp']=![]):(AudioManager[_0x530ad9(0xd5)](this['_victoryLevelUpSFX']),this[_0x530ad9(0x165)]=!![],setTimeout(this[_0x530ad9(0x184)][_0x530ad9(0x1aa)](this),0xc8)));},SoundManager[_0x4b7043(0x184)]=function(){this['_victoryLevelUpBuffer']=![];},SoundManager[_0x4b7043(0x157)]=function(){const _0x27a2e7=_0x4b7043;if(!this[_0x27a2e7(0x26a)]){if(_0x27a2e7(0x1a8)==='YBxIt'){const _0x2ac2e4=VisuMZ[_0x27a2e7(0x1fd)]['Settings'][_0x27a2e7(0x18f)];if(_0x2ac2e4[_0x27a2e7(0x13d)]===undefined)_0x2ac2e4[_0x27a2e7(0x13d)]=0x5a;if(_0x2ac2e4[_0x27a2e7(0x1f6)]===undefined)_0x2ac2e4[_0x27a2e7(0x1f6)]=0x64;if(_0x2ac2e4[_0x27a2e7(0x12c)]===undefined)_0x2ac2e4['pan']=0x0;this[_0x27a2e7(0x26a)]={'name':_0x2ac2e4['Bgm']||'','volume':_0x2ac2e4[_0x27a2e7(0x13d)]||0x0,'pitch':_0x2ac2e4['pitch']||0x0,'pan':_0x2ac2e4[_0x27a2e7(0x12c)]||0x0};}else return _0x45bc9b[_0x27a2e7(0x227)]('ok')||_0x13e65b[_0x27a2e7(0x227)](_0x27a2e7(0x28b))||_0x4fb93c['isPressed']();}this[_0x27a2e7(0x26a)]['name']!==''&&AudioManager[_0x27a2e7(0x1b0)](this[_0x27a2e7(0x26a)]);},BattleManager['_victoryUpdateDuration']=VisuMZ['VictoryAftermath']['Settings'][_0x4b7043(0x18f)][_0x4b7043(0x118)]||0x1,VisuMZ[_0x4b7043(0x1fd)][_0x4b7043(0x267)]=BattleManager[_0x4b7043(0x128)],BattleManager[_0x4b7043(0x128)]=function(){const _0x5a3033=_0x4b7043;VisuMZ[_0x5a3033(0x1fd)][_0x5a3033(0x267)][_0x5a3033(0x1b1)](this),this['_victoryPhase']=![],this[_0x5a3033(0xdf)]=-0x1,this['_autoBattleVictorySkip']=![];},VisuMZ[_0x4b7043(0x1fd)][_0x4b7043(0x1e6)]=BattleManager[_0x4b7043(0x274)],BattleManager[_0x4b7043(0x274)]=function(){const _0x3d23fb=_0x4b7043;if(this['isVictoryPhase']())return!![];else{if(_0x3d23fb(0x1ae)!==_0x3d23fb(0x1ae))this['onVictoryStepLevelUpMember'](_0x52d9c1);else return VisuMZ[_0x3d23fb(0x1fd)][_0x3d23fb(0x1e6)][_0x3d23fb(0x1b1)](this);}},BattleManager[_0x4b7043(0x1dd)]=function(){const _0x50f963=_0x4b7043;return this['_phase']===_0x50f963(0x205)&&this['_victoryPhase'];},BattleManager[_0x4b7043(0x194)]=function(){const _0x4da484=_0x4b7043;this['processBattleCoreJS'](_0x4da484(0x1a0)),this[_0x4da484(0xd2)]();},BattleManager[_0x4b7043(0xd2)]=function(){const _0x3b1fb7=_0x4b7043;this['processVictoryAftermathParty'](),this[_0x3b1fb7(0xcd)](),this[_0x3b1fb7(0x174)](),this[_0x3b1fb7(0x1f3)]();},BattleManager[_0x4b7043(0x281)]=function(){const _0x494a61=_0x4b7043;$gameParty['removeBattleStates'](),$gameParty[_0x494a61(0xd1)]();},BattleManager[_0x4b7043(0xcd)]=function(){const _0x5c8f52=_0x4b7043;if(this[_0x5c8f52(0xbb)]())return;this[_0x5c8f52(0x268)](),SoundManager[_0x5c8f52(0x157)]();},BattleManager[_0x4b7043(0xbb)]=function(){const _0x5168a3=_0x4b7043;return $gameSystem['victoryAftermathSettings']()[_0x5168a3(0x228)]||$gameSystem[_0x5168a3(0x131)]()[_0x5168a3(0x27e)];},BattleManager[_0x4b7043(0x174)]=function(){const _0x3909bb=_0x4b7043;this[_0x3909bb(0x10c)](),this[_0x3909bb(0x25d)](),this['gainRewards']();},BattleManager['makeTempActors']=function(){const _0x3d104c=_0x4b7043;this[_0x3d104c(0x163)]=$gameParty[_0x3d104c(0x132)]()[_0x3d104c(0x10f)](_0x264a14=>_0x264a14[_0x3d104c(0x1cd)]()),this[_0x3d104c(0x10e)]=JsonEx['makeDeepCopy'](this[_0x3d104c(0x163)]);},BattleManager[_0x4b7043(0x1f3)]=function(){const _0x7ef305=_0x4b7043;this[_0x7ef305(0x16d)](),this[_0x7ef305(0xfe)](0x0),this[_0x7ef305(0x282)](_0x7ef305(0x135)),this[_0x7ef305(0x237)]=!![];if(this['isBypassVictoryAftermathPhase']())this[_0x7ef305(0xfb)]();else{if('TUHCL'!==_0x7ef305(0x12e))this[_0x7ef305(0x12d)]();else{const _0x19ffb9=_0x148de6[_0x7ef305(0xb3)][_0x7ef305(0x1ad)](),_0x45ec8a=_0x177199['round'](_0x10c7d5['width']/0x2)-0x64,_0x383ccb=_0x4ce91a[_0x7ef305(0x279)](_0x6d2e6e[_0x7ef305(0x19c)]-_0x19ffb9*1.25),_0x5a66a5=_0x4a5978[_0x7ef305(0x279)](_0x436c59[_0x7ef305(0xe9)]/0x2),_0x406e43=_0x19ffb9;return new _0x5e6b92(_0x45ec8a,_0x383ccb,_0x5a66a5,_0x406e43);}}},BattleManager[_0x4b7043(0x16d)]=function(){const _0x51946b=_0x4b7043,_0x8bdc=VisuMZ['VictoryAftermath']['Settings'][_0x51946b(0x18f)];_0x8bdc[_0x51946b(0xea)]===undefined&&(_0x8bdc[_0x51946b(0xea)]=!![]);if(_0x8bdc[_0x51946b(0xea)]===!![]){if(_0x51946b(0x21c)===_0x51946b(0x167))return _0x45cad1[_0x51946b(0x138)]?_0x507251['CoreEngine'][_0x51946b(0x187)][_0x51946b(0x143)][_0x51946b(0x164)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];else this['_autoBattleVictorySkip']=this['_autoBattle'];}},BattleManager['isBypassVictoryAftermathPhase']=function(){const _0x1be694=_0x4b7043;if(this['_autoBattleVictorySkip'])return!![];return $gameSystem[_0x1be694(0x131)]()[_0x1be694(0x27e)];},BattleManager[_0x4b7043(0xfb)]=function(){const _0x38aa51=_0x4b7043,_0x1609e5=VisuMZ[_0x38aa51(0x1fd)]['Settings'][_0x38aa51(0x18f)],_0x3347b3=SceneManager[_0x38aa51(0x15c)];setTimeout(_0x3347b3[_0x38aa51(0x137)]['bind'](_0x3347b3),_0x1609e5[_0x38aa51(0x270)]);},BattleManager[_0x4b7043(0x12d)]=function(){const _0x237038=_0x4b7043,_0x40a837=VisuMZ[_0x237038(0x1fd)][_0x237038(0x187)][_0x237038(0x18f)],_0xd26650=SceneManager[_0x237038(0x15c)];this['_tempActorExpGain']=this[_0x237038(0x1fb)][_0x237038(0x117)]/(BattleManager[_0x237038(0x23c)]||0x1),Window_StatusBase[_0x237038(0xb3)][_0x237038(0x142)](),setTimeout(_0xd26650['hideWindowsForVictoryAftermath'][_0x237038(0x1aa)](_0xd26650),_0x40a837[_0x237038(0x25c)]),setTimeout(_0xd26650[_0x237038(0x150)][_0x237038(0x1aa)](_0xd26650),_0x40a837[_0x237038(0x270)]);},BattleManager[_0x4b7043(0xbc)]=function(){const _0x4f8ff0=_0x4b7043;for(;;){if('NiCfi'===_0x4f8ff0(0x1a4))this[_0x4f8ff0(0x100)](...arguments);else{this['_victoryActorIndex']++;if(this['_victoryActorIndex']>=$gameParty[_0x4f8ff0(0x1db)]())return null;const _0x15ccec=$gameParty[_0x4f8ff0(0x132)]()[this[_0x4f8ff0(0xdf)]],_0x4ab371=this[_0x4f8ff0(0x10e)][this[_0x4f8ff0(0xdf)]];if(_0x15ccec['level']!==_0x4ab371[_0x4f8ff0(0x249)])return _0x15ccec;}}return null;},VisuMZ[_0x4b7043(0x1fd)][_0x4b7043(0x1be)]=Game_System['prototype']['initialize'],Game_System[_0x4b7043(0xb3)]['initialize']=function(){const _0x1f9e41=_0x4b7043;VisuMZ['VictoryAftermath'][_0x1f9e41(0x1be)]['call'](this),this[_0x1f9e41(0x104)]();},Game_System[_0x4b7043(0xb3)][_0x4b7043(0x104)]=function(){const _0x424d33=_0x4b7043;this[_0x424d33(0x269)]={'bypassVictoryMusic':![],'bypassVictoryPhase':![],'bypassVictoryMotion':![]};},Game_System[_0x4b7043(0xb3)][_0x4b7043(0x131)]=function(){const _0x937a5a=_0x4b7043;if(this[_0x937a5a(0x269)]===undefined)this[_0x937a5a(0x104)]();return this[_0x937a5a(0x269)];},VisuMZ[_0x4b7043(0x1fd)]['Game_Actor_setup']=Game_Actor['prototype']['setup'],Game_Actor['prototype'][_0x4b7043(0xf0)]=function(_0x110827){const _0x40823f=_0x4b7043;VisuMZ[_0x40823f(0x1fd)][_0x40823f(0x278)]['call'](this,_0x110827),this[_0x40823f(0x211)]();},Game_Actor[_0x4b7043(0xb3)][_0x4b7043(0x211)]=function(){const _0x55850b=_0x4b7043;this[_0x55850b(0xdd)]=[],this[_0x55850b(0x1b6)]=[];const _0x45807a=this[_0x55850b(0x152)]()[_0x55850b(0x224)];_0x45807a[_0x55850b(0x280)](/<LEVEL UP (?:QUOTE|QUOTES)>\s*([\s\S]*)\s*<\/LEVEL UP (?:QUOTE|QUOTES)>/i)&&(this['_victoryAftermathLevelUpQuotes']=String(RegExp['$1'])['split'](/<NEW QUOTE>[\r\n]+/i));if(_0x45807a['match'](/<NEW SKILL (?:QUOTE|QUOTES)>\s*([\s\S]*)\s*<\/NEW SKILL (?:QUOTE|QUOTES)>/i)){if(_0x55850b(0x25b)!==_0x55850b(0xce))this[_0x55850b(0x1b6)]=String(RegExp['$1'])[_0x55850b(0xf4)](/<NEW QUOTE>[\r\n]+/i);else return this[_0x55850b(0x1f5)]()[_0x55850b(0x10a)](_0x55a9b2=>_0x55a9b2[_0x55850b(0x124)]());}},Game_Actor[_0x4b7043(0xb3)]['levelUpQuotes']=function(){const _0xa7d33b=_0x4b7043;if(this[_0xa7d33b(0xdd)]===undefined)this[_0xa7d33b(0x211)]();return this[_0xa7d33b(0xdd)];},Game_Actor[_0x4b7043(0xb3)]['newSkillQuotes']=function(){const _0xf6a2a1=_0x4b7043;if(this['_victoryAftermathNewSkillQuotes']===undefined)this[_0xf6a2a1(0x211)]();return this[_0xf6a2a1(0x1b6)];},Game_Actor[_0x4b7043(0xb3)][_0x4b7043(0x21a)]=function(){const _0x29654e=_0x4b7043;if(this[_0x29654e(0xe4)]())return 0x1;const _0x31e2cb=this['nextLevelExp']()-this['currentLevelExp'](),_0x66f490=this['currentExp']()-this[_0x29654e(0x234)]();return(_0x66f490/_0x31e2cb)[_0x29654e(0x1d2)](0x0,0x1);},VisuMZ[_0x4b7043(0x1fd)][_0x4b7043(0xb2)]=Game_Actor['prototype'][_0x4b7043(0x156)],Game_Actor['prototype'][_0x4b7043(0x156)]=function(){const _0x4325d2=_0x4b7043;if(SceneManager[_0x4325d2(0x24e)]()){if(_0x4325d2(0xd9)==='PNpxM')return![];else{const _0x319ec0=_0xf29b06[_0x4325d2(0x1fb)][_0x4325d2(0x148)];_0x319ec0['sort']((_0x18bf96,_0x2a484a)=>_0x18bf96['id']-_0x2a484a['id']);const _0x2a731c=_0x319ec0[_0x4325d2(0x1fc)](_0x8a2d69=>_0x527ab2['isItem'](_0x8a2d69)),_0x3a66f8=_0x319ec0[_0x4325d2(0x1fc)](_0x27ab00=>_0x2a78b9['isWeapon'](_0x27ab00)),_0xe23288=_0x319ec0[_0x4325d2(0x1fc)](_0x1d4ef5=>_0x111f9c[_0x4325d2(0xbe)](_0x1d4ef5));this[_0x4325d2(0x1cb)]=_0x2a731c[_0x4325d2(0x26e)](_0x3a66f8)[_0x4325d2(0x26e)](_0xe23288),this['_data']=this[_0x4325d2(0x1cb)][_0x4325d2(0x1fc)]((_0x34cba6,_0x9dd768,_0x267abd)=>_0x267abd['indexOf'](_0x34cba6)===_0x9dd768);}}else return VisuMZ[_0x4325d2(0x1fd)][_0x4325d2(0xb2)][_0x4325d2(0x1b1)](this);},Game_Actor['prototype'][_0x4b7043(0x1cd)]=function(){const _0x287ee0=_0x4b7043,_0x401997=JsonEx['makeDeepCopy'](this);return _0x401997[_0x287ee0(0xe1)]=!![],_0x401997;},VisuMZ[_0x4b7043(0x1fd)][_0x4b7043(0x240)]=Game_Actor[_0x4b7043(0xb3)][_0x4b7043(0x1d1)],Game_Actor[_0x4b7043(0xb3)][_0x4b7043(0x1d1)]=function(){const _0x4ccce8=_0x4b7043;if(this['_victoryAftermathCopy']){if(_0x4ccce8(0xd4)!==_0x4ccce8(0x22a))return!![];else _0x449eed[_0x4ccce8(0x1fd)]['Scene_Battle_allowUpdateBattleAniSpeed']=_0x561b34[_0x4ccce8(0xb3)][_0x4ccce8(0x273)],_0x504a3a['prototype'][_0x4ccce8(0x273)]=function(){const _0x591c82=_0x4ccce8;if(_0x4a34f3[_0x591c82(0x1dd)]())return![];return _0x30aa34[_0x591c82(0x1fd)]['Scene_Battle_allowUpdateBattleAniSpeed'][_0x591c82(0x1b1)](this);};}else return VisuMZ[_0x4ccce8(0x1fd)]['Game_Actor_isBattleMember'][_0x4ccce8(0x1b1)](this);},VisuMZ[_0x4b7043(0x1fd)][_0x4b7043(0xcc)]=Game_Actor[_0x4b7043(0xb3)][_0x4b7043(0xd1)],Game_Actor[_0x4b7043(0xb3)][_0x4b7043(0xd1)]=function(){const _0x3b58c2=_0x4b7043;if(this[_0x3b58c2(0x13c)]())this[_0x3b58c2(0x1f4)](_0x3b58c2(0x136));else{if('rQrBL'===_0x3b58c2(0x20a))VisuMZ[_0x3b58c2(0x1fd)][_0x3b58c2(0xcc)][_0x3b58c2(0x1b1)](this);else{this[_0x3b58c2(0x257)]();const _0x9454c5=this[_0x3b58c2(0x27a)]();if(_0x9454c5[_0x3b58c2(0x199)]<=0x0)return;const _0x5627ab=_0x3040bb[_0x3b58c2(0x1fd)][_0x3b58c2(0x187)][_0x3b58c2(0x1e4)][_0x3b58c2(0x14b)];while(_0x9454c5[_0x3b58c2(0x199)]>_0x5627ab){_0x9454c5[_0x3b58c2(0xc5)]();}this[_0x3b58c2(0x22e)](_0x9454c5),this[_0x3b58c2(0x23f)](_0x9454c5);}}},Game_Actor[_0x4b7043(0xb3)][_0x4b7043(0x13c)]=function(){const _0xec194a=_0x4b7043;return $gameSystem['victoryAftermathSettings']()[_0xec194a(0x1c3)]||$gameSystem[_0xec194a(0x131)]()[_0xec194a(0x27e)];},Scene_Battle['prototype'][_0x4b7043(0x106)]=function(){const _0x6636d0=_0x4b7043;if(this['_spriteset'][_0x6636d0(0x124)]())return setTimeout(this['hideWindowsForVictoryAftermath'][_0x6636d0(0x1aa)](this),0x7d0);if(!SceneManager[_0x6636d0(0x24e)]())return;this[_0x6636d0(0x289)](![]),this['closeCommandWindows'](),this[_0x6636d0(0x1ff)](),this[_0x6636d0(0x215)]['y']=Graphics[_0x6636d0(0x19c)]*0xa;},Scene_Battle[_0x4b7043(0xb3)][_0x4b7043(0x150)]=function(){const _0x4f39e2=_0x4b7043;if(this[_0x4f39e2(0x1e9)][_0x4f39e2(0x124)]()){if('AGHmN'!=='AGHmN')_0x564df7['clear'](),_0x59b727[_0x4f39e2(0x18d)](),this[_0x4f39e2(0x1b7)]();else return setTimeout(this[_0x4f39e2(0x150)][_0x4f39e2(0x1aa)](this),0x7d0);}this[_0x4f39e2(0x16e)]=[],this[_0x4f39e2(0x27d)](),this['createVictoryContinueMessageWindow'](),this['updateVictorySteps']();},Scene_Battle[_0x4b7043(0xb3)][_0x4b7043(0x27d)]=function(){const _0x434dea=_0x4b7043;this[_0x434dea(0x1fa)]=[],this[_0x434dea(0x11c)](),this['createVictoryStepLevelUps']();},Scene_Battle[_0x4b7043(0xb3)][_0x4b7043(0x11c)]=function(){const _0x2c4ff0=_0x4b7043;this['_victorySteps']['push'](_0x2c4ff0(0x119));},Scene_Battle[_0x4b7043(0xb3)]['createVictoryStepLevelUps']=function(){const _0x1078b1=_0x4b7043;if(!this[_0x1078b1(0x1c4)]())return;for(const _0x21be0c of $gameParty[_0x1078b1(0x132)]()){if(!_0x21be0c)continue;const _0x8610cc=BattleManager[_0x1078b1(0x163)][_0x21be0c[_0x1078b1(0x288)]()];_0x21be0c['level']>_0x8610cc[_0x1078b1(0x249)]&&this[_0x1078b1(0x1e7)](_0x21be0c);}},Scene_Battle[_0x4b7043(0xb3)][_0x4b7043(0x1e7)]=function(_0x17eae7){const _0x47075e=_0x4b7043;Imported[_0x47075e(0xd3)]&&Window_VictoryLevelUp[_0x47075e(0x1e8)]&&ImageManager['loadPicture'](_0x17eae7[_0x47075e(0x120)]()),this[_0x47075e(0x1fa)][_0x47075e(0x259)]('levelups');},Scene_Battle['prototype'][_0x4b7043(0x1c4)]=function(){const _0x5efeb1=_0x4b7043;return VisuMZ[_0x5efeb1(0x1fd)][_0x5efeb1(0x187)][_0x5efeb1(0x1e4)][_0x5efeb1(0x20d)];},Scene_Battle[_0x4b7043(0xb3)][_0x4b7043(0x1b7)]=function(){const _0x6e1cfb=_0x4b7043;this[_0x6e1cfb(0x159)]=this[_0x6e1cfb(0x1fa)][_0x6e1cfb(0x169)]()||'',this[_0x6e1cfb(0x17d)]();},Scene_Battle[_0x4b7043(0xb3)][_0x4b7043(0x17d)]=function(){const _0x217e62=_0x4b7043;switch(this['_victoryStep'][_0x217e62(0x18e)]()[_0x217e62(0x1a3)]()){case _0x217e62(0x119):this[_0x217e62(0x149)](),this[_0x217e62(0x193)][_0x217e62(0xde)](BattleManager[_0x217e62(0x23c)]);break;case _0x217e62(0x1d5):this[_0x217e62(0xeb)](),this['setupVictoryLevelUpNextActor'](),this['_victoryContinueWindow'][_0x217e62(0xde)](0x0);break;default:this[_0x217e62(0x137)]();break;}this[_0x217e62(0x27f)](this[_0x217e62(0x193)]);},Scene_Battle[_0x4b7043(0xb3)][_0x4b7043(0x19a)]=function(){const _0x1ff83d=_0x4b7043,_0x41c426=Window_Base[_0x1ff83d(0xb3)][_0x1ff83d(0x1ad)](),_0x212aad=Math[_0x1ff83d(0x279)](Graphics[_0x1ff83d(0xe9)]/0x2)-0x64,_0x56cacb=Math[_0x1ff83d(0x279)](Graphics[_0x1ff83d(0x19c)]-_0x41c426*1.25),_0x290363=Math[_0x1ff83d(0x279)](Graphics[_0x1ff83d(0xe9)]/0x2),_0xc0b1e0=_0x41c426;return new Rectangle(_0x212aad,_0x56cacb,_0x290363,_0xc0b1e0);},Scene_Battle[_0x4b7043(0xb3)][_0x4b7043(0x158)]=function(){const _0x227596=_0x4b7043,_0x410653=0x0,_0x3f71ff=0x0,_0x26121f=Graphics[_0x227596(0xe9)],_0x5801a9=Graphics[_0x227596(0x19c)];return new Rectangle(_0x410653,_0x3f71ff,_0x26121f,_0x5801a9);},Scene_Battle['prototype'][_0x4b7043(0x1a9)]=function(){const _0x1e1251=_0x4b7043;if(this[_0x1e1251(0x193)])return;const _0x56df5b=this[_0x1e1251(0x19a)](),_0x440e44=new Window_VictoryContinueMessage(_0x56df5b);this[_0x1e1251(0x27f)](_0x440e44),this[_0x1e1251(0x16e)][_0x1e1251(0x259)](_0x440e44),this[_0x1e1251(0x193)]=_0x440e44;},Scene_Battle['prototype']['createVictoryRewardsWindow']=function(){const _0x29ea4e=_0x4b7043;if(this[_0x29ea4e(0x1bc)])return;const _0x27a26a=this[_0x29ea4e(0x158)](),_0x35acb8=new Window_VictoryRewards(_0x27a26a);this[_0x29ea4e(0x27f)](_0x35acb8),this[_0x29ea4e(0x16e)][_0x29ea4e(0x259)](_0x35acb8),this[_0x29ea4e(0x1bc)]=_0x35acb8;},Scene_Battle[_0x4b7043(0xb3)]['createVictoryLevelUpWindow']=function(){const _0x113158=_0x4b7043;if(this[_0x113158(0x16f)])return;const _0x4916e9=this[_0x113158(0x158)](),_0x24464f=new Window_VictoryLevelUp(_0x4916e9);this[_0x113158(0x27f)](_0x24464f),this[_0x113158(0x16e)][_0x113158(0x259)](_0x24464f),this[_0x113158(0x16f)]=_0x24464f;},Scene_Battle['prototype']['setupVictoryLevelUpNextActor']=function(){const _0x4ceb86=_0x4b7043,_0x5a6893=BattleManager[_0x4ceb86(0xbc)]();this[_0x4ceb86(0x16f)]['setActor'](_0x5a6893);},Scene_Battle['prototype']['finishVictoryPhase']=function(){const _0x5cadff=_0x4b7043;BattleManager[_0x5cadff(0x14f)](),BattleManager[_0x5cadff(0x237)]=![];};function _0x46dd(){const _0xd9c371=['index','setVisibleUI','SystemBypassVictoryMotion','cancel','gaugeBackColor','RwzIP','drawCurrencyValue','Game_Actor_shouldDisplayLevelUp','prototype','MirrorContents','parse','3589390seWmiI','changeTextColor','_index','drawLevelMessage','JSON','isBypassVictoryAftermathMusic','nextVictoryLevelUpActor','getQuoteText','isArmor','param','getInputButtonString','indexOf','_fullWidth','_itemGainWindow','_actorSprite','pop','CIvNR','_tempActorExpGain','CWdYm','ritne','paramValueFontSize','actor%1-gauge','Game_Actor_performVictory','processVictoryAftermathMusic','cmgRS','expGaugeColor2','SYWTX','performVictory','processVictoryAftermath','VisuMZ_1_MainMenuCore','NPone','playSe','updateVictoryPhase','makeFontBigger','ShowFace','PNpxM','2525690dkJubT','Scene_Battle_update','isFastForwarded','_victoryAftermathLevelUpQuotes','setDelayDuration','_victoryActorIndex','bossCollapse','_victoryAftermathCopy','ClassPoints','xhIPy','isMaxLevel','paramValueByName','ARRAYEVAL','mainFontFace','levelUp','width','AutoBattleAutoSkip','createVictoryLevelUpWindow','102688vyYuVM','NmzyL','min','_subWindow','setup','ActorQuotesLevelUpAdd','itemCount','name','split','EVAL','ARRAYSTR','status','isVictoryContinueReady','BustPosY','QoL','skipVictoryAftermathTransition','XFYQs','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','endBattle','mirrorContents','initialize','_actor','RBAvA','format','initVictoryAftermath','txMEb','hideWindowsForVictoryAftermath','quoteLevelSkill','jobPointsAbbr','RfFFO','some','CqltA','makeTempActors','dimColor2','_victoryTempActorsB','map','translucentOpacity','itemPadding','parameters','#%1','1053720UoOnOe','LvFmt','randomInt','exp','UpdateDuration','rewards','drawParamChanges','isItem','createVictoryStepRewards','exit','SystemBypassVictoryPhase','FadeInSpeed','getMenuImage','ojXfj','rgba(0,\x200,\x200,\x201)','center','isCollapsing','qRysZ','contents','drawParamDiffValue','initMembers','_mainWindow','drawParamBeforeValue','victoryKeyCancel','pan','processVictoryAftermathTransition','uVQho','paintOpacity','ZWvFN','victoryAftermathSettings','battleMembers','_rewardSets','constructor','Victory','done','finishVictoryPhase','VisuMZ_0_CoreEngine','drawRewardStrip','earnedJobPoints','ShowExpGauges','isBypassVictoryAftermathMotion','volume','Reoot','normalColor','maxVisibleItems','drawParamAfterValue','loadFaceImages','Param','rgba(0,\x200,\x200,\x200.4)','hdMeX','drawNewLearnedSkills','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','items','createVictoryRewardsWindow','gainTempExp','MaxSkills','right','skills','battlerEXPStyle','replayBgmAndBgs','createVictoryAftermathWindows','victoryLevelUpColor','actor','LvUpVolume','FUNC','includes','shouldDisplayLevelUp','playVictoryBgm','victoryFullScreenWindowRect','_victoryStep','CoreEngine','setBackgroundType','_scene','VisuMZ_3_VisualGaugeStyles','currencyUnit','textSizeEx','newSkillQuotes','HCNLA','changeExp','_victoryTempActorsA','ExtDisplayedParams','_victoryLevelUpBuffer','addChildToBack','wnEBf','_showLevelUp','shift','VisuMZ_2_SkillLearnSystem','clearRect','ZKmqt','checkVictoryAftermathAutoBattleAutoSkip','_victoryWindows','_victoryLevelUpWindow','tqWqr','_currentlevel','contentsOpacity','UGgEe','processVictoryAftermathRewards','MAX\x20LEVEL','VisuMZ_1_OptionsCore','_delayDuration','textColor','QolHn','aJGmw','_victoryLevelUpSFX','drawItemGainTitle','processVictoryStep','isShowNew','updateExpGain','drawTextEx','VisuMZ_1_MessageCore','_drawParamDiff','isRepeated','removeVictoryLevelUpBuffer','_additionalSprites','setActor','Settings','Bypass','boAKX','toUpperCase','8GotpDe','2614502JOXAgK','clear','toLowerCase','General','drawPartyExpGauges','cFmUF','classPointsFull','_victoryContinueWindow','processVictory','MessageCore','dvlgk','levelUpQuotes','powerUpColor','length','victoryContinueMessageWindowRect','ActorID','height','_autoBattleVictorySkip','getColorDataFromPluginParameters','playVictoryLevelUpSFX','BattleVictoryJS','registerCommand','_opacitySpeed','trim','eqvdH','drawExpValues','fontSize','drawActorAdditionalRewards','YBxIt','createVictoryContinueMessageWindow','bind','victoryDisplayTitle','expGaugeColor1','lineHeight','AANCB','left','playBgm','call','drawText','ARRAYFUNC','ClassChangeSystem','LvUpPan','_victoryAftermathNewSkillQuotes','updateVictorySteps','drawActorName','ARRAYJSON','updateContentsOpacity','boxWidth','_victoryRewardsWindow','Template','Game_System_initialize','activate','TYfbs','Text','victoryContinueFmt','bypassVictoryMotion','isVictoryLevelUpPhaseEnabled','ItemQuantityFmt','Vocab','RewardItems','(+%1)','VisuMZ_2_ClassChangeSystem','victoryRewardBitmap','_data','victoryNameBitmap','makeVictoryCopy','earnedAbilityPoints','BackRectColor','victoryDisplayItem','isBattleMember','clamp','members','opacity','levelups','getColor','Vdajr','anchor','padding','loadPicture','maxBattleMembers','6628FxtJYi','isVictoryPhase','colSpacing','fontFace','drawCircle','victory-level-up-color','drawLevelUpQuote','rWcll','LevelUp','jobPointsFull','BattleManager_isBusy','onVictoryStepLevelUpMember','_showBust','_spriteset','AftermathActorDisplay','vSYRC','quoteLevelUp','updatePadding','getVictoryAftermathBackColor','fpgRi','drawItemNumber','drawItemBackground','ARRAYSTRUCT','prepareVictoryAftermathTransition','setActionState','battlerSprites','pitch','update','return\x200','maxCols','_victorySteps','_rewards','filter','VictoryAftermath','ShowParamDiff','hideSubInputWindows','70SKvAll','createActorSprite','OuBgE','3840399KBoiPW','drawBackgroundElements','battleEnd','drawActorLevel','NewQuotes','maxLvGaugeColor2','createGaugeSprite','rQrBL','ShowBust','placeActorGauges','Enable','JobPoints','_showFace','afterActor','setupVictoryAftermathQuotes','GkaCJ','WaitRegularCollapse','collapse','_statusWindow','updateOpacity','paramchangeTextColor','getAdditionalRewardsText','LevelUpQuotes','expRate','NewSkillQuotes','sOswq','makeItemList','drawExpGauge','earnedSkillPoints','_colorCache','BustPosX','create','max','note','AftermathText','_effectType','isPressed','bypassVictoryMusic','gradientFillRect','hAnBk','drawParamName','victoryDisplayLvFmt','PBUfo','drawNewLearnedSkillsBackground','bitmap','addInnerChild','ContinueFmt','floor','drawActorNameStrip','currentLevelExp','currentExp','actorParams','_victoryPhase','LvUpSfx','Rewards','isContinueReady','measureTextWidth','_victoryUpdateDuration','_duration','sort','drawNewLearnedSkillsList','Game_Actor_isBattleMember','ActorQuotesLevelUpClear','dZrEE','systemColor','refresh','isActor','blt','nextLevelExp','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','level','ConvertParams','DigitGroupingStandardText','description','rgba(0,\x200,\x200,\x200.8)','isSceneBattle','faceHeight','isEnabled','getQuoteWidth','QCNMo','LvUp','ItemsEquipsCore','victoryNewSkillFmt','gaugeColor1','resetFontSettings','makeItemGainWindow','push','YoJIP','himha','HideDelayMS','makeRewards','createSubWindow','beforeActor','itemHeight','ItemScene','mgsxU','drawItemDarkRect','VisuMZ_X_Template','drawRewards','fQpCN','BattleManager_initMembers','playVictoryMe','_victoryAftermathSettings','_victoryBgm','Show','pFjGH','NewSkill','concat','GroupDigits','ShowDelayMS','faceWidth','HideLevelDiff','allowUpdateBattleAniSpeed','isBusy','486DBpVYe','1BdkzvS','scale','Game_Actor_setup','round','findNewSkills','victoryDisplayLvUp','(%1)','createVictorySteps','bypassVictoryPhase','addChild','match','processVictoryAftermathParty','processPostBattleCommonEvents','finalExpRate','BustScale','Scene_Battle_allowUpdateBattleAniSpeed','KeyOK','fillRect'];_0x46dd=function(){return _0xd9c371;};return _0x46dd();}function _0x43df(_0x23083a,_0x54b491){const _0x46dd7a=_0x46dd();return _0x43df=function(_0x43df8b,_0x3ce9bd){_0x43df8b=_0x43df8b-0xb2;let _0x4d2048=_0x46dd7a[_0x43df8b];return _0x4d2048;},_0x43df(_0x23083a,_0x54b491);}Imported[_0x4b7043(0x176)]&&(VisuMZ[_0x4b7043(0x1fd)][_0x4b7043(0x285)]=Scene_Battle['prototype']['allowUpdateBattleAniSpeed'],Scene_Battle[_0x4b7043(0xb3)][_0x4b7043(0x273)]=function(){const _0x47137a=_0x4b7043;if(BattleManager['isVictoryPhase']())return![];return VisuMZ[_0x47137a(0x1fd)]['Scene_Battle_allowUpdateBattleAniSpeed'][_0x47137a(0x1b1)](this);});;Scene_Battle[_0x4b7043(0xb3)][_0x4b7043(0xf8)]=function(){const _0x100e2f=_0x4b7043;return this[_0x100e2f(0x193)]&&this[_0x100e2f(0x193)]['isContinueReady']();},VisuMZ[_0x4b7043(0x1fd)][_0x4b7043(0xdb)]=Scene_Battle[_0x4b7043(0xb3)]['update'],Scene_Battle[_0x4b7043(0xb3)][_0x4b7043(0x1f7)]=function(){const _0x10fbe9=_0x4b7043;VisuMZ[_0x10fbe9(0x1fd)][_0x10fbe9(0xdb)]['call'](this),this[_0x10fbe9(0xd6)]();},Scene_Battle[_0x4b7043(0xb3)][_0x4b7043(0xd6)]=function(){const _0x50a63b=_0x4b7043;if(!BattleManager[_0x50a63b(0x1dd)]())return;if(!this['isVictoryContinueReady']())return;(Input['isRepeated']('ok')||Input['isRepeated']('cancel')||TouchInput[_0x50a63b(0x183)]())&&(Input[_0x50a63b(0x18d)](),TouchInput[_0x50a63b(0x18d)](),this[_0x50a63b(0x1b7)]());},Sprite_Enemy['prototype'][_0x4b7043(0x124)]=function(){const _0x52e614=_0x4b7043,_0x1f96b4=VisuMZ[_0x52e614(0x1fd)][_0x52e614(0x187)]['General'];if(this[_0x52e614(0x226)]==='collapse'){if(_0x1f96b4[_0x52e614(0x213)]!==undefined){if(_0x52e614(0xc6)===_0x52e614(0xd0))this['_victoryAftermathNewSkillQuotes']=_0x535e23(_0x38a858['$1'])[_0x52e614(0xf4)](/<NEW QUOTE>[\r\n]+/i);else return _0x1f96b4['WaitRegularCollapse'];}}else{if(this[_0x52e614(0x226)]===_0x52e614(0xe0)){if(_0x52e614(0xc9)===_0x52e614(0xc9)){if(_0x1f96b4['WaitBossCollapse']!==undefined)return _0x1f96b4['WaitBossCollapse'];}else{_0x4fa54f[_0x52e614(0x24a)](_0x1d816c,_0x1190ed);const _0x2872b5=_0x16de68[_0x52e614(0x152)](_0x565c20[_0x52e614(0x19b)]),_0x347a49=_0x557020[_0x52e614(0x207)];if(_0x2872b5)while(_0x347a49['length']>0x0){_0x2872b5[_0x52e614(0x160)]()[_0x52e614(0x259)](_0x347a49[_0x52e614(0x169)]());}}}}return[_0x52e614(0x214),_0x52e614(0xe0)][_0x52e614(0x155)]();},Sprite_Battler[_0x4b7043(0xb3)][_0x4b7043(0x124)]=function(){return![];},Spriteset_Battle[_0x4b7043(0xb3)][_0x4b7043(0x124)]=function(){const _0x2b67ce=_0x4b7043;return this['battlerSprites']()[_0x2b67ce(0x10a)](_0x1d6485=>_0x1d6485[_0x2b67ce(0x124)]());};function Sprite_VictoryGauge(){this['initialize'](...arguments);}Sprite_VictoryGauge[_0x4b7043(0xb3)]=Object[_0x4b7043(0x222)](Sprite['prototype']),Sprite_VictoryGauge[_0x4b7043(0xb3)][_0x4b7043(0x134)]=Sprite_VictoryGauge,Sprite_VictoryGauge[_0x4b7043(0xb3)]['initialize']=function(_0xd232f5,_0x58308c,_0x3afea4){const _0x391446=_0x4b7043;this[_0x391446(0xb8)]=_0xd232f5,this[_0x391446(0x129)]=_0x58308c,this[_0x391446(0xc2)]=_0x3afea4,Sprite['prototype'][_0x391446(0x100)][_0x391446(0x1b1)](this),this[_0x391446(0x128)](),this['createBitmap'](),this['refresh'](),this[_0x391446(0x216)]();},Sprite_VictoryGauge[_0x4b7043(0xb3)][_0x4b7043(0x128)]=function(){const _0x4e150f=_0x4b7043;this[_0x4e150f(0x23d)]=BattleManager[_0x4e150f(0x23c)],this[_0x4e150f(0x171)]=this[_0x4e150f(0x152)]()[_0x4e150f(0x249)],this[_0x4e150f(0x168)]=![];},Sprite_VictoryGauge['prototype']['createBitmap']=function(){const _0x135334=_0x4b7043;this[_0x135334(0x22f)]=new Bitmap(this['_fullWidth'],this[_0x135334(0x1ad)]()*0x2);},Sprite_VictoryGauge[_0x4b7043(0xb3)][_0x4b7043(0x1ad)]=function(){const _0x17888e=_0x4b7043;return Window_Base['prototype'][_0x17888e(0x1ad)]();},Sprite_VictoryGauge['prototype']['actor']=function(){const _0x25a85e=_0x4b7043;return BattleManager[_0x25a85e(0x163)][this[_0x25a85e(0xb8)]];},Sprite_VictoryGauge[_0x4b7043(0xb3)][_0x4b7043(0x1f7)]=function(){const _0x2767a8=_0x4b7043;Sprite['prototype'][_0x2767a8(0x1f7)][_0x2767a8(0x1b1)](this),this[_0x2767a8(0x17f)](),this[_0x2767a8(0x216)]();},Sprite_VictoryGauge['prototype'][_0x4b7043(0x17f)]=function(){const _0x2874b3=_0x4b7043;if(this[_0x2874b3(0x23d)]<=0x0)return;const _0x2438a2=this[_0x2874b3(0x152)]();this[_0x2874b3(0x23d)]--;this['isFastForwarded']()&&(this['_duration']=0x0);if(this[_0x2874b3(0x23d)]<=0x0){const _0x101177=$gameActors[_0x2874b3(0x152)](_0x2438a2['_actorId']);_0x2438a2['changeExp'](_0x101177[_0x2874b3(0x235)](),![]);}else _0x2438a2[_0x2874b3(0x14a)](BattleManager[_0x2874b3(0xc7)]);this['_currentlevel']!==_0x2438a2[_0x2874b3(0x249)]&&(this[_0x2874b3(0x171)]=_0x2438a2[_0x2874b3(0x249)],this[_0x2874b3(0x168)]=!![],SoundManager[_0x2874b3(0x19f)]()),this[_0x2874b3(0x244)]();},Game_Actor['prototype'][_0x4b7043(0x14a)]=function(_0x2ebfcb){const _0x2af94e=_0x4b7043,_0x3e6e5c=this[_0x2af94e(0x235)]()+_0x2ebfcb*this[_0x2af94e(0x283)]();this[_0x2af94e(0x162)](_0x3e6e5c,this[_0x2af94e(0x156)]());},Sprite_VictoryGauge[_0x4b7043(0xb3)]['isFastForwarded']=function(){const _0x1fe4b1=_0x4b7043;return SceneManager[_0x1fe4b1(0x15c)][_0x1fe4b1(0xf8)]();},Sprite_VictoryGauge[_0x4b7043(0xb3)][_0x4b7043(0x216)]=function(){const _0x253526=_0x4b7043;this['opacity']=this[_0x253526(0x129)]['contentsOpacity'];},Sprite_VictoryGauge[_0x4b7043(0xb3)][_0x4b7043(0x244)]=function(){const _0x49f7ea=_0x4b7043;this[_0x49f7ea(0x22f)]['clear'](),this['resetFontSettings'](),this['drawActorName'](),this[_0x49f7ea(0x206)](),this[_0x49f7ea(0x1a7)](),this[_0x49f7ea(0x21e)](),this[_0x49f7ea(0x1a5)]();},Sprite_VictoryGauge[_0x4b7043(0xb3)][_0x4b7043(0x257)]=function(){const _0x256965=_0x4b7043;this[_0x256965(0x22f)][_0x256965(0x1df)]=$gameSystem[_0x256965(0xe7)](),this['bitmap'][_0x256965(0x1a6)]=$gameSystem['mainFontSize'](),this[_0x256965(0x22f)][_0x256965(0x178)]=ColorManager[_0x256965(0x13f)]();},Sprite_VictoryGauge['prototype'][_0x4b7043(0x1b8)]=function(){const _0x4b91a9=_0x4b7043;this['resetFontSettings']();const _0x141b78=this[_0x4b91a9(0x1ad)](),_0x43415b=Math[_0x4b91a9(0x279)](_0x141b78/0x2),_0xf7d27=0x0,_0xec65b=this[_0x4b91a9(0x22f)][_0x4b91a9(0xe9)]-_0x141b78,_0x566b95='left',_0x741501=this['actor']()['name']();this[_0x4b91a9(0x22f)][_0x4b91a9(0x1b2)](_0x741501,_0x43415b,_0xf7d27,_0xec65b,_0x141b78,_0x566b95);},Sprite_VictoryGauge['prototype'][_0x4b7043(0x206)]=function(){const _0x38aef7=_0x4b7043;this[_0x38aef7(0x257)]();const _0x201f2e=this[_0x38aef7(0x1ad)](),_0x3cd208=Math[_0x38aef7(0x279)](_0x201f2e/0x2),_0x694a9=0x0,_0x46b852=this['bitmap'][_0x38aef7(0xe9)]-_0x201f2e,_0xf59bdc=this[_0x38aef7(0x218)]()===''?_0x38aef7(0x14c):'center',_0x5b9f27=TextManager[_0x38aef7(0x22c)][_0x38aef7(0x103)](this[_0x38aef7(0x152)]()[_0x38aef7(0x249)]);this[_0x38aef7(0x168)]&&(this[_0x38aef7(0x22f)][_0x38aef7(0x178)]=ColorManager['powerUpColor']()),this['bitmap']['drawText'](_0x5b9f27,_0x3cd208,_0x694a9,_0x46b852,_0x201f2e,_0xf59bdc);},Sprite_VictoryGauge[_0x4b7043(0xb3)][_0x4b7043(0x218)]=function(){const _0x2f44f7=_0x4b7043,_0x4c3f76=$gameParty['members']()[this[_0x2f44f7(0xb8)]];if(!_0x4c3f76)return'';if(Imported[_0x2f44f7(0x264)]&&VisuMZ[_0x2f44f7(0x1bd)][_0x2f44f7(0x187)][_0x2f44f7(0x20e)][_0x2f44f7(0x1ea)])return VisuMZ[_0x2f44f7(0x1bd)][_0x2f44f7(0x187)][_0x2f44f7(0x20e)]['AftermathText']['format'](_0x4c3f76[_0x2f44f7(0x13a)](),TextManager[_0x2f44f7(0x108)],TextManager['jobPointsFull']);if(Imported[_0x2f44f7(0x1c9)]){const _0x382033=VisuMZ[_0x2f44f7(0x1b4)][_0x2f44f7(0x187)];if(_0x382033[_0x2f44f7(0xe2)]['AftermathActorDisplay'])return _0x382033['ClassPoints'][_0x2f44f7(0x225)]['format'](_0x4c3f76['earnedClassPoints'](),TextManager['classPointsAbbr'],TextManager[_0x2f44f7(0x192)]);if(_0x382033[_0x2f44f7(0x20e)][_0x2f44f7(0x1ea)])return _0x382033[_0x2f44f7(0x20e)]['AftermathText'][_0x2f44f7(0x103)](_0x4c3f76[_0x2f44f7(0x13a)](),TextManager[_0x2f44f7(0x108)],TextManager[_0x2f44f7(0x1e5)]);}if(Imported[_0x2f44f7(0x16a)]){const _0x4ce040=VisuMZ['SkillLearnSystem'][_0x2f44f7(0x187)];if(_0x4ce040['AbilityPoints'][_0x2f44f7(0x1ea)]){if(_0x2f44f7(0xed)!==_0x2f44f7(0xe3))return _0x4ce040['AbilityPoints'][_0x2f44f7(0x225)][_0x2f44f7(0x103)](_0x4c3f76[_0x2f44f7(0x1ce)](),TextManager['abilityPointsAbbr'],TextManager['abilityPointsFull']);else{const _0x154e21=this[_0x2f44f7(0x235)]()+_0x40dd14*this[_0x2f44f7(0x283)]();this[_0x2f44f7(0x162)](_0x154e21,this[_0x2f44f7(0x156)]());}}if(_0x4ce040['SkillPoints'][_0x2f44f7(0x1ea)])return _0x4ce040['SkillPoints'][_0x2f44f7(0x225)]['format'](_0x4c3f76[_0x2f44f7(0x21f)](),TextManager['skillPointsAbbr'],TextManager['skillPointsFull']);}return'';},Sprite_VictoryGauge['prototype']['drawActorAdditionalRewards']=function(){const _0xd4f9fa=_0x4b7043;this[_0xd4f9fa(0x257)]();const _0x1e21ac=this[_0xd4f9fa(0x1ad)](),_0x3160b6=Math['round'](_0x1e21ac/0x2),_0x366db8=0x0,_0x331d24=this['bitmap'][_0xd4f9fa(0xe9)]-_0x1e21ac,_0x46cdfe='right';let _0x279cfa=this[_0xd4f9fa(0x218)]();this[_0xd4f9fa(0x22f)][_0xd4f9fa(0x1b2)](_0x279cfa,_0x3160b6,_0x366db8,_0x331d24,_0x1e21ac,_0x46cdfe);},Sprite_VictoryGauge['prototype']['drawExpGauge']=function(){const _0x3cc663=_0x4b7043,_0x17149b=this[_0x3cc663(0x1ad)](),_0x2fde84=this[_0x3cc663(0x22f)][_0x3cc663(0xe9)]-_0x17149b,_0x5d8e56=Sprite_Gauge[_0x3cc663(0xb3)]['gaugeHeight'](),_0x4af68d=Math[_0x3cc663(0x279)](_0x17149b/0x2),_0x506a4c=_0x17149b*0x2-_0x5d8e56-0x2,_0x543d05=Math[_0x3cc663(0x232)]((_0x2fde84-0x2)*this[_0x3cc663(0x152)]()[_0x3cc663(0x21a)]()),_0x16cae9=_0x5d8e56-0x2,_0x11752f=this['gaugeBackColor'](),_0x4005b9=this[_0x3cc663(0x256)](),_0x430fe8=this['gaugeColor2']();if(Imported[_0x3cc663(0x15d)]){const _0x20b1e4=VisuMZ['VisualGaugeStyles'][_0x3cc663(0x187)][_0x3cc663(0x14e)]??'arrow';this[_0x3cc663(0x22f)]['drawVisualStyleGauge'](_0x20b1e4,_0x4af68d,_0x506a4c,_0x2fde84,_0x5d8e56,this['actor']()[_0x3cc663(0x21a)](),_0x11752f,_0x4005b9,_0x430fe8);}else{if('QwNOD'!==_0x3cc663(0x170))this[_0x3cc663(0x22f)][_0x3cc663(0x287)](_0x4af68d,_0x506a4c,_0x2fde84,_0x5d8e56,_0x11752f),this['bitmap'][_0x3cc663(0x229)](_0x4af68d+0x1,_0x506a4c+0x1,_0x543d05,_0x16cae9,_0x4005b9,_0x430fe8);else{const _0xf8a867=this[_0x3cc663(0x1ad)]()-0x2,_0x5cd27e=_0x2da0bf[_0x3cc663(0x232)](_0xf8a867/0x2),_0x4c06b9=_0x3cc663(0x122),_0x27714c=_0x20ebf9['dimColor2'](),_0x215a23=_0x1dd5f5-_0xf8a867;!_0x147633[_0x3cc663(0x1cc)]&&(_0xdf8306[_0x3cc663(0x1cc)]=new _0x5c62ef(_0x288a62,_0xf8a867),_0x155911['victoryNameBitmap']['paintOpacity']=this['translucentOpacity'](),_0x243229['victoryNameBitmap'][_0x3cc663(0x1e0)](_0x5cd27e,_0x5cd27e,_0x5cd27e,_0x4c06b9),_0x1bf743[_0x3cc663(0x1cc)][_0x3cc663(0x1e0)](_0x5cd27e+_0x215a23,_0x5cd27e,_0x5cd27e,_0x4c06b9),_0x168e6e[_0x3cc663(0x1cc)]['clearRect'](_0x5cd27e,0x0,_0x215a23,_0xf8a867),_0x1e1f40['victoryNameBitmap'][_0x3cc663(0x287)](_0x5cd27e,0x0,_0x215a23,_0xf8a867,_0x4c06b9)),this[_0x3cc663(0x126)][_0x3cc663(0x246)](_0xda768f[_0x3cc663(0x1cc)],0x0,0x0,_0x115ed4,_0xf8a867,_0x50abd8,_0x8c0b2a,_0x2089e0,_0xf8a867);}}},Sprite_VictoryGauge[_0x4b7043(0xb3)]['gaugeBackColor']=function(){const _0x110723=_0x4b7043;return ColorManager[_0x110723(0x28c)]();},Sprite_VictoryGauge[_0x4b7043(0xb3)]['gaugeColor1']=function(){const _0x4ed5be=_0x4b7043;return this['actor']()[_0x4ed5be(0xe4)]()?Imported[_0x4ed5be(0x138)]?ColorManager['maxLvGaugeColor1']():ColorManager[_0x4ed5be(0x178)](0xe):Imported['VisuMZ_0_CoreEngine']?ColorManager[_0x4ed5be(0x1ac)]():ColorManager['textColor'](0x1e);},Sprite_VictoryGauge[_0x4b7043(0xb3)]['gaugeColor2']=function(){const _0x1d8e40=_0x4b7043;if(this['actor']()[_0x1d8e40(0xe4)]())return Imported['VisuMZ_0_CoreEngine']?ColorManager[_0x1d8e40(0x208)]():ColorManager['textColor'](0x6);else{if(_0x1d8e40(0xc8)===_0x1d8e40(0xfc))this[_0x1d8e40(0x22f)][_0x1d8e40(0x178)]=_0x29b4f1[_0x1d8e40(0x198)]();else return Imported[_0x1d8e40(0x138)]?ColorManager[_0x1d8e40(0xcf)]():ColorManager[_0x1d8e40(0x178)](0x1f);}},Sprite_VictoryGauge['prototype']['drawExpValues']=function(){const _0x4dab63=_0x4b7043;this[_0x4dab63(0x257)]();const _0x177bc5=this['lineHeight'](),_0x3e2106=_0x177bc5,_0x249504=_0x177bc5;let _0x4ac904=this['bitmap'][_0x4dab63(0xe9)]-_0x177bc5*0x2;const _0x2eb3a1=this[_0x4dab63(0x152)]();let _0x2e17df=Math[_0x4dab63(0x279)](_0x2eb3a1[_0x4dab63(0x235)]()-_0x2eb3a1[_0x4dab63(0x234)]()),_0x1fc13f='/'+Math[_0x4dab63(0x279)](_0x2eb3a1[_0x4dab63(0x247)]()-_0x2eb3a1['currentLevelExp']());Imported['VisuMZ_0_CoreEngine']&&VisuMZ['CoreEngine'][_0x4dab63(0x187)][_0x4dab63(0xfa)][_0x4dab63(0x24b)]&&(_0x2e17df=VisuMZ[_0x4dab63(0x26f)](_0x2e17df),_0x1fc13f=VisuMZ[_0x4dab63(0x26f)](_0x1fc13f));this[_0x4dab63(0x168)]?_0x4dab63(0x1eb)!==_0x4dab63(0x1eb)?(_0x4f47f6[_0x4dab63(0xb3)][_0x4dab63(0x244)][_0x4dab63(0x1b1)](this),this['contents']['clear'](),this[_0x4dab63(0x257)](),this['drawBackgroundElements'](),this[_0x4dab63(0x265)](),this[_0x4dab63(0x17c)](),this[_0x4dab63(0x258)](),this[_0x4dab63(0x190)]()):(this['bitmap'][_0x4dab63(0x178)]=ColorManager[_0x4dab63(0x151)](),this['bitmap'][_0x4dab63(0x1b2)](TextManager[_0x4dab63(0x27b)],_0x3e2106,_0x249504,_0x4ac904,_0x177bc5,_0x4dab63(0x1af))):_0x4dab63(0x173)!==_0x4dab63(0x173)?this[_0x4dab63(0x1d9)]=0x0:this[_0x4dab63(0x22f)]['drawText'](TextManager[_0x4dab63(0x117)],_0x3e2106,_0x249504,_0x4ac904,_0x177bc5,'left');this[_0x4dab63(0x257)]();if(_0x2eb3a1[_0x4dab63(0xe4)]()){this[_0x4dab63(0x22f)]['drawText'](_0x4dab63(0x175),_0x3e2106,_0x249504,_0x4ac904,_0x177bc5,_0x4dab63(0x14c));return;}this[_0x4dab63(0x22f)]['fontSize']-=0x8,this[_0x4dab63(0x22f)][_0x4dab63(0x178)]=ColorManager['textColor'](0x8),this['bitmap'][_0x4dab63(0x1b2)](_0x1fc13f,_0x3e2106,_0x249504,_0x4ac904,_0x177bc5,_0x4dab63(0x14c)),_0x4ac904-=this[_0x4dab63(0x22f)][_0x4dab63(0x23b)](_0x1fc13f),this[_0x4dab63(0x257)](),this[_0x4dab63(0x22f)][_0x4dab63(0x1b2)](_0x2e17df,_0x3e2106,_0x249504,_0x4ac904,_0x177bc5,_0x4dab63(0x14c));};function Window_VictoryContinueMessage(){const _0x136ee1=_0x4b7043;this[_0x136ee1(0x100)](...arguments);}Window_VictoryContinueMessage[_0x4b7043(0xb3)]=Object[_0x4b7043(0x222)](Window_Base['prototype']),Window_VictoryContinueMessage[_0x4b7043(0xb3)]['constructor']=Window_VictoryContinueMessage,Window_VictoryContinueMessage['prototype']['initialize']=function(_0x5ef685){const _0x4d3eb7=_0x4b7043;Window_Base[_0x4d3eb7(0xb3)][_0x4d3eb7(0x100)]['call'](this,_0x5ef685),this[_0x4d3eb7(0x15b)](0x2),this[_0x4d3eb7(0x244)]();},Window_VictoryContinueMessage[_0x4b7043(0xb3)][_0x4b7043(0xde)]=function(_0x16cdff){const _0x11e8f1=_0x4b7043;this[_0x11e8f1(0x177)]=_0x16cdff,this[_0x11e8f1(0x172)]=0x0;},Window_VictoryContinueMessage['prototype'][_0x4b7043(0x1ed)]=function(){const _0x3b0276=_0x4b7043;this[_0x3b0276(0x1d9)]=0x0;},Window_VictoryContinueMessage[_0x4b7043(0xb3)]['update']=function(){const _0x482ede=_0x4b7043;Window_Base[_0x482ede(0xb3)][_0x482ede(0x1f7)]['call'](this),this[_0x482ede(0x1ba)]();},Window_VictoryContinueMessage['prototype'][_0x4b7043(0x1ba)]=function(){const _0x342c19=_0x4b7043;this[_0x342c19(0x177)]>0x0&&this[_0x342c19(0xdc)]()&&(this[_0x342c19(0x177)]=0x0,Input[_0x342c19(0x18d)](),TouchInput[_0x342c19(0x18d)]());if(this[_0x342c19(0x177)]-->0x0)return;this[_0x342c19(0x172)]+=Window_VictoryRewards['_opacitySpeed'];},Window_VictoryContinueMessage[_0x4b7043(0xb3)][_0x4b7043(0xdc)]=function(){const _0x49139e=_0x4b7043;return Input['isPressed']('ok')||Input[_0x49139e(0x227)](_0x49139e(0x28b))||TouchInput[_0x49139e(0x227)]();},Window_VictoryContinueMessage[_0x4b7043(0xb3)][_0x4b7043(0x244)]=function(){const _0x400d16=_0x4b7043;this['contents'][_0x400d16(0x18d)]();const _0x2eacc1=TextManager[_0x400d16(0x1c2)];let _0x830abf=TextManager['victoryKeyOk'],_0x3b5153=TextManager['victoryKeyCancel'];Imported['VisuMZ_0_CoreEngine']&&(_0x830abf=TextManager[_0x400d16(0xc0)]('ok'),_0x3b5153=TextManager[_0x400d16(0xc0)](_0x400d16(0x28b)));const _0x293c81=_0x2eacc1[_0x400d16(0x103)](_0x830abf,_0x3b5153),_0x5456d7=this[_0x400d16(0x15f)](_0x293c81)[_0x400d16(0xe9)],_0x22dbae=Math['round']((this['innerWidth']-_0x5456d7)/0x2);this[_0x400d16(0x180)](_0x293c81,_0x22dbae,0x0,_0x5456d7);},Window_VictoryContinueMessage[_0x4b7043(0xb3)]['isContinueReady']=function(){const _0x55266b=_0x4b7043;return this[_0x55266b(0x177)]<=0x0;};function Window_VictoryRewards(){const _0x33be3f=_0x4b7043;this[_0x33be3f(0x100)](...arguments);}Window_VictoryRewards[_0x4b7043(0x1a2)]=VisuMZ[_0x4b7043(0x1fd)][_0x4b7043(0x187)][_0x4b7043(0x18f)][_0x4b7043(0x11f)],Window_VictoryRewards[_0x4b7043(0xb3)]=Object[_0x4b7043(0x222)](Window_StatusBase[_0x4b7043(0xb3)]),Window_VictoryRewards[_0x4b7043(0xb3)][_0x4b7043(0x134)]=Window_VictoryRewards,Window_VictoryRewards[_0x4b7043(0xb3)][_0x4b7043(0x100)]=function(_0x85d919){const _0x2add85=_0x4b7043;Window_StatusBase[_0x2add85(0xb3)][_0x2add85(0x100)][_0x2add85(0x1b1)](this,_0x85d919),this['setBackgroundType'](0x2),this['contentsOpacity']=0x0,this[_0x2add85(0x244)]();},Window_VictoryRewards[_0x4b7043(0xb3)][_0x4b7043(0x1ed)]=function(){const _0x539f4a=_0x4b7043;this[_0x539f4a(0x1d9)]=0x0;},Window_VictoryRewards['prototype'][_0x4b7043(0x1f7)]=function(){const _0x1681aa=_0x4b7043;Window_StatusBase[_0x1681aa(0xb3)][_0x1681aa(0x1f7)][_0x1681aa(0x1b1)](this),this[_0x1681aa(0x1ba)]();},Window_VictoryRewards[_0x4b7043(0xb3)]['updateContentsOpacity']=function(){const _0x2542fe=_0x4b7043;SceneManager[_0x2542fe(0x15c)][_0x2542fe(0x159)]==='rewards'?this[_0x2542fe(0x172)]+=Window_VictoryRewards[_0x2542fe(0x1a2)]:this[_0x2542fe(0x172)]-=Window_VictoryRewards[_0x2542fe(0x1a2)];},Window_VictoryRewards[_0x4b7043(0xb3)][_0x4b7043(0xff)]=function(){const _0x298b67=_0x4b7043;return VisuMZ[_0x298b67(0x1fd)]['Settings'][_0x298b67(0x18f)][_0x298b67(0xb4)];},Window_VictoryRewards[_0x4b7043(0xb3)][_0x4b7043(0x244)]=function(){const _0xd0d2e2=_0x4b7043;Window_StatusBase['prototype'][_0xd0d2e2(0x244)][_0xd0d2e2(0x1b1)](this),this['contents'][_0xd0d2e2(0x18d)](),this[_0xd0d2e2(0x257)](),this[_0xd0d2e2(0x204)](),this[_0xd0d2e2(0x265)](),this[_0xd0d2e2(0x17c)](),this[_0xd0d2e2(0x258)](),this[_0xd0d2e2(0x190)]();},Window_VictoryRewards[_0x4b7043(0xb3)][_0x4b7043(0x204)]=function(){const _0x507e89=_0x4b7043,_0x55fedd=this[_0x507e89(0x1ad)](),_0x258658=0x0,_0x2ee43a=_0x55fedd*2.5,_0x50bb4b=_0x507e89(0x24d),_0x4380e2=_0x507e89(0x144),_0x522610=ColorManager['normalColor']();this['contents'][_0x507e89(0x229)](_0x258658,_0x2ee43a,this[_0x507e89(0xe9)],this[_0x507e89(0x19c)]-_0x2ee43a-_0x55fedd*1.5,_0x50bb4b,_0x4380e2),this[_0x507e89(0x126)][_0x507e89(0x287)](0x0,_0x2ee43a-0x1,this[_0x507e89(0xe9)],0x2,_0x522610),this[_0x507e89(0x126)]['fillRect'](0x0,this[_0x507e89(0x19c)]-_0x55fedd*1.5-0x1,this['width'],0x2,_0x522610);const _0x565cee=this['mirrorContents'](),_0x42cbef=_0x565cee?Math[_0x507e89(0x279)](this[_0x507e89(0xe9)]/0x2+0x28):0x64,_0x144e92=_0x2ee43a-_0x55fedd*0.75,_0x2d0e31=TextManager[_0x507e89(0x1ab)];this[_0x507e89(0xd7)](),this[_0x507e89(0xd7)](),this[_0x507e89(0x1b2)](_0x2d0e31,_0x42cbef,_0x144e92,this[_0x507e89(0xe9)]);},Window_VictoryRewards[_0x4b7043(0x133)]=VisuMZ[_0x4b7043(0x1fd)]['Settings'][_0x4b7043(0x239)],Window_VictoryRewards[_0x4b7043(0xb3)][_0x4b7043(0x265)]=function(){const _0x5af210=_0x4b7043;this[_0x5af210(0x257)]();const _0x3ca6f9=this[_0x5af210(0xff)](),_0x2d3870=this['lineHeight'](),_0xd40ba4=Math['floor'](_0x2d3870/0x2),_0x20d97f=_0x3ca6f9?Math[_0x5af210(0x279)](this[_0x5af210(0xe9)]/0x2+0x28):0x64,_0x5f13fe=Math['round'](_0x2d3870*3.5),_0x2a5eb4=Math['round'](this['width']/0x2-0x8c),_0x54ebba=_0x2a5eb4-_0xd40ba4-0x50;let _0x22e5eb=_0x5f13fe;for(const _0x531068 of Window_VictoryRewards[_0x5af210(0x133)]){if(_0x5af210(0x10b)!==_0x5af210(0x252)){if(!_0x531068[_0x5af210(0x26b)]())continue;this[_0x5af210(0x139)](_0x20d97f,_0x22e5eb,_0x2a5eb4),this[_0x5af210(0xb7)](ColorManager[_0x5af210(0x243)]()),this[_0x5af210(0x1b2)](_0x531068[_0x5af210(0x1c1)](),_0x20d97f+_0xd40ba4,_0x22e5eb,_0x54ebba),this[_0x5af210(0xb7)](ColorManager[_0x5af210(0x13f)]());const _0x3ef156=_0x531068['Data']();Imported['VisuMZ_3_VisualGoldDisplay']&&_0x531068[_0x5af210(0x1c1)]()===TextManager[_0x5af210(0x15e)]?this[_0x5af210(0x28e)](_0x3ef156,TextManager['currencyUnit'],_0x20d97f+_0xd40ba4,_0x22e5eb,_0x54ebba):_0x5af210(0x102)===_0x5af210(0x121)?(this[_0x5af210(0x10c)](),this[_0x5af210(0x25d)](),this['gainRewards']()):this[_0x5af210(0x1b2)](_0x3ef156,_0x20d97f+_0xd40ba4,_0x22e5eb,_0x54ebba,_0x5af210(0x14c)),_0x22e5eb+=_0x2d3870;}else this['processVictoryAftermathParty'](),this[_0x5af210(0xcd)](),this[_0x5af210(0x174)](),this['prepareVictoryAftermathTransition']();}},Window_VictoryRewards[_0x4b7043(0xb3)][_0x4b7043(0x139)]=function(_0x51ef99,_0x1d5243,_0x4bed40){const _0x40de1e=_0x4b7043,_0x56b975=this[_0x40de1e(0x1ad)]()-0x2,_0x569462=Math[_0x40de1e(0x232)](_0x56b975/0x2),_0x2b2e1b='rgba(0,\x200,\x200,\x201)',_0x4d24fd=ColorManager[_0x40de1e(0x10d)](),_0x4beaad=0x50,_0xdc7a=_0x4bed40-_0x569462-_0x4beaad;if(!ImageManager['victoryRewardBitmap']){if(_0x40de1e(0x179)!==_0x40de1e(0x179)){this[_0x40de1e(0x257)]();const _0x48983d=this['lineHeight'](),_0x28646d=_0x31a3af['round'](_0x48983d/0x2),_0x3ff12f=0x0,_0x197dde=this[_0x40de1e(0x22f)]['width']-_0x48983d,_0x3f11e0=_0x40de1e(0x1af),_0x11f778=this[_0x40de1e(0x152)]()[_0x40de1e(0xf3)]();this['bitmap'][_0x40de1e(0x1b2)](_0x11f778,_0x28646d,_0x3ff12f,_0x197dde,_0x48983d,_0x3f11e0);}else ImageManager['victoryRewardBitmap']=new Bitmap(_0x4bed40,_0x56b975),ImageManager[_0x40de1e(0x1ca)][_0x40de1e(0x12f)]=this[_0x40de1e(0x110)](),ImageManager[_0x40de1e(0x1ca)]['drawCircle'](_0x569462,_0x569462,_0x569462,_0x2b2e1b),ImageManager['victoryRewardBitmap'][_0x40de1e(0x16b)](_0x569462,0x0,_0x56b975,_0x56b975),ImageManager[_0x40de1e(0x1ca)]['fillRect'](_0x569462,0x0,_0xdc7a,_0x56b975,_0x2b2e1b),ImageManager[_0x40de1e(0x1ca)]['gradientFillRect'](_0x569462+_0xdc7a,0x0,_0x4beaad,_0x56b975,_0x2b2e1b,_0x4d24fd);}this[_0x40de1e(0x126)][_0x40de1e(0x246)](ImageManager['victoryRewardBitmap'],0x0,0x0,_0x4bed40,_0x56b975,_0x51ef99,_0x1d5243,_0x4bed40,_0x56b975);},Window_VictoryRewards[_0x4b7043(0xb3)]['drawItemGainTitle']=function(){const _0x1939d0=_0x4b7043;this[_0x1939d0(0x257)]();if(BattleManager[_0x1939d0(0x1fb)]['items']['length']<=0x0)return;const _0x52c60a=this['mirrorContents'](),_0x540618=this[_0x1939d0(0x1ad)](),_0x4b2b1b=_0x52c60a?0x8c:Math[_0x1939d0(0x279)](this[_0x1939d0(0xe9)]/0x2+0x28),_0x45baae=Math[_0x1939d0(0x279)](_0x540618*0x3),_0xe97f36=Math[_0x1939d0(0x279)](this[_0x1939d0(0xe9)]/0x2-0x8c),_0x20c419=TextManager[_0x1939d0(0x1d0)],_0x42e9cb=ColorManager[_0x1939d0(0x13f)]();this[_0x1939d0(0xd7)](),this[_0x1939d0(0x1b2)](_0x20c419,_0x4b2b1b,_0x45baae,_0xe97f36,_0x1939d0(0x1af));const _0x13bdff=_0x52c60a?0x64:Math['round'](this[_0x1939d0(0xe9)]/0x2),_0x3615d7=_0x45baae+_0x540618*1.5,_0x230f2c=Math[_0x1939d0(0x279)](this[_0x1939d0(0xe9)]/0x2)-0x64;this[_0x1939d0(0x126)][_0x1939d0(0x287)](_0x13bdff,_0x3615d7,_0x230f2c,0x2,_0x42e9cb);},Window_VictoryRewards[_0x4b7043(0xb3)]['makeItemGainWindow']=function(){const _0x545289=_0x4b7043,_0x3ad3c3=this[_0x545289(0xff)](),_0x56f69c=this[_0x545289(0x1ad)](),_0x4dff4f=_0x3ad3c3?0x64:Math[_0x545289(0x279)](this[_0x545289(0xe9)]/0x2+0x28),_0x22a52b=Math[_0x545289(0x279)](_0x56f69c*0x5),_0x2a1067=Math[_0x545289(0x279)](this['width']/0x2-0x8c),_0x2e5e5f=this['height']-_0x22a52b-_0x56f69c*0x2,_0x36482d=new Rectangle(_0x4dff4f,_0x22a52b,_0x2a1067,_0x2e5e5f);this[_0x545289(0xc3)]=new Window_VictoryItem(_0x36482d,this),this[_0x545289(0x27f)](this['_itemGainWindow']);},Window_VictoryRewards['prototype'][_0x4b7043(0x190)]=function(){const _0x184a2c=_0x4b7043;this[_0x184a2c(0x257)]();const _0x11374b=this[_0x184a2c(0xff)](),_0x1f23b7=this[_0x184a2c(0x1ad)](),_0x25aa18=$gameParty[_0x184a2c(0x1db)](),_0x5b0f85=_0x11374b?Math[_0x184a2c(0x279)](this[_0x184a2c(0xe9)]/0x2+0x28):0x64,_0x230134=this[_0x184a2c(0x19c)]-1.5-_0x1f23b7*0x2*(_0x25aa18+0x1),_0x421c4c=Math[_0x184a2c(0x279)](this[_0x184a2c(0xe9)]/0x2-0x8c);let _0x6d1b94=Math[_0x184a2c(0x279)](_0x230134);if(VisuMZ[_0x184a2c(0x1fd)][_0x184a2c(0x187)][_0x184a2c(0x18f)][_0x184a2c(0x13b)]??!![])for(let _0x1fe5aa=0x0;_0x1fe5aa<_0x25aa18;_0x1fe5aa++){if(!$gameParty[_0x184a2c(0x1d3)]()[_0x1fe5aa])continue;this[_0x184a2c(0x233)](_0x5b0f85,_0x6d1b94,_0x421c4c),this['placeActorGauges'](_0x1fe5aa,_0x5b0f85,_0x6d1b94,_0x421c4c),_0x6d1b94+=_0x1f23b7*0x2;}},Window_VictoryRewards[_0x4b7043(0xb3)][_0x4b7043(0x233)]=function(_0x532b6d,_0x11d893,_0x1b1949){const _0x18f391=_0x4b7043,_0xc223e1=this[_0x18f391(0x1ad)]()-0x2,_0x3ea402=Math[_0x18f391(0x232)](_0xc223e1/0x2),_0x37f29d=_0x18f391(0x122),_0x11c8ea=ColorManager[_0x18f391(0x10d)](),_0x30aab8=_0x1b1949-_0xc223e1;!ImageManager['victoryNameBitmap']&&(_0x18f391(0x262)!=='mgsxU'?(this[_0x18f391(0x177)]=_0x34e921,this['contentsOpacity']=0x0):(ImageManager[_0x18f391(0x1cc)]=new Bitmap(_0x1b1949,_0xc223e1),ImageManager['victoryNameBitmap'][_0x18f391(0x12f)]=this['translucentOpacity'](),ImageManager[_0x18f391(0x1cc)][_0x18f391(0x1e0)](_0x3ea402,_0x3ea402,_0x3ea402,_0x37f29d),ImageManager['victoryNameBitmap']['drawCircle'](_0x3ea402+_0x30aab8,_0x3ea402,_0x3ea402,_0x37f29d),ImageManager[_0x18f391(0x1cc)]['clearRect'](_0x3ea402,0x0,_0x30aab8,_0xc223e1),ImageManager[_0x18f391(0x1cc)][_0x18f391(0x287)](_0x3ea402,0x0,_0x30aab8,_0xc223e1,_0x37f29d))),this[_0x18f391(0x126)][_0x18f391(0x246)](ImageManager['victoryNameBitmap'],0x0,0x0,_0x1b1949,_0xc223e1,_0x532b6d,_0x11d893,_0x1b1949,_0xc223e1);},Window_VictoryRewards[_0x4b7043(0xb3)][_0x4b7043(0x20c)]=function(_0x470bd2,_0x36354e,_0x1f457f,_0x3e8c60){const _0x1a669d=_0x4b7043,_0x298154=_0x1a669d(0xcb)[_0x1a669d(0x103)](_0x470bd2),_0x465534=this[_0x1a669d(0x209)](_0x298154,_0x470bd2,_0x3e8c60);_0x465534['move'](_0x36354e,_0x1f457f),_0x465534['show']();},Window_VictoryRewards['prototype'][_0x4b7043(0x209)]=function(_0x44bebf,_0x532a5b,_0x1b69dc){const _0x48ec81=_0x4b7043,_0x538216=this[_0x48ec81(0x185)];if(_0x538216[_0x44bebf]){if(_0x48ec81(0x1e3)!==_0x48ec81(0x125))return _0x538216[_0x44bebf];else this[_0x48ec81(0x126)][_0x48ec81(0x1a6)]=_0x7ff3fe[_0x48ec81(0xb3)]['paramValueFontSize']();}else{if('OIiGP'==='KkdOB')_0x95087d[_0x48ec81(0x1ca)]=new _0x55a848(_0x3136e0,_0x1a20b5),_0x380890[_0x48ec81(0x1ca)]['paintOpacity']=this[_0x48ec81(0x110)](),_0x3ce494[_0x48ec81(0x1ca)][_0x48ec81(0x1e0)](_0x338a21,_0x536cb5,_0x4b33b4,_0x2a1c41),_0x149cdf[_0x48ec81(0x1ca)][_0x48ec81(0x16b)](_0x7a6d10,0x0,_0x219ae2,_0x143631),_0x57de3c[_0x48ec81(0x1ca)][_0x48ec81(0x287)](_0x1b59a0,0x0,_0x513047,_0x3418a4,_0x123050),_0x429936['victoryRewardBitmap'][_0x48ec81(0x229)](_0x5a3858+_0x41d2bb,0x0,_0xde2b82,_0x1e4a77,_0x5b444b,_0x1405f3);else{const _0x55856e=new Sprite_VictoryGauge(_0x532a5b,this,_0x1b69dc);return _0x538216[_0x44bebf]=_0x55856e,this[_0x48ec81(0x230)](_0x55856e),_0x55856e;}}};function Window_VictoryItem(){this['initialize'](...arguments);}Window_VictoryItem[_0x4b7043(0xb3)]=Object['create'](Window_ItemList['prototype']),Window_VictoryItem['prototype'][_0x4b7043(0x134)]=Window_VictoryItem,Window_VictoryItem[_0x4b7043(0xb3)]['initialize']=function(_0x1cf3c9,_0xdf03cd){const _0x945313=_0x4b7043;this[_0x945313(0x129)]=_0xdf03cd,Window_ItemList[_0x945313(0xb3)][_0x945313(0x100)]['call'](this,_0x1cf3c9),this[_0x945313(0x15b)](0x2),this['refresh'](),this['updateContentsOpacity'](),this[_0x945313(0x1cb)][_0x945313(0x199)]>this[_0x945313(0x140)]()&&(this[_0x945313(0x1bf)](),this['select'](0x0));},Window_VictoryItem[_0x4b7043(0xb3)][_0x4b7043(0x260)]=function(){const _0x50bcf7=_0x4b7043;return Window_Base[_0x50bcf7(0xb3)][_0x50bcf7(0x260)]['call'](this);},Window_VictoryItem['prototype'][_0x4b7043(0x1ed)]=function(){const _0x2a9707=_0x4b7043;this[_0x2a9707(0x1d9)]=0x0;},Window_VictoryItem[_0x4b7043(0xb3)][_0x4b7043(0x1f9)]=function(){return 0x1;},Window_VictoryItem[_0x4b7043(0xb3)][_0x4b7043(0x1de)]=function(){return 0x0;},Window_VictoryItem[_0x4b7043(0xb3)][_0x4b7043(0x1f7)]=function(){const _0x4f31f9=_0x4b7043;Window_ItemList[_0x4f31f9(0xb3)][_0x4f31f9(0x1f7)][_0x4f31f9(0x1b1)](this),this[_0x4f31f9(0x1ba)]();},Window_VictoryItem[_0x4b7043(0xb3)][_0x4b7043(0x1ba)]=function(){const _0x500436=_0x4b7043;this[_0x500436(0x172)]=this[_0x500436(0x129)][_0x500436(0x172)];},Window_VictoryItem[_0x4b7043(0xb3)][_0x4b7043(0x21d)]=function(){const _0x5d710b=_0x4b7043,_0xd96250=BattleManager[_0x5d710b(0x1fb)][_0x5d710b(0x148)];_0xd96250[_0x5d710b(0x23e)]((_0xf96829,_0x5b7a51)=>_0xf96829['id']-_0x5b7a51['id']);const _0x5329d1=_0xd96250[_0x5d710b(0x1fc)](_0x33c6c0=>DataManager[_0x5d710b(0x11b)](_0x33c6c0)),_0x1a36e6=_0xd96250['filter'](_0x582d86=>DataManager['isWeapon'](_0x582d86)),_0x5a40a8=_0xd96250[_0x5d710b(0x1fc)](_0x7d45eb=>DataManager[_0x5d710b(0xbe)](_0x7d45eb));this[_0x5d710b(0x1cb)]=_0x5329d1[_0x5d710b(0x26e)](_0x1a36e6)[_0x5d710b(0x26e)](_0x5a40a8),this[_0x5d710b(0x1cb)]=this[_0x5d710b(0x1cb)]['filter']((_0x42242e,_0x342f4e,_0x333db1)=>_0x333db1[_0x5d710b(0xc1)](_0x42242e)===_0x342f4e);},Window_VictoryItem[_0x4b7043(0xb3)][_0x4b7043(0x250)]=function(_0x45c738){return!![];},Window_VictoryItem[_0x4b7043(0xb3)][_0x4b7043(0x17e)]=function(){return![];},Window_VictoryItem[_0x4b7043(0xb3)][_0x4b7043(0xf2)]=function(_0x24711e){const _0x4fd2d1=_0x4b7043;return BattleManager[_0x4fd2d1(0x1fb)][_0x4fd2d1(0x148)]['filter'](_0x1db8f7=>_0x1db8f7===_0x24711e)['length'];},Window_VictoryItem['prototype'][_0x4b7043(0x1f1)]=function(_0x22af93){},Window_VictoryItem['prototype'][_0x4b7043(0x1f0)]=function(_0x22f3f0,_0x54cb64,_0x58f6b1,_0x2ce9af){const _0x25c256=_0x4b7043;let _0x3e5918='x%1';Imported['VisuMZ_1_ItemsEquipsCore']&&(_0x3e5918=VisuMZ[_0x25c256(0x254)]['Settings'][_0x25c256(0x261)][_0x25c256(0x1c5)]);let _0x291f40=_0x3e5918[_0x25c256(0x103)](this[_0x25c256(0xf2)](_0x22f3f0));this[_0x25c256(0x1b2)](_0x291f40,_0x54cb64,_0x58f6b1,_0x2ce9af,_0x25c256(0x14c));};function Window_VictoryLevelUp(){const _0x52131b=_0x4b7043;this[_0x52131b(0x100)](...arguments);}Window_VictoryLevelUp[_0x4b7043(0x1a2)]=Window_VictoryRewards['_opacitySpeed'],Window_VictoryLevelUp['_showBust']=VisuMZ[_0x4b7043(0x1fd)][_0x4b7043(0x187)][_0x4b7043(0x1e4)][_0x4b7043(0x20b)],Window_VictoryLevelUp[_0x4b7043(0xb3)]=Object[_0x4b7043(0x222)](Window_StatusBase[_0x4b7043(0xb3)]),Window_VictoryLevelUp[_0x4b7043(0xb3)]['constructor']=Window_VictoryLevelUp,Window_VictoryLevelUp['prototype'][_0x4b7043(0x100)]=function(_0x3099c6){const _0x5168ca=_0x4b7043;Window_StatusBase[_0x5168ca(0xb3)][_0x5168ca(0x100)]['call'](this,_0x3099c6),this[_0x5168ca(0x15b)](0x2),this[_0x5168ca(0x172)]=0x0,this[_0x5168ca(0x244)](),this['createActorSprite'](),this[_0x5168ca(0x25e)]();},Window_VictoryLevelUp['prototype'][_0x4b7043(0x1ed)]=function(){const _0x4f74f3=_0x4b7043;this[_0x4f74f3(0x1d9)]=0x0;},Window_VictoryLevelUp['prototype']['update']=function(){const _0x5664a9=_0x4b7043;Window_StatusBase[_0x5664a9(0xb3)][_0x5664a9(0x1f7)]['call'](this),this['updateContentsOpacity']();},Window_VictoryLevelUp[_0x4b7043(0xb3)][_0x4b7043(0x1ba)]=function(){const _0x27d01b=_0x4b7043;SceneManager[_0x27d01b(0x15c)][_0x27d01b(0x159)]===_0x27d01b(0x1d5)?this[_0x27d01b(0x172)]+=Window_VictoryLevelUp['_opacitySpeed']:this[_0x27d01b(0x172)]-=Window_VictoryLevelUp[_0x27d01b(0x1a2)],this['_actorSprite']&&(_0x27d01b(0x161)===_0x27d01b(0x242)?this[_0x27d01b(0x19d)]=this['_autoBattle']:this[_0x27d01b(0xc4)][_0x27d01b(0x1d4)]=this[_0x27d01b(0x172)]);},Window_VictoryLevelUp['prototype'][_0x4b7043(0x244)]=function(){const _0x1a601c=_0x4b7043;Window_StatusBase[_0x1a601c(0xb3)][_0x1a601c(0x244)][_0x1a601c(0x1b1)](this),this[_0x1a601c(0x126)]['clear'](),this[_0x1a601c(0x257)](),this[_0x1a601c(0x204)]();},Window_VictoryLevelUp[_0x4b7043(0xb3)][_0x4b7043(0x204)]=function(){const _0x412b00=_0x4b7043,_0x182477=this['lineHeight'](),_0x99207f=_0x412b00(0x24d),_0x435cd0='rgba(0,\x200,\x200,\x200.4)',_0xf97aa3=ColorManager[_0x412b00(0x13f)](),_0x4892ab=SceneManager[_0x412b00(0x15c)][_0x412b00(0x193)]['x'],_0x3df12d=Math[_0x412b00(0x279)](this[_0x412b00(0xe9)]/0x2);this[_0x412b00(0x126)][_0x412b00(0x229)](_0x4892ab,0x0,_0x3df12d,this['height'],_0x435cd0,_0x99207f,!![]),this[_0x412b00(0x126)]['fillRect'](_0x4892ab-0x1,0x0,0x2,this[_0x412b00(0x19c)],_0xf97aa3),this[_0x412b00(0x126)]['fillRect'](_0x4892ab+_0x3df12d-0x1,0x0,0x2,this[_0x412b00(0x19c)],_0xf97aa3);const _0x3ee2c9=_0x182477,_0x50470f=_0x182477*0x1;this[_0x412b00(0x126)][_0x412b00(0x229)](0x0,_0x3ee2c9,this[_0x412b00(0xe9)],_0x50470f,_0x99207f,_0x435cd0),this[_0x412b00(0x126)][_0x412b00(0x287)](0x0,_0x3ee2c9-0x1,this[_0x412b00(0xe9)],0x2,_0xf97aa3),this[_0x412b00(0x126)]['fillRect'](0x0,_0x3ee2c9+_0x50470f-0x1,this[_0x412b00(0xe9)],0x2,_0xf97aa3);const _0x5e5a89=this[_0x412b00(0x19c)]-_0x182477*5.5,_0x462902=_0x182477*0x4;this[_0x412b00(0x126)][_0x412b00(0x229)](0x0,_0x5e5a89,this['width'],_0x462902,_0x99207f,_0x435cd0),this[_0x412b00(0x126)][_0x412b00(0x229)](0x0,_0x5e5a89,this[_0x412b00(0xe9)],_0x462902,_0x435cd0,_0x99207f),this[_0x412b00(0x126)][_0x412b00(0x287)](0x0,_0x5e5a89-0x2,this[_0x412b00(0xe9)],0x2,_0xf97aa3),this[_0x412b00(0x126)]['fillRect'](0x0,_0x5e5a89+_0x462902,this[_0x412b00(0xe9)],0x2,_0xf97aa3);},Window_VictoryLevelUp['prototype'][_0x4b7043(0x201)]=function(){const _0x2744e7=_0x4b7043,_0x1f6e66=VisuMZ[_0x2744e7(0x1fd)][_0x2744e7(0x187)][_0x2744e7(0x1e4)];this[_0x2744e7(0xc4)]=new Sprite(),this[_0x2744e7(0xc4)][_0x2744e7(0x1d8)]['x']=0.5,this[_0x2744e7(0xc4)][_0x2744e7(0x1d8)]['y']=0x1,this[_0x2744e7(0xc4)][_0x2744e7(0x1d4)]=0x0,this[_0x2744e7(0xc4)]['x']=Math[_0x2744e7(0x279)](eval(_0x1f6e66[_0x2744e7(0x221)])),this[_0x2744e7(0xc4)]['y']=Math[_0x2744e7(0x279)](eval(_0x1f6e66[_0x2744e7(0xf9)])),this[_0x2744e7(0xc4)][_0x2744e7(0x277)]['x']=_0x1f6e66[_0x2744e7(0x284)],this[_0x2744e7(0xc4)][_0x2744e7(0x277)]['y']=_0x1f6e66[_0x2744e7(0x284)],this[_0x2744e7(0x166)](this[_0x2744e7(0xc4)]);},Window_VictoryLevelUp[_0x4b7043(0xb3)][_0x4b7043(0x25e)]=function(){const _0x142a77=_0x4b7043,_0x5d4a9f=new Rectangle(0x0,0x0,this[_0x142a77(0xe9)],this[_0x142a77(0x19c)]);this[_0x142a77(0xef)]=new Window_VictoryLevelUpActor(_0x5d4a9f,this),this[_0x142a77(0x27f)](this[_0x142a77(0xef)]);},Window_VictoryLevelUp[_0x4b7043(0xb3)][_0x4b7043(0x186)]=function(_0x390b96){const _0x53f130=_0x4b7043;Imported[_0x53f130(0xd3)]&&Window_VictoryLevelUp[_0x53f130(0x1e8)]&&(this[_0x53f130(0xc4)]['bitmap']=ImageManager[_0x53f130(0x1da)](_0x390b96[_0x53f130(0x120)]())),SoundManager[_0x53f130(0x19f)](),this[_0x53f130(0xef)][_0x53f130(0x186)](_0x390b96);};function Window_VictoryLevelUpActor(){this['initialize'](...arguments);}Window_VictoryLevelUpActor[_0x4b7043(0x1a2)]=Window_VictoryRewards[_0x4b7043(0x1a2)],Window_VictoryLevelUpActor[_0x4b7043(0x182)]=VisuMZ['VictoryAftermath'][_0x4b7043(0x187)][_0x4b7043(0x1e4)][_0x4b7043(0x1fe)],Window_VictoryLevelUpActor[_0x4b7043(0x20f)]=VisuMZ[_0x4b7043(0x1fd)][_0x4b7043(0x187)][_0x4b7043(0x1e4)][_0x4b7043(0xd8)],Window_VictoryLevelUpActor[_0x4b7043(0xb3)]=Object[_0x4b7043(0x222)](Window_StatusBase[_0x4b7043(0xb3)]),Window_VictoryLevelUpActor[_0x4b7043(0xb3)][_0x4b7043(0x134)]=Window_VictoryLevelUpActor,Window_VictoryLevelUpActor[_0x4b7043(0xb3)][_0x4b7043(0x100)]=function(_0x101537,_0x391d5b){const _0x444c3e=_0x4b7043;this[_0x444c3e(0x129)]=_0x391d5b,Window_StatusBase[_0x444c3e(0xb3)][_0x444c3e(0x100)][_0x444c3e(0x1b1)](this,_0x101537),this['setBackgroundType'](0x2),this[_0x444c3e(0x172)]=0x0,this['_actor']=null,this['refresh']();},Window_VictoryLevelUpActor[_0x4b7043(0xb3)]['updatePadding']=function(){const _0x4cf5c6=_0x4b7043;this[_0x4cf5c6(0x1d9)]=0x0;},Window_VictoryLevelUpActor[_0x4b7043(0xb3)][_0x4b7043(0x1f7)]=function(){const _0x381ab5=_0x4b7043;Window_StatusBase[_0x381ab5(0xb3)][_0x381ab5(0x1f7)]['call'](this),this[_0x381ab5(0x1ba)]();},Window_VictoryLevelUpActor['prototype'][_0x4b7043(0x1ba)]=function(){const _0x442be4=_0x4b7043;this[_0x442be4(0x172)]=this[_0x442be4(0x129)][_0x442be4(0x172)];},Window_VictoryLevelUpActor['prototype'][_0x4b7043(0x186)]=function(_0x578502){const _0x3d3f48=_0x4b7043;this[_0x3d3f48(0x101)]=_0x578502,this[_0x3d3f48(0x244)]();},Window_VictoryLevelUpActor[_0x4b7043(0xb3)][_0x4b7043(0x25f)]=function(){const _0x4a71c6=_0x4b7043,_0x3b5fc1=this[_0x4a71c6(0x101)][_0x4a71c6(0x288)]();return BattleManager[_0x4a71c6(0x10e)][_0x3b5fc1];},Window_VictoryLevelUpActor[_0x4b7043(0xb3)][_0x4b7043(0x210)]=function(){const _0x3e9e81=_0x4b7043,_0x5e3706=this['_actor'][_0x3e9e81(0x288)]();return BattleManager[_0x3e9e81(0x163)][_0x5e3706];},Window_VictoryLevelUpActor[_0x4b7043(0xb3)]['refresh']=function(){const _0x3b79f0=_0x4b7043;Window_StatusBase[_0x3b79f0(0xb3)][_0x3b79f0(0x244)]['call'](this),this[_0x3b79f0(0x126)][_0x3b79f0(0x18d)](),this[_0x3b79f0(0x257)]();if(!this[_0x3b79f0(0x101)])return;this[_0x3b79f0(0xb9)](),this[_0x3b79f0(0x11a)](),this['drawNewLearnedSkills'](),this[_0x3b79f0(0x1e2)]();},Window_VictoryLevelUpActor[_0x4b7043(0xb3)][_0x4b7043(0xb9)]=function(){const _0xe69613=_0x4b7043,_0x102220=this['lineHeight'](),_0x5964a0=TextManager[_0xe69613(0xe8)][_0xe69613(0x103)](this[_0xe69613(0x101)][_0xe69613(0xf3)](),TextManager['level'],this[_0xe69613(0x101)][_0xe69613(0x249)]),_0x24d374=this['textSizeEx'](_0x5964a0)[_0xe69613(0xe9)],_0x5d242a=SceneManager[_0xe69613(0x15c)]['_victoryContinueWindow']['x']+Math[_0xe69613(0x279)]((this[_0xe69613(0xe9)]/0x2-_0x24d374)/0x2),_0x2b47e4=_0x102220;this[_0xe69613(0x180)](_0x5964a0,_0x5d242a,_0x2b47e4,_0x24d374);},Window_VictoryLevelUpActor[_0x4b7043(0xb3)]['drawItemDarkRect']=function(_0x4bfed0,_0x3f03a5,_0x11e901,_0x405445,_0x4d963f){const _0x5a494d=_0x4b7043;if(VisuMZ[_0x5a494d(0x1fd)][_0x5a494d(0x187)][_0x5a494d(0x1e4)]['DrawBackRect']===![])return;_0x4d963f=Math['max'](_0x4d963f||0x1,0x1);while(_0x4d963f--){_0x405445=_0x405445||this['lineHeight'](),this[_0x5a494d(0x126)][_0x5a494d(0x12f)]=0xa0;const _0x471539=ColorManager[_0x5a494d(0x1ee)]();this[_0x5a494d(0x126)][_0x5a494d(0x287)](_0x4bfed0+0x1,_0x3f03a5+0x1,_0x11e901-0x2,_0x405445-0x2,_0x471539),this[_0x5a494d(0x126)][_0x5a494d(0x12f)]=0xff;}},ColorManager[_0x4b7043(0x1ee)]=function(){const _0x5facb2=_0x4b7043,_0x2ee345=VisuMZ[_0x5facb2(0x1fd)]['Settings']['LevelUp'];let _0x44516a=_0x2ee345[_0x5facb2(0x1cf)]!==undefined?_0x2ee345[_0x5facb2(0x1cf)]:0x13;return ColorManager[_0x5facb2(0x1d6)](_0x44516a);},Window_VictoryLevelUpActor[_0x4b7043(0xb3)][_0x4b7043(0x11a)]=function(){const _0x5b65b4=_0x4b7043,_0x26423c=this[_0x5b65b4(0x1ad)](),_0x22b4b5='→',_0x4c9d96=this[_0x5b65b4(0x236)](),_0x371163=_0x26423c*0x2,_0x537847=this[_0x5b65b4(0x19c)]-_0x26423c*5.5,_0x599137=this['textWidth'](_0x22b4b5)+this['itemPadding']()*0x2,_0x352c42=Window_VictoryLevelUpActor[_0x5b65b4(0x182)]?0x4:0x3,_0x44a6cd=Math[_0x5b65b4(0x279)]((this[_0x5b65b4(0xe9)]/0x2-_0x599137-this[_0x5b65b4(0x111)]()*0x2)/_0x352c42),_0x35a834=_0x537847-_0x371163,_0x90b946=VisuMZ[_0x5b65b4(0x1fd)][_0x5b65b4(0x187)][_0x5b65b4(0x1e4)][_0x5b65b4(0x272)],_0x4db384=SceneManager['_scene']['_victoryContinueWindow']['x']+this[_0x5b65b4(0x111)](),_0x3bda58=_0x4db384+_0x44a6cd,_0x46cb86=_0x3bda58+_0x44a6cd,_0x101862=_0x46cb86+_0x599137,_0x35a590=_0x101862+_0x44a6cd;let _0x1cb119=Math[_0x5b65b4(0x279)](_0x371163+(_0x35a834-(_0x4c9d96[_0x5b65b4(0x199)]+(_0x90b946?0x0:0x1))*_0x26423c)/0x2),_0x569e81=0x2;!_0x90b946&&(this[_0x5b65b4(0x257)](),VisuMZ[_0x5b65b4(0x254)]&&(this[_0x5b65b4(0x126)][_0x5b65b4(0x1a6)]=Window_EquipStatus[_0x5b65b4(0xb3)][_0x5b65b4(0xca)]()),this[_0x5b65b4(0x263)](_0x4db384,_0x1cb119,_0x44a6cd,_0x26423c,_0x569e81),this[_0x5b65b4(0x22b)](_0x5b65b4(0x249),_0x4db384,_0x1cb119,_0x44a6cd),this[_0x5b65b4(0x263)](_0x3bda58,_0x1cb119,_0x44a6cd,_0x26423c,_0x569e81),this[_0x5b65b4(0x12a)]('level',_0x3bda58,_0x1cb119,_0x44a6cd),this[_0x5b65b4(0x263)](_0x46cb86,_0x1cb119,_0x599137,_0x26423c,_0x569e81),this[_0x5b65b4(0xb7)](ColorManager[_0x5b65b4(0x243)]()),this['drawText'](_0x22b4b5,_0x46cb86,_0x1cb119,_0x599137,_0x5b65b4(0x123)),this['drawItemDarkRect'](_0x101862,_0x1cb119,_0x44a6cd,_0x26423c,_0x569e81),this['drawParamAfterValue'](_0x5b65b4(0x249),_0x101862,_0x1cb119,_0x44a6cd),Window_VictoryLevelUpActor['_drawParamDiff']&&(this['drawItemDarkRect'](_0x35a590,_0x1cb119,_0x44a6cd,_0x26423c,_0x569e81),this['drawParamDiffValue'](_0x5b65b4(0x249),_0x35a590,_0x1cb119,_0x44a6cd)),_0x1cb119+=_0x26423c,_0x569e81=_0x569e81===0x2?0x1:0x2);for(const _0x2a29de of _0x4c9d96){this[_0x5b65b4(0x257)](),VisuMZ[_0x5b65b4(0x254)]&&(_0x5b65b4(0x130)===_0x5b65b4(0x130)?this[_0x5b65b4(0x126)]['fontSize']=Window_EquipStatus[_0x5b65b4(0xb3)][_0x5b65b4(0xca)]():this[_0x5b65b4(0x172)]+=_0x3eb722[_0x5b65b4(0x1a2)]),this[_0x5b65b4(0x263)](_0x4db384,_0x1cb119,_0x44a6cd,_0x26423c,_0x569e81),this[_0x5b65b4(0x22b)](_0x2a29de,_0x4db384,_0x1cb119,_0x44a6cd),this[_0x5b65b4(0x263)](_0x3bda58,_0x1cb119,_0x44a6cd,_0x26423c,_0x569e81),this[_0x5b65b4(0x12a)](_0x2a29de,_0x3bda58,_0x1cb119,_0x44a6cd),this['drawItemDarkRect'](_0x46cb86,_0x1cb119,_0x599137,_0x26423c,_0x569e81),this[_0x5b65b4(0xb7)](ColorManager[_0x5b65b4(0x243)]()),this[_0x5b65b4(0x1b2)](_0x22b4b5,_0x46cb86,_0x1cb119,_0x599137,_0x5b65b4(0x123)),this[_0x5b65b4(0x263)](_0x101862,_0x1cb119,_0x44a6cd,_0x26423c,_0x569e81),this[_0x5b65b4(0x141)](_0x2a29de,_0x101862,_0x1cb119,_0x44a6cd),Window_VictoryLevelUpActor[_0x5b65b4(0x182)]&&(this[_0x5b65b4(0x263)](_0x35a590,_0x1cb119,_0x44a6cd,_0x26423c,_0x569e81),this[_0x5b65b4(0x127)](_0x2a29de,_0x35a590,_0x1cb119,_0x44a6cd)),_0x1cb119+=_0x26423c,_0x569e81=_0x569e81===0x2?0x1:0x2;}},Window_VictoryLevelUpActor['prototype'][_0x4b7043(0x236)]=function(){const _0x39aa65=_0x4b7043;if(Imported[_0x39aa65(0x138)]){if(_0x39aa65(0x105)===_0x39aa65(0x105))return VisuMZ[_0x39aa65(0x15a)][_0x39aa65(0x187)][_0x39aa65(0x143)]['ExtDisplayedParams'];else{const _0x155c0a=_0x54bf29['VictoryAftermath']['Settings'][_0x39aa65(0x1e4)];this[_0x39aa65(0xc4)]=new _0x19dbd3(),this[_0x39aa65(0xc4)]['anchor']['x']=0.5,this['_actorSprite'][_0x39aa65(0x1d8)]['y']=0x1,this[_0x39aa65(0xc4)][_0x39aa65(0x1d4)]=0x0,this[_0x39aa65(0xc4)]['x']=_0x493039[_0x39aa65(0x279)](_0x57740f(_0x155c0a['BustPosX'])),this[_0x39aa65(0xc4)]['y']=_0x1ff742[_0x39aa65(0x279)](_0x287677(_0x155c0a['BustPosY'])),this[_0x39aa65(0xc4)][_0x39aa65(0x277)]['x']=_0x155c0a[_0x39aa65(0x284)],this[_0x39aa65(0xc4)][_0x39aa65(0x277)]['y']=_0x155c0a[_0x39aa65(0x284)],this[_0x39aa65(0x166)](this['_actorSprite']);}}else{if(_0x39aa65(0x266)===_0x39aa65(0x17a)){this[_0x39aa65(0x257)]();const _0x14a532=this[_0x39aa65(0x1ad)](),_0x3d9934=_0x166cd3['round'](_0x14a532/0x2),_0xd38fba=0x0,_0x1ce5b5=this[_0x39aa65(0x22f)][_0x39aa65(0xe9)]-_0x14a532,_0x3d60f9=_0x39aa65(0x14c);let _0x159234=this[_0x39aa65(0x218)]();this[_0x39aa65(0x22f)][_0x39aa65(0x1b2)](_0x159234,_0x3d9934,_0xd38fba,_0x1ce5b5,_0x14a532,_0x3d60f9);}else return[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];}},Window_VictoryLevelUpActor[_0x4b7043(0xb3)][_0x4b7043(0x22b)]=function(_0x1baad0,_0xa91d61,_0x5117a5,_0x5f53d1){const _0x1c10b7=_0x4b7043;this[_0x1c10b7(0xb7)](ColorManager[_0x1c10b7(0x243)]());let _0xcf387c='';_0x1baad0==='level'?_0xcf387c=TextManager[_0x1c10b7(0x249)]:_0xcf387c=TextManager['param'](_0x1baad0),this[_0x1c10b7(0x1b2)](_0xcf387c,_0xa91d61+this['itemPadding'](),_0x5117a5,_0x5f53d1-this[_0x1c10b7(0x111)]()*0x2);},Window_VictoryLevelUpActor[_0x4b7043(0xb3)][_0x4b7043(0x12a)]=function(_0x59e6cd,_0x10c4e6,_0x43cbc7,_0x145a1d){const _0x4453ed=_0x4b7043,_0x52a05b=this[_0x4453ed(0x25f)]();let _0x6499ec='';_0x59e6cd===_0x4453ed(0x249)?_0x6499ec=_0x52a05b[_0x4453ed(0x249)]:_0x6499ec=Imported[_0x4453ed(0x138)]?_0x52a05b[_0x4453ed(0xe5)](_0x59e6cd,!![]):_0x52a05b[_0x4453ed(0xbf)](_0x59e6cd),this['changeTextColor'](ColorManager[_0x4453ed(0x13f)]()),this[_0x4453ed(0x1b2)](_0x6499ec,_0x10c4e6+this[_0x4453ed(0x111)](),_0x43cbc7,_0x145a1d-this[_0x4453ed(0x111)]()*0x2,_0x4453ed(0x14c));},Window_VictoryLevelUpActor['prototype'][_0x4b7043(0x141)]=function(_0x245076,_0x3403ac,_0x39194f,_0x415e4e){const _0x45cba3=_0x4b7043,_0x151a71=this[_0x45cba3(0x25f)](),_0x27b47c=this['_actor'];let _0xb0d48=0x0,_0x22417d=0x0,_0x5255fc='0';_0x245076===_0x45cba3(0x249)?(_0xb0d48=_0x151a71[_0x45cba3(0x249)],_0x22417d=_0x27b47c[_0x45cba3(0x249)],_0x5255fc=_0x22417d):(_0xb0d48=Imported['VisuMZ_0_CoreEngine']?_0x151a71[_0x45cba3(0xe5)](_0x245076,![]):_0x151a71[_0x45cba3(0xbf)](_0x245076),_0x22417d=Imported[_0x45cba3(0x138)]?_0x27b47c[_0x45cba3(0xe5)](_0x245076,![]):_0x27b47c[_0x45cba3(0xbf)](_0x245076),_0x5255fc=Imported[_0x45cba3(0x138)]?_0x27b47c[_0x45cba3(0xe5)](_0x245076,!![]):_0x22417d);const _0x299294=_0x22417d-_0xb0d48;this['changeTextColor'](ColorManager['paramchangeTextColor'](_0x299294)),this[_0x45cba3(0x1b2)](_0x5255fc,_0x3403ac+this['itemPadding'](),_0x39194f,_0x415e4e-this['itemPadding']()*0x2,_0x45cba3(0x14c));},Window_VictoryLevelUpActor['prototype'][_0x4b7043(0x127)]=function(_0x322291,_0xbdaa79,_0x330de8,_0x1e8738){const _0x3f9c77=_0x4b7043,_0x23e9b1=this[_0x3f9c77(0x25f)](),_0x22d189=this[_0x3f9c77(0x101)];let _0xab8da9=0x0,_0x4c9370=0x0;_0x322291==='level'?_0x3f9c77(0x13e)!==_0x3f9c77(0x13e)?_0x57fccd=_0x380181[_0x3f9c77(0xbf)](_0x54cdab):(_0xab8da9=_0x23e9b1[_0x3f9c77(0x249)],_0x4c9370=_0x22d189[_0x3f9c77(0x249)]):(_0xab8da9=Imported[_0x3f9c77(0x138)]?_0x23e9b1['paramValueByName'](_0x322291,![]):_0x23e9b1['param'](_0x322291),_0x4c9370=Imported[_0x3f9c77(0x138)]?_0x22d189['paramValueByName'](_0x322291,![]):_0x22d189[_0x3f9c77(0xbf)](_0x322291));const _0x5c1f15=_0x4c9370-_0xab8da9;let _0x2f810c=_0x5c1f15;if(_0xab8da9%0x1!==0x0)_0x2f810c=Math[_0x3f9c77(0x279)](_0x5c1f15*0x64)+'%';_0x5c1f15!==0x0&&('NXXsr'!=='NXXsr'?(_0x5a0dbf['replayBgmAndBgs'](),_0x309796[_0x3f9c77(0x237)]=![]):(this[_0x3f9c77(0xb7)](ColorManager[_0x3f9c77(0x217)](_0x5c1f15)),_0x2f810c=(_0x5c1f15>=0x0?_0x3f9c77(0x1c8):_0x3f9c77(0x27c))[_0x3f9c77(0x103)](_0x2f810c),this['drawText'](_0x2f810c,_0xbdaa79+this[_0x3f9c77(0x111)](),_0x330de8,_0x1e8738-this[_0x3f9c77(0x111)]()*0x2,_0x3f9c77(0x1af))));},Window_VictoryLevelUpActor[_0x4b7043(0xb3)][_0x4b7043(0x146)]=function(){const _0x5d36af=_0x4b7043;this[_0x5d36af(0x257)]();const _0x151eb4=this[_0x5d36af(0x27a)]();if(_0x151eb4['length']<=0x0)return;const _0x157884=VisuMZ[_0x5d36af(0x1fd)][_0x5d36af(0x187)][_0x5d36af(0x1e4)][_0x5d36af(0x14b)];while(_0x151eb4['length']>_0x157884){_0x151eb4[_0x5d36af(0xc5)]();}this[_0x5d36af(0x22e)](_0x151eb4),this[_0x5d36af(0x23f)](_0x151eb4);},Window_VictoryLevelUpActor[_0x4b7043(0xb3)][_0x4b7043(0x27a)]=function(){const _0x56805e=_0x4b7043,_0x13a8ac=this[_0x56805e(0x25f)]()[_0x56805e(0x14d)]();return this[_0x56805e(0x101)][_0x56805e(0x27a)](_0x13a8ac);},Window_VictoryLevelUpActor[_0x4b7043(0xb3)][_0x4b7043(0x22e)]=function(_0x5e2a13){const _0x134a89=_0x4b7043,_0x509237=this['lineHeight'](),_0x378b07=_0x134a89(0x24d),_0x21df46=_0x134a89(0x144),_0x35cad9=ColorManager[_0x134a89(0x13f)](),_0x2f6c80=Math[_0x134a89(0x279)](this[_0x134a89(0xe9)]/0x2)-0x64-_0x509237*0x2,_0x9c7340=(_0x5e2a13['length']+0x1)*_0x509237,_0x1bf7c0=_0x509237,_0x278532=this['height']-_0x509237*6.5-_0x9c7340;this[_0x134a89(0x126)][_0x134a89(0x287)](_0x1bf7c0-0x2,_0x278532-0x2,_0x2f6c80+0x4,_0x9c7340+0x4,_0x35cad9),this[_0x134a89(0x126)][_0x134a89(0x16b)](_0x1bf7c0,_0x278532,_0x2f6c80,_0x9c7340),this[_0x134a89(0x126)][_0x134a89(0x229)](_0x1bf7c0,_0x278532,_0x2f6c80,_0x9c7340,_0x378b07,_0x21df46);},Window_VictoryLevelUpActor[_0x4b7043(0xb3)][_0x4b7043(0x23f)]=function(_0x475327){const _0x2b2aa3=_0x4b7043,_0xdb3e8f=this['lineHeight'](),_0x25c4ba=_0x2b2aa3(0x24d),_0xaee7ca='rgba(0,\x200,\x200,\x200.4)',_0x3d444e=ColorManager[_0x2b2aa3(0x13f)](),_0x535e15=Math[_0x2b2aa3(0x279)](this[_0x2b2aa3(0xe9)]/0x2)-0x64-(_0xdb3e8f+this[_0x2b2aa3(0x111)]())*0x2,_0x51a28e=(_0x475327[_0x2b2aa3(0x199)]+0x1)*_0xdb3e8f;let _0x5d3675=_0xdb3e8f+this['itemPadding'](),_0x47cab2=this[_0x2b2aa3(0x19c)]-_0xdb3e8f*6.5-_0x51a28e;const _0x4b3ebe=TextManager[_0x2b2aa3(0x255)][_0x2b2aa3(0x103)](this[_0x2b2aa3(0x101)][_0x2b2aa3(0xf3)]()),_0x14aa3b=this['textSizeEx'](_0x4b3ebe)['width'],_0x1db132=Math[_0x2b2aa3(0x279)](_0x5d3675+(_0x535e15-_0x14aa3b)/0x2);this['drawTextEx'](_0x4b3ebe,_0x1db132,_0x47cab2,_0x14aa3b),_0x47cab2+=_0xdb3e8f,this[_0x2b2aa3(0x126)][_0x2b2aa3(0x287)](_0x5d3675,_0x47cab2-0x1,_0x535e15,0x2,_0x3d444e);for(const _0x9ee47c of _0x475327){if(!_0x9ee47c)continue;this[_0x2b2aa3(0x257)](),this['drawItemName'](_0x9ee47c,_0x5d3675+this[_0x2b2aa3(0x111)](),_0x47cab2,_0x535e15-this['itemPadding']()*0x2),_0x47cab2+=_0xdb3e8f;}},Window_VictoryLevelUpActor[_0x4b7043(0xb3)][_0x4b7043(0x1e2)]=function(){const _0x136193=_0x4b7043,_0x543a0e=this[_0x136193(0x1ad)](),_0x431ff5=Window_VictoryLevelUpActor['_showFace'],_0x2834f1=this[_0x136193(0x251)](),_0x325dce=_0x543a0e*0x4,_0x4cdc23=Math[_0x136193(0x279)]((this[_0x136193(0xe9)]-_0x2834f1)/0x2),_0x4924cd=_0x4cdc23+(_0x431ff5?ImageManager['faceWidth']+0x14:0x0),_0x3e7f9d=this[_0x136193(0x19c)]-_0x543a0e*5.5;let _0x1a79f5=this[_0x136193(0xbd)]();_0x431ff5&&this['drawActorFace'](this[_0x136193(0x101)],_0x4cdc23,_0x3e7f9d,ImageManager[_0x136193(0x271)],ImageManager[_0x136193(0x24f)]),this[_0x136193(0x180)](_0x1a79f5,_0x4924cd,_0x3e7f9d,_0x2834f1-_0x4924cd);},Window_VictoryLevelUpActor[_0x4b7043(0xb3)][_0x4b7043(0x251)]=function(){const _0xce6313=_0x4b7043;let _0x3a86fc=Graphics[_0xce6313(0x1bb)];return Imported[_0xce6313(0x181)]&&(_0x3a86fc=Math[_0xce6313(0xee)](_0x3a86fc,VisuMZ[_0xce6313(0x195)][_0xce6313(0x187)][_0xce6313(0x18f)]['MessageWidth'])),_0x3a86fc-this[_0xce6313(0x111)]()*0x2;},Window_VictoryLevelUpActor[_0x4b7043(0xb3)][_0x4b7043(0xbd)]=function(){const _0x54b1ee=_0x4b7043;return this[_0x54b1ee(0x27a)]()[_0x54b1ee(0x199)]>0x0?TextManager[_0x54b1ee(0x107)](this['_actor'])[_0x54b1ee(0x103)](this[_0x54b1ee(0x101)][_0x54b1ee(0xf3)]()):TextManager[_0x54b1ee(0x1ec)](this[_0x54b1ee(0x101)])[_0x54b1ee(0x103)](this[_0x54b1ee(0x101)][_0x54b1ee(0xf3)]());};