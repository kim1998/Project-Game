//=============================================================================
// VisuStella MZ - Main Menu Core
// VisuMZ_1_MainMenuCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MainMenuCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MainMenuCore = VisuMZ.MainMenuCore || {};
VisuMZ.MainMenuCore.version = 1.26;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.26] [MainMenuCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Main_Menu_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Main Menu Core plugin is designed to give you more control over the Main
 * Menu outside of RPG Maker MZ's editor's control. Game devs are given control
 * over how commands work, visual aesthetics pertaining to the Main Menu, and 
 * assign menu images to actors as background portraits.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general Main Menu settings.
 * * The ability to set Menu Background Portraits for individual actors.
 * * Flexibility in changing which commands appear in the Main Menu.
 * * Add new windows like the Playtime Window and Variable windows.
 * * Change the style of how the windows are arranged in the Main Menu.
 * * Change the way the status list is displayed and the way it's displayed.
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
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 *
 * <Menu Portrait: filename>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" style Main Menu List.
 * - Sets the menu image for the actor to 'filename'.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 *
 * ---
 * 
 * <Menu Portrait Offset: +x, +y>
 * <Menu Portrait Offset: -x, -y>
 * 
 * <Menu Portrait Offset X: +x>
 * <Menu Portrait Offset X: -x>
 * 
 * <Menu Portrait Offset Y: +y>
 * <Menu Portrait Offset Y: -y>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" style Main Menu List.
 * - Offsets the X and Y coordinates for the menu image.
 * - Replace 'x' with a number value that offsets the x coordinate.
 * - Negative x values offset left. Positive x values offset right.
 * - Replace 'y' with a number value that offsets the y coordinate.
 * - Negative y values offset up. Positive x values offset down.
 * - This only applies to the Main Menu portraits.
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
 * Actor: Change Menu Image (Group)
 * Actor: Change Menu Image (Range)
 * Actor: Change Menu Image (JS)
 * - Changes the actor's Menu Image.
 * - Each version has a different means of selecting Actor ID's.
 *
 *   Actor ID:
 *   - Select which ID(s) to affect.
 *
 *   Filename:
 *   - Selected actor(s) will have their menu images changed to this.
 *
 * ---
 * 
 * Actor: Change Menu Image (JS) (v1.24)
 * - Changes an actor's Menu Image using JavaScript.
 * - Allows more control with more text entry.
 * 
 *   JS: Actor ID:
 *   - Enter which Actor ID to affect.
 *   - Uses JavaScript code.
 * 
 *   JS: Filename:
 *   - Enter the filename you wish to use.
 *   - Uses JavaScript code.
 * 
 * ---
 * 
 * === Menu Command Plugin Commands ===
 * 
 * ---
 * 
 * Menu Command: Clear Forced Settings
 * - Clear any forced settings for the menu command symbols.
 * 
 *   Symbol(s):
 *   - Insert the symbols of the menu commands here.
 *   - The symbols are case sensitive.
 *   - VisuStella is NOT responsible for any errors produced by menus that
 *     become accessible outside of their intended usage.
 * 
 * ---
 * 
 * Menu Command: Force Disable
 * - Forcefully disable specific menu commands via their symbols.
 * - Matching forced enabled symbols will be overwritten.
 * 
 *   Symbol(s):
 *   - Insert the symbols of the menu commands here.
 *   - The symbols are case sensitive.
 *   - VisuStella is NOT responsible for any errors produced by menus that
 *     become accessible outside of their intended usage.
 * 
 * ---
 * 
 * Menu Command: Force Enable
 * - Forcefully enable specific menu commands via their symbols.
 * - Matching forced disabled symbols will be overwritten.
 * 
 *   Symbol(s):
 *   - Insert the symbols of the menu commands here.
 *   - The symbols are case sensitive.
 *   - VisuStella is NOT responsible for any errors produced by menus that
 *     become accessible outside of their intended usage.
 * 
 * ---
 * 
 * Menu Command: Force Hide
 * - Forcefully hide specific menu commands via their symbols.
 * - Matching forced shown symbols will be overwritten.
 * 
 *   Symbol(s):
 *   - Insert the symbols of the menu commands here.
 *   - The symbols are case sensitive.
 *   - VisuStella is NOT responsible for any errors produced by menus that
 *     become accessible outside of their intended usage.
 * 
 * ---
 * 
 * Menu Command: Force Show
 * - Forcefully show specific menu commands via their symbols.
 * - Matching forced hidden symbols will be overwritten.
 * 
 *   Symbol(s):
 *   - Insert the symbols of the menu commands here.
 *   - The symbols are case sensitive.
 *   - VisuStella is NOT responsible for any errors produced by menus that
 *     become accessible outside of their intended usage.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These general settings contain various settings on how the Main Menu scene
 * displays certain windows, alters how specific windows behave, and determines
 * which scenes would display actor menu images as background portraits.
 *
 * ---
 *
 * Gold Window
 * 
 *   Thinner Gold Window:
 *   - Make the Gold Window thinner in the Main Menu?
 *   - Used to match the Playtime and Variable Windows.
 *   - Only applies to the Command Window style: Default Vertical.
 * 
 *   Auto Adjust Height:
 *   - Automatically adjust the height for the thinner Gold Window?
 *
 *   Auto Adjust Y:
 *   - Automatically adjust the Y position for the thinner Gold Window?
 *
 * ---
 * 
 * Status Window
 * 
 *   Select Last?:
 *   - When picking a personal command from the Command Window, select the
 *     last picked actor or always the first?
 * 
 * ---
 *
 * Solo Party
 *
 *   Solo Quick Mode:
 *   - When selecting "Skills", "Equip", or "Status" with one party member,
 *     immediately go to the scene.
 *
 * ---
 *
 * Sub Menus
 *
 *   Menus with Actor BG's:
 *   - A list of the menus that would be compatible with Actor Menu Backgrounds
 *
 *   JS: Actor BG Action:
 *   - Code used to determine how to display the sprites upon loading.
 *
 * ---
 * 
 * Party Window
 * 
 *   Show Reserve Memebers:
 *   - Show reserve members while on the Main Menu scene?
 * 
 *   Hide Main Menu Only
 *   - If reserve members are hidden, hide them only in the main menu or
 *     all scenes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Command Window List
 * ============================================================================
 *
 * The Command Window functions as a hub to the various scenes linked from the
 * Main Menu. These include 'Item', 'Skill', 'Equip', 'Status', 'Save', and
 * so on. This Plugin Parameter is an array that lets you add, remove, and/or
 * alter the Command Window's various commands, how they're handled, whether or
 * not they're visible, and how they react when selected.
 *
 * These will require knowledge of JavaScript to use them properly.
 *
 * ---
 *
 * Command Window List
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   Subcategory:
 *   - The subcategory used for this command.
 *   - Leave empty for no subcategory.
 *
 *   Icon:
 *   - Icon used for this command.
 *   - Use 0 for no icon.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 *   JS: Personal Code:
 *   - JavaScript code that runs once the actor list is selected with this
 *     command highlighted.
 *
 * ---
 * 
 * ==== Subcategories ====
 * 
 * Subcategories are a new addition to the Main Menu Core version 1.18. When a
 * subcategory is set, it will only display Command Window items that belong
 * to that subcategory. Those Command Window items do not appear when there is
 * no subcategory active or if it's a different subcategory.
 * 
 * ---
 * 
 * To create a subcategory, a few things must be done:
 * 
 * 1. The subcategory symbol must be "subcategory".
 * 
 * 2. The string returned by JS: Ext determines the subcategory. In the default
 *    Plugin Parameters, 'datalog' is returned as the subcategory. This becomes
 *    the subcategory when picked.
 * 
 * 3. For the JS: Run Code, have the following code somewhere in it:
 * 
 *    const ext = arguments[0];
 *    this.setSubcategory(ext);
 * 
 * ---
 * 
 * To make a Command Window item be a part of a subcategory do the following:
 * 
 * 1. Take the JS: Ext string value (case sensitive).
 * 
 * 2. Set it as the target Command Window item's "Subcategory" value.
 * 
 * 3. If the subcategory doesn't exist, then this Command Window item will
 *    appear normally.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Playtime Window
 * ============================================================================
 *
 * The Playtime Window is an optional feature that can be displayed in the
 * Main Menu. As its name suggests, it displays the playtime of the player's
 * current play through.
 *
 * ---
 *
 * Playtime Window
 * 
 *   Enable:
 *   - Use the Playtime Window?
 * 
 *   Adjust Command Window:
 *   - Adjust the command window's height to fit in the Playtime Window?
 *
 *   Background Type:
 *   - Select background type for the Playtime window.
 * 
 *   Font Size:
 *   - Font size used for displaying Gold inside the Playtime window.
 * 
 *   Time Icon:
 *   - Icon displayed for the 'Time' label.
 * 
 *   Time Text:
 *   - Text for the display of 'Time' in the Playtime window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the Playtime window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Variable Window
 * ============================================================================
 *
 * The Variable Window is an optional feature that can be displayed in the
 * Main Menu. If enabled, the Variable Window will display variables of the
 * game dev's choice in the Main Menu itself.
 *
 * ---
 *
 * Variable Window
 * 
 *   Enable:
 *   - Use the Variable Window?
 * 
 *   Adjust Command Window:
 *   - Adjust the command window's height to fit in the Variable Window?
 *
 *   Background Type:
 *   - Select background type for the Variable window.
 * 
 *   Font Size:
 *   - Font size used for displaying Gold inside the Variable window.
 * 
 *   Variable List:
 *   - Select variables to be displayed into the window.
 *     Use \i[x] to determine their icon.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the Variable window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Command Window Style & Command Style Settings
 * ============================================================================
 *
 * This determines how the Main Menu appears based on the Command Window Style.
 * If anything but the 'Default' is used, then these settings will take over
 * the window placement settings for the Main Menu. This means that even if you
 * are using VisuStella's Core Engine, the window layouts will be overwritten.
 *
 * ---
 *
 * Command Window Style:
 * - Choose the positioning and style of the Main Menu Command Window.
 * - This will automatically rearrange windows.
 * 
 *   Default Vertical Side Style:
 *   - The default Main Menu layout style.
 *   - Affected by VisuStella's Core Engine's Plugin Parameter settings.
 * 
 *   Top Horizontal Style:
 *   - Puts the Command Window at the top of the screen.
 *   - Gold, Playlist, and Variable Windows are moved to the bottom.
 *   - The Actor List Window is placed in the middle.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 *
 *   Bottom Horizontal Style:
 *   - Puts the Command Window at the bottom of the screen.
 *   - Gold, Playlist, and Variable Windows are moved to the top.
 *   - The Actor List Window is placed in the middle.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 * 
 *   Mobile Full Screen Style:
 *   - Puts the Command Window at the center of the screen with larger buttons.
 *   - Gold, Playlist, and Variable Windows are moved to the bottom.
 *   - The Actor List Window is hidden until prompted to be selected.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 *
 * ---
 *
 * Command Style Settings
 *
 *   Style:
 *   - How do you wish to draw command entries in the Command Window?
 *   - Text Only: displays only text.
 *   - Icon Only: displays only the icon.
 *   - Icon + Text: displays icon first, then text.
 *   - Automatic: determines the best fit for the size
 *
 *   Text Alignment:
 *   - Decide how you want the text to be aligned.
 *   - Left, Center, or Right
 * 
 *   Rows:
 *   - Number of visible rows.
 *   - Applies only to Top, Bottom, and Mobile styles.
 * 
 *   Columns:
 *   - Number of maximum columns.
 *   - Applies only to Top, Bottom, and Mobile styles.
 * 
 *   Mobile Thickness:
 *   - The thickness of the buttons for mobile version.
 *   - Applies only to Top, Bottom, and Mobile styles.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Status Graphic, Status List Style, & List Style Settings
 * ============================================================================
 *
 * Choose how the contents Actor Status List Window in the Main Menu appears.
 * This can range from the which actor graphic is drawn to the style used for
 * the data that's displayed.
 *
 * ---
 *
 * Status Graphic:
 * - Choose how the graphic for actor graphics appear in status-like menus.
 * 
 *   None:
 *   - Don't display any graphic for the actors.
 * 
 *   Face:
 *   - Display the actors' faces. This is the default option in RPG Maker MZ.
 *
 *   Map Sprite:
 *   - Display the actors' map sprites.
 * 
 *   Sideview Battler:
 *   - Display the actors' sideview battlers.
 *
 * ---
 *
 * Main Menu List Style
 * - Choose how the actor status list looks in the Main Menu.
 *
 * Inner-Menu List Style
 * - Choose how the actor status list looks in the inner menus like Scene_Item,
 *   Scene_Skill, etc.
 *
 *   Default Horizontal Style:
 *   - This is the default style found in RPG Maker MZ's Main Menu.
 *
 *   Vertical Style:
 *   - Makes the display for the actor list vertical instead of horizontal.
 *
 *   Portrait Style:
 *   - Similar to the vertical style, except each actor's Menu Image is
 *     displayed in the background instead. Portraits are required.
 *   - If there is no Menu Image used, this will switch over to the Vertical
 *     Style and use a face graphic instead.
 *
 *   Solo Style:
 *   - Used for solo party member games. Extends the whole view of the Status
 *     Window to accomodate a single actor.
 *
 *   Thin Horizontal Style:
 *   - Makes the selectable menu entries for the actors a single line thin.
 *
 *   Thicker Horizontal Style:
 *   - Makes the selectable menu entries for the actors two lines thick.
 *
 * ---
 *
 * List Styles
 *   JavaScript code used to determine how the individual styles are drawn.
 *
 *   JS: Default:
 *   JS: Vertical:
 *   JS: Portrait:
 *   JS: Solo:
 *   JS: Thin:
 *   JS: Thicker:
 *   - Code used to draw the data for these styles.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Mouse Cursor Settings
 * ============================================================================
 *
 * Add/enable a custom mouse cursor for your game. This will use a graphic
 * found in the game project's /icon/ folder to use as the custom mouse
 * cursor when hovering over the game.
 * 
 * Does not work on mobile devices.
 *
 * ---
 *
 * General Settings
 * 
 *   Enable?:
 *   - Enable custom cursor?
 *   - Requires a custom 'Idle' graphic.
 * 
 * ---
 * 
 * Graphic Settings
 * 
 *   Idle Filename:
 *   - Graphic used for mouse cursor when idle or moving.
 *   - Required for a custom mouse cursor.
 *   - Located in game project's /icon/ folder.
 *   - Include .png extension (ie. Cursor1.png)
 * 
 *   Click Filename:
 *   - Optional.
 *   - Graphic used for mouse cursor when clicked or held.
 *   - Uses the 'Idle' graphic if 'Click' graphic is not used.
 *   - Located in game project's /icon/ folder.
 *   - Include .png extension (ie. Cursor2.png)
 * 
 * ---
 * 
 * Anchor Settings
 * 
 *   Anchor X:
 *   - Anchor X value for the custom cursor.
 *   - 0.0 - left; 0.5 - center; 1.0 - right
 * 
 *   Anchor Y:
 *   - Anchor Y value for the custom cursor.
 *   - 0.0 - top; 0.5 - middle; 1.0 - bottom
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
 * Version 1.26: October 17, 2024
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Due to conflicts with deployment, the Custom Mouse Cursor has its base
 *    location moved from /img/system/ to /icon/.
 * ** Please move the cursor file(s) as well as update the Plugin Parameters.
 * ** Sorry for the inconvenience.
 * 
 * Version 1.25: September 19, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Parameters > Custom Mouse Cursor
 * ****  Add/enable a custom mouse cursor for your game.
 * 
 * Version 1.24: August 29, 2024
 * * Compatibility Update
 * ** When "Load" command is used with Save Core's Single-Save Mode,
 *    automatically load up the save instead of going to the Load Menu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Plugin Command renamed:
 * *** Actor: Change Menu Image (JS) to Actor: Change Menu Image (JS) (Legacy)
 * * New Features!
 * ** New Plugin Command added by Arisu:
 * *** Actor: Change Menu Image (JS) (v1.24)
 * **** Changes an actor's Menu Image using JavaScript.
 * **** Allows more control with more text entry.
 * 
 * Version 1.23: February 15, 2024
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Feature Update!
 * ** Updated the default Plugin Parameters for 'Command Window List' to
 *    include a 'Battle Tactics' command.
 * *** This is for the upcoming VisuStella MZ plugins.
 * *** Projects with the Main Menu Core already installed will not have this
 *     update, but you can copy over the settings from a new project with the
 *     following steps:
 * **** Create a new project. Install Main Menu Core. Open up the new project's
 *      'Command Window List'. Right click the 'battleGridTactics' option(s)
 *      and click copy. Go to the target project's Main Menu Core's 'Command
 *      Window List' plugin parameter. Paste the command where you want it
 *      to go.
 * 
 * Version 1.22: October 12, 2023
 * * Feature Update!
 * ** Subcategories are now maintained when exiting a scene pushed forward by
 *    a subcategory. Added by Olivia and sponsored by AndyL.
 * 
 * Version 1.21: April 13, 2023
 * * Bug Fixes!
 * ** Multiple subcategories should now work properly. Fix made by Arisu.
 * 
 * Version 1.20: March 16, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Feature Update!
 * ** Updated the default Plugin Parameters for 'Command Window List' to
 *    include a 'Bestiary' command.
 * *** This is for the upcoming VisuStella MZ plugins.
 * *** Projects with the Main Menu Core already installed will not have this
 *     update, but you can copy over the settings from a new project with the
 *     following steps:
 * **** Create a new project. Install Main Menu Core. Open up the new project's
 *      'Command Window List'. Right click the 'bestiary' option(s) and click
 *      copy. Go to the target project's Main Menu Core's 'Command Window List'
 *      plugin parameter. Paste the command where you want it to go.
 * 
 * Version 1.19: December 15, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Feature Update!
 * ** Updated the default Plugin Parameters for 'Command Window List' to
 *    include a 'CG Gallery', 'Credits Page', and 'Patch Notes' command.
 * *** This is for the upcoming VisuStella MZ plugins.
 * *** Projects with the Main Menu Core already installed will not have this
 *     update, but you can copy over the settings from a new project with the
 *     following steps:
 * **** Create a new project. Install Main Menu Core. Open up the new project's
 *      'Command Window List'. Right click the 'cgGallery', 'creditsPage', or
 *      'patchNotes' option(s) and click copy. Go to the target project's Main
 *      Menu Core's 'Command Window List' plugin parameter. Paste the command
 *      where you want it to go.
 * 
 * Version 1.18: October 27, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added a new section into Plugin Parameters: Command Window List for
 *    "Subcategories" and adding info on how they are handled.
 * * Feature Update!
 * ** Updated the default Plugin Parameters for 'Command Window List' to
 *    include a 'Tutorial List' command.
 * *** This is for the upcoming VisuMZ_2_TutorialPanelSys plugin.
 * *** Projects with the Main Menu Core already installed will not have this
 *     update, but you can copy over the settings from a new project with the
 *     following steps:
 * **** Create a new project. Install Main Menu Core. Open up the new project's
 *      'Command Window List'. Right click the 'tutorialList' option and click
 *      copy. Go to the target project's Main Menu Core's 'Command Window List'
 *      plugin parameter. Paste the command where you want it to go.
 * ** Subcategory called "Datalog" is now added.
 * *** Projects with the Main Menu Core already installed will not have this
 *     update, but you can copy over the settings from a new project with the
 *     following steps:
 * **** Create a new project. Install Main Menu Core. Open up the new project's
 *      'Command Window List'. Right click the 'subcategory' option and click
 *      copy. Go to the target project's Main Menu Core's 'Command Window List'
 *      plugin parameter. Paste the command where you want it to go.
 * **** Existing entries for Quest, Message Log, and Combat Log are now added
 *      to the Datalog subcategory.
 * * New Features!
 * ** Subcategory support is now added for the Main Menu Command Window.
 * *** Subcategories allow you to make some Command Window items invisible
 *     until a subcategory is selected. This helps reduce clutter and save room
 *     on the Command Window command list.
 * 
 * Version 1.17: August 18, 2022
 * * Bug Fixes!
 * ** Changed actor graphics now reflect properly for those using the default
 *    status menu. Fix made by Irina.
 * 
 * Version 1.16: April 21, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu and sponsored by AndyL:
 * *** Menu Command: Clear Forced Settings
 * *** Menu Command: Force Disable
 * *** Menu Command: Force Enable
 * *** Menu Command: Force Hide
 * *** Menu Command: Force Show
 * **** These new Plugin Commands allow you to forcefully show, hide, enable,
 *      or disable Plugin Commands regardless of their required settings.
 * **** We are not responsible for errors that occur by accessing menus that
 *      should otherwise be disabled or hidden.
 * 
 * Version 1.15: February 10, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: October 25, 2021
 * * Bug Fixes!
 * ** Plugin Parameter settings for automatic Command Window height adjustment
 *    should now work properly. Fix made by Irina.
 * * Documentation Update!
 * ** Added a note for the Help File: Gold Window > Thinner Gold Window
 * *** Only applies to the Command Window style: Default Vertical.
 * 
 * Version 1.13: October 21, 2021
 * * Feature Update!
 * ** Rounding update applied to picture portraits so that coordinates aren't
 *    drawn on non-whole numbers due to base images having odd values. Update
 *    made by Olivia.
 * 
 * Version 1.12: July 16, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Feature Update!
 * ** Updated the default Plugin Parameters for 'Command Window List' to
 *    include a 'Message Log' command.
 * *** This is for the upcoming VisuMZ_3_MessageLog plugin.
 * *** Projects with the Main Menu Core already installed will not have this
 *     update, but you can copy over the settings from a new project with the
 *     following steps:
 * **** Create a new project. Install Main Menu Core. Open up the new project's
 *      'Command Window List'. Right click the 'MessageLog' option and click
 *      copy. Go to the target project's Main Menu Core's 'Command Window List'
 *      plugin parameter. Paste the command where you want it to go.
 * 
 * Version 1.11: May 14, 2021
 * * Feature Update!
 * ** Updated the default Plugin Parameters for 'Command Window List' to
 *    include a 'Load' command after the 'Save' command.
 * *** This allows players to access the load game screen from the Main Menu.
 * *** Projects with the Main Menu Core already installed will not have this
 *     update, but you can copy over the settings from a new project with the
 *     following steps:
 * **** Create a new project. Install Main Menu Core. Open up the new project's
 *      'Command Window List'. Right click the 'Load' option and click copy.
 *      Go to the target project's Main Menu Core's 'Command Window List'
 *      plugin parameter. Paste the command where you want it to go.
 * 
 * Version 1.10: April 16, 2021
 * * Feature Update!
 * ** Default style for List Styles now have its code updated with the
 *    JS: Default plugin parameter for games whose vertical screen resolution
 *    is larger than normal.
 * *** To update this, do either of the following:
 * **** Open up the Main Menu Core Plugin Parameters. Select and press delete 
 *      on "List Style Settings". Press Enter. New updated settings will be
 *      replaced for the JS: Default settings.
 * **** Or Delete the existing VisuMZ_1_MainMenuCore.js in the Plugin Manager
 *      list and install the newest version.
 * 
 * Version 1.09: March 19, 2021
 * * Documentation Update!
 * ** Added clarity for the "Portrait Style" in Plugin Parameters section for
 *    "Status Graphic, Status List Style, & List Style Settings":
 * *** If there is no Menu Image used, this will switch over to the Vertical
 *     Style and use a face graphic instead.
 * 
 * Version 1.08: February 26, 2021
 * * Feature Update!
 * ** Default Plugin Parameters for the List Style Settings defaults have been
 *    updated with tighter coordinate values to allow for more accurate display
 *    of UI element positioning. Update made by Olivia.
 * 
 * Version 1.07: January 1, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Removed "<Menu Image: filename>" version of notetag to reduce confusion
 *    and to stick with the norm declared by the Battle Core.
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Menu Portrait Offset: +x, +y>
 * *** <Menu Portrait Offset X: +x>
 * *** <Menu Portrait Offset Y: +y>
 * **** This is used with the "Portrait" style Main Menu list.
 * **** Offsets the X and Y coordinates for the menu portrait.
 * 
 * Version 1.06: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.05: October 11, 2020
 * * Documentation Update!
 * ** Documentation added for the new plugin parameter.
 * * New Features!
 * ** New plugin parameter added by Yanfly.
 * *** Plugin Parameters > General > Status Window > Select Last?
 * **** When picking a personal command from the Command Window, select the
 *      last picked actor or always the first?
 * 
 * Version 1.04: October 4, 2020
 * * Feature Update!
 * ** Certain windows will now pre-load all associated image types for the
 *    actor upon being created to avoid custom JS drawing problems.
 *    Change made by Irina.
 * ** Failsafes have been added to prevent non-existent variables from crashing
 *    the game if a user does not remove them from the variable list. Change
 *    made by Irina.
 * 
 * Version 1.03: September 20, 2020
 * * Documentation Update!
 * ** Added the alternative notetag <Menu Portrait: filename> that also works
 *    the same way as <Menu Image: filename>.
 * 
 * Version 1.02: September 13, 2020
 * * Compatibility Update!
 * ** Better compatibility for SV Actor graphics.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Skill check plugin parameter for show fixed. Fixed by Yanfly and Shaz.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Command Window List > skill >
 *     JS: Show > and changing 'this.needsCommand("item")' to
 *     'this.needsCommand("skill")'
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
 * @command ChangeActorMenuImageGroup
 * @text Actor: Change Menu Image (Group)
 * @desc Changes the actor's Menu Image.
 * Select from a group of actor ID's to change.
 *
 * @arg Step1:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageRange
 * @text Actor: Change Menu Image (Range)
 * @desc Changes the actor's Menu Image.
 * Select from a range of actor ID's to change.
 *
 * @arg Step1
 * @text Actor ID Range
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to end at.
 * @default 4
 *
 * @arg Step2:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageJS
 * @text Actor: Change Menu Image (JS) (Legacy)
 * @desc Changes the actor's Menu Image.
 * Select from a group of actor ID's using JavaScript.
 *
 * @arg Step1:arrayeval
 * @text Actor ID(s)
 * @type string[]
 * @desc Enter which Actor ID(s) to affect.
 * You may use JavaScript code.
 * @default ["$gameVariables.value(1)"]
 *
 * @arg Step2:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageJS_v124
 * @text Actor: Change Menu Image (JS) (v1.24)
 * @desc Changes an actor's Menu Image using JavaScript.
 * Allows more control with more text entry.
 *
 * @arg ActorJS:func
 * @text JS: Actor ID
 * @type note
 * @desc Enter which Actor ID to affect.
 * Uses JavaScript code.
 * @default "// Get Actor ID here.\nlet actorID = 0;\nactorID = $gameParty.members()[0].actorId();\n\n// Return Actor ID\nreturn actorID;"
 *
 * @arg FilenameJS:func
 * @text JS: Filename
 * @type note
 * @desc Enter the filename you wish to use.
 * Uses JavaScript code.
 * @default "// Get Filename here.\nlet filename = 'Actor1_';\nfilename += String(Math.randomInt(8) + 1);\n\n// Return Filename\nreturn filename;"
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_MenuCommand
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MenuCommandClear
 * @text Menu Command: Clear Forced Settings
 * @desc Clear any forced settings for the menu command symbols.
 *
 * @arg Symbols:arraystr
 * @text Symbol(s)
 * @type string[]
 * @desc Insert the symbols of the menu commands here.
 * The symbols are case sensitive.
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MenuCommandForceDisable
 * @text Menu Command: Force Disable
 * @desc Forcefully disable specific menu commands via their symbols.
 * Matching forced enabled symbols will be overwritten.
 *
 * @arg Symbols:arraystr
 * @text Symbol(s)
 * @type string[]
 * @desc Insert the symbols of the menu commands here.
 * The symbols are case sensitive.
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MenuCommandForceEnable
 * @text Menu Command: Force Enable
 * @desc Forcefully enable specific menu commands via their symbols.
 * Matching forced disabled symbols will be overwritten.
 *
 * @arg Symbols:arraystr
 * @text Symbol(s)
 * @type string[]
 * @desc Insert the symbols of the menu commands here.
 * The symbols are case sensitive.
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MenuCommandForceHide
 * @text Menu Command: Force Hide
 * @desc Forcefully hide specific menu commands via their symbols.
 * Matching forced shown symbols will be overwritten.
 *
 * @arg Symbols:arraystr
 * @text Symbol(s)
 * @type string[]
 * @desc Insert the symbols of the menu commands here.
 * The symbols are case sensitive.
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MenuCommandForceShow
 * @text Menu Command: Force Show
 * @desc Forcefully show specific menu commands via their symbols.
 * Matching forced hidden symbols will be overwritten.
 *
 * @arg Symbols:arraystr
 * @text Symbol(s)
 * @type string[]
 * @desc Insert the symbols of the menu commands here.
 * The symbols are case sensitive.
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
 * @param MainMenuCore
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
 * @desc General settings pertaining to the Main Menu and related.
 * @default {"GoldWindow":"","ThinGoldWindow:eval":"true","AutoGoldHeight:eval":"true","AutoGoldY:eval":"true","StatusWindow":"","StatusSelectLast:eval":"false","SoloParty":"","SoloQuick:eval":"true","SubMenus":"","ActorBgMenus:arraystr":"[\"Scene_Skill\"]","ActorBgMenuJS:func":"\"this.anchor.x = 0.5;\\nconst scale = 1.25;\\nthis.scale.x = this.scale.y = scale;\\nthis.x = Graphics.width;\\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._targetX = Graphics.width * 3 / 4;\\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._duration = 10;\\nthis.opacity = 0;\"","PartyWindow":"","ShowReserve:eval":"true","HideMainMenuOnly:eval":"true"}
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @parent General:struct
 * @type struct<Command>[]
 * @desc Window commands used by the Main Menu.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"item\",\"Icon:num\":\"208\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.item;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"item\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItem();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"classChange\",\"Icon:num\":\"133\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.classChangeMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ClassChangeSystem &&\\\\n    this.isClassChangeCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled() &&\\\\n    this.isClassChangeCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_ClassChange);\\\"\"}","{\"Symbol:str\":\"skill\",\"Icon:num\":\"101\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.skill;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"skill\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Skill);\\\"\"}","{\"Symbol:str\":\"equip\",\"Icon:num\":\"137\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.equip;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"equip\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Equip);\\\"\"}","{\"Symbol:str\":\"status\",\"Icon:num\":\"82\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.status;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"status\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Status);\\\"\"}","{\"Symbol:str\":\"itemCrafting\",\"Icon:num\":\"223\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.ItemCraftingMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ItemCraftingSys &&\\\\n    this.isItemCraftingCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isItemCraftingCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItemCrafting();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"subcategory\",\"Subcategory:str\":\"\",\"Icon:num\":\"230\",\"TextStr:str\":\"Datalog\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return this.isSubcategoryVisible(arguments[1]);\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"// This becomes the subcategory name. Case-sensitive.\\\\n\\\\nreturn 'datalog';\\\"\",\"CallHandlerJS:func\":\"\\\"const ext = arguments[0];\\\\nthis.setSubcategory(ext);\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"quest\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"186\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.questCommandName;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_QuestSystem &&\\\\n    this.isQuestCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isQuestCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandQuest();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"bestiary\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"10\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.BestiaryMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_Bestiary &&\\\\n    this.isBestiaryCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isBestiaryCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandBestiary();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"tutorialList\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"187\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.tutorial.menuCmd;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_TutorialPanelSys &&\\\\n    this.isTutorialListCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isTutorialListCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandTutorialList();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"messageLog\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"193\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.MessageLogMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_3_MessageLog &&\\\\n    this.isMessageLogCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isMessageLogCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandMessageLog();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"combatLog\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.combatLog_BattleCmd_Name;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_4_CombatLog &&\\\\n    this.isCombatLogCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isCombatLogCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCombatLog();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"cgGallery\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"311\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.cgGalleryMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_4_CGGallery &&\\\\n    this.isCgGalleryCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isCgGalleryCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCgGallery();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"creditsPage\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"193\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.CreditsPageMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_4_CreditsPage &&\\\\n    this.isCreditsPageCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isCreditsPageCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCreditsPage();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"patchNotes\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"83\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.PatchNotesMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_4_PatchNotes &&\\\\n    this.isPatchNotesCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isPatchNotesCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPatchNotes();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"formation\",\"Icon:num\":\"75\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.formation;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"formation\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isFormationEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandFormation();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"battleGridTactics\",\"Subcategory:str\":\"\",\"Icon:num\":\"76\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.BattleGridTacticsMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_BattleGridSystem &&\\\\n    this.isBattleGridTacticsCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isBattleGridTacticsCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandBattleGridTactics();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"options\",\"Icon:num\":\"83\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"options\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isOptionsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"save\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.save;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"save\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isSaveEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandSave();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"load\",\"Icon:num\":\"191\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return 'Load';\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"save\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandLoad();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent1\",\"Icon:num\":\"88\",\"TextStr:str\":\"Common Event 1\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return 1;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCommonEvent();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent2\",\"Icon:num\":\"87\",\"TextStr:str\":\"Common Event 2\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return 2;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"// Declare Ext\\\\nconst ext = arguments[0];\\\\n\\\\n// Declare Status Window\\\\nconst statusWindow = SceneManager._scene._statusWindow;\\\\n\\\\n// Declare Actor ID\\\\nconst actorId = statusWindow.actor(statusWindow.index()).actorId();\\\\n\\\\n// Set variable 1 to Actor ID\\\\n$gameVariables.setValue(1, actorId);\\\\n\\\\n// Prepare Common Event ext to run\\\\n$gameTemp.reserveCommonEvent(ext);\\\\n\\\\n// Exit Main Menu\\\\nSceneManager._scene.popScene();\\\"\"}","{\"Symbol:str\":\"gameEnd\",\"Icon:num\":\"187\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"gameEnd\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isGameEndEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandGameEnd();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}"]
 *
 * @param Playtime:struct
 * @text Playtime Window
 * @type struct<Playtime>
 * @desc Settings for the Playtime Window.
 * @default {"Enable:eval":"true","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","Icon:num":"75","Time:str":"Time","WindowRect:func":"\"const rows = 1;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param Variable:struct
 * @text Variable Window
 * @type struct<Variable>
 * @desc Settings for the Variable Window.
 * @default {"Enable:eval":"false","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","VarList:arraynum":"[\"1\",\"2\"]","WindowRect:func":"\"const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param ParamBreak1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CommandWindowStyle:str
 * @text Command Window Style
 * @type select
 * @option Default Vertical Side Style
 * @value default
 * @option Top Horizontal Style
 * @value top
 * @option Thin Top Horizontal Style
 * @value thinTop
 * @option Bottom Horizontal Style
 * @value bottom
 * @option Thin Bottom Horizontal Style
 * @value thinBottom
 * @option Mobile Full Screen Style
 * @value mobile
 * @desc Choose the positioning and style of the Main Menu Command Window. This will automatically rearrange windows.
 * @default top
 *
 * @param CustomCmdWin:struct
 * @text Command Style Settings
 * @parent CommandWindowStyle:str
 * @type struct<CustomCmdWin>
 * @desc Settings for the non-default Command Window Styles.
 * @default {"Style:str":"auto","TextAlign:str":"center","Rows:num":"2","Cols:num":"4","MobileThickness:num":"5"}
 *
 * @param ParamBreak2
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param StatusGraphic:str
 * @text Status Graphic
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler
 * @value svbattler
 * @desc Choose how the actor graphics appear in status-like menus.
 * @default face
 *
 * @param StatusListStyle:str
 * @text Main Menu List Style
 * @type select
 * @option Default Horizontal Style
 * @value default
 * @option Vertical Style
 * @value vertical
 * @option Portrait Style
 * @value portrait
 * @option Solo Style
 * @value solo
 * @option Thin Horizontal Style
 * @value thin
 * @option Thicker Horizontal Style
 * @value thicker
 * @desc Choose how the actor status list looks in the Main Menu.
 * @default portrait
 *
 * @param InnerMenuListStyle:str
 * @text Inner-Menu List Style
 * @parent StatusListStyle:str
 * @type select
 * @option Default Horizontal Style
 * @value default
 * @option Vertical Style
 * @value vertical
 * @option Portrait Style
 * @value portrait
 * @option Solo Style
 * @value solo
 * @option Thin Horizontal Style
 * @value thin
 * @option Thicker Horizontal Style
 * @value thicker
 * @desc Choose how the actor status list looks in the inner menus
 * like Scene_Item, Scene_Skill, etc.
 * @default default
 *
 * @param ListStyles:struct
 * @text List Style Settings
 * @parent StatusListStyle:str
 * @type struct<ListStyles>
 * @desc JavaScript code used to determine how the individual styles are drawn.
 * @default {"DefaultStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst sx = rect.x + 180;\\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\\nconst lineHeight = this.lineHeight();\\nconst sx2 = sx + 180;\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\\nthis.drawActorClass(actor, sx2, sy);\\n\\n// Place Gauges\\nconst sy2 = sy + lineHeight;\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nthis.placeGauge(actor, \\\"hp\\\", sx2, sy2);\\nthis.placeGauge(actor, \\\"mp\\\", sx2, sy2 + gaugeLineHeight);\\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\\nif ($dataSystem.optDisplayTp && roomForTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx2, sy2 + gaugeLineHeight * 2);\\n}\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx2 + 180;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\"","VerticalStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nconst gx = rect.x;\\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Actor Name\\nlet sx = rect.x;\\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\\nlet sw = rect.width;\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","PortraitStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = rect.height;\\nconst gx = rect.x;\\nconst gy = rect.y;\\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\\n\\n// Draw Dark Rectangle\\nlet sx = rect.x;\\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\\nlet sw = rect.width;\\nlet sh = rect.y + rect.height - sy;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","SoloStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\n\\n// Draw Actor Graphic\\nlet sx = rect.x;\\nlet sy = rect.y;\\nlet sw = rect.width;\\nlet sh = rect.height;\\n\\n// Portrait\\nif (actor.getMenuImage() !== '') {\\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\\n\\n// Everything Else\\n} else {\\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\\n}\\n\\n// Draw Dark Rectangle\\nsh = Math.ceil(lineHeight * 4.5);\\nsy = rect.y + rect.height - sh;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nsw = Math.round(rect.width / 2);\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round(((rect.width / 2) - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Prepare Stat Coordinates\\nsx = rect.x + Math.floor(rect.width / 2);\\nsw = rect.width / 2;\\nsh = rect.height;\\nconst sx3 = sx;\\nconst cw = rect.width - sx3 - 2;\\n\\n// Prepare Total Content Height to vertically center the content.\\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    totalHeight += lineHeight;\\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\nconst equips = actor.equips();\\ntotalHeight += lineHeight;\\ntotalHeight += equips.length * lineHeight;\\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\\n\\n// Place Gauges\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nif ($dataSystem.optDisplayTp) {\\n    sy += gaugeLineHeight;\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n    sy += gaugeLineHeight;\\n}\\nlet ny = sy;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    sy += lineHeight;\\n    const pw = Math.floor(cw / 2) - 24;\\n    let px = sx3;\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, sy, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            sy += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n    ny += lineHeight;\\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\n\\n// Draw Actor Equipment\\nthis.resetFontSettings();\\nsx = rect.x + Math.floor(rect.width / 2);\\nsy = ny + lineHeight;\\nsw = rect.width / 2;\\nfor (const equip of equips) {\\n    if (equip) {\\n        this.drawItemName(equip, sx, sy, sw);\\n        sy += lineHeight;\\n        if (sy + lineHeight > rect.y + rect.height) return;\\n    }\\n}\"","ThinStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\n\\n// Place Gauges\\nsx += 180;\\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy);\"","ThickerStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorClass(actor, sx, sy + lineHeight);\\n//this.drawActorLevel(actor, sx, sy + lineHeight);\\n\\n// Place Gauges\\nsx += 180;\\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy + gaugeLineHeight);\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy + (gaugeLineHeight * 2));\\nsx += 160;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\""}
 *
 * @param ParamBreak3
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param MouseCursor:struct
 * @text Custom Mouse Cursor
 * @type struct<MouseCursor>
 * @desc Add/enable a custom mouse cursor for your game.
 * @default {"General":"","Enable:eval":"true","Graphics":"","idleFilenameIcon:str":"","clickFilenameIcon:str":"","Anchor":"","anchorX:num":"0.0","anchorY:num":"0.0"}
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
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param Subcategory:str
 * @text Subcategory
 * @desc The subcategory used for this command.
 * Leave empty for no subcategory.
 * @default 
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this command.
 * Use 0 for no icon.
 * @default 0
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this menu command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default "const ext = arguments[0];"
 *
 * @param PersonalHandlerJS:func
 * @text JS: Personal Code
 * @type note
 * @desc JavaScript code that runs once the actor list is selected with this command highlighted.
 * @default "const ext = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param ThinGoldWindow:eval
 * @text Thinner Gold Window
 * @parent GoldWindow
 * @type boolean
 * @on Thinner
 * @off Normal
 * @desc Make the Gold Window thinner in the Main Menu?
 * Used to match the Playtime and Variable Windows.
 * @default true
 *
 * @param AutoGoldHeight:eval
 * @text Auto Adjust Height
 * @parent GoldWindow
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically adjust the height for the thinner Gold Window?
 * @default true
 *
 * @param AutoGoldY:eval
 * @text Auto Adjust Y
 * @parent GoldWindow
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically adjust the Y position for the thinner Gold Window?
 * @default true
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusSelectLast:eval
 * @text Select Last?
 * @parent StatusWindow
 * @type boolean
 * @on Last Picked Actor
 * @off Always First Actor
 * @desc When picking a personal command from the Command Window,
 * select the last picked actor or always the first?
 * @default false
 *
 * @param SoloParty
 * @text Solo Party
 *
 * @param SoloQuick:eval
 * @text Solo Quick Mode
 * @parent SoloParty
 * @type boolean
 * @on Quick
 * @off Normal
 * @desc When selecting "Skills", "Equip", or "Status" with one party member, immediately go to the scene.
 * @default true
 *
 * @param SubMenus
 * @text Sub Menus
 *
 * @param ActorBgMenus:arraystr
 * @text Menus with Actor BG's
 * @parent SubMenus
 * @type string[]
 * @desc A list of the menus that would be compatible with Actor Menu Backgrounds.
 * @default ["Scene_Skill","Scene_Equip","Scene_Status"]
 *
 * @param ActorBgMenuJS:func
 * @text JS: Actor BG Action
 * @parent SubMenus
 * @type note
 * @desc Code used to determine how to display the sprites upon loading.
 * @default "this.anchor.x = 0.5;\nconst scale = 1.25;\nthis.scale.x = this.scale.y = scale;\nthis.x = Graphics.width;\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._targetX = Graphics.width * 3 / 4;\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._duration = 10;\nthis.opacity = 0;"
 *
 * @param PartyWindow
 * @text Party Window
 *
 * @param ShowReserve:eval
 * @text Show Reserve Memebers
 * @parent PartyWindow
 * @type boolean
 * @on Show Reserve Members
 * @off Hide Reserve Members
 * @desc Show reserve members while on the Main Menu scene?
 * @default true
 *
 * @param HideMainMenuOnly:eval
 * @text Hide Main Menu Only
 * @parent ShowReserve:eval
 * @type boolean
 * @on Hide in Main Menu Only
 * @off Hide in all Scenes
 * @desc If reserve members are hidden, hide them only in the main menu or all scenes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Playtime Window
 * ----------------------------------------------------------------------------
 */
/*~struct~Playtime:
 *
 * @param Enable:eval
 * @text Use Window
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Use the Playtime Window?
 * @default true
 *
 * @param AdjustCommandHeight:eval
 * @text Adjust Command Window
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Adjust the command window's height to fit in the Playtime Window?
 * @default true
 *
 * @param BgType:num
 * @text Background Type
 * @type select
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Select background type for the Playtime window.
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside the Playtime window.
 * Default: 26
 * @default 20
 *
 * @param Icon:num
 * @text Time Icon
 * @desc Icon displayed for the 'Time' label.
 * @default 75
 *
 * @param Time:str
 * @text Time Text
 * @desc Text for the display of 'Time' in the Playtime window.
 * @default Time
 *
 * @param WindowRect:func
 * @text JS: X, Y, W, H
 * @type note
 * @desc Code used to determine the dimensions for the Playtime window.
 * @default "const rows = 1;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Variable Window
 * ----------------------------------------------------------------------------
 */
/*~struct~Variable:
 *
 * @param Enable:eval
 * @text Use Window
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Use the Variable Window?
 * @default false
 *
 * @param AdjustCommandHeight:eval
 * @text Adjust Command Window
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Adjust the command window's height to fit in the Variable Window?
 * @default true
 *
 * @param BgType:num
 * @text Background Type
 * @type select
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Select background type for the Variable window.
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside the Variable window.
 * Default: 26
 * @default 20
 *
 * @param VarList:arraynum
 * @text Variable List
 * @type variable[]
 * @desc Select variables to be displayed into the window.
 * Use \i[x] to determine their icon.
 * @default ["1","2","3"]
 *
 * @param WindowRect:func
 * @text JS: X, Y, W, H
 * @type note
 * @desc Code used to determine the dimensions for the Variable window.
 * @default "const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Horizontal Command Window Style
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomCmdWin:
 *
 * @param Style:str
 * @text Command Style
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
 * @desc How do you wish to draw command entries in the Command Window?
 * @default auto
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Rows:num
 * @text Rows
 * @type number
 * @min 1
 * @desc Number of visible rows.
 * @default 2
 *
 * @param Cols:num
 * @text Columns
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 4
 *
 * @param MobileThickness:num
 * @text Mobile Thickness
 * @type number
 * @min 1
 * @desc The thickness of the buttons for mobile version.
 * @default 5
 *
 */
/* ----------------------------------------------------------------------------
 * List Style Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ListStyles:
 *
 * @param DefaultStyle:func
 * @text JS: Default
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + Math.floor((rect.height - gh) / 2);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst sx = rect.x + 180;\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\nconst lineHeight = this.lineHeight();\nconst sx2 = sx + 180;\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\nthis.drawActorClass(actor, sx2, sy);\n\n// Place Gauges\nconst sy2 = sy + lineHeight;\nconst gaugeLineHeight = this.gaugeLineHeight();\nthis.placeGauge(actor, \"hp\", sx2, sy2);\nthis.placeGauge(actor, \"mp\", sx2, sy2 + gaugeLineHeight);\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\nif ($dataSystem.optDisplayTp && roomForTp) {\n    this.placeGauge(actor, \"tp\", sx2, sy2 + gaugeLineHeight * 2);\n}\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx2 + 180;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 * @param VerticalStyle:func
 * @text JS: Vertical
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nconst gx = rect.x;\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Actor Name\nlet sx = rect.x;\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\nlet sw = rect.width;\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param PortraitStyle:func
 * @text JS: Portrait
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = rect.height;\nconst gx = rect.x;\nconst gy = rect.y;\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\n\n// Draw Dark Rectangle\nlet sx = rect.x;\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\nlet sw = rect.width;\nlet sh = rect.y + rect.height - sy;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param SoloStyle:func
 * @text JS: Solo
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\n\n// Draw Actor Graphic\nlet sx = rect.x;\nlet sy = rect.y;\nlet sw = rect.width;\nlet sh = rect.height;\n\n// Portrait\nif (actor.getMenuImage() !== '') {\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\n\n// Everything Else\n} else {\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\n}\n\n// Draw Dark Rectangle\nsh = Math.ceil(lineHeight * 4.5);\nsy = rect.y + rect.height - sh;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nsw = Math.round(rect.width / 2);\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round(((rect.width / 2) - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Prepare Stat Coordinates\nsx = rect.x + Math.floor(rect.width / 2);\nsw = rect.width / 2;\nsh = rect.height;\nconst sx3 = sx;\nconst cw = rect.width - sx3 - 2;\n\n// Prepare Total Content Height to vertically center the content.\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    totalHeight += lineHeight;\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\nconst equips = actor.equips();\ntotalHeight += lineHeight;\ntotalHeight += equips.length * lineHeight;\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\n\n// Place Gauges\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nif ($dataSystem.optDisplayTp) {\n    sy += gaugeLineHeight;\n    this.placeGauge(actor, \"tp\", sx, sy);\n    sy += gaugeLineHeight;\n}\nlet ny = sy;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    sy += lineHeight;\n    const pw = Math.floor(cw / 2) - 24;\n    let px = sx3;\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, sy, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            sy += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n    ny += lineHeight;\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\n\n// Draw Actor Equipment\nthis.resetFontSettings();\nsx = rect.x + Math.floor(rect.width / 2);\nsy = ny + lineHeight;\nsw = rect.width / 2;\nfor (const equip of equips) {\n    if (equip) {\n        this.drawItemName(equip, sx, sy, sw);\n        sy += lineHeight;\n        if (sy + lineHeight > rect.y + rect.height) return;\n    }\n}"
 *
 * @param ThinStyle:func
 * @text JS: Thin
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\n\n// Place Gauges\nsx += 180;\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy);"
 *
 * @param ThickerStyle:func
 * @text JS: Thicker
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\nthis.drawActorName(actor, sx, sy);\nthis.drawActorClass(actor, sx, sy + lineHeight);\n//this.drawActorLevel(actor, sx, sy + lineHeight);\n\n// Place Gauges\nsx += 180;\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nthis.placeGauge(actor, \"mp\", sx, sy + gaugeLineHeight);\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy + (gaugeLineHeight * 2));\nsx += 160;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 */
/* ----------------------------------------------------------------------------
 * Mouse Cursor Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MouseCursor:
 *
 * @param General
 * @text General Settings
 *
 * @param Enable:eval
 * @text Enable?
 * @parent General
 * @type boolean
 * @on Custom Cursor
 * @off Normal Cursor
 * @desc Enable custom cursor?
 * Requires a custom 'Idle' graphic.
 * @default true
 *
 * @param Graphics
 * @text Graphic Settings
 *
 * @param idleFilenameIcon:str
 * @text Idle Filename
 * @parent Graphics
 * @desc Located in game project's /icon/ folder.
 * Include .png extension (ie. Cursor1.png)
 * @default 
 *
 * @param clickFilenameIcon:str
 * @text Click Filename
 * @parent Graphics
 * @desc Optional. Located in game project's /icon/ folder.
 * Include .png extension (ie. Cursor2.png)
 * @default 
 *
 * @param Anchor
 * @text Anchor Settings
 *
 * @param anchorX:num
 * @text Anchor X
 * @parent Anchor
 * @desc Anchor X value for the custom cursor.
 * 0.0 - left; 0.5 - center; 1.0 - right
 * @default 0.0
 *
 * @param anchorY:num
 * @text Anchor Y
 * @parent Anchor
 * @desc Anchor Y value for the custom cursor.
 * 0.0 - top; 0.5 - middle; 1.0 - bottom
 * @default 0.0
 *
 */
//=============================================================================

const _0xc3ecf6=_0x3498;(function(_0x2166f7,_0x1781e8){const _0x1df4a0=_0x3498,_0x2dbb25=_0x2166f7();while(!![]){try{const _0x3b4e1b=parseInt(_0x1df4a0(0x12a))/0x1+parseInt(_0x1df4a0(0x1b1))/0x2+parseInt(_0x1df4a0(0x130))/0x3*(-parseInt(_0x1df4a0(0x1c2))/0x4)+-parseInt(_0x1df4a0(0x10a))/0x5*(parseInt(_0x1df4a0(0x21b))/0x6)+-parseInt(_0x1df4a0(0x16a))/0x7+-parseInt(_0x1df4a0(0xf1))/0x8+parseInt(_0x1df4a0(0x13e))/0x9;if(_0x3b4e1b===_0x1781e8)break;else _0x2dbb25['push'](_0x2dbb25['shift']());}catch(_0x366398){_0x2dbb25['push'](_0x2dbb25['shift']());}}}(_0x1695,0xa8e64));var label=_0xc3ecf6(0xcd),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0xc3ecf6(0x226)](function(_0x163a83){const _0x8aad34=_0xc3ecf6;return _0x163a83['status']&&_0x163a83[_0x8aad34(0x214)][_0x8aad34(0x156)]('['+label+']');})[0x0];VisuMZ[label][_0xc3ecf6(0xb7)]=VisuMZ[label]['Settings']||{},VisuMZ[_0xc3ecf6(0x221)]=function(_0x4d5ddb,_0x4db5be){const _0x58c054=_0xc3ecf6;for(const _0x19cd4c in _0x4db5be){if(_0x19cd4c[_0x58c054(0x14e)](/(.*):(.*)/i)){const _0x3a4662=String(RegExp['$1']),_0x1907de=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x2fe312,_0x1f48c4,_0x56f879;switch(_0x1907de){case _0x58c054(0xc5):_0x2fe312=_0x4db5be[_0x19cd4c]!==''?Number(_0x4db5be[_0x19cd4c]):0x0;break;case _0x58c054(0x223):_0x1f48c4=_0x4db5be[_0x19cd4c]!==''?JSON[_0x58c054(0x200)](_0x4db5be[_0x19cd4c]):[],_0x2fe312=_0x1f48c4[_0x58c054(0x22a)](_0x63788=>Number(_0x63788));break;case'EVAL':_0x2fe312=_0x4db5be[_0x19cd4c]!==''?eval(_0x4db5be[_0x19cd4c]):null;break;case _0x58c054(0x152):_0x1f48c4=_0x4db5be[_0x19cd4c]!==''?JSON[_0x58c054(0x200)](_0x4db5be[_0x19cd4c]):[],_0x2fe312=_0x1f48c4[_0x58c054(0x22a)](_0x77ded5=>eval(_0x77ded5));break;case'JSON':_0x2fe312=_0x4db5be[_0x19cd4c]!==''?JSON[_0x58c054(0x200)](_0x4db5be[_0x19cd4c]):'';break;case _0x58c054(0x1a5):_0x1f48c4=_0x4db5be[_0x19cd4c]!==''?JSON[_0x58c054(0x200)](_0x4db5be[_0x19cd4c]):[],_0x2fe312=_0x1f48c4['map'](_0x2d31e3=>JSON['parse'](_0x2d31e3));break;case'FUNC':_0x2fe312=_0x4db5be[_0x19cd4c]!==''?new Function(JSON['parse'](_0x4db5be[_0x19cd4c])):new Function(_0x58c054(0x14f));break;case'ARRAYFUNC':_0x1f48c4=_0x4db5be[_0x19cd4c]!==''?JSON['parse'](_0x4db5be[_0x19cd4c]):[],_0x2fe312=_0x1f48c4[_0x58c054(0x22a)](_0x1f9b2d=>new Function(JSON[_0x58c054(0x200)](_0x1f9b2d)));break;case _0x58c054(0x17f):_0x2fe312=_0x4db5be[_0x19cd4c]!==''?String(_0x4db5be[_0x19cd4c]):'';break;case'ARRAYSTR':_0x1f48c4=_0x4db5be[_0x19cd4c]!==''?JSON[_0x58c054(0x200)](_0x4db5be[_0x19cd4c]):[],_0x2fe312=_0x1f48c4[_0x58c054(0x22a)](_0x9a6de6=>String(_0x9a6de6));break;case _0x58c054(0x164):_0x56f879=_0x4db5be[_0x19cd4c]!==''?JSON['parse'](_0x4db5be[_0x19cd4c]):{},_0x4d5ddb[_0x3a4662]={},VisuMZ[_0x58c054(0x221)](_0x4d5ddb[_0x3a4662],_0x56f879);continue;case _0x58c054(0x1f6):_0x1f48c4=_0x4db5be[_0x19cd4c]!==''?JSON['parse'](_0x4db5be[_0x19cd4c]):[],_0x2fe312=_0x1f48c4[_0x58c054(0x22a)](_0x41d979=>VisuMZ['ConvertParams']({},JSON['parse'](_0x41d979)));break;default:continue;}_0x4d5ddb[_0x3a4662]=_0x2fe312;}}return _0x4d5ddb;},(_0x31f670=>{const _0x2f3676=_0xc3ecf6,_0x9ba857=_0x31f670['name'];for(const _0x44a1ef of dependencies){if(!Imported[_0x44a1ef]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x2f3676(0xd3)](_0x9ba857,_0x44a1ef)),SceneManager['exit']();break;}}const _0x2e9db0=_0x31f670['description'];if(_0x2e9db0[_0x2f3676(0x14e)](/\[Version[ ](.*?)\]/i)){const _0x514d91=Number(RegExp['$1']);_0x514d91!==VisuMZ[label][_0x2f3676(0x243)]&&(alert(_0x2f3676(0x241)[_0x2f3676(0xd3)](_0x9ba857,_0x514d91)),SceneManager[_0x2f3676(0xe2)]());}if(_0x2e9db0[_0x2f3676(0x14e)](/\[Tier[ ](\d+)\]/i)){const _0x2e8cc9=Number(RegExp['$1']);_0x2e8cc9<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x2f3676(0xd3)](_0x9ba857,_0x2e8cc9,tier)),SceneManager[_0x2f3676(0xe2)]()):tier=Math[_0x2f3676(0x1ea)](_0x2e8cc9,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x2f3676(0xb7)],_0x31f670['parameters']);})(pluginData),PluginManager[_0xc3ecf6(0x1e6)](pluginData[_0xc3ecf6(0x199)],_0xc3ecf6(0x17d),_0x43887a=>{const _0x33d189=_0xc3ecf6;VisuMZ[_0x33d189(0x221)](_0x43887a,_0x43887a);const _0x5e3605=_0x43887a[_0x33d189(0x19f)],_0x1afd43=_0x43887a[_0x33d189(0x16e)];for(let _0xf7fca1 of _0x5e3605){_0xf7fca1=parseInt(_0xf7fca1)||0x0;if(_0xf7fca1<=0x0)continue;const _0x3859de=$gameActors[_0x33d189(0x106)](_0xf7fca1);if(!_0x3859de)continue;_0x3859de[_0x33d189(0x195)](_0x1afd43);}}),PluginManager['registerCommand'](pluginData['name'],'ChangeActorMenuImageRange',_0x4dbddd=>{const _0x40a73d=_0xc3ecf6;VisuMZ['ConvertParams'](_0x4dbddd,_0x4dbddd);const _0x2d0efb=_0x4dbddd[_0x40a73d(0x133)]>=_0x4dbddd[_0x40a73d(0xe4)]?_0x4dbddd[_0x40a73d(0xe4)]:_0x4dbddd[_0x40a73d(0x133)],_0xac56bf=_0x4dbddd[_0x40a73d(0x133)]>=_0x4dbddd[_0x40a73d(0xe4)]?_0x4dbddd['Step1End']:_0x4dbddd[_0x40a73d(0xe4)],_0x93f96a=Array(_0xac56bf-_0x2d0efb+0x1)[_0x40a73d(0x235)]()['map']((_0x38e718,_0x42ca18)=>_0x2d0efb+_0x42ca18),_0x442bcd=_0x4dbddd['Step2'];for(let _0xad17be of _0x93f96a){_0xad17be=parseInt(_0xad17be)||0x0;if(_0xad17be<=0x0)continue;const _0x1782a1=$gameActors[_0x40a73d(0x106)](_0xad17be);if(!_0x1782a1)continue;_0x1782a1['setMenuImage'](_0x442bcd);}}),PluginManager[_0xc3ecf6(0x1e6)](pluginData[_0xc3ecf6(0x199)],'ChangeActorMenuImageJS',_0x5d4ccb=>{const _0x154e90=_0xc3ecf6;VisuMZ[_0x154e90(0x221)](_0x5d4ccb,_0x5d4ccb);const _0x47d7ea=_0x5d4ccb['Step1'];let _0x249e96=[];while(_0x47d7ea[_0x154e90(0x1fb)]>0x0){const _0x27ef51=_0x47d7ea['shift']();Array[_0x154e90(0x17b)](_0x27ef51)?_0x249e96=_0x249e96[_0x154e90(0xed)](_0x27ef51):_0x249e96[_0x154e90(0x194)](_0x27ef51);}const _0x28a1fb=_0x5d4ccb[_0x154e90(0x16e)];for(let _0x2e164f of _0x249e96){_0x2e164f=parseInt(_0x2e164f)||0x0;if(_0x2e164f<=0x0)continue;const _0x23074b=$gameActors[_0x154e90(0x106)](_0x2e164f);if(!_0x23074b)continue;_0x23074b[_0x154e90(0x195)](_0x28a1fb);}}),PluginManager[_0xc3ecf6(0x1e6)](pluginData[_0xc3ecf6(0x199)],'ChangeActorMenuImageJS_v124',_0x582dc4=>{const _0x3d5a83=_0xc3ecf6;VisuMZ['ConvertParams'](_0x582dc4,_0x582dc4);const _0x19de38=_0x582dc4['ActorJS'](),_0x2bc1b9=$gameActors[_0x3d5a83(0x106)](_0x19de38)||null;if(!_0x2bc1b9){console[_0x3d5a83(0x22b)](_0x3d5a83(0x20a));return;}const _0x268b90=_0x582dc4[_0x3d5a83(0x1aa)]();_0x2bc1b9[_0x3d5a83(0x195)](_0x268b90);}),PluginManager[_0xc3ecf6(0x1e6)](pluginData['name'],_0xc3ecf6(0x18e),_0x1a17e7=>{const _0x7cbf38=_0xc3ecf6;VisuMZ[_0x7cbf38(0x221)](_0x1a17e7,_0x1a17e7);const _0x5702cf=_0x1a17e7['Symbols']||[];for(const _0x5b6d9a of _0x5702cf){$gameSystem[_0x7cbf38(0x19b)](_0x5b6d9a);}}),PluginManager[_0xc3ecf6(0x1e6)](pluginData[_0xc3ecf6(0x199)],_0xc3ecf6(0x161),_0x555ca9=>{const _0xca48e1=_0xc3ecf6;VisuMZ['ConvertParams'](_0x555ca9,_0x555ca9);const _0x5211a7=_0x555ca9[_0xca48e1(0x1f3)]||[];for(const _0x5f01b8 of _0x5211a7){$gameSystem['forceEnableMainMenuCommand'](_0x5f01b8);}}),PluginManager[_0xc3ecf6(0x1e6)](pluginData[_0xc3ecf6(0x199)],_0xc3ecf6(0xee),_0x2e28a3=>{const _0x3c1729=_0xc3ecf6;VisuMZ[_0x3c1729(0x221)](_0x2e28a3,_0x2e28a3);const _0x2a2fd0=_0x2e28a3[_0x3c1729(0x1f3)]||[];for(const _0x337b8b of _0x2a2fd0){$gameSystem[_0x3c1729(0x1ba)](_0x337b8b);}}),PluginManager[_0xc3ecf6(0x1e6)](pluginData[_0xc3ecf6(0x199)],'MenuCommandForceHide',_0x53f87e=>{const _0x1aa02e=_0xc3ecf6;VisuMZ[_0x1aa02e(0x221)](_0x53f87e,_0x53f87e);const _0x3bba0d=_0x53f87e[_0x1aa02e(0x1f3)]||[];for(const _0xcde9fc of _0x3bba0d){$gameSystem[_0x1aa02e(0x232)](_0xcde9fc);}}),PluginManager['registerCommand'](pluginData[_0xc3ecf6(0x199)],'MenuCommandForceShow',_0x5c3351=>{const _0x3aa3dd=_0xc3ecf6;VisuMZ['ConvertParams'](_0x5c3351,_0x5c3351);const _0x52fd82=_0x5c3351[_0x3aa3dd(0x1f3)]||[];for(const _0x3b20ea of _0x52fd82){$gameSystem[_0x3aa3dd(0x15c)](_0x3b20ea);}}),VisuMZ[_0xc3ecf6(0xcd)][_0xc3ecf6(0x218)]=Scene_Boot[_0xc3ecf6(0x1db)][_0xc3ecf6(0x13f)],Scene_Boot[_0xc3ecf6(0x1db)][_0xc3ecf6(0x13f)]=function(){const _0xa2a8b2=_0xc3ecf6;VisuMZ[_0xa2a8b2(0xcd)][_0xa2a8b2(0x218)][_0xa2a8b2(0xfb)](this),VisuMZ[_0xa2a8b2(0xcd)]['IsCustomCursorEnabled']()&&VisuMZ[_0xa2a8b2(0xcd)][_0xa2a8b2(0x1e9)]();},VisuMZ['MainMenuCore'][_0xc3ecf6(0x1a2)]=function(){const _0x19ec81=_0xc3ecf6;if(Utils[_0x19ec81(0x23b)]())return![];const _0x25237b=VisuMZ[_0x19ec81(0xcd)][_0x19ec81(0xb7)][_0x19ec81(0x188)];if(!_0x25237b['Enable'])return![];if(_0x25237b['idleFilename']&&_0x25237b['idleFilename']['length']>0x0)return!![];return _0x25237b[_0x19ec81(0xfe)]&&_0x25237b['idleFilenameIcon'][_0x19ec81(0x1fb)]>0x0;},VisuMZ[_0xc3ecf6(0xcd)]['SetupCustomCursor']=function(){const _0x5ed282=_0xc3ecf6,_0x346cba=VisuMZ[_0x5ed282(0xcd)][_0x5ed282(0xb7)][_0x5ed282(0x188)];if(_0x346cba[_0x5ed282(0x1f9)]!==undefined||_0x346cba['clickFilename']!==undefined){let _0x4a7218=_0x5ed282(0x160);_0x4a7218+=_0x5ed282(0x1a6),_0x4a7218+='\x0ato\x20a\x20different\x20directory:\x20the\x20game\x20project\x27s\x20/icon/\x20folder.',_0x4a7218+='\x0a\x0aPlease\x20move\x20the\x20cursor\x20file(s)\x20as\x20well\x20as\x20update\x20the\x20Plugin\x20Parameters.',_0x4a7218+='\x0a\x0aSorry\x20for\x20the\x20inconvenience.',alert(_0x4a7218),SceneManager['exit']();return;}const _0x4b44d3=_0x5ed282(0x20f)+_0x346cba[_0x5ed282(0xfe)],_0x40054f=_0x5ed282(0x20f)+(_0x346cba['clickFilenameIcon']||_0x346cba[_0x5ed282(0xfe)]),_0x34619c=new Image();_0x34619c[_0x5ed282(0x1e1)]=_0x4b44d3,_0x34619c['onload']=function(){const _0xc02e2c=_0x5ed282,_0x54c832=document[_0xc02e2c(0x1e8)]('div');_0x54c832['style'][_0xc02e2c(0xeb)]=_0xc02e2c(0x166),_0x54c832['style'][_0xc02e2c(0x22f)]=_0x34619c[_0xc02e2c(0x22f)]+'px',_0x54c832['style'][_0xc02e2c(0xc2)]=_0x34619c[_0xc02e2c(0xc2)]+'px',_0x54c832['style'][_0xc02e2c(0x1a9)]=_0xc02e2c(0xbe)+_0x4b44d3+')',_0x54c832['style']['pointerEvents']=_0xc02e2c(0x18f),_0x54c832[_0xc02e2c(0x190)][_0xc02e2c(0x252)]=_0xc02e2c(0x12c),_0x54c832['style'][_0xc02e2c(0x176)]='none',document[_0xc02e2c(0x1ef)][_0xc02e2c(0x212)](_0x54c832),document['body']['style']['cursor']='none',document[_0xc02e2c(0x1ef)][_0xc02e2c(0x190)]['overflow']=_0xc02e2c(0xe3),document[_0xc02e2c(0xc4)](_0xc02e2c(0x244),function(_0xf97c0f){const _0x215b44=_0xc02e2c;_0x54c832[_0x215b44(0x190)][_0x215b44(0x176)]='';let _0x108d70=_0xf97c0f['pageX'],_0x165b69=_0xf97c0f[_0x215b44(0x1df)];_0x108d70<=0x0&&_0x165b69<=0x0&&(_0x108d70+=Graphics[_0x215b44(0x22f)]*0xa,_0x165b69+=Graphics['height']*0xa),_0x108d70-=Math[_0x215b44(0x119)](_0x346cba[_0x215b44(0x129)]*_0x34619c[_0x215b44(0x22f)]),_0x165b69-=Math[_0x215b44(0x119)](_0x346cba[_0x215b44(0x12d)]*_0x34619c[_0x215b44(0xc2)]),_0x54c832[_0x215b44(0x190)][_0x215b44(0xb6)]=_0x108d70+'px',_0x54c832['style'][_0x215b44(0xdc)]=_0x165b69+'px';}),document[_0xc02e2c(0xc4)](_0xc02e2c(0x1fe),function(_0x6f6d42){const _0x2caf55=_0xc02e2c,_0x28cf65=_0x6f6d42[_0x2caf55(0x185)][0x0];let _0x28aa8a=_0x28cf65[_0x2caf55(0x1e5)],_0x3e3dd9=_0x28cf65[_0x2caf55(0x1df)];_0x28aa8a-=Math[_0x2caf55(0x119)](_0x346cba[_0x2caf55(0x129)]*_0x34619c[_0x2caf55(0x22f)]),_0x3e3dd9-=Math[_0x2caf55(0x119)](_0x346cba['anchorY']*_0x34619c['height']),_0x54c832[_0x2caf55(0x190)]['left']=_0x28aa8a+'px',_0x54c832[_0x2caf55(0x190)][_0x2caf55(0xdc)]=_0x3e3dd9+'px';}),document[_0xc02e2c(0xc4)]('mousedown',function(){const _0x376e68=_0xc02e2c;_0x54c832[_0x376e68(0x190)][_0x376e68(0x1a9)]=_0x376e68(0xbe)+_0x40054f+')';}),document[_0xc02e2c(0xc4)]('mouseup',function(){const _0x3c7c9a=_0xc02e2c;_0x54c832[_0x3c7c9a(0x190)][_0x3c7c9a(0x1a9)]=_0x3c7c9a(0xbe)+_0x4b44d3+')';});},_0x34619c['onerror']=function(){const _0x201ae9=_0x5ed282;console[_0x201ae9(0xe0)]('Custom\x20cursor\x20image\x20failed\x20to\x20load.');};},VisuMZ['MainMenuCore'][_0xc3ecf6(0x20d)]=SceneManager[_0xc3ecf6(0x194)],SceneManager[_0xc3ecf6(0x194)]=function(_0x2441f4){const _0x3113ba=_0xc3ecf6;_0x2441f4===Scene_Menu&&($gameTemp[_0x3113ba(0x10d)]=undefined),VisuMZ['MainMenuCore'][_0x3113ba(0x20d)][_0x3113ba(0xfb)](this,_0x2441f4);},VisuMZ[_0xc3ecf6(0xcd)]['Game_System_initialize']=Game_System[_0xc3ecf6(0x1db)][_0xc3ecf6(0x1c0)],Game_System[_0xc3ecf6(0x1db)]['initialize']=function(){const _0x2a2d29=_0xc3ecf6;VisuMZ[_0x2a2d29(0xcd)][_0x2a2d29(0x202)][_0x2a2d29(0xfb)](this),this[_0x2a2d29(0x177)]();},Game_System['prototype']['initMainMenuCore']=function(){const _0x4e2044=_0xc3ecf6;this[_0x4e2044(0x15f)]=this[_0x4e2044(0x15f)]||{'forceShow':[],'forceHide':[],'forceEnable':[],'forceDisable':[]};},Game_System[_0xc3ecf6(0x1db)][_0xc3ecf6(0x216)]=function(){const _0x4e50c6=_0xc3ecf6;if(this['_mainMenuCore']===undefined)this[_0x4e50c6(0x177)]();const _0x1483c1=['forceShow','forceHide','forceEnable','forceDisable'];for(const _0x35177d of _0x1483c1){this[_0x4e50c6(0x15f)][_0x35177d]=this['_mainMenuCore'][_0x35177d]||[];}return this['_mainMenuCore'];},Game_System[_0xc3ecf6(0x1db)][_0xc3ecf6(0xdb)]=function(_0x4da038,_0x3932b9){const _0x30bdf0=_0xc3ecf6,_0x4350a5=this['mainMenuCoreSettings']();if(!_0x4350a5[_0x3932b9])return![];return _0x4350a5[_0x3932b9][_0x30bdf0(0x156)](_0x4da038);},Game_System[_0xc3ecf6(0x1db)][_0xc3ecf6(0x19b)]=function(_0xc32f8f){const _0x4091e4=_0xc3ecf6,_0xb62324=this[_0x4091e4(0x216)](),_0x4f2b50=[_0x4091e4(0x21a),'forceHide','forceEnable',_0x4091e4(0xd2)];for(const _0x54312f of _0x4f2b50){_0xb62324[_0x54312f][_0x4091e4(0xf7)](_0xc32f8f);}},Game_System[_0xc3ecf6(0x1db)][_0xc3ecf6(0x15c)]=function(_0x131824){const _0x10b138=_0xc3ecf6,_0x589e66=this['mainMenuCoreSettings']();!_0x589e66[_0x10b138(0x21a)][_0x10b138(0x156)](_0x131824)&&_0x589e66['forceShow']['push'](_0x131824),_0x589e66[_0x10b138(0x121)][_0x10b138(0xf7)](_0x131824);},Game_System[_0xc3ecf6(0x1db)][_0xc3ecf6(0x232)]=function(_0x427165){const _0x319b88=_0xc3ecf6,_0x43b187=this[_0x319b88(0x216)]();!_0x43b187[_0x319b88(0x121)]['includes'](_0x427165)&&_0x43b187['forceHide'][_0x319b88(0x194)](_0x427165),_0x43b187['forceShow']['remove'](_0x427165);},Game_System[_0xc3ecf6(0x1db)][_0xc3ecf6(0x251)]=function(_0x196105){const _0x102fca=_0xc3ecf6,_0xb0efd7=this[_0x102fca(0x216)]();!_0xb0efd7[_0x102fca(0x1b3)]['includes'](_0x196105)&&_0xb0efd7['forceEnable'][_0x102fca(0x194)](_0x196105),_0xb0efd7['forceDisable'][_0x102fca(0xf7)](_0x196105);},Game_System[_0xc3ecf6(0x1db)]['forceDisableMainMenuCommand']=function(_0x165895){const _0xec92f5=_0xc3ecf6,_0x57662e=this[_0xec92f5(0x216)]();!_0x57662e['forceDisable'][_0xec92f5(0x156)](_0x165895)&&_0x57662e[_0xec92f5(0xd2)]['push'](_0x165895),_0x57662e[_0xec92f5(0x1b3)]['remove'](_0x165895);},VisuMZ[_0xc3ecf6(0xcd)][_0xc3ecf6(0x1d8)]=Game_Actor[_0xc3ecf6(0x1db)][_0xc3ecf6(0xe1)],Game_Actor[_0xc3ecf6(0x1db)]['setup']=function(_0x1db3f4){const _0x20e92b=_0xc3ecf6;VisuMZ[_0x20e92b(0xcd)][_0x20e92b(0x1d8)][_0x20e92b(0xfb)](this,_0x1db3f4),this['initMenuImage']();},Game_Actor[_0xc3ecf6(0x1db)][_0xc3ecf6(0x22c)]=function(){const _0x4df837=_0xc3ecf6;this[_0x4df837(0x1c4)]='',this[_0x4df837(0x106)]()&&this['actor']()[_0x4df837(0x13b)][_0x4df837(0x14e)](/<MENU (?:IMAGE|PORTRAIT):[ ](.*)>/i)&&(this[_0x4df837(0x1c4)]=String(RegExp['$1']));},Game_Actor[_0xc3ecf6(0x1db)][_0xc3ecf6(0x171)]=function(){const _0x26f9ec=_0xc3ecf6;if(this[_0x26f9ec(0x1c4)]===undefined)this[_0x26f9ec(0x22c)]();return this[_0x26f9ec(0x1c4)];},Game_Actor[_0xc3ecf6(0x1db)][_0xc3ecf6(0x195)]=function(_0x29a6dd){const _0x4554aa=_0xc3ecf6;if(this[_0x4554aa(0x1c4)]===undefined)this[_0x4554aa(0x22c)]();this[_0x4554aa(0x1c4)]=_0x29a6dd;},Game_Actor[_0xc3ecf6(0x1db)][_0xc3ecf6(0x249)]=function(){const _0x4998eb=_0xc3ecf6;if(this['actor']()[_0x4998eb(0x13b)][_0x4998eb(0x14e)](/<MENU (?:IMAGE|PORTRAIT) OFFSET X:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this[_0x4998eb(0x106)]()[_0x4998eb(0x13b)][_0x4998eb(0x14e)](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);}return 0x0;},Game_Actor[_0xc3ecf6(0x1db)][_0xc3ecf6(0x117)]=function(){const _0x3edc33=_0xc3ecf6;if(this[_0x3edc33(0x106)]()[_0x3edc33(0x13b)][_0x3edc33(0x14e)](/<MENU (?:IMAGE|PORTRAIT) OFFSET Y:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this[_0x3edc33(0x106)]()[_0x3edc33(0x13b)][_0x3edc33(0x14e)](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return Number(RegExp['$2']);}return 0x0;},Scene_MenuBase[_0xc3ecf6(0x1db)][_0xc3ecf6(0x1eb)]=function(){const _0x199c16=_0xc3ecf6;return VisuMZ['MainMenuCore']['Settings'][_0x199c16(0xba)]['ActorBgMenus'][_0x199c16(0x156)](this[_0x199c16(0xe6)][_0x199c16(0x199)]);},VisuMZ[_0xc3ecf6(0xcd)][_0xc3ecf6(0x1a4)]=Scene_MenuBase['prototype'][_0xc3ecf6(0x1f0)],Scene_MenuBase['prototype'][_0xc3ecf6(0x1f0)]=function(){const _0x3ccc49=_0xc3ecf6;VisuMZ[_0x3ccc49(0xcd)][_0x3ccc49(0x1a4)][_0x3ccc49(0xfb)](this),this[_0x3ccc49(0x146)]();},Scene_MenuBase[_0xc3ecf6(0x1db)][_0xc3ecf6(0x146)]=function(){const _0x511127=_0xc3ecf6;this[_0x511127(0x12e)]=new Sprite_MenuBackgroundActor(),this[_0x511127(0xfa)](this[_0x511127(0x12e)]);},VisuMZ[_0xc3ecf6(0xcd)][_0xc3ecf6(0xef)]=Scene_MenuBase[_0xc3ecf6(0x1db)][_0xc3ecf6(0x10e)],Scene_MenuBase[_0xc3ecf6(0x1db)][_0xc3ecf6(0x10e)]=function(){const _0x1e643e=_0xc3ecf6;VisuMZ[_0x1e643e(0xcd)][_0x1e643e(0xef)][_0x1e643e(0xfb)](this),this['isDisplayActorMenuBackgroundImage']()&&this[_0x1e643e(0x12e)]&&this[_0x1e643e(0x12e)][_0x1e643e(0x1bc)](this['_actor']);},VisuMZ[_0xc3ecf6(0xcd)][_0xc3ecf6(0xd1)]=Scene_Menu[_0xc3ecf6(0x1db)][_0xc3ecf6(0xcb)],Scene_Menu[_0xc3ecf6(0x1db)][_0xc3ecf6(0xcb)]=function(){const _0x3f26a9=_0xc3ecf6;VisuMZ[_0x3f26a9(0xcd)][_0x3f26a9(0xd1)][_0x3f26a9(0xfb)](this),this[_0x3f26a9(0x246)](),this[_0x3f26a9(0x21d)](),this[_0x3f26a9(0x1bf)]();},Scene_Menu[_0xc3ecf6(0x1db)]['createCommandWindow']=function(){const _0x671537=_0xc3ecf6,_0x472115=this[_0x671537(0x24b)](),_0x2073e1=new Window_MenuCommand(_0x472115);_0x2073e1['setHandler'](_0x671537(0x1cf),this[_0x671537(0x21f)][_0x671537(0x13a)](this)),this[_0x671537(0x253)](_0x2073e1),this[_0x671537(0x192)]=_0x2073e1;},VisuMZ['MainMenuCore'][_0xc3ecf6(0xbf)]=Scene_Menu[_0xc3ecf6(0x1db)][_0xc3ecf6(0x24b)],Scene_Menu[_0xc3ecf6(0x1db)]['commandWindowRect']=function(){const _0x1cdd2b=_0xc3ecf6,_0x3fb105=this[_0x1cdd2b(0x25a)]();if(_0x3fb105===_0x1cdd2b(0xdc))return this[_0x1cdd2b(0x1da)]();else{if(_0x3fb105===_0x1cdd2b(0x15d))return this[_0x1cdd2b(0x107)]();else{if(_0x3fb105===_0x1cdd2b(0x186))return this[_0x1cdd2b(0x1f5)]();else{if(_0x3fb105===_0x1cdd2b(0x144))return this['commandWindowRectThinBottomStyle']();else{if(_0x3fb105===_0x1cdd2b(0x157))return this[_0x1cdd2b(0x1af)]();else{const _0x256abe=VisuMZ[_0x1cdd2b(0xcd)][_0x1cdd2b(0xbf)][_0x1cdd2b(0xfb)](this);return this[_0x1cdd2b(0x132)](_0x256abe),_0x256abe;}}}}}},Scene_Menu[_0xc3ecf6(0x1db)][_0xc3ecf6(0x132)]=function(_0x50b0fc){const _0x2ce2e6=_0xc3ecf6;this[_0x2ce2e6(0xb8)]()&&(_0x50b0fc[_0x2ce2e6(0xc2)]-=this['playtimeWindowRect']()['height']),this[_0x2ce2e6(0x1ab)]()&&(_0x50b0fc[_0x2ce2e6(0xc2)]-=this['variableWindowRect']()[_0x2ce2e6(0xc2)]);},Scene_Menu[_0xc3ecf6(0x1db)][_0xc3ecf6(0x1da)]=function(){const _0x5802a0=_0xc3ecf6,_0x120aad=VisuMZ[_0x5802a0(0xcd)][_0x5802a0(0xb7)][_0x5802a0(0x110)][_0x5802a0(0x250)],_0x4e84dd=Graphics[_0x5802a0(0x208)],_0xac906c=this[_0x5802a0(0x23e)](_0x120aad,!![]),_0x511c62=0x0,_0xa01806=this[_0x5802a0(0x1ac)]();return new Rectangle(_0x511c62,_0xa01806,_0x4e84dd,_0xac906c);},Scene_Menu[_0xc3ecf6(0x1db)][_0xc3ecf6(0x107)]=function(){const _0x81749a=_0xc3ecf6,_0x4252a4=VisuMZ[_0x81749a(0xcd)][_0x81749a(0xb7)][_0x81749a(0x110)][_0x81749a(0x250)],_0x588e36=Graphics[_0x81749a(0x208)],_0x5850e7=this[_0x81749a(0x23e)](0x1,!![]),_0x46413e=0x0,_0x4b203d=this[_0x81749a(0x1ac)]();return new Rectangle(_0x46413e,_0x4b203d,_0x588e36,_0x5850e7);},Scene_Menu['prototype']['commandWindowRectBottomStyle']=function(){const _0x36a874=_0xc3ecf6,_0x5a3c86=VisuMZ['MainMenuCore'][_0x36a874(0xb7)][_0x36a874(0x110)]['Rows'],_0x58f87c=Graphics['boxWidth'],_0x169047=this[_0x36a874(0x23e)](_0x5a3c86,!![]),_0x4222dc=0x0,_0x48e6d8=this[_0x36a874(0x189)]()-_0x169047;return new Rectangle(_0x4222dc,_0x48e6d8,_0x58f87c,_0x169047);},Scene_Menu['prototype']['commandWindowRectThinBottomStyle']=function(){const _0xd4ae74=_0xc3ecf6,_0x1baa9e=VisuMZ[_0xd4ae74(0xcd)][_0xd4ae74(0xb7)][_0xd4ae74(0x110)]['Rows'],_0x105cac=Graphics[_0xd4ae74(0x208)],_0x1c1077=this[_0xd4ae74(0x23e)](0x1,!![]),_0x46dd05=0x0,_0x29d41d=this['mainAreaBottom']()-_0x1c1077;return new Rectangle(_0x46dd05,_0x29d41d,_0x105cac,_0x1c1077);},Scene_Menu[_0xc3ecf6(0x1db)][_0xc3ecf6(0x1af)]=function(){const _0x11db78=_0xc3ecf6,_0x18ecf2=VisuMZ[_0x11db78(0xcd)]['Settings'][_0x11db78(0x110)][_0x11db78(0x250)],_0x372bb0=Graphics[_0x11db78(0x208)],_0xb67a5a=Window_MenuCommand[_0x11db78(0x1db)]['fittingHeight'](_0x18ecf2),_0x35e332=0x0,_0x5c6761=Math['round']((Graphics[_0x11db78(0x20e)]-_0xb67a5a)/0x2);return new Rectangle(_0x35e332,_0x5c6761,_0x372bb0,_0xb67a5a);},Scene_Menu['prototype']['commandWindowStyle']=function(){const _0xac4a6f=_0xc3ecf6;return VisuMZ[_0xac4a6f(0xcd)][_0xac4a6f(0xb7)][_0xac4a6f(0x1b9)];},Scene_Menu[_0xc3ecf6(0x1db)]['thinGoldWindow']=function(){const _0x480604=_0xc3ecf6;if(this['commandWindowStyle']()!=='default')return!![];return VisuMZ['MainMenuCore'][_0x480604(0xb7)]['General'][_0x480604(0xb9)];},Scene_Menu['prototype']['createGoldWindow']=function(){const _0x21d476=_0xc3ecf6,_0x189b94=this[_0x21d476(0x240)]();this[_0x21d476(0x174)]=this[_0x21d476(0x1fd)]()?new Window_ThinGold(_0x189b94):new Window_Gold(_0x189b94),this[_0x21d476(0x253)](this[_0x21d476(0x174)]);},VisuMZ[_0xc3ecf6(0xcd)][_0xc3ecf6(0x24c)]=Scene_Menu['prototype'][_0xc3ecf6(0x240)],Scene_Menu[_0xc3ecf6(0x1db)]['goldWindowRect']=function(){const _0x42f8d5=_0xc3ecf6,_0x1b2514=this[_0x42f8d5(0x25a)]();if([_0x42f8d5(0xdc),'thinTop',_0x42f8d5(0x157)]['includes'](_0x1b2514))return this[_0x42f8d5(0x182)]();else{if([_0x42f8d5(0x186),'thinBottom'][_0x42f8d5(0x156)](_0x1b2514))return this[_0x42f8d5(0x169)]();else{const _0x12f7b4=VisuMZ[_0x42f8d5(0xcd)][_0x42f8d5(0x24c)][_0x42f8d5(0xfb)](this);return this['applyThinnerGoldWindowRect'](_0x12f7b4),_0x12f7b4;}}},Scene_Menu['prototype'][_0xc3ecf6(0x172)]=function(_0x46136b){const _0x572671=_0xc3ecf6;if(this['thinGoldWindow']()){if(VisuMZ[_0x572671(0xcd)][_0x572671(0xb7)][_0x572671(0xba)][_0x572671(0x24a)]){const _0x2bd915=_0x46136b[_0x572671(0xc2)]-this[_0x572671(0x23e)](0x1,![]);_0x46136b['y']+=_0x2bd915;}VisuMZ[_0x572671(0xcd)][_0x572671(0xb7)][_0x572671(0xba)][_0x572671(0x24d)]&&(_0x46136b[_0x572671(0xc2)]=this[_0x572671(0x23e)](0x1,![]));}},Scene_Menu['prototype'][_0xc3ecf6(0x182)]=function(){const _0x580098=_0xc3ecf6,_0x5b8beb=this[_0x580098(0x245)](),_0x357f56=this['calcWindowHeight'](0x1,![]),_0x46d290=Graphics[_0x580098(0x208)]-_0x5b8beb,_0x42ca6c=this[_0x580098(0x189)]()-_0x357f56;return new Rectangle(_0x46d290,_0x42ca6c,_0x5b8beb,_0x357f56);},Scene_Menu[_0xc3ecf6(0x1db)][_0xc3ecf6(0x169)]=function(){const _0x29f57f=_0xc3ecf6,_0x5bb54d=this['mainCommandWidth'](),_0x4307b1=this[_0x29f57f(0x23e)](0x1,![]),_0x316567=Graphics[_0x29f57f(0x208)]-_0x5bb54d,_0x93fdd=this[_0x29f57f(0x1ac)]();return new Rectangle(_0x316567,_0x93fdd,_0x5bb54d,_0x4307b1);},VisuMZ['MainMenuCore'][_0xc3ecf6(0xda)]=Scene_Menu['prototype']['createStatusWindow'],Scene_Menu[_0xc3ecf6(0x1db)]['createStatusWindow']=function(){const _0x49d001=_0xc3ecf6;VisuMZ['MainMenuCore']['Scene_Menu_createStatusWindow']['call'](this),this[_0x49d001(0x1b6)]();},Scene_Menu[_0xc3ecf6(0x1db)]['adjustStatusWindowMobile']=function(){const _0x181d22=_0xc3ecf6;this[_0x181d22(0x25a)]()===_0x181d22(0x157)&&(this[_0x181d22(0xe5)][_0x181d22(0x136)]=0x0);},VisuMZ[_0xc3ecf6(0xcd)][_0xc3ecf6(0x1a8)]=Scene_Menu['prototype']['statusWindowRect'],Scene_Menu['prototype'][_0xc3ecf6(0x217)]=function(){const _0x328236=_0xc3ecf6,_0x2c74a8=this[_0x328236(0x25a)]();if([_0x328236(0xdc),_0x328236(0x15d)][_0x328236(0x156)](_0x2c74a8))return this[_0x328236(0x1ce)]();else{if([_0x328236(0x186),'thinBottom'][_0x328236(0x156)](_0x2c74a8))return this[_0x328236(0x239)]();else return _0x2c74a8===_0x328236(0x157)?this[_0x328236(0x12f)]():VisuMZ[_0x328236(0xcd)][_0x328236(0x1a8)][_0x328236(0xfb)](this);}},Scene_Menu['prototype'][_0xc3ecf6(0x1ce)]=function(){const _0x1c885f=_0xc3ecf6,_0x549ed5=Graphics[_0x1c885f(0x208)],_0x191f91=this[_0x1c885f(0x13c)]()-this[_0x1c885f(0x192)][_0x1c885f(0xc2)]-this[_0x1c885f(0x174)][_0x1c885f(0xc2)],_0x12c7be=0x0,_0x42d89d=this[_0x1c885f(0x192)]['y']+this[_0x1c885f(0x192)][_0x1c885f(0xc2)];return new Rectangle(_0x12c7be,_0x42d89d,_0x549ed5,_0x191f91);},Scene_Menu[_0xc3ecf6(0x1db)][_0xc3ecf6(0x239)]=function(){const _0x138c2e=_0xc3ecf6,_0x4f993f=Graphics[_0x138c2e(0x208)],_0x4bb82c=this[_0x138c2e(0x13c)]()-this[_0x138c2e(0x192)][_0x138c2e(0xc2)]-this[_0x138c2e(0x174)][_0x138c2e(0xc2)],_0x2d4115=0x0,_0x297a87=this[_0x138c2e(0x174)]['y']+this[_0x138c2e(0x174)]['height'];return new Rectangle(_0x2d4115,_0x297a87,_0x4f993f,_0x4bb82c);},Scene_Menu[_0xc3ecf6(0x1db)][_0xc3ecf6(0x12f)]=function(){const _0x3eb346=_0xc3ecf6,_0x317602=Graphics[_0x3eb346(0x208)],_0x5a71e5=this['mainAreaHeight']()-this[_0x3eb346(0x174)][_0x3eb346(0xc2)],_0x2da850=0x0,_0x583747=this[_0x3eb346(0x189)]()-this[_0x3eb346(0x174)][_0x3eb346(0xc2)]-_0x5a71e5;return new Rectangle(_0x2da850,_0x583747,_0x317602,_0x5a71e5);},Scene_Menu['prototype']['createPlaytimeWindow']=function(){const _0x145b4c=_0xc3ecf6;if(!this[_0x145b4c(0x114)]())return new Rectangle(0x0,0x0,0x0,0x0);const _0x51d37e=this[_0x145b4c(0x15b)]();this[_0x145b4c(0x124)]=new Window_Playtime(_0x51d37e),this[_0x145b4c(0x124)][_0x145b4c(0x12b)](VisuMZ[_0x145b4c(0xcd)]['Settings'][_0x145b4c(0xe8)]['BgType']),this[_0x145b4c(0x253)](this['_playtimeWindow']);},Scene_Menu[_0xc3ecf6(0x1db)][_0xc3ecf6(0x114)]=function(){const _0x4cccc5=_0xc3ecf6;return VisuMZ[_0x4cccc5(0xcd)][_0x4cccc5(0xb7)]['Playtime']['Enable'];},Scene_Menu['prototype'][_0xc3ecf6(0xb8)]=function(){const _0x47a7be=_0xc3ecf6;return this[_0x47a7be(0x114)]()&&(VisuMZ['MainMenuCore'][_0x47a7be(0xb7)]['Playtime'][_0x47a7be(0x127)]??!![]);},Scene_Menu[_0xc3ecf6(0x1db)][_0xc3ecf6(0x15b)]=function(){const _0x10d3d6=_0xc3ecf6,_0x1b923e=this[_0x10d3d6(0x25a)]();if(['top',_0x10d3d6(0x15d),'mobile'][_0x10d3d6(0x156)](_0x1b923e))return this[_0x10d3d6(0x155)]();else return['bottom',_0x10d3d6(0x144)][_0x10d3d6(0x156)](_0x1b923e)?this[_0x10d3d6(0x215)]():VisuMZ[_0x10d3d6(0xcd)]['Settings'][_0x10d3d6(0xe8)][_0x10d3d6(0x24e)][_0x10d3d6(0xfb)](this);},Scene_Menu['prototype'][_0xc3ecf6(0x155)]=function(){const _0x223c4e=_0xc3ecf6,_0x1efe87=this[_0x223c4e(0x245)](),_0x1e9c58=this['calcWindowHeight'](0x1,![]),_0x5c797e=0x0,_0x347b8e=this['mainAreaBottom']()-_0x1e9c58;return new Rectangle(_0x5c797e,_0x347b8e,_0x1efe87,_0x1e9c58);},Scene_Menu['prototype']['playtimeWindowRectBottomStyle']=function(){const _0x58928e=_0xc3ecf6,_0x1ef57e=this[_0x58928e(0x245)](),_0x10bf93=this[_0x58928e(0x23e)](0x1,![]),_0x4fef4e=0x0,_0x5c9362=this[_0x58928e(0x1ac)]();return new Rectangle(_0x4fef4e,_0x5c9362,_0x1ef57e,_0x10bf93);},Scene_Menu[_0xc3ecf6(0x1db)]['createVariableWindow']=function(){const _0x2bb689=_0xc3ecf6;if(!this[_0x2bb689(0x123)]())return new Rectangle(0x0,0x0,0x0,0x0);const _0x24d224=this[_0x2bb689(0x134)]();this['_variableWindow']=new Window_MenuVariables(_0x24d224),this[_0x2bb689(0x1c9)]['setBackgroundType'](VisuMZ[_0x2bb689(0xcd)]['Settings'][_0x2bb689(0xfd)][_0x2bb689(0xdd)]),this[_0x2bb689(0x253)](this[_0x2bb689(0x1c9)]);},Scene_Menu[_0xc3ecf6(0x1db)][_0xc3ecf6(0x123)]=function(){const _0x96e2a7=_0xc3ecf6;return VisuMZ[_0x96e2a7(0xcd)][_0x96e2a7(0xb7)][_0x96e2a7(0xfd)]['Enable'];},Scene_Menu[_0xc3ecf6(0x1db)]['adjustCommandHeightByVariable']=function(){const _0x45c3af=_0xc3ecf6;return this['canCreateVariableWindow']()&&(VisuMZ['MainMenuCore'][_0x45c3af(0xb7)][_0x45c3af(0xfd)][_0x45c3af(0x127)]??!![]);},Scene_Menu[_0xc3ecf6(0x1db)][_0xc3ecf6(0x134)]=function(){const _0x2b4631=_0xc3ecf6,_0xcf588b=this[_0x2b4631(0x25a)]();if(['top',_0x2b4631(0x15d),_0x2b4631(0x157)]['includes'](_0xcf588b))return this[_0x2b4631(0x1c8)]();else return[_0x2b4631(0x186),'thinBottom']['includes'](_0xcf588b)?this[_0x2b4631(0x210)]():VisuMZ[_0x2b4631(0xcd)][_0x2b4631(0xb7)][_0x2b4631(0xfd)]['WindowRect']['call'](this);},Scene_Menu['prototype']['variableWindowRectTopStyle']=function(){const _0x3677a3=_0xc3ecf6,_0x47d9ad=Graphics[_0x3677a3(0x208)]-this['_goldWindow']['width']-(this[_0x3677a3(0x124)]?this[_0x3677a3(0x124)][_0x3677a3(0x22f)]:0x0),_0x31bf86=this[_0x3677a3(0x23e)](0x1,![]),_0x5d8e5c=this['_goldWindow']['x']-_0x47d9ad,_0x2da99a=this[_0x3677a3(0x189)]()-_0x31bf86;return new Rectangle(_0x5d8e5c,_0x2da99a,_0x47d9ad,_0x31bf86);},Scene_Menu[_0xc3ecf6(0x1db)][_0xc3ecf6(0x210)]=function(){const _0x3d201a=_0xc3ecf6,_0x41b7cf=Graphics['boxWidth']-this[_0x3d201a(0x174)][_0x3d201a(0x22f)]-(this[_0x3d201a(0x124)]?this[_0x3d201a(0x124)][_0x3d201a(0x22f)]:0x0),_0x2feb2d=this[_0x3d201a(0x23e)](0x1,![]),_0xd63197=this[_0x3d201a(0x174)]['x']-_0x41b7cf,_0x4224dc=this['mainAreaTop']();return new Rectangle(_0xd63197,_0x4224dc,_0x41b7cf,_0x2feb2d);},Scene_Menu[_0xc3ecf6(0x1db)][_0xc3ecf6(0x1bf)]=function(){const _0x478ec9=_0xc3ecf6;if(!this[_0x478ec9(0xd8)]())return;const _0x155a40=this[_0x478ec9(0x134)]();this[_0x478ec9(0xce)]=new Window_Base(_0x155a40),this[_0x478ec9(0xce)][_0x478ec9(0x12b)](VisuMZ['MainMenuCore'][_0x478ec9(0xb7)][_0x478ec9(0xfd)][_0x478ec9(0xdd)]),this[_0x478ec9(0x253)](this[_0x478ec9(0xce)]);},Scene_Menu['prototype'][_0xc3ecf6(0xd8)]=function(){const _0x3bd595=_0xc3ecf6;if([_0x3bd595(0xbd),_0x3bd595(0x157)][_0x3bd595(0x156)](this['commandWindowStyle']()))return![];if(this[_0x3bd595(0x1c9)])return![];return!![];},VisuMZ['MainMenuCore']['Scene_Menu_commandPersonal']=Scene_Menu['prototype']['commandPersonal'],Scene_Menu['prototype'][_0xc3ecf6(0xea)]=function(){const _0x341f22=_0xc3ecf6;if(this['isSoloQuickMode']()&&this[_0x341f22(0xe5)])$gameParty['setTargetActor']($gameParty[_0x341f22(0x151)]()[0x0]),this[_0x341f22(0x233)]();else{if(this[_0x341f22(0x25a)]()===_0x341f22(0x157))this[_0x341f22(0xe5)][_0x341f22(0x17c)]();VisuMZ[_0x341f22(0xcd)][_0x341f22(0x138)][_0x341f22(0xfb)](this);}},Scene_Menu[_0xc3ecf6(0x1db)][_0xc3ecf6(0xf4)]=function(){const _0x422015=_0xc3ecf6;return VisuMZ[_0x422015(0xcd)][_0x422015(0xb7)]['General'][_0x422015(0xc8)]&&$gameParty[_0x422015(0x151)]()['length']<=0x1;},Scene_Menu[_0xc3ecf6(0x1db)][_0xc3ecf6(0x233)]=function(){const _0xa56c3b=_0xc3ecf6,_0x4bce15=this[_0xa56c3b(0x192)][_0xa56c3b(0x128)](),_0x4ea0da=this[_0xa56c3b(0x192)][_0xa56c3b(0x197)]();for(const _0xb43b2d of Window_MenuCommand[_0xa56c3b(0x16c)]){if(_0xb43b2d[_0xa56c3b(0x183)]===_0x4bce15){_0xb43b2d[_0xa56c3b(0x193)][_0xa56c3b(0xfb)](this,_0x4ea0da);return;}}},VisuMZ[_0xc3ecf6(0xcd)][_0xc3ecf6(0xcf)]=Scene_Menu[_0xc3ecf6(0x1db)]['onPersonalCancel'],Scene_Menu[_0xc3ecf6(0x1db)]['onPersonalCancel']=function(){const _0x935196=_0xc3ecf6;VisuMZ['MainMenuCore'][_0x935196(0xcf)][_0x935196(0xfb)](this);if(this[_0x935196(0x25a)]()===_0x935196(0x157))this['_statusWindow'][_0x935196(0x142)]();},Scene_Menu[_0xc3ecf6(0x1db)][_0xc3ecf6(0x165)]=function(){const _0x1ae52d=_0xc3ecf6,_0x177aef=parseInt(this[_0x1ae52d(0x192)][_0x1ae52d(0x197)]());_0x177aef?($gameTemp[_0x1ae52d(0x16f)](_0x177aef),this[_0x1ae52d(0x1f7)]()):this[_0x1ae52d(0x192)][_0x1ae52d(0xc9)]();},VisuMZ['MainMenuCore'][_0xc3ecf6(0xf0)]=Scene_Menu[_0xc3ecf6(0x1db)][_0xc3ecf6(0x1b8)],Scene_Menu[_0xc3ecf6(0x1db)][_0xc3ecf6(0x1b8)]=function(){const _0x9c4974=_0xc3ecf6;VisuMZ[_0x9c4974(0xcd)][_0x9c4974(0xf0)]['call'](this);if(this[_0x9c4974(0x25a)]()===_0x9c4974(0x157))this[_0x9c4974(0xe5)]['open']();},VisuMZ[_0xc3ecf6(0xcd)][_0xc3ecf6(0x14a)]=Scene_Menu[_0xc3ecf6(0x1db)][_0xc3ecf6(0x184)],Scene_Menu[_0xc3ecf6(0x1db)][_0xc3ecf6(0x184)]=function(){const _0x313bdf=_0xc3ecf6;VisuMZ['MainMenuCore']['Scene_Menu_onFormationCancel'][_0x313bdf(0xfb)](this);if(this[_0x313bdf(0x25a)]()===_0x313bdf(0x157))this['_statusWindow']['close']();},Scene_Menu['prototype'][_0xc3ecf6(0x104)]=function(){const _0x574589=_0xc3ecf6;Imported[_0x574589(0x1dc)]&&StorageManager[_0x574589(0x237)]()==='single'?DataManager['loadGame'](0x0)['then'](()=>this['onSaveCoreLoadSuccess']())[_0x574589(0x1a3)](()=>this['onSaveCoreLoadFailure']()):SceneManager[_0x574589(0x194)](Scene_Load);},Scene_Menu[_0xc3ecf6(0x1db)]['commandCancel']=function(){const _0x116a7a=_0xc3ecf6;this[_0x116a7a(0x192)][_0x116a7a(0x23f)]()!==''?this[_0x116a7a(0x192)]['removeSubcategory']():this[_0x116a7a(0x1f7)]();},Scene_Menu[_0xc3ecf6(0x1db)][_0xc3ecf6(0x111)]=function(){const _0x2bd53c=_0xc3ecf6;SoundManager[_0x2bd53c(0xca)](),this['fadeOutAll'](),Scene_Load['prototype'][_0x2bd53c(0xe7)](),SceneManager['goto'](Scene_Map),this[_0x2bd53c(0x125)]=!![],VisuMZ[_0x2bd53c(0x254)][_0x2bd53c(0xb7)][_0x2bd53c(0x222)][_0x2bd53c(0x1e0)][_0x2bd53c(0xfb)](this);},Scene_Menu['prototype'][_0xc3ecf6(0x18a)]=function(){const _0x2160e4=_0xc3ecf6;SoundManager[_0x2160e4(0x17e)](),VisuMZ[_0x2160e4(0x254)][_0x2160e4(0xb7)]['Save'][_0x2160e4(0xd6)][_0x2160e4(0xfb)](this),this[_0x2160e4(0x135)]();},VisuMZ['MainMenuCore'][_0xc3ecf6(0x179)]=Scene_Menu['prototype'][_0xc3ecf6(0x173)],Scene_Menu[_0xc3ecf6(0x1db)][_0xc3ecf6(0x173)]=function(){const _0x57023d=_0xc3ecf6;VisuMZ[_0x57023d(0xcd)][_0x57023d(0x179)]['call'](this);if(this['_loadSuccess'])$gameSystem[_0x57023d(0x18d)]();};function _0x1695(){const _0x4e727e=['canCreatePlaytimeWindow','isExpGaugeDrawn','Subcategory','getMenuImageOffsetY','drawItemImage','round','ThinStyle','loadSvActor','min','svActorHorzCells','TextJS','drawItemStatusPortraitStyle','windowPadding','forceHide','select','canCreateVariableWindow','_playtimeWindow','_loadSuccess','changeTextColor','AdjustCommandHeight','currentSymbol','anchorX','1191580iuIrjL','setBackgroundType','1000','anchorY','_actorMenuBgSprite','statusWindowRectMobileStyle','1497507NCvyIx','playtimeText','adjustDefaultCommandWindowRect','Step1End','variableWindowRect','loadFailureConfirmationWindow','openness','drawPendingItemBackground','Scene_Menu_commandPersonal','maxBattleMembers','bind','note','mainAreaHeight','loadOtherActorImages','15492672tbRpeF','loadSystemImages','maxCols','setHandler','close','drawItemStatusThinStyle','thinBottom','loadPicture','createActorMenuBackgroundImageSprite','thin','addGameEndCommand','Window_MenuCommand_initialize','Scene_Menu_onFormationCancel','VerticalStyle','Style','addLoadListener','match','return\x200','_subcategory','members','ARRAYEVAL','isBattleMember','text','playtimeWindowRectTopStyle','includes','mobile','resetFontSettings','isMainMenuCommandEnabled','_actor','playtimeWindowRect','forceShowMainMenuCommand','thinTop','drawIcon','_mainMenuCore','⚠️⚠️⚠️WARNING!⚠️⚠️⚠️','MenuCommandForceEnable','value','ListStyles','STRUCT','commandCommonEvent','absolute','_commandNameWindow','addFormationCommand','goldWindowRectBottomStyle','9542652RUbByL','commandNameWindowDrawBackground','_commandList','SUBCATEGORY_LIST','Step2','reserveCommonEvent','graphicType','getMenuImage','applyThinnerGoldWindowRect','terminate','_goldWindow','commandStyle','display','initMainMenuCore','subcategory','Scene_Title_terminate','replace','isArray','open','ChangeActorMenuImageGroup','playBuzzer','STR','setTopRow','_list','goldWindowRectTopStyle','Symbol','onFormationCancel','touches','bottom','thicker','MouseCursor','mainAreaBottom','onSaveCoreLoadFailure','faceHeight','commandNameWindowDrawText','onAfterLoad','MenuCommandClear','none','style','makeMainMenuCoreCommandList','_commandWindow','PersonalHandlerJS','push','setMenuImage','drawItemStyleIcon','currentExt','innerHeight','name','_targetX','clearShowMainMenuCommand','addSaveCommand','addMainCommands','drawTextEx','Step1','hasStaticSvBattler','svActorVertCells','IsCustomCursorEnabled','catch','Scene_MenuBase_createBackground','ARRAYJSON','\x0aMain\x20Menu\x20Core\x27s\x20\x22Custom\x20Mouse\x20Cursor\x22\x20has\x20moved\x20image\x20location','drawItemStatusSoloStyleOnLoad','Scene_Menu_statusWindowRect','backgroundImage','FilenameJS','adjustCommandHeightByVariable','mainAreaTop','changePaintOpacity','CallHandlerJS','commandWindowRectMobileStyle','_duration','2381542OjmYEr','\x5cI[%1]%2','forceEnable','TextStr','drawActorGraphic','adjustStatusWindowMobile','Window_MenuStatus_selectLast','commandFormation','CommandWindowStyle','forceDisableMainMenuCommand','commandName','setActor','blt','commandNameWindowCenter','createDummyWindow','initialize','PortraitStyle','8sBwklL','drawItemActorFace','_menuImage','ExtJS','addOptionsCommand','ceil','variableWindowRectTopStyle','_variableWindow','updatePosition','battlerName','vertical','clear','statusWindowRectTopStyle','cancel','variables','bitmap','drawTimeLabel','drawItem','systemColor','_playtimeText','maxVisibleItems','iconHeight','Game_Actor_setup','drawTimeIcon','commandWindowRectTopStyle','prototype','VisuMZ_1_SaveCore','update','onBitmapLoad','pageY','OnLoadSuccessJS','src','options','DefaultStyle','ShowReserve','pageX','registerCommand','contents','createElement','SetupCustomCursor','max','isDisplayActorMenuBackgroundImage','lineHeight','makeCommandList','updateCommandNameWindow','body','createBackground','addCommand','opacity','Symbols','updateOpacity','commandWindowRectBottomStyle','ARRAYSTRUCT','popScene','loadCharacter','idleFilename','drawItemStyleIconText','length','drawPlaytime','thinGoldWindow','touchmove','drawAllItems','parse','svbattler','Game_System_initialize','save','center','isMainMenuCommandVisible','drawText','updateTimer','boxWidth','Cols','NO\x20ACTOR\x20FOUND!','loadFaceImages','innerWidth','SceneManager_push','boxHeight','icon/','variableWindowRectBottomStyle','addSymbolBridge','appendChild','HideMainMenuOnly','description','playtimeWindowRectBottomStyle','mainMenuCoreSettings','statusWindowRect','Scene_Boot_loadSystemImages_MC','_scrollDuration','forceShow','7566TFYGoy','VarList','createVariableWindow','CommandList','commandCancel','setSubcategory','ConvertParams','Save','ARRAYNUM','removeSubcategory','icon','filter','textSizeEx','isIncludedInSubcategory','_timer','map','log','initMenuImage','updateDuration','_scene','width','solo','itemTextAlign','forceHideMainMenuCommand','onPersonalOk','itemRect','fill','drawItemStatusVerticalStyle','saveStyle','itemLineRect','statusWindowRectBottomStyle','ActorBgMenuJS','isMobileDevice','drawItemStatusPortraitStyleOnLoad','drawItemStatusDefaultStyle','calcWindowHeight','currentSubcategory','goldWindowRect','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','sprite','version','mousemove','mainCommandWidth','createPlaytimeWindow','drawActorFace','SoloStyle','getMenuImageOffsetX','AutoGoldY','commandWindowRect','Scene_Menu_goldWindowRect','AutoGoldHeight','WindowRect','loadBitmap','Rows','forceEnableMainMenuCommand','zIndex','addWindow','SaveCore','_bitmapReady','addOriginalCommands','InnerMenuListStyle','StatusListStyle','doesSubcategoryExist','commandWindowStyle','findExt','item','portrait','topIndex','battleMembers','getSubcategoryList','left','Settings','adjustCommandHeightByPlaytime','ThinGoldWindow','General','callUpdateHelp','characterName','default','url(','Scene_Menu_commandWindowRect','drawItemStatusSoloStyle','drawItemActorMenuImage','height','Window_MenuStatus_drawItemImage','addEventListener','NUM','refresh','showOnlyBattleMembers','SoloQuick','activate','playLoad','create','StatusGraphic','MainMenuCore','_dummyWindow','Scene_Menu_onPersonalCancel','drawItemBackground','Scene_Menu_create','forceDisable','format','listStyle','drawItemStatus','OnLoadFailureJS','floor','needsDummyWindow','drawItemActorSvBattler','Scene_Menu_createStatusWindow','getMainMenuSymbolState','top','BgType','Icon','colSpacing','error','setup','exit','hidden','Step1Start','_statusWindow','constructor','reloadMapIfUpdated','Playtime','resetTextColor','commandPersonal','position','iconWidth','concat','MenuCommandForceDisable','Scene_MenuBase_updateActor','Scene_Menu_commandFormation','5245440TdICQl','StatusSelectLast','Window_MenuStatus_maxItems','isSoloQuickMode','drawItemStatusThickerStyle','Window_MenuStatus_itemHeight','remove','right','trim','addChild','call','_targetY','Variable','idleFilenameIcon','FontSize','auto','faceWidth','_data','maxItems','commandLoad','iconText','actor','commandWindowRectThinTopStyle','drawSvActor','smoothSelect','1565FGGQWW','drawItemActorSprite','gameEnd','_mainMenuSubcategory','updateActor','itemHeight','CustomCmdWin','onSaveCoreLoadSuccess','index','commandStyleCheck'];_0x1695=function(){return _0x4e727e;};return _0x1695();}function Sprite_MenuBackgroundActor(){this['initialize'](...arguments);}Sprite_MenuBackgroundActor[_0xc3ecf6(0x1db)]=Object[_0xc3ecf6(0xcb)](Sprite[_0xc3ecf6(0x1db)]),Sprite_MenuBackgroundActor[_0xc3ecf6(0x1db)][_0xc3ecf6(0xe6)]=Sprite_MenuBackgroundActor,Sprite_MenuBackgroundActor[_0xc3ecf6(0x1db)][_0xc3ecf6(0x1c0)]=function(){const _0x3f8cfe=_0xc3ecf6;this[_0x3f8cfe(0x15a)]=null,this['_bitmapReady']=![],Sprite[_0x3f8cfe(0x1db)][_0x3f8cfe(0x1c0)][_0x3f8cfe(0xfb)](this),this['x']=Graphics[_0x3f8cfe(0x22f)];},Sprite_MenuBackgroundActor['prototype'][_0xc3ecf6(0x1bc)]=function(_0x73725a){const _0x4aa6ea=_0xc3ecf6;this[_0x4aa6ea(0x15a)]!==_0x73725a&&(this[_0x4aa6ea(0x15a)]=_0x73725a,this[_0x4aa6ea(0x24f)]());},Sprite_MenuBackgroundActor[_0xc3ecf6(0x1db)][_0xc3ecf6(0x24f)]=function(){const _0x2427b5=_0xc3ecf6;this[_0x2427b5(0x255)]=![],this[_0x2427b5(0x15a)]?(this[_0x2427b5(0x1d1)]=ImageManager['loadPicture'](this[_0x2427b5(0x15a)]['getMenuImage']()),this[_0x2427b5(0x1d1)][_0x2427b5(0x14d)](this['onBitmapLoad'][_0x2427b5(0x13a)](this))):this[_0x2427b5(0x1d1)]=new Bitmap(0x1,0x1);},Sprite_MenuBackgroundActor[_0xc3ecf6(0x1db)][_0xc3ecf6(0x1de)]=function(){const _0x33873e=_0xc3ecf6;this[_0x33873e(0x255)]=!![],VisuMZ[_0x33873e(0xcd)][_0x33873e(0xb7)][_0x33873e(0xba)][_0x33873e(0x23a)][_0x33873e(0xfb)](this);},Sprite_MenuBackgroundActor['prototype'][_0xc3ecf6(0x1dd)]=function(){const _0x5040d3=_0xc3ecf6;Sprite[_0x5040d3(0x1db)][_0x5040d3(0x1dd)][_0x5040d3(0xfb)](this),this[_0x5040d3(0x255)]&&(this['updateOpacity'](),this[_0x5040d3(0x1ca)](),this[_0x5040d3(0x22d)]());},Sprite_MenuBackgroundActor[_0xc3ecf6(0x1db)][_0xc3ecf6(0x1f4)]=function(){const _0x23a446=_0xc3ecf6;if(this[_0x23a446(0x1b0)]>0x0){const _0x4d303d=this[_0x23a446(0x1b0)];this[_0x23a446(0x1f2)]=(this[_0x23a446(0x1f2)]*(_0x4d303d-0x1)+0xff)/_0x4d303d;}},Sprite_MenuBackgroundActor[_0xc3ecf6(0x1db)][_0xc3ecf6(0x1ca)]=function(){const _0x475d81=_0xc3ecf6;if(this[_0x475d81(0x1b0)]>0x0){const _0x23184f=this[_0x475d81(0x1b0)];this['x']=(this['x']*(_0x23184f-0x1)+this[_0x475d81(0x19a)])/_0x23184f,this['y']=(this['y']*(_0x23184f-0x1)+this[_0x475d81(0xfc)])/_0x23184f;}},Sprite_MenuBackgroundActor['prototype'][_0xc3ecf6(0x22d)]=function(){if(this['_duration']>0x0)this['_duration']--;},ImageManager['svActorHorzCells']=ImageManager[_0xc3ecf6(0x11d)]||0x9,ImageManager[_0xc3ecf6(0x1a1)]=ImageManager[_0xc3ecf6(0x1a1)]||0x6,Window_Base['prototype'][_0xc3ecf6(0x108)]=function(_0x5c5ee4,_0x92af03,_0xdaa0da){const _0x4ae066=_0xc3ecf6,_0x5b62db=_0x5c5ee4[_0x4ae066(0x14e)](/\$/i),_0x3fc5b6=ImageManager[_0x4ae066(0x11b)](_0x5c5ee4),_0x1e6e64=_0x3fc5b6[_0x4ae066(0x22f)]/(_0x5b62db?0x1:ImageManager[_0x4ae066(0x11d)]),_0x40e147=_0x3fc5b6['height']/(_0x5b62db?0x1:ImageManager[_0x4ae066(0x1a1)]),_0x453c53=0x0,_0x4e645e=0x0;this['contents'][_0x4ae066(0x1bd)](_0x3fc5b6,_0x453c53,_0x4e645e,_0x1e6e64,_0x40e147,_0x92af03-_0x1e6e64/0x2,_0xdaa0da-_0x40e147);},Window_MenuCommand['_commandList']=VisuMZ[_0xc3ecf6(0xcd)]['Settings'][_0xc3ecf6(0x21e)],Window_MenuCommand[_0xc3ecf6(0x16d)]=undefined,VisuMZ[_0xc3ecf6(0xcd)][_0xc3ecf6(0x149)]=Window_MenuCommand['prototype'][_0xc3ecf6(0x1c0)],Window_MenuCommand['prototype'][_0xc3ecf6(0x1c0)]=function(_0xa29396){const _0x560b37=_0xc3ecf6;this[_0x560b37(0x150)]=$gameTemp[_0x560b37(0x10d)]||'',VisuMZ[_0x560b37(0xcd)][_0x560b37(0x149)][_0x560b37(0xfb)](this,_0xa29396),this['createCommandNameWindow'](_0xa29396);},Window_MenuCommand[_0xc3ecf6(0x1db)]['createCommandNameWindow']=function(_0x326a60){const _0x399736=_0xc3ecf6,_0x179340=new Rectangle(0x0,0x0,_0x326a60[_0x399736(0x22f)],_0x326a60[_0x399736(0xc2)]);this['_commandNameWindow']=new Window_Base(_0x179340),this['_commandNameWindow']['opacity']=0x0,this[_0x399736(0xfa)](this[_0x399736(0x167)]),this[_0x399736(0x1ee)]();},Window_MenuCommand[_0xc3ecf6(0x1db)][_0xc3ecf6(0xbb)]=function(){const _0x1160ef=_0xc3ecf6;Window_HorzCommand[_0x1160ef(0x1db)][_0x1160ef(0xbb)]['call'](this);if(this[_0x1160ef(0x167)])this[_0x1160ef(0x1ee)]();},Window_MenuCommand[_0xc3ecf6(0x1db)][_0xc3ecf6(0x1ee)]=function(){const _0x35af23=_0xc3ecf6,_0x37cb95=this[_0x35af23(0x167)];_0x37cb95['contents'][_0x35af23(0x1cd)]();const _0x4a87f1=this[_0x35af23(0x113)](this[_0x35af23(0x112)]());if(_0x4a87f1===_0x35af23(0x225)){const _0x55ca8e=this[_0x35af23(0x238)](this['index']());let _0x43ef6f=this[_0x35af23(0x1bb)](this[_0x35af23(0x112)]());_0x43ef6f=_0x43ef6f[_0x35af23(0x17a)](/\\I\[(\d+)\]/gi,''),_0x37cb95[_0x35af23(0x158)](),this[_0x35af23(0x16b)](_0x43ef6f,_0x55ca8e),this[_0x35af23(0x18c)](_0x43ef6f,_0x55ca8e),this[_0x35af23(0x1be)](_0x43ef6f,_0x55ca8e);}},Window_MenuCommand[_0xc3ecf6(0x1db)]['commandNameWindowDrawBackground']=function(_0x11000a,_0x3485f1){},Window_MenuCommand[_0xc3ecf6(0x1db)][_0xc3ecf6(0x18c)]=function(_0x5aca2d,_0x2396a1){const _0x4f6360=_0xc3ecf6,_0x220e3c=this[_0x4f6360(0x167)];_0x220e3c[_0x4f6360(0x206)](_0x5aca2d,0x0,_0x2396a1['y'],_0x220e3c[_0x4f6360(0x20c)],_0x4f6360(0x204));},Window_MenuCommand[_0xc3ecf6(0x1db)][_0xc3ecf6(0x1be)]=function(_0x50c116,_0x29a047){const _0x37dbc3=_0xc3ecf6,_0x54741a=this[_0x37dbc3(0x167)],_0x381250=$gameSystem[_0x37dbc3(0x120)](),_0x58fced=_0x29a047['x']+Math[_0x37dbc3(0xd7)](_0x29a047[_0x37dbc3(0x22f)]/0x2)+_0x381250;_0x54741a['x']=_0x54741a[_0x37dbc3(0x22f)]/-0x2+_0x58fced,_0x54741a['y']=Math['floor'](_0x29a047[_0x37dbc3(0xc2)]/0x4);},Window_MenuCommand[_0xc3ecf6(0x1db)][_0xc3ecf6(0x10f)]=function(){const _0x2d5314=_0xc3ecf6,_0x198698=SceneManager[_0x2d5314(0x22e)][_0x2d5314(0x25a)]();if(_0x198698==='mobile'){const _0x53b9a4=VisuMZ['MainMenuCore'][_0x2d5314(0xb7)][_0x2d5314(0x110)]['MobileThickness'];return this[_0x2d5314(0x1ec)]()*_0x53b9a4+0x8;}else return Window_Command['prototype'][_0x2d5314(0x10f)]['call'](this);},Window_MenuCommand[_0xc3ecf6(0x1db)][_0xc3ecf6(0x1ed)]=function(){const _0xe1ed14=_0xc3ecf6;this[_0xe1ed14(0x191)]();},Window_MenuCommand[_0xc3ecf6(0x1db)]['makeMainMenuCoreCommandList']=function(){const _0xf0c2cc=_0xc3ecf6;let _0x47d7fc=0x0;for(const _0x388228 of Window_MenuCommand[_0xf0c2cc(0x16c)]){let _0x549940=_0x388228[_0xf0c2cc(0x183)];if(this[_0xf0c2cc(0x205)](_0x549940,_0x388228)){let _0x4de6b4=_0x388228[_0xf0c2cc(0x1b4)];if(['','Untitled'][_0xf0c2cc(0x156)](_0x4de6b4))_0x4de6b4=_0x388228[_0xf0c2cc(0x11e)][_0xf0c2cc(0xfb)](this);const _0x30f537=_0x388228[_0xf0c2cc(0xde)];_0x30f537>0x0&&this['commandStyle']()!==_0xf0c2cc(0x154)&&(_0x4de6b4=_0xf0c2cc(0x1b2)['format'](_0x30f537,_0x4de6b4));const _0x33280c=this[_0xf0c2cc(0x159)](_0x549940,_0x388228),_0x1a2434=_0x388228[_0xf0c2cc(0x1c5)][_0xf0c2cc(0xfb)](this);_0x549940===_0xf0c2cc(0x178)&&(_0x47d7fc++,_0x549940+=_0x47d7fc),this[_0xf0c2cc(0x1f1)](_0x4de6b4,_0x549940,_0x33280c,_0x1a2434),this[_0xf0c2cc(0x141)](_0x549940,_0x388228[_0xf0c2cc(0x1ae)][_0xf0c2cc(0x13a)](this,_0x1a2434));}this[_0xf0c2cc(0x211)](_0x549940);}},Window_MenuCommand['prototype'][_0xc3ecf6(0x205)]=function(_0x29726c,_0x28597a,_0x12a7f8){const _0x23da68=_0xc3ecf6;if(!_0x12a7f8){if(!this[_0x23da68(0x228)](_0x29726c,_0x28597a))return![];}if($gameSystem[_0x23da68(0xdb)](_0x29726c,'forceShow'))return!![];if($gameSystem['getMainMenuSymbolState'](_0x29726c,'forceHide'))return![];return _0x28597a['ShowJS'][_0x23da68(0xfb)](this,_0x29726c,_0x28597a);},Window_MenuCommand[_0xc3ecf6(0x1db)][_0xc3ecf6(0x159)]=function(_0x36a4df,_0x2d711c){const _0x5d65c0=_0xc3ecf6;if($gameSystem[_0x5d65c0(0xdb)](_0x36a4df,_0x5d65c0(0x1b3)))return!![];if($gameSystem['getMainMenuSymbolState'](_0x36a4df,_0x5d65c0(0xd2)))return![];return _0x2d711c['EnableJS'][_0x5d65c0(0xfb)](this,_0x36a4df,_0x2d711c);},Window_MenuCommand[_0xc3ecf6(0x1db)][_0xc3ecf6(0x211)]=function(_0x174539){const _0x168236=_0xc3ecf6;switch(_0x174539){case _0x168236(0xb1):this[_0x168236(0x19d)]();break;case'formation':this[_0x168236(0x168)](),this[_0x168236(0x256)]();break;case _0x168236(0x1e2):this[_0x168236(0x1c6)]();break;case _0x168236(0x203):this[_0x168236(0x19c)]();break;case _0x168236(0x10c):this['addGameEndCommand']();break;}},Window_MenuCommand[_0xc3ecf6(0x1db)][_0xc3ecf6(0x19d)]=function(){},Window_MenuCommand[_0xc3ecf6(0x1db)][_0xc3ecf6(0x168)]=function(){},Window_MenuCommand[_0xc3ecf6(0x1db)]['addOriginalCommands']=function(){},Window_MenuCommand[_0xc3ecf6(0x1db)][_0xc3ecf6(0x1c6)]=function(){},Window_MenuCommand[_0xc3ecf6(0x1db)][_0xc3ecf6(0x19c)]=function(){},Window_MenuCommand[_0xc3ecf6(0x1db)][_0xc3ecf6(0x148)]=function(){},Window_MenuCommand[_0xc3ecf6(0x1db)][_0xc3ecf6(0x140)]=function(){const _0xfd6509=_0xc3ecf6,_0x3375eb=SceneManager[_0xfd6509(0x22e)]['commandWindowStyle']();if(['thinTop',_0xfd6509(0x144)][_0xfd6509(0x156)](_0x3375eb))return this[_0xfd6509(0x181)]?this[_0xfd6509(0x103)]():0x4;else return _0x3375eb!==_0xfd6509(0xbd)?VisuMZ[_0xfd6509(0xcd)][_0xfd6509(0xb7)]['CustomCmdWin'][_0xfd6509(0x209)]:Window_Command[_0xfd6509(0x1db)][_0xfd6509(0x140)][_0xfd6509(0xfb)](this);},Window_MenuCommand['prototype']['currentSubcategory']=function(){const _0x30bdc0=_0xc3ecf6;return this[_0x30bdc0(0x150)]||'';},Window_MenuCommand[_0xc3ecf6(0x1db)]['isIncludedInSubcategory']=function(_0x487ec0,_0xe3e144){const _0x237f9f=_0xc3ecf6,_0x46e5e9=_0xe3e144[_0x237f9f(0x116)]||'';if(!this['doesSubcategoryExist'](_0x46e5e9)&&this[_0x237f9f(0x23f)]()==='')return!![];return _0x46e5e9===this[_0x237f9f(0x23f)]();},Window_MenuCommand['prototype'][_0xc3ecf6(0x259)]=function(_0x462e30){const _0x290c37=_0xc3ecf6;return this[_0x290c37(0xb5)]()[_0x290c37(0x156)](_0x462e30);},Window_MenuCommand['prototype']['getSubcategoryList']=function(){const _0x2b1a46=_0xc3ecf6;if(Window_MenuCommand[_0x2b1a46(0x16d)]!==undefined)return Window_MenuCommand[_0x2b1a46(0x16d)];Window_MenuCommand[_0x2b1a46(0x16d)]=[];for(const _0x543c45 of Window_MenuCommand[_0x2b1a46(0x16c)]){const _0xd8a656=_0x543c45['Symbol'];if(_0xd8a656!==_0x2b1a46(0x178))continue;const _0x253788=_0x543c45[_0x2b1a46(0x1c5)][_0x2b1a46(0xfb)](this);Window_MenuCommand['SUBCATEGORY_LIST'][_0x2b1a46(0x194)](_0x253788);}return Window_MenuCommand[_0x2b1a46(0x16d)];},Window_MenuCommand[_0xc3ecf6(0x1db)]['isSubcategoryVisible']=function(_0x440ea4){const _0x59d1c8=_0xc3ecf6;if(!_0x440ea4)return!![];const _0x4415c3=_0x440ea4['ExtJS'][_0x59d1c8(0xfb)](this);for(const _0x3e2368 of Window_MenuCommand[_0x59d1c8(0x16c)]){if(_0x3e2368===_0x440ea4)continue;const _0x335cca=_0x3e2368[_0x59d1c8(0x116)]||'';if(_0x335cca!==_0x4415c3)continue;const _0x26fb69=_0x3e2368['Symbol'];if(this['isMainMenuCommandVisible'](_0x26fb69,_0x3e2368,!![]))return!![];}return![];},Window_MenuCommand['prototype'][_0xc3ecf6(0x220)]=function(_0x3060bc){const _0x11911a=_0xc3ecf6;_0x3060bc=_0x3060bc;if(this['currentSubcategory']()===_0x3060bc)return;this['_subcategory']=_0x3060bc,$gameTemp['_mainMenuSubcategory']=_0x3060bc,this[_0x11911a(0xc6)](),this[_0x11911a(0x122)](0x0),this['setTopRow'](0x0),this[_0x11911a(0xc9)]();},Window_MenuCommand[_0xc3ecf6(0x1db)][_0xc3ecf6(0x224)]=function(){const _0x5b18ff=_0xc3ecf6,_0x5c6487=this[_0x5b18ff(0x23f)]();this['_subcategory']='',$gameTemp[_0x5b18ff(0x10d)]=undefined,this[_0x5b18ff(0xc6)](),this[_0x5b18ff(0x180)](0x0);this[_0x5b18ff(0x219)]>0x1&&(this[_0x5b18ff(0x219)]=0x1,this['updateSmoothScroll']());const _0xac9f3c=Math['max'](this[_0x5b18ff(0x25b)](_0x5c6487),0x0);this['smoothSelect'](_0xac9f3c),this[_0x5b18ff(0xc9)]();},Window_MenuCommand[_0xc3ecf6(0x1db)][_0xc3ecf6(0x231)]=function(){const _0x1ca719=_0xc3ecf6;return VisuMZ[_0x1ca719(0xcd)][_0x1ca719(0xb7)][_0x1ca719(0x110)]['TextAlign'];},Window_MenuCommand[_0xc3ecf6(0x1db)][_0xc3ecf6(0x1d3)]=function(_0x5713ab){const _0x52e584=_0xc3ecf6,_0x5ed0cf=this[_0x52e584(0x113)](_0x5713ab);if(_0x5ed0cf==='iconText')this[_0x52e584(0x1fa)](_0x5713ab);else _0x5ed0cf===_0x52e584(0x225)?this['drawItemStyleIcon'](_0x5713ab):Window_Command['prototype'][_0x52e584(0x1d3)][_0x52e584(0xfb)](this,_0x5713ab);},Window_MenuCommand[_0xc3ecf6(0x1db)][_0xc3ecf6(0x175)]=function(){const _0x2e45e5=_0xc3ecf6;return VisuMZ[_0x2e45e5(0xcd)][_0x2e45e5(0xb7)]['CustomCmdWin'][_0x2e45e5(0x14c)];},Window_MenuCommand[_0xc3ecf6(0x1db)]['commandStyleCheck']=function(_0x4ec1df){const _0x1e823b=_0xc3ecf6,_0x248b65=this['commandStyle']();if(_0x248b65!==_0x1e823b(0x100))return _0x248b65;else{const _0x1bf1e6=this['commandName'](_0x4ec1df);if(_0x1bf1e6[_0x1e823b(0x14e)](/\\I\[(\d+)\]/i)){const _0x411151=this[_0x1e823b(0x238)](_0x4ec1df),_0x5a4051=this['textSizeEx'](_0x1bf1e6)[_0x1e823b(0x22f)];return _0x5a4051<=_0x411151[_0x1e823b(0x22f)]?_0x1e823b(0x105):'icon';}else return _0x1e823b(0x154);}},Window_MenuCommand['prototype'][_0xc3ecf6(0x1fa)]=function(_0x204ccc){const _0x2cc93a=_0xc3ecf6,_0x53751e=this[_0x2cc93a(0x238)](_0x204ccc),_0x42ab8a=this[_0x2cc93a(0x1bb)](_0x204ccc),_0x1230cc=this[_0x2cc93a(0x227)](_0x42ab8a)[_0x2cc93a(0x22f)];this['changePaintOpacity'](this['isCommandEnabled'](_0x204ccc));let _0x15228f=this[_0x2cc93a(0x231)]();if(_0x15228f===_0x2cc93a(0xf8))this[_0x2cc93a(0x19e)](_0x42ab8a,_0x53751e['x']+_0x53751e['width']-_0x1230cc,_0x53751e['y'],_0x1230cc);else{if(_0x15228f===_0x2cc93a(0x204)){const _0x2581f6=_0x53751e['x']+Math['floor']((_0x53751e['width']-_0x1230cc)/0x2);this[_0x2cc93a(0x19e)](_0x42ab8a,_0x2581f6,_0x53751e['y'],_0x1230cc);}else this[_0x2cc93a(0x19e)](_0x42ab8a,_0x53751e['x'],_0x53751e['y'],_0x1230cc);}},Window_MenuCommand[_0xc3ecf6(0x1db)][_0xc3ecf6(0x196)]=function(_0x3d6510){const _0x279832=_0xc3ecf6;this['commandName'](_0x3d6510)['match'](/\\I\[(\d+)\]/i);const _0x24ee2d=Number(RegExp['$1']),_0x4ccfe3=this[_0x279832(0x238)](_0x3d6510),_0x3c0ab8=_0x4ccfe3['x']+Math[_0x279832(0xd7)]((_0x4ccfe3['width']-ImageManager[_0x279832(0xec)])/0x2),_0x2dc61f=_0x4ccfe3['y']+(_0x4ccfe3['height']-ImageManager[_0x279832(0x1d7)])/0x2;this[_0x279832(0x15e)](_0x24ee2d,_0x3c0ab8,_0x2dc61f);},VisuMZ[_0xc3ecf6(0xcd)]['Window_StatusBase_loadFaceImages']=Window_StatusBase[_0xc3ecf6(0x1db)][_0xc3ecf6(0x20b)],Window_StatusBase[_0xc3ecf6(0x1db)][_0xc3ecf6(0x20b)]=function(){const _0x111772=_0xc3ecf6;VisuMZ[_0x111772(0xcd)]['Window_StatusBase_loadFaceImages'][_0x111772(0xfb)](this),this[_0x111772(0x13d)]();},Window_StatusBase[_0xc3ecf6(0x1db)][_0xc3ecf6(0x13d)]=function(){const _0x2f838f=_0xc3ecf6;for(const _0x34015d of $gameParty[_0x2f838f(0x151)]()){if(!_0x34015d)continue;_0x34015d[_0x2f838f(0xbc)]()&&ImageManager['loadCharacter'](_0x34015d['characterName']()),_0x34015d[_0x2f838f(0x1cb)]()&&ImageManager[_0x2f838f(0x11b)](_0x34015d['battlerName']()),_0x34015d[_0x2f838f(0x171)]()&&ImageManager[_0x2f838f(0x145)](_0x34015d[_0x2f838f(0x171)]());}},Window_StatusBase[_0xc3ecf6(0x1db)][_0xc3ecf6(0x170)]=function(){const _0x1b5aa0=_0xc3ecf6;return VisuMZ['MainMenuCore']['Settings'][_0x1b5aa0(0xcc)];},Window_StatusBase[_0xc3ecf6(0x1db)]['drawItemActorFace']=function(_0xcb294a,_0x45c364,_0x533e58,_0x1edf40,_0x407e82){const _0x29102b=_0xc3ecf6;_0x1edf40=_0x1edf40||ImageManager['faceWidth'],_0x407e82=_0x407e82||ImageManager[_0x29102b(0x18b)];const _0xa24fa4=ImageManager[_0x29102b(0x101)],_0x17a527=_0x407e82-0x2,_0xff7016=_0x45c364+Math[_0x29102b(0xd7)]((_0x1edf40-_0xa24fa4)/0x2);this[_0x29102b(0xe6)]===Window_MenuStatus&&this[_0x29102b(0x1ad)](_0xcb294a['isBattleMember']()),this['drawActorFace'](_0xcb294a,_0xff7016,_0x533e58,_0xa24fa4,_0x17a527),this[_0x29102b(0x1ad)](!![]);},Window_StatusBase[_0xc3ecf6(0x1db)][_0xc3ecf6(0x10b)]=function(_0x2acccc,_0x137766,_0x568d5e,_0x2bfc8f,_0x23123a){const _0x3846f8=_0xc3ecf6;_0x2bfc8f=_0x2bfc8f||ImageManager[_0x3846f8(0x101)],_0x23123a=_0x23123a||ImageManager[_0x3846f8(0x18b)];const _0x3e4e9f=_0x2acccc[_0x3846f8(0xbc)](),_0x49c77c=_0x2acccc['characterIndex'](),_0x20c53f=ImageManager[_0x3846f8(0x1f8)](_0x3e4e9f),_0x20fa4a=ImageManager['isBigCharacter'](_0x3e4e9f),_0x499d21=_0x20c53f['width']/(_0x20fa4a?0x3:0xc),_0x54dc8a=_0x20c53f[_0x3846f8(0xc2)]/(_0x20fa4a?0x4:0x8),_0x49d89b=_0x2bfc8f,_0x5ecce4=_0x23123a-0x2,_0xf4b1fe=_0x137766+Math[_0x3846f8(0xd7)](_0x49d89b/0x2),_0x4693f7=_0x568d5e+Math[_0x3846f8(0x1c7)]((_0x23123a+_0x54dc8a)/0x2);this['constructor']===Window_MenuStatus&&this['changePaintOpacity'](_0x2acccc[_0x3846f8(0x153)]());const _0x3fc627=Math[_0x3846f8(0x11c)](_0x2bfc8f,_0x499d21),_0x52013c=Math[_0x3846f8(0x11c)](_0x23123a,_0x54dc8a),_0x2f3631=Math['floor'](_0x137766+Math[_0x3846f8(0x1ea)](_0x2bfc8f-_0x499d21,0x0)/0x2),_0x558483=Math[_0x3846f8(0xd7)](_0x568d5e+Math[_0x3846f8(0x1ea)](_0x23123a-_0x54dc8a,0x0)/0x2),_0x268d32=_0x20fa4a?0x0:_0x49c77c,_0x595e3d=(_0x268d32%0x4*0x3+0x1)*_0x499d21,_0x929084=Math['floor'](_0x268d32/0x4)*0x4*_0x54dc8a;this['contents'][_0x3846f8(0x1bd)](_0x20c53f,_0x595e3d,_0x929084,_0x3fc627,_0x52013c,_0x2f3631,_0x558483),this[_0x3846f8(0x1ad)](!![]);},Window_StatusBase[_0xc3ecf6(0x1db)][_0xc3ecf6(0xd9)]=function(_0x4209a3,_0x110eeb,_0xa286d6,_0x4a45fa,_0x1cb4f6){const _0x553a88=_0xc3ecf6;_0x4a45fa=_0x4a45fa||ImageManager[_0x553a88(0x101)],_0x1cb4f6=_0x1cb4f6||ImageManager[_0x553a88(0x18b)];const _0x5a1e61=ImageManager['loadSvActor'](_0x4209a3[_0x553a88(0x1cb)]()),_0x2474cb=_0x5a1e61[_0x553a88(0x22f)]/ImageManager['svActorHorzCells'],_0x17ef8c=_0x5a1e61[_0x553a88(0xc2)]/ImageManager[_0x553a88(0x1a1)],_0x4fdf9f=_0x4a45fa,_0x3f4ed4=_0x1cb4f6-0x2,_0x36a536=_0x110eeb+Math[_0x553a88(0xd7)](_0x4fdf9f/0x2),_0x5a8602=_0xa286d6+Math[_0x553a88(0x1c7)]((_0x1cb4f6+_0x17ef8c)/0x2);this[_0x553a88(0xe6)]===Window_MenuStatus&&this[_0x553a88(0x1ad)](_0x4209a3['isBattleMember']());const _0x4c58e1=_0x4209a3[_0x553a88(0x1a0)]&&_0x4209a3[_0x553a88(0x1a0)](),_0x2efbbc=0x0,_0x37f2f1=0x0,_0x58f93b=_0x4c58e1?_0x5a1e61['width']:_0x2474cb,_0x4a4b0a=_0x4c58e1?_0x5a1e61[_0x553a88(0xc2)]:_0x17ef8c,_0x1f4af1=Math[_0x553a88(0x11c)](0x1,_0x4a45fa/_0x58f93b,_0x1cb4f6/_0x4a4b0a),_0x584716=_0x1f4af1*_0x58f93b,_0x29ad88=_0x1f4af1*_0x4a4b0a,_0x2b3bf5=Math[_0x553a88(0xd7)](_0x110eeb+Math[_0x553a88(0x1ea)](_0x4a45fa-_0x584716,0x0)/0x2),_0x3c7054=Math['floor'](_0xa286d6+Math[_0x553a88(0x1ea)](_0x1cb4f6-_0x29ad88,0x0)/0x2);this[_0x553a88(0x1e7)][_0x553a88(0x1bd)](_0x5a1e61,_0x2efbbc,_0x37f2f1,_0x58f93b,_0x4a4b0a,_0x2b3bf5,_0x3c7054,_0x584716,_0x29ad88),this[_0x553a88(0x1ad)](!![]);},Window_StatusBase[_0xc3ecf6(0x1db)][_0xc3ecf6(0xc1)]=function(_0x45015e,_0xef1d9e,_0x2ee6be,_0x1e7477,_0x36a302){const _0x4582ed=_0xc3ecf6,_0x120011=ImageManager[_0x4582ed(0x145)](_0x45015e['getMenuImage']());_0x1e7477=(_0x1e7477||ImageManager[_0x4582ed(0x101)])-0x2,_0x36a302=(_0x36a302||ImageManager[_0x4582ed(0x18b)])-0x2;const _0x1d2d36=_0x120011[_0x4582ed(0x22f)],_0x296547=_0x120011[_0x4582ed(0xc2)],_0x878799=_0x1e7477,_0x4d68ac=_0x36a302-0x2,_0x33774f=_0xef1d9e+Math['floor'](_0x878799/0x2),_0x511f3e=_0x2ee6be+Math['ceil']((_0x36a302+_0x296547)/0x2);this['constructor']===Window_MenuStatus&&this[_0x4582ed(0x1ad)](_0x45015e[_0x4582ed(0x153)]());const _0x2fe420=Math[_0x4582ed(0x11c)](_0x1e7477,_0x1d2d36),_0x6fb927=Math[_0x4582ed(0x11c)](_0x36a302,_0x296547),_0x103055=_0xef1d9e+0x1,_0xdf36b6=Math[_0x4582ed(0x1ea)](_0x2ee6be+0x1,_0x2ee6be+_0x4d68ac-_0x296547+0x3);let _0x579945=Math[_0x4582ed(0x119)]((_0x1d2d36-_0x2fe420)/0x2),_0x410707=Math[_0x4582ed(0x119)]((_0x296547-_0x6fb927)/0x2);_0x579945-=_0x45015e['getMenuImageOffsetX'](),_0x410707-=_0x45015e['getMenuImageOffsetY']();if(Imported['VisuMZ_0_CoreEngine']){if(VisuMZ['CoreEngine'][_0x4582ed(0xb7)]['QoL']['PixelateImageRendering']){}}this['contents'][_0x4582ed(0x1bd)](_0x120011,_0x579945,_0x410707,_0x2fe420,_0x6fb927,_0x103055,_0xdf36b6),this[_0x4582ed(0x1ad)](!![]);},Window_Status['prototype'][_0xc3ecf6(0x247)]=function(_0x27c824,_0x2cc5db,_0x311ba2,_0x1af78f,_0x2aad49){const _0x407b2c=_0xc3ecf6;switch(this['graphicType']()){case _0x407b2c(0x18f):break;case _0x407b2c(0x242):this[_0x407b2c(0x10b)](_0x27c824,_0x2cc5db,_0x311ba2,_0x1af78f,_0x2aad49);break;case'svbattler':this[_0x407b2c(0xd9)](_0x27c824,_0x2cc5db,_0x311ba2,_0x1af78f,_0x2aad49);break;default:Window_StatusBase[_0x407b2c(0x1db)][_0x407b2c(0x247)][_0x407b2c(0xfb)](this,_0x27c824,_0x2cc5db,_0x311ba2,_0x1af78f,_0x2aad49);break;}},VisuMZ[_0xc3ecf6(0xcd)][_0xc3ecf6(0x1b7)]=Window_MenuStatus[_0xc3ecf6(0x1db)]['selectLast'],Window_MenuStatus['prototype']['selectLast']=function(){const _0x3d6dd8=_0xc3ecf6;VisuMZ['MainMenuCore'][_0x3d6dd8(0xb7)][_0x3d6dd8(0xba)][_0x3d6dd8(0xf2)]?VisuMZ[_0x3d6dd8(0xcd)]['Window_MenuStatus_selectLast'][_0x3d6dd8(0xfb)](this):this[_0x3d6dd8(0x109)](0x0);},VisuMZ[_0xc3ecf6(0xcd)][_0xc3ecf6(0xf3)]=Window_MenuStatus[_0xc3ecf6(0x1db)][_0xc3ecf6(0x103)],Window_MenuStatus[_0xc3ecf6(0x1db)]['maxItems']=function(){const _0x137e6=_0xc3ecf6;return this[_0x137e6(0xc7)]()?$gameParty[_0x137e6(0xb4)]()['length']:VisuMZ[_0x137e6(0xcd)][_0x137e6(0xf3)][_0x137e6(0xfb)](this);},Window_MenuStatus[_0xc3ecf6(0x1db)][_0xc3ecf6(0xc7)]=function(){const _0x1a50d0=_0xc3ecf6,_0x152da1=VisuMZ[_0x1a50d0(0xcd)]['Settings']['General'];if(_0x152da1[_0x1a50d0(0x1e4)]===undefined)_0x152da1[_0x1a50d0(0x1e4)]=!![];const _0x5f6633=SceneManager[_0x1a50d0(0x22e)];if(!_0x152da1[_0x1a50d0(0x1e4)]){if(_0x152da1[_0x1a50d0(0x213)])return _0x5f6633['constructor']===Scene_Menu;return!![];}return![];},Window_MenuStatus['prototype'][_0xc3ecf6(0xd4)]=function(){const _0x279a8e=_0xc3ecf6,_0x2f7bc7=SceneManager[_0x279a8e(0x22e)][_0x279a8e(0xe6)];return _0x2f7bc7===Scene_Menu?VisuMZ[_0x279a8e(0xcd)]['Settings'][_0x279a8e(0x258)]:VisuMZ[_0x279a8e(0xcd)][_0x279a8e(0xb7)][_0x279a8e(0x257)];},Window_MenuStatus[_0xc3ecf6(0x1db)]['numVisibleRows']=function(){const _0x21539a=_0xc3ecf6,_0x159719=this[_0x21539a(0xd4)]();switch(_0x159719){case _0x21539a(0x1cc):case _0x21539a(0xb2):return 0x1;case _0x21539a(0x230):return 0x1;default:return $gameParty['maxBattleMembers']();}},Window_MenuStatus[_0xc3ecf6(0x1db)]['maxCols']=function(){const _0x4c0edd=_0xc3ecf6,_0xcf8b8d=this[_0x4c0edd(0xd4)]();switch(_0xcf8b8d){case _0x4c0edd(0x1cc):case'portrait':return $gameParty[_0x4c0edd(0x139)]();default:return 0x1;}},VisuMZ[_0xc3ecf6(0xcd)][_0xc3ecf6(0xf6)]=Window_MenuStatus[_0xc3ecf6(0x1db)][_0xc3ecf6(0x10f)],Window_MenuStatus['prototype'][_0xc3ecf6(0x10f)]=function(){const _0xcc0d00=_0xc3ecf6,_0x3ff114=this[_0xcc0d00(0xd4)]();switch(_0x3ff114){case _0xcc0d00(0x1cc):case _0xcc0d00(0xb2):case _0xcc0d00(0x230):return this[_0xcc0d00(0x198)];case'thin':return Window_Selectable[_0xcc0d00(0x1db)][_0xcc0d00(0x10f)][_0xcc0d00(0xfb)](this);case _0xcc0d00(0x187):return this[_0xcc0d00(0x1ec)]()*0x2+0x8;default:return VisuMZ[_0xcc0d00(0xcd)][_0xcc0d00(0xf6)][_0xcc0d00(0xfb)](this);}},Window_MenuStatus[_0xc3ecf6(0x1db)]['drawItem']=function(_0x3c0019){const _0x390a5d=_0xc3ecf6;this[_0x390a5d(0x137)](_0x3c0019),this['drawItemStatus'](_0x3c0019);},VisuMZ[_0xc3ecf6(0xcd)][_0xc3ecf6(0xc3)]=Window_MenuStatus[_0xc3ecf6(0x1db)][_0xc3ecf6(0x118)],Window_MenuStatus[_0xc3ecf6(0x1db)][_0xc3ecf6(0x1b5)]=function(_0xe036c5,_0x3c7372,_0xd6747e,_0x29050f,_0x49490a){const _0x34066a=_0xc3ecf6;switch(this[_0x34066a(0x170)]()){case _0x34066a(0x18f):break;case _0x34066a(0x242):this[_0x34066a(0x10b)](_0xe036c5,_0x3c7372,_0xd6747e+0x1,_0x29050f,_0x49490a-0x2);break;case _0x34066a(0x201):this[_0x34066a(0xd9)](_0xe036c5,_0x3c7372,_0xd6747e+0x1,_0x29050f,_0x49490a-0x2);break;default:this[_0x34066a(0x1c3)](_0xe036c5,_0x3c7372,_0xd6747e,_0x29050f,_0x49490a);break;}},Window_MenuStatus[_0xc3ecf6(0x1db)][_0xc3ecf6(0xd5)]=function(_0x238b21){const _0x3217f2=_0xc3ecf6;this[_0x3217f2(0x158)]();const _0x2de998=this[_0x3217f2(0x106)](_0x238b21),_0x35d9b9=this[_0x3217f2(0x234)](_0x238b21),_0x2427d9=this[_0x3217f2(0xd4)]();switch(_0x2427d9){case _0x3217f2(0x1cc):this[_0x3217f2(0x236)](_0x2de998,_0x35d9b9);break;case _0x3217f2(0xb2):this['drawItemStatusPortraitStyle'](_0x2de998,_0x35d9b9);break;case _0x3217f2(0x230):this[_0x3217f2(0xc0)](_0x2de998,_0x35d9b9);break;case _0x3217f2(0x147):this[_0x3217f2(0x143)](_0x2de998,_0x35d9b9);break;case _0x3217f2(0x187):this[_0x3217f2(0xf5)](_0x2de998,_0x35d9b9);break;default:this[_0x3217f2(0x23d)](_0x2de998,_0x35d9b9);break;}},Window_MenuStatus['prototype']['drawItemStatusVerticalStyle']=function(_0x91cf08,_0x397ac4){const _0x2a653d=_0xc3ecf6;VisuMZ[_0x2a653d(0xcd)][_0x2a653d(0xb7)]['ListStyles'][_0x2a653d(0x14b)][_0x2a653d(0xfb)](this,_0x91cf08,_0x397ac4);},Window_MenuStatus[_0xc3ecf6(0x1db)][_0xc3ecf6(0x11f)]=function(_0x3744fd,_0x1cf872){const _0x2cf849=_0xc3ecf6;if(_0x3744fd[_0x2cf849(0x171)]()!==''){const _0xd868ef=ImageManager[_0x2cf849(0x145)](_0x3744fd[_0x2cf849(0x171)]());_0xd868ef[_0x2cf849(0x14d)](this[_0x2cf849(0x23c)]['bind'](this,_0x3744fd,_0x1cf872));}else this[_0x2cf849(0x236)](_0x3744fd,_0x1cf872);},Window_MenuStatus[_0xc3ecf6(0x1db)]['drawItemStatusPortraitStyleOnLoad']=function(_0x542954,_0x5340c1){const _0x519de3=_0xc3ecf6;VisuMZ[_0x519de3(0xcd)]['Settings'][_0x519de3(0x163)][_0x519de3(0x1c1)][_0x519de3(0xfb)](this,_0x542954,_0x5340c1);},Window_MenuStatus['prototype'][_0xc3ecf6(0xc0)]=function(_0x233401,_0x102647){const _0x1b8bcd=_0xc3ecf6,_0x16190f=ImageManager[_0x1b8bcd(0x145)](_0x233401[_0x1b8bcd(0x171)]());_0x16190f['addLoadListener'](this['drawItemStatusSoloStyleOnLoad'][_0x1b8bcd(0x13a)](this,_0x233401,_0x102647));},Window_MenuStatus['prototype'][_0xc3ecf6(0x1a7)]=function(_0x2b9464,_0x57ce84){const _0x43d975=_0xc3ecf6;VisuMZ[_0x43d975(0xcd)][_0x43d975(0xb7)][_0x43d975(0x163)][_0x43d975(0x248)]['call'](this,_0x2b9464,_0x57ce84);},Window_MenuStatus[_0xc3ecf6(0x1db)][_0xc3ecf6(0x143)]=function(_0x243310,_0xe65bc3){const _0x21a5d4=_0xc3ecf6;VisuMZ[_0x21a5d4(0xcd)][_0x21a5d4(0xb7)][_0x21a5d4(0x163)][_0x21a5d4(0x11a)][_0x21a5d4(0xfb)](this,_0x243310,_0xe65bc3);},Window_MenuStatus[_0xc3ecf6(0x1db)][_0xc3ecf6(0xf5)]=function(_0x58a9ec,_0x43e370){const _0xe16660=_0xc3ecf6;VisuMZ[_0xe16660(0xcd)]['Settings']['ListStyles']['ThickerStyle'][_0xe16660(0xfb)](this,_0x58a9ec,_0x43e370);},Window_MenuStatus[_0xc3ecf6(0x1db)][_0xc3ecf6(0x115)]=function(){const _0x209175=_0xc3ecf6,_0x3f2f21=this[_0x209175(0xd4)]();if([_0x209175(0x147),'thicker'][_0x209175(0x156)](_0x3f2f21))return![];return Window_StatusBase['prototype'][_0x209175(0x115)]['call'](this);},Window_MenuStatus[_0xc3ecf6(0x1db)][_0xc3ecf6(0x23d)]=function(_0x3cfabd,_0x2fe76f){const _0x303656=_0xc3ecf6;VisuMZ[_0x303656(0xcd)]['Settings']['ListStyles'][_0x303656(0x1e3)][_0x303656(0xfb)](this,_0x3cfabd,_0x2fe76f);},Window_SkillStatus['prototype'][_0xc3ecf6(0x247)]=function(_0x245dc5,_0x32486c,_0x4a88f7,_0x461012,_0x5ade7c){const _0x1d44f3=_0xc3ecf6;switch(this[_0x1d44f3(0x170)]()){case _0x1d44f3(0x18f):break;case _0x1d44f3(0x242):this[_0x1d44f3(0x10b)](_0x245dc5,_0x32486c,_0x4a88f7,_0x461012,_0x5ade7c);break;case'svbattler':this[_0x1d44f3(0xd9)](_0x245dc5,_0x32486c,_0x4a88f7,_0x461012,_0x5ade7c);break;default:Window_StatusBase[_0x1d44f3(0x1db)]['drawActorFace'][_0x1d44f3(0xfb)](this,_0x245dc5,_0x32486c,_0x4a88f7,_0x461012,_0x5ade7c);break;}},Window_EquipStatus['prototype'][_0xc3ecf6(0x247)]=function(_0xbbbc72,_0x1fe281,_0x1041fe,_0x14d70d,_0x5cc9c8){const _0x10f251=_0xc3ecf6;switch(this['graphicType']()){case _0x10f251(0x18f):break;case _0x10f251(0x242):this[_0x10f251(0x10b)](_0xbbbc72,_0x1fe281,_0x1041fe,_0x14d70d,_0x5cc9c8);break;case'svbattler':this['drawItemActorSvBattler'](_0xbbbc72,_0x1fe281,_0x1041fe,_0x14d70d,_0x5cc9c8);break;default:Window_StatusBase[_0x10f251(0x1db)]['drawActorFace'][_0x10f251(0xfb)](this,_0xbbbc72,_0x1fe281,_0x1041fe,_0x14d70d,_0x5cc9c8);break;}};function Window_ThinGold(){const _0x311cd3=_0xc3ecf6;this[_0x311cd3(0x1c0)](...arguments);}Window_ThinGold['prototype']=Object[_0xc3ecf6(0xcb)](Window_Gold[_0xc3ecf6(0x1db)]),Window_ThinGold['prototype'][_0xc3ecf6(0xe6)]=Window_ThinGold,Window_ThinGold[_0xc3ecf6(0x1db)][_0xc3ecf6(0x10f)]=function(){const _0x5e93fa=_0xc3ecf6;return this[_0x5e93fa(0x1ec)]();},Window_ThinGold[_0xc3ecf6(0x1db)][_0xc3ecf6(0xdf)]=function(){const _0x896d94=_0xc3ecf6;return Window_Selectable['prototype'][_0x896d94(0xdf)][_0x896d94(0xfb)](this);};function Window_Playtime(){const _0x520039=_0xc3ecf6;this[_0x520039(0x1c0)](...arguments);}function _0x3498(_0x3731d5,_0x4f9fbc){const _0x1695b1=_0x1695();return _0x3498=function(_0x3498b6,_0xc3449){_0x3498b6=_0x3498b6-0xb1;let _0x40a979=_0x1695b1[_0x3498b6];return _0x40a979;},_0x3498(_0x3731d5,_0x4f9fbc);}Window_Playtime['prototype']=Object[_0xc3ecf6(0xcb)](Window_Selectable[_0xc3ecf6(0x1db)]),Window_Playtime[_0xc3ecf6(0x1db)][_0xc3ecf6(0xe6)]=Window_Playtime,Window_Playtime[_0xc3ecf6(0x1db)][_0xc3ecf6(0x1c0)]=function(_0x2b1d8b){const _0x8e52f9=_0xc3ecf6;this[_0x8e52f9(0x1d5)]=$gameSystem[_0x8e52f9(0x131)](),this[_0x8e52f9(0x229)]=0x3c,Window_Selectable[_0x8e52f9(0x1db)][_0x8e52f9(0x1c0)][_0x8e52f9(0xfb)](this,_0x2b1d8b),this[_0x8e52f9(0xc6)]();},Window_Playtime[_0xc3ecf6(0x1db)][_0xc3ecf6(0x10f)]=function(){return this['lineHeight']();},Window_Playtime[_0xc3ecf6(0x1db)][_0xc3ecf6(0x1dd)]=function(){const _0x405ff0=_0xc3ecf6;Window_Selectable[_0x405ff0(0x1db)][_0x405ff0(0x1dd)][_0x405ff0(0xfb)](this),this[_0x405ff0(0x207)]();},Window_Playtime[_0xc3ecf6(0x1db)][_0xc3ecf6(0x207)]=function(){const _0x189aa6=_0xc3ecf6;if(this['_timer']-->0x0){if(this[_0x189aa6(0x229)]<=0x0)this[_0x189aa6(0xc6)]();}},Window_Playtime[_0xc3ecf6(0x1db)][_0xc3ecf6(0xc6)]=function(){const _0x779d2e=_0xc3ecf6;this[_0x779d2e(0x229)]=0x3c;const _0x4a70de=this[_0x779d2e(0x238)](0x0),_0x193561=_0x4a70de['x'],_0x28f6ba=_0x4a70de['y'],_0xcf2255=_0x4a70de[_0x779d2e(0x22f)];this[_0x779d2e(0x1e7)]['clear'](),this[_0x779d2e(0x1d9)](_0x4a70de),this[_0x779d2e(0x1d2)](_0x4a70de),this[_0x779d2e(0x1fc)](_0x4a70de);},Window_Playtime[_0xc3ecf6(0x1db)][_0xc3ecf6(0x158)]=function(){const _0x2a54be=_0xc3ecf6;Window_Selectable['prototype'][_0x2a54be(0x158)][_0x2a54be(0xfb)](this),this['contents']['fontSize']=VisuMZ['MainMenuCore'][_0x2a54be(0xb7)][_0x2a54be(0xe8)][_0x2a54be(0xff)];},Window_Playtime[_0xc3ecf6(0x1db)][_0xc3ecf6(0x1d9)]=function(_0x530a97){const _0x458839=_0xc3ecf6;if(VisuMZ[_0x458839(0xcd)][_0x458839(0xb7)][_0x458839(0xe8)][_0x458839(0xde)]>0x0){const _0x3afffd=VisuMZ[_0x458839(0xcd)][_0x458839(0xb7)][_0x458839(0xe8)][_0x458839(0xde)],_0x139e29=_0x530a97['y']+(this['lineHeight']()-ImageManager[_0x458839(0x1d7)])/0x2;this[_0x458839(0x15e)](_0x3afffd,_0x530a97['x'],_0x139e29);const _0x25e29a=ImageManager[_0x458839(0xec)]+0x4;_0x530a97['x']+=_0x25e29a,_0x530a97['width']-=_0x25e29a;}},Window_Playtime[_0xc3ecf6(0x1db)]['drawTimeLabel']=function(_0x29703b){const _0x24144c=_0xc3ecf6;this['resetFontSettings'](),this[_0x24144c(0x126)](ColorManager[_0x24144c(0x1d4)]());const _0x182f08=VisuMZ['MainMenuCore'][_0x24144c(0xb7)]['Playtime']['Time'];this[_0x24144c(0x206)](_0x182f08,_0x29703b['x'],_0x29703b['y'],_0x29703b['width'],_0x24144c(0xb6)),this[_0x24144c(0xe9)]();},Window_Playtime['prototype'][_0xc3ecf6(0x1fc)]=function(_0x31c047){const _0x3c33f5=_0xc3ecf6,_0x43dc3a=$gameSystem[_0x3c33f5(0x131)]();this[_0x3c33f5(0x206)](_0x43dc3a,_0x31c047['x'],_0x31c047['y'],_0x31c047[_0x3c33f5(0x22f)],_0x3c33f5(0xf8));};function Window_MenuVariables(){this['initialize'](...arguments);}Window_MenuVariables['prototype']=Object[_0xc3ecf6(0xcb)](Window_Selectable[_0xc3ecf6(0x1db)]),Window_MenuVariables[_0xc3ecf6(0x1db)]['constructor']=Window_MenuVariables,Window_MenuVariables['prototype'][_0xc3ecf6(0x1c0)]=function(_0x21a09f){const _0x45f42d=_0xc3ecf6;Window_Selectable[_0x45f42d(0x1db)][_0x45f42d(0x1c0)][_0x45f42d(0xfb)](this,_0x21a09f),this[_0x45f42d(0x102)]=VisuMZ[_0x45f42d(0xcd)][_0x45f42d(0xb7)][_0x45f42d(0xfd)][_0x45f42d(0x21c)],this[_0x45f42d(0xc6)]();},Window_MenuVariables[_0xc3ecf6(0x1db)][_0xc3ecf6(0x10f)]=function(){const _0x466eea=_0xc3ecf6;return this[_0x466eea(0x1ec)]();},Window_MenuVariables[_0xc3ecf6(0x1db)]['maxCols']=function(){const _0x49a1c9=_0xc3ecf6,_0x15f94e=SceneManager[_0x49a1c9(0x22e)][_0x49a1c9(0x25a)]();return _0x15f94e==='default'?0x1:VisuMZ[_0x49a1c9(0xcd)][_0x49a1c9(0xb7)][_0x49a1c9(0xfd)][_0x49a1c9(0x21c)][_0x49a1c9(0x1fb)];},Window_MenuVariables[_0xc3ecf6(0x1db)][_0xc3ecf6(0x158)]=function(){const _0x37635a=_0xc3ecf6;Window_Selectable[_0x37635a(0x1db)][_0x37635a(0x158)][_0x37635a(0xfb)](this),this[_0x37635a(0x1e7)]['fontSize']=VisuMZ[_0x37635a(0xcd)][_0x37635a(0xb7)][_0x37635a(0xfd)][_0x37635a(0xff)],this[_0x37635a(0x126)](ColorManager[_0x37635a(0x1d4)]());},Window_MenuVariables[_0xc3ecf6(0x1db)][_0xc3ecf6(0x103)]=function(){const _0x152e2d=_0xc3ecf6;return this[_0x152e2d(0x102)]['length'];},Window_MenuVariables[_0xc3ecf6(0x1db)][_0xc3ecf6(0x1ff)]=function(){const _0x1aba08=_0xc3ecf6,_0x37a7c0=this[_0x1aba08(0xb3)]();for(let _0x544291=0x0;_0x544291<this[_0x1aba08(0x1d6)]();_0x544291++){const _0x550ba5=_0x37a7c0+_0x544291;_0x550ba5<this[_0x1aba08(0x103)]()&&(this['drawItemBackground'](_0x550ba5),this[_0x1aba08(0x1d3)](_0x550ba5));}},Window_MenuVariables[_0xc3ecf6(0x1db)][_0xc3ecf6(0xd0)]=function(_0x363cef){},Window_MenuVariables[_0xc3ecf6(0x1db)][_0xc3ecf6(0x1d3)]=function(_0x5d33c0){const _0x22e740=_0xc3ecf6,_0x1ce15c=this[_0x22e740(0x102)][_0x5d33c0];if(_0x1ce15c<=0x0)return;if(!$dataSystem[_0x22e740(0x1d0)][_0x1ce15c])return;const _0x1fe7cb=this[_0x22e740(0x238)](_0x5d33c0);this[_0x22e740(0x158)]();let _0x85920=0x0,_0x15ec77=$dataSystem[_0x22e740(0x1d0)][_0x1ce15c]['trim']();_0x15ec77[_0x22e740(0x14e)](/\\I\[(\d+)\]/i)&&(_0x85920=Number(RegExp['$1']),_0x15ec77=_0x15ec77['replace'](/\\I\[(\d+)\]/i,'')[_0x22e740(0xf9)]());if(_0x85920>0x0){const _0x2f8f03=_0x1fe7cb['y']+(this['lineHeight']()-ImageManager[_0x22e740(0x1d7)])/0x2;this['drawIcon'](_0x85920,_0x1fe7cb['x'],_0x2f8f03);const _0x4f4846=ImageManager[_0x22e740(0xec)]+0x4;_0x1fe7cb['x']+=_0x4f4846,_0x1fe7cb['width']-=_0x4f4846;}this[_0x22e740(0x206)](_0x15ec77,_0x1fe7cb['x'],_0x1fe7cb['y'],_0x1fe7cb[_0x22e740(0x22f)],_0x22e740(0xb6)),this['changeTextColor'](ColorManager['normalColor']()),this[_0x22e740(0x206)]($gameVariables[_0x22e740(0x162)](_0x1ce15c),_0x1fe7cb['x'],_0x1fe7cb['y'],_0x1fe7cb[_0x22e740(0x22f)],_0x22e740(0xf8));};