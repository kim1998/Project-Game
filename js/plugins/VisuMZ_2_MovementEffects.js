//=============================================================================
// VisuStella MZ - Movement Effects
// VisuMZ_2_MovementEffects.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_MovementEffects = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MovementEffects = VisuMZ.MovementEffects || {};
VisuMZ.MovementEffects.version = 1.11;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.11] [MovementEffects]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Movement_Effects_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_EventsMoveCore
 * @orderAfter VisuMZ_1_EventsMoveCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Movement in RPG Maker MZ can be kind of dull. There's next to no way of
 * interacting with the map. This plugin adds various means of doing so to add
 * more life to the environment. Dust Clouds can kick up when running around.
 * Footprints can be left in the sand. Footsteps can be heard making different
 * sounds based on the flooring. Added movement abilities like Smart Blink,
 * Smart Jump, and Smart Rush allow players more fun traversal options. And to
 * top it off, a smooth scrolling camera will ease in the screen to focus on
 * the player character instead of being locked-on firmly. Motion blurs and
 * motion trails are also made available to further emphasize movement.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Dust Clouds can kick up off the ground whenever characters run, giving the
 *   player a better understanding of what's going on.
 * * Dust Clouds can be customized, using images or generated with different
 *   colors. These settings can be altered mid-game as well.
 * * Footprints can appear when stepping over specific tiles marked by declared
 *   terrain tags or regions. This can be used over imprintable terrain like
 *   dirt, sand, or snow.
 * * Footprints can be modified in how they appear with custom images or with
 *   generated images. These modifications will be based on the sprite sheet
 *   frame used to generate them for accuracy.
 * * Footstep sounds can be added to give player feedback whenever the player
 *   character or events move on the screen.
 * * Apply different footstep sounds to different tiles on the map marked by
 *   either regions or terrain tags.
 * * Footsteps coming from events can have a distance factor applied to them,
 *   making them sound softer the further away they are and playing on specific
 *   sides of a stereo speaker.
 * * Motion Blur effects can be used to create more impactful scenes. Apply
 *   them to any character on the map screen be it the player character,
 *   followers, or events via Plugin Command!
 * * Motion Trails can added to emphasize movement. These are also inherently a
 *   part of the new movement abilities.
 * * Newly added movement abilities that pay attention to the terrain and any
 *   implemented restrictions. These abilities include Smart Blink, Smart Jump,
 *   and Smart Rush.
 * * Directional Movement Speed Modifiers can be adjusted globally to make
 *   characters move faster or slower in certain directions. This can be used
 *   to create an illusion that it's harder to move against the wind in a storm
 *   than with.
 * * Smart Blink is a new movement ability that can be activated via Plugin
 *   Command! The player teleports forward a set distance, ignoring any walls
 *   and/or obstacles in between unless restrictions prohibit the player from
 *   doing so.
 * * Smart Jump is a new movement ability that can be activated via Plugin
 *   Command! The player jumps forward a distance as long as it does not
 *   interfere with obstacles. It can scale past pits and small gaps in height.
 *   Height maps can also be declared for some verticality on the map.
 * * Smart Rush is a new movement ability that can be activated via Plugin
 *   Command! The player charges forward extremely fast, possibly colliding
 *   with events, and possibly creating new interactions with its switch
 *   toggling nature.
 * * Smooth Camera is an added feature to smoothly adjust the camera as the
 *   player traverses across the game's maps. The scrolling speed goes slower
 *   or faster depending if the player is walking or dashing.
 * * Plugin Commands allow you to adjust Smooth Camera settings midway through
 *   the game.
 * * Map notetags can forcefully enable or disable Smooth Camera.
 * * Players that find certain effects added through this plugin annoying (such
 *   as footprints, footsteps, smooth camera, etc) can have them turned off via
 *   the Options menu.
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
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_EventsMoveCore
 * * Pixi JS Filters*
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 * 
 * *Note* You can download the Pixi JS Filters plugin library from the below
 * URL or from the Action Sequence Impact product page. Install it as a
 * Tier 0 plugin.
 * 
 * *Note2* Pixi JS Filters perform differently on different machines/devices.
 * Please understand that this is outside of VisuStella's control.
 * 
 * URL: https://filters.pixijs.download/v3.1.0/pixi-filters.js
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
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
 * === Dust Cloud-Related Notetags ===
 * 
 * ---
 * 
 * <Force Dust Cloud>
 * 
 * - Used for: Map Notetags
 * - Forces Dust Clouds to be kicked up whenever characters are dashing
 *   regardless of whatever settings are found in the Plugin Parameters for
 *   this particular map.
 * - Plugin Command changes won't bypass this notetag either.
 * - However, if the player turns off Dust Clouds in the options menu, then
 *   this setting will be turned off.
 * 
 * ---
 *
 * <No Dust Cloud>
 *
 * - Used for: Map Notetags
 * - This disables Dust Clouds from being kicked up whenever characters are
 *   dashing regardless of whatever settings are found in the Plugin Parameters
 *   for this particular map.
 * - Plugin Command changes won't bypass this notetag either.
 *
 * ---
 * 
 * === Footprints-Related Notetags ===
 * 
 * ---
 * 
 * <Footprint Region: x>
 * <Footprint Regions: x, x, x>
 * 
 * - Used for: Map Notetags
 * - This declares which regions will have visible footprints when characters
 *   walk over those areas.
 * - Replace 'x' with a number (0 to 255) representing the region used to mark
 *   tiles that can have footprints.
 * - Insert multiple 'x' values to add multiple regions.
 * - If this notetag is used, ignore the default settings found in the
 *   Plugin Parameters.
 * 
 * ---
 * 
 * <No Footprint Region: x>
 * <No Footprint Regions: x, x, x>
 * 
 * - Used for: Map Notetags
 * - This declares which regions CANNOT have footprints when characters walk
 *   over those areas.
 * - This is primarily used to offset the default settings found in the
 *   Plugin Parameters.
 * - Replace 'x' with a number (0 to 255) representing the region used to mark
 *   tiles that CANNOT have footprints.
 * - Insert multiple 'x' values to add multiple regions.
 * 
 * ---
 * 
 * <Region x Footprint Opacity: y>
 * 
 * - Used for: Map Notetags
 * - This changes the opacity of the footprints that spawn in region 'x' to
 *   have an opacity value of 'y' instead of the default settings found in the
 *   Plugin Parameters.
 * - Replace 'x' with a number (0 to 255) to indicate which region is being
 *   modified.
 * - Replace 'y' with a number (0 to 255) to represent the starting opacity
 *   value of the footprints made in that region.
 * 
 * ---
 * 
 * <Region x Footprint Duration: y>
 * 
 * - Used for: Map Notetags
 * - This changes the duration of the footprints that spawn in region 'x' to
 *   have a duration time of 'y' instead of the default settings found in the
 *   Plugin Parameters.
 * - Replace 'x' with a number (0 to 255) to indicate which region is being
 *   modified.
 * - Replace 'y' with a number in frames to represent the starting duration
 *   time of the footprints made in that region.
 * 
 * ---
 * 
 * <Footprint Terrain Tag: x>
 * <Footprint Terrain Tags: x, x, x>
 * 
 * - Used for: Tileset Notetags
 * - This declares which terrain tag marked tiles will have visible footprints
 *   when characters walk over those areas.
 * - Replace 'x' with a number (0 to 7) representing the terrain tag used to
 *   mark tiles that can have footprints.
 * - Insert multiple 'x' values to add multiple terrain tags.
 * - If this notetag is used, ignore the default settings found in the
 *   Plugin Parameters.
 * 
 * ---
 * 
 * <No Footprint Terrain Tag: x>
 * <No Footprint Terrain Tags: x, x, x>
 * 
 * - Used for: Tileset Notetags
 * - This declares which terrain tag marked tiles CANNOT have footprints when
 *   characters walk over those areas.
 * - This is primarily used to offset the default settings found in the
 *   Plugin Parameters.
 * - Replace 'x' with a number (0 to 7) representing the terrain tag used to
 *   mark tiles that CANNOT have footprints.
 * - Insert multiple 'x' values to add multiple terrain tags.
 * 
 * ---
 * 
 * <Terrain Tag x Footprint Opacity: y>
 * 
 * - Used for: Tileset Notetags
 * - This changes the opacity of the footprints that spawn in tiles with
 *   terrain tag 'x' to have an opacity value of 'y' instead of the default
 *   settings found in the Plugin Parameters.
 * - Replace 'x' with a number (0 to 7) to indicate which terrain tag is being
 *   modified.
 * - Replace 'y' with a number (0 to 255) to represent the starting opacity
 *   value of the footprints made in that tile.
 * 
 * ---
 * 
 * <Terrain Tag x Footprint Duration: y>
 * 
 * - Used for: Tileset Notetags
 * - This changes the duration of the footprints that spawn in tiles with
 *   terrain tag 'x' to have a duration time of 'y' instead of the default
 *   settings found in the Plugin Parameters.
 * - Replace 'x' with a number (0 to 7) to indicate which terrain tag is being
 *   modified.
 * - Replace 'y' with a number in frames to represent the starting duration
 *   time of the footprints made in that tile.
 * 
 * ---
 * 
 * <Disable Footprints>
 * 
 * - Used for: Actor Notetags, Event Notetags, or Event Page Comment Tags
 * - Prevents the character from being able to leave behind footprints.
 * 
 * ---
 * 
 * <Footprint d Pattern p Filename: filename>
 * 
 * - Used for: Actor Notetags, Event Notetags, or Event Page Comment Tags
 * - Allows you to set a specific image to be used in place of a generated
 *   footprint for 'd' direction 'p' pattern.
 * - Using this will bypass any settings made for generated footprints.
 * - Replace 'd' with text representing the direction the setting is for. Use
 *   any of the directions below:
 *   - down, left, right, up
 *   - lower left, lower right, upper left, upper right
 * - Replace 'p' with a number representing the pattern index. Patterns are
 *   the individual frames used in the sprite when walking.
 *   - By default, RPG Maker MZ sprites have the following patterns:
 *   - Left frame is pattern 0.
 *   - Center frame is pattern 1.
 *   - Right frame is pattern 2.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 * - Examples:
 *   - <Footprint Down Pattern 0 Filename: FootprintDownA>
 *   - <Footprint Left Pattern 2 Filename: FootprintLeftB>
 *   - <Footprint Right Pattern 0 Filename: FootprintRightA>
 * 
 * ---
 * 
 * <Footprint d Pattern p Width: x>
 * <Footprint d Pattern p Height: y>
 * 
 * - Used for: Actor Notetags, Event Notetags, or Event Page Comment Tags
 * - For non-image generated footprints, these notetags let you set the width
 *   and/or height of the footprint for 'd' direction and 'p' pattern.
 * - Replace 'd' with text representing the direction the setting is for. Use
 *   any of the directions below:
 *   - down, left, right, up
 *   - lower left, lower right, upper left, upper right
 * - Replace 'p' with a number representing the pattern index. Patterns are
 *   the individual frames used in the sprite when walking.
 *   - By default, RPG Maker MZ sprites have the following patterns:
 *   - Left frame is pattern 0.
 *   - Center frame is pattern 1.
 *   - Right frame is pattern 2.
 * - Replace 'x' with a number representing the width of footprint in pixels.
 * - Replace 'y' with a number representing the height of footprint in pixels.
 * - Examples:
 *   - <Footprint Down Pattern 0 Width: 6>
 *   - <Footprint Left Pattern 2 Height: 4>
 * 
 * ---
 * 
 * <Footprint d Pattern p Offset: +x, +x>
 * <Footprint d Pattern p Offset: -x, -x>
 * <Footprint d Pattern p Offset: +x, -x>
 * <Footprint d Pattern p Offset: -x, +x>
 * 
 * - Used for: Actor Notetags, Event Notetags, or Event Page Comment Tags
 * - For non-image generated footprints, these notetags let you set the offsets
 *   X and Y of the footprint for 'd' direction and 'p' pattern.
 * - Replace 'd' with text representing the direction the setting is for. Use
 *   any of the directions below:
 *   - down, left, right, up
 *   - lower left, lower right, upper left, upper right
 * - Replace 'p' with a number representing the pattern index. Patterns are
 *   the individual frames used in the sprite when walking.
 *   - By default, RPG Maker MZ sprites have the following patterns:
 *   - Left frame is pattern 0.
 *   - Center frame is pattern 1.
 *   - Right frame is pattern 2.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the footprint's x and y coordinates by.
 * - Examples:
 *   - <Footprint Up Pattern 0 Width: +4, +2>
 *   - <Footprint Right Pattern 2 Height: -6, -4>
 * 
 * ---
 * 
 * === Footsteps-Related Notetags ===
 * 
 * ---
 * 
 * <Force Footsteps>
 *
 * - Used for: Map Notetags
 * - Forces footstep sounds to be played whenever characters are walking on the
 *   screen, regardless of the settings found in the Plugin Parameters for the
 *   particular map.
 * - Plugin Command changes won't bypass this notetag either.
 * - However, if the player turns off Footstep Sounds in the options menu, then
 *   this setting will be turned off.
 * 
 * ---
 * 
 * <No Footsteps>
 *
 * - Used for: Map Notetags
 * - Prevents footstep sounds from being played whenever characters are walking
 *   on the screen, regardless of the settings found in the Plugin Parameters
 *   for the particular map.
 * - Plugin Command changes won't bypass this notetag either.
 * 
 * ---
 * 
 * <Region x Footstep Sound: filename>
 * <Region x Footstep Sound: filename, volume>
 * <Region x Footstep Sound: filename, volume, pitch>
 * <Region x Footstep Sound: filename, volume, pitch, pan>
 * 
 * - Used for: Map Notetags
 * - Causes a different sound effect to be played in place of the default
 *   footstep sound if a character walks on a map tile marked by region 'x'.
 * - Replace 'x' with a number (0-255) representing the region.
 * - Replace 'volume' with a number (0 to 100) representing the volume.
 * - Replace 'pitch' with a number (50 to 150) representing the pitch.
 * - Replace 'pan' with a number (-100 to 100) representing the pan.
 * - If 'volume', 'pitch', or 'pan' aren't present, then the values used for
 *   them will be based off the default settings in the Plugin Parameters.
 * - This will take priority over any terrain tags with unique footstep sounds.
 * 
 * ---
 * 
 * <No Region x Footsteps>
 * 
 * - Used for: Map Notetags
 * - No sound effects will be played when a character walks over a map tile
 *   marked by region 'x'.
 * - Replace 'x' with a number (0-255) representing the region.
 * 
 * ---
 * 
 * <Terrain Tag x Footsteps: filename>
 * <Terrain Tag x Footsteps: filename, volume>
 * <Terrain Tag x Footsteps: filename, volume, pitch>
 * <Terrain Tag x Footsteps: filename, volume, pitch, pan>
 * 
 * - Used for: Tileset Notetags
 * - Causes a different sound effect to be played in place of the default
 *   footstep sound if a character walks on a map tile with terrain tag 'x'.
 * - Replace 'x' with a number (0-7) representing the terrain tag.
 * - Replace 'volume' with a number (0 to 100) representing the volume.
 * - Replace 'pitch' with a number (50 to 150) representing the pitch.
 * - Replace 'pan' with a number (-100 to 100) representing the pan.
 * - If 'volume', 'pitch', or 'pan' aren't present, then the values used for
 *   them will be based off the default settings in the Plugin Parameters.
 * - This will have LESS priority than any regions with unique footstep sounds.
 * 
 * ---
 * 
 * <No Terrain Tag x Footsteps>
 * 
 * - Used for: Tileset Notetags
 * - No sound effects will be played when a character walks over a map tile
 *   marked by terrain tag 'x'.
 * - Replace 'x' with a number (0-7) representing the terrain tag.
 * 
 * ---
 * 
 * <Enable Footsteps>
 * 
 * - Used for: Actor Notetags, Event Notetags, or Event Page Comment Tags
 * - If actor or event footstep sounds are normally disabled, this will enable
 *   them when moving.
 * - Footstep sounds coming from actors will be given priority to the party
 *   leader first before anyone else.
 * 
 * ---
 * 
 * <Disable Footsteps>
 * 
 * - Used for: Actor Notetags, Event Notetags, or Event Page Comment Tags
 * - If actor or event footstep sounds are normally enabled, this will disable
 *   them when moving.
 * 
 * ---
 * 
 * <Footsteps Volume: x%>
 * 
 * - Used for: Actor Notetags, Event Notetags, or Event Page Comment Tags
 * - Changes the volume for any footstep sounds made by this actor/event.
 * - Replace 'x' with a number (0 to 100) representing the percentile modifier,
 *   a multiplicative rate from the usual footstep volume.
 * 
 * ---
 * 
 * <Footsteps Pitch: x%>
 * 
 * - Used for: Actor Notetags, Event Notetags, or Event Page Comment Tags
 * - Changes the pitch for any footstep sounds made by this actor/event.
 * - Replace 'x' with a number (0 to 100) representing the percentile modifier,
 *   a multiplicative rate from the usual footstep pitch.
 * 
 * ---
 * 
 * <Footsteps Frame: x>
 * <Footsteps Frames: x, x, x>
 * 
 * - Used for: Actor Notetags, Event Notetags, or Event Page Comment Tags
 * - For those using the "Sound by Frame?" Plugin Parameter, this will cause
 *   the footstep sounds to trigger whenever the sprite changes to the listed
 *   frame(s) in order to match up the sound with the image of the sprite
 *   stepping on the ground.
 * - This will override the setting found in the Plugin Parameters for this
 *   specific actor or event.
 * - Replace 'x' with a number representing the frame. Frames start at 0 and
 *   increase by 1 going left to right.
 * 
 * ---
 * 
 * === Smart Blink-Related Notetags ===
 * 
 * ---
 * 
 * <No Smart Blink>
 * 
 * - Used for: Map Notetags
 * - Prevents Smart Blink from being used at all on this map.
 * 
 * ---
 * 
 * <Smart Blink Non-Land Region: x>
 * <Smart Blink Non-Land Regions: x, x, x>
 * 
 * - Used for: Map Notetags
 * - Use this notetag to mark tiles on the map where Smart Blink cannot land.
 * - This is primarily used for things like rooftops, which if characters can
 *   land on there, can blink onto.
 * - Replace 'x' with a number (0 to 255) representing the region ID used to
 *   mark the non-landable tiles.
 *   - Insert multiple numbers to mark more regions.
 * - This will override the region settings found in the Plugin Parameters for
 *   this specific map.
 *   - However, it will not override custom settings found in Smart Blink
 *     Plugin Command.
 *   - The Smart Blink Plugin Command's restrictions will be added onto these.
 * 
 * ---
 * 
 * <Smart Blink Non-Land Terrain Tags: x>
 * <Smart Blink Non-Land Terrain Tags: x, x, x>
 * 
 * - Used for: Tileset Notetags
 * - Use this notetag to mark tiles on the map where Smart Blink cannot land.
 * - This is primarily used for things like rooftops, which if characters can
 *   land on there, can blink onto.
 * - Replace 'x' with a number (0 to 7) representing the terrain tag ID used to
 *   mark the non-landable tiles.
 *   - Insert multiple numbers to mark more terrain tags.
 * - This will override the terrain tag settings found in the Plugin Parameters
 *   for this specific map.
 *   - However, it will not override custom settings found in Smart Blink
 *     Plugin Command.
 *   - The Smart Blink Plugin Command's restrictions will be added onto these.
 * 
 * ---
 * 
 * <Smart Blink Non-Pass Region: x>
 * <Smart Blink Non-Pass Regions: x, x, x>
 * 
 * - Used for: Map Notetags
 * - Use this notetag to mark tiles on the map where Smart Blink cannot pass.
 * - This is primarily used for things like barriers, preventing the player
 *   from being able to teleport past it or on it.
 * - Replace 'x' with a number (0 to 255) representing the region ID used to
 *   mark the non-passable tiles.
 *   - Insert multiple numbers to mark more regions.
 * - This will override the region settings found in the Plugin Parameters for
 *   this specific map.
 *   - However, it will not override custom settings found in Smart Blink
 *     Plugin Command.
 *   - The Smart Blink Plugin Command's restrictions will be added onto these.
 * 
 * ---
 * 
 * <Smart Blink Non-Pass Terrain Tags: x>
 * <Smart Blink Non-Pass Terrain Tags: x, x, x>
 * 
 * - Used for: Tileset Notetags
 * - Use this notetag to mark tiles on the map where Smart Blink cannot land.
 * - This is primarily used for things like barriers, preventing the player
 *   from being able to teleport past it or on it.
 * - Replace 'x' with a number (0 to 7) representing the terrain tag ID used to
 *   mark the non-passable tiles.
 *   - Insert multiple numbers to mark more terrain tags.
 * - This will override the terrain tag settings found in the Plugin Parameters
 *   for this specific map.
 *   - However, it will not override custom settings found in Smart Blink
 *     Plugin Command.
 *   - The Smart Blink Plugin Command's restrictions will be added onto these.
 * 
 * ---
 * 
 * === Smart Jump-Related Notetags ===
 * 
 * ---
 * 
 * <No Smart Jump>
 * 
 * - Used for: Map Notetags
 * - Prevents Smart Jump from being used at all on this map.
 * 
 * ---
 * 
 * <Smart Jump Non-Land Region: x>
 * <Smart Jump Non-Land Regions: x, x, x>
 * 
 * - Used for: Map Notetags
 * - Use this notetag to mark tiles on the map where Smart Jump cannot land.
 * - This is primarily used for things like rooftops, which if characters can
 *   land on there, can jump onto.
 * - Replace 'x' with a number (0 to 255) representing the region ID used to
 *   mark the non-landable tiles.
 *   - Insert multiple numbers to mark more regions.
 * - This will override the region settings found in the Plugin Parameters for
 *   this specific map.
 *   - However, it will not override custom settings found in Smart Jump
 *     Plugin Command.
 *   - The Smart Jump Plugin Command's restrictions will be added onto these.
 * 
 * ---
 * 
 * <Smart Jump Non-Land Terrain Tags: x>
 * <Smart Jump Non-Land Terrain Tags: x, x, x>
 * 
 * - Used for: Tileset Notetags
 * - Use this notetag to mark tiles on the map where Smart Jump cannot land.
 * - This is primarily used for things like rooftops, which if characters can
 *   land on there, can jump onto.
 * - Replace 'x' with a number (0 to 7) representing the terrain tag ID used to
 *   mark the non-landable tiles.
 *   - Insert multiple numbers to mark more terrain tags.
 * - This will override the terrain tag settings found in the Plugin Parameters
 *   for this specific map.
 *   - However, it will not override custom settings found in Smart Jump
 *     Plugin Command.
 *   - The Smart Jump Plugin Command's restrictions will be added onto these.
 * 
 * ---
 * 
 * <Smart Jump Non-Pass Region: x>
 * <Smart Jump Non-Pass Regions: x, x, x>
 * 
 * - Used for: Map Notetags
 * - Use this notetag to mark tiles on the map where Smart Jump cannot pass.
 * - This is primarily used for things like barriers, preventing the player
 *   from being able to leap past it or on it.
 * - Replace 'x' with a number (0 to 255) representing the region ID used to
 *   mark the non-passable tiles.
 *   - Insert multiple numbers to mark more regions.
 * - This will override the region settings found in the Plugin Parameters for
 *   this specific map.
 *   - However, it will not override custom settings found in Smart Jump
 *     Plugin Command.
 *   - The Smart Jump Plugin Command's restrictions will be added onto these.
 * 
 * ---
 * 
 * <Smart Jump Non-Pass Terrain Tags: x>
 * <Smart Jump Non-Pass Terrain Tags: x, x, x>
 * 
 * - Used for: Tileset Notetags
 * - Use this notetag to mark tiles on the map where Smart Jump cannot land.
 * - This is primarily used for things like barriers, preventing the player
 *   from being able to leap past it or on it.
 * - Replace 'x' with a number (0 to 7) representing the terrain tag ID used to
 *   mark the non-passable tiles.
 *   - Insert multiple numbers to mark more terrain tags.
 * - This will override the terrain tag settings found in the Plugin Parameters
 *   for this specific map.
 *   - However, it will not override custom settings found in Smart Jump
 *     Plugin Command.
 *   - The Smart Jump Plugin Command's restrictions will be added onto these.
 * 
 * ---
 * 
 * <Smart Jump Height-Based Regions: x, x>
 * <Smart Jump Height-Based Regions: x, x, x>
 * 
 * - Used for: Map Notetags
 * - Allows you to assign certain tiles to be marked as a specific height for
 *   Smart Jump to interact with.
 * - Replace 'x' with a number (0 to 255) representing the region ID to use as
 *   a height marker.
 *   - Insert multiple numbers to mark more regions.
 * - Height-Based Region interactions work as follows:
 *   - Players can jump from a height-based region to another height-based
 *     region of the same or lower value as long as that region is listed, too.
 *     - Regions listed: 10, 13, 15.
 *     - ie. The player can jump from Region 15 to 15.
 *     - ie. The player can jump from Region 15 to 13.
 *     - ie. The player can jump from Region 15 to 10.
 *     - ie. The player CANNOT jump from Region 13 to 15.
 *     - ie. The player CANNOT jump from Region 10 to 13.
 *     - ie. The player CANNOT jump from Region 10 to 15.
 *   - The lowest value number in the list is considered a "ledge" and the
 *     lowest possible level.
 *   - Players can jump in and out of the lowest level regions into non-height
 *     marked regions.
 *   - If the player is jumping towards the up, left, right directions, they
 *     cannot jump directly into a "ledge" region unless they are adjacent to
 *     the marked tile. A distance greater than 1 tile apart cannot be and the
 *     jump will be cut short.
 *   - If the player is jumping upward towards a "ledge", the player will jump
 *     directly onto the next available tile.
 *   - If the player is jumping towards the left or right directions into a
 *     "ledge" region, the player will "fall" a tile distance equal to the
 *     difference from the region height they're jumping from.
 *     - Regions listed: 10, 13, 15.
 *     - If the player is on Region 15 and jumps into a ledge (10), the player
 *       will drop 5 tiles downward.
 *     - If the player is on Region 13 and jumps into a ledge (10), the player
 *       will drop 3 tiles downward.
 *   - If the player is jumping downward towards a "ledge", the player will
 *     jump the full distance.
 *   - Examples:
 *     - <Smart Jump Height-Based Regions: 10, 13, 15>
 *       - Region 10 will be considered the "ledge" region.
 * 
 * Keep in mind that despite the fact that there is Height-Based Region support
 * for Smart Jump, maps in RPG Maker MZ are still inherently 2D. Therefore, not
 * everything will look correct for every jump-related scenario involving
 * region heights. You may need to make adjustments to maps that work best for
 * the limited 2D nature of mapping in order to adhere to what Height-Based
 * Region support can handle.
 * 
 * ---
 * 
 * <Smart Jump Non-Land>
 * 
 * - Used for: Event Notetags or Event Page Comment Tags
 * - Prevents the player from being able to land on this event.
 * 
 * ---
 * 
 * <Smart Jump Non-Pass>
 * <Illegal Jump>
 * 
 * - Used for: Event Notetags or Event Page Comment Tags
 * - Prevents the player from being able to leap past this event or on it.
 * 
 * ---
 * 
 * === Smart Rush-Related Notetags ===
 * 
 * ---
 * 
 * <No Smart Rush>
 * 
 * - Used for: Map Notetags
 * - Prevents Smart Rush from being used at all on this map.
 * 
 * ---
 * 
 * <Smart Rush Non-Crash Region: x>
 * <Smart Rush Non-Crash Region: x, x, x>
 * 
 * - Used for: Map Notetags
 * - Prevents a screen shake crash effect when crashing into tiles marked by
 *   'x' region(s) after using a Smart Rush.
 * - This is primarily used for tiles such as water tiles so that it doesn't
 *   look like there's an invisible wall where the player is crashing into.
 * - Replace 'x' with a number (0 to 255) representing the region ID used to
 *   mark the non-crashable tiles.
 *   - Insert multiple numbers to mark more regions.
 * - This will override the region settings found in the Plugin Parameters for
 *   this specific map.
 * 
 * ---
 * 
 * <Smart Rush Non-Crash Terrain Tag: x>
 * <Smart Rush Non-Crash Terrain Tag: x, x, x>
 * 
 * - Used for: Tileset Notetags
 * - Prevents a screen shake crash effect when crashing into tiles marked by
 *   'x' terrain tag(s) after using a Smart Rush.
 * - This is primarily used for tiles such as water tiles so that it doesn't
 *   look like there's an invisible wall where the player is crashing into.
 * - Replace 'x' with a number (0 to 7) representing the terrain tag ID used to
 *   mark the non-crashable tiles.
 *   - Insert multiple numbers to mark more terrain tags.
 * - This will override the region settings found in the Plugin Parameters for
 *   this specific tileset.
 * 
 * ---
 * 
 * === Smooth Camera-Related Notetags ===
 * 
 * ---
 *
 * <Force Smooth Camera>
 *
 * - Used for: Map Notetags
 * - This forcefully enables Smooth Camera scrolling regardless of whatever
 *   settings are found in the Plugin Parameters for this particular map.
 * - Plugin Command changes won't bypass this notetag either.
 * - However, if the player turns off Smooth Camera scrolling in the options
 *   menu, then this setting will be turned off.
 *
 * ---
 *
 * <No Smooth Camera>
 *
 * - Used for: Map Notetags
 * - This disables Smooth Camera scrolling regardless of whatever settings are
 *   found in the Plugin Parameters for this particular map.
 * - Plugin Command changes won't bypass this notetag either.
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
 * === Dust Clouds Plugin Commands ===
 * 
 * ---
 * 
 * DUST CLOUDS: Enable/Disable
 * - Enable or Disable the Dust Clouds from spawning when dashing.
 * 
 *   Enable/Disable?:
 *   - Enables or Disables Dust Clouds.
 * 
 * ---
 * 
 * DUST CLOUDS: Change Settings
 * - Alter the existing Dust Clouds settings.
 * 
 *   Appearance:
 * 
 *     Filename:
 *     - Filename of the Dust Cloud. Leave empty if using none.
 * 
 *     Color:
 *     - Color of the dust cloud in #rrggbb format.
 *     - For generated dust clouds only.
 *     - Ignore if using image.
 * 
 *     Radius:
 *     - What is the max radius of this dust cloud?
 *     - For generated dust clouds only.
 *     - Ignore if using image.
 * 
 *     Fullness:
 *     - What is the fullness level (0.0 to 1.0)?
 *     - For generated dust clouds only.
 *     - Ignore if using image.
 * 
 *   Animation:
 * 
 *     Duration:
 *     - How many frames will a dust cloud remain on screen?
 * 
 *     Starting Opacity:
 *     - What is the starting opacity (0-255)?
 *     - Dust cloud opacity will gradually go to 0.
 * 
 *     Starting Scale:
 *     - What is the starting scale (0.0 to 1.0)?
 *     - Dust cloud scale will gradually go to 1.0.
 * 
 * ---
 * 
 * === Footprints and Footsteps Plugin Commands ===
 * 
 * ---
 * 
 * FOOTPRINTS: Enable/Disable
 * - Enable or Disable footprint marks from being made.
 * 
 *   Enable/Disable?:
 *   - Enables or Disables footprint marks.
 * 
 * ---
 * 
 * FOOTSTEPS: Enable/Disable
 * - Enable or Disable footstep sounds from being played.
 * 
 *   Enable/Disable?:
 *   - Enables or Disables footstep sounds.
 * 
 * ---
 * 
 * === Motion Blur Plugin Commands ===
 * 
 * ---
 * 
 * MOTION BLUR: Player
 * - Plays a Motion Blur on the player sprite.
 * - Requires Pixi JS Filters!
 * 
 *   Apply to Followers?:
 *   - Apply this motion blur effect to followers, too?
 * 
 *   Duration:
 *   - Play the Motion Blur effect for how many frames?
 *   - You may use JavaScript code.
 * 
 *   Angle Offset:
 *   - Offset the motion blur angle by this many degrees.
 *   - Original angle is based on facing direction.
 * 
 * ---
 * 
 * MOTION BLUR: Follower(s)
 * - Plays a Motion Blur on the follower sprite(s).
 * - Requires Pixi JS Filters!
 * 
 *   Follower Index(es):
 *   - Select which follower index(es) to affect.
 *   - Index values start at 0.
 * 
 *   Duration:
 *   - Play the Motion Blur effect for how many frames?
 *   - You may use JavaScript code.
 * 
 *   Angle Offset:
 *   - Offset the motion blur angle by this many degrees.
 *   - Original angle is based on facing direction.
 * 
 * ---
 * 
 * MOTION BLUR: Event(s)
 * - Plays a Motion Blur on event sprite(s).
 * - Requires Pixi JS Filters!
 * 
 *   Event ID(s):
 *   - Select which event(s) to affect.
 *   - Index values start at 0.
 * 
 *   Duration:
 *   - Play the Motion Blur effect for how many frames?
 *   - You may use JavaScript code.
 * 
 *   Angle Offset:
 *   - Offset the motion blur angle by this many degrees.
 *   - Original angle is based on facing direction.
 * 
 * ---
 * 
 * === Motion Trail Plugin Commands ===
 * 
 * ---
 * 
 * MOTION TRAIL: Change Settings For Player?
 * - Change Motion Trail settings for the player.
 * - This does NOT enable them. You must do that separately.
 * 
 *   Apply to Followers?:
 *   - Apply this change to followers, too?
 * 
 *   Delay:
 *   - How many frames to delay by when creating a motion trail?
 *   - The higher the delay, the less after images there are.
 * 
 *   Duration:
 *   - How many frames should the motion trail last?
 *   - What do you want to be its duration?
 * 
 *   Hue:
 *   - What do you want to be the hue for the motion trail?
 * 
 *   Starting Opacity:
 *   - What starting opacity value do you want for the motion trail?
 *   - Opacity values decrease over time.
 * 
 *   Tone:
 *   - What tone do you want for the motion trail?
 *   - Format: [Red, Green, Blue, Gray]
 * 
 * ---
 * 
 * MOTION TRAIL: Change Settings For Follower(s)?
 * - Change Motion Trail settings for the follower(s).
 * - This does NOT enable them. You must do that separately.
 * 
 *   Follower Index(es):
 *   - Select which follower index(es) to affect.
 *   - Index values start at 0.
 * 
 *   Delay:
 *   - How many frames to delay by when creating a motion trail?
 *   - The higher the delay, the less after images there are.
 * 
 *   Duration:
 *   - How many frames should the motion trail last?
 *   - What do you want to be its duration?
 * 
 *   Hue:
 *   - What do you want to be the hue for the motion trail?
 * 
 *   Starting Opacity:
 *   - What starting opacity value do you want for the motion trail?
 *   - Opacity values decrease over time.
 * 
 *   Tone:
 *   - What tone do you want for the motion trail?
 *   - Format: [Red, Green, Blue, Gray]
 * 
 * ---
 * 
 * MOTION TRAIL: Change Settings For Event(s)?
 * - Change Motion Trail settings for the event(s).
 * - This does NOT enable them. You must do that separately.
 * 
 *   Event ID(s):
 *   - Select which event(s) to affect.
 *   - Use "0" for "this event".
 * 
 *   Delay:
 *   - How many frames to delay by when creating a motion trail?
 *   - The higher the delay, the less after images there are.
 * 
 *   Duration:
 *   - How many frames should the motion trail last?
 *   - What do you want to be its duration?
 * 
 *   Hue:
 *   - What do you want to be the hue for the motion trail?
 * 
 *   Starting Opacity:
 *   - What starting opacity value do you want for the motion trail?
 *   - Opacity values decrease over time.
 * 
 *   Tone:
 *   - What tone do you want for the motion trail?
 *   - Format: [Red, Green, Blue, Gray]
 * 
 * ---
 * 
 * MOTION TRAIL: Create For Player
 * - Immediately create a motion trail sprite for the player in the player's
 *   current position.
 * 
 *   Apply to Followers?:
 *   - Apply this effect to followers, too?
 * 
 * ---
 * 
 * MOTION TRAIL: Create For Follower(s)
 * - Immediately create a motion trail sprite for the follower(s) in the
 *   follower(s)'s current position.
 * 
 *   Follower Index(es):
 *   - Select which follower index(es) to affect.
 *   - Index values start at 0.
 * 
 * ---
 * 
 * MOTION TRAIL: Create For Event(s)
 * - Immediately create a motion trail sprite for the event(s) in the
 *   event(s)'s current position.
 * 
 *   Event ID(s):
 *   - Select which event(s) to affect.
 *   - Use "0" for "this event".
 * 
 * ---
 * 
 * MOTION TRAIL: Enable For Player?
 * - Enables/disables Motion Trails for player sprite.
 * 
 *   Apply to Followers?:
 *   - Apply this change to followers, too?
 * 
 *   Enable/Disable?
 *   - Enables or Disables Motion Trails.
 * 
 *   Immediately Create?
 *   - Immediately create a motion trail?
 *   - Requires "Enabled" setting to also be true.
 * 
 * ---
 * 
 * MOTION TRAIL: Enable For Follower(s)?
 * - Enables/disables Motion Trails for follower sprite(s).
 * 
 *   Follower Index(es):
 *   - Select which follower index(es) to affect.
 *   - Index values start at 0.
 * 
 *   Enable/Disable?
 *   - Enables or Disables Motion Trails.
 * 
 *   Immediately Create?
 *   - Immediately create a motion trail?
 *   - Requires "Enabled" setting to also be true.
 * 
 * ---
 * 
 * MOTION TRAIL: Enable For Event(s)?
 * - Enables/disables Motion Trails for event sprite(s).
 * 
 *   Event ID(s):
 *   - Select which event(s) to affect.
 *   - Use "0" for "this event".
 * 
 *   Enable/Disable?
 *   - Enables or Disables Motion Trails.
 * 
 *   Immediately Create?
 *   - Immediately create a motion trail?
 *   - Requires "Enabled" setting to also be true.
 * 
 * ---
 * 
 * === Smart Movement Plugin Commands ===
 * 
 * ---
 * 
 * SMART: Directional Move Speed Modifier
 * - Global!
 * - These settings allow you to adjust the movement speed modifiers when
 *   characters are facing certain directions.
 * - This can be used to help give a better illusion that in a storm (or such),
 *   it is harder to move against the wind than with.
 * 
 *   Standard Directions:
 * 
 *     Down Speed:
 *     Left Speed:
 *     Right Speed:
 *     Up Speed:
 *     - What is the movement speed modifier for this direction?
 *     - These affect all characters, from players to followers to events.
 *     - Moving slower goes down 1 speed level.
 *     - Moving faster goes up 1 speed level.
 * 
 *   Diagonal Directions:
 * 
 *     Lower Left:
 *     Lower Right:
 *     Upper Left:
 *     Upper Right:
 *     - What is the movement speed modifier for this direction?
 *     - These affect all characters, from players to followers to events.
 *     - Moving slower goes down 1 speed level.
 *     - Moving faster goes up 1 speed level.
 * 
 * ---
 * 
 * SMART: Smart Blink X Tiles
 * - Player uses "Smart Blink" to teleport forward a distance.
 * - If this is last listed command, this can collide with events.
 * 
 *   Mechanics:
 * 
 *     Distance:
 *     - How many tiles will the player teleport forward?
 *     - You may use JavaScript code.
 * 
 *     Cooldown:
 *     - How many frames must the player wait before reuse?
 *     - You may use JavaScript code.
 * 
 *     Common Event ID:
 *     - If the Smash Blink is successful, play this Common Event as a
 *       Once Parallel.
 *     - Use 0 for none.
 *     - This will NOT play if the player cannot Smart Blink.
 * 
 *   Restrictions:
 * 
 *     Non-Land Regions:
 *     - Which regions forbid Smart Blink from landing on it?
 *     - Adds to map, tileset, and Plugin Parameter settings.
 * 
 *     Non-Land Terrain Tags:
 *     - Which tags forbid Smart Blink from landing on it?
 *     - Adds to map, tileset, and Plugin Parameter settings.
 * 
 *     Non-Pass Regions:
 *     - Which regions will block Smart Blink from going further?
 *     - Adds to map, tileset, and Plugin Parameter settings.
 * 
 *     Non-Pass Terrain Tags:
 *     - Which tags will block Smart Blink from going further?
 *     - Adds to map, tileset, and Plugin Parameter settings.
 * 
 *   Visuals:
 * 
 *     Animation ID:
 *     - What animation do you wish to play on the player if the player can
 *       Smart Blink?
 *     - This will NOT play if the player cannot Smart Blink.
 * 
 *     Motion Trail Settings:
 *     - Adjust the motion trail settings for this Smart Movement.
 *     - For more details, look in the sub section below.
 * 
 *   Sound Effect:
 * 
 *     Filename:
 *     - Filename of the sound effect played for a successful Smart Blink.
 *     - This will NOT play if the player cannot Smart Blink.
 * 
 *     Volume:
 *     - Volume of the sound effect played for a successful Smart Blink.
 *     - This will NOT play if the player cannot Smart Blink.
 * 
 *     Pitch:
 *     - Pitch of the sound effect played for a successful Smart Blink.
 *     - This will NOT play if the player cannot Smart Blink.
 * 
 *     Pan:
 *     - Pan of the sound effect played for a successful Smart Blink.
 *     - This will NOT play if the player cannot Smart Blink.
 * 
 * ---
 * 
 * SMART: Smart Jump X Tiles
 * - Player uses "Smart Jump" to leap forward a distance.
 * - If this is last listed command, this can collide with events.
 * 
 *   Mechanics:
 * 
 *     Distance:
 *     - How many tiles will the player jump forward?
 *     - You may use JavaScript code.
 * 
 *     Cooldown:
 *     - How many frames must the player wait before reuse?
 *     - You may use JavaScript code.
 * 
 *     Common Event ID:
 *     - If the Smash Jump is successful, play this Common Event as a
 *       Once Parallel.
 *     - Use 0 for none.
 *     - This will NOT play if the player cannot Smart Jump.
 * 
 *   Restrictions:
 * 
 *     Non-Land Regions:
 *     - Which regions forbid Smart Jump from landing on it?
 *     - Adds to map, tileset, and Plugin Parameter settings.
 * 
 *     Non-Land Terrain Tags:
 *     - Which tags forbid Smart Jump from landing on it?
 *     - Adds to map, tileset, and Plugin Parameter settings.
 * 
 *     Non-Pass Regions:
 *     - Which regions will block Smart Jump from going further?
 *     - Adds to map, tileset, and Plugin Parameter settings.
 * 
 *     Non-Pass Terrain Tags:
 *     - Which tags will block Smart Jump from going further?
 *     - Adds to map, tileset, and Plugin Parameter settings.
 * 
 *   Visuals:
 * 
 *     Animation ID:
 *     - What animation do you wish to play on the player if the player can
 *       Smart Jump?
 *     - This will NOT play if the player cannot Smart Jump.
 * 
 *     Motion Trail Settings:
 *     - Adjust the motion trail settings for this Smart Movement.
 *     - For more details, look in the sub section below.
 * 
 *   Sound Effect:
 * 
 *     Filename:
 *     - Filename of the sound effect played for a successful Smart Jump.
 *     - This will NOT play if the player cannot Smart Jump.
 * 
 *     Volume:
 *     - Volume of the sound effect played for a successful Smart Jump.
 *     - This will NOT play if the player cannot Smart Jump.
 * 
 *     Pitch:
 *     - Pitch of the sound effect played for a successful Smart Jump.
 *     - This will NOT play if the player cannot Smart Jump.
 * 
 *     Pan:
 *     - Pan of the sound effect played for a successful Smart Jump.
 *     - This will NOT play if the player cannot Smart Jump.
 * 
 * ---
 * 
 * SMART: Smart Rush X Tiles
 * - Player uses "Smart Rush" to rush forward a distance.
 * - If this is last listed command, this can collide with events.
 * 
 *   Mechanics:
 * 
 *     Distance:
 *     - How many tiles will player charge forward?
 *     - You may use JavaScript code.
 * 
 *     Cooldown:
 *     - How many frames must the player wait before reuse?
 *     - You may use JavaScript code.
 * 
 *     Common Event ID:
 *     - If the Smash Rush is successful, play this Common Event as a
 *       Once Parallel.
 *     - Use 0 for none.
 *     - This will NOT play if the player cannot Smart Rush.
 * 
 *     Switch(es):
 *     - Which Switch(es) will turn ON during Smart Rush?
 *     - This Switch(es) will also turn OFF after.
 * 
 *   Visuals:
 * 
 *     Animation ID:
 *     - What animation do you wish to play on the player if the player can
 *       Smart Rush?
 *     - This will NOT play if the player cannot Smart Rush.
 * 
 *     Motion Trail Settings:
 *     - Adjust the motion trail settings for this Smart Movement.
 *     - For more details, look in the sub section below.
 * 
 *     Speed Rate:
 *     - How much faster is "Smart Rush" compared to Dashing?
 *     - You may use JavaScript code.
 * 
 *   Sound Effect:
 * 
 *     Filename:
 *     - Filename of the sound effect played for a successful Smart Rush.
 *     - This will NOT play if the player cannot Smart Rush.
 * 
 *     Volume:
 *     - Volume of the sound effect played for a successful Smart Rush.
 *     - This will NOT play if the player cannot Smart Rush.
 * 
 *     Pitch:
 *     - Pitch of the sound effect played for a successful Smart Rush.
 *     - This will NOT play if the player cannot Smart Rush.
 * 
 *     Pan:
 *     - Pan of the sound effect played for a successful Smart Rush.
 *     - This will NOT play if the player cannot Smart Rush.
 * 
 * ---
 * 
 * Motion Trail Settings
 * - These are sub-settings found for Smart Blink, Smart Jump, and Smart Rush.
 * 
 *   General:
 * 
 *     Override?:
 *     - Override Motion Trail settings temporarily?
 *     - Otherwise, use current player Motion Trail settings.
 * 
 *   Settings:
 * 
 *     Delay:
 *     - How many frames to delay by when creating a motion trail?
 *     - The higher the delay, the less after images there are.
 * 
 *     Duration:
 *     - How many frames should the motion trail last?
 *     - What do you want to be its duration?
 * 
 *     Hue:
 *     - What do you want to be the hue for the motion trail?
 * 
 *     Starting Opacity:
 *     - What starting opacity value do you want for the motion trail?
 *     - Opacity values decrease over time.
 * 
 *     Tone:
 *     - What tone do you want for the motion trail?
 *     - Format: [Red, Green, Blue, Gray]
 * 
 * ---
 * 
 * SMART: Wait for Smart Blink
 * - Waits for player to finish Smart Blinking before continuing.
 * 
 * ---
 * 
 * SMART: Wait for Smart Jump
 * - Waits for player to finish Smart Jumping before continuing.
 * 
 * ---
 * 
 * SMART: Wait for Smart Rush
 * - Waits for player to finish Smart Rushing before continuing.
 * 
 * ---
 * 
 * === Smooth Camera Plugin Commands ===
 * 
 * ---
 *
 * SMOOTH CAMERA: Enable/Disable
 * - Enable or Disable the Smooth Camera.
 *
 *   Enable/Disable?:
 *   - Enables or Disables Smooth Camera.
 *
 * ---
 *
 * SMOOTH CAMERA: Speed Change
 * - Change the scrolling speed for the Smooth Camera.
 *
 *   Walk Speed:
 *
 *     Horizontal Rate:
 *     - Horizontal walking scroll rate adjustment.
 *     - Lower: faster; Higher: slower
 *
 *     Vertical Rate:
 *     - Vertical walking scroll rate adjustment.
 *     - Lower: faster; Higher: slower
 *
 *   Dash Speed:
 *
 *     Horizontal Rate:
 *     - Horizontal dashing scroll rate adjustment.
 *     - Lower: faster; Higher: slower
 *
 *     Vertical Rate:
 *     - Vertical dashing scroll rate adjustment.
 *     - Lower: faster; Higher: slower
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * Here are any unlisted plugin parameter(s) that do not belong under any of
 * the other plugin parameter subcategories.
 *
 * ---
 * 
 * Parameters
 * 
 *   Round Variable Coordinates:
 *   - When using Control Variables to determine Screen X/Y coordinates,
 *     round the display coordinates or not?
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Dust Cloud Settings
 * ============================================================================
 *
 * Dust Clouds can appear when the player (or any character) is dashing. The
 * spawned dust clouds have some randomness to them so not all of them are the
 * same size and scale. You can use images for custom dust clouds or use plugin
 * generated dust clouds for those who don't have custom images to use.
 *
 * ---
 *
 * Default
 * 
 *   Default Enabled?:
 *   - Are Dust Clouds enabled by default?
 * 
 * ---
 * 
 * Appearance:
 * 
 *   Filename:
 *   - Filename of the Dust Cloud. Leave empty if using none.
 * 
 *   Color:
 *   - Color of the dust cloud in #rrggbb format.
 *   - For generated dust clouds only.
 *   - Ignore if using image.
 * 
 *   Radius:
 *   - What is the max radius of this dust cloud?
 *   - For generated dust clouds only.
 *   - Ignore if using image.
 * 
 *   Fullness:
 *   - What is the fullness level (0.0 to 1.0)?
 *   - For generated dust clouds only.
 *   - Ignore if using image.
 * 
 * ---
 * 
 * Animation:
 * 
 *   Duration:
 *   - How many frames will a dust cloud remain on screen?
 * 
 *   Starting Opacity:
 *   - What is the starting opacity (0-255)?
 *   - Dust cloud opacity will gradually go to 0.
 * 
 *   Starting Scale:
 *   - What is the starting scale (0.0 to 1.0)?
 *   - Dust cloud scale will gradually go to 1.0.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Footprint Mark Settings
 * ============================================================================
 *
 * Footprint marks can appear on certain tiles probably marked by specific
 * regions and/or terrain tags. They will not appear normally unless you change
 * up the settings.
 *
 * ---
 *
 * General
 * 
 *   Default Enabled?:
 *   - Are footprint marks enabled by default?
 *
 * ---
 *
 * Appearance
 * 
 *   Opacity:
 *   - What is the starting opacity of the footprint?
 * 
 *   Duration:
 *   - How many frames will footprints remain on the screen
 *     before disappearing?
 * 
 *   Follower Variance:
 *   - What variance should followers have for their footprints?
 *   - This is to avoid them all stepping in the same place.
 *
 * ---
 *
 * Map Defaults
 * 
 *   Regions:
 *   - Which Regions will have footprints appear by default?
 * 
 *   Terrain Tags:
 *   - Which terrain tags will have footprints appear by default?
 *
 * ---
 *
 * Standard Directions
 * 
 *   Down:
 *   Left:
 *   Right:
 *   Up:
 *   - Settings used for footprints when facing moving direction.
 *   - For normal sprite sheets: 0 is left, 1 is center, 2 is right.
 *
 * ---
 *
 * Diagonal Directions
 * 
 *   Lower Left:
 *   Lower Right:
 *   Upper Left:
 *   Upper Right:
 *   - Settings used for footprints when facing moving direction.
 *   - For normal sprite sheets: 0 is left, 1 is center, 2 is right.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Footstep Sounds Settings
 * ============================================================================
 *
 * The following plugin parameters are used to modify the footstep sounds that
 * are played whenever characters move.
 *
 * ---
 *
 * General
 * 
 *   Default Enabled?:
 *   - Are footstep sounds enabled by default?
 * 
 *   Sound by Frame?:
 *   - Play footstep sounds at certain sprite frames or with each tile step?
 *   - For those who want the Yanfly Engine Plugins timing, set this to false.
 *   - On the flipside, setting it to true will cause footstep sounds to occur
 *     whenever the sprite sets its foot down (assuming you setup the frames
 *     correctly with the plugin parameter below).
 * 
 *     Audible Frame(s):
 *     - Which sprite sheet "frames" will play a sound?
 *     - Sprite sheet Frames start at 0.
 * 
 *   Walk Animation Modifier:
 *   - What is the rate at which animations play for walking?
 *   - This is to ensure the sound effects synch up.
 * 
 *   Dash Animation Modifier:
 *   - What is the rate at which animations play for dashing?
 *   - This is to ensure the sound effects synch up.
 *
 * ---
 *
 * Default Sound
 * 
 *   Filename:
 *   - Filename of the sound effect played.
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
 * Distance
 * 
 *   Volume Modifier:
 *   - Modifier per tile distance away from the player.
 *   - Use a decimal value.
 * 
 *   Pitch Modifier:
 *   - Modifier per tile distance away from the player.
 *   - Use a decimal value.
 * 
 *   Pan Modifier:
 *   - Modifier per tile distance away from the player.
 *   - Use an integer value.
 *
 * ---
 *
 * Actor Modifiers
 * 
 *   Enabled for Actors?:
 *   - Are footstep sounds enabled for actors by default?
 * 
 *   Volume Modifier:
 *   - Volume modifier rate for actors.
 *   - Use a decimal value.
 * 
 *   Pitch Modifier:
 *   - Pitch modifier rate for actors.
 *   - Use a decimal value.
 *
 * ---
 *
 * Event Modifiers
 * 
 *   Enabled for Events?:
 *   - Are footstep sounds enabled for events by default?
 * 
 *   Volume Modifier:
 *   - Volume modifier rate for events.
 *   - Use a decimal value.
 * 
 *   Pitch Modifier:
 *   - Pitch modifier rate for events.
 *   - Use a decimal value.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Smart Blink Settings
 * ============================================================================
 *
 * Smart Blink is a Plugin Command launched action. The action will cause the
 * player to teleport forward (up to) a measured distance, bypassing any
 * obstacles and/or walls inbetween. If the Plugin Command is placed at the end
 * of the event list, then the player is able to trigger any other events on
 * the tile that the player has landed on.
 * 
 * Smart Blinking can be customized to not ignore all obstacles and/or walls.
 * In fact, through clever usage of Regions and/or Terrain Tags, game devs can
 * create areas that the player cannot teleport past (resulting in a barrier)
 * or a place that players cannot land on top of (such as rooftops). These
 * restrictions can be made on a global scale, on a map-basis, tileset-basis,
 * or even by Plugin Command-basis.
 * 
 * The Plugin Command best works when paired with a plugin like VisuStella MZ's
 * Button Common Events.
 * 
 * The Plugin Parameters below are the settings that are always static
 * throughout all Smart Blinks.
 *
 * ---
 * 
 * Mechanics
 * 
 *   Allow Diagonal Blink?:
 *   - Allow diagonal Smart Blinking?
 *   - VS8 Sprites only.
 *   - Does NOT work with standard RTP.
 *   - This is disabled by default due to how much distance a diagonal
 *     Smart Blink is able to cover.
 * 
 *   Floor to Ceiling?:
 *   - Allow blinking from floor to ceiling tiles?
 * 
 * ---
 *
 * Visual
 * 
 *   Blur Duration:
 *   - Requires PixiJS Filters!
 *   - How long will the motion blur last?
 * 
 *   Blur Angle Offset:
 *   - Requires PixiJS Filters!
 *   - Offset the motion blur angle by this many degrees.
 *   - Otherwise, the motion blur angle is equal to the direction the player is
 *     facing while blinking.
 *
 * ---
 *
 * Restrictions
 * 
 *   Non-Land Regions:
 *   - Which regions forbid Smart Blink from landing on it?
 *   - These are defaults, which can be replaced by notetags.
 * 
 *   Non-Land Terrain Tags:
 *   - Which tags forbid Smart Blink from landing on it?
 *   - These are defaults, which can be replaced by notetags.
 * 
 *   Non-Pass Regions:
 *   - Which regions will block Smart Blink from going further?
 *   - These are defaults, which can be replaced by notetags.
 * 
 *   Non-Pass Terrain Tags:
 *   - Which tags will block Smart Blink from going further?
 *   - These are defaults, which can be replaced by notetags.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Smart Jump Settings
 * ============================================================================
 *
 * Smart Jump is a Plugin Command launched action. The action will cause the
 * player to jump forward (up to) a measured distance, bypassing any obstacles
 * and/or walls inbetween. If the Plugin Command is placed at the end of the
 * event list, then the player is able to trigger any other events on the tile
 * that the player has landed on.
 * 
 * Smart Jumping can be customized to not ignore all obstacles and/or walls.
 * In fact, through clever usage of Regions and/or Terrain Tags, game devs can
 * create areas that the player cannot jump past (resulting in a barrier)
 * or a place that players cannot land on top of (such as rooftops). These
 * restrictions can be made on a global scale, on a map-basis, tileset-basis,
 * or even by Plugin Command-basis.
 * 
 * Smart Jump also has height based interactions, allowing the player to jump
 * from equal height "regions" to another, such as scaling a cliff. Players can
 * also jump from higher regions to lower regions (as long as both are marked
 * as Height-Based Regions). Here are how Height-Based Regions interact:
 * 
 *   - Players can jump from a height-based region to another height-based
 *     region of the same or lower value as long as that region is listed, too.
 *     - Regions listed: 10, 13, 15.
 *     - ie. The player can jump from Region 15 to 15.
 *     - ie. The player can jump from Region 15 to 13.
 *     - ie. The player can jump from Region 15 to 10.
 *     - ie. The player CANNOT jump from Region 13 to 15.
 *     - ie. The player CANNOT jump from Region 10 to 13.
 *     - ie. The player CANNOT jump from Region 10 to 15.
 * 
 *   - The lowest value number in the list is considered a "ledge" and the
 *     lowest possible level.
 * 
 *   - Players can jump in and out of the lowest level regions into non-height
 *     marked regions.
 * 
 *   - If the player is jumping towards the up, left, right directions, they
 *     cannot jump directly into a "ledge" region unless they are adjacent to
 *     the marked tile. A distance greater than 1 tile apart cannot be and the
 *     jump will be cut short.
 * 
 *   - If the player is jumping upward towards a "ledge", the player will jump
 *     directly onto the next available tile.
 * 
 *   - If the player is jumping towards the left or right directions into a
 *     "ledge" region, the player will "fall" a tile distance equal to the
 *     difference from the region height they're jumping from.
 *     - Regions listed: 10, 13, 15.
 *     - If the player is on Region 15 and jumps into a ledge (10), the player
 *       will drop 5 tiles downward.
 *     - If the player is on Region 13 and jumps into a ledge (10), the player
 *       will drop 3 tiles downward.
 * 
 *   - If the player is jumping downward towards a "ledge", the player will
 *     jump the full distance.
 * 
 * Keep in mind that despite the fact that there is Height-Based Region support
 * for Smart Jump, maps in RPG Maker MZ are still inherently 2D. Therefore, not
 * everything will look correct for every jump-related scenario involving
 * region heights. You may need to make adjustments to maps that work best for
 * the limited 2D nature of mapping in order to adhere to what Height-Based
 * Region support can handle.
 * 
 * The Plugin Command best works when paired with a plugin like VisuStella MZ's
 * Button Common Events.
 * 
 * When Smart Jumping, the player cannot jump from a floor tile to a ceiling
 * tiles (the top tiles of A4 tiles). The player also cannot jump over them to
 * reach the other side of the ceiling tile onto a floor tile.
 * 
 * The Plugin Parameters below are the settings that are always static
 * throughout all Smart Blinks.
 *
 * ---
 * 
 * Mechanics
 * 
 *   Allow Diagonal Jump?:
 *   - Allow diagonal Smart Jumping?
 *   - VS8 Sprites only.
 *   - Does NOT work with standard RTP.
 *   - This is disabled by default due to how much distance a diagonal
 *     Smart Jump is able to cover.
 * 
 *   Height-Based Regions:
 *   - Determine which regions are height-based.
 *   - The lowest value region will be a "ledge".
 * 
 * ---
 *
 * Restrictions
 * 
 *   Non-Land Regions:
 *   - Which regions forbid Smart Blink from landing on it?
 *   - These are defaults, which can be replaced by notetags.
 * 
 *   Non-Land Terrain Tags:
 *   - Which tags forbid Smart Blink from landing on it?
 *   - These are defaults, which can be replaced by notetags.
 * 
 *   Non-Pass Regions:
 *   - Which regions will block Smart Blink from going further?
 *   - These are defaults, which can be replaced by notetags.
 * 
 *   Non-Pass Terrain Tags:
 *   - Which tags will block Smart Blink from going further?
 *   - These are defaults, which can be replaced by notetags.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Smart Rush Settings
 * ============================================================================
 *
 * Smart Rush is a Plugin Command launched action. The action will cause the
 * player to rush forward at faster (normally) than dash speed. If the Plugin
 * Command is placed at the end of the event list, then the player is able to
 * collide with other events, possibly triggering them.
 * 
 * While rushing forward, any switches listed in the Plugin Command will be
 * turned to the ON position, then OFF position once the rushing is finished.
 * This means that any events that the player collides with can have a unique
 * interaction from being rushed into. Examples include making objects fall
 * from trees, breaking down locked doors, or smashing apart rubble.
 * 
 * The Plugin Command best works when paired with a plugin like VisuStella MZ's
 * Button Common Events.
 * 
 * When Smart Rushing into walls, solid objects, or events with a priority type
 * as "Same As Characters", the screen can shake when crashing. This does not
 * apply when crashing into water tiles.
 * 
 * The Plugin Parameters below are the settings that are always static
 * throughout all Smart Rushes.
 *
 * ---
 * 
 * Mechanics
 * 
 *   Allow Diagonal Rush?:
 *   - Allow diagonal Smart Rushing?
 *   - VS8 Sprites only.
 *   - Does NOT work with standard RTP.
 *   - This is disabled by default due to how much distance a diagonal
 *     Smart Rush is able to cover.
 *
 * Visual
 * 
 *   Blur Duration:
 *   - Requires PixiJS Filters!
 *   - How long will the motion blur last?
 * 
 *   Blur Angle Offset:
 *   - Requires PixiJS Filters!
 *   - Offset the motion blur angle by this many degrees.
 *   - Otherwise, the motion blur angle is equal to the direction the player is
 *     rushing at.
 *
 * ---
 *
 * Crash Shake
 * 
 *   Enable Crash Shake?:
 *   - Cause the screen to shake after crashing into an entity?
 *   - Entities can be walls or events.
 * 
 *   Power Rate:
 *   - The power modifier for the screen shake upon crashing into something.
 * 
 *   Speed Rate:
 *   - The speed modifier for the screen shake upon crashing into something.
 * 
 *   Shaking Duration:
 *   - How many frames will the screen shake last after crashing into
 *     something?
 *
 * ---
 * 
 * Non-Crash
 * 
 *   Regions:
 *   - When crashing into these region-marked tiles, do not shake the screen.
 *   - This is primarily used for tiles such as water tiles so that it doesn't
 *     look like there's an invisible wall where the player is crashing into.
 * 
 *   Terrain Tags:
 *   - When crashing into these terrain tagged tiles, do not shake the screen.
 *   - This is primarily used for tiles such as water tiles so that it doesn't
 *     look like there's an invisible wall where the player is crashing into.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Smooth Camera Scrolling Settings
 * ============================================================================
 *
 * Adjust the settings for smooth camera scrolling while the player moves.
 *
 * ---
 *
 * Default
 * 
 *   Default Enabled?:
 *   - Is the Smooth Camera enabled by default?
 *
 *   Walk Speed:
 *
 *     Horizontal Rate:
 *     - Horizontal walking scroll rate adjustment.
 *     - Lower: faster; Higher: slower
 *
 *     Vertical Rate:
 *     - Vertical walking scroll rate adjustment.
 *     - Lower: faster; Higher: slower
 *
 *   Dash Speed:
 *
 *     Horizontal Rate:
 *     - Horizontal dashing scroll rate adjustment.
 *     - Lower: faster; Higher: slower
 *
 *     Vertical Rate:
 *     - Vertical dashing scroll rate adjustment.
 *     - Lower: faster; Higher: slower
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Options Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters control the settings you see in the Options menu.
 * These are for players who might be bothered by some of the various features
 * found in the plugin and will grant them the ability to turn them on/off.
 *
 * ---
 *
 * Default
 * 
 *   Default Enabled?:
 *   - Is the Smooth Camera enabled by default?
 * 
 * ---
 *
 * Dust Cloud:
 * 
 *   Add Option?:
 *   - Add the 'Dust Clouds' option to the Options menu?
 * 
 *   Option Name:
 *   - Command name of the option.
 *
 * ---
 *
 * Smooth Camera:
 * 
 *   Add Option?:
 *   - Add the 'Smooth Scroll' option to the Options menu?
 * 
 *   Option Name:
 *   - Command name of the option.
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
 * * Arisu
 * * Olivia
 * * Irina
 * * Yanfly
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.11: April 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > Round Variable Coordinates
 * **** When using Control Variables to determine Screen X/Y coordinates, round
 *      the display coordinates or not?
 * 
 * Version 1.10: March 14, 2024
 * * Bug Fixes!
 * ** Fixed a bug where the <No Smart Jump> notetag did not work. Fix by Arisu.
 * 
 * Version 1.09: October 12, 2023
 * * Documentation Update!
 * ** Fixed the documentation for terrain tag notetags:
 * *** They should be used as Tileset notetags instead of Map notetags.
 * 
 * Version 1.08: October 27, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: September 1, 2022
 * * Bug Fixes!
 * ** Fixed a bug that prevented some notetags from being used. Fix by Arisu.
 * 
 * Version 1.06: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a crash that prevented some settings from being able to be read
 *    properly. Fix made by Irina.
 * 
 * Version 1.05: August 4, 2022
 * * Compatibility Update!
 * ** Special effects now work better with zoom.
 * * Feature Update!
 * ** Scroll-linked parallax images will now work better with Smooth Scroll.
 * 
 * Version 1.04: July 7, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Smart Blink > Mechanics > Floor to Ceiling?
 * **** Allow blinking from floor to ceiling tiles?
 * 
 * Version 1.03: June 30, 2022
 * * Bug Fixes!
 * ** Followers will no longer cause footstep sounds while in a vehicle.
 *    Fix made by Irina.
 * * Documentation Update
 * ** Added to: Plugin Parameters: Smart Rush Settings
 * *** When Smart Rushing into walls, solid objects, or events with a priority
 *     type as "Same As Characters", the screen can shake when crashing. This
 *     does not apply when crashing into water tiles.
 * ** Added to: Plugin Parameters: Smart Jump Settings
 * *** When Smart Jumping, the player cannot jump from a floor tile to a
 *     ceiling tiles (the top tiles of A4 tiles). The player also cannot jump
 *     over them to reach the other side of the ceiling tile onto a floor tile.
 * * Feature Update!
 * ** Smart Rush will no longer play a crash animation when targeting a water
 *    tile. Update made by Irina.
 * ** Smart Jump will no longer be able to jump over ceiling tiles if the
 *    player character is on a floor tile. Update made by Irina.
 * ** Smart Jump will no longer be able to jump onto ceiling tiles if the
 *    player character is on a floor tile. Update made by Irina.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.02: June 23, 2022
 * * Feature Update!
 * ** Smart Jump, Smart Rush, and Smart Blink are now temporarily disabled
 *    while followers are in the middle of gathering to reduce errors. Update
 *    made by Olivia.
 * 
 * Version 1.01: March 31, 2022
 * * Bug Fixes!
 * ** <Terrain Tag x Footsteps: filename> notetag should now work properly.
 *    Fix made by Arisu.
 * 
 * Version 1.00 Official Release Date: April 4, 2022
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_DustCloud
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_DustCloud
 * @text Category - Dust Clouds
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DustCloudEnableDisable
 * @text DUST CLOUDS: Enable/Disable
 * @desc Enable or Disable the Dust Clouds from spawning when dashing.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Dust Clouds ON
 * @off Dust Clouds OFF
 * @desc Enables or Disables Dust Clouds.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DustCloudChangeSettings
 * @text DUST CLOUDS: Change Settings
 * @desc Alter the existing Dust Clouds settings.
 * 
 * @arg Appearance
 * 
 * @arg filename:str
 * @text Filename
 * @parent Appearance
 * @type file
 * @dir img/pictures/
 * @require 1
 * @desc Filename of the Dust Cloud. Leave empty if using none.
 * @default 
 *
 * @arg color:str
 * @text Color
 * @parent Appearance
 * @desc Color of the dust cloud in #rrggbb format.
 * For generated dust clouds only. Ignore if using image.
 * @default #ffffff
 *
 * @arg radius:num
 * @text Radius
 * @parent Appearance
 * @type number
 * @min 1
 * @desc What is the max radius of this dust cloud?
 * For generated dust clouds only. Ignore if using image.
 * @default 24
 *
 * @arg fullness:num
 * @text Fullness
 * @parent Appearance
 * @desc What is the fullness level (0.0 to 1.0)?
 * For generated dust clouds only. Ignore if using image.
 * @default 0.20
 * 
 * @arg Animation
 *
 * @arg wholeDuration:num
 * @text Duration
 * @parent Animation
 * @type number
 * @min 1
 * @desc How many frames will a dust cloud remain on screen?
 * @default 20
 *
 * @arg startOpacity:num
 * @text Starting Opacity
 * @parent Animation
 * @type number
 * @min 1
 * @max 255
 * @desc What is the starting opacity (0-255)?
 * Dust cloud opacity will gradually go to 0.
 * @default 192
 *
 * @arg startScale:num
 * @text Starting Scale
 * @parent Animation
 * @desc What is the starting scale (0.0 to 1.0)?
 * Dust cloud scale will gradually go to 1.0.
 * @default 0.2
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Footprints
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_Footprints
 * @text Category - Footprints & Footsteps
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FootprintsEnableDisable
 * @text FOOTPRINTS: Enable/Disable
 * @desc Enable or Disable footprint marks from being made.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Footprint Marks ON
 * @off Footprint Marks OFF
 * @desc Enables or Disables footprint marks.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FootstepsEnableDisable
 * @text FOOTSTEPS: Enable/Disable
 * @desc Enable or Disable footstep sounds from being played.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Footstep Sounds ON
 * @off Footstep Sounds OFF
 * @desc Enables or Disables footstep sounds.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_MotionBlur
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_MotionBlur
 * @text Category - Motion Blur
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionBlurPlayer
 * @text MOTION BLUR: Player
 * @desc Plays a Motion Blur on the player sprite.
 * Requires Pixi JS Filters!
 *
 * @arg ApplyFollowers:eval
 * @text Apply to Followers?
 * @type boolean
 * @on Apply
 * @off Ignore
 * @desc Apply this motion blur effect to followers, too?
 * @default true
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Play the Motion Blur effect for how many frames?
 * You may use JavaScript code.
 * @default 30
 *
 * @arg AngleOffset:eval
 * @text Angle Offset
 * @desc Offset the motion blur angle by this many degrees.
 * Original angle is based on facing direction.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionBlurFollower
 * @text MOTION BLUR: Follower(s)
 * @desc Plays a Motion Blur on the follower sprite(s).
 * Requires Pixi JS Filters!
 *
 * @arg Index:arraynum
 * @text Follower Index(es)
 * @type number[]
 * @desc Select which follower index(es) to affect.
 * Index values start at 0.
 * @default ["0"]
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Play the Motion Blur effect for how many frames?
 * You may use JavaScript code.
 * @default 30
 *
 * @arg AngleOffset:eval
 * @text Angle Offset
 * @desc Offset the motion blur angle by this many degrees.
 * Original angle is based on facing direction.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionBlurEvent
 * @text MOTION BLUR: Event(s)
 * @desc Plays a Motion Blur on event sprite(s).
 * Requires Pixi JS Filters!
 *
 * @arg EventID:arraynum
 * @text Event ID(s)
 * @type number[]
 * @desc Select which event(s) to affect.
 * Use "0" for "this event".
 * @default ["0"]
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Play the Motion Blur effect for how many frames?
 * You may use JavaScript code.
 * @default 30
 *
 * @arg AngleOffset:eval
 * @text Angle Offset
 * @desc Offset the motion blur angle by this many degrees.
 * Original angle is based on facing direction.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_MotionTrails
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_MotionTrails
 * @text Category - Motion Trails
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionTrailSettingsChangePlayer
 * @text MOTION TRAIL: Change Settings For Player?
 * @desc Change Motion Trail settings for the player.
 * This does NOT enable them. You must do that separately.
 *
 * @arg ApplyFollowers:eval
 * @text Apply to Followers?
 * @type boolean
 * @on Apply
 * @off Ignore
 * @desc Apply this change to followers, too?
 * @default true
 *
 * @arg delay:num
 * @text Delay
 * @type number
 * @min 1
 * @desc How many frames to delay by when creating a motion trail?
 * The higher the delay, the less after images there are.
 * @default 4
 *
 * @arg duration:num
 * @text Duration
 * @type number
 * @min 1
 * @desc How many frames should the motion trail last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg hue:num
 * @text Hue
 * @type number
 * @min 0
 * @max 360
 * @desc What do you want to be the hue for the motion trail?
 * @default 0
 *
 * @arg opacityStart:num
 * @text Starting Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc What starting opacity value do you want for the motion
 * trail? Opacity values decrease over time.
 * @default 128
 *
 * @arg tone:eval
 * @text Tone
 * @desc What tone do you want for the motion trail?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionTrailSettingsChangeFollower
 * @text MOTION TRAIL: Change Settings For Follower(s)?
 * @desc Change Motion Trail settings for follower(s).
 * This does NOT enable them. You must do that separately.
 *
 * @arg Index:arraynum
 * @text Follower Index(es)
 * @type number[]
 * @desc Select which follower index(es) to affect.
 * Index values start at 0.
 * @default ["0"]
 *
 * @arg delay:num
 * @text Delay
 * @type number
 * @min 1
 * @desc How many frames to delay by when creating a motion trail?
 * The higher the delay, the less after images there are.
 * @default 4
 *
 * @arg duration:num
 * @text Duration
 * @type number
 * @min 1
 * @desc How many frames should the motion trail last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg hue:num
 * @text Hue
 * @type number
 * @min 0
 * @max 360
 * @desc What do you want to be the hue for the motion trail?
 * @default 0
 *
 * @arg opacityStart:num
 * @text Starting Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc What starting opacity value do you want for the motion
 * trail? Opacity values decrease over time.
 * @default 128
 *
 * @arg tone:eval
 * @text Tone
 * @desc What tone do you want for the motion trail?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionTrailSettingsChangeEvent
 * @text MOTION TRAIL: Change Settings For Event(s)?
 * @desc Change Motion Trail settings for event(s).
 * This does NOT enable them. You must do that separately.
 *
 * @arg EventID:arraynum
 * @text Event ID(s)
 * @type number[]
 * @desc Select which event(s) to affect.
 * Use "0" for "this event".
 * @default ["0"]
 *
 * @arg delay:num
 * @text Delay
 * @type number
 * @min 1
 * @desc How many frames to delay by when creating a motion trail?
 * The higher the delay, the less after images there are.
 * @default 4
 *
 * @arg duration:num
 * @text Duration
 * @type number
 * @min 1
 * @desc How many frames should the motion trail last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg hue:num
 * @text Hue
 * @type number
 * @min 0
 * @max 360
 * @desc What do you want to be the hue for the motion trail?
 * @default 0
 *
 * @arg opacityStart:num
 * @text Starting Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc What starting opacity value do you want for the motion
 * trail? Opacity values decrease over time.
 * @default 128
 *
 * @arg tone:eval
 * @text Tone
 * @desc What tone do you want for the motion trail?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionTrailCreateForPlayer
 * @text MOTION TRAIL: Create For Player
 * @desc Immediately create a motion trail sprite for the player
 * in the player's current position.
 *
 * @arg ApplyFollowers:eval
 * @text Apply to Followers?
 * @type boolean
 * @on Apply
 * @off Ignore
 * @desc Apply this effect to followers, too?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionTrailCreateForFollower
 * @text MOTION TRAIL: Create For Follower(s)
 * @desc Immediately create a motion trail sprite for the follower(s)
 * in the follower(s)'s current position.
 *
 * @arg Index:arraynum
 * @text Follower Index(es)
 * @type number[]
 * @desc Select which follower index(es) to target.
 * Index values start at 0.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionTrailCreateForEvent
 * @text MOTION TRAIL: Create For Event(s)
 * @desc Immediately create a motion trail sprite for the event(s)
 * in the event(s)'s current position.
 *
 * @arg EventID:arraynum
 * @text Event ID(s)
 * @type number[]
 * @desc Select which event(s) to target.
 * Use "0" for "this event".
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionTrailEnablePlayer
 * @text MOTION TRAIL: Enable For Player?
 * @desc Enables/disables Motion Trails for player sprite.
 *
 * @arg ApplyFollowers:eval
 * @text Apply to Followers?
 * @type boolean
 * @on Apply
 * @off Ignore
 * @desc Apply this change to followers, too?
 * @default true
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Motion Trails ON
 * @off Motion Trails OFF
 * @desc Enables or Disables Motion Trails.
 * @default true
 *
 * @arg ImmediateCreate:eval
 * @text Immediately Create?
 * @type boolean
 * @on Create
 * @off Ignore
 * @desc Immediately create a motion trail?
 * Requires "Enabled" setting to also be true.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionTrailEnableFollower
 * @text MOTION TRAIL: Enable For Follower(s)?
 * @desc Plays a Motion Blur on the follower sprite(s).
 * Requires Pixi JS Filters!
 *
 * @arg Index:arraynum
 * @text Follower Index(es)
 * @type number[]
 * @desc Select which follower index(es) to affect.
 * Index values start at 0.
 * @default ["0"]
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Motion Trails ON
 * @off Motion Trails OFF
 * @desc Enables or Disables Motion Trails.
 * @default true
 *
 * @arg ImmediateCreate:eval
 * @text Immediately Create?
 * @type boolean
 * @on Create
 * @off Ignore
 * @desc Immediately create a motion trail?
 * Requires "Enabled" setting to also be true.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionTrailEnableEvent
 * @text MOTION TRAIL: Enable For Event(s)?
 * @desc Plays a Motion Blur on event sprite(s).
 * Requires Pixi JS Filters!
 *
 * @arg EventID:arraynum
 * @text Event ID(s)
 * @type number[]
 * @desc Select which event(s) to affect.
 * Use "0" for "this event".
 * @default ["0"]
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Motion Trails ON
 * @off Motion Trails OFF
 * @desc Enables or Disables Motion Trails.
 * @default true
 *
 * @arg ImmediateCreate:eval
 * @text Immediately Create?
 * @type boolean
 * @on Create
 * @off Ignore
 * @desc Immediately create a motion trail?
 * Requires "Enabled" setting to also be true.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SmartMove
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_SmartMove
 * @text Category - Smart Movements
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SmartDirMoveSpeedMod
 * @text SMART: Directional Move Speed Modifier
 * @desc Global! These settings allow you to adjust the movement speed
 * modifiers when characters are facing certain directions.
 * 
 * @arg Standard
 * @text Standard Directions
 *
 * @arg dir2:str
 * @text Down Speed
 * @parent Standard
 * @type select
 * @option slower
 * @option normal
 * @option faster
 * @desc What is the movement speed modifier for this direction?
 * @default normal
 *
 * @arg dir4:str
 * @text Left Speed
 * @parent Standard
 * @type select
 * @option slower
 * @option normal
 * @option faster
 * @desc What is the movement speed modifier for this direction?
 * @default normal
 *
 * @arg dir6:str
 * @text Right Speed
 * @parent Standard
 * @type select
 * @option slower
 * @option normal
 * @option faster
 * @desc What is the movement speed modifier for this direction?
 * @default normal
 *
 * @arg dir8:str
 * @text Up Speed
 * @parent Standard
 * @type select
 * @option slower
 * @option normal
 * @option faster
 * @desc What is the movement speed modifier for this direction?
 * @default normal
 * 
 * @arg Diagonal
 * @text Diagonal Directions
 *
 * @arg dir1:str
 * @text Lower Left Speed
 * @parent Diagonal
 * @type select
 * @option slower
 * @option normal
 * @option faster
 * @desc What is the movement speed modifier for this direction?
 * @default normal
 *
 * @arg dir3:str
 * @text Lower Right Speed
 * @parent Diagonal
 * @type select
 * @option slower
 * @option normal
 * @option faster
 * @desc What is the movement speed modifier for this direction?
 * @default normal
 *
 * @arg dir7:str
 * @text Upper Left Speed
 * @parent Diagonal
 * @type select
 * @option slower
 * @option normal
 * @option faster
 * @desc What is the movement speed modifier for this direction?
 * @default normal
 *
 * @arg dir9:str
 * @text Upper Right Speed
 * @parent Diagonal
 * @type select
 * @option slower
 * @option normal
 * @option faster
 * @desc What is the movement speed modifier for this direction?
 * @default normal
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SmartBlinkDistance
 * @text SMART: Smart Blink X Tiles
 * @desc Player uses "Smart Blink" to teleport forward a distance.
 * If this is last listed command, this can collide with events.
 * 
 * @arg Mechanics
 *
 * @arg Distance:eval
 * @text Distance
 * @parent Mechanics
 * @desc How many tiles will the player teleport forward?
 * You may use JavaScript code.
 * @default 5
 *
 * @arg Cooldown:eval
 * @text Cooldown
 * @parent Mechanics
 * @desc How many frames must the player wait before reuse?
 * You may use JavaScript code.
 * @default 60
 *
 * @arg OnSuccessCommonEventID:eval
 * @text Common Event ID
 * @parent Mechanics
 * @type common_event
 * @desc If the Smash Blink is successful, play this Common Event
 * as a Once Parallel. Use 0 for none.
 * @default 0
 * 
 * @arg Restrict
 * @text Restrictions
 *
 * @arg NonLandableRegions:arraynum
 * @text Non-Land Regions
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 255
 * @desc Which regions forbid Smart Blink from landing on it?
 * Adds to map, tileset, and Plugin Parameter settings.
 * @default []
 *
 * @arg NonLandableTerrainTags:arraynum
 * @text Non-Land Terrain Tags
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 7
 * @desc Which tags forbid Smart Blink from landing on it?
 * Adds to map, tileset, and Plugin Parameter settings.
 * @default []
 *
 * @arg NonPassableRegions:arraynum
 * @text Non-Pass Regions
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 255
 * @desc Which regions will block Smart Blink from going further?
 * Adds to map, tileset, and Plugin Parameter settings.
 * @default []
 *
 * @arg NonPassableTerrainTags:arraynum
 * @text Non-Pass Terrain Tags
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 7
 * @desc Which tags will block Smart Blink from going further?
 * Adds to map, tileset, and Plugin Parameter settings.
 * @default []
 * 
 * @arg Visual
 * @text Visuals
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Visual
 * @type animation
 * @desc What animation do you wish to play on the player
 * if the player can Smart Blink?
 * @default 0
 *
 * @arg MotionTrail:struct
 * @text Motion Trail Settings
 * @parent Visual
 * @type struct<MotionTrail>
 * @desc Adjust the motion trail settings for this Smart Movement.
 * @default {"General":"","enabled:eval":"true","Settings":"","delay:num":"4","duration:num":"60","hue:num":"0","opacityStart:num":"255","tone:eval":"[0, 192, 192, 128]"}
 * 
 * @arg SoundEffect
 * @text Sound Effect
 *
 * @arg sfxName:str
 * @text Filename
 * @parent SoundEffect
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc Filename of the sound effect played for a successful Smart Blink.
 * @default Flash2
 *
 * @arg sfxVolume:num
 * @text Volume
 * @parent SoundEffect
 * @type number
 * @max 100
 * @desc Volume of the sound effect played for a successful Smart Blink.
 * @default 50
 *
 * @arg sfxPitch:num
 * @text Pitch
 * @parent SoundEffect
 * @type number
 * @desc Pitch of the sound effect played for a successful Smart Blink.
 * @default 120
 *
 * @arg sfxPan:num
 * @text Pan
 * @parent SoundEffect
 * @desc Pan of the sound effect played for a successful Smart Blink.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SmartJumpDistance
 * @text SMART: Smart Jump X Tiles
 * @desc Player uses "Smart Jump" to leap forward a distance.
 * If this is last listed command, this can collide with events.
 * 
 * @arg Mechanics
 *
 * @arg Distance:eval
 * @text Distance
 * @parent Mechanics
 * @desc How many tiles will the player jump forward?
 * You may use JavaScript code.
 * @default 2
 *
 * @arg Cooldown:eval
 * @text Cooldown
 * @parent Mechanics
 * @desc How many frames must the player wait before reuse?
 * You may use JavaScript code.
 * @default 5
 *
 * @arg OnSuccessCommonEventID:eval
 * @text Common Event ID
 * @parent Mechanics
 * @type common_event
 * @desc If the Smash Jump is successful, play this Common Event
 * as a Once Parallel. Use 0 for none.
 * @default 0
 * 
 * @arg Restrict
 * @text Restrictions
 *
 * @arg NonLandableRegions:arraynum
 * @text Non-Land Regions
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 255
 * @desc Which regions forbid Smart Jump from landing on it?
 * Adds to map, tileset, and Plugin Parameter settings.
 * @default []
 *
 * @arg NonLandableTerrainTags:arraynum
 * @text Non-Land Terrain Tags
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 7
 * @desc Which tags forbid Smart Jump from landing on it?
 * Adds to map, tileset, and Plugin Parameter settings.
 * @default []
 *
 * @arg NonPassableRegions:arraynum
 * @text Non-Pass Regions
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 255
 * @desc Which regions will block Smart Jump from going further?
 * Adds to map, tileset, and Plugin Parameter settings.
 * @default []
 *
 * @arg NonPassableTerrainTags:arraynum
 * @text Non-Pass Terrain Tags
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 7
 * @desc Which tags will block Smart Jump from going further?
 * Adds to map, tileset, and Plugin Parameter settings.
 * @default []
 * 
 * @arg Visual
 * @text Visuals
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Visual
 * @type animation
 * @desc What animation do you wish to play on the player
 * if the player can Smart Jump?
 * @default 0
 *
 * @arg MotionTrail:struct
 * @text Motion Trail Settings
 * @parent Visual
 * @type struct<MotionTrail>
 * @desc Adjust the motion trail settings for this Smart Movement.
 * @default {"General":"","enabled:eval":"true","Settings":"","delay:num":"4","duration:num":"30","hue:num":"0","opacityStart:num":"128","tone:eval":"[0, 0, 0, 0]"}
 * 
 * @arg SoundEffect
 * @text Sound Effect
 *
 * @arg sfxName:str
 * @text Filename
 * @parent SoundEffect
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc Filename of the sound effect played for a successful Smart Jump.
 * @default Jump1
 *
 * @arg sfxVolume:num
 * @text Volume
 * @parent SoundEffect
 * @type number
 * @max 100
 * @desc Volume of the sound effect played for a successful Smart Jump.
 * @default 50
 *
 * @arg sfxPitch:num
 * @text Pitch
 * @parent SoundEffect
 * @type number
 * @desc Pitch of the sound effect played for a successful Smart Jump.
 * @default 120
 *
 * @arg sfxPan:num
 * @text Pan
 * @parent SoundEffect
 * @desc Pan of the sound effect played for a successful Smart Jump.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SmartRushDistance
 * @text SMART: Smart Rush X Tiles
 * @desc Player uses "Smart Rush" to rush forward a distance.
 * If this is last listed command, this can collide with events.
 * 
 * @arg Mechanics
 *
 * @arg Distance:eval
 * @text Distance
 * @parent Mechanics
 * @desc How many tiles will player charge forward?
 * You may use JavaScript code.
 * @default 5
 *
 * @arg Cooldown:eval
 * @text Cooldown
 * @parent Mechanics
 * @desc How many frames must the player wait before reuse?
 * You may use JavaScript code.
 * @default 30
 *
 * @arg OnSuccessCommonEventID:eval
 * @text Common Event ID
 * @parent Mechanics
 * @type common_event
 * @desc If the Smash Rush is successful, play this Common Event
 * as a Once Parallel. Use 0 for none.
 * @default 0
 *
 * @arg Switches:arraynum
 * @text Switch(es)
 * @parent Mechanics
 * @type switch[]
 * @desc Which Switch(es) will turn ON during Smart Rush?
 * This Switch(es) will also turn OFF after.
 * @default []
 * 
 * @arg Visual
 * @text Visuals
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Visual
 * @type animation
 * @desc What animation do you wish to play on the player
 * if the player can Smart Rush?
 * @default 0
 *
 * @arg MotionTrail:struct
 * @text Motion Trail Settings
 * @parent Visual
 * @type struct<MotionTrail>
 * @desc Adjust the motion trail settings for this Smart Movement.
 * @default {"General":"","enabled:eval":"true","Settings":"","delay:num":"1","duration:num":"30","hue:num":"0","opacityStart:num":"128","tone:eval":"[192, 0, 192, 128]"}
 *
 * @arg SpeedRate:eval
 * @text Speed Rate
 * @parent Visual
 * @desc How much faster is "Smart Rush" compared to Dashing?
 * You may use JavaScript code.
 * @default 1.50
 * 
 * @arg SoundEffect
 * @text Sound Effect
 *
 * @arg sfxName:str
 * @text Filename
 * @parent SoundEffect
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc Filename of the sound effect played for a successful Smart Rush.
 * @default Wind1
 *
 * @arg sfxVolume:num
 * @text Volume
 * @parent SoundEffect
 * @type number
 * @max 100
 * @desc Volume of the sound effect played for a successful Smart Rush.
 * @default 50
 *
 * @arg sfxPitch:num
 * @text Pitch
 * @parent SoundEffect
 * @type number
 * @desc Pitch of the sound effect played for a successful Smart Rush.
 * @default 120
 *
 * @arg sfxPan:num
 * @text Pan
 * @parent SoundEffect
 * @desc Pan of the sound effect played for a successful Smart Rush.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SmartMoveWaitForSmartBlink
 * @text SMART: Wait for Smart Blink
 * @desc Waits for player to finish Smart Blinking before continuing.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SmartMoveWaitForSmartJump
 * @text SMART: Wait for Smart Jump
 * @desc Waits for player to finish Smart Jumping before continuing.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SmartMoveWaitForSmartRush
 * @text SMART: Wait for Smart Rush
 * @desc Waits for player to finish Smart Rushing before continuing.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SmoothCamera
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_SmoothCamera
 * @text Category - Smooth Camera
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SmoothCameraEnableDisable
 * @text SMOOTH CAMERA: Enable/Disable
 * @desc Enable or Disable the Smooth Camera.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Smooth Camera ON
 * @off Smooth Camera OFF
 * @desc Enables or Disables Smooth Camera.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SmoothCameraSpeedChange
 * @text SMOOTH CAMERA: Speed Change
 * @desc Change the scrolling speed for the Smooth Camera.
 *
 * @arg WalkSpeed
 * @text Walking Speed
 *
 * @arg HorzWalk:num
 * @text Horizontal Rate
 * @parent WalkSpeed
 * @type number
 * @min 1
 * @max 48
 * @desc Horizontal walking scroll rate adjustment.
 * Lower: faster; Higher: slower
 * @default 24
 *
 * @arg VertWalk:num
 * @text Vertical Rate
 * @parent WalkSpeed
 * @type number
 * @min 1
 * @max 48
 * @desc Vertical walking scroll rate adjustment.
 * Lower: faster; Higher: slower
 * @default 24
 *
 * @arg DashSpeed
 * @text Dashing Speed
 *
 * @arg HorzDash:num
 * @text Horizontal Rate
 * @parent DashSpeed
 * @type number
 * @min 1
 * @max 48
 * @desc Horizontal dashing scroll rate adjustment.
 * Lower: faster; Higher: slower
 * @default 16
 *
 * @arg VertDash:num
 * @text Vertical Rate
 * @parent DashSpeed
 * @type number
 * @min 1
 * @max 48
 * @desc Vertical dashing scroll rate adjustment.
 * Lower: faster; Higher: slower
 * @default 16
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
 * @param MovementEffects
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param DustCloud:struct
 * @text Dust Cloud Settings
 * @type struct<DustCloud>
 * @desc Adjust the settings for kicked up dust clouds whenever a character is dashing.
 * @default {"Default":"","Enabled:eval":"true","Appearance":"","filename:str":"","color:str":"#ffffff","radius:num":"24","fullness:num":"0.20","Animation":"","wholeDuration:num":"20","startOpacity:num":"192","startScale:num":"0.2"}
 *
 * @param Footprints:struct
 * @text Footprint Marks Settings
 * @type struct<Footprints>
 * @desc Adjust the settings for footprint marks whenever characters walk on the map.
 * @default {"General":"","Enabled:eval":"true","Appearance":"","startOpacity:num":"64","wholeDuration:num":"600","followerVariance:num":"4","MapDefaults":"","DefaultRegions:arraynum":"[]","DefaultTerrainTags:arraynum":"[]","StandardDirections":"","dir2:struct":"{\"pattern0:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"6\\\",\\\"height:num\\\":\\\"8\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"-4\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern1:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern2:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"6\\\",\\\"height:num\\\":\\\"8\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+4\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern3:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern4:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern5:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern6:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern7:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern8:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern9:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern10:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\"}","dir4:struct":"{\"pattern0:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"8\\\",\\\"height:num\\\":\\\"3\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"-6\\\",\\\"offsetY:num\\\":\\\"-4\\\"}\",\"pattern1:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern2:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"8\\\",\\\"height:num\\\":\\\"3\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"-6\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern3:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern4:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern5:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern6:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern7:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern8:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern9:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern10:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\"}","dir6:struct":"{\"pattern0:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"8\\\",\\\"height:num\\\":\\\"3\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+6\\\",\\\"offsetY:num\\\":\\\"-4\\\"}\",\"pattern1:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern2:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"8\\\",\\\"height:num\\\":\\\"3\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+6\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern3:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern4:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern5:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern6:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern7:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern8:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern9:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern10:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\"}","dir8:struct":"{\"pattern0:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"6\\\",\\\"height:num\\\":\\\"8\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+4\\\",\\\"offsetY:num\\\":\\\"-4\\\"}\",\"pattern1:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern2:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"6\\\",\\\"height:num\\\":\\\"8\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"-4\\\",\\\"offsetY:num\\\":\\\"-4\\\"}\",\"pattern3:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern4:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern5:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern6:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern7:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern8:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern9:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern10:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\"}","DiagonalDirections":"","dir1:struct":"{\"pattern0:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern1:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern2:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern3:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern4:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern5:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern6:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern7:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern8:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern9:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern10:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\"}","dir3:struct":"{\"pattern0:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern1:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern2:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern3:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern4:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern5:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern6:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern7:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern8:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern9:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern10:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\"}","dir7:struct":"{\"pattern0:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern1:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern2:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern3:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern4:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern5:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern6:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern7:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern8:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern9:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern10:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\"}","dir9:struct":"{\"pattern0:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern1:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern2:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern3:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern4:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern5:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern6:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern7:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern8:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern9:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern10:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\"}"}
 *
 * @param Footsteps:struct
 * @text Footstep Sounds Settings
 * @type struct<Footsteps>
 * @desc Adjust the settings for the sounds footsteps make whenever characters walk on the map.
 * @default {"General":"","Enabled:eval":"true","SoundByFrame:eval":"true","Frames:arraynum":"[\"0\",\"2\"]","FrameDashModifier:num":"1.5","Default":"","name:str":"Blow2","volume:num":"10","pitch:num":"120","pan:num":"0","Distance":"","distanceVolumeModifier:num":"-0.50","distancePitchModifier:num":"-0.00","distancePanModifier:num":"5","Actor":"","actorEnabled:eval":"true","actorVolumeModifier:num":"1.00","actorPitchModifier:num":"1.00","Event":"","eventEnabled:eval":"true","eventVolumeModifier:num":"1.00","eventPitchModifier:num":"1.00"}
 *
 * @param SmartBlink:struct
 * @text Smart Blink Settings
 * @type struct<SmartBlink>
 * @desc Settings involving the Smart Blink movement ability.
 * @default {"Mechanics":"","allowDiagonal:eval":"false","Visual":"","BlurDuration:num":"30","AngleOffset:num":"-15","Restrict":"","NonLandableRegions:arraynum":"[]","NonLandableTerrainTags:arraynum":"[]","NonPassableRegions:arraynum":"[]","NonPassableTerrainTags:arraynum":"[]"}
 *
 * @param SmartJump:struct
 * @text Smart Jump Settings
 * @type struct<SmartJump>
 * @desc Settings involving the Smart Jump movement ability.
 * @default {"Mechanics":"","allowDiagonal:eval":"false","HeightBasedRegions:arraynum":"[]","Restrict":"","NonLandableRegions:arraynum":"[]","NonLandableTerrainTags:arraynum":"[]","NonPassableRegions:arraynum":"[]","NonPassableTerrainTags:arraynum":"[]"}
 *
 * @param SmartRush:struct
 * @text Smart Rush Settings
 * @type struct<SmartRush>
 * @desc Settings involving the Smart Rush movement ability.
 * @default {"Mechanics":"","allowDiagonal:eval":"false","Visual":"","BlurDuration:num":"30","AngleOffset:num":"15","Shake":"","Enable:eval":"true","ShakePowerRate:num":"3.0","ShakeSpeedRate:num":"3.0","ShakeDuration:num":"20","NonCrash":"","NonCrashRegions:arraynum":"[]","NonCrashTerrainTags:arraynum":"[]"}
 *
 * @param SmoothCamera:struct
 * @text Smooth Camera Scrolling
 * @type struct<SmoothCamera>
 * @desc Adjust the settings for smooth camera scrolling while the player moves.
 * @default {"Default":"","Enabled:eval":"true","WalkSpeed":"","HorzWalk:num":"24","VertWalk:num":"24","DashSpeed":"","HorzDash:num":"16","VertDash:num":"16"}
 *
 * @param Options:struct
 * @text Options Menu Settings
 * @type struct<Options>
 * @desc Options settings for this plugin's various features.
 * @default {"Options":"","AdjustRect:eval":"true","DustCloud":"","AddDustCloud:eval":"true","DustCloudName:str":"Dust Clouds","Footprints":"","AddFootprints:eval":"true","FootprintsName:str":"Footprint Marks","Footsteps":"","AddFootsteps:eval":"true","FootstepsName:str":"Footstep Sounds","SmoothCamera":"","AddSmoothCamera:eval":"true","SmoothCameraName:str":"Smooth Scroll"}
 *
 * @param RoundVariableCoordinates:eval
 * @text Round Variable Coordinates
 * @type boolean
 * @on Round
 * @off Don't Round
 * @desc When using Control Variables to determine Screen X/Y
 * coordinates, round the display coordinates or not?
 * @default false
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
 * Dust Cloud Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~DustCloud:
 *
 * @param Default
 *
 * @param Enabled:eval
 * @text Default Enabled?
 * @parent Default
 * @type boolean
 * @on Dust Clouds ON
 * @off Dust Clouds OFF
 * @desc Are Dust Clouds enabled by default?
 * @default true
 * 
 * @param Appearance
 * 
 * @param filename:str
 * @text Filename
 * @parent Appearance
 * @type file
 * @dir img/pictures/
 * @require 1
 * @desc Filename of the Dust Cloud. Leave empty if using none.
 * @default 
 *
 * @param color:str
 * @text Color
 * @parent Appearance
 * @desc Color of the dust cloud in #rrggbb format.
 * For generated dust clouds only. Ignore if using image.
 * @default #ffffff
 *
 * @param radius:num
 * @text Radius
 * @parent Appearance
 * @type number
 * @min 1
 * @desc What is the max radius of this dust cloud?
 * For generated dust clouds only. Ignore if using image.
 * @default 24
 *
 * @param fullness:num
 * @text Fullness
 * @parent Appearance
 * @desc What is the fullness level (0.0 to 1.0)?
 * For generated dust clouds only. Ignore if using image.
 * @default 0.20
 * 
 * @param Animation
 *
 * @param wholeDuration:num
 * @text Duration
 * @parent Animation
 * @type number
 * @min 1
 * @desc How many frames will a dust cloud remain on screen?
 * @default 20
 *
 * @param startOpacity:num
 * @text Starting Opacity
 * @parent Animation
 * @type number
 * @min 1
 * @max 255
 * @desc What is the starting opacity (0-255)?
 * Dust cloud opacity will gradually go to 0.
 * @default 192
 *
 * @param startScale:num
 * @text Starting Scale
 * @parent Animation
 * @desc What is the starting scale (0.0 to 1.0)?
 * Dust cloud scale will gradually go to 1.0.
 * @default 0.2
 *
 */
/* ----------------------------------------------------------------------------
 * Footprints Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Footprints:
 *
 * @param General
 *
 * @param Enabled:eval
 * @text Default Enabled?
 * @parent General
 * @type boolean
 * @on Footprint Marks ON
 * @off Footprint Marks OFF
 * @desc Are footprint marks enabled by default?
 * @default true
 *
 * @param Appearance
 *
 * @param startOpacity:num
 * @text Opacity
 * @parent Appearance
 * @type number
 * @min 1
 * @max 255
 * @desc What is the starting opacity of the footprint?
 * @default 64
 *
 * @param wholeDuration:num
 * @text Duration
 * @parent Appearance
 * @type number
 * @desc How many frames will footprints remain on the screen before disappearing?
 * @default 600
 *
 * @param followerVariance:num
 * @text Follower Variance
 * @parent Appearance
 * @type number
 * @desc What variance should followers have for their footprints?
 * This is to avoid them all stepping in the same place.
 * @default 4
 * 
 * @param MapDefaults
 * @text Map Defaults
 *
 * @param DefaultRegions:arraynum
 * @text Regions
 * @parent MapDefaults
 * @type number[]
 * @min 0
 * @max 255
 * @desc Which Regions will have footprints appear by default?
 * @default []
 *
 * @param DefaultTerrainTags:arraynum
 * @text Terrain Tags
 * @parent MapDefaults
 * @type number[]
 * @min 0
 * @max 7
 * @desc Which terrain tags will have footprints appear by default?
 * @default []
 * 
 * @param StandardDirections
 * @text Standard Directions
 * 
 * @param dir2:struct
 * @text Down
 * @parent StandardDirections
 * @type struct<FootprintPattern>
 * @desc Settings used for footprints when facing moving direction.
 * For normal sprite sheets: 0's left, 1's center, 2's right.
 * @default {"pattern0:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"6\",\"height:num\":\"8\",\"Offsets\":\"\",\"offsetX:num\":\"-4\",\"offsetY:num\":\"+0\"}","pattern1:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern2:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"6\",\"height:num\":\"8\",\"Offsets\":\"\",\"offsetX:num\":\"+4\",\"offsetY:num\":\"+0\"}","pattern3:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern4:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern5:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern6:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern7:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern8:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern9:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern10:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}"}
 * 
 * @param dir4:struct
 * @text Left
 * @parent StandardDirections
 * @type struct<FootprintPattern>
 * @desc Settings used for footprints when facing moving direction.
 * For normal sprite sheets: 0's left, 1's center, 2's right.
 * @default {"pattern0:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"8\",\"height:num\":\"3\",\"Offsets\":\"\",\"offsetX:num\":\"-6\",\"offsetY:num\":\"-4\"}","pattern1:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern2:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"8\",\"height:num\":\"3\",\"Offsets\":\"\",\"offsetX:num\":\"-6\",\"offsetY:num\":\"+0\"}","pattern3:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern4:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern5:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern6:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern7:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern8:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern9:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern10:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}"}
 * 
 * @param dir6:struct
 * @text Right
 * @parent StandardDirections
 * @type struct<FootprintPattern>
 * @desc Settings used for footprints when facing moving direction.
 * For normal sprite sheets: 0's left, 1's center, 2's right.
 * @default {"pattern0:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"8\",\"height:num\":\"3\",\"Offsets\":\"\",\"offsetX:num\":\"+6\",\"offsetY:num\":\"-4\"}","pattern1:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern2:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"8\",\"height:num\":\"3\",\"Offsets\":\"\",\"offsetX:num\":\"+6\",\"offsetY:num\":\"+0\"}","pattern3:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern4:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern5:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern6:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern7:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern8:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern9:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern10:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}"}
 * 
 * @param dir8:struct
 * @text Up
 * @parent StandardDirections
 * @type struct<FootprintPattern>
 * @desc Settings used for footprints when facing moving direction.
 * For normal sprite sheets: 0's left, 1's center, 2's right.
 * @default {"pattern0:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"6\",\"height:num\":\"8\",\"Offsets\":\"\",\"offsetX:num\":\"+4\",\"offsetY:num\":\"-4\"}","pattern1:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern2:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"6\",\"height:num\":\"8\",\"Offsets\":\"\",\"offsetX:num\":\"-4\",\"offsetY:num\":\"-4\"}","pattern3:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern4:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern5:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern6:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern7:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern8:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern9:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern10:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}"}
 * 
 * @param DiagonalDirections
 * @text Diagonal Directions
 * 
 * @param dir1:struct
 * @text Lower Left
 * @parent DiagonalDirections
 * @type struct<FootprintPattern>
 * @desc Settings used for footprints when facing moving direction.
 * For normal sprite sheets: 0's left, 1's center, 2's right.
 * @default {"pattern0:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern1:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern2:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern3:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern4:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern5:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern6:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern7:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern8:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern9:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern10:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}"}
 * 
 * @param dir3:struct
 * @text Lower Right
 * @parent DiagonalDirections
 * @type struct<FootprintPattern>
 * @desc Settings used for footprints when facing moving direction.
 * For normal sprite sheets: 0's left, 1's center, 2's right.
 * @default {"pattern0:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern1:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern2:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern3:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern4:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern5:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern6:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern7:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern8:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern9:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern10:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}"}
 * 
 * @param dir7:struct
 * @text Upper Left
 * @parent DiagonalDirections
 * @type struct<FootprintPattern>
 * @desc Settings used for footprints when facing moving direction.
 * For normal sprite sheets: 0's left, 1's center, 2's right.
 * @default {"pattern0:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern1:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern2:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern3:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern4:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern5:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern6:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern7:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern8:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern9:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern10:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}"}
 * 
 * @param dir9:struct
 * @text Upper Right
 * @parent DiagonalDirections
 * @type struct<FootprintPattern>
 * @desc Settings used for footprints when facing moving direction.
 * For normal sprite sheets: 0's left, 1's center, 2's right.
 * @default {"pattern0:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern1:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern2:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern3:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern4:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern5:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern6:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern7:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern8:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern9:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern10:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}"}
 *
 */
/* ----------------------------------------------------------------------------
 * Footprint Pattern Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~FootprintPattern:
 * 
 * @param pattern0:struct
 * @text Pattern 0 Settings
 * @type struct<FootprintPatternData>
 * @desc Settings used for footprints left behind with this sprite pattern.
 * @default {"Appearance":"","filename:str":"","Generated":"","width:num":"0","height:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param pattern1:struct
 * @text Pattern 1 Settings
 * @type struct<FootprintPatternData>
 * @desc Settings used for footprints left behind with this sprite pattern.
 * @default {"Appearance":"","filename:str":"","Generated":"","width:num":"0","height:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param pattern2:struct
 * @text Pattern 2 Settings
 * @type struct<FootprintPatternData>
 * @desc Settings used for footprints left behind with this sprite pattern.
 * @default {"Appearance":"","filename:str":"","Generated":"","width:num":"0","height:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param pattern3:struct
 * @text Pattern 3 Settings
 * @type struct<FootprintPatternData>
 * @desc Settings used for footprints left behind with this sprite pattern.
 * @default {"Appearance":"","filename:str":"","Generated":"","width:num":"0","height:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param pattern4:struct
 * @text Pattern 4 Settings
 * @type struct<FootprintPatternData>
 * @desc Settings used for footprints left behind with this sprite pattern.
 * @default {"Appearance":"","filename:str":"","Generated":"","width:num":"0","height:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param pattern5:struct
 * @text Pattern 5 Settings
 * @type struct<FootprintPatternData>
 * @desc Settings used for footprints left behind with this sprite pattern.
 * @default {"Appearance":"","filename:str":"","Generated":"","width:num":"0","height:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param pattern6:struct
 * @text Pattern 6 Settings
 * @type struct<FootprintPatternData>
 * @desc Settings used for footprints left behind with this sprite pattern.
 * @default {"Appearance":"","filename:str":"","Generated":"","width:num":"0","height:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param pattern7:struct
 * @text Pattern 7 Settings
 * @type struct<FootprintPatternData>
 * @desc Settings used for footprints left behind with this sprite pattern.
 * @default {"Appearance":"","filename:str":"","Generated":"","width:num":"0","height:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param pattern8:struct
 * @text Pattern 8 Settings
 * @type struct<FootprintPatternData>
 * @desc Settings used for footprints left behind with this sprite pattern.
 * @default {"Appearance":"","filename:str":"","Generated":"","width:num":"0","height:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param pattern9:struct
 * @text Pattern 9 Settings
 * @type struct<FootprintPatternData>
 * @desc Settings used for footprints left behind with this sprite pattern.
 * @default {"Appearance":"","filename:str":"","Generated":"","width:num":"0","height:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param pattern10:struct
 * @text Pattern 10 Settings
 * @type struct<FootprintPatternData>
 * @desc Settings used for footprints left behind with this sprite pattern.
 * @default {"Appearance":"","filename:str":"","Generated":"","width:num":"0","height:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 */
/* ----------------------------------------------------------------------------
 * Footprint Pattern Data Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~FootprintPatternData:
 *
 * @param Appearance
 *
 * @param filename:str
 * @text Filename
 * @parent Appearance
 * @type file
 * @dir img/pictures/
 * @require 1
 * @desc Filename used for a footprint for this data.
 * If used, ignore generated footprint settings.
 * @default 
 *
 * @param Generated
 *
 * @param width:num
 * @text Width
 * @parent Generated
 * @type number
 * @desc What is the width of this footprint?
 * Ignore if using an image.
 * @default 0
 *
 * @param height:num
 * @text Height
 * @parent Generated
 * @type number
 * @desc What is the height of this footprint?
 * Ignore if using an image.
 * @default 0
 *
 * @param Offsets
 *
 * @param offsetX:num
 * @text Offset X
 * @parent Offsets
 * @desc Offset the X position of this footprint.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param offsetY:num
 * @text Offset Y
 * @parent Offsets
 * @desc Offset the Y position of this footprint.
 * Negative: up. Positive: down.
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * Footsteps Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Footsteps:
 *
 * @param General
 *
 * @param Enabled:eval
 * @text Default Enabled?
 * @parent General
 * @type boolean
 * @on Footstep Sounds ON
 * @off Footstep Sounds OFF
 * @desc Are footstep sounds enabled by default?
 * @default true
 *
 * @param SoundByFrame:eval
 * @text Sound by Frame?
 * @parent General
 * @type boolean
 * @on Sounds by Frames
 * @off Sounds by Steps
 * @desc Play footstep sounds at certain sprite frames or with each tile step?
 * @default true
 *
 * @param Frames:arraynum
 * @text Audible Frame(s)
 * @parent SoundByFrame:eval
 * @type number[]
 * @desc Which sprite sheet "frames" will play a sound?
 * Sprite sheet Frames start at 0.
 * @default ["0","2"]
 *
 * @param FrameWalkModifier:num
 * @text Walk Ani Modifier
 * @parent General
 * @desc What is the rate at which animations play for walking?
 * This is to ensure the sound effects synch up.
 * @default 1.0
 *
 * @param FrameDashModifier:num
 * @text Dash Ani Modifier
 * @parent General
 * @desc What is the rate at which animations play for dashing?
 * This is to ensure the sound effects synch up.
 * @default 1.5
 *
 * @param Default
 * @text Default Sound
 * 
 * @param name:str
 * @text Filename
 * @parent Default
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc Filename of the sound effect played.
 * @default Blow2
 *
 * @param volume:num
 * @text Volume
 * @parent Default
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 10
 *
 * @param pitch:num
 * @text Pitch
 * @parent Default
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param pan:num
 * @text Pan
 * @parent Default
 * @desc Pan of the sound effect played.
 * @default 0
 *
 * @param Distance
 *
 * @param distanceVolumeModifier:num
 * @text Volume Modifier
 * @parent Distance
 * @desc Modifier per tile distance away from the player.
 * Use a decimal value.
 * @default -0.50
 *
 * @param distancePitchModifier:num
 * @text Pitch Modifier
 * @parent Distance
 * @desc Modifier per tile distance away from the player.
 * Use a decimal value.
 * @default -0.00
 *
 * @param distancePanModifier:num
 * @text Pan Modifier
 * @parent Distance
 * @desc Modifier per tile distance away from the player.
 * Use an integer value.
 * @default 5
 *
 * @param Actor
 * @text Actor Modifiers
 *
 * @param actorEnabled:eval
 * @text Enabled for Actors?
 * @parent Actor
 * @type boolean
 * @on Footstep Sounds ON
 * @off Footstep Sounds OFF
 * @desc Are footstep sounds enabled for actors by default?
 * @default true
 *
 * @param actorVolumeModifier:num
 * @text Volume Modifier
 * @parent Actor
 * @desc Volume modifier rate for actors.
 * Use a decimal value.
 * @default 1.00
 *
 * @param actorPitchModifier:num
 * @text Pitch Modifier
 * @parent Actor
 * @desc Pitch modifier rate for actors.
 * Use a decimal value.
 * @default 1.00
 *
 * @param Event
 * @text Event Modifiers
 *
 * @param eventEnabled:eval
 * @text Enabled for Events?
 * @parent Event
 * @type boolean
 * @on Footstep Sounds ON
 * @off Footstep Sounds OFF
 * @desc Are footstep sounds enabled for events by default?
 * @default true
 *
 * @param eventVolumeModifier:num
 * @text Volume Modifier
 * @parent Event
 * @desc Volume modifier rate for events.
 * Use a decimal value.
 * @default 1.00
 *
 * @param eventPitchModifier:num
 * @text Pitch Modifier
 * @parent Event
 * @desc Pitch modifier rate for events.
 * Use a decimal value.
 * @default 1.00
 *
 */
/* ----------------------------------------------------------------------------
 * Smart Blink Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SmartBlink:
 *
 * @param Mechanics
 *
 * @param allowDiagonal:eval
 * @text Allow Diagonal Blink?
 * @parent Mechanics
 * @type boolean
 * @on Allow for VS8-Only
 * @off Forbidden
 * @desc Allow diagonal Smart Blinking?
 * VS8 Sprites only. Does NOT work with standard RTP.
 * @default false
 *
 * @param floorToCeiling:eval
 * @text Floor to Ceiling?
 * @parent Mechanics
 * @type boolean
 * @on Allow
 * @off Forbidden
 * @desc Allow blinking from floor to ceiling tiles?
 * @default false
 * 
 * @param Visual
 *
 * @param BlurDuration:num
 * @text Blur Duration
 * @parent Visual
 * @type number
 * @min 1
 * @desc Requires PixiJS Filters! How long will the motion blur last?
 * @default 30
 *
 * @param AngleOffset:num
 * @text Blur Angle Offset
 * @parent Visual
 * @desc Requires PixiJS Filters! Offset the motion blur angle by this many degrees.
 * @default -15
 * 
 * @param Restrict
 * @text Restrictions
 *
 * @param NonLandableRegions:arraynum
 * @text Non-Land Regions
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 255
 * @desc Which regions forbid Smart Blink from landing on it?
 * These are defaults, which can be replaced by notetags.
 * @default []
 *
 * @param NonLandableTerrainTags:arraynum
 * @text Non-Land Terrain Tags
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 7
 * @desc Which tags forbid Smart Blink from landing on it?
 * These are defaults, which can be replaced by notetags.
 * @default []
 *
 * @param NonPassableRegions:arraynum
 * @text Non-Pass Regions
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 255
 * @desc Which regions will block Smart Blink from going further?
 * These are defaults, which can be replaced by notetags.
 * @default []
 *
 * @param NonPassableTerrainTags:arraynum
 * @text Non-Pass Terrain Tags
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 7
 * @desc Which tags will block Smart Blink from going further?
 * These are defaults, which can be replaced by notetags.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Smart Jump Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SmartJump:
 *
 * @param Mechanics
 *
 * @param allowDiagonal:eval
 * @text Allow Diagonal Jump?
 * @parent Mechanics
 * @type boolean
 * @on Allow for VS8-Only
 * @off Forbidden
 * @desc Allow diagonal Smart Jumping?
 * VS8 Sprites only. Does NOT work with standard RTP.
 * @default false
 *
 * @param HeightBasedRegions:arraynum
 * @text Height-Based Regions
 * @parent Mechanics
 * @type number[]
 * @min 0
 * @max 255
 * @desc Determine which regions are height-based.
 * The lowest value region will be a "ledge".
 * @default []
 * 
 * @param Restrict
 * @text Restrictions
 *
 * @param NonLandableRegions:arraynum
 * @text Non-Land Regions
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 255
 * @desc Which regions forbid Smart Jump from landing on it?
 * These are defaults, which can be replaced by notetags.
 * @default []
 *
 * @param NonLandableTerrainTags:arraynum
 * @text Non-Land Terrain Tags
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 7
 * @desc Which tags forbid Smart Jump from landing on it?
 * These are defaults, which can be replaced by notetags.
 * @default []
 *
 * @param NonPassableRegions:arraynum
 * @text Non-Pass Regions
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 255
 * @desc Which regions will block Smart Jump from going further?
 * These are defaults, which can be replaced by notetags.
 * @default []
 *
 * @param NonPassableTerrainTags:arraynum
 * @text Non-Pass Terrain Tags
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 7
 * @desc Which tags will block Smart Jump from going further?
 * These are defaults, which can be replaced by notetags.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Smart Rush Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SmartRush:
 *
 * @param Mechanics
 *
 * @param allowDiagonal:eval
 * @text Allow Diagonal Rush?
 * @parent Mechanics
 * @type boolean
 * @on Allow for VS8-Only
 * @off Forbidden
 * @desc Allow diagonal Smart Rush?
 * VS8 Sprites only. Does NOT work with standard RTP.
 * @default false
 *
 * @param Visual
 *
 * @param BlurDuration:num
 * @text Blur Duration
 * @parent Visual
 * @type number
 * @min 1
 * @desc Requires PixiJS Filters! How long will the motion blur last?
 * @default 30
 *
 * @param AngleOffset:num
 * @text Blur Angle Offset
 * @parent Visual
 * @desc Requires PixiJS Filters! Offset the motion blur angle by this many degrees.
 * @default 15
 *
 * @param Shake
 * @text Crash Shake
 *
 * @param Enable:eval
 * @text Enable Crash Shake?
 * @parent Shake
 * @type boolean
 * @on Enable Crash Shake
 * @off Disable Crash Shake
 * @desc Cause the screen to shake after crashing into an entity?
 * @default true
 *
 * @param ShakePowerRate:num
 * @text Power Rate
 * @parent Shake
 * @desc The power modifier for the screen shake upon crashing into something.
 * @default 3.0
 *
 * @param ShakeSpeedRate:num
 * @text Speed Rate
 * @parent Shake
 * @desc The speed modifier for the screen shake upon crashing into something.
 * @default 3.0
 *
 * @param ShakeDuration:num
 * @text Shaking Duration
 * @parent Shake
 * @type number
 * @min 1
 * @desc How many frames will the screen shake last after crashing into something?
 * @default 20
 *
 * @param NonCrash
 * @text Non-Crash
 *
 * @param NonCrashRegions:arraynum
 * @text Regions
 * @parent NonCrash
 * @type number[]
 * @min 1
 * @max 255
 * @desc When crashing into these region-marked tiles, do not shake the screen.
 * @default []
 *
 * @param NonCrashTerrainTags:arraynum
 * @text Terrain Tags
 * @parent NonCrash
 * @type number[]
 * @min 1
 * @max 7
 * @desc When crashing into these terrain tagged tiles, do not shake the screen.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Smooth Camera Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SmoothCamera:
 *
 * @param Default
 *
 * @param Enabled:eval
 * @text Default Enabled?
 * @parent Default
 * @type boolean
 * @on Smooth Camera ON
 * @off Smooth Camera OFF
 * @desc Is the Smooth Camera enabled by default?
 * @default true
 *
 * @param WalkSpeed
 * @text Walking Speed
 *
 * @param HorzWalk:num
 * @text Horizontal Rate
 * @parent WalkSpeed
 * @type number
 * @min 1
 * @max 48
 * @desc Horizontal walking scroll rate adjustment.
 * Lower: faster; Higher: slower
 * @default 24
 *
 * @param VertWalk:num
 * @text Vertical Rate
 * @parent WalkSpeed
 * @type number
 * @min 1
 * @max 48
 * @desc Vertical walking scroll rate adjustment.
 * Lower: faster; Higher: slower
 * @default 24
 *
 * @param DashSpeed
 * @text Dashing Speed
 *
 * @param HorzDash:num
 * @text Horizontal Rate
 * @parent DashSpeed
 * @type number
 * @min 1
 * @max 48
 * @desc Horizontal dashing scroll rate adjustment.
 * Lower: faster; Higher: slower
 * @default 16
 *
 * @param VertDash:num
 * @text Vertical Rate
 * @parent DashSpeed
 * @type number
 * @min 1
 * @max 48
 * @desc Vertical dashing scroll rate adjustment.
 * Lower: faster; Higher: slower
 * @default 16
 *
 */
/* ----------------------------------------------------------------------------
 * Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Options:
 *
 * @param Options
 * @text Options
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param DustCloud
 * @text Dust Cloud
 *
 * @param AddDustCloud:eval
 * @text Add Option?
 * @parent DustCloud
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Dust Clouds' option to the Options menu?
 * @default true
 *
 * @param DustCloudName:str
 * @text Option Name
 * @parent DustCloud
 * @desc Command name of the option.
 * @default Dust Clouds
 *
 * @param Footprints
 * @text Footprint Marks
 *
 * @param AddFootprints:eval
 * @text Add Option?
 * @parent Footprints
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Footprint Marks' option to the Options menu?
 * @default true
 *
 * @param FootprintsName:str
 * @text Option Name
 * @parent Footprints
 * @desc Command name of the option.
 * @default Footprint Marks
 *
 * @param Footsteps
 * @text Footstep Sounds
 *
 * @param AddFootsteps:eval
 * @text Add Option?
 * @parent Footsteps
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Footstep Sounds' option to the Options menu?
 * @default true
 *
 * @param FootstepsName:str
 * @text Option Name
 * @parent Footsteps
 * @desc Command name of the option.
 * @default Footstep Sounds
 *
 * @param SmoothCamera
 * @text Smooth Camera
 *
 * @param AddSmoothCamera:eval
 * @text Add Option?
 * @parent SmoothCamera
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Smooth Scroll' option to the Options menu?
 * @default true
 *
 * @param SmoothCameraName:str
 * @text Option Name
 * @parent SmoothCamera
 * @desc Command name of the option.
 * @default Smooth Scroll
 *
 */
/* ----------------------------------------------------------------------------
 * Motion Trail Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MotionTrail:
 *
 * @param General
 *
 * @param enabled:eval
 * @text Override?
 * @parent General
 * @type boolean
 * @on Override Settings
 * @off Don't Override Settings
 * @desc Override Motion Trail settings temporarily?
 * @default true
 *
 * @param Settings
 *
 * @param delay:num
 * @text Delay
 * @parent Settings
 * @type number
 * @min 1
 * @desc How many frames to delay by when creating a motion trail?
 * The higher the delay, the less after images there are.
 * @default 4
 *
 * @param duration:num
 * @text Duration
 * @parent Settings
 * @type number
 * @min 1
 * @desc How many frames should the motion trail last?
 * What do you want to be its duration?
 * @default 30
 *
 * @param hue:num
 * @text Hue
 * @parent Settings
 * @type number
 * @min 0
 * @max 360
 * @desc What do you want to be the hue for the motion trail?
 * @default 0
 *
 * @param opacityStart:num
 * @text Starting Opacity
 * @parent Settings
 * @type number
 * @min 0
 * @max 255
 * @desc What starting opacity value do you want for the motion
 * trail? Opacity values decrease over time.
 * @default 128
 *
 * @param tone:eval
 * @text Tone
 * @parent Settings
 * @desc What tone do you want for the motion trail?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 *
 */
//=============================================================================

function _0x4786(){const _0x406d94=['SmartJumpNonLandTerrainTags','makeDeepCopy','increaseSteps','_regionFootstepSounds','SmartJumpHeightBasedRegions','ShakeDuration','getStraightenDiagonalDirection','_followerOffsetY','SmartRush','TPKgf','NoRegionFootstepSfx','MyQmI','DGtaB','areMotionTrailsEnabled','OnSuccessCommonEventID','ARRAYFUNC','isTileSmartBlinkCompatible','substring','width','PBuaN','_smartRush','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','roundYWithDirection','Game_Player_moveByInput','initMovementEffectsDustCloud','volumeRate','CMJPE','adjustX','NoFBl','_displayY','checkMovementEffectsStringTags','sfxPitch','sfxPan','_baseTexture','_eventIconSprite','prototype','pattern','Game_Interpreter_updateWaitMode','dir4','note','MotionTrailEnablePlayer','_smartRushMotionTrailData','scrollDown','_footstepSoundsEnabled','isCollidedWithCharacters','isMapScrollLinked','parseTerrainTagBasedSmartRush','initRegionTerrainTagSmartJump','VisuMZ_1_EventsMoveCore','Game_CharacterBase_updateAnimationCount','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Acfgt','registerCommand','cos','MotionTrail','parseTerrainTagBasedSmartBlink','smooth','includes','followers','DustCloudEnableDisable','MotionBlurFilter','canSmartRush','executeMove','oivgE','startBattle','YuZHX','smartBlink','FrameDashModifier','updateMotionBlurEffectFilter','scrollLeft','YesFootstepsEvent','LedgeJumpRegion','GjnrX','motionTrailData','setupRegionTerrainTagSmartJump','lower\x20right','canMakeFootstepSounds','oKfXW','_smartBlink','gIQLY','distanceVolumeModifier','right','_lastSmoothScrollX','createSmartBlinkMotionTrailSprite','startSmartRushCrashWalkBack','updateWaitMode','nonLand','HGNJh','YzdGq','ForceDustCloud','pop','_ready','_tilemap','Distance','smartRush','ILqMr','readFlag','character','jumpHeight','KYfLU','LSCjP','dir9','isPlayerSmartRushing','updateSmartJumpCooldown','split','version','isTransparent','MotionTrailCreateForEvent','smartJump','isSmartRushing','BQQKk','isSmartJumping','oTkoN','DustCloud','_smartBlinkDistance','RuTZi','SmartMoveWaitForSmartRush','MotionTrailCreateForFollower','_footsteps','FootstepsEnableDisable','lwLkP','updateFootprintSprite','_footstepCooldownDuration','setupRegionTerrainTagSmartRush','playFootstepSound','setHue','createFootprintBasics','allowDiagonal','GetDirAngle','footprintOpacityAtXy','setupRegionTerrainTagFootprints','NoSmartRush','_footprintMarksEnabled','sfxVolume','canShowDustCloud','smartRushMotionTrailData','_smartJumpMode','filters','sTMQV','SmartJumpNonPassRegions','processSmartJumpHeightFactor','uZTha','RaFbG','rBvwf','_dustCloudData','fullness','FootprintsHeight','PhjbB','parseDirectionText','ShakeSpeedRate','SIbJi','nQxJx','getDirMoveSpeedMod','NonPassableTerrainTags','hue','playOnceParallelInterpreter','IDNFa','initMovementEffectsDirMoveSpeedMod','moveTo','MovementEffectsOptions','NonLandableRegions','_stopCount','create','Game_CharacterBase_straighten','_smartJump','notSmartJumpLandable','checkDustCloudChanges','copyBitmapFrame','direction','dir8','_realY','hHotK','name','offsetX','gameDataOperand','sfxName','#000000','toUpperCase','1544205kJBxvl','isSmartMoving','_smartBlinkMotionTrailData','addGeneralOptions','fill','_followers','scaleX','call','Walk','TerrainTagFootprintDuration','maxCommands','isTileSmartJumpNonLandable','Game_Event_clearPageSettings','RNSni','initMovementEffectsMotionTrails','distancePanModifier','SMART_BLINK_FILTER_DURATION','isSmartBlinkEnabled','_scene','_targetScaleY','exit','_direction','_dustCloudBitmap','hasStepAnime','lineTo','cveLV','setFootprintsEnabled','regionId','_bushDepth','playFootsteps','meetsSmartJumpHeightConditions','isCeilingTile','forbidden','floor','setSmoothCameraSpeed','parseRegionBasedSmartBlink','Dash','NCpne','data','save','Game_Map_parallaxOy','DefaultTerrainTags','description','SMART_RUSH_SHAKE_ENABLED','Game_Player_reserveTransfer','Game_Player_isDashing','46644VLxZeK','setMotionTrailSettings','646192xyswvA','glcCd','SmoothCameraEnableDisable','meetFootprintFrames','tone','terrainTags','_waitMode','Game_Map_parallaxOx','_motionBlurMovementEffectsDuration','parseTerrainTagBasedFootprints','screenX','filename','bPsxf','jaAub','dustCloudData','NoFootsteps','STRUCT','rxtcI','Footprints','isScrolling','moveByInput','ConfigManager_makeData','HPeXk','FrameWalkModifier','MQSEd','SMART_RUSH_SHAKE_POWER_RATE','floorToCeiling','update','format','tileWidth','SmartBlinkNonPassRegions','soundFrames','scDEU','Game_Picture_scaleY','isSmartRushCrashShakeTile','AngleOffset','actorPitchModifier','deltaXFrom','isOnLadder','_footprints','LrbaK','ApplyFollowers','_footprintSprites','startShake','ARRAYSTRUCT','footprints','CatchAll','AdjustRect','SoundByFrame','test','_shiftY','VisuMZ_0_CoreEngine','Duration','_pattern','canSmartBlink','addChild','createFootprint','BKBzJ','updateSmartRushCooldown','Game_Map_changeTileset','_dustCloud','updateMotionTrailSprites','smartBlinkRelocate','color','applyData','ziBZn','_jumpPeak','isVisible','gDpsD','VertWalk','Game_Follower_initialize','isMoving','pzLDY','createDustCloudBasics','straightenFacedDirection','_jumpHeight','FJzax','canSmoothScroll','JSON','createDustCloud','Game_Picture_y','initRegionTerrainTagSmartBlink','NoDustCloud','dir3','initRegionTerrainTagFootstepSounds','HorzDash','canMakeFootprints','NHgoK','dir6','upper\x20left','addMovementEffectsSmoothCameraCommand','hvFNK','SmartBlinkDistance','TocEP','AddFootsteps','QkCOL','children','_motionTrailExpiredSprites','OPSTv','straightenDiagonal','Blow2','SmoothCamera','BtQoq','isJumping','setupOpacity','notSmartJumpPassable','anchor','setupMovementEffectsNotetags','MotionBlurFollower','createMotionTrailContainers','MovementEffects','SmartBlink','zoomScale','isSmartJumpRegionLowestHeight','eventId','904452RVnYCD','fdGkO','actor','updatePattern','createIconSprite','initMovementEffectsSmoothCamera','dir1','ARRAYNUM','initRegionTerrainTagSmartRush','sin','updateCharacterFrame','concat','createFootprintForTarget','Sprite_Picture_updatePosition','addColorStop','enableMotionTrails','parseTerrainTagBasedSmartJump','SmartJump','beginPath','SmartBlinkNonPassTerrainTags','canShowMotionTrails','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_smartRushSwitches','setDirection','startOpacity','height','left','findTargetSprite','max','eventEnabled','moveBySmartRush','isDashing','NonCrashTerrainTags','initMovementEffectsFootstepSounds','SmartMoveWaitForSmartBlink','DustCloudChangeSettings','locate','Game_System_initialize','zPUTy','addMovementEffectsDustCloudCommand','Game_CharacterBase_initMembers','BZFCt','VdfYq','length','_smartJumpRestrictions','_dustCloudSprites','join','Cooldown','bind','_motionTrailLastRealX','straighten','Game_CharacterBase_realMoveSpeed','Spriteset_Map_updateTilemap','Footsteps','SmartJumpNonPassEvent','TerrainTagFootstepSfx','upper\x20right','attachIconSprite','isTileSmartBlinkBreakable','HeightBasedRegions','initRegionTerrainTagFootprints','isTileSmartHeightJumpRegion','1059830liVeTF','tileHeight','checkEventTriggerHere','_erased','delay','_displayX','endSmartRush','setupRegionTerrainTagSmartBlink','setDustCloudData','roundXWithDirection','_opacityRate','removeChild','duration','UgQdd','mRadialArcConstant','return\x200','updateSmoothScrollingContainer','isSmartMoveNonViableState','radius','picture','SMART_RUSH_SHAKE_SPEED_RATE','follower','RegionFootprintDuration','isUsingSmoothCamera','copyBasicProperties','_smartRushCooldown','vert','_frame','SMART_BLINK_FILTER_ANGLE_OFFSET','_baseSprite','HorzWalk','uLdoY','abs','NoSmartBlink','IgtMn','updateDustCloudSprite','kFbzP','Enabled','createDustCloudBitmap','DefaultRegions','randomInt','startSmartRushCrashShake','Game_CharacterBase_updatePattern','BlurDuration','enabled','allowed','eVkha','zsUQy','_footprintsData','setWaitMode','NgLYl','measureSmartJumpDistance','isSmartRushCrashShake','clone','tileset','loadPicture','_targetScaleX','OwIlX','SmartRushDistance','ceil','syUWo','kwsDz','JYCYc','tWmMh','Options','parameters','isSmoothCameraEnabled','NUM','parseTerrainTagBasedFootstepSounds','tBpAU','addMovementEffectsFootprintsCommand','CKcXz','setupDuration','addMovementEffectsFootstepsCommand','ZsQuJ','isTileSmartBlinkNonPassable','parallaxOx','cOIDQ','loadSystem','DBpnw','getSmoothCameraSpeed','random','center','Yprmz','ConfigManager_applyData','parallaxOy','setSmartRushSwitch','leader','playSe','autotileType','_smartJumpCooldown','SmartJumpNonLandEvent','restore','drawCircle','setup','Dzgyq','event','MotionTrailSettingsChangePlayer','horz','terrainTag','round','changeTileset','scale','Game_Map_setup','isInVehicle','isSceneMap','updateDustClouds','EVAL','dir7','FootprintsName','visibleFollowers','stringify','scrollRight','pitch','Scene_Options_maxCommands','hxYoR','isPlayFootstepSoundsByFrame','footprintsData','measureSmartBlinkDistance','FootprintTerrainTags','_character','Sprite_Character_initialize','isTileSmartBlinkNonLandable','setupRegionTerrainTagFootstepSounds','Spriteset_Map_createLowerLayer','createMotionTrailSprite','DustCloudName','updatePosition','_spriteset','Game_Player_updateScroll','makeData','AddFootprints','filter','areFollowersGathering','_lastSmoothScrollY','SNkGM','origin','setSmoothCameraEnabled','eventVolumeModifier','SmartBlinkNonLandRegions','GGcZG','arc','updateMovementEffectsMotionTrails','7fRGZbH','Game_Event_setupPageSettings','createMotionBlurMovementEffectsFilter','addCommand','map','animationWait','realMoveSpeed','MotionBlurPlayer','startMotionBlurEffect','pattern%1','ARRAYJSON','getLastPluginCommandInterpreter','footstepsData','_cached_GeneratedFootprint_Image','initMovementEffectsFootprintMarks','drawDustCloud','ECvKS','constructor','geRiu','setDirMoveSpeedMod','svAOe','FootprintRegions','_motionTrailSettings','Index','_motionTrailSprites','Sprite_Character_update','createLowerLayer','_smartBlinkCooldown','LAVsI','_smartBlinkRestrictions','_dirMoveSpeedMod','volume','SMART_RUSH_FILTER_DURATION','_smartJumpMotionTrailData','pan','isTileSmartJumpNonPassable','MSsld','Enable','blPou','_pictureContainer','TfouR','DFvVG','Game_CharacterBase_animationWait','EventID','dir%1','setFootstepSoundsEnabled','zbtnc','push','updateFootprints','ziODz','distancePitchModifier','parseRegionBasedFootstepSounds','isHeightBasedRegion','MotionTrailCreateForPlayer','actorEnabled','clamp','WjfZr','FootstepsName','VertDash','opacity','SMART_RUSH_SHAKE_DURATION','dOfDE','match','Game_Picture_isMapScrollLinked','scrolledX','QoKEE','pQFhi','isTrueMapScrollLinked','MotionTrailEnableFollower','_smartRushSpeedRate','scrollUp','RegionFootstepSfx','NoSmartJump','Game_Interpreter_gameDataOperand','_parallaxZero','ForceFootsteps','Spriteset_Map_update','ARRAYSTR','Clnke','bAcpx','generatedFootprintBitmap','trim','startScale','zciTY','uvuiJ','createDustCloudForTarget','isTileSmartJumpCompatible','dustCloud','_followerOffsetX','2985882hMselE','AnimationID','SmartJumpNonPassTerrainTags','xGzgw','fNewF','clearPageSettings','setValue','initMovementEffectsVariables','AddDustCloud','FUNC','updateSmartBlinkCooldown','smoothCamera','jBtws','initMembers','synchronize','indexOf','hexToRgba','ConvertParams','SmartJumpDistance','SmartDirMoveSpeedMod','parseRegionBasedFootprints','requestAnimation','MyQeN','_motionTrailLastRealY','_terrainTagFootstepSounds','setColorTone','KwzuH','down','NonLandableTerrainTags','canPass','NonFootprintRegions','actorVolumeModifier','opacityStart','OILaM','Settings','shiftY','SmartJumpLedgeRegion','AddSmoothCamera','BTdnc','NoSmooth','isTileSmartJumpBreakable','pitchRate','isAnimationPlaying','playSmartBlinkFilterEffect','setupIconSprite','pRxmp','NonPassableRegions','canCreateDustCloud','ARRAYEVAL','_customModified','eXqAI','setupMovementEffectsCommentTags','YByfF','_smartJumpRestriction','dir2','NonCrashRegions','offsetY','NoTerrainTagFootstepSfx','isSmartJumpEnabled','_motionBlurMovementEffectsAngleOffset','page','_duration','parse','STR','setupMovementEffectsVariables','checkPassage','remove','eventsXy','SMART_RUSH_FILTER_ANGLE_OFFSET','iclpz','ForceSmooth','ApplyFootstepSfxModifiers','setupPageSettings','XjkqW','_realX','parseRegionBasedSmartRush','CvSJb','DiaHI','310959lkRXmS','randomizeAnimationCount','applyMotionTrailData','RegExp','footsteps','SmartRushAntiCrashTerrainTags','isSmartRushEnabled','createBitmap','ghxHk','ktVRg','ConfigKeys','initialize','Game_Picture_x','context','FootprintsOffset','updateAnimationCount','MotionBlurEvent','centerX','SmartRushAntiCrashRegions','applyFootstepSoundTileChanges','MfoMl','_refresh','ZCQyd','startSmartJump','smartJumpMotionTrailData','PliFo','SmartJumpNonLandRegions','mnhjR','_smoothCamera','SMART_BLINK_FLOOR_TO_CEILING','regions','FootprintsWidth','_motionBlurMovementEffectsFilter','_wasEventScrolling','FootstepsVolRate','updateSmartJumpState','vbiva','isMovementSucceeded','cQyWr','isValid','updateScrollSmoothCamera','TerrainTagFootprintOpacity','MotionTrailEnableEvent','nonPass','visible','bitmap','velocity','jump','meetFootstepFrames','FootprintsEnableDisable','ImmediateCreate','wholeDuration','canSmartJump','RegionFootprintOpacity','niBYi','screenY','_smartRushMode','SmartBlinkNonLandTerrainTags','Window_Options_addGeneralOptions','isPassableByAnyDirection','addMovementEffectsOptionCommands','blendMode','reserveTransfer','IDLVz','Frames','smartBlinkMotionTrailData'];_0x4786=function(){return _0x406d94;};return _0x4786();}const _0x291ba2=_0x459f;(function(_0x2492de,_0x111614){const _0x2ec258=_0x459f,_0x6d9639=_0x2492de();while(!![]){try{const _0x26df37=parseInt(_0x2ec258(0x30c))/0x1+parseInt(_0x2ec258(0x1d6))/0x2+parseInt(_0x2ec258(0x198))/0x3+parseInt(_0x2ec258(0x42e))/0x4+-parseInt(_0x2ec258(0x400))/0x5+-parseInt(_0x2ec258(0x2be))/0x6*(parseInt(_0x2ec258(0x265))/0x7)+-parseInt(_0x2ec258(0x430))/0x8;if(_0x26df37===_0x111614)break;else _0x6d9639['push'](_0x6d9639['shift']());}catch(_0x358de6){_0x6d9639['push'](_0x6d9639['shift']());}}}(_0x4786,0x41205));var label=_0x291ba2(0x193),tier=tier||0x0,dependencies=[_0x291ba2(0x463),_0x291ba2(0x37e)],pluginData=$plugins[_0x291ba2(0x25a)](function(_0xb96ecc){const _0xb9abb4=_0x291ba2;return _0xb96ecc['status']&&_0xb96ecc[_0xb9abb4(0x42a)][_0xb9abb4(0x387)]('['+label+']');})[0x0];VisuMZ[label][_0x291ba2(0x2e0)]=VisuMZ[label]['Settings']||{},VisuMZ['ConvertParams']=function(_0x351222,_0x59aa57){const _0x57df63=_0x291ba2;for(const _0x15c6aa in _0x59aa57){if(_0x15c6aa[_0x57df63(0x2a3)](/(.*):(.*)/i)){if(_0x57df63(0x2b8)===_0x57df63(0x205)){if(_0x3f27f9[_0x237ff4][_0x5e92aa][_0x57df63(0x43b)]!=='')return!![];if(_0x1769d3[_0x58aaee][_0x5db735][_0x57df63(0x360)]>0x0)return!![];if(_0x1b8a3f[_0x3dd3cc][_0x4c1097][_0x57df63(0x1b1)]>0x0)return!![];}else{const _0x38cc81=String(RegExp['$1']),_0x5c90be=String(RegExp['$2'])[_0x57df63(0x3ff)]()['trim']();let _0x22df24,_0x564c63,_0x1e2bc3;switch(_0x5c90be){case _0x57df63(0x219):_0x22df24=_0x59aa57[_0x15c6aa]!==''?Number(_0x59aa57[_0x15c6aa]):0x0;break;case _0x57df63(0x19f):_0x564c63=_0x59aa57[_0x15c6aa]!==''?JSON['parse'](_0x59aa57[_0x15c6aa]):[],_0x22df24=_0x564c63[_0x57df63(0x269)](_0x1d74f2=>Number(_0x1d74f2));break;case _0x57df63(0x241):_0x22df24=_0x59aa57[_0x15c6aa]!==''?eval(_0x59aa57[_0x15c6aa]):null;break;case _0x57df63(0x2ee):_0x564c63=_0x59aa57[_0x15c6aa]!==''?JSON[_0x57df63(0x2fc)](_0x59aa57[_0x15c6aa]):[],_0x22df24=_0x564c63[_0x57df63(0x269)](_0x1e4c61=>eval(_0x1e4c61));break;case _0x57df63(0x47e):_0x22df24=_0x59aa57[_0x15c6aa]!==''?JSON['parse'](_0x59aa57[_0x15c6aa]):'';break;case _0x57df63(0x26f):_0x564c63=_0x59aa57[_0x15c6aa]!==''?JSON['parse'](_0x59aa57[_0x15c6aa]):[],_0x22df24=_0x564c63[_0x57df63(0x269)](_0x9ef335=>JSON[_0x57df63(0x2fc)](_0x9ef335));break;case _0x57df63(0x2c7):_0x22df24=_0x59aa57[_0x15c6aa]!==''?new Function(JSON[_0x57df63(0x2fc)](_0x59aa57[_0x15c6aa])):new Function(_0x57df63(0x1e5));break;case _0x57df63(0x35d):_0x564c63=_0x59aa57[_0x15c6aa]!==''?JSON[_0x57df63(0x2fc)](_0x59aa57[_0x15c6aa]):[],_0x22df24=_0x564c63[_0x57df63(0x269)](_0x4946c4=>new Function(JSON['parse'](_0x4946c4)));break;case _0x57df63(0x2fd):_0x22df24=_0x59aa57[_0x15c6aa]!==''?String(_0x59aa57[_0x15c6aa]):'';break;case _0x57df63(0x2b2):_0x564c63=_0x59aa57[_0x15c6aa]!==''?JSON[_0x57df63(0x2fc)](_0x59aa57[_0x15c6aa]):[],_0x22df24=_0x564c63[_0x57df63(0x269)](_0x726f36=>String(_0x726f36));break;case _0x57df63(0x440):_0x1e2bc3=_0x59aa57[_0x15c6aa]!==''?JSON[_0x57df63(0x2fc)](_0x59aa57[_0x15c6aa]):{},_0x22df24=VisuMZ[_0x57df63(0x2cf)]({},_0x1e2bc3);break;case _0x57df63(0x45c):_0x564c63=_0x59aa57[_0x15c6aa]!==''?JSON['parse'](_0x59aa57[_0x15c6aa]):[],_0x22df24=_0x564c63[_0x57df63(0x269)](_0x231e2a=>VisuMZ[_0x57df63(0x2cf)]({},JSON[_0x57df63(0x2fc)](_0x231e2a)));break;default:continue;}_0x351222[_0x38cc81]=_0x22df24;}}}return _0x351222;},(_0x42caa2=>{const _0xb398e5=_0x291ba2,_0x12b2f6=_0x42caa2[_0xb398e5(0x3fa)];for(const _0x164cc6 of dependencies){if(_0xb398e5(0x469)===_0xb398e5(0x469)){if(!Imported[_0x164cc6]){alert(_0xb398e5(0x363)[_0xb398e5(0x44c)](_0x12b2f6,_0x164cc6)),SceneManager['exit']();break;}}else{const _0x119e89=_0x583e22['MovementEffects'][_0xb398e5(0x30f)],_0x4e2fb9=_0x4c2a90[_0xb398e5(0x375)]||'';if(_0x4e2fb9[_0xb398e5(0x2a3)](_0x119e89[_0xb398e5(0x304)]))return!![];else{if(_0x4e2fb9[_0xb398e5(0x2a3)](_0x119e89[_0xb398e5(0x2e5)]))return![];}}}const _0x3135d9=_0x42caa2['description'];if(_0x3135d9[_0xb398e5(0x2a3)](/\[Version[ ](.*?)\]/i)){const _0x1f2349=Number(RegExp['$1']);_0x1f2349!==VisuMZ[label][_0xb398e5(0x3b7)]&&(alert(_0xb398e5(0x380)[_0xb398e5(0x44c)](_0x12b2f6,_0x1f2349)),SceneManager[_0xb398e5(0x414)]());}if(_0x3135d9['match'](/\[Tier[ ](\d+)\]/i)){if(_0xb398e5(0x25d)!==_0xb398e5(0x25d))_0x14053a[_0xb398e5(0x26d)](_0x5438f7,_0x51a3ca);else{const _0x43a83e=Number(RegExp['$1']);if(_0x43a83e<tier){if(_0xb398e5(0x275)!=='ECvKS')return this[_0xb398e5(0x206)]===_0x3ae61d&&this[_0xb398e5(0x2fe)](),this[_0xb398e5(0x206)];else alert(_0xb398e5(0x1ad)[_0xb398e5(0x44c)](_0x12b2f6,_0x43a83e,tier)),SceneManager[_0xb398e5(0x414)]();}else{if(_0xb398e5(0x2a7)!==_0xb398e5(0x2a7)){if(!_0x44610b[_0xb398e5(0x1ed)]())return![];if(_0x32c2e9[_0xb398e5(0x443)]())return this[_0xb398e5(0x32d)]=!![],this['_lastSmoothScrollX']=this['_realX'],this[_0xb398e5(0x25c)]=this[_0xb398e5(0x3f8)],![];if(this[_0xb398e5(0x32d)])return(this[_0xb398e5(0x3a0)]!==this[_0xb398e5(0x308)]||this[_0xb398e5(0x25c)]!==this[_0xb398e5(0x3f8)])&&(this[_0xb398e5(0x32d)]=![],this[_0xb398e5(0x3a0)]=this[_0xb398e5(0x308)],this['_lastSmoothScrollY']=this['_realY']),!this[_0xb398e5(0x32d)];return!![];}else tier=Math[_0xb398e5(0x1b4)](_0x43a83e,tier);}}}VisuMZ[_0xb398e5(0x2cf)](VisuMZ[label][_0xb398e5(0x2e0)],_0x42caa2[_0xb398e5(0x217)]);})(pluginData),PluginManager[_0x291ba2(0x382)](pluginData[_0x291ba2(0x3fa)],_0x291ba2(0x389),_0x42409c=>{const _0x56f13c=_0x291ba2;VisuMZ['ConvertParams'](_0x42409c,_0x42409c);const _0x5793c4=_0x42409c[_0x56f13c(0x28a)];$gameSystem[_0x56f13c(0x43e)]()[_0x56f13c(0x202)]=_0x5793c4;}),PluginManager[_0x291ba2(0x382)](pluginData['name'],_0x291ba2(0x1bb),_0x28a3f5=>{const _0x4d272d=_0x291ba2;VisuMZ[_0x4d272d(0x2cf)](_0x28a3f5,_0x28a3f5);const _0x5309c5=JsonEx[_0x4d272d(0x34f)](_0x28a3f5);_0x5309c5[_0x4d272d(0x202)]=$gameSystem['canShowDustCloud'](),$gameSystem[_0x4d272d(0x1de)](_0x5309c5);}),PluginManager[_0x291ba2(0x382)](pluginData['name'],_0x291ba2(0x33d),_0x276290=>{const _0x10d03a=_0x291ba2;VisuMZ[_0x10d03a(0x2cf)](_0x276290,_0x276290);const _0x340146=_0x276290[_0x10d03a(0x28a)];$gameSystem[_0x10d03a(0x41a)](_0x340146);}),PluginManager[_0x291ba2(0x382)](pluginData[_0x291ba2(0x3fa)],_0x291ba2(0x3c5),_0x1e154e=>{const _0x4196e9=_0x291ba2;VisuMZ[_0x4196e9(0x2cf)](_0x1e154e,_0x1e154e);const _0xf97316=_0x1e154e[_0x4196e9(0x28a)];$gameSystem[_0x4196e9(0x292)](_0xf97316);}),PluginManager['registerCommand'](pluginData[_0x291ba2(0x3fa)],_0x291ba2(0x26c),_0x17f8d4=>{const _0x19a6e6=_0x291ba2;if(!SceneManager['isSceneMap']())return;const _0x2eb6e5=SceneManager[_0x19a6e6(0x412)][_0x19a6e6(0x256)];if(!_0x2eb6e5)return;VisuMZ[_0x19a6e6(0x2cf)](_0x17f8d4,_0x17f8d4);const _0xc9d242=_0x17f8d4[_0x19a6e6(0x464)]||0x1,_0xa6b13f=_0x17f8d4[_0x19a6e6(0x453)]||0x0;let _0x555cff=[$gamePlayer];_0x17f8d4[_0x19a6e6(0x459)]&&(_0x555cff=_0x555cff[_0x19a6e6(0x1a3)]($gamePlayer[_0x19a6e6(0x388)]()[_0x19a6e6(0x426)]()));for(const _0x1fff51 of _0x555cff){if(_0x19a6e6(0x3ad)===_0x19a6e6(0x40d)){if(!this['isPlayFootstepSoundsByFrame']())return![];if(this[_0x19a6e6(0x417)]()&&!this[_0x19a6e6(0x477)]())return![];if(this[_0x19a6e6(0x18c)]())return![];if(this[_0x19a6e6(0x456)]())return![];const _0x340bbf=this[_0x19a6e6(0x271)]()[_0x19a6e6(0x44f)]??[];if(_0x340bbf['length']<=0x0)return!![];return _0x340bbf[_0x19a6e6(0x387)](this[_0x19a6e6(0x372)]());}else{if(!_0x1fff51)continue;const _0x57430b=_0x2eb6e5[_0x19a6e6(0x1b3)](_0x1fff51);_0x57430b&&_0x57430b[_0x19a6e6(0x26d)](_0xc9d242,_0xa6b13f);}}}),PluginManager[_0x291ba2(0x382)](pluginData[_0x291ba2(0x3fa)],_0x291ba2(0x191),_0x45d5c6=>{const _0x196dbc=_0x291ba2;if(!SceneManager['isSceneMap']())return;const _0x4c3e4b=SceneManager[_0x196dbc(0x412)][_0x196dbc(0x256)];if(!_0x4c3e4b)return;VisuMZ[_0x196dbc(0x2cf)](_0x45d5c6,_0x45d5c6);const _0x1f422c=_0x45d5c6[_0x196dbc(0x464)]||0x1,_0xbf2efe=_0x45d5c6[_0x196dbc(0x453)]||0x0,_0x15a1fc=_0x45d5c6[_0x196dbc(0x27c)];let _0xfd6901=_0x15a1fc['map'](_0x1a114c=>$gamePlayer[_0x196dbc(0x388)]()[_0x196dbc(0x1eb)](_0x1a114c));for(const _0x34ade9 of _0xfd6901){if(_0x196dbc(0x3b2)===_0x196dbc(0x2d8)){const _0x2a894a=_0x6515d4[_0x196dbc(0x3ed)][_0x196dbc(0x1cd)],_0xd0a53=_0x196dbc(0x310);this[_0x196dbc(0x268)](_0x2a894a,_0xd0a53);}else{if(!_0x34ade9)continue;const _0x85511d=_0x4c3e4b[_0x196dbc(0x1b3)](_0x34ade9);if(_0x85511d){if(_0x196dbc(0x2c2)==='fNewF')_0x85511d[_0x196dbc(0x26d)](_0x1f422c,_0xbf2efe);else{_0x3cd72d['ConvertParams'](_0x4c27b6,_0xf89e65);const _0x53cc70=_0x2762ee[_0x196dbc(0x34f)](_0x31768f);_0x53cc70['enabled']=_0x5e002a['canShowDustCloud'](),_0x5d1d83[_0x196dbc(0x1de)](_0x53cc70);}}}}}),PluginManager['registerCommand'](pluginData[_0x291ba2(0x3fa)],_0x291ba2(0x31c),_0x2cf6b1=>{const _0x38b7d9=_0x291ba2;if(!SceneManager[_0x38b7d9(0x23f)]())return;const _0x161a7a=SceneManager[_0x38b7d9(0x412)][_0x38b7d9(0x256)];if(!_0x161a7a)return;VisuMZ[_0x38b7d9(0x2cf)](_0x2cf6b1,_0x2cf6b1);const _0x35677f=_0x2cf6b1[_0x38b7d9(0x464)]||0x1,_0x2feda7=_0x2cf6b1['AngleOffset']||0x0,_0x4bf2e4=_0x2cf6b1[_0x38b7d9(0x290)],_0x23e9d7=$gameTemp[_0x38b7d9(0x270)]();let _0x4a780c=_0x4bf2e4[_0x38b7d9(0x269)](_0x53fbfb=>$gameMap['event'](_0x53fbfb||_0x23e9d7[_0x38b7d9(0x197)]()));for(const _0x3a30f2 of _0x4a780c){if(!_0x3a30f2)continue;const _0x3387ab=_0x161a7a[_0x38b7d9(0x1b3)](_0x3a30f2);if(_0x3387ab){if(_0x38b7d9(0x3e1)==='KrtXy')return![];else _0x3387ab[_0x38b7d9(0x26d)](_0x35677f,_0x2feda7);}}}),PluginManager[_0x291ba2(0x382)](pluginData['name'],_0x291ba2(0x29a),_0x92ad99=>{const _0x1d02ae=_0x291ba2;if(!SceneManager[_0x1d02ae(0x23f)]())return;const _0x5770a8=SceneManager['_scene']['_spriteset'];if(!_0x5770a8)return;VisuMZ['ConvertParams'](_0x92ad99,_0x92ad99);let _0x1233bc=[$gamePlayer];_0x92ad99[_0x1d02ae(0x459)]&&(_0x1233bc=_0x1233bc['concat']($gamePlayer[_0x1d02ae(0x388)]()[_0x1d02ae(0x426)]()));for(const _0x124a8f of _0x1233bc){if(!_0x124a8f)continue;const _0x47b5a7=_0x5770a8['findTargetSprite'](_0x124a8f);_0x47b5a7&&_0x47b5a7[_0x1d02ae(0x253)]();}}),PluginManager['registerCommand'](pluginData[_0x291ba2(0x3fa)],_0x291ba2(0x3c3),_0x2af9c6=>{const _0x35cdf0=_0x291ba2;if(!SceneManager[_0x35cdf0(0x23f)]())return;const _0x8e3a6e=SceneManager['_scene'][_0x35cdf0(0x256)];if(!_0x8e3a6e)return;VisuMZ[_0x35cdf0(0x2cf)](_0x2af9c6,_0x2af9c6);const _0x28e6e4=_0x2af9c6[_0x35cdf0(0x27c)];let _0x204dd7=_0x28e6e4[_0x35cdf0(0x269)](_0x4e295c=>$gamePlayer['followers']()[_0x35cdf0(0x1eb)](_0x4e295c));for(const _0xcdde90 of _0x204dd7){if(!_0xcdde90)continue;const _0x368d3e=_0x8e3a6e[_0x35cdf0(0x1b3)](_0xcdde90);_0x368d3e&&_0x368d3e[_0x35cdf0(0x253)]();}}),PluginManager[_0x291ba2(0x382)](pluginData[_0x291ba2(0x3fa)],_0x291ba2(0x3b9),_0x55228c=>{const _0x468080=_0x291ba2;if(!SceneManager[_0x468080(0x23f)]())return;const _0x38bcd6=SceneManager[_0x468080(0x412)][_0x468080(0x256)];if(!_0x38bcd6)return;VisuMZ['ConvertParams'](_0x55228c,_0x55228c);const _0x4369b8=_0x55228c[_0x468080(0x290)],_0x18189f=$gameTemp[_0x468080(0x270)]();let _0x5e5361=_0x4369b8['map'](_0x4e4640=>$gameMap[_0x468080(0x236)](_0x4e4640||_0x18189f[_0x468080(0x197)]()));for(const _0x1810f9 of _0x5e5361){if(!_0x1810f9)continue;const _0x88864b=_0x38bcd6[_0x468080(0x1b3)](_0x1810f9);if(_0x88864b){if(_0x468080(0x262)===_0x468080(0x262))_0x88864b[_0x468080(0x253)]();else{if(this[_0x468080(0x276)]===_0x4644df&&!this[_0x468080(0x473)]())return![];if(this[_0x468080(0x276)]===_0x40f3e2&&this[_0x468080(0x23e)]())return![];if(this[_0x468080(0x3b8)]())return![];const _0x468d79=this['x'],_0x1a2222=this['y'];return this[_0x468080(0x24b)]()[_0x468080(0x202)]&&_0x42371e['canMakeFootprints'](_0x468d79,_0x1a2222);}}}}),PluginManager['registerCommand'](pluginData[_0x291ba2(0x3fa)],_0x291ba2(0x376),_0x3386ac=>{const _0x4f1713=_0x291ba2;if(!SceneManager[_0x4f1713(0x23f)]())return;VisuMZ['ConvertParams'](_0x3386ac,_0x3386ac);const _0x1932b8=_0x3386ac[_0x4f1713(0x28a)],_0x4af81a=_0x3386ac[_0x4f1713(0x33e)];let _0x3d796c=[$gamePlayer];_0x3386ac['ApplyFollowers']&&(_0x3d796c=_0x3d796c[_0x4f1713(0x1a3)]($gamePlayer[_0x4f1713(0x388)]()[_0x4f1713(0x426)]()));for(const _0x4d29dd of _0x3d796c){if(!_0x4d29dd)continue;_0x4d29dd[_0x4f1713(0x1a7)](_0x1932b8,_0x4af81a);}}),PluginManager[_0x291ba2(0x382)](pluginData['name'],_0x291ba2(0x2a9),_0x3cd2b6=>{const _0x5a442a=_0x291ba2;if(!SceneManager[_0x5a442a(0x23f)]())return;VisuMZ[_0x5a442a(0x2cf)](_0x3cd2b6,_0x3cd2b6);const _0x16687d=_0x3cd2b6['Enable'],_0xc6a88e=_0x3cd2b6['ImmediateCreate'],_0x270ac7=_0x3cd2b6[_0x5a442a(0x27c)];let _0x2146fb=_0x270ac7[_0x5a442a(0x269)](_0x4ae5cf=>$gamePlayer['followers']()[_0x5a442a(0x1eb)](_0x4ae5cf));for(const _0x2c4cf0 of _0x2146fb){if(!_0x2c4cf0)continue;_0x2c4cf0[_0x5a442a(0x1a7)](_0x16687d,_0xc6a88e);}}),PluginManager[_0x291ba2(0x382)](pluginData[_0x291ba2(0x3fa)],_0x291ba2(0x336),_0x3e792b=>{const _0x44f440=_0x291ba2;if(!SceneManager[_0x44f440(0x23f)]())return;VisuMZ[_0x44f440(0x2cf)](_0x3e792b,_0x3e792b);const _0x521bb6=_0x3e792b[_0x44f440(0x28a)],_0x170e5a=_0x3e792b[_0x44f440(0x33e)],_0xaddf8e=_0x3e792b[_0x44f440(0x290)],_0x25dca0=$gameTemp[_0x44f440(0x270)]();let _0x79c5a0=_0xaddf8e[_0x44f440(0x269)](_0x246b35=>$gameMap['event'](_0x246b35||_0x25dca0[_0x44f440(0x197)]()));for(const _0x401043 of _0x79c5a0){if(_0x44f440(0x279)!==_0x44f440(0x279))_0x3bf44b[_0x44f440(0x412)][_0x44f440(0x3e9)](_0x143c82);else{if(!_0x401043)continue;_0x401043[_0x44f440(0x1a7)](_0x521bb6,_0x170e5a);}}}),PluginManager[_0x291ba2(0x382)](pluginData[_0x291ba2(0x3fa)],_0x291ba2(0x237),_0x32fb4e=>{const _0x537757=_0x291ba2;if(!SceneManager[_0x537757(0x23f)]())return;VisuMZ[_0x537757(0x2cf)](_0x32fb4e,_0x32fb4e);const _0x17eceb={'enabled':![],'delay':_0x32fb4e['delay']||0x1,'duration':_0x32fb4e[_0x537757(0x1e2)]||0x1,'hue':_0x32fb4e[_0x537757(0x3e8)]||0x0,'opacityStart':_0x32fb4e[_0x537757(0x2de)]||0x0,'tone':_0x32fb4e[_0x537757(0x434)]||[0x0,0x0,0x0,0x0]};let _0x3d3abb=[$gamePlayer];_0x32fb4e['ApplyFollowers']&&(_0x3d3abb=_0x3d3abb['concat']($gamePlayer[_0x537757(0x388)]()[_0x537757(0x426)]()));for(const _0x2ff8a3 of _0x3d3abb){if(!_0x2ff8a3)continue;_0x2ff8a3[_0x537757(0x42f)](_0x17eceb);}}),PluginManager['registerCommand'](pluginData['name'],'MotionTrailSettingsChangeFollower',_0x342319=>{const _0x18872c=_0x291ba2;if(!SceneManager[_0x18872c(0x23f)]())return;VisuMZ['ConvertParams'](_0x342319,_0x342319);const _0x428640={'enabled':![],'delay':_0x342319[_0x18872c(0x1da)]||0x1,'duration':_0x342319[_0x18872c(0x1e2)]||0x1,'hue':_0x342319[_0x18872c(0x3e8)]||0x0,'opacityStart':_0x342319['opacityStart']||0x0,'tone':_0x342319[_0x18872c(0x434)]||[0x0,0x0,0x0,0x0]},_0x40ed6e=_0x342319[_0x18872c(0x27c)];let _0x3b5911=_0x40ed6e[_0x18872c(0x269)](_0x44e2a9=>$gamePlayer[_0x18872c(0x388)]()[_0x18872c(0x1eb)](_0x44e2a9));for(const _0x451365 of _0x3b5911){if('Zyaqn'!==_0x18872c(0x3dc)){if(!_0x451365)continue;_0x451365[_0x18872c(0x42f)](_0x428640);}else this[_0x18872c(0x457)][_0x18872c(0x203)]['terrainTags']=_0x2e55f2['$1'][_0x18872c(0x3b6)](',')[_0x18872c(0x269)](_0x5db8f4=>(_0x2fc483(_0x5db8f4)||0x0)[_0x18872c(0x29c)](0x0,0x7));}}),PluginManager[_0x291ba2(0x382)](pluginData[_0x291ba2(0x3fa)],'MotionTrailSettingsChangeEvent',_0x503df9=>{const _0x39a267=_0x291ba2;if(!SceneManager[_0x39a267(0x23f)]())return;VisuMZ[_0x39a267(0x2cf)](_0x503df9,_0x503df9);const _0xe44681={'enabled':![],'delay':_0x503df9[_0x39a267(0x1da)]||0x1,'duration':_0x503df9[_0x39a267(0x1e2)]||0x1,'hue':_0x503df9[_0x39a267(0x3e8)]||0x0,'opacityStart':_0x503df9['opacityStart']||0x0,'tone':_0x503df9['tone']||[0x0,0x0,0x0,0x0]},_0x23dd6a=_0x503df9[_0x39a267(0x290)],_0x4ad02c=$gameTemp['getLastPluginCommandInterpreter']();let _0xf7c0ee=_0x23dd6a[_0x39a267(0x269)](_0x4b130d=>$gameMap['event'](_0x4b130d||_0x4ad02c['eventId']()));for(const _0x3a3df3 of _0xf7c0ee){if(!_0x3a3df3)continue;_0x3a3df3['setMotionTrailSettings'](_0xe44681);}}),PluginManager[_0x291ba2(0x382)](pluginData[_0x291ba2(0x3fa)],_0x291ba2(0x2d1),_0x452281=>{const _0x2a5faf=_0x291ba2;if(!SceneManager[_0x2a5faf(0x23f)]())return;VisuMZ['ConvertParams'](_0x452281,_0x452281);const _0x222e08={'slower':-0x1,'normal':0x0,'faster':0x1};for(let _0x315484=0x1;_0x315484<0xa;_0x315484++){if('BOVJE'===_0x2a5faf(0x368)){if(this[_0x2a5faf(0x3f2)]===_0x36fb40)this[_0x2a5faf(0x398)]();const _0x2cfd64=this['_smartJump'][_0x2a5faf(0x1d3)]['indexOf'](_0x40ac4b);return _0x2cfd64===0x0;}else{if(_0x315484===0x5)continue;const _0x30ec88=_0x2a5faf(0x291)['format'](_0x315484),_0x53b067=(_0x452281[_0x30ec88]||'normal')['toLowerCase']()[_0x2a5faf(0x2b6)](),_0x13375e=_0x222e08[_0x53b067]||0x0;$gameSystem[_0x2a5faf(0x278)](_0x315484,_0x13375e);}}}),PluginManager[_0x291ba2(0x382)](pluginData[_0x291ba2(0x3fa)],_0x291ba2(0x48c),_0x5ab757=>{const _0x3e813d=_0x291ba2;if(!SceneManager['isSceneMap']())return;VisuMZ[_0x3e813d(0x2cf)](_0x5ab757,_0x5ab757);const _0x94aa65=_0x5ab757['Distance']||0x1,_0xee6537=_0x5ab757[_0x3e813d(0x1c7)]||0x1,_0x32b485=_0x5ab757[_0x3e813d(0x35c)]||0x0,_0x17742e={'NonLandableRegions':_0x5ab757[_0x3e813d(0x3ee)][_0x3e813d(0x20b)](),'NonLandableTerrainTags':_0x5ab757[_0x3e813d(0x2da)]['clone'](),'NonPassableRegions':_0x5ab757[_0x3e813d(0x2ec)][_0x3e813d(0x20b)](),'NonPassableTerrainTags':_0x5ab757['NonPassableTerrainTags'][_0x3e813d(0x20b)]()},_0x15de7b=_0x5ab757[_0x3e813d(0x2bf)]||0x0,_0x96af47=_0x5ab757[_0x3e813d(0x384)]||{'enabled':![]},_0x5ccdf6={'name':_0x5ab757[_0x3e813d(0x3fd)]||'','volume':_0x5ab757[_0x3e813d(0x3d3)]||0x0,'pitch':_0x5ab757['sfxPitch']||0x0,'pan':_0x5ab757[_0x3e813d(0x36e)]||0x0};$gamePlayer[_0x3e813d(0x390)](_0x94aa65,_0xee6537,_0x17742e,_0x96af47)&&(_0x5ccdf6[_0x3e813d(0x3fa)]!==''&&AudioManager[_0x3e813d(0x22e)](_0x5ccdf6),_0x15de7b>0x0&&$gameTemp[_0x3e813d(0x2d3)]([$gamePlayer],_0x15de7b),_0x32b485>0x0&&SceneManager['_scene']['playOnceParallelInterpreter'](_0x32b485));}),PluginManager[_0x291ba2(0x382)](pluginData[_0x291ba2(0x3fa)],_0x291ba2(0x2d0),_0x444d1b=>{const _0x86610c=_0x291ba2;if(!SceneManager[_0x86610c(0x23f)]())return;VisuMZ[_0x86610c(0x2cf)](_0x444d1b,_0x444d1b);const _0x258e80=_0x444d1b[_0x86610c(0x3ab)]||0x1,_0x49ca30=_0x444d1b[_0x86610c(0x1c7)]||0x1,_0x48d9a7=_0x444d1b[_0x86610c(0x35c)]||0x0,_0x45c1c2={'NonLandableRegions':_0x444d1b['NonLandableRegions'][_0x86610c(0x20b)](),'NonLandableTerrainTags':_0x444d1b['NonLandableTerrainTags'][_0x86610c(0x20b)](),'NonPassableRegions':_0x444d1b[_0x86610c(0x2ec)][_0x86610c(0x20b)](),'NonPassableTerrainTags':_0x444d1b[_0x86610c(0x3e7)][_0x86610c(0x20b)]()},_0x550d12=_0x444d1b[_0x86610c(0x2bf)]||0x0,_0x2d66e4=_0x444d1b['MotionTrail']||{'enabled':![]},_0x11d3a5={'name':_0x444d1b[_0x86610c(0x3fd)]||'','volume':_0x444d1b['sfxVolume']||0x0,'pitch':_0x444d1b[_0x86610c(0x36d)]||0x0,'pan':_0x444d1b['sfxPan']||0x0};if($gamePlayer['smartJump'](_0x258e80,_0x49ca30,_0x45c1c2,_0x2d66e4)){_0x11d3a5[_0x86610c(0x3fa)]!==''&&AudioManager[_0x86610c(0x22e)](_0x11d3a5);if(_0x550d12>0x0){if(_0x86610c(0x1be)!==_0x86610c(0x474))$gameTemp[_0x86610c(0x2d3)]([$gamePlayer],_0x550d12);else{const _0x508cef=_0x229f61[_0x86610c(0x193)][_0x86610c(0x2e0)][_0x86610c(0x1cd)],_0x476ac4={'name':_0x508cef[_0x86610c(0x3fa)]??'Blow2','volume':_0x508cef['volume']??0xa,'pitch':_0x508cef[_0x86610c(0x247)]??0x78,'pan':_0x508cef[_0x86610c(0x287)]??0x0};_0x1f1e37['applyFootstepSoundTileChanges'](_0x476ac4,_0x4c4a02);if(_0x476ac4==='')return;_0x5b967a[_0x86610c(0x193)][_0x86610c(0x305)](_0x476ac4,_0x52e519),_0x312bcf[_0x86610c(0x22e)](_0x476ac4);}}_0x48d9a7>0x0&&SceneManager[_0x86610c(0x412)][_0x86610c(0x3e9)](_0x48d9a7);}}),PluginManager[_0x291ba2(0x382)](pluginData[_0x291ba2(0x3fa)],_0x291ba2(0x210),_0x138928=>{const _0x5d5f2c=_0x291ba2;if(!SceneManager[_0x5d5f2c(0x23f)]())return;VisuMZ[_0x5d5f2c(0x2cf)](_0x138928,_0x138928);const _0x14e4d4=_0x138928[_0x5d5f2c(0x3ab)]||0x1,_0x1d769e=_0x138928[_0x5d5f2c(0x1c7)]||0x1,_0x25b79b=_0x138928[_0x5d5f2c(0x35c)]||0x0,_0x125bde=_0x138928['Switches']||[],_0x1bc331=_0x138928['SpeedRate']||0x1,_0x3713ec=_0x138928[_0x5d5f2c(0x2bf)]||0x0,_0x1fc7f3=_0x138928[_0x5d5f2c(0x384)]||{'enabled':![]},_0x21b43d={'name':_0x138928[_0x5d5f2c(0x3fd)]||'','volume':_0x138928[_0x5d5f2c(0x3d3)]||0x0,'pitch':_0x138928[_0x5d5f2c(0x36d)]||0x0,'pan':_0x138928[_0x5d5f2c(0x36e)]||0x0};if($gamePlayer[_0x5d5f2c(0x3ac)](_0x14e4d4,_0x1d769e,_0x125bde,_0x1bc331,_0x1fc7f3)){_0x21b43d[_0x5d5f2c(0x3fa)]!==''&&AudioManager[_0x5d5f2c(0x22e)](_0x21b43d);if(_0x3713ec>0x0){if('vbiva'!==_0x5d5f2c(0x330))return![];else $gameTemp[_0x5d5f2c(0x2d3)]([$gamePlayer],_0x3713ec);}if(_0x25b79b>0x0){if(_0x5d5f2c(0x361)===_0x5d5f2c(0x361))SceneManager['_scene'][_0x5d5f2c(0x3e9)](_0x25b79b);else{if(this[_0x5d5f2c(0x18c)]())return;this['_smartJumpMode']=![];if(this[_0x5d5f2c(0x2ed)]()){let _0x3e6f16=_0x7fba5a['max'](_0x29cd2a[_0x5d5f2c(0x211)](this[_0x5d5f2c(0x472)]/0x2),0x1);while(_0x3e6f16--)this[_0x5d5f2c(0x47f)]();}if(this[_0x5d5f2c(0x39a)]())this[_0x5d5f2c(0x3ca)]();_0x5a2e5e(this[_0x5d5f2c(0x1d8)][_0x5d5f2c(0x1c8)](this,[0x1,0x2]),0x32);}}}}),PluginManager[_0x291ba2(0x382)](pluginData[_0x291ba2(0x3fa)],_0x291ba2(0x1ba),_0x15bba7=>{const _0x45f4f8=_0x291ba2;if(!SceneManager['isSceneMap']())return;const _0x56acf6=$gameTemp[_0x45f4f8(0x270)]();_0x56acf6['setWaitMode']('smartBlink');}),PluginManager[_0x291ba2(0x382)](pluginData['name'],'SmartMoveWaitForSmartJump',_0x2e40ff=>{const _0x3f8c98=_0x291ba2;if(!SceneManager['isSceneMap']())return;const _0xc0fb03=$gameTemp[_0x3f8c98(0x270)]();_0xc0fb03[_0x3f8c98(0x207)](_0x3f8c98(0x3ba));}),PluginManager[_0x291ba2(0x382)](pluginData['name'],_0x291ba2(0x3c2),_0x5b0744=>{const _0x488055=_0x291ba2;if(!SceneManager[_0x488055(0x23f)]())return;const _0x4a469b=$gameTemp[_0x488055(0x270)]();_0x4a469b[_0x488055(0x207)](_0x488055(0x3ac));}),PluginManager[_0x291ba2(0x382)](pluginData['name'],_0x291ba2(0x432),_0x21d4d0=>{const _0x226f4b=_0x291ba2;VisuMZ['ConvertParams'](_0x21d4d0,_0x21d4d0);const _0x17c406=_0x21d4d0[_0x226f4b(0x28a)];$gameSystem[_0x226f4b(0x25f)](_0x17c406);}),PluginManager[_0x291ba2(0x382)](pluginData[_0x291ba2(0x3fa)],'SmoothCameraSpeedChange',_0xb51a1c=>{const _0x53c9f8=_0x291ba2;VisuMZ['ConvertParams'](_0xb51a1c,_0xb51a1c),$gameSystem['setSmoothCameraSpeed'](_0xb51a1c[_0x53c9f8(0x1f4)],![],![]),$gameSystem['setSmoothCameraSpeed'](_0xb51a1c[_0x53c9f8(0x475)],!![],![]),$gameSystem['setSmoothCameraSpeed'](_0xb51a1c[_0x53c9f8(0x485)],![],!![]),$gameSystem[_0x53c9f8(0x422)](_0xb51a1c['VertDash'],!![],!![]);}),VisuMZ[_0x291ba2(0x193)][_0x291ba2(0x30f)]={'CatchAll':/(?:SMOOTH|DASH|FOOT|REGION|TERRAIN|SMART|JUMP)/i,'ForceSmooth':/<FORCE SMOOTH (?:CAMERA|SCROLL)>/i,'NoSmooth':/<(?:NO|DISABLE) SMOOTH (?:CAMERA|SCROLL)>/i,'ForceDustCloud':/<FORCE (?:DASH|DUST) (?:CLOUD|CLOUDS)>/i,'NoDustCloud':/<(?:NO|DISABLE) (?:DASH|DUST) (?:CLOUD|CLOUDS)>/i,'ForceFootsteps':/<FORCE (?:FOOTSTEPS|FOOTSTEP SOUNDS)>/i,'NoFootsteps':/<(?:NO|DISABLE) (?:FOOTSTEPS|FOOTSTEP SOUNDS)>/i,'RegionFootstepSfx':/<REGION (\d+) FOOTSTEP SOUND:[ ](.*)>/gi,'NoRegionFootstepSfx':/<(?:NO|DISABLE) REGION (\d+) FOOTSTEP SOUND>/gi,'FootprintRegions':/<FOOTPRINT (?:REGION|REGIONS):[ ](.*?)>/i,'NonFootprintRegions':/<(?:NO|DISABLE) FOOTPRINT (?:REGION|REGIONS):[ ](.*?)>/i,'RegionFootprintOpacity':/<REGION (\d+) FOOTPRINT OPACITY:[ ](\d+)>/gi,'RegionFootprintDuration':/<REGION (\d+) FOOTPRINT DURATION:[ ](\d+)>/gi,'NoSmartRush':/<(?:NO|DISABLE) SMART RUSH>/i,'SmartRushAntiCrashRegions':/<SMART RUSH NON-CRASH (?:REGION|REGIONS):[ ](.*?)>/i,'NoSmartBlink':/<(?:NO|DISABLE) SMART BLINK>/i,'SmartBlinkNonLandRegions':/<SMART BLINK NON-LAND (?:REGION|REGIONS):[ ](.*?)>/i,'SmartBlinkNonPassRegions':/<SMART BLINK NON-PASS (?:REGION|REGIONS):[ ](.*?)>/i,'NoSmartJump':/<(?:NO|DISABLE) SMART JUMP>/i,'SmartJumpNonLandRegions':/<SMART JUMP NON-LAND (?:REGION|REGIONS):[ ](.*?)>/i,'SmartJumpNonPassRegions':/<SMART JUMP NON-PASS (?:REGION|REGIONS):[ ](.*?)>/i,'SmartJumpHeightBasedRegions':/<SMART JUMP HEIGHT-BASED (?:REGION|REGIONS):[ ](.*?)>/i,'TerrainTagFootstepSfx':/<TERRAIN TAG (\d+) (?:FOOTSTEP SOUND|FOOTSTEPS):[ ](.*)>/gi,'NoTerrainTagFootstepSfx':/<(?:NO|DISABLE) TERRAIN TAG (\d+) (?:FOOTSTEP SOUND|FOOTSTEPS)>/gi,'FootprintTerrainTags':/<FOOTPRINT TERRAIN (?:TAG|TAGS):[ ](.*?)>/i,'NonFootprintTerrainTags':/<(?:NO|DISABLE) FOOTPRINT TERRAIN (?:TAG|TAGS):[ ](.*?)>/i,'TerrainTagFootprintOpacity':/<TERRAIN TAG (\d+) FOOTPRINT OPACITY:[ ](\d+)>/gi,'TerrainTagFootprintDuration':/<TERRAIN TAG (\d+) FOOTPRINT DURATION:[ ](\d+)>/gi,'SmartRushAntiCrashTerrainTags':/<SMART RUSH NON-CRASH TERRAIN (?:TAG|TAGS):[ ](.*?)>/i,'SmartBlinkNonLandTerrainTags':/<SMART BLINK NON-LAND TERRAIN (?:TAG|TAGS):[ ](.*?)>/i,'SmartBlinkNonPassTerrainTags':/<SMART BLINK NON-PASS TERRAIN (?:TAG|TAGS):[ ](.*?)>/i,'SmartJumpNonLandTerrainTags':/<SMART JUMP NON-LAND TERRAIN (?:TAG|TAGS):[ ](.*?)>/i,'SmartJumpNonPassTerrainTags':/<SMART JUMP NON-PASS TERRAIN (?:TAG|TAGS):[ ](.*?)>/i,'YesFootstepsEvent':/<(?:ALLOW|ENABLE) (?:FOOTSTEPS|FOOTSTEP SOUNDS)>/i,'NoFootstepsEvent':/<(?:NO|DISABLE) (?:FOOTSTEPS|FOOTSTEP SOUNDS)>/i,'FootstepsVolRate':/<(?:FOOTSTEPS|FOOTSTEP SOUNDS) VOLUME:[ ](\d+)([%％])>/i,'FootstepsPitchRate':/<(?:FOOTSTEPS|FOOTSTEP SOUNDS) PITCH:[ ](\d+)([%％])>/i,'FootstepsFrames':/<(?:FOOTSTEPS|FOOTSTEP SOUNDS) (?:FRAME|FRAMES):[ ](.*?)>/i,'YesFootprintsEvent':/<(?:ALLOW|ENABLE) FOOTPRINTS>/i,'NoFootprintsEvent':/<(?:NO|DISABLE) FOOTPRINTS>/i,'FootprintsFilename':/<(?:FOOTPRINT|FOOTPRINTS) (.*?) (?:FRAME|PATTERN) (\d+) FILENAME:[ ](.*?)>/gi,'FootprintsWidth':/<(?:FOOTPRINT|FOOTPRINTS) (.*?) (?:FRAME|PATTERN) (\d+) WIDTH:[ ](\d+)>/gi,'FootprintsHeight':/<(?:FOOTPRINT|FOOTPRINTS) (.*?) (?:FRAME|PATTERN) (\d+) HEIGHT:[ ](\d+)>/gi,'FootprintsOffset':/<(?:FOOTPRINT|FOOTPRINTS) (.*?) (?:FRAME|PATTERN) (\d+) OFFSET:[ ](.*?)>/gi,'SmartJumpNonLandEvent':/<(?:SMART JUMP NON-LAND|ILLEGAL JUMP)>/i,'SmartJumpNonPassEvent':/<(?:SMART JUMP NON-PASS|ILLEGAL JUMP)>/i},VisuMZ[_0x291ba2(0x193)][_0x291ba2(0x316)]=['dustCloud',_0x291ba2(0x45d),_0x291ba2(0x310),_0x291ba2(0x2c9)],((()=>{const _0x5bf80c=_0x291ba2;for(const _0x3a7178 of VisuMZ[_0x5bf80c(0x193)]['ConfigKeys']){if(_0x5bf80c(0x2f0)===_0x5bf80c(0x21b))for(const _0x2fb273 of _0x4a75c0){_0x2fb273[_0x5bf80c(0x2a3)](_0x3bcf81[_0x5bf80c(0x1ec)]);const _0x533e6b=_0x41c835(_0xd6f094['$1'])[_0x5bf80c(0x29c)](0x0,0xff),_0x35bad2=_0x494667[_0x5bf80c(0x1b4)](0x1,_0x45de65(_0x5897d7['$2']));this[_0x5bf80c(0x457)][_0x5bf80c(0x1e2)][_0x5bf80c(0x32a)][_0x533e6b]=_0x35bad2;}else ConfigManager[_0x3a7178]=!![];}})()),VisuMZ[_0x291ba2(0x193)][_0x291ba2(0x445)]=ConfigManager['makeData'],ConfigManager[_0x291ba2(0x258)]=function(){const _0x28bba0=_0x291ba2,_0xf0cac7=VisuMZ[_0x28bba0(0x193)][_0x28bba0(0x445)][_0x28bba0(0x407)](this);for(const _0xa103c2 of VisuMZ['MovementEffects'][_0x28bba0(0x316)]){_0xf0cac7[_0xa103c2]=this[_0xa103c2];}return _0xf0cac7;},VisuMZ[_0x291ba2(0x193)][_0x291ba2(0x22a)]=ConfigManager['applyData'],ConfigManager[_0x291ba2(0x470)]=function(_0x299f15){const _0x3410f8=_0x291ba2;VisuMZ[_0x3410f8(0x193)]['ConfigManager_applyData'][_0x3410f8(0x407)](this,_0x299f15);for(const _0x1ca3c8 of VisuMZ[_0x3410f8(0x193)][_0x3410f8(0x316)]){this[_0x3410f8(0x3ae)](_0x299f15,_0x1ca3c8,!![]);}},TextManager[_0x291ba2(0x3ed)]={'DustCloud':VisuMZ[_0x291ba2(0x193)][_0x291ba2(0x2e0)][_0x291ba2(0x216)][_0x291ba2(0x254)],'Footprints':VisuMZ[_0x291ba2(0x193)][_0x291ba2(0x2e0)][_0x291ba2(0x216)][_0x291ba2(0x243)],'Footsteps':VisuMZ[_0x291ba2(0x193)][_0x291ba2(0x2e0)][_0x291ba2(0x216)][_0x291ba2(0x29e)],'SmoothCamera':VisuMZ['MovementEffects']['Settings'][_0x291ba2(0x216)]['SmoothCameraName']},VisuMZ[_0x291ba2(0x193)][_0x291ba2(0x248)]=Scene_Options[_0x291ba2(0x371)][_0x291ba2(0x40a)],Scene_Options['prototype'][_0x291ba2(0x40a)]=function(){const _0x29cb24=_0x291ba2;let _0x5e4dd6=VisuMZ[_0x29cb24(0x193)][_0x29cb24(0x248)][_0x29cb24(0x407)](this);const _0x8f17ab=VisuMZ['MovementEffects'][_0x29cb24(0x2e0)][_0x29cb24(0x216)];if(_0x8f17ab[_0x29cb24(0x45f)]&&_0x8f17ab['AddDustCloud'])_0x5e4dd6++;if(_0x8f17ab[_0x29cb24(0x45f)]&&_0x8f17ab[_0x29cb24(0x259)])_0x5e4dd6++;if(_0x8f17ab['AdjustRect']&&_0x8f17ab[_0x29cb24(0x48e)])_0x5e4dd6++;if(_0x8f17ab[_0x29cb24(0x45f)]&&_0x8f17ab[_0x29cb24(0x2e3)])_0x5e4dd6++;return _0x5e4dd6;},VisuMZ['MovementEffects'][_0x291ba2(0x346)]=Window_Options[_0x291ba2(0x371)]['addGeneralOptions'],Window_Options['prototype'][_0x291ba2(0x403)]=function(){const _0x245203=_0x291ba2;VisuMZ[_0x245203(0x193)][_0x245203(0x346)][_0x245203(0x407)](this),this['addMovementEffectsOptionCommands']();},Window_Options['prototype'][_0x291ba2(0x348)]=function(){const _0x197b17=_0x291ba2;VisuMZ[_0x197b17(0x193)][_0x197b17(0x2e0)][_0x197b17(0x216)][_0x197b17(0x2c6)]&&('cveLV'!==_0x197b17(0x419)?this[_0x197b17(0x3f2)]['LedgeJumpRegion']=_0x26b7ce(_0x3ad48d['$1'])[_0x197b17(0x29c)](0x0,0xff):this[_0x197b17(0x1bf)]()),VisuMZ[_0x197b17(0x193)]['Settings'][_0x197b17(0x216)]['AddFootprints']&&this['addMovementEffectsFootprintsCommand'](),VisuMZ['MovementEffects'][_0x197b17(0x2e0)][_0x197b17(0x216)]['AddFootsteps']&&this[_0x197b17(0x21f)](),VisuMZ[_0x197b17(0x193)][_0x197b17(0x2e0)][_0x197b17(0x216)]['AddSmoothCamera']&&this[_0x197b17(0x48a)]();},Window_Options['prototype'][_0x291ba2(0x1bf)]=function(){const _0x5523d2=_0x291ba2,_0x1ae843=TextManager[_0x5523d2(0x3ed)][_0x5523d2(0x3bf)],_0x24e147=_0x5523d2(0x2bc);this[_0x5523d2(0x268)](_0x1ae843,_0x24e147);},Window_Options['prototype'][_0x291ba2(0x21c)]=function(){const _0x35cfa8=_0x291ba2,_0x5eee8c=TextManager[_0x35cfa8(0x3ed)][_0x35cfa8(0x442)],_0x49493c=_0x35cfa8(0x45d);this['addCommand'](_0x5eee8c,_0x49493c);},Window_Options[_0x291ba2(0x371)][_0x291ba2(0x21f)]=function(){const _0x2434b2=_0x291ba2,_0x36a0f9=TextManager[_0x2434b2(0x3ed)][_0x2434b2(0x1cd)],_0x6bee3e=_0x2434b2(0x310);this[_0x2434b2(0x268)](_0x36a0f9,_0x6bee3e);},Window_Options[_0x291ba2(0x371)]['addMovementEffectsSmoothCameraCommand']=function(){const _0x2f1bae=_0x291ba2,_0x23151f=TextManager[_0x2f1bae(0x3ed)][_0x2f1bae(0x495)],_0x1e126b='smoothCamera';this[_0x2f1bae(0x268)](_0x23151f,_0x1e126b);},ImageManager['generatedFootprintBitmap']=function(){const _0x12348e=_0x291ba2;if(this[_0x12348e(0x272)])return this[_0x12348e(0x272)];const _0xcb57c9=0x64,_0x5e35a4=0x64,_0x293ae6=new Bitmap(_0xcb57c9,_0x5e35a4);return _0x293ae6['paintOpacity']=0xff,_0x293ae6[_0x12348e(0x233)](0x32,0x32,0x32,_0x12348e(0x3fe)),_0x293ae6[_0x12348e(0x2ef)]=![],this['_cached_GeneratedFootprint_Image']=_0x293ae6,this['_cached_GeneratedFootprint_Image'];},SoundManager[_0x291ba2(0x41d)]=function(_0x48a790){const _0x49f850=_0x291ba2,_0x1941d0=VisuMZ[_0x49f850(0x193)][_0x49f850(0x2e0)][_0x49f850(0x1cd)],_0x5d9b7e={'name':_0x1941d0[_0x49f850(0x3fa)]??_0x49f850(0x494),'volume':_0x1941d0[_0x49f850(0x284)]??0xa,'pitch':_0x1941d0[_0x49f850(0x247)]??0x78,'pan':_0x1941d0['pan']??0x0};$gameMap[_0x49f850(0x31f)](_0x5d9b7e,_0x48a790);if(_0x5d9b7e==='')return;VisuMZ['MovementEffects'][_0x49f850(0x305)](_0x5d9b7e,_0x48a790),AudioManager[_0x49f850(0x22e)](_0x5d9b7e);},VisuMZ[_0x291ba2(0x193)][_0x291ba2(0x305)]=function(_0x509c2b,_0x55aced){const _0x12cb52=_0x291ba2;if(!_0x509c2b)return;if(!_0x55aced)return;if(_0x55aced[_0x12cb52(0x276)]===Game_Event){const _0x5b5339=VisuMZ[_0x12cb52(0x193)][_0x12cb52(0x2e0)]['Footsteps'],_0x324523=$gamePlayer[_0x12cb52(0x455)](_0x55aced['x']),_0x476416=$gamePlayer['deltaYFrom'](_0x55aced['y']),_0x48d81e=Math['abs'](_0x324523)+Math['abs'](_0x476416);_0x48d81e>0x0&&(_0x509c2b['volume']+=_0x48d81e*_0x5b5339[_0x12cb52(0x39e)],_0x509c2b['pitch']+=_0x48d81e*_0x5b5339[_0x12cb52(0x297)]);if(_0x324523!==0x0){if(_0x12cb52(0x220)!==_0x12cb52(0x1f5))_0x509c2b[_0x12cb52(0x287)]-=_0x324523*_0x5b5339['distancePanModifier'];else{if(this['_footprintMarksEnabled']===_0x57dca7)this[_0x12cb52(0x273)]();this[_0x12cb52(0x3d2)]=_0x302ef6;}}}const _0x2a14b7=_0x55aced[_0x12cb52(0x271)]();_0x2a14b7&&(_0x509c2b[_0x12cb52(0x284)]*=_0x2a14b7[_0x12cb52(0x367)]??0x1,_0x509c2b[_0x12cb52(0x247)]*=_0x2a14b7[_0x12cb52(0x2e7)]??0x1),_0x509c2b['volume']=Math[_0x12cb52(0x1b4)](0x0,_0x509c2b[_0x12cb52(0x284)]),_0x509c2b[_0x12cb52(0x247)]=Math[_0x12cb52(0x1b4)](0x0,_0x509c2b[_0x12cb52(0x247)]),_0x509c2b[_0x12cb52(0x287)]=_0x509c2b['pan'][_0x12cb52(0x29c)](-0x64,0x64);},TextManager[_0x291ba2(0x3e2)]=function(_0x2f73f8){const _0x5cae23=_0x291ba2;_0x2f73f8=_0x2f73f8['toLowerCase']()[_0x5cae23(0x2b6)]();switch(_0x2f73f8){case'down':return 0x2;case _0x5cae23(0x1b2):return 0x4;case _0x5cae23(0x39f):return 0x6;case'up':return 0x8;case'lower\x20left':return 0x1;case _0x5cae23(0x399):return 0x3;case'upper\x20left':return 0x7;case _0x5cae23(0x1d0):return 0x9;}return Number(_0x2f73f8)||0x0;},VisuMZ[_0x291ba2(0x193)]['BattleManager_startBattle']=BattleManager['startBattle'],BattleManager[_0x291ba2(0x38e)]=function(){const _0x318d1e=_0x291ba2;VisuMZ[_0x318d1e(0x193)]['BattleManager_startBattle'][_0x318d1e(0x407)](this),$gamePlayer&&$gamePlayer[_0x318d1e(0x1dc)]();},VisuMZ[_0x291ba2(0x193)][_0x291ba2(0x1bd)]=Game_System[_0x291ba2(0x371)][_0x291ba2(0x317)],Game_System['prototype'][_0x291ba2(0x317)]=function(){const _0x21ea86=_0x291ba2;VisuMZ[_0x21ea86(0x193)][_0x21ea86(0x1bd)][_0x21ea86(0x407)](this),this[_0x21ea86(0x19d)](),this[_0x21ea86(0x366)](),this['initMovementEffectsFootstepSounds'](),this[_0x21ea86(0x273)](),this[_0x21ea86(0x3eb)]();},Game_System[_0x291ba2(0x371)][_0x291ba2(0x19d)]=function(){const _0x45ffc1=_0x291ba2,_0x4f5760=VisuMZ[_0x45ffc1(0x193)][_0x45ffc1(0x2e0)][_0x45ffc1(0x495)];this[_0x45ffc1(0x328)]={'enabled':_0x4f5760['Enabled'],'horzWalk':_0x4f5760[_0x45ffc1(0x1f4)][_0x45ffc1(0x29c)](0x1,0x30),'vertWalk':_0x4f5760[_0x45ffc1(0x475)][_0x45ffc1(0x29c)](0x1,0x30),'horzDash':_0x4f5760[_0x45ffc1(0x485)][_0x45ffc1(0x29c)](0x1,0x30),'vertDash':_0x4f5760['VertDash']['clamp'](0x1,0x30)};},Game_System[_0x291ba2(0x371)]['isSmoothCameraEnabled']=function(){const _0x15f09d=_0x291ba2;if(this[_0x15f09d(0x328)]===undefined)this['initMovementEffectsSmoothCamera']();return this[_0x15f09d(0x328)][_0x15f09d(0x202)];},Game_System[_0x291ba2(0x371)][_0x291ba2(0x25f)]=function(_0x45ddb5){const _0x7915e2=_0x291ba2;if(this[_0x7915e2(0x328)]===undefined)this[_0x7915e2(0x19d)]();this[_0x7915e2(0x328)][_0x7915e2(0x202)]=_0x45ddb5;},Game_System[_0x291ba2(0x371)][_0x291ba2(0x226)]=function(_0x26d8d8,_0x52c7d9){const _0x1791d7=_0x291ba2;if(this[_0x1791d7(0x328)]===undefined)this[_0x1791d7(0x19d)]();const _0x1bc05a=(_0x26d8d8?_0x1791d7(0x1f0):_0x1791d7(0x238))+(_0x52c7d9?_0x1791d7(0x424):'Walk');return this[_0x1791d7(0x328)][_0x1bc05a]['clamp'](0x1,0x30);},Game_System[_0x291ba2(0x371)]['setSmoothCameraSpeed']=function(_0x415ec7,_0x1fe54b,_0x54a3d9){const _0x2becac=_0x291ba2;if(this[_0x2becac(0x328)]===undefined)this[_0x2becac(0x19d)]();const _0x82ff2a=(_0x1fe54b?_0x2becac(0x1f0):_0x2becac(0x238))+(_0x54a3d9?_0x2becac(0x424):_0x2becac(0x408));this['_smoothCamera'][_0x82ff2a]=_0x415ec7[_0x2becac(0x29c)](0x1,0x30);},Game_System[_0x291ba2(0x371)][_0x291ba2(0x366)]=function(){const _0x4aa5eb=_0x291ba2,_0x24fe20=VisuMZ[_0x4aa5eb(0x193)]['Settings'][_0x4aa5eb(0x3bf)];this[_0x4aa5eb(0x46c)]={'enabled':_0x24fe20[_0x4aa5eb(0x1fb)],'filename':_0x24fe20['filename']||'','color':_0x24fe20[_0x4aa5eb(0x46f)]||'#ffffff','radius':_0x24fe20[_0x4aa5eb(0x1e8)]||0x18,'fullness':_0x24fe20[_0x4aa5eb(0x3df)]||0x0,'wholeDuration':_0x24fe20[_0x4aa5eb(0x33f)]||0x14,'startOpacity':_0x24fe20[_0x4aa5eb(0x1b0)]||0xc0,'startScale':_0x24fe20['startScale']||0.2};},Game_System[_0x291ba2(0x371)][_0x291ba2(0x43e)]=function(){const _0x4e3292=_0x291ba2;if(this[_0x4e3292(0x46c)]===undefined)this['initMovementEffectsDustCloud']();return this[_0x4e3292(0x46c)];},Game_System['prototype'][_0x291ba2(0x1de)]=function(_0x47d1aa){const _0x41ed84=_0x291ba2;if(this[_0x41ed84(0x46c)]===undefined)this[_0x41ed84(0x366)]();this[_0x41ed84(0x46c)]=JsonEx[_0x41ed84(0x34f)](_0x47d1aa);},Game_System[_0x291ba2(0x371)]['canShowDustCloud']=function(){const _0x552075=_0x291ba2;return this[_0x552075(0x43e)]()[_0x552075(0x202)];},Game_System[_0x291ba2(0x371)][_0x291ba2(0x1b9)]=function(){const _0x332598=_0x291ba2;this['_footstepSoundsEnabled']=VisuMZ['MovementEffects']['Settings'][_0x332598(0x1cd)][_0x332598(0x1fb)];},Game_System['prototype'][_0x291ba2(0x39a)]=function(){const _0x14bb07=_0x291ba2;if(this['_footstepSoundsEnabled']===undefined)this[_0x14bb07(0x1b9)]();return this[_0x14bb07(0x379)];},Game_System[_0x291ba2(0x371)][_0x291ba2(0x292)]=function(_0x7b624a){const _0x17e2dc=_0x291ba2;if(this[_0x17e2dc(0x379)]===undefined)this[_0x17e2dc(0x1b9)]();this[_0x17e2dc(0x379)]=_0x7b624a;},Game_System[_0x291ba2(0x371)][_0x291ba2(0x273)]=function(){const _0x31eed0=_0x291ba2;this[_0x31eed0(0x3d2)]=VisuMZ[_0x31eed0(0x193)]['Settings'][_0x31eed0(0x442)][_0x31eed0(0x1fb)];},Game_System[_0x291ba2(0x371)]['canMakeFootprints']=function(){const _0x49d5ad=_0x291ba2;if(this[_0x49d5ad(0x3d2)]===undefined)this[_0x49d5ad(0x273)]();return this[_0x49d5ad(0x3d2)];},Game_System[_0x291ba2(0x371)][_0x291ba2(0x41a)]=function(_0x1bc596){const _0x4492e3=_0x291ba2;if(this[_0x4492e3(0x3d2)]===undefined)this[_0x4492e3(0x273)]();this[_0x4492e3(0x3d2)]=_0x1bc596;},Game_System[_0x291ba2(0x371)][_0x291ba2(0x3eb)]=function(){const _0xc5156f=_0x291ba2;this[_0xc5156f(0x283)]={'dir1':0x0,'dir2':0x0,'dir3':0x0,'dir4':0x0,'dir6':0x0,'dir7':0x0,'dir8':0x0,'dir9':0x0};},Game_System[_0x291ba2(0x371)][_0x291ba2(0x3e6)]=function(_0x435c90){const _0x3a9335=_0x291ba2;if(this['_dirMoveSpeedMod']===undefined)this[_0x3a9335(0x3eb)]();const _0x18e757=_0x3a9335(0x291)[_0x3a9335(0x44c)](_0x435c90);return this[_0x3a9335(0x283)][_0x18e757]||0x0;},Game_System[_0x291ba2(0x371)]['setDirMoveSpeedMod']=function(_0x56c217,_0xc09f0a){const _0x3ed8a7=_0x291ba2;if(this[_0x3ed8a7(0x283)]===undefined)this[_0x3ed8a7(0x3eb)]();const _0x5ab431=_0x3ed8a7(0x291)['format'](_0x56c217);this[_0x3ed8a7(0x283)][_0x5ab431]=_0xc09f0a||0x0;},VisuMZ[_0x291ba2(0x193)][_0x291ba2(0x2a4)]=Game_Picture[_0x291ba2(0x371)][_0x291ba2(0x37b)],Game_Picture['prototype'][_0x291ba2(0x37b)]=function(){return![];},Game_Picture['prototype'][_0x291ba2(0x2a8)]=function(){const _0x2932f8=_0x291ba2;return VisuMZ[_0x2932f8(0x193)][_0x2932f8(0x2a4)][_0x2932f8(0x407)](this);},VisuMZ[_0x291ba2(0x193)]['Game_Picture_x']=Game_Picture[_0x291ba2(0x371)]['x'],Game_Picture['prototype']['x']=function(){const _0x52c97d=_0x291ba2;let _0x443d8d=VisuMZ['MovementEffects'][_0x52c97d(0x318)][_0x52c97d(0x407)](this);return this[_0x52c97d(0x2a8)]()&&(_0x443d8d*=$gameScreen[_0x52c97d(0x195)]()),_0x443d8d;},VisuMZ[_0x291ba2(0x193)][_0x291ba2(0x480)]=Game_Picture[_0x291ba2(0x371)]['y'],Game_Picture[_0x291ba2(0x371)]['y']=function(){const _0x196e13=_0x291ba2;let _0x274340=VisuMZ[_0x196e13(0x193)][_0x196e13(0x480)]['call'](this);return this[_0x196e13(0x2a8)]()&&(_0x274340*=$gameScreen['zoomScale']()),_0x274340;},VisuMZ[_0x291ba2(0x193)]['Game_Picture_scaleX']=Game_Picture[_0x291ba2(0x371)][_0x291ba2(0x406)],Game_Picture['prototype'][_0x291ba2(0x406)]=function(){const _0xe5c7f4=_0x291ba2;let _0x3e9185=VisuMZ['MovementEffects']['Game_Picture_scaleX'][_0xe5c7f4(0x407)](this);return this[_0xe5c7f4(0x2a8)]()&&(_0x3e9185*=$gameScreen[_0xe5c7f4(0x195)]()),_0x3e9185;},VisuMZ[_0x291ba2(0x193)][_0x291ba2(0x451)]=Game_Picture[_0x291ba2(0x371)]['scaleY'],Game_Picture[_0x291ba2(0x371)]['scaleY']=function(){const _0x5e4278=_0x291ba2;let _0x4b1a4d=VisuMZ[_0x5e4278(0x193)][_0x5e4278(0x451)][_0x5e4278(0x407)](this);return this[_0x5e4278(0x2a8)]()&&(_0x4b1a4d*=$gameScreen[_0x5e4278(0x195)]()),_0x4b1a4d;},Game_Actor['prototype'][_0x291ba2(0x271)]=function(){const _0x21dc31=_0x291ba2;if(this[_0x21dc31(0x3c4)]===undefined)this[_0x21dc31(0x190)]();return this['_footsteps'];},Game_Actor[_0x291ba2(0x371)]['setupMovementEffectsNotetags']=function(){const _0x483073=_0x291ba2;this[_0x483073(0x2c5)]();const _0x1457a5=this[_0x483073(0x19a)]()[_0x483073(0x375)]||'';Game_Event[_0x483073(0x371)][_0x483073(0x36c)]['call'](this,_0x1457a5);},Game_Actor[_0x291ba2(0x371)][_0x291ba2(0x2c5)]=function(){const _0x2e0cde=_0x291ba2;{const _0x505076=VisuMZ[_0x2e0cde(0x193)]['Settings']['Footsteps'];this[_0x2e0cde(0x3c4)]={'enabled':_0x505076[_0x2e0cde(0x29b)],'volumeRate':_0x505076[_0x2e0cde(0x2dd)],'pitchRate':_0x505076[_0x2e0cde(0x454)],'soundFrames':_0x505076['Frames']['clone']()};}{if(_0x2e0cde(0x3e4)==='GAaxP')_0x42df47[_0x2e0cde(0x2cf)](_0xa5833f,_0x22965e),_0x232e31['setSmoothCameraSpeed'](_0x3b02e6[_0x2e0cde(0x1f4)],![],![]),_0x5da25a[_0x2e0cde(0x422)](_0x5e3f90[_0x2e0cde(0x475)],!![],![]),_0x373ee3[_0x2e0cde(0x422)](_0x2d1dbc['HorzDash'],![],!![]),_0x40caf8[_0x2e0cde(0x422)](_0x1218a3[_0x2e0cde(0x29f)],!![],!![]);else{const _0x5611cc=VisuMZ['MovementEffects'][_0x2e0cde(0x2e0)][_0x2e0cde(0x442)];this[_0x2e0cde(0x206)]={'enabled':!![],'dir1':JSON[_0x2e0cde(0x2fc)](JSON[_0x2e0cde(0x245)](_0x5611cc[_0x2e0cde(0x19e)])),'dir2':JSON[_0x2e0cde(0x2fc)](JSON[_0x2e0cde(0x245)](_0x5611cc[_0x2e0cde(0x2f4)])),'dir3':JSON[_0x2e0cde(0x2fc)](JSON[_0x2e0cde(0x245)](_0x5611cc[_0x2e0cde(0x483)])),'dir4':JSON[_0x2e0cde(0x2fc)](JSON[_0x2e0cde(0x245)](_0x5611cc[_0x2e0cde(0x374)])),'dir6':JSON[_0x2e0cde(0x2fc)](JSON[_0x2e0cde(0x245)](_0x5611cc[_0x2e0cde(0x488)])),'dir7':JSON[_0x2e0cde(0x2fc)](JSON[_0x2e0cde(0x245)](_0x5611cc[_0x2e0cde(0x242)])),'dir8':JSON[_0x2e0cde(0x2fc)](JSON[_0x2e0cde(0x245)](_0x5611cc['dir8'])),'dir9':JSON[_0x2e0cde(0x2fc)](JSON[_0x2e0cde(0x245)](_0x5611cc[_0x2e0cde(0x3b3)]))};}}},Game_Actor[_0x291ba2(0x371)][_0x291ba2(0x24b)]=function(){const _0x5c694=_0x291ba2;if(this[_0x5c694(0x206)]===undefined)this[_0x5c694(0x190)]();return this['_footprintsData'];},VisuMZ['MovementEffects'][_0x291ba2(0x23d)]=Game_Map[_0x291ba2(0x371)]['setup'],Game_Map[_0x291ba2(0x371)][_0x291ba2(0x234)]=function(_0x5edeed){const _0x71d98e=_0x291ba2;VisuMZ[_0x71d98e(0x193)][_0x71d98e(0x23d)]['call'](this,_0x5edeed),this['setupRegionTerrainTagFootstepSounds'](),this[_0x71d98e(0x3d0)](),this[_0x71d98e(0x3c9)](),this[_0x71d98e(0x1dd)](),this[_0x71d98e(0x398)]();},VisuMZ[_0x291ba2(0x193)][_0x291ba2(0x46b)]=Game_Map['prototype']['changeTileset'],Game_Map[_0x291ba2(0x371)][_0x291ba2(0x23b)]=function(_0x4bc736){const _0x359090=_0x291ba2;VisuMZ[_0x359090(0x193)]['Game_Map_changeTileset'][_0x359090(0x407)](this,_0x4bc736),this[_0x359090(0x251)](),this['setupRegionTerrainTagFootprints'](),this[_0x359090(0x3c9)](),this[_0x359090(0x1dd)]();},Game_Map[_0x291ba2(0x371)][_0x291ba2(0x41f)]=function(_0x145936,_0x123325){const _0xdec811=_0x291ba2,_0x4b3adb=[0x50,0x51,0x52,0x53,0x54,0x55,0x56,0x57];_0x4b3adb[_0xdec811(0x294)](0x60,0x61,0x62,0x63,0x64,0x65,0x66,0x67),_0x4b3adb['push'](0x70,0x71,0x72,0x73,0x74,0x75,0x76,0x77);for(let _0x1ecb59=0x0;_0x1ecb59<0x5;_0x1ecb59++){const _0x781acb=$gameMap[_0xdec811(0x22f)](_0x145936,_0x123325,_0x1ecb59);if(_0x4b3adb['includes'](_0x781acb))return!![];}return![];},Game_Map[_0x291ba2(0x371)]['isUsingSmoothCamera']=function(){const _0x357654=_0x291ba2;if(!ConfigManager[_0x357654(0x2c9)])return![];if($dataMap){const _0x53fc6d=VisuMZ['MovementEffects'][_0x357654(0x30f)],_0x482a1a=$dataMap[_0x357654(0x375)]||'';if(_0x482a1a[_0x357654(0x2a3)](_0x53fc6d['ForceSmooth']))return'QQJkj'===_0x357654(0x332)?this['_footprints'][_0x357654(0x1e2)][_0x357654(0x32a)][_0x575449]:!![];else{if(_0x482a1a[_0x357654(0x2a3)](_0x53fc6d[_0x357654(0x2e5)]))return![];}}return $gameSystem[_0x357654(0x218)]();},VisuMZ[_0x291ba2(0x193)][_0x291ba2(0x437)]=Game_Map[_0x291ba2(0x371)]['parallaxOx'],Game_Map[_0x291ba2(0x371)][_0x291ba2(0x222)]=function(){const _0x5932ce=_0x291ba2;let _0x53e3b0=VisuMZ[_0x5932ce(0x193)][_0x5932ce(0x437)][_0x5932ce(0x407)](this);if(this[_0x5932ce(0x2af)])_0x53e3b0=Math[_0x5932ce(0x421)](_0x53e3b0);return _0x53e3b0;},VisuMZ['MovementEffects'][_0x291ba2(0x428)]=Game_Map[_0x291ba2(0x371)]['parallaxOy'],Game_Map[_0x291ba2(0x371)][_0x291ba2(0x22b)]=function(){const _0x5b2aa3=_0x291ba2;let _0x484ba9=VisuMZ[_0x5b2aa3(0x193)][_0x5b2aa3(0x428)][_0x5b2aa3(0x407)](this);if(this[_0x5b2aa3(0x2af)])_0x484ba9=Math[_0x5b2aa3(0x421)](_0x484ba9);return _0x484ba9;},Game_Map[_0x291ba2(0x371)][_0x291ba2(0x3d4)]=function(){const _0x3e09e1=_0x291ba2;if(!ConfigManager['dustCloud'])return![];if($dataMap){const _0x54f5bf=VisuMZ[_0x3e09e1(0x193)][_0x3e09e1(0x30f)],_0x4c0193=$dataMap[_0x3e09e1(0x375)]||'';if(_0x4c0193['match'](_0x54f5bf[_0x3e09e1(0x3a7)]))return!![];else{if(_0x4c0193[_0x3e09e1(0x2a3)](_0x54f5bf[_0x3e09e1(0x482)]))return![];}}return $gameSystem[_0x3e09e1(0x3d4)]();},Game_Map[_0x291ba2(0x371)][_0x291ba2(0x39a)]=function(){const _0x3a0ccb=_0x291ba2;if(!ConfigManager[_0x3a0ccb(0x310)])return![];if($dataMap){if(_0x3a0ccb(0x3ea)!==_0x3a0ccb(0x3ea))this[_0x3a0ccb(0x339)]=_0xeae514[_0x3a0ccb(0x20d)](_0x34a591[_0x3a0ccb(0x43b)]),this['blendMode']=0x0;else{const _0x4b7350=VisuMZ[_0x3a0ccb(0x193)][_0x3a0ccb(0x30f)],_0x5c44ba=$dataMap['note']||'';if(_0x5c44ba[_0x3a0ccb(0x2a3)](_0x4b7350[_0x3a0ccb(0x2b0)]))return!![];else{if(_0x5c44ba[_0x3a0ccb(0x2a3)](_0x4b7350[_0x3a0ccb(0x43f)])){if('rwhev'===_0x3a0ccb(0x471)){_0x3edffc=this['character'](_0x17b2ee);if(_0x45a96e){if(_0x30dcd4===0x3){const _0x42411a=_0x3f8849[_0x3a0ccb(0x1db)];_0x5380dd[_0x3a0ccb(0x1db)]=_0x51d96e[_0x3a0ccb(0x23a)](_0x16a027[_0x3a0ccb(0x1db)]);const _0x346b4c=_0x422e84['screenX']();return _0x5c4495['_displayX']=_0x42411a,_0x346b4c;}else{if(_0x556ebc===0x4){const _0x54059d=_0x2089a9[_0x3a0ccb(0x36b)];_0x34e838['_displayY']=_0x34d241[_0x3a0ccb(0x23a)](_0x552abd[_0x3a0ccb(0x36b)]);const _0x3ae33e=_0x5c753e[_0x3a0ccb(0x343)]();return _0x2f669a[_0x3a0ccb(0x36b)]=_0x54059d,_0x3ae33e;}}}}else return![];}}}}return $gameSystem[_0x3a0ccb(0x39a)]();},Game_Map['prototype'][_0x291ba2(0x251)]=function(){const _0x5d14b2=_0x291ba2;this[_0x5d14b2(0x484)](),this[_0x5d14b2(0x298)](),this['parseTerrainTagBasedFootstepSounds']();},Game_Map[_0x291ba2(0x371)][_0x291ba2(0x484)]=function(){const _0x1cb475=_0x291ba2;this[_0x1cb475(0x351)]={},this[_0x1cb475(0x2d6)]={};},Game_Map[_0x291ba2(0x371)][_0x291ba2(0x298)]=function(){const _0x45c72b=_0x291ba2;if(!$dataMap)return;const _0x30b2cc=VisuMZ[_0x45c72b(0x193)][_0x45c72b(0x2e0)][_0x45c72b(0x1cd)],_0x170836=VisuMZ['MovementEffects']['RegExp'],_0xd19d6=$dataMap[_0x45c72b(0x375)]||'',_0x233231=_0xd19d6[_0x45c72b(0x2a3)](_0x170836[_0x45c72b(0x2ac)]);if(_0x233231)for(const _0x17e59f of _0x233231){if(_0x45c72b(0x43d)==='gJZRM')return _0x115249[_0x45c72b(0x324)]();else{_0x17e59f[_0x45c72b(0x2a3)](_0x170836[_0x45c72b(0x2ac)]);const _0x95666c=Number(RegExp['$1'])[_0x45c72b(0x29c)](0x0,0xff),_0x278d01=String(RegExp['$2'])[_0x45c72b(0x3b6)](',')[_0x45c72b(0x269)](_0x5a9ec2=>_0x5a9ec2[_0x45c72b(0x2b6)]());this[_0x45c72b(0x351)][_0x95666c]={'name':_0x278d01[0x0]||'','volume':Number(_0x278d01[0x1]??_0x30b2cc[_0x45c72b(0x284)]),'pitch':Number(_0x278d01[0x2]??_0x30b2cc['pitch']),'pan':Number(_0x278d01[0x3]??_0x30b2cc['pan'])};}}const _0x53f9f5=_0xd19d6['match'](_0x170836['NoRegionFootstepSfx']);if(_0x53f9f5)for(const _0x1368a4 of _0x53f9f5){if('GqeJa'==='Sfvmv'){if(this['_footprints']===_0x4036a3)this[_0x45c72b(0x3d0)]();const _0x57fbea=_0x51b342[_0x45c72b(0x193)][_0x45c72b(0x2e0)][_0x45c72b(0x442)],_0x3ea6f=this[_0x45c72b(0x41b)](_0x332c90,_0x1674bd),_0x3f093d=this[_0x45c72b(0x239)](_0x9a1545,_0x285cc0);if(this[_0x45c72b(0x457)][_0x45c72b(0x1e2)][_0x45c72b(0x32a)][_0x3ea6f]!==_0x3acf6e)return this[_0x45c72b(0x457)][_0x45c72b(0x1e2)][_0x45c72b(0x32a)][_0x3ea6f];else{if(this[_0x45c72b(0x457)]['duration'][_0x45c72b(0x435)][_0x3f093d]!==_0x4389ab)return this[_0x45c72b(0x457)][_0x45c72b(0x1e2)]['terrainTags'][_0x3f093d];}return _0x57fbea[_0x45c72b(0x33f)];}else{_0x1368a4[_0x45c72b(0x2a3)](_0x170836[_0x45c72b(0x358)]);const _0x5f1d61=Number(RegExp['$1'])[_0x45c72b(0x29c)](0x0,0xff);this[_0x45c72b(0x351)][_0x5f1d61]={'name':'','volume':0x0,'pitch':0x0,'pan':0x0};}}},Game_Map[_0x291ba2(0x371)][_0x291ba2(0x21a)]=function(){const _0x1c8fea=_0x291ba2;if(!this[_0x1c8fea(0x20c)]())return;const _0x5b45b7=VisuMZ[_0x1c8fea(0x193)]['Settings']['Footsteps'],_0x18a2a3=VisuMZ[_0x1c8fea(0x193)][_0x1c8fea(0x30f)],_0x127029=this[_0x1c8fea(0x20c)]()[_0x1c8fea(0x375)]||'',_0x31cf8c=_0x127029[_0x1c8fea(0x2a3)](_0x18a2a3['TerrainTagFootstepSfx']);if(_0x31cf8c)for(const _0x2ea093 of _0x31cf8c){_0x2ea093[_0x1c8fea(0x2a3)](_0x18a2a3[_0x1c8fea(0x1cf)]);const _0x513d10=Number(RegExp['$1'])[_0x1c8fea(0x29c)](0x0,0xff),_0x3a2279=String(RegExp['$2'])[_0x1c8fea(0x3b6)](',')[_0x1c8fea(0x269)](_0x7a2c8e=>_0x7a2c8e[_0x1c8fea(0x2b6)]());this[_0x1c8fea(0x2d6)][_0x513d10]={'name':_0x3a2279[0x0]||'','volume':Number(_0x3a2279[0x1]??_0x5b45b7['volume']),'pitch':Number(_0x3a2279[0x2]??_0x5b45b7[_0x1c8fea(0x247)]),'pan':Number(_0x3a2279[0x3]??_0x5b45b7[_0x1c8fea(0x287)])};}const _0x411f04=_0x127029['match'](_0x18a2a3[_0x1c8fea(0x2f7)]);if(_0x411f04)for(const _0x5bd32f of _0x411f04){_0x5bd32f[_0x1c8fea(0x2a3)](_0x18a2a3[_0x1c8fea(0x2f7)]);const _0x52d7bb=Number(RegExp['$1'])['clamp'](0x0,0x7);this[_0x1c8fea(0x2d6)][_0x52d7bb]={'name':'','volume':0x0,'pitch':0x0,'pan':0x0};}},Game_Map['prototype']['applyFootstepSoundTileChanges']=function(_0x90ee59,_0x1e0603){const _0x22c932=_0x291ba2;if(!_0x90ee59)return;if(!_0x1e0603)return;(this[_0x22c932(0x351)]===undefined||this[_0x22c932(0x2d6)]===undefined)&&this[_0x22c932(0x251)]();const _0x11d790=_0x1e0603['x'],_0x5a3c84=_0x1e0603['y'],_0x252f63=this['regionId'](_0x11d790,_0x5a3c84),_0x19633c=this[_0x22c932(0x239)](_0x11d790,_0x5a3c84),_0x443eb8=[_0x22c932(0x3fa),_0x22c932(0x284),'pitch',_0x22c932(0x287)];if(this[_0x22c932(0x2d6)][_0x19633c]){if(_0x22c932(0x2ca)!=='AbbIQ'){const _0x4e4d2e=this[_0x22c932(0x2d6)][_0x19633c];for(const _0x3f3c98 of _0x443eb8){if(_0x22c932(0x2b4)===_0x22c932(0x2b4))_0x90ee59[_0x3f3c98]=_0x4e4d2e[_0x3f3c98];else{if(!_0x4e7485[_0x22c932(0x2f8)]())return![];if(this[_0x22c932(0x230)])return![];if(this[_0x22c932(0x401)]())return![];if(this[_0x22c932(0x1e7)]())return![];if(this[_0x22c932(0x3b8)]())return![];if(this[_0x22c932(0x25b)]())return![];return!![];}}}else this[_0x22c932(0x3c4)][_0x22c932(0x2e7)]=_0x2a06a8(_0x33dd6d['$1'])*0.01;}if(this[_0x22c932(0x351)][_0x252f63]){const _0xfe97fb=this['_regionFootstepSounds'][_0x252f63];for(const _0x4bf3dd of _0x443eb8){_0x90ee59[_0x4bf3dd]=_0xfe97fb[_0x4bf3dd];}}},Game_Map[_0x291ba2(0x371)][_0x291ba2(0x486)]=function(_0x19ad48,_0x5116b8){const _0x4c9ad2=_0x291ba2;if(!ConfigManager[_0x4c9ad2(0x45d)])return![];if(!$gameSystem['canMakeFootprints']())return![];if(this[_0x4c9ad2(0x457)]===undefined)this['setupRegionTerrainTagFootprints']();const _0x9bd29=this[_0x4c9ad2(0x41b)](_0x19ad48,_0x5116b8),_0x1ede9b=this[_0x4c9ad2(0x239)](_0x19ad48,_0x5116b8);if(this[_0x4c9ad2(0x457)][_0x4c9ad2(0x420)][_0x4c9ad2(0x32a)][_0x4c9ad2(0x387)](_0x9bd29))return![];if(this[_0x4c9ad2(0x457)][_0x4c9ad2(0x420)][_0x4c9ad2(0x435)][_0x4c9ad2(0x387)](_0x1ede9b))return![];if(this[_0x4c9ad2(0x457)]['allowed'][_0x4c9ad2(0x32a)]['includes'](_0x9bd29))return!![];if(this[_0x4c9ad2(0x457)][_0x4c9ad2(0x203)][_0x4c9ad2(0x435)][_0x4c9ad2(0x387)](_0x1ede9b))return!![];return![];},Game_Map[_0x291ba2(0x371)][_0x291ba2(0x3d0)]=function(){const _0x4a45ed=_0x291ba2;this[_0x4a45ed(0x1d4)](),this[_0x4a45ed(0x2d2)](),this['parseTerrainTagBasedFootprints']();},Game_Map[_0x291ba2(0x371)][_0x291ba2(0x1d4)]=function(){const _0x4718b5=_0x291ba2,_0xe7b350=VisuMZ[_0x4718b5(0x193)][_0x4718b5(0x2e0)][_0x4718b5(0x442)];this[_0x4718b5(0x457)]={'allowed':{'regions':_0xe7b350[_0x4718b5(0x1fd)][_0x4718b5(0x20b)](),'terrainTags':_0xe7b350[_0x4718b5(0x429)][_0x4718b5(0x20b)]()},'forbidden':{'regions':[],'terrainTags':[]},'opacity':{'regions':{},'terrainTags':{}},'duration':{'regions':{},'terrainTags':{}}};},Game_Map['prototype'][_0x291ba2(0x2d2)]=function(){const _0x4f6b8d=_0x291ba2;if(!$dataMap)return;if(this[_0x4f6b8d(0x457)]===undefined)this['setupRegionTerrainTagFootprints']();const _0x51efd0=VisuMZ[_0x4f6b8d(0x193)][_0x4f6b8d(0x30f)],_0x2ee8d3=$dataMap[_0x4f6b8d(0x375)]||'';_0x2ee8d3[_0x4f6b8d(0x2a3)](_0x51efd0[_0x4f6b8d(0x27a)])&&(this[_0x4f6b8d(0x457)][_0x4f6b8d(0x203)][_0x4f6b8d(0x32a)]=RegExp['$1'][_0x4f6b8d(0x3b6)](',')[_0x4f6b8d(0x269)](_0xfc902d=>(Number(_0xfc902d)||0x0)[_0x4f6b8d(0x29c)](0x0,0xff)));if(_0x2ee8d3[_0x4f6b8d(0x2a3)](_0x51efd0[_0x4f6b8d(0x2dc)])){if(_0x4f6b8d(0x425)===_0x4f6b8d(0x38d)){const _0x4171d9=_0x318208-_0x48dda7,_0x4ed9b4=_0x59d6f3*_0x1c6de2,_0x364255=_0x4171d9/(_0x4ed9b4||0.01);_0x1b82d5[_0x4f6b8d(0x378)](_0x364255);}else this[_0x4f6b8d(0x457)][_0x4f6b8d(0x420)]['regions']=RegExp['$1'][_0x4f6b8d(0x3b6)](',')[_0x4f6b8d(0x269)](_0x52bab0=>(Number(_0x52bab0)||0x0)[_0x4f6b8d(0x29c)](0x0,0xff));}const _0x89ccbe=_0x2ee8d3['match'](_0x51efd0[_0x4f6b8d(0x341)]);if(_0x89ccbe){if(_0x4f6b8d(0x1c1)===_0x4f6b8d(0x1c1))for(const _0x5bb0ac of _0x89ccbe){if('iowWN'!==_0x4f6b8d(0x314)){_0x5bb0ac[_0x4f6b8d(0x2a3)](_0x51efd0['RegionFootprintOpacity']);const _0x1a7882=Number(RegExp['$1'])['clamp'](0x0,0xff),_0x4bda43=Number(RegExp['$2'])[_0x4f6b8d(0x29c)](0x0,0xff);this[_0x4f6b8d(0x457)][_0x4f6b8d(0x2a0)][_0x4f6b8d(0x32a)][_0x1a7882]=_0x4bda43;}else{_0x9f65ce=_0x16a09a||{'NonLandableRegions':[],'NonLandableTerrainTags':[],'NonPassableRegions':[],'NonPassableTerrainTags':[]},this['_smartBlinkRestrictions']=_0x2f7f38[_0x4f6b8d(0x34f)](_0x20830d),_0x105e8f=this[_0x4f6b8d(0x24c)](_0x5d25f4||0x1);if(!this[_0x4f6b8d(0x466)](_0x550e9b))return![];const _0x3b38ef=_0x387e49[_0x4f6b8d(0x193)][_0x4f6b8d(0x2e0)][_0x4f6b8d(0x194)];return this[_0x4f6b8d(0x47a)](_0x3b38ef),this['_smartBlinkDistance']=_0x146361||0x1,this[_0x4f6b8d(0x280)]=_0x20d08e||0x1,this[_0x4f6b8d(0x402)]=_0x5c7e82[_0x4f6b8d(0x34f)](_0x2304a1),this[_0x4f6b8d(0x46e)](_0x130212),!![];}}else this[_0x4f6b8d(0x3c4)][_0x4f6b8d(0x44f)]=_0x3a8ea0(_0x4a3597['$1'])[_0x4f6b8d(0x3b6)](',')[_0x4f6b8d(0x269)](_0x52a5ce=>_0x365d56(_0x52a5ce)||0x0);}const _0x5f32fd=_0x2ee8d3[_0x4f6b8d(0x2a3)](_0x51efd0[_0x4f6b8d(0x1ec)]);if(_0x5f32fd)for(const _0x4b555d of _0x5f32fd){if(_0x4f6b8d(0x3a6)===_0x4f6b8d(0x3a6)){_0x4b555d[_0x4f6b8d(0x2a3)](_0x51efd0[_0x4f6b8d(0x1ec)]);const _0x74666c=Number(RegExp['$1'])['clamp'](0x0,0xff),_0x123b67=Math[_0x4f6b8d(0x1b4)](0x1,Number(RegExp['$2']));this[_0x4f6b8d(0x457)][_0x4f6b8d(0x1e2)][_0x4f6b8d(0x32a)][_0x74666c]=_0x123b67;}else _0x80d53f('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x4f6b8d(0x44c)](_0x4ae545,_0x269e1e)),_0x29856e[_0x4f6b8d(0x414)]();}},Game_Map[_0x291ba2(0x371)][_0x291ba2(0x439)]=function(){const _0x45b567=_0x291ba2;if(!this[_0x45b567(0x20c)]())return;if(this[_0x45b567(0x457)]===undefined)this[_0x45b567(0x3d0)]();const _0x5aae18=VisuMZ['MovementEffects']['RegExp'],_0x5bf790=this['tileset']()[_0x45b567(0x375)]||'';_0x5bf790[_0x45b567(0x2a3)](_0x5aae18[_0x45b567(0x24d)])&&(this[_0x45b567(0x457)][_0x45b567(0x203)][_0x45b567(0x435)]=RegExp['$1'][_0x45b567(0x3b6)](',')[_0x45b567(0x269)](_0x3eadc6=>(Number(_0x3eadc6)||0x0)[_0x45b567(0x29c)](0x0,0x7)));_0x5bf790[_0x45b567(0x2a3)](_0x5aae18['NonFootprintTerrainTags'])&&(this[_0x45b567(0x457)][_0x45b567(0x420)]['terrainTags']=RegExp['$1'][_0x45b567(0x3b6)](',')[_0x45b567(0x269)](_0x47cefe=>(Number(_0x47cefe)||0x0)[_0x45b567(0x29c)](0x0,0x7)));const _0x5e9886=_0x5bf790[_0x45b567(0x2a3)](_0x5aae18[_0x45b567(0x335)]);if(_0x5e9886){if(_0x45b567(0x2b9)===_0x45b567(0x249)){_0x77b013['match'](_0x4bc639[_0x45b567(0x409)]);const _0x1a190b=_0x473cdb(_0xf7a833['$1'])[_0x45b567(0x29c)](0x0,0xff),_0x2c590c=_0x391654[_0x45b567(0x1b4)](0x1,_0x291fdb(_0x58b129['$2']));this[_0x45b567(0x457)]['duration']['terrainTags'][_0x1a190b]=_0x2c590c;}else for(const _0x13b51e of _0x5e9886){_0x13b51e[_0x45b567(0x2a3)](_0x5aae18['TerrainTagFootprintOpacity']);const _0x1148df=Number(RegExp['$1'])[_0x45b567(0x29c)](0x0,0xff),_0x244a15=Number(RegExp['$2'])[_0x45b567(0x29c)](0x0,0xff);this[_0x45b567(0x457)]['opacity'][_0x45b567(0x435)][_0x1148df]=_0x244a15;}}const _0x41314f=_0x5bf790[_0x45b567(0x2a3)](_0x5aae18[_0x45b567(0x409)]);if(_0x41314f)for(const _0x95ef3b of _0x41314f){if(_0x45b567(0x48f)===_0x45b567(0x35a)){if(this[_0x45b567(0x3f2)]===_0x3ba4f2)this[_0x45b567(0x398)]();const _0x13d8b3=this[_0x45b567(0x41b)](_0x17932c,_0x482ae6);return this[_0x45b567(0x299)](_0x13d8b3);;}else{_0x95ef3b[_0x45b567(0x2a3)](_0x5aae18[_0x45b567(0x409)]);const _0x3359fd=Number(RegExp['$1'])[_0x45b567(0x29c)](0x0,0xff),_0x5e6904=Math['max'](0x1,Number(RegExp['$2']));this[_0x45b567(0x457)][_0x45b567(0x1e2)][_0x45b567(0x435)][_0x3359fd]=_0x5e6904;}}},Game_Map[_0x291ba2(0x371)][_0x291ba2(0x3cf)]=function(_0x19823c,_0x5e50e2){const _0x5cdd1d=_0x291ba2;if(this['_footprints']===undefined)this[_0x5cdd1d(0x3d0)]();const _0x586874=VisuMZ[_0x5cdd1d(0x193)][_0x5cdd1d(0x2e0)][_0x5cdd1d(0x442)],_0x2ed99c=this[_0x5cdd1d(0x41b)](_0x19823c,_0x5e50e2),_0x333cc6=this['terrainTag'](_0x19823c,_0x5e50e2);if(this[_0x5cdd1d(0x457)][_0x5cdd1d(0x2a0)][_0x5cdd1d(0x32a)][_0x2ed99c]!==undefined){if(_0x5cdd1d(0x322)==='ZCQyd')return this[_0x5cdd1d(0x457)]['opacity']['regions'][_0x2ed99c];else this['createMotionBlurMovementEffectsFilter']();}else{if(this[_0x5cdd1d(0x457)][_0x5cdd1d(0x2a0)][_0x5cdd1d(0x435)][_0x333cc6]!==undefined)return this[_0x5cdd1d(0x457)][_0x5cdd1d(0x2a0)]['terrainTags'][_0x333cc6];}return _0x586874['startOpacity'];},Game_Map[_0x291ba2(0x371)]['footprintDurationAtXy']=function(_0x25738b,_0x3f554e){const _0x32d0d6=_0x291ba2;if(this['_footprints']===undefined)this[_0x32d0d6(0x3d0)]();const _0x34ac55=VisuMZ[_0x32d0d6(0x193)][_0x32d0d6(0x2e0)][_0x32d0d6(0x442)],_0x40b14c=this[_0x32d0d6(0x41b)](_0x25738b,_0x3f554e),_0x3284eb=this[_0x32d0d6(0x239)](_0x25738b,_0x3f554e);if(this[_0x32d0d6(0x457)][_0x32d0d6(0x1e2)]['regions'][_0x40b14c]!==undefined)return this[_0x32d0d6(0x457)][_0x32d0d6(0x1e2)]['regions'][_0x40b14c];else{if(this[_0x32d0d6(0x457)][_0x32d0d6(0x1e2)][_0x32d0d6(0x435)][_0x3284eb]!==undefined)return this[_0x32d0d6(0x457)]['duration'][_0x32d0d6(0x435)][_0x3284eb];}return _0x34ac55[_0x32d0d6(0x33f)];},Game_Map[_0x291ba2(0x371)][_0x291ba2(0x3c9)]=function(){const _0x41f1e7=_0x291ba2;this['initRegionTerrainTagSmartRush'](),this[_0x41f1e7(0x309)](),this[_0x41f1e7(0x37c)]();},Game_Map[_0x291ba2(0x371)][_0x291ba2(0x1a0)]=function(){const _0x237fce=_0x291ba2,_0x3067bc=VisuMZ[_0x237fce(0x193)][_0x237fce(0x2e0)]['SmartRush'];this[_0x237fce(0x362)]={'enabled':!![],'NonCrashRegions':(_0x3067bc[_0x237fce(0x2f5)]||[])[_0x237fce(0x20b)](),'NonCrashTerrainTags':(_0x3067bc[_0x237fce(0x1b8)]||[])['clone']()};},Game_Map['prototype'][_0x291ba2(0x309)]=function(){const _0x1896c1=_0x291ba2,_0x41561e=VisuMZ[_0x1896c1(0x193)][_0x1896c1(0x30f)],_0x1621bc=$dataMap[_0x1896c1(0x375)]||'';if(_0x1621bc[_0x1896c1(0x2a3)](_0x41561e[_0x1896c1(0x3d1)])){if(_0x1896c1(0x225)===_0x1896c1(0x225))this[_0x1896c1(0x362)]['enabled']=![];else{if(_0x311a3d[_0x1896c1(0x2e8)]())return!![];this[_0x1896c1(0x436)]='';}}_0x1621bc[_0x1896c1(0x2a3)](_0x41561e[_0x1896c1(0x31e)])&&(this['_smartRush'][_0x1896c1(0x2f5)]=RegExp['$1'][_0x1896c1(0x3b6)](',')[_0x1896c1(0x269)](_0x249a21=>(Number(_0x249a21)||0x0)[_0x1896c1(0x29c)](0x0,0xff)));},Game_Map[_0x291ba2(0x371)][_0x291ba2(0x37c)]=function(){const _0x4f68b6=_0x291ba2,_0x8a3cc4=VisuMZ[_0x4f68b6(0x193)]['RegExp'];if(!this[_0x4f68b6(0x20c)]())return;const _0x855f=this[_0x4f68b6(0x20c)]()[_0x4f68b6(0x375)]||'';_0x855f[_0x4f68b6(0x2a3)](_0x8a3cc4[_0x4f68b6(0x311)])&&(this[_0x4f68b6(0x362)][_0x4f68b6(0x1b8)]=RegExp['$1'][_0x4f68b6(0x3b6)](',')['map'](_0x5d5322=>(Number(_0x5d5322)||0x0)[_0x4f68b6(0x29c)](0x0,0x7)));},Game_Map[_0x291ba2(0x371)]['isSmartRushEnabled']=function(){const _0x2f7343=_0x291ba2;if(this[_0x2f7343(0x362)]===undefined)this[_0x2f7343(0x3c9)]();return this[_0x2f7343(0x362)][_0x2f7343(0x202)];},Game_Map[_0x291ba2(0x371)][_0x291ba2(0x452)]=function(_0x2cc728,_0x547828,_0x49a71d){const _0x44239b=_0x291ba2,_0x430cc4=this[_0x44239b(0x1df)](_0x2cc728,_0x49a71d),_0x7fe849=this[_0x44239b(0x364)](_0x547828,_0x49a71d);if($gameMap['checkPassage'](_0x430cc4,_0x7fe849,0x200))return![];if($gameMap[_0x44239b(0x2ff)](_0x430cc4,_0x7fe849,0x400))return![];if(_0x430cc4<0x0||_0x430cc4>=this['width']())return![];if(_0x7fe849<0x0||_0x7fe849>=this['height']())return![];const _0x50dae6=this[_0x44239b(0x41b)](_0x430cc4,_0x7fe849);if(this[_0x44239b(0x362)][_0x44239b(0x2f5)][_0x44239b(0x387)](_0x50dae6))return![];const _0x512f98=this[_0x44239b(0x239)](_0x430cc4,_0x7fe849);if(this[_0x44239b(0x362)][_0x44239b(0x1b8)][_0x44239b(0x387)](_0x512f98))return![];return Game_Player['SMART_RUSH_SHAKE_ENABLED'];},Game_Map[_0x291ba2(0x371)][_0x291ba2(0x1dd)]=function(){const _0x1cf86b=_0x291ba2;this[_0x1cf86b(0x481)](),this[_0x1cf86b(0x423)](),this['parseTerrainTagBasedSmartBlink']();},Game_Map[_0x291ba2(0x371)][_0x291ba2(0x481)]=function(){const _0x45b1ba=_0x291ba2,_0x298c5b=VisuMZ[_0x45b1ba(0x193)]['Settings'][_0x45b1ba(0x194)];this[_0x45b1ba(0x39c)]={'enabled':!![],'NonLandableRegions':(_0x298c5b[_0x45b1ba(0x3ee)]||[])['clone'](),'NonLandableTerrainTags':(_0x298c5b[_0x45b1ba(0x2da)]||[])['clone'](),'NonPassableRegions':(_0x298c5b['NonPassableRegions']||[])['clone'](),'NonPassableTerrainTags':(_0x298c5b[_0x45b1ba(0x3e7)]||[])[_0x45b1ba(0x20b)]()};},Game_Map[_0x291ba2(0x371)][_0x291ba2(0x423)]=function(){const _0x1a4864=_0x291ba2,_0x415834=VisuMZ[_0x1a4864(0x193)][_0x1a4864(0x30f)],_0x3844cb=$dataMap[_0x1a4864(0x375)]||'';_0x3844cb[_0x1a4864(0x2a3)](_0x415834[_0x1a4864(0x1f7)])&&(this[_0x1a4864(0x39c)]['enabled']=![]),_0x3844cb['match'](_0x415834[_0x1a4864(0x261)])&&(this[_0x1a4864(0x39c)]['NonLandableRegions']=RegExp['$1'][_0x1a4864(0x3b6)](',')[_0x1a4864(0x269)](_0x179d89=>(Number(_0x179d89)||0x0)[_0x1a4864(0x29c)](0x0,0xff))),_0x3844cb['match'](_0x415834[_0x1a4864(0x44e)])&&(this[_0x1a4864(0x39c)][_0x1a4864(0x2ec)]=RegExp['$1']['split'](',')[_0x1a4864(0x269)](_0x40c57d=>(Number(_0x40c57d)||0x0)[_0x1a4864(0x29c)](0x0,0xff)));},Game_Map[_0x291ba2(0x371)][_0x291ba2(0x385)]=function(){const _0x4ba8e1=_0x291ba2,_0x2261e3=VisuMZ[_0x4ba8e1(0x193)][_0x4ba8e1(0x30f)];if(!this[_0x4ba8e1(0x20c)]())return;const _0x18bfae=this['tileset']()[_0x4ba8e1(0x375)]||'';if(_0x18bfae[_0x4ba8e1(0x2a3)](_0x2261e3[_0x4ba8e1(0x345)])){if(_0x4ba8e1(0x357)!==_0x4ba8e1(0x277))this['_smartBlink'][_0x4ba8e1(0x2da)]=RegExp['$1'][_0x4ba8e1(0x3b6)](',')[_0x4ba8e1(0x269)](_0x188f8f=>(Number(_0x188f8f)||0x0)['clamp'](0x0,0x7));else{if(!_0x50b81a[_0x4ba8e1(0x45d)])return![];if(!_0x56e6a6[_0x4ba8e1(0x486)]())return![];if(this[_0x4ba8e1(0x457)]===_0x512f0d)this[_0x4ba8e1(0x3d0)]();const _0x42a32e=this['regionId'](_0xf06793,_0x59eaaa),_0x2a08c5=this[_0x4ba8e1(0x239)](_0x24902a,_0xe9dba3);if(this[_0x4ba8e1(0x457)][_0x4ba8e1(0x420)][_0x4ba8e1(0x32a)][_0x4ba8e1(0x387)](_0x42a32e))return![];if(this[_0x4ba8e1(0x457)][_0x4ba8e1(0x420)][_0x4ba8e1(0x435)][_0x4ba8e1(0x387)](_0x2a08c5))return![];if(this[_0x4ba8e1(0x457)][_0x4ba8e1(0x203)]['regions'][_0x4ba8e1(0x387)](_0x42a32e))return!![];if(this['_footprints']['allowed'][_0x4ba8e1(0x435)][_0x4ba8e1(0x387)](_0x2a08c5))return!![];return![];}}_0x18bfae[_0x4ba8e1(0x2a3)](_0x2261e3[_0x4ba8e1(0x1ab)])&&(_0x4ba8e1(0x199)===_0x4ba8e1(0x36a)?this['createFootprint']():this[_0x4ba8e1(0x39c)][_0x4ba8e1(0x3e7)]=RegExp['$1'][_0x4ba8e1(0x3b6)](',')[_0x4ba8e1(0x269)](_0x1cec90=>(Number(_0x1cec90)||0x0)[_0x4ba8e1(0x29c)](0x0,0x7)));},Game_Map['prototype'][_0x291ba2(0x411)]=function(){const _0xa865d0=_0x291ba2;if(this[_0xa865d0(0x39c)]===undefined)this[_0xa865d0(0x1dd)]();return this['_smartBlink'][_0xa865d0(0x202)];},Game_Map[_0x291ba2(0x371)][_0x291ba2(0x221)]=function(_0x33d477,_0x16d5ac){const _0x4bd5fc=_0x291ba2,_0x5afa18=this['regionId'](_0x33d477,_0x16d5ac),_0x5f0caf=this[_0x4bd5fc(0x239)](_0x33d477,_0x16d5ac);if(this[_0x4bd5fc(0x39c)]===undefined)this['setupRegionTerrainTagSmartBlink']();if(this[_0x4bd5fc(0x39c)][_0x4bd5fc(0x2ec)][_0x4bd5fc(0x387)](_0x5afa18))return!![];if(this[_0x4bd5fc(0x39c)][_0x4bd5fc(0x3e7)][_0x4bd5fc(0x387)](_0x5f0caf))return!![];return![];},Game_Map[_0x291ba2(0x371)][_0x291ba2(0x250)]=function(_0xcc269e,_0x4600f6){const _0x758b16=_0x291ba2,_0x270e67=this[_0x758b16(0x41b)](_0xcc269e,_0x4600f6),_0xa0651f=this['terrainTag'](_0xcc269e,_0x4600f6);if(this[_0x758b16(0x39c)]===undefined)this[_0x758b16(0x1dd)]();if(this[_0x758b16(0x39c)][_0x758b16(0x3ee)]['includes'](_0x270e67))return!![];if(this[_0x758b16(0x39c)][_0x758b16(0x2da)]['includes'](_0xa0651f))return!![];return![];},Game_Map[_0x291ba2(0x371)][_0x291ba2(0x398)]=function(){const _0x5d189b=_0x291ba2;this['initRegionTerrainTagSmartJump'](),this['parseRegionBasedSmartJump'](),this[_0x5d189b(0x1a8)]();},Game_Map[_0x291ba2(0x371)][_0x291ba2(0x37d)]=function(){const _0xcbed40=_0x291ba2,_0x157d36=VisuMZ[_0xcbed40(0x193)][_0xcbed40(0x2e0)][_0xcbed40(0x1a9)];this[_0xcbed40(0x3f2)]={'enabled':!![],'HeightBasedRegions':(_0x157d36[_0xcbed40(0x1d3)]||[])['clone'](),'NonLandableRegions':(_0x157d36[_0xcbed40(0x3ee)]||[])['clone'](),'NonLandableTerrainTags':(_0x157d36[_0xcbed40(0x2da)]||[])['clone'](),'NonPassableRegions':(_0x157d36[_0xcbed40(0x2ec)]||[])[_0xcbed40(0x20b)](),'NonPassableTerrainTags':(_0x157d36[_0xcbed40(0x3e7)]||[])[_0xcbed40(0x20b)]()};},Game_Map[_0x291ba2(0x371)]['parseRegionBasedSmartJump']=function(){const _0x1f918a=_0x291ba2,_0xf82856=VisuMZ[_0x1f918a(0x193)][_0x1f918a(0x30f)],_0x295cb1=$dataMap[_0x1f918a(0x375)]||'';_0x295cb1[_0x1f918a(0x2a3)](_0xf82856[_0x1f918a(0x2ad)])&&(this[_0x1f918a(0x3f2)][_0x1f918a(0x202)]=![]);_0x295cb1['match'](_0xf82856[_0x1f918a(0x2e2)])&&(this[_0x1f918a(0x3f2)][_0x1f918a(0x395)]=Number(RegExp['$1'])['clamp'](0x0,0xff));if(_0x295cb1[_0x1f918a(0x2a3)](_0xf82856[_0x1f918a(0x352)])){if(_0x1f918a(0x214)===_0x1f918a(0x214))this['_smartJump'][_0x1f918a(0x1d3)]=RegExp['$1']['split'](',')['map'](_0x5f22cf=>(Number(_0x5f22cf)||0x0)[_0x1f918a(0x29c)](0x0,0xff)),this[_0x1f918a(0x3f2)]['HeightBasedRegions']['sort']();else{if(!_0x1b6982[_0x1f918a(0x41f)](this['x'],this['y'])&&_0x14fbd4['isCeilingTile'](_0xc1105c,_0x4342b4))return!![];return![];}}if(_0x295cb1[_0x1f918a(0x2a3)](_0xf82856[_0x1f918a(0x326)])){if(_0x1f918a(0x496)===_0x1f918a(0x235)){if(!_0x5e3edd['dustCloud'])return![];if(_0x5eeca8){const _0x32eb6b=_0x14d982[_0x1f918a(0x193)][_0x1f918a(0x30f)],_0x56e82c=_0x4b4c34[_0x1f918a(0x375)]||'';if(_0x56e82c['match'](_0x32eb6b[_0x1f918a(0x3a7)]))return!![];else{if(_0x56e82c[_0x1f918a(0x2a3)](_0x32eb6b['NoDustCloud']))return![];}}return _0x3adc46[_0x1f918a(0x3d4)]();}else this['_smartJump'][_0x1f918a(0x3ee)]=RegExp['$1'][_0x1f918a(0x3b6)](',')[_0x1f918a(0x269)](_0x556ee8=>(Number(_0x556ee8)||0x0)[_0x1f918a(0x29c)](0x0,0xff));}_0x295cb1[_0x1f918a(0x2a3)](_0xf82856[_0x1f918a(0x3d9)])&&(_0x1f918a(0x2e4)!==_0x1f918a(0x2e4)?(this[_0x1f918a(0x19c)](),this[_0x1f918a(0x2ea)]()):this[_0x1f918a(0x3f2)]['NonPassableRegions']=RegExp['$1']['split'](',')[_0x1f918a(0x269)](_0x3c484e=>(Number(_0x3c484e)||0x0)[_0x1f918a(0x29c)](0x0,0xff)));},Game_Map[_0x291ba2(0x371)]['parseTerrainTagBasedSmartJump']=function(){const _0xf1e57a=_0x291ba2,_0x1f2d1e=VisuMZ['MovementEffects'][_0xf1e57a(0x30f)];if(!this[_0xf1e57a(0x20c)]())return;const _0x4ece4a=this[_0xf1e57a(0x20c)]()['note']||'';_0x4ece4a[_0xf1e57a(0x2a3)](_0x1f2d1e[_0xf1e57a(0x34e)])&&(_0xf1e57a(0x2a6)==='GqSTK'?(_0x2e3220['MovementEffects']['BattleManager_startBattle'][_0xf1e57a(0x407)](this),_0x4dc8f4&&_0x4f3d60[_0xf1e57a(0x1dc)]()):this['_smartJump']['NonLandableTerrainTags']=RegExp['$1'][_0xf1e57a(0x3b6)](',')['map'](_0x88e082=>(Number(_0x88e082)||0x0)[_0xf1e57a(0x29c)](0x0,0x7))),_0x4ece4a['match'](_0x1f2d1e[_0xf1e57a(0x2c0)])&&('bTLbq'!=='bTLbq'?_0x199951*=_0x9171b2['zoomScale']():this[_0xf1e57a(0x3f2)]['NonPassableTerrainTags']=RegExp['$1']['split'](',')[_0xf1e57a(0x269)](_0x30c9c1=>(Number(_0x30c9c1)||0x0)[_0xf1e57a(0x29c)](0x0,0x7)));},Game_Map[_0x291ba2(0x371)]['isSmartJumpEnabled']=function(){const _0x61ac6f=_0x291ba2;if(this['_smartJump']===undefined)this['setupRegionTerrainTagSmartJump']();return this[_0x61ac6f(0x3f2)]['enabled'];},Game_Map[_0x291ba2(0x371)][_0x291ba2(0x1d5)]=function(_0xe53774,_0x54aa7f){const _0x21cf3d=_0x291ba2;if(this[_0x21cf3d(0x3f2)]===undefined)this[_0x21cf3d(0x398)]();const _0x1e1d3e=this[_0x21cf3d(0x41b)](_0xe53774,_0x54aa7f);return this[_0x21cf3d(0x299)](_0x1e1d3e);;},Game_Map['prototype'][_0x291ba2(0x196)]=function(_0x4a24c7){const _0x1920f8=_0x291ba2;if(this['_smartJump']===undefined)this[_0x1920f8(0x398)]();const _0x293228=this[_0x1920f8(0x3f2)][_0x1920f8(0x1d3)][_0x1920f8(0x2cd)](_0x4a24c7);return _0x293228===0x0;},Game_Map[_0x291ba2(0x371)][_0x291ba2(0x299)]=function(_0x26bdec){const _0x3d6ec9=_0x291ba2;if(this[_0x3d6ec9(0x3f2)]===undefined)this[_0x3d6ec9(0x398)]();return this[_0x3d6ec9(0x3f2)][_0x3d6ec9(0x1d3)][_0x3d6ec9(0x387)](_0x26bdec);},Game_Map[_0x291ba2(0x371)]['meetsSmartJumpHeightConditions']=function(_0x133425,_0x4fb68d,_0x2d54cf){const _0x1de90d=_0x291ba2,_0x13e25f=$gamePlayer[_0x1de90d(0x41b)](),_0x459013=this[_0x1de90d(0x41b)](_0x133425,_0x4fb68d);if(this['isHeightBasedRegion'](_0x13e25f)){if(_0x1de90d(0x441)===_0x1de90d(0x441)){const _0x25124b=$gamePlayer[_0x1de90d(0x3f6)]();if(this[_0x1de90d(0x196)](_0x13e25f)&&this[_0x1de90d(0x196)](_0x459013)){if(_0x1de90d(0x208)!==_0x1de90d(0x208))this[_0x1de90d(0x3aa)][_0x1de90d(0x1e1)](_0x2cef4e),this['_footprintSprites'][_0x1de90d(0x300)](_0x217c52);else return!![];}if(_0x25124b!==0x2&&this['isSmartJumpRegionLowestHeight'](_0x459013)){if(_0x2d54cf>=0x1)return![];}if(this['isHeightBasedRegion'](_0x459013))return _0x13e25f>=_0x459013;else{const _0x467406=this['_smartJump'][_0x1de90d(0x1d3)][_0x1de90d(0x2cd)](_0x13e25f);return _0x467406<=0x0;}}else this[_0x1de90d(0x438)]=_0x51441f[_0x1de90d(0x285)],_0x36c6aa=_0x163919[_0x1de90d(0x302)];}if(this[_0x1de90d(0x299)](_0x459013)){if(_0x1de90d(0x39d)!=='jxYlv'){const _0x4b8b2b=this[_0x1de90d(0x3f2)][_0x1de90d(0x1d3)][_0x1de90d(0x2cd)](_0x459013);return _0x4b8b2b<=0x0;}else{_0x1e2984['ConvertParams'](_0x123f14,_0x5051f4);const _0x3e85bb=_0x2f4e3f[_0x1de90d(0x28a)];_0x36c482[_0x1de90d(0x41a)](_0x3e85bb);}}else{if(_0x1de90d(0x3db)===_0x1de90d(0x3be)){const _0x52ac7b=_0x2ff28b[_0x1de90d(0x36b)];_0x34d58e[_0x1de90d(0x36b)]=_0x1dac32['round'](_0x27ae8f['_displayY']);const _0x2a9d8c=_0x1d447e[_0x1de90d(0x343)]();return _0x217886['_displayY']=_0x52ac7b,_0x2a9d8c;}else return!![];}},Game_Map[_0x291ba2(0x371)][_0x291ba2(0x288)]=function(_0xfff92c,_0x5914fd){const _0xac4f18=_0x291ba2,_0x990e14=this[_0xac4f18(0x41b)](_0xfff92c,_0x5914fd),_0x12fd36=this[_0xac4f18(0x239)](_0xfff92c,_0x5914fd);if(this[_0xac4f18(0x3f2)]===undefined)this[_0xac4f18(0x398)]();if(this[_0xac4f18(0x3f2)][_0xac4f18(0x2ec)][_0xac4f18(0x387)](_0x990e14))return!![];if(this['_smartJump'][_0xac4f18(0x3e7)][_0xac4f18(0x387)](_0x12fd36))return!![];const _0x9b1f65=this['eventsXy'](_0xfff92c,_0x5914fd);for(const _0x5eb485 of _0x9b1f65){if(!_0x5eb485)continue;if(_0x5eb485['_erased'])continue;if(_0x5eb485[_0xac4f18(0x18e)]())return!![];}return![];},Game_Map[_0x291ba2(0x371)][_0x291ba2(0x40b)]=function(_0x2029fa,_0x38d6cf){const _0x2065b2=_0x291ba2,_0x19883a=this[_0x2065b2(0x41b)](_0x2029fa,_0x38d6cf),_0x3644e4=this[_0x2065b2(0x239)](_0x2029fa,_0x38d6cf);if(this[_0x2065b2(0x3f2)]===undefined)this[_0x2065b2(0x398)]();if(this[_0x2065b2(0x3f2)]['NonLandableRegions'][_0x2065b2(0x387)](_0x19883a))return!![];if(this['_smartJump'][_0x2065b2(0x2da)][_0x2065b2(0x387)](_0x3644e4))return!![];const _0x573ae9=this[_0x2065b2(0x301)](_0x2029fa,_0x38d6cf);for(const _0x2a185c of _0x573ae9){if(!_0x2a185c)continue;if(_0x2a185c[_0x2065b2(0x1d9)])continue;if(_0x2a185c['notSmartJumpLandable']())return!![];}return![];},VisuMZ['MovementEffects']['Game_CharacterBase_initMembers']=Game_CharacterBase['prototype'][_0x291ba2(0x2cb)],Game_CharacterBase[_0x291ba2(0x371)][_0x291ba2(0x2cb)]=function(){const _0x57ee38=_0x291ba2;VisuMZ['MovementEffects'][_0x57ee38(0x1c0)]['call'](this),this[_0x57ee38(0x40e)]();},VisuMZ[_0x291ba2(0x193)]['Game_CharacterBase_increaseSteps']=Game_CharacterBase[_0x291ba2(0x371)][_0x291ba2(0x350)],Game_CharacterBase['prototype'][_0x291ba2(0x350)]=function(){const _0x32603a=_0x291ba2;VisuMZ[_0x32603a(0x193)]['Game_CharacterBase_increaseSteps'][_0x32603a(0x407)](this);if(this[_0x32603a(0x2ed)]())this[_0x32603a(0x47f)]();!this[_0x32603a(0x24a)]()&&this['canMakeFootstepSounds']()&&this['playFootstepSound']();},VisuMZ[_0x291ba2(0x193)]['Game_CharacterBase_updatePattern']=Game_CharacterBase[_0x291ba2(0x371)][_0x291ba2(0x19b)],Game_CharacterBase[_0x291ba2(0x371)][_0x291ba2(0x19b)]=function(){const _0x2c665f=_0x291ba2;VisuMZ['MovementEffects'][_0x2c665f(0x200)]['call'](this);if(this[_0x2c665f(0x3ef)]>0x0)return;this['meetFootprintFrames']()&&this['canMakeFootprints']()&&this['createFootprint']();if(this[_0x2c665f(0x33c)]()&&this[_0x2c665f(0x39a)]()){if(_0x2c665f(0x2f2)!==_0x2c665f(0x325))this[_0x2c665f(0x3ca)]();else{const _0x175f9b=this[_0x2c665f(0x3f2)][_0x2c665f(0x1d3)][_0x2c665f(0x2cd)](_0x54da16);return _0x175f9b<=0x0;}}},Game_CharacterBase['prototype'][_0x291ba2(0x2ed)]=function(){const _0x108d4d=_0x291ba2;if(this[_0x108d4d(0x276)]===Game_Follower&&!this[_0x108d4d(0x473)]())return![];if(this[_0x108d4d(0x276)]===Game_Player&&this[_0x108d4d(0x23e)]())return![];if(!this[_0x108d4d(0x1b7)]())return![];if(this['isTransparent']())return![];return $gameMap[_0x108d4d(0x3d4)]();},Game_CharacterBase[_0x291ba2(0x371)][_0x291ba2(0x47f)]=function(){const _0x5298ad=_0x291ba2,_0x437835=SceneManager['_scene'][_0x5298ad(0x256)];if(_0x437835)_0x437835[_0x5298ad(0x2ba)](this);},Game_CharacterBase['prototype'][_0x291ba2(0x24a)]=function(){const _0x37569c=_0x291ba2;return VisuMZ[_0x37569c(0x193)][_0x37569c(0x2e0)][_0x37569c(0x1cd)][_0x37569c(0x460)];},VisuMZ[_0x291ba2(0x193)][_0x291ba2(0x28f)]=Game_CharacterBase[_0x291ba2(0x371)][_0x291ba2(0x26a)],Game_CharacterBase['prototype'][_0x291ba2(0x26a)]=function(){const _0x3ef8c8=_0x291ba2;let _0x40a3f1=VisuMZ[_0x3ef8c8(0x193)][_0x3ef8c8(0x28f)][_0x3ef8c8(0x407)](this);if(this['isMoving']()){if('TjcMW'!==_0x3ef8c8(0x303)){const _0x104542=VisuMZ[_0x3ef8c8(0x193)][_0x3ef8c8(0x2e0)][_0x3ef8c8(0x1cd)][_0x3ef8c8(0x447)]??1.5;_0x40a3f1=Math[_0x3ef8c8(0x211)](_0x40a3f1/Math[_0x3ef8c8(0x1b4)](_0x104542,0x1));if(this[_0x3ef8c8(0x1b7)]()){const _0x2b78d8=VisuMZ[_0x3ef8c8(0x193)]['Settings'][_0x3ef8c8(0x1cd)][_0x3ef8c8(0x391)]??1.5;_0x40a3f1=Math['ceil'](_0x40a3f1/Math[_0x3ef8c8(0x1b4)](_0x2b78d8,0x1));}}else{if(this[_0x3ef8c8(0x206)]===_0x478ee4)this[_0x3ef8c8(0x190)]();return this[_0x3ef8c8(0x206)];}}return _0x40a3f1;},Game_CharacterBase['prototype'][_0x291ba2(0x33c)]=function(){const _0x5e38b6=_0x291ba2;if(!this[_0x5e38b6(0x24a)]())return![];if(this[_0x5e38b6(0x417)]()&&!this[_0x5e38b6(0x477)]())return![];if(this[_0x5e38b6(0x18c)]())return![];if(this[_0x5e38b6(0x456)]())return![];const _0x278a7e=this[_0x5e38b6(0x271)]()[_0x5e38b6(0x44f)]??[];if(_0x278a7e['length']<=0x0)return!![];return _0x278a7e[_0x5e38b6(0x387)](this[_0x5e38b6(0x372)]());},Game_CharacterBase[_0x291ba2(0x371)][_0x291ba2(0x39a)]=function(){const _0xa823e9=_0x291ba2;if(this[_0xa823e9(0x276)]===Game_Follower&&!this[_0xa823e9(0x473)]())return![];if(this['constructor']===Game_Player&&this[_0xa823e9(0x23e)]())return![];if(this[_0xa823e9(0x276)]===Game_Follower&&$gamePlayer['isInVehicle']())return![];if(this['isTransparent']())return![];return this['footstepsData']()['enabled']&&$gameMap[_0xa823e9(0x39a)]();},Game_Vehicle[_0x291ba2(0x371)][_0x291ba2(0x39a)]=function(){return![];},Game_CharacterBase[_0x291ba2(0x371)][_0x291ba2(0x3ca)]=function(){const _0x4692b6=_0x291ba2;SoundManager[_0x4692b6(0x41d)](this);},Game_CharacterBase['prototype']['footstepsData']=function(){return{'enabled':!![],'volumeRate':0x1,'pitchRate':0x1};},Game_CharacterBase[_0x291ba2(0x371)][_0x291ba2(0x433)]=function(){const _0x4d8f40=_0x291ba2;if(this['hasStepAnime']()&&!this[_0x4d8f40(0x477)]())return![];if(this['isJumping']())return![];if(this[_0x4d8f40(0x456)]())return![];const _0x57cd1d='dir%1'['format'](this[_0x4d8f40(0x415)]),_0x145169=_0x4d8f40(0x26e)[_0x4d8f40(0x44c)](this[_0x4d8f40(0x372)]()),_0x4217c7=this[_0x4d8f40(0x24b)]();if(_0x4217c7[_0x57cd1d]){if(_0x4d8f40(0x3f9)===_0x4d8f40(0x3c1))return this[_0x4d8f40(0x3d5)]();else{if(_0x4217c7[_0x57cd1d][_0x145169]){if(_0x4217c7[_0x57cd1d][_0x145169]['filename']!=='')return!![];if(_0x4217c7[_0x57cd1d][_0x145169][_0x4d8f40(0x360)]>0x0)return!![];if(_0x4217c7[_0x57cd1d][_0x145169]['height']>0x0)return!![];}}}return![];},Game_CharacterBase[_0x291ba2(0x371)][_0x291ba2(0x486)]=function(){const _0xaa3fd9=_0x291ba2;if(this[_0xaa3fd9(0x276)]===Game_Follower&&!this[_0xaa3fd9(0x473)]())return![];if(this[_0xaa3fd9(0x276)]===Game_Player&&this[_0xaa3fd9(0x23e)]())return![];if(this[_0xaa3fd9(0x3b8)]())return![];const _0x1a98ed=this['x'],_0x177044=this['y'];return this['footprintsData']()[_0xaa3fd9(0x202)]&&$gameMap[_0xaa3fd9(0x486)](_0x1a98ed,_0x177044);},Game_CharacterBase[_0x291ba2(0x371)][_0x291ba2(0x24b)]=function(){const _0x25fe74=_0x291ba2,_0x508939=VisuMZ['MovementEffects'][_0x25fe74(0x2e0)][_0x25fe74(0x442)];return{'enabled':!![],'dir1':_0x508939[_0x25fe74(0x19e)],'dir2':_0x508939['dir2'],'dir3':_0x508939[_0x25fe74(0x483)],'dir4':_0x508939[_0x25fe74(0x374)],'dir6':_0x508939[_0x25fe74(0x488)],'dir7':_0x508939[_0x25fe74(0x242)],'dir8':_0x508939[_0x25fe74(0x3f7)],'dir9':_0x508939[_0x25fe74(0x3b3)]};},Game_CharacterBase['prototype'][_0x291ba2(0x468)]=function(){const _0x41883b=_0x291ba2,_0x186ba7=SceneManager[_0x41883b(0x412)]['_spriteset'];if(_0x186ba7)_0x186ba7[_0x41883b(0x1a4)](this);},Game_CharacterBase[_0x291ba2(0x371)]['initMovementEffectsMotionTrails']=function(){const _0x19dd3e=_0x291ba2;this[_0x19dd3e(0x27b)]={'enabled':![],'delay':0x4,'duration':0x1e,'hue':0x0,'opacityStart':0x80,'tone':[0x0,0x0,0x0,0x0]};},Game_CharacterBase[_0x291ba2(0x371)][_0x291ba2(0x397)]=function(){const _0x1b1b8f=_0x291ba2;if(this[_0x1b1b8f(0x27b)]===undefined)this['initMovementEffectsMotionTrails']();return this[_0x1b1b8f(0x27b)];},Game_CharacterBase['prototype']['enableMotionTrails']=function(_0x5b7af9,_0x57f332){const _0x3ac3ec=_0x291ba2;this[_0x3ac3ec(0x397)]()['enabled']=_0x5b7af9;if(!SceneManager[_0x3ac3ec(0x23f)]())return;if(!_0x5b7af9)return;if(!_0x57f332)return;const _0x9f2121=SceneManager[_0x3ac3ec(0x412)][_0x3ac3ec(0x256)];if(_0x9f2121){const _0x488bbf=_0x9f2121['findTargetSprite'](this);_0x488bbf&&_0x488bbf[_0x3ac3ec(0x253)]();}},Game_CharacterBase[_0x291ba2(0x371)][_0x291ba2(0x42f)]=function(_0x1dcba6,_0x47222b){const _0x117079=_0x291ba2,_0x44e023=this[_0x117079(0x397)]()[_0x117079(0x202)];this[_0x117079(0x27b)]=JsonEx[_0x117079(0x34f)](_0x1dcba6);if(_0x47222b)return;this['_motionTrailSettings']['enabled']=_0x44e023;},VisuMZ['MovementEffects'][_0x291ba2(0x365)]=Game_Player[_0x291ba2(0x371)][_0x291ba2(0x444)],Game_Player[_0x291ba2(0x371)]['moveByInput']=function(){const _0x555454=_0x291ba2;if(this[_0x555454(0x3bb)]())_0x555454(0x450)===_0x555454(0x450)?this[_0x555454(0x1b6)]():_0x4a90a6[_0x555454(0x253)]();else this[_0x555454(0x3bd)]()?_0x555454(0x28d)===_0x555454(0x28d)?this[_0x555454(0x32f)]():this[_0x555454(0x39c)][_0x555454(0x2ec)]=_0x1dc19a['$1'][_0x555454(0x3b6)](',')[_0x555454(0x269)](_0x3bd2db=>(_0x8b8449(_0x3bd2db)||0x0)['clamp'](0x0,0xff)):(VisuMZ['MovementEffects'][_0x555454(0x365)][_0x555454(0x407)](this),this['updateSmartMovementCooldowns']());},Game_Player['prototype']['updateSmartMovementCooldowns']=function(){const _0xb76e4b=_0x291ba2;this[_0xb76e4b(0x46a)](),this[_0xb76e4b(0x2c8)](),this[_0xb76e4b(0x3b5)]();},VisuMZ[_0x291ba2(0x193)][_0x291ba2(0x257)]=Game_Player[_0x291ba2(0x371)]['updateScroll'],Game_Player[_0x291ba2(0x371)]['updateScroll']=function(_0x3f0980,_0x43996e){const _0x177711=_0x291ba2;this['canSmoothScroll']()?this['updateScrollSmoothCamera'](_0x3f0980,_0x43996e):VisuMZ[_0x177711(0x193)][_0x177711(0x257)][_0x177711(0x407)](this,_0x3f0980,_0x43996e);},Game_Player[_0x291ba2(0x371)][_0x291ba2(0x47d)]=function(){const _0x302bd4=_0x291ba2;if(!$gameMap[_0x302bd4(0x1ed)]())return![];if($gameMap[_0x302bd4(0x443)]())return this[_0x302bd4(0x32d)]=!![],this[_0x302bd4(0x3a0)]=this['_realX'],this[_0x302bd4(0x25c)]=this[_0x302bd4(0x3f8)],![];if(this[_0x302bd4(0x32d)]){if(_0x302bd4(0x342)==='niBYi')return(this[_0x302bd4(0x3a0)]!==this[_0x302bd4(0x308)]||this['_lastSmoothScrollY']!==this[_0x302bd4(0x3f8)])&&(this['_wasEventScrolling']=![],this[_0x302bd4(0x3a0)]=this[_0x302bd4(0x308)],this[_0x302bd4(0x25c)]=this[_0x302bd4(0x3f8)]),!this['_wasEventScrolling'];else{const _0x208f9d=[0x50,0x51,0x52,0x53,0x54,0x55,0x56,0x57];_0x208f9d['push'](0x60,0x61,0x62,0x63,0x64,0x65,0x66,0x67),_0x208f9d[_0x302bd4(0x294)](0x70,0x71,0x72,0x73,0x74,0x75,0x76,0x77);for(let _0x1e03c6=0x0;_0x1e03c6<0x5;_0x1e03c6++){const _0x41131c=_0x4cce71[_0x302bd4(0x22f)](_0x1c22ec,_0x46e196,_0x1e03c6);if(_0x208f9d[_0x302bd4(0x387)](_0x41131c))return!![];}return![];}}return!![];},Game_Player['prototype'][_0x291ba2(0x334)]=function(_0x4d4463,_0x2a9105){const _0x1e5d6b=_0x291ba2,_0x55737b=this[_0x1e5d6b(0x31d)](),_0x428036=this['centerY'](),_0x1fdbaa=this[_0x1e5d6b(0x2a5)](),_0xd936ab=this['scrolledY'](),_0x51b20c=this[_0x1e5d6b(0x1b7)]()||this['isInAirship'](),_0x5c6bc1=$gameSystem[_0x1e5d6b(0x226)](![],_0x51b20c),_0x25bb4e=$gameSystem[_0x1e5d6b(0x226)](!![],_0x51b20c),_0x41078f=VisuMZ[_0x1e5d6b(0x193)][_0x1e5d6b(0x1e4)]();if(_0x1fdbaa<_0x55737b){if(_0x1e5d6b(0x3d8)==='sTMQV'){const _0x51e34b=_0x55737b-_0x1fdbaa,_0x1a359b=_0x5c6bc1*_0x41078f,_0x3c669b=_0x51e34b/(_0x1a359b||0.01);$gameMap[_0x1e5d6b(0x393)](_0x3c669b);}else{const _0x3185aa=this[_0x1e5d6b(0x41b)](_0x51c6b0,_0x5a007e),_0x5831a0=this[_0x1e5d6b(0x239)](_0x5df608,_0x57b7d8);if(this[_0x1e5d6b(0x39c)]===_0x1078df)this[_0x1e5d6b(0x1dd)]();if(this[_0x1e5d6b(0x39c)][_0x1e5d6b(0x2ec)][_0x1e5d6b(0x387)](_0x3185aa))return!![];if(this[_0x1e5d6b(0x39c)][_0x1e5d6b(0x3e7)][_0x1e5d6b(0x387)](_0x5831a0))return!![];return![];}}if(_0x1fdbaa>_0x55737b){if(_0x1e5d6b(0x29d)===_0x1e5d6b(0x29d)){const _0x2db576=_0x1fdbaa-_0x55737b,_0x28dc81=_0x5c6bc1*_0x41078f,_0x18bf6f=_0x2db576/(_0x28dc81||0.01);$gameMap[_0x1e5d6b(0x246)](_0x18bf6f);}else{if(this[_0x1e5d6b(0x46c)]===_0x37d8ba)this[_0x1e5d6b(0x366)]();return this[_0x1e5d6b(0x46c)];}}if(_0xd936ab>_0x428036){const _0x2c7907=_0xd936ab-_0x428036,_0x5e5049=_0x25bb4e*_0x41078f,_0x562eab=_0x2c7907/(_0x5e5049||0.01);$gameMap[_0x1e5d6b(0x378)](_0x562eab);}if(_0xd936ab<_0x428036){const _0x1de905=_0x428036-_0xd936ab,_0x5ca79a=_0x25bb4e*_0x41078f,_0x39ff8f=_0x1de905/(_0x5ca79a||0.01);$gameMap[_0x1e5d6b(0x2ab)](_0x39ff8f);}},VisuMZ['MovementEffects'][_0x291ba2(0x1e4)]=function(){return 1.0017453;},VisuMZ[_0x291ba2(0x193)][_0x291ba2(0x2ae)]=Game_Interpreter[_0x291ba2(0x371)][_0x291ba2(0x3fc)],Game_Interpreter[_0x291ba2(0x371)][_0x291ba2(0x3fc)]=function(_0x3dd01b,_0x3be6ba,_0x446b1d){const _0x113a04=_0x291ba2;if(_0x3dd01b===0x5){if(_0x113a04(0x38f)!==_0x113a04(0x38f))this['updateScrollLinkedPosition']();else{character=this[_0x113a04(0x3af)](_0x3be6ba);if(character){if(_0x113a04(0x1fa)===_0x113a04(0x327))this['initRegionTerrainTagFootprints'](),this[_0x113a04(0x2d2)](),this[_0x113a04(0x439)]();else{if(_0x446b1d===0x3){const _0xf48e9d=$gameMap[_0x113a04(0x1db)];$gameMap['_displayX']=Math[_0x113a04(0x23a)]($gameMap[_0x113a04(0x1db)]);const _0x1bbf52=character[_0x113a04(0x43a)]();return $gameMap[_0x113a04(0x1db)]=_0xf48e9d,_0x1bbf52;}else{if(_0x446b1d===0x4){if(_0x113a04(0x2d4)!==_0x113a04(0x381)){const _0x1d6cb8=$gameMap[_0x113a04(0x36b)];$gameMap[_0x113a04(0x36b)]=Math['round']($gameMap[_0x113a04(0x36b)]);const _0x53507f=character['screenY']();return $gameMap[_0x113a04(0x36b)]=_0x1d6cb8,_0x53507f;}else{const _0x4bcc97=_0x1a59a1[_0x113a04(0x2fb)];_0x33ca7a[_0x113a04(0x2a0)]=_0x3f386c[_0x113a04(0x2a0)]*(_0x4bcc97-0x1)/_0x4bcc97,_0x315ed5[_0x113a04(0x2fb)]--;}}}}}}}return VisuMZ[_0x113a04(0x193)]['Game_Interpreter_gameDataOperand'][_0x113a04(0x407)](this,_0x3dd01b,_0x3be6ba,_0x446b1d);},VisuMZ[_0x291ba2(0x193)]['Game_CharacterBase_updateAnimationCount']=Game_CharacterBase[_0x291ba2(0x371)][_0x291ba2(0x31b)],Game_CharacterBase[_0x291ba2(0x371)][_0x291ba2(0x31b)]=function(){const _0x283d9a=_0x291ba2;VisuMZ[_0x283d9a(0x193)][_0x283d9a(0x37f)][_0x283d9a(0x407)](this),this[_0x283d9a(0x3c8)]&&this['_footstepCooldownDuration']--;},Game_Player[_0x291ba2(0x371)][_0x291ba2(0x3ca)]=function(){const _0x23900b=_0x291ba2;Game_Character[_0x23900b(0x371)][_0x23900b(0x3ca)][_0x23900b(0x407)](this),this[_0x23900b(0x3c8)]=0x3c;},Game_Player[_0x291ba2(0x371)][_0x291ba2(0x271)]=function(){const _0x536d43=_0x291ba2;return $gameParty[_0x536d43(0x22d)]()?$gameParty['leader']()['footstepsData']():Game_Character[_0x536d43(0x371)][_0x536d43(0x271)][_0x536d43(0x407)](this);},Game_Player[_0x291ba2(0x371)][_0x291ba2(0x24b)]=function(){const _0x23be45=_0x291ba2;return $gameParty[_0x23be45(0x22d)]()?$gameParty[_0x23be45(0x22d)]()[_0x23be45(0x24b)]():Game_Character[_0x23be45(0x371)]['footprintsData'][_0x23be45(0x407)](this);},Game_Player['prototype'][_0x291ba2(0x401)]=function(){const _0x24c583=_0x291ba2;return this['isSmartRushing']()||this[_0x24c583(0x3bd)]();},Game_Player['prototype'][_0x291ba2(0x1e7)]=function(){const _0x3346c7=_0x291ba2;if(this[_0x3346c7(0x18c)]())return!![];if(this[_0x3346c7(0x23e)]())return!![];if(this[_0x3346c7(0x456)]())return!![];return![];},Game_Player[_0x291ba2(0x371)]['straightenFacedDirection']=function(_0x40c1f0){const _0x2d2526=_0x291ba2;if(!_0x40c1f0)return;if(_0x40c1f0['allowDiagonal'])return;const _0x23d135=this[_0x2d2526(0x354)](_0x40c1f0);this[_0x2d2526(0x1af)](_0x23d135);},Game_Player[_0x291ba2(0x371)][_0x291ba2(0x354)]=function(_0x11d4e2){const _0x14dd43=_0x291ba2;if(!_0x11d4e2)return this[_0x14dd43(0x3f6)]();if(_0x11d4e2['allowDiagonal'])return this[_0x14dd43(0x3f6)]();const _0x553f2f=this[_0x14dd43(0x493)](this[_0x14dd43(0x3f6)](),_0x11d4e2);return _0x553f2f;},Game_Player[_0x291ba2(0x371)][_0x291ba2(0x493)]=function(_0x57f1de,_0x5bdb0f){const _0x3dcc76=_0x291ba2;if(!_0x5bdb0f)return _0x57f1de;if(_0x5bdb0f[_0x3dcc76(0x3cd)])return _0x57f1de;if(_0x57f1de===0x1)return 0x4;if(_0x57f1de===0x3)return 0x6;if(_0x57f1de===0x7)return 0x4;if(_0x57f1de===0x9)return 0x6;return _0x57f1de;},Game_Player[_0x291ba2(0x302)]=VisuMZ[_0x291ba2(0x193)][_0x291ba2(0x2e0)][_0x291ba2(0x356)][_0x291ba2(0x453)]||0x0,Game_Player[_0x291ba2(0x285)]=VisuMZ[_0x291ba2(0x193)][_0x291ba2(0x2e0)][_0x291ba2(0x356)][_0x291ba2(0x201)]||0x1,Game_Player[_0x291ba2(0x42b)]=VisuMZ[_0x291ba2(0x193)][_0x291ba2(0x2e0)][_0x291ba2(0x356)][_0x291ba2(0x28a)]||![],Game_Player[_0x291ba2(0x449)]=VisuMZ[_0x291ba2(0x193)]['Settings'][_0x291ba2(0x356)]['ShakePowerRate']||0x1,Game_Player['SMART_RUSH_SHAKE_SPEED_RATE']=VisuMZ[_0x291ba2(0x193)][_0x291ba2(0x2e0)][_0x291ba2(0x356)][_0x291ba2(0x3e3)]||0x1,Game_Player[_0x291ba2(0x2a1)]=VisuMZ[_0x291ba2(0x193)]['Settings']['SmartRush'][_0x291ba2(0x353)]||0x1,Game_Player[_0x291ba2(0x371)][_0x291ba2(0x3ac)]=function(_0x21388a,_0x404591,_0xb4becf,_0x1a3705,_0x508ac7){const _0x18aff9=_0x291ba2;if(!this['canSmartRush']())return![];const _0x2a02f1=VisuMZ[_0x18aff9(0x193)][_0x18aff9(0x2e0)][_0x18aff9(0x356)];return this[_0x18aff9(0x47a)](_0x2a02f1),this['_smartRushMode']=_0x21388a,this[_0x18aff9(0x1ef)]=_0x404591||0x1,this[_0x18aff9(0x1ae)]=(_0xb4becf||[])[_0x18aff9(0x20b)](),this[_0x18aff9(0x2aa)]=_0x1a3705||1.5,this[_0x18aff9(0x377)]=JsonEx[_0x18aff9(0x34f)](_0x508ac7),this['setSmartRushSwitch'](!![]),!![];},Game_Player[_0x291ba2(0x371)][_0x291ba2(0x38b)]=function(){const _0x5a74cc=_0x291ba2;if(!$gameMap[_0x5a74cc(0x312)]())return![];if(this[_0x5a74cc(0x1ef)])return![];if(this[_0x5a74cc(0x401)]())return![];if(this['isSmartMoveNonViableState']())return![];if(this[_0x5a74cc(0x3b8)]())return![];if(this['areFollowersGathering']())return![];const _0x1b69f6=VisuMZ[_0x5a74cc(0x193)][_0x5a74cc(0x2e0)][_0x5a74cc(0x356)],_0x253c3e=this[_0x5a74cc(0x354)](_0x1b69f6);return this['canPass'](this['x'],this['y'],_0x253c3e);},Game_Player['prototype'][_0x291ba2(0x3bb)]=function(){const _0x4007bf=_0x291ba2;return this[_0x4007bf(0x344)]!==undefined&&this['_smartRushMode']>0x0;},VisuMZ[_0x291ba2(0x193)][_0x291ba2(0x42d)]=Game_Player[_0x291ba2(0x371)]['isDashing'],Game_Player['prototype'][_0x291ba2(0x1b7)]=function(){const _0x2e327c=_0x291ba2;if(this[_0x2e327c(0x3bb)]())return!![];return VisuMZ[_0x2e327c(0x193)][_0x2e327c(0x42d)][_0x2e327c(0x407)](this);},VisuMZ['MovementEffects'][_0x291ba2(0x1cb)]=Game_CharacterBase['prototype'][_0x291ba2(0x26b)],Game_CharacterBase[_0x291ba2(0x371)][_0x291ba2(0x26b)]=function(){const _0x2fa5d9=_0x291ba2;if(!this[_0x2fa5d9(0x477)]())return VisuMZ[_0x2fa5d9(0x193)]['Game_CharacterBase_realMoveSpeed'][_0x2fa5d9(0x407)](this);let _0x2eff13=VisuMZ['MovementEffects'][_0x2fa5d9(0x1cb)]['call'](this);_0x2eff13+=$gameSystem['getDirMoveSpeedMod'](this[_0x2fa5d9(0x415)])*0x1;if(this===$gamePlayer&&this[_0x2fa5d9(0x3bb)]()){if('lwLkP'!==_0x2fa5d9(0x3c6)){_0x2e40cf['MovementEffects'][_0x2fa5d9(0x200)][_0x2fa5d9(0x407)](this);if(this[_0x2fa5d9(0x3ef)]>0x0)return;this['meetFootprintFrames']()&&this[_0x2fa5d9(0x486)]()&&this[_0x2fa5d9(0x468)](),this['meetFootstepFrames']()&&this[_0x2fa5d9(0x39a)]()&&this[_0x2fa5d9(0x3ca)]();}else _0x2eff13*=this[_0x2fa5d9(0x2aa)]||1.5;}return Math[_0x2fa5d9(0x1b4)](0x1,_0x2eff13);},Game_Player[_0x291ba2(0x371)][_0x291ba2(0x1b6)]=function(){const _0x5c1621=_0x291ba2;if(this[_0x5c1621(0x477)]())return;if(this['isJumping']())return;this[_0x5c1621(0x38c)](this[_0x5c1621(0x3f6)]());if(this[_0x5c1621(0x331)]()){if(_0x5c1621(0x320)===_0x5c1621(0x229)){const _0x351772=_0x46645f[_0x5c1621(0x3ed)][_0x5c1621(0x3bf)],_0x99bbe7=_0x5c1621(0x2bc);this[_0x5c1621(0x268)](_0x351772,_0x99bbe7);}else this['_smartRushMode']=this[_0x5c1621(0x344)]||0x1,this[_0x5c1621(0x344)]--;}else{if(_0x5c1621(0x293)===_0x5c1621(0x293))this['isSmartRushCrashShake']()&&($gameScreen[_0x5c1621(0x1ff)](this[_0x5c1621(0x344)]),this[_0x5c1621(0x3a2)]()),this[_0x5c1621(0x344)]=0x0;else{const _0x5ac71f=_0x588306['findTargetSprite'](_0x228690);if(_0x5ac71f){const _0x471db3=_0x31f8fd[_0x5c1621(0x410)],_0x121cae=_0x40826e['SMART_BLINK_FILTER_ANGLE_OFFSET'];_0x5ac71f[_0x5c1621(0x26d)](_0x471db3,_0x121cae);}}}this[_0x5c1621(0x456)]()&&(this['_smartRushMode']=0x0),this[_0x5c1621(0x344)]<=0x0&&setTimeout(this[_0x5c1621(0x22c)][_0x5c1621(0x1c8)](this,![]),0x32);},Game_Player[_0x291ba2(0x371)][_0x291ba2(0x1dc)]=function(){const _0x13cca6=_0x291ba2;this['_smartRushMode']=0x0,setTimeout(this['setSmartRushSwitch'][_0x13cca6(0x1c8)](this,![]),0x32);},Game_Screen[_0x291ba2(0x371)][_0x291ba2(0x1ff)]=function(_0x838600){const _0x1b2427=_0x291ba2,_0xcdc5f9=(_0x838600*Game_Player[_0x1b2427(0x449)])[_0x1b2427(0x29c)](0x1,0x9),_0x5b6abc=(_0x838600*Game_Player[_0x1b2427(0x1ea)])[_0x1b2427(0x29c)](0x1,0x9);this[_0x1b2427(0x45b)](_0xcdc5f9,_0x5b6abc,Game_Player[_0x1b2427(0x2a1)]);},Game_Player[_0x291ba2(0x371)][_0x291ba2(0x3a2)]=function(){const _0x1fd7f0=_0x291ba2,_0x272f77=this[_0x1fd7f0(0x3f6)](),_0x32900d=((this[_0x1fd7f0(0x2aa)]-0x1)*0x2)['clamp'](0.25,0.85),_0xe00c4b=((this[_0x1fd7f0(0x2aa)]-0x1)*1.5)[_0x1fd7f0(0x29c)](0.15,0.3);if([0x1,0x4,0x7][_0x1fd7f0(0x387)](_0x272f77))this[_0x1fd7f0(0x308)]-=_0x32900d;if([0x3,0x6,0x9]['includes'](_0x272f77))this[_0x1fd7f0(0x308)]+=_0x32900d;if([0x7,0x8,0x9]['includes'](_0x272f77))this['_realY']-=_0x32900d;if([0x1,0x2,0x3][_0x1fd7f0(0x387)](_0x272f77))this['_realY']+=_0xe00c4b;},Game_Player[_0x291ba2(0x371)][_0x291ba2(0x20a)]=function(){const _0x39fd4e=_0x291ba2;if(!Game_Player[_0x39fd4e(0x42b)])return![];const _0x14e07d=this[_0x39fd4e(0x3f6)](),_0x219e50=this['x'],_0x4bde5e=this['y'];return $gameMap[_0x39fd4e(0x452)](_0x219e50,_0x4bde5e,_0x14e07d);},Game_Player[_0x291ba2(0x371)][_0x291ba2(0x46a)]=function(){const _0x5997d9=_0x291ba2;this[_0x5997d9(0x1ef)]&&(_0x5997d9(0x43c)!==_0x5997d9(0x43c)?_0x411bea(this[_0x5997d9(0x22c)]['bind'](this,![]),0x32):this[_0x5997d9(0x1ef)]--);},Game_Player[_0x291ba2(0x371)]['setSmartRushSwitch']=function(_0x219e5b){const _0x542f02=_0x291ba2;this[_0x542f02(0x1ae)]=this[_0x542f02(0x1ae)]||[];for(const _0xa7404d of this[_0x542f02(0x1ae)]){$gameSwitches[_0x542f02(0x2c4)](_0xa7404d,_0x219e5b);}!_0x219e5b&&(this['_smartRushMode']=0x0);},VisuMZ[_0x291ba2(0x193)][_0x291ba2(0x42c)]=Game_Player[_0x291ba2(0x371)][_0x291ba2(0x34a)],Game_Player[_0x291ba2(0x371)]['reserveTransfer']=function(_0x4fa419,_0x246a35,_0x2f8a40,_0x19158d,_0xb8a896){const _0x5b1a92=_0x291ba2;VisuMZ[_0x5b1a92(0x193)][_0x5b1a92(0x42c)]['call'](this,_0x4fa419,_0x246a35,_0x2f8a40,_0x19158d,_0xb8a896),this['endSmartRush']();},Game_Player[_0x291ba2(0x410)]=VisuMZ[_0x291ba2(0x193)]['Settings'][_0x291ba2(0x194)][_0x291ba2(0x201)],Game_Player[_0x291ba2(0x1f2)]=VisuMZ['MovementEffects']['Settings'][_0x291ba2(0x194)][_0x291ba2(0x453)],Game_Player[_0x291ba2(0x329)]=VisuMZ[_0x291ba2(0x193)][_0x291ba2(0x2e0)]['SmartBlink'][_0x291ba2(0x44a)]??![],Game_Player[_0x291ba2(0x371)][_0x291ba2(0x390)]=function(_0x216f8c,_0x46b95f,_0x786031,_0x4ef773){const _0x53c3ba=_0x291ba2;_0x786031=_0x786031||{'NonLandableRegions':[],'NonLandableTerrainTags':[],'NonPassableRegions':[],'NonPassableTerrainTags':[]},this[_0x53c3ba(0x282)]=JsonEx[_0x53c3ba(0x34f)](_0x786031),_0x216f8c=this['measureSmartBlinkDistance'](_0x216f8c||0x1);if(!this[_0x53c3ba(0x466)](_0x216f8c))return![];const _0x187eed=VisuMZ[_0x53c3ba(0x193)]['Settings'][_0x53c3ba(0x194)];return this[_0x53c3ba(0x47a)](_0x187eed),this[_0x53c3ba(0x3c0)]=_0x216f8c||0x1,this[_0x53c3ba(0x280)]=_0x46b95f||0x1,this[_0x53c3ba(0x402)]=JsonEx[_0x53c3ba(0x34f)](_0x4ef773),this[_0x53c3ba(0x46e)](_0x216f8c),!![];},Game_Player[_0x291ba2(0x371)][_0x291ba2(0x24c)]=function(_0xc9edff){const _0x3274eb=_0x291ba2,_0x33117e=this[_0x3274eb(0x282)],_0x422801=this['direction'](),_0x1bd38a=VisuMZ['MovementEffects'][_0x3274eb(0x2e0)][_0x3274eb(0x194)];this[_0x3274eb(0x47a)](_0x1bd38a);const _0x1d9098=this[_0x3274eb(0x3f6)]();let _0x449273=0x0,_0x1e6273=this['x'],_0xe8afb8=this['y'],_0x2805d4=0x0,_0x3e09ae=0x0;if([0x1,0x4,0x7]['includes'](_0x1d9098))_0x2805d4=-0x1;if([0x3,0x6,0x9][_0x3274eb(0x387)](_0x1d9098))_0x2805d4=0x1;if([0x7,0x8,0x9][_0x3274eb(0x387)](_0x1d9098))_0x3e09ae=-0x1;if([0x1,0x2,0x3][_0x3274eb(0x387)](_0x1d9098))_0x3e09ae=0x1;for(let _0x53a38b=0x1;_0x53a38b<=_0xc9edff;_0x53a38b++){_0x1e6273+=_0x2805d4,_0xe8afb8+=_0x3e09ae;if(this[_0x3274eb(0x1d2)](_0x1e6273,_0xe8afb8))break;if(this['isTileSmartBlinkCompatible'](_0x1e6273,_0xe8afb8)){_0x449273=_0x53a38b;continue;}const _0x1f48e7=$gameMap[_0x3274eb(0x41b)](_0x1e6273,_0xe8afb8),_0x4a36fb=$gameMap['terrainTag'](_0x1e6273,_0xe8afb8);if(_0x33117e['NonPassableRegions']['includes'](_0x1f48e7))break;if(_0x33117e['NonPassableTerrainTags']['includes'](_0x4a36fb))break;if($gameMap[_0x3274eb(0x221)](_0x1e6273,_0xe8afb8))break;if(_0x33117e[_0x3274eb(0x3ee)][_0x3274eb(0x387)](_0x1f48e7))continue;if(_0x33117e[_0x3274eb(0x2da)][_0x3274eb(0x387)](_0x4a36fb))continue;if($gameMap['isTileSmartBlinkNonLandable'](_0x1e6273,_0xe8afb8))continue;if(!$gameMap[_0x3274eb(0x333)](_0x1e6273,_0xe8afb8))continue;if(this[_0x3274eb(0x37a)](_0x1e6273,_0xe8afb8))continue;if(!$gameMap[_0x3274eb(0x347)](_0x1e6273,_0xe8afb8))continue;if(!Game_Player[_0x3274eb(0x329)]){if(!$gameMap[_0x3274eb(0x41f)](this['x'],this['y'])&&$gameMap[_0x3274eb(0x41f)](_0x1e6273,_0xe8afb8))continue;}_0x449273=_0x53a38b;}return this[_0x3274eb(0x1af)](_0x422801),_0x449273;},Game_Player['prototype']['isTileSmartBlinkBreakable']=function(_0xe1f29a,_0x3f2cac){return![];},Game_Player['prototype'][_0x291ba2(0x35e)]=function(_0x19aa74,_0x5a0af6){return![];},Game_Player[_0x291ba2(0x371)][_0x291ba2(0x466)]=function(_0x401cd8){const _0x5dd79d=_0x291ba2;if(!$gameMap[_0x5dd79d(0x411)]())return![];if(this[_0x5dd79d(0x280)])return![];if(this[_0x5dd79d(0x401)]())return![];if(this[_0x5dd79d(0x1e7)]())return![];if(this[_0x5dd79d(0x3b8)]())return![];if(this[_0x5dd79d(0x25b)]())return![];return _0x401cd8>=0x1;},Game_Player[_0x291ba2(0x371)][_0x291ba2(0x46e)]=function(){const _0x58966d=_0x291ba2,_0x420d3d=this[_0x58966d(0x3c0)],_0x2ac22b=this['direction']();let _0x1a2994=this['x'],_0x2de7f0=this['y'];if([0x1,0x4,0x7][_0x58966d(0x387)](_0x2ac22b))_0x1a2994+=-_0x420d3d;if([0x3,0x6,0x9][_0x58966d(0x387)](_0x2ac22b))_0x1a2994+=_0x420d3d;if([0x7,0x8,0x9][_0x58966d(0x387)](_0x2ac22b))_0x2de7f0+=-_0x420d3d;if([0x1,0x2,0x3][_0x58966d(0x387)](_0x2ac22b))_0x2de7f0+=_0x420d3d;this[_0x58966d(0x34d)]()[_0x58966d(0x202)]&&this[_0x58966d(0x3a1)]();Game_Character[_0x58966d(0x371)][_0x58966d(0x1bc)][_0x58966d(0x407)](this,_0x1a2994,_0x2de7f0),this[_0x58966d(0x405)][_0x58966d(0x2cc)](_0x1a2994,_0x2de7f0,this[_0x58966d(0x3f6)]());if(!$gameMap['isUsingSmoothCamera']())this[_0x58966d(0x228)](_0x1a2994,_0x2de7f0);this[_0x58966d(0x2e9)](),setTimeout(this[_0x58966d(0x1d8)]['bind'](this,[0x1,0x2]),0x32);},Game_Player[_0x291ba2(0x371)][_0x291ba2(0x2e9)]=function(){const _0x21d2d5=_0x291ba2,_0x5b3197=SceneManager['_scene']['_spriteset'];if(_0x5b3197){if(_0x21d2d5(0x3dd)!==_0x21d2d5(0x28b)){const _0x196dea=this[_0x21d2d5(0x388)]()[_0x21d2d5(0x244)](),_0x2ad359=[this][_0x21d2d5(0x1a3)](_0x196dea);for(const _0x1104ca of _0x2ad359){if('wSHTD'==='IRjAb')_0x243352[_0x21d2d5(0x33a)]['x']=0x0,_0x3394d6[_0x21d2d5(0x33a)]['y']=0x0,this[_0x21d2d5(0x2f9)]=0x0;else{const _0x581573=_0x5b3197[_0x21d2d5(0x1b3)](_0x1104ca);if(_0x581573){const _0x1166f8=Game_Player['SMART_BLINK_FILTER_DURATION'],_0x2a1879=Game_Player[_0x21d2d5(0x1f2)];_0x581573['startMotionBlurEffect'](_0x1166f8,_0x2a1879);}}}}else this[_0x21d2d5(0x2fe)]();}},Game_Player[_0x291ba2(0x371)]['updateSmartBlinkCooldown']=function(){const _0x3d2362=_0x291ba2;if(this[_0x3d2362(0x280)]){if(_0x3d2362(0x39b)!==_0x3d2362(0x39b)){const _0x43b652='FootprintsFilename',_0xa94bd7=_0x3327ae[_0x3d2362(0x2a3)](_0xb041c4[_0x43b652]);if(_0xa94bd7)for(const _0x5f4615 of _0xa94bd7){_0x5f4615[_0x3d2362(0x2a3)](_0x11683d[_0x43b652]);const _0x5a03a8=_0x33e217['$1'],_0x1b5d71=_0x48115b['$2'],_0x33abd7=_0x4aa0a4['$3'],_0x437650='dir%1'['format'](_0x271c02[_0x3d2362(0x3e2)](_0x5a03a8)),_0x5b0a46=_0x3d2362(0x26e)[_0x3d2362(0x44c)](_0x46fdb0(_0x1b5d71)||0x0);this['_footprintsData'][_0x437650][_0x5b0a46][_0x3d2362(0x43b)]=_0x40b6fa(_0x33abd7)[_0x3d2362(0x2b6)]();}}else this[_0x3d2362(0x280)]--;}},Game_Player[_0x291ba2(0x371)][_0x291ba2(0x3ba)]=function(_0x342cb6,_0x1eaa8a,_0x24879b,_0x7fceb6){const _0x20c5b6=_0x291ba2;_0x24879b=_0x24879b||{'NonLandableRegions':[],'NonLandableTerrainTags':[],'NonPassableRegions':[],'NonPassableTerrainTags':[]},this[_0x20c5b6(0x1c4)]=JsonEx[_0x20c5b6(0x34f)](_0x24879b);if(!this[_0x20c5b6(0x340)]())return![];const _0x657f1c=VisuMZ[_0x20c5b6(0x193)][_0x20c5b6(0x2e0)]['SmartJump'];return this[_0x20c5b6(0x47a)](_0x657f1c),_0x342cb6=this['measureSmartJumpDistance'](_0x342cb6),this[_0x20c5b6(0x3d6)]=!![],this['_smartJumpCooldown']=_0x1eaa8a||0x1,this['_smartJumpMotionTrailData']=JsonEx[_0x20c5b6(0x34f)](_0x7fceb6),this[_0x20c5b6(0x323)](_0x342cb6),!![];},Game_Player['prototype']['canSmartJump']=function(){const _0x2af4d8=_0x291ba2;if(!$gameMap['isSmartJumpEnabled']())return![];if(this['_smartJumpCooldown'])return![];if(this[_0x2af4d8(0x401)]())return![];if(this[_0x2af4d8(0x1e7)]())return![];if(this[_0x2af4d8(0x3b8)]())return![];if(this[_0x2af4d8(0x25b)]())return![];return!![];},Game_Player[_0x291ba2(0x371)]['isSmartJumping']=function(){const _0x260608=_0x291ba2;return this[_0x260608(0x3d6)];},Game_Player['prototype'][_0x291ba2(0x209)]=function(_0x2b91d9){const _0x574c81=_0x291ba2,_0x23247f=this[_0x574c81(0x1c4)],_0x4aeea7=this[_0x574c81(0x3f6)]();let _0x22e430=0x0,_0x53eb1f=this['x'],_0x5c4c1c=this['y'],_0x2ec630=0x0,_0x53463f=0x0;if([0x1,0x4,0x7][_0x574c81(0x387)](_0x4aeea7))_0x2ec630=-0x1;if([0x3,0x6,0x9][_0x574c81(0x387)](_0x4aeea7))_0x2ec630=0x1;if([0x7,0x8,0x9][_0x574c81(0x387)](_0x4aeea7))_0x53463f=-0x1;if([0x1,0x2,0x3][_0x574c81(0x387)](_0x4aeea7))_0x53463f=0x1;for(let _0x3d98ce=0x1;_0x3d98ce<=_0x2b91d9;_0x3d98ce++){_0x53eb1f+=_0x2ec630,_0x5c4c1c+=_0x53463f;if(this[_0x574c81(0x2e6)](_0x53eb1f,_0x5c4c1c)){if('TqLKi'!==_0x574c81(0x315))break;else{const _0x2146e4=_0x233083[_0x574c81(0x193)]['Settings']['Footsteps'][_0x574c81(0x391)]??1.5;_0x3ed53e=_0x507eac[_0x574c81(0x211)](_0x8ec881/_0x36be87[_0x574c81(0x1b4)](_0x2146e4,0x1));}}if(this[_0x574c81(0x2bb)](_0x53eb1f,_0x5c4c1c)){_0x22e430=_0x3d98ce;continue;}if($gameMap['isLadder'](_0x53eb1f,_0x5c4c1c))break;const _0x286584=$gameMap[_0x574c81(0x41b)](_0x53eb1f,_0x5c4c1c),_0x4376ef=$gameMap[_0x574c81(0x239)](_0x53eb1f,_0x5c4c1c);if(_0x23247f[_0x574c81(0x2ec)][_0x574c81(0x387)](_0x286584))break;if(_0x23247f[_0x574c81(0x3e7)][_0x574c81(0x387)](_0x4376ef))break;if($gameMap[_0x574c81(0x288)](_0x53eb1f,_0x5c4c1c))break;if(_0x23247f[_0x574c81(0x3ee)][_0x574c81(0x387)](_0x286584))continue;if(_0x23247f[_0x574c81(0x2da)][_0x574c81(0x387)](_0x4376ef))continue;if($gameMap[_0x574c81(0x40b)](_0x53eb1f,_0x5c4c1c))continue;if(!$gameMap[_0x574c81(0x333)](_0x53eb1f,_0x5c4c1c))continue;if(this['isCollidedWithCharacters'](_0x53eb1f,_0x5c4c1c))continue;if(!$gameMap[_0x574c81(0x347)](_0x53eb1f,_0x5c4c1c))continue;if(!$gameMap[_0x574c81(0x41e)](_0x53eb1f,_0x5c4c1c,_0x22e430))continue;_0x22e430=_0x3d98ce;}return _0x22e430;},Game_Player[_0x291ba2(0x371)][_0x291ba2(0x2e6)]=function(_0x467b63,_0x4dff8a){const _0x3a582d=_0x291ba2;if(!$gameMap[_0x3a582d(0x41f)](this['x'],this['y'])&&$gameMap[_0x3a582d(0x41f)](_0x467b63,_0x4dff8a))return!![];return![];},Game_Player[_0x291ba2(0x371)][_0x291ba2(0x2bb)]=function(_0x5e3fa9,_0x47ecee){const _0x55f701=_0x291ba2;if(!$gameMap[_0x55f701(0x41f)](this['x'],this['y'])&&$gameMap['isCeilingTile'](_0x5e3fa9,_0x47ecee)){if(_0x55f701(0x3bc)!==_0x55f701(0x3e5))return![];else for(const _0x7d5bcd of _0x4bb754){_0x7d5bcd[_0x55f701(0x2a3)](_0x3b4271[_0x55f701(0x335)]);const _0x4405b3=_0x957054(_0x28f45c['$1'])[_0x55f701(0x29c)](0x0,0xff),_0x4b52bb=_0x7afcc5(_0x2b1dc0['$2'])[_0x55f701(0x29c)](0x0,0xff);this[_0x55f701(0x457)]['opacity']['terrainTags'][_0x4405b3]=_0x4b52bb;}}return![];},Game_Player[_0x291ba2(0x371)][_0x291ba2(0x323)]=function(_0x2dcabf){const _0x2a0939=_0x291ba2,_0x2c37a1=this[_0x2a0939(0x3f6)]();let _0xb3df59=0x0,_0x41122d=0x0;if([0x1,0x4,0x7][_0x2a0939(0x387)](_0x2c37a1))_0xb3df59+=-_0x2dcabf;if([0x3,0x6,0x9][_0x2a0939(0x387)](_0x2c37a1))_0xb3df59+=_0x2dcabf;if([0x7,0x8,0x9][_0x2a0939(0x387)](_0x2c37a1))_0x41122d+=-_0x2dcabf;if([0x1,0x2,0x3][_0x2a0939(0x387)](_0x2c37a1))_0x41122d+=_0x2dcabf;_0x41122d=this[_0x2a0939(0x3da)](_0xb3df59,_0x41122d);const _0x2107f2=this[_0x2a0939(0x3f6)]();this[_0x2a0939(0x33b)](_0xb3df59,_0x41122d),this[_0x2a0939(0x1af)](_0x2107f2);},Game_Player[_0x291ba2(0x371)][_0x291ba2(0x3da)]=function(_0x5ae9a4,_0x3d612b){const _0x2ddb13=_0x291ba2;if(!$gameMap['isTileSmartHeightJumpRegion'](this['x'],this['y']))return _0x3d612b;if($gameMap[_0x2ddb13(0x196)](this['x'],this['y']))return _0x3d612b;let _0x14dc66=this['x']+_0x5ae9a4,_0x579f4c=this['y']+_0x3d612b;if(!$gameMap[_0x2ddb13(0x1d5)](_0x14dc66,_0x579f4c))return _0x3d612b;const _0x347a22=this[_0x2ddb13(0x41b)]();if($gameMap['isSmartJumpRegionLowestHeight'](_0x347a22))return _0x3d612b;let _0x2fb9b6=$gameMap[_0x2ddb13(0x41b)](_0x14dc66,_0x579f4c);if(!$gameMap['isSmartJumpRegionLowestHeight'](_0x2fb9b6))return _0x3d612b;const _0x302e25=this['direction']();if(_0x302e25===0x2)return _0x3d612b;if(_0x302e25===0x8)return _0x3d612b;_0x3d612b+=_0x347a22-_0x2fb9b6;for(;;){const _0x28b35a=_0x14dc66,_0x4df89f=this['y']+_0x3d612b,_0x20ebb6=$gameMap[_0x2ddb13(0x41b)](_0x28b35a,_0x4df89f);if($gameMap['isTileSmartHeightJumpRegion'](_0x28b35a,_0x4df89f)&&!$gameMap['isSmartJumpRegionLowestHeight'](_0x20ebb6)){_0x3d612b--;continue;}if($gameMap[_0x2ddb13(0x347)](_0x28b35a,_0x4df89f)){if(_0x2ddb13(0x289)!=='dyPhx')break;else this[_0x2ddb13(0x39c)][_0x2ddb13(0x2da)]=_0x191d2d['$1'][_0x2ddb13(0x3b6)](',')[_0x2ddb13(0x269)](_0x31e9d9=>(_0x3ab16a(_0x31e9d9)||0x0)[_0x2ddb13(0x29c)](0x0,0x7));}_0x3d612b--;if(_0x3d612b<=0x0)break;}return _0x3d612b;},Game_Player[_0x291ba2(0x371)][_0x291ba2(0x32f)]=function(){const _0x8c977a=_0x291ba2;if(this[_0x8c977a(0x18c)]())return;this[_0x8c977a(0x3d6)]=![];if(this[_0x8c977a(0x2ed)]()){if('VdfYq'===_0x8c977a(0x1c2)){let _0x8b8304=Math['max'](Math[_0x8c977a(0x211)](this[_0x8c977a(0x472)]/0x2),0x1);while(_0x8b8304--)this['createDustCloud']();}else{if(!_0x432439[_0x8c977a(0x23f)]())return;const _0x348add=_0x20dfc8[_0x8c977a(0x270)]();_0x348add[_0x8c977a(0x207)](_0x8c977a(0x390));}}if(this[_0x8c977a(0x39a)]())this[_0x8c977a(0x3ca)]();setTimeout(this[_0x8c977a(0x1d8)][_0x8c977a(0x1c8)](this,[0x1,0x2]),0x32);},Game_Player[_0x291ba2(0x371)]['updateSmartJumpCooldown']=function(){const _0x5cfcca=_0x291ba2;if(this[_0x5cfcca(0x230)]){if(_0x5cfcca(0x1e3)===_0x5cfcca(0x1e3))this[_0x5cfcca(0x230)]--;else{if(!_0x4e66af[_0x5cfcca(0x312)]())return![];if(this[_0x5cfcca(0x1ef)])return![];if(this[_0x5cfcca(0x401)]())return![];if(this[_0x5cfcca(0x1e7)]())return![];if(this['isTransparent']())return![];if(this['areFollowersGathering']())return![];const _0x4a5d35=_0x272947[_0x5cfcca(0x193)][_0x5cfcca(0x2e0)][_0x5cfcca(0x356)],_0x26c5b7=this[_0x5cfcca(0x354)](_0x4a5d35);return this[_0x5cfcca(0x2db)](this['x'],this['y'],_0x26c5b7);}}},Game_Player[_0x291ba2(0x371)][_0x291ba2(0x34d)]=function(){const _0x2eed4c=_0x291ba2;return this[_0x2eed4c(0x402)]||{'enabled':![]};},Game_Player['prototype'][_0x291ba2(0x324)]=function(){const _0x362a5e=_0x291ba2;return this[_0x362a5e(0x286)]||{'enabled':![]};},Game_Player[_0x291ba2(0x371)][_0x291ba2(0x3d5)]=function(){const _0x43e0c1=_0x291ba2;return this[_0x43e0c1(0x377)]||{'enabled':![]};},Game_Player[_0x291ba2(0x371)][_0x291ba2(0x397)]=function(){const _0x32f5e0=_0x291ba2;if(this[_0x32f5e0(0x3bb)]()&&this[_0x32f5e0(0x3d5)]()[_0x32f5e0(0x202)])return this[_0x32f5e0(0x3d5)]();else{if(this[_0x32f5e0(0x3bd)]()&&this[_0x32f5e0(0x324)]()[_0x32f5e0(0x202)])return this[_0x32f5e0(0x324)]();}return Game_Character[_0x32f5e0(0x371)][_0x32f5e0(0x397)][_0x32f5e0(0x407)](this);},Game_Player[_0x291ba2(0x371)][_0x291ba2(0x3a1)]=function(){const _0xe58dc9=_0x291ba2,_0x5a5585=SceneManager[_0xe58dc9(0x412)][_0xe58dc9(0x256)];if(!_0x5a5585)return;const _0x4086db=[this][_0xe58dc9(0x1a3)](this[_0xe58dc9(0x388)]()['data']());for(const _0x112175 of _0x4086db){if(!_0x112175)continue;oldData=JSON[_0xe58dc9(0x2fc)](JSON[_0xe58dc9(0x245)](_0x112175['_motionTrailSettings']||{'enabled':![]})),_0x112175[_0xe58dc9(0x42f)](this[_0xe58dc9(0x34d)]());const _0x54de5e=_0x5a5585[_0xe58dc9(0x1b3)](_0x112175);_0x54de5e&&(_0xe58dc9(0x2b3)===_0xe58dc9(0x215)?this[_0xe58dc9(0x3f2)][_0xe58dc9(0x3ee)]=_0x51ab3f['$1'][_0xe58dc9(0x3b6)](',')[_0xe58dc9(0x269)](_0x4b1b0c=>(_0x503e9e(_0x4b1b0c)||0x0)[_0xe58dc9(0x29c)](0x0,0xff)):_0x54de5e[_0xe58dc9(0x253)]()),_0x112175[_0xe58dc9(0x42f)](oldData);}},VisuMZ[_0x291ba2(0x193)]['Game_Follower_initialize']=Game_Follower['prototype'][_0x291ba2(0x317)],Game_Follower['prototype'][_0x291ba2(0x317)]=function(_0x334ef0){const _0x2ceefb=_0x291ba2;VisuMZ[_0x2ceefb(0x193)][_0x2ceefb(0x476)][_0x2ceefb(0x407)](this,_0x334ef0),this[_0x2ceefb(0x30d)]();},VisuMZ[_0x291ba2(0x193)]['Game_CharacterBase_straighten']=Game_CharacterBase[_0x291ba2(0x371)][_0x291ba2(0x1ca)],Game_CharacterBase[_0x291ba2(0x371)]['straighten']=function(){const _0x1f1e84=_0x291ba2;VisuMZ['MovementEffects'][_0x1f1e84(0x3f1)][_0x1f1e84(0x407)](this),this['randomizeAnimationCount']();},Game_CharacterBase[_0x291ba2(0x371)]['randomizeAnimationCount']=function(){},Game_Follower[_0x291ba2(0x371)][_0x291ba2(0x30d)]=function(){const _0x3a9e87=_0x291ba2;this['_animationCount']=Math[_0x3a9e87(0x1fe)](0xd);},Game_Follower[_0x291ba2(0x371)]['playFootstepSound']=function(){const _0x3ff95c=_0x291ba2;if($gamePlayer[_0x3ff95c(0x3c8)])return;Game_Character['prototype'][_0x3ff95c(0x3ca)]['call'](this);},Game_Follower['prototype'][_0x291ba2(0x271)]=function(){const _0xf5bce8=_0x291ba2;return this[_0xf5bce8(0x19a)]()?this[_0xf5bce8(0x19a)]()[_0xf5bce8(0x271)]():Game_Character[_0xf5bce8(0x371)][_0xf5bce8(0x271)][_0xf5bce8(0x407)](this);},Game_Follower['prototype']['footprintsData']=function(){const _0x10eb5b=_0x291ba2;return this[_0x10eb5b(0x19a)]()?this['actor']()[_0x10eb5b(0x24b)]():Game_Character['prototype'][_0x10eb5b(0x24b)]['call'](this);},Game_Follower[_0x291ba2(0x371)][_0x291ba2(0x34d)]=function(){return $gamePlayer['smartBlinkMotionTrailData']();},Game_Follower['prototype']['smartJumpMotionTrailData']=function(){return $gamePlayer['smartJumpMotionTrailData']();},Game_Follower[_0x291ba2(0x371)]['smartRushMotionTrailData']=function(){const _0x1eb511=_0x291ba2;return $gamePlayer[_0x1eb511(0x3d5)]();},Game_Follower[_0x291ba2(0x371)][_0x291ba2(0x397)]=function(){const _0x595984=_0x291ba2;if($gamePlayer[_0x595984(0x3bb)]()&&this[_0x595984(0x3d5)]()[_0x595984(0x202)]){if(_0x595984(0x3a5)===_0x595984(0x3a5))return this[_0x595984(0x3d5)]();else{if(!_0x511d92)return this['direction']();if(_0x12a7a5[_0x595984(0x3cd)])return this['direction']();const _0x90744d=this['straightenDiagonal'](this[_0x595984(0x3f6)](),_0x1ff873);return _0x90744d;}}else{if($gamePlayer['isSmartJumping']()&&this['smartJumpMotionTrailData']()[_0x595984(0x202)]){if('TocEP'===_0x595984(0x48d))return this[_0x595984(0x324)]();else{if(!this[_0x595984(0x24e)])return![];if(this[_0x595984(0x24e)]!==_0x3c7695&&this[_0x595984(0x24e)]['constructor']!==_0x4b1bcc)return![];return _0x3e71a3['isSmartRushing']();}}}return Game_Character['prototype']['motionTrailData']['call'](this);},VisuMZ['MovementEffects']['Game_Event_clearPageSettings']=Game_Event[_0x291ba2(0x371)][_0x291ba2(0x2c3)],Game_Event[_0x291ba2(0x371)][_0x291ba2(0x2c3)]=function(){const _0x29a829=_0x291ba2;VisuMZ[_0x29a829(0x193)][_0x29a829(0x40c)][_0x29a829(0x407)](this),this[_0x29a829(0x2c5)]();},VisuMZ[_0x291ba2(0x193)][_0x291ba2(0x266)]=Game_Event['prototype'][_0x291ba2(0x306)],Game_Event[_0x291ba2(0x371)][_0x291ba2(0x306)]=function(){const _0x119df9=_0x291ba2;VisuMZ[_0x119df9(0x193)]['Game_Event_setupPageSettings'][_0x119df9(0x407)](this),this[_0x119df9(0x2fe)]();},Game_Event['prototype']['setupMovementEffectsVariables']=function(){const _0x5bdbb7=_0x291ba2;if(!this[_0x5bdbb7(0x236)]())return;this[_0x5bdbb7(0x2c5)](),this[_0x5bdbb7(0x190)](),this[_0x5bdbb7(0x2f1)]();},Game_Event[_0x291ba2(0x371)][_0x291ba2(0x190)]=function(){const _0x4c45f5=_0x291ba2,_0x504cc6=this[_0x4c45f5(0x236)]()['note'];if(_0x504cc6==='')return;this[_0x4c45f5(0x36c)](_0x504cc6);},Game_Event['prototype']['setupMovementEffectsCommentTags']=function(){const _0x45fdef=_0x291ba2;if(!this[_0x45fdef(0x2fa)]())return;const _0x39107e=this['list']();let _0x3201fb='';for(const _0x264916 of _0x39107e){if(_0x45fdef(0x487)===_0x45fdef(0x30b)){const _0x24085d=_0x2bcb90(_0x13459c['$1']);_0x24085d<_0x379d02?(_0x485c31('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x1c7beb,_0x24085d,_0x5806d1)),_0x293b0e[_0x45fdef(0x414)]()):_0x248d8c=_0x1da7ce[_0x45fdef(0x1b4)](_0x24085d,_0x82c84e);}else{if([0x6c,0x198][_0x45fdef(0x387)](_0x264916['code'])){if(_0x3201fb!=='')_0x3201fb+='\x0a';_0x3201fb+=_0x264916[_0x45fdef(0x217)][0x0];}}}this[_0x45fdef(0x36c)](_0x3201fb);},Game_Event[_0x291ba2(0x371)][_0x291ba2(0x2c5)]=function(){const _0xf5deee=_0x291ba2;{const _0x227e0e=VisuMZ['MovementEffects']['Settings']['Footsteps'];this[_0xf5deee(0x3c4)]={'enabled':_0x227e0e[_0xf5deee(0x1b5)],'volumeRate':_0x227e0e[_0xf5deee(0x260)],'pitchRate':_0x227e0e['eventPitchModifier'],'soundFrames':_0x227e0e[_0xf5deee(0x34c)][_0xf5deee(0x20b)]()};}{const _0x2264e3=VisuMZ[_0xf5deee(0x193)][_0xf5deee(0x2e0)]['Footprints'];this[_0xf5deee(0x206)]={'enabled':!![],'dir1':JSON['parse'](JSON[_0xf5deee(0x245)](_0x2264e3['dir1'])),'dir2':JSON[_0xf5deee(0x2fc)](JSON[_0xf5deee(0x245)](_0x2264e3[_0xf5deee(0x2f4)])),'dir3':JSON['parse'](JSON['stringify'](_0x2264e3[_0xf5deee(0x483)])),'dir4':JSON[_0xf5deee(0x2fc)](JSON[_0xf5deee(0x245)](_0x2264e3['dir4'])),'dir6':JSON[_0xf5deee(0x2fc)](JSON['stringify'](_0x2264e3['dir6'])),'dir7':JSON[_0xf5deee(0x2fc)](JSON[_0xf5deee(0x245)](_0x2264e3[_0xf5deee(0x242)])),'dir8':JSON['parse'](JSON[_0xf5deee(0x245)](_0x2264e3[_0xf5deee(0x3f7)])),'dir9':JSON[_0xf5deee(0x2fc)](JSON[_0xf5deee(0x245)](_0x2264e3[_0xf5deee(0x3b3)]))};}this[_0xf5deee(0x2f3)]={'nonLand':![],'nonPass':![]};},Game_Event[_0x291ba2(0x371)][_0x291ba2(0x36c)]=function(_0xf4e557){const _0x5a59e2=_0x291ba2,_0x438252=VisuMZ[_0x5a59e2(0x193)][_0x5a59e2(0x30f)];if(!_0xf4e557[_0x5a59e2(0x2a3)](_0x438252[_0x5a59e2(0x45e)]))return;if(_0xf4e557[_0x5a59e2(0x2a3)](_0x438252[_0x5a59e2(0x394)]))this['_footsteps']['enabled']=!![];else _0xf4e557[_0x5a59e2(0x2a3)](_0x438252['NoFootstepsEvent'])&&(this[_0x5a59e2(0x3c4)][_0x5a59e2(0x202)]=![]);_0xf4e557[_0x5a59e2(0x2a3)](_0x438252[_0x5a59e2(0x32e)])&&(this['_footsteps'][_0x5a59e2(0x367)]=Number(RegExp['$1'])*0.01);if(_0xf4e557[_0x5a59e2(0x2a3)](_0x438252['FootstepsPitchRate'])){if(_0x5a59e2(0x492)===_0x5a59e2(0x492))this['_footsteps'][_0x5a59e2(0x2e7)]=Number(RegExp['$1'])*0.01;else{if(!_0x3bc3c4)return;if(_0x99cbcb[_0x5a59e2(0x3cd)])return;const _0xf8db44=this[_0x5a59e2(0x354)](_0x36e764);this[_0x5a59e2(0x1af)](_0xf8db44);}}_0xf4e557['match'](_0x438252['FootstepsFrames'])&&(this['_footsteps'][_0x5a59e2(0x44f)]=String(RegExp['$1'])['split'](',')['map'](_0x3c2a2e=>Number(_0x3c2a2e)||0x0));if(_0xf4e557[_0x5a59e2(0x2a3)](_0x438252['YesFootprintsEvent'])){if('cOIDQ'!==_0x5a59e2(0x223)){const _0x5bad0b=this[_0x5a59e2(0x3c0)],_0x293a9e=this[_0x5a59e2(0x3f6)]();let _0x7b2907=this['x'],_0x19e630=this['y'];if([0x1,0x4,0x7][_0x5a59e2(0x387)](_0x293a9e))_0x7b2907+=-_0x5bad0b;if([0x3,0x6,0x9][_0x5a59e2(0x387)](_0x293a9e))_0x7b2907+=_0x5bad0b;if([0x7,0x8,0x9]['includes'](_0x293a9e))_0x19e630+=-_0x5bad0b;if([0x1,0x2,0x3]['includes'](_0x293a9e))_0x19e630+=_0x5bad0b;this['smartBlinkMotionTrailData']()['enabled']&&this[_0x5a59e2(0x3a1)]();_0x4fbde7[_0x5a59e2(0x371)][_0x5a59e2(0x1bc)][_0x5a59e2(0x407)](this,_0x7b2907,_0x19e630),this['_followers'][_0x5a59e2(0x2cc)](_0x7b2907,_0x19e630,this['direction']());if(!_0x366cfa[_0x5a59e2(0x1ed)]())this[_0x5a59e2(0x228)](_0x7b2907,_0x19e630);this[_0x5a59e2(0x2e9)](),_0x25459b(this[_0x5a59e2(0x1d8)][_0x5a59e2(0x1c8)](this,[0x1,0x2]),0x32);}else this[_0x5a59e2(0x206)][_0x5a59e2(0x202)]=!![];}else _0xf4e557[_0x5a59e2(0x2a3)](_0x438252['NoFootprintsEvent'])&&(_0x5a59e2(0x448)!=='bHoCK'?this[_0x5a59e2(0x206)][_0x5a59e2(0x202)]=![]:this['playFootstepSound']());{if(_0x5a59e2(0x431)!==_0x5a59e2(0x431)){this['bitmap']=this['_baseSprite'][_0x5a59e2(0x339)];const _0x19744c=this['_baseSprite'][_0x5a59e2(0x41c)];this[_0x5a59e2(0x1f3)][_0x5a59e2(0x41c)]=0x0,this[_0x5a59e2(0x1f3)][_0x5a59e2(0x1a2)](),this[_0x5a59e2(0x1f1)]=_0x5862e0[_0x5a59e2(0x2fc)](_0x173d80['stringify'](this[_0x5a59e2(0x1f3)][_0x5a59e2(0x1f1)])),this[_0x5a59e2(0x1f3)][_0x5a59e2(0x41c)]=_0x19744c,this[_0x5a59e2(0x1f3)][_0x5a59e2(0x1a2)](),this['_refresh']();}else{const _0x195e0e='FootprintsFilename',_0xbd123b=_0xf4e557[_0x5a59e2(0x2a3)](_0x438252[_0x195e0e]);if(_0xbd123b)for(const _0x2a3759 of _0xbd123b){if(_0x5a59e2(0x213)==='bCAyI'){const _0x346cb1=this['footprintsData']();_0x346cb1['filename']!==''?(this['bitmap']=_0x2ca897['loadPicture'](_0x346cb1[_0x5a59e2(0x43b)]),this[_0x5a59e2(0x349)]=0x0):(this[_0x5a59e2(0x339)]=_0x20b134[_0x5a59e2(0x2b5)](),this['scale']['x']=_0x346cb1[_0x5a59e2(0x360)]*0.01,this[_0x5a59e2(0x23c)]['y']=_0x346cb1['height']*0.01,this[_0x5a59e2(0x349)]=0x2);}else{_0x2a3759[_0x5a59e2(0x2a3)](_0x438252[_0x195e0e]);const _0x4b65b6=RegExp['$1'],_0x26b161=RegExp['$2'],_0x26f219=RegExp['$3'],_0x4b1f1d=_0x5a59e2(0x291)[_0x5a59e2(0x44c)](TextManager[_0x5a59e2(0x3e2)](_0x4b65b6)),_0x96a4f2='pattern%1'['format'](Number(_0x26b161)||0x0);this[_0x5a59e2(0x206)][_0x4b1f1d][_0x96a4f2][_0x5a59e2(0x43b)]=String(_0x26f219)[_0x5a59e2(0x2b6)]();}}}}{if(_0x5a59e2(0x296)===_0x5a59e2(0x296)){const _0x178b12=_0x5a59e2(0x32b),_0x4fe770=_0xf4e557[_0x5a59e2(0x2a3)](_0x438252[_0x178b12]);if(_0x4fe770)for(const _0x5245d7 of _0x4fe770){if('Aehrc'==='Aehrc'){_0x5245d7[_0x5a59e2(0x2a3)](_0x438252[_0x178b12]);const _0x19722f=RegExp['$1'],_0x29aa27=RegExp['$2'],_0x31bb82=RegExp['$3'],_0xc0e1d4=_0x5a59e2(0x291)[_0x5a59e2(0x44c)](TextManager[_0x5a59e2(0x3e2)](_0x19722f)),_0x3e3828=_0x5a59e2(0x26e)[_0x5a59e2(0x44c)](Number(_0x29aa27)||0x0);this[_0x5a59e2(0x206)][_0xc0e1d4][_0x3e3828][_0x5a59e2(0x360)]=Number(_0x31bb82)||0x1;}else this['_motionTrailSettings']={'enabled':![],'delay':0x4,'duration':0x1e,'hue':0x0,'opacityStart':0x80,'tone':[0x0,0x0,0x0,0x0]};}}else{const _0x4b6731=_0x377ade['autotileType'](_0x5b4322,_0x183fa3,_0x3ac9a6);if(_0x1270d7[_0x5a59e2(0x387)](_0x4b6731))return!![];}}{const _0x18a45d=_0x5a59e2(0x3e0),_0x44e99a=_0xf4e557[_0x5a59e2(0x2a3)](_0x438252[_0x18a45d]);if(_0x44e99a)for(const _0x2dbef3 of _0x44e99a){_0x2dbef3[_0x5a59e2(0x2a3)](_0x438252[_0x18a45d]);const _0x590f12=RegExp['$1'],_0x813672=RegExp['$2'],_0x143524=RegExp['$3'],_0x176786=_0x5a59e2(0x291)[_0x5a59e2(0x44c)](TextManager['parseDirectionText'](_0x590f12)),_0x253e9c=_0x5a59e2(0x26e)[_0x5a59e2(0x44c)](Number(_0x813672)||0x0);this['_footprintsData'][_0x176786][_0x253e9c]['height']=Number(_0x143524)||0x1;}}{const _0x1c599f=_0x5a59e2(0x31a),_0x4ccd7b=_0xf4e557[_0x5a59e2(0x2a3)](_0x438252[_0x1c599f]);if(_0x4ccd7b){if(_0x5a59e2(0x446)===_0x5a59e2(0x212))for(const _0x2b6893 of _0x45bd92[_0x5a59e2(0x193)][_0x5a59e2(0x316)]){_0x31b7e1[_0x2b6893]=!![];}else for(const _0x2fe594 of _0x4ccd7b){_0x2fe594[_0x5a59e2(0x2a3)](_0x438252[_0x1c599f]);const _0x237013=RegExp['$1'],_0x970973=RegExp['$2'],_0xfec8f7=RegExp['$3'],_0x27dd97=_0x5a59e2(0x291)['format'](TextManager['parseDirectionText'](_0x237013)),_0x4f666c=_0x5a59e2(0x26e)[_0x5a59e2(0x44c)](Number(_0x970973)||0x0),_0x263704=_0xfec8f7[_0x5a59e2(0x3b6)](',')[_0x5a59e2(0x269)](_0x5b3216=>Number(_0x5b3216)||0x0);this['_footprintsData'][_0x27dd97][_0x4f666c][_0x5a59e2(0x3fb)]=_0x263704[0x0]||0x0,this[_0x5a59e2(0x206)][_0x27dd97][_0x4f666c][_0x5a59e2(0x2f6)]=_0x263704[0x1]||0x0;}}}_0xf4e557[_0x5a59e2(0x2a3)](_0x438252[_0x5a59e2(0x231)])&&(this[_0x5a59e2(0x2f3)][_0x5a59e2(0x3a4)]=!![]),_0xf4e557[_0x5a59e2(0x2a3)](_0x438252[_0x5a59e2(0x1ce)])&&(this[_0x5a59e2(0x2f3)][_0x5a59e2(0x337)]=!![]);},Game_Event[_0x291ba2(0x371)]['footstepsData']=function(){const _0x27b385=_0x291ba2;return this[_0x27b385(0x3c4)]===undefined&&this[_0x27b385(0x2fe)](),this[_0x27b385(0x3c4)];},Game_Event['prototype'][_0x291ba2(0x24b)]=function(){const _0x3f4e0e=_0x291ba2;return this['_footprintsData']===undefined&&this[_0x3f4e0e(0x2fe)](),this[_0x3f4e0e(0x206)];},Game_Event[_0x291ba2(0x371)][_0x291ba2(0x3f3)]=function(){const _0x209d7d=_0x291ba2;if(this[_0x209d7d(0x2f3)]===undefined)this[_0x209d7d(0x2fe)]();return this['_smartJumpRestriction'][_0x209d7d(0x3a4)];},Game_Event[_0x291ba2(0x371)][_0x291ba2(0x18e)]=function(){const _0x3d34ee=_0x291ba2;if(this[_0x3d34ee(0x2f3)]===undefined)this[_0x3d34ee(0x2fe)]();return this[_0x3d34ee(0x2f3)][_0x3d34ee(0x337)];},VisuMZ['MovementEffects'][_0x291ba2(0x373)]=Game_Interpreter['prototype'][_0x291ba2(0x3a3)],Game_Interpreter[_0x291ba2(0x371)][_0x291ba2(0x3a3)]=function(){const _0xbbc376=_0x291ba2;if(this[_0xbbc376(0x436)]===_0xbbc376(0x390)){if(_0xbbc376(0x396)!==_0xbbc376(0x281)){if($gamePlayer[_0xbbc376(0x2e8)]())return!![];this['_waitMode']='';}else return![];}else{if(this[_0xbbc376(0x436)]===_0xbbc376(0x3ba)){if($gamePlayer['isSmartJumping']()){if('UlsIa'!==_0xbbc376(0x458))return!![];else{let _0x202275=_0x27d787[_0xbbc376(0x193)][_0xbbc376(0x3ce)](this[_0xbbc376(0x24e)]);_0x202275+=_0x17878b;const _0x1815b9=this[_0xbbc376(0x438)][_0xbbc376(0x29c)](0x0,0x1e);_0x132e21['velocity']['x']=_0x1815b9*_0x26081f[_0xbbc376(0x383)](_0x202275*_0x2b1640['PI']/0xb4),_0x57ac85[_0xbbc376(0x33a)]['y']=-_0x1815b9*_0x100822['sin'](_0x202275*_0x2f0fc9['PI']/0xb4);}}this[_0xbbc376(0x436)]='';}else{if(this[_0xbbc376(0x436)]===_0xbbc376(0x3ac)){if($gamePlayer[_0xbbc376(0x3bb)]())return!![];this['_waitMode']='';}}}return VisuMZ[_0xbbc376(0x193)]['Game_Interpreter_updateWaitMode'][_0xbbc376(0x407)](this);},VisuMZ['MovementEffects'][_0x291ba2(0x24f)]=Sprite_Character[_0x291ba2(0x371)]['initialize'],Sprite_Character[_0x291ba2(0x371)][_0x291ba2(0x317)]=function(_0x2a1d5b){const _0xef3216=_0x291ba2;VisuMZ[_0xef3216(0x193)][_0xef3216(0x24f)]['call'](this,_0x2a1d5b);},VisuMZ[_0x291ba2(0x193)][_0x291ba2(0x27e)]=Sprite_Character[_0x291ba2(0x371)]['update'],Sprite_Character[_0x291ba2(0x371)]['update']=function(){const _0x14623c=_0x291ba2;VisuMZ['MovementEffects'][_0x14623c(0x27e)][_0x14623c(0x407)](this),this['updateMotionBlurEffectFilter'](),this[_0x14623c(0x264)]();},Sprite_Character[_0x291ba2(0x371)][_0x291ba2(0x267)]=function(){const _0x5e029a=_0x291ba2;if(!PIXI[_0x5e029a(0x3d7)][_0x5e029a(0x38a)])return;if(this[_0x5e029a(0x32c)])return;this[_0x5e029a(0x32c)]=new PIXI[(_0x5e029a(0x3d7))][(_0x5e029a(0x38a))](),this[_0x5e029a(0x438)]=0x0,this['_motionBlurMovementEffectsAngleOffset']=0x0,this[_0x5e029a(0x3d7)]=this[_0x5e029a(0x3d7)]||[],this[_0x5e029a(0x3d7)][_0x5e029a(0x294)](this['_motionBlurMovementEffectsFilter']);},Sprite_Character[_0x291ba2(0x371)][_0x291ba2(0x26d)]=function(_0x39c7fb,_0x14fd4e){const _0x32441f=_0x291ba2;if(!this[_0x32441f(0x32c)]){if(_0x32441f(0x359)!==_0x32441f(0x2a2))this[_0x32441f(0x267)]();else{const _0x14fe3a=_0x30351d[_0x32441f(0x193)][_0x32441f(0x2e0)][_0x32441f(0x1cd)],_0x384053=_0x1077e0[_0x32441f(0x455)](_0x3e2e54['x']),_0x3c87e9=_0x3b769c['deltaYFrom'](_0x13d597['y']),_0x259f68=_0x2b982d['abs'](_0x384053)+_0x493170[_0x32441f(0x1f6)](_0x3c87e9);_0x259f68>0x0&&(_0x5658aa['volume']+=_0x259f68*_0x14fe3a[_0x32441f(0x39e)],_0x214955[_0x32441f(0x247)]+=_0x259f68*_0x14fe3a[_0x32441f(0x297)]),_0x384053!==0x0&&(_0x5d8f0e[_0x32441f(0x287)]-=_0x384053*_0x14fe3a[_0x32441f(0x40f)]);}}if(!this[_0x32441f(0x32c)])return;this['_motionBlurMovementEffectsDuration']=_0x39c7fb,this[_0x32441f(0x2f9)]=_0x14fd4e;},Sprite_Character[_0x291ba2(0x371)][_0x291ba2(0x3b4)]=function(){const _0x120364=_0x291ba2;if(!this[_0x120364(0x24e)])return![];if(this[_0x120364(0x24e)]!==$gamePlayer&&this['_character']['constructor']!==Game_Follower)return![];return $gamePlayer[_0x120364(0x3bb)]();},Sprite_Character[_0x291ba2(0x371)][_0x291ba2(0x392)]=function(){const _0x4cf252=_0x291ba2;let _0x4f642e=this[_0x4cf252(0x2f9)];this[_0x4cf252(0x3b4)]()&&(this[_0x4cf252(0x438)]=Game_Player[_0x4cf252(0x285)],_0x4f642e=Game_Player[_0x4cf252(0x302)]);if(this[_0x4cf252(0x438)]===undefined)return;if(this[_0x4cf252(0x438)]<=0x0)return;!this[_0x4cf252(0x32c)]&&this[_0x4cf252(0x267)]();if(!this[_0x4cf252(0x32c)])return;const _0x31f038=this['_motionBlurMovementEffectsFilter'];if(this[_0x4cf252(0x438)]-->0x0){let _0x3a5d9d=VisuMZ[_0x4cf252(0x193)]['GetDirAngle'](this[_0x4cf252(0x24e)]);_0x3a5d9d+=_0x4f642e;const _0xdc9eea=this['_motionBlurMovementEffectsDuration'][_0x4cf252(0x29c)](0x0,0x1e);_0x31f038[_0x4cf252(0x33a)]['x']=_0xdc9eea*Math[_0x4cf252(0x383)](_0x3a5d9d*Math['PI']/0xb4),_0x31f038['velocity']['y']=-_0xdc9eea*Math[_0x4cf252(0x1a1)](_0x3a5d9d*Math['PI']/0xb4);}else{if('uBrgs'!==_0x4cf252(0x307))_0x31f038['velocity']['x']=0x0,_0x31f038[_0x4cf252(0x33a)]['y']=0x0,this[_0x4cf252(0x2f9)]=0x0;else return _0x23d4b5[_0x4cf252(0x3d5)]();}},VisuMZ[_0x291ba2(0x193)][_0x291ba2(0x3ce)]=function(_0x3f772f){const _0x2cab66=_0x291ba2;if(!_0x3f772f)return 0x2d;const _0x24e732=_0x3f772f[_0x2cab66(0x3f6)]();if(_0x24e732===0x6)return 0x0;if(_0x24e732===0x9)return 0x2d;if(_0x24e732===0x8)return 0x5a;if(_0x24e732===0x7)return 0x87;if(_0x24e732===0x4)return 0xb4;if(_0x24e732===0x1)return 0xe1;if(_0x24e732===0x2)return 0x10e;if(_0x24e732===0x3)return 0x13b;return 0x2d;},Sprite_Character[_0x291ba2(0x371)][_0x291ba2(0x1ac)]=function(){const _0x5329f9=_0x291ba2;if(!SceneManager[_0x5329f9(0x412)])return![];if(!SceneManager['_scene']['_spriteset'])return![];if(this[_0x5329f9(0x276)]!==Sprite_Character)return![];if(!this[_0x5329f9(0x24e)])return![];if(this[_0x5329f9(0x24e)][_0x5329f9(0x1d9)])return![];if(!this[_0x5329f9(0x338)])return![];if(this[_0x5329f9(0x2a0)]<=0x0)return![];if(!this['_frame'])return![];if(!this['bitmap'])return![];if(this['_frame'][_0x5329f9(0x360)]===this['bitmap']['width'])return![];if(this[_0x5329f9(0x1c9)]===this[_0x5329f9(0x24e)][_0x5329f9(0x308)]&&this[_0x5329f9(0x2d5)]===this[_0x5329f9(0x24e)]['_realY'])return![];return!![];},Sprite_Character['prototype'][_0x291ba2(0x35b)]=function(){const _0x157f28=_0x291ba2;if(!this[_0x157f28(0x24e)])return![];return this[_0x157f28(0x24e)][_0x157f28(0x397)]()[_0x157f28(0x202)];},Sprite_Character[_0x291ba2(0x371)][_0x291ba2(0x264)]=function(){const _0x51b73a=_0x291ba2;if(!this[_0x51b73a(0x1ac)]())return;if(!this['areMotionTrailsEnabled']())return;const _0x23f5a7=this[_0x51b73a(0x24e)][_0x51b73a(0x397)](),_0x5a6cc3=_0x23f5a7[_0x51b73a(0x1da)]||0x1;Graphics['frameCount']%_0x5a6cc3===0x0&&(_0x51b73a(0x28e)!==_0x51b73a(0x28e)?_0x2eaaa4['MovementEffects'][_0x51b73a(0x257)][_0x51b73a(0x407)](this,_0x51bd43,_0x308822):this['createMotionTrailSprite']());},Sprite_Character[_0x291ba2(0x371)][_0x291ba2(0x253)]=function(){const _0x257f44=_0x291ba2,_0x561b21=new Sprite_MapMotionTrail(this,this[_0x257f44(0x24e)]),_0x1a549c=SceneManager[_0x257f44(0x412)]['_spriteset'];_0x1a549c[_0x257f44(0x27d)][_0x257f44(0x294)](_0x561b21),this[_0x257f44(0x1c9)]=this['_character'][_0x257f44(0x308)],this[_0x257f44(0x2d5)]=this[_0x257f44(0x24e)][_0x257f44(0x3f8)];const _0x50a635=_0x1a549c['_tilemap'];_0x50a635[_0x257f44(0x467)](_0x561b21);};function _0x459f(_0x1a7faf,_0x29d8bb){const _0x47869f=_0x4786();return _0x459f=function(_0x459fa4,_0x363bc9){_0x459fa4=_0x459fa4-0x18c;let _0x5da0d8=_0x47869f[_0x459fa4];return _0x5da0d8;},_0x459f(_0x1a7faf,_0x29d8bb);}function Sprite_Footprint(){const _0xc520b8=_0x291ba2;this[_0xc520b8(0x317)](...arguments);}Sprite_Footprint[_0x291ba2(0x371)]=Object[_0x291ba2(0x3f0)](Sprite[_0x291ba2(0x371)]),Sprite_Footprint[_0x291ba2(0x371)]['constructor']=Sprite_Footprint,Sprite_Footprint[_0x291ba2(0x371)][_0x291ba2(0x317)]=function(_0x29b38c){const _0x3e85fc=_0x291ba2;this[_0x3e85fc(0x24e)]=_0x29b38c,Sprite[_0x3e85fc(0x371)][_0x3e85fc(0x317)]['call'](this),this[_0x3e85fc(0x2cb)](),this[_0x3e85fc(0x313)](),this[_0x3e85fc(0x18d)](),this[_0x3e85fc(0x21e)](),this[_0x3e85fc(0x255)]();},Sprite_Footprint[_0x291ba2(0x371)][_0x291ba2(0x2cb)]=function(){const _0x3d16b9=_0x291ba2;this[_0x3d16b9(0x18f)]['x']=0.5,this[_0x3d16b9(0x18f)]['y']=0x1,this['z']=0x0,this[_0x3d16b9(0x308)]=this[_0x3d16b9(0x24e)]['_realX'],this[_0x3d16b9(0x3f8)]=this[_0x3d16b9(0x24e)][_0x3d16b9(0x3f8)],this[_0x3d16b9(0x415)]=this[_0x3d16b9(0x24e)][_0x3d16b9(0x415)],this['_pattern']=this[_0x3d16b9(0x24e)][_0x3d16b9(0x372)](),this['_shiftY']=this[_0x3d16b9(0x24e)][_0x3d16b9(0x2e1)](),this[_0x3d16b9(0x2bd)]=0x0,this[_0x3d16b9(0x355)]=0x0;if(this[_0x3d16b9(0x24e)][_0x3d16b9(0x276)]===Game_Follower){const _0x55b306=VisuMZ[_0x3d16b9(0x193)]['Settings'][_0x3d16b9(0x442)]['followerVariance']||0x0;this[_0x3d16b9(0x2bd)]=Math[_0x3d16b9(0x1fe)](_0x55b306+0x1)+Math[_0x3d16b9(0x1fe)](_0x55b306+0x1)-_0x55b306,this[_0x3d16b9(0x355)]=Math[_0x3d16b9(0x1fe)](_0x55b306+0x1)+Math['randomInt'](_0x55b306+0x1)-_0x55b306;}},Sprite_Footprint[_0x291ba2(0x371)][_0x291ba2(0x24b)]=function(){const _0x28da79=_0x291ba2,_0x3f9797=_0x28da79(0x291)['format'](this['_direction']),_0x2043e6=_0x28da79(0x26e)[_0x28da79(0x44c)](this[_0x28da79(0x465)]),_0x516fde=this[_0x28da79(0x24e)][_0x28da79(0x24b)]();return _0x516fde[_0x3f9797][_0x2043e6];},Sprite_Footprint[_0x291ba2(0x371)][_0x291ba2(0x313)]=function(){const _0x24d49c=_0x291ba2,_0x24e310=this['footprintsData']();if(_0x24e310['filename']!==''){if(_0x24d49c(0x2eb)===_0x24d49c(0x1f8)){if(!_0x41c054[_0x24d49c(0x412)])return;if(!_0xd0cc61[_0x24d49c(0x412)][_0x24d49c(0x256)])return;const _0x571338=_0x179933[_0x24d49c(0x412)]['_spriteset']['_tilemap'];if(!_0x571338)return;this['x']-=_0x26e0f8['floor'](_0x571338[_0x24d49c(0x25e)]['x']*_0x4b07bf[_0x24d49c(0x195)]()),this['y']-=_0x6741fc[_0x24d49c(0x421)](_0x571338['origin']['y']*_0x3a00c1[_0x24d49c(0x195)]());}else this['bitmap']=ImageManager[_0x24d49c(0x20d)](_0x24e310['filename']),this[_0x24d49c(0x349)]=0x0;}else this[_0x24d49c(0x339)]=ImageManager[_0x24d49c(0x2b5)](),this[_0x24d49c(0x23c)]['x']=_0x24e310[_0x24d49c(0x360)]*0.01,this['scale']['y']=_0x24e310[_0x24d49c(0x1b1)]*0.01,this[_0x24d49c(0x349)]=0x2;},Sprite_Footprint[_0x291ba2(0x371)][_0x291ba2(0x18d)]=function(){const _0x4ba154=_0x291ba2,_0x1019a7=this[_0x4ba154(0x24e)]['x'],_0x310bc3=this[_0x4ba154(0x24e)]['y'];this['opacity']=$gameMap[_0x4ba154(0x3cf)](_0x1019a7,_0x310bc3);},Sprite_Footprint[_0x291ba2(0x371)][_0x291ba2(0x21e)]=function(){const _0x1b368c=_0x291ba2,_0x41dd3b=this[_0x1b368c(0x24e)]['x'],_0x5c3d68=this[_0x1b368c(0x24e)]['y'];this[_0x1b368c(0x2fb)]=$gameMap['footprintDurationAtXy'](_0x41dd3b,_0x5c3d68);},Sprite_Footprint[_0x291ba2(0x371)][_0x291ba2(0x44b)]=function(){const _0x1ffac0=_0x291ba2;Sprite[_0x1ffac0(0x371)][_0x1ffac0(0x44b)][_0x1ffac0(0x407)](this),this[_0x1ffac0(0x255)]();},Sprite_Footprint[_0x291ba2(0x371)][_0x291ba2(0x255)]=function(){const _0x2b5fac=_0x291ba2,_0x4077bc=$gameMap['tileWidth'](),_0x1e5075=$gameMap[_0x2b5fac(0x1d7)]();this['x']=Math['floor']($gameMap['adjustX'](this[_0x2b5fac(0x308)])*_0x4077bc+_0x4077bc/0x2),this['x']+=this[_0x2b5fac(0x24b)]()[_0x2b5fac(0x3fb)]+this[_0x2b5fac(0x2bd)],this['y']=Math['floor']($gameMap['adjustY'](this[_0x2b5fac(0x3f8)])*_0x1e5075+_0x1e5075),this['y']+=this[_0x2b5fac(0x24b)]()[_0x2b5fac(0x2f6)]+this[_0x2b5fac(0x355)],this['y']-=this[_0x2b5fac(0x462)];};function Sprite_MapMotionTrail(){const _0x5ef1a5=_0x291ba2;this[_0x5ef1a5(0x317)](...arguments);}Sprite_MapMotionTrail[_0x291ba2(0x371)]=Object[_0x291ba2(0x3f0)](Sprite['prototype']),Sprite_MapMotionTrail[_0x291ba2(0x371)][_0x291ba2(0x276)]=Sprite_MapMotionTrail,Sprite_MapMotionTrail[_0x291ba2(0x371)][_0x291ba2(0x317)]=function(_0x40de2d,_0x5e08ac){const _0x259d86=_0x291ba2;this[_0x259d86(0x1f3)]=_0x40de2d,this[_0x259d86(0x24e)]=_0x5e08ac,Sprite[_0x259d86(0x371)][_0x259d86(0x317)][_0x259d86(0x407)](this),this[_0x259d86(0x1ee)](),this[_0x259d86(0x3f5)](),this[_0x259d86(0x30e)](),this[_0x259d86(0x1d1)](),this[_0x259d86(0x3a9)]=!![];},Sprite_MapMotionTrail[_0x291ba2(0x371)][_0x291ba2(0x1ee)]=function(){const _0x2b38a7=_0x291ba2,_0x523cfc=$gameMap[_0x2b38a7(0x1d7)](),_0x3ab52f=(_0x523cfc-0x1)/_0x523cfc;this[_0x2b38a7(0x18f)]['x']=this[_0x2b38a7(0x1f3)][_0x2b38a7(0x18f)]['x'],this['anchor']['y']=this[_0x2b38a7(0x1f3)][_0x2b38a7(0x18f)]['y'],this['opacity']=this[_0x2b38a7(0x1f3)][_0x2b38a7(0x2a0)],this[_0x2b38a7(0x23c)]['x']=this[_0x2b38a7(0x1f3)]['scale']['x'],this['scale']['y']=this['_baseSprite'][_0x2b38a7(0x23c)]['y'],this['x']=this[_0x2b38a7(0x1f3)]['x'],this['y']=this[_0x2b38a7(0x1f3)]['y'],this['z']=this[_0x2b38a7(0x1f3)]['z'],this[_0x2b38a7(0x308)]=this[_0x2b38a7(0x24e)]['_realX'],this[_0x2b38a7(0x3f8)]=this[_0x2b38a7(0x24e)][_0x2b38a7(0x3f8)],this[_0x2b38a7(0x462)]=this[_0x2b38a7(0x24e)]['shiftY'](),this['_jumpHeight']=this[_0x2b38a7(0x24e)][_0x2b38a7(0x3b0)]();},Sprite_MapMotionTrail[_0x291ba2(0x371)][_0x291ba2(0x3f5)]=function(){const _0x3b8521=_0x291ba2;this['bitmap']=this[_0x3b8521(0x1f3)][_0x3b8521(0x339)];const _0x2aeaef=this[_0x3b8521(0x1f3)][_0x3b8521(0x41c)];this[_0x3b8521(0x1f3)][_0x3b8521(0x41c)]=0x0,this[_0x3b8521(0x1f3)]['updateCharacterFrame'](),this[_0x3b8521(0x1f1)]=JSON[_0x3b8521(0x2fc)](JSON[_0x3b8521(0x245)](this['_baseSprite'][_0x3b8521(0x1f1)])),this['_baseSprite'][_0x3b8521(0x41c)]=_0x2aeaef,this[_0x3b8521(0x1f3)][_0x3b8521(0x1a2)](),this[_0x3b8521(0x321)]();},Sprite_MapMotionTrail[_0x291ba2(0x371)][_0x291ba2(0x397)]=function(){const _0x44b03b=_0x291ba2;return this[_0x44b03b(0x24e)][_0x44b03b(0x397)]();},Sprite_MapMotionTrail[_0x291ba2(0x371)][_0x291ba2(0x30e)]=function(){const _0xd2c9d=_0x291ba2,_0xefbd91=this[_0xd2c9d(0x397)]();this['_duration']=_0xefbd91['duration']||0x1,this[_0xd2c9d(0x3cb)](_0xefbd91[_0xd2c9d(0x3e8)]),this[_0xd2c9d(0x2d7)](_0xefbd91[_0xd2c9d(0x434)]),this[_0xd2c9d(0x1e0)]=(_0xefbd91[_0xd2c9d(0x2de)]/0xff)[_0xd2c9d(0x29c)](0x0,0x1),this[_0xd2c9d(0x2a0)]=(this[_0xd2c9d(0x2a0)]*this[_0xd2c9d(0x1e0)])[_0xd2c9d(0x29c)](0x0,0xff);},Sprite_MapMotionTrail[_0x291ba2(0x371)][_0x291ba2(0x1d1)]=function(){const _0x18e432=_0x291ba2;this[_0x18e432(0x19c)](),this[_0x18e432(0x2ea)]();},Sprite_MapMotionTrail[_0x291ba2(0x371)][_0x291ba2(0x19c)]=function(){const _0x57a583=_0x291ba2;this[_0x57a583(0x370)]=new Sprite(),this[_0x57a583(0x370)]['bitmap']=ImageManager[_0x57a583(0x224)]('IconSet'),this[_0x57a583(0x370)]['bitmap'][_0x57a583(0x386)]=![],this[_0x57a583(0x370)][_0x57a583(0x18f)]['x']=0.5,this[_0x57a583(0x370)][_0x57a583(0x18f)]['y']=0x1,this[_0x57a583(0x467)](this[_0x57a583(0x370)]);},Sprite_MapMotionTrail[_0x291ba2(0x371)][_0x291ba2(0x2ea)]=function(){const _0x40745d=_0x291ba2,_0x863f5b=this[_0x40745d(0x370)],_0x565aea=this[_0x40745d(0x1f3)][_0x40745d(0x370)];_0x863f5b['x']=_0x565aea['x'],_0x863f5b['y']=_0x565aea['y'],_0x863f5b['_frame']=JSON['parse'](JSON[_0x40745d(0x245)](_0x565aea['_frame'])),_0x863f5b['_refresh']();},Sprite_MapMotionTrail[_0x291ba2(0x371)][_0x291ba2(0x44b)]=function(){const _0x290407=_0x291ba2;Sprite[_0x290407(0x371)][_0x290407(0x44b)]['call'](this),this[_0x290407(0x3a9)]&&(this['updateOpacity'](),this[_0x290407(0x255)]());},Sprite_MapMotionTrail['prototype']['updateOpacity']=function(){const _0x40466a=_0x291ba2;if(this[_0x40466a(0x2fb)]<=0x0)return;const _0x3f2b9a=this[_0x40466a(0x2fb)];this['opacity']=(this[_0x40466a(0x2a0)]*(_0x3f2b9a-0x1)+0x0)/_0x3f2b9a,this[_0x40466a(0x2fb)]--,this[_0x40466a(0x2fb)]<=0x0&&(this['opacity']=0x0);},Sprite_MapMotionTrail[_0x291ba2(0x371)]['updatePosition']=function(){const _0x5208f5=_0x291ba2,_0x4dc725=$gameMap[_0x5208f5(0x44d)](),_0x19afed=$gameMap['tileHeight']();this['x']=Math['floor']($gameMap[_0x5208f5(0x369)](this['_realX'])*_0x4dc725+_0x4dc725/0x2),this['y']=Math[_0x5208f5(0x421)]($gameMap['adjustY'](this[_0x5208f5(0x3f8)])*_0x19afed+_0x19afed),this['y']-=this['_shiftY']+this[_0x5208f5(0x47b)]+0.001;},VisuMZ['MovementEffects'][_0x291ba2(0x252)]=Spriteset_Map[_0x291ba2(0x371)][_0x291ba2(0x27f)],Spriteset_Map['prototype'][_0x291ba2(0x27f)]=function(){const _0xacda23=_0x291ba2;VisuMZ[_0xacda23(0x193)]['Spriteset_Map_createLowerLayer'][_0xacda23(0x407)](this),this[_0xacda23(0x479)](),this['createFootprintBasics'](),this['createMotionTrailContainers']();},VisuMZ[_0x291ba2(0x193)]['Spriteset_Map_update']=Spriteset_Map[_0x291ba2(0x371)][_0x291ba2(0x44b)],Spriteset_Map[_0x291ba2(0x371)][_0x291ba2(0x44b)]=function(){const _0x184d5e=_0x291ba2;VisuMZ[_0x184d5e(0x193)][_0x184d5e(0x2b1)]['call'](this),this[_0x184d5e(0x240)](),this['updateFootprints'](),this['updateMotionTrailSprites']();},VisuMZ[_0x291ba2(0x193)][_0x291ba2(0x1cc)]=Spriteset_Map[_0x291ba2(0x371)]['updateTilemap'],Spriteset_Map['prototype']['updateTilemap']=function(){const _0x270ded=_0x291ba2;VisuMZ['MovementEffects'][_0x270ded(0x1cc)][_0x270ded(0x407)](this),this[_0x270ded(0x3aa)][_0x270ded(0x25e)]['x']=Math[_0x270ded(0x211)](this[_0x270ded(0x3aa)]['origin']['x']),this[_0x270ded(0x3aa)][_0x270ded(0x25e)]['y']=Math['ceil'](this[_0x270ded(0x3aa)][_0x270ded(0x25e)]['y']),this[_0x270ded(0x1e6)]();},Spriteset_Map[_0x291ba2(0x371)]['updateSmoothScrollingContainer']=function(){const _0x32e0eb=_0x291ba2;if(!this[_0x32e0eb(0x28c)])return;const _0x535fe5=this[_0x32e0eb(0x28c)][_0x32e0eb(0x490)];for(const _0xe0ecae of _0x535fe5){if(!_0xe0ecae)continue;if(!_0xe0ecae[_0x32e0eb(0x1e9)]())continue;if(!_0xe0ecae['picture']()[_0x32e0eb(0x2a8)]())continue;_0xe0ecae[_0x32e0eb(0x255)]();}},VisuMZ[_0x291ba2(0x193)][_0x291ba2(0x1a5)]=Sprite_Picture[_0x291ba2(0x371)][_0x291ba2(0x255)],Sprite_Picture[_0x291ba2(0x371)]['updatePosition']=function(){const _0x22c842=_0x291ba2;VisuMZ['MovementEffects']['Sprite_Picture_updatePosition'][_0x22c842(0x407)](this);if(this[_0x22c842(0x1e9)]()[_0x22c842(0x2a8)]()){if(_0x22c842(0x48b)!==_0x22c842(0x20f))this['updateScrollLinkedPosition']();else{if(this['_smoothCamera']===_0x47d879)this['initMovementEffectsSmoothCamera']();return this[_0x22c842(0x328)][_0x22c842(0x202)];}}},Sprite_Picture[_0x291ba2(0x371)]['updateScrollLinkedPosition']=function(){const _0x1b0108=_0x291ba2;if(!SceneManager['_scene'])return;if(!SceneManager[_0x1b0108(0x412)][_0x1b0108(0x256)])return;const _0xdf859f=SceneManager['_scene'][_0x1b0108(0x256)]['_tilemap'];if(!_0xdf859f)return;this['x']-=Math[_0x1b0108(0x421)](_0xdf859f[_0x1b0108(0x25e)]['x']*$gameScreen['zoomScale']()),this['y']-=Math[_0x1b0108(0x421)](_0xdf859f['origin']['y']*$gameScreen[_0x1b0108(0x195)]());},Spriteset_Map[_0x291ba2(0x371)][_0x291ba2(0x479)]=function(){const _0x292b0a=_0x291ba2;this['_dustCloudSprites']=this[_0x292b0a(0x1c5)]||[];const _0x59c018=$gameSystem[_0x292b0a(0x43e)]();this[_0x292b0a(0x3de)]=JSON[_0x292b0a(0x2fc)](JSON[_0x292b0a(0x245)](_0x59c018)),this[_0x292b0a(0x1fc)]();},Spriteset_Map[_0x291ba2(0x371)][_0x291ba2(0x3f4)]=function(){const _0x5c4c73=_0x291ba2;if(!this[_0x5c4c73(0x3de)])this[_0x5c4c73(0x479)]();else{const _0x158495=$gameSystem['dustCloudData']();JSON[_0x5c4c73(0x245)](this[_0x5c4c73(0x3de)])!==JSON[_0x5c4c73(0x245)](_0x158495)&&(_0x5c4c73(0x47c)===_0x5c4c73(0x47c)?this[_0x5c4c73(0x479)]():this['_smartJumpRestriction']['nonLand']=!![]);}},Spriteset_Map[_0x291ba2(0x371)][_0x291ba2(0x1fc)]=function(){const _0x27365c=_0x291ba2,_0x4b6784=this[_0x27365c(0x3de)];if(_0x4b6784[_0x27365c(0x43b)]!=='')this['_dustCloudBitmap']=ImageManager[_0x27365c(0x20d)](_0x4b6784[_0x27365c(0x43b)]);else{const _0x2f6bb7=_0x4b6784[_0x27365c(0x1e8)],_0x5768fb=_0x2f6bb7*0x2,_0x713c25=new Bitmap(_0x5768fb,_0x5768fb),_0x3a279b=_0x4b6784[_0x27365c(0x46f)],_0x173bc4=_0x4b6784[_0x27365c(0x3df)];_0x713c25[_0x27365c(0x274)](_0x2f6bb7,_0x3a279b,_0x173bc4),this['_dustCloudBitmap']=_0x713c25;}},Bitmap['prototype'][_0x291ba2(0x274)]=function(_0x5832e1,_0xfc60b2,_0x4306f9){const _0x576637=_0x291ba2;_0x4306f9=_0x4306f9[_0x576637(0x29c)](0x0,0x1);const _0x2b25b3=this[_0x576637(0x319)],_0x38dd93=0x168*(Math['PI']/0xb4),_0xe60486=_0x5832e1*0x2,_0x2b5b3c=_0x2b25b3['createRadialGradient'](_0x5832e1,_0x5832e1,0x0,_0x5832e1,_0x5832e1,_0x5832e1),_0x4b93d5=ColorManager['hexToRgba'](_0xfc60b2,0x1),_0x1bb5ef=ColorManager[_0x576637(0x2ce)](_0xfc60b2,0x0);_0x2b5b3c[_0x576637(0x1a6)](0x0,_0x4b93d5),_0x2b5b3c['addColorStop'](_0x4306f9,_0x4b93d5),_0x2b5b3c[_0x576637(0x1a6)](0x1,_0x1bb5ef),_0x2b25b3[_0x576637(0x427)](),_0x2b25b3['fillStyle']=_0x2b5b3c,_0x2b25b3[_0x576637(0x1aa)](),_0x2b25b3[_0x576637(0x3ec)](_0x5832e1,_0x5832e1),_0x2b25b3['lineTo'](_0xe60486,_0x5832e1),_0x2b25b3[_0x576637(0x263)](_0x5832e1,_0x5832e1,_0x5832e1,0x0,_0x38dd93),_0x2b25b3[_0x576637(0x418)](_0x5832e1,_0x5832e1),_0x2b25b3[_0x576637(0x404)](),_0x2b25b3[_0x576637(0x232)](),this[_0x576637(0x36f)][_0x576637(0x44b)]();},ColorManager[_0x291ba2(0x2ce)]=function(_0x482581,_0x24c153){const _0x5e613f=_0x291ba2;let _0x311356='';if(/^#([A-Fa-f0-9]{3}){1,2}$/[_0x5e613f(0x461)](_0x482581)){_0x311356=_0x482581[_0x5e613f(0x35f)](0x1)[_0x5e613f(0x3b6)]('');if(_0x311356[_0x5e613f(0x1c3)]===0x3){if(_0x5e613f(0x3b1)===_0x5e613f(0x3b1))_0x311356=[_0x311356[0x0],_0x311356[0x0],_0x311356[0x1],_0x311356[0x1],_0x311356[0x2],_0x311356[0x2]];else{_0x3ec8db=_0x5210db['toLowerCase']()[_0x5e613f(0x2b6)]();switch(_0x20c30e){case _0x5e613f(0x2d9):return 0x2;case _0x5e613f(0x1b2):return 0x4;case _0x5e613f(0x39f):return 0x6;case'up':return 0x8;case'lower\x20left':return 0x1;case _0x5e613f(0x399):return 0x3;case _0x5e613f(0x489):return 0x7;case _0x5e613f(0x1d0):return 0x9;}return _0x20489a(_0x3b9ce0)||0x0;}}while(_0x311356[_0x5e613f(0x1c3)]>0x6)_0x311356[_0x5e613f(0x3a8)]();return _0x311356='0x'+_0x311356[_0x5e613f(0x1c6)](''),'rgba('+[(_0x311356>>0x10&0xff)['clamp'](0x0,0xff),(_0x311356>>0x8&0xff)[_0x5e613f(0x29c)](0x0,0xff),(_0x311356&0xff)[_0x5e613f(0x29c)](0x0,0xff)][_0x5e613f(0x1c6)](',')+','+_0x24c153['clamp'](0x0,0x1)+')';}else{if(_0x5e613f(0x34b)===_0x5e613f(0x34b))return'rgba(0,0,0,0)';else{_0x20b4c3['match'](_0x11e3a2[_0x4a4c0e]);const _0x2aefe7=_0x378dbe['$1'],_0x24f739=_0x280b02['$2'],_0x54c6c6=_0xe1d9e3['$3'],_0x2c42ce='dir%1'[_0x5e613f(0x44c)](_0x44e5f1[_0x5e613f(0x3e2)](_0x2aefe7)),_0x4a9b59=_0x5e613f(0x26e)[_0x5e613f(0x44c)](_0x4812e5(_0x24f739)||0x0);this[_0x5e613f(0x206)][_0x2c42ce][_0x4a9b59]['width']=_0x34fd5d(_0x54c6c6)||0x1;}}},Spriteset_Map['prototype'][_0x291ba2(0x2ba)]=function(_0x46d489){const _0x517c23=_0x291ba2,_0x3a756d=this[_0x517c23(0x1b3)](_0x46d489);if(!_0x3a756d)return;this['checkDustCloudChanges']();const _0x58f11f=this[_0x517c23(0x3de)],_0x45c076=_0x58f11f[_0x517c23(0x2b7)],_0x125523=new Sprite();_0x125523[_0x517c23(0x339)]=this[_0x517c23(0x416)],_0x125523[_0x517c23(0x2a0)]=_0x58f11f[_0x517c23(0x1b0)],_0x125523[_0x517c23(0x2fb)]=_0x58f11f['wholeDuration'],_0x125523[_0x517c23(0x18f)]['x']=0.5,_0x125523[_0x517c23(0x18f)]['y']=0x1,_0x125523['scale']['x']=(Math[_0x517c23(0x227)]()*_0x45c076)[_0x517c23(0x29c)](0.01,0.99),_0x125523['scale']['y']=(Math['random']()*_0x45c076)[_0x517c23(0x29c)](0.01,0.99),_0x125523[_0x517c23(0x20e)]=0x1-(Math[_0x517c23(0x227)]()*_0x45c076*0x2)[_0x517c23(0x29c)](0x0,0.8),_0x125523[_0x517c23(0x413)]=0x1-(Math[_0x517c23(0x227)]()*_0x45c076*0x2)[_0x517c23(0x29c)](0x0,0.8);const _0x2b5f16=0.25,_0x46431b=0.05;_0x125523['_realX']=_0x46d489['_realX']+Math['random']()*_0x2b5f16+Math['random']()*_0x2b5f16-_0x2b5f16,_0x125523[_0x517c23(0x3f8)]=_0x46d489[_0x517c23(0x3f8)]+Math['random']()*_0x46431b+Math[_0x517c23(0x227)]()*_0x46431b-_0x46431b,_0x125523['z']=0x3,this['_dustCloudSprites'][_0x517c23(0x294)](_0x125523),this[_0x517c23(0x3aa)][_0x517c23(0x467)](_0x125523);},Spriteset_Map[_0x291ba2(0x371)][_0x291ba2(0x240)]=function(){const _0xd0f94c=_0x291ba2,_0x1e0806=[];for(const _0x29a604 of this[_0xd0f94c(0x1c5)]){if(!_0x29a604)continue;this[_0xd0f94c(0x1f9)](_0x29a604);if(_0x29a604[_0xd0f94c(0x2fb)]<=0x0)_0x1e0806[_0xd0f94c(0x294)](_0x29a604);}for(const _0x3afbda of _0x1e0806){if(_0xd0f94c(0x204)!==_0xd0f94c(0x204)){let _0x315541=_0x263087[_0xd0f94c(0x1b4)](_0x476651[_0xd0f94c(0x211)](this[_0xd0f94c(0x472)]/0x2),0x1);while(_0x315541--)this['createDustCloud']();}else this[_0xd0f94c(0x3aa)]['removeChild'](_0x3afbda),this['_dustCloudSprites'][_0xd0f94c(0x300)](_0x3afbda);}},Spriteset_Map[_0x291ba2(0x371)][_0x291ba2(0x1f9)]=function(_0x599c7e){const _0x366a35=_0x291ba2,_0x1a37e6=_0x599c7e[_0x366a35(0x2fb)],_0x2d2cbf=$gameMap[_0x366a35(0x44d)](),_0x196884=$gameMap['tileHeight']();_0x599c7e['x']=Math[_0x366a35(0x421)]($gameMap[_0x366a35(0x369)](_0x599c7e[_0x366a35(0x308)])*_0x2d2cbf+_0x2d2cbf/0x2),_0x599c7e['y']=Math['floor']($gameMap['adjustY'](_0x599c7e[_0x366a35(0x3f8)])*_0x196884+_0x196884),_0x599c7e[_0x366a35(0x23c)]['x']=(_0x599c7e[_0x366a35(0x23c)]['x']*(_0x1a37e6-0x1)+_0x599c7e[_0x366a35(0x20e)])/_0x1a37e6,_0x599c7e[_0x366a35(0x23c)]['y']=(_0x599c7e[_0x366a35(0x23c)]['y']*(_0x1a37e6-0x1)+_0x599c7e[_0x366a35(0x413)])/_0x1a37e6,_0x599c7e['opacity']=_0x599c7e['opacity']*(_0x1a37e6-0x1)/_0x1a37e6,_0x599c7e[_0x366a35(0x2fb)]--;},Spriteset_Map[_0x291ba2(0x371)]['createFootprintBasics']=function(){const _0x447ef8=_0x291ba2;this['_footprintSprites']=this[_0x447ef8(0x45a)]||[];},Spriteset_Map[_0x291ba2(0x371)][_0x291ba2(0x1a4)]=function(_0xc6173d){const _0x3c2a8d=_0x291ba2,_0x152bd1=this[_0x3c2a8d(0x1b3)](_0xc6173d);if(!_0x152bd1)return;const _0xdaa42d=new Sprite_Footprint(_0xc6173d);this[_0x3c2a8d(0x45a)]['push'](_0xdaa42d),this[_0x3c2a8d(0x3aa)][_0x3c2a8d(0x467)](_0xdaa42d);},Spriteset_Map[_0x291ba2(0x371)][_0x291ba2(0x295)]=function(){const _0x87f799=_0x291ba2,_0x2c4a29=[];for(const _0x247ead of this[_0x87f799(0x45a)]){if(_0x87f799(0x30a)!==_0x87f799(0x21d)){if(!_0x247ead)continue;this[_0x87f799(0x3c7)](_0x247ead);if(_0x247ead['_duration']<=0x0)_0x2c4a29['push'](_0x247ead);}else{this[_0x87f799(0x397)]()[_0x87f799(0x202)]=_0x479ffa;if(!_0x2d808e['isSceneMap']())return;if(!_0x373264)return;if(!_0x591a2b)return;const _0x33d756=_0x58edaa['_scene'][_0x87f799(0x256)];if(_0x33d756){const _0x336b63=_0x33d756[_0x87f799(0x1b3)](this);_0x336b63&&_0x336b63[_0x87f799(0x253)]();}}}for(const _0x569f9f of _0x2c4a29){_0x87f799(0x478)!==_0x87f799(0x478)?(_0xe8d2e0[_0x87f799(0x193)]['Spriteset_Map_createLowerLayer'][_0x87f799(0x407)](this),this[_0x87f799(0x479)](),this[_0x87f799(0x3cc)](),this[_0x87f799(0x192)]()):(this[_0x87f799(0x3aa)][_0x87f799(0x1e1)](_0x569f9f),this[_0x87f799(0x45a)][_0x87f799(0x300)](_0x569f9f));}},Spriteset_Map[_0x291ba2(0x371)]['updateFootprintSprite']=function(_0xb99491){const _0x3daf40=_0x291ba2,_0x15808a=_0xb99491[_0x3daf40(0x2fb)];_0xb99491[_0x3daf40(0x2a0)]=_0xb99491[_0x3daf40(0x2a0)]*(_0x15808a-0x1)/_0x15808a,_0xb99491[_0x3daf40(0x2fb)]--;},Spriteset_Map[_0x291ba2(0x371)][_0x291ba2(0x192)]=function(){const _0x31614b=_0x291ba2;this[_0x31614b(0x27d)]=[],this[_0x31614b(0x491)]=[];},Spriteset_Map[_0x291ba2(0x371)][_0x291ba2(0x46d)]=function(){const _0x364575=_0x291ba2;if(!this[_0x364575(0x27d)])return;for(const _0x31b9da of this[_0x364575(0x491)]){if('NXehA'!==_0x364575(0x2c1)){if(!_0x31b9da)continue;this[_0x364575(0x491)][_0x364575(0x300)](_0x31b9da),this[_0x364575(0x3aa)][_0x364575(0x1e1)](_0x31b9da);}else this[_0x364575(0x1ef)]&&this[_0x364575(0x1ef)]--;}for(const _0x32408c of this[_0x364575(0x27d)]){if(_0x364575(0x2df)!=='DYDaX'){if(!_0x32408c)continue;if(_0x32408c[_0x364575(0x2a0)]>0x0)continue;this[_0x364575(0x27d)]['remove'](_0x32408c),this[_0x364575(0x491)][_0x364575(0x294)](_0x32408c);}else{if(this['isSmartRushing']())return!![];return _0x35ba50[_0x364575(0x193)][_0x364575(0x42d)][_0x364575(0x407)](this);}}};