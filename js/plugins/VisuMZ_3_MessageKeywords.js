//=============================================================================
// VisuStella MZ - Message Keywords
// VisuMZ_3_MessageKeywords.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_MessageKeywords = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageKeywords = VisuMZ.MessageKeywords || {};
VisuMZ.MessageKeywords.version = 1.03;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.03] [MessageKeywords]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Keywords_VisuStella_MZ
 * @base VisuMZ_1_MessageCore
 * @orderAfter VisuMZ_1_MessageCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds Keyword support for the Message Window and any others
 * listed in the Plugin Parameters. By having Keyword support, the player can
 * hover their mouse cursor over the Keyword and a tooltip window will appear,
 * explaining further about the Keyword in question. This can be used in the
 * Message Window to explain lore, in the Help Window to go into detail about
 * more complex mechanics, and more!
 *
 * Features include all (but not limited to) the following:
 * 
 * * Setup Keywords within the Plugin Parameters.
 * * Keywords determine how the Keyword marker will be replaced and what kind
 *   of text will be displayed in the tooltip window.
 * * Use Keywords to explain or remind the player about lore heavy topics.
 * * Keywords can be used to explain indepth mechanics inside Help Window.
 * * Alter the tooltip window's settings to your liking.
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
 * * VisuMZ_1_MessageCore
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
 * Instructions
 * ============================================================================
 * 
 * Here are the instructions on how to use this plugin.
 * 
 * ---
 * 
 * Step 1:
 * 
 * - Open up the Plugin Parameters for this plugin.
 * - Open up the "Keyword List" Parameter list.
 * - Add your own or modify existing Keywords.
 *   - The "Keyword" is the Keyword Marker that will be referenced when using a
 *     Keyword inside of the Message Window or Help Window. Remember this.
 *   - The "Replacement Text" is the text that appears in place of the Keyword
 *     Marker. This can be used to color code or as a shortcut for Keywords.
 *     - Replacement text does not have to be exactly the same as the Keyword.
 *   - "Tooltip Text" is the text that appears inside the tooltip window when
 *     the player's mouse cursor hovers over the Keyword.
 * - Save your changes.
 * 
 * ---
 * 
 * Step 2:
 * 
 * - Create a new "Show Message" event command or modify a database object's
 *   help "Description".
 * - Insert the Keyword Marker in the following format: ((Keyword))
 *   - Replace "Keyword" with the Keyword Marker mentioned in Step 1.
 *   - To use the default examples, you can type in ((Example)) or ((Ojima)).
 * - Save the changes.
 * - Go view them in game.
 * - Hover the mouse cursor over the specific Keywords and a tooltip window
 *   should appear.
 * 
 * ---
 * 
 * Tooltip window text does not support Word Wrap. It is simply disabled from
 * the very start so any Word Wrap text codes will not work with it.
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
 * VisuMZ_1_ElementStatusCore
 * 
 * VisuMZ_1_ItemsEquipsCore
 *
 * VisuMZ_2_QuestSystem
 * 
 * VisuMZ_3_MessageLog
 * 
 * VisuMZ_3_VisualTextWindows
 *
 * - Custom windows provided by these plugins will have Keyword support as long
 * as their respective window names are listed in the Plugin Parameters.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. 
 *
 * === Keyword-Related Text Codes ===
 * 
 * ---
 *
 * --------------------   -----------------------------------------------------
 * Text Code              Effect (Supported Message Windows)
 * --------------------   -----------------------------------------------------
 * 
 * ((Keyword))            Replaces the "Keyword" Marker with the Replacement
 *                        Text found in the Message Keywords Plugin Parameters.
 *                        If the player hovers the mouse cursor over a Keyword,
 *                        a tooltip window will appear explaining about the
 *                        Keyword's lore and/or mechanics. The replacement text
 *                        and tooltip text can be modified inside the Message
 *                        Keywords Plugin Parameters.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyword List
 * ============================================================================
 *
 * This array governs the Keywords that are used for the game.
 *
 * ---
 *
 * Keyword List
 * 
 *   Keyword Marker:
 *   - This is the marker used to determine the tooltip and any associated text
 *   - To use this inside the Message Window or Help Description, type out the
 *     following:
 * 
 *     ((Keyword))
 * 
 *     Where "Keyword" would be the Keyword Marker used. Case does not matter.
 * 
 *   Replacement Text:
 *   - The text displayed as a replacement for the tooltip.
 *   - You may use text codes.
 * 
 *   Tooltip Text:
 *   - The text displayed for this tooltip.
 *   - You may use text codes.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Tooltip Settings
 * ============================================================================
 *
 * Settings for the Message Keyword Tooltips Window.
 *
 * ---
 *
 * Appearance
 * 
 *   Scale:
 *   - What scale size do you want for the tooltip?
 *   - Use 1.0 for normal size.
 * 
 *   Skin Filename:
 *   - What window skin do you want to use for the tooltip?
 * 
 *   Skin Opacity:
 *   - What opacity setting is used for the tooltip?
 *   - Use a number between 0 and 255.
 *
 * ---
 *
 * Offset
 * 
 *   Offset X:
 *   - Offset the tooltip X position from the mouse?
 *   - Negative: left. Positive: right.
 * 
 *   Offset Y:
 *   - Offset the tooltip Y position from the mouse?
 *   - Negative: up. Positive: down.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Supported Windows
 * ============================================================================
 *
 * Message Keyword support will be provided to these windows.
 * Not every window is a valid candidate, however.
 *
 * ---
 *
 * Supported Windows
 * 
 *   String:
 *   - Type in the constructor name of window you wish to add to the supported
 *     Window list.
 *   - Any windows not on the list will not support Keywords in the sense that
 *     tooltips will not appear. However, Keyword Markers can still be used to
 *     offer a quick shortcut to replacement text outside of tooltip windows.
 *   - Any of the windows listed here will have their refresh functions monkey
 *     patched via JavaScript to support Message Keywords.
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
 * * Irina
 * * Arisu
 * * Olivia
 * * Yanfly
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.03: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a bug that caused games with a sleeping mouse on initialization to
 *    always trigger the tooltip window. Fix made by Arisu.
 * 
 * Version 1.02: April 21, 2022
 * * Compatibility Update!
 * ** Added compatibility update with VisuMZ's Quest Journal System to not
 *    auto-clear the keyword tooltip window when tracking variables are being
 *    updated with the Quest Tracker open. Update made by Arisu.
 * 
 * Version 1.01: February 24, 2022
 * * Feature Update!
 * ** Variables are now parsed before and after the parsing of keywords.
 *    Update made by Arisu.
 * 
 * Version 1.00 Official Release Date: December 8, 2021
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
 * @param MessageKeywords
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Keywords:arraystruct
 * @text Keyword List
 * @parent Keywords
 * @type struct<Keyword>[]
 * @desc This is a list of Keywords used for this plugin.
 * @default ["{\"Keyword:str\":\"Example\",\"Text:str\":\"\\\\c[5]Example\\\\c[0]\",\"Tooltip:json\":\"\\\"This is an example to show how \\\\\\\\c[5]Keywords\\\\\\\\c[0] work.\\\\n\\\\nBy typing \\\\\\\\c[6]((Example))\\\\\\\\c[0] in the \\\\\\\\c[4]Message Window\\\\\\\\c[0],\\\\nit creates an area that the player can hover\\\\nthe \\\\\\\\c[4]mouse\\\\\\\\c[0] over.\\\\n\\\\nOnce hovered, a \\\\\\\\c[4]tooltip\\\\\\\\c[0] will appear displaying\\\\nthis text.\\\"\"}","{\"Keyword:str\":\"Ojima\",\"Text:str\":\"\\\\c[6]Yoji Ojima\\\\c[0]\",\"Tooltip:json\":\"\\\"\\\\\\\\c[6]Yoji Ojima\\\\\\\\c[0] is the creator of many \\\\\\\\c[4]RPG Maker\\\\\\\\c[0] iterations\\\\nincluding \\\\\\\\c[4]RPG Maker MZ\\\\\\\\c[0]. Without him, \\\\\\\\c[4]RPG Maker\\\\\\\\c[0] as we\\\\nknow it would be completely different. \\\\\\\\c[4]RPG Maker MZ\\\\\\\\c[0]'s\\\\nbeautiful and clean core scripts is all thanks to this\\\\nvery talented individual.\\\"\"}"]
 *
 * @param Tooltip:struct
 * @text Tooltip Settings
 * @type struct<Tooltip>
 * @desc Settings for the Message Keyword Tooltips Window.
 * @default {"Appearance":"","Scale:num":"0.6","WindowSkin:str":"Window","WindowOpacity:num":"240","Offset":"","OffsetX:num":"+0","OffsetY:num":"+0"}
 * 
 * @param SupportedWindows:arraystr
 * @text Supported Windows
 * @type string[]
 * @desc Message Keyword support will be provided to these windows.
 * Not every window is a valid candidate, however.
 * @default ["Window_Help","Window_SkillStatus","Window_EquipStatus","Window_Status","Window_ShopStatus","Window_Message","Window_NameBox","Window_StatusData","Window_QuestLog","Window_QuestTracker","Window_MessageLog","Window_VisualText"]
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
 * Keyword Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Keyword:
 *
 * @param Keyword:str
 * @text Keyword Marker
 * @desc This is the marker used to determine the tooltip and
 * any associated text.
 * @default Untitled
 *
 * @param Text:str
 * @text Replacement Text
 * @type str
 * @desc The text displayed as a replacement for the tooltip.
 * You may use text codes.
 * @default Untitled
 * 
 * @param Tooltip:json
 * @text Tooltip Text
 * @type note
 * @desc The text displayed for this tooltip.
 * You may use text codes.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Tooltip Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Tooltip:
 *
 * @param Appearance
 *
 * @param Scale:num
 * @text Scale
 * @parent Appearance
 * @desc What scale size do you want for the tooltip?
 * Use 1.0 for normal size.
 * @default 0.6
 *
 * @param WindowSkin:str
 * @text Skin Filename
 * @parent Appearance
 * @type file
 * @dir img/system/
 * @desc What window skin do you want to use for the tooltip?
 * @default Window
 *
 * @param WindowOpacity:num
 * @text Skin Opacity
 * @parent Appearance
 * @type number
 * @min 0
 * @max 255
 * @desc What opacity setting is used for the tooltip?
 * Use a number between 0 and 255.
 * @default 240
 *
 * @param Offset
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Offset the tooltip X position from the mouse?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Offset the tooltip Y position from the mouse?
 * Negative: up. Positive: down.
 * @default +0
 *
 */
