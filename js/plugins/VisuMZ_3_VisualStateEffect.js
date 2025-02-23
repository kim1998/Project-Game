//=============================================================================
// VisuStella MZ - Visual State Effects
// VisuMZ_3_VisualStateEffect.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_VisualStateEffects = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VisualStateEffects = VisuMZ.VisualStateEffects || {};
VisuMZ.VisualStateEffects.version = 1.18;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.18] [VisualStateEffects]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Visual_State_Effects_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * States, buffs, and debuffs are amongst one of the most important aspects of
 * the battle system. Therefore, relaying proper information to the player is
 * extremely important. RPG Maker MZ does relay information to the player about
 * the various states and effects, but it is far from perfect. This plugin
 * allows you to add more detail and visual effects regarding states to relay
 * proper data.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Choose to display State Overlays and State Icons over actors and enemies.
 * * Create text popups for Buffs, Debuffs, and States along with full control
 *   over their color, flash, and flash duration.
 * * Play animations upon receiving or removing Buffs, Debuffs, and States.
 * * States can have repeating animations.
 * * States can change the tone of a sprite.
 * * States can freeze a sprite in place.
 * * States can adjust the opacity of a battler to make them semi-transparent.
 * * Hovering effects that can be visibly applied to trait objects.
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
 * - VisuMZ_0_CoreEngine
 * - VisuMZ_1_BattleCore
 * - VisuMZ_1_SkillsStatesCore
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
 * State Motion Index and State Overlay Index
 * 
 * - The original RPG Maker MZ functions have been overwritten because they
 * only display the motions and overlays of the highest priority state even if
 * it does not have any motions while lower priority states with motions and
 * overlays will be hidden.
 * 
 * - The changed code will now take the highest priority state motion index (or
 * a custom one defined by a notetag) and the highest priority state overlay
 * index to show those instead.
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
 * === State-Related Notetags ===
 * 
 * The following notetags are made for states.
 * 
 * ---
 * 
 * <Hide State Popup>
 *
 * - Used for: State Notetags
 * - Don't display any of the popups for this state.
 * 
 * ---
 * 
 * <State Popup>
 *  text color: c
 *  flash color: r, g, b, a
 *  flash duration: d
 * </State Popup>
 *
 * - Used for: State Notetags
 * - Changes the settings of the state popup from the defaults declared by the
 *   Plugin Parameters. Each of the settings are optional. If the lines do not
 *   appear in the notetag, then the default values from the Plugin Parameters
 *   will be used instead.
 * - Replace 'c' #rrggbb for custom colors or insert a regular number for text
 *   colors from the Window Skin.
 * - Replace 'r', 'g', 'b', 'a' with number values ranging from 0 to 255 for
 *   'red', 'green', 'blue', and 'alpha' to determine the flash color.
 * - Replace 'd' with a number representing the amount of frames you want the
 *   flash duration to last for.
 * 
 * Examples:
 * 
 * <State Popup>
 *  text color: 3
 * </State Popup>
 * 
 * <State Popup>
 *  text color: #abcdef
 *  flash color: 255, 255, 0, 160
 * </State Popup>
 * 
 * <State Popup>
 *  flash color: 0, 255, 255, 160
 *  flash duration: 90
 * </State Popup>
 * 
 * <State Popup>
 *  flash duration: 777
 * </State Popup>
 * 
 * ---
 * 
 * <Add Animation: x>
 *
 * - Used for: State Notetags
 * - Determines the battle animation to play when the state is applied.
 * - Replace 'x' with a number representing the ID of the animation you wish
 *   to play when the state is added.
 * - This does not work for states without icons nor the death state.
 * 
 * ---
 * 
 * <Erase Animation: x>
 *
 * - Used for: State Notetags
 * - Determines the battle animation to play when the state is removed.
 * - Replace 'x' with a number representing the ID of the animation you wish
 *   to play when the state is removed.
 * - This does not work for states without icons nor the death state.
 * 
 * ---
 * 
 * <Repeat Animation: x>
 *
 * - Used for: State Notetags
 * - Determines the battle animation to play in intervals when the battler is
 *   affected by it.
 * - Replace 'x' with a number representing the ID of the animation you wish
 *   to play on repeat while the battler is affected by the state.
 * - The battler will cycle through the various repeating state animations
 *   available through states.
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * - WARNING: Abusing Repeat Animations can jeopardize game performance.
 * 
 * ---
 * 
 * <Repeat Animation Cycle: x>
 *
 * - Used for: State Notetags
 * - Determines the cycle/duration of this specific state's repeating animation
 *   if you do not wish to use the plugin parameter's default setting.
 * - Replace 'x' with the number of frames you wish to play this animation for
 *   before moving onto the next animation.
 * - WARNING: Lower numbers can jeopardize game performance.
 * 
 * ---
 * 
 * <Custom Overlay: filename>
 * 
 * - Used for: State Notetags
 * - For those who don't want to use the img/system/ folder's "States" image
 *   file and want something custom, this notetag will do exactly that.
 * - Custom state overlays will follow similar dimensions to the original
 *   States image:
 *   - Pixel Width: 768
 *   - Pixel Height: 96
 *   - Total Frames: 8
 *   - If you want to use different sizes, we recommend you look into Effekseer
 *     custom animations with the <Repeat Animation: x> notetag instead.
 * - Replace 'filename' with the filename of the image you want to use as
 *   a state overlay found in the game project's img/system/ folder.
 *   - Do not include the file extension.
 * 
 * ---
 * 
 * <State Motion: Walk>
 * <State Motion: Wait>
 * <State Motion: Chant>
 * <State Motion: Guard>
 * <State Motion: Damage>
 * <State Motion: Evade>
 * <State Motion: Thrust>
 * <State Motion: Swing>
 * <State Motion: Missile>
 * <State Motion: Skill>
 * <State Motion: Spell>
 * <State Motion: Item>
 * <State Motion: Escape>
 * <State Motion: Victory>
 * <State Motion: Dying>
 * <State Motion: Abnormal>
 * <State Motion: Sleep>
 * <State Motion: Dead>
 *
 * - Used for: State Notetags
 * - Lets you determine what kind of state motion to play when the battler is
 *   affected by the state.
 * - The battler will only play the highest priority state motion.
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * 
 * ---
 * 
 * <State Motion Lock>
 * 
 * - Used for: State Notetags
 * - If an actor or animated sideview enemy is affected by a state that has
 *   this notetag, their animation will be locked in place while this state
 *   is in effect.
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * 
 * ---
 * 
 * <State Tone: red, green, blue, gray>
 *
 * - Used for: State Notetags
 * - Tints the battler with a tone determined by the state.
 * - Replace 'red', 'green', 'blue' with a value between -255 and 255.
 * - Replace 'gray' with a value between 0 and 255.
 * - If a battler has multiple states with tones, then the state with the
 *   highest priority value is applied to the battler.
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * 
 * ---
 * 
 * <Visual Opacity: x>
 * <Visual Opacity: x%>
 * 
 * - Used for: State Notetags
 * - When a battler is affected by this state, change the opacity of their main
 *   battler sprite to 'x' or 'x%'.
 * - Replace 'x' with a number from 0 to 255 representing the opacity level.
 * - Replace 'x%' with a percentage from 0% to 100% representing the opacity.
 * - This does NOT affect UI elements like the HP Gauges, State Icons, or their
 *   positioning markers such as the battler's shadow as this is only to used
 *   to represent a change in their opacity through a state.
 * - To change the whole battler's opacity including everything from the UI
 *   elements, State Icons, etc., use the Action Sequence Plugin Command to
 *   visually alter the whole opacity level instead.
 * - The Visual Opacity level will compound with the opacity level adjusted by
 *   the Action Sequence Plugin Command. Keep this in mind when using both of
 *   them together.
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * 
 * ---
 * 
 * <Visual Rainbow: +x>
 * <Visual Rainbow: -x>
 * 
 * - Used for: State Notetags
 * - When a battler is affected by this state, the battler has a colorful
 *   rainbow shifting effect.
 * - Replace 'x' with a number representing how fast the colors shift for the
 *   battler. Higher numbers are faster. Lower numbers are slower.
 * - This does NOT affect UI elements like the HP Gauges, State Icons, or their
 *   positioning markers such as the battler's shadow as this is only to used
 *   to represent a change in their opacity through a state.
 * - The Visual Rainbow shift will be stacked on top of any battlers/enemies
 *   that already have a hue change.
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * 
 * ---
 *
 * === Hover-Related Notetags ===
 * 
 * ---
 * 
 * <Visual Hover Effect>
 *  Base: x
 *  Speed: y
 *  Rate: z
 *  Death: case
 * </Visual Hover Effect>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Creates a hover effect when tied to a trait object.
 * - The 'base' value determines the minimum height above the ground for the
 *   hover effect. Replace 'x' with a number representing the pixel height.
 * - The 'speed' value determines the flat adjustment towards the wobbling
 *   change. Replace 'y' with a number representing the speed. Lower values
 *   move faster while higher values move slower.
 * - The 'rate' determines the fluctuation rate when the hover effect bobbles
 *   up and down. Replace 'z' with a number representing the fluctuation rate.
 * - The 'death' scenario lets you decide if you want the hovering battler to
 *   remain hovering if they're dead or fall down to the floor. Replace 'case'
 *   with 'Hover' or 'Floor'.
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * 
 * Example:
 * 
 * <Visual Hover Effect>
 *  Base: 100
 *  Speed: 20
 *  Rate: 5.0
 *  Death: floor
 * </Visual Hover Effect>
 * 
 * ---
 *
 * === Breathing-Related Notetags ===
 * 
 * The following notetags are purely EXPERIMENTAL. There is a high likelihood
 * of unintended graphical glitches when using them. Use them at your own risk.
 * 
 * ---
 * 
 * <Visual Breathing Effect>
 *  Speed: x
 *  Speed X: x
 *  Speed Y: x
 *  
 *  Rate: x.y
 *  Rate X: x.y
 *  Rate Y: x.y
 * 
 *  HP Link: On
 *  HP Link: Off
 * </Visual Breathing Effect>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Creates a hover effect when tied to a trait object.
 * - The 'speed' value determines how long each cycle is.
 *   - When using 'Speed', this will apply to both 'Speed X' and 'Speed Y'
 *   - 'Speed X' refers to the horizontal breathing cycle
 *   - 'Speed Y' refers to the vertical breathing cycle
 *   - If not declared, both will default to a value of '10'
 * - The 'rate' value determines how exaggerated the breathing distortion looks
 *   for the affected target.
 *   - When using 'Rate', this will apply to both 'Rate X' and 'Rate Y
 *   - 'Rate X' refers to horizontal breathing distortion effect
 *   - 'Rate Y' refers to vertical breathing distortion effect
 *   - If not declared, 'Rate X' will default to 0.000 and 'Rate Y' to 0.020.
 * - HP Link refers to the breathing speed relative to the target's HP rate
 *   where the lower the rate, the slower the speed becomes.
 *   - 'On' means it's enabled.
 *   - 'Off' means it's disabled.
 *   - If not declared, this will default to 'OFF'
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * 
 * Examples:
 * 
 * <Visual Breathing Effect>
 *  Speed: 10
 *  Rate Y: 0.050
 *  HP Link: On
 * </Visual Breathing Effect>
 * 
 * <Visual Breathing Effect>
 *  Speed X: 15
 *  Speed Y: 10
 *  Rate X: 0.01
 *  Rate Y: 0.050
 * </Visual Breathing Effect>
 * 
 * ---
 * 
 * <No Breathing>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Removes any breathing effects for the affected target.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings for Visual State Effects.
 *
 * ---
 *
 * Actors
 * 
 *   Show State Overlay?:
 *   - Show state overlays over an actor's head?
 * 
 *   Show State Icons?:
 *   - Show state icons over an actor's head?
 *
 * ---
 *
 * Enemies
 * 
 *   Show State Overlay?:
 *   - Show state overlays over an enemy's head?
 * 
 *   Show State Icons?:
 *   - Show state icons over an enemy's head?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Buff/Debuff Settings Settings
 * ============================================================================
 *
 * Buff/Debuff settings for Visual State Effects.
 *
 * ---
 *
 * Popups
 * 
 *   Show Popups?:
 *   - Show Buff/Debuff Popups when applied?
 * 
 *     Buff Format:
 *     - How do you want the buff text to appear?
 *     - %1 - Parameter Name
 * 
 *       Text Color:
 *       - Use #rrggbb for custom colors or regular numbers for text colors
 *         from the Window Skin.
 * 
 *       Flash Color:
 *       - Adjust the popup's flash color.
 *       - Format: [red, green, blue, alpha]
 * 
 *       Flash Duration:
 *       - What is the frame duration of the flash effect?
 * 
 *     Debuff Format:
 *     - How do you want the debuff text to appear?
 *     - %1 - Parameter Name
 * 
 *       Text Color:
 *       - Use #rrggbb for custom colors or regular numbers for text colors
 *         from the Window Skin.
 * 
 *       Flash Color:
 *       - Adjust the popup's flash color.
 *       - Format: [red, green, blue, alpha]
 * 
 *       Flash Duration:
 *       - What is the frame duration of the flash effect?
 * 
 * ---
 * 
 * Animations
 * 
 *   Show Animations?:
 *   - Show Buff/Debuff Animations when applied?
 * 
 *     Mirror Animations?:
 *     - Mirror animations for buffs/debuffs?
 * 
 *     Mute Animations?:
 *     - Mute animations for buffs/debuffs?
 * 
 * ---
 * 
 * Buff Animations
 * 
 *   MaxHP Buff:
 *   MaxMP Buff:
 *   ATK Buff:
 *   DEF Buff:
 *   MAT Buff:
 *   MDF Buff:
 *   AGI Buff:
 *   LUK Buff:
 *   - Animation played when applying specific Buffs.
 * 
 * Debuff Animations
 * 
 *   MaxHP Debuff:
 *   MaxMP Debuff:
 *   ATK Debuff:
 *   DEF Debuff:
 *   MAT Debuff:
 *   MDF Debuff:
 *   AGI Debuff:
 *   LUK Debuff:
 *   - Animation played when applying specific Debuff.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: State Settings
 * ============================================================================
 *
 * Default State settings for Visual State Effects.
 *
 * ---
 *
 * Popups
 * 
 *   Show Popups?:
 *   - Show States Popups when applied and removed?
 * 
 *     Add State Format:
 *     - How do you want added states to appear?
 *     - %1 - State Name
 * 
 *     Erase State Format:
 *     - How do you want erased states to appear?
 *     - %1 - State Name
 * 
 *     Default Text Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *       Match Turn Count?:
 *       - Match turn count color by default?
 * 
 *     Flash Color:
 *     - Adjust the popup's default flash color.
 *     - Format: [red, green, blue, alpha]
 * 
 *       Flash Duration:
 *       - What is the frame duration of the default flash effect?
 *
 * ---
 *
 * State Animations
 * 
 *   Add/Erase Animations
 * 
 *     Mirror Animations?:
 *     - Mirror animations for states?
 * 
 *     Mute Animations?:
 *     - Mute animations for states?
 * 
 *   Repeating Animations
 * 
 *     Cycle Time:
 *     - The amount of frames to wait before each animation cycle.
 *     - WARNING: Lower numbers can jeopardize game performance.
 * 
 *     Mirror Animations?:
 *     - Mirror repeating animations for states by default?
 * 
 *     Mute Animations?:
 *     - Mute repeating animations for states by default?
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
 * Version 1.18: October 13, 2022
 * * Compatibility Update!
 * ** Plugin should be more compatible with VisuMZ_2_DragonbonesUnion.
 * 
 * Version 1.17: September 29, 2022
 * * Bug Fixes!
 * ** Filename has been shortened from VisuMZ_3_VisualStateEffects.js to
 *    VisuMZ_3_VisualStateEffect.js due to deployment reasons. For some mobile
 *    devices, keeping the name as long as VisuMZ_3_VisualStateEffects.js
 *    causes problems, but VisuMZ_3_VisualStateEffect.js is fine. Take note of
 *    this while you are updating.
 * 
 * Version 1.16: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New state notetag added by Irina: <Custom Overlay: filename>
 * *** For those who don't want to use the img/system/ folder's "States" image
 *     file and want something custom, this notetag will do exactly that.
 * *** Custom state overlays will follow similar dimensions to the original
 *     States image: Pixel Width of 768, Pixel Height of 96, Total Frames of 8.
 * *** If you want to use different sizes, we recommend you look into Effekseer
 *     custom animations with the <Repeat Animation: x> notetag instead.
 * 
 * Version 1.15: February 17, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: July 2, 2021
 * * Feature Updates!
 * ** When a battler's sprite opacity is zero, repeating animations are hidden
 *    along with them. Update made by Arisu.
 * 
 * Version 1.13: June 18, 2021
 * * Bug Fixes!
 * ** Repeating animations no longer play on invisible enemies or dead enemies
 *    through passive state effects. Fix made by Arisu.
 * 
 * Version 1.12: June 11, 2021
 * * Documentation Update!
 * ** Added warnings for the following notetags by Irina:
 * *** <Repeat Animation: x>
 * *** <State Motion: x>
 * *** <State Motion Lock>
 * *** <Visual Opacity: x>
 * *** <Visual Rainbow: +/-x>
 * *** <Visual Hover Effect>
 * *** <Visual Breathing Effect>
 * **** NOTE: Using this with Passive State Conditions will make this effect
 *      update at the next battler refresh cycle. This is due to the effect
 *      being cached in order to prevent lag and overloading the engine.
 * 
 * Version 1.11: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Irina:
 * *** <Visual Breathing Effect>
 * *** <No Breathing>
 * **** Enables/disables breathing effects for your actors and/or enemies.
 *      Refer to the documentation for more details on how to set it up.
 * **** These are EXPERIMENTAL notetags. This means that these effects have the
 *      possibility of creating graphical glitches when used. Use at your own
 *      risk as these are not perfected features.
 * 
 * Version 1.10: January 1, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Yanfly.
 * *** <Visual Rainbow: +x> and <Visual Rainbow: -x>
 * 
 * Version 1.09: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Yanfly.
 * *** <Visual Opacity: x> and <Visual Opacity: x%>
 * 
 * Version 1.08: December 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Requires updated Core Engine. Fix made by Yanfly.
 * 
 * Version 1.07: November 22, 2020
 * * Bug Fixes!
 * ** <State Motion: x> now works for sideview enemies. Keep in mind the state
 *    motion does not apply to the active battler during the Input phase. Fix
 *    made by Yanfly.
 * 
 * Version 1.06: November 8, 2020
 * * Bug Fixes!
 * ** <Add Animation: x> and <Erase Animation: x> notetags now work properly.
 *    Fix by Arisu.
 * 
 * Version 1.05: November 1, 2020
 * * Feature Update!
 * ** Upon dying, state removal popups are no longer shown to prevent massive
 *    clutter of the screen. Update by Irina.
 * 
 * Version 1.04: October 25, 2020
 * * Bug Fixes!
 * ** Zooming in should no longer display faint outlines around state sprites.
 *    Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility with the Battle Core's new <Battler Sprite Grounded>
 *    notetag. Added by Irina.
 * 
 * Version 1.03: October 11, 2020
 * * Bug Fixes!
 * ** Motion Locked Battlers at the start of battle no longer show their entire
 *    sprite sheet. Fix made by Arisu.
 * 
 * Version 1.02: September 13, 2020
 * * Compatibility Update
 * ** Added compatibility with Battle Core's newest update for the new
 *    distortion effects.
 * 
 * Version 1.01: September 6, 2020
 * * Compatibility Update
 * ** Added compatibility with Battle Core's newest update for the
 *    <Battle UI Offset: +x, +y> notetags. Update made by Yanfly.
 *
 * Version 1.00: September 2, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param VisualStateEffects
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
 * @desc General settings for Visual State Effects.
 * @default {"Actors":"","ActorOverlay:eval":"true","ActorStateIcon:eval":"true","Enemies":"","EnemyOverlay:eval":"true","EnemyStateIcon:eval":"true"}
 *
 * @param BuffDebuff:struct
 * @text Buff/Debuff Settings
 * @type struct<BuffDebuff>
 * @desc Buff/Debuff settings for Visual State Effects.
 * @default {"ShowPopups:eval":"true","BuffPopupFmt:str":"%1▲","BuffTextColor:str":"24","BuffFlashColor:eval":"[0, 255, 0, 160]","BuffFlashDuration:num":"60","DebuffPopupFmt:str":"%1▼","DebuffTextColor:str":"27","DebuffFlashColor:eval":"[255, 0, 0, 160]","DebuffFlashDuration:num":"60","ShowAnimations:eval":"true","AnimationMirror:eval":"false","AnimationMute:eval":"false","BuffAnimations":"","Buff0Animation:num":"52","Buff1Animation:num":"53","Buff2Animation:num":"52","Buff3Animation:num":"52","Buff4Animation:num":"53","Buff5Animation:num":"53","Buff6Animation:num":"51","Buff7Animation:num":"51","DebuffAnimations":"","Debuff0Animation:num":"55","Debuff1Animation:num":"56","Debuff2Animation:num":"55","Debuff3Animation:num":"55","Debuff4Animation:num":"56","Debuff5Animation:num":"56","Debuff6Animation:num":"54","Debuff7Animation:num":"54"}
 *
 * @param State:struct
 * @text State Defaults
 * @type struct<State>
 * @desc Default State settings for Visual State Effects.
 * @default {"ShowPopups:eval":"true","AddPopupFmt:str":"+%1","ErasePopupFmt:str":"-%1","TextColor:str":"0","MatchTurnCountColor:eval":"true","FlashColor:eval":"[0, 0, 0, 0]","FlashDuration:num":"60","StateAnimations":"","AddEraseAnimations":"","AnimationMirror:eval":"false","AnimationMute:eval":"false","RepeatingAnimations":"","CycleTime:num":"300","RepeatMirror:eval":"false","RepeatMute:eval":"true"}
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
 * @param Actors
 *
 * @param ActorOverlay:eval
 * @text Show State Overlay?
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show state overlays over an actor's head?
 * @default true
 *
 * @param ActorStateIcon:eval
 * @text Show State Icons?
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show state icons over an actor's head?
 * @default true
 *
 * @param Enemies
 *
 * @param EnemyOverlay:eval
 * @text Show State Overlay?
 * @parent Enemies
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show state overlays over an enemy's head?
 * @default true
 *
 * @param EnemyStateIcon:eval
 * @text Show State Icons?
 * @parent Enemies
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show state icons over an enemy's head?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BuffDebuff:
 *
 * @param ShowPopups:eval
 * @text Show Popups?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Buff/Debuff Popups when applied?
 * @default true
 *
 * @param BuffPopupFmt:str
 * @text Buff Format
 * @parent ShowPopups:eval
 * @desc How do you want the buff text to appear?
 * %1 - Parameter Name
 * @default %1▲
 *
 * @param BuffTextColor:str
 * @text Text Color
 * @parent BuffPopupFmt:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param BuffFlashColor:eval
 * @text Flash Color
 * @parent BuffPopupFmt:str
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 255, 0, 160]
 * 
 * @param BuffFlashDuration:num
 * @text Flash Duration
 * @parent BuffPopupFmt:str
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param DebuffPopupFmt:str
 * @text Debuff Format
 * @parent ShowPopups:eval
 * @desc How do you want the debuff text to appear?
 * %1 - Parameter Name
 * @default %1▼
 *
 * @param DebuffTextColor:str
 * @text Text Color
 * @parent DebuffPopupFmt:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param DebuffFlashColor:eval
 * @text Flash Color
 * @parent DebuffPopupFmt:str
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @param DebuffFlashDuration:num
 * @text Flash Duration
 * @parent DebuffPopupFmt:str
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param ShowAnimations:eval
 * @text Show Animations?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Buff/Debuff Animations when applied?
 * @default true
 *
 * @param AnimationMirror:eval
 * @text Mirror Animations?
 * @parent ShowAnimations:eval
 * @type boolean
 * @on Mirror
 * @off Don't
 * @desc Mirror animations for buffs/debuffs?
 * @default false
 *
 * @param AnimationMute:eval
 * @text Mute Animations?
 * @parent ShowAnimations:eval
 * @type boolean
 * @on Mute
 * @off Don't
 * @desc Mute animations for buffs/debuffs?
 * @default false
 * 
 * @param BuffAnimations
 * @text Buff Animations
 * @parent ShowAnimations:eval
 *
 * @param Buff0Animation:num
 * @text MaxHP Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying MaxHP Buffs.
 * @default 52
 *
 * @param Buff1Animation:num
 * @text MaxMP Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying MaxMP Buffs.
 * @default 53
 *
 * @param Buff2Animation:num
 * @text ATK Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying ATK Buffs.
 * @default 52
 *
 * @param Buff3Animation:num
 * @text DEF Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying DEF Buffs.
 * @default 52
 *
 * @param Buff4Animation:num
 * @text MAT Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying MAT Buffs.
 * @default 53
 *
 * @param Buff5Animation:num
 * @text MDF Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying MDF Buffs.
 * @default 53
 *
 * @param Buff6Animation:num
 * @text AGI Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying AGI Buffs.
 * @default 51
 *
 * @param Buff7Animation:num
 * @text LUK Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying LUK Buffs.
 * @default 51
 * 
 * @param DebuffAnimations
 * @text Debuff Animations
 * @parent ShowAnimations:eval
 *
 * @param Debuff0Animation:num
 * @text MaxHP Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying MaxHP Debuffs.
 * @default 55
 *
 * @param Debuff1Animation:num
 * @text MaxMP Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying MaxMP Debuffs.
 * @default 56
 *
 * @param Debuff2Animation:num
 * @text ATK Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying ATK Debuffs.
 * @default 55
 *
 * @param Debuff3Animation:num
 * @text DEF Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying DEF Debuffs.
 * @default 55
 *
 * @param Debuff4Animation:num
 * @text MAT Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying MAT Debuffs.
 * @default 56
 *
 * @param Debuff5Animation:num
 * @text MDF Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying MDF Debuffs.
 * @default 56
 *
 * @param Debuff6Animation:num
 * @text AGI Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying AGI Debuffs.
 * @default 54
 *
 * @param Debuff7Animation:num
 * @text LUK Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying LUK Debuffs.
 * @default 54
 *
 */
