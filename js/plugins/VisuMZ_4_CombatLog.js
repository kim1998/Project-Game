//=============================================================================
// VisuStella MZ - Combat Log
// VisuMZ_4_CombatLog.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_CombatLog = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CombatLog = VisuMZ.CombatLog || {};
VisuMZ.CombatLog.version = 1.13;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.13] [CombatLog]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Combat_Log_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Sometimes text appears way too fast in the battle system or sometimes
 * players may miss what kind of information was delivered on-screen. For times
 * like that, being able to access the Combat Log would be important. The
 * Combat Log records all of the text that appears in the battle log window at
 * the top. The player can access the Combat Log display any time during action
 * selection phase or by holding down the designated Hot Key. Sometimes,
 * players can even review over the Combat Log to try and figure out any kinds
 * of patterns enemies may even have.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Record the events that happen in battle into an accessible Combat Log for
 *   players to go back and review.
 * * Access the Combat Log in-battle through the Party Command Window, Actor
 *   Command Window, or by holding down the Hot Key.
 * * Icons are added to help players quickly differentiate between different
 *   types of events.
 * * Combat Log can have its numbers color-coded to quickly determine their
 *   effects towards action targets.
 * * Players can review past Combat Logs from an option in the Main Menu.
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
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 * 
 * VisuMZ_1_BattleCore
 * 
 * The VisuStella MZ Battle Core's <Battle Commands> notetag can now add in
 * "Combat Log" to its list to have the Combat Log shown as an option to the
 * Actor Command Window. Do remember to have this option enabled in the Plugin
 * Parameters as well.
 * 
 * ---
 *
 * VisuMZ_1_MessageCore
 *
 * By having the VisuStella MZ Message Core installed, you can enable the
 * Auto Color functions for the Combat Log. Do remember to have this option
 * enabled in the Plugin Parameters as well.
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
 * === Bypass-Related Notetags ===
 * 
 * ---
 *
 * <Bypass Combat Log>
 *
 * - Used for: State Notetags
 * - Insert this notetag inside a state to make its state messages ignored.
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
 * === Combat Log Plugin Commands ===
 * 
 * ---
 *
 * Combat Log: Add Text
 * - Adds custom text to the current Combat Log.
 *
 *   Text:
 *   - What text would you like to add to the Combat Log?
 *
 *   Icon:
 *   - What icon would you like to bind to this entry?
 *
 * ---
 *
 * Combat Log: Add Horizontal Line
 * - Adds a horizontal line to the current Combat Log.
 *
 * ---
 *
 * Combat Log: Bypass Text?
 * - Temporarily bypass adding any new text to the Combat Log until this
 *   is turned off?
 *
 *   Bypass?:
 *   - Bypass text from being added to the Combat Log temporarily?
 *
 * ---
 *
 * Combat Log: Hot Key Enable?
 * - Enables/disables the Combat Log hot key in battle?
 *
 *   Enable?:
 *   - Enables/disables the Combat Log hot key in battle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Show in Main Menu?
 * - Shows/hides CombatLog menu inside the Main Menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Combat Log command inside the Main Menu.
 *   - Note! This command will be disabled if the player does not have any
 *     Combat Logs recorded.
 *
 * ---
 *
 * System: Show in Party Command?
 * - Shows/hides CombatLog menu inside the Window_PartyCommand.
 *
 *   Show/Hide?:
 *   - Shows/hides Combat Log command inside Window_PartyCommand.
 *
 * ---
 *
 * System: Show in Actor Command?
 * - Shows/hides CombatLog menu inside the Window_ActorCommand.
 *
 *   Show/Hide?:
 *   - Shows/hides Combat Log command inside Window_ActorCommand.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings for the Combat Log. Determine how the commands appear,
 * the hot key used, and accessibility through the Main Menu, Party Command
 * Window, and Actor Command Window.
 *
 * ---
 *
 * General
 * 
 *   Command Name:
 *   - Name of the 'Combat Log' option in the various menus.
 * 
 *   Icon:
 *   - Icon used for each of the 'Combat Log' options.
 * 
 *   Hot Key:
 *   - This is the key used for quickly opening the Combat Log in battle.
 * 
 *   Stored Logs:
 *   - How many combat logs are stored as a history?
 *   - This affects the Combat Log menu.
 *
 * ---
 *
 * Main Menu
 * 
 *   Show in Main Menu?:
 *   - Add the 'Combat Log' option to the Main Menu by default?
 *   - Note! This command will be disabled if the player does not have any
 *     Combat Logs recorded.
 *
 * ---
 *
 * Window_PartyCommand
 * 
 *   Show in Window?:
 *   - Add the 'Combat Log' option to Window_PartyCommand by default?
 *
 * ---
 *
 * Window_ActorCommand
 * 
 *   Show in Window?:
 *   - Add the 'Combat Log' option to Window_ActorCommand by default?
 * 
 *   Help: Combat Log:
 *   - Help text for Combat Log command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Combat Log Settings
 * ============================================================================
 *
 * Settings regarding the Combat Log contents. Disable any unwanted information
 * you want from here to prevent them from being displayed.
 *
 * ---
 *
 * General
 * 
 *   Show Icons?:
 *   - Show icons in the Combat Log?
 * 
 *   Auto Color?:
 *   - Use auto colors for the Combat Log?
 *   - Requires VisuMZ_1_MessageCore
 * 
 *   Color Numbers?:
 *   - Color numbers for damage differences?
 *
 * ---
 *
 * Battle Start
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *
 * ---
 *
 * Enemy Emerge
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Battle Advantages
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Preemptive Icon:
 *   Surprised Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *
 * ---
 *
 * Start Turn
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Turn Count
 *
 * ---
 *
 * End Turn
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Turn Count
 *
 * ---
 *
 * Battle Victory
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Battle Escape
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Battle Defeat
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Action Text
 * 
 *   Show Skill Message 1?:
 *   - Show this event in the Combat Log?
 * 
 *   Show Skill Message 2?:
 *   - Show this event in the Combat Log?
 * 
 *   Show Item Message?:
 *   - Show this event in the Combat Log?
 *
 * ---
 *
 * HP Settings
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 *
 * ---
 *
 * HP Settings > HP Heal
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * HP Settings > HP Damage
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * HP Settings > No HP Damage
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * MP Settings
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 *
 * ---
 *
 * MP Settings > MP Heal
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * MP Settings > MP Damage
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * MP Settings > No MP Damage
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * TP Settings
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 *
 * ---
 *
 * TP Settings > TP Heal
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * TP Settings > TP Damage
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * TP Settings > No TP Damage
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * State Settings
 * 
 *   Show State Add?:
 *   - Show this event in the Combat Log?
 * 
 *   Show State Remove?:
 *   - Show this event in the Combat Log?
 * 
 *   Show State Current?:
 *   - Show this event in the Combat Log?
 *
 * ---
 *
 * Buff & Debuff Settings
 * 
 *   Show Add Buff?:
 *   - Show this event in the Combat Log?
 * 
 *   Show Add Debuff?:
 *   - Show this event in the Combat Log?
 * 
 *   Show Erase Buff?:
 *   - Show this event in the Combat Log?
 *
 * ---
 *
 * Counterattack
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Reflection
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Substitute
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Effect Failure
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Critical Hit
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Missed Hit
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Evaded Hit
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_CombatLog. Pretty up the scene to fit the rest
 * of your game with these settings!
 *
 * ---
 *
 * Settings
 * 
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 * 
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 * 
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Settings regarding this plugin's windows. These alter how the windows appear
 * in the battle and menu scenes.
 *
 * ---
 *
 * Combat Log (Battle)
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Combat Log (Menu)
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Combat History (Menu)
 * 
 *   Latest Command:
 *   - Text displayed for latest battle.
 *   - %1 - Battle Count
 * 
 *   Past Command:
 *   - Text displayed for past battles.
 *   - %1 - Battle Count
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Compatibility Settings
 * ============================================================================
 *
 * These settings are for creating compatibility with the other VisuStella MZ
 * plugins that can benefit from having their effects recorded inside of the
 * Combat Log.
 *
 * ---
 *
 * Battle System - ATB > Interrupt
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Battle System - CTB > Order Change
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Battle System - STB > Instant
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Anti-Damage Barriers > Cancel Barrier
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name, %2 - State Name
 *
 * ---
 *
 * Anti-Damage Barriers > Nullify Barrier
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name, %2 - State Name
 *
 * ---
 *
 * Anti-Damage Barriers > Reduction Barrier
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name, %2 - State Name
 *
 * ---
 *
 * Anti-Damage Barriers > Absorption Barrier
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name, %2 - State Name, %3 - Damage
 *
 * ---
 *
 * Anti-Damage Barriers > MP Dispersion Barrier
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name, %2 - State Name, %3 - MP
 *
 * ---
 *
 * Anti-Damage Barriers > TP Dispersion Barrier
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name, %2 - State Name, %3 - TP
 *
 * ---
 *
 * Life State Effects > Auto Life
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Life State Effects > Curse
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Life State Effects > Doom
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Life State Effects > Fragile
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Life State Effects > Guts
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Life State Effects > Undead
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Steal Items > Steal Text
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
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
 * * Trihan
 * * Arisu
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.13: November 17, 2022
 * * Documentation Update!
 * ** Added extra clarity for Plugin Parameter "Background Settings".
 * *** This does NOT apply to the battle Combat Log.
 * * Bug Fixes!
 * ** Access to Scene_CombatLog should now be possible without Main Menu Core.
 *    Fix made by Olivia.
 * 
 * Version 1.12: June 23, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.11: January 27, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 6, 2022
 * * Bug Fixes!
 * ** Incorrect text usage for enemy recovery is now fixed. Fix made by Arisu.
 * 
 * Version 1.09: July 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.08: April 9, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia!
 * *** Plugin Parameters > General Settings > Help: Combat Log
 * **** Help text for Combat Log command.
 * 
 * Version 1.07: March 19, 2021
 * * Bug Fixes!
 * ** Combat log should no longer mask some windows from appearing and is now
 *    instead placed as a non-window object. Fix made by Arisu.
 * 
 * Version 1.06: March 12, 2021
 * * Bug Fixes!
 * ** Icons for counters, reflections, and substitutes should now display
 *    properly in the combat log. Fix made by Arisu.
 * ** Turn data should now display properly in TPB-base battle systems.
 *    Fix made by Arisu.
 * ** Switching out to the Options Scene or Party Scene should no longer clear
 *    the Combat Log in-battle. Fix made by Arisu.
 * 
 * Version 1.05: January 22, 2021
 * * Feature Update!
 * ** Dimmed background sprite now expands through the width of the screen
 *    while in battle to no longer display the jagged edges. Update by Irina.
 * 
 * Version 1.04: January 15, 2021
 * * Feature Update!
 * ** Any entries added to the Combat Log with \V[x] will now have their exact
 *    variable data stored at the time instead of displaying their current
 *    variable value. Update made by Irina.
 * 
 * Version 1.03: January 8, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Irina.
 * *** Plugin Parameters > General Settings > Stored Logs
 * **** How many combat logs are stored as a history?
 * 
 * Version 1.02: January 1, 2021
 * * Bug Fixes!
 * ** Compatibility with the Absorption Barrier should be fixed. Fix made by
 *    Yanfly.
 * 
 * Version 1.01: December 25, 2020
 * * Feature Update!
 * ** Combat Log when opened with the hot key will automatically close itself
 *    if the Message Window is open. Update made by Yanfly.
 *
 * Version 1.00: January 15, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CombatLogAddText
 * @text Combat Log: Add Text
 * @desc Adds custom text to the current Combat Log.
 *
 * @arg Text:str
 * @text Text
 * @desc What text would you like to add to the Combat Log?
 * @default Custom
 *
 * @arg Icon:num
 * @text Icon
 * @desc What icon would you like to bind to this entry?
 * @default 87
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CombatLogAddHorzLine
 * @text Combat Log: Add Horizontal Line
 * @desc Adds a horizontal line to the current Combat Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CombatLogBypass
 * @text Combat Log: Bypass Text?
 * @desc Temporarily bypass adding any new text to the Combat Log until this is turned off?
 *
 * @arg Bypass:eval
 * @text Bypass?
 * @type boolean
 * @on Bypass Text
 * @off Add Normally
 * @desc Bypass text from being added to the Combat Log temporarily?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CombatLogEnableHotKey
 * @text Combat Log: Hot Key Enable?
 * @desc Enables/disables the Combat Log hot key in battle?
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables the Combat Log hot key in battle.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowCombatLogMenu
 * @text System: Show in Main Menu?
 * @desc Shows/hides CombatLog menu inside the Main Menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Combat Log command inside the Main Menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowCombatLogParty
 * @text System: Show in Party Command?
 * @desc Shows/hides CombatLog menu inside the Window_PartyCommand.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Combat Log command inside Window_PartyCommand.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowCombatLogActor
 * @text System: Show in Actor Command?
 * @desc Shows/hides CombatLog menu inside the Window_ActorCommand.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Combat Log command inside Window_ActorCommand.
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
 * @param CombatLog
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
 * @desc General settings for the Combat Log.
 * @default {"General":"","Name:str":"Combat Log","Icon:num":"189","HotKey:str":"shift","MainMenu":"","ShowMainMenu:eval":"true","PartyCommand":"","ShowPartyCommand:eval":"true","ActorCommand":"","ShowActorCommand:eval":"true"}
 *
 * @param CombatLog:struct
 * @text Combat Log Settings
 * @type struct<CombatLog>
 * @desc Settings regarding the Combat Log contents.
 * @default {"General":"","ShowIcons:eval":"true","AutoColor:eval":"true","ColorNumbers:eval":"true","BattleStart":"","ShowBattleStart:eval":"true","IconBattleStart:num":"97","TextBattleStart:str":"\\C[4]Battle Start!\\C[0]","EnemyEmerge":"","ShowEnemyEmerge:eval":"true","IconEnemyEmerge:num":"5","Advantages":"","ShowAdvantages:eval":"true","IconPreemptive:num":"77","IconSurprise:num":"78","StartTurn":"","ShowStartTurn:eval":"true","IconStartTurn:num":"97","TextStartTurn:str":"\\C[4]Turn \\C[5]%1\\C[4]: \\C[6]Start!","EndTurn":"","ShowEndTurn:eval":"true","IconEndTurn:num":"97","TextEndTurn:str":"\\C[4]Turn \\C[5]%1\\C[4]: \\C[6]End!","Victory":"","ShowVictory:eval":"true","IconVictory:num":"87","Escape":"","ShowEscape:eval":"true","IconEscape:num":"82","Defeat":"","ShowDefeat:eval":"true","IconDefeat:num":"1","Actions":"","ShowSkillMessage1:eval":"true","ShowSkillMessage2:eval":"true","ShowItemMessage:eval":"true","HP":"","ShowHP:eval":"true","HealHP":"","IconHealHP:num":"72","TextColorHealHP:num":"24","DmgHP":"","IconDmgHP:num":"168","TextColorDmgHP:num":"2","NoDmgHP":"","IconNoDmgHP:num":"81","TextColorNoDmgHP:num":"6","MP":"","ShowMP:eval":"true","HealMP":"","IconHealMP:num":"72","TextColorHealMP:num":"4","DmgMP":"","IconDmgMP:num":"171","TextColorDmgMP:num":"5","NoDmgMP":"","IconNoDmgMP:num":"81","TextColorNoDmgMP:num":"6","TP":"","ShowTP:eval":"true","HealTP":"","IconHealTP:num":"164","TextColorHealTP:num":"24","DmgTP":"","IconDmgTP:num":"170","TextColorDmgTP:num":"28","NoDmgTP":"","IconNoDmgTP:num":"81","TextColorNoDmgTP:num":"6","States":"","ShowStateAdd:eval":"true","ShowStateRemove:eval":"true","ShowStateCurrent:eval":"true","Buffs":"","ShowAddBuff:eval":"true","ShowAddDebuff:eval":"true","ShowEraseBuff:eval":"true","Counter":"","ShowCounter:eval":"true","IconCounter:num":"77","Reflect":"","ShowReflect:eval":"true","IconReflect:num":"81","Subst":"","ShowSubst:eval":"true","IconSubst:num":"81","Fail":"","ShowFail:eval":"true","IconFail:num":"166","Critical":"","ShowCritical:eval":"true","IconCritical:num":"87","Miss":"","ShowMiss:eval":"true","IconMiss:num":"82","Evade":"","ShowEvade:eval":"true","IconEvade:num":"82"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for ONLY Scene_CombatLog.
 * This does NOT apply to the battle Combat Log.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Settings regarding this plugin's windows.
 * @default {"CombatLogBattle":"","CombatLogBattle_BgType:num":"1","CombatLogBattle_RectJS:func":"\"const wx = 0;\\nconst wy = 0;\\nconst ww = Graphics.boxWidth;\\nconst wh = Graphics.boxHeight;\\nreturn new Rectangle(wx, wy, ww, wh);\"","CombatLogMenu":"","CombatLogMenu_BgType:num":"0","CombatLogMenu_RectJS:func":"\"const wx = 0;\\nconst wy = this._historyWindow.y + this._historyWindow.height;\\nconst ww = Graphics.boxWidth;\\nconst wh = this.mainAreaHeight() - this._historyWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","CombatHistory":"","CombatHistoryLatest:str":"Latest","CombatHistoryPrevious:str":"Battle #%1","CombatHistory_BgType:num":"0","CombatHistory_RectJS:func":"\"const ww = Graphics.boxWidth;\\nconst wh = this.calcWindowHeight(1, true);\\nconst wx = 0;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 * 
 * @param -
 *
 * @param Compatibility:struct
 * @text Compatibility Settings
 * @type struct<Compatibility>
 * @desc Compatibility settings with other VisuStella MZ plugins.
 * @default {"VisuMZ_2_BattleSystemATB":"","VisuMZ_2_BattleSystemATB_Interrupt":"","ShowBattleSysAtbInterrupt:eval":"true","IconBattleSysAtbInterrupt:num":"78","TextBattleSysAtbInterrupt:str":"%1 has been interrupted!","VisuMZ_2_BattleSystemCTB":"","VisuMZ_2_BattleSystemCTB_OrderChange":"","ShowBattleSysCtbOrderChange:eval":"true","IconBattleSysCtbOrderChange:num":"75","TextBattleSysCtbOrderChange:str":"%1's turn order has changed!","VisuMZ_2_BattleSystemSTB":"","VisuMZ_2_BattleSystemSTB_Instant":"","ShowBattleSysStbInstant:eval":"true","IconBattleSysStbInstant:num":"73","TextBattleSysStbInstant:str":"%1's gains an extra action!","VisuMZ_3_AntiDmgBarriers":"","VisuMZ_3_AntiDmgBarriers_Cancel":"","Show_AntiDmgBarrier_Cancel:eval":"true","Text_AntiDmgBarrier_Cancel:str":"%2 cancels damage for %1!","VisuMZ_3_AntiDmgBarriers_Nullify":"","Show_AntiDmgBarrier_Nullify:eval":"true","Text_AntiDmgBarrier_Nullify:str":"%2 nullifies damage for %1!","VisuMZ_3_AntiDmgBarriers_Reduce":"","Show_AntiDmgBarrier_Reduce:eval":"true","Text_AntiDmgBarrier_Reduce:str":"%2 reduces damage for %1!","VisuMZ_3_AntiDmgBarriers_Absorb":"","Show_AntiDmgBarrier_Absorb:eval":"true","Text_AntiDmgBarrier_Absorb:str":"%2 absorbs \\C[5]%2\\C[0] damage for %1!","VisuMZ_3_AntiDmgBarriers_MpDisperse":"","Show_AntiDmgBarrier_MpDisperse:eval":"true","Text_AntiDmgBarrier_MpDisperse:str":"%2 dispersed damage to %1's %3!","VisuMZ_3_AntiDmgBarriers_TpDisperse":"","Show_AntiDmgBarrier_TpDisperse:eval":"true","Text_AntiDmgBarrier_TpDisperse:str":"%2 dispersed damage to %1's %3!","VisuMZ_3_LifeStateEffects":"","VisuMZ_3_LifeStateEffects_AutoLife":"","Show_LifeStateEffects_AutoLife:eval":"true","Icon_LifeStateEffects_AutoLife:num":"70","Text_LifeStateEffects_AutoLife:str":"%1 is automatically revived!","VisuMZ_3_LifeStateEffects_Curse":"","Show_LifeStateEffects_Curse:eval":"true","Icon_LifeStateEffects_Curse:num":"71","Text_LifeStateEffects_Curse:str":"%1's curse takes hold...","VisuMZ_3_LifeStateEffects_Doom":"","Show_LifeStateEffects_Doom:eval":"true","Icon_LifeStateEffects_Doom:num":"1","Text_LifeStateEffects_Doom:str":"%1 has fallen to doom.","VisuMZ_3_LifeStateEffects_Fragile":"","Show_LifeStateEffects_Fragile:eval":"true","Icon_LifeStateEffects_Fragile:num":"166","Text_LifeStateEffects_Fragile:str":"%1 was too fragile!","VisuMZ_3_LifeStateEffects_Guts":"","Show_LifeStateEffects_Guts:eval":"true","Icon_LifeStateEffects_Guts:num":"77","Text_LifeStateEffects_Guts:str":"%1 powers through a fatal blow!","VisuMZ_3_LifeStateEffects_Undead":"","Show_LifeStateEffects_Undead:eval":"true","Icon_LifeStateEffects_Undead:num":"10","Text_LifeStateEffects_Undead:str":"%1 suffers from being undead!","VisuMZ_3_StealItems":"","VisuMZ_3_StealItems_Steal":"","Show_StealItems_Steal:eval":"true","Icon_StealItems_Steal:num":"142"}
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
 * @param Name:str
 * @text Command Name
 * @parent General
 * @desc Name of the 'Combat Log' option in the various menus.
 * @default Combat Log
 *
 * @param Icon:num
 * @text Icon
 * @parent General
 * @desc Icon used for each of the 'Combat Log' options.
 * @default 189
 *
 * @param HotKey:str
 * @text Hot Key
 * @parent General
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for quickly opening the Combat Log in battle.
 * @default shift
 *
 * @param StoredLogs:num
 * @text Stored Logs
 * @parent General
 * @desc How many combat logs are stored as a history?
 * This affects the Combat Log menu.
 * @default 5
 *
 * @param MainMenu
 * @text Main Menu
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @parent MainMenu
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Combat Log' option to the Main Menu by default?
 * @default true
 *
 * @param PartyCommand
 * @text Window_PartyCommand
 *
 * @param ShowPartyCommand:eval
 * @text Show in Window?
 * @parent PartyCommand
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Combat Log' option to Window_PartyCommand by default?
 * @default true
 *
 * @param ActorCommand
 * @text Window_ActorCommand
 *
 * @param ShowActorCommand:eval
 * @text Show in Window?
 * @parent ActorCommand
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Combat Log' option to Window_ActorCommand by default?
 * @default true
 *
 * @param BattleHelpCombatLog:json
 * @text Help: Combat Log
 * @parent ActorCommand
 * @type note
 * @desc Help text for Combat Log command.
 * Requires VisuMZ_1_BattleCore!
 * @default "View the combat log."
 *
 */
/* ----------------------------------------------------------------------------
 * Combat Log Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CombatLog:
 *
 * @param General
 *
 * @param ShowIcons:eval
 * @text Show Icons?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show icons in the Combat Log?
 * @default true
 *
 * @param AutoColor:eval
 * @text Auto Color?
 * @parent General
 * @type boolean
 * @on Use Auto Color
 * @off Don't Use
 * @desc Use auto colors for the Combat Log?
 * Requires VisuMZ_1_MessageCore
 * @default true
 *
 * @param ColorNumbers:eval
 * @text Color Numbers?
 * @parent General
 * @type boolean
 * @on Color Numbers
 * @off Don't Color
 * @desc Color numbers for damage differences?
 * @default true
 * 
 * @param BattleStart
 * @text Battle Start
 *
 * @param ShowBattleStart:eval
 * @text Show?
 * @parent BattleStart
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconBattleStart:num
 * @text Icon
 * @parent BattleStart
 * @desc Icon used for this event in the Combat Log.
 * @default 97
 *
 * @param TextBattleStart:str
 * @text Text
 * @parent BattleStart
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes.
 * @default \C[4]Battle Start!\C[0]
 * 
 * @param EnemyEmerge
 * @text Enemy Emerge
 *
 * @param ShowEnemyEmerge:eval
 * @text Show?
 * @parent EnemyEmerge
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconEnemyEmerge:num
 * @text Icon
 * @parent EnemyEmerge
 * @desc Icon used for this event in the Combat Log.
 * @default 5
 * 
 * @param Advantages
 * @text Battle Advantages
 *
 * @param ShowAdvantages:eval
 * @text Show?
 * @parent Advantages
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconPreemptive:num
 * @text Preemptive Icon
 * @parent Advantages
 * @desc Icon used for this event in the Combat Log.
 * @default 77
 *
 * @param IconSurprise:num
 * @text Surprised Icon
 * @parent Advantages
 * @desc Icon used for this event in the Combat Log.
 * @default 78
 * 
 * @param StartTurn
 * @text Start Turn
 *
 * @param ShowStartTurn:eval
 * @text Show?
 * @parent StartTurn
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconStartTurn:num
 * @text Icon
 * @parent StartTurn
 * @desc Icon used for this event in the Combat Log.
 * @default 97
 *
 * @param TextStartTurn:str
 * @text Text
 * @parent StartTurn
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Turn Count
 * @default \C[4]Turn \C[5]%1\C[4]: \C[6]Start!
 * 
 * @param EndTurn
 * @text End Turn
 *
 * @param ShowEndTurn:eval
 * @text Show?
 * @parent EndTurn
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconEndTurn:num
 * @text Icon
 * @parent EndTurn
 * @desc Icon used for this event in the Combat Log.
 * @default 97
 *
 * @param TextEndTurn:str
 * @text Text
 * @parent EndTurn
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Turn Count
 * @default \C[4]Turn \C[5]%1\C[4]: \C[6]End!
 * 
 * @param Victory
 * @text Battle Victory
 *
 * @param ShowVictory:eval
 * @text Show?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconVictory:num
 * @text Icon
 * @parent Victory
 * @desc Icon used for this event in the Combat Log.
 * @default 87
 * 
 * @param Escape
 * @text Battle Escape
 *
 * @param ShowEscape:eval
 * @text Show?
 * @parent Escape
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconEscape:num
 * @text Icon
 * @parent Escape
 * @desc Icon used for this event in the Combat Log.
 * @default 82
 * 
 * @param Defeat
 * @text Battle Defeat
 *
 * @param ShowDefeat:eval
 * @text Show?
 * @parent Defeat
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconDefeat:num
 * @text Icon
 * @parent Defeat
 * @desc Icon used for this event in the Combat Log.
 * @default 1
 * 
 * @param Actions
 * @text Action Text
 *
 * @param ShowSkillMessage1:eval
 * @text Show Skill Message 1?
 * @parent Actions
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param ShowSkillMessage2:eval
 * @text Show Skill Message 2?
 * @parent Actions
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param ShowItemMessage:eval
 * @text Show Item Message?
 * @parent Actions
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 * 
 * @param HP
 * @text HP Settings
 *
 * @param ShowHP:eval
 * @text Show?
 * @parent HP
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 * 
 * @param HealHP
 * @text HP Heal
 * @parent HP
 *
 * @param IconHealHP:num
 * @text Icon
 * @parent HealHP
 * @desc Icon used for this event in the Combat Log.
 * @default 72
 *
 * @param TextColorHealHP:num
 * @text Text Color
 * @parent HealHP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 24
 * 
 * @param DmgHP
 * @text HP Damage
 * @parent HP
 *
 * @param IconDmgHP:num
 * @text Icon
 * @parent DmgHP
 * @desc Icon used for this event in the Combat Log.
 * @default 168
 *
 * @param TextColorDmgHP:num
 * @text Text Color
 * @parent DmgHP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 2
 * 
 * @param NoDmgHP
 * @text No HP Damage
 * @parent HP
 *
 * @param IconNoDmgHP:num
 * @text Icon
 * @parent NoDmgHP
 * @desc Icon used for this event in the Combat Log.
 * @default 81
 *
 * @param TextColorNoDmgHP:num
 * @text Text Color
 * @parent NoDmgHP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 6
 * 
 * @param MP
 * @text MP Settings
 *
 * @param ShowMP:eval
 * @text Show?
 * @parent MP
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 * 
 * @param HealMP
 * @text MP Heal
 * @parent MP
 *
 * @param IconHealMP:num
 * @text Icon
 * @parent HealMP
 * @desc Icon used for this event in the Combat Log.
 * @default 72
 *
 * @param TextColorHealMP:num
 * @text Text Color
 * @parent HealMP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 4
 * 
 * @param DmgMP
 * @text MP Damage
 * @parent MP
 *
 * @param IconDmgMP:num
 * @text Icon
 * @parent DmgMP
 * @desc Icon used for this event in the Combat Log.
 * @default 171
 *
 * @param TextColorDmgMP:num
 * @text Text Color
 * @parent DmgMP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 5
 * 
 * @param NoDmgMP
 * @text No MP Damage
 * @parent MP
 *
 * @param IconNoDmgMP:num
 * @text Icon
 * @parent NoDmgMP
 * @desc Icon used for this event in the Combat Log.
 * @default 81
 *
 * @param TextColorNoDmgMP:num
 * @text Text Color
 * @parent NoDmgMP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 6
 * 
 * @param TP
 * @text TP Settings
 *
 * @param ShowTP:eval
 * @text Show?
 * @parent TP
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 * 
 * @param HealTP
 * @text TP Heal
 * @parent TP
 *
 * @param IconHealTP:num
 * @text Icon
 * @parent HealTP
 * @desc Icon used for this event in the Combat Log.
 * @default 164
 *
 * @param TextColorHealTP:num
 * @text Text Color
 * @parent HealTP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 24
 * 
 * @param DmgTP
 * @text TP Damage
 * @parent TP
 *
 * @param IconDmgTP:num
 * @text Icon
 * @parent DmgTP
 * @desc Icon used for this event in the Combat Log.
 * @default 170
 *
 * @param TextColorDmgTP:num
 * @text Text Color
 * @parent DmgTP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 28
 * 
 * @param NoDmgTP
 * @text No TP Damage
 * @parent TP
 *
 * @param IconNoDmgTP:num
 * @text Icon
 * @parent NoDmgTP
 * @desc Icon used for this event in the Combat Log.
 * @default 81
 *
 * @param TextColorNoDmgTP:num
 * @text Text Color
 * @parent NoDmgTP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 6
 * 
 * @param States
 * @text State Settings
 *
 * @param ShowStateAdd:eval
 * @text Show State Add?
 * @parent States
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param ShowStateRemove:eval
 * @text Show State Remove?
 * @parent States
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param ShowStateCurrent:eval
 * @text Show State Current?
 * @parent States
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 * 
 * @param Buffs
 * @text Buff & Debuff Settings
 *
 * @param ShowAddBuff:eval
 * @text Show Add Buff?
 * @parent Buffs
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param ShowAddDebuff:eval
 * @text Show Add Debuff?
 * @parent Buffs
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param ShowEraseBuff:eval
 * @text Show Erase Buff?
 * @parent Buffs
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 * 
 * @param Counter
 * @text Counterattack
 *
 * @param ShowCounter:eval
 * @text Show?
 * @parent Counter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconCounter:num
 * @text Icon
 * @parent Counter
 * @desc Icon used for this event in the Combat Log.
 * @default 77
 * 
 * @param Reflect
 * @text Reflection
 *
 * @param ShowReflect:eval
 * @text Show?
 * @parent Reflect
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconReflect:num
 * @text Icon
 * @parent Reflect
 * @desc Icon used for this event in the Combat Log.
 * @default 81
 * 
 * @param Subst
 * @text Substitute
 *
 * @param ShowSubst:eval
 * @text Show?
 * @parent Subst
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconSubst:num
 * @text Icon
 * @parent Subst
 * @desc Icon used for this event in the Combat Log.
 * @default 81
 * 
 * @param Fail
 * @text Effect Failure
 *
 * @param ShowFail:eval
 * @text Show?
 * @parent Fail
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconFail:num
 * @text Icon
 * @parent Fail
 * @desc Icon used for this event in the Combat Log.
 * @default 166
 * 
 * @param Critical
 * @text Critical Hit
 *
 * @param ShowCritical:eval
 * @text Show?
 * @parent Critical
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconCritical:num
 * @text Icon
 * @parent Critical
 * @desc Icon used for this event in the Combat Log.
 * @default 87
 * 
 * @param Miss
 * @text Missed Hit
 *
 * @param ShowMiss:eval
 * @text Show?
 * @parent Miss
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconMiss:num
 * @text Icon
 * @parent Miss
 * @desc Icon used for this event in the Combat Log.
 * @default 82
 * 
 * @param Evade
 * @text Evaded Hit
 *
 * @param ShowEvade:eval
 * @text Show?
 * @parent Evade
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconEvade:num
 * @text Icon
 * @parent Evade
 * @desc Icon used for this event in the Combat Log.
 * @default 82
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param CombatLogBattle
 * @text Combat Log (Battle)
 *
 * @param CombatLogBattle_BgType:num
 * @text Background Type
 * @parent CombatLogBattle
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 1
 *
 * @param CombatLogBattle_RectJS:func
 * @text JS: X, Y, W, H
 * @parent CombatLogBattle
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = 0;\nconst ww = Graphics.boxWidth;\nconst wh = Graphics.boxHeight;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param CombatLogMenu
 * @text Combat Log (Menu)
 *
 * @param CombatLogMenu_BgType:num
 * @text Background Type
 * @parent CombatLogMenu
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
 * @param CombatLogMenu_RectJS:func
 * @text JS: X, Y, W, H
 * @parent CombatLogMenu
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this._historyWindow.y + this._historyWindow.height;\nconst ww = Graphics.boxWidth;\nconst wh = this.mainAreaHeight() - this._historyWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param CombatHistory
 * @text Combat History (Menu)
 *
 * @param CombatHistoryLatest:str
 * @text Latest Command
 * @parent CombatHistory
 * @desc Text displayed for latest battle.
 * %1 - Battle Count
 * @default Latest
 *
 * @param CombatHistoryPrevious:str
 * @text Past Command
 * @parent CombatHistory
 * @desc Text displayed for past battles.
 * %1 - Battle Count
 * @default Battle #%1
 *
 * @param CombatHistory_BgType:num
 * @text Background Type
 * @parent CombatHistory
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
 * @param CombatHistory_RectJS:func
 * @text JS: X, Y, W, H
 * @parent CombatHistory
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth;\nconst wh = this.calcWindowHeight(1, true);\nconst wx = 0;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Compatibility Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Compatibility:
 *
 * @param VisuMZ_2_BattleSystemATB
 * @text Battle System - ATB
 * 
 * @param VisuMZ_2_BattleSystemATB_Interrupt
 * @text Interrupt
 * @parent VisuMZ_2_BattleSystemATB
 *
 * @param ShowBattleSysAtbInterrupt:eval
 * @text Show?
 * @parent VisuMZ_2_BattleSystemATB_Interrupt
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconBattleSysAtbInterrupt:num
 * @text Icon
 * @parent VisuMZ_2_BattleSystemATB_Interrupt
 * @desc Icon used for this event in the Combat Log.
 * @default 78
 *
 * @param TextBattleSysAtbInterrupt:str
 * @text Text
 * @parent VisuMZ_2_BattleSystemATB_Interrupt
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1 has been interrupted!
 *
 * @param VisuMZ_2_BattleSystemCTB
 * @text Battle System - CTB
 * 
 * @param VisuMZ_2_BattleSystemCTB_OrderChange
 * @text Order Change
 * @parent VisuMZ_2_BattleSystemCTB
 *
 * @param ShowBattleSysCtbOrderChange:eval
 * @text Show?
 * @parent VisuMZ_2_BattleSystemCTB_OrderChange
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconBattleSysCtbOrderChange:num
 * @text Icon
 * @parent VisuMZ_2_BattleSystemCTB_OrderChange
 * @desc Icon used for this event in the Combat Log.
 * @default 75
 *
 * @param TextBattleSysCtbOrderChange:str
 * @text Text
 * @parent VisuMZ_2_BattleSystemCTB_OrderChange
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1's turn order has changed!
 *
 * @param VisuMZ_2_BattleSystemSTB
 * @text Battle System - STB
 * 
 * @param VisuMZ_2_BattleSystemSTB_Instant
 * @text Instant
 * @parent VisuMZ_2_BattleSystemSTB
 *
 * @param ShowBattleSysStbInstant:eval
 * @text Show?
 * @parent VisuMZ_2_BattleSystemSTB_Instant
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconBattleSysStbInstant:num
 * @text Icon
 * @parent VisuMZ_2_BattleSystemSTB_Instant
 * @desc Icon used for this event in the Combat Log.
 * @default 73
 *
 * @param TextBattleSysStbInstant:str
 * @text Text
 * @parent VisuMZ_2_BattleSystemSTB_Instant
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1's gains an extra action!
 *
 * @param VisuMZ_3_AntiDmgBarriers
 * @text Anti-Damage Barriers
 * 
 * @param VisuMZ_3_AntiDmgBarriers_Cancel
 * @text Cancel Barrier
 * @parent VisuMZ_3_AntiDmgBarriers
 *
 * @param Show_AntiDmgBarrier_Cancel:eval
 * @text Show?
 * @parent VisuMZ_3_AntiDmgBarriers_Cancel
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Text_AntiDmgBarrier_Cancel:str
 * @text Text
 * @parent VisuMZ_3_AntiDmgBarriers_Cancel
 * @desc Text displayed for this event in the Combat Log.
 * %1 - Target Name, %2 - State Name
 * @default %2 cancels damage for %1!
 * 
 * @param VisuMZ_3_AntiDmgBarriers_Nullify
 * @text Nullify Barrier
 * @parent VisuMZ_3_AntiDmgBarriers
 *
 * @param Show_AntiDmgBarrier_Nullify:eval
 * @text Show?
 * @parent VisuMZ_3_AntiDmgBarriers_Nullify
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Text_AntiDmgBarrier_Nullify:str
 * @text Text
 * @parent VisuMZ_3_AntiDmgBarriers_Nullify
 * @desc Text displayed for this event in the Combat Log.
 * %1 - Target Name, %2 - State Name
 * @default %2 nullifies damage for %1!
 * 
 * @param VisuMZ_3_AntiDmgBarriers_Reduce
 * @text Reduction Barrier
 * @parent VisuMZ_3_AntiDmgBarriers
 *
 * @param Show_AntiDmgBarrier_Reduce:eval
 * @text Show?
 * @parent VisuMZ_3_AntiDmgBarriers_Reduce
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Text_AntiDmgBarrier_Reduce:str
 * @text Text
 * @parent VisuMZ_3_AntiDmgBarriers_Reduce
 * @desc Text displayed for this event in the Combat Log.
 * %1 - Target Name, %2 - State Name
 * @default %2 reduces damage for %1!
 * 
 * @param VisuMZ_3_AntiDmgBarriers_Reduce
 * @text Reduction Barrier
 * @parent VisuMZ_3_AntiDmgBarriers
 *
 * @param Show_AntiDmgBarrier_Reduce:eval
 * @text Show?
 * @parent VisuMZ_3_AntiDmgBarriers_Reduce
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Text_AntiDmgBarrier_Reduce:str
 * @text Text
 * @parent VisuMZ_3_AntiDmgBarriers_Reduce
 * @desc Text displayed for this event in the Combat Log.
 * %1 - Target Name, %2 - State Name
 * @default %2 reduces damage for %1!
 * 
 * @param VisuMZ_3_AntiDmgBarriers_Absorb
 * @text Absorption Barrier
 * @parent VisuMZ_3_AntiDmgBarriers
 *
 * @param Show_AntiDmgBarrier_Absorb:eval
 * @text Show?
 * @parent VisuMZ_3_AntiDmgBarriers_Absorb
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Text_AntiDmgBarrier_Absorb:str
 * @text Text
 * @parent VisuMZ_3_AntiDmgBarriers_Absorb
 * @desc Text displayed for this event in the Combat Log.
 * %1 - Target Name, %2 - State Name, %3 - Damage
 * @default %2 absorbs \C[5]%2\C[0] damage for %1!
 * 
 * @param VisuMZ_3_AntiDmgBarriers_MpDisperse
 * @text MP Dispersion Barrier
 * @parent VisuMZ_3_AntiDmgBarriers
 *
 * @param Show_AntiDmgBarrier_MpDisperse:eval
 * @text Show?
 * @parent VisuMZ_3_AntiDmgBarriers_MpDisperse
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Text_AntiDmgBarrier_MpDisperse:str
 * @text Text
 * @parent VisuMZ_3_AntiDmgBarriers_MpDisperse
 * @desc Text displayed for this event in the Combat Log.
 * %1 - Target Name, %2 - State Name, %3 - MP
 * @default %2 dispersed damage to %1's %3!
 * 
 * @param VisuMZ_3_AntiDmgBarriers_TpDisperse
 * @text TP Dispersion Barrier
 * @parent VisuMZ_3_AntiDmgBarriers
 *
 * @param Show_AntiDmgBarrier_TpDisperse:eval
 * @text Show?
 * @parent VisuMZ_3_AntiDmgBarriers_TpDisperse
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Text_AntiDmgBarrier_TpDisperse:str
 * @text Text
 * @parent VisuMZ_3_AntiDmgBarriers_TpDisperse
 * @desc Text displayed for this event in the Combat Log.
 * %1 - Target Name, %2 - State Name, %3 - TP
 * @default %2 dispersed damage to %1's %3!
 *
 * @param VisuMZ_3_LifeStateEffects
 * @text Life State Effects
 * 
 * @param VisuMZ_3_LifeStateEffects_AutoLife
 * @text Auto Life
 * @parent VisuMZ_3_LifeStateEffects
 *
 * @param Show_LifeStateEffects_AutoLife:eval
 * @text Show?
 * @parent VisuMZ_3_LifeStateEffects_AutoLife
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Icon_LifeStateEffects_AutoLife:num
 * @text Icon
 * @parent VisuMZ_3_LifeStateEffects_AutoLife
 * @desc Icon used for this event in the Combat Log.
 * @default 70
 *
 * @param Text_LifeStateEffects_AutoLife:str
 * @text Text
 * @parent VisuMZ_3_LifeStateEffects_AutoLife
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1 is automatically revived!
 * 
 * @param VisuMZ_3_LifeStateEffects_Curse
 * @text Curse
 * @parent VisuMZ_3_LifeStateEffects
 *
 * @param Show_LifeStateEffects_Curse:eval
 * @text Show?
 * @parent VisuMZ_3_LifeStateEffects_Curse
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Icon_LifeStateEffects_Curse:num
 * @text Icon
 * @parent VisuMZ_3_LifeStateEffects_Curse
 * @desc Icon used for this event in the Combat Log.
 * @default 71
 *
 * @param Text_LifeStateEffects_Curse:str
 * @text Text
 * @parent VisuMZ_3_LifeStateEffects_Curse
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1's curse takes hold...
 * 
 * @param VisuMZ_3_LifeStateEffects_Doom
 * @text Doom
 * @parent VisuMZ_3_LifeStateEffects
 *
 * @param Show_LifeStateEffects_Doom:eval
 * @text Show?
 * @parent VisuMZ_3_LifeStateEffects_Doom
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Icon_LifeStateEffects_Doom:num
 * @text Icon
 * @parent VisuMZ_3_LifeStateEffects_Doom
 * @desc Icon used for this event in the Combat Log.
 * @default 1
 *
 * @param Text_LifeStateEffects_Doom:str
 * @text Text
 * @parent VisuMZ_3_LifeStateEffects_Doom
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1 has fallen to doom.
 * 
 * @param VisuMZ_3_LifeStateEffects_Fragile
 * @text Fragile
 * @parent VisuMZ_3_LifeStateEffects
 *
 * @param Show_LifeStateEffects_Fragile:eval
 * @text Show?
 * @parent VisuMZ_3_LifeStateEffects_Fragile
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Icon_LifeStateEffects_Fragile:num
 * @text Icon
 * @parent VisuMZ_3_LifeStateEffects_Fragile
 * @desc Icon used for this event in the Combat Log.
 * @default 166
 *
 * @param Text_LifeStateEffects_Fragile:str
 * @text Text
 * @parent VisuMZ_3_LifeStateEffects_Fragile
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1 was too fragile!
 * 
 * @param VisuMZ_3_LifeStateEffects_Guts
 * @text Guts
 * @parent VisuMZ_3_LifeStateEffects
 *
 * @param Show_LifeStateEffects_Guts:eval
 * @text Show?
 * @parent VisuMZ_3_LifeStateEffects_Guts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Icon_LifeStateEffects_Guts:num
 * @text Icon
 * @parent VisuMZ_3_LifeStateEffects_Guts
 * @desc Icon used for this event in the Combat Log.
 * @default 77
 *
 * @param Text_LifeStateEffects_Guts:str
 * @text Text
 * @parent VisuMZ_3_LifeStateEffects_Guts
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1 powers through a fatal blow!
 * 
 * @param VisuMZ_3_LifeStateEffects_Undead
 * @text Undead
 * @parent VisuMZ_3_LifeStateEffects
 *
 * @param Show_LifeStateEffects_Undead:eval
 * @text Show?
 * @parent VisuMZ_3_LifeStateEffects_Undead
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Icon_LifeStateEffects_Undead:num
 * @text Icon
 * @parent VisuMZ_3_LifeStateEffects_Undead
 * @desc Icon used for this event in the Combat Log.
 * @default 10
 *
 * @param Text_LifeStateEffects_Undead:str
 * @text Text
 * @parent VisuMZ_3_LifeStateEffects_Undead
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1 suffers from being undead!
 *
 * @param VisuMZ_3_StealItems
 * @text Steal Items
 * 
 * @param VisuMZ_3_StealItems_Steal
 * @text Steal Text
 * @parent VisuMZ_3_StealItems
 *
 * @param Show_StealItems_Steal:eval
 * @text Show?
 * @parent VisuMZ_3_StealItems_Steal
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Icon_StealItems_Steal:num
 * @text Icon
 * @parent VisuMZ_3_StealItems_Steal
 * @desc Icon used for this event in the Combat Log.
 * @default 142
 *
 */
//=============================================================================

const _0x18674e=_0x2c10;(function(_0x5975d7,_0x50e759){const _0x52de56=_0x2c10,_0x470db0=_0x5975d7();while(!![]){try{const _0x42a59d=-parseInt(_0x52de56(0x394))/0x1+parseInt(_0x52de56(0x3af))/0x2*(-parseInt(_0x52de56(0x2a8))/0x3)+-parseInt(_0x52de56(0x259))/0x4*(parseInt(_0x52de56(0x2d2))/0x5)+parseInt(_0x52de56(0x2e3))/0x6*(parseInt(_0x52de56(0x1e8))/0x7)+-parseInt(_0x52de56(0x2ca))/0x8*(parseInt(_0x52de56(0x24b))/0x9)+-parseInt(_0x52de56(0x2cb))/0xa+parseInt(_0x52de56(0x339))/0xb;if(_0x42a59d===_0x50e759)break;else _0x470db0['push'](_0x470db0['shift']());}catch(_0x4e7c69){_0x470db0['push'](_0x470db0['shift']());}}}(_0x6674,0xb4d0d));var label='CombatLog',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x18674e(0x33b)](function(_0x6132cc){const _0x39c60b=_0x18674e;return _0x6132cc[_0x39c60b(0x2af)]&&_0x6132cc['description']['includes']('['+label+']');})[0x0];VisuMZ[label][_0x18674e(0x350)]=VisuMZ[label][_0x18674e(0x350)]||{},VisuMZ['ConvertParams']=function(_0x21fe41,_0x356434){const _0x307ccc=_0x18674e;for(const _0x4964a9 in _0x356434){if(_0x307ccc(0x279)!==_0x307ccc(0x279)){if(_0x54cb72['criticalToActor']){let _0x54b93a=_0x168c5a[_0x307ccc(0x302)],_0x42cb58=_0x4d06a3[_0x307ccc(0x21f)];_0x121c96['addTextToCombatLog'](_0x54b93a,_0x42cb58);}}else{if(_0x4964a9['match'](/(.*):(.*)/i)){const _0x3f6277=String(RegExp['$1']),_0x4ad7b7=String(RegExp['$2'])[_0x307ccc(0x3b0)]()['trim']();let _0x3ea093,_0xcf1bb0,_0xa94201;switch(_0x4ad7b7){case _0x307ccc(0x243):_0x3ea093=_0x356434[_0x4964a9]!==''?Number(_0x356434[_0x4964a9]):0x0;break;case _0x307ccc(0x2bb):_0xcf1bb0=_0x356434[_0x4964a9]!==''?JSON['parse'](_0x356434[_0x4964a9]):[],_0x3ea093=_0xcf1bb0[_0x307ccc(0x2ee)](_0x1b2878=>Number(_0x1b2878));break;case _0x307ccc(0x375):_0x3ea093=_0x356434[_0x4964a9]!==''?eval(_0x356434[_0x4964a9]):null;break;case _0x307ccc(0x284):_0xcf1bb0=_0x356434[_0x4964a9]!==''?JSON[_0x307ccc(0x1ec)](_0x356434[_0x4964a9]):[],_0x3ea093=_0xcf1bb0[_0x307ccc(0x2ee)](_0x5b451d=>eval(_0x5b451d));break;case'JSON':_0x3ea093=_0x356434[_0x4964a9]!==''?JSON[_0x307ccc(0x1ec)](_0x356434[_0x4964a9]):'';break;case _0x307ccc(0x208):_0xcf1bb0=_0x356434[_0x4964a9]!==''?JSON[_0x307ccc(0x1ec)](_0x356434[_0x4964a9]):[],_0x3ea093=_0xcf1bb0['map'](_0x58e8e3=>JSON[_0x307ccc(0x1ec)](_0x58e8e3));break;case _0x307ccc(0x370):_0x3ea093=_0x356434[_0x4964a9]!==''?new Function(JSON['parse'](_0x356434[_0x4964a9])):new Function(_0x307ccc(0x1c4));break;case _0x307ccc(0x286):_0xcf1bb0=_0x356434[_0x4964a9]!==''?JSON[_0x307ccc(0x1ec)](_0x356434[_0x4964a9]):[],_0x3ea093=_0xcf1bb0['map'](_0x59b2cd=>new Function(JSON[_0x307ccc(0x1ec)](_0x59b2cd)));break;case _0x307ccc(0x38c):_0x3ea093=_0x356434[_0x4964a9]!==''?String(_0x356434[_0x4964a9]):'';break;case'ARRAYSTR':_0xcf1bb0=_0x356434[_0x4964a9]!==''?JSON[_0x307ccc(0x1ec)](_0x356434[_0x4964a9]):[],_0x3ea093=_0xcf1bb0[_0x307ccc(0x2ee)](_0x21fc2a=>String(_0x21fc2a));break;case _0x307ccc(0x330):_0xa94201=_0x356434[_0x4964a9]!==''?JSON[_0x307ccc(0x1ec)](_0x356434[_0x4964a9]):{},_0x3ea093=VisuMZ['ConvertParams']({},_0xa94201);break;case _0x307ccc(0x358):_0xcf1bb0=_0x356434[_0x4964a9]!==''?JSON['parse'](_0x356434[_0x4964a9]):[],_0x3ea093=_0xcf1bb0[_0x307ccc(0x2ee)](_0x22d4d3=>VisuMZ['ConvertParams']({},JSON[_0x307ccc(0x1ec)](_0x22d4d3)));break;default:continue;}_0x21fe41[_0x3f6277]=_0x3ea093;}}}return _0x21fe41;},(_0x244bff=>{const _0x494478=_0x18674e,_0x19d5c2=_0x244bff['name'];for(const _0x29d35e of dependencies){if(!Imported[_0x29d35e]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x494478(0x256)](_0x19d5c2,_0x29d35e)),SceneManager[_0x494478(0x1cb)]();break;}}const _0x26c362=_0x244bff[_0x494478(0x3e3)];if(_0x26c362[_0x494478(0x378)](/\[Version[ ](.*?)\]/i)){if(_0x494478(0x209)===_0x494478(0x2e5)){if(this[_0x494478(0x34a)]())return;const _0x57cd37=this[_0x494478(0x333)](),_0x3f1448=_0x57cd37[_0x57cd37[_0x494478(0x2ae)]-0x1];if(_0x3f1448===_0x494478(0x2ea))return;_0x57cd37[_0x494478(0x2d6)](_0x494478(0x2ea)),this[_0x494478(0x37f)]();}else{const _0x27bf1e=Number(RegExp['$1']);if(_0x27bf1e!==VisuMZ[label][_0x494478(0x385)]){if(_0x494478(0x280)!=='UwpSA'){const _0x52e8c5=this['combatLogWindowRect']();this[_0x494478(0x21e)]=new _0x4d361c(_0x52e8c5),this['addWindow'](this[_0x494478(0x21e)]),this[_0x494478(0x2c4)][_0x494478(0x1e1)](this['_combatLogWindow']),this[_0x494478(0x21e)][_0x494478(0x24e)](_0x31886a[_0x494478(0x388)][_0x494478(0x350)][_0x494478(0x219)][_0x494478(0x3e1)]);}else alert(_0x494478(0x326)[_0x494478(0x256)](_0x19d5c2,_0x27bf1e)),SceneManager[_0x494478(0x1cb)]();}}}if(_0x26c362[_0x494478(0x378)](/\[Tier[ ](\d+)\]/i)){if(_0x494478(0x38a)!==_0x494478(0x379)){const _0x2a2f3d=Number(RegExp['$1']);if(_0x2a2f3d<tier)alert(_0x494478(0x2f1)[_0x494478(0x256)](_0x19d5c2,_0x2a2f3d,tier)),SceneManager['exit']();else{if(_0x494478(0x1e6)===_0x494478(0x39b)){_0x435879[_0x494478(0x388)][_0x494478(0x360)][_0x494478(0x26e)](this,_0x1857e7);if(!_0x357dca[_0x494478(0x388)][_0x494478(0x350)][_0x494478(0x388)][_0x494478(0x306)])return;this[_0x494478(0x1fa)](_0x552bf0,-0x1,_0x23810d[_0x494478(0x22c)]);}else tier=Math[_0x494478(0x225)](_0x2a2f3d,tier);}}else{let _0x33df02=_0x4d7ecb['shift']();_0x1fca8e[_0x494478(0x388)][_0x494478(0x350)][_0x494478(0x388)][_0x494478(0x258)]&&(_0x33df02=_0x494478(0x2e1)[_0x494478(0x256)](_0x175ff7,_0x33df02)),_0x331ef4=0x0,_0x11da7b[_0x494478(0x2d6)](_0x33df02);}}VisuMZ[_0x494478(0x1ed)](VisuMZ[label]['Settings'],_0x244bff[_0x494478(0x3a8)]);})(pluginData),PluginManager[_0x18674e(0x3c9)](pluginData['name'],_0x18674e(0x2dd),_0x208e52=>{const _0x10c296=_0x18674e;VisuMZ[_0x10c296(0x1ed)](_0x208e52,_0x208e52);const _0x24e758=_0x208e52[_0x10c296(0x1f2)],_0x380dec=_0x208e52[_0x10c296(0x1c6)];$gameSystem[_0x10c296(0x37b)](_0x24e758,_0x380dec);}),PluginManager['registerCommand'](pluginData[_0x18674e(0x3b6)],'CombatLogAddHorzLine',_0x373bb6=>{const _0x459d15=_0x18674e;VisuMZ['ConvertParams'](_0x373bb6,_0x373bb6),$gameSystem[_0x459d15(0x1c8)]();}),PluginManager[_0x18674e(0x3c9)](pluginData[_0x18674e(0x3b6)],'CombatLogBypass',_0x502c52=>{const _0x532064=_0x18674e;VisuMZ[_0x532064(0x1ed)](_0x502c52,_0x502c52);const _0x461be6=_0x502c52['Bypass'];$gameSystem[_0x532064(0x2aa)](_0x461be6);}),PluginManager[_0x18674e(0x3c9)](pluginData['name'],'CombatLogEnableHotKey',_0x145540=>{const _0x23daeb=_0x18674e;VisuMZ[_0x23daeb(0x1ed)](_0x145540,_0x145540);const _0x4325bd=_0x145540['Enable'];$gameSystem[_0x23daeb(0x28a)](_0x4325bd);}),PluginManager[_0x18674e(0x3c9)](pluginData['name'],_0x18674e(0x1e7),_0x26c987=>{const _0x5e29ed=_0x18674e;VisuMZ[_0x5e29ed(0x1ed)](_0x26c987,_0x26c987);const _0xd2616=_0x26c987[_0x5e29ed(0x253)];$gameSystem[_0x5e29ed(0x303)](_0xd2616);}),PluginManager['registerCommand'](pluginData['name'],_0x18674e(0x270),_0x54d351=>{const _0x47b594=_0x18674e;VisuMZ[_0x47b594(0x1ed)](_0x54d351,_0x54d351);const _0x5c2307=_0x54d351[_0x47b594(0x253)];$gameSystem[_0x47b594(0x2d7)](_0x5c2307);}),PluginManager[_0x18674e(0x3c9)](pluginData[_0x18674e(0x3b6)],'SystemShowCombatLogActor',_0x568b6e=>{const _0x4acdfb=_0x18674e;VisuMZ['ConvertParams'](_0x568b6e,_0x568b6e);const _0xc407c8=_0x568b6e[_0x4acdfb(0x253)];$gameSystem[_0x4acdfb(0x3d0)](_0xc407c8);}),VisuMZ[_0x18674e(0x388)][_0x18674e(0x1e0)]={'BypassCombatLog':/<BYPASS COMBAT LOG>/i},ImageManager[_0x18674e(0x288)]=VisuMZ['CombatLog'][_0x18674e(0x350)][_0x18674e(0x23b)][_0x18674e(0x1c6)],ImageManager[_0x18674e(0x311)]=VisuMZ['CombatLog'][_0x18674e(0x350)][_0x18674e(0x388)][_0x18674e(0x237)],ImageManager['combatLog_EnemyEmerge_Icon']=VisuMZ['CombatLog'][_0x18674e(0x350)][_0x18674e(0x388)][_0x18674e(0x24c)],ImageManager['combatLog_Preemptive_Icon']=VisuMZ['CombatLog']['Settings'][_0x18674e(0x388)][_0x18674e(0x3be)],ImageManager['combatLog_Surprise_Icon']=VisuMZ[_0x18674e(0x388)][_0x18674e(0x350)][_0x18674e(0x388)][_0x18674e(0x274)],ImageManager[_0x18674e(0x2f6)]=VisuMZ[_0x18674e(0x388)]['Settings'][_0x18674e(0x388)][_0x18674e(0x3a5)],ImageManager[_0x18674e(0x227)]=VisuMZ['CombatLog'][_0x18674e(0x350)][_0x18674e(0x388)][_0x18674e(0x271)],ImageManager[_0x18674e(0x391)]=VisuMZ[_0x18674e(0x388)][_0x18674e(0x350)][_0x18674e(0x388)][_0x18674e(0x22a)],ImageManager['combatLog_Result_Escape']=VisuMZ[_0x18674e(0x388)][_0x18674e(0x350)]['CombatLog'][_0x18674e(0x1f9)],ImageManager[_0x18674e(0x39d)]=VisuMZ[_0x18674e(0x388)][_0x18674e(0x350)][_0x18674e(0x388)]['IconDefeat'],ImageManager[_0x18674e(0x3c5)]=VisuMZ[_0x18674e(0x388)][_0x18674e(0x350)][_0x18674e(0x388)][_0x18674e(0x32b)],ImageManager[_0x18674e(0x3e7)]=VisuMZ[_0x18674e(0x388)][_0x18674e(0x350)][_0x18674e(0x388)][_0x18674e(0x2ff)],ImageManager[_0x18674e(0x25d)]=VisuMZ[_0x18674e(0x388)]['Settings'][_0x18674e(0x388)][_0x18674e(0x1e3)],ImageManager[_0x18674e(0x298)]=VisuMZ[_0x18674e(0x388)][_0x18674e(0x350)][_0x18674e(0x388)][_0x18674e(0x261)],ImageManager['combatLog_CriticalHit_Icon']=VisuMZ['CombatLog'][_0x18674e(0x350)]['CombatLog'][_0x18674e(0x386)],ImageManager[_0x18674e(0x393)]=VisuMZ[_0x18674e(0x388)][_0x18674e(0x350)][_0x18674e(0x388)]['IconMiss'],ImageManager[_0x18674e(0x1f0)]=VisuMZ[_0x18674e(0x388)][_0x18674e(0x350)]['CombatLog'][_0x18674e(0x28e)],ImageManager['combatLog_HP_Heal']=VisuMZ[_0x18674e(0x388)][_0x18674e(0x350)][_0x18674e(0x388)][_0x18674e(0x3d1)],ImageManager[_0x18674e(0x3a9)]=VisuMZ[_0x18674e(0x388)]['Settings'][_0x18674e(0x388)]['IconDmgHP'],ImageManager[_0x18674e(0x334)]=VisuMZ[_0x18674e(0x388)][_0x18674e(0x350)][_0x18674e(0x388)][_0x18674e(0x369)],ImageManager[_0x18674e(0x21d)]=VisuMZ['CombatLog']['Settings'][_0x18674e(0x388)][_0x18674e(0x2c1)],ImageManager[_0x18674e(0x336)]=VisuMZ[_0x18674e(0x388)][_0x18674e(0x350)]['CombatLog']['IconDmgMP'],ImageManager[_0x18674e(0x20d)]=VisuMZ[_0x18674e(0x388)][_0x18674e(0x350)]['CombatLog']['IconNoDmgMP'],ImageManager[_0x18674e(0x3de)]=VisuMZ[_0x18674e(0x388)][_0x18674e(0x350)][_0x18674e(0x388)]['IconHealTP'],ImageManager[_0x18674e(0x2f5)]=VisuMZ[_0x18674e(0x388)][_0x18674e(0x350)][_0x18674e(0x388)][_0x18674e(0x2da)],ImageManager['combatLog_TP_NoDmg']=VisuMZ['CombatLog']['Settings'][_0x18674e(0x388)]['IconNoDmgTP'],TextManager[_0x18674e(0x223)]=VisuMZ['CombatLog'][_0x18674e(0x350)][_0x18674e(0x23b)][_0x18674e(0x21c)],TextManager['combatLog_BattleStart']=VisuMZ[_0x18674e(0x388)]['Settings'][_0x18674e(0x388)]['TextBattleStart'],TextManager[_0x18674e(0x35f)]=VisuMZ['CombatLog']['Settings'][_0x18674e(0x388)][_0x18674e(0x368)],TextManager['combatLog_EndTurn']=VisuMZ['CombatLog'][_0x18674e(0x350)][_0x18674e(0x388)][_0x18674e(0x3aa)],TextManager[_0x18674e(0x3d3)]=VisuMZ[_0x18674e(0x388)][_0x18674e(0x350)][_0x18674e(0x23b)]['BattleHelpCombatLog']??_0x18674e(0x3a6),TextManager[_0x18674e(0x22d)]=VisuMZ['CombatLog'][_0x18674e(0x350)][_0x18674e(0x219)][_0x18674e(0x3a2)],TextManager[_0x18674e(0x1df)]=VisuMZ[_0x18674e(0x388)][_0x18674e(0x350)][_0x18674e(0x219)]['CombatHistoryPrevious'],ColorManager[_0x18674e(0x313)]=VisuMZ[_0x18674e(0x388)]['Settings'][_0x18674e(0x388)][_0x18674e(0x338)],ColorManager[_0x18674e(0x3a9)]=VisuMZ[_0x18674e(0x388)][_0x18674e(0x350)][_0x18674e(0x388)][_0x18674e(0x255)],ColorManager[_0x18674e(0x334)]=VisuMZ['CombatLog'][_0x18674e(0x350)]['CombatLog'][_0x18674e(0x2cc)],ColorManager[_0x18674e(0x21d)]=VisuMZ[_0x18674e(0x388)][_0x18674e(0x350)][_0x18674e(0x388)][_0x18674e(0x363)],ColorManager[_0x18674e(0x336)]=VisuMZ['CombatLog'][_0x18674e(0x350)][_0x18674e(0x388)][_0x18674e(0x34b)],ColorManager[_0x18674e(0x20d)]=VisuMZ[_0x18674e(0x388)][_0x18674e(0x350)][_0x18674e(0x388)][_0x18674e(0x3cc)],ColorManager['combatLog_TP_Heal']=VisuMZ[_0x18674e(0x388)][_0x18674e(0x350)]['CombatLog'][_0x18674e(0x239)],ColorManager[_0x18674e(0x2f5)]=VisuMZ['CombatLog']['Settings'][_0x18674e(0x388)][_0x18674e(0x1f7)],ColorManager[_0x18674e(0x289)]=VisuMZ['CombatLog'][_0x18674e(0x350)][_0x18674e(0x388)][_0x18674e(0x2d1)],ColorManager[_0x18674e(0x20c)]=function(_0x452eef,_0x428094){const _0x20225b=_0x18674e;if(!VisuMZ[_0x20225b(0x388)]['Settings']['CombatLog']['ColorNumbers'])return Math[_0x20225b(0x2ef)](_0x428094);const _0x1788f0='combatLog_%1_%2';let _0x5b7ac9;if(_0x428094>0x0)_0x5b7ac9=_0x1788f0['format'](_0x452eef,_0x20225b(0x3ac));else _0x428094===0x0?_0x5b7ac9=_0x1788f0[_0x20225b(0x256)](_0x452eef,'NoDmg'):_0x20225b(0x364)!==_0x20225b(0x364)?(_0x5aca14[_0x20225b(0x388)]['Window_PartyCommand_addCustomCommands'][_0x20225b(0x26e)](this),this[_0x20225b(0x1d8)]()):_0x5b7ac9=_0x1788f0[_0x20225b(0x256)](_0x452eef,_0x20225b(0x25a));_0x428094=Math[_0x20225b(0x2ef)](_0x428094);if(ColorManager[_0x5b7ac9])return _0x20225b(0x314)[_0x20225b(0x256)](ColorManager[_0x5b7ac9],_0x428094);else{if('eUGtV'==='fORgu')this[_0x20225b(0x3ec)](_0x38b25b[_0x20225b(0x297)]);else return _0x428094;}},SceneManager[_0x18674e(0x216)]=function(){const _0x15b7e7=_0x18674e;return this['_scene']&&this[_0x15b7e7(0x245)][_0x15b7e7(0x3e2)]===Scene_Battle;},VisuMZ[_0x18674e(0x388)][_0x18674e(0x204)]=BattleManager[_0x18674e(0x254)],BattleManager[_0x18674e(0x254)]=function(){const _0x19d46f=_0x18674e;VisuMZ['CombatLog']['BattleManager_startBattle']['call'](this),this[_0x19d46f(0x3e0)]();},BattleManager['startBattleCombatLog']=function(){const _0x3278a9=_0x18674e,_0x4115c5=VisuMZ[_0x3278a9(0x388)][_0x3278a9(0x350)][_0x3278a9(0x388)];if(_0x4115c5[_0x3278a9(0x356)]){$gameSystem[_0x3278a9(0x389)](),$gameSystem[_0x3278a9(0x2aa)](![]),$gameSystem[_0x3278a9(0x1c8)]();let _0x16bb7f=TextManager['combatLog_BattleStart'],_0x20d4a3=ImageManager['combatLog_BattleStart_Icon'];$gameSystem['addTextToCombatLog'](_0x16bb7f,_0x20d4a3),$gameSystem[_0x3278a9(0x1c8)]();}if(_0x4115c5[_0x3278a9(0x33f)])for(const _0x4b64ee of $gameTroop[_0x3278a9(0x282)]()){let _0x3286da=TextManager[_0x3278a9(0x299)]['format'](_0x4b64ee[_0x3278a9(0x27e)]()),_0x9bfe0=ImageManager[_0x3278a9(0x2c6)];$gameSystem[_0x3278a9(0x37b)](_0x3286da,_0x9bfe0);}if(_0x4115c5[_0x3278a9(0x32f)]){if(this[_0x3278a9(0x3c2)]){if(_0x3278a9(0x232)!==_0x3278a9(0x232)){let _0x4778fb=_0x5b2fe3['format'](this[_0x3278a9(0x27e)]()),_0x213df0=_0x125fb8[_0x3278a9(0x210)];_0x59602d['addTextToCombatLog'](_0x4778fb,_0x213df0);}else{let _0x1d2f0d=TextManager[_0x3278a9(0x27c)][_0x3278a9(0x256)]($gameParty['combatLogName']()),_0x2f43a4=ImageManager[_0x3278a9(0x308)];$gameSystem[_0x3278a9(0x37b)](_0x1d2f0d,_0x2f43a4);}}else{if(this['_surprise']){let _0x3ea1bd=TextManager[_0x3278a9(0x2e4)][_0x3278a9(0x256)]($gameParty[_0x3278a9(0x27e)]()),_0x403f8f=ImageManager[_0x3278a9(0x1cd)];$gameSystem[_0x3278a9(0x37b)](_0x3ea1bd,_0x403f8f);}}}},VisuMZ[_0x18674e(0x388)][_0x18674e(0x1de)]=BattleManager[_0x18674e(0x25e)],BattleManager['endTurn']=function(){const _0x1428c7=_0x18674e;if($gameTroop['turnCount']()>0x0&&VisuMZ[_0x1428c7(0x388)][_0x1428c7(0x350)][_0x1428c7(0x388)]['ShowEndTurn']){$gameSystem[_0x1428c7(0x1c8)]();let _0x137af5=TextManager['combatLog_EndTurn'][_0x1428c7(0x256)]($gameTroop['turnCount']()),_0x250e30=ImageManager[_0x1428c7(0x227)];$gameSystem[_0x1428c7(0x37b)](_0x137af5,_0x250e30),$gameSystem[_0x1428c7(0x1c8)]();}VisuMZ[_0x1428c7(0x388)][_0x1428c7(0x1de)][_0x1428c7(0x26e)](this);},VisuMZ[_0x18674e(0x388)][_0x18674e(0x33a)]=BattleManager[_0x18674e(0x1d3)],BattleManager[_0x18674e(0x1d3)]=function(){const _0x1f6148=_0x18674e;VisuMZ[_0x1f6148(0x388)][_0x1f6148(0x33a)]['call'](this);if(this[_0x1f6148(0x3bb)]()&&VisuMZ[_0x1f6148(0x388)][_0x1f6148(0x350)][_0x1f6148(0x388)][_0x1f6148(0x305)]&&$gameTroop[_0x1f6148(0x23f)]()>0x0){$gameSystem[_0x1f6148(0x1c8)]();let _0x42e3c4=TextManager[_0x1f6148(0x35f)][_0x1f6148(0x256)]($gameTroop['turnCount']()),_0x59d079=ImageManager[_0x1f6148(0x2f6)];$gameSystem[_0x1f6148(0x37b)](_0x42e3c4,_0x59d079);}},VisuMZ[_0x18674e(0x388)][_0x18674e(0x265)]=BattleManager[_0x18674e(0x226)],BattleManager[_0x18674e(0x226)]=function(){const _0xf3033b=_0x18674e;$gameSystem['setBypassCombatLog'](!![]),VisuMZ[_0xf3033b(0x388)][_0xf3033b(0x265)][_0xf3033b(0x26e)](this),$gameSystem[_0xf3033b(0x2aa)](![]);if(VisuMZ[_0xf3033b(0x388)]['Settings'][_0xf3033b(0x388)][_0xf3033b(0x319)]){$gameSystem[_0xf3033b(0x1c8)]();let _0x101479=TextManager[_0xf3033b(0x3e4)][_0xf3033b(0x256)]($gameParty[_0xf3033b(0x27e)]()),_0x246dd1=ImageManager[_0xf3033b(0x391)];$gameSystem[_0xf3033b(0x37b)](_0x101479,_0x246dd1),$gameSystem['addHorzLineToCombatLog']();}},VisuMZ[_0x18674e(0x388)]['BattleManager_processAbort']=BattleManager['processAbort'],BattleManager[_0x18674e(0x3cb)]=function(){const _0x312616=_0x18674e;$gameSystem[_0x312616(0x2aa)](!![]),VisuMZ[_0x312616(0x388)][_0x312616(0x3a7)][_0x312616(0x26e)](this),$gameSystem[_0x312616(0x2aa)](![]),$gameSystem[_0x312616(0x1c8)]();},VisuMZ['CombatLog'][_0x18674e(0x2f4)]=BattleManager[_0x18674e(0x240)],BattleManager[_0x18674e(0x240)]=function(){const _0x55f192=_0x18674e;VisuMZ['CombatLog'][_0x55f192(0x2f4)]['call'](this);if(VisuMZ[_0x55f192(0x388)][_0x55f192(0x350)][_0x55f192(0x388)][_0x55f192(0x285)]){$gameSystem['addHorzLineToCombatLog']();let _0x532d23=TextManager[_0x55f192(0x371)]['format']($gameParty[_0x55f192(0x27e)]()),_0xac32b0=ImageManager[_0x55f192(0x2d9)];$gameSystem[_0x55f192(0x37b)](_0x532d23,_0xac32b0),$gameSystem[_0x55f192(0x1c8)]();}},VisuMZ[_0x18674e(0x388)]['BattleManager_onEscapeFailure']=BattleManager[_0x18674e(0x395)],BattleManager[_0x18674e(0x395)]=function(){const _0x42834b=_0x18674e;VisuMZ[_0x42834b(0x388)][_0x42834b(0x2e8)]['call'](this);if(VisuMZ[_0x42834b(0x388)]['Settings'][_0x42834b(0x388)][_0x42834b(0x285)]){$gameSystem[_0x42834b(0x1c8)]();let _0x52c7a2=TextManager[_0x42834b(0x371)]['format']($gameParty[_0x42834b(0x27e)]()),_0x4b1a9e=ImageManager[_0x42834b(0x2d9)];$gameSystem['addTextToCombatLog'](_0x52c7a2,_0x4b1a9e),$gameSystem[_0x42834b(0x37b)](TextManager[_0x42834b(0x242)],_0x4b1a9e),$gameSystem['addHorzLineToCombatLog']();}},VisuMZ[_0x18674e(0x388)]['BattleManager_processDefeat']=BattleManager[_0x18674e(0x31b)],BattleManager[_0x18674e(0x31b)]=function(){const _0x40c297=_0x18674e;VisuMZ[_0x40c297(0x388)][_0x40c297(0x2fe)]['call'](this);if(VisuMZ['CombatLog'][_0x40c297(0x350)][_0x40c297(0x388)][_0x40c297(0x3dd)]){$gameSystem[_0x40c297(0x1c8)]();let _0x4e93f4=TextManager['defeat'][_0x40c297(0x256)]($gameParty[_0x40c297(0x27e)]()),_0x193e48=ImageManager[_0x40c297(0x39d)];$gameSystem['addTextToCombatLog'](_0x4e93f4,_0x193e48),$gameSystem[_0x40c297(0x1c8)]();}},VisuMZ[_0x18674e(0x388)][_0x18674e(0x3d4)]=Game_System[_0x18674e(0x2f3)]['initialize'],Game_System[_0x18674e(0x2f3)][_0x18674e(0x30c)]=function(){const _0x3ccd87=_0x18674e;VisuMZ[_0x3ccd87(0x388)][_0x3ccd87(0x3d4)]['call'](this),this[_0x3ccd87(0x28c)](),this[_0x3ccd87(0x32d)]();},Game_System['COMBATLOG_MAXIMUM_BATTLE_ENTRIES']=VisuMZ[_0x18674e(0x388)][_0x18674e(0x350)]['General']['StoredLogs']??0x5,Game_System[_0x18674e(0x2f3)][_0x18674e(0x28c)]=function(){const _0x26a9fc=_0x18674e;this[_0x26a9fc(0x233)]=[],this[_0x26a9fc(0x2ed)]=![];},Game_System[_0x18674e(0x2f3)][_0x18674e(0x333)]=function(_0x41d805){const _0x1d8a85=_0x18674e;if(this[_0x1d8a85(0x233)]===undefined)this[_0x1d8a85(0x28c)]();return _0x41d805=_0x41d805||0x0,this[_0x1d8a85(0x233)][_0x41d805]=this['_combatLogs'][_0x41d805]||[],this['_combatLogs'][_0x41d805];},Game_System['prototype'][_0x18674e(0x37b)]=function(_0x4b571b,_0x5eae6){const _0x18622d=_0x18674e;if(this[_0x18622d(0x34a)]())return;if(!_0x4b571b)return;_0x5eae6=_0x5eae6||0x0,_0x4b571b=VisuMZ[_0x18622d(0x388)][_0x18622d(0x301)](_0x4b571b);const _0x243eca=this[_0x18622d(0x333)](),_0x3aaa5d=_0x4b571b[_0x18622d(0x222)]('\x0a');while(_0x3aaa5d[_0x18622d(0x2ae)]>0x0){let _0x5500aa=_0x3aaa5d['shift']();VisuMZ['CombatLog'][_0x18622d(0x350)][_0x18622d(0x388)]['ShowIcons']&&(_0x5500aa=_0x18622d(0x2e1)['format'](_0x5eae6,_0x5500aa)),_0x5eae6=0x0,_0x243eca[_0x18622d(0x2d6)](_0x5500aa);}this[_0x18622d(0x37f)]();},Game_System[_0x18674e(0x2f3)]['addHorzLineToCombatLog']=function(){const _0x168ef6=_0x18674e;if(this[_0x168ef6(0x34a)]())return;const _0x5d1f27=this[_0x168ef6(0x333)](),_0x3319a7=_0x5d1f27[_0x5d1f27[_0x168ef6(0x2ae)]-0x1];if(_0x3319a7===_0x168ef6(0x2ea))return;_0x5d1f27[_0x168ef6(0x2d6)](_0x168ef6(0x2ea)),this[_0x168ef6(0x37f)]();},VisuMZ[_0x18674e(0x388)]['RemoveUnwantedTextCodes']=function(_0xa79940){const _0x5ac1fa=_0x18674e;while(_0xa79940[_0x5ac1fa(0x378)](/\\V\[(\d+)\]/gi)){_0xa79940=_0xa79940[_0x5ac1fa(0x25b)](/\\V\[(\d+)\]/gi,(_0x4eb942,_0x5b79cb)=>$gameVariables[_0x5ac1fa(0x29c)](parseInt(_0x5b79cb)));}return _0xa79940;},Game_System['prototype'][_0x18674e(0x389)]=function(){const _0xc73bd5=_0x18674e;if(this[_0xc73bd5(0x233)]===undefined)this[_0xc73bd5(0x28c)]();this[_0xc73bd5(0x233)]['unshift']([]);while(this[_0xc73bd5(0x233)][_0xc73bd5(0x2ae)]>Game_System['COMBATLOG_MAXIMUM_BATTLE_ENTRIES']){this[_0xc73bd5(0x233)][_0xc73bd5(0x23c)]();}},Game_System[_0x18674e(0x2f3)]['getTotalCombatLogs']=function(){const _0x58c2f6=_0x18674e;if(this[_0x58c2f6(0x233)]===undefined)this[_0x58c2f6(0x28c)]();return this['_combatLogs'][_0x58c2f6(0x2ae)];},Game_System[_0x18674e(0x2f3)]['isBypassCombatLog']=function(){const _0x2e7eba=_0x18674e;if(this[_0x2e7eba(0x2ed)]===undefined)this[_0x2e7eba(0x28c)]();return this[_0x2e7eba(0x2ed)];},Game_System[_0x18674e(0x2f3)]['setBypassCombatLog']=function(_0x546763){const _0x3c568b=_0x18674e;if(this[_0x3c568b(0x2ed)]===undefined)this[_0x3c568b(0x28c)]();this['_bypassAddToCombatLog']=_0x546763;;},Game_System['prototype'][_0x18674e(0x37f)]=function(){const _0x429e9e=_0x18674e;if(!SceneManager[_0x429e9e(0x216)]())return;const _0x5d9930=SceneManager[_0x429e9e(0x245)][_0x429e9e(0x21e)];_0x5d9930&&_0x5d9930[_0x429e9e(0x372)]();},Game_System[_0x18674e(0x2f3)][_0x18674e(0x32d)]=function(){const _0x120044=_0x18674e,_0xf4e650=VisuMZ[_0x120044(0x388)][_0x120044(0x350)]['General'];this[_0x120044(0x321)]={'mainMenu':_0xf4e650[_0x120044(0x2f2)],'partyCmd':_0xf4e650[_0x120044(0x3c6)],'actorCmd':_0xf4e650[_0x120044(0x31a)],'hotkeyOn':!![]};},Game_System[_0x18674e(0x2f3)][_0x18674e(0x23a)]=function(){const _0x52fef9=_0x18674e;if(this[_0x52fef9(0x321)]===undefined)this[_0x52fef9(0x32d)]();return this[_0x52fef9(0x321)]['mainMenu'];},Game_System[_0x18674e(0x2f3)]['isMainMenuCombatLogEnabled']=function(){const _0x223b5c=_0x18674e;if(this['_combatLogs']===undefined)this['initCombatLogBase']();return this[_0x223b5c(0x2a9)]()>0x0;},Game_System['prototype'][_0x18674e(0x303)]=function(_0x3a9703){const _0x2a0a89=_0x18674e;if(this[_0x2a0a89(0x321)]===undefined)this[_0x2a0a89(0x32d)]();this[_0x2a0a89(0x321)][_0x2a0a89(0x2f8)]=_0x3a9703;},Game_System[_0x18674e(0x2f3)][_0x18674e(0x212)]=function(){const _0x23acda=_0x18674e;if(this[_0x23acda(0x321)]===undefined)this[_0x23acda(0x32d)]();return this[_0x23acda(0x321)][_0x23acda(0x2de)];},Game_System[_0x18674e(0x2f3)][_0x18674e(0x2d7)]=function(_0x248cd4){const _0x34552c=_0x18674e;if(this[_0x34552c(0x321)]===undefined)this['initCombatLogAccess']();this['_combatLogAccess'][_0x34552c(0x2de)]=_0x248cd4;},Game_System[_0x18674e(0x2f3)][_0x18674e(0x340)]=function(){const _0xc08119=_0x18674e;if(this['_combatLogAccess']===undefined)this['initCombatLogAccess']();return this[_0xc08119(0x321)][_0xc08119(0x30a)];},Game_System[_0x18674e(0x2f3)][_0x18674e(0x3d0)]=function(_0x4531dd){const _0x58e29f=_0x18674e;if(this[_0x58e29f(0x321)]===undefined)this[_0x58e29f(0x32d)]();this[_0x58e29f(0x321)][_0x58e29f(0x30a)]=_0x4531dd;},Game_System[_0x18674e(0x2f3)][_0x18674e(0x268)]=function(){const _0x574e57=_0x18674e;if(this[_0x574e57(0x321)]===undefined)this[_0x574e57(0x32d)]();return this[_0x574e57(0x321)][_0x574e57(0x276)];},Game_System[_0x18674e(0x2f3)][_0x18674e(0x28a)]=function(_0x1925a9){if(this['_combatLogAccess']===undefined)this['initCombatLogAccess']();this['_combatLogAccess']['hotkeyOn']=_0x1925a9;},VisuMZ[_0x18674e(0x388)][_0x18674e(0x246)]=Game_BattlerBase[_0x18674e(0x2f3)]['setHp'],Game_BattlerBase[_0x18674e(0x2f3)]['setHp']=function(_0x348e55){const _0x569cc0=_0x18674e,_0xfb383f=this[_0x569cc0(0x2df)];VisuMZ[_0x569cc0(0x388)][_0x569cc0(0x246)][_0x569cc0(0x26e)](this,_0x348e55);if(!SceneManager['isSceneBattle']())return;if(this[_0x569cc0(0x224)])return;if(!VisuMZ[_0x569cc0(0x388)][_0x569cc0(0x350)][_0x569cc0(0x388)][_0x569cc0(0x1ce)])return;const _0x24ab0c=_0x348e55;let _0x198682,_0x436d99,_0x3c796a=_0x24ab0c-_0xfb383f;if(_0x24ab0c>_0xfb383f)_0x198682=this[_0x569cc0(0x36b)]()?TextManager['actorRecovery']:TextManager[_0x569cc0(0x267)],_0x436d99=ImageManager['combatLog_HP_Heal'];else{if(_0x24ab0c===_0xfb383f){if('XrQGL'!==_0x569cc0(0x1c2))_0x198682=this[_0x569cc0(0x36b)]()?TextManager['actorNoDamage']:TextManager['enemyNoDamage'],_0x436d99=ImageManager['combatLog_HP_NoDmg'];else{if(_0x25cb74[_0x569cc0(0x39c)]())return![];if(_0x25f154[_0x569cc0(0x32c)])return![];if(_0xc9e716[_0x569cc0(0x346)]){if(_0x2be70e['_scene'][_0x569cc0(0x22f)]())return![];}if(_0x252983[_0x569cc0(0x335)]){if(_0x28c53b['_scene'][_0x569cc0(0x3bc)]())return![];}return _0x99409f['isPressed'](_0x70a6d1['ACCESS_BUTTON']);}}else{if(_0x569cc0(0x277)==='unBjv'){_0x35beba[_0x569cc0(0x388)]['Scene_Menu_createCommandWindow'][_0x569cc0(0x26e)](this);const _0x35c19f=this['_commandWindow'];_0x35c19f[_0x569cc0(0x2b1)](_0x569cc0(0x248),this[_0x569cc0(0x2fb)][_0x569cc0(0x2a5)](this));}else _0x198682=this[_0x569cc0(0x36b)]()?TextManager[_0x569cc0(0x2ce)]:TextManager[_0x569cc0(0x320)],_0x436d99=ImageManager[_0x569cc0(0x3a9)];}}_0x3c796a=ColorManager[_0x569cc0(0x20c)]('HP',_0x3c796a);let _0x45c39b=_0x198682[_0x569cc0(0x256)](this['combatLogName'](),_0x3c796a,TextManager['hp']);$gameSystem[_0x569cc0(0x37b)](_0x45c39b,_0x436d99);},VisuMZ[_0x18674e(0x388)]['Game_BattlerBase_setMp']=Game_BattlerBase['prototype'][_0x18674e(0x22e)],Game_BattlerBase[_0x18674e(0x2f3)]['setMp']=function(_0x640c89){const _0x2e6b36=_0x18674e,_0x1fa40f=this[_0x2e6b36(0x2b9)];VisuMZ[_0x2e6b36(0x388)][_0x2e6b36(0x21a)]['call'](this,_0x640c89);if(!SceneManager[_0x2e6b36(0x216)]())return;if(this[_0x2e6b36(0x224)])return;if(!VisuMZ[_0x2e6b36(0x388)][_0x2e6b36(0x350)][_0x2e6b36(0x388)]['ShowMP'])return;const _0xf25987=_0x640c89;let _0x230bfb,_0x3f9dc6,_0x13ead0=_0xf25987-_0x1fa40f;if(_0xf25987>_0x1fa40f)_0x230bfb=this[_0x2e6b36(0x36b)]()?TextManager[_0x2e6b36(0x20e)]:TextManager['enemyRecovery'],_0x3f9dc6=ImageManager[_0x2e6b36(0x21d)];else _0xf25987===_0x1fa40f?(_0x230bfb=this['isActor']()?TextManager[_0x2e6b36(0x3b4)]:TextManager[_0x2e6b36(0x310)],_0x3f9dc6=ImageManager[_0x2e6b36(0x20d)]):(_0x230bfb=this[_0x2e6b36(0x36b)]()?TextManager['actorLoss']:TextManager[_0x2e6b36(0x310)],_0x3f9dc6=ImageManager[_0x2e6b36(0x336)]);_0x13ead0=ColorManager[_0x2e6b36(0x20c)]('MP',_0x13ead0);let _0xc107ce=_0x230bfb['format'](this[_0x2e6b36(0x27e)](),_0x13ead0,TextManager['mp']);$gameSystem[_0x2e6b36(0x37b)](_0xc107ce,_0x3f9dc6);},VisuMZ[_0x18674e(0x388)][_0x18674e(0x1d4)]=Game_BattlerBase['prototype']['setTp'],Game_BattlerBase[_0x18674e(0x2f3)]['setTp']=function(_0xfc9d1d){const _0x5a240f=_0x18674e,_0x142254=this['_tp'];VisuMZ[_0x5a240f(0x388)]['Game_BattlerBase_setTp'][_0x5a240f(0x26e)](this,_0xfc9d1d);if(!SceneManager[_0x5a240f(0x216)]())return;if(this[_0x5a240f(0x224)])return;if(this['_combatLogSilentTp'])return;if(!VisuMZ['CombatLog'][_0x5a240f(0x350)][_0x5a240f(0x388)][_0x5a240f(0x26b)])return;const _0x20f778=_0xfc9d1d;let _0x2bec34,_0x154188,_0x393341=_0x20f778-_0x142254;if(_0x20f778>_0x142254){if('TnNTs'===_0x5a240f(0x207)){let _0x321030=_0x456b7a[_0x5a240f(0x256)](this[_0x5a240f(0x27e)](),_0x437222['name'],_0x2c7798['tp']),_0x4d8fba=_0x49f800[_0x5a240f(0x210)];_0x5e56bb[_0x5a240f(0x37b)](_0x321030,_0x4d8fba);}else _0x2bec34=this[_0x5a240f(0x36b)]()?TextManager['actorRecovery']:TextManager[_0x5a240f(0x267)],_0x154188=ImageManager[_0x5a240f(0x3de)];}else _0x20f778===_0x142254?(_0x2bec34=this[_0x5a240f(0x36b)]()?TextManager[_0x5a240f(0x3b4)]:TextManager[_0x5a240f(0x310)],_0x154188=ImageManager['combatLog_TP_NoDmg']):(_0x2bec34=this[_0x5a240f(0x36b)]()?TextManager[_0x5a240f(0x3b4)]:TextManager[_0x5a240f(0x310)],_0x154188=ImageManager[_0x5a240f(0x2f5)]);_0x393341=ColorManager['applyCombatLogColor']('TP',_0x393341);let _0x1fb2dd=_0x2bec34[_0x5a240f(0x256)](this[_0x5a240f(0x27e)](),_0x393341,TextManager['tp']);$gameSystem[_0x5a240f(0x37b)](_0x1fb2dd,_0x154188);},VisuMZ['CombatLog'][_0x18674e(0x30d)]=Game_Battler[_0x18674e(0x2f3)][_0x18674e(0x2d0)],Game_Battler[_0x18674e(0x2f3)][_0x18674e(0x2d0)]=function(_0x1f6a9e){const _0x2dc846=_0x18674e;this[_0x2dc846(0x34f)]=!![],VisuMZ['CombatLog'][_0x2dc846(0x30d)][_0x2dc846(0x26e)](this,_0x1f6a9e),this[_0x2dc846(0x34f)]=![];},VisuMZ['CombatLog']['Game_Battler_useItem']=Game_Battler[_0x18674e(0x2f3)][_0x18674e(0x380)],Game_Battler['prototype']['useItem']=function(_0x24df38){const _0x4b336c=_0x18674e;this[_0x4b336c(0x224)]=!![],VisuMZ[_0x4b336c(0x388)][_0x4b336c(0x1fc)][_0x4b336c(0x26e)](this,_0x24df38),this[_0x4b336c(0x224)]=![];},VisuMZ[_0x18674e(0x388)][_0x18674e(0x26f)]=Game_Battler[_0x18674e(0x2f3)]['addState'],Game_Battler[_0x18674e(0x2f3)]['addState']=function(_0x1e5a37){const _0x3fc38b=_0x18674e,_0x2ddb17=this[_0x3fc38b(0x396)](_0x1e5a37);VisuMZ[_0x3fc38b(0x388)][_0x3fc38b(0x26f)][_0x3fc38b(0x26e)](this,_0x1e5a37);const _0x1c71e1=this[_0x3fc38b(0x396)](_0x1e5a37);this[_0x3fc38b(0x2ab)](_0x1e5a37,_0x2ddb17,_0x1c71e1);},VisuMZ[_0x18674e(0x388)]['Game_Battler_removeState']=Game_Battler[_0x18674e(0x2f3)][_0x18674e(0x2d5)],Game_Battler[_0x18674e(0x2f3)][_0x18674e(0x2d5)]=function(_0x4cd052){const _0x28e022=_0x18674e,_0x14ce91=this[_0x28e022(0x396)](_0x4cd052);VisuMZ[_0x28e022(0x388)]['Game_Battler_removeState']['call'](this,_0x4cd052);const _0x29eab1=this[_0x28e022(0x396)](_0x4cd052);this[_0x28e022(0x2ab)](_0x4cd052,_0x14ce91,_0x29eab1);},Game_Battler['prototype']['combatLogStateChanges']=function(_0x3404b6,_0xc6d7be,_0x213a45){const _0x333d94=_0x18674e;if(!SceneManager['isSceneBattle']())return;const _0x3e36e3=$dataStates[_0x3404b6];if(!_0x3e36e3)return;if(_0x3e36e3[_0x333d94(0x2c3)][_0x333d94(0x378)](VisuMZ['CombatLog'][_0x333d94(0x1e0)]['BypassCombatLog']))return;const _0x1c6ad3=VisuMZ['CombatLog'][_0x333d94(0x350)][_0x333d94(0x388)];if(!_0xc6d7be&&_0x213a45){let _0x522092=this['isActor']()?_0x3e36e3[_0x333d94(0x235)]:_0x3e36e3['message2'];if(_0x522092&&_0x1c6ad3[_0x333d94(0x2ba)]){if(_0x333d94(0x1f5)==='luTNG'){_0x4df413[_0x333d94(0x388)]['BattleManager_processDefeat'][_0x333d94(0x26e)](this);if(_0x4ff9a9['CombatLog'][_0x333d94(0x350)][_0x333d94(0x388)]['ShowDefeat']){_0x22176a[_0x333d94(0x1c8)]();let _0xd74e55=_0x3749bb[_0x333d94(0x3db)]['format'](_0x31fc9b[_0x333d94(0x27e)]()),_0x599b0f=_0x23a338[_0x333d94(0x39d)];_0x5a7d4a[_0x333d94(0x37b)](_0xd74e55,_0x599b0f),_0x5816a8[_0x333d94(0x1c8)]();}}else{let _0x5b16dd=_0x522092[_0x333d94(0x256)](this[_0x333d94(0x27e)]()),_0x58137d=_0x3e36e3[_0x333d94(0x210)];$gameSystem['addTextToCombatLog'](_0x5b16dd,_0x58137d);}}}if(_0xc6d7be&&_0x213a45){let _0x309998=_0x3e36e3[_0x333d94(0x296)];if(_0x309998&&_0x1c6ad3[_0x333d94(0x2b5)]){if(_0x333d94(0x352)===_0x333d94(0x220))this['_requestRefresh']=![],this[_0x333d94(0x337)]=0x0,this[_0x333d94(0x2c8)](),this[_0x333d94(0x2a4)](0x0,this[_0x333d94(0x2b2)]());else{let _0x4d5230=_0x309998[_0x333d94(0x256)](this[_0x333d94(0x27e)]()),_0x56bbf0=_0x3e36e3[_0x333d94(0x210)];$gameSystem['addTextToCombatLog'](_0x4d5230,_0x56bbf0);}}}if(_0xc6d7be&&!_0x213a45){let _0x13d07a=_0x3e36e3['message4'];if(_0x13d07a&&_0x1c6ad3['ShowStateRemove']){if(_0x333d94(0x25c)===_0x333d94(0x228))return _0x333d94(0x314)['format'](_0x568e5e[_0x11d47c],_0x147664);else{let _0x39fcc5=_0x13d07a[_0x333d94(0x256)](this[_0x333d94(0x27e)]()),_0x2e0d9b=_0x3e36e3[_0x333d94(0x210)];$gameSystem['addTextToCombatLog'](_0x39fcc5,_0x2e0d9b);}}}},VisuMZ[_0x18674e(0x388)][_0x18674e(0x3dc)]=Game_BattlerBase['prototype'][_0x18674e(0x1fb)],Game_BattlerBase['prototype'][_0x18674e(0x1fb)]=function(_0x416396){const _0x5ea189=_0x18674e;VisuMZ[_0x5ea189(0x388)][_0x5ea189(0x3dc)]['call'](this,_0x416396);if(!VisuMZ[_0x5ea189(0x388)]['Settings'][_0x5ea189(0x388)][_0x5ea189(0x324)])return;this[_0x5ea189(0x1fa)](_0x416396,0x1,TextManager[_0x5ea189(0x2cd)]);},VisuMZ[_0x18674e(0x388)]['Game_BattlerBase_decreaseBuff']=Game_BattlerBase[_0x18674e(0x2f3)][_0x18674e(0x23d)],Game_BattlerBase[_0x18674e(0x2f3)][_0x18674e(0x23d)]=function(_0x578662){const _0x30bbd8=_0x18674e;VisuMZ[_0x30bbd8(0x388)]['Game_BattlerBase_decreaseBuff'][_0x30bbd8(0x26e)](this,_0x578662);if(!VisuMZ['CombatLog']['Settings'][_0x30bbd8(0x388)][_0x30bbd8(0x306)])return;this['combatLogBuffChanges'](_0x578662,-0x1,TextManager['debuffAdd']);},VisuMZ[_0x18674e(0x388)][_0x18674e(0x217)]=Game_BattlerBase[_0x18674e(0x2f3)][_0x18674e(0x27f)],Game_BattlerBase[_0x18674e(0x2f3)]['eraseBuff']=function(_0x2db1c8){const _0x252595=_0x18674e,_0x32af07=this[_0x252595(0x2a2)][_0x2db1c8]||0x0;VisuMZ[_0x252595(0x388)][_0x252595(0x217)][_0x252595(0x26e)](this,_0x2db1c8);const _0x3b21c2=this[_0x252595(0x2a2)][_0x2db1c8]||0x0,_0xb03a26=_0x3b21c2>_0x32af07?0x1:-0x1;if(!VisuMZ[_0x252595(0x388)]['Settings'][_0x252595(0x388)][_0x252595(0x260)])return;this[_0x252595(0x1fa)](_0x2db1c8,_0xb03a26,TextManager[_0x252595(0x36c)]);},Game_Battler[_0x18674e(0x2f3)]['combatLogBuffChanges']=function(_0x358477,_0xd016a4,_0xe6fc05){const _0x55bb6a=_0x18674e;if(!SceneManager['isSceneBattle']())return;if(!_0xe6fc05)return;const _0x5b6cea=this[_0x55bb6a(0x35a)](_0xd016a4||-0x1,_0x358477),_0x511072=TextManager[_0x55bb6a(0x264)](_0x358477),_0x3d4a31=_0xe6fc05['format'](this[_0x55bb6a(0x27e)](),_0x511072);$gameSystem[_0x55bb6a(0x37b)](_0x3d4a31,_0x5b6cea);},Game_Actor['prototype'][_0x18674e(0x27e)]=function(){const _0x50505d=_0x18674e;return'\x5cN[%1]'['format'](this[_0x50505d(0x3ad)]);},Game_Enemy[_0x18674e(0x2f3)][_0x18674e(0x27e)]=function(){const _0x759ea0=_0x18674e;return this[_0x759ea0(0x3b6)]();},Game_Party[_0x18674e(0x2f3)][_0x18674e(0x27e)]=function(){const _0x3646e9=_0x18674e,_0x478fa9=this[_0x3646e9(0x383)]()['length'];if(_0x478fa9===0x0)return'';else{if(_0x478fa9===0x1){if(_0x3646e9(0x2e6)===_0x3646e9(0x2e6))return this[_0x3646e9(0x322)]()[_0x3646e9(0x27e)]();else this[_0x3646e9(0x1f6)](),this['open']();}else{if(_0x3646e9(0x36e)!=='wOBgZ')return TextManager[_0x3646e9(0x273)]['format'](this[_0x3646e9(0x322)]()[_0x3646e9(0x27e)]());else{_0xa5f800[_0x3646e9(0x1c8)]();let _0x5a620d=_0x26a312['defeat'][_0x3646e9(0x256)](_0x2939ba[_0x3646e9(0x27e)]()),_0xbc52ab=_0x28cb99['combatLog_Result_Defeat'];_0x2cac34['addTextToCombatLog'](_0x5a620d,_0xbc52ab),_0x327702[_0x3646e9(0x1c8)]();}}}},VisuMZ[_0x18674e(0x388)][_0x18674e(0x344)]=Scene_Menu[_0x18674e(0x2f3)]['createCommandWindow'],Scene_Menu[_0x18674e(0x2f3)]['createCommandWindow']=function(){const _0xa2e127=_0x18674e;VisuMZ[_0xa2e127(0x388)]['Scene_Menu_createCommandWindow'][_0xa2e127(0x26e)](this);const _0x92d685=this[_0xa2e127(0x1e9)];_0x92d685[_0xa2e127(0x2b1)](_0xa2e127(0x248),this[_0xa2e127(0x2fb)][_0xa2e127(0x2a5)](this));},Scene_Menu['prototype']['commandCombatLog']=function(){SceneManager['push'](Scene_CombatLog);},VisuMZ[_0x18674e(0x388)][_0x18674e(0x332)]=Scene_Battle['prototype'][_0x18674e(0x263)],Scene_Battle['prototype'][_0x18674e(0x263)]=function(){const _0x258618=_0x18674e;VisuMZ[_0x258618(0x388)][_0x258618(0x332)]['call'](this),this[_0x258618(0x1f3)]();},Scene_Battle['prototype'][_0x18674e(0x1f3)]=function(){const _0x9c3a81=_0x18674e,_0x264082=this['combatLogWindowRect']();this[_0x9c3a81(0x21e)]=new Window_CombatLogDisplay(_0x264082),this['_combatLogWindow']['setCombatLogIndex'](0x0),this[_0x9c3a81(0x234)](this['_combatLogWindow']),this[_0x9c3a81(0x21e)]['x']=this[_0x9c3a81(0x2b7)]['x'],this[_0x9c3a81(0x21e)]['y']=this['_windowLayer']['y'],this[_0x9c3a81(0x21e)]['setBackgroundType'](VisuMZ['CombatLog'][_0x9c3a81(0x350)][_0x9c3a81(0x219)][_0x9c3a81(0x3da)]),this[_0x9c3a81(0x21e)][_0x9c3a81(0x2b1)](_0x9c3a81(0x248),this['closeCombatLog'][_0x9c3a81(0x2a5)](this)),this[_0x9c3a81(0x21e)][_0x9c3a81(0x2b1)]('cancel',this['closeCombatLog'][_0x9c3a81(0x2a5)](this)),this[_0x9c3a81(0x377)][_0x9c3a81(0x2b1)]('combatLog',this[_0x9c3a81(0x291)][_0x9c3a81(0x2a5)](this,this[_0x9c3a81(0x377)])),this['_actorCommandWindow']['setHandler']('combatLog',this[_0x9c3a81(0x291)]['bind'](this,this['_actorCommandWindow']));},Scene_Battle[_0x18674e(0x2f3)][_0x18674e(0x3e9)]=function(){const _0xe5bdbc=_0x18674e,_0x2bb945=VisuMZ[_0xe5bdbc(0x388)]['Settings']['Window'][_0xe5bdbc(0x366)];if(_0x2bb945)return _0x2bb945[_0xe5bdbc(0x26e)](this);const _0x6a81c3=0x0,_0x544f16=0x0,_0x15d274=Graphics[_0xe5bdbc(0x26c)],_0x122c2d=Graphics[_0xe5bdbc(0x2b0)];return new Rectangle(_0x6a81c3,_0x544f16,_0x15d274,_0x122c2d);},VisuMZ[_0x18674e(0x388)]['Scene_Battle_isAnyInputWindowActive']=Scene_Battle['prototype'][_0x18674e(0x2a6)],Scene_Battle[_0x18674e(0x2f3)][_0x18674e(0x2a6)]=function(){const _0x359148=_0x18674e;if(this[_0x359148(0x21e)]&&this[_0x359148(0x21e)][_0x359148(0x38d)])return!![];return VisuMZ[_0x359148(0x388)][_0x359148(0x29a)][_0x359148(0x26e)](this);},VisuMZ['CombatLog'][_0x18674e(0x278)]=Scene_Battle[_0x18674e(0x2f3)][_0x18674e(0x317)],Scene_Battle['prototype']['updateCancelButton']=function(){const _0x33d0ea=_0x18674e;VisuMZ['CombatLog']['Scene_Battle_updateCancelButton'][_0x33d0ea(0x26e)](this);if(this[_0x33d0ea(0x21e)]&&this[_0x33d0ea(0x21e)][_0x33d0ea(0x3bf)]>0x0&&this[_0x33d0ea(0x2fd)]){if(_0x33d0ea(0x1fe)!==_0x33d0ea(0x27a))this['_cancelButton']['visible']=![];else{let _0x22c060=_0x23264d['Text_AntiDmgBarrier_MpDisperse'];if(_0x22c060){let _0x483e61=_0x22c060['format'](this[_0x33d0ea(0x27e)](),_0xec9ce4['name'],_0x3467e6['mp']),_0x5ed972=_0x22d4a8[_0x33d0ea(0x210)];_0x38d7fe[_0x33d0ea(0x37b)](_0x483e61,_0x5ed972);}}}},VisuMZ[_0x18674e(0x388)]['Scene_Battle_isTimeActive']=Scene_Battle[_0x18674e(0x2f3)][_0x18674e(0x266)],Scene_Battle[_0x18674e(0x2f3)][_0x18674e(0x266)]=function(){const _0x288ab4=_0x18674e;if(BattleManager['isActiveTpb']()&&this[_0x288ab4(0x21e)]&&this['_combatLogWindow'][_0x288ab4(0x38d)]){if('EjLcR'===_0x288ab4(0x295))_0x2d5392[_0x288ab4(0x2aa)](!![]),_0x166123['CombatLog'][_0x288ab4(0x3a7)]['call'](this),_0x1897dc[_0x288ab4(0x2aa)](![]),_0x2561e6[_0x288ab4(0x1c8)]();else return![];}else{if('odruK'!=='iIoyV')return VisuMZ[_0x288ab4(0x388)][_0x288ab4(0x3e5)][_0x288ab4(0x26e)](this);else this['_requestRefresh']=!![];}},Scene_Battle['prototype'][_0x18674e(0x291)]=function(_0x39c5fe){const _0x4096fe=_0x18674e;this[_0x4096fe(0x21e)][_0x4096fe(0x353)](),this[_0x4096fe(0x21e)][_0x4096fe(0x2c7)](),this['_combatLogWindow'][_0x4096fe(0x34e)](),this[_0x4096fe(0x21e)][_0x4096fe(0x31e)](_0x39c5fe);},Scene_Battle[_0x18674e(0x2f3)][_0x18674e(0x2ac)]=function(){const _0x362f82=_0x18674e;this[_0x362f82(0x21e)]['close']();const _0x32d8bd=this[_0x362f82(0x21e)][_0x362f82(0x2a7)]();_0x32d8bd['activate']();};function Scene_CombatLog(){const _0x460975=_0x18674e;this[_0x460975(0x30c)](...arguments);}Scene_CombatLog[_0x18674e(0x2f3)]=Object[_0x18674e(0x3ca)](Scene_MenuBase[_0x18674e(0x2f3)]),Scene_CombatLog[_0x18674e(0x2f3)][_0x18674e(0x3e2)]=Scene_CombatLog,Scene_CombatLog[_0x18674e(0x2f3)][_0x18674e(0x30c)]=function(){const _0x3f58cf=_0x18674e;Scene_MenuBase[_0x3f58cf(0x2f3)]['initialize'][_0x3f58cf(0x26e)](this);},Scene_CombatLog[_0x18674e(0x2f3)][_0x18674e(0x3c4)]=function(){return 0x0;},Scene_CombatLog[_0x18674e(0x2f3)][_0x18674e(0x3ca)]=function(){const _0xd90d58=_0x18674e;Scene_MenuBase[_0xd90d58(0x2f3)][_0xd90d58(0x3ca)][_0xd90d58(0x26e)](this),this['createHistoryWindow'](),this[_0xd90d58(0x1f3)]();},Scene_CombatLog[_0x18674e(0x2f3)][_0x18674e(0x33d)]=function(){const _0x1f4e85=_0x18674e,_0x50745f=this[_0x1f4e85(0x2b4)]();this[_0x1f4e85(0x2c4)]=new Window_CombatLogHistory(_0x50745f),this['_historyWindow']['setHandler'](_0x1f4e85(0x1e2),this['popScene'][_0x1f4e85(0x2a5)](this)),this[_0x1f4e85(0x3d7)](this[_0x1f4e85(0x2c4)]),this[_0x1f4e85(0x2c4)]['setBackgroundType'](VisuMZ['CombatLog'][_0x1f4e85(0x350)][_0x1f4e85(0x219)][_0x1f4e85(0x244)]);},Scene_CombatLog['prototype'][_0x18674e(0x2b4)]=function(){const _0x473bef=_0x18674e,_0x4fb684=VisuMZ[_0x473bef(0x388)][_0x473bef(0x350)][_0x473bef(0x219)][_0x473bef(0x37e)];if(_0x4fb684)return _0x4fb684[_0x473bef(0x26e)](this);const _0x3f2dee=Graphics[_0x473bef(0x26c)],_0x2456f8=this[_0x473bef(0x2f9)](0x1,!![]),_0x24af91=0x0,_0x4bab73=this[_0x473bef(0x262)]();return new Rectangle(_0x24af91,_0x4bab73,_0x3f2dee,_0x2456f8);},Scene_CombatLog['prototype'][_0x18674e(0x1f3)]=function(){const _0x3d4761=_0x18674e,_0xb3954a=this['combatLogWindowRect']();this[_0x3d4761(0x21e)]=new Window_CombatLogDisplay(_0xb3954a),this[_0x3d4761(0x3d7)](this['_combatLogWindow']),this['_historyWindow']['setLogWindow'](this[_0x3d4761(0x21e)]),this[_0x3d4761(0x21e)][_0x3d4761(0x24e)](VisuMZ[_0x3d4761(0x388)][_0x3d4761(0x350)]['Window'][_0x3d4761(0x3e1)]);},Scene_CombatLog[_0x18674e(0x2f3)]['combatLogWindowRect']=function(){const _0x5bad34=_0x18674e,_0x823a82=VisuMZ[_0x5bad34(0x388)]['Settings'][_0x5bad34(0x219)]['CombatLogMenu_RectJS'];if(_0x823a82)return _0x823a82[_0x5bad34(0x26e)](this);const _0x10427e=0x0,_0x425ecc=this['_historyWindow']['y']+this['_historyWindow'][_0x5bad34(0x20f)],_0x15067d=Graphics[_0x5bad34(0x26c)],_0x30f0a5=this[_0x5bad34(0x2c0)]()-this[_0x5bad34(0x2c4)][_0x5bad34(0x20f)];return new Rectangle(_0x10427e,_0x425ecc,_0x15067d,_0x30f0a5);},Scene_CombatLog[_0x18674e(0x2f3)][_0x18674e(0x328)]=function(){const _0x335c45=_0x18674e;Scene_MenuBase[_0x335c45(0x2f3)]['createBackground'][_0x335c45(0x26e)](this),this[_0x335c45(0x20a)](this[_0x335c45(0x327)]()),this['createCustomBackgroundImages']();},Scene_CombatLog[_0x18674e(0x2f3)][_0x18674e(0x327)]=function(){const _0x35b2de=_0x18674e;return VisuMZ[_0x35b2de(0x388)][_0x35b2de(0x350)][_0x35b2de(0x252)]['SnapshotOpacity'];},Scene_CombatLog[_0x18674e(0x2f3)]['createCustomBackgroundImages']=function(){const _0x2773f4=_0x18674e,_0x429688=VisuMZ[_0x2773f4(0x388)][_0x2773f4(0x350)][_0x2773f4(0x252)];_0x429688&&(_0x429688[_0x2773f4(0x1d5)]!==''||_0x429688['BgFilename2']!=='')&&(this['_backSprite1']=new Sprite(ImageManager['loadTitle1'](_0x429688['BgFilename1'])),this[_0x2773f4(0x290)]=new Sprite(ImageManager[_0x2773f4(0x247)](_0x429688[_0x2773f4(0x398)])),this[_0x2773f4(0x234)](this['_backSprite1']),this[_0x2773f4(0x234)](this[_0x2773f4(0x290)]),this[_0x2773f4(0x300)][_0x2773f4(0x3b2)][_0x2773f4(0x3a1)](this['adjustSprite'][_0x2773f4(0x2a5)](this,this['_backSprite1'])),this['_backSprite2'][_0x2773f4(0x3b2)][_0x2773f4(0x3a1)](this[_0x2773f4(0x27d)][_0x2773f4(0x2a5)](this,this[_0x2773f4(0x290)])));},Scene_CombatLog['prototype'][_0x18674e(0x27d)]=function(_0x3d0043){const _0x347c35=_0x18674e;this['scaleSprite'](_0x3d0043),this[_0x347c35(0x3c0)](_0x3d0043);},VisuMZ[_0x18674e(0x388)][_0x18674e(0x30e)]=Window_Selectable['prototype'][_0x18674e(0x1ca)],Window_Selectable[_0x18674e(0x2f3)][_0x18674e(0x1ca)]=function(){const _0x17fd46=_0x18674e;if(SceneManager['isSceneBattle']()){const _0x1e7da7=SceneManager[_0x17fd46(0x245)][_0x17fd46(0x21e)];if(_0x1e7da7&&_0x1e7da7['isOpen']())return![];}return VisuMZ[_0x17fd46(0x388)][_0x17fd46(0x30e)][_0x17fd46(0x26e)](this);},VisuMZ[_0x18674e(0x388)]['Window_Selectable_isCursorMovable']=Window_Selectable[_0x18674e(0x2f3)][_0x18674e(0x211)],Window_Selectable[_0x18674e(0x2f3)][_0x18674e(0x211)]=function(){const _0x5f512e=_0x18674e;if(SceneManager[_0x5f512e(0x216)]()){if(_0x5f512e(0x21b)===_0x5f512e(0x21b)){const _0x596a5e=SceneManager[_0x5f512e(0x245)][_0x5f512e(0x21e)];if(_0x596a5e&&_0x596a5e[_0x5f512e(0x203)]())return![];}else{let _0x48da40=_0x59d672[_0x5f512e(0x235)],_0x511802=_0x48da40[_0x5f512e(0x256)](_0x420eae[_0x5f512e(0x27e)](),_0x636124[_0x5f512e(0x3b6)]),_0xaf047d=_0x42a94e[_0x5f512e(0x210)];_0x524116[_0x5f512e(0x37b)](_0x511802,_0xaf047d);}}return VisuMZ[_0x5f512e(0x388)]['Window_Selectable_isCursorMovable']['call'](this);},VisuMZ['CombatLog'][_0x18674e(0x25f)]=Window_MenuCommand[_0x18674e(0x2f3)][_0x18674e(0x1eb)],Window_MenuCommand[_0x18674e(0x2f3)][_0x18674e(0x1eb)]=function(){const _0x575806=_0x18674e;VisuMZ[_0x575806(0x388)]['Window_MenuCommand_addOriginalCommands']['call'](this);if(Imported[_0x575806(0x397)])return;this[_0x575806(0x1d8)]();},Window_MenuCommand[_0x18674e(0x2f3)][_0x18674e(0x1d8)]=function(){const _0x510a83=_0x18674e;if(!this['isCombatLogCommandVisible']())return;const _0x23faaa=TextManager['combatLog_BattleCmd_Name'],_0x12c23d=this['isCombatLogCommandEnabled']();this['addCommand'](_0x23faaa,_0x510a83(0x248),_0x12c23d);},Window_MenuCommand[_0x18674e(0x2f3)]['isCombatLogCommandVisible']=function(){const _0x262430=_0x18674e;return $gameSystem[_0x262430(0x23a)]();},Window_MenuCommand[_0x18674e(0x2f3)]['isCombatLogCommandEnabled']=function(){return $gameSystem['isMainMenuCombatLogEnabled']();},VisuMZ['CombatLog'][_0x18674e(0x38e)]=Window_BattleLog[_0x18674e(0x2f3)]['startTurn'],Window_BattleLog[_0x18674e(0x2f3)][_0x18674e(0x2c5)]=function(){const _0x1327ef=_0x18674e;VisuMZ[_0x1327ef(0x388)][_0x1327ef(0x38e)][_0x1327ef(0x26e)](this);if(!VisuMZ['CombatLog'][_0x1327ef(0x350)][_0x1327ef(0x388)][_0x1327ef(0x305)])return;$gameSystem['addHorzLineToCombatLog']();let _0x1519ff=TextManager[_0x1327ef(0x35f)][_0x1327ef(0x256)]($gameTroop[_0x1327ef(0x23f)]()),_0xe73f85=ImageManager[_0x1327ef(0x2f6)];$gameSystem['addTextToCombatLog'](_0x1519ff,_0xe73f85);},VisuMZ[_0x18674e(0x388)]['Window_BattleLog_startAction']=Window_BattleLog[_0x18674e(0x2f3)]['startAction'],Window_BattleLog[_0x18674e(0x2f3)]['startAction']=function(_0xa4674d,_0x4d6211,_0x31b2d1){const _0x32b77d=_0x18674e;$gameSystem[_0x32b77d(0x1c8)](),VisuMZ[_0x32b77d(0x388)][_0x32b77d(0x281)][_0x32b77d(0x26e)](this,_0xa4674d,_0x4d6211,_0x31b2d1);},VisuMZ[_0x18674e(0x388)][_0x18674e(0x1da)]=Window_BattleLog[_0x18674e(0x2f3)]['displayCurrentState'],Window_BattleLog['prototype'][_0x18674e(0x218)]=function(_0x5befa4){const _0x22c42e=_0x18674e;VisuMZ[_0x22c42e(0x388)]['Window_BattleLog_displayCurrentState']['call'](this,_0x5befa4);if(!_0x5befa4)return;if(!VisuMZ['CombatLog'][_0x22c42e(0x350)][_0x22c42e(0x388)][_0x22c42e(0x2b5)]);const _0x43ab12=_0x5befa4['states']();for(const _0x4ee57b of _0x43ab12){if(!_0x4ee57b)continue;if(!_0x4ee57b['message3'])continue;if(_0x4ee57b[_0x22c42e(0x2c3)][_0x22c42e(0x378)](VisuMZ['CombatLog']['RegExp'][_0x22c42e(0x365)]))continue;let _0x21b8e4=_0x4ee57b[_0x22c42e(0x296)],_0x15b3c1=_0x21b8e4[_0x22c42e(0x256)](_0x5befa4[_0x22c42e(0x27e)]()),_0x3c59d8=_0x4ee57b['iconIndex'];$gameSystem[_0x22c42e(0x37b)](_0x15b3c1,_0x3c59d8);}},VisuMZ[_0x18674e(0x388)][_0x18674e(0x348)]=Window_BattleLog['prototype']['displayAction'],Window_BattleLog[_0x18674e(0x2f3)][_0x18674e(0x35d)]=function(_0x18dda1,_0x1d0266){const _0x223fa7=_0x18674e;VisuMZ[_0x223fa7(0x388)]['Window_BattleLog_displayAction'][_0x223fa7(0x26e)](this,_0x18dda1,_0x1d0266);const _0x22536b=VisuMZ[_0x223fa7(0x388)]['Settings'][_0x223fa7(0x388)];if(DataManager[_0x223fa7(0x2e0)](_0x1d0266)){if('OPeNs'!==_0x223fa7(0x22b)){if(_0x1d0266[_0x223fa7(0x235)]&&_0x22536b[_0x223fa7(0x241)]){let _0x269b75=_0x1d0266['message1'],_0x5280ca=_0x269b75[_0x223fa7(0x256)](_0x18dda1['combatLogName'](),_0x1d0266['name']),_0x1bd72a=_0x1d0266[_0x223fa7(0x210)];$gameSystem[_0x223fa7(0x37b)](_0x5280ca,_0x1bd72a);}if(_0x1d0266[_0x223fa7(0x229)]&&_0x22536b[_0x223fa7(0x1ee)]){let _0x10284c=_0x1d0266[_0x223fa7(0x229)],_0x118617=_0x10284c[_0x223fa7(0x256)](_0x18dda1['combatLogName'](),_0x1d0266['name']),_0x85534c=_0x1d0266[_0x223fa7(0x210)];$gameSystem[_0x223fa7(0x37b)](_0x118617,_0x85534c);}}else{_0xd83f49[_0x223fa7(0x1ed)](_0x167b48,_0x1c3edc);const _0x20328e=_0xe29185[_0x223fa7(0x253)];_0x186769['setActorCmdCombatLogVisible'](_0x20328e);}}else{if(_0x223fa7(0x367)!==_0x223fa7(0x367)){const _0x1550c3=_0x1ec5bc[_0x223fa7(0x245)][_0x223fa7(0x21e)];if(_0x1550c3&&_0x1550c3[_0x223fa7(0x203)]())return![];}else{if(TextManager[_0x223fa7(0x380)]&&_0x22536b[_0x223fa7(0x2b3)]){if(_0x223fa7(0x201)===_0x223fa7(0x201)){let _0x5311e6=TextManager['useItem'],_0x4ef479=_0x5311e6[_0x223fa7(0x256)](_0x18dda1[_0x223fa7(0x27e)](),_0x1d0266[_0x223fa7(0x3b6)]),_0x331307=_0x1d0266[_0x223fa7(0x210)];$gameSystem[_0x223fa7(0x37b)](_0x4ef479,_0x331307);}else{let _0xd08920=_0x3a6449[_0x223fa7(0x256)](this[_0x223fa7(0x27e)]()),_0xf53fce=_0x41bbdb[_0x223fa7(0x283)];_0x4ff4af[_0x223fa7(0x37b)](_0xd08920,_0xf53fce);}}}}},VisuMZ['CombatLog'][_0x18674e(0x35c)]=Window_BattleLog['prototype'][_0x18674e(0x39e)],Window_BattleLog['prototype'][_0x18674e(0x39e)]=function(_0x7982f4){const _0x4ef9ed=_0x18674e;VisuMZ[_0x4ef9ed(0x388)][_0x4ef9ed(0x35c)][_0x4ef9ed(0x26e)](this,_0x7982f4);if(TextManager[_0x4ef9ed(0x206)]&&VisuMZ[_0x4ef9ed(0x388)][_0x4ef9ed(0x350)][_0x4ef9ed(0x388)][_0x4ef9ed(0x1db)]){let _0x41a709=TextManager['counterAttack'],_0x280404=_0x41a709[_0x4ef9ed(0x256)](_0x7982f4[_0x4ef9ed(0x27e)]()),_0x52b4f1=ImageManager[_0x4ef9ed(0x3c5)];$gameSystem[_0x4ef9ed(0x37b)](_0x280404,_0x52b4f1);}},VisuMZ[_0x18674e(0x388)]['Window_BattleLog_displayReflection']=Window_BattleLog[_0x18674e(0x2f3)]['displayReflection'],Window_BattleLog[_0x18674e(0x2f3)][_0x18674e(0x2e7)]=function(_0x53822d){const _0x4d2212=_0x18674e;VisuMZ['CombatLog'][_0x4d2212(0x1f4)]['call'](this,_0x53822d);if(TextManager[_0x4d2212(0x37a)]&&VisuMZ[_0x4d2212(0x388)]['Settings'][_0x4d2212(0x388)][_0x4d2212(0x23e)]){let _0x81a818=TextManager[_0x4d2212(0x37a)],_0x505cc6=_0x81a818[_0x4d2212(0x256)](_0x53822d[_0x4d2212(0x27e)]()),_0x57ce2f=ImageManager[_0x4d2212(0x3e7)];$gameSystem[_0x4d2212(0x37b)](_0x505cc6,_0x57ce2f);}},VisuMZ[_0x18674e(0x388)][_0x18674e(0x24d)]=Window_BattleLog[_0x18674e(0x2f3)][_0x18674e(0x272)],Window_BattleLog[_0x18674e(0x2f3)]['displaySubstitute']=function(_0x1c6696,_0x42357d){const _0x16d4a3=_0x18674e;VisuMZ['CombatLog'][_0x16d4a3(0x24d)][_0x16d4a3(0x26e)](this,_0x1c6696,_0x42357d);if(TextManager[_0x16d4a3(0x3ba)]&&VisuMZ['CombatLog']['Settings'][_0x16d4a3(0x388)][_0x16d4a3(0x2b8)]){const _0x56e71f=_0x1c6696[_0x16d4a3(0x27e)]();let _0x4db333=TextManager['substitute'],_0x121a62=_0x4db333[_0x16d4a3(0x256)](_0x56e71f,_0x42357d[_0x16d4a3(0x27e)]()),_0x58b3f4=ImageManager[_0x16d4a3(0x25d)];$gameSystem[_0x16d4a3(0x37b)](_0x121a62,_0x58b3f4);}},VisuMZ[_0x18674e(0x388)]['Window_BattleLog_displayFailure']=Window_BattleLog[_0x18674e(0x2f3)][_0x18674e(0x1ea)],Window_BattleLog['prototype'][_0x18674e(0x1ea)]=function(_0x2928d1){const _0x3d4156=_0x18674e;VisuMZ[_0x3d4156(0x388)][_0x3d4156(0x2d3)]['call'](this,_0x2928d1);if(_0x2928d1[_0x3d4156(0x287)]()[_0x3d4156(0x1c9)]()&&!_0x2928d1[_0x3d4156(0x287)]()[_0x3d4156(0x2bd)]){if(TextManager[_0x3d4156(0x249)]&&VisuMZ[_0x3d4156(0x388)][_0x3d4156(0x350)][_0x3d4156(0x388)][_0x3d4156(0x29d)]){if('ZwiVB'==='SXRfW'){const _0x2b614a=_0x3a82e4['CombatLog'][_0x3d4156(0x350)][_0x3d4156(0x219)]['CombatLogMenu_RectJS'];if(_0x2b614a)return _0x2b614a[_0x3d4156(0x26e)](this);const _0x281577=0x0,_0x4bd079=this['_historyWindow']['y']+this[_0x3d4156(0x2c4)]['height'],_0x28a434=_0x1903eb[_0x3d4156(0x26c)],_0x169066=this[_0x3d4156(0x2c0)]()-this[_0x3d4156(0x2c4)]['height'];return new _0x393b25(_0x281577,_0x4bd079,_0x28a434,_0x169066);}else{let _0x107f90=TextManager[_0x3d4156(0x249)],_0x403dd2=_0x107f90['format'](_0x2928d1['combatLogName']()),_0x49435e=ImageManager[_0x3d4156(0x298)];$gameSystem[_0x3d4156(0x37b)](_0x403dd2,_0x49435e);}}}},VisuMZ[_0x18674e(0x388)][_0x18674e(0x381)]=Window_BattleLog[_0x18674e(0x2f3)][_0x18674e(0x3b3)],Window_BattleLog[_0x18674e(0x2f3)][_0x18674e(0x3b3)]=function(_0x71b55a){const _0x25861a=_0x18674e;VisuMZ[_0x25861a(0x388)][_0x25861a(0x381)]['call'](this,_0x71b55a);if(_0x71b55a[_0x25861a(0x287)]()['critical']&&VisuMZ[_0x25861a(0x388)][_0x25861a(0x350)]['CombatLog'][_0x25861a(0x1c7)]){if(_0x25861a(0x1e4)==='XjmJr'){let _0x5441b6=_0x250648[_0x25861a(0x206)],_0x52f5c8=_0x5441b6[_0x25861a(0x256)](_0x5d03dc['combatLogName']()),_0x5ea306=_0xb9e72[_0x25861a(0x3c5)];_0x191c9f[_0x25861a(0x37b)](_0x52f5c8,_0x5ea306);}else{if(_0x71b55a['isActor']()){if('LCQlm'!==_0x25861a(0x3a3)){if(TextManager[_0x25861a(0x302)]){let _0x530518=TextManager[_0x25861a(0x302)],_0x2792d=ImageManager[_0x25861a(0x21f)];$gameSystem[_0x25861a(0x37b)](_0x530518,_0x2792d);}}else this['_requestRefresh']&&this[_0x25861a(0x34e)]();}else{if(TextManager[_0x25861a(0x293)]){let _0x3a6d9f=TextManager['criticalToEnemy'],_0x4eac6a=ImageManager[_0x25861a(0x21f)];$gameSystem['addTextToCombatLog'](_0x3a6d9f,_0x4eac6a);}}}}},VisuMZ[_0x18674e(0x388)][_0x18674e(0x29f)]=Window_BattleLog[_0x18674e(0x2f3)]['displayMiss'],Window_BattleLog[_0x18674e(0x2f3)][_0x18674e(0x36a)]=function(_0x3e564f){const _0x3f9a18=_0x18674e;VisuMZ[_0x3f9a18(0x388)][_0x3f9a18(0x29f)]['call'](this,_0x3e564f);if(_0x3e564f[_0x3f9a18(0x287)]()[_0x3f9a18(0x373)]&&VisuMZ['CombatLog'][_0x3f9a18(0x350)][_0x3f9a18(0x388)]['ShowMiss']){if('HlWSC'!==_0x3f9a18(0x1d1)){const _0x15aee0=_0x3e564f[_0x3f9a18(0x36b)]();if(_0x15aee0&&TextManager[_0x3f9a18(0x2c9)]){let _0x4c7c91=TextManager[_0x3f9a18(0x2c9)],_0x3306c2=_0x4c7c91['format'](_0x3e564f[_0x3f9a18(0x27e)]()),_0xc8ef1e=ImageManager[_0x3f9a18(0x393)];$gameSystem[_0x3f9a18(0x37b)](_0x3306c2,_0xc8ef1e);}else{if(!_0x15aee0&&TextManager[_0x3f9a18(0x3b1)]){let _0x394953=TextManager[_0x3f9a18(0x3b1)],_0x1ceec2=_0x394953[_0x3f9a18(0x256)](_0x3e564f[_0x3f9a18(0x27e)]()),_0x39b871=ImageManager['combatLog_Miss_Icon'];$gameSystem[_0x3f9a18(0x37b)](_0x1ceec2,_0x39b871);}}}else{let _0x136457=_0x2caaf5['format'](this[_0x3f9a18(0x27e)]()),_0x4aee5a=_0x33b7ac['iconIndex'];_0xedf755[_0x3f9a18(0x37b)](_0x136457,_0x4aee5a);}}else{if(TextManager[_0x3f9a18(0x249)]&&VisuMZ[_0x3f9a18(0x388)][_0x3f9a18(0x350)]['CombatLog'][_0x3f9a18(0x29d)]){if('qdxBO'===_0x3f9a18(0x2f0)){let _0x30cc35=TextManager[_0x3f9a18(0x249)],_0x47244c=_0x30cc35[_0x3f9a18(0x256)](_0x3e564f[_0x3f9a18(0x27e)]()),_0x30eab5=ImageManager['combatLog_Failure_Icon'];$gameSystem['addTextToCombatLog'](_0x47244c,_0x30eab5);}else{let _0x197500=_0x8d2711[_0x3f9a18(0x3b1)],_0x32bd84=_0x197500['format'](_0x40b663[_0x3f9a18(0x27e)]()),_0x5061fe=_0x13164f[_0x3f9a18(0x393)];_0x4da346[_0x3f9a18(0x37b)](_0x32bd84,_0x5061fe);}}}},VisuMZ['CombatLog'][_0x18674e(0x2fc)]=Window_BattleLog[_0x18674e(0x2f3)][_0x18674e(0x26a)],Window_BattleLog[_0x18674e(0x2f3)][_0x18674e(0x26a)]=function(_0x5d49cf){const _0x29ab35=_0x18674e;VisuMZ[_0x29ab35(0x388)][_0x29ab35(0x2fc)]['call'](this,_0x5d49cf);if(VisuMZ[_0x29ab35(0x388)][_0x29ab35(0x350)][_0x29ab35(0x388)][_0x29ab35(0x399)]){if(_0x5d49cf['result']()[_0x29ab35(0x373)]&&TextManager[_0x29ab35(0x1d9)]){let _0x810579=TextManager['evasion'],_0x214e31=_0x810579['format'](_0x5d49cf[_0x29ab35(0x27e)]()),_0x50d45a=ImageManager['combatLog_Evasion_Icon'];$gameSystem[_0x29ab35(0x37b)](_0x214e31,_0x50d45a);}else{if(TextManager['magicEvasion']){let _0x33122d=TextManager['magicEvasion'],_0x55b7b9=_0x33122d[_0x29ab35(0x256)](_0x5d49cf[_0x29ab35(0x27e)]()),_0x1221a4=ImageManager[_0x29ab35(0x1f0)];$gameSystem['addTextToCombatLog'](_0x55b7b9,_0x1221a4);}}}},VisuMZ[_0x18674e(0x388)][_0x18674e(0x230)]=Window_PartyCommand[_0x18674e(0x2f3)][_0x18674e(0x32e)],Window_PartyCommand['prototype'][_0x18674e(0x32e)]=function(){const _0x2325d2=_0x18674e;VisuMZ[_0x2325d2(0x388)][_0x2325d2(0x230)][_0x2325d2(0x26e)](this);if(Imported[_0x2325d2(0x1d6)])return;this[_0x2325d2(0x1d8)]();},VisuMZ[_0x18674e(0x388)][_0x18674e(0x200)]=Window_PartyCommand['prototype']['addCustomCommands'],Window_PartyCommand[_0x18674e(0x2f3)][_0x18674e(0x275)]=function(){const _0x1b6499=_0x18674e;VisuMZ[_0x1b6499(0x388)]['Window_PartyCommand_addCustomCommands']['call'](this),this[_0x1b6499(0x1d8)]();},Window_PartyCommand[_0x18674e(0x2f3)][_0x18674e(0x1d8)]=function(){const _0x4f4e35=_0x18674e;if(!$gameSystem[_0x4f4e35(0x212)]())return;if(this[_0x4f4e35(0x2d4)](_0x4f4e35(0x248))>=0x0)return;const _0x559d70=Imported[_0x4f4e35(0x1d6)]?this[_0x4f4e35(0x325)]():'text',_0x3a7b65=TextManager['combatLog_BattleCmd_Name'],_0x4c96a9=ImageManager['combatLog_BattleCmd_Icon']||0x0,_0x3d1d5b=_0x559d70===_0x4f4e35(0x36f)?_0x3a7b65:'\x5cI[%1]%2'[_0x4f4e35(0x256)](_0x4c96a9,_0x3a7b65);this[_0x4f4e35(0x3a4)](_0x3d1d5b,'combatLog');},VisuMZ[_0x18674e(0x388)][_0x18674e(0x354)]=Window_ActorCommand[_0x18674e(0x2f3)][_0x18674e(0x32e)],Window_ActorCommand[_0x18674e(0x2f3)][_0x18674e(0x32e)]=function(){const _0xb4e71f=_0x18674e;VisuMZ['CombatLog']['Window_ActorCommand_makeCommandList'][_0xb4e71f(0x26e)](this);if(Imported[_0xb4e71f(0x1d6)])return;if(this[_0xb4e71f(0x2d4)](_0xb4e71f(0x248))>=0x0)return;this[_0xb4e71f(0x1d8)]();},VisuMZ['CombatLog']['Window_ActorCommand_addCustomCommands']=Window_ActorCommand[_0x18674e(0x2f3)][_0x18674e(0x275)],Window_ActorCommand['prototype']['addCustomCommands']=function(){const _0x7eb5de=_0x18674e;VisuMZ[_0x7eb5de(0x388)][_0x7eb5de(0x1f1)][_0x7eb5de(0x26e)](this),this['addCombatLogCommand']();},Window_ActorCommand[_0x18674e(0x2f3)][_0x18674e(0x1d8)]=function(){const _0x2666c9=_0x18674e;if(!$gameSystem['isActorCmdCombatLogVisible']())return;this[_0x2666c9(0x2d4)](_0x2666c9(0x248))>=0x0&&this['removeCombatLogCommand']();const _0x4ef196=Imported[_0x2666c9(0x1d6)]?this[_0x2666c9(0x325)]():_0x2666c9(0x36f),_0x343e3c=TextManager[_0x2666c9(0x223)],_0x2f7b0b=ImageManager[_0x2666c9(0x288)]||0x0,_0x2964a8=_0x4ef196===_0x2666c9(0x36f)?_0x343e3c:'\x5cI[%1]%2'[_0x2666c9(0x256)](_0x2f7b0b,_0x343e3c);this[_0x2666c9(0x3a4)](_0x2964a8,_0x2666c9(0x248));},VisuMZ[_0x18674e(0x388)][_0x18674e(0x350)][_0x18674e(0x26d)]=Window_ActorCommand[_0x18674e(0x2f3)][_0x18674e(0x1d7)],Window_ActorCommand[_0x18674e(0x2f3)][_0x18674e(0x1d7)]=function(){const _0x788218=_0x18674e,_0x3b2777=this[_0x788218(0x3d2)]();switch(_0x3b2777){case _0x788218(0x248):this[_0x788218(0x38b)]['setText'](TextManager[_0x788218(0x3d3)]);break;default:VisuMZ['CombatLog'][_0x788218(0x350)][_0x788218(0x26d)][_0x788218(0x26e)](this);break;}},Window_ActorCommand['prototype'][_0x18674e(0x307)]=function(){const _0x5809fc=_0x18674e;while(this[_0x5809fc(0x2d4)](_0x5809fc(0x248))>=0x0){if('CyiTI'==='CyiTI'){const _0x2fd400=this[_0x5809fc(0x2d4)](_0x5809fc(0x248));this[_0x5809fc(0x2d8)][_0x5809fc(0x34c)](_0x2fd400,0x1);}else _0xa5cc4a[_0x5809fc(0x388)]['Scene_Battle_updateCancelButton'][_0x5809fc(0x26e)](this),this[_0x5809fc(0x21e)]&&this[_0x5809fc(0x21e)][_0x5809fc(0x3bf)]>0x0&&this[_0x5809fc(0x2fd)]&&(this[_0x5809fc(0x2fd)][_0x5809fc(0x3e6)]=![]);}};function Window_CombatLogHistory(){const _0x5cc765=_0x18674e;this[_0x5cc765(0x30c)](...arguments);}Window_CombatLogHistory[_0x18674e(0x2f3)]=Object[_0x18674e(0x3ca)](Window_HorzCommand['prototype']),Window_CombatLogHistory['prototype'][_0x18674e(0x3e2)]=Window_CombatLogHistory,Window_CombatLogHistory['prototype'][_0x18674e(0x30c)]=function(_0x25be51){const _0x242a95=_0x18674e;Window_HorzCommand['prototype'][_0x242a95(0x30c)][_0x242a95(0x26e)](this,_0x25be51);},Window_CombatLogHistory['prototype'][_0x18674e(0x3c1)]=function(){const _0xb361e5=_0x18674e;return $gameSystem[_0xb361e5(0x2a9)]();},Window_CombatLogHistory['prototype'][_0x18674e(0x37d)]=function(){},Window_CombatLogHistory[_0x18674e(0x2f3)][_0x18674e(0x3cd)]=function(_0x59bf27){},Window_CombatLogHistory[_0x18674e(0x2f3)]['cursorUp']=function(_0x5551d3){},Window_CombatLogHistory[_0x18674e(0x2f3)][_0x18674e(0x343)]=function(){const _0x48f60e=_0x18674e;Window_HorzCommand[_0x48f60e(0x2f3)][_0x48f60e(0x343)]['call'](this),this[_0x48f60e(0x2eb)]&&this[_0x48f60e(0x2eb)][_0x48f60e(0x3b8)](this[_0x48f60e(0x24f)]());},Window_CombatLogHistory[_0x18674e(0x2f3)][_0x18674e(0x1e1)]=function(_0x5424f7){this['_logWindow']=_0x5424f7;},Window_CombatLogHistory[_0x18674e(0x2f3)][_0x18674e(0x32e)]=function(){const _0x42ef1e=_0x18674e;let _0x5d6385=$gameSystem[_0x42ef1e(0x2a9)]();for(let _0x186387=0x0;_0x186387<_0x5d6385;_0x186387++){let _0x4e6ffa=_0x186387===0x0?TextManager['_combatLog_Latest']:TextManager['_combatLog_HistoryFmt'],_0x20c254=_0x4e6ffa[_0x42ef1e(0x256)]($gameSystem[_0x42ef1e(0x3cf)]()-_0x186387);this[_0x42ef1e(0x3a4)](_0x20c254,_0x42ef1e(0x316),!![],_0x186387);}};function Window_CombatLogDisplay(){const _0x2375b5=_0x18674e;this[_0x2375b5(0x30c)](...arguments);}function _0x6674(){const _0xac6156=['processCursorMove','Scene_Battle_createDisplayObjects','getCombatLog','combatLog_HP_NoDmg','VisuMZ_3_InputComboSkills','combatLog_MP_Dmg','_combatLogIndex','TextColorHealHP','54767955ovRuAl','BattleManager_updateTurnEnd','filter','Text_AntiDmgBarrier_MpDisperse','createHistoryWindow','LMQBg','ShowEnemyEmerge','isActorCmdCombatLogVisible','scale','uLTfj','update','Scene_Menu_createCommandWindow','TextBattleSysCtbOrderChange','VisuMZ_3_ActiveChainSkills','pSVFB','Window_BattleLog_displayAction','Game_Battler_onAntiDamageCancelBarrier','isBypassCombatLog','TextColorDmgMP','splice','addStealText','battleRefresh','_combatLogSilentTp','Settings','dimColor1','upBYY','open','Window_ActorCommand_makeCommandList','Game_Battler_onLifeStateEffect','ShowBattleStart','SCROLL_SPEED_PAGEDN','ARRAYSTRUCT','onAntiDamageCancelBarrier','buffIconIndex','Show_AntiDmgBarrier_Reduce','Window_BattleLog_displayCounter','displayAction','SHOW_LINE_BACKGROUND','combatLog_StartTurn','Game_BattlerBase_decreaseBuff','Game_Battler_onAntiDamageTpBarrier','Compatibility','TextColorHealMP','UNmYT','BypassCombatLog','CombatLogBattle_RectJS','CNLRK','TextStartTurn','IconNoDmgHP','displayMiss','isActor','buffRemove','Window_BattleLog_addStealText','YbviA','text','FUNC','escapeStart','requestRefresh','physical','BIGGER_LINE_HEIGHT','EVAL','width','_partyCommandWindow','match','kphTa','magicReflection','addTextToCombatLog','_actorCommandWindow','processCursorHomeEndTrigger','CombatHistory_RectJS','refreshCombatLog','useItem','Window_BattleLog_displayCritical','itemHeight','battleMembers','isPressed','version','IconCritical','RcjWk','CombatLog','finishCurrentCombatLog','WANjH','_helpWindow','STR','active','Window_BattleLog_startTurn','drawHorzLine','HotKey','combatLog_Result_Victory','drawItemBackground','combatLog_Miss_Icon','1372121fjbSty','onEscapeFailure','isStateAffected','VisuMZ_1_MainMenuCore','BgFilename2','ShowEvade','pagedown','WlEmS','isBusy','combatLog_Result_Defeat','displayCounter','displayAbsorptionBarrierPopup','Text_AntiDmgBarrier_Cancel','addLoadListener','CombatHistoryLatest','vvXdd','addCommand','IconStartTurn','View\x20the\x20combat\x20log.','BattleManager_processAbort','parameters','combatLog_HP_Dmg','TextEndTurn','Game_Battler_onAtbInterrupt','Heal','_actorId','smoothScrollTo','2hdILRH','toUpperCase','enemyNoHit','bitmap','displayCritical','actorLoss','smoothScrollUp','name','YYpbc','setCombatLogIndex','NoDmg','substitute','isTpb','canPerformInputComboSkills','ACCESS_BUTTON','IconPreemptive','openness','centerSprite','maxCols','_preemptive','onAntiDamageTpBarrier','helpAreaHeight','combatLog_Counter_Icon','ShowPartyCommand','Show_AntiDmgBarrier_Absorb','Game_Battler_stbGainInstant','registerCommand','create','processAbort','IconNoDmgMP','cursorDown','drawTextEx','battleCount','setActorCmdCombatLogVisible','IconHealHP','currentSymbol','combatLogHelp','Game_System_initialize','onCtbOrderChange','stbGainInstant','addWindow','gradientFillRect','onAntiDamageMpBarrier','CombatLogBattle_BgType','defeat','Game_BattlerBase_increaseBuff','ShowDefeat','combatLog_TP_Heal','Game_BattlerBase_getAntiDamageBarrierReduction','startBattleCombatLog','CombatLogMenu_BgType','constructor','description','victory','Scene_Battle_isTimeActive','visible','combatLog_Reflection_Icon','Show_AntiDmgBarrier_MpDisperse','combatLogWindowRect','AutoColor','select','smoothScrollDown','eTson','YuOLp','return\x200','anchor','Icon','ShowCritical','addHorzLineToCombatLog','isHit','allowShiftScrolling','exit','setFrame','combatLog_Surprise_Icon','ShowHP','Icon_StealItems_Steal','UJmmx','wSGoI','_requestRefresh','updateTurnEnd','Game_BattlerBase_setTp','BgFilename1','VisuMZ_1_BattleCore','updateHelp','addCombatLogCommand','evasion','Window_BattleLog_displayCurrentState','ShowCounter','getAntiDamageBarrierReduction','isAccessKeyPressed','BattleManager_endTurn','_combatLog_HistoryFmt','RegExp','setLogWindow','cancel','IconSubst','xzlBK','pkant','ypcal','SystemShowCombatLogMenu','7JtBrLM','_commandWindow','displayFailure','addOriginalCommands','parse','ConvertParams','ShowSkillMessage2','onAtbInterrupt','combatLog_Evasion_Icon','Window_ActorCommand_addCustomCommands','Text','createCombatLogWindow','Window_BattleLog_displayReflection','RCuNo','checkRefresh','TextColorDmgTP','Text_AntiDmgBarrier_Reduce','IconEscape','combatLogBuffChanges','increaseBuff','Game_Battler_useItem','kAtlS','YJMuT','LhEwo','Window_PartyCommand_addCustomCommands','FtoNi','mXDFv','isOpen','BattleManager_startBattle','CrZWE','counterAttack','vqrtF','ARRAYJSON','ZiCtP','setBackgroundOpacity','none','applyCombatLogColor','combatLog_MP_NoDmg','actorRecovery','height','iconIndex','isCursorMovable','isPartyCmdCombatLogVisible','Show_AntiDmgBarrier_Cancel','IconBattleSysStbInstant','drawItem','isSceneBattle','Game_BattlerBase_eraseBuff','displayCurrentState','Window','Game_BattlerBase_setMp','majek','Name','combatLog_MP_Heal','_combatLogWindow','combatLog_CriticalHit_Icon','oEjEl','onAntiDamageNullificationBarrier','split','combatLog_BattleCmd_Name','_combatLogPayment','max','processVictory','combatLog_EndTurn_Icon','MeHOi','message2','IconVictory','yRGPA','debuffAdd','_combatLog_Latest','setMp','isActiveChainSkillsUiVisible','Window_PartyCommand_makeCommandList','nAMYT','mNmtG','_combatLogs','addChild','message1','pageup','IconBattleStart','ShowBattleSysAtbInterrupt','TextColorHealTP','isMainMenuCombatLogVisible','General','pop','decreaseBuff','ShowReflect','turnCount','onEscapeSuccess','ShowSkillMessage1','escapeFailure','NUM','CombatHistory_BgType','_scene','Game_BattlerBase_setHp','loadTitle2','combatLog','actionFailure','ShowBattleSysCtbOrderChange','315wlhVlQ','IconEnemyEmerge','Window_BattleLog_displaySubstitute','setBackgroundType','currentExt','combatLog_EndTurn','Text_LifeStateEffects_%1','BgSettings','Show','startBattle','TextColorDmgHP','format','TextBattleSysAtbInterrupt','ShowIcons','1268pVeKEv','Dmg','replace','NAijh','combatLog_Substitute_Icon','endTurn','Window_MenuCommand_addOriginalCommands','ShowEraseBuff','IconFail','mainAreaTop','createDisplayObjects','param','BattleManager_processVictory','isTimeActive','enemyRecovery','isCombatLogHotKeyActive','_dimmerSprite','displayEvasion','ShowTP','boxWidth','Window_ActorCommand_updateHelp','call','Game_Battler_addState','SystemShowCombatLogParty','IconEndTurn','displaySubstitute','partyName','IconSurprise','addCustomCommands','hotkeyOn','wPHof','Scene_Battle_updateCancelButton','YUIMD','ItgPw','deactivate','preemptive','adjustSprite','combatLogName','eraseBuff','UwpSA','Window_BattleLog_startAction','aliveMembers','IconBattleSysCtbOrderChange','ARRAYEVAL','ShowEscape','ARRAYFUNC','result','combatLog_BattleCmd_Icon','combatLog_TP_NoDmg','setCombatLogHotKeyActive','Text_AntiDmgBarrier_Nullify','initCombatLogBase','itemRect','IconEvade','Text_AntiDmgBarrier_TpDisperse','_backSprite2','openCombatLog','drawBackgroundRect','criticalToEnemy','IconBattleSysAtbInterrupt','fChXI','message3','SCROLL_SPEED_CURSOR','combatLog_Failure_Icon','emerge','Scene_Battle_isAnyInputWindowActive','Lociq','value','ShowFail','onTouchOk','Window_BattleLog_displayMiss','itemLineRect','TextBattleSysStbInstant','_buffs','isMenuCursorBlacklisted','scrollTo','bind','isAnyInputWindowActive','getLastWindow','2605395fLoKPY','getTotalCombatLogs','setBypassCombatLog','combatLogStateChanges','closeCombatLog','home','length','status','boxHeight','setHandler','maxScrollY','ShowItemMessage','historyWindowRect','ShowStateCurrent','Show_LifeStateEffects_%1','_windowLayer','ShowSubst','_mp','ShowStateAdd','ARRAYNUM','processCancel','success','Game_Battler_onAntiDamageMpBarrier','Show_AntiDmgBarrier_TpDisperse','mainAreaHeight','IconHealMP','dimColor2','note','_historyWindow','startTurn','combatLog_EnemyEmerge_Icon','activate','refresh','actorNoHit','292976tcjrsW','6574640AFSsUL','TextColorNoDmgHP','buffAdd','actorDamage','createDimmerSprite','gainSilentTp','TextColorNoDmgTP','22975DcmipK','Window_BattleLog_displayFailure','findSymbol','removeState','push','setPartyCmdCombatLogVisible','_list','combatLog_Result_Escape','IconDmgTP','jHlmW','_surprise','CombatLogAddText','partyCmd','_hp','isSkill','\x5cI[%1]%2','inBattle','8388906ToQpji','surprise','RWQgf','SaCLb','displayReflection','BattleManager_onEscapeFailure','adbmK','=====HORZLINE=====','_logWindow','onLifeStateEffect','_bypassAddToCombatLog','map','abs','qdxBO','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','ShowMainMenu','prototype','BattleManager_onEscapeSuccess','combatLog_TP_Dmg','combatLog_StartTurn_Icon','UQYAy','mainMenu','calcWindowHeight','Show_AntiDmgBarrier_Nullify','commandCombatLog','Window_BattleLog_displayEvasion','_cancelButton','BattleManager_processDefeat','IconReflect','_backSprite1','RemoveUnwantedTextCodes','criticalToActor','setMainMenuCombatLogVisible','Game_Battler_onCtbOrderChange','ShowStartTurn','ShowAddDebuff','removeCombatLogCommand','combatLog_Preemptive_Icon','Game_Battler_onAntiDamageNullificationBarrier','actorCmd','_lastWindow','initialize','Game_Battler_gainSilentTp','Window_Selectable_allowShiftScrolling','tZGIW','enemyLoss','combatLog_BattleStart_Icon','ShowEndTurn','combatLog_HP_Heal','\x5cC[%1]%2\x5cC[0]','FGzhH','history','updateCancelButton','addChildToBack','ShowVictory','ShowActorCommand','processDefeat','GSXaB','HORZ_LINE_THICKNESS','setLastWindow','ShowBattleSysStbInstant','enemyDamage','_combatLogAccess','leader','commandName','ShowAddBuff','commandStyle','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','getBackgroundOpacity','createBackground','isTriggered','UlfIs','IconCounter','_victoryPhase','initCombatLogAccess','makeCommandList','ShowAdvantages','STRUCT'];_0x6674=function(){return _0xac6156;};return _0x6674();}function _0x2c10(_0x302da0,_0x4a67f0){const _0x667400=_0x6674();return _0x2c10=function(_0x2c10fa,_0x1beba9){_0x2c10fa=_0x2c10fa-0x1c2;let _0x1e78c0=_0x667400[_0x2c10fa];return _0x1e78c0;},_0x2c10(_0x302da0,_0x4a67f0);}Window_CombatLogDisplay[_0x18674e(0x2f3)]=Object[_0x18674e(0x3ca)](Window_Command[_0x18674e(0x2f3)]),Window_CombatLogDisplay[_0x18674e(0x2f3)]['constructor']=Window_CombatLogDisplay,Window_CombatLogDisplay[_0x18674e(0x374)]=![],Window_CombatLogDisplay[_0x18674e(0x35e)]=![],Window_CombatLogDisplay[_0x18674e(0x31d)]=0x4,Window_CombatLogDisplay[_0x18674e(0x297)]=0.2,Window_CombatLogDisplay['SCROLL_SPEED_PAGEDN']=1.5,Window_CombatLogDisplay[_0x18674e(0x3bd)]=VisuMZ['CombatLog'][_0x18674e(0x350)][_0x18674e(0x23b)][_0x18674e(0x390)]||_0x18674e(0x20b),Window_CombatLogDisplay[_0x18674e(0x2f3)][_0x18674e(0x30c)]=function(_0x358aa5){const _0x5833c5=_0x18674e;Window_Command['prototype']['initialize'][_0x5833c5(0x26e)](this,_0x358aa5),this[_0x5833c5(0x27b)](),this[_0x5833c5(0x1d2)]=![],SceneManager['isSceneBattle']()&&(this[_0x5833c5(0x3bf)]=0x0);},Window_CombatLogDisplay[_0x18674e(0x2f3)][_0x18674e(0x382)]=function(){const _0x18b15a=_0x18674e;let _0x565f7c=Window_Scrollable['prototype'][_0x18b15a(0x382)][_0x18b15a(0x26e)](this);return _0x565f7c+(Window_CombatLogDisplay['BIGGER_LINE_HEIGHT']?0x8:0x0);},Window_CombatLogDisplay[_0x18674e(0x2f3)]['isAutoColorAffected']=function(){const _0x56a67a=_0x18674e;return VisuMZ['CombatLog']['Settings']['CombatLog'][_0x56a67a(0x3ea)];},Window_CombatLogDisplay['prototype'][_0x18674e(0x2a3)]=function(){return!![];},Window_CombatLogDisplay[_0x18674e(0x2f3)][_0x18674e(0x3eb)]=function(_0x5d4828){},Window_CombatLogDisplay[_0x18674e(0x2f3)]['processOk']=function(){const _0x2633cf=_0x18674e;this[_0x2633cf(0x2bc)]();},Window_CombatLogDisplay['prototype'][_0x18674e(0x29e)]=function(){const _0x14e24d=_0x18674e;this[_0x14e24d(0x2bc)]();},Window_CombatLogDisplay['prototype'][_0x18674e(0x331)]=function(){const _0x58c91d=_0x18674e;if(SceneManager[_0x58c91d(0x216)]()&&!this['active']){if($gameSystem['isCombatLogHotKeyActive']()&&Window_CombatLogDisplay[_0x58c91d(0x3bd)]!==undefined){if(this[_0x58c91d(0x1dd)]()){if('MIHrL'!==_0x58c91d(0x342))this[_0x58c91d(0x1f6)](),this[_0x58c91d(0x353)]();else{let _0x10bc68=_0x25ddb6[_0x58c91d(0x28f)];if(_0x10bc68){let _0x550738=_0x10bc68[_0x58c91d(0x256)](this[_0x58c91d(0x27e)](),_0x4a58d4['name'],_0x2c260d['tp']),_0xf65362=_0x4a4165[_0x58c91d(0x210)];_0x3a340c['addTextToCombatLog'](_0x550738,_0xf65362);}}}else this['close']();}}if(this[_0x58c91d(0x203)]()){if(_0x58c91d(0x31c)!=='jkIfk'){Input[_0x58c91d(0x384)]('down')&&this[_0x58c91d(0x3ec)](Window_CombatLogDisplay[_0x58c91d(0x297)]);Input[_0x58c91d(0x384)]('up')&&this[_0x58c91d(0x3b5)](Window_CombatLogDisplay[_0x58c91d(0x297)]);Input['isPressed'](_0x58c91d(0x39a))&&('Lociq'!==_0x58c91d(0x29b)?(this[_0x58c91d(0x269)]=new _0x1b368e(),this[_0x58c91d(0x269)][_0x58c91d(0x3b2)]=new _0x1cef2e(0x0,0x0),this[_0x58c91d(0x269)]['x']=-0x4,this[_0x58c91d(0x318)](this['_dimmerSprite'])):this[_0x58c91d(0x3ec)](Window_CombatLogDisplay[_0x58c91d(0x357)]));Input[_0x58c91d(0x384)](_0x58c91d(0x236))&&(_0x58c91d(0x347)!==_0x58c91d(0x347)?_0x35593d=_0x634c3f['format'](_0x341239,_0x58c91d(0x3b9)):this['smoothScrollUp'](Window_CombatLogDisplay[_0x58c91d(0x357)]));Input[_0x58c91d(0x329)](_0x58c91d(0x2ad))&&(_0x58c91d(0x33e)!==_0x58c91d(0x231)?this['smoothScrollTo'](0x0,0x0):this[_0x58c91d(0x2fd)][_0x58c91d(0x3e6)]=![]);if(Input[_0x58c91d(0x329)]('end')){if(_0x58c91d(0x387)===_0x58c91d(0x387))this[_0x58c91d(0x3ae)](0x0,this[_0x58c91d(0x2b2)]());else return!![];}}else return 0x0;}},Window_CombatLogDisplay['prototype'][_0x18674e(0x1dd)]=function(){const _0x4db2f0=_0x18674e;if($gameMessage['isBusy']())return![];if(BattleManager[_0x4db2f0(0x32c)])return![];if(Imported[_0x4db2f0(0x346)]){if(_0x4db2f0(0x2f7)==='UQYAy'){if(SceneManager['_scene']['isActiveChainSkillsUiVisible']())return![];}else{if(_0x1fb6e7[_0x4db2f0(0x35e)]){const _0x249227=this[_0x4db2f0(0x28d)](_0x3b74be);this[_0x4db2f0(0x292)](_0x249227);}}}if(Imported[_0x4db2f0(0x335)]){if(_0x4db2f0(0x1fd)===_0x4db2f0(0x3b7)){if(this[_0x4db2f0(0x3c2)]){let _0x556493=_0x48cae6[_0x4db2f0(0x27c)][_0x4db2f0(0x256)](_0x51ce97[_0x4db2f0(0x27e)]()),_0x2aa5e3=_0x3ff42e['combatLog_Preemptive_Icon'];_0x50fb21[_0x4db2f0(0x37b)](_0x556493,_0x2aa5e3);}else{if(this[_0x4db2f0(0x2dc)]){let _0x13b49a=_0x462fd7[_0x4db2f0(0x2e4)][_0x4db2f0(0x256)](_0x5c520c['combatLogName']()),_0x3fe567=_0x1c2a91[_0x4db2f0(0x1cd)];_0x4cdd16[_0x4db2f0(0x37b)](_0x13b49a,_0x3fe567);}}}else{if(SceneManager[_0x4db2f0(0x245)]['canPerformInputComboSkills']())return![];}}return Input['isPressed'](Window_CombatLogDisplay['ACCESS_BUTTON']);},Window_CombatLogDisplay[_0x18674e(0x2f3)]['setCombatLogIndex']=function(_0x3062cc){const _0x41f53b=_0x18674e;if(this['_combatLogIndex']===_0x3062cc)return;this[_0x41f53b(0x337)]=_0x3062cc,this['refresh'](),this[_0x41f53b(0x2a4)](0x0,0x0);},Window_CombatLogDisplay[_0x18674e(0x2f3)][_0x18674e(0x32e)]=function(){const _0x3eaa67=_0x18674e;if(this['_combatLogIndex']===undefined)return;const _0x1a9371=$gameSystem[_0x3eaa67(0x333)](this['_combatLogIndex']);for(const _0xf757a9 of _0x1a9371){if(!_0xf757a9)continue;this[_0x3eaa67(0x3a4)](_0xf757a9,_0x3eaa67(0x248));}const _0x38b1f3=this[_0x3eaa67(0x2d8)][this[_0x3eaa67(0x2d8)][_0x3eaa67(0x2ae)]-0x1];_0x38b1f3&&_0x38b1f3[_0x3eaa67(0x3b6)]!==_0x3eaa67(0x2ea)&&('xuTtE'!==_0x3eaa67(0x2e9)?this[_0x3eaa67(0x3a4)](_0x3eaa67(0x2ea),'combatLog'):_0x375cc5=_0x3eaa67(0x2e1)[_0x3eaa67(0x256)](_0x4dab1e,_0x1e3cb1));},Window_CombatLogDisplay[_0x18674e(0x2f3)][_0x18674e(0x392)]=function(_0x597548){const _0x150ab9=_0x18674e;if(Window_CombatLogDisplay[_0x150ab9(0x35e)]){const _0x29598a=this[_0x150ab9(0x28d)](_0x597548);this['drawBackgroundRect'](_0x29598a);}},Window_CombatLogDisplay[_0x18674e(0x2f3)][_0x18674e(0x215)]=function(_0x54b677){const _0x1a56c5=_0x18674e,_0x43d1d4=this[_0x1a56c5(0x2a0)](_0x54b677),_0x126f39=this[_0x1a56c5(0x323)](_0x54b677);_0x126f39===_0x1a56c5(0x2ea)?this[_0x1a56c5(0x38f)](_0x43d1d4):this[_0x1a56c5(0x3ce)](_0x126f39,_0x43d1d4['x'],_0x43d1d4['y'],_0x43d1d4['width']);},Window_CombatLogDisplay[_0x18674e(0x2f3)][_0x18674e(0x38f)]=function(_0x1d9ec9){const _0x9b35d7=_0x18674e;this['resetFontSettings']();const _0x3a18c7=Window_CombatLogDisplay[_0x9b35d7(0x31d)],_0xe2901e=_0x1d9ec9['y']+(_0x1d9ec9[_0x9b35d7(0x20f)]-_0x3a18c7)/0x2;this['drawRect'](_0x1d9ec9['x'],_0xe2901e,_0x1d9ec9['width'],_0x3a18c7);},Window_CombatLogDisplay[_0x18674e(0x2f3)][_0x18674e(0x372)]=function(){const _0x282ad8=_0x18674e;this[_0x282ad8(0x1d2)]=!![];},Window_CombatLogDisplay[_0x18674e(0x2f3)][_0x18674e(0x1f6)]=function(){const _0x5ee2af=_0x18674e;if(this[_0x5ee2af(0x1d2)]){if(_0x5ee2af(0x1c3)!==_0x5ee2af(0x1c3)){let _0x30bb4b=_0x5c683e[_0x5ee2af(0x299)][_0x5ee2af(0x256)](_0x2b84ab[_0x5ee2af(0x27e)]()),_0x30d956=_0xe4b802[_0x5ee2af(0x2c6)];_0x4b151c[_0x5ee2af(0x37b)](_0x30bb4b,_0x30d956);}else this[_0x5ee2af(0x34e)]();}},Window_CombatLogDisplay[_0x18674e(0x2f3)][_0x18674e(0x34e)]=function(){const _0x4259e7=_0x18674e;this[_0x4259e7(0x1d2)]=![],this[_0x4259e7(0x337)]=0x0,this[_0x4259e7(0x2c8)](),this[_0x4259e7(0x2a4)](0x0,this[_0x4259e7(0x2b2)]());},Window_CombatLogDisplay['prototype'][_0x18674e(0x31e)]=function(_0x3e2c09){const _0x3417ca=_0x18674e;this[_0x3417ca(0x30b)]=_0x3e2c09;},Window_CombatLogDisplay[_0x18674e(0x2f3)]['getLastWindow']=function(){const _0x179a20=_0x18674e;return this[_0x179a20(0x30b)];},Window_CombatLogDisplay[_0x18674e(0x2f3)][_0x18674e(0x2cf)]=function(){const _0x30a162=_0x18674e;this[_0x30a162(0x269)]=new Sprite(),this[_0x30a162(0x269)]['bitmap']=new Bitmap(0x0,0x0),this[_0x30a162(0x269)]['x']=-0x4,this[_0x30a162(0x318)](this[_0x30a162(0x269)]);},Window_CombatLogDisplay[_0x18674e(0x2f3)]['refreshDimmerBitmap']=function(){const _0x42897d=_0x18674e;if(this[_0x42897d(0x269)]){const _0x3b50d0=this[_0x42897d(0x269)][_0x42897d(0x3b2)],_0x3a8f4d=this[_0x42897d(0x376)]>0x0?this[_0x42897d(0x376)]+0x8:0x0,_0x617eaa=this[_0x42897d(0x20f)],_0x1f331c=this['padding'],_0x14ea3f=ColorManager[_0x42897d(0x351)](),_0x33f5c0=ColorManager[_0x42897d(0x2c2)]();_0x3b50d0['resize'](_0x3a8f4d,_0x617eaa),_0x3b50d0[_0x42897d(0x3d8)](0x0,0x0,_0x3a8f4d,_0x1f331c,_0x33f5c0,_0x14ea3f,!![]),_0x3b50d0['fillRect'](0x0,_0x1f331c,_0x3a8f4d,_0x617eaa-_0x1f331c*0x2,_0x14ea3f),_0x3b50d0[_0x42897d(0x3d8)](0x0,_0x617eaa-_0x1f331c,_0x3a8f4d,_0x1f331c,_0x14ea3f,_0x33f5c0,!![]),this[_0x42897d(0x269)][_0x42897d(0x1cc)](0x0,0x0,_0x3a8f4d,_0x617eaa);if($gameParty[_0x42897d(0x2e2)]()){if(_0x42897d(0x30f)===_0x42897d(0x30f))this['_dimmerSprite'][_0x42897d(0x341)]['x']=0x64,this['_dimmerSprite'][_0x42897d(0x1c5)]['x']=0.5;else return _0x889ecc[_0x42897d(0x388)]['Scene_Battle_isTimeActive'][_0x42897d(0x26e)](this);}}},VisuMZ[_0x18674e(0x388)][_0x18674e(0x3ab)]=Game_Battler['prototype']['onAtbInterrupt'],Game_Battler['prototype'][_0x18674e(0x1ef)]=function(){const _0x28d24d=_0x18674e;VisuMZ[_0x28d24d(0x388)][_0x28d24d(0x3ab)][_0x28d24d(0x26e)](this);if(!SceneManager['isSceneBattle']())return;const _0x39547a=VisuMZ[_0x28d24d(0x388)]['Settings']['Compatibility'];if(!_0x39547a)return;if(!_0x39547a[_0x28d24d(0x238)])return;const _0x3c676e=_0x39547a[_0x28d24d(0x257)];if(_0x3c676e){if(_0x28d24d(0x1d0)!==_0x28d24d(0x1d0)){let _0x1a054a=_0x181bd4[_0x28d24d(0x1cf)];_0x3b800b['addTextToCombatLog'](_0x18dbf2,_0x1a054a);}else{let _0x1274de=_0x3c676e[_0x28d24d(0x256)](this[_0x28d24d(0x27e)]()),_0x401c14=_0x39547a[_0x28d24d(0x294)];$gameSystem[_0x28d24d(0x37b)](_0x1274de,_0x401c14);}}},VisuMZ[_0x18674e(0x388)][_0x18674e(0x304)]=Game_Battler[_0x18674e(0x2f3)][_0x18674e(0x3d5)],Game_Battler['prototype'][_0x18674e(0x3d5)]=function(_0x59f499){const _0x35b664=_0x18674e;VisuMZ[_0x35b664(0x388)]['Game_Battler_onCtbOrderChange'][_0x35b664(0x26e)](this,_0x59f499);if(_0x59f499===0x0)return;if(!SceneManager['isSceneBattle']())return;const _0x44b36d=VisuMZ[_0x35b664(0x388)][_0x35b664(0x350)][_0x35b664(0x362)];if(!_0x44b36d)return;if(!_0x44b36d[_0x35b664(0x24a)])return;const _0x347b0a=_0x44b36d[_0x35b664(0x345)];if(_0x347b0a){let _0x289ed9=_0x347b0a['format'](this[_0x35b664(0x27e)]()),_0xa643f7=_0x44b36d[_0x35b664(0x283)];$gameSystem['addTextToCombatLog'](_0x289ed9,_0xa643f7);}},VisuMZ[_0x18674e(0x388)][_0x18674e(0x3c8)]=Game_Battler[_0x18674e(0x2f3)][_0x18674e(0x3d6)],Game_Battler['prototype'][_0x18674e(0x3d6)]=function(_0xc8bd4d){const _0x17e493=_0x18674e;VisuMZ[_0x17e493(0x388)][_0x17e493(0x3c8)][_0x17e493(0x26e)](this,_0xc8bd4d);if(_0xc8bd4d===0x0)return;if(!SceneManager['isSceneBattle']())return;const _0x1352ed=VisuMZ[_0x17e493(0x388)][_0x17e493(0x350)][_0x17e493(0x362)];if(!_0x1352ed)return;if(!_0x1352ed[_0x17e493(0x31f)])return;const _0x629c36=_0x1352ed[_0x17e493(0x2a1)];if(_0x629c36){let _0x16c5b2=_0x629c36[_0x17e493(0x256)](this['combatLogName']()),_0x2b2e23=_0x1352ed[_0x17e493(0x214)];$gameSystem[_0x17e493(0x37b)](_0x16c5b2,_0x2b2e23);}},VisuMZ['CombatLog']['Game_Battler_onAntiDamageNullificationBarrier']=Game_Battler['prototype'][_0x18674e(0x221)],Game_Battler[_0x18674e(0x2f3)][_0x18674e(0x221)]=function(_0x5e25fd){const _0x5a057a=_0x18674e,_0x4e3855=VisuMZ['CombatLog'][_0x5a057a(0x350)]['Compatibility'];if(_0x4e3855&&_0x4e3855[_0x5a057a(0x2fa)]&&SceneManager[_0x5a057a(0x216)]()){let _0x225662=_0x4e3855[_0x5a057a(0x28b)];if(_0x225662){if(_0x5a057a(0x1e5)===_0x5a057a(0x315)){const _0x2dd472=this[_0x5a057a(0x3e9)]();this[_0x5a057a(0x21e)]=new _0x3d6e3d(_0x2dd472),this[_0x5a057a(0x21e)][_0x5a057a(0x3b8)](0x0),this[_0x5a057a(0x234)](this[_0x5a057a(0x21e)]),this[_0x5a057a(0x21e)]['x']=this[_0x5a057a(0x2b7)]['x'],this[_0x5a057a(0x21e)]['y']=this['_windowLayer']['y'],this[_0x5a057a(0x21e)]['setBackgroundType'](_0x39c9d3[_0x5a057a(0x388)][_0x5a057a(0x350)][_0x5a057a(0x219)][_0x5a057a(0x3da)]),this[_0x5a057a(0x21e)][_0x5a057a(0x2b1)]('combatLog',this['closeCombatLog'][_0x5a057a(0x2a5)](this)),this[_0x5a057a(0x21e)][_0x5a057a(0x2b1)](_0x5a057a(0x1e2),this[_0x5a057a(0x2ac)][_0x5a057a(0x2a5)](this)),this[_0x5a057a(0x377)][_0x5a057a(0x2b1)](_0x5a057a(0x248),this['openCombatLog'][_0x5a057a(0x2a5)](this,this[_0x5a057a(0x377)])),this['_actorCommandWindow'][_0x5a057a(0x2b1)](_0x5a057a(0x248),this[_0x5a057a(0x291)][_0x5a057a(0x2a5)](this,this[_0x5a057a(0x37c)]));}else{let _0x5852e4=_0x225662['format'](this[_0x5a057a(0x27e)](),_0x5e25fd[_0x5a057a(0x3b6)]),_0x12a000=_0x5e25fd[_0x5a057a(0x210)];$gameSystem['addTextToCombatLog'](_0x5852e4,_0x12a000);}}}VisuMZ[_0x5a057a(0x388)][_0x5a057a(0x309)][_0x5a057a(0x26e)](this,_0x5e25fd);},VisuMZ[_0x18674e(0x388)][_0x18674e(0x349)]=Game_Battler[_0x18674e(0x2f3)]['onAntiDamageCancelBarrier'],Game_Battler['prototype'][_0x18674e(0x359)]=function(_0x339f3d){const _0x2c24be=_0x18674e,_0x2bff2a=VisuMZ[_0x2c24be(0x388)][_0x2c24be(0x350)][_0x2c24be(0x362)];if(_0x2bff2a&&_0x2bff2a[_0x2c24be(0x213)]&&SceneManager[_0x2c24be(0x216)]()){if(_0x2c24be(0x202)===_0x2c24be(0x202)){let _0x2bfd77=_0x2bff2a[_0x2c24be(0x3a0)];if(_0x2bfd77){if('jHlmW'!==_0x2c24be(0x2db)){if(this[_0x2c24be(0x321)]===_0x511d08)this[_0x2c24be(0x32d)]();this[_0x2c24be(0x321)][_0x2c24be(0x30a)]=_0x556f54;}else{let _0x4dd0d2=_0x2bfd77[_0x2c24be(0x256)](this[_0x2c24be(0x27e)](),_0x339f3d['name']),_0x2d5920=_0x339f3d[_0x2c24be(0x210)];$gameSystem[_0x2c24be(0x37b)](_0x4dd0d2,_0x2d5920);}}}else{let _0x27f94b=_0x5405f2[_0x2c24be(0x256)](this['combatLogName']()),_0x4d66e8=_0x39a90e['IconBattleSysStbInstant'];_0x40fd9[_0x2c24be(0x37b)](_0x27f94b,_0x4d66e8);}}VisuMZ[_0x2c24be(0x388)][_0x2c24be(0x349)][_0x2c24be(0x26e)](this,_0x339f3d);},VisuMZ['CombatLog']['Game_BattlerBase_getAntiDamageBarrierReduction']=Game_BattlerBase[_0x18674e(0x2f3)][_0x18674e(0x1dc)],Game_BattlerBase[_0x18674e(0x2f3)]['getAntiDamageBarrierReduction']=function(_0x32f8c2){const _0x59ecbe=_0x18674e,_0x10562a=VisuMZ['CombatLog'][_0x59ecbe(0x350)][_0x59ecbe(0x362)];if(_0x10562a&&_0x10562a[_0x59ecbe(0x35b)]&&SceneManager[_0x59ecbe(0x216)]()){if('CrZWE'===_0x59ecbe(0x205)){let _0x49b3ae=_0x10562a[_0x59ecbe(0x1f8)];if(_0x49b3ae){let _0x33c465=_0x49b3ae[_0x59ecbe(0x256)](this[_0x59ecbe(0x27e)](),$dataStates[_0x32f8c2]['name']),_0x401b8e=$dataStates[_0x32f8c2]['iconIndex'];$gameSystem[_0x59ecbe(0x37b)](_0x33c465,_0x401b8e);}}else{_0x9c4d35[_0x59ecbe(0x388)]['Game_BattlerBase_increaseBuff'][_0x59ecbe(0x26e)](this,_0x41506f);if(!_0x467791[_0x59ecbe(0x388)][_0x59ecbe(0x350)]['CombatLog'][_0x59ecbe(0x324)])return;this[_0x59ecbe(0x1fa)](_0x33d1ad,0x1,_0x239e62[_0x59ecbe(0x2cd)]);}}return VisuMZ['CombatLog'][_0x59ecbe(0x3df)][_0x59ecbe(0x26e)](this,_0x32f8c2);},VisuMZ['CombatLog']['Game_Battler_displayAbsorptionBarrierPopup']=Game_Battler[_0x18674e(0x2f3)][_0x18674e(0x39f)],Game_Battler[_0x18674e(0x2f3)][_0x18674e(0x39f)]=function(_0x3f6670,_0x156c68){const _0x247c27=_0x18674e;VisuMZ[_0x247c27(0x388)]['Game_Battler_displayAbsorptionBarrierPopup'][_0x247c27(0x26e)](this,_0x3f6670,_0x156c68);if(_0x3f6670===0x0)return;const _0x466322=VisuMZ[_0x247c27(0x388)][_0x247c27(0x350)][_0x247c27(0x362)];if(_0x466322&&_0x466322[_0x247c27(0x3c7)]&&SceneManager[_0x247c27(0x216)]()){let _0x40943e=_0x466322['Text_AntiDmgBarrier_Absorb'];if(_0x40943e){let _0x5a1bdb=_0x40943e[_0x247c27(0x256)](this[_0x247c27(0x27e)](),_0x156c68[_0x247c27(0x3b6)],_0x3f6670),_0xbd9eec=_0x156c68[_0x247c27(0x210)];$gameSystem[_0x247c27(0x37b)](_0x5a1bdb,_0xbd9eec);}}},VisuMZ[_0x18674e(0x388)][_0x18674e(0x2be)]=Game_Battler[_0x18674e(0x2f3)][_0x18674e(0x3d9)],Game_Battler[_0x18674e(0x2f3)][_0x18674e(0x3d9)]=function(_0xd47f2e){const _0x3ca57c=_0x18674e,_0x54d961=VisuMZ[_0x3ca57c(0x388)]['Settings'][_0x3ca57c(0x362)];if(_0x54d961&&_0x54d961[_0x3ca57c(0x3e8)]&&SceneManager[_0x3ca57c(0x216)]()){let _0x2aedc3=_0x54d961[_0x3ca57c(0x33c)];if(_0x2aedc3){let _0x39c74b=_0x2aedc3[_0x3ca57c(0x256)](this['combatLogName'](),_0xd47f2e[_0x3ca57c(0x3b6)],TextManager['mp']),_0x6f9e10=_0xd47f2e[_0x3ca57c(0x210)];$gameSystem[_0x3ca57c(0x37b)](_0x39c74b,_0x6f9e10);}}VisuMZ[_0x3ca57c(0x388)][_0x3ca57c(0x2be)][_0x3ca57c(0x26e)](this,_0xd47f2e);},VisuMZ[_0x18674e(0x388)]['Game_Battler_onAntiDamageTpBarrier']=Game_Battler['prototype']['onAntiDamageTpBarrier'],Game_Battler[_0x18674e(0x2f3)][_0x18674e(0x3c3)]=function(_0x3908cc){const _0x2a8348=_0x18674e,_0x2d947a=VisuMZ[_0x2a8348(0x388)][_0x2a8348(0x350)][_0x2a8348(0x362)];if(_0x2d947a&&_0x2d947a[_0x2a8348(0x2bf)]&&SceneManager[_0x2a8348(0x216)]()){if(_0x2a8348(0x1ff)===_0x2a8348(0x32a))_0x33fb93[_0x2a8348(0x388)][_0x2a8348(0x1f1)][_0x2a8348(0x26e)](this),this['addCombatLogCommand']();else{let _0x6ae48c=_0x2d947a[_0x2a8348(0x28f)];if(_0x6ae48c){if('VxQdR'==='TvNKG'){if(_0x55896b[_0x2a8348(0x23f)]()>0x0&&_0x142edd[_0x2a8348(0x388)]['Settings'][_0x2a8348(0x388)][_0x2a8348(0x312)]){_0x2e148c[_0x2a8348(0x1c8)]();let _0x59f70a=_0x5c8234[_0x2a8348(0x250)][_0x2a8348(0x256)](_0x554728[_0x2a8348(0x23f)]()),_0x26425b=_0x11a866[_0x2a8348(0x227)];_0x4646d5[_0x2a8348(0x37b)](_0x59f70a,_0x26425b),_0x4ca0cd[_0x2a8348(0x1c8)]();}_0x6bb462[_0x2a8348(0x388)]['BattleManager_endTurn']['call'](this);}else{let _0x4f5694=_0x6ae48c[_0x2a8348(0x256)](this[_0x2a8348(0x27e)](),_0x3908cc[_0x2a8348(0x3b6)],TextManager['tp']),_0x36f0da=_0x3908cc[_0x2a8348(0x210)];$gameSystem[_0x2a8348(0x37b)](_0x4f5694,_0x36f0da);}}}}VisuMZ[_0x2a8348(0x388)][_0x2a8348(0x361)][_0x2a8348(0x26e)](this,_0x3908cc);},VisuMZ['CombatLog'][_0x18674e(0x355)]=Game_Battler['prototype']['onLifeStateEffect'],Game_Battler[_0x18674e(0x2f3)][_0x18674e(0x2ec)]=function(_0x3726b6){const _0x2068b6=_0x18674e;VisuMZ[_0x2068b6(0x388)]['Game_Battler_onLifeStateEffect'][_0x2068b6(0x26e)](this,_0x3726b6);if(!SceneManager[_0x2068b6(0x216)]())return;if(!_0x3726b6)return;const _0x5573f1=VisuMZ[_0x2068b6(0x388)][_0x2068b6(0x350)][_0x2068b6(0x362)];if(!_0x5573f1)return;if(!_0x5573f1[_0x2068b6(0x2b6)[_0x2068b6(0x256)](_0x3726b6)])return;let _0x24f100=_0x5573f1[_0x2068b6(0x251)['format'](_0x3726b6)];if(_0x24f100){let _0xeaeba5=_0x24f100[_0x2068b6(0x256)](this[_0x2068b6(0x27e)]()),_0x6f22e9=_0x5573f1['Icon_LifeStateEffects_%1'[_0x2068b6(0x256)](_0x3726b6)];$gameSystem[_0x2068b6(0x37b)](_0xeaeba5,_0x6f22e9);}},VisuMZ[_0x18674e(0x388)][_0x18674e(0x36d)]=Window_BattleLog[_0x18674e(0x2f3)]['addStealText'],Window_BattleLog[_0x18674e(0x2f3)][_0x18674e(0x34d)]=function(_0x428e99){const _0x339812=_0x18674e;VisuMZ[_0x339812(0x388)][_0x339812(0x36d)]['call'](this,_0x428e99);if(_0x428e99==='')return;const _0x565421=VisuMZ[_0x339812(0x388)][_0x339812(0x350)][_0x339812(0x362)];if(_0x565421&&_0x565421['Show_StealItems_Steal']&&SceneManager[_0x339812(0x216)]()){let _0x13848d=_0x565421[_0x339812(0x1cf)];$gameSystem[_0x339812(0x37b)](_0x428e99,_0x13848d);}};