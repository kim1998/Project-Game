//=============================================================================
// VisuStella MZ - Gab Window
// VisuMZ_4_GabWindow.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_GabWindow = true;

var VisuMZ = VisuMZ || {};
VisuMZ.GabWindow = VisuMZ.GabWindow || {};
VisuMZ.GabWindow.version = 1.05;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.05] [GabWindow]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Gab_Window_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Sometimes there's random jibber jabber that does not warrant a message box.
 * The Gab Window fulfills that jibber jabber by placing such text outside of
 * the message window box and at the corner of the screen. The gab text will
 * appear briefly and then disappear, not showing up again until the gab text
 * is updated with something else.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Create gab text that does not interrupt gameplay.
 * * Gabs can be queued together to create a streamlined conversation.
 * * Gabs can play sound effects when played, allowing you to attach voices to
 *   them if desired.
 * * Multiple lines can be used per gab to display more text.
 * * Attach faces, map sprites, sideview sprites, and even pictures to gabs.
 * * Gabs can be automatically positioned above specific events, actors, and
 *   even enemies.
 * * Turn on switches after a gab is completed.
 * * Run custom JavaScript code upon displaying or finish a gab.
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
 * Clearing Up Misunderstandings
 * ============================================================================
 *
 * There are some misunderstandings regarding gabs.
 *
 * ---
 * 
 * Gabs are NOT part of the Event List
 * 
 * For events with Show Text messages, the game goes through the event list one
 * by one until it reaches the end. This does not apply to Gabs. The Plugin
 * Commands that add Gabs add them into a queue outside of the event list and
 * therefore, any events that may be intended for gabs to be finished will
 * launch immediately unless there are event commands or plugin commands that
 * will cause the event list to wait for them.
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
 * === Gab Plugin Commands ===
 *
 * ---
 *
 * Gab: Text Only
 * - Show a Gab Window with the specified settings.
 *
 *   Text:
 *   - The text to be shown in the Gab Window.
 *
 *   Force Gab?:
 *   - Forced gabs will clear other gabs and display immediately.
 *
 *   Optional Settings:
 *   - Change the settings you want to override with this gab.
 *     Blank settings will use default Plugin Parameter settings.
 *
 * ---
 *
 * Gab: Gab: Text + Face (Any)
 * - Show a Gab Window with the specified settings.
 * - Any face graphic can be displayed next to text.
 *
 *   Text:
 *   - The text to be shown in the Gab Window.
 *
 *   Filename:
 *   - The filename of the face graphic to use.
 *
 *   Index:
 *   - This is the index of the face graphic.
 *   - Index values start at 0.
 *
 *   Force Gab?:
 *   - Forced gabs will clear other gabs and display immediately.
 *
 *   Optional Settings:
 *   - Change the settings you want to override with this gab.
 *     Blank settings will use default Plugin Parameter settings.
 *
 * ---
 *
 * Gab: Text + Face (Actor)
 * - Show a Gab Window with the specified settings.
 * - Pick an actor's face graphic to show with it.
 *
 *   Text:
 *   - The text to be shown in the Gab Window.
 *
 *   Actor ID:
 *   - This is the ID of the actor you want the face graphic of.
 *
 *   Force Gab?:
 *   - Forced gabs will clear other gabs and display immediately.
 *
 *   Optional Settings:
 *   - Change the settings you want to override with this gab.
 *     Blank settings will use default Plugin Parameter settings.
 *
 * ---
 *
 * Gab: Text + Face (Party)
 * - Show a Gab Window with the specified settings.
 * - Pick a party member's face graphic to show with it.
 *
 *   Text:
 *   - The text to be shown in the Gab Window.
 *
 *   Party Member Index:
 *   - This is the index of the party member you want the face graphic of.
 *   - Index values start at 0.
 *
 *   Force Gab?:
 *   - Forced gabs will clear other gabs and display immediately.
 *
 *   Optional Settings:
 *   - Change the settings you want to override with this gab.
 *     Blank settings will use default Plugin Parameter settings.
 *
 * ---
 *
 * Gab: Text + Map Sprite (Any)
 * - Show a Gab Window with the specified settings.
 * - Any map sprite can be displayed next to text.
 *
 *   Text:
 *   - The text to be shown in the Gab Window.
 *
 *   Filename:
 *   - The filename of the sprite graphic to use.
 *
 *   Index:
 *   - This is the index of the sprite graphic.
 *   - Index values start at 0.
 *
 *   Force Gab?:
 *   - Forced gabs will clear other gabs and display immediately.
 *
 *   Optional Settings:
 *   - Change the settings you want to override with this gab.
 *     Blank settings will use default Plugin Parameter settings.
 *
 * ---
 *
 * Gab: Text + Map Sprite (Actor)
 * - Show a Gab Window with the specified settings.
 * - Pick an actor's sprite graphic to show with it.
 *
 *   Text:
 *   - The text to be shown in the Gab Window.
 *
 *   Actor ID:
 *   - This is the ID of the actor you want the map sprite of.
 *
 *   Force Gab?:
 *   - Forced gabs will clear other gabs and display immediately.
 *
 *   Optional Settings:
 *   - Change the settings you want to override with this gab.
 *     Blank settings will use default Plugin Parameter settings.
 *
 * ---
 *
 * Gab: Text + Map Sprite (Party)
 * - Show a Gab Window with the specified settings.
 * - Pick a party member's sprite graphic to show with it.
 *
 *   Text:
 *   - The text to be shown in the Gab Window.
 *
 *   Party Member Index:
 *   - This is the index of the party member you want the map sprite of.
 *   - Index values start at 0.
 *
 *   Force Gab?:
 *   - Forced gabs will clear other gabs and display immediately.
 *
 *   Optional Settings:
 *   - Change the settings you want to override with this gab.
 *     Blank settings will use default Plugin Parameter settings.
 *
 * ---
 *
 * Gab: Text + Sideview Actor (Any)
 * - Show a Gab Window with the specified settings.
 * - Any Sideview Actor can be displayed next to text.
 *
 *   Text:
 *   - The text to be shown in the Gab Window.
 *
 *   Filename:
 *   - The filename of the Sideview Actor graphic to use.
 *
 *   Force Gab?:
 *   - Forced gabs will clear other gabs and display immediately.
 *
 *   Optional Settings:
 *   - Change the settings you want to override with this gab.
 *     Blank settings will use default Plugin Parameter settings.
 *
 * ---
 *
 * Gab: Text + Sideview Actor (Actor)
 * - Show a Gab Window with the specified settings.
 * - Pick an actor's sideview graphic to show with it.
 *
 *   Text:
 *   - The text to be shown in the Gab Window.
 *
 *   Actor ID:
 *   - This is the ID of the actor you want the sideview graphic of.
 *
 *   Force Gab?:
 *   - Forced gabs will clear other gabs and display immediately.
 *
 *   Optional Settings:
 *   - Change the settings you want to override with this gab.
 *     Blank settings will use default Plugin Parameter settings.
 *
 * ---
 *
 * Gab: Text + Sideview Actor (Party)
 * - Show a Gab Window with the specified settings.
 * - Pick a party member's sideview graphic to show with it.
 *
 *   Text:
 *   - The text to be shown in the Gab Window.
 *
 *   Party Member Index:
 *   - This is the index of the party member you want the sideview graphic of.
 *   - Index values start at 0.
 *
 *   Force Gab?:
 *   - Forced gabs will clear other gabs and display immediately.
 *
 *   Optional Settings:
 *   - Change the settings you want to override with this gab.
 *     Blank settings will use default Plugin Parameter settings.
 *
 * ---
 *
 * Gab: Text + Picture
 * - Show a Gab Window with the specified settings.
 * - Any picture graphic can be displayed next to text.
 *
 *   Text:
 *   - The text to be shown in the Gab Window.
 *
 *   Filename:
 *   - The filename of the face graphic to use.
 *
 *   Stretch Picture:
 *   - Stretch the picture to fit the window?
 *
 *   Force Gab?:
 *   - Forced gabs will clear other gabs and display immediately.
 *
 *   Optional Settings:
 *   - Change the settings you want to override with this gab.
 *     Blank settings will use default Plugin Parameter settings.
 *
 * ---
 * 
 * === Optional Settings ===
 * 
 * These settings appear in the above Gab Plugin Commands. Opening up the
 * Optional Settings will yield the following:
 * 
 * ---
 *
 * DimColor
 * 
 *   Dim Color 1:
 *   Dim Color 2:
 *   - The dim colors to use for this Gab Window.
 *   - Format: rgba(red, green, blue, alpha)
 *
 * ---
 *
 * Fade
 * 
 *   Fade Rate:
 *   - How fast this Gab Window fades away.
 * 
 *   Fade Direction:
 *   - The direction this Gab Window fades out in.
 *
 * ---
 *
 * Font
 * 
 *   Font Name:
 *   - The font name to use for this Gab Window.
 * 
 *   Font Size:
 *   - The font size to use for this Gab Window.
 *
 * ---
 *
 * Position
 * 
 *   Y Location:
 *   - The Y coordinate this Gab Window will appear in.
 *   - Ignore if you are using a locked sprite position.
 * 
 *   Actor ID:
 *   - The ID of the actor to display this Gab Window above.
 *   - For Map/Battle. 
 * 
 *   Party Index:
 *   - Index of the party member to display Gab Window above.
 *   - For Map/Battle. Index values start at 0. Ignore under 0.
 * 
 *   Enemy Index:
 *   - Index of an enemy battler to display Gab Window above.
 *   - Battle only. Index values start at 0. Ignore under 0.
 * 
 *   Event ID:
 *   - The ID of the event to display this Gab Window above.
 *   - Map only.
 *
 * ---
 *
 * On Display
 * 
 *   Bypass Anti-Repeat:
 *   - Allows this gab to bypass the Anti-Repeat settings.
 * 
 *   Sound Filename:
 *   - The filename of the SE to play when the Gab Window shows.
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
 *   JS: On Display:
 *   - Runs this code once this Gab Window shows up.
 *
 * ---
 *
 * On Finish
 * 
 *   Gab Switch:
 *   - The specified switch will be turned ON when the Gab Window finishes.
 * 
 *   JS: On Finish:
 *   - Runs this code once this Gab Window finishes.
 *
 * ---
 *
 * Waiting
 * 
 *   Wait Time:
 *   - The number of frames this Gab Window stays visible.
 * 
 *   Time Per Character:
 *   - Frames added per Text Character in this Gab Window.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Clear Gabs
 * - Clears out the current Gab and any which are queued.
 *
 * ---
 *
 * System: Wait For Gab Completion
 * - Causes the game to wait until all gabs are finished playing.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings regarding the Gab Window.
 *
 * ---
 *
 * General
 * 
 *   Anti-Repeat:
 *   - Stops gabs of the same settings from being queued.
 * 
 *   Center Graphics:
 *   - Centers graphics vertically if there are multiple lines.
 *
 * ---
 *
 * Fade
 * 
 *   Fade Rate:
 *   - How fast the gab window fades away.
 * 
 *   Fade Direction:
 *   - The direction to move the window in when fading out.
 *
 * ---
 *
 * Font
 * 
 *   Gab Font Name:
 *   - The font name used for the text of the Gab Window
 *   - Leave empty to use the default game's font.
 * 
 *   Gab Font Size:
 *   - The font size used for the text of the Gab Window.
 *   - Default: 28
 *
 * ---
 *
 * Sprites > Character Sprites
 * 
 *   X Position:
 *   - X position of the character.
 * 
 *   Y Position:
 *   - Y position of the character.
 *
 * ---
 *
 * Sprites > Sideview Sprites
 * 
 *   X Position:
 *   - X position of the Sideview Actor.
 * 
 *   Y Position:
 *   - Y position of the Sideview Actor.
 *
 * ---
 *
 * Waiting
 * 
 *   Base Wait Time:
 *   - Minimum frames the Gab Window stays visible.
 *   - Default: 90
 * 
 *   Time Per Character:
 *   - Frames added per Text Character.
 *   - Default: 4
 *
 * ---
 * 
 * JavaScript
 * 
 *   JS: On Display:
 *   - Runs this code once this Gab Window shows up.
 *   - This applies to every single gab.
 * 
 *   JS: On Finish:
 *   - Runs this code once this Gab Window finishes.
 *   - This applies to every single gab.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Map Settings
 * ============================================================================
 *
 * Settings related to the gab window while in the map scene.
 *
 * ---
 *
 * Map
 * 
 *   Y Location:
 *   - This is the Y location of the Gab Window.
 * 
 *   Dim Color 1:
 *   Dim Color 2:
 *   - These are the dim colors used for maps.
 *   - Format: rgba(red, green, blue, alpha)
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Settings
 * ============================================================================
 *
 * Settings related to the gab window while in the battle scene.
 *
 * ---
 *
 * Battle
 * 
 *   Y Location:
 *   - This is the Y location of the Gab Window.
 * 
 *   Dim Color 1:
 *   Dim Color 2:
 *   - These are the dim colors used for battles.
 *   - Format: rgba(red, green, blue, alpha)
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
 * Version 1.05: December 19, 2024
 * * Bug Fixes!
 * ** Fixed a bug where attached event gabs did not scale properly with zoom.
 *    Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Added new "Optional Settings" for various Gab Plugin Commands:
 * *** Sound Volume
 * *** Sound Pitch
 * *** Sound Pan
 * **** Previously, these were not available and defaulted to standard settings
 *      used by RPG Maker MZ.
 * 
 * Version 1.04: November 14, 2024
 * * Bug Fixes!
 * ** Fixed a bug where gabs weren't properly reloaded upon exiting menu. Fix
 *    made by Arisu.
 * * Documentation Update!
 * ** Added section "Clearing Up Misunderstandings":
 * *** Gabs are NOT part of the Event List
 * **** For events with Show Text messages, the game goes through the event
 *      list one by one until it reaches the end. This does not apply to Gabs.
 *      The Plugin Commands that add Gabs add them into a queue outside of the
 *      event list and therefore, any events that may be intended for gabs to
 *      be finished will launch immediately unless there are event commands or
 *      plugin commands that will cause the event list to wait for them.
 * 
 * Version 1.03: February 10, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.02: January 1, 2021
 * * Feature Update!
 * ** Changed how graphics are loaded into the gabs to make them more reliable.
 *    Update made by Yanfly.
 * 
 * Version 1.01: September 27, 2020
 * * Bug Fixes!
 * ** Using actor specific gab window settings during battle should no longer
 *    cause crashes. Fix made by Yanfly.
 * ** Gab Window now scales the whole screen width. Fix made by Irina.
 *
 * Version 1.00: September 10, 2020
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
 * @command GabTextOnly
 * @text Gab: Text Only
 * @desc Show a Gab Window with the specified settings.
 * Only text is displayed.
 * 
 * @arg Text:json
 * @text Text
 * @type note
 * @desc The text to be shown in the Gab Window.
 * @default "Hello!"
 * 
 * @arg ForceGab:eval
 * @text Force Gab?
 * @type boolean
 * @on Force this Gab
 * @off Queue this Gab
 * @desc Forced gabs will clear other gabs and display immediately.
 * @default false
 *
 * @arg Override:struct
 * @text Optional Settings
 * @type struct<Override>
 * @desc Change the settings you want to override with this gab.
 * Blank settings will use default Plugin Parameter settings.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GabTextFaceAny
 * @text Gab: Text + Face (Any)
 * @desc Show a Gab Window with the specified settings.
 * Any face graphic can be displayed next to text.
 * 
 * @arg Text:json
 * @text Text
 * @type note
 * @desc The text to be shown in the Gab Window.
 * @default "Hello!"
 * 
 * @arg Filename:str
 * @text Filename
 * @type file
 * @dir img/faces/
 * @desc The filename of the face graphic to use.
 * @default Actor1
 * 
 * @arg ID:num
 * @text Index
 * @parent Filename:str
 * @type number
 * @desc This is the index of the face graphic.
 * Index values start at 0.
 * @default 0
 * 
 * @arg ForceGab:eval
 * @text Force Gab?
 * @type boolean
 * @on Force this Gab
 * @off Queue this Gab
 * @desc Forced gabs will clear other gabs and display immediately.
 * @default false
 *
 * @arg Override:struct
 * @text Optional Settings
 * @type struct<Override>
 * @desc Change the settings you want to override with this gab.
 * Blank settings will use default Plugin Parameter settings.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GabTextFaceActor
 * @text Gab: Text + Face (Actor)
 * @desc Show a Gab Window with the specified settings.
 * Pick an actor's face graphic to show with it.
 * 
 * @arg Text:json
 * @text Text
 * @type note
 * @desc The text to be shown in the Gab Window.
 * @default "Hello!"
 * 
 * @arg ID:num
 * @text Actor ID
 * @type actor
 * @desc This is the ID of the actor you want the face graphic of.
 * @default 1
 * 
 * @arg ForceGab:eval
 * @text Force Gab?
 * @type boolean
 * @on Force this Gab
 * @off Queue this Gab
 * @desc Forced gabs will clear other gabs and display immediately.
 * @default false
 *
 * @arg Override:struct
 * @text Optional Settings
 * @type struct<Override>
 * @desc Change the settings you want to override with this gab.
 * Blank settings will use default Plugin Parameter settings.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GabTextFaceParty
 * @text Gab: Text + Face (Party)
 * @desc Show a Gab Window with the specified settings.
 * Pick a party member's face graphic to show with it.
 * 
 * @arg Text:json
 * @text Text
 * @type note
 * @desc The text to be shown in the Gab Window.
 * @default "Hello!"
 * 
 * @arg ID:num
 * @text Party Member Index
 * @type number
 * @desc This is the index of the party member you want the face
 * graphic of. Index values start at 0.
 * @default 0
 * 
 * @arg ForceGab:eval
 * @text Force Gab?
 * @type boolean
 * @on Force this Gab
 * @off Queue this Gab
 * @desc Forced gabs will clear other gabs and display immediately.
 * @default false
 *
 * @arg Override:struct
 * @text Optional Settings
 * @type struct<Override>
 * @desc Change the settings you want to override with this gab.
 * Blank settings will use default Plugin Parameter settings.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GabTextSpriteAny
 * @text Gab: Text + Map Sprite (Any)
 * @desc Show a Gab Window with the specified settings.
 * Any map sprite can be displayed next to text.
 * 
 * @arg Text:json
 * @text Text
 * @type note
 * @desc The text to be shown in the Gab Window.
 * @default "Hello!"
 * 
 * @arg Filename:str
 * @text Filename
 * @type file
 * @dir img/characters/
 * @desc The filename of the sprite graphic to use.
 * @default Actor1
 * 
 * @arg ID:num
 * @text Index
 * @parent Filename:str
 * @type number
 * @desc This is the index of the sprite graphic.
 * Index values start at 0.
 * @default 0
 * 
 * @arg ForceGab:eval
 * @text Force Gab?
 * @type boolean
 * @on Force this Gab
 * @off Queue this Gab
 * @desc Forced gabs will clear other gabs and display immediately.
 * @default false
 *
 * @arg Override:struct
 * @text Optional Settings
 * @type struct<Override>
 * @desc Change the settings you want to override with this gab.
 * Blank settings will use default Plugin Parameter settings.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GabTextSpriteActor
 * @text Gab: Text + Map Sprite (Actor)
 * @desc Show a Gab Window with the specified settings.
 * Pick an actor's sprite graphic to show with it.
 * 
 * @arg Text:json
 * @text Text
 * @type note
 * @desc The text to be shown in the Gab Window.
 * @default "Hello!"
 * 
 * @arg ID:num
 * @text Actor ID
 * @type actor
 * @desc This is the ID of the actor you want the map sprite of.
 * @default 1
 * 
 * @arg ForceGab:eval
 * @text Force Gab?
 * @type boolean
 * @on Force this Gab
 * @off Queue this Gab
 * @desc Forced gabs will clear other gabs and display immediately.
 * @default false
 *
 * @arg Override:struct
 * @text Optional Settings
 * @type struct<Override>
 * @desc Change the settings you want to override with this gab.
 * Blank settings will use default Plugin Parameter settings.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GabTextSpriteParty
 * @text Gab: Text + Map Sprite (Party)
 * @desc Show a Gab Window with the specified settings.
 * Pick a party member's sprite graphic to show with it.
 * 
 * @arg Text:json
 * @text Text
 * @type note
 * @desc The text to be shown in the Gab Window.
 * @default "Hello!"
 * 
 * @arg ID:num
 * @text Party Member Index
 * @type number
 * @desc This is the index of the party member you want the map
 * sprite of. Index values start at 0.
 * @default 0
 * 
 * @arg ForceGab:eval
 * @text Force Gab?
 * @type boolean
 * @on Force this Gab
 * @off Queue this Gab
 * @desc Forced gabs will clear other gabs and display immediately.
 * @default false
 *
 * @arg Override:struct
 * @text Optional Settings
 * @type struct<Override>
 * @desc Change the settings you want to override with this gab.
 * Blank settings will use default Plugin Parameter settings.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GabTextSvActorAny
 * @text Gab: Text + Sideview Actor (Any)
 * @desc Show a Gab Window with the specified settings.
 * Any Sideview Actor can be displayed next to text.
 * 
 * @arg Text:json
 * @text Text
 * @type note
 * @desc The text to be shown in the Gab Window.
 * @default "Hello!"
 * 
 * @arg Filename:str
 * @text Filename
 * @type file
 * @dir img/sv_actors/
 * @desc The filename of the Sideview Actor graphic to use.
 * @default Actor1_1
 * 
 * @arg ForceGab:eval
 * @text Force Gab?
 * @type boolean
 * @on Force this Gab
 * @off Queue this Gab
 * @desc Forced gabs will clear other gabs and display immediately.
 * @default false
 *
 * @arg Override:struct
 * @text Optional Settings
 * @type struct<Override>
 * @desc Change the settings you want to override with this gab.
 * Blank settings will use default Plugin Parameter settings.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GabTextSvActorActor
 * @text Gab: Text + Sideview Actor (Actor)
 * @desc Show a Gab Window with the specified settings.
 * Pick an actor's sideview graphic to show with it.
 * 
 * @arg Text:json
 * @text Text
 * @type note
 * @desc The text to be shown in the Gab Window.
 * @default "Hello!"
 * 
 * @arg ID:num
 * @text Actor ID
 * @type actor
 * @desc This is the ID of the actor you want the sideview graphic of.
 * @default 1
 * 
 * @arg ForceGab:eval
 * @text Force Gab?
 * @type boolean
 * @on Force this Gab
 * @off Queue this Gab
 * @desc Forced gabs will clear other gabs and display immediately.
 * @default false
 *
 * @arg Override:struct
 * @text Optional Settings
 * @type struct<Override>
 * @desc Change the settings you want to override with this gab.
 * Blank settings will use default Plugin Parameter settings.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GabTextSvActorParty
 * @text Gab: Text + Sideview Actor (Party)
 * @desc Show a Gab Window with the specified settings.
 * Pick a party member's sideview graphic to show with it.
 * 
 * @arg Text:json
 * @text Text
 * @type note
 * @desc The text to be shown in the Gab Window.
 * @default "Hello!"
 * 
 * @arg ID:num
 * @text Party Member Index
 * @type number
 * @desc This is the index of the party member you want the
 * sideview graphic of. Index values start at 0.
 * @default 0
 * 
 * @arg ForceGab:eval
 * @text Force Gab?
 * @type boolean
 * @on Force this Gab
 * @off Queue this Gab
 * @desc Forced gabs will clear other gabs and display immediately.
 * @default false
 *
 * @arg Override:struct
 * @text Optional Settings
 * @type struct<Override>
 * @desc Change the settings you want to override with this gab.
 * Blank settings will use default Plugin Parameter settings.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GabTextPicture
 * @text Gab: Text + Picture
 * @desc Show a Gab Window with the specified settings.
 * Any picture graphic can be displayed next to text.
 * 
 * @arg Text:json
 * @text Text
 * @type note
 * @desc The text to be shown in the Gab Window.
 * @default "Hello!"
 * 
 * @arg Filename:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc The filename of the face graphic to use.
 * @default Untitled
 * 
 * @arg Stretched:eval
 * @text Stretch Picture
 * @type boolean
 * @on Stretch Picture
 * @off Don't Stretch
 * @desc Stretch the picture to fit the window?
 * @default true
 * 
 * @arg ForceGab:eval
 * @text Force Gab?
 * @type boolean
 * @on Force this Gab
 * @off Queue this Gab
 * @desc Forced gabs will clear other gabs and display immediately.
 * @default false
 *
 * @arg Override:struct
 * @text Optional Settings
 * @type struct<Override>
 * @desc Change the settings you want to override with this gab.
 * Blank settings will use default Plugin Parameter settings.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command ClearGab
 * @text System: Clear Gabs
 * @desc Clears out the current Gab and any which are queued.
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command WaitForGab
 * @text System: Wait For Gab Completion
 * @desc Causes the game to wait until all gabs are finished playing.
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
 * @param GabWindow
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
 * @desc General settings regarding the Gab Window.
 * @default {"General":"","AntiRepeat:eval":"true","CenterGraphics:eval":"true","Fade":"","FadeRate:num":"16","FadeDirection:str":"None","Font":"","GabFontName:str":"","GabFontSize:num":"28","Sprites":"","Character":"","CharacterXPos:num":"36","CharacterYPos:num":"60","SVActor":"","SvActorXPos:num":"44","SvActorYPos:num":"68","Waiting":"","BaseWaitTime:num":"90","TimePerCharacter:num":"4","JavaScript":"","OnDisplayJS:func":"\"// Declare Constants\\nconst gabWindow = this;\\nconst lastGab = arguments[0];\\n\\n// Perform Actions\\n\"","OnFinishJS:func":"\"// Declare Constants\\nconst gabWindow = this;\\nconst lastGab = arguments[0];\\n\\n// Perform Actions\\n\""}
 *
 * @param Map:struct
 * @text Map Settings
 * @type struct<Map>
 * @desc Settings related to the gab window while in the map scene.
 * @default {"MapYLocation:num":"72","MapDimColor1:str":"rgba(0, 0, 0, 0.6)","MapDimColor2:str":"rgba(0, 0, 0, 0)"}
 *
 * @param Battle:struct
 * @text Battle Settings
 * @type struct<Battle>
 * @desc Settings related to the gab window while in the battle scene.
 * @default {"BattleYLocation:num":"108","BattleDimColor1:str":"rgba(0, 0, 0, 0.6)","BattleDimColor2:str":"rgba(0, 0, 0, 0)"}
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
 * @param AntiRepeat:eval
 * @text Anti-Repeat
 * @parent General
 * @type boolean
 * @on Anti-Repeat
 * @off Allow Repeat
 * @desc Stops gabs of the same settings from being queued.
 * @default true
 * 
 * @param CenterGraphics:eval
 * @text Center Graphics
 * @parent General
 * @type boolean
 * @on Center Graphics
 * @off Align Top
 * @desc Centers graphics vertically if there are multiple lines.
 * @default true
 * 
 * @param Fade
 * 
 * @param FadeRate:num
 * @text Fade Rate
 * @parent Fade
 * @type number
 * @min 1
 * @desc How fast the gab window fades away.
 * Default: 16
 * @default 16
 * 
 * @param FadeDirection:str
 * @text Fade Direction
 * @parent Fade
 * @type select
 * @option None
 * @option Up
 * @option Down
 * @option Left
 * @option Right
 * @desc The direction to move the window in when fading out.
 * @default None
 *
 * @param Font
 * 
 * @param GabFontName:str
 * @text Gab Font Name
 * @parent Font
 * @desc The font name used for the text of the Gab Window
 * Leave empty to use the default game's font.
 * @default 
 * 
 * @param GabFontSize:num
 * @text Gab Font Size
 * @parent Font
 * @type number
 * @min 1
 * @desc The font size used for the text of the Gab Window.
 * Default: 28
 * @default 28
 * 
 * @param Sprites
 * 
 * @param Character
 * @text Character Sprites
 * @parent Sprites
 * 
 * @param CharacterXPos:num
 * @text X Position
 * @parent Character
 * @type number
 * @desc X position of the character.
 * Default: 36
 * @default 36
 * 
 * @param CharacterYPos:num
 * @text Y Position
 * @parent Character
 * @type number
 * @desc Y position of the character.
 * Default: 60
 * @default 60
 * 
 * @param SVActor
 * @text Sideview Sprites
 * @parent Sprites
 * 
 * @param SvActorXPos:num
 * @text X Position
 * @parent SVActor
 * @type number
 * @desc X position of the Sideview Actor.
 * Default: 44
 * @default 44
 * 
 * @param SvActorYPos:num
 * @text Y Position
 * @parent SVActor
 * @type number
 * @desc Y position of the Sideview Actor.
 * Default: 68
 * @default 68
 * 
 * @param Waiting
 * 
 * @param BaseWaitTime:num
 * @text Base Wait Time
 * @parent Waiting
 * @type number
 * @min 0
 * @desc Minimum frames the Gab Window stays visible.
 * Default: 90
 * @default 90
 * 
 * @param TimePerCharacter:num
 * @text Time Per Character
 * @parent Waiting
 * @type number
 * @min 0
 * @desc Frames added per Text Character.
 * Default: 4
 * @default 4
 * 
 * @param JavaScript
 *
 * @param OnDisplayJS:func
 * @text JS: On Display
 * @parent OnDisplay
 * @type note
 * @desc Runs this code once this Gab Window shows up.
 * This applies to every single gab.
 * @default "// Declare Constants\nconst gabWindow = this;\nconst lastGab = arguments[0];\n\n// Perform Actions\n"
 *
 * @param OnFinishJS:func
 * @text JS: On Finish
 * @parent OnFinish
 * @type note
 * @desc Runs this code once this Gab Window finishes.
 * This applies to every single gab.
 * @default "// Declare Constants\nconst gabWindow = this;\nconst lastGab = arguments[0];\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Map Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Map:
 * 
 * @param MapYLocation:num
 * @type number
 * @text Y Location
 * @desc This is the Y location of the Gab Window.
 * Default: 72
 * @default 72
 * 
 * @param MapDimColor1:str
 * @text Dim Color 1
 * @desc This is the dim color 1 used for maps.
 * Default: rgba(0, 0, 0, 0.6)
 * @default rgba(0, 0, 0, 0.6)
 * 
 * @param MapDimColor2:str
 * @text Dim Color 2
 * @desc This is the dim color 2 used for maps.
 * Default: rgba(0, 0, 0, 0)
 * @default rgba(0, 0, 0, 0)
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Battle:
 * 
 * @param BattleYLocation:num
 * @type number
 * @text Y Location
 * @desc This is the Y location of the Gab Window.
 * Default: 108
 * @default 108
 * 
 * @param BattleDimColor1:str
 * @text Dim Color 1
 * @desc This is the dim color 1 used for battles.
 * Default: rgba(0, 0, 0, 0.6)
 * @default rgba(0, 0, 0, 0.6)
 * 
 * @param BattleDimColor2:str
 * @text Dim Color 2
 * @desc This is the dim color 2 used for battles.
 * Default: rgba(0, 0, 0, 0)
 * @default rgba(0, 0, 0, 0)
 *
 */
