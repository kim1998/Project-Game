/*:
 * @url https://coffeenahc.itch.io/
 * @target MZ
 * @author coffeenahc
 * @plugindesc (v.1.0) Adds a popup tooltip when hovering over a state icon during battle.
 * 
 * @help
 * ======================================================================================
 * 
 * VERSION HISTORY: 
 * - 1.0: Initial release
 * 
 * ======================================================================================
 * 
 * TERMS OF USAGE (As of 10/10/2023):
 * If you got this plugin FOR FREE on itch.io:
 * - Attribution to 'coffeenahc' is required along with a link to my itch io page.
 *   Example: coffeenahc (https://coffeenahc.itch.io/)
 * - Commercial or Non-commercial use
 * 
 * If YOU'VE PAID AT LEAST 5$ for this plugin on itch.io:
 * - No attribution or credit is required. 
 * - Commercial or Non-commercial use
 * 
 * If you wish to have this plugin customized further, I am open for commissions 
 * and you can reach me through the following links: 
 * 
 * Fiverr: https://www.fiverr.com/coffee_chan
 * itch.io: https://coffeenahc.itch.io/
 * 
 * You can also edit the plugins yourself but you are required to give me credits
 * if you acquired the plugin for free as stated in the terms above.
 * 
 * ======================================================================================
 * 
 * HOW TO USE:
 * 
 * 1.) For states:
 * - Add the following note tag to a state's note box: <tooltipTxt:text> where 'text' 
 * is what you would like shown when the state icon is hovered. Escape characters works
 * here just as it would in the message box (ie. \C[x] to change color, \I[x] to display 
 * icon, etc.).
 * 
 * Additional escape characters:
 * \TR - parses to remaining turns for a state
 * \BR - parses to remaining turns for a buff / debuff
 * 
 * 2.) For buffs:
 * - Edit the text from the plugin parameters of the plugin.
 * 
 * 
 * @param offsetX
 * @text Tooltip x offset
 * @desc Offset the tooltip by x units
 * @type Number
 * @default 0
 * 
 * @param offsetY
 * @text Tooltip y offset
 * @desc Offset the tooltip by y units
 * @type Number
 * @default 0
 * 
 * @param buffTooltipTexts
 * @text Buffs Tooltip Texts
 * 
 * @param hpBuff
 * @text HP Buff
 * @type text
 * @desc Text to display on the tooltip for this buff
 * @parent buffTooltipTexts
 * @default \}\I[32]\C[1]HP Buff: \C[3](Turns: \BR)
 * 
 * @param mpBuff
 * @text MP Buff
 * @type text
 * @desc Text to display on the tooltip for this buff
 * @parent buffTooltipTexts
 * @default \}\I[33]\C[1]MP Buff: \C[3](Turns: \BR)
 * 
 * @param atkBuff
 * @text Atk Buff
 * @type text
 * @desc Text to display on the tooltip for this buff
 * @parent buffTooltipTexts
 * @default \}\I[34]\C[1]Atk Buff: \C[3](Turns: \BR)
 * 
 * @param defBuff
 * @text Def Buff
 * @type text
 * @desc Text to display on the tooltip for this buff
 * @parent buffTooltipTexts
 * @default \}\I[35]\C[1]Def Buff: \C[3](Turns: \BR)
 * 
 * @param matkBuff
 * @text M.Atk Buff
 * @type text
 * @desc Text to display on the tooltip for this buff
 * @parent buffTooltipTexts
 * @default \}\I[36]\C[1]M.Atk Buff: \C[3](Turns: \BR)
 * 
 * @param mdefBuff
 * @text M.Def Buff
 * @type text
 * @desc Text to display on the tooltip for this buff
 * @parent buffTooltipTexts
 * @default \}\I[37]\C[1]M.Def Buff: \C[3](Turns: \BR)
 * 
 * @param agiBuff
 * @text Agi Buff
 * @type text
 * @desc Text to display on the tooltip for this buff
 * @parent buffTooltipTexts
 * @default \}\I[38]\C[1]Agi Buff: \C[3](Turns: \BR)
 * 
 * @param lukBuff
 * @text Luk Buff
 * @type text
 * @desc Text to display on the tooltip for this buff
 * @parent buffTooltipTexts
 * @default \}\I[39]\C[1]Luk Buff: \C[3](Turns: \BR)
 * 
 * @param debuffTooltipTexts
 * @text Debuffs Tooltip Texts
 * 
 * @param hpDebuff
 * @text HP Buff
 * @type text
 * @desc Text to display on the tooltip for this buff
 * @parent debuffTooltipTexts
 * @default \}\I[48]\C[1]HP Debuff: \C[3](Turns: \BR)
 * 
 * @param mpDebuff
 * @text MP Buff
 * @type text
 * @desc Text to display on the tooltip for this buff
 * @parent debuffTooltipTexts
 * @default \}\I[49]\C[1]MP Debuff: \C[3](Turns: \BR)
 * 
 * @param atkDebuff
 * @text Atk Buff
 * @type text
 * @desc Text to display on the tooltip for this buff
 * @parent debuffTooltipTexts
 * @default \}\I[50]\C[1]Atk Debuff: \C[3](Turns: \BR)
 * 
 * @param defDebuff
 * @text Def Buff
 * @type text
 * @desc Text to display on the tooltip for this buff
 * @parent debuffTooltipTexts
 * @default \}\I[51]\C[1]Def Debuff: \C[3](Turns: \BR)
 * 
 * @param matkDebuff
 * @text M.Atk Buff
 * @type text
 * @desc Text to display on the tooltip for this buff
 * @parent debuffTooltipTexts
 * @default \}\I[52]\C[1]M.Atk Debuff: \C[3](Turns: \BR)
 * 
 * @param mdefDebuff
 * @text M.Def Buff
 * @type text
 * @desc Text to display on the tooltip for this buff
 * @parent debuffTooltipTexts
 * @default \}\I[53]\C[1]M.Def Debuff: \C[3](Turns: \BR)
 * 
 * @param agiDebuff
 * @text Agi Buff
 * @type text
 * @desc Text to display on the tooltip for this buff
 * @parent debuffTooltipTexts
 * @default \}\I[54]\C[1]Agi Debuff: \C[3](Turns: \BR)
 * 
 * @param lukDebuff
 * @text Luk Buff
 * @type text
 * @desc Text to display on the tooltip for this buff
 * @parent debuffTooltipTexts
 * @default \}\I[55]\C[1]Luk Debuff: \C[3](Turns: \BR)
 */

