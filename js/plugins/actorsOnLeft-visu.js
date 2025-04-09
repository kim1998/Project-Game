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

const distance = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);

function faceClosestEnemy(actor) {
    const enemies = $gameTroop.aliveMembers();

    if (enemies.length > 0) {
        const distances = enemies.map(enemy => {
            const enemyX = enemy.screenX() || 0;
            const enemyY = enemy.screenY() || 0;
            return {
                enemy,
                distance: distance(actor.x, actor.y, enemyX, enemyY)
            };
        });

        const closestEnemy = distances.reduce((closest, current) => {
            return current.distance < closest.distance ? current : closest;
        }, distances[0]);

        const closestEnemyX = closestEnemy.enemy.screenX();
        if (actor.x > closestEnemyX) {
            actor._mainSprite.scale.x = 1; // Face right
        } else {
            actor._mainSprite.scale.x = -1; // Face left
        }
        // console.log($target);
    }
}

(function(alias) {
    // Horizontally mirror actor battler sprite immediately after creation
    Sprite_Actor.prototype.createMainSprite = function() {
        alias.apply(this, arguments);
        this._mainSprite.scale.x *= -1;
    };
})(Sprite_Actor.prototype.createMainSprite);

(function(alias) {
    // Update actor sprite orientation dynamically during battle
    Sprite_Actor.prototype.update = function() {
        alias.apply(this, arguments);
        if (this._actor) {
            // const enemyX = $gameTroop.aliveMembers()[0]?.screenX() || 0; // Get the first enemy's X position
            // const enemyX = $gameTroop.aliveMembers().map(enemy => enemy.screenX() || 0); // Get X positions of all enemies
            // const enemyY = $gameTroop.aliveMembers().map(enemy => enemy.screenY() || 0); // Get X positions of all enemies
            if($target != null) {
                if($subject != null) {
                    if (this._actor.isActor() && $subject.isActor()) {
                        const enemyX = $target.battler().x || 0;
                        // console.log($subject);
                        
                        if (this.x > enemyX) {
                            this._mainSprite.scale.x = 1; // Face right
                        } else {
                            this._mainSprite.scale.x = -1; // Face left
                        }
                    }
                }
            }else{
                faceClosestEnemy(this);
            }
        }
    };
})(Sprite_Actor.prototype.update);

(function(alias) {
    // Horizontally mirror/reposition weapon sprite immediately after creation
    Sprite_Weapon.prototype.initMembers = function() {
        alias.apply(this, arguments);
        this.scale.x *= -1;
        this.x *= -1;
    };
})(Sprite_Weapon.prototype.initMembers);

(function(alias) {
    // Update weapon sprite orientation dynamically during battle
    Sprite_Weapon.prototype.update = function() {
        alias.apply(this, arguments);
        if ($subject != null) {
            if ($subject.isActor()) {
                const enemyX = $target.battler().x || 0;
                const actorX = $subject.battler().x || 0;

                if (actorX < enemyX) {
                    // console.log("right");
                    this.scale.x = -1; // Face right
                    this.x = -1;
                } else {
                    // console.log("left");
                    this.scale.x = 1; // Face left
                    this.x = 1;
                }
            }
        }
        // this.scale.x *= -1; // Face right
        // this.x *= -1;
    }
})(Sprite_Weapon.prototype.update);