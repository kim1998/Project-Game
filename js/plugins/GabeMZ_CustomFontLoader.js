//============================================================================
// Gabe MZ - Custom Font Loader
//----------------------------------------------------------------------------
// 22/09/21 | Version: 1.0.1 | Optimized resources
// 09/08/21 | Version: 1.0.0 | Released
//----------------------------------------------------------------------------
// This software is released under the zlib License.
//============================================================================

/*: 
 * @target MZ
 * @plugindesc [v1.0.1] Allows to import custom fonts into the project.
 * @author Gabe (Gabriel Nascimento)
 * @url http://patreon.com/gabeplugins
 * 
 * @help Gabe MZ - Custom Font Loader
 *  - This plugin is released under the zlib License.
 * 
 * This plugin allows you to import custom fonts into the project. The custom 
 * fonts can be used within the project in a number of ways, such as in 
 * PIXI.Text. The custom fonts will be recognized by the name defined in the 
 * parameters of this plugin.
 * 
 * For support and new plugins join our Discord server: 
 * https://discord.gg/GG85QRz
 * 
 * @param fonts
 * @text Fonts
 * @desc Custom Font List
 * @type struct<Font>[]
 * @default []
 */

/*~struct~Font:
 * @param name
 * @text Name
 * @desc The name that'll be used to recognize the font.
 * @type text
 * 
 * @param filename
 * @text Filename
 * @desc The font filename in the fonts/ folder.
 * @type text
 */

var Imported = Imported || {};
Imported.GMZ_CustomFontLoader = true;

var GabeMZ                      = GabeMZ || {};
GabeMZ.CustomFontLoader         = GabeMZ.CustomFontLoader || {};
GabeMZ.CustomFontLoader.VERSION = [1, 0, 1];

(() => {

    const pluginName = "GabeMZ_CustomFontLoader";
    const params = PluginManager.parameters(pluginName);

    GabeMZ.CustomFontLoader.fonts = JSON.parse(params.fonts).map((e) => {return JSON.parse(e)});

    //-----------------------------------------------------------------------------
    // Scene_Boot
    //
    // The scene class for initializing the entire game.

    const _Scene_Boot_loadGameFonts = Scene_Boot.prototype.loadGameFonts;
    Scene_Boot.prototype.loadGameFonts = function() {
        _Scene_Boot_loadGameFonts.call(this);
        const fonts = GabeMZ.CustomFontLoader.fonts;
        for (const font of fonts) {
            FontManager.load(font.name, font.filename);
        };
    };

})();