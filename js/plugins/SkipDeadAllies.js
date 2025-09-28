/*:
 * @plugindesc [v3] Prevents selection of dead allies for skills targeting the living.
 * @author Google Gemini (Corrected Version)
 * @target MZ
 *
 * @help SkipDeadAllies_v3.js
 *
 * This plugin fixes an issue where players can highlight or select dead party
 * members when using a skill meant for a living ally.
 *
 * With this plugin active, when a skill that targets one or all *living*
 * allies is used, the targeting cursor will automatically skip over any
 * dead party members, and they cannot be selected by clicking on them.
 *
 * This version correctly implements the skipping logic without causing
 * crashes or failing to work. It replaces all previous versions.
 */

(() => {
    // We use a global-like flag within this plugin's scope to track when
    // the special targeting behavior should be active.
    let isTargetingLivingAlly = false;

    // --- Scene_Battle ---
    // We hook into the scene to set our flag at the correct time.

    const _Scene_Battle_startActorSelection = Scene_Battle.prototype.startActorSelection;
    Scene_Battle.prototype.startActorSelection = function() {
        _Scene_Battle_startActorSelection.call(this);
        const action = BattleManager.inputtingAction();
        // An action is for a living friend if it's for a friend but NOT for a dead friend.
        if (action && action.isForFriend() && !action.isForDeadFriend()) {
            isTargetingLivingAlly = true;
            // The window might default to selecting a dead actor.
            // We force it to find the first valid (living) one.
            this._actorWindow.selectFirstEnabledActor();
        } else {
            isTargetingLivingAlly = false;
        }
    };

    const _Scene_Battle_onActorCancel = Scene_Battle.prototype.onActorCancel;
    Scene_Battle.prototype.onActorCancel = function() {
        _Scene_Battle_onActorCancel.call(this);
        // Always reset the flag when selection is cancelled.
        isTargetingLivingAlly = false;
    };
    
    // --- Window_BattleActor ---
    // Now we modify the window to use our flag.

    // 1. Define which items are enabled or disabled.
    Window_BattleActor.prototype.isItemEnabled = function(index) {
        if (isTargetingLivingAlly) {
            const actor = $gameParty.battleMembers()[index];
            return actor && actor.isAlive();
        }
        // By default, all actors are enabled.
        return true;
    };

    // 2. Override cursor movement to skip disabled (dead) actors.
    // This logic is inspired by how command windows skip disabled commands.
    Window_BattleActor.prototype.cursorDown = function(wrap) {
        if (this.maxItems() > 0) {
            this.select(this.findNextEnabled(1));
        }
    };

    Window_BattleActor.prototype.cursorUp = function(wrap) {
        if (this.maxItems() > 0) {
            this.select(this.findNextEnabled(-1));
        }
    };
    
    // 3. Add a helper function to find the next valid target.
    Window_BattleActor.prototype.findNextEnabled = function(direction) {
        let index = this.index();
        const maxItems = this.maxItems();
        // Loop indefinitely until a valid item is found. This is safe because an action
        // can only be selected if there's at least one valid target.
        while (true) {
            index = (index + direction + maxItems) % maxItems;
            if (this.isItemEnabled(index)) {
                return index;
            }
        }
    };

    // 4. Add a function to correct the initial selection.
    Window_BattleActor.prototype.selectFirstEnabledActor = function() {
        if (!this.isItemEnabled(this.index())) {
            this.select(this.findNextEnabled(1));
        }
    };

    // 5. Override touch processing to prevent clicking on dead actors.
    const _Window_BattleActor_processTouch = Window_BattleActor.prototype.processTouch;
    Window_BattleActor.prototype.processTouch = function() {
        if (this.isOpenAndActive()) {
            if (TouchInput.isTriggered() || this._touching) {
                const hitIndex = this.hitTest(this.canvasToLocalX(TouchInput.x), this.canvasToLocalY(TouchInput.y));
                if (hitIndex >= 0) {
                    if (this.isItemEnabled(hitIndex)) {
                        // If the clicked item is enabled, process as normal.
                        _Window_BattleActor_processTouch.call(this);
                    }
                    // If the item is disabled, do nothing, effectively ignoring the click.
                } else {
                    // If the click was outside any item, process as normal.
                    _Window_BattleActor_processTouch.call(this);
                }
            } else {
                 _Window_BattleActor_processTouch.call(this);
            }
        } else {
             _Window_BattleActor_processTouch.call(this);
        }
    };
})();