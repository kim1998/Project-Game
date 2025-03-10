/*:
 * @target MZ
 * @plugindesc Adds an offset to the weapon sprite in battle.
 * @author GitHub Copilot
 *
 * @param WeaponOffsetX
 * @text Weapon Offset X
 * @desc The X offset for the weapon sprite.
 * @type float
 * @default 0
 *
 * @param WeaponOffsetY
 * @text Weapon Offset Y
 * @desc The Y offset for the weapon sprite.
 * @type float
 * @default 0
 *
 * @help This plugin adds an offset to the weapon sprite in battle.
 */

(() => {
    const parameters = PluginManager.parameters('WeaponSpriteOffset');
    const weaponOffsetX = Number(parameters['WeaponOffsetX'] || 0);
    const weaponOffsetY = Number(parameters['WeaponOffsetY'] || 0);

    const _Sprite_Weapon_initMembers = Sprite_Weapon.prototype.initMembers;
    Sprite_Weapon.prototype.initMembers = function() {
        _Sprite_Weapon_initMembers.call(this);
        this.anchor.x += weaponOffsetX;
        this.anchor.y += weaponOffsetY;
    };
})();