/*:
 * @plugindesc Custom Main Menu Prototype v1.0
 * @author YourName
 * @help
 * Replaces the default main menu with a completely custom screen.
 * Placeholder buttons are drawn at the coordinates specified in
 * the buttonData array. Click a button to call the corresponding
 * scene (Characters, Items, Options, Save, Load, End Game) or
 * to do nothing (Skill Tree, Quest Log).
 *
 * Modify the buttonData array to change button text, position,
 * size, and target scene.
 */

(() => {
    // ------------------------------------------------------------
    // BUTTON DEFINITIONS
    // Change x, y, width, height, text, and sceneName as you like.
    // sceneName: the JavaScript name of the target scene (string)
    //             or null for buttons that do nothing yet.
    // ------------------------------------------------------------
    const buttonData = [
        { x: 80,  y: 120, width: 220, height: 48, text: "Characters",  sceneName: "Scene_Status" },
        { x: 80,  y: 190, width: 220, height: 48, text: "Skill Tree",  sceneName: null },
        { x: 80,  y: 260, width: 220, height: 48, text: "Items",       sceneName: "Scene_Item" },
        { x: 80,  y: 330, width: 220, height: 48, text: "Quest Log",   sceneName: "Ayatam.QUEST.openQuestMenu()" },
        { x: 500, y: 120, width: 220, height: 48, text: "Options",     sceneName: "Scene_Options" },
        { x: 500, y: 190, width: 220, height: 48, text: "Save",        sceneName: "Scene_Save" },
        { x: 500, y: 260, width: 220, height: 48, text: "Load",        sceneName: "Scene_Load" },
        { x: 500, y: 330, width: 220, height: 48, text: "End Game",    sceneName: "Scene_Gameover" }
    ];

    // ------------------------------------------------------------
    // Override the map's menu call to push our custom scene instead.
    // ------------------------------------------------------------
    const _Scene_Map_callMenu = Scene_Map.prototype.callMenu;
    Scene_Map.prototype.callMenu = function() {
        SceneManager.push(Scene_CustomMenu);
    };

    // ------------------------------------------------------------
    // Custom Scene Definition
    // ------------------------------------------------------------
    function Scene_CustomMenu() {
        this.initialize();
    }

    Scene_CustomMenu.prototype = Object.create(Scene_Base.prototype);
    Scene_CustomMenu.prototype.constructor = Scene_CustomMenu;

    Scene_CustomMenu.prototype.initialize = function() {
        Scene_Base.prototype.initialize.call(this);
    };

    Scene_CustomMenu.prototype.create = function() {
        Scene_Base.prototype.create.call(this);
        this.createButtons();
    };

    Scene_CustomMenu.prototype.createButtons = function() {
        this._buttons = [];
        for (const btn of buttonData) {
            const sprite = new Sprite_Clickable();
            // Create a simple grey placeholder bitmap
            sprite.bitmap = new Bitmap(btn.width, btn.height);
            sprite.bitmap.fillAll('gray');
            sprite.bitmap.fontSize = 22;
            sprite.bitmap.textColor = 'white';
            sprite.bitmap.drawText(btn.text, 0, 0, btn.width, btn.height, 'center');

            sprite.x = btn.x;
            sprite.y = btn.y;
            sprite.sceneName = btn.sceneName;   // store for later use

            // Click handler
            sprite.onClick = function() {
                if (this.sceneName) {
                    // Jump to the requested scene
                    SceneManager.push(eval(this.sceneName));
                } else {
                    // Placeholder: flash yellow to indicate "not yet implemented"
                    this.flash(new Color(255, 255, 0, 128), 16);
                }
            };

            this.addChild(sprite);
            this._buttons.push(sprite);
        }
    };

    Scene_CustomMenu.prototype.update = function() {
        Scene_Base.prototype.update.call(this);
        // Pressing cancel (Esc / right-click) returns to the map
        if (Input.isTriggered('cancel')) {
            SceneManager.pop();
        }
    };

    // ------------------------------------------------------------
    // Simple clickable sprite class (mouse / touch)
    // ------------------------------------------------------------
    function Sprite_Clickable() {
        this.initialize();
    }
    Sprite_Clickable.prototype = Object.create(Sprite.prototype);
    Sprite_Clickable.prototype.constructor = Sprite_Clickable;

    Sprite_Clickable.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);
        this.onClick = null;
    };

    Sprite_Clickable.prototype.update = function() {
        Sprite.prototype.update.call(this);
        this.updateClick();
    };

    Sprite_Clickable.prototype.updateClick = function() {
        if (TouchInput.isTriggered() && this.isBeingTouched()) {
            if (this.onClick) this.onClick.call(this);
        }
    };

    Sprite_Clickable.prototype.isBeingTouched = function() {
        const tx = TouchInput.x;
        const ty = TouchInput.y;
        return tx >= this.x && tx < this.x + this.width &&
               ty >= this.y && ty < this.y + this.height;
    };

})();