//=============================================================================
// VisuStella MZ - Extended Message Functionality
// VisuMZ_2_ExtMessageFunc.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_ExtMessageFunc = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ExtMessageFunc = VisuMZ.ExtMessageFunc || {};
VisuMZ.ExtMessageFunc.version = 1.10;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.10] [ExtMessageFunc]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Extended_Message_Functionality_VisuStella_MZ
 * @base VisuMZ_1_MessageCore
 * @orderAfter VisuMZ_1_MessageCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Extended Message Function plugin adds onto RPG Maker MZ's Message Window
 * and adds in various features you would normally see found in modern RPG's.
 * Things like automatically moving the text forward after a set amount of time
 * or fast forward are available. Saving and loading during a message is also
 * possible as well as going to the Options menu or returning back to the title
 * screen. These options are only available to the Message Window on the map
 * scene and do not work in battle.
 *
 * Features include all (but not limited to) the following:
 * 
 * * The Button Console appears on the Message Window let the player activate
 *   various commands via touch/click.
 * * Extended Fast Forward Mode is an expanded feature upon the Message Core's
 *   Fast Forward function to fast forward all events and not just messages.
 *   This can be optionally disabled.
 * * A Message Cursor will appear where the text has ended for those who want
 *   that kind of aesthetic in their game.
 * * Auto-Forward will automatically move messages onward after a certain
 *   amount of time has passed. Time required will be determined based on the
 *   length of the message in question.
 * * Saving and Loading can be done from the Message Window akin to how many
 *   visual novels work. Requires the Save Core, but you're already using that,
 *   right? Right?
 * * Also be able to jump straight into the Options scene from the Message
 *   Window to change any settings on the fly. Requires the Options Core, but
 *   you're using that, too, correct?
 * * And for those who want to jump back to the title screen, they can do so
 *   by selecting a Game End option, too.
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
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
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
 * VisuMZ_1_OptionsCore
 *
 * The Options Core is a required plugin in order to make use of the "Options"
 * (aka "Config") button found in the Button Console.
 *
 * ---
 *
 * VisuMZ_1_SaveCore
 *
 * The Options Core is a required plugin in order to make use of the "Save" and
 * "Load" buttons found in the Button Console.
 *
 * ---
 * 
 * VisuMZ_3_MessageLog
 * 
 * The Message Log plugin enables the "Log" button found in the Button Console
 * to let the player go and review the text that has been displayed in the map
 * scene. This does not include the text found in battle to avoid conflicting
 * logged messages across different situations.
 * 
 * ---
 * 
 * VisuMZ_4_MessageVisibility
 * 
 * The Message Visibility plugin enables the "Hide" button found in the
 * Button Console to make the Message Window visible or invisible.
 * 
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. 
 *
 * === Button Console-Related Text Codes ===
 * 
 * ---
 *
 * --------------------   -----------------------------------------------------
 * Text Code              Effect (Message Window Only)
 * --------------------   -----------------------------------------------------
 * 
 * <Hide Buttons>         Hides the Button Console from this current Message
 *                        Window's text assuming that nothing else is hiding
 *                        the Button Console from view.
 * 
 * ---
 * 
 * === Message Tail-Related Text Codes ===
 *
 * --------------------   -----------------------------------------------------
 * Text Code              Effect (Message Window Only)
 * --------------------   -----------------------------------------------------
 * 
 * <Tail Bottom Left: x>  Creates a message tail at x coordinate pointing to
 *                        the bottom left.
 * <Tail Bottom Right: x> Creates a message tail at x coordinate pointing to
 *                        the bottom right.
 * <Tail Upper Left: x>   Creates a message tail at x coordinate pointing to
 *                        the upper left.
 * <Tail Upper Right: x>  Creates a message tail at x coordinate pointing to
 *                        the upper right.
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
 * === Fast Forward Plugin Commands ===
 * 
 * ---
 *
 * Fast Forward: Allow/Disallow
 * - Change whether or not Fast Forward is allowed/disallowed.
 * - Must be enabled by the Plugin Parameters.
 *
 *   Allow?:
 *   - Allow or disallow the Extended Fast Forward feature?
 *   - Must be enabled by the Plugin Parameters.
 *
 * ---
 * 
 * === Message Button Console Plugin Commands ===
 * 
 * ---
 *
 * Message Button Console: Show/Hide
 * - Determine if the Message Button Console is visible or hidden.
 * - Only appears on the map. 
 * - Does not appear in battle.
 *
 *   Visible?:
 *   - Show or hide the Message Button Console feature?
 *   - Only appears on the map.
 *   - Does not appear in battle.
 *
 * ---
 * 
 * === Message Cursor Plugin Commands ===
 * 
 * ---
 *
 * Message Cursor: Change Settings
 * - Change the Message Cursor settings used.
 *
 *   Change Settings:
 *   - Change the Message Cursor settings.
 *   - Settings are the same as the ones found in the Plugin Parameters.
 *
 * ---
 * 
 * === Message Tail Plugin Commands ===
 * 
 * ---
 * 
 * Message Tail: Change Settings
 * - Change the Message Tail settings.
 * 
 *   Message Tail Settings:
 *   - Message Tail settings used for Message Windows.
 *   - Requires images and text codes to appear.
 *   - See Plugin Parameters. They have the same parameters.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Forward Settings
 * ============================================================================
 *
 * Auto-Forward settings used for this game. Auto-Forward is a feature that
 * once enabled, the game will automatically move the "Show Text" event
 * commands forward after a certain amount of time. The amount of time will be
 * determined by how many characters are displayed on the screen. There is a
 * lower boundary, where if the wait time does not meet the amount, the timer
 * will be set to the minimum wait value instead.
 *
 * ---
 *
 * Settings
 * 
 *   Wait per Character:
 *   - How many frames should the game wait per character?
 *   - Average: 60 frames per second.
 * 
 *   Minimum Wait:
 *   - What is the minimum amount of frames to wait?
 *   - Average: 60 frames per second.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Fast Forward (Extended) Settings
 * ============================================================================
 *
 * Extended Fast Forward settings used for this game. If enabled, this will
 * replace the Message Core's Fast Forward functionality. The Extended Fast
 * Forward feature will not only fast forward through messages but any running
 * events that are not found in a parallel event.
 * 
 * It can also be activated the Message Core's Fast Forward shortcut key.
 *
 * ---
 *
 * Settings
 * 
 *   Enable?:
 *   - Enable or disable the Extended Fast Forward feature?
 * 
 *   Speed:
 *   - What is the speed at which Extended Fast Forward works at?
 *   - Higher numbers are faster.
 * 
 *   Reset on Scene Change?:
 *   - Reset Fast Forward setting on scene changes (ie battle, menu, or
 *     map transfers)?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Message Button Console Settings
 * ============================================================================
 *
 * Message Button Console settings used for this game.
 * 
 * It will only appear in the Message Window on the map scene. It will NOT
 * appear in battle. The reason it won't appear in battle is because many of
 * the functions there will clash with how the battle scene behaves.
 * 
 * The Button Console will add extra padding to the Message Window and appear
 * at either the top of bottom of the Message Window (your choice). A row of
 * buttons will appear each with a different functionality.
 * 
 * These Plugin Parameters also allow you to customize the appearance of how
 * the buttons look in-game. Adjust them accordingly.
 *
 * ---
 *
 * General
 * 
 *   Show by Default?:
 *   - Show or hide the Message Button Console by default?
 * 
 *   Position:
 *   - Where do you wish to display the Message Button Console?
 *     - Top of Message Window
 *     - Bottom of Message Window
 * 
 *   Auto-Size Hide?:
 *   - Hide the button console when using auto-size text codes?
 *
 * ---
 *
 * Appearance
 * 
 *   Window Skin:
 *   - What is the window skin used for the buttons?
 *   - Ignore if using Background Images.
 * 
 *   Font Name:
 *   - What font do you wish to use for the Message Button Console?
 * 
 *     Font Size:
 *     - What font size do you wish to use for the Message Button Console?
 * 
 *   Text Colors:
 * 
 *     Normal Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     Toggled Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     Disabled Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *   Visuals:
 * 
 *     Width:
 *     - What is the width of each button?
 * 
 *     Height:
 *     - What is the height of each button?
 * 
 *     Buffer:
 *     - What is the buffer between each button?
 * 
 *   Background Images:
 * 
 *     Disabled Image:
 *     Enabled Image:
 *     Toggled Image:
 *     - Filename of the background image when the button is disabled,
 *       enabled, or toggled.
 *     - This will hide the window skin for this button.
 * 
 *     Offset X:
 *     - Offsets the X position of this image.
 *     - Negative: left; Positive: right
 * 
 *     Offset Y:
 *     - Offsets the Y position of this image.
 *     - Negative: up; Positive: down
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Button Settings
 * ============================================================================
 *
 * Settings for which buttons appear and how they appear. These settings will
 * determine which buttons appear (provided that their required plugins are
 * available), what shortcut keys are applied to them, and what kind of text
 * will be displayed to represent them.
 * 
 * In case you are wondering where the Fast Forward shortcut key is, that
 * setting is found in the Message Core.
 *
 * ---
 *
 * General
 * 
 *   List:
 *   - Which buttons appear and in what order?
 *   - Some commands require certain plugins installed.
 *
 * ---
 *
 * Shortcut Keys
 * 
 *   Auto-Forward Key:
 *   - This is the key used for auto-forwarding messages.
 * 
 *   Save Key:
 *   - This is the key used for quick saving.
 *   - Requires VisuMZ_1_SaveCore!
 * 
 *   Load Key:
 *   - This is the key used for quick load.
 *   - Requires VisuMZ_1_SaveCore!
 * 
 *   Options Key:
 *   - This is the key used for opening options.
 *   - Requires VisuMZ_1_OptionsCore!
 * 
 *   Game End Key:
 *   - This is the key used for ending the game.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Auto-Forward:
 *   - How is this option's text displayed in-game?
 * 
 *   Fast Forward:
 *   - How is this option's text displayed in-game?
 * 
 *   Save Game:
 *   - How is this option's text displayed in-game?
 *   - Requires VisuMZ_1_SaveCore!
 * 
 *   Load Game:
 *   - How is this option's text displayed in-game?
 *   - Requires VisuMZ_1_SaveCore!
 * 
 *   Options:
 *   - How is this option's text displayed in-game?
 *   - Requires VisuMZ_1_OptionsCore!
 * 
 *   Game End:
 *   - How is this option's text displayed in-game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Message Cursor Settings
 * ============================================================================
 *
 * Message Cursor settings used for this game. The cursor, if enabled, will
 * appear where the text is currently displayed at and adds a new type of
 * aesthetic to the game.
 *
 * ---
 *
 * General
 * 
 *   Enable?:
 *   - Enable or disable the message cursor?
 * 
 *   Graphic Type:
 *   - What is the cursor's graphic type?
 *     - Icon - From img/system/IconSet.png
 *     - Image - An animated image from img/system/
 *     - Window Skin - Use the default Window Skin cursor
 *
 * ---
 *
 * Icon
 * 
 *   Icon Index:
 *   - This is icon used for the Message Cursor.
 * 
 *   Flip Speed Multiplier:
 *   - What is the flip speed multiplier for the Message Cursor?
 *   - Use 0 for no flipping.
 *
 * ---
 *
 * Image
 * 
 *   Filename:
 *   - Filename of the image found inside the img/system/ folder.
 * 
 *   Image Rows:
 *   - How many rows are there for the image?
 * 
 *   Image Columns:
 *   - How many columns are there for the image?
 * 
 *   Frame Delay:
 *   - How many frames delayed are there per animated cell?
 *
 * ---
 *
 * Appearance
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Determine the Message Cursor's X/Y position.
 *   - Use a number between 0 and 1 for best results.
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset the Message Cursor's X/Y position by how many pixels?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Message Tail Settings
 * ============================================================================
 *
 * Message Tails can be made to appear from the Message Window and point
 * towards the speaker, similar to how speech bubbles in comics point towards
 * their speakers. The Message Tails do not appear on their own, and only come
 * out when using auto-position text codes (if enabled) such as <Auto Player>
 * or when text codes are used to make them appear such as <Tail Upper Left: x>
 * and <Tail Lower Right: x>.
 * 
 * These settings require custom graphics that this plugin does not come with.
 * You will need to add them on your own or else they will not appear.
 *
 * ---
 *
 * Auto-Position
 * 
 *   Enable?:
 *   - Show Message Tails with Auto-Position text codes?
 *   - Message Tails will appear when using the following text codes:
 *     - <Auto Actor: x>
 *     - <Auto Party: x>
 *     - <Auto Player>
 *     - <Auto Event: x>
 *     - <Auto Enemy: x>
 * 
 *   Face Left?:
 *   - Which direction does the Message Tail point to?
 *   - Left or right?
 * 
 *   Offset X:
 *   Offset Y:
 *   - Message Window's X offset with auto-position.
 *   - X: Negative: left. Positive: right.
 *   - Y: Negative: up. Positive: down.
 *
 * ---
 *
 * Tail Directions
 * Tail Directions > Bottom Left
 * Tail Directions > Bottom Right
 * Tail Directions > Upper Left
 * Tail Directions > Upper Right
 * 
 *   Filename:
 *   - Filename of the Message Tail graphic going towards the
 *     specified direction.
 * 
 *   Anchor X:
 *   - Anchor value X. Use a number between 0 and 1.
 *   - 0.0 - Left; 0.5 - Center; 1.0 - Right
 * 
 *   Anchor Y:
 *   - Anchor value Y. Use a number between 0 and 1.
 *   - 0.0 - Top; 0.5 - Middle; 1.0 - Bottom
 * 
 *   Offset X:
 *   - Offset the Message Tail's X position.
 *   - Negative: left. Positive: right.
 * 
 *   Offset Y:
 *   - Offset the Message Tail's Y position.
 *   - Negative: left. Positive: right.
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
 * * Arisu
 * * Olivia
 * * Yanfly
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.10: August 11, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina
 * *** Plugin Parameters > Fast Forward > Reset on Scene Change?
 * **** Reset Fast Forward setting on scene changes (ie battle, menu, or
 *      map transfers)?
 * 
 * Version 1.09: April 7, 2022
 * * Bug Fixes!
 * ** Default message cursor no longer appears in the wrong place when no
 *    message cursor skin is used for auto-sized messages. Fix by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter option added by Arisu and sponsored by Archeia:
 * *** Plugin Parameters > Message Cursor Settings > Graphics Type
 * **** New option added: Window Skin - Use the default Window Skin cursor
 * **** This is for those who wish to use the default window skin cursor
 *      instead of icons or images.
 * 
 * Version 1.08: March 17, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands, Text Codes, and Plugin Parameters added by Irina
 *    and sponsored by Archeia!
 * *** Message Tails can be made to appear from the Message Window and point
 *     towards the speaker, similar to how speech bubbles in comics point
 *     towards their speakers. The Message Tails do not appear on their own,
 *     and only come out when using auto-position text codes (if enabled) such
 *     as <Auto Player> or when text codes are used to make them appear such as
 *     <Tail Upper Left: x> and <Tail Lower Right: x>.
 * *** These settings require custom graphics that this plugin does not come
 *     with. You will need to add them on your own or else they will not
 *     appear.
 * *** Text Codes added: <Tail Bottom Left: x>, <Tail Bottom Right: x>,
 *     <Tail Upper Left: x>, <Tail Upper Right: x>
 * *** Plugin Command Added: Message Tail: Change Settings
 * *** Plugin Parameters Added: Message Tail Settings
 * 
 * Version 1.07: March 3, 2022
 * * Compatibility Update
 * ** Added better compatibility functionality with other plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Message Button Console > Auto-Size Hide?
 * **** Hide the button console when using auto-size text codes?
 * 
 * Version 1.06: November 18, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.05: November 4, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by Archeia:
 * *** Plugin Parameters > Message Button Console > Background Images
 * **** Adds a background image to this button instead of using a window skin.
 * **** This will disable the window skin.
 * **** Various images can be used for "Disabled", "Enabled", and "Toggled".
 * **** Offset X and Y positions.
 * 
 * Version 1.04: October 14, 2021
 * * Feature Update!
 * ** Added an alert requirement for those who are using very old versions of
 *    the Message Core that cannot sustain the requirements of this plugin.
 *    Added by Irina.
 * 
 * Version 1.03: September 3, 2021
 * * Bug Fixes!
 * ** Pause sprite, for the Message Window, will no longer show multiple copies
 *    if the message cursor sprite is disabled. Fix made by Irina.
 * 
 * Version 1.02: August 6, 2021
 * * Documentation Update!
 * ** Plugin URL now updated to most recent one.
 * 
 * Version 1.01: July 30, 2021
 * * Feature Update!
 * ** Added graphic pre-loading for save/load menu preparation. Added by Irina.
 * 
 * Version 1.00 Official Release Date: August 2, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExtFastFwdDisallow
 * @text Fast Forward: Allow/Disallow
 * @desc Change whether or not Fast Forward is allowed/disallowed.
 * Must be enabled by the Plugin Parameters.
 *
 * @arg Allow:eval
 * @text Allow?
 * @parent General
 * @type boolean
 * @on Allow
 * @off Disallow
 * @desc Allow or disallow the Extended Fast Forward feature?
 * Must be enabled by the Plugin Parameters.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgButtonConsole
 * @text Message Button Console: Show/Hide
 * @desc Determine if the Message Button Console is visible or hidden.
 * Only appears on the map. Does not appear in battle.
 *
 * @arg Visible:eval
 * @text Visible?
 * @parent General
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Show or hide the Message Button Console feature?
 * Only appears on the map. Does not appear in battle.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageCursorSettings
 * @text Message Cursor: Change Settings
 * @desc Change the Message Cursor settings used.
 *
 * @arg MsgCursor:struct
 * @text Change Settings
 * @type struct<MsgCursor>
 * @desc Change the Message Cursor settings.
 * @default {"General":"","Enable:eval":"true","GraphicType:str":"icon","Icon":"","IconIndex:str":"188","FlipMultiplier:str":"0.125","Image":"","Filename:str":"","Rows:num":"1","Cols:num":"1","FrameDelay:num":"4","Appearance":"","AnchorX:num":"0.5","AnchorY:num":"1","OffsetX:num":"+0","OffsetY:num":"-4"}
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command MessageTailSettings
 * @text Message Tail: Change Settings
 * @desc Change the Message Tail settings.
 *
 * @arg Settings:struct
 * @text Message Tail Settings
 * @type struct<MsgTail>
 * @desc Message Tail settings used for Message Windows.
 * Requires images and text codes to appear.
 * @default {"AutoPosition":"","autoPositionTail:eval":"true","autoPositionLeft:eval":"true","autoPositionOffsetX:num":"+0","autoPositionOffsetY:num":"+0","TailDir":"","BottomLeft":"","bottomLeftFilename:str":"","bottomLeftAnchorX:num":"0.5","bottomLeftAnchorY:num":"0.0","bottomLeftOffsetX:num":"+0","bottomLeftOffsetY:num":"+0","BottomRight":"","bottomRightFilename:str":"","bottomRightAnchorX:num":"0.5","bottomRightAnchorY:num":"0.0","bottomRightOffsetX:num":"+0","bottomRightOffsetY:num":"+0","UpperLeft":"","upperLeftFilename:str":"","upperLeftAnchorX:num":"0.5","upperLeftAnchorY:num":"1.0","upperLeftOffsetX:num":"+0","upperLeftOffsetY:num":"+0","UpperRight":"","upperRightFilename:str":"","upperRightAnchorX:num":"0.5","upperRightAnchorY:num":"1.0","upperRightOffsetX:num":"+0","upperRightOffsetY:num":"+0"}
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
 * @param ExtMessageFunc
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Auto:struct
 * @text Auto-Forward Settings
 * @type struct<Auto>
 * @desc Auto-Forward settings used for this game.
 * @default {"WaitPerChar:num":"6","MinimumWait:num":"300"}
 *
 * @param FastFwd:struct
 * @text Fast Forward (Extended)
 * @type struct<FastFwd>
 * @desc Extended Fast Forward settings used for this game.
 * @default {"Enable:eval":"true","Speed:num":"8","SceneChangeReset:eval":"true"}
 *
 * @param MsgButtonConsole:struct
 * @text Message Button Console
 * @type struct<MsgButtonConsole>
 * @desc Message Button Console settings used for this game.
 * @default {"General":"","ShowDefault:eval":"true","Position:str":"bottom","Appearance":"","WindowSkin:str":"Window","FontFace:str":"Arial","FontSize:num":"18","TextColors":"","NormalColor:str":"0","ToggledColor:str":"24","DisabledColor:str":"7","Visuals":"","ButtonWidth:num":"86","ButtonHeight:num":"36","ButtonBuffer:num":"6"}
 *
 * @param Buttons:struct
 * @text Button Settings
 * @parent MsgButtonConsole:struct
 * @type struct<Buttons>
 * @desc Settings for which buttons appear and how they appear.
 * @default {"General":"","List:arraystr":"[\"auto\",\"fastFwd\",\"log\",\"hide\",\"save\",\"load\",\"options\",\"gameEnd\"]","AutoKey:str":"none","Shortcuts":"","SaveKey:str":"none","LoadKey:str":"none","OptionsKey:str":"none","GameEndKey:str":"none","Vocab":"","Auto:str":"AUTO","FastFwd:str":"FAST","Save:str":"SAVE","Load:str":"LOAD","Options:str":"CONFIG","GameEnd:str":"TITLE"}
 *
 * @param MsgCursor:struct
 * @text Message Cursor Settings
 * @type struct<MsgCursor>
 * @desc Message Cursor settings used for this game.
 * @default {"General":"","Enable:eval":"true","GraphicType:str":"icon","Icon":"","IconIndex:str":"188","FlipMultiplier:str":"0.125","Image":"","Filename:str":"","Rows:num":"1","Cols:num":"1","FrameDelay:num":"4","Appearance":"","AnchorX:num":"0.5","AnchorY:num":"1","OffsetX:num":"+0","OffsetY:num":"-4"}
 *
 * @param MsgTail:struct
 * @text Message Tail Settings
 * @type struct<MsgTail>
 * @desc Message Tail settings used for Message Windows.
 * Requires images and text codes to appear.
 * @default {"AutoPosition":"","autoPositionTail:eval":"true","autoPositionLeft:eval":"true","autoPositionOffsetX:num":"+0","autoPositionOffsetY:num":"+0","TailDir":"","BottomLeft":"","bottomLeftFilename:str":"","bottomLeftAnchorX:num":"0.5","bottomLeftAnchorY:num":"0.0","bottomLeftOffsetX:num":"+0","bottomLeftOffsetY:num":"+0","BottomRight":"","bottomRightFilename:str":"","bottomRightAnchorX:num":"0.5","bottomRightAnchorY:num":"0.0","bottomRightOffsetX:num":"+0","bottomRightOffsetY:num":"+0","UpperLeft":"","upperLeftFilename:str":"","upperLeftAnchorX:num":"0.5","upperLeftAnchorY:num":"1.0","upperLeftOffsetX:num":"+0","upperLeftOffsetY:num":"+0","UpperRight":"","upperRightFilename:str":"","upperRightAnchorX:num":"0.5","upperRightAnchorY:num":"1.0","upperRightOffsetX:num":"+0","upperRightOffsetY:num":"+0"}
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
 * Auto-Forward Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Auto:
 *
 * @param WaitPerChar:num
 * @text Wait per Character
 * @parent General
 * @type number
 * @min 1
 * @desc How many frames should the game wait per character?
 * Average: 60 frames per second.
 * @default 6
 *
 * @param MinimumWait:num
 * @text Minimum Wait
 * @parent General
 * @type number
 * @min 1
 * @desc What is the minimum amount of frames to wait?
 * Average: 60 frames per second.
 * @default 300
 *
 */
