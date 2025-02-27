//=============================================================================
// VisuStella MZ - Action Sequence Camera
// VisuMZ_3_ActSeqCamera.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_ActSeqCamera = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ActSeqCamera = VisuMZ.ActSeqCamera || {};
VisuMZ.ActSeqCamera.version = 1.15;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.15] [ActSeqCamera]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Action_Sequence_Camera_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds new Action Sequences functions to the VisuStella MZ
 * Battle Core plugin to give you, the game dev, control over the battle camera
 * and zoom functions.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Attach the camera to a specific point on the screen.
 * * Attach the camera to a specific target(s) on the screen.
 * * Pan the camera to be off center using the offset functions.
 * * Remove camera clamping to let the camera go out of bounds.
 * * Set the camera zoom level as you want.
 * * Tilt the camera by adjust the angle.
 * * New Options added to let the player turn on/off the battle camera.
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
 * Spriteset Position Rewrite
 *
 * - The Spriteset_Battle function for updatePosition needed to be rewritten in
 * order to allow all the new features and functions added by the battle camera
 * and zoom.
 * 
 * - Camera tricks like zooming, panning, and tilting will be reset during the
 * input phase to ensure the player is able to see the whole battlefield.
 * 
 * - The player has the option to turn off the battle camera effects. If they
 * choose to turn it off, then all of this plugin's effects will be disabled
 * until they turn it back on. This is to give players control over how the
 * game visually appears in case they have motion sickness.
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
 * === Action Sequences - Angle (Camera) ===
 * 
 * These action sequences allow you to have control over the camera angle.
 * 
 * ---
 *
 * ANGLE: Change Angle
 * - Changes the camera angle.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Angle:
 *   - Change the camera angle to this many degrees.
 *
 *   Duration:
 *   - Duration in frames to change camera angle.
 *
 *   Angle Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Angle?:
 *   - Wait for angle changes to complete before performing next command?
 *
 * ---
 *
 * ANGLE: Reset Angle
 * - Reset any angle settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset camera angle.
 *
 *   Angle Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Angle?:
 *   - Wait for angle changes to complete before performing next command?
 *
 * ---
 *
 * ANGLE: Wait For Angle
 * - Waits for angle changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Camera Control ===
 *
 * These Action Sequences are battle camera-related.
 *
 * ---
 *
 * CAMERA: Clamp ON/OFF
 * - Turns battle camera clamping on/off.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Setting:
 *   - Turns camera clamping on/off.
 *
 * ---
 *
 * CAMERA: Focus Point
 * - Focus the battle camera on a certain point in the screen.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   X Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Focus Target(s)
 * - Focus the battle camera on certain battler target(s).
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Targets:
 *   - Select unit(s) to focus the battle camera on.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Offset
 * - Offset the battle camera from the focus target.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Offset X:
 *   - How much to offset the camera X by.
 *   - Negative: left. Positive: right.
 *
 *   Offset Y:
 *   - How much to offset the camera Y by.
 *   - Negative: up. Positive: down.
 *
 *   Duration:
 *   - Duration in frames for offset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Reset
 * - Reset the battle camera settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Reset Focus?:
 *   - Reset the focus point?
 *
 *   Reset Offset?:
 *   - Reset the camera offset?
 *
 *   Duration:
 *   - Duration in frames for reset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Wait For Camera
 * - Waits for camera changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 * 
 * === Action Sequences - Skew (Camera) ===
 * 
 * These action sequences allow you to have control over the camera skew.
 * 
 * ---
 *
 * SKEW: Change Skew
 * - Changes the camera skew.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Skew X:
 *   - Change the camera skew X to this value.
 *
 *   Skew Y:
 *   - Change the camera skew Y to this value.
 *
 *   Duration:
 *   - Duration in frames to change camera skew.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew changes to complete before performing next command?
 *
 * ---
 *
 * SKEW: Reset Skew
 * - Reset any skew settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset camera skew.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew changes to complete before performing next command?
 *
 * ---
 *
 * SKEW: Wait For Skew
 * - Waits for skew changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Zoom (Camera) ===
 *
 * These Action Sequences are zoom-related.
 *
 * ---
 *
 * ZOOM: Change Scale
 * - Changes the zoom scale.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Scale:
 *   - The zoom scale to change to.
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Reset Zoom
 * - Reset any zoom settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Wait For Zoom
 * - Waits for zoom changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Options Menu Settings
 * ============================================================================
 *
 * These plugin parameters add a new options command in order to let the player
 * decide if they want the battle camera ON or OFF.
 * 
 * The player has the option to turn off the battle camera effects. If they
 * choose to turn it off, then all of this plugin's effects will be disabled
 * until they turn it back on. This is to give players control over how the
 * game visually appears in case they have motion sickness.
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the Battle Camera options to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Options Name:
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
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.15: December 19, 2024
 * * Compatibility Update!
 * ** Added better support for MV-style animations when used against frontview
 *    actors.
 *
 * Version 1.14: October 17, 2024
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.13: March 14, 2024
 * * Updated Features!
 * ** Anti-tint is no longer forced. Update made by Irina.
 * 
 * Version 1.12: August 17, 2023
 * * Compatibility Update!
 * ** Added better compatibility with Action Sequence Projectiles when using MV
 *    animations for projectiles. Update made by Arisu.
 * 
 * Version 1.11: February 16, 2023
 * * Feature Update!
 * ** Added VisuMZ Core Engine version requirements for this plugin. If you are
 *    using an outdated Core Engine by at least 50 versions, this plugin will
 *    not work. Update made by Irina.
 * 
 * Version 1.10: January 20, 2023
 * * Bug Fixes!
 * ** Corrected the battlefield offset when positioned in specific zoom
 *    levels that would otherwise offset the algorithm. Fix made by Olivia.
 * ** Corrected and updated Anti-Tint UI animation offsets for MV animations.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Update made to be more compatibile with MZ v1.6.1's Effekseer version.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.09: September 22, 2022
 * * Bug Fixes!
 * ** Camera shift fixed when moving from a different scene aside from the map
 *    to battle. Fix made by Olivia.
 * 
 * Version 1.08: May 19, 2022
 * * Compatibility Update
 * ** Camera has a different Y buffer when using VisuMZ Sideview Battle UI.
 *    Update made by Olivia.
 * * Feature Update!
 * ** Smoother clamped zooming from 1.0 to 1.999. Update made by Olivia.
 * 
 * Version 1.07: April 21, 2022
 * * Feature Update!
 * ** Rebuild the animation container for Battle Core's Anti-Tint UI so that it
 *    works properly with MV animations and zoom in sideview. Update by Irina.
 * 
 * Version 1.06: April 14, 2022
 * * Compatibility Update!
 * ** Compatibility update with Anti-Tint UI feature in combination with MV-
 *    MV-related animations for non-sideview actors. Update made by Irina.
 * 
 * Version 1.05: April 7, 2022
 * * Compatibility Update!
 * ** Compatibility update with Anti-Tint UI feature in combination with zoom
 *    for MV-related animations. Update made by Irina.
 * 
 * Version 1.04: March 31, 2022
 * * Compatibility Update!
 * ** Compatibility update with Battle Core's new Anti-Tint UI feature for
 *    MV-related animations. Update made by Irina.
 * 
 * Version 1.03: January 6, 2022
 * * Compatibility Update!
 * ** The newly added MV Animation-support should now work properly with the
 *    Action Sequence Camera plugin. Update made by Irina.
 * 
 * Version 1.02: December 4, 2020
 * * Bug Fixes!
 * ** Show Pictures should now appear in the right positions. Fix by Irina.
 * 
 * Version 1.01: October 4, 2020
 * * Bug Fixes!
 * ** Damage offsets are now corrected and in line with the latest Battle Core
 *    version.
 *
 * Version 1.00: September 23, 2020
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
 * @param ActSeqCamera
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Options:struct
 * @text Options Menu
 * @type struct<Options>
 * @desc Settings for the Options Menu
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","OptionsName:str":"Battle Camera"}
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
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Options:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the Battle Camera options to the Options menu?
 * @default true
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
 * @param OptionsName:str
 * @text Options Name
 * @parent Options
 * @desc Command name of the option.
 * @default Battle Camera
 *
 */
