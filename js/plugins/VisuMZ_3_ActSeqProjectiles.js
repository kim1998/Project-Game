//=============================================================================
// VisuStella MZ - Action Sequence Projectiles
// VisuMZ_3_ActSeqProjectiles.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_ActSeqProjectiles = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ActSeqProjectiles = VisuMZ.ActSeqProjectiles || {};
VisuMZ.ActSeqProjectiles.version = 1.05;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.05] [ActSeqProjectiles]
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

const _0x3a048d=_0xb35f;(function(_0x4ffffb,_0x7ca434){const _0x35bfd6=_0xb35f,_0x262cc3=_0x4ffffb();while(!![]){try{const _0x22f040=-parseInt(_0x35bfd6(0xbf))/0x1+-parseInt(_0x35bfd6(0xff))/0x2+parseInt(_0x35bfd6(0xfd))/0x3+parseInt(_0x35bfd6(0xfa))/0x4*(-parseInt(_0x35bfd6(0xd4))/0x5)+parseInt(_0x35bfd6(0x136))/0x6+-parseInt(_0x35bfd6(0x14b))/0x7*(-parseInt(_0x35bfd6(0x184))/0x8)+parseInt(_0x35bfd6(0x119))/0x9;if(_0x22f040===_0x7ca434)break;else _0x262cc3['push'](_0x262cc3['shift']());}catch(_0x538bb7){_0x262cc3['push'](_0x262cc3['shift']());}}}(_0x4190,0x3b142));var label=_0x3a048d(0x117),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x3a048d(0x129)](function(_0x20a5d7){const _0x1838e5=_0x3a048d;return _0x20a5d7['status']&&_0x20a5d7['description'][_0x1838e5(0x180)]('['+label+']');})[0x0];function _0x4190(){const _0xd56999=['_moveBaseX','rotation','battler','volume','length','_scene','toLowerCase','addLoadListener','destroy','setupPictureFrame','Sprite_Animation_updateEffectGeometry','ARRAYSTRUCT','_moveDuration','DxZSA','pow','center','isActSeqProjectilesAnimationPlaying','Nuiyo','isWaitUntilAnimationFinished','Spriteset_Battle_createBattleFieldContainer','ActSeqProjectiles','isAnyProjectilePresent','5589639wzitEx','bitmap','_moveTime','match','STRUCT','zgMDD','makeDeepCopy','XSPuy','description','processSoundTimings','endProjectile','setupIconFrame','LINEAR','WaitForAnimation','_endReady','processTimingData','filter','CreateTargetCoordinates','Extra','version','_easing','trim','tgYry','loadSystem','toUpperCase','updateActSeqProjectilesAnimations','_ActSeqProjectilesAnimationQueue','isSideView','anchor','468834TLjpPR','svHjC','animationShouldMirror','kNxJk','Sprite_AnimationMV_processTimingData','call','adjustFlippedBattlefield','FUNC','Sprite_Animation_processSoundTimings','map','_moveCalcX','processActSeqProjectilesAnimationRequests','initMembers','gXPQk','_ActSeqProjectilesAnimationSprites','parse','initialize','createActSeqProjectilesAnimationSprite','KdVeb','createActSeqProjectilesAnimation','isAnimationForEach','1617LFVMuy','_baseX','retrieveActSeqProjectilesAnimation','qvQmp','Settings','updateEffectGeometry','_statusWindow','_animationSprite','Targets','extraPositionY','_mirror','ARRAYSTR','OffsetY','_moveTargetY','_battlerContainer','STR','targets','iconHeight','remove','AnimationID','_settings','_moveCalcY','Spriteset_Base_update','PnoSz','_animation','RRZPW','startProjectile','children','angle','Sprite_AnimationMV_update','Hue','setupCoordinates','applyAngle','mirror','luCaT','arKyG','NXoOJ','parameters','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_projectilesContainer','Type','atan2','getPeak','isPlaying','_effectsContainer','format','front','_adjustedProjectileRadians','tKKNp','XcoeF','_moveBaseY','scale','removeActSeqProjectilesAnimation','includes','_targets','floor','MhnpL','5944GcMuYX','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','max','ARRAYEVAL','bind','updateMove','ApplyEasing','GiDoh','constructor','Start','createBattleFieldContainer','EVAL','Game_Temp_initialize','exit','103355kNssxn','_baseY','update','round','createBitmap','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','JSON','_moveTotalDuration','setMute','NUM','setupAnimation','Spriteset_Base_initialize','push','_muteSound','animationId','_radianAdjustment','Picture','create','Spriteset_Battle_adjustFlippedBattlefield','_windowLayer','setHue','1255XnzVbU','restartActSeqProjectilesAnimation','height','targetObjects','updateSpin','AngleOffset','mute','Spriteset_Base_destroy','requestActSeqProjectilesAnimation','_battleField','QWTtE','TargetCenter','Spin','animationNextDelay','IconSet','IconAngleAdjust','target','Scale','prototype','ARRAYJSON','animationBaseDelay','setFrame','addChild','Icon','AnimationAngleAdjust','applyProjectileAngle','back','_spriteset','shift','_startReady','isActor','_moveTargetX','CreateCoordinates','Arc','blendMode','_handle','setRotation','createActionSequenceProjectile','5644VXPZzZ','width','TargetLocation','584403lbBxbp','ConvertParams','732284uNpKvH','startAnimation','middle\x20center','PointY'];_0x4190=function(){return _0xd56999;};return _0x4190();}VisuMZ[label]['Settings']=VisuMZ[label][_0x3a048d(0x14f)]||{},VisuMZ['ConvertParams']=function(_0x31fc62,_0x188b7b){const _0x496478=_0x3a048d;for(const _0x24efc5 in _0x188b7b){if(_0x24efc5['match'](/(.*):(.*)/i)){const _0x2b64a6=String(RegExp['$1']),_0x3645bd=String(RegExp['$2'])[_0x496478(0x131)]()['trim']();let _0x2ed12a,_0x2aab60,_0x1ac1e1;switch(_0x3645bd){case _0x496478(0xc8):_0x2ed12a=_0x188b7b[_0x24efc5]!==''?Number(_0x188b7b[_0x24efc5]):0x0;break;case'ARRAYNUM':_0x2aab60=_0x188b7b[_0x24efc5]!==''?JSON['parse'](_0x188b7b[_0x24efc5]):[],_0x2ed12a=_0x2aab60[_0x496478(0x13f)](_0x4d0c90=>Number(_0x4d0c90));break;case _0x496478(0xbc):_0x2ed12a=_0x188b7b[_0x24efc5]!==''?eval(_0x188b7b[_0x24efc5]):null;break;case _0x496478(0xb4):_0x2aab60=_0x188b7b[_0x24efc5]!==''?JSON[_0x496478(0x145)](_0x188b7b[_0x24efc5]):[],_0x2ed12a=_0x2aab60[_0x496478(0x13f)](_0x1908ff=>eval(_0x1908ff));break;case _0x496478(0xc5):_0x2ed12a=_0x188b7b[_0x24efc5]!==''?JSON['parse'](_0x188b7b[_0x24efc5]):'';break;case _0x496478(0xe7):_0x2aab60=_0x188b7b[_0x24efc5]!==''?JSON[_0x496478(0x145)](_0x188b7b[_0x24efc5]):[],_0x2ed12a=_0x2aab60[_0x496478(0x13f)](_0x417ffe=>JSON[_0x496478(0x145)](_0x417ffe));break;case _0x496478(0x13d):_0x2ed12a=_0x188b7b[_0x24efc5]!==''?new Function(JSON['parse'](_0x188b7b[_0x24efc5])):new Function('return\x200');break;case'ARRAYFUNC':_0x2aab60=_0x188b7b[_0x24efc5]!==''?JSON['parse'](_0x188b7b[_0x24efc5]):[],_0x2ed12a=_0x2aab60[_0x496478(0x13f)](_0x29bbe7=>new Function(JSON[_0x496478(0x145)](_0x29bbe7)));break;case _0x496478(0x15a):_0x2ed12a=_0x188b7b[_0x24efc5]!==''?String(_0x188b7b[_0x24efc5]):'';break;case _0x496478(0x156):_0x2aab60=_0x188b7b[_0x24efc5]!==''?JSON['parse'](_0x188b7b[_0x24efc5]):[],_0x2ed12a=_0x2aab60[_0x496478(0x13f)](_0x5b143b=>String(_0x5b143b));break;case _0x496478(0x11d):_0x1ac1e1=_0x188b7b[_0x24efc5]!==''?JSON['parse'](_0x188b7b[_0x24efc5]):{},_0x2ed12a=VisuMZ[_0x496478(0xfe)]({},_0x1ac1e1);break;case _0x496478(0x10e):_0x2aab60=_0x188b7b[_0x24efc5]!==''?JSON[_0x496478(0x145)](_0x188b7b[_0x24efc5]):[],_0x2ed12a=_0x2aab60[_0x496478(0x13f)](_0x20aa85=>VisuMZ['ConvertParams']({},JSON[_0x496478(0x145)](_0x20aa85)));break;default:continue;}_0x31fc62[_0x2b64a6]=_0x2ed12a;}}return _0x31fc62;},(_0x209bc5=>{const _0x450d1c=_0x3a048d,_0x45e38f=_0x209bc5['name'];for(const _0x429496 of dependencies){if(!Imported[_0x429496]){if(_0x450d1c(0x14e)==='qvQmp'){alert(_0x450d1c(0x185)['format'](_0x45e38f,_0x429496)),SceneManager['exit']();break;}else{if(!this[_0x450d1c(0x15f)][_0x450d1c(0x12b)])return 0x0;if(this['_settings'][_0x450d1c(0x12b)]['Arc']===0x0)return 0x0;var _0x391c74=this[_0x450d1c(0xc6)]-this['_moveDuration'],_0x476cb8=this[_0x450d1c(0xc6)]/0x2,_0x2469e7=this['_settings'][_0x450d1c(0x12b)]?this['_settings'][_0x450d1c(0x12b)][_0x450d1c(0xf5)]||0x0:0x0,_0xb1df49=-_0x2469e7/_0x51e802['pow'](_0x476cb8,0x2),_0x19ab19=_0xb1df49*_0x280f80['pow'](_0x391c74-_0x476cb8,0x2)+_0x2469e7;return _0x19ab19;}}}const _0x1567d3=_0x209bc5[_0x450d1c(0x121)];if(_0x1567d3[_0x450d1c(0x11c)](/\[Version[ ](.*?)\]/i)){const _0x2fe37d=Number(RegExp['$1']);_0x2fe37d!==VisuMZ[label][_0x450d1c(0x12c)]&&(alert(_0x450d1c(0x171)['format'](_0x45e38f,_0x2fe37d)),SceneManager[_0x450d1c(0xbe)]());}if(_0x1567d3[_0x450d1c(0x11c)](/\[Tier[ ](\d+)\]/i)){const _0x44676a=Number(RegExp['$1']);_0x44676a<tier?'MhnpL'===_0x450d1c(0x183)?(alert(_0x450d1c(0xc4)[_0x450d1c(0x178)](_0x45e38f,_0x44676a,tier)),SceneManager['exit']()):(_0x404aa4=_0x434321[_0x450d1c(0x11f)](_0x444d85),_0x411788['se']&&(_0x3526f1['se'][_0x450d1c(0x106)]=0x0)):tier=Math[_0x450d1c(0xb3)](_0x44676a,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x450d1c(0x14f)],_0x209bc5[_0x450d1c(0x170)]);})(pluginData),VisuMZ[_0x3a048d(0x117)]['Game_Temp_initialize']=Game_Temp[_0x3a048d(0xe6)][_0x3a048d(0x146)],Game_Temp[_0x3a048d(0xe6)][_0x3a048d(0x146)]=function(){const _0x2f5096=_0x3a048d;VisuMZ['ActSeqProjectiles'][_0x2f5096(0xbd)][_0x2f5096(0x13b)](this),this['createActSeqProjectilesAnimationQueue']();},Game_Temp[_0x3a048d(0xe6)]['createActSeqProjectilesAnimationQueue']=function(){const _0x464e0f=_0x3a048d;this[_0x464e0f(0x133)]=[];},Game_Temp[_0x3a048d(0xe6)][_0x3a048d(0xdc)]=function(_0x778320,_0x564adc,_0x483cae,_0x4f8c69){const _0x49e50d=_0x3a048d;_0x483cae=_0x483cae||![],_0x4f8c69=_0x4f8c69||![];if($dataAnimations[_0x564adc]){const _0x5db729={'targets':_0x778320,'animationId':_0x564adc,'mirror':_0x483cae,'mute':_0x4f8c69};this[_0x49e50d(0x133)][_0x49e50d(0xcb)](_0x5db729);for(const _0x2e6c60 of _0x778320){if(_0x49e50d(0x162)!==_0x49e50d(0x162))for(const _0x3f9a6d of _0x3dd873){_0x15e759[_0x49e50d(0xcb)](new _0x540105(_0x8f6b78['round'](_0x3f9a6d[0x0]+_0x1780f0),_0x597304[_0x49e50d(0xc2)](_0x3f9a6d[0x1]+_0x189e32)));}else _0x2e6c60[_0x49e50d(0x100)]&&_0x2e6c60['startAnimation']();}}},Game_Temp[_0x3a048d(0xe6)][_0x3a048d(0x14d)]=function(){const _0x352b0d=_0x3a048d;return this[_0x352b0d(0x133)][_0x352b0d(0xf0)]();},Sprite_Animation['prototype'][_0x3a048d(0xc7)]=function(_0x36ea92){const _0x58c928=_0x3a048d;this[_0x58c928(0xcc)]=_0x36ea92;},VisuMZ[_0x3a048d(0x117)][_0x3a048d(0x13e)]=Sprite_Animation[_0x3a048d(0xe6)][_0x3a048d(0x122)],Sprite_Animation[_0x3a048d(0xe6)][_0x3a048d(0x122)]=function(){const _0x9f14e7=_0x3a048d;if(this[_0x9f14e7(0xcc)])return;VisuMZ[_0x9f14e7(0x117)][_0x9f14e7(0x13e)][_0x9f14e7(0x13b)](this);},VisuMZ[_0x3a048d(0x117)][_0x3a048d(0x10d)]=Sprite_Animation[_0x3a048d(0xe6)][_0x3a048d(0x150)],Sprite_Animation['prototype'][_0x3a048d(0x150)]=function(){const _0x2214fc=_0x3a048d;VisuMZ[_0x2214fc(0x117)][_0x2214fc(0x10d)]['call'](this),this[_0x2214fc(0x17a)]!==undefined&&this[_0x2214fc(0xed)](this[_0x2214fc(0x17a)]);},Sprite_Animation[_0x3a048d(0xe6)][_0x3a048d(0xed)]=function(_0x4c76bf){const _0x2be6ad=_0x3a048d,_0x5834ec=this[_0x2be6ad(0x163)][_0x2be6ad(0x17e)]/0x64,_0x675816=Math['PI']/0xb4,_0x958807=this[_0x2be6ad(0x163)][_0x2be6ad(0x104)]['x']*_0x675816,_0xe364f1=this[_0x2be6ad(0x163)][_0x2be6ad(0x104)]['y']*_0x675816,_0xa549c4=this[_0x2be6ad(0x163)][_0x2be6ad(0x104)]['z']*_0x675816-_0x4c76bf;this[_0x2be6ad(0xf7)]&&(_0x2be6ad(0x164)!==_0x2be6ad(0x143)?this['_handle'][_0x2be6ad(0xf8)](_0x958807,_0xe364f1,_0xa549c4):(_0x2424f7['ActSeqProjectiles']['Sprite_AnimationMV_update'][_0x2be6ad(0x13b)](this),this[_0x2be6ad(0x17a)]!==_0x98d463&&(this[_0x2be6ad(0x104)]=this[_0x2be6ad(0x17a)])));},Sprite_AnimationMV[_0x3a048d(0xe6)][_0x3a048d(0xc7)]=function(_0x409d8e){const _0x1179c2=_0x3a048d;this[_0x1179c2(0xcc)]=_0x409d8e;},VisuMZ[_0x3a048d(0x117)][_0x3a048d(0x13a)]=Sprite_AnimationMV['prototype'][_0x3a048d(0x128)],Sprite_AnimationMV['prototype'][_0x3a048d(0x128)]=function(_0x424ed5){const _0x406331=_0x3a048d;this[_0x406331(0xcc)]&&(_0x424ed5=JsonEx['makeDeepCopy'](_0x424ed5),_0x424ed5['se']&&(_0x424ed5['se'][_0x406331(0x106)]=0x0)),VisuMZ[_0x406331(0x117)]['Sprite_AnimationMV_processTimingData'][_0x406331(0x13b)](this,_0x424ed5);},VisuMZ[_0x3a048d(0x117)][_0x3a048d(0x168)]=Sprite_AnimationMV[_0x3a048d(0xe6)]['update'],Sprite_AnimationMV['prototype'][_0x3a048d(0xc1)]=function(){const _0x10db33=_0x3a048d;VisuMZ[_0x10db33(0x117)][_0x10db33(0x168)][_0x10db33(0x13b)](this),this[_0x10db33(0x17a)]!==undefined&&(this[_0x10db33(0x104)]=this[_0x10db33(0x17a)]);},VisuMZ['ActSeqProjectiles'][_0x3a048d(0xca)]=Spriteset_Base['prototype'][_0x3a048d(0x146)],Spriteset_Base[_0x3a048d(0xe6)][_0x3a048d(0x146)]=function(){const _0x2cfa49=_0x3a048d;VisuMZ[_0x2cfa49(0x117)][_0x2cfa49(0xca)][_0x2cfa49(0x13b)](this),this[_0x2cfa49(0x144)]=[];},VisuMZ[_0x3a048d(0x117)][_0x3a048d(0xdb)]=Spriteset_Base[_0x3a048d(0xe6)][_0x3a048d(0x10b)],Spriteset_Base[_0x3a048d(0xe6)]['destroy']=function(_0x1286a0){const _0x45fb78=_0x3a048d;this['removeAllActSeqProjectilesAnimations'](),VisuMZ[_0x45fb78(0x117)][_0x45fb78(0xdb)]['call'](this,_0x1286a0);},VisuMZ[_0x3a048d(0x117)][_0x3a048d(0x161)]=Spriteset_Base['prototype'][_0x3a048d(0xc1)],Spriteset_Base[_0x3a048d(0xe6)][_0x3a048d(0xc1)]=function(){const _0x146475=_0x3a048d;VisuMZ[_0x146475(0x117)]['Spriteset_Base_update'][_0x146475(0x13b)](this),this[_0x146475(0x132)]();},Spriteset_Base[_0x3a048d(0xe6)][_0x3a048d(0x132)]=function(){const _0x4ca75a=_0x3a048d;for(const _0x284d93 of this[_0x4ca75a(0x144)]){if(_0x284d93['_endReady'])continue;!_0x284d93[_0x4ca75a(0x176)]()&&this[_0x4ca75a(0xd5)](_0x284d93);}this[_0x4ca75a(0x141)]();},Spriteset_Base[_0x3a048d(0xe6)][_0x3a048d(0x141)]=function(){const _0xa6bc4f=_0x3a048d;for(;;){const _0x1a9f4c=$gameTemp[_0xa6bc4f(0x14d)]();if(_0x1a9f4c)_0xa6bc4f(0x114)===_0xa6bc4f(0x114)?this[_0xa6bc4f(0x149)](_0x1a9f4c):this['_startReady']=!![];else{if('XcoeF'===_0xa6bc4f(0x17c))break;else this[_0xa6bc4f(0xcc)]=_0x3eb302;}}},Spriteset_Base['prototype'][_0x3a048d(0x149)]=function(_0x534aea){const _0x399937=_0x3a048d,_0x42034e=$dataAnimations[_0x534aea[_0x399937(0xcd)]],_0x435466=_0x534aea[_0x399937(0x15b)],_0x497e02=_0x534aea[_0x399937(0x16c)],_0x431673=_0x534aea[_0x399937(0xda)];let _0x1098ef=this[_0x399937(0xe8)]();const _0x7fd3c5=this[_0x399937(0xe1)]();if(this[_0x399937(0x14a)](_0x42034e))for(const _0x576947 of _0x435466){if(_0x399937(0x139)!=='kNxJk')for(const _0x195448 of this['_ActSeqProjectilesAnimationSprites']){this[_0x399937(0x17f)](_0x195448);}else this[_0x399937(0x147)]([_0x576947],_0x42034e,_0x497e02,_0x1098ef,_0x431673),_0x1098ef+=_0x7fd3c5;}else'svHjC'===_0x399937(0x137)?this[_0x399937(0x147)](_0x435466,_0x42034e,_0x497e02,_0x1098ef):this[_0x399937(0xd5)](_0x2c93e1);},Spriteset_Base[_0x3a048d(0xe6)]['createActSeqProjectilesAnimationSprite']=function(_0xafec7,_0x52241e,_0x45591f,_0x1d60c6,_0x3aebb0){const _0x420004=_0x3a048d,_0x11e278=this['isMVAnimation'](_0x52241e),_0x4fb5f7=new(_0x11e278?Sprite_AnimationMV:Sprite_Animation)(),_0x16f75a=_0xafec7;return this[_0x420004(0x138)](_0xafec7[0x0])&&('arKyG'===_0x420004(0x16e)?_0x45591f=!_0x45591f:_0x232d46[_0x420004(0x100)]()),_0x4fb5f7[_0x420004(0xd7)]=_0xafec7,_0x4fb5f7['setup'](_0x16f75a,_0x52241e,_0x45591f,_0x1d60c6),_0x4fb5f7[_0x420004(0xc7)](_0x3aebb0),this[_0x420004(0x177)][_0x420004(0xea)](_0x4fb5f7),this['_ActSeqProjectilesAnimationSprites'][_0x420004(0xcb)](_0x4fb5f7),_0x4fb5f7;},Spriteset_Base[_0x3a048d(0xe6)][_0x3a048d(0xd5)]=function(_0x53b590){const _0x107897=_0x3a048d;if(!_0x53b590)return;const _0x2b3a99=_0x53b590[_0x107897(0x181)],_0x77a7f5=_0x53b590[_0x107897(0x163)],_0x4a4477=_0x53b590[_0x107897(0x155)],_0x749f7e=0x0,_0x74e67c=_0x53b590[_0x107897(0xcc)];this[_0x107897(0x17f)](_0x53b590);const _0x1b4c70=this[_0x107897(0x147)](_0x2b3a99,_0x77a7f5,_0x4a4477,_0x749f7e,_0x74e67c);for(const _0x4517b4 of _0x2b3a99){'tKKNp'===_0x107897(0x17b)?_0x4517b4&&(_0x107897(0x16d)!==_0x107897(0x16f)?_0x4517b4[_0x107897(0x152)]=_0x1b4c70:(this[_0x107897(0x11a)]=new _0x435eff(0x1,0x1),this['startProjectile']())):(this['bitmap']=_0x5d3018[_0x107897(0x130)](_0x107897(0xe2)),this[_0x107897(0x11a)][_0x107897(0x10a)](this[_0x107897(0x124)][_0x107897(0xb5)](this)));}},Spriteset_Base[_0x3a048d(0xe6)]['removeActSeqProjectilesAnimation']=function(_0x18d8f2){const _0x97e6d2=_0x3a048d;this[_0x97e6d2(0x144)][_0x97e6d2(0x15d)](_0x18d8f2),this[_0x97e6d2(0x177)]['removeChild'](_0x18d8f2);for(const _0xa585fe of _0x18d8f2[_0x97e6d2(0xd7)]){_0xa585fe['endAnimation']&&_0xa585fe['endAnimation']();}_0x18d8f2[_0x97e6d2(0x10b)]();},Spriteset_Base[_0x3a048d(0xe6)]['removeAllActSeqProjectilesAnimations']=function(){const _0x163ba7=_0x3a048d;for(const _0xc0fc0e of this[_0x163ba7(0x144)]){'yRZSS'!==_0x163ba7(0x11e)?this[_0x163ba7(0x17f)](_0xc0fc0e):this[_0x163ba7(0xcc)]=_0x2f1d54;}},Spriteset_Base[_0x3a048d(0xe6)][_0x3a048d(0x113)]=function(){const _0x419699=_0x3a048d;return this[_0x419699(0x144)][_0x419699(0x107)]>0x0;},VisuMZ[_0x3a048d(0x117)][_0x3a048d(0x116)]=Spriteset_Battle[_0x3a048d(0xe6)][_0x3a048d(0xbb)],Spriteset_Battle['prototype']['createBattleFieldContainer']=function(){const _0x22df66=_0x3a048d;VisuMZ['ActSeqProjectiles']['Spriteset_Battle_createBattleFieldContainer'][_0x22df66(0x13b)](this),this[_0x22df66(0x172)]=new Sprite(),this[_0x22df66(0xdd)][_0x22df66(0xea)](this[_0x22df66(0x172)]);},VisuMZ['ActSeqProjectiles']['Spriteset_Battle_adjustFlippedBattlefield']=Spriteset_Battle[_0x3a048d(0xe6)][_0x3a048d(0x13c)],Spriteset_Battle[_0x3a048d(0xe6)][_0x3a048d(0x13c)]=function(){const _0x3447b9=_0x3a048d;VisuMZ[_0x3447b9(0x117)][_0x3447b9(0xd1)]['call'](this),this[_0x3447b9(0x172)]&&this[_0x3447b9(0x159)]&&(_0x3447b9(0xb8)!==_0x3447b9(0xb8)?_0x58a475=_0x48357e[_0x3447b9(0xb3)](_0x58d90d,_0x892d83):(this[_0x3447b9(0x172)][_0x3447b9(0x17e)]['x']=this[_0x3447b9(0x159)][_0x3447b9(0x17e)]['x'],this[_0x3447b9(0x172)]['scale']['y']=this[_0x3447b9(0x159)][_0x3447b9(0x17e)]['y'],this[_0x3447b9(0x172)]['x']=this['_battlerContainer']['x'],this['_projectilesContainer']['y']=this[_0x3447b9(0x159)]['y']));},Spriteset_Battle['prototype'][_0x3a048d(0xf9)]=function(_0x2a1e40){const _0x4f66d0=_0x3a048d;if(!_0x2a1e40)return;_0x2a1e40=JsonEx[_0x4f66d0(0x11f)](_0x2a1e40);const _0x336256=[],_0x2df25c=[];VisuMZ[_0x4f66d0(0x117)][_0x4f66d0(0xf4)](_0x336256,_0x2a1e40[_0x4f66d0(0xba)]),VisuMZ['ActSeqProjectiles'][_0x4f66d0(0xf4)](_0x2df25c,_0x2a1e40['Goal']);const _0x5daa9a=this['_projectilesContainer'];for(const _0x291a36 of _0x336256){for(const _0x44c779 of _0x2df25c){const _0x10fadd=new Sprite_Projectile(_0x2a1e40,_0x291a36,_0x44c779);_0x5daa9a['addChild'](_0x10fadd);}}},VisuMZ[_0x3a048d(0x117)][_0x3a048d(0xf4)]=function(_0x48fa96,_0x4813be){const _0x166164=_0x3a048d,_0x1789a9=_0x4813be[_0x166164(0x173)],_0x19aaa2=_0x4813be['OffsetX'],_0x34a627=_0x4813be[_0x166164(0x157)];_0x1789a9==='point'&&_0x48fa96[_0x166164(0xcb)](new Point(_0x4813be['PointX']+_0x19aaa2,_0x4813be[_0x166164(0x102)]+_0x34a627));if(_0x1789a9===_0x166164(0xe4)){const _0x6932ef=VisuMZ['CreateActionSequenceTargets'](_0x4813be[_0x166164(0x153)]),_0x367493=_0x6932ef[_0x166164(0x129)](_0x4b47e9=>_0x4b47e9&&_0x4b47e9[_0x166164(0x105)]())[_0x166164(0x13f)](_0x5f0221=>VisuMZ[_0x166164(0x117)][_0x166164(0x12a)](_0x5f0221,_0x4813be));if(!_0x367493)return;if(_0x4813be[_0x166164(0xdf)]){if(_0x166164(0xde)===_0x166164(0xde)){const _0x2974fd=_0x367493[_0x166164(0x107)]||0x1;let _0x35c677=0x0,_0x5c7d21=0x0;for(const _0x520184 of _0x367493){_0x35c677+=_0x520184[0x0],_0x5c7d21+=_0x520184[0x1];}_0x35c677/=_0x2974fd,_0x5c7d21/=_0x2974fd,_0x48fa96[_0x166164(0xcb)](new Point(Math[_0x166164(0xc2)](_0x35c677+_0x19aaa2),Math['round'](_0x5c7d21+_0x34a627)));}else _0x410d8d[_0x166164(0xcb)](new _0x1745e9(_0x128473[_0x166164(0xc2)](_0x52c38d[0x0]+_0x2a8f06),_0x3e496a[_0x166164(0xc2)](_0x741c2b[0x1]+_0x48d220)));}else{if(_0x166164(0x148)!==_0x166164(0x12f))for(const _0xddf3c3 of _0x367493){_0x48fa96['push'](new Point(Math[_0x166164(0xc2)](_0xddf3c3[0x0]+_0x19aaa2),Math[_0x166164(0xc2)](_0xddf3c3[0x1]+_0x34a627)));}else{const _0x489f03=_0x501bc8[_0x5f4a9d['animationId']],_0x282ec6=_0x73f829[_0x166164(0x15b)],_0x2a06f7=_0x180781['mirror'],_0x3b30be=_0x3754d1[_0x166164(0xda)];let _0x493fe5=this['animationBaseDelay']();const _0x47030a=this[_0x166164(0xe1)]();if(this['isAnimationForEach'](_0x489f03))for(const _0x5f0b2f of _0x282ec6){this['createActSeqProjectilesAnimationSprite']([_0x5f0b2f],_0x489f03,_0x2a06f7,_0x493fe5,_0x3b30be),_0x493fe5+=_0x47030a;}else this['createActSeqProjectilesAnimationSprite'](_0x282ec6,_0x489f03,_0x2a06f7,_0x493fe5);}}}},VisuMZ[_0x3a048d(0x117)][_0x3a048d(0x12a)]=function(_0x4e6e34,_0x5e763b){const _0x572665=_0x3a048d;let _0x2932ee=_0x572665(0x101);_0x5e763b&&('qDgyA'!==_0x572665(0x120)?(_0x5e763b[_0x572665(0xfc)]=_0x5e763b[_0x572665(0xfc)]||_0x572665(0x101),_0x2932ee=_0x5e763b['TargetLocation'][_0x572665(0x109)]()):(_0x4dc53e[_0x572665(0x17f)](this[_0x572665(0x152)]),delete this[_0x572665(0x152)]));let _0x240ffa=_0x4e6e34[_0x572665(0x105)]()[_0x572665(0x14c)];if(_0x2932ee[_0x572665(0x180)](_0x572665(0x179)))_0x240ffa+=(_0x4e6e34[_0x572665(0xf2)]()?-0x1:0x1)*_0x4e6e34[_0x572665(0x105)]()['width']/0x2;else _0x2932ee[_0x572665(0x180)](_0x572665(0xee))&&(_0x240ffa+=(_0x4e6e34['isActor']()?0x1:-0x1)*_0x4e6e34[_0x572665(0x105)]()['width']/0x2);let _0x354483=_0x4e6e34[_0x572665(0x105)]()[_0x572665(0xc0)];_0x354483+=_0x4e6e34['battler']()[_0x572665(0x154)]();if(_0x2932ee[_0x572665(0x180)](_0x572665(0x112)))_0x354483-=_0x4e6e34[_0x572665(0x105)]()[_0x572665(0xd6)]/0x2;else _0x2932ee[_0x572665(0x180)]('head')&&(_0x354483-=_0x4e6e34[_0x572665(0x105)]()[_0x572665(0xd6)]);if(!$gameSystem[_0x572665(0x134)]()&&_0x4e6e34[_0x572665(0xf2)]()){const _0x2f2101=SceneManager[_0x572665(0x108)][_0x572665(0x151)],_0x397430=SceneManager[_0x572665(0x108)][_0x572665(0xd2)];_0x240ffa+=_0x397430['x']+_0x2f2101['x'],_0x354483+=_0x397430['y']+_0x2f2101['y'];}return[_0x240ffa,_0x354483];},Spriteset_Battle[_0x3a048d(0xe6)][_0x3a048d(0x118)]=function(){const _0x4597ea=_0x3a048d;if(!this[_0x4597ea(0x172)])return!![];return this[_0x4597ea(0x172)][_0x4597ea(0x166)]['length']>0x0;};function Sprite_Projectile(){const _0x3c8fcf=_0x3a048d;this[_0x3c8fcf(0x146)](...arguments);}function _0xb35f(_0x3dbdea,_0x474bac){const _0x41903b=_0x4190();return _0xb35f=function(_0xb35fd5,_0x4060e6){_0xb35fd5=_0xb35fd5-0xb3;let _0x545a24=_0x41903b[_0xb35fd5];return _0x545a24;},_0xb35f(_0x3dbdea,_0x474bac);}Sprite_Projectile[_0x3a048d(0xe6)]=Object[_0x3a048d(0xd0)](Sprite[_0x3a048d(0xe6)]),Sprite_Projectile['prototype'][_0x3a048d(0xb9)]=Sprite_Projectile,Sprite_Projectile[_0x3a048d(0xe6)]['initialize']=function(_0x300e38,_0x31ccee,_0x5ca337){const _0x55e8a4=_0x3a048d;this[_0x55e8a4(0x15f)]=_0x300e38,this[_0x55e8a4(0x16a)](_0x31ccee,_0x5ca337),Sprite[_0x55e8a4(0xe6)]['initialize'][_0x55e8a4(0x13b)](this),this['initMembers'](),this['createBitmap']();},Sprite_Projectile[_0x3a048d(0xe6)]['setupCoordinates']=function(_0x44dff2,_0x3edbd2){const _0x3a3af6=_0x3a048d;this[_0x3a3af6(0x103)]=_0x44dff2['x'],this[_0x3a3af6(0x17d)]=_0x44dff2['y'],this[_0x3a3af6(0x140)]=_0x44dff2['x'],this[_0x3a3af6(0x160)]=_0x44dff2['y'],this[_0x3a3af6(0xf3)]=_0x3edbd2['x'],this[_0x3a3af6(0x158)]=_0x3edbd2['y'];},Sprite_Projectile[_0x3a048d(0xe6)][_0x3a048d(0x142)]=function(){const _0x9ede73=_0x3a048d;this['anchor']['x']=0.5,this[_0x9ede73(0x135)]['y']=0.5,this['x']=Graphics[_0x9ede73(0xfb)]*-0xa,this['y']=Graphics[_0x9ede73(0xd6)]*-0xa,this['_moveTime']=0x0,this[_0x9ede73(0x10f)]=this[_0x9ede73(0x15f)]['Duration']||0x0,this[_0x9ede73(0xc6)]=this[_0x9ede73(0x10f)],this[_0x9ede73(0x12d)]=_0x9ede73(0x125),this[_0x9ede73(0xce)]=0x0,this[_0x9ede73(0xf1)]=![],this[_0x9ede73(0x127)]=![];const _0x24c3d8=this[_0x9ede73(0x15f)][_0x9ede73(0x12b)];if(!_0x24c3d8)return;this[_0x9ede73(0x167)]=_0x24c3d8[_0x9ede73(0xd9)]||0x0,this[_0x9ede73(0x12d)]=_0x24c3d8['EasingType'],!this[_0x9ede73(0x15f)][_0x9ede73(0x15e)]&&(this[_0x9ede73(0xf6)]=_0x24c3d8['BlendMode']||0x0,this[_0x9ede73(0xd3)](_0x24c3d8[_0x9ede73(0x169)]||0x0),this[_0x9ede73(0x17e)]['x']=this[_0x9ede73(0x17e)]['y']=Math[_0x9ede73(0xb3)](0.001,_0x24c3d8[_0x9ede73(0xe5)]||0.001));},Sprite_Projectile[_0x3a048d(0xe6)][_0x3a048d(0xc3)]=function(){const _0x3f7e27=_0x3a048d;if(this[_0x3f7e27(0x15f)][_0x3f7e27(0x15e)])_0x3f7e27(0x110)!==_0x3f7e27(0x110)?(_0x282f99[_0x3f7e27(0x117)][_0x3f7e27(0x116)][_0x3f7e27(0x13b)](this),this[_0x3f7e27(0x172)]=new _0x512e3d(),this[_0x3f7e27(0xdd)][_0x3f7e27(0xea)](this[_0x3f7e27(0x172)])):(this[_0x3f7e27(0x11a)]=new Bitmap(0x1,0x1),this[_0x3f7e27(0xc9)](),this[_0x3f7e27(0x165)]());else{if(this['_settings'][_0x3f7e27(0xeb)])this['bitmap']=ImageManager['loadSystem'](_0x3f7e27(0xe2)),this[_0x3f7e27(0x11a)]['addLoadListener'](this[_0x3f7e27(0x124)]['bind'](this));else this[_0x3f7e27(0x15f)]['Picture']?(this[_0x3f7e27(0x11a)]=ImageManager['loadPicture'](this[_0x3f7e27(0x15f)][_0x3f7e27(0xcf)]),this[_0x3f7e27(0x11a)]['addLoadListener'](this[_0x3f7e27(0x10c)]['bind'](this))):(this[_0x3f7e27(0x11a)]=new Bitmap(0x1,0x1),this[_0x3f7e27(0x165)]());}},Sprite_Projectile[_0x3a048d(0xe6)][_0x3a048d(0xc9)]=function(){const _0xef09d6=_0x3a048d,_0x2fb1f3=VisuMZ[_0xef09d6(0x117)]['Settings'][_0xef09d6(0xec)];this[_0xef09d6(0xce)]=_0x2fb1f3*(Math['PI']/0xb4);const _0x559c61=BattleManager['_spriteset'];if(!_0x559c61)return this[_0xef09d6(0x123)]();const _0x2dc4ca=this[_0xef09d6(0x15f)]['AnimationID'],_0x1b79e7=$dataAnimations[_0x2dc4ca];if(!_0x1b79e7)return this[_0xef09d6(0x123)]();const _0x41b398=![],_0x4e9f05=0x0,_0x9988e4=!![];this[_0xef09d6(0x152)]=_0x559c61[_0xef09d6(0x147)]([this],_0x1b79e7,_0x41b398,_0x4e9f05,_0x9988e4),this[_0xef09d6(0x165)]();},Sprite_Projectile['prototype']['setupIconFrame']=function(){const _0x186986=_0x3a048d,_0x4a5bbe=VisuMZ[_0x186986(0x117)][_0x186986(0x14f)][_0x186986(0xe3)];this[_0x186986(0xce)]=_0x4a5bbe*(Math['PI']/0xb4);const _0x30980c=this[_0x186986(0x15f)][_0x186986(0xeb)],_0x176395=ImageManager['iconWidth'],_0x5355f4=ImageManager[_0x186986(0x15c)],_0x4ad5a9=_0x30980c%0x10*_0x176395,_0x36ebd6=Math[_0x186986(0x182)](_0x30980c/0x10)*_0x5355f4;this[_0x186986(0xe9)](_0x4ad5a9,_0x36ebd6,_0x176395,_0x5355f4),this[_0x186986(0x165)]();},Sprite_Projectile['prototype']['setupPictureFrame']=function(){const _0x516c32=_0x3a048d,_0x4bba9c=VisuMZ['ActSeqProjectiles'][_0x516c32(0x14f)]['PictureAngleAdjust'];this[_0x516c32(0xce)]=_0x4bba9c*(Math['PI']/0xb4),this[_0x516c32(0x165)]();},Sprite_Projectile[_0x3a048d(0xe6)][_0x3a048d(0x165)]=function(){const _0x252a63=_0x3a048d;this[_0x252a63(0xf1)]=!![];},Sprite_Projectile[_0x3a048d(0xe6)]['update']=function(){const _0x37446a=_0x3a048d;Sprite[_0x37446a(0xe6)][_0x37446a(0xc1)]['call'](this);if(!this[_0x37446a(0xf1)])return;this[_0x37446a(0x127)]?'oROcb'==='DvIkT'?this[_0x37446a(0x146)](...arguments):this[_0x37446a(0x123)]():(this[_0x37446a(0xb6)](),this[_0x37446a(0xd8)]());},Sprite_Projectile[_0x3a048d(0xe6)][_0x3a048d(0x115)]=function(){const _0x56e8e8=_0x3a048d;return this[_0x56e8e8(0x15f)][_0x56e8e8(0x126)]&&this[_0x56e8e8(0x152)]&&this[_0x56e8e8(0x152)][_0x56e8e8(0x176)]();},Sprite_Projectile[_0x3a048d(0xe6)][_0x3a048d(0x123)]=function(){const _0x4812a3=_0x3a048d;if(!this['parent'])return;if(this[_0x4812a3(0x115)]()){this['updateSpin']();return;}this['parent']['removeChild'](this);if(this[_0x4812a3(0x152)]){const _0x2937a2=BattleManager[_0x4812a3(0xef)];_0x2937a2&&(_0x2937a2[_0x4812a3(0x17f)](this[_0x4812a3(0x152)]),delete this[_0x4812a3(0x152)]);}},Sprite_Projectile[_0x3a048d(0xe6)][_0x3a048d(0xb6)]=function(){const _0x53c492=_0x3a048d;if(this[_0x53c492(0x10f)]<0x0)return;this[_0x53c492(0x11b)]++;var _0x1be712=this[_0x53c492(0x11b)],_0x5b9a5c=this[_0x53c492(0xc6)],_0x41b765=this[_0x53c492(0x103)],_0x414819=this[_0x53c492(0x17d)],_0x470ee5=this[_0x53c492(0xf3)],_0x4384d6=this[_0x53c492(0x158)];_0x1be712/=_0x5b9a5c,_0x1be712=VisuMZ[_0x53c492(0xb7)](_0x1be712,this[_0x53c492(0x12d)][_0x53c492(0x131)]()[_0x53c492(0x12e)]());var _0x1c1974=this[_0x53c492(0x140)],_0x2dbec4=this['_moveCalcY'];this[_0x53c492(0x140)]=_0x41b765+_0x1be712*(_0x470ee5-_0x41b765),this[_0x53c492(0x160)]=_0x414819+_0x1be712*(_0x4384d6-_0x414819)-this['getPeak']();var _0xebaa10=this[_0x53c492(0x140)],_0x226322=this['_moveCalcY'];this[_0x53c492(0x16b)](_0x1c1974,_0xebaa10,_0x2dbec4,_0x226322),this['x']=Math['round'](this[_0x53c492(0x140)]),this['y']=Math['round'](this[_0x53c492(0x160)]),this[_0x53c492(0x10f)]--;if(this[_0x53c492(0x10f)]<0x0){this['x']=this[_0x53c492(0xf3)],this['y']=this[_0x53c492(0x158)],this[_0x53c492(0x127)]=!![];if(this[_0x53c492(0x152)])this['_animationSprite'][_0x53c492(0x127)]=!![];}},Sprite_Projectile[_0x3a048d(0xe6)][_0x3a048d(0x16b)]=function(_0x180d60,_0x22f909,_0x50a88f,_0x376e97){const _0x33827f=_0x3a048d;if(this[_0x33827f(0x15f)][_0x33827f(0x12b)]&&this[_0x33827f(0x15f)]['Extra']['AutoAngle']){var _0x397814=_0x22f909-_0x180d60,_0xca3123=_0x376e97-_0x50a88f,_0x1da02b=Math[_0x33827f(0x174)](_0xca3123,_0x397814);_0x1da02b+=this[_0x33827f(0x15f)][_0x33827f(0x12b)][_0x33827f(0xd9)]*(Math['PI']/0xb4),this[_0x33827f(0x104)]=_0x1da02b+this[_0x33827f(0xce)],this['_animationSprite']&&(this['_animationSprite']['_adjustedProjectileRadians']=this[_0x33827f(0x104)]);}},Sprite_Projectile[_0x3a048d(0xe6)][_0x3a048d(0x175)]=function(){const _0xc9544a=_0x3a048d;if(!this[_0xc9544a(0x15f)]['Extra'])return 0x0;if(this['_settings']['Extra'][_0xc9544a(0xf5)]===0x0)return 0x0;var _0x65a8f8=this[_0xc9544a(0xc6)]-this[_0xc9544a(0x10f)],_0x4a59f6=this[_0xc9544a(0xc6)]/0x2,_0x46c833=this[_0xc9544a(0x15f)][_0xc9544a(0x12b)]?this['_settings'][_0xc9544a(0x12b)][_0xc9544a(0xf5)]||0x0:0x0,_0x4b47c6=-_0x46c833/Math[_0xc9544a(0x111)](_0x4a59f6,0x2),_0x4e18bf=_0x4b47c6*Math[_0xc9544a(0x111)](_0x65a8f8-_0x4a59f6,0x2)+_0x46c833;return _0x4e18bf;},Sprite_Projectile[_0x3a048d(0xe6)]['updateSpin']=function(){const _0x58bdcc=_0x3a048d;if(!this[_0x58bdcc(0x15f)][_0x58bdcc(0x12b)])return;this[_0x58bdcc(0x167)]+=this[_0x58bdcc(0x15f)][_0x58bdcc(0x12b)][_0x58bdcc(0xe0)]||0x0;};