/* ----------------------------------------------------------------------------
 * Override Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Override:
 * 
 * @param DimColor
 * @text Dim Color
 * 
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent DimColor
 * @desc The dim color 1 to use for this Gab Window.
 * Format: rgba(red, green, blue, alpha)
 * @default 
 * 
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent DimColor
 * @desc The dim color 2 to use for this Gab Window.
 * Format: rgba(red, green, blue, alpha)
 * @default 
 * 
 * @param Fade
 * 
 * @param FadeRate:num
 * @text Fade Rate
 * @parent Fade
 * @type number
 * @desc How fast this Gab Window fades away.
 * @default 
 * 
 * @param FadeDirection:str
 * @text Fade Direction
 * @parent Fade
 * @type select
 * @option None
 * @option Up
 * @option Down
 * @option Left
 * @option Right
 * @desc The direction this Gab Window fades out in.
 * @default 
 *
 * @param Font
 * 
 * @param FontName:str
 * @text Font Name
 * @parent Font
 * @desc The font name to use for this Gab Window.
 * @default 
 * 
 * @param FontSize:num
 * @text Font Size
 * @parent Font
 * @type number
 * @desc The font size to use for this Gab Window.
 * @default 
 * 
 * @param Position
 * 
 * @param YLocation:num
 * @text Y Location
 * @parent Position
 * @type number
 * @desc The Y coordinate this Gab Window will appear in.
 * Ignore if you are using a locked sprite position.
 * @default 
 * 
 * @param ActorID:num
 * @text Actor ID
 * @parent Position
 * @type actor
 * @desc The ID of the actor to display this Gab Window above.
 * For Map/Battle. 
 * @default 0
 * 
 * @param PartyIndex:num
 * @text Party Index
 * @parent ActorID:num
 * @desc Index of the party member to display Gab Window above.
 * For Map/Battle. Index values start at 0. Ignore under 0.
 * @default -1
 * 
 * @param EnemyIndex:num
 * @text Enemy Index
 * @parent Position
 * @desc Index of an enemy battler to display Gab Window above.
 * Battle only. Index values start at 0. Ignore under 0.
 * @default -1
 * 
 * @param EventID:num
 * @text Event ID
 * @parent Position
 * @type number
 * @desc The ID of the event to display this Gab Window above.
 * Map only.
 * @default 0
 *
 * @param OnDisplay
 * @text On Display
 * 
 * @param BypassAntiRepeat:eval
 * @text Bypass Anti-Repeat
 * @parent OnDisplay
 * @type boolean
 * @on Bypass
 * @off Use Anti-Repeat
 * @desc Allows this gab to bypass the Anti-Repeat settings.
 * @default false
 * 
 * @param SoundFilename:str
 * @text Sound Filename
 * @parent OnDisplay
 * @type file
 * @dir audio/se
 * @desc The filename of the SE to play when the Gab Window shows.
 * @default 
 *
 * @param SoundVolume:num
 * @text Volume
 * @parent SoundFilename:str
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param SoundPitch:num
 * @text Pitch
 * @parent SoundFilename:str
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param SoundPan:num
 * @text Pan
 * @parent SoundFilename:str
 * @desc Pan of the sound effect played.
 * @default 0
 *
 * @param OnDisplayJS:func
 * @text JS: On Display
 * @parent OnDisplay
 * @type note
 * @desc Runs this code once this Gab Window shows up.
 * @default 
 *
 * @param OnFinish
 * @text On Finish
 * 
 * @param GabSwitch:num
 * @text Gab Switch
 * @parent OnFinish
 * @type switch
 * @desc The specified switch will be turned ON when the Gab Window finishes.
 * @default 
 *
 * @param OnFinishJS:func
 * @text JS: On Finish
 * @parent OnFinish
 * @type note
 * @desc Runs this code once this Gab Window finishes.
 * @default 
 * 
 * @param Waiting
 * 
 * @param WaitTime:num
 * @text Wait Time
 * @parent Waiting
 * @type number
 * @desc The number of frames this Gab Window stays visible.
 * @default 
 * 
 * @param TimePerCharacter:num
 * @text Time Per Character
 * @parent Waiting
 * @type number
 * @desc Frames added per Text Character in this Gab Window.
 * @default 
 *
 */
