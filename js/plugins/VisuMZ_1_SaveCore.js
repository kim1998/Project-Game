//=============================================================================
// VisuStella MZ - Save Core
// VisuMZ_1_SaveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SaveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SaveCore = VisuMZ.SaveCore || {};
VisuMZ.SaveCore.version = 1.13;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.13] [SaveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Save_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Save Core plugin adds upon the existing functionality of how saves
 * operate in RPG Maker MZ and how the Save Menu appears in-game. Control over
 * autosaves is also provided by this plugin as well as the ability to make
 * Global Switches and Variables accessible across all game saves (including
 * new games).
 *
 * Features include all (but not limited to) the following:
 * 
 * * Save file technicalities including how filenames are made and or how
 *   forage keys are labeled to distinguish games from one another.
 * * Save types (standard, slot-locked, or single) to change saving to be
 *   suited for each game type.
 * * Save confirmation window added to relay information to player on whether
 *   or not a save has been made successfully.
 * * Global Switches and Variables that span across all saves and new games.
 * * Control over how autosaves handle (their own file, save over existing
 *   files, and/or both).
 * * Plugin Commands that enable/disable autosaves and forcefully activate them
 *   or request them.
 * * Change up how the Save Menu appears with various save styles.
 * * Add descriptions and pictures to the save files.
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
 * Global Switches and Global Variables
 * ============================================================================
 *
 * Global Switches and Global Variables are now added into the game engine via
 * this plugin. Global Switches and Global Variables exist in the same state
 * across all save files. This means if Switch 40 is declared to be a Global
 * Switch and is turned ON, then whether you start up a new game or open a
 * different save file, Switch 40 will be in the ON state. Similar will occur
 * with Global Variables.
 *
 * ---
 *
 * <Global> Switch/Variable Name
 *
 * To declare Global Switches and/or Global Variables, insert <Global> into
 * the Switch/Variable's name. That's all there is to it. Whatever value you
 * change the Global Switch/Variable to after declaring it will be changed
 * across all saves.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <Global>, <JS>, or <Self> simultaneously.
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
 * === Autosave Plugin Commands ===
 * 
 * ---
 *
 * Autosave: Enable/Disable
 * - Enables/disables Autosave on a local (lowest) level.
 * - Requires Database => System 1 => [x] Enable Autosave
 * - This does NOT mean it will change autosaving for other loaded game saves
 *   or new game sessions.
 * - This ONLY applies to the local session for the dev to control whether or
 *   not autosaving will occur at its usual conditions and scenarios.
 *
 *   Enable or Disable?:
 *   - Enable or disable autosave?
 *
 * ---
 *
 * Autosave: (Stage 1) Request
 * - Autosaves the game at current point if enabled.
 * - Requires Database => System 1 => [x] Enable Autosave
 * - Autosave does not go through if it is neither enabled in the database or
 *   in-game through the "Autosave: Enable/Disable" plugin command.
 * - This Plugin Command will not autosave if the player turned off "Autosave"
 *   in the Options Menu.
 *
 * ---
 *
 * Autosave: (Stage 2) Execute
 * - Executes autosaves the game at the current point.
 * - Requires Database => System 1 => [x] Enable Autosave
 * - This will require autosave to be enabled through the database, but it will
 *   ignore the "Autosave: Enable/Disable" plugin command state.
 * - This Plugin Command will not autosave if the player turned off "Autosave"
 *   in the Options Menu.
 *
 * ---
 *
 * Autosave: (Stage 3) Force
 * - Forces autosaves the game at the current point.
 * - Requires Database => System 1 => [x] Enable Autosave
 * - This will require autosave to be enabled through the database, but it will
 *   ignore the "Autosave: Enable/Disable" plugin command state.
 *
 * ---
 *
 * Save: Current Slot
 * - Process the game's current save at the current point.
 * - Must be outside of battle and on the map.
 *
 * ---
 * 
 * === Save Plugin Commands ===
 * 
 * ---
 *
 * Save: Set Description
 * - Set the description text that will appear in the save files.
 *
 *   Text:
 *   - Insert desired save description text here.
 *   - Text codes supported.
 *   - \V[x], \N[x], \P[x] are save local.
 *   - Other text codes will draw data from the currently active game.
 *
 * ---
 *
 * Save: Set Picture
 * - Set the picture that would appear in the save file.
 *
 *   Filename:
 *   - Input the filename here of the desired picture.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Save Settings
 * ============================================================================
 *
 * These are general settings pertaining to saves and the technicalities behind
 * how saves work in your game.
 *
 * ---
 *
 * General
 * 
 *   Save Style:
 *   - Select a save style for the game. Some of these options may alter other
 *     Plugin Parameter settings.
 *   - Standard: Save freely in any slot.
 *   - Slot-Locked: Select one dedicated slot at New Game.
 *   - Single: Only one slot is available for the game.
 * 
 *   Max Save Files:
 *   - Maximum number of save files for the game.
 * 
 *   Autosave Counts?:
 *   - Count the autosave file towards the max count?
 *
 * ---
 *
 * Local Mode
 * 
 *   Local Mode?:
 *   - When running the game on client, use the Local Mode of saving via files
 *     or store saves to forage keys?
 * 
 *   Filename Format:
 *   - Filename format for save files.
 *   - %1 - Save File ID
 * 
 *   Extension Format:
 *   - Filename extension format for save files.
 *   - %1 - Save Name
 *
 * ---
 *
 * Forage Key
 * 
 *   Forage Key Format:
 *   - Forage Key format when saving to memory.
 *   - %1 - Game ID, %2 - Save Name
 * 
 *   Forage Key Test:
 *   - Key used to test if saving a forage key is possible.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Help: Slot-Locked:
 *   - Help description used for initial slot-locked selection.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: On Save Success:
 *   - Code to perform when a save is successful.
 * 
 *   JS: On Save Failure:
 *   - Code to perform when a save has failed.
 * 
 *   JS: On Load Success:
 *   - Code to perform when a load is successful.
 * 
 *   JS: On Load Failure:
 *   - Code to perform when a load has failed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Save Confirm Window Settings
 * ============================================================================
 *
 * The Save Confirmation Window is a new feature added through this plugin.
 * It gives the player visual feedback letting the player know that a save is
 * successful or not.
 *
 * ---
 *
 * General
 * 
 *   Enable Window?:
 *   - Enable the Save Confirmation Window?
 * 
 *   Pop Up Duration:
 *   - How long should the window be open for before closing?
 *   - Insert the time in milliseconds.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions of the Save Confirmation Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Pop Up: Save Success:
 *   - Text used for a "Save Success" message popup.
 *   - Text codes are allowed.
 * 
 *   Pop Up: Save Failure:
 *   - Text used for a "Save Failure" message popup.
 *   - Text codes are allowed.
 * 
 *   Pop Up: Load Failure:
 *   - Text used for a "Load Failure" message popup.
 *   - Text codes are allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Autosave Settings
 * ============================================================================
 *
 * These settings adjust how autosaves work in your game project. The settings
 * will encompass the original autosave settings made by RPG Maker MZ as well
 * as new settings added through this plugin.
 *
 * ---
 *
 * General
 * 
 *   Autosave Type:
 *   - Select autosave type.
 *   - Requires Database => System 1 => [x] Enable Autosave
 *   - Autosave File: Dedicated save file for autosaves.
 *   - Current File: Overwrites the current save file.
 *   - Autosave File + Current File: Both of the above.
 *
 * ---
 *
 * Requests
 * 
 *   Requires Save Enable?:
 *   - Autosave requests require Saving to be enabled?
 * 
 *   Request after Battle?:
 *   - Requests an autosave after battle?
 * 
 *   Request on Transfer?:
 *   - Requests an autosave after a map transfer?
 * 
 *   Request on Menu Open?:
 *   - Requests an autosave after opening the main menu?
 * 
 *   Request on Menu Exit?:
 *   - Requests an autosave after exiting the main menu?
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: On Success:
 *   - Code to perform when an autosave is successful.
 * 
 *   JS: On Failure:
 *   - Code to perform when an autosave has failed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Autosave Confirm Window Settings
 * ============================================================================
 *
 * The Autosave Confirmation Window is a new feature added by this plugin to
 * notify the player whenever autosaving occurs.
 *
 * ---
 *
 * General
 * 
 *   Enable Window?:
 *   - Enable the Autoave Confirmation Window?
 * 
 *   Pop Up Duration:
 *   - How long should the window be open for before closing?
 *   - Insert the time in milliseconds.
 * 
 *   Screen Position:
 *   - Where does this window appear on the screen?
 *   - Lower Left
 *   - Lower Center
 *   - Lower Right
 *   - Middle Left
 *   - Middle Center
 *   - Middle Right
 *   - Upper Left
 *   - Upper Center
 *   - Upper Right
 *
 * ---
 *
 * Vocabulary
 * 
 *   Pop Up: Save Success:
 *   - Text used for an "Autosave Success" message popup.
 *   - Text codes are allowed
 * 
 *   Pop Up: Save Failure:
 *   - Text used for an "Autosave Failure" message popup.
 *   - Text codes are allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Autosave Options Settings
 * ============================================================================
 *
 * This plugin adds the "Autosave" option to the Options menu, allowing players
 * to decide if they want autosave enabled or not. This feature can be disabled
 * as well, to better suit games. If the "Autosave" option is turned off by the
 * player, then any Autosave requests and executions.
 *
 * ---
 *
 * Autosave Options
 * 
 *   Add Option?:
 *   - Add the 'Autosave' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - Determine the default value of this option.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Graphic Settings
 * ============================================================================
 *
 * This Plugin Parameter lets you select which graphic to use for displaying
 * the actor party found inside the save menu.
 *
 * ---
 *
 * Actor Graphic
 * 
 *   None:
 *   - Don't display any actors.
 * 
 *   Face:
 *   - Display the face graphics for the actors.
 * 
 *   Map Sprite:
 *   - Display the sprite graphics for the actors.
 * 
 *   Sideview Battler:
 *   - Display the SV Battler graphics for the actors.
 *   - Note: If you have an existing save made before this plugin was
 *     installed, you may need to save over the existing ones to see the
 *     Sideview Battler graphics.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Save Menu Styles
 * ============================================================================
 *
 * Save Menu Styles affect how the save files themselves appear to the player,
 * as long horizontal lists, vertical columns, small boxes, or a large file.
 *
 * ---
 *
 * Save Menu Styles
 * 
 *   List:
 *   - Save files stretch horizontally across the screen.
 *   - Save files are listed as rows.
 * 
 *   Vertical:
 *   - Save files are stretched vertically across the screen.
 *   - Save files are depicted as columns.
 * 
 *   Box:
 *   - Save files are small boxes shown on the screen.
 *   - Save files are sign in both rows and columns.
 * 
 *   Large:
 *   - Save files take up the whole screen.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Style Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to manipulate how the save styles
 * appear in-game if they're not to your liking. JavaScript familiarity is a
 * must to adjust them.
 *
 * ---
 *
 * General
 * 
 *   Latest Text:
 *   - Text used to depict latest save file.
 *   - The "NEW!" text will not appear on auto save slots. This is intentional.
 * 
 *   Latest Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Sprite Width:
 *   - Pixel width of map sprites when drawn in the Save Menu.
 * 
 *   SV Battler Width:
 *   - Pixel width of sv battlers when drawn in the Save Menu.
 *
 *   JS: Save Display Info:
 *   - Code that, upon saving, determines which info is quickly stored
 *     for displaying.
 *
 * ---
 *
 * List Style
 * Vertical Style
 * Box Style
 * Large Style
 * 
 *   Rows:
 *   - Number of rows for this style.
 * 
 *   Columns:
 *   - Number of column for this style.
 * 
 *   JS: Draw Contents:
 *   - Code on how to draw the contents for this style.
 * 
 *   JS: Draw File Data:
 *   - Code on how to draw the file data for this style.
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
 * Version 1.13: August 29, 2024
 * * Bug Fixes!
 * ** Fixed a bug where single-mode save games would freeze after executed
 *    event movements made by Events & Movement Core. Fix made by Arisu.
 * ** Fixed a bug where if the main menu is skipped, face graphics won't be
 *    loaded in time for the save or load menu. Fix made by Arisu.
 * ** Fixed a bug where the pop up duration of the autosave confirmation text
 *    was using the pop up duration of the save menu confirmation.
 * 
 * Version 1.12: December 14, 2023
 * * Documentation Update!
 * ** Updated Plugin Command "Autosave: Enable/Disable" description for clarity
 * *** Enables/disables Autosave on a local (lowest) level.
 * ** Added extra text in the Plugin Commands help section for the Command:
 *    "Autosave: Enable/Disable":
 * *** This does NOT mean it will change autosaving for other loaded game saves
 *     or new game sessions.
 * *** This ONLY applies to the local session for the dev to control whether or
 *     not autosaving will occur at its usual conditions and scenarios.
 * 
 * Version 1.11: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug where there is not a soft fade in after using the single slot
 *    loading screen from the VisuMZ Save Core. Fix made by Olivia.
 * 
 * Version 1.10: June 15, 2023
 * * Bug Fixes!
 * ** Fixed a rare bug that prevents plugin commands from saving in the current
 *    save slot upon certain types of loading. Fix made by Arisu.
 * 
 * Version 1.09: February 10, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.08: December 16, 2021
 * * Bug Fixes!
 * ** Fixed default Plugin Parameters where the Autosave option was not
 *    properly working without the Options Core. Fix made by Olivia.
 * * Documentation Update!
 * ** Added further documentation on "Plugin Parameters: Style Settings"
 * ** Removal of "Start Enabled?" setting.
 * *** The "NEW!" text will not appear on auto save slots. This is intentional.
 * * Feature Update!
 * ** Plugin Parameter > Auto Save Settings > Start Enabled? is now removed.
 * *** This is due to it going against what RPG Maker MZ is supposed to behave
 *     like, causing potential misunderstandings when other autosave related
 *     features are utilized. Update made by Olivia.
 * 
 * Version 1.07: October 14, 2021
 * * Bug Fixes!
 * ** Fixed bugs caused by Core Engine's digit grouping that would make dates
 *    appear incorrectly. Fix made by Olivia.
 * 
 * Version 1.06: July 16, 2021
 * * Compatibility Update!
 * ** Compatibility update with Party System's max member change to fit a non-
 *    default amount of party members inside of the window. Update by Irina.
 * 
 * Version 1.05: May 14, 2021
 * * Feature Update!
 * ** Confirmation windows now have rounded coordinates to prevent distortions.
 *    Update made by Arisu.
 * 
 * Version 1.04: March 12, 2021
 * * Bug Fixes!
 * ** Fixed a bug where using the Plugin Command to save the current slot would
 *    not reload properly if the audio file BGM was not synched. Fix made by
 *    Arisu.
 * 
 * Version 1.03: November 29, 2020
 * * Bug Fixes!
 * ** Displayed month should now show the correct numeric value.
 *    Fix made by Arisu.
 * 
 * Version 1.02: September 13, 2020
 * * Compatibility Update!
 * ** Better compatibility for SV Actor graphics.
 * * Documentation Update!
 * ** The Plugin Command 'Save: Set Description' now has updated documentation
 *    for the text codes that are parsed on the local level.
 * * Feature Update!
 * ** The Plugin Command 'Save: Set Description' will now parse text code
 *    data for \V[x], \N[x], \P[x] on a local save file level. Feature updated
 *    by Yanfly.
 * 
 * Version 1.01: September 6, 2020
 * * Bug Fixes!
 * ** Disabling confirmation windows no longer cause crashes.
 *    Fix made by Yanfly.
 * ** Plugin Commands for for setting descriptions and save images work despite
 *    save settings found in the database. Fix made by Yanfly.
 * ** Save Core no longer crashes when going to the Save/Load scenes without
 *    the Core Engine enabled.
 * ** Single and Locked save styles no longer crash the game when loading.
 *    Fix made by Olivia.
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
 * @command AutosaveEnable
 * @text Autosave: Enable/Disable
 * @desc Requires Enables/disables Autosave on a local (lowest) level.
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @arg Enable:eval
 * @text Enable or Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable or disable autosave?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutosaveRequest
 * @text Autosave: (Stage 1) Request
 * @desc Autosaves the game at current point if enabled.
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutosaveExecute
 * @text Autosave: (Stage 2) Execute
 * @desc Executes autosaves the game at the current point.
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutosaveForce
 * @text Autosave: (Stage 3) Force
 * @desc Force autosaves the game at the current point.
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Save
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SaveCurrentSlot
 * @text Save: Current Slot
 * @desc Process the game's current save at the current point.
 * Must be outside of battle and on the map.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SaveDescription
 * @text Save: Set Description
 * @desc Set the description text that will appear in the save files.
 *
 * @arg Text:str
 * @text Text
 * @desc Insert desired save description text here. 
 * Text codes supported. \V[x], \N[x], \P[x] are save local.
 * @default Text
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SavePicture
 * @text Save: Set Picture
 * @desc Set the picture that would appear in the save file.
 *
 * @arg Filename:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc Input the filename here of the desired picture.
 * @default 
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
 * @param SaveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Save:struct
 * @text Save Settings
 * @type struct<Save>
 * @desc General save settings pertaining to the game.
 * @default {"General":"","SaveStyle:str":"standard","MaxSaveFiles:num":"20","AutosaveMaxCount:eval":"false","LocalMode":"","LocalMode:eval":"true","FilenameFmt:str":"file%1","ExtensionFmt:str":"%1.rmmzsave","ForageKey":"","KeyFmt:str":"rmmzsave.%1.%2","TestKey:str":"rmmzsave.test","Vocabulary":"","VocabLockedSaveSlot:str":"Pick a file to start a new game.","JavaScript":"","OnSaveSuccessJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnSaveFailureJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnLoadSuccessJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnLoadFailureJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\""}
 *
 * @param SaveConfirm:struct
 * @text Confirm Window
 * @parent Save:struct
 * @type struct<SaveConfirm>
 * @desc Settings regarding the Save Confirmation Window.
 * @default {"General":"","Enable:eval":"true","Duration:num":"1000","ConfirmRect:func":"\"const width = Graphics.boxWidth / 2;\\nconst height = this.calcWindowHeight(1, false);\\nconst x = (Graphics.width - width) / 2;\\nconst y = (Graphics.height - height) / 2;\\nreturn new Rectangle(x, y, width, height);\"","Vocabulary":"","VocabSaveSuccess:str":"Save Successful!","VocabSaveFailure:str":"Could not save!","VocabLoadFailure:str":"Could not load save file!"}
 *
 * @param Autosave:struct
 * @text Autoave Settings
 * @type struct<Autosave>
 * @desc Game settings related to autosave.
 * @default {"General":"","AutosaveType:str":"file0","StartEnabled:eval":"true","Requests":"","RequestsRequireSaveEnable:eval":"true","AfterBattle:eval":"true","AfterTransfer:eval":"true","AfterMenuCall:eval":"true","AfterExitMenu:eval":"true","JavaScript":"","OnAutosaveSuccessJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnAutosaveFailureJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\""}
 *
 * @param AutosaveConfirm:struct
 * @text Confirm Window
 * @parent Autosave:struct
 * @type struct<AutosaveConfirm>
 * @desc Settings regarding the Autosave Confirmation Window.
 * @default {"General":"","Enable:eval":"true","Duration:num":"1000","ScreenPosition:str":"lower right","Vocabulary":"","VocabAutosaveSuccess:str":"\\I[193]Autosaved!","VocabAutosaveFailure:str":"\\I[194]Autosave failed!"}
 *
 * @param AutosaveOption:struct
 * @text Options Settings
 * @parent Autosave:struct
 * @type struct<AutosaveOption>
 * @desc Options Menu settings regarding Autosave.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Autosave","Default:eval":"true"}
 *
 * @param StyleBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ActorGraphic:str
 * @text Actor Graphic
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler
 * @value svbattler
 * @desc Choose how the actor graphics appear in save menus.
 * @default face
 *
 * @param SaveMenuStyle:str
 * @text Save Menu Style
 * @type select
 * @option List
 * @value list
 * @option Vertical
 * @value vertical
 * @option Box
 * @value box
 * @option Large
 * @value large
 * @desc Choose what kind of style to use for the Save Menu.
 * @default box
 *
 * @param SaveMenu:struct
 * @text Style Settings
 * @parent SaveMenuStyle:str
 * @type struct<SaveMenu>
 * @desc Settings regarding the individual Save Menu styles.
 * @default {"General":"","LatestText:str":"NEW!","LatestColor:str":"#f49ac1","SpriteWidth:num":"48","SvBattlerWidth:num":"64","MakeSavefileInfoJS:func":"\"// Declare Constants\\nconst info = arguments[0];\\n\\n// Store Displayed Save Data\\ninfo.gold = $gameParty.gold();\\ninfo.svbattlers = $gameParty.svbattlersForSaveFile();\\ninfo.description = $gameSystem.getSaveDescription() || '';\\ninfo.picture = $gameSystem.getSavePicture() || '';\\n\\n// Return Save Info\\nreturn info;\"","List":"","ListRows:num":"4","ListCols:num":"1","ListContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = true;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nlet ch = rect.height;\\nif (this.actorStyle() === 'sprite') {\\n    ch -= lineHeight - 8;\\n} else if (this.actorStyle() === 'svbattler') {\\n    ch -= lineHeight - 12;\\n}\\nthis.drawActors(info, rect.x + padding, rect.y, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nif (info.gold || info.description) {\\n    const gy = rect.y + rect.height - lineHeight;\\n    this.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\\n}\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\ny = rect.y + rect.height - lineHeight;\\nif (info.gold) {\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\\n\\n// Draw Description\\ny = rect.y + rect.height - lineHeight;\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\"","ListFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst y2 = rect.y + ((rect.height - lineHeight) / 2);\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nthis.drawLatestMarker(savefileId, rect.x + padding, y2);\"","Vertical":"","VertRows:num":"1","VertCols:num":"3","VertContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = true;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\\nconst cy = rect.y + ((rect.height - ch) / 2);\\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight * 2;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\\n\\n// Draw Description\\ny = rect.y + lineHeight * 2;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\\nthis.resetWordWrap(false);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y + rect.height - lineHeight;\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\ny -= lineHeight;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\nif (info.gold) {\\n    y -= lineHeight;\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\"","VertFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\"","Box":"","BoxRows:num":"2","BoxCols:num":"3","BoxContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = false;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst rh = rect.height - lineHeight * 3;\\nconst ch = ImageManager.faceHeight;\\nconst cy = rect.y + ((rh - ch) / 2) + lineHeight;\\nthis.drawActors(info, rect.x + 1, cy, rect.width - 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight * 2;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y + lineHeight;\\nthis.contents.gradientFillRect(rect.x, y, rect.width, lineHeight, c2, c1, false);\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\ny += lineHeight;\\nconst hw = rect.width / 2;\\nthis.contents.gradientFillRect(rect.x + hw, y, hw, lineHeight, c2, c1, false);\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\nif (info.gold) {\\n    // Ignore drawing gold in this style\\n    // y = rect.y + rect.height - lineHeight * 3;\\n    // this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\\n\\n// Draw Description\\ny = rect.y + rect.height - lineHeight * 2;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\\nthis.resetWordWrap(false);\"","BoxFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\"","Large":"","LargeRows:num":"1","LargeCols:num":"1","LargeContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = false;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\\nconst cy = rect.y + ((rect.height - ch) / 2);\\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\\n\\n// Draw Description\\ny = rect.y + lineHeight * 1.5;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding * 4, y, rect.width - padding * 8, 'left');\\nthis.resetWordWrap(false);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\nthis.drawTimestamp(info, rect.x + padding, rect.y, rect.width - padding * 2, 'center');\\ny = rect.y + rect.height - lineHeight;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\nif (info.gold) {\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\"","LargeFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\""}
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
 * General Save Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Save:
 *
 * @param General
 *
 * @param SaveStyle:str
 * @text Save Style
 * @parent General
 * @type select
 * @option Standard: Save freely in any slot.
 * @value standard
 * @option Slot-Locked: Select one dedicated slot at New Game.
 * @value locked
 * @option Single: Only one slot is available for the game.
 * @value single
 * @desc Select a save style for the game. Some of these options
 * may alter other Plugin Parameter settings.
 * @default standard
 *
 * @param MaxSaveFiles:num
 * @text Max Save Files
 * @parent General
 * @desc Maximum number of save files for the game.
 * @default 20
 *
 * @param AutosaveMaxCount:eval
 * @text Autosave Counts?
 * @parent General
 * @type boolean
 * @on Counts Towards Max
 * @off Doesn't Count
 * @desc Count the autosave file towards the max count?
 * @default false
 *
 * @param LocalMode
 * @text Local Mode
 *
 * @param LocalMode:eval
 * @text Local Mode?
 * @parent LocalMode
 * @type boolean
 * @on Local File
 * @off Forage Key
 * @desc When running the game on client, use the Local Mode of
 * saving via files or store saves to forage keys?
 * @default true
 *
 * @param FilenameFmt:str
 * @text Filename Format
 * @parent LocalMode
 * @desc Filename format for save files.
 * %1 - Save File ID
 * @default file%1
 *
 * @param ExtensionFmt:str
 * @text Extension Format
 * @parent LocalMode
 * @desc Filename extension format for save files.
 * %1 - Save Name
 * @default %1.rmmzsave
 *
 * @param ForageKey
 * @text Forage Key
 *
 * @param KeyFmt:str
 * @text Forage Key Format
 * @parent ForageKey
 * @desc Forage Key format when saving to memory.
 * %1 - Game ID, %2 - Save Name
 * @default rmmzsave.%1.%2
 *
 * @param TestKey:str
 * @text Forage Key Test
 * @parent ForageKey
 * @desc Key used to test if saving a forage key is possible.
 * @default rmmzsave.test
 *
 * @param Vocabulary
 *
 * @param VocabLockedSaveSlot:str
 * @text Help: Slot-Locked
 * @parent Vocabulary
 * @desc Help description used for initial slot-locked selection.
 * @default Pick a file to start a new game.
 *
 * @param JavaScript
 *
 * @param OnSaveSuccessJS:func
 * @text JS: On Save Success
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a save is successful.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnSaveFailureJS:func
 * @text JS: On Save Failure
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a save has failed.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnLoadSuccessJS:func
 * @text JS: On Load Success
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a load is successful.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnLoadFailureJS:func
 * @text JS: On Load Failure
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a load has failed.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Confirm Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveConfirm:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable Window?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Enable the Save Confirmation Window?
 * @default true
 *
 * @param Duration:num
 * @text Pop Up Duration
 * @parent General
 * @type number
 * @min 1
 * @desc How long should the window be open for before closing?
 * Insert the time in milliseconds.
 * @default 1000
 *
 * @param ConfirmRect:func
 * @text JS: X, Y, W, H
 * @parent General
 * @type note
 * @desc Code used to determine the dimensions of the 
 * Save Confirmation Window.
 * @default "const width = Graphics.boxWidth / 2;\nconst height = this.calcWindowHeight(1, false);\nconst x = (Graphics.width - width) / 2;\nconst y = (Graphics.height - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Vocabulary
 *
 * @param VocabSaveSuccess:str
 * @text Pop Up: Save Success
 * @parent Vocabulary
 * @desc Text used for a "Save Success" message popup.
 * Text codes are allowed.
 * @default Save Successful!
 *
 * @param VocabSaveFailure:str
 * @text Pop Up: Save Failure
 * @parent Vocabulary
 * @desc Text used for a "Save Failure" message popup.
 * Text codes are allowed.
 * @default Could not save!
 *
 * @param VocabLoadFailure:str
 * @text Pop Up: Load Failure
 * @parent Vocabulary
 * @desc Text used for a "Load Failure" message popup.
 * Text codes are allowed.
 * @default Could not load save file!
 *
 */
/* ----------------------------------------------------------------------------
 * Autosave Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Autosave:
 *
 * @param General
 *
 * @param AutosaveType:str
 * @text Autosave Type
 * @parent General
 * @type select
 * @option Autosave File: Dedicated file for autosaves.
 * @value file0
 * @option Current File: Overwrites the current save file.
 * @value current
 * @option Autosave File + Current File: Both of the above.
 * @value both
 * @desc Select autosave type.
 * Requires Database => System 1 => [x] Enable Autosave
 * @default file0
 *
 * @param Requests
 *
 * @param RequestsRequireSaveEnable:eval
 * @text Requires Save Enable?
 * @parent Requests
 * @type boolean
 * @on Requires Save Enable
 * @off Doesn't Require
 * @desc Autosave requests require Saving to be enabled?
 * @default true
 *
 * @param AfterBattle:eval
 * @text Request after Battle?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after battle?
 * @default true
 *
 * @param AfterTransfer:eval
 * @text Request on Transfer?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after a map transfer?
 * @default true
 *
 * @param AfterMenuCall:eval
 * @text Request on Menu Open?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after opening the main menu?
 * @default true
 *
 * @param AfterExitMenu:eval
 * @text Request on Menu Exit?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after exiting the main menu?
 * @default true
 *
 * @param JavaScript
 *
 * @param OnAutosaveSuccessJS:func
 * @text JS: On Success
 * @parent JavaScript
 * @type note
 * @desc Code to perform when an autosave is successful.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnAutosaveFailureJS:func
 * @text JS: On Failure
 * @parent JavaScript
 * @type note
 * @desc Code to perform when an autosave has failed.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Autosave Confirm Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutosaveConfirm:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable Window?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Enable the Autoave Confirmation Window?
 * @default true
 *
 * @param Duration:num
 * @text Pop Up Duration
 * @parent General
 * @type number
 * @min 1
 * @desc How long should the window be open for before closing?
 * Insert the time in milliseconds.
 * @default 1000
 *
 * @param ScreenPosition:str
 * @text Screen Position
 * @parent General
 * @type select
 * @option Lower Left
 * @value lower left
 * @option Lower Center
 * @value lower center
 * @option Lower Right
 * @value lower right
 * @option Middle Left
 * @value middle left
 * @option Middle Center
 * @value middle center
 * @option Middle Right
 * @value middle right
 * @option Upper Left
 * @value upper left
 * @option Upper Center
 * @value upper center
 * @option Upper Right
 * @value upper right
 * @desc Where does this window appear on the screen?
 * @default lower right
 *
 * @param Vocabulary
 *
 * @param VocabAutosaveSuccess:str
 * @text Pop Up: Save Success
 * @parent Vocabulary
 * @desc Text used for an "Autosave Success" message popup.
 * Text codes are allowed.
 * @default \I[193]Autosaved!
 *
 * @param VocabAutosaveFailure:str
 * @text Pop Up: Save Failure
 * @parent Vocabulary
 * @desc Text used for an "Autosave Failure" message popup.
 * Text codes are allowed.
 * @default \I[194]Autosave failed!
 *
 */
/* ----------------------------------------------------------------------------
 * Autosave Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutosaveOption:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Autosave' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Autosave
 *
 * @param Default:eval
 * @text Default Value
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Determine the default value of this option.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Style Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param General
 *
 * @param LatestText:str
 * @text Latest Text
 * @parent General
 * @desc Text used to depict latest save file.
 * @default NEW!
 *
 * @param LatestColor:str
 * @text Latest Color
 * @parent General
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #f49ac1
 *
 * @param SpriteWidth:num
 * @text Sprite Width
 * @parent General
 * @type number
 * @desc Pixel width of map sprites when drawn in the Save Menu.
 * @default 48
 *
 * @param SvBattlerWidth:num
 * @text SV Battler Width
 * @parent General
 * @type number
 * @desc Pixel width of sv battlers when drawn in the Save Menu.
 * @default 64
 *
 * @param MakeSavefileInfoJS:func
 * @text JS: Save Display Info
 * @parent General
 * @type note
 * @desc Code that, upon saving, determines which info is quickly stored for displaying.
 * @default "// Declare Constants\nconst info = arguments[0];\n\n// Store Displayed Save Data\ninfo.gold = $gameParty.gold();\ninfo.svbattlers = $gameParty.svbattlersForSaveFile();\ninfo.description = $gameSystem.getSaveDescription() || '';\ninfo.picture = $gameSystem.getSavePicture() || '';\n\n// Return Save Info\nreturn info;"
 *
 * @param List
 * @text List Style
 *
 * @param ListRows:num
 * @text Rows
 * @parent List
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 4
 *
 * @param ListCols:num
 * @text Columns
 * @parent List
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 1
 *
 * @param ListContentsJS:func
 * @text JS: Draw Contents
 * @parent List
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = true;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nlet ch = rect.height;\nif (this.actorStyle() === 'sprite') {\n    ch -= lineHeight - 8;\n} else if (this.actorStyle() === 'svbattler') {\n    ch -= lineHeight - 12;\n}\nthis.drawActors(info, rect.x + padding, rect.y, rect.width - padding * 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nif (info.gold || info.description) {\n    const gy = rect.y + rect.height - lineHeight;\n    this.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\n}\n\n// Draw Data\nthis.contents.fontSize = 18;\ny = rect.y;\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\ny = rect.y + rect.height - lineHeight;\nif (info.gold) {\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}\n\n// Draw Description\ny = rect.y + rect.height - lineHeight;\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');"
 *
 * @param ListFileDataJS:func
 * @text JS: Draw File Data
 * @parent List
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst y2 = rect.y + ((rect.height - lineHeight) / 2);\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nthis.drawLatestMarker(savefileId, rect.x + padding, y2);"
 *
 * @param Vertical
 * @text Vertical Style
 *
 * @param VertRows:num
 * @text Rows
 * @parent Vertical
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 1
 *
 * @param VertCols:num
 * @text Columns
 * @parent Vertical
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 3
 *
 * @param VertContentsJS:func
 * @text JS: Draw Contents
 * @parent Vertical
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = true;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\nconst cy = rect.y + ((rect.height - ch) / 2);\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nconst gy = rect.y + rect.height - lineHeight * 2;\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\n\n// Draw Description\ny = rect.y + lineHeight * 2;\nthis.setWordWrap(true);\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\nthis.resetWordWrap(false);\n\n// Draw Data\nthis.contents.fontSize = 18;\ny = rect.y + rect.height - lineHeight;\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\ny -= lineHeight;\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\nif (info.gold) {\n    y -= lineHeight;\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}"
 *
 * @param VertFileDataJS:func
 * @text JS: Draw File Data
 * @parent Vertical
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\nthis.drawLatestMarker(savefileId, x2, rect.y);"
 *
 * @param Box
 * @text Box Style
 *
 * @param BoxRows:num
 * @text Rows
 * @parent Box
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 2
 *
 * @param BoxCols:num
 * @text Columns
 * @parent Box
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 3
 *
 * @param BoxContentsJS:func
 * @text JS: Draw Contents
 * @parent Box
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = false;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nconst rh = rect.height - lineHeight * 3;\nconst ch = ImageManager.faceHeight;\nconst cy = rect.y + ((rh - ch) / 2) + lineHeight;\nthis.drawActors(info, rect.x + 1, cy, rect.width - 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nconst gy = rect.y + rect.height - lineHeight * 2;\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\n\n// Draw Data\nthis.contents.fontSize = 18;\ny = rect.y + lineHeight;\nthis.contents.gradientFillRect(rect.x, y, rect.width, lineHeight, c2, c1, false);\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'right');\ny += lineHeight;\nconst hw = rect.width / 2;\nthis.contents.gradientFillRect(rect.x + hw, y, hw, lineHeight, c2, c1, false);\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\nif (info.gold) {\n    // Ignore drawing gold in this style\n    // y = rect.y + rect.height - lineHeight * 3;\n    // this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}\n\n// Draw Description\ny = rect.y + rect.height - lineHeight * 2;\nthis.setWordWrap(true);\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\nthis.resetWordWrap(false);"
 *
 * @param BoxFileDataJS:func
 * @text JS: Draw File Data
 * @parent Box
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\nthis.drawLatestMarker(savefileId, x2, rect.y);"
 *
 * @param Large
 * @text Large Style
 *
 * @param LargeRows:num
 * @text Rows
 * @parent Large
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 1
 *
 * @param LargeCols:num
 * @text Columns
 * @parent Large
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 1
 *
 * @param LargeContentsJS:func
 * @text JS: Draw Contents
 * @parent Large
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = false;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\nconst cy = rect.y + ((rect.height - ch) / 2);\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nconst gy = rect.y + rect.height - lineHeight;\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\n\n// Draw Description\ny = rect.y + lineHeight * 1.5;\nthis.setWordWrap(true);\nthis.drawDescription(info, rect.x + padding * 4, y, rect.width - padding * 8, 'left');\nthis.resetWordWrap(false);\n\n// Draw Data\nthis.contents.fontSize = 18;\nthis.drawTimestamp(info, rect.x + padding, rect.y, rect.width - padding * 2, 'center');\ny = rect.y + rect.height - lineHeight;\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\nif (info.gold) {\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}"
 *
 * @param LargeFileDataJS:func
 * @text JS: Draw File Data
 * @parent Large
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\nthis.drawLatestMarker(savefileId, x2, rect.y);"
 *
 */
//=============================================================================

const _0x75a59f=_0x27a8;function _0x27a8(_0x255abd,_0x530ebd){const _0x30ecb6=_0x30ec();return _0x27a8=function(_0x27a838,_0xbebae4){_0x27a838=_0x27a838-0xbb;let _0x5b3f1b=_0x30ecb6[_0x27a838];return _0x5b3f1b;},_0x27a8(_0x255abd,_0x530ebd);}(function(_0x1e6a9e,_0x3bd3ed){const _0x56a15a=_0x27a8,_0x44ae6a=_0x1e6a9e();while(!![]){try{const _0x5dff81=-parseInt(_0x56a15a(0x1dc))/0x1+-parseInt(_0x56a15a(0x1b2))/0x2*(parseInt(_0x56a15a(0x1a2))/0x3)+-parseInt(_0x56a15a(0x1c0))/0x4+parseInt(_0x56a15a(0x219))/0x5+parseInt(_0x56a15a(0x19b))/0x6*(-parseInt(_0x56a15a(0xc8))/0x7)+-parseInt(_0x56a15a(0x214))/0x8*(-parseInt(_0x56a15a(0x199))/0x9)+-parseInt(_0x56a15a(0x153))/0xa*(-parseInt(_0x56a15a(0x19e))/0xb);if(_0x5dff81===_0x3bd3ed)break;else _0x44ae6a['push'](_0x44ae6a['shift']());}catch(_0x2f1303){_0x44ae6a['push'](_0x44ae6a['shift']());}}}(_0x30ec,0x7e0c5));var label=_0x75a59f(0x124),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x75a59f(0x229)](function(_0x19da97){const _0x385538=_0x75a59f;return _0x19da97[_0x385538(0x241)]&&_0x19da97[_0x385538(0x163)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x75a59f(0x1de)]=VisuMZ[label][_0x75a59f(0x1de)]||{},VisuMZ['ConvertParams']=function(_0x6e0d9d,_0x23453d){const _0x3bafeb=_0x75a59f;for(const _0x3f0713 in _0x23453d){if(_0x3f0713[_0x3bafeb(0x154)](/(.*):(.*)/i)){const _0x3fd97f=String(RegExp['$1']),_0x3d1679=String(RegExp['$2'])[_0x3bafeb(0x1f7)]()[_0x3bafeb(0x15e)]();let _0x5446c7,_0x48f1ac,_0x1c8d41;switch(_0x3d1679){case'NUM':_0x5446c7=_0x23453d[_0x3f0713]!==''?Number(_0x23453d[_0x3f0713]):0x0;break;case _0x3bafeb(0xf7):_0x48f1ac=_0x23453d[_0x3f0713]!==''?JSON['parse'](_0x23453d[_0x3f0713]):[],_0x5446c7=_0x48f1ac[_0x3bafeb(0x12f)](_0x55b7b9=>Number(_0x55b7b9));break;case _0x3bafeb(0xda):_0x5446c7=_0x23453d[_0x3f0713]!==''?eval(_0x23453d[_0x3f0713]):null;break;case'ARRAYEVAL':_0x48f1ac=_0x23453d[_0x3f0713]!==''?JSON[_0x3bafeb(0x1fb)](_0x23453d[_0x3f0713]):[],_0x5446c7=_0x48f1ac[_0x3bafeb(0x12f)](_0x5055a8=>eval(_0x5055a8));break;case _0x3bafeb(0x142):_0x5446c7=_0x23453d[_0x3f0713]!==''?JSON[_0x3bafeb(0x1fb)](_0x23453d[_0x3f0713]):'';break;case _0x3bafeb(0x23a):_0x48f1ac=_0x23453d[_0x3f0713]!==''?JSON[_0x3bafeb(0x1fb)](_0x23453d[_0x3f0713]):[],_0x5446c7=_0x48f1ac['map'](_0x383aac=>JSON['parse'](_0x383aac));break;case _0x3bafeb(0xe5):_0x5446c7=_0x23453d[_0x3f0713]!==''?new Function(JSON[_0x3bafeb(0x1fb)](_0x23453d[_0x3f0713])):new Function(_0x3bafeb(0x207));break;case _0x3bafeb(0x20d):_0x48f1ac=_0x23453d[_0x3f0713]!==''?JSON[_0x3bafeb(0x1fb)](_0x23453d[_0x3f0713]):[],_0x5446c7=_0x48f1ac[_0x3bafeb(0x12f)](_0x3b3fc1=>new Function(JSON[_0x3bafeb(0x1fb)](_0x3b3fc1)));break;case _0x3bafeb(0x134):_0x5446c7=_0x23453d[_0x3f0713]!==''?String(_0x23453d[_0x3f0713]):'';break;case _0x3bafeb(0x140):_0x48f1ac=_0x23453d[_0x3f0713]!==''?JSON[_0x3bafeb(0x1fb)](_0x23453d[_0x3f0713]):[],_0x5446c7=_0x48f1ac[_0x3bafeb(0x12f)](_0x1abed5=>String(_0x1abed5));break;case _0x3bafeb(0x21f):_0x1c8d41=_0x23453d[_0x3f0713]!==''?JSON[_0x3bafeb(0x1fb)](_0x23453d[_0x3f0713]):{},_0x6e0d9d[_0x3fd97f]={},VisuMZ[_0x3bafeb(0x144)](_0x6e0d9d[_0x3fd97f],_0x1c8d41);continue;case _0x3bafeb(0x244):_0x48f1ac=_0x23453d[_0x3f0713]!==''?JSON[_0x3bafeb(0x1fb)](_0x23453d[_0x3f0713]):[],_0x5446c7=_0x48f1ac[_0x3bafeb(0x12f)](_0x27c16a=>VisuMZ[_0x3bafeb(0x144)]({},JSON['parse'](_0x27c16a)));break;default:continue;}_0x6e0d9d[_0x3fd97f]=_0x5446c7;}}return _0x6e0d9d;},(_0x5c6aea=>{const _0x2ee111=_0x75a59f,_0x5a4c0e=_0x5c6aea[_0x2ee111(0x218)];for(const _0x155e6f of dependencies){if(!Imported[_0x155e6f]){alert(_0x2ee111(0x164)[_0x2ee111(0x1b9)](_0x5a4c0e,_0x155e6f)),SceneManager[_0x2ee111(0x1c4)]();break;}}const _0x128ef6=_0x5c6aea[_0x2ee111(0x163)];if(_0x128ef6[_0x2ee111(0x154)](/\[Version[ ](.*?)\]/i)){const _0x322019=Number(RegExp['$1']);_0x322019!==VisuMZ[label][_0x2ee111(0x250)]&&(alert(_0x2ee111(0xf5)[_0x2ee111(0x1b9)](_0x5a4c0e,_0x322019)),SceneManager[_0x2ee111(0x1c4)]());}if(_0x128ef6[_0x2ee111(0x154)](/\[Tier[ ](\d+)\]/i)){const _0x356227=Number(RegExp['$1']);_0x356227<tier?(alert(_0x2ee111(0x1b6)[_0x2ee111(0x1b9)](_0x5a4c0e,_0x356227,tier)),SceneManager[_0x2ee111(0x1c4)]()):tier=Math[_0x2ee111(0x23e)](_0x356227,tier);}VisuMZ[_0x2ee111(0x144)](VisuMZ[label][_0x2ee111(0x1de)],_0x5c6aea[_0x2ee111(0x1f6)]);})(pluginData),PluginManager[_0x75a59f(0x145)](pluginData[_0x75a59f(0x218)],_0x75a59f(0x18a),_0x3c29e2=>{const _0x3ea06d=_0x75a59f;if(!DataManager[_0x3ea06d(0x1a8)]())return;VisuMZ[_0x3ea06d(0x144)](_0x3c29e2,_0x3c29e2);if($gameSystem)$gameSystem['enableAutosave'](_0x3c29e2[_0x3ea06d(0x1ee)]);}),PluginManager[_0x75a59f(0x145)](pluginData['name'],_0x75a59f(0x12c),_0x3a5ef0=>{const _0x4a39eb=_0x75a59f;if(!DataManager[_0x4a39eb(0x1a8)]()||$gameParty[_0x4a39eb(0xd6)]())return;SceneManager['_scene'][_0x4a39eb(0x212)]();}),PluginManager['registerCommand'](pluginData[_0x75a59f(0x218)],'AutosaveExecute',_0x41b8a3=>{const _0xd89722=_0x75a59f;if(!DataManager[_0xd89722(0x1a8)]()||$gameParty[_0xd89722(0xd6)]())return;SceneManager[_0xd89722(0x101)][_0xd89722(0x24d)]();}),PluginManager['registerCommand'](pluginData[_0x75a59f(0x218)],_0x75a59f(0xc4),_0x5c18e2=>{const _0x44c5d0=_0x75a59f;if(!DataManager[_0x44c5d0(0x1a8)]()||$gameParty['inBattle']())return;SceneManager[_0x44c5d0(0x101)][_0x44c5d0(0x1a4)]();}),PluginManager[_0x75a59f(0x145)](pluginData[_0x75a59f(0x218)],_0x75a59f(0xbf),_0x33c0fc=>{const _0x2ee425=_0x75a59f;SceneManager[_0x2ee425(0x101)][_0x2ee425(0x11e)]();}),PluginManager[_0x75a59f(0x145)](pluginData[_0x75a59f(0x218)],'SaveDescription',_0x1ceb88=>{const _0x2318ef=_0x75a59f;VisuMZ[_0x2318ef(0x144)](_0x1ceb88,_0x1ceb88);if($gameSystem)$gameSystem[_0x2318ef(0x148)](_0x1ceb88[_0x2318ef(0x120)]);}),PluginManager[_0x75a59f(0x145)](pluginData['name'],_0x75a59f(0x170),_0x5783df=>{const _0x3e93b3=_0x75a59f;VisuMZ[_0x3e93b3(0x144)](_0x5783df,_0x5783df);if($gameSystem)$gameSystem[_0x3e93b3(0xcd)](_0x5783df[_0x3e93b3(0xe2)]);}),VisuMZ[_0x75a59f(0x124)][_0x75a59f(0x14e)]=Scene_Boot[_0x75a59f(0x12e)]['onDatabaseLoaded'],Scene_Boot[_0x75a59f(0x12e)][_0x75a59f(0xf0)]=function(){const _0x1ef5a2=_0x75a59f;VisuMZ[_0x1ef5a2(0x124)][_0x1ef5a2(0x14e)][_0x1ef5a2(0x1cd)](this),this[_0x1ef5a2(0x18e)](),this[_0x1ef5a2(0x1fd)]();},Scene_Boot[_0x75a59f(0x12e)][_0x75a59f(0x18e)]=function(){const _0x3df0cb=_0x75a59f;StorageManager[_0x3df0cb(0x1e7)]()===_0x3df0cb(0x1ec)&&($dataSystem['optAutosave']=!![]);},VisuMZ['GlobalSwitches']=[],VisuMZ[_0x75a59f(0xdc)]=[],Scene_Boot[_0x75a59f(0x12e)]['process_VisuMZ_SaveCore_Switches_Variables']=function(){const _0x10247b=_0x75a59f;for(let _0xf02887=0x1;_0xf02887<$dataSystem[_0x10247b(0x16a)][_0x10247b(0x1bb)];_0xf02887++){if($dataSystem[_0x10247b(0x16a)][_0xf02887][_0x10247b(0x154)](/<GLOBAL>/i))VisuMZ[_0x10247b(0x190)][_0x10247b(0x1cc)](_0xf02887);}for(let _0x3ec314=0x1;_0x3ec314<$dataSystem['variables']['length'];_0x3ec314++){if($dataSystem['variables'][_0x3ec314]['match'](/<GLOBAL>/i))VisuMZ['GlobalVariables'][_0x10247b(0x1cc)](_0x3ec314);}},VisuMZ[_0x75a59f(0x124)][_0x75a59f(0x138)]=DataManager['createGameObjects'],DataManager[_0x75a59f(0x193)]=function(){const _0x356a06=_0x75a59f;VisuMZ[_0x356a06(0x124)][_0x356a06(0x138)][_0x356a06(0x1cd)](this),Scene_File[_0x356a06(0x208)]=$gameParty[_0x356a06(0xc0)]();},DataManager[_0x75a59f(0x1a8)]=function(){const _0x4729a5=_0x75a59f;return!DataManager[_0x4729a5(0x13f)]()&&!DataManager[_0x4729a5(0x150)]()&&$dataSystem['optAutosave'];},DataManager[_0x75a59f(0x1c6)]=function(){const _0x33c63a=_0x75a59f;if(StorageManager[_0x33c63a(0x1e7)]()===_0x33c63a(0x1ec))return 0x1;let _0x2bb8c6=VisuMZ[_0x33c63a(0x124)][_0x33c63a(0x1de)][_0x33c63a(0x179)][_0x33c63a(0x200)]?0x0:0x1;return VisuMZ[_0x33c63a(0x124)][_0x33c63a(0x1de)][_0x33c63a(0x179)][_0x33c63a(0x19a)]+_0x2bb8c6;},DataManager['makeSavename']=function(_0xf4adc4){const _0x2203cb=_0x75a59f,_0x83e653=VisuMZ[_0x2203cb(0x124)][_0x2203cb(0x1de)][_0x2203cb(0x179)][_0x2203cb(0x178)];return _0x83e653[_0x2203cb(0x1b9)](_0xf4adc4);},VisuMZ[_0x75a59f(0x124)][_0x75a59f(0x1e8)]=DataManager[_0x75a59f(0x122)],DataManager[_0x75a59f(0x122)]=function(){const _0x3435bc=_0x75a59f,_0x446ae9=VisuMZ[_0x3435bc(0x124)]['DataManager_makeSavefileInfo'][_0x3435bc(0x1cd)](this);return VisuMZ[_0x3435bc(0x124)]['Settings']['SaveMenu'][_0x3435bc(0x23f)]['call'](this,_0x446ae9);},VisuMZ[_0x75a59f(0x124)][_0x75a59f(0x1bd)]=DataManager[_0x75a59f(0xde)],DataManager['loadAllSavefileImages']=function(){const _0x271d24=_0x75a59f;VisuMZ[_0x271d24(0x124)]['DataManager_loadAllSavefileImages'][_0x271d24(0x1cd)](this),this[_0x271d24(0xe1)]();},DataManager[_0x75a59f(0xe1)]=function(){const _0x425a25=_0x75a59f;for(const _0xc4f95b of $gameParty[_0x425a25(0x184)]()){_0xc4f95b[_0x425a25(0x151)]()&&ImageManager[_0x425a25(0x1a7)](_0xc4f95b['faceName']()),_0xc4f95b[_0x425a25(0xe8)]()&&ImageManager[_0x425a25(0x20a)](_0xc4f95b['characterName']()),_0xc4f95b[_0x425a25(0x131)]()&&ImageManager[_0x425a25(0x1c1)](_0xc4f95b[_0x425a25(0x131)]());}},ConfigManager[_0x75a59f(0x16e)]=VisuMZ[_0x75a59f(0x124)][_0x75a59f(0x1de)]['AutosaveOption']['Default'],ConfigManager['globalSwitches']=[],ConfigManager['globalVariables']=[],VisuMZ[_0x75a59f(0x124)][_0x75a59f(0x20e)]=ConfigManager[_0x75a59f(0x1dd)],ConfigManager['makeData']=function(){const _0x190436=_0x75a59f,_0x4229db=VisuMZ[_0x190436(0x124)][_0x190436(0x20e)]['call'](this);return _0x4229db[_0x190436(0x16e)]=this['autosave']||VisuMZ[_0x190436(0x124)]['Settings'][_0x190436(0x228)]['Default'],_0x4229db['globalSwitches']=this[_0x190436(0xfc)]||[],_0x4229db[_0x190436(0x240)]=this[_0x190436(0x240)]||[],_0x4229db;},VisuMZ[_0x75a59f(0x124)][_0x75a59f(0x107)]=ConfigManager['applyData'],ConfigManager['applyData']=function(_0x47a1f6){const _0x2d0897=_0x75a59f;VisuMZ[_0x2d0897(0x124)][_0x2d0897(0x107)][_0x2d0897(0x1cd)](this,_0x47a1f6),this['autosave']=_0x47a1f6['autosave']!==undefined?_0x47a1f6[_0x2d0897(0x16e)]:VisuMZ[_0x2d0897(0x124)][_0x2d0897(0x1de)][_0x2d0897(0x228)]['Default'],this[_0x2d0897(0xfc)]=_0x47a1f6['globalSwitches']||[],this[_0x2d0897(0x240)]=_0x47a1f6['globalVariables']||[];},StorageManager['isLocalMode']=function(){const _0x576881=_0x75a59f;return Utils['isNwjs']()?VisuMZ['SaveCore'][_0x576881(0x1de)][_0x576881(0x179)][_0x576881(0x220)]:![];},StorageManager['filePath']=function(_0x2d1374){const _0x4205df=_0x75a59f,_0x267dfa=this['fileDirectoryPath'](),_0x5118c0=VisuMZ[_0x4205df(0x124)][_0x4205df(0x1de)][_0x4205df(0x179)]['ExtensionFmt'];return _0x267dfa+_0x5118c0[_0x4205df(0x1b9)](_0x2d1374);},StorageManager['forageKey']=function(_0x41ecaf){const _0x48fe14=_0x75a59f,_0x723c4d=$dataSystem[_0x48fe14(0x18f)][_0x48fe14(0x1cf)],_0xe7a7f5=VisuMZ['SaveCore'][_0x48fe14(0x1de)][_0x48fe14(0x179)][_0x48fe14(0x174)];return _0xe7a7f5[_0x48fe14(0x1b9)](_0x723c4d,_0x41ecaf);},StorageManager[_0x75a59f(0x186)]=function(){const _0x351e65=_0x75a59f;return VisuMZ[_0x351e65(0x124)][_0x351e65(0x1de)][_0x351e65(0x179)][_0x351e65(0x1fe)];},StorageManager[_0x75a59f(0x1e7)]=function(){const _0x49a136=_0x75a59f;return VisuMZ[_0x49a136(0x124)][_0x49a136(0x1de)]['Save'][_0x49a136(0x1ae)];},StorageManager[_0x75a59f(0x1f5)]=function(){const _0x5aeba4=_0x75a59f;return this[_0x5aeba4(0x1e7)]()===_0x5aeba4(0x1ec)?_0x5aeba4(0x1da):VisuMZ['SaveCore']['Settings'][_0x5aeba4(0x167)][_0x5aeba4(0xd9)];},TextManager[_0x75a59f(0x116)]=VisuMZ['SaveCore'][_0x75a59f(0x1de)][_0x75a59f(0x179)][_0x75a59f(0x161)],TextManager['saveSuccess']=VisuMZ[_0x75a59f(0x124)][_0x75a59f(0x1de)][_0x75a59f(0x1e2)][_0x75a59f(0xe7)],TextManager[_0x75a59f(0x1c7)]=VisuMZ['SaveCore'][_0x75a59f(0x1de)]['SaveConfirm'][_0x75a59f(0x175)],TextManager[_0x75a59f(0x234)]=VisuMZ['SaveCore']['Settings'][_0x75a59f(0x1e2)][_0x75a59f(0x233)],TextManager[_0x75a59f(0x1e9)]=VisuMZ[_0x75a59f(0x124)][_0x75a59f(0x1de)]['AutosaveOption'][_0x75a59f(0x166)],TextManager[_0x75a59f(0x19c)]=VisuMZ[_0x75a59f(0x124)][_0x75a59f(0x1de)][_0x75a59f(0x1c9)][_0x75a59f(0x169)],TextManager[_0x75a59f(0x210)]=VisuMZ[_0x75a59f(0x124)][_0x75a59f(0x1de)][_0x75a59f(0x1c9)]['VocabAutosaveFailure'],TextManager[_0x75a59f(0xf1)]=VisuMZ[_0x75a59f(0x124)][_0x75a59f(0x1de)][_0x75a59f(0x1cb)][_0x75a59f(0x213)],ColorManager[_0x75a59f(0x192)]=function(){const _0x30948d=_0x75a59f,_0x16b807=_0x30948d(0x209);this[_0x30948d(0xe0)]=this[_0x30948d(0xe0)]||{};if(this[_0x30948d(0xe0)][_0x16b807])return this[_0x30948d(0xe0)][_0x16b807];const _0x57f945=VisuMZ['SaveCore'][_0x30948d(0x1de)][_0x30948d(0x1cb)]['LatestColor'];return this[_0x30948d(0x19d)](_0x16b807,_0x57f945);},ColorManager[_0x75a59f(0x19d)]=function(_0x76f653,_0xf2b095){const _0x4a8385=_0x75a59f;return _0xf2b095=String(_0xf2b095),this[_0x4a8385(0xe0)]=this[_0x4a8385(0xe0)]||{},_0xf2b095[_0x4a8385(0x154)](/#(.*)/i)?this[_0x4a8385(0xe0)][_0x76f653]=_0x4a8385(0xfa)['format'](String(RegExp['$1'])):this['_colorCache'][_0x76f653]=this[_0x4a8385(0x226)](Number(_0xf2b095)),this[_0x4a8385(0xe0)][_0x76f653];},VisuMZ['SaveCore'][_0x75a59f(0xc5)]=Game_System[_0x75a59f(0x12e)]['initialize'],Game_System[_0x75a59f(0x12e)]['initialize']=function(){const _0x317812=_0x75a59f;VisuMZ[_0x317812(0x124)][_0x317812(0xc5)]['call'](this),this[_0x317812(0x11c)]();},Game_System['prototype'][_0x75a59f(0x11c)]=function(){const _0x1c4ba7=_0x75a59f;this[_0x1c4ba7(0x21c)]={'autosaveEnabled':!![],'saveDescription':'','savePicture':''};},Game_System[_0x75a59f(0x12e)][_0x75a59f(0x106)]=function(){const _0x34518d=_0x75a59f;if(!$dataSystem[_0x34518d(0xbb)])return![];if(this[_0x34518d(0x21c)]===undefined)this['initSaveCore']();if(this[_0x34518d(0x21c)]['autosaveEnabled']===undefined)this[_0x34518d(0x11c)]();return this['_SaveCoreSettings'][_0x34518d(0x10f)];},Game_System[_0x75a59f(0x12e)][_0x75a59f(0x246)]=function(_0x3623ef){const _0x33c330=_0x75a59f;if(!$dataSystem[_0x33c330(0xbb)])return;if(this[_0x33c330(0x21c)]===undefined)this['initSaveCore']();if(this[_0x33c330(0x21c)][_0x33c330(0x10f)]===undefined)this[_0x33c330(0x11c)]();this['_SaveCoreSettings']['autosaveEnabled']=_0x3623ef;},Game_System[_0x75a59f(0x12e)]['getSaveDescription']=function(){const _0x22dfd8=_0x75a59f;if(this[_0x22dfd8(0x21c)]===undefined)this[_0x22dfd8(0x11c)]();if(this['_SaveCoreSettings']['saveDescription']===undefined)this['initSaveCore']();return this[_0x22dfd8(0x21c)]['saveDescription'];},Game_System[_0x75a59f(0x12e)][_0x75a59f(0x148)]=function(_0xd813ea){const _0x75b25=_0x75a59f;if(this[_0x75b25(0x21c)]===undefined)this[_0x75b25(0x11c)]();if(this[_0x75b25(0x21c)][_0x75b25(0x14d)]===undefined)this[_0x75b25(0x11c)]();this['_SaveCoreSettings'][_0x75b25(0x14d)]=VisuMZ[_0x75b25(0x124)]['ParseTextCodes'](_0xd813ea);},VisuMZ[_0x75a59f(0x124)]['ParseTextCodes']=function(_0x13d433){const _0x5f5d45=_0x75a59f;while(_0x13d433[_0x5f5d45(0x154)](/\\V\[(\d+)\]/gi)){_0x13d433=_0x13d433[_0x5f5d45(0x206)](/\\V\[(\d+)\]/gi,(_0x320ed5,_0x485463)=>$gameVariables['value'](parseInt(_0x485463)));}while(_0x13d433['match'](/\\N\[(\d+)\]/gi)){_0x13d433=_0x13d433[_0x5f5d45(0x206)](/\\N\[(\d+)\]/gi,(_0x2d0c7f,_0x304142)=>Window_Base[_0x5f5d45(0x12e)][_0x5f5d45(0x22d)](parseInt(_0x304142)));}while(_0x13d433[_0x5f5d45(0x154)](/\\P\[(\d+)\]/gi)){_0x13d433=_0x13d433[_0x5f5d45(0x206)](/\\P\[(\d+)\]/gi,(_0x2253f2,_0x3969f3)=>Window_Base[_0x5f5d45(0x12e)][_0x5f5d45(0x1fa)](parseInt(_0x3969f3)));}return _0x13d433;},Game_System[_0x75a59f(0x12e)][_0x75a59f(0x1b5)]=function(){const _0x149bde=_0x75a59f;if(this[_0x149bde(0x21c)]===undefined)this[_0x149bde(0x11c)]();if(this['_SaveCoreSettings']['savePicture']===undefined)this[_0x149bde(0x11c)]();return this[_0x149bde(0x21c)][_0x149bde(0x177)];},Game_System[_0x75a59f(0x12e)][_0x75a59f(0xcd)]=function(_0x505870){const _0x486fdc=_0x75a59f;if(this[_0x486fdc(0x21c)]===undefined)this[_0x486fdc(0x11c)]();if(this[_0x486fdc(0x21c)][_0x486fdc(0x177)]===undefined)this[_0x486fdc(0x11c)]();this['_SaveCoreSettings'][_0x486fdc(0x177)]=_0x505870;},VisuMZ[_0x75a59f(0x124)][_0x75a59f(0x203)]=Game_System[_0x75a59f(0x12e)]['savefileId'],Game_System['prototype'][_0x75a59f(0x22b)]=function(){const _0x32448f=_0x75a59f,_0x5d9769=StorageManager[_0x32448f(0x1e7)]();switch(_0x5d9769){case'locked':return VisuMZ[_0x32448f(0x124)][_0x32448f(0x203)][_0x32448f(0x1cd)](this)||0x1;break;case _0x32448f(0x1ec):return 0x0;break;default:return VisuMZ['SaveCore'][_0x32448f(0x203)]['call'](this);break;}},VisuMZ['SaveCore']['Game_System_onAfterLoad']=Game_System['prototype'][_0x75a59f(0x197)],Game_System[_0x75a59f(0x12e)]['onAfterLoad']=function(){const _0x155623=_0x75a59f;VisuMZ[_0x155623(0x124)]['Game_System_onAfterLoad'][_0x155623(0x1cd)](this);if($gameMap&&Imported[_0x155623(0xff)])$gameMap['clearEventCache']();const _0x1c2b39=VisuMZ[_0x155623(0x124)][_0x155623(0x1de)]['SaveConfirm'][_0x155623(0x16f)];setTimeout(VisuMZ[_0x155623(0x124)][_0x155623(0xc7)][_0x155623(0xc9)](this),_0x1c2b39+0xa);},Game_Switches[_0x75a59f(0x12e)][_0x75a59f(0xf9)]=function(_0x1b8056){const _0x2adc91=_0x75a59f;return $dataSystem[_0x2adc91(0x16a)][_0x1b8056]&&VisuMZ[_0x2adc91(0x190)]['includes'](_0x1b8056);},VisuMZ[_0x75a59f(0x124)][_0x75a59f(0x108)]=Game_Switches['prototype'][_0x75a59f(0x173)],Game_Switches['prototype'][_0x75a59f(0x173)]=function(_0x59450f){const _0x3e49b6=_0x75a59f;return this[_0x3e49b6(0xf9)](_0x59450f)?this[_0x3e49b6(0x15b)](_0x59450f):VisuMZ[_0x3e49b6(0x124)]['Game_Switches_value']['call'](this,_0x59450f);},Game_Switches['prototype'][_0x75a59f(0x15b)]=function(_0x52028a){const _0x3cbb20=_0x75a59f;return ConfigManager[_0x3cbb20(0xfc)]=ConfigManager[_0x3cbb20(0xfc)]||[],!!ConfigManager['globalSwitches'][_0x52028a];},VisuMZ[_0x75a59f(0x124)][_0x75a59f(0x143)]=Game_Switches[_0x75a59f(0x12e)]['setValue'],Game_Switches[_0x75a59f(0x12e)][_0x75a59f(0x11a)]=function(_0x2683b1,_0xe1ab6b){const _0x16c86e=_0x75a59f;if(this[_0x16c86e(0xf9)](_0x2683b1))this[_0x16c86e(0x1b1)](_0x2683b1,_0xe1ab6b);VisuMZ[_0x16c86e(0x124)][_0x16c86e(0x143)][_0x16c86e(0x1cd)](this,_0x2683b1,_0xe1ab6b);},Game_Switches['prototype'][_0x75a59f(0x1b1)]=function(_0x22ccfd,_0x40c9a8){const _0x5d9158=_0x75a59f;_0x22ccfd>0x0&&_0x22ccfd<$dataSystem['switches'][_0x5d9158(0x1bb)]&&(ConfigManager[_0x5d9158(0xfc)]=ConfigManager['globalSwitches']||[],ConfigManager[_0x5d9158(0xfc)][_0x22ccfd]=_0x40c9a8,ConfigManager[_0x5d9158(0x1d9)]());},Game_Variables[_0x75a59f(0x12e)][_0x75a59f(0xf9)]=function(_0x34c045){const _0x16ae7f=_0x75a59f;return $dataSystem[_0x16ae7f(0x237)][_0x34c045]&&VisuMZ[_0x16ae7f(0xdc)]['includes'](_0x34c045);},VisuMZ[_0x75a59f(0x124)][_0x75a59f(0xbe)]=Game_Variables[_0x75a59f(0x12e)][_0x75a59f(0x173)],Game_Variables['prototype'][_0x75a59f(0x173)]=function(_0x4eeaf2){const _0x184707=_0x75a59f;return this[_0x184707(0xf9)](_0x4eeaf2)?this[_0x184707(0x15b)](_0x4eeaf2):VisuMZ[_0x184707(0x124)][_0x184707(0xbe)][_0x184707(0x1cd)](this,_0x4eeaf2);},Game_Variables[_0x75a59f(0x12e)][_0x75a59f(0x15b)]=function(_0x50db05){const _0x4c92f1=_0x75a59f;return ConfigManager[_0x4c92f1(0x240)]=ConfigManager[_0x4c92f1(0x240)]||[],ConfigManager['globalVariables'][_0x50db05]===undefined&&(ConfigManager[_0x4c92f1(0x240)][_0x50db05]=0x0),ConfigManager[_0x4c92f1(0x240)][_0x50db05];},VisuMZ[_0x75a59f(0x124)][_0x75a59f(0x180)]=Game_Variables[_0x75a59f(0x12e)][_0x75a59f(0x11a)],Game_Variables[_0x75a59f(0x12e)][_0x75a59f(0x11a)]=function(_0x3473d6,_0x2f385f){const _0x323f59=_0x75a59f;if(this[_0x323f59(0xf9)](_0x3473d6))this[_0x323f59(0x1b1)](_0x3473d6,_0x2f385f);VisuMZ[_0x323f59(0x124)][_0x323f59(0x180)][_0x323f59(0x1cd)](this,_0x3473d6,_0x2f385f);},Game_Variables['prototype'][_0x75a59f(0x1b1)]=function(_0x2c5eff,_0x1393a4){const _0x3d5b05=_0x75a59f;if(_0x2c5eff>0x0&&_0x2c5eff<$dataSystem[_0x3d5b05(0x237)]['length']){ConfigManager[_0x3d5b05(0x240)]=ConfigManager[_0x3d5b05(0x240)]||[];if(typeof _0x1393a4===_0x3d5b05(0xd5))_0x1393a4=Math[_0x3d5b05(0x1ca)](_0x1393a4);ConfigManager['globalVariables'][_0x2c5eff]=_0x1393a4,ConfigManager[_0x3d5b05(0x1d9)]();}},Game_Party['prototype'][_0x75a59f(0x176)]=function(){const _0x21e968=_0x75a59f;return this[_0x21e968(0x110)]()[_0x21e968(0x12f)](_0x584384=>_0x584384[_0x21e968(0x131)]());},Scene_Base[_0x75a59f(0x12e)][_0x75a59f(0x21a)]=function(_0x4f3d74){const _0x48d081=_0x75a59f,_0x48aff3=VisuMZ[_0x48d081(0x124)][_0x48d081(0x1de)][_0x48d081(0x167)];switch(_0x4f3d74){case _0x48d081(0xf8):this[_0x48d081(0x121)]=!_0x48aff3['AfterBattle'];break;case _0x48d081(0x1f1):if(!this[_0x48d081(0x14f)]())return;this[_0x48d081(0x121)]=!_0x48aff3['AfterTransfer'];break;case _0x48d081(0x127):this[_0x48d081(0x121)]=!_0x48aff3[_0x48d081(0x252)];break;case _0x48d081(0xcf):this[_0x48d081(0x121)]=!_0x48aff3['AfterExitMenu'];break;}},VisuMZ[_0x75a59f(0x124)][_0x75a59f(0x211)]=Scene_Base['prototype'][_0x75a59f(0x212)],Scene_Base[_0x75a59f(0x12e)][_0x75a59f(0x212)]=function(){const _0x298435=_0x75a59f;!this[_0x298435(0x121)]&&VisuMZ[_0x298435(0x124)][_0x298435(0x211)][_0x298435(0x1cd)](this),this[_0x298435(0x121)]=![];},Scene_Base[_0x75a59f(0x12e)][_0x75a59f(0x106)]=function(){const _0x80253b=_0x75a59f;return!DataManager['isBattleTest']()&&!DataManager[_0x80253b(0x150)]()&&$gameSystem['isAutosaveEnabled']()&&(VisuMZ[_0x80253b(0x124)][_0x80253b(0x1de)][_0x80253b(0x167)]['RequestsRequireSaveEnable']?$gameSystem[_0x80253b(0x14a)]():!![]);},Scene_Base[_0x75a59f(0x12e)][_0x75a59f(0x24d)]=function(){const _0x2b7ac3=_0x75a59f;if(!ConfigManager[_0x2b7ac3(0x16e)])return;this['forceAutosave']();},Scene_Base['prototype'][_0x75a59f(0x1a4)]=function(){const _0x37db35=_0x75a59f;$gameSystem[_0x37db35(0x231)](),this['_processingAutosave']=![];const _0x5bdcd8=StorageManager['autosaveType']();[_0x37db35(0x1da),_0x37db35(0x160)][_0x37db35(0x248)](_0x5bdcd8)&&DataManager['saveGame'](0x0)[_0x37db35(0x22a)](()=>this[_0x37db35(0x126)]())[_0x37db35(0xd7)](()=>this['onAutosaveFailure']());if(['current','both'][_0x37db35(0x248)](_0x5bdcd8)){const _0xa79a44=$gameSystem[_0x37db35(0x22b)]();_0xa79a44>0x0&&DataManager[_0x37db35(0x181)](_0xa79a44)[_0x37db35(0x22a)](()=>this[_0x37db35(0x126)]())[_0x37db35(0xd7)](()=>this[_0x37db35(0x23c)]());}this[_0x37db35(0x13c)]=![];},VisuMZ[_0x75a59f(0x124)]['Scene_Base_onAutosaveSuccess']=Scene_Base[_0x75a59f(0x12e)][_0x75a59f(0x126)],Scene_Base['prototype']['onAutosaveSuccess']=function(){const _0x53b330=_0x75a59f;if(this['_processingAutosave'])return;VisuMZ[_0x53b330(0x124)][_0x53b330(0xbc)]['call'](this),VisuMZ['SaveCore'][_0x53b330(0x1de)][_0x53b330(0x167)][_0x53b330(0x215)][_0x53b330(0x1cd)](this),this[_0x53b330(0x23b)](!![]),this[_0x53b330(0x13c)]=!![];},VisuMZ[_0x75a59f(0x124)][_0x75a59f(0xf4)]=Scene_Base[_0x75a59f(0x12e)][_0x75a59f(0x23c)],Scene_Base['prototype']['onAutosaveFailure']=function(){const _0x5830cb=_0x75a59f;if(this[_0x5830cb(0x13c)])return;VisuMZ['SaveCore'][_0x5830cb(0xf4)][_0x5830cb(0x1cd)](this),VisuMZ[_0x5830cb(0x124)][_0x5830cb(0x1de)]['Autosave']['OnAutosaveFailureJS'][_0x5830cb(0x1cd)](this),this[_0x5830cb(0x23b)](![]);},Scene_Base['prototype'][_0x75a59f(0xed)]=function(){const _0x35f919=_0x75a59f;if(this[_0x35f919(0x21b)])return;const _0x22a556=this[_0x35f919(0x198)]();this['_saveConfirmWindow']=new Window_Base(_0x22a556),this[_0x35f919(0x21b)][_0x35f919(0x147)]=0x0;},Scene_Base['prototype']['saveConfirmationWindowRect']=function(){const _0x43ec1e=_0x75a59f;return VisuMZ[_0x43ec1e(0x124)][_0x43ec1e(0x1de)][_0x43ec1e(0x1e2)][_0x43ec1e(0x12a)][_0x43ec1e(0x1cd)](this);},Scene_Base['prototype'][_0x75a59f(0x247)]=function(){const _0x49669b=_0x75a59f;return VisuMZ[_0x49669b(0x124)][_0x49669b(0x1de)][_0x49669b(0x1e2)]['Enable'];},Scene_Base[_0x75a59f(0x12e)][_0x75a59f(0x18d)]=function(_0x2de1b7,_0x3b5f47){const _0x4339b6=_0x75a59f;if(!this[_0x4339b6(0x247)]())return this[_0x4339b6(0x1d4)](_0x2de1b7);if(!this[_0x4339b6(0x21b)])this['createSaveConfirmationWindow']();const _0x3366d1=this[_0x4339b6(0x21b)];this[_0x4339b6(0x20c)](_0x3366d1),this[_0x4339b6(0x102)](_0x3366d1),_0x3366d1[_0x4339b6(0xef)](),_0x3366d1[_0x4339b6(0x1d5)](),_0x3366d1[_0x4339b6(0x1e6)]['clear']();let _0x3e5452='';_0x3b5f47?_0x3e5452=TextManager[_0x4339b6(0x234)]:_0x3e5452=_0x2de1b7?TextManager[_0x4339b6(0x1d1)]:TextManager[_0x4339b6(0x1c7)];const _0xcc8e0=_0x3366d1[_0x4339b6(0x1d0)](_0x3e5452)[_0x4339b6(0xe3)],_0x1ae648=(_0x3366d1[_0x4339b6(0xf6)]-_0xcc8e0)/0x2;_0x3366d1[_0x4339b6(0x1b7)](_0x3e5452,_0x1ae648,0x0,_0xcc8e0);const _0x15d0ff=VisuMZ['SaveCore'][_0x4339b6(0x1de)][_0x4339b6(0x1e2)][_0x4339b6(0x16f)];setTimeout(this[_0x4339b6(0x1d4)][_0x4339b6(0xc9)](this,_0x2de1b7),_0x15d0ff);},Scene_Base['prototype'][_0x75a59f(0x1d7)]=function(){this['openSaveConfirmationWindow'](![],!![]);},Scene_Base[_0x75a59f(0x12e)][_0x75a59f(0x1d4)]=function(_0x32a40a){const _0x3431a2=_0x75a59f;if(this[_0x3431a2(0x21b)])this[_0x3431a2(0x21b)][_0x3431a2(0x196)]();},Scene_Base['prototype'][_0x75a59f(0x1f4)]=function(){if(this['_autosaveConfirmWindow'])return;const _0x540717=this['autosaveConfirmationWindowRect']();this['_autosaveConfirmWindow']=new Window_AutosaveConfirm(_0x540717);},Scene_Base[_0x75a59f(0x12e)][_0x75a59f(0xf3)]=function(){const _0x4e17d5=_0x75a59f,_0x167b11=this[_0x4e17d5(0x1ea)](),_0xf4284d=this[_0x4e17d5(0x113)](0x1,![]),_0xdc6e81=Graphics[_0x4e17d5(0xe3)]-_0x167b11,_0x5f5dc8=Graphics[_0x4e17d5(0x183)]-_0xf4284d;return new Rectangle(_0xdc6e81,_0x5f5dc8,_0x167b11,_0xf4284d);},Scene_Base[_0x75a59f(0x12e)]['isAutosaveConfirmWindowEnabled']=function(){const _0x121934=_0x75a59f;return VisuMZ[_0x121934(0x124)]['Settings'][_0x121934(0x1c9)][_0x121934(0x1ee)];},Scene_Base[_0x75a59f(0x12e)][_0x75a59f(0x23b)]=function(_0x398e85){const _0x4ca445=_0x75a59f;if(!this[_0x4ca445(0x123)]())return this[_0x4ca445(0xce)](_0x398e85);if(!this[_0x4ca445(0xcb)])this[_0x4ca445(0x1f4)]();const _0x1feb93=this[_0x4ca445(0xcb)];this[_0x4ca445(0x20c)](_0x1feb93),this[_0x4ca445(0x102)](_0x1feb93),_0x1feb93[_0x4ca445(0x238)](_0x398e85),_0x1feb93[_0x4ca445(0x217)]();const _0x530b9e=VisuMZ['SaveCore'][_0x4ca445(0x1de)][_0x4ca445(0x1c9)][_0x4ca445(0x16f)];setTimeout(this[_0x4ca445(0xce)][_0x4ca445(0xc9)](this,_0x398e85),_0x530b9e);},Scene_Base[_0x75a59f(0x12e)][_0x75a59f(0xce)]=function(_0x2bfd63){const _0x4428c2=_0x75a59f;if(this[_0x4428c2(0xcb)])this[_0x4428c2(0xcb)][_0x4428c2(0x13a)]();},Scene_Base['prototype'][_0x75a59f(0x11e)]=function(){},VisuMZ['SaveCore']['Scene_Title_initialize']=Scene_Title['prototype'][_0x75a59f(0x1a0)],Scene_Title['prototype']['initialize']=function(){const _0x270fb7=_0x75a59f;VisuMZ[_0x270fb7(0x124)][_0x270fb7(0x1e0)][_0x270fb7(0x1cd)](this),this['_loadSuccess']=![];},VisuMZ[_0x75a59f(0x124)]['Scene_Title_terminate']=Scene_Title[_0x75a59f(0x12e)][_0x75a59f(0x136)],Scene_Title['prototype'][_0x75a59f(0x136)]=function(){const _0x1d8b8c=_0x75a59f;VisuMZ['SaveCore'][_0x1d8b8c(0x1e3)][_0x1d8b8c(0x1cd)](this);if(this['_loadSuccess'])$gameSystem['onAfterLoad']();},VisuMZ['SaveCore']['Scene_Title_commandNewGame']=Scene_Title['prototype'][_0x75a59f(0x235)],Scene_Title['prototype']['commandNewGame']=function(){const _0x1eef72=_0x75a59f;StorageManager['saveStyle']()===_0x1eef72(0x1aa)?this[_0x1eef72(0x111)]():VisuMZ[_0x1eef72(0x124)]['Scene_Title_commandNewGame']['call'](this);},Scene_Title[_0x75a59f(0x12e)][_0x75a59f(0x111)]=function(){const _0x4c48ff=_0x75a59f;DataManager[_0x4c48ff(0xcc)](),$gameTemp[_0x4c48ff(0x24a)]=!![],this[_0x4c48ff(0x10e)][_0x4c48ff(0x196)](),SceneManager[_0x4c48ff(0x1cc)](Scene_Save);},VisuMZ[_0x75a59f(0x124)][_0x75a59f(0x1c2)]=Scene_Title[_0x75a59f(0x12e)][_0x75a59f(0x216)],Scene_Title[_0x75a59f(0x12e)][_0x75a59f(0x216)]=function(){const _0x16ecdc=_0x75a59f;StorageManager[_0x16ecdc(0x1e7)]()===_0x16ecdc(0x1ec)?this[_0x16ecdc(0x22f)]():VisuMZ['SaveCore'][_0x16ecdc(0x1c2)][_0x16ecdc(0x1cd)](this);},Scene_Title[_0x75a59f(0x12e)]['commandContinueSaveCoreSingle']=function(){const _0x474c4d=_0x75a59f;DataManager[_0x474c4d(0x13e)](0x0)[_0x474c4d(0x22a)](()=>this[_0x474c4d(0x10a)]())['catch'](()=>this[_0x474c4d(0x1f0)]());},Scene_Title['prototype'][_0x75a59f(0x10a)]=function(){const _0x36c46c=_0x75a59f;this['_commandWindow'][_0x36c46c(0x196)](),SoundManager[_0x36c46c(0x16b)](),this[_0x36c46c(0xd1)](),Scene_Load['prototype'][_0x36c46c(0xe4)](),SceneManager['goto'](Scene_Map),this['_loadSuccess']=!![],VisuMZ[_0x36c46c(0x124)]['Settings']['Save'][_0x36c46c(0x135)][_0x36c46c(0x1cd)](this);},Scene_Title[_0x75a59f(0x12e)][_0x75a59f(0x1f0)]=function(){const _0x232be7=_0x75a59f;SoundManager[_0x232be7(0x22e)](),VisuMZ['SaveCore']['Settings']['Save'][_0x232be7(0x205)][_0x232be7(0x1cd)](this),this[_0x232be7(0x1d7)]();},Scene_Title['prototype'][_0x75a59f(0x1d4)]=function(_0x1763d7){const _0x216549=_0x75a59f;Scene_Base[_0x216549(0x12e)][_0x216549(0x1d4)]['call'](this,_0x1763d7),this[_0x216549(0x10e)][_0x216549(0xef)](),this[_0x216549(0x10e)][_0x216549(0xfd)]();},VisuMZ[_0x75a59f(0x124)][_0x75a59f(0xee)]=Scene_Map[_0x75a59f(0x12e)][_0x75a59f(0x194)],Scene_Map[_0x75a59f(0x12e)][_0x75a59f(0x194)]=function(){const _0x3dc9c7=_0x75a59f;VisuMZ['SaveCore'][_0x3dc9c7(0xee)][_0x3dc9c7(0x1cd)](this);if(SceneManager[_0x3dc9c7(0xc6)](Scene_Menu))this[_0x3dc9c7(0x21a)]('exitMenu'),this['requestAutosave']();else SceneManager[_0x3dc9c7(0xc6)](Scene_Battle)&&(this['determineAutosaveBypass'](_0x3dc9c7(0xf8)),this['requestAutosave']());},VisuMZ[_0x75a59f(0x124)][_0x75a59f(0x112)]=Scene_Map[_0x75a59f(0x12e)][_0x75a59f(0x137)],Scene_Map[_0x75a59f(0x12e)][_0x75a59f(0x137)]=function(){const _0x139037=_0x75a59f;this['shouldAutosave']()&&this['determineAutosaveBypass'](_0x139037(0x1f1)),VisuMZ[_0x139037(0x124)][_0x139037(0x112)][_0x139037(0x1cd)](this);},Scene_Map['prototype']['saveCurrentSlot']=function(){const _0x1ed79d=_0x75a59f;if($gameSystem['_saveCorePluginCommandSave'])return;const _0x278248=$gameSystem[_0x1ed79d(0x22b)]();if(StorageManager[_0x1ed79d(0x1e7)]()!==_0x1ed79d(0x1ec)&&_0x278248<=0x0)return;this['_active']=![],$gameSystem['setSavefileId'](_0x278248),$gameSystem[_0x1ed79d(0x231)](),$gameSystem['_saveCorePluginCommandSave']=!![],DataManager[_0x1ed79d(0x181)](_0x278248)['then'](()=>this[_0x1ed79d(0x1d8)]())['catch'](()=>this['onSaveFailure']()),$gameSystem[_0x1ed79d(0x245)]=undefined;},Scene_Map['prototype'][_0x75a59f(0x1d8)]=function(){const _0x1aec34=_0x75a59f;SoundManager['playSave'](),VisuMZ['SaveCore']['Settings'][_0x1aec34(0x179)][_0x1aec34(0x105)][_0x1aec34(0x1cd)](this),this[_0x1aec34(0x18d)](!![]);},Scene_Map[_0x75a59f(0x12e)]['onSaveFailure']=function(){const _0x42a144=_0x75a59f;SoundManager['playBuzzer'](),VisuMZ[_0x42a144(0x124)]['Settings'][_0x42a144(0x179)][_0x42a144(0x204)][_0x42a144(0x1cd)](this),this[_0x42a144(0x18d)](![]);},Scene_Map[_0x75a59f(0x12e)]['closeSaveConfirmationWindow']=function(_0x36a289){const _0x3d8a73=_0x75a59f;Scene_Message[_0x3d8a73(0x12e)][_0x3d8a73(0x1d4)][_0x3d8a73(0x1cd)](this,_0x36a289),this[_0x3d8a73(0x10b)]=!![];},VisuMZ[_0x75a59f(0x124)][_0x75a59f(0x17e)]=Scene_Map[_0x75a59f(0x12e)]['needsFadeIn'],Scene_Map[_0x75a59f(0x12e)][_0x75a59f(0x1ce)]=function(){const _0xb4848c=_0x75a59f;return VisuMZ[_0xb4848c(0x124)][_0xb4848c(0x17e)][_0xb4848c(0x1cd)](this)||SceneManager[_0xb4848c(0xc6)](Scene_Title);},VisuMZ[_0x75a59f(0x124)][_0x75a59f(0x239)]=Scene_Menu[_0x75a59f(0x12e)][_0x75a59f(0x117)],Scene_Menu['prototype'][_0x75a59f(0x117)]=function(){const _0x35e04b=_0x75a59f;VisuMZ['SaveCore'][_0x35e04b(0x239)][_0x35e04b(0x1cd)](this),SceneManager[_0x35e04b(0xc6)](Scene_Map)&&(this[_0x35e04b(0x21a)](_0x35e04b(0x127)),this[_0x35e04b(0x212)]());},VisuMZ[_0x75a59f(0x124)][_0x75a59f(0x1c3)]=Scene_Menu[_0x75a59f(0x12e)]['commandSave'],Scene_Menu[_0x75a59f(0x12e)][_0x75a59f(0x230)]=function(){const _0x4de42e=_0x75a59f,_0x3dc589=StorageManager[_0x4de42e(0x1e7)]();switch(_0x3dc589){case'locked':case'single':this[_0x4de42e(0xf2)]();break;default:VisuMZ[_0x4de42e(0x124)][_0x4de42e(0x1c3)]['call'](this);break;}},Scene_Menu[_0x75a59f(0x12e)]['commandSaveLocked']=function(){const _0xe9a861=_0x75a59f,_0x580afb=$gameSystem[_0xe9a861(0x22b)]();$gameSystem[_0xe9a861(0x103)](_0x580afb),$gameSystem[_0xe9a861(0x231)](),DataManager['saveGame'](_0x580afb)[_0xe9a861(0x22a)](()=>this['onSaveCoreSaveSuccess']())['catch'](()=>this[_0xe9a861(0xe6)]());},Scene_Menu[_0x75a59f(0x12e)]['onSaveCoreSaveSuccess']=function(){const _0x48fad6=_0x75a59f;SoundManager[_0x48fad6(0x1ac)](),VisuMZ[_0x48fad6(0x124)][_0x48fad6(0x1de)][_0x48fad6(0x179)][_0x48fad6(0x105)][_0x48fad6(0x1cd)](this),this[_0x48fad6(0x18d)](!![]);},Scene_Menu[_0x75a59f(0x12e)][_0x75a59f(0xe6)]=function(){const _0x25d63b=_0x75a59f;SoundManager[_0x25d63b(0x22e)](),VisuMZ[_0x25d63b(0x124)]['Settings'][_0x25d63b(0x179)][_0x25d63b(0x204)][_0x25d63b(0x1cd)](this),this[_0x25d63b(0x18d)](![]);},Scene_Menu[_0x75a59f(0x12e)][_0x75a59f(0x1d4)]=function(_0x48fede){const _0x5672e8=_0x75a59f;Scene_MenuBase[_0x5672e8(0x12e)][_0x5672e8(0x1d4)][_0x5672e8(0x1cd)](this,_0x48fede),this['_commandWindow'][_0x5672e8(0xfd)]();},Scene_Battle[_0x75a59f(0x12e)][_0x75a59f(0x212)]=function(){},VisuMZ['SaveCore'][_0x75a59f(0x243)]=Scene_Options[_0x75a59f(0x12e)]['maxCommands'],Scene_Options[_0x75a59f(0x12e)][_0x75a59f(0x15f)]=function(){const _0x2f09c1=_0x75a59f;let _0x30724b=VisuMZ[_0x2f09c1(0x124)][_0x2f09c1(0x243)]['call'](this);const _0x379467=VisuMZ['SaveCore'][_0x2f09c1(0x1de)];if(_0x379467['AutosaveOption'][_0x2f09c1(0x1af)]&&_0x379467[_0x2f09c1(0x228)][_0x2f09c1(0x14c)])_0x30724b++;return _0x30724b;},Scene_Save['prototype'][_0x75a59f(0x1d8)]=function(){const _0x16f486=_0x75a59f;SoundManager[_0x16f486(0x1ac)](),VisuMZ[_0x16f486(0x124)][_0x16f486(0x1de)][_0x16f486(0x179)][_0x16f486(0x105)][_0x16f486(0x1cd)](this),this[_0x16f486(0x24b)]['refresh'](),this[_0x16f486(0x18d)](!![]);},VisuMZ['SaveCore']['Scene_Save_onSaveFailure']=Scene_Save['prototype'][_0x75a59f(0x242)],Scene_Save[_0x75a59f(0x12e)]['onSaveFailure']=function(){const _0x5cc5ba=_0x75a59f;SoundManager[_0x5cc5ba(0x22e)](),VisuMZ[_0x5cc5ba(0x124)][_0x5cc5ba(0x1de)]['Save'][_0x5cc5ba(0x204)][_0x5cc5ba(0x1cd)](this),this[_0x5cc5ba(0x18d)](![]);},Scene_Save['prototype'][_0x75a59f(0x1d4)]=function(_0x51153b){const _0x43f1f1=_0x75a59f;Scene_File['prototype'][_0x43f1f1(0x1d4)]['call'](this,_0x51153b),_0x51153b?this['activateListWindow']():this[_0x43f1f1(0x1c5)]();},Scene_Save[_0x75a59f(0x12e)][_0x75a59f(0x115)]=function(){const _0x2cf919=_0x75a59f;$gameTemp[_0x2cf919(0x24a)]=![],Scene_File[_0x2cf919(0x12e)][_0x2cf919(0x115)][_0x2cf919(0x1cd)](this);},VisuMZ['SaveCore']['Scene_Save_helpWindowText']=Scene_Save[_0x75a59f(0x12e)][_0x75a59f(0xdd)],Scene_Save[_0x75a59f(0x12e)][_0x75a59f(0xdd)]=function(){const _0x101c42=_0x75a59f;return $gameTemp['_pickLockedSaveSlot']?TextManager['pickLockedSaveSlot']:VisuMZ[_0x101c42(0x124)][_0x101c42(0x165)][_0x101c42(0x1cd)](this);},VisuMZ[_0x75a59f(0x124)][_0x75a59f(0x14b)]=Scene_Save[_0x75a59f(0x12e)][_0x75a59f(0x189)],Scene_Save[_0x75a59f(0x12e)]['executeSave']=function(_0x15d805){const _0x5126b7=_0x75a59f;$gameTemp[_0x5126b7(0x24a)]?this['startNewGameLockedSave'](_0x15d805):VisuMZ['SaveCore'][_0x5126b7(0x14b)]['call'](this,_0x15d805);},Scene_Save[_0x75a59f(0x12e)][_0x75a59f(0x1eb)]=function(_0x540ceb){const _0x42a451=_0x75a59f;$gameTemp[_0x42a451(0x24a)]=![],SoundManager[_0x42a451(0x16b)](),$gameSystem[_0x42a451(0x103)](_0x540ceb),this[_0x42a451(0xd1)](),SceneManager['goto'](Scene_Map);},VisuMZ['SaveCore']['Scene_Load_onLoadSuccess']=Scene_Load[_0x75a59f(0x12e)][_0x75a59f(0x1bc)],Scene_Load[_0x75a59f(0x12e)]['onLoadSuccess']=function(){const _0x1a8149=_0x75a59f;VisuMZ['SaveCore'][_0x1a8149(0x185)][_0x1a8149(0x1cd)](this),VisuMZ['SaveCore'][_0x1a8149(0x1de)][_0x1a8149(0x179)][_0x1a8149(0x135)][_0x1a8149(0x1cd)](this),setTimeout(VisuMZ['SaveCore'][_0x1a8149(0xc7)][_0x1a8149(0xc9)](this),0x3e8);},Scene_Load[_0x75a59f(0x12e)][_0x75a59f(0x195)]=function(){const _0x2f51bd=_0x75a59f;SoundManager[_0x2f51bd(0x22e)](),VisuMZ[_0x2f51bd(0x124)]['Settings']['Save'][_0x2f51bd(0x205)][_0x2f51bd(0x1cd)](this),this[_0x2f51bd(0x1d7)]();},Scene_Load['prototype'][_0x75a59f(0x1d4)]=function(_0x27f04a){const _0x2e1f20=_0x75a59f;Scene_File[_0x2e1f20(0x12e)]['closeSaveConfirmationWindow'][_0x2e1f20(0x1cd)](this,_0x27f04a),this[_0x2e1f20(0x1c5)]();},VisuMZ['SaveCore']['RemoveSaveCoreCache']=function(){$gameSystem['_saveCorePluginCommandSave']=undefined;},ImageManager[_0x75a59f(0x21e)]=ImageManager['svActorHorzCells']||0x9,ImageManager[_0x75a59f(0x17c)]=ImageManager[_0x75a59f(0x17c)]||0x6;!Imported[_0x75a59f(0x1a1)]&&(Window_Base[_0x75a59f(0x12e)]['drawSvActor']=function(_0x30178b,_0x142959,_0x41530b){const _0x2fcb3c=_0x75a59f,_0x57f1e2=_0x30178b[_0x2fcb3c(0x154)](/\$/i),_0x193e0c=ImageManager[_0x2fcb3c(0x1c1)](_0x30178b),_0x1355c3=_0x193e0c[_0x2fcb3c(0xe3)]/(_0x57f1e2?0x1:ImageManager[_0x2fcb3c(0x21e)]),_0x49da42=_0x193e0c[_0x2fcb3c(0x183)]/(_0x57f1e2?0x1:ImageManager['svActorVertCells']),_0x2ff52e=0x0,_0x1f9c48=0x0;this[_0x2fcb3c(0x1e6)][_0x2fcb3c(0x191)](_0x193e0c,_0x2ff52e,_0x1f9c48,_0x1355c3,_0x49da42,_0x142959-_0x1355c3/0x2,_0x41530b-_0x49da42);});;VisuMZ[_0x75a59f(0x124)][_0x75a59f(0x159)]=Window_Options['prototype'][_0x75a59f(0x12d)],Window_Options[_0x75a59f(0x12e)][_0x75a59f(0x12d)]=function(){const _0x15ba4e=_0x75a59f;VisuMZ[_0x15ba4e(0x124)][_0x15ba4e(0x159)][_0x15ba4e(0x1cd)](this),this['addSaveCoreCommands']();},Window_Options[_0x75a59f(0x12e)]['addSaveCoreCommands']=function(){const _0x766f34=_0x75a59f;VisuMZ[_0x766f34(0x124)][_0x766f34(0x1de)]['AutosaveOption'][_0x766f34(0x1af)]&&this[_0x766f34(0x1d6)]();},Window_Options[_0x75a59f(0x12e)][_0x75a59f(0x1d6)]=function(){const _0x4b5953=_0x75a59f,_0x4647e5=TextManager[_0x4b5953(0x1e9)],_0x48df50=_0x4b5953(0x16e);this[_0x4b5953(0x1a3)](_0x4647e5,_0x48df50);};function Window_AutosaveConfirm(){const _0x34a21b=_0x75a59f;this[_0x34a21b(0x1a0)](...arguments);}function _0x30ec(){const _0x42d4b9=['LargeContentsJS','process_VisuMZ_SaveCore_Switches_Variables','TestKey','currencyUnit','AutosaveMaxCount','getFullYear','VertRows','Game_System_savefileId','OnSaveFailureJS','OnLoadFailureJS','replace','return\x200','MAX_BATTLE_MEMBERS','_stored_latestSavefile','loadCharacter','numVisibleRows','removeChild','ARRAYFUNC','ConfigManager_makeData','drawContents','autosaveFailure','Scene_Base_requestAutosave','requestAutosave','LatestText','6831896soyEBq','OnAutosaveSuccessJS','commandContinue','fadeIn','name','1671415kLFAHi','determineAutosaveBypass','_saveConfirmWindow','_SaveCoreSettings','getDate','svActorHorzCells','STRUCT','LocalMode','current','drawCenteredPicture','getScreenPosition','latestSavefileId','clear','textColor','itemRect','AutosaveOption','filter','then','savefileId','svbattlers','actorName','playBuzzer','commandContinueSaveCoreSingle','commandSave','onBeforeSave','sprite','VocabLoadFailure','loadFailure','commandNewGame','saveMenuSpriteWidth','variables','setSetSuccess','Scene_Menu_create','ARRAYJSON','openAutosaveConfirmationWindow','onAutosaveFailure','characters','max','MakeSavefileInfoJS','globalVariables','status','onSaveFailure','Scene_Options_maxCommands','ARRAYSTRUCT','_saveCorePluginCommandSave','enableAutosave','isSaveConfirmWindowEnabled','includes','drawContentsLoaded','_pickLockedSaveSlot','_listWindow','VertFileDataJS','executeAutosave','ListCols','gold','version','split','AfterMenuCall','maxCols','optAutosave','Scene_Base_onAutosaveSuccess','useDigitGrouping','Game_Variables_value','SaveCurrentSlot','maxBattleMembers','addLoadListener','faceWidth','VisuMZ_1_MessageCore','AutosaveForce','Game_System_initialize','isPreviousScene','RemoveSaveCoreCache','240968uYZDXZ','bind','large','_autosaveConfirmWindow','setupNewGame','setSavePicture','closeAutosaveConfirmationWindow','exitMenu','picture','fadeOutAll','_success','[Year].[Month].[Date]\x20[Hour]:[Minute]:[Second]','ListFileDataJS','number','inBattle','catch','setWordWrap','AutosaveType','EVAL','menuStyle','GlobalVariables','helpWindowText','loadAllSavefileImages','playtime','_colorCache','loadPartyImagesForSavefile','Filename','width','reloadMapIfUpdated','FUNC','onSaveCoreSaveFailure','VocabSaveSuccess','characterName','_savefileId','VertContentsJS','getSeconds','box','createSaveConfirmationWindow','Scene_Map_onMapLoaded','open','onDatabaseLoaded','latestSave','commandSaveLocked','autosaveConfirmationWindowRect','Scene_Base_onAutosaveFailure','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','innerWidth','ARRAYNUM','battle','isGlobal','#%1','selectSavefile','globalSwitches','activate','getHours','VisuMZ_1_EventsMoveCore','drawActorFaces','_scene','addChild','setSavefileId','ceil','OnSaveSuccessJS','isAutosaveEnabled','ConfigManager_applyData','Game_Switches_value','face','onSaveCoreLoadSuccess','_active','file','drawCurrency','_commandWindow','autosaveEnabled','battleMembers','commandNewGameSaveCoreLocked','Scene_Map_onTransferEnd','calcWindowHeight','LargeCols','popScene','pickLockedSaveSlot','create','updatePosition','gradientFillRect','setValue','drawVerticalStyleFileData','initSaveCore','innerHeight','saveCurrentSlot','drawVerticalStyleContents','Text','_bypassAutosave','makeSavefileInfo','isAutosaveConfirmWindowEnabled','SaveCore','changeTextColor','onAutosaveSuccess','callMenu','loadPicture','smoothSelect','ConfirmRect','round','AutosaveRequest','addGeneralOptions','prototype','map','setFadeSpeed','battlerName','drawListStyleFileData','timestamp','STR','OnLoadSuccessJS','terminate','onTransferEnd','DataManager_createGameObjects','drawListStyleContents','fadeOut','SpriteWidth','_processingAutosave','LargeFileDataJS','loadGame','isBattleTest','ARRAYSTR','setMode','JSON','Game_Switches_setValue','ConvertParams','registerCommand','contentsBack','openness','setSaveDescription','SaveMenuStyle','isSaveEnabled','Scene_Save_executeSave','AdjustRect','saveDescription','Scene_Boot_onDatabaseLoaded','shouldAutosave','isEventTest','faceName','drawPicture','195350jUGLjL','match','LargeRows','getTimestamp','vertical','drawLargeStyleContents','Window_Options_addGeneralOptions','drawLatestMarker','globalValue','drawDescription','ListRows','trim','maxCommands','both','VocabLockedSaveSlot','_fadeSpeed','description','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Scene_Save_helpWindowText','Name','Autosave','left','VocabAutosaveSuccess','switches','playLoad','ActorGraphic','isEnabled','autosave','Duration','SavePicture','drawCharacter','svbattler','value','KeyFmt','VocabSaveFailure','svbattlersForSaveFile','savePicture','FilenameFmt','Save','drawLargeStyleFileData','drawBackground','svActorVertCells','min','Scene_Map_needsFadeIn','drawActorSprites','Game_Variables_setValue','saveGame','dimColor2','height','members','Scene_Load_onLoadSuccess','forageTestKey','VisuMZ_0_CoreEngine','indexToSavefileId','executeSave','AutosaveEnable','refresh','join','openSaveConfirmationWindow','process_VisuMZ_SaveCore_Settings','advanced','GlobalSwitches','blt','latestSavefile','createGameObjects','onMapLoaded','onLoadFailure','close','onAfterLoad','saveConfirmationWindowRect','9fMnRJi','MaxSaveFiles','114VnrcGQ','autosaveSuccess','getColorDataFromPluginParameters','748iAjCWO','windowPadding','initialize','VisuMZ_1_MainMenuCore','20595tJHKGc','addCommand','forceAutosave','right','Window_SavefileList_setMode','loadFace','isAutosaveCompatible','savefileIdToIndex','locked','faces','playSave','drawBoxStyleContents','SaveStyle','AddOption','dimColor1','setGlobalValue','14zSiXXH','actorStyle','BoxFileDataJS','getSavePicture','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','drawTextEx','padStart','format','drawActors','length','onLoadSuccess','DataManager_loadAllSavefileImages','drawTitle','update','1999204XxGxhW','loadSvActor','Scene_Title_commandContinue','Scene_Menu_commandSave','exit','activateListWindow','maxSavefiles','saveFailure','saveMenuSvBattlerWidth','AutosaveConfirm','floor','SaveMenu','push','call','needsFadeIn','gameId','textSizeEx','saveSuccess','drawItem','itemPadding','closeSaveConfirmationWindow','resetFontSettings','addSaveCoreAutosaveCommand','loadFailureConfirmationWindow','onSaveSuccess','save','file0','updateFade','798445GrZxdk','makeData','Settings','contentsOpacity','Scene_Title_initialize','drawText','SaveConfirm','Scene_Title_terminate','ListContentsJS','drawPlaytime','contents','saveStyle','DataManager_makeSavefileInfo','autosaveOption','mainCommandWidth','startNewGameLockedSave','single','drawFace','Enable','drawTimestamp','onSaveCoreLoadFailure','transfer','BoxContentsJS','drawFileData','createAutosaveConfirmationWindow','autosaveType','parameters','toUpperCase','resetWordWrap','constructor','partyMemberName','parse'];_0x30ec=function(){return _0x42d4b9;};return _0x30ec();}Window_AutosaveConfirm['prototype']=Object[_0x75a59f(0x117)](Window_Base[_0x75a59f(0x12e)]),Window_AutosaveConfirm[_0x75a59f(0x12e)][_0x75a59f(0x1f9)]=Window_AutosaveConfirm,Window_AutosaveConfirm[_0x75a59f(0x12e)][_0x75a59f(0x1a0)]=function(_0x46afd9){const _0x2317a7=_0x75a59f;this['_fadeSpeed']=0x0,Window_Base[_0x2317a7(0x12e)]['initialize']['call'](this,_0x46afd9),this['opacity']=0x0,this[_0x2317a7(0x1df)]=0x0;},Window_AutosaveConfirm[_0x75a59f(0x12e)][_0x75a59f(0x17b)]=function(){const _0x11cf4f=_0x75a59f,_0x3a34ec=0x0,_0x2c8595=0x0,_0x28d5de=this[_0x11cf4f(0xf6)],_0x2e5cb3=this[_0x11cf4f(0x11d)],_0x3ebf9e=ColorManager[_0x11cf4f(0x1b0)](),_0x13febc=ColorManager[_0x11cf4f(0x182)](),_0x65a074=_0x28d5de/0x2;this[_0x11cf4f(0x1e6)][_0x11cf4f(0x119)](_0x3a34ec,_0x2c8595,_0x65a074,_0x2e5cb3,_0x13febc,_0x3ebf9e),this[_0x11cf4f(0x1e6)][_0x11cf4f(0x119)](_0x3a34ec+_0x65a074,_0x2c8595,_0x65a074,_0x2e5cb3,_0x3ebf9e,_0x13febc);},Window_AutosaveConfirm[_0x75a59f(0x12e)]['setSetSuccess']=function(_0x31d8b0){const _0x2c6612=_0x75a59f;this[_0x2c6612(0xd2)]=_0x31d8b0,this[_0x2c6612(0x18b)]();},Window_AutosaveConfirm['prototype'][_0x75a59f(0x18b)]=function(){const _0x5ec95d=_0x75a59f;this[_0x5ec95d(0x1e6)][_0x5ec95d(0x225)]();const _0x20974a=this[_0x5ec95d(0xd2)]?TextManager[_0x5ec95d(0x19c)]:TextManager[_0x5ec95d(0x210)],_0x5e74b6=Math[_0x5ec95d(0x104)](this['textSizeEx'](_0x20974a)[_0x5ec95d(0xe3)]);this[_0x5ec95d(0xe3)]=_0x5e74b6+($gameSystem['windowPadding']()+this[_0x5ec95d(0x1d3)]())*0x2,this[_0x5ec95d(0x118)](),this['createContents']();const _0x31bcab=Math['floor']((this[_0x5ec95d(0xf6)]-_0x5e74b6)/0x2);this[_0x5ec95d(0x17b)](),this[_0x5ec95d(0x1b7)](_0x20974a,_0x31bcab,0x0,_0x5e74b6);},Window_AutosaveConfirm['prototype'][_0x75a59f(0x223)]=function(){const _0x58c4d3=_0x75a59f;return VisuMZ[_0x58c4d3(0x124)][_0x58c4d3(0x1de)][_0x58c4d3(0x1c9)]['ScreenPosition'];},Window_AutosaveConfirm['prototype'][_0x75a59f(0x118)]=function(){const _0x3482ca=_0x75a59f,_0x268c37=this[_0x3482ca(0x223)]();if(_0x268c37[_0x3482ca(0x154)](/upper/i))this['y']=-0x1*$gameSystem[_0x3482ca(0x19f)]();else _0x268c37[_0x3482ca(0x154)](/lower/i)?this['y']=Graphics['height']-this[_0x3482ca(0x183)]+$gameSystem[_0x3482ca(0x19f)]():this['y']=(Graphics[_0x3482ca(0x183)]-this['height'])/0x2;if(_0x268c37[_0x3482ca(0x154)](/left/i))this['x']=-0x1*$gameSystem['windowPadding']();else _0x268c37[_0x3482ca(0x154)](/right/i)?this['x']=Graphics['width']-this['width']+$gameSystem['windowPadding']():this['x']=(Graphics[_0x3482ca(0xe3)]-this[_0x3482ca(0xe3)])/0x2;this['x']=Math[_0x3482ca(0x12b)](this['x']),this['y']=Math[_0x3482ca(0x12b)](this['y']);},Window_AutosaveConfirm['prototype'][_0x75a59f(0x1bf)]=function(){const _0x277dee=_0x75a59f;Window_Base[_0x277dee(0x12e)]['update']['call'](this);if(this['_fadeSpeed']!==0x0)this[_0x277dee(0x1db)]();},Window_AutosaveConfirm[_0x75a59f(0x12e)][_0x75a59f(0x1db)]=function(){const _0xbd553f=_0x75a59f;this[_0xbd553f(0x1df)]+=this[_0xbd553f(0x162)];if(this[_0xbd553f(0x1df)]>=0xff||this[_0xbd553f(0x1df)]<=0x0)this['setFadeSpeed'](0x0);},Window_AutosaveConfirm[_0x75a59f(0x12e)][_0x75a59f(0x130)]=function(_0x48f794){const _0x177ddb=_0x75a59f;this[_0x177ddb(0x162)]=_0x48f794;},Window_AutosaveConfirm[_0x75a59f(0x12e)][_0x75a59f(0x217)]=function(){const _0x325d57=_0x75a59f;this[_0x325d57(0x130)](0x10);},Window_AutosaveConfirm['prototype'][_0x75a59f(0x13a)]=function(){const _0x18f1cf=_0x75a59f;this[_0x18f1cf(0x130)](-0x10);},VisuMZ[_0x75a59f(0x124)][_0x75a59f(0x1a6)]=Window_SavefileList['prototype'][_0x75a59f(0x141)],Window_SavefileList[_0x75a59f(0x12e)][_0x75a59f(0x141)]=function(_0x2822a4,_0x42b306){const _0x3b317e=_0x75a59f;if(StorageManager[_0x3b317e(0x1f5)]()===_0x3b317e(0x221))_0x42b306=![];if($gameTemp[_0x3b317e(0x24a)])_0x42b306=![];VisuMZ[_0x3b317e(0x124)]['Window_SavefileList_setMode']['call'](this,_0x2822a4,_0x42b306);},Window_SavefileList['prototype'][_0x75a59f(0x20b)]=function(){const _0x22d64b=_0x75a59f,_0x519d8d=VisuMZ[_0x22d64b(0x124)][_0x22d64b(0x1de)][_0x22d64b(0x1cb)],_0x5611aa=this['menuStyle']();switch(_0x5611aa){case'vertical':return _0x519d8d[_0x22d64b(0x202)];break;case _0x22d64b(0xec):return _0x519d8d['BoxRows'];break;case'large':return _0x519d8d[_0x22d64b(0x155)];break;default:return _0x519d8d[_0x22d64b(0x15d)];break;}},Window_SavefileList[_0x75a59f(0x12e)][_0x75a59f(0x253)]=function(){const _0xb33b06=_0x75a59f,_0x908602=VisuMZ[_0xb33b06(0x124)][_0xb33b06(0x1de)]['SaveMenu'],_0x1ee95d=this[_0xb33b06(0xdb)]();switch(_0x1ee95d){case _0xb33b06(0x157):return _0x908602['VertCols'];break;case _0xb33b06(0xec):return _0x908602['BoxCols'];break;case _0xb33b06(0xca):return _0x908602[_0xb33b06(0x114)];break;default:return _0x908602[_0xb33b06(0x24e)];break;}},Window_SavefileList[_0x75a59f(0x12e)][_0x75a59f(0x1f8)]=function(){const _0x4b57f4=_0x75a59f;Imported[_0x4b57f4(0xc3)]&&Window_Selectable[_0x4b57f4(0x12e)][_0x4b57f4(0x1f8)][_0x4b57f4(0x1cd)](this);},Window_SavefileList[_0x75a59f(0x12e)][_0x75a59f(0xd8)]=function(_0xce3cd8){const _0x4b8f4a=_0x75a59f;return Imported[_0x4b8f4a(0xc3)]?Window_Selectable[_0x4b8f4a(0x12e)][_0x4b8f4a(0xd8)][_0x4b8f4a(0x1cd)](this,_0xce3cd8):'';},Window_SavefileList['prototype'][_0x75a59f(0x1b3)]=function(){const _0x1f62d0=_0x75a59f;return VisuMZ[_0x1f62d0(0x124)][_0x1f62d0(0x1de)][_0x1f62d0(0x16c)];},Window_SavefileList[_0x75a59f(0x12e)][_0x75a59f(0xdb)]=function(){const _0x33ce5c=_0x75a59f;return VisuMZ['SaveCore'][_0x33ce5c(0x1de)][_0x33ce5c(0x149)];},Window_SavefileList[_0x75a59f(0x12e)][_0x75a59f(0xfb)]=function(_0x731b9d){const _0x56ab16=_0x75a59f,_0x48fc49=Math['max'](0x0,this[_0x56ab16(0x1a9)](_0x731b9d));this[_0x56ab16(0x129)](_0x48fc49);},Window_SavefileList[_0x75a59f(0x12e)][_0x75a59f(0x1d2)]=function(_0x5f0952){const _0x1260c6=_0x75a59f,_0x587ffa=this[_0x1260c6(0x188)](_0x5f0952),_0x566cdf=DataManager['savefileInfo'](_0x587ffa);if(_0x566cdf)_0x566cdf[_0x1260c6(0x22b)]=_0x587ffa;this['_savefileId']=_0x587ffa;const _0x515540=this[_0x1260c6(0x227)](_0x5f0952);this[_0x1260c6(0x1d5)](),this['changePaintOpacity'](this[_0x1260c6(0x16d)](_0x587ffa)),this[_0x1260c6(0x20f)](_0x566cdf,_0x515540);},Window_SavefileList[_0x75a59f(0x12e)][_0x75a59f(0x1be)]=function(_0x817a75,_0x180574,_0x48caf2){const _0x52dca4=_0x75a59f;_0x817a75===0x0?this[_0x52dca4(0x1e1)](TextManager[_0x52dca4(0x16e)],_0x180574,_0x48caf2,0xb4):this[_0x52dca4(0x1e1)](TextManager[_0x52dca4(0x10c)]+'\x20'+_0x817a75,_0x180574,_0x48caf2,0xb4);},Window_SavefileList['prototype'][_0x75a59f(0x15a)]=function(_0x5a0c08,_0x4a5b29,_0x2cb172){const _0x487b0a=_0x75a59f;if(_0x5a0c08===0x0||DataManager[_0x487b0a(0x224)]()!==_0x5a0c08)return;const _0x37c7e6=TextManager[_0x487b0a(0xf1)];this[_0x487b0a(0x125)](ColorManager['latestSavefile']()),this[_0x487b0a(0x1e1)](_0x37c7e6,_0x4a5b29,_0x2cb172,0xb4);},Window_SavefileList[_0x75a59f(0x12e)][_0x75a59f(0x1ba)]=function(_0x33de2e,_0x53fcc3,_0x2fb033,_0x8ae22c,_0x350a57){const _0xc16b1b=_0x75a59f;if(!_0x33de2e[_0xc16b1b(0x23d)])return;const _0x2e807a=this['actorStyle']();switch(_0x2e807a){case _0xc16b1b(0x109):this[_0xc16b1b(0x100)](_0x33de2e,_0x53fcc3,_0x2fb033,_0x8ae22c,_0x350a57);break;case _0xc16b1b(0x232):this[_0xc16b1b(0x17f)](_0x33de2e,_0x53fcc3,_0x2fb033,_0x8ae22c,_0x350a57);break;case _0xc16b1b(0x172):this['drawSvBattlerSprites'](_0x33de2e,_0x53fcc3,_0x2fb033,_0x8ae22c,_0x350a57);break;default:break;}},Window_SavefileList[_0x75a59f(0x12e)]['drawActorFaces']=function(_0x3e8cfa,_0x14febf,_0x19adae,_0x3c2c26,_0x203455){const _0x13d9b5=_0x75a59f;let _0x34093f=Math[_0x13d9b5(0x23e)](_0x3e8cfa['faces'][_0x13d9b5(0x1bb)],Scene_File['MAX_BATTLE_MEMBERS']);const _0x53e7f0=Math['min'](ImageManager[_0x13d9b5(0xc2)],Math['floor'](_0x3c2c26/_0x34093f));_0x14febf=_0x14febf+Math[_0x13d9b5(0x12b)]((_0x3c2c26-_0x34093f*_0x53e7f0)/0x2);for(const _0x14bc5a of _0x3e8cfa[_0x13d9b5(0x1ab)]){this[_0x13d9b5(0x1ed)](_0x14bc5a[0x0],_0x14bc5a[0x1],_0x14febf,_0x19adae+0x1,_0x53e7f0,_0x203455-0x2),_0x14febf+=_0x53e7f0;}},ImageManager[_0x75a59f(0x236)]=VisuMZ[_0x75a59f(0x124)]['Settings'][_0x75a59f(0x1cb)][_0x75a59f(0x13b)],ImageManager[_0x75a59f(0x1c8)]=VisuMZ[_0x75a59f(0x124)][_0x75a59f(0x1de)][_0x75a59f(0x1cb)]['SvBattlerWidth'],Window_SavefileList[_0x75a59f(0x12e)][_0x75a59f(0x17f)]=function(_0x452d37,_0x2334cf,_0xc86ac2,_0x5386ab,_0x25f80f){const _0x232763=_0x75a59f;let _0x5967a9=Math[_0x232763(0x23e)](_0x452d37[_0x232763(0x23d)][_0x232763(0x1bb)],Scene_File[_0x232763(0x208)]);const _0x44937f=ImageManager['saveMenuSpriteWidth'];_0x2334cf=_0x2334cf+Math['round']((_0x5386ab-_0x5967a9*_0x44937f)/0x2)+_0x44937f/0x2,_0xc86ac2=_0xc86ac2+_0x25f80f-0x8;for(const _0x4e39f8 of _0x452d37[_0x232763(0x23d)]){this[_0x232763(0x171)](_0x4e39f8[0x0],_0x4e39f8[0x1],_0x2334cf,_0xc86ac2),_0x2334cf+=_0x44937f;}},Window_SavefileList[_0x75a59f(0x12e)]['drawSvBattlerSprites']=function(_0x3c4b11,_0x4d0fd3,_0x3da799,_0x46a7b6,_0x5428ff){const _0x4496be=_0x75a59f;if(!_0x3c4b11[_0x4496be(0x22c)])return this[_0x4496be(0x17f)](_0x3c4b11,_0x4d0fd3,_0x3da799,_0x46a7b6,_0x5428ff);let _0x4302da=Math['max'](_0x3c4b11[_0x4496be(0x22c)][_0x4496be(0x1bb)],Scene_File[_0x4496be(0x208)]);const _0x3e9910=ImageManager[_0x4496be(0x1c8)];_0x4d0fd3=_0x4d0fd3+Math[_0x4496be(0x12b)]((_0x46a7b6-_0x4302da*_0x3e9910)/0x2)+_0x3e9910/0x2,_0x3da799=_0x3da799+_0x5428ff-0x8;for(const _0x4b2fa0 of _0x3c4b11[_0x4496be(0x22c)]){this['drawSvActor'](_0x4b2fa0,_0x4d0fd3,_0x3da799),_0x4d0fd3+=_0x3e9910;}},Window_SavefileList[_0x75a59f(0x12e)][_0x75a59f(0x152)]=function(_0xd63214,_0x1e7980,_0x7429c7,_0x454db0,_0x517e64,_0x14fa4d){const _0xc38204=_0x75a59f;if(_0xd63214==='')return;_0x1e7980+=0x2,_0x7429c7+=0x2,_0x454db0-=0x4,_0x517e64-=0x4;const _0x53fd1=ImageManager[_0xc38204(0x128)](_0xd63214),_0x4f5522=_0x53fd1[_0xc38204(0xe3)],_0x164819=_0x53fd1['height'],_0x5d1daf=Math[_0xc38204(0x17d)](_0x454db0/_0x4f5522,_0x517e64/_0x164819,_0x14fa4d?0x1:0x3e8),_0xb73824=Math[_0xc38204(0x104)](_0x53fd1[_0xc38204(0xe3)]*_0x5d1daf),_0x3f11c4=Math[_0xc38204(0x104)](_0x53fd1[_0xc38204(0x183)]*_0x5d1daf);this[_0xc38204(0x146)][_0xc38204(0x191)](_0x53fd1,0x0,0x0,_0x4f5522,_0x164819,_0x1e7980,_0x7429c7,_0xb73824,_0x3f11c4);},Window_SavefileList[_0x75a59f(0x12e)][_0x75a59f(0x222)]=function(_0x5a5902,_0x57cceb,_0xbaee7,_0x247bb4,_0x5566aa,_0xd2c904){const _0x1e37fa=_0x75a59f;if(_0x5a5902==='')return;_0x57cceb+=0x2,_0xbaee7+=0x2,_0x247bb4-=0x4,_0x5566aa-=0x4;const _0x2293e3=ImageManager['loadPicture'](_0x5a5902),_0xfe05d7=_0x2293e3[_0x1e37fa(0xe3)],_0x7bee4e=_0x2293e3[_0x1e37fa(0x183)],_0x50ef85=Math[_0x1e37fa(0x17d)](_0x247bb4/_0xfe05d7,_0x5566aa/_0x7bee4e,_0xd2c904?0x1:0x3e8),_0x4f6015=Math['ceil'](_0x2293e3[_0x1e37fa(0xe3)]*_0x50ef85),_0x5ad636=Math[_0x1e37fa(0x104)](_0x2293e3[_0x1e37fa(0x183)]*_0x50ef85);_0x57cceb+=(_0x247bb4-_0x4f6015)/0x2,_0xbaee7+=(_0x5566aa-_0x5ad636)/0x2,this[_0x1e37fa(0x146)][_0x1e37fa(0x191)](_0x2293e3,0x0,0x0,_0xfe05d7,_0x7bee4e,_0x57cceb,_0xbaee7,_0x4f6015,_0x5ad636);},Window_SavefileList['prototype'][_0x75a59f(0x1e5)]=function(_0x11d410,_0x405dd8,_0x862660,_0x1edc3d,_0x268f64){const _0x44ebdf=_0x75a59f;_0x11d410[_0x44ebdf(0xdf)]&&(_0x268f64=_0x268f64||_0x44ebdf(0x168),this[_0x44ebdf(0x1e1)](_0x11d410[_0x44ebdf(0xdf)],_0x405dd8,_0x862660,_0x1edc3d,_0x268f64));},Window_SavefileList['prototype'][_0x75a59f(0x1ef)]=function(_0x3dc5e5,_0x678f84,_0x270de5,_0x52a8a5,_0x140062){const _0x5bf4f2=_0x75a59f;if(_0x3dc5e5[_0x5bf4f2(0x133)]){_0x140062=_0x140062||_0x5bf4f2(0x168);let _0x993a71=this[_0x5bf4f2(0x156)](_0x3dc5e5);Imported[_0x5bf4f2(0x187)]&&this[_0x5bf4f2(0xbd)]()&&(_0x993a71='{{%1}}'[_0x5bf4f2(0x1b9)](_0x993a71)),this['drawText'](_0x993a71,_0x678f84,_0x270de5,_0x52a8a5,_0x140062);}},Window_SavefileList['prototype']['getTimestamp']=function(_0x19f01f){const _0x4134db=_0x75a59f,_0x280dda=_0x19f01f['timestamp'],_0x5b9031=new Date(_0x280dda);let _0x3cd483=_0x4134db(0xd3);_0x3cd483=_0x3cd483[_0x4134db(0x206)](/\[YEAR\]/gi,'%1'),_0x3cd483=_0x3cd483[_0x4134db(0x206)](/\[MONTH\]/gi,'%2'),_0x3cd483=_0x3cd483[_0x4134db(0x206)](/\[DATE\]/gi,'%3'),_0x3cd483=_0x3cd483[_0x4134db(0x206)](/\[HOUR\]/gi,'%4'),_0x3cd483=_0x3cd483[_0x4134db(0x206)](/\[MINUTE\]/gi,'%5'),_0x3cd483=_0x3cd483[_0x4134db(0x206)](/\[SECOND\]/gi,'%6');let _0x385fc2=String(_0x5b9031[_0x4134db(0x201)]())[_0x4134db(0x251)]('')[_0x4134db(0x18c)]('​'),_0x1c6dcf=String(_0x5b9031['getMonth']()+0x1),_0x243511=String(_0x5b9031[_0x4134db(0x21d)]())[_0x4134db(0x1b8)](0x2,'0'),_0x4944ba=String(_0x5b9031[_0x4134db(0xfe)]())[_0x4134db(0x1b8)](0x2,'0'),_0x2250ca=String(_0x5b9031['getMinutes']())[_0x4134db(0x1b8)](0x2,'0'),_0xf80ab0=String(_0x5b9031[_0x4134db(0xeb)]())[_0x4134db(0x1b8)](0x2,'0'),_0x355c17=_0x3cd483['format'](_0x385fc2,_0x1c6dcf,_0x243511,_0x4944ba,_0x2250ca,_0xf80ab0);return _0x355c17;},Window_SavefileList[_0x75a59f(0x12e)][_0x75a59f(0x10d)]=function(_0x5a0abe,_0x3706d6,_0x4e5bd8,_0x68bfa0){const _0x3633ae=_0x75a59f;if(_0x5a0abe[_0x3633ae(0x24f)]===undefined)return;const _0x21e731=_0x5a0abe['gold'],_0x5efe34=TextManager[_0x3633ae(0x1ff)];Window_SavefileList[_0x3633ae(0x12e)]['drawCurrencyValue']['call'](this,_0x21e731,_0x5efe34,_0x3706d6,_0x4e5bd8,_0x68bfa0);},Window_SavefileList[_0x75a59f(0x12e)][_0x75a59f(0x15c)]=function(_0x1d1382,_0x107234,_0x220543,_0x167ce9,_0x5ef209){const _0x6a5e07=_0x75a59f;if(_0x1d1382['description']){const _0x9ee8e6=this[_0x6a5e07(0x1d0)](_0x1d1382[_0x6a5e07(0x163)])[_0x6a5e07(0xe3)];_0x5ef209=_0x5ef209||'left';if(_0x5ef209===_0x6a5e07(0x1a5))_0x107234=_0x107234+_0x167ce9-_0x9ee8e6;else _0x5ef209==='center'&&(_0x107234=_0x107234+(_0x167ce9-_0x9ee8e6)/0x2);this['drawTextEx'](_0x1d1382[_0x6a5e07(0x163)],_0x107234,_0x220543,_0x167ce9);}},Window_SavefileList[_0x75a59f(0x12e)][_0x75a59f(0x20f)]=function(_0x2a747d,_0x1474c1){const _0x41c2b6=_0x75a59f;if(_0x2a747d){const _0x573355=ImageManager['loadPicture'](_0x2a747d[_0x41c2b6(0xd0)]||'');_0x573355[_0x41c2b6(0xc1)](this[_0x41c2b6(0x249)][_0x41c2b6(0xc9)](this,_0x2a747d,_0x1474c1));}else this[_0x41c2b6(0x1f3)](this[_0x41c2b6(0xe9)],_0x1474c1);},Window_SavefileList[_0x75a59f(0x12e)][_0x75a59f(0x249)]=function(_0x5bb456,_0x13b890){const _0xdb5c45=_0x75a59f,_0x252cf5=this[_0xdb5c45(0xdb)]();switch(_0x252cf5){case'vertical':this[_0xdb5c45(0x11f)](_0x5bb456,_0x13b890);break;case _0xdb5c45(0xec):this[_0xdb5c45(0x1ad)](_0x5bb456,_0x13b890);break;case'large':this[_0xdb5c45(0x158)](_0x5bb456,_0x13b890);break;default:this[_0xdb5c45(0x139)](_0x5bb456,_0x13b890);break;}this[_0xdb5c45(0x1d5)]();const _0x48e75d=_0x5bb456[_0xdb5c45(0x22b)];this['drawFileData'](_0x48e75d,_0x13b890);},Window_SavefileList[_0x75a59f(0x12e)][_0x75a59f(0x1f3)]=function(_0x56d1f1,_0x39c1fd){const _0x38205b=_0x75a59f,_0x450844=this['menuStyle']();switch(_0x450844){case _0x38205b(0x157):this[_0x38205b(0x11b)](_0x56d1f1,_0x39c1fd);break;case _0x38205b(0xec):this['drawBoxStyleFileData'](_0x56d1f1,_0x39c1fd);break;case _0x38205b(0xca):this[_0x38205b(0x17a)](_0x56d1f1,_0x39c1fd);break;default:this[_0x38205b(0x132)](_0x56d1f1,_0x39c1fd);break;}},Window_SavefileList[_0x75a59f(0x12e)][_0x75a59f(0x139)]=function(_0xc1ebac,_0x3397fa){const _0x19f87d=_0x75a59f;VisuMZ['SaveCore'][_0x19f87d(0x1de)][_0x19f87d(0x1cb)][_0x19f87d(0x1e4)][_0x19f87d(0x1cd)](this,_0xc1ebac,_0x3397fa);},Window_SavefileList[_0x75a59f(0x12e)]['drawVerticalStyleContents']=function(_0x133420,_0x592e52){const _0x191676=_0x75a59f;VisuMZ[_0x191676(0x124)][_0x191676(0x1de)][_0x191676(0x1cb)][_0x191676(0xea)][_0x191676(0x1cd)](this,_0x133420,_0x592e52);},Window_SavefileList['prototype']['drawBoxStyleContents']=function(_0x36d483,_0x51d1de){const _0x4cb98b=_0x75a59f;VisuMZ[_0x4cb98b(0x124)][_0x4cb98b(0x1de)][_0x4cb98b(0x1cb)][_0x4cb98b(0x1f2)][_0x4cb98b(0x1cd)](this,_0x36d483,_0x51d1de);},Window_SavefileList[_0x75a59f(0x12e)][_0x75a59f(0x158)]=function(_0x253762,_0x3287e7){const _0x151104=_0x75a59f;VisuMZ[_0x151104(0x124)][_0x151104(0x1de)][_0x151104(0x1cb)][_0x151104(0x1fc)][_0x151104(0x1cd)](this,_0x253762,_0x3287e7);},Window_SavefileList[_0x75a59f(0x12e)][_0x75a59f(0x132)]=function(_0x2fd798,_0x4a2079){const _0x53ed9b=_0x75a59f;VisuMZ[_0x53ed9b(0x124)]['Settings'][_0x53ed9b(0x1cb)][_0x53ed9b(0xd4)][_0x53ed9b(0x1cd)](this,_0x2fd798,_0x4a2079);},Window_SavefileList[_0x75a59f(0x12e)][_0x75a59f(0x11b)]=function(_0x4a2cad,_0x4a91e4){const _0x5a46bb=_0x75a59f;VisuMZ[_0x5a46bb(0x124)]['Settings'][_0x5a46bb(0x1cb)][_0x5a46bb(0x24c)][_0x5a46bb(0x1cd)](this,_0x4a2cad,_0x4a91e4);},Window_SavefileList[_0x75a59f(0x12e)]['drawBoxStyleFileData']=function(_0x523664,_0x461d2d){const _0x1c75ac=_0x75a59f;VisuMZ[_0x1c75ac(0x124)][_0x1c75ac(0x1de)][_0x1c75ac(0x1cb)][_0x1c75ac(0x1b4)][_0x1c75ac(0x1cd)](this,_0x523664,_0x461d2d);},Window_SavefileList[_0x75a59f(0x12e)][_0x75a59f(0x17a)]=function(_0x4ba274,_0x2c3d41){const _0x549ca5=_0x75a59f;VisuMZ[_0x549ca5(0x124)][_0x549ca5(0x1de)][_0x549ca5(0x1cb)][_0x549ca5(0x13d)][_0x549ca5(0x1cd)](this,_0x4ba274,_0x2c3d41);};