/* ----------------------------------------------------------------------------
 * State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~State:
 *
 * @param ShowPopups:eval
 * @text Show Popups?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show States Popups when applied and removed?
 * @default true
 *
 * @param AddPopupFmt:str
 * @text Add State Format
 * @parent ShowPopups:eval
 * @desc How do you want added states to appear?
 * %1 - State Name
 * @default +%1
 *
 * @param ErasePopupFmt:str
 * @text Erase State Format
 * @parent ShowPopups:eval
 * @desc How do you want erased states to appear?
 * %1 - State Name
 * @default -%1
 *
 * @param TextColor:str
 * @text Default Text Color
 * @parent ShowPopups:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param MatchTurnCountColor:eval
 * @text Match Turn Count?
 * @parent TextColor:str
 * @type boolean
 * @on Match
 * @off Don't
 * @desc Match turn count color by default?
 * @default true
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent ShowPopups:eval
 * @desc Adjust the popup's default flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 0, 0, 0]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent FlashColor:eval
 * @type number
 * @desc What is the frame duration of the default flash effect?
 * @default 60
 * 
 * @param StateAnimations
 * @text State Animations
 * 
 * @param AddEraseAnimations
 * @text Add/Erase Animations
 * @parent StateAnimations
 *
 * @param AnimationMirror:eval
 * @text Mirror Animations?
 * @parent AddEraseAnimations
 * @type boolean
 * @on Mirror
 * @off Don't
 * @desc Mirror animations for states?
 * @default false
 *
 * @param AnimationMute:eval
 * @text Mute Animations?
 * @parent AddEraseAnimations
 * @type boolean
 * @on Mute
 * @off Don't
 * @desc Mute animations for states?
 * @default false
 * 
 * @param RepeatingAnimations
 * @text Repeating Animations
 * @parent StateAnimations
 *
 * @param CycleTime:num
 * @text Cycle Time
 * @parent RepeatingAnimations
 * @type number
 * @min 1
 * @desc The amount of frames to wait before each animation cycle.
 * WARNING: Lower numbers can jeopardize game performance.
 * @default 300
 *
 * @param RepeatMirror:eval
 * @text Mirror Animations?
 * @parent RepeatingAnimations
 * @type boolean
 * @on Mirror
 * @off Don't
 * @desc Mirror repeating animations for states by default?
 * @default false
 *
 * @param RepeatMute:eval
 * @text Mute Animations?
 * @parent RepeatingAnimations
 * @type boolean
 * @on Mute
 * @off Don't
 * @desc Mute repeating animations for states by default?
 * @default true
 *
 */
