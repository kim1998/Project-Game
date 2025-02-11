/*:
 * @target MZ
 * @author Aerosys
 * @plugindesc [Tier 1] [Version 1.0.5] [MV & MZ]
 * 
 * @help
 * 
 * ----------------------------------------------------------------------------
 * Rules
 * ----------------------------------------------------------------------------
 * 
 * 1. This Plugin is provided free of charge and may be used in any
 *    game project.
 * 
 * 2. You may not redistribute, sell, or make this Plugin available on any
 *    website, platform, or any other distribution channel on a standalone
 *    basis. You may also not claim the Plugin as your own.
 * 
 * 3. You may modify this Plugin to suit your needs, but Rule 2 also applies
 *    for modified versions of this Plugin.
 * 
 * 4. You may create a Plugin that requires this Plugin to function, but you
 *    may not redistribute, sell, or make your Plugin available on any website,
 *    platform, or any other distribution channel on a standalone basis, even
 *    if it is not a direct violation of Rule 2. Your Plugin can only be
 *    shipped as part of your game.
 * 
 * 5. You may send this Plugin to another person when you hire them for
 *    personal modifications.
 * 
 * 6. When multiple people work on the project, purchasing a license for every
 *    team member is not required.
 * 
 * 
 * ----------------------------------------------------------------------------
 * Quickstart
 * ----------------------------------------------------------------------------
 * 
 * This plugin enables the following JS code snippets that you can type in a
 * Script Command in Eventing (Tab 3 -> Script).
 * 
 * $gameScreen.addGabWindow(id, {
 *   align: ?,
 *   anchor: ?,
 *   autoExpire: ?,
 *   backgroundType: ?,
 *   backOpacity: ?,
 *   eventId: ?,
 *   expireOnMapChange: ?,
 *   fontSize: ?,
 *   height: ?,
 *   hidden: ?,
 *   openCloseSpeed: ?,
 *   padding: ?,
 *   target: ?,
 *   text: ?,
 *   textPadding: ?,
 *   width: ?,
 *   windowskin: ?,
 *   x: ?,
 *   y: ?,
 * })
 * 
 * Example:
 * 
 * $gameScreen.addGabWindow('helloWorld', {
 *   align: 'center',
 *   autoExpire: 60,
 *   eventId: 0,
 *   text: 'Hello World!',
 *   width: 200,
 * })
 * 
 * Arguments:
 * - id: string (Required!): A unique identifier
 * 
 * Params:
 * - Params in { } are optional!
 *   When not given, the plugin will use a default value.
 * - Params in { } are key-pair values, e.g. use {align: 'left'} to set
 *   text alignment to 'left'.
 * 
 * - align:             choose from 'left', 'right', 'center'
 * - anchor:            { x: number from 0 to 1, y: number from 0 to 1}
 *                      Example: { x: 0.5, y: 1 }
 *                      Default: { x: 0.5, y: 1 } when bound to a character,
 *                               { x: 0, y: 0 } otherwise
 * - autoExpire:        when given, number of frames until this gab window
 *                      closes itself automatically
 *                      Default: disabled
 * - backgroundType:    choose from
 *                          0 (default window)
 *                          1 (dimmed background)
 *                          2 (transparent)
 *                      Default: 0
 * - backOpacity:       number 0 <= x <= 255
 * - eventId:           - when 0: Gab Window positions above the Player
 *                      - when any positive number: Gab Window positions
 *                        above Event with given ID
 *                      Default: not used
 *                      See also: target
 * - expireOnMapChange: true / false
 *                      When true, the Window will disappear when the player
 *                      changes the map
 *                      Default: false
 * - fontSize:          number
 * - height:            height in pixels
 *                      When left out, the plugin will guess the height
 * - hidden:            true / false
 *                      Default: false
 * - openCloseSpeed:    number, default: 32
 * - padding:           padding in pixels
 * - target:            Choose from:
 *                      - follower 1, follower 2, follower 3, ...
 *                      - event 1, event 2, event 3, ...
 *                      - boat
 *                      - ship
 *                      - airship
 *                      - player
 *                      - actor 1, actor 2, ... (in battle only)
 *                      - enemy 1, enemy 2, ... (in battle only)
 *                      Example: 'follower 1'
 *                      Default: not used
 *                      See also: eventId
 * - text:              text to show. You may use Text Codes (\C, \V, ...)
 *                      You may need to escape the \-symbol
 *                      Example: \\C[3]Value: \\V[1]
 * - textPadding:       number
 * - width:             width in pixels
 *                      When left out, the plugin will guess the width
 * - windowskin:        name of an img file in /img/system/ (exluding .png)
 *                      Example: 'Window2'
 *                      Default: default Window Skin
 * - x, y:              position (can be left out when Event ID is passed)
 * 
 * 
 * $gameScreen.moveGabWindow(id, x, y)
 * - repositions Gab Window with given ID to x, y coordinates
 * 
 * $gameScreen.gabWindowChangeText(id, text)
 * - Updates the Text of a Gab Window
 * 
 * $gameScreen.changeGabWindow(id, { ... })
 * - You may pass the same params as for the method $gameScreen.addGabWindow
 * 
 * $gameScreen.removeGabWindow(id)
 * $gameScreen.removeAllGabWindows()
 * $gameScreen.hideGabWindow(id)
 * $gameScreen.hideAllGabWindows()
 * $gameScreen.showGabWindow(id)
 * $gameScreen.showAllGabWindows()
 * 
 * 
 * ----------------------------------------------------------------------------
 * Map Notetags
 * ----------------------------------------------------------------------------
 * 
 * The following Notetag(s) can be put on Maps:
 * 
 * <No Gab Windows>
 * 
 * 
 * @endofhelp
 * 
 * 
 * @command addGabWindow
 * @text Add Gab Window
 * 
 * @arg id
 * @text Identifier
 * @default REQUIRED
 * 
 * @arg text
 * @text Text
 * @type note
 * @desc You may use Text Codes (\C, \V, \I, ...)
 * 
 * @arg position
 * @text Position
 * @type struct<Position>
 * @default {"mode":"above Player","whenFixed":"","whenByVariables":"","eventId":"","anchor":"Automatic"}
 * 
 * @arg width
 * @text Width
 * @type number
 * @desc When empty, plugin will calculate the width automatically for you
 * 
 * @arg height
 * @text Height
 * @type number
 * @desc When empty, plugin will calculate the height automatically for you
 * 
 * @arg textSettings
 * @text Text Settings
 * @type struct<TextSettings>
 * @default {"align":"default","textPadding":"","fontSize":""}
 * 
 * @arg windowSettings
 * @text Window Settings
 * @type struct<WindowSettings>
 * @default {"backgroundType":"Window","backOpacity":"","padding":"","windowskin":""}
 * 
 * @arg hidden
 * @text Hidden?
 * @type boolean
 * @default false
 * 
 * @arg autoExpire
 * @text Auto Expire
 * @type number
 * @desc 0 or empty to not use auto-expire
 * 
 * @arg expireOnMapChange
 * @text Expire on Map Change?
 * @type boolean
 * @default false
 * @desc Window automatically expires when the Player changes the Map
 * 
 * 
 * @command addBattleGabWindow
 * @text Add Gab Window (Battle)
 * 
 * @arg id
 * @text Identifier
 * @default REQUIRED
 * 
 * @arg text
 * @text Text
 * @type note
 * @desc You may use Text Codes (\C, \V, \I, ...)
 * 
 * @arg position
 * @text Position
 * @type struct<PositionInBattle>
 * @default {"mode":"above Actor 1","whenFixed":"","whenByVariables":"","anchor":"Automatic"}
 * 
 * @arg width
 * @text Width
 * @type number
 * @desc When empty, plugin will calculate the width automatically for you
 * 
 * @arg height
 * @text Height
 * @type number
 * @desc When empty, plugin will calculate the height automatically for you
 * 
 * @arg textSettings
 * @text Text Settings
 * @type struct<TextSettings>
 * @default {"align":"default","textPadding":"","fontSize":""}
 * 
 * @arg windowSettings
 * @text Window Settings
 * @type struct<WindowSettings>
 * @default {"backgroundType":"Window","backOpacity":"","padding":"","windowskin":""}
 * 
 * @arg hidden
 * @text Hidden?
 * @type boolean
 * @default false
 * 
 * @arg autoExpire
 * @text Auto Expire
 * @type number
 * @desc 0 or empty to not use auto-expire
 * 
 * 
 * @command moveGabWindow
 * @text Move Gab Window
 * 
 * @arg id
 * @text Identifier
 * @default REQUIRED
 * 
 * @arg mode
 * @text Position
 * @type select
 * @option fixed
 * @option by Variables
 * @default fixed
 * 
 * @arg whenFixed
 * @parent mode
 * @text when fixed:
 * @type struct<PositionWhenFixed>
 * 
 * @arg whenByVariables
 * @parent mode
 * @text when by Variables:
 * @type struct<PositionWhenByVariables>
 * 
 * 
 * @command showHideGabWindow
 * @text Show/Hide Gab Window
 * 
 * @arg id
 * @text Identifier
 * @default REQUIRED
 * 
 * @arg mode
 * @text Mode
 * @type select
 * @option Show
 * @option Hide
 * @default Hide
 * 
 * 
 * @command showHideAllGabWindows
 * @text Show/Hide all Gab Windows
 * 
 * @arg mode
 * @text Mode
 * @type select
 * @option Show
 * @option Hide
 * @default Hide
 * 
 * 
 * @command removeGabWindow
 * @text Remove Gab Window
 * 
 * @arg id
 * @text Identifier
 * @default REQUIRED
 * 
 * 
 * @command removeAllGabWindows
 * @text Remove all Gab Windows
 * 
 * 
 * @param defaultAlign
 * @text Default Text Align
 * @type select
 * @option left
 * @option center
 * @option right
 * @default center
 * 
 * @param defaultOpacity
 * @text Default Opacity
 * @type number
 * @default 220
 * 
 * @param defaultWindowPadding
 * @text Default Window Padding
 * @type number
 * @default 12
 * 
 * @param defaultTextPadding
 * @text Default Text Padding
 * @type number
 * @default 6
 * 
 * @param defaultFontSize
 * @text Default Font Size
 * @type number
 * @default 26
 * 
 * @param autoFadeWhenCovered
 * @text Less opaque when being covered?
 * @type boolean
 * @default true
 * 
 * @param defaultFadeSpeed
 * @parent autoFadeWhenCovered
 * @text Transition Speed
 * @type number
 * @default 20
 * @desc Speed
 * 
 * @param defaultOpacityWhenCovered
 * @parent autoFadeWhenCovered
 * @text Opacity
 * @type number
 * @default 120
 * 
 * @param defaultOpenCloseSpeed
 * @text Default Open/Close Speed
 * @type number
 * @default 32
 * @desc The higher the number, the faster it is
 * 
 */

