/*:
 * @plugindesc [v2] Allows an event to run a parallel process and respond to the Action Button to turn on a self-switch.
 * @author Google Gemini
 * @target MZ
 * @help
 * ============================================================================
 * ## Description
 * ============================================================================
 * This plugin allows an event to have a "Parallel" trigger that runs
 * continuously, while also reacting to the "Action Button" (OK button).
 * When the player faces the event and presses the action button, a
 * specified self-switch will be turned ON.
 *
 * This fixes a bug in the previous version where the parallel process
 * would block the action button from being detected.
 *
 * ============================================================================
 * ## How to Use
 * ============================================================================
 * 1. Create your event and set its trigger in the editor to "Parallel".
 *    This page will contain the commands you want to run continuously.
 *
 * 2. In the event's note box, add one of the following notetags to
 *    designate which self-switch should turn ON upon interaction:
 *
 *    <action_switch_a>
 *    <action_switch_b>
 *    <action_switch_c>
 *    <action_switch_d>
 *
 * 3. Create a new event page (Page 2).
 *    - In the "Conditions" section, check the self-switch you chose
 *      in the notetag (e.g., "Self Switch A is ON").
 *    - Set this page's trigger to "Action Button". This is where you
 *      will put the dialogue or actions that happen after interaction.
 *
 * Now, the event's first page will run in parallel. When the player
 * presses the action button on it, the self-switch activates, moving
 * control to the second page for the direct interaction.
 */

(() => {
    'use strict';

    const _Game_Event_initialize = Game_Event.prototype.initialize;
    Game_Event.prototype.initialize = function(mapId, eventId) {
        _Game_Event_initialize.call(this, mapId, eventId);
        const note = this.event().note.toLowerCase();
        this._actionSwitch = null;
        if (note.includes('<action_switch_a>')) {
            this._actionSwitch = 'A';
        } else if (note.includes('<action_switch_b>')) {
            this._actionSwitch = 'B';
        } else if (note.includes('<action_switch_c>')) {
            this._actionSwitch = 'C';
        } else if (note.includes('<action_switch_d>')) {
            this._actionSwitch = 'D';
        }
    };

    const _Game_Event_update = Game_Event.prototype.update;
    Game_Event.prototype.update = function() {
        _Game_Event_update.call(this);
        if (this.isActionTriggerable()) {
            const key = [this._mapId, this._eventId, this._actionSwitch];
            $gameSelfSwitches.setValue(key, true);
        }
    };

    Game_Event.prototype.isActionTriggerable = function() {
        // Does this event page have the right notetag?
        if (!this._actionSwitch) {
            return false;
        }
        // Is the player able to interact (not in a menu, message, or other event)?
        if ($gameMessage.isBusy() || !$gamePlayer.canMove()) {
            return false;
        }
        // Was the action button just pressed?
        if (!Input.isTriggered("ok")) {
            return false;
        }
        // Is the event on the same priority level and not busy jumping?
        if (!this.isNormalPriority() || this.isJumping()) {
            return false;
        }
        // Is the player facing the event?
        const frontX = $gameMap.roundXWithDirection($gamePlayer.x, $gamePlayer.direction());
        const frontY = $gameMap.roundYWithDirection($gamePlayer.y, $gamePlayer.direction());
        if (this.x !== frontX || this.y !== frontY) {
            return false;
        }
        
        return true;
    };

})();