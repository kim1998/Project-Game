//=============================================================================
// RPG Maker MZ - Custom Menu Plugin
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Customizes the in-game menu with new features and layout.
 * @help CustomMenuPlugin.js
 *
 * This plugin allows you to customize the in-game menu with new features and layout.
 *
 * @param MenuBackground
 * @text Menu Background
 * @desc The background image for the menu.
 * @type file
 * @dir img/pictures
 * @default
 *
 */

(() => {
    const parameters = PluginManager.parameters('CustomMenuPlugin');
    const menuBackground = String(parameters['MenuBackground'] || '');

    const _Scene_Menu_create = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function() {
        _Scene_Menu_create.call(this);
        this.createCustomBackground();
    };

    Scene_Menu.prototype.createCustomBackground = function() {
        if (menuBackground) {
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap = ImageManager.loadPicture(menuBackground);
            this.addChild(this._backgroundSprite);
        }
    };

    Scene_Menu.prototype.commandWindowRect = function() {
        const ww = this.mainCommandWidth();
        const wh = this.mainAreaHeight() - this.goldWindowRect().height;
        const wx = 0; // Position the command window on the left-hand side
        const wy = this.mainAreaTop();
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Menu.prototype.statusWindowRect = function() {
        const ww = Graphics.boxWidth - this.mainCommandWidth();
        const wh = this.mainAreaHeight();
        const wx = this.mainCommandWidth(); // Position the status window on the right-hand side
        const wy = this.mainAreaTop();
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Menu.prototype.goldWindowRect = function() {
        const ww = this.mainCommandWidth();
        const wh = this.calcWindowHeight(1, true);
        const wx = 0; // Position the gold window on the left-hand side
        const wy = this.mainAreaBottom() - wh;
        return new Rectangle(wx, wy, ww, wh);
    };
})();