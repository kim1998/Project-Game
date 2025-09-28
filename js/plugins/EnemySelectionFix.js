/*:
 * @target MZ
 * @plugindesc Directional Enemy Selection - Allows selecting enemies based on screen position using directional input.
 * @author punitdh89
 * @version 1.0
 *
 * @param UseDirectionalTargeting
 * @text Use Directional Targeting
 * @type boolean
 * @on Use
 * @off Use Default
 * @desc Use this plugin parameter to enable/disable directional targeting.
 * @default true
 *
 * @param ShowEnemyWindow
 * @text Show Default Enemy Window
 * @type boolean
 * @on Show Window
 * @off Don't Show
 * @desc Use this plugin parameter to enable/disable the displaying of the default enemy targeting window.
 * @default true
 *
 * @help
 * ============================================================================
 *                        Directional Enemy Selection
 *                              by punitdh89
 * ============================================================================
 * This plugin enhances the directional navigation between enemies during
 * battle. Instead of cycling through enemies based on their index (default
 * RPG Maker behavior), it selects the next enemy based on their actual
 * on-screen position relative to the currently selected enemy.
 *
 * In the default system, pressing directional keys simply moves through the
 * enemy list in order of their index, which can feel jarring, especially
 * when enemy layouts vary.
 *
 * By using screen coordinates and vector math, this plugin ensures that
 * pressing a direction selects the enemy that is visually aligned in that
 * direction.
 *
 * This results in more natural and expected behavior, improving the
 * overall UX.
 *
 * Directional logic uses screen X/Y coordinates and prioritizes targets that:
 *   - Are aligned in the intended direction (e.g. pressing Up targets higher
 *     enemies)
 *   - Are closer in screen space
 *
 * Works with both keyboard and controller input.
 *
 * ============================================================================
 * ⚙️ Plugin Parameters
 * ============================================================================
 * The plugin provides two parameters:
 *
 * - Use Directional Targeting (boolean) - This will enable or disable
 *   directional targeting.
 *
 * - Show Default Enemy Window (boolean) - This will enable or disable the
 *   default enemy targeting window from appearing.
 *
 * ============================================================================
 * 🔧 Implementation Details
 * ============================================================================
 * The following methods are overridden:
 *
 *   - Window_BattleEnemy.prototype.cursorDown
 *   - Window_BattleEnemy.prototype.cursorUp
 *   - Window_BattleEnemy.prototype.cursorLeft
 *   - Window_BattleEnemy.prototype.cursorRight
 *
 * Each method uses a new `_selectEnemyInDirection(dx, dy)` function to
 * evaluate screen-space candidates.
 *
 * Direction vectors:
 *   - Down:  (0, 1)
 *   - Up:    (0, -1)
 *   - Left:  (-1, 0)
 *   - Right: (1, 0)
 *
 * Scoring formula:
 *   const score = dot ** 2 / dist ** 3;
 *
 * Where:
 *   - dot = The "dot product" of the vectors
 *   - dist = Euclidean distance to enemy
 *
 * Feel free to tweak this formula on line 163 if you wish.
 *
 * ============================================================================
 * 🔧 Requirements & Compatibility
 * ============================================================================
 * - Should be compatible with most battle systems
 * - Has been tested with VisuStella Battle Core
 * - Enemy `screenX()` and `screenY()` must reflect actual coordinates
 *
 * ============================================================================
 * 🛠️ LICENSE
 * ============================================================================
 * Free for commercial and non-commercial use.
 * Credit is appreciated but optional.
 *
 */

const EnemySelectionFix = Object.freeze({
  Name: "EnemySelectionFix",
  Version: 1.0,
  Parameters: {
    ShowEnemyWindow: false,
    UseDirectionalTargeting: false,
  },
});

(() => {
  const Raw = PluginManager.parameters(EnemySelectionFix.Name);

  EnemySelectionFix.Parameters.ShowEnemyWindow =
    Raw["ShowEnemyWindow"] === "true";
  EnemySelectionFix.Parameters.UseDirectionalTargeting =
    Raw["UseDirectionalTargeting"] === "true";

  Window_BattleEnemy.prototype.cursorDown = function (wrap) {
    EnemySelectionFix.Parameters.UseDirectionalTargeting
      ? this._selectEnemyInDirection(0, 1)
      : Window_Selectable.prototype.cursorDown.call(this, wrap);
  };

  Window_BattleEnemy.prototype.cursorUp = function (wrap) {
    EnemySelectionFix.Parameters.UseDirectionalTargeting
      ? this._selectEnemyInDirection(0, -1)
      : Window_Selectable.prototype.cursorUp.call(this, wrap);
  };

  Window_BattleEnemy.prototype.cursorLeft = function (wrap) {
    EnemySelectionFix.Parameters.UseDirectionalTargeting
      ? this._selectEnemyInDirection(-1, 0)
      : Window_Selectable.prototype.cursorLeft.call(this, wrap);
  };

  Window_BattleEnemy.prototype.cursorRight = function (wrap) {
    EnemySelectionFix.Parameters.UseDirectionalTargeting
      ? this._selectEnemyInDirection(1, 0)
      : Window_Selectable.prototype.cursorRight.call(this, wrap);
  };

  Window_BattleEnemy.prototype._selectEnemyInDirection = function (dirX, dirY) {
    const currentEnemy = this.enemy();
    if (!currentEnemy) return;

    const currX = currentEnemy.screenX();
    const currY = currentEnemy.screenY();

    const selectableEnemies = this._enemies
      .map((enemy, index) => {
        if (enemy === currentEnemy || enemy.isHidden()) return;

        const dx = enemy.screenX() - currX;
        const dy = enemy.screenY() - currY;
        const dot = dx * dirX + dy * dirY;
        if (dot <= 0) return;

        const dist = Math.hypot(dx, dy) || 1;
        const score = dot ** 2 / dist ** 3;

        return { index, score };
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score);

    if (selectableEnemies.length) this.smoothSelect(selectableEnemies[0].index);
    SoundManager.playCursor();
  };

  const _Window_BattleEnemy_show = Window_BattleEnemy.prototype.show;
  Window_BattleEnemy.prototype.show = function () {
    _Window_BattleEnemy_show.call(this);
    if (EnemySelectionFix.Parameters.ShowEnemyWindow) {
      this._height = SceneManager._scene.windowAreaHeight();
      this.y = Graphics.boxHeight - this._height;
    } else {
      this._height = 0;
    }
  };

  Window_BattleEnemy.prototype.maxCols = function () {
    return EnemySelectionFix.Parameters.ShowEnemyWindow
      ? 2
      : this._enemies.length;
  };

  const _Scene_Battle_startEnemySelection =
    Scene_Battle.prototype.startEnemySelection;
  Scene_Battle.prototype.startEnemySelection = function () {
    _Scene_Battle_startEnemySelection.call(this);
    this._statusWindow.show();
  };
})();
