//=============================================================================
// VisuStella MZ - Action Sequence Projectiles
// VisuMZ_3_ActSeqProjectiles.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_ActSeqProjectiles = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ActSeqProjectiles = VisuMZ.ActSeqProjectiles || {};
VisuMZ.ActSeqProjectiles.version = 1.09;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.09] [ActSeqProjectiles]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Action_Sequence_Projectiles_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds projectile control the Battle Core's Action Sequences,
 * allowing you, the game dev, to create entities that fire from one screen
 * location to another screen location. These locations can be either battler
 * targets or exact points on the screen. Projectiles can come in the form of
 * pictures, icons, and animations. Make them spin, make them arc, make them
 * travel at differing speeds across the battlefield!
 *
 * Features include all (but not limited to) the following:
 * 
 * * Create projectiles that can be fired across the battlefield.
 * * Projectiles can be pictures, icons, and/or animations.
 * * Action Sequences give you control over where they come from and where
 *   they go: targets and/or points.
 * * Extra settings that give you extra control over projectiles such as
 *   automatic angles, angle offsets, blend modes, trajectory easy, hues,
 *   scaling, and spin speed.
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
 * * VisuMZ_1_BattleCore
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
 * Projectile Types
 * ============================================================================
 *
 * Projectiles come in three types: pictures, icons, and animations. Each have
 * their own properties, but ultimately, work very similar.
 *
 * ---
 *
 * Picture Projectiles
 * 
 * These projectiles use images found in the img/pictures/ folder of your game
 * project. Used as static images, they allow you to create projectiles of any
 * size and dimension to your liking. These offer the most flexibility when it
 * comes to options and extra settings.
 *
 * ---
 * 
 * Icon Projectiles
 * 
 * For those who want to save up on resources and utilize the already loaded
 * icon sheet, you can simply select an icon index to pick an icon as the
 * projectile's image. Like pictures, these offer the most flexibility when it
 * comes to options and extra settings.
 * 
 * ---
 * 
 * Animation Projectiles
 * 
 * Those who want a bit more spice in their projectiles and want something that
 * animates can picture animation projectiles. The animation will play through
 * its frames until it hits its end, after which, the animation restarts.
 * However, because animations are much more complicated than just a static
 * image, some options and extra settings are not available for animations.
 * 
 * ---
 *
 * ============================================================================
 * Action Sequence Plugin Commands
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
 * === Action Sequences - Projectiles ===
 * 
 * Create projectiles on the screen and fire them off at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 * 
 * ---
 *
 * PROJECTILE: Animation
 * - Create an animation projectile and fire it at a target.
 * - Requires VisuMZ_3_ActSeqProjectiles!
 *
 *   Coordinates:
 *
 *     Start Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should start from.
 *         - Target - Start from battler target(s)
 *         - Point - Start from a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) to start the projectile from.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 * 
 *           Target Location:
 *           - Select which part of the target to send the projectile from.
 *           - front head
 *           - front center
 *           - front base
 *           - middle head
 *           - middle center
 *           - middle base
 *           - back head
 *           - back center
 *           - back base
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to start the projectile at.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *     Goal Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should go to.
 *         - Target - Goal is battler target(s)
 *         - Point - Goal is a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) for projectile to go to.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 * 
 *           Target Location:
 *           - Select which part of the target to send the projectile to.
 *           - front head
 *           - front center
 *           - front base
 *           - middle head
 *           - middle center
 *           - middle base
 *           - back head
 *           - back center
 *           - back base
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to send the projectile to.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *   Settings:
 *
 *     Animation ID:
 *     - Determine which animation to use as a projectile.
 *
 *     Duration:
 *     - Duration for the projectile(s) to travel.
 *
 *     Wait For Projectile?:
 *     - Wait for projectile(s) to reach their destination before going onto
 *       the next command?
 * 
 *     Wait For Animation?:
 *     - Wait for animation to finish before going to the next command?
 *
 *     Extra Settings:
 *     - Add extra settings to the projectile?
 *
 *       Auto Angle?:
 *       - Automatically angle the projectile to tilt the direction
 *         it's moving?
 *
 *       Angle Offset:
 *       - Alter the projectile's tilt by this many degrees.
 *
 *       Arc Peak:
 *       - This is the height of the project's trajectory arc in pixels.
 *
 *       Easing:
 *       - Select which easing type to apply to the projectile's trajectory.
 *
 *       Spin Speed:
 *       - Determine how much angle the projectile spins per frame.
 *       - Does not work well with "Auto Angle".
 * 
 *     Effect Emulation:
 * 
 *       Action Effect?:
 *       - Emulate current Action Effect when projectile reaches target?
 *       - Only works with start and goal targets.
 * 
 *       Item Effect ID?:
 *       - Emulate an Item Effect when projectile reaches target?
 *       - Use 0 to not use.
 *       - Only works with start and goal targets.
 * 
 *       Skill Effect ID?:
 *       - Emulate a Skill Effect when projectile reaches target?
 *       - Use 0 to not use.
 *       - Only works with start and goal targets.
 * 
 *       Common Event ID:
 *       - Plays a Once Parallel Common Event upon reaching target.
 *       - Use 0 to not use.
 *       - Works regardless of start/goal targets.
 * 
 *     End Animation ID:
 *     - Plays an animation when projectile reaches target.
 *     - Use 0 to not use.
 *     - Requires VisuMZ_1_BattleCore v1.86+.
 *     - Requires VisuMZ_3_ActSeqProjectiles v1.09+.
 * 
 *       Mirror Animation:
 *       - Mirror the effect animation?
 *       - Requires VisuMZ_1_BattleCore v1.86+.
 *       - Requires VisuMZ_3_ActSeqProjectiles version 1.09+.
 * 
 *       Mute Animation:
 *       - Mute the effect animation?
 *       - Requires VisuMZ_1_BattleCore v1.86+.
 *       - Requires VisuMZ_3_ActSeqProjectiles version 1.09+.
 *
 * ---
 *
 * PROJECTILE: Icon
 * - Create an icon projectile and fire it at a target.
 * - Requires VisuMZ_3_ActSeqProjectiles!
 *
 *   Coordinates:
 *
 *     Start Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should start from.
 *         - Target - Start from battler target(s)
 *         - Point - Start from a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) to start the projectile from.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 * 
 *           Target Location:
 *           - Select which part of the target to send the projectile from.
 *           - front head
 *           - front center
 *           - front base
 *           - middle head
 *           - middle center
 *           - middle base
 *           - back head
 *           - back center
 *           - back base
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to start the projectile at.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *     Goal Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should go to.
 *         - Target - Goal is battler target(s)
 *         - Point - Goal is a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) for projectile to go to.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 * 
 *           Target Location:
 *           - Select which part of the target to send the projectile to.
 *           - front head
 *           - front center
 *           - front base
 *           - middle head
 *           - middle center
 *           - middle base
 *           - back head
 *           - back center
 *           - back base
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to send the projectile to.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *   Settings:
 *
 *     Icon:
 *     - Determine which icon to use as a projectile.
 *
 *     Duration:
 *     - Duration for the projectile(s) to travel.
 *
 *     Wait For Projectile?:
 *     - Wait for projectile(s) to reach their destination before going onto
 *       the next command?
 *
 *     Extra Settings:
 *     - Add extra settings to the projectile?
 *
 *       Auto Angle?:
 *       - Automatically angle the projectile to tilt the direction
 *         it's moving?
 *
 *       Angle Offset:
 *       - Alter the projectile's tilt by this many degrees.
 *
 *       Arc Peak:
 *       - This is the height of the project's trajectory arc in pixels.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the projectile?
 *         - Normal
 *         - Additive
 *         - Multiply
 *         - Screen
 *
 *       Easing:
 *       - Select which easing type to apply to the projectile's trajectory.
 *
 *       Hue:
 *       - Adjust the hue of the projectile.
 *       - Insert a number between 0 and 360.
 *
 *       Scale:
 *       - Adjust the size scaling of the projectile.
 *       - Use decimals for exact control.
 *
 *       Spin Speed:
 *       - Determine how much angle the projectile spins per frame.
 *       - Does not work well with "Auto Angle".
 * 
 *     Effect Emulation:
 * 
 *       Action Effect?:
 *       - Emulate current Action Effect when projectile reaches target?
 *       - Only works with start and goal targets.
 * 
 *       Item Effect ID?:
 *       - Emulate an Item Effect when projectile reaches target?
 *       - Use 0 to not use.
 *       - Only works with start and goal targets.
 * 
 *       Skill Effect ID?:
 *       - Emulate a Skill Effect when projectile reaches target?
 *       - Use 0 to not use.
 *       - Only works with start and goal targets.
 * 
 *       Common Event ID:
 *       - Plays a Once Parallel Common Event upon reaching target.
 *       - Use 0 to not use.
 *       - Works regardless of start/goal targets.
 * 
 *     End Animation ID:
 *     - Plays an animation when projectile reaches target.
 *     - Use 0 to not use.
 *     - Requires VisuMZ_1_BattleCore v1.86+.
 *     - Requires VisuMZ_3_ActSeqProjectiles v1.09+.
 * 
 *       Mirror Animation:
 *       - Mirror the effect animation?
 *       - Requires VisuMZ_1_BattleCore v1.86+.
 *       - Requires VisuMZ_3_ActSeqProjectiles version 1.09+.
 * 
 *       Mute Animation:
 *       - Mute the effect animation?
 *       - Requires VisuMZ_1_BattleCore v1.86+.
 *       - Requires VisuMZ_3_ActSeqProjectiles version 1.09+.
 *
 * ---
 *
 * PROJECTILE: Picture
 * - Create a picture projectile and fire it at a target.
 * - Requires VisuMZ_3_ActSeqProjectiles!
 *
 *   Coordinates:
 *
 *     Start Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should start from.
 *         - Target - Start from battler target(s)
 *         - Point - Start from a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) to start the projectile from.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 * 
 *           Target Location:
 *           - Select which part of the target to send the projectile from.
 *           - front head
 *           - front center
 *           - front base
 *           - middle head
 *           - middle center
 *           - middle base
 *           - back head
 *           - back center
 *           - back base
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to start the projectile at.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *     Goal Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should go to.
 *         - Target - Goal is battler target(s)
 *         - Point - Goal is a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) for projectile to go to.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 * 
 *           Target Location:
 *           - Select which part of the target to send the projectile to.
 *           - front head
 *           - front center
 *           - front base
 *           - middle head
 *           - middle center
 *           - middle base
 *           - back head
 *           - back center
 *           - back base
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to send the projectile to.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *   Settings:
 *
 *     Picture Filename:
 *     - Determine which picture to use as a projectile.
 *
 *     Duration:
 *     - Duration for the projectile(s) to travel.
 *
 *     Wait For Projectile?:
 *     - Wait for projectile(s) to reach their destination before going onto
 *       the next command?
 *
 *     Extra Settings:
 *     - Add extra settings to the projectile?
 *
 *       Auto Angle?:
 *       - Automatically angle the projectile to tilt the direction
 *         it's moving?
 *
 *       Angle Offset:
 *       - Alter the projectile's tilt by this many degrees.
 *
 *       Arc Peak:
 *       - This is the height of the project's trajectory arc in pixels.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the projectile?
 *         - Normal
 *         - Additive
 *         - Multiply
 *         - Screen
 *
 *       Easing:
 *       - Select which easing type to apply to the projectile's trajectory.
 *
 *       Hue:
 *       - Adjust the hue of the projectile.
 *       - Insert a number between 0 and 360.
 *
 *       Scale:
 *       - Adjust the size scaling of the projectile.
 *       - Use decimals for exact control.
 *
 *       Spin Speed:
 *       - Determine how much angle the projectile spins per frame.
 *       - Does not work well with "Auto Angle".
 * 
 *     Effect Emulation:
 * 
 *       Action Effect?:
 *       - Emulate current Action Effect when projectile reaches target?
 *       - Only works with start and goal targets.
 * 
 *       Item Effect ID?:
 *       - Emulate an Item Effect when projectile reaches target?
 *       - Use 0 to not use.
 *       - Only works with start and goal targets.
 * 
 *       Skill Effect ID?:
 *       - Emulate a Skill Effect when projectile reaches target?
 *       - Use 0 to not use.
 *       - Only works with start and goal targets.
 * 
 *       Common Event ID:
 *       - Plays a Once Parallel Common Event upon reaching target.
 *       - Use 0 to not use.
 *       - Works regardless of start/goal targets.
 * 
 *     End Animation ID:
 *     - Plays an animation when projectile reaches target.
 *     - Use 0 to not use.
 *     - Requires VisuMZ_1_BattleCore v1.86+.
 *     - Requires VisuMZ_3_ActSeqProjectiles v1.09+.
 * 
 *       Mirror Animation:
 *       - Mirror the effect animation?
 *       - Requires VisuMZ_1_BattleCore v1.86+.
 *       - Requires VisuMZ_3_ActSeqProjectiles version 1.09+.
 * 
 *       Mute Animation:
 *       - Mute the effect animation?
 *       - Requires VisuMZ_1_BattleCore v1.86+.
 *       - Requires VisuMZ_3_ActSeqProjectiles version 1.09+.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Angle Adjustment Settings
 * ============================================================================
 *
 * These settings are primarily used to automatically adjust the angle of any
 * pictures, icon, and/or animation so that they work with the automatic
 * angling of the projectiles as to always appear aimed at the goal point.
 *
 * ---
 *
 * Angle Adjustments
 * 
 *   Animation Angle:
 *   - Adjust projectile angle for animations by this many degrees.
 * 
 *   Icon Angle:
 *   - Adjust projectile angle for icons by this many degrees.
 * 
 *   Picture Angle:
 *   - Adjust projectile angle for pictures by this many degrees.
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
 * Version 1.09: January 16, 2025
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added new Action Sequence Projectile settings:
 * *** Extra Settings > End Animation ID:
 * **** Plays an animation when projectile reaches target.
 * **** Requires Battle Core version 1.86+.
 * 
 * Version 1.08: January 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Parameters added for Action Sequences by Olivia:
 * ** Extra Effects > Effect Emulation
 * *** Extra Effects > Effect Emulation > Action Effect
 * *** Extra Effects > Effect Emulation > Item Effect ID
 * *** Extra Effects > Effect Emulation > Skill Effect ID
 * **** Emulate current Action Effect, a specific Item Effect, or a specific
 *      Skill Effect when projectile reaches target?
 * **** Only works with start and goal targets.
 * *** Extra Effects > Effect Emulation > Common Event ID
 * **** Plays a Once Parallel Common Event upon reaching target.
 * **** Works regardless of start and goal targets.
 * 
 * Version 1.07: August 17, 2023
 * * Compatibility Update!
 * ** Added better compatibility with Action Sequence Camera when using MV
 *    animations for projectiles. Update made by Arisu.
 * 
 * Version 1.06: July 13, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.05: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Updated Feature!
 * ** Updated Plugin Command "PROJECTILE: Animation" by Arisu!
 * *** New Parameter: Wait For Animation?
 * **** Wait for animation to finish before going to the next command?
 * 
 * Version 1.04: April 30, 2021
 * * Bug Fixes!
 * ** Added fail safe for older versions of the projectile plugin commands that
 *    have not been updated. Fix made by Yanfly.
 * 
 * Version 1.03: April 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** "Start Location" and "Goal Location" now have "Target Location" parameter
 *    to determine which part of the target's body to send the projectile from
 *    or towards. Added by Olivia.
 * ** Requires VisuMZ_1_BattleCore version 1.34 to have affect.
 * 
 * Version 1.02: January 22, 2021
 * * Bug Fixes!
 * ** Projectile start locations and end locations now factor in a target's
 *    additional Y position from jumping and/or floating. Fix made by Irina.
 * 
 * Version 1.01: December 25, 2020
 * * Bug Fixes!
 * ** Settings are no longer cached and are now independent for one another.
 *    Fix made by Yanfly.
 *
 * Version 1.00: January 13, 2021
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
 * @param ActSeqProjectiles
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param AngleAdjustments
 * @text Angle Adjustments
 *
 * @param AnimationAngleAdjust:num
 * @text Animation Angle
 * @parent AngleAdjustments
 * @desc Adjust projectile angle for animations by this many degrees.
 * @default 225
 *
 * @param IconAngleAdjust:num
 * @text Icon Angle
 * @parent AngleAdjustments
 * @desc Adjust projectile angle for icons by this many degrees.
 * @default 135
 *
 * @param PictureAngleAdjust:num
 * @text Picture Angle
 * @parent AngleAdjustments
 * @desc Adjust projectile angle for pictures by this many degrees.
 * @default 135
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
//=============================================================================