/* ----------------------------------------------------------------------------
 * Extended Fast Forward Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~FastFwd:
 *
 * @param Enable:eval
 * @text Enable?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable or disable the Extended Fast Forward feature?
 * @default true
 *
 * @param Speed:num
 * @text Speed
 * @parent General
 * @type number
 * @min 2
 * @desc What is the speed at which Extended Fast Forward works at?
 * Higher numbers are faster.
 * @default 8
 *
 * @param SceneChangeReset:eval
 * @text Reset on Scene Change?
 * @parent General
 * @type boolean
 * @on Reset
 * @off Keep
 * @desc Reset Fast Forward setting on scene changes (ie battle, menu, or map transfers)?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Message Button Console Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MsgButtonConsole:
 *
 * @param General
 *
 * @param ShowDefault:eval
 * @text Show by Default?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show or hide the Message Button Console by default?
 * @default true
 *
 * @param Position:str
 * @text Position
 * @parent General
 * @type select
 * @option Top of Message Window
 * @value top
 * @option Bottom of Message Window
 * @value bottom
 * @desc Where do you wish to display the Message Button Console?
 * @default bottom
 *
 * @param AutoSizeHide:eval
 * @text Auto-Size Hide?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Hide the button console when using auto-size text codes?
 * @default false
 *
 * @param Appearance
 *
 * @param WindowSkin:str
 * @text Window Skin
 * @parent Appearance
 * @type file
 * @dir img/system/
 * @require 1
 * @desc What is the window skin used for the buttons?
 * Ignore if using Background Images.
 * @default Window
 *
 * @param FontFace:str
 * @text Font Name
 * @parent Appearance
 * @desc What font do you wish to use for the Message Button Console?
 * @default Arial
 *
 * @param FontSize:num
 * @text Font Size
 * @parent FontFace:str
 * @type number
 * @min 1
 * @desc What font size do you wish to use for the Message Button Console?
 * @default 18
 * 
 * @param TextColors
 * @text Text Colors
 * @parent Appearance
 *
 * @param NormalColor:str
 * @text Normal Color
 * @parent TextColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ToggledColor:str
 * @text Toggled Color
 * @parent TextColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param DisabledColor:str
 * @text Disabled Color
 * @parent TextColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param Visuals
 * @text Button Visuals
 * @parent Appearance
 *
 * @param ButtonWidth:num
 * @text Width
 * @parent Visuals
 * @type number
 * @min 1
 * @desc What is the width of each button?
 * @default 86
 *
 * @param ButtonHeight:num
 * @text Height
 * @parent Visuals
 * @type number
 * @min 1
 * @desc What is the height of each button?
 * @default 36
 *
 * @param ButtonBuffer:num
 * @text Buffer
 * @parent Visuals
 * @type number
 * @min 1
 * @desc What is the buffer between each button?
 * @default 6
 *
 * @param Images
 * @text Background Images
 * @parent Appearance
 *
 * @param ImgDisabled:str
 * @text Disabled Image
 * @parent Images
 * @type file
 * @dir img/system/
 * @require 1
 * @desc Filename of the background image when the button is disabled.
 * @default 
 *
 * @param ImgDisabledOffsetX:num
 * @text Offset X
 * @parent ImgDisabled:str
 * @desc Offsets the X position of this image.
 * Negative: left; Positive: right
 * @default +0
 *
 * @param ImgDisabledOffsetY:num
 * @text Offset Y
 * @parent ImgDisabled:str
 * @desc Offsets the Y position of this image.
 * Negative: up; Positive: down
 * @default +0
 *
 * @param ImgEnabled:str
 * @text Enabled Image
 * @parent Images
 * @type file
 * @dir img/system/
 * @require 1
 * @desc Filename of the background image when the button is enabled.
 * @default 
 *
 * @param ImgEnabledOffsetX:num
 * @text Offset X
 * @parent ImgEnabled:str
 * @desc Offsets the X position of this image.
 * Negative: left; Positive: right
 * @default +0
 *
 * @param ImgEnabledOffsetY:num
 * @text Offset Y
 * @parent ImgEnabled:str
 * @desc Offsets the Y position of this image.
 * Negative: up; Positive: down
 * @default +0
 *
 * @param ImgToggled:str
 * @text Toggled Image
 * @parent Images
 * @type file
 * @dir img/system/
 * @require 1
 * @desc Filename of the background image when the button is toggled.
 * @default 
 *
 * @param ImgToggledOffsetX:num
 * @text Offset X
 * @parent ImgToggled:str
 * @desc Offsets the X position of this image.
 * Negative: left; Positive: right
 * @default +0
 *
 * @param ImgToggledOffsetY:num
 * @text Offset Y
 * @parent ImgToggled:str
 * @desc Offsets the Y position of this image.
 * Negative: up; Positive: down
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * Buttons Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buttons:
 *
 * @param General
 *
 * @param List:arraystr
 * @text List
 * @parent General
 * @type combo[]
 * @option auto
 * @option log
 * @option fastFwd
 * @option gameEnd
 * @option hide
 * @option load
 * @option options
 * @option save
 * @desc Which buttons appear and in what order?
 * Some commands require certain plugins installed.
 * @default ["auto","fastFwd","log","hide","save","load","options","gameEnd"]
 * 
 * @param Shortcuts
 * @text Shortcut Keys
 *
 * @param AutoKey:str
 * @text Auto-Forward Key
 * @parent General
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for auto-forwarding messages.
 * @default none
 * 
 * @param SaveKey:str
 * @text Save Key
 * @parent Shortcuts
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for quick saving.
 * Requires VisuMZ_1_SaveCore!
 * @default none
 * 
 * @param LoadKey:str
 * @text Load Key
 * @parent Shortcuts
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for quick load.
 * Requires VisuMZ_1_SaveCore!
 * @default none
 * 
 * @param OptionsKey:str
 * @text Options Key
 * @parent Shortcuts
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for opening options.
 * Requires VisuMZ_1_OptionsCore!
 * @default none
 * 
 * @param GameEndKey:str
 * @text Game End Key
 * @parent Shortcuts
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for ending the game.
 * @default none
 *
 * @param Vocab
 * @text Vocabulary
 *
 * @param Auto:str
 * @text Auto-Forward
 * @parent Vocab
 * @desc How is this option's text displayed in-game?
 * @default AUTO
 *
 * @param FastFwd:str
 * @text Fast Forward
 * @parent Vocab
 * @desc How is this option's text displayed in-game?
 * @default FAST
 *
 * @param Save:str
 * @text Save Game
 * @parent Vocab
 * @desc How is this option's text displayed in-game?
 * Requires VisuMZ_1_SaveCore!
 * @default SAVE
 *
 * @param Load:str
 * @text Load Game
 * @parent Vocab
 * @desc How is this option's text displayed in-game?
 * Requires VisuMZ_1_SaveCore!
 * @default LOAD
 *
 * @param Options:str
 * @text Options
 * @parent Vocab
 * @desc How is this option's text displayed in-game?
 * Requires VisuMZ_1_OptionsCore!
 * @default CONFIG
 *
 * @param GameEnd:str
 * @text Game End
 * @parent Vocab
 * @desc How is this option's text displayed in-game?
 * @default TITLE
 *
 */
/* ----------------------------------------------------------------------------
 * Message Cursor Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MsgCursor:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable or disable the message cursor?
 * @default true
 *
 * @param GraphicType:str
 * @text Graphic Type
 * @parent General
 * @type select
 * @option Icon - From img/system/IconSet.png
 * @value icon
 * @option Image - An animated image from img/system/
 * @value image
 * @option Window Skin - Use the default Window Skin cursor
 * @value windowskin
 * @desc What is the cursor's graphic type?
 * @default icon
 * 
 * @param Icon
 *
 * @param IconIndex:str
 * @text Icon Index
 * @parent Icon
 * @desc This is icon used for the Message Cursor.
 * @default 188
 *
 * @param FlipMultiplier:str
 * @text Flip Speed Multiplier
 * @parent Icon
 * @desc What is the flip speed multiplier for the Message Cursor?
 * Use 0 for no flipping.
 * @default 1
 * 
 * @param Image
 *
 * @param Filename:str
 * @text Filename
 * @parent Image
 * @type file
 * @dir img/system/
 * @require 1
 * @desc Filename of the image found inside the img/system/ folder.
 * @default 
 *
 * @param Rows:num
 * @text Image Rows
 * @parent Image
 * @type number
 * @min 1
 * @desc How many rows are there for the image?
 * @default 1
 *
 * @param Cols:num
 * @text Image Columns
 * @parent Image
 * @type number
 * @min 1
 * @desc How many columns are there for the image?
 * @default 1
 *
 * @param FrameDelay:num
 * @text Frame Delay
 * @parent Image
 * @type number
 * @min 1
 * @desc How many frames delayed are there per animated cell?
 * @default 4
 * 
 * @param Appearance
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent Appearance
 * @desc Determine the Message Cursor's X position.
 * Use a number between 0 and 1 for best results.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent Appearance
 * @desc Determine the Message Cursor's Y position.
 * Use a number between 0 and 1 for best results.
 * @default 1
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent Appearance
 * @desc Offset the Message Cursor's X position by how many pixels?
 * @default +0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent Appearance
 * @desc Offset the Message Cursor's Y position by how many pixels?
 * @default -8
 *
 */
