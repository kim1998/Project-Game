//=============================================================================
// VisuStella MZ - Party System
// VisuMZ_2_PartySystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_PartySystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.PartySystem = VisuMZ.PartySystem || {};
VisuMZ.PartySystem.version = 1.32;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.32] [PartySystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Party_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * RPG Maker MZ only gives game projects the ability to switch party members
 * within the main menu and nothing more. There's no inherent functionality to
 * lock party members, make party members required, and/or give players the
 * ability to switch party members mid-battle.
 *
 * This plugin will add in all of those functions as well as a dedicated scene
 * for switching party members. Party switching will allow party members to be
 * removed, swapped, and sorted. Through the usage of Plugin Commands, party
 * members can also be locked and/or required for party presence.
 *
 * Those using the VisuStella MZ Battle Core will also have access to features
 * in this plugin that aren't available otherwise. These features give players
 * the functionality to switch out the whole party lineup mid-battle and/or
 * individual party member switching.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Custom scene dedicated to party management.
 * * Change the maximum number of party members that can participate in battle.
 * * Plugin Commands to lock party members.
 * * Plugin Commands to make certain party members required.
 * * Added functionality with Battle Core to switch party members mid-battle.
 * * This comes in the form of changing either the whole party at once.
 * * Or switching individual members out one at a time.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
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
 * Main Menu Formation Command
 *
 * - This command is now changed to send the player to Scene_Party for the
 * player to have a dedicated scene for changing the party.
 *
 * ---
 *
 * Battle Members Array
 *
 * - Previously, the battle members are decided by which actors are lined up
 * first in the party roster. This has been changed to give players the freedom
 * to have a party size less than the maximum. This change is made by changing
 * the way the battle members are determined by using a new array. However, any
 * and all functions utilize the $gameParty.battleMembers() function will still
 * behave as normal.
 *
 * ---
 *
 * Formation Change OK Function
 *
 * - RPG Maker MZ did not do anything with the Game_Actor.isFormationChangeOk
 * function so this plugin overwrote it completely to allow for the new
 * lock and require features to work.
 *
 * ---
 * 
 * Temporary Parties
 * 
 * Temporary parties are very specific parties that will overwrite whatever the
 * player has set as a party. These can include current party members or even
 * actors that haven't joined. The temporary party cannot be changed nor can
 * the positions of said party members can be changed.
 * 
 * When a temporary party is present, menu and battle commands involving
 * changing party members will be disabled.
 * 
 * Once the temporary party is disbanded, the player's selected party will be
 * available once again as well as all of the functions to change party members
 * and their positions.
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
 * VisuMZ_1_BattleCore
 *
 * - If the VisuStella MZ Battle Core plugin is present, players are able to 
 * access party switching functionality mid-battle at will. This can be in the
 * form of switching out the entire active party roster at once or individually
 * for each actor.
 *
 * - Switching Entire Rosters: This can be done by going into this plugin's
 * Plugin Parameters => General => Party Command Window => Add Party Command.
 * If the Party Command Window is accessible, the player will be able to see
 * the option between 'Auto Battle' and 'Options'.
 *
 * - Individual Member Switching: This requires going to VisuMZ_1_BattleCore's
 * Plugin Parameters => Actor Command Window => Battle Commands => Command List
 * and add in the "party" option. The "party" option can also be added to the
 * <Battle Commands> notetag.
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
 * VisuMZ_2_BattleSystemOTB
 * 
 * With Battle System - OTB, the player cannot change entire parties at once
 * from the Party Command Window. The feature will be unaccessible while
 * Order Turn Battle is in play. However, the player can still change party
 * members through the Actor Command Window by having actors replace other
 * actors. Party changing is also available through battle events, Common
 * Events, and script calls.
 * 
 * ---
 * 
 * VisuMZ_2_BattleSystemSTB
 * 
 * With Battle System - STB, the player cannot change entire parties at once
 * from the Party Command Window. The feature will be unaccessible while
 * Standard Turn Battle is in play. However, the player can still change party
 * members through the Actor Command Window by having actors replace other
 * actors. Party changing is also available through battle events, Common
 * Events, and script calls.
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
 * === Party Plugin Commands ===
 * 
 * ---
 *
 * Party: Call Party Scene
 * - Calls the party changing scene.
 *
 * ---
 *
 * Party: Change Max Battle Members
 * - Changes the number of max battle members possible.
 * - Cannot be use mid-battle.
 *
 *   Max Members:
 *   - Changes the number of max battle members possible.
 *   - Use 0 for the game's default number.
 *
 * ---
 *
 * Party: Lock/Unlock Member(s)
 * - Allows you to lock/unlock a party member.
 * - Locked actors cannot change their party position.
 *
 *   Actor ID(s):
 *   - Select which actor(s) to lock/unlock.
 *   - Locked actors cannot change their party position.
 *
 *   Lock?:
 *   - Lock the selected actor(s)?
 *
 * ---
 * 
 * Party: Move Actor(s) to Active
 * - Map Only.
 * - Moves an actor to the active party if there is room.
 * - The actor needs to have joined the party.
 * 
 *   Actor ID(s):
 *   - Select which actor(s) to move to the active party if there is room.
 * 
 * ---
 * 
 * Party: Move Actor(s) to Reserve
 * - Map Only.
 * - Moves an actor to the reserve party.
 * - Must be 1 actor left.
 * - The actor needs to have joined the party.
 * 
 *   Actor ID(s):
 *   - Select which actor(s) to move to the reserve party.
 * 
 * ---
 * 
 * Party: Move Party Index to Reserve
 * - Map only.
 * - Moves an actor in a specific party index to reserve.
 * - Must be 1 actor left.
 * 
 *   Index:
 *   - Type in which index to move.
 *   - Index values start at 0.
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * Party: Move Random Reserve to Active
 * - Map only.
 * - Moves a random actor from the reserve party to active.
 * - Must be enough space in active party.
 * 
 * ---
 *
 * Party: Require Member(s)
 * - Allows you to require/free a party member.
 * - Required actors must be in the party to exit the scene.
 *
 *   Actor ID(s):
 *   - Select which actor(s) to require/free.
 *   - Required actors must be in the party to exit the scene.
 *
 *   Require?:
 *   - Make the selected actor(s) required?
 *
 * ---
 * 
 * === Temporary Parties Plugin Commands ===
 * 
 * Temporary parties are very specific parties that will overwrite whatever the
 * player has set as a party. These can include current party members or even
 * actors that haven't joined. The temporary party cannot be changed nor can
 * the positions of said party members can be changed.
 * 
 * When a temporary party is present, menu and battle commands involving
 * changing party members will be disabled.
 * 
 * Once the temporary party is disbanded, the player's selected party will be
 * available once again as well as all of the functions to change party members
 * and their positions.
 * 
 * ---
 * 
 * Temp: Create Temporary Party (Normal)
 * - Creates a temporary party with specific actors.
 * - Can't be used in battle.
 * 
 *   Actor ID(s):
 *   - Select which actor(s) to be added to the temporary party until the
 *     temporary party is disbanded.
 * 
 * ---
 * 
 * Temp: Create Temporary Party (JS)
 * - Creates a temporary party selected with JavaScript.
 * - Can't be used in battle.
 * 
 *   JS: Actor ID(s):
 *   - Use JavaScript to determine which actor(s) are added to the temporary
 *     party until disbanded.
 * 
 * ---
 * 
 * Temp: Disband Temporary Party
 * - Clears temporary party.
 * - Can't be used in battle.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These Plugin Parameters control the overall behaviors pertaining to the
 * Party System added with this plugin. These behaviors range from the maximum
 * number of members that can participate in battle to the availability of the
 * party switching mechanics.
 *
 * ---
 *
 * General
 * 
 *   Max Battle Members:
 *   - Maximum number of battle members.
 *
 * ---
 *
 * Party Scene
 * 
 *   Add Remove Command:
 *   - Add the 'Remove' command to the party scene?
 * 
 *   Locked Member Icon:
 *   - Icon used for a locked party member.
 * 
 *   Required Member Icon:
 *   - Icon used for a required party member.
 *
 * ---
 *
 * Party Command Window
 * - These require VisuMZ_1_BattleCore!
 * 
 *   Add Party Command:
 *   - Add the 'Party' command to the Party Command Window?
 * 
 *   Command Cooldown:
 *   - Cooldown (in turns) for this command to be available again.
 *
 * ---
 *
 * Actor Command Window
 * - These require VisuMZ_1_BattleCore!
 * 
 *   Add Switch Command:
 *   - Add the 'Switch' command to the Actor Command Window?
 * 
 *   Command Cooldown:
 *   - Cooldown (in turns) for this command to be available again.
 * 
 *   Switch Out Animation?:
 *   - Show the sprites switching out when using individual party
 *     member switching?
 * 
 *   TPB: Immediate Action:
 *   - Allow actors to immediate act upon switching in for TPB battle systems?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Vocabulary Settings
 * ============================================================================
 *
 * These Plugin Parameters control the text that you see in-game related to the
 * Party System plugin.
 *
 * ---
 *
 * General
 * 
 *   Active Party:
 *   - Vocabulary used to represent the Active Party.
 * 
 *   Reserve Party:
 *   - Vocabulary used to represent the Reserve Party.
 * 
 *   Status:
 *   - Vocabulary used to represent the Status Window.
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
 * Party Scene > Windows
 * 
 *   Empty:
 *   - For the party and status windows when no actor is selected.
 * 
 *   Remove:
 *   - For the remove option.
 *
 * ---
 *
 * Party Scene > Button Assist
 * 
 *   Swap Positions:
 *   - Button assist text for the page up/down commands.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Remove:
 *   - Button assist text for the removal command.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Sort:
 *   - Button assist text for the sort command.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Swap In:
 *   - Button assist text for swapping in actors.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Swap Out:
 *   - Button assist text for swapping out actors.
 *   - Requires VisuMZ_0_CoreEngine!
 *
 * ---
 *
 * Battle Scene
 * 
 *   Party Command:
 *   - Command text for entering Party Scene.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Help: Formation:
 *   - Help text for Formation command.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Queue Message:
 *   - Message to say the Party Scene is queued.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Switch Command:
 *   - Command text for switching out members.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Help: Switch:
 *   - Help text for Switch command.
 *   - Requires VisuMZ_1_BattleCore!
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_Party.
 *
 * ---
 *
 * Background Settings
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
 * If you don't like the locations of the windows in Scene_Party, change them
 * up with these Plugin Parameters, provided that you have an understanding of
 * JavaScript code.
 *
 * ---
 *
 * Active Party Label
 * Active Party Window
 * Reserve Party Label
 * Reserve Party Window
 * Status Label
 * Status Window
 * Battle Switch Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Columns:
 *   - Available only for the Reserve Party Window.
 *   - How many columns do you want there to be for the window?
 * 
 *   Actor Graphic:
 *   - Available only for Active Party Window and Reserve Party Window.
 *   - Choose how the actor graphics appear in the specific windows.
 *     - Face
 *     - Map Sprite
 *     - Sideview Battler (Requires VisuMZ_1_MainMenuCore)
 * 
 *     Map Sprite:
 *     Sideview Battler:
 * 
 *       Offset X:
 *       Offset Y:
 *       - If showing map sprites, offset the x or y coordinates.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
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
 * Version 1.32: December 19, 2024
 * * Bug Fixes!
 * ** Fixed a bug that would cause a crash upon adding new members if the
 *    VisuStella Core Engine wasn't installed. Fix made by Arisu.
 * 
 * Version 1.31: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** New section added to "Major Changes":
 * *** Temporary Parties
 * **** Temporary parties are very specific parties that will overwrite
 *      whatever the player has set as a party. These can include current party
 *      members or even actors that haven't joined. The temporary party cannot
 *      be changed nor can the positions of said party members can be changed.
 * **** When a temporary party is present, menu and battle commands involving
 *      changing party members will be disabled.
 * **** Once the temporary party is disbanded, the player's selected party will
 *      be available once again as well as all of the functions to change party
 *      members and their positions.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Temp: Create Temporary Party (Normal)
 * **** Creates a temporary party with specific actors.
 * *** Temp: Create Temporary Party (JS)
 * **** Creates a temporary party selected with JavaScript.
 * *** Temp: Disband Temporary Party
 * **** Clears temporary party.
 * 
 * Version 1.30: April 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where party changes with FTB, ETB, and PTB did not replace
 *    the newely added party member on the turn order timeline. Fix by Olivia.
 * 
 * Version 1.29: March 14, 2024
 * * Bug Fixes!
 * ** Fixed a bug where party changes with PTB did not register correctly.
 *    Fix made by Olivia.
 * 
 * Version 1.28: November 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.27: February 16, 2023
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * * Feature Update!
 * ** When holding the "up" keyboard button with the reserve window active, the
 *    return to the active party window will no longer happen unless the "up"
 *    key is released and then pressed again. Update made by Olivia.
 * 
 * Version 1.26: January 20, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.25: July 28, 2022
 * * Bug Fixes!
 * ** Changing party members via actor command with a less than max battle size
 *    after removing a middle member midway through battle will no longer cause
 *    weird results when switching. Fix made by Arisu.
 * ** Party members that were switched out during battle animations with active
 *    TPB/ATB will no longer cause damage popup crashes when switched back in a
 *    follow up battle. Fix made by Arisu.
 * 
 * Version 1.24: March 24, 2022
 * * Compatibility Update!
 * ** Compatibility update with Skills & States Core Passive Conditions
 *    involving the party leader. Update made by Arisu.
 * 
 * Version 1.23: January 13, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: July 16, 2021
 * * Feature Update!
 * ** Added a fail safe that prevents on-battle start events from triggering
 *    when adding party members outside of battle under evented circumstances
 *    that function as a bridge between event and battle. Fix by Irina.
 * 
 * Version 1.21: July 9, 2021
 * * Bug Fixes!
 * ** When using TPB-based battle systems, adding actors to the main party
 *    would not enable them to move. This should be fixed. Fix made by Irina.
 * 
 * Version 1.20: July 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.19: June 18, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.18: April 16, 2021
 * * Documentation Update!
 * ** Fixed typo. Fix made by Arisu.
 * 
 * Version 1.17: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_2_BattleSystemOTB plugin.
 * 
 * Version 1.16: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.15: March 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Gneral > Battle Scene > Battle Party Icon
 * **** For some reason, we never had a setting that lets you change the party
 *      icon. Well, now there is!
 * 
 * Version 1.14: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Party: Move Party Index to Reserve
 * **** Moves an actor in a specific party index to reserve.
 *      Map only. Must be 1 actor left. You may use code.
 * *** Party: Move Random Reserve to Active
 * **** Moves a random actor from the reserve party to active.
 *      Map only. Must be enough space in active party.
 * 
 * Version 1.13: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Party: Move Actor(s) to Active
 * **** Map only. Moves an actor to the active party if there is room.
 * *** Party: Move Actor(s) to Reserve
 * **** Map only. Moves an actor to the reserve party.
 * 
 * Version 1.12: January 15, 2021
 * * Bug Fixes!
 * ** For battle testing, if the number of battle test members exceeds the
 *    maximum battle member slots, trim them until they match. Fix by Olivia.
 * 
 * Version 1.11: January 1, 2021
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.10: December 25, 2020
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.09: December 18, 2020
 * * Bug Fixes!
 * ** Removing party members in the active party by event command will now be
 *    properly removed from the party. Fix made by Yanfly.
 * 
 * Version 1.08: December 4, 2020
 * * Bug Fixes!
 * ** With TPB battle systems, after switching out party members, the battle
 *    system will no longer carry over any previous active battle members in
 *    the command window. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: November 22, 2020
 * * Bug Fixes!
 * ** With Active TPB, switching out a party member mid-action is no longer
 *    possible to prevent bugs. Intead, there party switching action will be
 *    queued and take effect after the action has been completed. Fix made by
 *    Yanfly.
 * * Compatibility Update!
 * ** Game_Party.swapOrder function now works with this plugin. However, keep
 *    in mind that due to how this party system plugin allows you have empty
 *    slots in the active battle party, this function will fill in the empty
 *    slots upon usage. Update made by Yanfly.
 *
 * Version 1.06: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.05: October 25, 2020
 * * Bug Fixes!
 * ** Plugin Command "Party: Change Max Battle Members" now works again.
 *    Fix made by Arisu.
 *
 * Version 1.04: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.03: October 11, 2020
 * * Bug Fixes!
 * ** Adding party members during battle through the party window command will
 *    no longer cause crashes after they input an action. Fix made by Yanfly.
 * 
 * Version 1.02: October 4, 2020
 * * Bug Fixes!
 * ** Adding party members during test play should now work again.
 *    Fix made by Irina.
 * ** Changing party members mid-battle through the actor command should now
 *    refresh the party followers afterwards. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Arisu!
 * *** General > Party Command Window > TPB: Immediate Action
 * **** Allow actors to immediate act upon switching in for TPB battle systems?
 * 
 * Version 1.01: September 27, 2020
 * * Bug Fixes!
 * ** When switching actors with states, buffs, and/or debuffs already applied,
 *    the state icons found in the status window will now switch over properly,
 *    too. Fix made by Arisu.
 *
 * Version 1.00: September 7, 2020
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
 * @command CallPartyScene
 * @text Party: Call Party Scene
 * @desc Calls the party changing scene.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeMaxBattleMembers
 * @text Party: Change Max Battle Members
 * @desc Changes the number of max battle members possible.
 * Cannot be use mid-battle.
 *
 * @arg Value:eval
 * @text Max Members
 * @desc Changes the number of max battle members possible.
 * Use 0 for the game's default number.
 * @default 4
 *
 * @ --------------------------------------------------------------------------
 *
 * @command LockPartyMembers
 * @text Party: Lock/Unlock Member(s)
 * @desc Allows you to lock/unlock a party member.
 * Locked actors cannot change their party position.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to lock/unlock.
 * Locked actors cannot change their party position.
 * @default ["1"]
 * 
 * @arg Lock:eval
 * @text Lock?
 * @type boolean
 * @on Lock
 * @off Unlock
 * @desc Lock the selected actor(s)?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MoveActorsToActive
 * @text Party: Move Actor(s) to Active
 * @desc Moves an actor to the active party if there is room.
 * Map only. The actor needs to have joined the party.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to move to the active party if there is room.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MoveActorsToReserve
 * @text Party: Move Actor(s) to Reserve
 * @desc Moves an actor to the reserve party. Must be 1 actor left.
 * Map only. The actor needs to have joined the party.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to move to the reserve party.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MovePartyIndexToReserve
 * @text Party: Move Party Index to Reserve
 * @desc Moves an actor in a specific party index to reserve.
 * Map only. Must be 1 actor left.
 *
 * @arg Index:eval
 * @text Party Index
 * @desc Type in which index to move. Index values start at 0.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MoveRandomToActive
 * @text Party: Move Random Reserve to Active
 * @desc Moves a random actor from the reserve party to active.
 * Map only. Must be enough space in active party.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RequirePartyMembers
 * @text Party: Require Member(s)
 * @desc Allows you to require/free a party member.
 * Required actors must be in the party to exit the scene.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to require/free.
 * Required actors must be in the party to exit the scene.
 * @default ["1"]
 * 
 * @arg Require:eval
 * @text Require?
 * @type boolean
 * @on Require
 * @off Don't Require
 * @desc Make the selected actor(s) required?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Temp
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TempCreatePartyNormal
 * @text Temp: Create Temporary Party (Normal)
 * @desc Creates a temporary party with specific actors.
 * Can't be used in battle.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to be added to the temporary party
 * until the temporary party is disbanded.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TempCreatePartyJS
 * @text Temp: Create Temporary Party (JS)
 * @desc Creates a temporary party selected with JavaScript.
 * Can't be used in battle.
 *
 * @arg ActorsJS:func
 * @text JS: Actor ID(s)
 * @type note
 * @desc Use JavaScript to determine which actor(s) are added to
 * the temporary party until disbanded.
 * @default "// Declare Actor ID's\nconst actorIDs = [];\n\n// Add Actor ID's\nactorIDs.push(1);\nactorIDs.push(2);\nactorIDs.push(3);\nactorIDs.push(4);\n\n// Return Actor IDs\nreturn actorIDs;"
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TempDisbandTempParty
 * @text Temp: Disband Temporary Party
 * @desc Clears temporary party.
 * Can't be used in battle.
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
 * @param PartySystem
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
 * @desc General settings pertaining to Party-related mechanics.
 * @default {"General":"","MaxBattleMembers:num":"4","PartyScene":"","AddRemoveCmd:eval":"true","LockIcon:num":"195","RequireIcon:num":"87","DrawBackRect:eval":"true","BackRectColor:str":"19","PartyCmdWin":"","PartyCmdWinAddParty:eval":"false","PartyCmdCooldown:num":"1","tpbImmediateAction:eval":"true","ActorCmdWin":"","ActorCmdWinAddParty:eval":"true","ActorCmdCooldown:num":"1","SwitchOutAnimation:eval":"true"}
 *
 * @param Vocab:struct
 * @text Vocabulary Settings
 * @type struct<Vocab>
 * @desc These settings let you adjust the text displayed for this plugin.
 * @default {"General":"","ActiveParty:str":"Active Party","ReserveParty:str":"Reserve Party","Status:str":"Status","PartyScene":"","Windows":"","Empty:str":"- Empty -","Remove:str":"Remove","ButtonAssist":"","AssistSwapPosition:str":"Quick Swap","AssistRemove:str":"Remove","AssistSort:str":"Sort","AssistSwapIn:str":"Swap In","AssistSwapOut:str":"Swap Out","BattleScene":"","BattlePartyCmd:str":"Party","BattleHelpFormation:json":"\"Change up your party formation.\"","QueuePartyScene:str":"%1 Menu queued after action is complete.","BattleSwitchOut:str":"Switch","BattleHelpSwitch:json":"\"Switch out this party member with another.\""}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_Party.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc These settings let you control how the windows appear in Scene_Party.
 * @default {"ActivePartyLabel":"","ActivePartyLabelBgType:num":"0","ActivePartyLabelRect:func":"\"const wx = 0;\\nconst wy = this.mainAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = Window_Base.prototype.lineHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","ActivePartyWindow":"","ActivePartyWindowBgType:num":"0","ActivePartyGraphic:str":"face","ActivePartyMapSprite":"","ActiveSpriteOffsetX:num":"0","ActiveSpriteOffsetY:num":"4","ActivePartySvBattler":"","ActiveBattlerOffsetX:num":"0","ActiveBattlerOffsetY:num":"4","ActivePartyWindowRect:func":"\"const wx = 0;\\nconst wy = this._activePartyLabel.y + this._activePartyLabel.height;\\nconst ww = Graphics.boxWidth;\\nconst wh = ImageManager.faceHeight + $gameSystem.windowPadding() * 2 + 2;\\nreturn new Rectangle(wx, wy, ww, wh);\"","ReservePartyLabel":"","ReservePartyLabelBgType:num":"0","ReservePartyLabelRect:func":"\"const ww = Math.max(240, Math.min(Graphics.boxWidth - 576, Math.round(Graphics.boxWidth / 2)));\\nconst wx = this.isRightInputMode() ? (Graphics.boxWidth - ww) : 0;\\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\\nconst wh = Window_Base.prototype.lineHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","ReservePartyWindow":"","ReservePartyWindowBgType:num":"0","ReserveItemThickness:num":"2","ReservePartyGraphic:str":"face","ReservePartyMapSprite":"","ReserveSpriteOffsetX:num":"24","ReserveSpriteOffsetY:num":"4","ReservePartySvBattler":"","ReserveBattlerOffsetX:num":"48","ReserveBattlerOffsetY:num":"4","ReservePartyWindowRect:func":"\"const ww = this._reservePartyLabel.width;\\nconst wx = this._reservePartyLabel.x;\\nconst wy = this._reservePartyLabel.y + this._reservePartyLabel.height;\\nconst wh = this.mainAreaHeight() - this._reservePartyLabel.height - this._activePartyWindow.height - this._activePartyLabel.height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","StatusLabel":"","StatusLabelBgType:num":"0","StatusLabelRect:func":"\"const ww = Graphics.boxWidth - this._reservePartyLabel.width;\\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\\nconst wh = Window_Base.prototype.lineHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","StatusWindow":"","StatusWindowBgType:num":"0","StatusWindowDraw:func":"\"// Draw Empty\\nif (!this._actor) {\\n    this.drawItemDarkRect(0, 0, this.innerWidth, this.innerHeight);\\n    const y = Math.round((this.innerHeight - this.lineHeight()) / 2);\\n    this.changeTextColor(ColorManager.systemColor());\\n    this.drawText(TextManager.emptyPartyMember, 0, y, this.innerWidth, 'center');\\n    return;\\n}\\n\\n// Draw Face and Simple Status\\nthis.drawActorFace(this._actor, 1, 0, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorSimpleStatus(this._actor, ImageManager.faceWidth + 36, 0);\\n\\n// Declare Constants\\nconst lineHeight = this.lineHeight();\\nconst params = this.actorParams();\\nconst paramWidth = Math.round(this.innerWidth / 2);\\nconst paramHeight = Math.ceil(params.length / 2) * lineHeight;\\nconst baseX = 0;\\nlet x = 0;\\nlet y = ImageManager.faceHeight + lineHeight / 2;\\n\\n// Draw Parameters\\nfor (const param of params) {\\n    this.drawItemDarkRect(x, y, paramWidth, lineHeight);\\n    this.drawParamName(param, x, y, paramWidth);\\n    this.drawParamValue(param, x, y, paramWidth);\\n\\n    if (x === baseX) {\\n        x += paramWidth;\\n    } else {\\n        x = baseX;\\n        y += lineHeight;\\n    }\\n}\"","StatusWindowRect:func":"\"const ww = this._statusPartyLabel.width;\\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\\nconst wy = this._reservePartyWindow.y;\\nconst wh = this._reservePartyWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","BattleSwitchWindow":"","BattleSwitchWindowBgType:num":"0","BattleSwitchWindowRect:func":"\"const padding = $gameSystem.windowPadding() * 2;\\nlet ww = 516 + padding;\\nlet wh = Window_PartyBattleSwitch.prototype.itemHeight() * 4 + padding;\\nlet wx = Math.round(Graphics.boxWidth - ww) / 2;\\nlet wy = Math.round(Graphics.boxHeight - wh - this._statusWindow.height) / 2;\\nwy = wy.clamp(0, Graphics.boxHeight - wh - this._statusWindow.height);\\nreturn new Rectangle(wx, wy, ww, wh);\""}
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
 * @param MaxBattleMembers:num
 * @text Max Battle Members
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of battle members.
 * @default 4
 *
 * @param BattleScene
 * @text Battle Scene
 *
 * @param BattlePartyIcon:num
 * @text Battle Party Icon
 * @parent BattleScene
 * @desc Icon used for changing party members.
 * @default 75
 *
 * @param PartyScene
 * @text Party Scene
 *
 * @param AddRemoveCmd:eval
 * @text Add Remove Command
 * @parent PartyScene
 * @type boolean
 * @on Add Command
 * @off Don't Add
 * @desc Add the 'Remove' command to the party scene?
 * @default true
 *
 * @param LockIcon:num
 * @text Locked Member Icon
 * @parent PartyScene
 * @desc Icon used for a locked party member.
 * @default 195
 *
 * @param RequireIcon:num
 * @text Required Member Icon
 * @parent PartyScene
 * @desc Icon used for a required party member.
 * @default 87
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent PartyScene
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
 * @param PartyCmdWin
 * @text Party Command Window
 *
 * @param PartyCmdWinAddParty:eval
 * @text Add Party Command
 * @parent PartyCmdWin
 * @type boolean
 * @on Add Command
 * @off Don't Add
 * @desc Add the 'Party' command to the Party Command Window?
 * @default false
 *
 * @param PartyCmdCooldown:num
 * @text Command Cooldown
 * @parent PartyCmdWin
 * @desc Cooldown (in turns) for this command to be available again.
 * @default 1
 *
 * @param ActorCmdWin
 * @text Actor Command Window
 *
 * @param ActorCmdWinAddParty:eval
 * @text Add Switch Command
 * @parent ActorCmdWin
 * @type boolean
 * @on Add Command
 * @off Don't Add
 * @desc Add the 'Switch' command to the Actor Command Window?
 * @default true
 *
 * @param ActorCmdCooldown:num
 * @text Command Cooldown
 * @parent ActorCmdWin
 * @desc Cooldown (in turns) for this command to be available again.
 * @default 1
 *
 * @param SwitchOutAnimation:eval
 * @text Switch Out Animation?
 * @parent ActorCmdWin
 * @type boolean
 * @on Show
 * @off Don't
 * @desc Show the sprites switching out when using individual party member switching?
 * @default true
 *
 * @param tpbImmediateAction:eval
 * @text TPB: Immediate Action
 * @parent ActorCmdWin
 * @type boolean
 * @on Immediate Action
 * @off Empty Gauge
 * @desc Allow actors to immediate act upon switching in for TPB battle systems?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Vocabulary Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Vocab:
 *
 * @param General
 *
 * @param ActiveParty:str
 * @text Active Party
 * @parent General
 * @desc Vocabulary used to represent the Active Party.
 * @default Active Party
 *
 * @param ReserveParty:str
 * @text Reserve Party
 * @parent General
 * @desc Vocabulary used to represent the Reserve Party.
 * @default Reserve Party
 *
 * @param Status:str
 * @text Status
 * @parent General
 * @desc Vocabulary used to represent the Status Window.
 * @default Status
 *
 * @param PartyScene
 * @text Party Scene
 *
 * @param Windows
 * @parent PartyScene
 *
 * @param Empty:str
 * @text Empty
 * @parent Windows
 * @desc For the party and status windows when no actor is selected.
 * @default - Empty -
 *
 * @param Remove:str
 * @text Remove
 * @parent Windows
 * @desc For the remove option.
 * @default Remove
 *
 * @param ButtonAssist
 * @text Button Assist
 * @parent PartyScene
 *
 * @param AssistSwapPosition:str
 * @text Swap Positions
 * @parent ButtonAssist
 * @desc Button assist text for the page up/down commands.
 * Requires VisuMZ_0_CoreEngine!
 * @default Quick Swap
 *
 * @param AssistRemove:str
 * @text Remove
 * @parent ButtonAssist
 * @desc Button assist text for the removal command.
 * Requires VisuMZ_0_CoreEngine!
 * @default Remove
 *
 * @param AssistSort:str
 * @text Sort
 * @parent ButtonAssist
 * @desc Button assist text for the sort command.
 * Requires VisuMZ_0_CoreEngine!
 * @default Sort
 *
 * @param AssistSwapIn:str
 * @text Swap In
 * @parent ButtonAssist
 * @desc Button assist text for swapping in actors.
 * Requires VisuMZ_0_CoreEngine!
 * @default Swap In
 *
 * @param AssistSwapOut:str
 * @text Swap Out
 * @parent ButtonAssist
 * @desc Button assist text for swapping out actors.
 * Requires VisuMZ_0_CoreEngine!
 * @default Swap Out
 *
 * @param BattleScene
 * @text Battle Scene
 *
 * @param BattlePartyCmd:str
 * @text Party Command
 * @parent BattleScene
 * @desc Command text for entering Party Scene.
 * Requires VisuMZ_1_BattleCore!
 * @default Party
 *
 * @param BattleHelpFormation:json
 * @text Help: Formation
 * @parent BattlePartyCmd:str
 * @type note
 * @desc Help text for Formation command.
 * Requires VisuMZ_1_BattleCore!
 * @default "Change up your party formation."
 *
 * @param QueuePartyScene:str
 * @text Queue Message
 * @parent BattlePartyCmd:str
 * @desc Message to say the Party Scene is queued.
 * Requires VisuMZ_1_BattleCore!
 * @default %1 Menu queued after action is complete.
 *
 * @param BattleSwitchOut:str
 * @text Switch Command
 * @parent BattleScene
 * @desc Command text for switching out members.
 * Requires VisuMZ_1_BattleCore!
 * @default Switch
 *
 * @param BattleHelpSwitch:json
 * @text Help: Switch
 * @parent BattleSwitchOut:str
 * @type note
 * @desc Help text for Switch command.
 * Requires VisuMZ_1_BattleCore!
 * @default "Switch out this party member with another."
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
 * @param ActivePartyLabel
 * @text Active Party Label
 *
 * @param ActivePartyLabelBgType:num
 * @text Background Type
 * @parent ActivePartyLabel
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
 * @param ActivePartyLabelRect:func
 * @text JS: X, Y, W, H
 * @parent ActivePartyLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.mainAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = Window_Base.prototype.lineHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ActivePartyWindow
 * @text Active Party Window
 *
 * @param ActivePartyWindowBgType:num
 * @text Background Type
 * @parent ActivePartyWindow
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
 * @param ActivePartyGraphic:str
 * @text Actor Graphic
 * @parent ActivePartyWindow
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler (Requires VisuMZ_1_MainMenuCore)
 * @value svbattler
 * @desc Choose how the actor graphics appear in the active party menu.
 * @default face
 *
 * @param ActivePartyMapSprite
 * @text Map Sprite
 * @parent ActivePartyGraphic:str
 *
 * @param ActiveSpriteOffsetX:num
 * @text Offset X
 * @parent ActivePartyMapSprite
 * @desc If showing map sprites, offset the x coordinate here from center.
 * @default 0
 *
 * @param ActiveSpriteOffsetY:num
 * @text Offset Y
 * @parent ActivePartyMapSprite
 * @desc If showing map sprites, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ActivePartySvBattler
 * @text Sideview Battler
 * @parent ActivePartyGraphic:str
 *
 * @param ActiveBattlerOffsetX:num
 * @text Offset X
 * @parent ActivePartySvBattler
 * @desc If showing sideview battlers, offset the x coordinate here from center.
 * @default 0
 *
 * @param ActiveBattlerOffsetY:num
 * @text Offset Y
 * @parent ActivePartySvBattler
 * @desc If showing sideview battlers, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ActivePartyWindowRect:func
 * @text JS: X, Y, W, H
 * @parent ActivePartyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this._activePartyLabel.y + this._activePartyLabel.height;\nconst ww = Graphics.boxWidth;\nconst wh = ImageManager.faceHeight + $gameSystem.windowPadding() * 2 + 2;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ReservePartyLabel
 * @text Reserve Party Label
 *
 * @param ReservePartyLabelBgType:num
 * @text Background Type
 * @parent ReservePartyLabel
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
 * @param ReservePartyLabelRect:func
 * @text JS: X, Y, W, H
 * @parent ReservePartyLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Math.max(240, Math.min(Graphics.boxWidth - 576, Math.round(Graphics.boxWidth / 2)));\nconst wx = this.isRightInputMode() ? (Graphics.boxWidth - ww) : 0;\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\nconst wh = Window_Base.prototype.lineHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ReservePartyWindow
 * @text Reserve Party Window
 *
 * @param ReservePartyWindowBgType:num
 * @text Background Type
 * @parent ReservePartyWindow
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
 * @param ReserveCol:num
 * @text Columns
 * @parent ReservePartyWindow
 * @type number
 * @min 1
 * @desc How many columns do you want there to be for the window?
 * @default 1
 *
 * @param ReserveItemThickness:num
 * @text Row Thickness
 * @parent ReservePartyWindow
 * @type number
 * @min 1
 * @desc How many rows thick do you want selectable items to be?
 * @default 2
 *
 * @param ReservePartyGraphic:str
 * @text Actor Graphic
 * @parent ReservePartyWindow
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler (Requires VisuMZ_1_MainMenuCore)
 * @value svbattler
 * @desc Choose how the actor graphics appear in the reserve party menu.
 * @default face
 *
 * @param ReservePartyMapSprite
 * @text Map Sprite
 * @parent ReservePartyGraphic:str
 *
 * @param ReserveSpriteOffsetX:num
 * @text Offset X
 * @parent ReservePartyMapSprite
 * @desc If showing map sprites, offset the x coordinate here from left.
 * @default 24
 *
 * @param ReserveSpriteOffsetY:num
 * @text Offset Y
 * @parent ReservePartyMapSprite
 * @desc If showing map sprites, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ReservePartySvBattler
 * @text Sideview Battler
 * @parent ReservePartyGraphic:str
 *
 * @param ReserveBattlerOffsetX:num
 * @text Offset X
 * @parent ReservePartySvBattler
 * @desc If showing sideview battlers, offset the x coordinate here from left.
 * @default 48
 *
 * @param ReserveBattlerOffsetY:num
 * @text Offset Y
 * @parent ReservePartySvBattler
 * @desc If showing sideview battlers, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ReservePartyWindowRect:func
 * @text JS: X, Y, W, H
 * @parent ReservePartyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this._reservePartyLabel.width;\nconst wx = this._reservePartyLabel.x;\nconst wy = this._reservePartyLabel.y + this._reservePartyLabel.height;\nconst wh = this.mainAreaHeight() - this._reservePartyLabel.height - this._activePartyWindow.height - this._activePartyLabel.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StatusLabel
 * @text Status Label
 *
 * @param StatusLabelBgType:num
 * @text Background Type
 * @parent StatusLabel
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
 * @param StatusLabelRect:func
 * @text JS: X, Y, W, H
 * @parent StatusLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this._reservePartyLabel.width;\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\nconst wh = Window_Base.prototype.lineHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusWindowBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusWindowDraw:func
 * @text JS: Draw Data
 * @parent StatusWindow
 * @type note
 * @desc Code used to draw the display data in the Status Window.
 * @default "// Draw Empty\nif (!this._actor) {\n    this.drawItemDarkRect(0, 0, this.innerWidth, this.innerHeight);\n    const y = Math.round((this.innerHeight - this.lineHeight()) / 2);\n    this.changeTextColor(ColorManager.systemColor());\n    this.drawText(TextManager.emptyPartyMember, 0, y, this.innerWidth, 'center');\n    return;\n}\n\n// Draw Face and Simple Status\nthis.drawActorFace(this._actor, 1, 0, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorSimpleStatus(this._actor, ImageManager.faceWidth + 36, 0);\n\n// Declare Constants\nconst lineHeight = this.lineHeight();\nconst params = this.actorParams();\nconst paramWidth = Math.round(this.innerWidth / 2);\nconst paramHeight = Math.ceil(params.length / 2) * lineHeight;\nconst baseX = 0;\nlet x = 0;\nlet y = ImageManager.faceHeight + lineHeight / 2;\n\n// Draw Parameters\nfor (const param of params) {\n    this.drawItemDarkRect(x, y, paramWidth, lineHeight);\n    this.drawParamName(param, x, y, paramWidth);\n    this.drawParamValue(param, x, y, paramWidth);\n\n    if (x === baseX) {\n        x += paramWidth;\n    } else {\n        x = baseX;\n        y += lineHeight;\n    }\n}"
 *
 * @param StatusWindowRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this._statusPartyLabel.width;\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\nconst wy = this._reservePartyWindow.y;\nconst wh = this._reservePartyWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param BattleSwitchWindow
 * @text Battle Switch Window
 *
 * @param BattleSwitchWindowBgType:num
 * @text Background Type
 * @parent BattleSwitchWindow
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
 * @param BattleSwitchWindowRect:func
 * @text JS: X, Y, W, H
 * @parent BattleSwitchWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * Does not apply to Border Battle Layout style.
 * @default "const padding = $gameSystem.windowPadding() * 2;\nlet ww = 516 + padding;\nlet wh = Window_PartyBattleSwitch.prototype.itemHeight() * 4 + padding;\nlet wx = Math.round(Graphics.boxWidth - ww) / 2;\nlet wy = Math.round(Graphics.boxHeight - wh - this._statusWindow.height) / 2;\nwy = wy.clamp(0, Graphics.boxHeight - wh - this._statusWindow.height);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
//=============================================================================

const _0x546f93=_0x2107;(function(_0x544c2a,_0x29f8ce){const _0x253c13=_0x2107,_0x4b6ece=_0x544c2a();while(!![]){try{const _0x253219=parseInt(_0x253c13(0x2c4))/0x1*(-parseInt(_0x253c13(0x1f1))/0x2)+parseInt(_0x253c13(0x360))/0x3+parseInt(_0x253c13(0x3b6))/0x4+parseInt(_0x253c13(0x2d0))/0x5*(-parseInt(_0x253c13(0x22c))/0x6)+-parseInt(_0x253c13(0x2a0))/0x7*(parseInt(_0x253c13(0x1dd))/0x8)+-parseInt(_0x253c13(0x2d9))/0x9+parseInt(_0x253c13(0x22d))/0xa;if(_0x253219===_0x29f8ce)break;else _0x4b6ece['push'](_0x4b6ece['shift']());}catch(_0x403015){_0x4b6ece['push'](_0x4b6ece['shift']());}}}(_0x1b4f,0x9cca1));var label='PartySystem',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x546f93(0x284)](function(_0x5acf41){const _0x1b2d81=_0x546f93;return _0x5acf41[_0x1b2d81(0x21a)]&&_0x5acf41[_0x1b2d81(0x352)][_0x1b2d81(0x21d)]('['+label+']');})[0x0];VisuMZ[label][_0x546f93(0x38b)]=VisuMZ[label][_0x546f93(0x38b)]||{},VisuMZ['ConvertParams']=function(_0x1e1dcd,_0x49c752){const _0x36e646=_0x546f93;for(const _0x52b035 in _0x49c752){if(_0x52b035['match'](/(.*):(.*)/i)){const _0x3684c7=String(RegExp['$1']),_0x59c648=String(RegExp['$2'])[_0x36e646(0x2f5)]()['trim']();let _0x397cb8,_0x49cabb,_0x123aa5;switch(_0x59c648){case'NUM':_0x397cb8=_0x49c752[_0x52b035]!==''?Number(_0x49c752[_0x52b035]):0x0;break;case _0x36e646(0x289):_0x49cabb=_0x49c752[_0x52b035]!==''?JSON[_0x36e646(0x373)](_0x49c752[_0x52b035]):[],_0x397cb8=_0x49cabb[_0x36e646(0x358)](_0x5cef96=>Number(_0x5cef96));break;case'EVAL':_0x397cb8=_0x49c752[_0x52b035]!==''?eval(_0x49c752[_0x52b035]):null;break;case _0x36e646(0x2c1):_0x49cabb=_0x49c752[_0x52b035]!==''?JSON[_0x36e646(0x373)](_0x49c752[_0x52b035]):[],_0x397cb8=_0x49cabb[_0x36e646(0x358)](_0x28c9a0=>eval(_0x28c9a0));break;case'JSON':_0x397cb8=_0x49c752[_0x52b035]!==''?JSON[_0x36e646(0x373)](_0x49c752[_0x52b035]):'';break;case _0x36e646(0x223):_0x49cabb=_0x49c752[_0x52b035]!==''?JSON['parse'](_0x49c752[_0x52b035]):[],_0x397cb8=_0x49cabb[_0x36e646(0x358)](_0x2e68d5=>JSON[_0x36e646(0x373)](_0x2e68d5));break;case'FUNC':_0x397cb8=_0x49c752[_0x52b035]!==''?new Function(JSON['parse'](_0x49c752[_0x52b035])):new Function(_0x36e646(0x263));break;case'ARRAYFUNC':_0x49cabb=_0x49c752[_0x52b035]!==''?JSON[_0x36e646(0x373)](_0x49c752[_0x52b035]):[],_0x397cb8=_0x49cabb['map'](_0x4b688e=>new Function(JSON[_0x36e646(0x373)](_0x4b688e)));break;case _0x36e646(0x1ca):_0x397cb8=_0x49c752[_0x52b035]!==''?String(_0x49c752[_0x52b035]):'';break;case _0x36e646(0x267):_0x49cabb=_0x49c752[_0x52b035]!==''?JSON[_0x36e646(0x373)](_0x49c752[_0x52b035]):[],_0x397cb8=_0x49cabb['map'](_0xcf030c=>String(_0xcf030c));break;case _0x36e646(0x1f5):_0x123aa5=_0x49c752[_0x52b035]!==''?JSON[_0x36e646(0x373)](_0x49c752[_0x52b035]):{},_0x397cb8=VisuMZ[_0x36e646(0x1c0)]({},_0x123aa5);break;case _0x36e646(0x2b1):_0x49cabb=_0x49c752[_0x52b035]!==''?JSON['parse'](_0x49c752[_0x52b035]):[],_0x397cb8=_0x49cabb[_0x36e646(0x358)](_0x3ddfb0=>VisuMZ['ConvertParams']({},JSON[_0x36e646(0x373)](_0x3ddfb0)));break;default:continue;}_0x1e1dcd[_0x3684c7]=_0x397cb8;}}return _0x1e1dcd;},(_0x38efe1=>{const _0x430a0a=_0x546f93,_0x4a949d=_0x38efe1[_0x430a0a(0x2d8)];for(const _0x421584 of dependencies){if(!Imported[_0x421584]){alert(_0x430a0a(0x295)[_0x430a0a(0x24e)](_0x4a949d,_0x421584)),SceneManager[_0x430a0a(0x221)]();break;}}const _0x549d3a=_0x38efe1[_0x430a0a(0x352)];if(_0x549d3a[_0x430a0a(0x1bb)](/\[Version[ ](.*?)\]/i)){const _0x3bd137=Number(RegExp['$1']);_0x3bd137!==VisuMZ[label][_0x430a0a(0x37f)]&&(alert(_0x430a0a(0x34b)[_0x430a0a(0x24e)](_0x4a949d,_0x3bd137)),SceneManager[_0x430a0a(0x221)]());}if(_0x549d3a['match'](/\[Tier[ ](\d+)\]/i)){const _0x4168fb=Number(RegExp['$1']);_0x4168fb<tier?(alert(_0x430a0a(0x3aa)[_0x430a0a(0x24e)](_0x4a949d,_0x4168fb,tier)),SceneManager[_0x430a0a(0x221)]()):tier=Math[_0x430a0a(0x1d9)](_0x4168fb,tier);}VisuMZ[_0x430a0a(0x1c0)](VisuMZ[label][_0x430a0a(0x38b)],_0x38efe1[_0x430a0a(0x3ab)]);})(pluginData),PluginManager[_0x546f93(0x395)](pluginData[_0x546f93(0x2d8)],_0x546f93(0x36c),_0x354e5b=>{const _0x48f6c4=_0x546f93;SceneManager[_0x48f6c4(0x1d4)](Scene_Party);}),PluginManager[_0x546f93(0x395)](pluginData['name'],_0x546f93(0x1ea),_0x36c5d2=>{const _0x57dc09=_0x546f93;if($gameParty[_0x57dc09(0x20a)]())return;VisuMZ[_0x57dc09(0x1c0)](_0x36c5d2,_0x36c5d2);const _0x5b5767=_0x36c5d2[_0x57dc09(0x2a4)];$gameParty[_0x57dc09(0x228)](_0x5b5767);}),PluginManager[_0x546f93(0x395)](pluginData['name'],_0x546f93(0x2bc),_0x3ccbf1=>{const _0x286936=_0x546f93;if(!SceneManager[_0x286936(0x1f2)]())return;VisuMZ['ConvertParams'](_0x3ccbf1,_0x3ccbf1);const _0x20de4c=_0x3ccbf1[_0x286936(0x220)];for(const _0x181dba of _0x20de4c){$gameParty[_0x286936(0x3a8)](_0x181dba);}$gamePlayer[_0x286936(0x235)]();}),PluginManager['registerCommand'](pluginData[_0x546f93(0x2d8)],'MoveActorsToReserve',_0x5b8552=>{const _0x2f1c38=_0x546f93;if(!SceneManager[_0x2f1c38(0x1f2)]())return;VisuMZ[_0x2f1c38(0x1c0)](_0x5b8552,_0x5b8552);const _0x5b0274=_0x5b8552['Actors'];for(const _0x3df3f3 of _0x5b0274){if($gameParty['battleMembers']()['length']<=0x1)break;$gameParty[_0x2f1c38(0x1b9)](_0x3df3f3);}$gamePlayer[_0x2f1c38(0x235)]();}),PluginManager[_0x546f93(0x395)](pluginData[_0x546f93(0x2d8)],_0x546f93(0x29f),_0x1a75f9=>{const _0x258475=_0x546f93;if(!SceneManager[_0x258475(0x1f2)]())return;if($gameParty[_0x258475(0x256)]()[_0x258475(0x382)]<=0x1)return;if(!$gameParty[_0x258475(0x224)])return;if($gameParty[_0x258475(0x224)][_0x258475(0x382)]<=0x0)return;VisuMZ['ConvertParams'](_0x1a75f9,_0x1a75f9);const _0x627154=_0x1a75f9['Index'],_0x42656c=$gameParty['_battleMembers'][_0x627154];$gameParty[_0x258475(0x1b9)](_0x42656c),$gamePlayer[_0x258475(0x235)]();}),PluginManager[_0x546f93(0x395)](pluginData[_0x546f93(0x2d8)],_0x546f93(0x35c),_0x3df084=>{const _0x8b6945=_0x546f93;if(!SceneManager[_0x8b6945(0x1f2)]())return;if($gameParty[_0x8b6945(0x256)]()[_0x8b6945(0x382)]>=$gameParty[_0x8b6945(0x1cd)]())return;if($gameParty[_0x8b6945(0x33c)]()['length']<=0x0)return;const _0x32dd0f=$gameParty[_0x8b6945(0x33c)](),_0x5a226a=_0x32dd0f[Math[_0x8b6945(0x2d2)](Math['random']()*_0x32dd0f[_0x8b6945(0x382)])],_0x404655=_0x5a226a[_0x8b6945(0x212)]();$gameParty['addActorToBattleMembers'](_0x404655),$gamePlayer[_0x8b6945(0x235)]();}),PluginManager[_0x546f93(0x395)](pluginData[_0x546f93(0x2d8)],_0x546f93(0x210),_0x54354e=>{const _0x19a429=_0x546f93;VisuMZ[_0x19a429(0x1c0)](_0x54354e,_0x54354e);const _0x341890=_0x54354e[_0x19a429(0x220)][_0x19a429(0x358)](_0x570976=>$gameActors[_0x19a429(0x321)](_0x570976))[_0x19a429(0x39b)](null),_0x6c7719=_0x54354e[_0x19a429(0x3b8)];for(const _0x41cca4 of _0x341890){if(!_0x41cca4)continue;_0x41cca4[_0x19a429(0x236)](_0x6c7719);}}),PluginManager[_0x546f93(0x395)](pluginData[_0x546f93(0x2d8)],_0x546f93(0x312),_0x22469f=>{const _0x56a0d1=_0x546f93;VisuMZ[_0x56a0d1(0x1c0)](_0x22469f,_0x22469f);const _0x4aa487=_0x22469f[_0x56a0d1(0x220)][_0x56a0d1(0x358)](_0x5665b1=>$gameActors['actor'](_0x5665b1))[_0x56a0d1(0x39b)](null),_0x3866d8=_0x22469f['Require'];for(const _0x117b9e of _0x4aa487){if(!_0x117b9e)continue;_0x117b9e[_0x56a0d1(0x326)](_0x3866d8);}}),PluginManager['registerCommand'](pluginData[_0x546f93(0x2d8)],_0x546f93(0x2c0),_0x3e114f=>{const _0x2f66a4=_0x546f93;if($gameParty[_0x2f66a4(0x20a)]())return;VisuMZ[_0x2f66a4(0x1c0)](_0x3e114f,_0x3e114f);const _0x295efb=_0x3e114f[_0x2f66a4(0x220)]||[];if(_0x295efb[_0x2f66a4(0x382)]<=0x0)return;$gameParty['createForcedParty'](_0x295efb);}),PluginManager[_0x546f93(0x395)](pluginData['name'],_0x546f93(0x2dd),_0x51ad10=>{const _0x261d62=_0x546f93;if($gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x51ad10,_0x51ad10);let _0x346461=[];try{_0x346461=_0x51ad10[_0x261d62(0x2fd)]()||[];}catch(_0x54bda1){console[_0x261d62(0x247)](_0x261d62(0x1b6)),console[_0x261d62(0x247)](_0x54bda1);return;}if(_0x346461[_0x261d62(0x382)]<=0x0)return;$gameParty[_0x261d62(0x1b3)](_0x346461);}),PluginManager[_0x546f93(0x395)](pluginData['name'],_0x546f93(0x355),_0x2a4ec8=>{const _0x323b1b=_0x546f93;if($gameParty[_0x323b1b(0x20a)]())return;VisuMZ['ConvertParams'](_0x2a4ec8,_0x2a4ec8),$gameParty[_0x323b1b(0x2a8)]();}),ImageManager[_0x546f93(0x25b)]=VisuMZ['PartySystem']['Settings'][_0x546f93(0x1c6)][_0x546f93(0x3b7)],ImageManager['requiredPartyMemberIcon']=VisuMZ[_0x546f93(0x391)][_0x546f93(0x38b)][_0x546f93(0x1c6)][_0x546f93(0x3a0)],TextManager[_0x546f93(0x27a)]=VisuMZ[_0x546f93(0x391)][_0x546f93(0x38b)][_0x546f93(0x338)][_0x546f93(0x26a)],TextManager[_0x546f93(0x2d1)]=VisuMZ[_0x546f93(0x391)][_0x546f93(0x38b)]['Vocab'][_0x546f93(0x380)],TextManager[_0x546f93(0x2fe)]=VisuMZ[_0x546f93(0x391)][_0x546f93(0x38b)][_0x546f93(0x338)][_0x546f93(0x2be)],TextManager['emptyPartyMember']=VisuMZ[_0x546f93(0x391)]['Settings']['Vocab'][_0x546f93(0x2c5)],TextManager[_0x546f93(0x278)]=VisuMZ[_0x546f93(0x391)][_0x546f93(0x38b)][_0x546f93(0x338)][_0x546f93(0x343)],TextManager[_0x546f93(0x316)]=VisuMZ[_0x546f93(0x391)][_0x546f93(0x38b)]['Vocab']['AssistSwapPosition'],TextManager[_0x546f93(0x1f9)]=VisuMZ[_0x546f93(0x391)]['Settings'][_0x546f93(0x338)]['AssistRemove'],TextManager[_0x546f93(0x277)]=VisuMZ[_0x546f93(0x391)][_0x546f93(0x38b)]['Vocab'][_0x546f93(0x275)],TextManager[_0x546f93(0x204)]=VisuMZ['PartySystem'][_0x546f93(0x38b)][_0x546f93(0x338)][_0x546f93(0x24f)],TextManager[_0x546f93(0x23a)]=VisuMZ[_0x546f93(0x391)][_0x546f93(0x38b)][_0x546f93(0x338)][_0x546f93(0x2ae)],ColorManager[_0x546f93(0x36b)]=function(_0x2bc7a4){const _0x5cd4ab=_0x546f93;return _0x2bc7a4=String(_0x2bc7a4),_0x2bc7a4[_0x5cd4ab(0x1bb)](/#(.*)/i)?_0x5cd4ab(0x1c7)[_0x5cd4ab(0x24e)](String(RegExp['$1'])):this[_0x5cd4ab(0x2f9)](Number(_0x2bc7a4));},SceneManager[_0x546f93(0x2de)]=function(){const _0x2d1709=_0x546f93;return this[_0x2d1709(0x1d5)]&&this[_0x2d1709(0x1d5)][_0x2d1709(0x311)]===Scene_Battle;},SceneManager['isSceneParty']=function(){const _0x1268f6=_0x546f93;return this['_scene']&&this[_0x1268f6(0x1d5)]['constructor']===Scene_Party;},SceneManager[_0x546f93(0x1f2)]=function(){const _0x3ea482=_0x546f93;return this[_0x3ea482(0x1d5)]&&this[_0x3ea482(0x1d5)][_0x3ea482(0x311)]===Scene_Map;},VisuMZ[_0x546f93(0x391)]['BattleManager_setup']=BattleManager['setup'],BattleManager[_0x546f93(0x36f)]=function(_0x5a1156,_0x291e10,_0x5db9e1){const _0x4a134d=_0x546f93;VisuMZ[_0x4a134d(0x391)][_0x4a134d(0x379)][_0x4a134d(0x3c5)](this,_0x5a1156,_0x291e10,_0x5db9e1),$gameParty[_0x4a134d(0x2e6)]();},BattleManager[_0x546f93(0x30a)]=function(_0x191e90,_0x7258cc){const _0x26c7e8=_0x546f93;if(_0x191e90===_0x7258cc)return;if(!_0x191e90)return;if(!_0x7258cc)return;if(this[_0x26c7e8(0x304)]===_0x191e90)this[_0x26c7e8(0x304)]=_0x7258cc;while(this[_0x26c7e8(0x1c5)][_0x26c7e8(0x21d)](_0x191e90)){const _0x2eb0d7=this[_0x26c7e8(0x1c5)][_0x26c7e8(0x303)](_0x191e90);this[_0x26c7e8(0x1c5)][_0x2eb0d7]=_0x7258cc;}},VisuMZ[_0x546f93(0x391)][_0x546f93(0x32f)]=Game_Battler[_0x546f93(0x22e)][_0x546f93(0x222)],Game_Battler[_0x546f93(0x22e)][_0x546f93(0x222)]=function(_0x23a102){const _0x231c7b=_0x546f93;VisuMZ[_0x231c7b(0x391)]['Game_Battler_onBattleStart']['call'](this,_0x23a102);if(this[_0x231c7b(0x2cc)]())this['clearPartySwitchCommandCooldown']();this['clearDamagePopup']();},VisuMZ['PartySystem'][_0x546f93(0x2ad)]=Game_Battler[_0x546f93(0x22e)]['regenerateAll'],Game_Battler[_0x546f93(0x22e)][_0x546f93(0x24b)]=function(){const _0x2bdb32=_0x546f93;VisuMZ[_0x2bdb32(0x391)][_0x2bdb32(0x2ad)]['call'](this);if(this[_0x2bdb32(0x2cc)]()&&$gameParty['inBattle']())this[_0x2bdb32(0x2ec)]();},VisuMZ['PartySystem'][_0x546f93(0x20c)]=Game_Actor[_0x546f93(0x22e)]['setup'],Game_Actor[_0x546f93(0x22e)][_0x546f93(0x36f)]=function(_0x2b1762){const _0x464771=_0x546f93;VisuMZ[_0x464771(0x391)][_0x464771(0x20c)]['call'](this,_0x2b1762),this[_0x464771(0x2db)](),this[_0x464771(0x20d)]();},Game_Actor[_0x546f93(0x22e)][_0x546f93(0x2db)]=function(){const _0xc4db2e=_0x546f93;this[_0xc4db2e(0x246)]=![],this[_0xc4db2e(0x1f8)]=![];},Game_Actor[_0x546f93(0x22e)]['isFormationChangeOk']=function(){const _0x1709af=_0x546f93;if(this[_0x1709af(0x246)]===undefined)this[_0x1709af(0x2db)]();return!this[_0x1709af(0x246)];},Game_Actor[_0x546f93(0x22e)]['setPartyLock']=function(_0x34f67c){const _0x4c20d6=_0x546f93;if(this[_0x4c20d6(0x246)]===undefined)this['initPartySystem']();this['_partyLocked']=_0x34f67c;},Game_Actor[_0x546f93(0x22e)]['isRequiredInParty']=function(){const _0x1e0030=_0x546f93;if(this[_0x1e0030(0x1f8)]===undefined)this[_0x1e0030(0x2db)]();return this[_0x1e0030(0x1f8)];},Game_Actor[_0x546f93(0x22e)]['setPartyRequirement']=function(_0x3378e9){const _0x9424a8=_0x546f93;if(this[_0x9424a8(0x1f8)]===undefined)this[_0x9424a8(0x2db)]();this[_0x9424a8(0x1f8)]=_0x3378e9;},Game_Actor[_0x546f93(0x22e)][_0x546f93(0x20d)]=function(){this['_partySwitchBattleCommandCooldown']=0x0;},Game_Actor['prototype']['canSwitchPartyInBattle']=function(){const _0x30bdb4=_0x546f93;if(this[_0x30bdb4(0x315)]===undefined)this['clearPartySwitchCommandCooldown']();if(!this[_0x30bdb4(0x314)]())return![];if(this[_0x30bdb4(0x27e)]())return![];return this[_0x30bdb4(0x315)]<=0x0;},Game_Actor[_0x546f93(0x22e)]['battlePartySwitchCooldown']=function(){const _0x5dca7f=_0x546f93;if(this['_partySwitchBattleCommandCooldown']===undefined)this[_0x5dca7f(0x20d)]();return this['_partySwitchBattleCommandCooldown'];},Game_Actor[_0x546f93(0x22e)][_0x546f93(0x230)]=function(_0x5ec53a){const _0x498c2d=_0x546f93;if(this['_partySwitchBattleCommandCooldown']===undefined)this[_0x498c2d(0x20d)]();this[_0x498c2d(0x315)]=_0x5ec53a||0x0;},Game_Actor[_0x546f93(0x22e)]['applyBattlePartySwitchCooldown']=function(){const _0x13552f=_0x546f93;if(this[_0x13552f(0x315)]===undefined)this['clearPartySwitchCommandCooldown']();const _0x5da27f=VisuMZ['PartySystem'][_0x13552f(0x38b)][_0x13552f(0x1c6)][_0x13552f(0x3b1)];this[_0x13552f(0x230)](_0x5da27f);},Game_Actor[_0x546f93(0x22e)][_0x546f93(0x2ec)]=function(){const _0xfb1cc0=_0x546f93;if(this[_0xfb1cc0(0x315)]===undefined)this[_0xfb1cc0(0x20d)]();this['_partySwitchBattleCommandCooldown']--;},Game_Actor['prototype'][_0x546f93(0x390)]=function(_0x31aa7e){const _0x52d4a2=_0x546f93;Imported[_0x52d4a2(0x1c1)]&&BattleManager[_0x52d4a2(0x2b3)]()&&BattleManager[_0x52d4a2(0x39d)]();Imported['VisuMZ_2_BattleSystemSTB']&&BattleManager[_0x52d4a2(0x30b)]()&&(BattleManager[_0x52d4a2(0x39a)](),BattleManager[_0x52d4a2(0x1ed)]=this,BattleManager[_0x52d4a2(0x1da)]=this);if(Imported[_0x52d4a2(0x1f4)]&&BattleManager[_0x52d4a2(0x337)]()){BattleManager[_0x52d4a2(0x1ed)]=undefined,BattleManager[_0x52d4a2(0x1da)]=this;const _0x1bca9f=BattleManager[_0x52d4a2(0x399)][_0x52d4a2(0x303)](_0x31aa7e);BattleManager[_0x52d4a2(0x399)][_0x1bca9f]=this,BattleManager['sortActionOrdersBTB']();}Imported[_0x52d4a2(0x258)]&&BattleManager[_0x52d4a2(0x334)]()&&(BattleManager[_0x52d4a2(0x1ed)]=this,BattleManager['_currentActor']=this,BattleManager[_0x52d4a2(0x23d)](_0x31aa7e,this));Imported[_0x52d4a2(0x27c)]&&BattleManager[_0x52d4a2(0x2f4)]()&&(BattleManager[_0x52d4a2(0x1ed)]=this,BattleManager[_0x52d4a2(0x1da)]=this,BattleManager[_0x52d4a2(0x23d)](_0x31aa7e,this));Imported[_0x52d4a2(0x1ba)]&&BattleManager[_0x52d4a2(0x394)]()&&(BattleManager['_subject']=this,BattleManager[_0x52d4a2(0x1da)]=this,BattleManager[_0x52d4a2(0x23d)](_0x31aa7e,this));if(Imported[_0x52d4a2(0x3a1)]&&BattleManager[_0x52d4a2(0x26c)]()){BattleManager[_0x52d4a2(0x1ed)]=this,BattleManager[_0x52d4a2(0x1da)]=this;for(let _0x3a9392=0x0;_0x3a9392<BattleManager[_0x52d4a2(0x399)][_0x52d4a2(0x382)];_0x3a9392++){const _0x5df7bb=BattleManager[_0x52d4a2(0x399)][_0x3a9392];_0x5df7bb===_0x31aa7e&&(BattleManager[_0x52d4a2(0x399)][_0x3a9392]=this);}for(let _0x1ecc87=0x0;_0x1ecc87<BattleManager[_0x52d4a2(0x2e9)][_0x52d4a2(0x382)];_0x1ecc87++){const _0x565654=BattleManager['_otb_actionBattlersNext'][_0x1ecc87];_0x565654===_0x31aa7e&&(BattleManager[_0x52d4a2(0x2e9)][_0x1ecc87]=this);}}if(Imported['VisuMZ_2_BattleGridSystem']&&BattleManager['isUsingGridSystem']()){const _0x5396bc=_0x31aa7e[_0x52d4a2(0x368)](),_0x29f14c=_0x31aa7e[_0x52d4a2(0x273)]();this[_0x52d4a2(0x1e5)](_0x5396bc,_0x29f14c);}},BattleManager[_0x546f93(0x23d)]=function(_0x5b5a4a,_0xc18534){const _0x2efd62=_0x546f93;this['_actionBattlers']=this[_0x2efd62(0x399)][_0x2efd62(0x358)](_0x115cec=>_0x115cec===_0x5b5a4a?_0xc18534:_0x115cec);},VisuMZ[_0x546f93(0x391)][_0x546f93(0x2c6)]=Game_Unit[_0x546f93(0x22e)][_0x546f93(0x20a)],Game_Unit[_0x546f93(0x22e)]['inBattle']=function(){const _0x2879bf=_0x546f93;if(SceneManager[_0x2879bf(0x392)]())return![];return VisuMZ[_0x2879bf(0x391)][_0x2879bf(0x2c6)]['call'](this);},Game_Party[_0x546f93(0x1e6)]=VisuMZ[_0x546f93(0x391)][_0x546f93(0x38b)][_0x546f93(0x1c6)][_0x546f93(0x20f)],VisuMZ[_0x546f93(0x391)]['Game_Party_initialize']=Game_Party[_0x546f93(0x22e)]['initialize'],Game_Party[_0x546f93(0x22e)][_0x546f93(0x317)]=function(){const _0xff6b87=_0x546f93;VisuMZ[_0xff6b87(0x391)][_0xff6b87(0x341)][_0xff6b87(0x3c5)](this),this[_0xff6b87(0x2e6)](),this[_0xff6b87(0x3ac)](),this[_0xff6b87(0x31c)]();},Game_Party[_0x546f93(0x22e)][_0x546f93(0x2e6)]=function(){const _0x27719a=_0x546f93;this[_0x27719a(0x342)]=0x0;},Game_Party[_0x546f93(0x22e)][_0x546f93(0x26b)]=function(){const _0x3d7753=_0x546f93;if(this[_0x3d7753(0x342)]===undefined)this[_0x3d7753(0x2e6)]();return this['_partySystemBattleCommandCooldown']<=0x0;},Game_Party['prototype'][_0x546f93(0x362)]=function(){const _0x33610b=_0x546f93;if(this[_0x33610b(0x342)]===undefined)this[_0x33610b(0x2e6)]();return this[_0x33610b(0x342)];},Game_Party[_0x546f93(0x22e)][_0x546f93(0x230)]=function(_0x305333){const _0xa75a98=_0x546f93;if(this[_0xa75a98(0x342)]===undefined)this[_0xa75a98(0x2e6)]();this[_0xa75a98(0x342)]=_0x305333;},Game_Party[_0x546f93(0x22e)][_0x546f93(0x213)]=function(){const _0x3fe27e=_0x546f93;if(this['_partySystemBattleCommandCooldown']===undefined)this[_0x3fe27e(0x2e6)]();this[_0x3fe27e(0x342)]=VisuMZ[_0x3fe27e(0x391)][_0x3fe27e(0x38b)]['General']['PartyCmdCooldown']||0x0;},Game_Party[_0x546f93(0x22e)][_0x546f93(0x2ec)]=function(){const _0x5dd2e8=_0x546f93;if(this[_0x5dd2e8(0x342)]===undefined)this[_0x5dd2e8(0x2e6)]();this['_partySystemBattleCommandCooldown']--;},Game_Party[_0x546f93(0x22e)][_0x546f93(0x3ac)]=function(){this['_battleMaxSize']=0x0;},Game_Party[_0x546f93(0x22e)]['changeMaxBattleMembers']=function(_0x250552){const _0x4a284a=_0x546f93;this[_0x4a284a(0x393)]=_0x250552,this[_0x4a284a(0x31c)](!![]),$gamePlayer&&$gamePlayer[_0x4a284a(0x1fc)]()&&$gamePlayer[_0x4a284a(0x1fc)]()[_0x4a284a(0x228)]();},Game_Followers[_0x546f93(0x22e)]['changeMaxBattleMembers']=function(){const _0x119710=_0x546f93;if(!SceneManager[_0x119710(0x1f2)]())return;this[_0x119710(0x36f)]();const _0x461396=$gameMap['mapId'](),_0x2ef882=$gamePlayer['x'],_0x670783=$gamePlayer['y'],_0x360ed2=$gamePlayer[_0x119710(0x2aa)]();$gameTemp['_bypassAutoSavePartySystem']=!![],$gamePlayer[_0x119710(0x1bd)](_0x461396,_0x2ef882,_0x670783,_0x360ed2,0x2),setTimeout(this[_0x119710(0x329)][_0x119710(0x2c8)](this),0x7d0);},Game_Followers[_0x546f93(0x22e)][_0x546f93(0x329)]=function(){const _0x50cf0f=_0x546f93;$gameTemp[_0x50cf0f(0x2e2)]=![];},VisuMZ[_0x546f93(0x391)][_0x546f93(0x3bd)]=Scene_Base[_0x546f93(0x22e)][_0x546f93(0x2d6)],Scene_Base['prototype'][_0x546f93(0x2d6)]=function(){const _0x9ad5fa=_0x546f93;if($gameTemp[_0x9ad5fa(0x2e2)])return![];return VisuMZ[_0x9ad5fa(0x391)][_0x9ad5fa(0x3bd)]['call'](this);},Game_Party[_0x546f93(0x22e)][_0x546f93(0x1cd)]=function(){const _0x7fe69a=_0x546f93;if(this[_0x7fe69a(0x393)]===undefined)this['initBattleMembers']();let _0x51494c=this['_battleMaxSize']||Game_Party['defaultMaxBattleMembers'];return Imported[_0x7fe69a(0x372)]&&BattleManager['isUsingBattleGridTactics']()&&(_0x51494c=_0x51494c[_0x7fe69a(0x1b4)](0x1,0x14)),_0x51494c;},Game_Party[_0x546f93(0x22e)]['checkInitBattleMembers']=function(){const _0x3a3d8f=_0x546f93;if(this[_0x3a3d8f(0x393)]===undefined)this['initBattleMembers']();if(!this['_battleMembers'])this['initBattleMembers']();while(this['_battleMembers'][_0x3a3d8f(0x382)]<this[_0x3a3d8f(0x393)]){this[_0x3a3d8f(0x224)][_0x3a3d8f(0x1d4)](0x0);}},Game_Party['prototype'][_0x546f93(0x31c)]=function(_0x2aaaf1){const _0x3b79b4=_0x546f93;!_0x2aaaf1&&(this[_0x3b79b4(0x393)]=Game_Party[_0x3b79b4(0x1e6)]);this['_battleMembers']=this[_0x3b79b4(0x274)][_0x3b79b4(0x244)](0x0,this[_0x3b79b4(0x393)]);while(this[_0x3b79b4(0x224)]['length']<this[_0x3b79b4(0x393)]){this[_0x3b79b4(0x224)][_0x3b79b4(0x1d4)](0x0);}},Game_Party[_0x546f93(0x22e)][_0x546f93(0x256)]=function(){const _0x4dfbdf=_0x546f93;if(Imported[_0x4dfbdf(0x372)]&&SceneManager[_0x4dfbdf(0x29d)]())return this[_0x4dfbdf(0x207)](!![]);return this[_0x4dfbdf(0x207)]()[_0x4dfbdf(0x284)](_0x20524d=>!!_0x20524d);},Game_Party[_0x546f93(0x22e)][_0x546f93(0x207)]=function(_0xbeb8af){const _0x1a1195=_0x546f93;this['checkInitBattleMembers']();const _0x559a1e=this['_battleMembers'][_0x1a1195(0x358)](_0x5b051b=>$gameActors[_0x1a1195(0x321)](_0x5b051b));if(_0xbeb8af)return _0x559a1e;return SceneManager[_0x1a1195(0x392)]()?_0x559a1e:_0x559a1e['filter'](_0x21ee78=>_0x21ee78&&_0x21ee78[_0x1a1195(0x366)]());},Game_Party[_0x546f93(0x22e)][_0x546f93(0x33c)]=function(){const _0xce09c3=_0x546f93,_0x4aeda9=this['battleMembers']();return this[_0xce09c3(0x367)]()['filter'](_0x2d09a7=>!_0x4aeda9[_0xce09c3(0x21d)](_0x2d09a7));},VisuMZ[_0x546f93(0x391)][_0x546f93(0x330)]=Game_Party['prototype'][_0x546f93(0x1d3)],Game_Party[_0x546f93(0x22e)][_0x546f93(0x1d3)]=function(){const _0x3fc5c9=_0x546f93;VisuMZ[_0x3fc5c9(0x391)][_0x3fc5c9(0x330)]['call'](this),this[_0x3fc5c9(0x31c)]();},VisuMZ[_0x546f93(0x391)][_0x546f93(0x35e)]=Game_Party[_0x546f93(0x22e)][_0x546f93(0x331)],Game_Party[_0x546f93(0x22e)][_0x546f93(0x331)]=function(){const _0x37ac54=_0x546f93;VisuMZ[_0x37ac54(0x391)]['Game_Party_setupBattleTest'][_0x37ac54(0x3c5)](this),this[_0x37ac54(0x3b3)]();},Game_Party['prototype'][_0x546f93(0x232)]=function(){const _0x2a3880=_0x546f93;this[_0x2a3880(0x393)]=Game_Party['defaultMaxBattleMembers'],this[_0x2a3880(0x224)]=[],this[_0x2a3880(0x274)]=[];for(const _0x39ab9a of $dataSystem[_0x2a3880(0x1cb)]){const _0x329ad5=$gameActors['actor'](_0x39ab9a[_0x2a3880(0x212)]);if(!_0x329ad5)continue;_0x329ad5[_0x2a3880(0x2f6)](_0x39ab9a['level'],![]),_0x329ad5[_0x2a3880(0x1f0)](_0x39ab9a[_0x2a3880(0x348)]),_0x329ad5['recoverAll'](),this[_0x2a3880(0x224)][_0x2a3880(0x1d4)](_0x39ab9a[_0x2a3880(0x212)]),this[_0x2a3880(0x274)][_0x2a3880(0x1d4)](_0x39ab9a[_0x2a3880(0x212)]);}this[_0x2a3880(0x224)]['remove'](0x0);while(this[_0x2a3880(0x224)][_0x2a3880(0x382)]<this[_0x2a3880(0x393)]){this[_0x2a3880(0x224)][_0x2a3880(0x1d4)](0x0);}while(this[_0x2a3880(0x224)][_0x2a3880(0x382)]>this[_0x2a3880(0x1cd)]()){this[_0x2a3880(0x224)][_0x2a3880(0x2d3)]();}if($gamePlayer)$gamePlayer[_0x2a3880(0x235)]();},Game_Party[_0x546f93(0x22e)]['addNonBattleTestMembers']=function(){const _0x1afbe2=_0x546f93,_0x279f82=this[_0x1afbe2(0x256)]();for(let _0x1e0c92=0x1;_0x1e0c92<$dataActors[_0x1afbe2(0x382)];_0x1e0c92++){const _0x575e44=$gameActors[_0x1afbe2(0x321)](_0x1e0c92);if(!_0x575e44)continue;if(_0x575e44[_0x1afbe2(0x2d8)]()[_0x1afbe2(0x382)]<=0x0)continue;if(_0x575e44[_0x1afbe2(0x2d8)]()['match'](/-----/i))continue;if(_0x279f82[_0x1afbe2(0x21d)](_0x575e44))continue;this['_actors'][_0x1afbe2(0x1d4)](_0x575e44['actorId']());}},VisuMZ[_0x546f93(0x391)][_0x546f93(0x3a7)]=Game_Party[_0x546f93(0x22e)][_0x546f93(0x23e)],Game_Party['prototype'][_0x546f93(0x23e)]=function(_0x4f8f74){const _0x369395=_0x546f93;VisuMZ[_0x369395(0x391)][_0x369395(0x3a7)][_0x369395(0x3c5)](this,_0x4f8f74),this[_0x369395(0x3a8)](_0x4f8f74),SceneManager['isSceneBattle']()&&(Imported[_0x369395(0x3a1)]&&BattleManager[_0x369395(0x26c)]()&&(BattleManager[_0x369395(0x1c4)](),BattleManager[_0x369395(0x2ab)]($gameActors['actor'](_0x4f8f74))));},Game_Party[_0x546f93(0x22e)]['addActorToBattleMembers']=function(_0x138a27){const _0x54359d=_0x546f93;this[_0x54359d(0x384)]();if(this[_0x54359d(0x224)][_0x54359d(0x21d)](_0x138a27))return;if(!this[_0x54359d(0x274)]['includes'](_0x138a27))return;if(!this['_battleMembers']['includes'](0x0))return;const _0x43b6df=$gameActors['actor'](_0x138a27);if(!_0x43b6df)return;const _0x59b81=this[_0x54359d(0x224)][_0x54359d(0x303)](0x0);if(_0x59b81<0x0)return;this[_0x54359d(0x224)][_0x59b81]=_0x138a27,SceneManager[_0x54359d(0x2de)]()&&(_0x43b6df[_0x54359d(0x222)](),_0x43b6df[_0x54359d(0x216)]()),this[_0x54359d(0x238)]();},Game_Party[_0x546f93(0x22e)]['addActorToBattleMembersAtIndex']=function(_0x2781f9,_0x201357){const _0x19b844=_0x546f93;this[_0x19b844(0x384)]();if(this[_0x19b844(0x224)]['includes'](_0x2781f9))return;if(!this[_0x19b844(0x224)][_0x19b844(0x21d)](0x0))return;const _0x1f57c0=$gameActors[_0x19b844(0x321)](_0x2781f9);if(!_0x1f57c0)return;this[_0x19b844(0x224)][_0x201357]=_0x2781f9,_0x1f57c0[_0x19b844(0x216)](),this[_0x19b844(0x238)]();},VisuMZ['PartySystem'][_0x546f93(0x276)]=Game_Party[_0x546f93(0x22e)][_0x546f93(0x1b7)],Game_Party[_0x546f93(0x22e)][_0x546f93(0x1b7)]=function(_0x11c087){const _0x1fd896=_0x546f93;this['removeActorFromBattleMembers'](_0x11c087),VisuMZ[_0x1fd896(0x391)]['Game_Party_removeActor'][_0x1fd896(0x3c5)](this,_0x11c087);},Game_Party[_0x546f93(0x22e)][_0x546f93(0x1b9)]=function(_0x4ec0bf){const _0x3d76cc=_0x546f93;this[_0x3d76cc(0x384)]();if(!this[_0x3d76cc(0x224)][_0x3d76cc(0x21d)](_0x4ec0bf))return;if(_0x4ec0bf<=0x0)return;const _0x3e1080=this[_0x3d76cc(0x224)][_0x3d76cc(0x303)](_0x4ec0bf);this['_battleMembers'][_0x3e1080]=0x0,this['_actors'][_0x3d76cc(0x39b)](_0x4ec0bf),this[_0x3d76cc(0x274)][_0x3d76cc(0x1d4)](_0x4ec0bf),this[_0x3d76cc(0x238)]();},Game_Party[_0x546f93(0x22e)]['partyChangeRefresh']=function(){const _0x3dadeb=_0x546f93;this[_0x3dadeb(0x2d5)](),$gamePlayer[_0x3dadeb(0x235)](),$gameMap[_0x3dadeb(0x332)]();},Game_Party[_0x546f93(0x22e)][_0x546f93(0x2d5)]=function(){const _0x1fa5c4=_0x546f93;this['checkInitBattleMembers']();const _0x1ac69a=this['battleMembers']()[_0x1fa5c4(0x1ef)](this[_0x1fa5c4(0x33c)]());this[_0x1fa5c4(0x274)]=_0x1ac69a['map'](_0x3d050a=>_0x3d050a?_0x3d050a[_0x1fa5c4(0x212)]():0x0)['remove'](0x0);},Game_Party[_0x546f93(0x22e)]['sortActors']=function(){const _0xac920f=_0x546f93;this[_0xac920f(0x274)][_0xac920f(0x298)]((_0x5b4b7b,_0x3bd795)=>_0x5b4b7b-_0x3bd795),this[_0xac920f(0x2d5)](),this['partyChangeRefresh']();},Game_Party[_0x546f93(0x22e)][_0x546f93(0x249)]=function(){const _0x102073=_0x546f93;for(const _0x43baea of this[_0x102073(0x33c)]()){if(!_0x43baea)continue;if(_0x43baea['isRequiredInParty']())return!![];}return![];},VisuMZ[_0x546f93(0x391)]['Game_Party_swapOrder']=Game_Party['prototype'][_0x546f93(0x30e)],Game_Party['prototype'][_0x546f93(0x30e)]=function(_0x300b7f,_0x844b71){const _0x45c578=_0x546f93,_0x1b8af3=this['battleMembers']()['remove'](null)[_0x45c578(0x39b)](undefined)[_0x45c578(0x382)];VisuMZ[_0x45c578(0x391)]['Game_Party_swapOrder'][_0x45c578(0x3c5)](this,_0x300b7f,_0x844b71),this[_0x45c578(0x364)](_0x300b7f,_0x844b71,_0x1b8af3);},Game_Party['prototype'][_0x546f93(0x364)]=function(_0x20a16b,_0x8a1b15,_0x3dc383){const _0x328eac=_0x546f93;this[_0x328eac(0x224)]=[];for(let _0x2385bf=0x0;_0x2385bf<this[_0x328eac(0x274)][_0x328eac(0x382)];_0x2385bf++){if(this[_0x328eac(0x224)]['length']>=this[_0x328eac(0x1cd)]())break;if(SceneManager[_0x328eac(0x1d5)][_0x328eac(0x38a)]()){if(this['_battleMembers']['length']>=_0x3dc383)break;}this[_0x328eac(0x224)][_0x2385bf]=this[_0x328eac(0x274)][_0x2385bf];}$gamePlayer[_0x328eac(0x235)]();},Scene_MenuBase['prototype'][_0x546f93(0x38a)]=function(){const _0x2a33f8=_0x546f93;if(this[_0x2a33f8(0x311)][_0x2a33f8(0x2d8)]===_0x2a33f8(0x359))return!![];return![];},Game_Party[_0x546f93(0x22e)][_0x546f93(0x1b3)]=function(_0x446d8d){const _0x56b403=_0x546f93;if(this[_0x56b403(0x20a)]())return;if(!_0x446d8d)return;if(_0x446d8d['length']<=0x0)return;this[_0x56b403(0x296)]=_0x446d8d[_0x56b403(0x2b9)](),this[_0x56b403(0x296)]=this[_0x56b403(0x296)][_0x56b403(0x284)](_0xda02a2=>!!$gameActors['actor'](_0xda02a2));while(this[_0x56b403(0x296)][_0x56b403(0x382)]>this[_0x56b403(0x1cd)]()){this['_forcedPartyActors'][_0x56b403(0x2d3)]();}$gamePlayer[_0x56b403(0x235)](),$gameMap[_0x56b403(0x332)]();},Game_Party[_0x546f93(0x22e)][_0x546f93(0x2a8)]=function(){const _0x17dd80=_0x546f93;if(this['inBattle']())return;this['_forcedPartyActors']=undefined,$gamePlayer[_0x17dd80(0x235)](),$gameMap[_0x17dd80(0x332)]();},VisuMZ[_0x546f93(0x391)][_0x546f93(0x209)]=Game_Party[_0x546f93(0x22e)]['allMembers'],Game_Party[_0x546f93(0x22e)][_0x546f93(0x367)]=function(){const _0x131e7b=_0x546f93;if(this['_forcedPartyActors']!==undefined)return this[_0x131e7b(0x296)][_0x131e7b(0x358)](_0x447090=>$gameActors[_0x131e7b(0x321)](_0x447090));return VisuMZ['PartySystem']['Game_Party_allMembers_FP'][_0x131e7b(0x3c5)](this);},VisuMZ['PartySystem']['Game_Party_rawBattleMembers_FP']=Game_Party[_0x546f93(0x22e)][_0x546f93(0x207)],Game_Party[_0x546f93(0x22e)][_0x546f93(0x207)]=function(_0x25f7c8){const _0x139b13=_0x546f93;if(this[_0x139b13(0x296)]!==undefined)return this[_0x139b13(0x296)]['map'](_0x2a27fd=>$gameActors[_0x139b13(0x321)](_0x2a27fd));return VisuMZ['PartySystem'][_0x139b13(0x375)][_0x139b13(0x3c5)](this,_0x25f7c8);},VisuMZ[_0x546f93(0x391)]['Game_Party_reserveMembers_FP']=Game_Party[_0x546f93(0x22e)][_0x546f93(0x33c)],Game_Party[_0x546f93(0x22e)]['reserveMembers']=function(){const _0x3301c0=_0x546f93;if(this[_0x3301c0(0x296)]!==undefined)return[];return VisuMZ['PartySystem'][_0x3301c0(0x3c7)][_0x3301c0(0x3c5)](this);},VisuMZ['PartySystem'][_0x546f93(0x215)]=Game_System['prototype'][_0x546f93(0x2da)],Game_System[_0x546f93(0x22e)]['isFormationEnabled']=function(){const _0x11eaaf=_0x546f93;if($gameParty[_0x11eaaf(0x296)]!==undefined)return![];if($gameParty['_forcedBattleGridTactics']!==undefined)return![];return VisuMZ[_0x11eaaf(0x391)][_0x11eaaf(0x215)][_0x11eaaf(0x3c5)](this);},VisuMZ['PartySystem'][_0x546f93(0x3bb)]=Game_Actor[_0x546f93(0x22e)][_0x546f93(0x26b)],Game_Actor[_0x546f93(0x22e)]['canSwitchPartyInBattle']=function(){const _0x49011d=_0x546f93;if($gameParty[_0x49011d(0x296)]!==undefined)return![];if($gameParty['_forcedBattleGridTactics']!==undefined)return![];return VisuMZ[_0x49011d(0x391)][_0x49011d(0x3bb)][_0x49011d(0x3c5)](this);},VisuMZ['PartySystem'][_0x546f93(0x279)]=Game_Party['prototype'][_0x546f93(0x26b)],Game_Party[_0x546f93(0x22e)][_0x546f93(0x26b)]=function(){const _0x1d0ddd=_0x546f93;if($gameParty[_0x1d0ddd(0x296)]!==undefined)return![];if($gameParty['_forcedBattleGridTactics']!==undefined)return![];return VisuMZ[_0x1d0ddd(0x391)][_0x1d0ddd(0x279)][_0x1d0ddd(0x3c5)](this);},VisuMZ[_0x546f93(0x391)][_0x546f93(0x25d)]=Game_Troop[_0x546f93(0x22e)][_0x546f93(0x305)],Game_Troop['prototype'][_0x546f93(0x305)]=function(){const _0x4a5e14=_0x546f93;VisuMZ[_0x4a5e14(0x391)][_0x4a5e14(0x25d)][_0x4a5e14(0x3c5)](this),$gameParty['updateBattlePartySwitchCooldown']();},Scene_Menu['prototype'][_0x546f93(0x30c)]=function(){const _0x1e6c16=_0x546f93;SceneManager[_0x1e6c16(0x1d4)](Scene_Party);};function Scene_Party(){const _0x9fab6a=_0x546f93;this[_0x9fab6a(0x317)](...arguments);}Scene_Party[_0x546f93(0x22e)]=Object[_0x546f93(0x227)](Scene_MenuBase[_0x546f93(0x22e)]),Scene_Party[_0x546f93(0x22e)][_0x546f93(0x311)]=Scene_Party,Scene_Party['prototype'][_0x546f93(0x317)]=function(){const _0x4876bb=_0x546f93;this['loadPartyImages'](),Scene_MenuBase[_0x4876bb(0x22e)][_0x4876bb(0x317)][_0x4876bb(0x3c5)](this);},Scene_Party[_0x546f93(0x22e)]['isRightInputMode']=function(){const _0x14865d=_0x546f93;if(ConfigManager[_0x14865d(0x320)]&&ConfigManager[_0x14865d(0x237)]!==undefined)return ConfigManager[_0x14865d(0x237)];else return ConfigManager['uiMenuStyle']===![]?![]:Scene_MenuBase[_0x14865d(0x22e)][_0x14865d(0x38d)][_0x14865d(0x3c5)](this);},Scene_Party[_0x546f93(0x22e)][_0x546f93(0x363)]=function(){return 0x0;},Scene_Party['prototype'][_0x546f93(0x3b9)]=function(){return!![];},Scene_Party[_0x546f93(0x22e)]['createPageButtons']=function(){const _0x134596=_0x546f93;Scene_MenuBase[_0x134596(0x22e)]['createPageButtons'][_0x134596(0x3c5)](this),this[_0x134596(0x22a)][_0x134596(0x24d)]=undefined,this['_pagedownButton'][_0x134596(0x24d)]=undefined;},Scene_Party[_0x546f93(0x22e)][_0x546f93(0x1c2)]=function(){const _0x1510f2=_0x546f93;for(const _0x34a356 of $gameParty[_0x1510f2(0x2ca)]()){ImageManager[_0x1510f2(0x241)](_0x34a356[_0x1510f2(0x2c2)]()),ImageManager['loadCharacter'](_0x34a356['characterName']()),ImageManager[_0x1510f2(0x218)](_0x34a356[_0x1510f2(0x351)]());}},Scene_Party[_0x546f93(0x22e)][_0x546f93(0x227)]=function(){const _0x5a7017=_0x546f93;Scene_MenuBase[_0x5a7017(0x22e)][_0x5a7017(0x227)]['call'](this),this[_0x5a7017(0x1e7)](),this['createActivePartyWindow'](),this[_0x5a7017(0x1e1)](),this[_0x5a7017(0x38e)](),this[_0x5a7017(0x2e1)](),this[_0x5a7017(0x2a7)]();},Scene_Party[_0x546f93(0x22e)][_0x546f93(0x1e7)]=function(){const _0x3b5c99=_0x546f93,_0x4755b3=this[_0x3b5c99(0x233)]();this[_0x3b5c99(0x28d)]=new Window_PartyLabel(_0x4755b3,TextManager[_0x3b5c99(0x27a)]),this[_0x3b5c99(0x28d)]['setBackgroundType'](VisuMZ['PartySystem'][_0x3b5c99(0x38b)][_0x3b5c99(0x251)]['ActivePartyLabelBgType']),this[_0x3b5c99(0x307)](this[_0x3b5c99(0x28d)]);},Scene_Party[_0x546f93(0x22e)][_0x546f93(0x233)]=function(){const _0x55fcb1=_0x546f93;return VisuMZ['PartySystem'][_0x55fcb1(0x38b)][_0x55fcb1(0x251)]['ActivePartyLabelRect'][_0x55fcb1(0x3c5)](this);},Scene_Party[_0x546f93(0x22e)][_0x546f93(0x381)]=function(){const _0x6daf31=_0x546f93,_0x5cafbb=this[_0x6daf31(0x357)]();this[_0x6daf31(0x1d6)]=new Window_PartyActive(_0x5cafbb),this['_activePartyWindow']['setBackgroundType'](VisuMZ[_0x6daf31(0x391)][_0x6daf31(0x38b)][_0x6daf31(0x251)][_0x6daf31(0x286)]),this['_activePartyWindow'][_0x6daf31(0x35f)]('ok',this[_0x6daf31(0x2a1)][_0x6daf31(0x2c8)](this)),this['_activePartyWindow'][_0x6daf31(0x35f)](_0x6daf31(0x21b),this[_0x6daf31(0x306)][_0x6daf31(0x2c8)](this)),this[_0x6daf31(0x307)](this[_0x6daf31(0x1d6)]);},Scene_Party['prototype'][_0x546f93(0x357)]=function(){const _0x847a5e=_0x546f93;return VisuMZ[_0x847a5e(0x391)][_0x847a5e(0x38b)]['Window'][_0x847a5e(0x353)]['call'](this);},Scene_Party[_0x546f93(0x22e)][_0x546f93(0x2a1)]=function(){const _0x53c7e0=_0x546f93;this[_0x53c7e0(0x2c7)][_0x53c7e0(0x31f)](),this[_0x53c7e0(0x2c7)]['reselect']();},Scene_Party['prototype'][_0x546f93(0x1e1)]=function(){const _0x1bf3c8=_0x546f93,_0x9e757e=this[_0x1bf3c8(0x250)]();this[_0x1bf3c8(0x3a2)]=new Window_PartyLabel(_0x9e757e,TextManager['reserveParty']),this[_0x1bf3c8(0x3a2)][_0x1bf3c8(0x28a)](VisuMZ[_0x1bf3c8(0x391)][_0x1bf3c8(0x38b)][_0x1bf3c8(0x251)]['ReservePartyLabelBgType']),this['addWindow'](this[_0x1bf3c8(0x3a2)]);},Scene_Party[_0x546f93(0x22e)]['reservePartyLabelRect']=function(){const _0x5ab45a=_0x546f93;return VisuMZ[_0x5ab45a(0x391)][_0x5ab45a(0x38b)]['Window'][_0x5ab45a(0x2b5)][_0x5ab45a(0x3c5)](this);},Scene_Party[_0x546f93(0x22e)][_0x546f93(0x38e)]=function(){const _0x3f7a60=_0x546f93,_0x586168=this['reservePartyWindowRect']();this['_reservePartyWindow']=new Window_PartyReserve(_0x586168),this[_0x3f7a60(0x2c7)][_0x3f7a60(0x28a)](VisuMZ[_0x3f7a60(0x391)][_0x3f7a60(0x38b)]['Window'][_0x3f7a60(0x282)]),this['_reservePartyWindow'][_0x3f7a60(0x35f)]('ok',this['onReserveOk'][_0x3f7a60(0x2c8)](this)),this[_0x3f7a60(0x2c7)][_0x3f7a60(0x35f)]('cancel',this[_0x3f7a60(0x31b)][_0x3f7a60(0x2c8)](this)),this['addWindow'](this[_0x3f7a60(0x2c7)]);},Scene_Party[_0x546f93(0x22e)][_0x546f93(0x2fb)]=function(){const _0x32c497=_0x546f93;return VisuMZ[_0x32c497(0x391)][_0x32c497(0x38b)][_0x32c497(0x251)][_0x32c497(0x3ae)][_0x32c497(0x3c5)](this);},Scene_Party[_0x546f93(0x22e)][_0x546f93(0x350)]=function(){const _0x48a7d4=_0x546f93,_0x5f045e=this[_0x48a7d4(0x2c7)][_0x48a7d4(0x280)](),_0x49580c=this[_0x48a7d4(0x1d6)][_0x48a7d4(0x28e)]();if(_0x5f045e<0x0){if(_0x49580c)$gameParty['removeActorFromBattleMembers'](_0x49580c[_0x48a7d4(0x212)]());}else{const _0x39e4e1=this['_reservePartyWindow'][_0x48a7d4(0x28e)]()[_0x48a7d4(0x212)](),_0x2bfd0d=this[_0x48a7d4(0x1d6)][_0x48a7d4(0x283)]();if(_0x49580c)$gameParty['removeActorFromBattleMembers'](_0x49580c[_0x48a7d4(0x212)]());$gameParty['addActorToBattleMembersAtIndex'](_0x39e4e1,_0x2bfd0d);}this[_0x48a7d4(0x2a2)](),this[_0x48a7d4(0x31b)]();},Scene_Party['prototype'][_0x546f93(0x2a2)]=function(){const _0xc43204=_0x546f93;this[_0xc43204(0x1d6)][_0xc43204(0x235)](),this['_reservePartyWindow'][_0xc43204(0x235)]();},Scene_Party[_0x546f93(0x22e)][_0x546f93(0x31b)]=function(){const _0x2a32cd=_0x546f93;this[_0x2a32cd(0x2c7)][_0x2a32cd(0x33d)](),this[_0x2a32cd(0x2c7)]['deselect'](),this[_0x2a32cd(0x1d6)][_0x2a32cd(0x31f)]();},Scene_Party[_0x546f93(0x22e)]['createStatusLabel']=function(){const _0x590340=_0x546f93,_0x2aac71=this[_0x590340(0x234)]();this['_statusPartyLabel']=new Window_PartyLabel(_0x2aac71,TextManager[_0x590340(0x2fe)]),this['_statusPartyLabel'][_0x590340(0x28a)](VisuMZ[_0x590340(0x391)][_0x590340(0x38b)][_0x590340(0x251)][_0x590340(0x252)]),this[_0x590340(0x307)](this[_0x590340(0x2b4)]);},Scene_Party[_0x546f93(0x22e)][_0x546f93(0x234)]=function(){const _0x6b6d9=_0x546f93;return VisuMZ[_0x6b6d9(0x391)][_0x6b6d9(0x38b)][_0x6b6d9(0x251)]['StatusLabelRect']['call'](this);},Scene_Party['prototype'][_0x546f93(0x2a7)]=function(){const _0x224112=_0x546f93,_0xc852a1=this['statusWindowRect']();this[_0x224112(0x345)]=new Window_PartyStatus(_0xc852a1),this[_0x224112(0x345)][_0x224112(0x28a)](VisuMZ[_0x224112(0x391)][_0x224112(0x38b)][_0x224112(0x251)][_0x224112(0x290)]),this[_0x224112(0x307)](this[_0x224112(0x345)]),this['_reservePartyWindow']['setStatusWindow'](this[_0x224112(0x345)]),this['_activePartyWindow'][_0x224112(0x272)](this[_0x224112(0x345)]);},Scene_Party[_0x546f93(0x22e)]['statusWindowRect']=function(){const _0x34c86d=_0x546f93;return VisuMZ['PartySystem'][_0x34c86d(0x38b)][_0x34c86d(0x251)][_0x34c86d(0x1df)]['call'](this);},Scene_Party['prototype'][_0x546f93(0x25e)]=function(){const _0x4292a0=_0x546f93;return TextManager[_0x4292a0(0x34d)](_0x4292a0(0x23c));},Scene_Party[_0x546f93(0x22e)][_0x546f93(0x2ff)]=function(){const _0x2d3f12=_0x546f93;return TextManager[_0x2d3f12(0x316)];},Scene_Party[_0x546f93(0x22e)][_0x546f93(0x324)]=function(){const _0x20c304=_0x546f93,_0x520461=this['_activePartyWindow'],_0x421075=this[_0x20c304(0x2c7)];if(_0x520461&&_0x520461[_0x20c304(0x292)]&&_0x520461['currentActor']()&&_0x520461[_0x20c304(0x2f8)]())return TextManager[_0x20c304(0x1f9)];else return _0x421075&&_0x421075[_0x20c304(0x292)]&&$gameParty[_0x20c304(0x33c)]()['length']>0x0?TextManager[_0x20c304(0x277)]:'';},Scene_Party[_0x546f93(0x22e)][_0x546f93(0x313)]=function(){const _0x2069f6=_0x546f93;if(this['_activePartyWindow']&&this[_0x2069f6(0x1d6)]['active'])return TextManager[_0x2069f6(0x23a)];else return this[_0x2069f6(0x2c7)]&&this[_0x2069f6(0x2c7)][_0x2069f6(0x292)]?TextManager[_0x2069f6(0x204)]:Scene_MenuBase[_0x2069f6(0x22e)][_0x2069f6(0x313)][_0x2069f6(0x3c5)](this);},Scene_Party[_0x546f93(0x22e)][_0x546f93(0x27d)]=function(){const _0x2b29bc=_0x546f93;Scene_MenuBase[_0x2b29bc(0x22e)]['createBackground'][_0x2b29bc(0x3c5)](this),this[_0x2b29bc(0x239)](this[_0x2b29bc(0x2cb)]()),this[_0x2b29bc(0x28c)]();},Scene_Party[_0x546f93(0x22e)][_0x546f93(0x2cb)]=function(){const _0x3c6526=_0x546f93;return VisuMZ[_0x3c6526(0x391)][_0x3c6526(0x38b)][_0x3c6526(0x225)][_0x3c6526(0x264)];},Scene_Party[_0x546f93(0x22e)][_0x546f93(0x28c)]=function(){const _0x926762=_0x546f93,_0x3020db={'BgFilename1':VisuMZ[_0x926762(0x391)][_0x926762(0x38b)][_0x926762(0x225)][_0x926762(0x1cc)],'BgFilename2':VisuMZ[_0x926762(0x391)][_0x926762(0x38b)][_0x926762(0x225)]['BgFilename2']};_0x3020db&&(_0x3020db['BgFilename1']!==''||_0x3020db['BgFilename2']!=='')&&(this[_0x926762(0x333)]=new Sprite(ImageManager['loadTitle1'](_0x3020db[_0x926762(0x1cc)])),this['_backSprite2']=new Sprite(ImageManager[_0x926762(0x1ee)](_0x3020db[_0x926762(0x1dc)])),this[_0x926762(0x254)](this[_0x926762(0x333)]),this['addChild'](this[_0x926762(0x376)]),this[_0x926762(0x333)]['bitmap']['addLoadListener'](this['adjustSprite']['bind'](this,this['_backSprite1'])),this[_0x926762(0x376)][_0x926762(0x20b)][_0x926762(0x37a)](this[_0x926762(0x29a)][_0x926762(0x2c8)](this,this[_0x926762(0x376)])));},Scene_Party['prototype'][_0x546f93(0x29a)]=function(_0x5679e7){const _0x1a70e9=_0x546f93;this[_0x1a70e9(0x262)](_0x5679e7),this['centerSprite'](_0x5679e7);},Scene_Party[_0x546f93(0x22e)][_0x546f93(0x26d)]=function(){const _0x1eb310=_0x546f93;Scene_MenuBase[_0x1eb310(0x22e)]['terminate'][_0x1eb310(0x3c5)](this),$gameParty[_0x1eb310(0x238)]();},Window_StatusBase[_0x546f93(0x22e)][_0x546f93(0x243)]=function(_0x17f991,_0x23dccb,_0x3c13e7,_0x18eb6e){const _0x3e5c95=_0x546f93;if(!_0x17f991)return;_0x18eb6e?this[_0x3e5c95(0x2fa)](_0x17f991,_0x23dccb,_0x3c13e7):this[_0x3e5c95(0x3c4)](_0x17f991,_0x23dccb,_0x3c13e7);},Window_StatusBase[_0x546f93(0x22e)][_0x546f93(0x3c4)]=function(_0x69c355,_0x596143,_0x5771fe){const _0x5267b2=_0x546f93;_0x5771fe+=Math[_0x5267b2(0x260)]((this[_0x5267b2(0x240)]()-ImageManager[_0x5267b2(0x266)])/0x2),!_0x69c355[_0x5267b2(0x314)]()&&(this['drawIcon'](ImageManager[_0x5267b2(0x25b)],_0x596143,_0x5771fe),_0x596143+=ImageManager['iconWidth']+0x4),_0x69c355[_0x5267b2(0x27e)]()&&(this['drawIcon'](ImageManager['requiredPartyMemberIcon'],_0x596143,_0x5771fe),_0x596143+=ImageManager[_0x5267b2(0x226)]+0x4);},Window_StatusBase['prototype'][_0x546f93(0x2fa)]=function(_0x12bb51,_0x11d197,_0x3686f4){const _0x5545df=_0x546f93;let _0x36b35c=0x0;if(!_0x12bb51[_0x5545df(0x314)]())_0x36b35c+=0x1;if(_0x12bb51[_0x5545df(0x27e)]())_0x36b35c+=0x1;if(_0x36b35c<=0x1)return this[_0x5545df(0x3c4)](_0x12bb51,_0x11d197,_0x3686f4);_0x3686f4+=Math['round']((this[_0x5545df(0x240)]()-ImageManager['iconHeight'])/0x2),_0x3686f4-=Math[_0x5545df(0x260)](this['lineHeight']()/0x2),this[_0x5545df(0x2ba)](ImageManager[_0x5545df(0x25b)],_0x11d197,_0x3686f4),_0x3686f4+=this[_0x5545df(0x240)](),this[_0x5545df(0x2ba)](ImageManager[_0x5545df(0x3c0)],_0x11d197,_0x3686f4);};function _0x1b4f(){const _0x349203=['callFormation','ActivePartyGraphic','createStatusWindow','clearForcedParty','_partySwitchTargetActor','direction','otbReturnBattlerToTurnOrders','StatusWindowDraw','Game_Battler_regenerateAll','AssistSwapOut','_lastIndex','isFormationCommandAdded','ARRAYSTRUCT','battler','isCTB','_statusPartyLabel','ReservePartyLabelRect','isPartyCommandAdded','dimColor1','drawParamName','clone','drawIcon','_windowLayer','MoveActorsToActive','ReserveBattlerOffsetY','Status','right','TempCreatePartyNormal','ARRAYEVAL','faceName','maxCols','1MsPRYb','Empty','Game_Unit_inBattle','_reservePartyWindow','bind','actorParams','members','getBackgroundOpacity','isActor','isPlaytest','close','isTpb','304285gDvqDL','reserveParty','floor','pop','BattleSwitchWindowRect','rearrangePartyActors','isAutosaveEnabled','ReserveSpriteOffsetY','name','1782567iWjNuZ','isFormationEnabled','initPartySystem','actor%1-stateIcon','TempCreatePartyJS','isSceneBattle','isUsingGridSystem','createPartySwitchWindow','createStatusLabel','_bypassAutoSavePartySystem','width','DrawBackRect','update','clearPartyBattleCommandCooldown','findSymbol','isEnabled','_otb_actionBattlersNext','checkShiftSortShortcut','processCursorMove','updateBattlePartySwitchCooldown','face','hasBattleSystemIncompatibilities','ReserveItemThickness','drawItem','setText','isImmediateTpb','changeTextColor','isETB','toUpperCase','changeLevel','systemColor','isShiftRemoveShortcutEnabled','textColor','drawActorPartyIconsVert','reservePartyWindowRect','drawItemDarkRect','ActorsJS','statusParty','buttonAssistText1','battleLayoutStyle','isCurrentItemEnabled','clear','indexOf','_target','increaseTurn','popScene','addWindow','checkShiftRemoveShortcut','drawItemImage','updateTargetsForPartySwitch','isSTB','commandFormation','Scene_Battle_createPartyCommandWindowBattleCore','swapOrder','text','updateBattleProcess','constructor','RequirePartyMembers','buttonAssistText4','isFormationChangeOk','_partySwitchBattleCommandCooldown','assistSwapPositions','initialize','isPartyCommandEnabled','ActorCmdWinAddParty','updatePadding','onReserveCancel','initBattleMembers','battlePartyChangeCmdHelp','setActor','activate','uiMenuStyle','actor','drawDarkRect','BattlePartyCmd','buttonAssistText3','sortActors','setPartyRequirement','border','playEquip','clearBypassAutoSave','battlePartyChangeCmd','isActiveTpb','cursorPageup','addCommand','Window_PartyCommand_updateHelp','Game_Battler_onBattleStart','Game_Party_setupStartingMembers','setupBattleTest','requestRefresh','_backSprite1','isFTB','quickSwap','SceneManager_isNextSceneBattleTransitionable','isBTB','Vocab','loadFaceImages','isShowPartySwitchOutAnimation','drawItemStatus','reserveMembers','deactivate','QueuePartyScene','addRemoveCommand','partySwitchWindowRectStandard','Game_Party_initialize','_partySystemBattleCommandCooldown','Remove','nameStartPosition','_statusPartyWindow','BattleSwitchWindowBgType','onPartySwitchOk','equips','drawItemImageFace','formation','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','BattleHelpFormation','getInputButtonString','_rowThickness','drawActorCharacter','onReserveOk','battlerName','description','ActivePartyWindowRect','drawItemImageSvActor','TempDisbandTempParty','_callSceneParty','activePartyWindowRect','map','Scene_BattleGridTactics','drawActorFace','ActiveTpbFormationMessage','MoveRandomToActive','_inputting','Game_Party_setupBattleTest','setHandler','786564cOyZqn','createInnerSprite','battlePartySwitchCooldown','helpAreaHeight','swapOrderPartySystemPlugin','skillItemWindowRectBorderStyle','isAppeared','allMembers','gridRank','postPartySwitchMenuTpb','BackRectColor','getColor','CallPartyScene','_logWindow','_partyCommandWindow','setup','processPartySwitchMember','SwitchOutAnimation','VisuMZ_2_BattleGridSystem','parse','stepForward','Game_Party_rawBattleMembers_FP','_backSprite2','commandPartyMemberSwitch','drawItemImageSprite','BattleManager_setup','addLoadListener','updatePartySwitch','processCancel','visible','openness','version','ReserveParty','createActivePartyWindow','length','ActiveBattlerOffsetX','checkInitBattleMembers','commandStyle','battlePartySwitchCmd','addCustomCommands','processShiftSortShortcut','isFormationCommandEnabled','allowEarlySwapOrderBreak','Settings','isQueueFormationMenu','isRightInputMode','createReservePartyWindow','playCursorSound','onBattlePartySwitch','PartySystem','isSceneParty','_battleMaxSize','isPTB','registerCommand','gaugeBackColor','drawRemoveCommand','SceneManager_isPreviousSceneBattleTransitionable','_actionBattlers','updateTurnOrderSTB','remove','addFormationCommand','updateTurnOrderCTB','makeActionOrders','VisuMZ_1_BattleCore','RequireIcon','VisuMZ_2_BattleSystemOTB','_reservePartyLabel','paramValueByName','paintOpacity','innerWidth','startSwitchOutAnimation','Game_Party_addActor','addActorToBattleMembers','trim','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','parameters','initMaxBattleMembers','drawSvActor','ReservePartyWindowRect','BattlePartyIcon','removePartyCommand','ActorCmdCooldown','itemRectWithPadding','addNonBattleTestMembers','drawItemEmpty','callUpdateHelp','644860xPMBfg','LockIcon','Lock','needsPageButtons','postPartySwitchMenuTurnBased','Game_Actor_canSwitchPartyInBattle_FP','VisuMZ_0_CoreEngine','Scene_Base_isAutosaveEnabled','isShiftShortcutEnabled','Scene_Battle_createActorCommandWindow','requiredPartyMemberIcon','_callPartyMemberSwitch','ensureCursorVisible','setBattler','drawActorPartyIconsHorz','call','partySwitchWindowRect','Game_Party_reserveMembers_FP','changePaintOpacity','currentSymbol','refreshOG','createForcedParty','clamp','Scene_Battle_isAnyInputWindowActive','Temp:\x20Create\x20Temporary\x20Party\x20(JS)\x20Error','removeActor','callPartyMemberSwitch','removeActorFromBattleMembers','VisuMZ_2_BattleSystemPTB','match','emptyPartyMember','reserveTransfer','startOpacity','fillRect','ConvertParams','VisuMZ_2_BattleSystemCTB','loadPartyImages','Scene_Battle_isTimeActive','removeActionBattlersOTB','_targets','General','#%1','_partyMemberSwitchWindow','battlePartySwitchCmdHelp','STR','testBattlers','BgFilename1','maxBattleMembers','onPartySwitchCancel','selectActor','placeBasicGauges','gradientFillRect','isTimeActive','setupStartingMembers','push','_scene','_activePartyWindow','dimColor2','maxItems','max','_currentActor','\x5cI[%1]%2','BgFilename2','8FzpxNq','drawText','StatusWindowRect','createAllWindows','createReservePartyLabel','Sprite_Actor_update','itemPadding','ActiveSpriteOffsetY','gridMoveTo','defaultMaxBattleMembers','createActivePartyLabel','toLowerCase','snapForBackground','ChangeMaxBattleMembers','isAnyInputWindowActive','partySwitchWindowRectBorder','_subject','loadTitle2','concat','initEquips','1780998VmpfHL','isSceneMap','_tpbSceneChangeCacheActor','VisuMZ_2_BattleSystemBTB','STRUCT','processOk','_battleSystemIncompatibilityError','_partyRequired','assistRemovePartyMember','ceil','resetFontSettings','followers','isCancelEnabled','clearTpbChargeTime','faceWidth','isNextScene','isNextSceneBattleTransitionable','_actor','_actorGraphic','assistSwapInPartyMember','Window_ActorCommand_updateHelp','faceHeight','rawBattleMembers','padding','Game_Party_allMembers_FP','inBattle','bitmap','Game_Actor_setup','clearPartySwitchCommandCooldown','isTriggered','MaxBattleMembers','LockPartyMembers','center','actorId','applyBattlePartySwitchCooldown','VisuMZ_1_MainMenuCore','Game_System_isFormationEnabled_FP','makeActions','ReserveCol','loadSvActor','min','status','cancel','itemLineRect','includes','isAlive','isOkEnabled','Actors','exit','onBattleStart','ARRAYJSON','_battleMembers','BgSettings','iconWidth','create','changeMaxBattleMembers','preparePartySwitchMember','_pageupButton','select','78bUZxBF','28990660vTJFGz','prototype','battlePartyChangeIcon','setBattlePartySwitchCooldown','isPreviousSceneBattleTransitionable','setupBattleTestMembers','activePartyLabelRect','statusLabelRect','refresh','setPartyLock','uiInputPosition','partyChangeRefresh','setBackgroundOpacity','assistSwapOutPartyMember','_partySwitchDuration','shift','replaceActionBattlersPartySwitch','addActor','windowPadding','lineHeight','loadFace','Scene_Battle_updateBattleProcess','drawActorPartyIcons','slice','teamBasedFirstAvailableMember','_partyLocked','log','getPartySystemBackColor','anyRequiredPartyMembersInReserve','createPartyCommandWindowBattleCore','regenerateAll','cursorPagedown','_clickHandler','format','AssistSwapIn','reservePartyLabelRect','Window','StatusLabelBgType','AddRemoveCmd','addChild','_actorCommandWindow','battleMembers','Scene_Battle_createAllWindows','VisuMZ_2_BattleSystemFTB','smoothSelect','svbattler','lockPartyMemberIcon','addText','Game_Troop_increaseTurn','buttonAssistKey3','height','round','updateHelp','scaleSprite','return\x200','SnapshotOpacity','cursorDown','iconHeight','ARRAYSTR','open','drawActorName','ActiveParty','canSwitchPartyInBattle','isOTB','terminate','itemHeight','isPreviousScene','getParamValue','tpbImmediateAction','setStatusWindow','gridFlank','_actors','AssistSort','Game_Party_removeActor','assistSortPartyMembers','removePartyMember','Game_Party_canSwitchPartyInBattle_FP','activeParty','cursorVisible','VisuMZ_2_BattleSystemETB','createBackground','isRequiredInParty','drawParamText','pendingIndex','contents','ReservePartyWindowBgType','index','filter','DisplayedParams','ActivePartyWindowBgType','charged','ReserveBattlerOffsetX','ARRAYNUM','setBackgroundType','_statusWindow','createCustomBackgroundImages','_activePartyLabel','currentActor','PartyCmdWinAddParty','StatusWindowBgType','startSwitchInAnimation','active','sprite','innerHeight','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_forcedPartyActors','itemRect','sort','switchStateIconActor','adjustSprite','_partySystemSwitchOut','drawActorClass','isSceneGridTactics','createActorCommandWindow','MovePartyIndexToReserve','5603899LwTChB','onActiveOk','refreshAllWindows','processDrawItem','Value'];_0x1b4f=function(){return _0x349203;};return _0x1b4f();}function Window_PartyLabel(){this['initialize'](...arguments);}Window_PartyLabel[_0x546f93(0x22e)]=Object[_0x546f93(0x227)](Window_Base['prototype']),Window_PartyLabel['prototype'][_0x546f93(0x311)]=Window_PartyLabel,Window_PartyLabel[_0x546f93(0x22e)][_0x546f93(0x317)]=function(_0x33032c,_0x5c07dd){const _0x320f0c=_0x546f93;Window_Base['prototype'][_0x320f0c(0x317)][_0x320f0c(0x3c5)](this,_0x33032c),this[_0x320f0c(0x2f1)](_0x5c07dd);},Window_PartyLabel[_0x546f93(0x22e)][_0x546f93(0x31a)]=function(){const _0x55d9dc=_0x546f93;this[_0x55d9dc(0x208)]=0x0;},Window_PartyLabel[_0x546f93(0x22e)][_0x546f93(0x2f1)]=function(_0x4edabb){const _0x41a7c6=_0x546f93;this[_0x41a7c6(0x281)][_0x41a7c6(0x302)](),this['drawText'](_0x4edabb,0x0,0x0,this[_0x41a7c6(0x3a5)],_0x41a7c6(0x211));};function _0x2107(_0x453c5a,_0x40dd51){const _0x1b4f70=_0x1b4f();return _0x2107=function(_0x2107b5,_0x9d35fe){_0x2107b5=_0x2107b5-0x1b1;let _0x137f73=_0x1b4f70[_0x2107b5];return _0x137f73;},_0x2107(_0x453c5a,_0x40dd51);}function Window_PartyActive(){const _0xb82a73=_0x546f93;this[_0xb82a73(0x317)](...arguments);}Window_PartyActive['prototype']=Object[_0x546f93(0x227)](Window_StatusBase['prototype']),Window_PartyActive[_0x546f93(0x22e)][_0x546f93(0x311)]=Window_PartyActive,Window_PartyActive[_0x546f93(0x203)]=VisuMZ[_0x546f93(0x391)]['Settings'][_0x546f93(0x251)][_0x546f93(0x2a6)],Window_PartyActive[_0x546f93(0x22e)][_0x546f93(0x317)]=function(_0x28b7fa){const _0x261f57=_0x546f93;Window_StatusBase[_0x261f57(0x22e)][_0x261f57(0x317)][_0x261f57(0x3c5)](this,_0x28b7fa),this[_0x261f57(0x235)](),this[_0x261f57(0x31f)](),this[_0x261f57(0x259)](0x0);},Window_PartyActive[_0x546f93(0x22e)][_0x546f93(0x33f)]=function(){return VisuMZ['PartySystem']['Settings']['General']['AddRemoveCmd'];},Window_PartyActive[_0x546f93(0x22e)]['maxItems']=function(){const _0x6193f9=_0x546f93;return $gameParty[_0x6193f9(0x1cd)]();},Window_PartyActive[_0x546f93(0x22e)][_0x546f93(0x2c3)]=function(){const _0x4defa7=_0x546f93;return $gameParty[_0x4defa7(0x1cd)]();},Window_PartyActive['prototype']['itemHeight']=function(){const _0x1f19c7=_0x546f93;return this[_0x1f19c7(0x294)];},Window_PartyActive['prototype'][_0x546f93(0x321)]=function(_0x571c22){const _0x443e6c=_0x546f93;return $gameParty[_0x443e6c(0x207)]()[_0x571c22];},Window_PartyActive['prototype'][_0x546f93(0x28e)]=function(){const _0x2267e7=_0x546f93;return this[_0x2267e7(0x321)](this['index']());},Window_PartyActive[_0x546f93(0x22e)][_0x546f93(0x301)]=function(){const _0x44f4a4=_0x546f93,_0x2c9e3c=this[_0x44f4a4(0x321)](this[_0x44f4a4(0x283)]());return _0x2c9e3c?_0x2c9e3c[_0x44f4a4(0x314)]():!![];},Window_PartyActive[_0x546f93(0x22e)][_0x546f93(0x1fd)]=function(){const _0x1bc558=_0x546f93;if($gameParty['members']()[_0x1bc558(0x382)]<=0x0)return!![];if($gameParty[_0x1bc558(0x249)]())return![];return $gameParty[_0x1bc558(0x256)]()[_0x1bc558(0x382)]>0x0;},Window_PartyActive['prototype'][_0x546f93(0x2eb)]=function(){const _0x707bae=_0x546f93;Window_StatusBase[_0x707bae(0x22e)]['processCursorMove']['call'](this),this[_0x707bae(0x308)]();},Window_PartyActive[_0x546f93(0x22e)][_0x546f93(0x265)]=function(_0x2e55b3){const _0x443066=_0x546f93;this[_0x443066(0x21f)]()&&this[_0x443066(0x1f6)]();},Window_PartyActive[_0x546f93(0x22e)][_0x546f93(0x24c)]=function(){const _0x112aa8=_0x546f93,_0x51535d=this[_0x112aa8(0x283)](),_0x3bf386=_0x51535d+0x1>=this[_0x112aa8(0x1d8)]()?0x0:_0x51535d+0x1;this['quickSwap'](_0x51535d,_0x3bf386);},Window_PartyActive[_0x546f93(0x22e)]['cursorPageup']=function(){const _0x2e6e7a=_0x546f93,_0x15bc64=this[_0x2e6e7a(0x283)](),_0x79c36c=_0x15bc64-0x1<0x0?this['maxItems']()-0x1:_0x15bc64-0x1;this[_0x2e6e7a(0x335)](_0x15bc64,_0x79c36c);},Window_PartyActive[_0x546f93(0x22e)]['quickSwap']=function(_0x378c75,_0x14c3c2){const _0x5490d4=_0x546f93,_0x1ada49=this['actor'](_0x378c75),_0xe98d7d=this['actor'](_0x14c3c2);if(_0x1ada49&&!_0x1ada49[_0x5490d4(0x314)]())return;if(_0xe98d7d&&!_0xe98d7d[_0x5490d4(0x314)]())return;const _0x15e233=$gameParty['_battleMembers'];_0x15e233[_0x378c75]=_0xe98d7d?_0xe98d7d[_0x5490d4(0x212)]():0x0,_0x15e233[_0x14c3c2]=_0x1ada49?_0x1ada49[_0x5490d4(0x212)]():0x0,this[_0x5490d4(0x235)](),this[_0x5490d4(0x38f)](),this[_0x5490d4(0x259)](_0x14c3c2);},Window_PartyActive[_0x546f93(0x22e)][_0x546f93(0x308)]=function(){const _0x3c4643=_0x546f93;if(!this[_0x3c4643(0x2f8)]())return;if(Input[_0x3c4643(0x20e)]('shift')){const _0x62c364=this[_0x3c4643(0x28e)]();this['processShiftRemoveShortcut']();}},Window_PartyActive[_0x546f93(0x22e)]['processShiftRemoveShortcut']=function(){const _0x12ce4a=_0x546f93;SoundManager[_0x12ce4a(0x328)]();const _0x2e3b12=this[_0x12ce4a(0x28e)]();$gameParty[_0x12ce4a(0x1b9)](_0x2e3b12[_0x12ce4a(0x212)]()),this['callUpdateHelp'](),SceneManager['_scene'][_0x12ce4a(0x2a2)]();},Window_PartyActive[_0x546f93(0x22e)]['isShiftRemoveShortcutEnabled']=function(){const _0xe5bd88=_0x546f93;if(!this[_0xe5bd88(0x33f)]())return![];const _0x51f62e=this[_0xe5bd88(0x28e)]();return this[_0xe5bd88(0x292)]&&_0x51f62e&&_0x51f62e['isFormationChangeOk']();},Window_PartyActive['prototype'][_0x546f93(0x2f0)]=function(_0xe9307b){const _0x3fdab3=_0x546f93,_0xd5ff97=this['actor'](_0xe9307b);if(!_0xd5ff97)return this[_0x3fdab3(0x3b4)](_0xe9307b);this[_0x3fdab3(0x1fb)]();const _0x4dbed3=this[_0x3fdab3(0x297)](_0xe9307b);this[_0x3fdab3(0x309)](_0xe9307b);const _0x435565=_0x4dbed3['y']+_0x4dbed3[_0x3fdab3(0x25f)]-this[_0x3fdab3(0x240)]();this[_0x3fdab3(0x322)](_0x4dbed3['x'],_0x435565,_0x4dbed3['width'],0x2),this[_0x3fdab3(0x243)](_0xd5ff97,_0x4dbed3['x']+0x2,_0x4dbed3['y']),this[_0x3fdab3(0x269)](_0xd5ff97,_0x4dbed3['x'],_0x435565,_0x4dbed3['width']);},Window_PartyActive[_0x546f93(0x22e)][_0x546f93(0x3b4)]=function(_0x182547){const _0x22c28f=_0x546f93;this[_0x22c28f(0x1fb)]();const _0x18b849=this[_0x22c28f(0x297)](_0x182547);this[_0x22c28f(0x2fc)](_0x18b849['x'],_0x18b849['y'],_0x18b849[_0x22c28f(0x2e3)],_0x18b849[_0x22c28f(0x25f)]);const _0x20c587=_0x18b849['y']+Math['round']((_0x18b849[_0x22c28f(0x25f)]-this['lineHeight']())/0x2);this[_0x22c28f(0x2f3)](ColorManager[_0x22c28f(0x2f7)]()),this['drawText'](TextManager[_0x22c28f(0x1bc)],_0x18b849['x'],_0x20c587,_0x18b849['width'],_0x22c28f(0x211));},Window_PartyActive[_0x546f93(0x22e)]['drawItemDarkRect']=function(_0x3c1114,_0x33a9d6,_0x157abf,_0x3fc99a,_0x39fbac){const _0x5ce7ba=_0x546f93;_0x39fbac=Math[_0x5ce7ba(0x1d9)](_0x39fbac||0x1,0x1);while(_0x39fbac--){_0x3fc99a=_0x3fc99a||this[_0x5ce7ba(0x240)](),this['contents'][_0x5ce7ba(0x3a4)]=0xa0;const _0x16d27d=ColorManager[_0x5ce7ba(0x396)]();this[_0x5ce7ba(0x281)]['fillRect'](_0x3c1114+0x1,_0x33a9d6+0x1,_0x157abf-0x2,_0x3fc99a-0x2,_0x16d27d),this['contents'][_0x5ce7ba(0x3a4)]=0xff;}},Window_PartyActive[_0x546f93(0x22e)][_0x546f93(0x309)]=function(_0x177f33){const _0x1154f8=_0x546f93;switch(Window_PartyActive[_0x1154f8(0x203)][_0x1154f8(0x1e8)]()[_0x1154f8(0x3a9)]()){case _0x1154f8(0x2ed):this[_0x1154f8(0x349)](_0x177f33);break;case _0x1154f8(0x293):this['drawItemImageSprite'](_0x177f33);break;case _0x1154f8(0x25a):Imported[_0x1154f8(0x214)]&&this['drawItemImageSvActor'](_0x177f33);break;};},Window_PartyActive['prototype'][_0x546f93(0x349)]=function(_0x30e1e8){const _0x1942ca=_0x546f93,_0x53a00d=this['actor'](_0x30e1e8),_0x25c892=this[_0x1942ca(0x297)](_0x30e1e8),_0xb8e026=Math['min'](ImageManager['faceWidth'],_0x25c892[_0x1942ca(0x2e3)]-0x2),_0x80be1=_0x25c892[_0x1942ca(0x25f)]-0x2;this['changePaintOpacity'](_0x53a00d[_0x1942ca(0x314)]());const _0x2febdc=Math[_0x1942ca(0x260)](_0x25c892['x']+(_0x25c892[_0x1942ca(0x2e3)]-_0xb8e026)/0x2);this['drawActorFace'](_0x53a00d,_0x2febdc,_0x25c892['y']+0x1,_0xb8e026,_0x80be1),this[_0x1942ca(0x3c8)](!![]);},Window_PartyActive[_0x546f93(0x22e)][_0x546f93(0x378)]=function(_0x400035){const _0x218a00=_0x546f93,_0x4adb8b=this[_0x218a00(0x321)](_0x400035),_0x32132b=this[_0x218a00(0x297)](_0x400035),_0x18efe6=VisuMZ[_0x218a00(0x391)]['Settings'][_0x218a00(0x251)],_0x7b72be=_0x32132b['x']+Math[_0x218a00(0x260)](_0x32132b['width']/0x2)+_0x18efe6['ActiveSpriteOffsetX'],_0x2ddfab=_0x32132b['y']+_0x32132b[_0x218a00(0x25f)]-this[_0x218a00(0x240)]()-_0x18efe6[_0x218a00(0x1e4)];this[_0x218a00(0x34f)](_0x4adb8b,_0x7b72be,_0x2ddfab);},Window_PartyActive[_0x546f93(0x22e)][_0x546f93(0x354)]=function(_0x28a27d){const _0x361d12=_0x546f93,_0x4577ca=this[_0x361d12(0x321)](_0x28a27d),_0x1b392d=_0x4577ca[_0x361d12(0x351)](),_0x2fe9fe=this[_0x361d12(0x297)](_0x28a27d),_0xd2f38b=VisuMZ[_0x361d12(0x391)][_0x361d12(0x38b)][_0x361d12(0x251)],_0x5c5b8d=_0x2fe9fe['x']+Math['round'](_0x2fe9fe['width']/0x2)+_0xd2f38b[_0x361d12(0x383)],_0x1d81f4=_0x2fe9fe['y']+_0x2fe9fe['height']-this[_0x361d12(0x240)]()-_0xd2f38b['ActiveBattlerOffsetY'];this[_0x361d12(0x3ad)](_0x1b392d,_0x5c5b8d,_0x1d81f4);},Window_PartyActive[_0x546f93(0x22e)]['drawDarkRect']=function(_0x302dea,_0x32ea96,_0x576b29,_0x544b10){const _0xb4d3d5=_0x546f93,_0x1634e3=ColorManager[_0xb4d3d5(0x2b7)](),_0x3281d7=ColorManager[_0xb4d3d5(0x1d7)](),_0x27f708=_0x576b29/0x2,_0x40d871=this[_0xb4d3d5(0x240)]();while(_0x544b10--){this[_0xb4d3d5(0x281)][_0xb4d3d5(0x1d1)](_0x302dea,_0x32ea96,_0x27f708,_0x40d871,_0x3281d7,_0x1634e3),this[_0xb4d3d5(0x281)][_0xb4d3d5(0x1d1)](_0x302dea+_0x27f708,_0x32ea96,_0x27f708,_0x40d871,_0x1634e3,_0x3281d7);}},Window_PartyActive[_0x546f93(0x22e)]['drawActorName']=function(_0x3d54a5,_0x26e330,_0x3c87be,_0x1b16a6){const _0x5cf4fd=_0x546f93;_0x1b16a6=_0x1b16a6||0xa8,this[_0x5cf4fd(0x2f3)](ColorManager['hpColor'](_0x3d54a5)),this[_0x5cf4fd(0x1de)](_0x3d54a5['name'](),_0x26e330,_0x3c87be,_0x1b16a6,_0x5cf4fd(0x211));},Window_PartyActive['prototype']['setStatusWindow']=function(_0x3795ed){const _0x5efe69=_0x546f93;this[_0x5efe69(0x28b)]=_0x3795ed,this[_0x5efe69(0x3b5)]();},Window_PartyActive[_0x546f93(0x22e)][_0x546f93(0x3b5)]=function(){const _0x1472e4=_0x546f93;if(this[_0x1472e4(0x28b)])this[_0x1472e4(0x28b)][_0x1472e4(0x31e)](this['actor'](this[_0x1472e4(0x283)]()));};function Window_PartyReserve(){const _0x186275=_0x546f93;this[_0x186275(0x317)](...arguments);}Window_PartyReserve[_0x546f93(0x22e)]=Object['create'](Window_StatusBase[_0x546f93(0x22e)]),Window_PartyReserve[_0x546f93(0x22e)][_0x546f93(0x311)]=Window_PartyReserve,Window_PartyReserve[_0x546f93(0x203)]=VisuMZ[_0x546f93(0x391)][_0x546f93(0x38b)]['Window']['ReservePartyGraphic'],Window_PartyReserve['_rowThickness']=VisuMZ['PartySystem'][_0x546f93(0x38b)][_0x546f93(0x251)][_0x546f93(0x2ef)],Window_PartyReserve[_0x546f93(0x22e)][_0x546f93(0x317)]=function(_0x14c73d){const _0x1e5d8d=_0x546f93;Window_StatusBase[_0x1e5d8d(0x22e)][_0x1e5d8d(0x317)][_0x1e5d8d(0x3c5)](this,_0x14c73d),this[_0x1e5d8d(0x2af)]=0x0,this[_0x1e5d8d(0x235)]();},Window_PartyReserve[_0x546f93(0x22e)][_0x546f93(0x2c3)]=function(){const _0x31ba05=_0x546f93;return VisuMZ[_0x31ba05(0x391)]['Settings'][_0x31ba05(0x251)][_0x31ba05(0x217)]||0x1;},Window_PartyReserve[_0x546f93(0x22e)][_0x546f93(0x26e)]=function(){const _0x4ca999=_0x546f93;return this[_0x4ca999(0x240)]()*Window_PartyReserve[_0x4ca999(0x34e)]+0x6;},Window_PartyReserve[_0x546f93(0x22e)]['addRemoveCommand']=function(){const _0x289c08=_0x546f93;return VisuMZ[_0x289c08(0x391)][_0x289c08(0x38b)][_0x289c08(0x1c6)][_0x289c08(0x253)];},Window_PartyReserve[_0x546f93(0x22e)][_0x546f93(0x1d8)]=function(){const _0x5dfd95=_0x546f93;let _0x3fa0eb=$gameParty['reserveMembers']()[_0x5dfd95(0x382)];if(this[_0x5dfd95(0x33f)]())_0x3fa0eb++;return _0x3fa0eb;},Window_PartyReserve[_0x546f93(0x22e)][_0x546f93(0x321)]=function(_0x469bff){return $gameParty['reserveMembers']()[_0x469bff];},Window_PartyReserve[_0x546f93(0x22e)][_0x546f93(0x28e)]=function(){const _0x442585=_0x546f93;return this[_0x442585(0x321)](this['index']());},Window_PartyReserve[_0x546f93(0x22e)]['playOkSound']=function(){const _0x2ee444=_0x546f93;SoundManager[_0x2ee444(0x328)]();},Window_PartyReserve[_0x546f93(0x22e)][_0x546f93(0x301)]=function(){const _0x6d62f6=_0x546f93,_0x3a9edb=this[_0x6d62f6(0x321)](this[_0x6d62f6(0x283)]());return _0x3a9edb?_0x3a9edb[_0x6d62f6(0x314)]():!![];},Window_PartyReserve[_0x546f93(0x22e)][_0x546f93(0x2eb)]=function(){const _0x5873b4=_0x546f93;Window_StatusBase[_0x5873b4(0x22e)][_0x5873b4(0x2eb)][_0x5873b4(0x3c5)](this),this[_0x5873b4(0x2ea)]();},Window_PartyReserve['prototype']['cursorUp']=function(_0xc07de0){const _0xe9bb07=_0x546f93;this['index']()<=0x0&&Input[_0xe9bb07(0x20e)]('up')?this[_0xe9bb07(0x37c)]():Window_StatusBase[_0xe9bb07(0x22e)]['cursorUp'][_0xe9bb07(0x3c5)](this,_0xc07de0);},Window_PartyReserve[_0x546f93(0x22e)][_0x546f93(0x24c)]=function(){const _0x3db224=_0x546f93,_0x2ccf92=this[_0x3db224(0x283)](),_0x229625=_0x2ccf92+0x1>=this[_0x3db224(0x1d8)]()-0x1?0x0:_0x2ccf92+0x1;this['quickSwap'](_0x2ccf92,_0x229625);},Window_PartyReserve[_0x546f93(0x22e)][_0x546f93(0x32c)]=function(){const _0x5e268e=_0x546f93,_0x167171=this[_0x5e268e(0x283)](),_0x262e06=_0x167171-0x1<0x0?this[_0x5e268e(0x1d8)]()-0x2:_0x167171-0x1;this[_0x5e268e(0x335)](_0x167171,_0x262e06);},Window_PartyReserve[_0x546f93(0x22e)]['quickSwap']=function(_0x31cb8a,_0xcf0d6f){const _0x1c17bd=_0x546f93,_0x3c979e=this[_0x1c17bd(0x321)](_0x31cb8a),_0x4fbc78=this[_0x1c17bd(0x321)](_0xcf0d6f);if(!_0x3c979e?.[_0x1c17bd(0x314)]()||!_0x4fbc78?.['isFormationChangeOk']())return;else{if(!_0x3c979e||!_0x4fbc78)return;}const _0x50704f=$gameParty[_0x1c17bd(0x274)],_0xecf16a=_0x50704f[_0x1c17bd(0x303)](_0x3c979e['actorId']()),_0x175d35=_0x50704f[_0x1c17bd(0x303)](_0x4fbc78[_0x1c17bd(0x212)]());_0x50704f[_0xecf16a]=_0x4fbc78?_0x4fbc78[_0x1c17bd(0x212)]():0x0,_0x50704f[_0x175d35]=_0x3c979e?_0x3c979e[_0x1c17bd(0x212)]():0x0,this[_0x1c17bd(0x235)](),this[_0x1c17bd(0x38f)](),this[_0x1c17bd(0x259)](_0xcf0d6f);},Window_PartyReserve['prototype'][_0x546f93(0x2ea)]=function(){const _0xa717c=_0x546f93;if(!this[_0xa717c(0x3be)]())return;Input['isTriggered'](_0xa717c(0x23c))&&this[_0xa717c(0x388)]();},Window_PartyReserve[_0x546f93(0x22e)][_0x546f93(0x388)]=function(){const _0x15684e=_0x546f93;SoundManager[_0x15684e(0x328)](),$gameParty[_0x15684e(0x325)](),this[_0x15684e(0x259)](0x0),SceneManager['_scene'][_0x15684e(0x2a2)]();},Window_PartyReserve[_0x546f93(0x22e)][_0x546f93(0x3be)]=function(){const _0x2996e6=_0x546f93;return this[_0x2996e6(0x292)];},Window_PartyReserve[_0x546f93(0x22e)]['pendingIndex']=function(){const _0x181e73=_0x546f93,_0x42574e=this['currentActor']();return _0x42574e?_0x42574e[_0x181e73(0x283)]():-0x1;},Window_PartyReserve[_0x546f93(0x22e)][_0x546f93(0x22b)]=function(_0x5c40e9){const _0x1f80d0=_0x546f93;Window_StatusBase['prototype'][_0x1f80d0(0x22b)][_0x1f80d0(0x3c5)](this,_0x5c40e9);if(_0x5c40e9>=0x0)this[_0x1f80d0(0x2af)]=_0x5c40e9;},Window_PartyReserve[_0x546f93(0x22e)]['reselect']=function(){const _0x5e0015=_0x546f93;this['_lastIndex']=Math[_0x5e0015(0x219)](this['_lastIndex'],this['maxItems']()-0x1),this[_0x5e0015(0x259)](this['_lastIndex']),this[_0x5e0015(0x3c2)](!![]),this[_0x5e0015(0x27b)]=!![];},Window_PartyReserve[_0x546f93(0x22e)]['drawItem']=function(_0x80ed74){const _0x5961c5=_0x546f93,_0xbae508=this[_0x5961c5(0x321)](_0x80ed74);if(!_0xbae508)return this[_0x5961c5(0x397)](_0x80ed74);const _0x48826d=this['itemLineRect'](_0x80ed74);this[_0x5961c5(0x309)](_0x80ed74);const _0x22e915=0xa8,_0x49cdc9=Window_PartyReserve[_0x5961c5(0x34e)]===0x1,_0x34b4d3=ImageManager[_0x5961c5(0x226)]*(_0x49cdc9?0x2:0x1),_0x4c0635=this[_0x5961c5(0x344)]()+this[_0x5961c5(0x1e3)](),_0x5420d4=_0x48826d['width']-_0x22e915,_0x5c1f6a=_0x48826d['x']+_0x34b4d3+Math[_0x5961c5(0x219)](_0x4c0635,_0x5420d4),_0x566ac1=_0x49cdc9?![]:!![];this[_0x5961c5(0x3c8)](_0xbae508[_0x5961c5(0x314)]()),this[_0x5961c5(0x243)](_0xbae508,_0x48826d['x'],_0x48826d['y'],_0x566ac1),this['drawActorName'](_0xbae508,_0x5c1f6a,_0x48826d['y'],_0x22e915),this[_0x5961c5(0x3c8)](!![]);},Window_PartyReserve[_0x546f93(0x22e)]['nameStartPosition']=function(){const _0x63f8a=_0x546f93,_0x34bc31=VisuMZ['PartySystem']['Settings'][_0x63f8a(0x251)];switch(Window_PartyReserve[_0x63f8a(0x203)][_0x63f8a(0x1e8)]()[_0x63f8a(0x3a9)]()){case _0x63f8a(0x2ed):return ImageManager[_0x63f8a(0x1ff)];case _0x63f8a(0x293):return _0x34bc31['ReserveSpriteOffsetX']*0x2;case _0x63f8a(0x25a):return _0x34bc31[_0x63f8a(0x288)]*0x2;};},Window_PartyReserve[_0x546f93(0x22e)]['drawRemoveCommand']=function(_0x459a89){const _0xd960a2=_0x546f93,_0x97d5f=this[_0xd960a2(0x21c)](_0x459a89);this[_0xd960a2(0x3c8)](!![]);const _0x16804f=TextManager[_0xd960a2(0x278)];this[_0xd960a2(0x1de)](_0x16804f,_0x97d5f['x'],_0x97d5f['y'],_0x97d5f[_0xd960a2(0x2e3)],_0xd960a2(0x211));},Window_PartyReserve['prototype'][_0x546f93(0x309)]=function(_0x482f15){const _0x261350=_0x546f93;switch(Window_PartyReserve[_0x261350(0x203)][_0x261350(0x1e8)]()[_0x261350(0x3a9)]()){case _0x261350(0x2ed):this[_0x261350(0x349)](_0x482f15);break;case _0x261350(0x293):this[_0x261350(0x378)](_0x482f15);break;case _0x261350(0x25a):Imported[_0x261350(0x214)]&&this['drawItemImageSvActor'](_0x482f15);break;};},Window_PartyReserve[_0x546f93(0x22e)][_0x546f93(0x349)]=function(_0x1d1e9d){const _0x28a225=_0x546f93,_0x2a89e3=this[_0x28a225(0x321)](_0x1d1e9d),_0x131edb=this['itemRect'](_0x1d1e9d),_0xaa106f=Window_PartyReserve[_0x28a225(0x34e)]===0x1;_0x131edb['x']+=ImageManager[_0x28a225(0x226)]*(_0xaa106f?0x2:0x1);const _0x5a2fe2=ImageManager['faceWidth'],_0x3a33d9=_0x131edb[_0x28a225(0x25f)]-0x2;this['changePaintOpacity'](_0x2a89e3[_0x28a225(0x314)]()),this[_0x28a225(0x35a)](_0x2a89e3,_0x131edb['x']+0x1,_0x131edb['y']+0x1,_0x5a2fe2,_0x3a33d9),this[_0x28a225(0x3c8)](!![]);},Window_PartyReserve[_0x546f93(0x22e)][_0x546f93(0x378)]=function(_0x580621){const _0x2547f2=_0x546f93,_0x22dec7=this[_0x2547f2(0x321)](_0x580621),_0x30591d=this['itemRect'](_0x580621),_0x39398e=Window_PartyReserve[_0x2547f2(0x34e)]===0x1;_0x30591d['x']+=ImageManager['iconWidth']*(_0x39398e?0x2:0x1);const _0x4a429e=VisuMZ[_0x2547f2(0x391)][_0x2547f2(0x38b)][_0x2547f2(0x251)],_0x3f975e=_0x30591d['x']+_0x4a429e['ReserveSpriteOffsetX']+this[_0x2547f2(0x1e3)](),_0x5cbba1=_0x30591d['y']+_0x30591d['height']-_0x4a429e[_0x2547f2(0x2d7)];this[_0x2547f2(0x34f)](_0x22dec7,_0x3f975e,_0x5cbba1);},Window_PartyReserve[_0x546f93(0x22e)][_0x546f93(0x354)]=function(_0xed942f){const _0x5bcb9d=_0x546f93,_0x4914c7=this[_0x5bcb9d(0x321)](_0xed942f),_0xffba2e=_0x4914c7[_0x5bcb9d(0x351)](),_0x609c12=this['itemRect'](_0xed942f),_0x292533=Window_PartyReserve[_0x5bcb9d(0x34e)]===0x1;_0x609c12['x']+=ImageManager[_0x5bcb9d(0x226)]*(_0x292533?0x2:0x1);const _0xd0a456=VisuMZ[_0x5bcb9d(0x391)][_0x5bcb9d(0x38b)]['Window'],_0x1dae25=_0x609c12['x']+_0xd0a456['ReserveBattlerOffsetX']+this[_0x5bcb9d(0x1e3)](),_0x1351d0=_0x609c12['y']+_0x609c12[_0x5bcb9d(0x25f)]-_0xd0a456[_0x5bcb9d(0x2bd)];this[_0x5bcb9d(0x3ad)](_0xffba2e,_0x1dae25,_0x1351d0);},Window_PartyReserve[_0x546f93(0x22e)][_0x546f93(0x272)]=function(_0x5d99ee){const _0xb8e3ed=_0x546f93;this[_0xb8e3ed(0x28b)]=_0x5d99ee,this[_0xb8e3ed(0x3b5)]();},Window_PartyReserve[_0x546f93(0x22e)][_0x546f93(0x3b5)]=function(){const _0x400f1f=_0x546f93;this[_0x400f1f(0x28b)]&&this['_statusWindow']['setActor'](this['actor'](this['index']()));};function Window_PartyStatus(){this['initialize'](...arguments);}Window_PartyStatus[_0x546f93(0x22e)]=Object[_0x546f93(0x227)](Window_StatusBase[_0x546f93(0x22e)]),Window_PartyStatus[_0x546f93(0x22e)]['constructor']=Window_PartyStatus,Window_PartyStatus[_0x546f93(0x22e)][_0x546f93(0x317)]=function(_0x20b169){const _0x56749a=_0x546f93;this['_actor']=null,Window_StatusBase[_0x56749a(0x22e)][_0x56749a(0x317)][_0x56749a(0x3c5)](this,_0x20b169);},Window_PartyStatus[_0x546f93(0x22e)][_0x546f93(0x2fc)]=function(_0x375feb,_0x19825d,_0xea0c78,_0x379c43,_0x1f0bb9){const _0x2570f8=_0x546f93;if(VisuMZ[_0x2570f8(0x391)][_0x2570f8(0x38b)]['General'][_0x2570f8(0x2e4)]===![])return;_0x1f0bb9=Math[_0x2570f8(0x1d9)](_0x1f0bb9||0x1,0x1);while(_0x1f0bb9--){_0x379c43=_0x379c43||this[_0x2570f8(0x240)](),this[_0x2570f8(0x281)][_0x2570f8(0x3a4)]=0xa0;const _0x1b3e80=ColorManager['getPartySystemBackColor']();this[_0x2570f8(0x281)][_0x2570f8(0x1bf)](_0x375feb+0x1,_0x19825d+0x1,_0xea0c78-0x2,_0x379c43-0x2,_0x1b3e80),this[_0x2570f8(0x281)]['paintOpacity']=0xff;}},ColorManager[_0x546f93(0x248)]=function(){const _0x928aa1=_0x546f93,_0x22d846=VisuMZ['PartySystem'][_0x928aa1(0x38b)][_0x928aa1(0x1c6)];let _0x52ae98=_0x22d846['BackRectColor']!==undefined?_0x22d846[_0x928aa1(0x36a)]:0x13;return ColorManager['getColor'](_0x52ae98);},Window_PartyStatus[_0x546f93(0x22e)][_0x546f93(0x31e)]=function(_0x2236ee){const _0x4d1a04=_0x546f93;if(this[_0x4d1a04(0x202)]===_0x2236ee)return;this[_0x4d1a04(0x202)]=_0x2236ee;if(_0x2236ee){const _0x20736d=ImageManager['loadFace'](_0x2236ee[_0x4d1a04(0x2c2)]());_0x20736d[_0x4d1a04(0x37a)](this[_0x4d1a04(0x235)]['bind'](this));}else this[_0x4d1a04(0x235)]();},Window_PartyStatus[_0x546f93(0x22e)][_0x546f93(0x235)]=function(){const _0x317e56=_0x546f93;Window_StatusBase['prototype']['refresh'][_0x317e56(0x3c5)](this),this[_0x317e56(0x281)][_0x317e56(0x302)](),this[_0x317e56(0x1fb)](),VisuMZ[_0x317e56(0x391)][_0x317e56(0x38b)][_0x317e56(0x251)][_0x317e56(0x2ac)][_0x317e56(0x3c5)](this);},Window_PartyStatus['prototype'][_0x546f93(0x1b2)]=function(){const _0x305352=_0x546f93;if(!this[_0x305352(0x202)]){this['drawItemDarkRect'](0x0,0x0,this[_0x305352(0x3a5)],this[_0x305352(0x294)]);const _0x5a2939=Math[_0x305352(0x260)]((this[_0x305352(0x294)]-this[_0x305352(0x240)]())/0x2);this[_0x305352(0x2f3)](ColorManager[_0x305352(0x2f7)]()),this[_0x305352(0x1de)](TextManager['emptyPartyMember'],0x0,_0x5a2939,this[_0x305352(0x3a5)],_0x305352(0x211));return;}this[_0x305352(0x35a)](this[_0x305352(0x202)],0x1,0x0,ImageManager[_0x305352(0x1ff)],ImageManager[_0x305352(0x206)]),this['drawActorSimpleStatus'](this['_actor'],ImageManager[_0x305352(0x1ff)]+0x24,0x0);const _0x55b856=this[_0x305352(0x240)](),_0xdd76f0=this[_0x305352(0x2c9)](),_0x5cda23=Math[_0x305352(0x260)](this[_0x305352(0x3a5)]/0x2),_0x4dc4c8=Math[_0x305352(0x1fa)](_0xdd76f0[_0x305352(0x382)]/0x2)*_0x55b856,_0x5176a8=0x0;let _0x2ed8fe=0x0,_0x241cb5=ImageManager['faceHeight']+_0x55b856/0x2;for(const _0x55b47f of _0xdd76f0){this['drawItemDarkRect'](_0x2ed8fe,_0x241cb5,_0x5cda23,_0x55b856),this[_0x305352(0x2b8)](_0x55b47f,_0x2ed8fe,_0x241cb5,_0x5cda23),this['drawParamValue'](_0x55b47f,_0x2ed8fe,_0x241cb5,_0x5cda23),_0x2ed8fe===_0x5176a8?_0x2ed8fe+=_0x5cda23:(_0x2ed8fe=_0x5176a8,_0x241cb5+=_0x55b856);}},Window_PartyStatus[_0x546f93(0x22e)][_0x546f93(0x2c9)]=function(){const _0x27a8ed=_0x546f93;return Imported[_0x27a8ed(0x3bc)]?VisuMZ['CoreEngine']['Settings']['Param'][_0x27a8ed(0x285)]:[0x2,0x3,0x4,0x5,0x6,0x7];},Window_PartyStatus[_0x546f93(0x22e)][_0x546f93(0x2b8)]=function(_0x442bee,_0x33d8af,_0x10c8d9,_0x32030b){const _0x5b0a4c=_0x546f93,_0x4c4440=this[_0x5b0a4c(0x1e3)]();_0x32030b-=_0x4c4440*0x2;if(Imported['VisuMZ_0_CoreEngine'])this[_0x5b0a4c(0x27f)](_0x33d8af+_0x4c4440,_0x10c8d9,_0x32030b,_0x442bee,![]);else{const _0x3d166a=TextManager['param'](_0x442bee);this[_0x5b0a4c(0x2f3)](ColorManager[_0x5b0a4c(0x2f7)]()),this[_0x5b0a4c(0x1de)](_0x3d166a,_0x33d8af+_0x4c4440,_0x10c8d9,_0x32030b);}},Window_PartyStatus[_0x546f93(0x22e)]['drawParamValue']=function(_0x1d7a17,_0x606c81,_0x22e7ea,_0x1dc3c5){const _0x59dce7=_0x546f93;this[_0x59dce7(0x1fb)]();const _0x37db22=this[_0x59dce7(0x1e3)](),_0x220bf0=this['getParamValue'](_0x1d7a17);this[_0x59dce7(0x1de)](_0x220bf0,_0x606c81+_0x37db22,_0x22e7ea,_0x1dc3c5-_0x37db22*0x2,_0x59dce7(0x2bf));},Window_PartyStatus['prototype'][_0x546f93(0x270)]=function(_0x3d89ec){const _0x376d55=_0x546f93,_0x644a0=this[_0x376d55(0x202)];return Imported['VisuMZ_0_CoreEngine']?_0x644a0[_0x376d55(0x3a3)](_0x3d89ec,!![]):_0x644a0['param'](_0x3d89ec);};function Window_PartyBattleSwitch(){const _0x2d0bcb=_0x546f93;this[_0x2d0bcb(0x317)](...arguments);}Window_PartyBattleSwitch[_0x546f93(0x22e)]=Object[_0x546f93(0x227)](Window_StatusBase[_0x546f93(0x22e)]),Window_PartyBattleSwitch[_0x546f93(0x22e)][_0x546f93(0x311)]=Window_PartyBattleSwitch,Window_PartyBattleSwitch[_0x546f93(0x22e)][_0x546f93(0x317)]=function(_0x24f673){const _0x2c2839=_0x546f93;Window_StatusBase['prototype']['initialize'][_0x2c2839(0x3c5)](this,_0x24f673),this[_0x2c2839(0x28a)](VisuMZ[_0x2c2839(0x391)][_0x2c2839(0x38b)][_0x2c2839(0x251)][_0x2c2839(0x346)]),this[_0x2c2839(0x37e)]=0x0;},Window_PartyBattleSwitch['prototype'][_0x546f93(0x339)]=function(){const _0x13d1de=_0x546f93;for(const _0x56b945 of $gameParty[_0x13d1de(0x367)]()){ImageManager[_0x13d1de(0x241)](_0x56b945['faceName']());}},Window_PartyBattleSwitch[_0x546f93(0x22e)]['maxCols']=function(){return 0x1;},Window_PartyBattleSwitch[_0x546f93(0x22e)][_0x546f93(0x321)]=function(_0x579f00){const _0x1543c0=_0x546f93;return $gameParty[_0x1543c0(0x33c)]()[_0x579f00];},Window_PartyBattleSwitch[_0x546f93(0x22e)][_0x546f93(0x28e)]=function(){return this['actor'](this['index']());},Window_PartyBattleSwitch[_0x546f93(0x22e)][_0x546f93(0x26e)]=function(){const _0x2f4dc5=_0x546f93;return this[_0x2f4dc5(0x240)]()*0x2+0x8;},Window_PartyBattleSwitch['prototype'][_0x546f93(0x1d8)]=function(){const _0x6b6bd=_0x546f93;return $gameParty[_0x6b6bd(0x33c)]()[_0x6b6bd(0x382)];},Window_PartyBattleSwitch[_0x546f93(0x22e)][_0x546f93(0x31f)]=function(){const _0x39e44c=_0x546f93;Window_StatusBase[_0x39e44c(0x22e)][_0x39e44c(0x31f)][_0x39e44c(0x3c5)](this),this[_0x39e44c(0x268)](),this[_0x39e44c(0x235)](),this['smoothSelect'](0x0);},Window_PartyBattleSwitch[_0x546f93(0x22e)][_0x546f93(0x33d)]=function(){const _0x3a2777=_0x546f93;Window_StatusBase[_0x3a2777(0x22e)][_0x3a2777(0x33d)]['call'](this),this[_0x3a2777(0x2ce)]();},Window_PartyBattleSwitch[_0x546f93(0x22e)][_0x546f93(0x301)]=function(){const _0x301a31=_0x546f93;return this[_0x301a31(0x2e8)](this[_0x301a31(0x28e)]());},Window_PartyBattleSwitch[_0x546f93(0x22e)][_0x546f93(0x2e8)]=function(_0x50f325){const _0x1493e7=_0x546f93;if(!_0x50f325)return![];return _0x50f325['isFormationChangeOk']()&&_0x50f325[_0x1493e7(0x21e)]();},Window_PartyBattleSwitch[_0x546f93(0x22e)][_0x546f93(0x2f0)]=function(_0x13f6c4){const _0x324ff7=_0x546f93,_0x4015a4=this[_0x324ff7(0x321)](_0x13f6c4);if(!_0x4015a4)return;const _0x47e31b=ImageManager[_0x324ff7(0x241)](_0x4015a4['faceName']());_0x47e31b[_0x324ff7(0x37a)](this['processDrawItem'][_0x324ff7(0x2c8)](this,_0x13f6c4));},Window_PartyBattleSwitch[_0x546f93(0x22e)][_0x546f93(0x2a3)]=function(_0x58c0a2){const _0x3288f6=_0x546f93;this[_0x3288f6(0x309)](_0x58c0a2),this[_0x3288f6(0x33b)](_0x58c0a2);},Window_PartyBattleSwitch[_0x546f93(0x22e)][_0x546f93(0x309)]=function(_0x495b95){const _0x1d3b39=_0x546f93,_0x3e9ad9=this[_0x1d3b39(0x321)](_0x495b95),_0x4ea375=this['itemRect'](_0x495b95);this[_0x1d3b39(0x3c8)](this[_0x1d3b39(0x2e8)](_0x3e9ad9)),this[_0x1d3b39(0x35a)](_0x3e9ad9,_0x4ea375['x']+0x1,_0x4ea375['y']+0x1,ImageManager[_0x1d3b39(0x1ff)],_0x4ea375[_0x1d3b39(0x25f)]-0x2),this[_0x1d3b39(0x3c8)](!![]);},Window_PartyBattleSwitch['prototype']['drawItemStatus']=function(_0x5d0b98){const _0x1c3116=_0x546f93,_0x22ca77=this[_0x1c3116(0x321)](_0x5d0b98),_0x2f6a30=this[_0x1c3116(0x3b2)](_0x5d0b98),_0x2808a1=_0x2f6a30['x']+ImageManager['faceWidth']+0x24,_0x4437cb=_0x2808a1+0xb4;this[_0x1c3116(0x3c8)](this[_0x1c3116(0x2e8)](_0x22ca77)),this[_0x1c3116(0x269)](_0x22ca77,_0x2808a1,_0x2f6a30['y']),this[_0x1c3116(0x29c)](_0x22ca77,_0x2808a1,_0x2f6a30['y']+this[_0x1c3116(0x240)]()),this[_0x1c3116(0x1d0)](_0x22ca77,_0x4437cb,_0x2f6a30['y']),this[_0x1c3116(0x3c8)](!![]);};Imported[_0x546f93(0x39f)]&&(ImageManager[_0x546f93(0x22f)]=VisuMZ[_0x546f93(0x391)][_0x546f93(0x38b)][_0x546f93(0x1c6)][_0x546f93(0x3af)]??0x4b,TextManager[_0x546f93(0x32a)]=VisuMZ[_0x546f93(0x391)][_0x546f93(0x38b)]['Vocab'][_0x546f93(0x323)],TextManager['battlePartyChangeCmdHelp']=VisuMZ[_0x546f93(0x391)][_0x546f93(0x38b)][_0x546f93(0x338)][_0x546f93(0x34c)],TextManager[_0x546f93(0x386)]=VisuMZ['PartySystem'][_0x546f93(0x38b)][_0x546f93(0x338)]['BattleSwitchOut'],TextManager['battlePartySwitchCmdHelp']=VisuMZ[_0x546f93(0x391)][_0x546f93(0x38b)]['Vocab']['BattleHelpSwitch'],TextManager['ActiveTpbFormationMessage']=VisuMZ[_0x546f93(0x391)][_0x546f93(0x38b)][_0x546f93(0x338)][_0x546f93(0x33e)],VisuMZ[_0x546f93(0x391)]['SceneManager_isPreviousSceneBattleTransitionable']=SceneManager[_0x546f93(0x231)],SceneManager[_0x546f93(0x231)]=function(){const _0x1bd96a=_0x546f93;if(SceneManager[_0x1bd96a(0x26f)](Scene_Party))return!![];return VisuMZ['PartySystem'][_0x1bd96a(0x398)][_0x1bd96a(0x3c5)](this);},VisuMZ[_0x546f93(0x391)][_0x546f93(0x336)]=SceneManager[_0x546f93(0x201)],SceneManager[_0x546f93(0x201)]=function(){const _0x1be73e=_0x546f93;if(SceneManager[_0x1be73e(0x200)](Scene_Party))return!![];return VisuMZ[_0x1be73e(0x391)]['SceneManager_isNextSceneBattleTransitionable'][_0x1be73e(0x3c5)](this);},SceneManager[_0x546f93(0x1f2)]=function(){const _0x108586=_0x546f93;return this[_0x108586(0x1d5)]&&this[_0x108586(0x1d5)][_0x108586(0x311)]===Scene_Map;},VisuMZ['PartySystem'][_0x546f93(0x257)]=Scene_Battle[_0x546f93(0x22e)]['createAllWindows'],Scene_Battle[_0x546f93(0x22e)][_0x546f93(0x1e0)]=function(){const _0x460e8e=_0x546f93;VisuMZ['PartySystem'][_0x460e8e(0x257)][_0x460e8e(0x3c5)](this),this[_0x460e8e(0x2e0)](),this['postPartySwitchMenuTpb'](),this[_0x460e8e(0x3ba)]();},Scene_Battle['prototype'][_0x546f93(0x2e0)]=function(){const _0x4ae8f9=_0x546f93,_0x5ccf0f=this[_0x4ae8f9(0x3c6)]();this[_0x4ae8f9(0x1c8)]=new Window_PartyBattleSwitch(_0x5ccf0f),this['addWindow'](this[_0x4ae8f9(0x1c8)]),this[_0x4ae8f9(0x1c8)][_0x4ae8f9(0x35f)]('ok',this[_0x4ae8f9(0x347)][_0x4ae8f9(0x2c8)](this)),this[_0x4ae8f9(0x1c8)][_0x4ae8f9(0x35f)](_0x4ae8f9(0x21b),this['onPartySwitchCancel'][_0x4ae8f9(0x2c8)](this));},Scene_Battle['prototype']['partySwitchWindowRect']=function(){const _0x122ce2=_0x546f93,_0x1bca32=this[_0x122ce2(0x300)]();return _0x1bca32===_0x122ce2(0x327)?this[_0x122ce2(0x1ec)]():this[_0x122ce2(0x340)]();},Scene_Battle[_0x546f93(0x22e)]['partySwitchWindowRectStandard']=function(){const _0x59cbe0=_0x546f93;return VisuMZ['PartySystem']['Settings'][_0x59cbe0(0x251)][_0x59cbe0(0x2d4)]['call'](this);},Scene_Battle[_0x546f93(0x22e)][_0x546f93(0x1ec)]=function(){const _0x42148f=_0x546f93,_0x5920ea=this[_0x42148f(0x365)](),_0x2d5a19=$gameSystem[_0x42148f(0x23f)]()*0x2;return _0x5920ea[_0x42148f(0x2e3)]=0x204+_0x2d5a19,_0x5920ea;},VisuMZ[_0x546f93(0x391)][_0x546f93(0x1b5)]=Scene_Battle[_0x546f93(0x22e)]['isAnyInputWindowActive'],Scene_Battle[_0x546f93(0x22e)][_0x546f93(0x1eb)]=function(){const _0x3a35ca=_0x546f93;if(this[_0x3a35ca(0x1c8)]&&this[_0x3a35ca(0x1c8)][_0x3a35ca(0x292)])return!![];if(this['_partySystemSwitchOut'])return!![];if(this[_0x3a35ca(0x3c1)])return!![];if(this[_0x3a35ca(0x356)])return!![];return VisuMZ[_0x3a35ca(0x391)][_0x3a35ca(0x1b5)][_0x3a35ca(0x3c5)](this);},VisuMZ[_0x546f93(0x391)][_0x546f93(0x30d)]=Scene_Battle[_0x546f93(0x22e)][_0x546f93(0x24a)],Scene_Battle[_0x546f93(0x22e)][_0x546f93(0x24a)]=function(){const _0x2f8a61=_0x546f93;VisuMZ[_0x2f8a61(0x391)][_0x2f8a61(0x30d)][_0x2f8a61(0x3c5)](this),this[_0x2f8a61(0x36e)]['setHandler'](_0x2f8a61(0x34a),this['commandFormation'][_0x2f8a61(0x2c8)](this));},Scene_Battle[_0x546f93(0x22e)][_0x546f93(0x30c)]=function(){const _0xff9831=_0x546f93;this[_0xff9831(0x38c)]()?(this[_0xff9831(0x356)]=!![],this[_0xff9831(0x36d)][_0xff9831(0x25c)](TextManager[_0xff9831(0x35b)][_0xff9831(0x24e)](TextManager['formation']))):this[_0xff9831(0x2a5)]();},Scene_Battle[_0x546f93(0x22e)][_0x546f93(0x38c)]=function(){const _0x361cd3=_0x546f93;return BattleManager[_0x361cd3(0x32b)]();},Scene_Battle[_0x546f93(0x22e)][_0x546f93(0x2a5)]=function(){const _0x5ba368=_0x546f93;this[_0x5ba368(0x356)]=![],this['_spriteset'][_0x5ba368(0x2e5)](),this[_0x5ba368(0x2bb)][_0x5ba368(0x37d)]=![],SceneManager[_0x5ba368(0x1e9)](),SceneManager[_0x5ba368(0x1d4)](Scene_Party),$gameParty[_0x5ba368(0x213)](),BattleManager[_0x5ba368(0x2cf)]()&&(BattleManager[_0x5ba368(0x1f3)]=BattleManager[_0x5ba368(0x321)]());},VisuMZ[_0x546f93(0x391)][_0x546f93(0x242)]=Scene_Battle[_0x546f93(0x22e)][_0x546f93(0x310)],Scene_Battle[_0x546f93(0x22e)][_0x546f93(0x310)]=function(){const _0x273232=_0x546f93;VisuMZ[_0x273232(0x391)][_0x273232(0x242)]['call'](this),this[_0x273232(0x356)]&&!BattleManager['_subject']&&this[_0x273232(0x2a5)](),this[_0x273232(0x3c1)]&&!BattleManager['_subject']&&this[_0x273232(0x1b8)]();},VisuMZ[_0x546f93(0x391)][_0x546f93(0x1c3)]=Scene_Battle['prototype'][_0x546f93(0x1d2)],Scene_Battle[_0x546f93(0x22e)][_0x546f93(0x1d2)]=function(){const _0x54977d=_0x546f93;if(BattleManager[_0x54977d(0x32b)]()){if(this[_0x54977d(0x1c8)]&&this['_partyMemberSwitchWindow'][_0x54977d(0x292)])return![];}return VisuMZ[_0x54977d(0x391)]['Scene_Battle_isTimeActive']['call'](this);},VisuMZ[_0x546f93(0x391)][_0x546f93(0x3bf)]=Scene_Battle[_0x546f93(0x22e)][_0x546f93(0x29e)],Scene_Battle[_0x546f93(0x22e)][_0x546f93(0x29e)]=function(){const _0x570a82=_0x546f93;VisuMZ[_0x570a82(0x391)][_0x570a82(0x3bf)]['call'](this),this['_actorCommandWindow']['setHandler'](_0x570a82(0x34a),this[_0x570a82(0x377)][_0x570a82(0x2c8)](this));},Scene_Battle['prototype'][_0x546f93(0x377)]=function(){const _0x73040f=_0x546f93;this['isQueueFormationMenu']()?(this[_0x73040f(0x3c1)]=!![],this[_0x73040f(0x36d)]['addText'](TextManager[_0x73040f(0x35b)][_0x73040f(0x24e)](TextManager[_0x73040f(0x34a)]))):this[_0x73040f(0x1b8)]();},Scene_Battle['prototype'][_0x546f93(0x1b8)]=function(){const _0x425cbc=_0x546f93;this[_0x425cbc(0x3c1)]=![],this[_0x425cbc(0x36d)][_0x425cbc(0x302)](),BattleManager[_0x425cbc(0x321)]()&&this[_0x425cbc(0x1c8)][_0x425cbc(0x31f)]();},Scene_Battle[_0x546f93(0x22e)][_0x546f93(0x347)]=function(){const _0x53b40d=_0x546f93,_0x26fb88=this[_0x53b40d(0x1c8)][_0x53b40d(0x28e)]();_0x26fb88?this[_0x53b40d(0x229)](_0x26fb88):(this[_0x53b40d(0x1c8)][_0x53b40d(0x33d)](),this[_0x53b40d(0x255)][_0x53b40d(0x31f)]());},Scene_Battle['prototype']['preparePartySwitchMember']=function(_0x1b7019){const _0x511b8b=_0x546f93,_0x2c5a5b=BattleManager[_0x511b8b(0x321)](),_0x107d63=_0x2c5a5b[_0x511b8b(0x2b2)]();this['_partyMemberSwitchWindow'][_0x511b8b(0x33d)](),this[_0x511b8b(0x33a)]()&&_0x107d63?(this['_partySystemSwitchOut']=!![],_0x107d63[_0x511b8b(0x3a6)](_0x1b7019)):this['processPartySwitchMember'](_0x1b7019);},Scene_Battle['prototype'][_0x546f93(0x33a)]=function(){const _0x38647d=_0x546f93;return VisuMZ[_0x38647d(0x391)][_0x38647d(0x38b)][_0x38647d(0x1c6)][_0x38647d(0x371)];},Scene_Battle[_0x546f93(0x22e)][_0x546f93(0x370)]=function(_0x5a569a){const _0x34d4f2=_0x546f93;this[_0x34d4f2(0x29b)]=![];const _0x5d6431=BattleManager[_0x34d4f2(0x321)](),_0x145d54=_0x5d6431[_0x34d4f2(0x2b2)](),_0x40b9be=$gameParty[_0x34d4f2(0x224)][_0x34d4f2(0x303)](_0x5d6431[_0x34d4f2(0x212)]());$gameParty['_battleMembers'][_0x40b9be]=_0x5a569a['actorId'](),$gameParty[_0x34d4f2(0x238)]();if(this[_0x34d4f2(0x2f2)]())_0x5a569a['_tpbChargeTime']=_0x5d6431['_tpbChargeTime'],_0x5a569a['_tpbState']=_0x34d4f2(0x287);else BattleManager[_0x34d4f2(0x2cf)]()&&_0x5a569a[_0x34d4f2(0x1fe)]();BattleManager[_0x34d4f2(0x1da)]=_0x5a569a,BattleManager[_0x34d4f2(0x30a)](_0x5d6431,_0x5a569a),_0x5a569a[_0x34d4f2(0x213)](),_0x5a569a[_0x34d4f2(0x216)](),_0x5a569a[_0x34d4f2(0x390)](_0x5d6431),_0x145d54&&_0x145d54[_0x34d4f2(0x3c3)](_0x5a569a),this[_0x34d4f2(0x28b)][_0x34d4f2(0x299)](_0x5d6431,_0x5a569a),this[_0x34d4f2(0x28b)][_0x34d4f2(0x235)](),this[_0x34d4f2(0x255)][_0x34d4f2(0x36f)](_0x5a569a),this[_0x34d4f2(0x255)][_0x34d4f2(0x259)](0x0),this[_0x34d4f2(0x255)][_0x34d4f2(0x31f)](),this[_0x34d4f2(0x255)]['_debug']=!![];},Scene_Battle[_0x546f93(0x22e)][_0x546f93(0x2f2)]=function(){const _0x4961fd=_0x546f93;if(!BattleManager[_0x4961fd(0x2cf)]())return![];const _0x78f809=VisuMZ[_0x4961fd(0x391)][_0x4961fd(0x38b)]['General'];return _0x78f809[_0x4961fd(0x271)]===undefined&&(_0x78f809[_0x4961fd(0x271)]=!![]),_0x78f809[_0x4961fd(0x271)];},Window_StatusBase['prototype'][_0x546f93(0x299)]=function(_0x59895c,_0x306858){const _0x3ea0ac=_0x546f93,_0x2838ea=_0x3ea0ac(0x2dc)[_0x3ea0ac(0x24e)](_0x59895c[_0x3ea0ac(0x212)]()),_0x589b6d=this[_0x3ea0ac(0x361)](_0x2838ea,Sprite_StateIcon);_0x589b6d[_0x3ea0ac(0x36f)](_0x306858);},Scene_Battle['prototype'][_0x546f93(0x1ce)]=function(){const _0x50102b=_0x546f93;this['_partyMemberSwitchWindow'][_0x50102b(0x33d)](),this['_actorCommandWindow'][_0x50102b(0x31f)](),this['_actorCommandWindow'][_0x50102b(0x235)]();},Scene_Battle['prototype'][_0x546f93(0x369)]=function(){const _0x3b2d61=_0x546f93;if(!BattleManager['isTpb']())return;if(!SceneManager['isPreviousScene'](Scene_Party))return;this['_partyCommandWindow'][_0x3b2d61(0x33d)](),this[_0x3b2d61(0x36e)]['close'](),this[_0x3b2d61(0x255)][_0x3b2d61(0x33d)](),this['_actorCommandWindow'][_0x3b2d61(0x2ce)](),BattleManager[_0x3b2d61(0x1da)]=null,BattleManager[_0x3b2d61(0x35d)]=![];},Scene_Battle[_0x546f93(0x22e)]['postPartySwitchMenuTurnBased']=function(){const _0x25cea9=_0x546f93;if(BattleManager['isTpb']())return;if(!SceneManager[_0x25cea9(0x26f)](Scene_Party))return;Imported['VisuMZ_2_BattleSystemBTB']&&BattleManager[_0x25cea9(0x337)]()&&BattleManager[_0x25cea9(0x39e)](),Imported[_0x25cea9(0x258)]&&BattleManager[_0x25cea9(0x334)]()&&(BattleManager[_0x25cea9(0x39e)](),BattleManager[_0x25cea9(0x1da)]=$gameParty[_0x25cea9(0x245)](),BattleManager[_0x25cea9(0x1ed)]=BattleManager[_0x25cea9(0x321)](),BattleManager['_inputting']=!![],this[_0x25cea9(0x255)][_0x25cea9(0x36f)](BattleManager[_0x25cea9(0x321)]()),this[_0x25cea9(0x28b)][_0x25cea9(0x1cf)](BattleManager[_0x25cea9(0x321)]())),Imported[_0x25cea9(0x27c)]&&BattleManager[_0x25cea9(0x2f4)]()&&(BattleManager[_0x25cea9(0x39e)](),BattleManager[_0x25cea9(0x1da)]=$gameParty['teamBasedFirstAvailableMember'](),BattleManager[_0x25cea9(0x1ed)]=BattleManager[_0x25cea9(0x321)](),BattleManager[_0x25cea9(0x35d)]=!![],this[_0x25cea9(0x255)][_0x25cea9(0x36f)](BattleManager['actor']()),this[_0x25cea9(0x28b)][_0x25cea9(0x1cf)](BattleManager[_0x25cea9(0x321)]())),Imported[_0x25cea9(0x1ba)]&&BattleManager[_0x25cea9(0x394)]()&&(BattleManager[_0x25cea9(0x39e)](),BattleManager[_0x25cea9(0x1da)]=$gameParty['teamBasedFirstAvailableMember'](),BattleManager[_0x25cea9(0x1ed)]=BattleManager[_0x25cea9(0x321)](),BattleManager[_0x25cea9(0x35d)]=!![],this[_0x25cea9(0x255)][_0x25cea9(0x36f)](BattleManager[_0x25cea9(0x321)]()),this[_0x25cea9(0x28b)][_0x25cea9(0x1cf)](BattleManager['actor']()));},Game_Party[_0x546f93(0x22e)][_0x546f93(0x245)]=function(){let _0x3e2b6d=this['battleMembers']();return _0x3e2b6d[0x0];},Sprite_Actor['_partySwitchDuration']=0xc,Sprite_Actor[_0x546f93(0x22e)][_0x546f93(0x3a6)]=function(_0xf074d0){const _0x1e664e=_0x546f93;this[_0x1e664e(0x2a9)]=_0xf074d0;const _0x298cda=Sprite_Actor[_0x1e664e(0x23b)];this['startMove'](0x12c,0x0,_0x298cda),this['startOpacity'](0x0,_0x298cda),this[_0x1e664e(0x23b)]=_0x298cda;},Sprite_Actor[_0x546f93(0x22e)][_0x546f93(0x291)]=function(_0x21dcc7){const _0x42eb51=_0x546f93;if(SceneManager[_0x42eb51(0x2de)]()){SceneManager[_0x42eb51(0x1d5)][_0x42eb51(0x370)](_0x21dcc7);const _0x27ea0d=Sprite_Actor[_0x42eb51(0x23b)];this[_0x42eb51(0x374)](),this[_0x42eb51(0x1be)](0xff,_0x27ea0d);}this[_0x42eb51(0x2a9)]=null;},VisuMZ['PartySystem'][_0x546f93(0x1e2)]=Sprite_Actor[_0x546f93(0x22e)][_0x546f93(0x2e5)],Sprite_Actor[_0x546f93(0x22e)][_0x546f93(0x2e5)]=function(){const _0x4eac74=_0x546f93;VisuMZ[_0x4eac74(0x391)][_0x4eac74(0x1e2)]['call'](this);if(this[_0x4eac74(0x23b)])this['updatePartySwitch']();},Sprite_Actor[_0x546f93(0x22e)][_0x546f93(0x37b)]=function(){const _0x81d79d=_0x546f93;this[_0x81d79d(0x23b)]=this[_0x81d79d(0x23b)]||0x0,this[_0x81d79d(0x23b)]--,this[_0x81d79d(0x23b)]<=0x0&&this['startSwitchInAnimation'](this[_0x81d79d(0x2a9)]);},Window_PartyCommand['prototype'][_0x546f93(0x387)]=function(){const _0x30ad62=_0x546f93;this[_0x30ad62(0x39c)]();},Window_PartyCommand[_0x546f93(0x22e)][_0x546f93(0x39c)]=function(){const _0x1c9e43=_0x546f93;if(!this[_0x1c9e43(0x2b0)]())return;if(this[_0x1c9e43(0x2ee)]()){$gameTemp[_0x1c9e43(0x2cd)]()&&!BattleManager[_0x1c9e43(0x1f7)]&&(console[_0x1c9e43(0x247)]('WARNING:\x20Party\x20Change\x20command\x20is\x20unavailable\x20for\x20Window_PartyCommand\x20for\x20this\x20Battle\x20System'),BattleManager[_0x1c9e43(0x1f7)]=!![]);return;}const _0x5c0b33=this[_0x1c9e43(0x385)](),_0x478dc3=ImageManager[_0x1c9e43(0x22f)],_0xad5392=_0x5c0b33===_0x1c9e43(0x30f)?TextManager[_0x1c9e43(0x32a)]:_0x1c9e43(0x1db)['format'](_0x478dc3,TextManager[_0x1c9e43(0x32a)]),_0x4b2c11=this[_0x1c9e43(0x389)]();this[_0x1c9e43(0x32d)](_0xad5392,_0x1c9e43(0x34a),_0x4b2c11);},Window_PartyCommand[_0x546f93(0x22e)][_0x546f93(0x2b0)]=function(){const _0x580626=_0x546f93;if(Imported[_0x580626(0x3a1)]&&BattleManager[_0x580626(0x26c)]())return![];if(Imported['VisuMZ_2_BattleSystemSTB']&&BattleManager[_0x580626(0x30b)]())return![];if(Imported[_0x580626(0x372)]&&BattleManager[_0x580626(0x2df)]())return![];return VisuMZ[_0x580626(0x391)][_0x580626(0x38b)][_0x580626(0x1c6)][_0x580626(0x28f)];},Window_PartyCommand[_0x546f93(0x22e)]['hasBattleSystemIncompatibilities']=function(){return![];},Window_PartyCommand['prototype'][_0x546f93(0x389)]=function(){const _0x39852c=_0x546f93;if($gameParty[_0x39852c(0x367)]()[_0x39852c(0x382)]<=0x1)return![];if(!$gameParty[_0x39852c(0x26b)]())return![];return $gameSystem[_0x39852c(0x2da)]();},VisuMZ[_0x546f93(0x391)][_0x546f93(0x38b)]['Window_PartyCommand_updateHelp']=Window_PartyCommand[_0x546f93(0x22e)][_0x546f93(0x261)],Window_PartyCommand['prototype'][_0x546f93(0x261)]=function(){const _0x3513c0=_0x546f93,_0x1d2446=this['currentSymbol']();switch(_0x1d2446){case _0x3513c0(0x34a):this['_helpWindow'][_0x3513c0(0x2f1)](TextManager[_0x3513c0(0x31d)]);break;default:VisuMZ[_0x3513c0(0x391)][_0x3513c0(0x38b)][_0x3513c0(0x32e)][_0x3513c0(0x3c5)](this);break;}},Window_ActorCommand[_0x546f93(0x22e)]['addPartyCommand']=function(){const _0x352067=_0x546f93;if(!this[_0x352067(0x2b6)]())return;this['findSymbol'](_0x352067(0x34a))>=0x0&&this[_0x352067(0x3b0)]();const _0x441b3b=this[_0x352067(0x385)](),_0x47bd90=ImageManager[_0x352067(0x22f)],_0x4cea47=_0x441b3b===_0x352067(0x30f)?TextManager[_0x352067(0x386)]:_0x352067(0x1db)[_0x352067(0x24e)](_0x47bd90,TextManager[_0x352067(0x32a)]),_0x39882f=this[_0x352067(0x318)]();this[_0x352067(0x32d)](_0x4cea47,_0x352067(0x34a),_0x39882f);},Window_ActorCommand[_0x546f93(0x22e)][_0x546f93(0x2b6)]=function(){const _0x2b559c=_0x546f93;if(!this[_0x2b559c(0x202)])return![];return VisuMZ['PartySystem'][_0x2b559c(0x38b)][_0x2b559c(0x1c6)][_0x2b559c(0x319)];},Window_ActorCommand[_0x546f93(0x22e)]['isPartyCommandEnabled']=function(){const _0x3804ff=_0x546f93;if($gameParty[_0x3804ff(0x367)]()['length']<=0x1)return![];if(!this[_0x3804ff(0x202)])return![];if(!this[_0x3804ff(0x202)][_0x3804ff(0x26b)]())return![];return this[_0x3804ff(0x202)][_0x3804ff(0x314)]();},VisuMZ[_0x546f93(0x391)][_0x546f93(0x38b)][_0x546f93(0x205)]=Window_ActorCommand[_0x546f93(0x22e)][_0x546f93(0x261)],Window_ActorCommand[_0x546f93(0x22e)][_0x546f93(0x261)]=function(){const _0x2e882a=_0x546f93,_0x5e3601=this[_0x2e882a(0x1b1)]();if(!_0x5e3601)return;switch(_0x5e3601[_0x2e882a(0x1e8)]()){case _0x2e882a(0x34a):this['_helpWindow'][_0x2e882a(0x2f1)](TextManager[_0x2e882a(0x1c9)]);break;default:VisuMZ[_0x2e882a(0x391)][_0x2e882a(0x38b)][_0x2e882a(0x205)][_0x2e882a(0x3c5)](this);break;}},Window_ActorCommand[_0x546f93(0x22e)]['removePartyCommand']=function(){const _0x208c3a=_0x546f93;while(this[_0x208c3a(0x2e7)](_0x208c3a(0x34a))>=0x0){const _0x3540d3=this[_0x208c3a(0x2e7)](_0x208c3a(0x34a));this['_list']['splice'](_0x3540d3,0x1);}});;