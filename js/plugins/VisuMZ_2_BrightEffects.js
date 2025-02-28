//=============================================================================
// VisuStella MZ - Bright Effects
// VisuMZ_2_BrightEffects.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BrightEffects = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BrightEffects = VisuMZ.BrightEffects || {};
VisuMZ.BrightEffects.version = 1.10;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.10] [BrightEffects]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Bright_Effects_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * 
 * This RPG Maker MZ plugin allows you to add various bright effects to your
 * game's maps and battle system. These effects can make the game appear more
 * vivid, light, and gives you control over the color settings of a particular
 * map to make a more distinct feeling, too. The bright effects can be changed
 * midway through events in both maps and battles, too.
 *
 * Features include all (but not limited to) the following:
 * 
 * * A Bloom filter effect that can help soften the feel of a map by giving
 *   objects on the screen a slight hazy glow.
 * * Godrays can be used to show animated sunlight coming down from the sky
 *   above.
 * * The Color Adjustment filter allows you to alter the brightness, contrast,
 *   and saturation levels of your maps and battles.
 * * The Tilt Shift filter creates a blur at the top and bottom sections of the
 *   screen to give a sense of proximity blurring.
 * * Plugin Commands that allow you to adjust these settings on the go.
 * * Notetags for maps to alter the Bloom, Godray, and Color Adjustments
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
 * New Effects
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Bloom
 * 
 * This filter puts a faint (or large) glow around lighter-colored objects on
 * the map to give them a softer, hazy, brighter feeling.
 * 
 * Properties:
 *
 * Scale: To adjust the strength of the bloom. Higher values is more
 * intense brightness.
 *
 * Brightness: The brightness, lower value is more subtle brightness, higher
 * value is blown-out.
 *
 * Threshold: Defines how bright a color needs to be to affect bloom.
 *
 * ---
 * 
 * Blur
 * 
 * The blur filter makes the screen appear less focused and more fuzzy. Details
 * become harder to distinguish and the like.
 * 
 * Properties:
 * 
 * Blur: Adjusts the blur strength. For best results, use numbers between 0 and
 * 5 where 0 is no blur and higher numbers mean higher blur strength. There are
 * no default Plugin Parameter settings for the Blur strength as it will
 * automatically default to 0 for best results.
 * 
 * ---
 *
 * Godray
 * 
 * The Godray filter puts down rays of light coming from the sky at an angle.
 * This is often used to represent sunlight peaking from above the clouds.
 * 
 * Properties:
 *
 * Visible: If on, the godrays will be visible by default. If off, they won't.
 *
 * Speed: The speed at which the light flickers. Lower for slower rate.
 * Higher for faster speeds.
 *
 * Gain: General intensity of the effect.
 *
 * Lacunarity: The density of the fractal noise.
 *
 * Angle: The angle/light-source direction of the rays.
 *
 * ---
 *
 * Color Adjustment
 * 
 * The Color Adjustment filter allows you to control the colors on the screen
 * to be more/less bright, contrast more/less, and more/less saturated.
 * 
 * Properties:
 *
 * Brightness: Adjusts the overall brightness of the screen. Use lower numbers
 * to make it darker and higher numbers to increase the brightness.
 *
 * Contrast: Increases the separation between dark and bright. Darker colors
 * become darker. Lighter colors become lighter. Increase this number to make
 * the effect more intense or decrease it to lessen it.
 *
 * Saturate: Adjusts the intensity of color on the screen. User higher numbers
 * to make colors more intense and lower numbers to make it less.
 *
 * ---
 * 
 * Tilt Shift
 * 
 * The Tilt Shift filter creates a blur at the upper and lower edges of the
 * screen with varying degrees of pixelation blur and gradient blur.
 * 
 * Properties:
 * 
 * Pixel Blur: What is the default pixel blur amount for tilt shift? Smaller
 * values mean less blur. Higher values mean more blur.
 * 
 * Gradient Blur: What is the default gradient blur amount for tilt shift?
 * Smaller values mean less gradient. Higher values mean more gradient.
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
 * VisuMZ_1_OptionsCore
 * 
 * As of the VisuStella MZ Options Core v1.10 update, both the Bright Effects
 * and Horror Effects plugins will be affected by the "Special Effects" option
 * found under the Options Core's General Settings. If the "Special Effects"
 * option is set to OFF, then the filter effects applied by those plugins will
 * also be disabled. They will be reenabled when the option is set back to ON.
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
 * === Bloom-Related Notetags ===
 * 
 * ---
 *
 * <Bloom Scale: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Changes the bloom scale to x for map/battle.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Less bloom
 *   - Higher - More bloom
 *
 * ---
 *
 * <Bloom Brightness: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Changes the bloom brightness to x for map/battle
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Darker
 *   - Higher - Brighter
 *
 * ---
 *
 * <Bloom Threshold: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Changes the bloom threshold to x for map/battle.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Less picky
 *   - Higher - More picky
 *
 * ---
 *
 * <Bloom Horz Scale: x to y>
 * <Bloom Vert Scale: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Sets an adjusting scale when traveling left to right on the map
 *   (Horz) or up to down on the map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Less bloom
 *   - Higher - More bloom
 *
 * ---
 *
 * <Bloom Horz Brightness: x to y>
 * <Bloom Vert Brightness: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Sets an adjusting brightness when traveling left to right on the
 *   map (Horz) or up to down on the map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Darker
 *   - Higher - Brighter
 *
 * ---
 *
 * <Bloom Horz Threshold: x to y>
 * <Bloom Vert Threshold: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Sets an adjusting threshold when traveling left to right on the
 *   map (Horz) or up to down on the map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Less picky
 *   - Higher - More picky
 *
 * ---
 * 
 * === Blur-Related Notetags ===
 * 
 * ---
 * 
 * <Blur: x>
 * 
 * - Used for: Map Notetags and Troop Names
 * - Changes the blur strength used for the screen to 'x'.
 * - Replace 'x' with a number representing the blur strength. For best
 *   results, use numbers between 0 and 5 where 0 is no blur and higher numbers
 *   mean higher blur strength.
 * 
 * ---
 * 
 * === Godray-Related Notetags ===
 * 
 * ---
 *
 * <Godray>
 * <No Godray>
 *
 * - Used for: Map Notetags and Troop Names
 * - Changes if there will be a godray on the map/battle regardless of the
 *   default settings in the plugin parameters.
 *
 * ---
 *
 * <Godray Speed: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Sets the flickering speed of the rays.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Slower
 *   - Higher - Faster
 *
 * ---
 *
 * <Godray Gain: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Sets the gain/intensity of the rays.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Lighter
 *   - Higher - Intense
 *
 * ---
 *
 * <Godray Lacunarity: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Sets the lacunarity/density of the rays.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Less dense
 *   - Higher - More dense
 *
 * ---
 *
 * <Godray Angle: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Sets the angle of the rays.
 * - Replace 'x' with a number to represent the value. Use a negative or
 *   positive integer value.
 *   - Negative - Coming from the left
 *   - Positive - Coming from the right
 *
 * ---
 *
 * <Godray Horz Speed: x to y>
 * <Godray Vert Speed: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Adjusts godray speed going left to right on a map (Horz) or up
 *   to down on a map (Vert). 
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Slower
 *   - Higher - Faster
 *
 * ---
 *
 * <Godray Horz Gain: x to y>
 * <Godray Vert Gain: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Adjusts godray gain going left to right on a map (Horz) or up to
 *   down on a map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Lighter
 *   - Higher - Intense
 *
 * ---
 *
 * <Godray Horz Lacunarity: x to y>
 * <Godray Vert Lacunarity: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Adjusts godray lacunarity going left to right on a map (Horz) or
 *   up to down on a map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Less dense
 *   - Higher - More dense
 *
 * ---
 *
 * <Godray Horz Angle: x to y>
 * <Godray Vert Angle: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Adjusts godray angle going left to right on a map (Horz) or up
 *   to down on a map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use a negative or
 *   positive integer values.
 *   - Negative - Coming from the left
 *   - Positive - Coming from the right
 *
 * ---
 * 
 * === Color Adjust-Related Notetags ===
 * 
 * ---
 *
 * <Color Adjust Brightness: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Alters the screen brightness for the map/battle.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Darker
 *   - Higher - Brighter
 *
 * ---
 *
 * <Color Adjust Contrast: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Adjusts the screen contrast for the map/battle.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Less contrast
 *   - Higher - More contrast
 *
 * ---
 *
 * <Color Adjust Saturate: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Adjusts the screen saturation for the map/battle.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Darker
 *   - Higher - Brighter
 *
 * ---
 *
 * <Color Adjust Horz Brightness: x to y>
 * <Color Adjust Vert Brightness: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Alters the screen brightness when moving left to right on a map
 *   (Horz) or up to down on a map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Darker
 *   - Higher - Brighter
 *
 * ---
 *
 * <Color Adjust Horz Contrast: x to y>
 * <Color Adjust Vert Contrast: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Adjusts the screen contrast when moving left to right on a map
 *   (Horz) or up to down on a map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Less contrast
 *   - Higher - More contrast
 *
 * ---
 *
 * <Color Adjust Horz Saturate: x to y>
 * <Color Adjust Vert Saturate: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Adjusts the screen saturation when moving left to right on a map
 *   (Horz) or up to down on a map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Less intensity
 *   - Higher - More intensity
 *
 * ---
 * 
 * === Tilt Shift Notetags ===
 * 
 * ---
 * 
 * <Tilt Shift Pixel Blur: x>
 * 
 * - Used for: Map Notetags and Troop Names
 * - Adjusts the tilt shift filter's pixel blur amount for the map/battle.
 * - Replace 'x' with a number to represent the blur intensity.
 *   - Lower = less blur
 *   - Higher = more blur
 * 
 * ---
 * 
 * <Tilt Shift Gradient Blur: x>
 * 
 * - Used for: Map Notetags and Troop Names
 * - Adjusts the tilt shift filter's gradient blur amount for the map/battle.
 * - Replace 'x' with a number to represent the gradient blur distance.
 *   - Lower = less gradient
 *   - Higher = more gradient
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
 * === Bloom Plugin Commands ===
 * 
 * ---
 *
 * Bloom: Change Settings
 * - Change the Bloom filter settings for the screen.
 *
 *   Bloom Scale:
 *   - Change bloom scale for the screen.
 *
 *   Bloom Brightness:
 *   - Change bloom brightness for the screen.
 *
 *   Bloom Threshold:
 *   - Change bloom threshold for the screen.
 *
 *   Shift Duration:
 *   - The amount of time it takes for the change to occur.
 *
 * ---
 *
 * Bloom: Reset
 * - Reset the Bloom filter settings for the settings found in the Plugin
 *   Parameters or map notetags.
 *
 *   Shift Duration:
 *   - The amount of time it takes for the reset to occur.
 *
 * ---
 * 
 * === Blur Plugin Commands ===
 * 
 * ---
 * 
 * Blur: Change Settings
 * - Change the Blur filter settings for the screen.
 * 
 *   Blur Strength:
 *   - Change blur strength for the screen.
 *   - For best results, use numbers between 0 and 5  where 0 is no blur and
 *     higher numbers mean higher blur strength.
 * 
 *   Blur Duration:
 *   - The amount of time it takes for the change to occur.
 * 
 * ---
 * 
 * Blur: Reset
 * - Clears the Blur filter.
 * 
 *   Blur Duration:
 *   - The amount of time it takes for the reset to occur.
 * 
 * ---
 * 
 * === Godray Plugin Commands ===
 * 
 * ---
 *
 * Godray: Change Settings
 * - Change the Godray filter settings for the screen.
 *
 *   Visible?:
 *   - Show godrays on the screen?
 *   - Visibility changes are immediate.
 *
 *   Godray Speed:
 *   - Change godray speed for the screen.
 *
 *   Godray Gain:
 *   - Change godray gain for the screen.
 *
 *   Godray Lacunarity:
 *   - Change godray lacunarity for the screen.
 *
 *   Godray Angle:
 *   - Change godray angle for the screen.
 *
 *   Shift Duration:
 *   - The amount of time it takes for the change to occur.
 *   - Visibility changes are immediate.
 *
 * ---
 *
 * Godray: Reset
 * - Reset the Godray filter settings for the settings found in the Plugin
 *   Parameters or map notetags.
 *
 *   Shift Duration:
 *   - The amount of time it takes for the reset to occur.
 *   - Visibility changes are immediate.
 *
 * ---
 * 
 * === Color Adjust Plugin Commands ===
 * 
 * ---
 *
 * Color Adjust: Change Settings
 * - Change the Color Adjustment filter settings for the screen.
 *
 *   Adjust Brightness:
 *   - Change color adjust brightness for the screen.
 *
 *   Adjust Contrast:
 *   - Change color adjust contrast for the screen.
 *
 *   Adjust Saturation:
 *   - Change color adjust saturation for the screen.
 *
 *   Shift Duration:
 *   - The amount of time it takes for the change to occur.
 *
 * ---
 *
 * Color Adjust: Reset
 * - Reset the Color Adjustment filter settings for the settings found in the
 *   Plugin Parameters or map notetags.
 *
 *   Shift Duration:
 *   - The amount of time it takes for the reset to occur.
 *
 * ---
 * 
 * === Tilt Shift Plugin Commands ===
 * 
 * ---
 * 
 * Tilt Shift: Change Settings
 * - Change the Tilt Shift filter settings for the screen.
 * 
 *   Pixel Blur:
 *   - What is the default pixel blur amount for tilt shift?
 *   - Smaller = less blur. Higher = more blur.
 * 
 *   Gradient Blur:
 *   - What is the default gradient blur amount for tilt shift?
 *   - Smaller = less gradient. Higher = more gradient.
 * 
 *   Shift Duration:
 *   - The amount of time it takes for the change to occur.
 * 
 * ---
 * 
 * Tilt Shift: Reset
 * - Reset the Tilt Shift filter settings for the settings found in the
 *   Plugin Parameters or map notetags.
 * 
 *   Shift Duration:
 *   - The amount of time it takes for the change to occur.
 * 
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 * 
 * This section is for the general plugin parameter settings.
 * 
 * ---
 * 
 * General
 * 
 *   Apply Base-Only?
 *   - Base-Only excludes pictures, timers, and weather.
 *   - Whole includes the above.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Bloom Settings
 * ============================================================================
 *
 * There are two versions of these plugin parameters. One of them are for the
 * Map Defaults and the other is for the Battle Defaults. These settings are
 * applied to the map and battle scenes respectively and will serve as the
 * stock setting when no map notetags, troop name tags, or Plugin Commands have
 * been used to alter them.
 *
 * ---
 *
 * Bloom Settings
 * 
 *   Bloom Scale:
 *   - Default bloom scale for the screen unless changed through tags.
 * 
 *   Bloom Brightness:
 *   - Default bloom brightness for the screen unless changed through tags.
 * 
 *   Bloom Threshold:
 *   - Default bloom threshold for the screen unless changed through tags.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Godray Settings
 * ============================================================================
 *
 * There are two versions of these plugin parameters. One of them are for the
 * Map Defaults and the other is for the Battle Defaults. These settings are
 * applied to the map and battle scenes respectively and will serve as the
 * stock setting when no map notetags, troop name tags, or Plugin Commands have
 * been used to alter them.
 *
 * ---
 *
 * Godray Settings
 * 
 *   Default Visible?:
 *   - Show godrays on all screens by default unless changed through tags?
 * 
 *   Godray Speed:
 *   - Default godray speed for all screens unless changed through tags.
 * 
 *   Godray Gain:
 *   - Default godray gain for all screens unless changed through tags.
 * 
 *   Godray Lacunarity:
 *   - Default godray lacunarity for all screens unless changed through tags.
 * 
 *   Godray Angle:
 *   - Default godray angle for all screens unless changed through tags.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Adjust Settings
 * ============================================================================
 *
 * There are two versions of these plugin parameters. One of them are for the
 * Map Defaults and the other is for the Battle Defaults. These settings are
 * applied to the map and battle scenes respectively and will serve as the
 * stock setting when no map notetags, troop name tags, or Plugin Commands have
 * been used to alter them.
 *
 * ---
 *
 * Color Adjust Settings
 * 
 *   Adjust Brightness:
 *   - Default color adjust brightness for all screens unless changed
 *     through tags.
 * 
 *   Adjust Contrast:
 *   - Default color adjust contrast for all screens unless changed
 *     through tags.
 * 
 *   Adjust Saturation:
 *   - Default color adjust saturation for all screens unless changed
 *     through tags.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Tilt Shift Settings
 * ============================================================================
 *
 * There are two versions of these plugin parameters. One of them are for the
 * Map Defaults and the other is for the Battle Defaults. These settings are
 * applied to the map and battle scenes respectively and will serve as the
 * stock setting when no map notetags, troop name tags, or Plugin Commands have
 * been used to alter them.
 *
 * ---
 *
 * Tilt Shift Settings
 * 
 *   Pixel Blur:
 *   - What is the default pixel blur amount for tilt shift?
 *   - Smaller = less blur. Higher = more blur.
 * 
 *   Gradient Blur:
 *   - What is the default gradient blur amount for tilt shift?
 *   - Smaller = less gradient. Higher = more gradient.
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
 * Version 1.10: January 16, 2025
 * * Bug Fixes!
 * ** Fixed bug with Tilt Shift effect not applying correctly when exiting a
 *    menu upon reentering the map scene. Fix made by Olivia.
 * 
 * Version 1.09: October 17, 2024
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.08: June 13, 2024
 * * Bug Fixes!
 * ** Added a failsafe to prevent crashes when no focus target is found due to
 *    either changing map or a sprite is deleted. Fix made by Olivia.
 * 
 * Version 1.07: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Olivia and sponsored by Archeia:
 * *** Blur
 * **** The blur filter makes the screen appear less focused and more fuzzy.
 *      Details become harder to distinguish and the like.
 * **** Notetags and Plugin Commands added.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.06: October 13, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Olivia and sponsored by Archeia:
 * *** Tilt Shift
 * **** The Tilt Shift filter creates a blur at the upper and lower edges of
 *      the screen with varying degrees of pixelation blur and gradient blur.
 * **** Plugin Parameters, Notetags, and Plugin Commands added.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: April 28, 2022
 * * Bug Fixes!
 * ** No longer crashes with event test play. Fix made by Olivia.
 * 
 * Version 1.04: March 24, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features:
 * ** New Plugin Parameters added: "Apply Base-Only?"
 * *** Base-Only excludes pictures, timers, and weather.
 * *** Whole includes the above.
 * 
 * Version 1.03: April 2, 2021
 * * Bug Fixes!
 * ** Changing scenes while a filter change is in transition will automatically
 *    load up the changes made to the filter to prevent desynchronization.
 *    Fix made by Olivia.
 * 
 * Version 1.02: March 12, 2021
 * * Compatibility Update!
 * ** Added compatibility with the VisuStella MZ Options Core v1.10 update.
 * *** When the "Special Effects" option is set to OFF, the filters for this
 *     plugin will be shut off. They will be returned to normal when set to ON.
 * * Documentation Update!
 * ** Added the Options Core section to the "Extra Features" list.
 * 
 * Version 1.01: December 25, 2020
 * * Bug Fixes!
 * ** Bright effects from battle should no longer carry back over into the
 *    map scene. Fix made by Yanfly.
 *
 * Version 1.00: January 18, 2021
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
 * @command BloomChange
 * @text Bloom: Change Settings
 * @desc Change the Bloom filter settings for the screen.
 *
 * @arg Scale:num
 * @text Bloom Scale
 * @desc Change bloom scale for the screen.
 * @default 0.5
 *
 * @arg Brightness:num
 * @text Bloom Brightness
 * @desc Change bloom brightness for the screen.
 * @default 1.0
 *
 * @arg Threshold:num
 * @text Bloom Threshold
 * @desc Change bloom threshold for the screen.
 * @default 0.5
 *
 * @arg Duration:num
 * @text Shift Duration
 * @type number
 * @desc The amount of time it takes for the change to occur.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BloomReset
 * @text Bloom: Reset
 * @desc Reset the Bloom filter settings for the settings found in
 * the Plugin Parameters or map notetags.
 *
 * @arg Duration:num
 * @text Shift Duration
 * @type number
 * @desc The amount of time it takes for the reset to occur.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Blur
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BlurChange
 * @text Blur: Change Settings
 * @desc Change the Blur filter settings for the screen.
 *
 * @arg Blur:num
 * @text Blur Strength
 * @desc Change blur strength for the screen.
 * For best results, use numbers between 0 and 5.
 * @default 2.0
 *
 * @arg Duration:num
 * @text Blur Duration
 * @type number
 * @desc The amount of time it takes for the change to occur.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BlurReset
 * @text Blur: Reset
 * @desc Clears the Blur filter.
 *
 * @arg Duration:num
 * @text Blur Duration
 * @type number
 * @desc The amount of time it takes for the reset to occur.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Godray
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GodrayChange
 * @text Godray: Change Settings
 * @desc Change the Godray filter settings for the screen.
 *
 * @arg Visible:eval
 * @text Visible?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show godrays on the screen?
 * Visibility changes are immediate.
 * @default true
 *
 * @arg Speed:num
 * @text Godray Speed
 * @desc Change godray speed for the screen.
 * @default 0.01
 *
 * @arg Gain:num
 * @text Godray Gain
 * @desc Change godray gain for the screen.
 * @default 0.6
 *
 * @arg Lacunarity:num
 * @text Godray Lacunarity
 * @desc Change godray lacunarity for the screen.
 * @default 2.0
 *
 * @arg Angle:num
 * @text Godray Angle
 * @desc Change godray angle for the screen.
 * @default -30
 *
 * @arg Duration:num
 * @text Shift Duration
 * @type number
 * @desc The amount of time it takes for the change to occur.
 * Visibility changes are immediate.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GodrayReset
 * @text Godray: Reset
 * @desc Reset the Godray filter settings for the settings
 * found in the Plugin Parameters or map notetags.
 *
 * @arg Duration:num
 * @text Shift Duration
 * @type number
 * @desc The amount of time it takes for the reset to occur.
 * Visibility changes are immediate.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ColorAdjust
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ColorAdjustChange
 * @text Color Adjust: Change Settings
 * @desc Change the Color Adjustment filter settings for the screen.
 *
 * @arg Brightness:num
 * @text Adjust Brightness
 * @desc Change color adjust brightness for the screen.
 * @default 1.0
 *
 * @arg Contrast:num
 * @text Adjust Contrast
 * @desc Change color adjust contrast for the screen.
 * @default 0.0
 *
 * @arg Saturate:num
 * @text Adjust Saturation
 * @desc Change color adjust saturation for the screen.
 * @default 0.0
 *
 * @arg Duration:num
 * @text Shift Duration
 * @type number
 * @desc The amount of time it takes for the change to occur.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ColorAdjustReset
 * @text Color Adjust: Reset
 * @desc Reset the Color Adjustment filter settings for the settings
 * found in the Plugin Parameters or map notetags.
 *
 * @arg Duration:num
 * @text Shift Duration
 * @type number
 * @desc The amount of time it takes for the reset to occur.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_TiltShift
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TiltShiftChange
 * @text Tilt Shift: Change Settings
 * @desc Change the Tilt Shift filter settings for the screen.
 *
 * @arg Blur:num
 * @text Pixel Blur
 * @desc What is the default pixel blur amount for tilt shift?
 * Smaller = less blur. Higher = more blur.
 * @default 24
 *
 * @arg GradientBlur:num
 * @text Gradient Blur
 * @desc What is the default gradient blur amount for tilt shift?
 * Smaller = less gradient. Higher = more gradient.
 * @default 1000
 *
 * @arg Duration:num
 * @text Shift Duration
 * @type number
 * @desc The amount of time it takes for the change to occur.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TiltShiftReset
 * @text Tilt Shift: Reset
 * @desc Reset the Tilt Shift filter settings for the settings
 * found in the Plugin Parameters or map notetags.
 *
 * @arg Duration:num
 * @text Shift Duration
 * @type number
 * @desc The amount of time it takes for the reset to occur.
 * @default 60
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
 * @param BrightEffects
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Map
 * @text Map Defaults
 *
 * @param MapBaseFilter:eval
 * @text Apply Base-Only?
 * @parent Map
 * @type boolean
 * @on Base-Only
 * @off Apply Whole
 * @desc Base-Only excludes pictures, timers, and weather.
 * Whole includes the above.
 * @default true
 *
 * @param MapBloom:struct
 * @text Bloom Settings
 * @parent Map
 * @type struct<Bloom>
 * @desc Default bloom settings for all maps.
 * @default {"Scale:num":"0.5","Brightness:num":"1.0","Threshold:num":"0.5"}
 *
 * @param MapGodray:struct
 * @text Godray Settings
 * @parent Map
 * @type struct<Godray>
 * @desc Default Godray settings for all maps.
 * @default {"Visible:eval":"false","Speed:num":"0.01","Gain:num":"0.6","Lacunarity:num":"2.0","Angle:num":"-30"}
 *
 * @param MapColorAdjust:struct
 * @text Color Adjust Settings
 * @parent Map
 * @type struct<ColorAdjust>
 * @desc Default color adjustment settings for all maps.
 * @default {"Brightness:num":"1.0","Contrast:num":"0.0","Saturate:num":"0.0"}
 *
 * @param MapTiltShift:struct
 * @text Tilt Shift Settings
 * @parent Map
 * @type struct<TiltShift>
 * @desc Default tilt shift adjustment settings for all maps.
 * @default {"Blur:num":"24","GradientBlur:num":"1000"}
 * 
 * @param Battle
 * @text Battle Defaults
 *
 * @param BattleBaseFilter:eval
 * @text Apply Base-Only?
 * @parent Battle
 * @type boolean
 * @on Base-Only
 * @off Apply Whole
 * @desc Base-Only excludes pictures, timers, and weather.
 * Whole includes the above.
 * @default true
 *
 * @param BattleBloom:struct
 * @text Bloom Settings
 * @parent Battle
 * @type struct<Bloom>
 * @desc Default bloom settings for all battles.
 * @default {"Scale:num":"0.5","Brightness:num":"1.0","Threshold:num":"0.5"}
 *
 * @param BattleGodray:struct
 * @text Godray Settings
 * @parent Battle
 * @type struct<Godray>
 * @desc Default Godray settings for all battles.
 * @default {"Visible:eval":"false","Speed:num":"0.01","Gain:num":"0.6","Lacunarity:num":"2.0","Angle:num":"-30"}
 *
 * @param BattleColorAdjust:struct
 * @text Color Adjust Settings
 * @parent Battle
 * @type struct<ColorAdjust>
 * @desc Default color adjustment settings for all battles.
 * @default {"Brightness:num":"1.0","Contrast:num":"0.0","Saturate:num":"0.0"}
 *
 * @param BattleTiltShift:struct
 * @text Tilt Shift Settings
 * @parent Battle
 * @type struct<TiltShift>
 * @desc Default tilt shift adjustment settings for all battles.
 * @default {"Blur:num":"0","GradientBlur:num":"1600"}
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
 * Bloom Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Bloom:
 *
 * @param Scale:num
 * @text Bloom Scale
 * @desc Default bloom scale for the screen unless changed through tags.
 * @default 0.5
 *
 * @param Brightness:num
 * @text Bloom Brightness
 * @desc Default bloom brightness for the screen unless changed through tags.
 * @default 1.0
 *
 * @param Threshold:num
 * @text Bloom Threshold
 * @desc Default bloom threshold for the screen unless changed through tags.
 * @default 0.5
 *
 */
