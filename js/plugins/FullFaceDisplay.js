/*:
 * @target MZ
 * @plugindesc Displays the full character face, ignoring the message box size.
 * @author YourName
 *
 * @help
 * This plugin draws the character's entire face graphic on top of the
 * message box, preventing it from being cut off by the window's borders.
 *
 * To use this plugin, save it as a .js file, place it in your project's
 * "js/plugins" folder, and then activate it through the Plugin Manager
 * in RPG Maker MZ.
 */

(() => {
    const pluginName = "FullFaceDisplay";

    // --- Window_Message Extensions ---

    const _Window_Message_startMessage = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function() {
        _Window_Message_startMessage.apply(this, arguments);
        this.createFaceSprite();
    };

    const _Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
    Window_Message.prototype.terminateMessage = function() {
        _Window_Message_terminateMessage.apply(this, arguments);
        this.removeFaceSprite();
    };

    const _Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
    Window_Message.prototype.updatePlacement = function() {
        _Window_Message_updatePlacement.apply(this, arguments);
        this.updateFaceSpritePosition();
    };

    Window_Message.prototype.createFaceSprite = function() {
        if ($gameMessage.faceName()) {
            this.removeFaceSprite(); // Ensure no lingering sprite
            this._faceSprite = new Sprite_Face();
            this._faceSprite.setFace($gameMessage.faceName(), $gameMessage.faceIndex());
            this.updateFaceSpritePosition();
            // Add the sprite to the scene, on the same layer as the message window
            this.parent.addChild(this._faceSprite);
        } else {
            this.removeFaceSprite();
        }
    };

    Window_Message.prototype.removeFaceSprite = function() {
        if (this._faceSprite) {
            this.parent.removeChild(this._faceSprite);
            this._faceSprite = null;
        }
    };

    Window_Message.prototype.updateFaceSpritePosition = function() {
        if (this._faceSprite) {
            const rtl = $gameMessage.isRTL();
            const faceWidth = ImageManager.faceWidth;
            const x = this.x + (rtl ? this.width - faceWidth - 4 : 4);
            const y = this.y - this.height;
            this._faceSprite.move(x, y);
        }
    };

    // --- Sprite_Face Definition ---

    function Sprite_Face() {
        this.initialize(...arguments);
    }

    Sprite_Face.prototype = Object.create(Sprite.prototype);
    Sprite_Face.prototype.constructor = Sprite_Face;

    Sprite_Face.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);
    };

    Sprite_Face.prototype.setFace = function(faceName, faceIndex) {
        this.bitmap = ImageManager.loadFace(faceName);
        const pw = ImageManager.faceWidth;
        const ph = ImageManager.faceHeight;
        const sx = (faceIndex % 4) * pw;
        const sy = Math.floor(faceIndex / 4) * ph;
        this.setFrame(sx, sy, pw, ph);
    };
})();