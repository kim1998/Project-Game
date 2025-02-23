//=============================================================================
// VisuStella MZ - Grid-Free Doodads - System
// VisuMZ_2_DoodadsSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_DoodadsSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.DoodadsSystem = VisuMZ.DoodadsSystem || {};
VisuMZ.DoodadsSystem.version = 1.02;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.02] [DoodadsSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Grid-Free_Doodads_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * In RPG Maker MZ, tilesets are used for mapping purposes. Tileset A is used
 * for drawing land while Tilesets B through E are used to add doodads. But in
 * RPG Maker MZ, doodads added by Tilesets B through E are locked to the grid
 * and add a rather unnatural feel to it. This plugin will allow you to break
 * free of the grid and add doodads unbound by the grid. Doodads can come in
 * all forms, from large to small, static and animated, you name it!
 * 
 * There are two plugins for Grid-Free Doodads. One is the system, which has
 * all of the data contained for how doodads are handled in-game. The other is
 * the in-game editor, which allows you to add, remove, and edit doodads during
 * Playtest mode. These are separate so that when you deploy the game and want
 * just the doodad data to remain without the in-game editor, you can leave the
 * editor out. Or in the event there's ever an external editor, you can use
 * that instead.
 * 
 * This plugin is only the system plugin and does not contain the in-game
 * editor. The in-game editor can be found separately as a Tier 3 plugin from
 * the VisuStella MZ library.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Gain the ability to add doodads onto the map through outside of the grid.
 * * Or lock them to the grid if that's what you want.
 * * Add doodads from specified image sources, from the icon sheet, or from the
 *   map's current tileset, too.
 * * Doodads can be animated, too.
 * * Apply a variety of settings to your doodads, ranging from blend modes, to
 *   scaling, to hue changes, tone shifts, blur effects, and more!
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 * 
 * Please refer to the VisuMZ_3_DoodadsEditor help file for instructions!
 *
 * ============================================================================
 * Plugin Parameters: System General Settings
 * ============================================================================
 *
 * There is only one plugin parameter for the Grid-Free Doodads System plugin.
 *
 * ---
 *
 * General
 * 
 *   Doodads Folder:
 *   - This is the path to your doodads folder.
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
 * 
 * * Yanfly
 * * Hudell
 * * Liquidize
 * * Arisu
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.02: August 4, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.01: July 7, 2022
 * * Bug Fixes!
 * ** Blend Modes should no longer be overwritten by hues. Fix made by Irina.
 *
 * Version 1.00: October 5, 2020
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
 * @param DoodadsSystem
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Folder:str
 * @text Doodads Folder
 * @desc This is the path to your doodads folder.
 * @default img/doodads/
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

const _0x2c5675=_0x1040;(function(_0x334194,_0x4ca089){const _0x58c7b7=_0x1040,_0x4398d1=_0x334194();while(!![]){try{const _0x294fef=parseInt(_0x58c7b7(0xab))/0x1*(parseInt(_0x58c7b7(0xac))/0x2)+parseInt(_0x58c7b7(0x117))/0x3+parseInt(_0x58c7b7(0x99))/0x4+-parseInt(_0x58c7b7(0x143))/0x5+-parseInt(_0x58c7b7(0x14d))/0x6*(-parseInt(_0x58c7b7(0xea))/0x7)+-parseInt(_0x58c7b7(0x10f))/0x8+-parseInt(_0x58c7b7(0xc3))/0x9;if(_0x294fef===_0x4ca089)break;else _0x4398d1['push'](_0x4398d1['shift']());}catch(_0x28a18f){_0x4398d1['push'](_0x4398d1['shift']());}}}(_0x55bf,0x81955));var label=_0x2c5675(0xd6),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x2c5675(0x10c)](function(_0x506a82){const _0x4018a7=_0x2c5675;return _0x506a82[_0x4018a7(0x105)]&&_0x506a82[_0x4018a7(0x158)][_0x4018a7(0x146)]('['+label+']');})[0x0];VisuMZ[label][_0x2c5675(0xa8)]=VisuMZ[label][_0x2c5675(0xa8)]||{},VisuMZ[_0x2c5675(0xa0)]=function(_0x2c07d7,_0x1a4ddf){const _0x4d8a06=_0x2c5675;for(const _0x186d26 in _0x1a4ddf){if('ieAMm'!==_0x4d8a06(0xb5)){if(_0x186d26['match'](/(.*):(.*)/i)){const _0x18c9a3=String(RegExp['$1']),_0xbd1bbb=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x273691,_0x4fd1ff,_0x1f52d1;switch(_0xbd1bbb){case'NUM':_0x273691=_0x1a4ddf[_0x186d26]!==''?Number(_0x1a4ddf[_0x186d26]):0x0;break;case'ARRAYNUM':_0x4fd1ff=_0x1a4ddf[_0x186d26]!==''?JSON[_0x4d8a06(0x113)](_0x1a4ddf[_0x186d26]):[],_0x273691=_0x4fd1ff['map'](_0x206dc0=>Number(_0x206dc0));break;case'EVAL':_0x273691=_0x1a4ddf[_0x186d26]!==''?eval(_0x1a4ddf[_0x186d26]):null;break;case _0x4d8a06(0xb2):_0x4fd1ff=_0x1a4ddf[_0x186d26]!==''?JSON[_0x4d8a06(0x113)](_0x1a4ddf[_0x186d26]):[],_0x273691=_0x4fd1ff[_0x4d8a06(0xd0)](_0x5779ec=>eval(_0x5779ec));break;case _0x4d8a06(0x151):_0x273691=_0x1a4ddf[_0x186d26]!==''?JSON['parse'](_0x1a4ddf[_0x186d26]):'';break;case _0x4d8a06(0xc5):_0x4fd1ff=_0x1a4ddf[_0x186d26]!==''?JSON[_0x4d8a06(0x113)](_0x1a4ddf[_0x186d26]):[],_0x273691=_0x4fd1ff[_0x4d8a06(0xd0)](_0x473122=>JSON[_0x4d8a06(0x113)](_0x473122));break;case _0x4d8a06(0x10d):_0x273691=_0x1a4ddf[_0x186d26]!==''?new Function(JSON['parse'](_0x1a4ddf[_0x186d26])):new Function('return\x200');break;case _0x4d8a06(0x12c):_0x4fd1ff=_0x1a4ddf[_0x186d26]!==''?JSON[_0x4d8a06(0x113)](_0x1a4ddf[_0x186d26]):[],_0x273691=_0x4fd1ff[_0x4d8a06(0xd0)](_0x448b49=>new Function(JSON[_0x4d8a06(0x113)](_0x448b49)));break;case'STR':_0x273691=_0x1a4ddf[_0x186d26]!==''?String(_0x1a4ddf[_0x186d26]):'';break;case'ARRAYSTR':_0x4fd1ff=_0x1a4ddf[_0x186d26]!==''?JSON[_0x4d8a06(0x113)](_0x1a4ddf[_0x186d26]):[],_0x273691=_0x4fd1ff[_0x4d8a06(0xd0)](_0x10be81=>String(_0x10be81));break;case _0x4d8a06(0xc1):_0x1f52d1=_0x1a4ddf[_0x186d26]!==''?JSON[_0x4d8a06(0x113)](_0x1a4ddf[_0x186d26]):{},_0x273691=VisuMZ[_0x4d8a06(0xa0)]({},_0x1f52d1);break;case _0x4d8a06(0xa6):_0x4fd1ff=_0x1a4ddf[_0x186d26]!==''?JSON[_0x4d8a06(0x113)](_0x1a4ddf[_0x186d26]):[],_0x273691=_0x4fd1ff[_0x4d8a06(0xd0)](_0x39f4f3=>VisuMZ['ConvertParams']({},JSON['parse'](_0x39f4f3)));break;default:continue;}_0x2c07d7[_0x18c9a3]=_0x273691;}}else{const _0x196693=_0x6ff963(_0x4d8a06(0x129)),_0x1432e8=_0x196693[_0x4d8a06(0xf2)](_0x3baf03[_0x4d8a06(0x102)][_0x4d8a06(0xba)]),_0x13bda0=_0x196693[_0x4d8a06(0xa3)](_0x1432e8,_0x4dca0c[_0x4d8a06(0xd6)][_0x4d8a06(0xa8)][_0x4d8a06(0x141)]),_0x39c939=_0x3f72de('fs');if(_0x39c939[_0x4d8a06(0xcd)](_0x13bda0))return;try{_0x39c939[_0x4d8a06(0x111)](_0x13bda0);}catch(_0x836285){_0x1a9fb9[_0x4d8a06(0xde)](_0x836285);}}}return _0x2c07d7;},(_0x28fce7=>{const _0xfe643c=_0x2c5675,_0x5dc626=_0x28fce7['name'];for(const _0x1ee038 of dependencies){if('EezCK'!==_0xfe643c(0xaf)){if(!Imported[_0x1ee038]){alert(_0xfe643c(0xec)['format'](_0x5dc626,_0x1ee038)),SceneManager[_0xfe643c(0x123)]();break;}}else{const _0x546125=new _0x5c0bee(_0x3342b2);this[_0xfe643c(0xc0)][_0xfe643c(0x121)](_0x546125),this[_0xfe643c(0x167)][_0xfe643c(0xd3)](_0x546125);}}const _0x5efcb4=_0x28fce7[_0xfe643c(0x158)];if(_0x5efcb4[_0xfe643c(0x166)](/\[Version[ ](.*?)\]/i)){const _0x1fc9cc=Number(RegExp['$1']);_0x1fc9cc!==VisuMZ[label][_0xfe643c(0xd7)]&&(_0xfe643c(0x11c)===_0xfe643c(0xd4)?this['updateCustomEDP1Z']():(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0xfe643c(0xe8)](_0x5dc626,_0x1fc9cc)),SceneManager[_0xfe643c(0x123)]()));}if(_0x5efcb4[_0xfe643c(0x166)](/\[Tier[ ](\d+)\]/i)){const _0x2bdeb9=Number(RegExp['$1']);if(_0x2bdeb9<tier)alert(_0xfe643c(0x138)['format'](_0x5dc626,_0x2bdeb9,tier)),SceneManager[_0xfe643c(0x123)]();else{if(_0xfe643c(0x9b)===_0xfe643c(0x157))return _0x20e54d[_0xfe643c(0xd6)][_0xfe643c(0xa8)];else tier=Math[_0xfe643c(0xa4)](_0x2bdeb9,tier);}}VisuMZ['ConvertParams'](VisuMZ[label][_0xfe643c(0xa8)],_0x28fce7[_0xfe643c(0x16d)]);})(pluginData);function _0x55bf(){const _0x2ca1e8=['parameters','2074540ZTXguQ','isLoopHorizontal','xbNQz','data/','create','_doodadEditorMode','iconIndex','ConvertParams','switchOn','setFrame','join','max','updatePosition','ARRAYSTRUCT','qoWpo','Settings','sepiaFilter','WcRjg','1qYSOZk','1533442WFNHUS','toneRed','blurFilter','pNvGT','removeCurrentDoodads','IBRZx','ARRAYEVAL','doodadFolder','hlGpW','Hufne','Idggy','shadow','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','addMapDoodads','filename','smooth','UtZCQ','constructor','scaleX','terminate','_doodadSprites','STRUCT','prototype','11338245xWrJMW','_actors','ARRAYJSON','QzNsI','width','_xFrames','loadDoodad','isNwjs','scale','mapId','existsSync','wjVHk','TileSet','map','screen','writeFileSync','addChild','GkhUb','partyMiss','DoodadsSystem','version','contrastFilter','maybeLoadData','_frameUpdate','switchOff','QEIaO','bitmap','log','anchor','glowFilter','$dataDoodads','anchorX','isEventRunning','This\x20is\x20a\x20static\x20class','throwLoadError','ImageManager_throwLoadError','createDoodadsJson','format','tilesetNames','196HJWoca','_index','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','positionType','resetOpacity','createDoodads','scaleY','defineProperty','dirname','_mapHeight','_displayX','test','loadDoodadBitmap','_loadedData','_data','ctwnK','IconSet','contrast','_databaseFiles','DropShadowFilter','tileHeight','hUdjz','height','OutlineFilter','mainModule','screenY','value','status','wdQyo','YVhmH','YXegY','tileId','loadBitmapFromUrl','maybeInvertAnchors','filter','FUNC','Spriteset_Map_prototype_createCharacters','6212832BEXTSj','toneBlue','mkdirSync','removeChild','parse','glow','initCustomDataA','BlurFilter','2057436DpLEaN','OmjlU','doodads','JGXJv','loadData','PhEjg','clear','partyHave','_loadingState','anchorY','push','updateCustomA','exit','_displayY','sepia','Scene_Map_terminate','maybeAddFilter','filters','path','frameUpdate','initCustomEDP1DataZ','ARRAYFUNC','Doodads.json','_tileId','yFrames','angle','_iconIndex','_mapWidth','tileWidth','opacity','_compareChildOrder','rmqYM','toneGreen','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','mrsHZ','Game_Map_isEventRunning','_yFrames','update','GlowFilter','blend','updateCustomEDP1Z','_cache','Folder','shadowFilter','160550ilECjs','_tileWidth','isLoopVertical','includes','loadTilesetBitmap','updateFilters','_calcScreenPos','outlineFilter','_currentCount','isOptionValid','134598HHowJQ','hue','_emptyBitmap','call','JSON','tileset','tileRows','clearDoodads','createDoodadsImgDir','initialize','zePun','description','BIlEq','setColorTone','toneGrey','splice','updateFrame','isBattleTest','initData','yKrnC','screenX','updateCustomZ','createCharacters','ColorMatrixFilter','floor','match','_tilemap','lgOhz','folder','kiyBl','_tileHeight','blendMode'];_0x55bf=function(){return _0x2ca1e8;};return _0x55bf();}var $dataDoodads=null;Tilemap['prototype'][_0x2c5675(0x135)]=function(_0x144c34,_0x5547c4){const _0x2186ed=_0x2c5675;if(_0x144c34['z']!==_0x5547c4['z'])return _0x144c34['z']-_0x5547c4['z'];if(_0x144c34['y']!==_0x5547c4['y'])return _0x144c34['y']-_0x5547c4['y'];if(_0x144c34['x']!==_0x5547c4['x']){if(_0x2186ed(0xb6)===_0x2186ed(0x168)){const _0x5b18bd=this[_0x2186ed(0xf8)]['toneRed']||0x0,_0x29e416=this[_0x2186ed(0xf8)][_0x2186ed(0x137)]||0x0,_0x1666ce=this[_0x2186ed(0xf8)]['toneBlue']||0x0,_0x39b15b=this[_0x2186ed(0xf8)][_0x2186ed(0x15b)]||0x0;this[_0x2186ed(0x15a)]([_0x5b18bd,_0x29e416,_0x1666ce,_0x39b15b]),this[_0x2186ed(0xa1)]=this[_0x2186ed(0xf8)][_0x2186ed(0xa1)]||[],this[_0x2186ed(0xdb)]=this['_data'][_0x2186ed(0xdb)]||[],this[_0x2186ed(0x11e)]=this[_0x2186ed(0xf8)][_0x2186ed(0x11e)]||[],this[_0x2186ed(0xd5)]=this[_0x2186ed(0xf8)][_0x2186ed(0xd5)]||[];}else return _0x144c34['x']-_0x5547c4['x'];}return _0x144c34['spriteId']-_0x5547c4['spriteId'];};function Doodads(){const _0xbbf6c0=_0x2c5675;throw new Error(_0xbbf6c0(0xe4));}Doodads[_0x2c5675(0xae)]=new PIXI[(_0x2c5675(0x128))][(_0x2c5675(0x116))](),Doodads[_0x2c5675(0x14a)]=PIXI[_0x2c5675(0x128)][_0x2c5675(0x101)]?new PIXI[(_0x2c5675(0x128))][(_0x2c5675(0x101))](0x3,0x0):null,Doodads[_0x2c5675(0x142)]=PIXI[_0x2c5675(0x128)][_0x2c5675(0xfd)]?new PIXI['filters']['DropShadowFilter']({'shadowOnly':!![]}):null,Doodads[_0x2c5675(0xe0)]=PIXI[_0x2c5675(0x128)][_0x2c5675(0x13d)]?new PIXI[(_0x2c5675(0x128))]['GlowFilter']():null,Doodads['contrastFilter']=new PIXI[(_0x2c5675(0x128))][(_0x2c5675(0x164))](),Doodads[_0x2c5675(0xd8)][_0x2c5675(0xfb)](0x1,![]),Doodads['sepiaFilter']=new PIXI[(_0x2c5675(0x128))]['ColorMatrixFilter'](),Doodads[_0x2c5675(0xa9)][_0x2c5675(0x125)](![]),Object[_0x2c5675(0xf1)](Doodads,_0x2c5675(0xb3),{'get':function(){const _0x596d39=_0x2c5675;return VisuMZ[_0x596d39(0xd6)][_0x596d39(0xa8)]['Folder'];},'configurable':![]}),Object['defineProperty'](Doodads,'settings',{'get':function(){const _0xb481a1=_0x2c5675;return VisuMZ['DoodadsSystem'][_0xb481a1(0xa8)];},'configurable':![]}),Doodads['createDoodadsJson']=function(){const _0x24afde=_0x2c5675,_0x157827=require(_0x24afde(0x129)),_0x51b160=_0x157827[_0x24afde(0xf2)](process[_0x24afde(0x102)][_0x24afde(0xba)]),_0x44550a=_0x157827[_0x24afde(0xa3)](_0x51b160,_0x24afde(0x9c)),_0x2fc433=_0x44550a+'Doodads.json',_0x82db25=require('fs');if(_0x82db25[_0x24afde(0xcd)](_0x2fc433))return;try{_0x82db25[_0x24afde(0xd2)](_0x2fc433,'[]');}catch(_0x2389b9){'WcRjg'!==_0x24afde(0xaa)?(_0x265805[_0x24afde(0xd6)]['Spriteset_Map_prototype_createCharacters']['call'](this),this[_0x24afde(0xef)]()):console[_0x24afde(0xde)](_0x2389b9);}},Doodads[_0x2c5675(0x155)]=function(){const _0x75ca60=_0x2c5675,_0x2e39fe=require(_0x75ca60(0x129)),_0x4945e4=_0x2e39fe[_0x75ca60(0xf2)](process[_0x75ca60(0x102)][_0x75ca60(0xba)]),_0x3cb43e=_0x2e39fe[_0x75ca60(0xa3)](_0x4945e4,VisuMZ['DoodadsSystem'][_0x75ca60(0xa8)][_0x75ca60(0x141)]),_0x28af90=require('fs');if(_0x28af90[_0x75ca60(0xcd)](_0x3cb43e))return;try{if('fWMlY'===_0x75ca60(0xb1)){if(!_0x237e33['_actors'][_0x75ca60(0x146)](_0x35b364)){this[_0x75ca60(0x134)]=0x0;return;}}else _0x28af90['mkdirSync'](_0x3cb43e);}catch(_0x85c52e){_0x75ca60(0xff)!==_0x75ca60(0xff)?this['_index']=0x0:console[_0x75ca60(0xde)](_0x85c52e);}},Doodads['loadData']=function(){const _0x1ac3ea=_0x2c5675;DataManager[_0x1ac3ea(0xfc)][_0x1ac3ea(0x121)]({'name':_0x1ac3ea(0xe1),'src':_0x1ac3ea(0x12d)});},Doodads[_0x2c5675(0xd9)]=function(){const _0x1d194e=_0x2c5675;!DataManager[_0x1d194e(0x15e)]()&&!DataManager['isEventTest']()&&('slUVC'===_0x1d194e(0x136)?_0x456b0f[_0x1d194e(0xfc)][_0x1d194e(0x121)]({'name':'$dataDoodads','src':'Doodads.json'}):(Utils[_0x1d194e(0xca)]()&&Utils[_0x1d194e(0x14c)](_0x1d194e(0xf5))&&(this[_0x1d194e(0xe7)](),this[_0x1d194e(0x155)]()),this[_0x1d194e(0x11b)]()));},Doodads[_0x2c5675(0xd9)](),ImageManager[_0x2c5675(0xf6)]=function(_0x10cb5b,_0x15462c,_0x282e47){const _0x3e1f3b=_0x2c5675;if(!_0x15462c){if(_0x3e1f3b(0x106)==='NUMGw')return;else return this[_0x3e1f3b(0x14f)];}const _0x4996c5=(''+_0x10cb5b+encodeURIComponent(_0x15462c)+'.png')['replace'](/%2F/g,'/'),_0x3b8532=ImageManager[_0x3e1f3b(0x10a)](_0x4996c5);return _0x3b8532[_0x3e1f3b(0xbb)]=_0x282e47,_0x3b8532;},ImageManager['loadTilesetBitmap']=function(_0x4f9d16,_0x449858){const _0x3aa555=_0x2c5675,_0x2dc9fc=$gameMap[_0x3aa555(0x152)]();if(!_0x2dc9fc)return;const _0x205770=0x5+Math[_0x3aa555(0x165)](_0x4f9d16/0x100);if(_0x205770<0x5||_0x205770>=0xa)return;const _0xb46be7=_0x2dc9fc[_0x3aa555(0xe9)][_0x205770];if(!_0xb46be7)return;return ImageManager['loadTileset'](_0xb46be7);},ImageManager[_0x2c5675(0xc9)]=function(_0x404d40,_0x4f59e2,_0x66991f){const _0x516f43=_0x2c5675;if(_0x404d40===_0x516f43(0xfa))return ImageManager['loadSystem'](_0x516f43(0xfa));if(_0x404d40['startsWith'](_0x516f43(0xcf)))return this[_0x516f43(0x147)](_0x66991f,_0x4f59e2);return ImageManager[_0x516f43(0xf6)](Doodads['doodadFolder'],_0x404d40,_0x4f59e2);},VisuMZ[_0x2c5675(0xd6)][_0x2c5675(0xe6)]=ImageManager[_0x2c5675(0xe5)],ImageManager[_0x2c5675(0xe5)]=function(_0x4e4d1e){const _0x11c5b3=_0x2c5675;try{if(_0x11c5b3(0x159)!==_0x11c5b3(0x159))return this[_0x11c5b3(0x14f)];else VisuMZ[_0x11c5b3(0xd6)]['ImageManager_throwLoadError'][_0x11c5b3(0x150)](this,_0x4e4d1e);}catch(_0x58f613){console[_0x11c5b3(0xde)](_0x58f613);}const {url:_0x410b2a}=_0x4e4d1e;_0x410b2a in this[_0x11c5b3(0x140)]&&(this['_cache'][_0x410b2a]=this[_0x11c5b3(0x14f)]),_0x4e4d1e[_0x11c5b3(0x11f)]='none';},VisuMZ[_0x2c5675(0xd6)][_0x2c5675(0x13a)]=Game_Map[_0x2c5675(0xc2)][_0x2c5675(0xe3)],Game_Map['prototype'][_0x2c5675(0xe3)]=function(){const _0x59a462=_0x2c5675;if($gameTemp[_0x59a462(0x9e)])return!![];return VisuMZ[_0x59a462(0xd6)][_0x59a462(0x13a)]['call'](this);},Game_Map['prototype'][_0x2c5675(0x119)]=function(){const _0x4d93eb=_0x2c5675;if($dataDoodads)return _0x4d93eb(0xf9)!=='cTPBY'?$dataDoodads[this[_0x4d93eb(0xcc)]()]:_0x13241f['z']-_0x19c2bc['z'];},VisuMZ[_0x2c5675(0xd6)][_0x2c5675(0x126)]=Scene_Map['prototype']['terminate'],Scene_Map['prototype'][_0x2c5675(0xbf)]=function(){const _0x196568=_0x2c5675;VisuMZ[_0x196568(0xd6)][_0x196568(0x126)]['call'](this),this['_spriteset'][_0x196568(0x154)]();};function Sprite_Doodad(){const _0x8cb169=_0x2c5675;this[_0x8cb169(0x156)](...arguments);}function _0x1040(_0x457b1c,_0x874db5){const _0x55bf76=_0x55bf();return _0x1040=function(_0x1040f4,_0x214afb){_0x1040f4=_0x1040f4-0x99;let _0x16bc69=_0x55bf76[_0x1040f4];return _0x16bc69;},_0x1040(_0x457b1c,_0x874db5);}Sprite_Doodad[_0x2c5675(0xc2)]=Object[_0x2c5675(0x9d)](Sprite_Clickable[_0x2c5675(0xc2)]),Sprite_Doodad['prototype'][_0x2c5675(0xbd)]=Sprite_Doodad,Sprite_Doodad[_0x2c5675(0xc2)][_0x2c5675(0x156)]=function(_0x53f3f5){const _0x18efa1=_0x2c5675;this[_0x18efa1(0xf8)]=_0x53f3f5,this[_0x18efa1(0x144)]=$gameMap[_0x18efa1(0x133)](),this['_tileHeight']=$gameMap[_0x18efa1(0xfe)](),this[_0x18efa1(0x132)]=$gameMap[_0x18efa1(0xc7)]()*this[_0x18efa1(0x144)],this[_0x18efa1(0xf3)]=$gameMap[_0x18efa1(0x100)]()*this[_0x18efa1(0x16b)],this['_currentCount']=0x0,this[_0x18efa1(0xf7)]=![],Sprite_Clickable['prototype']['initialize']['call'](this),this['initData']();},Sprite_Doodad[_0x2c5675(0xc2)][_0x2c5675(0x15f)]=function(){const _0x557cde=_0x2c5675;this[_0x557cde(0x115)](),this['_currentCount']=0x0;const _0x72bf33=this['_data'];this['_x']=_0x72bf33['x'],this['_y']=_0x72bf33['y'],this['z']=_0x72bf33['z'],this[_0x557cde(0x131)]=_0x72bf33[_0x557cde(0x9f)],this[_0x557cde(0x12e)]=_0x72bf33[_0x557cde(0x109)],this[_0x557cde(0xc8)]=_0x72bf33['xFrames']||0x1,this[_0x557cde(0x13b)]=_0x72bf33[_0x557cde(0x12f)]||0x1,this['_frameUpdate']=_0x72bf33[_0x557cde(0x12a)]||0xf,this[_0x557cde(0x10b)](),this[_0x557cde(0xeb)]=this['_xFrames']*this[_0x557cde(0x13b)]-0x1,this['anchor']['x']=_0x72bf33[_0x557cde(0xe2)],this[_0x557cde(0xdf)]['y']=_0x72bf33[_0x557cde(0x120)],this[_0x557cde(0xcb)]['x']=_0x72bf33[_0x557cde(0xbe)]/0x64,this['scale']['y']=_0x72bf33[_0x557cde(0xf0)]/0x64,this[_0x557cde(0x130)]=_0x72bf33[_0x557cde(0x130)]??0x0;_0x72bf33[_0x557cde(0x14e)]&&this['setHue'](_0x72bf33['hue']);this[_0x557cde(0x16c)]=_0x72bf33[_0x557cde(0x13e)]||0x0,this[_0x557cde(0x134)]=_0x72bf33[_0x557cde(0x134)]||0x0;const _0x5beb1e=_0x72bf33[_0x557cde(0x169)]||'',_0x3c69bb=''+_0x5beb1e+_0x72bf33[_0x557cde(0xdd)];this[_0x557cde(0xdd)]=ImageManager[_0x557cde(0xc9)](_0x3c69bb,_0x72bf33['smooth'],_0x72bf33[_0x557cde(0x109)],_0x72bf33['tileCols'],_0x72bf33[_0x557cde(0x153)]),this['initCustomDataZ'](),this[_0x557cde(0xf7)]=!![];},Sprite_Doodad[_0x2c5675(0xc2)][_0x2c5675(0x10b)]=function(){const _0x14f576=_0x2c5675;if(this[_0x14f576(0xcb)]['x']<=0x0){if(this[_0x14f576(0xdf)]['x']===0x0)this[_0x14f576(0xdf)]['x']=0x1;else this[_0x14f576(0xdf)]['x']===0x1&&(this[_0x14f576(0xdf)]['x']=0x0);}if(this[_0x14f576(0xcb)]['y']<=0x0){if(this['anchor']['y']===0x0)this[_0x14f576(0xdf)]['y']=0x1;else{if(this['anchor']['y']===0x1){if('WdeAJ'!=='XqanU')this[_0x14f576(0xdf)]['y']=0x0;else{if(_0x44320d)return _0x3f1a8e[this[_0x14f576(0xcc)]()];}}}}},Sprite_Doodad[_0x2c5675(0xc2)][_0x2c5675(0x115)]=function(){},Sprite_Doodad[_0x2c5675(0xc2)]['initCustomDataZ']=function(){const _0x2199f9=_0x2c5675;this[_0x2199f9(0x12b)]();},Sprite_Doodad['prototype'][_0x2c5675(0x12b)]=function(){const _0x499a5b=_0x2c5675,_0x7e85ee=this[_0x499a5b(0xf8)][_0x499a5b(0xad)]||0x0,_0x5482ce=this[_0x499a5b(0xf8)][_0x499a5b(0x137)]||0x0,_0x2e29c=this[_0x499a5b(0xf8)][_0x499a5b(0x110)]||0x0,_0x202900=this[_0x499a5b(0xf8)]['toneGrey']||0x0;this[_0x499a5b(0x15a)]([_0x7e85ee,_0x5482ce,_0x2e29c,_0x202900]),this[_0x499a5b(0xa1)]=this['_data']['switchOn']||[],this['switchOff']=this[_0x499a5b(0xf8)][_0x499a5b(0xdb)]||[],this['partyHave']=this[_0x499a5b(0xf8)][_0x499a5b(0x11e)]||[],this['partyMiss']=this[_0x499a5b(0xf8)][_0x499a5b(0xd5)]||[];},Sprite_Doodad[_0x2c5675(0xc2)]['update']=function(){const _0x10534f=_0x2c5675;Sprite_Clickable['prototype'][_0x10534f(0x13c)]['call'](this),this['updatePosition']();if(!this[_0x10534f(0xf7)])return;this[_0x10534f(0x148)](),this[_0x10534f(0x122)](),this[_0x10534f(0x15d)](),this[_0x10534f(0x162)]();},Sprite_Doodad[_0x2c5675(0xc2)][_0x2c5675(0xa5)]=function(){const _0x42738f=_0x2c5675;this['x']=this['screenX'](),this['y']=this[_0x42738f(0x103)]();},Sprite_Doodad[_0x2c5675(0xc2)][_0x2c5675(0x127)]=function(_0x98557b,_0x30a55b,_0x3aa6e5){const _0x36350f=_0x2c5675;if(_0x3aa6e5!==_0x98557b[_0x36350f(0x146)](_0x30a55b)){if(_0x36350f(0xdc)!==_0x36350f(0xb4)){if(_0x3aa6e5){if(_0x36350f(0x139)!==_0x36350f(0x139)){if(this[_0x36350f(0xdf)]['y']===0x0)this['anchor']['y']=0x1;else this[_0x36350f(0xdf)]['y']===0x1&&(this[_0x36350f(0xdf)]['y']=0x0);}else _0x98557b[_0x36350f(0x121)](_0x30a55b);}else _0x98557b[_0x36350f(0x15c)](_0x98557b['indexOf'](_0x30a55b),0x1);}else _0x132722+=_0x5c8583;}},Sprite_Doodad[_0x2c5675(0xc2)][_0x2c5675(0x148)]=function(){const _0x20bb51=_0x2c5675,_0x40e2f2=this[_0x20bb51(0x128)]??[];this[_0x20bb51(0x127)](_0x40e2f2,Doodads['blurFilter'],Boolean(this[_0x20bb51(0xf8)]['blur'])),this[_0x20bb51(0x127)](_0x40e2f2,Doodads[_0x20bb51(0xd8)],Boolean(this[_0x20bb51(0xf8)][_0x20bb51(0xfb)])),this['maybeAddFilter'](_0x40e2f2,Doodads[_0x20bb51(0xa9)],Boolean(this[_0x20bb51(0xf8)][_0x20bb51(0x125)]));if(Doodads['outlineFilter']){if(_0x20bb51(0x107)!==_0x20bb51(0xbc))this[_0x20bb51(0x127)](_0x40e2f2,Doodads[_0x20bb51(0x14a)],Boolean(this[_0x20bb51(0xf8)]['outline']));else throw new _0x2a4395('This\x20is\x20a\x20static\x20class');}Doodads[_0x20bb51(0x142)]&&this[_0x20bb51(0x127)](_0x40e2f2,Doodads[_0x20bb51(0x142)],Boolean(this[_0x20bb51(0xf8)][_0x20bb51(0xb7)])),Doodads[_0x20bb51(0xe0)]&&this[_0x20bb51(0x127)](_0x40e2f2,Doodads[_0x20bb51(0xe0)],Boolean(this[_0x20bb51(0xf8)][_0x20bb51(0x114)])),this[_0x20bb51(0x128)]=_0x40e2f2;},Sprite_Doodad[_0x2c5675(0xc2)][_0x2c5675(0x149)]=function(_0x197b54,_0x42fde8,_0x3021c5,_0x431f9b,_0x7dbfa8,_0x4baf92){const _0x208825=_0x2c5675;let _0x75792b=_0x197b54-_0x42fde8*_0x3021c5;return _0x75792b+_0x431f9b<0x0&&_0x7dbfa8&&(_0x75792b+=_0x4baf92),Math[_0x208825(0x165)](_0x75792b);},Sprite_Doodad[_0x2c5675(0xc2)][_0x2c5675(0x161)]=function(){const _0x404f6f=_0x2c5675;if(this[_0x404f6f(0xf8)][_0x404f6f(0xed)]===_0x404f6f(0xd1))return this[_0x404f6f(0xf8)]['x'];return this[_0x404f6f(0x149)](this[_0x404f6f(0xf8)]['x'],$gameMap[_0x404f6f(0xf4)],this[_0x404f6f(0x144)],this[_0x404f6f(0xc7)],$gameMap[_0x404f6f(0x9a)](),this[_0x404f6f(0x132)]);},Sprite_Doodad[_0x2c5675(0xc2)][_0x2c5675(0x103)]=function(){const _0x6a1e76=_0x2c5675;if(this[_0x6a1e76(0xf8)]['positionType']===_0x6a1e76(0xd1))return this[_0x6a1e76(0xf8)]['y'];return this[_0x6a1e76(0x149)](this[_0x6a1e76(0xf8)]['y'],$gameMap[_0x6a1e76(0x124)],this[_0x6a1e76(0x16b)],this['height'],$gameMap[_0x6a1e76(0x145)](),this[_0x6a1e76(0xf3)]);},Sprite_Doodad[_0x2c5675(0xc2)][_0x2c5675(0x11d)]=function(){const _0x1aed2d=_0x2c5675;this[_0x1aed2d(0xdd)]=new Bitmap(0x1,0x1);},Sprite_Doodad[_0x2c5675(0xc2)]['updateCustomA']=function(){this['resetOpacity']();},Sprite_Doodad[_0x2c5675(0xc2)][_0x2c5675(0xee)]=function(){const _0x5fecee=_0x2c5675;this[_0x5fecee(0x134)]=this['_data']['opacity']||0x0;},Sprite_Doodad['prototype'][_0x2c5675(0x162)]=function(){const _0x1c2b93=_0x2c5675;this[_0x1c2b93(0x13f)]();},Sprite_Doodad[_0x2c5675(0xc2)][_0x2c5675(0x13f)]=function(){const _0x2d2d3e=_0x2c5675;if($gameTemp[_0x2d2d3e(0x9e)])return;for(const _0x2819dc of this[_0x2d2d3e(0x11e)]){if(!$gameParty['_actors']['includes'](_0x2819dc)){this[_0x2d2d3e(0x134)]=0x0;return;}}for(const _0x19a132 of this['partyMiss']){if(_0x2d2d3e(0xce)!==_0x2d2d3e(0xce))this[_0x2d2d3e(0x134)]=this[_0x2d2d3e(0xf8)]['opacity']||0x0;else{if($gameParty[_0x2d2d3e(0xc4)][_0x2d2d3e(0x146)](_0x19a132)){this['opacity']=0x0;return;}}}for(const _0x4c5eab of this[_0x2d2d3e(0xa1)]){if(!$gameSwitches['value'](_0x4c5eab)){if(_0x2d2d3e(0xc6)!=='CUfGm'){this[_0x2d2d3e(0x134)]=0x0;return;}else{const _0x345145=_0x13198d(_0x505110['$1']);_0x345145!==_0x56b388[_0x243f56][_0x2d2d3e(0xd7)]&&(_0x4f75a8(_0x2d2d3e(0xb8)[_0x2d2d3e(0xe8)](_0x51db0f,_0x345145)),_0xfcd38a[_0x2d2d3e(0x123)]());}}}for(const _0x191737 of this[_0x2d2d3e(0xdb)]){if('VyEAO'!==_0x2d2d3e(0x16a)){if($gameSwitches[_0x2d2d3e(0x104)](_0x191737)){this['opacity']=0x0;return;}}else{if(_0x1d2148[_0x2d2d3e(0x104)](_0x4bdaed)){this[_0x2d2d3e(0x134)]=0x0;return;}}}},Sprite_Doodad[_0x2c5675(0xc2)]['updateFrame']=function(){const _0x1a286f=_0x2c5675;if(this[_0x1a286f(0x131)]){if(_0x1a286f(0x118)!=='ehOrI'){const {iconWidth:_0x1121d3,iconHeight:_0x424331}=ImageManager,_0x4b3fd0=this['_iconIndex']%0x10*_0x1121d3,_0x1e1350=Math[_0x1a286f(0x165)](this[_0x1a286f(0x131)]/0x10)*_0x424331;return this[_0x1a286f(0xa2)](_0x4b3fd0,_0x1e1350,_0x1121d3,_0x424331);}else this['anchor']['y']=0x0;}if(this[_0x1a286f(0x12e)]&&this[_0x1a286f(0x12e)]<Tilemap['TILE_ID_A5']){if(_0x1a286f(0x108)!==_0x1a286f(0x108))return _0x4e0d3d[_0x1a286f(0xd6)][_0x1a286f(0xa8)]['Folder'];else{const _0x11d126=(Math[_0x1a286f(0x165)](this[_0x1a286f(0x12e)]/0x80)%0x2*0x8+this[_0x1a286f(0x12e)]%0x8)*this[_0x1a286f(0x144)],_0x314a44=Math[_0x1a286f(0x165)](this[_0x1a286f(0x12e)]%0x100/0x8)%0x10*this[_0x1a286f(0x16b)];this['setFrame'](_0x11d126,_0x314a44,this[_0x1a286f(0x144)]*(this[_0x1a286f(0xf8)]['tileCols']||0x1),this[_0x1a286f(0x16b)]*(this[_0x1a286f(0xf8)]['tileRows']||0x1));return;}}if(this[_0x1a286f(0xc8)]===0x1&&this[_0x1a286f(0x13b)]===0x1){if(_0x1a286f(0x160)===_0x1a286f(0xa7))return _0x1884df[_0x1a286f(0x105)]&&_0x474b0b[_0x1a286f(0x158)][_0x1a286f(0x146)]('['+_0x49c26c+']');else return;}const _0x37371d=Math[_0x1a286f(0x165)](this[_0x1a286f(0xdd)][_0x1a286f(0xc7)]/this[_0x1a286f(0xc8)]),_0x5a257d=Math[_0x1a286f(0x165)](this[_0x1a286f(0xdd)][_0x1a286f(0x100)]/this[_0x1a286f(0x13b)]),_0x12ba82=this[_0x1a286f(0xeb)]%this['_xFrames']*_0x37371d,_0x1c1119=Math[_0x1a286f(0x165)](this['_index']/this[_0x1a286f(0xc8)])*_0x5a257d;this[_0x1a286f(0xa2)](_0x12ba82,_0x1c1119,_0x37371d,_0x5a257d);if(this['_currentCount']>0x0)return this['_currentCount']--;this[_0x1a286f(0x14b)]=this[_0x1a286f(0xda)],this[_0x1a286f(0xeb)]++,this[_0x1a286f(0xeb)]>=this[_0x1a286f(0xc8)]*this[_0x1a286f(0x13b)]&&(this[_0x1a286f(0xeb)]=0x0);},VisuMZ[_0x2c5675(0xd6)][_0x2c5675(0x10e)]=Spriteset_Map[_0x2c5675(0xc2)]['createCharacters'],Spriteset_Map[_0x2c5675(0xc2)][_0x2c5675(0x163)]=function(){const _0x54604d=_0x2c5675;VisuMZ['DoodadsSystem'][_0x54604d(0x10e)][_0x54604d(0x150)](this),this[_0x54604d(0xef)]();},Spriteset_Map[_0x2c5675(0xc2)][_0x2c5675(0xef)]=function(){const _0x197711=_0x2c5675;this[_0x197711(0xb0)](),this[_0x197711(0xb9)]();},Spriteset_Map[_0x2c5675(0xc2)][_0x2c5675(0xb0)]=function(){const _0x8831db=_0x2c5675;this[_0x8831db(0xc0)]=this[_0x8831db(0xc0)]||[];for(const _0x1259b2 of this[_0x8831db(0xc0)]){if(!_0x1259b2)continue;this['_tilemap'][_0x8831db(0x112)](_0x1259b2);}},Spriteset_Map[_0x2c5675(0xc2)]['addMapDoodads']=function(){const _0x1d12a2=_0x2c5675;this[_0x1d12a2(0xc0)]=[];const _0x4127ac=$gameMap[_0x1d12a2(0x119)]();if(!_0x4127ac){if(_0x1d12a2(0x11a)!=='JGXJv')return this[_0x1d12a2(0x147)](_0x241e35,_0x4d1423);else return;}for(const _0xfbfdc8 of _0x4127ac){const _0x34f351=new Sprite_Doodad(_0xfbfdc8);this['_doodadSprites'][_0x1d12a2(0x121)](_0x34f351),this[_0x1d12a2(0x167)]['addChild'](_0x34f351);}},Spriteset_Map[_0x2c5675(0xc2)][_0x2c5675(0x154)]=function(){this['removeCurrentDoodads']();};