/*~struct~Position:
 *
 * @param mode
 * @text Position
 * @type combo
 * @option fixed
 * @option by Variables
 * @option above Player
 * @option above this Event
 * @option above other Event
 * @option above Follower 1
 * @option above Follower 2
 * @option above Follower 3
 * @option above Follower 4
 * @option above Follower 5
 * @option above Follower 6
 * @option above Boat
 * @option above Ship
 * @option above Airship
 * @default above Player
 * 
 * @param whenFixed
 * @parent mode
 * @text when fixed:
 * @type struct<PositionWhenFixed>
 * 
 * @param whenByVariables
 * @parent mode
 * @text when by Variables:
 * @type struct<PositionWhenByVariables>
 * 
 * @param eventId
 * @parent mode
 * @text when above Event: Event Id
 * @type number
 * 
 * @param anchor
 * @text Anchor
 * @type select
 * @option Automatic
 * @option Top Left
 * @option Top Center
 * @option Top Right
 * @option Middle Left
 * @option Middle Center
 * @option Middle Right
 * @option Bottom Left
 * @option Bottom Center
 * @option Bottom Right
 * @default Automatic
 * @desc When Automatic: bottom center when bound to any character, top left otherwise.
 */

/*~struct~PositionInBattle:
 *
 * @param mode
 * @text Position
 * @type combo
 * @option fixed
 * @option by Variables
 * @option above Actor x
 * @option above Enemy x
 * @desc Replace x with a number, e.g. Actor 1, Actor 2, ...
 * @default above Actor x
 * 
 * @param whenFixed
 * @parent mode
 * @text when fixed:
 * @type struct<PositionWhenFixed>
 * 
 * @param whenByVariables
 * @parent mode
 * @text when by Variables:
 * @type struct<PositionWhenByVariables>
 * 
 * @param anchor
 * @text Anchor
 * @type select
 * @option Automatic
 * @option Top Left
 * @option Top Center
 * @option Top Right
 * @option Middle Left
 * @option Middle Center
 * @option Middle Right
 * @option Bottom Left
 * @option Bottom Center
 * @option Bottom Right
 * @default Automatic
 * @desc When Automatic: bottom center when bound to any actor/enemy, top left otherwise.
 */

