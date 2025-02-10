/*
 * Copyright (c) 2021 Vladimir Skrypnikov (Pheonix KageDesu)
 * <http://kdworkshop.net/>
 *
* License: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial

 */

 // * CHANGELOG ===================
 // v1.0.1 (3.02.2022)
 //    - Compatibility fix for VisuMZ_0_CoreEngine plugin
 //
 // v1.0 (21.10.2021)
 //    - Release
 // ===============================

/*:
 * @plugindesc (v.1.0.1)[BASIC] Fog Of War on Map
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url http://kdworkshop.net/plugins/fog-of-war
 *
 * 
 * @help
 * ---------------------------------------------------------------------------
 * This plugin add fog of war on map
 *
 * For activate plugin on certain map, add <PFOG> in map Note section
 * (not works on maps without Note for performance reasons)
 *
 * You can find guide on plugin webpage
 *
 * Script calls:
 * FOG_Refresh(); - refresh fog around player
 *   - use when you change variable with player fog open radius

 * FOG_OpenInPoint(X, Y, RADIUS); - open fog in certain point on map
 *    - example: FOG_OpenInPoint(3, 4, 3);

 * FOG_Reset(MAP_ID); - reset fog for certain map.
 *    - use for create fog of war again
 *    - [PRO only] use for clear fog saved state if player never return to
 *  this map. Recommended for reduce savefile size!
 *
 * Plugin not have plugin commands
 * 
 * ---------------------------------------------------------------------------
  * This is BASIC plugin version and have some restrictions:
 *    - Fog Of War state NOT SAVES when you change map
 *    - NOT HAVE custom fog fragments settings per regions
 *    - Obfuscated plugin code
 *    - Commercial use NOT allowed
 * 
 *  PRO version of plugin don't have this restrictions!

 * If you like my Plugins, want more and offten updates,
 * please support me on Patreon!
 * 
 * Patreon Page:
 *      https://www.patreon.com/KageDesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * You can use this plugin in your game thanks to all my Patrons!
 *
 * License: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial

 * 

 * @param resetFog:b
 * @type boolean
 * @text Reset Fog?
 * @on Reset
 * @off No
 * @default false
 * @desc Reset (not save) fog of war state when player change (leave) map?
 * 
 * @param playerRadiusVarId:int
 * @type variable
 * @text Open fog radius
 * @default 0
 * @desc Variable ID that contains value of player open fog radius
 * 
 * @param fogRegions:intA
 * @type number[]
 * @text Regions for Fog
 * @min 1
 * @max 255
 * @default []
 * @desc Region's ID for Fog on map
 * 
 * @param fogIgnorePairs:structA
 * @parent fogRegions:intA
 * @type struct<FogIgnorePair>[]
 * @text Ignore Regions
 * @default []
 * @desc Region pairs that not open Fog on each other (read guide)
 * 
 * @param defFogSettingsGroup:struct
 * @text Default Fog Settings
 * @type struct<FogFragmentGroup>
 * @default {"regionId:i":"0","fogSettings:struct":"{\"color:color\":\"#000000\",\"opacity:i\":\"255\"}","fogSettingsOuter:struct":"{\"color:color\":\"#000000\",\"opacity:i\":\"230\"}","halfFadeSettings:struct":"{\"fadeStep:i\":\"4\",\"fadeSpeed:i\":\"1\"}","fullFadeSettings:struct":"{\"fadeStep:i\":\"6\",\"fadeSpeed:i\":\"1\"}"}
 * @desc Default fog fragments settings (for all region ID's)
 * 
 * @param fogFragmentsSettings:structA
 * @type struct<FogFragmentGroup>[]
 * @text Custom Fog Settings
 * @default []
 * @desc [PRO only] Custom fog fragments settings per certain Region ID
 * 


 * 


 */
/*~struct~FogIgnorePair:

 * @param regionId:i
 * @text Main Region ID
 * @type number
 * @min 1
 * @max 255
 * @desc Region ID from Ignored Regions ID's will NOT opened
 * @default 1

@param ignoredRegions:intA
@type number[]
@text Ignored Regions ID's
@min 1
@max 255
@default []
@desc Region's ID that will NOT open when player stay in Main Region ID
*/

/*~struct~FogFragment:
 * @param color:color
 * @text Color
 * @default #000000
 * @desc Fog fragment color in HEX

 * @param opacity:i
 * @text Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Fog fragment initial opacity
 * @default 255
*/

/*~struct~FogFade:
 * @param fadeStep:i
 * @text Step
 * @type number
 * @min 1
 * @max 255
 * @desc Fog fragment opacity change value per Speed
 * @default 4

 * @param fadeSpeed:i
 * @text Speed
 * @type number
 * @min 1
 * @max 60
 * @desc Change fog opacity by Step per Speed frame
 * @default 1
*/

/*~struct~FogFragmentGroup:
 * @param regionId:i
 * @text Region ID
 * @type number
 * @min 1
 * @max 255
 * @desc Region ID for that this settings is. Should be in Regions for Fog parameter
 * @default 1

 * @param fogSettings:struct
 * @text Fog
 * @type struct<FogFragment>
 * @desc Fog fragment settings
 * @default

 * @param fogSettingsOuter:struct
 * @text Outer Fog
 * @type struct<FogFragment>
 * @desc Outer fog fragment settings
 * @default

 * @param halfFadeSettings:struct
 * @text Half Open
 * @type struct<FogFade>
 * @desc Setting when fog starts open (for half state), near the open fog radius
 * @default

 * @param fullFadeSettings:struct
 * @text Full Open
 * @type struct<FogFade>
 * @desc Setting when fog starts open fully (and should disappear), in the open fog radius
 * @default
*/
// * MAIN

var Imported = Imported || {};
Imported.PKD_FOG = true;

var PKD_FOG = {};
PKD_FOG.version = 101; // 1.0.1

PKD_FOG.link = function (library) {
    this[library.name] = library;
};

// * For parameters
PKD_FOG.PP = {};

// * For fog bitmaps
// * Битмапы для обоих цветов храняться в кэшэ и используются одни и теже
// * Так как не изменяются
PKD_FOG.CACHE = {};

// Generated by CoffeeScript 2.5.1
// ==========================================================================
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ KDCore.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
// * LIBRARY WITH MZ AND MZ SUPPORT
//! {OUTER FILE}

//?rev 18.09.21
var KDCore;

KDCore = KDCore || {};

// * Двузначные числа нельзя в версии, сравнение идёт по первой цифре поулчается
KDCore._fileVersion = '2.6';

if ((KDCore.Version != null) && KDCore.Version > KDCore._fileVersion) {
  // * ПРОПУСКАЕМ ЗАГРУЗКУ, так как уже загруженна более новая
  console.log('XDev KDCore ' + KDCore._fileVersion + ' skipped by new version');
} else {
  KDCore.Version = KDCore._fileVersion;
  KDCore.LIBS = KDCore.LIBS || {};
  KDCore.register = function(library) {
    return this.LIBS[library.name] = library;
  };
  window.KDCore = KDCore;
  console.warn("XDev KDCore is loaded " + KDCore.Version);
  (function() {
    var BitmapSrc, Color, DevLog, Point, SDK, __TMP_LOGS__, ___Sprite_alias_Move_KDCORE_2, __alias_Bitmap_blt_kdCore, __alias_Bitmap_fillAll, i, l, m, o;
    // * Array Extension
    //------------------------------------------------------------------------------
    Array.prototype.delete = function() {
      var L, a, ax, what;
      what = void 0;
      a = arguments;
      L = a.length;
      ax = void 0;
      while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
          this.splice(ax, 1);
        }
      }
      return this;
    };
    Array.prototype.max = function() {
      return Math.max.apply(null, this);
    };
    Array.prototype.min = function() {
      return Math.min.apply(null, this);
    };
    Array.prototype.sample = function() {
      if (this.length === 0) {
        return [];
      }
      return this[SDK.rand(0, this.length - 1)];
    };
    Array.prototype.first = function() {
      return this[0];
    };
    Array.prototype.last = function() {
      return this[this.length - 1];
    };
    Array.prototype.shuffle = function() {
      var k, n, v;
      n = this.length;
      while (n > 1) {
        n--;
        k = SDK.rand(0, n + 1);
        v = this[k];
        this[k] = this[n];
        this[n] = v;
      }
    };
    Array.prototype.count = function() {
      return this.length;
    };
    Array.prototype.isEmpty = function() {
      return this.length === 0;
    };
    // * Ищет элемент, у которого поле ID == id
    Array.prototype.getById = function(id) {
      return this.getByField('id', id);
    };
    // * Ищет элемент, у которого поле FIELD (имя поля) == value
    Array.prototype.getByField = function(field, value) {
      var e;
      try {
        return this.find(function(item) {
          return item[field] === value;
        });
      } catch (error1) {
        e = error1;
        console.warn(e);
        return null;
      }
    };
    // * Number Extension
    //------------------------------------------------------------------------------
    Number.prototype.do = function(method) {
      return SDK.times(this, method);
    };
    Number.prototype.clamp = function(min, max) {
      return Math.min(Math.max(this, min), max);
    };
    Number.prototype.any = function(number) {
      return (number != null) && number > 0;
    };
    // * String Extension
    //------------------------------------------------------------------------------
    String.prototype.toCss = function() {
      return KDCore.Color.FromHex(this).CSS;
    };
    String.prototype.toCSS = function() {
      return this.toCss();
    };
    String.prototype.isEmpty = function() {
      return this.length === 0 || !this.trim();
    };
    String.isNullOrEmpty = function(str) {
      return (str == null) || str.isEmpty();
    };
    String.any = function(str) {
      return !String.isNullOrEmpty(str);
    };
    String.prototype.replaceAll = function(search, replacement) {
      var target;
      target = this;
      return target.split(search).join(replacement);
    };
    // * Sprite Extension
    //------------------------------------------------------------------------------
    Sprite.prototype.moveToCenter = function(dx = 0, dy = 0) {
      return this.move(-this.bitmap.width / 2 + dx, -this.bitmap.height / 2 + dy);
    };
    Sprite.prototype.setStaticAnchor = function(floatX = 1, floatY = 1) {
      this.x -= Math.round(this.width * floatX);
      this.y -= Math.round(this.height * floatY);
    };
    Sprite.prototype.moveToParentCenter = function() {
      if (!this.parent) {
        return;
      }
      return this.move(this.parent.width / 2, this.parent.height / 2);
    };
    ___Sprite_alias_Move_KDCORE_2 = Sprite.prototype.move;
    Sprite.prototype.move = function(x, y) {
      if (x instanceof Array) {
        return ___Sprite_alias_Move_KDCORE_2.call(this, x[0], x[1]);
      } else if (x instanceof KDCore.Point || ((x != null ? x.x : void 0) != null)) {
        return ___Sprite_alias_Move_KDCORE_2.call(this, x.x, x.y);
      } else if ((x != null) && (x._x != null)) {
        return ___Sprite_alias_Move_KDCORE_2.call(this, x._x, x._y);
      } else {
        return ___Sprite_alias_Move_KDCORE_2.call(this, x, y);
      }
    };
    Sprite.prototype.isContainsPoint = function(point) {
      var rect, rx, ry;
      if (this.width === 0 || this.height === 0) {
        return false;
      }
      rx = KDCore.SDK.toGlobalCoord(this, 'x');
      ry = KDCore.SDK.toGlobalCoord(this, 'y');
      rect = this._getProperFullRect(rx, ry);
      return rect.contains(point.x, point.y);
    };
    // * Возвращает Rect с учётом Scale и Anchor спрайта
    Sprite.prototype._getProperFullRect = function(rx, ry) {
      var height, width, x, y;
      width = this.width * Math.abs(this.scale.x);
      height = this.height * Math.abs(this.scale.y);
      x = rx - this.anchor.x * width;
      y = ry - this.anchor.y * height;
      if (this.anchor.x === 0 && this.scale.x < 0) {
        x += this.width * this.scale.x;
      }
      if (this.anchor.y === 0 && this.scale.y < 0) {
        y += this.height * this.scale.y;
      }
      return new PIXI.Rectangle(x, y, width, height);
    };
    Sprite.prototype.fillAll = function(color) {
      if (color != null) {
        return this.bitmap.fillAll(color);
      } else {
        return this.fillAll(KDCore.Color.WHITE);
      }
    };
    Sprite.prototype.removeFromParent = function() {
      if (this.parent != null) {
        return this.parent.removeChild(this);
      }
    };
    // * Bitmap Extension
    //------------------------------------------------------------------------------
    __alias_Bitmap_fillAll = Bitmap.prototype.fillAll;
    Bitmap.prototype.fillAll = function(color) {
      if (color instanceof KDCore.Color) {
        return this.fillRect(0, 0, this.width, this.height, color.CSS);
      } else {
        return __alias_Bitmap_fillAll.call(this, color);
      }
    };
    __alias_Bitmap_blt_kdCore = Bitmap.prototype.blt;
    Bitmap.prototype.blt = function(source, sx, sy, sw, sh, dx, dy, dw, dh) {
      if (this._needModBltDWH > 0) {
        dh = dw = this._needModBltDWH;
        __alias_Bitmap_blt_kdCore.call(this, source, sx, sy, sw, sh, dx, dy, dw, dh);
        this._needModBltDWH = null;
      } else {
        __alias_Bitmap_blt_kdCore.call(this, ...arguments);
      }
    };
    Bitmap.prototype.drawIcon = function(x, y, icon, size = 32) {
      var bitmap;
      bitmap = null;
      if (icon instanceof Bitmap) {
        bitmap = icon;
      } else {
        bitmap = BitmapSrc.LoadFromIconIndex(icon).bitmap;
      }
      return this.drawOnMe(bitmap, x, y, size, size);
    };
    Bitmap.prototype.drawOnMe = function(bitmap, x = 0, y = 0, sw = 0, sh = 0) {
      if (sw <= 0) {
        sw = bitmap.width;
      }
      if (sh <= 0) {
        sh = bitmap.height;
      }
      this.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, sw, sh);
    };
    Bitmap.prototype.drawInMe = function(bitmap) {
      return Bitmap.prototype.drawOnMe(bitmap, 0, 0, this.width, this.height);
    };
    Bitmap.prototype.drawTextFull = function(text, position = 'center') {
      return this.drawText(text, 0, 0, this.width, this.height, position);
    };
    // * Input Extension
    //------------------------------------------------------------------------------
    Input.KeyMapperPKD = {};
//Numbers
    for (i = l = 48; l <= 57; i = ++l) {
      Input.KeyMapperPKD[i] = String.fromCharCode(i);
    }
//Letters Upper
    for (i = m = 65; m <= 90; i = ++m) {
      Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
    }