var GBCCoffee = GBCCoffee || {};
GBCCoffee.StateTooltips = {};
GBCCoffee.StateTooltips.offsetX = parseInt(PluginManager.parameters("GBCCoffee_StateTooltips")["offsetX"]);
GBCCoffee.StateTooltips.offsetY = parseInt(PluginManager.parameters("GBCCoffee_StateTooltips")["offsetY"]);
GBCCoffee.StateTooltips.paramNames = ["hp", "mp", "atk", "def", "matk", "mdef", "agi", "luk"];
GBCCoffee.StateTooltips.buffTexts = GBCCoffee.StateTooltips.paramNames.map(param => PluginManager.parameters("GBCCoffee_StateTooltips")[`${param}Buff`]);
GBCCoffee.StateTooltips.debuffTexts = GBCCoffee.StateTooltips.paramNames.map(param => PluginManager.parameters("GBCCoffee_StateTooltips")[`${param}Debuff`]);

let gbccoffee_statetooltip_scenebattle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    gbccoffee_statetooltip_scenebattle_update.call(this);
    if (this._stateTooltip.visible) {
        this._stateTooltip.x = TouchInput.x + GBCCoffee.StateTooltips.offsetX;
        this._stateTooltip.y = TouchInput.y + GBCCoffee.StateTooltips.offsetY;

        this._stateTooltip.x = Math.max(0, Math.min(this._stateTooltip.x, Graphics.boxWidth - this._stateTooltip.width));
        this._stateTooltip.y = Math.max(0, Math.min(this._stateTooltip.y, Graphics.boxHeight - this._stateTooltip.height));
    }
};

let gbccoffee_statetooltip_scenebattle_createallwindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
    gbccoffee_statetooltip_scenebattle_createallwindows.call(this);
    this.createTooltipWindow();
};

Scene_Battle.prototype.createTooltipWindow = function() {
    this._stateTooltip = new Window_StateTooltip();
    this.addChild(this._stateTooltip);
};

Scene_Battle.prototype.showTooltip = function(spriteStateIcon) {
    this._stateTooltip.setup(spriteStateIcon._battler);
    this._stateTooltip.visible = true;
};

Scene_Battle.prototype.hideTooltip = function() {
    this._stateTooltip.visible = false;
};

let gbccoffee_statetooltips_spritestateicon_initialize = Sprite_StateIcon.prototype.initialize;
Sprite_StateIcon.prototype.initialize = function() {
    gbccoffee_statetooltips_spritestateicon_initialize.call(this);
    this._hovered = false;
};

let gbccoffee_statetooltips_spritestateicon_update = Sprite_StateIcon.prototype.update;
Sprite_StateIcon.prototype.update = function() {
    gbccoffee_statetooltips_spritestateicon_update.call(this);
    this.processTouch();
};

Sprite_StateIcon.prototype.processTouch = function() {
    if (this.isBeingTouched()) {
        if (!this._hovered && TouchInput.isHovered()) {
            this._hovered = true;
            this.onMouseEnter();
        }
    } else {
        if (this._hovered) {
            this.onMouseExit();
        }
        this._pressed = false;
        this._hovered = false;
    }
};