/* ----------------------------------------------------------------------------
 * Godray Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Godray:
 *
 * @param Visible:eval
 * @text Default Visible?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show godrays on all screens by default unless changed through tags?
 * @default false
 *
 * @param Speed:num
 * @text Godray Speed
 * @desc Default godray speed for all screens unless changed through tags.
 * @default 0.01
 *
 * @param Gain:num
 * @text Godray Gain
 * @desc Default godray gain for all screens unless changed through tags.
 * @default 0.6
 *
 * @param Lacunarity:num
 * @text Godray Lacunarity
 * @desc Default godray lacunarity for all screens unless changed through tags.
 * @default 2.0
 *
 * @param Angle:num
 * @text Godray Angle
 * @desc Default godray angle for all screens unless changed through tags.
 * @default -30
 *
 */
/* ----------------------------------------------------------------------------
 * Color Adjust Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ColorAdjust:
 *
 * @param Brightness:num
 * @text Adjust Brightness
 * @desc Default color adjust brightness for all screens unless changed through tags.
 * @default 1.0
 *
 * @param Contrast:num
 * @text Adjust Contrast
 * @desc Default color adjust contrast for all screens unless changed through tags.
 * @default 0.0
 *
 * @param Saturate:num
 * @text Adjust Saturation
 * @desc Default color adjust saturation for all screens unless changed through tags.
 * @default 0.0
 *
 */