//=============================================================================

const _0x5d2f7b=_0x38c2;function _0x38c2(_0x245c7d,_0x1cc37f){const _0x51ce62=_0x51ce();return _0x38c2=function(_0x38c2fd,_0x368416){_0x38c2fd=_0x38c2fd-0x1f2;let _0x482621=_0x51ce62[_0x38c2fd];return _0x482621;},_0x38c2(_0x245c7d,_0x1cc37f);}(function(_0x51923c,_0x512ecd){const _0x2114fd=_0x38c2,_0x1185ce=_0x51923c();while(!![]){try{const _0x45df93=-parseInt(_0x2114fd(0x242))/0x1*(parseInt(_0x2114fd(0x29b))/0x2)+parseInt(_0x2114fd(0x22d))/0x3+parseInt(_0x2114fd(0x289))/0x4+-parseInt(_0x2114fd(0x209))/0x5+parseInt(_0x2114fd(0x29c))/0x6+parseInt(_0x2114fd(0x291))/0x7+-parseInt(_0x2114fd(0x2a7))/0x8;if(_0x45df93===_0x512ecd)break;else _0x1185ce['push'](_0x1185ce['shift']());}catch(_0x12c3cd){_0x1185ce['push'](_0x1185ce['shift']());}}}(_0x51ce,0x5312d));var label=_0x5d2f7b(0x268),tier=tier||0x0,dependencies=[_0x5d2f7b(0x210),_0x5d2f7b(0x21e)],pluginData=$plugins[_0x5d2f7b(0x226)](function(_0x3767d4){const _0x55f5d0=_0x5d2f7b;return _0x3767d4[_0x55f5d0(0x23c)]&&_0x3767d4[_0x55f5d0(0x201)]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x5d2f7b(0x219)]||{},VisuMZ[_0x5d2f7b(0x211)]=function(_0x2807cf,_0x4fdfcf){const _0x1cb99e=_0x5d2f7b;for(const _0x4110c4 in _0x4fdfcf){if(_0x4110c4['match'](/(.*):(.*)/i)){const _0x5b5bc9=String(RegExp['$1']),_0xd0eab0=String(RegExp['$2'])[_0x1cb99e(0x202)]()[_0x1cb99e(0x204)]();let _0x2763ee,_0x10a79c,_0x335019;switch(_0xd0eab0){case'NUM':_0x2763ee=_0x4fdfcf[_0x4110c4]!==''?Number(_0x4fdfcf[_0x4110c4]):0x0;break;case _0x1cb99e(0x27b):_0x10a79c=_0x4fdfcf[_0x4110c4]!==''?JSON['parse'](_0x4fdfcf[_0x4110c4]):[],_0x2763ee=_0x10a79c[_0x1cb99e(0x299)](_0x34fe68=>Number(_0x34fe68));break;case _0x1cb99e(0x200):_0x2763ee=_0x4fdfcf[_0x4110c4]!==''?eval(_0x4fdfcf[_0x4110c4]):null;break;case'ARRAYEVAL':_0x10a79c=_0x4fdfcf[_0x4110c4]!==''?JSON[_0x1cb99e(0x2a9)](_0x4fdfcf[_0x4110c4]):[],_0x2763ee=_0x10a79c['map'](_0xa89888=>eval(_0xa89888));break;case'JSON':_0x2763ee=_0x4fdfcf[_0x4110c4]!==''?JSON['parse'](_0x4fdfcf[_0x4110c4]):'';break;case _0x1cb99e(0x273):_0x10a79c=_0x4fdfcf[_0x4110c4]!==''?JSON[_0x1cb99e(0x2a9)](_0x4fdfcf[_0x4110c4]):[],_0x2763ee=_0x10a79c[_0x1cb99e(0x299)](_0x120841=>JSON[_0x1cb99e(0x2a9)](_0x120841));break;case'FUNC':_0x2763ee=_0x4fdfcf[_0x4110c4]!==''?new Function(JSON[_0x1cb99e(0x2a9)](_0x4fdfcf[_0x4110c4])):new Function('return\x200');break;case _0x1cb99e(0x26d):_0x10a79c=_0x4fdfcf[_0x4110c4]!==''?JSON[_0x1cb99e(0x2a9)](_0x4fdfcf[_0x4110c4]):[],_0x2763ee=_0x10a79c['map'](_0x24984b=>new Function(JSON[_0x1cb99e(0x2a9)](_0x24984b)));break;case _0x1cb99e(0x1f7):_0x2763ee=_0x4fdfcf[_0x4110c4]!==''?String(_0x4fdfcf[_0x4110c4]):'';break;case'ARRAYSTR':_0x10a79c=_0x4fdfcf[_0x4110c4]!==''?JSON[_0x1cb99e(0x2a9)](_0x4fdfcf[_0x4110c4]):[],_0x2763ee=_0x10a79c[_0x1cb99e(0x299)](_0x2d6c5d=>String(_0x2d6c5d));break;case _0x1cb99e(0x254):_0x335019=_0x4fdfcf[_0x4110c4]!==''?JSON[_0x1cb99e(0x2a9)](_0x4fdfcf[_0x4110c4]):{},_0x2763ee=VisuMZ['ConvertParams']({},_0x335019);break;case _0x1cb99e(0x214):_0x10a79c=_0x4fdfcf[_0x4110c4]!==''?JSON[_0x1cb99e(0x2a9)](_0x4fdfcf[_0x4110c4]):[],_0x2763ee=_0x10a79c[_0x1cb99e(0x299)](_0x5b9aa8=>VisuMZ[_0x1cb99e(0x211)]({},JSON[_0x1cb99e(0x2a9)](_0x5b9aa8)));break;default:continue;}_0x2807cf[_0x5b5bc9]=_0x2763ee;}}return _0x2807cf;},(_0x2f6a31=>{const _0x19e67b=_0x5d2f7b,_0x54b6c2=_0x2f6a31[_0x19e67b(0x22e)];for(const _0x84af40 of dependencies){if(!Imported[_0x84af40]){alert(_0x19e67b(0x223)[_0x19e67b(0x216)](_0x54b6c2,_0x84af40)),SceneManager[_0x19e67b(0x218)]();break;}}const _0x2e51fa=_0x2f6a31['description'];if(_0x2e51fa[_0x19e67b(0x1f2)](/\[Version[ ](.*?)\]/i)){const _0x30a3ad=Number(RegExp['$1']);_0x30a3ad!==VisuMZ[label][_0x19e67b(0x28c)]&&(alert(_0x19e67b(0x287)[_0x19e67b(0x216)](_0x54b6c2,_0x30a3ad)),SceneManager[_0x19e67b(0x218)]());}if(_0x2e51fa[_0x19e67b(0x1f2)](/\[Tier[ ](\d+)\]/i)){const _0x1f082f=Number(RegExp['$1']);_0x1f082f<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x19e67b(0x216)](_0x54b6c2,_0x1f082f,tier)),SceneManager[_0x19e67b(0x218)]()):tier=Math['max'](_0x1f082f,tier);}VisuMZ[_0x19e67b(0x211)](VisuMZ[label][_0x19e67b(0x219)],_0x2f6a31[_0x19e67b(0x29d)]);})(pluginData);if(VisuMZ['CoreEngine'][_0x5d2f7b(0x28c)]<1.73){let text='';text+=_0x5d2f7b(0x28a),text+='in\x20order\x20for\x20VisuMZ_3_ActSeqCamera\x20to\x20work.',alert(text),SceneManager[_0x5d2f7b(0x218)]();}if(VisuMZ[_0x5d2f7b(0x20d)][_0x5d2f7b(0x28c)]<1.81){let text='';text+=_0x5d2f7b(0x25d),text+=_0x5d2f7b(0x29a),alert(text),SceneManager[_0x5d2f7b(0x218)]();}ConfigManager[_0x5d2f7b(0x256)]=!![],VisuMZ[_0x5d2f7b(0x268)][_0x5d2f7b(0x27e)]=ConfigManager['makeData'],ConfigManager[_0x5d2f7b(0x26e)]=function(){const _0x2b7254=_0x5d2f7b,_0x1b4205=VisuMZ[_0x2b7254(0x268)]['ConfigManager_makeData'][_0x2b7254(0x208)](this);return _0x1b4205[_0x2b7254(0x256)]=this[_0x2b7254(0x256)],_0x1b4205;},VisuMZ[_0x5d2f7b(0x268)][_0x5d2f7b(0x212)]=ConfigManager[_0x5d2f7b(0x1fe)],ConfigManager[_0x5d2f7b(0x1fe)]=function(_0x320669){const _0x1cbf6a=_0x5d2f7b;VisuMZ[_0x1cbf6a(0x268)][_0x1cbf6a(0x212)][_0x1cbf6a(0x208)](this,_0x320669),_0x1cbf6a(0x256)in _0x320669?this[_0x1cbf6a(0x256)]=_0x320669[_0x1cbf6a(0x256)]:this[_0x1cbf6a(0x256)]=!![];},TextManager[_0x5d2f7b(0x258)]=VisuMZ[_0x5d2f7b(0x268)]['Settings'][_0x5d2f7b(0x25a)][_0x5d2f7b(0x29f)],VisuMZ[_0x5d2f7b(0x268)]['BattleManager_setup']=BattleManager[_0x5d2f7b(0x1fa)],BattleManager[_0x5d2f7b(0x1fa)]=function(_0x5f05b5,_0x49534e,_0x1e7bd7){const _0x10c9b7=_0x5d2f7b;VisuMZ[_0x10c9b7(0x268)][_0x10c9b7(0x228)][_0x10c9b7(0x208)](this,_0x5f05b5,_0x49534e,_0x1e7bd7),this[_0x10c9b7(0x21d)]();},BattleManager['clearCameraFocusTargets']=function(){const _0x5df1b3=_0x5d2f7b;this[_0x5df1b3(0x253)]=[];},BattleManager[_0x5d2f7b(0x245)]=function(){const _0x2f2170=_0x5d2f7b;if(this['_cameraFocusTargets']===undefined)this[_0x2f2170(0x21d)]();return this[_0x2f2170(0x253)];},BattleManager[_0x5d2f7b(0x27a)]=function(_0x3940f1){const _0x5c2ff0=_0x5d2f7b;this[_0x5c2ff0(0x253)]=_0x3940f1[_0x5c2ff0(0x226)]((_0x17f988,_0xfdada8,_0x51b031)=>_0x51b031[_0x5c2ff0(0x230)](_0x17f988)===_0xfdada8);},BattleManager['cameraFocusTargetsX']=function(){const _0x42295e=_0x5d2f7b,_0x4aeb69=this[_0x42295e(0x245)]();if(_0x4aeb69[_0x42295e(0x217)]<=0x0)return Math[_0x42295e(0x28e)](Graphics['width']/0x2);let _0x4c6dfe=_0x4aeb69['reduce']((_0xd31a0b,_0x1c9a7d)=>_0xd31a0b+=_0x1c9a7d[_0x42295e(0x2a2)]()['x'],0x0)/_0x4aeb69['length'];return _0x4c6dfe+=Math[_0x42295e(0x28e)]((Graphics[_0x42295e(0x22b)]-Graphics[_0x42295e(0x23a)])/0x2),_0x4c6dfe;},BattleManager[_0x5d2f7b(0x293)]=function(){const _0x2b59f2=_0x5d2f7b,_0x8ee28b=this[_0x2b59f2(0x245)]();if(_0x8ee28b[_0x2b59f2(0x217)]<=0x0)return Math[_0x2b59f2(0x28e)](Graphics['height']/0x2);let _0x1a9fc2=_0x8ee28b['reduce']((_0x4bf853,_0x34d118)=>_0x4bf853+=_0x34d118[_0x2b59f2(0x2a2)]()['y']-Math[_0x2b59f2(0x28e)](_0x34d118['battler']()[_0x2b59f2(0x29e)]/0x2),0x0)/_0x8ee28b[_0x2b59f2(0x217)];return _0x1a9fc2+=Math[_0x2b59f2(0x28e)]((Graphics[_0x2b59f2(0x29e)]-Graphics[_0x2b59f2(0x270)])/0x2),_0x1a9fc2;},VisuMZ[_0x5d2f7b(0x268)]['Game_Screen_clear']=Game_Screen[_0x5d2f7b(0x27d)][_0x5d2f7b(0x1f5)],Game_Screen[_0x5d2f7b(0x27d)]['clear']=function(){const _0x28bf19=_0x5d2f7b;VisuMZ[_0x28bf19(0x268)]['Game_Screen_clear'][_0x28bf19(0x208)](this),this[_0x28bf19(0x21f)]();},Game_Screen[_0x5d2f7b(0x27d)][_0x5d2f7b(0x21f)]=function(){const _0x250204=_0x5d2f7b;this[_0x250204(0x1f3)]=this['initialBattleCameraSettings']();},Game_Screen[_0x5d2f7b(0x27d)][_0x5d2f7b(0x26f)]=function(){const _0x10ceed=_0x5d2f7b,_0x5bab02=$dataSystem[_0x10ceed(0x285)][_0x10ceed(0x1fd)],_0x1d7af0=$dataSystem['advanced'][_0x10ceed(0x251)];return{'angle':0x0,'angleTarget':0x0,'angleDuration':0x0,'angleWholeDuration':0x0,'angleEasing':_0x10ceed(0x21b),'cameraFocusTarget':![],'cameraX':Math[_0x10ceed(0x28e)](_0x5bab02/0x2),'cameraY':Math['round'](_0x1d7af0/0x2),'cameraXTarget':Math[_0x10ceed(0x28e)](_0x5bab02/0x2),'cameraYTarget':Math['round'](_0x1d7af0/0x2),'cameraDuration':0x0,'cameraDurationWhole':0x0,'cameraEasing':_0x10ceed(0x21b),'cameraClamp':!![],'cameraOffsetX':0x0,'cameraOffsetY':0x0,'cameraOffsetXTarget':0x0,'cameraOffsetYTarget':0x0,'cameraOffsetDuration':0x0,'cameraOffsetDurationWhole':0x0,'cameraOffsetEasing':_0x10ceed(0x21b),'skewX':0x0,'skewTargetX':0x0,'skewY':0x0,'skewTargetY':0x0,'skewDuration':0x0,'skewWholeDuration':0x0,'skewEasing':'InOutSine','zoomScale':0x1,'zoomScaleTarget':0x1,'zoomDuration':0x0,'zoomWholeDuration':0x0,'zoomEasing':_0x10ceed(0x21b)};},Game_Screen[_0x5d2f7b(0x27d)]['battleCameraData']=function(){const _0x14aef2=_0x5d2f7b;if(this['_battleCamera']===undefined)this[_0x14aef2(0x21f)]();if(!ConfigManager[_0x14aef2(0x256)])return this[_0x14aef2(0x26f)]();return this[_0x14aef2(0x1f3)];},VisuMZ[_0x5d2f7b(0x268)][_0x5d2f7b(0x2a6)]=Game_Screen['prototype']['update'],Game_Screen[_0x5d2f7b(0x27d)]['update']=function(){const _0x37bfb4=_0x5d2f7b;VisuMZ[_0x37bfb4(0x268)]['Game_Screen_update'][_0x37bfb4(0x208)](this),this['updateBattleAngle'](),this[_0x37bfb4(0x244)](),this[_0x37bfb4(0x1f6)](),this[_0x37bfb4(0x22f)](),this['updateBattleZoom']();},Game_Screen['prototype']['setBattleAngle']=function(_0x1847b8,_0x9fb030,_0x1c7fe8){const _0x2e3d11=_0x5d2f7b,_0x1de252=this[_0x2e3d11(0x237)]();_0x1de252[_0x2e3d11(0x281)]=-_0x1847b8,_0x1de252[_0x2e3d11(0x279)]=_0x9fb030,_0x1de252['angleWholeDuration']=_0x9fb030,_0x1de252['angleEasing']=_0x1c7fe8;},Game_Screen[_0x5d2f7b(0x27d)][_0x5d2f7b(0x2a0)]=function(){const _0x67f5b=_0x5d2f7b;if(!SceneManager['isSceneBattle']())return;const _0x424b16=this[_0x67f5b(0x237)](),_0x29c6d9=_0x424b16[_0x67f5b(0x279)],_0x546d2b=_0x424b16[_0x67f5b(0x25c)],_0x426261=_0x424b16[_0x67f5b(0x24d)];_0x29c6d9>0x0?(_0x424b16[_0x67f5b(0x203)]=this[_0x67f5b(0x231)](_0x424b16[_0x67f5b(0x203)],_0x424b16['angleTarget'],_0x29c6d9,_0x546d2b,_0x426261),_0x424b16[_0x67f5b(0x279)]--):_0x424b16[_0x67f5b(0x203)]=_0x424b16[_0x67f5b(0x281)];},Game_Screen[_0x5d2f7b(0x27d)][_0x5d2f7b(0x24c)]=function(_0x5be32a,_0x244be4,_0x365f55,_0x2fd01f){const _0x2a2cae=_0x5d2f7b,_0x21b360=this[_0x2a2cae(0x237)]();_0x21b360[_0x2a2cae(0x21c)]=![],_0x21b360[_0x2a2cae(0x267)]=Math['round'](_0x5be32a),_0x21b360[_0x2a2cae(0x24e)]=Math[_0x2a2cae(0x28e)](_0x244be4),_0x21b360['cameraDuration']=_0x365f55,_0x21b360[_0x2a2cae(0x249)]=_0x365f55,_0x21b360[_0x2a2cae(0x229)]=_0x2fd01f;},Game_Screen[_0x5d2f7b(0x27d)]['setBattleCameraTargets']=function(_0x299fb8,_0x1e0ebe,_0x253bb6){const _0x295cf1=_0x5d2f7b;if(_0x299fb8['length']<=0x0)return;const _0x3ff36a=this['battleCameraData']();_0x3ff36a[_0x295cf1(0x21c)]=!![],BattleManager['setCameraFocusTargets'](_0x299fb8),_0x3ff36a[_0x295cf1(0x1fc)]=_0x1e0ebe,_0x3ff36a[_0x295cf1(0x249)]=_0x1e0ebe,_0x3ff36a['cameraEasing']=_0x253bb6;},Game_Screen['prototype'][_0x5d2f7b(0x244)]=function(){const _0x22943b=_0x5d2f7b;if(!SceneManager[_0x22943b(0x246)]())return;const _0x5f4f20=this['battleCameraData'](),_0x4ee54f=_0x5f4f20[_0x22943b(0x1fc)],_0x1041b9=_0x5f4f20[_0x22943b(0x249)],_0x316fb6=_0x5f4f20['cameraEasing'];_0x5f4f20[_0x22943b(0x21c)]&&(_0x5f4f20['cameraXTarget']=BattleManager[_0x22943b(0x222)](),_0x5f4f20[_0x22943b(0x24e)]=BattleManager[_0x22943b(0x293)]()),_0x4ee54f>0x0?(_0x5f4f20[_0x22943b(0x278)]=this[_0x22943b(0x231)](_0x5f4f20[_0x22943b(0x278)],_0x5f4f20[_0x22943b(0x267)],_0x4ee54f,_0x1041b9,_0x316fb6),_0x5f4f20[_0x22943b(0x20b)]=this[_0x22943b(0x231)](_0x5f4f20[_0x22943b(0x20b)],_0x5f4f20[_0x22943b(0x24e)],_0x4ee54f,_0x1041b9,_0x316fb6),_0x5f4f20[_0x22943b(0x1fc)]--):(_0x5f4f20['cameraX']=_0x5f4f20['cameraXTarget'],_0x5f4f20['cameraY']=_0x5f4f20[_0x22943b(0x24e)]);},Game_Screen[_0x5d2f7b(0x27d)]['setBattleCameraOffset']=function(_0x76c384,_0x500397,_0x124e8a,_0x245e65){const _0x295fa2=_0x5d2f7b,_0x387165=this['battleCameraData']();_0x387165[_0x295fa2(0x26a)]=Math[_0x295fa2(0x28e)](_0x76c384),_0x387165['cameraOffsetYTarget']=Math[_0x295fa2(0x28e)](_0x500397),_0x387165[_0x295fa2(0x290)]=_0x124e8a,_0x387165[_0x295fa2(0x1fb)]=_0x124e8a,_0x387165[_0x295fa2(0x25f)]=_0x245e65;},Game_Screen['prototype']['updateBattleCameraOffset']=function(){const _0x256360=_0x5d2f7b;if(!SceneManager[_0x256360(0x246)]())return;const _0x339e1a=this[_0x256360(0x237)](),_0x46418a=_0x339e1a[_0x256360(0x290)],_0x20f904=_0x339e1a[_0x256360(0x1fb)],_0x3a9615=_0x339e1a['cameraOffsetEasing'];_0x46418a>0x0?(_0x339e1a['cameraOffsetX']=this[_0x256360(0x231)](_0x339e1a[_0x256360(0x25e)],_0x339e1a['cameraOffsetXTarget'],_0x46418a,_0x20f904,_0x3a9615),_0x339e1a['cameraOffsetY']=this[_0x256360(0x231)](_0x339e1a[_0x256360(0x2a5)],_0x339e1a[_0x256360(0x239)],_0x46418a,_0x20f904,_0x3a9615),_0x339e1a[_0x256360(0x290)]--):(_0x339e1a['cameraOffsetX']=_0x339e1a[_0x256360(0x26a)],_0x339e1a[_0x256360(0x2a5)]=_0x339e1a[_0x256360(0x239)]);},Game_Screen[_0x5d2f7b(0x27d)][_0x5d2f7b(0x1ff)]=function(_0xec3561,_0x1810e6,_0xada6dc,_0x467cd5){const _0x57abe0=_0x5d2f7b,_0x11762e=this[_0x57abe0(0x237)]();_0x11762e[_0x57abe0(0x243)]=_0xec3561,_0x11762e[_0x57abe0(0x288)]=_0x1810e6,_0x11762e['skewDuration']=_0xada6dc,_0x11762e[_0x57abe0(0x22c)]=_0xada6dc,_0x11762e[_0x57abe0(0x272)]=_0x467cd5;},Game_Screen['prototype']['updateBattleSkew']=function(){const _0x17945a=_0x5d2f7b;if(!SceneManager[_0x17945a(0x246)]())return;const _0x54916f=this[_0x17945a(0x237)](),_0x480acc=_0x54916f[_0x17945a(0x263)],_0x1e66da=_0x54916f[_0x17945a(0x22c)],_0xc31ccf=_0x54916f[_0x17945a(0x272)];_0x480acc>0x0?(_0x54916f[_0x17945a(0x247)]=this[_0x17945a(0x231)](_0x54916f[_0x17945a(0x247)],_0x54916f[_0x17945a(0x243)],_0x480acc,_0x1e66da,_0xc31ccf),_0x54916f[_0x17945a(0x274)]=this[_0x17945a(0x231)](_0x54916f[_0x17945a(0x274)],_0x54916f['skewTargetY'],_0x480acc,_0x1e66da,_0xc31ccf),_0x54916f[_0x17945a(0x263)]--):(_0x54916f[_0x17945a(0x247)]=_0x54916f[_0x17945a(0x243)],_0x54916f['skewY']=_0x54916f[_0x17945a(0x288)]);},Game_Screen[_0x5d2f7b(0x27d)][_0x5d2f7b(0x265)]=function(_0x554bc7,_0x2f6bc6,_0x52d988){const _0x42195c=_0x5d2f7b,_0x9e6b0f=this[_0x42195c(0x237)]();_0x9e6b0f[_0x42195c(0x296)]=_0x554bc7,_0x9e6b0f['zoomDuration']=_0x2f6bc6,_0x9e6b0f[_0x42195c(0x27c)]=_0x2f6bc6,_0x9e6b0f[_0x42195c(0x297)]=_0x52d988,console[_0x42195c(0x205)](_0x554bc7);},Game_Screen[_0x5d2f7b(0x27d)][_0x5d2f7b(0x2aa)]=function(){const _0x58b53f=_0x5d2f7b;if(!SceneManager[_0x58b53f(0x246)]())return;const _0x1af89f=this[_0x58b53f(0x237)](),_0x5022be=_0x1af89f[_0x58b53f(0x220)],_0x15baaa=_0x1af89f[_0x58b53f(0x27c)],_0x4b89f5=_0x1af89f[_0x58b53f(0x297)];_0x5022be>0x0?(_0x1af89f['zoomScale']=this['applyEasing'](_0x1af89f[_0x58b53f(0x23b)],_0x1af89f[_0x58b53f(0x296)],_0x5022be,_0x15baaa,_0x4b89f5),_0x1af89f[_0x58b53f(0x220)]--):_0x1af89f[_0x58b53f(0x23b)]=_0x1af89f[_0x58b53f(0x296)];},Game_Screen['prototype'][_0x5d2f7b(0x231)]=function(_0x342b8b,_0x5571a9,_0x5a2cf0,_0x2ce0e4,_0x57ed29){const _0x267215=_0x5d2f7b,_0x18368a=VisuMZ[_0x267215(0x221)]((_0x2ce0e4-_0x5a2cf0)/_0x2ce0e4,_0x57ed29||'Linear'),_0x5104d2=VisuMZ['ApplyEasing']((_0x2ce0e4-_0x5a2cf0+0x1)/_0x2ce0e4,_0x57ed29||_0x267215(0x292)),_0x57d421=(_0x342b8b-_0x5571a9*_0x18368a)/(0x1-_0x18368a);return _0x57d421+(_0x5571a9-_0x57d421)*_0x5104d2;},VisuMZ['ActSeqCamera'][_0x5d2f7b(0x2a3)]=Scene_Options['prototype']['maxCommands'],Scene_Options['prototype']['maxCommands']=function(){const _0x3d0a7e=_0x5d2f7b;let _0x56c72c=VisuMZ['ActSeqCamera'][_0x3d0a7e(0x2a3)][_0x3d0a7e(0x208)](this);const _0x1b236a=VisuMZ['ActSeqCamera'][_0x3d0a7e(0x219)];if(_0x1b236a['Options'][_0x3d0a7e(0x224)]&&_0x1b236a['Options'][_0x3d0a7e(0x262)])_0x56c72c++;return _0x56c72c;},VisuMZ[_0x5d2f7b(0x268)][_0x5d2f7b(0x1f4)]=Sprite_Battler[_0x5d2f7b(0x27d)][_0x5d2f7b(0x233)],Sprite_Battler[_0x5d2f7b(0x27d)][_0x5d2f7b(0x233)]=function(){const _0x251b45=_0x5d2f7b;let _0x22b9a2=VisuMZ[_0x251b45(0x268)]['Sprite_Battler_damageOffsetX']['call'](this);return _0x22b9a2+=Math[_0x251b45(0x28e)]((Graphics[_0x251b45(0x22b)]-Graphics[_0x251b45(0x23a)])/0x2),_0x22b9a2;},VisuMZ[_0x5d2f7b(0x268)][_0x5d2f7b(0x282)]=Sprite_Battler[_0x5d2f7b(0x27d)][_0x5d2f7b(0x2a4)],Sprite_Battler[_0x5d2f7b(0x27d)][_0x5d2f7b(0x2a4)]=function(){const _0x2738b2=_0x5d2f7b;let _0x36f9ef=VisuMZ[_0x2738b2(0x268)][_0x2738b2(0x282)][_0x2738b2(0x208)](this);return _0x36f9ef+=Math[_0x2738b2(0x28e)]((Graphics[_0x2738b2(0x29e)]-Graphics[_0x2738b2(0x270)])/0x2),_0x36f9ef;},VisuMZ[_0x5d2f7b(0x268)][_0x5d2f7b(0x298)]=Sprite_Animation[_0x5d2f7b(0x27d)]['updateEffectGeometry'],Sprite_Animation[_0x5d2f7b(0x27d)][_0x5d2f7b(0x28b)]=function(){const _0x1ea69a=_0x5d2f7b,_0x3e9921=this[_0x1ea69a(0x276)]['scale'];if(SceneManager[_0x1ea69a(0x264)][_0x1ea69a(0x23f)]){const _0x4e5842=SceneManager[_0x1ea69a(0x264)][_0x1ea69a(0x23f)];this[_0x1ea69a(0x276)][_0x1ea69a(0x294)]*=_0x4e5842[_0x1ea69a(0x294)]['x'];}VisuMZ[_0x1ea69a(0x268)][_0x1ea69a(0x298)][_0x1ea69a(0x208)](this),this['_animation'][_0x1ea69a(0x294)]=_0x3e9921;},VisuMZ[_0x5d2f7b(0x268)][_0x5d2f7b(0x234)]=Sprite_AnimationMV[_0x5d2f7b(0x27d)]['updatePosition'],Sprite_AnimationMV[_0x5d2f7b(0x27d)]['updatePosition']=function(){const _0x7dca06=_0x5d2f7b;VisuMZ[_0x7dca06(0x268)][_0x7dca06(0x234)][_0x7dca06(0x208)](this);if(!SceneManager[_0x7dca06(0x246)]())return;if(this[_0x7dca06(0x24b)])return;if(this['_animation'][_0x7dca06(0x235)]!==0x3&&!$gameSystem['isSideView']()){const _0x1b9926=this[_0x7dca06(0x284)][0x0],_0x2c9389=_0x1b9926['_battler']||null;if(_0x2c9389&&_0x2c9389[_0x7dca06(0x248)]())return;}if(Spriteset_Battle[_0x7dca06(0x227)]){if(this[_0x7dca06(0x20e)]&&this[_0x7dca06(0x20e)]())return;this['x']-=SceneManager[_0x7dca06(0x264)]['_spriteset'][_0x7dca06(0x22b)]/0x2,this['y']-=SceneManager['_scene']['_spriteset'][_0x7dca06(0x29e)]/0x2;}else this['x']+=SceneManager[_0x7dca06(0x264)]['_spriteset']['width']/0x2,this['y']+=SceneManager[_0x7dca06(0x264)]['_spriteset'][_0x7dca06(0x29e)]/0x2;},Sprite_AnimationMV[_0x5d2f7b(0x27d)]['isCenteredAnimation']=function(){const _0x3b54ee=_0x5d2f7b;return this['_animation'][_0x3b54ee(0x235)]===0x3;},Sprite_AnimationMV[_0x5d2f7b(0x27d)][_0x5d2f7b(0x280)]=function(){const _0x26ceca=_0x5d2f7b;return this[_0x26ceca(0x284)][_0x26ceca(0x217)]>0x0;},Sprite_AnimationMV[_0x5d2f7b(0x27d)][_0x5d2f7b(0x1f9)]=function(){const _0x327872=_0x5d2f7b;if(!$gameSystem[_0x327872(0x23e)]()){const _0x14c184=this['_targets'][0x0];if(_0x14c184[_0x327872(0x2a8)]===Sprite_Actor)return![];}return!![];},VisuMZ[_0x5d2f7b(0x268)][_0x5d2f7b(0x295)]=Spriteset_Battle[_0x5d2f7b(0x27d)][_0x5d2f7b(0x241)],Spriteset_Battle[_0x5d2f7b(0x27d)][_0x5d2f7b(0x241)]=function(){const _0x2830f7=_0x5d2f7b;VisuMZ[_0x2830f7(0x268)][_0x2830f7(0x295)][_0x2830f7(0x208)](this),this[_0x2830f7(0x20c)]=undefined,this[_0x2830f7(0x1f8)]=undefined;},VisuMZ[_0x5d2f7b(0x268)][_0x5d2f7b(0x275)]=Spriteset_Battle['prototype']['createLowerLayer'],Spriteset_Battle['prototype'][_0x5d2f7b(0x286)]=function(){const _0x2b6b14=_0x5d2f7b;VisuMZ['ActSeqCamera']['Spriteset_Battle_createLowerLayer']['call'](this),this[_0x2b6b14(0x20a)]();},Spriteset_Battle[_0x5d2f7b(0x27d)][_0x5d2f7b(0x20a)]=function(){const _0x4f9300=_0x5d2f7b;if(Spriteset_Battle[_0x4f9300(0x260)])return;const _0x4f7000=-Math['ceil'](Graphics[_0x4f9300(0x22b)]/0x2),_0x56aea7=-Math[_0x4f9300(0x259)](Graphics[_0x4f9300(0x29e)]/0x2);this[_0x4f9300(0x238)]['x']=0.5,this[_0x4f9300(0x238)]['y']=0.5;const _0x4c67bc=[this[_0x4f9300(0x255)],this['_damageContainer']];_0x4c67bc[_0x4f9300(0x277)](this[_0x4f9300(0x271)]);for(const _0xb3f27d of _0x4c67bc){if(!_0xb3f27d)continue;_0xb3f27d['x']=_0x4f7000,_0xb3f27d['y']=_0x56aea7;}},Spriteset_Battle[_0x5d2f7b(0x27d)][_0x5d2f7b(0x21a)]=function(){const _0x48cd53=_0x5d2f7b;this[_0x48cd53(0x252)](),this[_0x48cd53(0x20f)](),this['updatePositionZoom'](),this[_0x48cd53(0x236)](),this[_0x48cd53(0x261)]();},Spriteset_Battle[_0x5d2f7b(0x27d)][_0x5d2f7b(0x252)]=function(){const _0x4f3c6c=_0x5d2f7b,_0x1e91d1=this[_0x4f3c6c(0x257)]();this[_0x4f3c6c(0x203)]=_0x1e91d1;},Spriteset_Battle['prototype'][_0x5d2f7b(0x257)]=function(){const _0x572651=_0x5d2f7b;if(!ConfigManager[_0x572651(0x256)])return 0x0;if(BattleManager[_0x572651(0x24f)]())return 0x0;return $gameScreen[_0x572651(0x237)]()[_0x572651(0x203)];},Spriteset_Battle['prototype'][_0x5d2f7b(0x20f)]=function(){const _0x14c2b6=_0x5d2f7b;if(BattleManager[_0x14c2b6(0x24f)]()||!ConfigManager[_0x14c2b6(0x256)])this['skew']['x']=0x0,this[_0x14c2b6(0x232)]['y']=0x0;else{const _0x2472e2=$gameScreen[_0x14c2b6(0x237)]();this[_0x14c2b6(0x232)]['x']=_0x2472e2[_0x14c2b6(0x247)],this[_0x14c2b6(0x232)]['y']=_0x2472e2[_0x14c2b6(0x274)];}},Spriteset_Battle[_0x5d2f7b(0x27d)][_0x5d2f7b(0x28f)]=function(){const _0x4fce58=_0x5d2f7b,_0x4aadc8=this[_0x4fce58(0x23d)]();this[_0x4fce58(0x294)]['x']=this[_0x4fce58(0x294)]['y']=_0x4aadc8;},Spriteset_Battle[_0x5d2f7b(0x27d)][_0x5d2f7b(0x23d)]=function(){const _0x19d346=_0x5d2f7b;if(!ConfigManager['battleCamera'])return 0x1;if(BattleManager[_0x19d346(0x24f)]())return 0x1;return $gameScreen[_0x19d346(0x237)]()['zoomScale'];},Spriteset_Battle[_0x5d2f7b(0x27d)]['updatePositionCamera']=function(){const _0x6eb39b=_0x5d2f7b;BattleManager[_0x6eb39b(0x24f)]()||!ConfigManager[_0x6eb39b(0x256)]?this['updatePositionCameraNeutral']():Spriteset_Battle[_0x6eb39b(0x260)]?this[_0x6eb39b(0x207)]():this[_0x6eb39b(0x240)]();},Spriteset_Battle[_0x5d2f7b(0x27d)][_0x5d2f7b(0x225)]=function(){const _0x3ad679=_0x5d2f7b;if(this[_0x3ad679(0x22a)]!==undefined)return this['_battleFieldCameraY'];return this[_0x3ad679(0x22a)]=(Graphics[_0x3ad679(0x29e)]-Graphics['boxHeight'])/0x2-this[_0x3ad679(0x28d)](),this['_battleFieldCameraY'];},Spriteset_Battle[_0x5d2f7b(0x27d)]['updatePositionCameraNeutral']=function(){const _0xa2b145=_0x5d2f7b;if(Spriteset_Battle[_0xa2b145(0x260)])return;this[_0xa2b145(0x213)]['y']=this[_0xa2b145(0x225)](),this['x']=Math[_0xa2b145(0x28e)](Graphics['width']/0x2),this['y']=Math[_0xa2b145(0x28e)](Graphics[_0xa2b145(0x29e)]/0x2);},Spriteset_Battle[_0x5d2f7b(0x27d)][_0x5d2f7b(0x207)]=function(){const _0x10567e=_0x5d2f7b,_0x409704=$gameScreen['battleCameraData'](),_0x102e13=this[_0x10567e(0x24a)](),_0xf0e06f=this[_0x10567e(0x23d)]();let _0x318a4a=-(_0x409704[_0x10567e(0x278)]+_0x409704[_0x10567e(0x25e)])*_0xf0e06f+Graphics[_0x10567e(0x22b)]/0x2,_0x4ff463=-(_0x409704[_0x10567e(0x20b)]+_0x409704[_0x10567e(0x2a5)])*_0xf0e06f+Graphics[_0x10567e(0x29e)]/0x2;if(_0x102e13&&_0xf0e06f>=0x1){const _0x48246c=-Graphics[_0x10567e(0x22b)]*_0xf0e06f+Graphics[_0x10567e(0x22b)]/0x2,_0x382807=-Graphics[_0x10567e(0x29e)]*_0xf0e06f+Graphics['height']/0x2;this['x']=Math['round'](_0x318a4a[_0x10567e(0x266)](_0x48246c,0x0)),this['y']=Math['round'](_0x4ff463[_0x10567e(0x266)](_0x382807,0x0));}else _0x102e13&&_0xf0e06f<0x1?(this['x']=Math[_0x10567e(0x28e)]((Graphics[_0x10567e(0x22b)]-Graphics['width']*_0xf0e06f)/0x2),this['y']=Math[_0x10567e(0x28e)]((Graphics['height']-Graphics[_0x10567e(0x29e)]*_0xf0e06f)/0x2)):(this['x']=Math[_0x10567e(0x28e)](_0x318a4a),this['y']=Math['round'](_0x4ff463));},Spriteset_Battle[_0x5d2f7b(0x260)]=![],Spriteset_Battle[_0x5d2f7b(0x27d)]['battleFieldOffsetY']=function(){const _0x408480=_0x5d2f7b;return Imported['VisuMZ_3_SideviewBattleUI']&&BattleManager[_0x408480(0x25b)]()?0x0:0x18;},Spriteset_Battle[_0x5d2f7b(0x27d)][_0x5d2f7b(0x240)]=function(){const _0x239fdb=_0x5d2f7b;let _0x577c4e=this[_0x239fdb(0x24a)](),_0x45ba71=this[_0x239fdb(0x23d)]();const _0x471974=Graphics[_0x239fdb(0x22b)]/0x2,_0x139733=Graphics[_0x239fdb(0x29e)]/0x2;if(_0x577c4e&&_0x45ba71<=0x1){this['x']=Math[_0x239fdb(0x28e)](_0x471974),this['y']=Math[_0x239fdb(0x28e)](_0x139733);return;}const _0x325e12=$gameScreen[_0x239fdb(0x237)]();let _0x576672=-(_0x325e12['cameraX']+_0x325e12[_0x239fdb(0x25e)])+Graphics['width'];_0x576672-=(0x1-_0x45ba71)*(_0x471974-_0x325e12['cameraX']-_0x325e12[_0x239fdb(0x25e)]);let _0x1f61b9=-(_0x325e12[_0x239fdb(0x20b)]+_0x325e12[_0x239fdb(0x2a5)])+Graphics[_0x239fdb(0x29e)];this[_0x239fdb(0x213)]['y']=this[_0x239fdb(0x225)]();const _0x1e0b84=this[_0x239fdb(0x213)]['y']*0x2-Math['round']((Graphics[_0x239fdb(0x29e)]-Graphics[_0x239fdb(0x270)])/0x2);_0x1f61b9+=_0x1e0b84*(0x1-_0x45ba71),_0x1f61b9-=(0x1-_0x45ba71)*(_0x139733-_0x325e12['cameraY']-_0x325e12[_0x239fdb(0x2a5)]);const _0x41e9d2=Imported['VisuMZ_3_SideviewBattleUI']&&BattleManager[_0x239fdb(0x25b)]();if(!_0x41e9d2){const _0xfafc0c=SceneManager[_0x239fdb(0x264)][_0x239fdb(0x206)]();_0x1f61b9-=_0xfafc0c/0x2*Math[_0x239fdb(0x26b)](0x1,Math[_0x239fdb(0x250)](_0x45ba71-0x1));}if(_0x577c4e){if(_0x45ba71>0x1){const _0x10ee7a=Graphics['width']-_0x471974*_0x45ba71,_0x497690=_0x471974*_0x45ba71;_0x576672=_0x576672[_0x239fdb(0x266)](_0x10ee7a,_0x497690);const _0x16e3f1=Graphics[_0x239fdb(0x29e)]-_0x139733*_0x45ba71,_0x2ffeea=_0x139733*_0x45ba71;_0x1f61b9=_0x1f61b9[_0x239fdb(0x266)](_0x16e3f1,_0x2ffeea);}else _0x45ba71<=0x1&&(_0x576672=_0x471974,_0x1f61b9=_0x139733);}this['x']=Math[_0x239fdb(0x28e)](_0x576672),this['y']=Math['round'](_0x1f61b9);},Spriteset_Battle['prototype'][_0x5d2f7b(0x24a)]=function(){const _0x5700ba=_0x5d2f7b;if(!ConfigManager[_0x5700ba(0x256)])return!![];if(BattleManager[_0x5700ba(0x24f)]())return!![];return $gameScreen[_0x5700ba(0x237)]()[_0x5700ba(0x27f)];},Spriteset_Battle[_0x5d2f7b(0x27d)][_0x5d2f7b(0x261)]=function(){const _0x15a904=_0x5d2f7b;this['x']+=Math[_0x15a904(0x28e)]($gameScreen[_0x15a904(0x269)]()),Imported[_0x15a904(0x210)]&&this['updatePositionCoreEngine']&&this[_0x15a904(0x2a1)]();},VisuMZ[_0x5d2f7b(0x268)]['Window_Options_addGeneralOptions']=Window_Options['prototype']['addGeneralOptions'],Window_Options[_0x5d2f7b(0x27d)]['addGeneralOptions']=function(){const _0x739b13=_0x5d2f7b;VisuMZ[_0x739b13(0x268)][_0x739b13(0x283)][_0x739b13(0x208)](this),this['addBattleCameraCommands']();},Window_Options[_0x5d2f7b(0x27d)][_0x5d2f7b(0x215)]=function(){const _0x3e804b=_0x5d2f7b;VisuMZ[_0x3e804b(0x268)]['Settings']['Options'][_0x3e804b(0x224)]&&this[_0x3e804b(0x26c)]();},Window_Options[_0x5d2f7b(0x27d)][_0x5d2f7b(0x26c)]=function(){const _0x1d040c=_0x5d2f7b,_0x5ccc38=TextManager['battleCameraOption'],_0x15fff5=_0x1d040c(0x256);this['addCommand'](_0x5ccc38,_0x15fff5);};function _0x51ce(){const _0x54c71f=['176916HmZLsy','name','updateBattleSkew','indexOf','applyEasing','skew','damageOffsetX','Sprite_AnimationMV_updatePosition','position','updatePositionCamera','battleCameraData','anchor','cameraOffsetYTarget','boxWidth','zoomScale','status','getBattleZoom','isSideView','_spriteset','updatePositionCameraRoamNew','initialize','99809iotqbF','skewTargetX','updateBattleCamera','cameraFocusTargets','isSceneBattle','skewX','isActor','cameraDurationWhole','getBattleCameraClamp','_isProjectile','setBattleCameraPoint','angleEasing','cameraYTarget','isInputting','sqrt','screenHeight','updatePositionAngle','_cameraFocusTargets','STRUCT','_baseSprite','battleCamera','getBattleAngle','battleCameraOption','ceil','Options','isUsingSideviewUiLayout','angleWholeDuration','VisuMZ_1_BattleCore\x20needs\x20to\x20be\x20updated\x20','cameraOffsetX','cameraOffsetEasing','_oldCamera','updatePositionShake','AdjustRect','skewDuration','_scene','setBattleZoom','clamp','cameraXTarget','ActSeqCamera','shake','cameraOffsetXTarget','min','addBattleCameraCommand','ARRAYFUNC','makeData','initialBattleCameraSettings','boxHeight','_animationContainer','skewEasing','ARRAYJSON','skewY','Spriteset_Battle_createLowerLayer','_animation','push','cameraX','angleDuration','setCameraFocusTargets','ARRAYNUM','zoomWholeDuration','prototype','ConfigManager_makeData','cameraClamp','hasTargets','angleTarget','Sprite_Battler_damageOffsetY','Window_Options_addGeneralOptions','_targets','advanced','createLowerLayer','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','skewTargetY','1852968cJRiEA','VisuMZ_0_CoreEngine\x20needs\x20to\x20be\x20updated\x20','updateEffectGeometry','version','battleFieldOffsetY','round','updatePositionZoom','cameraOffsetDuration','2830366HwFSOr','Linear','cameraFocusTargetsY','scale','Spriteset_Battle_initialize','zoomScaleTarget','zoomEasing','Sprite_Animation_updateEffectGeometry','map','in\x20order\x20for\x20VisuMZ_3_ActSeqCamera\x20to\x20work.','2vOaKKy','1691508NAtdAJ','parameters','height','OptionsName','updateBattleAngle','updatePositionCoreEngine','battler','Scene_Options_maxCommands','damageOffsetY','cameraOffsetY','Game_Screen_update','2226896pTFVAc','constructor','parse','updateBattleZoom','match','_battleCamera','Sprite_Battler_damageOffsetX','clear','updateBattleCameraOffset','STR','_cacheScaleY','forSideviewTargets','setup','cameraOffsetDurationWhole','cameraDuration','screenWidth','applyData','setBattleSkew','EVAL','description','toUpperCase','angle','trim','log','windowAreaHeight','updatePositionCameraRoamOld','call','2450150FpxMyD','applyAnchorsForTiltEffect','cameraY','_cacheScaleX','BattleCore','isUnderAnimation','updatePositionSkew','VisuMZ_0_CoreEngine','ConvertParams','ConfigManager_applyData','_battleField','ARRAYSTRUCT','addBattleCameraCommands','format','length','exit','Settings','updatePosition','InOutSine','cameraFocusTarget','clearCameraFocusTargets','VisuMZ_1_BattleCore','clearBattleCamera','zoomDuration','ApplyEasing','cameraFocusTargetsX','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','AddOption','battleFieldCameraY','filter','ANTI_TINT_UI','BattleManager_setup','cameraEasing','_battleFieldCameraY','width','skewWholeDuration'];_0x51ce=function(){return _0x54c71f;};return _0x51ce();}