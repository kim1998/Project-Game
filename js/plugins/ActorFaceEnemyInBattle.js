/*:
 * @plugindesc Makes actors face their target enemy during action execution in battle.
 * @author Your Name (or ChatGPT)
 * @target MZ
 * @version 1.0.0
 * @help
 * ActorFaceEnemyInBattle.js
 * Version 1.0.0
 *
 * This plugin modifies actor sprites in battle so that they turn to face
 * their target when performing an action that targets an enemy.
 *
 * How it works:
 * - When an actor starts an action (like attack, skill, item), the plugin
 *   checks if the action targets one or more enemies.
 * - If it does, it takes the *first* enemy target.
 * - It compares the screen X-coordinate of the actor and the target enemy.
 * - If the enemy is to the left of the actor, the actor sprite flips horizontally
 *   (faces left).
 * - If the enemy is to the right of the actor, the actor sprite faces normally
 *   (faces right).
 * - When the actor returns to their home position after the action, they revert
 *   to their default facing direction (right).
 *
 * Note:
 * - This only affects actions targeting enemies. Actions targeting allies or
 *   the user itself will not cause the actor to turn based on enemy position.
 * - If an action targets multiple enemies, the direction is determined by the
 *   *first* enemy in the target list.
 * - This plugin modifies sprite behavior and should be compatible with most
 *   other plugins unless they heavily modify Sprite_Actor motion or scaling.
 *
 * No plugin commands or parameters are needed. Just install and enable.
 */

(() => {
    'use strict';

    // --- Alias Sprite_Actor.startMotion ---
    // We hook into the start of an actor's motion (action animation)
    const _Sprite_Actor_startMotion = Sprite_Actor.prototype.startMotion;
    Sprite_Actor.prototype.startMotion = function(motionType) {
        // Call the original function first
        _Sprite_Actor_startMotion.call(this, motionType);

        // Ensure we have an actor associated with this sprite
        if (!this._actor) {
            return;
        }

        // Check if the current battle subject is this actor
        // and if there's a current action being processed by the BattleManager
        const currentAction = BattleManager._action;
        if (BattleManager.actor() === this._actor && currentAction) {
            // Make sure targets have been determined for the action
            // Game_Action.apply() usually calls makeTargets() if needed,
            // but let's be safe or check if targets exist.
            // We might need to ensure targets are generated if they aren't yet.
            // Note: Targets are usually prepared *before* startMotion is called via performActionStart.
            const targets = currentAction.makeTargets(); // Get targets (usually returns existing _targets)

            if (targets && targets.length > 0) {
                // Check if the first target is an enemy
                const firstTarget = targets[0];
                if (firstTarget && firstTarget.isEnemy()) {
                    // Find the corresponding sprite for the target enemy
                    const targetSprite = findEnemySprite(firstTarget);

                    if (targetSprite) {
                        // Compare X coordinates
                        const actorX = this.x;
                        const targetX = targetSprite.x;
                        const currentScaleX = Math.abs(this.scale.x); // Get base scale magnitude

                        // If target is to the left, flip sprite (negative scale)
                        if (targetX < actorX) {
                            this.scale.x = -currentScaleX;
                        }
                        // If target is to the right, face normally (positive scale)
                        else {
                            this.scale.x = currentScaleX;
                        }
                    }
                } else {
                    // If the target isn't an enemy (e.g., ally, self), face default direction (right)
                    this.scale.x = Math.abs(this.scale.x);
                }
            } else {
                 // If no targets, face default direction (right)
                 this.scale.x = Math.abs(this.scale.x);
            }
        } else {
             // If not this actor's turn/action or no action, ensure default facing?
             // This might be unnecessary as setActorHome handles the reset.
             // this.scale.x = Math.abs(this.scale.x);
        }
    };

    // --- Alias Sprite_Actor.setActorHome ---
    // We hook into when the actor returns to their home position to reset facing
    const _Sprite_Actor_setActorHome = Sprite_Actor.prototype.setActorHome;
    Sprite_Actor.prototype.setActorHome = function(index) {
        _Sprite_Actor_setActorHome.call(this, index);
        // Reset scale to default (facing right) when returning home
        this.scale.x = Math.abs(this.scale.x);
    };


    // --- Helper Function to Find Enemy Sprite ---
    function findEnemySprite(gameEnemy) {
        // Ensure we are in the battle scene
        if (SceneManager._scene instanceof Scene_Battle) {
            const spriteset = SceneManager._scene._spriteset;
            if (spriteset && spriteset._enemySprites) {
                // Find the sprite whose _enemy matches the gameEnemy object
                return spriteset._enemySprites.find(sprite => sprite && sprite._enemy === gameEnemy);
            }
        }
        return null; // Not in battle or sprite not found
    }

})();