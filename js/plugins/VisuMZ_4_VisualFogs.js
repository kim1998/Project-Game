//=============================================================================
// VisuStella MZ - Visual Fogs
// VisuMZ_4_VisualFogs.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_VisualFogs = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VisualFogs = VisuMZ.VisualFogs || {};
VisuMZ.VisualFogs.version = 1.12;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.12] [VisualFogs]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Visual_Fogs_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Fogs are a handy feature long removed from RPG Maker since RPG Maker XP.
 * This plugin reintroduces them back into RPG Maker MZ. Fogs function similar
 * to parallaxes, except rather than being under the tile map, fogs appear
 * above the tile map and the characters. This plugin gives you an unlimited
 * amount of fogs to apply to each map alongside many controls to make the fogs
 * appear more vivid.
 * 
 * A restricted fog area system is also added to this plugin to make fogs
 * appear only within certain regions and/or terrain tags. This way, you can
 * utilize parallaxes as masked layers for obscured sections of the map.
 * 
 * Sometimes, fogs may be too intrusive to the player's visibility. A vignette
 * feature has been added to make fogs appear only on the borders or certain
 * sides of the screen. This way, fogs can still add to the atmosphere without
 * obscuring too much of the visible screen.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Add, change, and/or remove fogs through map notetags.
 * * Lots of customization options for each of the fogs.
 * * Limit where fogs can be displayed on the map through regions and/or
 *   terrain tags to obscure parts of the map.
 * * Use vignettes to obscure sides of the screen without affecting the center.
 * * Use Plugin Commands midway through the game to add, change, fade, and/or
 *   remove fogs as needed.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Fogs
 * 
 * Fogs are not an inherent feature for the map editor. They need to be added
 * through map notetags or Plugin Commands.
 * 
 * Each of the fogs added through this plugin's notetags and/or commands are
 * assigned an ID. Referring back to the ID later will allow you to update
 * and/or remove that fog when needed.
 * 
 * When fogs are created, they appear above the tile map and characters, but
 * below the weather. This means they are created between the two layers when
 * the map's sprites are generated.
 * 
 * Fogs will behave very similar to parallaxes in how they move about the
 * screen. This means that if a fog is set to looping, it will loop in
 * accordance to the screen's display coordinates. This is to maintain
 * consistency with how the RPG Maker MZ engine behaves.
 *
 * ---
 * 
 * Regions and Terrain Tags
 * 
 * If you don't want a fog to appear for the whole entire foreground and want
 * to confine them to certain areas of the map, you can assign regions or
 * terrain tags for them to appear in.
 * 
 * *NOTE*: This effect does not work on looping maps.
 * 
 * Only the parts of the map marked by the designated regions and/or terrain
 * tags will reveal the fog. Those parts will be little squares each,
 * equal to the size of a tile. They have soft borders due to blurring options.
 * The foggy tiles will be slightly larger than normal due to spill values.
 * 
 * You may notice that some tiles don't blur well when they are towards the
 * right and bottom sides of the screen when the blur values are higher than
 * normal. This is a known issue with Pixi JS's filters and there's not much
 * the VisuStella team can do about it. Instead, what we recommend is that you
 * use a fog vignette on an upper layer to mask the bleeding issue.
 * 
 * Each fog layer can have their own custom regions and/or terrain tags to
 * appear in. These can be adjusted through the notetag settings or through the
 * Plugin Commands provided by this plugin. Fog layers can be limited to
 * multiple regions and/or terrain tags at the same time.
 * 
 * WARNING: This will cause longer load times on larger maps and affect their
 * performance. We highly recommend that you don't use this feature on maps
 * larger than 120 tiles wide or tall. However, this value can vary from device
 * to device.
 * 
 * ---
 * 
 * Vignettes
 * 
 * If you don't want fogs to obscure the whole screen, use a vignette to make
 * them appear only at the sides of the screen. You can use custom vignette
 * masks or rendered ones provided by this plugin.
 * 
 * If you decide to make a custom vignette mask, create them similar to regular
 * image masks. This means that white areas of the masking image will be the
 * parts of the screen where the fog appears while the black areas of the image
 * will hide the fog. You can use gradients to make the vignette mask appear
 * more smooth.
 * 
 * Vignettes cannot be used with region and terrain tags. This is because the
 * region and terrain tag tiles move alongside the screen while vignettes are
 * always locked onto the borders of the screen. However, if you wish to use
 * both, just apply two different fog layers instead.
 * 
 * ---
 * 
 * Not For Battle
 * 
 * For clarification, the VisuStella MZ Visual Fogs plugin is NOT made for
 * battle. There's a separate plugin for that called Visual Battle Environment.
 * The reason why fogs aren't made for battle is because the way fogs are
 * handled in map vary from how they would be handled in battle. Using the
 * Visual Fogs Plugin Commands will only alter the fog appearances when the
 * player finishes battle.
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
 * === Fog-Related Notetags ===
 * 
 * ---
 *
 * <Fog id Settings>
 *  Name: filename
 *  optional property
 *  optional property
 *  optional property
 * </Fog id Settings>
 *
 * - Used for: Map Notetags
 * - Creates a regular fog layer for this map by default.
 * - Replace 'id' with a number value to assign to the fog.
 *   - Plugin Commands will refer to this ID for changes and removal.
 * - The 'Name' setting is required. Without it, no fog will be made.
 *   - Replace 'filename' with the filename of the image you want to use as
 *     a fog found in the game project's img/parallaxes/ folder.
 *   - Do not include the file extension.
 * - Insert as many of the optional properties as you want. You can find a list
 *   of them in the section below.
 *
 * ---
 * 
 * -=-=- Optional Properties -=-=-
 * 
 * Replace the 'optional property' segment of the notetags above with any of
 * the text below to acquire their effects. You can add/remove as many of the
 * optional properties as you need.
 * 
 * ---
 * 
 * Horz Scroll: x
 * Vert Scroll: y
 * 
 * - This enables horizontal or vertical scrolling for the fog.
 * - Replace 'x' or 'y' with a Number value to determine how fast they will
 *   scroll across the screen.
 * - Use a negative value to make them scroll the other way.
 * - These effects are mutually exclusive from the "Map Locked" property.
 * 
 * ---
 * 
 * Map Locked
 * 
 * - This will cause the fog to only scroll when the map scrolls.
 * - This has the same effect as naming a fog with "!" in front of
 *   its filename.
 * - If the filename used for this fog has "!" in front of it, the
 *   Map Locked effect will be automatically turned on.
 * - These effect is mutually exclusive from the "Horz Scroll" and
 *   "Vert Scroll" properties.
 * 
 * ---
 * 
 * Opacity: x
 * Opacity: x%
 * 
 * - Changes the opacity level of the fog.
 * - Replace 'x' with a number from 0 to 255 representing the opacity level.
 * - Replace 'x%' with a percentage from 0% to 100% representing the opacity.
 * 
 * ---
 * 
 * Blend Mode: Normal
 * Blend Mode: Additive
 * Blend Mode: Multiply
 * Blend Mode: Screen
 * 
 * - Sets the blend mode for the icon on the fog.
 * - Use only one of the above.
 * 
 * ---
 * 
 * Hue: x
 * Hue Shift: x
 * 
 * - Changes the hue of the fog to 'x' so that you don't need to create
 *   multiple copies of the files with different colors.
 * - Replace 'x' with a number value between 0 and 360.
 * - If the "Hue Shift" property is also used, then adjust the hue of the
 *   fog each frame by 'x' amount.
 *   - 'x' can be positive or negative.
 * 
 * ---
 * 
 * Color Tone: red, green, blue, gray
 * 
 * - Changes the color tone or tint of the fog.
 * - Replace 'red', 'green', 'blue' with a value between -255 and 255.
 * - Replace 'gray' with a value between 0 and 255.
 * 
 * ---
 * 
 * Region: id
 * Regions: id, id, id
 * 
 * - Forces the fog to only become visible on tiles marked regions with a
 *   matching ID (alongside valid terrain tags).
 * - If this isn't used, then the fog will be as large as the screen.
 * - Replace 'id' with a region ID between 1 and 255.
 *   - Region 0 is ignored and will not work.
 * - Insert multiple ID's to mark more tiles the fog can appear on.
 * - This feature cannot be used with Vignettes.
 * - This feature cannot be used with looping maps.
 * - WARNING: This WILL cause longer load times on larger maps.
 * 
 * ---
 * 
 * Terrain Tag: id
 * Terrain Tags: id, id, id
 * 
 * - Forces the fog to only become visible on tiles marked terrain tags
 *   with a matching ID (alongside valid regions).
 * - If this isn't used, then the fog will be as large as the screen.
 * - Replace 'id' with a terrain tag ID between 1 and 7.
 *   - Terrain tag 0 is ignored and will not work.
 * - Insert multiple ID's to mark more tiles the fog can appear on.
 * - This feature cannot be used with Vignettes.
 * - WARNING: This WILL cause longer load times on larger maps.
 * 
 * ---
 * 
 * Tile Blur: x
 * 
 * - Determines how soft the borders are around the revealed fog tiles.
 * - Use larger numbers to blur them more.
 * - Use a value of zero to remove any blur.
 * 
 * ---
 * 
 * Tile Spill: x
 * 
 * - Determines how much larger to make the revealed fog tiles.
 * - Use larger numbers to spill more and make the tiles larger.
 * - Use a value of zero to not spill at all and use the exact tile sizes.
 * 
 * ---
 * 
 * Vignette: type
 * 
 * - Makes the fog appear along the edge of the screen rather than the entire
 *   visible game screen.
 * - Replace 'type' with any of the following:
 *   - Border
 *   - Horizontal
 *   - Vertical
 *   - Upper
 *   - Lower
 *   - Left
 *   - Right
 * 
 * ---
 * 
 * Custom Vignette: filename
 * 
 * - Allows you to use a custom parallax image as a vignette.
 * - Replace 'filename' with the filename of the image you want to use as
 *   a vignette found in the game project's img/parallaxes/ folder.
 *   - Do not include the file extension.
 * - Custom vignettes are used as masks.
 *   - White areas on the image determine the visible parts of the fog.
 *   - Black areas on the image determine the invisible parts of the fog.
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
 * === Fog Plugin Commands ===
 * 
 * ---
 *
 * Fog: Add/Change Settings
 * - Add/Change settings for target fog.
 * - Does not alter the map editor's fog.
 *
 *   Required:
 *
 *     ID:
 *     - What is the ID of this fog to be added/changed?
 *
 *     Filename:
 *     - What is the filename of the fog?
 * 
 *   Optional Settings:
 * 
 *     Scrolling:
 * 
 *       Map Lock?:
 *       - Lock the fog to the map's scrolling?
 *       - Automatically enable if the filename starts with "!"
 *
 *       Loop Horizontally?:
 *       - Loop the fog horizontally?
 *       - Does not work with Map Lock enabled.
 *
 *         Scroll:
 *         - What is the horizontal scroll speed?
 *         - Use a negative value to invert the direction.
 *
 *       Loop Vertically?:
 *       - Loop the fog vertically?
 *       - Does not work with Map Lock enabled.
 *
 *         Scroll:
 *         - What is the vertical scroll speed?
 *         - Use a negative value to invert the direction.
 * 
 *     Appearance:
 *
 *       Opacity:
 *       - What is the opacity level for this fog?
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the fog?
 *       - You may use JavaScript code.
 *         - Normal
 *         - Additive
 *         - Multiply
 *         - Screen
 *
 *       Hue:
 *       - Do you wish to adjust this fog's hue?
 *       - You may use JavaScript code.
 *
 *       Hue Shift:
 *       - How much do you want the hue to shift each frame?
 *       - You may use JavaScript code.
 *
 *       Color Tone:
 *       - What tone do you want for the fog?
 *       - Format: [Red, Green, Blue, Gray]
 * 
 *     Location:
 *
 *       Regions:
 *       - Which regions will show this fog?
 *       - Does not work with 0. Leave empty to ignore.
 *
 *       Terrain Tags:
 *       - Which terrain tags will show this fog?
 *       - Does not work with 0. Leave empty to ignore.
 * 
 *       Tile Blur:
 *       - What's the blur level you wish to use for tiles?
 *       - You may use JavaScript code.
 * 
 *       Tile Spill:
 *       - What's the spill amount you wish to use for tiles?
 *       - You may use JavaScript code.
 * 
 *     Vignette:
 *
 *       Type:
 *       - What vignette do you want to use for this fog?
 *       - This will override location settings.
 * 
 *       Custom:
 *       - Do you wish to use a custom vignette instead?
 *       - Automatically changes the type to "Custom".
 *
 * ---
 * 
 * Fog: Fade Opacity
 * - Fades the target fog(s) opacity to a different value.
 * 
 *   ID(s):
 *   - Target which fog(s)?
 *   - Cannot target the map editor's fog.
 * 
 *   Target Opacity:
 *   - What opacity level to this value (0-255).
 *   - You may use JavaScript code to determine the value.
 * 
 *   Duration:
 *   - How many frames should this change take?
 *   - You may use JavaScript code to determine the value.
 * 
 * ---
 *
 * Fog: Remove
 * - Removes target fog(s).
 *
 *   ID(s):
 *   - Remove which fog(s)?
 *   - Cannot remove the map editor's fog.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Default Settings
 * ============================================================================
 *
 * The below are the default settings when it comes to creating fogs through
 * map notetags.
 *
 * ---
 *
 * Defaults
 * 
 *   Fog Opacity:
 *   - What is the default fog opacity level for map notetags?
 * 
 *   Blend Mode:
 *   - What is the default fog blend mode for map notetags?
 *     - Normal
 *     - Additive
 *     - Multiply
 *     - Screen
 * 
 *   Tile Blur:
 *   - What is the default fog tile blur intensity for map notetags?
 * 
 *   Tile Spill:
 *   - What is the default fog tile spill amount for map notetags?
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
 * Version 1.12: July 18, 2024
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * ** Uses a better algorithm to determine terrain tags.
 * 
 * Version 1.11: April 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where having a '!' at the start of a fog graphic file's name
 *    did not automatically incur map lock when done from plugin commands.
 *    Fix made by Arisu.
 * 
 * Version 1.10: November 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.09: August 17, 2023
 * * Bug Fixes!
 * ** Fixed an error that would cause a crash upon using the "Return to Title
 *    Screen" event command with the "Event Title Screen" plugin installed. Fix
 *    made by Irina.
 * 
 * Version 1.08: June 15, 2023
 * * Bug Fixes!
 * ** Fixes a visual bug involving the borders with the zoom animation upon
 *    entering a random encounter. Fix made by Arisu.
 * 
 * Version 1.07: August 4, 2022
 * * Compatibility Update!
 * ** Vignettes now work better with zoom.
 * 
 * Version 1.06: July 7, 2022
 * * Feature Update!
 * ** Blend modes are now revamped for the fogs to behave more like they do for
 *    pictures for better accuracy. Update made by Irina.
 * 
 * Version 1.05: December 9, 2021
 * * Documentation Update!
 * ** Added section to "Major Changes" for clarification purposes:
 * *** Not For Battle
 * *** For clarification, the VisuStella MZ Visual Fogs plugin is NOT made for
 *     battle. There's a separate plugin for that called Visual Battle
 *     Environment. The reason why fogs aren't made for battle is because the
 *     way fogs are handled in map vary from how they would be handled in
 *     battle. Using the Visual Fogs Plugin Commands will only alter the fog
 *     appearances when the player finishes battle.
 * * Feature Update!
 * ** Added fail safes to prevent Plugin Command usage during battle to cause
 *    problems while inside battle test. Update made by Irina.
 * 
 * Version 1.04: June 25, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for Event Title Scene.
 * 
 * Version 1.03: May 28, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.02: May 21, 2021
 * * Documentation Update!
 * ** Added a clause we forgot to mention that region-locked fog effects only
 *    work on maps with no looping. A note will be added to the "Regions and
 *    Terrain Tags" and notetag sections. We apologize for any inconveniences
 *    this may cause.
 * 
 * Version 1.01: May 7, 2021
 * * Bug Fixes!
 * ** Cached vignettes will no longer be cleared from memory. Fix by Irina.
 *
 * Version 1.00 Official Release Date: March 5, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FogAddChangeSettings
 * @text Fog: Add/Change Settings
 * @desc Add/Change settings for target fog.
 * Does not alter the map editor's fog.
 * 
 * @arg Required
 *
 * @arg id:num
 * @text ID
 * @parent Required
 * @type number
 * @min 1
 * @desc What is the ID of this fog to be added/changed?
 * @default 1
 *
 * @arg filename:str
 * @text Filename
 * @parent Required
 * @type file
 * @dir img/parallaxes/
 * @desc What is the filename of the fog?
 * @default >>>ATTENTION<<<
 *
 * @arg Optional:struct
 * @text Optional Settings
 * @type struct<Optional>
 * @desc Optional settings regarding Visual Fogs.
 * @default {"Scrolling":"","_fogZero:eval":"false","_fogLoopX:eval":"false","_fogSx:eval":"+0","_fogLoopY:eval":"false","_fogSy:eval":"+0","Appearance":"","opacity:eval":"200","blendMode:eval":"1","hue:eval":"0","hueShift:eval":"+0","colorTone:eval":"[0, 0, 0, 0]","Location":"","maskRegions:arraynum":"[]","maskTerrainTags:arraynum":"[]","maskBlur:eval":"10","maskSpill:eval":"10","Vignette":"","vignette:str":"None","vignetteFilename:str":""}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FogFadeOpacity
 * @text Fog: Fade Opacity
 * @desc Fades the target fog(s) opacity to a different value.
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Target which fog(s)?
 * Cannot target the map editor's fog.
 * @default ["1"]
 *
 * @arg targetOpacity:eval
 * @text Target Opacity
 * @desc What opacity level to this value (0-255).
 * You may use JavaScript code to determine the value.
 * @default 255
 *
 * @arg opacityDuration:eval
 * @text Duration
 * @desc How many frames should this change take?
 * You may use JavaScript code to determine the value.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FogRemove
 * @text Fog: Remove
 * @desc Removes target fog(s).
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Remove which fog(s)?
 * Cannot remove the map editor's fog.
 * @default ["1"]
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
 * @param VisualFogs
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Defaults
 *
 * @param FogOpacity:num
 * @text Fog Opacity
 * @parent Defaults
 * @type number
 * @max 255
 * @desc What is the default fog opacity level for map notetags?
 * @default 200
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Defaults
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What is the default fog blend mode for map notetags?
 * @default 1
 *
 * @param MaskBlur:num
 * @text Tile Blur
 * @parent Defaults
 * @type number
 * @desc What is the default fog tile blur intensity for map notetags?
 * @default 10
 *
 * @param MaskSpill:num
 * @text Tile Spill
 * @parent Defaults
 * @type number
 * @desc What is the default fog tile spill amount for map notetags?
 * @default 10
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
 * Optional Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Optional:
 * 
 * @param Scrolling
 * 
 * @param _fogZero:eval
 * @text Map Lock?
 * @parent Scrolling
 * @type boolean
 * @on Map Lock
 * @off No Map Lock
 * @desc Lock the fog to the map's scrolling?
 * Automatically enable if the filename starts with "!"
 * @default false
 * 
 * @param _fogLoopX:eval
 * @text Loop Horizontally?
 * @parent Scrolling
 * @type boolean
 * @on Loop
 * @off No Loop
 * @desc Loop the fog horizontally?
 * Does not work with Map Lock enabled.
 * @default false
 *
 * @param _fogSx:eval
 * @text Scroll:
 * @parent _fogLoopX:eval
 * @desc What is the horizontal scroll speed?
 * Use a negative value to invert the direction.
 * @default +0
 * 
 * @param _fogLoopY:eval
 * @text Loop Vertically?
 * @parent Scrolling
 * @type boolean
 * @on Loop
 * @off No Loop
 * @desc Loop the fog horizontally?
 * Does not work with Map Lock enabled.
 * @default false
 *
 * @param _fogSy:eval
 * @text Scroll:
 * @parent _fogLoopY:eval
 * @desc What is the vertical scroll speed?
 * Use a negative value to invert the direction.
 * @default +0
 * 
 * @param Appearance
 *
 * @param opacity:eval
 * @text Opacity
 * @parent Appearance
 * @desc What is the opacity level for this fog?
 * You may use JavaScript code.
 * @default 200
 *
 * @param blendMode:eval
 * @text Blend Mode
 * @parent Appearance
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the fog?
 * You may use JavaScript code.
 * @default 1
 *
 * @param hue:eval
 * @text Hue
 * @parent Appearance
 * @desc Do you wish to adjust this fog's hue?
 * You may use JavaScript code.
 * @default 0
 *
 * @param hueShift:eval
 * @text Hue Shift
 * @parent hue:eval
 * @desc How much do you want the hue to shift each frame?
 * You may use JavaScript code.
 * @default +0
 *
 * @param colorTone:eval
 * @text Color Tone
 * @parent Appearance
 * @desc What tone do you want for the fog?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 * 
 * @param Location
 *
 * @param maskRegions:arraynum
 * @text Regions
 * @parent Location
 * @type number[]
 * @min 1
 * @max 255
 * @desc Which regions will show this fog?
 * Does not work with 0. Leave empty to ignore.
 * @default []
 *
 * @param maskTerrainTags:arraynum
 * @text Terrain Tags
 * @parent Location
 * @type number[]
 * @min 1
 * @max 7
 * @desc Which terrain tags will show this fog?
 * Does not work with 0. Leave empty to ignore.
 * @default []
 *
 * @param maskBlur:eval
 * @text Tile Blur
 * @parent Location
 * @desc What's the blur level you wish to use for tiles?
 * You may use JavaScript code.
 * @default 10
 *
 * @param maskSpill:eval
 * @text Tile Spill
 * @parent Location
 * @desc What's the spill amount you wish to use for tiles?
 * You may use JavaScript code.
 * @default 10
 * 
 * @param Vignette
 *
 * @param vignette:str
 * @text Type
 * @parent Vignette
 * @type select
 * @option None
 * @option Border
 * @option Horizontal
 * @option Vertical
 * @option Upper
 * @option Lower
 * @option Left
 * @option Right
 * @desc What vignette do you want to use for this fog?
 * This will override location settings.
 * @default None
 *
 * @param vignetteFilename:str
 * @text Custom
 * @parent Vignette
 * @type file
 * @dir img/parallaxes/
 * @desc Do you wish to use a custom vignette instead?
 * Automatically changes the type to "Custom".
 * @default 
 *
 */
