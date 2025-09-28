//=============================================================================
// VisuStella MZ - Life State Effects
// VisuMZ_3_LifeStateEffects.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_LifeStateEffects = true;

var VisuMZ = VisuMZ || {};
VisuMZ.LifeStateEffects = VisuMZ.LifeStateEffects || {};
VisuMZ.LifeStateEffects.version = 1.07;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.07] [LifeStateEffects]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Life_State_Effects_VisuStella_MZ
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
 * The Life State Effects plugin allow for trait objects and/or states to
 * create specific, though, commonly used effects found in many traditional
 * JRPG's, such as Auto Life, Doom, and Guts. These mechanical effects add a
 * whole new layer of strategy when it comes to status effects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Auto Life effect, which is a state effect that recovers a percentage of
 *   the user's HP and disappears upon triggering.
 * * Curse effect, which prevents HP, MP, and/or TP recovery.
 * * Doom effect, which is a state effect that will kill the affected battler
 *   once the state's timer wears off and expires.
 * * Fragile effect, which causes any time a user receives HP damage from a
 *   direct action, that user will instantly lose all HP.
 * * Guts, which prevents HP from dropping below 1, unless the battler's HP is
 *   at 1, itself.
 * * Undead, which causes normal HP healing to inflict damage instead, instant
 *   death effects to fully restore HP, and Drain effects to be inverted.
 * * Death Transformations, for specificly notetag-marked enemies, will cause
 *   them to undergo a transformation once they die in battle and be reborn
 *   anew with full HP/MP as something else.
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
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === State-Only Effects ===
 * 
 * ---
 *
 * <Auto Life: x%>
 *
 * - Used for: State Notetags
 * - When the affected battler dies with this state present, this state will
 *   automatically remove itself (and any other states with <Auto Life: x%>) to
 *   restore that much HP% for the battler.
 * - Replace 'x' with a number representing that percentage of HP to heal the
 *   battler upon dying.
 *
 * ---
 *
 * <Doom>
 *
 * - Used for: State Notetags
 * - When this state expires naturally (without direct removal), kill the
 *   affected battler.
 *
 * ---
 * 
 * <Extinct>
 * 
 * - Used for: State Notetags
 * - When applied to a target, the target is no longer able to revive or be
 *   revived until this state is removed.
 *   - Enemy still needs to be defeated after applying Extinct state.
 * - This will suppress the Auto Life effect.
 * - This does NOT suppress enemy Death Transformations.
 * 
 * ---
 * 
 * === Trait-Object Effects ===
 * 
 * ---
 *
 * <Curse HP>
 * <Curse MP>
 * <Curse TP>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Prevents the affected battler from being able to recover HP, MP, and/or TP
 *   depending on which notetag is being used.
 *
 * ---
 *
 * <Fragile>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - If a battler affected by <Fragile> receives a direct attack and takes any
 *   HP damage (as opposed to event command damage or regeneration damage),
 *   then instantly kill the affected battler.
 *
 * ---
 *
 * <Guts>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - This will prevent the battler from taking any fatal damage and leaves them
 *   with only 1 HP. However, if the battler has 1 HP and receives damage, then
 *   the battler will actually die.
 *
 * ---
 *
 * <Undead>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - If the battler receives HP Healing, it receives damage instead.
 * - If the battler is a target of an instant death skill or item, then the
 *   battler will recover full HP.
 * - If the battler is the target of an HP Drain action, then the battler will
 *   drain HP from the attacker instead.
 * - If the battler is the target of an elemental attack and the battler would
 *   absorb that element, the target will bypass the undead effect and recovers
 *   HP instead. Now your zombies can absorb "Darkness" elements.
 *
 * ---
 *
 * <Allow Undead Regen>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - If an undead battler gets affected by a trait object (such as a state)
 *   with this notetag, then HP Regeneration will no longer damage the undead
 *   enemy but instead, heal it.
 *
 * ---
 * 
 * === Enemy-Only Effects ===
 * 
 * ---
 * 
 * <Death Transform>
 *  name: weight
 *  name: weight
 *  name: weight
 * </Death Transform>
 * 
 * - Used for: Enemy Notetags
 * - Upon death, the enemy will transform into another enemy with full HP/MP.
 * - Replace 'name' with the name of the enemy to transform into.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(: ) and just type in the 'name' instead.
 * 
 * Examples:
 * 
 * <Death Transform>
 *  Slime
 * </Death Transform>
 * 
 * <Death Transform>
 *  Slime: 75
 *  Goblin: 25
 * </Death Transform>
 * 
 * <Death Transform>
 *  Slime: 10
 *  Goblin
 * </Death Transform>
 * 
 * <Death Transform>
 *  Slime
 *  Goblin
 * </Death Transform>
 * 
 * ---
 * 
 * <Transform Animation: x>
 * 
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_0_CoreEngine!
 * - Plays an animation on the transforming enemy upon a successful transform.
 * - This goes on the TARGET enemy that will be transformed into.
 * - This does NOT go on the enemy that is being transformed from.
 * - Replace 'x' with a number representing the ID of the animation you wish to
 *   play on the transforming enemy.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Effect Settings
 * ============================================================================
 * 
 * Auto-Life Settings
 * Curse Settings
 * Doom Settings
 * Fragile Settings
 * Guts Settings
 * Undead Settings
 * Transform Settings
 *
 * When certain effects trigger, you can have an animation play (if the
 * VisuStella MZ Core Engine is also installed) and/or a popup appear, too.
 * Each of the six effects provided by this plugin have animation and popup
 * effects that can be adjusted.
 *
 * ---
 *
 * Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - Requires VisuMZ_0_CoreEngine.
 *
 * ---
 *
 * Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
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
 * Version 1.07: June 13, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Arisu:
 * *** <Extinct>
 * **** When this state effect applied to a target, the target is no longer
 *      able to revive or be revived until this state is removed.
 * 
 * Version 1.06: December 14, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Arisu:
 * *** <Allow Undead Regen>
 * **** If an undead battler gets affected by a trait object (such as a state)
 *      with this notetag, then HP Regeneration will no longer damage the
 *      undead enemy but instead, heal it.
 * 
 * Version 1.05: October 12, 2023
 * * Bug Fixes!
 * ** Fixed a bug where if an undead target absorbs elemental damage, they
 *    would take damage instead of recovering it. This is now reversed and
 *    undead targets can now absorb the dark elemental energy you throw at it.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for <Undead> notetag.
 * *** If the battler is the target of an elemental attack and the battler
 *     would absorb that element, the target will bypass the undead effect and
 *     recovers HP instead. Now your zombies can absorb "Darkness" elements.
 * 
 * Version 1.04: March 10, 2022
 * * Documentation Update!
 * ** Added new bullet point to feature list.
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags & Plugin Parameters added by Olivia and sponsored by AndyL:
 * *** Death Transformation
 * **** When an enemy dies (and only works for enemies), transform them into
 *      another enemy with full HP/MP. This can be from a random pool of
 *      enemies, a weighted pool of enemies, a mix, or a single specific enemy.
 * **** Animations and popups will play upon a death transformation. Unique
 *      animations can also be set for specific target transformations.
 * 
 * Version 1.03: June 24, 2021
 * * Bug Fixes!
 * ** Doom expiration should no longer affect temporary actors during
 *    calculations and causing crashes. Fix made by Olivia.
 * 
 * Version 1.02: March 12, 2021
 * * Bug Fixes!
 * ** When Doom is applied but the battler later gains state resistance to
 *    Doom, Doom will no longer instantly kill the battler. Fix made by Irina.
 * 
 * Version 1.01: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent an infinite loop with Doom. Fix made by Olivia.
 *
 * Version 1.00: October 7, 2020
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
 * @param LifeStateEffects
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param AutoLife:struct
 * @text Auto Life Settings
 * @type struct<Effect>
 * @desc Notification settings pertaining to the Auto Life effect.
 * @default {"Animation":"","AnimationID:num":"50","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"AUTOLIFE","TextColor:str":"0","FlashColor:eval":"[0, 255, 128, 160]","FlashDuration:num":"60"}
 *
 * @param Curse:struct
 * @text Curse Settings
 * @type struct<Effect>
 * @desc Notification settings pertaining to the Curse effect.
 * @default {"Animation":"","AnimationID:num":"54","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"CURSE","TextColor:str":"0","FlashColor:eval":"[0, 0, 128, 160]","FlashDuration:num":"60"}
 *
 * @param Doom:struct
 * @text Doom Settings
 * @type struct<Effect>
 * @desc Notification settings pertaining to the Doom effect.
 * @default {"Animation":"","AnimationID:num":"65","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"DOOM","TextColor:str":"0","FlashColor:eval":"[128, 0, 0, 160]","FlashDuration:num":"60"}
 *
 * @param Fragile:struct
 * @text Fragile Settings
 * @type struct<Effect>
 * @desc Notification settings pertaining to the Fragile effect.
 * @default {"Animation":"","AnimationID:num":"60","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"FRAGILE","TextColor:str":"0","FlashColor:eval":"[255, 0, 0, 160]","FlashDuration:num":"60"}
 *
 * @param Guts:struct
 * @text Guts Settings
 * @type struct<Effect>
 * @desc Notification settings pertaining to the Guts effect.
 * @default {"Animation":"","AnimationID:num":"51","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"GUTS","TextColor:str":"0","FlashColor:eval":"[255, 255, 255, 160]","FlashDuration:num":"60"}
 *
 * @param Undead:struct
 * @text Undead Settings
 * @type struct<Effect>
 * @desc Notification settings pertaining to the Undead effect.
 * @default {"Animation":"","AnimationID:num":"58","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"UNDEAD","TextColor:str":"0","FlashColor:eval":"[128, 128, 128, 160]","FlashDuration:num":"60"}
 *
 * @param Transform:struct
 * @text Transform Settings
 * @type struct<Effect>
 * @desc Notification settings pertaining to the Transform effect.
 * This also affects event commands for transformation.
 * @default {"Animation":"","AnimationID:num":"49","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"TRANSFORM","TextColor:str":"0","FlashColor:eval":"[255, 255, 0, 160]","FlashDuration:num":"60"}
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
 * Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Effect:
 *
 * @param Animation
 *
 * @param AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Requires VisuMZ_0_CoreEngine.
 * @default 0
 *
 * @param Mirror:eval
 * @text Mirror Animation
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param Mute:eval
 * @text Mute Animation
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param Popups
 *
 * @param PopupText:str
 * @text Text
 * @parent Popups
 * @desc Text displayed upon the effect activating.
 * @default TEXT
 *
 * @param TextColor:str
 * @text Text Color
 * @parent Popups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 160]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent Popups
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
//=============================================================================

function _0x5b4d(_0x4bb1a7,_0x12ca7a){const _0xb6db3f=_0x521b();return _0x5b4d=function(_0x2ef5ea,_0x455e5f){_0x2ef5ea=_0x2ef5ea-(0x1c8b*-0x1+-0x2325+0x407c*0x1);let _0xd5f841=_0xb6db3f[_0x2ef5ea];return _0xd5f841;},_0x5b4d(_0x4bb1a7,_0x12ca7a);}const _0x2109ee=_0x5b4d;function _0x521b(){const _0x12c56b=['performCol','\x20%3\x20plugin','clamp','noHealMp','onmeo','isEnemy','gVisuMzDoo','_removeSta','refresh','some','t\x20match\x20pl','owUndeadRe','ion','getDeathTr','seState','mMCTg','parse','myID','concat','reorder\x20th','pIIwk','21BhUROB','executeDam','isDead','FlashColor','adHpHeal','setupTextP','HpExtinct','kState','teCurseMpE','_enemyIDs','deathTrans','Game_Enemy','pDamage_Ex','subject','DsMMK','\x20a\x20Tier\x20%2','_cache','ConvertPar','teAllowUnd','er_regener','tesAutoInE','_motion','DYhrX','extinct','202808WLtYcb','GNrpm','amage','er_addStat','VmJbT','states','killsState','AnimationI','er_gainMpC','Mute','eXCGN','removeStat','skills','hpDamage','Effect','usCore','HJaLR','er_gainHpE','Mirror','IdJsa','erBase_era','NHJSn','ead','UJNYo','isStateAdd','ARRAYFUNC','PopupText','urse','isSceneBat','ctAddNorma','ClearState','er_gainHp','processRan','uocUY','match','UbGik','eAutoLifeE','ffects','hpAffected','_result','ateHp','erBase_has','38397732aDqjgq','ormationAn','7OgPQpU','setHp','erBase_add','ease\x20updat','LQBeq','_transform','install\x20%2','wcFUB','n_executeH','max','myNUP','ffects_All','54UYsmdd','1227444iXdUiG','ARRAYNUM','Hkqwt','_allowUnde','rXihv','ARRAYJSON','isHpEffect','startDamag','Key','aYQKj','ired\x20plugi','zHUcb','teUndeadEf','TeMzt','requestFau','trim','traitObjec','ate','teAutoLife','xJrrO','performDea','postTransf','yqBGy','requestMot','teGutsEffe','exit','teCurseHpE','ffect','return\x200','wvvYl','isStateAff','xAnimation','RegExp','Settings','gpLsJ','ARRAYSTR','%1\x27s\x20versi','format','FEJMn','KmyfS','deathState','2eaKWBt','on\x20does\x20no','other\x20Tier','attleCore','eraseState','CzaRI','iYaKG','ugin\x27s.\x20Pl','IVzUS','Guts','1995104XmChzx','oWnVg','hasExtinct','gvtvb','toUpperCas','er_isState','AutoLife','enemy','fcPkq','pewXg','aced\x20over\x20','remove','gainMp','transform','ePopup','FlashDurat','tle','onLifeStat','allowUndea','descriptio','yWwli','able','er_gainHpC','checkCache','bXKFI','LifeStateE','addNewStat','executeHpD','HJMcf','e\x20plugin\x20l','Togev','rUmUU','joblb','KxXtP','erBase_set','e\x20it\x20in\x20th','ionEffect','DDitq','tate','clearResul','Transform','ected','QWdSW','ffects_Cur','trict','er_gainTp','hmgkM','parameters','EVAL','gainHp','ZreDS','applyDeath','thTransfor','er_removeS','VisuMZ_0_C','name','oreEngine','addState','pDamage','note','Fragile','ctAddAttac','10736238ekPNka','\x20into\x20the\x20','teFragileE','dead','isStateRes','GbHjf','PVqsL','eDoomEffec','KUWFl','2398jnquRG','version','fect','8008155nufeDi','qXpAg','ansformEne','seMp','teCurseTpE','LFMLc','_processin','inct','hasLifeSta','LifeStateA','gen','n_executeD','IaANS','seTp','eEffect','zPGux','tlHnU','JZgHa','rAXiu','ect','transformA','AddAttackS','tinct','n.\x0aPlease\x20','GOJfl','setMp','DiCwe','ier\x20number','qOIdr','imation','lLyXh','n_itemEffe','oLife','MDeUj','eadRegenEf','gainTp','mhp','e\x20Plugin\x20M','esAuto','noHealHp','mEffect','getStateRe','Undead','tatesAuto','itemEffect','gile','ansform','prototype','Game_Actio','guts','map','tainType','NewState','rrectly\x20pl','Plugin\x20Man','13660BDbOhz','ceil','getEnemyId','battler','onAnimatio','NOViK','calcElemen','vadrF','utoLifeEff','dRegen','Curse','WithName','dataId','call','form','AddNormalS','xtinct','sCPap','wrHlb','ffects_Fra','playPostTr','age','ansformati','Game_Battl','lementStat','ams','%1\x20is\x20miss','regenerate','JvzmM'];_0x521b=function(){return _0x12c56b;};return _0x521b();}(function(_0x16bc39,_0x46089c){const _0x440238=_0x5b4d,_0x5725b5=_0x16bc39();while(!![]){try{const _0x398c84=parseInt(_0x440238(0x1eb))/(-0x1*-0x14f1+0x1*0x21b5+-0x36a5)*(-parseInt(_0x440238(0xdd))/(-0x2*0xa99+0x2b*-0xdf+-0x3aa9*-0x1))+-parseInt(_0x440238(0x19a))/(0x15*0xd9+0x2066+-0x646*0x8)*(-parseInt(_0x440238(0x1b2))/(-0x1c70+-0x190b+-0xf*-0x391))+parseInt(_0x440238(0x131))/(-0x1852*0x1+-0x1f2f+0x3786)+-parseInt(_0x440238(0x125))/(-0x89d+-0xf35+-0xe*-0x1b4)*(parseInt(_0x440238(0x1de))/(0xd04+-0xee+0x3*-0x405))+parseInt(_0x440238(0xe7))/(-0x245f+0x23a2+0xc5)*(-parseInt(_0x440238(0x1ea))/(-0xefb+0x81b*0x2+-0x9*0x22))+-parseInt(_0x440238(0x168))/(0x1*0x73d+-0x1*0x7b7+0x16*0x6)*(-parseInt(_0x440238(0x12e))/(-0x240b+0x13f7+0x101f*0x1))+parseInt(_0x440238(0x1dc))/(0x226a+-0x1fce+-0x10*0x29);if(_0x398c84===_0x46089c)break;else _0x5725b5['push'](_0x5725b5['shift']());}catch(_0x2a7d0c){_0x5725b5['push'](_0x5725b5['shift']());}}}(_0x521b,0x9095d+-0x1c84bf+0x1*0x21d729));var label=_0x2109ee(0x100)+_0x2109ee(0x1d7),tier=tier||-0x151*-0x2+-0x174a+-0x8*-0x295,dependencies=['VisuMZ_1_B'+_0x2109ee(0xe0),'VisuMZ_1_S'+_0x2109ee(0x1b8)+'sCore'],pluginData=$plugins['filter'](function(_0x3bdaf2){const _0x171243=_0x2109ee,_0x5c970b={'fcPkq':function(_0x495edb,_0x3f5d96){return _0x495edb+_0x3f5d96;}};return _0x3bdaf2['status']&&_0x3bdaf2['descriptio'+'n']['includes'](_0x5c970b[_0x171243(0xef)](_0x5c970b['fcPkq']('[',label),']'));})[0x2*0x11d4+-0x12a1+0x1*-0x1107];VisuMZ[label][_0x2109ee(0xd5)]=VisuMZ[label][_0x2109ee(0xd5)]||{},VisuMZ['ConvertPar'+_0x2109ee(0x181)]=function(_0x353325,_0x45ae9c){const _0x3d5cdf=_0x2109ee,_0x1b3a32={'tlHnU':function(_0x4112a4,_0x1ac001){return _0x4112a4(_0x1ac001);},'DsMMK':function(_0x167298,_0x26a2ce){return _0x167298(_0x26a2ce);},'QWdSW':'NUM','wcFUB':function(_0xb9a587,_0x5d48f8){return _0xb9a587!==_0x5d48f8;},'MqiPi':function(_0x58b059,_0x518099){return _0x58b059(_0x518099);},'UbGik':_0x3d5cdf(0x1ec),'LFMLc':_0x3d5cdf(0x117),'gvtvb':function(_0x2723b7,_0x8ddb29){return _0x2723b7!==_0x8ddb29;},'uiEde':function(_0x5106f3,_0x279341){return _0x5106f3(_0x279341);},'rXihv':'ARRAYEVAL','wrHlb':'JSON','KUWFl':function(_0x5863ea,_0x12f756){return _0x5863ea!==_0x12f756;},'uepOF':_0x3d5cdf(0x1f0),'CsVpo':'FUNC','zHUcb':function(_0xbb3c47,_0x594082){return _0xbb3c47!==_0x594082;},'TeMzt':_0x3d5cdf(0xd0),'rfeuI':_0x3d5cdf(0x1cb),'RCQfm':function(_0x1f4f73,_0x4c7d52){return _0x1f4f73!==_0x4c7d52;},'qOIdr':'STR','cVRIv':function(_0x5a455b,_0x4fbfa7){return _0x5a455b!==_0x4fbfa7;},'yWwli':_0x3d5cdf(0xd7),'NOViK':function(_0x44816b,_0x2c2d72){return _0x44816b!==_0x2c2d72;},'JZgHa':'STRUCT','aYQKj':'ARRAYSTRUC'+'T'};for(const _0x1ed189 in _0x45ae9c){if(_0x1ed189[_0x3d5cdf(0x1d4)](/(.*):(.*)/i)){const _0x3c86e7=_0x1b3a32[_0x3d5cdf(0x141)](String,RegExp['$1']),_0x52bead=_0x1b3a32[_0x3d5cdf(0x1a8)](String,RegExp['$2'])[_0x3d5cdf(0xeb)+'e']()[_0x3d5cdf(0x1fa)]();let _0x1f7978,_0x5f4037,_0x2cfce9;switch(_0x52bead){case _0x1b3a32[_0x3d5cdf(0x111)]:_0x1f7978=_0x1b3a32[_0x3d5cdf(0x1e5)](_0x45ae9c[_0x1ed189],'')?_0x1b3a32['MqiPi'](Number,_0x45ae9c[_0x1ed189]):-0x14f7+0x2516+-0x101f*0x1;break;case _0x1b3a32[_0x3d5cdf(0x1d5)]:_0x5f4037=_0x1b3a32['wcFUB'](_0x45ae9c[_0x1ed189],'')?JSON[_0x3d5cdf(0x195)](_0x45ae9c[_0x1ed189]):[],_0x1f7978=_0x5f4037[_0x3d5cdf(0x163)](_0x2b0a84=>Number(_0x2b0a84));break;case _0x1b3a32[_0x3d5cdf(0x136)]:_0x1f7978=_0x1b3a32['gvtvb'](_0x45ae9c[_0x1ed189],'')?_0x1b3a32['uiEde'](eval,_0x45ae9c[_0x1ed189]):null;break;case _0x1b3a32[_0x3d5cdf(0x1ef)]:_0x5f4037=_0x1b3a32['wcFUB'](_0x45ae9c[_0x1ed189],'')?JSON[_0x3d5cdf(0x195)](_0x45ae9c[_0x1ed189]):[],_0x1f7978=_0x5f4037[_0x3d5cdf(0x163)](_0x56c13b=>eval(_0x56c13b));break;case _0x1b3a32[_0x3d5cdf(0x17a)]:_0x1f7978=_0x1b3a32[_0x3d5cdf(0x12d)](_0x45ae9c[_0x1ed189],'')?JSON[_0x3d5cdf(0x195)](_0x45ae9c[_0x1ed189]):'';break;case _0x1b3a32['uepOF']:_0x5f4037=_0x1b3a32[_0x3d5cdf(0xea)](_0x45ae9c[_0x1ed189],'')?JSON['parse'](_0x45ae9c[_0x1ed189]):[],_0x1f7978=_0x5f4037[_0x3d5cdf(0x163)](_0x51cc6b=>JSON[_0x3d5cdf(0x195)](_0x51cc6b));break;case _0x1b3a32['CsVpo']:_0x1f7978=_0x1b3a32[_0x3d5cdf(0x1f6)](_0x45ae9c[_0x1ed189],'')?new Function(JSON[_0x3d5cdf(0x195)](_0x45ae9c[_0x1ed189])):new Function(_0x1b3a32[_0x3d5cdf(0x1f8)]);break;case _0x1b3a32['rfeuI']:_0x5f4037=_0x1b3a32['RCQfm'](_0x45ae9c[_0x1ed189],'')?JSON[_0x3d5cdf(0x195)](_0x45ae9c[_0x1ed189]):[],_0x1f7978=_0x5f4037[_0x3d5cdf(0x163)](_0x558314=>new Function(JSON[_0x3d5cdf(0x195)](_0x558314)));break;case _0x1b3a32[_0x3d5cdf(0x14d)]:_0x1f7978=_0x1b3a32['cVRIv'](_0x45ae9c[_0x1ed189],'')?_0x1b3a32['tlHnU'](String,_0x45ae9c[_0x1ed189]):'';break;case _0x1b3a32[_0x3d5cdf(0xfb)]:_0x5f4037=_0x1b3a32[_0x3d5cdf(0x16d)](_0x45ae9c[_0x1ed189],'')?JSON[_0x3d5cdf(0x195)](_0x45ae9c[_0x1ed189]):[],_0x1f7978=_0x5f4037[_0x3d5cdf(0x163)](_0x205ed7=>String(_0x205ed7));break;case _0x1b3a32[_0x3d5cdf(0x142)]:_0x2cfce9=_0x1b3a32['wcFUB'](_0x45ae9c[_0x1ed189],'')?JSON[_0x3d5cdf(0x195)](_0x45ae9c[_0x1ed189]):{},_0x1f7978=VisuMZ[_0x3d5cdf(0x1ab)+_0x3d5cdf(0x181)]({},_0x2cfce9);break;case _0x1b3a32[_0x3d5cdf(0x1f4)]:_0x5f4037=_0x1b3a32[_0x3d5cdf(0xea)](_0x45ae9c[_0x1ed189],'')?JSON[_0x3d5cdf(0x195)](_0x45ae9c[_0x1ed189]):[],_0x1f7978=_0x5f4037['map'](_0x436402=>VisuMZ[_0x3d5cdf(0x1ab)+_0x3d5cdf(0x181)]({},JSON[_0x3d5cdf(0x195)](_0x436402)));break;default:continue;}_0x353325[_0x3c86e7]=_0x1f7978;}}return _0x353325;},(_0x3d2b08=>{const _0x5bb8f2=_0x2109ee,_0x388bd8={'oWnVg':function(_0x2d3be7,_0x5c695){return _0x2d3be7(_0x5c695);},'tCuaw':_0x5bb8f2(0x182)+'ing\x20a\x20requ'+_0x5bb8f2(0x1f5)+_0x5bb8f2(0x148)+_0x5bb8f2(0x1e4)+_0x5bb8f2(0x126)+_0x5bb8f2(0x167)+'ager.','IdJsa':function(_0x43eb72,_0x83aa1d){return _0x43eb72(_0x83aa1d);},'KmyfS':function(_0x372952,_0x404916){return _0x372952!==_0x404916;},'DDitq':function(_0x305686,_0x1bebff){return _0x305686(_0x1bebff);},'Hkqwt':_0x5bb8f2(0xd8)+_0x5bb8f2(0xde)+_0x5bb8f2(0x18f)+_0x5bb8f2(0xe4)+_0x5bb8f2(0x1e1)+_0x5bb8f2(0x10a)+_0x5bb8f2(0x156)+'anager.','mMCTg':function(_0x130316,_0x2aaba4){return _0x130316<_0x2aaba4;},'FEJMn':'%1\x20is\x20inco'+_0x5bb8f2(0x166)+'aced\x20on\x20th'+_0x5bb8f2(0x104)+'ist.\x0aIt\x20is'+_0x5bb8f2(0x1a9)+'\x20plugin\x20pl'+_0x5bb8f2(0xf1)+_0x5bb8f2(0xdf)+_0x5bb8f2(0x186)+'s.\x0aPlease\x20'+_0x5bb8f2(0x198)+'e\x20plugin\x20l'+'ist\x20from\x20s'+'mallest\x20to'+'\x20largest\x20t'+_0x5bb8f2(0x14c)+'s.'},_0x3d1fa2=_0x3d2b08['name'];for(const _0xca7d7d of dependencies){if(!Imported[_0xca7d7d]){_0x388bd8['oWnVg'](alert,_0x388bd8['tCuaw'][_0x5bb8f2(0xd9)](_0x3d1fa2,_0xca7d7d)),SceneManager[_0x5bb8f2(0xcd)]();break;}}const _0x4b0152=_0x3d2b08[_0x5bb8f2(0xfa)+'n'];if(_0x4b0152[_0x5bb8f2(0x1d4)](/\[Version[ ](.*?)\]/i)){const _0x6caf65=_0x388bd8[_0x5bb8f2(0x1c5)](Number,RegExp['$1']);_0x388bd8[_0x5bb8f2(0xdb)](_0x6caf65,VisuMZ[label][_0x5bb8f2(0x12f)])&&(_0x388bd8[_0x5bb8f2(0x10c)](alert,_0x388bd8[_0x5bb8f2(0x1ed)]['format'](_0x3d1fa2,_0x6caf65)),SceneManager['exit']());}if(_0x4b0152[_0x5bb8f2(0x1d4)](/\[Tier[ ](\d+)\]/i)){const _0x3666a1=_0x388bd8[_0x5bb8f2(0xe8)](Number,RegExp['$1']);_0x388bd8[_0x5bb8f2(0x194)](_0x3666a1,tier)?(_0x388bd8[_0x5bb8f2(0xe8)](alert,_0x388bd8[_0x5bb8f2(0xda)][_0x5bb8f2(0xd9)](_0x3d1fa2,_0x3666a1,tier)),SceneManager[_0x5bb8f2(0xcd)]()):tier=Math[_0x5bb8f2(0x1e7)](_0x3666a1,tier);}VisuMZ['ConvertPar'+_0x5bb8f2(0x181)](VisuMZ[label]['Settings'],_0x3d2b08[_0x5bb8f2(0x116)]);})(pluginData),VisuMZ['LifeStateE'+_0x2109ee(0x1d7)][_0x2109ee(0xd4)]={'guts':/<(?:GUTS)>/i,'undead':/<(?:UNDEAD|ZOMBIE|DAMAGE FROM HEALING)>/i,'allowUndeadRegen':/<ALLOW (?:UNDEAD|ZOMBIE|DAMAGE FROM HEALING) REGEN(?:|ERATE)>/i,'fragile':/<(?:FRAGILE|ONE HIT KILL|DEATH ON HP DAMAGE)>/i,'noHealHp':/<(?:CANNOT HEAL HP|CANNOT RECOVER HP|CURSE HP)>/i,'noHealMp':/<(?:CANNOT HEAL MP|CANNOT RECOVER MP|CURSE MP)>/i,'noHealTp':/<(?:CANNOT HEAL TP|CANNOT RECOVER TP|CURSE TP)>/i,'autoLife':/<(?:AUTOLIFE|AUTO LIFE):[ ](\d+)([%％])>/i,'doom':/<(?:DOOM|DEATH SENTENCE)>/i,'extinct':/<EXTINCT(?:|TION)>/i,'deathTransform':/<DEATH (?:TRANSFORM|TRANSFORMATION)>\s*([\s\S]*)\s*<\/DEATH (?:TRANSFORM|TRANSFORMATION)>/i,'transformAni':/<(?:TRANSFORM|TRANSFORMATION) ANIMATION:[ ](\d+)>/i},DataManager[_0x2109ee(0x16a)+_0x2109ee(0x173)]=function(_0x3151b9){const _0x89315d=_0x2109ee;_0x3151b9=_0x3151b9[_0x89315d(0xeb)+'e']()[_0x89315d(0x1fa)](),this[_0x89315d(0x1a3)]=this[_0x89315d(0x1a3)]||{};if(this[_0x89315d(0x1a3)][_0x3151b9])return this[_0x89315d(0x1a3)][_0x3151b9];for(const _0x509b36 of $dataEnemies){if(!_0x509b36)continue;this[_0x89315d(0x1a3)][_0x509b36[_0x89315d(0x11e)][_0x89315d(0xeb)+'e']()['trim']()]=_0x509b36['id'];}return this[_0x89315d(0x1a3)][_0x3151b9]||0x2ed+-0x1cd7+0x19ea;},Game_Battler['prototype'][_0x2109ee(0xf8)+_0x2109ee(0x13f)]=function(_0x4175e9){const _0x3a9192=_0x2109ee,_0x59d5ad={'yqBGy':function(_0x65c412,_0x1c854b){return _0x65c412===_0x1c854b;},'gpLsJ':_0x3a9192(0x10f),'hmgkM':function(_0x15d523,_0x29c482){return _0x15d523>_0x29c482;},'EvCWu':function(_0x42de7e,_0x127b4a){return _0x42de7e!==_0x127b4a;}};if(!SceneManager['isSceneBat'+_0x3a9192(0xf7)]())return![];const _0x4ef2ce=VisuMZ[_0x3a9192(0x100)+'ffects'][_0x3a9192(0xd5)][_0x4175e9];if(!_0x4ef2ce)return;if(_0x59d5ad[_0x3a9192(0x201)](_0x4175e9,_0x59d5ad[_0x3a9192(0xd6)])&&_0x59d5ad[_0x3a9192(0x115)](this[_0x3a9192(0x200)+'ormationAn'+_0x3a9192(0x14e)](),-0xe3*0x9+-0x1e98+0x2693)){}else{if(Imported['VisuMZ_0_C'+_0x3a9192(0x11f)]&&_0x59d5ad['hmgkM'](_0x4ef2ce[_0x3a9192(0x1b9)+'D'],0x36*-0x56+0x1de3+-0xbbf)){const _0x5da0a4=[this],_0x185283=_0x4ef2ce[_0x3a9192(0x1b9)+'D'],_0x467939=_0x4ef2ce[_0x3a9192(0x1c4)],_0x4e18c4=_0x4ef2ce[_0x3a9192(0x1bb)];$gameTemp[_0x3a9192(0x1f9)+_0x3a9192(0xd3)](_0x5da0a4,_0x185283,_0x467939,_0x4e18c4);}}if(_0x59d5ad['EvCWu'](_0x4ef2ce[_0x3a9192(0x1cc)],'')){const _0x5f1821={'textColor':_0x4ef2ce['TextColor'],'flashColor':_0x4ef2ce[_0x3a9192(0x19d)],'flashDuration':_0x4ef2ce[_0x3a9192(0xf6)+_0x3a9192(0x191)]};this[_0x3a9192(0x19f)+'opup'](_0x4ef2ce['PopupText'],_0x5f1821);}},VisuMZ['LifeStateE'+_0x2109ee(0x1d7)][_0x2109ee(0x17f)+_0x2109ee(0x1e0)+'NewState']=Game_BattlerBase[_0x2109ee(0x160)][_0x2109ee(0x101)+'e'],Game_BattlerBase['prototype'][_0x2109ee(0x101)+'e']=function(_0x263f5b){const _0xbfc2ca=_0x2109ee,_0x5b9dd1={'pewXg':function(_0x225c5d,_0xa386a6){return _0x225c5d===_0xa386a6;}};if(_0x5b9dd1[_0xbfc2ca(0xf0)](_0x263f5b,this[_0xbfc2ca(0xdc)+'Id']())){if(this['hasLifeSta'+'teAutoLife'+_0xbfc2ca(0x1c0)]())return this[_0xbfc2ca(0xf8)+_0xbfc2ca(0x1d6)+'ffect']();if(this[_0xbfc2ca(0x18a)]()&&this['hasDeathTr'+_0xbfc2ca(0x15f)]())return this[_0xbfc2ca(0x1ff)+_0xbfc2ca(0x11b)+'m']();}VisuMZ[_0xbfc2ca(0x100)+_0xbfc2ca(0x1d7)][_0xbfc2ca(0x17f)+_0xbfc2ca(0x1e0)+_0xbfc2ca(0x165)][_0xbfc2ca(0x175)](this,_0x263f5b);},Game_BattlerBase['prototype'][_0x2109ee(0x139)+_0x2109ee(0x1fd)+_0x2109ee(0x1c0)]=function(){const _0x25db36=_0x2109ee,_0xf113d2={'sCPap':_0x25db36(0x100)+'ffects_Aut'+_0x25db36(0x151)};if(!SceneManager[_0x25db36(0x1ce)+_0x25db36(0xf7)]())return![];const _0x15c2e0=_0xf113d2[_0x25db36(0x179)];if(this['checkCache'+_0x25db36(0x1f3)](_0x15c2e0))return this['_cache'][_0x15c2e0];const _0x2757f3=this[_0x25db36(0x1fb)+'ts']()[_0x25db36(0x197)](this[_0x25db36(0x1be)]());return this[_0x25db36(0x1aa)][_0x15c2e0]=_0x2757f3[_0x25db36(0x18e)](_0x10ced5=>_0x10ced5&&_0x10ced5[_0x25db36(0x122)][_0x25db36(0x1d4)](VisuMZ[_0x25db36(0x100)+_0x25db36(0x1d7)][_0x25db36(0xd4)]['autoLife'])),this[_0x25db36(0x1aa)][_0x15c2e0];},Game_Battler[_0x2109ee(0x160)][_0x2109ee(0xf8)+_0x2109ee(0x1d6)+_0x2109ee(0xcf)]=function(){const _0x2bdafe=_0x2109ee,_0x26ecf2={'GbHjf':function(_0x3143ba,_0x2c386e){return _0x3143ba*_0x2c386e;},'DiCwe':function(_0x4c4c51,_0x52db8d){return _0x4c4c51<=_0x52db8d;},'OrOQc':_0x2bdafe(0xed)},_0x4e9891=JsonEx['makeDeepCo'+'py'](this[_0x2bdafe(0x1d9)]),_0x2cdace=VisuMZ[_0x2bdafe(0x100)+_0x2bdafe(0x1d7)][_0x2bdafe(0xd4)]['autoLife'];let _0x56fb4d=this[_0x2bdafe(0x1b7)]()[_0x2bdafe(0x163)](_0x318c2b=>_0x318c2b&&_0x318c2b[_0x2bdafe(0x122)]['match'](_0x2cdace)?Number(RegExp['$1'])*(0x37b+0x2624+-0x299f+0.01):0x5c6+-0xfde*0x1+0x4c*0x22);const _0x594ca=_0x56fb4d['reduce']((_0x14dc38,_0x32df74)=>_0x14dc38+_0x32df74,-0x2*0xea2+0x1145*0x1+0xbff);let _0x2e1980=Math[_0x2bdafe(0x169)](_0x26ecf2[_0x2bdafe(0x12a)](_0x594ca,this['mhp']));_0x2e1980=_0x2e1980[_0x2bdafe(0x187)](-0x179*-0x19+-0x3*0xa25+-0x662,this[_0x2bdafe(0x155)]);if(_0x26ecf2[_0x2bdafe(0x14b)](_0x2e1980,0x9f*0x11+0x563*-0x6+0x15c3))return;this['setHp'](_0x2e1980),this[_0x2bdafe(0x10e)+'t'](),this[_0x2bdafe(0x1d9)][_0x2bdafe(0x1bf)]=-_0x2e1980,this[_0x2bdafe(0x1d9)][_0x2bdafe(0x1d8)]=!![],this[_0x2bdafe(0x1f2)+_0x2bdafe(0xf5)]();for(const _0x419eb3 of this['states']()){if(!_0x419eb3)continue;_0x419eb3['note'][_0x2bdafe(0x1d4)](_0x2cdace)&&this[_0x2bdafe(0x1bd)+'e'](_0x419eb3['id']);}this[_0x2bdafe(0xf8)+_0x2bdafe(0x13f)](_0x26ecf2['OrOQc']),this['_result']=_0x4e9891;},VisuMZ['LifeStateE'+_0x2109ee(0x1d7)][_0x2109ee(0x17f)+_0x2109ee(0x11c)+_0x2109ee(0x15c)]=Game_Battler[_0x2109ee(0x160)][_0x2109ee(0x1bd)+_0x2109ee(0x157)],Game_Battler['prototype'][_0x2109ee(0x1bd)+_0x2109ee(0x157)]=function(_0x52d506){const _0x367145=_0x2109ee;this['_removeSta'+_0x367145(0x1ae)+'ffect']=!![],VisuMZ[_0x367145(0x100)+'ffects'][_0x367145(0x17f)+_0x367145(0x11c)+'tatesAuto']['call'](this,_0x52d506),this[_0x367145(0x18c)+_0x367145(0x1ae)+'ffect']=undefined;},VisuMZ['LifeStateE'+'ffects'][_0x2109ee(0x17f)+_0x2109ee(0x1c6)+_0x2109ee(0x193)]=Game_BattlerBase[_0x2109ee(0x160)][_0x2109ee(0xe1)],Game_BattlerBase[_0x2109ee(0x160)][_0x2109ee(0xe1)]=function(_0x161886){const _0x4cfb62=_0x2109ee,_0x42b1b8=this[_0x4cfb62(0xd2)+_0x4cfb62(0x110)](_0x161886);VisuMZ[_0x4cfb62(0x100)+_0x4cfb62(0x1d7)][_0x4cfb62(0x17f)+_0x4cfb62(0x1c6)+'seState']['call'](this,_0x161886);const _0x39d830=$dataStates[_0x161886];this[_0x4cfb62(0x18c)+_0x4cfb62(0x1ae)+_0x4cfb62(0xcf)]&&_0x39d830&&_0x39d830[_0x4cfb62(0x122)][_0x4cfb62(0x1d4)](VisuMZ[_0x4cfb62(0x100)+_0x4cfb62(0x1d7)][_0x4cfb62(0xd4)]['doom'])&&_0x42b1b8&&this[_0x4cfb62(0xf8)+'eDoomEffec'+'t']();},Game_Battler[_0x2109ee(0x160)][_0x2109ee(0xf8)+_0x2109ee(0x12c)+'t']=function(){const _0x172e3=_0x2109ee,_0x285beb={'qthfe':'Doom','MDeUj':_0x172e3(0x128)};if(this[_0x172e3(0x137)+_0x172e3(0x18b)+_0x172e3(0x159)])return;if(this['_tempBattl'+'er'])return;this[_0x172e3(0x137)+_0x172e3(0x18b)+_0x172e3(0x159)]=!![],this[_0x172e3(0x1df)](-0x1342+-0x40a+-0x1aa*-0xe),this[_0x172e3(0x18d)](),this[_0x172e3(0x137)+_0x172e3(0x18b)+'mEffect']=undefined;if(!this['isDead']())return;this[_0x172e3(0xf8)+_0x172e3(0x13f)](_0x285beb['qthfe']),this[_0x172e3(0x185)+'lapse'](),this[_0x172e3(0x202)+'ion'](_0x285beb[_0x172e3(0x152)]);const _0x43c2d6=this[_0x172e3(0x16b)]();_0x43c2d6&&(_0x43c2d6[_0x172e3(0x1af)]=_0x285beb[_0x172e3(0x152)]);},Game_BattlerBase['prototype'][_0x2109ee(0x139)+_0x2109ee(0x127)+_0x2109ee(0xcf)]=function(){const _0x187e32=_0x2109ee,_0x29ff49={'Togev':_0x187e32(0x100)+_0x187e32(0x17b)+_0x187e32(0x15e)};if(!SceneManager['isSceneBat'+_0x187e32(0xf7)]())return![];const _0x1ed88e=_0x29ff49[_0x187e32(0x105)];if(this[_0x187e32(0xfe)+_0x187e32(0x1f3)](_0x1ed88e))return this[_0x187e32(0x1aa)][_0x1ed88e];const _0x3b6aaa=this['traitObjec'+'ts']()[_0x187e32(0x197)](this['skills']());return this['_cache'][_0x1ed88e]=_0x3b6aaa[_0x187e32(0x18e)](_0x2fd453=>_0x2fd453&&_0x2fd453[_0x187e32(0x122)][_0x187e32(0x1d4)](VisuMZ[_0x187e32(0x100)+_0x187e32(0x1d7)]['RegExp']['fragile'])),this[_0x187e32(0x1aa)][_0x1ed88e];},VisuMZ[_0x2109ee(0x100)+'ffects'][_0x2109ee(0x161)+_0x2109ee(0x1e6)+_0x2109ee(0x121)]=Game_Action[_0x2109ee(0x160)][_0x2109ee(0x102)+_0x2109ee(0x1b4)],Game_Action[_0x2109ee(0x160)]['executeHpD'+_0x2109ee(0x1b4)]=function(_0x212dde,_0x5957ba){const _0x41a2b5=_0x2109ee,_0x961ae={'ztZmW':function(_0x3e793a,_0x2215de){return _0x3e793a>_0x2215de;},'HJMcf':_0x41a2b5(0x123)};VisuMZ[_0x41a2b5(0x100)+_0x41a2b5(0x1d7)][_0x41a2b5(0x161)+'n_executeH'+'pDamage'][_0x41a2b5(0x175)](this,_0x212dde,_0x5957ba),_0x961ae['ztZmW'](_0x5957ba,0x3*-0x124+-0x18a3+0x1c0f)&&_0x212dde['hasLifeSta'+_0x41a2b5(0x127)+_0x41a2b5(0xcf)]()&&(_0x212dde['setHp'](0x41c+0xcf*0x11+-0x28d*0x7),_0x212dde['onLifeStat'+_0x41a2b5(0x13f)](_0x961ae[_0x41a2b5(0x103)]));},Game_BattlerBase[_0x2109ee(0x160)][_0x2109ee(0x139)+'teGutsEffe'+'ct']=function(){const _0x47d5de=_0x2109ee,_0x343d95={'eXCGN':function(_0x5207b3,_0x194b4c){return _0x5207b3<=_0x194b4c;},'qXpAg':_0x47d5de(0x100)+'ffects_Gut'+'s'};if(!SceneManager[_0x47d5de(0x1ce)+'tle']())return![];if(_0x343d95[_0x47d5de(0x1bc)](this['hp'],0xf8f+0x7e7*0x1+-0x1775))return![];const _0xfb4582=_0x343d95[_0x47d5de(0x132)];if(this[_0x47d5de(0xfe)+'Key'](_0xfb4582))return this[_0x47d5de(0x1aa)][_0xfb4582];const _0xe52449=this[_0x47d5de(0x1fb)+'ts']()['concat'](this[_0x47d5de(0x1be)]());return this[_0x47d5de(0x1aa)][_0xfb4582]=_0xe52449['some'](_0x5c8640=>_0x5c8640&&_0x5c8640[_0x47d5de(0x122)][_0x47d5de(0x1d4)](VisuMZ[_0x47d5de(0x100)+_0x47d5de(0x1d7)][_0x47d5de(0xd4)][_0x47d5de(0x162)])),this['_cache'][_0xfb4582];},VisuMZ[_0x2109ee(0x100)+'ffects'][_0x2109ee(0x17f)+_0x2109ee(0x109)+'Hp']=Game_BattlerBase[_0x2109ee(0x160)][_0x2109ee(0x1df)],Game_BattlerBase[_0x2109ee(0x160)]['setHp']=function(_0x37d620){const _0x5d4646=_0x2109ee,_0x49b470={'IaANS':function(_0x1bcf18,_0x530ef5){return _0x1bcf18<=_0x530ef5;},'UJNYo':_0x5d4646(0xe6)};this[_0x5d4646(0x139)+_0x5d4646(0xcc)+'ct']()&&_0x49b470[_0x5d4646(0x13d)](_0x37d620,-0xa41+0xee1+-0x20*0x25)&&(this[_0x5d4646(0xf8)+_0x5d4646(0x13f)](_0x49b470[_0x5d4646(0x1c9)]),_0x37d620=0x67*0x47+-0x1*-0x1e5f+-0x6b*0x8d),VisuMZ[_0x5d4646(0x100)+'ffects'][_0x5d4646(0x17f)+_0x5d4646(0x109)+'Hp'][_0x5d4646(0x175)](this,_0x37d620);},Game_BattlerBase['prototype'][_0x2109ee(0x139)+'teUndeadEf'+'fect']=function(){const _0x5e32fc=_0x2109ee,_0x3d6f3b={'myNUP':'LifeStateE'+'ffects_Und'+_0x5e32fc(0x1c8)};if(this[_0x5e32fc(0x1ee)+'adHpHeal'])return![];const _0x355ec0=_0x3d6f3b[_0x5e32fc(0x1e8)];if(this[_0x5e32fc(0xfe)+_0x5e32fc(0x1f3)](_0x355ec0))return this[_0x5e32fc(0x1aa)][_0x355ec0];const _0x1422f5=this[_0x5e32fc(0x1fb)+'ts']()[_0x5e32fc(0x197)](this['skills']());return this[_0x5e32fc(0x1aa)][_0x355ec0]=_0x1422f5['some'](_0x234c8e=>_0x234c8e&&_0x234c8e[_0x5e32fc(0x122)][_0x5e32fc(0x1d4)](VisuMZ[_0x5e32fc(0x100)+_0x5e32fc(0x1d7)][_0x5e32fc(0xd4)]['undead'])),this[_0x5e32fc(0x1aa)][_0x355ec0];},VisuMZ['LifeStateE'+_0x2109ee(0x1d7)][_0x2109ee(0x17f)+_0x2109ee(0x1d1)]=Game_Battler[_0x2109ee(0x160)][_0x2109ee(0x118)],Game_Battler['prototype'][_0x2109ee(0x118)]=function(_0xe417ce){const _0x506537=_0x2109ee,_0xd60a44={'GNrpm':function(_0x590c0e,_0x39427f){return _0x590c0e>_0x39427f;},'pIIwk':_0x506537(0x15b)};this['hasLifeSta'+_0x506537(0x1f7)+_0x506537(0x130)]()&&_0xd60a44[_0x506537(0x1b3)](_0xe417ce,-0x1*0x17cd+0x1642+-0x4f*-0x5)&&(_0xe417ce*=-(-0x2546*-0x1+-0x142*-0x15+-0x3faf),this[_0x506537(0xf8)+'eEffect'](_0xd60a44[_0x506537(0x199)])),VisuMZ[_0x506537(0x100)+_0x506537(0x1d7)][_0x506537(0x17f)+_0x506537(0x1d1)][_0x506537(0x175)](this,_0xe417ce);},VisuMZ[_0x2109ee(0x100)+_0x2109ee(0x1d7)][_0x2109ee(0x161)+_0x2109ee(0x13c)+_0x2109ee(0x1b4)]=Game_Action['prototype'][_0x2109ee(0x19b)+_0x2109ee(0x17d)],Game_Action[_0x2109ee(0x160)][_0x2109ee(0x19b)+_0x2109ee(0x17d)]=function(_0x5961e2,_0x548274){const _0x19e86c=_0x2109ee,_0x57801c={'MWIDN':function(_0x3acae8,_0x18b08c){return _0x3acae8>_0x18b08c;},'rUmUU':_0x19e86c(0x15b),'Vqyob':function(_0x5ce027,_0x1185f5){return _0x5ce027<_0x1185f5;},'MVeSk':function(_0x96ec68,_0x15ffcc){return _0x96ec68<_0x15ffcc;}};this['isDrain']()&&this[_0x19e86c(0x1f1)]()&&_0x57801c['MWIDN'](_0x548274,0x974*-0x1+0x15*0x6a+-0xc2*-0x1)&&(this[_0x19e86c(0x1a7)]()[_0x19e86c(0x139)+_0x19e86c(0x1f7)+_0x19e86c(0x130)]()&&(this[_0x19e86c(0x1a7)]()[_0x19e86c(0x1ee)+_0x19e86c(0x19e)]=!![]),_0x5961e2[_0x19e86c(0x139)+_0x19e86c(0x1f7)+_0x19e86c(0x130)]()&&(_0x548274*=-(0x52f*0x3+-0x1*-0x329+-0x12b5),_0x5961e2[_0x19e86c(0x1ee)+'adHpHeal']=!![],_0x5961e2['onLifeStat'+_0x19e86c(0x13f)](_0x57801c[_0x19e86c(0x106)])));if(Imported['VisuMZ_1_E'+_0x19e86c(0x180)+_0x19e86c(0x1c1)]&&_0x57801c['Vqyob'](_0x548274,-0xcfb*0x1+0x1fa1+-0x9a*0x1f)&&_0x5961e2[_0x19e86c(0x139)+_0x19e86c(0x1f7)+_0x19e86c(0x130)]()){const _0x5b570c=this[_0x19e86c(0x16e)+'tRate'](_0x5961e2);if(_0x57801c['MVeSk'](_0x5b570c,0x1820+-0x799*0x5+0xddd))_0x5961e2[_0x19e86c(0x1ee)+'adHpHeal']=!![];}VisuMZ[_0x19e86c(0x100)+_0x19e86c(0x1d7)][_0x19e86c(0x161)+_0x19e86c(0x13c)+_0x19e86c(0x1b4)]['call'](this,_0x5961e2,_0x548274),_0x5961e2['_allowUnde'+_0x19e86c(0x19e)]=undefined,this['subject']()[_0x19e86c(0x1ee)+_0x19e86c(0x19e)]=undefined;},VisuMZ[_0x2109ee(0x100)+_0x2109ee(0x1d7)][_0x2109ee(0x161)+_0x2109ee(0x150)+_0x2109ee(0x124)+_0x2109ee(0x1a1)]=Game_Action[_0x2109ee(0x160)][_0x2109ee(0x15d)+'AddAttackS'+_0x2109ee(0x10d)],Game_Action[_0x2109ee(0x160)][_0x2109ee(0x15d)+_0x2109ee(0x146)+_0x2109ee(0x10d)]=function(_0x53e633,_0x1f19da){const _0x332e8e=_0x2109ee;_0x53e633[_0x332e8e(0x139)+_0x332e8e(0x1f7)+'fect']()&&(_0x53e633[_0x332e8e(0x1ee)+'adHpHeal']=!![]),VisuMZ[_0x332e8e(0x100)+_0x332e8e(0x1d7)][_0x332e8e(0x161)+'n_itemEffe'+_0x332e8e(0x124)+_0x332e8e(0x1a1)][_0x332e8e(0x175)](this,_0x53e633,_0x1f19da),_0x53e633[_0x332e8e(0x1ee)+_0x332e8e(0x19e)]=undefined;},VisuMZ[_0x2109ee(0x100)+_0x2109ee(0x1d7)][_0x2109ee(0x17f)+'er_addStat'+'e']=Game_Battler['prototype'][_0x2109ee(0x120)],Game_Battler[_0x2109ee(0x160)][_0x2109ee(0x120)]=function(_0x42694a){const _0x8690b=_0x2109ee,_0x347bf1={'GOJfl':function(_0x16fcf9,_0x5be09a){return _0x16fcf9===_0x5be09a;},'HObog':'Undead'};_0x347bf1[_0x8690b(0x149)](_0x42694a,this[_0x8690b(0xdc)+'Id']())&&this[_0x8690b(0x1ee)+'adHpHeal']?(this[_0x8690b(0x118)](this[_0x8690b(0x155)]),this[_0x8690b(0xf8)+_0x8690b(0x13f)](_0x347bf1['HObog'])):VisuMZ[_0x8690b(0x100)+_0x8690b(0x1d7)][_0x8690b(0x17f)+_0x8690b(0x1b5)+'e'][_0x8690b(0x175)](this,_0x42694a);},VisuMZ['LifeStateE'+_0x2109ee(0x1d7)][_0x2109ee(0x161)+_0x2109ee(0x150)+'ctAddNorma'+'lState']=Game_Action[_0x2109ee(0x160)][_0x2109ee(0x15d)+_0x2109ee(0x177)+_0x2109ee(0x10d)],Game_Action[_0x2109ee(0x160)]['itemEffect'+_0x2109ee(0x177)+_0x2109ee(0x10d)]=function(_0x186985,_0x4a87c1){const _0x10b22e=_0x2109ee,_0xc860ed={'NHJSn':function(_0x524f41,_0x28820f){return _0x524f41===_0x28820f;},'xJrrO':_0x10b22e(0x15b)};_0xc860ed[_0x10b22e(0x1c7)](_0x4a87c1[_0x10b22e(0x174)],_0x186985['deathState'+'Id']())&&_0x186985['hasLifeSta'+_0x10b22e(0x1f7)+_0x10b22e(0x130)]()?(_0x186985[_0x10b22e(0x1ee)+_0x10b22e(0x19e)]=!![],_0x186985[_0x10b22e(0x118)](_0x186985[_0x10b22e(0x155)]),_0x186985[_0x10b22e(0x1ee)+_0x10b22e(0x19e)]=undefined,_0x186985[_0x10b22e(0xf8)+_0x10b22e(0x13f)](_0xc860ed[_0x10b22e(0x1fe)])):VisuMZ[_0x10b22e(0x100)+_0x10b22e(0x1d7)][_0x10b22e(0x161)+_0x10b22e(0x150)+_0x10b22e(0x1cf)+'lState'][_0x10b22e(0x175)](this,_0x186985,_0x4a87c1);},Game_BattlerBase[_0x2109ee(0x160)][_0x2109ee(0x139)+_0x2109ee(0x1ac)+_0x2109ee(0x153)+_0x2109ee(0x130)]=function(){const _0x140c02=_0x2109ee,_0x3b56de={'HriRC':_0x140c02(0x100)+_0x140c02(0x1e9)+_0x140c02(0x190)+_0x140c02(0x13b)},_0x442944=_0x3b56de['HriRC'];if(this[_0x140c02(0xfe)+'Key'](_0x442944))return this[_0x140c02(0x1aa)][_0x442944];const _0xf1a18a=this['traitObjec'+'ts']()[_0x140c02(0x197)](this[_0x140c02(0x1be)]());return this[_0x140c02(0x1aa)][_0x442944]=_0xf1a18a[_0x140c02(0x18e)](_0x5f1427=>_0x5f1427&&_0x5f1427['note'][_0x140c02(0x1d4)](VisuMZ[_0x140c02(0x100)+_0x140c02(0x1d7)][_0x140c02(0xd4)][_0x140c02(0xf9)+_0x140c02(0x171)])),this[_0x140c02(0x1aa)][_0x442944];},VisuMZ[_0x2109ee(0x100)+_0x2109ee(0x1d7)]['Game_Battl'+_0x2109ee(0x1ad)+_0x2109ee(0x1da)]=Game_Battler['prototype'][_0x2109ee(0x183)+'Hp'],Game_Battler[_0x2109ee(0x160)][_0x2109ee(0x183)+'Hp']=function(){const _0x5237d8=_0x2109ee;this[_0x5237d8(0x139)+_0x5237d8(0x1f7)+_0x5237d8(0x130)]()&&this[_0x5237d8(0x139)+'teAllowUnd'+_0x5237d8(0x153)+_0x5237d8(0x130)]()&&(this[_0x5237d8(0x1ee)+'adHpHeal']=!![]),VisuMZ[_0x5237d8(0x100)+_0x5237d8(0x1d7)]['Game_Battl'+_0x5237d8(0x1ad)+'ateHp'][_0x5237d8(0x175)](this),this[_0x5237d8(0x1ee)+_0x5237d8(0x19e)]=undefined;},Game_BattlerBase[_0x2109ee(0x160)]['hasLifeSta'+_0x2109ee(0xce)+_0x2109ee(0xcf)]=function(){const _0x1bf1a6=_0x2109ee,_0x3fed5c={'IVzUS':_0x1bf1a6(0x100)+_0x1bf1a6(0x112)+'seHp'},_0x30c25c=_0x3fed5c[_0x1bf1a6(0xe5)];if(this[_0x1bf1a6(0xfe)+_0x1bf1a6(0x1f3)](_0x30c25c))return this['_cache'][_0x30c25c];const _0x5c6191=this[_0x1bf1a6(0x1fb)+'ts']()[_0x1bf1a6(0x197)](this[_0x1bf1a6(0x1be)]());return this[_0x1bf1a6(0x1aa)][_0x30c25c]=_0x5c6191[_0x1bf1a6(0x18e)](_0x449f64=>_0x449f64&&_0x449f64[_0x1bf1a6(0x122)][_0x1bf1a6(0x1d4)](VisuMZ['LifeStateE'+_0x1bf1a6(0x1d7)]['RegExp'][_0x1bf1a6(0x158)])),this[_0x1bf1a6(0x1aa)][_0x30c25c];},Game_BattlerBase[_0x2109ee(0x160)][_0x2109ee(0x139)+_0x2109ee(0x1a2)+_0x2109ee(0xcf)]=function(){const _0xfbcc2c=_0x2109ee,_0x4af357={'HJaLR':_0xfbcc2c(0x100)+_0xfbcc2c(0x112)+_0xfbcc2c(0x134)},_0x143cdc=_0x4af357[_0xfbcc2c(0x1c2)];if(this[_0xfbcc2c(0xfe)+_0xfbcc2c(0x1f3)](_0x143cdc))return this['_cache'][_0x143cdc];const _0x29bdd1=this[_0xfbcc2c(0x1fb)+'ts']()['concat'](this[_0xfbcc2c(0x1be)]());return this[_0xfbcc2c(0x1aa)][_0x143cdc]=_0x29bdd1[_0xfbcc2c(0x18e)](_0x4504fb=>_0x4504fb&&_0x4504fb['note'][_0xfbcc2c(0x1d4)](VisuMZ[_0xfbcc2c(0x100)+'ffects'][_0xfbcc2c(0xd4)][_0xfbcc2c(0x188)])),this[_0xfbcc2c(0x1aa)][_0x143cdc];},Game_BattlerBase[_0x2109ee(0x160)]['hasLifeSta'+_0x2109ee(0x135)+_0x2109ee(0xcf)]=function(){const _0x950566=_0x2109ee,_0x5299d7={'JvzmM':_0x950566(0x100)+_0x950566(0x112)+_0x950566(0x13e)},_0x3da3fc=_0x5299d7[_0x950566(0x184)];if(this[_0x950566(0xfe)+_0x950566(0x1f3)](_0x3da3fc))return this[_0x950566(0x1aa)][_0x3da3fc];const _0x16f7e8=this['traitObjec'+'ts']()[_0x950566(0x197)](this[_0x950566(0x1be)]());return this['_cache'][_0x3da3fc]=_0x16f7e8[_0x950566(0x18e)](_0x1ed1a7=>_0x1ed1a7&&_0x1ed1a7[_0x950566(0x122)]['match'](VisuMZ[_0x950566(0x100)+_0x950566(0x1d7)][_0x950566(0xd4)]['noHealTp'])),this['_cache'][_0x3da3fc];},VisuMZ[_0x2109ee(0x100)+_0x2109ee(0x1d7)][_0x2109ee(0x17f)+_0x2109ee(0xfd)+_0x2109ee(0x1cd)]=Game_Battler[_0x2109ee(0x160)][_0x2109ee(0x118)],Game_Battler[_0x2109ee(0x160)][_0x2109ee(0x118)]=function(_0x16e3c8){const _0x334c13=_0x2109ee,_0x423d74={'rZKJQ':function(_0x601594,_0x11f896){return _0x601594>_0x11f896;},'onmeo':'Curse'};_0x423d74['rZKJQ'](_0x16e3c8,0x1*0x1c37+0x175f+-0x3396)&&this['hasLifeSta'+'teCurseHpE'+_0x334c13(0xcf)]()&&(_0x16e3c8=-0x27*-0x16+0x1e34+-0x218e,this[_0x334c13(0xf8)+_0x334c13(0x13f)](_0x423d74[_0x334c13(0x189)])),VisuMZ[_0x334c13(0x100)+_0x334c13(0x1d7)]['Game_Battl'+_0x334c13(0xfd)+_0x334c13(0x1cd)][_0x334c13(0x175)](this,_0x16e3c8);},VisuMZ[_0x2109ee(0x100)+'ffects'][_0x2109ee(0x17f)+_0x2109ee(0x1ba)+'urse']=Game_Battler[_0x2109ee(0x160)]['gainMp'],Game_Battler['prototype'][_0x2109ee(0xf3)]=function(_0x3ef531){const _0xf966a3=_0x2109ee,_0xc3a272={'ZreDS':function(_0x4fb987,_0x2aee05){return _0x4fb987>_0x2aee05;},'joblb':_0xf966a3(0x172)};_0xc3a272[_0xf966a3(0x119)](_0x3ef531,-0xb*0xc0+0x137a+-0x2*0x59d)&&this[_0xf966a3(0x139)+_0xf966a3(0x1a2)+_0xf966a3(0xcf)]()&&(_0x3ef531=0x1bab+0x9*-0x367+0x54*0x9,this[_0xf966a3(0xf8)+'eEffect'](_0xc3a272[_0xf966a3(0x107)])),VisuMZ[_0xf966a3(0x100)+_0xf966a3(0x1d7)][_0xf966a3(0x17f)+_0xf966a3(0x1ba)+_0xf966a3(0x1cd)][_0xf966a3(0x175)](this,_0x3ef531);},VisuMZ['LifeStateE'+_0x2109ee(0x1d7)][_0x2109ee(0x17f)+_0x2109ee(0x114)]=Game_Battler[_0x2109ee(0x160)][_0x2109ee(0x154)],Game_Battler[_0x2109ee(0x160)][_0x2109ee(0x154)]=function(_0x31ed9d){const _0xaa0726=_0x2109ee,_0x331f4b={'vFuBg':function(_0x2804ab,_0x4305f3){return _0x2804ab>_0x4305f3;},'DYhrX':'Curse'};_0x331f4b['vFuBg'](_0x31ed9d,-0xd20+0x4*-0xa7+0xfbc)&&this[_0xaa0726(0x139)+_0xaa0726(0x135)+_0xaa0726(0xcf)]()&&(_0x31ed9d=-0x17e2+0xbe+0x4*0x5c9,this['onLifeStat'+_0xaa0726(0x13f)](_0x331f4b[_0xaa0726(0x1b0)])),VisuMZ[_0xaa0726(0x100)+_0xaa0726(0x1d7)]['Game_Battl'+'er_gainTp'][_0xaa0726(0x175)](this,_0x31ed9d);},Game_BattlerBase[_0x2109ee(0x160)]['hasDeathTr'+_0x2109ee(0x15f)]=function(){return![];},Game_Enemy[_0x2109ee(0x160)]['hasDeathTr'+_0x2109ee(0x15f)]=function(){const _0x1e7cbe=_0x2109ee;return this[_0x1e7cbe(0xee)]()[_0x1e7cbe(0x122)][_0x1e7cbe(0x1d4)](VisuMZ[_0x1e7cbe(0x100)+_0x1e7cbe(0x1d7)][_0x1e7cbe(0xd4)]['deathTrans'+'form']);},Game_Enemy[_0x2109ee(0x160)]['performDea'+_0x2109ee(0x11b)+'m']=function(){const _0x3058d3=_0x2109ee,_0x2c6c6f={'CzaRI':function(_0x52560b,_0x524aba){return _0x52560b>_0x524aba;}},_0x1f47fa=this[_0x3058d3(0x192)+'ansformEne'+_0x3058d3(0x196)]();if(_0x2c6c6f[_0x3058d3(0xe2)](_0x1f47fa,0xb20+0x1*-0x17bd+0xc9d))this[_0x3058d3(0x11a)+'Transform'](_0x1f47fa);else{const _0x5b3ad9=this[_0x3058d3(0xdc)+'Id']();VisuMZ[_0x3058d3(0x100)+_0x3058d3(0x1d7)]['Game_Battl'+'erBase_add'+_0x3058d3(0x165)][_0x3058d3(0x175)](this,_0x5b3ad9);}},Game_Enemy[_0x2109ee(0x160)][_0x2109ee(0x192)+_0x2109ee(0x133)+_0x2109ee(0x196)]=function(){const _0x17e60b=_0x2109ee,_0x4aa544={'KxXtP':function(_0x3d3618,_0x549f95){return _0x3d3618(_0x549f95);},'uocUY':function(_0x325f79,_0x517077){return _0x325f79(_0x517077);}},_0x15e986=VisuMZ['LifeStateE'+_0x17e60b(0x1d7)][_0x17e60b(0xd4)],_0x50ae49=this['enemy']()['note']||'';if(_0x50ae49[_0x17e60b(0x1d4)](_0x15e986[_0x17e60b(0x1a4)+_0x17e60b(0x176)])){const _0x4cc135=_0x4aa544[_0x17e60b(0x108)](String,RegExp['$1'])['split'](/[\r\n]+/)[_0x17e60b(0xf2)](''),_0x1487f6=DataManager[_0x17e60b(0x1d2)+'domizedDat'+'a'](_0x4cc135);return _0x1487f6[_0x17e60b(0x1d4)](/ENEMY[ ](\d+)/i)?_0x4aa544[_0x17e60b(0x1d3)](Number,RegExp['$1']):DataManager[_0x17e60b(0x16a)+_0x17e60b(0x173)](_0x1487f6);}return-0x1da6+-0x1*-0x55+0x1d51;},Game_Enemy[_0x2109ee(0x160)][_0x2109ee(0x11a)+'Transform']=function(_0x4ce2e6){const _0x1404e2=_0x2109ee,_0x336b4b={'PVqsL':function(_0x48e055,_0x4cc784){return _0x48e055(_0x4cc784);}};this[_0x1404e2(0xf4)](_0x336b4b[_0x1404e2(0x12b)](Number,_0x4ce2e6)),this[_0x1404e2(0x1aa)]={},this['setHp'](this['mhp']),this[_0x1404e2(0x14a)](this['mmp']);},VisuMZ[_0x2109ee(0x100)+'ffects']['Game_Enemy'+_0x2109ee(0x1e3)]=Game_Enemy[_0x2109ee(0x160)][_0x2109ee(0xf4)],Game_Enemy['prototype']['transform']=function(_0x304207){const _0x524601=_0x2109ee,_0x246f8b={'iYaKG':'Transform'};VisuMZ['LifeStateE'+_0x524601(0x1d7)][_0x524601(0x1a5)+'_transform']['call'](this,_0x304207),this['onLifeStat'+'eEffect'](_0x246f8b[_0x524601(0xe3)]),this[_0x524601(0x17c)+_0x524601(0x17e)+_0x524601(0x16c)+'n']();},Game_Enemy[_0x2109ee(0x160)][_0x2109ee(0x17c)+_0x2109ee(0x17e)+_0x2109ee(0x16c)+'n']=function(){const _0x1d3e0b=_0x2109ee,_0x720af5={'bXKFI':function(_0x3ce774,_0x2038c3){return _0x3ce774>_0x2038c3;},'vadrF':_0x1d3e0b(0x10f)};if(!Imported[_0x1d3e0b(0x11d)+_0x1d3e0b(0x11f)])return;const _0x468085=this[_0x1d3e0b(0x200)+_0x1d3e0b(0x1dd)+_0x1d3e0b(0x14e)]();if(_0x720af5[_0x1d3e0b(0xff)](_0x468085,-0x5*0x4e3+0xac2*0x2+-0x9*-0x53)){const _0x58ed9d=VisuMZ[_0x1d3e0b(0x100)+'ffects']['Settings'][_0x720af5[_0x1d3e0b(0x16f)]],_0x5fd353=[this],_0x3f84f3=_0x58ed9d[_0x1d3e0b(0x1c4)]||![],_0x415cf3=_0x58ed9d[_0x1d3e0b(0x1bb)]||![];$gameTemp[_0x1d3e0b(0x1f9)+'xAnimation'](_0x5fd353,_0x468085,_0x3f84f3,_0x415cf3);}},Game_BattlerBase['prototype'][_0x2109ee(0x200)+_0x2109ee(0x1dd)+'imation']=function(){return-0x346+0x4f*0x5c+-0x191e;},Game_Enemy[_0x2109ee(0x160)][_0x2109ee(0x200)+_0x2109ee(0x1dd)+_0x2109ee(0x14e)]=function(){const _0x5f1e12=_0x2109ee,_0x53f5ad={'ncFpB':function(_0x190fb0,_0x2d557b){return _0x190fb0(_0x2d557b);}},_0x449055=VisuMZ['LifeStateE'+_0x5f1e12(0x1d7)]['RegExp'],_0x35dd14=this['enemy']()[_0x5f1e12(0x122)]||'';return _0x35dd14['match'](_0x449055[_0x5f1e12(0x145)+'ni'])?_0x53f5ad['ncFpB'](Number,RegExp['$1']):-0x9*0x257+0x396*0x1+0x9*0x1f1;},VisuMZ[_0x2109ee(0x100)+_0x2109ee(0x1d7)]['Game_Battl'+_0x2109ee(0x11c)+_0x2109ee(0x10d)]=Game_Battler[_0x2109ee(0x160)]['removeStat'+'e'],Game_Battler[_0x2109ee(0x160)][_0x2109ee(0x1bd)+'e']=function(_0x1b8453){const _0x5a7564=_0x2109ee,_0x2fa74d={'rAXiu':function(_0x6d0fbb,_0x55c726){return _0x6d0fbb===_0x55c726;}};if(_0x2fa74d[_0x5a7564(0x143)](_0x1b8453,this[_0x5a7564(0xdc)+'Id']())&&this['hasExtinct'+_0x5a7564(0x10b)]())return;VisuMZ[_0x5a7564(0x100)+'ffects'][_0x5a7564(0x17f)+_0x5a7564(0x11c)+'tate'][_0x5a7564(0x175)](this,_0x1b8453);},Game_Battler[_0x2109ee(0x160)][_0x2109ee(0xe9)+_0x2109ee(0x10b)]=function(){const _0x2b9326=_0x2109ee,_0x1a90ee=VisuMZ['LifeStateE'+_0x2b9326(0x1d7)]['RegExp'];return this['states']()[_0x2b9326(0x18e)](_0x8fd6e3=>_0x8fd6e3[_0x2b9326(0x122)]['match'](_0x1a90ee[_0x2b9326(0x1b1)]));},VisuMZ['LifeStateE'+'ffects'][_0x2109ee(0x17f)+'erBase_can'+_0x2109ee(0x1d0)]=Game_BattlerBase[_0x2109ee(0x160)]['canClearSt'+_0x2109ee(0x1fc)],Game_BattlerBase[_0x2109ee(0x160)]['canClearSt'+_0x2109ee(0x1fc)]=function(_0x3b1671){const _0x197f2d=_0x2109ee,_0x480273={'wvvYl':function(_0x1c8481,_0x4cd37b){return _0x1c8481===_0x4cd37b;},'zPGux':'death'},_0x59e0ec=this[_0x197f2d(0x15a)+_0x197f2d(0x164)](),_0x3899ab=VisuMZ['LifeStateE'+_0x197f2d(0x1d7)][_0x197f2d(0xd4)];if(_0x480273[_0x197f2d(0xd1)](_0x59e0ec,_0x480273[_0x197f2d(0x140)])&&_0x3b1671&&_0x3b1671[_0x197f2d(0x122)][_0x197f2d(0x1d4)](_0x3899ab[_0x197f2d(0x1b1)]))return![];return VisuMZ[_0x197f2d(0x100)+'ffects']['Game_Battl'+'erBase_can'+_0x197f2d(0x1d0)][_0x197f2d(0x175)](this,_0x3b1671);},VisuMZ[_0x2109ee(0x100)+_0x2109ee(0x1d7)][_0x2109ee(0x17f)+_0x2109ee(0x1c3)+_0x2109ee(0x178)]=Game_Battler[_0x2109ee(0x160)]['gainHp'],Game_Battler[_0x2109ee(0x160)][_0x2109ee(0x118)]=function(_0x18b17e){const _0x582584=_0x2109ee,_0x330c7b={'lLyXh':function(_0x4b6ae6,_0x3b579e){return _0x4b6ae6>_0x3b579e;}};if(_0x330c7b[_0x582584(0x14f)](_0x18b17e,-0x1bbe+0x1*-0x13e3+0x2fa1)&&this[_0x582584(0x19c)]()&&this[_0x582584(0xe9)+_0x582584(0x10b)]())return;VisuMZ[_0x582584(0x100)+'ffects'][_0x582584(0x17f)+_0x582584(0x1c3)+_0x582584(0x178)][_0x582584(0x175)](this,_0x18b17e);},VisuMZ[_0x2109ee(0x100)+'ffects']['Game_Battl'+_0x2109ee(0x109)+_0x2109ee(0x1a0)]=Game_BattlerBase[_0x2109ee(0x160)][_0x2109ee(0x1df)],Game_BattlerBase[_0x2109ee(0x160)][_0x2109ee(0x1df)]=function(_0x54ed6c){const _0x1404c5=_0x2109ee,_0x338ed2={'VmJbT':function(_0x1f0563,_0x17e54a){return _0x1f0563>_0x17e54a;}};if(_0x338ed2[_0x1404c5(0x1b6)](_0x54ed6c,-0x46b+-0x2*0x1231+0x28cd)&&this[_0x1404c5(0x19c)]()&&this[_0x1404c5(0xe9)+_0x1404c5(0x10b)]())return;VisuMZ['LifeStateE'+_0x1404c5(0x1d7)][_0x1404c5(0x17f)+_0x1404c5(0x109)+_0x1404c5(0x1a0)][_0x1404c5(0x175)](this,_0x54ed6c);},VisuMZ[_0x2109ee(0x100)+_0x2109ee(0x1d7)][_0x2109ee(0x17f)+_0x2109ee(0xec)+'AddableExt'+_0x2109ee(0x138)]=Game_Battler[_0x2109ee(0x160)][_0x2109ee(0x1ca)+_0x2109ee(0xfc)],Game_Battler['prototype'][_0x2109ee(0x1ca)+'able']=function(_0xa9b402){const _0x4f939d=_0x2109ee,_0x5a2ff8=$dataStates[_0xa9b402],_0xbca76d=VisuMZ['LifeStateE'+_0x4f939d(0x1d7)][_0x4f939d(0xd4)];if(_0x5a2ff8&&_0x5a2ff8[_0x4f939d(0x122)]['match'](_0xbca76d[_0x4f939d(0x1b1)]))return!this['isStateRes'+'ist'](_0xa9b402)&&!this[_0x4f939d(0x129)+_0x4f939d(0x113)](_0xa9b402);return VisuMZ['LifeStateE'+_0x4f939d(0x1d7)][_0x4f939d(0x17f)+_0x4f939d(0xec)+'AddableExt'+_0x4f939d(0x138)][_0x4f939d(0x175)](this,_0xa9b402);},VisuMZ[_0x2109ee(0x100)+_0x2109ee(0x1d7)][_0x2109ee(0x17f)+'erBase_has'+_0x2109ee(0x13a)+'utoLifeEff'+_0x2109ee(0x144)]=Game_BattlerBase['prototype'][_0x2109ee(0x139)+_0x2109ee(0x1fd)+_0x2109ee(0x1c0)],Game_BattlerBase[_0x2109ee(0x160)][_0x2109ee(0x139)+'teAutoLife'+'Effect']=function(){const _0x5ede4a=_0x2109ee;if(this[_0x5ede4a(0xe9)+_0x5ede4a(0x10b)]())return![];return VisuMZ['LifeStateE'+_0x5ede4a(0x1d7)]['Game_Battl'+_0x5ede4a(0x1db)+'LifeStateA'+_0x5ede4a(0x170)+_0x5ede4a(0x144)]['call'](this);},VisuMZ['LifeStateE'+'ffects'][_0x2109ee(0x161)+_0x2109ee(0x1e6)+_0x2109ee(0x1a6)+_0x2109ee(0x147)]=Game_Action[_0x2109ee(0x160)]['executeHpD'+_0x2109ee(0x1b4)],Game_Action[_0x2109ee(0x160)][_0x2109ee(0x102)+_0x2109ee(0x1b4)]=function(_0x4663e8,_0x186c9b){const _0x463acc=_0x2109ee,_0x3572ab={'LQBeq':function(_0x246d36,_0x58d53d){return _0x246d36(_0x58d53d);}};VisuMZ[_0x463acc(0x100)+_0x463acc(0x1d7)][_0x463acc(0x161)+'n_executeH'+_0x463acc(0x1a6)+_0x463acc(0x147)]['call'](this,_0x4663e8,_0x186c9b),_0x4663e8[_0x463acc(0x19c)]()&&_0x4663e8['hasExtinct'+'ionEffect']()&&($comboWindowIncreaseHits&&_0x3572ab[_0x463acc(0x1e2)]($comboWindowIncreaseDamage,-_0x186c9b));};