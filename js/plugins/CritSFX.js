/*:
 * @target MZ
 * @plugindesc v1.2 Plays a specified sound effect when a critical hit occurs.
 * @author You
 * @url https://your-website.com
 * @help
 * CriticalHitSound.js
 * Version 1.2
 *
 * This plugin allows you to define a specific sound effect (SE) that
 * will play whenever an actor or enemy lands a critical hit.
 *
 * -- How to Use --
 * 1. Save this file as "CriticalHitSound.js" and place it in your
 *    project's "js/plugins" folder.
 * 2. Open the Plugin Manager in RPG Maker MZ.
 * 3. Add this plugin to the list.
 * 4. Configure the plugin parameters to your liking. You can choose the
 *    sound effect, its volume, pitch, and pan.
 * 5. Make sure the sound effect you choose exists in your project's
 *    "audio/se" folder.
 * 6. Playtest and enjoy!
 *
 * -- Changelog --
 * v1.2 - Fixed an issue where parameters were not being read correctly
 *        by dynamically getting the plugin's filename.
 * v1.1 - Initial Release
 *
 * @param seName
 * @text Critical SE Name
 * @desc The name of the sound effect to play from the 'se' folder.
 * @type file
 * @dir audio/se/
 * @default Attack3
 *
 * @param volume
 * @text Volume
 * @desc The volume of the sound effect (0-100).
 * @type number
 * @min 0
 * @max 100
 * @default 90
 *
 * @param pitch
 * @text Pitch
 * @desc The pitch of the sound effect (50-150). 100 is normal.
 * @type number
 * @min 50
 * @max 150
 * @default 120
 *
 * @param pan
 * @text Pan
 * @desc The pan of the sound effect (-100 to 100). 0 is center.
 * @type number
 * @min -100
 * @max 100
 * @default 0
 */

(() => {
    // Dynamically get the plugin filename. This is more robust than hardcoding the name.
    const scriptName = document.currentScript.src.split("/").pop().replace(".js", "");
    const parameters = PluginManager.parameters(scriptName);

    const seName = String(parameters.seName || "Attack3");
    const volume = Number(parameters.volume || 90);
    const pitch = Number(parameters.pitch || 120);
    const pan = Number(parameters.pan || 0);

    // Create the Sound Effect object to be played
    const criticalHitSe = {
        name: seName,
        volume: volume,
        pitch: pitch,
        pan: pan
    };

    //--- Game_Action.prototype.apply ---
    // We alias (hook into) the apply method, which is where damage/effects are applied.
    const _Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        // Call the original function first to let it calculate the result.
        _Game_Action_apply.call(this, target);
        
        // After the original function runs, the result is stored in target.result()
        // We check if the 'critical' flag in the result is true.
        if (target.result().critical) {
            // If it is a critical hit, play our custom sound effect.
            AudioManager.playSe(criticalHitSe);
        }
    };

})();