//=============================================================================

const _0x4dbd61=_0x5934;function _0x5934(_0x40bce1,_0x17925c){const _0x59703d=_0x5970();return _0x5934=function(_0x593439,_0x14c452){_0x593439=_0x593439-0x1a4;let _0x28db7a=_0x59703d[_0x593439];return _0x28db7a;},_0x5934(_0x40bce1,_0x17925c);}function _0x5970(){const _0x476833=['Add','State','_die_bypass_visualStateEffects','updateVisualStateEffectsIcons','isEnemy','303830ruayOi','774894kRsvxA','setup','min','setFrame','rateY','toLowerCase','stateMotionIndex','PPacC','Sprite_Battler_updateDragonbonesTimeScale','rate','updateCustomOverlayFrame','breathingData','getVisualStateTone','customizeStatePopup','visualRepeatingStateAnimation','_dragonbones','Sprite_StateOverlay_loadBitmap','_hoverMinimum','Game_BattlerBase_initMembers','isSceneBattle','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','vBGQH','height','%1TextColor','push','overlay','isAppeared','_hue','yHByO','hasDragonbonesBattler','setHue','onRemoveState','visualStateToneTargetSprite','AnimationMirror','_mainSprite','VUDwp','wVlRC','nQzPJ','Sprite_Enemy_createStateIconSprite','_bitmapName','version','rRicZ','KUvCw','isActing','update','states','name','loadBitmap','createStateIconSprite','QbxPA','mainSpriteScaleY','_customStateMotion','RddCF','Erase','decreaseBuff','difZb','Sprite_Battler_playDragonbonesMotion','visualRepeatingStateAniCycle','ShowAnimations','onAddState','noBreathing','setupStateAnimation','ShowPopups','visualBattlerOpacity','vqgUK','startMotion','updateRepeatingVisualStateAnimation','BuffDebuff','Settings','frameCount','_dragonbonesSpriteContainer','VisuMZ_1_BattleCore','refresh','addChild','note','bqXbd','match','visible','Game_BattlerBase_decreaseBuff','map','OvePv','scale','updateVisualStateRainbow','yUTQo','applyBreathingScaleX','hpRate','applyBreathingCalculations','hoverData','fEYFM','nqTIX','speed','opacity','1421288cscWgQ','_overlayIndex','speedY','createVisualRepeatingStateAnimation','battleUIOffsetX','rateX','parameters','ARRAYEVAL','hcAfC','ActorStateIcon','ReBQe','Debuff','idle','VisuMZ_0_CoreEngine','toUpperCase','dTbZO','CAUcV','kOCVr','Sprite_SvEnemy','CycleTime','lcMuY','_pattern','flashDuration','_actor','ActorOverlay','FlashDuration','_stateSprite','Game_BattlerBase_refresh','AnimationMute','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','applyBreathingScaleY','States','bind','_breathingRand','IconSet','deathStateId','btDtL','lwhSb','some','isBattlerGrounded','Sprite_SvEnemy_refreshMotion','battler','updateFrame','description','_hoverRand','2966712qdQhFj','increaseBuff','length','ANNZz','split','return\x200','checkCacheKey','_stateIconSprite','random','stateOverlayIndex','updateVisualStateTone','includes','exit','FlashColor','constructor','MatchTurnCountColor','stateColor','isActor','createVisualStateTone','%1FlashColor','Sprite_Actor_createStateSprite','hover','%1%2Animation','Game_BattlerBase_die','floor','getStateMotionIndex','_loadingCustomOverlay','VudHc','initVisualStateEffects','TextColor','Sprite_Enemy_setBattler','bitmap','updateOpacity','ICON_BUFF_START','RepeatMirror','traitObjects','isDead','speedX','979092IylWlU','setupVisualStateEffect','getVisualRepeatingStateAnimation','MjNkl','createStateSprite','qaJVh','_svBattlerSprite','getStateOverlayIndex','KAGtm','General','Game_Battler_onRemoveState','isAlive','visualStateTone','parse','base','Sprite_StateOverlay_updateFrame','_distortionSprite','SdNpq','getStateMotionLock','STR','Sprite_Actor_refreshMotion','hoverHeight','OTmgk','ARRAYFUNC','requestFauxAnimation','setupBuffDebuffPopup','NUM','Sprite_Actor_setBattler','355184EToaRs','isRepeatingVisualStateAnimationShown','_cache','Sprite_Battler_mainSpriteScaleX','mainSpriteScaleX','isInputting','onLoadDefaultOverlayBitmap','createVisualBattlerOpacity','Sprite_Battler_updateOpacity','initVisualHoverEffect','16NmXjfe','createVisualBreathingData','VisuMZ_1_SkillsStatesCore','smooth','35118hkKOPc','createVisualHoveringData','randomInt','setupIconTextPopup','%1PopupFmt','dvBGJ','Game_BattlerBase_increaseBuff','breathing','ARRAYSTRUCT','Sprite_Enemy_update','createVisualStateRainbow','param','iconIndex','onLoadCustomOverlayBitmap','addLoadListener','tIxEy','setBattler','getVisualRepeatingStateAnimationCycle','_stateMotionLocked','setColorTone','ARRAYNUM','playDragonbonesMotion','ConvertParams','isStateAffected','Game_Battler_onAddState','format','Buff','loadSystem','updateVisualStateEffectsOverlay','initMembers','width','SoSsw','updateDistortionOpacity','QbOAe','JhIGc','_battler','stateMotionLock','EnemyOverlay','trim','dKrYx','textColor','hpLinked','mJEhi','string','gERFc','max','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','status','_visualStateAnimationIndex','flashColor','setupVisualBuffDebuffEffect','JSON','motion','cos','visualStateRainbow','_visualStateAnimationRepeatDuration','deathHover','prototype','RepeatMute','call','Sprite_Actor_update','createVisualRepeatingStateAnimationCycle','Sprite_Battler_extraPositionY','VisualStateEffects','Sprite_Battler_initMembers','updateVisualStateEffects','setupVisualStateEffectsPopup','refreshMotion','dNRjG','extraPositionY','qEBgJ','VisuMZ_2_DragonbonesUnion','xIRGO','EnemyStateIcon','bXdLY','clamp'];_0x5970=function(){return _0x476833;};return _0x5970();}(function(_0x512829,_0x427258){const _0x195dd8=_0x5934,_0x910c65=_0x512829();while(!![]){try{const _0x142d5f=-parseInt(_0x195dd8(0x1ae))/0x1+parseInt(_0x195dd8(0x1bc))/0x2+parseInt(_0x195dd8(0x20e))/0x3+-parseInt(_0x195dd8(0x1b8))/0x4*(parseInt(_0x195dd8(0x20d))/0x5)+parseInt(_0x195dd8(0x2bd))/0x6+parseInt(_0x195dd8(0x297))/0x7+parseInt(_0x195dd8(0x26a))/0x8;if(_0x142d5f===_0x427258)break;else _0x910c65['push'](_0x910c65['shift']());}catch(_0x1c82eb){_0x910c65['push'](_0x910c65['shift']());}}}(_0x5970,0x6bf9c));var label=_0x4dbd61(0x1fb),tier=tier||0x0,dependencies=[_0x4dbd61(0x277),_0x4dbd61(0x255),_0x4dbd61(0x1ba)],pluginData=$plugins['filter'](function(_0x5766e7){const _0x13d0d2=_0x4dbd61;return _0x5766e7[_0x13d0d2(0x1eb)]&&_0x5766e7[_0x13d0d2(0x295)][_0x13d0d2(0x2a2)]('['+label+']');})[0x0];VisuMZ[label][_0x4dbd61(0x252)]=VisuMZ[label][_0x4dbd61(0x252)]||{},VisuMZ[_0x4dbd61(0x1d2)]=function(_0x836168,_0xa94318){const _0x268dbb=_0x4dbd61;for(const _0xca62ed in _0xa94318){if(_0xca62ed[_0x268dbb(0x25a)](/(.*):(.*)/i)){const _0x57f64e=String(RegExp['$1']),_0x45d98e=String(RegExp['$2'])[_0x268dbb(0x278)]()['trim']();let _0x376174,_0x4325f0,_0x4574cd;switch(_0x45d98e){case _0x268dbb(0x1ac):_0x376174=_0xa94318[_0xca62ed]!==''?Number(_0xa94318[_0xca62ed]):0x0;break;case _0x268dbb(0x1d0):_0x4325f0=_0xa94318[_0xca62ed]!==''?JSON[_0x268dbb(0x2ca)](_0xa94318[_0xca62ed]):[],_0x376174=_0x4325f0[_0x268dbb(0x25d)](_0x4625c0=>Number(_0x4625c0));break;case'EVAL':_0x376174=_0xa94318[_0xca62ed]!==''?eval(_0xa94318[_0xca62ed]):null;break;case _0x268dbb(0x271):_0x4325f0=_0xa94318[_0xca62ed]!==''?JSON[_0x268dbb(0x2ca)](_0xa94318[_0xca62ed]):[],_0x376174=_0x4325f0['map'](_0xba9fde=>eval(_0xba9fde));break;case _0x268dbb(0x1ef):_0x376174=_0xa94318[_0xca62ed]!==''?JSON['parse'](_0xa94318[_0xca62ed]):'';break;case'ARRAYJSON':_0x4325f0=_0xa94318[_0xca62ed]!==''?JSON['parse'](_0xa94318[_0xca62ed]):[],_0x376174=_0x4325f0['map'](_0x12e796=>JSON['parse'](_0x12e796));break;case'FUNC':_0x376174=_0xa94318[_0xca62ed]!==''?new Function(JSON[_0x268dbb(0x2ca)](_0xa94318[_0xca62ed])):new Function(_0x268dbb(0x29c));break;case _0x268dbb(0x1a9):_0x4325f0=_0xa94318[_0xca62ed]!==''?JSON[_0x268dbb(0x2ca)](_0xa94318[_0xca62ed]):[],_0x376174=_0x4325f0[_0x268dbb(0x25d)](_0x434fad=>new Function(JSON[_0x268dbb(0x2ca)](_0x434fad)));break;case _0x268dbb(0x1a5):_0x376174=_0xa94318[_0xca62ed]!==''?String(_0xa94318[_0xca62ed]):'';break;case'ARRAYSTR':_0x4325f0=_0xa94318[_0xca62ed]!==''?JSON[_0x268dbb(0x2ca)](_0xa94318[_0xca62ed]):[],_0x376174=_0x4325f0[_0x268dbb(0x25d)](_0x2a493c=>String(_0x2a493c));break;case'STRUCT':_0x4574cd=_0xa94318[_0xca62ed]!==''?JSON[_0x268dbb(0x2ca)](_0xa94318[_0xca62ed]):{},_0x376174=VisuMZ['ConvertParams']({},_0x4574cd);break;case _0x268dbb(0x1c4):_0x4325f0=_0xa94318[_0xca62ed]!==''?JSON[_0x268dbb(0x2ca)](_0xa94318[_0xca62ed]):[],_0x376174=_0x4325f0[_0x268dbb(0x25d)](_0xcd9d46=>VisuMZ[_0x268dbb(0x1d2)]({},JSON['parse'](_0xcd9d46)));break;default:continue;}_0x836168[_0x57f64e]=_0x376174;}}return _0x836168;},(_0x649cfa=>{const _0x2c6114=_0x4dbd61,_0x4c63bf=_0x649cfa['name'];for(const _0x2609c5 of dependencies){if(!Imported[_0x2609c5]){alert(_0x2c6114(0x1ea)[_0x2c6114(0x1d5)](_0x4c63bf,_0x2609c5)),SceneManager[_0x2c6114(0x2a3)]();break;}}const _0x357c36=_0x649cfa[_0x2c6114(0x295)];if(_0x357c36['match'](/\[Version[ ](.*?)\]/i)){if(_0x2c6114(0x1dd)!==_0x2c6114(0x1dd))return this[_0x2c6114(0x230)]||this;else{const _0xf3226d=Number(RegExp['$1']);_0xf3226d!==VisuMZ[label][_0x2c6114(0x236)]&&(alert(_0x2c6114(0x287)[_0x2c6114(0x1d5)](_0x4c63bf,_0xf3226d)),SceneManager[_0x2c6114(0x2a3)]());}}if(_0x357c36[_0x2c6114(0x25a)](/\[Tier[ ](\d+)\]/i)){if(_0x2c6114(0x279)!==_0x2c6114(0x279))this[_0x2c6114(0x1f3)]=0x0,this['_visualStateAnimationIndex']=0x0;else{const _0x297a8f=Number(RegExp['$1']);if(_0x297a8f<tier)alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x4c63bf,_0x297a8f,tier)),SceneManager[_0x2c6114(0x2a3)]();else{if(_0x2c6114(0x1cb)===_0x2c6114(0x1cb))tier=Math['max'](_0x297a8f,tier);else{const _0xa4740f='visualBattlerOpacity';if(this[_0x2c6114(0x29d)](_0xa4740f))return this[_0x2c6114(0x1b0)][_0xa4740f];return this[_0x2c6114(0x1b0)][_0xa4740f]=this[_0x2c6114(0x1b5)](),this['_cache'][_0xa4740f];}}}}VisuMZ[_0x2c6114(0x1d2)](VisuMZ[label][_0x2c6114(0x252)],_0x649cfa[_0x2c6114(0x270)]);})(pluginData),VisuMZ[_0x4dbd61(0x1fb)][_0x4dbd61(0x220)]=Game_BattlerBase[_0x4dbd61(0x1f5)]['initMembers'],Game_BattlerBase['prototype'][_0x4dbd61(0x1d9)]=function(){const _0x35a2c8=_0x4dbd61;this[_0x35a2c8(0x1b0)]={},VisuMZ[_0x35a2c8(0x1fb)][_0x35a2c8(0x220)][_0x35a2c8(0x1f7)](this);},VisuMZ[_0x4dbd61(0x1fb)][_0x4dbd61(0x285)]=Game_BattlerBase[_0x4dbd61(0x1f5)][_0x4dbd61(0x256)],Game_BattlerBase[_0x4dbd61(0x1f5)][_0x4dbd61(0x256)]=function(){const _0x36b1f6=_0x4dbd61;this[_0x36b1f6(0x1b0)]={},VisuMZ[_0x36b1f6(0x1fb)][_0x36b1f6(0x285)]['call'](this);},Game_BattlerBase[_0x4dbd61(0x1f5)][_0x4dbd61(0x29d)]=function(_0x38766b){const _0x2c257a=_0x4dbd61;return this[_0x2c257a(0x1b0)]=this[_0x2c257a(0x1b0)]||{},this[_0x2c257a(0x1b0)][_0x38766b]!==undefined;},VisuMZ[_0x4dbd61(0x1fb)][_0x4dbd61(0x1c2)]=Game_BattlerBase[_0x4dbd61(0x1f5)][_0x4dbd61(0x298)],Game_BattlerBase[_0x4dbd61(0x1f5)]['increaseBuff']=function(_0x385d95){const _0x532d92=_0x4dbd61;VisuMZ['VisualStateEffects'][_0x532d92(0x1c2)][_0x532d92(0x1f7)](this,_0x385d95),this['setupVisualBuffDebuffEffect'](_0x385d95,!![]);},VisuMZ[_0x4dbd61(0x1fb)][_0x4dbd61(0x25c)]=Game_BattlerBase[_0x4dbd61(0x1f5)][_0x4dbd61(0x244)],Game_BattlerBase[_0x4dbd61(0x1f5)][_0x4dbd61(0x244)]=function(_0x29edd1){const _0x2d6e20=_0x4dbd61;VisuMZ['VisualStateEffects']['Game_BattlerBase_decreaseBuff'][_0x2d6e20(0x1f7)](this,_0x29edd1),this[_0x2d6e20(0x1ee)](_0x29edd1,![]);},Game_BattlerBase[_0x4dbd61(0x1f5)][_0x4dbd61(0x1ee)]=function(_0x359c39,_0x57cb89){const _0x5ce4ba=_0x4dbd61;if(!SceneManager[_0x5ce4ba(0x221)]())return;if(!this[_0x5ce4ba(0x293)]())return;const _0x1b7835=VisuMZ[_0x5ce4ba(0x1fb)][_0x5ce4ba(0x252)][_0x5ce4ba(0x251)],_0x18d8c5=_0x57cb89?_0x5ce4ba(0x1d6):_0x5ce4ba(0x275);if(_0x1b7835[_0x5ce4ba(0x24c)]){if(_0x5ce4ba(0x1de)!==_0x5ce4ba(0x1de)){if(this['constructor']===_0x57192e)return 0x0;if(!this[_0x5ce4ba(0x1df)])return 0x0;if(this[_0x5ce4ba(0x1df)][_0x5ce4ba(0x291)]&&this[_0x5ce4ba(0x1df)][_0x5ce4ba(0x291)]())return 0x0;const _0x43ff97=this[_0x5ce4ba(0x1df)][_0x5ce4ba(0x265)]();let _0x3a4876=0x0;this[_0x5ce4ba(0x296)]=this[_0x5ce4ba(0x296)]||_0x1fef1f[_0x5ce4ba(0x2af)](_0x13c2f0[_0x5ce4ba(0x29f)]()*0x2710);const _0x350b60=_0x24fb88['frameCount']+this['_hoverRand'],_0xe82c0=_0x43ff97[_0x5ce4ba(0x268)],_0x525f39=_0x43ff97[_0x5ce4ba(0x217)];let _0x4a33b3=_0x43ff97[_0x5ce4ba(0x2ac)];if(_0x4a33b3&&this[_0x5ce4ba(0x1df)][_0x5ce4ba(0x2bb)]())_0x4a33b3=_0x43ff97['deathHover'];if(_0x4a33b3){_0x3a4876+=_0x4ca5b6[_0x5ce4ba(0x1f1)](_0x350b60/(_0xe82c0||0x1))*_0x525f39,_0x3a4876+=_0x43ff97['base'];if(this[_0x5ce4ba(0x21f)]<0x0)this['_hoverMinimum']=_0x3a4876;const _0x172ac6=this[_0x5ce4ba(0x21f)]+_0xe82c0/_0x2a1b89[_0x5ce4ba(0x1e9)](0x1,_0x525f39**1.5);this[_0x5ce4ba(0x21f)]=_0x3dab5c[_0x5ce4ba(0x210)](_0x172ac6,_0x3a4876);}else{const _0x3f01d0=this['_hoverMinimum']-_0xe82c0/_0x103960[_0x5ce4ba(0x1e9)](0x1,_0x525f39/0x2);this[_0x5ce4ba(0x21f)]=_0x2f9bed[_0x5ce4ba(0x1e9)](_0x3f01d0,0x0);}return _0x2a8228[_0x5ce4ba(0x1e9)](0x0,this['_hoverMinimum']);}else this[_0x5ce4ba(0x293)]()[_0x5ce4ba(0x1ab)](_0x359c39,_0x57cb89);}if(_0x1b7835[_0x5ce4ba(0x248)]){if('RvpWt'!==_0x5ce4ba(0x200)){const _0x51b820=[this],_0x37c7ff=_0x1b7835[_0x5ce4ba(0x2ad)['format'](_0x18d8c5,_0x359c39)]||0x0,_0x386d06=_0x1b7835[_0x5ce4ba(0x22f)],_0x4abc83=_0x1b7835['AnimationMute'];$gameTemp[_0x5ce4ba(0x1aa)](_0x51b820,_0x37c7ff,_0x386d06,_0x4abc83);}else _0x36aaa8['VisualStateEffects'][_0x5ce4ba(0x21e)][_0x5ce4ba(0x1f7)](this),this[_0x5ce4ba(0x235)]=_0x5ce4ba(0x289);}},Game_BattlerBase[_0x4dbd61(0x1f5)][_0x4dbd61(0x2be)]=function(_0x54f76e,_0x5dd930){const _0x5dde97=_0x4dbd61;if(!SceneManager[_0x5dde97(0x221)]())return;if(_0x54f76e===this[_0x5dde97(0x28d)]())return;if(_0x5dd930&&!this[_0x5dde97(0x1d3)](_0x54f76e))return;if(!_0x5dd930&&this[_0x5dde97(0x1d3)](_0x54f76e))return;if(!this[_0x5dde97(0x293)]())return;const _0x20a810=VisuMZ[_0x5dde97(0x1fb)][_0x5dde97(0x252)][_0x5dde97(0x209)],_0x3d4a4a=$dataStates[_0x54f76e];if(!_0x3d4a4a)return;_0x20a810[_0x5dde97(0x24c)]&&!_0x3d4a4a[_0x5dde97(0x258)][_0x5dde97(0x25a)](/<HIDE STATE POPUP>/i)&&this[_0x5dde97(0x293)]()[_0x5dde97(0x1fe)](_0x54f76e,_0x5dd930),VisuMZ[_0x5dde97(0x1fb)][_0x5dde97(0x24b)](this,_0x3d4a4a,_0x5dd930);},VisuMZ['VisualStateEffects'][_0x4dbd61(0x24b)]=function(_0x58a21d,_0x36313f,_0x2e9896){const _0x2acc35=_0x4dbd61,_0x4b00e8=VisuMZ[_0x2acc35(0x1fb)][_0x2acc35(0x252)][_0x2acc35(0x209)],_0xe6dfeb=_0x4b00e8[_0x2acc35(0x22f)],_0x172be9=_0x4b00e8[_0x2acc35(0x286)],_0x358d94=_0x36313f[_0x2acc35(0x258)];if(_0x2e9896&&_0x358d94['match'](/(?:ADD|APPLY) ANIMATION:[ ](\d+)/i)){const _0x126db8=Number(RegExp['$1']);$gameTemp['requestFauxAnimation']([_0x58a21d],_0x126db8,_0xe6dfeb,_0x172be9);}if(!_0x2e9896&&_0x358d94['match'](/(?:ERASE|REMOVE) ANIMATION:[ ](\d+)/i)){if(_0x2acc35(0x29a)!==_0x2acc35(0x29a)){const _0x21c30e=0x60,_0x3d0c88=0x60,_0x3623e3=this[_0x2acc35(0x27f)]*_0x21c30e,_0x2e1fc6=0x0;this[_0x2acc35(0x211)](_0x3623e3,_0x2e1fc6,_0x21c30e,_0x3d0c88);}else{const _0x3fee14=Number(RegExp['$1']);$gameTemp[_0x2acc35(0x1aa)]([_0x58a21d],_0x3fee14,_0xe6dfeb,_0x172be9);}}},Game_BattlerBase[_0x4dbd61(0x1f5)][_0x4dbd61(0x2bf)]=function(){const _0x1afba9=_0x4dbd61,_0x3831ba=_0x1afba9(0x21c);if(this['checkCacheKey'](_0x3831ba))return this[_0x1afba9(0x1b0)][_0x3831ba];return this['_cache'][_0x3831ba]=this[_0x1afba9(0x26d)](),this['_cache'][_0x3831ba];},Game_BattlerBase[_0x4dbd61(0x1f5)][_0x4dbd61(0x26d)]=function(){const _0x51fa0c=_0x4dbd61;let _0x4c8131=[];for(const _0x1223f4 of this[_0x51fa0c(0x23b)]()){if('GcOgS'==='noeUz'){if(!_0x475577[_0x51fa0c(0x221)]())return;if(_0x22434c===this[_0x51fa0c(0x28d)]())return;if(_0x3e9cde&&!this['isStateAffected'](_0x535cd4))return;if(!_0x2ef0c8&&this[_0x51fa0c(0x1d3)](_0x55c913))return;if(!this[_0x51fa0c(0x293)]())return;const _0x2099c2=_0x32089e[_0x51fa0c(0x1fb)][_0x51fa0c(0x252)][_0x51fa0c(0x209)],_0x44d4e8=_0x4d62b5[_0x425f9c];if(!_0x44d4e8)return;_0x2099c2['ShowPopups']&&!_0x44d4e8[_0x51fa0c(0x258)]['match'](/<HIDE STATE POPUP>/i)&&this['battler']()['setupVisualStateEffectsPopup'](_0x1a4c56,_0x3ab735),_0x26381f[_0x51fa0c(0x1fb)]['setupStateAnimation'](this,_0x44d4e8,_0x29ec1d);}else{if(!_0x1223f4)continue;_0x1223f4[_0x51fa0c(0x258)][_0x51fa0c(0x25a)](/<(?:REPEAT|REPEATING|CYCLE|STATE) ANIMATION:[ ](\d+)>/i)&&_0x4c8131[_0x51fa0c(0x226)](Number(RegExp['$1'])||0x0);}}return _0x4c8131;},Game_BattlerBase[_0x4dbd61(0x1f5)][_0x4dbd61(0x1cd)]=function(){const _0x83c930=_0x4dbd61,_0x7d86dc=_0x83c930(0x247);if(this[_0x83c930(0x29d)](_0x7d86dc))return this[_0x83c930(0x1b0)][_0x7d86dc];return this[_0x83c930(0x1b0)][_0x7d86dc]=this[_0x83c930(0x1f9)](),this['_cache'][_0x7d86dc];},Game_BattlerBase[_0x4dbd61(0x1f5)][_0x4dbd61(0x1f9)]=function(){const _0x8d628e=_0x4dbd61;let _0x35cf57=[];for(const _0x26b378 of this[_0x8d628e(0x23b)]()){if(!_0x26b378)continue;_0x26b378[_0x8d628e(0x258)]['match'](/<(?:REPEAT|REPEATING|CYCLE|STATE) ANIMATION CYCLE:[ ](\d+)>/i)?_0x35cf57[_0x8d628e(0x226)](Number(RegExp['$1'])||0x0):_0x35cf57[_0x8d628e(0x226)](VisuMZ[_0x8d628e(0x1fb)][_0x8d628e(0x252)][_0x8d628e(0x209)][_0x8d628e(0x27d)]);}return _0x35cf57;},Game_BattlerBase[_0x4dbd61(0x1f5)][_0x4dbd61(0x214)]=function(){const _0x2d3fe2=_0x4dbd61,_0x2526e0='stateMotionIndex';if(this['checkCacheKey'](_0x2526e0))return this[_0x2d3fe2(0x1b0)][_0x2526e0];return this['_cache'][_0x2526e0]=this[_0x2d3fe2(0x2b0)](),this[_0x2d3fe2(0x1b0)][_0x2526e0];},Game_BattlerBase[_0x4dbd61(0x1f5)][_0x4dbd61(0x2b0)]=function(){const _0x17cfd9=_0x4dbd61,_0xf77a3c=this[_0x17cfd9(0x23b)]();for(const _0x47704b of _0xf77a3c){if(!_0x47704b)continue;if(_0x47704b[_0x17cfd9(0x258)][_0x17cfd9(0x25a)](/<STATE MOTION:[ ](.*)>/i)){if('BikvP'==='UrMyr')_0x2fd92a[_0x17cfd9(0x26f)]=_0x1725b1(_0x243d18['$1'])||0x0,_0x1d6bc3[_0x17cfd9(0x212)]=_0x337c04(_0x33f10b['$1'])||0x0;else return this[_0x17cfd9(0x241)]=String(RegExp['$1'])[_0x17cfd9(0x213)]()[_0x17cfd9(0x1e2)](),0x4;}else{if(_0x47704b[_0x17cfd9(0x1f0)]!==0x0)return _0x47704b['motion'];}}return 0x0;},Game_BattlerBase[_0x4dbd61(0x1f5)][_0x4dbd61(0x1e0)]=function(){const _0x1cec61=_0x4dbd61,_0x7c8cf7=_0x1cec61(0x1e0);if(this[_0x1cec61(0x29d)](_0x7c8cf7))return this['_cache'][_0x7c8cf7];return this['_cache'][_0x7c8cf7]=this['getStateMotionLock'](),this[_0x1cec61(0x1b0)][_0x7c8cf7];},Game_BattlerBase[_0x4dbd61(0x1f5)][_0x4dbd61(0x1a4)]=function(){const _0x4046b6=_0x4dbd61,_0x3b4608=this[_0x4046b6(0x23b)]();for(const _0x2c227e of _0x3b4608){if(_0x4046b6(0x27b)!==_0x4046b6(0x1e3)){if(!_0x2c227e)continue;if(_0x2c227e[_0x4046b6(0x258)][_0x4046b6(0x25a)](/<STATE MOTION (?:LOCK|LOCKED)>/i)){if('hcAfC'===_0x4046b6(0x272))return!![];else _0x192834['y']=0x14-this['y'];}}else{this[_0x4046b6(0x2b1)]=!![];const _0x542d57=_0x1ff94b[_0x4046b6(0x1d7)](this[_0x4046b6(0x26b)]);_0x542d57[_0x4046b6(0x1ca)](this['onLoadCustomOverlayBitmap']['bind'](this,_0x542d57));}}return![];},Game_BattlerBase['prototype'][_0x4dbd61(0x2a0)]=function(){const _0x42b13e=_0x4dbd61,_0x1943c1=_0x42b13e(0x2a0);if(this[_0x42b13e(0x29d)](_0x1943c1))return this['_cache'][_0x1943c1];return this[_0x42b13e(0x1b0)][_0x1943c1]=this[_0x42b13e(0x2c4)](),this[_0x42b13e(0x1b0)][_0x1943c1];},Game_BattlerBase['prototype']['getStateOverlayIndex']=function(){const _0x31e892=_0x4dbd61,_0x5376bf=this[_0x31e892(0x23b)]();for(const _0x13857e of _0x5376bf){if(_0x31e892(0x231)!==_0x31e892(0x231))_0x5c87eb(_0x31e892(0x222)[_0x31e892(0x1d5)](_0x52c02a,_0x43b79c,_0x301121)),_0x3534d5[_0x31e892(0x2a3)]();else{if(!_0x13857e)continue;if(_0x13857e[_0x31e892(0x258)][_0x31e892(0x25a)](/<CUSTOM OVERLAY:[ ](.*)>/i)){if(_0x31e892(0x2c5)==='yCYPB')this[_0x31e892(0x1b0)]={},_0x1dfb52['VisualStateEffects'][_0x31e892(0x285)][_0x31e892(0x1f7)](this);else return String(RegExp['$1']);}if(_0x13857e[_0x31e892(0x227)]!==0x0)return _0x13857e[_0x31e892(0x227)];}}return 0x0;},Game_BattlerBase[_0x4dbd61(0x1f5)]['getVisualStateTone']=function(){const _0xbffdae=_0x4dbd61,_0x34d1b1=_0xbffdae(0x2c9);if(this[_0xbffdae(0x29d)](_0x34d1b1))return this[_0xbffdae(0x1b0)][_0x34d1b1];return this['_cache'][_0x34d1b1]=this[_0xbffdae(0x2a9)](),this[_0xbffdae(0x1b0)][_0x34d1b1];},Game_BattlerBase[_0x4dbd61(0x1f5)][_0x4dbd61(0x2a9)]=function(){const _0x37ec7b=_0x4dbd61;for(const _0x17851e of this['states']()){if(_0x37ec7b(0x1e6)===_0x37ec7b(0x1e6)){if(!_0x17851e)continue;if(_0x17851e[_0x37ec7b(0x258)]['match'](/<STATE TONE:[ ](.*)>/i)){if(_0x37ec7b(0x267)===_0x37ec7b(0x1e8)){if(!_0xf1464a[_0x37ec7b(0x1b3)]()&&!_0x52500c[_0x37ec7b(0x239)]())return this[_0x37ec7b(0x24f)](_0x24a58e[_0x37ec7b(0x241)]);}else{let _0x1ef44b=String(RegExp['$1'])[_0x37ec7b(0x1e2)]()['split'](',')['map'](_0x22bda1=>Number(_0x22bda1)||0x0);while(_0x1ef44b[_0x37ec7b(0x299)]<0x4)_0x1ef44b[_0x37ec7b(0x226)](0x0);return _0x1ef44b[0x0]=_0x1ef44b[0x0][_0x37ec7b(0x207)](-0xff,0xff),_0x1ef44b[0x1]=_0x1ef44b[0x1][_0x37ec7b(0x207)](-0xff,0xff),_0x1ef44b[0x2]=_0x1ef44b[0x2][_0x37ec7b(0x207)](-0xff,0xff),_0x1ef44b[0x3]=_0x1ef44b[0x3][_0x37ec7b(0x207)](0x0,0xff),_0x1ef44b;}}}else{const _0x505281=_0x352c3d(_0x1891ef['$1']);_0x505281<_0xcd0eb4?(_0x3a45c5('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x37ec7b(0x1d5)](_0xc7621d,_0x505281,_0x390af1)),_0x47be57[_0x37ec7b(0x2a3)]()):_0x3af62c=_0x379c01[_0x37ec7b(0x1e9)](_0x505281,_0x30405a);}}return[0x0,0x0,0x0,0x0];},Game_BattlerBase[_0x4dbd61(0x1f5)][_0x4dbd61(0x265)]=function(){const _0x436b42=_0x4dbd61,_0x757297=_0x436b42(0x265);if(this[_0x436b42(0x29d)](_0x757297))return this[_0x436b42(0x1b0)][_0x757297];return this[_0x436b42(0x1b0)][_0x757297]=this['createVisualHoveringData'](),this[_0x436b42(0x1b0)][_0x757297];},Game_BattlerBase['prototype'][_0x4dbd61(0x1bd)]=function(){const _0x458465=_0x4dbd61,_0x2dc3a3=/<VISUAL (?:HOVER|FLOAT) EFFECT>\s*([\s\S]*)\s*<\/VISUAL (?:HOVER|FLOAT) EFFECT>/i,_0x55cb5b={'hover':![],'base':0x64,'speed':0x14,'rate':0x5,'deathHover':![]};for(const _0x1c4fc8 of this['traitObjects']()){if(!_0x1c4fc8)continue;if(_0x1c4fc8[_0x458465(0x258)]['match'](_0x2dc3a3)){if(_0x458465(0x1a8)===_0x458465(0x223))return this[_0x458465(0x24f)](_0x2f373d[_0x458465(0x241)]);else{_0x55cb5b['hover']=!![];const _0x2ecb50=String(RegExp['$1']);_0x2ecb50['match'](/BASE:[ ](.*)/i)&&(_0x458465(0x28e)!=='gjJEo'?_0x55cb5b[_0x458465(0x2cb)]=Number(RegExp['$1'])||0x0:_0x3be502[_0x458465(0x1fb)][_0x458465(0x216)][_0x458465(0x1f7)](this));if(_0x2ecb50['match'](/SPEED:[ ](.*)/i)){if(_0x458465(0x245)!==_0x458465(0x2c0))_0x55cb5b[_0x458465(0x268)]=Number(RegExp['$1'])||0x0;else{if(!this[_0x458465(0x1df)])return 0x0;if(this[_0x458465(0x1df)][_0x458465(0x24a)]())return 0x0;const _0x5f37b6=this[_0x458465(0x1df)][_0x458465(0x219)]();if(!_0x5f37b6)return 0x0;if(!_0x5f37b6[_0x458465(0x1c3)])return 0x0;let _0x154b37=this[_0x458465(0x264)](_0x5f37b6,_0x5f37b6[_0x458465(0x2bc)],_0x5f37b6['rateX']);const _0x243ead=this['_distortionSprite'][_0x458465(0x25f)]['x']>0x0?0x1:-0x1;return _0x154b37*_0x243ead;}}if(_0x2ecb50[_0x458465(0x25a)](/RATE:[ ](.*)/i)){if(_0x458465(0x266)===_0x458465(0x237)){this[_0x458465(0x1f3)]--;return;}else _0x55cb5b[_0x458465(0x217)]=Number(RegExp['$1'])||0x0;}if(_0x2ecb50[_0x458465(0x25a)](/DEATH: HOVER/i))_0x55cb5b[_0x458465(0x1f4)]=!![];else _0x2ecb50[_0x458465(0x25a)](/DEATH: FLOOR/i)&&(_0x55cb5b['deathHover']=![]);break;}}}return _0x55cb5b;},Game_BattlerBase[_0x4dbd61(0x1f5)][_0x4dbd61(0x24a)]=function(){const _0x120669=_0x4dbd61,_0x80d5b3=_0x120669(0x24a);if(this[_0x120669(0x29d)](_0x80d5b3))return this[_0x120669(0x1b0)][_0x80d5b3];const _0x22eddd=this[_0x120669(0x2ba)]();return this[_0x120669(0x1b0)][_0x80d5b3]=_0x22eddd[_0x120669(0x290)](_0x571a69=>_0x571a69&&_0x571a69['note'][_0x120669(0x25a)](/<NO (?:BREATH|BREATHING)>/i)),this[_0x120669(0x1b0)][_0x80d5b3];},Game_BattlerBase[_0x4dbd61(0x1f5)][_0x4dbd61(0x219)]=function(){const _0x3bc323=_0x4dbd61,_0x312a35='breathingData';if(this[_0x3bc323(0x29d)](_0x312a35))return this[_0x3bc323(0x1b0)][_0x312a35];return this['_cache'][_0x312a35]=this['createVisualBreathingData'](),this[_0x3bc323(0x1b0)][_0x312a35];},Game_BattlerBase[_0x4dbd61(0x1f5)][_0x4dbd61(0x1b9)]=function(){const _0x5dda7f=_0x4dbd61,_0x361bf5=/<VISUAL (?:BREATH|BREATHING) EFFECT>\s*([\s\S]*)\s*<\/VISUAL (?:BREATH|BREATHING) EFFECT>/i,_0x86cd29={'breathing':![],'speedX':0xa,'speedY':0xa,'rateX':0x0,'rateY':0.02,'hpLinked':![]};for(const _0x3806e8 of this['traitObjects']()){if('QvqtJ'!==_0x5dda7f(0x206)){if(!_0x3806e8)continue;if(_0x3806e8[_0x5dda7f(0x258)][_0x5dda7f(0x25a)](_0x361bf5)){_0x86cd29[_0x5dda7f(0x1c3)]=!![];const _0x48b610=String(RegExp['$1']);_0x48b610['match'](/SPEED:[ ](.*)/i)&&(_0x86cd29['speedX']=Number(RegExp['$1'])||0x0,_0x86cd29['speedY']=Number(RegExp['$1'])||0x0);_0x48b610[_0x5dda7f(0x25a)](/(?:SPEEDX|SPEED X):[ ](.*)/i)&&(_0x86cd29[_0x5dda7f(0x2bc)]=Number(RegExp['$1'])||0x0);_0x48b610[_0x5dda7f(0x25a)](/(?:SPEEDY|SPEED Y):[ ](.*)/i)&&(_0x5dda7f(0x27a)!==_0x5dda7f(0x27a)?this[_0x5dda7f(0x2cd)][_0x5dda7f(0x269)]=_0x58cf66[_0x5dda7f(0x1e9)](this['_distortionSprite'][_0x5dda7f(0x269)]-_0x26f56e,_0x5eb1ea):_0x86cd29['speedY']=Number(RegExp['$1'])||0x0);if(_0x48b610['match'](/RATE:[ ](.*)/i)){if(_0x5dda7f(0x2b2)===_0x5dda7f(0x232)){const _0x260ed5=_0x5dda7f(0x247);if(this[_0x5dda7f(0x29d)](_0x260ed5))return this['_cache'][_0x260ed5];return this['_cache'][_0x260ed5]=this['createVisualRepeatingStateAnimationCycle'](),this['_cache'][_0x260ed5];}else _0x86cd29['rateX']=Number(RegExp['$1'])||0x0,_0x86cd29[_0x5dda7f(0x212)]=Number(RegExp['$1'])||0x0;}_0x48b610['match'](/(?:RATEX|RATE X):[ ](.*)/i)&&(_0x86cd29['rateX']=Number(RegExp['$1'])||0x0);_0x48b610[_0x5dda7f(0x25a)](/(?:RATEY|RATE Y):[ ](.*)/i)&&(_0x86cd29[_0x5dda7f(0x212)]=Number(RegExp['$1'])||0x0);if(_0x48b610[_0x5dda7f(0x25a)](/(?:HPLINK|HP LINK|HPLINKED|HP LINKED): ON/i))'QbxPA'!==_0x5dda7f(0x23f)?(_0x5e704b[_0x5dda7f(0x1fb)][_0x5dda7f(0x1fc)]['call'](this),this[_0x5dda7f(0x2b3)](),this['initVisualHoverEffect']()):_0x86cd29[_0x5dda7f(0x1e5)]=!![];else _0x48b610[_0x5dda7f(0x25a)](/(?:HPLINK|HP LINK|HPLINKED|HP LINKED): OFF/i)&&('ogOZd'!=='zLDrw'?_0x86cd29[_0x5dda7f(0x1e5)]=![]:_0x5ddc59['x']+=this[_0x5dda7f(0x1df)][_0x5dda7f(0x26e)]());break;}}else{const _0x129700=_0x5dda7f(0x21c);if(this[_0x5dda7f(0x29d)](_0x129700))return this['_cache'][_0x129700];return this[_0x5dda7f(0x1b0)][_0x129700]=this[_0x5dda7f(0x26d)](),this[_0x5dda7f(0x1b0)][_0x129700];}}return _0x86cd29;},VisuMZ[_0x4dbd61(0x1fb)]['Game_Battler_onAddState']=Game_Battler[_0x4dbd61(0x1f5)]['onAddState'],Game_Battler['prototype'][_0x4dbd61(0x249)]=function(_0x33c5f4){const _0x1a29ab=_0x4dbd61;VisuMZ['VisualStateEffects'][_0x1a29ab(0x1d4)]['call'](this,_0x33c5f4),this[_0x1a29ab(0x2be)](_0x33c5f4,!![]);},VisuMZ['VisualStateEffects'][_0x4dbd61(0x2ae)]=Game_BattlerBase['prototype']['die'],Game_BattlerBase[_0x4dbd61(0x1f5)]['die']=function(){const _0x5756a5=_0x4dbd61;this[_0x5756a5(0x20a)]=!![],VisuMZ[_0x5756a5(0x1fb)][_0x5756a5(0x2ae)]['call'](this),this[_0x5756a5(0x20a)]=undefined;},VisuMZ[_0x4dbd61(0x1fb)][_0x4dbd61(0x2c7)]=Game_Battler[_0x4dbd61(0x1f5)][_0x4dbd61(0x22d)],Game_Battler[_0x4dbd61(0x1f5)]['onRemoveState']=function(_0x11fe27){const _0x28af49=_0x4dbd61;if(!this[_0x28af49(0x20a)])this[_0x28af49(0x2be)](_0x11fe27,![]);VisuMZ[_0x28af49(0x1fb)][_0x28af49(0x2c7)][_0x28af49(0x1f7)](this,_0x11fe27);},VisuMZ[_0x4dbd61(0x1fb)][_0x4dbd61(0x1fc)]=Sprite_Battler[_0x4dbd61(0x1f5)][_0x4dbd61(0x1d9)],Sprite_Battler[_0x4dbd61(0x1f5)][_0x4dbd61(0x1d9)]=function(){const _0x1a4377=_0x4dbd61;VisuMZ['VisualStateEffects'][_0x1a4377(0x1fc)][_0x1a4377(0x1f7)](this),this[_0x1a4377(0x2b3)](),this[_0x1a4377(0x1b7)]();},Sprite_Battler[_0x4dbd61(0x1f5)][_0x4dbd61(0x2b3)]=function(){const _0x25d53a=_0x4dbd61;this[_0x25d53a(0x1f3)]=0x0,this['_visualStateAnimationIndex']=0x0;},Sprite_Battler[_0x4dbd61(0x1f5)][_0x4dbd61(0x1ab)]=function(_0x2af0be,_0x86dfe4){const _0x5c3657=_0x4dbd61,_0x2ba974=VisuMZ[_0x5c3657(0x1fb)][_0x5c3657(0x252)][_0x5c3657(0x251)],_0x1ebf92=_0x86dfe4?_0x5c3657(0x1d6):_0x5c3657(0x275),_0x2a27fe=_0x86dfe4?Game_BattlerBase[_0x5c3657(0x2b8)]:Game_BattlerBase['ICON_DEBUFF_START'],_0x31462e=_0x2a27fe+_0x2af0be,_0x52d60e=TextManager[_0x5c3657(0x1c7)](_0x2af0be),_0x805598=_0x2ba974[_0x5c3657(0x1c0)['format'](_0x1ebf92)];if(_0x805598[_0x5c3657(0x299)]<=0x0)return;let _0x3e4407=_0x805598['format'](_0x52d60e);const _0x5ef6ce={'textColor':_0x2ba974[_0x5c3657(0x225)[_0x5c3657(0x1d5)](_0x1ebf92)]||0x0,'flashColor':_0x2ba974[_0x5c3657(0x2aa)['format'](_0x1ebf92)]||[0x0,0x0,0x0,0x0],'flashDuration':_0x2ba974['%1FlashDuration'[_0x5c3657(0x1d5)](_0x1ebf92)]||0x0},_0x52b464=ImageManager[_0x5c3657(0x1d7)](_0x5c3657(0x28c));_0x52b464[_0x5c3657(0x1ca)](this['setupIconTextPopup']['bind'](this,_0x31462e,_0x3e4407,_0x5ef6ce));},Sprite_Battler['prototype']['setupVisualStateEffectsPopup']=function(_0x55812e,_0x4bbb9b){const _0x171958=_0x4dbd61,_0xd46fdc=VisuMZ[_0x171958(0x1fb)][_0x171958(0x252)][_0x171958(0x209)],_0x2d5f48=$dataStates[_0x55812e];if(!_0x2d5f48)return;const _0x3c7440=_0x4bbb9b?_0x171958(0x208):_0x171958(0x243),_0x237350=_0x2d5f48[_0x171958(0x1c8)];if(_0x237350<=0x0)return;const _0x73b3c5=_0xd46fdc['%1PopupFmt'[_0x171958(0x1d5)](_0x3c7440)];if(_0x73b3c5[_0x171958(0x299)]<=0x0)return;let _0x3940dd=_0x73b3c5[_0x171958(0x1d5)](_0x2d5f48['name']);const _0x303a19={'textColor':_0xd46fdc[_0x171958(0x2b4)]||0x0,'flashColor':_0xd46fdc[_0x171958(0x2a4)]||[0x0,0x0,0x0,0x0],'flashDuration':_0xd46fdc[_0x171958(0x283)]||0x0};_0xd46fdc[_0x171958(0x2a6)]&&(_0x303a19[_0x171958(0x1e4)]=ColorManager[_0x171958(0x2a7)](_0x2d5f48));VisuMZ[_0x171958(0x1fb)][_0x171958(0x21b)](_0x2d5f48,_0x303a19);const _0x727c37=ImageManager[_0x171958(0x1d7)](_0x171958(0x28c));_0x727c37[_0x171958(0x1ca)](this[_0x171958(0x1bf)]['bind'](this,_0x237350,_0x3940dd,_0x303a19));},VisuMZ[_0x4dbd61(0x1fb)]['customizeStatePopup']=function(_0x2012de,_0x15f724){const _0x13079a=_0x4dbd61,_0x79856f=_0x2012de['note'];if(_0x79856f[_0x13079a(0x25a)](/<STATE POPUP>\s*([\s\S]*)\s*<\/STATE POPUP>/i)){const _0x5a3837=String(RegExp['$1'])[_0x13079a(0x1e2)]()[_0x13079a(0x29b)](/[\r\n]+/);for(const _0x36f2e4 of _0x5a3837){_0x36f2e4['match'](/(?:TEXT COLOR|TEXTCOLOR):[ ](.*)/i)&&(_0x15f724[_0x13079a(0x1e4)]=String(RegExp['$1'])[_0x13079a(0x1e2)]());if(_0x36f2e4[_0x13079a(0x25a)](/(?:FLASH COLOR|FLASHCOLOR):[ ](.*)/i)){if(_0x13079a(0x238)==='Fsxar')_0x36c75d['speed']=_0x3e8347(_0x2dbf0e['$1'])||0x0;else{_0x15f724[_0x13079a(0x1ed)]=String(RegExp['$1'])[_0x13079a(0x1e2)]()[_0x13079a(0x29b)](',')[_0x13079a(0x25d)](_0x4d6d90=>Number(_0x4d6d90));while(_0x15f724[_0x13079a(0x1ed)][_0x13079a(0x299)]<=0x4){_0x15f724[_0x13079a(0x1ed)][_0x13079a(0x226)](0x0);};_0x15f724[_0x13079a(0x280)]=_0x15f724[_0x13079a(0x280)]||0x1;}}_0x36f2e4['match'](/(?:FLASH DURATION|FLASHDURATION):[ ](\d+)/i)&&(_0x15f724['flashDuration']=Number(RegExp['$1']));}}},Sprite_Battler[_0x4dbd61(0x1f5)][_0x4dbd61(0x250)]=function(){const _0x1cb564=_0x4dbd61;if(!this[_0x1cb564(0x1af)]())return;if(this['_visualStateAnimationRepeatDuration']>0x0){this[_0x1cb564(0x1f3)]--;return;}const _0x23bc20=this['_battler']['getVisualRepeatingStateAnimation'](),_0x420e35=this[_0x1cb564(0x1df)][_0x1cb564(0x1cd)]();if(_0x23bc20[_0x1cb564(0x299)]<=0x0)return;if(this[_0x1cb564(0x1ec)]>=_0x23bc20['length']){if(_0x1cb564(0x215)===_0x1cb564(0x215))this['_visualStateAnimationIndex']=0x0;else return!![];}const _0x50dcae=_0x23bc20[this['_visualStateAnimationIndex']],_0x2b78fc=VisuMZ['VisualStateEffects']['Settings'][_0x1cb564(0x209)],_0x53738a=[this[_0x1cb564(0x1df)]],_0x1bdf3d=_0x2b78fc[_0x1cb564(0x2b9)],_0x36751d=_0x2b78fc[_0x1cb564(0x1f6)];$gameTemp['requestFauxAnimation'](_0x53738a,_0x50dcae,_0x1bdf3d,_0x36751d);const _0x4be523=_0x420e35[this[_0x1cb564(0x1ec)]]||_0x2b78fc[_0x1cb564(0x27d)];this[_0x1cb564(0x1f3)]=_0x4be523,this[_0x1cb564(0x1ec)]++;},Sprite_Battler['prototype']['isRepeatingVisualStateAnimationShown']=function(){const _0x56828e=_0x4dbd61;if(!this[_0x56828e(0x1df)])return![];if(!this[_0x56828e(0x1df)]['isSpriteVisible']())return![];if(!this['_battler'][_0x56828e(0x228)]())return![];if(!this['_battler'][_0x56828e(0x2c8)]())return![];if(this[_0x56828e(0x2a5)][_0x56828e(0x23c)]===_0x56828e(0x27c))return![];if(this[_0x56828e(0x269)]<=0x0)return![];return!![];},Sprite_Battler[_0x4dbd61(0x1f5)][_0x4dbd61(0x1fd)]=function(){const _0x4913f7=_0x4dbd61;this[_0x4913f7(0x29e)]&&this[_0x4913f7(0x20b)](),this[_0x4913f7(0x284)]&&this[_0x4913f7(0x1d8)](),this[_0x4913f7(0x250)](),this[_0x4913f7(0x2a1)](),this[_0x4913f7(0x260)]();},Sprite_Battler[_0x4dbd61(0x1f5)][_0x4dbd61(0x20b)]=function(){const _0x2825bf=_0x4dbd61;if(!this['_battler'])return;const _0x3786c2=VisuMZ[_0x2825bf(0x1fb)][_0x2825bf(0x252)]['General'],_0x22f89c=this[_0x2825bf(0x29e)];_0x22f89c[_0x2825bf(0x25b)]=this[_0x2825bf(0x1df)][_0x2825bf(0x2a8)]()?_0x3786c2[_0x2825bf(0x273)]:_0x3786c2[_0x2825bf(0x205)];if(this[_0x2825bf(0x1df)][_0x2825bf(0x2a8)]()){if('IIgiH'===_0x2825bf(0x202)){if(!this[_0x2825bf(0x1af)]())return;if(this[_0x2825bf(0x1f3)]>0x0){this['_visualStateAnimationRepeatDuration']--;return;}const _0x2da7ac=this[_0x2825bf(0x1df)][_0x2825bf(0x2bf)](),_0x17ea77=this[_0x2825bf(0x1df)]['getVisualRepeatingStateAnimationCycle']();if(_0x2da7ac[_0x2825bf(0x299)]<=0x0)return;this['_visualStateAnimationIndex']>=_0x2da7ac['length']&&(this['_visualStateAnimationIndex']=0x0);const _0x264427=_0x2da7ac[this[_0x2825bf(0x1ec)]],_0x3e03b0=_0x3c0507[_0x2825bf(0x1fb)][_0x2825bf(0x252)][_0x2825bf(0x209)],_0x10a385=[this['_battler']],_0x1088b7=_0x3e03b0[_0x2825bf(0x2b9)],_0x325c71=_0x3e03b0['RepeatMute'];_0x2edd0f[_0x2825bf(0x1aa)](_0x10a385,_0x264427,_0x1088b7,_0x325c71);const _0x5b0154=_0x17ea77[this[_0x2825bf(0x1ec)]]||_0x3e03b0[_0x2825bf(0x27d)];this[_0x2825bf(0x1f3)]=_0x5b0154,this[_0x2825bf(0x1ec)]++;}else{_0x22f89c['x']=0x0;this['_battler']['battleUIOffsetX']&&(_0x22f89c['x']+=this[_0x2825bf(0x1df)]['battleUIOffsetX']());_0x22f89c['y']=-Math['round']((this[_0x2825bf(0x224)]+0x28)*0.9);if(_0x22f89c['y']<0x14-this['y']){if('kzsza'==='ZMerm'){if(!this[_0x2825bf(0x2b1)]&&this[_0x2825bf(0x235)]!==this[_0x2825bf(0x26b)]){this[_0x2825bf(0x2b1)]=!![];const _0x2c3c63=_0x21bbe9[_0x2825bf(0x1d7)](this[_0x2825bf(0x26b)]);_0x2c3c63[_0x2825bf(0x1ca)](this[_0x2825bf(0x1c9)]['bind'](this,_0x2c3c63));}if(this[_0x2825bf(0x235)]===this[_0x2825bf(0x26b)]){const _0x1ed913=0x60,_0x788c1=0x60,_0x55e3ff=this[_0x2825bf(0x27f)]*_0x1ed913,_0x3920f3=0x0;this[_0x2825bf(0x211)](_0x55e3ff,_0x3920f3,_0x1ed913,_0x788c1);}}else _0x22f89c['y']=0x14-this['y'];}this[_0x2825bf(0x1df)]['battleUIOffsetY']&&(_0x22f89c['y']+=this[_0x2825bf(0x1df)]['battleUIOffsetY']()-0x4);}}},Sprite_Battler[_0x4dbd61(0x1f5)][_0x4dbd61(0x1d8)]=function(){const _0x50d2ca=_0x4dbd61;if(!this[_0x50d2ca(0x1df)])return;const _0x4f294a=VisuMZ[_0x50d2ca(0x1fb)][_0x50d2ca(0x252)][_0x50d2ca(0x2c6)],_0x471d0c=this[_0x50d2ca(0x284)];_0x471d0c[_0x50d2ca(0x25b)]=this[_0x50d2ca(0x1df)][_0x50d2ca(0x2a8)]()?_0x4f294a[_0x50d2ca(0x282)]:_0x4f294a[_0x50d2ca(0x1e1)];this[_0x50d2ca(0x2c3)]&&(this[_0x50d2ca(0x2c3)][_0x50d2ca(0x284)][_0x50d2ca(0x25b)]=![]);if(this['_battler'][_0x50d2ca(0x20c)]()&&!this['_battler']['hasSvBattler']()){if(this[_0x50d2ca(0x29e)]){if(_0x50d2ca(0x242)===_0x50d2ca(0x242))_0x471d0c['y']=this[_0x50d2ca(0x29e)]['y']+_0x471d0c['height'];else{const _0x32ed49='visualStateTone';if(this['checkCacheKey'](_0x32ed49))return this[_0x50d2ca(0x1b0)][_0x32ed49];return this[_0x50d2ca(0x1b0)][_0x32ed49]=this[_0x50d2ca(0x2a9)](),this[_0x50d2ca(0x1b0)][_0x32ed49];}}else _0x471d0c['y']=-this[_0x50d2ca(0x224)]+_0x471d0c[_0x50d2ca(0x224)];};},Sprite_Battler[_0x4dbd61(0x1f5)][_0x4dbd61(0x2a1)]=function(){const _0xdaf220=_0x4dbd61;if(!this[_0xdaf220(0x1df)])return;const _0x46ce17=this[_0xdaf220(0x22e)](),_0x5e9ee9=this[_0xdaf220(0x1df)][_0xdaf220(0x21a)]();if(_0x46ce17){if(_0xdaf220(0x233)!==_0xdaf220(0x233)){if(!this[_0xdaf220(0x20a)])this['setupVisualStateEffect'](_0x1e55aa,![]);_0xdabc38['VisualStateEffects']['Game_Battler_onRemoveState'][_0xdaf220(0x1f7)](this,_0x33a3b4);}else _0x46ce17[_0xdaf220(0x1cf)](_0x5e9ee9);}if(this[_0xdaf220(0x254)]){if(_0xdaf220(0x1c1)!==_0xdaf220(0x1db))this[_0xdaf220(0x254)][_0xdaf220(0x1cf)](_0x5e9ee9);else{const _0x45600c=this[_0xdaf220(0x281)];if(!_0x45600c)return;if(_0x36dbce[_0xdaf220(0x203)]&&_0x45600c['hasDragonbonesBattler']())return;const _0x55047e=_0x45600c[_0xdaf220(0x214)]();if(_0x55047e>=0x4){if(!_0x45600c[_0xdaf220(0x1b3)]()&&!_0x45600c[_0xdaf220(0x239)]())return this['startMotion'](_0x45600c[_0xdaf220(0x241)]);}_0xcd1e2b[_0xdaf220(0x1fb)][_0xdaf220(0x292)]['call'](this);}}},Sprite_Battler[_0x4dbd61(0x1f5)][_0x4dbd61(0x22e)]=function(){const _0x2e2531=_0x4dbd61;return this[_0x2e2531(0x230)]||this;},VisuMZ[_0x4dbd61(0x1fb)][_0x4dbd61(0x216)]=Sprite_Battler[_0x4dbd61(0x1f5)]['updateDragonbonesTimeScale'],Sprite_Battler[_0x4dbd61(0x1f5)]['updateDragonbonesTimeScale']=function(){const _0x1a8ae5=_0x4dbd61;if(!this['_dragonbones'])return;this[_0x1a8ae5(0x1df)][_0x1a8ae5(0x1e0)]()?this[_0x1a8ae5(0x21d)]['animation']['timeScale']=0x0:_0x1a8ae5(0x2ce)===_0x1a8ae5(0x22a)?(_0x248a44['VisualStateEffects'][_0x1a8ae5(0x2ab)][_0x1a8ae5(0x1f7)](this),this[_0x1a8ae5(0x23e)]()):VisuMZ[_0x1a8ae5(0x1fb)][_0x1a8ae5(0x216)][_0x1a8ae5(0x1f7)](this);},Sprite_Battler[_0x4dbd61(0x1f5)]['initVisualHoverEffect']=function(){const _0x1cfa3b=_0x4dbd61;this[_0x1cfa3b(0x21f)]=-0x1;},VisuMZ[_0x4dbd61(0x1fb)][_0x4dbd61(0x1fa)]=Sprite_Battler[_0x4dbd61(0x1f5)][_0x4dbd61(0x201)],Sprite_Battler[_0x4dbd61(0x1f5)][_0x4dbd61(0x201)]=function(){const _0x1b00ad=_0x4dbd61;let _0x42960d=VisuMZ[_0x1b00ad(0x1fb)]['Sprite_Battler_extraPositionY']['call'](this);return _0x42960d-=Math[_0x1b00ad(0x2af)](this[_0x1b00ad(0x1a7)]()),_0x42960d;},Sprite_Battler[_0x4dbd61(0x1f5)]['hoverHeight']=function(){const _0x5dff88=_0x4dbd61;if(this[_0x5dff88(0x2a5)]===Sprite_SvEnemy)return 0x0;if(!this[_0x5dff88(0x1df)])return 0x0;if(this[_0x5dff88(0x1df)][_0x5dff88(0x291)]&&this[_0x5dff88(0x1df)]['isBattlerGrounded']())return 0x0;const _0x446d7d=this[_0x5dff88(0x1df)][_0x5dff88(0x265)]();let _0x1c2823=0x0;this[_0x5dff88(0x296)]=this[_0x5dff88(0x296)]||Math[_0x5dff88(0x2af)](Math[_0x5dff88(0x29f)]()*0x2710);const _0x1a3f96=Graphics[_0x5dff88(0x253)]+this[_0x5dff88(0x296)],_0x5a0329=_0x446d7d[_0x5dff88(0x268)],_0x2e812c=_0x446d7d['rate'];let _0x43289c=_0x446d7d['hover'];if(_0x43289c&&this[_0x5dff88(0x1df)][_0x5dff88(0x2bb)]())_0x43289c=_0x446d7d[_0x5dff88(0x1f4)];if(_0x43289c){_0x1c2823+=Math[_0x5dff88(0x1f1)](_0x1a3f96/(_0x5a0329||0x1))*_0x2e812c,_0x1c2823+=_0x446d7d['base'];if(this[_0x5dff88(0x21f)]<0x0)this['_hoverMinimum']=_0x1c2823;const _0x2f24ac=this[_0x5dff88(0x21f)]+_0x5a0329/Math['max'](0x1,_0x2e812c**1.5);this[_0x5dff88(0x21f)]=Math['min'](_0x2f24ac,_0x1c2823);}else{const _0x45eb81=this[_0x5dff88(0x21f)]-_0x5a0329/Math['max'](0x1,_0x2e812c/0x2);this[_0x5dff88(0x21f)]=Math[_0x5dff88(0x1e9)](_0x45eb81,0x0);}return Math[_0x5dff88(0x1e9)](0x0,this['_hoverMinimum']);},VisuMZ[_0x4dbd61(0x1fb)]['Sprite_Battler_updateOpacity']=Sprite_Battler['prototype']['updateOpacity'],Sprite_Battler[_0x4dbd61(0x1f5)][_0x4dbd61(0x2b7)]=function(){const _0x218449=_0x4dbd61;VisuMZ[_0x218449(0x1fb)][_0x218449(0x1b6)][_0x218449(0x1f7)](this),this[_0x218449(0x1dc)]();},Sprite_Battler[_0x4dbd61(0x1f5)]['updateDistortionOpacity']=function(){const _0x226926=_0x4dbd61;if(!this[_0x226926(0x2cd)])return;if(!this['_battler'])return;if(this['constructor']===Sprite_SvEnemy)return;const _0x547708=this[_0x226926(0x1df)][_0x226926(0x24d)]();if(this[_0x226926(0x2cd)]['opacity']!==_0x547708){if(_0x226926(0x204)===_0x226926(0x27e)){if(typeof this['_overlayIndex']==='string')return this[_0x226926(0x218)]();else{if(this[_0x226926(0x235)]!==_0x226926(0x289)){this[_0x226926(0x2b1)]=!![];const _0x4c1baa=_0x327b0f[_0x226926(0x1d7)](_0x226926(0x289));_0x4c1baa[_0x226926(0x1ca)](this[_0x226926(0x1b4)][_0x226926(0x28a)](this,_0x4c1baa));}else this[_0x226926(0x235)]==='States'&&_0x4765d9[_0x226926(0x1fb)][_0x226926(0x2cc)][_0x226926(0x1f7)](this);}}else{const _0xb26db5=0x8;this[_0x226926(0x2cd)][_0x226926(0x269)]>_0x547708?this['_distortionSprite'][_0x226926(0x269)]=Math[_0x226926(0x1e9)](this[_0x226926(0x2cd)][_0x226926(0x269)]-_0xb26db5,_0x547708):this[_0x226926(0x2cd)][_0x226926(0x269)]=Math[_0x226926(0x210)](this[_0x226926(0x2cd)]['opacity']+_0xb26db5,_0x547708);}}},Game_BattlerBase[_0x4dbd61(0x1f5)][_0x4dbd61(0x24d)]=function(){const _0x3ad52b=_0x4dbd61,_0x40ea4d=_0x3ad52b(0x24d);if(this[_0x3ad52b(0x29d)](_0x40ea4d))return this[_0x3ad52b(0x1b0)][_0x40ea4d];return this[_0x3ad52b(0x1b0)][_0x40ea4d]=this[_0x3ad52b(0x1b5)](),this[_0x3ad52b(0x1b0)][_0x40ea4d];},Game_BattlerBase['prototype'][_0x4dbd61(0x1b5)]=function(){const _0x5dc432=_0x4dbd61;for(const _0x1842f3 of this[_0x5dc432(0x23b)]()){if(!_0x1842f3)continue;if(_0x1842f3[_0x5dc432(0x258)][_0x5dc432(0x25a)](/<VISUAL OPACITY:[ ](\d+)([%％])>/i)){const _0x2521ed=Number(RegExp['$1'])*0.01;return Math['round'](_0x2521ed*0xff)[_0x5dc432(0x207)](0x0,0xff);}if(_0x1842f3[_0x5dc432(0x258)]['match'](/<VISUAL OPACITY:[ ](\d+)>/i))return Number(RegExp['$1'])['clamp'](0x0,0xff);}return 0xff;},Sprite_Battler[_0x4dbd61(0x1f5)][_0x4dbd61(0x260)]=function(){const _0x544084=_0x4dbd61;if(!this['_battler'])return;const _0x299ef5=this[_0x544084(0x1df)][_0x544084(0x1f2)]();if(_0x299ef5===0x0&&this[_0x544084(0x2cd)]['_hue']!==0x0)this[_0x544084(0x2cd)][_0x544084(0x22c)](0x0);else{let _0x31f3c6=this[_0x544084(0x2cd)][_0x544084(0x229)]+_0x299ef5;_0x31f3c6%=0x168,this[_0x544084(0x2cd)][_0x544084(0x22c)](_0x31f3c6);}},Game_BattlerBase[_0x4dbd61(0x1f5)]['visualStateRainbow']=function(){const _0x1e2287=_0x4dbd61,_0x4f6a2b='visualStateRainbow';if(this[_0x1e2287(0x29d)](_0x4f6a2b))return this[_0x1e2287(0x1b0)][_0x4f6a2b];return this['_cache'][_0x4f6a2b]=this['createVisualStateRainbow'](),this[_0x1e2287(0x1b0)][_0x4f6a2b];},Game_BattlerBase['prototype'][_0x4dbd61(0x1c6)]=function(){const _0x285310=_0x4dbd61;for(const _0x37344f of this['states']()){if(!_0x37344f)continue;if(_0x37344f['note'][_0x285310(0x25a)](/<VISUAL RAINBOW:[ ]([\+\-]\d+)>/i)){if(_0x285310(0x25e)==='OvePv')return Number(RegExp['$1']);else{if(this[_0x285310(0x2a5)]!==_0xe88a17)return;this[_0x285310(0x29e)]=new _0x3eb964(),this[_0x285310(0x257)](this['_stateIconSprite']),this[_0x285310(0x29e)]['bitmap'][_0x285310(0x1bb)]=![];}}}return 0x0;},VisuMZ[_0x4dbd61(0x1fb)]['Sprite_Battler_mainSpriteScaleX']=Sprite_Battler[_0x4dbd61(0x1f5)][_0x4dbd61(0x1b2)],Sprite_Battler[_0x4dbd61(0x1f5)]['mainSpriteScaleX']=function(){const _0x4e1f2e=_0x4dbd61;let _0x220411=VisuMZ[_0x4e1f2e(0x1fb)][_0x4e1f2e(0x1b1)][_0x4e1f2e(0x1f7)](this);return _0x220411+=this[_0x4e1f2e(0x262)](),_0x220411;},VisuMZ['VisualStateEffects']['Sprite_Battler_mainSpriteScaleY']=Sprite_Battler[_0x4dbd61(0x1f5)][_0x4dbd61(0x240)],Sprite_Battler[_0x4dbd61(0x1f5)][_0x4dbd61(0x240)]=function(){const _0x1e2d80=_0x4dbd61;let _0x209473=VisuMZ[_0x1e2d80(0x1fb)]['Sprite_Battler_mainSpriteScaleY']['call'](this);return _0x209473+=this[_0x1e2d80(0x288)](),_0x209473;},Sprite_Battler[_0x4dbd61(0x1f5)]['applyBreathingScaleX']=function(){const _0x4957f3=_0x4dbd61;if(!this[_0x4957f3(0x1df)])return 0x0;if(this[_0x4957f3(0x1df)][_0x4957f3(0x24a)]())return 0x0;const _0x4d6022=this[_0x4957f3(0x1df)][_0x4957f3(0x219)]();if(!_0x4d6022)return 0x0;if(!_0x4d6022[_0x4957f3(0x1c3)])return 0x0;let _0x1e14b8=this[_0x4957f3(0x264)](_0x4d6022,_0x4d6022[_0x4957f3(0x2bc)],_0x4d6022['rateX']);const _0x204dca=this['_distortionSprite'][_0x4957f3(0x25f)]['x']>0x0?0x1:-0x1;return _0x1e14b8*_0x204dca;},Sprite_Battler[_0x4dbd61(0x1f5)]['applyBreathingScaleY']=function(){const _0x175f13=_0x4dbd61;if(!this[_0x175f13(0x1df)])return 0x0;if(this[_0x175f13(0x1df)][_0x175f13(0x24a)]())return 0x0;const _0x843852=this[_0x175f13(0x1df)][_0x175f13(0x219)]();if(!_0x843852)return 0x0;if(!_0x843852[_0x175f13(0x1c3)])return 0x0;let _0x23cbc7=this[_0x175f13(0x264)](_0x843852,_0x843852[_0x175f13(0x26c)],_0x843852['rateY']);return _0x23cbc7;},Sprite_Battler['prototype'][_0x4dbd61(0x264)]=function(_0x41cdd2,_0x1de830,_0x1a3ff5){const _0x302d3b=_0x4dbd61;this[_0x302d3b(0x28b)]=this['_breathingRand']??Math[_0x302d3b(0x1be)](0x2710);let _0x2e180b=Graphics[_0x302d3b(0x253)]+this['_breathingRand'];return _0x41cdd2[_0x302d3b(0x1e5)]&&(_0x1de830/=this[_0x302d3b(0x1df)][_0x302d3b(0x263)]()),Math[_0x302d3b(0x1f1)](_0x2e180b/_0x1de830)*_0x1a3ff5;},VisuMZ['VisualStateEffects'][_0x4dbd61(0x2ab)]=Sprite_Actor[_0x4dbd61(0x1f5)][_0x4dbd61(0x2c1)],Sprite_Actor[_0x4dbd61(0x1f5)]['createStateSprite']=function(){const _0x13452e=_0x4dbd61;VisuMZ[_0x13452e(0x1fb)][_0x13452e(0x2ab)][_0x13452e(0x1f7)](this),this[_0x13452e(0x23e)]();},Sprite_Actor[_0x4dbd61(0x1f5)]['createStateIconSprite']=function(){const _0x52569d=_0x4dbd61;if(this['constructor']!==Sprite_Actor)return;this[_0x52569d(0x29e)]=new Sprite_StateIcon(),this[_0x52569d(0x257)](this[_0x52569d(0x29e)]),this[_0x52569d(0x29e)][_0x52569d(0x2b6)][_0x52569d(0x1bb)]=![];},VisuMZ[_0x4dbd61(0x1fb)][_0x4dbd61(0x1a6)]=Sprite_Actor[_0x4dbd61(0x1f5)][_0x4dbd61(0x1ff)],Sprite_Actor[_0x4dbd61(0x1f5)]['refreshMotion']=function(){const _0x3efc88=_0x4dbd61,_0x388af7=this[_0x3efc88(0x281)];if(!_0x388af7)return;if(Imported[_0x3efc88(0x203)]&&_0x388af7[_0x3efc88(0x22b)]())return;const _0x29f6b2=_0x388af7[_0x3efc88(0x214)]();if(_0x29f6b2>=0x4){if('JIhIH'!==_0x3efc88(0x2c2)){if(!_0x388af7['isInputting']()&&!_0x388af7['isActing']())return this[_0x3efc88(0x24f)](_0x388af7['_customStateMotion']);}else _0x1821d4[_0x3efc88(0x226)](_0x2c5eaa(_0x4be2dd['$1'])||0x0);}VisuMZ[_0x3efc88(0x1fb)][_0x3efc88(0x1a6)]['call'](this);},VisuMZ[_0x4dbd61(0x1fb)][_0x4dbd61(0x292)]=Sprite_SvEnemy[_0x4dbd61(0x1f5)][_0x4dbd61(0x1ff)],Sprite_SvEnemy['prototype'][_0x4dbd61(0x1ff)]=function(){const _0x5db97b=_0x4dbd61,_0x1d3183=this['_actor'];if(!_0x1d3183)return;if(Imported[_0x5db97b(0x203)]&&_0x1d3183[_0x5db97b(0x22b)]())return;const _0x4542f1=_0x1d3183[_0x5db97b(0x214)]();if(_0x4542f1>=0x4){if(!_0x1d3183['isInputting']()&&!_0x1d3183[_0x5db97b(0x239)]())return this['startMotion'](_0x1d3183['_customStateMotion']);}VisuMZ[_0x5db97b(0x1fb)][_0x5db97b(0x292)][_0x5db97b(0x1f7)](this);},VisuMZ[_0x4dbd61(0x1fb)][_0x4dbd61(0x246)]=Sprite_Battler[_0x4dbd61(0x1f5)][_0x4dbd61(0x1d1)],Sprite_Battler[_0x4dbd61(0x1f5)][_0x4dbd61(0x1d1)]=function(_0xe1aa87){const _0x58f15f=_0x4dbd61;if(this[_0x58f15f(0x21d)]&&_0xe1aa87===_0x58f15f(0x276)){if(_0x58f15f(0x24e)!=='KSwTy'){const _0x4c8075=this[_0x58f15f(0x1df)]['stateMotionIndex']();_0x4c8075>=0x4&&(_0xe1aa87=this[_0x58f15f(0x1df)][_0x58f15f(0x241)]||_0xe1aa87);}else{if(!this['_battler'])return![];if(!this[_0x58f15f(0x1df)]['isSpriteVisible']())return![];if(!this[_0x58f15f(0x1df)][_0x58f15f(0x228)]())return![];if(!this['_battler'][_0x58f15f(0x2c8)]())return![];if(this[_0x58f15f(0x2a5)]['name']===_0x58f15f(0x27c))return![];if(this[_0x58f15f(0x269)]<=0x0)return![];return!![];}}VisuMZ['VisualStateEffects'][_0x58f15f(0x246)][_0x58f15f(0x1f7)](this,_0xe1aa87);},VisuMZ[_0x4dbd61(0x1fb)][_0x4dbd61(0x1ad)]=Sprite_Actor[_0x4dbd61(0x1f5)][_0x4dbd61(0x1cc)],Sprite_Actor['prototype'][_0x4dbd61(0x1cc)]=function(_0x461df0){const _0x2f6de5=_0x4dbd61;VisuMZ[_0x2f6de5(0x1fb)][_0x2f6de5(0x1ad)][_0x2f6de5(0x1f7)](this,_0x461df0);if(this[_0x2f6de5(0x29e)])this[_0x2f6de5(0x29e)][_0x2f6de5(0x20f)](_0x461df0);},VisuMZ['VisualStateEffects'][_0x4dbd61(0x1f8)]=Sprite_Actor[_0x4dbd61(0x1f5)][_0x4dbd61(0x23a)],Sprite_Actor['prototype'][_0x4dbd61(0x23a)]=function(){const _0x1763a4=_0x4dbd61;VisuMZ[_0x1763a4(0x1fb)][_0x1763a4(0x1f8)][_0x1763a4(0x1f7)](this),this[_0x1763a4(0x1fd)]();},VisuMZ[_0x4dbd61(0x1fb)]['Sprite_Actor_updateFrame']=Sprite_Actor['prototype']['updateFrame'],Sprite_Actor[_0x4dbd61(0x1f5)][_0x4dbd61(0x294)]=function(){const _0x5fff4e=_0x4dbd61;if(this[_0x5fff4e(0x1df)][_0x5fff4e(0x1e0)]()&&this[_0x5fff4e(0x230)]&&this[_0x5fff4e(0x230)][_0x5fff4e(0x2b6)]){if(_0x5fff4e(0x261)!=='yUTQo'){const _0x661a05=_0x5fff4e(0x219);if(this[_0x5fff4e(0x29d)](_0x661a05))return this[_0x5fff4e(0x1b0)][_0x661a05];return this['_cache'][_0x661a05]=this['createVisualBreathingData'](),this[_0x5fff4e(0x1b0)][_0x661a05];}else{if(this[_0x5fff4e(0x1ce)])return;this[_0x5fff4e(0x1ce)]=this['_mainSprite']['_frame'][_0x5fff4e(0x1da)]>0x0;}}else{if(_0x5fff4e(0x259)==='bqXbd')this['_stateMotionLocked']=![];else{let _0x80e745=_0x30b5be[_0x5fff4e(0x1fb)][_0x5fff4e(0x1b1)][_0x5fff4e(0x1f7)](this);return _0x80e745+=this['applyBreathingScaleX'](),_0x80e745;}}VisuMZ[_0x5fff4e(0x1fb)]['Sprite_Actor_updateFrame'][_0x5fff4e(0x1f7)](this);},VisuMZ[_0x4dbd61(0x1fb)]['Sprite_Enemy_createStateIconSprite']=Sprite_Enemy[_0x4dbd61(0x1f5)][_0x4dbd61(0x23e)],Sprite_Enemy[_0x4dbd61(0x1f5)][_0x4dbd61(0x23e)]=function(){const _0x4d434b=_0x4dbd61;this[_0x4d434b(0x2c1)](),VisuMZ[_0x4d434b(0x1fb)][_0x4d434b(0x234)][_0x4d434b(0x1f7)](this);},Sprite_Enemy[_0x4dbd61(0x1f5)][_0x4dbd61(0x2c1)]=function(){const _0x5e83ac=_0x4dbd61;this[_0x5e83ac(0x284)]=new Sprite_StateOverlay(),this[_0x5e83ac(0x257)](this[_0x5e83ac(0x284)]);},VisuMZ[_0x4dbd61(0x1fb)][_0x4dbd61(0x2b5)]=Sprite_Enemy[_0x4dbd61(0x1f5)][_0x4dbd61(0x1cc)],Sprite_Enemy['prototype'][_0x4dbd61(0x1cc)]=function(_0x301b3a){const _0xaad1f5=_0x4dbd61;VisuMZ[_0xaad1f5(0x1fb)][_0xaad1f5(0x2b5)]['call'](this,_0x301b3a);if(this['_stateSprite'])this[_0xaad1f5(0x284)][_0xaad1f5(0x20f)](_0x301b3a);},VisuMZ['VisualStateEffects']['Sprite_Enemy_update']=Sprite_Enemy['prototype'][_0x4dbd61(0x23a)],Sprite_Enemy[_0x4dbd61(0x1f5)]['update']=function(){const _0x3d0426=_0x4dbd61;VisuMZ[_0x3d0426(0x1fb)][_0x3d0426(0x1c5)]['call'](this),this['updateVisualStateEffects']();},VisuMZ[_0x4dbd61(0x1fb)][_0x4dbd61(0x21e)]=Sprite_StateOverlay['prototype'][_0x4dbd61(0x23d)],Sprite_StateOverlay[_0x4dbd61(0x1f5)]['loadBitmap']=function(){const _0x1dbdf9=_0x4dbd61;VisuMZ['VisualStateEffects'][_0x1dbdf9(0x21e)][_0x1dbdf9(0x1f7)](this),this[_0x1dbdf9(0x235)]='States';},VisuMZ['VisualStateEffects'][_0x4dbd61(0x2cc)]=Sprite_StateOverlay[_0x4dbd61(0x1f5)]['updateFrame'],Sprite_StateOverlay['prototype'][_0x4dbd61(0x294)]=function(){const _0x265259=_0x4dbd61;if(typeof this[_0x265259(0x26b)]===_0x265259(0x1e7))return this[_0x265259(0x218)]();else{if(this[_0x265259(0x235)]!==_0x265259(0x289)){this[_0x265259(0x2b1)]=!![];const _0x4fd7bd=ImageManager[_0x265259(0x1d7)](_0x265259(0x289));_0x4fd7bd[_0x265259(0x1ca)](this['onLoadDefaultOverlayBitmap'][_0x265259(0x28a)](this,_0x4fd7bd));}else this[_0x265259(0x235)]===_0x265259(0x289)&&(_0x265259(0x28f)!=='pxuUh'?VisuMZ['VisualStateEffects'][_0x265259(0x2cc)]['call'](this):(_0x4bf3a6('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x265259(0x1d5)](_0x454b19,_0x1d3675)),_0x2d7dec[_0x265259(0x2a3)]()));}},Sprite_StateOverlay['prototype'][_0x4dbd61(0x1b4)]=function(_0x918d40){const _0xc9047c=_0x4dbd61;this[_0xc9047c(0x2b6)]=_0x918d40,this[_0xc9047c(0x2b1)]=![],this[_0xc9047c(0x235)]=_0xc9047c(0x289),VisuMZ['VisualStateEffects']['Sprite_StateOverlay_updateFrame'][_0xc9047c(0x1f7)](this);},Sprite_StateOverlay['prototype'][_0x4dbd61(0x218)]=function(){const _0x118c6c=_0x4dbd61;if(!this[_0x118c6c(0x2b1)]&&this[_0x118c6c(0x235)]!==this[_0x118c6c(0x26b)]){if(_0x118c6c(0x274)===_0x118c6c(0x274)){this[_0x118c6c(0x2b1)]=!![];const _0x2ec298=ImageManager[_0x118c6c(0x1d7)](this[_0x118c6c(0x26b)]);_0x2ec298[_0x118c6c(0x1ca)](this[_0x118c6c(0x1c9)][_0x118c6c(0x28a)](this,_0x2ec298));}else{if(!this[_0x118c6c(0x2cd)])return;if(!this[_0x118c6c(0x1df)])return;if(this[_0x118c6c(0x2a5)]===_0x12b245)return;const _0x98b8d=this[_0x118c6c(0x1df)][_0x118c6c(0x24d)]();if(this[_0x118c6c(0x2cd)][_0x118c6c(0x269)]!==_0x98b8d){const _0x337641=0x8;this['_distortionSprite'][_0x118c6c(0x269)]>_0x98b8d?this['_distortionSprite'][_0x118c6c(0x269)]=_0x3edae4[_0x118c6c(0x1e9)](this[_0x118c6c(0x2cd)][_0x118c6c(0x269)]-_0x337641,_0x98b8d):this['_distortionSprite'][_0x118c6c(0x269)]=_0xa7d2dd[_0x118c6c(0x210)](this[_0x118c6c(0x2cd)][_0x118c6c(0x269)]+_0x337641,_0x98b8d);}}}if(this[_0x118c6c(0x235)]===this[_0x118c6c(0x26b)]){const _0x3d9d2a=0x60,_0x546a07=0x60,_0x327627=this['_pattern']*_0x3d9d2a,_0x1e52d1=0x0;this[_0x118c6c(0x211)](_0x327627,_0x1e52d1,_0x3d9d2a,_0x546a07);}},Sprite_StateOverlay[_0x4dbd61(0x1f5)][_0x4dbd61(0x1c9)]=function(_0x39d325){const _0x11d1ca=_0x4dbd61;this[_0x11d1ca(0x2b6)]=_0x39d325,this['_loadingCustomOverlay']=![],this['_bitmapName']=this[_0x11d1ca(0x26b)],this[_0x11d1ca(0x218)]();};