Sprite_StateIcon.prototype.isPressed = function() {
    return this._pressed;
};

Sprite_StateIcon.prototype.isBeingTouched = function() {
    const touchPos = new Point(TouchInput.x, TouchInput.y);
    const localPos = this.worldTransform.applyInverse(touchPos);
    return this.hitTest(localPos.x, localPos.y);
};

Sprite_StateIcon.prototype.hitTest = function(x, y) {
    const rect = new Rectangle(
        -this.anchor.x * this.width,
        -this.anchor.y * this.height,
        this.width,
        this.height
    );
    return rect.contains(x, y);
};

Sprite_StateIcon.prototype.onMouseEnter = function() {
    if (SceneManager._scene instanceof Scene_Battle) {
        if (this._battler && this._battler.allIcons().length > 0) {
            SceneManager._scene.showTooltip(this);
        }
    }
};

Sprite_StateIcon.prototype.onMouseExit = function() {
    if (SceneManager._scene instanceof Scene_Battle) {
        SceneManager._scene.hideTooltip();
    }
};

function Window_StateTooltip() {
    this.initialize(...arguments);
}

Window_StateTooltip.prototype = Object.create(Window_Selectable.prototype);
Window_StateTooltip.prototype.constructor = Window_StateTooltip;

Window_StateTooltip.prototype.initialize = function() {
    Window_Selectable.prototype.initialize.call(this, new Rectangle(0,0,0,0));
    this.visible = false;
};

Window_StateTooltip.prototype.setup = function(battler) {
    this._battler = battler;

    let w = 0;
    let h = 0;

    this._buffTexts = [];
    for (let i = 0; i < this._battler.buffLength(); i++) {
        let bd = {isBuffDebuff: true, param: i};
        if (this._battler.isBuffAffected(i)) {
            bd.text = GBCCoffee.StateTooltips.buffTexts[i];
            this._buffTexts.push(bd);
        } else if (this._battler.isDebuffAffected(i)) {
            bd.text = GBCCoffee.StateTooltips.debuffTexts[i];
            this._buffTexts.push(bd);
        }
    }
    
    let stateTextWidths = this._battler.states().map(state => state.meta.tooltipTxt ? 
        this.textSizeEx(state.meta.tooltipTxt).width : 
        this.textSizeEx(`\\}\\I[${state.iconIndex}]\\C[1]${state.name}`).width
    );
    let buffTextWidths = this._buffTexts.map(buff => this.textSizeEx(buff.text).width);

    w = Math.max(0, ...stateTextWidths, ...buffTextWidths);
    this._battler.states().concat(this._buffTexts).forEach(t => {
        if (t.isBuffDebuff) {
            h += this.textSizeEx(t.text).height;
        } else {
            if (t.meta.tooltipTxt) {
                h += this.textSizeEx(t.meta.tooltipTxt).height;
            } else {
                h += this.textSizeEx(`\\}\\I[${t.iconIndex}]\\C[1]${t.name}`).height
            }
        }
    });
    
    this.width = w + (this.padding * 3);
    this.height = h + (this.padding * 2);

    this.createContents();

    for (let i = 0; i < this._battler.states().length; i++) {
        this._state = this._battler.states()[i];
        if (this._state.meta.tooltipTxt) {
            this.drawTextEx(this._state.meta.tooltipTxt, 0, (i * 35), this.width);
        } else {
            this.drawTextEx(`\\}\\I[${this._state.iconIndex}]\\C[1]${this._state.name}`, 0, (i * 35), this.width);
        }
    }

    for (let i = 0; i < this._buffTexts.length; i++) {
        this._buff = this._buffTexts[i];
        this.drawTextEx(this._buff.text, 0, (this._battler.states().length * 35) + (i * 35), this.width);
    }
};

let gbccoffee_statetooltip_windowbase_convertescapecharacters = Window_StateTooltip.prototype.convertEscapeCharacters;
Window_StateTooltip.prototype.convertEscapeCharacters = function(text) {
    let t = gbccoffee_statetooltip_windowbase_convertescapecharacters.call(this, text);
    if (this._battler && this._state) {
        let turnRemain = this._battler._stateTurns[this._state.id];
        if (this._state.autoRemovalTiming == 1) {
            turnRemain += 1;
        }
        if (turnRemain <= 0) turnRemain = "∞";
        t = t.replace(/\x1bTR/gi, turnRemain);

        let stepsRemain = this._state.stepsToRemove;
        t = t.replace(/\x1bSR/gi, stepsRemain);
    }

    if (this._battler && this._buff) {
        let turnRemain = (this._battler._buffTurns[this._buff.param]) + 1;

        t = t.replace(/\x1bBR/gi, turnRemain);
    }
    return t;
};

Window_Scrollable.prototype.updateArrows = function() {};