//Letters Lower (for key code events)
    for (i = o = 97; o <= 122; i = ++o) {
      Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
    }
    (function() {
      var _input_onKeyDown, _input_onKeyUp;
      
      //@[ALIAS]
      _input_onKeyDown = Input._onKeyDown;
      Input._onKeyDown = function(event) {
        _input_onKeyDown.call(this, event);
        if (Input.keyMapper[event.keyCode]) {
          return;
        }
        Input._setStateWithMapperPKD(event.keyCode);
      };
      //@[ALIAS]
      _input_onKeyUp = Input._onKeyUp;
      Input._onKeyUp = function(event) {
        _input_onKeyUp.call(this, event);
        if (Input.keyMapper[event.keyCode]) {
          return;
        }
        Input._setStateWithMapperPKD(event.keyCode, false);
      };
      //?NEW
      Input._setStateWithMapperPKD = function(keyCode, state = true) {
        var symbol;
        symbol = Input.KeyMapperPKD[keyCode];
        if (symbol != null) {
          return this._currentState[symbol] = state;
        }
      };
      //?NEW
      Input.isCancel = function() {
        return Input.isTriggered('cancel') || TouchInput.isCancelled();
      };
      //?NEW
      TouchInput.toPoint = function() {
        return new KDCore.Point(TouchInput.x, TouchInput.y);
      };
    })();
    (function() {      // * Input Extension: KDGamepad
      //------------------------------------------------------------------------------
      // * Поддержка расширенного управления через геймпад (свой модуль)
      var ALIAS___updateGamepadState, _;
      //@[DEFINES]
      _ = Input;
      // * Активировать работу модуля KDGamepad
      _.activateExtendedKDGamepad = function() {
        return _._kdIsGamepadExtended = true;
      };
      //@[ALIAS]
      ALIAS___updateGamepadState = _._updateGamepadState;
      _._updateGamepadState = function(gamepad) {
        if (Input._kdIsGamepadExtended === true) {
          KDGamepad.update();
        }
        if ((typeof $gameTemp !== "undefined" && $gameTemp !== null ? $gameTemp.__kdgpStopDefaultGamepad : void 0) === true) {
          return;
        }
        // * Режим перемещения без DPad
        // * В оригинале игрок также ходит по DPad клавишам, что может быть не удобно
        // * например при работе с инвентарём
        if (KDGamepad.isNoDPadMoving()) {
          if (KDGamepad.isDPadAny()) {
            Input.clear();
            return;
          }
        }
        ALIAS___updateGamepadState.call(this, gamepad);
      };
      window.KDGamepad = function() {
        return new Error("This is static class");
      };
      window.addEventListener("gamepadconnected", function(event) {
        var e;
        try {
          return KDGamepad.refresh();
        } catch (error1) {
          // * Можно напрямую
          //unless KDGamepad.isExists()
          //    if event.gamepad? and event.gamepad.mapping == 'standard'
          //        KDGamepad.init(event.gamepad)
          e = error1;
          KDCore.warning(e);
          return KDGamepad.stop();
        }
      });
      window.addEventListener("gamepaddisconnected", function(event) {
        var e;
        if (!KDGamepad.isExists()) {
          return;
        }
        try {
          if ((event.gamepad != null) && event.gamepad === KDGamepad.gamepad) {
            return KDGamepad.stop();
          }
        } catch (error1) {
          e = error1;
          KDCore.warning(e);
          return KDGamepad.stop();
        }
      });
      KDGamepad.stopDefaultGamepad = function() {
        $gameTemp.__kdgpStopDefaultGamepad = true;
      };
      KDGamepad.resumeDefaultGamepad = function() {
        $gameTemp.__kdgpStopDefaultGamepad = null;
      };
      // * Ссылка на геймпад
      KDGamepad.gamepad = null;
      // * Подключён ли Gamepad ?
      KDGamepad.isExists = function() {
        return KDGamepad.gamepad != null;
      };
      // * Инициализация состояния кнопок
      // * Этот метод вызывается автоматически из Refresh или при подключении Gamepad
      KDGamepad.init = function(gamepad) {
        KDGamepad.gamepad = gamepad;
        this._isActive = true;
        this.buttonNames = [
          'A', // 0
          'B', // 1
          'X', // 2
          'Y', // 3
          'LB', // 4
          'RB', // 5
          'LTrigger', // 6
          'RTrigger', // 7
          'Back', // 8
          'Start', // 9
          'LStick', // 10
          'RStick', // 11
          'dUp', // 12
          'dDown', // 13
          'dLeft', // 14
          'dRight' // 15
        ];
        this.reset();
      };
      // * Аналог Input.clear
      KDGamepad.clear = function() {
        return KDGamepad.reset();
      };
      // * Сбросить состояние кнопок
      KDGamepad.reset = function() {
        this.leftStick = {
          x: 0,
          y: 0
        };
        this.rightStick = {
          x: 0,
          y: 0
        };
        this.buttons = {};
        this.buttonsPressed = {};
        this.prevButtons = {};
      };
      
      // * Остановить учёт геймпада
      KDGamepad.stop = function() {
        KDGamepad.reset();
        KDGamepad.gamepad = null;
      };
      // * Функция проверки что нажата кнопка на геймпаде
      KDGamepad._buttonPressed = function(gamepad, index) {
        var b, e;
        try {
          if (!gamepad || !gamepad.buttons || index >= gamepad.buttons.length) {
            return false;
          }
          b = gamepad.buttons[index];
          if (b == null) {
            return false;
          }
          if (typeof b === 'object') {
            // * Можно упростить
            return b.pressed;
          }
          return b === 1.0;
        } catch (error1) {
          e = error1;
          KDCore.warning(e);
          return false;
        }
      };
      // * Каждый кадр (обновление состояний)
      KDGamepad.update = function() {
        var e, gp, isDown, len, name, q, ref;
        if (!KDGamepad.isActive()) {
          return;
        }
        KDGamepad.refresh();
        if (!KDGamepad.isExists()) {
          return;
        }
        try {
          gp = KDGamepad.gamepad;
          ref = this.buttonNames;
          // * Проверка состояний кнопок
          for (i = q = 0, len = ref.length; q < len; i = ++q) {
            name = ref[i];
            this.buttons[name] = false;
            isDown = KDGamepad._buttonPressed(gp, i);
            if (isDown === true) {
              this.prevButtons[name] = true;
            } else {
              // * Срабатываение только при нажал - отпустил
              if (this.prevButtons[name] === true) {
                this.buttons[name] = true;
                this.prevButtons[name] = false;
              }
            }
          }
          // * Проверка стиков
          this.leftStick.x = gp.axes[0];
          this.leftStick.y = gp.axes[1];
          this.rightStick.x = gp.axes[2];
          this.rightStick.y = gp.axes[3];
        } catch (error1) {
          e = error1;
          KDCore.warning(e);
          KDGamepad.stop();
        }
      };
      // * Обновить и проверить состояние Gamepad
      // * Надо каждый раз это вызывать
      KDGamepad.refresh = function() {
        var e, gamepads, gp, isGamepadRefreshed, q, ref;
        try {
          isGamepadRefreshed = false;
          if (navigator.getGamepads) {
            gamepads = navigator.getGamepads();
          } else if (navigator.webkitGetGamepads) {
            gamepads = navigator.webkitGetGamepads();
          }
          if (gamepads != null) {
            for (i = q = 0, ref = gamepads.length; (0 <= ref ? q < ref : q > ref); i = 0 <= ref ? ++q : --q) {
              gp = gamepads[i];
              if ((gp != null) && gp.mapping === 'standard') {
                isGamepadRefreshed = true;
                if (KDGamepad.buttonNames != null) {
                  KDGamepad.gamepad = gp;
                } else {
                  KDGamepad.init(gp);
                }
                break;
              }
            }
          }
          if (!isGamepadRefreshed) {
            // * Если не был найден не один gamepad - отключаем систему
            KDGamepad.stop();
          }
        } catch (error1) {
          e = error1;
          KDCore.warning(e);
          KDGamepad.stop();
        }
      };
      // * Любое нажатие кнопки
      KDGamepad.isKeyAny = function(name) {
        return KDGamepad.isKey(name) || KDGamepad.isKeyPressed(name);
      };
      // * Нажата ли кнопка (trigger нажал - отпустил)
      KDGamepad.isKey = function(name) {
        if (!KDGamepad.isExists()) {
          return false;
        }
        if (this.buttons == null) {
          return false;
        }
        return this.buttons[name] === true;
      };
      // * Нажата ли кнопка (continues зажата)
      KDGamepad.isKeyPressed = function(name) {
        if (!KDGamepad.isExists()) {
          return false;
        }
        if (this.buttons == null) {
          return false;
        }
        return this.prevButtons[name] === true;
      };
      KDGamepad.isDPadAny = function() {
        return KDGamepad.isKeyAny("dLeft") || KDGamepad.isKeyAny("dRight") || KDGamepad.isKeyAny("dUp") || KDGamepad.isKeyAny("dDown");
      };
      KDGamepad.isActive = function() {
        return this._isActive === true;
      };
      // * Временно отключить обработку KDGamepad
      KDGamepad.setActive = function(_isActive) {
        this._isActive = _isActive;
        if (KDGamepad.isActive()) {
          KDGamepad.refresh();
        } else {
          KDGamepad.stop();
        }
      };
      // * Отключить перемещение игрока на DPad
      KDGamepad.setNoDPadMovingMode = function(_noDpadMoving) {
        this._noDpadMoving = _noDpadMoving;
      };
      return KDGamepad.isNoDPadMoving = function() {
        return this._noDpadMoving === true;
      };
    })();
    // * Window_Base Extension
    //------------------------------------------------------------------------------
    Window_Base.prototype.drawFaceWithCustomSize = function(faceName, faceIndex, x, y, finalSize) {
      this.contents._needModBltDWH = finalSize;
      this.drawFace(faceName, faceIndex, x, y);
    };
    // * SDK
    //------------------------------------------------------------------------------
    SDK = function() {
      throw new Error('This is a static class');
    };
    SDK.rand = function(min, max) {
      return Math.round(Math.random() * (max - min)) + min;
    };
    SDK.setConstantToObject = function(object, constantName, constantValue) {
      object[constantName] = constantValue;
      if (typeof object[constantName] === 'object') {
        Object.freeze(object[constantName]);
      }
      Object.defineProperty(object, constantName, {
        writable: false
      });
    };
    SDK.convertBitmapToBase64Data = function(bitmap) {
      return bitmap._canvas.toDataURL('image/png');
    };
    SDK.times = function(times, method) {
      var results;
      i = 0;
      results = [];
      while (i < times) {
        method(i);
        results.push(i++);
      }
      return results;
    };
    SDK.toGlobalCoord = function(layer, coordSymbol = 'x') {
      var node, t;
      t = layer[coordSymbol];
      node = layer;
      while (node) {
        t -= node[coordSymbol];
        node = node.parent;
      }
      return (t * -1) + layer[coordSymbol];
    };
    SDK.canvasToLocalX = function(layer, x) {
      while (layer) {
        x -= layer.x;
        layer = layer.parent;
      }
      return x;
    };
    SDK.canvasToLocalY = function(layer, y) {
      while (layer) {
        y -= layer.y;
        layer = layer.parent;
      }
      return y;
    };
    SDK.isInt = function(n) {
      return Number(n) === n && n % 1 === 0;
    };
    SDK.isFloat = function(n) {
      return Number(n) === n && n % 1 !== 0;
    };
    SDK.checkSwitch = function(switchValue) {
      if (switchValue === 'A' || switchValue === 'B' || switchValue === 'C' || switchValue === 'D') {
        return true;
      }
      return false;
    };
    SDK.toNumber = function(string, none = 0) {
      var number;
      if (string == null) {
        return none;
      }
      number = Number(string);
      if (isNaN(number)) {
        return none;
      }
      return number;
    };
    // * Color
    //------------------------------------------------------------------------------
    Color = class Color {
      constructor(r1 = 255, g1 = 255, b1 = 255, a1 = 255) {
        this.r = r1;
        this.g = g1;
        this.b = b1;
        this.a = a1;
      }

      getLightestColor(lightLevel) {
        var bf, newColor, p;
        bf = 0.3 * this.R + 0.59 * this.G + 0.11 * this.B;
        p = 0;
        newColor = [0, 0, 0, 0];
        if (bf - lightLevel >= 0) {
          if (bf >= 0) {
            p = Math.abs(bf - lightLevel) / lightLevel;
          }
          newColor = this.ARR.map(function(c) {
            return c - (p * c);
          });
        } else {
          if (bf >= 0) {
            p = (lightLevel - bf) / (255 - bf);
          }
          newColor = this.ARR.map(function(c) {
            return [(255 - c) * p + c, 255].min();
          });
        }
        return new Color(newColor[0], newColor[1], newColor[2], newColor[3]);
      }

      clone() {
        return this.reAlpha(this.a);
      }

      reAlpha(newAlpha) {
        return new Color(this.r, this.g, this.b, newAlpha || 255);
      }

      static AddConstantColor(name, color) {
        color.toHex();
        color.toArray();
        color.toCSS();
        SDK.setConstantToObject(Color, name, color);
      }

      toHex() {
        var b, g, r;
        if (this._colorHex != null) {
          return this._colorHex;
        }
        r = Math.floor(this.r).toString(16).padZero(2);
        g = Math.floor(this.g).toString(16).padZero(2);
        b = Math.floor(this.b).toString(16).padZero(2);
        return this._colorHex = '#' + r + g + b;
      }

      toArray() {
        if (this._colorArray != null) {
          return this._colorArray;
        }
        return this._colorArray = [this.r, this.g, this.b, this.a];
      }

      toCSS() {
        var na, nb, ng, nr;
        if (this._colorCss != null) {
          return this._colorCss;
        }
        nr = Math.round(this.r);
        ng = Math.round(this.g);
        nb = Math.round(this.b);
        na = this.a / 255;
        return this._colorCss = `rgba(${nr},${ng},${nb},${na})`;
      }

      toNumber() {
        return Number(this.toHex().replace("#", "0x"));
      }

      static Random() {
        var a, b, c;
        a = SDK.rand(1, 254);
        b = SDK.rand(1, 254);
        c = SDK.rand(1, 254);
        return new Color(a, b, c, 255);
      }

      static FromHex(hexString) {
        var color, result;
        result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
        color = null;
        if (result != null) {
          color = {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          };
        }
        if (color != null) {
          return new Color(color.r, color.g, color.b, 255);
        } else {
          return Color.NONE;
        }
      }

    };
    Object.defineProperties(Color.prototype, {
      R: {
        get: function() {
          return this.r;
        },
        configurable: true
      },
      G: {
        get: function() {
          return this.g;
        },
        configurable: true
      },
      B: {
        get: function() {
          return this.b;
        },
        configurable: true
      },
      A: {
        get: function() {
          return this.a;
        },
        configurable: true
      },
      ARR: {
        get: function() {
          return this.toArray();
        },
        configurable: true
      },
      CSS: {
        get: function() {
          return this.toCSS();
        },
        configurable: true
      },
      HEX: {
        get: function() {
          return this.toHex();
        },
        configurable: true
      },
      OX: {
        get: function() {
          return this.toNumber();
        },
        configurable: true
      }
    });
    Color.AddConstantColor('NONE', new Color(0, 0, 0, 0));
    Color.AddConstantColor('BLACK', new Color(0, 0, 0, 255));
    Color.AddConstantColor('WHITE', new Color(255, 255, 255, 255));
    Color.AddConstantColor('RED', new Color(255, 0, 0, 255));
    Color.AddConstantColor('GREEN', new Color(0, 255, 0, 255));
    Color.AddConstantColor('BLUE', new Color(0, 0, 255, 255));
    Color.AddConstantColor('AQUA', new Color(128, 255, 255, 255));
    Color.AddConstantColor('MAGENTA', new Color(128, 0, 128, 255));
    Color.AddConstantColor('YELLOW', new Color(255, 255, 0, 255));
    Color.AddConstantColor('ORANGE', new Color(255, 128, 0, 255));
    BitmapSrc = (function() {
      
        //BitmapSrc
      //------------------------------------------------------------------------------
      class BitmapSrc {
        constructor() {
          this.bitmap = null;
        }

        static LoadFromIconIndex(iconIndex) {
          var bs, icon_bitmap, iconset, ph, pw, sx, sy;
          bs = new BitmapSrc();
          if (BitmapSrc.CACHE[iconIndex] == null) {
            iconset = ImageManager.loadSystem('IconSet');
            if (KDCore.isMV()) {
              pw = Window_Base._iconWidth;
              ph = Window_Base._iconHeight;
            } else {
              pw = ImageManager.iconWidth;
              ph = ImageManager.iconHeight;
            }
            sx = iconIndex % 16 * pw;
            sy = Math.floor(iconIndex / 16) * ph;
            icon_bitmap = new Bitmap(pw, ph);
            icon_bitmap.addLoadListener(function() {
              icon_bitmap.blt(iconset, sx, sy, pw, ph, 0, 0);
            });
            BitmapSrc.CACHE[iconIndex] = icon_bitmap;
          }
          bs.bitmap = BitmapSrc.CACHE[iconIndex];
          return bs;
        }

        static LoadFromImageFolder(filename) {
          var bs;
          bs = new BitmapSrc();
          bs.bitmap = ImageManager.loadPicture(filename);
          return bs;
        }

        static LoadFromBase64(data, name) {
          var bs;
          bs = new BitmapSrc();
          if (name != null) {
            if (BitmapSrc.CACHE[name] != null) {
              bs.bitmap = BitmapSrc.CACHE[name];
            } else {
              BitmapSrc.CACHE[name] = Bitmap.load(data);
              bs.bitmap = BitmapSrc.CACHE[name];
            }
          } else {
            bs.bitmap = Bitmap.load(data);
          }
          return bs;
        }

        static LoadFromMemory(symbol) {
          var bs;
          bs = new BitmapSrc();
          if (BitmapSrc.CACHE[symbol] != null) {
            bs.bitmap = BitmapSrc.CACHE[symbol];
          } else {
            bs.bitmap = ImageManager.loadEmptyBitmap();
          }
          return bs;
        }

      };

      BitmapSrc.CACHE = {};

      return BitmapSrc;

    }).call(this);
    // * DevLog
    //------------------------------------------------------------------------------
    __TMP_LOGS__ = [];
    DevLog = class DevLog {
      constructor(prefix = "") {
        this.prefix = prefix;
        this._isShow = typeof DEV !== 'undefined';
        this._color = Color.BLACK;
        this._backColor = Color.WHITE;
        __TMP_LOGS__.push(this);
      }

      on() {
        this._isShow = true;
        return this;
      }

      off() {
        this._isShow = false;
        return this;
      }

      applyRandomColors() {
        this.applyRandomWithoutBackgroundColors();
        this.setBackColor(Color.Random());
        return this;
      }

      applyRandomWithoutBackgroundColors() {
        this.setColor(Color.Random());
        return this;
      }

      setColor(color) {
        this._color = color;
        return this;
      }

      setBackColor(backColor) {
        this._backColor = backColor;
        return this;
      }

      applyLibraryColors() {
        this.setColors(new Color(22, 120, 138, 0), Color.BLACK);
        return this;
      }

      setColors(color, backColor) {
        this.setColor(color);
        this.setBackColor(backColor);
        return this;
      }

      applyExtensionColors() {
        this.setColors(new Color(22, 143, 137, 0), Color.BLACK.getLightestColor(60));
        return this;
      }

      applyWarningColors() {
        this.setColors(Color.ORANGE, Color.BLACK.getLightestColor(100));
        return this;
      }

      p(text) {
        if (!this._isShow) {
          return;
        }
        if (text == null) {
          console.log("");
        }
        this._printText(text);
      }

      _printText(text) {
        text = this.prefix + " : " + text;
        if (this._isUsingColor()) {
          return this._printTextWithColors(text);
        } else {
          return console.log(text);
        }
      }

      _isUsingColor() {
        return this._color !== Color.BLACK || this._backColor !== Color.WHITE;
      }

      _printTextWithColors(text) {
        var args;
        args = ['%c' + text, `color: ${this._color.HEX} ; background: ${this._backColor.HEX};`];
        return window.console.log.apply(console, args);
      }

      static CreateForLib(library) {
        var dlog;
        dlog = new DevLog(library.name);
        dlog.applyLibraryColors();
        return dlog;
      }

      static EnableAllLogs() {
        return __TMP_LOGS__.forEach(function(log) {
          return log.on();
        });
      }

    };
    // * ParametersManager
    //------------------------------------------------------------------------------
    PluginManager.getPluginParametersByRoot = function(rootName) {
      var pluginParameters, property;
      for (property in this._parameters) {
        if (this._parameters.hasOwnProperty(property)) {
          pluginParameters = this._parameters[property];
          if (PluginManager.isPluginParametersContentKey(pluginParameters, rootName)) {
            return pluginParameters;
          }
        }
      }
      return PluginManager.parameters(rootName);
    };
    PluginManager.isPluginParametersContentKey = function(pluginParameters, key) {
      return pluginParameters[key] != null;
    };
    //@[AUTO EXTEND]
    //?[DEPRECATED]
    KDCore.ParametersManager = class ParametersManager {
      constructor(pluginName) {
        this.pluginName = pluginName;
        this._cache = {};
        this._parameters = PluginManager.getPluginParametersByRoot(this.pluginName);
      }

      isLoaded() {
        return (this._parameters != null) && this._parameters.hasOwnProperty(this.pluginName);
      }

      isHasParameter(name) {
        return this._parameters[name] != null;
      }

      getString(name) {
        return this._parameters[name];
      }

      convertField(object, fieldName) {
        var e;
        try {
          object[fieldName] = JSON.parse(object[fieldName] || 'false');
        } catch (error1) {
          e = error1;
          console.error('Error while convert field ' + e.name);
          object[fieldName] = false;
        }
        return object;
      }

      convertImage(object, fieldName) {
        return object[fieldName] = this.loadImage(object[fieldName]);
      }

      loadImage(filename, smooth) {
        var e, path;
        try {
          if (filename) {
            path = filename.split('/');
            filename = path.last();
            path = path.first() + '/';
            return ImageManager.loadBitmap('img/' + path, filename, 0, smooth || true);
          } else {
            return ImageManager.loadEmptyBitmap();
          }
        } catch (error1) {
          e = error1;
          console.error(e);
          return ImageManager.loadEmptyBitmap();
        }
      }

      getFromCacheOrInit(name, func) {
        var object;
        if (!this.isInCache(name)) {
          if (func != null) {
            object = func.call(this);
            this.putInCache(name, object);
          }
        }
        return this.getFromCache(name);
      }

      isInCache(name) {
        return this._cache.hasOwnProperty(name);
      }

      putInCache(name, object) {
        return this._cache[name] = object;
      }

      getFromCache(name) {
        return this._cache[name];
      }

      getNumber(name) {
        var number;
        number = this.getObject(name);
        if (SDK.isInt(number)) {
          return number;
        }
        return 0;
      }

      getObject(name) {
        if (this.isHasParameter(name)) {
          return JSON.parse(this.getString(name) || '{}');
        } else {
          return {};
        }
      }

      getBoolean(name) {
        if (this.isHasParameter(name)) {
          return JSON.parse(this.getString(name) || false);
        } else {
          return false;
        }
      }

      getBooleanFromCacheWithDefault(name, defaultValue) {
        if (this.isHasParameter(name)) {
          return this.getBooleanFromCache(name);
        } else {
          return defaultValue;
        }
      }

      getNumberFromCacheWithDefault(name, defaultValue) {
        if (this.isHasParameter(name)) {
          return this.getNumberFromCache(name);
        } else {
          return defaultValue;
        }
      }

      getStringFromCacheWithDefault(name, defaultValue) {
        if (this.isHasParameter(name)) {
          return this.getStringFromCache(name);
        } else {
          return defaultValue;
        }
      }

      getBooleanFromCache(name) {
        return this.getFromCacheOrInit(name, function() {
          return this.getBoolean(name);
        });
      }

      getNumberFromCache(name) {
        return this.getFromCacheOrInit(name, function() {
          return this.getNumber(name);
        });
      }

      getStringFromCache(name) {
        return this.getFromCacheOrInit(name, function() {
          return this.getString(name);
        });
      }

    };
    // * ParamLoader (ParametersManager alternative)

      //@[AUTO EXTEND]
    KDCore.ParamLoader = class ParamLoader {
      constructor(pluginName) {
        this.pluginName = pluginName;
        this.paramsRaw = PluginManager.getPluginParametersByRoot(this.pluginName);
        this.params = this.parseParameters(this.paramsRaw);
      }

      parseParameters(paramSet) {
        var clearKey, key, params, typeKey, value;
        params = {};
        for (key in paramSet) {
          value = paramSet[key];
          clearKey = this.parseKey(key);
          typeKey = this.parseKeyType(key);
          params[clearKey] = this.parseParamItem(typeKey, value);
        }
        return params;
      }

      parseKey(keyRaw) {
        return keyRaw.split(":")[0];
      }

      parseKeyType(keyRaw) {
        return keyRaw.split(":")[1];
      }

      // * Проверка, загружены ли параметры плагина
      isLoaded() {
        return (this.paramsRaw != null) && this.paramsRaw.hasOwnProperty(this.pluginName);
      }

      // * Имя параметра без ключа
      isHasParameter(paramName) {
        return this.params[paramName] != null;
      }

      
        // * Возвращает значение параметра (def - по умолчанию, если не найден)
      getParam(paramName, def) {
        if (this.isHasParameter(paramName)) {
          return this.params[paramName];
        } else {
          return def;
        }
      }

      // * Данные ключи должны идти после названия параметра через :
      // * Пример: @param ShowDelay:int, @param TestBool:bool
      // * Текстовые параметры, которые надо вернуть как есть, можно без типа (text, file, combo, ...)
      parseParamItem(type, item) {
        var e;
        if (type == null) {
          return item;
        }
        try {
          switch (type) {
            case "int":
            case "i":
              return parseInt(item);
            case "intA": // * массив чисел
              if (String.any(item)) {
                return JsonEx.parse(item).map((e) => {
                  return this.parseParamItem("int", e);
                });
              } else {
                return [];
              }
              break;
            case "bool":
            case "b":
            case "e":
              return eval(item);
            case "struct":
            case "s":
              if (String.any(item)) {
                return this.parseParameters(JsonEx.parse(item));
              } else {
                return null;
              }
              break;
            case "structA": // * массив структур
              return JsonEx.parse(item).map((e) => {
                return this.parseParameters(JsonEx.parse(e));
              });
            case "str":
              return item;
            case "strA":
              if (String.any(item)) {
                return JsonEx.parse(item).map((e) => {
                  return this.parseParamItem("str", e);
                });
              } else {
                return [];
              }
              break;
            case "note": // * если несколько строк в тексте
              return JsonEx.parse(item);
            case "css":
              return item.toCss();
            case "color":
              return KDCore.Color.FromHex(item);
            default:
              return item;
          }
        } catch (error1) {
          e = error1;
          console.warn(e);
          return item;
        }
      }

    };
    Point = (function() {
      // * Point
      //------------------------------------------------------------------------------
      class Point {
        constructor(_x = 0, _y = 0) {
          this._x = _x;
          this._y = _y;
        }

        clone() {
          return new Point(this._x, this._y);
        }

        toString() {
          return "[" + this._x + " ; " + this._y + "]";
        }

        isSame(anotherPoint) {
          return this.x === anotherPoint.x && this.y === anotherPoint.y;
        }

        convertToCanvas() {
          return new Point(Graphics.pageToCanvasX(this._x), Graphics.pageToCanvasY(this._y));
        }

        convertToMap() {
          return new Point($gameMap.canvasToMapX(this._x), $gameMap.canvasToMapY(this._y));
        }

        convertToScreen() {
          return new Point(this.screenX(), this.screenY());
        }

        screenX() {
          var t, tw;
          t = $gameMap.adjustX(this._x);
          tw = $gameMap.tileWidth();
          return Math.round(t * tw + tw / 2);
        }

        screenY() {
          var t, th;
          t = $gameMap.adjustY(this._y);
          th = $gameMap.tileHeight();
          return Math.round(t * th + th);
        }

        round() {
          return new Point(Math.round(this._x), Math.round(this._y));
        }

        floor() {
          return new Point(Math.floor(this._x), Math.floor(this._y));
        }

        mapPointOnScreen() {
          var nx, ny;
          nx = (this._x * $gameMap.tileWidth()) - ($gameMap.displayX() * $gameMap.tileWidth());
          ny = (this._y * $gameMap.tileHeight()) - ($gameMap.displayY() * $gameMap.tileHeight());
          return new Point(nx, ny);
        }

        multiplyBy(val) {
          return new Point(this._x * val, this._y * val);
        }

        simple() {
          return new PIXI.Point(this.x, this.y);
        }

        delta(point) {
          var dx, dy;
          dx = point.x - this._x;
          dy = point.y - this._y;
          return new KDCore.Point(dx, dy);
        }

        static _getEmpty() {
          if (Point._emptyPoint == null) {
            Point._emptyPoint = new Point(0, 0);
          }
          return Point._emptyPoint;
        }

      };

      Object.defineProperties(Point.prototype, {
        x: {
          get: function() {
            return this._x;
          },
          configurable: true
        },
        y: {
          get: function() {
            return this._y;
          },
          configurable: true
        }
      });

      Object.defineProperties(Point, {
        Empty: {
          get: function() {
            return Point._getEmpty();
          },
          configurable: false
        }
      });

      Array.prototype.toPoint = function() {
        return new Point(this[0], this[1]);
      };

      Sprite.prototype.toPoint = function() {
        return new Point(this.x, this.y);
      };

      Game_CharacterBase.prototype.toPoint = function() {
        return new Point(this.x, this.y);
      };

      return Point;

    }).call(this);
    // * Utils
    //------------------------------------------------------------------------------
    KDCore.Utils = KDCore.Utils || {};
    (function() {
      var _;
      _ = KDCore.Utils;
      _.getJDataById = function(id, source) {
        var d, len, q;
        for (q = 0, len = source.length; q < len; q++) {
          d = source[q];
          if (d.id === id) {
            return d;
          }
        }
        return null;
      };
      _.hasMeta = function(symbol, obj) {
        return (obj.meta != null) && (obj.meta[symbol] != null);
      };
      _.getValueFromMeta = function(symbol, obj) {
        if (!_.hasMeta(symbol, obj)) {
          return null;
        }
        return obj.meta[symbol];
      };
      _.getNumberFromMeta = function(symbol, obj) {
        var value;
        if (!_.hasMeta(symbol, obj)) {
          return null;
        }
        if (obj.meta[symbol] === true) {
          return 0;
        } else {
          value = KDCore.SDK.toNumber(obj.meta[symbol], 0);
        }
        return value;
      };
      _.isSceneMap = function() {
        try {
          return SceneManager._scene instanceof Scene_Map;
        } catch (error1) {
          return false;
        }
      };
      _.isSceneBattle = function() {
        try {
          return SceneManager._scene instanceof Scene_Battle;
        } catch (error1) {
          return false;
        }
      };
      _.getEventCommentValue = function(commentCode, list) {
        var comment, e, item;
        try {
          if (list && list.length > 1) {
            i = 0;
            while (i < list.length) {
              item = list[i++];
              if (!item) {
                continue;
              }
              if (item.code === 108) {
                comment = item.parameters[0];
                if (comment.contains(commentCode)) {
                  return comment;
                }
              }
            }
          }
        } catch (error1) {
          e = error1;
          console.warn(e);
        }
        return null;
      };
      _.getEventCommentValueArray = function(commentCode, list) {
        var comment, comments, e, item;
        try {
          comments = [];
          if (list && list.length > 1) {
            i = 0;
            while (i < list.length) {
              item = list[i++];
              if (!item) {
                continue;
              }
              if (item.code === 108) {
                comment = item.parameters[0];
                if (comment.contains(commentCode)) {
                  comments.push(comment);
                }
              }
            }
          }
        } catch (error1) {
          e = error1;
          console.warn(e);
        }
        return comments;
      };
      _.getPositionPointFromJSON = function(jsonSettings) {
        return _.convertPositionPointFromJSON(jsonSettings.position);
      };
      _.convertPositionPointFromJSON = function(position) {
        var e, x, y;
        try {
          x = position[0];
          y = position[1];
          if (!KDCore.SDK.isInt(x)) {
            x = eval(x);
          }
          if (!KDCore.SDK.isInt(y)) {
            y = eval(y);
          }
          return new KDCore.Point(x, y);
        } catch (error1) {
          e = error1;
          console.warn('Utils.getPositionPointFromJSON', e);
          return KDCore.Point.Empty;
        }
      };
      _.jsonPos = function(jsonPosition) {
        return _.convertPositionPointFromJSON(jsonPosition);
      };
      _.jsonPosXY = function(jsonPosition) {
        var e, x, y;
        try {
          ({x, y} = jsonPosition);
          return new KDCore.Point(eval(x), eval(y));
        } catch (error1) {
          e = error1;
          console.warn('Utils.jsonPosXY', e);
          return KDCore.Point.Empty;
        }
      };
      _.getVar = function(id) {
        return $gameVariables.value(id);
      };
      _.setVar = function(id, value) {
        return $gameVariables.setValue(id, value);
      };
      _.addToVar = function(id, value) {
        var prevVal;
        prevVal = _.getVar(id);
        return _.setVar(id, prevVal + value);
      };
      _.playSE = function(seFileName, pitch = 100, volume = 100) {
        var sound;
        if (seFileName == null) {
          return;
        }
        if (seFileName === "") {
          return;
        }
        sound = {
          name: seFileName,
          pan: 0,
          pitch: pitch,
          volume: volume
        };
        AudioManager.playStaticSe(sound);
      };
      _.getItemTypeId = function(item) {
        if (DataManager.isWeapon(item)) {
          return 1;
        } else if (DataManager.isArmor(item)) {
          return 2;
        }
        return 0;
      };
      _.getItemByType = function(itemId, typeId) {
        var data;
        data = [$dataItems, $dataWeapons, $dataArmors];
        return data[typeId][itemId];
      };
      _.loadFont = function(name) {
        if (!KDCore.isMZ()) {
          return;
        }
        if (String.isNullOrEmpty(name)) {
          return;
        }
        if (FontManager._states[name] != null) {
          return;
        }
        FontManager.load(name, name + ".ttf");
      };
      _.convertTimeShort = function(seconds) {
        var e;
        try {
          if (seconds > 59) {
            return Math.floor(seconds / 60) + 'm';
          } else {
            return seconds;
          }
        } catch (error1) {
          e = error1;
          console.warn(e);
          return seconds;
        }
      };
      _.isPointInScreen = function(point, margin = 10) {
        var maxH, maxW, screenMargin, x, y;
        ({x, y} = point);
        maxW = Graphics.width;
        maxH = Graphics.height;
        // * Граница от краёв экрана
        screenMargin = margin;
        if (x < screenMargin) {
          return false;
        }
        if (y < screenMargin) {
          return false;
        }
        if (x > (maxW - screenMargin)) {
          return false;
        }
        if (y > (maxH - screenMargin)) {
          return false;
        }
        return true;
      };
      // * Ассинхронная загрузка изображения, возвращает bitmap, когда загружен
      // * Пример использования loadImageAsync(a, b).then(метод)
      // в метод будет передан bitmap первым аргументом
      _.loadImageAsync = async function(folder, filename) {
        var promise;
        promise = new Promise(function(resolve, reject) {
          var b;
          b = ImageManager.loadBitmap("img/" + folder + "/", filename);
          return b.addLoadListener(function() {
            return resolve(b);
          });
        });
        return (await promise);
      };
    })();
    // * TimedUpdate
    //------------------------------------------------------------------------------
    //@[AUTO EXTEND]
    KDCore.TimedUpdate = class TimedUpdate {
      constructor(interval, method1) {
        this.interval = interval;
        this.method = method1;
        this._timer = 0;
        this._once = false;
      }

      update() {
        if (this.interval == null) {
          return;
        }
        if (this._timer++ >= this.interval) {
          this.call();
          this._timer = 0;
          if (this._once === true) {
            return this.stop();
          }
        }
      }

      once() {
        return this._once = true;
      }

      onUpdate(method1) {
        this.method = method1;
      }

      stop() {
        return this.interval = null;
      }

      isAlive() {
        return this.interval != null;
      }

      // * Рандомизировать интервал @interval (-min, +max)
      applyTimeRange(min, max) {
        var value;
        if (!this.isAlive()) {
          return;
        }
        value = SDK.rand(min, max);
        return this.interval += value;
      }

      call() {
        if (this.method != null) {
          return this.method();
        }
      }

    };
    // * Button (Sprite_XButton)
    //------------------------------------------------------------------------------
    //@[AUTO EXTEND]
    //?DEPRECATED
    KDCore.Button = class Button extends Sprite {
      constructor() {
        super();
        this._mouseIn = false;
        this._touching = false;
        this._slowUpdateActive = false;
        this._localMode = false;
        this._images = [];
        this._checkAlpha = false;
        this._textSprite = null;
        this._textPosition = 0;
        this._override = false; // * TouchClick in game messages not work anymore if TRUE
        this._clickHandlers = [];
        this._manualHided = false;
        this._manualDisabled = false;
        this._condition = null; // * Условие для Visible
        this._condition2 = null; // * Условие для Enable \ Disable
        this._disabled = false;
        this._infoData = null;
        this._isNeedShowText = false;
        return;
      }

      isMouseInButton() {
        return this._mouseIn === true;
      }

      isActive() {
        return this.visible === true;
      }

      activateSlowUpdate() {
        return this._slowUpdateActive = true;
      }

      setLocalMode() {
        this._realX = this.x;
        this._realY = this.y;
        return this._localMode = true;
      }

      setAlphaMode() {
        return this._checkAlpha = true;
      }

      // * above, below
      setTextPosition(position) {
        return this._textPosition = position;
      }

      setHelpText(text, size) {
        return this._createText(text, size);
      }

      setInfoData(data) {
        return this._infoData = data;
      }

      setOverrideMode() {
        return this._override = true;
      }

      isOverride() {
        return this._override === true && this.isActive() && this.touchInButton();
      }

      isDisabled() {
        return this._disabled === true;
      }

      isEnabled() {
        return !this.isDisabled();
      }

      isNeedShowText() {
        return this._isNeedShowText === true;
      }

      addClickHandler(method) {
        return this._clickHandlers.push(method);
      }

      clearClickHandlers() {
        return this._clickHandlers = [];
      }

      isLocalMode() {
        return this._localMode === true;
      }

      setCondition(method) {
        return this._condition = method;
      }

      setConditionForDisable(method) {
        return this._condition2 = method;
      }

      getInfoData() {
        return this._infoData;
      }

      simulateClick() { //?NEW
        return this.applyClickedState();
      }

      simulateClickManual() { //?NEW
        this.simulateClick();
        return setTimeout((() => {
          try {
            return this.applyNormalState();
          } catch (error1) {

          }
        }), 50);
      }

      prepare() { //?NEW
        return this.slowUpdate();
      }

      realX() {
        if (this.isLocalMode()) {
          return this._realX;
        } else {
          return this.x;
        }
      }

      realY() {
        if (this.isLocalMode()) {
          return this._realY;
        } else {
          return this.y;
        }
      }

      show() {
        this.visible = true;
        return this._manualHided = false;
      }

      hide() {
        this.visible = false;
        return this._manualHided = true;
      }

      disable() {
        this._disabled = true;
        this._manualDisabled = true;
        this.refreshEnDisState();
        return this._mouseIn = false;
      }

      enable() {
        this._disabled = false;
        this._manualDisabled = false;
        return this.refreshEnDisState();
      }

      update() {
        super.update();
        if (this._destroyed === true) {
          return;
        }
        this.updateMouseClick();
        this.updatePosition();
        if (!this._slowUpdateActive) {
          this.slowUpdate();
        }
        return this.updateComplexTextVisible();
      }

      slowUpdate() {
        if (this._destroyed === true) {
          return;
        }
        this.updateMouseTracking();
        this.updateConditionForVisible();
        return this.updateConditionForEnabling();
      }

      updateMouseTracking() {
        if (!this.isActive()) {
          return;
        }
        if (this.isDisabled()) {
          return;
        }
        if (this.cursorInButton()) {
          this._onMouseEnter();
          return this._mouseIn = true;
        } else {
          this._onMouseLeave();
          return this._mouseIn = false;
        }
      }

      // * In MZ TouchInput always have X,Y
      cursorInButton() {
        return this.touchInButton();
      }

      xyInButton(x, y) {
        var inRect, rect, rx, ry;
        rx = KDCore.SDK.toGlobalCoord(this, 'x');
        ry = KDCore.SDK.toGlobalCoord(this, 'y');
        rect = new PIXI.Rectangle(rx, ry, this._realWidth(), this._realHeight());
        inRect = rect.contains(x, y);
        if (inRect === true && this._checkAlpha === true) {
          return this._checkAlphaPixel(x - rx, y - ry);
        } else {
          return inRect;
        }
      }

      _realWidth() {
        if (this._hasImage()) {
          return this._mainImage().width;
        } else {
          return this.width;
        }
      }

      _hasImage() {
        return this._mainImage() != null;
      }

      _mainImage() {
        return this._images[0];
      }

      _realHeight() {
        if (this._hasImage()) {
          return this._mainImage().height;
        } else {
          return this.height;
        }
      }

      _checkAlphaPixel(x, y) {
        var pixel;
        pixel = this._hasImage() ? this._mainImage().bitmap.getAlphaPixel(x, y) : this.bitmap.getAlphaPixel(x, y);
        return pixel >= 200;
      }

      _onMouseEnter() {
        if (this._mouseIn === true) {
          return;
        }
        if (!this.isDisabled()) {
          this.applyCoverState();
        }
        this._showText();
        if (this.getInfoData() != null) {
          return this._startComplexTimer();
        }
      }

      _onMouseLeave() {
        if (this._mouseIn === false) {
          return;
        }
        if (!this.isDisabled()) {
          this.applyNormalState();
        }
        this._hideText();
        return this._stopComplexTimer();
      }

      _showText() {
        if (this._textSprite == null) {
          return;
        }
        this._updateTextPosition();
        return this._textSprite.visible = true;
      }

      _hideText() {
        if (this._textSprite == null) {
          return;
        }
        return this._textSprite.visible = false;
      }

      _startComplexTimer() {
        this._stopComplexTimer();
        return this._cTimer = setTimeout((() => {
          if (this._mouseIn === true) {
            return this._isNeedShowText = true;
          }
        }), 1000);
      }

      _stopComplexTimer() {
        if (this._cTimer != null) {
          clearTimeout(this._cTimer);
        }
        return this._isNeedShowText = false;
      }

      updateMouseClick() {
        if (!this.isActive()) {
          this._unTouch();
          return;
        }
        if (this.isDisabled()) {
          return;
        }
        if (TouchInput.isTriggered() && this.touchInButton()) {
          this._touching = true;
          this.applyClickedState();
        }
        if (this._touching === true) {
          if (TouchInput.isReleased() || !this.touchInButton()) {
            this._unTouch();
            if (TouchInput.isReleased()) {
              return this.callClickHandler();
            }
          }
        }
      }

      _unTouch() {
        this._touching = false;
        if (this.touchInButton()) {
          return this.applyCoverState();
        } else {
          return this.applyNormalState();
        }
      }

      touchInButton() {
        return this.xyInButton(TouchInput.x, TouchInput.y);
      }

      callClickHandler() {
        if (this._clickHandlers.length > 0) {
          return this._clickHandlers.forEach(function(method) {
            return method();
          });
        }
      }

      updatePosition() {
        var p;
        if (!this._localMode) {
          return;
        }
        p = new KDCore.Point(this._realX, this._realY);
        return this.move(p.screenX(), p.screenY());
      }

      updateConditionForVisible() {
        var result;
        if (this._condition == null) {
          return;
        }
        if (this._manualHided === true) {
          return;
        }
        try {
          result = this._condition();
          return this.visible = !result;
        } catch (error1) {
          console.warn('wrong condition in button');
          return this.visible = true;
        }
      }

      updateConditionForEnabling() {
        if (!this._condition2) {
          return;
        }
        if (this._manualDisabled === true) {
          return;
        }
        try {
          this._disabled = this._condition2();
          return this.refreshEnDisState();
        } catch (error1) {
          console.warn('wrong condition in button for enable state');
          return this.disable();
        }
      }

      setButtonImages(img1, img2, img3, img4) {
        if (this._images != null) {
          this._images.forEach(function(img) {
            if (img != null) {
              return img.parent.removeChild(img);
            }
          });
        }
        this._images = [new Sprite(img1), img2 != null ? new Sprite(img2) : void 0, img3 != null ? new Sprite(img3) : void 0, img4 != null ? new Sprite(img4) : void 0];
        this._images.forEach((img) => {
          if (img != null) {
            return this.addChild(img);
          }
        });
        return this.applyNormalState();
      }

      applyNormalState() {
        var ref;
        this.refreshImages();
        return (ref = this._images[0]) != null ? ref.visible = true : void 0;
      }

      refreshImages() {
        return this._images.forEach(function(img) {
          return img != null ? img.visible = false : void 0;
        });
      }

      applyCoverState() {
        this.refreshImages();
        if (this._images[1] != null) {
          return this._images[1].visible = true;
        } else {
          return this.applyNormalState();
        }
      }

      applyClickedState() {
        this.refreshImages();
        if (this._images[2] != null) {
          return this._images[2].visible = true;
        } else {
          return this.applyNormalState();
        }
      }

      _createText(text, size) {
        var h, w;
        if (this._textSprite) {
          this.removeChild(this._textSprite);
        }
        w = Math.round(((size / 10) + 1) * 5 * text.length);
        h = size + 4;
        this._textSprite = new Sprite(new Bitmap(w, h));
        this._textSprite.bitmap.fontSize = size;
        this._textSprite.bitmap.drawText(text, 0, h / 2, w, 1, 'center');
        this._textSprite.visible = false;
        return this.addChild(this._textSprite);
      }

      _updateTextPosition() {
        var nx, ny;
        if (!this._textSprite) {
          return;
        }
        nx = this._realWidth() / 2 - this._textSprite.width / 2;
        if (this._textPosition === 0) {
          ny = -this._textSprite.height;
        } else {
          ny = this._realHeight() + this._textSprite.height / 2;
        }
        return this._textSprite.move(nx, ny);
      }

      applyDisableState() {
        var ref;
        this.refreshImages();
        return (ref = this._images[3]) != null ? ref.visible = true : void 0;
      }

      refreshEnDisState() {
        if (this.isDisabled()) {
          this.applyDisableState();
          return this._hideText();
        } else {
          if (this._mouseIn === false) {
            return this.applyNormalState();
          }
        }
      }

      //else
      //    do @applyCoverState
      updateComplexTextVisible() {}

      applyScale(mod) {
        var img, len, q, ref;
        ref = this._images;
        for (q = 0, len = ref.length; q < len; q++) {
          img = ref[q];
          if (img != null) {
            img.scale.x = mod;
            img.scale.y = mod;
          }
        }
      }

      static FromSet(imgName, sourceFolder = null) {
        var button, getterFunc, img0, img1;
        getterFunc = function(filename) {
          return ImageManager.loadPicture(filename);
        };
        if (sourceFolder != null) {
          getterFunc = function(filename) {
            return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
          };
        }
        img0 = getterFunc(imgName + "_00");
        img1 = getterFunc(imgName + "_01");
        button = new KDCore.Button();
        button.setButtonImages(img0, img1, img0, img0);
        return button;
      }

      static FromSetFull(imgName, sourceFolder = null) {
        var button, getterFunc, img0, img1, img2, img3;
        getterFunc = function(filename) {
          return ImageManager.loadPicture(filename);
        };
        if (sourceFolder != null) {
          getterFunc = function(filename) {
            return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
          };
        }
        img0 = getterFunc(imgName + "_00");
        img1 = getterFunc(imgName + "_01");
        img2 = getterFunc(imgName + "_02");
        img3 = getterFunc(imgName + "_03");
        button = new KDCore.Button();
        button.setButtonImages(img0, img1, img2, img3);
        return button;
      }

    };
    KDCore.Sprite = (function(superClass) {
      // * Sprite
      //------------------------------------------------------------------------------
      //@[AUTO EXTEND]
      class Sprite extends superClass {
        constructor() {
          super(...arguments);
        }

        b() {
          return this.bitmap;
        }

        clear() {
          return this.bitmap.clear();
        }

        add(child) {
          return this.addChild(child);
        }

        bNew(w, h) {
          if (h == null) {
            h = w;
          }
          return this.bitmap = new Bitmap(w, h);
        }

        bImg(filename, sourceFolder) {
          var getterFunc;
          getterFunc = function(filename) {
            return ImageManager.loadPicture(filename);
          };
          if (sourceFolder != null) {
            getterFunc = function(filename) {
              return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
            };
          }
          return this.bitmap = getterFunc(filename);
        }

        onReady(method) {
          if (method != null) {
            return this.bitmap.addLoadListener(method);
          }
        }

        drawText() {
          return this.bitmap.drawText(...arguments);
        }

        drawTextFull(text, position = "center") {
          if (this.textSettingsPosition != null) {
            position = this.textSettingsPosition;
          }
          return this.bitmap.drawTextFull(text, position);
        }

        //?DEPRECATED
        drawTextWithSettings(text) {
          this.clear();
          this.drawTextFull(text, this.textSettingsPosition);
        }

        //? x, y, icon, size
        drawIcon() {
          return this.bitmap.drawIcon(...arguments);
        }

        moveByJson(settings) {
          var pos;
          pos = KDCore.Utils.getPositionPointFromJSON(settings);
          return this.move(pos.x, pos.y);
        }

        applyTextSettingsByJson(sprite, settings) {
          this.applyTextSettingsByExtraSettings(sprite, settings.text);
        }

        applyTextSettingsByExtraSettings(sprite, s) {
          sprite.move(s.marginX, s.marginY);
          sprite.b().fontSize = s.fontSize;
          sprite.b().textColor = KDCore.Color.FromHex(s.textColor).CSS;
          sprite.b().outlineWidth = s.outlineWidth;
          if (s.outlineColor != null) {
            sprite.b().outlineColor = KDCore.Color.FromHex(s.outlineColor).CSS;
          }
          if (s.fontFace != null) {
            sprite.b().fontFace = s.fontFace;
          }
          sprite.b().fontItalic = s.fontItalic;
          sprite.visible = s.visible;
        }

        isReady() {
          var q, ref;
          if (this.bitmap != null) {
            if (!this.bitmap.isReady()) {
              return false;
            }
          }
          for (i = q = 0, ref = this.children.length; (0 <= ref ? q < ref : q > ref); i = 0 <= ref ? ++q : --q) {
            if (!this.children[i].bitmap.isReady()) {
              return false;
            }
          }
          return true;
        }

        inPosition(point) {
          return this.isContainsPoint(point);
        }

        isUnderMouse() {
          return this.inPosition(TouchInput);
        }

        // * Из параметров плагина
        applyFontParam(font) {
          var b;
          if (font == null) {
            return;
          }
          b = this.b();
          if (font.size != null) {
            b.fontSize = font.size;
          }
          if (!String.isNullOrEmpty(font.face)) {
            b.fontFace = font.face;
          }
          if (font.italic != null) {
            b.fontItalic = font.italic;
          }
        }

        applyOutlineParam(outline) {
          var b;
          if (outline == null) {
            return;
          }
          b = this.b();
          if (outline.width != null) {
            b.outlineWidth = outline.width;
          }
          if (!String.isNullOrEmpty(outline.color)) {
            b.outlineColor = outline.color;
          }
        }

        static FromImg(filename, sourceFolder) {
          var s;
          s = new KDCore.Sprite();
          s.bImg(filename, sourceFolder);
          return s;
        }

        static FromBitmap(w, h) {
          var s;
          s = new KDCore.Sprite();
          s.bNew(w, h);
          return s;
        }

        static FromTextSettings(settings) {
          var s;
          s = KDCore.Sprite.FromBitmap(settings.textBoxWidth, settings.textBoxHeight);
          s.applyTextSettingsByExtraSettings(s, settings);
          s.textSettingsPosition = settings.position;
          return s;
        }

        // * Загрузчик из параметров плагина (безопасный)
        static FromParams(pluginParams) {
          var e, margins, s, size;
          try {
            size = pluginParams.size;
            s = KDCore.Sprite.FromBitmap(size.w, size.h);
            s.textSettingsPosition = pluginParams.alignment;
            margins = pluginParams.margins;
            if (margins != null) {
              s.move(margins.x, margins.y);
            }
            s.applyFontParam(pluginParams.font);
            s.applyOutlineParam(pluginParams.outline);
            if (!String.isNullOrEmpty(pluginParams.textColor)) {
              s.b().textColor = pluginParams.textColor;
            }
            if (pluginParams.visible != null) {
              s.visible = pluginParams.visible;
            }
            return s;
          } catch (error1) {
            e = error1;
            console.warn('Something wrong with Text Settings!', e);
            return KDCore.Sprite.FromBitmap(60, 30);
          }
        }

      };

      return Sprite;

    }).call(this, Sprite);
    // * Button M
    //------------------------------------------------------------------------------
    //@[AUTO EXTEND]
    // * Button Mini - упрощённый класс Sprite_XButton (KDCore.Button)

      // * Принимает название файла изображения кнопки без _00
    // * Названия изображения должны быть в стандартном формате _00, _01, [_03]
    // * _02 - не используются в этом классе

      // * Класс использует глобальную временную переменную для определения находится ли мышь в зоне кнопки

      // * Если isFull - true, значит нужен _03
    KDCore.ButtonM = class ButtonM extends KDCore.Sprite {
      constructor(filename, isFull = false, sourceFolder = null) {
        super();
        this._bitmaps = [];
        this._disabled = false;
        this._isTriggered = false;
        // * Когда произошло нажатие на кнопку
        this._handler = null;
        this._isCanBeClicked = true;
        this._isManualHoverMode = false;
        this._isManualSelected = false;
        this._loadBitmaps(filename, isFull, sourceFolder);
        this._setImageState(0);
        this._createThread();
      }

      setManualHover() {
        return this._isManualHoverMode = true;
      }

      disableManualHover() {
        return this._isManualHoverMode = false;
      }

      setManualSelected(_isManualSelected) {
        this._isManualSelected = _isManualSelected;
      }

      enableClick() {
        return this._isCanBeClicked = true;
      }

      disableClick() {
        return this._isCanBeClicked = false;
      }

      desaturate() {
        this.filters = [new PIXI.filters.ColorMatrixFilter()];
        this.filters[0].desaturate();
      }

      isMouseIn() {
        if (this._isManualHoverMode === true) {
          return this._isManualSelected;
        } else {
          return this.inPosition(TouchInput);
        }
      }

      isActive() {
        if (this._isCanBeClicked === false) {
          return false;
        }
        if (this.parent != null) {
          return this.parent.visible === true && this.visible === true;
        } else {
          return this.visible === true;
        }
      }

      isDisabled() {
        return this._disabled === true;
      }

      addClickHandler(_handler) {
        this._handler = _handler;
      }

      clearClickHandler() {
        return this._handler = null;
      }

      // * Воспроизводит визуальный эффект нажатия
      simulateClick() {
        if (!this.isActive()) {
          return;
        }
        if (this.isDisabled()) {
          return;
        }
        if (this.isMouseIn()) {
          return;
        }
        this._startSimulation();
      }

      isEnabled() {
        return !this.isDisabled();
      }

      refreshState(isEnable = true) {
        if (isEnable === true) {
          if (this.isDisabled()) {
            this.enable();
          }
        } else {
          if (this.isEnabled()) {
            this.disable();
          }
        }
      }

      disable() {
        this._disabled = true;
        return this._setImageState(2);
      }

      enable() {
        this._disabled = false;
        return this._setImageState(0);
      }

      click() {
        if (this._handler != null) {
          return this._handler();
        }
      }

      update() {
        super.update();
        return this._updateMain();
      }

    };
    (function() {      
      //╒═════════════════════════════════════════════════════════════════════════╛
      // ■ ButtonM Implementation
      //╒═════════════════════════════════════════════════════════════════════════╛
      //---------------------------------------------------------------------------
      var _, alias_SM_isAnyButtonPressed, alias_SM_onMapLoaded;
      //@[DEFINES]
      _ = KDCore.ButtonM.prototype;
      _._loadBitmaps = function(filename, isFull = false, sourceFolder = null) {
        var getterFunc;
        getterFunc = this._getGetter(sourceFolder);
        this._bitmaps.push(getterFunc(filename + '_00'));
        this._bitmaps.push(getterFunc(filename + '_01'));
        if (isFull) {
          this._bitmaps.push(getterFunc(filename + '_03'));
        }
      };
      _._getGetter = function(sourceFolder = null) {
        var getterFunc;
        getterFunc = function(filename) {
          return ImageManager.loadPicture(filename);
        };
        if (sourceFolder !== null) {
          getterFunc = function(filename) {
            return ImageManager.loadBitmap('img/' + sourceFolder + '/', filename);
          };
        }
        return getterFunc;
      };
      _._setImageState = function(index = 0) {
        if (this._bitmaps[index] == null) {
          index = 0;
        }
        this.bitmap = this._bitmaps[index];
        this._lastState = index;
      };
      _._createThread = function() {
        this.hoverThread = new KDCore.TimedUpdate(3, this._updateHover.bind(this));
        this.hoverThread.applyTimeRange(-1, 1);
        this.hoverThread.call();
      };
      //?[DYNAMIC]
      _._updateMain = function() {
        this._updateMouseLogic();
        if (!this.isActive()) {
          if (($gameTemp.kdButtonUnderMouse != null) && $gameTemp.kdButtonUnderMouse === this) {
            return $gameTemp.kdButtonUnderMouse = null;
          }
        }
      };
      _._updateMouseLogic = function() {
        this.hoverThread.update();
        return this._updateMouseClick();
      };
      _._updateHover = function() {
        if (!this.isActive()) {
          return;
        }
        // * чтобы эффект нажатия не прекратить
        if (this._isTriggered === true) {
          return;
        }
        if (this.isMouseIn()) {
          if (this._lastState !== 1) {
            if (!this.isDisabled()) {
              this._setImageState(1);
            }
            $gameTemp.kdButtonUnderMouse = this;
          }
        } else {
          if (this._lastState !== 0) {
            if (!this.isDisabled()) {
              this._setImageState(0);
            }
            if ($gameTemp.kdButtonUnderMouse === this) {
              $gameTemp.kdButtonUnderMouse = null;
            }
          } else if ($gameTemp.kdButtonUnderMouse === this) {
            $gameTemp.kdButtonUnderMouse = null;
          }
        }
      };
      _._updateMouseClick = function() {
        if (!this.isActive()) {
          return;
        }
        if (this.isDisabled()) {
          return;
        }
        if (TouchInput.isTriggered() && this.isMouseIn()) {
          this._isTriggered = true;
          this._setImageState(0);
        }
        if (this._isTriggered === true) {
          if (TouchInput.isReleased()) {
            this._isTriggered = false;
            if (this.isMouseIn()) {
              this.click();
            }
          }
        }
      };
      _._startSimulation = function() {
        this._setImageState(1);
        this._simulateThread = new KDCore.TimedUpdate(10, () => {
          return this._setImageState(0);
        });
        this._simulateThread.once();
        return this._updateMain = this._updateMouseClickSimulated;
      };
      _._updateMouseClickSimulated = function() {
        this._simulateThread.update();
        if (!this._simulateThread.isAlive()) {
          this._simulateThread = null;
          this._updateMain = this._updateMouseLogic;
        }
      };
      // * Теперь при нажатии на любую кнопку, игрок не будет ходить по карте

      //@[ALIAS]
      alias_SM_isAnyButtonPressed = Scene_Map.prototype.isAnyButtonPressed;
      Scene_Map.prototype.isAnyButtonPressed = function() {
        if ($gameTemp.kdButtonUnderMouse != null) {
          return true;
        } else {
          return alias_SM_isAnyButtonPressed.call(this);
        }
      };
      //@[ALIAS]
      alias_SM_onMapLoaded = Scene_Map.prototype.onMapLoaded;
      Scene_Map.prototype.onMapLoaded = function() {
        $gameTemp.kdButtonUnderMouse = null;
        return alias_SM_onMapLoaded.call(this);
      };
    })();
    // ■ END ButtonM Implementation
    //---------------------------------------------------------------------------

      // * Button Mini User - класс с определением файла каждого состояния отдельно
    // * Принимает теже аргументы, только заместо имени файла, три изображения (имени)
    // ? states = { main, hover, disabled }
    KDCore.ButtonMU = class ButtonMU extends KDCore.ButtonM {
      constructor() {
        super(...arguments);
      }

      //$[OVER]
      _loadBitmaps(states, isFull = true, sourceFolder = null) {
        var getterFunc;
        getterFunc = this._getGetter(sourceFolder);
        this._bitmaps.push(getterFunc(states.main));
        this._bitmaps.push(getterFunc(states.hover));
        // * Optional 03
        if (String.any(states.disabled)) {
          this._bitmaps.push(getterFunc(states.disabled));
        }
      }

    };
    
    //@[EXTENSION TO GLOBAL]
    //------------------------------------------------------------------------------
    KDCore.SDK = SDK;
    KDCore.Color = Color;
    KDCore.DevLog = DevLog;
    KDCore.Point = Point;
    KDCore.BitmapSrc = BitmapSrc;
    //? SOME KDCORE METHODS
    //--------------------------------------------------------------------------------
    KDCore.isMV = function() {
      return Utils.RPGMAKER_NAME.contains("MV");
    };
    KDCore.isMZ = function() {
      return !KDCore.isMV();
    };
    KDCore.warning = function(msg, error) {
      if (msg != null) {
        console.warn(msg);
      }
      if (error != null) {
        console.warn(error);
      }
    };
    (function() {      //--------------------------------------------------------------------------------
      // Word Wrapping =================================================================
      //--------------------------------------------------------------------------------
      //?NEW
      Window_Base.prototype.drawTextExWithWordWrap = function(text, x, y, width, maxLines) {
        var maxWidth, wrappedText;
        maxWidth = this.contentsWidth();
        wrappedText = Window_Message.prototype.pWordWrap.call(this, text, width || maxWidth, maxLines);
        this.drawTextEx(wrappedText, x, y);
      };
      //?NEW
      Window_Message.prototype.pWordWrap = function(text, maxWidth, maxLines) {
        var j, line, lines, newLines, q, ref, ref1, result, spaceLeft, spaceWidth, u, wordWidth, wordWidthWithSpace, words;
        lines = text.split('\n');
        maxWidth = maxWidth;
        spaceWidth = this.contents.measureTextWidth(' ');
        result = '';
        newLines = 1;
        for (i = q = 0, ref = lines.length; (0 <= ref ? q < ref : q > ref); i = 0 <= ref ? ++q : --q) {
          spaceLeft = maxWidth;
          line = lines[i];
          words = line.split(' ');
          for (j = u = 0, ref1 = words.length; (0 <= ref1 ? u < ref1 : u > ref1); j = 0 <= ref1 ? ++u : --u) {
            wordWidth = this.contents.measureTextWidth(words[j]);
            wordWidthWithSpace = wordWidth + spaceWidth;
            if (j === 0 || wordWidthWithSpace > spaceLeft) {
              if (j > 0) {
                if (maxLines === newLines) {
                  return result;
                }
                result += '\n';
                newLines++;
              }
              result += words[j];
              spaceLeft = maxWidth - wordWidth;
              if (j === 0 && line.match(/\\n\w*\s*<\s*\\n\[\w*\s*\]\s*>*/gi)) {
                spaceLeft += 200;
              }
            } else {
              spaceLeft -= wordWidthWithSpace;
              result += ' ' + words[j];
            }
          }
          if (i < lines.length - 1) {
            result += '\n';
          }
        }
        return result;
      };
    })();
    //--------------------------------------------------------------------------------
    // MV TouchInput Extension =======================================================
    //--------------------------------------------------------------------------------

    // * Для совместимости MV и MZ
    //TouchInput.getMousePosition = -> new KDCore.Point(TouchInput.x, TouchInput.y)
    TouchInput.toMapPoint = function() {
      return this.toPoint().convertToMap();
    };
    //?SMouse better alternative
    (function() {
      var alias_SM_processMapTouch, alias_TIOMM;
      if (KDCore.isMZ()) {
        return;
      }
      
      // * Для ButtonM
      //@[ALIAS]
      alias_SM_processMapTouch = Scene_Map.prototype.processMapTouch;
      Scene_Map.prototype.processMapTouch = function() {
        if ($gameTemp.kdButtonUnderMouse != null) {

        } else {
          return alias_SM_processMapTouch.call(this);
        }
      };
      //@[ALIAS]
      alias_TIOMM = TouchInput._onMouseMove;
      TouchInput._onMouseMove = function(event) {
        var x, y;
        alias_TIOMM.call(this, event);
        x = Graphics.pageToCanvasX(event.pageX);
        y = Graphics.pageToCanvasY(event.pageY);
        if (Graphics.isInsideCanvas(x, y)) {
          return this._onHover(x, y);
        }
      };
      
      //?NEW, from MZ
      TouchInput._onHover = function(_x, _y) {
        this._x = _x;
        this._y = _y;
      };
    })();
    (function() {      // * VirtualInput для RPG Maker MV
      //$[OVER]
      //TouchInput.getMousePosition = ->
      //    new KDCore.Point(TouchInput._x, TouchInput._y)
      var ALIAS__clear, ALIAS__update, _;
      if (KDCore.isMZ()) {
        return;
      }
      //@[DEFINES]
      _ = Input;
      //@[ALIAS]
      ALIAS__clear = _.clear;
      _.clear = function() {
        ALIAS__clear.call(this);
        return this._virtualButton = null;
      };
      //@[ALIAS]
      ALIAS__update = _.update;
      _.update = function() {
        ALIAS__update.call(this);
        if (this._virtualButton == null) {
          return;
        }
        this._latestButton = this._virtualButton;
        this._pressedTime = 0;
        return this._virtualButton = null;
      };
      _.virtualClick = function(buttonName) {
        return this._virtualButton = buttonName;
      };
    })();
    (function() {      // * Right mouse pressed
      // * Определение когда правая (вторая) кнопка мыши зажата и удерживается
      var ALIAS___onMouseUp, ALIAS___onRightButtonDown, ALIAS__clear, ALIAS__update, _;
      //@[DEFINES]
      _ = TouchInput;
      //@[ALIAS]
      ALIAS__clear = _.clear;
      _.clear = function() {
        ALIAS__clear.call(this);
        this._kdMousePressed2 = false;
        this._kdPressedTime2 = 0;
      };
      //@[ALIAS]
      ALIAS___onRightButtonDown = _._onRightButtonDown;
      _._onRightButtonDown = function(event) {
        var check;
        ALIAS___onRightButtonDown.call(this, event);
        // * Это значит что ALIAS метод прошёл (верные X и Y в Canvas)
        if (KDCore.isMZ()) {
          check = this._newState.cancelled === true;
        } else {
          check = this._events.cancelled === true;
        }
        if (check === true) {
          this._kdMousePressed2 = true;
          this._kdPressedTime2 = 0;
        }
      };
      //@[ALIAS]
      ALIAS___onMouseUp = _._onMouseUp;
      _._onMouseUp = function(event) {
        ALIAS___onMouseUp.call(this, event);
        if (event.button === 2) {
          this._kdMousePressed2 = false;
        }
      };
      //@[ALIAS]
      ALIAS__update = _.update;
      _.update = function() {
        ALIAS__update.call(this);
        if (this.kdIsPressed2()) {
          return this._kdPressedTime2++;
        }
      };
      //?[NEW]
      _.kdIsPressed2 = function() {
        return this._kdMousePressed2 === true;
      };
    })();
    (function() {      //--------------------------------------------------------------------------------
      // MV MZ Methods Extension =======================================================
      //--------------------------------------------------------------------------------
      if (KDCore.isMZ()) {
        return;
      }
      (function() {        //╒═════════════════════════════════════════════════════════════════════════╛
        // ■ Window_Base.coffee
        //╒═════════════════════════════════════════════════════════════════════════╛
        //---------------------------------------------------------------------------
        var ALIAS__initialize, _;
        //@[DEFINES]
        _ = Window_Base.prototype;
        // * Чтоб можно было Rectangle принимать в конструктор
        //@[ALIAS]
        ALIAS__initialize = _.initialize;
        _.initialize = function(x, y, w, h) {
          if (x instanceof PIXI.Rectangle) {
            return ALIAS__initialize.call(this, x.x, x.y, x.width, x.height);
          } else {
            return ALIAS__initialize.call(this, ...arguments);
          }
        };
      })();
      (function() {        // ■ END Window_Base.coffee
        //---------------------------------------------------------------------------

        //╒═════════════════════════════════════════════════════════════════════════╛
        // ■ Spriteset_Map.coffee
        //╒═════════════════════════════════════════════════════════════════════════╛
        //---------------------------------------------------------------------------
        var _;
        
        //@[DEFINES]
        _ = Spriteset_Map.prototype;
        _.findTargetSprite = function(target) {
          return this._characterSprites.find(function(sprite) {
            return sprite.checkCharacter(target);
          });
        };
      })();
      (function() {        // ■ END Spriteset_Map.coffee
        //---------------------------------------------------------------------------

        //╒═════════════════════════════════════════════════════════════════════════╛
        // ■ Sprite_Character.coffee
        //╒═════════════════════════════════════════════════════════════════════════╛
        //---------------------------------------------------------------------------
        var _;
        
        //@[DEFINES]
        _ = Sprite_Character.prototype;
        _.checkCharacter = function(character) {
          return this._character === character;
        };
      })();
    })();
  })();
}