const _0x33f798=_0x5f50;(function(_0x185c20,_0x378015){const _0x58062c=_0x5f50,_0x323a38=_0x185c20();while(!![]){try{const _0x163420=-parseInt(_0x58062c(0x1d8))/0x1+-parseInt(_0x58062c(0x198))/0x2+-parseInt(_0x58062c(0x1bd))/0x3*(-parseInt(_0x58062c(0x204))/0x4)+-parseInt(_0x58062c(0x1f9))/0x5*(parseInt(_0x58062c(0x196))/0x6)+-parseInt(_0x58062c(0x17e))/0x7+parseInt(_0x58062c(0x185))/0x8*(parseInt(_0x58062c(0x160))/0x9)+parseInt(_0x58062c(0x1b2))/0xa;if(_0x163420===_0x378015)break;else _0x323a38['push'](_0x323a38['shift']());}catch(_0x548e08){_0x323a38['push'](_0x323a38['shift']());}}}(_0x2b74,0xbc4d1));var label=_0x33f798(0x15b),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x33f798(0x1c8)](function(_0x43ab34){const _0x4e8f03=_0x33f798;return _0x43ab34['status']&&_0x43ab34[_0x4e8f03(0x1c5)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x33f798(0x1dc)]=VisuMZ[label][_0x33f798(0x1dc)]||{},VisuMZ[_0x33f798(0x135)]=function(_0x521759,_0x22b5b7){const _0x4ff675=_0x33f798;for(const _0x2731cd in _0x22b5b7){if(_0x2731cd[_0x4ff675(0x1bc)](/(.*):(.*)/i)){const _0x18bde6=String(RegExp['$1']),_0x2854d7=String(RegExp['$2'])['toUpperCase']()[_0x4ff675(0x1ab)]();let _0x2a2742,_0x354c67,_0x4976cc;switch(_0x2854d7){case _0x4ff675(0x1ea):_0x2a2742=_0x22b5b7[_0x2731cd]!==''?Number(_0x22b5b7[_0x2731cd]):0x0;break;case _0x4ff675(0x1b0):_0x354c67=_0x22b5b7[_0x2731cd]!==''?JSON[_0x4ff675(0x182)](_0x22b5b7[_0x2731cd]):[],_0x2a2742=_0x354c67[_0x4ff675(0x1c1)](_0x40dc46=>Number(_0x40dc46));break;case _0x4ff675(0x1ff):_0x2a2742=_0x22b5b7[_0x2731cd]!==''?eval(_0x22b5b7[_0x2731cd]):null;break;case _0x4ff675(0x1b3):_0x354c67=_0x22b5b7[_0x2731cd]!==''?JSON['parse'](_0x22b5b7[_0x2731cd]):[],_0x2a2742=_0x354c67[_0x4ff675(0x1c1)](_0x43f3ae=>eval(_0x43f3ae));break;case _0x4ff675(0x1cc):_0x2a2742=_0x22b5b7[_0x2731cd]!==''?JSON[_0x4ff675(0x182)](_0x22b5b7[_0x2731cd]):'';break;case _0x4ff675(0x149):_0x354c67=_0x22b5b7[_0x2731cd]!==''?JSON[_0x4ff675(0x182)](_0x22b5b7[_0x2731cd]):[],_0x2a2742=_0x354c67['map'](_0x2cae94=>JSON[_0x4ff675(0x182)](_0x2cae94));break;case _0x4ff675(0x1e5):_0x2a2742=_0x22b5b7[_0x2731cd]!==''?new Function(JSON[_0x4ff675(0x182)](_0x22b5b7[_0x2731cd])):new Function(_0x4ff675(0x1a3));break;case _0x4ff675(0x1e4):_0x354c67=_0x22b5b7[_0x2731cd]!==''?JSON[_0x4ff675(0x182)](_0x22b5b7[_0x2731cd]):[],_0x2a2742=_0x354c67[_0x4ff675(0x1c1)](_0x1a7644=>new Function(JSON[_0x4ff675(0x182)](_0x1a7644)));break;case'STR':_0x2a2742=_0x22b5b7[_0x2731cd]!==''?String(_0x22b5b7[_0x2731cd]):'';break;case _0x4ff675(0x1da):_0x354c67=_0x22b5b7[_0x2731cd]!==''?JSON[_0x4ff675(0x182)](_0x22b5b7[_0x2731cd]):[],_0x2a2742=_0x354c67[_0x4ff675(0x1c1)](_0xd318f0=>String(_0xd318f0));break;case _0x4ff675(0x187):_0x4976cc=_0x22b5b7[_0x2731cd]!==''?JSON[_0x4ff675(0x182)](_0x22b5b7[_0x2731cd]):{},_0x2a2742=VisuMZ[_0x4ff675(0x135)]({},_0x4976cc);break;case _0x4ff675(0x1de):_0x354c67=_0x22b5b7[_0x2731cd]!==''?JSON[_0x4ff675(0x182)](_0x22b5b7[_0x2731cd]):[],_0x2a2742=_0x354c67[_0x4ff675(0x1c1)](_0x441b78=>VisuMZ['ConvertParams']({},JSON[_0x4ff675(0x182)](_0x441b78)));break;default:continue;}_0x521759[_0x18bde6]=_0x2a2742;}}return _0x521759;},(_0x18afbf=>{const _0xe854e5=_0x33f798,_0x23c3dd=_0x18afbf[_0xe854e5(0x16b)];for(const _0x1befe4 of dependencies){if(!Imported[_0x1befe4]){alert(_0xe854e5(0x173)[_0xe854e5(0x19a)](_0x23c3dd,_0x1befe4)),SceneManager[_0xe854e5(0x1f6)]();break;}}const _0x1c948c=_0x18afbf[_0xe854e5(0x1c5)];if(_0x1c948c[_0xe854e5(0x1bc)](/\[Version[ ](.*?)\]/i)){const _0x3f8326=Number(RegExp['$1']);_0x3f8326!==VisuMZ[label][_0xe854e5(0x190)]&&(alert(_0xe854e5(0x1e2)[_0xe854e5(0x19a)](_0x23c3dd,_0x3f8326)),SceneManager[_0xe854e5(0x1f6)]());}if(_0x1c948c[_0xe854e5(0x1bc)](/\[Tier[ ](\d+)\]/i)){const _0x48b171=Number(RegExp['$1']);_0x48b171<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0xe854e5(0x19a)](_0x23c3dd,_0x48b171,tier)),SceneManager[_0xe854e5(0x1f6)]()):tier=Math['max'](_0x48b171,tier);}VisuMZ[_0xe854e5(0x135)](VisuMZ[label][_0xe854e5(0x1dc)],_0x18afbf[_0xe854e5(0x133)]);})(pluginData),VisuMZ[_0x33f798(0x15b)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x33f798(0x167)][_0x33f798(0x183)],Scene_Boot[_0x33f798(0x167)][_0x33f798(0x183)]=function(){const _0x3d56ad=_0x33f798;VisuMZ[_0x3d56ad(0x15b)][_0x3d56ad(0x1d7)][_0x3d56ad(0x181)](this),VisuMZ['ActSeqProjectiles'][_0x3d56ad(0x1ee)]();},VisuMZ[_0x33f798(0x15b)][_0x33f798(0x1ee)]=function(){const _0x16879c=_0x33f798;if(VisuMZ['CoreEngine']['version']<1.8){let _0x4aa664='';_0x4aa664+=_0x16879c(0x1d5),_0x4aa664+=_0x16879c(0x163),alert(_0x4aa664),SceneManager['exit']();}if(Imported[_0x16879c(0x193)]&&VisuMZ[_0x16879c(0x1a4)][_0x16879c(0x190)]<1.12){let _0x40b4f4='';_0x40b4f4+=_0x16879c(0x1cd),_0x40b4f4+=_0x16879c(0x163),alert(_0x40b4f4),SceneManager['exit']();}},VisuMZ[_0x33f798(0x15b)][_0x33f798(0x1f3)]=Game_Temp[_0x33f798(0x167)][_0x33f798(0x1af)],Game_Temp[_0x33f798(0x167)][_0x33f798(0x1af)]=function(){const _0x38957e=_0x33f798;VisuMZ[_0x38957e(0x15b)]['Game_Temp_initialize'][_0x38957e(0x181)](this),this[_0x38957e(0x170)]();},Game_Temp['prototype']['createActSeqProjectilesAnimationQueue']=function(){this['_ActSeqProjectilesAnimationQueue']=[];},Game_Temp[_0x33f798(0x167)][_0x33f798(0x155)]=function(_0x379cc1,_0x17d8c9,_0x3407d6,_0x1dbc4e){const _0x33a6af=_0x33f798;_0x3407d6=_0x3407d6||![],_0x1dbc4e=_0x1dbc4e||![];if($dataAnimations[_0x17d8c9]){const _0x56d318={'targets':_0x379cc1,'animationId':_0x17d8c9,'mirror':_0x3407d6,'mute':_0x1dbc4e};this[_0x33a6af(0x1b8)][_0x33a6af(0x12e)](_0x56d318);for(const _0x1d80cc of _0x379cc1){_0x1d80cc[_0x33a6af(0x205)]&&_0x1d80cc[_0x33a6af(0x205)]();}}},Game_Temp[_0x33f798(0x167)][_0x33f798(0x132)]=function(){const _0x263e68=_0x33f798;return this['_ActSeqProjectilesAnimationQueue'][_0x263e68(0x16d)]();},Sprite_Animation[_0x33f798(0x167)][_0x33f798(0x1e3)]=function(_0xc2bb98){const _0x428b92=_0x33f798;this[_0x428b92(0x17f)]=_0xc2bb98;},Sprite_Animation[_0x33f798(0x167)][_0x33f798(0x1ae)]=function(_0x4c093a){this['_isProjectile']=_0x4c093a;},VisuMZ[_0x33f798(0x15b)][_0x33f798(0x17c)]=Sprite_Animation[_0x33f798(0x167)][_0x33f798(0x1d6)],Sprite_Animation['prototype']['processSoundTimings']=function(){const _0x454a72=_0x33f798;if(this[_0x454a72(0x17f)])return;VisuMZ[_0x454a72(0x15b)][_0x454a72(0x17c)]['call'](this);},VisuMZ[_0x33f798(0x15b)][_0x33f798(0x206)]=Sprite_Animation[_0x33f798(0x167)]['updateEffectGeometry'],Sprite_Animation['prototype'][_0x33f798(0x139)]=function(){const _0x28c0b8=_0x33f798;VisuMZ[_0x28c0b8(0x15b)][_0x28c0b8(0x206)][_0x28c0b8(0x181)](this),this[_0x28c0b8(0x1f5)]!==undefined&&this['applyProjectileAngle'](this['_adjustedProjectileRadians']);},Sprite_Animation[_0x33f798(0x167)][_0x33f798(0x1a5)]=function(_0x404f98){const _0x7f45fe=_0x33f798,_0x37d0ef=this['_animation'][_0x7f45fe(0x19d)]/0x64,_0x170a96=Math['PI']/0xb4,_0x10801e=this[_0x7f45fe(0x20a)][_0x7f45fe(0x1d4)]['x']*_0x170a96,_0x32ed7b=this[_0x7f45fe(0x20a)][_0x7f45fe(0x1d4)]['y']*_0x170a96,_0x4fc223=this['_animation'][_0x7f45fe(0x1d4)]['z']*_0x170a96-_0x404f98;this[_0x7f45fe(0x1e9)]&&this[_0x7f45fe(0x1e9)]['setRotation'](_0x10801e,_0x32ed7b,_0x4fc223);},Sprite_AnimationMV[_0x33f798(0x167)][_0x33f798(0x1e3)]=function(_0x259ec9){const _0xe126f1=_0x33f798;this[_0xe126f1(0x17f)]=_0x259ec9;},Sprite_AnimationMV['prototype'][_0x33f798(0x1ae)]=function(_0x1f92db){const _0x27b732=_0x33f798;this[_0x27b732(0x130)]=_0x1f92db;},VisuMZ[_0x33f798(0x15b)][_0x33f798(0x13d)]=Sprite_AnimationMV['prototype'][_0x33f798(0x14e)],Sprite_AnimationMV[_0x33f798(0x167)][_0x33f798(0x14e)]=function(_0x1bd6bf){const _0x43b24f=_0x33f798;this['_muteSound']&&(_0x1bd6bf=JsonEx[_0x43b24f(0x157)](_0x1bd6bf),_0x1bd6bf['se']&&(_0x1bd6bf['se'][_0x43b24f(0x1f2)]=0x0)),VisuMZ[_0x43b24f(0x15b)][_0x43b24f(0x13d)][_0x43b24f(0x181)](this,_0x1bd6bf);},VisuMZ[_0x33f798(0x15b)][_0x33f798(0x1eb)]=Sprite_AnimationMV['prototype'][_0x33f798(0x165)],Sprite_AnimationMV[_0x33f798(0x167)][_0x33f798(0x165)]=function(){const _0x1a2dad=_0x33f798;VisuMZ[_0x1a2dad(0x15b)][_0x1a2dad(0x1eb)][_0x1a2dad(0x181)](this),this[_0x1a2dad(0x1f5)]!==undefined&&(this['rotation']=this[_0x1a2dad(0x1f5)]);},VisuMZ[_0x33f798(0x15b)][_0x33f798(0x148)]=Spriteset_Base['prototype'][_0x33f798(0x1af)],Spriteset_Base[_0x33f798(0x167)][_0x33f798(0x1af)]=function(){const _0x334e47=_0x33f798;VisuMZ[_0x334e47(0x15b)]['Spriteset_Base_initialize'][_0x334e47(0x181)](this),this[_0x334e47(0x1c2)]=[];},VisuMZ[_0x33f798(0x15b)][_0x33f798(0x16f)]=Spriteset_Base[_0x33f798(0x167)][_0x33f798(0x1fc)],Spriteset_Base['prototype'][_0x33f798(0x1fc)]=function(_0x23535f){const _0x3a9e42=_0x33f798;this[_0x3a9e42(0x146)](),VisuMZ[_0x3a9e42(0x15b)][_0x3a9e42(0x16f)][_0x3a9e42(0x181)](this,_0x23535f);},VisuMZ[_0x33f798(0x15b)][_0x33f798(0x197)]=Spriteset_Base[_0x33f798(0x167)][_0x33f798(0x165)],Spriteset_Base['prototype'][_0x33f798(0x165)]=function(){const _0x1e43da=_0x33f798;VisuMZ[_0x1e43da(0x15b)][_0x1e43da(0x197)][_0x1e43da(0x181)](this),this[_0x1e43da(0x1d0)]();},Spriteset_Base[_0x33f798(0x167)][_0x33f798(0x1d0)]=function(){const _0xe782f9=_0x33f798;for(const _0x11b9b4 of this['_ActSeqProjectilesAnimationSprites']){if(_0x11b9b4[_0xe782f9(0x1ca)])continue;!_0x11b9b4[_0xe782f9(0x178)]()&&this[_0xe782f9(0x154)](_0x11b9b4);}this[_0xe782f9(0x16c)]();},Spriteset_Base[_0x33f798(0x167)][_0x33f798(0x16c)]=function(){const _0x5a00b0=_0x33f798;for(;;){const _0x3cdcfb=$gameTemp[_0x5a00b0(0x132)]();if(_0x3cdcfb)this[_0x5a00b0(0x169)](_0x3cdcfb);else break;}},Spriteset_Base[_0x33f798(0x167)][_0x33f798(0x169)]=function(_0x2df0ca){const _0x58d4f3=_0x33f798,_0x60e3b9=$dataAnimations[_0x2df0ca['animationId']],_0x36ed9d=_0x2df0ca[_0x58d4f3(0x1ef)],_0x2f982c=_0x2df0ca[_0x58d4f3(0x188)],_0x1e0775=_0x2df0ca['mute'];let _0x53b795=this[_0x58d4f3(0x1aa)]();const _0x4b2ff7=this[_0x58d4f3(0x1bf)]();if(this[_0x58d4f3(0x1a7)](_0x60e3b9))for(const _0x5a3cfa of _0x36ed9d){this[_0x58d4f3(0x201)]([_0x5a3cfa],_0x60e3b9,_0x2f982c,_0x53b795,_0x1e0775),_0x53b795+=_0x4b2ff7;}else this[_0x58d4f3(0x201)](_0x36ed9d,_0x60e3b9,_0x2f982c,_0x53b795);},Spriteset_Base[_0x33f798(0x167)][_0x33f798(0x201)]=function(_0x1e8a46,_0x49ebc5,_0x31f17d,_0x3b0e3f,_0x1fe284){const _0x43ce16=_0x33f798,_0x5544db=this[_0x43ce16(0x14d)](_0x49ebc5),_0x2019f7=new(_0x5544db?Sprite_AnimationMV:Sprite_Animation)();_0x2019f7[_0x43ce16(0x1ae)](!![]);const _0x24a936=_0x1e8a46;return this[_0x43ce16(0x14c)](_0x1e8a46[0x0])&&(_0x31f17d=!_0x31f17d),_0x2019f7[_0x43ce16(0x18e)]=_0x1e8a46,_0x2019f7[_0x43ce16(0x1cb)](_0x24a936,_0x49ebc5,_0x31f17d,_0x3b0e3f),_0x2019f7['setMute'](_0x1fe284),this[_0x43ce16(0x161)]['addChild'](_0x2019f7),this['_ActSeqProjectilesAnimationSprites'][_0x43ce16(0x12e)](_0x2019f7),_0x2019f7;},Spriteset_Base[_0x33f798(0x167)][_0x33f798(0x154)]=function(_0x247e68){const _0x2bf15f=_0x33f798;if(!_0x247e68)return;const _0xc7501a=_0x247e68['_targets'],_0x4c5e88=_0x247e68[_0x2bf15f(0x20a)],_0x2a2712=_0x247e68[_0x2bf15f(0x131)],_0x186737=0x0,_0x100054=_0x247e68[_0x2bf15f(0x17f)];this[_0x2bf15f(0x1ad)](_0x247e68);const _0x13f29b=this['createActSeqProjectilesAnimationSprite'](_0xc7501a,_0x4c5e88,_0x2a2712,_0x186737,_0x100054);for(const _0x17643f of _0xc7501a){_0x17643f&&(_0x17643f[_0x2bf15f(0x17d)]=_0x13f29b);}},Spriteset_Base[_0x33f798(0x167)][_0x33f798(0x1ad)]=function(_0x259419){const _0x5e10aa=_0x33f798;this[_0x5e10aa(0x1c2)]['remove'](_0x259419),this[_0x5e10aa(0x161)][_0x5e10aa(0x1fb)](_0x259419);for(const _0x156c9d of _0x259419[_0x5e10aa(0x18e)]){_0x156c9d[_0x5e10aa(0x1e7)]&&_0x156c9d[_0x5e10aa(0x1e7)]();}_0x259419[_0x5e10aa(0x1fc)]();},Spriteset_Base['prototype'][_0x33f798(0x146)]=function(){const _0x4c7609=_0x33f798;for(const _0x3cfa85 of this[_0x4c7609(0x1c2)]){this[_0x4c7609(0x1ad)](_0x3cfa85);}},Spriteset_Base[_0x33f798(0x167)][_0x33f798(0x15c)]=function(){const _0x508203=_0x33f798;return this['_ActSeqProjectilesAnimationSprites'][_0x508203(0x1f0)]>0x0;},VisuMZ[_0x33f798(0x15b)][_0x33f798(0x1c4)]=Spriteset_Battle[_0x33f798(0x167)][_0x33f798(0x203)],Spriteset_Battle[_0x33f798(0x167)][_0x33f798(0x203)]=function(){const _0x26ca2d=_0x33f798;VisuMZ[_0x26ca2d(0x15b)]['Spriteset_Battle_createBattleFieldContainer'][_0x26ca2d(0x181)](this),this['_projectilesContainer']=new Sprite(),this[_0x26ca2d(0x191)][_0x26ca2d(0x194)](this[_0x26ca2d(0x18f)]);},VisuMZ['ActSeqProjectiles']['Spriteset_Battle_adjustFlippedBattlefield']=Spriteset_Battle[_0x33f798(0x167)][_0x33f798(0x1cf)],Spriteset_Battle[_0x33f798(0x167)][_0x33f798(0x1cf)]=function(){const _0x45cd18=_0x33f798;VisuMZ[_0x45cd18(0x15b)]['Spriteset_Battle_adjustFlippedBattlefield'][_0x45cd18(0x181)](this),this[_0x45cd18(0x18f)]&&this[_0x45cd18(0x141)]&&(this['_projectilesContainer'][_0x45cd18(0x19d)]['x']=this[_0x45cd18(0x141)][_0x45cd18(0x19d)]['x'],this['_projectilesContainer'][_0x45cd18(0x19d)]['y']=this[_0x45cd18(0x141)][_0x45cd18(0x19d)]['y'],this[_0x45cd18(0x18f)]['x']=this[_0x45cd18(0x141)]['x'],this[_0x45cd18(0x18f)]['y']=this['_battlerContainer']['y']);},Spriteset_Battle['prototype'][_0x33f798(0x1c6)]=function(_0x2947fe){const _0x17f7e7=_0x33f798;if(!_0x2947fe)return;_0x2947fe=JsonEx[_0x17f7e7(0x157)](_0x2947fe);Imported[_0x17f7e7(0x18b)]&&this[_0x17f7e7(0x209)](_0x2947fe);const _0x1f0dd5=[],_0xe2c287=[];VisuMZ['ActSeqProjectiles'][_0x17f7e7(0x159)](_0x1f0dd5,_0x2947fe[_0x17f7e7(0x18c)]),VisuMZ[_0x17f7e7(0x15b)][_0x17f7e7(0x159)](_0xe2c287,_0x2947fe[_0x17f7e7(0x1d1)]);const _0x2685bc=VisuMZ[_0x17f7e7(0x152)](_0x2947fe[_0x17f7e7(0x18c)]['Type']===_0x17f7e7(0x1a6)?_0x2947fe[_0x17f7e7(0x18c)][_0x17f7e7(0x19f)]:[]),_0x3288ce=VisuMZ['CreateActionSequenceTargets'](_0x2947fe['Goal'][_0x17f7e7(0x192)]===_0x17f7e7(0x1a6)?_0x2947fe[_0x17f7e7(0x1d1)][_0x17f7e7(0x19f)]:[]),_0x4fecef=this['_projectilesContainer'];let _0x14397c=0x0;for(const _0x47cd6c of _0x1f0dd5){let _0xd01af=0x0;for(const _0x11631f of _0xe2c287){const _0x5085fe=new Sprite_Projectile(_0x2947fe,_0x47cd6c,_0x11631f);_0x5085fe[_0x17f7e7(0x134)](_0x2685bc[_0x14397c],_0x3288ce[_0xd01af]),_0x4fecef[_0x17f7e7(0x194)](_0x5085fe),_0xd01af++;}_0x14397c++;}},VisuMZ['ActSeqProjectiles'][_0x33f798(0x159)]=function(_0x4b7b93,_0x31ef52){const _0x19b345=_0x33f798,_0xacfe57=_0x31ef52[_0x19b345(0x192)],_0x1418c6=_0x31ef52[_0x19b345(0x138)],_0x3a30e0=_0x31ef52[_0x19b345(0x13b)];_0xacfe57===_0x19b345(0x1b1)&&_0x4b7b93[_0x19b345(0x12e)](new Point(_0x31ef52[_0x19b345(0x18d)]+_0x1418c6,_0x31ef52[_0x19b345(0x1ba)]+_0x3a30e0));if(_0xacfe57===_0x19b345(0x1a6)){const _0x57dbba=VisuMZ[_0x19b345(0x152)](_0x31ef52[_0x19b345(0x19f)]),_0x4b21d9=_0x57dbba[_0x19b345(0x1c8)](_0xbaf394=>_0xbaf394&&_0xbaf394['battler']())[_0x19b345(0x1c1)](_0x4cebb8=>VisuMZ['ActSeqProjectiles']['CreateTargetCoordinates'](_0x4cebb8,_0x31ef52));if(!_0x4b21d9)return;if(_0x31ef52['TargetCenter']){const _0x3d230c=_0x4b21d9[_0x19b345(0x1f0)]||0x1;let _0x116507=0x0,_0x4bf849=0x0;for(const _0x55b793 of _0x4b21d9){_0x116507+=_0x55b793[0x0],_0x4bf849+=_0x55b793[0x1];}_0x116507/=_0x3d230c,_0x4bf849/=_0x3d230c,_0x4b7b93[_0x19b345(0x12e)](new Point(Math[_0x19b345(0x1a0)](_0x116507+_0x1418c6),Math[_0x19b345(0x1a0)](_0x4bf849+_0x3a30e0)));}else for(const _0x376c62 of _0x4b21d9){_0x4b7b93[_0x19b345(0x12e)](new Point(Math[_0x19b345(0x1a0)](_0x376c62[0x0]+_0x1418c6),Math[_0x19b345(0x1a0)](_0x376c62[0x1]+_0x3a30e0)));}}},VisuMZ[_0x33f798(0x15b)][_0x33f798(0x1c3)]=function(_0x4d2800,_0x578590){const _0x17bbe8=_0x33f798;let _0x307014=_0x17bbe8(0x1df);_0x578590&&(_0x578590[_0x17bbe8(0x1c0)]=_0x578590[_0x17bbe8(0x1c0)]||_0x17bbe8(0x1df),_0x307014=_0x578590[_0x17bbe8(0x1c0)][_0x17bbe8(0x200)]());let _0x451788=_0x4d2800[_0x17bbe8(0x1b9)]()[_0x17bbe8(0x1d3)];if(_0x307014[_0x17bbe8(0x19c)]('front'))_0x451788+=(_0x4d2800[_0x17bbe8(0x13c)]()?-0x1:0x1)*_0x4d2800[_0x17bbe8(0x1b9)]()['width']/0x2;else _0x307014['includes'](_0x17bbe8(0x1bb))&&(_0x451788+=(_0x4d2800[_0x17bbe8(0x13c)]()?0x1:-0x1)*_0x4d2800[_0x17bbe8(0x1b9)]()[_0x17bbe8(0x1dd)]/0x2);let _0x28a924=_0x4d2800[_0x17bbe8(0x1b9)]()[_0x17bbe8(0x166)];_0x28a924+=_0x4d2800[_0x17bbe8(0x1b9)]()[_0x17bbe8(0x140)]();if(_0x307014[_0x17bbe8(0x19c)]('center'))_0x28a924-=_0x4d2800[_0x17bbe8(0x1b9)]()[_0x17bbe8(0x1ce)]/0x2;else _0x307014['includes']('head')&&(_0x28a924-=_0x4d2800['battler']()[_0x17bbe8(0x1ce)]);if(!$gameSystem[_0x17bbe8(0x164)]()&&_0x4d2800[_0x17bbe8(0x13c)]()){const _0x1a95af=SceneManager['_scene'][_0x17bbe8(0x180)],_0x2fe98b=SceneManager['_scene'][_0x17bbe8(0x151)];_0x451788+=_0x2fe98b['x']+_0x1a95af['x'],_0x28a924+=_0x2fe98b['y']+_0x1a95af['y'];}return[_0x451788,_0x28a924];},Spriteset_Battle[_0x33f798(0x167)][_0x33f798(0x136)]=function(){const _0x32d9fe=_0x33f798;if(!this[_0x32d9fe(0x18f)])return!![];return this['_projectilesContainer']['children'][_0x32d9fe(0x1f0)]>0x0;};function _0x5f50(_0x3cbf2a,_0x4f978d){const _0x2b74cb=_0x2b74();return _0x5f50=function(_0x5f5021,_0x22d4bd){_0x5f5021=_0x5f5021-0x12e;let _0x4135f7=_0x2b74cb[_0x5f5021];return _0x4135f7;},_0x5f50(_0x3cbf2a,_0x4f978d);}function _0x2b74(){const _0x29aec7=['_adjustedProjectileRadians','exit','_moveTime','blendMode','4979290Fyvopb','Extra','removeChild','destroy','performOnceParallelFinish','EndAnimationID','EVAL','toLowerCase','createActSeqProjectilesAnimationSprite','AnimationAngleAdjust','createBattleFieldContainer','667156RRwvUv','startAnimation','Sprite_Animation_updateEffectGeometry','AnimationID','_startReady','updateActionSequenceProjectileItemThrow','_animation','push','createBitmap','_isProjectile','_mirror','retrieveActSeqProjectilesAnimation','parameters','setupEmulationTarget','ConvertParams','isAnyProjectilePresent','setupAnimation','OffsetX','updateEffectGeometry','_logWindow','OffsetY','isActor','Sprite_AnimationMV_processTimingData','_subject','AutoAngle','extraPositionY','_battlerContainer','bind','emulateActionEffect','initMembers','endProjectile','removeAllActSeqProjectilesAnimations','floor','Spriteset_Base_initialize','ARRAYJSON','setupPictureFrame','parent','animationShouldMirror','isMVAnimation','processTimingData','addLoadListener','LINEAR','_windowLayer','CreateActionSequenceTargets','BlendMode','restartActSeqProjectilesAnimation','requestActSeqProjectilesAnimation','bitmap','makeDeepCopy','ApplyEasing','CreateCoordinates','Spin','ActSeqProjectiles','isActSeqProjectilesAnimationPlaying','loadSystem','setupCoordinates','toUpperCase','1305xHEftM','_effectsContainer','requestPointAnimation','in\x20order\x20for\x20VisuMZ_3_ActSeqProjectiles\x20to\x20work.','isSideView','update','_baseY','prototype','_moveCalcX','createActSeqProjectilesAnimation','_scene','name','processActSeqProjectilesAnimationRequests','shift','_target','Spriteset_Base_destroy','createActSeqProjectilesAnimationQueue','_emulateEffects','max','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','setHue','anchor','Icon','EmulateActionEffect','isPlaying','_moveTargetY','AngleOffset','playOnceParallelInterpreter','Sprite_Animation_processSoundTimings','_animationSprite','2828455hnuGJk','_muteSound','_statusWindow','call','parse','onDatabaseLoaded','_moveTargetX','58568crGfSk','isWaitUntilAnimationFinished','STRUCT','mirror','_radianAdjustment','startProjectile','VisuMZ_3_ItemThrowSkills','Start','PointX','targetObjects','_projectilesContainer','version','_battleField','Type','VisuMZ_3_ActSeqCamera','addChild','EndAnimationMirror','6nnUfMq','Spriteset_Base_update','2711516exMJPN','setupIconFrame','format','IconAngleAdjust','includes','scale','performEmulateActionEffects','Targets','round','EmulateSkillEffect','setFrame','return\x200','ActSeqCamera','applyProjectileAngle','target','isAnimationForEach','_moveBaseY','PictureAngleAdjust','animationBaseDelay','trim','constructor','removeActSeqProjectilesAnimation','setProjectile','initialize','ARRAYNUM','point','24358580vsJXHh','ARRAYEVAL','Hue','_action','pow','_easing','_ActSeqProjectilesAnimationQueue','battler','PointY','back','match','27pEilBt','loadPicture','animationNextDelay','TargetLocation','map','_ActSeqProjectilesAnimationSprites','CreateTargetCoordinates','Spriteset_Battle_createBattleFieldContainer','description','createActionSequenceProjectile','EmulateItemEffect','filter','_moveCalcY','_endReady','setup','JSON','VisuMZ_3_ActSeqCamera\x20needs\x20to\x20be\x20updated\x20','height','adjustFlippedBattlefield','updateActSeqProjectilesAnimations','Goal','_moveDuration','_baseX','rotation','VisuMZ_1_BattleCore\x20needs\x20to\x20be\x20updated\x20','processSoundTimings','Scene_Boot_onDatabaseLoaded','1471542sNLPro','iconHeight','ARRAYSTR','updateSpin','Settings','width','ARRAYSTRUCT','middle\x20center','_settings','_moveTotalDuration','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','setMute','ARRAYFUNC','FUNC','OnceParallel','endAnimation','performEndAnimation','_handle','NUM','Sprite_AnimationMV_update','_spriteset','applyAngle','CheckCompatibility','targets','length','_moveBaseX','volume','Game_Temp_initialize','Picture'];_0x2b74=function(){return _0x29aec7;};return _0x2b74();}function Sprite_Projectile(){const _0x3bdf45=_0x33f798;this[_0x3bdf45(0x1af)](...arguments);}Sprite_Projectile[_0x33f798(0x167)]=Object['create'](Sprite[_0x33f798(0x167)]),Sprite_Projectile[_0x33f798(0x167)][_0x33f798(0x1ac)]=Sprite_Projectile,Sprite_Projectile[_0x33f798(0x167)][_0x33f798(0x1af)]=function(_0x299859,_0x4d879d,_0x46b326){const _0x1f0838=_0x33f798;this[_0x1f0838(0x1e0)]=_0x299859,this[_0x1f0838(0x15e)](_0x4d879d,_0x46b326),Sprite[_0x1f0838(0x167)][_0x1f0838(0x1af)]['call'](this),this[_0x1f0838(0x144)](),this[_0x1f0838(0x12f)]();},Sprite_Projectile[_0x33f798(0x167)]['setupEmulationTarget']=function(_0x281dde,_0x451de1){const _0x31a9df=_0x33f798;this[_0x31a9df(0x13e)]=_0x281dde||null,this[_0x31a9df(0x16e)]=_0x451de1||null;},Sprite_Projectile[_0x33f798(0x167)][_0x33f798(0x15e)]=function(_0x4e9d1d,_0xb67192){const _0x4e9504=_0x33f798;this['_moveBaseX']=_0x4e9d1d['x'],this[_0x4e9504(0x1a8)]=_0x4e9d1d['y'],this[_0x4e9504(0x168)]=_0x4e9d1d['x'],this[_0x4e9504(0x1c9)]=_0x4e9d1d['y'],this['_moveTargetX']=_0xb67192['x'],this[_0x4e9504(0x179)]=_0xb67192['y'];},Sprite_Projectile[_0x33f798(0x167)][_0x33f798(0x144)]=function(){const _0x56a559=_0x33f798;this[_0x56a559(0x175)]['x']=0.5,this[_0x56a559(0x175)]['y']=0.5,this['x']=Graphics[_0x56a559(0x1dd)]*-0xa,this['y']=Graphics[_0x56a559(0x1ce)]*-0xa,this[_0x56a559(0x1f7)]=0x0,this[_0x56a559(0x1d2)]=this[_0x56a559(0x1e0)]['Duration']||0x0,this[_0x56a559(0x1e1)]=this[_0x56a559(0x1d2)],this[_0x56a559(0x1b7)]=_0x56a559(0x150),this['_radianAdjustment']=0x0,this['_startReady']=![],this['_endReady']=![];const _0x311d1a=this['_settings'][_0x56a559(0x1fa)];if(!_0x311d1a)return;this['angle']=_0x311d1a[_0x56a559(0x17a)]||0x0,this[_0x56a559(0x1b7)]=_0x311d1a['EasingType'],!this[_0x56a559(0x1e0)]['AnimationID']&&(this[_0x56a559(0x1f8)]=_0x311d1a[_0x56a559(0x153)]||0x0,this[_0x56a559(0x174)](_0x311d1a[_0x56a559(0x1b4)]||0x0),this[_0x56a559(0x19d)]['x']=this['scale']['y']=Math[_0x56a559(0x172)](0.001,_0x311d1a['Scale']||0.001));},Sprite_Projectile[_0x33f798(0x167)]['createBitmap']=function(){const _0x4d3003=_0x33f798;if(this[_0x4d3003(0x1e0)][_0x4d3003(0x207)])this['bitmap']=new Bitmap(0x1,0x1),this['setupAnimation'](),this[_0x4d3003(0x18a)]();else{if(this[_0x4d3003(0x1e0)][_0x4d3003(0x176)])this['bitmap']=ImageManager[_0x4d3003(0x15d)]('IconSet'),this[_0x4d3003(0x156)]['addLoadListener'](this[_0x4d3003(0x199)][_0x4d3003(0x142)](this));else this[_0x4d3003(0x1e0)]['Picture']?(this[_0x4d3003(0x156)]=ImageManager[_0x4d3003(0x1be)](this[_0x4d3003(0x1e0)][_0x4d3003(0x1f4)]),this[_0x4d3003(0x156)][_0x4d3003(0x14f)](this[_0x4d3003(0x14a)]['bind'](this))):(this[_0x4d3003(0x156)]=new Bitmap(0x1,0x1),this[_0x4d3003(0x18a)]());}},Sprite_Projectile['prototype'][_0x33f798(0x137)]=function(){const _0x378747=_0x33f798,_0x569550=VisuMZ[_0x378747(0x15b)][_0x378747(0x1dc)][_0x378747(0x202)];this['_radianAdjustment']=_0x569550*(Math['PI']/0xb4);const _0x4bb526=BattleManager[_0x378747(0x1ec)];if(!_0x4bb526)return this['endProjectile']();const _0x48d0e4=this[_0x378747(0x1e0)][_0x378747(0x207)],_0x1536fd=$dataAnimations[_0x48d0e4];if(!_0x1536fd)return this[_0x378747(0x145)]();const _0x45ffcd=![],_0x4187cd=0x0,_0x5c7bd6=!![];this[_0x378747(0x17d)]=_0x4bb526[_0x378747(0x201)]([this],_0x1536fd,_0x45ffcd,_0x4187cd,_0x5c7bd6),this[_0x378747(0x18a)]();},Sprite_Projectile[_0x33f798(0x167)]['setupIconFrame']=function(){const _0x34bc85=_0x33f798,_0x487595=VisuMZ[_0x34bc85(0x15b)][_0x34bc85(0x1dc)][_0x34bc85(0x19b)];this[_0x34bc85(0x189)]=_0x487595*(Math['PI']/0xb4);const _0x4a82dd=this[_0x34bc85(0x1e0)][_0x34bc85(0x176)],_0x54c45f=ImageManager['iconWidth'],_0x530cbd=ImageManager[_0x34bc85(0x1d9)],_0x535d7a=_0x4a82dd%0x10*_0x54c45f,_0x454e7a=Math[_0x34bc85(0x147)](_0x4a82dd/0x10)*_0x530cbd;this[_0x34bc85(0x1a2)](_0x535d7a,_0x454e7a,_0x54c45f,_0x530cbd),this[_0x34bc85(0x18a)]();},Sprite_Projectile[_0x33f798(0x167)]['setupPictureFrame']=function(){const _0x422cd2=_0x33f798,_0x32a8ea=VisuMZ['ActSeqProjectiles']['Settings'][_0x422cd2(0x1a9)];this[_0x422cd2(0x189)]=_0x32a8ea*(Math['PI']/0xb4),this[_0x422cd2(0x18a)]();},Sprite_Projectile[_0x33f798(0x167)]['startProjectile']=function(){const _0x4ae1b1=_0x33f798;this[_0x4ae1b1(0x208)]=!![];},Sprite_Projectile['prototype'][_0x33f798(0x165)]=function(){const _0x428e8b=_0x33f798;Sprite[_0x428e8b(0x167)]['update'][_0x428e8b(0x181)](this);if(!this['_startReady'])return;this[_0x428e8b(0x1ca)]?this[_0x428e8b(0x145)]():(this['updateMove'](),this['updateSpin']());},Sprite_Projectile[_0x33f798(0x167)]['isWaitUntilAnimationFinished']=function(){const _0x54a6d1=_0x33f798;return this['_settings']['WaitForAnimation']&&this['_animationSprite']&&this[_0x54a6d1(0x17d)][_0x54a6d1(0x178)]();},Sprite_Projectile['prototype']['endProjectile']=function(){const _0x28bc7b=_0x33f798;if(!this[_0x28bc7b(0x14b)])return;!this[_0x28bc7b(0x171)]&&(this[_0x28bc7b(0x19e)](),this[_0x28bc7b(0x1e8)](),this[_0x28bc7b(0x1fd)](),this[_0x28bc7b(0x171)]=!![]);if(this[_0x28bc7b(0x186)]()){this['updateSpin']();return;}this[_0x28bc7b(0x14b)]['removeChild'](this);if(this[_0x28bc7b(0x17d)]){const _0x505ccc=BattleManager['_spriteset'];_0x505ccc&&(_0x505ccc['removeActSeqProjectilesAnimation'](this['_animationSprite']),delete this[_0x28bc7b(0x17d)]);}},Sprite_Projectile[_0x33f798(0x167)]['updateMove']=function(){const _0x1d71b1=_0x33f798;if(this[_0x1d71b1(0x1d2)]<0x0)return;this[_0x1d71b1(0x1f7)]++;var _0x33d6f8=this[_0x1d71b1(0x1f7)],_0x1b633a=this[_0x1d71b1(0x1e1)],_0x1dedc4=this[_0x1d71b1(0x1f1)],_0x258fbd=this[_0x1d71b1(0x1a8)],_0x44359d=this[_0x1d71b1(0x184)],_0x23443f=this[_0x1d71b1(0x179)];_0x33d6f8/=_0x1b633a,_0x33d6f8=VisuMZ[_0x1d71b1(0x158)](_0x33d6f8,this[_0x1d71b1(0x1b7)][_0x1d71b1(0x15f)]()[_0x1d71b1(0x1ab)]());var _0x4dcfe5=this['_moveCalcX'],_0x28cf15=this[_0x1d71b1(0x1c9)];this[_0x1d71b1(0x168)]=_0x1dedc4+_0x33d6f8*(_0x44359d-_0x1dedc4),this['_moveCalcY']=_0x258fbd+_0x33d6f8*(_0x23443f-_0x258fbd)-this['getPeak']();var _0x1e77aa=this[_0x1d71b1(0x168)],_0x18d11e=this[_0x1d71b1(0x1c9)];this[_0x1d71b1(0x1ed)](_0x4dcfe5,_0x1e77aa,_0x28cf15,_0x18d11e),this['x']=Math['round'](this[_0x1d71b1(0x168)]),this['y']=Math['round'](this[_0x1d71b1(0x1c9)]),this['_moveDuration']--;if(this['_moveDuration']<0x0){this['x']=this[_0x1d71b1(0x184)],this['y']=this['_moveTargetY'],this[_0x1d71b1(0x1ca)]=!![];if(this[_0x1d71b1(0x17d)])this['_animationSprite']['_endReady']=!![];}},Sprite_Projectile[_0x33f798(0x167)]['applyAngle']=function(_0x2e466a,_0xd5a607,_0x810b5e,_0x23dec6){const _0x3a3f7b=_0x33f798;if(this['_settings'][_0x3a3f7b(0x1fa)]&&this['_settings'][_0x3a3f7b(0x1fa)][_0x3a3f7b(0x13f)]){var _0x3d2713=_0xd5a607-_0x2e466a,_0x4b5314=_0x23dec6-_0x810b5e,_0x4ef54b=Math['atan2'](_0x4b5314,_0x3d2713);_0x4ef54b+=this[_0x3a3f7b(0x1e0)][_0x3a3f7b(0x1fa)]['AngleOffset']*(Math['PI']/0xb4),this[_0x3a3f7b(0x1d4)]=_0x4ef54b+this[_0x3a3f7b(0x189)],this['_animationSprite']&&(this['_animationSprite'][_0x3a3f7b(0x1f5)]=this[_0x3a3f7b(0x1d4)]);}},Sprite_Projectile[_0x33f798(0x167)]['getPeak']=function(){const _0x249221=_0x33f798;if(!this['_settings'][_0x249221(0x1fa)])return 0x0;if(this[_0x249221(0x1e0)]['Extra']['Arc']===0x0)return 0x0;var _0x44f451=this[_0x249221(0x1e1)]-this[_0x249221(0x1d2)],_0xfd62cd=this['_moveTotalDuration']/0x2,_0x3f7d35=this[_0x249221(0x1e0)][_0x249221(0x1fa)]?this[_0x249221(0x1e0)][_0x249221(0x1fa)]['Arc']||0x0:0x0,_0x131e3c=-_0x3f7d35/Math[_0x249221(0x1b6)](_0xfd62cd,0x2),_0x9b9fcc=_0x131e3c*Math[_0x249221(0x1b6)](_0x44f451-_0xfd62cd,0x2)+_0x3f7d35;return _0x9b9fcc;},Sprite_Projectile['prototype'][_0x33f798(0x1db)]=function(){const _0x3c0419=_0x33f798;if(!this[_0x3c0419(0x1e0)][_0x3c0419(0x1fa)])return;this['angle']+=this[_0x3c0419(0x1e0)][_0x3c0419(0x1fa)][_0x3c0419(0x15a)]||0x0;},Sprite_Projectile[_0x33f798(0x167)][_0x33f798(0x19e)]=function(){const _0x106b3b=_0x33f798;if(!this[_0x106b3b(0x1e0)]['Extra'])return;if(!this[_0x106b3b(0x13e)])return;if(!this[_0x106b3b(0x16e)])return;const _0x5ab9c9=BattleManager[_0x106b3b(0x13a)],_0x1956b9=BattleManager[_0x106b3b(0x1b5)],_0x40422d=this['_subject'],_0x1afe97=this[_0x106b3b(0x16e)];if(this[_0x106b3b(0x1e0)][_0x106b3b(0x1fa)][_0x106b3b(0x177)]){const _0x2a9e44=_0x1956b9?_0x1956b9['item']():null;_0x5ab9c9[_0x106b3b(0x12e)](_0x106b3b(0x143),_0x40422d,_0x1afe97,_0x2a9e44);}if(this[_0x106b3b(0x1e0)][_0x106b3b(0x1fa)][_0x106b3b(0x1c7)]){const _0x2da50d=$dataItems[this[_0x106b3b(0x1e0)]['Extra'][_0x106b3b(0x1c7)]];_0x5ab9c9[_0x106b3b(0x12e)](_0x106b3b(0x143),_0x40422d,_0x1afe97,_0x2da50d);}if(this[_0x106b3b(0x1e0)]['Extra']['EmulateSkillEffect']){const _0x4420f4=$dataSkills[this[_0x106b3b(0x1e0)][_0x106b3b(0x1fa)][_0x106b3b(0x1a1)]];_0x5ab9c9[_0x106b3b(0x12e)](_0x106b3b(0x143),_0x40422d,_0x1afe97,_0x4420f4);}},Sprite_Projectile[_0x33f798(0x167)][_0x33f798(0x1e8)]=function(){const _0x357b43=_0x33f798;if(!this['_settings'][_0x357b43(0x1fa)])return;const _0x15716d=this['_settings'][_0x357b43(0x1fa)][_0x357b43(0x1fe)]||0x0;if(_0x15716d<=0x0)return;const _0x3a636c=this[_0x357b43(0x1e0)][_0x357b43(0x1fa)][_0x357b43(0x195)]||0x0,_0x51f9d3=this[_0x357b43(0x1e0)][_0x357b43(0x1fa)]['EndAnimationMute']||0x0;if(this[_0x357b43(0x16e)])$gameTemp['requestFauxAnimation']([this[_0x357b43(0x16e)]],_0x15716d,_0x3a636c,_0x51f9d3);else{const _0x173439=this[_0x357b43(0x184)],_0x1d096a=this[_0x357b43(0x179)];$gameTemp[_0x357b43(0x162)](_0x173439,_0x1d096a,_0x15716d,_0x3a636c,_0x51f9d3);}},Sprite_Projectile[_0x33f798(0x167)][_0x33f798(0x1fd)]=function(){const _0x55d737=_0x33f798;if(!this[_0x55d737(0x1e0)][_0x55d737(0x1fa)])return;const _0x27a36a=this['_settings']['Extra'][_0x55d737(0x1e6)]||0x0;if(_0x27a36a<=0x0)return;SceneManager[_0x55d737(0x16a)][_0x55d737(0x17b)](_0x27a36a);};