/* ----------------------------------------------------------------------------
 * Message Tail Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MsgTail:
 *
 * @param AutoPosition
 * @text Auto-Position
 *
 * @param autoPositionTail:eval
 * @text Enable?
 * @parent AutoPosition
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Show Message Tails with Auto-Position text codes?
 * @default true
 *
 * @param autoPositionLeft:eval
 * @text Face Left?
 * @parent AutoPosition
 * @type boolean
 * @on Face Left
 * @off Face Right
 * @desc Which direction does the Message Tail point to?
 * @default true
 *
 * @param autoPositionOffsetX:num
 * @text Offset X
 * @parent AutoPosition
 * @desc Message Window's X offset with auto-position.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param autoPositionOffsetY:num
 * @text Offset Y
 * @parent AutoPosition
 * @desc Message Window's Y offset with auto-position.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @param TailDir
 * @text Tail Directions
 *
 * @param BottomLeft
 * @text Bottom Left
 * @parent TailDir
 *
 * @param bottomLeftFilename:str
 * @text Filename
 * @parent BottomLeft
 * @type file
 * @dir img/system/
 * @require 1
 * @desc Filename of the Message Tail graphic going towards
 * the bottom left.
 * @default 
 *
 * @param bottomLeftAnchorX:num
 * @text Anchor X
 * @parent BottomLeft
 * @desc Anchor value X. Use a number between 0 and 1.
 * 0.0 - Left; 0.5 - Center; 1.0 - Right
 * @default 0.5
 *
 * @param bottomLeftAnchorY:num
 * @text Anchor Y
 * @parent BottomLeft
 * @desc Anchor value Y. Use a number between 0 and 1.
 * 0.0 - Top; 0.5 - Middle; 1.0 - Bottom
 * @default 0.0
 *
 * @param bottomLeftOffsetX:num
 * @text Offset X
 * @parent BottomLeft
 * @desc Offset the Message Tail's X position.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param bottomLeftOffsetY:num
 * @text Offset Y
 * @parent BottomLeft
 * @desc Offset the Message Tail's Y position.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param BottomRight
 * @text Bottom Right
 * @parent TailDir
 *
 * @param bottomRightFilename:str
 * @text Filename
 * @parent BottomRight
 * @type file
 * @dir img/system/
 * @require 1
 * @desc Filename of the Message Tail graphic going towards
 * the bottom right.
 * @default 
 *
 * @param bottomRightAnchorX:num
 * @text Anchor X
 * @parent BottomRight
 * @desc Anchor value X. Use a number between 0 and 1.
 * 0.0 - Left; 0.5 - Center; 1.0 - Right
 * @default 0.5
 *
 * @param bottomRightAnchorY:num
 * @text Anchor Y
 * @parent BottomRight
 * @desc Anchor value Y. Use a number between 0 and 1.
 * 0.0 - Top; 0.5 - Middle; 1.0 - Bottom
 * @default 0.0
 *
 * @param bottomRightOffsetX:num
 * @text Offset X
 * @parent BottomRight
 * @desc Offset the Message Tail's X position.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param bottomRightOffsetY:num
 * @text Offset Y
 * @parent BottomRight
 * @desc Offset the Message Tail's Y position.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param UpperLeft
 * @text Upper Left
 * @parent TailDir
 *
 * @param upperLeftFilename:str
 * @text Filename
 * @parent UpperLeft
 * @type file
 * @dir img/system/
 * @require 1
 * @desc Filename of the Message Tail graphic going towards
 * the upper left.
 * @default 
 *
 * @param upperLeftAnchorX:num
 * @text Anchor X
 * @parent UpperLeft
 * @desc Anchor value X. Use a number between 0 and 1.
 * 0.0 - Left; 0.5 - Center; 1.0 - Right
 * @default 0.5
 *
 * @param upperLeftAnchorY:num
 * @text Anchor Y
 * @parent UpperLeft
 * @desc Anchor value Y. Use a number between 0 and 1.
 * 0.0 - Top; 0.5 - Middle; 1.0 - Bottom
 * @default 1.0
 *
 * @param upperLeftOffsetX:num
 * @text Offset X
 * @parent UpperLeft
 * @desc Offset the Message Tail's X position.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param upperLeftOffsetY:num
 * @text Offset Y
 * @parent UpperLeft
 * @desc Offset the Message Tail's Y position.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param UpperRight
 * @text Upper Right
 * @parent TailDir
 *
 * @param upperRightFilename:str
 * @text Filename
 * @parent UpperRight
 * @type file
 * @dir img/system/
 * @require 1
 * @desc Filename of the Message Tail graphic going towards
 * the upper right.
 * @default 
 *
 * @param upperRightAnchorX:num
 * @text Anchor X
 * @parent UpperRight
 * @desc Anchor value X. Use a number between 0 and 1.
 * 0.0 - Left; 0.5 - Center; 1.0 - Right
 * @default 0.5
 *
 * @param upperRightAnchorY:num
 * @text Anchor Y
 * @parent UpperRight
 * @desc Anchor value Y. Use a number between 0 and 1.
 * 0.0 - Top; 0.5 - Middle; 1.0 - Bottom
 * @default 1.0
 *
 * @param upperRightOffsetX:num
 * @text Offset X
 * @parent UpperRight
 * @desc Offset the Message Tail's X position.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param upperRightOffsetY:num
 * @text Offset Y
 * @parent UpperRight
 * @desc Offset the Message Tail's Y position.
 * Negative: left. Positive: right.
 * @default +0
 *
 */
//=============================================================================

