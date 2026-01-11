/*:
 * @target MZ
 * @plugindesc (VisuStella Compatible) Random Custom sounds for Enemy Actions and Damage.
 * @author AI Assistant
 *
 * @help EnemyCustomSounds.js
 *
 * ============================================================================
 * HOW TO USE
 * ============================================================================
 * Place these tags in the Enemy "Note" box.
 *
 * 1. MULTIPLE SOUNDS (RANDOMIZATION)
 *    To make an enemy pick a random sound, simply add the notetag multiple times.
 *
 *    Example:
 *      <Attack SE: Roar1>
 *      <Attack SE: Roar2>
 *      <Attack SE: Growl, 90, 80, 0>
 *
 * 2. ATTACK / ACTION SOUND
 *    Plays when the enemy starts ANY action.
 *    Format: <Attack SE: Filename, Volume, Pitch, Pan>
 *
 * 3. HURT (DAMAGE) SOUND
 *    Plays when the enemy takes damage.
 *    Format: <Hurt SE: Filename, Volume, Pitch, Pan>
 *
 * ============================================================================
 */

(() => {
    const pluginName = "EnemyCustomSounds";

    // ------------------------------------------------------------------------
    // Helper: Parse a single SE string
    // ------------------------------------------------------------------------
    const parseCustomSe = (metaString) => {
        if (!metaString) return null;

        const data = metaString.split(',').map(s => s.trim());
        
        return {
            name: data[0],
            volume: data[1] ? parseInt(data[1]) : 90,
            pitch: data[2] ? parseInt(data[2]) : 100,
            pan: data[3] ? parseInt(data[3]) : 0
        };
    };

    // ------------------------------------------------------------------------
    // Helper: Find all matching tags and pick one randomly
    // ------------------------------------------------------------------------
    const getRandomSeFromNote = (noteText, tagName) => {
        if (!noteText) return null;

        // Create a Regex to find all instances of <tagName: data>
        // "g" = global (find all), "i" = case insensitive
        const regex = new RegExp(`<${tagName}:\\s*([^>]+)>`, "gi");
        
        const matches = [];
        let match;
        
        // Loop through the note text to find every occurrence
        while ((match = regex.exec(noteText)) !== null) {
            // match[1] contains the data inside the tag (e.g., "Roar, 90, 100")
            const seObj = parseCustomSe(match[1]);
            if (seObj && seObj.name) {
                matches.push(seObj);
            }
        }

        if (matches.length === 0) return null;

        // Pick a random index
        const randomIndex = Math.floor(Math.random() * matches.length);
        return matches[randomIndex];
    };

    // ------------------------------------------------------------------------
    // Custom Action Sound (BattleManager Hook)
    // ------------------------------------------------------------------------
    const _BattleManager_startAction = BattleManager.startAction;
    BattleManager.startAction = function() {
        // 1. Run standard/VisuStella logic
        _BattleManager_startAction.call(this);

        // 2. Custom Sound Logic
        if (this._subject && this._subject.isEnemy()) {
            const enemyData = this._subject.enemy();
            
            // Look for <Attack SE> tags in the raw note text
            const se = getRandomSeFromNote(enemyData.note, "Attack SE");

            if (se) {
                AudioManager.playSe(se);
            }
        }
    };

    // ------------------------------------------------------------------------
    // Custom Hurt (Damage) Sound
    // ------------------------------------------------------------------------
    const _Game_Enemy_performDamage = Game_Enemy.prototype.performDamage;
    Game_Enemy.prototype.performDamage = function() {
        const enemyData = this.enemy();

        // Look for <Hurt SE> tags in the raw note text
        const se = getRandomSeFromNote(enemyData.note, "Hurt SE");

        if (se) {
            // 1. Run basic battler damage logic
            Game_Battler.prototype.performDamage.call(this);

            // 2. Play the Random Custom Sound
            AudioManager.playSe(se);

            // 3. Request blink effect
            this.requestEffect("blink");
        } else {
            // No custom tag? Play default sound.
            _Game_Enemy_performDamage.call(this);
        }
    };

})();