//=============================================================================
// VisuStella MZ - Weapon Animation
// VisuMZ_3_WeaponAnimation.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_WeaponAnimation = true;

var VisuMZ = VisuMZ || {};
VisuMZ.WeaponAnimation = VisuMZ.WeaponAnimation || {};
VisuMZ.WeaponAnimation.version = 1.11;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.11] [WeaponAnimation]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Weapon_Animation_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Ever wanted to give your swords different images despite being the same
 * sword type? Or how about your axes? Or any weapon? Now you can! On top of
 * that, you can even use custom images to accomplish this.
 * 
 * This plugin allows you to go past the standard weapon images and even using
 * custom images.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Select different weapon animation from the weapon sprite sheets.
 * * Use custom images for weapon animations.
 * * Allow weapons to have their own unique weapon animation sprites.
 * * Customize hues and motions for the weapon animations.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Sprite_Weapon loadBitmap function Change
 * 
 * Due to how this plugin works, loading bitmaps for the Sprite_Weapon
 * prototype class is now different. Depending if there is any data found for a
 * custom weapon animation, the bitmap data will be loaded differently to
 * accommodate the differences in file structure.
 *
 * ---
 * 
 * Sprite_Weapon updateFrame function Change
 * 
 * Due to how this plugin works, updating frames for the Sprite_Weapon
 * prototype class is now different. Depending if there is any data found for a
 * custom weapon animation, the frame data will be setup differently to
 * accommodate the differences in file structure.
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
 * === Weapon Image-Related Notetags ===
 * 
 * ---
 *
 * <Weapon Image: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes the weapon image used for the affected battler to a numeric type.
 * - Replace 'x' with a number representing the weapon image's ID.
 * - You'll get an image from "img/system/" folder's weapon sheets.
 * - Each sheet contains 12 weapon images. If you wish to load a weapon from
 *   the first sheet, it'll be within 1-12.
 * - If you wish to load a weapon from the second sheet, it'll be within 13-24,
 *   and so on.
 * - The weapon sheets increase in increments of 12, which means that if you
 *   wish to load a weapon from weapon sheet 50, x will be between 589 to 600.
 *
 *   By default, these are the number values associated with each:
 * 
 *   1 - Dagger   7 - Long Bow  13 - Mace       19 - Slingshot  25 - Book
 *   2 - Sword    8 - Crossbow  14 - Rod        20 - Shotgun    26 - Custom
 *   3 - Flail    9 - Gun       15 - Club       21 - Rifle      27 - Custom
 *   4 - Axe     10 - Claw      16 - Chain      22 - Chainsaw   28 - Custom
 *   5 - Whip    11 - Glove     17 - Sword#2    23 - Railgun    29 - Custom
 *   6 - Staff   12 - Spear     18 - Iron Pipe  24 - Stun Rod   30 - Custom
 *
 * ---
 *
 * <Weapon Image: filename>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes the weapon image used for the affected battler to a unique file.
 * - Replace 'filename' with the name of the file found in the "img/weapons/"
 *   folder (or whichever folder you've set it to in the plugin parameters).
 * - This is case sensitive.
 * - Do not include the file extension.
 * 
 *   Example:
 * 
 *   <Weapon Image: Beam Sword>
 *
 * ---
 *
 * <Weapon Motion: thrust>
 * <Weapon Motion: swing>
 * <Weapon Motion: missile>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - This notetag requires a <Weapon Image: x> or <Weapon Image: filename>
 *   notetag on the same trait object.
 * - Forces the weapon to play a specific motion when attacking.
 * - If this is not defined, the played motion will be the custom motion
 *   declared in the plugin parameters.
 * - You can also replace the motion type with the following:
 * 
 *   walk     wait     chant     guard     damage     evade
 *   thrust   swing    missile   skill     spell      item
 *   escape   victory  dying     abnormal  sleep      dead
 *
 * ---
 *
 * <Weapon Hue: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - This notetag requires a <Weapon Image: x> or <Weapon Image: filename>
 *   notetag on the same trait object.
 * - Changes the hue of the custom weapon image.
 * - Replace 'x' with a hue number between 0 and 255.
 *
 * ---
 * 
 * === State Attack Animation-Related Notetags ===
 * 
 * ---
 * 
 * <Attack Animation: x>
 * <Weapon Animation: x>
 * 
 * - Used for: State Notetags
 * - When the battler attacks while having a state with this notetag, the
 *   battler's attack animation will be changed to 'x'.
 * - This can be used for things like a "Burning Weapon" state that turns the
 *   attack animation into a flame attack instead of the normal attack.
 * - This only applies when a skill/item's animation is set to "Normal Attack".
 * - Replace 'x' with a number representing the animation's ID.
 * - If a battler is affected by multiple states with these notetags, then the
 *   state with the highest priority number will have its effect take place.
 * - There are no differences between the notetags. They both achieve the same
 *   functionality. <Weapon Animation: x> happens to be a legacy notetag
 *   carried from YEP's library.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * There's a couple of plugin parameters that can be adjusted for this plugin.
 *
 * ---
 *
 * General
 * 
 *   Image Filepath:
 *   - The filepath used for custom weapon images folder.
 *   - This defaults to "img/weapons/"
 * 
 *   Default Motion:
 *   - Default motion used for custom weapon images.
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
 * Version 1.11: August 18, 2022
 * * Bug Fixes!
 * ** Fixed a problem that made weapons appear even when Action Sequences would
 *    tell it to hide the weapon otherwise. Fix made by Irina.
 * 
 * Version 1.10: July 21, 2022
 * * Feature Update!
 * ** For those who did not set up their weapon attack motions, this plugin
 *    will now default the weapon attack type to "Thrust" and weapon attack
 *    image to "Dagger". Update made by Irina.
 * 
 * Version 1.09: April 7, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New state-only notetags added by Arisu:
 * *** <Attack Animation: x>
 * *** <Weapon Animation: x>
 * **** Both notetags do the same thing, just that one is a legacy notetag from
 *      the past YEP library.
 * **** When the battler attacks while having a state with this notetag, the
 *      battler's attack animation will be changed to 'x'.
 * **** This can be used for things like a "Burning Weapon" state that turns
 *      the attack animation into a flame attack instead of the normal attack.
 * **** This only applies when a skill/item's animation is set to
 *      "Normal Attack".
 * 
 * Version 1.08: February 17, 2022
 * * Bug Fixes!
 * ** Added a fail safe to prevent freeze motion frames on items trying to use
 *    custom weapon sprites, but do not actually have them in the game project.
 *    Fix made by Olivia.
 * 
 * Version 1.07: January 27, 2022
 * * Bug Fixes!
 * ** Freeze motion frames for weapon attacks will default to the enforced
 *    weapon graphic if there is no custom weapon sprite on the weapon, but on
 *    a piece of armor instead. Update made by Olivia.
 * 
 * Version 1.06: June 11, 2021
 * * Bug Fixes!
 * ** Freeze motion frames for weapon attacks will no longer cause crashes if
 *    the user does not have a weapon equipped. Fix made by Olivia.
 * 
 * Version 1.05: April 9, 2021
 * * Bug Fixes!
 * ** Freeze Motions should now hide weapons instead of always displaying them
 *    when the hide option is enabled. Fix made by Olivia.
 * 
 * Version 1.04: February 12, 2021
 * * Bug Fixes!
 * ** Freeze frame now supports enemy custom weapon images. Fix made by Irina.
 * 
 * Version 1.03: January 29, 2021
 * * Bug Fixes!
 * ** Basic weapon animations should now show the proper weapon image.
 *    Fix made by Olivia.
 * ** Freeze frame now supports custom non-attack animations. Fix by Olivia.
 * 
 * Version 1.02: January 22, 2021
 * * Compatibility Update
 * ** Plugin is now compatible with Battle Core's Freeze Motion.
 * 
 * Version 1.01: November 22, 2020
 * * Bug Fixes!
 * ** If battlers with custom weapon animations perform an Action Sequence with
 *    "Show Weapon" set to false, they will no longer force the attack motion.
 *    Fix made by Yanfly.
 *
 * Version 1.00: November 25, 2020
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
 * @param WeaponAnimation
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param filepath:str
 * @text Image Filepath
 * @desc The filepath used for custom weapon images folder.
 * @default img/weapons/
 *
 * @param motion:str
 * @text Default Motion
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Default motion used for custom weapon images.
 * @default swing
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

const _0x96b4cd=_0x54ec;(function(_0x165148,_0x3f1739){const _0x3ea8c2=_0x54ec,_0x146983=_0x165148();while(!![]){try{const _0x5a82f2=parseInt(_0x3ea8c2(0x100))/0x1+-parseInt(_0x3ea8c2(0x91))/0x2+-parseInt(_0x3ea8c2(0xc2))/0x3+parseInt(_0x3ea8c2(0xbd))/0x4*(-parseInt(_0x3ea8c2(0xe0))/0x5)+-parseInt(_0x3ea8c2(0x84))/0x6*(-parseInt(_0x3ea8c2(0xf3))/0x7)+-parseInt(_0x3ea8c2(0xce))/0x8+parseInt(_0x3ea8c2(0xe5))/0x9;if(_0x5a82f2===_0x3f1739)break;else _0x146983['push'](_0x146983['shift']());}catch(_0x49d5e7){_0x146983['push'](_0x146983['shift']());}}}(_0x2164,0xa1e06));function _0x2164(){const _0x47d5e8=['return\x200','process_VisuMZ_BattleCore_Failsafes','LHHDi','VisuMZ_1_BattleCore','EVAL','isEnemy','ARRAYSTR','Game_Battler_startWeaponAnimation','FUNC','match','map','838630KydPcw','Game_Enemy_attackAnimationId1','ARRAYFUNC','some','Azvdc','6cIPutl','width','eDOvE','AarIZ','QugdU','loadBitmapCustomWeapon','isActor','refresh','Settings','status','Game_Enemy_attackAnimationId2','max','height','380328JWkZXS','isCustomWeaponGraphic','preloadCustomWeaponImage','name','freezeMotion','filter','onkzR','exit','NUM','prototype','updateFrameCustomWeaponGraphic','HJwAW','clamp','loadWeapon','parse','Sprite_Weapon_updateFrame','createCustomWeaponGraphicFromObj','updateFrame','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','description','trim','MyVSW','weapons','toUpperCase','ConvertParams','parameters','BQTvV','Game_Actor_attackAnimationId2','weaponTypes','states','daxss','Sprite_Weapon_loadBitmap','CrGuq','AttackAni','initMembers','WaSGG','WeaponAnimation','attackAnimationId1','startAction','_uniqueStartWeaponAnimation','cbzGg','_customFrames','RegExp','Game_BattlerBase_refresh','1037924swRQNJ','tpFUg','checkCacheKey','VgtwG','call','1090041vJipQt','attackAnimationId2','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','bitmap','floor','_subject','getStateAttackAnimation','Game_Actor_attackAnimationId1','loadSystem','number','createCustomWeaponGraphic','_freezeMotionData','3648608UsRgcP','DpZHL','Scene_Boot_process_VisuMZ_BattleCore_Failsafes','_cache','weaponImageId','YuszZ','UMdSr','hue','mUdfh','motionType','Game_BattlerBase_initMembers','traitObjects','BattleManager_startAction','_pattern','attackMotions','loadBitmap','customWeaponGraphic','note','5ZGmwoA','hasStateAttackAnimation','EQHFQ','Weapons','motion','1716741fnUJEi','Game_Battler_freezeMotion','requestMotion','ImageStr','swing','setFrame','_weaponImageId','Motion','format','version','setHue','STR','aqsIX','UPVZs','6319145VhPhVt','startWeaponAnimation'];_0x2164=function(){return _0x47d5e8;};return _0x2164();}var label='WeaponAnimation',tier=tier||0x0,dependencies=[_0x96b4cd(0xf8)],pluginData=$plugins[_0x96b4cd(0x96)](function(_0x189823){const _0x33cdff=_0x96b4cd;return _0x189823[_0x33cdff(0x8d)]&&_0x189823[_0x33cdff(0xa4)]['includes']('['+label+']');})[0x0];function _0x54ec(_0x30e2d4,_0x3916fc){const _0x216458=_0x2164();return _0x54ec=function(_0x54ecfd,_0x390109){_0x54ecfd=_0x54ecfd-0x83;let _0x56358c=_0x216458[_0x54ecfd];return _0x56358c;},_0x54ec(_0x30e2d4,_0x3916fc);}VisuMZ[label][_0x96b4cd(0x8c)]=VisuMZ[label][_0x96b4cd(0x8c)]||{},VisuMZ[_0x96b4cd(0xa9)]=function(_0x3ebe50,_0x4e9fe6){const _0x4322e8=_0x96b4cd;for(const _0xfd3e6a in _0x4e9fe6){if(_0xfd3e6a[_0x4322e8(0xfe)](/(.*):(.*)/i)){const _0x35368b=String(RegExp['$1']),_0x237cab=String(RegExp['$2'])[_0x4322e8(0xa8)]()[_0x4322e8(0xa5)]();let _0x5ebdaa,_0x32574c,_0xfdd858;switch(_0x237cab){case _0x4322e8(0x99):_0x5ebdaa=_0x4e9fe6[_0xfd3e6a]!==''?Number(_0x4e9fe6[_0xfd3e6a]):0x0;break;case'ARRAYNUM':_0x32574c=_0x4e9fe6[_0xfd3e6a]!==''?JSON[_0x4322e8(0x9f)](_0x4e9fe6[_0xfd3e6a]):[],_0x5ebdaa=_0x32574c[_0x4322e8(0xff)](_0x580b0d=>Number(_0x580b0d));break;case _0x4322e8(0xf9):_0x5ebdaa=_0x4e9fe6[_0xfd3e6a]!==''?eval(_0x4e9fe6[_0xfd3e6a]):null;break;case'ARRAYEVAL':_0x32574c=_0x4e9fe6[_0xfd3e6a]!==''?JSON[_0x4322e8(0x9f)](_0x4e9fe6[_0xfd3e6a]):[],_0x5ebdaa=_0x32574c[_0x4322e8(0xff)](_0xeff079=>eval(_0xeff079));break;case'JSON':_0x5ebdaa=_0x4e9fe6[_0xfd3e6a]!==''?JSON[_0x4322e8(0x9f)](_0x4e9fe6[_0xfd3e6a]):'';break;case'ARRAYJSON':_0x32574c=_0x4e9fe6[_0xfd3e6a]!==''?JSON['parse'](_0x4e9fe6[_0xfd3e6a]):[],_0x5ebdaa=_0x32574c[_0x4322e8(0xff)](_0x422bfa=>JSON[_0x4322e8(0x9f)](_0x422bfa));break;case _0x4322e8(0xfd):_0x5ebdaa=_0x4e9fe6[_0xfd3e6a]!==''?new Function(JSON[_0x4322e8(0x9f)](_0x4e9fe6[_0xfd3e6a])):new Function(_0x4322e8(0xf5));break;case _0x4322e8(0x102):_0x32574c=_0x4e9fe6[_0xfd3e6a]!==''?JSON[_0x4322e8(0x9f)](_0x4e9fe6[_0xfd3e6a]):[],_0x5ebdaa=_0x32574c['map'](_0x136214=>new Function(JSON[_0x4322e8(0x9f)](_0x136214)));break;case _0x4322e8(0xf0):_0x5ebdaa=_0x4e9fe6[_0xfd3e6a]!==''?String(_0x4e9fe6[_0xfd3e6a]):'';break;case _0x4322e8(0xfb):_0x32574c=_0x4e9fe6[_0xfd3e6a]!==''?JSON[_0x4322e8(0x9f)](_0x4e9fe6[_0xfd3e6a]):[],_0x5ebdaa=_0x32574c[_0x4322e8(0xff)](_0x14721f=>String(_0x14721f));break;case'STRUCT':_0xfdd858=_0x4e9fe6[_0xfd3e6a]!==''?JSON['parse'](_0x4e9fe6[_0xfd3e6a]):{},_0x5ebdaa=VisuMZ[_0x4322e8(0xa9)]({},_0xfdd858);break;case'ARRAYSTRUCT':_0x32574c=_0x4e9fe6[_0xfd3e6a]!==''?JSON[_0x4322e8(0x9f)](_0x4e9fe6[_0xfd3e6a]):[],_0x5ebdaa=_0x32574c[_0x4322e8(0xff)](_0xbb25ce=>VisuMZ['ConvertParams']({},JSON[_0x4322e8(0x9f)](_0xbb25ce)));break;default:continue;}_0x3ebe50[_0x35368b]=_0x5ebdaa;}}return _0x3ebe50;},(_0x248ef7=>{const _0x364692=_0x96b4cd,_0x479c64=_0x248ef7['name'];for(const _0x39f8d3 of dependencies){if(_0x364692(0xf1)===_0x364692(0xf1)){if(!Imported[_0x39f8d3]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x364692(0xed)](_0x479c64,_0x39f8d3)),SceneManager['exit']();break;}}else return _0xc342d2['status']&&_0x312099[_0x364692(0xa4)]['includes']('['+_0x3ae690+']');}const _0x1e7feb=_0x248ef7[_0x364692(0xa4)];if(_0x1e7feb['match'](/\[Version[ ](.*?)\]/i)){const _0x353552=Number(RegExp['$1']);_0x353552!==VisuMZ[label][_0x364692(0xee)]&&(alert(_0x364692(0xa3)['format'](_0x479c64,_0x353552)),SceneManager[_0x364692(0x98)]());}if(_0x1e7feb[_0x364692(0xfe)](/\[Tier[ ](\d+)\]/i)){const _0x3e5535=Number(RegExp['$1']);_0x3e5535<tier?(alert(_0x364692(0xc4)[_0x364692(0xed)](_0x479c64,_0x3e5535,tier)),SceneManager['exit']()):_0x364692(0xcf)!==_0x364692(0xcf)?this['_freezeMotionData'][_0x364692(0xd7)]=_0x56c702[_0x364692(0xe4)]:tier=Math[_0x364692(0x8f)](_0x3e5535,tier);}VisuMZ[_0x364692(0xa9)](VisuMZ[label][_0x364692(0x8c)],_0x248ef7[_0x364692(0xaa)]);})(pluginData),VisuMZ[_0x96b4cd(0xb5)][_0x96b4cd(0xbb)]={'ImageNum':/<WEAPON IMAGE:[ ](\d+)>/i,'ImageStr':/<WEAPON IMAGE:[ ](.*)>/i,'Hue':/<WEAPON HUE:[ ](\d+)>/i,'Motion':/<WEAPON MOTION:[ ](.*)>/i,'AttackAni':/<(?:WEAPON|ATTACK) ANIMATION:[ ](\d+)>/i},VisuMZ[_0x96b4cd(0xb5)][_0x96b4cd(0xd0)]=Scene_Boot[_0x96b4cd(0x9a)]['process_VisuMZ_BattleCore_Failsafes'],Scene_Boot['prototype'][_0x96b4cd(0xf6)]=function(){const _0x59e9d6=_0x96b4cd,_0x30a183=$dataSystem[_0x59e9d6(0xad)]['length'];for(let _0x26dc34=0x0;_0x26dc34<_0x30a183;_0x26dc34++){const _0x47fa25=$dataSystem[_0x59e9d6(0xdc)][_0x26dc34];if(_0x47fa25)continue;$dataSystem[_0x59e9d6(0xdc)][_0x26dc34]={'type':0x1,'weaponImageId':0x1};}VisuMZ[_0x59e9d6(0xb5)]['Scene_Boot_process_VisuMZ_BattleCore_Failsafes'][_0x59e9d6(0xc1)](this);},ImageManager[_0x96b4cd(0x9e)]=function(_0x2e03b3){const _0x7190d0=_0x96b4cd,_0x49878a=VisuMZ['WeaponAnimation']['Settings']['filepath'];return this[_0x7190d0(0xdd)](_0x49878a,_0x2e03b3);},VisuMZ[_0x96b4cd(0xb5)][_0x96b4cd(0xda)]=BattleManager[_0x96b4cd(0xb7)],BattleManager['startAction']=function(){const _0x4259a9=_0x96b4cd;VisuMZ[_0x4259a9(0xb5)]['BattleManager_startAction']['call'](this),this['_subject']&&this['_subject'][_0x4259a9(0x93)]();},VisuMZ['WeaponAnimation'][_0x96b4cd(0xd8)]=Game_BattlerBase[_0x96b4cd(0x9a)][_0x96b4cd(0xb3)],Game_BattlerBase[_0x96b4cd(0x9a)][_0x96b4cd(0xb3)]=function(){const _0x4f0878=_0x96b4cd;this[_0x4f0878(0xd1)]={},VisuMZ['WeaponAnimation'][_0x4f0878(0xd8)][_0x4f0878(0xc1)](this);},VisuMZ[_0x96b4cd(0xb5)]['Game_BattlerBase_refresh']=Game_BattlerBase['prototype'][_0x96b4cd(0x8b)],Game_BattlerBase[_0x96b4cd(0x9a)][_0x96b4cd(0x8b)]=function(){const _0x243873=_0x96b4cd;this[_0x243873(0xd1)]={},VisuMZ[_0x243873(0xb5)]['Game_BattlerBase_refresh'][_0x243873(0xc1)](this);},Game_BattlerBase['prototype'][_0x96b4cd(0xbf)]=function(_0x48581d){const _0x462f61=_0x96b4cd;return this[_0x462f61(0xd1)]=this[_0x462f61(0xd1)]||{},this[_0x462f61(0xd1)][_0x48581d]!==undefined;},Game_BattlerBase['prototype'][_0x96b4cd(0xde)]=function(){const _0x34f4e2=_0x96b4cd;let _0xd36031='customWeaponGraphic';if(this[_0x34f4e2(0xbf)](_0xd36031))return this[_0x34f4e2(0xd1)][_0xd36031];return this[_0x34f4e2(0xd1)][_0xd36031]=this[_0x34f4e2(0xcc)](),this['_cache'][_0xd36031];},Game_BattlerBase[_0x96b4cd(0x9a)][_0x96b4cd(0xcc)]=function(){const _0x5f4ba6=_0x96b4cd;for(const _0x489356 of this[_0x5f4ba6(0xd9)]()){if('tpFUg'!==_0x5f4ba6(0xbe))return this[_0x5f4ba6(0xc8)]()||_0x58e261[_0x5f4ba6(0xb5)][_0x5f4ba6(0xac)][_0x5f4ba6(0xc1)](this);else{if(!_0x489356)continue;const _0x333ddd=this[_0x5f4ba6(0xa1)](_0x489356);if(_0x333ddd[_0x5f4ba6(0x94)]!==0x0)return{'name':_0x333ddd[_0x5f4ba6(0x94)],'hue':_0x333ddd[_0x5f4ba6(0xd5)],'motion':_0x333ddd[_0x5f4ba6(0xe4)]};}}return 0x0;},Game_BattlerBase[_0x96b4cd(0x9a)][_0x96b4cd(0xa1)]=function(_0x4d9e3c){const _0x41ecb8=_0x96b4cd,_0x5d573e=VisuMZ[_0x41ecb8(0xb5)][_0x41ecb8(0xbb)];let _0x17bf7b=0x0,_0x1d1256=0x0,_0x47d833=VisuMZ[_0x41ecb8(0xb5)][_0x41ecb8(0x8c)]['motion'];const _0x1790fa=_0x4d9e3c?_0x4d9e3c['note']:'';if(_0x1790fa[_0x41ecb8(0xfe)](_0x5d573e['ImageNum']))_0x41ecb8(0xd4)!==_0x41ecb8(0x97)?_0x17bf7b=Number(RegExp['$1'])||0x1:_0x53a8f1=_0x1216f7['max'](_0x18fec4,_0x577295);else _0x1790fa[_0x41ecb8(0xfe)](_0x5d573e[_0x41ecb8(0xe8)])&&(_0x17bf7b=String(RegExp['$1']));return _0x1790fa['match'](_0x5d573e['Hue'])&&(_0x1d1256=Number(RegExp['$1'])[_0x41ecb8(0x9d)](0x0,0xff)),_0x1790fa['match'](_0x5d573e[_0x41ecb8(0xec)])&&(_0x47d833=String(RegExp['$1'])['toLowerCase']()[_0x41ecb8(0xa5)]()),{'name':_0x17bf7b,'hue':_0x1d1256,'motion':_0x47d833};},VisuMZ[_0x96b4cd(0xb5)]['Game_Battler_startWeaponAnimation']=Game_Battler[_0x96b4cd(0x9a)][_0x96b4cd(0xf4)],Game_Battler[_0x96b4cd(0x9a)][_0x96b4cd(0xf4)]=function(_0x4b9017){const _0x1f8a99=_0x96b4cd;if(this[_0x1f8a99(0xb8)])return;let _0xaa4a3e=![];if(this['customWeaponGraphic']()&&_0x4b9017>0x0){if(_0x1f8a99(0x83)!=='VYUzb')_0x4b9017=this[_0x1f8a99(0xde)](),_0xaa4a3e=!![];else{const _0x5d1a9a=_0x420048[_0x1f8a99(0xb5)]['RegExp'],_0x171487=_0x5d1a9a[_0x1f8a99(0xb2)];return this[_0x1f8a99(0xae)]()[_0x1f8a99(0x103)](_0x55f58a=>_0x55f58a&&_0x55f58a[_0x1f8a99(0xdf)][_0x1f8a99(0xfe)](_0x171487));}}VisuMZ[_0x1f8a99(0xb5)][_0x1f8a99(0xfc)][_0x1f8a99(0xc1)](this,_0x4b9017);if(!_0xaa4a3e)return;if(_0x4b9017===0x0)return;this['_uniqueStartWeaponAnimation']=!![],this[_0x1f8a99(0xe7)](_0x4b9017[_0x1f8a99(0xe4)]||_0x1f8a99(0xe9)),this['_uniqueStartWeaponAnimation']=![];},Game_Battler[_0x96b4cd(0x9a)]['preloadCustomWeaponImage']=function(){const _0x456979=_0x96b4cd;if(!this[_0x456979(0xde)]())return;const _0x166941=this['customWeaponGraphic']();if(typeof _0x166941['name']===_0x456979(0xcb)){const _0x401377=Math[_0x456979(0xc6)]((_0x166941[_0x456979(0x94)]-0x1)/0xc)+0x1;ImageManager[_0x456979(0xca)](_0x456979(0xe3)+_0x401377);}else{if(_0x456979(0xab)===_0x456979(0xab))ImageManager[_0x456979(0x9e)](_0x166941['name']);else{if(!this['_weaponImageId'])return;if(typeof this[_0x456979(0xeb)][_0x456979(0x94)]===_0x456979(0xcb)){const _0xa81c7=(this[_0x456979(0xeb)][_0x456979(0x94)]-0x1)%0xc,_0x38e628=0x60,_0x291ef5=0x40,_0x18470e=(_0x1b727d[_0x456979(0xc6)](_0xa81c7/0x6)*0x3+this[_0x456979(0xdb)])*_0x38e628,_0x5cdd63=_0x47847b['floor'](_0xa81c7%0x6)*_0x291ef5;this[_0x456979(0xea)](_0x18470e,_0x5cdd63,_0x38e628,_0x291ef5);}else{const _0x17ffa9=_0x3452eb[_0x456979(0xc6)](this['bitmap']['width']/0x3),_0x3fd8ab=this[_0x456979(0xc5)][_0x456979(0x90)],_0x4debe2=this[_0x456979(0xdb)]*_0x17ffa9,_0x370959=0x0;this['setFrame'](_0x4debe2,_0x370959,_0x17ffa9,_0x3fd8ab);}}}},VisuMZ[_0x96b4cd(0xb5)][_0x96b4cd(0xe6)]=Game_Battler[_0x96b4cd(0x9a)][_0x96b4cd(0x95)],Game_Battler[_0x96b4cd(0x9a)][_0x96b4cd(0x95)]=function(_0x5c18b3,_0x373e54,_0x398c32){const _0x390220=_0x96b4cd;VisuMZ[_0x390220(0xb5)][_0x390220(0xe6)][_0x390220(0xc1)](this,_0x5c18b3,_0x373e54,_0x398c32);if(!_0x373e54){if(_0x390220(0xd3)!==_0x390220(0xaf))return;else{const _0xed2077=_0x595651['floor'](this[_0x390220(0xc5)][_0x390220(0x85)]/0x3),_0x558edf=this[_0x390220(0xc5)][_0x390220(0x90)],_0x4162ca=this['_pattern']*_0xed2077,_0x4eee0d=0x0;this[_0x390220(0xea)](_0x4162ca,_0x4eee0d,_0xed2077,_0x558edf);}}let _0x16cf73=0x0;_0x5c18b3[_0x390220(0xfe)](/ATTACK[ ](\d+)/i)&&(_0x16cf73=Number(RegExp['$1']),_0x16cf73--);if(this[_0x390220(0x8a)]()){if(_0x390220(0xb4)===_0x390220(0xd6))return;else{const _0x479c87=this[_0x390220(0xa7)](),_0x2987e8=_0x479c87[_0x16cf73]||null,_0x52850b=this[_0x390220(0xa1)](_0x2987e8);if(_0x52850b[_0x390220(0x94)]!==0x0)_0x390220(0xf7)===_0x390220(0xb1)?_0x2bf8db[_0x390220(0x9e)](_0x574121[_0x390220(0x94)]):(_0x5c18b3['match'](/ATTACK/i)&&(this['_freezeMotionData']['motionType']=_0x52850b['motion']),this['_freezeMotionData'][_0x390220(0xd2)]=_0x52850b[_0x390220(0x94)]);else{const _0x1eeb95=this[_0x390220(0xde)]();_0x1eeb95[_0x390220(0x94)]!==0x0&&(_0x5c18b3[_0x390220(0xfe)](/ATTACK/i)&&(this[_0x390220(0xcd)][_0x390220(0xd7)]=_0x1eeb95['motion']),this[_0x390220(0xcd)]['weaponImageId']=_0x1eeb95[_0x390220(0x94)]);}}}else{if(this[_0x390220(0xfa)]()){const _0x3f3168=this[_0x390220(0xa1)](this['enemy']());_0x3f3168[_0x390220(0x94)]!==0x0&&(_0x5c18b3['match'](/ATTACK/i)&&(this[_0x390220(0xcd)][_0x390220(0xd7)]=_0x3f3168[_0x390220(0xe4)]),this[_0x390220(0xcd)][_0x390220(0xd2)]=_0x3f3168[_0x390220(0x94)]);}}},Game_Battler[_0x96b4cd(0x9a)][_0x96b4cd(0xc8)]=function(){const _0x44fbd9=_0x96b4cd,_0x278eba=VisuMZ['WeaponAnimation'][_0x44fbd9(0xbb)],_0x4a6fda=_0x278eba[_0x44fbd9(0xb2)];for(const _0x2bebb3 of this[_0x44fbd9(0xae)]()){if(!_0x2bebb3)continue;if(_0x2bebb3[_0x44fbd9(0xdf)][_0x44fbd9(0xfe)](_0x4a6fda)){const _0x2cdf2a=Number(RegExp['$1'])||0x0;if(_0x2cdf2a>0x0)return _0x2cdf2a;}}return 0x0;},Game_Battler[_0x96b4cd(0x9a)][_0x96b4cd(0xe1)]=function(){const _0x332b3a=_0x96b4cd,_0x105c3a=VisuMZ['WeaponAnimation'][_0x332b3a(0xbb)],_0x427f20=_0x105c3a[_0x332b3a(0xb2)];return this[_0x332b3a(0xae)]()[_0x332b3a(0x103)](_0x204c6b=>_0x204c6b&&_0x204c6b[_0x332b3a(0xdf)]['match'](_0x427f20));},VisuMZ[_0x96b4cd(0xb5)]['Game_Actor_attackAnimationId1']=Game_Actor[_0x96b4cd(0x9a)]['attackAnimationId1'],Game_Actor[_0x96b4cd(0x9a)][_0x96b4cd(0xb6)]=function(){const _0x6d8c8=_0x96b4cd;return this[_0x6d8c8(0xe1)]()?this[_0x6d8c8(0xc8)]()||VisuMZ[_0x6d8c8(0xb5)][_0x6d8c8(0xc9)]['call'](this):VisuMZ[_0x6d8c8(0xb5)][_0x6d8c8(0xc9)][_0x6d8c8(0xc1)](this);},VisuMZ[_0x96b4cd(0xb5)][_0x96b4cd(0xac)]=Game_Actor[_0x96b4cd(0x9a)][_0x96b4cd(0xc3)],Game_Actor[_0x96b4cd(0x9a)][_0x96b4cd(0xc3)]=function(){const _0x26875e=_0x96b4cd;if(this[_0x26875e(0xe1)]()&&!!this['weapons']()[0x1])return this[_0x26875e(0xc8)]()||VisuMZ[_0x26875e(0xb5)][_0x26875e(0xac)][_0x26875e(0xc1)](this);else{if(_0x26875e(0xa6)!==_0x26875e(0x86))return VisuMZ[_0x26875e(0xb5)][_0x26875e(0xac)][_0x26875e(0xc1)](this);else _0x463a2b(_0x26875e(0xa3)[_0x26875e(0xed)](_0x493316,_0x4a3e3f)),_0x377c1a[_0x26875e(0x98)]();}},VisuMZ[_0x96b4cd(0xb5)][_0x96b4cd(0x101)]=Game_Enemy['prototype'][_0x96b4cd(0xb6)],Game_Enemy[_0x96b4cd(0x9a)][_0x96b4cd(0xb6)]=function(){const _0x5344c8=_0x96b4cd;if(this[_0x5344c8(0xe1)]()){if('irvRn'===_0x5344c8(0x87))this[_0x5344c8(0xba)]=![],_0x201f60[_0x5344c8(0xb5)][_0x5344c8(0xb0)][_0x5344c8(0xc1)](this),this['setHue'](0x0);else return this['getStateAttackAnimation']()||VisuMZ['WeaponAnimation'][_0x5344c8(0x101)][_0x5344c8(0xc1)](this);}else{if(_0x5344c8(0xc0)===_0x5344c8(0xc0))return VisuMZ['WeaponAnimation'][_0x5344c8(0x101)]['call'](this);else{const _0x19c036=(this[_0x5344c8(0xeb)][_0x5344c8(0x94)]-0x1)%0xc,_0x41b80b=0x60,_0x25b179=0x40,_0x333b23=(_0x15747b[_0x5344c8(0xc6)](_0x19c036/0x6)*0x3+this[_0x5344c8(0xdb)])*_0x41b80b,_0x283952=_0x382094['floor'](_0x19c036%0x6)*_0x25b179;this[_0x5344c8(0xea)](_0x333b23,_0x283952,_0x41b80b,_0x25b179);}}},VisuMZ[_0x96b4cd(0xb5)][_0x96b4cd(0x8e)]=Game_Enemy[_0x96b4cd(0x9a)][_0x96b4cd(0xc3)],Game_Enemy[_0x96b4cd(0x9a)][_0x96b4cd(0xc3)]=function(){const _0x691f87=_0x96b4cd;return this['hasStateAttackAnimation']()?this[_0x691f87(0xc8)]()||VisuMZ[_0x691f87(0xb5)][_0x691f87(0x8e)][_0x691f87(0xc1)](this):VisuMZ[_0x691f87(0xb5)][_0x691f87(0x8e)][_0x691f87(0xc1)](this);},Sprite_Weapon[_0x96b4cd(0x9a)][_0x96b4cd(0x92)]=function(){const _0x1b9f6d=_0x96b4cd;return typeof this['_weaponImageId']!==_0x1b9f6d(0xcb);},VisuMZ['WeaponAnimation'][_0x96b4cd(0xb0)]=Sprite_Weapon['prototype'][_0x96b4cd(0xdd)],Sprite_Weapon[_0x96b4cd(0x9a)][_0x96b4cd(0xdd)]=function(){const _0x5155e6=_0x96b4cd;this[_0x5155e6(0x92)]()?this[_0x5155e6(0x89)]():_0x5155e6(0x9c)!=='RZDOp'?(this['_customFrames']=![],VisuMZ[_0x5155e6(0xb5)][_0x5155e6(0xb0)][_0x5155e6(0xc1)](this),this[_0x5155e6(0xef)](0x0)):(_0x3fea34[_0x5155e6(0xfe)](/ATTACK/i)&&(this['_freezeMotionData'][_0x5155e6(0xd7)]=_0x2ac0bf[_0x5155e6(0xe4)]),this[_0x5155e6(0xcd)][_0x5155e6(0xd2)]=_0x2413dc['name']);},Sprite_Weapon[_0x96b4cd(0x9a)][_0x96b4cd(0x89)]=function(){const _0xef6951=_0x96b4cd;if(!this[_0xef6951(0xeb)])return;if(typeof this[_0xef6951(0xeb)][_0xef6951(0x94)]===_0xef6951(0xcb)){if(_0xef6951(0xb9)===_0xef6951(0xb9)){const _0x78e56e=Math[_0xef6951(0xc6)]((this[_0xef6951(0xeb)][_0xef6951(0x94)]-0x1)/0xc)+0x1;_0x78e56e>=0x1?this['bitmap']=ImageManager[_0xef6951(0xca)](_0xef6951(0xe3)+_0x78e56e):this[_0xef6951(0xc5)]=ImageManager['loadSystem']('');}else this[_0xef6951(0x92)]()?this['updateFrameCustomWeaponGraphic']():_0x12790b[_0xef6951(0xb5)][_0xef6951(0xa0)][_0xef6951(0xc1)](this);}else{if(_0xef6951(0xf2)==='UPVZs'){this[_0xef6951(0xba)]=!![];const _0x3a8829=this['_weaponImageId']['name']?this[_0xef6951(0xeb)][_0xef6951(0x94)]:this[_0xef6951(0xeb)];this[_0xef6951(0xc5)]=ImageManager[_0xef6951(0x9e)](_0x3a8829||'');}else this[_0xef6951(0xd1)]={},_0x4f1962[_0xef6951(0xb5)][_0xef6951(0xbc)]['call'](this);}this[_0xef6951(0xef)](this[_0xef6951(0xeb)][_0xef6951(0xd5)]||0x0);},VisuMZ[_0x96b4cd(0xb5)][_0x96b4cd(0xa0)]=Sprite_Weapon[_0x96b4cd(0x9a)][_0x96b4cd(0xa2)],Sprite_Weapon['prototype'][_0x96b4cd(0xa2)]=function(){const _0x215a13=_0x96b4cd;this[_0x215a13(0x92)]()?_0x215a13(0xe2)!==_0x215a13(0x88)?this[_0x215a13(0x9b)]():this[_0x215a13(0xc7)][_0x215a13(0x93)]():VisuMZ['WeaponAnimation'][_0x215a13(0xa0)][_0x215a13(0xc1)](this);},Sprite_Weapon[_0x96b4cd(0x9a)][_0x96b4cd(0x9b)]=function(){const _0x529ba2=_0x96b4cd;if(!this[_0x529ba2(0xeb)])return;if(typeof this['_weaponImageId'][_0x529ba2(0x94)]===_0x529ba2(0xcb)){const _0x1279ff=(this['_weaponImageId']['name']-0x1)%0xc,_0x33b986=0x60,_0xc8c178=0x40,_0x6935a3=(Math[_0x529ba2(0xc6)](_0x1279ff/0x6)*0x3+this[_0x529ba2(0xdb)])*_0x33b986,_0x593438=Math[_0x529ba2(0xc6)](_0x1279ff%0x6)*_0xc8c178;this[_0x529ba2(0xea)](_0x6935a3,_0x593438,_0x33b986,_0xc8c178);}else{const _0xa4be40=Math[_0x529ba2(0xc6)](this[_0x529ba2(0xc5)][_0x529ba2(0x85)]/0x3),_0x31f0d3=this[_0x529ba2(0xc5)][_0x529ba2(0x90)],_0x229f10=this['_pattern']*_0xa4be40,_0x59de9c=0x0;this[_0x529ba2(0xea)](_0x229f10,_0x59de9c,_0xa4be40,_0x31f0d3);}};