/*~struct~PositionWhenFixed:
 *
 * @param x
 * @text X
 * @desc You may use JavaScript
 * 
 * @param y
 * @text Y
 * @desc You may use JavaScript
 */

/*~struct~PositionWhenByVariables:
 *
 * @param x
 * @text X
 * @type variable
 * 
 * @param y
 * @text Y
 * @type variable
 */

/*~struct~TextSettings:
 *
 * @param align
 * @text Align
 * @type select
 * @option left
 * @option center
 * @option right
 * @option default
 * @default default
 * 
 * @param textPadding
 * @text Padding
 * @type number
 * 
 * @param fontSize
 * @text Font Size
 * @type number
 */

/*~struct~WindowSettings:
 *
 * @param backgroundType
 * @text Background Type
 * @type select
 * @option Window
 * @option Dimmed
 * @option Transparent
 * @default Window
 * 
 * @param backOpacity
 * @text Back Opacity
 * @type number
 * @desc 0 <= x <= 255. Empty to use default
 * 
 * @param padding
 * @text Padding
 * @type number
 * @desc When empty, default padding is used
 * 
 * @param windowskin
 * @text Window Skin
 * @type file
 * @dir img/system/
 * 
 * @param openCloseSpeed
 * @text Open/Close Speed
 * @type number
 * @desc The higher the number, the faster it is
 * 
 */


var Imported = Imported || { };
Imported.MK_GabWindows = true;


function Gab_Window() {
    this.initialize(...arguments);
}

