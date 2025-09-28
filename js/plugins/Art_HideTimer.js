//=============================================================================
// Arthran Hide Timer
// Art_HideTimer.js
//=============================================================================

var Imported = Imported || {};
Imported.Art_HideTimer = true;

var Arthran = Arthran || {};
Arthran.HideTimer = Arthran.HideTimer || {};
Arthran.HideTimer.version = 1.00;

/*:
* @target MZ
* @plugindesc [Version 1.00] Hide Timer
* @author Arthran
*
* @param switchID
* @text Switch ID
* @desc The ID of the switch that will hide the timer.
* @type switch
* @default 1
*
* @help
* ------------------------------------------------------------------------
* Information
* ------------------------------------------------------------------------
* This plugin will hide the timer sprite when a specific switch is on.
* You can designate this switch in the plugin parameters.
*
* ------------------------------------------------------------------------
* Terms of Use
* ------------------------------------------------------------------------
* Can be used in commercial and non-commercial projects. Credit is not
* required, but is appreciated. You may edit the plugin to suit your needs, 
* so long as you do not claim ownership of the plugin. Please do not distribute
* the plugin outside of your game.
*
*/

//=============================================================================
// Plugin Parameters
//=============================================================================

Arthran.HideTimer.Parameters = PluginManager.parameters('Art_HideTimer');
Arthran.HideTimer.switchID = Number(Arthran.HideTimer.Parameters['switchID']);

//=============================================================================
// Sprite_Timer
//=============================================================================

Arthran.HideTimer.Sprite_Timer_updateVisibility = Sprite_Timer.prototype.updateVisibility;
Sprite_Timer.prototype.updateVisibility = function() {
    if ($gameSwitches.value(Arthran.HideTimer.switchID)) {
        this.visible = false;
    } else {
        Arthran.HideTimer.Sprite_Timer_updateVisibility.call(this);
    }
};