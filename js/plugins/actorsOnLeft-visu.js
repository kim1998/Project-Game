/*:
 * @target MZ
 * @plugindesc Sideview actors step/face right. For use with VisuStella Battle Core.
 * @author Caethyril
 * @orderAfter VisuMZ_1_BattleCore
 * @url https://forums.rpgmakerweb.com/index.php?threads/140932/
 * @help Free to use and/or modify for any project~
 *
 * Adjust the home position in VisuStella Battle Core's parameters:
 *   - Actor Battler Settings > JS: Home Position
 *   - Find this line:
 *        x += index * 32;
 *   - Add this line immediately afterwards:
 *        x = Graphics.boxWidth - x;
 */

// Override! Step 48 px -> instead.
Sprite_Actor.prototype.stepForward = function() {
    this.startMove(48, 0, 12);
};

(function(alias) {
    // Horizontally mirror actor battler sprite immediately after creation
    Sprite_Actor.prototype.createMainSprite = function() {
        alias.apply(this, arguments);
        this._mainSprite.scale.x *= -1;
    };
})(Sprite_Actor.prototype.createMainSprite);

(function(alias) {
    // Horizontally mirror/reposition weapon sprite immediately after creation
    Sprite_Weapon.prototype.initMembers = function() {
        alias.apply(this, arguments);
        this.scale.x *= -1;
        this.x *= -1;
    };
})(Sprite_Weapon.prototype.initMembers);