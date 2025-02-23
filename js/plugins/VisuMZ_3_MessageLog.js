//=============================================================================
// VisuStella MZ - Message Log
// VisuMZ_3_MessageLog.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_MessageLog = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageLog = VisuMZ.MessageLog || {};
VisuMZ.MessageLog.version = 1.03;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.03] [MessageLog]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Log_VisuStella_MZ
 * @base VisuMZ_1_MessageCore
 * @orderAfter VisuMZ_1_MessageCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Log plugin will take and record any Show Message entries played
 * on the map screen so that players can go back to them and review them at a
 * later point in time when needed. This is helpful for players who may have
 * missed important information that would have been displayed or those who
 * would like to review what was said previously. The Message Log will not
 * record any of the text displayed in the battle scene in order to preserve
 * the data to one specific scene.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Record messages written out in the "Show Text" command while the player is
 *   on the map screen.
 * * Players can access the Message Log through either the Main Menu or by a
 *   shortcut key whenever the Message Window is open.
 * * Faces and speaker names will also be recorded.
 * * Choice List selections, Number Inputs, and selected Event Items will also
 *   be recorded.
 * * Those using the Extended Message Functionality plugin can also bind this
 *   effect to the Button Console.
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
 * * VisuMZ_1_MessageCore
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
 * Replaced Message Text Codes
 * 
 * Some text codes are not compatible with the Message Log when viewed such as
 * wait commands, showing the gold window, etc. When that happens, those text
 * codes will be removed from visibility in the Message Log in order to prevent
 * any problems. The following is a list of the Message Text Codes that will
 * not appear in the Message Log:
 * 
 *   --------------------
 *   Default RPG Maker MZ
 *   --------------------
 *   \$
 *   \.
 *   \|
 *   \!
 *   \>
 *   \<
 *   \^
 * 
 *   --------------------
 *   VisuMZ_1_MessageCore
 *   --------------------
 *   \Picture<x>
 *   \CenterPicture<x>
 *   \CommonEvent[x]
 *   \Wait[x]
 *   \NormalBG
 *   \DimBG
 *   \TransparentBG
 *   \WindowMoveTo: ?>
 *   \WindowMoveBy: ?>
 *   \WindowReset
 *   \TroopMember[x]
 *   \TroopNameMember[x]
 *   \ChangeFace<?>
 *   \FaceIndex[x]
 *   <Auto>
 *   <Auto Width>
 *   <Auto Height>
 *   <Auto Actor: x>
 *   <Auto Party: x>
 *   <Auto Enemy: x>
 *   <Auto Event: x>
 *   <Auto Player>
 *   <Show>
 *   <Show Switch: x>
 *   <Show All Switches: x,x,x>
 *   <Show Any Switches: x,x,x>
 *   <Hide>
 *   <Hide Switch: x>
 *   <Hide All Switches: x,x,x>
 *   <Hide Any Switches: x,x,x>
 *   <Enable>
 *   <Enable Switch: x>
 *   <Enable All Switches: x,x,x>
 *   <Enable Any Switches: x,x,x>
 *   <Disable>
 *   <Disable Switch: x>
 *   <Disable All Switches: x,x,x>
 *   <Disable Any Switches: x,x,x>
 *   <Position: ?>
 *   <Coordinates: ?>
 *   <Dimensions: ?>
 * 
 *   -----------------------
 *   VisuMZ_2_ExtMessageFunc
 *   -----------------------
 *   <Hide Buttons>
 * 
 *   -----------------------
 *   VisuMZ_2_PictureChoices
 *   -----------------------
 *   <Bind Picture: id>
 *   <Hide Choice Window>
 * 
 *   ----------------------
 *   VisuMZ_3_ChoiceCmnEvts
 *   ----------------------
 *   <Choice Common Event: id>
 * 
 *   -------------------
 *   VisuMZ_3_MessageLog
 *   -------------------
 *   <Bypass Message Log>
 * 
 *   ----------------------
 *   VisuMZ_3_MessageSounds
 *   ----------------------
 *   <Letter Sound On>
 *   <Letter Sound Off>
 *   \LetterSoundName<filename>
 *   \LetterSoundVolume[x]
 *   \LetterSoundPitch[x]
 *   \LetterSoundPan[x]
 *   \LetterSoundVolumeVar[x]
 *   \LetterSoundPitchVar[x]
 *   \LetterSoundPanVar[x]
 *   \LSON
 *   \LSOFF
 *   \LSN<filename>
 *   \LSV[x]
 *   \LSPI[x]
 *   \LSPA[x]
 *   \LSVV[x]
 *   \LSPIV[x]
 *   \LSPAV[x]
 * 
 *   ------------------------
 *   VisuMZ_4_EventTitleScene
 *   ------------------------
 *   <Continue>
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
 * VisuMZ_2_ExtMessageFunc
 * 
 * The Extended Message Functionality plugin enables the "Log" button found in
 * the Button Console to let the player go and review the text that has been
 * displayed in the map scene. This does not include the text found in battle
 * to avoid conflicting logged messages across different situations.
 * 
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. 
 *
 * === Type-Related Text Codes ===
 * 
 * ---
 *
 * --------------------   -----------------------------------------------------
 * Text Code              Effect
 * --------------------   -----------------------------------------------------
 * 
 * <Bypass Message Log>   Prevents the specific "Show Text" window from being
 *                        recorded into the Message Log.
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
 * === Bypass Plugin Commands ===
 * 
 * ---
 *
 * Bypass: Message Logging?
 * - Bypass message logging until turned off.
 *
 *   Bypass?:
 *   - Bypasses Message Logging until turned off.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Enable Message Log in Menu?
 * - Enables/disables Message Log menu inside the main menu.
 *
 *   Enable/Disable?:
 *   - Enables/disables Message Log menu inside the main menu.
 *
 * ---
 *
 * System: Show Message Log in Menu?
 * - Shows/hides Message Log menu inside the main menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Message Log menu inside the main menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General Settings for the Message Log.
 *
 * ---
 *
 * Settings
 * 
 *   Entry Limit:
 *   - How many message entries will be stored before the game will start
 *     trimming them?
 * 
 *   Shortcut Key:
 *   - This is the key used for opening the Message Log scene.
 *   - Does not work in battle!
 * 
 *   Show Faces?
 *   - Show face graphics in the Message Log?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Main Menu Settings
 * ============================================================================
 *
 * Main Menu settings for Message Log.
 *
 * ---
 *
 * Settings
 * 
 *   Command Name:
 *   - Name of the 'Message Log' option in the Main Menu.
 * 
 *   Show in Main Menu?:
 *   - Add the 'Message Log' option to the Main Menu by default?
 * 
 *   Enable in Main Menu?:
 *   - Enable the 'Message Log' option to the Main Menu by default?
 *   - This will be automatically disabled if there are no entries available.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_MessageLog.
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
 * Plugin Parameters: Vocabulary Settings
 * ============================================================================
 *
 * These settings let you adjust the text displayed for this plugin.
 *
 * ---
 *
 * ExtMessageFunc
 * 
 *   Button Name:
 *   - How is this option's text displayed in-game?
 *   - Requires VisuMZ_2_ExtMessageFunc!
 *
 * ---
 *
 * Button Assist Window
 * 
 *   Slow Scroll:
 *   - Text used for slow scrolling.
 * 
 *   Fast Scroll:
 *   - Text used for fast scrolling.
 *
 * ---
 *
 * Choice Window Logging
 * 
 *   Text Format:
 *   - Text format for logging the selected choice text.
 *   - %1 - Selected Choice Text
 * 
 *   Cancel:
 *   - Text used when cancel branch is selected.
 *
 * ---
 *
 * Number Input Logging
 * 
 *   Text Format:
 *   - Text format for logging the inputted number value.
 *   - %1 - Number Value
 *
 * ---
 *
 * Event Item Logging
 * 
 *   Text Format:
 *   - Text format for logging the selected event Item.
 *   - %1 - Selected Event Item Text
 * 
 *   Name Format:
 *   - Text format for how item names are displayed.
 *   - %1 - Item Icon, %2 - Item Name
 * 
 *   No Item:
 *   - Text used when no item is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Window settings for Scene_MessageLog.
 *
 * ---
 *
 * Message Log Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Appearance
 * 
 *   Speaker Name X:
 *   - What X coordinate do you want the speaker name to appear at?
 *
 * ---
 *
 * Color Lock
 * 
 *   Choices:
 *   - Color lock the logged choices?
 * 
 *   Number Inputs:
 *   - Color lock the logged Number Inputs?
 * 
 *   Event Item:
 *   - Color lock the logged selected Event Item?
 *
 * ---
 *
 * Scrolling > Slow
 * 
 *   Scroll Speed:
 *   - What speed will Up/Down scroll the window at?
 *   - Lower is slower. Higher is faster.
 * 
 *   Sound Frequency:
 *   - How frequent will Up/Down scrolling make sounds?
 *   - Lower is quicker. Higher is later.
 *
 * ---
 *
 * Scrolling > Fast
 * 
 *   Scroll Speed:
 *   - What speed will PageUp/PageDn scroll the window at?
 *   - Lower is slower. Higher is faster.
 * 
 *   Sound Frequency:
 *   - How frequent will PageUp/PageDn scrolling make sounds?
 *   - Lower is quicker. Higher is later.
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
 * * Irina
 * * Trihan
 * * Arisu
 * * Olivia
 * * Yanfly
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.03: October 7, 2021
 * * Bug Fixes!
 * ** Message Log should now work with automatic word wrap. Fix by Irina.
 * 
 * Version 1.02: September 3, 2021
 * * Bug Fixes!
 * ** Fixed a crash pertaining to specific message windows that haven't
 *    declared a speaker name from an older RPG Maker version. Fix by Irina.
 * 
 * Version 1.01: August 6, 2021
 * * Documentation Update!
 * ** Plugin URL now updated to most recent one.
 *
 * Version 1.00 Official Release Date: August 4, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BypassMessageLogging
 * @text Bypass: Message Logging?
 * @desc Bypass message logging until turned off.
 *
 * @arg Bypass:eval
 * @text Bypass?
 * @type boolean
 * @on Bypass
 * @off Enable
 * @desc Bypasses Message Logging until turned off.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableMessageLogMenu
 * @text System: Enable Message Log in Menu?
 * @desc Enables/disables Message Log menu inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables Message Log menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowMessageLogMenu
 * @text System: Show Message Log in Menu?
 * @desc Shows/hides Message Log menu inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Message Log menu inside the main menu.
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
 * @param MessageLog
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
 * @desc General Settings for the Message Log.
 * @default {"EntryLimit:num":"50","ShortcutKey:str":"pageup","ShowFaces:eval":"true"}
 *
 * @param MainMenu:struct
 * @text Main Menu Settings
 * @type struct<MainMenu>
 * @desc Main Menu settings for Message Log.
 * @default {"Name:str":"Message Log","ShowMainMenu:eval":"true","EnableMainMenu:eval":"true"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_MessageLog.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Vocab:struct
 * @text Vocabulary Settings
 * @type struct<Vocab>
 * @desc These settings let you adjust the text displayed for this plugin.
 * @default {"ExtMessageFunc":"","ButtonName:str":"LOG","ButtonAssist":"","SlowScroll:str":"Scroll","FastScroll:str":"Fast Scroll","ChoiceLogging":"","ChoiceFmt:str":"\\C[4]Choice >\\C[0] %1","ChoiceCancel:str":"Cancel","NumberLogging":"","NumberFmt:str":"\\C[4]Amount >\\C[0] %1","EventItemLogging":"","ItemFmt:str":"\\C[4]Choice >\\C[0] %1","ItemNameFmt:str":"%1%2","NoItem:str":"Nothing"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Window settings for Scene_MessageLog.
 * @default {"MessageLogWindow":"","MessageLogMenu_BgType:num":"0","MessageLogMenu_RectJS:func":"\"const wx = 0;\\nconst wy = this.mainAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.mainAreaHeight();\\n\\nreturn new Rectangle(wx, wy, ww, wh);\"","Appearance":"","SpeakerNameX:num":"128","ColorLock":"","ColorLockChoice:eval":"false","ColorLockNumber:eval":"true","ColorLockItem:eval":"true","Scrolling":"","Slow":"","SlowScrollSpeed:num":"8","SlowSoundFreq:num":"8","Fast":"","FastScrollSpeed:num":"32","FastSoundFreq:num":"4"}
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
 * @param EntryLimit:num
 * @text Entry Limit
 * @parent General
 * @type Number
 * @min 1
 * @max 999
 * @desc How many message entries will be stored before the game
 * will start trimming them?
 * @default 50
 *
 * @param ShortcutKey:str
 * @text Shortcut Key
 * @parent General
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for opening the Message Log scene.
 * Does not work in battle!
 * @default pageup
 *
 * @param ShowFaces:eval
 * @text Show Faces?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show face graphics in the Message Log?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * MainMenu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param Name:str
 * @text Command Name
 * @parent Options
 * @desc Name of the 'Message Log' option in the Main Menu.
 * @default Message Log
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Message Log' option to the Main Menu by default?
 * @default true
 *
 * @param EnableMainMenu:eval
 * @text Enable in Main Menu?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the 'Message Log' option to the Main Menu by default?
 * @default true
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
 * @require 1
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @require 1
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Vocabulary Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Vocab:
 * 
 * @param ExtMessageFunc
 *
 * @param ButtonName:str
 * @text Button Name
 * @parent ExtMessageFunc
 * @desc How is this option's text displayed in-game?
 * Requires VisuMZ_2_ExtMessageFunc!
 * @default LOG
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param SlowScroll:str
 * @text Slow Scroll
 * @parent ButtonAssist
 * @desc Text used for slow scrolling.
 * @default Scroll
 *
 * @param FastScroll:str
 * @text Fast Scroll
 * @parent ButtonAssist
 * @desc Text used for fast scrolling.
 * @default Fast Scroll
 *
 * @param ChoiceLogging
 * @text Choice Window Logging
 *
 * @param ChoiceFmt:str
 * @text Text Format
 * @parent ChoiceLogging
 * @desc Text format for logging the selected choice text.
 * %1 - Selected Choice Text
 * @default \C[4]Choice >\C[0] %1
 *
 * @param ChoiceCancel:str
 * @text Cancel
 * @parent ChoiceLogging
 * @desc Text used when cancel branch is selected.
 * @default Cancel
 *
 * @param NumberLogging
 * @text Number Input Logging
 *
 * @param NumberFmt:str
 * @text Text Format
 * @parent NumberLogging
 * @desc Text format for logging the inputted number value.
 * %1 - Number Value
 * @default \C[4]Amount >\C[0] %1
 *
 * @param EventItemLogging
 * @text Event Item Logging
 *
 * @param ItemFmt:str
 * @text Text Format
 * @parent EventItemLogging
 * @desc Text format for logging the selected event Item.
 * %1 - Selected Event Item Text
 * @default \C[4]Choice >\C[0] %1
 *
 * @param ItemNameFmt:str
 * @text Name Format
 * @parent EventItemLogging
 * @desc Text format for how item names are displayed.
 * %1 - Item Icon, %2 - Item Name
 * @default %1%2
 *
 * @param NoItem:str
 * @text No Item
 * @parent EventItemLogging
 * @desc Text used when no item is selected.
 * @default Nothing
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 * 
 * @param MessageLogWindow
 * @text Message Log Window
 *
 * @param MessageLogMenu_BgType:num
 * @text Background Type
 * @parent MessageLogWindow
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
 * @param MessageLogMenu_RectJS:func
 * @text JS: X, Y, W, H
 * @parent MessageLogWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.mainAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.mainAreaHeight();\n\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param Appearance
 *
 * @param SpeakerNameX:num
 * @text Speaker Name X
 * @parent Appearance
 * @type Number
 * @min 0
 * @desc What X coordinate do you want the speaker name to appear at?
 * @default 128
 *
 * @param ColorLock
 * @text Color Lock
 *
 * @param ColorLockChoice:eval
 * @text Choices
 * @parent ColorLock
 * @type boolean
 * @on Color Lock
 * @off Don't Color Lock
 * @desc Color lock the logged choices?
 * @default false
 *
 * @param ColorLockNumber:eval
 * @text Number Inputs
 * @parent ColorLock
 * @type boolean
 * @on Color Lock
 * @off Don't Color Lock
 * @desc Color lock the logged Number Inputs?
 * @default true
 *
 * @param ColorLockItem:eval
 * @text Event Item
 * @parent ColorLock
 * @type boolean
 * @on Color Lock
 * @off Don't Color Lock
 * @desc Color lock the logged selected Event Item?
 * @default true
 *
 * @param Scrolling
 *
 * @param Slow
 * @parent Scrolling
 *
 * @param SlowScrollSpeed:num
 * @text Scroll Speed
 * @parent Slow
 * @type Number
 * @min 1
 * @desc What speed will Up/Down scroll the window at?
 * Lower is slower. Higher is faster.
 * @default 8
 *
 * @param SlowSoundFreq:num
 * @text Sound Frequency
 * @parent Slow
 * @type Number
 * @min 1
 * @desc How frequent will Up/Down scrolling make sounds?
 * Lower is quicker. Higher is later.
 * @default 8
 *
 * @param Fast
 * @parent Scrolling
 *
 * @param FastScrollSpeed:num
 * @text Scroll Speed
 * @parent Fast
 * @type Number
 * @min 1
 * @desc What speed will PageUp/PageDn scroll the window at?
 * Lower is slower. Higher is faster.
 * @default 32
 *
 * @param FastSoundFreq:num
 * @text Sound Frequency
 * @parent Fast
 * @type Number
 * @min 1
 * @desc How frequent will PageUp/PageDn scrolling make sounds?
 * Lower is quicker. Higher is later.
 * @default 4
 *
 */
//=============================================================================

const _0x1fc8d3=_0x23dd;(function(_0x504043,_0x3afd78){const _0x5e028a=_0x23dd,_0x5e9968=_0x504043();while(!![]){try{const _0x4b21e2=-parseInt(_0x5e028a(0x1cf))/0x1+-parseInt(_0x5e028a(0x1c7))/0x2+-parseInt(_0x5e028a(0x183))/0x3*(parseInt(_0x5e028a(0x1dc))/0x4)+-parseInt(_0x5e028a(0x1f3))/0x5+-parseInt(_0x5e028a(0x1e8))/0x6*(parseInt(_0x5e028a(0x253))/0x7)+-parseInt(_0x5e028a(0x201))/0x8*(parseInt(_0x5e028a(0x1dd))/0x9)+-parseInt(_0x5e028a(0x249))/0xa*(-parseInt(_0x5e028a(0x193))/0xb);if(_0x4b21e2===_0x3afd78)break;else _0x5e9968['push'](_0x5e9968['shift']());}catch(_0x231618){_0x5e9968['push'](_0x5e9968['shift']());}}}(_0x36ac,0xeb90e));var label=_0x1fc8d3(0x17b),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x1fc8d3(0x194)](function(_0x231aca){const _0x53c828=_0x1fc8d3;return _0x231aca[_0x53c828(0x256)]&&_0x231aca[_0x53c828(0x261)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x1fc8d3(0x23a)]=VisuMZ[label][_0x1fc8d3(0x23a)]||{},VisuMZ[_0x1fc8d3(0x196)]=function(_0x4b3aab,_0x58b8f0){const _0x23b449=_0x1fc8d3;for(const _0x5a457d in _0x58b8f0){if(_0x5a457d['match'](/(.*):(.*)/i)){if(_0x23b449(0x147)!==_0x23b449(0x19e)){const _0x3401f0=String(RegExp['$1']),_0x22a64e=String(RegExp['$2'])[_0x23b449(0x1ae)]()[_0x23b449(0x1b8)]();let _0x2122c5,_0x519fad,_0x3db494;switch(_0x22a64e){case _0x23b449(0x24c):_0x2122c5=_0x58b8f0[_0x5a457d]!==''?Number(_0x58b8f0[_0x5a457d]):0x0;break;case _0x23b449(0x15d):_0x519fad=_0x58b8f0[_0x5a457d]!==''?JSON[_0x23b449(0x1f5)](_0x58b8f0[_0x5a457d]):[],_0x2122c5=_0x519fad[_0x23b449(0x1b2)](_0x30374d=>Number(_0x30374d));break;case'EVAL':_0x2122c5=_0x58b8f0[_0x5a457d]!==''?eval(_0x58b8f0[_0x5a457d]):null;break;case _0x23b449(0x15b):_0x519fad=_0x58b8f0[_0x5a457d]!==''?JSON['parse'](_0x58b8f0[_0x5a457d]):[],_0x2122c5=_0x519fad[_0x23b449(0x1b2)](_0x365df4=>eval(_0x365df4));break;case _0x23b449(0x238):_0x2122c5=_0x58b8f0[_0x5a457d]!==''?JSON['parse'](_0x58b8f0[_0x5a457d]):'';break;case'ARRAYJSON':_0x519fad=_0x58b8f0[_0x5a457d]!==''?JSON[_0x23b449(0x1f5)](_0x58b8f0[_0x5a457d]):[],_0x2122c5=_0x519fad['map'](_0x553954=>JSON[_0x23b449(0x1f5)](_0x553954));break;case'FUNC':_0x2122c5=_0x58b8f0[_0x5a457d]!==''?new Function(JSON[_0x23b449(0x1f5)](_0x58b8f0[_0x5a457d])):new Function(_0x23b449(0x146));break;case _0x23b449(0x21c):_0x519fad=_0x58b8f0[_0x5a457d]!==''?JSON[_0x23b449(0x1f5)](_0x58b8f0[_0x5a457d]):[],_0x2122c5=_0x519fad[_0x23b449(0x1b2)](_0x155c4f=>new Function(JSON['parse'](_0x155c4f)));break;case'STR':_0x2122c5=_0x58b8f0[_0x5a457d]!==''?String(_0x58b8f0[_0x5a457d]):'';break;case _0x23b449(0x1d0):_0x519fad=_0x58b8f0[_0x5a457d]!==''?JSON[_0x23b449(0x1f5)](_0x58b8f0[_0x5a457d]):[],_0x2122c5=_0x519fad[_0x23b449(0x1b2)](_0x13b383=>String(_0x13b383));break;case _0x23b449(0x18f):_0x3db494=_0x58b8f0[_0x5a457d]!==''?JSON['parse'](_0x58b8f0[_0x5a457d]):{},_0x2122c5=VisuMZ[_0x23b449(0x196)]({},_0x3db494);break;case _0x23b449(0x151):_0x519fad=_0x58b8f0[_0x5a457d]!==''?JSON[_0x23b449(0x1f5)](_0x58b8f0[_0x5a457d]):[],_0x2122c5=_0x519fad[_0x23b449(0x1b2)](_0x42230e=>VisuMZ[_0x23b449(0x196)]({},JSON['parse'](_0x42230e)));break;default:continue;}_0x4b3aab[_0x3401f0]=_0x2122c5;}else _0x3e88e4['shift']();}}return _0x4b3aab;},(_0x533c20=>{const _0x2edf5e=_0x1fc8d3,_0xf077e3=_0x533c20[_0x2edf5e(0x265)];for(const _0x3ac519 of dependencies){if(!Imported[_0x3ac519]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x2edf5e(0x16b)](_0xf077e3,_0x3ac519)),SceneManager[_0x2edf5e(0x167)]();break;}}const _0x4e6b37=_0x533c20['description'];if(_0x4e6b37[_0x2edf5e(0x227)](/\[Version[ ](.*?)\]/i)){const _0x30ad20=Number(RegExp['$1']);_0x30ad20!==VisuMZ[label][_0x2edf5e(0x138)]&&(alert(_0x2edf5e(0x1fe)[_0x2edf5e(0x16b)](_0xf077e3,_0x30ad20)),SceneManager[_0x2edf5e(0x167)]());}if(_0x4e6b37[_0x2edf5e(0x227)](/\[Tier[ ](\d+)\]/i)){if(_0x2edf5e(0x1d9)!==_0x2edf5e(0x1f8)){const _0x18ebe9=Number(RegExp['$1']);_0x18ebe9<tier?(alert(_0x2edf5e(0x1eb)[_0x2edf5e(0x16b)](_0xf077e3,_0x18ebe9,tier)),SceneManager[_0x2edf5e(0x167)]()):tier=Math[_0x2edf5e(0x1e2)](_0x18ebe9,tier);}else return!![];}VisuMZ[_0x2edf5e(0x196)](VisuMZ[label]['Settings'],_0x533c20[_0x2edf5e(0x23b)]);})(pluginData),PluginManager[_0x1fc8d3(0x264)](pluginData[_0x1fc8d3(0x265)],_0x1fc8d3(0x164),_0x1d0645=>{const _0x2db9d9=_0x1fc8d3;VisuMZ[_0x2db9d9(0x196)](_0x1d0645,_0x1d0645),$gameSystem['setBypassMessageLogging'](_0x1d0645[_0x2db9d9(0x210)]);}),PluginManager[_0x1fc8d3(0x264)](pluginData[_0x1fc8d3(0x265)],_0x1fc8d3(0x1be),_0x1d8371=>{const _0x84ce7d=_0x1fc8d3;VisuMZ['ConvertParams'](_0x1d8371,_0x1d8371),$gameSystem[_0x84ce7d(0x15c)](_0x1d8371[_0x84ce7d(0x144)]);}),PluginManager[_0x1fc8d3(0x264)](pluginData[_0x1fc8d3(0x265)],_0x1fc8d3(0x240),_0x46c5ca=>{const _0x2935db=_0x1fc8d3;VisuMZ[_0x2935db(0x196)](_0x46c5ca,_0x46c5ca),$gameSystem[_0x2935db(0x1ee)](_0x46c5ca[_0x2935db(0x223)]);}),TextManager[_0x1fc8d3(0x18a)]=VisuMZ[_0x1fc8d3(0x17b)]['Settings']['MainMenu']['Name'],TextManager[_0x1fc8d3(0x182)]=VisuMZ['MessageLog'][_0x1fc8d3(0x23a)][_0x1fc8d3(0x231)][_0x1fc8d3(0x20a)],TextManager[_0x1fc8d3(0x19a)]=VisuMZ[_0x1fc8d3(0x17b)]['Settings'][_0x1fc8d3(0x231)][_0x1fc8d3(0x1c4)],TextManager['MessageLogFastScroll']=VisuMZ[_0x1fc8d3(0x17b)][_0x1fc8d3(0x23a)][_0x1fc8d3(0x231)][_0x1fc8d3(0x1ab)],TextManager['MessageLogChoiceListFmt']=VisuMZ[_0x1fc8d3(0x17b)][_0x1fc8d3(0x23a)]['Vocab'][_0x1fc8d3(0x143)],TextManager[_0x1fc8d3(0x204)]=VisuMZ[_0x1fc8d3(0x17b)][_0x1fc8d3(0x23a)][_0x1fc8d3(0x231)][_0x1fc8d3(0x1d5)],TextManager[_0x1fc8d3(0x14d)]=VisuMZ[_0x1fc8d3(0x17b)][_0x1fc8d3(0x23a)]['Vocab'][_0x1fc8d3(0x19d)],TextManager[_0x1fc8d3(0x20f)]=VisuMZ[_0x1fc8d3(0x17b)][_0x1fc8d3(0x23a)][_0x1fc8d3(0x231)][_0x1fc8d3(0x152)],TextManager[_0x1fc8d3(0x1e0)]=VisuMZ[_0x1fc8d3(0x17b)][_0x1fc8d3(0x23a)][_0x1fc8d3(0x231)][_0x1fc8d3(0x191)],TextManager[_0x1fc8d3(0x1bd)]=VisuMZ[_0x1fc8d3(0x17b)][_0x1fc8d3(0x23a)][_0x1fc8d3(0x231)][_0x1fc8d3(0x1a1)];TextManager[_0x1fc8d3(0x14c)]&&(VisuMZ[_0x1fc8d3(0x17b)][_0x1fc8d3(0x18d)]=TextManager[_0x1fc8d3(0x14c)],TextManager[_0x1fc8d3(0x14c)]=function(_0xdcdec7){const _0x2eb6e0=_0x1fc8d3;if([_0x2eb6e0(0x136),_0x2eb6e0(0x157)][_0x2eb6e0(0x23c)](_0xdcdec7)){if(_0x2eb6e0(0x234)===_0x2eb6e0(0x234))return TextManager['MessageLogButtonName'];else{_0x2b0736['createNewLoggedMessageEntry']();const _0x16c034=_0x224c4c[_0x2eb6e0(0x14d)];let _0x3f51e9=this['_number'];_0x38012b[_0x2eb6e0(0x198)]&&(_0x3f51e9=_0x2eb6e0(0x178)[_0x2eb6e0(0x16b)](_0x3f51e9));let _0x3fd808=_0x16c034[_0x2eb6e0(0x16b)](_0x3f51e9);_0x9fa48f[_0x2eb6e0(0x17f)](_0x3fd808),_0x164936[_0x2eb6e0(0x1b0)]();}}return VisuMZ[_0x2eb6e0(0x17b)]['TextManager_msgButtonConsole'][_0x2eb6e0(0x17d)](this,_0xdcdec7);});;function _0x36ac(){const _0xcb6da9=['getLatestMessageLogEntry','SnLFZ','6285850ssChmQ','SlowSoundFreq','parse','drawHorzLine','SLOW_SCROLL_SPEED','OXFli','messageBody','Scene_Menu_createCommandWindow','replace','frameCount','lastGainedObjectName','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','COLOR_LOCK_CHOICE','isTriggered','8JpagOs','FastScrollSpeed','iRaUa','MessageLogChoiceCancel','callMessageLog','canCallMessageLog','callCancelHandler','_newMessageLogEntry','Window_ChoiceList_callCancelHandler','ButtonName','ukcaH','boxWidth','SnapshotOpacity','isMessageLogCommandEnabled','MessageLogEventItemFmt','Bypass','innerHeight','changeTextColor','resetFontSettings','nUBiF','stringify','buttonAssistText1','drawTextEx','prototype','processOk','NameBoxWindowDefaultColor','_commandWindow','ARRAYFUNC','SHORTCUT_KEY','bNkFB','refresh','Window_EventItem_onCancel','forceNameColor','General','Show','SPEAKER_NAME_X','SCENE_MAP_ONLY','pageup','match','helpAreaHeight','lyYFX','isMainMenuMessageLogVisible','mainAreaTop','MessageLogMenu_RectJS','speaker','faceWidth','origin','contentsHeight','Vocab','adjustSprite','<WORDWRAP>','yromx','bitmap','zktiY','convertMessageLogTextReplacement','JSON','Window','Settings','parameters','includes','commandMessageLog','messageLogWindowRect','AQkhs','SystemShowMessageLogMenu','_backSprite1','item','NSmMr','FAST_SOUND_FREQUENCY','playOkSound','calculateTextHeight','_backSprite2','numItems','1100hlrtdv','Game_System_initialize','dylNi','NUM','centerSprite','setBypassMessageLogging','value','BgSettings','_messageLogWindow','initialize','1047347oXJDsz','messageLog','convertMessageLogNameRemoval','status','_MessageLog_Bypass','processFastScroll','setFaceImage','SceneManager_push','iconIndex','updateOrigin','Game_Message_add','getRemovedMessageLogTextCodes','isMessageLogCommandVisible','faceName','description','KWAFC','outputWidth','registerCommand','name','wagve','Game_Message_setSpeakerName','processCursorMove','backlog','setScrollAccel','version','isMainMenuMessageLogEnabled','currentExt','initMessageLogSettings','onCancel','createCommandWindow','drawFace','ColorLockNumber','_forcedNameColor','addCommand','ColorLockChoice','ChoiceFmt','Enable','dSpUp','return\x200','ZrqJq','_allTextHeight','textColor','createCustomBackgroundImages','ShowFaces','msgButtonConsole','MessageLogNumberInputFmt','convertMessageLogTextRemoval','addMessageLogCommand','VisuMZ_1_MainMenuCore','ARRAYSTRUCT','ItemFmt','processAllText','_isHotKeyPressed','isSceneMap','lineHeight','log','Window_EventItem_onOk','outputHeight','shown','ARRAYEVAL','setMainMenuMessageLogEnabled','ARRAYNUM','Game_Message_setFaceImage','aUCGQ','OtbBV','faceIndex','IdGIa','EntryLimit','BypassMessageLogging','resetTextColor','COLOR_LOCK_ITEM','exit','processSlowScroll','BgFilename1','drawing','format','ColorLockItem','getBackgroundOpacity','Game_Interpreter_command101','addChild','clamp','Window_NumberInput_processOk','addMessageLogCommandAutomatically','convertMessageLogVariableTextCodes','loadTitle2','width','DNLLO','createTextState','<ColorLock>%1</ColorLock>','\x5cI[%1]','isMessageWindowWordWrap','MessageLog','prepareMessageLogFaces','call','down','addTextToMessageLog','push','playCursorSound','MessageLogButtonName','2308155gcBawZ','Inaqf','faceHeight','end','nnCFL','SHOW_FACES','onOk','MessageLogMenuCommand','ShowMainMenu','SLOW_SOUND_FREQUENCY','TextManager_msgButtonConsole','Window_Base_preConvertEscapeCharacters','STRUCT','createMessageLogWindow','ItemNameFmt','setSpeakerName','616517OnYVAo','filter','resetWordWrap','ConvertParams','Window_MenuCommand_addOriginalCommands','COLOR_LOCK_NUMBER','preConvertEscapeCharacters','MessageLogScroll','initMessageLogMainMenu','addLoadListener','NumberFmt','EpMsd','clearNameColor','constructor','NoItem','Window_Message_isTriggered','smoothScrollBy','members','_MessageLog_MainMenu','setBackgroundType','isPressed','isBypassMessageLogging','getInputMultiButtonStrings','scaleSprite','FastScroll','activate','textSizeEx','toUpperCase','bind','addNewLoggedMessageEntry','length','map','addMessageLogEntry','actor','MessageCore','enabled','_loggedMessages','trim','shift','loadTitle1','buttonAssistKey1','getLoggedMessages','MessageLogItemNothing','SystemEnableMessageLogMenu','createBackground','choices','createNewLoggedMessageEntry','scrollToTop','innerWidth','SlowScroll','create','command101','2463620FxvUxx','drawAllText','Window_ChoiceList_callOkHandler','yjXQM','GJPAj','addOriginalCommands','setFaceToMessageLog','setHandler','77765VtdQob','ARRAYSTR','_scene','MessageLogChoiceListFmt','loadFace','FAST_SCROLL_SPEED','ChoiceCancel','ShortcutKey','LYcZB','qBVjK','KDXhZ','setSpeakerToMessageLog','BgFilename2','4Nogbzs','1964979QJRDWv','callOkHandler','convertMessageLogTextCodes','MessageLogItemNameFmt','_lineY','max','wHuqU','HORZ_LINE_THICKNESS','height','add','scrollToBottom','66TwIIHp','ENTRY_LIMIT','drawMessageText','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','EnableMainMenu','AKujK','setMainMenuMessageLogVisible','buttonAssistKey4','jBDCa'];_0x36ac=function(){return _0xcb6da9;};return _0x36ac();}function _0x23dd(_0x560316,_0xdfd393){const _0x36ace4=_0x36ac();return _0x23dd=function(_0x23dd8d,_0x27e7bf){_0x23dd8d=_0x23dd8d-0x136;let _0x1e0198=_0x36ace4[_0x23dd8d];return _0x1e0198;},_0x23dd(_0x560316,_0xdfd393);}SceneManager[_0x1fc8d3(0x155)]=function(){const _0x316f89=_0x1fc8d3;return this[_0x316f89(0x1d1)]&&this[_0x316f89(0x1d1)][_0x316f89(0x1a0)]===Scene_Map;},VisuMZ[_0x1fc8d3(0x17b)]['SceneManager_push']=SceneManager[_0x1fc8d3(0x180)],SceneManager[_0x1fc8d3(0x180)]=function(_0x32dce4){const _0x107fe7=_0x1fc8d3;_0x32dce4===Scene_MessageLog&&this['prepareMessageLogFaces'](),VisuMZ['MessageLog'][_0x107fe7(0x25a)][_0x107fe7(0x17d)](this,_0x32dce4);},SceneManager['prepareMessageLogFaces']=function(){const _0x12510f=_0x1fc8d3,_0x5574b2=$gameSystem[_0x12510f(0x1bc)]();for(const _0x2a4e47 of _0x5574b2){if(!_0x2a4e47)continue;const _0x4960bc=_0x2a4e47[_0x12510f(0x260)];_0x4960bc!==''&&(_0x12510f(0x262)!==_0x12510f(0x262)?(_0x54cad5[_0x12510f(0x218)][_0x12510f(0x165)]['call'](this),this[_0x12510f(0x140)]&&this[_0x12510f(0x212)](this[_0x12510f(0x140)])):ImageManager[_0x12510f(0x1d3)](_0x4960bc));}},VisuMZ['MessageLog'][_0x1fc8d3(0x24a)]=Game_System[_0x1fc8d3(0x218)][_0x1fc8d3(0x252)],Game_System[_0x1fc8d3(0x218)]['initialize']=function(){const _0xdee4cd=_0x1fc8d3;VisuMZ[_0xdee4cd(0x17b)][_0xdee4cd(0x24a)][_0xdee4cd(0x17d)](this),this[_0xdee4cd(0x19b)](),this[_0xdee4cd(0x13b)]();},Game_System[_0x1fc8d3(0x218)][_0x1fc8d3(0x19b)]=function(){const _0x4ec5b9=_0x1fc8d3;this[_0x4ec5b9(0x1a5)]={'shown':VisuMZ[_0x4ec5b9(0x17b)][_0x4ec5b9(0x23a)]['MainMenu'][_0x4ec5b9(0x18b)],'enabled':VisuMZ[_0x4ec5b9(0x17b)]['Settings']['MainMenu'][_0x4ec5b9(0x1ec)]},this['_MessageLog_Bypass']=![];},Game_System[_0x1fc8d3(0x218)][_0x1fc8d3(0x22a)]=function(){const _0x5d94e5=_0x1fc8d3;if(this['_MessageLog_MainMenu']===undefined)this[_0x5d94e5(0x19b)]();return this['_MessageLog_MainMenu']['shown'];},Game_System[_0x1fc8d3(0x218)][_0x1fc8d3(0x1ee)]=function(_0x56d528){const _0xfefa96=_0x1fc8d3;if(this[_0xfefa96(0x1a5)]===undefined)this[_0xfefa96(0x19b)]();this['_MessageLog_MainMenu'][_0xfefa96(0x15a)]=_0x56d528;},Game_System[_0x1fc8d3(0x218)][_0x1fc8d3(0x139)]=function(){const _0x4e3db5=_0x1fc8d3;if(this['_MessageLog_MainMenu']===undefined)this[_0x4e3db5(0x19b)]();if(this['getLoggedMessages']()['length']<=0x0)return![];return this['_MessageLog_MainMenu'][_0x4e3db5(0x1b6)];},Game_System[_0x1fc8d3(0x218)][_0x1fc8d3(0x15c)]=function(_0x8f822d){const _0x44bd28=_0x1fc8d3;if(this[_0x44bd28(0x1a5)]===undefined)this[_0x44bd28(0x19b)]();this[_0x44bd28(0x1a5)][_0x44bd28(0x1b6)]=_0x8f822d;},Game_System[_0x1fc8d3(0x218)]['isBypassMessageLogging']=function(){const _0x2f14bd=_0x1fc8d3;if(this[_0x2f14bd(0x257)]===undefined)this[_0x2f14bd(0x19b)]();return this[_0x2f14bd(0x257)];},Game_System[_0x1fc8d3(0x218)][_0x1fc8d3(0x24e)]=function(_0x2cc68d){const _0x548e64=_0x1fc8d3;if(this[_0x548e64(0x257)]===undefined)this['initMessageLogMainMenu']();this[_0x548e64(0x257)]=_0x2cc68d;},Game_System[_0x1fc8d3(0x218)][_0x1fc8d3(0x13b)]=function(){const _0x27e16c=_0x1fc8d3;this[_0x27e16c(0x1b7)]=[],this['createNewLoggedMessageEntry']();},Game_System[_0x1fc8d3(0x218)][_0x1fc8d3(0x1bc)]=function(){const _0x37d17e=_0x1fc8d3;return this[_0x37d17e(0x1b7)]===undefined&&this[_0x37d17e(0x13b)](),this[_0x37d17e(0x1b7)];},Game_System[_0x1fc8d3(0x218)][_0x1fc8d3(0x1c1)]=function(){const _0x237d12=_0x1fc8d3;this[_0x237d12(0x208)]={'speaker':'','faceName':'','faceIndex':0x0,'messageBody':''};},Game_System[_0x1fc8d3(0x218)][_0x1fc8d3(0x1b0)]=function(){const _0x142d5e=_0x1fc8d3,_0x1b182c=this[_0x142d5e(0x1bc)](),_0x4a5eb5=this[_0x142d5e(0x1f1)]();if(this[_0x142d5e(0x1a8)]())return;_0x4a5eb5['messageBody']=_0x4a5eb5[_0x142d5e(0x1f9)]||'';if(_0x4a5eb5[_0x142d5e(0x1f9)][_0x142d5e(0x227)](/<BYPASS MESSAGE LOG>/i))return;if(_0x4a5eb5['messageBody'][_0x142d5e(0x1b8)]()[_0x142d5e(0x1b1)]<=0x0)return;const _0x4193e6=_0x1b182c[_0x1b182c[_0x142d5e(0x1b1)]-0x1];if(JSON['stringify'](_0x4a5eb5)===JSON[_0x142d5e(0x215)](_0x4193e6))return;_0x1b182c['push'](_0x4a5eb5);while(_0x1b182c[_0x142d5e(0x1b1)]>Window_MessageLog[_0x142d5e(0x1e9)]){_0x142d5e(0x145)!==_0x142d5e(0x1d8)?_0x1b182c['shift']():_0x19fde9[_0x142d5e(0x1d3)](_0x1a45b3);}},Game_System[_0x1fc8d3(0x218)][_0x1fc8d3(0x1f1)]=function(){const _0x46e133=_0x1fc8d3;return this[_0x46e133(0x208)]===undefined&&this['createNewLoggedMessageEntry'](),this[_0x46e133(0x208)];},Game_System[_0x1fc8d3(0x218)][_0x1fc8d3(0x17f)]=function(_0x10018d){const _0x17caf5=_0x1fc8d3,_0x2b04a7=this[_0x17caf5(0x1f1)]();if(this[_0x17caf5(0x17a)]()){if(_0x17caf5(0x236)!=='zktiY'){const _0x594cc4=_0x4dd583[_0x17caf5(0x1b4)](_0x2700c4(_0x4d982a));return _0x594cc4&&(_0x44e2f5[_0x17caf5(0x260)]=_0x594cc4[_0x17caf5(0x260)](),_0x1c787f[_0x17caf5(0x161)]=_0x594cc4[_0x17caf5(0x161)]()),'';}else _0x10018d=_0x17caf5(0x233)+_0x10018d;}_0x10018d=this['convertMessageLogTextCodes'](_0x10018d);if(_0x2b04a7['messageBody']['length']>0x0)_0x2b04a7[_0x17caf5(0x1f9)]+='\x0a';_0x2b04a7[_0x17caf5(0x1f9)]+=_0x10018d;},Game_System[_0x1fc8d3(0x218)][_0x1fc8d3(0x1df)]=function(_0x17736d){const _0x383192=_0x1fc8d3;return _0x17736d=this['convertMessageLogVariableTextCodes'](_0x17736d),_0x17736d=this[_0x383192(0x237)](_0x17736d),_0x17736d=this[_0x383192(0x14e)](_0x17736d),_0x17736d=this['convertMessageLogVariableTextCodes'](_0x17736d),_0x17736d;},Game_System[_0x1fc8d3(0x218)][_0x1fc8d3(0x173)]=function(_0x299056){const _0x2a5b36=_0x1fc8d3;while(_0x299056[_0x2a5b36(0x227)](/\\V\[(\d+)\]/gi)){if(_0x2a5b36(0x160)!==_0x2a5b36(0x266))_0x299056=_0x299056['replace'](/\\V\[(\d+)\]/gi,(_0x186f49,_0x3b0f98)=>$gameVariables[_0x2a5b36(0x24f)](parseInt(_0x3b0f98)));else return _0x41c12f[_0x2a5b36(0x182)];}return _0x299056;},Game_System[_0x1fc8d3(0x218)][_0x1fc8d3(0x237)]=function(_0x207c24){const _0x538c25=_0x1fc8d3,_0x18577d=this['getLatestMessageLogEntry']();return _0x207c24=_0x207c24[_0x538c25(0x1fb)](/\\ItemQuantity\[(\d+)\]/gi,(_0x2de962,_0x3aac64)=>$gameParty[_0x538c25(0x248)]($dataItems[Number(_0x3aac64)])||0x0),_0x207c24=_0x207c24[_0x538c25(0x1fb)](/\\WeaponQuantity\[(\d+)\]/gi,(_0x4232a2,_0x14c15d)=>$gameParty['numItems']($dataWeapons[Number(_0x14c15d)])||0x0),_0x207c24=_0x207c24['replace'](/\\ArmorQuantity\[(\d+)\]/gi,(_0x467de9,_0x430c5c)=>$gameParty[_0x538c25(0x248)]($dataArmors[Number(_0x430c5c)])||0x0),_0x207c24=_0x207c24['replace'](/\\ArmorQuantity\[(\d+)\]/gi,(_0x4d9f34,_0x458892)=>$gameParty[_0x538c25(0x248)]($dataArmors[Number(_0x458892)])||0x0),_0x207c24=_0x207c24[_0x538c25(0x1fb)](/\\LastGainObjQuantity/gi,Window_Base[_0x538c25(0x218)]['lastGainedObjectQuantity']()),_0x207c24=_0x207c24[_0x538c25(0x1fb)](/\\LastGainObjName/gi,Window_Base[_0x538c25(0x218)][_0x538c25(0x1fd)](![])),_0x207c24=_0x207c24[_0x538c25(0x1fb)](/\\LastGainObj/gi,Window_Base['prototype']['lastGainedObjectName'](!![])),_0x207c24=_0x207c24[_0x538c25(0x1fb)](/\\ActorFace\[(\d+)\]/gi,(_0x2de0d3,_0x4ef4c4)=>{const _0x2d4a9a=_0x538c25,_0x2adeb0=$gameActors['actor'](Number(_0x4ef4c4));return _0x2adeb0&&(_0x2d4a9a(0x21e)!==_0x2d4a9a(0x21e)?(this['scaleSprite'](_0x60ab26),this['centerSprite'](_0x2d7c59)):(_0x18577d['faceName']=_0x2adeb0[_0x2d4a9a(0x260)](),_0x18577d[_0x2d4a9a(0x161)]=_0x2adeb0[_0x2d4a9a(0x161)]())),'';}),_0x207c24=_0x207c24[_0x538c25(0x1fb)](/\\PartyFace\[(\d+)\]/gi,(_0x35b7af,_0x1ea0f6)=>{const _0x51bb45=_0x538c25,_0x4b6ea0=$gameParty[_0x51bb45(0x1a4)]()[Number(_0x1ea0f6)-0x1];if(_0x4b6ea0){if(_0x51bb45(0x15f)===_0x51bb45(0x15f))_0x18577d[_0x51bb45(0x260)]=_0x4b6ea0[_0x51bb45(0x260)](),_0x18577d[_0x51bb45(0x161)]=_0x4b6ea0['faceIndex']();else{this[_0x51bb45(0x22f)]['y']+=_0x597421;let _0x43bca5=_0x2153c4['max'](0x0,this[_0x51bb45(0x148)]-this[_0x51bb45(0x211)]);this[_0x51bb45(0x22f)]['y']=this['origin']['y'][_0x51bb45(0x170)](0x0,_0x43bca5);}}return'';}),_0x207c24;},Game_System[_0x1fc8d3(0x218)][_0x1fc8d3(0x14e)]=function(_0x4cfd74){const _0x512109=_0x1fc8d3,_0x3f8131=this['getRemovedMessageLogTextCodes']();for(const _0x187a07 of _0x3f8131){_0x512109(0x1f2)!==_0x512109(0x1f2)?(_0x30af7b[_0x512109(0x17b)][_0x512109(0x267)]['call'](this,_0x5b59aa),_0x111aed[_0x512109(0x1da)](_0x1d49ce)):_0x4cfd74=_0x4cfd74['replace'](_0x187a07,'');}return _0x4cfd74;},Game_System[_0x1fc8d3(0x218)]['getRemovedMessageLogTextCodes']=function(){const _0x58fdf8=_0x1fc8d3;let _0x581d20=[];return _0x581d20['push'](/\\$/gi,/\\\./gi,/\\\|/gi,/\\\!/gi),_0x581d20[_0x58fdf8(0x180)](/\\>/gi,/\\</gi,/\\\^/gi),_0x581d20[_0x58fdf8(0x180)](/\\(?:Picture|CenterPicture)<(.*?)>/gi),_0x581d20[_0x58fdf8(0x180)](/\\COMMONEVENT\[(\d+)\]>/gi,/\\WAIT\[(\d+)\]/gi),_0x581d20[_0x58fdf8(0x180)](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi),_0x581d20[_0x58fdf8(0x180)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi),_0x581d20[_0x58fdf8(0x180)](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi),_0x581d20[_0x58fdf8(0x180)](/<SHOW>/gi,/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(.*?)>/gi,/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(.*?)>/gi,/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(.*?)>/gi),_0x581d20['push'](/<HIDE>/gi,/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(.*?)>/gi,/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(.*?)>/gi,/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(.*?)>/gi),_0x581d20[_0x58fdf8(0x180)](/<ENABLE>/gi,/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(.*?)>/gi,/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(.*?)>/gi,/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(.*?)>/gi),_0x581d20[_0x58fdf8(0x180)](/<DISABLE>/gi,/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(.*?)>/gi,/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(.*?)>/gi,/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(.*?)>/gi),_0x581d20[_0x58fdf8(0x180)](/\\NormalBG/gi,/\\DimBG/gi,/\\TransparentBG/gi),_0x581d20['push'](/<POSITION:[ ]*(.*)>/gi,/<COORDINATES:[ ]*(.*)>/gi,/<DIMENSIONS:[ ]*(.*)>/gi),_0x581d20[_0x58fdf8(0x180)](/\\(?:WindowMoveTo|WindowMoveBy):[ ]*(.*?)/gi,/\\WindowReset/gi),_0x581d20[_0x58fdf8(0x180)](/\\(?:TroopMember|TroopNameMember)\[(\d+)\]/gi),_0x581d20[_0x58fdf8(0x180)](/\\ChangeFace<(.*?)>/gi,/\\FaceIndex\[(\d+)\]/gi),_0x581d20[_0x58fdf8(0x180)](/<HIDE (?:BUTTON CONSOLE|CONSOLE|BUTTONS)>/gi),_0x581d20[_0x58fdf8(0x180)](/<HIDE CHOICE WINDOW>/gi,/<BIND (?:PICTURE|PICTURES):[ ](\d+)>/gi),_0x581d20['push'](/<(?:CHOICE|SELECT) (?:COMMON EVENT|EVENT|COMMONEVENT):[ ](\d+)>/gi),_0x581d20[_0x58fdf8(0x180)](/\\(?:LSON|LSOFF|LETTER SOUND ON|LETTERSOUNDON|LETTER SOUND OFF|LETTERSOUNDOFF)/gi),_0x581d20[_0x58fdf8(0x180)](/\\(?:LETTERSOUNDNAME|LSN)<(.*?)>/gi),_0x581d20['push'](/\\(?:LETTERSOUNDINTERVAL|LSI)\[(\d+)\]/gi),_0x581d20[_0x58fdf8(0x180)](/\\(?:LETTERSOUNDVOLUME|LSV)\[(\d+)\]/gi),_0x581d20['push'](/\\(?:LETTERSOUNDPITCH|LSPI)\[(\d+)\]/gi),_0x581d20[_0x58fdf8(0x180)](/\\(?:LETTERSOUNDPAN|LSPA)\[(\d+)\]/gi),_0x581d20['push'](/\\(?:LETTERSOUNDVOLUMEVARIANCE|LETTERSOUNDVOLUMEVAR|LSVV)\[(\d+)\]/gi),_0x581d20[_0x58fdf8(0x180)](/\\(?:LETTERSOUNDPITCHVARIANCE|LETTERSOUNDPITCHVAR|LSPIV)\[(\d+)\]/gi),_0x581d20[_0x58fdf8(0x180)](/\\(?:LETTERSOUNDPANVARIANCE|LETTERSOUNDPANVAR|LSPAV)\[(\d+)\]/gi),_0x581d20[_0x58fdf8(0x180)](/<CONTINUE>/gi),_0x581d20;},Game_System[_0x1fc8d3(0x218)][_0x1fc8d3(0x1da)]=function(_0x46942f){const _0x459302=_0x1fc8d3,_0x4d6f32=this[_0x459302(0x1f1)]();_0x46942f=this[_0x459302(0x255)](_0x46942f),_0x46942f=this[_0x459302(0x1df)](_0x46942f),_0x4d6f32[_0x459302(0x22d)]=_0x46942f||'';},Game_System[_0x1fc8d3(0x218)][_0x1fc8d3(0x255)]=function(_0x3cc890){const _0x3132e5=_0x1fc8d3;if(!_0x3cc890)return'';const _0x163b9f=[/<LEFT>/gi,/<CENTER>/gi,/<RIGHT>/gi,/<\/LEFT>/gi,/<\/CENTER>/gi,/<\/RIGHT>/gi,/<POSITION:[ ](\d+)>/gi];for(const _0x39037e of _0x163b9f){_0x3132e5(0x1ca)!==_0x3132e5(0x1ca)?this[_0x3132e5(0x1b3)](![]):_0x3cc890=_0x3cc890['replace'](_0x39037e,'');}return _0x3cc890;},Game_System['prototype']['setFaceToMessageLog']=function(_0x144c1b,_0x1a53eb){const _0x5ae5ec=_0x1fc8d3,_0xbda92=this[_0x5ae5ec(0x1f1)]();_0xbda92[_0x5ae5ec(0x260)]=_0x144c1b||'',_0xbda92[_0x5ae5ec(0x161)]=_0x1a53eb||0x0;},VisuMZ['MessageLog'][_0x1fc8d3(0x25d)]=Game_Message['prototype'][_0x1fc8d3(0x1e6)],Game_Message[_0x1fc8d3(0x218)]['add']=function(_0x2f13d6){const _0x2606ad=_0x1fc8d3;VisuMZ[_0x2606ad(0x17b)][_0x2606ad(0x25d)]['call'](this,_0x2f13d6),$gameSystem['addTextToMessageLog'](_0x2f13d6);},VisuMZ['MessageLog']['Game_Message_setSpeakerName']=Game_Message['prototype'][_0x1fc8d3(0x192)],Game_Message['prototype'][_0x1fc8d3(0x192)]=function(_0x2c1a88){const _0x4d62e5=_0x1fc8d3;VisuMZ['MessageLog'][_0x4d62e5(0x267)][_0x4d62e5(0x17d)](this,_0x2c1a88),$gameSystem['setSpeakerToMessageLog'](_0x2c1a88);},VisuMZ[_0x1fc8d3(0x17b)][_0x1fc8d3(0x15e)]=Game_Message[_0x1fc8d3(0x218)][_0x1fc8d3(0x259)],Game_Message[_0x1fc8d3(0x218)]['setFaceImage']=function(_0x49b0da,_0x378cf4){const _0x34bc42=_0x1fc8d3;VisuMZ[_0x34bc42(0x17b)][_0x34bc42(0x15e)][_0x34bc42(0x17d)](this,_0x49b0da,_0x378cf4),$gameSystem[_0x34bc42(0x1cd)](_0x49b0da,_0x378cf4);},VisuMZ[_0x1fc8d3(0x17b)][_0x1fc8d3(0x16e)]=Game_Interpreter[_0x1fc8d3(0x218)][_0x1fc8d3(0x1c6)],Game_Interpreter[_0x1fc8d3(0x218)][_0x1fc8d3(0x1c6)]=function(_0x387771){const _0x48893a=_0x1fc8d3;(SceneManager['isSceneMap']()||!Window_MessageLog['SCENE_MAP_ONLY'])&&$gameSystem[_0x48893a(0x1c1)]();let _0x5d5d4d=VisuMZ[_0x48893a(0x17b)][_0x48893a(0x16e)]['call'](this,_0x387771);return(SceneManager[_0x48893a(0x155)]()||!Window_MessageLog[_0x48893a(0x225)])&&(_0x48893a(0x243)!==_0x48893a(0x23f)?$gameSystem[_0x48893a(0x1b0)]():_0x111565=_0x246ace[_0x48893a(0x16b)](_0x437570['MessageLogChoiceCancel'])),_0x5d5d4d;},VisuMZ[_0x1fc8d3(0x17b)]['Scene_Menu_createCommandWindow']=Scene_Menu['prototype'][_0x1fc8d3(0x13d)],Scene_Menu[_0x1fc8d3(0x218)]['createCommandWindow']=function(){const _0x410120=_0x1fc8d3;VisuMZ[_0x410120(0x17b)][_0x410120(0x1fa)][_0x410120(0x17d)](this);const _0x4a3a99=this[_0x410120(0x21b)];_0x4a3a99[_0x410120(0x1ce)](_0x410120(0x254),this[_0x410120(0x23d)][_0x410120(0x1af)](this));},Scene_Menu[_0x1fc8d3(0x218)][_0x1fc8d3(0x23d)]=function(){const _0x195a27=_0x1fc8d3;SceneManager[_0x195a27(0x180)](Scene_MessageLog);};function Scene_MessageLog(){this['initialize'](...arguments);}Scene_MessageLog['prototype']=Object[_0x1fc8d3(0x1c5)](Scene_MenuBase[_0x1fc8d3(0x218)]),Scene_MessageLog[_0x1fc8d3(0x218)][_0x1fc8d3(0x1a0)]=Scene_MessageLog,Scene_MessageLog[_0x1fc8d3(0x218)][_0x1fc8d3(0x252)]=function(){const _0x3a23b8=_0x1fc8d3;Scene_MenuBase[_0x3a23b8(0x218)][_0x3a23b8(0x252)][_0x3a23b8(0x17d)](this);},Scene_MessageLog['prototype'][_0x1fc8d3(0x228)]=function(){return 0x0;},Scene_MessageLog[_0x1fc8d3(0x218)][_0x1fc8d3(0x1c5)]=function(){const _0x50f65a=_0x1fc8d3;Scene_MenuBase[_0x50f65a(0x218)][_0x50f65a(0x1c5)][_0x50f65a(0x17d)](this),this[_0x50f65a(0x190)]();},Scene_MessageLog['prototype'][_0x1fc8d3(0x190)]=function(){const _0x324369=_0x1fc8d3,_0x5ab76e=this[_0x324369(0x23e)]();this[_0x324369(0x251)]=new Window_MessageLog(_0x5ab76e),this['addWindow'](this['_messageLogWindow']),this[_0x324369(0x251)]['setHandler']('cancel',this['popScene'][_0x324369(0x1af)](this)),this[_0x324369(0x251)][_0x324369(0x1a6)](VisuMZ['MessageLog'][_0x324369(0x23a)][_0x324369(0x239)]['MessageLogMenu_BgType']);},Scene_MessageLog[_0x1fc8d3(0x218)][_0x1fc8d3(0x23e)]=function(){const _0x96a348=_0x1fc8d3,_0x92f0ff=VisuMZ['MessageLog'][_0x96a348(0x23a)][_0x96a348(0x239)][_0x96a348(0x22c)];if(_0x92f0ff)return _0x92f0ff[_0x96a348(0x17d)](this);const _0x333384=0x0,_0x1fe147=this[_0x96a348(0x22b)](),_0x340c77=Graphics[_0x96a348(0x20c)],_0x3b9ed4=this['mainAreaHeight']();return new Rectangle(_0x333384,_0x1fe147,_0x340c77,_0x3b9ed4);},Scene_MessageLog[_0x1fc8d3(0x218)]['createBackground']=function(){const _0x349952=_0x1fc8d3;Scene_MenuBase[_0x349952(0x218)][_0x349952(0x1bf)][_0x349952(0x17d)](this),this['setBackgroundOpacity'](this['getBackgroundOpacity']()),this[_0x349952(0x14a)]();},Scene_MessageLog[_0x1fc8d3(0x218)][_0x1fc8d3(0x16d)]=function(){const _0x4b58c7=_0x1fc8d3;return VisuMZ[_0x4b58c7(0x17b)][_0x4b58c7(0x23a)][_0x4b58c7(0x250)][_0x4b58c7(0x20d)];},Scene_MessageLog[_0x1fc8d3(0x218)][_0x1fc8d3(0x14a)]=function(){const _0x1c41fd=_0x1fc8d3,_0x339d56=VisuMZ[_0x1c41fd(0x17b)][_0x1c41fd(0x23a)][_0x1c41fd(0x250)];_0x339d56&&(_0x339d56[_0x1c41fd(0x169)]!==''||_0x339d56[_0x1c41fd(0x1db)]!=='')&&(this['_backSprite1']=new Sprite(ImageManager[_0x1c41fd(0x1ba)](_0x339d56[_0x1c41fd(0x169)])),this[_0x1c41fd(0x247)]=new Sprite(ImageManager[_0x1c41fd(0x174)](_0x339d56[_0x1c41fd(0x1db)])),this[_0x1c41fd(0x16f)](this['_backSprite1']),this[_0x1c41fd(0x16f)](this[_0x1c41fd(0x247)]),this[_0x1c41fd(0x241)][_0x1c41fd(0x235)][_0x1c41fd(0x19c)](this['adjustSprite'][_0x1c41fd(0x1af)](this,this[_0x1c41fd(0x241)])),this[_0x1c41fd(0x247)][_0x1c41fd(0x235)][_0x1c41fd(0x19c)](this[_0x1c41fd(0x232)][_0x1c41fd(0x1af)](this,this[_0x1c41fd(0x247)])));},Scene_MessageLog['prototype'][_0x1fc8d3(0x232)]=function(_0x167db4){const _0x5b72b2=_0x1fc8d3;this[_0x5b72b2(0x1aa)](_0x167db4),this[_0x5b72b2(0x24d)](_0x167db4);},Scene_MessageLog[_0x1fc8d3(0x218)][_0x1fc8d3(0x1bb)]=function(){const _0x578175=_0x1fc8d3;return TextManager[_0x578175(0x1a9)](_0x578175(0x226),'pagedown');},Scene_MessageLog['prototype']['buttonAssistKey3']=function(){const _0x154500=_0x1fc8d3;return TextManager[_0x154500(0x1a9)]('up',_0x154500(0x17e));},Scene_MessageLog[_0x1fc8d3(0x218)][_0x1fc8d3(0x1ef)]=function(){return'';},Scene_MessageLog[_0x1fc8d3(0x218)][_0x1fc8d3(0x216)]=function(){return TextManager['MessageLogFastScroll'];},Scene_MessageLog[_0x1fc8d3(0x218)]['buttonAssistText3']=function(){const _0x47ee38=_0x1fc8d3;return TextManager[_0x47ee38(0x19a)];},VisuMZ['MessageLog'][_0x1fc8d3(0x197)]=Window_MenuCommand[_0x1fc8d3(0x218)][_0x1fc8d3(0x1cc)],Window_MenuCommand[_0x1fc8d3(0x218)][_0x1fc8d3(0x1cc)]=function(){const _0x2d27a2=_0x1fc8d3;VisuMZ[_0x2d27a2(0x17b)][_0x2d27a2(0x197)][_0x2d27a2(0x17d)](this),this['addMessageLogCommand']();},Window_MenuCommand['prototype'][_0x1fc8d3(0x14f)]=function(){const _0x1c953b=_0x1fc8d3;if(!this[_0x1c953b(0x172)]())return;if(!this[_0x1c953b(0x25f)]())return;const _0x3a31dd=TextManager[_0x1c953b(0x18a)],_0x1f68c2=this[_0x1c953b(0x20e)]();this[_0x1c953b(0x141)](_0x3a31dd,_0x1c953b(0x254),_0x1f68c2);},Window_MenuCommand[_0x1fc8d3(0x218)][_0x1fc8d3(0x172)]=function(){const _0x2caa90=_0x1fc8d3;return Imported[_0x2caa90(0x150)]?![]:!![];},Window_MenuCommand[_0x1fc8d3(0x218)][_0x1fc8d3(0x25f)]=function(){const _0x2e20a6=_0x1fc8d3;return $gameSystem[_0x2e20a6(0x22a)]();},Window_MenuCommand[_0x1fc8d3(0x218)][_0x1fc8d3(0x20e)]=function(){return $gameSystem['isMainMenuMessageLogEnabled']();},VisuMZ['MessageLog'][_0x1fc8d3(0x1c9)]=Window_ChoiceList[_0x1fc8d3(0x218)][_0x1fc8d3(0x1de)],Window_ChoiceList[_0x1fc8d3(0x218)][_0x1fc8d3(0x1de)]=function(){const _0x1c6f50=_0x1fc8d3;(SceneManager[_0x1c6f50(0x155)]()||!Window_MessageLog[_0x1c6f50(0x225)])&&this[_0x1c6f50(0x1b3)](!![]),VisuMZ[_0x1c6f50(0x17b)]['Window_ChoiceList_callOkHandler'][_0x1c6f50(0x17d)](this);},VisuMZ[_0x1fc8d3(0x17b)][_0x1fc8d3(0x209)]=Window_ChoiceList['prototype']['callCancelHandler'],Window_ChoiceList[_0x1fc8d3(0x218)][_0x1fc8d3(0x207)]=function(){const _0x514eb7=_0x1fc8d3;(SceneManager['isSceneMap']()||!Window_MessageLog[_0x514eb7(0x225)])&&this['addMessageLogEntry'](![]),VisuMZ[_0x514eb7(0x17b)][_0x514eb7(0x209)][_0x514eb7(0x17d)](this);},Window_ChoiceList[_0x1fc8d3(0x218)][_0x1fc8d3(0x1b3)]=function(_0x59b7af){const _0x3972d4=_0x1fc8d3;$gameSystem[_0x3972d4(0x1c1)]();const _0x20246a=TextManager[_0x3972d4(0x1d2)];let _0x1f414e='';if(_0x59b7af){let _0x3c9c53=this[_0x3972d4(0x13a)](),_0x7a7579=$gameMessage[_0x3972d4(0x1c0)]()[_0x3c9c53];Window_MessageLog[_0x3972d4(0x1ff)]&&(_0x7a7579=_0x3972d4(0x178)[_0x3972d4(0x16b)](_0x7a7579)),_0x1f414e=_0x20246a['format'](_0x7a7579);}else{if(!_0x59b7af&&!this['needsCancelButton']()){let _0x55b301=$gameMessage['choiceCancelType'](),_0x2d9f8e=$gameMessage[_0x3972d4(0x1c0)]()[_0x55b301];Window_MessageLog[_0x3972d4(0x1ff)]&&(_0x2d9f8e=_0x3972d4(0x178)['format'](_0x2d9f8e)),_0x1f414e=_0x20246a[_0x3972d4(0x16b)](_0x2d9f8e);}else _0x1f414e=_0x20246a[_0x3972d4(0x16b)](TextManager['MessageLogChoiceCancel']);}$gameSystem[_0x3972d4(0x17f)](_0x1f414e),$gameSystem[_0x3972d4(0x1b0)]();},VisuMZ['MessageLog'][_0x1fc8d3(0x171)]=Window_NumberInput[_0x1fc8d3(0x218)][_0x1fc8d3(0x219)],Window_NumberInput['prototype'][_0x1fc8d3(0x219)]=function(){const _0x5fb9e9=_0x1fc8d3;(SceneManager[_0x5fb9e9(0x155)]()||!Window_MessageLog[_0x5fb9e9(0x225)])&&this['addMessageLogEntry'](),VisuMZ['MessageLog'][_0x5fb9e9(0x171)]['call'](this);},Window_NumberInput[_0x1fc8d3(0x218)][_0x1fc8d3(0x1b3)]=function(){const _0x523321=_0x1fc8d3;$gameSystem[_0x523321(0x1c1)]();const _0x143ade=TextManager[_0x523321(0x14d)];let _0x329dad=this['_number'];Window_MessageLog[_0x523321(0x198)]&&(_0x329dad='<ColorLock>%1</ColorLock>'[_0x523321(0x16b)](_0x329dad));let _0xccefd=_0x143ade[_0x523321(0x16b)](_0x329dad);$gameSystem['addTextToMessageLog'](_0xccefd),$gameSystem[_0x523321(0x1b0)]();},VisuMZ[_0x1fc8d3(0x17b)][_0x1fc8d3(0x158)]=Window_EventItem[_0x1fc8d3(0x218)][_0x1fc8d3(0x189)],Window_EventItem[_0x1fc8d3(0x218)][_0x1fc8d3(0x189)]=function(){const _0x5c36ed=_0x1fc8d3;if(SceneManager['isSceneMap']()||!Window_MessageLog[_0x5c36ed(0x225)]){if('xjnIi'===_0x5c36ed(0x1f0)){let _0x50d612=this[_0x5c36ed(0x22f)]['y'],_0x3369ec=_0xe5fb9b['max'](0x0,this[_0x5c36ed(0x148)]-this[_0x5c36ed(0x211)]);this[_0x5c36ed(0x22f)]['y']=_0x3369ec;if(_0x634fc3&&_0x50d612!==this[_0x5c36ed(0x22f)]['y'])this[_0x5c36ed(0x181)]();}else this['addMessageLogEntry'](this[_0x5c36ed(0x242)]());}VisuMZ[_0x5c36ed(0x17b)][_0x5c36ed(0x158)][_0x5c36ed(0x17d)](this);},VisuMZ[_0x1fc8d3(0x17b)][_0x1fc8d3(0x220)]=Window_EventItem['prototype'][_0x1fc8d3(0x13c)],Window_EventItem[_0x1fc8d3(0x218)]['onCancel']=function(){const _0x199cac=_0x1fc8d3;(SceneManager[_0x199cac(0x155)]()||!Window_MessageLog[_0x199cac(0x225)])&&this[_0x199cac(0x1b3)](![]),VisuMZ[_0x199cac(0x17b)]['Window_EventItem_onCancel'][_0x199cac(0x17d)](this);},Window_EventItem[_0x1fc8d3(0x218)]['addMessageLogEntry']=function(_0x489d8c){const _0x9354be=_0x1fc8d3;$gameSystem[_0x9354be(0x1c1)]();const _0x4989b7=TextManager[_0x9354be(0x20f)];let _0x2c0b08='';if(_0x489d8c){if(_0x9354be(0x24b)!==_0x9354be(0x24b))return _0x3d5991[_0x9354be(0x22a)]();else{let _0x44735c=TextManager[_0x9354be(0x1e0)],_0x319b56=_0x44735c[_0x9354be(0x16b)](_0x9354be(0x179)[_0x9354be(0x16b)](_0x489d8c[_0x9354be(0x25b)]),_0x489d8c[_0x9354be(0x265)]);Window_MessageLog[_0x9354be(0x166)]&&('plmwb'===_0x9354be(0x1e3)?this[_0x9354be(0x17c)]():_0x319b56=_0x9354be(0x178)[_0x9354be(0x16b)](_0x319b56)),_0x2c0b08=_0x4989b7[_0x9354be(0x16b)](_0x319b56);}}else _0x9354be(0x203)==='oRfht'?_0x216204[_0x9354be(0x180)](_0x5094a8):_0x2c0b08=_0x4989b7[_0x9354be(0x16b)](TextManager[_0x9354be(0x1bd)]);$gameSystem[_0x9354be(0x17f)](_0x2c0b08),$gameSystem[_0x9354be(0x1b0)]();},VisuMZ[_0x1fc8d3(0x17b)]['Window_Base_preConvertEscapeCharacters']=Window_Base[_0x1fc8d3(0x218)][_0x1fc8d3(0x199)],Window_Base[_0x1fc8d3(0x218)]['preConvertEscapeCharacters']=function(_0x4c368f){const _0x118bcc=_0x1fc8d3;return _0x4c368f=VisuMZ['MessageLog'][_0x118bcc(0x18e)][_0x118bcc(0x17d)](this,_0x4c368f),_0x4c368f=_0x4c368f[_0x118bcc(0x1fb)](/<BYPASS MESSAGE LOG>/i,''),_0x4c368f;},VisuMZ['MessageLog'][_0x1fc8d3(0x1a2)]=Window_Message[_0x1fc8d3(0x218)][_0x1fc8d3(0x200)],Window_Message[_0x1fc8d3(0x218)]['isTriggered']=function(){const _0x5de707=_0x1fc8d3;let _0x238616=VisuMZ[_0x5de707(0x17b)][_0x5de707(0x1a2)][_0x5de707(0x17d)](this);if(this[_0x5de707(0x206)]()&&Input[_0x5de707(0x200)](Window_MessageLog[_0x5de707(0x21d)]))return this[_0x5de707(0x205)](),![];else{if(_0x5de707(0x176)!==_0x5de707(0x229))return _0x238616;else _0x3b8a04['MessageLog'][_0x5de707(0x15e)][_0x5de707(0x17d)](this,_0x51e2d7,_0x5c1eaa),_0x91fff6[_0x5de707(0x1cd)](_0x4df8d1,_0x637b7);}},Window_Message[_0x1fc8d3(0x218)]['canCallMessageLog']=function(){const _0x744bb8=_0x1fc8d3;return SceneManager[_0x744bb8(0x155)]()&&$gameSystem[_0x744bb8(0x139)]();},Window_Message[_0x1fc8d3(0x218)][_0x1fc8d3(0x205)]=function(){const _0x1f4229=_0x1fc8d3;this[_0x1f4229(0x245)](),SceneManager[_0x1f4229(0x180)](Scene_MessageLog);};function Window_MessageLog(){const _0x3f21cf=_0x1fc8d3;this[_0x3f21cf(0x252)](...arguments);}Window_MessageLog[_0x1fc8d3(0x218)]=Object['create'](Window_Selectable['prototype']),Window_MessageLog[_0x1fc8d3(0x218)][_0x1fc8d3(0x1a0)]=Window_MessageLog,Window_MessageLog[_0x1fc8d3(0x225)]=!![],Window_MessageLog[_0x1fc8d3(0x1e9)]=VisuMZ[_0x1fc8d3(0x17b)][_0x1fc8d3(0x23a)][_0x1fc8d3(0x222)][_0x1fc8d3(0x163)],Window_MessageLog[_0x1fc8d3(0x21d)]=VisuMZ[_0x1fc8d3(0x17b)][_0x1fc8d3(0x23a)][_0x1fc8d3(0x222)][_0x1fc8d3(0x1d6)],Window_MessageLog['SHOW_FACES']=VisuMZ[_0x1fc8d3(0x17b)][_0x1fc8d3(0x23a)][_0x1fc8d3(0x222)][_0x1fc8d3(0x14b)]??!![],Window_MessageLog[_0x1fc8d3(0x1e4)]=0x4,Window_MessageLog[_0x1fc8d3(0x224)]=VisuMZ[_0x1fc8d3(0x17b)][_0x1fc8d3(0x23a)][_0x1fc8d3(0x239)]['SpeakerNameX'],Window_MessageLog[_0x1fc8d3(0x1ff)]=VisuMZ[_0x1fc8d3(0x17b)][_0x1fc8d3(0x23a)][_0x1fc8d3(0x239)][_0x1fc8d3(0x142)],Window_MessageLog[_0x1fc8d3(0x198)]=VisuMZ[_0x1fc8d3(0x17b)][_0x1fc8d3(0x23a)][_0x1fc8d3(0x239)][_0x1fc8d3(0x13f)],Window_MessageLog['COLOR_LOCK_ITEM']=VisuMZ[_0x1fc8d3(0x17b)][_0x1fc8d3(0x23a)][_0x1fc8d3(0x239)][_0x1fc8d3(0x16c)],Window_MessageLog[_0x1fc8d3(0x1f7)]=VisuMZ[_0x1fc8d3(0x17b)][_0x1fc8d3(0x23a)][_0x1fc8d3(0x239)]['SlowScrollSpeed'],Window_MessageLog[_0x1fc8d3(0x1d4)]=VisuMZ[_0x1fc8d3(0x17b)][_0x1fc8d3(0x23a)][_0x1fc8d3(0x239)][_0x1fc8d3(0x202)],Window_MessageLog[_0x1fc8d3(0x18c)]=VisuMZ['MessageLog']['Settings'][_0x1fc8d3(0x239)][_0x1fc8d3(0x1f4)],Window_MessageLog[_0x1fc8d3(0x244)]=VisuMZ[_0x1fc8d3(0x17b)]['Settings']['Window']['FastSoundFreq'],Window_MessageLog[_0x1fc8d3(0x218)][_0x1fc8d3(0x252)]=function(_0xc92a62){const _0x194bde=_0x1fc8d3;this[_0x194bde(0x154)]=Input[_0x194bde(0x1a7)](Window_MessageLog[_0x194bde(0x21d)]),Window_Selectable[_0x194bde(0x218)][_0x194bde(0x252)]['call'](this,_0xc92a62),this[_0x194bde(0x148)]=0x0,this[_0x194bde(0x21f)](),this[_0x194bde(0x1ac)]();},Window_MessageLog[_0x1fc8d3(0x218)]['isAutoColorAffected']=function(){return!![];},Window_MessageLog[_0x1fc8d3(0x218)][_0x1fc8d3(0x21f)]=function(){const _0x1aabf6=_0x1fc8d3;this['calculateTextHeight'](),this['createContents'](),this[_0x1aabf6(0x1c8)]();},Window_MessageLog[_0x1fc8d3(0x218)][_0x1fc8d3(0x246)]=function(){const _0xffb917=_0x1fc8d3,_0x3194b7=this[_0xffb917(0x156)](),_0x49e520=$gameSystem[_0xffb917(0x1bc)]();this[_0xffb917(0x148)]=_0x3194b7;for(const _0xfa1020 of _0x49e520){if(!_0xfa1020)continue;if(_0xfa1020[_0xffb917(0x22d)]!=='')this[_0xffb917(0x148)]+=this[_0xffb917(0x1ad)](_0xfa1020[_0xffb917(0x22d)])['height'];let _0x5748b4=_0xfa1020['faceName']!==''&&Window_MessageLog[_0xffb917(0x188)]?ImageManager[_0xffb917(0x185)]:0x0,_0x11e07c=this[_0xffb917(0x1ad)](_0xfa1020[_0xffb917(0x1f9)])['height'];this['_allTextHeight']+=Math[_0xffb917(0x1e2)](_0x5748b4,_0x11e07c),this[_0xffb917(0x148)]+=_0x3194b7;}},Window_MessageLog['prototype'][_0x1fc8d3(0x230)]=function(){const _0x1b269f=_0x1fc8d3;return Math[_0x1b269f(0x1e2)](this[_0x1b269f(0x148)],0x1);},Window_MessageLog[_0x1fc8d3(0x218)]['drawAllText']=function(){const _0x434bd6=_0x1fc8d3;this['_lineY']=0x0,this['drawHorzLine']();const _0x6718b=$gameSystem['getLoggedMessages']();for(const _0x44a1d7 of _0x6718b){if(!_0x44a1d7)continue;this[_0x434bd6(0x213)](),this[_0x434bd6(0x1ea)](_0x44a1d7),this[_0x434bd6(0x195)]();}this['scrollToBottom']();},Window_MessageLog['prototype'][_0x1fc8d3(0x1f6)]=function(){const _0x2e2137=_0x1fc8d3,_0x5612c7=new Rectangle(0x4,this[_0x2e2137(0x1e1)],this['innerWidth']-0x8,this[_0x2e2137(0x156)]());this[_0x2e2137(0x213)]();const _0x36ea99=Window_MessageLog[_0x2e2137(0x1e4)],_0x3ba25a=_0x5612c7['y']+(_0x5612c7[_0x2e2137(0x1e5)]-_0x36ea99)/0x2;this['drawRect'](_0x5612c7['x'],_0x3ba25a,_0x5612c7[_0x2e2137(0x175)],_0x36ea99),this[_0x2e2137(0x1e1)]+=this['lineHeight']();},Window_MessageLog['prototype']['textSizeEx']=function(_0x5cb300){const _0x57f928=_0x1fc8d3;let _0x5bd794=this[_0x57f928(0x1c3)]-(ImageManager['faceWidth']+0x18)*0x2;Graphics[_0x57f928(0x20c)]<=0x330&&(_0x5bd794=this[_0x57f928(0x1c3)]-0x8);this[_0x57f928(0x213)](),this[_0x57f928(0x195)]();const _0x29fcf6=this[_0x57f928(0x177)](_0x5cb300,0x0,0x0,_0x5bd794);return _0x29fcf6[_0x57f928(0x16a)]=![],this[_0x57f928(0x153)](_0x29fcf6),this[_0x57f928(0x195)](),{'width':_0x29fcf6[_0x57f928(0x263)],'height':_0x29fcf6[_0x57f928(0x159)]};},Window_MessageLog['prototype'][_0x1fc8d3(0x1ea)]=function(_0x51b3a2){const _0x5acbeb=_0x1fc8d3;let _0x2a17f7=0x4,_0x189bb4=ImageManager['faceWidth']+0x14,_0x370719=this[_0x5acbeb(0x1c3)]-(_0x189bb4+0x4)*0x2;_0x51b3a2[_0x5acbeb(0x22d)]!==''&&(this[_0x5acbeb(0x221)](),this['drawTextEx'](_0x51b3a2[_0x5acbeb(0x22d)],Window_MessageLog[_0x5acbeb(0x224)],this[_0x5acbeb(0x1e1)],_0x370719),this['_lineY']+=this[_0x5acbeb(0x1ad)](_0x51b3a2['speaker'])['height'],this[_0x5acbeb(0x19f)]());this[_0x5acbeb(0x213)](),this[_0x5acbeb(0x195)]();if(Window_MessageLog[_0x5acbeb(0x188)]&&_0x51b3a2['faceName']){let _0x221bb6=_0x2a17f7,_0x4a09f8=this['_lineY'],_0x2bd506=ImageManager[_0x5acbeb(0x22e)],_0x264719=ImageManager['faceHeight'];this[_0x5acbeb(0x13e)](_0x51b3a2[_0x5acbeb(0x260)],_0x51b3a2[_0x5acbeb(0x161)],_0x221bb6,_0x4a09f8,_0x2bd506,_0x264719),Graphics['boxWidth']<=0x330&&(_0x370719=this[_0x5acbeb(0x1c3)]-(_0x189bb4+0x4));}else{if(Graphics['boxWidth']<=0x330){if('GJPAj'===_0x5acbeb(0x1cb))_0x189bb4=0x4,_0x370719=this['innerWidth']-0x8;else return this[_0x5acbeb(0x1d1)]&&this['_scene'][_0x5acbeb(0x1a0)]===_0x420900;}}this[_0x5acbeb(0x217)](_0x51b3a2[_0x5acbeb(0x1f9)],_0x189bb4,this[_0x5acbeb(0x1e1)],_0x370719);let _0x40bbe4=this[_0x5acbeb(0x1ad)](_0x51b3a2[_0x5acbeb(0x1f9)])[_0x5acbeb(0x1e5)],_0x2de832=_0x51b3a2[_0x5acbeb(0x260)]!==''&&Window_MessageLog[_0x5acbeb(0x188)]?ImageManager[_0x5acbeb(0x185)]:0x0;this['_lineY']+=Math[_0x5acbeb(0x1e2)](_0x2de832,_0x40bbe4),this[_0x5acbeb(0x213)](),this[_0x5acbeb(0x195)](),this[_0x5acbeb(0x1f6)]();},Window_MessageLog[_0x1fc8d3(0x218)][_0x1fc8d3(0x221)]=function(){const _0x433a89=_0x1fc8d3,_0x4076f9=VisuMZ[_0x433a89(0x1b5)][_0x433a89(0x23a)][_0x433a89(0x222)][_0x433a89(0x21a)];this[_0x433a89(0x140)]=ColorManager[_0x433a89(0x149)](_0x4076f9);},Window_MessageLog['prototype'][_0x1fc8d3(0x19f)]=function(){this['_forcedNameColor']=undefined;},Window_MessageLog['prototype'][_0x1fc8d3(0x165)]=function(){const _0x8781a6=_0x1fc8d3;Window_Selectable[_0x8781a6(0x218)][_0x8781a6(0x165)][_0x8781a6(0x17d)](this);if(this['_forcedNameColor']){if(_0x8781a6(0x184)===_0x8781a6(0x214)){if(this[_0x8781a6(0x257)]===_0x28b280)this['initMessageLogMainMenu']();return this[_0x8781a6(0x257)];}else this['changeTextColor'](this['_forcedNameColor']);}},Window_MessageLog[_0x1fc8d3(0x218)][_0x1fc8d3(0x25c)]=function(){},Window_MessageLog[_0x1fc8d3(0x218)][_0x1fc8d3(0x268)]=function(){const _0x2c6a27=_0x1fc8d3;if(Input[_0x2c6a27(0x1a7)](Window_MessageLog['SHORTCUT_KEY'])&&this[_0x2c6a27(0x154)])return;this[_0x2c6a27(0x154)]=![];if(Input[_0x2c6a27(0x1a7)]('down'))this[_0x2c6a27(0x168)](!![]);else{if(Input[_0x2c6a27(0x1a7)]('up')){if(_0x2c6a27(0x187)!==_0x2c6a27(0x1d7))this[_0x2c6a27(0x168)](![]);else{const _0x232788=this[_0x2c6a27(0x25e)]();for(const _0x4b7fa0 of _0x232788){_0x1e60ea=_0x186863[_0x2c6a27(0x1fb)](_0x4b7fa0,'');}return _0x3b98a6;}}else{if(Input['isPressed']('pagedown'))'RRtYt'!==_0x2c6a27(0x20b)?this[_0x2c6a27(0x258)](!![]):_0x49bd92=_0x2c6a27(0x178)[_0x2c6a27(0x16b)](_0x89c73d);else{if(Input[_0x2c6a27(0x1a7)](_0x2c6a27(0x226))){if('sKTkr'===_0x2c6a27(0x1ed)){while(_0x37b942[_0x2c6a27(0x227)](/\\V\[(\d+)\]/gi)){_0x4982da=_0x90163a[_0x2c6a27(0x1fb)](/\\V\[(\d+)\]/gi,(_0x379625,_0x4d7dc3)=>_0x3b17ef[_0x2c6a27(0x24f)](_0x4899c4(_0x4d7dc3)));}return _0x8d89dc;}else this[_0x2c6a27(0x258)](![]);}else{if(Input[_0x2c6a27(0x200)]('home'))this[_0x2c6a27(0x1c2)](!![]);else{if(Input[_0x2c6a27(0x200)](_0x2c6a27(0x186))){if(_0x2c6a27(0x162)!==_0x2c6a27(0x162)){const _0x49e608=this[_0x2c6a27(0x1bc)](),_0x52abfa=this['getLatestMessageLogEntry']();if(this[_0x2c6a27(0x1a8)]())return;_0x52abfa[_0x2c6a27(0x1f9)]=_0x52abfa[_0x2c6a27(0x1f9)]||'';if(_0x52abfa[_0x2c6a27(0x1f9)][_0x2c6a27(0x227)](/<BYPASS MESSAGE LOG>/i))return;if(_0x52abfa[_0x2c6a27(0x1f9)]['trim']()[_0x2c6a27(0x1b1)]<=0x0)return;const _0x52496e=_0x49e608[_0x49e608[_0x2c6a27(0x1b1)]-0x1];if(_0x4669db[_0x2c6a27(0x215)](_0x52abfa)===_0x56ae0c[_0x2c6a27(0x215)](_0x52496e))return;_0x49e608[_0x2c6a27(0x180)](_0x52abfa);while(_0x49e608['length']>_0x22aafd['ENTRY_LIMIT']){_0x49e608[_0x2c6a27(0x1b9)]();}}else this[_0x2c6a27(0x1e7)](!![]);}}}}}}},Window_MessageLog[_0x1fc8d3(0x218)][_0x1fc8d3(0x168)]=function(_0xebb475){const _0x6ece9c=_0x1fc8d3;let _0x3d3cba=this[_0x6ece9c(0x22f)]['y'];this[_0x6ece9c(0x22f)]['y']+=(_0xebb475?0x1:-0x1)*Window_MessageLog['SLOW_SCROLL_SPEED'];let _0x16f10d=Math[_0x6ece9c(0x1e2)](0x0,this['_allTextHeight']-this[_0x6ece9c(0x211)]);this[_0x6ece9c(0x22f)]['y']=this['origin']['y'][_0x6ece9c(0x170)](0x0,_0x16f10d);if(_0x3d3cba!==this['origin']['y']&&Graphics[_0x6ece9c(0x1fc)]%Window_MessageLog[_0x6ece9c(0x18c)]===0x0)this[_0x6ece9c(0x181)]();},Window_MessageLog[_0x1fc8d3(0x218)][_0x1fc8d3(0x258)]=function(_0xfb66c3){const _0x6dc041=_0x1fc8d3;let _0x3d7c77=this['origin']['y'];this[_0x6dc041(0x22f)]['y']+=(_0xfb66c3?0x1:-0x1)*Window_MessageLog[_0x6dc041(0x1d4)];let _0x7062a1=Math[_0x6dc041(0x1e2)](0x0,this[_0x6dc041(0x148)]-this[_0x6dc041(0x211)]);this['origin']['y']=this[_0x6dc041(0x22f)]['y']['clamp'](0x0,_0x7062a1);if(_0x3d7c77!==this[_0x6dc041(0x22f)]['y']&&Graphics[_0x6dc041(0x1fc)]%Window_MessageLog[_0x6dc041(0x244)]===0x0)this[_0x6dc041(0x181)]();},Window_MessageLog['prototype']['scrollToTop']=function(_0x4b7b91){const _0x47af2b=_0x1fc8d3;let _0x32a2fd=this[_0x47af2b(0x22f)]['y'];this[_0x47af2b(0x22f)]['y']=0x0;if(_0x4b7b91&&_0x32a2fd!==this[_0x47af2b(0x22f)]['y'])this[_0x47af2b(0x181)]();},Window_MessageLog[_0x1fc8d3(0x218)][_0x1fc8d3(0x1e7)]=function(_0x472168){const _0x367831=_0x1fc8d3;let _0x62413a=this[_0x367831(0x22f)]['y'],_0x250fe1=Math[_0x367831(0x1e2)](0x0,this['_allTextHeight']-this[_0x367831(0x211)]);this[_0x367831(0x22f)]['y']=_0x250fe1;if(_0x472168&&_0x62413a!==this[_0x367831(0x22f)]['y'])this[_0x367831(0x181)]();},Window_MessageLog['prototype'][_0x1fc8d3(0x1a3)]=function(_0x2c38af,_0x1dc28d){const _0x318ada=_0x1fc8d3;this[_0x318ada(0x22f)]['y']+=_0x1dc28d;let _0x333b21=Math[_0x318ada(0x1e2)](0x0,this[_0x318ada(0x148)]-this[_0x318ada(0x211)]);this[_0x318ada(0x22f)]['y']=this[_0x318ada(0x22f)]['y'][_0x318ada(0x170)](0x0,_0x333b21);},Window_MessageLog[_0x1fc8d3(0x218)][_0x1fc8d3(0x137)]=function(_0x3532eb,_0x34a1bf){const _0xdcbf3d=_0x1fc8d3;this[_0xdcbf3d(0x22f)]['y']+=_0x34a1bf;let _0x466122=Math[_0xdcbf3d(0x1e2)](0x0,this['_allTextHeight']-this['innerHeight']);this[_0xdcbf3d(0x22f)]['y']=this[_0xdcbf3d(0x22f)]['y']['clamp'](0x0,_0x466122);};