Gab_Window.prototype = Object.create(Window_Base.prototype);
Gab_Window.prototype.constructor = Gab_Window;


(function() {


const PLUGIN_NAME = 'MK_GabWindows';

const reject = (reason) => {
    const message = (
        "An Error has occurred in the Plugin %1: %2 " +
        "If the problem persists, contact the Plugin Creator."
    ).format(PLUGIN_NAME, reason);
    throw Error(message);
}

if (!PluginManager._parameters[PLUGIN_NAME.toLowerCase()]) {
    reject((
        "Please check that this plugin's filename is \"%1.js\". " +
        "Subdirectories (e.g.: js/plugins/xy/thisPlugin.js) are not allowed."
    ).format(PLUGIN_NAME));
}

const structure = (serialized, parameterName) => {
    if (!serialized) {
        reject((
            "The Plugin Parameter \"%1\" is missing. " +
            "Please check it in the Plugin Manager. It may help to re-install this Plugin (i.e.: remove, re-add)."
        ).format(parameterName));
    }
    try {
        return JSON.parse(serialized);
    
    } catch (e) {
        reject((
            "The Plugin Parameter \"%1\" is corrupted. " +
            "Please check it in the Plugin Manager. It may help to re-install this Plugin (i.e.: remove, re-add)."
        ).format(parameterName));
    }
}

const readScriptNumberValue = (text, argumentName) => {
    if (!text) {
        reject("The Plugin Parameter or Call Argument \"%1\" is missing".format(argumentName));
    }
    try {
        return Number(eval(text));
    } catch (e) {
        reject((
            "The Plugin Parameter or Call Argument \"%1\" contains an error and could not be interpreted. " +
            "Cause: %2"
        ).format(argumentName, e));
    }
}

const params                        = PluginManager.parameters(PLUGIN_NAME);
const defaultAlign                  = params.defaultAlign || 'center';
const defaultOpacity                = Number(params.defaultOpacity) || 0;
const defaultWindowPadding          = Number(params.defaultWindowPadding) || 0;
const defaultTextPadding            = Number(params.defaultTextPadding) || 0;
const defaultFontSize               = Number(params.defaultFontSize) || 26;
const autoFadeWhenCovered           = 'true' == params.autoFadeWhenCovered;
const defaultFadeSpeed              = Number(params.defaultFadeSpeed) || 10;
const defaultOpacityWhenCovered     = Number(params.defaultOpacityWhenCovered) || 0;
const defaultOpenCloseSpeed         = Number(params.defaultOpenCloseSpeed) || 32;


Gab_Window.prototype.setup = function(id, showOpenAnimation) {
    this._id = id;
    this.setBackgroundType(this.backgroundType());
    this.loadWindowskin();

    if (showOpenAnimation || (this.data() && this.data().hidden)) {
        this.openness = 0;
    }
    this.refresh();
}

Gab_Window.prototype.update = function() {
    Window_Base.prototype.update.call(this);

    this.updatePadding();
    this.updateOpenClose();
    this.updateAnchor();
    this.updatePosition();
    this.updateBackOpacity();

    if (this._refreshRequired) {
        this._refreshRequired = false;
        this.refresh();
    }
}

// Override
Gab_Window.prototype.updateOpen = function() {
    if (this._opening) {
        this.openness += this.openCloseSpeed();
        if (this.isOpen()) {
            this._opening = false;
        }
    }
}

// Override
Gab_Window.prototype.updateClose = function() {
    if (this._closing) {
        this.openness -= this.openCloseSpeed();
        if (this.isClosed()) {
            this._closing = false;
        }
    }
}

Gab_Window.prototype.openCloseSpeed = function() {
    return (this.data() && this.data().openCloseSpeed) || defaultOpenCloseSpeed;
}

Gab_Window.prototype.requestRefresh = function() {
    this._refreshRequired = true;
}

Gab_Window.prototype.refresh = function() {
    Window_Base.prototype.refresh && Window_Base.prototype.refresh.call(this);

    this.clearContents();
    this.drawContent();
}

Gab_Window.prototype.resetFontSettings = function() {
    Window_Base.prototype.resetFontSettings.call(this);

    this.contents.fontSize = this.fontSize();
}

Gab_Window.prototype.fontSize = function() {
    return (this.data() && this.data().fontSize) || defaultFontSize;
}

// Override
Gab_Window.prototype.loadWindowskin = function() {
    const windowskin = (this.data() && this.data().windowskin) || 'Window';
    this.windowskin = ImageManager.loadSystem(windowskin);
}

Gab_Window.prototype.updateOpenClose = function() {
    if (this.data() && this.data().autoExpire) {
        this.data().autoExpire -= 1;
    }
    
    this.shouldBeOpen()
        ? this.open()
        : this.close();
}

Gab_Window.prototype.shouldBeOpen = function() {
    return (
        this.data() &&
        !this.data().hidden &&
        (typeof this.data().autoExpire === 'undefined' || this.data().autoExpire > 0)
    );
}

Gab_Window.prototype.updateAnchor = function() {
    this.anchor = this.anchor || { x: 0, y: 0 };

    if (!this.data()) return;
    
    if (this.data().anchor) {
        this.anchor = this.data().anchor;
    } else if (this.data().eventId !== undefined) {
        this.anchor = { x: 0.5, y: 1.0 };
    } else if (this.data().target) {
        this.anchor = { x: 0.5, y: 1.0 };
    } else {
        this.anchor = { x: 0, y: 0 };
    }
}

Gab_Window.prototype.updatePosition = function() {
    if (!this.data()) return;
    
    let x, y;
    const character = this.target();

    if (character && inBattle()) {
        x = character.x + (this.data().x || 0);
        y = character.y + (this.data().y || 0) - 120;
    }
    else if (character) {
        x = character.screenX() + (this.data().x || 0) - $gameMap.tileWidth() / 4;
        y = character.screenY() + (this.data().y || 0) - 50;
    }
    else {
        x = this.data().x;
        y = this.data().y;
    }
    this.x = (x || 0) - (this.anchor.x * this.width);
    this.y = (y || 0) - (this.anchor.y * this.height);
}

const stringEqualIgnoreCase = (string1, string2) => (
    string1 &&
    string2 &&
    string1.trim().toLowerCase() == string2.trim().toLowerCase()
);

Gab_Window.prototype.target = function() {
    const target = this.data() && this.data().target;
    const eventId = this.data() && this.data().eventId;
    
    // map related
    if (target && target.toLowerCase().startsWith('follower')) {
        const followerId = Number(target.toLowerCase().replace('follower', '')) - 1;
        return $gamePlayer.followers().follower(followerId);
    }
    if (target && target.toLowerCase().startsWith('event')) {
        const eventId = Number(target.toLowerCase().replace('event', ''));
        return $gameMap.event(eventId);
    }

    if (stringEqualIgnoreCase('boat', target))      return $gameMap.boat();
    if (stringEqualIgnoreCase('ship', target))      return $gameMap.ship();
    if (stringEqualIgnoreCase('airship', target))   return $gameMap.airship();
    if (stringEqualIgnoreCase('player', target))    return $gamePlayer;
    if (eventId === 0)                              return $gamePlayer;
    if (eventId > 0)                                return $gameMap.event(eventId);

    // battle related
    if (target && target.toLowerCase().startsWith('actor')) {
        const index = Number(target.toLowerCase().replace('actor', ''));
        const spriteset = SceneManager._scene && SceneManager._scene._spriteset;

        return (
            spriteset &&
            spriteset.battlerSprites &&
            spriteset.battlerSprites().filter(sprite => sprite instanceof Sprite_Actor)[index - 1]
        );
    }
    if (target && target.toLowerCase().startsWith('enemy')) {
        const index = Number(target.toLowerCase().replace('enemy', ''));
        const spriteset = SceneManager._scene && SceneManager._scene._spriteset;

        return (
            spriteset &&
            spriteset.battlerSprites &&
            spriteset.battlerSprites().filter(sprite => sprite instanceof Sprite_Enemy)[index - 1]
        );
    }
}

Gab_Window.prototype.updateBackOpacity = function() {
    const maxOpacity    = this.data() && 'backOpacity' in this.data()
                            ? this.data().backOpacity
                            : defaultOpacity;
    const minOpacity    = Math.min(maxOpacity, defaultOpacityWhenCovered);

    this.backOpacity    = !inBattle() && autoFadeWhenCovered && this.coversPlayer()
                            ? Math.max(this.backOpacity - defaultFadeSpeed, minOpacity)
                            : Math.min(this.backOpacity + defaultFadeSpeed, maxOpacity);
}

Gab_Window.prototype.coversPlayer = function() {
    return (
        this.x < $gamePlayer.screenX() &&
        $gamePlayer.screenX() < this.x + this.width + $gameMap.tileWidth() &&
        this.y < $gamePlayer.screenY() &&
        $gamePlayer.screenY() < this.y + this.height + $gameMap.tileWidth()
    );
}

Gab_Window.prototype.clearContents = function() {
    this.contents && this.contents.clear();
    this.contentsBack && this.contentsBack.clear();
}

Gab_Window.prototype.drawContent = function() {
    const text = this.text() || '';
    let yNext = this.contentsHeight() / 2 - this.calculateTextHeightEx(text) / 2;

    text.split('\n').forEach(line => {
        this.drawTextEx(
            line,
            0,
            yNext,
            this.contentsWidth(),
            this.align(),
        );
        yNext = yNext + this.calculateLineHeight(line) + this.textPadding();
    });
}

Gab_Window.prototype.drawTextEx = function(text, x, y, width, align) {
    const textWidth = this.calculateLineWidth(text);
    
    if ('center' == align)  x += width / 2 - textWidth / 2;
    if ('right' == align)   x += width - textWidth;

    Window_Base.prototype.drawTextEx.call(this, text, x, y, width);
}

Gab_Window.prototype.calculateTextWidth = function(text) {
    const lines = (text || '');
    
    return Math.max(...lines
        .split('\n')
        .map(line => this.calculateLineWidth(line))
    );
}

Gab_Window.prototype.calculateLineWidth = function(line) {
    return 'MZ' == Utils.RPGMAKER_NAME
        ? this.textSizeEx(line).width
        : this.drawTextEx(line, 0, this.contents.height);
}

Gab_Window.prototype.calculateTextHeightEx = function(text) {
    const lines = (text || '0').split('\n');
    const textHeightEx = lines
        .map(line => this.calculateLineHeight(line))
        .reduce((a, b) => a + b, 0);

    return textHeightEx + (lines.length - 1) * this.textPadding();
}

Gab_Window.prototype.calculateLineHeight = function(line) {
    return 'MZ' == Utils.RPGMAKER_NAME
        ? this.textSizeEx(line).height
        : this.calcTextHeight({ text: line, index: 0 });
}

Gab_Window.prototype.textPadding = function() {
    return this.data() && this.data().textPadding !== undefined
        ? this.data().textPadding
        : defaultTextPadding;
}

Gab_Window.prototype.updatePadding = function() {
    this.padding = (this.data() && this.data().padding) || defaultWindowPadding;
}

Gab_Window.prototype.text = function() {
    return this.data() && this.data().text;
}

Gab_Window.prototype.align = function() {
    return (this.data() && this.data().align) || defaultAlign;
}

Gab_Window.prototype.backgroundType = function() {
    return (this.data() && this.data().backgroundType) || 0;
}

Gab_Window.prototype.data = function() {
    return this._data || $gameScreen.gabWindows()[this._id];
}


const _createAllWindows = Scene_Message.prototype.createAllWindows;
Scene_Message.prototype.createAllWindows = function() {
    _createAllWindows.call(this);

    this.syncGabWindows();
}

const _update = Scene_Message.prototype.update;
Scene_Message.prototype.update = function() {
    _update.call(this);

    this.syncGabWindows(true);
}

Scene_Message.prototype.syncGabWindows = function(showOpenAnimation) {
    
    if (!inBattle() && $dataMap.meta && $dataMap.meta['No Gab Windows']) return;

    // add to screen
    Object.entries($gameScreen.gabWindows())
        .filter(([_, value]) => value)
        .filter(([key, _]) => !this._windowLayer.children.some(child =>
            child instanceof Gab_Window &&
            child._id == key
        ))
        .forEach(([key, value]) => this.registerGabWindow(key, value, showOpenAnimation));

    // auto expire
    Object.entries($gameScreen.gabWindows())
        .filter(([_, value]) => typeof value.autoExpire !== 'undefined' && value.autoExpire <= 0)
        .forEach(([key, _]) => $gameScreen.removeGabWindow(key));

    // remove from screen
    this._windowLayer.children
        .filter(child => child instanceof Gab_Window)
        .filter(child => !$gameScreen.gabWindows()[child._id] && child.isClosed())
        .forEach(child => this._windowLayer.removeChild(child));
}

const alias_SceneMap_create = Scene_Map.prototype.create;
Scene_Map.prototype.create = function() {
    
    if ($gamePlayer.isTransferring()) {
        this.removeGabWindowsAfterMapChange();
    }
    alias_SceneMap_create.call(this);
}

Scene_Map.prototype.removeGabWindowsAfterMapChange = function() {
    Object.entries($gameScreen.gabWindows())
        .filter(([_, value]) => !!value)
        .filter(([_, value]) => value.expireOnMapChange)
        .forEach(([key, _]) => $gameScreen.removeGabWindow(key))
}

const alias_SceneBattle_create = Scene_Battle.prototype.create;
Scene_Battle.prototype.create = function() {
    this.removeGabWindowsOnBattleStart();
    alias_SceneBattle_create.call(this);
}

Scene_Battle.prototype.removeGabWindowsOnBattleStart = function() {
    Object.entries($gameScreen.gabWindows())
        .filter(([_, value]) => !!value)
        .forEach(([key, _]) => $gameScreen.removeGabWindow(key));
}

Scene_Message.prototype.registerGabWindow = function(id, data, showOpenAnimation) {
    const x = data.x || 0;
    const y = data.y || 0;

    const dummyWindow = 'MZ' == Utils.RPGMAKER_NAME
        ? new Gab_Window(new Rectangle(0, 0, 0, 0))
        : new Gab_Window(0, 0, 0, 0);
    dummyWindow._data = data;

    const width = data.width || dummyWindow.calculateTextWidth(data.text || '0')
        + 2 * (data.padding || defaultWindowPadding)
        + ('MV' == Utils.RPGMAKER_NAME ? 30 : 0); // MV needs some push
    
    const height = data.height || dummyWindow.calculateTextHeightEx(data.text || '0')
        + 2 * (data.padding || defaultWindowPadding)
        + ('MV' == Utils.RPGMAKER_NAME ? 15 : 0); // MV needs some push
    
    const window = 'MZ' == Utils.RPGMAKER_NAME
        ? new Gab_Window(new Rectangle(x, y, width, height))
        : new Gab_Window(x, y, width, height);
    
    window.setup(id, showOpenAnimation);
    this.addWindow(window);
}

function inBattle() {
    return (
        SceneManager._scene &&
        SceneManager._scene instanceof Scene_Battle
    );
}

Game_Screen.prototype.gabWindows = function() {
    return (inBattle() ? this._battleGabWindows : this._gabWindows) || { };
}

Game_Screen.prototype.addGabWindow = function(id, data) {
    if (!id) reject("You forgot to pass an ID to a Gab Window.");
    
    this._gabWindows = this._gabWindows || { };
    this._battleGabWindows = this._battleGabWindows || { };
    
    inBattle()
        ? this._battleGabWindows[id] = data
        : this._gabWindows[id] = data;
}

Game_Screen.prototype.moveGabWindow = function(id, x, y) {
    this.changeGabWindow(id, { x, y });
}

Game_Screen.prototype.hideGabWindow = function(id) {
    this.changeGabWindow(id, { hidden: true });
}

Game_Screen.prototype.showGabWindow = function(id) {
    this.changeGabWindow(id, { hidden: false });
}

Game_Screen.prototype.hideAllGabWindows = function() {
    Object.keys(this.gabWindows()).forEach(id => this.hideGabWindow(id));
}

Game_Screen.prototype.showAllGabWindows = function() {
    Object.keys(this.gabWindows()).forEach(id => this.showGabWindow(id));
}

Game_Screen.prototype.gabWindowChangeText = function(id, text) {
    this.changeGabWindow(id, { text });
}

Game_Screen.prototype.changeGabWindow = function(id, data) {
    const existing = this.gabWindows()[id];
    if (existing) {
        Object
            .entries(data)
            .forEach(([key, value]) => existing[key] = value);
    }

    if (existing && 'text' in data) {
        this.refreshAllGabWindows();
    }
}

Game_Screen.prototype.removeGabWindow = function(id) {
    this._gabWindows = this._gabWindows || { };
    this._battleGabWindows = this._battleGabWindows || { };

    delete this._gabWindows[id];
    delete this._battleGabWindows[id];
}

Game_Screen.prototype.removeAllGabWindows = function() {
    this._gabWindows = { };
    this._battleGabWindows = { };
}

Game_Screen.prototype.refreshAllGabWindows = function() {
    const scene = SceneManager._scene;
    const windowLayer = scene && scene._windowLayer;
    
    if (windowLayer) {
        windowLayer.children
            .filter(child => child instanceof Gab_Window)
            .forEach(window => window.requestRefresh());
    }
}


const alias_GameVariables_setValue = Game_Variables.prototype.setValue;
Game_Variables.prototype.setValue = function(id, value) {
    const requiresRefresh = this.value(id) !== value;
    
    alias_GameVariables_setValue.call(this, id, value);

    if (requiresRefresh) $gameScreen.refreshAllGabWindows();
}


if ('MZ' == Utils.RPGMAKER_NAME) {

    // add self Event ID
    const alias = PluginManager.callCommand;
    PluginManager.callCommand = function(self, pluginName, _, args) {
        if (PLUGIN_NAME == pluginName) {
            args._eventId = self._eventId;
        }
        alias.apply(this, arguments);
    }

    const readXYValues = (args, thisEventId) => {
        let x, y, eventId, target;

        if ('fixed' == args.mode && args.whenFixed) {
            const struct = structure(args.whenFixed, 'Coordinates (Fixed)');
            x = readScriptNumberValue(struct.x, 'X Coordinate');
            y = readScriptNumberValue(struct.y, 'Y Coordinate');
        }
        if ('by Variables' == args.mode && args.whenByVariables) {
            const struct = structure(args.whenByVariables, 'Coordinates (Variables)')
            x = $gameVariables.value(Number(struct.x));
            y = $gameVariables.value(Number(struct.y));
        }

        // map related
        if ('above Player' == args.mode)        eventId = 0;
        if ('above this Event' == args.mode)    eventId = thisEventId;
        if ('above other Event' == args.mode)   eventId = Number(args.eventId);
        if ('above Boat' == args.mode)          target = 'boat';
        if ('above Ship' == args.mode)          target = 'ship';
        if ('above Airship' == args.mode)       target = 'airship';

        if (args.mode && args.mode.toLowerCase().startsWith('above follower')) {
            target = args.mode.toLowerCase().replace('above ', '');
        }
        
        // battle related
        if (args.mode && args.mode.toLowerCase().startsWith('above actor')) {
            target = args.mode.toLowerCase().replace('above ', '');
        }
        if (args.mode && args.mode.toLowerCase().startsWith('above enemy')) {
            target = args.mode.toLowerCase().replace('above ', '');
        }
        
        return { x, y, eventId, target };
    }

    PluginManager.registerCommand(PLUGIN_NAME, 'addGabWindow', args => {
        if (inBattle()) {
            reject('Please use the "Add Gab Window (Battle)" Command when you want to add a window in the battle scene.');
        }
        
        addGabWindow(args)
    });

    PluginManager.registerCommand(PLUGIN_NAME, 'addBattleGabWindow', args => {
        if (!inBattle()) {
            reject('Please use the "Add Gab Window" Command when you want to add a window outside the battle scene.');
        }
        
        addGabWindow(args);
    });

    function addGabWindow(args) {
        const positionArgs      = structure(args.position, 'Position');
        const textSettings      = structure(args.textSettings, 'Text Settings');
        const windowSettings    = structure(args.windowSettings, 'Window Settings');

        const data = {
            text:       JSON.parse(args.text || ''),
            x:          readXYValues(positionArgs, args._eventId).x,
            y:          readXYValues(positionArgs, args._eventId).y,
            eventId:    readXYValues(positionArgs, args._eventId).eventId,
            target:     readXYValues(positionArgs, args._eventId).target,
        }

        if ('Top Left'      == positionArgs.anchor)     data.anchor = { x: 0.0, y: 0.0 };
        if ('Top Center'    == positionArgs.anchor)     data.anchor = { x: 0.5, y: 0.0 };
        if ('Top Right'     == positionArgs.anchor)     data.anchor = { x: 1.0, y: 0.0 };
        if ('Middle Left'   == positionArgs.anchor)     data.anchor = { x: 0.0, y: 0.5 };
        if ('Middle Center' == positionArgs.anchor)     data.anchor = { x: 0.5, y: 0.5 };
        if ('Middle Right'  == positionArgs.anchor)     data.anchor = { x: 1.0, y: 0.5 };
        if ('Bottom Left'   == positionArgs.anchor)     data.anchor = { x: 0.0, y: 1.0 };
        if ('Bottom Center' == positionArgs.anchor)     data.anchor = { x: 0.5, y: 1.0 };
        if ('Bottom Right'  == positionArgs.anchor)     data.anchor = { x: 1.0, y: 1.0 };
        
        if (args.width)                         data.width = Number(args.width);
        if (args.height)                        data.height = Number(args.height);
        if ('default' != textSettings.align)    data.align = textSettings.align;
        if (textSettings.textPadding)           data.textPadding = Number(textSettings.textPadding);
        if (textSettings.fontSize)              data.fontSize = Number(textSettings.fontSize);
        if (windowSettings.backOpacity)         data.backOpacity = Number(windowSettings.backOpacity);
        if (windowSettings.padding)             data.padding = Number(windowSettings.padding);
        if (windowSettings.windowskin)          data.windowskin = windowSettings.windowskin;
        if (windowSettings.openCloseSpeed)      data.openCloseSpeed = Number(windowSettings.openCloseSpeed);
        if ('true' == args.hidden)              data.hidden = true;
        if (Number(args.autoExpire) > 0)        data.autoExpire = Number(args.autoExpire);
        if ('true' == args.expireOnMapChange)   data.expireOnMapChange = true;

        data.backgroundType = ['Window', 'Dimmed', 'Transparent'].indexOf(windowSettings.backgroundType);
        data.backgroundType = data.backgroundType == -1 ? 0 : data.backgroundType;

        $gameScreen.addGabWindow(args.id, data);
    }

    PluginManager.registerCommand(PLUGIN_NAME, 'moveGabWindow', args => {
        const x = readXYValues(args).x;
        const y = readXYValues(args).y;
        $gameScreen.moveGabWindow(args.id, x, y);
    });

    PluginManager.registerCommand(PLUGIN_NAME, 'changeText', args => {
        $gameScreen.gabWindowChangeText(args.id, JSON.parse(args.text || ''));
    });

    PluginManager.registerCommand(PLUGIN_NAME, 'showHideGabWindow', args => {
        if ('Show' == args.mode)    $gameScreen.showGabWindow(args.id);
        if ('Hide' == args.mode)    $gameScreen.hideGabWindow(args.id);
    });

    PluginManager.registerCommand(PLUGIN_NAME, 'showHideAllGabWindows', args => {
        if ('Show' == args.mode)    $gameScreen.showAllGabWindows();
        if ('Hide' == args.mode)    $gameScreen.hideAllGabWindows();
    });

    PluginManager.registerCommand(PLUGIN_NAME, 'removeGabWindow', args => {
        $gameScreen.removeGabWindow(args.id);
    });

    PluginManager.registerCommand(PLUGIN_NAME, 'removeAllGabWindows', () => {
        $gameScreen.removeAllGabWindows();
    });

}


})();