//=============================================================================

const _0x302adb=_0x1379;(function(_0x219ac8,_0x1354d3){const _0x45d497=_0x1379,_0x5c6246=_0x219ac8();while(!![]){try{const _0x3c4c18=parseInt(_0x45d497(0xc6))/0x1+-parseInt(_0x45d497(0x136))/0x2+-parseInt(_0x45d497(0xfd))/0x3+-parseInt(_0x45d497(0x14e))/0x4+-parseInt(_0x45d497(0xf0))/0x5*(-parseInt(_0x45d497(0x10d))/0x6)+-parseInt(_0x45d497(0xed))/0x7+-parseInt(_0x45d497(0xdc))/0x8*(-parseInt(_0x45d497(0x128))/0x9);if(_0x3c4c18===_0x1354d3)break;else _0x5c6246['push'](_0x5c6246['shift']());}catch(_0x3175b4){_0x5c6246['push'](_0x5c6246['shift']());}}}(_0x47ba,0x9270f));var label=_0x302adb(0xf9),tier=tier||0x0,dependencies=[_0x302adb(0x10f)],pluginData=$plugins[_0x302adb(0x11f)](function(_0xf8fdb7){const _0xdefdbf=_0x302adb;return _0xf8fdb7[_0xdefdbf(0x124)]&&_0xf8fdb7['description']['includes']('['+label+']');})[0x0];function _0x1379(_0xfe1e45,_0x3074cc){const _0x47ba15=_0x47ba();return _0x1379=function(_0x137995,_0x3532a6){_0x137995=_0x137995-0xaa;let _0x368f30=_0x47ba15[_0x137995];return _0x368f30;},_0x1379(_0xfe1e45,_0x3074cc);}VisuMZ[label][_0x302adb(0xc5)]=VisuMZ[label][_0x302adb(0xc5)]||{},VisuMZ[_0x302adb(0xb2)]=function(_0x273962,_0x554199){const _0x3e1618=_0x302adb;for(const _0xa940c in _0x554199){if(_0xa940c[_0x3e1618(0x135)](/(.*):(.*)/i)){const _0x5d714b=String(RegExp['$1']),_0xbe0c00=String(RegExp['$2'])['toUpperCase']()[_0x3e1618(0x12f)]();let _0x5ba26c,_0x1d5234,_0x31105b;switch(_0xbe0c00){case _0x3e1618(0x120):_0x5ba26c=_0x554199[_0xa940c]!==''?Number(_0x554199[_0xa940c]):0x0;break;case _0x3e1618(0xec):_0x1d5234=_0x554199[_0xa940c]!==''?JSON[_0x3e1618(0x106)](_0x554199[_0xa940c]):[],_0x5ba26c=_0x1d5234['map'](_0x1279ac=>Number(_0x1279ac));break;case _0x3e1618(0x11d):_0x5ba26c=_0x554199[_0xa940c]!==''?eval(_0x554199[_0xa940c]):null;break;case _0x3e1618(0x14c):_0x1d5234=_0x554199[_0xa940c]!==''?JSON[_0x3e1618(0x106)](_0x554199[_0xa940c]):[],_0x5ba26c=_0x1d5234[_0x3e1618(0xcd)](_0x2fd6a5=>eval(_0x2fd6a5));break;case _0x3e1618(0xdb):_0x5ba26c=_0x554199[_0xa940c]!==''?JSON[_0x3e1618(0x106)](_0x554199[_0xa940c]):'';break;case _0x3e1618(0xe8):_0x1d5234=_0x554199[_0xa940c]!==''?JSON[_0x3e1618(0x106)](_0x554199[_0xa940c]):[],_0x5ba26c=_0x1d5234[_0x3e1618(0xcd)](_0x15a40e=>JSON[_0x3e1618(0x106)](_0x15a40e));break;case _0x3e1618(0xf2):_0x5ba26c=_0x554199[_0xa940c]!==''?new Function(JSON['parse'](_0x554199[_0xa940c])):new Function(_0x3e1618(0xbb));break;case _0x3e1618(0x11e):_0x1d5234=_0x554199[_0xa940c]!==''?JSON[_0x3e1618(0x106)](_0x554199[_0xa940c]):[],_0x5ba26c=_0x1d5234['map'](_0x838936=>new Function(JSON[_0x3e1618(0x106)](_0x838936)));break;case _0x3e1618(0x100):_0x5ba26c=_0x554199[_0xa940c]!==''?String(_0x554199[_0xa940c]):'';break;case _0x3e1618(0xb7):_0x1d5234=_0x554199[_0xa940c]!==''?JSON[_0x3e1618(0x106)](_0x554199[_0xa940c]):[],_0x5ba26c=_0x1d5234['map'](_0xc12c2b=>String(_0xc12c2b));break;case _0x3e1618(0xf1):_0x31105b=_0x554199[_0xa940c]!==''?JSON[_0x3e1618(0x106)](_0x554199[_0xa940c]):{},_0x5ba26c=VisuMZ[_0x3e1618(0xb2)]({},_0x31105b);break;case _0x3e1618(0xf4):_0x1d5234=_0x554199[_0xa940c]!==''?JSON[_0x3e1618(0x106)](_0x554199[_0xa940c]):[],_0x5ba26c=_0x1d5234[_0x3e1618(0xcd)](_0x8de9ce=>VisuMZ['ConvertParams']({},JSON[_0x3e1618(0x106)](_0x8de9ce)));break;default:continue;}_0x273962[_0x5d714b]=_0x5ba26c;}}return _0x273962;},(_0x4c349c=>{const _0x58403e=_0x302adb,_0x40ef08=_0x4c349c[_0x58403e(0xb5)];for(const _0x4ac407 of dependencies){if(!Imported[_0x4ac407]){if(_0x58403e(0x151)!==_0x58403e(0x14b)){alert(_0x58403e(0x15a)[_0x58403e(0xb3)](_0x40ef08,_0x4ac407)),SceneManager[_0x58403e(0x130)]();break;}else this[_0x58403e(0xe3)]=_0x425841;}}const _0x461346=_0x4c349c[_0x58403e(0x13f)];if(_0x461346[_0x58403e(0x135)](/\[Version[ ](.*?)\]/i)){const _0x5bf0ab=Number(RegExp['$1']);_0x5bf0ab!==VisuMZ[label][_0x58403e(0x14d)]&&('YPJxh'===_0x58403e(0x144)?(alert(_0x58403e(0xd7)[_0x58403e(0xb3)](_0x40ef08,_0x5bf0ab)),SceneManager['exit']()):this[_0x58403e(0xff)]());}if(_0x461346['match'](/\[Tier[ ](\d+)\]/i)){const _0x3a01da=Number(RegExp['$1']);_0x3a01da<tier?_0x58403e(0x158)!==_0x58403e(0x158)?this['obtainEscapeString'](_0x10c933):(alert(_0x58403e(0xea)[_0x58403e(0xb3)](_0x40ef08,_0x3a01da,tier)),SceneManager[_0x58403e(0x130)]()):tier=Math[_0x58403e(0xee)](_0x3a01da,tier);}VisuMZ[_0x58403e(0xb2)](VisuMZ[label][_0x58403e(0xc5)],_0x4c349c['parameters']);})(pluginData),VisuMZ[_0x302adb(0xf9)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x302adb(0x112)][_0x302adb(0x12d)],Scene_Boot['prototype'][_0x302adb(0x12d)]=function(){const _0x57a9e8=_0x302adb;VisuMZ[_0x57a9e8(0xf9)][_0x57a9e8(0x10b)]['call'](this),this[_0x57a9e8(0x131)]();},Scene_Boot[_0x302adb(0x112)][_0x302adb(0x131)]=function(){const _0x3ddb4c=_0x302adb;VisuMZ[_0x3ddb4c(0xf9)][_0x3ddb4c(0xd8)](),VisuMZ[_0x3ddb4c(0xf9)]['CreateRefreshPatches']();},VisuMZ[_0x302adb(0xf9)]['Keywords']={},VisuMZ[_0x302adb(0xf9)][_0x302adb(0xd8)]=function(){const _0x5dfad8=_0x302adb;for(const _0x20dfaf of VisuMZ[_0x5dfad8(0xf9)][_0x5dfad8(0xc5)][_0x5dfad8(0xbf)]){if(!_0x20dfaf)continue;if(!_0x20dfaf[_0x5dfad8(0x115)])continue;if(_0x20dfaf[_0x5dfad8(0x115)][_0x5dfad8(0x12f)]()<=0x0)continue;if(_0x20dfaf[_0x5dfad8(0x115)][_0x5dfad8(0x10a)]()[_0x5dfad8(0x12f)]()===_0x5dfad8(0xb8))continue;_0x20dfaf[_0x5dfad8(0x115)]=_0x20dfaf[_0x5dfad8(0x115)][_0x5dfad8(0x10a)]()[_0x5dfad8(0x12f)](),VisuMZ[_0x5dfad8(0xf9)][_0x5dfad8(0xbf)][_0x20dfaf[_0x5dfad8(0x115)]]=_0x20dfaf;}},VisuMZ[_0x302adb(0xf9)][_0x302adb(0x148)]=_0x302adb(0x15b),VisuMZ['MessageKeywords'][_0x302adb(0xda)]=function(){const _0x5e14cc=_0x302adb,_0x58a10b=Window_MessageKeywordTooltip[_0x5e14cc(0x160)];for(const _0x4ac94b of _0x58a10b){if(_0x5e14cc(0x118)!=='IIgFx')this[_0x5e14cc(0xdf)]['clear'](),this[_0x5e14cc(0xe2)]();else{if(window[_0x4ac94b]&&window[_0x4ac94b][_0x5e14cc(0x112)][_0x5e14cc(0xff)]){if('CRLsD'!=='EVVJM'){const _0x8333e1=_0x5e14cc(0xac)[_0x5e14cc(0xb3)](_0x4ac94b);VisuMZ[_0x5e14cc(0xf9)][_0x8333e1]=window[_0x4ac94b]['prototype'][_0x5e14cc(0xff)];const _0x31596d=VisuMZ['MessageKeywords'][_0x5e14cc(0x148)]['format'](_0x8333e1);window[_0x4ac94b][_0x5e14cc(0x112)][_0x5e14cc(0xff)]=new Function(_0x31596d);}else{const _0x4f2dde=this[_0x5e14cc(0xab)](_0x35a252);this[_0x5e14cc(0x104)]=_0x4f2dde[_0x5e14cc(0x10a)]()[_0x5e14cc(0x12f)](),this[_0x5e14cc(0xbe)]=!![],this[_0x5e14cc(0x145)]=_0x2650ef['x'],this[_0x5e14cc(0x105)]=_0x591a20['y'];}}}}},VisuMZ[_0x302adb(0xf9)][_0x302adb(0xd2)]=Scene_Base[_0x302adb(0x112)][_0x302adb(0xd9)],Scene_Base['prototype'][_0x302adb(0xd9)]=function(){const _0x28f169=_0x302adb;VisuMZ['MessageKeywords'][_0x28f169(0xd2)]['call'](this),this[_0x28f169(0xfc)]();},Scene_Base[_0x302adb(0x112)][_0x302adb(0xfc)]=function(){const _0x38d6d0=_0x302adb;this[_0x38d6d0(0xc2)]=new Window_MessageKeywordTooltip(),this[_0x38d6d0(0x159)](this[_0x38d6d0(0xc2)]);};function Sprite_MessageKeywordTooltip(){this['initialize'](...arguments);}Sprite_MessageKeywordTooltip[_0x302adb(0x112)]=Object[_0x302adb(0xe9)](Sprite_Clickable['prototype']),Sprite_MessageKeywordTooltip['prototype'][_0x302adb(0xc9)]=Sprite_MessageKeywordTooltip,Sprite_MessageKeywordTooltip[_0x302adb(0x112)][_0x302adb(0x13b)]=function(_0x178db0,_0x1663fa){const _0x1511dd=_0x302adb;this[_0x1511dd(0x111)]=_0x178db0,Sprite_Clickable['prototype'][_0x1511dd(0x13b)]['call'](this),this['setFrame'](0x0,0x0,_0x1663fa[_0x1511dd(0xc4)],_0x1663fa[_0x1511dd(0xae)]),this['x']=_0x1663fa['x'],this['y']=_0x1663fa['y'];let _0x611c97=![];_0x611c97&&('astMu'!==_0x1511dd(0xca)?_0xdfbfaf[_0x1511dd(0xd1)](null):(this[_0x1511dd(0xc0)]=new Bitmap(_0x1663fa[_0x1511dd(0xc4)],_0x1663fa[_0x1511dd(0xae)]),this[_0x1511dd(0xc0)][_0x1511dd(0x123)](0x0,0x0,_0x1663fa[_0x1511dd(0xc4)],_0x1663fa[_0x1511dd(0xae)],_0x1511dd(0xf8)),this['opacity']=0x40));},Sprite_MessageKeywordTooltip[_0x302adb(0x112)][_0x302adb(0x12a)]=function(_0x10a443){const _0x251b6f=_0x302adb;this[_0x251b6f(0xe3)]=_0x10a443;},Sprite_MessageKeywordTooltip[_0x302adb(0x112)][_0x302adb(0x125)]=function(){const _0xc2924d=_0x302adb;if(!this[_0xc2924d(0xe3)])return![];if(!this['_parentWindow'][_0xc2924d(0xe4)]())return![];if(!this[_0xc2924d(0xe3)][_0xc2924d(0xc3)])return![];if(this['_parentWindow'][_0xc2924d(0xf3)]<=0x0)return![];return!![];},Sprite_MessageKeywordTooltip[_0x302adb(0x112)]['targetWindow']=function(){const _0x3014b2=_0x302adb;return SceneManager[_0x3014b2(0x126)][_0x3014b2(0xc2)];},Sprite_MessageKeywordTooltip[_0x302adb(0x112)][_0x302adb(0xce)]=function(){const _0x35e5af=_0x302adb;Sprite_Clickable[_0x35e5af(0x112)][_0x35e5af(0xce)]['call'](this);const _0x58021a=this[_0x35e5af(0xd5)]();_0x58021a&&this[_0x35e5af(0x125)]()&&_0x58021a['setKeyword'](this[_0x35e5af(0x111)]);},Sprite_MessageKeywordTooltip[_0x302adb(0x112)][_0x302adb(0xb0)]=function(){const _0x2c7bf6=_0x302adb;Sprite_Clickable[_0x2c7bf6(0x112)][_0x2c7bf6(0xb0)][_0x2c7bf6(0x11b)](this);const _0x3dbf9f=this[_0x2c7bf6(0xd5)]();_0x3dbf9f&&_0x3dbf9f[_0x2c7bf6(0x122)]===this[_0x2c7bf6(0x111)]&&_0x3dbf9f['setKeyword'](null);},Sprite_MessageKeywordTooltip[_0x302adb(0x112)][_0x302adb(0x10c)]=function(){const _0x55fb8c=_0x302adb,_0x2103b3=this[_0x55fb8c(0x101)];this['_hoverState']=this[_0x55fb8c(0xcc)]();if(this[_0x55fb8c(0x101)]!==_0x2103b3){if('SUfJK'===_0x55fb8c(0x14f))this[_0x55fb8c(0x101)]?'tiRsR'!=='BscBA'?this['onMouseEnter']():this[_0x55fb8c(0xb0)]():this[_0x55fb8c(0xb0)]();else{if(this[_0x55fb8c(0xdf)])this['contents'][_0x55fb8c(0x154)]();this[_0x55fb8c(0xe2)]();}}},Sprite_MessageKeywordTooltip[_0x302adb(0x112)][_0x302adb(0xcc)]=function(){const _0x2d115d=_0x302adb;if(TouchInput['x']===0x0&&TouchInput['y']===0x0)return![];const _0x693331=new Point(TouchInput['x'],TouchInput['y']),_0xbf4513=this[_0x2d115d(0x116)]['applyInverse'](_0x693331);return this[_0x2d115d(0x15d)](_0xbf4513['x'],_0xbf4513['y']);},VisuMZ[_0x302adb(0xf9)][_0x302adb(0xd3)]=Window_Base['prototype'][_0x302adb(0x13b)],Window_Base[_0x302adb(0x112)][_0x302adb(0x13b)]=function(_0x5d0728){const _0xc92380=_0x302adb;VisuMZ['MessageKeywords']['Window_Base_initialize'][_0xc92380(0x11b)](this,_0x5d0728),this['clearMessageKeywordSprites']();},Window_Base[_0x302adb(0x112)][_0x302adb(0x11c)]=function(){const _0x1ea25b=_0x302adb;!this[_0x1ea25b(0xb9)]&&(this['_messageKeywordContainer']=new Sprite(),this[_0x1ea25b(0xef)][_0x1ea25b(0x159)](this[_0x1ea25b(0xb9)]));while(this[_0x1ea25b(0xb9)]['children'][_0x1ea25b(0x12b)]>0x0){if('XeBlL'===_0x1ea25b(0xe0)){const _0x472399=this[_0x1ea25b(0xb9)][_0x1ea25b(0xd6)][0x0];this['_messageKeywordContainer']['removeChild'](_0x472399);}else{this['_text']='';if(!this[_0x1ea25b(0x122)])return;this['setupKeywordText'](),this[_0x1ea25b(0x142)]=this[_0x1ea25b(0x142)][_0x1ea25b(0x12f)]();}}if(this[_0x1ea25b(0xbd)]()){const _0x47be63=SceneManager['_scene'][_0x1ea25b(0xc2)];if(_0x47be63){if(_0x1ea25b(0xf5)!==_0x1ea25b(0xc1))_0x47be63['setKeyword'](null);else return _0x5eb4e2=this[_0x1ea25b(0x152)](_0x430cdb),_0xbd940a=_0x4361aa['MessageKeywords'][_0x1ea25b(0xb1)]['call'](this,_0x43cb5a),_0x3e0938;}}},Window_Base['prototype'][_0x302adb(0xbd)]=function(){const _0x556c4f=_0x302adb,_0x43971b=[];return _0x43971b[_0x556c4f(0x127)](_0x556c4f(0x137),_0x556c4f(0xe6)),!_0x43971b['includes'](this[_0x556c4f(0xc9)]['name']);},VisuMZ[_0x302adb(0xf9)][_0x302adb(0xb1)]=Window_Base[_0x302adb(0x112)][_0x302adb(0x140)],Window_Base[_0x302adb(0x112)][_0x302adb(0x140)]=function(_0xdffef4){const _0x4d8eba=_0x302adb;return _0xdffef4=this['convertMessageKeywords'](_0xdffef4),_0xdffef4=VisuMZ[_0x4d8eba(0xf9)]['Window_Base_convertEscapeCharacters'][_0x4d8eba(0x11b)](this,_0xdffef4),_0xdffef4;},Window_Base[_0x302adb(0x112)]['convertMessageKeywords']=function(_0x435e7d){const _0x192d0b=_0x302adb;return _0x435e7d=this[_0x192d0b(0xeb)](_0x435e7d),_0x435e7d=_0x435e7d[_0x192d0b(0x114)](/\(\((.*?)\)\)/gi,(_0x8e34e4,_0xbfaee2)=>{const _0x150cb0=_0x192d0b;if(_0x150cb0(0x141)===_0x150cb0(0x119))this[_0x150cb0(0x108)](_0x1278f7);else{const _0x1f624e=String(_0xbfaee2)[_0x150cb0(0x10a)]()['trim']();if(VisuMZ[_0x150cb0(0xf9)][_0x150cb0(0xbf)][_0x1f624e]){const _0x5dc405=VisuMZ[_0x150cb0(0xf9)][_0x150cb0(0xbf)][_0x1f624e],_0x445508=_0x5dc405[_0x150cb0(0xde)];if(this[_0x150cb0(0x107)]()){if(_0x150cb0(0xfb)!==_0x150cb0(0x153))return _0x150cb0(0x149)[_0x150cb0(0xb3)](_0x1f624e,_0x445508);else _0x4e9499[_0x150cb0(0xd1)](null);}else return _0x445508;}else return'';}}),_0x435e7d;},VisuMZ[_0x302adb(0xf9)]['Window_Base_processEscapeCharacter']=Window_Base[_0x302adb(0x112)][_0x302adb(0x109)],Window_Base[_0x302adb(0x112)][_0x302adb(0x109)]=function(_0x223ed7,_0x24e6e9){const _0x43f744=_0x302adb;switch(_0x223ed7){case'MSGKEYWORD':if(_0x24e6e9['drawing']){if(_0x43f744(0x132)!==_0x43f744(0x132)){this[_0x43f744(0xdf)][_0x43f744(0x154)](),this[_0x43f744(0x15e)]();if(this['_text'][_0x43f744(0x12b)]>0x0){this[_0x43f744(0x113)]();const _0x116e73=this['baseTextRect']();this['drawTextEx'](this[_0x43f744(0x142)],_0x116e73['x'],_0x116e73['y'],_0x116e73[_0x43f744(0xc4)]),this['show']();}else this[_0x43f744(0xdf)]['clear'](),this[_0x43f744(0xe2)]();}else this[_0x43f744(0x108)](_0x24e6e9);}else{if(_0x43f744(0xc8)==='vKWOm')return _0x43f744(0x149)[_0x43f744(0xb3)](_0x6f12c1,_0x36f498);else this[_0x43f744(0xab)](_0x24e6e9);}break;case _0x43f744(0xf6):_0x24e6e9['drawing']&&this[_0x43f744(0xbe)]&&('tiIZt'==='cKjby'?(_0x2c7329['MessageKeywords'][_0x43f744(0xd2)]['call'](this),this[_0x43f744(0xfc)]()):this[_0x43f744(0x133)](_0x24e6e9));this[_0x43f744(0xd4)](_0x24e6e9);break;default:return VisuMZ[_0x43f744(0xf9)][_0x43f744(0xbc)][_0x43f744(0x11b)](this,_0x223ed7,_0x24e6e9);break;}},Window_Base[_0x302adb(0x112)][_0x302adb(0x108)]=function(_0x11075a){const _0x20cb94=_0x302adb,_0x1a3e47=this['obtainEscapeString'](_0x11075a);this[_0x20cb94(0x104)]=_0x1a3e47[_0x20cb94(0x10a)]()[_0x20cb94(0x12f)](),this[_0x20cb94(0xbe)]=!![],this[_0x20cb94(0x145)]=_0x11075a['x'],this[_0x20cb94(0x105)]=_0x11075a['y'];},Window_Base[_0x302adb(0x112)][_0x302adb(0x133)]=function(_0x5c5e3a){const _0x13ac54=_0x302adb;this[_0x13ac54(0xbe)]=![],this['_createKeywordEndX']=_0x5c5e3a['x'],this[_0x13ac54(0xe5)]=_0x5c5e3a['y'],this[_0x13ac54(0xf7)]();},VisuMZ['MessageKeywords']['Window_Base_processNewLine']=Window_Base[_0x302adb(0x112)][_0x302adb(0xb6)],Window_Base[_0x302adb(0x112)][_0x302adb(0xb6)]=function(_0x5a059e){const _0x319edc=_0x302adb;_0x5a059e['drawing']&&this['_createKeywordMode']&&(this[_0x319edc(0xfa)]=_0x5a059e['x'],this['addMessageKeyword']=_0x5a059e['y'],this[_0x319edc(0xf7)]()),VisuMZ['MessageKeywords']['Window_Base_processNewLine'][_0x319edc(0x11b)](this,_0x5a059e),_0x5a059e[_0x319edc(0x15c)]&&this['_createKeywordMode']&&(this[_0x319edc(0x145)]=_0x5a059e['x'],this[_0x319edc(0x105)]=_0x5a059e['y']);},Window_Base[_0x302adb(0x112)][_0x302adb(0x107)]=function(){const _0x289a2b=_0x302adb;return Window_MessageKeywordTooltip[_0x289a2b(0x160)]['includes'](this[_0x289a2b(0xc9)][_0x289a2b(0xb5)]);},Window_Base[_0x302adb(0x112)][_0x302adb(0xf7)]=function(){const _0x5e1896=_0x302adb;if(!this['isSupportMessageKeywords']())return;const _0x2e2fda=this[_0x5e1896(0x104)];let _0x493401=this[_0x5e1896(0x145)],_0x5d4dd2=this[_0x5e1896(0x105)]+0x2,_0x656463=this[_0x5e1896(0xfa)]-_0x493401,_0xf23872=this[_0x5e1896(0xe5)]-_0x5d4dd2+(this[_0x5e1896(0xdf)][_0x5e1896(0x147)]+0xa)-0x4;const _0x2c2d18=new Rectangle(_0x493401,_0x5d4dd2,_0x656463,_0xf23872),_0x619ca3=new Sprite_MessageKeywordTooltip(_0x2e2fda,_0x2c2d18);_0x619ca3[_0x5e1896(0x12a)](this),this[_0x5e1896(0xb9)]['addChild'](_0x619ca3);},VisuMZ[_0x302adb(0xf9)][_0x302adb(0x13a)]=Window_Message[_0x302adb(0x112)]['newPage'],Window_Message[_0x302adb(0x112)]['newPage']=function(_0x4983de){const _0x8e6e57=_0x302adb;this[_0x8e6e57(0x11c)](),VisuMZ[_0x8e6e57(0xf9)]['Window_Message_newPage']['call'](this,_0x4983de);},VisuMZ[_0x302adb(0xf9)][_0x302adb(0x138)]=Window_Message[_0x302adb(0x112)]['terminateMessage'],Window_Message['prototype'][_0x302adb(0xad)]=function(){const _0x50faf8=_0x302adb;this[_0x50faf8(0x11c)](),VisuMZ['MessageKeywords'][_0x50faf8(0x138)][_0x50faf8(0x11b)](this);};function Window_MessageKeywordTooltip(){const _0x1c4def=_0x302adb;this[_0x1c4def(0x13b)](...arguments);}Window_MessageKeywordTooltip[_0x302adb(0x112)]=Object[_0x302adb(0xe9)](Window_Base[_0x302adb(0x112)]),Window_MessageKeywordTooltip[_0x302adb(0x112)]['constructor']=Window_MessageKeywordTooltip,Window_MessageKeywordTooltip['WINDOW_SCALE']=VisuMZ[_0x302adb(0xf9)][_0x302adb(0xc5)]['Tooltip']['Scale'],Window_MessageKeywordTooltip['WINDOW_SKIN_FILENAME']=VisuMZ[_0x302adb(0xf9)][_0x302adb(0xc5)][_0x302adb(0x13d)][_0x302adb(0xe7)],Window_MessageKeywordTooltip['WINDOW_SKIN_OPACITY']=VisuMZ[_0x302adb(0xf9)][_0x302adb(0xc5)][_0x302adb(0x13d)][_0x302adb(0x146)],Window_MessageKeywordTooltip[_0x302adb(0xc7)]=VisuMZ[_0x302adb(0xf9)]['Settings']['Tooltip'][_0x302adb(0x155)],Window_MessageKeywordTooltip[_0x302adb(0x103)]=VisuMZ['MessageKeywords'][_0x302adb(0xc5)][_0x302adb(0x13d)]['OffsetY'],Window_MessageKeywordTooltip[_0x302adb(0x160)]=VisuMZ[_0x302adb(0xf9)][_0x302adb(0xc5)]['SupportedWindows'],Window_MessageKeywordTooltip[_0x302adb(0x112)][_0x302adb(0x13b)]=function(){const _0x2030d5=_0x302adb,_0x15a9d6=new Rectangle(0x0,0x0,Graphics[_0x2030d5(0xc4)],Graphics[_0x2030d5(0xae)]);Window_Base[_0x2030d5(0x112)][_0x2030d5(0x13b)][_0x2030d5(0x11b)](this,_0x15a9d6),this[_0x2030d5(0x157)]['x']=this['scale']['y']=Window_MessageKeywordTooltip[_0x2030d5(0xba)],this[_0x2030d5(0xe2)](),this[_0x2030d5(0x122)]='';},Window_MessageKeywordTooltip[_0x302adb(0x112)][_0x302adb(0xe1)]=function(){const _0x560b3b=_0x302adb;this['windowskin']=ImageManager[_0x560b3b(0x12c)](Window_MessageKeywordTooltip[_0x560b3b(0xcf)]);},Window_MessageKeywordTooltip[_0x302adb(0x112)][_0x302adb(0xaf)]=function(){const _0x53d182=_0x302adb;this[_0x53d182(0xcb)]=Window_MessageKeywordTooltip[_0x53d182(0x156)];},Window_MessageKeywordTooltip[_0x302adb(0x112)][_0x302adb(0xd1)]=function(_0xd75494){const _0x42e939=_0x302adb;if(this['_keyword']===_0xd75494)return;if(_0xd75494!==null&&!VisuMZ[_0x42e939(0xf9)][_0x42e939(0xbf)][_0xd75494])return;this[_0x42e939(0x122)]=_0xd75494||'';if(this[_0x42e939(0x122)][_0x42e939(0x12f)]()[_0x42e939(0x12b)]>0x0){if(_0x42e939(0x11a)===_0x42e939(0x11a))this['refresh']();else{if(_0x178d82['x']===0x0&&_0x2a80c2['y']===0x0)return![];const _0x4cdffd=new _0x16e36e(_0x1b59dc['x'],_0x536b6d['y']),_0x549689=this[_0x42e939(0x116)][_0x42e939(0xb4)](_0x4cdffd);return this[_0x42e939(0x15d)](_0x549689['x'],_0x549689['y']);}}else{if('OZySJ'!==_0x42e939(0x110)){const _0x368ff5=this[_0x42e939(0xb9)][_0x42e939(0xd6)][0x0];this[_0x42e939(0xb9)][_0x42e939(0x150)](_0x368ff5);}else{if(this[_0x42e939(0xdf)])this[_0x42e939(0xdf)]['clear']();this[_0x42e939(0xe2)]();}}},Window_MessageKeywordTooltip[_0x302adb(0x112)][_0x302adb(0xff)]=function(){const _0x38cd1c=_0x302adb;this['contents']['clear'](),this[_0x38cd1c(0x15e)]();if(this[_0x38cd1c(0x142)][_0x38cd1c(0x12b)]>0x0){this[_0x38cd1c(0x113)]();const _0x1dd5ed=this['baseTextRect']();this['drawTextEx'](this[_0x38cd1c(0x142)],_0x1dd5ed['x'],_0x1dd5ed['y'],_0x1dd5ed['width']),this[_0x38cd1c(0x143)]();}else this['contents'][_0x38cd1c(0x154)](),this[_0x38cd1c(0xe2)]();},Window_MessageKeywordTooltip[_0x302adb(0x112)]['isWordWrapEnabled']=function(){const _0x4732ef=_0x302adb;return this[_0x4732ef(0x10e)];},Window_MessageKeywordTooltip[_0x302adb(0x112)]['convertMessageKeywords']=function(_0x41c936){return _0x41c936;},Window_MessageKeywordTooltip['prototype'][_0x302adb(0x107)]=function(){return![];},Window_MessageKeywordTooltip[_0x302adb(0x112)][_0x302adb(0x15e)]=function(){const _0x156b81=_0x302adb;this[_0x156b81(0x142)]='';if(!this[_0x156b81(0x122)])return;this[_0x156b81(0x117)](),this['_text']=this['_text']['trim']();},Window_MessageKeywordTooltip[_0x302adb(0x112)][_0x302adb(0x117)]=function(){const _0x26eb2d=_0x302adb,_0x216b71=VisuMZ[_0x26eb2d(0xf9)][_0x26eb2d(0xbf)][this[_0x26eb2d(0x122)]];this[_0x26eb2d(0x142)]=_0x216b71[_0x26eb2d(0x13d)];},Window_MessageKeywordTooltip['prototype'][_0x302adb(0x113)]=function(){const _0x213293=_0x302adb,_0x1f9812=this['textSizeEx'](this[_0x213293(0x142)]);this[_0x213293(0xc4)]=_0x1f9812[_0x213293(0xc4)]+(this[_0x213293(0x129)]()+this[_0x213293(0x13c)])*0x2,this['height']=_0x1f9812[_0x213293(0xae)]+this[_0x213293(0x13c)]*0x2,this[_0x213293(0x134)](),this[_0x213293(0xd0)]();},Window_MessageKeywordTooltip[_0x302adb(0x112)]['update']=function(){const _0x2947a8=_0x302adb;Window_Base[_0x2947a8(0x112)][_0x2947a8(0xdd)][_0x2947a8(0x11b)](this);if(this['_requestRefresh']){if(_0x2947a8(0x13e)!=='IKMCq'){const _0x2f92e6=_0x4adc94[_0x2947a8(0x126)]['_messageKeywordTooltipWindow'];_0x2f92e6&&_0x2f92e6[_0x2947a8(0xd1)](null);}else this[_0x2947a8(0x139)]=![],this[_0x2947a8(0xff)]();}this[_0x2947a8(0x102)](),this[_0x2947a8(0x121)]();},Window_MessageKeywordTooltip[_0x302adb(0x112)][_0x302adb(0xaa)]=function(){this['_requestRefresh']=!![];},Window_MessageKeywordTooltip['prototype']['updatePosition']=function(){const _0xd6b8e4=_0x302adb;if(!this[_0xd6b8e4(0xc3)])return;this['x']=TouchInput['x']+Window_MessageKeywordTooltip[_0xd6b8e4(0xc7)],this['y']=TouchInput['y']+Window_MessageKeywordTooltip[_0xd6b8e4(0x103)],this[_0xd6b8e4(0x12e)]();},Window_MessageKeywordTooltip[_0x302adb(0x112)][_0x302adb(0x12e)]=function(){const _0x28eb6c=_0x302adb,_0x46f72a=this[_0x28eb6c(0xc4)]*(Window_MessageKeywordTooltip[_0x28eb6c(0xba)]||0.01),_0x5246d9=this[_0x28eb6c(0xae)]*(Window_MessageKeywordTooltip[_0x28eb6c(0xba)]||0.01);this['x']=Math[_0x28eb6c(0x14a)](this['x'][_0x28eb6c(0xfe)](0x0,Graphics['width']-_0x46f72a)),this['y']=Math[_0x28eb6c(0x14a)](this['y'][_0x28eb6c(0xfe)](0x0,Graphics[_0x28eb6c(0xae)]-_0x5246d9));},Window_MessageKeywordTooltip[_0x302adb(0x112)][_0x302adb(0x121)]=function(){const _0xc266d4=_0x302adb;let _0x486db0=0xff;if(TouchInput['x']<=0x0)_0x486db0=0x0;if(TouchInput['x']>=Graphics[_0xc266d4(0xc4)])_0x486db0=0x0;if(TouchInput['y']<=0x0)_0x486db0=0x0;if(TouchInput['y']>=Graphics['height'])_0x486db0=0x0;this[_0xc266d4(0x15f)]=_0x486db0;};function _0x47ba(){const _0x114658=['call','clearMessageKeywordSprites','EVAL','ARRAYFUNC','filter','NUM','updateOpacity','_keyword','fillRect','status','isParentWindowValid','_scene','push','9JUVaEP','itemPadding','setParentWindow','length','loadSystem','onDatabaseLoaded','clampPosition','trim','exit','process_VisuMZ_MessageKeywords','bBPDP','endKeywordMapping','createContents','match','19686kXKXVf','Window_QuestLog','Window_Message_terminateMessage','_requestRefresh','Window_Message_newPage','initialize','padding','Tooltip','IKMCq','description','convertEscapeCharacters','nCSMQ','_text','show','YPJxh','_createKeywordStartX','WindowOpacity','fontSize','funcPatchCodeFmt','\x1bMSGKEYWORD<%1>%2\x1bMSGKEYWORDEND[0]','round','VxBAw','ARRAYEVAL','version','1062388XLtpQz','SUfJK','removeChild','HnAky','convertMessageKeywords','mSlMZ','clear','OffsetX','WINDOW_SKIN_OPACITY','scale','qLlzt','addChild','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','\x0a\x20\x20\x20\x20this.clearMessageKeywordSprites();\x0a\x20\x20\x20\x20VisuMZ.MessageKeywords.%1.call(this);\x0a','drawing','hitTest','setupText','opacity','SUPPORTED_WINDOWS','requestRefresh','obtainEscapeString','%1_refresh','terminateMessage','height','updateBackOpacity','onMouseExit','Window_Base_convertEscapeCharacters','ConvertParams','format','applyInverse','name','processNewLine','ARRAYSTR','UNTITLED','_messageKeywordContainer','WINDOW_SCALE','return\x200','Window_Base_processEscapeCharacter','allowKeyWordRefresh','_createKeywordMode','Keywords','bitmap','BgZPJ','_messageKeywordTooltipWindow','visible','width','Settings','331013orQbBq','MOUSE_OFFSET_X','LzXjp','constructor','astMu','backOpacity','isBeingTouched','map','onMouseEnter','WINDOW_SKIN_FILENAME','resetFontSettings','setKeyword','Scene_Base_createWindowLayer','Window_Base_initialize','obtainEscapeParam','targetWindow','children','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','RegisterKeywords','createWindowLayer','CreateRefreshPatches','JSON','6910224vvttZl','update','Text','contents','XeBlL','loadWindowskin','hide','_parentWindow','isOpen','_createKeywordEndY','Window_QuestTracker','WindowSkin','ARRAYJSON','create','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','convertVariableEscapeCharacters','ARRAYNUM','1583981PzfwOF','max','_clientArea','135VtraYe','STRUCT','FUNC','contentsOpacity','ARRAYSTRUCT','FnCeC','MSGKEYWORDEND','addMessageKeyword','magenta','MessageKeywords','_createKeywordEndX','aIZRn','createMessageKeywordTooltipWindow','2594148rFCKDL','clamp','refresh','STR','_hoverState','updatePosition','MOUSE_OFFSET_Y','_createKeywordString','_createKeywordStartY','parse','isSupportMessageKeywords','startKeywordMapping','processEscapeCharacter','toUpperCase','Scene_Boot_onDatabaseLoaded','processTouch','171438hiijLr','_wordWrap','VisuMZ_1_MessageCore','OZySJ','_referenceString','prototype','resizeWindow','replace','Keyword','worldTransform','setupKeywordText','IIgFx','nLOoZ','IOnhZ'];_0x47ba=function(){return _0x114658;};return _0x47ba();}