const _0x2e78ed=_0x399d;(function(_0x58385b,_0x5420b9){const _0x565b1d=_0x399d,_0x317c76=_0x58385b();while(!![]){try{const _0x973bba=-parseInt(_0x565b1d(0x232))/0x1+-parseInt(_0x565b1d(0x296))/0x2+-parseInt(_0x565b1d(0x335))/0x3+-parseInt(_0x565b1d(0x251))/0x4+-parseInt(_0x565b1d(0x278))/0x5+parseInt(_0x565b1d(0x1aa))/0x6*(-parseInt(_0x565b1d(0x308))/0x7)+-parseInt(_0x565b1d(0x239))/0x8*(-parseInt(_0x565b1d(0x1cf))/0x9);if(_0x973bba===_0x5420b9)break;else _0x317c76['push'](_0x317c76['shift']());}catch(_0x330e81){_0x317c76['push'](_0x317c76['shift']());}}}(_0x1109,0x2e457));var label='ExtMessageFunc',tier=tier||0x0,dependencies=[_0x2e78ed(0x324)],pluginData=$plugins[_0x2e78ed(0x20d)](function(_0x15ac58){const _0x37aa58=_0x2e78ed;return _0x15ac58[_0x37aa58(0x28c)]&&_0x15ac58[_0x37aa58(0x204)][_0x37aa58(0x347)]('['+label+']');})[0x0];VisuMZ[label][_0x2e78ed(0x26c)]=VisuMZ[label][_0x2e78ed(0x26c)]||{},VisuMZ[_0x2e78ed(0x2f2)]=function(_0x5b8db6,_0x32e332){const _0x5e722f=_0x2e78ed;for(const _0x2f3867 in _0x32e332){if(_0x5e722f(0x26d)!=='cjCyg')this['initMessageCursorSettings']();else{if(_0x2f3867[_0x5e722f(0x2a6)](/(.*):(.*)/i)){if('VFPUr'!==_0x5e722f(0x2ff)){let _0x22ab2a=!_0x44c175['isExtendedFastForwardMode']();_0x31759f[_0x5e722f(0x351)](_0x22ab2a),_0x22ab2a?this['playOkSound']():_0x345690[_0x5e722f(0x266)](),this[_0x5e722f(0x2a3)]();}else{const _0x49916b=String(RegExp['$1']),_0x233220=String(RegExp['$2'])['toUpperCase']()[_0x5e722f(0x29e)]();let _0x48e8c2,_0x27cc0d,_0x2de1ad;switch(_0x233220){case'NUM':_0x48e8c2=_0x32e332[_0x2f3867]!==''?Number(_0x32e332[_0x2f3867]):0x0;break;case _0x5e722f(0x2ee):_0x27cc0d=_0x32e332[_0x2f3867]!==''?JSON[_0x5e722f(0x1ab)](_0x32e332[_0x2f3867]):[],_0x48e8c2=_0x27cc0d['map'](_0x30b5f9=>Number(_0x30b5f9));break;case _0x5e722f(0x242):_0x48e8c2=_0x32e332[_0x2f3867]!==''?eval(_0x32e332[_0x2f3867]):null;break;case _0x5e722f(0x215):_0x27cc0d=_0x32e332[_0x2f3867]!==''?JSON['parse'](_0x32e332[_0x2f3867]):[],_0x48e8c2=_0x27cc0d[_0x5e722f(0x2d5)](_0x2aefbd=>eval(_0x2aefbd));break;case'JSON':_0x48e8c2=_0x32e332[_0x2f3867]!==''?JSON[_0x5e722f(0x1ab)](_0x32e332[_0x2f3867]):'';break;case'ARRAYJSON':_0x27cc0d=_0x32e332[_0x2f3867]!==''?JSON[_0x5e722f(0x1ab)](_0x32e332[_0x2f3867]):[],_0x48e8c2=_0x27cc0d[_0x5e722f(0x2d5)](_0x53e132=>JSON['parse'](_0x53e132));break;case'FUNC':_0x48e8c2=_0x32e332[_0x2f3867]!==''?new Function(JSON[_0x5e722f(0x1ab)](_0x32e332[_0x2f3867])):new Function(_0x5e722f(0x1ce));break;case _0x5e722f(0x32b):_0x27cc0d=_0x32e332[_0x2f3867]!==''?JSON['parse'](_0x32e332[_0x2f3867]):[],_0x48e8c2=_0x27cc0d[_0x5e722f(0x2d5)](_0x4e214b=>new Function(JSON[_0x5e722f(0x1ab)](_0x4e214b)));break;case _0x5e722f(0x33f):_0x48e8c2=_0x32e332[_0x2f3867]!==''?String(_0x32e332[_0x2f3867]):'';break;case _0x5e722f(0x2d1):_0x27cc0d=_0x32e332[_0x2f3867]!==''?JSON['parse'](_0x32e332[_0x2f3867]):[],_0x48e8c2=_0x27cc0d[_0x5e722f(0x2d5)](_0x4725d0=>String(_0x4725d0));break;case'STRUCT':_0x2de1ad=_0x32e332[_0x2f3867]!==''?JSON[_0x5e722f(0x1ab)](_0x32e332[_0x2f3867]):{},_0x48e8c2=VisuMZ['ConvertParams']({},_0x2de1ad);break;case'ARRAYSTRUCT':_0x27cc0d=_0x32e332[_0x2f3867]!==''?JSON['parse'](_0x32e332[_0x2f3867]):[],_0x48e8c2=_0x27cc0d[_0x5e722f(0x2d5)](_0x39cfe2=>VisuMZ[_0x5e722f(0x2f2)]({},JSON[_0x5e722f(0x1ab)](_0x39cfe2)));break;default:continue;}_0x5b8db6[_0x49916b]=_0x48e8c2;}}}}return _0x5b8db6;},(_0x31095c=>{const _0x18fe66=_0x2e78ed,_0x169e3d=_0x31095c[_0x18fe66(0x220)];for(const _0x3c7d90 of dependencies){if(_0x18fe66(0x23a)!==_0x18fe66(0x286)){if(!Imported[_0x3c7d90]){if(_0x18fe66(0x219)!==_0x18fe66(0x2c0)){alert(_0x18fe66(0x20c)[_0x18fe66(0x33e)](_0x169e3d,_0x3c7d90)),SceneManager['exit']();break;}else _0x4a01fd[_0x18fe66(0x2cd)]();}}else _0x5686fa[_0x18fe66(0x1c5)][_0x18fe66(0x289)]['call'](this),this[_0x18fe66(0x357)](),this[_0x18fe66(0x363)](),this['updateBackImageSpriteVisibility']();}const _0x15e3fa=_0x31095c[_0x18fe66(0x204)];if(_0x15e3fa[_0x18fe66(0x2a6)](/\[Version[ ](.*?)\]/i)){const _0x5e13f2=Number(RegExp['$1']);_0x5e13f2!==VisuMZ[label]['version']&&(_0x18fe66(0x288)!=='OaKpW'?_0x28d818[_0x18fe66(0x2b9)]()&&_0x534a64[_0x18fe66(0x295)]()?(this[_0x18fe66(0x231)](),_0x1fdaa5[_0x18fe66(0x317)](_0x34823f)):this[_0x18fe66(0x23e)]():(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x169e3d,_0x5e13f2)),SceneManager[_0x18fe66(0x226)]()));}if(_0x15e3fa[_0x18fe66(0x2a6)](/\[Tier[ ](\d+)\]/i)){const _0x1ad181=Number(RegExp['$1']);_0x1ad181<tier?(alert(_0x18fe66(0x1c1)[_0x18fe66(0x33e)](_0x169e3d,_0x1ad181,tier)),SceneManager[_0x18fe66(0x226)]()):_0x18fe66(0x241)!==_0x18fe66(0x250)?tier=Math[_0x18fe66(0x20f)](_0x1ad181,tier):(_0x182499[_0x18fe66(0x1b8)][_0x18fe66(0x32a)][_0x18fe66(0x2b3)](this,_0x2f4c10),this[_0x18fe66(0x1c9)]());}VisuMZ['ConvertParams'](VisuMZ[label][_0x18fe66(0x26c)],_0x31095c['parameters']);})(pluginData),PluginManager['registerCommand'](pluginData['name'],'ExtFastFwdDisallow',_0x4629f5=>{const _0x3dd98c=_0x2e78ed;VisuMZ['ConvertParams'](_0x4629f5,_0x4629f5);const _0xb2f06f=!_0x4629f5[_0x3dd98c(0x1eb)];$gameSystem[_0x3dd98c(0x1bf)](_0xb2f06f);}),PluginManager[_0x2e78ed(0x2f1)](pluginData[_0x2e78ed(0x220)],_0x2e78ed(0x309),_0xe20ee=>{const _0x2a9cba=_0x2e78ed;VisuMZ[_0x2a9cba(0x2f2)](_0xe20ee,_0xe20ee);const _0x38ef79=_0xe20ee[_0x2a9cba(0x2ea)];$gameSystem[_0x2a9cba(0x2da)](_0x38ef79);}),PluginManager['registerCommand'](pluginData[_0x2e78ed(0x220)],'MessageCursorSettings',_0x524764=>{const _0x2f426a=_0x2e78ed;VisuMZ['ConvertParams'](_0x524764,_0x524764);const _0x42bbc7=_0x524764[_0x2f426a(0x211)];$gameSystem[_0x2f426a(0x25e)](_0x42bbc7);const _0x111154=SceneManager[_0x2f426a(0x2a9)][_0x2f426a(0x263)];_0x111154&&(_0x111154[_0x2f426a(0x2e4)](),_0x111154[_0x2f426a(0x27b)]());}),PluginManager[_0x2e78ed(0x2f1)](pluginData[_0x2e78ed(0x220)],_0x2e78ed(0x30d),_0x4294cf=>{const _0x3e2a4b=_0x2e78ed;VisuMZ[_0x3e2a4b(0x2f2)](_0x4294cf,_0x4294cf),$gameSystem[_0x3e2a4b(0x25f)](_0x4294cf[_0x3e2a4b(0x26c)]);}),TextManager[_0x2e78ed(0x2d8)]=function(_0x123ec1){const _0x3f1b01=_0x2e78ed;if(Window_ButtonConsole[_0x3f1b01(0x253)][_0x123ec1])return'mmMZe'===_0x3f1b01(0x1e2)?Window_ButtonConsole[_0x3f1b01(0x253)][_0x123ec1]:(this['setupMessageTailSettings'](![],![],_0x102794),'');return _0x123ec1['toUpperCase']()['trim']();},ColorManager[_0x2e78ed(0x2e0)]=function(_0x538179){const _0x244467=_0x2e78ed;_0x538179=String(_0x538179);if(_0x538179[_0x244467(0x2a6)](/#(.*)/i))return _0x244467(0x2c5)==='luDRB'?'#%1'[_0x244467(0x33e)](String(RegExp['$1'])):(this[_0x244467(0x294)]('options'),![]);else{if(_0x244467(0x359)!=='NJdpJ'){if(!_0x4e7466[_0x244467(0x338)])return![];if(_0x225d45[_0x244467(0x209)]())return![];if(this[_0x244467(0x23f)]())return![];return this['isActivatedExtendedFastForwardMode']();}else return this['textColor'](Number(_0x538179));}},SceneManager['isSceneBattle']=function(){const _0x25b5cf=_0x2e78ed;return this[_0x25b5cf(0x2a9)]&&this[_0x25b5cf(0x2a9)]['constructor']===Scene_Battle;},SceneManager['isSceneMap']=function(){const _0x4889b3=_0x2e78ed;return this[_0x4889b3(0x2a9)]&&this[_0x4889b3(0x2a9)][_0x4889b3(0x2f4)]===Scene_Map;},VisuMZ['ExtMessageFunc'][_0x2e78ed(0x2a4)]=SceneManager[_0x2e78ed(0x317)],SceneManager[_0x2e78ed(0x317)]=function(_0x5b8fa9){const _0x5d3bc5=_0x2e78ed;VisuMZ[_0x5d3bc5(0x1b8)][_0x5d3bc5(0x2a4)]['call'](this,_0x5b8fa9),[Scene_SaveButtonConsole,Scene_Save,Scene_Load][_0x5d3bc5(0x347)](_0x5b8fa9)&&(_0x5d3bc5(0x2b0)===_0x5d3bc5(0x2ce)?this['initialize'](...arguments):this[_0x5d3bc5(0x254)]());},SceneManager[_0x2e78ed(0x254)]=function(){const _0x401ba9=_0x2e78ed;for(const _0x2fc48d of $gameParty[_0x401ba9(0x218)]()){if(_0x401ba9(0x352)!==_0x401ba9(0x24e))_0x2fc48d['faceName']()&&ImageManager[_0x401ba9(0x2c1)](_0x2fc48d['faceName']()),_0x2fc48d['characterName']()&&ImageManager['loadCharacter'](_0x2fc48d['characterName']()),_0x2fc48d['battlerName']()&&ImageManager[_0x401ba9(0x245)](_0x2fc48d['battlerName']());else return this[_0x401ba9(0x332)];}},Game_Temp[_0x2e78ed(0x1c5)]['isMessageAutoForwardMode']=function(){const _0x5f1406=_0x2e78ed;return this[_0x5f1406(0x332)];},Game_Temp[_0x2e78ed(0x1c5)][_0x2e78ed(0x2f3)]=function(_0x51a702){this['_messageAutoForwardMode']=_0x51a702,$gameMessage['refreshButtonConsole']();},Game_Temp[_0x2e78ed(0x1c5)][_0x2e78ed(0x1db)]=function(){const _0x4cbe9f=_0x2e78ed;return this[_0x4cbe9f(0x24b)];},Game_Temp[_0x2e78ed(0x1c5)][_0x2e78ed(0x351)]=function(_0x36567b){const _0x40380f=_0x2e78ed;this[_0x40380f(0x24b)]=_0x36567b,$gameMessage[_0x40380f(0x2f5)]();},VisuMZ['ExtMessageFunc'][_0x2e78ed(0x1ca)]=Game_Temp['prototype']['requestAnimation'],Game_Temp[_0x2e78ed(0x1c5)]['requestAnimation']=function(_0x478759,_0x52fcd3,_0x72fd9d){const _0xad324=_0x2e78ed;if(this[_0xad324(0x329)]())return;VisuMZ[_0xad324(0x1b8)]['Game_Temp_requestAnimation'][_0xad324(0x2b3)](this,_0x478759,_0x52fcd3,_0x72fd9d);},Game_Temp[_0x2e78ed(0x1c5)][_0x2e78ed(0x329)]=function(){const _0x5d8f60=_0x2e78ed,_0x2cd99e=SceneManager[_0x5d8f60(0x2a9)];return _0x2cd99e&&_0x2cd99e[_0x5d8f60(0x1db)]&&_0x2cd99e['isExtendedFastForwardMode']();},VisuMZ[_0x2e78ed(0x1b8)][_0x2e78ed(0x24f)]=Game_System[_0x2e78ed(0x1c5)]['initialize'],Game_System['prototype'][_0x2e78ed(0x2d4)]=function(){const _0x405427=_0x2e78ed;VisuMZ[_0x405427(0x1b8)][_0x405427(0x24f)][_0x405427(0x2b3)](this),this[_0x405427(0x2f7)](),this[_0x405427(0x282)](),this[_0x405427(0x2e7)]();},Game_System[_0x2e78ed(0x1c5)][_0x2e78ed(0x2f7)]=function(){const _0x50b726=_0x2e78ed;this[_0x50b726(0x2c6)]=Window_ButtonConsole[_0x50b726(0x361)];},Game_System[_0x2e78ed(0x1c5)]['isMessageButtonConsoleVisible']=function(){const _0xac8b93=_0x2e78ed;if(this[_0xac8b93(0x2c6)]===undefined){if(_0xac8b93(0x1ef)!==_0xac8b93(0x28f))this[_0xac8b93(0x2f7)]();else{let _0x1f8702=_0x44e60f[_0xac8b93(0x1b8)][_0xac8b93(0x35d)][_0xac8b93(0x2b3)](this);const _0x49f8e2=_0x9517fb[_0xac8b93(0x26f)]();return _0x49f8e2&&_0x49f8e2[_0xac8b93(0x342)]&&(_0x1f8702+=_0x49f8e2[_0xac8b93(0x302)]),_0x1f8702;}}return this['_messageButtonConsoleVisible'];},Game_System['prototype']['setMessageButtonConsoleVisible']=function(_0x145a95){const _0x530e43=_0x2e78ed;this[_0x530e43(0x2c6)]===undefined&&this[_0x530e43(0x2f7)](),this[_0x530e43(0x2c6)]=_0x145a95;},Game_System[_0x2e78ed(0x1c5)][_0x2e78ed(0x282)]=function(){this['_disallowFastForward']=![];},Game_System['prototype'][_0x2e78ed(0x209)]=function(){const _0x3fbd49=_0x2e78ed;if(this[_0x3fbd49(0x2d6)]===undefined){if(_0x3fbd49(0x1f8)!==_0x3fbd49(0x1f8))return this['toggleAutoForward'](),![];else this[_0x3fbd49(0x282)]();}return this['_disallowFastForward'];},Game_System['prototype'][_0x2e78ed(0x1bf)]=function(_0x14e1fe){const _0x4818ee=_0x2e78ed;this[_0x4818ee(0x2d6)]===undefined&&(_0x4818ee(0x364)===_0x4818ee(0x27c)?(this['_messageButtonConsoleVisible']===_0x5ecff9&&this[_0x4818ee(0x2f7)](),this[_0x4818ee(0x2c6)]=_0x4d522a):this['initExtendedFastForward']()),this[_0x4818ee(0x2d6)]=_0x14e1fe;},Game_System[_0x2e78ed(0x1c5)][_0x2e78ed(0x2e7)]=function(){const _0x55bbac=_0x2e78ed;this[_0x55bbac(0x2a1)]=JsonEx[_0x55bbac(0x1f4)](VisuMZ[_0x55bbac(0x1b8)][_0x55bbac(0x26c)]['MsgCursor']);},Game_System[_0x2e78ed(0x1c5)][_0x2e78ed(0x316)]=function(){const _0x5b2a5d=_0x2e78ed;if(this[_0x5b2a5d(0x2a1)]===undefined){if(_0x5b2a5d(0x252)==='GcKWh')this['initMessageCursorSettings']();else{this[_0x5b2a5d(0x2a8)]=[];for(const _0xcaf6ce of _0x1af98c[_0x5b2a5d(0x261)]){this[_0x5b2a5d(0x1e6)](_0xcaf6ce);}this[_0x5b2a5d(0x305)]();}}return this[_0x5b2a5d(0x2a1)];},Game_System[_0x2e78ed(0x1c5)][_0x2e78ed(0x25e)]=function(_0x11ea78){const _0x71f6d9=_0x2e78ed;if(this['_msgCursorSettings']===undefined){if('kvBMM'===_0x71f6d9(0x292))return!![];else this[_0x71f6d9(0x2e7)]();}this[_0x71f6d9(0x2a1)]=JsonEx[_0x71f6d9(0x1f4)](_0x11ea78);},Game_System[_0x2e78ed(0x1c5)][_0x2e78ed(0x26f)]=function(){const _0x2635c4=_0x2e78ed;if(this[_0x2635c4(0x29b)]===undefined){const _0x141177=VisuMZ[_0x2635c4(0x1b8)][_0x2635c4(0x26c)][_0x2635c4(0x2b5)];this['_messageTailSettings']=JsonEx[_0x2635c4(0x1f4)](_0x141177);}return this[_0x2635c4(0x29b)];},Game_System[_0x2e78ed(0x1c5)]['setMessageTailSettings']=function(_0x3b189c){const _0x4394ca=_0x2e78ed;this[_0x4394ca(0x29b)]=JsonEx[_0x4394ca(0x1f4)](_0x3b189c);},Game_Message['prototype']['refreshButtonConsole']=function(){const _0x1b6f53=_0x2e78ed,_0x259f08=SceneManager[_0x1b6f53(0x2a9)];if(!_0x259f08)return;const _0x5be7e4=_0x259f08[_0x1b6f53(0x263)];if(!_0x5be7e4)return;_0x5be7e4[_0x1b6f53(0x2f5)]();},VisuMZ['ExtMessageFunc'][_0x2e78ed(0x313)]=Scene_Boot['prototype']['loadSystemImages'],Scene_Boot['prototype'][_0x2e78ed(0x23c)]=function(){const _0x57e142=_0x2e78ed;VisuMZ[_0x57e142(0x1b8)][_0x57e142(0x313)][_0x57e142(0x2b3)](this),this[_0x57e142(0x259)]();},Scene_Boot[_0x2e78ed(0x1c5)][_0x2e78ed(0x259)]=function(){const _0x28b10b=_0x2e78ed,_0x525c92=VisuMZ[_0x28b10b(0x1b8)][_0x28b10b(0x26c)][_0x28b10b(0x309)],_0x4e76be=[_0x28b10b(0x2be),_0x28b10b(0x30f),_0x28b10b(0x310)];for(const _0x347c20 of _0x4e76be){_0x525c92[_0x347c20]=_0x525c92[_0x347c20]??'';if(_0x525c92[_0x347c20]!==''){if(_0x28b10b(0x1ba)!==_0x28b10b(0x1ba))return _0x26a181[_0x28b10b(0x1e9)];else ImageManager[_0x28b10b(0x1bb)](_0x525c92[_0x347c20]);}}},Scene_Message[_0x2e78ed(0x338)]=VisuMZ[_0x2e78ed(0x1b8)]['Settings'][_0x2e78ed(0x290)][_0x2e78ed(0x22f)],Scene_Message[_0x2e78ed(0x1f3)]=VisuMZ['ExtMessageFunc'][_0x2e78ed(0x26c)]['FastFwd']['Speed'],Scene_Message[_0x2e78ed(0x2eb)]=VisuMZ[_0x2e78ed(0x1b8)][_0x2e78ed(0x26c)][_0x2e78ed(0x290)][_0x2e78ed(0x2e2)]??!![],VisuMZ['ExtMessageFunc'][_0x2e78ed(0x29f)]=Scene_Message['prototype'][_0x2e78ed(0x30c)],Scene_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x30c)]=function(){const _0x54a8b2=_0x2e78ed;VisuMZ[_0x54a8b2(0x1b8)][_0x54a8b2(0x29f)][_0x54a8b2(0x2b3)](this),Scene_Message['EXT_FAST_FORWARD_STOP_ON_SCENE_CHANGE']&&(_0x54a8b2(0x267)!==_0x54a8b2(0x267)?_0x2a53bb['playCancel']():$gameTemp[_0x54a8b2(0x351)](![]));},Scene_Message[_0x2e78ed(0x1c5)]['isExtendedFastForwardMode']=function(){const _0x41734c=_0x2e78ed;if(!Scene_Message[_0x41734c(0x338)])return![];if($gameSystem['isExtendedFastForwardDisallowed']())return![];if(this[_0x41734c(0x23f)]())return![];return this[_0x41734c(0x27f)]();},Scene_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x27f)]=function(){const _0x3ff162=_0x2e78ed;if(Imported[_0x3ff162(0x2fe)]&&$gameMap[_0x3ff162(0x2d3)]()){if(_0x3ff162(0x28b)==='ZwwMa')return![];else this[_0x3ff162(0x2b8)]()?this[_0x3ff162(0x2c3)]():_0x20791e[_0x3ff162(0x1c5)][_0x3ff162(0x2e4)][_0x3ff162(0x2b3)](this);}if(!this[_0x3ff162(0x23f)]()){if(Input['isPressed'](VisuMZ[_0x3ff162(0x344)]['Settings']['General'][_0x3ff162(0x1bc)])){if('TteqW'!==_0x3ff162(0x1c3))this[_0x3ff162(0x23e)]();else return!![];}}return $gameTemp['isExtendedFastForwardMode']();},Scene_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x23f)]=function(){const _0x1dd37b=_0x2e78ed;if(this[_0x1dd37b(0x35b)]&&this['_choiceListWindow']['active'])return!![];if(this[_0x1dd37b(0x1fd)]&&this[_0x1dd37b(0x1fd)][_0x1dd37b(0x34c)])return!![];if(this[_0x1dd37b(0x265)]&&this[_0x1dd37b(0x265)]['active'])return!![];return![];},Scene_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x1f0)]=function(){const _0x5a2233=_0x2e78ed;if(Input['isTriggered']('escape')||TouchInput[_0x5a2233(0x1e3)]()){if('fXxxF'==='fXxxF')return $gameTemp[_0x5a2233(0x351)](![]),!![];else this[_0x5a2233(0x2ed)]-=_0x1ca562*_0x2f7bc4[_0x5a2233(0x325)];}else return![];},VisuMZ[_0x2e78ed(0x1b8)][_0x2e78ed(0x1af)]=Scene_Map[_0x2e78ed(0x1c5)][_0x2e78ed(0x29d)],Scene_Map[_0x2e78ed(0x1c5)][_0x2e78ed(0x29d)]=function(){const _0xd9958d=_0x2e78ed;this['isExtendedFastForwardMode']()?this[_0xd9958d(0x31e)]():VisuMZ[_0xd9958d(0x1b8)][_0xd9958d(0x1af)]['call'](this);},Scene_Map['prototype'][_0x2e78ed(0x1db)]=function(){const _0x17d186=_0x2e78ed;return Scene_Message[_0x17d186(0x1c5)][_0x17d186(0x1db)][_0x17d186(0x2b3)](this)&&$gameMap[_0x17d186(0x203)]();},Scene_Map[_0x2e78ed(0x1c5)][_0x2e78ed(0x31e)]=function(){const _0x60ba87=_0x2e78ed;let _0x312c14=Scene_Message[_0x60ba87(0x1f3)];while(_0x312c14--&&$gameMap['isEventRunning']()&&!this[_0x60ba87(0x23f)]()){this[_0x60ba87(0x32d)](),this[_0x60ba87(0x34d)](),this[_0x60ba87(0x34f)](),SceneManager[_0x60ba87(0x1da)]();if(this[_0x60ba87(0x1f0)]())break;}};function _0x399d(_0x3ebcef,_0x27a48f){const _0x1109d4=_0x1109();return _0x399d=function(_0x399ddf,_0x278e9e){_0x399ddf=_0x399ddf-0x1a6;let _0x14885d=_0x1109d4[_0x399ddf];return _0x14885d;},_0x399d(_0x3ebcef,_0x27a48f);}function Scene_SaveButtonConsole(){this['initialize'](...arguments);}Scene_SaveButtonConsole['prototype']=Object[_0x2e78ed(0x269)](Scene_Save[_0x2e78ed(0x1c5)]),Scene_SaveButtonConsole[_0x2e78ed(0x1c5)]['constructor']=Scene_SaveButtonConsole,Scene_SaveButtonConsole['prototype']['onSavefileOk']=function(){const _0x582567=_0x2e78ed;this[_0x582567(0x306)]=0x0;let _0x3726c5=$gameMap[_0x582567(0x2ae)];for(;;){if(_0x3726c5[_0x582567(0x210)])_0x3726c5=_0x3726c5[_0x582567(0x210)];else{this[_0x582567(0x306)]=_0x3726c5[_0x582567(0x1f1)],_0x3726c5[_0x582567(0x1f1)]=_0x3726c5[_0x582567(0x2ec)];break;}}Scene_Save[_0x582567(0x1c5)][_0x582567(0x243)][_0x582567(0x2b3)](this),_0x3726c5[_0x582567(0x1f1)]=this[_0x582567(0x306)];},VisuMZ[_0x2e78ed(0x1b8)][_0x2e78ed(0x2bc)]=Game_Interpreter[_0x2e78ed(0x1c5)]['command101'],Game_Interpreter[_0x2e78ed(0x1c5)][_0x2e78ed(0x1b9)]=function(_0x3dc9b9){const _0xb28d6e=_0x2e78ed;return this[_0xb28d6e(0x2ec)]=this[_0xb28d6e(0x1f1)],VisuMZ[_0xb28d6e(0x1b8)]['Game_Interpreter_command101'][_0xb28d6e(0x2b3)](this,_0x3dc9b9);},VisuMZ['ExtMessageFunc'][_0x2e78ed(0x30b)]=Scene_Battle[_0x2e78ed(0x1c5)][_0x2e78ed(0x289)],Scene_Battle[_0x2e78ed(0x1c5)][_0x2e78ed(0x289)]=function(){const _0x267705=_0x2e78ed;VisuMZ[_0x267705(0x1b8)]['Scene_Battle_update']['call'](this);if(this[_0x267705(0x1db)]())this[_0x267705(0x31e)]();},Scene_Battle['prototype'][_0x2e78ed(0x1db)]=function(){const _0x3ac0e7=_0x2e78ed;return![];return Scene_Message[_0x3ac0e7(0x1c5)][_0x3ac0e7(0x1db)]['call'](this)&&$gameTroop[_0x3ac0e7(0x203)]()&&!this[_0x3ac0e7(0x298)];},Scene_Battle[_0x2e78ed(0x1c5)]['updateExtendedFastForwardMode']=function(){const _0x26a239=_0x2e78ed;this[_0x26a239(0x298)]=!![];let _0x1d7b0f=Scene_Message['EXT_FAST_FORWARD_LOOPS'];while(_0x1d7b0f--&&$gameTroop['isEventRunning']()&&!this[_0x26a239(0x23f)]()){if('luOVE'==='luOVE'){this[_0x26a239(0x289)](),SceneManager[_0x26a239(0x1da)]();if(this[_0x26a239(0x1f0)]())break;}else{const _0x2f93dd=_0x51861e['ExtMessageFunc'][_0x26a239(0x26c)]['MsgTail'];this[_0x26a239(0x29b)]=_0x4013f4[_0x26a239(0x1f4)](_0x2f93dd);}}this[_0x26a239(0x298)]=![];},VisuMZ[_0x2e78ed(0x1b8)]['WindowLayer_update']=WindowLayer['prototype'][_0x2e78ed(0x289)],WindowLayer[_0x2e78ed(0x1c5)][_0x2e78ed(0x289)]=function(){const _0x58c610=_0x2e78ed;if(SceneManager[_0x58c610(0x2a9)]['_extFastForwardLooping'])return;VisuMZ[_0x58c610(0x1b8)][_0x58c610(0x33b)]['call'](this);},VisuMZ[_0x2e78ed(0x1b8)][_0x2e78ed(0x326)]=Window_Base[_0x2e78ed(0x1c5)][_0x2e78ed(0x32f)],Window_Base[_0x2e78ed(0x1c5)][_0x2e78ed(0x32f)]=function(_0x11daf2){const _0x35febd=_0x2e78ed;if(this[_0x35febd(0x2f4)][_0x35febd(0x220)]===_0x35febd(0x304)){if(_0x35febd(0x20b)!==_0x35febd(0x1f6))this[_0x35febd(0x31a)](_0x11daf2);else{_0x917948[_0x35febd(0x323)]===_0x431983&&this[_0x35febd(0x1f5)]();if(!_0x4187b0[_0x35febd(0x323)])return;this[_0x35febd(0x2dd)]=0x0;const _0x271599=_0x31d60d[_0x35febd(0x1b8)][_0x35febd(0x26c)][_0x35febd(0x309)],_0x4e8e24=[_0x35febd(0x2be),_0x35febd(0x30f),'ImgToggled'];this['_buttonConsoleSprites']={};for(const _0x20208a of _0x4e8e24){if(_0x271599[_0x20208a]!==''){const _0x28d5c3=_0x321f5b[_0x35febd(0x1bb)](_0x271599[_0x20208a]);this['_buttonConsoleSprites'][_0x20208a]=new _0x559cec(_0x28d5c3);const _0xb4e07b=this['_buttonConsoleSprites'][_0x20208a];this[_0x35febd(0x2ca)](_0xb4e07b),_0xb4e07b['x']=_0x271599[_0x35febd(0x1c6)['format'](_0x20208a)]||0x0,_0xb4e07b['y']=_0x271599['%1OffsetY'['format'](_0x20208a)]||0x0;}}this[_0x35febd(0x257)]();}}VisuMZ[_0x35febd(0x1b8)][_0x35febd(0x326)]['call'](this,_0x11daf2);if(this[_0x35febd(0x2f4)][_0x35febd(0x220)]===_0x35febd(0x304)){if(_0x35febd(0x2df)===_0x35febd(0x2df))this[_0x35febd(0x1de)](_0x11daf2);else return _0x943afc['TEXT_COLOR_DISABLED'];}},VisuMZ[_0x2e78ed(0x1b8)][_0x2e78ed(0x32a)]=Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x2d4)],Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x2d4)]=function(_0x19238b){const _0x407e20=_0x2e78ed;VisuMZ[_0x407e20(0x1b8)][_0x407e20(0x32a)]['call'](this,_0x19238b),this[_0x407e20(0x1c9)]();},VisuMZ['ExtMessageFunc']['Window_Message_update']=Window_Message['prototype']['update'],Window_Message['prototype']['update']=function(){const _0x2c44d9=_0x2e78ed;VisuMZ[_0x2c44d9(0x1b8)]['Window_Message_update'][_0x2c44d9(0x2b3)](this),this[_0x2c44d9(0x1c2)](),this[_0x2c44d9(0x213)]();},Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x1c2)]=function(){const _0x193591=_0x2e78ed;if(!this[_0x193591(0x314)]())return;$gameTemp[_0x193591(0x270)]()&&$gameTemp[_0x193591(0x2f3)](![]);if($gameTemp[_0x193591(0x1db)]()){if('kluPu'===_0x193591(0x29c))return!![];else $gameTemp[_0x193591(0x351)](![]);}},Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x314)]=function(){const _0x3d7557=_0x2e78ed;if(SceneManager['isSceneMap']()&&$gameMap&&!$gameMap[_0x3d7557(0x203)]())return!![];else{if(SceneManager[_0x3d7557(0x34b)]()&&!$gameMap[_0x3d7557(0x203)]())return!![];}return![];},VisuMZ['ExtMessageFunc'][_0x2e78ed(0x30a)]=Window_Message['prototype'][_0x2e78ed(0x21f)],Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x21f)]=function(){const _0x1db4a2=_0x2e78ed;if(SceneManager['_scene'][_0x1db4a2(0x1db)]())return _0x1db4a2(0x31c)===_0x1db4a2(0x31c)?!![]:(this[_0x1db4a2(0x2e3)](!![],!![],_0x5c4811),'');else{if(Input['isTriggered'](Window_ButtonConsole[_0x1db4a2(0x2b7)][_0x1db4a2(0x2f9)]))return this['toggleAutoForward'](),![];else{if(Input[_0x1db4a2(0x21f)](Window_ButtonConsole['SHORTCUT_KEY'][_0x1db4a2(0x345)])){if(_0x1db4a2(0x1ae)===_0x1db4a2(0x1ae))return this['processButtonShortcut'](_0x1db4a2(0x345)),![];else{const _0x6a9d68=0x90,_0x3a2ad3=0x60,_0x4b3d2d=0x18;_0x10deae[_0x1db4a2(0x2b6)]=this[_0x1db4a2(0x291)],_0x5849c1[_0x1db4a2(0x244)](_0x6a9d68,_0x3a2ad3,_0x4b3d2d,_0x4b3d2d);}}else{if(Input['isTriggered'](Window_ButtonConsole[_0x1db4a2(0x2b7)][_0x1db4a2(0x2e8)])){if(_0x1db4a2(0x268)!==_0x1db4a2(0x30e))return this['processButtonShortcut']('load'),![];else _0x5f0c54[_0x1db4a2(0x266)]();}else{if(Input[_0x1db4a2(0x21f)](Window_ButtonConsole[_0x1db4a2(0x2b7)][_0x1db4a2(0x1d0)])){if('KgqRm'===_0x1db4a2(0x2ab))_0x5659de['ExtMessageFunc'][_0x1db4a2(0x1d8)][_0x1db4a2(0x2b3)](this),this[_0x1db4a2(0x2fa)]=this[_0x1db4a2(0x2fa)]||0x0,this[_0x1db4a2(0x2fa)]=_0x480484[_0x1db4a2(0x20f)](this['_autoForwardCount'],_0x15d1af['AUTO_FORWARD_MIN_DELAY']);else return this[_0x1db4a2(0x294)]('options'),![];}else{if(Input['isTriggered'](Window_ButtonConsole[_0x1db4a2(0x2b7)]['gameend'])){if(_0x1db4a2(0x1ac)===_0x1db4a2(0x27e))_0x2c3014[_0x1db4a2(0x2b6)]=_0x35c330['loadSystem'](_0x1db4a2(0x2e1));else return this['processButtonShortcut'](_0x1db4a2(0x1e4)),![];}else{if(this[_0x1db4a2(0x1dc)]&&$gameTemp[_0x1db4a2(0x270)]()){if(_0x1db4a2(0x206)===_0x1db4a2(0x214))this[_0x1db4a2(0x2dc)]=0x0;else return this['autoForwardTriggered']();}else{if(_0x1db4a2(0x21a)===_0x1db4a2(0x2c8))_0xbb8243['y']=_0x45abdf;else return VisuMZ['ExtMessageFunc'][_0x1db4a2(0x30a)][_0x1db4a2(0x2b3)](this);}}}}}}}},VisuMZ[_0x2e78ed(0x1b8)][_0x2e78ed(0x2aa)]=Window_Message['prototype'][_0x2e78ed(0x202)],Window_Message['prototype'][_0x2e78ed(0x202)]=function(_0x3bc300){const _0x57454d=_0x2e78ed;this['prepareHideButtonConsoleTextCode'](_0x3bc300),this[_0x57454d(0x28d)](),this[_0x57454d(0x2cb)](_0x3bc300),VisuMZ[_0x57454d(0x1b8)][_0x57454d(0x2aa)][_0x57454d(0x2b3)](this,_0x3bc300),this[_0x57454d(0x2fa)]=0x0;},Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x312)]=function(){const _0x326679=_0x2e78ed,_0xbd8c90=$gameMessage[_0x326679(0x1be)](),_0x178166=$gameMessage[_0x326679(0x262)](),_0x3bcb35=$gameMessage[_0x326679(0x1a8)]();let _0x411b51=ImageManager[_0x326679(0x258)],_0x507872=this['innerHeight'],_0xf6f12c=_0x3bcb35?this['innerWidth']-_0x411b51-0x4:0x4,_0x19a932=0x0;_0x507872-=this[_0x326679(0x273)](),this['drawFace'](_0xbd8c90,_0x178166,_0xf6f12c,_0x19a932,_0x411b51,_0x507872);},Window_Message['AUTO_FORWARD_DELAY_PER_CHAR']=VisuMZ[_0x2e78ed(0x1b8)][_0x2e78ed(0x26c)][_0x2e78ed(0x216)][_0x2e78ed(0x24a)],Window_Message[_0x2e78ed(0x272)]=VisuMZ['ExtMessageFunc'][_0x2e78ed(0x26c)][_0x2e78ed(0x216)][_0x2e78ed(0x1d4)],Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x31a)]=function(_0x2eef03){const _0x332722=_0x2e78ed;this['_autoForwardCount']=this[_0x332722(0x2fa)]||0x0,this[_0x332722(0x2fa)]=Math['max'](this['_autoForwardCount'],0x0);const _0xa05ad2=(_0x2eef03[_0x332722(0x2bf)]||'')[_0x332722(0x2c7)];this[_0x332722(0x2fa)]+=_0xa05ad2*Window_Message[_0x332722(0x1ed)];},Window_Message[_0x2e78ed(0x1c5)]['toggleAutoForward']=function(){const _0xc0c1e5=_0x2e78ed;if(this[_0xc0c1e5(0x33a)])return;if(!$gameSystem[_0xc0c1e5(0x285)]())return;let _0x44554f=!$gameTemp['isMessageAutoForwardMode']();$gameTemp[_0xc0c1e5(0x2f3)](_0x44554f);if(_0x44554f){if('nUBEU'==='PCkSz'){if(_0x3cb9e2[_0xc0c1e5(0x2fe)]&&_0x2ed5c8[_0xc0c1e5(0x2d3)]())return![];if(!this[_0xc0c1e5(0x23f)]()){if(_0x3a564f[_0xc0c1e5(0x2bb)](_0x153ec1['MessageCore']['Settings'][_0xc0c1e5(0x2e6)][_0xc0c1e5(0x1bc)]))return!![];}return _0x4f5f0b[_0xc0c1e5(0x1db)]();}else this[_0xc0c1e5(0x231)]();}else SoundManager['playCancel']();},Window_Message['prototype'][_0x2e78ed(0x29a)]=function(){const _0x346a1f=_0x2e78ed;this[_0x346a1f(0x2fa)]=this[_0x346a1f(0x2fa)]||0x0;if(VisuMZ[_0x346a1f(0x1b8)]['Window_Message_isTriggered']['call'](this))return SoundManager[_0x346a1f(0x266)](),$gameTemp[_0x346a1f(0x2f3)](![]),!![];else{if(_0x346a1f(0x21b)===_0x346a1f(0x21b))return this[_0x346a1f(0x2fa)]--<=0x0;else this['_messageTailSettings']=_0x3dfdbb[_0x346a1f(0x1f4)](_0x1d9239);}},VisuMZ[_0x2e78ed(0x1b8)][_0x2e78ed(0x1d8)]=Window_Message['prototype']['startPause'],Window_Message[_0x2e78ed(0x1c5)]['startPause']=function(){const _0x31138c=_0x2e78ed;VisuMZ['ExtMessageFunc']['Window_Message_startPause'][_0x31138c(0x2b3)](this),this[_0x31138c(0x2fa)]=this[_0x31138c(0x2fa)]||0x0,this[_0x31138c(0x2fa)]=Math[_0x31138c(0x20f)](this['_autoForwardCount'],Window_Message[_0x31138c(0x272)]);},VisuMZ['ExtMessageFunc'][_0x2e78ed(0x307)]=Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x235)],Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x235)]=function(){const _0x2a4eb9=_0x2e78ed;VisuMZ['ExtMessageFunc'][_0x2a4eb9(0x307)][_0x2a4eb9(0x2b3)](this),this[_0x2a4eb9(0x1f7)]();},Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x1a7)]=function(_0x46fd3d){const _0x38c75c=_0x2e78ed;let _0x43d55e=_0x46fd3d[_0x38c75c(0x249)];this['_hideButtonConsole']=![],_0x43d55e=_0x43d55e[_0x38c75c(0x227)](/<HIDE (?:BUTTON CONSOLE|CONSOLE|BUTTONS)>/gi,()=>{const _0x1fda8c=_0x38c75c;return _0x1fda8c(0x34e)===_0x1fda8c(0x34e)?(this[_0x1fda8c(0x33a)]=!![],''):!![];}),this[_0x38c75c(0x274)](_0x43d55e)&&(_0x38c75c(0x234)!=='IqCZm'?this[_0x38c75c(0x33a)]=!![]:this['isCustomMessageCursorEnabled']()?this['updateCustomMessageCursorPauseSignSprites']():_0x4ad095[_0x38c75c(0x1c5)][_0x38c75c(0x2b1)]['call'](this)),_0x46fd3d[_0x38c75c(0x249)]=_0x43d55e;};if(!Window_Message[_0x2e78ed(0x1c5)]['addedHeight']){let text='';text+='VisuMZ_1_MessageCore\x20is\x20out\x20of\x20date.\x0a',text+=_0x2e78ed(0x2cc),text+=_0x2e78ed(0x2fc),alert(text),SceneManager[_0x2e78ed(0x226)]();}Window_Message['prototype'][_0x2e78ed(0x274)]=function(_0x21f464){const _0x24335b=_0x2e78ed;if(!VisuMZ['ExtMessageFunc']['Settings']['MsgButtonConsole']['AutoSizeHide'])return![];if(_0x21f464[_0x24335b(0x2a6)](Window_Message[_0x24335b(0x283)]))return!![];if(_0x21f464[_0x24335b(0x2a6)](Window_Message['_autoPosRegExp']))return!![];return![];},VisuMZ[_0x2e78ed(0x1b8)][_0x2e78ed(0x1ad)]=Window_Message['prototype'][_0x2e78ed(0x273)],Window_Message['prototype'][_0x2e78ed(0x273)]=function(){const _0x3ebded=_0x2e78ed;let _0x380667=VisuMZ['ExtMessageFunc']['Window_Message_addedHeight'][_0x3ebded(0x2b3)](this);if(this[_0x3ebded(0x33a)])return _0x380667;if(SceneManager[_0x3ebded(0x295)]()&&$gameSystem[_0x3ebded(0x285)]()){if(_0x3ebded(0x2f6)!==_0x3ebded(0x1bd))[_0x3ebded(0x25c),'bottom'][_0x3ebded(0x347)](Window_ButtonConsole[_0x3ebded(0x2d2)][_0x3ebded(0x31b)]()['trim']())&&(_0x3ebded(0x223)==='hnUqr'?_0x5e5c1d[_0x3ebded(0x1c5)][_0x3ebded(0x2b1)][_0x3ebded(0x2b3)](this):_0x380667+=Window_ButtonConsole['BUTTON_HEIGHT']);else return this[_0x3ebded(0x2c6)]===_0x5132bb&&this[_0x3ebded(0x2f7)](),this['_messageButtonConsoleVisible'];}return _0x380667;},VisuMZ['ExtMessageFunc'][_0x2e78ed(0x1b1)]=Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x349)],Window_Message['prototype'][_0x2e78ed(0x349)]=function(){const _0xefa630=_0x2e78ed;VisuMZ['ExtMessageFunc'][_0xefa630(0x1b1)][_0xefa630(0x2b3)](this),this['showButtonConsole'](),this[_0xefa630(0x2f5)]();},Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x355)]=function(){const _0x470ed4=_0x2e78ed;if(!SceneManager[_0x470ed4(0x295)]())return;for(const _0x5646c8 of this['_buttonConsoleButtons']){if(_0x470ed4(0x341)===_0x470ed4(0x27d))return _0x470ed4(0x281)[_0x470ed4(0x33e)](_0x37d67a(_0x42000f['$1']));else!this[_0x470ed4(0x33a)]&&$gameSystem[_0x470ed4(0x285)]()?'ODoOV'===_0x470ed4(0x1d1)?(_0x4ac3bc[_0x470ed4(0x1b8)][_0x470ed4(0x307)][_0x470ed4(0x2b3)](this),this[_0x470ed4(0x1f7)]()):_0x5646c8[_0x470ed4(0x2cd)]():_0x5646c8['hide']();}this['alignButtonConsoleButtons']();},Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x2f5)]=function(){const _0x1e02f1=_0x2e78ed;for(const _0x336cbe of this[_0x1e02f1(0x2a8)]){_0x1e02f1(0x32e)==='ObhRz'?_0x336cbe[_0x1e02f1(0x2a3)]():this[_0x1e02f1(0x23e)]();}},Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x1f7)]=function(){const _0x278edc=_0x2e78ed;this['_buttonConsoleButtons']=[];for(const _0x299554 of Window_ButtonConsole[_0x278edc(0x261)]){_0x278edc(0x360)===_0x278edc(0x1d6)?_0x352103[_0x278edc(0x1f9)]():this[_0x278edc(0x1e6)](_0x299554);}this[_0x278edc(0x305)]();},Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x1e6)]=function(_0x537555){const _0x10962d=_0x2e78ed;_0x537555=_0x537555[_0x10962d(0x31b)]()[_0x10962d(0x29e)]();switch(_0x537555){case _0x10962d(0x1b0):if(!Scene_Message['EXT_FAST_FORWARD_ENABLED'])return;break;case _0x10962d(0x1d0):if(!Imported[_0x10962d(0x26e)])return;break;case _0x10962d(0x345):case _0x10962d(0x2e8):if(!Imported[_0x10962d(0x255)])return;break;case _0x10962d(0x1f9):if(!Imported[_0x10962d(0x205)])return;break;case _0x10962d(0x1e1):case _0x10962d(0x1dd):if(!Imported[_0x10962d(0x26a)])return;break;}const _0xed8976=new Window_ButtonConsole(_0x537555,this);this['_buttonConsoleButtons'][_0x10962d(0x317)](_0xed8976),this[_0x10962d(0x35a)](_0xed8976);},Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x305)]=function(){const _0x478b6d=_0x2e78ed,_0x2e8988=Window_ButtonConsole[_0x478b6d(0x2d2)][_0x478b6d(0x31b)]()[_0x478b6d(0x29e)](),_0x440307=this[_0x478b6d(0x2a8)];this['_contentsSprite']['x']=this['_contentsSprite']['y']=0x0;if(['top',_0x478b6d(0x337)][_0x478b6d(0x347)](_0x2e8988)){let _0x3ef51d=_0x440307[_0x478b6d(0x2c7)]*Window_ButtonConsole[_0x478b6d(0x2b2)];_0x3ef51d+=(_0x440307[_0x478b6d(0x2c7)]-0x1)*Window_ButtonConsole[_0x478b6d(0x23b)];let _0x5153b3=Math[_0x478b6d(0x35f)]((this[_0x478b6d(0x340)]-_0x3ef51d)/0x2),_0xadd205=_0x5153b3;for(const _0x438144 of _0x440307){_0x438144['x']=_0xadd205,_0xadd205+=Window_ButtonConsole['BUTTON_WIDTH']+Window_ButtonConsole[_0x478b6d(0x23b)];}}if(_0x2e8988===_0x478b6d(0x25c)){if('SjIUV'===_0x478b6d(0x275)){let _0x165d07=Window_ButtonConsole[_0x478b6d(0x23b)];for(const _0x526e87 of _0x440307){_0x478b6d(0x33d)===_0x478b6d(0x33d)?_0x526e87['y']=_0x165d07:_0x283dcc+=_0xabdcc0[_0x478b6d(0x1b7)];}_0x165d07=Window_ButtonConsole['BUTTON_HEIGHT'],this[_0x478b6d(0x1cb)]['y']=_0x165d07;}else _0x34bb5d[_0x478b6d(0x1bb)](_0x380d9a[_0x328bc4]);};if(_0x2e8988===_0x478b6d(0x337)){let _0x548091=this[_0x478b6d(0x287)]-Window_ButtonConsole[_0x478b6d(0x301)];_0x548091-=Window_ButtonConsole[_0x478b6d(0x23b)];for(const _0x1b036c of _0x440307){_0x478b6d(0x334)!==_0x478b6d(0x200)?_0x1b036c['y']=_0x548091:this[_0x478b6d(0x254)]();}}},Window_Message[_0x2e78ed(0x1c5)]['processButtonShortcut']=function(_0x48d509){const _0x3ab363=_0x2e78ed;if(this[_0x3ab363(0x33a)])return;if(!$gameSystem[_0x3ab363(0x285)]())return;_0x48d509=_0x48d509[_0x3ab363(0x31b)]()['trim']();switch(_0x48d509){case _0x3ab363(0x345):if($gameSystem[_0x3ab363(0x1f2)]()&&SceneManager[_0x3ab363(0x295)]())_0x3ab363(0x280)!==_0x3ab363(0x280)?this['initExtendedFastForward']():(this[_0x3ab363(0x231)](),SceneManager[_0x3ab363(0x317)](Scene_SaveButtonConsole));else{if('eBmKk'!==_0x3ab363(0x1fc))this[_0x3ab363(0x23e)]();else return _0x432297[_0x3ab363(0x221)];}break;case _0x3ab363(0x2e8):DataManager[_0x3ab363(0x2fd)]()&&SceneManager[_0x3ab363(0x295)]()?(this['playOkSound'](),SceneManager[_0x3ab363(0x317)](Scene_Load)):this['playBuzzerSound']();break;case'options':SceneManager[_0x3ab363(0x295)]()?(this[_0x3ab363(0x231)](),SceneManager[_0x3ab363(0x317)](Scene_Options)):_0x3ab363(0x27a)==='WFrlY'?this[_0x3ab363(0x23e)]():this[_0x3ab363(0x21e)]!==_0x2c0632[_0x3ab363(0x2bb)](_0x4dd953[_0x3ab363(0x344)][_0x3ab363(0x26c)][_0x3ab363(0x2e6)][_0x3ab363(0x1bc)])&&(this[_0x3ab363(0x21e)]=_0x42320f[_0x3ab363(0x2bb)](_0x35b3c7['MessageCore'][_0x3ab363(0x26c)][_0x3ab363(0x2e6)][_0x3ab363(0x1bc)]),this[_0x3ab363(0x2a3)]());break;case _0x3ab363(0x1e4):SceneManager['isSceneMap']()?(this[_0x3ab363(0x231)](),SceneManager[_0x3ab363(0x317)](Scene_GameEnd)):this['playBuzzerSound']();break;}},VisuMZ['ExtMessageFunc'][_0x2e78ed(0x328)]=Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x318)],Window_Message[_0x2e78ed(0x1c5)]['startWait']=function(_0x532ca2){const _0x519494=_0x2e78ed;if(SceneManager[_0x519494(0x2a9)][_0x519494(0x1db)]())return;VisuMZ[_0x519494(0x1b8)][_0x519494(0x328)][_0x519494(0x2b3)](this,_0x532ca2);},Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x2b8)]=function(){const _0x5701bb=_0x2e78ed,_0x4002e4=$gameSystem['getMessageCursorSettings']();return _0x4002e4[_0x5701bb(0x22f)];},Window_Message['prototype']['_createPauseSignSprites']=function(){const _0x2513b8=_0x2e78ed;this[_0x2513b8(0x2b8)]()?this[_0x2513b8(0x2c3)]():Window_Base[_0x2513b8(0x1c5)][_0x2513b8(0x2e4)][_0x2513b8(0x2b3)](this);},Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x2c3)]=function(){const _0x46b6fc=_0x2e78ed,_0x5128a3=$gameSystem[_0x46b6fc(0x316)]();this['_pauseSignSprite']=new Sprite(),this[_0x46b6fc(0x35a)](this[_0x46b6fc(0x1d3)]),this[_0x46b6fc(0x1d3)][_0x46b6fc(0x28a)]['x']=_0x5128a3[_0x46b6fc(0x25d)],this[_0x46b6fc(0x1d3)]['anchor']['y']=_0x5128a3['AnchorY'],this[_0x46b6fc(0x2ed)]=0x0;},Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x27b)]=function(){const _0x149079=_0x2e78ed;if(this[_0x149079(0x2b8)]())_0x149079(0x22d)!==_0x149079(0x2f0)?this['refreshCustomMessageCursorPauseSign']():(_0x441070[_0x149079(0x1c5)][_0x149079(0x27b)][_0x149079(0x2b3)](this),this[_0x149079(0x348)]());else{if(_0x149079(0x31f)===_0x149079(0x208))return _0x78f7f9=_0x2c5417(_0x27a537),_0x16e022[_0x149079(0x2a6)](/#(.*)/i)?_0x149079(0x281)[_0x149079(0x33e)](_0x246131(_0x24c444['$1'])):this[_0x149079(0x229)](_0x5105f2(_0x23786e));else Window_Base['prototype'][_0x149079(0x27b)]['call'](this),this[_0x149079(0x348)]();}},Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x247)]=function(){const _0x2c4af6=_0x2e78ed,_0x4d337b=this[_0x2c4af6(0x1d3)];if(!_0x4d337b)return;const _0x27a04a=$gameSystem[_0x2c4af6(0x316)](),_0x1686ac=_0x27a04a[_0x2c4af6(0x26b)][_0x2c4af6(0x31b)]()['trim']();if(_0x1686ac===_0x2c4af6(0x34a))_0x4d337b[_0x2c4af6(0x2b6)]=ImageManager[_0x2c4af6(0x1bb)](_0x27a04a[_0x2c4af6(0x22b)]);else{if(_0x1686ac===_0x2c4af6(0x356)){if(_0x2c4af6(0x2d7)!==_0x2c4af6(0x2d7))return this[_0x2c4af6(0x294)](_0x2c4af6(0x345)),![];else{const _0x30e89c=0x90,_0x538b3d=0x60,_0x52a3ca=0x18;_0x4d337b[_0x2c4af6(0x2b6)]=this[_0x2c4af6(0x291)],_0x4d337b[_0x2c4af6(0x244)](_0x30e89c,_0x538b3d,_0x52a3ca,_0x52a3ca);}}else _0x2c4af6(0x238)===_0x2c4af6(0x238)?_0x4d337b[_0x2c4af6(0x2b6)]=ImageManager[_0x2c4af6(0x1bb)](_0x2c4af6(0x2e1)):this[_0x2c4af6(0x247)]();}},Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x348)]=function(){const _0xf6edc0=_0x2e78ed,_0x44c52c=this[_0xf6edc0(0x1d3)];if(!_0x44c52c)return;if(!$gameSystem[_0xf6edc0(0x285)]())return;if(this[_0xf6edc0(0x315)])return;_0x44c52c['y']-=Window_ButtonConsole[_0xf6edc0(0x301)];},Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x2b1)]=function(){const _0xcd10ad=_0x2e78ed;this[_0xcd10ad(0x2b8)]()?this['updateCustomMessageCursorPauseSignSprites']():Window_Base['prototype'][_0xcd10ad(0x2b1)][_0xcd10ad(0x2b3)](this);},Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x297)]=function(){const _0x5a591f=_0x2e78ed;if(this['_cache_customMessageCursorFrameCount']===Graphics[_0x5a591f(0x2cf)])return;this[_0x5a591f(0x2de)]=Graphics[_0x5a591f(0x2cf)];const _0x114d6f=this[_0x5a591f(0x1d3)];if(!_0x114d6f)return;const _0xf9e00a=_0x114d6f['bitmap'];if(_0xf9e00a[_0x5a591f(0x340)]<=0x0)return;const _0x1696d8=$gameSystem[_0x5a591f(0x316)](),_0x11019b=_0x1696d8[_0x5a591f(0x26b)][_0x5a591f(0x31b)]()[_0x5a591f(0x29e)](),_0x147774=this[_0x5a591f(0x2ba)]()||this[_0x5a591f(0x25b)]();_0x114d6f[_0x5a591f(0x330)]=_0x147774?0x0:0x1;if(_0x114d6f[_0x5a591f(0x330)]<=0x0)return;const _0x5752cc=_0x1696d8[_0x5a591f(0x256)]*_0x1696d8[_0x5a591f(0x2d9)];this[_0x5a591f(0x2ed)]++;while(this['_pauseSignAnimationCount']>=_0x5752cc*_0x1696d8[_0x5a591f(0x325)]){this[_0x5a591f(0x2ed)]-=_0x5752cc*_0x1696d8[_0x5a591f(0x325)];}if(_0x11019b===_0x5a591f(0x34a))this['updateImageMessageCursorPauseSignSprites']();else _0x11019b==='windowskin'?Window_Base[_0x5a591f(0x1c5)][_0x5a591f(0x2b1)][_0x5a591f(0x2b3)](this):_0x5a591f(0x2d0)==='iANtD'?(_0xbdb78b(_0x5a591f(0x2fb)[_0x5a591f(0x33e)](_0x3b1c82,_0x3e6809)),_0x3c9d98['exit']()):this[_0x5a591f(0x299)]();},Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x207)]=function(){const _0xb25c5c=_0x2e78ed,_0x310872=this[_0xb25c5c(0x1d3)],_0xa01d6d=_0x310872[_0xb25c5c(0x2b6)],_0x61d69d=$gameSystem['getMessageCursorSettings'](),_0x170e06=Math[_0xb25c5c(0x35f)](this[_0xb25c5c(0x2ed)]/_0x61d69d[_0xb25c5c(0x325)]),_0x2399cc=Math['floor'](_0xa01d6d[_0xb25c5c(0x340)]/_0x61d69d[_0xb25c5c(0x2d9)]),_0x5f03cd=Math['floor'](_0xa01d6d['height']/_0x61d69d[_0xb25c5c(0x256)]),_0x4e844e=_0x170e06%_0x61d69d[_0xb25c5c(0x2d9)]*_0x2399cc,_0x39dc7c=Math[_0xb25c5c(0x35f)](_0x170e06/_0x61d69d[_0xb25c5c(0x2d9)])*_0x5f03cd;_0x310872[_0xb25c5c(0x244)](_0x4e844e,_0x39dc7c,_0x2399cc,_0x5f03cd),_0x310872[_0xb25c5c(0x2af)]=this[_0xb25c5c(0x225)]();},Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x299)]=function(){const _0x461d7e=_0x2e78ed,_0x16d2a3=this[_0x461d7e(0x1d3)],_0xb776de=$gameSystem[_0x461d7e(0x316)](),_0x4319b6=_0xb776de[_0x461d7e(0x31d)],_0x335c46=ImageManager['iconWidth'],_0x358344=ImageManager[_0x461d7e(0x2c4)],_0x3ed32d=_0x4319b6%0x10*_0x335c46,_0x245cf2=Math[_0x461d7e(0x35f)](_0x4319b6/0x10)*_0x358344;_0x16d2a3[_0x461d7e(0x244)](_0x3ed32d,_0x245cf2,_0x335c46,_0x358344),_0x16d2a3['visible']=this[_0x461d7e(0x225)]();if(_0xb776de[_0x461d7e(0x1c4)]===0x0)return;_0x16d2a3[_0x461d7e(0x1fa)]['x']=Math['cos'](Graphics[_0x461d7e(0x2cf)]*_0xb776de[_0x461d7e(0x1c4)]);},Window_Message['EXT_CURSOR_FOLLOW_TEXT']=VisuMZ['ExtMessageFunc'][_0x2e78ed(0x26c)][_0x2e78ed(0x211)][_0x2e78ed(0x319)]??!![],Window_Message['prototype'][_0x2e78ed(0x1de)]=function(_0x5c9970){const _0x3cdf9d=_0x2e78ed;if(!_0x5c9970)return;if(!_0x5c9970['drawing'])return;if(!this[_0x3cdf9d(0x2b8)]())return;const _0x585163=this[_0x3cdf9d(0x1d3)];if(!_0x585163)return;const _0x3d6c89=$gameSystem['getMessageCursorSettings']();_0x585163['x']=_0x5c9970['x']+this[_0x3cdf9d(0x2dc)]+_0x3d6c89[_0x3cdf9d(0x331)]+_0x585163[_0x3cdf9d(0x340)]/0x2,_0x585163['x']+=this[_0x3cdf9d(0x1cb)]['x'],_0x585163['y']=_0x5c9970['y']+this[_0x3cdf9d(0x2dc)]+_0x5c9970[_0x3cdf9d(0x287)]+_0x3d6c89[_0x3cdf9d(0x248)],_0x585163['y']+=this[_0x3cdf9d(0x1cb)]['y'],_0x585163['x']=Math['round'](_0x585163['x'][_0x3cdf9d(0x2a2)](this[_0x3cdf9d(0x2dc)],this['width'])),_0x585163['y']=Math[_0x3cdf9d(0x21c)](_0x585163['y']['clamp'](this[_0x3cdf9d(0x2dc)],this['height']-this[_0x3cdf9d(0x2dc)]));},Window_Message['prototype'][_0x2e78ed(0x1c9)]=function(){const _0x572cf3=_0x2e78ed;this[_0x572cf3(0x284)]=new Sprite(),this[_0x572cf3(0x284)][_0x572cf3(0x2af)]=![],this[_0x572cf3(0x35a)](this[_0x572cf3(0x284)]);},Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x28d)]=function(){const _0x174150=_0x2e78ed;this['_messageTail']={'visible':![],'lastFile':'','location':_0x174150(0x337),'direction':_0x174150(0x2c2),'positionX':_0x174150(0x2f9)};},Window_Message['prototype']['parseMessageTailTextCodes']=function(_0x3ad20a){const _0x3aa73e=_0x2e78ed;_0x3ad20a[_0x3aa73e(0x249)]=this[_0x3aa73e(0x2ac)](_0x3ad20a[_0x3aa73e(0x249)]),_0x3ad20a[_0x3aa73e(0x249)]=this[_0x3aa73e(0x303)](_0x3ad20a['text']);},Window_Message[_0x2e78ed(0x1c5)]['convertMessageTailEscapeCodes']=function(_0xba81c3){const _0x48ab26=_0x2e78ed;return _0xba81c3=_0xba81c3[_0x48ab26(0x227)](/<TAIL (?:BL|BOTTOM LEFT|DL|DOWN LEFT):[ ](\d+)>/gi,(_0x2b5c19,_0x24dbe6)=>{const _0x17041c=_0x48ab26;return this[_0x17041c(0x2e3)](!![],!![],_0x24dbe6),'';}),_0xba81c3=_0xba81c3[_0x48ab26(0x227)](/<TAIL (?:BR|BOTTOM RIGHT|DL|DOWN RIGHT):[ ](\d+)>/gi,(_0xed0699,_0x4d6c53)=>{const _0x22e63e=_0x48ab26;if(_0x22e63e(0x28e)===_0x22e63e(0x240))this['backOpacity']=0xff;else return this[_0x22e63e(0x2e3)](!![],![],_0x4d6c53),'';}),_0xba81c3=_0xba81c3[_0x48ab26(0x227)](/<TAIL (?:UL|UPPER LEFT|UP LEFT):[ ](\d+)>/gi,(_0xd7fb53,_0x21be9f)=>{const _0x269e6a=_0x48ab26;return _0x269e6a(0x22c)===_0x269e6a(0x1d7)?_0x21da8c[_0x269e6a(0x221)]:(this[_0x269e6a(0x2e3)](![],!![],_0x21be9f),'');}),_0xba81c3=_0xba81c3[_0x48ab26(0x227)](/<TAIL (?:UR|UPPER RIGHT|UP RIGHT):[ ](\d+)>/gi,(_0x2f5fe5,_0x137e25)=>{const _0x541f50=_0x48ab26;return this[_0x541f50(0x2e3)](![],![],_0x137e25),'';}),_0xba81c3;},Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x2e3)]=function(_0x26563a,_0x3341a7,_0x5eff7b){const _0x326786=_0x2e78ed;if(!this[_0x326786(0x362)])this[_0x326786(0x28d)]();this[_0x326786(0x362)][_0x326786(0x2af)]=!![],this[_0x326786(0x362)]['location']=_0x26563a?_0x326786(0x337):_0x326786(0x1b4),this[_0x326786(0x362)][_0x326786(0x1ec)]=_0x3341a7?_0x326786(0x2c2):_0x326786(0x2a0),this[_0x326786(0x362)][_0x326786(0x365)]=Number(_0x5eff7b);},VisuMZ['ExtMessageFunc'][_0x2e78ed(0x300)]=Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x320)],Window_Message[_0x2e78ed(0x1c5)]['updateAutoPosition']=function(){const _0x483143=_0x2e78ed;VisuMZ[_0x483143(0x1b8)]['Window_Message_updateAutoPosition'][_0x483143(0x2b3)](this);if(!this[_0x483143(0x1b5)])return;if(!this[_0x483143(0x284)])return;if(!this[_0x483143(0x362)])return;if(this[_0x483143(0x32c)]()){const _0x1538c2=$gameSystem[_0x483143(0x26f)](),_0x5a057c=_0x1538c2[_0x483143(0x311)]?_0x483143(0x2c2):_0x483143(0x2a0);this[_0x483143(0x362)][_0x483143(0x2af)]=!![],this[_0x483143(0x362)][_0x483143(0x230)]='',this[_0x483143(0x362)][_0x483143(0x279)]=_0x483143(0x337),this[_0x483143(0x362)][_0x483143(0x1ec)]=_0x5a057c,this[_0x483143(0x362)]['positionX']=_0x483143(0x2f9);}},Window_Message['prototype']['usesAutoPositionMessageTail']=function(){const _0x5958a2=_0x2e78ed,_0x3d8714=$gameSystem['getMessageTailSettings']();if(!_0x3d8714)return![];if(!_0x3d8714[_0x5958a2(0x342)])return![];const _0x2089c8=_0x3d8714[_0x5958a2(0x311)]?_0x5958a2(0x336):_0x5958a2(0x23d),_0x1dc1ee=_0x5958a2(0x1ff)['format'](_0x2089c8),_0x29e9ec=_0x3d8714[_0x1dc1ee]||'';return _0x29e9ec['trim']()!=='';},VisuMZ[_0x2e78ed(0x1b8)]['Window_Message_autoPositionOffsetX']=Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x302)],Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x302)]=function(){const _0xcaab7d=_0x2e78ed;let _0x3bfaae=VisuMZ[_0xcaab7d(0x1b8)][_0xcaab7d(0x35d)][_0xcaab7d(0x2b3)](this);const _0x5e6db6=$gameSystem[_0xcaab7d(0x26f)]();return _0x5e6db6&&_0x5e6db6[_0xcaab7d(0x342)]&&(_0x3bfaae+=_0x5e6db6['autoPositionOffsetX']),_0x3bfaae;},VisuMZ['ExtMessageFunc']['Window_Message_autoPositionOffsetY']=Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x1b7)],Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x1b7)]=function(){const _0x121cef=_0x2e78ed;let _0x23536e=VisuMZ[_0x121cef(0x1b8)][_0x121cef(0x1df)]['call'](this);const _0x39fc39=$gameSystem[_0x121cef(0x26f)]();if(_0x39fc39&&_0x39fc39[_0x121cef(0x342)]){if(_0x121cef(0x2db)!==_0x121cef(0x2db))return _0x32176f[_0x121cef(0x1b8)][_0x121cef(0x30a)][_0x121cef(0x2b3)](this);else _0x23536e+=_0x39fc39[_0x121cef(0x1b7)];}return _0x23536e;},Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x213)]=function(){const _0x1c41e1=_0x2e78ed;if(!this[_0x1c41e1(0x284)])return;if(!this[_0x1c41e1(0x362)])return;this[_0x1c41e1(0x2bd)](),this[_0x1c41e1(0x1fe)](),this[_0x1c41e1(0x24c)]();},Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x354)]=function(){const _0x346e32=_0x2e78ed,_0x5e2d80=this[_0x346e32(0x362)],_0x4e084c=_0x5e2d80[_0x346e32(0x279)]==='upper'?_0x346e32(0x1b4):_0x346e32(0x337),_0x1d81a5=_0x5e2d80[_0x346e32(0x1ec)]===_0x346e32(0x2c2)?_0x346e32(0x336):_0x346e32(0x23d);return _0x346e32(0x35e)[_0x346e32(0x33e)](_0x4e084c,_0x1d81a5);},Window_Message['prototype']['updateMessageTailBitmap']=function(){const _0x725a7f=_0x2e78ed,_0x12d8da=this[_0x725a7f(0x284)],_0xa47316=this[_0x725a7f(0x362)],_0x2a7e0c=$gameSystem[_0x725a7f(0x26f)](),_0x57889e=this[_0x725a7f(0x354)]();if(_0xa47316[_0x725a7f(0x230)]===_0x2a7e0c[_0x725a7f(0x260)[_0x725a7f(0x33e)](_0x57889e)])return;const _0x3c904d=_0x2a7e0c[_0x725a7f(0x260)[_0x725a7f(0x33e)](_0x57889e)];_0xa47316[_0x725a7f(0x230)]=_0x3c904d;if(_0x3c904d){if(_0x725a7f(0x2ef)!==_0x725a7f(0x2ef))return 0x0;else _0x12d8da[_0x725a7f(0x2b6)]=ImageManager[_0x725a7f(0x1bb)](_0x3c904d);}else _0x12d8da[_0x725a7f(0x2b6)]=new Bitmap(0x1,0x1);},Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x1fe)]=function(){const _0x1b6485=_0x2e78ed,_0x4db00b=this['_messageTailSprite'],_0x17355f=this[_0x1b6485(0x362)];_0x4db00b[_0x1b6485(0x2af)]=_0x17355f[_0x1b6485(0x2af)]&&this['openness']===0xff;},Window_Message[_0x2e78ed(0x1c5)][_0x2e78ed(0x24c)]=function(){const _0x1fad88=_0x2e78ed,_0x3f4023=this[_0x1fad88(0x284)],_0x2310fe=this[_0x1fad88(0x362)],_0x4b0945=$gameSystem[_0x1fad88(0x26f)](),_0x36a92b=this['getMessageTailMainKey']();_0x3f4023[_0x1fad88(0x28a)]['x']=_0x4b0945[_0x1fad88(0x1ee)[_0x1fad88(0x33e)](_0x36a92b)],_0x3f4023[_0x1fad88(0x28a)]['y']=_0x4b0945[_0x1fad88(0x21d)[_0x1fad88(0x33e)](_0x36a92b)];if(_0x2310fe[_0x1fad88(0x365)]==='auto'){if(_0x1fad88(0x2a5)!==_0x1fad88(0x212))_0x3f4023['x']=Math[_0x1fad88(0x21c)](this[_0x1fad88(0x340)]/0x2);else{const _0x4f25be=_0x1604a8[_0x1fad88(0x2a9)];return _0x4f25be&&_0x4f25be[_0x1fad88(0x1db)]&&_0x4f25be['isExtendedFastForwardMode']();}}else _0x2310fe[_0x1fad88(0x365)]=Number(_0x2310fe['positionX']),_0x3f4023['x']=Math['round'](_0x2310fe[_0x1fad88(0x365)]);_0x2310fe[_0x1fad88(0x279)]===_0x1fad88(0x1b4)?_0x3f4023['y']=0x0:_0x1fad88(0x1e8)===_0x1fad88(0x1e8)?_0x3f4023['y']=this[_0x1fad88(0x287)]:this[_0x1fad88(0x23e)](),_0x3f4023['x']+=_0x4b0945['%1OffsetX'[_0x1fad88(0x33e)](_0x36a92b)],_0x3f4023['y']+=_0x4b0945[_0x1fad88(0x1e5)['format'](_0x36a92b)];};function _0x1109(){const _0x3196f5=['auto','_autoForwardCount','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','the\x20VisuMZ_2_ExtMessageFunc\x20plugin.','isAnySavefileExists','VisuMZ_2_FurnitureSystem','VFPUr','Window_Message_updateAutoPosition','BUTTON_HEIGHT','autoPositionOffsetX','convertMessageTailEscapeCodes','Window_Message','alignButtonConsoleButtons','_cachedIndex','Window_Message_initMembers','47467MUltIy','MsgButtonConsole','Window_Message_isTriggered','Scene_Battle_update','createAllWindows','MessageTailSettings','grVWO','ImgEnabled','ImgToggled','autoPositionLeft','drawMessageFace','Scene_Boot_loadSystemImages','meetExtMsgFuncResetRequirements','_currentAutoSize','getMessageCursorSettings','push','startWait','FollowText','addAutoForwardDelay','toLowerCase','enWSb','IconIndex','updateExtendedFastForwardMode','SibdT','updateAutoPosition','BMdxi','hOCOU','USE_BACK_IMAGE_SPRITES','VisuMZ_1_MessageCore','FrameDelay','Window_Base_flushTextState','FontSize','Window_Message_startWait','isSceneUsingExFastForward','Window_Message_initialize','ARRAYFUNC','usesAutoPositionMessageTail','updateFade','ObhRz','flushTextState','alpha','OffsetX','_messageAutoForwardMode','innerWidth','ttAAG','894750ldUmBD','Left','bottom','EXT_FAST_FORWARD_ENABLED','drawText','_hideButtonConsole','WindowLayer_update','LoadKey','TlmHi','format','STR','width','dhdDe','autoPositionTail','createBackImageSprites','MessageCore','save','textColorID','includes','updatePauseSignHeightextMsgFunction','updateDimensions','image','isSceneBattle','active','updateColorFilter','TFPwq','updateMain','loadWindowskin','setExtendedFastForwardMode','UeRBP','List','getMessageTailMainKey','showButtonConsole','windowskin','updateConsoleVisibility','changeTextColor','NJdpJ','addChild','_choiceListWindow','WindowSkin','Window_Message_autoPositionOffsetX','%1%2','floor','sZxXm','DEFAULT_SHOW','_messageTail','updateColor','qHDZs','positionX','GameEndKey','fJFGt','prepareHideButtonConsoleTextCode','isRTL','fastfwd','48hzsTYd','parse','eWAhM','Window_Message_addedHeight','GpIfC','Scene_Map_updateMainMultiply','skip','Window_Message_updateDimensions','BfduR','pDBXp','upper','_autoPositionTarget','DcYOs','autoPositionOffsetY','ExtMessageFunc','command101','rMRgm','loadSystem','FastForwardKey','HWHZX','faceName','setExtendedFastForwardDisallowed','FONT_FACE','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','updateExtMsgFuncResetTimers','TteqW','FlipMultiplier','prototype','%1OffsetX','sTaCt','gdzHz','createMessageTailSprite','Game_Temp_requestAnimation','_contentsSprite','AutoKey','contents','return\x200','27pXvJII','options','XjxnB','Buttons','_pauseSignSprite','MinimumWait','backOpacity','VexEA','zUpYL','Window_Message_startPause','fontSize','updateEffekseer','isExtendedFastForwardMode','pause','log','moveCustomMessageCursorPauseSign','Window_Message_autoPositionOffsetY','kOPAM','backlog','mmMZe','isCancelled','gameend','%1OffsetY','addButtonConsoleObject','SKIN','PGejn','TEXT_COLOR_TOGGLED','KHdVF','Allow','direction','AUTO_FORWARD_DELAY_PER_CHAR','%1AnchorX','PIBQz','updateExtendedFastForwardCancel','_index','isSaveEnabled','EXT_FAST_FORWARD_LOOPS','makeDeepCopy','checkBackImageSprites','zuDtX','createButtonConsole','VLtHA','hide','scale','NormalColor','fFAjg','_numberInputWindow','updateMessageTailVisibility','bottom%1Filename','soIMN','createContents','newPage','isEventRunning','description','VisuMZ_4_MessageVisibility','OcIir','updateImageMessageCursorPauseSignSprites','IMHVc','isExtendedFastForwardDisallowed','Load','cOBML','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','filter','resetFontSettings','max','_childInterpreter','MsgCursor','DRbNP','updateMessageTailSprite','opmea','ARRAYEVAL','Auto','_parentWindow','members','xgRwD','wLCga','TyWwA','round','%1AnchorY','_heldDownFastFwd','isTriggered','name','TEXT_COLOR_DISABLED','OptionsKey','WMILi','_buttonConsoleSprites','isOpen','exit','replace','Position','textColor','YDusS','Filename','pHNCd','MXkbE','ButtonWidth','Enable','lastFile','playOkSound','216452tnNgEB','FONT_SIZE','MBHhK','initMembers','ButtonBuffer','SaveKey','tSgxE','2992744YfRQGS','xVcFm','BUTTON_BUFFER','loadSystemImages','Right','playBuzzerSound','anyActiveMessageInputWindows','XViLQ','Qcfzz','EVAL','onSavefileOk','setFrame','loadSvActor','TEXT_COLOR_NORMAL','refreshCustomMessageCursorPauseSign','OffsetY','text','WaitPerChar','_extendedFastForwardMode','updateMessageTailPosition','ugoGu','nTXBo','Game_System_initialize','oLOOW','106312LtCQMf','GcKWh','VOCAB','loadPartyGraphics','VisuMZ_1_SaveCore','Rows','updateBackImageSpriteVisibility','faceWidth','loadSystemImagesForExtMessageFunc','DisabledColor','isClosing','top','AnchorX','setMessageCursorSettings','setMessageTailSettings','%1Filename','BUTTON_ORDER','faceIndex','_messageWindow','isTouchScrollEnabled','_eventItemWindow','playCancel','BMFHE','TDean','create','VisuMZ_3_MessageLog','GraphicType','Settings','cjCyg','VisuMZ_1_OptionsCore','getMessageTailSettings','isMessageAutoForwardMode','_type','AUTO_FORWARD_MIN_DELAY','addedHeight','hideButtonConsoleAutoSize','SjIUV','uByAg','RoCis','614600wvvmgn','location','WFrlY','_refreshPauseSign','HmwON','fmRbv','QUjjq','isActivatedExtendedFastForwardMode','NbDRj','#%1','initExtendedFastForward','_autoSizeRegexp','_messageTailSprite','isMessageButtonConsoleVisible','bJHUT','height','OaKpW','update','anchor','ZwwMa','status','resetMessageTailSettings','TbgiE','AUZKA','FastFwd','_windowskin','YoOPA','eHLQp','processButtonShortcut','isSceneMap','428608LvvZGW','updateCustomMessageCursorPauseSignSprites','_extFastForwardLooping','updateIconMessageCursorPauseSignSprites','autoForwardTriggered','_messageTailSettings','dIouX','updateMainMultiply','trim','Scene_Message_createAllWindows','right','_msgCursorSettings','clamp','refresh','SceneManager_push','hqZLl','match','ButtonHeight','_buttonConsoleButtons','_scene','Window_Message_newPage','FODDS','convertVariableEscapeCharacters','fontFace','_interpreter','visible','Awyhc','_updatePauseSign','BUTTON_WIDTH','call','clear','MsgTail','bitmap','SHORTCUT_KEY','isCustomMessageCursorEnabled','isMainMenuMessageLogEnabled','isAnySubWindowActive','isPressed','Game_Interpreter_command101','updateMessageTailBitmap','ImgDisabled','buffer','NnjMO','loadFace','left','createCustomMessageCursorPauseSignSprites','iconHeight','luDRB','_messageButtonConsoleVisible','length','aCRDo','center','addChildToBack','parseMessageTailTextCodes','The\x20latest\x20version\x20is\x20required\x20to\x20use\x0a','show','Imolk','frameCount','zIBYd','ARRAYSTR','POSITION','isFurnitureSystemMode','initialize','map','_disallowFastForward','gAfvI','msgButtonConsole','Cols','setMessageButtonConsoleVisible','OmYvi','padding','opacity','_cache_customMessageCursorFrameCount','ufWwB','getColor','IconSet','SceneChangeReset','setupMessageTailSettings','_createPauseSignSprites','ShowDefault','General','initMessageCursorSettings','load','openness','Visible','EXT_FAST_FORWARD_STOP_ON_SCENE_CHANGE','_lastExtMsgFuncIndex','_pauseSignAnimationCount','ARRAYNUM','Sanjt','QDJBN','registerCommand','ConvertParams','setMessageAutoForwardMode','constructor','refreshButtonConsole','jJzYg','initMessageButtonConsole','itemPadding'];_0x1109=function(){return _0x3196f5;};return _0x1109();}function Window_ButtonConsole(){const _0x425c1a=_0x2e78ed;this[_0x425c1a(0x2d4)](...arguments);}Window_ButtonConsole['prototype']=Object[_0x2e78ed(0x269)](Window_Scrollable[_0x2e78ed(0x1c5)]),Window_ButtonConsole[_0x2e78ed(0x1c5)][_0x2e78ed(0x2f4)]=Window_ButtonConsole,Window_ButtonConsole[_0x2e78ed(0x361)]=VisuMZ[_0x2e78ed(0x1b8)][_0x2e78ed(0x26c)][_0x2e78ed(0x309)][_0x2e78ed(0x2e5)],Window_ButtonConsole[_0x2e78ed(0x2d2)]=VisuMZ['ExtMessageFunc'][_0x2e78ed(0x26c)][_0x2e78ed(0x309)][_0x2e78ed(0x228)],Window_ButtonConsole['SKIN']=VisuMZ[_0x2e78ed(0x1b8)][_0x2e78ed(0x26c)]['MsgButtonConsole'][_0x2e78ed(0x35c)],Window_ButtonConsole[_0x2e78ed(0x1c0)]=VisuMZ[_0x2e78ed(0x1b8)][_0x2e78ed(0x26c)][_0x2e78ed(0x309)]['FontFace'],Window_ButtonConsole[_0x2e78ed(0x233)]=VisuMZ[_0x2e78ed(0x1b8)][_0x2e78ed(0x26c)][_0x2e78ed(0x309)][_0x2e78ed(0x327)],Window_ButtonConsole[_0x2e78ed(0x246)]=VisuMZ[_0x2e78ed(0x1b8)][_0x2e78ed(0x26c)][_0x2e78ed(0x309)][_0x2e78ed(0x1fb)],Window_ButtonConsole['TEXT_COLOR_TOGGLED']=VisuMZ[_0x2e78ed(0x1b8)][_0x2e78ed(0x26c)]['MsgButtonConsole']['ToggledColor'],Window_ButtonConsole[_0x2e78ed(0x221)]=VisuMZ[_0x2e78ed(0x1b8)][_0x2e78ed(0x26c)][_0x2e78ed(0x309)][_0x2e78ed(0x25a)],Window_ButtonConsole['BUTTON_WIDTH']=VisuMZ[_0x2e78ed(0x1b8)][_0x2e78ed(0x26c)][_0x2e78ed(0x309)][_0x2e78ed(0x22e)],Window_ButtonConsole[_0x2e78ed(0x301)]=VisuMZ['ExtMessageFunc'][_0x2e78ed(0x26c)][_0x2e78ed(0x309)][_0x2e78ed(0x2a7)],Window_ButtonConsole[_0x2e78ed(0x23b)]=VisuMZ['ExtMessageFunc'][_0x2e78ed(0x26c)][_0x2e78ed(0x309)][_0x2e78ed(0x236)],Window_ButtonConsole[_0x2e78ed(0x261)]=VisuMZ[_0x2e78ed(0x1b8)][_0x2e78ed(0x26c)]['Buttons'][_0x2e78ed(0x353)],Window_ButtonConsole[_0x2e78ed(0x253)]={'auto':VisuMZ[_0x2e78ed(0x1b8)][_0x2e78ed(0x26c)][_0x2e78ed(0x1d2)]['Auto'],'fastfwd':VisuMZ['ExtMessageFunc'][_0x2e78ed(0x26c)][_0x2e78ed(0x1d2)][_0x2e78ed(0x290)],'save':VisuMZ['ExtMessageFunc']['Settings'][_0x2e78ed(0x1d2)]['Save'],'load':VisuMZ[_0x2e78ed(0x1b8)]['Settings'][_0x2e78ed(0x1d2)][_0x2e78ed(0x20a)],'options':VisuMZ[_0x2e78ed(0x1b8)][_0x2e78ed(0x26c)][_0x2e78ed(0x1d2)]['Options'],'gameend':VisuMZ['ExtMessageFunc'][_0x2e78ed(0x26c)][_0x2e78ed(0x1d2)]['GameEnd']},Window_ButtonConsole[_0x2e78ed(0x2b7)]={'auto':VisuMZ[_0x2e78ed(0x1b8)]['Settings'][_0x2e78ed(0x1d2)][_0x2e78ed(0x1cc)],'save':VisuMZ[_0x2e78ed(0x1b8)][_0x2e78ed(0x26c)][_0x2e78ed(0x1d2)][_0x2e78ed(0x237)],'load':VisuMZ[_0x2e78ed(0x1b8)]['Settings'][_0x2e78ed(0x1d2)][_0x2e78ed(0x33c)],'options':VisuMZ[_0x2e78ed(0x1b8)][_0x2e78ed(0x26c)]['Buttons'][_0x2e78ed(0x222)],'gameend':VisuMZ[_0x2e78ed(0x1b8)][_0x2e78ed(0x26c)][_0x2e78ed(0x1d2)][_0x2e78ed(0x366)]},Window_ButtonConsole[_0x2e78ed(0x1c5)][_0x2e78ed(0x2d4)]=function(_0x284b69,_0x309cda){const _0x12d910=_0x2e78ed,_0x2ed77a=new Rectangle(0x0,0x0,Window_ButtonConsole[_0x12d910(0x2b2)],Window_ButtonConsole[_0x12d910(0x301)]);this[_0x12d910(0x217)]=_0x309cda,Window_Scrollable[_0x12d910(0x1c5)][_0x12d910(0x2d4)]['call'](this,_0x2ed77a),this['createBackImageSprites'](),this[_0x12d910(0x271)]=_0x284b69[_0x12d910(0x31b)]()[_0x12d910(0x29e)](),this[_0x12d910(0x2a3)](),this[_0x12d910(0x1f9)]();},Window_ButtonConsole[_0x2e78ed(0x1c5)][_0x2e78ed(0x2f8)]=function(){return 0x0;},Window_ButtonConsole[_0x2e78ed(0x1c5)][_0x2e78ed(0x350)]=function(){const _0x83d65b=_0x2e78ed;this['windowskin']=ImageManager[_0x83d65b(0x1bb)](Window_ButtonConsole[_0x83d65b(0x1e7)]);},Window_ButtonConsole['prototype']['updatePadding']=function(){this['padding']=0x0;},Window_ButtonConsole['prototype']['updateBackOpacity']=function(){const _0x901771=_0x2e78ed;this[_0x901771(0x1d5)]=0xff;},Window_ButtonConsole['prototype'][_0x2e78ed(0x343)]=function(){const _0x307763=_0x2e78ed;Window_ButtonConsole[_0x307763(0x323)]===undefined&&this[_0x307763(0x1f5)]();if(!Window_ButtonConsole['USE_BACK_IMAGE_SPRITES'])return;this[_0x307763(0x2dd)]=0x0;const _0x1c445a=VisuMZ[_0x307763(0x1b8)][_0x307763(0x26c)][_0x307763(0x309)],_0x1b0e64=['ImgDisabled',_0x307763(0x30f),_0x307763(0x310)];this[_0x307763(0x224)]={};for(const _0x13168b of _0x1b0e64){if(_0x1c445a[_0x13168b]!==''){if('NbySD'==='NbySD'){const _0x1c8226=ImageManager[_0x307763(0x1bb)](_0x1c445a[_0x13168b]);this['_buttonConsoleSprites'][_0x13168b]=new Sprite(_0x1c8226);const _0x278c9f=this[_0x307763(0x224)][_0x13168b];this['addChildToBack'](_0x278c9f),_0x278c9f['x']=_0x1c445a[_0x307763(0x1c6)[_0x307763(0x33e)](_0x13168b)]||0x0,_0x278c9f['y']=_0x1c445a['%1OffsetY'['format'](_0x13168b)]||0x0;}else this[_0x307763(0x231)]();}}this[_0x307763(0x257)]();},Window_ButtonConsole[_0x2e78ed(0x1c5)][_0x2e78ed(0x1f5)]=function(){const _0x7d15ad=_0x2e78ed;Window_ButtonConsole[_0x7d15ad(0x323)]=![];const _0x1c6065=VisuMZ['ExtMessageFunc'][_0x7d15ad(0x26c)][_0x7d15ad(0x309)],_0x584340=[_0x7d15ad(0x2be),_0x7d15ad(0x30f),'ImgToggled'];for(const _0x1ef7b5 of _0x584340){if('zZCGY'!=='Wausu'){if(_0x1c6065[_0x1ef7b5]!==''){Window_ButtonConsole[_0x7d15ad(0x323)]=!![];break;}}else{if(this[_0x7d15ad(0x33a)])return;if(!_0x51a3e8[_0x7d15ad(0x285)]())return;let _0x19aad1=!_0x8aa797[_0x7d15ad(0x270)]();_0x1ffc5b[_0x7d15ad(0x2f3)](_0x19aad1),_0x19aad1?this[_0x7d15ad(0x231)]():_0x2a7e13[_0x7d15ad(0x266)]();}}},Window_ButtonConsole[_0x2e78ed(0x1c5)]['resetFontSettings']=function(){const _0x442e22=_0x2e78ed;Window_Scrollable['prototype'][_0x442e22(0x20e)][_0x442e22(0x2b3)](this),this[_0x442e22(0x1cd)][_0x442e22(0x2ad)]=Window_ButtonConsole[_0x442e22(0x1c0)],this['contents'][_0x442e22(0x1d9)]=Window_ButtonConsole['FONT_SIZE'];},Window_ButtonConsole[_0x2e78ed(0x1c5)][_0x2e78ed(0x2a3)]=function(){const _0x399bbf=_0x2e78ed;this[_0x399bbf(0x201)](),this[_0x399bbf(0x20e)]();const _0x2eff19=TextManager[_0x399bbf(0x2d8)](this[_0x399bbf(0x271)]),_0x3248e5=this[_0x399bbf(0x346)]();this[_0x399bbf(0x358)](ColorManager[_0x399bbf(0x2e0)](_0x3248e5)),this[_0x399bbf(0x339)](_0x2eff19,0x0,0x0,this[_0x399bbf(0x333)],_0x399bbf(0x2c9));},Window_ButtonConsole[_0x2e78ed(0x1c5)][_0x2e78ed(0x346)]=function(){const _0x4b12fc=_0x2e78ed;switch(this[_0x4b12fc(0x271)]){case _0x4b12fc(0x2f9):if($gameTemp[_0x4b12fc(0x270)]())return Window_ButtonConsole['TEXT_COLOR_TOGGLED'];break;case _0x4b12fc(0x1a9):const _0x533a31=SceneManager[_0x4b12fc(0x2a9)];if($gameSystem[_0x4b12fc(0x209)]()){if(_0x4b12fc(0x1ea)!==_0x4b12fc(0x1ea))_0x3df30b[_0x4b12fc(0x1b8)][_0x4b12fc(0x2a4)][_0x4b12fc(0x2b3)](this,_0x1fdba6),[_0x312cf0,_0x5bf6de,_0x5f1736]['includes'](_0x4380fa)&&this[_0x4b12fc(0x254)]();else return Window_ButtonConsole[_0x4b12fc(0x221)];}else{if(_0x533a31&&_0x533a31[_0x4b12fc(0x27f)]&&_0x533a31['isActivatedExtendedFastForwardMode']())return Window_ButtonConsole[_0x4b12fc(0x1e9)];}break;case'save':if(!$gameSystem[_0x4b12fc(0x1f2)]()||!SceneManager[_0x4b12fc(0x295)]())return Window_ButtonConsole['TEXT_COLOR_DISABLED'];break;case _0x4b12fc(0x2e8):if(!DataManager['isAnySavefileExists']()||!SceneManager[_0x4b12fc(0x295)]()){if(_0x4b12fc(0x1a6)===_0x4b12fc(0x1c7)){const _0x3c1638=this[_0x4b12fc(0x224)]['ImgToggled'];_0x3c1638[_0x4b12fc(0x2af)]=this[_0x4b12fc(0x346)]()===_0x49cc14['TEXT_COLOR_TOGGLED'];}else return Window_ButtonConsole[_0x4b12fc(0x221)];}break;case'options':case _0x4b12fc(0x1e4):if(!SceneManager[_0x4b12fc(0x295)]())return Window_ButtonConsole[_0x4b12fc(0x221)];break;case _0x4b12fc(0x1e1):case _0x4b12fc(0x1dd):if(!$gameSystem[_0x4b12fc(0x2b9)]()||!SceneManager[_0x4b12fc(0x295)]())return'uByAg'===_0x4b12fc(0x276)?Window_ButtonConsole[_0x4b12fc(0x221)]:(this[_0x4b12fc(0x2e3)](![],!![],_0x432912),'');break;}return Window_ButtonConsole[_0x4b12fc(0x246)];},Window_ButtonConsole[_0x2e78ed(0x1c5)][_0x2e78ed(0x264)]=function(){return!![];},Window_ButtonConsole[_0x2e78ed(0x1c5)]['onTouchScrollStart']=function(){const _0x1a25ba=_0x2e78ed;if(this['openness']<0xff)return;switch(this[_0x1a25ba(0x271)]){case'auto':let _0x28e391=!$gameTemp[_0x1a25ba(0x270)]();$gameTemp['setMessageAutoForwardMode'](_0x28e391);if(_0x28e391)this[_0x1a25ba(0x231)]();else{if('ugoGu'===_0x1a25ba(0x24d))SoundManager[_0x1a25ba(0x266)]();else return this[_0x1a25ba(0x2ec)]=this[_0x1a25ba(0x1f1)],_0xf217b3[_0x1a25ba(0x1b8)][_0x1a25ba(0x2bc)][_0x1a25ba(0x2b3)](this,_0x4ac866);}break;case'fastfwd':if(!$gameSystem[_0x1a25ba(0x209)]()){let _0x1a63dd=!$gameTemp['isExtendedFastForwardMode']();$gameTemp[_0x1a25ba(0x351)](_0x1a63dd);if(_0x1a63dd){if(_0x1a25ba(0x321)===_0x1a25ba(0x321))this['playOkSound']();else return _0x5c7a3a[_0x1a25ba(0x221)];}else{if(_0x1a25ba(0x1e0)!==_0x1a25ba(0x322))SoundManager['playCancel']();else return this[_0x1a25ba(0x2a9)]&&this['_scene'][_0x1a25ba(0x2f4)]===_0x55da6e;}this[_0x1a25ba(0x2a3)]();}else this[_0x1a25ba(0x23e)]();break;case _0x1a25ba(0x345):$gameSystem[_0x1a25ba(0x1f2)]()&&SceneManager[_0x1a25ba(0x295)]()?(this[_0x1a25ba(0x231)](),SceneManager[_0x1a25ba(0x317)](Scene_SaveButtonConsole)):_0x1a25ba(0x1c8)===_0x1a25ba(0x1b3)?this[_0x1a25ba(0x207)]():this[_0x1a25ba(0x23e)]();break;case'load':DataManager[_0x1a25ba(0x2fd)]()&&SceneManager['isSceneMap']()?(this['playOkSound'](),SceneManager[_0x1a25ba(0x317)](Scene_Load)):this[_0x1a25ba(0x23e)]();break;case'options':SceneManager[_0x1a25ba(0x295)]()?(this['playOkSound'](),SceneManager[_0x1a25ba(0x317)](Scene_Options)):this[_0x1a25ba(0x23e)]();break;case _0x1a25ba(0x1e4):SceneManager[_0x1a25ba(0x295)]()?(this[_0x1a25ba(0x231)](),SceneManager['push'](Scene_GameEnd)):this['playBuzzerSound']();break;case _0x1a25ba(0x1f9):Imported[_0x1a25ba(0x205)]&&$gameTemp['toggleMessageWindowVisibility']();break;case _0x1a25ba(0x1e1):case'log':Imported[_0x1a25ba(0x26a)]&&(_0x1a25ba(0x293)!==_0x1a25ba(0x1b2)?$gameSystem[_0x1a25ba(0x2b9)]()&&SceneManager[_0x1a25ba(0x295)]()?_0x1a25ba(0x22a)!==_0x1a25ba(0x1b6)?(this[_0x1a25ba(0x231)](),SceneManager[_0x1a25ba(0x317)](Scene_MessageLog)):(_0x237c75[_0x1a25ba(0x249)]=this[_0x1a25ba(0x2ac)](_0x4888a9['text']),_0x908bf3[_0x1a25ba(0x249)]=this[_0x1a25ba(0x303)](_0xc0b06e[_0x1a25ba(0x249)])):this['playBuzzerSound']():this[_0x1a25ba(0x271)]===_0x1a25ba(0x1a9)&&(this[_0x1a25ba(0x21e)]!==_0x1430e3[_0x1a25ba(0x2bb)](_0x528a83[_0x1a25ba(0x344)][_0x1a25ba(0x26c)][_0x1a25ba(0x2e6)][_0x1a25ba(0x1bc)])&&(this['_heldDownFastFwd']=_0x131f19['isPressed'](_0x564c8c[_0x1a25ba(0x344)][_0x1a25ba(0x26c)]['General']['FastForwardKey']),this[_0x1a25ba(0x2a3)]())));break;}TouchInput[_0x1a25ba(0x2b4)]();},Window_ButtonConsole[_0x2e78ed(0x1c5)][_0x2e78ed(0x289)]=function(){const _0x1bb397=_0x2e78ed;Window_Scrollable[_0x1bb397(0x1c5)][_0x1bb397(0x289)][_0x1bb397(0x2b3)](this),this['updateConsoleVisibility'](),this[_0x1bb397(0x363)](),this[_0x1bb397(0x257)]();},Window_ButtonConsole[_0x2e78ed(0x1c5)][_0x2e78ed(0x357)]=function(){const _0x175f8a=_0x2e78ed;if(!this[_0x175f8a(0x217)])return;this[_0x175f8a(0x2e9)]=this[_0x175f8a(0x217)]['openness'];},Window_ButtonConsole[_0x2e78ed(0x1c5)]['updateColor']=function(){const _0x168348=_0x2e78ed;if(this[_0x168348(0x271)]==='fastfwd'){if(this[_0x168348(0x21e)]!==Input['isPressed'](VisuMZ[_0x168348(0x344)][_0x168348(0x26c)]['General'][_0x168348(0x1bc)])){if('nfpYL'!==_0x168348(0x277))this[_0x168348(0x21e)]=Input['isPressed'](VisuMZ['MessageCore'][_0x168348(0x26c)][_0x168348(0x2e6)][_0x168348(0x1bc)]),this[_0x168348(0x2a3)]();else{if(_0x5068fb[_0x168348(0x2a9)][_0x168348(0x1db)]())return;_0x4836fd[_0x168348(0x1b8)][_0x168348(0x328)][_0x168348(0x2b3)](this,_0x606129);}}}},Window_ButtonConsole[_0x2e78ed(0x1c5)][_0x2e78ed(0x257)]=function(){const _0x33bcb2=_0x2e78ed;if(!Window_ButtonConsole['USE_BACK_IMAGE_SPRITES'])return;if(this[_0x33bcb2(0x224)][_0x33bcb2(0x2be)]){const _0xb4b226=this[_0x33bcb2(0x224)]['ImgDisabled'];_0xb4b226[_0x33bcb2(0x2af)]=this[_0x33bcb2(0x346)]()===Window_ButtonConsole[_0x33bcb2(0x221)];}if(this['_buttonConsoleSprites'][_0x33bcb2(0x30f)]){const _0x23291b=this[_0x33bcb2(0x224)]['ImgEnabled'];_0x23291b[_0x33bcb2(0x2af)]=this['textColorID']()===Window_ButtonConsole[_0x33bcb2(0x246)];}if(this['_buttonConsoleSprites'][_0x33bcb2(0x310)]){const _0x44ed68=this[_0x33bcb2(0x224)][_0x33bcb2(0x310)];_0x44ed68[_0x33bcb2(0x2af)]=this[_0x33bcb2(0x346)]()===Window_ButtonConsole[_0x33bcb2(0x1e9)];}};