/* ----------------------------------------------------------------------------
 * Tilt Shift Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TiltShift:
 *
 * @param Blur:num
 * @text Pixel Blur
 * @desc What is the default pixel blur amount for tilt shift?
 * Smaller = less blur. Higher = more blur.
 * @default 24
 *
 * @param GradientBlur:num
 * @text Gradient Blur
 * @desc What is the default gradient blur amount for tilt shift?
 * Smaller = less gradient. Higher = more gradient.
 * @default 1000
 *
 */
//=============================================================================

function _0x5ae2(){var _0x28df35=['MapColorAdjust','min','format','Brightness','8vDoeGB','setupBrightEffectsTiltShiftFilter','_BrightEffectsColorAdjustSettingsBattle','6417131nakMtC','return\x200','getBrightEffectsBlurSettings','gradientBlur','_BrightEffectsBlurFilter','filter','constructor','updateBrightEffectsColorAdjustFilter','_brightEffectsGodrayHorzSpeed','ARRAYJSON','Saturate','_BrightEffectsTiltShiftSettingsBattle','bloomScale','_brightEffectsBloomHorzBrightness','setMapEnhanceTiltShiftFilterY','_brightEffectsColorAdjustHorzSaturate','_brightEffectsBloomHorzScale','description','Game_Map_setup','Speed','Scale','ARRAYSTR','Duration','pixelBlur','1051726jEnfkQ','MapBaseFilter','updateMapBrightEffectsAdvBloom','_brightEffectsColorAdjustVertBrightness','100eNpNqZ','setupBrightEffectsFilters','_BrightEffectsAdvBloomFilter','saturate','currentContrast','setup','setBrightEffectsAdvBloomSettings','Scene_Boot_onDatabaseLoaded','updateBrightEffectsGodrayFilter','match','_brightEffectsGodrayHorzAngle','brightEffectsBaseOnly','max','trim','createBrightEffectsBlurFilter','getTiltShiftFilter','updateBrightEffectsTiltShiftFilterProperties','getBrightEffectsAdvBloomSettings','width','createOverallFilters','STRUCT','contrast','_brightEffectsGodrayVertGain','BattleBaseFilter','MapBloom','start','Game_Player_update','updateBrightEffectsFilters','screenY','_BrightEffectsGodraySettingsMap','_scene','updateMapBrightEffects','getBrightEffectsTiltShiftSettings','_BrightEffectsGodrayFilter','setBrightEffectsBlurSettings','lacunarity','tileFocus','toUpperCase','TILT_SHIFT_MAP_FILTER','Settings','currentSaturate','_BrightEffectsBlurSettingsBattle','getBrightEffectsColorAdjustSettings','createBrightEffectsFilters','getBrightEffectsGodraySettings','181518yMiSXI','_BrightEffectsAdvBloomSettingsBattle','map','_BrightEffectsColorAdjustSettingsMap','GradientBlur','currentPixelBlur','_brightEffectsBloomVertThreshold','Scene_Battle_start','registerCommand','prototype','Gain','_brightEffectsGodrayHorzGain','update','angle','tileHeight','_brightEffectsColorAdjustHorzContrast','end','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_brightEffectsBloomVertScale','brightness','_realY','EVAL','call','VisuMZ_3_MapCameraZoom','Visible','FUNC','setBrightEffectsColorAdjustSettings','ConvertParams','JSON','STR','currentGradientBlur','updateBrightEffectsAdvBloomFilter','5FGCaRL','_BrightEffectsAdvBloomSettingsMap','updateBrightEffectsBlurFilter','getMapEnhanceScreenY','includes','BattleTiltShift','10571946KrAxoA','ColorAdjustChange','_brightEffectsColorAdjustVertSaturate','threshold','createBrightEffectsGodrayFilter','ARRAYFUNC','locate','troop','blur','AdvancedBloomFilter','NUM','Threshold','setupBrightEffectsBlurFilter','onDatabaseLoaded','Blur','115917GRfMCI','setBrightEffectsTiltShiftSettings','BrightEffects','BRIGHT_EFFECTS_BASE_ONLY','_BrightEffectsColorAdjustFilter','mapCameraSettings','Contrast','setupBrightEffectsAdvBloomFilter','updateBrightEffectsTiltShiftFilter','_brightEffectsColorAdjustVertContrast','currentBrightness','_BrightEffectsBlurSettingsMap','duration','ARRAYEVAL','_brightEffectsBloomVertBrightness','createBrightEffectsTiltShiftFilter','ColorAdjustReset','gain','visible','GodrayFilter','Spriteset_Base_createOverallFilters','_realX','Spriteset_Base_update','BattleBloom','TiltShiftFilter','filters','updateMapBrightEffectsColorAdjust','_brightEffectsGodrayVertSpeed','BlurReset','status','setupBrightEffectsGodrayFilter','currentBlur','push','_brightEffectsGodrayVertLacunarity','MapGodray','BlurFilter','Angle','2290494WHEayV','TILT_SHIFT_BATTLE_FILTER','note','18369jUbzCj','createBrightEffectsColorAdjustFilter','time','setupBrightEffectsColorAdjustFilter','_brightEffectsGodrayVertAngle','findTargetSprite','_BrightEffectsGodraySettingsBattle','exit','ARRAYSTRUCT','name','setBrightEffectsGodraySettings','_brightEffectsColorAdjustHorzBrightness','_BrightEffectsTiltShiftFilter','ColorMatrixFilter','_baseSprite','parse','BloomChange','Lacunarity','isSceneBattle','Game_CharacterBase_locate','_brightEffectsGodrayHorzLacunarity','parameters','BattleGodray','specialEffects','height','6150IcGRJf','_brightEffectsBloomHorzThreshold','speed','_BrightEffectsTiltShiftSettingsMap'];_0x5ae2=function(){return _0x28df35;};return _0x5ae2();}var _0x5511ce=_0x41d1;(function(_0x3bbbba,_0x4011cc){var _0x23ffff=_0x41d1,_0xaaaca3=_0x3bbbba();while(!![]){try{var _0x3872ed=parseInt(_0x23ffff(0x1c6))/0x1+parseInt(_0x23ffff(0x195))/0x2+-parseInt(_0x23ffff(0x1fb))/0x3*(-parseInt(_0x23ffff(0x199))/0x4)+parseInt(_0x23ffff(0x1e6))/0x5*(parseInt(_0x23ffff(0x220))/0x6)+-parseInt(_0x23ffff(0x17d))/0x7*(-parseInt(_0x23ffff(0x17a))/0x8)+-parseInt(_0x23ffff(0x223))/0x9*(parseInt(_0x23ffff(0x172))/0xa)+-parseInt(_0x23ffff(0x1ec))/0xb;if(_0x3872ed===_0x4011cc)break;else _0xaaaca3['push'](_0xaaaca3['shift']());}catch(_0x20befb){_0xaaaca3['push'](_0xaaaca3['shift']());}}}(_0x5ae2,0xb8751));var label='BrightEffects',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x5511ce(0x182)](function(_0x416a3e){var _0x1fe8b6=_0x5511ce;return _0x416a3e[_0x1fe8b6(0x218)]&&_0x416a3e[_0x1fe8b6(0x18e)][_0x1fe8b6(0x1ea)]('['+label+']');})[0x0];function _0x41d1(_0x1bc0c0,_0x30e65c){var _0x5ae2fe=_0x5ae2();return _0x41d1=function(_0x41d145,_0x20d6c7){_0x41d145=_0x41d145-0x15d;var _0x2a0782=_0x5ae2fe[_0x41d145];return _0x2a0782;},_0x41d1(_0x1bc0c0,_0x30e65c);}VisuMZ[label][_0x5511ce(0x1c0)]=VisuMZ[label][_0x5511ce(0x1c0)]||{},VisuMZ[_0x5511ce(0x1e1)]=function(_0x2e1904,_0x1761e6){var _0x479e4f=_0x5511ce;for(const _0x5e9d2b in _0x1761e6){if(_0x5e9d2b[_0x479e4f(0x1a2)](/(.*):(.*)/i)){const _0x477506=String(RegExp['$1']),_0x7d7983=String(RegExp['$2'])[_0x479e4f(0x1be)]()[_0x479e4f(0x1a6)]();let _0x110228,_0x22c68a,_0x53de29;switch(_0x7d7983){case _0x479e4f(0x1f6):_0x110228=_0x1761e6[_0x5e9d2b]!==''?Number(_0x1761e6[_0x5e9d2b]):0x0;break;case'ARRAYNUM':_0x22c68a=_0x1761e6[_0x5e9d2b]!==''?JSON[_0x479e4f(0x168)](_0x1761e6[_0x5e9d2b]):[],_0x110228=_0x22c68a[_0x479e4f(0x1c8)](_0x204e7f=>Number(_0x204e7f));break;case _0x479e4f(0x1db):_0x110228=_0x1761e6[_0x5e9d2b]!==''?eval(_0x1761e6[_0x5e9d2b]):null;break;case _0x479e4f(0x208):_0x22c68a=_0x1761e6[_0x5e9d2b]!==''?JSON[_0x479e4f(0x168)](_0x1761e6[_0x5e9d2b]):[],_0x110228=_0x22c68a['map'](_0xc3214d=>eval(_0xc3214d));break;case _0x479e4f(0x1e2):_0x110228=_0x1761e6[_0x5e9d2b]!==''?JSON['parse'](_0x1761e6[_0x5e9d2b]):'';break;case _0x479e4f(0x186):_0x22c68a=_0x1761e6[_0x5e9d2b]!==''?JSON[_0x479e4f(0x168)](_0x1761e6[_0x5e9d2b]):[],_0x110228=_0x22c68a[_0x479e4f(0x1c8)](_0x45b9ea=>JSON[_0x479e4f(0x168)](_0x45b9ea));break;case _0x479e4f(0x1df):_0x110228=_0x1761e6[_0x5e9d2b]!==''?new Function(JSON['parse'](_0x1761e6[_0x5e9d2b])):new Function(_0x479e4f(0x17e));break;case _0x479e4f(0x1f1):_0x22c68a=_0x1761e6[_0x5e9d2b]!==''?JSON[_0x479e4f(0x168)](_0x1761e6[_0x5e9d2b]):[],_0x110228=_0x22c68a[_0x479e4f(0x1c8)](_0x593ab3=>new Function(JSON['parse'](_0x593ab3)));break;case _0x479e4f(0x1e3):_0x110228=_0x1761e6[_0x5e9d2b]!==''?String(_0x1761e6[_0x5e9d2b]):'';break;case _0x479e4f(0x192):_0x22c68a=_0x1761e6[_0x5e9d2b]!==''?JSON[_0x479e4f(0x168)](_0x1761e6[_0x5e9d2b]):[],_0x110228=_0x22c68a['map'](_0x2f45b7=>String(_0x2f45b7));break;case _0x479e4f(0x1ad):_0x53de29=_0x1761e6[_0x5e9d2b]!==''?JSON[_0x479e4f(0x168)](_0x1761e6[_0x5e9d2b]):{},_0x110228=VisuMZ[_0x479e4f(0x1e1)]({},_0x53de29);break;case _0x479e4f(0x161):_0x22c68a=_0x1761e6[_0x5e9d2b]!==''?JSON[_0x479e4f(0x168)](_0x1761e6[_0x5e9d2b]):[],_0x110228=_0x22c68a['map'](_0x24feb4=>VisuMZ[_0x479e4f(0x1e1)]({},JSON['parse'](_0x24feb4)));break;default:continue;}_0x2e1904[_0x477506]=_0x110228;}}return _0x2e1904;},(_0x3d1606=>{var _0x5ea50c=_0x5511ce;const _0x49ae92=_0x3d1606['name'];for(const _0x502135 of dependencies){if(!Imported[_0x502135]){alert(_0x5ea50c(0x1d7)[_0x5ea50c(0x178)](_0x49ae92,_0x502135)),SceneManager[_0x5ea50c(0x160)]();break;}}const _0x6a0dfd=_0x3d1606[_0x5ea50c(0x18e)];if(_0x6a0dfd['match'](/\[Version[ ](.*?)\]/i)){const _0x3fc249=Number(RegExp['$1']);_0x3fc249!==VisuMZ[label]['version']&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x49ae92,_0x3fc249)),SceneManager[_0x5ea50c(0x160)]());}if(_0x6a0dfd[_0x5ea50c(0x1a2)](/\[Tier[ ](\d+)\]/i)){const _0xccb742=Number(RegExp['$1']);_0xccb742<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x5ea50c(0x178)](_0x49ae92,_0xccb742,tier)),SceneManager[_0x5ea50c(0x160)]()):tier=Math[_0x5ea50c(0x1a5)](_0xccb742,tier);}VisuMZ[_0x5ea50c(0x1e1)](VisuMZ[label][_0x5ea50c(0x1c0)],_0x3d1606[_0x5ea50c(0x16e)]);})(pluginData),PluginManager[_0x5511ce(0x1ce)](pluginData[_0x5511ce(0x162)],_0x5511ce(0x169),_0x12072e=>{var _0x48bd0a=_0x5511ce;VisuMZ[_0x48bd0a(0x1e1)](_0x12072e,_0x12072e);const _0x23c19b=$gameScreen['getBrightEffectsAdvBloomSettings']();_0x23c19b[_0x48bd0a(0x189)]=_0x12072e[_0x48bd0a(0x191)],_0x23c19b[_0x48bd0a(0x1d9)]=_0x12072e[_0x48bd0a(0x179)],_0x23c19b[_0x48bd0a(0x1ef)]=_0x12072e['Threshold'],_0x23c19b[_0x48bd0a(0x207)]=_0x12072e['Duration'],!SceneManager[_0x48bd0a(0x16b)]()&&($gameMap[_0x48bd0a(0x18a)]=undefined,$gameMap[_0x48bd0a(0x209)]=undefined);}),PluginManager[_0x5511ce(0x1ce)](pluginData[_0x5511ce(0x162)],'BloomReset',_0x11258c=>{var _0x31ba0d=_0x5511ce;VisuMZ[_0x31ba0d(0x1e1)](_0x11258c,_0x11258c);SceneManager[_0x31ba0d(0x16b)]()?$gameTroop[_0x31ba0d(0x202)]():$gameMap[_0x31ba0d(0x202)]();const _0x169ba4=$gameScreen[_0x31ba0d(0x1aa)]();_0x169ba4['duration']=_0x11258c[_0x31ba0d(0x193)];}),PluginManager[_0x5511ce(0x1ce)](pluginData[_0x5511ce(0x162)],'BlurChange',_0x489e81=>{var _0x29fee3=_0x5511ce;VisuMZ[_0x29fee3(0x1e1)](_0x489e81,_0x489e81);const _0x1bfef7=$gameScreen['getBrightEffectsBlurSettings']();_0x1bfef7['blur']=_0x489e81[_0x29fee3(0x1fa)],_0x1bfef7['duration']=_0x489e81[_0x29fee3(0x193)];}),PluginManager[_0x5511ce(0x1ce)](pluginData['name'],_0x5511ce(0x217),_0x47411c=>{var _0x2eb9fb=_0x5511ce;VisuMZ[_0x2eb9fb(0x1e1)](_0x47411c,_0x47411c);SceneManager['isSceneBattle']()?$gameTroop[_0x2eb9fb(0x1f8)]():$gameMap['setupBrightEffectsBlurFilter']();const _0x266afc=$gameScreen[_0x2eb9fb(0x17f)]();_0x266afc[_0x2eb9fb(0x207)]=_0x47411c['Duration'];}),PluginManager[_0x5511ce(0x1ce)](pluginData[_0x5511ce(0x162)],'GodrayChange',_0xc8c91a=>{var _0x38d384=_0x5511ce;VisuMZ[_0x38d384(0x1e1)](_0xc8c91a,_0xc8c91a);const _0x29ec50=$gameScreen['getBrightEffectsGodraySettings']();_0x29ec50['visible']=_0xc8c91a[_0x38d384(0x1de)],_0x29ec50[_0x38d384(0x174)]=_0xc8c91a['Speed'],_0x29ec50[_0x38d384(0x20c)]=_0xc8c91a['Gain'],_0x29ec50[_0x38d384(0x1bc)]=_0xc8c91a[_0x38d384(0x16a)],_0x29ec50[_0x38d384(0x1d3)]=_0xc8c91a[_0x38d384(0x21f)],_0x29ec50[_0x38d384(0x207)]=_0xc8c91a['Duration'],!SceneManager[_0x38d384(0x16b)]()&&($gameMap[_0x38d384(0x185)]=undefined,$gameMap[_0x38d384(0x216)]=undefined);}),PluginManager['registerCommand'](pluginData[_0x5511ce(0x162)],'GodrayReset',_0x3f9300=>{var _0x51515a=_0x5511ce;VisuMZ[_0x51515a(0x1e1)](_0x3f9300,_0x3f9300);SceneManager[_0x51515a(0x16b)]()?$gameTroop['setupBrightEffectsGodrayFilter']():$gameMap[_0x51515a(0x219)]();const _0x35c28d=$gameScreen[_0x51515a(0x1c5)]();_0x35c28d[_0x51515a(0x207)]=_0x3f9300[_0x51515a(0x193)];}),PluginManager[_0x5511ce(0x1ce)](pluginData['name'],_0x5511ce(0x1ed),_0x30d9d9=>{var _0x550175=_0x5511ce;VisuMZ[_0x550175(0x1e1)](_0x30d9d9,_0x30d9d9);const _0x3602d8=$gameScreen[_0x550175(0x1c3)]();_0x3602d8[_0x550175(0x1d9)]=_0x30d9d9[_0x550175(0x179)],_0x3602d8['contrast']=_0x30d9d9[_0x550175(0x201)],_0x3602d8[_0x550175(0x19c)]=_0x30d9d9['Saturate'],_0x3602d8[_0x550175(0x207)]=_0x30d9d9[_0x550175(0x193)],!SceneManager['isSceneBattle']()&&($gameMap[_0x550175(0x18c)]=undefined,$gameMap[_0x550175(0x1ee)]=undefined);}),PluginManager[_0x5511ce(0x1ce)](pluginData[_0x5511ce(0x162)],_0x5511ce(0x20b),_0xc5ae64=>{var _0x4a157b=_0x5511ce;VisuMZ[_0x4a157b(0x1e1)](_0xc5ae64,_0xc5ae64);SceneManager[_0x4a157b(0x16b)]()?$gameTroop[_0x4a157b(0x226)]():$gameMap[_0x4a157b(0x226)]();const _0x52942f=$gameScreen[_0x4a157b(0x1c3)]();_0x52942f['duration']=_0xc5ae64[_0x4a157b(0x193)];}),PluginManager[_0x5511ce(0x1ce)](pluginData[_0x5511ce(0x162)],'TiltShiftChange',_0x59dd91=>{var _0x46e7bd=_0x5511ce;VisuMZ[_0x46e7bd(0x1e1)](_0x59dd91,_0x59dd91);const _0x3995ec=$gameScreen[_0x46e7bd(0x1b9)]();_0x3995ec[_0x46e7bd(0x194)]=_0x59dd91[_0x46e7bd(0x1fa)],_0x3995ec['gradientBlur']=_0x59dd91[_0x46e7bd(0x1ca)],_0x3995ec['duration']=_0x59dd91[_0x46e7bd(0x193)];}),PluginManager[_0x5511ce(0x1ce)](pluginData['name'],'TiltShiftReset',_0x4a2d65=>{var _0x37302c=_0x5511ce;VisuMZ[_0x37302c(0x1e1)](_0x4a2d65,_0x4a2d65);SceneManager[_0x37302c(0x16b)]()?$gameTroop[_0x37302c(0x17b)]():$gameMap[_0x37302c(0x17b)]();const _0x49b4fb=$gameScreen[_0x37302c(0x1b9)]();_0x49b4fb['duration']=_0x4a2d65[_0x37302c(0x193)];}),SceneManager[_0x5511ce(0x16b)]=function(){var _0x2d3e77=_0x5511ce;return this['_scene']&&this[_0x2d3e77(0x1b7)]['constructor']===Scene_Battle;},SceneManager['isSceneMap']=function(){var _0x4197c7=_0x5511ce;return this[_0x4197c7(0x1b7)]&&this[_0x4197c7(0x1b7)][_0x4197c7(0x183)]===Scene_Map;},Game_Screen[_0x5511ce(0x1cf)][_0x5511ce(0x19f)]=function(_0x1d50a3,_0x18b708,_0x4859b0,_0x17f0a6){var _0x55e4b5=_0x5511ce;SceneManager[_0x55e4b5(0x16b)]()?this[_0x55e4b5(0x1c7)]={'bloomScale':_0x1d50a3,'brightness':_0x18b708,'threshold':_0x4859b0,'duration':_0x17f0a6||0x0}:this[_0x55e4b5(0x1e7)]={'bloomScale':_0x1d50a3,'brightness':_0x18b708,'threshold':_0x4859b0,'duration':_0x17f0a6||0x0};},Game_Screen[_0x5511ce(0x1cf)][_0x5511ce(0x1aa)]=function(){var _0x31b575=_0x5511ce;return SceneManager[_0x31b575(0x16b)]()?(this[_0x31b575(0x1c7)]===undefined&&$gameTroop[_0x31b575(0x202)](),this[_0x31b575(0x1c7)]):(this[_0x31b575(0x1e7)]===undefined&&$gameMap['setupBrightEffectsAdvBloomFilter'](),this[_0x31b575(0x1e7)]);},Game_Screen[_0x5511ce(0x1cf)][_0x5511ce(0x163)]=function(_0x2045c1,_0x4f2f4d,_0x39d46e,_0x388b87,_0x3604f0,_0x2319ce){var _0x3cc7dc=_0x5511ce;SceneManager['isSceneBattle']()?this[_0x3cc7dc(0x15f)]={'visible':_0x2045c1,'speed':_0x4f2f4d,'gain':_0x39d46e,'lacunarity':_0x388b87,'angle':_0x3604f0,'duration':_0x2319ce||0x0}:this[_0x3cc7dc(0x1b6)]={'visible':_0x2045c1,'speed':_0x4f2f4d,'gain':_0x39d46e,'lacunarity':_0x388b87,'angle':_0x3604f0,'duration':_0x2319ce||0x0};},Game_Screen[_0x5511ce(0x1cf)][_0x5511ce(0x1c5)]=function(){var _0x1dfdb3=_0x5511ce;return SceneManager['isSceneBattle']()?(this[_0x1dfdb3(0x15f)]===undefined&&$gameTroop['setupBrightEffectsGodrayFilter'](),this['_BrightEffectsGodraySettingsBattle']):(this['_BrightEffectsGodraySettingsMap']===undefined&&$gameMap[_0x1dfdb3(0x219)](),this[_0x1dfdb3(0x1b6)]);},Game_Screen[_0x5511ce(0x1cf)][_0x5511ce(0x1e0)]=function(_0x167fb4,_0x526bcc,_0xc78d1c,_0x17020c){var _0x51e65d=_0x5511ce;SceneManager[_0x51e65d(0x16b)]()?this[_0x51e65d(0x17c)]={'brightness':_0x167fb4,'contrast':_0x526bcc,'saturate':_0xc78d1c,'duration':_0x17020c||0x0}:this['_BrightEffectsColorAdjustSettingsMap']={'brightness':_0x167fb4,'contrast':_0x526bcc,'saturate':_0xc78d1c,'duration':_0x17020c||0x0};},Game_Screen[_0x5511ce(0x1cf)][_0x5511ce(0x1c3)]=function(){var _0x3cce23=_0x5511ce;return SceneManager['isSceneBattle']()?(this[_0x3cce23(0x17c)]===undefined&&$gameTroop['setupBrightEffectsColorAdjustFilter'](),this[_0x3cce23(0x17c)]):(this[_0x3cce23(0x1c9)]===undefined&&$gameMap[_0x3cce23(0x226)](),this[_0x3cce23(0x1c9)]);},Game_Screen[_0x5511ce(0x1cf)][_0x5511ce(0x1fc)]=function(_0x5ed1f2,_0x2c4ba8,_0x15dc9f){var _0x31e60c=_0x5511ce;SceneManager[_0x31e60c(0x16b)]()?this['_BrightEffectsTiltShiftSettingsBattle']={'pixelBlur':_0x5ed1f2,'gradientBlur':_0x2c4ba8,'duration':_0x15dc9f||0x0}:this[_0x31e60c(0x175)]={'pixelBlur':_0x5ed1f2,'gradientBlur':_0x2c4ba8,'duration':_0x15dc9f||0x0};},Game_Screen[_0x5511ce(0x1cf)][_0x5511ce(0x1b9)]=function(){var _0x25d02b=_0x5511ce;return SceneManager[_0x25d02b(0x16b)]()?(this[_0x25d02b(0x188)]===undefined&&$gameTroop[_0x25d02b(0x17b)](),this['_BrightEffectsTiltShiftSettingsBattle']):(this[_0x25d02b(0x175)]===undefined&&$gameMap[_0x25d02b(0x17b)](),this[_0x25d02b(0x175)]);},Game_Screen[_0x5511ce(0x1cf)]['setBrightEffectsBlurSettings']=function(_0x4ef610,_0x410add){var _0x1d6d06=_0x5511ce;SceneManager[_0x1d6d06(0x16b)]()?this['_BrightEffectsBlurSettingsBattle']={'blur':_0x4ef610||0x0,'duration':_0x410add||0x0}:this[_0x1d6d06(0x206)]={'blur':_0x4ef610||0x0,'duration':_0x410add||0x0};},Game_Screen[_0x5511ce(0x1cf)]['getBrightEffectsBlurSettings']=function(){var _0xf4efde=_0x5511ce;return SceneManager[_0xf4efde(0x16b)]()?(this[_0xf4efde(0x1c2)]===undefined&&$gameTroop['setupBrightEffectsBlurFilter'](),this[_0xf4efde(0x1c2)]):(this[_0xf4efde(0x206)]===undefined&&$gameMap[_0xf4efde(0x1f8)](),this['_BrightEffectsBlurSettingsMap']);},VisuMZ[_0x5511ce(0x1fd)][_0x5511ce(0x1cd)]=Scene_Battle[_0x5511ce(0x1cf)][_0x5511ce(0x1b2)],Scene_Battle[_0x5511ce(0x1cf)][_0x5511ce(0x1b2)]=function(){var _0x4614c7=_0x5511ce;VisuMZ[_0x4614c7(0x1fd)][_0x4614c7(0x1cd)]['call'](this),$gameTroop['setupBrightEffectsFilters']();},Game_Troop[_0x5511ce(0x1cf)][_0x5511ce(0x19a)]=function(){var _0x3aca7d=_0x5511ce;this[_0x3aca7d(0x202)](),this[_0x3aca7d(0x219)](),this['setupBrightEffectsColorAdjustFilter'](),this[_0x3aca7d(0x17b)](),this[_0x3aca7d(0x1f8)]();},Game_Troop[_0x5511ce(0x1cf)][_0x5511ce(0x202)]=function(){var _0x2bf2b4=_0x5511ce;const _0x908743=VisuMZ['BrightEffects'][_0x2bf2b4(0x1c0)][_0x2bf2b4(0x212)];var _0x34c69a=_0x908743[_0x2bf2b4(0x191)],_0x14f785=_0x908743[_0x2bf2b4(0x179)],_0x97f1db=_0x908743[_0x2bf2b4(0x1f7)];if(!!this['troop']()){var _0x1b9dcb=this[_0x2bf2b4(0x1f3)]()[_0x2bf2b4(0x162)];if(_0x1b9dcb[_0x2bf2b4(0x1a2)](/<BLOOM SCALE: (.*)>/i))var _0x34c69a=Number(RegExp['$1'])||0x0;if(_0x1b9dcb[_0x2bf2b4(0x1a2)](/<BLOOM BRIGHTNESS: (.*)>/i))var _0x14f785=Number(RegExp['$1'])||0x0;if(_0x1b9dcb[_0x2bf2b4(0x1a2)](/<BLOOM THRESHOLD: (.*)>/i))var _0x97f1db=Number(RegExp['$1'])||0x0;}$gameScreen[_0x2bf2b4(0x19f)](_0x34c69a,_0x14f785,_0x97f1db,0x0);},Game_Troop[_0x5511ce(0x1cf)][_0x5511ce(0x219)]=function(){var _0x17fd52=_0x5511ce;const _0x46e505=VisuMZ['BrightEffects'][_0x17fd52(0x1c0)][_0x17fd52(0x16f)];var _0x133886=_0x46e505[_0x17fd52(0x1de)],_0x54f91f=_0x46e505[_0x17fd52(0x190)],_0x5ebe46=_0x46e505[_0x17fd52(0x1d0)],_0x977e89=_0x46e505['Lacunarity'],_0x17e0f6=_0x46e505[_0x17fd52(0x21f)];if(!!this['troop']()){var _0x996660=this[_0x17fd52(0x1f3)]()['name'];if(_0x996660[_0x17fd52(0x1a2)](/<GODRAY>/i))_0x133886=!![];else _0x996660['match'](/<NO GODRAY>/i)&&(_0x133886=![]);_0x996660['match'](/<GODRAY SPEED: (.*)>/i)&&(_0x54f91f=Number(RegExp['$1'])||0x0),_0x996660[_0x17fd52(0x1a2)](/<GODRAY GAIN: (.*)>/i)&&(_0x5ebe46=Number(RegExp['$1'])||0x0),_0x996660[_0x17fd52(0x1a2)](/<GODRAY LACUNARITY: (.*)>/i)&&(_0x977e89=Number(RegExp['$1'])||0x0),_0x996660['match'](/<GODRAY ANGLE: (.*)>/i)&&(_0x17e0f6=Number(RegExp['$1'])||0x0);}$gameScreen[_0x17fd52(0x163)](_0x133886,_0x54f91f,_0x5ebe46,_0x977e89,_0x17e0f6,0x0);},Game_Troop[_0x5511ce(0x1cf)]['setupBrightEffectsColorAdjustFilter']=function(){var _0x57ddfa=_0x5511ce;const _0x234a77=VisuMZ['BrightEffects'][_0x57ddfa(0x1c0)]['BattleColorAdjust'];var _0x5c147f=_0x234a77[_0x57ddfa(0x179)],_0x27ba05=_0x234a77['Contrast'],_0x16b826=_0x234a77['Saturate'];if(!!this['troop']()){var _0x3386cc=this['troop']()['name'];if(_0x3386cc[_0x57ddfa(0x1a2)](/<COLOR ADJUST BRIGHTNESS: (.*)>/i))var _0x5c147f=Number(RegExp['$1'])||0x0;if(_0x3386cc[_0x57ddfa(0x1a2)](/<COLOR ADJUST CONTRAST: (.*)>/i))var _0x27ba05=Number(RegExp['$1'])||0x0;if(_0x3386cc[_0x57ddfa(0x1a2)](/<COLOR ADJUST SATURATE: (.*)>/i))var _0x16b826=Number(RegExp['$1'])||0x0;}$gameScreen[_0x57ddfa(0x1e0)](_0x5c147f,_0x27ba05,_0x16b826,0x0);},Game_Troop[_0x5511ce(0x1cf)][_0x5511ce(0x17b)]=function(){var _0x550516=_0x5511ce;const _0x5cb819=VisuMZ[_0x550516(0x1fd)][_0x550516(0x1c0)][_0x550516(0x1eb)];let _0x50b60e=_0x5cb819['Blur'],_0x58413c=_0x5cb819['GradientBlur'];if(!!this['troop']()){const _0x4ff569=this['troop']()[_0x550516(0x162)];_0x4ff569[_0x550516(0x1a2)](/<(?:TILTSHIFT|TILT SHIFT) PIXEL BLUR:[ ](\d+)>/i)&&(_0x50b60e=Number(RegExp['$1'])),_0x4ff569['match'](/<(?:TILTSHIFT|TILT SHIFT) (?:GRAD|GRADIENT) BLUR:[ ](\d+)>/i)&&(_0x58413c=Number(RegExp['$1']));}$gameScreen[_0x550516(0x1fc)](_0x50b60e,_0x58413c,0x0);},Game_Troop[_0x5511ce(0x1cf)]['setupBrightEffectsBlurFilter']=function(){var _0xaed7cd=_0x5511ce;let _0x2bbb19=0x0;if(!!this[_0xaed7cd(0x1f3)]()){const _0x3530d2=this['troop']()[_0xaed7cd(0x162)];_0x3530d2['match'](/<BLUR:[ ](.*?)>/i)&&(_0x2bbb19=Number(RegExp['$1']));}$gameScreen[_0xaed7cd(0x1bb)](_0x2bbb19,0x0);},VisuMZ[_0x5511ce(0x1fd)][_0x5511ce(0x18f)]=Game_Map[_0x5511ce(0x1cf)][_0x5511ce(0x19e)],Game_Map['prototype'][_0x5511ce(0x19e)]=function(_0x41a079){var _0x159d8c=_0x5511ce;VisuMZ[_0x159d8c(0x1fd)][_0x159d8c(0x18f)][_0x159d8c(0x1dc)](this,_0x41a079),!!$dataMap&&this[_0x159d8c(0x19a)]();},Game_Map[_0x5511ce(0x1cf)][_0x5511ce(0x19a)]=function(){var _0xd57b53=_0x5511ce;this[_0xd57b53(0x202)](),this[_0xd57b53(0x219)](),this[_0xd57b53(0x226)](),this[_0xd57b53(0x17b)](),$gamePlayer['updateMapBrightEffects']();},Game_Map[_0x5511ce(0x1cf)]['setupBrightEffectsAdvBloomFilter']=function(){var _0x43a78d=_0x5511ce;const _0x3f3dfe=VisuMZ[_0x43a78d(0x1fd)]['Settings'][_0x43a78d(0x1b1)];var _0xbaaee7=_0x3f3dfe['Scale'],_0x4e2f29=_0x3f3dfe[_0x43a78d(0x179)],_0x43ba20=_0x3f3dfe['Threshold'];this[_0x43a78d(0x18d)]=undefined,this[_0x43a78d(0x1d8)]=undefined,this[_0x43a78d(0x18a)]=undefined,this[_0x43a78d(0x209)]=undefined,this[_0x43a78d(0x173)]=undefined,this[_0x43a78d(0x1cc)]=undefined;if($dataMap){var _0x31e46e=$dataMap[_0x43a78d(0x222)]||'';if(_0x31e46e[_0x43a78d(0x1a2)](/<BLOOM SCALE: (.*)>/i))var _0xbaaee7=Number(RegExp['$1'])||0x0;if(_0x31e46e[_0x43a78d(0x1a2)](/<BLOOM BRIGHTNESS: (.*)>/i))var _0x4e2f29=Number(RegExp['$1'])||0x0;if(_0x31e46e[_0x43a78d(0x1a2)](/<BLOOM THRESHOLD: (.*)>/i))var _0x43ba20=Number(RegExp['$1'])||0x0;_0x31e46e['match'](/<BLOOM (?:HORZ|HORIZONTAL) SCALE: (.*) TO (.*)>/i)&&(this[_0x43a78d(0x18d)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this[_0x43a78d(0x1d8)]=undefined),_0x31e46e[_0x43a78d(0x1a2)](/<BLOOM (?:VERT|VERTICAL) SCALE: (.*) TO (.*)>/i)&&(this[_0x43a78d(0x18d)]=undefined,this[_0x43a78d(0x1d8)]=[Number(RegExp['$1']),Number(RegExp['$2'])]),_0x31e46e[_0x43a78d(0x1a2)](/<BLOOM (?:HORZ|HORIZONTAL) BRIGHTNESS: (.*) TO (.*)>/i)&&(this[_0x43a78d(0x18a)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this[_0x43a78d(0x209)]=undefined),_0x31e46e[_0x43a78d(0x1a2)](/<BLOOM (?:VERT|VERTICAL) BRIGHTNESS: (.*) TO (.*)>/i)&&(this[_0x43a78d(0x18a)]=undefined,this[_0x43a78d(0x209)]=[Number(RegExp['$1']),Number(RegExp['$2'])]),_0x31e46e[_0x43a78d(0x1a2)](/<BLOOM (?:HORZ|HORIZONTAL) THRESHOLD: (.*) TO (.*)>/i)&&(this[_0x43a78d(0x173)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this['_brightEffectsBloomVertThreshold']=undefined),_0x31e46e[_0x43a78d(0x1a2)](/<BLOOM (?:VERT|VERTICAL) THRESHOLD: (.*) TO (.*)>/i)&&(this[_0x43a78d(0x173)]=undefined,this[_0x43a78d(0x1cc)]=[Number(RegExp['$1']),Number(RegExp['$2'])]);}$gameScreen[_0x43a78d(0x19f)](_0xbaaee7,_0x4e2f29,_0x43ba20,0x0);},Game_Map[_0x5511ce(0x1cf)][_0x5511ce(0x219)]=function(){var _0x4493d5=_0x5511ce;const _0xf95aa9=VisuMZ[_0x4493d5(0x1fd)]['Settings'][_0x4493d5(0x21d)];var _0x2b75f0=_0xf95aa9[_0x4493d5(0x1de)],_0x275b39=_0xf95aa9[_0x4493d5(0x190)],_0x2c7eb2=_0xf95aa9[_0x4493d5(0x1d0)],_0x223070=_0xf95aa9['Lacunarity'],_0x19f82b=_0xf95aa9['Angle'];this['_brightEffectsGodrayHorzSpeed']=undefined,this[_0x4493d5(0x216)]=undefined,this[_0x4493d5(0x1d1)]=undefined,this[_0x4493d5(0x1af)]=undefined,this[_0x4493d5(0x16d)]=undefined,this['_brightEffectsGodrayVertLacunarity']=undefined,this['_brightEffectsGodrayHorzAngle']=undefined,this[_0x4493d5(0x15d)]=undefined;if($dataMap){var _0x458b69=$dataMap[_0x4493d5(0x222)]||'';if(_0x458b69[_0x4493d5(0x1a2)](/<GODRAY>/i))_0x2b75f0=!![];else _0x458b69[_0x4493d5(0x1a2)](/<NO GODRAY>/i)&&(_0x2b75f0=![]);_0x458b69[_0x4493d5(0x1a2)](/<GODRAY SPEED: (.*)>/i)&&(_0x275b39=Number(RegExp['$1'])||0x0),_0x458b69[_0x4493d5(0x1a2)](/<GODRAY GAIN: (.*)>/i)&&(_0x2c7eb2=Number(RegExp['$1'])||0x0),_0x458b69[_0x4493d5(0x1a2)](/<GODRAY LACUNARITY: (.*)>/i)&&(_0x223070=Number(RegExp['$1'])||0x0),_0x458b69[_0x4493d5(0x1a2)](/<GODRAY ANGLE: (.*)>/i)&&(_0x19f82b=Number(RegExp['$1'])||0x0),_0x458b69[_0x4493d5(0x1a2)](/<GODRAY (?:HORZ|HORIZONTAL) SPEED: (.*) TO (.*)>/i)&&(this[_0x4493d5(0x185)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this[_0x4493d5(0x216)]=undefined),_0x458b69[_0x4493d5(0x1a2)](/<GODRAY (?:VERT|VERTICAL) SPEED: (.*) TO (.*)>/i)&&(this[_0x4493d5(0x185)]=undefined,this[_0x4493d5(0x216)]=[Number(RegExp['$1']),Number(RegExp['$2'])]),_0x458b69[_0x4493d5(0x1a2)](/<GODRAY (?:HORZ|HORIZONTAL) GAIN: (.*) TO (.*)>/i)&&(this[_0x4493d5(0x1d1)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this[_0x4493d5(0x1af)]=undefined),_0x458b69[_0x4493d5(0x1a2)](/<GODRAY (?:VERT|VERTICAL) GAIN: (.*) TO (.*)>/i)&&(this[_0x4493d5(0x1d1)]=undefined,this['_brightEffectsGodrayVertGain']=[Number(RegExp['$1']),Number(RegExp['$2'])]),_0x458b69['match'](/<GODRAY (?:HORZ|HORIZONTAL) LACUNARITY: (.*) TO (.*)>/i)&&(this['_brightEffectsGodrayHorzLacunarity']=[Number(RegExp['$1']),Number(RegExp['$2'])],this[_0x4493d5(0x21c)]=undefined),_0x458b69[_0x4493d5(0x1a2)](/<GODRAY (?:VERT|VERTICAL) LACUNARITY: (.*) TO (.*)>/i)&&(this['_brightEffectsGodrayHorzLacunarity']=undefined,this['_brightEffectsGodrayVertLacunarity']=[Number(RegExp['$1']),Number(RegExp['$2'])]),_0x458b69['match'](/<GODRAY (?:HORZ|HORIZONTAL) ANGLE: (.*) TO (.*)>/i)&&(this['_brightEffectsGodrayHorzAngle']=[Number(RegExp['$1']),Number(RegExp['$2'])],this['_brightEffectsGodrayVertAngle']=undefined),_0x458b69['match'](/<GODRAY (?:VERT|VERTICAL) ANGLE: (.*) TO (.*)>/i)&&(this[_0x4493d5(0x1a3)]=undefined,this[_0x4493d5(0x15d)]=[Number(RegExp['$1']),Number(RegExp['$2'])]);}$gameScreen[_0x4493d5(0x163)](_0x2b75f0,_0x275b39,_0x2c7eb2,_0x223070,_0x19f82b,0x0);},Game_Map[_0x5511ce(0x1cf)]['setupBrightEffectsColorAdjustFilter']=function(){var _0x2bf988=_0x5511ce;const _0x3c5531=VisuMZ[_0x2bf988(0x1fd)][_0x2bf988(0x1c0)][_0x2bf988(0x176)];var _0x51f20f=_0x3c5531[_0x2bf988(0x179)],_0x4edfe9=_0x3c5531[_0x2bf988(0x201)],_0x18d808=_0x3c5531[_0x2bf988(0x187)];this['_brightEffectsColorAdjustHorzBrightness']=undefined,this[_0x2bf988(0x198)]=undefined,this['_brightEffectsColorAdjustHorzContrast']=undefined,this[_0x2bf988(0x204)]=undefined,this[_0x2bf988(0x18c)]=undefined,this[_0x2bf988(0x1ee)]=undefined;if($dataMap){var _0x3cf526=$dataMap['note']||'';if(_0x3cf526[_0x2bf988(0x1a2)](/<COLOR ADJUST BRIGHTNESS: (.*)>/i))var _0x51f20f=Number(RegExp['$1'])||0x0;if(_0x3cf526[_0x2bf988(0x1a2)](/<COLOR ADJUST CONTRAST: (.*)>/i))var _0x4edfe9=Number(RegExp['$1'])||0x0;if(_0x3cf526['match'](/<COLOR ADJUST SATURATE: (.*)>/i))var _0x18d808=Number(RegExp['$1'])||0x0;_0x3cf526[_0x2bf988(0x1a2)](/<COLOR ADJUST (?:HORZ|HORIZONTAL) BRIGHTNESS: (.*) TO (.*)>/i)&&(this[_0x2bf988(0x164)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this[_0x2bf988(0x198)]=undefined),_0x3cf526[_0x2bf988(0x1a2)](/<COLOR ADJUST (?:VERT|VERTICAL) BRIGHTNESS: (.*) TO (.*)>/i)&&(this['_brightEffectsColorAdjustHorzBrightness']=undefined,this[_0x2bf988(0x198)]=[Number(RegExp['$1']),Number(RegExp['$2'])]),_0x3cf526['match'](/<COLOR ADJUST (?:HORZ|HORIZONTAL) CONTRAST: (.*) TO (.*)>/i)&&(this[_0x2bf988(0x1d5)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this[_0x2bf988(0x204)]=undefined),_0x3cf526[_0x2bf988(0x1a2)](/<COLOR ADJUST (?:VERT|VERTICAL) CONTRAST: (.*) TO (.*)>/i)&&(this[_0x2bf988(0x1d5)]=undefined,this['_brightEffectsColorAdjustVertContrast']=[Number(RegExp['$1']),Number(RegExp['$2'])]),_0x3cf526[_0x2bf988(0x1a2)](/<COLOR ADJUST (?:HORZ|HORIZONTAL) SATURATE: (.*) TO (.*)>/i)&&(this[_0x2bf988(0x18c)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this[_0x2bf988(0x1ee)]=undefined),_0x3cf526[_0x2bf988(0x1a2)](/<COLOR ADJUST (?:VERT|VERTICAL) SATURATE: (.*) TO (.*)>/i)&&(this[_0x2bf988(0x18c)]=undefined,this[_0x2bf988(0x1ee)]=[Number(RegExp['$1']),Number(RegExp['$2'])]);}$gameScreen['setBrightEffectsColorAdjustSettings'](_0x51f20f,_0x4edfe9,_0x18d808,0x0);},Game_Map['prototype']['setupBrightEffectsTiltShiftFilter']=function(){var _0x3efb26=_0x5511ce;const _0x109575=VisuMZ['BrightEffects'][_0x3efb26(0x1c0)]['MapTiltShift'];let _0x4e87c8=_0x109575[_0x3efb26(0x1fa)],_0x7b010b=_0x109575[_0x3efb26(0x1ca)];if($dataMap){const _0x2c1589=$dataMap[_0x3efb26(0x222)]||'';_0x2c1589['match'](/<(?:TILTSHIFT|TILT SHIFT) PIXEL BLUR:[ ](\d+)>/i)&&(_0x4e87c8=Number(RegExp['$1'])),_0x2c1589[_0x3efb26(0x1a2)](/<(?:TILTSHIFT|TILT SHIFT) (?:GRAD|GRADIENT) BLUR:[ ](\d+)>/i)&&(_0x7b010b=Number(RegExp['$1']));}$gameScreen[_0x3efb26(0x1fc)](_0x4e87c8,_0x7b010b,0x0);},Game_Map[_0x5511ce(0x1cf)]['setupBrightEffectsBlurFilter']=function(){let _0x226729=0x0;if($dataMap){const _0x50bff2=$dataMap['note']||'';_0x50bff2['match'](/<BLUR:[ ](.*?)>/i)&&(_0x226729=Number(RegExp['$1']));}$gameScreen['setBrightEffectsBlurSettings'](_0x226729,0x0);},VisuMZ[_0x5511ce(0x1fd)][_0x5511ce(0x16c)]=Game_CharacterBase[_0x5511ce(0x1cf)][_0x5511ce(0x1f2)],Game_CharacterBase[_0x5511ce(0x1cf)]['locate']=function(_0x1432d5,_0x330888){var _0x2cd5e9=_0x5511ce;VisuMZ['BrightEffects'][_0x2cd5e9(0x16c)]['call'](this,_0x1432d5,_0x330888),this===$gamePlayer&&this['updateMapBrightEffects']();},VisuMZ[_0x5511ce(0x1fd)][_0x5511ce(0x1b3)]=Game_Player[_0x5511ce(0x1cf)][_0x5511ce(0x1d2)],Game_Player[_0x5511ce(0x1cf)][_0x5511ce(0x1d2)]=function(_0x251036){var _0x43844d=_0x5511ce;VisuMZ[_0x43844d(0x1fd)][_0x43844d(0x1b3)][_0x43844d(0x1dc)](this,_0x251036),this[_0x43844d(0x1b8)]();},Game_Player[_0x5511ce(0x1cf)]['updateMapBrightEffects']=function(){var _0x41401b=_0x5511ce;if(ConfigManager[_0x41401b(0x170)]===![])return;this['updateMapBrightEffectsAdvBloom'](),this['updateMapBrightEffectsGodray'](),this[_0x41401b(0x215)]();},Game_Player[_0x5511ce(0x1cf)][_0x5511ce(0x197)]=function(){var _0x1d9715=_0x5511ce,_0x1ac6ad=$gameScreen[_0x1d9715(0x1aa)](),_0x43d14e=_0x1ac6ad[_0x1d9715(0x189)],_0x4d70cc=_0x1ac6ad['brightness'],_0xceeca=_0x1ac6ad[_0x1d9715(0x1ef)];if($gameMap[_0x1d9715(0x18d)]!==undefined)var _0x451a88=$gameMap[_0x1d9715(0x18d)][0x0],_0x1da883=$gameMap[_0x1d9715(0x18d)][0x1]-_0x451a88,_0x5dc844=$gamePlayer[_0x1d9715(0x210)]/$gameMap['width'](),_0x43d14e=_0x451a88+_0x1da883*_0x5dc844;else{if($gameMap[_0x1d9715(0x1d8)]!==undefined)var _0x451a88=$gameMap['_brightEffectsBloomVertScale'][0x0],_0x1da883=$gameMap['_brightEffectsBloomVertScale'][0x1]-_0x451a88,_0x5dc844=$gamePlayer['_realY']/$gameMap[_0x1d9715(0x171)](),_0x43d14e=_0x451a88+_0x1da883*_0x5dc844;}if($gameMap[_0x1d9715(0x18a)]!==undefined)var _0x451a88=$gameMap[_0x1d9715(0x18a)][0x0],_0x1da883=$gameMap[_0x1d9715(0x18a)][0x1]-_0x451a88,_0x5dc844=$gamePlayer[_0x1d9715(0x210)]/$gameMap[_0x1d9715(0x1ab)](),_0x4d70cc=_0x451a88+_0x1da883*_0x5dc844;else{if($gameMap[_0x1d9715(0x209)]!==undefined)var _0x451a88=$gameMap[_0x1d9715(0x209)][0x0],_0x1da883=$gameMap[_0x1d9715(0x209)][0x1]-_0x451a88,_0x5dc844=$gamePlayer[_0x1d9715(0x1da)]/$gameMap[_0x1d9715(0x171)](),_0x4d70cc=_0x451a88+_0x1da883*_0x5dc844;}if($gameMap[_0x1d9715(0x173)]!==undefined)var _0x451a88=$gameMap[_0x1d9715(0x173)][0x0],_0x1da883=$gameMap[_0x1d9715(0x173)][0x1]-_0x451a88,_0x5dc844=$gamePlayer['_realX']/$gameMap[_0x1d9715(0x1ab)](),_0xceeca=_0x451a88+_0x1da883*_0x5dc844;else{if($gameMap[_0x1d9715(0x1cc)]!==undefined)var _0x451a88=$gameMap[_0x1d9715(0x1cc)][0x0],_0x1da883=$gameMap[_0x1d9715(0x1cc)][0x1]-_0x451a88,_0x5dc844=$gamePlayer[_0x1d9715(0x1da)]/$gameMap[_0x1d9715(0x171)](),_0xceeca=_0x451a88+_0x1da883*_0x5dc844;}$gameScreen['setBrightEffectsAdvBloomSettings'](_0x43d14e,_0x4d70cc,_0xceeca,_0x1ac6ad[_0x1d9715(0x207)]);},Game_Player[_0x5511ce(0x1cf)]['updateMapBrightEffectsGodray']=function(){var _0x48a061=_0x5511ce,_0x49c701=$gameScreen[_0x48a061(0x1c5)](),_0xf644ba=_0x49c701['visible'],_0x23cdd5=_0x49c701[_0x48a061(0x174)],_0x4cfa70=_0x49c701[_0x48a061(0x20c)],_0x132bc3=_0x49c701['lacunarity'],_0x5685eb=_0x49c701[_0x48a061(0x1d3)];if($gameMap[_0x48a061(0x185)]!==undefined)var _0x1f5efc=$gameMap['_brightEffectsGodrayHorzSpeed'][0x0],_0x43e946=$gameMap[_0x48a061(0x185)][0x1]-_0x1f5efc,_0x5c0eb1=$gamePlayer[_0x48a061(0x210)]/$gameMap[_0x48a061(0x1ab)](),_0x23cdd5=_0x1f5efc+_0x43e946*_0x5c0eb1;else{if($gameMap[_0x48a061(0x1d8)]!==undefined)var _0x1f5efc=$gameMap['_brightEffectsGodrayVertSpeed'][0x0],_0x43e946=$gameMap[_0x48a061(0x216)][0x1]-_0x1f5efc,_0x5c0eb1=$gamePlayer['_realY']/$gameMap[_0x48a061(0x171)](),_0x23cdd5=_0x1f5efc+_0x43e946*_0x5c0eb1;}if($gameMap[_0x48a061(0x1d1)]!==undefined)var _0x1f5efc=$gameMap[_0x48a061(0x1d1)][0x0],_0x43e946=$gameMap[_0x48a061(0x1d1)][0x1]-_0x1f5efc,_0x5c0eb1=$gamePlayer[_0x48a061(0x210)]/$gameMap[_0x48a061(0x1ab)](),_0x4cfa70=_0x1f5efc+_0x43e946*_0x5c0eb1;else{if($gameMap['_brightEffectsGodrayVertGain']!==undefined)var _0x1f5efc=$gameMap[_0x48a061(0x1af)][0x0],_0x43e946=$gameMap[_0x48a061(0x1af)][0x1]-_0x1f5efc,_0x5c0eb1=$gamePlayer[_0x48a061(0x1da)]/$gameMap[_0x48a061(0x171)](),_0x4cfa70=_0x1f5efc+_0x43e946*_0x5c0eb1;}if($gameMap[_0x48a061(0x16d)]!==undefined)var _0x1f5efc=$gameMap[_0x48a061(0x16d)][0x0],_0x43e946=$gameMap[_0x48a061(0x16d)][0x1]-_0x1f5efc,_0x5c0eb1=$gamePlayer[_0x48a061(0x210)]/$gameMap[_0x48a061(0x1ab)](),_0x132bc3=_0x1f5efc+_0x43e946*_0x5c0eb1;else{if($gameMap['_brightEffectsGodrayVertLacunarity']!==undefined)var _0x1f5efc=$gameMap[_0x48a061(0x21c)][0x0],_0x43e946=$gameMap[_0x48a061(0x21c)][0x1]-_0x1f5efc,_0x5c0eb1=$gamePlayer[_0x48a061(0x1da)]/$gameMap[_0x48a061(0x171)](),_0x132bc3=_0x1f5efc+_0x43e946*_0x5c0eb1;}if($gameMap[_0x48a061(0x1a3)]!==undefined)var _0x1f5efc=$gameMap[_0x48a061(0x1a3)][0x0],_0x43e946=$gameMap[_0x48a061(0x1a3)][0x1]-_0x1f5efc,_0x5c0eb1=$gamePlayer[_0x48a061(0x210)]/$gameMap[_0x48a061(0x1ab)](),_0x5685eb=_0x1f5efc+_0x43e946*_0x5c0eb1;else{if($gameMap[_0x48a061(0x15d)]!==undefined)var _0x1f5efc=$gameMap['_brightEffectsGodrayVertAngle'][0x0],_0x43e946=$gameMap[_0x48a061(0x15d)][0x1]-_0x1f5efc,_0x5c0eb1=$gamePlayer[_0x48a061(0x1da)]/$gameMap[_0x48a061(0x171)](),_0x5685eb=_0x1f5efc+_0x43e946*_0x5c0eb1;}$gameScreen[_0x48a061(0x163)](_0xf644ba,_0x23cdd5,_0x4cfa70,_0x132bc3,_0x5685eb,_0x49c701[_0x48a061(0x207)]);},Game_Player[_0x5511ce(0x1cf)][_0x5511ce(0x215)]=function(){var _0x351aed=_0x5511ce,_0x34cf10=$gameScreen[_0x351aed(0x1c3)](),_0x46cc66=_0x34cf10[_0x351aed(0x1d9)],_0x51bd22=_0x34cf10[_0x351aed(0x1ae)],_0x5bb85e=_0x34cf10[_0x351aed(0x19c)];if($gameMap[_0x351aed(0x164)]!==undefined)var _0x1c8842=$gameMap[_0x351aed(0x164)][0x0],_0x5d7eea=$gameMap[_0x351aed(0x164)][0x1]-_0x1c8842,_0x11c164=$gamePlayer['_realX']/$gameMap[_0x351aed(0x1ab)](),_0x46cc66=_0x1c8842+_0x5d7eea*_0x11c164;else{if($gameMap[_0x351aed(0x198)]!==undefined)var _0x1c8842=$gameMap[_0x351aed(0x198)][0x0],_0x5d7eea=$gameMap[_0x351aed(0x198)][0x1]-_0x1c8842,_0x11c164=$gamePlayer[_0x351aed(0x1da)]/$gameMap[_0x351aed(0x171)](),_0x46cc66=_0x1c8842+_0x5d7eea*_0x11c164;}if($gameMap[_0x351aed(0x1d5)]!==undefined)var _0x1c8842=$gameMap[_0x351aed(0x1d5)][0x0],_0x5d7eea=$gameMap[_0x351aed(0x1d5)][0x1]-_0x1c8842,_0x11c164=$gamePlayer[_0x351aed(0x210)]/$gameMap['width'](),_0x51bd22=_0x1c8842+_0x5d7eea*_0x11c164;else{if($gameMap[_0x351aed(0x204)]!==undefined)var _0x1c8842=$gameMap[_0x351aed(0x204)][0x0],_0x5d7eea=$gameMap[_0x351aed(0x204)][0x1]-_0x1c8842,_0x11c164=$gamePlayer[_0x351aed(0x1da)]/$gameMap[_0x351aed(0x171)](),_0x51bd22=_0x1c8842+_0x5d7eea*_0x11c164;}if($gameMap[_0x351aed(0x18c)]!==undefined)var _0x1c8842=$gameMap[_0x351aed(0x18c)][0x0],_0x5d7eea=$gameMap[_0x351aed(0x18c)][0x1]-_0x1c8842,_0x11c164=$gamePlayer['_realX']/$gameMap['width'](),_0x5bb85e=_0x1c8842+_0x5d7eea*_0x11c164;else{if($gameMap[_0x351aed(0x1ee)]!==undefined)var _0x1c8842=$gameMap[_0x351aed(0x1ee)][0x0],_0x5d7eea=$gameMap[_0x351aed(0x1ee)][0x1]-_0x1c8842,_0x11c164=$gamePlayer[_0x351aed(0x1da)]/$gameMap[_0x351aed(0x171)](),_0x5bb85e=_0x1c8842+_0x5d7eea*_0x11c164;}$gameScreen[_0x351aed(0x1e0)](_0x46cc66,_0x51bd22,_0x5bb85e,_0x34cf10['duration']);},Spriteset_Base[_0x5511ce(0x1fe)]=![],Spriteset_Map['BRIGHT_EFFECTS_BASE_ONLY']=VisuMZ[_0x5511ce(0x1fd)][_0x5511ce(0x1c0)][_0x5511ce(0x196)],Spriteset_Battle[_0x5511ce(0x1fe)]=VisuMZ[_0x5511ce(0x1fd)][_0x5511ce(0x1c0)][_0x5511ce(0x1b0)],Spriteset_Base[_0x5511ce(0x1cf)][_0x5511ce(0x1a4)]=function(){var _0x5eab99=_0x5511ce;return Spriteset_Base[_0x5eab99(0x1fe)];},Spriteset_Map[_0x5511ce(0x1cf)][_0x5511ce(0x1a4)]=function(){var _0xb0cc67=_0x5511ce;return Spriteset_Map[_0xb0cc67(0x1fe)];},Spriteset_Battle[_0x5511ce(0x1cf)][_0x5511ce(0x1a4)]=function(){return Spriteset_Battle['BRIGHT_EFFECTS_BASE_ONLY'];},VisuMZ[_0x5511ce(0x1fd)][_0x5511ce(0x20f)]=Spriteset_Base[_0x5511ce(0x1cf)]['createOverallFilters'],Spriteset_Base[_0x5511ce(0x1cf)][_0x5511ce(0x1ac)]=function(){var _0x4e67de=_0x5511ce;VisuMZ[_0x4e67de(0x1fd)]['Spriteset_Base_createOverallFilters']['call'](this),this[_0x4e67de(0x1c4)]();},VisuMZ['BrightEffects']['Spriteset_Base_update']=Spriteset_Base[_0x5511ce(0x1cf)][_0x5511ce(0x1d2)],Spriteset_Base[_0x5511ce(0x1cf)]['update']=function(){var _0xebf658=_0x5511ce;VisuMZ[_0xebf658(0x1fd)][_0xebf658(0x211)][_0xebf658(0x1dc)](this),this['updateBrightEffectsFilters']();},Spriteset_Map['prototype'][_0x5511ce(0x1e9)]=function(){var _0x242f84=_0x5511ce;const _0x5b41b7=$gameScreen['zoomScale']();let _0x274b4b=0x0;if(Imported[_0x242f84(0x1dd)]&&$gameScreen[_0x242f84(0x200)]()[_0x242f84(0x1bd)])_0x274b4b=Graphics['height']/0x2,_0x274b4b-=$gameMap[_0x242f84(0x1d4)]()*0.5*_0x5b41b7;else{const _0x1f4b9f=Imported[_0x242f84(0x1dd)]?$gameScreen['mapCameraFocusTarget'](!![]):$gamePlayer,_0x4d68b4=this[_0x242f84(0x15e)](_0x1f4b9f);_0x4d68b4&&(_0x274b4b=_0x1f4b9f[_0x242f84(0x1b5)]()*_0x5b41b7,_0x274b4b-=_0x4d68b4[_0x242f84(0x171)]*0.5,_0x274b4b-=_0x1f4b9f['shiftY']()*_0x5b41b7*0.5);}return _0x274b4b;},Spriteset_Base[_0x5511ce(0x1cf)][_0x5511ce(0x1e9)]=function(){return Graphics['height']/0x2;},Spriteset_Base[_0x5511ce(0x1cf)][_0x5511ce(0x1c4)]=function(){var _0x2f4c96=_0x5511ce;if(ConfigManager[_0x2f4c96(0x170)]===![])return;this['filters']=this[_0x2f4c96(0x214)]||[],this['createBrightEffectsAdvBloomFilter'](),this[_0x2f4c96(0x1f0)](),this[_0x2f4c96(0x224)](),this['createBrightEffectsTiltShiftFilter'](),this[_0x2f4c96(0x1a7)](),this[_0x2f4c96(0x1b4)]();},Spriteset_Base[_0x5511ce(0x1cf)][_0x5511ce(0x1b4)]=function(){var _0x20f6d6=_0x5511ce;this[_0x20f6d6(0x1e5)](),this[_0x20f6d6(0x1a1)](),this['updateBrightEffectsColorAdjustFilter'](),this['updateBrightEffectsTiltShiftFilter'](),this[_0x20f6d6(0x1e8)]();},Spriteset_Base['prototype']['createBrightEffectsAdvBloomFilter']=function(){var _0x75a0b9=_0x5511ce;if(!PIXI['filters'][_0x75a0b9(0x1f5)])return;this[_0x75a0b9(0x19b)]=new PIXI[(_0x75a0b9(0x214))][(_0x75a0b9(0x1f5))]();this[_0x75a0b9(0x1a4)]()?this[_0x75a0b9(0x167)]['filters'][_0x75a0b9(0x21b)](this[_0x75a0b9(0x19b)]):this[_0x75a0b9(0x214)]['push'](this['_BrightEffectsAdvBloomFilter']);var _0x55c884=$gameScreen[_0x75a0b9(0x1aa)]();_0x55c884&&_0x55c884[_0x75a0b9(0x207)]>0x0&&(this[_0x75a0b9(0x19b)][_0x75a0b9(0x189)]=_0x55c884[_0x75a0b9(0x189)],this[_0x75a0b9(0x19b)][_0x75a0b9(0x1d9)]=_0x55c884[_0x75a0b9(0x1d9)],this['_BrightEffectsAdvBloomFilter'][_0x75a0b9(0x1ef)]=_0x55c884[_0x75a0b9(0x1ef)]);},Spriteset_Base[_0x5511ce(0x1cf)]['updateBrightEffectsAdvBloomFilter']=function(){var _0x1fd462=_0x5511ce;if(!!this[_0x1fd462(0x19b)]){var _0x8e3fe1=$gameScreen['getBrightEffectsAdvBloomSettings'](),_0x3e64e7=_0x8e3fe1[_0x1fd462(0x207)];_0x3e64e7<=0x0?(this[_0x1fd462(0x19b)][_0x1fd462(0x189)]=_0x8e3fe1['bloomScale'],this['_BrightEffectsAdvBloomFilter'][_0x1fd462(0x1d9)]=_0x8e3fe1[_0x1fd462(0x1d9)],this['_BrightEffectsAdvBloomFilter']['threshold']=_0x8e3fe1[_0x1fd462(0x1ef)]):(_0x8e3fe1['duration']--,this[_0x1fd462(0x19b)][_0x1fd462(0x189)]=(this[_0x1fd462(0x19b)]['bloomScale']*(_0x3e64e7-0x1)+_0x8e3fe1[_0x1fd462(0x189)])/_0x3e64e7,this['_BrightEffectsAdvBloomFilter'][_0x1fd462(0x1d9)]=(this['_BrightEffectsAdvBloomFilter'][_0x1fd462(0x1d9)]*(_0x3e64e7-0x1)+_0x8e3fe1['brightness'])/_0x3e64e7,this[_0x1fd462(0x19b)][_0x1fd462(0x1ef)]=(this[_0x1fd462(0x19b)][_0x1fd462(0x1ef)]*(_0x3e64e7-0x1)+_0x8e3fe1['threshold'])/_0x3e64e7);}},Spriteset_Base[_0x5511ce(0x1cf)]['createBrightEffectsGodrayFilter']=function(){var _0x219d5b=_0x5511ce;if(!PIXI[_0x219d5b(0x214)][_0x219d5b(0x20e)])return;this['_BrightEffectsGodrayFilter']=new PIXI['filters']['GodrayFilter'](),this[_0x219d5b(0x1ba)]['enabled']=![],this[_0x219d5b(0x1ba)][_0x219d5b(0x225)]=0x0;this[_0x219d5b(0x1a4)]()?this[_0x219d5b(0x167)][_0x219d5b(0x214)]['push'](this[_0x219d5b(0x1ba)]):this[_0x219d5b(0x214)][_0x219d5b(0x21b)](this[_0x219d5b(0x1ba)]);var _0x4187d2=$gameScreen[_0x219d5b(0x1c5)]();_0x4187d2&&_0x4187d2[_0x219d5b(0x207)]>0x0&&(this[_0x219d5b(0x1ba)][_0x219d5b(0x174)]=_0x4187d2[_0x219d5b(0x174)],this['_BrightEffectsGodrayFilter']['gain']=_0x4187d2[_0x219d5b(0x20c)],this[_0x219d5b(0x1ba)][_0x219d5b(0x1bc)]=_0x4187d2[_0x219d5b(0x1bc)],this['_BrightEffectsGodrayFilter'][_0x219d5b(0x1d3)]=_0x4187d2[_0x219d5b(0x1d3)]);},Spriteset_Base[_0x5511ce(0x1cf)][_0x5511ce(0x1a1)]=function(){var _0x446eef=_0x5511ce;if(!!this[_0x446eef(0x1ba)]){var _0x2386a7=$gameScreen[_0x446eef(0x1c5)](),_0x4060ab=_0x2386a7[_0x446eef(0x207)];_0x4060ab<=0x0?(this[_0x446eef(0x1ba)]['speed']=_0x2386a7['speed'],this['_BrightEffectsGodrayFilter'][_0x446eef(0x20c)]=_0x2386a7[_0x446eef(0x20c)],this[_0x446eef(0x1ba)]['lacunarity']=_0x2386a7[_0x446eef(0x1bc)],this['_BrightEffectsGodrayFilter'][_0x446eef(0x1d3)]=_0x2386a7[_0x446eef(0x1d3)]):(_0x2386a7[_0x446eef(0x207)]--,this[_0x446eef(0x1ba)][_0x446eef(0x174)]=(this[_0x446eef(0x1ba)][_0x446eef(0x174)]*(_0x4060ab-0x1)+_0x2386a7[_0x446eef(0x174)])/_0x4060ab,this[_0x446eef(0x1ba)][_0x446eef(0x20c)]=(this[_0x446eef(0x1ba)][_0x446eef(0x20c)]*(_0x4060ab-0x1)+_0x2386a7['gain'])/_0x4060ab,this[_0x446eef(0x1ba)][_0x446eef(0x1bc)]=(this[_0x446eef(0x1ba)][_0x446eef(0x1bc)]*(_0x4060ab-0x1)+_0x2386a7[_0x446eef(0x1bc)])/_0x4060ab,this[_0x446eef(0x1ba)][_0x446eef(0x1d3)]=(this[_0x446eef(0x1ba)][_0x446eef(0x1d3)]*(_0x4060ab-0x1)+_0x2386a7[_0x446eef(0x1d3)])/_0x4060ab),this[_0x446eef(0x1ba)][_0x446eef(0x225)]+=this[_0x446eef(0x1ba)][_0x446eef(0x174)],this[_0x446eef(0x1ba)]['enabled']=_0x2386a7[_0x446eef(0x20d)];}},Spriteset_Base[_0x5511ce(0x1cf)][_0x5511ce(0x224)]=function(){var _0x39a08b=_0x5511ce;if(!PIXI[_0x39a08b(0x214)]['ColorMatrixFilter'])return;this['_BrightEffectsColorAdjustFilter']=new PIXI['filters'][(_0x39a08b(0x166))]();this[_0x39a08b(0x1a4)]()?this[_0x39a08b(0x167)][_0x39a08b(0x214)][_0x39a08b(0x21b)](this[_0x39a08b(0x1ff)]):this['filters']['push'](this[_0x39a08b(0x1ff)]);var _0xa66894=$gameScreen[_0x39a08b(0x1c3)]();_0xa66894&&_0xa66894[_0x39a08b(0x207)]>0x0&&(this['_BrightEffectsColorAdjustFilter'][_0x39a08b(0x205)]=_0xa66894[_0x39a08b(0x1d9)],this[_0x39a08b(0x1ff)][_0x39a08b(0x19d)]=_0xa66894[_0x39a08b(0x1ae)],this[_0x39a08b(0x1ff)][_0x39a08b(0x1c1)]=_0xa66894[_0x39a08b(0x19c)]);},Spriteset_Base[_0x5511ce(0x1cf)][_0x5511ce(0x184)]=function(){var _0x56b53a=_0x5511ce;if(!!this[_0x56b53a(0x1ff)]){var _0x4e9cf5=$gameScreen[_0x56b53a(0x1c3)](),_0x154435=_0x4e9cf5[_0x56b53a(0x207)];_0x154435<=0x0?(this['_BrightEffectsColorAdjustFilter'][_0x56b53a(0x205)]=_0x4e9cf5[_0x56b53a(0x1d9)],this['_BrightEffectsColorAdjustFilter'][_0x56b53a(0x19d)]=_0x4e9cf5[_0x56b53a(0x1ae)],this[_0x56b53a(0x1ff)][_0x56b53a(0x1c1)]=_0x4e9cf5[_0x56b53a(0x19c)]):(_0x4e9cf5[_0x56b53a(0x207)]--,this[_0x56b53a(0x1ff)][_0x56b53a(0x205)]=(this[_0x56b53a(0x1ff)][_0x56b53a(0x205)]*(_0x154435-0x1)+_0x4e9cf5[_0x56b53a(0x1d9)])/_0x154435,this[_0x56b53a(0x1ff)][_0x56b53a(0x19d)]=(this[_0x56b53a(0x1ff)][_0x56b53a(0x19d)]*(_0x154435-0x1)+_0x4e9cf5['contrast'])/_0x154435,this[_0x56b53a(0x1ff)]['currentSaturate']=(this['_BrightEffectsColorAdjustFilter'][_0x56b53a(0x1c1)]*(_0x154435-0x1)+_0x4e9cf5['saturate'])/_0x154435),this[_0x56b53a(0x1ff)][_0x56b53a(0x1d9)](this[_0x56b53a(0x1ff)][_0x56b53a(0x205)]),this['_BrightEffectsColorAdjustFilter'][_0x56b53a(0x1ae)](this[_0x56b53a(0x1ff)]['currentContrast'],!![]),this['_BrightEffectsColorAdjustFilter']['saturate'](this[_0x56b53a(0x1ff)][_0x56b53a(0x1c1)],!![]);}},Spriteset_Base[_0x5511ce(0x1bf)]=null,Spriteset_Base['TILT_SHIFT_BATTLE_FILTER']=null,Spriteset_Base[_0x5511ce(0x1cf)][_0x5511ce(0x20a)]=function(){var _0x9e1a3c=_0x5511ce;if(!PIXI[_0x9e1a3c(0x214)]['TiltShiftFilter'])return;const _0x28a006=this[_0x9e1a3c(0x1a8)]();this[_0x9e1a3c(0x165)]=_0x28a006;this['brightEffectsBaseOnly']()?this[_0x9e1a3c(0x167)][_0x9e1a3c(0x214)][_0x9e1a3c(0x21b)](_0x28a006):this[_0x9e1a3c(0x214)][_0x9e1a3c(0x21b)](_0x28a006);var _0x3713ab=$gameScreen['getBrightEffectsTiltShiftSettings']();_0x3713ab&&(_0x3713ab[_0x9e1a3c(0x207)]>0x0&&(_0x28a006[_0x9e1a3c(0x1cb)]=_0x3713ab[_0x9e1a3c(0x194)],_0x28a006[_0x9e1a3c(0x1e4)]=_0x3713ab[_0x9e1a3c(0x180)])),this[_0x9e1a3c(0x203)](!![]);},Spriteset_Base[_0x5511ce(0x1cf)]['getTiltShiftFilter']=function(){var _0x257ed4=_0x5511ce;return SceneManager['isSceneBattle']()?Spriteset_Base[_0x257ed4(0x221)]:Spriteset_Base[_0x257ed4(0x1bf)];},VisuMZ['BrightEffects'][_0x5511ce(0x1a0)]=Scene_Boot[_0x5511ce(0x1cf)][_0x5511ce(0x1f9)],Scene_Boot['prototype']['onDatabaseLoaded']=function(){var _0x333335=_0x5511ce;VisuMZ[_0x333335(0x1fd)][_0x333335(0x1a0)][_0x333335(0x1dc)](this);if(!PIXI[_0x333335(0x214)][_0x333335(0x213)])return;Spriteset_Base[_0x333335(0x1bf)]=new PIXI['filters']['TiltShiftFilter'](),Spriteset_Base[_0x333335(0x221)]=new PIXI[(_0x333335(0x214))][(_0x333335(0x213))]();},Spriteset_Battle[_0x5511ce(0x1cf)]['getTiltShiftFilter']=function(){var _0x119bfc=_0x5511ce;return new PIXI[(_0x119bfc(0x214))][(_0x119bfc(0x213))]();},Spriteset_Base['prototype'][_0x5511ce(0x203)]=function(_0x16237f){var _0x5bdbeb=_0x5511ce;if(!this[_0x5bdbeb(0x165)])return;const _0x40f39c=this[_0x5bdbeb(0x1e9)]()+0.5;this[_0x5bdbeb(0x18b)](_0x40f39c,_0x16237f),this[_0x5bdbeb(0x1a9)]();},Spriteset_Base['prototype']['setMapEnhanceTiltShiftFilterY']=function(_0x301d9d,_0x216667){var _0x69b26e=_0x5511ce;let _0x33a667=_0x216667?0xfa0:0x8;if(this['_BrightEffectsTiltShiftFilter']['start']['y']>_0x301d9d)this['_BrightEffectsTiltShiftFilter'][_0x69b26e(0x1b2)]={'x':0x0,'y':Math[_0x69b26e(0x1a5)](this[_0x69b26e(0x165)][_0x69b26e(0x1b2)]['y']-_0x33a667,_0x301d9d)},this[_0x69b26e(0x165)][_0x69b26e(0x1d6)]={'x':0x258,'y':Math[_0x69b26e(0x1a5)](this[_0x69b26e(0x165)][_0x69b26e(0x1d6)]['y']-_0x33a667,_0x301d9d)};else this[_0x69b26e(0x165)][_0x69b26e(0x1b2)]['y']<_0x301d9d&&(this[_0x69b26e(0x165)]['start']={'x':0x0,'y':Math[_0x69b26e(0x177)](this['_BrightEffectsTiltShiftFilter']['start']['y']+_0x33a667,_0x301d9d)},this[_0x69b26e(0x165)]['end']={'x':0x258,'y':Math[_0x69b26e(0x177)](this[_0x69b26e(0x165)][_0x69b26e(0x1d6)]['y']+_0x33a667,_0x301d9d)});},Spriteset_Base[_0x5511ce(0x1cf)]['updateBrightEffectsTiltShiftFilterProperties']=function(){var _0x5c2f0b=_0x5511ce;const _0x1ec694=this[_0x5c2f0b(0x165)];var _0x30adcc=$gameScreen[_0x5c2f0b(0x1b9)](),_0xafaf70=_0x30adcc[_0x5c2f0b(0x207)];_0xafaf70<=0x0?(_0x1ec694[_0x5c2f0b(0x1cb)]=_0x30adcc[_0x5c2f0b(0x194)],_0x1ec694[_0x5c2f0b(0x1e4)]=_0x30adcc[_0x5c2f0b(0x180)]):(_0x30adcc[_0x5c2f0b(0x207)]--,_0x1ec694[_0x5c2f0b(0x1cb)]=(_0x1ec694[_0x5c2f0b(0x1cb)]*(_0xafaf70-0x1)+_0x30adcc[_0x5c2f0b(0x194)])/_0xafaf70,_0x1ec694[_0x5c2f0b(0x1e4)]=(_0x1ec694['currentGradientBlur']*(_0xafaf70-0x1)+_0x30adcc[_0x5c2f0b(0x180)])/_0xafaf70),_0x1ec694[_0x5c2f0b(0x1f4)]=_0x1ec694[_0x5c2f0b(0x1cb)],_0x1ec694['gradientBlur']=_0x1ec694[_0x5c2f0b(0x1e4)];},Spriteset_Base[_0x5511ce(0x1cf)]['createBrightEffectsBlurFilter']=function(){var _0x231989=_0x5511ce;const _0x409cd5=new PIXI[(_0x231989(0x214))][(_0x231989(0x21e))]();this['_BrightEffectsBlurFilter']=_0x409cd5;this[_0x231989(0x1a4)]()?this['_baseSprite'][_0x231989(0x214)][_0x231989(0x21b)](_0x409cd5):this[_0x231989(0x214)][_0x231989(0x21b)](_0x409cd5);var _0x4b02b5=$gameScreen['getBrightEffectsBlurSettings']();_0x4b02b5&&_0x4b02b5[_0x231989(0x207)]>0x0&&(_0x409cd5['currentBlur']=_0x4b02b5[_0x231989(0x1f4)]);},Spriteset_Base[_0x5511ce(0x1cf)][_0x5511ce(0x1e8)]=function(){var _0x10332d=_0x5511ce;if(!!this[_0x10332d(0x181)]){var _0x21caab=$gameScreen['getBrightEffectsBlurSettings'](),_0x40dd92=_0x21caab[_0x10332d(0x207)];_0x40dd92<=0x0?this['_BrightEffectsBlurFilter']['currentBlur']=_0x21caab[_0x10332d(0x1f4)]:(_0x21caab[_0x10332d(0x207)]--,this[_0x10332d(0x181)][_0x10332d(0x21a)]=(this['_BrightEffectsBlurFilter'][_0x10332d(0x21a)]*(_0x40dd92-0x1)+_0x21caab[_0x10332d(0x1f4)])/_0x40dd92),this[_0x10332d(0x181)][_0x10332d(0x1f4)]=this[_0x10332d(0x181)][_0x10332d(0x21a)];}};