// ■ END KDCore.coffee
//---------------------------------------------------------------------------
//? КОНЕЦ KDCORE
// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//? Взято из Alpha CORE
(function() {})();

(function() {  // * Класс который может плавно изменять какой-либо параметр
  // * Работает в стиле chain методов

  // * ------------------ ПРИМЕР ----------------------------------

  // * Меняем прозрачность 4 раза, туда-сюда, затем выводим done в консоль

  //@changer = new Changer(someSprite)
  //@changer.change('opacity').from(255)
  //            .to(0).step(5).speed(1).delay(30).repeat(4).reverse()
  //            .start().done(() -> console.log('done'))
  //@changer.update()

  // * -------------------------------------------------------------
  var Changer;
  Changer = class Changer {
    constructor(obj) {
      this.obj = obj;
      // * Количество кадров, в которые будет обновление
      this._field = null; // * название поля
      this._speed = 1; // * frames
      this._step = 1; // * шаг изменения значения
      this._from = 0; // * Начальное значение
      this._to = 0; // * Конечное значение
      this._thread = null;
      this._orienation = true; // * Направление + или - step (true = +)
      this._delay = 0; // * Задержка старта
      this._changer = null; // * Ссылка на следующий changer
      this._isRepeat = false; // * Надо ли поторить себя снова
      this._onDoneMethod = null; // * Метод будет выполнен в конце (при завершении)
      this._isPrepared = false; // * Элемента был подготовлен (установлено значение from)
    }

    start() {
      if (this._field == null) {
        return;
      }
      if (this._from === this._to) {
        return;
      }
      if (this._delay > 0) {
        this._delayThread = new KDCore.TimedUpdate(this._delay, this._startThread.bind(this));
        this._delayThread.once();
      } else {
        this._startThread();
      }
      return this;
    }

    isStarted() {
      return (this._thread != null) || (this._delayThread != null);
    }

    from(_from) {
      this._from = _from;
      return this;
    }

    to(_to) {
      this._to = _to;
      return this;
    }

    step(_step) {
      this._step = _step;
      return this;
    }

    speed(_speed) {
      this._speed = _speed;
      return this;
    }

    change(_field) {
      this._field = _field;
      return this;
    }

    // * Снова повторить (не совместим с then)
    // * Если ничего не указать, или <= 0 -> то бескончно
    repeat(_repeatCount = 0) {
      this._repeatCount = _repeatCount;
      if (this._repeatCount <= 0) {
        this._repeatCount = null;
      }
      this._isRepeat = true;
      this._changer = null;
      return this;
    }

    // * Снова повторить, но поменять местами to и from (работает только с repeat >= 2)
    reverse() {
      this._isReverse = true;
      return this;
    }

    isDone() {
      if (!this._isPrepared) {
        // * Чтобы не было выхода пока ждёт Delay
        return false;
      }
      // * Если от 255 до 0 (например)
      if (this._orienation === false) {
        // * То может быть меньше нуля (т.к. @step динамический)
        return this.value() <= this._to;
      } else {
        return this.value() >= this._to;
      }
    }

    value() {
      return this.obj[this._field];
    }

    stop() {
      this._thread = null;
      this._delayThread = null;
      if (this._changer == null) {
        // * Если есть связанный Changer, то не выполняем метод завршения
        return this._callDoneMethod();
      }
    }

    // * При ожидании, значения устанавливаются не сразу
    delay(_delay) {
      this._delay = _delay;
      return this;
    }

    // * Выполнить другой Changer после этого
    // * Не совместим с Repeat
    // * НЕЛЬЗЯ зацикливать, не будет работать
    // * Соединённый не надо обновлять вне, он обновляется в этом
    then(_changer) {
      this._changer = _changer;
      this._isRepeat = false;
      return this;
    }

    // * Этот метод будт выполнене в конце
    done(_onDoneMethod) {
      this._onDoneMethod = _onDoneMethod;
      return this;
    }

    // * Шаг можно выполнить и в ручную
    makeStep() {
      if (!this.isStarted()) {
        this._prepare();
      }
      this._makeStep();
      return this;
    }

    update() {
      var ref;
      if (this.isStarted()) {
        if (this._delay > 0) {
          if ((ref = this._delayThread) != null) {
            ref.update();
          }
        }
        if (this._thread != null) {
          this._updateMainThread();
        }
      } else {
        // * Если хоть раз был запущен
        if (this._isBeenStarted === true) {
          if (this._changer != null) {
            this._updateChainedChanger();
          }
        }
      }
    }

  };
  PKD_FOG.Changer = Changer;
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Changer.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = PKD_FOG.Changer.prototype;
  _._prepare = function() {
    if (this._field == null) {
      return;
    }
    this._orienation = this._from < this._to;
    if (!this._orienation) {
      this._step *= -1;
    }
    // * Устанавливаем начальное значение
    this.obj[this._field] = this._from;
    this._isPrepared = true;
  };
  _._makeStep = function() {
    var value;
    if (this.isDone()) {
      return;
    }
    value = this.value();
    value += this._step;
    this.obj[this._field] = value;
  };
  _._startThread = function() {
    this._prepare();
    if (this.isDone()) {
      return;
    }
    this._thread = new KDCore.TimedUpdate(this._speed, this._makeStep.bind(this));
    return this._isBeenStarted = true;
  };
  _._updateChainedChanger = function() {
    if (this._changer.isStarted()) {
      this._changer.update();
      if (this._changer.isDone()) {
        this._callDoneMethod();
        this._changer.stop();
        return this._changer = null;
      }
    } else {
      return this._changer.start();
    }
  };
  _._restart = function() {
    if (!this._isCanRepeatMore()) {
      return;
    }
    if (this._repeatCount == null) {
      // * Если указано! число повторений, то onDone метод не вызываем
      this._callDoneMethod();
    }
    if (this._isReverse === true) {
      this._swapFromTo();
    }
    this._prepare();
    return this.start();
  };
  _._swapFromTo = function() {
    var t;
    t = this._from;
    this._from = this._to;
    this._to = t;
    // * Инвентируем число step
    this._step *= -1;
  };
  _._callDoneMethod = function() {
    if (this._onDoneMethod != null) {
      return this._onDoneMethod();
    }
  };
  _._isCanRepeatMore = function() {
    if (this._repeatCount == null) {
      return true;
    }
    this._repeatCount--;
    if (this._repeatCount <= 0) {
      this.stop();
      return false;
    }
    return true;
  };
  _._updateMainThread = function() {
    this._thread.update();
    if (this.isDone()) {
      if (this._isRepeat === true) {
        this._restart();
      } else {
        if (this._changer != null) {
          this._updateChainedChanger();
        }
        this.stop();
      }
    }
  };
})();