//=============================================================================

const _0x4b1c91=_0x11ab;(function(_0x33d546,_0xf92a7c){const _0x5bb25e=_0x11ab,_0x412a0e=_0x33d546();while(!![]){try{const _0x56fbb2=-parseInt(_0x5bb25e(0x175))/0x1*(parseInt(_0x5bb25e(0x172))/0x2)+parseInt(_0x5bb25e(0x1ba))/0x3+parseInt(_0x5bb25e(0x178))/0x4+parseInt(_0x5bb25e(0x24f))/0x5+parseInt(_0x5bb25e(0x26e))/0x6*(-parseInt(_0x5bb25e(0x176))/0x7)+parseInt(_0x5bb25e(0x244))/0x8*(parseInt(_0x5bb25e(0x255))/0x9)+-parseInt(_0x5bb25e(0x24d))/0xa;if(_0x56fbb2===_0xf92a7c)break;else _0x412a0e['push'](_0x412a0e['shift']());}catch(_0x335f4f){_0x412a0e['push'](_0x412a0e['shift']());}}}(_0x5875,0x6e9bb));var label=_0x4b1c91(0x1f8),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x8a9a7f){const _0x2277ba=_0x4b1c91;return _0x8a9a7f[_0x2277ba(0x231)]&&_0x8a9a7f[_0x2277ba(0x1ee)][_0x2277ba(0x26d)]('['+label+']');})[0x0];VisuMZ[label][_0x4b1c91(0x1c8)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x4b1c91(0x195)]=function(_0x5e6193,_0x2ab874){const _0x2b8904=_0x4b1c91;for(const _0x50e9cc in _0x2ab874){if(_0x50e9cc[_0x2b8904(0x23f)](/(.*):(.*)/i)){const _0x1e99be=String(RegExp['$1']),_0x4159ca=String(RegExp['$2'])['toUpperCase']()[_0x2b8904(0x273)]();let _0x19b841,_0x14702e,_0xc31aaf;switch(_0x4159ca){case _0x2b8904(0x1c1):_0x19b841=_0x2ab874[_0x50e9cc]!==''?Number(_0x2ab874[_0x50e9cc]):0x0;break;case _0x2b8904(0x219):_0x14702e=_0x2ab874[_0x50e9cc]!==''?JSON['parse'](_0x2ab874[_0x50e9cc]):[],_0x19b841=_0x14702e[_0x2b8904(0x205)](_0x1c3dd7=>Number(_0x1c3dd7));break;case _0x2b8904(0x234):_0x19b841=_0x2ab874[_0x50e9cc]!==''?eval(_0x2ab874[_0x50e9cc]):null;break;case _0x2b8904(0x182):_0x14702e=_0x2ab874[_0x50e9cc]!==''?JSON[_0x2b8904(0x1cc)](_0x2ab874[_0x50e9cc]):[],_0x19b841=_0x14702e['map'](_0x1e0ba0=>eval(_0x1e0ba0));break;case _0x2b8904(0x20e):_0x19b841=_0x2ab874[_0x50e9cc]!==''?JSON[_0x2b8904(0x1cc)](_0x2ab874[_0x50e9cc]):'';break;case _0x2b8904(0x1e6):_0x14702e=_0x2ab874[_0x50e9cc]!==''?JSON[_0x2b8904(0x1cc)](_0x2ab874[_0x50e9cc]):[],_0x19b841=_0x14702e[_0x2b8904(0x205)](_0xf1f033=>JSON[_0x2b8904(0x1cc)](_0xf1f033));break;case _0x2b8904(0x1f2):_0x19b841=_0x2ab874[_0x50e9cc]!==''?new Function(JSON[_0x2b8904(0x1cc)](_0x2ab874[_0x50e9cc])):new Function(_0x2b8904(0x22e));break;case _0x2b8904(0x1f5):_0x14702e=_0x2ab874[_0x50e9cc]!==''?JSON[_0x2b8904(0x1cc)](_0x2ab874[_0x50e9cc]):[],_0x19b841=_0x14702e[_0x2b8904(0x205)](_0x2e5958=>new Function(JSON[_0x2b8904(0x1cc)](_0x2e5958)));break;case _0x2b8904(0x209):_0x19b841=_0x2ab874[_0x50e9cc]!==''?String(_0x2ab874[_0x50e9cc]):'';break;case _0x2b8904(0x24c):_0x14702e=_0x2ab874[_0x50e9cc]!==''?JSON[_0x2b8904(0x1cc)](_0x2ab874[_0x50e9cc]):[],_0x19b841=_0x14702e[_0x2b8904(0x205)](_0x14d10b=>String(_0x14d10b));break;case'STRUCT':_0xc31aaf=_0x2ab874[_0x50e9cc]!==''?JSON['parse'](_0x2ab874[_0x50e9cc]):{},_0x19b841=VisuMZ['ConvertParams']({},_0xc31aaf);break;case'ARRAYSTRUCT':_0x14702e=_0x2ab874[_0x50e9cc]!==''?JSON[_0x2b8904(0x1cc)](_0x2ab874[_0x50e9cc]):[],_0x19b841=_0x14702e[_0x2b8904(0x205)](_0x2c75b0=>VisuMZ['ConvertParams']({},JSON[_0x2b8904(0x1cc)](_0x2c75b0)));break;default:continue;}_0x5e6193[_0x1e99be]=_0x19b841;}}return _0x5e6193;},(_0x513b1d=>{const _0x1d52ac=_0x4b1c91,_0x4176f8=_0x513b1d[_0x1d52ac(0x239)];for(const _0x3fc382 of dependencies){if(!Imported[_0x3fc382]){alert(_0x1d52ac(0x1cd)[_0x1d52ac(0x1a6)](_0x4176f8,_0x3fc382)),SceneManager[_0x1d52ac(0x202)]();break;}}const _0x11fb04=_0x513b1d['description'];if(_0x11fb04['match'](/\[Version[ ](.*?)\]/i)){const _0x35d403=Number(RegExp['$1']);_0x35d403!==VisuMZ[label][_0x1d52ac(0x1c4)]&&(alert(_0x1d52ac(0x1dd)[_0x1d52ac(0x1a6)](_0x4176f8,_0x35d403)),SceneManager['exit']());}if(_0x11fb04[_0x1d52ac(0x23f)](/\[Tier[ ](\d+)\]/i)){const _0x49ece8=Number(RegExp['$1']);_0x49ece8<tier?(alert(_0x1d52ac(0x275)['format'](_0x4176f8,_0x49ece8,tier)),SceneManager[_0x1d52ac(0x202)]()):tier=Math[_0x1d52ac(0x189)](_0x49ece8,tier);}VisuMZ[_0x1d52ac(0x195)](VisuMZ[label][_0x1d52ac(0x1c8)],_0x513b1d[_0x1d52ac(0x243)]);})(pluginData),PluginManager[_0x4b1c91(0x26b)](pluginData[_0x4b1c91(0x239)],_0x4b1c91(0x198),_0x1b6f21=>{const _0x35e9d3=_0x4b1c91;VisuMZ[_0x35e9d3(0x195)](_0x1b6f21,_0x1b6f21);const _0x44fc8d=SceneManager[_0x35e9d3(0x256)];if(!_0x44fc8d[_0x35e9d3(0x233)])return;_0x1b6f21[_0x35e9d3(0x1d9)]?_0x44fc8d[_0x35e9d3(0x220)](_0x1b6f21):_0x44fc8d[_0x35e9d3(0x1ed)](_0x1b6f21);}),PluginManager[_0x4b1c91(0x26b)](pluginData[_0x4b1c91(0x239)],_0x4b1c91(0x1d6),_0x296cdf=>{const _0x4e3f39=_0x4b1c91;VisuMZ[_0x4e3f39(0x195)](_0x296cdf,_0x296cdf);const _0x3ddd3b=SceneManager[_0x4e3f39(0x256)];if(!_0x3ddd3b['_gabWindow'])return;_0x296cdf[_0x4e3f39(0x200)]=_0x4e3f39(0x211),_0x296cdf[_0x4e3f39(0x1d9)]?_0x3ddd3b[_0x4e3f39(0x220)](_0x296cdf):_0x3ddd3b['startGabWindow'](_0x296cdf);}),PluginManager[_0x4b1c91(0x26b)](pluginData['name'],'GabTextFaceActor',_0x476eeb=>{const _0x3e25b9=_0x4b1c91;VisuMZ[_0x3e25b9(0x195)](_0x476eeb,_0x476eeb);const _0x2d0e99=SceneManager[_0x3e25b9(0x256)];if(!_0x2d0e99[_0x3e25b9(0x233)])return;_0x476eeb[_0x3e25b9(0x200)]=_0x3e25b9(0x211);const _0x336572=$gameActors[_0x3e25b9(0x1cb)](_0x476eeb['ID']);_0x336572?(_0x476eeb[_0x3e25b9(0x212)]=_0x336572['faceName'](),_0x476eeb['ID']=_0x336572[_0x3e25b9(0x18f)]()):_0x476eeb[_0x3e25b9(0x200)]=_0x3e25b9(0x1f9),_0x476eeb[_0x3e25b9(0x1d9)]?_0x2d0e99[_0x3e25b9(0x220)](_0x476eeb):_0x2d0e99[_0x3e25b9(0x1ed)](_0x476eeb);}),PluginManager['registerCommand'](pluginData['name'],_0x4b1c91(0x1f1),_0x152e55=>{const _0x4bb068=_0x4b1c91;VisuMZ[_0x4bb068(0x195)](_0x152e55,_0x152e55);const _0x16cee0=SceneManager[_0x4bb068(0x256)];if(!_0x16cee0[_0x4bb068(0x233)])return;_0x152e55[_0x4bb068(0x200)]=_0x4bb068(0x211);const _0x11e1dd=$gameParty[_0x4bb068(0x1b9)]()[_0x152e55['ID']];_0x11e1dd?(_0x152e55[_0x4bb068(0x212)]=_0x11e1dd[_0x4bb068(0x1e7)](),_0x152e55['ID']=_0x11e1dd[_0x4bb068(0x18f)]()):_0x152e55[_0x4bb068(0x200)]=_0x4bb068(0x1f9),_0x152e55[_0x4bb068(0x1d9)]?_0x16cee0[_0x4bb068(0x220)](_0x152e55):_0x16cee0[_0x4bb068(0x1ed)](_0x152e55);}),PluginManager['registerCommand'](pluginData['name'],'GabTextSpriteAny',_0xfb1892=>{const _0x1b7c91=_0x4b1c91;VisuMZ[_0x1b7c91(0x195)](_0xfb1892,_0xfb1892);const _0x35b6b9=SceneManager[_0x1b7c91(0x256)];if(!_0x35b6b9[_0x1b7c91(0x233)])return;_0xfb1892[_0x1b7c91(0x200)]='character',_0xfb1892[_0x1b7c91(0x1d9)]?_0x35b6b9[_0x1b7c91(0x220)](_0xfb1892):_0x35b6b9[_0x1b7c91(0x1ed)](_0xfb1892);}),PluginManager[_0x4b1c91(0x26b)](pluginData[_0x4b1c91(0x239)],'GabTextSpriteActor',_0x5494d6=>{const _0x370dab=_0x4b1c91;VisuMZ['ConvertParams'](_0x5494d6,_0x5494d6);const _0x4974c1=SceneManager['_scene'];if(!_0x4974c1[_0x370dab(0x233)])return;_0x5494d6[_0x370dab(0x200)]='character';const _0x186b1e=$gameActors[_0x370dab(0x1cb)](_0x5494d6['ID']);_0x186b1e?(_0x5494d6[_0x370dab(0x212)]=_0x186b1e[_0x370dab(0x18d)](),_0x5494d6['ID']=_0x186b1e['characterIndex']()):_0x5494d6[_0x370dab(0x200)]=_0x370dab(0x1f9),_0x5494d6[_0x370dab(0x1d9)]?_0x4974c1['forceGabWindow'](_0x5494d6):_0x4974c1[_0x370dab(0x1ed)](_0x5494d6);}),PluginManager[_0x4b1c91(0x26b)](pluginData[_0x4b1c91(0x239)],'GabTextSpriteParty',_0x3bc90f=>{const _0x50585b=_0x4b1c91;VisuMZ[_0x50585b(0x195)](_0x3bc90f,_0x3bc90f);const _0x4152c1=SceneManager[_0x50585b(0x256)];if(!_0x4152c1[_0x50585b(0x233)])return;_0x3bc90f['mode']=_0x50585b(0x1b4);const _0x46d3fd=$gameParty[_0x50585b(0x1b9)]()[_0x3bc90f['ID']];_0x46d3fd?(_0x3bc90f[_0x50585b(0x212)]=_0x46d3fd[_0x50585b(0x18d)](),_0x3bc90f['ID']=_0x46d3fd['characterIndex']()):_0x3bc90f['mode']=_0x50585b(0x1f9),_0x3bc90f[_0x50585b(0x1d9)]?_0x4152c1[_0x50585b(0x220)](_0x3bc90f):_0x4152c1[_0x50585b(0x1ed)](_0x3bc90f);}),PluginManager[_0x4b1c91(0x26b)](pluginData[_0x4b1c91(0x239)],_0x4b1c91(0x266),_0x539bba=>{const _0x539afd=_0x4b1c91;VisuMZ[_0x539afd(0x195)](_0x539bba,_0x539bba);const _0x3a5496=SceneManager[_0x539afd(0x256)];if(!_0x3a5496['_gabWindow'])return;_0x539bba[_0x539afd(0x200)]=_0x539afd(0x22a),_0x539bba['ForceGab']?_0x3a5496['forceGabWindow'](_0x539bba):_0x3a5496[_0x539afd(0x1ed)](_0x539bba);}),PluginManager[_0x4b1c91(0x26b)](pluginData['name'],_0x4b1c91(0x17e),_0x451640=>{const _0x16a3ef=_0x4b1c91;VisuMZ[_0x16a3ef(0x195)](_0x451640,_0x451640);const _0x400268=SceneManager[_0x16a3ef(0x256)];if(!_0x400268[_0x16a3ef(0x233)])return;_0x451640[_0x16a3ef(0x200)]=_0x16a3ef(0x22a);const _0x487fc7=$gameActors['actor'](_0x451640['ID']);_0x487fc7?_0x451640[_0x16a3ef(0x212)]=_0x487fc7[_0x16a3ef(0x16a)]():_0x451640[_0x16a3ef(0x200)]=_0x16a3ef(0x1f9),_0x451640[_0x16a3ef(0x1d9)]?_0x400268[_0x16a3ef(0x220)](_0x451640):_0x400268[_0x16a3ef(0x1ed)](_0x451640);}),PluginManager[_0x4b1c91(0x26b)](pluginData[_0x4b1c91(0x239)],'GabTextSvActorParty',_0x51a635=>{const _0x143665=_0x4b1c91;VisuMZ[_0x143665(0x195)](_0x51a635,_0x51a635);const _0x17e1dd=SceneManager[_0x143665(0x256)];if(!_0x17e1dd[_0x143665(0x233)])return;_0x51a635[_0x143665(0x200)]=_0x143665(0x22a);const _0x30ff69=$gameParty['members']()[_0x51a635['ID']];_0x30ff69?_0x51a635[_0x143665(0x212)]=_0x30ff69[_0x143665(0x16a)]():_0x51a635['mode']=_0x143665(0x1f9),_0x51a635[_0x143665(0x1d9)]?_0x17e1dd['forceGabWindow'](_0x51a635):_0x17e1dd[_0x143665(0x1ed)](_0x51a635);}),PluginManager[_0x4b1c91(0x26b)](pluginData[_0x4b1c91(0x239)],_0x4b1c91(0x180),_0x382651=>{const _0x51d682=_0x4b1c91;VisuMZ[_0x51d682(0x195)](_0x382651,_0x382651);const _0x18e6a0=SceneManager[_0x51d682(0x256)];if(!_0x18e6a0[_0x51d682(0x233)])return;_0x382651[_0x51d682(0x200)]=_0x51d682(0x1f3),_0x382651['ForceGab']?_0x18e6a0[_0x51d682(0x220)](_0x382651):_0x18e6a0[_0x51d682(0x1ed)](_0x382651);}),PluginManager['registerCommand'](pluginData[_0x4b1c91(0x239)],_0x4b1c91(0x232),_0x215ac8=>{const _0x5dbfea=_0x4b1c91,_0x382f74=$gameTemp['getLastPluginCommandInterpreter']();_0x382f74&&_0x382f74[_0x5dbfea(0x23d)]();}),PluginManager['registerCommand'](pluginData[_0x4b1c91(0x239)],'ClearGab',_0x174b4d=>{const _0x3b0605=_0x4b1c91,_0x126810=SceneManager[_0x3b0605(0x256)];if(_0x126810[_0x3b0605(0x233)])_0x126810[_0x3b0605(0x25a)]();}),VisuMZ[_0x4b1c91(0x1f8)][_0x4b1c91(0x240)]=SceneManager[_0x4b1c91(0x1a4)],SceneManager[_0x4b1c91(0x1a4)]=function(_0x4caad0){const _0x56fc4a=_0x4b1c91;this[_0x56fc4a(0x203)](_0x4caad0)&&this[_0x56fc4a(0x256)]['_gabWindow']['storeGabs'](),VisuMZ['GabWindow'][_0x56fc4a(0x240)][_0x56fc4a(0x1cf)](this,_0x4caad0);},SceneManager['isStoreGabs']=function(_0x34c668){const _0xaa3650=_0x4b1c91;if(!this[_0xaa3650(0x1fc)]()&&!this[_0xaa3650(0x269)]())return![];if(_0x34c668===Scene_Map)return!this['isSceneMap']();else{if(_0x34c668===Scene_Battle)return this[_0xaa3650(0x1fc)]();}return!![];},SceneManager[_0x4b1c91(0x269)]=function(){const _0x1575d0=_0x4b1c91;return this[_0x1575d0(0x256)]&&this[_0x1575d0(0x256)][_0x1575d0(0x21a)]===Scene_Battle;},SceneManager[_0x4b1c91(0x1fc)]=function(){const _0x319dab=_0x4b1c91;return this[_0x319dab(0x256)]instanceof Scene_Map;},Game_Temp['prototype'][_0x4b1c91(0x19c)]=function(_0x53c6e0){this['_lastPluginCommandInterpreter']=_0x53c6e0;},Game_Temp[_0x4b1c91(0x20d)][_0x4b1c91(0x21c)]=function(){return this['_lastPluginCommandInterpreter'];},VisuMZ['GabWindow'][_0x4b1c91(0x25c)]=Game_Interpreter[_0x4b1c91(0x20d)][_0x4b1c91(0x1d5)],Game_Interpreter[_0x4b1c91(0x20d)][_0x4b1c91(0x1d5)]=function(_0x9625e0){const _0x66daf5=_0x4b1c91;return $gameTemp[_0x66daf5(0x19c)](this),VisuMZ[_0x66daf5(0x1f8)][_0x66daf5(0x25c)][_0x66daf5(0x1cf)](this,_0x9625e0);},Game_Interpreter[_0x4b1c91(0x20d)][_0x4b1c91(0x23d)]=function(){const _0x279029=_0x4b1c91;this[_0x279029(0x187)](_0x279029(0x197));},VisuMZ[_0x4b1c91(0x1f8)]['Game_Interpreter_updateWaitMode']=Game_Interpreter[_0x4b1c91(0x20d)][_0x4b1c91(0x26c)],Game_Interpreter[_0x4b1c91(0x20d)][_0x4b1c91(0x26c)]=function(){const _0x3da089=_0x4b1c91;return this[_0x3da089(0x17d)]===_0x3da089(0x197)?this[_0x3da089(0x16c)]():VisuMZ['GabWindow'][_0x3da089(0x17b)][_0x3da089(0x1cf)](this);},Game_Interpreter[_0x4b1c91(0x20d)][_0x4b1c91(0x16c)]=function(){const _0x1f1102=_0x4b1c91,_0x1e20d9=SceneManager[_0x1f1102(0x256)],_0x59b9ea=_0x1e20d9[_0x1f1102(0x233)];return _0x59b9ea?_0x59b9ea[_0x1f1102(0x274)][_0x1f1102(0x1d1)]>0x0||_0x59b9ea[_0x1f1102(0x25e)]:![];},Scene_Base[_0x4b1c91(0x20d)][_0x4b1c91(0x279)]=function(_0x4ed0f1){const _0x31798f=_0x4b1c91;this['_gabWindow']=new Window_Gab(_0x4ed0f1),this[_0x31798f(0x278)](this[_0x31798f(0x233)]);},Scene_Base[_0x4b1c91(0x20d)][_0x4b1c91(0x1ed)]=function(_0x5e68dc){const _0xf75fb5=_0x4b1c91;this[_0xf75fb5(0x233)][_0xf75fb5(0x237)](_0x5e68dc);},Scene_Base[_0x4b1c91(0x20d)]['forceGabWindow']=function(_0x3c1576){const _0x48f405=_0x4b1c91;this[_0x48f405(0x233)]['forceGabData'](_0x3c1576);},Scene_Base[_0x4b1c91(0x20d)][_0x4b1c91(0x25a)]=function(){const _0x99074=_0x4b1c91;this[_0x99074(0x233)][_0x99074(0x1d0)]();},VisuMZ[_0x4b1c91(0x1f8)][_0x4b1c91(0x167)]=Scene_Map[_0x4b1c91(0x20d)][_0x4b1c91(0x1c6)],Scene_Map[_0x4b1c91(0x20d)][_0x4b1c91(0x1c6)]=function(){const _0x130f98=_0x4b1c91;VisuMZ[_0x130f98(0x1f8)][_0x130f98(0x167)][_0x130f98(0x1cf)](this),this[_0x130f98(0x279)](![]);},VisuMZ['GabWindow'][_0x4b1c91(0x246)]=Scene_Battle['prototype'][_0x4b1c91(0x1c6)],Scene_Battle[_0x4b1c91(0x20d)][_0x4b1c91(0x1c6)]=function(){const _0x3e189f=_0x4b1c91;VisuMZ['GabWindow'][_0x3e189f(0x246)]['call'](this),this[_0x3e189f(0x279)](!![]);},ImageManager[_0x4b1c91(0x23a)]=ImageManager['svActorHorzCells']||0x9,ImageManager[_0x4b1c91(0x17f)]=ImageManager[_0x4b1c91(0x17f)]||0x6;!Imported[_0x4b1c91(0x1ce)]&&(Window_Base[_0x4b1c91(0x20d)]['drawSvActor']=function(_0x25c699,_0x27d83e,_0x246fae){const _0x2882c2=_0x4b1c91,_0x2fd5e6=_0x25c699[_0x2882c2(0x23f)](/\$/i),_0x2ff93a=ImageManager[_0x2882c2(0x225)](_0x25c699),_0x383892=_0x2ff93a[_0x2882c2(0x1f4)]/(_0x2fd5e6?0x1:ImageManager['svActorHorzCells']),_0x326357=_0x2ff93a[_0x2882c2(0x16b)]/(_0x2fd5e6?0x1:ImageManager[_0x2882c2(0x17f)]),_0x2074ee=0x0,_0x5a03f2=0x0;this[_0x2882c2(0x23e)][_0x2882c2(0x170)](_0x2ff93a,_0x2074ee,_0x5a03f2,_0x383892,_0x326357,_0x27d83e-_0x383892/0x2,_0x246fae-_0x326357);});;function Window_Gab(){const _0x1552ea=_0x4b1c91;this[_0x1552ea(0x24b)](...arguments);}function _0x5875(){const _0x1324a8=['contents','match','SceneManager_push','BattleYLocation','isBattleMember','parameters','2696MmCYGy','drawGabPicture','Scene_Battle_createAllWindows','_widthOverride','playSe','_fadeDirOverride','event','initialize','ARRAYSTR','1710500bhpCxl','CenterGraphics','1624375quDUZG','RIGHT','SvActorXPos','_jsOnDisplay','split','_soundName','4689JTJQZz','_scene','loadFace','min','onFinish','clearGabWindow','OnFinishJS','Game_Interpreter_PluginCommand','screenY','_gabRunning','index','opacity','YLocation','itemPadding','adjustDimensions','forceGabData','_stretchPicture','GabTextSvActorAny','isHideGabWindow','boxHeight','isSceneBattle','SoundPan','registerCommand','updateWaitMode','includes','2490rJWLkn','dimColor1','zoomScale','getPictureScale','repositionToTarget','trim','_gabQueue','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_showCount','GabFontName','addChild','createGabWindow','EventID','_currentBattleGab','Scene_Map_createAllWindows','isVisible','TimePerCharacter','battlerName','height','isGabRunning','_lockedToTarget','_graphicIndex','innerHeight','blt','startCountdown','2684sGRity','Text','Battle','57ljUfTN','1393dfApXz','MapYLocation','973840mGXhQv','inBattle','PartyIndex','Game_Interpreter_updateWaitMode','loadCharacter','_waitMode','GabTextSvActorActor','svActorVertCells','GabTextPicture','_dimColor1Override','ARRAYEVAL','repositionNormal','_graphicName','_soundData','fontFace','setWaitMode','_fadeRateOverride','max','updateFadeIn','dimColor2','isAppeared','characterName','drawGabText','faceIndex','loadPicture','lineHeight','_gabSwitch','SoundVolume','contentsOpacity','ConvertParams','pitch','gab','GabTextOnly','toUpperCase','createRect','_text','setLastPluginCommandInterpreter','isRepositionToActor','GabSwitch','_graphicBitmap','slice','addLoadListener','itemHeight','FontName','push','updateFadeOut','format','checkDuplicateGab','_spriteset','_tpcOverride','update','isRepositionToMapEvent','_eventID','determineLockToSprite','textSizeEx','_jsOnFinish','GabFontSize','loadNewGabData','bind','_currentMapGab','character','refresh','clear','drawFace','gradientFillRect','members','117804DzQaIf','_graphicLoading','Override','onDisplayJS','volume','unshift','_fontNameOverride','NUM','onFinishJS','MapDimColor1','version','initMembers','createAllWindows','checheckLastGab','Settings','repositionToBattleTarget','EnemyIndex','actor','parse','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','VisuMZ_1_MainMenuCore','call','clearGabData','length','fittingHeight','toLowerCase','storeGabs','command357','GabTextFaceAny','repositionToMapTarget','replace','ForceGab','padding','BaseWaitTime','removeLoadingGraphic','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','actorId','_currentGab','FadeRate','isSideView','_storedMapGabs','resetFontSettings','fontSize','drawGabSvActor','ARRAYJSON','faceName','reposition','_enemyIndex','General','restoreGabs','_lines','startGabWindow','description','FadeDirection','drawTextEx','GabTextFaceParty','FUNC','picture','width','ARRAYFUNC','resetTextColor','processNewGabData','GabWindow','none','_yLocOverride','CharacterXPos','isSceneMap','mainFontFace','faceWidth','_graphicType','mode','faceHeight','exit','isStoreGabs','_actorID','map','BattleDimColor1','hide','isRepositionToBattleEnemy','STR','_waitTimeOverride','checkCurrentGab','Map','prototype','JSON','AntiRepeat','ceil','face','Filename','drawGabGraphic','setupLoadGraphic','_fontSizeOverride','_gabLoaded','_battle','screenX','ARRAYNUM','constructor','OnDisplayJS','getLastPluginCommandInterpreter','Stretched','drawGabFace','CharacterYPos','forceGabWindow','stringify','onDisplay','turnOnGabSwitch','findTargetSprite','loadSvActor','drawBackground','_dimColor2Override','playSound','SvActorYPos','sv_actor','_storedBattleGabs','SoundPitch','FontSize','return\x200','DimColor2','create','status','WaitForGab','_gabWindow','EVAL','WaitTime','innerWidth','addGabData','_widthOVerride','name','svActorHorzCells','drawGabCharacter','Width','waitForGab'];_0x5875=function(){return _0x1324a8;};return _0x5875();}function _0x11ab(_0x489d52,_0x23f572){const _0x5875f5=_0x5875();return _0x11ab=function(_0x11abc8,_0x71a086){_0x11abc8=_0x11abc8-0x166;let _0x2be450=_0x5875f5[_0x11abc8];return _0x2be450;},_0x11ab(_0x489d52,_0x23f572);}Window_Gab[_0x4b1c91(0x20d)]=Object[_0x4b1c91(0x230)](Window_Base[_0x4b1c91(0x20d)]),Window_Gab['prototype'][_0x4b1c91(0x21a)]=Window_Gab,Window_Gab['prototype'][_0x4b1c91(0x24b)]=function(_0xae9306){const _0x2b9d3b=_0x4b1c91;this[_0x2b9d3b(0x1c5)](_0xae9306);const _0x350d76=this[_0x2b9d3b(0x19a)](_0xae9306);this['_graphicLoading']=[],Window_Base[_0x2b9d3b(0x20d)][_0x2b9d3b(0x24b)][_0x2b9d3b(0x1cf)](this,_0x350d76),this[_0x2b9d3b(0x1b6)](),this['restoreGabs']();},Window_Gab[_0x4b1c91(0x20d)][_0x4b1c91(0x1c5)]=function(_0x5e8ee7){const _0x15127f=_0x4b1c91;this[_0x15127f(0x217)]=_0x5e8ee7,this[_0x15127f(0x192)]=0x0,this['_showCount']=0x0,this['_ignoreMask']=!![],this[_0x15127f(0x274)]=[],this[_0x15127f(0x1df)]=[],this[_0x15127f(0x25e)]=![];},Window_Gab[_0x4b1c91(0x20d)]['updatePadding']=function(){const _0x22959e=_0x4b1c91;this[_0x22959e(0x1da)]=0x0;},Window_Gab[_0x4b1c91(0x20d)][_0x4b1c91(0x1d2)]=function(_0x536118){const _0x417e76=_0x4b1c91;return _0x536118*this[_0x417e76(0x1a2)]()+this[_0x417e76(0x1da)]*0x2;},Window_Gab['prototype'][_0x4b1c91(0x19a)]=function(_0x4658c2){const _0x50c4fc=_0x4b1c91,_0x36ee9b=this[_0x50c4fc(0x1da)];let _0xa8bd2a=_0x36ee9b*-0x1,_0x58951c=0x0;const _0x421141=VisuMZ[_0x50c4fc(0x1f8)][_0x50c4fc(0x1c8)];_0x4658c2?_0x58951c=_0x421141[_0x50c4fc(0x174)][_0x50c4fc(0x241)]:_0x58951c=_0x421141[_0x50c4fc(0x20c)][_0x50c4fc(0x177)];_0x58951c-=this['padding'];let _0xb441bd=Graphics['width']+_0x36ee9b*0x2,_0xe18680=this[_0x50c4fc(0x1d2)](0x2);return new Rectangle(_0xa8bd2a,_0x58951c,_0xb441bd,_0xe18680);},Window_Gab[_0x4b1c91(0x20d)][_0x4b1c91(0x1b6)]=function(){const _0x33dea2=_0x4b1c91;this[_0x33dea2(0x216)]=![],this[_0x33dea2(0x260)]=0x0,this[_0x33dea2(0x194)]=0x0,this[_0x33dea2(0x19b)]='',this[_0x33dea2(0x1ff)]=_0x33dea2(0x1f9),this[_0x33dea2(0x184)]='',this[_0x33dea2(0x16e)]=0x0,this['_soundName']='',this[_0x33dea2(0x185)]={'volume':0x5a,'pitch':0x64,'pan':0x0},delete this[_0x33dea2(0x19f)],delete this[_0x33dea2(0x1c0)],delete this[_0x33dea2(0x215)],delete this[_0x33dea2(0x20a)],delete this[_0x33dea2(0x1a9)],delete this[_0x33dea2(0x1fa)],delete this[_0x33dea2(0x238)],delete this[_0x33dea2(0x181)],delete this['_dimColor2Override'],delete this[_0x33dea2(0x252)];},Window_Gab['prototype'][_0x4b1c91(0x1e3)]=function(){const _0x777d8f=_0x4b1c91,_0x494a5b=VisuMZ[_0x777d8f(0x1f8)]['Settings'];this['contents'][_0x777d8f(0x186)]=this['_fontNameOverride']||_0x494a5b[_0x777d8f(0x1ea)][_0x777d8f(0x277)]||$gameSystem[_0x777d8f(0x1fd)](),this['contents'][_0x777d8f(0x1e4)]=this[_0x777d8f(0x215)]||_0x494a5b['General'][_0x777d8f(0x1b0)]||0x1c,this[_0x777d8f(0x1f6)]();},Window_Gab[_0x4b1c91(0x20d)][_0x4b1c91(0x1aa)]=function(){const _0x33f1c1=_0x4b1c91;Window_Base['prototype'][_0x33f1c1(0x1aa)][_0x33f1c1(0x1cf)](this);if(this[_0x33f1c1(0x194)]>0x0){if(this[_0x33f1c1(0x16d)])this[_0x33f1c1(0x1e8)]();}if(this['isHideGabWindow']())this[_0x33f1c1(0x207)]();else{if(this[_0x33f1c1(0x216)]){if(this[_0x33f1c1(0x1bb)][_0x33f1c1(0x1d1)]>0x0)return;this['refresh']();}else{if(this[_0x33f1c1(0x276)]>0x0)this[_0x33f1c1(0x18a)](),--this[_0x33f1c1(0x276)];else{if(this['contentsOpacity']>0x0)this['updateFadeOut']();else this[_0x33f1c1(0x274)][_0x33f1c1(0x1d1)]>0x0?this[_0x33f1c1(0x1f7)]():(this[_0x33f1c1(0x25e)]=![],delete this[_0x33f1c1(0x1ac)]);}}}},Window_Gab['prototype'][_0x4b1c91(0x267)]=function(){const _0x4df2dc=_0x4b1c91;if($gameParty[_0x4df2dc(0x179)]()&&BattleManager['_victoryPhase'])return!![];return![];},Window_Gab[_0x4b1c91(0x20d)][_0x4b1c91(0x18a)]=function(){const _0xc9c9f3=_0x4b1c91;this[_0xc9c9f3(0x194)]+=this[_0xc9c9f3(0x188)]||VisuMZ[_0xc9c9f3(0x1f8)]['Settings'][_0xc9c9f3(0x1ea)][_0xc9c9f3(0x1e0)];},Window_Gab[_0x4b1c91(0x20d)][_0x4b1c91(0x1a5)]=function(){const _0x197a68=_0x4b1c91,_0x112a78=this[_0x197a68(0x188)]||VisuMZ[_0x197a68(0x1f8)][_0x197a68(0x1c8)][_0x197a68(0x1ea)][_0x197a68(0x1e0)],_0x52de1c=this['_fadeDirOverride']||VisuMZ[_0x197a68(0x1f8)][_0x197a68(0x1c8)][_0x197a68(0x1ea)]['FadeDirection'],_0x369d21=this['contentsOpacity'];this[_0x197a68(0x194)]-=_0x112a78;switch(_0x52de1c[_0x197a68(0x199)]()[_0x197a68(0x273)]()){case'UP':this['y']-=_0x112a78;break;case'DOWN':this['y']+=_0x112a78;break;case'LEFT':this['x']-=_0x112a78;break;case _0x197a68(0x250):this['x']+=_0x112a78;break;}if(this[_0x197a68(0x194)]>0x0)return;if(_0x369d21>0x0)this[_0x197a68(0x259)]();},Window_Gab[_0x4b1c91(0x20d)][_0x4b1c91(0x259)]=function(){const _0x543fa1=_0x4b1c91;this['_lockedToTarget']=null,this[_0x543fa1(0x223)](),this[_0x543fa1(0x1c2)]();},Window_Gab[_0x4b1c91(0x20d)][_0x4b1c91(0x223)]=function(){const _0x3b5424=_0x4b1c91;$gameSwitches['setValue'](this[_0x3b5424(0x192)],!![]),this[_0x3b5424(0x192)]=0x0;},Window_Gab[_0x4b1c91(0x20d)]['onFinishJS']=function(){const _0xe9fba=_0x4b1c91;if(this[_0xe9fba(0x1af)])this[_0xe9fba(0x1af)][_0xe9fba(0x1cf)](this);delete this[_0xe9fba(0x1af)];const _0x34f8e3=VisuMZ[_0xe9fba(0x1f8)][_0xe9fba(0x1c8)]['General'];if(_0x34f8e3['OnFinishJS'])_0x34f8e3['OnFinishJS']['call'](this,this['_currentGab']);},Window_Gab[_0x4b1c91(0x20d)][_0x4b1c91(0x237)]=function(_0x48a4f5){const _0x1de2f8=_0x4b1c91;if(!_0x48a4f5)return;if(this[_0x1de2f8(0x1a7)](_0x48a4f5))return;this[_0x1de2f8(0x274)][_0x1de2f8(0x1a4)](_0x48a4f5);},Window_Gab[_0x4b1c91(0x20d)][_0x4b1c91(0x264)]=function(_0x17a1d6){const _0x5b3c81=_0x4b1c91;if(!_0x17a1d6)return;this['clearGabData'](),this[_0x5b3c81(0x274)][_0x5b3c81(0x1a4)](_0x17a1d6);},Window_Gab[_0x4b1c91(0x20d)][_0x4b1c91(0x1d0)]=function(){const _0x13e20a=_0x4b1c91;this[_0x13e20a(0x274)]=[],this[_0x13e20a(0x1df)]=[],this[_0x13e20a(0x276)]=0x0;},Window_Gab['prototype'][_0x4b1c91(0x1a7)]=function(_0x3baf3a){const _0x425e7b=_0x4b1c91;if(!VisuMZ[_0x425e7b(0x1f8)]['Settings']['General'][_0x425e7b(0x20f)])return![];const _0x26f244=_0x3baf3a[_0x425e7b(0x1bc)];if(_0x26f244&&_0x26f244['BypassAntiRepeat'])return![];if(this[_0x425e7b(0x20b)](_0x3baf3a))return!![];if(this[_0x425e7b(0x1c7)](_0x3baf3a))return!![];return![];},Window_Gab[_0x4b1c91(0x20d)][_0x4b1c91(0x20b)]=function(_0x32c3a3){const _0x5a1139=_0x4b1c91;return JSON[_0x5a1139(0x221)](this[_0x5a1139(0x1df)])===JSON[_0x5a1139(0x221)](_0x32c3a3);},Window_Gab['prototype'][_0x4b1c91(0x1c7)]=function(_0x5f0417){const _0x4f8aae=_0x4b1c91;this[_0x4f8aae(0x274)]=this['_gabQueue']||[];for(const _0x13ce93 of this[_0x4f8aae(0x274)]){const _0x315391=this['_gabQueue'][this[_0x4f8aae(0x274)]['length']-0x1]||{};if(JSON['stringify'](_0x315391)===JSON[_0x4f8aae(0x221)](_0x5f0417))return!![];}return![];},Window_Gab[_0x4b1c91(0x20d)][_0x4b1c91(0x1f7)]=function(){const _0x37871f=_0x4b1c91,_0x345f07=this[_0x37871f(0x274)]['shift']();this[_0x37871f(0x25e)]=!![],this[_0x37871f(0x1df)]=_0x345f07,this[_0x37871f(0x1b1)](_0x345f07),this[_0x37871f(0x214)](),this[_0x37871f(0x216)]=!![];},Window_Gab[_0x4b1c91(0x20d)][_0x4b1c91(0x1b1)]=function(_0x3fb468){const _0x3c0ced=_0x4b1c91;this[_0x3c0ced(0x19b)]=_0x3fb468[_0x3c0ced(0x173)]||'',this[_0x3c0ced(0x1ec)]=this[_0x3c0ced(0x19b)][_0x3c0ced(0x253)](/[\r\n]+/)[_0x3c0ced(0x1d1)],this['_graphicType']=_0x3fb468[_0x3c0ced(0x200)]||_0x3c0ced(0x1f9),this[_0x3c0ced(0x184)]=_0x3fb468['Filename']||'',this[_0x3c0ced(0x16e)]=_0x3fb468['ID']||0x0,this[_0x3c0ced(0x265)]=_0x3fb468[_0x3c0ced(0x21d)]||![];const _0x3b0473=_0x3fb468['Override']||{};this[_0x3c0ced(0x254)]=_0x3b0473['SoundFilename']||'',this[_0x3c0ced(0x252)]=_0x3b0473[_0x3c0ced(0x21b)]||null,this[_0x3c0ced(0x185)]={'volume':_0x3b0473[_0x3c0ced(0x193)]??0x5a,'pitch':_0x3b0473[_0x3c0ced(0x22c)]??0x64,'pan':_0x3b0473[_0x3c0ced(0x26a)]??0x0},this['_gabSwitch']=_0x3b0473[_0x3c0ced(0x19e)]||0x0,this[_0x3c0ced(0x1af)]=_0x3b0473[_0x3c0ced(0x25b)]||null,this[_0x3c0ced(0x1c0)]=_0x3b0473[_0x3c0ced(0x1a3)],this[_0x3c0ced(0x215)]=_0x3b0473[_0x3c0ced(0x22d)],this[_0x3c0ced(0x20a)]=_0x3b0473[_0x3c0ced(0x235)],this[_0x3c0ced(0x1a9)]=_0x3b0473[_0x3c0ced(0x169)],this[_0x3c0ced(0x188)]=_0x3b0473['FadeRate'],this[_0x3c0ced(0x249)]=_0x3b0473[_0x3c0ced(0x1ef)],this['_yLocOverride']=_0x3b0473[_0x3c0ced(0x261)],this[_0x3c0ced(0x247)]=_0x3b0473[_0x3c0ced(0x23c)],this[_0x3c0ced(0x181)]=_0x3b0473['DimColor1'],this[_0x3c0ced(0x227)]=_0x3b0473[_0x3c0ced(0x22f)],this[_0x3c0ced(0x204)]=_0x3b0473['ActorID'];if(_0x3b0473[_0x3c0ced(0x17a)]!==undefined&&_0x3b0473[_0x3c0ced(0x17a)]>=0x0){const _0xe61f4e=_0x3b0473[_0x3c0ced(0x17a)],_0x3b5534=$gameParty[_0x3c0ced(0x1b9)]()[_0xe61f4e];if(_0x3b5534)this[_0x3c0ced(0x204)]=_0x3b5534[_0x3c0ced(0x1de)]();}this[_0x3c0ced(0x1ac)]=_0x3b0473[_0x3c0ced(0x27a)],this['_enemyIndex']=-0x1,_0x3b0473['EnemyIndex']!==undefined&&_0x3b0473[_0x3c0ced(0x1ca)]>=0x0&&(this[_0x3c0ced(0x1e9)]=_0x3b0473[_0x3c0ced(0x1ca)]);},Window_Gab[_0x4b1c91(0x20d)][_0x4b1c91(0x214)]=function(){const _0xef0856=_0x4b1c91,_0x2bb5e2=this[_0xef0856(0x184)];switch(this[_0xef0856(0x1ff)]['toLowerCase']()[_0xef0856(0x273)]()){case'character':this[_0xef0856(0x19f)]=ImageManager[_0xef0856(0x17c)](_0x2bb5e2),this[_0xef0856(0x1bb)][_0xef0856(0x1a4)](this[_0xef0856(0x19f)]),this[_0xef0856(0x19f)][_0xef0856(0x1a1)](this[_0xef0856(0x1dc)][_0xef0856(0x1b2)](this,this['_graphicBitmap']));break;case _0xef0856(0x211):this[_0xef0856(0x19f)]=ImageManager[_0xef0856(0x257)](_0x2bb5e2),this['_graphicLoading'][_0xef0856(0x1a4)](this[_0xef0856(0x19f)]),this[_0xef0856(0x19f)][_0xef0856(0x1a1)](this[_0xef0856(0x1dc)][_0xef0856(0x1b2)](this,this['_graphicBitmap']));break;case _0xef0856(0x22a):this['_graphicBitmap']=ImageManager['loadSvActor'](_0x2bb5e2),this[_0xef0856(0x1bb)][_0xef0856(0x1a4)](this[_0xef0856(0x19f)]),this[_0xef0856(0x19f)][_0xef0856(0x1a1)](this[_0xef0856(0x1dc)][_0xef0856(0x1b2)](this,this['_graphicBitmap']));break;case _0xef0856(0x1f3):this[_0xef0856(0x19f)]=ImageManager[_0xef0856(0x190)](_0x2bb5e2),this[_0xef0856(0x1bb)][_0xef0856(0x1a4)](this[_0xef0856(0x19f)]),this[_0xef0856(0x19f)][_0xef0856(0x1a1)](this[_0xef0856(0x1dc)][_0xef0856(0x1b2)](this,this['_graphicBitmap']));break;default:break;}},Window_Gab[_0x4b1c91(0x20d)]['removeLoadingGraphic']=function(_0x398ade){this['_graphicLoading']['remove'](_0x398ade);},Window_Gab[_0x4b1c91(0x20d)][_0x4b1c91(0x1b5)]=function(){const _0x945754=_0x4b1c91;this[_0x945754(0x23e)][_0x945754(0x1b6)](),this[_0x945754(0x1ad)](),this[_0x945754(0x263)](),this[_0x945754(0x1e8)](),this['drawGabBackground'](),this[_0x945754(0x213)](),this['drawGabText'](),this['startCountdown'](),this[_0x945754(0x222)](),this['clear']();},Window_Gab[_0x4b1c91(0x20d)][_0x4b1c91(0x1ad)]=function(){const _0x3812e6=_0x4b1c91;this[_0x3812e6(0x16d)]=null;if(this[_0x3812e6(0x19d)]())return!![];else{if(this[_0x3812e6(0x1ab)]())return!![];else{if(this[_0x3812e6(0x208)]())return!![];}}return![];},Window_Gab['prototype']['isRepositionToActor']=function(){const _0x5711ec=_0x4b1c91;if(this[_0x5711ec(0x204)]<=0x0)return![];const _0x220226=$gameActors[_0x5711ec(0x1cb)](this[_0x5711ec(0x204)]);if(!_0x220226)return![];if(!_0x220226[_0x5711ec(0x242)]())return![];if(SceneManager['isSceneBattle']())return $gameSystem[_0x5711ec(0x1e1)]()&&_0x220226[_0x5711ec(0x18c)]()&&(this[_0x5711ec(0x16d)]=_0x220226),!![];else{if(SceneManager[_0x5711ec(0x1fc)]()){if(_0x220226[_0x5711ec(0x25f)]()===0x0)return this[_0x5711ec(0x16d)]=$gamePlayer,!![];if($gamePlayer['followers']()[_0x5711ec(0x168)]())return this[_0x5711ec(0x16d)]=$gamePlayer['followers']()['follower'](_0x220226[_0x5711ec(0x25f)]()-0x1),!![];}}return![];},Window_Gab[_0x4b1c91(0x20d)][_0x4b1c91(0x1ab)]=function(){const _0x513bc4=_0x4b1c91;if(!SceneManager[_0x513bc4(0x1fc)]())return![];if(this[_0x513bc4(0x1ac)]>0x0&&!!$gameMap[_0x513bc4(0x24a)](this[_0x513bc4(0x1ac)]))return this[_0x513bc4(0x16d)]=$gameMap['event'](this[_0x513bc4(0x1ac)]),!![];return![];},Window_Gab[_0x4b1c91(0x20d)][_0x4b1c91(0x208)]=function(){const _0x2f3847=_0x4b1c91;if(!SceneManager[_0x2f3847(0x269)]())return![];if(this[_0x2f3847(0x1e9)]>=0x0){const _0x474e74=$gameTroop[_0x2f3847(0x1b9)]()[this[_0x2f3847(0x1e9)]];if(_0x474e74&&_0x474e74[_0x2f3847(0x18c)]())return this[_0x2f3847(0x16d)]=_0x474e74,!![];}return![];},Window_Gab[_0x4b1c91(0x20d)][_0x4b1c91(0x263)]=function(){const _0x37de15=_0x4b1c91,_0x32f54b=this[_0x37de15(0x1da)]||0x0;let _0x2b07bb=Graphics[_0x37de15(0x1f4)]+_0x32f54b*0x2;this['width']=this['adjustWidth'](_0x2b07bb);let _0x5a9d26=this[_0x37de15(0x1d2)](this[_0x37de15(0x1ec)]+0x1);this[_0x37de15(0x16b)]=_0x5a9d26,this['createContents']();},Window_Gab[_0x4b1c91(0x20d)]['adjustWidth']=function(_0x1fe717){const _0x48e31f=_0x4b1c91,_0x2e3ad1=VisuMZ[_0x48e31f(0x1f8)]['Settings'];if(this[_0x48e31f(0x16d)]){_0x1fe717=this[_0x48e31f(0x1ae)](this[_0x48e31f(0x19b)])[_0x48e31f(0x1f4)],_0x1fe717+=this[_0x48e31f(0x1da)]*0x2,_0x1fe717+=this[_0x48e31f(0x262)]()*0x4;switch(this[_0x48e31f(0x1ff)]['toLowerCase']()['trim']()){case _0x48e31f(0x1b4):_0x1fe717+=_0x2e3ad1['General'][_0x48e31f(0x1fb)]*0x2,_0x1fe717-=this[_0x48e31f(0x262)]()*0x2;break;case _0x48e31f(0x211):_0x1fe717+=ImageManager[_0x48e31f(0x1fe)];break;case _0x48e31f(0x22a):_0x1fe717+=_0x2e3ad1[_0x48e31f(0x1ea)][_0x48e31f(0x251)]*0x2,_0x1fe717-=this[_0x48e31f(0x262)]()*0x2;break;case'picture':let _0x298931=this['_graphicBitmap']?this[_0x48e31f(0x19f)][_0x48e31f(0x1f4)]:0x0;this[_0x48e31f(0x265)]&&(_0x298931*=this[_0x48e31f(0x271)]());_0x1fe717+=Math[_0x48e31f(0x210)](_0x298931);break;}}return _0x1fe717;},Window_Gab[_0x4b1c91(0x20d)][_0x4b1c91(0x1e8)]=function(){const _0x413313=_0x4b1c91;if(this[_0x413313(0x16d)]){if(SceneManager['isSceneBattle']())return this[_0x413313(0x1c9)]();else{if(SceneManager[_0x413313(0x1fc)]())return this[_0x413313(0x1d7)]();}}this['repositionNormal']();},Window_Gab['prototype'][_0x4b1c91(0x1c9)]=function(){const _0x50bdac=_0x4b1c91,_0x194ccf=SceneManager[_0x50bdac(0x256)];if(!_0x194ccf)return;const _0x849e79=_0x194ccf[_0x50bdac(0x1a8)];if(!_0x849e79)return;const _0x4f30ad=_0x849e79[_0x50bdac(0x224)](this[_0x50bdac(0x16d)]);if(!_0x4f30ad)return;let _0x5b5596=_0x4f30ad['x'],_0x30b929=_0x4f30ad['y']-_0x4f30ad[_0x50bdac(0x16b)];_0x5b5596+=Math[_0x50bdac(0x210)]((Graphics[_0x50bdac(0x1f4)]-Graphics['boxWidth'])/0x2),_0x30b929+=Math['ceil']((Graphics[_0x50bdac(0x16b)]-Graphics[_0x50bdac(0x268)])/0x2)+this[_0x50bdac(0x191)]()/0x2,this[_0x50bdac(0x272)](_0x5b5596,_0x30b929);},Window_Gab[_0x4b1c91(0x20d)]['repositionToMapTarget']=function(){const _0x294473=_0x4b1c91,_0x2d02a7=this[_0x294473(0x16d)],_0x136b4c=_0x2d02a7[_0x294473(0x218)]()*$gameScreen[_0x294473(0x270)](),_0x352675=_0x2d02a7[_0x294473(0x25d)]()*$gameScreen[_0x294473(0x270)]();this[_0x294473(0x272)](_0x136b4c,_0x352675);},Window_Gab[_0x4b1c91(0x20d)]['repositionToMapEvent']=function(){const _0x2fb408=_0x4b1c91;let _0x1e924f=$gameMap[_0x2fb408(0x24a)](this['_eventID']);this['repositionToTarget'](_0x1e924f[_0x2fb408(0x218)](),_0x1e924f[_0x2fb408(0x25d)]());},Window_Gab[_0x4b1c91(0x20d)]['repositionToTarget']=function(_0x1950a2,_0x168be1){const _0x203d85=_0x4b1c91;let _0x9bfd3c=_0x1950a2-this[_0x203d85(0x1f4)]/0x2,_0xfbe08=_0x168be1-this[_0x203d85(0x16b)]-0x20*$gameScreen[_0x203d85(0x270)]();this['x']=_0x9bfd3c,this['y']=_0xfbe08;},Window_Gab['prototype'][_0x4b1c91(0x183)]=function(){const _0x25da1b=_0x4b1c91;let _0x3c9a49=this[_0x25da1b(0x1da)]*-0x1,_0x5c514d=0x0;this[_0x25da1b(0x217)]?_0x5c514d=VisuMZ['GabWindow']['Settings'][_0x25da1b(0x174)][_0x25da1b(0x241)]:_0x5c514d=VisuMZ['GabWindow'][_0x25da1b(0x1c8)][_0x25da1b(0x20c)][_0x25da1b(0x177)],_0x5c514d-=this[_0x25da1b(0x1da)],_0x5c514d=this['_yLocOverride']||_0x5c514d,this['x']=_0x3c9a49,this['y']=_0x5c514d,this[_0x25da1b(0x16d)]=null;},Window_Gab[_0x4b1c91(0x20d)][_0x4b1c91(0x171)]=function(){const _0x269222=_0x4b1c91,_0x61cf4=VisuMZ['GabWindow']['Settings'];this[_0x269222(0x194)]=0xff,this[_0x269222(0x276)]=this[_0x269222(0x20a)]||_0x61cf4[_0x269222(0x1ea)][_0x269222(0x1db)]||0x0;const _0x1fe844=this[_0x269222(0x19b)][_0x269222(0x1d8)](/\\(.*?)\[(.*?)\]/gi,'');this[_0x269222(0x276)]+=_0x1fe844[_0x269222(0x1d1)]*(this[_0x269222(0x1a9)]||_0x61cf4[_0x269222(0x1ea)][_0x269222(0x169)]||0x0);},Window_Gab[_0x4b1c91(0x20d)]['drawGabBackground']=function(){const _0x1273c5=_0x4b1c91;this[_0x1273c5(0x226)](0x0,0x0,this[_0x1273c5(0x236)],this['innerHeight']);},Window_Gab['prototype'][_0x4b1c91(0x26f)]=function(){const _0x283cd0=_0x4b1c91;return $gameParty[_0x283cd0(0x179)]()?this[_0x283cd0(0x181)]||VisuMZ[_0x283cd0(0x1f8)]['Settings'][_0x283cd0(0x174)][_0x283cd0(0x206)]:this['_dimColor1Override']||VisuMZ[_0x283cd0(0x1f8)]['Settings'][_0x283cd0(0x20c)][_0x283cd0(0x1c3)];},Window_Gab[_0x4b1c91(0x20d)][_0x4b1c91(0x18b)]=function(){const _0x1a39c3=_0x4b1c91;return $gameParty['inBattle']()?this[_0x1a39c3(0x227)]||VisuMZ['GabWindow']['Settings']['Battle']['BattleDimColor2']:this[_0x1a39c3(0x227)]||VisuMZ['GabWindow'][_0x1a39c3(0x1c8)][_0x1a39c3(0x20c)]['MapDimColor2'];},Window_Gab[_0x4b1c91(0x20d)][_0x4b1c91(0x226)]=function(_0x1147e7,_0x31e62f,_0x233a59,_0xbcb2f5){const _0x2aeb06=_0x4b1c91,_0x2d068f=this[_0x2aeb06(0x26f)](),_0x3db381=this[_0x2aeb06(0x16d)]?this[_0x2aeb06(0x26f)]():this[_0x2aeb06(0x18b)](),_0x5f49ef=Math[_0x2aeb06(0x210)](_0x233a59*0.25),_0xc049d5=Math[_0x2aeb06(0x210)](_0x233a59*0.75);this[_0x2aeb06(0x23e)]['gradientFillRect'](_0x1147e7,_0x31e62f,_0x5f49ef,_0xbcb2f5,_0x2d068f,_0x2d068f),this[_0x2aeb06(0x23e)][_0x2aeb06(0x1b8)](_0x5f49ef,_0x31e62f,_0xc049d5,_0xbcb2f5,_0x2d068f,_0x3db381);},Window_Gab['prototype']['drawGabGraphic']=function(){const _0x517e0e=_0x4b1c91;if(this[_0x517e0e(0x184)]==='')return;switch(this[_0x517e0e(0x1ff)][_0x517e0e(0x1d3)]()['trim']()){case'face':this[_0x517e0e(0x21e)]();break;case _0x517e0e(0x1b4):this[_0x517e0e(0x23b)]();break;case'sv_actor':this[_0x517e0e(0x1e5)]();break;case _0x517e0e(0x1f3):this['drawGabPicture']();break;}},Window_Gab['prototype'][_0x4b1c91(0x21e)]=function(){const _0x2af295=_0x4b1c91,_0x4b8c34=VisuMZ[_0x2af295(0x1f8)][_0x2af295(0x1c8)]['General'],_0x257db3=0x0;let _0x156728=0x0;const _0xae4d52=ImageManager['faceWidth'];let _0x40b7d3=this[_0x2af295(0x16f)];if(!_0x4b8c34[_0x2af295(0x24e)]){_0x40b7d3=Math[_0x2af295(0x258)](this[_0x2af295(0x16f)],ImageManager[_0x2af295(0x201)]);if(this[_0x2af295(0x16f)]>_0x40b7d3)_0x156728=this[_0x2af295(0x191)]()/0x2;}this[_0x2af295(0x1b7)](this['_graphicName'],this[_0x2af295(0x16e)],_0x257db3,_0x156728,_0xae4d52,_0x40b7d3);},Window_Gab[_0x4b1c91(0x20d)]['drawGabCharacter']=function(){const _0x150b85=_0x4b1c91,_0x5e9075=VisuMZ[_0x150b85(0x1f8)]['Settings'][_0x150b85(0x1ea)],_0xfdce01=_0x5e9075[_0x150b85(0x1fb)];let _0x1dd48a=_0x5e9075[_0x150b85(0x21f)];_0x5e9075[_0x150b85(0x24e)]&&(_0x1dd48a+=(this[_0x150b85(0x1ec)]-0x1)*this[_0x150b85(0x191)]()/0x2),this['drawCharacter'](this[_0x150b85(0x184)],this[_0x150b85(0x16e)],_0xfdce01,_0x1dd48a);},Window_Gab[_0x4b1c91(0x20d)]['drawGabSvActor']=function(){const _0x341375=_0x4b1c91,_0xabf0fd=VisuMZ[_0x341375(0x1f8)][_0x341375(0x1c8)][_0x341375(0x1ea)],_0x4bffde=_0xabf0fd[_0x341375(0x251)];let _0x375375=_0xabf0fd[_0x341375(0x229)];_0xabf0fd[_0x341375(0x24e)]&&(_0x375375+=(this['_lines']-0x1)*this[_0x341375(0x191)]()/0x2),this['drawSvActor'](this[_0x341375(0x184)],_0x4bffde,_0x375375);},Window_Gab[_0x4b1c91(0x20d)][_0x4b1c91(0x245)]=function(){const _0x4801a0=_0x4b1c91;if(!this[_0x4801a0(0x19f)])return;let _0x5911a8=this[_0x4801a0(0x271)]();const _0xd238e4=Math[_0x4801a0(0x210)](this['_graphicBitmap'][_0x4801a0(0x1f4)]*_0x5911a8),_0xfc0f05=Math[_0x4801a0(0x210)](this['_graphicBitmap'][_0x4801a0(0x16b)]*_0x5911a8);let _0x231799=0x0,_0x4b4117=0x0;const _0x2f0f79=this[_0x4801a0(0x19f)];this['contents'][_0x4801a0(0x170)](_0x2f0f79,0x0,0x0,_0x2f0f79[_0x4801a0(0x1f4)],_0x2f0f79[_0x4801a0(0x16b)],_0x231799,_0x4b4117,_0xd238e4,_0xfc0f05);},Window_Gab['prototype']['getPictureScale']=function(){const _0x26c16d=_0x4b1c91;if(!this[_0x26c16d(0x19f)])return 0x1;return this[_0x26c16d(0x265)]?Math[_0x26c16d(0x258)](this[_0x26c16d(0x236)]/this[_0x26c16d(0x19f)][_0x26c16d(0x1f4)],this[_0x26c16d(0x16f)]/this[_0x26c16d(0x19f)][_0x26c16d(0x16b)]):0x1;},Window_Gab['prototype'][_0x4b1c91(0x18e)]=function(){const _0x1be9e3=_0x4b1c91,_0xcf0aac=VisuMZ['GabWindow']['Settings'];let _0x23f057=this[_0x1be9e3(0x262)]()*0x2;switch(this['_graphicType'][_0x1be9e3(0x1d3)]()[_0x1be9e3(0x273)]()){case'face':_0x23f057+=ImageManager[_0x1be9e3(0x1fe)];break;case'character':_0x23f057+=_0xcf0aac['General'][_0x1be9e3(0x1fb)]*0x2,_0x23f057-=this[_0x1be9e3(0x262)]()*0x2;break;case _0x1be9e3(0x22a):_0x23f057+=_0xcf0aac['General']['SvActorXPos']*0x2,_0x23f057-=this[_0x1be9e3(0x262)]()*0x2;break;case _0x1be9e3(0x1f3):let _0x308409=this[_0x1be9e3(0x19f)]?this['_graphicBitmap'][_0x1be9e3(0x1f4)]:0x0;_0x308409*=this['getPictureScale'](),_0x23f057+=Math['ceil'](_0x308409);break;}const _0x446f56=this[_0x1be9e3(0x191)]()/0x2;this[_0x1be9e3(0x1f0)](this[_0x1be9e3(0x19b)],_0x23f057,_0x446f56);},Window_Gab['prototype'][_0x4b1c91(0x222)]=function(){const _0x5180b8=_0x4b1c91;this[_0x5180b8(0x228)](),this[_0x5180b8(0x1bd)]();},Window_Gab[_0x4b1c91(0x20d)]['playSound']=function(){const _0xe29eff=_0x4b1c91;if(this[_0xe29eff(0x254)]==='')return;const _0x3abf0c=this['_soundData']||{},_0x55a65a={'name':this[_0xe29eff(0x254)],'volume':_0x3abf0c[_0xe29eff(0x1be)]??0x5a,'pitch':_0x3abf0c[_0xe29eff(0x196)]??0x64,'pan':_0x3abf0c['pan']??0x0};AudioManager[_0xe29eff(0x248)](_0x55a65a);},Window_Gab[_0x4b1c91(0x20d)][_0x4b1c91(0x1bd)]=function(){const _0x27b898=_0x4b1c91;if(this['_jsOnDisplay'])this[_0x27b898(0x252)][_0x27b898(0x1cf)](this);const _0x42d2a2=VisuMZ['GabWindow'][_0x27b898(0x1c8)][_0x27b898(0x1ea)];if(_0x42d2a2[_0x27b898(0x21b)])_0x42d2a2['OnDisplayJS'][_0x27b898(0x1cf)](this,this[_0x27b898(0x1df)]);},Window_Gab[_0x4b1c91(0x20d)][_0x4b1c91(0x1d4)]=function(){const _0x27c8f9=_0x4b1c91;this[_0x27c8f9(0x217)]?($gameTemp[_0x27c8f9(0x22b)]=this[_0x27c8f9(0x274)][_0x27c8f9(0x1a0)](),$gameTemp['_currentBattleGab']=this[_0x27c8f9(0x194)]>0x0?this[_0x27c8f9(0x1df)]:{}):($gameTemp['_storedMapGabs']=this[_0x27c8f9(0x274)][_0x27c8f9(0x1a0)](),$gameTemp[_0x27c8f9(0x1b3)]=this[_0x27c8f9(0x194)]>0x0?this[_0x27c8f9(0x1df)]:{});},Window_Gab['prototype'][_0x4b1c91(0x1eb)]=function(){const _0x6f646=_0x4b1c91;this[_0x6f646(0x217)]?($gameTemp[_0x6f646(0x22b)]&&(this[_0x6f646(0x274)]=$gameTemp[_0x6f646(0x22b)],delete $gameTemp[_0x6f646(0x22b)]),$gameTemp[_0x6f646(0x166)]&&$gameTemp[_0x6f646(0x166)][_0x6f646(0x173)]&&(this['_gabQueue'][_0x6f646(0x1bf)]($gameTemp[_0x6f646(0x166)]),delete $gameTemp[_0x6f646(0x166)])):($gameTemp[_0x6f646(0x1e2)]&&(this[_0x6f646(0x274)]=$gameTemp['_storedMapGabs'],delete $gameTemp[_0x6f646(0x1e2)]),$gameTemp[_0x6f646(0x1b3)]&&$gameTemp[_0x6f646(0x1b3)]['Text']&&(this[_0x6f646(0x274)][_0x6f646(0x1bf)]($gameTemp[_0x6f646(0x1b3)]),delete $gameTemp['_currentMapGab']));};