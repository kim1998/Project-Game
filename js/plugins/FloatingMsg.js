//=============================================================================
// RPG Maker MZ - Floating Message Box
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Enables a floating message box that can be used to display messages over events
 * @author Kimo
 *
 * @param Message Duration
 * @type integer
 * @desc Duration in frames for the message to be displayed
 * @default 120
 *
 * @help FloatingMsg.js
 *
 * This plugin allows you to display floating messages above events in RPG Maker MZ.
 * 
 * To use this plugin, simply call the following script command:
 * FloatingMsg.showMessage(eventId, message);
 * 
 * eventId: The ID of the event above which the message will be displayed.
 * message: The text of the message to be displayed.
 *
 *
 */
var FloatingMsg = FloatingMsg || {};
FloatingMsg.pluginName = 'FloatingMsg';
FloatingMsg.parameters = PluginManager.parameters(FloatingMsg.pluginName);

FloatingMsg.messageDuration = Number(FloatingMsg.parameters['Message Duration'] || 120);

FloatingMsg.showMessage = function(eventId, message) {
    var event = $gameMap.event(eventId);
    if (event) {
        var sprite = new Sprite(new Bitmap(200, 50));
        sprite.bitmap.drawText(message, 0, 0, 200, 50, 'center');
        sprite.x = event.screenX();
        sprite.y = event.screenY() - event.height - 50; // Position above the event
        sprite.opacity = 255;
        sprite.visible = true;
        SceneManager._scene.addChild(sprite);

        // Fade out and remove the message after the duration
        setTimeout(function() {
            sprite.opacity = 0;
            setTimeout(function() {
                SceneManager._scene.removeChild(sprite);
            }, 500); // Wait for fade out
        }, FloatingMsg.messageDuration);
    }
};