//=============================================================================

function _0x9c1b(){const _0x5ed8e6=['height','_displayY','_fogLoopY','fillRect','_colorTone','FogRemove','MULTIPLY','_maskFilter','setHue','DEFAULT_FOG_TILE_BLUR','clamp','clone','Tone','FogOpacity','MaskBlur','_visualFogSettings','_customModified','getVisualFogSettings','max','_id','_fogVignettes','ConvertParams','drawMaskTile','loadCustomVignette','scrollLeft','loadBitmap','none','opacityDuration','filename','registerCommand','Game_Map_updateParallax','filter','screenTileY','8MAdQRq','removeChild','getVisualFogOy','setColorTone','colorTone','656649anXHqF','VisuMZ_2_TileGrafterSystem','makeDeepCopy','Game_Map_scrollLeft','_maskSprite','push','NUM','_createColorFilter','equals','getFogVignette_right','_fogName','ARRAYJSON','DEFAULT_FOG_TILE_SPILL','_fogLoopX','isLoopVertical','NORMAL','_displayX','filters','maskBlur','isInstanceOfSceneMap','empty','getFogVignette_left','getFogVignette_lower','horizontal','_updateColorFilter','setup','createNewFogLayer','MaskRegions','indexOf','upper','updateVisualFogSettings','note','690oygJZC','OpacityFlat','loadParallax','5074490eMTBTx','updateTone','sortVisualFogs','name','_fogDataRef','DEFAULT_FOG_BLEND_MODE','children','Game_Map_setup','getFogVignette','MaskSpill','ARRAYNUM','vignette','TemplateSettings','_fogX','getFogVignette_empty','FUNC','PremadeVignette','#ffffff','width','Argument\x20must\x20be\x20an\x20array','VertLoop','_fogZero','10152FoXAIj','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','length','_fogSy','Filename','maskSpill','SpriteMaskFilter','_colorFilter','STRUCT','move','DEFAULT_FOG_OPACITY','_scene','updateVisualFogLayer','BlurFilter','5550453XjwTzB','parse','getVisualFogs','getFogVignette_%1','createMaskTileBitmap','targetOpacity','Game_Map_setDisplayPos','createMaskSprite','isSceneMap','trim','initialize','zoomScale','map','HorzLoop','description','regionId','EVAL','screenTileX','Settings','findTargetVisualFog','398760OSmpNw','Hue','Game_Map_scrollUp','scale','End','rgba(0,\x200,\x200,\x200)','isLoopHorizontal','removeVisualFog','JSON','list','format','Game_Map_scrollDown','hueShift','terrainTag','Start','update','tileWidth','blur','gradientFillRect','FogFadeOpacity','match','createMaskBitmap','15039486OHtkUr','updateHue','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','updateParallax','loadTemplateVignette','charAt','blendMode','_fogSx','toUpperCase','getFogVignette_border','hue','SCREEN','setupVisualFogs','floor','ARRAYFUNC','RegExp','settings','round','parameters','includes','displayX','ceil','origin','prototype','addChild','scrollDown','VisualFogs','_fogY','updateMask','maskTerrainTags','split','BlendMode','removeVisualFogLayer','toLowerCase','call','>>>ATTENTION<<<','_spriteset','Spriteset_Map_createWeather','4gIZgei','opacity','vignetteFilename','bind','getVisualFogOx','_fogContainer','lower','ARRAYSTRUCT','HueShift','_baseSprite','custom','scrollUp','constructor','updateOpacity','vertical','bitmap','addLoadListener','VisuMZ_4_MapCameraZoom','_grafterRefreshRegions','createFogContainer','CreateLayerData','createWeather','_hue','2bTKFzj','scrollRight','setDisplayPos','ARRAYSTR','exit','tileHeight','ADDITIVE','41110oEeeak','updateBlendMode','_blurFilter','maskRegions','addChangeVisualFog','ScrollLock','sort'];_0x9c1b=function(){return _0x5ed8e6;};return _0x9c1b();}const _0x41ba17=_0x2922;function _0x2922(_0x5d60a6,_0x17549b){const _0x9c1b17=_0x9c1b();return _0x2922=function(_0x29222b,_0x5b7ecf){_0x29222b=_0x29222b-0x1ce;let _0x5b2412=_0x9c1b17[_0x29222b];return _0x5b2412;},_0x2922(_0x5d60a6,_0x17549b);}(function(_0xb925c,_0x51dcdf){const _0x43c24c=_0x2922,_0x32185b=_0xb925c();while(!![]){try{const _0x75f88c=-parseInt(_0x43c24c(0x208))/0x1*(parseInt(_0x43c24c(0x201))/0x2)+parseInt(_0x43c24c(0x290))/0x3*(-parseInt(_0x43c24c(0x1ea))/0x4)+-parseInt(_0x43c24c(0x255))/0x5*(-parseInt(_0x43c24c(0x26e))/0x6)+parseInt(_0x43c24c(0x235))/0x7+-parseInt(_0x43c24c(0x230))/0x8*(parseInt(_0x43c24c(0x27c))/0x9)+-parseInt(_0x43c24c(0x258))/0xa+parseInt(_0x43c24c(0x2a6))/0xb;if(_0x75f88c===_0x51dcdf)break;else _0x32185b['push'](_0x32185b['shift']());}catch(_0x2f3897){_0x32185b['push'](_0x32185b['shift']());}}}(_0x9c1b,0x60c2d));var label=_0x41ba17(0x1de),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x41ba17(0x22e)](function(_0x9af8fd){const _0x588ade=_0x41ba17;return _0x9af8fd['status']&&_0x9af8fd[_0x588ade(0x28a)][_0x588ade(0x1d7)]('['+label+']');})[0x0];VisuMZ[label][_0x41ba17(0x28e)]=VisuMZ[label][_0x41ba17(0x28e)]||{},VisuMZ['ConvertParams']=function(_0x132f76,_0x5359b3){const _0x55231d=_0x41ba17;for(const _0x2cb39d in _0x5359b3){if(_0x2cb39d[_0x55231d(0x2a4)](/(.*):(.*)/i)){const _0x22f77e=String(RegExp['$1']),_0x2fe860=String(RegExp['$2'])[_0x55231d(0x2ae)]()[_0x55231d(0x285)]();let _0x5c61a7,_0x40e244,_0x4a30d0;switch(_0x2fe860){case _0x55231d(0x23b):_0x5c61a7=_0x5359b3[_0x2cb39d]!==''?Number(_0x5359b3[_0x2cb39d]):0x0;break;case _0x55231d(0x262):_0x40e244=_0x5359b3[_0x2cb39d]!==''?JSON[_0x55231d(0x27d)](_0x5359b3[_0x2cb39d]):[],_0x5c61a7=_0x40e244[_0x55231d(0x288)](_0x52c22a=>Number(_0x52c22a));break;case _0x55231d(0x28c):_0x5c61a7=_0x5359b3[_0x2cb39d]!==''?eval(_0x5359b3[_0x2cb39d]):null;break;case'ARRAYEVAL':_0x40e244=_0x5359b3[_0x2cb39d]!==''?JSON['parse'](_0x5359b3[_0x2cb39d]):[],_0x5c61a7=_0x40e244[_0x55231d(0x288)](_0x36884b=>eval(_0x36884b));break;case _0x55231d(0x298):_0x5c61a7=_0x5359b3[_0x2cb39d]!==''?JSON[_0x55231d(0x27d)](_0x5359b3[_0x2cb39d]):'';break;case _0x55231d(0x240):_0x40e244=_0x5359b3[_0x2cb39d]!==''?JSON['parse'](_0x5359b3[_0x2cb39d]):[],_0x5c61a7=_0x40e244['map'](_0x2504e1=>JSON[_0x55231d(0x27d)](_0x2504e1));break;case _0x55231d(0x267):_0x5c61a7=_0x5359b3[_0x2cb39d]!==''?new Function(JSON['parse'](_0x5359b3[_0x2cb39d])):new Function('return\x200');break;case _0x55231d(0x1d2):_0x40e244=_0x5359b3[_0x2cb39d]!==''?JSON[_0x55231d(0x27d)](_0x5359b3[_0x2cb39d]):[],_0x5c61a7=_0x40e244[_0x55231d(0x288)](_0x4b0c4c=>new Function(JSON[_0x55231d(0x27d)](_0x4b0c4c)));break;case'STR':_0x5c61a7=_0x5359b3[_0x2cb39d]!==''?String(_0x5359b3[_0x2cb39d]):'';break;case _0x55231d(0x204):_0x40e244=_0x5359b3[_0x2cb39d]!==''?JSON['parse'](_0x5359b3[_0x2cb39d]):[],_0x5c61a7=_0x40e244[_0x55231d(0x288)](_0x4d2a2c=>String(_0x4d2a2c));break;case _0x55231d(0x276):_0x4a30d0=_0x5359b3[_0x2cb39d]!==''?JSON[_0x55231d(0x27d)](_0x5359b3[_0x2cb39d]):{},_0x5c61a7=VisuMZ[_0x55231d(0x224)]({},_0x4a30d0);break;case _0x55231d(0x1f1):_0x40e244=_0x5359b3[_0x2cb39d]!==''?JSON['parse'](_0x5359b3[_0x2cb39d]):[],_0x5c61a7=_0x40e244['map'](_0x4ada55=>VisuMZ['ConvertParams']({},JSON[_0x55231d(0x27d)](_0x4ada55)));break;default:continue;}_0x132f76[_0x22f77e]=_0x5c61a7;}}return _0x132f76;},(_0x1823ec=>{const _0x4c35f5=_0x41ba17,_0x5bb8d9=_0x1823ec[_0x4c35f5(0x25b)];for(const _0x4b1029 of dependencies){if(!Imported[_0x4b1029]){alert(_0x4c35f5(0x2a8)['format'](_0x5bb8d9,_0x4b1029)),SceneManager['exit']();break;}}const _0x16add7=_0x1823ec[_0x4c35f5(0x28a)];if(_0x16add7[_0x4c35f5(0x2a4)](/\[Version[ ](.*?)\]/i)){const _0x46c195=Number(RegExp['$1']);_0x46c195!==VisuMZ[label]['version']&&(alert(_0x4c35f5(0x26f)[_0x4c35f5(0x29a)](_0x5bb8d9,_0x46c195)),SceneManager[_0x4c35f5(0x205)]());}if(_0x16add7['match'](/\[Tier[ ](\d+)\]/i)){const _0x2aed99=Number(RegExp['$1']);_0x2aed99<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x4c35f5(0x29a)](_0x5bb8d9,_0x2aed99,tier)),SceneManager[_0x4c35f5(0x205)]()):tier=Math[_0x4c35f5(0x221)](_0x2aed99,tier);}VisuMZ[_0x4c35f5(0x224)](VisuMZ[label][_0x4c35f5(0x28e)],_0x1823ec[_0x4c35f5(0x1d6)]);})(pluginData),VisuMZ[_0x41ba17(0x1de)][_0x41ba17(0x264)]=function(){const _0x25f0a=_0x41ba17;return{'id':0x0,'filename':'','_fogZero':![],'_fogLoopX':![],'_fogLoopY':![],'_fogSx':0x0,'_fogSy':0x0,'_fogX':0x0,'_fogY':0x0,'opacity':Game_Map[_0x25f0a(0x278)],'targetOpacity':Game_Map[_0x25f0a(0x278)],'opacityDuration':0x0,'blendMode':Game_Map[_0x25f0a(0x25d)],'hue':0x0,'hueShift':0x0,'colorTone':[0x0,0x0,0x0,0x0],'maskRegions':[],'maskTerrainTags':[],'maskBlur':Game_Map[_0x25f0a(0x218)],'maskSpill':Game_Map[_0x25f0a(0x241)],'vignette':'none','vignetteFilename':''};},PluginManager[_0x41ba17(0x22c)](pluginData[_0x41ba17(0x25b)],'FogAddChangeSettings',_0x44c328=>{const _0x304afa=_0x41ba17;VisuMZ[_0x304afa(0x224)](_0x44c328,_0x44c328);if(_0x44c328['id']<=0x0)return;if(_0x44c328[_0x304afa(0x22b)]===''||_0x44c328[_0x304afa(0x22b)]===_0x304afa(0x1e7))return;let _0x5c2fc0=JsonEx[_0x304afa(0x237)](_0x44c328['Optional']);if(!_0x5c2fc0['hasOwnProperty'](_0x304afa(0x20b)))_0x5c2fc0=VisuMZ[_0x304afa(0x1de)][_0x304afa(0x264)]();_0x5c2fc0[_0x304afa(0x22b)]=_0x44c328[_0x304afa(0x22b)],_0x5c2fc0['id']=_0x44c328['id'];while(_0x5c2fc0[_0x304afa(0x234)][_0x304afa(0x270)]<0x4){_0x5c2fc0['colorTone'][_0x304afa(0x23a)](0x0);}_0x5c2fc0[_0x304afa(0x265)]=0x0,_0x5c2fc0[_0x304afa(0x1df)]=0x0,_0x5c2fc0[_0x304afa(0x281)]=_0x44c328[_0x304afa(0x1eb)],_0x5c2fc0[_0x304afa(0x22a)]=0x0,_0x5c2fc0[_0x304afa(0x263)]=_0x5c2fc0[_0x304afa(0x263)]||'none',_0x5c2fc0[_0x304afa(0x263)]=_0x5c2fc0[_0x304afa(0x263)][_0x304afa(0x1e5)]()[_0x304afa(0x285)](),_0x5c2fc0[_0x304afa(0x1ec)]!==''&&(_0x5c2fc0[_0x304afa(0x263)]=_0x304afa(0x1f4)),$gameMap[_0x304afa(0x20c)](_0x5c2fc0);}),PluginManager['registerCommand'](pluginData[_0x41ba17(0x25b)],_0x41ba17(0x2a3),_0x4949ab=>{const _0x395ed0=_0x41ba17;if(!SceneManager[_0x395ed0(0x248)]())return;VisuMZ[_0x395ed0(0x224)](_0x4949ab,_0x4949ab);const _0xdc2a52=_0x4949ab[_0x395ed0(0x299)];for(const _0x2ed37f of _0xdc2a52){const _0x35af9e=$gameMap[_0x395ed0(0x220)](_0x2ed37f);if(!_0x35af9e)continue;_0x35af9e[_0x395ed0(0x281)]=_0x4949ab[_0x395ed0(0x281)]||0x0,_0x35af9e['opacityDuration']=_0x4949ab['opacityDuration']||0x0,_0x35af9e['opacityDuration']<=0x0&&(_0x35af9e[_0x395ed0(0x1eb)]=_0x35af9e[_0x395ed0(0x281)]);}}),PluginManager['registerCommand'](pluginData[_0x41ba17(0x25b)],_0x41ba17(0x214),_0x1e5d66=>{const _0xda2c2f=_0x41ba17;if(!SceneManager[_0xda2c2f(0x248)]())return;VisuMZ[_0xda2c2f(0x224)](_0x1e5d66,_0x1e5d66);const _0x40767f=_0x1e5d66[_0xda2c2f(0x299)];for(const _0x18f4bc of _0x40767f){$gameMap[_0xda2c2f(0x297)](_0x18f4bc);}}),VisuMZ[_0x41ba17(0x1de)][_0x41ba17(0x1d3)]={'Start':/<(?:FOG)[ ](\d+)[ ](?:SETTING|SETTINGS)>/i,'End':/<\/(?:FOG)[ ](\d+)[ ](?:SETTING|SETTINGS)>/i,'Filename':/(?:FILENAME|NAME):[ ](.*)/i,'HorzLoop':/(?:HORZ|HORIZONTAL) (?:LOOP|SCROLL):[ ](.*)/i,'VertLoop':/(?:VERT|VERTICAL) (?:LOOP|SCROLL):[ ](.*)/i,'ScrollLock':/<(?:MAP|SCROLL)[ ](?:LOCK|LOCKED)>/i,'OpacityRate':/(?:OPACITY):[ ](\d+)([%％])/i,'OpacityFlat':/(?:OPACITY):[ ](\d+)/i,'BlendMode':/BLEND MODE:[ ](.*)/i,'Hue':/HUE:[ ](\d+)/i,'HueShift':/HUE (?:SHIFT|SPEED):[ ](.*)/i,'Tone':/(?:COLOR TONE|TONE|TINT):[ ](.*)/i,'MaskRegions':/(?:REGION|REGIONS):[ ](.*)/i,'MaskTerrainTags':/TERRAIN (?:TAG|TAGS):[ ](.*)/i,'MaskBlur':/(?:TILE BLUR|BLUR):[ ](.*)/i,'MaskSpill':/(?:TILE SPILL|SPILL):[ ](.*)/i,'CustomVignette':/CUSTOM (?:VIGNETTE|OVERLAY):[ ](.*)/i,'PremadeVignette':/(?:VIGNETTE|OVERLAY):[ ](.*)/i},ImageManager[_0x41ba17(0x260)]=function(_0x404b3f){const _0x18967a=_0x41ba17;if(!_0x404b3f)return this[_0x18967a(0x266)]();this[_0x18967a(0x223)]=this[_0x18967a(0x223)]||{},_0x404b3f=_0x404b3f['toLowerCase']()[_0x18967a(0x285)]();const _0x668e5f=_0x18967a(0x27f)[_0x18967a(0x29a)](_0x404b3f);if(this[_0x18967a(0x223)][_0x404b3f])return this[_0x18967a(0x223)][_0x404b3f];else return this[_0x668e5f]?this[_0x668e5f]():this[_0x18967a(0x266)]();},ImageManager['getFogVignette_empty']=function(){const _0x561333=_0x41ba17;if(this['_fogVignettes'][_0x561333(0x249)])return this[_0x561333(0x223)][_0x561333(0x249)];const _0x69b22e=new Bitmap(Graphics[_0x561333(0x26a)],Graphics[_0x561333(0x20f)]);return _0x69b22e[_0x561333(0x212)](0x0,0x0,_0x69b22e['width'],_0x69b22e[_0x561333(0x20f)],_0x561333(0x269)),_0x69b22e['_customModified']=![],this[_0x561333(0x223)]=this[_0x561333(0x223)]||{},this[_0x561333(0x223)]['empty']=_0x69b22e,_0x69b22e;},ImageManager['getFogVignette_upper']=function(){const _0x49f46f=_0x41ba17,_0x3ccfb7=new Bitmap(Graphics[_0x49f46f(0x26a)],Graphics['height']),_0x5911e1='rgba(0,\x200,\x200,\x200)',_0x2cc0d4=_0x49f46f(0x269);return _0x3ccfb7[_0x49f46f(0x2a2)](0x0,0x0,Graphics[_0x49f46f(0x26a)],Math[_0x49f46f(0x1d9)](Graphics[_0x49f46f(0x20f)]/0x3),_0x2cc0d4,_0x5911e1,!![]),_0x3ccfb7[_0x49f46f(0x21f)]=![],this[_0x49f46f(0x223)]=this[_0x49f46f(0x223)]||{},this[_0x49f46f(0x223)][_0x49f46f(0x252)]=_0x3ccfb7,_0x3ccfb7;},ImageManager[_0x41ba17(0x24b)]=function(){const _0x4238e1=_0x41ba17,_0x258dcd=new Bitmap(Graphics[_0x4238e1(0x26a)],Graphics[_0x4238e1(0x20f)]),_0x2bbbc8='rgba(0,\x200,\x200,\x200)',_0x586492=_0x4238e1(0x269);return _0x258dcd[_0x4238e1(0x2a2)](0x0,Math[_0x4238e1(0x1d9)](Graphics[_0x4238e1(0x20f)]*0x2/0x3),Graphics[_0x4238e1(0x26a)],Math[_0x4238e1(0x1d9)](Graphics[_0x4238e1(0x20f)]/0x3),_0x2bbbc8,_0x586492,!![]),_0x258dcd[_0x4238e1(0x21f)]=![],this[_0x4238e1(0x223)]=this['_fogVignettes']||{},this['_fogVignettes'][_0x4238e1(0x1f0)]=_0x258dcd,_0x258dcd;},ImageManager['getFogVignette_horizontal']=function(){const _0x1b8ee5=_0x41ba17,_0x52c10e=new Bitmap(Graphics[_0x1b8ee5(0x26a)],Graphics['height']),_0x1a8f7d=_0x1b8ee5(0x295),_0xda5b44=_0x1b8ee5(0x269);return _0x52c10e[_0x1b8ee5(0x2a2)](0x0,0x0,Graphics[_0x1b8ee5(0x26a)],Math[_0x1b8ee5(0x1d9)](Graphics['height']/0x3),_0xda5b44,_0x1a8f7d,!![]),_0x52c10e[_0x1b8ee5(0x2a2)](0x0,Math['ceil'](Graphics[_0x1b8ee5(0x20f)]*0x2/0x3),Graphics[_0x1b8ee5(0x26a)],Math[_0x1b8ee5(0x1d9)](Graphics['height']/0x3),_0x1a8f7d,_0xda5b44,!![]),_0x52c10e['_customModified']=![],this[_0x1b8ee5(0x223)]=this[_0x1b8ee5(0x223)]||{},this[_0x1b8ee5(0x223)][_0x1b8ee5(0x24c)]=_0x52c10e,_0x52c10e;},ImageManager[_0x41ba17(0x24a)]=function(){const _0x5ad901=_0x41ba17,_0x458178=new Bitmap(Graphics['width'],Graphics[_0x5ad901(0x20f)]),_0x3f4b4a=_0x5ad901(0x295),_0xcbafad=_0x5ad901(0x269);return _0x458178['gradientFillRect'](0x0,0x0,Math[_0x5ad901(0x1d9)](Graphics['width']/0x3),Graphics[_0x5ad901(0x20f)],_0xcbafad,_0x3f4b4a,![]),_0x458178['_customModified']=![],this[_0x5ad901(0x223)]=this[_0x5ad901(0x223)]||{},this[_0x5ad901(0x223)]['left']=_0x458178,_0x458178;},ImageManager[_0x41ba17(0x23e)]=function(){const _0x440bde=_0x41ba17,_0x28593e=new Bitmap(Graphics[_0x440bde(0x26a)],Graphics[_0x440bde(0x20f)]),_0xe649ea=_0x440bde(0x295),_0x5a1a39='#ffffff';return _0x28593e[_0x440bde(0x2a2)](Math['ceil'](Graphics[_0x440bde(0x26a)]*0x2/0x3),0x0,Math['ceil'](Graphics['width']/0x3),Graphics[_0x440bde(0x20f)],_0xe649ea,_0x5a1a39,![]),_0x28593e['_customModified']=![],this[_0x440bde(0x223)]=this[_0x440bde(0x223)]||{},this[_0x440bde(0x223)]['right']=_0x28593e,_0x28593e;},ImageManager['getFogVignette_vertical']=function(){const _0xcae890=_0x41ba17,_0x4cdd79=new Bitmap(Graphics[_0xcae890(0x26a)],Graphics['height']),_0x21b29b=_0xcae890(0x295),_0x14446f='#ffffff';return _0x4cdd79[_0xcae890(0x2a2)](0x0,0x0,Math[_0xcae890(0x1d9)](Graphics[_0xcae890(0x26a)]/0x3),Graphics['height'],_0x14446f,_0x21b29b,![]),_0x4cdd79[_0xcae890(0x2a2)](Math[_0xcae890(0x1d9)](Graphics['width']*0x2/0x3),0x0,Math[_0xcae890(0x1d9)](Graphics[_0xcae890(0x26a)]/0x3),Graphics['height'],_0x21b29b,_0x14446f,![]),_0x4cdd79['_customModified']=![],this['_fogVignettes']=this[_0xcae890(0x223)]||{},this[_0xcae890(0x223)][_0xcae890(0x1f8)]=_0x4cdd79,_0x4cdd79;},ImageManager[_0x41ba17(0x2af)]=function(){const _0x3c87b5=_0x41ba17,_0x2bac31=new Bitmap(Graphics['width'],Graphics['height']),_0x4eab42=_0x3c87b5(0x295),_0x750ace='#ffffff';return _0x2bac31[_0x3c87b5(0x2a2)](0x0,0x0,Graphics[_0x3c87b5(0x26a)],Math[_0x3c87b5(0x1d9)](Graphics[_0x3c87b5(0x20f)]/0x3),_0x750ace,_0x4eab42,!![]),_0x2bac31['gradientFillRect'](0x0,Math[_0x3c87b5(0x1d9)](Graphics[_0x3c87b5(0x20f)]*0x2/0x3),Graphics[_0x3c87b5(0x26a)],Math['ceil'](Graphics[_0x3c87b5(0x20f)]/0x3),_0x4eab42,_0x750ace,!![]),_0x2bac31['gradientFillRect'](0x0,0x0,Math[_0x3c87b5(0x1d9)](Graphics[_0x3c87b5(0x26a)]/0x3),Graphics['height'],_0x750ace,_0x4eab42,![]),_0x2bac31[_0x3c87b5(0x2a2)](Math[_0x3c87b5(0x1d9)](Graphics['width']*0x2/0x3),0x0,Math[_0x3c87b5(0x1d9)](Graphics['width']/0x3),Graphics[_0x3c87b5(0x20f)],_0x4eab42,_0x750ace,![]),_0x2bac31[_0x3c87b5(0x21f)]=![],this[_0x3c87b5(0x223)]=this[_0x3c87b5(0x223)]||{},this['_fogVignettes']['border']=_0x2bac31,_0x2bac31;},SceneManager[_0x41ba17(0x284)]=function(){const _0x2aff50=_0x41ba17;return this[_0x2aff50(0x279)]&&this['_scene'][_0x2aff50(0x1f6)]===Scene_Map;},SceneManager[_0x41ba17(0x248)]=function(){const _0x3fbc19=_0x41ba17;return this[_0x3fbc19(0x279)]&&this['_scene']instanceof Scene_Map;},VisuMZ[_0x41ba17(0x1de)][_0x41ba17(0x25f)]=Game_Map[_0x41ba17(0x1db)][_0x41ba17(0x24e)],Game_Map[_0x41ba17(0x1db)][_0x41ba17(0x24e)]=function(_0x2bf848){const _0x43c983=_0x41ba17;VisuMZ[_0x43c983(0x1de)][_0x43c983(0x25f)][_0x43c983(0x1e6)](this,_0x2bf848),this['setupVisualFogs']();},Game_Map[_0x41ba17(0x278)]=VisuMZ[_0x41ba17(0x1de)][_0x41ba17(0x28e)][_0x41ba17(0x21c)],Game_Map[_0x41ba17(0x25d)]=VisuMZ[_0x41ba17(0x1de)][_0x41ba17(0x28e)][_0x41ba17(0x1e3)],Game_Map[_0x41ba17(0x218)]=VisuMZ[_0x41ba17(0x1de)]['Settings'][_0x41ba17(0x21d)],Game_Map['DEFAULT_FOG_TILE_SPILL']=VisuMZ[_0x41ba17(0x1de)][_0x41ba17(0x28e)][_0x41ba17(0x261)],Game_Map['prototype']['setupVisualFogs']=function(){const _0x396515=_0x41ba17;this[_0x396515(0x21e)]=[null];if(!$dataMap)return;const _0xac7f91=VisuMZ[_0x396515(0x1de)][_0x396515(0x1fe)]();for(const _0x920de1 of _0xac7f91){if(!_0x920de1)continue;this[_0x396515(0x21e)][_0x920de1['id']]=_0x920de1;}},VisuMZ[_0x41ba17(0x1de)]['CreateLayerData']=function(){const _0x5f83e5=_0x41ba17;if(!$dataMap)return[];const _0xde94a5=[],_0x7ef7ca=VisuMZ[_0x5f83e5(0x1de)][_0x5f83e5(0x264)]();if(!$dataMap[_0x5f83e5(0x254)])return[];const _0x50ecad=VisuMZ[_0x5f83e5(0x1de)][_0x5f83e5(0x1d3)],_0xfb8aac=$dataMap[_0x5f83e5(0x254)]['split'](/[\r\n]+/);let _0x345ecf=JsonEx[_0x5f83e5(0x237)](_0x7ef7ca);for(const _0xc94455 of _0xfb8aac){if(_0xc94455[_0x5f83e5(0x2a4)](_0x50ecad[_0x5f83e5(0x29e)]))_0x345ecf['id']=Number(RegExp['$1']);else{if(_0xc94455[_0x5f83e5(0x2a4)](_0x50ecad[_0x5f83e5(0x294)])){const _0x2664e1=Number(RegExp['$1']);if(_0x2664e1>0x0&&_0x2664e1===_0x345ecf['id']&&_0x345ecf[_0x5f83e5(0x22b)]!=='')_0xde94a5[_0x5f83e5(0x23a)](_0x345ecf);_0x345ecf=JsonEx[_0x5f83e5(0x237)](_0x7ef7ca);}else{if(_0x345ecf['id']<=0x0)continue;}}if(_0xc94455['match'](_0x50ecad[_0x5f83e5(0x272)]))_0x345ecf[_0x5f83e5(0x22b)]=String(RegExp['$1'])['trim'](),_0x345ecf['filename']['charAt'](0x0)==='!'&&(_0x345ecf['_fogZero']=!![]);else{if(_0xc94455[_0x5f83e5(0x2a4)](_0x50ecad[_0x5f83e5(0x289)]))_0x345ecf[_0x5f83e5(0x242)]=!![],_0x345ecf[_0x5f83e5(0x2ad)]=Number(RegExp['$1'])||0x0;else{if(_0xc94455[_0x5f83e5(0x2a4)](_0x50ecad[_0x5f83e5(0x26c)]))_0x345ecf[_0x5f83e5(0x211)]=!![],_0x345ecf[_0x5f83e5(0x271)]=Number(RegExp['$1'])||0x0;else{if(_0xc94455[_0x5f83e5(0x2a4)](_0x50ecad[_0x5f83e5(0x20d)]))_0x345ecf[_0x5f83e5(0x26d)]=!![];else{if(_0xc94455[_0x5f83e5(0x2a4)](_0x50ecad['OpacityRate'])){const _0x353bc2=Number(RegExp['$1'])*0.01;_0x345ecf['opacity']=Math[_0x5f83e5(0x1d5)](_0x353bc2*0xff)[_0x5f83e5(0x219)](0x0,0xff);}else{if(_0xc94455[_0x5f83e5(0x2a4)](_0x50ecad[_0x5f83e5(0x256)]))_0x345ecf[_0x5f83e5(0x1eb)]=Number(RegExp['$1'])[_0x5f83e5(0x219)](0x0,0xff);else{if(_0xc94455[_0x5f83e5(0x2a4)](_0x50ecad[_0x5f83e5(0x1e3)])){const _0x262be2=String(RegExp['$1'])[_0x5f83e5(0x2ae)]()[_0x5f83e5(0x285)](),_0x5831d9=[_0x5f83e5(0x244),_0x5f83e5(0x207),_0x5f83e5(0x215),_0x5f83e5(0x1cf)];_0x345ecf[_0x5f83e5(0x2ac)]=_0x5831d9[_0x5f83e5(0x251)](_0x262be2)[_0x5f83e5(0x219)](0x0,0x3);}else{if(_0xc94455[_0x5f83e5(0x2a4)](_0x50ecad[_0x5f83e5(0x291)]))_0x345ecf['hue']=Number(RegExp['$1'])[_0x5f83e5(0x219)](0x0,0x168);else{if(_0xc94455[_0x5f83e5(0x2a4)](_0x50ecad[_0x5f83e5(0x1f2)]))_0x345ecf[_0x5f83e5(0x29c)]=Number(RegExp['$1'])||0x0;else{if(_0xc94455[_0x5f83e5(0x2a4)](_0x50ecad[_0x5f83e5(0x21b)])){const _0x549ee2=String(RegExp['$1'])[_0x5f83e5(0x1e2)](',')[_0x5f83e5(0x288)](_0x5ce07c=>Number(_0x5ce07c)||0x0);while(_0x549ee2[_0x5f83e5(0x270)]<0x4)_0x549ee2[_0x5f83e5(0x23a)](0x0);_0x345ecf[_0x5f83e5(0x234)]=_0x549ee2;}else{if(_0xc94455[_0x5f83e5(0x2a4)](_0x50ecad[_0x5f83e5(0x250)])){const _0x40169b=String(RegExp['$1'])[_0x5f83e5(0x1e2)](',')['map'](_0x3e43db=>Number(_0x3e43db)||0x1);_0x345ecf[_0x5f83e5(0x20b)]=_0x40169b;}else{if(_0xc94455['match'](_0x50ecad['MaskTerrainTags'])){const _0x1308d6=String(RegExp['$1'])['split'](',')[_0x5f83e5(0x288)](_0x219ec8=>Number(_0x219ec8)||0x1);_0x345ecf[_0x5f83e5(0x1e1)]=_0x1308d6;}else{if(_0xc94455[_0x5f83e5(0x2a4)](_0x50ecad['MaskBlur']))_0x345ecf[_0x5f83e5(0x247)]=Math[_0x5f83e5(0x221)](Number(RegExp['$1'])||0x0,0x0);else{if(_0xc94455[_0x5f83e5(0x2a4)](_0x50ecad[_0x5f83e5(0x261)]))_0x345ecf[_0x5f83e5(0x273)]=Math[_0x5f83e5(0x221)](Number(RegExp['$1'])||0x0,0x0);else{if(_0xc94455[_0x5f83e5(0x2a4)](_0x50ecad['CustomVignette']))_0x345ecf[_0x5f83e5(0x1ec)]=(String(RegExp['$1'])||'')[_0x5f83e5(0x285)](),_0x345ecf[_0x5f83e5(0x263)]='custom';else _0xc94455[_0x5f83e5(0x2a4)](_0x50ecad[_0x5f83e5(0x268)])&&(_0x345ecf[_0x5f83e5(0x263)]=(String(RegExp['$1'])||'')[_0x5f83e5(0x1e5)]());}}}}}}}}}}}}}}}return _0xde94a5;},Game_Map[_0x41ba17(0x1db)]['getVisualFogs']=function(){const _0x50d6c9=_0x41ba17;return this[_0x50d6c9(0x21e)]===undefined&&this[_0x50d6c9(0x1d0)](),this[_0x50d6c9(0x21e)]['filter'](_0x9ec771=>!!_0x9ec771);},Game_Map['prototype'][_0x41ba17(0x220)]=function(_0x2647dc){const _0x528850=_0x41ba17;return this[_0x528850(0x21e)]=this[_0x528850(0x21e)]||[],this[_0x528850(0x21e)][_0x2647dc]||null;},Game_Map[_0x41ba17(0x1db)][_0x41ba17(0x1ee)]=function(_0x3f2a05){const _0x5e4a6b=_0x41ba17,_0xfbac07=this[_0x5e4a6b(0x220)](_0x3f2a05);if(_0xfbac07[_0x5e4a6b(0x26d)])return _0xfbac07[_0x5e4a6b(0x265)]*this[_0x5e4a6b(0x2a0)]();else return _0xfbac07['_fogLoopX']?_0xfbac07[_0x5e4a6b(0x265)]*this[_0x5e4a6b(0x2a0)]()/0x2:0x0;},Game_Map[_0x41ba17(0x1db)][_0x41ba17(0x232)]=function(_0x59c30b){const _0x1a5081=_0x41ba17,_0xdff266=this['getVisualFogSettings'](_0x59c30b);if(_0xdff266[_0x1a5081(0x26d)])return _0xdff266['_fogY']*this[_0x1a5081(0x206)]();else return _0xdff266[_0x1a5081(0x211)]?_0xdff266['_fogY']*this['tileHeight']()/0x2:0x0;},Game_Map[_0x41ba17(0x1db)][_0x41ba17(0x297)]=function(_0x56a3a3){const _0x4ce045=_0x41ba17;this[_0x4ce045(0x21e)]=this['_visualFogSettings']||[];if(!this[_0x4ce045(0x21e)][_0x56a3a3])return;this[_0x4ce045(0x21e)][_0x56a3a3]=null;const _0x56d567=SceneManager['_scene']['_spriteset'];_0x56d567&&_0x56d567[_0x4ce045(0x1e4)](_0x56a3a3);},Game_Map[_0x41ba17(0x1db)][_0x41ba17(0x20c)]=function(_0xcab798){const _0x4c6046=_0x41ba17,_0x526ffc=_0xcab798['id'];_0xcab798[_0x4c6046(0x22b)][_0x4c6046(0x2ab)](0x0)==='!'&&(_0xcab798[_0x4c6046(0x26d)]=!![]);let _0x378043=![];this[_0x4c6046(0x21e)]=this[_0x4c6046(0x21e)]||[];if(this[_0x4c6046(0x21e)][_0x526ffc]){const _0x4bc61a=this['_visualFogSettings'][_0x526ffc];if(!_0x4bc61a[_0x4c6046(0x20b)][_0x4c6046(0x23d)](_0xcab798[_0x4c6046(0x20b)]))_0x378043=!![];else{if(!_0x4bc61a[_0x4c6046(0x1e1)][_0x4c6046(0x23d)](_0xcab798[_0x4c6046(0x1e1)]))_0x378043=!![];else _0x4bc61a[_0x4c6046(0x263)]!=='none'&&(_0x378043=!![]);}}this[_0x4c6046(0x21e)][_0x526ffc]=_0xcab798;if(!SceneManager[_0x4c6046(0x284)]())return;const _0x598051=SceneManager[_0x4c6046(0x279)][_0x4c6046(0x1e8)];_0x598051&&_0x598051[_0x4c6046(0x27a)](_0x526ffc,_0x378043);},VisuMZ['VisualFogs'][_0x41ba17(0x282)]=Game_Map['prototype']['setDisplayPos'],Game_Map['prototype'][_0x41ba17(0x203)]=function(_0x3fb3bd,_0x50f0b4){const _0x406602=_0x41ba17;VisuMZ[_0x406602(0x1de)][_0x406602(0x282)]['call'](this,_0x3fb3bd,_0x50f0b4);for(const _0x1f0b37 of this[_0x406602(0x27e)]()){if(!_0x1f0b37)continue;this[_0x406602(0x296)]()?_0x1f0b37[_0x406602(0x265)]=_0x3fb3bd:_0x1f0b37[_0x406602(0x265)]=this[_0x406602(0x245)],this[_0x406602(0x243)]()?_0x1f0b37[_0x406602(0x1df)]=_0x50f0b4:_0x1f0b37[_0x406602(0x1df)]=this[_0x406602(0x210)];}},VisuMZ[_0x41ba17(0x1de)][_0x41ba17(0x238)]=Game_Map[_0x41ba17(0x1db)][_0x41ba17(0x227)],Game_Map['prototype']['scrollLeft']=function(_0x58076a){const _0x29603a=_0x41ba17,_0x2278e8=this[_0x29603a(0x245)];VisuMZ[_0x29603a(0x1de)][_0x29603a(0x238)]['call'](this,_0x58076a);for(const _0x219f0f of this[_0x29603a(0x27e)]()){if(!_0x219f0f)continue;if(this[_0x29603a(0x296)]())_0x219f0f[_0x29603a(0x242)]&&(_0x219f0f[_0x29603a(0x265)]-=_0x58076a);else this[_0x29603a(0x26a)]()>=this[_0x29603a(0x28d)]()&&(_0x219f0f[_0x29603a(0x265)]+=this[_0x29603a(0x245)]-_0x2278e8);}},VisuMZ[_0x41ba17(0x1de)]['Game_Map_scrollRight']=Game_Map['prototype'][_0x41ba17(0x202)],Game_Map['prototype'][_0x41ba17(0x202)]=function(_0x56a9fa){const _0x189bb0=_0x41ba17,_0xbdd1a3=this['_displayX'];VisuMZ[_0x189bb0(0x1de)]['Game_Map_scrollRight'][_0x189bb0(0x1e6)](this,_0x56a9fa);for(const _0x4c6121 of this[_0x189bb0(0x27e)]()){if(!_0x4c6121)continue;if(this[_0x189bb0(0x296)]())_0x4c6121['_fogLoopX']&&(_0x4c6121[_0x189bb0(0x265)]+=_0x56a9fa);else this[_0x189bb0(0x26a)]()>=this['screenTileX']()&&(_0x4c6121[_0x189bb0(0x265)]+=this[_0x189bb0(0x245)]-_0xbdd1a3);}},VisuMZ[_0x41ba17(0x1de)][_0x41ba17(0x29b)]=Game_Map[_0x41ba17(0x1db)][_0x41ba17(0x1dd)],Game_Map[_0x41ba17(0x1db)][_0x41ba17(0x1dd)]=function(_0x58142f){const _0x333e4e=_0x41ba17,_0xd067e3=this[_0x333e4e(0x210)];VisuMZ[_0x333e4e(0x1de)][_0x333e4e(0x29b)]['call'](this,_0x58142f);for(const _0x5edd60 of this[_0x333e4e(0x27e)]()){if(!_0x5edd60)continue;if(this[_0x333e4e(0x243)]())_0x5edd60[_0x333e4e(0x211)]&&(_0x5edd60[_0x333e4e(0x1df)]+=_0x58142f);else this[_0x333e4e(0x20f)]()>=this[_0x333e4e(0x22f)]()&&(_0x5edd60[_0x333e4e(0x1df)]+=this[_0x333e4e(0x210)]-_0xd067e3);}},VisuMZ[_0x41ba17(0x1de)][_0x41ba17(0x292)]=Game_Map[_0x41ba17(0x1db)][_0x41ba17(0x1f5)],Game_Map['prototype'][_0x41ba17(0x1f5)]=function(_0x5f0880){const _0xc13d22=_0x41ba17,_0x3b42ae=this[_0xc13d22(0x210)];VisuMZ['VisualFogs'][_0xc13d22(0x292)][_0xc13d22(0x1e6)](this,_0x5f0880);for(const _0x4af221 of this[_0xc13d22(0x27e)]()){if(!_0x4af221)continue;if(this[_0xc13d22(0x243)]())_0x4af221[_0xc13d22(0x211)]&&(_0x4af221['_fogY']-=_0x5f0880);else this['height']()>=this[_0xc13d22(0x22f)]()&&(_0x4af221['_fogY']+=this['_displayY']-_0x3b42ae);}},VisuMZ[_0x41ba17(0x1de)][_0x41ba17(0x22d)]=Game_Map['prototype'][_0x41ba17(0x2a9)],Game_Map[_0x41ba17(0x1db)][_0x41ba17(0x2a9)]=function(){const _0x395341=_0x41ba17;VisuMZ[_0x395341(0x1de)][_0x395341(0x22d)][_0x395341(0x1e6)](this);for(const _0x3fc368 of this[_0x395341(0x27e)]()){if(!_0x3fc368)continue;this[_0x395341(0x253)](_0x3fc368);}},Game_Map[_0x41ba17(0x1db)][_0x41ba17(0x253)]=function(_0x2554a9){const _0x39f5c7=_0x41ba17;_0x2554a9[_0x39f5c7(0x242)]&&(_0x2554a9[_0x39f5c7(0x265)]+=_0x2554a9[_0x39f5c7(0x2ad)]/this[_0x39f5c7(0x2a0)]()/0x2);_0x2554a9[_0x39f5c7(0x211)]&&(_0x2554a9[_0x39f5c7(0x1df)]+=_0x2554a9[_0x39f5c7(0x271)]/this[_0x39f5c7(0x206)]()/0x2);_0x2554a9[_0x39f5c7(0x1ce)]+=_0x2554a9[_0x39f5c7(0x29c)];if(_0x2554a9[_0x39f5c7(0x22a)]>0x0){const _0x505157=_0x2554a9[_0x39f5c7(0x22a)];_0x2554a9['opacity']=(_0x2554a9[_0x39f5c7(0x1eb)]*(_0x505157-0x1)+_0x2554a9['targetOpacity'])/_0x505157,_0x2554a9[_0x39f5c7(0x22a)]--;}};function Sprite_VisualFog(){const _0x69706a=_0x41ba17;this[_0x69706a(0x286)](...arguments);}Sprite_VisualFog[_0x41ba17(0x1db)]=Object['create'](TilingSprite['prototype']),Sprite_VisualFog[_0x41ba17(0x1db)]['constructor']=Sprite_VisualFog,Sprite_VisualFog['prototype'][_0x41ba17(0x286)]=function(_0x22749d){const _0x194189=_0x41ba17;this[_0x194189(0x222)]=_0x22749d,TilingSprite['prototype']['initialize']['call'](this),this[_0x194189(0x23c)](),this[_0x194189(0x228)](),this[_0x194189(0x1f9)][_0x194189(0x1fa)](this[_0x194189(0x283)][_0x194189(0x1ed)](this));},Sprite_VisualFog['prototype']['settings']=function(){const _0x10efde=_0x41ba17;return $gameMap[_0x10efde(0x220)](this[_0x10efde(0x222)]);},Sprite_VisualFog[_0x41ba17(0x1db)][_0x41ba17(0x23c)]=function(){const _0x43b610=_0x41ba17;this['_hue']=0x0,this['_colorTone']=[0x0,0x0,0x0,0x0],this['_colorFilter']=new ColorFilter(),!this['filters']&&(this[_0x43b610(0x246)]=[]),this['filters']['push'](this['_colorFilter']);},Sprite_VisualFog['prototype'][_0x41ba17(0x24d)]=function(){const _0x25d4ce=_0x41ba17;!this[_0x25d4ce(0x275)]&&this[_0x25d4ce(0x23c)](),this[_0x25d4ce(0x275)]['setHue'](this[_0x25d4ce(0x200)]),this['_colorFilter']['setColorTone'](this[_0x25d4ce(0x213)]);},Sprite_VisualFog[_0x41ba17(0x1db)]['loadBitmap']=function(){const _0x553b77=_0x41ba17;this[_0x553b77(0x23f)]=this[_0x553b77(0x1d4)]()[_0x553b77(0x22b)],this[_0x553b77(0x1f9)]=ImageManager[_0x553b77(0x257)](this[_0x553b77(0x23f)]);},Sprite_VisualFog['prototype'][_0x41ba17(0x283)]=function(){const _0x401eb9=_0x41ba17;this[_0x401eb9(0x239)]=new Sprite(),this[_0x401eb9(0x2a5)]();},Sprite_VisualFog[_0x41ba17(0x1db)]['createMaskBitmap']=function(){const _0x42e089=_0x41ba17;this[_0x42e089(0x239)][_0x42e089(0x1f9)]&&this[_0x42e089(0x231)](this[_0x42e089(0x239)]);const _0x326008=this[_0x42e089(0x1d4)]()[_0x42e089(0x20b)],_0x4e2f02=this[_0x42e089(0x1d4)]()[_0x42e089(0x1e1)];if(this[_0x42e089(0x1d4)]()[_0x42e089(0x263)]===_0x42e089(0x1f4))this[_0x42e089(0x226)]();else{if(this[_0x42e089(0x1d4)]()[_0x42e089(0x263)]!=='none')this[_0x42e089(0x2aa)]();else{if(_0x326008[_0x42e089(0x270)]>0x0||_0x4e2f02[_0x42e089(0x270)]>0x0)this[_0x42e089(0x280)]();else this[_0x42e089(0x1d4)]()[_0x42e089(0x263)]===_0x42e089(0x229)&&this['loadTemplateVignette']();}}this[_0x42e089(0x1dc)](this['_maskSprite']),this[_0x42e089(0x216)]=new PIXI[(_0x42e089(0x274))](this[_0x42e089(0x239)]),this['filters']['push'](this['_maskFilter']);if(this[_0x42e089(0x20a)])this[_0x42e089(0x246)]['push'](this[_0x42e089(0x20a)]);},Sprite_VisualFog[_0x41ba17(0x1db)][_0x41ba17(0x226)]=function(){const _0x45e2df=_0x41ba17,_0x327dc4=this['settings']()[_0x45e2df(0x1ec)];this[_0x45e2df(0x239)][_0x45e2df(0x1f9)]=ImageManager[_0x45e2df(0x257)](_0x327dc4),this[_0x45e2df(0x239)][_0x45e2df(0x1f9)][_0x45e2df(0x21f)]=![];},Sprite_VisualFog[_0x41ba17(0x1db)][_0x41ba17(0x2aa)]=function(){const _0x36f8aa=_0x41ba17,_0x1c5427=this['settings']()[_0x36f8aa(0x263)];this['_maskSprite'][_0x36f8aa(0x1f9)]=ImageManager[_0x36f8aa(0x260)](_0x1c5427);},Sprite_VisualFog['prototype'][_0x41ba17(0x280)]=function(){const _0x432d10=_0x41ba17,_0x492488=this[_0x432d10(0x1d4)]()[_0x432d10(0x20b)],_0x369b20=this[_0x432d10(0x1d4)]()[_0x432d10(0x1e1)];if(_0x492488[_0x432d10(0x270)]<=0x0&&_0x369b20['length']<=0x0)return;if($gameMap[_0x432d10(0x296)]()||$gameMap[_0x432d10(0x243)]())return;const _0x23b212=$gameMap[_0x432d10(0x26a)](),_0x4b70ab=$gameMap[_0x432d10(0x20f)](),_0x48fbd4=$gameMap[_0x432d10(0x2a0)](),_0x319bc3=$gameMap[_0x432d10(0x206)](),_0x5a6a09=this['settings']()[_0x432d10(0x273)],_0x492f62=_0x48fbd4+_0x5a6a09*0x2,_0x49789f=_0x319bc3+_0x5a6a09*0x2;this[_0x432d10(0x239)]['bitmap']=new Bitmap(_0x23b212*_0x48fbd4,_0x4b70ab*_0x319bc3);for(let _0x46495f=0x0;_0x46495f<_0x23b212;_0x46495f++){for(let _0x411b14=0x0;_0x411b14<_0x4b70ab;_0x411b14++){const _0x28970d=$gameMap[_0x432d10(0x28b)](_0x46495f,_0x411b14);(_0x492488['includes'](_0x28970d)||_0x369b20[_0x432d10(0x1d7)]($gameMap[_0x432d10(0x29d)](_0x46495f,_0x411b14)))&&(this[_0x432d10(0x239)]['bitmap'][_0x432d10(0x212)](_0x46495f*_0x48fbd4-_0x5a6a09,_0x411b14*_0x319bc3-_0x5a6a09,_0x492f62,_0x49789f,'#ffffff'),Imported[_0x432d10(0x236)]&&_0x492488[_0x432d10(0x1d7)](_0x28970d)&&SceneManager[_0x432d10(0x279)][_0x432d10(0x1fc)]['push'](_0x28970d));}}this[_0x432d10(0x246)]=[];!!PIXI[_0x432d10(0x246)][_0x432d10(0x27b)]&&!this[_0x432d10(0x20a)]&&(this['_blurFilter']=new PIXI[(_0x432d10(0x246))][(_0x432d10(0x27b))](clamp=!![]));if(this[_0x432d10(0x20a)]){const _0x378e7e=this[_0x432d10(0x1d4)]()[_0x432d10(0x247)];this['_blurFilter'][_0x432d10(0x2a1)]=_0x378e7e||0.01;}},Sprite_VisualFog[_0x41ba17(0x1db)][_0x41ba17(0x225)]=function(_0x4c4a0e,_0x1d2a24){},Sprite_VisualFog[_0x41ba17(0x1db)]['update']=function(){const _0x442a57=_0x41ba17;TilingSprite['prototype'][_0x442a57(0x29f)][_0x442a57(0x1e6)](this);if(!this[_0x442a57(0x1f9)])return;if(!this['settings']())return;this[_0x442a57(0x1f7)](),this['updateOrigin'](),this[_0x442a57(0x209)](),this['updateHue'](),this[_0x442a57(0x259)](),this[_0x442a57(0x1e0)]();},Sprite_VisualFog[_0x41ba17(0x1db)][_0x41ba17(0x1f7)]=function(){const _0x4d76de=_0x41ba17;this[_0x4d76de(0x1eb)]=this['settings']()[_0x4d76de(0x1eb)];},Sprite_VisualFog[_0x41ba17(0x1db)]['updateOrigin']=function(){const _0x27b24a=_0x41ba17;this[_0x27b24a(0x1da)]['x']=$gameMap['getVisualFogOx'](this[_0x27b24a(0x222)]),this[_0x27b24a(0x1da)]['y']=$gameMap[_0x27b24a(0x232)](this[_0x27b24a(0x222)]);},Sprite_VisualFog[_0x41ba17(0x1db)]['updateBlendMode']=function(){const _0x5468b9=_0x41ba17;this[_0x5468b9(0x216)]&&(this[_0x5468b9(0x216)][_0x5468b9(0x2ac)]=this['settings']()[_0x5468b9(0x2ac)]);},Sprite_VisualFog[_0x41ba17(0x1db)][_0x41ba17(0x2a7)]=function(){const _0x313323=_0x41ba17;this[_0x313323(0x217)](this['settings']()[_0x313323(0x1ce)]);},Sprite_VisualFog[_0x41ba17(0x1db)]['setHue']=function(_0x144829){const _0x2f9c9b=_0x41ba17;this[_0x2f9c9b(0x200)]!==Number(_0x144829)&&(this['_hue']=Number(_0x144829),this[_0x2f9c9b(0x24d)]());},Sprite_VisualFog[_0x41ba17(0x1db)][_0x41ba17(0x259)]=function(){const _0x214ced=_0x41ba17;this[_0x214ced(0x233)](this[_0x214ced(0x1d4)]()['colorTone']);},Sprite_VisualFog[_0x41ba17(0x1db)][_0x41ba17(0x233)]=function(_0x471414){const _0x3c3afd=_0x41ba17;if(!(_0x471414 instanceof Array))throw new Error(_0x3c3afd(0x26b));!this[_0x3c3afd(0x213)][_0x3c3afd(0x23d)](_0x471414)&&(this[_0x3c3afd(0x213)]=_0x471414[_0x3c3afd(0x21a)](),this[_0x3c3afd(0x24d)]());},Sprite_VisualFog[_0x41ba17(0x1db)][_0x41ba17(0x1e0)]=function(){const _0x2459fc=_0x41ba17;if(!this[_0x2459fc(0x239)])return;const _0x51f8af=this[_0x2459fc(0x1d4)]()[_0x2459fc(0x20b)],_0x348ccf=this[_0x2459fc(0x1d4)]()[_0x2459fc(0x1e1)];if(this[_0x2459fc(0x1d4)]()[_0x2459fc(0x263)]!=='none'){this[_0x2459fc(0x239)]['x']=0x0,this['_maskSprite']['y']=0x0;if(!Imported[_0x2459fc(0x1fb)])return;this[_0x2459fc(0x239)]['scale']['x']=0x1/$gameScreen[_0x2459fc(0x287)](),this[_0x2459fc(0x239)][_0x2459fc(0x293)]['y']=0x1/$gameScreen[_0x2459fc(0x287)]();}else{if(_0x51f8af[_0x2459fc(0x270)]>0x0||_0x348ccf[_0x2459fc(0x270)]>0x0)this[_0x2459fc(0x239)]['x']=Math[_0x2459fc(0x1d1)](-$gameMap[_0x2459fc(0x1d8)]()*$gameMap[_0x2459fc(0x2a0)]()),this[_0x2459fc(0x239)]['y']=Math[_0x2459fc(0x1d1)](-$gameMap['displayY']()*$gameMap[_0x2459fc(0x206)]()),this[_0x2459fc(0x239)][_0x2459fc(0x293)]['x']=0x1,this['_maskSprite'][_0x2459fc(0x293)]['y']=0x1;else this['settings']()['vignette']===_0x2459fc(0x229)&&(this['_maskSprite']['x']=0x0,this['_maskSprite']['y']=0x0,this[_0x2459fc(0x239)]['scale']['x']=0x1,this['_maskSprite'][_0x2459fc(0x293)]['y']=0x1);}},VisuMZ[_0x41ba17(0x1de)]['Spriteset_Map_createWeather']=Spriteset_Map[_0x41ba17(0x1db)][_0x41ba17(0x1ff)],Spriteset_Map[_0x41ba17(0x1db)][_0x41ba17(0x1ff)]=function(){const _0x21d64f=_0x41ba17;this[_0x21d64f(0x1fd)](),this['createFogLayers'](),this[_0x21d64f(0x25a)](),VisuMZ[_0x21d64f(0x1de)][_0x21d64f(0x1e9)][_0x21d64f(0x1e6)](this);},Spriteset_Map[_0x41ba17(0x1db)]['createFogContainer']=function(){const _0x2484c4=_0x41ba17;this['_fogContainer']=new Sprite(),this[_0x2484c4(0x1f3)]['addChild'](this[_0x2484c4(0x1ef)]),this[_0x2484c4(0x25c)]=[null];},Spriteset_Map['prototype']['createFogLayers']=function(){const _0x280470=_0x41ba17,_0x5bc989=$gameMap['getVisualFogs']();for(const _0x5395a5 of _0x5bc989){if(!_0x5395a5)continue;this[_0x280470(0x24f)](_0x5395a5);}},Spriteset_Map[_0x41ba17(0x1db)]['createNewFogLayer']=function(_0x1bdb27){const _0x4dcee1=_0x41ba17;if(!_0x1bdb27)return;const _0x485305=new Sprite_VisualFog(_0x1bdb27['id']);_0x485305[_0x4dcee1(0x277)](0x0,0x0,Graphics[_0x4dcee1(0x26a)],Graphics[_0x4dcee1(0x20f)]),this[_0x4dcee1(0x1ef)][_0x4dcee1(0x1dc)](_0x485305);},Spriteset_Map[_0x41ba17(0x1db)][_0x41ba17(0x25a)]=function(){const _0x4d70e5=_0x41ba17;this[_0x4d70e5(0x1ef)][_0x4d70e5(0x25e)][_0x4d70e5(0x20e)]((_0x207b99,_0x437df1)=>_0x207b99['_id']-_0x437df1[_0x4d70e5(0x222)]);},Spriteset_Map['prototype'][_0x41ba17(0x28f)]=function(_0x19e079){const _0x4baef3=_0x41ba17;return this[_0x4baef3(0x1ef)][_0x4baef3(0x25e)]['find'](_0x6c8cd7=>_0x6c8cd7[_0x4baef3(0x222)]===_0x19e079);},Spriteset_Map[_0x41ba17(0x1db)][_0x41ba17(0x1e4)]=function(_0x43f979){const _0x35d730=_0x41ba17,_0x50efbc=this[_0x35d730(0x28f)](_0x43f979);_0x50efbc&&this[_0x35d730(0x1ef)][_0x35d730(0x231)](_0x50efbc);},Spriteset_Map[_0x41ba17(0x1db)][_0x41ba17(0x27a)]=function(_0x2968ed,_0x21bcb2){const _0x585a79=_0x41ba17,_0x5d5c01=this[_0x585a79(0x28f)](_0x2968ed);!_0x5d5c01?(this[_0x585a79(0x24f)]($gameMap['getVisualFogSettings'](_0x2968ed)),this[_0x585a79(0x25a)]()):(_0x5d5c01[_0x585a79(0x228)](),_0x21bcb2&&_0x5d5c01['bitmap'][_0x585a79(0x1fa)](_0x5d5c01[_0x585a79(0x2a5)][_0x585a79(0x1ed)](_0x5d5c01)));};