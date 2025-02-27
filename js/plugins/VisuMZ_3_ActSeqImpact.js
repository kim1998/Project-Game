//=============================================================================
// VisuStella MZ - ActSeqImpact
// VisuMZ_3_ActSeqImpact.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_ActSeqImpact = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ActSeqImpact = VisuMZ.ActSeqImpact || {};
VisuMZ.ActSeqImpact.version = 1.09;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.09] [ActSeqImpact]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Action_Sequence_Impact_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * 
 * With the aid of Pixi JS Filters, this plugin adds more impact to battle by
 * producing special on screen filter effects to make certain actions like
 * critical hits, guarding, and dodging more visibly different adding to the
 * flavor of the battle.
 * 
 * This plugin also adds new Action Sequences for the Battle Core, allowing
 * impacting effects like color breaks, motion blurs, shockwaves, motion
 * trails, and zoom blurs.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Creating a color break effect when landing critical hits akin to a
 *   chromatic aberration effect.
 * * A battler who dodges an attack will display a motion blur effect.
 * * Guarding damage will cause a shockwave effect.
 * * Adds new Action Sequences available from the Battle Core Plugin Commands.
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
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_BattleCore
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
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * New Effects
 * ============================================================================
 * 
 * The following are new visual effects added through this plugin. These visual
 * effects are added and modified with the sense of adding more impact to
 * visuals in battle.
 *
 * ---
 * 
 * Bizarro Inversion
 * 
 * Swaps the blue/red colors on the battlefield. What was originally blue will
 * become red and what was originally red will become blue.
 * 
 * Anything that is attached to the battlefield will be affected. UI objects,
 * pictures, etc. that aren't attached to the battlefield will not be affected
 * by the effect. Depending on your settings, this may or may not include
 * battle animations, too.
 * 
 * ---
 * 
 * Color Break
 * 
 * When a critical hit occurs, the colors on the screen will break apart into
 * red, green, and blue into random directions and then come back together
 * similar to a chromatic aberration. This creates a sense of weight when
 * delivering a powerful strike.
 * 
 * This is optional and can be disabled.
 * 
 * This effect is also available as an Action Sequence in the Battle Core.
 * 
 * ---
 * 
 * Desaturation
 * 
 * Desaturates all colors on the battlefield. This will result in a black and
 * white greyscale effect.
 * 
 * Anything that is attached to the battlefield will be affected. UI objects,
 * pictures, etc. that aren't attached to the battlefield will not be affected
 * by the effect. Depending on your settings, this may or may not include
 * battle animations, too.
 * 
 * Created by Manu Gaming!
 * 
 * ---
 * 
 * Motion Blur
 * 
 * When a battler dodges an attack (either a miss or evasion proc), then the
 * battler will generate a motion blur effect. Their image splits apart in a
 * blurred manner and then fuses back together to become whole again. This
 * generates the illusion that they're hard to hit.
 * 
 * This is optional and can be disabled.
 * 
 * This effect is also available as an Action Sequence in the Battle Core.
 * There are two versions, one that affects only the battler while another that
 * affects the whole screen.
 * 
 * ---
 * 
 * Motion Trail
 * 
 * If motion trails are enabled on a battler, whenever they move, they leave
 * behind a residual sprite of their motion during that particular frame. The
 * motion blurs aid in visualizing the path the battler moved in case the
 * battler's movement trajectory is normally too fast to portray. Motion trails
 * can have different hue and/or tones.
 * 
 * This is an Action Sequence-only effect.
 * 
 * ---
 * 
 * Negative Inversion
 * 
 * Inverts all colors on the battlefield. They pretty much swap 180 degrees of
 * hue with whatever color is on the opposite side.
 * 
 * Anything that is attached to the battlefield will be affected. UI objects,
 * pictures, etc. that aren't attached to the battlefield will not be affected
 * by the effect. Depending on your settings, this may or may not include
 * battle animations, too.
 * 
 * Created by Manu Gaming!
 * 
 * ---
 * 
 * Oversaturation
 * 
 * Oversaturates all colors on the battlefield. Colors will become extra vivid
 * and look extremely concentrated. Brighter colors become brighter while
 * darker colors become darker.
 * 
 * Anything that is attached to the battlefield will be affected. UI objects,
 * pictures, etc. that aren't attached to the battlefield will not be affected
 * by the effect. Depending on your settings, this may or may not include
 * battle animations, too.
 * 
 * ---
 * 
 * Shockwave
 * 
 * When a guarding battler would receive HP damage (or manages to defend to 0
 * damage), a shockwave effect occurs to display the impact. The shockwave will
 * ripple out from the battler to the edges of the screen before disappearing.
 * 
 * This is optional and can be disabled.
 * 
 * This effect is also available as an Action Sequence in the Battle Core.
 * 
 * ---
 * 
 * Time Scale
 * 
 * This causes time to go slower or faster depending on the settings. All
 * things related to the game client will go slower or faster.
 * 
 * This only affects battle. The effects go away during the input phase or when
 * a message is present.
 * 
 * Created by Manu Gaming!
 * 
 * ---
 * 
 * Time Stop
 * 
 * The game client will pause time for set amount of time, only the music and
 * any sound effects continuing.
 * 
 * Created by Manu Gaming!
 * 
 * ---
 * 
 * Zoom Blur
 * 
 * A zoom blur will direct its focus at a specific point on the screen and
 * create a visual radial distortion towards that point. The intensity of the
 * zoom effect will diminish over the duration of the zoom blur. This helps
 * draw focus towards specific parts of the screen.
 * 
 * This is an Action Sequence-only effect.
 * 
 * ---
 *
 * ============================================================================
 * Action Sequence - Plugin Commands
 * ============================================================================
 *
 * The following are Action Sequence Plugin Commands that have been added with
 * this plugin. These are accessible from the Battle Core plugin (not this one)
 * in order to keep all the Action Sequences in place.
 * 
 * Once again, these plugin commands are only accessible through the Battle
 * Core plugin and not this one! Make sure you have the most update to date
 * version of the Battle Core for them.
 *
 * ---
 * 
 * === Action Sequences - Impact ===
 * 
 * These Action Sequences are related to creating impact.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * ---
 *
 * IMPACT: Bizarro Inversion
 * - Swaps blue/red colors on the battlefield.
 * - Requires VisuMZ_3_ActSeqImpact!
 * - Created by Manu Gaming!
 *
 *   Bizarro?:
 *   - Enable Bizarro Inversion effect?
 *
 * ---
 *
 * IMPACT: Color Break
 * - Breaks the colors on the screen before reassembling.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Intensity:
 *   - What is the intensity of the color break effect?
 *
 *   Duration:
 *   - What is the duration of the color break effect?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Desaturation
 * - Desaturates all colors on the battlefield.
 * - Requires VisuMZ_3_ActSeqImpact!
 * - Created by Manu Gaming!
 *
 *   Desaturate?:
 *   - Enable Desaturation effect?
 *
 * ---
 *
 * IMPACT: Motion Blur Screen
 * - Creates a motion blur on the whole screen.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Angle:
 *   - Determine what angle to make the motion blur at.
 *
 *   Intensity Rate:
 *   - This determines intensity rate of the motion blur.
 *   - Use a number between 0 and 1.
 *
 *   Duration:
 *   - How many frames should the motion blur last?
 *   - What do you want to be its duration?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Blur Target(s)
 * - Creates a motion blur on selected target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to create motion blur effects for.
 *
 *   Angle:
 *   - Determine what angle to make the motion blur at.
 *
 *   Intensity Rate:
 *   - This determines intensity rate of the motion blur.
 *   - Use a number between 0 and 1.
 *
 *   Duration:
 *   - How many frames should the motion blur last?
 *   - What do you want to be its duration?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Trail Create
 * - Creates a motion trail effect for the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to create motion trail effects for.
 *
 *   Delay:
 *   - How many frames to delay by when creating a motion trail?
 *   - The higher the delay, the less motion trails there are.
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
 * IMPACT: Motion Trail Remove
 * - Removes the motion trail effect from the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 * - Created by Manu Gaming!
 *
 *   Targets:
 *   - Select unit(s) to clear motion trail effects for.
 *
 * ---
 *
 * IMPACT: Negative Inversion
 * - Inverts all the colors on the battlefield.
 * - Requires VisuMZ_3_ActSeqImpact!
 * - Created by Manu Gaming!
 *
 *   Negative?:
 *   - Enable Negative Inversion effect?
 *
 * ---
 *
 * IMPACT: Oversaturation
 * - Oversaturates colors on the battlefield.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Oversaturate?:
 *   - Enable Oversaturation effect?
 *
 * ---
 *
 * IMPACT: Shockwave at Point
 * - Creates a shockwave at the designated coordinates.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Point: X:
 *   Point: Y:
 *   - What x/y coordinate do you want to create a shockwave at?
 *   - You can use JavaScript code.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Shockwave from Each Target(s)
 * - Creates a shockwave at each of the target(s) location(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a shockwave from.
 *
 *   Target Location:
 *   - Select which part target group to start a shockwave from.
 * 
 *     Offset X:
 *     Offset Y:
 *     - How much to offset the shockwave X/Y point by.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Shockwave from Target(s) Center
 * - Creates a shockwave from the center of the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a shockwave from.
 *
 *   Target Location:
 *   - Select which part target group to start a shockwave from.
 * 
 *     Offset X:
 *     Offset Y:
 *     - How much to offset the shockwave X/Y point by.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Time Scale
 * - Adjust time to go faster or slower!
 * - Requires VisuMZ_3_ActSeqImpact!
 * - Created by Manu Gaming!
 *
 *   Scale:
 *   - Adjusts how fast/slow time goes.
 *   - 1.00 is normal. Lower is slower. Higher is faster.
 *
 * ---
 *
 * IMPACT: Time Stop
 * - Stops time for a set amount of milliseconds.
 * - Requires VisuMZ_3_ActSeqImpact!
 * - Created by Manu Gaming!
 *
 *   Milliseconds:
 *   - How many milliseconds should time stop for?
 *   - 1000 milliseconds = 1 second.
 *
 * ---
 *
 * IMPACT: Zoom Blur at Point
 * - Creates a zoom blur at the designated coordinates.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Point: X:
 *   Point: Y:
 *   - What x/y coordinate do you want to focus the zoom at?
 *   - You can use JavaScript code.
 *
 *   Zoom Strength:
 *   - What is the strength of the zoom effect?
 *   - Use a number between 0 and 1.
 *
 *   Visible Radius:
 *   - How much of a radius should be visible from the center?
 *
 *   Duration:
 *   - What is the duration of the zoom blur?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Zoom Blur at Target(s) Center
 * - Creates a zoom blur at the center of targets.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a zoom blur from.
 *
 *   Target Location:
 *   - Select which part target group to start a zoom blur from.
 * 
 *     Offset X:
 *     Offset Y:
 *     - How much to offset the zoom blur X/Y point by.
 *
 *   Zoom Strength:
 *   - What is the strength of the zoom effect?
 *   - Use a number between 0 and 1.
 *
 *   Visible Radius:
 *   - How much of a radius should be visible from the center?
 *
 *   Duration:
 *   - What is the duration of the zoom blur?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * === Action Sequences - Inject ===
 *
 * These Action Sequences are related to injecting sprite animations.
 * Requires VisuMZ_3_ActSeqImpact!
 *
 * ---
 * 
 * INJECT: Animation Begin
 * - Injects and plays a whole spritesheet animation.
 * - The spritesheet animation will play over the battler until it is finished.
 * - The battler's original sprite will be invisible until finished.
 * - Requires VisuMZ_3_ActSeqImpact!
 * 
 *   Targets:
 *   - Select unit(s) to inject the animation on.
 * 
 *   Filename:
 *   - Select the animation spritesheet file.
 *   - Located in the /img/sv_actors/ folder.
 * 
 *     Horizontal Cells:
 *     - How many horizontal cells (or columns) are there?
 * 
 *     Vertical Cells:
 *     - How many vertical cells (or rows) are there?
 * 
 *     Frame Delay:
 *     - How many frames are played inbetween cells?
 * 
 *     Smooth Bitmap?:
 *     - Smooth the spritesheet graphic?
 * 
 *   Offset:
 * 
 *     Offset X:
 *     - Offsets the X position of the injected animation.
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y:
 *     - Offsets the Y position of the injected animation.
 *     - Negative: up. Positive: down.
 * 
 * ---
 * 
 * INJECT: Animation End
 * - Stops and ends any injected animations on target(s).
 * - Any inject animation will be prematurely terminated.
 * - Requires VisuMZ_3_ActSeqImpact!
 * 
 *   Targets:
 *   - Select unit(s) to stop injected animation(s).
 * 
 * ---
 * 
 * INJECT: Animation Pause/Resume
 * - Pauses/resumes any injected animations on target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 * 
 *   Targets:
 *   - Select unit(s) to pause/resume injected animation(s).
 * 
 *   Pause?:
 *   - Pause the injected animation?
 * 
 * ---
 * 
 * INJECT: Wait For Injected Animation
 * - Waits for injected animations to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqImpact!
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Critical Color Break Settings
 * ============================================================================
 *
 * When critical hits occur, you can cause a Color Break effect to occur.
 *
 * ---
 *
 * Settings
 * 
 *   Enable/Disable?:
 *   - Enables/disables the Color Break effect whenever a critical hit occurs?
 * 
 *   Intensity:
 *   - How intense do you want the Color Break effect to be?
 * 
 *   Duration:
 *   - What is the duration of the Color Break effect?
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Dodge Motion Blur Settings
 * ============================================================================
 *
 * When a battler dodges an attack, you can create a motion blur effect.
 *
 * ---
 *
 * Settings
 * 
 *   Enable/Disable?:
 *   - Enables/disables the Motion Blur effect whenever a battler evades an
 *     attack?
 * 
 *   Intensity Rate:
 *   - This determines intensity rate of the motion blur.
 *   - Use a number between 0 and 1.
 * 
 *   Duration:
 *   - How many frames should the motion blur last?
 *   - What do you want to be its duration?
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Guard Shockwave Settings
 * ============================================================================
 *
 * When a guarding battler receives damage, you can create a shockwave effect.
 *
 * ---
 *
 * Category
 * 
 *   Enable/Disable?:
 *   - Enables/disables the Shockwave effect whenever a battler is attacked
 *     while guarding?
 * 
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 * 
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 * 
 *   Duration:
 *   - What is the duration of the shockwave?
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
 * Manu Gaming Creations
 * * URL: https://manugamingcreations.itch.io
 * * Responsible for the following Impact Effects and adapted by VisuStella:
 * ** Desaturation
 * ** Negative Impact
 * ** Time Scale
 * ** Time Stop
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.09: September 14, 2023
 * * Compatibility Update!
 * ** Updated this plugin to work with Dragonbones Union's newest feature
 *    update to stop Dragonbones armatures from having their blend modes
 *    suppressed by PixiJS.
 * 
 * Version 1.08: June 15, 2023
 * * Bug Fixes!
 * ** Inject animations should now work properly for animated enemies.
 * 
 * Version 1.07: September 8, 2022
 * * Bug Fixes!
 * ** Fixed a problem with motion trails not working for Dragonbones animations
 *    that have looping properties. Fix made by Irina.
 * 
 * Version 1.06: May 26, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Action Sequence Effects added by Irina and sponsored by MirageV:
 * *** INJECT: Animation Begin
 * **** Injects and plays a whole spritesheet animation.
 * **** The spritesheet animation will play over the battler until it
 *      is finished.
 * **** The battler's original sprite will be invisible until finished.
 * *** INJECT: Animation End
 * **** Stops and ends any injected animations on target(s).
 * **** Any inject animation will be prematurely terminated.
 * *** INJECT: Animation Pause/Resume
 * **** Pauses/resumes any injected animations on target(s).
 * *** INJECT: Wait For Injected Animation
 * **** Waits for injected animations to complete before performing
 *      next command.
 * 
 * Version 1.05: April 14, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Impact Effects added by Irina and collaborating with Manu Gaming!
 * *** Impact: Bizarro Inversion
 * *** Impact: Desaturation
 * *** Impact: Negative Inversion
 * *** Impact: Oversaturation
 * *** Impact: Time Scale
 * *** Impact: Time Stop
 * 
 * Version 1.04: October 28, 2021
 * * Bug Fixes!
 * ** Guard shockwave now originates from the proper location with front view
 *    sprites enabled under specific battle layouts. Fix made by Irina.
 * 
 * Version 1.03: December 11, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Action Sequence Impact Action Sequences "Shockwave from Each Target(s)",
 *    "Shockwave from Target(s) Center", and "Zoom Blur at Target(s) Center"
 *    now have "Offset X" and "Offset Y" plugin parameters. Added by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.02: December 4, 2020
 * * Bug Fixes!
 * ** Enemies with a SV Battler attached to them will no longer desynch after
 *    using a motion trail effect. Fix made by Irina.
 * 
 * Version 1.01: November 29, 2020
 * * Bug Fixes!
 * ** Motion Trails for Dragonbones armatures are now properly adjusted for
 *    their scale and offset. Fix made by Arisu.
 *
 * Version 1.00: December 2, 2020
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
 * @param ActSeqImpact
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CriticalColorBreak:struct
 * @text Critical Color Break
 * @type struct<CriticalColorBreak>
 * @desc When critical hits occur, you can cause a Color Break effect to occur.
 * @default {"Enable:eval":"true","Intensity:num":"30","Duration:num":"30","EasingType:str":"OutBack"}
 *
 * @param DodgeMotionBlur:struct
 * @text Dodge Motion Blur
 * @type struct<DodgeMotionBlur>
 * @desc When a battler dodges an attack, you can create a motion blur effect.
 * @default {"Enable:eval":"true","Rate:eval":"0.5","Duration:num":"30","EasingType:str":"InOutSine"}
 *
 * @param GuardShockWave:struct
 * @text Guard Shockwave
 * @type struct<GuardShockWave>
 * @desc When a guarding battler receives damage, you can create a shockwave effect.
 * @default {"Enable:eval":"true","Amp:num":"30","Wave:num":"160","Duration:num":"30"}
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
 * Critical Color Break Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CriticalColorBreak:
 *
 * @param Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables the Color Break effect whenever a
 * critical hit occurs?
 * @default true
 *
 * @param Intensity:num
 * @text Intensity
 * @type number
 * @min 1
 * @desc How intense do you want the Color Break effect to be?
 * @default 30
 *
 * @param Duration:num
 * @text Duration
 * @type number
 * @min 1
 * @desc What is the duration of the Color Break effect?
 * @default 30
 *
 * @param EasingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default OutBack
 *
 */
/* ----------------------------------------------------------------------------
 * Dodge Motion Blur Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~DodgeMotionBlur:
 *
 * @param Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables the Motion Blur effect whenever a
 * battler evades an attack?
 * @default true
 *
 * @param Rate:eval
 * @text Intensity Rate
 * @desc This determines intensity rate of the motion blur.
 * Use a number between 0 and 1.
 * @default 0.5
 *
 * @param Duration:num
 * @text Duration
 * @type number
 * @min 1
 * @desc How many frames should the motion blur last?
 * What do you want to be its duration?
 * @default 30
 *
 * @param EasingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default InOutSine
 *
 */
/* ----------------------------------------------------------------------------
 * Guard Shock Wave Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GuardShockWave:
 *
 * @param Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables the Shockwave effect whenever a
 * battler is attacked while guarding?
 * @default true
 * 
 * @param Amp:num
 * @text Amplitude
 * @type number
 * @min 1
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @param Wave:num
 * @text Wavelength
 * @type number
 * @min 1
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @param Duration:num
 * @text Duration
 * @type number
 * @min 1
 * @desc What is the duration of the shockwave?
 * @default 30
 *
 */
//=============================================================================

const _0x2f1008=_0x2799;function _0x2799(_0x2e4d34,_0x7328c7){const _0x40f6d5=_0x40f6();return _0x2799=function(_0x27996e,_0x1b1241){_0x27996e=_0x27996e-0x141;let _0x5bda77=_0x40f6d5[_0x27996e];return _0x5bda77;},_0x2799(_0x2e4d34,_0x7328c7);}(function(_0x975c5e,_0x466eeb){const _0x1d0059=_0x2799,_0x23ae25=_0x975c5e();while(!![]){try{const _0x39a24a=parseInt(_0x1d0059(0x250))/0x1+parseInt(_0x1d0059(0x1fc))/0x2*(-parseInt(_0x1d0059(0x203))/0x3)+parseInt(_0x1d0059(0x160))/0x4*(parseInt(_0x1d0059(0x216))/0x5)+-parseInt(_0x1d0059(0x18e))/0x6*(parseInt(_0x1d0059(0x1a4))/0x7)+parseInt(_0x1d0059(0x241))/0x8+-parseInt(_0x1d0059(0x256))/0x9*(parseInt(_0x1d0059(0x1be))/0xa)+parseInt(_0x1d0059(0x1c8))/0xb*(parseInt(_0x1d0059(0x271))/0xc);if(_0x39a24a===_0x466eeb)break;else _0x23ae25['push'](_0x23ae25['shift']());}catch(_0x192358){_0x23ae25['push'](_0x23ae25['shift']());}}}(_0x40f6,0x66b03));var label=_0x2f1008(0x1b3),tier=tier||0x0,dependencies=['VisuMZ_0_CoreEngine',_0x2f1008(0x23e)],pluginData=$plugins[_0x2f1008(0x197)](function(_0x273fd1){const _0x2a5b40=_0x2f1008;return _0x273fd1['status']&&_0x273fd1[_0x2a5b40(0x15f)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x2f1008(0x185)]=VisuMZ[label][_0x2f1008(0x185)]||{},VisuMZ[_0x2f1008(0x18f)]=function(_0x12c9dc,_0x957e7a){const _0x1d5276=_0x2f1008;for(const _0x112ab5 in _0x957e7a){if(_0x112ab5[_0x1d5276(0x180)](/(.*):(.*)/i)){const _0x456c29=String(RegExp['$1']),_0x12e51e=String(RegExp['$2'])['toUpperCase']()[_0x1d5276(0x239)]();let _0xa7186,_0x3e4fa1,_0x2eef96;switch(_0x12e51e){case'NUM':_0xa7186=_0x957e7a[_0x112ab5]!==''?Number(_0x957e7a[_0x112ab5]):0x0;break;case _0x1d5276(0x192):_0x3e4fa1=_0x957e7a[_0x112ab5]!==''?JSON['parse'](_0x957e7a[_0x112ab5]):[],_0xa7186=_0x3e4fa1['map'](_0x17cc1f=>Number(_0x17cc1f));break;case'EVAL':_0xa7186=_0x957e7a[_0x112ab5]!==''?eval(_0x957e7a[_0x112ab5]):null;break;case _0x1d5276(0x193):_0x3e4fa1=_0x957e7a[_0x112ab5]!==''?JSON[_0x1d5276(0x14e)](_0x957e7a[_0x112ab5]):[],_0xa7186=_0x3e4fa1['map'](_0x4faf7f=>eval(_0x4faf7f));break;case _0x1d5276(0x195):_0xa7186=_0x957e7a[_0x112ab5]!==''?JSON[_0x1d5276(0x14e)](_0x957e7a[_0x112ab5]):'';break;case _0x1d5276(0x148):_0x3e4fa1=_0x957e7a[_0x112ab5]!==''?JSON[_0x1d5276(0x14e)](_0x957e7a[_0x112ab5]):[],_0xa7186=_0x3e4fa1['map'](_0x3351c7=>JSON[_0x1d5276(0x14e)](_0x3351c7));break;case _0x1d5276(0x224):_0xa7186=_0x957e7a[_0x112ab5]!==''?new Function(JSON['parse'](_0x957e7a[_0x112ab5])):new Function(_0x1d5276(0x26a));break;case _0x1d5276(0x1b9):_0x3e4fa1=_0x957e7a[_0x112ab5]!==''?JSON[_0x1d5276(0x14e)](_0x957e7a[_0x112ab5]):[],_0xa7186=_0x3e4fa1[_0x1d5276(0x257)](_0xf820be=>new Function(JSON[_0x1d5276(0x14e)](_0xf820be)));break;case _0x1d5276(0x170):_0xa7186=_0x957e7a[_0x112ab5]!==''?String(_0x957e7a[_0x112ab5]):'';break;case _0x1d5276(0x155):_0x3e4fa1=_0x957e7a[_0x112ab5]!==''?JSON['parse'](_0x957e7a[_0x112ab5]):[],_0xa7186=_0x3e4fa1['map'](_0x54e81c=>String(_0x54e81c));break;case _0x1d5276(0x1e3):_0x2eef96=_0x957e7a[_0x112ab5]!==''?JSON[_0x1d5276(0x14e)](_0x957e7a[_0x112ab5]):{},_0xa7186=VisuMZ[_0x1d5276(0x18f)]({},_0x2eef96);break;case _0x1d5276(0x16c):_0x3e4fa1=_0x957e7a[_0x112ab5]!==''?JSON['parse'](_0x957e7a[_0x112ab5]):[],_0xa7186=_0x3e4fa1[_0x1d5276(0x257)](_0xc880d7=>VisuMZ[_0x1d5276(0x18f)]({},JSON['parse'](_0xc880d7)));break;default:continue;}_0x12c9dc[_0x456c29]=_0xa7186;}}return _0x12c9dc;},(_0x1d4d3e=>{const _0x1e57af=_0x2f1008,_0x4b8a2b=_0x1d4d3e[_0x1e57af(0x21e)];for(const _0x4fdaca of dependencies){if(_0x1e57af(0x1ad)!==_0x1e57af(0x1ad)){if(!this[_0x1e57af(0x1d2)])return![];return this['_injectAnimationSprite'][_0x1e57af(0x184)];}else{if(!Imported[_0x4fdaca]){alert(_0x1e57af(0x15c)['format'](_0x4b8a2b,_0x4fdaca)),SceneManager[_0x1e57af(0x171)]();break;}}}const _0xe3e327=_0x1d4d3e['description'];if(_0xe3e327[_0x1e57af(0x180)](/\[Version[ ](.*?)\]/i)){const _0x3627fb=Number(RegExp['$1']);_0x3627fb!==VisuMZ[label][_0x1e57af(0x231)]&&(alert(_0x1e57af(0x16a)['format'](_0x4b8a2b,_0x3627fb)),SceneManager[_0x1e57af(0x171)]());}if(_0xe3e327[_0x1e57af(0x180)](/\[Tier[ ](\d+)\]/i)){if(_0x1e57af(0x272)!==_0x1e57af(0x1f9)){const _0x5f2850=Number(RegExp['$1']);if(_0x5f2850<tier)alert(_0x1e57af(0x249)[_0x1e57af(0x1ca)](_0x4b8a2b,_0x5f2850,tier)),SceneManager[_0x1e57af(0x171)]();else{if(_0x1e57af(0x16e)===_0x1e57af(0x1a5)){if(!this[_0x1e57af(0x1fa)])return;if(this['_motionBlurImpactDuration']<=0x0)return;const _0x1db81d=this['_motionBlurImpactFilter'],_0x175da2=this[_0x1e57af(0x16f)]||0x0,_0x3e8520=this[_0x1e57af(0x19a)]||_0x175da2,_0x24364b=0x0,_0x52224b=this[_0x1e57af(0x1ef)];_0x1db81d[_0x1e57af(0x1b6)]['x']=_0x371e27[_0x1e57af(0x1b3)][_0x1e57af(0x1ea)](_0x1db81d[_0x1e57af(0x1b6)]['x'],_0x24364b,_0x175da2,_0x3e8520,_0x52224b),_0x1db81d['velocity']['y']=_0x51e3bc[_0x1e57af(0x1b3)]['applyEasing'](_0x1db81d['velocity']['y'],_0x24364b,_0x175da2,_0x3e8520,_0x52224b),this[_0x1e57af(0x16f)]--,this[_0x1e57af(0x16f)]<=0x0&&(_0x1db81d['velocity']['x']=0x0,_0x1db81d[_0x1e57af(0x1b6)]['y']=0x0);}else tier=Math[_0x1e57af(0x1c7)](_0x5f2850,tier);}}else{if(!this[_0x1e57af(0x1fa)])return;if(this['_motionBlurImpactDuration']<=0x0)return;const _0x5c892b=this[_0x1e57af(0x1fa)],_0x5bcb25=this[_0x1e57af(0x16f)]||0x0,_0x85a558=this['_motionBlurImpactWholeDuration']||_0x5bcb25,_0x54abea=0x0,_0x496fd0=this[_0x1e57af(0x1ef)];_0x5c892b[_0x1e57af(0x1b6)]['x']=_0x34a932[_0x1e57af(0x1b3)]['applyEasing'](_0x5c892b[_0x1e57af(0x1b6)]['x'],_0x54abea,_0x5bcb25,_0x85a558,_0x496fd0),_0x5c892b[_0x1e57af(0x1b6)]['y']=_0x26efed[_0x1e57af(0x1b3)][_0x1e57af(0x1ea)](_0x5c892b[_0x1e57af(0x1b6)]['y'],_0x54abea,_0x5bcb25,_0x85a558,_0x496fd0),this[_0x1e57af(0x16f)]--,this[_0x1e57af(0x16f)]<=0x0&&(_0x5c892b[_0x1e57af(0x1b6)]['x']=0x0,_0x5c892b['velocity']['y']=0x0),_0x2faa89[_0x1e57af(0x1ff)]&&this[_0x1e57af(0x174)]();}}VisuMZ['ConvertParams'](VisuMZ[label][_0x1e57af(0x185)],_0x1d4d3e[_0x1e57af(0x1b2)]);})(pluginData),VisuMZ[_0x2f1008(0x1b3)][_0x2f1008(0x189)]=SceneManager[_0x2f1008(0x20c)],SceneManager[_0x2f1008(0x20c)]=function(_0x3c033f){const _0x251113=_0x2f1008;let _0x5428e8=0x1;return SceneManager[_0x251113(0x25f)]()&&(_0x5428e8=$gameTemp[_0x251113(0x1cc)](),_0x5428e8=Math[_0x251113(0x1c7)](0.01,_0x5428e8)),VisuMZ[_0x251113(0x1b3)]['SceneManager_determineRepeatNumber'][_0x251113(0x23f)](this,_0x3c033f*_0x5428e8);},Game_Temp[_0x2f1008(0x14f)][_0x2f1008(0x1cc)]=function(){const _0x29ad1c=_0x2f1008;if(!SceneManager['isSceneBattle']())return 0x1;if(BattleManager['isInputting']())return 0x1;if($gameMessage['isBusy']())return 0x1;return this['_battleImpactTimeScale']=this[_0x29ad1c(0x191)]??0x1,this['_battleImpactTimeScale']<=0x0&&(_0x29ad1c(0x1f1)!==_0x29ad1c(0x259)?this[_0x29ad1c(0x191)]=0.01:(_0x49eda3&&(_0x327638[_0x29ad1c(0x1fd)]=_0x4f8461[_0x29ad1c(0x1fd)]||0x0,_0x4bf58a['_waitCount']=_0x54c311[_0x29ad1c(0x1c7)](_0x5cb133[_0x29ad1c(0x1fd)],0x1)),this[_0x29ad1c(0x191)]=_0x3b9da6[_0x29ad1c(0x1c7)](0.01,_0x5b9f23))),this[_0x29ad1c(0x191)];},Game_Temp[_0x2f1008(0x14f)][_0x2f1008(0x1b5)]=function(_0x17f2a1,_0x398b62){const _0x5f264e=_0x2f1008;_0x398b62&&(_0x398b62[_0x5f264e(0x1fd)]=_0x398b62[_0x5f264e(0x1fd)]||0x0,_0x398b62['_waitCount']=Math[_0x5f264e(0x1c7)](_0x398b62['_waitCount'],0x1)),this[_0x5f264e(0x191)]=Math[_0x5f264e(0x1c7)](0.01,_0x17f2a1);},Game_BattlerBase[_0x2f1008(0x14f)]['battlerMotionTrailData']=function(){const _0x569b8c=_0x2f1008;if(this[_0x569b8c(0x151)])return this[_0x569b8c(0x151)];return this[_0x569b8c(0x151)]=this['createDefaultBattlerMotionTrailData'](),this[_0x569b8c(0x151)];},Game_BattlerBase[_0x2f1008(0x14f)][_0x2f1008(0x201)]=function(){const _0x226cc6=_0x2f1008;this[_0x226cc6(0x151)]=this[_0x226cc6(0x1e1)]();},Game_BattlerBase[_0x2f1008(0x14f)][_0x2f1008(0x1ee)]=function(_0x50cb90){this['_battlerMotionTrailData']=_0x50cb90;},Game_BattlerBase['prototype'][_0x2f1008(0x1e1)]=function(){return{'delay':0x1,'duration':0x1e,'hue':0x0,'opacityStart':0xc8,'tone':[0x0,0x0,0x0,0x0],'visible':![]};},VisuMZ['ActSeqImpact'][_0x2f1008(0x1cb)]=Game_Battler['prototype'][_0x2f1008(0x1a2)],Game_Battler[_0x2f1008(0x14f)][_0x2f1008(0x1a2)]=function(_0x290a8b){const _0xadbb5d=_0x2f1008;VisuMZ[_0xadbb5d(0x1b3)]['Game_Battler_onDamage'][_0xadbb5d(0x23f)](this,_0x290a8b),this[_0xadbb5d(0x19f)](_0x290a8b);},Game_Battler[_0x2f1008(0x14f)][_0x2f1008(0x19f)]=function(_0x4212f5){const _0x225a81=_0x2f1008;if(_0x4212f5<0x0)return;if(!this[_0x225a81(0x1c2)]())return;const _0x1421fa=VisuMZ[_0x225a81(0x1b3)][_0x225a81(0x185)][_0x225a81(0x228)];if(!_0x1421fa)return;if(!_0x1421fa[_0x225a81(0x17e)])return;if(!SceneManager[_0x225a81(0x25f)]())return;const _0x425391=SceneManager[_0x225a81(0x1d7)]['_spriteset'];if(!_0x425391)return;if(!this[_0x225a81(0x263)]())return;let _0x3d1912=this[_0x225a81(0x263)]()[_0x225a81(0x270)],_0xa9e5c1=this['battler']()[_0x225a81(0x269)]-this[_0x225a81(0x263)]()[_0x225a81(0x211)]()/0x2;const _0x28ff04=_0x1421fa['Amp']||0x1,_0x1f581b=_0x1421fa[_0x225a81(0x1ae)]||0x1,_0x355317=_0x1421fa[_0x225a81(0x147)]||0x1;if(this[_0x225a81(0x1e8)]()&&!$gameSystem['isSideView']()){if(_0x225a81(0x268)===_0x225a81(0x268)){const _0x4ecc2d=SceneManager[_0x225a81(0x1d7)];_0x3d1912+=_0x4ecc2d['_windowLayer']['x'],_0x3d1912+=_0x4ecc2d['_statusWindow']['x'],_0xa9e5c1+=_0x4ecc2d[_0x225a81(0x1d5)]['y'],_0xa9e5c1+=_0x4ecc2d[_0x225a81(0x22d)]['y'];}else!this[_0x225a81(0x225)]&&++this[_0x225a81(0x24c)]>=this[_0x225a81(0x24e)]&&(this['_frameCount']=0x0,this[_0x225a81(0x146)]++),this['opacity']=this[_0x225a81(0x146)]<this[_0x225a81(0x173)]?0xff:0x0;}_0x425391['setupShockwaveImpactFilter'](_0x3d1912,_0xa9e5c1,_0x28ff04,_0x1f581b,_0x355317);},VisuMZ[_0x2f1008(0x1b3)][_0x2f1008(0x165)]=Game_Battler[_0x2f1008(0x14f)]['performMiss'],Game_Battler[_0x2f1008(0x14f)]['performMiss']=function(){const _0x2e5bf0=_0x2f1008;VisuMZ['ActSeqImpact']['Game_Battler_performMiss'][_0x2e5bf0(0x23f)](this),this['performDodgeActSeqImpact']();},VisuMZ[_0x2f1008(0x1b3)][_0x2f1008(0x248)]=Game_Battler[_0x2f1008(0x14f)][_0x2f1008(0x26c)],Game_Battler[_0x2f1008(0x14f)]['performEvasion']=function(){const _0x27d650=_0x2f1008;VisuMZ['ActSeqImpact'][_0x27d650(0x248)][_0x27d650(0x23f)](this),this['performDodgeActSeqImpact']();},Game_Battler[_0x2f1008(0x14f)][_0x2f1008(0x262)]=function(){const _0x1a54f2=_0x2f1008,_0x5eadac=VisuMZ[_0x1a54f2(0x1b3)][_0x1a54f2(0x185)][_0x1a54f2(0x1c9)];if(!_0x5eadac)return;if(!_0x5eadac[_0x1a54f2(0x17e)])return;if(!SceneManager[_0x1a54f2(0x25f)]())return;const _0x1bf21d=SceneManager[_0x1a54f2(0x1d7)][_0x1a54f2(0x215)];if(!_0x1bf21d)return;if(!this[_0x1a54f2(0x263)]())return;if(this[_0x1a54f2(0x263)]()[_0x1a54f2(0x16f)]>0x0)return;const _0x2d99bc=Math['randomInt'](0x168),_0x22a91a=_0x5eadac['Rate']||0.1,_0x25aa8a=_0x5eadac[_0x1a54f2(0x147)],_0x4bef3e=_0x5eadac[_0x1a54f2(0x23c)]||_0x1a54f2(0x14d);this[_0x1a54f2(0x263)]()[_0x1a54f2(0x267)](_0x2d99bc,_0x22a91a,_0x25aa8a,_0x4bef3e);},VisuMZ['ActSeqImpact'][_0x2f1008(0x1b1)]=Sprite_Battler['prototype'][_0x2f1008(0x26b)],Sprite_Battler[_0x2f1008(0x14f)][_0x2f1008(0x26b)]=function(){const _0x381422=_0x2f1008;VisuMZ[_0x381422(0x1b3)][_0x381422(0x1b1)][_0x381422(0x23f)](this),this[_0x381422(0x1c6)]();},Sprite_Battler['prototype'][_0x2f1008(0x1c6)]=function(){const _0x53a363=_0x2f1008;if(!this['_distortionSprite'])return;this[_0x53a363(0x153)]['filters']=this[_0x53a363(0x153)][_0x53a363(0x1e5)]||[],this[_0x53a363(0x206)]();},VisuMZ['ActSeqImpact'][_0x2f1008(0x219)]=Sprite_Battler['prototype']['update'],Sprite_Battler['prototype'][_0x2f1008(0x1a1)]=function(){const _0x3072a4=_0x2f1008;VisuMZ[_0x3072a4(0x1b3)][_0x3072a4(0x219)][_0x3072a4(0x23f)](this),this[_0x3072a4(0x162)](),this[_0x3072a4(0x1bd)]();},Sprite_Battler[_0x2f1008(0x14f)][_0x2f1008(0x162)]=function(){const _0x86a949=_0x2f1008;if(this[_0x86a949(0x233)]===Sprite_SvEnemy)return;if(!this[_0x86a949(0x1dd)])return;if(!this[_0x86a949(0x1dd)][_0x86a949(0x20a)]())return;if(!this[_0x86a949(0x1dd)][_0x86a949(0x246)]())return;if(!this[_0x86a949(0x1bf)])return;if(!this[_0x86a949(0x153)])return;if(this[_0x86a949(0x1f8)]){this[_0x86a949(0x1f8)]=![];return;}if(Imported['VisuMZ_2_DragonbonesUnion']&&this[_0x86a949(0x26f)]){}const _0x15c56a=this[_0x86a949(0x1dd)]['battlerMotionTrailData']();if(!_0x15c56a['visible'])return;const _0x1c994a=Math['max'](0x1,_0x15c56a['delay']);if(Graphics[_0x86a949(0x26d)]%_0x1c994a!==0x0)return;const _0x105d40=SceneManager[_0x86a949(0x1d7)][_0x86a949(0x215)][_0x86a949(0x1f3)];if(!_0x105d40){if('uOHrH'===_0x86a949(0x227))return;else this[_0x86a949(0x1d2)]=new _0xd1ae86();}this[_0x86a949(0x1f8)]=!![];const _0x53e278=new Sprite_BattlerMotionTrail(this,_0x15c56a);_0x105d40[_0x86a949(0x1d9)](_0x53e278);},Sprite_Battler[_0x2f1008(0x14f)]['createMotionBlurImpactFilter']=function(){const _0x5392eb=_0x2f1008;if(!PIXI['filters'][_0x5392eb(0x217)])return;this['_motionBlurImpactDuration']=0x0,this['_motionBlurImpactWholeDuration']=0x0,this['_motionBlurImpactEasing']='Linear',this[_0x5392eb(0x1fa)]=new PIXI[(_0x5392eb(0x1e5))][(_0x5392eb(0x217))](),this[_0x5392eb(0x1fa)][_0x5392eb(0x1b6)]['x']=0x0,this[_0x5392eb(0x1fa)][_0x5392eb(0x1b6)]['y']=0x0,Imported['VisuMZ_2_DragonbonesUnion']?'IfpSZ'===_0x5392eb(0x213)?(_0x3f9cdf['ActSeqImpact']['Spriteset_Battle_adjustFlippedBattlefield'][_0x5392eb(0x23f)](this),this['_motionTrailContainer']&&this[_0x5392eb(0x149)]&&(this[_0x5392eb(0x1f3)][_0x5392eb(0x237)]['x']=this[_0x5392eb(0x149)]['scale']['x'],this['_motionTrailContainer']['scale']['y']=this[_0x5392eb(0x149)][_0x5392eb(0x237)]['y'],this['_motionTrailContainer']['x']=this['_battlerContainer']['x'],this[_0x5392eb(0x1f3)]['y']=this['_battlerContainer']['y'])):this[_0x5392eb(0x174)]():this['_distortionSprite'][_0x5392eb(0x1e5)][_0x5392eb(0x1ed)](this['_motionBlurImpactFilter']);},Sprite_Battler[_0x2f1008(0x14f)][_0x2f1008(0x267)]=function(_0x17b7f4,_0x10feff,_0x568213,_0x220834){const _0x3a1399=_0x2f1008;if(!this[_0x3a1399(0x1fa)])return;const _0x564377=this[_0x3a1399(0x1fa)];this['_motionBlurImpactDuration']=_0x568213,this['_motionBlurImpactWholeDuration']=_0x568213,this[_0x3a1399(0x1ef)]=_0x220834;const _0x58e05d=this['mainSpriteWidth']()*_0x10feff,_0x13263b=_0x58e05d*Math[_0x3a1399(0x25a)](_0x17b7f4*Math['PI']/0xb4),_0x1283f6=-_0x58e05d*Math[_0x3a1399(0x196)](_0x17b7f4*Math['PI']/0xb4);_0x564377['velocity']['x']=_0x13263b,_0x564377[_0x3a1399(0x1b6)]['y']=_0x1283f6;},Sprite_Battler[_0x2f1008(0x14f)]['updateMotionBlurImpactFilter']=function(){const _0x422bb8=_0x2f1008;if(!this[_0x422bb8(0x1fa)])return;if(this[_0x422bb8(0x16f)]<=0x0)return;const _0x50643=this[_0x422bb8(0x1fa)],_0x2b6a20=this['_motionBlurImpactDuration']||0x0,_0x5ebcc6=this[_0x422bb8(0x19a)]||_0x2b6a20,_0x1f5cbe=0x0,_0x341c1d=this['_motionBlurImpactEasing'];_0x50643['velocity']['x']=VisuMZ[_0x422bb8(0x1b3)][_0x422bb8(0x1ea)](_0x50643['velocity']['x'],_0x1f5cbe,_0x2b6a20,_0x5ebcc6,_0x341c1d),_0x50643['velocity']['y']=VisuMZ[_0x422bb8(0x1b3)][_0x422bb8(0x1ea)](_0x50643[_0x422bb8(0x1b6)]['y'],_0x1f5cbe,_0x2b6a20,_0x5ebcc6,_0x341c1d),this[_0x422bb8(0x16f)]--,this[_0x422bb8(0x16f)]<=0x0&&(_0x50643['velocity']['x']=0x0,_0x50643['velocity']['y']=0x0),Imported[_0x422bb8(0x1ff)]&&this[_0x422bb8(0x174)]();},Sprite_Battler['prototype']['updateMotionBlurImpactDragonbonesCompatibility']=function(){const _0x18a891=_0x2f1008;if(this['_dragonbones']){if(_0x18a891(0x17b)!==_0x18a891(0x17b)){if(!_0x2f6482['filters'][_0x18a891(0x260)])return;this['_oversaturateImpactFilter']=new _0xab1580[(_0x18a891(0x1e5))][(_0x18a891(0x260))](),this[_0x18a891(0x1f7)][_0x18a891(0x1ba)](),this[_0x18a891(0x1f7)][_0x18a891(0x150)]=![],this['_baseSprite']['filters'][_0x18a891(0x1ed)](this['_oversaturateImpactFilter']);}else{if(!this[_0x18a891(0x183)]){this[_0x18a891(0x183)]=!![],this['_distortionSprite'][_0x18a891(0x1e5)][_0x18a891(0x1a0)](this[_0x18a891(0x1fa)]);for(const _0x1cf7d7 of this[_0x18a891(0x26f)][_0x18a891(0x15a)]){if(!_0x1cf7d7)continue;if(_0x1cf7d7[_0x18a891(0x1a7)]!==0x0)continue;_0x1cf7d7[_0x18a891(0x1e5)]=_0x1cf7d7[_0x18a891(0x1e5)]||[],_0x1cf7d7['filters'][_0x18a891(0x1ed)](this['_motionBlurImpactFilter']);}}}}else this['_appliedMotionBlurDragonbones']&&(_0x18a891(0x181)===_0x18a891(0x181)?(this[_0x18a891(0x183)]=![],this[_0x18a891(0x153)][_0x18a891(0x1e5)]['push'](this[_0x18a891(0x1fa)])):(_0x11402b['ActSeqImpact'][_0x18a891(0x165)][_0x18a891(0x23f)](this),this['performDodgeActSeqImpact']()));},VisuMZ[_0x2f1008(0x1b3)][_0x2f1008(0x158)]=Sprite_Battler[_0x2f1008(0x14f)][_0x2f1008(0x20b)],Sprite_Battler[_0x2f1008(0x14f)][_0x2f1008(0x20b)]=function(){const _0x56a2cb=_0x2f1008;VisuMZ[_0x56a2cb(0x1b3)][_0x56a2cb(0x158)][_0x56a2cb(0x23f)](this),this[_0x56a2cb(0x169)]();},Sprite_Battler['prototype'][_0x2f1008(0x169)]=function(){this['_injectAnimationSprite']=new Sprite_InjectAnimation();},Sprite_Battler[_0x2f1008(0x14f)][_0x2f1008(0x1f5)]=function(){const _0x8ffd50=_0x2f1008;if(!this['_injectAnimationSprite'])return![];if(this[_0x8ffd50(0x1d2)][_0x8ffd50(0x184)])return!![];return this['isInjectAnimationStarted']();},Sprite_Battler[_0x2f1008(0x14f)]['isInjectAniPrepping']=function(){const _0xb91ddb=_0x2f1008;if(!this[_0xb91ddb(0x1d2)])return![];return this[_0xb91ddb(0x1d2)]['_prep'];},Sprite_Battler[_0x2f1008(0x14f)][_0x2f1008(0x1aa)]=function(){const _0x2bf930=_0x2f1008;if(!this[_0x2bf930(0x1d2)])return![];return this[_0x2bf930(0x1d2)]['opacity']>0x0;},Spriteset_Battle[_0x2f1008(0x14f)][_0x2f1008(0x266)]=function(){const _0x327162=_0x2f1008;return this[_0x327162(0x176)]()[_0x327162(0x1ce)](_0x37aa48=>_0x37aa48[_0x327162(0x1f5)]());},Spriteset_Battle[_0x2f1008(0x14f)][_0x2f1008(0x21f)]=function(){const _0x18bd1d=_0x2f1008;return this[_0x18bd1d(0x176)]()[_0x18bd1d(0x1ce)](_0x1196a4=>_0x1196a4[_0x18bd1d(0x1e0)]());},Sprite_Battler[_0x2f1008(0x14f)]['startInjectAnimation']=function(_0x231b0e){const _0x29396b=_0x2f1008;if(!this[_0x29396b(0x1d2)])return;this['_injectAnimationSprite'][_0x29396b(0x207)](_0x231b0e);},Sprite_Battler[_0x2f1008(0x14f)][_0x2f1008(0x1de)]=function(_0xd5c9e9){const _0x4d42aa=_0x2f1008;if(!this[_0x4d42aa(0x1d2)])return;this[_0x4d42aa(0x1d2)]['stop']();},Sprite_Battler['prototype'][_0x2f1008(0x178)]=function(_0x1d6ed3){const _0x5df6af=_0x2f1008;if(!this[_0x5df6af(0x1d2)])return;this[_0x5df6af(0x1d2)]['setPause'](_0x1d6ed3);};Imported[_0x2f1008(0x1ff)]&&(VisuMZ[_0x2f1008(0x1b3)]['Sprite_Actor_updateShadowDragonbonesUnion']=Sprite_Actor[_0x2f1008(0x14f)][_0x2f1008(0x264)],Sprite_Actor[_0x2f1008(0x14f)][_0x2f1008(0x264)]=function(){const _0x638890=_0x2f1008;if(this[_0x638890(0x15e)]){if('sHyec'!==_0x638890(0x1bc)){if(!_0x17ea0f['filters'][_0x638890(0x217)])return;this[_0x638890(0x16f)]=0x0,this[_0x638890(0x19a)]=0x0,this[_0x638890(0x1ef)]=_0x638890(0x14d),this['_motionBlurImpactFilter']=new _0x59d84a[(_0x638890(0x1e5))]['MotionBlurFilter'](),this[_0x638890(0x1fa)][_0x638890(0x1b6)]['x']=0x0,this[_0x638890(0x1fa)][_0x638890(0x1b6)]['y']=0x0,_0x426008[_0x638890(0x1ff)]?this[_0x638890(0x174)]():this['_distortionSprite'][_0x638890(0x1e5)][_0x638890(0x1ed)](this[_0x638890(0x1fa)]);}else this[_0x638890(0x15e)][_0x638890(0x19e)]=0xff;}VisuMZ['ActSeqImpact'][_0x638890(0x161)][_0x638890(0x23f)](this),this[_0x638890(0x1aa)]&&this['isInjectAnimationStarted']()&&(this[_0x638890(0x15b)][_0x638890(0x1fb)]=![],this[_0x638890(0x1a3)][_0x638890(0x1fb)]=![],this[_0x638890(0x236)][_0x638890(0x1fb)]=![],this['_dragonbonesSpriteContainer']&&(this[_0x638890(0x15e)]['opacity']=0x0));});;VisuMZ[_0x2f1008(0x1b3)][_0x2f1008(0x152)]=Sprite_Damage[_0x2f1008(0x14f)]['setupCriticalEffect'],Sprite_Damage['prototype'][_0x2f1008(0x232)]=function(){const _0x5e6370=_0x2f1008;VisuMZ['ActSeqImpact']['Sprite_Damage_setupCriticalEffect']['call'](this),this[_0x5e6370(0x247)]();},Sprite_Damage[_0x2f1008(0x14f)]['setupCriticalEffectActSeqImpact']=function(){const _0xa03313=_0x2f1008,_0x23ed33=VisuMZ[_0xa03313(0x1b3)][_0xa03313(0x185)][_0xa03313(0x238)];if(!_0x23ed33)return;if(!_0x23ed33[_0xa03313(0x17e)])return;const _0xaf3d3f=SceneManager[_0xa03313(0x1d7)][_0xa03313(0x215)];if(!_0xaf3d3f)return;if(_0xaf3d3f[_0xa03313(0x1db)]>0x0)return;const _0x2e623=_0x23ed33[_0xa03313(0x214)]||0x1,_0x248f0a=_0x23ed33[_0xa03313(0x147)]||0x1,_0x3621a0=_0x23ed33[_0xa03313(0x23c)]||_0xa03313(0x1b0);_0xaf3d3f[_0xa03313(0x1e4)](_0x2e623,_0x248f0a,_0x3621a0);};function Sprite_BattlerMotionTrail(){const _0x598add=_0x2f1008;this[_0x598add(0x24f)](...arguments);}Sprite_BattlerMotionTrail[_0x2f1008(0x14f)]=Object[_0x2f1008(0x23b)](Sprite[_0x2f1008(0x14f)]),Sprite_BattlerMotionTrail[_0x2f1008(0x14f)][_0x2f1008(0x233)]=Sprite_BattlerMotionTrail,Sprite_BattlerMotionTrail[_0x2f1008(0x14f)][_0x2f1008(0x24f)]=function(_0x4935af,_0x39830f){const _0xb2c22a=_0x2f1008;this['_sourceSprite']=_0x4935af,this[_0xb2c22a(0x1c5)]=_0x39830f,Sprite['prototype']['initialize'][_0xb2c22a(0x23f)](this),this[_0xb2c22a(0x252)](),this[_0xb2c22a(0x14a)]();},Sprite_BattlerMotionTrail[_0x2f1008(0x14f)][_0x2f1008(0x252)]=function(){const _0x29791d=_0x2f1008,_0x3cc244=this['_sourceSprite'][_0x29791d(0x153)];this[_0x29791d(0x153)]=new Sprite(),this[_0x29791d(0x1d9)](this[_0x29791d(0x153)]),this['matchSpriteProperties'](this[_0x29791d(0x153)],_0x3cc244,!![]);},Sprite_BattlerMotionTrail[_0x2f1008(0x14f)][_0x2f1008(0x24a)]=function(_0x5a918d,_0x590979,_0xeb2f23){const _0x16f931=_0x2f1008;_0x5a918d[_0x16f931(0x223)]=_0x590979[_0x16f931(0x223)];const _0xb47e23=_0x590979[_0x16f931(0x21d)];_0xb47e23&&_0x5a918d[_0x16f931(0x278)](_0xb47e23['x'],_0xb47e23['y'],_0xb47e23[_0x16f931(0x1eb)],_0xb47e23[_0x16f931(0x1cd)]);_0x5a918d[_0x16f931(0x1fb)]=_0x590979[_0x16f931(0x1fb)],_0x5a918d[_0x16f931(0x222)]['x']=_0x590979[_0x16f931(0x222)]['x'],_0x5a918d[_0x16f931(0x222)]['y']=_0x590979[_0x16f931(0x222)]['y'],_0x5a918d[_0x16f931(0x237)]['x']=_0x590979[_0x16f931(0x237)]['x'],_0x5a918d['scale']['y']=_0x590979['scale']['y'],_0x5a918d[_0x16f931(0x1c3)]=_0x590979[_0x16f931(0x1c3)],_0x5a918d[_0x16f931(0x144)]['x']=_0x590979[_0x16f931(0x144)]['x'],_0x5a918d['skew']['y']=_0x590979[_0x16f931(0x144)]['y'],_0x5a918d['x']=_0x590979['x'],_0x5a918d['y']=_0x590979['y'],_0x5a918d[_0x16f931(0x1f4)](_0x590979[_0x16f931(0x172)]);if(_0xeb2f23){if('Bekwg'==='xlQLJ')this[_0x16f931(0x15e)][_0x16f931(0x19e)]=0xff;else for(const _0x542275 of _0x590979['children']){if(!_0x542275)continue;if(_0x542275[_0x16f931(0x25d)])this[_0x16f931(0x212)](_0x5a918d,_0x542275);else{const _0x26c22c=new Sprite();_0x5a918d[_0x16f931(0x1d9)](_0x26c22c),this[_0x16f931(0x24a)](_0x26c22c,_0x542275,!![]);}}}},Sprite_BattlerMotionTrail[_0x2f1008(0x14f)][_0x2f1008(0x212)]=function(_0x4db569,_0x1d2b3e){const _0x41ea14=_0x2f1008,_0x22a3ec=this[_0x41ea14(0x218)][_0x41ea14(0x1dd)]['dragonbonesData']();this[_0x41ea14(0x26f)]=DragonbonesManager[_0x41ea14(0x17a)](_0x22a3ec['battler']),_0x4db569[_0x41ea14(0x1d9)](this[_0x41ea14(0x26f)]);const _0x8cdda2=_0x1d2b3e['animation'][_0x41ea14(0x19c)],_0x5d5260=_0x1d2b3e[_0x41ea14(0x1c0)][_0x41ea14(0x22e)]['currentTime'];this[_0x41ea14(0x26f)][_0x41ea14(0x1c0)][_0x41ea14(0x205)](_0x8cdda2),this[_0x41ea14(0x26f)][_0x41ea14(0x1c0)][_0x41ea14(0x22e)][_0x41ea14(0x244)]=_0x5d5260,this[_0x41ea14(0x26f)]['animation']['timeScale']=0x0,this[_0x41ea14(0x26f)]['x']=_0x22a3ec['offsetX'],this[_0x41ea14(0x26f)]['y']=_0x22a3ec[_0x41ea14(0x210)],this[_0x41ea14(0x26f)]['scale']['x']=_0x22a3ec[_0x41ea14(0x276)],this[_0x41ea14(0x26f)][_0x41ea14(0x237)]['y']=_0x22a3ec['scaleY'],_0x4db569[_0x41ea14(0x19e)]=0x0,_0x4db569[_0x41ea14(0x245)]=0x2,_0x4db569[_0x41ea14(0x1a1)]();},Sprite_BattlerMotionTrail[_0x2f1008(0x14f)][_0x2f1008(0x14a)]=function(){const _0x396783=_0x2f1008,_0x1eb42a=this[_0x396783(0x218)],_0x1e4c26=this[_0x396783(0x1c5)];this[_0x396783(0x234)]=_0x1e4c26[_0x396783(0x22b)],this[_0x396783(0x19e)]=_0x1e4c26[_0x396783(0x230)],this[_0x396783(0x24a)](this,_0x1eb42a),this[_0x396783(0x270)]=_0x1eb42a[_0x396783(0x270)],this[_0x396783(0x269)]=_0x1eb42a['_baseY'],this[_0x396783(0x1f4)](_0x1e4c26['hue']),this[_0x396783(0x221)](_0x1e4c26[_0x396783(0x23a)]);},Sprite_BattlerMotionTrail[_0x2f1008(0x14f)][_0x2f1008(0x1a1)]=function(){const _0x3774c8=_0x2f1008;Sprite[_0x3774c8(0x14f)]['update'][_0x3774c8(0x23f)](this),this['updateNextOpacities'](this[_0x3774c8(0x15a)]),this[_0x3774c8(0x18c)]();},Sprite_BattlerMotionTrail[_0x2f1008(0x14f)][_0x2f1008(0x208)]=function(_0x49018b){const _0x2cc15e=_0x2f1008;if(!_0x49018b)return;for(const _0x5b15e0 of _0x49018b){if(_0x2cc15e(0x159)==='djIKv'){if(!this[_0x2cc15e(0x153)])return;this[_0x2cc15e(0x153)][_0x2cc15e(0x1e5)]=this['_distortionSprite'][_0x2cc15e(0x1e5)]||[],this['createMotionBlurImpactFilter']();}else{if(!_0x5b15e0)continue;if(_0x5b15e0['nextOpacity']){if(_0x2cc15e(0x1f6)===_0x2cc15e(0x1f6))_0x5b15e0[_0x2cc15e(0x245)]--,_0x5b15e0['nextOpacity']<=0x0&&(_0x2cc15e(0x1b7)!=='lsOFd'?(_0x5b15e0['opacity']=0xff,_0x5b15e0[_0x2cc15e(0x245)]=undefined):this[_0x2cc15e(0x212)](_0x39b19f,_0x213398));else{this[_0x2cc15e(0x1bf)][_0x2cc15e(0x20f)](this);this[_0x2cc15e(0x26f)]&&(this[_0x2cc15e(0x26f)][_0x2cc15e(0x168)](),this[_0x2cc15e(0x26f)]=null);const _0x4be456=_0x1ee490['_scene'][_0x2cc15e(0x215)];if(_0x4be456&&!_0x4be456[_0x2cc15e(0x1a9)](this[_0x2cc15e(0x218)])){const _0x156a15=_0x4be456[_0x2cc15e(0x149)];_0x156a15['addChild'](this[_0x2cc15e(0x218)]),_0x4be456[_0x2cc15e(0x202)]();}}}this['updateNextOpacities'](_0x5b15e0['children']);}}},Sprite_BattlerMotionTrail['prototype'][_0x2f1008(0x18c)]=function(){const _0xba3cf7=_0x2f1008;if(this[_0xba3cf7(0x234)]>0x0){const _0x105728=this[_0xba3cf7(0x234)];this[_0xba3cf7(0x19e)]=(this[_0xba3cf7(0x19e)]*(_0x105728-0x1)+0x0)/_0x105728,this[_0xba3cf7(0x234)]--,this[_0xba3cf7(0x234)]<=0x0&&this[_0xba3cf7(0x23d)]();}},Sprite_BattlerMotionTrail[_0x2f1008(0x14f)][_0x2f1008(0x23d)]=function(){const _0x20b088=_0x2f1008;this['parent'][_0x20b088(0x20f)](this);if(this[_0x20b088(0x26f)]){if('pBSip'!=='pBSip'){if(this[_0x20b088(0x151)])return this['_battlerMotionTrailData'];return this[_0x20b088(0x151)]=this[_0x20b088(0x1e1)](),this[_0x20b088(0x151)];}else this[_0x20b088(0x26f)][_0x20b088(0x168)](),this[_0x20b088(0x26f)]=null;}const _0x3627a7=SceneManager[_0x20b088(0x1d7)][_0x20b088(0x215)];if(_0x3627a7&&!_0x3627a7['hasMotionTrailSprite'](this[_0x20b088(0x218)])){const _0x4b83d0=_0x3627a7[_0x20b088(0x149)];_0x4b83d0['addChild'](this[_0x20b088(0x218)]),_0x3627a7[_0x20b088(0x202)]();}};function _0x40f6(){const _0x26daa5=['updateZoomBlurImpactFilter','waveLength','scaleX','_rgbSplitImpactFilter','setFrame','red','xWszT','hmIlX','skew','moxPZ','_frameIndex','Duration','ARRAYJSON','_battlerContainer','setupMotionTrailProperties','_baseSprite','_battleField','Linear','parse','prototype','enabled','_battlerMotionTrailData','Sprite_Damage_setupCriticalEffect','_distortionSprite','_rgbSplitImpactWholeDuration','ARRAYSTR','updateRgbSplitImpactFilter','green','Sprite_Battler_initMembers','iRLzv','children','_mainSprite','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','sortMotionTrailBattlers','_dragonbonesSpriteContainer','description','24680DMLFiy','Sprite_Actor_updateShadowDragonbonesUnion','updateMotionTrail','bind','_shockwaveImpactFilters','Game_Battler_performMiss','negative','_cellHeight','dispose','createInjectAnimationSprite','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','WvCPH','ARRAYSTRUCT','bnhKj','mWoWk','_motionBlurImpactDuration','STR','exit','_hue','_targetIndex','updateMotionBlurImpactDragonbonesCompatibility','_negativeImpactFilter','battlerSprites','stop','pauseInjectAnimation','RGBSplitFilter','createArmature','rUVVd','itIwy','bYSCo','Enable','createActSeqImpactBaseFilters','match','cGaTp','updateSpriteOffset','_appliedMotionBlurDragonbones','_prep','Settings','_blueRedInvertImpactFilter','createBattleFieldContainer','startAnimation','SceneManager_determineRepeatNumber','smooth','addLoadListener','updateDuration','updateDelay','1010454YaIqEp','ConvertParams','_vertCells','_battleImpactTimeScale','ARRAYNUM','ARRAYEVAL','updateMainSpriteVisibility','JSON','sin','filter','blue','setupShockwaveImpactFilter','_motionBlurImpactWholeDuration','amplitude','lastAnimationName','strength','opacity','onDamageActSeqImpact','remove','update','onDamage','_weaponSprite','7PsQPSy','wdKAZ','_zoomBlurImpactFilter','blendMode','setupZoomBlurImpactFilter','hasMotionTrailSprite','isInjectAnimationStarted','toBGR','_zoomBlurImpactWholeDuration','qLUwt','Wave','Spriteset_Battle_updateBattlerContainer','OutBack','Sprite_Battler_createDistortionSprite','parameters','ActSeqImpact','ZoomBlurFilter','setBattleImpactTimeScale','velocity','tbfaa','createDesaturateImpactFilter','ARRAYFUNC','lsd','Spriteset_Base_createBaseFilters','sHyec','updateMotionBlurImpactFilter','2036270lvfDRd','parent','animation','_svBattlerSprite','isGuard','angle','YqAiD','_sourceData','createActSeqImpactFilters','max','221397HteRqV','DodgeMotionBlur','format','Game_Battler_onDamage','getBattleImpactTimeScale','height','some','createZoomBlurImpactFilter','_horzCells','floor','_injectAnimationSprite','Spriteset_Base_updateBaseFilters','tYrtn','_windowLayer','updateBaseFilters','_scene','_projectilesContainer','addChild','stopGameLoop','_rgbSplitImpactDuration','wLTiI','_battler','stopInjectAnimation','ARQgE','isInjectAniPrepping','createDefaultBattlerMotionTrailData','Spriteset_Battle_adjustFlippedBattlefield','STRUCT','setupRgbSplitImpactFilter','filters','VGgBk','iahpy','isActor','setupDesaturateImpactFilter','applyEasing','width','setupOversaturateImpactFilter','push','setBattlerMotionTrailData','_motionBlurImpactEasing','putMotionTrailBattlersOnTop','xzbMs','_offsetY','_motionTrailContainer','setHue','isInjectAnimating','nKVNG','_oversaturateImpactFilter','_isCreatingMotionTrailSprite','trYKv','_motionBlurImpactFilter','visible','37592ABxThn','_waitCount','createNegativeImpactFilter','VisuMZ_2_DragonbonesUnion','freezeTime','clearBattlerMotionTrailData','updateBattlerContainer','57onFSNi','time','play','createMotionBlurImpactFilter','setup','updateNextOpacities','_cellWidth','isAlive','initMembers','determineRepeatNumber','ShockwaveFilter','setupBlueRedInvertImpactFilter','removeChild','offsetY','mainSpriteHeight','createDragonbonesArmature','pThYB','Intensity','_spriteset','185IewlHn','MotionBlurFilter','_sourceSprite','Sprite_Battler_update','length','createBaseFilters','startGameLoop','_frame','name','isAnyoneInjectAniPrepping','_desaturateImpactFilter','setColorTone','anchor','bitmap','FUNC','_pause','vertCells','uOHrH','GuardShockWave','brightness','ApplyEasing','duration','setPause','_statusWindow','lastAnimationState','updateActSeqImpactBaseFilters','opacityStart','version','setupCriticalEffect','constructor','_duration','center','_stateSprite','scale','CriticalColorBreak','trim','tone','create','EasingType','disposeSprite','VisuMZ_1_BattleCore','call','desaturate','4665400eqTvCV','updateShockwaveImpactFilters','setupNegativeImpactFilter','currentTime','nextOpacity','isAppeared','setupCriticalEffectActSeqImpact','Game_Battler_performEvasion','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','matchSpriteProperties','adjustFlippedBattlefield','_frameCount','createRgbSplitImpactFilter','_frameDelay','initialize','524163bHvqhb','Spriteset_Battle_createBattleFieldContainer','createChildren','_rgbSplitImpactEasing','frameDelay','innerRadius','27IkkKHk','map','_offsetX','SBiJk','cos','timeSpeed','loadSvActor','armature','randomInt','isSceneBattle','ColorMatrixFilter','filename','performDodgeActSeqImpact','battler','updateShadowDragonbonesUnion','_zoomBlurImpactDuration','isAnyoneInjectAnimating','setupMotionBlurImpactFilter','VPlvc','_baseY','return\x200','createDistortionSprite','performEvasion','frameCount','createBlueRedInvertImpactFilter','_dragonbones','_baseX','132dhjwJo','VEeCw','_zoomBlurImpactEasing'];_0x40f6=function(){return _0x26daa5;};return _0x40f6();}function Sprite_InjectAnimation(){this['initialize'](...arguments);}Sprite_InjectAnimation['prototype']=Object[_0x2f1008(0x23b)](Sprite[_0x2f1008(0x14f)]),Sprite_InjectAnimation[_0x2f1008(0x14f)][_0x2f1008(0x233)]=Sprite_InjectAnimation,Sprite_InjectAnimation[_0x2f1008(0x14f)][_0x2f1008(0x24f)]=function(){const _0x3c605a=_0x2f1008;Sprite[_0x3c605a(0x14f)][_0x3c605a(0x24f)][_0x3c605a(0x23f)](this),this['initMembers']();},Sprite_InjectAnimation['prototype'][_0x2f1008(0x20b)]=function(){const _0x1085f3=_0x2f1008;this[_0x1085f3(0x222)]['x']=0.5,this[_0x1085f3(0x222)]['y']=0x1,this[_0x1085f3(0x24c)]=0x0,this[_0x1085f3(0x24e)]=0x1,this[_0x1085f3(0x146)]=0x0,this[_0x1085f3(0x173)]=0x0,this[_0x1085f3(0x1d0)]=0x1,this[_0x1085f3(0x190)]=0x1,this['_cellWidth']=0x1,this[_0x1085f3(0x167)]=0x1,this[_0x1085f3(0x258)]=0x0,this['_offsetY']=0x0,this[_0x1085f3(0x19e)]=0x0,this[_0x1085f3(0x225)]=![];},Sprite_InjectAnimation['prototype'][_0x2f1008(0x207)]=function(_0x32d22b){const _0x31b28d=_0x2f1008;this[_0x31b28d(0x223)]=ImageManager[_0x31b28d(0x25c)](_0x32d22b[_0x31b28d(0x261)]),this[_0x31b28d(0x1d0)]=_0x32d22b['horzCells'],this[_0x31b28d(0x190)]=_0x32d22b[_0x31b28d(0x226)],this[_0x31b28d(0x24e)]=_0x32d22b[_0x31b28d(0x254)],this[_0x31b28d(0x173)]=this['_horzCells']*this[_0x31b28d(0x190)],this[_0x31b28d(0x258)]=_0x32d22b['offsetX'],this[_0x31b28d(0x1f2)]=_0x32d22b[_0x31b28d(0x210)],this[_0x31b28d(0x184)]=!![],this['bitmap']['smooth']=_0x32d22b[_0x31b28d(0x18a)],this[_0x31b28d(0x225)]=![],this['bitmap'][_0x31b28d(0x18b)](this[_0x31b28d(0x188)][_0x31b28d(0x163)](this));},Sprite_InjectAnimation[_0x2f1008(0x14f)][_0x2f1008(0x188)]=function(){const _0x468d9b=_0x2f1008;this[_0x468d9b(0x19e)]=0xff,this[_0x468d9b(0x24c)]=0x0,this[_0x468d9b(0x146)]=0x0,this[_0x468d9b(0x209)]=Math[_0x468d9b(0x1d1)](this[_0x468d9b(0x223)][_0x468d9b(0x1eb)]/this[_0x468d9b(0x1d0)])||0x1,this[_0x468d9b(0x167)]=Math['floor'](this[_0x468d9b(0x223)][_0x468d9b(0x1cd)]/this[_0x468d9b(0x190)])||0x1,this['opacity']=0xff,this[_0x468d9b(0x184)]=![],this[_0x468d9b(0x1a1)]();},Sprite_InjectAnimation[_0x2f1008(0x14f)][_0x2f1008(0x1a1)]=function(){const _0xf32677=_0x2f1008;Sprite[_0xf32677(0x14f)][_0xf32677(0x1a1)][_0xf32677(0x23f)](this);if(this['opacity']<=0x0)return;this[_0xf32677(0x18d)](),this['updateFrame'](),this['updateSpriteOffset'](),this[_0xf32677(0x194)]();},Sprite_InjectAnimation[_0x2f1008(0x14f)][_0x2f1008(0x18d)]=function(){const _0x26d79e=_0x2f1008;!this[_0x26d79e(0x225)]&&++this[_0x26d79e(0x24c)]>=this[_0x26d79e(0x24e)]&&(_0x26d79e(0x142)!==_0x26d79e(0x142)?(this[_0x26d79e(0x1f3)]['scale']['x']=this[_0x26d79e(0x149)][_0x26d79e(0x237)]['x'],this[_0x26d79e(0x1f3)][_0x26d79e(0x237)]['y']=this[_0x26d79e(0x149)][_0x26d79e(0x237)]['y'],this['_motionTrailContainer']['x']=this['_battlerContainer']['x'],this[_0x26d79e(0x1f3)]['y']=this[_0x26d79e(0x149)]['y']):(this['_frameCount']=0x0,this[_0x26d79e(0x146)]++)),this['opacity']=this['_frameIndex']<this[_0x26d79e(0x173)]?0xff:0x0;},Sprite_InjectAnimation[_0x2f1008(0x14f)]['updateFrame']=function(){const _0xb41b46=_0x2f1008,_0x572faf=this[_0xb41b46(0x209)],_0x405b53=this[_0xb41b46(0x167)],_0x2522d3=this['_frameIndex']%this[_0xb41b46(0x1d0)]*_0x572faf,_0x2376fc=Math[_0xb41b46(0x1d1)](this[_0xb41b46(0x146)]/this[_0xb41b46(0x1d0)])*_0x405b53;this[_0xb41b46(0x278)](_0x2522d3,_0x2376fc,_0x572faf,_0x405b53);},Sprite_InjectAnimation[_0x2f1008(0x14f)][_0x2f1008(0x182)]=function(){const _0xd98e8e=_0x2f1008;this['x']=this['_offsetX'],this['y']=this[_0xd98e8e(0x1f2)];const _0x1025ae=this[_0xd98e8e(0x1bf)][_0xd98e8e(0x1bf)][_0xd98e8e(0x15b)];_0x1025ae&&(this['x']+=_0x1025ae['x'],this['y']+=_0x1025ae['y']);},Sprite_InjectAnimation[_0x2f1008(0x14f)]['updateMainSpriteVisibility']=function(){const _0x5f1db4=_0x2f1008;if(!this[_0x5f1db4(0x1bf)])return;if(!this['parent'][_0x5f1db4(0x1bf)])return;{if(_0x5f1db4(0x143)!==_0x5f1db4(0x143))_0x450b92(_0x5f1db4(0x249)['format'](_0x19e4b5,_0xb0ea32,_0x1d5ca4)),_0x1f5e94['exit']();else{const _0x13af7f=this[_0x5f1db4(0x1bf)][_0x5f1db4(0x1bf)][_0x5f1db4(0x15b)];_0x13af7f&&(_0x13af7f[_0x5f1db4(0x1fb)]=this[_0x5f1db4(0x19e)]<=0x0);}}{if(_0x5f1db4(0x17d)===_0x5f1db4(0x17d)){const _0x5191d8=this['parent'][_0x5f1db4(0x1bf)][_0x5f1db4(0x1c1)];if(_0x5191d8){if(_0x5f1db4(0x17c)!==_0x5f1db4(0x17c)){const _0x2b6c93=this[_0x5f1db4(0x1bf)][_0x5f1db4(0x1bf)][_0x5f1db4(0x15b)];_0x2b6c93&&(_0x2b6c93[_0x5f1db4(0x1fb)]=this[_0x5f1db4(0x19e)]<=0x0);}else _0x5191d8[_0x5f1db4(0x1fb)]=this[_0x5f1db4(0x19e)]<=0x0;}}else this[_0x5f1db4(0x164)][_0x5f1db4(0x1a0)](_0xc4b255),this[_0x5f1db4(0x14b)][_0x5f1db4(0x1e5)]['remove'](_0x37464c);}},Sprite_InjectAnimation[_0x2f1008(0x14f)]['stop']=function(){const _0x4de7da=_0x2f1008;this[_0x4de7da(0x184)]=![],this[_0x4de7da(0x19e)]=0x0,this['_frameIndex']=this[_0x4de7da(0x173)],this[_0x4de7da(0x194)]();},Sprite_InjectAnimation[_0x2f1008(0x14f)][_0x2f1008(0x22c)]=function(_0x191d1b){const _0x359821=_0x2f1008;this[_0x359821(0x225)]=_0x191d1b;},VisuMZ[_0x2f1008(0x1b3)][_0x2f1008(0x1bb)]=Spriteset_Base[_0x2f1008(0x14f)][_0x2f1008(0x21b)],Spriteset_Base[_0x2f1008(0x14f)][_0x2f1008(0x21b)]=function(){const _0x4f44bb=_0x2f1008;VisuMZ[_0x4f44bb(0x1b3)][_0x4f44bb(0x1bb)][_0x4f44bb(0x23f)](this),this[_0x4f44bb(0x17f)]();},VisuMZ['ActSeqImpact'][_0x2f1008(0x1d3)]=Spriteset_Base['prototype'][_0x2f1008(0x1d6)],Spriteset_Base['prototype'][_0x2f1008(0x1d6)]=function(){const _0x563280=_0x2f1008;VisuMZ[_0x563280(0x1b3)]['Spriteset_Base_updateBaseFilters'][_0x563280(0x23f)](this),this[_0x563280(0x22f)]();},Spriteset_Base[_0x2f1008(0x14f)][_0x2f1008(0x17f)]=function(){const _0x561f48=_0x2f1008;this[_0x561f48(0x24d)](),this['_shockwaveImpactFilters']=[],this[_0x561f48(0x206)](),this[_0x561f48(0x1cf)](),this[_0x561f48(0x26e)](),this['createDesaturateImpactFilter'](),this['createNegativeImpactFilter'](),this['createOversaturateImpactFilter']();},Spriteset_Base[_0x2f1008(0x14f)]['updateActSeqImpactBaseFilters']=function(){const _0x1888bf=_0x2f1008;this[_0x1888bf(0x156)](),this['updateShockwaveImpactFilters'](),this[_0x1888bf(0x1bd)](),this[_0x1888bf(0x274)]();},VisuMZ[_0x2f1008(0x1b3)]['applyEasing']=function(_0x2a3cb0,_0x452c16,_0xd66265,_0xf38125,_0x5b2bec){const _0x46310c=_0x2f1008,_0x4107fa=VisuMZ[_0x46310c(0x22a)]((_0xf38125-_0xd66265)/_0xf38125,_0x5b2bec||_0x46310c(0x14d)),_0x4d217f=VisuMZ[_0x46310c(0x22a)]((_0xf38125-_0xd66265+0x1)/_0xf38125,_0x5b2bec||_0x46310c(0x14d)),_0x234985=(_0x2a3cb0-_0x452c16*_0x4107fa)/(0x1-_0x4107fa);return _0x234985+(_0x452c16-_0x234985)*_0x4d217f;},Spriteset_Base[_0x2f1008(0x14f)][_0x2f1008(0x24d)]=function(){const _0x4281e8=_0x2f1008;if(!PIXI[_0x4281e8(0x1e5)][_0x4281e8(0x179)])return;if(this[_0x4281e8(0x277)])return;this[_0x4281e8(0x1db)]=0x0,this[_0x4281e8(0x154)]=0x0,this[_0x4281e8(0x253)]=_0x4281e8(0x14d),this[_0x4281e8(0x277)]=new PIXI['filters'][(_0x4281e8(0x179))](),this[_0x4281e8(0x277)][_0x4281e8(0x141)]=[0x0,0x0],this[_0x4281e8(0x277)][_0x4281e8(0x157)]=[0x0,0x0],this[_0x4281e8(0x277)][_0x4281e8(0x198)]=[0x0,0x0],this[_0x4281e8(0x14b)][_0x4281e8(0x1e5)][_0x4281e8(0x1ed)](this[_0x4281e8(0x277)]);},Spriteset_Base[_0x2f1008(0x14f)]['setupRgbSplitImpactFilter']=function(_0x5756ff,_0x5a0949,_0x52fb48){const _0x1218de=_0x2f1008;if(!this[_0x1218de(0x277)])return;const _0x18ec80=this[_0x1218de(0x277)],_0x2286ff=_0x5756ff*0x2;this['_rgbSplitImpactDuration']=_0x5a0949,this[_0x1218de(0x154)]=_0x5a0949,this[_0x1218de(0x253)]=_0x52fb48||_0x1218de(0x14d),_0x18ec80[_0x1218de(0x141)]=[Math[_0x1218de(0x25e)](_0x2286ff)-_0x5756ff,Math[_0x1218de(0x25e)](_0x2286ff)-_0x5756ff],_0x18ec80[_0x1218de(0x157)]=[Math[_0x1218de(0x25e)](_0x2286ff)-_0x5756ff,Math[_0x1218de(0x25e)](_0x2286ff)-_0x5756ff],_0x18ec80['blue']=[Math[_0x1218de(0x25e)](_0x2286ff)-_0x5756ff,Math[_0x1218de(0x25e)](_0x2286ff)-_0x5756ff];},Spriteset_Base[_0x2f1008(0x14f)][_0x2f1008(0x156)]=function(){const _0x143473=_0x2f1008;if(!this['_rgbSplitImpactFilter'])return;if(this[_0x143473(0x1db)]<=0x0)return;const _0x12d4ba=this[_0x143473(0x277)],_0x4d6a69=this[_0x143473(0x1db)]||0x0,_0x4a7363=this[_0x143473(0x154)]||_0x4d6a69,_0x4b7847=0x0,_0x10c583=this[_0x143473(0x253)];_0x12d4ba[_0x143473(0x141)][0x0]=VisuMZ[_0x143473(0x1b3)]['applyEasing'](_0x12d4ba[_0x143473(0x141)][0x0],_0x4b7847,_0x4d6a69,_0x4a7363,_0x10c583),_0x12d4ba[_0x143473(0x141)][0x1]=VisuMZ['ActSeqImpact'][_0x143473(0x1ea)](_0x12d4ba['red'][0x1],_0x4b7847,_0x4d6a69,_0x4a7363,_0x10c583),_0x12d4ba[_0x143473(0x157)][0x0]=VisuMZ[_0x143473(0x1b3)][_0x143473(0x1ea)](_0x12d4ba[_0x143473(0x157)][0x0],_0x4b7847,_0x4d6a69,_0x4a7363,_0x10c583),_0x12d4ba[_0x143473(0x157)][0x1]=VisuMZ['ActSeqImpact'][_0x143473(0x1ea)](_0x12d4ba['green'][0x1],_0x4b7847,_0x4d6a69,_0x4a7363,_0x10c583),_0x12d4ba[_0x143473(0x198)][0x0]=VisuMZ[_0x143473(0x1b3)]['applyEasing'](_0x12d4ba[_0x143473(0x198)][0x0],_0x4b7847,_0x4d6a69,_0x4a7363,_0x10c583),_0x12d4ba[_0x143473(0x198)][0x1]=VisuMZ[_0x143473(0x1b3)][_0x143473(0x1ea)](_0x12d4ba[_0x143473(0x198)][0x1],_0x4b7847,_0x4d6a69,_0x4a7363,_0x10c583),this[_0x143473(0x1db)]--,this[_0x143473(0x1db)]<=0x0&&(_0x12d4ba[_0x143473(0x141)]=[0x0,0x0],_0x12d4ba[_0x143473(0x157)]=[0x0,0x0],_0x12d4ba['blue']=[0x0,0x0]);},Spriteset_Base[_0x2f1008(0x14f)][_0x2f1008(0x199)]=function(_0x107b29,_0x54f1d0,_0x3d4cc7,_0x4f2e6c,_0x59a0c7){const _0x475993=_0x2f1008;if(!PIXI['filters']['ShockwaveFilter'])return;const _0xa1642c=0x2/Math[_0x475993(0x1c7)](0x2,_0x59a0c7),_0x2045fc=new PIXI[(_0x475993(0x1e5))][(_0x475993(0x20d))]();_0x2045fc['center']=[_0x107b29,_0x54f1d0],_0x2045fc[_0x475993(0x19b)]=_0x3d4cc7,_0x2045fc[_0x475993(0x275)]=_0x4f2e6c,_0x2045fc[_0x475993(0x229)]=0x1,_0x2045fc['radius']=-0x1,_0x2045fc['timeSpeed']=_0xa1642c,this[_0x475993(0x164)][_0x475993(0x1ed)](_0x2045fc),this[_0x475993(0x14b)]['filters'][_0x475993(0x1ed)](_0x2045fc);},Spriteset_Base[_0x2f1008(0x14f)][_0x2f1008(0x242)]=function(){const _0x5e445f=_0x2f1008;if(!this[_0x5e445f(0x164)])return;if(this[_0x5e445f(0x164)][_0x5e445f(0x21a)]<=0x0)return;for(const _0x4a6dbc of this[_0x5e445f(0x164)]){if(!_0x4a6dbc)continue;_0x4a6dbc[_0x5e445f(0x204)]+=_0x4a6dbc[_0x5e445f(0x25b)],_0x4a6dbc[_0x5e445f(0x204)]>=0x2&&(_0x5e445f(0x16b)!=='WvCPH'?(this[_0x5e445f(0x15e)]&&(this[_0x5e445f(0x15e)][_0x5e445f(0x19e)]=0xff),_0x360e21[_0x5e445f(0x1b3)]['Sprite_Actor_updateShadowDragonbonesUnion'][_0x5e445f(0x23f)](this),this['isInjectAnimationStarted']&&this[_0x5e445f(0x1aa)]()&&(this[_0x5e445f(0x15b)][_0x5e445f(0x1fb)]=![],this[_0x5e445f(0x1a3)]['visible']=![],this['_stateSprite'][_0x5e445f(0x1fb)]=![],this[_0x5e445f(0x15e)]&&(this['_dragonbonesSpriteContainer'][_0x5e445f(0x19e)]=0x0))):(this[_0x5e445f(0x164)]['remove'](_0x4a6dbc),this['_baseSprite'][_0x5e445f(0x1e5)][_0x5e445f(0x1a0)](_0x4a6dbc)));}},Spriteset_Base['prototype'][_0x2f1008(0x206)]=function(){const _0x3d1a93=_0x2f1008;if(!PIXI[_0x3d1a93(0x1e5)][_0x3d1a93(0x217)])return;this['_motionBlurImpactDuration']=0x0,this[_0x3d1a93(0x19a)]=0x0,this[_0x3d1a93(0x1ef)]=_0x3d1a93(0x14d),this[_0x3d1a93(0x1fa)]=new PIXI[(_0x3d1a93(0x1e5))][(_0x3d1a93(0x217))](),this[_0x3d1a93(0x1fa)]['velocity']['x']=0x0,this[_0x3d1a93(0x1fa)][_0x3d1a93(0x1b6)]['y']=0x0,this[_0x3d1a93(0x14b)]['filters'][_0x3d1a93(0x1ed)](this[_0x3d1a93(0x1fa)]);},Spriteset_Base[_0x2f1008(0x14f)][_0x2f1008(0x267)]=function(_0x5d67df,_0x181864,_0x2c46e4,_0x5b0d65){const _0x205586=_0x2f1008;if(!this[_0x205586(0x1fa)])return;const _0x205a7c=this['_motionBlurImpactFilter'];this[_0x205586(0x16f)]=_0x2c46e4,this[_0x205586(0x19a)]=_0x2c46e4,this[_0x205586(0x1ef)]=_0x5b0d65;const _0x232338=Math[_0x205586(0x1c7)](this[_0x205586(0x1eb)],this[_0x205586(0x1cd)])*_0x181864,_0xe09880=_0x232338*Math[_0x205586(0x25a)](_0x5d67df*Math['PI']/0xb4),_0x3988b8=-_0x232338*Math[_0x205586(0x196)](_0x5d67df*Math['PI']/0xb4);_0x205a7c[_0x205586(0x1b6)]['x']=_0xe09880,_0x205a7c[_0x205586(0x1b6)]['y']=_0x3988b8;},Spriteset_Base[_0x2f1008(0x14f)][_0x2f1008(0x1bd)]=function(){const _0x5db4c0=_0x2f1008;if(!this[_0x5db4c0(0x1fa)])return;if(this[_0x5db4c0(0x16f)]<=0x0)return;const _0x2abcef=this[_0x5db4c0(0x1fa)],_0x495772=this[_0x5db4c0(0x16f)]||0x0,_0x54a33f=this['_motionBlurImpactWholeDuration']||_0x495772,_0x2a47d7=0x0,_0xbabebd=this['_motionBlurImpactEasing'];_0x2abcef[_0x5db4c0(0x1b6)]['x']=VisuMZ['ActSeqImpact'][_0x5db4c0(0x1ea)](_0x2abcef[_0x5db4c0(0x1b6)]['x'],_0x2a47d7,_0x495772,_0x54a33f,_0xbabebd),_0x2abcef[_0x5db4c0(0x1b6)]['y']=VisuMZ[_0x5db4c0(0x1b3)][_0x5db4c0(0x1ea)](_0x2abcef['velocity']['y'],_0x2a47d7,_0x495772,_0x54a33f,_0xbabebd),this['_motionBlurImpactDuration']--;if(this[_0x5db4c0(0x16f)]<=0x0){if(_0x5db4c0(0x145)===_0x5db4c0(0x16d)){let _0x6a5afd=0x1;return _0x138e2b[_0x5db4c0(0x25f)]()&&(_0x6a5afd=_0x130eac['getBattleImpactTimeScale'](),_0x6a5afd=_0x8f84e[_0x5db4c0(0x1c7)](0.01,_0x6a5afd)),_0x383052[_0x5db4c0(0x1b3)]['SceneManager_determineRepeatNumber'][_0x5db4c0(0x23f)](this,_0x478873*_0x6a5afd);}else _0x2abcef[_0x5db4c0(0x1b6)]['x']=0x0,_0x2abcef['velocity']['y']=0x0;}},Spriteset_Base[_0x2f1008(0x14f)][_0x2f1008(0x1cf)]=function(){const _0x32379f=_0x2f1008;if(!PIXI[_0x32379f(0x1e5)][_0x32379f(0x1b4)])return;this['_zoomBlurImpactDuration']=0x0,this[_0x32379f(0x1ac)]=0x0,this[_0x32379f(0x273)]=_0x32379f(0x14d),this[_0x32379f(0x1a6)]=new PIXI[(_0x32379f(0x1e5))][(_0x32379f(0x1b4))](),this[_0x32379f(0x1a6)][_0x32379f(0x19d)]=0x0,this['_zoomBlurImpactFilter'][_0x32379f(0x235)]['x']=Graphics['width']/0x2,this[_0x32379f(0x1a6)][_0x32379f(0x235)]['y']=Graphics[_0x32379f(0x1cd)]/0x2,this[_0x32379f(0x1a6)][_0x32379f(0x255)]=0x60,this[_0x32379f(0x14b)][_0x32379f(0x1e5)][_0x32379f(0x1ed)](this[_0x32379f(0x1a6)]);},Spriteset_Base[_0x2f1008(0x14f)][_0x2f1008(0x1a8)]=function(_0x4408b2,_0x28c600,_0x1cd357,_0x1479b5,_0x4abeaa,_0x3a12e0){const _0x369f2d=_0x2f1008;if(!this[_0x369f2d(0x1a6)])return;const _0x2b0890=this[_0x369f2d(0x1a6)];this[_0x369f2d(0x265)]=_0x4abeaa,this[_0x369f2d(0x1ac)]=_0x4abeaa,this[_0x369f2d(0x273)]=_0x3a12e0,_0x2b0890[_0x369f2d(0x19d)]=_0x4408b2,_0x2b0890['center']['x']=_0x28c600,_0x2b0890[_0x369f2d(0x235)]['y']=_0x1cd357,_0x2b0890[_0x369f2d(0x255)]=_0x1479b5;},Spriteset_Base[_0x2f1008(0x14f)][_0x2f1008(0x274)]=function(){const _0x1858d1=_0x2f1008;if(!this['_zoomBlurImpactFilter'])return;if(this[_0x1858d1(0x265)]<=0x0)return;const _0x34d597=this[_0x1858d1(0x1a6)],_0x25383f=this['_zoomBlurImpactDuration']||0x0,_0x1fb409=this[_0x1858d1(0x1ac)]||_0x25383f,_0x14690f=0x0,_0x22a3de=this[_0x1858d1(0x273)];_0x34d597[_0x1858d1(0x19d)]=VisuMZ[_0x1858d1(0x1b3)][_0x1858d1(0x1ea)](_0x34d597['strength'],_0x14690f,_0x25383f,_0x1fb409,_0x22a3de),this[_0x1858d1(0x265)]--,this[_0x1858d1(0x265)]<=0x0&&(_0x34d597[_0x1858d1(0x19d)]=0x0);},Spriteset_Base[_0x2f1008(0x14f)][_0x2f1008(0x26e)]=function(){const _0x97f4bb=_0x2f1008;if(!PIXI[_0x97f4bb(0x1e5)][_0x97f4bb(0x260)])return;this[_0x97f4bb(0x186)]=new PIXI[(_0x97f4bb(0x1e5))][(_0x97f4bb(0x260))](),this[_0x97f4bb(0x186)][_0x97f4bb(0x1ab)](),this[_0x97f4bb(0x186)]['enabled']=![],this[_0x97f4bb(0x14b)][_0x97f4bb(0x1e5)][_0x97f4bb(0x1ed)](this[_0x97f4bb(0x186)]);},Spriteset_Base[_0x2f1008(0x14f)][_0x2f1008(0x20e)]=function(_0x2ef051){const _0x42d67a=_0x2f1008;if(!this[_0x42d67a(0x186)])return;this[_0x42d67a(0x186)][_0x42d67a(0x150)]=_0x2ef051,this[_0x42d67a(0x1a1)]();},Spriteset_Base[_0x2f1008(0x14f)][_0x2f1008(0x1b8)]=function(){const _0x3933ae=_0x2f1008;if(!PIXI['filters'][_0x3933ae(0x260)])return;this[_0x3933ae(0x220)]=new PIXI[(_0x3933ae(0x1e5))]['ColorMatrixFilter'](),this['_desaturateImpactFilter'][_0x3933ae(0x240)](),this[_0x3933ae(0x220)][_0x3933ae(0x150)]=![],this[_0x3933ae(0x14b)][_0x3933ae(0x1e5)][_0x3933ae(0x1ed)](this[_0x3933ae(0x220)]);},Spriteset_Base[_0x2f1008(0x14f)][_0x2f1008(0x1e9)]=function(_0x409658){const _0x697ca2=_0x2f1008;if(!this['_desaturateImpactFilter'])return;this[_0x697ca2(0x220)][_0x697ca2(0x150)]=_0x409658,this[_0x697ca2(0x1a1)]();},Spriteset_Base['prototype'][_0x2f1008(0x1fe)]=function(){const _0x365ab3=_0x2f1008;if(!PIXI[_0x365ab3(0x1e5)][_0x365ab3(0x260)])return;this[_0x365ab3(0x175)]=new PIXI['filters']['ColorMatrixFilter'](),this['_negativeImpactFilter'][_0x365ab3(0x166)](),this[_0x365ab3(0x175)][_0x365ab3(0x150)]=![],this[_0x365ab3(0x14b)][_0x365ab3(0x1e5)]['push'](this[_0x365ab3(0x175)]);},Spriteset_Base[_0x2f1008(0x14f)][_0x2f1008(0x243)]=function(_0x531949){const _0x5f318e=_0x2f1008;if(!this[_0x5f318e(0x175)])return;this['_negativeImpactFilter']['enabled']=_0x531949,this[_0x5f318e(0x1a1)]();},Spriteset_Base['prototype']['createOversaturateImpactFilter']=function(){const _0x77f36b=_0x2f1008;if(!PIXI['filters'][_0x77f36b(0x260)])return;this[_0x77f36b(0x1f7)]=new PIXI[(_0x77f36b(0x1e5))]['ColorMatrixFilter'](),this[_0x77f36b(0x1f7)][_0x77f36b(0x1ba)](),this['_oversaturateImpactFilter']['enabled']=![],this['_baseSprite'][_0x77f36b(0x1e5)][_0x77f36b(0x1ed)](this[_0x77f36b(0x1f7)]);},Spriteset_Base['prototype'][_0x2f1008(0x1ec)]=function(_0x218310){const _0x353f8c=_0x2f1008;if(!this['_oversaturateImpactFilter'])return;this[_0x353f8c(0x1f7)][_0x353f8c(0x150)]=_0x218310,this[_0x353f8c(0x1a1)]();},VisuMZ[_0x2f1008(0x1b3)][_0x2f1008(0x251)]=Spriteset_Battle[_0x2f1008(0x14f)][_0x2f1008(0x187)],Spriteset_Battle[_0x2f1008(0x14f)]['createBattleFieldContainer']=function(){const _0x510d9f=_0x2f1008;VisuMZ[_0x510d9f(0x1b3)][_0x510d9f(0x251)][_0x510d9f(0x23f)](this),this[_0x510d9f(0x1f3)]=new Sprite(),this[_0x510d9f(0x14c)][_0x510d9f(0x1d9)](this[_0x510d9f(0x1f3)]),this['_projectilesContainer']&&this[_0x510d9f(0x14c)][_0x510d9f(0x1d9)](this[_0x510d9f(0x1d8)]);},VisuMZ[_0x2f1008(0x1b3)][_0x2f1008(0x1e2)]=Spriteset_Battle['prototype'][_0x2f1008(0x24b)],Spriteset_Battle[_0x2f1008(0x14f)]['adjustFlippedBattlefield']=function(){const _0x2708d4=_0x2f1008;VisuMZ[_0x2708d4(0x1b3)][_0x2708d4(0x1e2)]['call'](this),this[_0x2708d4(0x1f3)]&&this[_0x2708d4(0x149)]&&(this[_0x2708d4(0x1f3)][_0x2708d4(0x237)]['x']=this[_0x2708d4(0x149)]['scale']['x'],this[_0x2708d4(0x1f3)]['scale']['y']=this[_0x2708d4(0x149)][_0x2708d4(0x237)]['y'],this[_0x2708d4(0x1f3)]['x']=this[_0x2708d4(0x149)]['x'],this[_0x2708d4(0x1f3)]['y']=this[_0x2708d4(0x149)]['y']);},VisuMZ[_0x2f1008(0x1b3)][_0x2f1008(0x1af)]=Spriteset_Battle[_0x2f1008(0x14f)]['updateBattlerContainer'],Spriteset_Battle[_0x2f1008(0x14f)][_0x2f1008(0x202)]=function(){const _0x20ef5a=_0x2f1008;VisuMZ[_0x20ef5a(0x1b3)]['Spriteset_Battle_updateBattlerContainer']['call'](this),this[_0x20ef5a(0x1f0)](),this[_0x20ef5a(0x15d)]();},Spriteset_Battle[_0x2f1008(0x14f)][_0x2f1008(0x1f0)]=function(){const _0x48d1f4=_0x2f1008;for(const _0x39be92 of this[_0x48d1f4(0x149)]['children']){if(!_0x39be92)continue;this[_0x48d1f4(0x1a9)](_0x39be92)&&this[_0x48d1f4(0x1f3)][_0x48d1f4(0x1d9)](_0x39be92);}},Spriteset_Battle['prototype'][_0x2f1008(0x1a9)]=function(_0x3f72da){const _0x4a1d77=_0x2f1008;if(!this[_0x4a1d77(0x1f3)]){if(_0x4a1d77(0x1d4)===_0x4a1d77(0x1c4)){if(!this[_0x4a1d77(0x1fa)])return;const _0x129fc9=this['_motionBlurImpactFilter'];this[_0x4a1d77(0x16f)]=_0x26badf,this[_0x4a1d77(0x19a)]=_0x103fbd,this[_0x4a1d77(0x1ef)]=_0x22898d;const _0x53a4c3=this['mainSpriteWidth']()*_0x1f503b,_0x48360e=_0x53a4c3*_0x35b154[_0x4a1d77(0x25a)](_0xd45b29*_0x16766a['PI']/0xb4),_0xe19c1a=-_0x53a4c3*_0x3b8e49[_0x4a1d77(0x196)](_0x4d7173*_0x27912e['PI']/0xb4);_0x129fc9[_0x4a1d77(0x1b6)]['x']=_0x48360e,_0x129fc9[_0x4a1d77(0x1b6)]['y']=_0xe19c1a;}else return![];}return this[_0x4a1d77(0x1f3)]['children'][_0x4a1d77(0x1ce)](_0x1571b6=>_0x1571b6[_0x4a1d77(0x218)]===_0x3f72da);},Spriteset_Battle['prototype']['sortMotionTrailBattlers']=function(){const _0x1e53f6=_0x2f1008;if(!this[_0x1e53f6(0x1f3)]){if(_0x1e53f6(0x1e6)!=='VGgBk'){if(!this[_0x1e53f6(0x1d2)])return;this[_0x1e53f6(0x1d2)][_0x1e53f6(0x177)]();}else return![];}const _0x43c6db=this[_0x1e53f6(0x1f3)][_0x1e53f6(0x15a)][_0x1e53f6(0x197)](_0x40eabf=>_0x40eabf[_0x1e53f6(0x233)]!==Sprite_BattlerMotionTrail);for(const _0xf2533 of _0x43c6db){_0x1e53f6(0x1dc)===_0x1e53f6(0x1df)?(_0x5c80ac['ActSeqImpact'][_0x1e53f6(0x1cb)][_0x1e53f6(0x23f)](this,_0x59decb),this[_0x1e53f6(0x19f)](_0x23f1a7)):this[_0x1e53f6(0x1f3)][_0x1e53f6(0x1d9)](_0xf2533);}},VisuMZ[_0x2f1008(0x1b3)][_0x2f1008(0x200)]=function(_0x5d61d2,_0x43ff65){const _0x4dd319=_0x2f1008;if(_0x43ff65){if(_0x4dd319(0x1e7)==='XXDQw'){const _0x56023b=this[_0x4dd319(0x1bf)][_0x4dd319(0x1bf)]['_svBattlerSprite'];_0x56023b&&(_0x56023b['visible']=this[_0x4dd319(0x19e)]<=0x0);}else _0x43ff65[_0x4dd319(0x1fd)]=_0x43ff65[_0x4dd319(0x1fd)]||0x0,_0x43ff65[_0x4dd319(0x1fd)]=Math[_0x4dd319(0x1c7)](_0x43ff65[_0x4dd319(0x1fd)],0x1);}_0x5d61d2=_0x5d61d2||0x1,Graphics[_0x4dd319(0x1da)](),setTimeout(Graphics[_0x4dd319(0x21c)][_0x4dd319(0x163)](Graphics),_0x5d61d2);};