// ■ END Changer.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//? API вызовы скриптов для пользователей плагина
(function() {
  // * Открыть туман для игрока
  window.FOG_Refresh = function() {
    var e;
    try {
      FOGManager.refreshFogOnMapForPlayer();
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  // * Открыть туман в точке на карте
  window.FOG_OpenInPoint = function(x, y, radius) {
    var e;
    try {
      if (!FOGManager.isFogLayerExists()) {
        return;
      }
      FOGManager.openFogInPoint(x, y, radius);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  
  // * Сбросить туман (пересоздать) (удалить сохранение)
  window.FOG_Reset = function(mapId) {
    var e;
    try {
      if (typeof $gameMap === "undefined" || $gameMap === null) {
        return;
      }
      // * Если текущая карта - создать снова
      if ($gameMap.mapId() === mapId) {
        return FOGManager.reCreateFogOnCurrentMap();
      } else {
        return $gameMap.fClearFogDataForMap(mapId);
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
})();

//Compressed by MV Plugin Builder
(function(){var a0_0x48cf=['defFogSettingsGroup','LoadPluginSettings','fogRegions:intA','find','8jzFnDH','fogRegions','getFogIgnorePairs','getPlayerOpenRadiusVarId','325ppMMOk','_loader','getFogRegions','3803wJzEPd','DhRXV','HmQKL','339329tiJhMi','Color','925TjkyaS','regionId','2297529WazxNQ','393nPnGLw','ParamLoader','76961utyjxk','_prepareDefaultFogSettings','143aBoKpU','BLACK','1YChKVy','543JsjZLp','_defaultFogSettings','getParam','MrGxM','1003188LWoXqr'];function a0_0x1e5a(_0x367074,_0x1d84e9){_0x367074=_0x367074-0x1e7;var _0x48cfc3=a0_0x48cf[_0x367074];return _0x48cfc3;}(function(_0x4c56d0,_0x1657c0){var _0x331df3=a0_0x1e5a;while(!![]){try{var _0x31b8ca=parseInt(_0x331df3(0x1f8))*parseInt(_0x331df3(0x1fb))+parseInt(_0x331df3(0x202))*parseInt(_0x331df3(0x1ff))+parseInt(_0x331df3(0x1e7))+-parseInt(_0x331df3(0x201))*parseInt(_0x331df3(0x1f6))+parseInt(_0x331df3(0x1f0))*parseInt(_0x331df3(0x1f3))+-parseInt(_0x331df3(0x1ec))*-parseInt(_0x331df3(0x1fd))+-parseInt(_0x331df3(0x1fa));if(_0x31b8ca===_0x1657c0)break;else _0x4c56d0['push'](_0x4c56d0['shift']());}catch(_0x5f37a6){_0x4c56d0['push'](_0x4c56d0['shift']());}}}(a0_0x48cf,0xa0edf),function(){var _0x1bc1bd=a0_0x1e5a,_0x157d40;PKD_FOG[_0x1bc1bd(0x1e9)]=function(){var _0x51663a=_0x1bc1bd;PKD_FOG['PP'][_0x51663a(0x1f1)]=new KDCore['ParamLoader']('fogRegions:intA');},_0x157d40=PKD_FOG['PP'],_0x157d40['isResetFogOfWarOnMapChange']=function(){return!![];},_0x157d40[_0x1bc1bd(0x1ef)]=function(){var _0x5bdad4=_0x1bc1bd;return this[_0x5bdad4(0x1f1)][_0x5bdad4(0x204)]('playerRadiusVarId',0x0);},_0x157d40[_0x1bc1bd(0x1f2)]=function(){var _0x3c0588=_0x1bc1bd;if(_0x3c0588(0x1f5)===_0x3c0588(0x1f5))return this[_0x3c0588(0x1f1)][_0x3c0588(0x204)](_0x3c0588(0x1ed),[]);else{function _0x2db5c8(){return null;}}},_0x157d40[_0x1bc1bd(0x1ee)]=function(_0x7d5f73){var _0x25b74d=_0x1bc1bd;if(_0x25b74d(0x1f4)===_0x25b74d(0x1f4)){var _0x27bcd6,_0x37ff0d;return _0x27bcd6=this[_0x25b74d(0x1f1)]['getParam']('fogIgnorePairs',[]),_0x37ff0d=_0x27bcd6[_0x25b74d(0x1eb)](function(_0x7ef2b0){var _0x275484=_0x25b74d;return _0x7ef2b0[_0x275484(0x1f9)]===_0x7d5f73;}),_0x37ff0d!=null?_0x37ff0d['ignoredRegions']:null;}else{function _0x282fbc(){var _0x350dac=_0x25b74d;_0x36c9c1['PP']['_loader']=new _0x1ee588[(_0x350dac(0x1fc))](_0x350dac(0x1ea));}}},_0x157d40['getFogSettingsForRegion']=function(_0x27347a){var _0x2a530f=_0x1bc1bd;return this[_0x2a530f(0x1fe)](),this[_0x2a530f(0x203)];},_0x157d40[_0x1bc1bd(0x1fe)]=function(){var _0x277a5f=_0x1bc1bd;if(this['_defaultFogSettings']!=null){if(_0x277a5f(0x205)===_0x277a5f(0x205))return;else{function _0x53c764(){var _0x6c3492=_0x277a5f;return this['_loader'][_0x6c3492(0x204)]('playerRadiusVarId',0x0);}}}this[_0x277a5f(0x203)]=this[_0x277a5f(0x1f1)][_0x277a5f(0x204)](_0x277a5f(0x1e8),{'fogSettings':{'color':KDCore[_0x277a5f(0x1f7)][_0x277a5f(0x200)],'opacity':0xff},'fogSettingsOuter':{'color':KDCore[_0x277a5f(0x1f7)]['BLACK'],'opacity':0xe6},'halfFadeSettings':{'fadeStep':0x4,'fadeSpeed':0x1},'fullFadeSettings':{'fadeStep':0x6,'fadeSpeed':0x1}});};}());
})();

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__loadDatabase, _;
  //@[DEFINES]
  _ = DataManager;
  // * Загрузка параметров плагина
  //@[ALIAS]
  ALIAS__loadDatabase = _.loadDatabase;
  _.loadDatabase = function() {
    PKD_FOG.LoadPluginSettings();
    ALIAS__loadDatabase.call(this);
  };
})();

// ■ END DataManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Глобальный менеджер управления (создания) тумана на карте

//@[GLOBAL]
window.FOGManager = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ FOGManager.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = FOGManager;
  // * Подходящая карта для тумана? (Есть слой и Note)
  _.isValidMap = function() {
    return $gameMap.isMapWithFogOfWar() && this.isFogLayerExists();
  };
  // * Создан ли туман на данной карте?
  _.isFogLayerExists = function() {
    return this._fgFogLayer != null;
  };
  // * Получить значения радиуса открытия тумана вокруг игрока
  _.getPlayerFogOpenRadius = function() {
    var value;
    value = KDCore.Utils.getVar(PKD_FOG.PP.getPlayerOpenRadiusVarId());
    if (value <= 0) {
      // * Стандартное значение, если переменная не задана
      value = 2;
    }
    return value;
  };
  // * Создать туман на карте (при загрузке карты)
  _.createFogOnMap = function() {
    var storedFogData;
    storedFogData = $gameMap.fGetFogData();
    if (storedFogData != null) {
      this._createFogFromStoredData(storedFogData);
    } else {
      this._createNewFogOnMap();
    }
  };
  // * Пересоздать туман на текущей карте
  _.reCreateFogOnCurrentMap = function() {
    var k, len, ref, spr;
    if (!this.isValidMap()) {
      return;
    }
    // * Удаляем сохранённое состояние
    $gameMap.fClearFogDataForMap($gameMap.mapId());
    ref = this._getAllFragments();
    for (k = 0, len = ref.length; k < len; k++) {
      spr = ref[k];
      // * Удаляем спрайты
      if (spr != null) {
        spr._destroy();
      }
    }
    // * Создаём заного
    this.createFogOnMap();
    // * Обновляем для игрока
    this.refreshFogOnMapForPlayer();
  };
  // * Пересчитать открытие тумана на карте (где находится игрок)
  _.refreshFogOnMapForPlayer = function() {
    if (!this.isFogLayerExists()) {
      return;
    }
    this.openFogInPointForPlayer();
  };
  // * Регион имеет туман?
  _.isRegionWithFog = function(regionId) {
    return PKD_FOG.PP.getFogRegions().contains(regionId);
  };
  
  // * Открыть туман в точке карты в пределах радиуса
  _.openFogInPoint = function(x, y, radius = 3) {
    if (radius <= 0) {
      return;
    }
    // * Полностью открыть туман в радиусе (ifFull = true)
    this._openFogFragmentsFromPoint(x, y, radius, true);
    // * Приоткрыть (на половину) туман в радиусе (isFull = false)
    this._openFogFragmentsFromPoint(x, y, radius + 1, false);
  };
  // * Открыть туман где стоит игрок
  _.openFogInPointForPlayer = function() {
    return this.openFogInPoint($gamePlayer.x, $gamePlayer.y, this.getPlayerFogOpenRadius());
  };
  // * Установить слой (для быстрого прямого доступа)
  _.setupLayer = function(_fgFogLayer) {
    this._fgFogLayer = _fgFogLayer;
  };
  // * Когда загрузилась карта
  _.onMapLoaded = function() {
    if (!this.isValidMap()) {
      return;
    }
    this.createFogOnMap();
    setTimeout((function() {
      var e;
      try {
        return FOGManager.refreshFogOnMapForPlayer();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }), 100);
  };
  // * Когда выходим из сцены карты
  _.onMapStop = function() {
    if (!this.isValidMap()) {
      return;
    }
    this._saveFogForMap();
  };
})();

(function() {  // ■ END FOGManager.coffee
  //---------------------------------------------------------------------------

  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ FOGManager PRIVATE
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = window.FOGManager;
  _._createFogFromStoredData = function(storedFogData) {
    var colorId, e, k, len, opacity, point, regionId, saveFragment, spr;
    if (storedFogData == null) {
      return;
    }
    for (k = 0, len = storedFogData.length; k < len; k++) {
      saveFragment = storedFogData[k];
      if (saveFragment == null) {
        continue;
      }
      try {
        ({point, colorId, opacity, regionId} = saveFragment);
        spr = this._createFogFragment(regionId);
        spr.setScreenPosition(point[0], point[1]);
        if (colorId === 1) {
          spr.setColorOuter();
        }
        spr.opacity = opacity;
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    }
  };
  _._createNewFogOnMap = function() {
    var i, j, k, l, ref, ref1, regionId, spr;
    for (i = k = 0, ref = $gameMap.width(); (0 <= ref ? k < ref : k > ref); i = 0 <= ref ? ++k : --k) {
      for (j = l = 0, ref1 = $gameMap.height(); (0 <= ref1 ? l < ref1 : l > ref1); j = 0 <= ref1 ? ++l : --l) {
        regionId = $gameMap.regionId(i, j);
        if (this.isRegionWithFog(regionId)) {
          spr = this._createFogFragment(regionId);
          spr.setMapPosition(i, j);
        }
      }
    }
    this._createFogOutline();
  };
  // * Создать фрагмент тумана и вернуть спрайт
  _._createFogFragment = function(regionId) {
    var spr;
    spr = new Sprite_FogFragment(regionId);
    this._addFogFragmentToMap(spr);
    return spr;
  };
  _._addFogFragmentToMap = function(spr) {
    return this._fgFogLayer.addChild(spr);
  };
  // * Создать соседние (второй вариант) клетки тумана
  _._createFogOutline = function() {
    var k, len, ref, spr;
    ref = this._getAllFragments();
    for (k = 0, len = ref.length; k < len; k++) {
      spr = ref[k];
      this._createNeibFogOutlinePoints(spr.x, spr.y);
    }
  };
  // * Создать соседние ячейки к данной ячейке (по координатам)
  _._createNeibFogOutlinePoints = function(x, y) {
    var newPoint, regionId, spr;
    spr = this._getFogFragmentInPoint(x, y);
    if (spr == null) {
      return;
    }
    regionId = spr.getRegion();
    // * RIGHT
    newPoint = [x + $gameMap.tileWidth(), y];
    this._createOuterFogFragment(newPoint[0], newPoint[1], regionId);
    // * LEFT
    newPoint = [x - $gameMap.tileWidth(), y];
    this._createOuterFogFragment(newPoint[0], newPoint[1], regionId);
    // * UP
    newPoint = [x, y - $gameMap.tileHeight()];
    this._createOuterFogFragment(newPoint[0], newPoint[1], regionId);
    // * DOWN
    newPoint = [x, y + $gameMap.tileHeight()];
    this._createOuterFogFragment(newPoint[0], newPoint[1], regionId);
  };
  // * Получить спрайт тумана в точке ЭКРАНА
  _._getFogFragmentInPoint = function(x, y) {
    return this._getAllFragments().find(function(spr) {
      return spr.x === x && spr.y === y;
    });
  };
  _._getAllFragments = function() {
    return this._fgFogLayer.children;
  };
  // * Создать внешний фрагмент тумана (сосдений с обычным)
  _._createOuterFogFragment = function(x, y, regionId) {
    var spr;
    if (!this._isCanPlaceOuterFragmentInPoint(x, y)) {
      return;
    }
    // * Тут координаты уже ЭКРАНА
    spr = this._createFogFragment(regionId);
    spr.setScreenPosition(x, y);
    spr.setColorOuter(); // * Внешний
  };
  // * Можно ли в данной точке создать внешний фрагмент (нельзя если тут уже есть туман)
  _._isCanPlaceOuterFragmentInPoint = function(x, y) {
    if (this._isOutOfMap(x, y)) {
      // * Нельзя, если вышел за границы карты
      return false;
    }
    if (this._getFogFragmentInPoint(x, y) != null) {
      // * Нельзя если есть какая-либо ячейка тумана
      return false;
    }
    return true;
  };
  // * Находится ли точка за пределами карты?
  _._isOutOfMap = function(x, y) {
    return x >= ($gameMap.width() * $gameMap.tileWidth()) || y > ($gameMap.height() * $gameMap.tileHeight()) || x < 0 || y < 0;
  };
  // * Сохранить туман для текущей карты
  _._saveFogForMap = function() {
    var storedFogData;
    storedFogData = this._collectFogDataForSave();
    $gameMap.fSaveFogData(storedFogData);
  };
  _._collectFogDataForSave = function() {
    var k, len, ref, saveFragment, spr, storedFogData;
    storedFogData = [];
    ref = this._getAllFragments();
    for (k = 0, len = ref.length; k < len; k++) {
      spr = ref[k];
      if (spr == null) {
        continue;
      }
      if (spr.isFragmentDestroyed()) {
        continue;
      }
      saveFragment = {
        point: [spr.x, spr.y],
        colorId: spr.getColor(),
        opacity: spr.opacity,
        regionId: spr.getRegion()
      };
      storedFogData.push(saveFragment);
    }
    return storedFogData;
  };
  // * Открыть туман в точке
  _._openFogFragmentsFromPoint = function(x, y, radius, isFull) {
    var candiates, ignoredRegions, k, len, spr;
    candiates = this._collectFogFragmentsInRadius(x, y, radius);
    if (candiates.length === 0) {
      return;
    }
    ignoredRegions = this._getIgnoredRegions();
    for (k = 0, len = candiates.length; k < len; k++) {
      spr = candiates[k];
      if (ignoredRegions != null) {
        if (!spr.isProperFragmentToOpen(ignoredRegions)) {
          continue;
        }
      }
      if (spr.isFragmentDestroyed()) {
        continue;
      }
      if (spr.isInFinalFade()) {
        continue;
      }
      if (isFull === true) {
        spr.startFadeToFull();
      } else {
        spr.startFadeToHalf();
      }
    }
  };
  //?nullable
  _._getIgnoredRegions = function() {
    var regionId;
    regionId = $gameMap.fGetRegionUnderPlayer();
    return PKD_FOG.PP.getFogIgnorePairs(regionId);
  };
  _._collectFogFragmentsInRadius = function(x, y, radius) {
    if (radius <= 0) {
      return [];
    }
    return this._getAllFragments().filter(function(spr) {
      return $gameMap.distance(x, y, spr.mx, spr.my) <= radius;
    });
  };
})();

// ■ END FOGManager PRIVATE
//---------------------------------------------------------------------------

//Compressed by MV Plugin Builder
(function(){var a0_0x1cd2=['146386xZcSdU','273714FzNXak','1826987qToLYz','call','_fFogStorage','451322aRePNG','71HXLhpl','9067Nbvnyj','114845lqdTCx','prototype','4yUoTMo','setup','4483cHNsCA','6uJqijd','isResetFogOfWarOnMapChange'];function a0_0x189f(_0x4e7214,_0x52104f){_0x4e7214=_0x4e7214-0x10e;var _0x1cd224=a0_0x1cd2[_0x4e7214];return _0x1cd224;}(function(_0x2a1f9c,_0x5ac723){var _0x401f11=a0_0x189f;while(!![]){try{var _0x14f9cc=-parseInt(_0x401f11(0x10e))+parseInt(_0x401f11(0x10f))*-parseInt(_0x401f11(0x119))+-parseInt(_0x401f11(0x112))+-parseInt(_0x401f11(0x111))*-parseInt(_0x401f11(0x11b))+parseInt(_0x401f11(0x117))*-parseInt(_0x401f11(0x118))+-parseInt(_0x401f11(0x116))+parseInt(_0x401f11(0x113));if(_0x14f9cc===_0x5ac723)break;else _0x2a1f9c['push'](_0x2a1f9c['shift']());}catch(_0x399940){_0x2a1f9c['push'](_0x2a1f9c['shift']());}}}(a0_0x1cd2,0x557e9),function(){var _0x3fb67f=a0_0x189f,_0x3d70f1,_0x157d51;_0x157d51=Game_Map[_0x3fb67f(0x11a)],_0x3d70f1=_0x157d51['setup'],_0x157d51[_0x3fb67f(0x11c)]=function(){var _0x43b826=_0x3fb67f;_0x3d70f1[_0x43b826(0x114)](this,...arguments),PKD_FOG['PP'][_0x43b826(0x110)]()===!![]&&(this[_0x43b826(0x115)]={});};}());
})();

//Compressed by MV Plugin Builder
(function(){var a0_0x7144=['nbfOk','69646gkcDNY','80qDLCih','fSaveFogData','fGetRegionUnderPlayer','isMapWithFogOfWar','2487zDJZZi','prototype','Utils','hasMeta','uLNwn','1BfmNSA','fGetFogData','1vvlsew','regionId','249191itvbrw','135374EYaiIU','_fInitFogStorage','_fFogStorage','521MJQoDb','lJiiq','65580NwFzLp','mapId','ftUzU','qRowc','fClearFogDataForMap','194ssOzWk','397281uHQMuO'];function a0_0x2570(_0x631591,_0x599389){_0x631591=_0x631591-0x11a;var _0x7144=a0_0x7144[_0x631591];return _0x7144;}(function(_0x1af328,_0x26fb3f){var _0x147b92=a0_0x2570;while(!![]){try{var _0x4fcce4=-parseInt(_0x147b92(0x133))*parseInt(_0x147b92(0x11c))+parseInt(_0x147b92(0x12e))*parseInt(_0x147b92(0x12a))+-parseInt(_0x147b92(0x121))+parseInt(_0x147b92(0x127))+parseInt(_0x147b92(0x129))+-parseInt(_0x147b92(0x11b))*parseInt(_0x147b92(0x135))+-parseInt(_0x147b92(0x11f))*-parseInt(_0x147b92(0x126));if(_0x4fcce4===_0x26fb3f)break;else _0x1af328['push'](_0x1af328['shift']());}catch(_0x356cc9){_0x1af328['push'](_0x1af328['shift']());}}}(a0_0x7144,0x4d590),function(){var _0x5b7229=a0_0x2570,_0x4c2fa8;_0x4c2fa8=Game_Map[_0x5b7229(0x12f)],_0x4c2fa8[_0x5b7229(0x12d)]=function(){var _0x24d832=_0x5b7229;if(_0x24d832(0x124)!==_0x24d832(0x124)){function _0x38d794(){var _0x6e8c78=_0x24d832;return this[_0x6e8c78(0x11a)](_0x477970['x'],_0x375b0d['y']);}}else return KDCore[_0x24d832(0x130)][_0x24d832(0x131)]('PFOG',$dataMap);},_0x4c2fa8[_0x5b7229(0x12c)]=function(){var _0x2a4e58=_0x5b7229;return this[_0x2a4e58(0x11a)]($gamePlayer['x'],$gamePlayer['y']);},_0x4c2fa8[_0x5b7229(0x12b)]=function(_0xdaf7ff){var _0x31d379=_0x5b7229;if(_0x31d379(0x128)!==_0x31d379(0x132))this[_0x31d379(0x11d)](),this[_0x31d379(0x11e)][this[_0x31d379(0x122)]()]=_0xdaf7ff;else{function _0x3413c3(){var _0x5dd6aa=_0x31d379;if(this[_0x5dd6aa(0x11e)]==null)return this[_0x5dd6aa(0x11e)]={};}}},_0x4c2fa8[_0x5b7229(0x134)]=function(){var _0x1ca714=_0x5b7229,_0x10bb88;return this['_fInitFogStorage'](),_0x10bb88=this[_0x1ca714(0x11e)][this[_0x1ca714(0x122)]()],_0x10bb88;},_0x4c2fa8[_0x5b7229(0x125)]=function(_0x3fc2c4){var _0x55c5e0=_0x5b7229;this[_0x55c5e0(0x11d)](),this['_fFogStorage'][_0x3fc2c4]=null,delete this[_0x55c5e0(0x11e)][_0x3fc2c4];},_0x4c2fa8['_fInitFogStorage']=function(){var _0x4f0c4b=_0x5b7229;if('CjSuf'===_0x4f0c4b(0x123)){function _0x17e2bc(){var _0x26ec5a=_0x4f0c4b,_0x4d47b9;return this[_0x26ec5a(0x11d)](),_0x4d47b9=this[_0x26ec5a(0x11e)][this[_0x26ec5a(0x122)]()],_0x4d47b9;}}else{if(this[_0x4f0c4b(0x11e)]==null){if(_0x4f0c4b(0x120)===_0x4f0c4b(0x120))return this[_0x4f0c4b(0x11e)]={};else{function _0x32b5ca(){var _0x24ba65=_0x4f0c4b;this[_0x24ba65(0x11d)](),this[_0x24ba65(0x11e)][_0x19434e]=null,delete this[_0x24ba65(0x11e)][_0x725860];}}}}};}());
})();

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__locate, ALIAS__moveDiagonally, ALIAS__moveStraight, ALIAS__refrsh, _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  //@[ALIAS]
  ALIAS__refrsh = _.refrsh;
  _.refrsh = function() {
    ALIAS__refrsh.call(this);
    FOGManager.refreshFogOnMapForPlayer();
  };
  //@[ALIAS]
  ALIAS__moveStraight = _.moveStraight;
  _.moveStraight = function() {
    ALIAS__moveStraight.call(this, ...arguments);
    FOGManager.refreshFogOnMapForPlayer();
  };
  
  //@[ALIAS]
  ALIAS__moveDiagonally = _.moveDiagonally;
  _.moveDiagonally = function() {
    ALIAS__moveDiagonally.call(this, ...arguments);
    FOGManager.refreshFogOnMapForPlayer();
  };
  //@[ALIAS]
  ALIAS__locate = _.locate;
  _.locate = function() {
    ALIAS__locate.call(this, ...arguments);
    FOGManager.refreshFogOnMapForPlayer();
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__onMapLoaded, ALIAS__stop, _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //@[ALIAS]
  ALIAS__onMapLoaded = _.onMapLoaded;
  _.onMapLoaded = function() {
    ALIAS__onMapLoaded.call(this);
    if (Imported.VisuMZ_0_CoreEngine) {
      // * VisuMZ не сохраняет Bitmap
      PKD_FOG.CACHE = {};
    }
    FOGManager.onMapLoaded();
  };
  
  //@[ALIAS]
  ALIAS__stop = _.stop;
  _.stop = function() {
    ALIAS__stop.call(this);
    FOGManager.onMapStop();
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------

//Compressed by MV Plugin Builder
(function(){var a0_0x20fa=['338027IBzCDB','_getFogSettings','Sprite_FogFragment','CACHE','startFadeToHalf','bJlvY','_regionId','4flOgGO','fillAll','1893101SadfhH','from','SakaV','step','getRegion','setColorOuter','round','done','_changer','fogSettingsOuter','1055798lZuhPW','Changer','__isFinalFade','_createBitmapFor','tileHeight','748770Hpswbs','change','color','fullFadeSettings','__isDestroed','390029gGbOjZ','2DJyxlx','opacity','bitmap','_createChanger','isInFinalFade','1WZYuwd','1083606ZMkpFD','setScreenPosition','_colorId','params','getColor','_destroy','speed','HEX','update','_initValues','fogSettings','removeChild','start','halfFadeSettings','_initBitmap','714887aCyuok','tileWidth','isFragmentDestroyed'];var a0_0x21505a=a0_0x39d7;function a0_0x39d7(_0xa71b42,_0x1602e1){_0xa71b42=_0xa71b42-0x1df;var _0x20fa9e=a0_0x20fa[_0xa71b42];return _0x20fa9e;}(function(_0x45fab5,_0x220ed3){var _0x12d59b=a0_0x39d7;while(!![]){try{var _0x2c4ef4=-parseInt(_0x12d59b(0x1f5))+-parseInt(_0x12d59b(0x204))+parseInt(_0x12d59b(0x1e4))+-parseInt(_0x12d59b(0x1e9))+-parseInt(_0x12d59b(0x207))*-parseInt(_0x12d59b(0x20e))+parseInt(_0x12d59b(0x1ef))*-parseInt(_0x12d59b(0x1ee))+parseInt(_0x12d59b(0x210))*parseInt(_0x12d59b(0x1f4));if(_0x2c4ef4===_0x220ed3)break;else _0x45fab5['push'](_0x45fab5['shift']());}catch(_0x384e3d){_0x45fab5['push'](_0x45fab5['shift']());}}}(a0_0x20fa,0xedb76));var Sprite_FogFragment;Sprite_FogFragment=class Sprite_FogFragment extends Sprite{constructor(_0x4950f1){var _0x4f2310=a0_0x39d7;super(),this[_0x4f2310(0x20d)]=_0x4950f1,this[_0x4f2310(0x1fe)]();return;}[a0_0x21505a(0x206)](){var _0x311bbd=a0_0x21505a;return this[_0x311bbd(0x1ed)]===!![];}[a0_0x21505a(0x1f3)](){return this['__isFinalFade']===!![];}[a0_0x21505a(0x214)](){return this['_regionId'];}[a0_0x21505a(0x1f9)](){var _0x143eb6=a0_0x21505a;return this[_0x143eb6(0x1f7)];}['setMapPosition'](_0x1f925c,_0x565eac){var _0x2fccac=a0_0x21505a;return this['mx']=_0x1f925c,this['my']=_0x565eac,this[_0x2fccac(0x1f6)](_0x1f925c*$gameMap[_0x2fccac(0x205)](),_0x565eac*$gameMap['tileHeight']());}[a0_0x21505a(0x1f6)](_0x41616e,_0x3361bc){var _0x522126=a0_0x21505a;return this['mx']=_0x41616e/$gameMap[_0x522126(0x205)](),this['my']=_0x3361bc/$gameMap[_0x522126(0x1e8)](),this['move'](_0x41616e,_0x3361bc);}['setColorFull'](){var _0x391e54=a0_0x21505a;this[_0x391e54(0x1f7)]=0x0,this[_0x391e54(0x203)]();}[a0_0x21505a(0x1df)](){var _0x3c1d62=a0_0x21505a;this[_0x3c1d62(0x1f7)]=0x1,this[_0x3c1d62(0x203)]();}['isProperFragmentToOpen'](_0x46a398){var _0x1e9ebb=a0_0x21505a;if(_0x46a398==null){if('eopQw'==='xdvhh'){function _0x127892(){var _0x4f1685=a0_0x39d7;return this['mx']=_0x39251a/_0x1b93f3[_0x4f1685(0x205)](),this['my']=_0x5794da/_0x54cc7f[_0x4f1685(0x1e8)](),this['move'](_0x3fd458,_0x5a3077);}}else return!![];}return _0x46a398['indexOf'](this[_0x1e9ebb(0x214)]())<0x0;}[a0_0x21505a(0x20b)](){var _0x559b66=a0_0x21505a,_0x528ef3,_0x2d8afc;({fadeStep:_0x2d8afc,fadeSpeed:_0x528ef3}=this[_0x559b66(0x1f8)][_0x559b66(0x202)],this['_createChanger'](Math[_0x559b66(0x1e0)](this[_0x559b66(0x1f0)]/0x2),_0x2d8afc,_0x528ef3));}['startFadeToFull'](){var _0x5bb02b=a0_0x21505a,_0x44e60a,_0x1cc11f;if(this[_0x5bb02b(0x1f3)]())return;({fadeStep:_0x1cc11f,fadeSpeed:_0x44e60a}=this[_0x5bb02b(0x1f8)][_0x5bb02b(0x1ec)],this[_0x5bb02b(0x1f2)](0x0,_0x1cc11f,_0x44e60a),this['_changer'][_0x5bb02b(0x1e1)](()=>{var _0xee062d=_0x5bb02b;return this[_0xee062d(0x1fa)]();}),this[_0x5bb02b(0x1e6)]=!![]);}[a0_0x21505a(0x1fd)](){var _0x439bff=a0_0x21505a,_0x5692d1;super[_0x439bff(0x1fd)]();if(this[_0x439bff(0x206)]())return;if((_0x5692d1=this[_0x439bff(0x1e2)])!=null){if(_0x439bff(0x212)!==_0x439bff(0x212)){function _0x31d455(){var _0x40755d=_0x439bff;this[_0x40755d(0x1e2)]=new _0x1b5bde[(_0x40755d(0x1e5))](this),this[_0x40755d(0x1e2)]['change']('opacity')['from'](this[_0x40755d(0x1f0)])['to'](_0x9892b)[_0x40755d(0x213)](_0x335196)[_0x40755d(0x1fb)](_0x1cd8c7)[_0x40755d(0x201)]();}}else _0x5692d1[_0x439bff(0x1fd)]();}}[a0_0x21505a(0x1fe)](){var _0x892cfc=a0_0x21505a;this[_0x892cfc(0x1f8)]=this['_getFogSettings'](),this[_0x892cfc(0x1ed)]=![],this[_0x892cfc(0x1e6)]=![],this['setColorFull']();}[a0_0x21505a(0x203)](){var _0x3d8aac=a0_0x21505a,_0x5f3db0,_0x2d3e4c;this[_0x3d8aac(0x1f7)]===0x0?_0x2d3e4c=this['params'][_0x3d8aac(0x1ff)]:_0x2d3e4c=this['params'][_0x3d8aac(0x1e3)];_0x5f3db0=_0x2d3e4c[_0x3d8aac(0x1eb)][_0x3d8aac(0x1fc)];if(PKD_FOG[_0x3d8aac(0x20a)][_0x5f3db0]==null){if(_0x3d8aac(0x20c)!==_0x3d8aac(0x20c)){function _0x7a28f3(){var _0x58e76b=_0x3d8aac;_0x383055=this['params'][_0x58e76b(0x1ff)];}}else PKD_FOG['CACHE'][_0x5f3db0]=this[_0x3d8aac(0x1e7)](_0x2d3e4c[_0x3d8aac(0x1eb)]);}this[_0x3d8aac(0x1f1)]=PKD_FOG[_0x3d8aac(0x20a)][_0x5f3db0],this[_0x3d8aac(0x1f0)]=_0x2d3e4c[_0x3d8aac(0x1f0)];}[a0_0x21505a(0x208)](){var _0x4236f5=a0_0x21505a;return PKD_FOG['PP']['getFogSettingsForRegion'](this[_0x4236f5(0x20d)]);}[a0_0x21505a(0x1e7)](_0xcb525){var _0x5d2007=a0_0x21505a,_0x8172b3;return _0x8172b3=new Bitmap($gameMap['tileHeight'](),$gameMap[_0x5d2007(0x205)]()),_0x8172b3[_0x5d2007(0x20f)](_0xcb525),_0x8172b3;}[a0_0x21505a(0x1f2)](_0x297c3e,_0x299b7c,_0x2d45bd){var _0x41dc8a=a0_0x21505a;this[_0x41dc8a(0x1e2)]=new PKD_FOG[(_0x41dc8a(0x1e5))](this),this['_changer'][_0x41dc8a(0x1ea)](_0x41dc8a(0x1f0))[_0x41dc8a(0x211)](this[_0x41dc8a(0x1f0)])['to'](_0x297c3e)[_0x41dc8a(0x213)](_0x299b7c)[_0x41dc8a(0x1fb)](_0x2d45bd)['start']();}[a0_0x21505a(0x1fa)](){var _0x2b240d=a0_0x21505a,_0x3823b7;this[_0x2b240d(0x1ed)]=!![],this['visible']=![],(_0x3823b7=this['parent'])!=null&&_0x3823b7[_0x2b240d(0x200)](this),this[_0x2b240d(0x1f1)]=null;}},window[a0_0x21505a(0x209)]=Sprite_FogFragment;
})();

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createUpperLayer, ALIAS__update, _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  //@[ALIAS]
  ALIAS__createUpperLayer = _.createUpperLayer;
  _.createUpperLayer = function() {
    this._fCreateFogLayer();
    return ALIAS__createUpperLayer.call(this);
  };
  
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    this._fUpdateFogLayer();
  };
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  _.fAddFog = function(sprite) {
    var ref;
    return (ref = this._fgFogLayer) != null ? ref.addChild(sprite) : void 0;
  };
  _._fCreateFogLayer = function() {
    // * Сбрасываем слой
    FOGManager.setupLayer(null);
    if (!$gameMap.isMapWithFogOfWar()) {
      return;
    }
    this._fgFogLayer = new Sprite();
    this.__fgTW = $gameMap.tileWidth();
    this.__fgTW2 = this.__fgTW / 2;
    this.__fgTH = $gameMap.tileHeight();
    this.addChild(this._fgFogLayer);
    // * Даём ссылку на данный слой
    FOGManager.setupLayer(this._fgFogLayer);
  };
  _._fUpdateFogLayer = function() {
    var screenX, screenY;
    if (this._fgFogLayer == null) {
      return;
    }
    screenX = Math.round($gameMap.adjustX(-0.5) * this.__fgTW + this.__fgTW2);
    screenY = Math.round($gameMap.adjustY(-1) * this.__fgTH + this.__fgTH);
    this._fgFogLayer.move(screenX, screenY);
  };
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------

//Plugin PKD_FogOfWar automatic build by PKD PluginBuilder 1.9.2 21.10.2021
