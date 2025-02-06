/*
 * Copyright (c) 2023 Vladimir Skrypnikov (Pheonix KageDesu)
 * <http://kdworkshop.net/>
 *

 * License: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial

 */

/*:
 * @plugindesc (v.1.0)[BASIC] Skills Tree System
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url https://kdworkshop.net/plugins/simple-skills-tree
 *
 * @help
 * ===========================================================================
 * !!! Initial setup:
 *
 *  Add <pSkillPointsVarId:X> to Actor's Note and setup variable ID
 *       where game will store actor's skill points
 *  By default Skill points used for open (learn) skills
 *  (but you can set skill cost 0 skill points)
 *
 * Recommended remove all skills in classes Learnable Skills table in Database
 *
 * Example: <pSkillPointsVarId:120>
 *
 * ---------------------------------------------------------------------------
 * Script calls:
 *
 * OpenSkillTreeEditor(); - open skills tree editor for edit skills trees for classes
 *  !WARNING! This Script call works only in Playtest mode and require mouse
 *  !Game player not have access to skills tree editor!
 *
 *  OpenSkillTreeForActor(actorId); - open skills tree for Actor ID
 *      This script call for game player, for manage their skills in game
 *
 * ---------------------------------------------------------------------------
 * How change visuals:
 *
 * 1 - Edit Plugin Parameters
 * 2 - Edit .json files in data\PKD_SimpleSkillsTree\ folder (BUT NOT IN Generated folder!)
 * 3 - Edit images in img\pSimpleSkillsTree\
 *
 * ---------------------------------------------------------------------------
 * Extra info:
 *
 * Put your skills preview images to img\pSimpleSkillsTree\preview\ folder
 * Put your skills animated preview (.webm) to movies\ folder (required VPlayer plugin)
 *
 * How rename Skills Tree category for class:
 * 
 * Add <pSTCatName_X:CATEGORY_NAME> to Class Note section
 *
 * Where X - index, 0 - it's default first category name (by default used class name)
 * Next indexes - it's added categories names
 *
 * Example: <pSTCatName_0:Furry>
 * Example: <pSTCatName_1:Defense>
 * ---------------------------------------------------------------------------

 * This is BASIC plugin version and have some restrictions:
 *    - No updates with new features and content
 *    - Max 2 categories in Skill Tree per class
 *    - Max 14 skills in Skill Tree per category
 *    - Obfuscated code
 *    - Plugin usage allowed only in Non-Commercial project
 * 
 *  PRO version of plugin don't have this restrictions!
 
 * ---------------------------------------------------------------------------
 * If you like my Plugins, want more and offten updates,
 * please support me on Boosty or Patreon!
 * 
 * Boosty Page:
 *      https://boosty.to/kagedesu
 * Patreon Page:
 *      https://www.patreon.com/KageDesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * You can use this plugin in your game thanks to all who supports me!
 * 

 * License: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial

 *
 * 
 * @param PKD_SimpleSkillsTree
 * 
 * @param visualsGroup
 * @parent PKD_SimpleSkillsTree
 * @text Visual
 * 
 * @param mainSceneSettings:j
 * @parent visualsGroup
 * @type note
 * @text Main Scene Settings
 * @desc Settings, in [param name]:[value] format. You can change values after :
 * @default "\"appearWithAnimation\": true\n\"closeButtonPosition\": { \"x\": 772, \"y\": 3 }"
 * 
 * @param skilInfoWindowSettings:j
 * @parent visualsGroup
 * @type note
 * @text Info Window Settings
 * @desc Settings, in [param name]:[value] format. You can change values after :
 * @default "\"reqColorNotPass\": \"#f02b1d\"\n\"reqColorPass\": \"#25e84c\"\n\"previewImgPosition\": { \"x\": 406, \"y\": 402 }\n\"statusTextPosition\": { \"x\": 576, \"y\": 142 }"
 * 
 * @param skillsTreeGridSettings:j
 * @parent visualsGroup
 * @type note
 * @text Skills Tree Settings
 * @desc Settings, in [param name]:[value] format. You can change values after :
 * @default "\"startX\": 70\n\"startY\": 120\n\"spaceForCell\": 64\n\"rows\": 7\n\"cols\": 4"
 * 
 * @param optionsGroup
 * @parent PKD_SimpleSkillsTree
 * @text Configuration
 * 
 * @param isShowCmdInMainMenu:b
 * @parent optionsGroup
 * @text Add button to MM?
 * @type boolean
 * @desc Are add button for open skills tree in main menu?
 * @default true
 * 
 * @param cmdTitle
 * @parent isShowCmdInMainMenu:b
 * @text Button Title
 * @default Skills Tree
 * 
 * @param skillPointsPerLevelUpGain:i
 * @parent optionsGroup
 * @text SP gain per 1 Level
 * @type number
 * @min 0
 * @desc How many skills points character get per 1 level up? 0 - nothing
 * @default 1
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
 */
/*:ru
 * @plugindesc (v.1.0)[BASIC] Дерево навыков
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url https://kdworkshop.net/plugins/simple-skills-tree
 *
 * @help
 * ===========================================================================
 * !!! Начальная настройка:
 *
 *  Добавьте <pSkillPointsVarId:X> к заметке персонажа и установите
    номер переменной в которой игра будет хранить очки навыков персонажа

    По умолчанию очки навыков используются для открытия (выучивания) навыков
    (но вы можете установить стоимость навыка в 0 очков навыков)

    Рекомендуется удалить все навыки для класса в таблице Learnable Skills в Базе данных
 *
 * Пример: <pSkillPointsVarId:120>
 *
 * ---------------------------------------------------------------------------
 * Вызовы скриптов:
 *
 * OpenSkillTreeEditor(); - откройте редактор дерева навыков для редактирования деревьев навыков для классов

    !ВНИМАНИЕ! Этот скрипт работает только в режиме тестирования и требует мыши
    !Игроку (в режиме игры) нет доступа к редактору дерева навыков!

 * OpenSkillTreeForActor(actorId); - откройте дерево навыков для ID персонажа
    Этот вызов скрипта для игрока (в режиме игры), для изучения навыков в игре
 *
 * ---------------------------------------------------------------------------
 * Как изменить внешний вид:
 *
 * 1 - Отредактировать параметры плагина
 * 2 - Отредактировать .json файлы в папке data\PKD_SimpleSkillsTree\ (НО НЕ В папаке Generated!)
 * 3 - Отредактировать изображения в папке img\pSimpleSkillsTree\
 *
 * ---------------------------------------------------------------------------
 * Дополнительная информация:
 *
 * Изображения для предпросмотра навыка поместите в папку img\pSimpleSkillsTree\preview\
 * Анимации (.webm) в папку movies\ folder (требуется плагин VPlayer)
 *
 * Как изменить название категории (ветки) в дереве навыков:
 * 
 * Добавьте <pSTCatName_X:ИМЯ> в заметку для класса
 *
 * Где X - индекс, 0 - это индекс первой категории (по умолчанию она имеет имя класса)
 * Следующие индексы - это уже будут имена для добавленных категорий
 *
 * Пример: <pSTCatName_0:Ярость>
 * Пример: <pSTCatName_1:Навыки>
 * ---------------------------------------------------------------------------

 * Это [BASIC] (базовая) версия плагина и имеет некоторые ограничения:
 *    - Нет обновлений плагина с новым контентом и функциями
 *    - Макс. 2 категории навыков для каждого класса
 *    - Макс. 14 навыков для изучения в одной категории
 *    - Обфусцированный код
 *    - ЗАПРЕЩЕНО использовать плагин в коммерческих проектах
 * 
 *  [PRO] версия плагина не имеет данных ограничений!
 
 * ---------------------------------------------------------------------------
 * Если Вам нравятся мои плагины, поддержите меня на Boosty!
 * 
 * Boosty:
 *      https://boosty.to/kagedesu
 * Patreon:
 *      https://www.patreon.com/KageDesu
 * YouTube:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 *

 * Лицензия: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial

 *
 * 
 * @param PKD_SimpleSkillsTree
 * 
 * @param visualsGroup
 * @parent PKD_SimpleSkillsTree
 * @text Внешний вид
 * 
 * @param mainSceneSettings:j
 * @parent visualsGroup
 * @type note
 * @text Main Scene Settings
 * @desc Главное окно. Настройки в формате [имя параметра]:[значение]. Только значение после : можно менять
 * @default "\"appearWithAnimation\": true\n\"closeButtonPosition\": { \"x\": 772, \"y\": 3 }"
 * 
 * @param skilInfoWindowSettings:j
 * @parent visualsGroup
 * @type note
 * @text Info Window Settings
 * @desc Окно информации. Настройки в формате [имя параметра]:[значение]. Только значение после : можно менять
 * @default "\"reqColorNotPass\": \"#f02b1d\"\n\"reqColorPass\": \"#25e84c\"\n\"previewImgPosition\": { \"x\": 406, \"y\": 402 }\n\"statusTextPosition\": { \"x\": 576, \"y\": 142 }"
 * 
 * @param skillsTreeGridSettings:j
 * @parent visualsGroup
 * @type note
 * @text Skills Tree Settings
 * @desc Дерево навыков. Настройки в формате [имя параметра]:[значение]. Только значение после : можно менять
 * @default "\"startX\": 70\n\"startY\": 120\n\"spaceForCell\": 64\n\"rows\": 7\n\"cols\": 4"
 * 
 * @param optionsGroup
 * @parent PKD_SimpleSkillsTree
 * @text Настройки
 * 
 * @param isShowCmdInMainMenu:b
 * @parent optionsGroup
 * @text Add button to MM?
 * @type boolean
 * @desc Добавить кнопку для открытия дерева навыков в главное меню?
 * @default true
 * 
 * @param cmdTitle
 * @parent isShowCmdInMainMenu:b
 * @text Текст кнопки
 * @default Skills Tree
 * 
 * @param skillPointsPerLevelUpGain:i
 * @parent optionsGroup
 * @text SP gain per 1 Level
 * @type number
 * @min 0
 * @desc Как много SP получить персонаж при получении 1 уровня. 0 - ничего.
 * @default 1
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
 */



var Imported = Imported || {};
Imported.PKD_SimpleSkillsTree = true;

var PKD_SimpleSkillsTree = {};
PKD_SimpleSkillsTree.Version = 100;

//?VERSION
PKD_SimpleSkillsTree.isPro = function() { return false; };

PKD_SimpleSkillsTree.PP = {};
PKD_SimpleSkillsTree.Utils = {};

// * Загрзука параметров
PKD_SimpleSkillsTree.LoadPluginSettings = () => {
    PKD_SimpleSkillsTree.PP._loader = new KDCore.ParamLoader('PKD_SimpleSkillsTree');
};

//Supported Note's tags: pSkillPointsVarId (actor), pSTCatName_X (class)

// * ДЛЯ ОБНОВЛЕНИЙ
//%[I] Каждая категория дерева навыков может иметь также свою заднюю картинку, задаём через Note персонажа
//%[I] Возможность "сбросить" ветку навыков чтобы переделать снова (в игре)
//%[I] Возможность "очистить" ветку навыков (в редакторе)
//%[I] Больше параметров у классов вынести в Параметры плагина
//%[I] Эффект подсветки (glow effect) доступных или активированных (см. Alpha ABS)
//%[I] Доработать и добавить <pImgForST:name> (skill notetag)
//%[I] Добавить системную кнопку для открытия редактора (типо F9)



/*
# ==========================================================================
# ==========================================================================
#
#   EMBEDDED PHEONIX KAGEDESU PLUGINS CORE LIBRARY
#   (This plugin may not use the entire code of this library)
#
# ==========================================================================
# ==========================================================================
 * 
 * 
 */



// Generated by CoffeeScript 2.6.1
// ==========================================================================
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ KDCore.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
// * LIBRARY WITH MZ AND MZ SUPPORT
//! {OUTER FILE}

//?rev 03.06.23
var KDCore;

window.Imported = window.Imported || {};

Imported.KDCore = true;

KDCore = KDCore || {};

// * Двузначные числа нельзя в версии, сравнение идёт по первой цифре поулчается (3.43 - нельзя, можно 3.4.3)
//%[МЕНЯТЬ ПРИ ИЗМЕНЕНИИ]
KDCore._fileVersion = '3.2.7';

// * Методы и библиотеки данной версии
KDCore._loader = 'loader_' + KDCore._fileVersion;

KDCore[KDCore._loader] = [];

// * Добавить библиотеку на загрузку
KDCore.registerLibraryToLoad = function(lib) {
  return KDCore[KDCore._loader].push(lib);
};

if ((KDCore.Version != null) && KDCore.Version >= KDCore._fileVersion) {
  // * ПРОПУСКАЕМ ЗАГРУЗКУ, так как уже загруженна более новая
  console.log('XDev KDCore ' + KDCore._fileVersion + ' skipped by new or exists version');
  KDCore._requireLoadLibrary = false;
} else {
  KDCore.Version = KDCore._fileVersion;
  KDCore.LIBS = KDCore.LIBS || {};
  KDCore.register = function(library) {
    return this.LIBS[library.name] = library;
  };
  window.KDCore = KDCore;
  // * ТРЕБУЕТСЯ ЗАГРУЗКА БИБЛИОТЕК
  KDCore._requireLoadLibrary = true;
}


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
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
    return this[KDCore.SDK.rand(0, this.length - 1)];
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
      k = KDCore.SDK.rand(0, n + 1);
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
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  Object.defineProperty(Array.prototype, "delete", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "max", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "min", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "sample", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "first", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "last", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "shuffle", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "count", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "isEmpty", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "getById", {
    enumerable: false
  });
  return Object.defineProperty(Array.prototype, "getByField", {
    enumerable: false
  });
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  Number.prototype.do = function(method) {
    return KDCore.SDK.times(this, method);
  };
  Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
  };
  return Number.prototype.any = function(number) {
    return (number != null) && number > 0;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
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
    if (str != null) {
      return str.toString().isEmpty();
    } else {
      return true;
    }
  };
  String.any = function(str) {
    return !String.isNullOrEmpty(str);
  };
  return String.prototype.replaceAll = function(search, replacement) {
    var target;
    target = this;
    return target.split(search).join(replacement);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
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
  KDCore.makeid = function(length) {
    var characters, charactersLength, i, result;
    result = '';
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    charactersLength = characters.length;
    i = 0;
    while (i < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      i++;
    }
    return result;
  };
  return KDCore.makeId = function() {
    return KDCore.makeid(...arguments);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var SDK;
  //?[DEPRECATED]
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
    var i, results;
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
  SDK.isString = function(value) {
    return typeof value === "string";
  };
  SDK.isArray = function(value) {
    return Array.isArray(value);
  };
  //@[EXTEND]
  return KDCore.SDK = SDK;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var __alias_Bitmap_blt_kdCore, __alias_Bitmap_fillAll_kdCore;
  //@[ALIAS]
  __alias_Bitmap_fillAll_kdCore = Bitmap.prototype.fillAll;
  Bitmap.prototype.fillAll = function(color) {
    if (color instanceof KDCore.Color) {
      return this.fillRect(0, 0, this.width, this.height, color.CSS);
    } else {
      return __alias_Bitmap_fillAll_kdCore.call(this, color);
    }
  };
  //@[ALIAS]
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
  Bitmap.prototype.drawIcon = function(x, y, icon, size = 32, noSmoth = false) {
    var bitmap;
    bitmap = null;
    if (icon instanceof Bitmap) {
      bitmap = icon;
    } else {
      bitmap = KDCore.BitmapSrc.LoadFromIconIndex(icon).bitmap;
    }
    this._context.imageSmoothingEnabled = !noSmoth;
    this.drawOnMe(bitmap, x, y, size, size);
    this._context.imageSmoothingEnabled = true;
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
  return Bitmap.prototype.drawTextFull = function(text, position = 'center') {
    return this.drawText(text, 0, 0, this.width, this.height, position);
  };
});


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_CharacterBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_CharacterBase.prototype;
  // * Нахожусь ли Я в точке по диагонале (рядом), относительно char
  _.kdInDiagonalPointRelativeTo = function(char) {
    var e, x, y;
    try {
      if (char == null) {
        return false;
      }
      ({x, y} = char);
      if (x === this.x - 1 && ((y === this.y - 1) || (y === this.y + 1))) {
        return true; // * left up or down
      }
      if (x === this.x + 1 && (y === this.y - 1 || y === this.y + 1)) {
        return true; // * right up or down
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return false;
  };
})();

// ■ END Game_CharacterBase.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * В MZ нету данной функции, а она часто используется в моих плагинах
  if (!KDCore.isMZ()) {
    return;
  }
  //?[NEW] (from MV)
  return ImageManager.loadEmptyBitmap = function() {
    if (this._emptyBitmap != null) {
      return this._emptyBitmap;
    } else {
      return new Bitmap();
    }
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var _input_onKeyDown, _input_onKeyUp, i, j, k, l;
  Input.KeyMapperPKD = {};
//Numbers
  for (i = j = 48; j <= 57; i = ++j) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i);
  }
//Letters Upper
  for (i = k = 65; k <= 90; i = ++k) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
  }
//Letters Lower (for key code events)
  for (i = l = 97; l <= 122; i = ++l) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
  }
  
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
  return TouchInput.toPoint = function() {
    return new KDCore.Point(TouchInput.x, TouchInput.y);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
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
  return PluginManager.isPluginParametersContentKey = function(pluginParameters, key) {
    return pluginParameters[key] != null;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ___Sprite_alias_Move_KDCORE_2;
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
  return Sprite.prototype.removeFromParent = function() {
    if (this.parent != null) {
      return this.parent.removeChild(this);
    }
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return TouchInput.toMapPoint = function() {
    return this.toPoint().convertToMap();
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  KDCore.Utils = KDCore.Utils || {};
  return (function() {
    var _;
    _ = KDCore.Utils;
    _.getJDataById = function(id, source) {
      var d, j, len;
      for (j = 0, len = source.length; j < len; j++) {
        d = source[j];
        if (d.id === id) {
          return d;
        }
      }
      return null;
    };
    _.hasMeta = function(symbol, obj) {
      return (obj != null) && (obj.meta != null) && (obj.meta[symbol] != null);
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
        return !SceneManager.isSceneChanging() && SceneManager._scene instanceof Scene_Map;
      } catch (error) {
        return false;
      }
    };
    _.isMapScene = function() {
      return this.isSceneMap();
    };
    _.isSceneBattle = function() {
      try {
        return !SceneManager.isSceneChanging() && SceneManager._scene instanceof Scene_Battle;
      } catch (error) {
        return false;
      }
    };
    _.isBattleScene = function() {
      return this.isSceneBattle();
    };
    _.getEventCommentValue = function(commentCode, list) {
      var comment, e, i, item;
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
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return null;
    };
    _.getEventCommentValueArray = function(commentCode, list) {
      var comment, comments, e, i, item;
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
      } catch (error) {
        e = error;
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
      } catch (error) {
        e = error;
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
      } catch (error) {
        e = error;
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
      var data, e;
      try {
        if ((typeId != null) && !isFinite(typeId) && KDCore.SDK.isString(typeId) && String.any(typeId)) {
          if (typeId[0] === "w") {
            typeId = 1;
          } else if (typeId[0] === "a") {
            typeId = 2;
          } else {
            typeId = 0;
          }
        }
        data = [$dataItems, $dataWeapons, $dataArmors];
        return data[typeId][itemId];
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return null;
      }
    };
    _.loadFont = function(name) {
      if (typeof FontManager === "undefined" || FontManager === null) {
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
      } catch (error) {
        e = error;
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
    // * Преобразовать расширенное значение
    // * Значение может быть X -> X
    // * "X" -> X (цифра)
    // * "X,Y,Z,..." -> [X, Y, Z]
    // * "[X, Y, Z,...]" -> [X, Y, Z]
    // * "X|V" -> из переменной X
    // * [Y] -> случайное число из массива (рекурсивно)
    //@[2.8.1] since
    _.getEValue = function(value) {
      var e, items, randomValue, variableId;
      try {
        if (value == null) {
          return null;
        }
        if (KDCore.SDK.isString(value)) {
          if (isFinite(value)) { // * Число представленно строкой
            return Number(value);
          }
          // * Массив представлен строкой (может быть без квадратных скобок)
          if (value.contains(',') || (value.contains("[") && value.contains("]"))) {
            value = value.replace("[", "");
            value = value.replace("]", "");
            // * Преобразуем в число или строку (например если extended |V)
            items = value.split(",").map(function(item) {
              var itemT;
              itemT = item.trim();
              if (isFinite(itemT)) {
                return Number(itemT);
              } else {
                return itemT;
              }
            });
            // * Вызываем снова эту функцию, но уже с массивом
            return KDCore.Utils.getEValue(items);
          }
          if (value.contains("|V")) {
            variableId = parseInt(value);
            return $gameVariables.value(variableId);
          }
          return value; // * Просто значение в итоге
        } else if (KDCore.SDK.isArray(value)) {
          randomValue = value.sample();
          return KDCore.Utils.getEValue(randomValue);
        } else {
          return value;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return value;
      }
    };
    //@[2.8.2] since
    _.isChanceIsGood = function(chance) {
      var e;
      try {
        if (chance > 1) {
          chance /= 100;
        }
        return chance > Math.random();
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
    //@[2.8.2] since
    //KEY:w:3:1:50 , KEY:i:10:2:1|V
    //OUTPUT: [GameItem, COUNT]
    _.parseItemFromConditionStr = function(conditionLine) {
      var amount, e, itemChance, itemId, parts, typeId;
      try {
        if (!conditionLine.contains(":")) {
          return null;
        }
        parts = conditionLine.split(":");
        typeId = parts[1];
        itemId = KDCore.Utils.getEValue(parts[2]);
        amount = KDCore.Utils.getEValue(parts[3]);
        if (amount <= 0) {
          return null;
        }
        try {
          itemChance = String.any(parts[4]) ? parts[4] : 100;
          itemChance = KDCore.Utils.getEValue(itemChance) / 100;
        } catch (error) {
          e = error;
          KDCore.warning(e);
          itemChance = 0;
        }
        if (itemChance <= 0) {
          return null;
        }
        if (KDCore.Utils.isChanceIsGood(itemChance)) {
          return [KDCore.Utils.getItemByType(itemId, typeId), amount];
        } else {
          return null;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return null;
      }
    };
    //@[3.2.1] since
    _.isValidCE = function(commonEventId) {
      var e;
      try {
        return commonEventId > 0 && ($dataCommonEvents[commonEventId] != null);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
    //@[3.2.1] since
    _.startCE = function(commonEventId) {
      var e;
      try {
        if (this.isValidCE(commonEventId)) {
          return $gameTemp.reserveCommonEvent(commonEventId);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    //@[3.2.1] since
    _.checkSwitch = function(value) {
      if (value == null) {
        return false;
      }
      if (isFinite(value)) {
        return false;
      }
      return KDCore.SDK.checkSwitch(value);
    };
    //@[3.2.1] since
    // * Вызвать с задержкой в time миллисекунд
    // * Не забываем про bind
    _.callDelayed = function(method, time = 1) {
      var e;
      try {
        if (method == null) {
          return;
        }
        setTimeout((function() {
          var e;
          try {
            return method();
          } catch (error) {
            e = error;
            return KDCore.warning(e);
          }
        }), time);
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
    //@[3.2.1] since
    //<meta:1,2,3,4> -> [1,2,3,4]
    _.getArrayOfNumbersFromMeta = function(symbol, obj) {
      var e, values;
      try {
        values = this.getArrayOfValuesFromMeta(symbol, obj);
        return values.map(function(v) {
          return Number(v);
        });
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return [];
      }
    };
    //@[3.2.1] since
    //<meta:a,b,c> -> ["a", "b", "c"]
    //<meta:a> -> ["a"]
    _.getArrayOfValuesFromMeta = function(symbol, obj) {
      var e, items, values;
      try {
        values = this.getValueFromMeta(symbol, obj);
        if (String.any(values)) {
          if (values.contains(',')) {
            items = values.split(',');
            return items || [];
          } else {
            return [values];
          }
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return [];
      }
    };
    //@[3.2.1] since
    // * Когда содержит одинаковый набор ключей
    //<meta:value1>
    //<meta:value2>
    //...
    // -> [value1,value2,...]
    _.getArrayOfValuesOfSameMeta = function(symbol, obj) {
      var e, j, len, line, lines, result;
      try {
        if (!this.hasMeta(symbol, obj)) {
          return [];
        }
        lines = obj.note.split("\n").filter(function(l) {
          return l.contains(symbol);
        });
        result = [];
        for (j = 0, len = lines.length; j < len; j++) {
          line = lines[j];
          try {
            line = line.replace("<" + symbol + ":", "");
            line = line.replace(">", "");
            result.push(line);
          } catch (error) {
            e = error;
            KDCore.warning(e);
          }
        }
        return result;
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return [];
    };
    //@[3.2.7] since
    _.getIndexIn2DArrayByIJ = function(row, col, cols) {
      return row * cols + col;
    };
    //@[3.2.7] since
    // * row - строка
    // * col - столбец
    _.getIJByIndexIn2DArray = function(index, cols) {
      var col, e, row;
      try {
        row = Math.floor(index / cols);
        col = index % cols;
        return [row, col];
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return [0, 0];
      }
    };
    //@[3.2.7] since
    _.isSwitchIsTRUE = function(switchId) {
      var e;
      if (switchId == null) {
        return true;
      }
      if (switchId <= 0) {
        return true;
      }
      try {
        return $gameSwitches.value(switchId) === true;
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return false;
    };
    //@[2.9.7] since
    // * Shrink number 100000 to "100k" and ect, returns STRING
    _.formatNumberToK = function(num) {
      var e;
      try {
        if (num >= 1000000000) {
          return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
        }
        if (num >= 1000000) {
          return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
          return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return num;
      }
    };
  })();
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return Window_Base.prototype.drawFaceWithCustomSize = function(faceName, faceIndex, x, y, finalSize) {
    this.contents._needModBltDWH = finalSize;
    this.drawFace(faceName, faceIndex, x, y);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return (function() {    // * Input Extension: KDGamepad
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
      } catch (error) {
        // * Можно напрямую
        //unless KDGamepad.isExists()
        //    if event.gamepad? and event.gamepad.mapping == 'standard'
        //        KDGamepad.init(event.gamepad)
        e = error;
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
      } catch (error) {
        e = error;
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
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
    // * Каждый кадр (обновление состояний)
    KDGamepad.update = function() {
      var e, gp, i, isDown, j, len, name, ref;
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
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
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
      } catch (error) {
        e = error;
        KDCore.warning(e);
        KDGamepad.stop();
      }
    };
    // * Обновить и проверить состояние Gamepad
    // * Надо каждый раз это вызывать
    KDGamepad.refresh = function() {
      var e, gamepads, gp, i, isGamepadRefreshed, j, ref;
      try {
        isGamepadRefreshed = false;
        if (navigator.getGamepads) {
          gamepads = navigator.getGamepads();
        } else if (navigator.webkitGetGamepads) {
          gamepads = navigator.webkitGetGamepads();
        }
        if (gamepads != null) {
          for (i = j = 0, ref = gamepads.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
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
      } catch (error) {
        e = error;
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
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var BitmapSrc;
  BitmapSrc = (function() {
    //?[DEPRECATED]
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
  //@[EXTEND]
  return KDCore.BitmapSrc = BitmapSrc;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Changer;
  // * Класс который может плавно изменять какой-либо параметр
  // * Работает в стиле chain методов

    // * ------------------ ПРИМЕР ----------------------------------

    // * Меняем прозрачность 4 раза, туда-сюда, затем выводим done в консоль

    //@changer = new AA.Changer(someSprite)
  //@changer.change('opacity').from(255)
  //            .to(0).step(5).speed(1).delay(30).repeat(4).reverse()
  //            .start().done(() -> console.log('done'))
  //@changer.update()

    // * -------------------------------------------------------------
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

    static CreateForOpacityUp(sprite, step = 35, onDone = null, isAutoStart = true) {
      var changer;
      changer = new Changer(sprite);
      changer.change('opacity').from(0).to(255).step(step);
      changer.done(function() {
        sprite.opacity = 255;
        if (onDone != null) {
          return onDone();
        }
      });
      if (isAutoStart) {
        changer.start();
      }
      return changer;
    }

    static CreateForOpacityDown(sprite, step = 35, onDone = null, isAutoStart = true) {
      var changer;
      changer = new Changer(sprite);
      changer.change('opacity').from(sprite.opacity).to(0).step(step);
      changer.done(function() {
        sprite.opacity = 0;
        if (onDone != null) {
          return onDone();
        }
      });
      if (isAutoStart) {
        changer.start();
      }
      return changer;
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Changer.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = Changer.prototype;
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

  //@[EXTEND]
  return KDCore.Changer = Changer;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Color;
  Color = (function() {
    class Color {
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
        KDCore.SDK.setConstantToObject(Color, name, color);
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
        a = KDCore.SDK.rand(1, 254);
        b = KDCore.SDK.rand(1, 254);
        c = KDCore.SDK.rand(1, 254);
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

    return Color;

  }).call(this);
  //@[EXTEND]
  return KDCore.Color = Color;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Color, DevLog, __TMP_LOGS__;
  Color = KDCore.Color;
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
  //@[EXTEND]
  return KDCore.DevLog = DevLog;
});


// Generated by CoffeeScript 2.6.1
// * Класс для глобального события игры (НЕ события на карте)
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.GEvent = class GEvent {
    constructor(name) {
      this.name = name;
      this.clear();
    }

    addListener(listener, isSingle = false) {
      if (listener == null) {
        return;
      }
      if (isSingle === true) {
        this.listeners = [listener];
      } else {
        this.listeners.push(listener);
      }
    }

    removeListener(listener) {
      if (listener == null) {
        return;
      }
      return this.listener.delete(listener);
    }

    call() {
      var i, l, len, ref;
      ref = this.listeners;
      for (i = 0, len = ref.length; i < len; i++) {
        l = ref[i];
        l();
      }
    }

    clear() {
      return this.listeners = [];
    }

  };
});


// Generated by CoffeeScript 2.6.1
// * Менеджер для управления глобальными событиями игры (GEvent) (НЕ события на карте)
KDCore.registerLibraryToLoad(function() {
  var GEventsManager;
  // * Данный менеджер глобальный, т.е. с ним работают ВСЕ плагины, которые его используют!
  GEventsManager = function() {};
  (function() {
    var _;
    _ = GEventsManager;
    // * Существует ли событие с данным именем
    _.isEventExists = function(gEventName) {
      return this._getEventByName(gEventName) != null;
    };
    // * Получить список всех зарегестрированных событий (имён)
    _.getAllEvents = function() {
      if (this.events == null) {
        return [];
      }
      return this.events.map(function(ev) {
        return ev.name;
      });
    };
    // * Зарегестрировать событие (используется только имя события)
    _.register = function(gEventName) {
      if (this.events == null) {
        this.events = [];
      }
      this.events.push(new KDCore.GEvent(gEventName));
    };
    // * Подписаться на событие (имя события) и слушатель
    // * если isSingle == true - то у события может быть только один исполнитель
    _.subscribeFor = function(evName, listener, isSingle = false) {
      var ref;
      return (ref = this._getEventByName(evName)) != null ? ref.addListener(listener, isSingle) : void 0;
    };
    // * Подписаться на событие (уникально) для объекта
    // * Т.е. при вызове этого метода ещё раз, если объект
    // * уже подписан на событие, ничего не будет (без дубликатов)
    //? ВНИМАНИЕ ! Если объект подписался через subscribeForX, то
    // выполнив clear по данному evName, он уже не подпишится!
    _.subscribeForX = function(context, evName, listener) {
      var e, key;
      try {
        key = "__kdCoreGEvent_" + evName;
        if (context[key] == null) {
          this.subscribeFor(evName, listener);
          return context[key] = true;
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    // * Вызвать событие (по имени)
    _.call = function(evName) {
      var ref;
      return (ref = this._getEventByName(evName)) != null ? ref.call() : void 0;
    };
    _.clear = function(evName) {
      var ref;
      return (ref = this._getEventByName(evName)) != null ? ref.clear() : void 0;
    };
    _._getEventByName = function(name) {
      if (!this.events) {
        return null;
      }
      return this.events.find(function(ev) {
        return ev.name === name;
      });
    };
  })();
  //@[EXTEND]
  return KDCore.GEventsManager = GEventsManager;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  //?[DEPRECATED]
  return KDCore.ParametersManager = class ParametersManager {
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
      } catch (error) {
        e = error;
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
      } catch (error) {
        e = error;
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
      if (KDCore.SDK.isInt(number)) {
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
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.ParamLoader = class ParamLoader {
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
      var value;
      if (this.isHasParameter(paramName)) {
        value = this.params[paramName];
        if (value != null) {
          return value;
        }
      }
      return def;
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
            return Number(item);
          case "intA":
            return this.parseArray(item, "int");
          case "bool":
          case "b":
          case "e":
            return eval(item);
          case "struct":
          case "s":
            return this.parseStruct(item);
          case "structA":
            return this.parseStructArray(item);
          case "str":
            return item;
          case "strA":
            return this.parseArray(item, "str");
          case "note":
            return this.parseNote(item);
          case "css":
            return item.toCss();
          case "color":
            return KDCore.Color.FromHex(item);
          case "json":
          case "j":
            return this.parseJson(item);
          case "jA":
            return this.parseArray(item, 'json');
          default:
            return item;
        }
      } catch (error) {
        e = error;
        console.warn(e);
        return item;
      }
    }

    parseArray(items, type) {
      var e, elements, i, len, p, parsed;
      try {
        elements = [];
        parsed = JsonEx.parse(items);
        for (i = 0, len = parsed.length; i < len; i++) {
          p = parsed[i];
          try {
            elements.push(this.parseParamItem(type, p));
          } catch (error) {
            e = error;
            console.warn(e);
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return elements;
    }

    parseStruct(item) {
      var e, parsed;
      try {
        if (item == null) {
          return null;
        }
        if (!String.any(item)) {
          return null;
        }
        parsed = JsonEx.parse(item);
        if (parsed != null) {
          return this.parseParameters(parsed);
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return null;
    }

    parseStructArray(items) {
      var e, elements, i, len, p, parsed;
      try {
        elements = [];
        parsed = JsonEx.parse(items);
        for (i = 0, len = parsed.length; i < len; i++) {
          p = parsed[i];
          try {
            elements.push(this.parseStruct(p));
          } catch (error) {
            e = error;
            console.warn(e);
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return elements;
    }

    parseNote(item) {
      var e, parsed;
      try {
        parsed = JsonEx.parse(item);
        if (parsed != null) {
          return parsed;
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return item;
    }

    parseJson(item) {
      var cx, e, element, elements, i, json, key, len, parsed, value;
      try {
        json = {};
        parsed = JsonEx.parse(item);
        elements = parsed.split('\n');
        for (i = 0, len = elements.length; i < len; i++) {
          element = elements[i];
          cx = "{" + element + "}";
          try {
            item = JsonEx.parse(cx);
            for (key in item) {
              value = item[key];
              json[key] = value;
            }
          } catch (error) {
            e = error;
            KDCore.warning("Parameter " + element + " have syntax errors, ignored");
          }
        }
        return json;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return null; // * Чтобы default value был возвращён
      }
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Point;
  Point = (function() {
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

    Object.defineProperty(Array.prototype, "toPoint", {
      enumerable: false
    });

    Sprite.prototype.toPoint = function() {
      return new Point(this.x, this.y);
    };

    Game_CharacterBase.prototype.toPoint = function() {
      return new Point(this.x, this.y);
    };

    return Point;

  }).call(this);
  //@[EXTEND]
  return KDCore.Point = Point;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return KDCore.Sprite = (function(superClass) {
    //@[AUTO EXTEND]
    class Sprite extends superClass {
      constructor() {
        super(...arguments);
      }

      appear(step, delay = 0) {
        this.opacity = 0;
        this._opChanger = KDCore.Changer.CreateForOpacityUp(this, step, () => {
          this._opChanger = null;
          return this._updateOpChanger = function() {}; // * EMPTY
        }, false); // * Not autostart for Delay
        if (delay > 0) {
          this._opChanger.delay(delay);
        }
        this._opChanger.start();
        this._updateOpChanger = () => {
          var ref;
          return (ref = this._opChanger) != null ? ref.update() : void 0;
        };
      }

      disapper(step, delay = 0) {
        this._opChanger = KDCore.Changer.CreateForOpacityDown(this, step, () => {
          this._opChanger = null;
          return this._updateOpChanger = function() {}; // * EMPTY
        }, false); // * Not autostart for Delay
        if (delay > 0) {
          this._opChanger.delay(delay);
        }
        this._opChanger.start();
        this._updateOpChanger = () => {
          var ref;
          return (ref = this._opChanger) != null ? ref.update() : void 0;
        };
      }

      assignTooltip(content, params) {
        if (this._tooltip != null) {
          this.removeChild(this._tooltip);
        }
        this._tooltip = new KDCore.UI.Sprite_UITooltip(params);
        this._tooltip.addContent(content);
        this.updateTooltip = this.updateTooltipBody;
      }

      destroyTooltip() {
        if (this._tooltip == null) {
          return;
        }
        this.hideTooltip();
        this.removeChild(this._tooltip);
        this._tooltip = null;
        return this.updateTooltip = function() {}; // * EMPTY
      }

      showTooltip() {
        if (this._tooltip == null) {
          return;
        }
        // * Position 0, 0, becouse cursorRelative by default
        this._tooltip.activateTooltip(0, 0, this);
      }

      hideTooltip() {
        if (this._tooltip == null) {
          return;
        }
        this._tooltip.deactivateTooltip();
      }

      //@[DYNAMIC]
      updateTooltip() {} // * EMPTY

      updateTooltipBody() {
        if (this.isUnderMouse()) {
          if (this._tooltip.isTooltipActive()) {

          } else {
            if (this.isReady() && this.visible === true && this.opacity >= 255) {
              return this.showTooltip();
            }
          }
        } else {
          if (this._tooltip.isTooltipActive()) {
            return this.hideTooltip();
          }
        }
      }

      update() {
        super.update();
        this._updateOpChanger();
        return this.updateTooltip();
      }

      //@[DYNAMIC]
      _updateOpChanger() {} // * EMPTY

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
        var i, j, ref;
        if (this.bitmap != null) {
          if (!this.bitmap.isReady()) {
            return false;
          }
        }
        for (i = j = 0, ref = this.children.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
          if (!this.children[i].bitmap.isReady()) {
            return false;
          }
        }
        return true;
      }

      isCheckAlpha() {
        return false;
      }

      inPosition(point) {
        var e, gx, gy, pixel, result, x, y;
        result = this.isContainsPoint(point);
        if (result && this.isCheckAlpha()) {
          try {
            ({x, y} = point);
            gx = KDCore.SDK.toGlobalCoord(this, 'x');
            gy = KDCore.SDK.toGlobalCoord(this, 'y');
            pixel = this.bitmap.getAlphaPixel(x - gx, y - gy);
            result = pixel > 100;
          } catch (error) {
            e = error;
            KDCore.warning(e);
            result = true; // * ignor Alpha if error
          }
        }
        return result;
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
        var e, h, margins, s, size, w;
        try {
          size = pluginParams.size;
          ({w, h} = size);
          try {
            if (String.any(w)) {
              if (isFinite(w)) {
                w = Number(w);
              } else {
                w = eval(w);
              }
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
            w = 100;
          }
          try {
            if (String.any(h)) {
              if (isFinite(h)) {
                h = Number(h);
              } else {
                h = eval(h);
              }
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
            h = 100;
          }
          s = KDCore.Sprite.FromBitmap(w, h);
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
        } catch (error) {
          e = error;
          console.warn('Something wrong with Text Settings!', e);
          return KDCore.Sprite.FromBitmap(60, 30);
        }
      }

    };

    return Sprite;

  }).call(this, Sprite);
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.TimedUpdate = class TimedUpdate {
    constructor(interval, method) {
      this.interval = interval;
      this.method = method;
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

    onUpdate(method) {
      this.method = method;
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
      value = KDCore.SDK.rand(min, max);
      return this.interval += value;
    }

    call() {
      if (this.method != null) {
        return this.method();
      }
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  
    // * Button (Sprite_XButton)

    //@[AUTO EXTEND]
  //?DEPRECATED
  return KDCore.Button = class Button extends Sprite {
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
        } catch (error) {

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
      } catch (error) {
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
      } catch (error) {
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
      var i, img, len, ref;
      ref = this._images;
      for (i = 0, len = ref.length; i < len; i++) {
        img = ref[i];
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
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_ButtonsGroup;
  // * Класс для реализации набора кнопок переключателей (Tabs)
  // * Когда только одна кнопка может быть нажата (выбрана)

    //rev 07.10.21
  Sprite_ButtonsGroup = class Sprite_ButtonsGroup extends KDCore.Sprite {
    // buttonsArray = [
    //       {image: NAME, position: [X,Y]}, ...
    //    ]
    constructor(buttonsArray, activeIndex, clickCallback) {
      var button, i, len;
      super();
      this.clickCallback = clickCallback;
      this._buttons = [];
      for (i = 0, len = buttonsArray.length; i < len; i++) {
        button = buttonsArray[i];
        this._createButton(button);
      }
      this._onButtonClick(activeIndex);
      return;
    }

    getSelectedIndex() {
      return this._buttons.findIndex(function(btn) {
        return !btn.isEnabled();
      });
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = Sprite_ButtonsGroup.prototype;
    _._createButton = function({image, position}) {
      var btn, index, method;
      // * Так как кнопки работают как переключатели, то 03 должен быть всегда
      index = this._buttons.length;
      btn = new KDCore.ButtonM(image, true, "Alpha");
      btn.move(position);
      method = () => {
        return this._onButtonClick(index);
      };
      btn.addClickHandler(method);
      this._buttons.push(btn);
      this.add(btn);
    };
    _._onButtonClick = function(index = 0) {
      var ref;
      this._resetAllButtons();
      if ((ref = this._buttons[index]) != null) {
        ref.disable(); // * Нажата
      }
      if (this.clickCallback != null) {
        this.clickCallback(index);
      }
    };
    _._resetAllButtons = function() {
      var btn, i, len, ref;
      ref = this._buttons;
      for (i = 0, len = ref.length; i < len; i++) {
        btn = ref[i];
        if (btn != null) {
          btn.enable();
        }
      }
    };
  })();
  // ■ END PRIVATE
  //---------------------------------------------------------------------------
  return KDCore.Sprite_ButtonsGroup = Sprite_ButtonsGroup;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_ButtonsGroupHandler;
  // * Класс для реализации набора кнопок переключателей (Tabs)
  // * Когда только одна кнопка может быть нажата (выбрана)
  // * В отличии от Sprite_ButtonsGroup, принимает массив
  // * уже созданных кнопок

    //rev 10.07.22
  Sprite_ButtonsGroupHandler = class Sprite_ButtonsGroupHandler extends KDCore.Sprite {
    // _buttons = [Button object with enable, disable, isEnable, addClickHandler methods]
    constructor(_buttons, clickCallback, activeIndex = 0) {
      var button, i, index, len, ref;
      super();
      this._buttons = _buttons;
      this.clickCallback = clickCallback;
      ref = this._buttons;
      for (index = i = 0, len = ref.length; i < len; index = ++i) {
        button = ref[index];
        this._processButton(button, index);
      }
      this._onButtonClick(activeIndex);
      return;
    }

    getSelectedIndex() {
      return this._buttons.findIndex(function(btn) {
        return !btn.isEnabled();
      });
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = Sprite_ButtonsGroupHandler.prototype;
    _._processButton = function(btn, index) {
      var method;
      // * Так как кнопки работают как переключатели, то 03 должен быть всегда
      method = () => {
        return this._onButtonClick(index);
      };
      btn.addClickHandler(method);
      this.add(btn);
    };
    _._onButtonClick = function(index = 0) {
      var ref;
      this._resetAllButtons();
      if ((ref = this._buttons[index]) != null) {
        ref.disable(); // * Нажата
      }
      if (this.clickCallback != null) {
        this.clickCallback(index);
      }
    };
    _._resetAllButtons = function() {
      var btn, i, len, ref;
      ref = this._buttons;
      for (i = 0, len = ref.length; i < len; i++) {
        btn = ref[i];
        if (btn != null) {
          btn.enable();
        }
      }
    };
  })();
  // ■ END PRIVATE
  //---------------------------------------------------------------------------
  return KDCore.Sprite_ButtonsGroupHandler = Sprite_ButtonsGroupHandler;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad((function() {
  var Sprite_TilingFrame;
  Sprite_TilingFrame = class Sprite_TilingFrame extends KDCore.Sprite {
    constructor(width, height, skinBitmap) {
      super();
      this.width = width;
      this.height = height;
      this.skinBitmap = skinBitmap;
      this._createParts();
      this._refreshAll();
    }

    _createParts() {
      var i, j;
      this.backSprite = new Sprite();
      this.addChild(this.backSprite);
      this.content = new Sprite();
      this.addChild(this.content);
      this._outFrame = new Sprite();
      for (i = j = 0; j < 8; i = ++j) {
        this._outFrame.addChild(new Sprite());
      }
      return this.addChild(this._outFrame);
    }

    // * Отступ, чтобы за рамку не выходить
    _fillPadding() {
      return 2;
    }

    // * Размер частей на картинке
    _fillImagePartWidth() {
      return 96;
    }

    _fillImagePartHeight() {
      return 96;
    }

    // * Толщина рамки
    _frameThickness() {
      return 12;
    }

    _refreshAll() {
      this._refreshBack();
      return this._refreshTFrame();
    }

    _refreshBack() {
      var fh, fw, h, m, sprite, w;
      m = this._fillPadding();
      w = Math.max(0, this.width - m * 2);
      h = Math.max(0, this.height - m * 2);
      sprite = this.backSprite;
      sprite.bitmap = this.skinBitmap;
      // * Координаты фона из картинки
      fw = this._fillImagePartWidth();
      fh = this._fillImagePartHeight();
      sprite.setFrame(0, 0, fw, fh);
      sprite.move(m, m);
      sprite.scale.x = w / fw;
      return sprite.scale.y = h / fh;
    }

    _refreshTFrame() {
      var drect, fh, fw, j, len, m, ref, spr, srect;
      fw = this._fillImagePartWidth();
      fh = this._fillImagePartHeight();
      // * Положение назначения
      drect = {
        x: 0,
        y: 0,
        width: this.width,
        height: this.height
      };
      // * Координаты рамки на картинке
      srect = {
        x: fw,
        y: 0,
        width: fw,
        height: fh
      };
      m = this._frameThickness(); // * Толщина
      ref = this._outFrame.children;
      for (j = 0, len = ref.length; j < len; j++) {
        spr = ref[j];
        spr.bitmap = this.skinBitmap;
      }
      if (KDCore.isMZ()) {
        Window.prototype._setRectPartsGeometry.call(this, this._outFrame, srect, drect, m);
      } else {
        this._setRectPartsGeometry(this._outFrame, srect, drect, m);
      }
    }

    // * Этот метод существует в MZ, но нет в MV
    //? From MZ
    _setRectPartsGeometry(sprite, srect, drect, m) {
      var child, children, dh, dmh, dmw, dw, dx, dy, j, len, sh, smh, smw, sw, sx, sy;
      sx = srect.x;
      sy = srect.y;
      sw = srect.width;
      sh = srect.height;
      dx = drect.x;
      dy = drect.y;
      dw = drect.width;
      dh = drect.height;
      smw = sw - m * 2;
      smh = sh - m * 2;
      dmw = dw - m * 2;
      dmh = dh - m * 2;
      children = sprite.children;
      sprite.setFrame(0, 0, dw, dh);
      sprite.move(dx, dy);
      // corner
      children[0].setFrame(sx, sy, m, m);
      children[1].setFrame(sx + sw - m, sy, m, m);
      children[2].setFrame(sx, sy + sw - m, m, m);
      children[3].setFrame(sx + sw - m, sy + sw - m, m, m);
      children[0].move(0, 0);
      children[1].move(dw - m, 0);
      children[2].move(0, dh - m);
      children[3].move(dw - m, dh - m);
      // edge
      children[4].move(m, 0);
      children[5].move(m, dh - m);
      children[6].move(0, m);
      children[7].move(dw - m, m);
      children[4].setFrame(sx + m, sy, smw, m);
      children[5].setFrame(sx + m, sy + sw - m, smw, m);
      children[6].setFrame(sx, sy + m, m, smh);
      children[7].setFrame(sx + sw - m, sy + m, m, smh);
      children[4].scale.x = dmw / smw;
      children[5].scale.x = dmw / smw;
      children[6].scale.y = dmh / smh;
      children[7].scale.y = dmh / smh;
      // center
      if (children[8] != null) {
        children[8].setFrame(sx + m, sy + m, smw, smh);
        children[8].move(m, m);
        children[8].scale.x = dmw / smw;
        children[8].scale.y = dmh / smh;
      }
      for (j = 0, len = children.length; j < len; j++) {
        child = children[j];
        child.visible = dw > 0 && dh > 0;
      }
    }

  };
  return KDCore.Sprite_TilingFrame = Sprite_TilingFrame;
}));


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Window_ExtTextLineBase;
  // * Данное окно используется как основа для Sprite_UITextExt
  //rev 07.10.21
  Window_ExtTextLineBase = class Window_ExtTextLineBase extends Window_Base {
    constructor(rect, fontSettings) {
      super(rect);
      this.fontSettings = fontSettings;
      this.createContents();
      // * Всегда прозрачное окно
      this.setBackgroundType(2);
    }

    // * Нет отступов
    updatePadding() {
      return this.padding = 0;
    }

    // * Нет отступов
    itemPadding() {
      return 0;
    }

    textPadding() {
      return 0;
    }

    standardPadding() {
      return 0;
    }

    contentsWidth() {
      return this.width;
    }

    contentsHeight() {
      return this.height;
    }

    // * Более гибкая настройка размера текста при { }
    makeFontBigger() {
      return this.contents.fontSize += 1;
    }

    makeFontSmaller() {
      if (this.contents.fontSize > 1) {
        return this.contents.fontSize -= 1;
      }
    }

    // * Применение своих шрифта и размера текста
    resetFontSettings() {
      super.resetFontSettings();
      if (this.fontSettings == null) {
        return;
      }
      if (String.any(this.fontSettings.face)) {
        this.contents.fontFace = this.fontSettings.face;
      }
      if (this.fontSettings.size > 0) {
        this.contents.fontSize = this.fontSettings.size;
      }
      if (this.fontSettings.italic != null) {
        this.contents.fontItalic = this.fontSettings.italic;
      }
    }

  };
  return KDCore.Window_ExtTextLineBase = Window_ExtTextLineBase;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Button M
  //------------------------------------------------------------------------------
  //@[AUTO EXTEND]
  // * Button Mini - упрощённый класс Sprite_XButton (KDCore.Button)

    // * Принимает название файла изображения кнопки без _00
  // * Названия изображения должны быть в стандартном формате _00, _01, [_03]
  // * _02 - не используются в этом классе

    // * Класс использует глобальную временную переменную для определения находится ли мышь в зоне кнопки

    //TODO: ADD ALPHA CHECK!

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
        return this.isUnderMouse() && this.visible === true;
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
  return (function() {    
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
      if (TouchInput.isTriggered() && this.isUnderMouse()) {
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
    //TODO: Добавить доп. проверку?
    //@[ALIAS]
    alias_SM_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function() {
      $gameTemp.kdButtonUnderMouse = null;
      setTimeout((function() {
        return $gameTemp.kdButtonUnderMouse = null;
      }), 50);
      return alias_SM_onMapLoaded.call(this);
    };
  })();
});

// ■ END ButtonM Implementation
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Button Mini User - класс с определением файла каждого состояния отдельно
  // * Принимает теже аргументы, только заместо имени файла, три изображения (имени)
  // ? states = { main, hover, disabled }
  return KDCore.ButtonMU = class ButtonMU extends KDCore.ButtonM {
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
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_TilingLine;
  Sprite_TilingLine = class Sprite_TilingLine extends KDCore.Sprite_TilingFrame {
    constructor() {
      super(...arguments);
    }

    //$[OVER BASE ALL BELOW]
    _fillPadding() {
      return 0;
    }

    _refreshTFrame() {} // * EMPTY

    _fillImagePartWidth() {
      return 4;
    }

    _fillImagePartHeight() {
      return 26;
    }

  };
  return KDCore.Sprite_TilingLine = Sprite_TilingLine;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Пространство имён для всех UIElements
  KDCore.UI = KDCore.UI || {};
  (function() {    // * Общий класс для всех UI элементов
    //?rev 13.10.20
    var Sprite_UIElement;
    Sprite_UIElement = (function() {
      // * ABSTRACT значит что класс сам по себе ничего не создаёт, не хранит данные
      //@[ABSTRACT]
      class Sprite_UIElement extends KDCore.Sprite {
        constructor(params) {
          super();
          this.params = params;
          this._init();
        }

        // * Стандартный набор настроек
        defaultParams() {
          return {
            visible: true
          };
        }

        // * Общий метод (есть у всех элементов)
        // * По умолчанию вызывает drawText, но потомки могут переопределить
        draw() {
          return this.drawText(...arguments);
        }

        // * Общий метод
        drawText() {} // * EMPTY

        
          // * Если изначально невидимый (из параметров), то не активный вообще
        isActive() {
          return this.params.visible === true;
        }

        rootImageFolder() {
          if (String.any(this.params.rootImageFolder)) {
            return this.params.rootImageFolder;
          } else {
            return Sprite_UIElement.RootImageFolder;
          }
        }

        // * Сделать чёрно белым
        desaturate() {
          this.filters = [new PIXI.filters.ColorMatrixFilter()];
          this.filters[0].desaturate();
        }

        // * Общий метод (можно ли редактировать визуально)
        isCanBeEdited() {
          return false;
        }

        // * Общий метод (надо ли скрывать при игровом сообщнии)
        isHaveHideWithMessageFlag() {
          return false;
        }

        // * Общий метод (находится ли объект под мышкой)
        isUnderMouse() {
          var ref;
          return (ref = this.zeroChild()) != null ? ref.isUnderMouse() : void 0;
        }

        // * Параметры первого элемента (если он есть)
        realWidth() {
          var child;
          child = this.zeroChild();
          if (child != null) {
            if (child instanceof KDCore.UI.Sprite_UIElement) {
              return child.realWidth();
            } else {
              return child.width;
            }
          }
          return 0;
        }

        realHeight() {
          var child;
          child = this.zeroChild();
          if (child != null) {
            if (child instanceof KDCore.UI.Sprite_UIElement) {
              return child.realHeight();
            } else {
              return child.height;
            }
          }
          return 0;
        }

        // * Первый "физический" элемент (спрайт)
        zeroChild() {
          return this.children[0];
        }

        // * Метод восстановления значения на стандартные настройки
        reset(property) {
          var e;
          try {
            switch (property) {
              case "position":
                this._resetPosition();
                break;
              default:
                this[property] = this.params[property];
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
          }
        }

      };

      // * Корневая директория для изображений
      Sprite_UIElement.RootImageFolder = "Alpha";

      return Sprite_UIElement;

    }).call(this);
    KDCore.UI.Sprite_UIElement = Sprite_UIElement;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIElement.prototype;
    _._init = function() {
      var e;
      this._prepare();
      try {
        return this._createContent();
      } catch (error) {
        e = error;
        KDCore.warning(e);
        // * Если при создании произошла ошибка, отключаем элемент
        return this.isActive = function() {
          return false;
        };
      }
    };
    
    // * Подготовка элемента (проверка параметров)
    _._prepare = function() {
      if (this.params == null) {
        this.params = this.defaultParams();
      }
      return this.visible = this.params.visible;
    };
    // * Наследники создают свои элементы в этом методе
    _._createContent = function() {}; // * EMPTY
    
    // * Сброс позиции
    _._resetPosition = function() {
      var e, x, y;
      if (this.params.position == null) {
        return;
      }
      try {
        ({x, y} = this.params.position);
        this.move(x, y);
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIButton;
    // * Кнопка на экране, можно нажимать
    Sprite_UIButton = class Sprite_UIButton extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          image: "Button_Inventory",
          isHaveDisabled: true,
          rootImageFolder: null, //?optional
          click: "console.log('click')" // * число или код
        };
      }

      // * Кнопка не поддерживает перерисовку
      draw() {} // * EMPTY

      disable() {
        var ref;
        return (ref = this.button) != null ? ref.disable() : void 0;
      }

      enable() {
        var ref;
        return (ref = this.button) != null ? ref.enable() : void 0;
      }

      setState(isEnabled) {
        if (isEnabled) {
          return this.enable();
        } else {
          return this.disable();
        }
      }

      
        // * Просто вызов метода
      call() {
        var ref;
        return (ref = this.button) != null ? ref.click() : void 0;
      }

      // * Вызов метода с симуляцией нажатия
      click() {
        var ref, ref1;
        if ((ref = this.button) != null) {
          ref.click();
        }
        return (ref1 = this.button) != null ? ref1.simulateClick() : void 0;
      }

    };
    KDCore.UI.Sprite_UIButton = Sprite_UIButton;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIButton.prototype;
    //$[OVER]
    _._createContent = function() {
      if (this.params.image.isEmpty()) {
        KDCore.warning('You try create Button without image');
        return;
      }
      this.button = new KDCore.ButtonM(this.params.image, this.params.isHaveDisabled, this.rootImageFolder());
      this.add(this.button);
      return this._registerClickMethod();
    };
    _._registerClickMethod = function() {
      var commonEventId, e, method, ref, script;
      if (!String.any(this.params.click)) {
        return;
      }
      method = null;
      try {
        // * Если число, то значит общее событие
        if (isFinite(this.params.click)) {
          commonEventId = parseInt(this.params.click);
          if (commonEventId > 0) {
            method = function() {
              return $gameTemp.reserveCommonEvent(commonEventId);
            };
          }
        } else {
          // * Иначе скрипт
          script = this.params.click;
          method = function() {
            return eval(script);
          };
        }
        return this.button.addClickHandler(method);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return (ref = this.button) != null ? ref.clearClickHandler() : void 0;
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    // * Рисует лицо персонажа (из папки Faces)
    var Sprite_UIFace;
    Sprite_UIFace = class Sprite_UIFace extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          faceName: "Actor1",
          faceIndex: 0,
          mirror: false,
          size: 144
        };
      }

      draw() {
        return this.drawFace(...arguments);
      }

      drawFace(faceName, faceIndex) {
        return this._drawFaceWhenReady(faceName, faceIndex);
      }

    };
    KDCore.UI.Sprite_UIFace = Sprite_UIFace;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIFace.prototype;
    //$[OVER]
    _._createContent = function() {
      return this._createFaceSprite();
    };
    _._createFaceSprite = function() {
      this._faceSpr = KDCore.Sprite.FromBitmap(this.params.size);
      if (this.params.mirror === true) {
        this._flipFaceSpr();
      }
      this.add(this._faceSpr);
      this._drawFaceWhenReady(this.params.faceName, this.params.faceIndex);
    };
    _._flipFaceSpr = function() {
      this._faceSpr.scale.x = -1;
      this._faceSpr.x = this.params.size;
    };
    _._drawFaceWhenReady = function(name, index = 0) {
      var ref;
      if ((ref = this._faceSpr) != null) {
        ref.clear();
      }
      if (!String.any(name)) {
        return;
      }
      if (index < 0) {
        return;
      }
      this._drawOnReady = {name, index};
      this._faceSourceBitmap = ImageManager.loadFace(name);
      this._faceSourceBitmap.addLoadListener(this._drawFace.bind(this));
      this._drawFace();
    };
    _._drawFace = function() {
      var fh, fw, size, sx, sy;
      if (this._faceSpr == null) {
        return;
      }
      this._faceSpr.clear();
      if (!String.any(this._drawOnReady.name)) {
        return;
      }
      if (KDCore.isMZ()) {
        fw = ImageManager.faceWidth;
        fh = ImageManager.faceHeight;
      } else {
        fw = Window_Base._faceWidth;
        fh = Window_Base._faceHeight;
      }
      size = this.params.size;
      sx = (this._drawOnReady.index % 4) * fw;
      sy = Math.floor(this._drawOnReady.index / 4) * fh;
      this._faceSpr.bitmap.blt(this._faceSourceBitmap, sx, sy, fw, fh, 0, 0, size, size);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    //TODO: ROOT IMAGE FOLDER AS PARAMETER!!!
    var Sprite_UIGauge;
    Sprite_UIGauge = class Sprite_UIGauge extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          fill: "",
          foreground: "",
          mask: "",
          backColor: "#000000".toCss(),
          backOpacity: 255,
          vertical: false,
          rootImageFolder: null //?optional
        };
      }

      draw() {
        return this.drawGauge(...arguments);
      }

      drawGauge(percent = 1) {
        this._lastValue = percent;
        return this._drawGauge(percent);
      }

      isVertical() {
        return this.params.vertical === true;
      }

    };
    KDCore.UI.Sprite_UIGauge = Sprite_UIGauge;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIGauge.prototype;
    //$[OVER]
    _._createContent = function() {
      // * Загружается главное изображение, затем уже все остальные, т.к. нужны размеры
      return this._loadFillImage();
    };
    _._loadFillImage = function() {
      // * Главное изображение, поэтому если не указано, то ничего
      if (this.params.fill.isEmpty()) {
        KDCore.warning('You try create Gauge without fill image');
        return;
      }
      KDCore.Utils.loadImageAsync(this.rootImageFolder(), this.params.fill).then(this._createParts.bind(this));
    };
    // * Получаем изображение заполнения и создаём части (т.к. есть размеры)
    _._createParts = function(fillBitmap) {
      this.fillBitmap = fillBitmap;
      this._createBackground();
      this._createFillLayer();
      this._loadForeground();
      this._loadMask();
      return this._onReady();
    };
    _._createBackground = function() {
      this.background = KDCore.Sprite.FromBitmap(this.fillBitmap.width, this.fillBitmap.height);
      this.background.b().fillAll(this.params.backColor);
      this.background.opacity = this.params.backOpacity;
      return this.add(this.background);
    };
    _._createFillLayer = function() {
      this.fillLayer = KDCore.Sprite.FromBitmap(this.fillBitmap.width, this.fillBitmap.height);
      return this.add(this.fillLayer);
    };
    _._loadForeground = function() {
      var fore;
      if (String.isNullOrEmpty(this.params.foreground)) {
        return;
      }
      fore = KDCore.Sprite.FromImg(this.params.foreground, this.rootImageFolder());
      return this.add(fore);
    };
    _._loadMask = function() {
      var mask;
      if (String.isNullOrEmpty(this.params.mask)) {
        return;
      }
      mask = KDCore.Sprite.FromImg(this.params.mask, this.rootImageFolder());
      this.mask = mask;
      return this.add(mask);
    };
    // * Если что-то было до готовности, нарисовать
    _._onReady = function() {
      this.drawGauge(this._lastValue);
    };
    _._drawGauge = function(percent) {
      if (this.fillLayer == null) {
        return;
      }
      this.fillLayer.clear();
      if (this.isVertical()) {
        return this._drawVerGauge(percent);
      } else {
        return this._drawHorGauge(percent);
      }
    };
    _._drawHorGauge = function(percent) {
      var w;
      w = this.fillBitmap.width * percent;
      return this.fillLayer.b().blt(this.fillBitmap, 0, 0, w, this.fillLayer.height, 0, 0);
    };
    _._drawVerGauge = function(percent) {
      var h, hy;
      h = this.fillBitmap.height * percent;
      hy = this.fillBitmap.height - h;
      this.fillLayer.b().blt(this.fillBitmap, 0, 0, this.fillLayer.width, h, 0, hy);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIIcon;
    Sprite_UIIcon = class Sprite_UIIcon extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          index: 0,
          size: 32,
          rootImageFolder: null //?optional
        };
      }

      draw() {
        return this.drawIcon(...arguments);
      }

      drawIcon(index = 0, noSmoth = false) {
        this._lastValue = index;
        return this._drawIcon(index, noSmoth);
      }

    };
    KDCore.UI.Sprite_UIIcon = Sprite_UIIcon;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIIcon.prototype;
    //$[OVER]
    _._createContent = function() {
      this._createIcon();
      return this._drawIcon(this.params.index);
    };
    _._createIcon = function() {
      this._icon = KDCore.Sprite.FromBitmap(this.params.size, this.params.size);
      this.add(this._icon);
      return this._onReady();
    };
    _._onReady = function() {
      return this.drawIcon(this._lastValue);
    };
    _._drawIcon = function(index, noSmoth = false) {
      this._icon.clear();
      if (KDCore.SDK.isString(index)) {
        this._drawImageIcon(index, noSmoth);
      } else {
        if (index <= 0) {
          return;
        }
        this._icon.drawIcon(0, 0, index, this.params.size, noSmoth);
      }
    };
    _._drawImageIcon = function(imageName, noSmoth = false) {
      return KDCore.Utils.loadImageAsync(this.rootImageFolder(), imageName).then((bitmap) => {
        return this._icon.drawIcon(0, 0, bitmap, this.params.size, noSmoth);
      });
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIImage;
    Sprite_UIImage = class Sprite_UIImage extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          image: "",
          rootImageFolder: null //?optional
        };
      }

      draw() {
        return this.drawImage(...arguments);
      }

      drawImage(image) {
        return this._drawImage(image);
      }

    };
    KDCore.UI.Sprite_UIImage = Sprite_UIImage;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIImage.prototype;
    //$[OVER]
    _._createContent = function() {
      return this._drawImage(this.params.image);
    };
    _._drawImage = function(image) {
      this._clearImage();
      if (!String.isNullOrEmpty(image)) {
        this._image = KDCore.Sprite.FromImg(image, this.rootImageFolder());
        this.add(this._image);
      }
    };
    _._clearImage = function() {
      if (this._image == null) {
        return;
      }
      this._image.visible = false;
      this.removeChild(this._image);
      return this._image = null;
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIRect;
    Sprite_UIRect = class Sprite_UIRect extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 60,
            h: 20
          },
          fillColor: "#FFFFFF".toCss(),
          fillOpacity: 255,
          borderColor: "#000000".toCss(),
          borderThickness: 1,
          borderOpacity: 255
        };
      }

      draw() {
        return this.fill(...arguments);
      }

      fill(color, opacity = 255) {
        return this._fill(color, opacity);
      }

      drawBorder(color, thickness = 1, opacity = 255) {
        return this._drawBorder(color, thickness, opacity);
      }

    };
    KDCore.UI.Sprite_UIRect = Sprite_UIRect;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIRect.prototype;
    //$[OVER]
    _._createContent = function() {
      if (String.any(this.params.fillColor)) {
        this._createFill();
        this.fill(this.params.fillColor, this.params.fillOpacity);
      }
      if (String.any(this.params.borderColor) && this.params.borderThickness > 0) {
        this._createBorder();
        return this.drawBorder(this.params.borderColor, this.params.borderThickness, this.params.borderOpacity);
      }
    };
    _._createFill = function() {
      this._fillSpr = KDCore.Sprite.FromBitmap(this.params.size.w, this.params.size.h);
      return this.addChild(this._fillSpr);
    };
    _._createBorder = function() {
      this._borderSprite = KDCore.Sprite.FromBitmap(this.params.size.w, this.params.size.h);
      return this.addChild(this._borderSprite);
    };
    _._fill = function(color, opacity) {
      if (this._fillSpr == null) {
        return;
      }
      this._fillSpr.fillAll(color);
      this._fillSpr.opacity = opacity;
    };
    _._drawBorder = function(color, thickness, opacity) {
      var b;
      if (this._borderSprite == null) {
        return;
      }
      this._borderSprite.clear();
      b = this._borderSprite.b();
      // * Top line
      b.fillRect(0, 0, b.width, thickness, color);
      // * Bottom line
      b.fillRect(0, b.height - thickness, b.width, thickness, color);
      // * Left line
      b.fillRect(0, 0, thickness, b.height, color);
      // * Right line
      b.fillRect(b.width - thickness, 0, thickness, b.height, color);
      return this._borderSprite.opacity = opacity;
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    //rev 17.11.22
    var Sprite_UIText;
    Sprite_UIText = class Sprite_UIText extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 60,
            h: 20
          },
          alignment: "center",
          font: {
            face: null,
            size: 18,
            italic: false
          },
          margins: {
            x: 0,
            y: 0
          },
          outline: {
            color: null,
            width: 2
          },
          textColor: "#FFFFFF".toCss(),
          // ? can be Null or not exists
          shadow: {
            color: "#000",
            opacity: 200,
            margins: {
              x: 1,
              y: 1
            }
          }
        };
      }

      //?DYNAMIC
      // * Сперва рисуем по готовности, а как загрузился спрайт, меняем
      drawText(text) {
        return this._drawTextWhenReady(text);
      }

      // * Сборка текста с учётом формата
      // * Заменить вхождения %1, %2 на значения параметров
      drawTextWithFormat(/*format string, arguments parameters... */) {
        var text;
        text = this._convertFormatedString(...arguments);
        this.drawText(text);
      }

      // * Пишет текст с определённым цветом (один раз)
      drawTextColor(text, colorCss) {
        if (this._textSpr == null) {
          return;
        }
        this._textSpr.b().textColor = colorCss;
        this.drawText(text);
        this._textSpr.b().textColor = this.params.textColor;
      }

    };
    KDCore.UI.Sprite_UIText = Sprite_UIText;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIText.prototype;
    //$[OVER]
    _._createContent = function() {
      if (this.params.shadow != null) {
        this._createShadow();
      }
      return this._createTextSprite();
    };
    _._createTextSprite = function() {
      this._textSpr = KDCore.Sprite.FromParams(this.params);
      this._textSpr.onReady(this._onReady.bind(this));
      return this.add(this._textSpr);
    };
    // * Выполнить по готовности
    _._onReady = function() {
      // * Переключить метод, так как уже готов
      this.drawText = this._drawText;
      // * Написать то что нужно было до готовности (если есть)
      if (this._drawOnReady == null) {
        return;
      }
      this.drawText(this._drawOnReady);
      this._drawOnReady = null;
    };
    _._drawText = function(text) {
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.clear();
      if (text != null) {
        this._textSpr.drawTextFull(text);
      }
      if (this._shadowSpr != null) {
        this._shadowSpr.clear();
        if (text != null) {
          this._shadowSpr.drawTextFull(text);
        }
      }
    };
    // * Написать текст когда будет готов
    _._drawTextWhenReady = function(text) {
      this._drawOnReady = text;
      return this._drawText(text);
    };
    
    // * Заменить вхождения %1, %2 на значения параметров
    _._convertFormatedString = function(/*text, args...*/) {
      var e, i, j, ref, text;
      try {
        text = arguments[0];
        for (i = j = 1, ref = arguments.length; (1 <= ref ? j < ref : j > ref); i = 1 <= ref ? ++j : --j) {
          try {
            if (arguments[i] == null) {
              continue;
            }
            text = text.replace("%" + i, arguments[i]);
          } catch (error) {
            e = error;
            KDCore.warning(e);
            text = "[wrong format text input]";
          }
        }
        return text;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return "[wrong format text input]";
      }
    };
    _._createShadow = function() {
      this._shadowSpr = KDCore.Sprite.FromParams(this.params);
      this._shadowSpr.bitmap.textColor = this.params.shadow.color;
      this._shadowSpr.opacity = this.params.shadow.opacity;
      this._shadowSpr.x += this.params.shadow.margins.x;
      this._shadowSpr.y += this.params.shadow.margins.y;
      return this.add(this._shadowSpr);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    //rev 30.12.21
    var Sprite_UITextExt;
    Sprite_UITextExt = class Sprite_UITextExt extends KDCore.UI.Sprite_UIText {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 200,
            h: 60
          },
          font: {
            face: null,
            size: 14,
            italic: false
          },
          margins: {
            x: 0,
            y: 0
          },
          // * новые параметры (KDCore 2.7)
          //?null могут быть
          singleLine: false,
          forceCentered: false
        };
      }

      //$[OVER]
      // * Данный метод не поддерживается, так как тут основа не Sprite, а Window
      drawTextColor() {
        return this.drawText(...arguments);
      }

    };
    KDCore.UI.Sprite_UITextExt = Sprite_UITextExt;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UITextExt.prototype;
    //$[OVER]
    _._createTextSprite = function() {
      var rect;
      rect = new Rectangle(0, 0, this.params.size.w, this.params.size.h);
      this._textSpr = new KDCore.Window_ExtTextLineBase(rect, this.params.font);
      this._textSpr.x = this.params.margins.x || 0;
      this._textSpr.y = this.params.margins.y || 0;
      this.add(this._textSpr);
      // * На следующий кадр, чтобы не было потери текста (опасно)
      //setTimeout (=> @_onReady() ), 10
      this._onReady(); // * Сразу
    };
    
    //$[OVER]
    _._drawText = function(text) {
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.contents.clear();
      if (this.params.forceCentered === true) {
        this._textSpr.drawTextExInCenter(text, 0, 0, this._textSpr.width, this._textSpr.height);
      } else {
        if (this.params.singleLine === true) {
          this._textSpr.drawTextEx(text, 0, 0, this._textSpr.width);
        } else {
          // * По умолчанию
          this._textSpr.drawTextExWithWordWrap(text, 0, 0, this._textSpr.width);
        }
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UITextWithBack;
    Sprite_UITextWithBack = class Sprite_UITextWithBack extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          text: {
            visible: true,
            size: {
              w: 60,
              h: 20
            },
            alignment: "center",
            font: {
              face: null,
              size: 18,
              italic: false
            },
            margins: {
              x: 0,
              y: 0
            },
            outline: {
              color: null,
              width: 2
            },
            textColor: "#000000".toCss()
          },
          rect: {
            visible: true,
            size: {
              w: 60,
              h: 20
            },
            fillColor: "#FFFFFF".toCss(),
            fillOpacity: 255,
            borderColor: "#000000".toCss(),
            borderThickness: 1,
            borderOpacity: 255
          },
          textMargins: {
            x: 0,
            y: 0
          }
        };
      }

      draw() {
        return this.drawText(...arguments);
      }

      // * Aргументы смотри в Sprite_UIText
      drawText() {
        return this.text.draw(...arguments);
      }

      drawTextColor() {
        return this.text.drawTextColor(...arguments);
      }

      // * Аргументы смотри в Sprite_UIRect
      fill() {
        return this.rect.fill(...arguments);
      }

      drawBorder() {
        return this.rect.drawBorder(...arguments);
      }

      //$[OVER]
      isUnderMouse() {
        return this.rect.isUnderMouse();
      }

    };
    KDCore.UI.Sprite_UITextWithBack = Sprite_UITextWithBack;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UITextWithBack.prototype;
    //$[OVER]
    _._createContent = function() {
      this._createRect();
      return this._createText();
    };
    _._createRect = function() {
      this.rect = new KDCore.UI.Sprite_UIRect(this.params.rect);
      return this.addChild(this.rect);
    };
    _._createText = function() {
      var x, y;
      this.text = new KDCore.UI.Sprite_UIText(this.params.text);
      ({x, y} = this.params.textMargins);
      this.text.move(x, y);
      return this.addChild(this.text);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIColorGauge;
    Sprite_UIColorGauge = class Sprite_UIColorGauge extends KDCore.UI.Sprite_UIGauge {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 100,
            h: 40
          },
          fill: "#FFFFFF", // * В отличии от Gauge, тут цвет, а не картинка
          foreground: "", // картинка
          mask: "", // картинка
          backColor: "#000000".toCss(),
          backOpacity: 255,
          vertical: false,
          rootImageFolder: null //?optional
        };
      }

    };
    KDCore.UI.Sprite_UIColorGauge = Sprite_UIColorGauge;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIColorGauge.prototype;
    //$[OVER]
    // * Заместо изображения используем простой Bitmap с заливкой цвета
    _._loadFillImage = function() {
      var fillBitmap;
      fillBitmap = new Bitmap(this.params.size.w, this.params.size.h);
      fillBitmap.fillAll(this.params.fill);
      this._createParts(fillBitmap);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    // * Данный UI Элемент является только контейнером
    // * Он ничего не рисует, нужно добавлять в него
    // * контент методом addContent

    //rev 17.11.22
    var Sprite_UITooltip;
    Sprite_UITooltip = class Sprite_UITooltip extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
        this.opacity = 0;
      }

      isTooltipActive() {
        return (this._opThread != null) || (this._opChanger != null) || this.opacity > 0;
      }

      activateTooltip(x, y, parent) {
        if (this.isTooltipActive()) {
          return;
        }
        this.deactivateTooltip();
        this.move(x, y);
        this._opThread = new KDCore.TimedUpdate(this.params.delay, this.showTooltip.bind(this));
        if (!this.params.isGlobal && (parent != null)) {
          parent.addChild(this);
        } else {
          // * Always on Top on Scene  (if Global)
          SceneManager._scene.addChild(this);
        }
      }

      deactivateTooltip() {
        this._opThread = null;
        this._opChanger = null;
        return this.opacity = 0;
      }

      showTooltip() {
        this._opThread = null;
        this.appear(this.params.opacityChangeStep);
        if (this.params.cursorRelative === true) {
          return this.toCursor();
        }
      }

      update() {
        var ref;
        super.update();
        if ((ref = this._opThread) != null) {
          ref.update();
        }
        if (this.isTooltipActive() && this.params.cursorRelative === true) {
          return this.toCursor();
        }
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          delay: 30,
          opacityChangeStep: 35,
          margins: {
            x: 8,
            y: 8
          },
          isGlobal: true,
          cursorRelative: true
        };
      }

      toCursor() {
        var x, y;
        ({x, y} = this.params.margins);
        return this.move(TouchInput.x + x, TouchInput.y + y);
      }

      // * Основной метод, нужно добавить контент
      addContent(content) {
        return this.add(content);
      }

    };
    KDCore.UI.Sprite_UITooltip = Sprite_UITooltip;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UITooltip.prototype;
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS__processEscapeCharacter, _;
  //@[DEFINES]
  _ = Window_Base.prototype;
  //@[ALIAS]
  ALIAS__processEscapeCharacter = _.processEscapeCharacter;
  _.processEscapeCharacter = function(code, textState) {
    switch (code) {
      case 'CHEX':
        this.pProcessColorChangeHex(this.pObtainEscapeParamHexColor(textState));
        break;
      case 'ISZ':
        this.pProcessDrawIconSized(this.pObtainEscapeParamIconArr(textState), textState);
        break;
      case 'PSZ':
        this.pProcessDrawPictureSized(this.pObtainEscapeParamImgArr(textState), textState, false);
        break;
      case 'PSB':
        this.pProcessDrawPictureSized(this.pObtainEscapeParamImgArr(textState), textState, true);
        break;
      default:
        ALIAS__processEscapeCharacter.call(this, code, textState);
    }
  };
  //?NEW
  _.pObtainEscapeParamHexColor = function(textState) {
    var arr, regExp, textPart;
    regExp = /^\[(#?([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      return arr[1];
    } else {
      return "";
    }
  };
  //?NEW
  _.pObtainEscapeParamIconArr = function(textState) {
    var arr, params, regExp, textPart;
    regExp = /^\[(\d+,\s*\d+,\s*-?\d+,\s*-?\d+)\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      if (arr[1] != null) {
        params = arr[1].split(",").map(function(i) {
          return parseInt(i.trim());
        });
        return params;
      }
    }
    return [];
  };
  //?NEW
  _.pObtainEscapeParamImgArr = function(textState) {
    var arr, params, regExp, textPart;
    regExp = /^\[(\w+,\s*\d+,\s*\d+,\s*-?\d+,\s*-?\d+)\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      if (arr[1] != null) {
        params = arr[1].split(",").map(function(i) {
          if (isFinite(i)) {
            return parseInt(i.trim());
          } else {
            return i;
          }
        });
        return params;
      }
    }
    return [];
  };
  //?NEW
  _.pProcessColorChangeHex = function(colorHex) {
    var e;
    try {
      this.changeTextColor(colorHex);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.resetTextColor();
    }
  };
  //?NEW
  //?params: [INDEX, SIZE, DX, DY]
  _.pProcessDrawIconSized = function(params, textState) {
    var dx, dy, e, iconIndex, size, staticMargin, x, y;
    try {
      if (params == null) {
        return;
      }
      if (params.isEmpty()) {
        return;
      }
      size = params[1];
      if (params[1] == null) {
        if (KDCore.isMZ()) {
          size = ImageManager.iconWidth;
        } else {
          size = Window_Base._iconWidth;
        }
      }
      if (params[2] == null) {
        params[2] = 0;
      }
      if (params[3] == null) {
        params[3] = 0;
      }
      iconIndex = params[0];
      dx = params[2];
      dy = params[3];
      staticMargin = 2;
      x = textState.x + staticMargin + dx;
      y = textState.y + staticMargin + dy;
      if (KDCore.isMZ()) {
        if (textState.drawing === true) {
          // * Только в режиме рисования
          this.contents.drawIcon(x, y, iconIndex, size);
        }
      } else {
        this.contents.drawIcon(x, y, iconIndex, size);
      }
      textState.x += size + (staticMargin * 2) + dx;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  //?NEW
  //?params: [NAME, W, H, DX, DY]
  _.pProcessDrawPictureSized = function(params, textState, isUnderText = false) {
    var drawBitmap, drawProcess, e, height, name, source, width, x, y;
    try {
      if (params == null) {
        return;
      }
      if (params.isEmpty()) {
        return;
      }
      name = params[0];
      if (!String.any(name)) {
        return;
      }
      width = params[1];
      height = params[2];
      if (params[3] == null) {
        params[3] = 0;
      }
      if (params[4] == null) {
        params[4] = 0;
      }
      x = textState.x + 2 + params[3];
      y = textState.y + 2 + params[4];
      drawBitmap = this.contents;
      source = this.pGetSourceImageForDrawPictureSized(name);
      if ((KDCore.isMZ() && textState.drawing === true) || KDCore.isMV()) {
        drawProcess = function() {
          var e;
          try {
            if (drawBitmap == null) {
              return;
            }
            return drawBitmap.drawOnMe(source, x, y, width, height);
          } catch (error) {
            e = error;
            return KDCore.warning(e);
          }
        };
        source.addLoadListener(drawProcess);
      }
      if (isUnderText !== true) {
        // * Вариант, что текст не будет "перескакивать" за ширину картинки а пойдёт поверх (т.е. фоновая картинка)
        // * Если картине не preload, то может "вылезти" на текст потом, так как рисоваться будет позже
        textState.x += width + 4 + params[3];
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  // * Данный метод вынесен отдельно, чтобы можно было переопределять папки
  return _.pGetSourceImageForDrawPictureSized = function(name) {
    return ImageManager.loadPicture(name);
  };
});


// Generated by CoffeeScript 2.6.1



// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var FloatingWindow;
  
    // * Общий класс для всех окон на карте
  /*parameters
      {
          draggable: true,
          closeButton: true,
          moveToCenter: true,
          alwaysOnTop: true,
          header: true
      }
  */
  FloatingWindow = class FloatingWindow extends KDCore.Sprite {
    constructor(mainParent, windowW, windowH, parameters) {
      super();
      this.mainParent = mainParent;
      this.windowW = windowW;
      this.windowH = windowH;
      this.parameters = parameters;
      this._init();
      return;
    }

    static StaticSettings() {
      return {
        draggable: false,
        closeButton: false,
        moveToCenter: false,
        alwaysOnTop: false,
        header: false
      };
    }

    // * Статическое окно с дочерним
    static StaticWindow(parent, sub) {
      var p, w;
      p = KDCore.FloatingWindow.StaticSettings();
      w = new KDCore.FloatingWindow(parent, sub.width, sub.height, p);
      w.setSubWindow(sub);
      w.open();
      return w;
    }

    isActive() {
      return this.visible === true;
    }

    isReady() {
      return this._isReady === true;
    }

    isMouseIn() {
      return this.inPosition(TouchInput);
    }

    isOpen() {
      return this.isActive();
    }

    // * Дочернее окно (если есть)
    sub() {
      return this._subw;
    }

    setOnReadyHandler(_readyHandler) {
      this._readyHandler = _readyHandler;
      if ((this._readyHandler != null) && this._isReady === true) {
        return this._readyHandler();
      }
    }

    isDraggable() {
      return this._isDraggable === true && (this._headerSpr != null) && this._headerSpr.visible === true && this.isOpen();
    }

    setCloseHandler(_closeHandler) {
      this._closeHandler = _closeHandler;
    }

    callCloseHandler() {
      if (this._closeHandler != null) {
        return this._closeHandler();
      }
    }

    setDraggingHandler(_dragHandler) {
      this._dragHandler = _dragHandler;
    }

    setDragEndHandler(_dragEndHandler) {
      this._dragEndHandler = _dragEndHandler;
    }

    hideHeader() {} //TODO:

    hideCloseButton() {} //TODO:

    
      // * Сдвиг заголовка по X, чтобы рамку не задевал
    headerMarginX() {
      return 2;
    }

    // * Сдвиг заголовка по Y, чтобы рамку не задевал
    headerMarginY() {
      return 0;
    }

    // * Стандартная позиция кнопки "закрыть"
    closeButtonPosition() {
      return {
        x: this.width - 24,
        y: 4
      };
    }

    open() {
      if (this.isOpen()) {
        return;
      }
      this._open();
      this._afterOpen();
    }

    close() {
      if (!this.isOpen()) {
        return;
      }
      this._close();
      this._afterClose();
    }

    rootImageFolder() {
      return "Alpha/Windows";
    }

    update() {
      super.update();
      this._updateMouseCheckThread();
      this._updateDragging();
    }

    // * Добавить спрайт на специальный слой контента
    addContent(sprite) {
      return this._contentLayer.addChild(sprite);
    }

    // * Добавить дочернее окно
    setSubWindow(w) {
      this._subw = w;
      this.addContent(w);
    }

    destroy() {
      this._close();
      return Sprite.prototype.destroy.call(this);
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = FloatingWindow.prototype;
    _._init = function() {
      var ref;
      // * Окно всегда закрыто
      this.visible = false;
      // * Контент прогрузился?
      this._isReady = false;
      this._applyParameters();
      if (this._isAlwaysOnTop === false) {
        // * Если не всегда поверх окон, то добавляем сразу к родителю (один раз)
        if ((ref = this.mainParent) != null) {
          ref.addChild(this);
        }
      }
      this._initFloatingSystem();
      this._createLayers();
      this._loadWindowFrame();
    };
    // * Тут ничего не создавать, не двигать, так как
    // * конент создаётся Async, см. метод _createCustomElements
    _._applyParameters = function() {
      var p;
      this._applyDefaults();
      if (this.parameters == null) {
        return;
      }
      p = this.parameters;
      if (p.draggable != null) {
        this._isDraggable = p.draggable;
      }
      if (p.moveToCenter != null) {
        this._isMoveToCenter = p.moveToCenter;
      }
      if (p.header != null) {
        this._isHeaderVisible = p.header;
      }
      if (p.closeButton != null) {
        this._isHaveCloseButton = p.closeButton;
      }
      if (p.alwaysOnTop != null) {
        this._isAlwaysOnTop = p.alwaysOnTop;
      }
    };
    _._applyDefaults = function() {
      // * Окно можно перетаскивать мышкой (по умолчанию - да)
      this._isDraggable = true;
      this._isMoveToCenter = true;
      this._isHeaderVisible = true;
      this._isHaveCloseButton = true;
      this._isAlwaysOnTop = true;
    };
    _._initFloatingSystem = function() {
      if ($gameTemp._floatingWindows == null) {
        // * Создаём массив окон, он нужен для правильного
        // закрытия окон (по очереди) и перемещения drag and drop
        // с учётом верхнего окна
        $gameTemp._floatingWindows = [];
      }
      // * Вспомогательная переменная, чтобы не вызывать методы каждый кадр
      this._mouseIn = false;
      // * Тоже вспомогательная переменная
      this._dragging = false;
    };
    _._moveToStartPosition = function() {
      if (this._isMoveToCenter === true) {
        return this.moveToCenter(Graphics.width / 2, Graphics.height / 2);
      }
    };
    _._closeButtonClick = function() {
      // * При исчезании, кнопка не успевает себя "удалить"
      $gameTemp.kdButtonUnderMouse = null;
      this.callCloseHandler();
      return this.close();
    };
    (function() {      // * DRAGGING
      // -----------------------------------------------------------------------
      _._updateDragging = function() {
        if (!this.isDraggable()) {
          return;
        }
        // * Если мы уже двигаем окно, но мышка вышла за границы, то можно дальше двигать
        // * Только если мышка не в окне и не двигали ранее, то не проверяем
        if (this._mouseIn === false && this._dragging === false) {
          return;
        }
        // * Если существует объект который сейчас dragging
        if ($gameTemp.pkdDraggableInstance != null) {
          // * Если этот объект не этот объект, то выходим из метода
          if ($gameTemp.pkdDraggableInstance !== this) {
            return;
          }
        }
        if (TouchInput.isLongPressed()) {
          if (this._dragging === false) {
            this._onDragStart();
          } else {
            this._onDragging();
          }
        } else {
          this._stopDragging();
        }
      };
      _._onDragStart = function() {
        // * Проверка, в области Header или нет
        if (!this._isMouseInHeader()) {
          return;
        }
        // * Разница в координатах курсора и объекта, чтобы убрать эффект "прыжка"
        this.opacity = 200;
        this._deltaXY = this.getDeltaXY();
        this._dragging = true;
        // * Устанавливаем глобальную ссылку на объект перемещения
        $gameTemp.pkdDraggableInstance = this;
      };
      _.getDeltaXY = function() {
        var p;
        p = new KDCore.Point(this.x, this.y);
        return p.delta(TouchInput);
      };
      _._onDragging = function() {
        // * Защита от перетаскивания за края экрана
        if (!this._isNewMousePositionOnScreen()) {
          return;
        }
        this.move(TouchInput.x - this._deltaXY.x, TouchInput.y - this._deltaXY.y);
        if (this._dragHandler != null) {
          return this._dragHandler();
        }
      };
      _._stopDragging = function() {
        if (this._dragging === true) {
          this._dragging = false;
          this.opacity = 255;
          this._clearDraggableGlocalInstance();
          if (this._dragEndHandler != null) {
            this._dragEndHandler();
          }
        }
      };
      // * Освобождаем глобальную ссылку
      _._clearDraggableGlocalInstance = function() {
        if ($gameTemp.pkdDraggableInstance === this) {
          return $gameTemp.pkdDraggableInstance = null;
        }
      };
      _._isMouseInHeader = function() {
        if (this._headerSpr == null) {
          return false;
        }
        return this._headerSpr.isContainsPoint(TouchInput);
      };
      _._isNewMousePositionOnScreen = function() {
        return KDCore.Utils.isPointInScreen(TouchInput, 10);
      };
    })();
    (function() {      // -----------------------------------------------------------------------

      // * CREATE ELEMENTS
      // -----------------------------------------------------------------------
      
      // * Слои нужны, так как изображения загружаються асинхронно
      _._createLayers = function() {
        this._mainLayer = new Sprite();
        this._contentLayer = new Sprite();
        this._headerLayer = new Sprite();
        this._closeButtonLayer = new Sprite();
        this.addChild(this._mainLayer);
        this.addChild(this._contentLayer);
        this.addChild(this._headerLayer);
        this.addChild(this._closeButtonLayer);
      };
      _._loadWindowFrame = function() {
        return KDCore.Utils.loadImageAsync(this.rootImageFolder(), "windowFrame").then(this._createWindow.bind(this));
      };
      _._createWindow = function(frameImage) {
        this.bitmap = new Bitmap(this.windowW, this.windowH);
        this.wFrame = new KDCore.Sprite_TilingFrame(this.windowW, this.windowH, frameImage);
        this._mainLayer.addChild(this.wFrame);
        this._createParts();
      };
      _._createParts = function() {
        this._loadHeader();
        if (this._isHaveCloseButton === true) {
          this._createCloseButton();
        }
        this._moveToStartPosition();
        this._createCustomElements();
        // * Окно готово
        this._isReady = true;
        if (this._readyHandler != null) {
          this._readyHandler();
        }
      };
      _._loadHeader = function() {
        return KDCore.Utils.loadImageAsync(this.rootImageFolder(), "headerLine").then(this._createHeader.bind(this));
      };
      _._createHeader = function(headerLineImage) {
        var w;
        w = this.windowW - (this.headerMarginX() * 2);
        this._headerSpr = new KDCore.Sprite_TilingLine(w, headerLineImage.height, headerLineImage);
        this._headerSpr.x = this.headerMarginX();
        this._headerSpr.y = this.headerMarginY();
        this._headerLayer.addChild(this._headerSpr);
        if (this._isHeaderVisible === true) {
          // * Сдвигаем контент, чтобы было начало под заголовком
          this._contentLayer.y += headerLineImage.height + this.headerMarginY();
        } else {
          this._headerSpr.visible = false;
        }
      };
      _._createCloseButton = function() {
        this._closeButton = new KDCore.ButtonM("windowCloseButton", false, this.rootImageFolder());
        this._closeButtonLayer.addChild(this._closeButton);
        this._closeButton.move(this.closeButtonPosition());
        this._closeButton.addClickHandler(this._closeButtonClick.bind(this));
      };
      //%[FOR CHILDRENS]
      // * Наследники создают свои элементы в этом методе
      // * Есть специальный метод addContent()
      _._createCustomElements = function() {}; // * EMPTY
    })();
    (function() {      // -----------------------------------------------------------------------

      // * MOUSE
      // -----------------------------------------------------------------------
      
      // * Определение если мышка в области окна
      //TODO: Есть проблема при открытии окна сразу под курсором
      _._registerMouseInOut = function() {
        if (!this.isOpen()) {
          return;
        }
        if (this.isMouseIn()) {
          if (this._mouseIn === false) {
            this._mouseIn = true;
            this._onMouseIn();
          }
        } else {
          if (this._mouseIn === true) {
            this._mouseIn = false;
            this._onMouseOut();
          }
        }
      };
      // * Используется похожая система что и в KDCore.ButtonM
      _._onMouseIn = function() {
        return $gameTemp.floatingWindowUnderMouse = this;
      };
      _._onMouseOut = function() {
        if ($gameTemp.floatingWindowUnderMouse === this) {
          return $gameTemp.floatingWindowUnderMouse = null;
        }
      };
      // * Будем проверять мышка ли в окне только при открытом окне
      _._createMouseCheckThread = function() {
        this._mouseCheckThread = new KDCore.TimedUpdate(1, this._registerMouseInOut.bind(this));
        this._updateMouseCheckThread = () => {
          return this._mouseCheckThread.update();
        };
        return this._mouseCheckThread.call();
      };
      // * Когда окно закрывается, никаких проверок, обнуляем метод
      _._destroyMouseCheckThread = function() {
        this._mouseCheckThread = null;
        return this._updateMouseCheckThread = function() {};
      };
      //?DYNAMIC
      _._updateMouseCheckThread = function() {}; // * EMPTY
    })();
    (function() {      // -----------------------------------------------------------------------

      // * OPEN OR CLOSE
      // -----------------------------------------------------------------------
      _._open = function() {
        var ref, ref1;
        this.visible = true;
        if ((ref = $gameTemp._floatingWindows) != null) {
          ref.push(this);
        }
        if (this._isAlwaysOnTop === true) {
          // * Окно, которое открывается, всегда снова выше остальных (опция)
          if ((ref1 = this.mainParent) != null) {
            ref1.addChild(this);
          }
        }
        return this._createMouseCheckThread();
      };
      _._afterOpen = function() {}; // * EMPTY
      _._close = function() {
        this.visible = false;
        if (this._isAlwaysOnTop === true) {
          this.removeFromParent();
        }
        this._clearDraggableGlocalInstance();
        $gameTemp._floatingWindows.delete(this);
        this._onMouseOut();
        return this._destroyMouseCheckThread();
      };
      _._afterClose = function() {}; // * EMPTY
    })();
  })();
  (function() {    // ■ END PRIVATE.coffee
    //---------------------------------------------------------------------------

    // * Если окно под курсором, нельзя нажимать на карте для движения игрока
    // -----------------------------------------------------------------------
    (function() {      //╒═════════════════════════════════════════════════════════════════════════╛
      // ■ Scene_Map.coffee
      //╒═════════════════════════════════════════════════════════════════════════╛
      //---------------------------------------------------------------------------
      var ALIAS__isAnyButtonPressed, ALIAS__processMapTouch, _;
      
      //@[DEFINES]
      _ = Scene_Map.prototype;
      if (KDCore.isMZ()) {
        //@[ALIAS]
        ALIAS__isAnyButtonPressed = _.isAnyButtonPressed;
        _.isAnyButtonPressed = function() {
          if ($gameTemp.floatingWindowUnderMouse != null) {
            return true;
          } else {
            return ALIAS__isAnyButtonPressed.call(this);
          }
        };
      } else {
        //@[ALIAS]
        ALIAS__processMapTouch = _.processMapTouch;
        _.processMapTouch = function() {
          if ($gameTemp.floatingWindowUnderMouse != null) {
            return;
          }
          return ALIAS__processMapTouch.call(this);
        };
      }
    })();
  })();
  //@[EXTEND]
  // ■ END Scene_Map.coffee
  //---------------------------------------------------------------------------
  return KDCore.FloatingWindow = FloatingWindow;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var HUI;
  // * Html UI Manager
  // * Набор инструментов для работы с HTML элементами интерфейса
  HUI = function() {};
  (function() {
    var _;
    //@[DEFINES]
    _ = HUI;
    _.init = function() {
      // * Данный набор инструментов могут использовать многие плагины, поэтому проверка
      if (this.isInited()) {
        return;
      }
      this._createMainParentInHtml();
      this._extendGraphicsClass();
      this.refresh();
    };
    // * Был ли создан (инициализирован) основной элемент
    _.isInited = function() {
      return this.parent() != null;
    };
    // * Основной элемент родитель для всех элементов UI
    _.parent = function() {
      return this._parent;
    };
    _.refresh = function() {
      if (!this.isInited()) {
        return;
      }
      Graphics._centerElement(this._parent);
      this._parent.style.zIndex = 2;
      this._parent.style.width = Graphics._canvas.style.width;
      this._parent.style.height = Graphics._canvas.style.height;
    };
    _.addCSS = function(name, folder = "css") {
      var head;
      if (!this.isInited()) {
        this.init();
      }
      head = document.getElementsByTagName("head")[0];
      if (head != null) {
        head.insertAdjacentHTML("beforeend", "<link rel=\"stylesheet\" href=\"$0/$1.css\" />".replace("$0", folder).replace("$1", name));
      }
    };
    _.addElement = function(id, html, classes = null) {
      var cls, element, i, len;
      if (!this.isInited()) {
        this.init();
      }
      element = document.createElement("div");
      element.id = id;
      element.innerHTML = html;
      if (classes != null) {
        for (i = 0, len = classes.length; i < len; i++) {
          cls = classes[i];
          element.classList.add(cls);
        }
      }
      this._parent.appendChild(element);
      return element;
    };
    // * Может быть NULL
    _.getElement = function(id) {
      return document.getElementById(id);
    };
    _.removeElement = function(element) {
      if (element == null) {
        return;
      }
      if (KDCore.SDK.isString(element)) {
        this.removeElementById(element);
      } else {
        this.removeElementById(element.id);
      }
    };
    _.removeElementById = function(elementId) {
      var element;
      if (!this.isInited()) {
        return;
      }
      element = this.getElement(elementId);
      if (element != null) {
        this._parent.removeChild(element);
      }
    };
    // * PRIVATE ------------------------------------------------------------------
    _._createMainParentInHtml = function() {
      this._parent = document.createElement("div");
      this._parent.id = "KDCoreMain";
      document.body.appendChild(this._parent);
    };
    _._extendGraphicsClass = function() {
      var ALIAS___updateCanvas;
      //@[ALIAS]
      ALIAS___updateCanvas = Graphics._updateCanvas;
      Graphics._updateCanvas = function() {
        ALIAS___updateCanvas.call(this);
        return KDCore.HUI.refresh();
      };
    };
  })();
  //@[EXTEND]
  return KDCore.HUI = HUI;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS___onMouseUp, ALIAS___onRightButtonDown, ALIAS__clear, ALIAS__update, _;
  // * Right mouse pressed
  // * Определение когда правая (вторая) кнопка мыши зажата и удерживается

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
  return _.kdIsPressed2 = function() {
    return this._kdMousePressed2 === true;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Методы из RPG Maker MZ которых нет в RPG Maker MV
  if (KDCore.isMZ()) {
    return;
  }
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Scene_Base.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Scene_Base.prototype;
    _.calcWindowHeight = function(numLines, selectable) {
      if (selectable === true) {
        return Window_Selectable.prototype.fittingHeight(numLines);
      } else {
        return Window_Base.prototype.fittingHeight(numLines);
      }
    };
  })();
  (function() {    // ■ END Scene_Base.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Window_Selectable.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Window_Selectable.prototype;
    _.itemLineRect = function(index) {
      return this.itemRect(index);
    };
  })();
  (function() {    // ■ END Window_Selectable.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Window_Base.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS__initialize, ALIAS__processEscapeCharacter, _;
    //@[DEFINES]
    _ = Window_Base.prototype;
    // * Чтоб можно было Rectangle принимать в конструктор
    //@[ALIAS]
    ALIAS__initialize = _.initialize;
    _.initialize = function(x, y, w, h) {
      if (x instanceof PIXI.Rectangle || x instanceof Rectangle) {
        return ALIAS__initialize.call(this, x.x, x.y, x.width, x.height);
      } else {
        return ALIAS__initialize.call(this, ...arguments);
      }
    };
    
    // * В MZ используется FS для изменения размера шрифта в тексте
    //@[ALIAS]
    ALIAS__processEscapeCharacter = _.processEscapeCharacter;
    _.processEscapeCharacter = function(code, textState) {
      if (code === "FS") {
        this.contents.fontSize = this.obtainEscapeParam(textState);
      } else {
        ALIAS__processEscapeCharacter.call(this, code, textState);
      }
    };
  })();
  (function() {    // ■ END Window_Base.coffee
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
  return (function() {    // ■ END Spriteset_Map.coffee
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
});

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var alias_SM_processMapTouch, alias_TIOMM;
  //?SMouse better alternative
  if (KDCore.isMZ()) {
    return;
  }
  // * Для ButtonM
  //@[ALIAS]
  alias_SM_processMapTouch = Scene_Map.prototype.processMapTouch;
  Scene_Map.prototype.processMapTouch = function() {
    if ($gameTemp.kdButtonUnderMouse != null) {
      if ($gameTemp.kdButtonUnderMouse.parent == null) {
        return $gameTemp.kdButtonUnderMouse = null;
      } else {

      }
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
  return TouchInput._onHover = function(_x, _y) {
    this._x = _x;
    this._y = _y;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
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
  return _.virtualClick = function(buttonName) {
    return this._virtualButton = buttonName;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS___startLoading, _;
  // * В версии RPG Maker MZ 1.5.0 появился баг что картинки не успевают прогрузится
  // * Данный фикс, возвращает старое поведение
  if (!KDCore.isMZ()) {
    return;
  }
  //@[DEFINES]
  _ = Bitmap.prototype;
  //@[ALIAS]
  ALIAS___startLoading = _._startLoading;
  return _._startLoading = function() {
    if (Utils.hasEncryptedImages()) {
      ALIAS___startLoading.call(this, ...arguments);
    } else {
      // * Это из RPG Maker MZ до версии 1.5
      this._image = new Image();
      this._image.onload = this._onLoad.bind(this);
      this._image.onerror = this._onError.bind(this);
      this._destroyCanvas();
      this._loadingState = "loading";
      this._image.src = this._url;
    }
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var alias_WBDTEX_KDCore29122021;
  // * <center>, для RPG Maker MZ и если нету Visu Message Core
  if (KDCore.isMZ()) {
    alias_WBDTEX_KDCore29122021 = Window_Base.prototype.drawTextEx;
    Window_Base.prototype.drawTextEx = function(text, x, y, width) {
      var e, newText;
      try {
        if (Imported.VisuMZ_1_MessageCore !== true) { // * В Visu уже есть <center>
          if (String.any(text) && text.contains("<center>")) {
            if (text[0] === "<" && text[1] === "c") { // * Должен быть в начале строки
              newText = text.replace("<center>", "");
              return this.drawTextExInCenter(newText, x, y, width);
            }
          }
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return alias_WBDTEX_KDCore29122021.call(this, ...arguments);
    };
  }
  //?NEW
  Window_Base.prototype.drawTextExInCenter = function(text, x, y, width, height) {
    var e, newX, newY, textSize;
    try {
      if (KDCore.isMV()) { // * В MV нет поддержки данного метода
        this.drawTextEx(...arguments);
        return;
      }
      textSize = this.textSizeEx(text);
      newX = x + width / 2 - textSize.width / 2;
      if ((height != null) && height > 0) {
        newY = y + height / 2 - textSize.height / 2;
      } else {
        newY = y;
      }
      return this.drawTextEx(text, newX, newY, width);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return this.drawTextEx(text, x, y, width);
    }
  };
  //?NEW
  Window_Base.prototype.drawTextExWithWordWrap = function(text, x, y, width, maxLines) {
    var maxWidth, wrappedText;
    this.drawTextEx("", 0, 0, 100);
    maxWidth = this.contentsWidth();
    wrappedText = Window_Message.prototype.pWordWrap.call(this, text, width || maxWidth, maxLines);
    return this.drawTextEx(wrappedText, x, y, width);
  };
  //?NEW
  return Window_Message.prototype.pWordWrap = function(text, maxWidth, maxLines) {
    var i, j, k, l, line, lines, newLines, ref, ref1, result, spaceLeft, spaceWidth, wordWidth, wordWidthWithSpace, words;
    lines = text.split('\n');
    maxWidth = maxWidth;
    spaceWidth = this.contents.measureTextWidth(' ');
    result = '';
    newLines = 1;
    for (i = k = 0, ref = lines.length; (0 <= ref ? k < ref : k > ref); i = 0 <= ref ? ++k : --k) {
      spaceLeft = maxWidth;
      line = lines[i];
      words = line.split(' ');
      for (j = l = 0, ref1 = words.length; (0 <= ref1 ? l < ref1 : l > ref1); j = 0 <= ref1 ? ++l : --l) {
        wordWidth = this.contents.measureTextWidth(words[j].replaceAll(/\\C\[\d+\]/g, ""));
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
});


// Generated by CoffeeScript 2.6.1
// * Последний файл (после всех классов)
// * Загружает библиотеки
var i, len, lib, ref, text;

if (KDCore._requireLoadLibrary === true) {
  ref = KDCore[KDCore._loader];
  for (i = 0, len = ref.length; i < len; i++) {
    lib = ref[i];
    lib();
  }
  KDCore[KDCore._loader] = [];
  text = "%c  KDCore is loaded " + KDCore.Version;
  console.log(text, 'background: #222; color: #82b2ff');
}

// ==========================================================================
// ==========================================================================

//   END OF PLUGINS CORE LIBRARY
//   (Next code is this plugin code)

// ==========================================================================
// ==========================================================================

//Plugin KDCore builded by PKD PluginBuilder 2.2 - 03.06.2023

var _0x545be5 = _0x1cbb;
(function (_0x4ee0ea, _0x53ae30) {
    var _0x57edba = _0x1cbb, _0x5c7765 = _0x4ee0ea();
    while (!![]) {
        try {
            var _0x568081 = -parseInt(_0x57edba(0x1ad)) / 0x1 + parseInt(_0x57edba(0x199)) / 0x2 + -parseInt(_0x57edba(0x1c6)) / 0x3 + parseInt(_0x57edba(0x1b0)) / 0x4 * (parseInt(_0x57edba(0x1a7)) / 0x5) + parseInt(_0x57edba(0x192)) / 0x6 + parseInt(_0x57edba(0x17f)) / 0x7 * (-parseInt(_0x57edba(0x184)) / 0x8) + -parseInt(_0x57edba(0x1cd)) / 0x9;
            if (_0x568081 === _0x53ae30)
                break;
            else
                _0x5c7765['push'](_0x5c7765['shift']());
        } catch (_0x202115) {
            _0x5c7765['push'](_0x5c7765['shift']());
        }
    }
}(_0x5455, 0x308b0));
function _0x1cbb(_0xe893a0, _0x123af1) {
    var _0x5455c3 = _0x5455();
    return _0x1cbb = function (_0x1cbbea, _0x1c97eb) {
        _0x1cbbea = _0x1cbbea - 0x17c;
        var _0x5dcdd8 = _0x5455c3[_0x1cbbea];
        return _0x5dcdd8;
    }, _0x1cbb(_0xe893a0, _0x123af1);
}
var PKD_SST_SkillsTreeBase;
function _0x5455() {
    var _0x3dc642 = [
        '\x6c\x6f\x61\x64\x50\x69\x63\x74\x75\x72\x65\x46\x6f\x72\x53\x69\x6d\x70\x6c\x65\x53\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65',
        '\x63\x68\x61\x6e\x67\x65',
        '\x61\x64\x64\x4c\x6f\x61\x64\x4c\x69\x73\x74\x65\x6e\x65\x72',
        '\x63\x6c\x6f\x73\x65\x42\x75\x74\x74\x6f\x6e\x49\x6d\x61\x67\x65',
        '\x32\x33\x30\x37\x30\x36\x78\x45\x65\x59\x73\x72',
        '\x5a\x71\x6f\x4a\x56',
        '\x5f\x63\x6c\x6f\x73\x65\x42\x75\x74\x74\x6f\x6e',
        '\x42\x4e\x75\x63\x4f',
        '\x64\x69\x73\x61\x62\x6c\x65\x4d\x6f\x64\x61\x6c\x4d\x6f\x64\x65',
        '\x37\x32\x65\x5a\x50\x43\x79\x4a',
        '\x55\x74\x69\x6c\x73',
        '\x70\x53\x69\x6d\x70\x6c\x65\x53\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65',
        '\x6d\x61\x69\x6e\x46\x72\x61\x6d\x65',
        '\x5f\x61\x63\x74\x69\x76\x61\x74\x65\x4d\x6f\x64\x61\x6c\x57\x69\x6e\x64\x6f\x77',
        '\x6f\x70\x61\x63\x69\x74\x79',
        '\x69\x73\x43\x61\x6e\x43\x6c\x6f\x73\x65\x53\x63\x65\x6e\x65',
        '\x5f\x63\x72\x65\x61\x74\x65\x43\x6f\x6e\x74\x65\x6e\x74',
        '\x73\x6b\x69\x6c\x6c\x43\x65\x6c\x6c\x4d\x61\x73\x6b\x5f\x43',
        '\x62\x69\x6e\x64',
        '\x69\x73\x53\x68\x6f\x77\x53\x6c\x6f\x77\x6c\x79',
        '\x5f\x63\x72\x65\x61\x74\x65\x46\x72\x61\x6d\x65\x49\x6d\x61\x67\x65',
        '\x5f\x61\x66\x74\x65\x72\x41\x6e\x69\x6d\x61\x74\x69\x6f\x6e\x44\x6f\x6e\x65',
        '\x6c\x6a\x70\x5a\x7a',
        '\x31\x34\x38\x32\x30\x31\x32\x65\x4e\x52\x45\x50\x6e',
        '\x64\x65\x66\x61\x75\x6c\x74\x42\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64\x46\x6f\x72\x45\x6d\x70\x74\x79\x53\x63\x65\x6e\x65',
        '\x6b\x46\x61\x45\x53',
        '\x69\x73\x52\x65\x61\x64\x79',
        '\x5f\x63\x72\x65\x61\x74\x65\x4d\x6f\x64\x61\x6c\x43\x68\x6f\x69\x63\x65\x57\x69\x6e\x64\x6f\x77',
        '\x63\x72\x65\x61\x74\x65',
        '\x5f\x72\x65\x66\x72\x65\x73\x68\x53\x63\x65\x6e\x65\x41\x75\x74\x6f\x50\x6f\x73\x69\x74\x69\x6f\x6e\x69\x6e\x67',
        '\x37\x33\x39\x35\x37\x34\x63\x6c\x78\x6b\x76\x64',
        '\x73\x68\x6f\x77',
        '\x42\x52\x66\x61\x6d',
        '\x5f\x5f\x70\x53\x53\x54\x4d\x6f\x64\x61\x6c\x4d\x6f\x64\x65',
        '\x7a\x73\x55\x75\x69',
        '\x65\x6e\x61\x62\x6c\x65\x4d\x6f\x64\x61\x6c\x4d\x6f\x64\x65',
        '\x63\x6c\x6f\x73\x65\x53\x63\x65\x6e\x65\x50\x72\x6f\x63\x65\x73\x73',
        '\x5f\x6d\x6f\x76\x65\x43\x6c\x6f\x73\x65\x42\x75\x74\x74\x6f\x6e\x54\x6f\x50\x6f\x73\x69\x74\x69\x6f\x6e',
        '\x5f\x70\x72\x65\x6c\x6f\x61\x64\x49\x6d\x61\x67\x65\x73',
        '\x70\x6c\x61\x79\x43\x61\x6e\x63\x65\x6c',
        '\x68\x65\x69\x67\x68\x74',
        '\x43\x68\x61\x6e\x67\x65\x72',
        '\x53\x70\x72\x69\x74\x65',
        '\x42\x75\x74\x74\x6f\x6e\x4d',
        '\x39\x32\x32\x30\x56\x64\x6b\x6c\x73\x77',
        '\x4c\x6f\x61\x64\x42\x69\x74\x6d\x61\x70',
        '\x69\x73\x4e\x65\x65\x64\x43\x6c\x6f\x73\x65\x42\x75\x74\x74\x6f\x6e',
        '\x42\x4d\x6e\x72\x61',
        '\x63\x6c\x65\x61\x72',
        '\x73\x6b\x69\x6c\x6c\x43\x65\x6c\x6c\x4d\x61\x73\x6b\x5f\x42',
        '\x31\x32\x31\x35\x35\x38\x6b\x47\x72\x59\x46\x4e',
        '\x5f\x61\x63\x74\x69\x76\x61\x74\x65\x43\x68\x69\x6c\x64\x72\x65\x6e\x43\x6f\x6e\x74\x65\x6e\x74',
        '\x73\x65\x74\x42\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64\x49\x6d\x61\x67\x65',
        '\x33\x39\x32\x4f\x63\x4f\x66\x6b\x43',
        '\x5f\x63\x72\x65\x61\x74\x65\x42\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64\x49\x6d\x61\x67\x65',
        '\x5f\x63\x72\x65\x61\x74\x65\x43\x6c\x6f\x73\x65\x42\x75\x74\x74\x6f\x6e',
        '\x69\x73\x4d\x6f\x64\x61\x6c\x4d\x6f\x64\x65',
        '\x65\x6e\x61\x62\x6c\x65\x4d\x6f\x64\x61\x6c\x43\x68\x6f\x69\x63\x65',
        '\x5f\x6d\x6f\x64\x61\x6c\x57\x69\x6e\x64\x6f\x77',
        '\x73\x74\x65\x70',
        '\x5f\x73\x68\x6f\x77\x53\x63\x65\x6e\x65\x43\x6f\x6e\x74\x65\x6e\x74\x53\x6c\x6f\x77\x6c\x79',
        '\x63\x6c\x6f\x73\x65\x42\x75\x74\x74\x6f\x6e\x50\x6f\x73\x69\x74\x69\x6f\x6e',
        '\x5f\x75\x70\x64\x61\x74\x65\x4b\x65\x79\x62\x6f\x61\x72\x64\x43\x6c\x6f\x73\x65',
        '\x5f\x6d\x6f\x64\x61\x6c\x43\x68\x6f\x69\x63\x65\x57\x69\x6e\x64\x6f\x77',
        '\x5f\x61\x63\x74\x69\x76\x65\x4d\x6f\x64\x61\x6c\x57\x69\x6e\x64\x6f\x77',
        '\x63\x6c\x6f\x73\x65',
        '\x77\x69\x64\x74\x68',
        '\x63\x6f\x6e\x74\x65\x6e\x74',
        '\x66\x47\x68\x71\x6b',
        '\x5f\x63\x68\x61\x6e\x67\x65\x72\x41',
        '\x77\x61\x72\x6e\x69\x6e\x67',
        '\x61\x64\x64\x43\x68\x69\x6c\x64',
        '\x46\x47\x4c\x72\x4e',
        '\x5f\x70\x42\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64\x49\x6d\x61\x67\x65',
        '\x77\x69\x6e\x64\x6f\x77\x43\x6c\x6f\x73\x65\x42\x75\x74\x74\x6f\x6e',
        '\x33\x31\x39\x38\x37\x32\x75\x68\x75\x61\x73\x6c',
        '\x5f\x73\x68\x6f\x77\x53\x63\x65\x6e\x65\x43\x6f\x6e\x74\x65\x6e\x74\x49\x6e\x73\x74\x61\x6e\x74\x6c\x79',
        '\x64\x6f\x6e\x65',
        '\x5f\x63\x72\x65\x61\x74\x65\x4d\x6f\x64\x61\x6c\x57\x69\x6e\x64\x6f\x77',
        '\x67\x65\x74\x4d\x61\x69\x6e\x53\x63\x65\x6e\x65\x53\x65\x74\x74\x69\x6e\x67\x73',
        '\x62\x69\x74\x6d\x61\x70',
        '\x6e\x65\x65\x64\x73\x43\x61\x6e\x63\x65\x6c\x42\x75\x74\x74\x6f\x6e',
        '\x36\x36\x34\x37\x38\x35\x77\x65\x69\x55\x6f\x6f',
        '\x66\x72\x6f\x6d',
        '\x6a\x44\x77\x59\x74',
        '\x5f\x70\x46\x72\x61\x6d\x65\x49\x6d\x61\x67\x65',
        '\x5f\x75\x70\x64\x61\x74\x65\x43\x6f\x6e\x74\x65\x6e\x74',
        '\x5f\x63\x72\x65\x61\x74\x65\x43\x68\x69\x6c\x64\x72\x65\x6e\x43\x6f\x6e\x74\x65\x6e\x74',
        '\x75\x70\x64\x61\x74\x65',
        '\x69\x73\x43\x61\x6e\x63\x65\x6c',
        '\x5f\x63\x68\x61\x6e\x67\x65\x72\x42',
        '\x73\x74\x61\x72\x74',
        '\x73\x65\x74\x75\x70',
        '\x6f\x6e\x43\x6c\x6f\x73\x65\x42\x75\x74\x74\x6f\x6e\x43\x6c\x69\x63\x6b'
    ];
    _0x5455 = function () {
        return _0x3dc642;
    };
    return _0x5455();
}
PKD_SST_SkillsTreeBase = class PKD_SST_SkillsTreeBase extends Scene_MenuBase {
    constructor() {
        super(...arguments);
    }
    ['\x73\x65\x74\x74\x69\x6e\x67\x73']() {
        var _0x2877e3 = _0x1cbb;
        return PKD_SimpleSkillsTree['\x50\x50'][_0x2877e3(0x1ca)]();
    }
    [_0x545be5(0x1cc)]() {
        return ![];
    }
    ['\x69\x73\x43\x61\x6e\x43\x6c\x6f\x73\x65\x42\x79\x4b\x65\x79\x62\x6f\x61\x72\x64']() {
        return !![];
    }
    [_0x545be5(0x18e)]() {
        return ![];
    }
    [_0x545be5(0x1a9)]() {
        return !![];
    }
    [_0x545be5(0x18a)]() {
        var _0x443215 = _0x545be5;
        return !this[_0x443215(0x1b3)]();
    }
    [_0x545be5(0x1b3)]() {
        var _0x115a03 = _0x545be5;
        return PKD_SimpleSkillsTree[_0x115a03(0x185)]['\x49\x73\x47\x6c\x6f\x62\x61\x6c\x4d\x6f\x64\x61\x6c\x53\x74\x61\x74\x65']();
    }
    ['\x63\x6c\x6f\x73\x65\x42\x75\x74\x74\x6f\x6e\x49\x6d\x61\x67\x65']() {
        var _0x264edb = _0x545be5;
        return _0x264edb(0x1c5);
    }
    ['\x61\x64\x64\x54\x6f\x43\x6f\x6e\x74\x65\x6e\x74'](_0x5e3dc7) {
        var _0x439c5d = _0x545be5;
        return this[_0x439c5d(0x1be)][_0x439c5d(0x1c2)](_0x5e3dc7);
    }
    [_0x545be5(0x1af)](_0x52f2a3) {
        var _0x1c5b58 = _0x545be5;
        return this[_0x1c5b58(0x1c4)]['\x62\x69\x74\x6d\x61\x70'] = ImageManager[_0x1c5b58(0x1d9)](_0x52f2a3);
    }
    [_0x545be5(0x197)]() {
        var _0x59880b = _0x545be5;
        super[_0x59880b(0x197)](), this[_0x59880b(0x18b)](), this[_0x59880b(0x1b1)](), this[_0x59880b(0x18f)](), this[_0x59880b(0x1d2)](), this['\x69\x73\x4e\x65\x65\x64\x43\x6c\x6f\x73\x65\x42\x75\x74\x74\x6f\x6e']() && this['\x5f\x63\x72\x65\x61\x74\x65\x43\x6c\x6f\x73\x65\x42\x75\x74\x74\x6f\x6e'](), this[_0x59880b(0x1c9)](), this[_0x59880b(0x196)]();
    }
    [_0x545be5(0x1b1)]() {
        var _0x578335 = _0x545be5;
        this[_0x578335(0x1c4)] = new Sprite(), this[_0x578335(0x1af)](_0x578335(0x193)), this[_0x578335(0x1c4)][_0x578335(0x1cb)][_0x578335(0x195)]() ? this[_0x578335(0x198)]() : this[_0x578335(0x1c4)]['\x62\x69\x74\x6d\x61\x70'][_0x578335(0x17d)](() => {
            var _0x434692 = _0x578335;
            return _0x434692(0x194) === _0x434692(0x1aa) ? this[_0x434692(0x1c4)][_0x434692(0x1cb)] = _0x577d24['\x6c\x6f\x61\x64\x50\x69\x63\x74\x75\x72\x65\x46\x6f\x72\x53\x69\x6d\x70\x6c\x65\x53\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65'](_0x3dbeee) : this[_0x434692(0x198)]();
        }), this[_0x578335(0x1be)][_0x578335(0x1c2)](this[_0x578335(0x1c4)]);
    }
    [_0x545be5(0x198)]() {
        var _0x47c711 = _0x545be5;
        if (this[_0x47c711(0x1c4)][_0x47c711(0x1bd)] !== Graphics[_0x47c711(0x1bd)] || this[_0x47c711(0x1c4)][_0x47c711(0x1a3)] !== Graphics['\x68\x65\x69\x67\x68\x74'])
            return this[_0x47c711(0x1be)]['\x78'] = Graphics['\x77\x69\x64\x74\x68'] / 0x2 - this[_0x47c711(0x1c4)]['\x77\x69\x64\x74\x68'] / 0x2, this['\x63\x6f\x6e\x74\x65\x6e\x74']['\x79'] = Graphics[_0x47c711(0x1a3)] / 0x2 - this['\x5f\x70\x42\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64\x49\x6d\x61\x67\x65'][_0x47c711(0x1a3)] / 0x2;
    }
    [_0x545be5(0x18f)]() {
        var _0x384a0c = _0x545be5;
        this[_0x384a0c(0x1d0)] = new Sprite(), this[_0x384a0c(0x1d0)][_0x384a0c(0x1cb)] = ImageManager[_0x384a0c(0x1d9)](_0x384a0c(0x187)), this[_0x384a0c(0x1be)][_0x384a0c(0x1c2)](this[_0x384a0c(0x1d0)]);
    }
    [_0x545be5(0x1c9)]() {
        var _0x108626 = _0x545be5;
        this[_0x108626(0x1bb)] = null, this[_0x108626(0x1b5)] = new PKD_SST_ModalWindowSprite();
    }
    [_0x545be5(0x196)]() {
        return this['\x5f\x6d\x6f\x64\x61\x6c\x43\x68\x6f\x69\x63\x65\x57\x69\x6e\x64\x6f\x77'] = new PKD_SST_ModalChoiceList();
    }
    [_0x545be5(0x1d6)]() {
        var _0x238368 = _0x545be5;
        super[_0x238368(0x1d6)](), PKD_SimpleSkillsTree[_0x238368(0x185)][_0x238368(0x1a8)]('\x73\x6b\x69\x6c\x6c\x43\x65\x6c\x6c\x4d\x61\x73\x6b\x5f\x41'), PKD_SimpleSkillsTree[_0x238368(0x185)][_0x238368(0x1a8)](_0x238368(0x1ac)), PKD_SimpleSkillsTree[_0x238368(0x185)]['\x4c\x6f\x61\x64\x42\x69\x74\x6d\x61\x70'](_0x238368(0x18c)), this[_0x238368(0x1a1)](), this['\x69\x73\x53\x68\x6f\x77\x53\x6c\x6f\x77\x6c\x79']() ? this[_0x238368(0x1b7)]() : _0x238368(0x180) === _0x238368(0x180) ? this[_0x238368(0x1c7)]() : this[_0x238368(0x1c4)]['\x62\x69\x74\x6d\x61\x70'][_0x238368(0x17d)](() => {
            return this['\x5f\x72\x65\x66\x72\x65\x73\x68\x53\x63\x65\x6e\x65\x41\x75\x74\x6f\x50\x6f\x73\x69\x74\x69\x6f\x6e\x69\x6e\x67']();
        });
    }
    [_0x545be5(0x1d3)]() {
        var _0x282046 = _0x545be5, _0x4ac71f, _0x328dcb;
        super['\x75\x70\x64\x61\x74\x65'](), (_0x4ac71f = this[_0x282046(0x1c0)]) != null && _0x4ac71f[_0x282046(0x1d3)](), (_0x328dcb = this[_0x282046(0x1d5)]) != null && _0x328dcb['\x75\x70\x64\x61\x74\x65'](), this[_0x282046(0x1d1)](), this[_0x282046(0x1b9)]();
    }
    [_0x545be5(0x1d1)]() {
    }
    ['\x5f\x70\x72\x65\x6c\x6f\x61\x64\x49\x6d\x61\x67\x65\x73']() {
    }
    [_0x545be5(0x1d2)]() {
    }
    ['\x6f\x6e\x43\x6c\x6f\x73\x65\x42\x75\x74\x74\x6f\x6e\x43\x6c\x69\x63\x6b']() {
        var _0x473119 = _0x545be5;
        if (!this[_0x473119(0x18a)]()) {
            if (_0x473119(0x1c3) === '\x46\x47\x4c\x72\x4e')
                return;
            else
                return;
        }
        this['\x63\x6c\x6f\x73\x65\x53\x63\x65\x6e\x65\x50\x72\x6f\x63\x65\x73\x73']();
    }
    [_0x545be5(0x19f)]() {
        var _0x2e466d = _0x545be5;
        return SoundManager[_0x2e466d(0x1a2)](), this['\x70\x6f\x70\x53\x63\x65\x6e\x65']();
    }
    [_0x545be5(0x1b7)]() {
        var _0x219711 = _0x545be5;
        if (this[_0x219711(0x1c0)] != null)
            return;
        this[_0x219711(0x1c0)] = new KDCore[(_0x219711(0x1a4))](this[_0x219711(0x1be)]), this[_0x219711(0x1c0)][_0x219711(0x17c)](_0x219711(0x189))[_0x219711(0x1ce)](0x0)['\x74\x6f'](0xff)[_0x219711(0x1b6)](0x2d), this['\x5f\x63\x68\x61\x6e\x67\x65\x72\x41'][_0x219711(0x1d6)](), this[_0x219711(0x1d5)] = new KDCore[(_0x219711(0x1a4))](this[_0x219711(0x1be)]), this['\x5f\x63\x68\x61\x6e\x67\x65\x72\x42'][_0x219711(0x17c)]('\x79')['\x66\x72\x6f\x6d'](this[_0x219711(0x1be)]['\x79'])['\x74\x6f'](0x0)[_0x219711(0x1b6)](0x7)[_0x219711(0x1c8)](this[_0x219711(0x1c7)]['\x62\x69\x6e\x64'](this)), this[_0x219711(0x1d5)]['\x73\x74\x61\x72\x74']();
    }
    ['\x5f\x73\x68\x6f\x77\x53\x63\x65\x6e\x65\x43\x6f\x6e\x74\x65\x6e\x74\x49\x6e\x73\x74\x61\x6e\x74\x6c\x79']() {
        var _0x10b701 = _0x545be5;
        this[_0x10b701(0x1be)]['\x79'] = 0x0, this[_0x10b701(0x1c0)] = null, this[_0x10b701(0x1d5)] = null, this['\x63\x6f\x6e\x74\x65\x6e\x74']['\x6f\x70\x61\x63\x69\x74\x79'] = 0xff, this[_0x10b701(0x190)]();
    }
    [_0x545be5(0x190)]() {
        var _0x179c78 = _0x545be5;
        return this[_0x179c78(0x1ae)]();
    }
    [_0x545be5(0x1ae)]() {
    }
    [_0x545be5(0x18b)]() {
        var _0x49f5d6 = _0x545be5;
        return this['\x63\x6f\x6e\x74\x65\x6e\x74'] = new KDCore[(_0x49f5d6(0x1a5))](), this[_0x49f5d6(0x1be)][_0x49f5d6(0x189)] = 0x0, this['\x63\x6f\x6e\x74\x65\x6e\x74']['\x79'] = 0x28, this['\x61\x64\x64\x43\x68\x69\x6c\x64'](this[_0x49f5d6(0x1be)]);
    }
    [_0x545be5(0x1b2)]() {
        var _0x3efc08 = _0x545be5;
        this[_0x3efc08(0x181)] = new KDCore[(_0x3efc08(0x1a6))](this[_0x3efc08(0x17e)](), ![], _0x3efc08(0x186)), this[_0x3efc08(0x1be)][_0x3efc08(0x1c2)](this[_0x3efc08(0x181)]), this[_0x3efc08(0x1a0)](), this[_0x3efc08(0x181)]['\x61\x64\x64\x43\x6c\x69\x63\x6b\x48\x61\x6e\x64\x6c\x65\x72'](this[_0x3efc08(0x1d8)][_0x3efc08(0x18d)](this));
    }
    [_0x545be5(0x1a0)]() {
        var _0x4d1fa3 = _0x545be5, _0x10929f, _0x4bc1c2, _0x414820;
        try {
            if (_0x4d1fa3(0x191) !== _0x4d1fa3(0x19b))
                return {
                    x: _0x4bc1c2,
                    y: _0x414820
                } = this['\x73\x65\x74\x74\x69\x6e\x67\x73']()[_0x4d1fa3(0x1b8)], this[_0x4d1fa3(0x181)]['\x6d\x6f\x76\x65'](_0x4bc1c2, _0x414820);
            else
                this[_0x4d1fa3(0x1b2)]();
        } catch (_0x1f0872) {
            return _0x10929f = _0x1f0872, KDCore[_0x4d1fa3(0x1c1)](_0x10929f);
        }
    }
    [_0x545be5(0x19e)](_0x5776e2, _0xa22f39) {
        var _0x5dd2e4 = _0x545be5;
        if (this[_0x5dd2e4(0x1b5)] == null)
            return;
        this[_0x5dd2e4(0x1b5)][_0x5dd2e4(0x1d7)](_0x5776e2, _0xa22f39), this['\x5f\x61\x63\x74\x69\x76\x61\x74\x65\x4d\x6f\x64\x61\x6c\x57\x69\x6e\x64\x6f\x77'](this[_0x5dd2e4(0x1b5)]);
    }
    [_0x545be5(0x188)](_0x515f04) {
        var _0x84cd49 = _0x545be5;
        this['\x5f\x61\x63\x74\x69\x76\x65\x4d\x6f\x64\x61\x6c\x57\x69\x6e\x64\x6f\x77'] = _0x515f04, this[_0x84cd49(0x1bb)][_0x84cd49(0x19a)](), this['\x61\x64\x64\x43\x68\x69\x6c\x64'](this[_0x84cd49(0x1bb)]), $gameTemp[_0x84cd49(0x19c)] = !![];
    }
    [_0x545be5(0x1b4)](_0x55c269, _0x5aaf49) {
        var _0xf6424c = _0x545be5;
        if (this[_0xf6424c(0x1ba)] == null) {
            if (_0xf6424c(0x1bf) === _0xf6424c(0x1cf))
                return !this[_0xf6424c(0x1b3)]();
            else
                return;
        }
        this[_0xf6424c(0x1ba)]['\x73\x65\x74\x75\x70'](_0x55c269, _0x5aaf49), this[_0xf6424c(0x188)](this[_0xf6424c(0x1ba)]);
    }
    [_0x545be5(0x183)]() {
        var _0xb4e839 = _0x545be5;
        $gameTemp[_0xb4e839(0x19c)] = null;
        if (this[_0xb4e839(0x1bb)] == null) {
            if ('\x70\x42\x61\x4b\x52' !== _0xb4e839(0x182))
                return;
            else
                this[_0xb4e839(0x1bb)] = _0x367bb8, this[_0xb4e839(0x1bb)][_0xb4e839(0x19a)](), this['\x61\x64\x64\x43\x68\x69\x6c\x64'](this[_0xb4e839(0x1bb)]), _0x22d8d4[_0xb4e839(0x19c)] = !![];
        }
        this[_0xb4e839(0x1bb)][_0xb4e839(0x1bc)](), this[_0xb4e839(0x1bb)]['\x72\x65\x6d\x6f\x76\x65\x46\x72\x6f\x6d\x50\x61\x72\x65\x6e\x74'](), this[_0xb4e839(0x1bb)] = null;
    }
    ['\x5f\x75\x70\x64\x61\x74\x65\x4b\x65\x79\x62\x6f\x61\x72\x64\x43\x6c\x6f\x73\x65']() {
        var _0x561d76 = _0x545be5;
        if (!this['\x69\x73\x43\x61\x6e\x43\x6c\x6f\x73\x65\x42\x79\x4b\x65\x79\x62\x6f\x61\x72\x64']())
            return;
        if (!this['\x69\x73\x43\x61\x6e\x43\x6c\x6f\x73\x65\x53\x63\x65\x6e\x65']())
            return;
        if (Input[_0x561d76(0x1d4)]()) {
            if (_0x561d76(0x19d) !== _0x561d76(0x19d)) {
                if (!this[_0x561d76(0x18a)]())
                    return;
                this[_0x561d76(0x19f)]();
            } else
                Input[_0x561d76(0x1ab)](), TouchInput[_0x561d76(0x1ab)](), this[_0x561d76(0x1d8)]();
        }
    }
};

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ API.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  window.OpenSkillTreeEditor = function() {
    var e;
    try {
      if (!Utils.isNwjs()) {
        window.alert("Skill Tree Editor Works not works in Browser");
        return;
      }
      $gameTemp.__pSSTModeEditor = 1;
      $gameTemp.__pSSTSelectedSkillTreeCategoryIndex = 0;
      return SceneManager.push(PKD_SST_SillsTreeEditorClassSelect);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  
  // * Тут именно Actor, т.к. в игре мы с Actor работаем, чтобы навыки изучать и забывать
  window.OpenSkillTreeForActor = function(actorId) {
    var actor, classId, e;
    try {
      actor = $gameActors.actor(actorId);
      classId = actor.currentClass().id;
      $gameTemp.__pSSTModeEditor = 0;
      $gameTemp.__pSSTSelectedSkillTreeActorId = actorId;
      $gameTemp.__pSSTEditorSelectedClassId = classId;
      $gameTemp.__pSSTSelectedSkillTreeCategoryIndex = 0;
      SceneManager.push(PKD_SST_SkillsTreeView);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
})();

// ■ END API.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_SimpleSkillsTree.PP;
  
  // * paramName, defaultValue
  _.getLoaderParam = function() {
    var e;
    try {
      if (this._loader == null) {
        PKD_SimpleSkillsTree.LoadPluginSettings();
      }
      return this._loader.getParam(...arguments);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return null;
  };
  _.getSkillPointsPerLevelUpCount = function() {
    return this.getLoaderParam('skillPointsPerLevelUpGain', 1);
  };
  _.isShowCommandInMM = function() {
    return this.getLoaderParam('isShowCmdInMainMenu', true);
  };
  _.getCommandTitle = function() {
    return this.getLoaderParam('cmdTitle', "Skills Tree");
  };
  _.getMainSceneSettings = function() {
    return this.getLoaderParam('mainSceneSettings', {
      appearWithAnimation: true,
      closeButtonPosition: {
        x: 772,
        y: 3
      }
    });
  };
  _.getSkillInfoSettings = function() {
    return this.getLoaderParam('skilInfoWindowSettings', {
      reqColorNotPass: "#f02b1d",
      reqColorPass: "#25e84c",
      previewImgPosition: {
        x: 406,
        y: 402
      },
      statusTextPosition: {
        x: 576,
        y: 142
      }
    });
  };
  _.getGridSettings = function() {
    return this.getLoaderParam('skillsTreeGridSettings', {
      startX: 70,
      startY: 120,
      spaceForCell: 64,
      rows: 7,
      cols: 4
    });
  };
})();


// Generated by CoffeeScript 2.6.1
var PKD_SST_EmptySkillCell;

PKD_SST_EmptySkillCell = class PKD_SST_EmptySkillCell extends KDCore.Sprite {
  constructor(skillData) {
    super();
    this.skillData = skillData;
    this._create();
  }

  isActive() {
    return this._cellBtn.visible === true && !PKD_SimpleSkillsTree.Utils.IsGlobalModalState();
  }

  isHaveData() {
    return this.skillData != null;
  }

  setInGameMode() {
    return this._cellBtn.visible = false;
  }

  setEditorMode() {
    return this._cellBtn.visible = true;
  }

  setIndex(index) {
    this.index = index;
  }

  getIndex() {
    return this.index;
  }

  setClickHandler(_handler) {
    this._handler = _handler;
  }

  setHoverHandler(_hovered) {
    this._hovered = _hovered;
  }

  onHovered() {
    if (!this.isActive()) {
      return;
    }
    if (this._hovered != null) {
      this._hovered(this);
    }
  }

  btn() {
    return this._cellBtn;
  }

  _create() {
    this._createSkillGraphics();
    return this._createButton();
  }

  _createSkillGraphics() {} // * EMPTY

  _createButton() {
    this._cellBtn = PKD_SimpleSkillsTree.Utils.NewButton(this._cellImage(), this._onSlotClick.bind(this));
    this._cellBtn.setManualHover();
    return this.addChild(this._cellBtn);
  }

  _cellImage() {
    return "emptySkillSlot";
  }

  _onSlotClick() {
    if (!this.isActive()) {
      return;
    }
    if (this._handler != null) {
      this._handler(this);
    }
  }

};


// Generated by CoffeeScript 2.6.1
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_SimpleSkillsTree.Utils;
  _.LoadBitmap = function(imageName) {
    return ImageManager.loadPictureForSimpleSkillsTree(imageName);
  };
  _.NewSprite = function(imageName) {
    return new KDCore.Sprite(this.LoadBitmap(imageName));
  };
  _.NewButton = function(imageName, handler = null, isFull = false) {
    var btn;
    btn = new KDCore.ButtonM(imageName, isFull, "pSimpleSkillsTree");
    if (handler != null) {
      btn.addClickHandler(handler);
    }
    return btn;
  };
  _.IsGlobalModalState = function() {
    return $gameTemp.__pSSTModalMode === true;
  };
  _.IsProperScene = function() {
    return SceneManager._scene instanceof PKD_SST_SkillsTreeBase;
  };
  _.RequestModal = function(title, okHandler) {
    var e;
    try {
      if (this.IsProperScene()) {
        return SceneManager._scene.enableModalMode(title, okHandler);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.RequestModalChoice = function(type, selectHandler) {
    var data, e;
    try {
      if (this.IsProperScene()) {
        data = this.GetChoiceDataset(type);
        return SceneManager._scene.enableModalChoice(data, selectHandler);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.GetCurrentClass = function() {
    var e;
    try {
      if (($gameTemp.__pSSTEditorSelectedClassId != null) && $gameTemp.__pSSTEditorSelectedClassId > 0) {
        return $dataClasses[$gameTemp.__pSSTEditorSelectedClassId];
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return null;
  };
  _.GetCurrentData = function() {
    var e;
    try {
      return $gameTemp.__pSSTEditorSelectedClassSTData;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.GetCurrentActor = function() {
    var e;
    try {
      return $gameActors.actor($gameTemp.__pSSTSelectedSkillTreeActorId);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return null;
    }
  };
  _.GetEditableSkillIndex = function() {
    return $gameTemp.__pSSTEditorLinkToIndex;
  };
  _.GetCurrentCategoryData = function() {
    var d, e;
    try {
      d = this.GetCurrentData();
      if (d != null) {
        return d[$gameTemp.__pSSTSelectedSkillTreeCategoryIndex];
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return null;
    }
  };
  _.GetSkillIcon = function(skillId) {
    var e, extraImage, icon, skill;
    try {
      skill = $dataSkills[skillId];
      if (skill == null) {
        return 0;
      }
      extraImage = KDCore.Utils.getValueFromMeta('pImgForST', skill);
      if (String.any(extraImage)) {
        icon = this.LoadBitmap(extraImage);
      } else {
        icon = skill.iconIndex;
      }
      return icon;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return 0;
  };
  _.GetSkillDataIndexBySkillId = function(skillId) {
    var allSkills, e, itemInArray;
    try {
      allSkills = this.GetCurrentCategoryData();
      itemInArray = allSkills.find(function(i) {
        return (i != null) && i.skillId === skillId;
      });
      if (itemInArray != null) {
        return allSkills.indexOf(itemInArray);
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return -1;
  };
  _.GetAllSkillsIndexesPointingTo = function(skillIndex) {
    var data, e, index, j, len, pointers, skillData;
    try {
      data = this.GetCurrentCategoryData();
      pointers = [];
      for (index = j = 0, len = data.length; j < len; index = ++j) {
        skillData = data[index];
        if (skillData == null) {
          continue;
        }
        if ((skillData.links != null) && skillData.links.contains(skillIndex)) {
          pointers.push(index);
        }
      }
      return pointers;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return [];
  };
  _.PrepareDataForWork = function() {
    var classObject, e;
    try {
      classObject = this.GetCurrentClass();
      return $gameTemp.__pSSTEditorSelectedClassSTData = this.GetDataFileForClass(classObject.id);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.PrepareDataForReadOnly = function() {
    var e, id;
    try {
      $gameTemp.__pSSTEditorSelectedClassSTData = null;
      ({id} = this.GetCurrentClass());
      if ($sktJson_STClasses.classesIDsWithSkillsTrees.contains(id)) {
        try {
          $gameTemp.__pSSTEditorSelectedClassSTData = window["$sktJson_ClassTreeData_" + id];
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
      }
      if ($gameTemp.__pSSTEditorSelectedClassSTData == null) {
        return $gameTemp.__pSSTEditorSelectedClassSTData = this.NewClassDataFileContent();
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.IsSkillIsLearned = function(skillData) {
    var actor, e;
    try {
      if (skillData.learnedSwitchId > 0) {
        return KDCore.Utils.isSwitchIsTRUE(skillData.learnedSwitchId);
      } else {
        actor = this.GetCurrentActor();
        return actor.isLearnedSkill(skillData.skillId);
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return false;
    }
  };
  _.IsSkillIsOpenForLearn = function(skillData) {
    var e;
    try {
      return this.IsSkilPassLevelReqr(skillData) && this.IsSkilPassSPReqr(skillData) && this.IsSkilPassSpecialReqr(skillData) && this.IsSkillPassDependencies(skillData);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return false;
    }
  };
  _.IsSkilPassLevelReqr = function(skillData) {
    var e;
    try {
      return this.GetCurrentActor().level >= skillData.reqLevel;
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return false;
    }
  };
  _.IsSkilPassSPReqr = function(skillData) {
    var e;
    try {
      return this.GetCurrentActor().pGetFreeSkillPoints() >= skillData.reqSP;
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return false;
    }
  };
  _.IsSkilPassSpecialReqr = function(skillData) {
    var e;
    try {
      if (skillData.specialConditionSwitchId > 0) {
        return KDCore.Utils.isSwitchIsTRUE(skillData.specialConditionSwitchId);
      } else {
        return true;
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return false;
    }
  };
  _.IsSkillPassDependencies = function(skillData) {
    var data, e, j, len, myIndex, pointers, result, skillIndex;
    try {
      myIndex = this.GetSkillDataIndexBySkillId(skillData.skillId);
      pointers = this.GetAllSkillsIndexesPointingTo(myIndex);
      if (pointers == null) {
        return true;
      }
      if (pointers.length <= 0) {
        return true;
      }
      data = this.GetCurrentCategoryData();
      result = true;
      for (j = 0, len = pointers.length; j < len; j++) {
        skillIndex = pointers[j];
        skillData = data[skillIndex];
        if (!this.IsSkillIsLearned(skillData)) {
          result = false;
          break;
        }
      }
      return result;
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return false;
    }
  };
  _.IsSupportGIF = function() {
    var e;
    try {
      return PKD_SimpleSkillsTree.isPro() && Imported.PKD_VPlayer === true;
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return false;
    }
  };
  _.CallSkillCE = function(skillData) {
    var e, onLerningCE;
    try {
      if (skillData == null) {
        return;
      }
      ({onLerningCE} = skillData);
      return KDCore.Utils.startCE(onLerningCE);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.GetDataFileForClass_dev = function(classId) {
    if ($gameTemp.__tempLocalData == null) {
      $gameTemp.__tempLocalData = {};
    }
    if ($gameTemp.__tempLocalData[classId] != null) {
      return $gameTemp.__tempLocalData[classId];
    } else {
      return this.NewClassDataFileContent();
    }
  };
  _.SaveDataFileForClass_dev = function(classId, data) {
    if ($gameTemp.__tempLocalData == null) {
      $gameTemp.__tempLocalData = {};
    }
    $gameTemp.__tempLocalData[classId] = data;
  };
  _.GetDataFileForClass = function(classId) {
    var data, e, filePath, filename, fs, items;
    try {
      if (!Utils.isNwjs()) {
        console.warn("Required NWJS! Your data not will be saved!");
        return this.GetDataFileForClass_dev(classId);
      }
      fs = require('fs');
      filename = "skillTree_" + classId;
      filePath = './data/PKD_SimpleSkillsTree/Generated/' + filename + '.json';
      if (fs.existsSync(filePath)) {
        data = fs.readFileSync(filePath, 'utf-8');
        console.log("Skills Tree loaded from file");
        return JSON.parse(data);
      } else {
        items = this.NewClassDataFileContent();
        fs.writeFileSync(filePath, JSON.stringify(this.NewClassDataFileContent()));
        console.log("Skills Tree is created");
        return items;
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return this.NewClassDataFileContent();
    }
  };
  _.SaveDataFileForClass = function(classId, data) {
    var e, filePath, filename, fs;
    try {
      if (!Utils.isNwjs()) {
        console.warn("Required NWJS! Your data is not saved!");
        this.SaveDataFileForClass_dev(classId, data);
        return;
      }
      fs = require('fs');
      filename = "skillTree_" + classId;
      filePath = './data/PKD_SimpleSkillsTree/Generated/' + filename + '.json';
      fs.writeFileSync(filePath, JSON.stringify(data));
      console.log("Saving skills tree is done!");
      this.UpdateClassesIdsList(classId);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      window.alert('Error saving skills tree file for class ID ' + classId);
    }
  };
  _.UpdateClassesIdsList = function(classId) {
    var e, filePath, fs;
    try {
      // * UPDATE
      if ($sktJson_STClasses.classesIDsWithSkillsTrees.contains(classId)) {
        return;
      }
      $sktJson_STClasses.classesIDsWithSkillsTrees.push(classId);
      // * WRITE TO FILE
      fs = require('fs');
      filePath = './data/PKD_SimpleSkillsTree/Generated/SkillsTreesClassesIds.json';
      fs.writeFileSync(filePath, JSON.stringify($sktJson_STClasses));
      return console.log("Classes IDs is updated!");
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.GetChoiceDataset = function(type) {
    var data, e, ev, existingData, gif, image, index, isExists, j, k, l, len, len1, len2, len3, len4, m, n, ref, ref1, ref2, skill, sw;
    try {
      data = [];
      switch (type) {
        case "gifs":
          data.push({
            text: "- [None] -",
            value: ""
          });
          ref = this.GetAllGifNames();
          for (j = 0, len = ref.length; j < len; j++) {
            gif = ref[j];
            data.push({
              text: "",
              value: gif
            });
          }
          break;
        case "images":
          data.push({
            text: "- [None] -",
            value: ""
          });
          ref1 = this.GetAllImagesNames();
          for (k = 0, len1 = ref1.length; k < len1; k++) {
            image = ref1[k];
            data.push({
              image: "preview/" + image,
              text: "",
              value: image
            });
          }
          break;
        case 'skills':
          existingData = this.GetCurrentCategoryData();
          for (l = 0, len2 = $dataSkills.length; l < len2; l++) {
            skill = $dataSkills[l];
            if (skill == null) {
              continue;
            }
            if (!String.any(skill.name)) {
              continue;
            }
            if (skill.iconIndex <= 0) {
              continue;
            }
            isExists = existingData.find(function(item) {
              return (item != null) && item.skillId === skill.id;
            });
            if (isExists != null) {
              continue;
            }
            data.push({
              text: skill.name,
              value: skill.id,
              iconIndex: skill.iconIndex
            });
          }
          break;
        case 'commonEvents':
          data.push({
            text: "- [None] -",
            value: 0
          });
          for (m = 0, len3 = $dataCommonEvents.length; m < len3; m++) {
            ev = $dataCommonEvents[m];
            if (ev == null) {
              continue;
            }
            data.push({
              text: ev.name,
              value: ev.id
            });
          }
          break;
        case 'switches':
          data.push({
            text: "- [None] -",
            value: 0
          });
          ref2 = $dataSystem.switches;
          for (index = n = 0, len4 = ref2.length; n < len4; index = ++n) {
            sw = ref2[index];
            if (index === 0) {
              continue;
            }
            data.push({
              text: sw,
              value: index
            });
          }
      }
      return data;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return [];
  };
  _.GetAllGifNames = function() {
    var dirPath, e, f, filenames, files, fs, j, len, path;
    try {
      if (!Utils.isNwjs()) {
        return [];
      }
      fs = require('fs');
      path = require('path');
      dirPath = './movies/';
      files = fs.readdirSync(dirPath);
      filenames = [];
      for (j = 0, len = files.length; j < len; j++) {
        f = files[j];
        if (f.contains('.webm')) {
          filenames.push(f.replace(".webm", ""));
        }
      }
      return filenames;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return [];
  };
  _.GetAllImagesNames = function() {
    var dirPath, e, f, filenames, files, fs, j, len, path;
    try {
      if (!Utils.isNwjs()) {
        return [];
      }
      fs = require('fs');
      path = require('path');
      dirPath = './img/pSimpleSkillsTree/preview/';
      files = fs.readdirSync(dirPath);
      filenames = [];
      for (j = 0, len = files.length; j < len; j++) {
        f = files[j];
        if (f.contains('.png')) {
          filenames.push(f.replace(".png", ""));
        } else if (f.contains('.webp')) {
          filenames.push(f.replace(".webp", ""));
        }
      }
      return filenames;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return [];
  };
  // * array of categories with initial data (array of skills)
  _.NewClassDataFileContent = function() {
    return [[]];
  };
  // * USED IN DEV
  /*
  _.NewClassDataFileContent = () -> [
      [
          {
              skillId: 173, # * choice list
              type: 'A' # * arrows
              links: [4], # * separate editor (plus and minuses)
              extraDescription: null, # * prompt
              reqLevel: 1, # * arrows
              reqSP: 1, # * arrows 
              specialConditionText: "None", # * prompt
              specialConditionSwitchId: 0,  # * choice list
              previewImage: "skillImageExample",  # * choice list
              previewGif: "",  # * choice list
   * * 0 - learn skill, 1 - commonEvent, 2 - both
              onClickActionMode: 0, # * arrows
              onLerningCE: 0, # * Общее событие при изучении навыка  # * choice list
              learnedSwitchId: 0 # * Доп. свитч для статуса выучен  # * choice list
          },
          null,
          {
              skillId: 38,
              type: 'B'
              links: [5],
              extraDescription: "\\C[2]This skill have extra description from Data",
              reqLevel: 1,
              reqSP: 1,
              specialConditionText: "Mage Guild member"
              specialConditionSwitchId: 1,
              previewImage: "",
              previewGif: "",
              onClickActionMode: 0,
              onLerningCE: 0,
              learnedSwitchId: 0
          },
          null,
          {
              skillId: 22,
              type: 'A'
              links: [],
              extraDescription: null,
              reqLevel: 1,
              reqSP: 1,
              specialConditionText: "None"
              specialConditionSwitchId: 0,
              previewImage: "",
              previewGif: "",
              onClickActionMode: 2,
              onLerningCE: 2,
              learnedSwitchId: 0
          },
          {
              skillId: 39,
              type: 'C'
              links: [],
              extraDescription: null,
              reqLevel: 1,
              reqSP: 1,
              specialConditionText: "None"
              specialConditionSwitchId: 0,
              previewImage: "skillImageExample2",
              previewGif: "",
              onClickActionMode: 0,
              onLerningCE: 0,
              learnedSwitchId: 0
          },
          {
              skillId: 58,
              type: 'C'
              links: [],
              extraDescription: null,
              reqLevel: 1,
              reqSP: 5,
              specialConditionText: "None"
              specialConditionSwitchId: 0,
              previewImage: "",
              previewGif: "",
              onClickActionMode: 0,
              onLerningCE: 0,
              learnedSwitchId: 0
          },
          null,
          null,
          null,
          {
              skillId: 41,
              type: 'C'
              links: [],
              extraDescription: null,
              reqLevel: 3,
              reqSP: 1,
              specialConditionText: "None"
              specialConditionSwitchId: 0,
              previewImage: "",
              previewGif: "",
              onClickActionMode: 0,
              onLerningCE: 0,
              learnedSwitchId: 0
          }
      ]
  ] */
  _.NewSkillDataItemContent = function() {
    return {
      skillId: 1,
      type: 'A',
      links: [],
      extraDescription: null,
      reqLevel: 1,
      reqSP: 1,
      specialConditionText: "None",
      specialConditionSwitchId: 0,
      previewImage: "",
      previewGif: "",
      onClickActionMode: 0,
      onLerningCE: 0,
      learnedSwitchId: 0
    };
  };
  _.LoadSkillsTrees = function() {
    var classDataId, e, filename, j, len, ref, results, src;
    try {
      ref = $sktJson_STClasses.classesIDsWithSkillsTrees;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        classDataId = ref[j];
        if (classDataId == null) {
          continue;
        }
        filename = "$sktJson_ClassTreeData_" + classDataId;
        src = "PKD_SimpleSkillsTree/Generated/skillTree_" + classDataId + ".json";
        results.push(DataManager.loadDataFile(filename, src));
      }
      return results;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__loadDataFile, _;
  //@[DEFINES]
  _ = DataManager;
  DataManager._databaseFiles.push({
    name: "$sktJson_ReqLvlText",
    src: "PKD_SimpleSkillsTree/RequirementsLevelText.json"
  }, {
    name: "$sktJson_ReqSpText",
    src: "PKD_SimpleSkillsTree/RequirementsSkillPointsText.json"
  }, {
    name: "$sktJson_ReqScText",
    src: "PKD_SimpleSkillsTree/RequirementsSpecialCondText.json"
  }, {
    name: "$sktJson_SkillDescText",
    src: "PKD_SimpleSkillsTree/SkillDescriptionText.json"
  }, {
    name: "$sktJson_SkillNameText",
    src: "PKD_SimpleSkillsTree/SkillNameText.json"
  }, {
    name: "$sktJson_AvailScText",
    src: "PKD_SimpleSkillsTree/AvailableSkillPointsText.json"
  }, {
    name: "$sktJson_STClasses",
    src: "PKD_SimpleSkillsTree/Generated/SkillsTreesClassesIds.json"
  });
  //@[ALIAS]
  ALIAS__loadDataFile = _.loadDataFile;
  _.loadDataFile = function(name, src) {
    if (src.contains("PKD_SimpleSkillsTree")) {
      src = src.replace("Test_", "");
    }
    return ALIAS__loadDataFile.call(this, name, src);
  };
})();

// ■ END DataManager.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__levelUp, _;
  //@[DEFINES]
  _ = Game_Actor.prototype;
  //@[ALIAS]
  ALIAS__levelUp = _.levelUp;
  _.levelUp = function() {
    var e;
    ALIAS__levelUp.call(this, ...arguments);
    try {
      return this.pAddSkillPoints(PKD_SimpleSkillsTree.PP.getSkillPointsPerLevelUpCount());
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END Game_Actor.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Actor.prototype;
  _.pInitSkillPoints = function() {
    var e, varId;
    try {
      if (this.pSkillPointsVarId == null) {
        varId = KDCore.Utils.getValueFromMeta('pSkillPointsVarId', this.actor());
        if (isFinite(varId)) {
          this.pSkillPointsVarId = Number(varId);
        }
      }
    } catch (error) {
      e = error;
      this.pSkillPointsVarId = null;
      KDCore.warning(e);
    }
  };
  _.pGetFreeSkillPoints = function() {
    var e;
    try {
      if (this.pSkillPointsVarId == null) {
        this.pInitSkillPoints();
      }
      if (this.pSkillPointsVarId > 0) {
        return KDCore.Utils.getVar(this.pSkillPointsVarId);
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return 0;
  };
  _.pAddSkillPoints = function(value) {
    var e;
    try {
      this.pInitSkillPoints();
      if (this.pSkillPointsVarId > 0) {
        return KDCore.Utils.addToVar(this.pSkillPointsVarId, value);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.pPaySkillPoints = function(value) {
    var current, e, newValue;
    try {
      current = this.pGetFreeSkillPoints();
      newValue = current - value;
      if (newValue < 0) {
        newValue = 0;
      }
      if (this.pSkillPointsVarId > 0) {
        return KDCore.Utils.setVar(this.pSkillPointsVarId, newValue);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END Game_Actor.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ImageManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = ImageManager;
  _.loadPictureForSimpleSkillsTree = function(filename) {
    return this.loadBitmap('img/pSimpleSkillsTree/', filename);
  };
})();

// ■ END ImageManager.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
var PKD_SST_EditorSkillCell;

PKD_SST_EditorSkillCell = class PKD_SST_EditorSkillCell extends PKD_SST_EmptySkillCell {
  constructor() {
    super(...arguments);
  }

  _cellImage() {
    var imageName, type;
    ({type} = this.skillData);
    imageName = "skillCell_" + type + "_editor";
    return imageName;
  }

  _createSkillGraphics() {
    var icon, skillId, type;
    ({skillId, type} = this.skillData);
    icon = PKD_SimpleSkillsTree.Utils.GetSkillIcon(skillId);
    this.skillGraphics = new PKD_SST_SkillCellGraphics(type, icon);
    this.mask = this.skillGraphics.getTypeMask();
    this.addChild(this.skillGraphics);
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_SST_GameSkillCell;

PKD_SST_GameSkillCell = class PKD_SST_GameSkillCell extends PKD_SST_EditorSkillCell {
  constructor() {
    super(...arguments);
    this._checkSkillState();
  }

  isValidForAction() {
    return this._myStatus === 1;
  }

  isOpen() {
    return PKD_SimpleSkillsTree.Utils.IsSkillIsOpenForLearn(this.skillData);
  }

  isLearned() {
    return PKD_SimpleSkillsTree.Utils.IsSkillIsLearned(this.skillData);
  }

  //$[OVER]
  _cellImage() {
    var imageName, type;
    ({type} = this.skillData);
    if (this.isLearned()) {
      imageName = "skillCell_" + type + "_active";
    } else if (this.isOpen()) {
      imageName = "skillCell_" + type + "_available";
    } else {
      imageName = "skillCell_" + type + "_editor";
    }
    return imageName;
  }

  _checkSkillState() {
    this._myStatus = 0;
    if (this.isLearned()) {

    } else if (!this.isOpen()) {
      this.skillGraphics.desaturate();
    } else {
      // * GOOD
      this._myStatus = 1;
    }
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_SST_GridLinks;

PKD_SST_GridLinks = class PKD_SST_GridLinks extends KDCore.Sprite {
  constructor(grid) {
    var s;
    super();
    this.grid = grid;
    s = this.grid.settings();
    this.move(s.startX, s.startY);
    this.colCount = s.cols;
    this._drawLinks();
    return;
  }

  _drawLinks() {
    var data, e, i, index, len, link, results, skillData;
    try {
      data = this.grid._skillsSet;
      results = [];
      for (index = i = 0, len = data.length; i < len; index = ++i) {
        skillData = data[index];
        if (skillData == null) {
          continue;
        }
        if (skillData.links == null) {
          continue;
        }
        if (skillData.links.length < 1) {
          continue;
        }
        results.push((function() {
          var j, len1, ref, results1;
          ref = skillData.links;
          results1 = [];
          for (j = 0, len1 = ref.length; j < len1; j++) {
            link = ref[j];
            results1.push(this._drawLink(index, link));
          }
          return results1;
        }).call(this));
      }
      return results;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _drawLink(startIndex, endIndex) {
    var cellA, cellB, circleHead, color, e, lineGraphics, position, x1, x2, y1, y2;
    try {
      if (startIndex >= endIndex) {
        return;
      }
      cellA = this.grid.getCellWithIndex(startIndex);
      cellB = this.grid.getCellWithIndex(endIndex);
      if (cellA.skillData == null) {
        return;
      }
      if (cellB.skillData == null) {
        return;
      }
      ({
        x: x1,
        y: y1
      } = cellA);
      ({
        x: x2,
        y: y2
      } = cellB);
      position = this._compareIndexes(this.colCount, startIndex, endIndex);
      // * Starts From Center Always
      x1 += 24;
      y1 += 24;
      switch (position) {
        case -1:
          x2 += 48;
          break;
        case 0:
          x2 += 24;
      }
      try {
        if (this.grid.isInGameMode()) {
          if (PKD_SimpleSkillsTree.Utils.IsSkillIsLearned(cellA.skillData)) {
            color = 0xcfa425;
          } else {
            color = 0xa7a8a8;
          }
        } else {
          color = 0xcfa425;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        color = 0xcfa425;
      }
      lineGraphics = this._createLine(x1, y1, x2, y2, color);
      circleHead = this._createKnob(x2, y2, color);
      this.addChild(lineGraphics);
      return this.addChild(circleHead);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _createLine(x1, y1, x2, y2, color) {
    var lineGraphics;
    lineGraphics = new PIXI.Graphics();
    lineGraphics.lineStyle(4, color);
    lineGraphics.moveTo(x1, y1);
    lineGraphics.lineTo(x2, y2);
    return lineGraphics;
  }

  _createKnob(x, y, color) {
    var circleHead;
    circleHead = new PIXI.Graphics();
    circleHead.beginFill(color);
    circleHead.drawCircle(0, 0, 6);
    circleHead.endFill();
    circleHead.position.set(x, y);
    return circleHead;
  }

  _compareIndexes(colCount, index1, index2) {
    var j1, j2;
    j1 = index1 % colCount;
    j2 = index2 % colCount;
    if (j1 === j2) {
      return 0;
    } else if (j2 < j1) {
      return -1;
    } else {
      return 1;
    }
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_SST_LazySmartGridSelector;

PKD_SST_LazySmartGridSelector = class PKD_SST_LazySmartGridSelector {
  constructor(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.reset();
    this._selectedCell = null;
    return;
  }

  reset() {
    this.indexIJ = [-1, -1];
    this._lastCursorPosXY = null;
  }

  maxLength() {
    return this.cols * this.rows;
  }

  isActive() {
    return !PKD_SimpleSkillsTree.Utils.IsGlobalModalState() && (this.items != null);
  }

  inKeyboardMode() {
    return this._lastCursorPosXY != null;
  }

  isHaveSelected() {
    return this._selectedCell != null;
  }

  getSelectedIndex() {}

  setupItems(items) {
    this.items = items;
    this.reset();
    return this.selectFirst();
  }

  selectByIndex(index) {
    if (!this.isCanSelect(index)) {
      return;
    }
    this._onHovered(this.items[index]);
  }

  selectFirst() {
    var i, j, ref;
    for (i = j = 0, ref = this.maxLength(); (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      if (this.isCanSelect(i)) {
        this.selectByIndex(i);
        return;
      }
    }
  }

  isCanSelect(index) {
    return (this.items[index] != null) && this.items[index].isActive();
  }

  update() {
    if (!this.isActive()) {
      return;
    }
    if (!this.isHaveSelected()) {
      return;
    }
    if (this.inKeyboardMode()) {
      if (this._isShouldOutFromKeyboardControl()) {
        this._outFromKeyboardControl();
        return;
      }
      this._updateKeyboardControls();
    } else {
      if (this._isShouldInToKeyboardMode()) {
        this._inToKeyboardMode();
        this._updateKeyboardControls();
        return;
      }
      this._updateMouseMode();
    }
  }

  _isShouldOutFromKeyboardControl() {
    return TouchInput.x !== this._lastCursorPosXY.x || TouchInput.y !== this._lastCursorPosXY.y;
  }

  _outFromKeyboardControl() {
    this._lastCursorPosXY = null;
  }

  _updateKeyboardControls() {
    if (Input.isTriggered('up')) {
      this._moveUp();
      Input.clear();
      TouchInput.clear();
    } else if (Input.isTriggered('down')) {
      this._moveDown();
      Input.clear();
      TouchInput.clear();
    } else if (Input.isTriggered('left')) {
      this._moveLeft();
      Input.clear();
      TouchInput.clear();
    } else if (Input.isTriggered('right')) {
      this._moveRight();
      Input.clear();
      TouchInput.clear();
    } else if (Input.isTriggered('ok')) {
      this._pressOnCell();
      Input.clear();
      TouchInput.clear();
    }
  }

  _moveUp() {
    var index;
    if (!this.isHaveSelected()) {
      return;
    }
    index = this._selectedCell.getIndex();
    while (index > 0) {
      index -= this.cols;
      if (this.isCanSelect(index)) {
        this.selectByIndex(index);
        break;
      }
    }
  }

  _moveDown() {
    var index;
    if (!this.isHaveSelected()) {
      return;
    }
    index = this._selectedCell.getIndex();
    while (index < this.maxLength()) {
      index += this.cols;
      if (this.isCanSelect(index)) {
        this.selectByIndex(index);
        break;
      }
    }
  }

  _moveLeft() {
    var index;
    if (!this.isHaveSelected()) {
      return;
    }
    index = this._selectedCell.getIndex();
    while (index > 0) {
      index -= 1;
      if (this.isCanSelect(index)) {
        this.selectByIndex(index);
        break;
      }
    }
  }

  _moveRight() {
    var index;
    if (!this.isHaveSelected()) {
      return;
    }
    index = this._selectedCell.getIndex();
    while (index < this.maxLength()) {
      index += 1;
      if (this.isCanSelect(index)) {
        this.selectByIndex(index);
        break;
      }
    }
  }

  _pressOnCell() {
    var ref;
    if (!this.isActive()) {
      return;
    }
    if ((ref = this._selectedCell) != null) {
      ref.btn().click();
    }
  }

  _isShouldInToKeyboardMode() {
    return Input.isTriggered('up') || Input.isTriggered('down') || Input.isTriggered('left') || Input.isTriggered('right') || Input.isTriggered('ok');
  }

  _inToKeyboardMode() {
    var x, y;
    ({x, y} = TouchInput);
    this._lastCursorPosXY = {x, y};
  }

  _updateMouseMode() {
    var b, i, j, len, ref;
    ref = this.items;
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      if (!i.isActive()) {
        continue;
      }
      b = i.btn();
      if (b.isUnderMouse()) {
        if (!b.isMouseIn()) {
          this._onHovered(i);
          return;
        }
      }
    }
  }

  _onHovered(item) {
    if (this._selectedCell != null) {
      this._selectedCell.btn().setManualSelected(false);
    }
    if (item == null) {
      return;
    }
    item.onHovered();
    this._selectedCell = item;
    this._selectedCell.btn().setManualSelected(true);
    this.indexIJ = KDCore.Utils.getIJByIndexIn2DArray(item.getIndex(), this.cols);
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_SST_LinkEditorSkillCell;

PKD_SST_LinkEditorSkillCell = class PKD_SST_LinkEditorSkillCell extends PKD_SST_EditorSkillCell {
  constructor() {
    super(...arguments);
    this._checkLinkType();
  }

  isValidForAction() {
    return this._myStatus === 1;
  }

  myIndex() {
    return PKD_SimpleSkillsTree.Utils.GetSkillDataIndexBySkillId(this.skillData.skillId);
  }

  myRow() {
    var i;
    [i] = KDCore.Utils.getIJByIndexIn2DArray(this.myIndex(), PKD_SimpleSkillsTree.PP.getGridSettings().cols);
    return i;
  }

  editableRow() {
    var i;
    [i] = KDCore.Utils.getIJByIndexIn2DArray(this.editableIndex(), PKD_SimpleSkillsTree.PP.getGridSettings().cols);
    return i;
  }

  editableIndex() {
    return PKD_SimpleSkillsTree.Utils.GetEditableSkillIndex();
  }

  isEditable() {
    return this.myIndex() === this.editableIndex();
  }

  isNotLinked() {
    var eRow, myRow;
    myRow = this.myRow();
    eRow = this.editableRow();
    return myRow >= eRow;
  }

  //$[OVER]
  _cellImage() {
    var imageName, type;
    ({type} = this.skillData);
    if (this.isEditable()) {
      imageName = "skillCell_" + type + "_active";
    } else if (this.isNotLinked()) {
      imageName = "skillCell_" + type + "_editor";
    } else {
      imageName = "skillCell_" + type + "_available";
    }
    return imageName;
  }

  _checkLinkType() {
    this._myStatus = 0;
    if (this.isEditable()) {
      return this._cellBtn.disable();
    } else if (this.isNotLinked()) {
      this._cellBtn.disable();
      return this.skillGraphics.desaturate();
    } else {
      return this._myStatus = 1;
    }
  }

};

// * Good


// Generated by CoffeeScript 2.6.1
var PKD_SST_ModalChoiceList;

PKD_SST_ModalChoiceList = class PKD_SST_ModalChoiceList extends KDCore.Sprite {
  constructor() {
    super();
    this._create();
    this.close();
  }

  itemsPerPage() {
    return 30;
  }

  isAcitve() {
    return this.visible === true;
  }

  update() {
    super.update();
    if (this.isAcitve()) {
      this._updateKeyboardGamepadControls();
      this._updateMouseScrollControls();
    }
  }

  // [] of { image: "", text: "", value: "" }
  setup(data, selectHandler) {
    this.data = data;
    this.selectHandler = selectHandler;
    if (this.data.length <= this.itemsPerPage()) {
      this._maxPages = 1;
    } else {
      this._maxPages = Math.ceil(this.data.length / this.itemsPerPage());
    }
    this._goToThePage(0);
  }

  dataForListWindow() {
    var count, endIndex, startIndex;
    count = this.itemsPerPage();
    startIndex = count * this._currentPage;
    endIndex = startIndex + count;
    return this.data.slice(startIndex, endIndex);
  }

  show() {
    this.opacity = 0;
    this.visible = true;
    this.appear(40);
  }

  maxPages() {
    return this._maxPages;
  }

  refreshPagesText() {
    var t;
    t = "Page " + (this._currentPage + 1);
    t += " / " + this._maxPages;
    this.titleTextSpr.draw(t);
  }

  close() {
    return this.visible = false;
  }

  _goToThePage(pageIndex) {
    this._currentPage = pageIndex;
    this._createListWindow();
    this.refreshPagesText();
  }

  _create() {
    this._createMain();
    this._createPages();
  }

  _createMain() {
    return this.addChild(PKD_SimpleSkillsTree.Utils.NewSprite('modalEditorChoiceList'));
  }

  _createPages() {
    this._createPageTitleText();
    return this._createArrowButtons();
  }

  _createPageTitleText() {
    var t;
    t = new KDCore.UI.Sprite_UIText({
      visible: true,
      size: {
        w: 260,
        h: 34
      },
      alignment: "center",
      font: {
        face: null,
        size: 16,
        italic: false
      },
      margins: {
        x: 0,
        y: 0
      },
      outline: {
        color: null,
        width: 2
      },
      textColor: "#e7c788"
    });
    t.x = 280;
    t.y = 46;
    this.addChild(t);
    this.titleTextSpr = t;
  }

  _createArrowButtons() {
    this._buttons = new Sprite();
    this.btnR = PKD_SimpleSkillsTree.Utils.NewButton("ra2");
    this.btnR.addClickHandler(this.nextPageClick.bind(this));
    this._buttons.addChild(this.btnR);
    this.btnR.scale.set(0.8);
    this.btnR.move(570, 52);
    this.btnL = PKD_SimpleSkillsTree.Utils.NewButton("la2");
    this.btnL.addClickHandler(this.prevPageClick.bind(this));
    this._buttons.addChild(this.btnL);
    this.btnL.move(220, 52);
    this.btnL.scale.set(0.8);
    this.addChild(this._buttons);
  }

  nextPageClick() {
    if (!this.isAcitve()) {
      return;
    }
    SoundManager.playCursor();
    if (this._currentPage < (this.maxPages() - 1)) {
      return this._goToThePage(this._currentPage + 1);
    } else {
      if (this._currentPage !== 0) {
        return this._goToThePage(0);
      }
    }
  }

  prevPageClick() {
    var max;
    if (!this.isAcitve()) {
      return;
    }
    SoundManager.playCursor();
    if (this._currentPage > 0) {
      this._goToThePage(this._currentPage - 1);
    } else {
      max = this.maxPages() - 1;
      if (this._currentPage !== max) {
        this._goToThePage(max);
      }
    }
  }

  _destroyListWindow() {
    this.removeChild(this._listWindow);
    this._listWindow.hide();
    return this._listWindow = null;
  }

  _choiceListWindowRect() {
    return {
      x: 20,
      y: 76,
      width: 770,
      height: 464
    };
  }

  _createListWindow() {
    var rect;
    if (this._listWindow != null) {
      this._destroyListWindow();
    }
    rect = this._choiceListWindowRect();
    if (KDCore.isMV()) {
      this._listWindow = new PKD_SST_UniversalChoiceListWindow(rect.x, rect.y, rect.width, rect.height);
    } else {
      this._listWindow = new PKD_SST_UniversalChoiceListWindow(rect);
    }
    this._listWindow.setHandler("ok", this._onSelect.bind(this));
    this._listWindow.setHandler("cancel", this._onCancelClick.bind(this));
    this._listWindow.setData(this.dataForListWindow());
    this._listWindow.select(0);
    //@_listWindow.show()
    //@_listWindow.open()
    this._listWindow.activate();
    this.addChild(this._listWindow);
  }

  _onSelect() {
    var e, item;
    if (!this.isAcitve()) {
      return;
    }
    try {
      SoundManager.playCursor();
      try {
        item = this._listWindow.item();
        if (this.selectHandler != null) {
          this.selectHandler(item.value);
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return SceneManager._scene.disableModalMode();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _onCancelClick() {
    var e;
    if (!this.isAcitve()) {
      return;
    }
    try {
      SoundManager.playCancel();
      return SceneManager._scene.disableModalMode();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _updateKeyboardGamepadControls() {
    if (Input.isTriggered('pageup')) {
      this.nextPageClick();
      return Input.clear();
    } else if (Input.isTriggered('pagedown')) {
      this.prevPageClick();
      return Input.clear();
    }
  }

  _updateMouseScrollControls() {
    if (TouchInput.wheelY >= 20) {
      this.nextPageClick();
    }
    if (TouchInput.wheelY <= -20) {
      this.prevPageClick();
    }
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_SST_ModalWindowSprite;

PKD_SST_ModalWindowSprite = class PKD_SST_ModalWindowSprite extends KDCore.Sprite {
  constructor() {
    super();
    this._create();
    this.close();
  }

  isAcitve() {
    return this.visible === true;
  }

  update() {
    super.update();
    if (!this.isAcitve()) {
      return;
    }
    this._updateEscKeyboardKey();
    this._updateEnterKeyboardKey();
  }

  _create() {
    this._createMain();
    this._createTextSpr();
    return this._createButtons();
  }

  _createMain() {
    return this.addChild(PKD_SimpleSkillsTree.Utils.NewSprite('modalWindowMain'));
  }

  _createTextSpr() {
    var t;
    t = new KDCore.UI.Sprite_UIText({
      visible: true,
      size: {
        w: 360,
        h: 40
      },
      alignment: "center",
      font: {
        face: null,
        size: 22,
        italic: false
      },
      margins: {
        x: 0,
        y: 0
      },
      outline: {
        color: null,
        width: 2
      },
      textColor: "#ccc",
      shadow: null
    });
    t.x = 214;
    t.y = 270;
    this.addChild(t);
    this.titleTextSpr = t;
  }

  _createButtons() {
    this._buttons = new Sprite();
    this.btnR = PKD_SimpleSkillsTree.Utils.NewButton("btnNO");
    this.btnR.addClickHandler(this._onCancelClick.bind(this));
    this._buttons.addChild(this.btnR);
    this.btnR.move(396, 336);
    this.btnL = PKD_SimpleSkillsTree.Utils.NewButton("btnOK");
    this.btnL.addClickHandler(this._onOkClick.bind(this));
    this._buttons.addChild(this.btnL);
    this.btnL.move(200, 336);
    this.addChild(this._buttons);
  }

  _onOkClick() {
    var e;
    if (!this.isAcitve()) {
      return;
    }
    try {
      SoundManager.playCursor();
      if (this.okHandler != null) {
        this.okHandler();
      }
      return SceneManager._scene.disableModalMode();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _onCancelClick() {
    var e;
    if (!this.isAcitve()) {
      return;
    }
    try {
      SoundManager.playCancel();
      return SceneManager._scene.disableModalMode();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  setup(text, okHandler) {
    this.okHandler = okHandler;
    return this.titleTextSpr.draw(text);
  }

  show() {
    this.opacity = 0;
    this.visible = true;
    this.appear(40);
  }

  close() {
    return this.visible = false;
  }

  _updateEscKeyboardKey() {
    if (Input.isTriggered('cancel')) {
      this._onCancelClick();
      Input.clear();
    }
  }

  _updateEnterKeyboardKey() {
    if (Input.isTriggered('ok')) {
      this._onOkClick();
      Input.clear();
    }
  }

};


var _0x37360d = _0x3298;
(function (_0x2b9b51, _0x1cead8) {
    var _0x412dea = _0x3298, _0x1d1daa = _0x2b9b51();
    while (!![]) {
        try {
            var _0x328062 = -parseInt(_0x412dea(0x180)) / 0x1 + -parseInt(_0x412dea(0x173)) / 0x2 * (parseInt(_0x412dea(0x15c)) / 0x3) + parseInt(_0x412dea(0x155)) / 0x4 + parseInt(_0x412dea(0x157)) / 0x5 + -parseInt(_0x412dea(0x168)) / 0x6 * (parseInt(_0x412dea(0x177)) / 0x7) + -parseInt(_0x412dea(0x158)) / 0x8 + -parseInt(_0x412dea(0x17e)) / 0x9 * (-parseInt(_0x412dea(0x15d)) / 0xa);
            if (_0x328062 === _0x1cead8)
                break;
            else
                _0x1d1daa['push'](_0x1d1daa['shift']());
        } catch (_0x54ebe7) {
            _0x1d1daa['push'](_0x1d1daa['shift']());
        }
    }
}(_0x505f, 0x6e324));
function _0x505f() {
    var _0x1cc87d = [
        '\x5f\x63\x6c\x61\x73\x73\x49\x6e\x64\x65\x78',
        '\x65\x64\x69\x74\x6f\x72\x43\x6c\x61\x73\x73\x53\x65\x6c\x65\x63\x74',
        '\x31\x32\x33\x30\x33\x34\x30\x73\x56\x6d\x73\x64\x56',
        '\x70\x72\x65\x76\x43\x6c\x61\x73\x73\x43\x6c\x69\x63\x6b',
        '\x31\x37\x31\x35\x30\x33\x35\x68\x6f\x75\x6e\x63\x4a',
        '\x35\x30\x35\x37\x39\x38\x34\x4a\x4a\x56\x76\x5a\x6f',
        '\x77\x69\x64\x74\x68',
        '\x62\x74\x6e\x4c',
        '\x64\x72\x61\x77',
        '\x33\x34\x35\x39\x35\x37\x42\x67\x42\x6e\x50\x72',
        '\x32\x32\x37\x33\x30\x4b\x57\x45\x70\x62\x63',
        '\x62\x74\x6e\x4f\x4b',
        '\x4e\x65\x77\x42\x75\x74\x74\x6f\x6e',
        '\x5f\x63\x6f\x6c\x6c\x65\x63\x74\x43\x6c\x61\x73\x73\x65\x73',
        '\x5f\x61\x63\x74\x69\x76\x61\x74\x65\x43\x68\x69\x6c\x64\x72\x65\x6e\x43\x6f\x6e\x74\x65\x6e\x74',
        '\x63\x75\x72\x72\x65\x6e\x74\x43\x6c\x61\x73\x73',
        '\x5f\x5f\x70\x53\x53\x54\x45\x64\x69\x74\x6f\x72\x53\x65\x6c\x65\x63\x74\x65\x64\x43\x6c\x61\x73\x73\x49\x64',
        '\x5f\x64\x61\x74\x61',
        '\x5b\x4e\x6f\x74\x20\x66\x6f\x75\x6e\x64\x5d',
        '\x55\x76\x64\x54\x50',
        '\x5f\x6f\x6b\x42\x75\x74\x74\x6f\x6e',
        '\x36\x75\x51\x7a\x76\x6e\x4c',
        '\x61\x64\x64\x54\x6f\x43\x6f\x6e\x74\x65\x6e\x74',
        '\x6e\x61\x6d\x65',
        '\x5f\x63\x72\x65\x61\x74\x65\x43\x6c\x61\x73\x73\x65\x73\x4c\x69\x73\x74\x54\x65\x78\x74',
        '\x55\x74\x69\x6c\x73',
        '\x6f\x6e\x4f\x6b\x42\x75\x74\x74\x6f\x6e\x43\x6c\x69\x63\x6b',
        '\x46\x7a\x47\x4d\x51',
        '\x6d\x6f\x76\x65',
        '\x42\x49\x72\x48\x48',
        '\x62\x74\x6e\x52',
        '\x6c\x65\x6e\x67\x74\x68',
        '\x31\x34\x74\x79\x56\x6e\x74\x6f',
        '\x52\x66\x6d\x54\x47',
        '\x63\x58\x7a\x63\x43',
        '\x61\x64\x64\x43\x6c\x69\x63\x6b\x48\x61\x6e\x64\x6c\x65\x72',
        '\x33\x30\x39\x32\x38\x39\x34\x58\x58\x6c\x59\x75\x73',
        '\x23\x30\x30\x30',
        '\x64\x69\x73\x61\x62\x6c\x65',
        '\x5f\x63\x72\x65\x61\x74\x65\x53\x65\x6c\x65\x63\x74\x6f\x72\x73',
        '\x62\x69\x6e\x64',
        '\x69\x77\x70\x6d\x7a',
        '\x20\x28\x69\x64\x3a',
        '\x38\x30\x35\x35\x44\x58\x5a\x50\x79\x45',
        '\x5f\x63\x72\x65\x61\x74\x65\x4f\x6b\x42\x75\x74\x74\x6f\x6e',
        '\x33\x35\x32\x32\x34\x30\x6d\x6e\x71\x41\x7a\x56',
        '\x5f\x72\x65\x66\x72\x65\x73\x68\x43\x75\x72\x72\x65\x6e\x74\x53\x65\x6c\x65\x63\x74\x65\x64\x43\x6c\x61\x73\x73',
        '\x5f\x63\x72\x65\x61\x74\x65\x43\x6c\x61\x73\x73\x53\x65\x6c\x65\x63\x74\x6f\x72\x42\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64\x49\x6d\x61\x67\x65',
        '\x70\x75\x73\x68',
        '\x4e\x54\x70\x43\x49',
        '\x76\x66\x67\x6d\x41',
        '\x79\x48\x6b\x52\x57',
        '\x6e\x65\x78\x74\x43\x6c\x61\x73\x73\x43\x6c\x69\x63\x6b'
    ];
    _0x505f = function () {
        return _0x1cc87d;
    };
    return _0x505f();
}
var PKD_SST_SillsTreeEditorClassSelect;
function _0x3298(_0x4a41bf, _0x462f4a) {
    var _0x505ffc = _0x505f();
    return _0x3298 = function (_0x3298f7, _0x32b5ba) {
        _0x3298f7 = _0x3298f7 - 0x152;
        var _0x412e4f = _0x505ffc[_0x3298f7];
        return _0x412e4f;
    }, _0x3298(_0x4a41bf, _0x462f4a);
}
PKD_SST_SillsTreeEditorClassSelect = class PKD_SST_SillsTreeEditorClassSelect extends PKD_SST_SkillsTreeBase {
    constructor() {
        super(...arguments);
    }
    ['\x5f\x63\x72\x65\x61\x74\x65\x43\x68\x69\x6c\x64\x72\x65\x6e\x43\x6f\x6e\x74\x65\x6e\x74']() {
        var _0x5e2f84 = _0x3298;
        this[_0x5e2f84(0x164)] = [], this['\x5f\x63\x6c\x61\x73\x73\x49\x6e\x64\x65\x78'] = 0x0, this[_0x5e2f84(0x160)](), this[_0x5e2f84(0x182)](), this[_0x5e2f84(0x16b)](), this[_0x5e2f84(0x17a)](), this[_0x5e2f84(0x17f)]();
    }
    ['\x5f\x63\x72\x65\x61\x74\x65\x43\x6c\x61\x73\x73\x53\x65\x6c\x65\x63\x74\x6f\x72\x42\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64\x49\x6d\x61\x67\x65']() {
        var _0x7eb71e = _0x3298;
        return this[_0x7eb71e(0x169)](PKD_SimpleSkillsTree['\x55\x74\x69\x6c\x73']['\x4e\x65\x77\x53\x70\x72\x69\x74\x65'](_0x7eb71e(0x154)));
    }
    ['\x5f\x63\x6f\x6c\x6c\x65\x63\x74\x43\x6c\x61\x73\x73\x65\x73']() {
        var _0x55e9ac = _0x3298, _0x310486, _0x5ceb57, _0x3e38f2;
        for (_0x5ceb57 = 0x0, _0x3e38f2 = $dataClasses['\x6c\x65\x6e\x67\x74\x68']; _0x5ceb57 < _0x3e38f2; _0x5ceb57++) {
            _0x55e9ac(0x16e) !== _0x55e9ac(0x174) ? (_0x310486 = $dataClasses[_0x5ceb57], _0x310486 != null && this[_0x55e9ac(0x164)][_0x55e9ac(0x183)]({
                '\x6e\x61\x6d\x65': _0x310486[_0x55e9ac(0x16a)],
                '\x69\x64': _0x310486['\x69\x64']
            })) : this[_0x55e9ac(0x164)] = null;
        }
        if (this[_0x55e9ac(0x164)][_0x55e9ac(0x172)] === 0x0) {
            if (_0x55e9ac(0x170) !== _0x55e9ac(0x186))
                this[_0x55e9ac(0x164)] = null;
            else {
                if (this[_0x55e9ac(0x164)] == null)
                    return;
                if (this[_0x55e9ac(0x153)] > 0x0)
                    return this[_0x55e9ac(0x153)]--, this[_0x55e9ac(0x181)]();
            }
        }
    }
    ['\x5f\x63\x72\x65\x61\x74\x65\x43\x6c\x61\x73\x73\x65\x73\x4c\x69\x73\x74\x54\x65\x78\x74']() {
        var _0x3ab21a = _0x3298, _0x4c7e7d;
        _0x4c7e7d = new KDCore['\x55\x49']['\x53\x70\x72\x69\x74\x65\x5f\x55\x49\x54\x65\x78\x74']({
            '\x76\x69\x73\x69\x62\x6c\x65': !![],
            '\x73\x69\x7a\x65': {
                '\x77': 0x154,
                '\x68': 0x2a
            },
            '\x61\x6c\x69\x67\x6e\x6d\x65\x6e\x74': '\x63\x65\x6e\x74\x65\x72',
            '\x66\x6f\x6e\x74': {
                '\x66\x61\x63\x65': null,
                '\x73\x69\x7a\x65': 0x1a,
                '\x69\x74\x61\x6c\x69\x63': ![]
            },
            '\x6d\x61\x72\x67\x69\x6e\x73': {
                '\x78': 0x0,
                '\x79': 0x0
            },
            '\x6f\x75\x74\x6c\x69\x6e\x65': {
                '\x63\x6f\x6c\x6f\x72': null,
                '\x77\x69\x64\x74\x68': 0x2
            },
            '\x74\x65\x78\x74\x43\x6f\x6c\x6f\x72': '\x23\x43\x43\x43',
            '\x73\x68\x61\x64\x6f\x77': {
                '\x63\x6f\x6c\x6f\x72': _0x3ab21a(0x178),
                '\x6f\x70\x61\x63\x69\x74\x79': 0xc8,
                '\x6d\x61\x72\x67\x69\x6e\x73': {
                    '\x78': 0x1,
                    '\x79': 0x1
                }
            }
        }), _0x4c7e7d['\x78'] = 0xec, _0x4c7e7d['\x79'] = 0x122, this['\x61\x64\x64\x54\x6f\x43\x6f\x6e\x74\x65\x6e\x74'](_0x4c7e7d), this[_0x3ab21a(0x162)] = _0x4c7e7d;
    }
    [_0x37360d(0x17a)]() {
        var _0x102221 = _0x37360d;
        this[_0x102221(0x171)] = PKD_SimpleSkillsTree['\x55\x74\x69\x6c\x73'][_0x102221(0x15f)]('\x72\x61'), this[_0x102221(0x171)][_0x102221(0x176)](this['\x6e\x65\x78\x74\x43\x6c\x61\x73\x73\x43\x6c\x69\x63\x6b']['\x62\x69\x6e\x64'](this)), this['\x61\x64\x64\x54\x6f\x43\x6f\x6e\x74\x65\x6e\x74'](this['\x62\x74\x6e\x52']), this[_0x102221(0x171)][_0x102221(0x16f)](0x258, 0x11e), this['\x62\x74\x6e\x4c'] = PKD_SimpleSkillsTree['\x55\x74\x69\x6c\x73'][_0x102221(0x15f)]('\x6c\x61'), this[_0x102221(0x15a)]['\x61\x64\x64\x43\x6c\x69\x63\x6b\x48\x61\x6e\x64\x6c\x65\x72'](this['\x70\x72\x65\x76\x43\x6c\x61\x73\x73\x43\x6c\x69\x63\x6b'][_0x102221(0x17b)](this)), this[_0x102221(0x169)](this[_0x102221(0x15a)]), this[_0x102221(0x15a)]['\x6d\x6f\x76\x65'](0xb4, 0x11e);
    }
    [_0x37360d(0x152)]() {
        var _0x8bb2bd = _0x37360d;
        if (this[_0x8bb2bd(0x164)] == null) {
            if (_0x8bb2bd(0x185) !== _0x8bb2bd(0x185))
                return this['\x5f\x72\x65\x66\x72\x65\x73\x68\x43\x75\x72\x72\x65\x6e\x74\x53\x65\x6c\x65\x63\x74\x65\x64\x43\x6c\x61\x73\x73']();
            else
                return;
        }
        if (this[_0x8bb2bd(0x153)] < this[_0x8bb2bd(0x164)]['\x6c\x65\x6e\x67\x74\x68'] - 0x1)
            return this['\x5f\x63\x6c\x61\x73\x73\x49\x6e\x64\x65\x78']++, this[_0x8bb2bd(0x181)]();
    }
    ['\x70\x72\x65\x76\x43\x6c\x61\x73\x73\x43\x6c\x69\x63\x6b']() {
        var _0x27abd2 = _0x37360d;
        if (this[_0x27abd2(0x164)] == null)
            return;
        if (this[_0x27abd2(0x153)] > 0x0) {
            if ('\x70\x72\x41\x49\x59' !== _0x27abd2(0x184))
                return this[_0x27abd2(0x153)]--, this[_0x27abd2(0x181)]();
            else
                this[_0x27abd2(0x171)] = _0x30c3dc[_0x27abd2(0x16c)][_0x27abd2(0x15f)]('\x72\x61'), this[_0x27abd2(0x171)][_0x27abd2(0x176)](this['\x6e\x65\x78\x74\x43\x6c\x61\x73\x73\x43\x6c\x69\x63\x6b']['\x62\x69\x6e\x64'](this)), this[_0x27abd2(0x169)](this[_0x27abd2(0x171)]), this['\x62\x74\x6e\x52'][_0x27abd2(0x16f)](0x258, 0x11e), this[_0x27abd2(0x15a)] = _0x1571ed['\x55\x74\x69\x6c\x73'][_0x27abd2(0x15f)]('\x6c\x61'), this[_0x27abd2(0x15a)]['\x61\x64\x64\x43\x6c\x69\x63\x6b\x48\x61\x6e\x64\x6c\x65\x72'](this[_0x27abd2(0x156)][_0x27abd2(0x17b)](this)), this['\x61\x64\x64\x54\x6f\x43\x6f\x6e\x74\x65\x6e\x74'](this[_0x27abd2(0x15a)]), this[_0x27abd2(0x15a)]['\x6d\x6f\x76\x65'](0xb4, 0x11e);
        }
    }
    ['\x5f\x63\x72\x65\x61\x74\x65\x4f\x6b\x42\x75\x74\x74\x6f\x6e']() {
        var _0x364bee = _0x37360d;
        this[_0x364bee(0x167)] = PKD_SimpleSkillsTree[_0x364bee(0x16c)][_0x364bee(0x15f)](_0x364bee(0x15e)), this[_0x364bee(0x169)](this['\x5f\x6f\x6b\x42\x75\x74\x74\x6f\x6e']), this[_0x364bee(0x167)][_0x364bee(0x16f)](Graphics[_0x364bee(0x159)] / 0x2 - 0x67, 0x190), this[_0x364bee(0x167)][_0x364bee(0x176)](this[_0x364bee(0x16d)]['\x62\x69\x6e\x64'](this));
    }
    [_0x37360d(0x16d)]() {
        var _0x2a4ab6 = _0x37360d;
        $gameTemp[_0x2a4ab6(0x163)] = this[_0x2a4ab6(0x164)][this[_0x2a4ab6(0x153)]]['\x69\x64'], SceneManager['\x67\x6f\x74\x6f'](PKD_SST_SkillsTreeEditor);
    }
    ['\x5f\x72\x65\x66\x72\x65\x73\x68\x43\x75\x72\x72\x65\x6e\x74\x53\x65\x6c\x65\x63\x74\x65\x64\x43\x6c\x61\x73\x73']() {
        var _0x4538d6 = _0x37360d, _0x397a61;
        if (this[_0x4538d6(0x164)] == null) {
            if ('\x55\x76\x64\x54\x50' === _0x4538d6(0x166))
                this[_0x4538d6(0x162)]['\x64\x72\x61\x77'](_0x4538d6(0x165)), this[_0x4538d6(0x167)][_0x4538d6(0x179)]();
            else {
                var _0x38332f, _0x51abdd, _0x5f4304;
                for (_0x51abdd = 0x0, _0x5f4304 = _0x15a5fc[_0x4538d6(0x172)]; _0x51abdd < _0x5f4304; _0x51abdd++) {
                    _0x38332f = _0xae0db[_0x51abdd], _0x38332f != null && this[_0x4538d6(0x164)][_0x4538d6(0x183)]({
                        '\x6e\x61\x6d\x65': _0x38332f[_0x4538d6(0x16a)],
                        '\x69\x64': _0x38332f['\x69\x64']
                    });
                }
                this[_0x4538d6(0x164)][_0x4538d6(0x172)] === 0x0 && (this['\x5f\x64\x61\x74\x61'] = null);
            }
        } else
            _0x4538d6(0x17c) !== _0x4538d6(0x175) ? (_0x397a61 = this[_0x4538d6(0x164)][this[_0x4538d6(0x153)]], this[_0x4538d6(0x162)][_0x4538d6(0x15b)](_0x397a61['\x6e\x61\x6d\x65'] + _0x4538d6(0x17d) + _0x397a61['\x69\x64'] + '\x29')) : (this['\x63\x75\x72\x72\x65\x6e\x74\x43\x6c\x61\x73\x73']['\x64\x72\x61\x77']('\x5b\x4e\x6f\x74\x20\x66\x6f\x75\x6e\x64\x5d'), this[_0x4538d6(0x167)]['\x64\x69\x73\x61\x62\x6c\x65']());
    }
    [_0x37360d(0x161)]() {
        var _0x490664 = _0x37360d;
        return this[_0x490664(0x181)]();
    }
};

// Generated by CoffeeScript 2.6.1
var PKD_SST_SkillCellGraphics;

PKD_SST_SkillCellGraphics = class PKD_SST_SkillCellGraphics extends KDCore.Sprite {
  constructor(type, icon) {
    super();
    this.type = type;
    this.icon = icon;
    this._create();
    this._isHovered = false;
    return;
  }

  isActive() {
    return !PKD_SimpleSkillsTree.Utils.IsGlobalModalState();
  }

  getTypeMask() {
    return this._maskSpr;
  }

  getTypeLetter() {
    return this.type;
  }

  desaturate() {
    this.filters = [new PIXI.filters.ColorMatrixFilter()];
    this.filters[0].desaturate();
  }

  resetDesaturate() {
    this.filters = [];
  }

  _create() {
    this._createIcon();
    return this._createMask();
  }

  _createIcon() {
    this.iconSpr = new KDCore.UI.Sprite_UIIcon({
      visible: true,
      index: 0,
      size: 48,
      rootImageFolder: "pSimpleSkillsTree"
    });
    this.iconSpr.draw(this.icon);
    return this.addChild(this.iconSpr);
  }

  _createHover() {
    this._hover = PKD_SimpleSkillsTree.Utils.NewSprite("skillCell_hovered");
    this._hover.opacity = 0;
    return this.addChild(this._hover);
  }

  _createMask() {
    var imageName;
    imageName = "skillCellMask_" + this.type;
    this._maskSpr = PKD_SimpleSkillsTree.Utils.NewSprite(imageName);
    this.addChild(this._maskSpr);
    this.mask = this._maskSpr;
  }

};


var _0x397790 = _0x43bc;
(function (_0x1e0498, _0x526d69) {
    var _0x10807b = _0x43bc, _0x231f15 = _0x1e0498();
    while (!![]) {
        try {
            var _0x2bacca = -parseInt(_0x10807b(0x224)) / 0x1 + -parseInt(_0x10807b(0x219)) / 0x2 + parseInt(_0x10807b(0x228)) / 0x3 + parseInt(_0x10807b(0x211)) / 0x4 + parseInt(_0x10807b(0x217)) / 0x5 + parseInt(_0x10807b(0x1f5)) / 0x6 * (parseInt(_0x10807b(0x216)) / 0x7) + -parseInt(_0x10807b(0x21b)) / 0x8 * (parseInt(_0x10807b(0x207)) / 0x9);
            if (_0x2bacca === _0x526d69)
                break;
            else
                _0x231f15['push'](_0x231f15['shift']());
        } catch (_0x10eada) {
            _0x231f15['push'](_0x231f15['shift']());
        }
    }
}(_0x1a02, 0x33866));
var PKD_SST_SkillConfiguration;
PKD_SST_SkillConfiguration = class PKD_SST_SkillConfiguration extends PKD_SST_SkillsTreeBase {
    constructor() {
        super(...arguments);
    }
    [_0x397790(0x225)]() {
        return $gameTemp['\x5f\x5f\x70\x53\x53\x54\x45\x64\x69\x74\x61\x62\x6c\x65\x53\x6b\x69\x6c\x6c\x44\x61\x74\x61'][0x2];
    }
    ['\x73\x6b\x69\x6c\x6c\x49\x6e\x64\x65\x78\x49\x6e\x54\x72\x65\x65']() {
        var _0x4bf4d5 = _0x397790;
        return $gameTemp[_0x4bf4d5(0x20a)][0x0];
    }
    ['\x73\x6b\x69\x6c\x6c\x54\x72\x65\x65\x43\x61\x74\x49\x6e\x64\x65\x78']() {
        return $gameTemp['\x5f\x5f\x70\x53\x53\x54\x45\x64\x69\x74\x61\x62\x6c\x65\x53\x6b\x69\x6c\x6c\x44\x61\x74\x61'][0x1];
    }
    ['\x73\x74\x6f\x70']() {
        var _0x372df8 = _0x397790, _0x202340;
        super[_0x372df8(0x1fc)]();
        try {
            if (this['\x5f\x61\x66\x74\x65\x72\x44\x65\x6c\x65\x74\x65\x46\x6c\x61\x67'] !== !![])
                return _0x372df8(0x1fd) === _0x372df8(0x1f8) ? (_0x42e91b = _0x2ee218, _0x5cba9a['\x77\x61\x72\x6e\x69\x6e\x67'](_0x2d8ee7)) : this['\x5f\x73\x61\x76\x65\x44\x61\x74\x61']();
        } catch (_0x22da0b) {
            return _0x372df8(0x20d) === _0x372df8(0x210) ? _0x443417[_0x372df8(0x20a)][0x2] : (_0x202340 = _0x22da0b, KDCore[_0x372df8(0x1f4)](_0x202340));
        }
    }
    [_0x397790(0x223)]() {
        var _0x576cdb = _0x397790;
        this[_0x576cdb(0x221)] = ![], this['\x5f\x70\x72\x65\x70\x61\x72\x65\x44\x61\x74\x61'](), console['\x6c\x6f\x67']('\x53\x54\x41\x52\x54\x20\x45\x44\x49\x54\x3a\x20'), console[_0x576cdb(0x209)](this[_0x576cdb(0x225)]()), this[_0x576cdb(0x226)](), this['\x5f\x63\x72\x65\x61\x74\x65\x44\x65\x6c\x65\x74\x65\x42\x75\x74\x74\x6f\x6e'](), setTimeout(() => {
            var _0x7b00f0 = _0x576cdb;
            if (this[_0x7b00f0(0x225)]()[_0x7b00f0(0x1ef)] <= 0x1)
                return this['\x5f\x73\x6b\x69\x6c\x6c\x54\x6f\x6f\x6c'][_0x7b00f0(0x201)]();
        }, 0xa);
    }
    [_0x397790(0x208)]() {
        var _0x305994 = _0x397790;
        $gameTemp['\x5f\x5f\x70\x53\x53\x54\x53\x61\x76\x65'] = this[_0x305994(0x21c)][_0x305994(0x21e)](this);
    }
    [_0x397790(0x226)]() {
        var _0x423cf1 = _0x397790;
        this[_0x423cf1(0x218)](), this[_0x423cf1(0x1ff)](), this[_0x423cf1(0x21a)](), this['\x5f\x63\x72\x65\x61\x74\x65\x52\x65\x71\x75\x69\x72\x65\x6d\x65\x6e\x74\x73\x45\x64\x69\x74\x54\x6f\x6f\x6c'](), this['\x5f\x63\x72\x65\x61\x74\x65\x50\x72\x65\x76\x69\x65\x77\x45\x64\x69\x74\x54\x6f\x6f\x6c'](), this[_0x423cf1(0x20c)]();
    }
    [_0x397790(0x218)]() {
        var _0x4f705b = _0x397790;
        return this['\x5f\x73\x6b\x69\x6c\x6c\x54\x6f\x6f\x6c'] = new PKD_SST_ToolSkillChoice(this[_0x4f705b(0x225)]()), this['\x5f\x73\x6b\x69\x6c\x6c\x54\x6f\x6f\x6c']['\x6d\x6f\x76\x65'](0x1e, 0x22), this[_0x4f705b(0x1f9)](this[_0x4f705b(0x222)]);
    }
    ['\x5f\x63\x72\x65\x61\x74\x65\x53\x6b\x69\x6c\x6c\x4c\x69\x6e\x6b\x73\x54\x6f\x6f\x6c']() {
        var _0x2159ac = _0x397790;
        return this['\x5f\x73\x6b\x69\x6c\x6c\x4c\x69\x6e\x6b\x73\x54\x6f\x6f\x6c'] = new PKD_SST_ToolSkillLinks(this[_0x2159ac(0x225)]()), this['\x5f\x73\x6b\x69\x6c\x6c\x4c\x69\x6e\x6b\x73\x54\x6f\x6f\x6c'][_0x2159ac(0x1fb)](0x1e, 0xc8), this[_0x2159ac(0x1f9)](this[_0x2159ac(0x20f)]);
    }
    [_0x397790(0x21a)]() {
        var _0x13dd98 = _0x397790;
        this[_0x13dd98(0x215)] = new PKD_SST_ToolSkillDescription(this['\x73\x6b\x69\x6c\x6c\x44\x61\x74\x61']()), this[_0x13dd98(0x215)]['\x6d\x6f\x76\x65'](0x1e, 0x190), this[_0x13dd98(0x1f9)](this[_0x13dd98(0x215)]), this[_0x13dd98(0x222)][_0x13dd98(0x20e)](this[_0x13dd98(0x215)]);
    }
    [_0x397790(0x1f7)]() {
        var _0x248705 = _0x397790;
        this[_0x248705(0x1f6)] = new PKD_SST_ToolSkillRequirements(this[_0x248705(0x225)]()), this['\x5f\x73\x6b\x69\x6c\x6c\x52\x65\x71\x54\x6f\x6f\x6c']['\x6d\x6f\x76\x65'](0x12c, 0x22), this['\x61\x64\x64\x54\x6f\x43\x6f\x6e\x74\x65\x6e\x74'](this['\x5f\x73\x6b\x69\x6c\x6c\x52\x65\x71\x54\x6f\x6f\x6c']);
    }
    ['\x5f\x63\x72\x65\x61\x74\x65\x50\x72\x65\x76\x69\x65\x77\x45\x64\x69\x74\x54\x6f\x6f\x6c']() {
        var _0x4a7fae = _0x397790;
        this['\x5f\x73\x6b\x69\x6c\x6c\x50\x72\x65\x76\x69\x65\x77\x54\x6f\x6f\x6c'] = new PKD_SST_ToolSkillImagePreview(this[_0x4a7fae(0x225)](), {
            '\x78': 0x1a6,
            '\x79': 0x168
        }), this[_0x4a7fae(0x220)][_0x4a7fae(0x1fb)](0x1a4, 0x12c), this[_0x4a7fae(0x1f9)](this[_0x4a7fae(0x220)]);
    }
    [_0x397790(0x20c)]() {
        var _0x2bce20 = _0x397790;
        this['\x5f\x73\x6b\x69\x6c\x6c\x41\x63\x74\x69\x6f\x6e\x54\x6f\x6f\x6c'] = new PKD_SST_ToolSkillAction(this[_0x2bce20(0x225)]()), this[_0x2bce20(0x206)][_0x2bce20(0x1fb)](0x244, 0x22), this[_0x2bce20(0x1f9)](this[_0x2bce20(0x206)]);
    }
    ['\x5f\x63\x72\x65\x61\x74\x65\x44\x65\x6c\x65\x74\x65\x42\x75\x74\x74\x6f\x6e']() {
        var _0x597156 = _0x397790;
        this[_0x597156(0x1f1)] = PKD_SimpleSkillsTree[_0x597156(0x214)]['\x4e\x65\x77\x42\x75\x74\x74\x6f\x6e']('\x62\x74\x6e\x44\x65\x6c\x65\x74\x65'), this[_0x597156(0x1f1)]['\x61\x64\x64\x43\x6c\x69\x63\x6b\x48\x61\x6e\x64\x6c\x65\x72'](this[_0x597156(0x1ee)][_0x597156(0x21e)](this)), this[_0x597156(0x1f1)]['\x6d\x6f\x76\x65'](Graphics[_0x597156(0x1f2)] - 0xc8, Graphics[_0x597156(0x20b)] - 0x38), this[_0x597156(0x1f9)](this['\x62\x74\x6e\x44\x65\x6c\x65\x74\x65']);
    }
    [_0x397790(0x1ee)]() {
        var _0x215ac6 = _0x397790;
        if (this[_0x215ac6(0x200)]())
            return;
        this[_0x215ac6(0x225)]()[_0x215ac6(0x1ef)] >= 0x2 ? PKD_SimpleSkillsTree[_0x215ac6(0x214)]['\x52\x65\x71\x75\x65\x73\x74\x4d\x6f\x64\x61\x6c'](_0x215ac6(0x227), this[_0x215ac6(0x21f)][_0x215ac6(0x21e)](this)) : this[_0x215ac6(0x21f)]();
    }
    [_0x397790(0x21f)]() {
        var _0x121425 = _0x397790, _0x30dbd3, _0xb4699c, _0x49e3ff;
        try {
            if (_0x121425(0x1fe) === _0x121425(0x1fe))
                return SoundManager[_0x121425(0x202)](), this[_0x121425(0x20f)][_0x121425(0x204)](), _0xb4699c = PKD_SimpleSkillsTree[_0x121425(0x214)][_0x121425(0x213)](), _0x30dbd3 = _0xb4699c[this[_0x121425(0x212)]()], _0x30dbd3[this['\x73\x6b\x69\x6c\x6c\x49\x6e\x64\x65\x78\x49\x6e\x54\x72\x65\x65']()] = null, PKD_SimpleSkillsTree['\x55\x74\x69\x6c\x73'][_0x121425(0x1f0)]($gameTemp[_0x121425(0x203)], _0xb4699c), this[_0x121425(0x221)] = !![], this[_0x121425(0x229)]();
            else
                _0x4835d0[_0x121425(0x214)][_0x121425(0x205)](_0x121425(0x227), this[_0x121425(0x21f)][_0x121425(0x21e)](this));
        } catch (_0x59828e) {
            if (_0x121425(0x1f3) === _0x121425(0x1f3))
                return _0x49e3ff = _0x59828e, KDCore[_0x121425(0x1f4)](_0x49e3ff);
            else
                this['\x5f\x73\x6b\x69\x6c\x6c\x41\x63\x74\x69\x6f\x6e\x54\x6f\x6f\x6c'] = new _0x915ae0(this[_0x121425(0x225)]()), this[_0x121425(0x206)][_0x121425(0x1fb)](0x244, 0x22), this[_0x121425(0x1f9)](this[_0x121425(0x206)]);
        }
    }
    [_0x397790(0x21c)]() {
        var _0x243bab = _0x397790, _0x190f3a, _0x69b9fd, _0x2c4dbc;
        try {
            return _0x243bab(0x21d) === _0x243bab(0x21d) ? (_0x69b9fd = PKD_SimpleSkillsTree[_0x243bab(0x214)][_0x243bab(0x213)](), _0x190f3a = _0x69b9fd[this[_0x243bab(0x212)]()], _0x190f3a[this[_0x243bab(0x1fa)]()] = this[_0x243bab(0x225)](), PKD_SimpleSkillsTree[_0x243bab(0x214)][_0x243bab(0x1f0)]($gameTemp[_0x243bab(0x203)], _0x69b9fd)) : this['\x5f\x73\x61\x76\x65\x44\x61\x74\x61']();
        } catch (_0x11b945) {
            return _0x2c4dbc = _0x11b945, KDCore['\x77\x61\x72\x6e\x69\x6e\x67'](_0x2c4dbc);
        }
    }
};
function _0x43bc(_0x211042, _0x14843a) {
    var _0x1a02e5 = _0x1a02();
    return _0x43bc = function (_0x43bcca, _0x3c6944) {
        _0x43bcca = _0x43bcca - 0x1ee;
        var _0xeff4ff = _0x1a02e5[_0x43bcca];
        return _0xeff4ff;
    }, _0x43bc(_0x211042, _0x14843a);
}
function _0x1a02() {
    var _0x30c8cf = [
        '\x73\x74\x6f\x70',
        '\x51\x52\x4c\x55\x63',
        '\x4b\x78\x62\x7a\x74',
        '\x5f\x63\x72\x65\x61\x74\x65\x53\x6b\x69\x6c\x6c\x4c\x69\x6e\x6b\x73\x54\x6f\x6f\x6c',
        '\x69\x73\x4d\x6f\x64\x61\x6c\x4d\x6f\x64\x65',
        '\x61\x63\x74\x69\x76\x61\x74\x65',
        '\x70\x6c\x61\x79\x4f\x6b',
        '\x5f\x5f\x70\x53\x53\x54\x45\x64\x69\x74\x6f\x72\x53\x65\x6c\x65\x63\x74\x65\x64\x43\x6c\x61\x73\x73\x49\x64',
        '\x72\x65\x6d\x6f\x76\x65\x41\x6c\x6c\x4c\x69\x6e\x6b\x73',
        '\x52\x65\x71\x75\x65\x73\x74\x4d\x6f\x64\x61\x6c',
        '\x5f\x73\x6b\x69\x6c\x6c\x41\x63\x74\x69\x6f\x6e\x54\x6f\x6f\x6c',
        '\x31\x36\x32\x39\x48\x4b\x69\x54\x4a\x50',
        '\x5f\x70\x72\x65\x70\x61\x72\x65\x44\x61\x74\x61',
        '\x6c\x6f\x67',
        '\x5f\x5f\x70\x53\x53\x54\x45\x64\x69\x74\x61\x62\x6c\x65\x53\x6b\x69\x6c\x6c\x44\x61\x74\x61',
        '\x68\x65\x69\x67\x68\x74',
        '\x5f\x63\x72\x65\x61\x74\x65\x41\x63\x74\x69\x6f\x6e\x54\x6f\x6f\x6c',
        '\x63\x62\x6d\x53\x50',
        '\x73\x65\x74\x44\x65\x73\x63\x72\x69\x70\x74\x69\x6f\x6e\x54\x6f\x6f\x6c',
        '\x5f\x73\x6b\x69\x6c\x6c\x4c\x69\x6e\x6b\x73\x54\x6f\x6f\x6c',
        '\x52\x43\x7a\x63\x69',
        '\x31\x35\x34\x34\x36\x38\x38\x69\x4e\x68\x64\x64\x47',
        '\x73\x6b\x69\x6c\x6c\x54\x72\x65\x65\x43\x61\x74\x49\x6e\x64\x65\x78',
        '\x47\x65\x74\x43\x75\x72\x72\x65\x6e\x74\x44\x61\x74\x61',
        '\x55\x74\x69\x6c\x73',
        '\x5f\x73\x6b\x69\x6c\x6c\x44\x65\x73\x63\x54\x6f\x6f\x6c',
        '\x31\x33\x31\x31\x35\x34\x38\x74\x71\x6f\x5a\x4a\x6d',
        '\x36\x35\x37\x34\x33\x35\x50\x58\x55\x70\x45\x4c',
        '\x5f\x63\x72\x65\x61\x74\x65\x53\x6b\x69\x6c\x6c\x43\x68\x6f\x69\x63\x65\x54\x6f\x6f\x6c',
        '\x37\x35\x35\x30\x35\x36\x72\x5a\x6f\x6e\x79\x77',
        '\x5f\x63\x72\x65\x61\x74\x65\x53\x6b\x69\x6c\x6c\x44\x65\x73\x63\x45\x64\x69\x74\x54\x6f\x6f\x6c',
        '\x31\x32\x34\x34\x30\x64\x56\x69\x5a\x6c\x77',
        '\x5f\x73\x61\x76\x65\x44\x61\x74\x61',
        '\x50\x69\x52\x79\x6c',
        '\x62\x69\x6e\x64',
        '\x5f\x64\x65\x6c\x65\x74\x65\x44\x61\x74\x61',
        '\x5f\x73\x6b\x69\x6c\x6c\x50\x72\x65\x76\x69\x65\x77\x54\x6f\x6f\x6c',
        '\x5f\x61\x66\x74\x65\x72\x44\x65\x6c\x65\x74\x65\x46\x6c\x61\x67',
        '\x5f\x73\x6b\x69\x6c\x6c\x54\x6f\x6f\x6c',
        '\x5f\x63\x72\x65\x61\x74\x65\x43\x68\x69\x6c\x64\x72\x65\x6e\x43\x6f\x6e\x74\x65\x6e\x74',
        '\x31\x35\x31\x38\x39\x30\x6d\x47\x74\x59\x56\x76',
        '\x73\x6b\x69\x6c\x6c\x44\x61\x74\x61',
        '\x5f\x63\x72\x65\x61\x74\x65\x43\x6f\x6e\x66\x69\x67\x75\x72\x61\x74\x69\x6f\x6e\x49\x74\x65\x6d\x73',
        '\x44\x65\x6c\x65\x74\x65\x20\x73\x6b\x69\x6c\x6c\x20\x66\x72\x6f\x6d\x20\x74\x72\x65\x65\x3f',
        '\x39\x35\x30\x36\x38\x38\x55\x77\x47\x71\x44\x58',
        '\x63\x6c\x6f\x73\x65\x53\x63\x65\x6e\x65\x50\x72\x6f\x63\x65\x73\x73',
        '\x5f\x6f\x6e\x44\x65\x6c\x65\x74\x65\x42\x75\x74\x74\x6f\x6e\x43\x6c\x69\x63\x6b',
        '\x73\x6b\x69\x6c\x6c\x49\x64',
        '\x53\x61\x76\x65\x44\x61\x74\x61\x46\x69\x6c\x65\x46\x6f\x72\x43\x6c\x61\x73\x73',
        '\x62\x74\x6e\x44\x65\x6c\x65\x74\x65',
        '\x77\x69\x64\x74\x68',
        '\x75\x4a\x64\x58\x65',
        '\x77\x61\x72\x6e\x69\x6e\x67',
        '\x36\x46\x71\x65\x43\x5a\x7a',
        '\x5f\x73\x6b\x69\x6c\x6c\x52\x65\x71\x54\x6f\x6f\x6c',
        '\x5f\x63\x72\x65\x61\x74\x65\x52\x65\x71\x75\x69\x72\x65\x6d\x65\x6e\x74\x73\x45\x64\x69\x74\x54\x6f\x6f\x6c',
        '\x73\x4d\x72\x6f\x41',
        '\x61\x64\x64\x54\x6f\x43\x6f\x6e\x74\x65\x6e\x74',
        '\x73\x6b\x69\x6c\x6c\x49\x6e\x64\x65\x78\x49\x6e\x54\x72\x65\x65',
        '\x6d\x6f\x76\x65'
    ];
    _0x1a02 = function () {
        return _0x30c8cf;
    };
    return _0x1a02();
}

// Generated by CoffeeScript 2.6.1
var PKD_SST_SkillInfoWindow;

PKD_SST_SkillInfoWindow = class PKD_SST_SkillInfoWindow extends KDCore.Sprite {
  constructor(skillData1, mode) {
    super();
    this.skillData = skillData1;
    this.mode = mode;
    this._create();
    this.refresh();
  }

  settings() {
    return PKD_SimpleSkillsTree.PP.getSkillInfoSettings();
  }

  update() {
    var ref;
    super.update();
    return (ref = this._drawSkillGIFThread) != null ? ref.update() : void 0;
  }

  destroyInfo() {
    var e;
    this._drawSkillGIFThread = null;
    try {
      if (String.any(this._gifCreated)) {
        window.DeleteVAnim(this._gifCreated);
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    this._gifCreated = null;
  }

  isSupportGIF() {
    return PKD_SimpleSkillsTree.Utils.IsSupportGIF();
  }

  isCreatedForData(skillData) {
    return this.skillData === skillData;
  }

  skillObj() {
    return $dataSkills[this.skillData.skillId];
  }

  refresh() {
    var description, e, name, ref, ref1, ref2;
    //console.log("REFRESH INFO")
    if (this.skillData == null) {
      return;
    }
    try {
      ({name, description} = this.skillObj());
      if ((ref = this.titleTextSpr) != null) {
        ref.draw(name);
      }
      if (String.any(this.skillData.extraDescription)) {
        if ((ref1 = this.descriptionTextSpr) != null) {
          ref1.draw(this.skillData.extraDescription);
        }
      } else {
        if ((ref2 = this.descriptionTextSpr) != null) {
          ref2.draw(description);
        }
      }
      try {
        this._refreshRequirements();
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      this._refreshStatus();
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  }

  _refreshRequirements() {
    var color, notPassColor, passColor, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8;
    if (this.mode !== 'game') {
      if ((ref = this.reqLevelTextSpr) != null) {
        ref.drawText(this.skillData.reqLevel);
      }
      if ((ref1 = this.reqSPTextSpr) != null) {
        ref1.drawText(this.skillData.reqSP);
      }
      if ((ref2 = this.reqSCTextSpr) != null) {
        ref2.drawText(this.skillData.specialConditionText);
      }
    } else {
      if (PKD_SimpleSkillsTree.Utils.IsSkillIsLearned(this.skillData)) {
        if ((ref3 = this.reqLevelTextSpr) != null) {
          ref3.drawText(this.skillData.reqLevel);
        }
        if ((ref4 = this.reqSPTextSpr) != null) {
          ref4.drawText(this.skillData.reqSP);
        }
        if ((ref5 = this.reqSCTextSpr) != null) {
          ref5.drawText(this.skillData.specialConditionText);
        }
      } else {
        notPassColor = this.settings().reqColorNotPass;
        passColor = this.settings().reqColorPass;
        if (PKD_SimpleSkillsTree.Utils.IsSkilPassLevelReqr(this.skillData)) {
          color = passColor;
        } else {
          color = notPassColor;
        }
        if ((ref6 = this.reqLevelTextSpr) != null) {
          ref6.drawTextColor(this.skillData.reqLevel, color);
        }
        if (PKD_SimpleSkillsTree.Utils.IsSkilPassSPReqr(this.skillData)) {
          color = passColor;
        } else {
          color = notPassColor;
        }
        if ((ref7 = this.reqSPTextSpr) != null) {
          ref7.drawTextColor(this.skillData.reqSP, color);
        }
        if (PKD_SimpleSkillsTree.Utils.IsSkilPassSpecialReqr(this.skillData)) {
          color = passColor;
        } else {
          color = notPassColor;
        }
        if ((ref8 = this.reqSCTextSpr) != null) {
          ref8.drawTextColor(this.skillData.specialConditionText, color);
        }
      }
    }
  }

  _refreshStatus() {
    var e, status;
    try {
      if (this._statusSpr == null) {
        return;
      }
      if (this.mode !== "game") {
        status = 3;
      } else {
        if (PKD_SimpleSkillsTree.Utils.IsSkillIsLearned(this.skillData)) {
          status = 1;
        } else if (PKD_SimpleSkillsTree.Utils.IsSkillIsOpenForLearn(this.skillData)) {
          status = 0;
        } else {
          status = 2;
        }
      }
      return this._statusSpr.bitmap = this._statuses[status];
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _create() {
    return this._createMain();
  }

  _createMain() {
    this._createBackgroundMain();
    this._createTopHelpContent();
    return this._createBottomHelpContent();
  }

  _createBackgroundMain() {
    this.addChild(PKD_SimpleSkillsTree.Utils.NewSprite('skillInfoBackground'));
  }

  _createTopHelpContent() {
    this._createStatus();
    if (this.skillData == null) {
      return;
    }
    this._createNameText();
    this._createDescriptionText();
    this._createRequirements();
  }

  _createNameText() {
    var e, t;
    try {
      t = new KDCore.UI.Sprite_UIText($sktJson_SkillNameText.text);
      t.move($sktJson_SkillNameText.position);
      this.addChild(t);
      this.titleTextSpr = t;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _createStatus() {
    var e, p;
    try {
      this._statuses = [PKD_SimpleSkillsTree.Utils.LoadBitmap('skillStatus_opened'), PKD_SimpleSkillsTree.Utils.LoadBitmap('skillStatus_learned'), PKD_SimpleSkillsTree.Utils.LoadBitmap('skillStatus_closed'), PKD_SimpleSkillsTree.Utils.LoadBitmap('skillStatus_editor')];
      this._statusSpr = new KDCore.Sprite();
      this._statusSpr.anchor.x = 0.5;
      p = this.settings().statusTextPosition;
      this._statusSpr.x = p.x;
      this._statusSpr.y = p.y;
      this.addChild(this._statusSpr);
      if (this.mode === "editor") {
        return this._statusSpr.bitmap = this._statuses[3];
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _createDescriptionText() {
    var e, t;
    try {
      t = new KDCore.UI.Sprite_UITextExt($sktJson_SkillDescText.text);
      t.move($sktJson_SkillDescText.position);
      t.opacity = $sktJson_SkillDescText.opacity;
      this.addChild(t);
      this.descriptionTextSpr = t;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  }

  _createRequirements() {
    var e;
    try {
      this._createReqLevelText();
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    try {
      this._createReqSPText();
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    try {
      this._createReqSCText();
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  }

  _createReqLevelText() {
    var t;
    t = new KDCore.UI.Sprite_UIText($sktJson_ReqLvlText.text);
    t.move($sktJson_ReqLvlText.position);
    this.addChild(t);
    this.reqLevelTextSpr = t;
  }

  _createReqSPText() {
    var t;
    t = new KDCore.UI.Sprite_UIText($sktJson_ReqSpText.text);
    t.move($sktJson_ReqSpText.position);
    this.addChild(t);
    this.reqSPTextSpr = t;
  }

  _createReqSCText() {
    var t;
    t = new KDCore.UI.Sprite_UIText($sktJson_ReqScText.text);
    t.move($sktJson_ReqScText.position);
    this.addChild(t);
    this.reqSCTextSpr = t;
  }

  _createBottomHelpContent() {
    this._gifCreated = null;
    if (this.skillData == null) {
      return;
    }
    this._drawSkillImage();
    if (this.isSupportGIF()) {
      this._drawSkillGIF();
    }
  }

  _drawSkillImage() {
    var e;
    if (!String.any(this.skillData.previewImage)) {
      return;
    }
    try {
      this._skillImg = PKD_SimpleSkillsTree.Utils.NewSprite("preview/" + this.skillData.previewImage);
      this.addChild(this._skillImg);
      return this._skillImg.move(this.settings().previewImgPosition);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _drawSkillGIF() {
    if (!String.any(this.skillData.previewGif)) {
      return;
    }
    if (this._drawSkillGIFThread != null) {
      return;
    }
    this._drawSkillGIFThread = new KDCore.TimedUpdate(20, this._drawSkillGifBody.bind(this));
    this._drawSkillGIFThread.once();
  }

  _drawSkillGifBody() {
    var e, gifAnimId, previewGif, skillId, x, y;
    this._drawSkillGIFThread = null;
    try {
      ({skillId, previewGif} = this.skillData);
      ({x, y} = this.settings().previewImgPosition);
      gifAnimId = "skill_" + skillId;
      window.ShowVAnim(gifAnimId, previewGif, x, y, true);
      this._gifCreated = gifAnimId;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  }

};


function _0x4f90(_0x11d847, _0xe87ab5) {
    var _0x55439c = _0x5543();
    return _0x4f90 = function (_0x4f9093, _0x205879) {
        _0x4f9093 = _0x4f9093 - 0x141;
        var _0x139b59 = _0x55439c[_0x4f9093];
        return _0x139b59;
    }, _0x4f90(_0x11d847, _0xe87ab5);
}
function _0x5543() {
    var _0x3eda8d = [
        '\x5f\x63\x72\x65\x61\x74\x65\x47\x72\x69\x64',
        '\x63\x72\x65\x61\x74\x65\x47\x72\x69\x64',
        '\x5f\x64\x65\x73\x74\x72\x6f\x79\x47\x72\x69\x64',
        '\x6c\x69\x6e\x6b',
        '\x6f\x4e\x45\x68\x62',
        '\x69\x73\x49\x6e\x47\x61\x6d\x65\x4d\x6f\x64\x65',
        '\x73\x65\x74\x45\x64\x69\x74\x6f\x72\x4d\x6f\x64\x65',
        '\x38\x31\x33\x33\x30\x33\x39\x63\x78\x55\x64\x65\x6e',
        '\x31\x35\x32\x36\x30\x31\x5a\x6e\x54\x54\x62\x51',
        '\x75\x70\x64\x61\x74\x65',
        '\x5f\x68\x6f\x76\x65\x72\x48\x61\x6e\x64\x6c\x65\x72',
        '\x6d\x6f\x76\x65',
        '\x61\x70\x70\x65\x61\x72',
        '\x6a\x43\x65\x6e\x48',
        '\x73\x65\x74\x49\x6e\x47\x61\x6d\x65\x4d\x6f\x64\x65',
        '\x6c\x69\x6e\x6b\x73\x47\x72\x69\x64',
        '\x5f\x6d\x6f\x64\x65\x54\x79\x70\x65',
        '\x73\x65\x74\x74\x69\x6e\x67\x73',
        '\x53\x70\x72\x69\x74\x65',
        '\x5f\x63\x72\x65\x61\x74\x65\x4c\x69\x6e\x6b\x73',
        '\x76\x69\x73\x69\x62\x6c\x65',
        '\x37\x36\x35\x34\x36\x38\x38\x42\x7a\x76\x6a\x58\x51',
        '\x55\x74\x69\x6c\x73',
        '\x5f\x63\x72\x65\x61\x74\x65\x47\x72\x69\x64\x43\x65\x6c\x6c',
        '\x72\x65\x6d\x6f\x76\x65\x46\x72\x6f\x6d\x50\x61\x72\x65\x6e\x74',
        '\x63\x68\x69\x6c\x64\x72\x65\x6e',
        '\x36\x31\x39\x34\x39\x30\x71\x76\x6a\x47\x41\x69',
        '\x66\x69\x6e\x64',
        '\x67\x61\x6d\x65',
        '\x5a\x63\x75\x51\x6a',
        '\x67\x65\x74\x49\x6e\x64\x65\x78\x49\x6e\x32\x44\x41\x72\x72\x61\x79\x42\x79\x49\x4a',
        '\x67\x65\x74\x49\x6e\x64\x65\x78',
        '\x5f\x64\x65\x73\x74\x72\x6f\x79\x4c\x69\x6e\x6b\x73',
        '\x69\x73\x41\x63\x74\x69\x76\x65',
        '\x67\x72\x69\x64',
        '\x5f\x63\x6f\x6e\x74\x72\x6f\x6c\x73',
        '\x5f\x63\x72\x65\x61\x74\x65\x47\x61\x6d\x65\x43\x65\x6c\x6c',
        '\x5a\x76\x68\x55\x62',
        '\x45\x6c\x45\x4f\x42',
        '\x61\x64\x64\x43\x68\x69\x6c\x64',
        '\x31\x31\x33\x30\x36\x33\x37\x30\x70\x74\x62\x6b\x72\x6f',
        '\x5f\x63\x72\x65\x61\x74\x65\x4c\x69\x6e\x6b\x43\x65\x6c\x6c',
        '\x5f\x73\x6b\x69\x6c\x6c\x73\x53\x65\x74',
        '\x32\x30\x59\x42\x4b\x6b\x7a\x5a',
        '\x32\x39\x39\x37\x32\x34\x66\x70\x72\x59\x62\x4f',
        '\x73\x65\x74\x43\x6c\x69\x63\x6b\x48\x61\x6e\x64\x6c\x65\x72',
        '\x67\x65\x74\x43\x65\x6c\x6c\x57\x69\x74\x68\x49\x6e\x64\x65\x78',
        '\x33\x37\x30\x38\x30\x38\x39\x4d\x47\x76\x62\x50\x48',
        '\x67\x65\x74\x47\x72\x69\x64\x53\x65\x74\x74\x69\x6e\x67\x73',
        '\x35\x32\x50\x51\x63\x68\x70\x73',
        '\x77\x73\x43\x55\x6e',
        '\x6e\x4e\x54\x6d\x55',
        '\x73\x74\x61\x72\x74\x58',
        '\x5f\x68\x61\x6e\x64\x6c\x65\x72',
        '\x73\x74\x61\x72\x74\x59',
        '\x31\x32\x4e\x49\x44\x45\x78\x52',
        '\x5f\x64\x72\x61\x77\x4c\x69\x6e\x6b\x73'
    ];
    _0x5543 = function () {
        return _0x3eda8d;
    };
    return _0x5543();
}
var _0x20a5a4 = _0x4f90;
(function (_0x4decbf, _0x57c993) {
    var _0x33056a = _0x4f90, _0x1e7e92 = _0x4decbf();
    while (!![]) {
        try {
            var _0x52189b = -parseInt(_0x33056a(0x171)) / 0x1 + parseInt(_0x33056a(0x176)) / 0x2 * (parseInt(_0x33056a(0x14d)) / 0x3) + -parseInt(_0x33056a(0x170)) / 0x4 * (parseInt(_0x33056a(0x15f)) / 0x5) + parseInt(_0x33056a(0x143)) / 0x6 * (parseInt(_0x33056a(0x174)) / 0x7) + -parseInt(_0x33056a(0x15a)) / 0x8 + -parseInt(_0x33056a(0x14c)) / 0x9 + parseInt(_0x33056a(0x16d)) / 0xa;
            if (_0x52189b === _0x57c993)
                break;
            else
                _0x1e7e92['push'](_0x1e7e92['shift']());
        } catch (_0xf020f6) {
            _0x1e7e92['push'](_0x1e7e92['shift']());
        }
    }
}(_0x5543, 0xb2ef0));
var PKD_SST_SkillsGrid;
PKD_SST_SkillsGrid = class PKD_SST_SkillsGrid extends KDCore['\x53\x70\x72\x69\x74\x65'] {
    constructor() {
        var _0x154b8c = _0x4f90, _0x2c8a20, _0x4c2c5d;
        super(), {
            rows: _0x4c2c5d,
            cols: _0x2c8a20
        } = this['\x73\x65\x74\x74\x69\x6e\x67\x73'](), this[_0x154b8c(0x168)] = new PKD_SST_LazySmartGridSelector(_0x2c8a20, _0x4c2c5d);
    }
    ['\x75\x70\x64\x61\x74\x65']() {
        var _0x4a15e8 = _0x4f90;
        return super[_0x4a15e8(0x14e)](), this[_0x4a15e8(0x168)][_0x4a15e8(0x14e)]();
    }
    [_0x20a5a4(0x166)]() {
        var _0x5f2361 = _0x20a5a4;
        return this[_0x5f2361(0x167)] != null;
    }
    [_0x20a5a4(0x14a)]() {
        var _0x5d22f0 = _0x20a5a4;
        return this['\x5f\x6d\x6f\x64\x65\x54\x79\x70\x65'] === _0x5d22f0(0x161);
    }
    [_0x20a5a4(0x146)](_0x5d7995, _0x428603) {
        var _0x504581 = _0x20a5a4;
        this[_0x504581(0x155)] = _0x5d7995, this[_0x504581(0x16f)] = _0x428603, this[_0x504581(0x147)](), this['\x5f\x64\x65\x73\x74\x72\x6f\x79\x4c\x69\x6e\x6b\x73']();
        if (this[_0x504581(0x16f)] == null)
            return;
        this[_0x504581(0x158)](), this[_0x504581(0x145)](), this[_0x504581(0x144)]();
    }
    [_0x20a5a4(0x172)](_0x57d2bd) {
        var _0x3dd255 = _0x20a5a4;
        this[_0x3dd255(0x141)] = _0x57d2bd;
    }
    ['\x73\x65\x74\x48\x6f\x76\x65\x72\x48\x61\x6e\x64\x6c\x65\x72'](_0x4afd9f) {
        this['\x5f\x68\x6f\x76\x65\x72\x48\x61\x6e\x64\x6c\x65\x72'] = _0x4afd9f;
    }
    [_0x20a5a4(0x173)](_0x2a5ee4) {
        var _0x5ca0d7 = _0x20a5a4;
        return this['\x67\x72\x69\x64'][_0x5ca0d7(0x15e)][_0x5ca0d7(0x160)](function (_0xb534cc) {
            var _0x139ec1 = _0x5ca0d7;
            return _0xb534cc[_0x139ec1(0x164)]() === _0x2a5ee4;
        });
    }
    [_0x20a5a4(0x156)]() {
        var _0x3f940c = _0x20a5a4;
        return PKD_SimpleSkillsTree['\x50\x50'][_0x3f940c(0x175)]();
    }
    [_0x20a5a4(0x147)]() {
        var _0x10922f = _0x20a5a4;
        if (this['\x67\x72\x69\x64'] == null) {
            if (_0x10922f(0x177) !== _0x10922f(0x16b))
                return;
            else {
                var _0x465912, _0x59020d;
                return _0x59020d = this[_0x10922f(0x16f)][_0x4c100d], _0x59020d != null ? _0x465912 = new _0x40939d(_0x59020d) : (_0x465912 = new _0x112d55(), _0x465912[_0x10922f(0x14b)]()), _0x465912;
            }
        }
        this[_0x10922f(0x167)][_0x10922f(0x159)] = ![], this[_0x10922f(0x167)][_0x10922f(0x15d)](), this[_0x10922f(0x167)] = null;
    }
    [_0x20a5a4(0x165)]() {
        var _0x293340 = _0x20a5a4;
        if (this[_0x293340(0x154)] == null)
            return;
        this['\x6c\x69\x6e\x6b\x73\x47\x72\x69\x64'][_0x293340(0x159)] = ![], this[_0x293340(0x154)][_0x293340(0x15d)](), this[_0x293340(0x154)] = null;
    }
    ['\x5f\x63\x72\x65\x61\x74\x65\x4c\x69\x6e\x6b\x73']() {
        var _0x181ae5 = _0x20a5a4;
        return this[_0x181ae5(0x154)] = new KDCore[(_0x181ae5(0x157))](), this[_0x181ae5(0x154)][_0x181ae5(0x151)](0x19), this[_0x181ae5(0x16c)](this[_0x181ae5(0x154)]);
    }
    [_0x20a5a4(0x145)]() {
        var _0x53fed4 = _0x20a5a4, _0x31cd4c, _0x2feae5, _0x261028, _0x5cef5f, _0x1c483c, _0x839498, _0x5cbb85, _0x2980a7, _0x182d8d, _0x284ea3, _0xa612bd, _0x19ca60;
        _0xa612bd = this[_0x53fed4(0x156)](), this[_0x53fed4(0x167)] = new KDCore[(_0x53fed4(0x157))](), this[_0x53fed4(0x167)][_0x53fed4(0x150)](_0xa612bd[_0x53fed4(0x179)], _0xa612bd[_0x53fed4(0x142)]), this['\x67\x72\x69\x64'][_0x53fed4(0x151)](0x32), this[_0x53fed4(0x16c)](this['\x67\x72\x69\x64']), {
            rows: _0x284ea3,
            cols: _0x2feae5,
            spaceForCell: _0x19ca60
        } = _0xa612bd;
        for (_0x261028 = _0x839498 = 0x0, _0x2980a7 = _0x284ea3; 0x0 <= _0x2980a7 ? _0x839498 < _0x2980a7 : _0x839498 > _0x2980a7; _0x261028 = 0x0 <= _0x2980a7 ? ++_0x839498 : --_0x839498) {
            if (_0x53fed4(0x152) !== _0x53fed4(0x178))
                for (_0x1c483c = _0x5cbb85 = 0x0, _0x182d8d = _0x2feae5; 0x0 <= _0x182d8d ? _0x5cbb85 < _0x182d8d : _0x5cbb85 > _0x182d8d; _0x1c483c = 0x0 <= _0x182d8d ? ++_0x5cbb85 : --_0x5cbb85) {
                    _0x5cef5f = KDCore[_0x53fed4(0x15b)][_0x53fed4(0x163)](_0x261028, _0x1c483c, _0x2feae5), _0x31cd4c = this[_0x53fed4(0x15c)](_0x5cef5f);
                    if (_0x31cd4c == null) {
                        if ('\x45\x71\x45\x52\x4d' !== '\x45\x71\x45\x52\x4d')
                            this[_0x53fed4(0x14f)] = _0xcb9410;
                        else
                            continue;
                    }
                    _0x31cd4c['\x73\x65\x74\x49\x6e\x64\x65\x78'](_0x5cef5f), _0x31cd4c['\x73\x65\x74\x43\x6c\x69\x63\x6b\x48\x61\x6e\x64\x6c\x65\x72'](this[_0x53fed4(0x141)]), _0x31cd4c['\x73\x65\x74\x48\x6f\x76\x65\x72\x48\x61\x6e\x64\x6c\x65\x72'](this['\x5f\x68\x6f\x76\x65\x72\x48\x61\x6e\x64\x6c\x65\x72']), _0x31cd4c[_0x53fed4(0x150)](_0x19ca60 * _0x1c483c, _0x19ca60 * _0x261028), this[_0x53fed4(0x167)][_0x53fed4(0x16c)](_0x31cd4c);
                }
            else
                _0x493697 = new _0x5cf266(_0x100317);
        }
        this['\x5f\x63\x6f\x6e\x74\x72\x6f\x6c\x73']['\x73\x65\x74\x75\x70\x49\x74\x65\x6d\x73'](this[_0x53fed4(0x167)][_0x53fed4(0x15e)]);
    }
    [_0x20a5a4(0x15c)](_0x50385a) {
        var _0x5db886 = _0x20a5a4;
        switch (this[_0x5db886(0x155)]) {
        case '\x65\x64\x69\x74\x6f\x72':
            return this['\x5f\x63\x72\x65\x61\x74\x65\x45\x64\x69\x74\x6f\x72\x43\x65\x6c\x6c'](_0x50385a);
        case _0x5db886(0x161):
            return this[_0x5db886(0x169)](_0x50385a);
        case _0x5db886(0x148):
            return this[_0x5db886(0x16e)](_0x50385a);
        }
        return null;
    }
    ['\x5f\x63\x72\x65\x61\x74\x65\x45\x64\x69\x74\x6f\x72\x43\x65\x6c\x6c'](_0x18ae07) {
        var _0x2efe00 = _0x20a5a4, _0x4f1f7a, _0x4930f7;
        _0x4930f7 = this[_0x2efe00(0x16f)][_0x18ae07];
        if (_0x4930f7 != null)
            _0x4f1f7a = new PKD_SST_EditorSkillCell(_0x4930f7);
        else {
            if ('\x72\x74\x5a\x44\x68' !== _0x2efe00(0x16a))
                _0x4f1f7a = new PKD_SST_EmptySkillCell(), _0x4f1f7a['\x73\x65\x74\x45\x64\x69\x74\x6f\x72\x4d\x6f\x64\x65']();
            else {
                var _0x449cf3, _0x5d043a;
                return _0x5d043a = this['\x5f\x73\x6b\x69\x6c\x6c\x73\x53\x65\x74'][_0x1f00ae], _0x5d043a != null ? _0x449cf3 = new _0x1a1676(_0x5d043a) : (_0x449cf3 = new _0x33f6c8(), _0x449cf3['\x73\x65\x74\x49\x6e\x47\x61\x6d\x65\x4d\x6f\x64\x65']()), _0x449cf3;
            }
        }
        return _0x4f1f7a;
    }
    ['\x5f\x63\x72\x65\x61\x74\x65\x47\x61\x6d\x65\x43\x65\x6c\x6c'](_0xe2a5cc) {
        var _0x11684f, _0x40b69c;
        return _0x40b69c = this['\x5f\x73\x6b\x69\x6c\x6c\x73\x53\x65\x74'][_0xe2a5cc], _0x40b69c != null ? _0x11684f = new PKD_SST_GameSkillCell(_0x40b69c) : (_0x11684f = new PKD_SST_EmptySkillCell(), _0x11684f['\x73\x65\x74\x49\x6e\x47\x61\x6d\x65\x4d\x6f\x64\x65']()), _0x11684f;
    }
    [_0x20a5a4(0x16e)](_0xf9a274) {
        var _0x175d19 = _0x20a5a4, _0x524708, _0x4c6aa0;
        _0x4c6aa0 = this['\x5f\x73\x6b\x69\x6c\x6c\x73\x53\x65\x74'][_0xf9a274];
        if (_0x4c6aa0 != null)
            _0x524708 = new PKD_SST_LinkEditorSkillCell(_0x4c6aa0);
        else {
            if (_0x175d19(0x162) !== _0x175d19(0x149))
                _0x524708 = new PKD_SST_EmptySkillCell(), _0x524708[_0x175d19(0x153)]();
            else
                return _0x3bcf2['\x50\x50'][_0x175d19(0x175)]();
        }
        return _0x524708;
    }
    [_0x20a5a4(0x144)]() {
        return this['\x6c\x69\x6e\x6b\x73\x47\x72\x69\x64']['\x61\x64\x64\x43\x68\x69\x6c\x64'](new PKD_SST_GridLinks(this));
    }
};

var _0x20a3b2 = _0x1190;
function _0x1190(_0x27e368, _0x47cb24) {
    var _0x4821cd = _0x4821();
    return _0x1190 = function (_0x119008, _0x29c9b0) {
        _0x119008 = _0x119008 - 0xbe;
        var _0x3d8145 = _0x4821cd[_0x119008];
        return _0x3d8145;
    }, _0x1190(_0x27e368, _0x47cb24);
}
(function (_0x1d56fc, _0x4f6c1e) {
    var _0xf9fb32 = _0x1190, _0x5e1386 = _0x1d56fc();
    while (!![]) {
        try {
            var _0x698041 = parseInt(_0xf9fb32(0xc0)) / 0x1 + parseInt(_0xf9fb32(0xf0)) / 0x2 * (-parseInt(_0xf9fb32(0xef)) / 0x3) + parseInt(_0xf9fb32(0xe9)) / 0x4 + parseInt(_0xf9fb32(0xed)) / 0x5 * (-parseInt(_0xf9fb32(0xdb)) / 0x6) + parseInt(_0xf9fb32(0xd4)) / 0x7 + -parseInt(_0xf9fb32(0xcc)) / 0x8 + parseInt(_0xf9fb32(0xc6)) / 0x9;
            if (_0x698041 === _0x4f6c1e)
                break;
            else
                _0x5e1386['push'](_0x5e1386['shift']());
        } catch (_0x3ca499) {
            _0x5e1386['push'](_0x5e1386['shift']());
        }
    }
}(_0x4821, 0x9da35));
var PKD_SST_SkillsTreeEditor;
function _0x4821() {
    var _0x30215e = [
        '\x5f\x5f\x70\x53\x53\x54\x45\x64\x69\x74\x61\x62\x6c\x65\x53\x6b\x69\x6c\x6c\x44\x61\x74\x61',
        '\x62\x69\x6e\x64',
        '\x66\x69\x6c\x74\x65\x72',
        '\x70\x6c\x61\x79\x42\x75\x7a\x7a\x65\x72',
        '\x6c\x65\x6e\x67\x74\x68',
        '\x77\x61\x72\x6e\x69\x6e\x67',
        '\x35\x39\x37\x39\x34\x32\x31\x68\x4c\x46\x76\x52\x74',
        '\x5f\x5f\x70\x53\x53\x54\x53\x65\x6c\x65\x63\x74\x65\x64\x53\x6b\x69\x6c\x6c\x54\x72\x65\x65\x43\x61\x74\x65\x67\x6f\x72\x79\x49\x6e\x64\x65\x78',
        '\x53\x74\x61\x72\x74\x20\x65\x64\x69\x74\x20\x53\x6b\x69\x6c\x6c\x73\x20\x54\x72\x65\x65\x73\x20\x66\x6f\x72\x20',
        '\x46\x59\x62\x52\x4a',
        '\x79\x6c\x75\x66\x56',
        '\x65\x65\x77\x70\x76',
        '\x6c\x6f\x67',
        '\x33\x35\x32\x30\x33\x30\x32\x6c\x53\x72\x43\x78\x46',
        '\x6d\x6b\x79\x6e\x4d',
        '\x73\x65\x74\x43\x6c\x69\x63\x6b\x48\x61\x6e\x64\x6c\x65\x72',
        '\x5f\x63\x72\x65\x61\x74\x65\x43\x68\x69\x6c\x64\x72\x65\x6e\x43\x6f\x6e\x74\x65\x6e\x74',
        '\x5f\x73\x74\x61\x72\x74\x45\x64\x69\x74\x53\x6b\x69\x6c\x6c',
        '\x57\x42\x50\x67\x70',
        '\x72\x65\x66\x72\x65\x73\x68',
        '\x5f\x63\x72\x65\x61\x74\x65\x53\x6b\x69\x6c\x6c\x49\x6e\x66\x6f\x57\x69\x6e\x64\x6f\x77',
        '\x4f\x5a\x4b\x57\x6c',
        '\x73\x65\x6c\x65\x63\x74\x43\x61\x74\x65\x67\x6f\x72\x79',
        '\x73\x6b\x69\x6c\x6c\x44\x61\x74\x61',
        '\x67\x65\x74\x49\x6e\x64\x65\x78',
        '\x5f\x72\x65\x66\x72\x65\x73\x68\x53\x6b\x69\x6c\x6c\x73\x49\x6e\x66\x6f\x57\x69\x6e\x64\x6f\x77',
        '\x5f\x6f\x6e\x53\x6b\x69\x6c\x6c\x43\x65\x6c\x6c\x43\x6c\x69\x63\x6b',
        '\x32\x30\x37\x31\x39\x36\x34\x62\x62\x6c\x47\x64\x6b',
        '\x65\x64\x69\x74\x6f\x72',
        '\x73\x65\x74\x48\x6f\x76\x65\x72\x48\x61\x6e\x64\x6c\x65\x72',
        '\x6a\x41\x47\x70\x66',
        '\x35\x71\x43\x48\x70\x46\x52',
        '\x63\x72\x65\x61\x74\x65\x47\x72\x69\x64',
        '\x36\x32\x36\x35\x34\x31\x44\x55\x53\x6b\x64\x77',
        '\x36\x68\x58\x4d\x4c\x6b\x64',
        '\x4c\x6f\x61\x64\x53\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65\x73',
        '\x73\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65\x43\x61\x74\x65\x67\x6f\x72\x69\x65\x73',
        '\x6e\x61\x6d\x65',
        '\x5f\x6f\x6e\x53\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65\x43\x61\x74\x65\x67\x6f\x72\x79\x43\x68\x61\x6e\x67\x65\x64',
        '\x69\x73\x43\x72\x65\x61\x74\x65\x64\x46\x6f\x72\x44\x61\x74\x61',
        '\x64\x65\x73\x74\x72\x6f\x79\x49\x6e\x66\x6f',
        '\x61\x79\x48\x53\x45',
        '\x6a\x67\x53\x45\x65',
        '\x70\x6c\x61\x79\x43\x75\x72\x73\x6f\x72',
        '\x5f\x63\x72\x65\x61\x74\x65\x53\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65\x47\x72\x69\x64',
        '\x76\x69\x73\x69\x62\x6c\x65',
        '\x47\x65\x74\x43\x75\x72\x72\x65\x6e\x74\x44\x61\x74\x61',
        '\x69\x73\x50\x72\x6f',
        '\x5f\x63\x72\x65\x61\x74\x65\x53\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65\x43\x61\x74\x4d\x61\x6e\x61\x67\x65\x54\x6f\x6f\x6c\x73',
        '\x73\x65\x74\x75\x70\x43\x61\x6c\x6c\x62\x61\x63\x6b',
        '\x61\x64\x64\x54\x6f\x43\x6f\x6e\x74\x65\x6e\x74',
        '\x47\x65\x74\x43\x75\x72\x72\x65\x6e\x74\x43\x6c\x61\x73\x73',
        '\x37\x38\x32\x36\x30\x39\x7a\x76\x75\x63\x7a\x50',
        '\x58\x4d\x6a\x57\x62',
        '\x73\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65\x47\x72\x69\x64',
        '\x5f\x63\x72\x65\x61\x74\x65\x53\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65\x43\x61\x74\x65\x67\x6f\x72\x69\x65\x73',
        '\x73\x74\x6f\x70',
        '\x61\x6c\x65\x72\x74',
        '\x32\x39\x38\x37\x37\x30\x33\x74\x66\x57\x75\x67\x6e',
        '\x73\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65\x44\x61\x74\x61',
        '\x73\x65\x74\x75\x70\x43\x61\x74\x65\x67\x6f\x72\x69\x65\x73\x43\x6f\x75\x6e\x74',
        '\x5f\x69\x6e\x66\x6f\x57\x69\x6e\x64\x6f\x77',
        '\x5f\x6f\x6e\x53\x6b\x69\x6c\x6c\x43\x65\x6c\x6c\x48\x6f\x76\x65\x72\x65\x64',
        '\x55\x74\x69\x6c\x73',
        '\x35\x30\x32\x32\x36\x31\x36\x41\x50\x6b\x61\x70\x7a',
        '\x69\x77\x79\x56\x6a'
    ];
    _0x4821 = function () {
        return _0x30215e;
    };
    return _0x4821();
}
PKD_SST_SkillsTreeEditor = class PKD_SST_SkillsTreeEditor extends PKD_SST_SkillsTreeBase {
    constructor() {
        super();
    }
    [_0x20a3b2(0xc4)]() {
        var _0x566e22 = _0x20a3b2, _0xcc884b;
        super[_0x566e22(0xc4)]();
        try {
            return PKD_SimpleSkillsTree[_0x566e22(0xcb)][_0x566e22(0xf1)]();
        } catch (_0x4e7046) {
            return _0xcc884b = _0x4e7046, KDCore[_0x566e22(0xd3)](_0xcc884b);
        }
    }
    [_0x20a3b2(0xde)]() {
        var _0x5e1e10 = _0x20a3b2, _0x2e48ca;
        _0x2e48ca = $gameTemp[_0x5e1e10(0xd5)], this['\x5f\x70\x72\x65\x70\x61\x72\x65\x43\x6c\x61\x73\x73\x44\x61\x74\x61'](), this[_0x5e1e10(0xfa)](), this['\x5f\x63\x72\x65\x61\x74\x65\x53\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65\x43\x61\x74\x65\x67\x6f\x72\x69\x65\x73'](), this[_0x5e1e10(0xfe)](), setTimeout(() => {
            var _0x4dfe7c = _0x5e1e10;
            if ('\x65\x65\x77\x70\x76' === _0x4dfe7c(0xd9)) {
                if (_0x2e48ca !== $gameTemp[_0x4dfe7c(0xd5)])
                    return this[_0x4dfe7c(0xf2)][_0x4dfe7c(0xe4)](_0x2e48ca);
            } else
                return this['\x73\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65\x43\x61\x74\x65\x67\x6f\x72\x69\x65\x73'][_0x4dfe7c(0xe4)](_0x4712fa);
        }, 0xa);
    }
    ['\x63\x6c\x61\x73\x73\x4f\x62\x6a\x65\x63\x74']() {
        var _0x2decd1 = _0x20a3b2;
        return PKD_SimpleSkillsTree[_0x2decd1(0xcb)][_0x2decd1(0xbf)]();
    }
    ['\x73\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65\x44\x61\x74\x61']() {
        var _0x5cb2ce = _0x20a3b2;
        return PKD_SimpleSkillsTree[_0x5cb2ce(0xcb)]['\x47\x65\x74\x43\x75\x72\x72\x65\x6e\x74\x44\x61\x74\x61']();
    }
    ['\x5f\x70\x72\x65\x70\x61\x72\x65\x43\x6c\x61\x73\x73\x44\x61\x74\x61']() {
        var _0x23ca28 = _0x20a3b2;
        PKD_SimpleSkillsTree[_0x23ca28(0xcb)]['\x50\x72\x65\x70\x61\x72\x65\x44\x61\x74\x61\x46\x6f\x72\x57\x6f\x72\x6b'](), console[_0x23ca28(0xda)](_0x23ca28(0xd6) + this['\x63\x6c\x61\x73\x73\x4f\x62\x6a\x65\x63\x74']()[_0x23ca28(0xf3)]);
    }
    [_0x20a3b2(0xf4)](_0x143e0c) {
        var _0x284dfd = _0x20a3b2;
        $gameTemp[_0x284dfd(0xd5)] = _0x143e0c, this[_0x284dfd(0xc2)][_0x284dfd(0xee)]('\x65\x64\x69\x74\x6f\x72', this[_0x284dfd(0xc7)]()[_0x143e0c]);
    }
    [_0x20a3b2(0xc3)]() {
        var _0x2d119a = _0x20a3b2;
        return this[_0x2d119a(0xf2)] = new PKD_SST_TreesCategories(), this[_0x2d119a(0xf2)][_0x2d119a(0xff)](this[_0x2d119a(0xf4)]['\x62\x69\x6e\x64'](this)), this['\x73\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65\x43\x61\x74\x65\x67\x6f\x72\x69\x65\x73'][_0x2d119a(0xc8)](this[_0x2d119a(0xc7)]()[_0x2d119a(0xd2)]), this[_0x2d119a(0xbe)](this['\x73\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65\x43\x61\x74\x65\x67\x6f\x72\x69\x65\x73']);
    }
    [_0x20a3b2(0xfe)]() {
        return this['\x73\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65\x43\x61\x74\x65\x67\x6f\x72\x69\x65\x73\x54\x6f\x6f\x6c'] = new PKD_SST_ToolTCManager(), this['\x73\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65\x43\x61\x74\x65\x67\x6f\x72\x69\x65\x73\x54\x6f\x6f\x6c']['\x6c\x69\x6e\x6b\x54\x6f\x43\x61\x74\x65\x67\x6f\x72\x69\x65\x73'](this['\x73\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65\x43\x61\x74\x65\x67\x6f\x72\x69\x65\x73']), this['\x61\x64\x64\x54\x6f\x43\x6f\x6e\x74\x65\x6e\x74'](this['\x73\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65\x43\x61\x74\x65\x67\x6f\x72\x69\x65\x73\x54\x6f\x6f\x6c']);
    }
    ['\x5f\x63\x72\x65\x61\x74\x65\x53\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65\x47\x72\x69\x64']() {
        var _0x54ed7f = _0x20a3b2;
        return this[_0x54ed7f(0xc2)] = new PKD_SST_SkillsGrid(), this[_0x54ed7f(0xc2)][_0x54ed7f(0xdd)](this['\x5f\x6f\x6e\x53\x6b\x69\x6c\x6c\x43\x65\x6c\x6c\x43\x6c\x69\x63\x6b'][_0x54ed7f(0xcf)](this)), this[_0x54ed7f(0xc2)][_0x54ed7f(0xeb)](this['\x5f\x6f\x6e\x53\x6b\x69\x6c\x6c\x43\x65\x6c\x6c\x48\x6f\x76\x65\x72\x65\x64'][_0x54ed7f(0xcf)](this)), this[_0x54ed7f(0xbe)](this[_0x54ed7f(0xc2)]);
    }
    [_0x20a3b2(0xe8)](_0x187e94) {
        var _0x53a7fa = _0x20a3b2, _0x58530c, _0x58a81e, _0x1cf6f4, _0x5dc8e9;
        if (_0x187e94 == null)
            return;
        try {
            _0x58530c = _0x187e94[_0x53a7fa(0xe6)]();
            if (!PKD_SimpleSkillsTree[_0x53a7fa(0xfd)]()) {
                _0x58a81e = PKD_SimpleSkillsTree[_0x53a7fa(0xcb)]['\x47\x65\x74\x43\x75\x72\x72\x65\x6e\x74\x43\x61\x74\x65\x67\x6f\x72\x79\x44\x61\x74\x61'](), _0x5dc8e9 = _0x58a81e[_0x53a7fa(0xd0)](function (_0x38dfd9) {
                    var _0x1c194d = _0x53a7fa;
                    return _0x1c194d(0xd8) === _0x1c194d(0xcd) ? _0x1d453a[_0x1c194d(0xcb)][_0x1c194d(0xf1)]() : _0x38dfd9 != null;
                }), _0x58530c = _0x187e94['\x67\x65\x74\x49\x6e\x64\x65\x78']();
                if (_0x5dc8e9[_0x53a7fa(0xd2)] >= 0xe && !(_0x58a81e[_0x58530c] != null)) {
                    SoundManager[_0x53a7fa(0xd1)](), window[_0x53a7fa(0xc5)]('\x42\x41\x53\x49\x43\x20\x76\x65\x72\x73\x69\x6f\x6e\x20\x73\x75\x70\x70\x6f\x72\x74\x73\x20\x6f\x6e\x6c\x79\x20\x6d\x61\x78\x20\x31\x34\x20\x73\x6b\x69\x6c\x6c\x73\x20\x69\x6e\x20\x74\x72\x65\x65\x21');
                    return;
                }
            }
            SoundManager[_0x53a7fa(0xf9)](), this[_0x53a7fa(0xdf)](_0x187e94[_0x53a7fa(0xe6)]());
        } catch (_0x4b7cd7) {
            _0x1cf6f4 = _0x4b7cd7, KDCore[_0x53a7fa(0xd3)](_0x1cf6f4);
        }
    }
    [_0x20a3b2(0xdf)](_0x5a8fe2) {
        var _0x434695 = _0x20a3b2, _0x227652, _0x539aac, _0x2c78ff, _0x2c72a8;
        try {
            if ($gameTemp[_0x434695(0xd5)] == null) {
                if ('\x41\x48\x63\x56\x55' === '\x48\x4b\x78\x59\x79')
                    return _0xcefa8e[_0x434695(0xcb)][_0x434695(0xbf)]();
                else
                    $gameTemp[_0x434695(0xd5)] = 0x0;
            }
            _0x227652 = $gameTemp['\x5f\x5f\x70\x53\x53\x54\x53\x65\x6c\x65\x63\x74\x65\x64\x53\x6b\x69\x6c\x6c\x54\x72\x65\x65\x43\x61\x74\x65\x67\x6f\x72\x79\x49\x6e\x64\x65\x78'], _0x539aac = this[_0x434695(0xc7)]()[_0x227652];
            if (_0x539aac == null)
                return;
            _0x2c72a8 = _0x539aac[_0x5a8fe2];
            if (_0x2c72a8 == null) {
                if (_0x434695(0xd7) === _0x434695(0xdc)) {
                    if (this[_0x434695(0xc9)][_0x434695(0xf5)](_0xb7b626)) {
                        this[_0x434695(0xc9)][_0x434695(0xe1)]();
                        return;
                    }
                } else
                    _0x2c72a8 = PKD_SimpleSkillsTree[_0x434695(0xcb)]['\x4e\x65\x77\x53\x6b\x69\x6c\x6c\x44\x61\x74\x61\x49\x74\x65\x6d\x43\x6f\x6e\x74\x65\x6e\x74']();
            }
            return $gameTemp[_0x434695(0xce)] = [
                _0x5a8fe2,
                _0x227652,
                _0x2c72a8
            ], SceneManager['\x70\x75\x73\x68'](PKD_SST_SkillConfiguration);
        } catch (_0x473afd) {
            return _0x434695(0xc1) !== _0x434695(0xe0) ? (_0x2c78ff = _0x473afd, KDCore[_0x434695(0xd3)](_0x2c78ff)) : _0x316c55['\x55\x74\x69\x6c\x73'][_0x434695(0xfc)]();
        }
    }
    [_0x20a3b2(0xca)](_0x555027) {
        var _0x4c81a4 = _0x20a3b2;
        return this[_0x4c81a4(0xe7)](_0x555027[_0x4c81a4(0xe5)]);
    }
    ['\x5f\x72\x65\x66\x72\x65\x73\x68\x53\x6b\x69\x6c\x6c\x73\x49\x6e\x66\x6f\x57\x69\x6e\x64\x6f\x77'](_0x5a7b49) {
        var _0xa91bc7 = _0x20a3b2, _0x25b485;
        try {
            if (_0xa91bc7(0xf8) !== _0xa91bc7(0xf7)) {
                if (this[_0xa91bc7(0xc9)] != null) {
                    if (this['\x5f\x69\x6e\x66\x6f\x57\x69\x6e\x64\x6f\x77'][_0xa91bc7(0xf5)](_0x5a7b49)) {
                        if ('\x72\x47\x51\x6a\x68' === _0xa91bc7(0xe3))
                            return _0x10ced1 = _0x421e9f, _0x3616e2['\x77\x61\x72\x6e\x69\x6e\x67'](_0x2f8cac);
                        else {
                            this['\x5f\x69\x6e\x66\x6f\x57\x69\x6e\x64\x6f\x77'][_0xa91bc7(0xe1)]();
                            return;
                        }
                    }
                }
                return this[_0xa91bc7(0xe2)](_0x5a7b49);
            } else
                return _0x351f57 = _0x44c00a, _0x1c03b6[_0xa91bc7(0xd3)](_0x1261df);
        } catch (_0xada8f0) {
            return _0x25b485 = _0xada8f0, KDCore[_0xa91bc7(0xd3)](_0x25b485);
        }
    }
    ['\x5f\x63\x72\x65\x61\x74\x65\x53\x6b\x69\x6c\x6c\x49\x6e\x66\x6f\x57\x69\x6e\x64\x6f\x77'](_0x3064a3) {
        var _0x2bb7ca = _0x20a3b2, _0x1d5439;
        try {
            this[_0x2bb7ca(0xc9)] != null && (this[_0x2bb7ca(0xc9)][_0x2bb7ca(0xfb)] = ![], this['\x5f\x69\x6e\x66\x6f\x57\x69\x6e\x64\x6f\x77'][_0x2bb7ca(0xf6)](), this[_0x2bb7ca(0xc9)]['\x72\x65\x6d\x6f\x76\x65\x46\x72\x6f\x6d\x50\x61\x72\x65\x6e\x74']()), this['\x5f\x69\x6e\x66\x6f\x57\x69\x6e\x64\x6f\x77'] = new PKD_SST_SkillInfoWindow(_0x3064a3, _0x2bb7ca(0xea)), this[_0x2bb7ca(0xbe)](this[_0x2bb7ca(0xc9)]);
        } catch (_0x237fc3) {
            if (_0x2bb7ca(0xec) === _0x2bb7ca(0xec))
                _0x1d5439 = _0x237fc3, KDCore[_0x2bb7ca(0xd3)](_0x1d5439);
            else
                return _0x274000 != null;
        }
    }
};

var _0x4f07c7 = _0x512d;
function _0x2c72() {
    var _0x2482b1 = [
        '\x73\x65\x74\x75\x70\x43\x61\x74\x65\x67\x6f\x72\x69\x65\x73\x43\x6f\x75\x6e\x74',
        '\x72\x65\x66\x72\x65\x73\x68',
        '\x47\x65\x74\x43\x75\x72\x72\x65\x6e\x74\x41\x63\x74\x6f\x72',
        '\x5f\x5f\x70\x53\x53\x54\x53\x65\x6c\x65\x63\x74\x65\x64\x53\x6b\x69\x6c\x6c\x54\x72\x65\x65\x43\x61\x74\x65\x67\x6f\x72\x79\x49\x6e\x64\x65\x78',
        '\x31\x39\x31\x32\x36\x36\x31\x30\x66\x59\x65\x4f\x52\x74',
        '\x31\x34\x34\x39\x31\x35\x35\x5a\x6b\x59\x70\x6a\x46',
        '\x53\x75\x67\x66\x7a',
        '\x73\x65\x74\x43\x6c\x69\x63\x6b\x48\x61\x6e\x64\x6c\x65\x72',
        '\x75\x70\x64\x61\x74\x65',
        '\x55\x74\x69\x6c\x73',
        '\x73\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65\x43\x61\x74\x65\x67\x6f\x72\x69\x65\x73',
        '\x32\x37\x37\x37\x34\x62\x64\x6b\x41\x61\x77',
        '\x72\x65\x6d\x6f\x76\x65\x46\x72\x6f\x6d\x50\x61\x72\x65\x6e\x74',
        '\x5f\x63\x72\x65\x61\x74\x65\x43\x68\x69\x6c\x64\x72\x65\x6e\x43\x6f\x6e\x74\x65\x6e\x74',
        '\x67\x61\x6d\x65',
        '\x5f\x63\x72\x65\x61\x74\x65\x53\x6b\x69\x6c\x6c\x49\x6e\x66\x6f\x57\x69\x6e\x64\x6f\x77',
        '\x6c\x69\x73\x74',
        '\x36\x39\x36\x33\x39\x32\x6d\x54\x54\x71\x6e\x56',
        '\x39\x39\x36\x36\x37\x38\x32\x6b\x7a\x75\x75\x63\x77',
        '\x6f\x50\x78\x6a\x53',
        '\x41\x59\x51\x4d\x70',
        '\x31\x33\x32\x39\x32\x39\x35\x65\x59\x75\x5a\x62\x70',
        '\x4b\x72\x6b\x6f\x71',
        '\x6c\x6e\x4b\x4c\x44',
        '\x5f\x61\x63\x74\x69\x76\x61\x74\x65\x53\x6b\x69\x6c\x6c',
        '\x34\x39\x32\x72\x75\x4c\x57\x74\x65',
        '\x69\x73\x56\x61\x6c\x69\x64\x46\x6f\x72\x41\x63\x74\x69\x6f\x6e',
        '\x5f\x6f\x6e\x53\x6b\x69\x6c\x6c\x43\x65\x6c\x6c\x48\x6f\x76\x65\x72\x65\x64',
        '\x4e\x48\x73\x78\x5a',
        '\x63\x72\x65\x61\x74\x65\x47\x72\x69\x64',
        '\x73\x65\x74\x48\x6f\x76\x65\x72\x48\x61\x6e\x64\x6c\x65\x72',
        '\x6d\x6f\x76\x65',
        '\x73\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65\x44\x61\x74\x61',
        '\x4a\x4b\x58\x69\x4e',
        '\x74\x65\x78\x74',
        '\x53\x70\x72\x69\x74\x65\x5f\x55\x49\x54\x65\x78\x74',
        '\x70\x50\x61\x79\x53\x6b\x69\x6c\x6c\x50\x6f\x69\x6e\x74\x73',
        '\x77\x61\x72\x6e\x69\x6e\x67',
        '\x6c\x65\x6e\x67\x74\x68',
        '\x5f\x72\x65\x66\x72\x65\x73\x68\x53\x6b\x69\x6c\x6c\x73\x49\x6e\x66\x6f\x57\x69\x6e\x64\x6f\x77',
        '\x67\x65\x74\x49\x6e\x64\x65\x78',
        '\x5f\x69\x6e\x74\x65\x72\x70\x72\x65\x74\x65\x72',
        '\x5f\x6f\x6e\x53\x6b\x69\x6c\x6c\x43\x65\x6c\x6c\x43\x6c\x69\x63\x6b',
        '\x4e\x65\x77\x53\x70\x72\x69\x74\x65',
        '\x64\x43\x79\x64\x6e',
        '\x73\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65\x47\x72\x69\x64',
        '\x5f\x73\x74\x61\x72\x74\x49\x6e\x74\x65\x72\x70\x72\x65\x74\x65\x72',
        '\x5f\x73\x74\x61\x72\x74\x49\x6e\x6e\x65\x72\x43\x65',
        '\x56\x64\x53\x64\x47',
        '\x73\x65\x74\x75\x70',
        '\x37\x32\x70\x79\x67\x4d\x77\x78',
        '\x47\x65\x74\x43\x75\x72\x72\x65\x6e\x74\x43\x6c\x61\x73\x73',
        '\x70\x6c\x61\x79\x4f\x6b',
        '\x35\x35\x33\x38\x33\x30\x6a\x55\x44\x72\x6f\x56',
        '\x5f\x63\x72\x65\x61\x74\x65\x53\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65\x47\x72\x69\x64',
        '\x70\x6f\x73\x69\x74\x69\x6f\x6e',
        '\x73\x65\x74\x75\x70\x43\x61\x6c\x6c\x62\x61\x63\x6b',
        '\x5f\x63\x72\x65\x61\x74\x65\x41\x76\x61\x69\x6c\x61\x62\x6c\x65\x53\x6b\x69\x6c\x6c\x50\x6f\x69\x6e\x74\x73\x54\x65\x78\x74',
        '\x61\x64\x64\x54\x6f\x43\x6f\x6e\x74\x65\x6e\x74',
        '\x67\x65\x74\x4d\x61\x69\x6e\x53\x63\x65\x6e\x65\x53\x65\x74\x74\x69\x6e\x67\x73',
        '\x49\x51\x42\x44\x44',
        '\x64\x65\x73\x74\x72\x6f\x79\x49\x6e\x66\x6f',
        '\x69\x73\x43\x72\x65\x61\x74\x65\x64\x46\x6f\x72\x44\x61\x74\x61',
        '\x63\x6c\x61\x73\x73\x4f\x62\x6a\x65\x63\x74',
        '\x70\x47\x65\x74\x46\x72\x65\x65\x53\x6b\x69\x6c\x6c\x50\x6f\x69\x6e\x74\x73',
        '\x47\x65\x74\x43\x75\x72\x72\x65\x6e\x74\x44\x61\x74\x61',
        '\x64\x72\x61\x77',
        '\x61\x76\x61\x69\x6c\x61\x62\x6c\x65\x53\x6b\x69\x6c\x6c\x50\x6f\x69\x6e\x74\x73\x54\x69\x74\x6c\x65',
        '\x61\x63\x74\x6f\x72',
        '\x5f\x69\x6e\x66\x6f\x57\x69\x6e\x64\x6f\x77',
        '\x32\x34\x53\x49\x63\x70\x43\x54',
        '\x70\x6c\x61\x79\x42\x75\x7a\x7a\x65\x72',
        '\x73\x6b\x69\x6c\x6c\x44\x61\x74\x61',
        '\x62\x69\x6e\x64',
        '\x5f\x6f\x6e\x53\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65\x43\x61\x74\x65\x67\x6f\x72\x79\x43\x68\x61\x6e\x67\x65\x64',
        '\x5f\x63\x72\x65\x61\x74\x65\x53\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65\x43\x61\x74\x65\x67\x6f\x72\x69\x65\x73',
        '\x76\x45\x44\x6f\x5a',
        '\x76\x69\x73\x69\x62\x6c\x65'
    ];
    _0x2c72 = function () {
        return _0x2482b1;
    };
    return _0x2c72();
}
function _0x512d(_0x319a0c, _0x38ac9d) {
    var _0x2c72a6 = _0x2c72();
    return _0x512d = function (_0x512d13, _0x4dc432) {
        _0x512d13 = _0x512d13 - 0x69;
        var _0x3bc944 = _0x2c72a6[_0x512d13];
        return _0x3bc944;
    }, _0x512d(_0x319a0c, _0x38ac9d);
}
(function (_0x421944, _0x46e64b) {
    var _0x4b67e0 = _0x512d, _0x52680d = _0x421944();
    while (!![]) {
        try {
            var _0x14c86e = parseInt(_0x4b67e0(0x81)) / 0x1 + -parseInt(_0x4b67e0(0xb1)) / 0x2 + parseInt(_0x4b67e0(0x87)) / 0x3 * (parseInt(_0x4b67e0(0x95)) / 0x4) + parseInt(_0x4b67e0(0x91)) / 0x5 * (parseInt(_0x4b67e0(0x74)) / 0x6) + -parseInt(_0x4b67e0(0x8e)) / 0x7 + -parseInt(_0x4b67e0(0x8d)) / 0x8 * (-parseInt(_0x4b67e0(0xae)) / 0x9) + -parseInt(_0x4b67e0(0x80)) / 0xa;
            if (_0x14c86e === _0x46e64b)
                break;
            else
                _0x52680d['push'](_0x52680d['shift']());
        } catch (_0x56f528) {
            _0x52680d['push'](_0x52680d['shift']());
        }
    }
}(_0x2c72, 0xb346b));
var PKD_SST_SkillsTreeView;
PKD_SST_SkillsTreeView = class PKD_SST_SkillsTreeView extends PKD_SST_SkillsTreeBase {
    constructor() {
        super();
    }
    ['\x69\x73\x53\x68\x6f\x77\x53\x6c\x6f\x77\x6c\x79']() {
        var _0xf68cc3 = _0x512d, _0x5f3533, _0x4dd15b;
        try {
            return _0x4dd15b = PKD_SimpleSkillsTree['\x50\x50'][_0xf68cc3(0x69)]()['\x61\x70\x70\x65\x61\x72\x57\x69\x74\x68\x41\x6e\x69\x6d\x61\x74\x69\x6f\x6e'] === !![], _0x4dd15b;
        } catch (_0x27a2ac) {
            if (_0xf68cc3(0xa8) === _0xf68cc3(0xa8))
                return _0x5f3533 = _0x27a2ac, KDCore[_0xf68cc3(0xa1)](_0x5f3533), ![];
            else
                _0x3eaeca[_0xf68cc3(0x96)]() ? (_0x2b511f[_0xf68cc3(0xb0)](), this[_0xf68cc3(0x94)](_0x1a3c8a[_0xf68cc3(0xa4)](), _0x3a43aa[_0xf68cc3(0x76)])) : _0x3d7db4[_0xf68cc3(0x75)]();
        }
    }
    [_0x4f07c7(0x89)]() {
        var _0x414b9d = _0x4f07c7;
        this[_0x414b9d(0xaa)](), PKD_SimpleSkillsTree[_0x414b9d(0x85)]['\x50\x72\x65\x70\x61\x72\x65\x44\x61\x74\x61\x46\x6f\x72\x52\x65\x61\x64\x4f\x6e\x6c\x79'](), this['\x5f\x63\x72\x65\x61\x74\x65\x53\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65\x47\x72\x69\x64'](), this[_0x414b9d(0x79)](), this['\x5f\x63\x72\x65\x61\x74\x65\x41\x76\x61\x69\x6c\x61\x62\x6c\x65\x53\x6b\x69\x6c\x6c\x50\x6f\x69\x6e\x74\x73\x54\x65\x78\x74']();
    }
    [_0x4f07c7(0x6d)]() {
        var _0x51a835 = _0x4f07c7;
        return PKD_SimpleSkillsTree[_0x51a835(0x85)][_0x51a835(0xaf)]();
    }
    [_0x4f07c7(0x9c)]() {
        var _0x302c31 = _0x4f07c7;
        return PKD_SimpleSkillsTree[_0x302c31(0x85)][_0x302c31(0x6f)]();
    }
    [_0x4f07c7(0x72)]() {
        var _0x5d5f0d = _0x4f07c7;
        return PKD_SimpleSkillsTree[_0x5d5f0d(0x85)][_0x5d5f0d(0x7e)]();
    }
    [_0x4f07c7(0x7d)]() {
        var _0x67847f = _0x4f07c7, _0x404891, _0x4d5b21;
        try {
            return _0x67847f(0x82) === '\x53\x75\x67\x66\x7a' ? (this[_0x67847f(0x78)]($gameTemp[_0x67847f(0x7f)]), (_0x4d5b21 = this['\x61\x76\x61\x69\x6c\x61\x62\x6c\x65\x53\x6b\x69\x6c\x6c\x50\x6f\x69\x6e\x74\x73\x54\x65\x78\x74\x53\x70\x72']) != null ? _0x4d5b21[_0x67847f(0x70)](this[_0x67847f(0x72)]()[_0x67847f(0x6e)]()) : void 0x0) : _0x479c85[_0x67847f(0x85)][_0x67847f(0x7e)]();
        } catch (_0x47a2ee) {
            return _0x404891 = _0x47a2ee, KDCore['\x77\x61\x72\x6e\x69\x6e\x67'](_0x404891);
        }
    }
    [_0x4f07c7(0x78)](_0x125f85) {
        var _0x14b256 = _0x4f07c7;
        $gameTemp[_0x14b256(0x7f)] = _0x125f85, this[_0x14b256(0xa9)][_0x14b256(0x99)](_0x14b256(0x8a), this[_0x14b256(0x9c)]()[_0x125f85]);
    }
    [_0x4f07c7(0x79)]() {
        var _0x5bf3aa = _0x4f07c7;
        return this[_0x5bf3aa(0x86)] = new PKD_SST_TreesCategories(), this[_0x5bf3aa(0x86)][_0x5bf3aa(0xb4)](this[_0x5bf3aa(0x78)][_0x5bf3aa(0x77)](this)), this[_0x5bf3aa(0x86)][_0x5bf3aa(0x7c)](this[_0x5bf3aa(0x9c)]()[_0x5bf3aa(0xa2)]), this[_0x5bf3aa(0xb6)](this['\x73\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65\x43\x61\x74\x65\x67\x6f\x72\x69\x65\x73']);
    }
    [_0x4f07c7(0xb2)]() {
        var _0x5d13e6 = _0x4f07c7;
        return this[_0x5d13e6(0xa9)] = new PKD_SST_SkillsGrid(), this[_0x5d13e6(0xa9)][_0x5d13e6(0x83)](this[_0x5d13e6(0xa6)][_0x5d13e6(0x77)](this)), this[_0x5d13e6(0xa9)][_0x5d13e6(0x9a)](this[_0x5d13e6(0x97)]['\x62\x69\x6e\x64'](this)), this[_0x5d13e6(0xb6)](this[_0x5d13e6(0xa9)]);
    }
    ['\x5f\x6f\x6e\x53\x6b\x69\x6c\x6c\x43\x65\x6c\x6c\x43\x6c\x69\x63\x6b'](_0x21bbd2) {
        var _0x5131f5 = _0x4f07c7, _0xd2f833;
        if (_0x21bbd2 == null) {
            if (_0x5131f5(0x98) === _0x5131f5(0x98))
                return;
            else
                this[_0x5131f5(0x73)] != null && (this[_0x5131f5(0x73)][_0x5131f5(0x7b)] = ![], this['\x5f\x69\x6e\x66\x6f\x57\x69\x6e\x64\x6f\x77'][_0x5131f5(0x6b)](), this['\x5f\x69\x6e\x66\x6f\x57\x69\x6e\x64\x6f\x77']['\x72\x65\x6d\x6f\x76\x65\x46\x72\x6f\x6d\x50\x61\x72\x65\x6e\x74']()), this[_0x5131f5(0x73)] = new _0x22f102(_0x167911, '\x67\x61\x6d\x65'), this[_0x5131f5(0xb6)](this[_0x5131f5(0x73)]);
        }
        try {
            _0x21bbd2[_0x5131f5(0x96)]() ? (SoundManager[_0x5131f5(0xb0)](), this[_0x5131f5(0x94)](_0x21bbd2[_0x5131f5(0xa4)](), _0x21bbd2[_0x5131f5(0x76)])) : SoundManager[_0x5131f5(0x75)]();
        } catch (_0x2b3f65) {
            _0xd2f833 = _0x2b3f65, KDCore[_0x5131f5(0xa1)](_0xd2f833);
        }
    }
    [_0x4f07c7(0x94)](_0xc027ea, _0x5b85db) {
        var _0x9be5c3 = _0x4f07c7, _0x29c136, _0x56e6cc, _0x94d289, _0x35036b, _0x2d1cf8, _0x9e9eae, _0x241bb5;
        try {
            if (_0x5b85db == null)
                return;
            _0x29c136 = this[_0x9be5c3(0x72)]();
            if (_0x29c136 == null)
                return;
            return {
                onClickActionMode: _0x35036b,
                reqSP: _0x9e9eae,
                skillId: _0x241bb5
            } = _0x5b85db, _0x29c136[_0x9be5c3(0xa0)](_0x9e9eae), _0x35036b !== 0x1 && _0x29c136['\x6c\x65\x61\x72\x6e\x53\x6b\x69\x6c\x6c'](_0x241bb5), _0x35036b !== 0x0 && ({onLerningCE: _0x2d1cf8} = _0x5b85db, _0x94d289 = $dataCommonEvents[_0x2d1cf8], _0x94d289 != null && this[_0x9be5c3(0xab)](_0x94d289[_0x9be5c3(0x8c)])), this[_0x9be5c3(0x7d)]();
        } catch (_0x357e4c) {
            return _0x56e6cc = _0x357e4c, KDCore[_0x9be5c3(0xa1)](_0x56e6cc);
        }
    }
    [_0x4f07c7(0x97)](_0x1ac3c6) {
        var _0x35d38a = _0x4f07c7;
        return this[_0x35d38a(0xa3)](_0x1ac3c6[_0x35d38a(0x76)]);
    }
    [_0x4f07c7(0xa3)](_0x192acf) {
        var _0x549f5a = _0x4f07c7, _0x4a1d2f;
        try {
            if (this[_0x549f5a(0x73)] != null) {
                if (_0x549f5a(0xac) !== _0x549f5a(0x8f)) {
                    if (this[_0x549f5a(0x73)][_0x549f5a(0x6c)](_0x192acf)) {
                        this[_0x549f5a(0x73)][_0x549f5a(0x7d)]();
                        return;
                    }
                } else
                    _0x1e002e[_0x549f5a(0x7f)] = _0x4cecdf, this['\x73\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65\x47\x72\x69\x64'][_0x549f5a(0x99)](_0x549f5a(0x8a), this[_0x549f5a(0x9c)]()[_0x23a387]);
            }
            return this[_0x549f5a(0x8b)](_0x192acf);
        } catch (_0x2ec358) {
            return _0x4a1d2f = _0x2ec358, KDCore['\x77\x61\x72\x6e\x69\x6e\x67'](_0x4a1d2f);
        }
    }
    [_0x4f07c7(0x8b)](_0x537eae) {
        var _0x4963d2 = _0x4f07c7, _0xd6a0ea;
        try {
            this[_0x4963d2(0x73)] != null && (_0x4963d2(0x6a) !== _0x4963d2(0x92) ? (this['\x5f\x69\x6e\x66\x6f\x57\x69\x6e\x64\x6f\x77'][_0x4963d2(0x7b)] = ![], this[_0x4963d2(0x73)][_0x4963d2(0x6b)](), this[_0x4963d2(0x73)][_0x4963d2(0x88)]()) : (_0xe835fb[_0x4963d2(0xb0)](), this[_0x4963d2(0x94)](_0x9f49d2[_0x4963d2(0xa4)](), _0x400d2f[_0x4963d2(0x76)]))), this[_0x4963d2(0x73)] = new PKD_SST_SkillInfoWindow(_0x537eae, '\x67\x61\x6d\x65'), this[_0x4963d2(0xb6)](this['\x5f\x69\x6e\x66\x6f\x57\x69\x6e\x64\x6f\x77']);
        } catch (_0x496765) {
            if (_0x4963d2(0x7a) !== _0x4963d2(0x93))
                _0xd6a0ea = _0x496765, KDCore[_0x4963d2(0xa1)](_0xd6a0ea);
            else {
                this['\x5f\x69\x6e\x66\x6f\x57\x69\x6e\x64\x6f\x77'][_0x4963d2(0x7d)]();
                return;
            }
        }
    }
    [_0x4f07c7(0xb5)]() {
        var _0x19486b = _0x4f07c7, _0x25b93e, _0x27f05b;
        this[_0x19486b(0xb6)](PKD_SimpleSkillsTree[_0x19486b(0x85)][_0x19486b(0xa7)](_0x19486b(0x71))), _0x27f05b = new KDCore['\x55\x49'][(_0x19486b(0x9f))]($sktJson_AvailScText[_0x19486b(0x9e)]), _0x27f05b[_0x19486b(0x9b)]($sktJson_AvailScText[_0x19486b(0xb3)]), this[_0x19486b(0xb6)](_0x27f05b), this['\x61\x76\x61\x69\x6c\x61\x62\x6c\x65\x53\x6b\x69\x6c\x6c\x50\x6f\x69\x6e\x74\x73\x54\x65\x78\x74\x53\x70\x72'] = _0x27f05b;
        try {
            if (_0x19486b(0x90) === '\x6f\x6e\x71\x70\x68')
                return _0x330b1b[_0x19486b(0x85)][_0x19486b(0x6f)]();
            else
                _0x27f05b[_0x19486b(0x70)](this[_0x19486b(0x72)]()[_0x19486b(0x6e)]());
        } catch (_0x59a1fe) {
            _0x25b93e = _0x59a1fe, KDCore[_0x19486b(0xa1)](_0x25b93e);
        }
    }
    ['\x5f\x75\x70\x64\x61\x74\x65\x43\x6f\x6e\x74\x65\x6e\x74']() {
        return this['\x5f\x75\x70\x64\x61\x74\x65\x49\x6e\x74\x65\x72\x70\x72\x65\x74\x65\x72']();
    }
    ['\x5f\x73\x74\x61\x72\x74\x49\x6e\x74\x65\x72\x70\x72\x65\x74\x65\x72']() {
        var _0x1a62f6 = _0x4f07c7;
        this[_0x1a62f6(0xa5)] = new Game_Interpreter();
    }
    ['\x5f\x75\x70\x64\x61\x74\x65\x49\x6e\x74\x65\x72\x70\x72\x65\x74\x65\x72']() {
        var _0x373ae1 = _0x4f07c7;
        this[_0x373ae1(0xa5)][_0x373ae1(0x84)]();
    }
    [_0x4f07c7(0xab)](_0x4f3443) {
        var _0x484889 = _0x4f07c7, _0x2061ee;
        try {
            if ('\x4a\x4b\x58\x69\x4e' === _0x484889(0x9d))
                return this[_0x484889(0xa5)][_0x484889(0xad)](_0x4f3443), this['\x5f\x69\x6e\x74\x65\x72\x70\x72\x65\x74\x65\x72'][_0x484889(0x84)]();
            else
                _0x576d3c['\x70\x6c\x61\x79\x42\x75\x7a\x7a\x65\x72']();
        } catch (_0x140cfc) {
            return _0x2061ee = _0x140cfc, KDCore[_0x484889(0xa1)](_0x2061ee);
        }
    }
};

var _0x16e281 = _0x2934;
(function (_0x18b6a8, _0x8abc9c) {
    var _0x2eec65 = _0x2934, _0x22fe8f = _0x18b6a8();
    while (!![]) {
        try {
            var _0x4103e2 = -parseInt(_0x2eec65(0x16b)) / 0x1 + parseInt(_0x2eec65(0x164)) / 0x2 * (-parseInt(_0x2eec65(0x174)) / 0x3) + parseInt(_0x2eec65(0x152)) / 0x4 + parseInt(_0x2eec65(0x16f)) / 0x5 * (-parseInt(_0x2eec65(0x16c)) / 0x6) + parseInt(_0x2eec65(0x16a)) / 0x7 * (parseInt(_0x2eec65(0x155)) / 0x8) + -parseInt(_0x2eec65(0x15d)) / 0x9 * (-parseInt(_0x2eec65(0x144)) / 0xa) + -parseInt(_0x2eec65(0x14d)) / 0xb * (-parseInt(_0x2eec65(0x163)) / 0xc);
            if (_0x4103e2 === _0x8abc9c)
                break;
            else
                _0x22fe8f['push'](_0x22fe8f['shift']());
        } catch (_0x23b5f6) {
            _0x22fe8f['push'](_0x22fe8f['shift']());
        }
    }
}(_0x3658, 0x4f49f));
function _0x2934(_0x44aba4, _0x335f6f) {
    var _0x365825 = _0x3658();
    return _0x2934 = function (_0x29343e, _0x96dac4) {
        _0x29343e = _0x29343e - 0x137;
        var _0xf2c905 = _0x365825[_0x29343e];
        return _0xf2c905;
    }, _0x2934(_0x44aba4, _0x335f6f);
}
var PKD_SST_SkillTreeLinkEditor;
function _0x3658() {
    var _0x2e8de9 = [
        '\x5f\x6f\x6e\x53\x6b\x69\x6c\x6c\x43\x65\x6c\x6c\x43\x6c\x69\x63\x6b',
        '\x6d\x79\x49\x6e\x64\x65\x78',
        '\x5f\x61\x64\x64\x4e\x65\x77\x4c\x69\x6e\x6b',
        '\x31\x39\x35\x38\x37\x4e\x66\x51\x54\x79\x5a',
        '\x49\x73\x47\x6c\x6f\x62\x61\x6c\x4d\x6f\x64\x61\x6c\x53\x74\x61\x74\x65',
        '\x5f\x72\x65\x66\x72\x65\x73\x68\x53\x6b\x69\x6c\x6c\x73\x49\x6e\x66\x6f\x57\x69\x6e\x64\x6f\x77',
        '\x72\x65\x6d\x6f\x76\x65\x46\x72\x6f\x6d\x50\x61\x72\x65\x6e\x74',
        '\x70\x73\x7a\x4c\x59',
        '\x47\x65\x74\x43\x75\x72\x72\x65\x6e\x74\x43\x61\x74\x65\x67\x6f\x72\x79\x44\x61\x74\x61',
        '\x64\x65\x73\x74\x72\x6f\x79\x49\x6e\x66\x6f',
        '\x76\x69\x73\x69\x62\x6c\x65',
        '\x62\x69\x6e\x64',
        '\x78\x4b\x72\x43\x4c',
        '\x73\x65\x74\x48\x6f\x76\x65\x72\x48\x61\x6e\x64\x6c\x65\x72',
        '\x63\x6c\x6f\x73\x65\x53\x63\x65\x6e\x65\x50\x72\x6f\x63\x65\x73\x73',
        '\x65\x64\x69\x74\x6f\x72',
        '\x66\x77\x44\x64\x6e',
        '\x5f\x63\x72\x65\x61\x74\x65\x48\x69\x6e\x74\x49\x6d\x61\x67\x65',
        '\x31\x34\x33\x30\x75\x4b\x55\x51\x57\x72',
        '\x6f\x70\x48\x62\x75',
        '\x69\x73\x56\x61\x6c\x69\x64\x46\x6f\x72\x41\x63\x74\x69\x6f\x6e',
        '\x53\x51\x6a\x4c\x77',
        '\x6c\x69\x6e\x6b\x54\x6f\x49\x6e\x64\x65\x78',
        '\x4e\x65\x77\x53\x70\x72\x69\x74\x65',
        '\x5f\x6f\x6e\x53\x6b\x69\x6c\x6c\x43\x65\x6c\x6c\x48\x6f\x76\x65\x72\x65\x64',
        '\x6c\x69\x6e\x6b',
        '\x63\x72\x65\x61\x74\x65\x47\x72\x69\x64',
        '\x33\x38\x36\x32\x32\x31\x61\x66\x42\x6a\x64\x4c',
        '\x6c\x69\x6e\x6b\x73',
        '\x73\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65\x47\x72\x69\x64',
        '\x73\x6b\x69\x6c\x6c\x44\x61\x74\x61',
        '\x5f\x69\x6e\x66\x6f\x57\x69\x6e\x64\x6f\x77',
        '\x37\x32\x39\x32\x30\x41\x7a\x68\x68\x61\x4e',
        '\x70\x6c\x61\x79\x4f\x6b',
        '\x6b\x59\x62\x6a\x76',
        '\x31\x30\x35\x35\x32\x4c\x78\x51\x78\x52\x64',
        '\x51\x4a\x4c\x57\x70',
        '\x70\x75\x73\x68',
        '\x74\x51\x6a\x72\x76',
        '\x73\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65\x45\x64\x69\x74\x6f\x72\x4c\x69\x6e\x6b\x73\x48\x69\x6e\x74',
        '\x69\x73\x43\x72\x65\x61\x74\x65\x64\x46\x6f\x72\x44\x61\x74\x61',
        '\x61\x64\x64\x54\x6f\x43\x6f\x6e\x74\x65\x6e\x74',
        '\x5f\x63\x72\x65\x61\x74\x65\x53\x6b\x69\x6c\x6c\x49\x6e\x66\x6f\x57\x69\x6e\x64\x6f\x77',
        '\x33\x35\x36\x32\x32\x67\x6d\x43\x74\x54\x6e',
        '\x69\x73\x43\x61\x6e\x43\x6c\x6f\x73\x65\x42\x79\x4b\x65\x79\x62\x6f\x61\x72\x64',
        '\x63\x6f\x6e\x74\x61\x69\x6e\x73',
        '\x66\x45\x4c\x78\x50',
        '\x6f\x54\x73\x59\x56',
        '\x73\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65\x44\x61\x74\x61',
        '\x31\x38\x30\x61\x70\x70\x4f\x6f\x6a',
        '\x37\x38\x6f\x73\x41\x6b\x46\x4f',
        '\x62\x45\x71\x66\x41',
        '\x77\x61\x72\x6e\x69\x6e\x67',
        '\x6d\x64\x75\x64\x66',
        '\x55\x74\x69\x6c\x73',
        '\x72\x65\x66\x72\x65\x73\x68',
        '\x35\x31\x31\x45\x47\x41\x71\x6b\x66',
        '\x35\x31\x30\x30\x36\x32\x77\x66\x49\x6a\x58\x71',
        '\x32\x34\x7a\x68\x6b\x5a\x4a\x67',
        '\x5f\x5f\x70\x53\x53\x54\x45\x64\x69\x74\x6f\x72\x4c\x69\x6e\x6b\x54\x6f\x49\x6e\x64\x65\x78',
        '\x74\x74\x58\x45\x4a',
        '\x31\x34\x37\x31\x34\x35\x53\x77\x7a\x65\x64\x56',
        '\x70\x6c\x61\x79\x42\x75\x7a\x7a\x65\x72'
    ];
    _0x3658 = function () {
        return _0x2e8de9;
    };
    return _0x3658();
}
PKD_SST_SkillTreeLinkEditor = class PKD_SST_SkillTreeLinkEditor extends PKD_SST_SkillsTreeBase {
    constructor() {
        super(...arguments);
    }
    [_0x16e281(0x15e)]() {
        return !![];
    }
    [_0x16e281(0x162)]() {
        var _0x33988a = _0x16e281;
        return PKD_SimpleSkillsTree[_0x33988a(0x168)][_0x33988a(0x13a)]();
    }
    [_0x16e281(0x148)]() {
        var _0x38d6fe = _0x16e281;
        return $gameTemp[_0x38d6fe(0x16d)];
    }
    ['\x5f\x63\x72\x65\x61\x74\x65\x43\x68\x69\x6c\x64\x72\x65\x6e\x43\x6f\x6e\x74\x65\x6e\x74']() {
        return this['\x5f\x63\x72\x65\x61\x74\x65\x47\x72\x69\x64'](), this['\x5f\x63\x72\x65\x61\x74\x65\x48\x69\x6e\x74\x49\x6d\x61\x67\x65']();
    }
    ['\x5f\x63\x72\x65\x61\x74\x65\x47\x72\x69\x64']() {
        var _0x58712c = _0x16e281;
        return this['\x73\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65\x47\x72\x69\x64'] = new PKD_SST_SkillsGrid(), this[_0x58712c(0x14f)]['\x73\x65\x74\x43\x6c\x69\x63\x6b\x48\x61\x6e\x64\x6c\x65\x72'](this['\x5f\x6f\x6e\x53\x6b\x69\x6c\x6c\x43\x65\x6c\x6c\x43\x6c\x69\x63\x6b'][_0x58712c(0x13d)](this)), this[_0x58712c(0x14f)][_0x58712c(0x13f)](this[_0x58712c(0x14a)][_0x58712c(0x13d)](this)), this[_0x58712c(0x14f)][_0x58712c(0x14c)](_0x58712c(0x14b), this['\x73\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65\x44\x61\x74\x61']()), this['\x61\x64\x64\x54\x6f\x43\x6f\x6e\x74\x65\x6e\x74'](this[_0x58712c(0x14f)]);
    }
    [_0x16e281(0x143)]() {
        var _0x469e1f = _0x16e281;
        return this['\x61\x64\x64\x43\x68\x69\x6c\x64'](PKD_SimpleSkillsTree[_0x469e1f(0x168)][_0x469e1f(0x149)](_0x469e1f(0x159)));
    }
    [_0x16e281(0x171)](_0x411c3f) {
        var _0xc17706 = _0x16e281, _0x13e6ad, _0x2b8063, _0x2abb18;
        if (PKD_SimpleSkillsTree['\x55\x74\x69\x6c\x73'][_0xc17706(0x175)]()) {
            if (_0xc17706(0x158) !== _0xc17706(0x158))
                return !![];
            else
                return;
        }
        try {
            if (_0x411c3f == null) {
                if (_0xc17706(0x160) === '\x53\x65\x62\x75\x4a') {
                    if (!_0x4faabf['\x6c\x69\x6e\x6b\x73'][_0xc17706(0x15f)](_0x1fd300))
                        return _0x373f50[_0xc17706(0x14e)][_0xc17706(0x157)](_0x6173fb);
                } else
                    return;
            }
            return _0x411c3f[_0xc17706(0x146)]() ? _0xc17706(0x154) !== _0xc17706(0x165) ? (SoundManager[_0xc17706(0x153)](), _0x2abb18 = _0x411c3f[_0xc17706(0x172)](), _0x13e6ad = _0x411c3f['\x65\x64\x69\x74\x61\x62\x6c\x65\x49\x6e\x64\x65\x78'](), this[_0xc17706(0x173)](_0x2abb18, _0x13e6ad), this[_0xc17706(0x140)]()) : (_0x4b6aba = _0x47cef5, _0x584f79[_0xc17706(0x166)](_0x44283b)) : SoundManager[_0xc17706(0x170)]();
        } catch (_0x2035da) {
            return _0x2b8063 = _0x2035da, KDCore[_0xc17706(0x166)](_0x2b8063);
        }
    }
    [_0x16e281(0x173)](_0x383d80, _0x50630f) {
        var _0x1a25ce = _0x16e281, _0xe56ec0, _0xa78fb3, _0x1514e5;
        try {
            if ('\x6f\x54\x73\x59\x56' !== _0x1a25ce(0x161))
                return _0x18773f['\x5f\x5f\x70\x53\x53\x54\x45\x64\x69\x74\x6f\x72\x4c\x69\x6e\x6b\x54\x6f\x49\x6e\x64\x65\x78'];
            else {
                _0xe56ec0 = PKD_SimpleSkillsTree[_0x1a25ce(0x168)][_0x1a25ce(0x13a)](), _0x1514e5 = _0xe56ec0[_0x383d80];
                if (_0x1514e5 == null) {
                    if ('\x74\x74\x58\x45\x4a' === _0x1a25ce(0x16e))
                        return;
                    else {
                        if (this[_0x1a25ce(0x151)] != null) {
                            if (this[_0x1a25ce(0x151)]['\x69\x73\x43\x72\x65\x61\x74\x65\x64\x46\x6f\x72\x44\x61\x74\x61'](_0x1830d3)) {
                                this['\x5f\x69\x6e\x66\x6f\x57\x69\x6e\x64\x6f\x77'][_0x1a25ce(0x169)]();
                                return;
                            }
                        }
                        return this[_0x1a25ce(0x15c)](_0x2ea9f6);
                    }
                }
                if (_0x1514e5[_0x1a25ce(0x14e)] == null) {
                    if (_0x1a25ce(0x13e) === _0x1a25ce(0x13e))
                        return _0x1514e5[_0x1a25ce(0x14e)] = [_0x50630f];
                    else
                        return;
                } else {
                    if (_0x1a25ce(0x167) !== _0x1a25ce(0x167)) {
                        this[_0x1a25ce(0x151)]['\x72\x65\x66\x72\x65\x73\x68']();
                        return;
                    } else {
                        if (!_0x1514e5[_0x1a25ce(0x14e)][_0x1a25ce(0x15f)](_0x50630f))
                            return _0x1514e5['\x6c\x69\x6e\x6b\x73'][_0x1a25ce(0x157)](_0x50630f);
                    }
                }
            }
        } catch (_0x84fb62) {
            return _0xa78fb3 = _0x84fb62, KDCore[_0x1a25ce(0x166)](_0xa78fb3);
        }
    }
    [_0x16e281(0x14a)](_0x2f29e7) {
        var _0x113bb8 = _0x16e281;
        return this[_0x113bb8(0x137)](_0x2f29e7[_0x113bb8(0x150)]);
    }
    ['\x5f\x72\x65\x66\x72\x65\x73\x68\x53\x6b\x69\x6c\x6c\x73\x49\x6e\x66\x6f\x57\x69\x6e\x64\x6f\x77'](_0x468bdc) {
        var _0x47d938 = _0x16e281, _0x2775f3;
        try {
            if ('\x51\x4a\x4c\x57\x70' !== _0x47d938(0x156))
                return _0x16aba9[_0x47d938(0x168)][_0x47d938(0x13a)]();
            else {
                if (this['\x5f\x69\x6e\x66\x6f\x57\x69\x6e\x64\x6f\x77'] != null) {
                    if (_0x47d938(0x139) !== _0x47d938(0x147)) {
                        if (this['\x5f\x69\x6e\x66\x6f\x57\x69\x6e\x64\x6f\x77'][_0x47d938(0x15a)](_0x468bdc)) {
                            this[_0x47d938(0x151)][_0x47d938(0x169)]();
                            return;
                        }
                    } else
                        this[_0x47d938(0x151)] != null && (this['\x5f\x69\x6e\x66\x6f\x57\x69\x6e\x64\x6f\x77']['\x76\x69\x73\x69\x62\x6c\x65'] = ![], this[_0x47d938(0x151)]['\x64\x65\x73\x74\x72\x6f\x79\x49\x6e\x66\x6f'](), this[_0x47d938(0x151)][_0x47d938(0x138)]()), this[_0x47d938(0x151)] = new _0x52f734(_0x5ee2e3, '\x65\x64\x69\x74\x6f\x72'), this[_0x47d938(0x15b)](this[_0x47d938(0x151)]);
                }
                return this[_0x47d938(0x15c)](_0x468bdc);
            }
        } catch (_0xf8f2cb) {
            return _0x2775f3 = _0xf8f2cb, KDCore[_0x47d938(0x166)](_0x2775f3);
        }
    }
    [_0x16e281(0x15c)](_0x135228) {
        var _0x2f6afb = _0x16e281, _0x54fe3b;
        try {
            if (_0x2f6afb(0x142) !== _0x2f6afb(0x145))
                this[_0x2f6afb(0x151)] != null && (this[_0x2f6afb(0x151)][_0x2f6afb(0x13c)] = ![], this[_0x2f6afb(0x151)][_0x2f6afb(0x13b)](), this[_0x2f6afb(0x151)][_0x2f6afb(0x138)]()), this[_0x2f6afb(0x151)] = new PKD_SST_SkillInfoWindow(_0x135228, _0x2f6afb(0x141)), this[_0x2f6afb(0x15b)](this[_0x2f6afb(0x151)]);
            else
                return _0x2fa272['\x6c\x69\x6e\x6b\x73'][_0x2f6afb(0x157)](_0x3ebecb);
        } catch (_0x27540d) {
            if ('\x56\x56\x56\x49\x74' === '\x75\x65\x63\x4f\x53')
                return _0x1f99ca = _0x30ef2c, _0x4338cd[_0x2f6afb(0x166)](_0x3cea78);
            else
                _0x54fe3b = _0x27540d, KDCore[_0x2f6afb(0x166)](_0x54fe3b);
        }
    }
};

// Generated by CoffeeScript 2.6.1
var PKD_SST_ToolArrowsPair;

PKD_SST_ToolArrowsPair = class PKD_SST_ToolArrowsPair extends KDCore.Sprite {
  constructor(onPrevClick, onNextClick, spaceBetween = 100) {
    super();
    this.onPrevClick = onPrevClick;
    this.onNextClick = onNextClick;
    this.spaceBetween = spaceBetween;
    this._create();
  }

  isActive() {
    return !PKD_SimpleSkillsTree.Utils.IsGlobalModalState();
  }

  _create() {
    this.btnR = PKD_SimpleSkillsTree.Utils.NewButton("ra2");
    this.btnR.addClickHandler(this._onNextButtonClick.bind(this));
    this.addChild(this.btnR);
    this.btnR.move(this.spaceBetween, 0);
    this.btnL = PKD_SimpleSkillsTree.Utils.NewButton("la2");
    this.btnL.addClickHandler(this._onPrevButtonClick.bind(this));
    this.addChild(this.btnL);
    this.btnL.move(0, 0);
  }

  _onNextButtonClick() {
    var e;
    try {
      if (!this.isActive()) {
        return;
      }
      SoundManager.playCursor();
      if (this.onNextClick != null) {
        this.onNextClick();
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  }

  _onPrevButtonClick() {
    var e;
    try {
      if (!this.isActive()) {
        return;
      }
      SoundManager.playCursor();
      if (this.onPrevClick != null) {
        this.onPrevClick();
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_SST_ToolEditButton;

PKD_SST_ToolEditButton = class PKD_SST_ToolEditButton extends KDCore.Sprite {
  constructor(choiceType, onEditDone, textTile) {
    super();
    this.choiceType = choiceType;
    this.onEditDone = onEditDone;
    this.textTile = textTile;
    this._create();
  }

  setDefaultTextValue(textData) {
    this.textData = textData;
    if (this.textData == null) {
      return this.textData = "";
    }
  }

  isActive() {
    return !PKD_SimpleSkillsTree.Utils.IsGlobalModalState();
  }

  activate() {
    return this._onEditClick();
  }

  _create() {
    this.btnE = PKD_SimpleSkillsTree.Utils.NewButton("btnEdit");
    this.btnE.addClickHandler(this._onEditClick.bind(this));
    this.addChild(this.btnE);
  }

  _onEditClick() {
    var e;
    try {
      if (!this.isActive()) {
        return;
      }
      SoundManager.playCursor();
      this._editProcess();
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  }

  _editProcess() {
    var value;
    if (this.choiceType === "text") {
      value = prompt(this.textTile, this.textData);
      if (this.onEditDone != null) {
        return this.onEditDone(value);
      }
    } else {
      return PKD_SimpleSkillsTree.Utils.RequestModalChoice(this.choiceType, this.onEditDone);
    }
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_SST_ToolItemLink;

PKD_SST_ToolItemLink = class PKD_SST_ToolItemLink extends KDCore.Sprite {
  constructor(skillDataIndex, onClickHandler) {
    super();
    this.skillDataIndex = skillDataIndex;
    this.onClickHandler = onClickHandler;
    this._create();
  }

  isActive() {
    return !PKD_SimpleSkillsTree.Utils.IsGlobalModalState();
  }

  _getSkillData() {
    var data, e;
    try {
      data = PKD_SimpleSkillsTree.Utils.GetCurrentCategoryData();
      if (data == null) {
        return null;
      }
      return data[this.skillDataIndex];
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return null;
  }

  _create() {
    this._createSkillImage();
    return this._createRemoveButton();
  }

  _createSkillImage() {
    var d, e, skillId, type;
    try {
      this.skillImg = new PKD_SST_ToolSkillIcon();
      d = this._getSkillData();
      if (d == null) {
        return;
      }
      ({skillId, type} = d);
      this.skillImg.setup(skillId, type);
      this.skillImg.scale.set(0.8);
      return this.addChild(this.skillImg);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _createRemoveButton() {
    var e;
    try {
      this.btnDel = PKD_SimpleSkillsTree.Utils.NewButton("catRem");
      this.btnDel.addClickHandler(this._onRemoveClick.bind(this));
      this.btnDel.y = 42;
      this.btnDel.x = 10;
      this.addChild(this.btnDel);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  }

  _onRemoveClick() {
    var e, index;
    try {
      if (!this.isActive()) {
        return;
      }
      SoundManager.playCursor();
      index = this.skillDataIndex;
      PKD_SimpleSkillsTree.Utils.RequestModal("Remove link to skill?", this.onClickHandler.bind(this, index));
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_SST_ToolItemNumberChoice;

PKD_SST_ToolItemNumberChoice = class PKD_SST_ToolItemNumberChoice extends KDCore.Sprite {
  constructor(valueGetter, onEditDone, choiceType) {
    super();
    this.valueGetter = valueGetter;
    this.onEditDone = onEditDone;
    this.choiceType = choiceType;
    this._create();
  }

  isActive() {
    return !PKD_SimpleSkillsTree.Utils.IsGlobalModalState();
  }

  refresh() {
    var e;
    try {
      return this.varTextSpr.draw(this.valueGetter());
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _create() {
    this._createValueText();
    return this._createEditButton();
  }

  _createValueText() {
    var t;
    t = new KDCore.UI.Sprite_UIText({
      visible: true,
      size: {
        w: 60,
        h: 28
      },
      alignment: "center",
      font: {
        face: null,
        size: 18,
        italic: false
      },
      margins: {
        x: 0,
        y: 0
      },
      outline: {
        color: null,
        width: 2
      },
      textColor: "#e7c788"
    });
    this.addChild(t);
    this.varTextSpr = t;
  }

  _createEditButton() {
    var editButton;
    editButton = new PKD_SST_ToolEditButton(this.choiceType, this.onEditDone);
    this.addChild(editButton);
    editButton.move(50, -12);
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_SST_ToolSkillIcon;

PKD_SST_ToolSkillIcon = class PKD_SST_ToolSkillIcon extends KDCore.Sprite {
  constructor() {
    super();
  }

  skillIcon() {
    return PKD_SimpleSkillsTree.Utils.GetSkillIcon(this.skillId);
  }

  setup(skillId, type) {
    this.skillId = skillId;
    this.type = type;
    return this._reCreateComponents();
  }

  _reCreateComponents() {
    var name, skillIconSpr;
    if (this._cellImage != null) {
      this._destroyComponents();
    }
    name = "skillCell_" + this.type + "_editor_00";
    this._cellImage = PKD_SimpleSkillsTree.Utils.NewSprite(name);
    skillIconSpr = new PKD_SST_SkillCellGraphics(this.type, this.skillIcon());
    this._cellImage.addChild(skillIconSpr);
    this.addChild(this._cellImage);
  }

  _destroyComponents() {
    var e;
    if (this._cellImage == null) {
      return;
    }
    try {
      this._cellImage.removeFromParent();
      this._cellImage.visible = false;
      return this._cellImage = null;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_SST_ToolItemValueWithArrows;

PKD_SST_ToolItemValueWithArrows = class PKD_SST_ToolItemValueWithArrows extends KDCore.Sprite {
  constructor(valueGetter, onPrevClick, onNextClick) {
    super();
    this.valueGetter = valueGetter;
    this.onPrevClick = onPrevClick;
    this.onNextClick = onNextClick;
    this._create();
  }

  isActive() {
    return !PKD_SimpleSkillsTree.Utils.IsGlobalModalState();
  }

  refresh() {
    var e;
    try {
      return this.varTextSpr.draw(this.valueGetter());
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _create() {
    this._createValueText();
    return this._createArrows();
  }

  _createValueText() {
    var t;
    t = new KDCore.UI.Sprite_UIText({
      visible: true,
      size: {
        w: 60,
        h: 28
      },
      alignment: "center",
      font: {
        face: null,
        size: 18,
        italic: false
      },
      margins: {
        x: 0,
        y: 0
      },
      outline: {
        color: null,
        width: 2
      },
      textColor: "#e7c788"
    });
    this.addChild(t);
    this.varTextSpr = t;
  }

  _createArrows() {
    var arrows;
    arrows = new PKD_SST_ToolArrowsPair(this.onPrevClick.bind(this), this.onNextClick.bind(this), 72);
    this.addChild(arrows);
    arrows.move(-16, -2);
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_SST_ToolSkillAction;

PKD_SST_ToolSkillAction = class PKD_SST_ToolSkillAction extends KDCore.Sprite {
  constructor(skillData) {
    super();
    this.skillData = skillData;
    this._create();
  }

  isActive() {
    return !PKD_SimpleSkillsTree.Utils.IsGlobalModalState();
  }

  refresh() {
    var e, ref, ref1;
    try {
      this.modTextSpr.draw(this._convertModeToText(this.skillData.onClickActionMode));
      if ((ref = this._learnCETool) != null) {
        ref.refresh();
      }
      return (ref1 = this._stateSWTool) != null ? ref1.refresh() : void 0;
    } catch (error) {
      //$gameTemp.__pSSTSave()
      e = error;
      return KDCore.warning(e);
    }
  }

  getLearnCE() {
    return this.skillData.onLerningCE;
  }

  getStateSW() {
    return this.skillData.learnedSwitchId;
  }

  _convertModeToText(mode) {
    var e;
    try {
      if (mode === 0) {
        return "Learn skill";
      } else if (mode === 1) {
        return "Common Event";
      } else {
        return "Both";
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return "unknown";
    }
  }

  _create() {
    this._createMain();
    this._createModeSection();
    this._createLearnCESection();
    this._createSwitchStateSection();
    return this.refresh();
  }

  _createMain() {
    return this.addChild(PKD_SimpleSkillsTree.Utils.NewSprite('skillsEditToolAction'));
  }

  _createModeSection() {
    var arrows, t;
    t = new KDCore.UI.Sprite_UIText({
      visible: true,
      size: {
        w: 120,
        h: 28
      },
      alignment: "center",
      font: {
        face: null,
        size: 14,
        italic: false
      },
      margins: {
        x: 0,
        y: 0
      },
      outline: {
        color: null,
        width: 2
      },
      textColor: "#e7c788"
    });
    this.addChild(t);
    t.move(50, 49);
    this.modTextSpr = t;
    arrows = new PKD_SST_ToolArrowsPair(this.onPrevMode.bind(this), this.onNextMode.bind(this), 150);
    arrows.move(20, 44);
    this.addChild(arrows);
  }

  onPrevMode() {
    var e;
    try {
      this.skillData.onClickActionMode--;
      if (this.skillData.onClickActionMode < 0) {
        this.skillData.onClickActionMode = 2;
      }
      return this.refresh();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  onNextMode() {
    var e;
    try {
      this.skillData.onClickActionMode++;
      if (this.skillData.onClickActionMode > 2) {
        this.skillData.onClickActionMode = 0;
      }
      return this.refresh();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _createLearnCESection() {
    this._learnCETool = new PKD_SST_ToolItemNumberChoice(this.getLearnCE.bind(this), this._onLearnCEEditDone.bind(this), 'commonEvents');
    this._learnCETool.move(26, 116);
    return this.addChild(this._learnCETool);
  }

  _onLearnCEEditDone(value) {
    var e;
    try {
      if (value == null) {
        value = 0;
      }
      if (KDCore.Utils.isValidCE(value)) {
        this.skillData.onLerningCE = value;
      } else {
        this.skillData.onLerningCE = 0;
      }
      return this.refresh();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _createSwitchStateSection() {
    this._stateSWTool = new PKD_SST_ToolItemNumberChoice(this.getStateSW.bind(this), this._onStateSWEditDone.bind(this), 'switches');
    this._stateSWTool.move(26, 224);
    return this.addChild(this._stateSWTool);
  }

  _onStateSWEditDone(value) {
    var e;
    try {
      if (value == null) {
        value = 0;
      }
      this.skillData.learnedSwitchId = value;
      return this.refresh();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

};


var _0x2c64b5 = _0x3d99;
function _0x2bca() {
    var _0x5aa129 = [
        '\x34\x35\x34\x33\x39\x35\x30\x4c\x4b\x4c\x51\x46\x41',
        '\x53\x70\x72\x69\x74\x65',
        '\x5f\x63\x72\x65\x61\x74\x65\x53\x6b\x69\x6c\x6c\x4e\x61\x6d\x65\x54\x65\x78\x74',
        '\x5f\x72\x65\x66\x72\x65\x73\x68\x53\x6b\x69\x6c\x6c\x4e\x61\x6d\x65',
        '\x44\x6d\x47\x58\x69',
        '\x73\x65\x74\x44\x65\x73\x63\x72\x69\x70\x74\x69\x6f\x6e\x54\x6f\x6f\x6c',
        '\x62\x69\x6e\x64',
        '\x5f\x63\x72\x65\x61\x74\x65\x53\x6b\x69\x6c\x6c\x49\x63\x6f\x6e',
        '\x5f\x63\x72\x65\x61\x74\x65',
        '\x73\x6b\x69\x6c\x6c\x44\x61\x74\x61',
        '\x35\x30\x75\x41\x59\x75\x6d\x78',
        '\x61\x64\x64\x43\x68\x69\x6c\x64',
        '\x5f\x6f\x6e\x45\x64\x69\x74\x44\x6f\x6e\x65',
        '\x73\x6b\x69\x6c\x6c\x73\x45\x64\x69\x74\x54\x6f\x6f\x6c\x4d\x61\x69\x6e',
        '\x61\x63\x74\x69\x76\x61\x74\x65',
        '\x64\x65\x73\x63\x54\x6f\x6f\x6c',
        '\x74\x79\x70\x65',
        '\x31\x32\x38\x37\x33\x38\x31\x46\x77\x70\x45\x78\x4d',
        '\x4a\x46\x4a\x54\x57',
        '\x5f\x5f\x70\x53\x53\x54\x53\x61\x76\x65',
        '\x45\x72\x72\x6f\x72',
        '\x72\x65\x66\x72\x65\x73\x68',
        '\x32\x33\x32\x39\x38\x34\x7a\x59\x79\x67\x79\x77',
        '\x31\x36\x4a\x4d\x4f\x79\x4c\x59',
        '\x55\x74\x69\x6c\x73',
        '\x32\x31\x38\x35\x31\x36\x39\x59\x55\x5a\x52\x43\x52',
        '\x31\x30\x31\x32\x32\x38\x38\x30\x48\x6a\x79\x57\x6b\x4e',
        '\x64\x72\x61\x77',
        '\x5f\x63\x72\x65\x61\x74\x65\x53\x6b\x69\x6c\x6c\x54\x79\x70\x65\x43\x68\x61\x6e\x67\x65\x42\x75\x74\x74\x6f\x6e\x73',
        '\x31\x31\x33\x43\x66\x6c\x49\x62\x5a',
        '\x5f\x62\x74\x6e\x45\x64\x69\x74',
        '\x38\x39\x32\x65\x6e\x47\x4b\x6f\x53',
        '\x4e\x65\x77\x53\x70\x72\x69\x74\x65',
        '\x6d\x6f\x76\x65',
        '\x47\x65\x74\x53\x6b\x69\x6c\x6c\x49\x63\x6f\x6e',
        '\x63\x65\x6e\x74\x65\x72',
        '\x5f\x6f\x6e\x4e\x65\x78\x74\x42\x75\x74\x74\x6f\x6e\x43\x6c\x69\x63\x6b',
        '\x73\x6b\x69\x6c\x6c\x49\x64',
        '\x75\x4a\x78\x4a\x51',
        '\x31\x35\x39\x36\x36\x36\x33\x4b\x69\x4c\x71\x6a\x4f',
        '\x74\x69\x74\x6c\x65\x54\x65\x78\x74\x53\x70\x72',
        '\x73\x46\x46\x67\x4e',
        '\x6e\x61\x6d\x65',
        '\x23\x65\x37\x63\x37\x38\x38',
        '\x77\x61\x72\x6e\x69\x6e\x67',
        '\x5f\x63\x72\x65\x61\x74\x65\x45\x64\x69\x74\x42\x75\x74\x74\x6f\x6e',
        '\x5f\x73\x6b\x69\x6c\x6c\x49\x63\x6f\x6e',
        '\x72\x65\x66\x72\x65\x73\x68\x53\x6b\x69\x6c\x6c\x44\x61\x74\x61',
        '\x53\x70\x72\x69\x74\x65\x5f\x55\x49\x54\x65\x78\x74',
        '\x5f\x63\x72\x65\x61\x74\x65\x4d\x61\x69\x6e',
        '\x5f\x6f\x6e\x50\x72\x65\x76\x42\x75\x74\x74\x6f\x6e\x43\x6c\x69\x63\x6b'
    ];
    _0x2bca = function () {
        return _0x5aa129;
    };
    return _0x2bca();
}
(function (_0x58e687, _0x205ab8) {
    var _0x56b362 = _0x3d99, _0xb1f07a = _0x58e687();
    while (!![]) {
        try {
            var _0x32ebcc = parseInt(_0x56b362(0xf4)) / 0x1 * (-parseInt(_0x56b362(0xf6)) / 0x2) + parseInt(_0x56b362(0xe8)) / 0x3 + -parseInt(_0x56b362(0xed)) / 0x4 * (-parseInt(_0x56b362(0xe1)) / 0x5) + -parseInt(_0x56b362(0x10a)) / 0x6 + parseInt(_0x56b362(0xf0)) / 0x7 * (-parseInt(_0x56b362(0xee)) / 0x8) + -parseInt(_0x56b362(0xfe)) / 0x9 + parseInt(_0x56b362(0xf1)) / 0xa;
            if (_0x32ebcc === _0x205ab8)
                break;
            else
                _0xb1f07a['push'](_0xb1f07a['shift']());
        } catch (_0x35143f) {
            _0xb1f07a['push'](_0xb1f07a['shift']());
        }
    }
}(_0x2bca, 0x652cb));
var PKD_SST_ToolSkillChoice;
function _0x3d99(_0x553cbf, _0x38d502) {
    var _0x2bca09 = _0x2bca();
    return _0x3d99 = function (_0x3d9961, _0x27bddc) {
        _0x3d9961 = _0x3d9961 - 0xde;
        var _0x405b06 = _0x2bca09[_0x3d9961];
        return _0x405b06;
    }, _0x3d99(_0x553cbf, _0x38d502);
}
PKD_SST_ToolSkillChoice = class PKD_SST_ToolSkillChoice extends KDCore[_0x2c64b5(0x10b)] {
    constructor(_0x5d4f8a) {
        var _0x59355f = _0x2c64b5;
        super(), this[_0x59355f(0xe0)] = _0x5d4f8a, this[_0x59355f(0xdf)]();
    }
    [_0x2c64b5(0x10f)](_0x52b48c) {
        var _0x11376f = _0x2c64b5;
        this[_0x11376f(0xe6)] = _0x52b48c;
    }
    [_0x2c64b5(0xe5)]() {
        var _0x40c783 = _0x2c64b5, _0xeb8382;
        return (_0xeb8382 = this[_0x40c783(0xf5)]) != null ? _0xeb8382['\x61\x63\x74\x69\x76\x61\x74\x65']() : void 0x0;
    }
    [_0x2c64b5(0xec)]() {
        var _0x2b0440 = _0x2c64b5, _0xe3ff7a, _0x5d2c63, _0x35ebda;
        try {
            (_0x5d2c63 = this['\x5f\x73\x6b\x69\x6c\x6c\x49\x63\x6f\x6e']) != null && _0x5d2c63['\x73\x65\x74\x75\x70'](this[_0x2b0440(0xe0)]['\x73\x6b\x69\x6c\x6c\x49\x64'], this['\x73\x6b\x69\x6c\x6c\x44\x61\x74\x61'][_0x2b0440(0xe7)]), this[_0x2b0440(0x10d)](), (_0x35ebda = this['\x64\x65\x73\x63\x54\x6f\x6f\x6c']) != null && ('\x79\x50\x71\x68\x66' !== _0x2b0440(0x100) ? _0x35ebda[_0x2b0440(0x106)](this['\x73\x6b\x69\x6c\x6c\x44\x61\x74\x61']) : _0x597ec0[_0x2b0440(0x106)](this['\x73\x6b\x69\x6c\x6c\x44\x61\x74\x61'])), $gameTemp[_0x2b0440(0xea)]();
        } catch (_0x2cb0b0) {
            _0x2b0440(0xfd) === _0x2b0440(0xfd) ? (_0xe3ff7a = _0x2cb0b0, KDCore[_0x2b0440(0x103)](_0xe3ff7a)) : _0x2e0d32 = 0x1;
        }
    }
    [_0x2c64b5(0x10d)]() {
        var _0x1c4031 = _0x2c64b5, _0x19f9dd, _0x5aa087;
        try {
            ({skillId: _0x5aa087} = this['\x73\x6b\x69\x6c\x6c\x44\x61\x74\x61'], this[_0x1c4031(0xff)][_0x1c4031(0xf2)]($dataSkills[_0x5aa087][_0x1c4031(0x101)] + '\x20\x5b' + _0x5aa087 + '\x5d'));
        } catch (_0x3fa16d) {
            _0x1c4031(0x10e) !== _0x1c4031(0x10e) ? _0x4a6117 = 0x1 : (_0x19f9dd = _0x3fa16d, KDCore[_0x1c4031(0x103)](_0x19f9dd), this[_0x1c4031(0xff)][_0x1c4031(0xf2)](_0x1c4031(0xeb)));
        }
    }
    [_0x2c64b5(0xdf)]() {
        var _0x3bdb51 = _0x2c64b5;
        this[_0x3bdb51(0x108)](), this[_0x3bdb51(0xde)](), this['\x5f\x63\x72\x65\x61\x74\x65\x53\x6b\x69\x6c\x6c\x4e\x61\x6d\x65\x54\x65\x78\x74'](), this[_0x3bdb51(0xf3)](), this[_0x3bdb51(0x104)](), this[_0x3bdb51(0xec)]();
    }
    [_0x2c64b5(0x108)]() {
        var _0x5954bb = _0x2c64b5;
        return this[_0x5954bb(0xe2)](PKD_SimpleSkillsTree['\x55\x74\x69\x6c\x73'][_0x5954bb(0xf7)](_0x5954bb(0xe4)));
    }
    [_0x2c64b5(0x105)]() {
        var _0x3cec18 = _0x2c64b5;
        return PKD_SimpleSkillsTree[_0x3cec18(0xef)][_0x3cec18(0xf9)](this['\x73\x6b\x69\x6c\x6c\x44\x61\x74\x61'][_0x3cec18(0xfc)]);
    }
    ['\x5f\x63\x72\x65\x61\x74\x65\x53\x6b\x69\x6c\x6c\x49\x63\x6f\x6e']() {
        var _0xa49ad5 = _0x2c64b5;
        this[_0xa49ad5(0x105)] = new PKD_SST_ToolSkillIcon(), this['\x5f\x73\x6b\x69\x6c\x6c\x49\x63\x6f\x6e'][_0xa49ad5(0xf8)](0x2c, 0x24), this[_0xa49ad5(0xe2)](this[_0xa49ad5(0x105)]);
    }
    [_0x2c64b5(0x10c)]() {
        var _0x2f18e5 = _0x2c64b5, _0x53e430;
        _0x53e430 = new KDCore['\x55\x49'][(_0x2f18e5(0x107))]({
            '\x76\x69\x73\x69\x62\x6c\x65': !![],
            '\x73\x69\x7a\x65': {
                '\x77': 0xec,
                '\x68': 0x1c
            },
            '\x61\x6c\x69\x67\x6e\x6d\x65\x6e\x74': _0x2f18e5(0xfa),
            '\x66\x6f\x6e\x74': {
                '\x66\x61\x63\x65': null,
                '\x73\x69\x7a\x65': 0xe,
                '\x69\x74\x61\x6c\x69\x63': ![]
            },
            '\x6d\x61\x72\x67\x69\x6e\x73': {
                '\x78': 0x0,
                '\x79': 0x0
            },
            '\x6f\x75\x74\x6c\x69\x6e\x65': {
                '\x63\x6f\x6c\x6f\x72': null,
                '\x77\x69\x64\x74\x68': 0x2
            },
            '\x74\x65\x78\x74\x43\x6f\x6c\x6f\x72': _0x2f18e5(0x102)
        }), _0x53e430['\x78'] = 0x12, _0x53e430['\x79'] = 0x5c, this[_0x2f18e5(0xe2)](_0x53e430), this['\x74\x69\x74\x6c\x65\x54\x65\x78\x74\x53\x70\x72'] = _0x53e430;
    }
    [_0x2c64b5(0xf3)]() {
        var _0xf83288 = _0x2c64b5, _0x25a9c4;
        return _0x25a9c4 = new PKD_SST_ToolArrowsPair(this[_0xf83288(0x109)][_0xf83288(0x110)](this), this[_0xf83288(0xfb)][_0xf83288(0x110)](this), 0x58), this['\x61\x64\x64\x43\x68\x69\x6c\x64'](_0x25a9c4), _0x25a9c4[_0xf83288(0xf8)](0xc, 0x2a);
    }
    [_0x2c64b5(0x109)]() {
        var _0x31a3cd = _0x2c64b5, _0x41109b;
        ({type: _0x41109b} = this[_0x31a3cd(0xe0)]);
        switch (_0x41109b) {
        case '\x41':
            _0x41109b = '\x43';
            break;
        case '\x42':
            _0x41109b = '\x41';
            break;
        case '\x43':
            _0x41109b = '\x42';
            break;
        default:
            _0x41109b = '\x41';
        }
        this['\x73\x6b\x69\x6c\x6c\x44\x61\x74\x61'][_0x31a3cd(0xe7)] = _0x41109b, this[_0x31a3cd(0xec)]();
    }
    [_0x2c64b5(0xfb)]() {
        var _0x854f37 = _0x2c64b5, _0x4ec2f0;
        ({type: _0x4ec2f0} = this[_0x854f37(0xe0)]);
        switch (_0x4ec2f0) {
        case '\x41':
            _0x4ec2f0 = '\x42';
            break;
        case '\x42':
            _0x4ec2f0 = '\x43';
            break;
        case '\x43':
            _0x4ec2f0 = '\x41';
            break;
        default:
            _0x4ec2f0 = '\x41';
        }
        this[_0x854f37(0xe0)][_0x854f37(0xe7)] = _0x4ec2f0, this[_0x854f37(0xec)]();
    }
    [_0x2c64b5(0x104)]() {
        var _0x4ff647 = _0x2c64b5, _0x501bdb;
        _0x501bdb = new PKD_SST_ToolEditButton('\x73\x6b\x69\x6c\x6c\x73', this[_0x4ff647(0xe3)][_0x4ff647(0x110)](this)), this['\x61\x64\x64\x43\x68\x69\x6c\x64'](_0x501bdb), _0x501bdb[_0x4ff647(0xf8)](0x82, 0x1e), this[_0x4ff647(0xf5)] = _0x501bdb;
    }
    [_0x2c64b5(0xe3)](_0x48051a) {
        var _0x1c4c13 = _0x2c64b5;
        _0x48051a == null && (_0x48051a = 0x1), _0x48051a <= 0x0 && (_0x1c4c13(0xe9) !== _0x1c4c13(0xe9) ? (this[_0x1c4c13(0x108)](), this[_0x1c4c13(0xde)](), this['\x5f\x63\x72\x65\x61\x74\x65\x53\x6b\x69\x6c\x6c\x4e\x61\x6d\x65\x54\x65\x78\x74'](), this[_0x1c4c13(0xf3)](), this[_0x1c4c13(0x104)](), this[_0x1c4c13(0xec)]()) : _0x48051a = 0x1), this[_0x1c4c13(0xe0)]['\x73\x6b\x69\x6c\x6c\x49\x64'] = _0x48051a, this[_0x1c4c13(0xec)]();
    }
};

// Generated by CoffeeScript 2.6.1
var PKD_SST_ToolSkillDescription;

PKD_SST_ToolSkillDescription = class PKD_SST_ToolSkillDescription extends KDCore.Sprite {
  constructor(skillData) {
    super();
    this.skillData = skillData;
    this._create();
  }

  refreshSkillData(skillData) {
    this.skillData = skillData;
    return this.refresh();
  }

  refresh() {
    var e, ref;
    try {
      this._refreshSkillDescriptionText();
      if ((ref = this.btnE) != null) {
        ref.setDefaultTextValue(this._getExtraDescription());
      }
    } catch (error) {
      //$gameTemp.__pSSTSave()
      e = error;
      KDCore.warning(e);
    }
  }

  _getSkillDescription() {
    var e, skill;
    try {
      skill = $dataSkills[this.skillData.skillId];
      return skill.description;
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return "";
    }
  }

  _getExtraDescription() {
    return this.skillData.extraDescription;
  }

  _refreshSkillDescriptionText() {
    var descriptionText, e, extraDescText;
    try {
      descriptionText = this._getSkillDescription();
      extraDescText = this._getExtraDescription();
      if (String.any(extraDescText)) {
        this.descriptionTextSpr.draw(extraDescText);
        this.descriptionTextSpr.opacity = 255;
      } else {
        this.descriptionTextSpr.draw(descriptionText);
        this.descriptionTextSpr.opacity = 100;
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  }

  _create() {
    this._createMain();
    this._createSkillDescText();
    this._createEditButton();
    this.refresh();
  }

  _createMain() {
    return this.addChild(PKD_SimpleSkillsTree.Utils.NewSprite('skillsEditToolDescription'));
  }

  _createSkillDescText() {
    var e, t;
    try {
      t = new KDCore.UI.Sprite_UITextExt($sktJson_SkillDescText.text);
      t.move(13, 42);
      this.addChild(t);
      this.descriptionTextSpr = t;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  }

  _createEditButton() {
    var btnE;
    btnE = new PKD_SST_ToolEditButton("text", this._onEditDone.bind(this), "Enter extra description (instead one in Database)");
    btnE.setDefaultTextValue(this._getExtraDescription());
    this.addChild(btnE);
    btnE.move(250, -4);
    this.btnE = btnE;
  }

  _onEditDone(text) {
    if (text != null) {
      // * Check for NOT NULL, becouse Cancel button return Null always
      // * but we want leave old value if user press Cancel button
      this.skillData.extraDescription = text;
    }
    this.refresh();
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_SST_ToolSkillImagePreview;

PKD_SST_ToolSkillImagePreview = class PKD_SST_ToolSkillImagePreview extends KDCore.Sprite {
  constructor(skillData, gifPosition) {
    super();
    this.skillData = skillData;
    this.gifPosition = gifPosition;
    this._gifCreated = false;
    this._create();
    return;
  }

  isActive() {
    return !PKD_SimpleSkillsTree.Utils.IsGlobalModalState();
  }

  isCanShowGif() {
    return PKD_SimpleSkillsTree.Utils.IsSupportGIF();
  }

  refresh() {
    var e, previewGif, previewImage;
    try {
      this._clearCurrentPreview();
      ({previewImage, previewGif} = this.skillData);
      //TODO: UPD: If GIF is loaded in Editor Preview first, it crush game here
      //if String.any(previewGif) && @isCanShowGif()
      //    @_showGifAnim(previewGif)
      //else
      if (String.any(previewImage)) {
        return this._showImage("preview/" + previewImage);
      }
    } catch (error) {
      //$gameTemp.__pSSTSave()
      e = error;
      return KDCore.warning(e);
    }
  }

  _clearCurrentPreview() {
    if (this._gifCreated === true) {
      window.DeleteVAnim("skillPreview");
      this._gifCreated = false;
    }
    this._previewContainer.visible = false;
  }

  _showGifAnim(filename) {
    this._gifCreated = true;
    window.ShowVAnim("skillPreview", filename, this.gifPosition.x, this.gifPosition.y, true);
  }

  _showImage(filename) {
    this._previewContainer.bitmap = PKD_SimpleSkillsTree.Utils.LoadBitmap(filename);
    return this._previewContainer.visible = true;
  }

  _create() {
    this._createMain();
    this._createPreviewContainer();
    this._createButtons();
    this.refresh();
  }

  _createMain() {
    return this.addChild(PKD_SimpleSkillsTree.Utils.NewSprite('skillsEditToolPreview'));
  }

  _createPreviewContainer() {
    this._previewContainer = new Sprite();
    this._previewContainer.move(12, 67);
    return this.addChild(this._previewContainer);
  }

  _createButtons() {
    this.editButton1 = new PKD_SST_ToolEditButton('images', this.onChangeImage.bind(this));
    this.addChild(this.editButton1);
    this.editButton1.move(80, 20);
    this.editButton2 = new PKD_SST_ToolEditButton('gifs', this.onChangeGif.bind(this));
    this.addChild(this.editButton2);
    this.editButton2.move(240, 20);
    if (!this.isCanShowGif()) {
      this.editButton2.btnE.disable();
    }
  }

  onChangeImage(value) {
    this.skillData.previewImage = value;
    return this.refresh();
  }

  onChangeGif(value) {
    this.skillData.previewGif = value;
    return this.refresh();
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_SST_ToolSkillLinks;

PKD_SST_ToolSkillLinks = class PKD_SST_ToolSkillLinks extends KDCore.Sprite {
  constructor(skillData) {
    super();
    this.skillData = skillData;
    this._create();
    this.refresh();
  }

  isActive() {
    return !PKD_SimpleSkillsTree.Utils.IsGlobalModalState();
  }

  myIndex() {
    return PKD_SimpleSkillsTree.Utils.GetSkillDataIndexBySkillId(this.skillData.skillId);
  }

  // * Возвращает передние (в котоыре я показываю)
  /*_getSkillLinksArray: ->
  links = @skillData.links
  if links?
      return links
  else
      return []*/
  // * Возвращает те, которые в меня показывают
  _getSkillLinksArray() {
    var e, myIndex;
    try {
      myIndex = this.myIndex();
      if (myIndex >= 0) {
        return PKD_SimpleSkillsTree.Utils.GetAllSkillsIndexesPointingTo(myIndex);
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return [];
  }

  isCanAddMoreLink() {
    return this.linksCount() < 4;
  }

  linksCount() {
    return this._getSkillLinksArray().length;
  }

  removeAllLinks() {
    var e, i, item, len, ref, results;
    try {
      if (this.linksCount() > 0) {
        ref = this._linksSpr.children;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          item = ref[i];
          try {
            if (item instanceof PKD_SST_ToolItemLink) {
              results.push(this._removeProcess(item.skillDataIndex));
            } else {
              results.push(void 0);
            }
          } catch (error) {
            e = error;
            results.push(KDCore.warning(e));
          }
        }
        return results;
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  refresh() {
    var e;
    try {
      this._refreshAddLinkPlacementAndState();
      return this._refreshLinks();
    } catch (error) {
      //$gameTemp.__pSSTSave()
      e = error;
      return KDCore.warning(e);
    }
  }

  _refreshAddLinkPlacementAndState() {
    var x;
    if (this.isCanAddMoreLink()) {
      x = this.linksCount() * 52;
      this.btnAddLink.x = x + 20;
      return this.btnAddLink.visible = true;
    } else {
      this.btnAddLink.x = -1000;
      return this.btnAddLink.visible = false;
    }
  }

  _refreshLinks() {
    return this._reCreateLinks();
  }

  _reCreateLinks() {
    var i, index, len, link, ref;
    if (this._linksSpr != null) {
      this._destoryLinks();
    }
    this._linksSpr = new Sprite();
    ref = this._getSkillLinksArray();
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      link = ref[index];
      if ((link != null) && link >= 0) {
        this._createSingleLinkTool(link, index);
      }
    }
    this._linksSpr.move(0, 58);
    return this.addChild(this._linksSpr);
  }

  _createSingleLinkTool(skilDataIndex, linkIndex) {
    var link;
    link = new PKD_SST_ToolItemLink(skilDataIndex, this._onRemoveLinkClick.bind(this));
    link.x = linkIndex * 52;
    link.x += 20;
    this._linksSpr.addChild(link);
  }

  _onRemoveLinkClick(index) {
    var e;
    try {
      this._removeProcess(index);
      return this.refresh();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _removeProcess(index) {
    var data, modifiedItem, myIndex;
    // * Удаляет передние
    //@skillData.links = @skillData.links.filter (item) -> item != index
    // * Удаление меня из зависимости навыка
    data = PKD_SimpleSkillsTree.Utils.GetCurrentCategoryData();
    modifiedItem = data[index];
    if (modifiedItem == null) {
      return;
    }
    myIndex = this.myIndex();
    if (myIndex >= 0) {
      modifiedItem.links.delete(myIndex);
    }
  }

  _destoryLinks() {
    if (this._linksSpr == null) {
      return;
    }
    this._linksSpr.removeFromParent();
    this._linksSpr.visible = false;
    this._linksSpr = null;
  }

  _create() {
    this._createMain();
    this._createAddLinkButton();
  }

  _createMain() {
    return this.addChild(PKD_SimpleSkillsTree.Utils.NewSprite('skillsEditToolLinks'));
  }

  _createAddLinkButton() {
    this.btnAddLink = PKD_SimpleSkillsTree.Utils.NewButton("linkAdd");
    this.btnAddLink.addClickHandler(this._onAddLinkClick.bind(this));
    this.addChild(this.btnAddLink);
    this.btnAddLink.visible = false;
    this.btnAddLink.y = 60;
  }

  _onAddLinkClick() {
    var e;
    try {
      if (!this.isActive()) {
        return;
      }
      SoundManager.playCursor();
      $gameTemp.__pSSTEditorLinkToIndex = this.myIndex();
      SceneManager.push(PKD_SST_SkillTreeLinkEditor);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  }

};


var _0x162e00 = _0x5050;
(function (_0xa34136, _0x3f2e40) {
    var _0x27ef0d = _0x5050, _0x275d27 = _0xa34136();
    while (!![]) {
        try {
            var _0x13003a = -parseInt(_0x27ef0d(0x86)) / 0x1 * (parseInt(_0x27ef0d(0x9b)) / 0x2) + parseInt(_0x27ef0d(0xaa)) / 0x3 + -parseInt(_0x27ef0d(0x88)) / 0x4 + parseInt(_0x27ef0d(0x93)) / 0x5 * (parseInt(_0x27ef0d(0xad)) / 0x6) + parseInt(_0x27ef0d(0x7b)) / 0x7 + -parseInt(_0x27ef0d(0x8f)) / 0x8 + parseInt(_0x27ef0d(0x78)) / 0x9 * (parseInt(_0x27ef0d(0x96)) / 0xa);
            if (_0x13003a === _0x3f2e40)
                break;
            else
                _0x275d27['push'](_0x275d27['shift']());
        } catch (_0x589707) {
            _0x275d27['push'](_0x275d27['shift']());
        }
    }
}(_0x2c86, 0xaae15));
function _0x5050(_0x6c2c44, _0x514f66) {
    var _0x2c86b8 = _0x2c86();
    return _0x5050 = function (_0x505073, _0x4039df) {
        _0x505073 = _0x505073 - 0x6e;
        var _0x306508 = _0x2c86b8[_0x505073];
        return _0x306508;
    }, _0x5050(_0x6c2c44, _0x514f66);
}
function _0x2c86() {
    var _0x20641a = [
        '\x61\x68\x6d\x69\x67',
        '\x23\x65\x37\x63\x37\x38\x38',
        '\x4a\x57\x45\x6e\x50',
        '\x72\x65\x66\x72\x65\x73\x68',
        '\x66\x74\x64\x54\x7a',
        '\x55\x74\x69\x6c\x73',
        '\x33\x31\x37\x30\x32\x37\x37\x6f\x54\x6a\x50\x4a\x70',
        '\x64\x72\x61\x77',
        '\x4e\x6a\x4b\x68\x66',
        '\x38\x32\x33\x39\x32\x39\x34\x56\x41\x47\x44\x52\x5a',
        '\x65\x64\x69\x74\x54\x65\x78\x74\x42\x75\x74\x74\x6f\x6e',
        '\x53\x70\x72\x69\x74\x65\x5f\x55\x49\x54\x65\x78\x74',
        '\x62\x64\x6f\x71\x44',
        '\x72\x65\x71\x53\x50',
        '\x69\x73\x41\x63\x74\x69\x76\x65',
        '\x74\x65\x78\x74',
        '\x73\x68\x69\x66\x74',
        '\x49\x6e\x66\x6f\x72\x6d\x61\x74\x69\x6f\x6e\x20\x61\x62\x6f\x75\x74\x20\x73\x70\x65\x63\x69\x61\x6c\x20\x63\x6f\x6e\x64\x69\x74\x69\x6f\x6e',
        '\x67\x65\x74\x53\x6b\x69\x6c\x6c\x53\x70\x65\x63\x53\x77\x69\x74\x63\x68',
        '\x73\x63\x54\x65\x78\x74\x53\x70\x72',
        '\x36\x39\x34\x36\x38\x30\x71\x71\x5a\x52\x76\x49',
        '\x72\x65\x71\x4c\x65\x76\x65\x6c',
        '\x33\x33\x31\x34\x30\x36\x30\x54\x6b\x61\x6a\x68\x78',
        '\x5f\x6f\x6e\x50\x72\x65\x76\x53\x50\x42\x75\x74\x74\x6f\x6e\x43\x6c\x69\x63\x6b',
        '\x53\x70\x72\x69\x74\x65',
        '\x5f\x73\x70\x54\x6f\x6f\x6c',
        '\x5f\x6c\x65\x76\x65\x6c\x54\x6f\x6f\x6c',
        '\x5f\x6f\x6e\x4e\x65\x78\x74\x4c\x65\x76\x65\x6c\x42\x75\x74\x74\x6f\x6e\x43\x6c\x69\x63\x6b',
        '\x74\x49\x69\x6e\x52',
        '\x31\x31\x38\x38\x33\x35\x32\x68\x6b\x73\x65\x63\x6e',
        '\x57\x79\x7a\x6e\x65',
        '\x6c\x65\x66\x74',
        '\x7a\x62\x49\x71\x5a',
        '\x31\x35\x30\x43\x59\x6d\x46\x77\x45',
        '\x4e\x65\x77\x53\x70\x72\x69\x74\x65',
        '\x5f\x63\x72\x65\x61\x74\x65\x53\x6b\x69\x6c\x6c\x53\x70\x65\x63\x43\x6f\x6e\x64\x53\x65\x63\x74\x69\x6f\x6e',
        '\x31\x30\x79\x76\x78\x66\x4f\x43',
        '\x73\x70\x65\x63\x69\x61\x6c\x43\x6f\x6e\x64\x69\x74\x69\x6f\x6e\x54\x65\x78\x74',
        '\x5f\x73\x63\x73\x77\x69\x74\x63\x68\x54\x6f\x6f\x6c',
        '\x62\x69\x6e\x64',
        '\x73\x6b\x69\x6c\x6c\x44\x61\x74\x61',
        '\x32\x56\x4f\x65\x41\x4a\x44',
        '\x67\x65\x74\x53\x6b\x69\x6c\x6c\x50\x6f\x69\x6e\x74\x73',
        '\x41\x4e\x53\x4f\x6d',
        '\x73\x70\x65\x63\x69\x61\x6c\x43\x6f\x6e\x64\x69\x74\x69\x6f\x6e\x53\x77\x69\x74\x63\x68\x49\x64',
        '\x77\x61\x72\x6e\x69\x6e\x67',
        '\x6d\x6f\x76\x65',
        '\x5f\x6f\x6e\x4e\x65\x78\x74\x53\x50\x42\x75\x74\x74\x6f\x6e\x43\x6c\x69\x63\x6b',
        '\x6f\x6e\x45\x64\x69\x74\x53\x43\x54\x65\x78\x74\x44\x6f\x6e\x65',
        '\x5f\x63\x72\x65\x61\x74\x65',
        '\x42\x4d\x53\x4c\x44',
        '\x5f\x6f\x6e\x50\x72\x65\x76\x4c\x65\x76\x65\x6c\x42\x75\x74\x74\x6f\x6e\x43\x6c\x69\x63\x6b',
        '\x61\x64\x64\x43\x68\x69\x6c\x64',
        '\x73\x6b\x69\x6c\x6c\x73\x45\x64\x69\x74\x54\x6f\x6f\x6c\x52\x65\x71\x75\x69\x72\x65\x6d\x65\x6e\x74\x73',
        '\x69\x73\x50\x72\x65\x73\x73\x65\x64',
        '\x67\x65\x74\x53\x6b\x69\x6c\x6c\x4c\x65\x76\x65\x6c',
        '\x39\x39\x39\x36\x32\x37\x57\x78\x68\x73\x73\x63',
        '\x4e\x49\x76\x56\x56',
        '\x5f\x63\x72\x65\x61\x74\x65\x53\x6b\x69\x6c\x6c\x50\x6f\x69\x6e\x74\x73\x53\x65\x63\x74\x69\x6f\x6e',
        '\x31\x30\x31\x38\x33\x32\x46\x64\x70\x6e\x6a\x63',
        '\x5f\x63\x72\x65\x61\x74\x65\x53\x43\x54\x65\x78\x74\x54\x6f\x6f\x6c',
        '\x5f\x63\x72\x65\x61\x74\x65\x4c\x65\x76\x65\x6c\x53\x65\x63\x74\x69\x6f\x6e',
        '\x5f\x6f\x6e\x53\x43\x53\x77\x69\x74\x63\x68\x43\x68\x61\x6e\x67\x65',
        '\x72\x6d\x47\x69\x77',
        '\x5f\x63\x72\x65\x61\x74\x65\x4d\x61\x69\x6e'
    ];
    _0x2c86 = function () {
        return _0x20641a;
    };
    return _0x2c86();
}
var PKD_SST_ToolSkillRequirements;
PKD_SST_ToolSkillRequirements = class PKD_SST_ToolSkillRequirements extends KDCore[_0x162e00(0x8a)] {
    constructor(_0x6ee53a) {
        var _0x2246dc = _0x162e00;
        super(), this[_0x2246dc(0x9a)] = _0x6ee53a, this['\x5f\x63\x72\x65\x61\x74\x65']();
    }
    [_0x162e00(0x75)]() {
        var _0x3aec12 = _0x162e00, _0x108afa, _0x2aac91, _0xb79633, _0x26fd24, _0x47bade, _0x10fec1;
        try {
            (_0x2aac91 = this[_0x3aec12(0x8c)]) != null && _0x2aac91['\x72\x65\x66\x72\x65\x73\x68']();
            if ((_0xb79633 = this[_0x3aec12(0x8b)]) != null) {
                if (_0x3aec12(0x76) !== _0x3aec12(0x76)) {
                    var _0x4a5bc8;
                    _0x4a5bc8 = new _0x1f6ef8['\x55\x49'][(_0x3aec12(0x7d))]({
                        '\x76\x69\x73\x69\x62\x6c\x65': !![],
                        '\x73\x69\x7a\x65': {
                            '\x77': 0xec,
                            '\x68': 0x1c
                        },
                        '\x61\x6c\x69\x67\x6e\x6d\x65\x6e\x74': _0x3aec12(0x91),
                        '\x66\x6f\x6e\x74': {
                            '\x66\x61\x63\x65': null,
                            '\x73\x69\x7a\x65': 0xc,
                            '\x69\x74\x61\x6c\x69\x63': ![]
                        },
                        '\x6d\x61\x72\x67\x69\x6e\x73': {
                            '\x78': 0x0,
                            '\x79': 0x0
                        },
                        '\x6f\x75\x74\x6c\x69\x6e\x65': {
                            '\x63\x6f\x6c\x6f\x72': null,
                            '\x77\x69\x64\x74\x68': 0x2
                        },
                        '\x74\x65\x78\x74\x43\x6f\x6c\x6f\x72': _0x3aec12(0x73)
                    }), this[_0x3aec12(0xa6)](_0x4a5bc8), _0x4a5bc8['\x6d\x6f\x76\x65'](0x16, 0xd2), this['\x73\x63\x54\x65\x78\x74\x53\x70\x72'] = _0x4a5bc8, this[_0x3aec12(0x7c)] = new _0x498733(_0x3aec12(0x81), this[_0x3aec12(0xa2)][_0x3aec12(0x99)](this), _0x3aec12(0x83)), this['\x61\x64\x64\x43\x68\x69\x6c\x64'](this[_0x3aec12(0x7c)]), this['\x65\x64\x69\x74\x54\x65\x78\x74\x42\x75\x74\x74\x6f\x6e'][_0x3aec12(0xa0)](0xa6, 0xa8);
                } else
                    _0xb79633[_0x3aec12(0x75)]();
            }
            if ((_0x26fd24 = this[_0x3aec12(0x98)]) != null) {
                if (_0x3aec12(0x72) !== _0x3aec12(0x72))
                    return this[_0x3aec12(0xa6)](_0xbcd26a[_0x3aec12(0x77)]['\x4e\x65\x77\x53\x70\x72\x69\x74\x65'](_0x3aec12(0xa7)));
                else
                    _0x26fd24[_0x3aec12(0x75)]();
            }
            return (_0x47bade = this[_0x3aec12(0x85)]) != null && _0x47bade[_0x3aec12(0x79)](this[_0x3aec12(0x9a)][_0x3aec12(0x97)]), (_0x10fec1 = this[_0x3aec12(0x7c)]) != null ? _0x10fec1['\x73\x65\x74\x44\x65\x66\x61\x75\x6c\x74\x54\x65\x78\x74\x56\x61\x6c\x75\x65'](this['\x73\x6b\x69\x6c\x6c\x44\x61\x74\x61'][_0x3aec12(0x97)]) : void 0x0;
        } catch (_0x15fbe8) {
            return _0x3aec12(0xab) === _0x3aec12(0xab) ? (_0x108afa = _0x15fbe8, KDCore[_0x3aec12(0x9f)](_0x108afa)) : (_0x527678 = _0x165c58, _0x16df8e[_0x3aec12(0x9f)](_0x20b30b));
        }
    }
    [_0x162e00(0xa9)]() {
        var _0x3413b3 = _0x162e00;
        return this[_0x3413b3(0x9a)][_0x3413b3(0x87)];
    }
    [_0x162e00(0x9c)]() {
        var _0x59a1c5 = _0x162e00;
        return this['\x73\x6b\x69\x6c\x6c\x44\x61\x74\x61'][_0x59a1c5(0x7f)];
    }
    [_0x162e00(0x84)]() {
        var _0x47356a = _0x162e00;
        return this[_0x47356a(0x9a)]['\x73\x70\x65\x63\x69\x61\x6c\x43\x6f\x6e\x64\x69\x74\x69\x6f\x6e\x53\x77\x69\x74\x63\x68\x49\x64'];
    }
    [_0x162e00(0x80)]() {
        var _0x2a6ba3 = _0x162e00;
        return !PKD_SimpleSkillsTree[_0x2a6ba3(0x77)]['\x49\x73\x47\x6c\x6f\x62\x61\x6c\x4d\x6f\x64\x61\x6c\x53\x74\x61\x74\x65']();
    }
    [_0x162e00(0xa3)]() {
        var _0x41d248 = _0x162e00;
        this[_0x41d248(0x71)](), this[_0x41d248(0x6e)](), this[_0x41d248(0xac)](), this['\x5f\x63\x72\x65\x61\x74\x65\x53\x6b\x69\x6c\x6c\x53\x70\x65\x63\x43\x6f\x6e\x64\x53\x65\x63\x74\x69\x6f\x6e'](), this['\x72\x65\x66\x72\x65\x73\x68']();
    }
    [_0x162e00(0x71)]() {
        var _0x48e6ab = _0x162e00;
        return this[_0x48e6ab(0xa6)](PKD_SimpleSkillsTree[_0x48e6ab(0x77)][_0x48e6ab(0x94)](_0x48e6ab(0xa7)));
    }
    [_0x162e00(0x6e)]() {
        var _0x539b3e = _0x162e00;
        this['\x5f\x6c\x65\x76\x65\x6c\x54\x6f\x6f\x6c'] = new PKD_SST_ToolItemValueWithArrows(this[_0x539b3e(0xa9)]['\x62\x69\x6e\x64'](this), this['\x5f\x6f\x6e\x50\x72\x65\x76\x4c\x65\x76\x65\x6c\x42\x75\x74\x74\x6f\x6e\x43\x6c\x69\x63\x6b'][_0x539b3e(0x99)](this), this['\x5f\x6f\x6e\x4e\x65\x78\x74\x4c\x65\x76\x65\x6c\x42\x75\x74\x74\x6f\x6e\x43\x6c\x69\x63\x6b'][_0x539b3e(0x99)](this)), this[_0x539b3e(0xa6)](this[_0x539b3e(0x8c)]), this[_0x539b3e(0x8c)][_0x539b3e(0xa0)](0x60, 0x2a);
    }
    [_0x162e00(0xa5)]() {
        var _0x410728 = _0x162e00;
        Input[_0x410728(0xa8)](_0x410728(0x82)) ? _0x410728(0x92) !== '\x7a\x62\x49\x71\x5a' ? _0xa1b402['\x72\x65\x66\x72\x65\x73\x68']() : this['\x73\x6b\x69\x6c\x6c\x44\x61\x74\x61'][_0x410728(0x87)] -= 0xa : _0x410728(0x90) !== '\x57\x79\x7a\x6e\x65' ? (this['\x5f\x73\x70\x54\x6f\x6f\x6c'] = new _0x2e599a(this[_0x410728(0x9c)]['\x62\x69\x6e\x64'](this), this[_0x410728(0x89)]['\x62\x69\x6e\x64'](this), this[_0x410728(0xa1)][_0x410728(0x99)](this)), this[_0x410728(0xa6)](this[_0x410728(0x8b)]), this[_0x410728(0x8b)][_0x410728(0xa0)](0x84, 0x5a)) : this[_0x410728(0x9a)][_0x410728(0x87)] -= 0x1, this[_0x410728(0x9a)]['\x72\x65\x71\x4c\x65\x76\x65\x6c'] < 0x0 && (_0x410728(0x74) === _0x410728(0x7e) ? (_0x334c50[_0x410728(0xa8)](_0x410728(0x82)) ? this[_0x410728(0x9a)]['\x72\x65\x71\x4c\x65\x76\x65\x6c'] += 0xa : this[_0x410728(0x9a)][_0x410728(0x87)] += 0x1, this[_0x410728(0x75)]()) : this[_0x410728(0x9a)][_0x410728(0x87)] = 0x0), this[_0x410728(0x75)]();
    }
    [_0x162e00(0x8d)]() {
        var _0x413bc9 = _0x162e00;
        Input['\x69\x73\x50\x72\x65\x73\x73\x65\x64'](_0x413bc9(0x82)) ? _0x413bc9(0x70) !== _0x413bc9(0x70) ? this['\x73\x6b\x69\x6c\x6c\x44\x61\x74\x61'][_0x413bc9(0x7f)] -= 0xa : this[_0x413bc9(0x9a)][_0x413bc9(0x87)] += 0xa : this['\x73\x6b\x69\x6c\x6c\x44\x61\x74\x61'][_0x413bc9(0x87)] += 0x1, this[_0x413bc9(0x75)]();
    }
    ['\x5f\x63\x72\x65\x61\x74\x65\x53\x6b\x69\x6c\x6c\x50\x6f\x69\x6e\x74\x73\x53\x65\x63\x74\x69\x6f\x6e']() {
        var _0x5d0e92 = _0x162e00;
        this['\x5f\x73\x70\x54\x6f\x6f\x6c'] = new PKD_SST_ToolItemValueWithArrows(this[_0x5d0e92(0x9c)][_0x5d0e92(0x99)](this), this[_0x5d0e92(0x89)][_0x5d0e92(0x99)](this), this['\x5f\x6f\x6e\x4e\x65\x78\x74\x53\x50\x42\x75\x74\x74\x6f\x6e\x43\x6c\x69\x63\x6b'][_0x5d0e92(0x99)](this)), this[_0x5d0e92(0xa6)](this[_0x5d0e92(0x8b)]), this['\x5f\x73\x70\x54\x6f\x6f\x6c'][_0x5d0e92(0xa0)](0x84, 0x5a);
    }
    ['\x5f\x6f\x6e\x50\x72\x65\x76\x53\x50\x42\x75\x74\x74\x6f\x6e\x43\x6c\x69\x63\x6b']() {
        var _0x510d8d = _0x162e00;
        if (Input[_0x510d8d(0xa8)](_0x510d8d(0x82)))
            this[_0x510d8d(0x9a)][_0x510d8d(0x7f)] -= 0xa;
        else {
            if (_0x510d8d(0x9d) !== _0x510d8d(0x9d))
                return this[_0x510d8d(0x9a)]['\x72\x65\x71\x4c\x65\x76\x65\x6c'];
            else
                this['\x73\x6b\x69\x6c\x6c\x44\x61\x74\x61'][_0x510d8d(0x7f)] -= 0x1;
        }
        if (this['\x73\x6b\x69\x6c\x6c\x44\x61\x74\x61'][_0x510d8d(0x7f)] < 0x0) {
            if (_0x510d8d(0x7a) !== '\x5a\x6e\x4d\x6e\x48')
                this[_0x510d8d(0x9a)][_0x510d8d(0x7f)] = 0x0;
            else
                return _0x903ba4 != null && (this['\x73\x6b\x69\x6c\x6c\x44\x61\x74\x61'][_0x510d8d(0x97)] = _0x4b163d), this['\x72\x65\x66\x72\x65\x73\x68']();
        }
        this[_0x510d8d(0x75)]();
    }
    [_0x162e00(0xa1)]() {
        var _0x27c071 = _0x162e00;
        Input[_0x27c071(0xa8)](_0x27c071(0x82)) ? this[_0x27c071(0x9a)][_0x27c071(0x7f)] += 0xa : this[_0x27c071(0x9a)][_0x27c071(0x7f)] += 0x1, this[_0x27c071(0x75)]();
    }
    [_0x162e00(0x95)]() {
        var _0x30f916 = _0x162e00;
        return this['\x5f\x63\x72\x65\x61\x74\x65\x53\x43\x53\x77\x69\x74\x63\x68\x53\x65\x6c\x65\x63\x74\x54\x6f\x6f\x6c'](), this[_0x30f916(0xae)]();
    }
    ['\x5f\x63\x72\x65\x61\x74\x65\x53\x43\x53\x77\x69\x74\x63\x68\x53\x65\x6c\x65\x63\x74\x54\x6f\x6f\x6c']() {
        var _0x14df95 = _0x162e00;
        return this[_0x14df95(0x98)] = new PKD_SST_ToolItemNumberChoice(this[_0x14df95(0x84)][_0x14df95(0x99)](this), this['\x5f\x6f\x6e\x53\x43\x53\x77\x69\x74\x63\x68\x43\x68\x61\x6e\x67\x65'][_0x14df95(0x99)](this), '\x73\x77\x69\x74\x63\x68\x65\x73'), this['\x5f\x73\x63\x73\x77\x69\x74\x63\x68\x54\x6f\x6f\x6c']['\x6d\x6f\x76\x65'](0x6a, 0x86), this[_0x14df95(0xa6)](this[_0x14df95(0x98)]);
    }
    [_0x162e00(0x6f)](_0x3ba1a4) {
        var _0x350a5b = _0x162e00, _0x160152;
        try {
            return this[_0x350a5b(0x9a)][_0x350a5b(0x9e)] = _0x3ba1a4, this['\x72\x65\x66\x72\x65\x73\x68']();
        } catch (_0x1b46de) {
            if (_0x350a5b(0xa4) === _0x350a5b(0x8e))
                this[_0x350a5b(0x9a)][_0x350a5b(0x7f)] -= 0x1;
            else
                return _0x160152 = _0x1b46de, KDCore[_0x350a5b(0x9f)](_0x160152);
        }
    }
    [_0x162e00(0xae)]() {
        var _0x370dd1 = _0x162e00, _0x3c5863;
        _0x3c5863 = new KDCore['\x55\x49'][(_0x370dd1(0x7d))]({
            '\x76\x69\x73\x69\x62\x6c\x65': !![],
            '\x73\x69\x7a\x65': {
                '\x77': 0xec,
                '\x68': 0x1c
            },
            '\x61\x6c\x69\x67\x6e\x6d\x65\x6e\x74': _0x370dd1(0x91),
            '\x66\x6f\x6e\x74': {
                '\x66\x61\x63\x65': null,
                '\x73\x69\x7a\x65': 0xc,
                '\x69\x74\x61\x6c\x69\x63': ![]
            },
            '\x6d\x61\x72\x67\x69\x6e\x73': {
                '\x78': 0x0,
                '\x79': 0x0
            },
            '\x6f\x75\x74\x6c\x69\x6e\x65': {
                '\x63\x6f\x6c\x6f\x72': null,
                '\x77\x69\x64\x74\x68': 0x2
            },
            '\x74\x65\x78\x74\x43\x6f\x6c\x6f\x72': _0x370dd1(0x73)
        }), this[_0x370dd1(0xa6)](_0x3c5863), _0x3c5863['\x6d\x6f\x76\x65'](0x16, 0xd2), this[_0x370dd1(0x85)] = _0x3c5863, this[_0x370dd1(0x7c)] = new PKD_SST_ToolEditButton(_0x370dd1(0x81), this[_0x370dd1(0xa2)][_0x370dd1(0x99)](this), _0x370dd1(0x83)), this[_0x370dd1(0xa6)](this[_0x370dd1(0x7c)]), this['\x65\x64\x69\x74\x54\x65\x78\x74\x42\x75\x74\x74\x6f\x6e'][_0x370dd1(0xa0)](0xa6, 0xa8);
    }
    [_0x162e00(0xa2)](_0x504396) {
        var _0x285aa2 = _0x162e00, _0x2c83e3;
        try {
            return _0x504396 != null && (this[_0x285aa2(0x9a)][_0x285aa2(0x97)] = _0x504396), this[_0x285aa2(0x75)]();
        } catch (_0x5c7213) {
            return _0x2c83e3 = _0x5c7213, KDCore[_0x285aa2(0x9f)](_0x2c83e3);
        }
    }
};

function _0x3af1(_0x2d824f, _0x1334d1) {
    var _0x444f30 = _0x444f();
    return _0x3af1 = function (_0x3af1ba, _0x5b671f) {
        _0x3af1ba = _0x3af1ba - 0x14a;
        var _0x47eb77 = _0x444f30[_0x3af1ba];
        return _0x47eb77;
    }, _0x3af1(_0x2d824f, _0x1334d1);
}
var _0x4d2d61 = _0x3af1;
(function (_0x2f3821, _0x24c44e) {
    var _0x44358f = _0x3af1, _0x3cb886 = _0x2f3821();
    while (!![]) {
        try {
            var _0x29ec10 = -parseInt(_0x44358f(0x175)) / 0x1 * (-parseInt(_0x44358f(0x154)) / 0x2) + -parseInt(_0x44358f(0x163)) / 0x3 * (parseInt(_0x44358f(0x152)) / 0x4) + -parseInt(_0x44358f(0x156)) / 0x5 + -parseInt(_0x44358f(0x166)) / 0x6 * (-parseInt(_0x44358f(0x150)) / 0x7) + parseInt(_0x44358f(0x164)) / 0x8 + -parseInt(_0x44358f(0x16d)) / 0x9 * (parseInt(_0x44358f(0x17c)) / 0xa) + parseInt(_0x44358f(0x151)) / 0xb * (parseInt(_0x44358f(0x17a)) / 0xc);
            if (_0x29ec10 === _0x24c44e)
                break;
            else
                _0x3cb886['push'](_0x3cb886['shift']());
        } catch (_0x5cef85) {
            _0x3cb886['push'](_0x3cb886['shift']());
        }
    }
}(_0x444f, 0x7e408));
var PKD_SST_ToolTCManager;
function _0x444f() {
    var _0x473bf8 = [
        '\x5f\x63\x72\x65\x61\x74\x65\x4d\x61\x69\x6e',
        '\x49\x73\x47\x6c\x6f\x62\x61\x6c\x4d\x6f\x64\x61\x6c\x53\x74\x61\x74\x65',
        '\x31\x34\x30\x39\x38\x35\x77\x4b\x63\x56\x41\x71',
        '\x6c\x69\x6e\x6b\x54\x6f\x43\x61\x74\x65\x67\x6f\x72\x69\x65\x73',
        '\x70\x6c\x61\x79\x43\x75\x72\x73\x6f\x72',
        '\x5f\x6f\x6e\x4d\x69\x6e\x75\x73\x42\x75\x74\x74\x6f\x6e\x43\x6c\x69\x63\x6b',
        '\x5f\x62\x75\x74\x74\x6f\x6e\x73',
        '\x63\x61\x74\x52\x65\x6d',
        '\x63\x61\x74\x65\x67\x6f\x72\x69\x65\x73\x43\x6f\x75\x6e\x74',
        '\x69\x73\x50\x72\x6f',
        '\x31\x45\x62\x47\x6c\x76\x6c',
        '\x62\x74\x6e\x52',
        '\x5f\x63\x61\x74\x65\x67\x6f\x72\x69\x65\x73\x53\x70\x72',
        '\x6c\x65\x6e\x67\x74\x68',
        '\x4e\x65\x77\x53\x70\x72\x69\x74\x65',
        '\x32\x34\x71\x6f\x75\x57\x78\x6f',
        '\x54\x69\x6d\x65\x64\x55\x70\x64\x61\x74\x65',
        '\x35\x33\x30\x59\x57\x6c\x6e\x78\x61',
        '\x62\x74\x6e\x4c',
        '\x44\x65\x6c\x65\x74\x65\x20\x74\x68\x65\x20\x63\x75\x72\x72\x65\x6e\x74\x20\x63\x61\x74\x65\x67\x6f\x72\x79\x3f',
        '\x75\x70\x64\x61\x74\x65',
        '\x5f\x73\x65\x6c\x65\x63\x74\x65\x64\x49\x6e\x64\x65\x78',
        '\x61\x64\x64\x43\x68\x69\x6c\x64',
        '\x61\x6c\x65\x72\x74',
        '\x73\x65\x6c\x65\x63\x74\x43\x61\x74\x65\x67\x6f\x72\x79',
        '\x52\x65\x71\x75\x65\x73\x74\x4d\x6f\x64\x61\x6c',
        '\x70\x6c\x61\x79\x42\x75\x7a\x7a\x65\x72',
        '\x73\x70\x6c\x69\x63\x65',
        '\x5f\x72\x65\x66\x72\x65\x73\x68\x54\x68\x72\x65\x61\x64',
        '\x77\x4a\x44\x4b\x6e',
        '\x71\x76\x6d\x42\x72',
        '\x34\x39\x68\x4d\x68\x75\x59\x47',
        '\x32\x37\x32\x36\x36\x30\x33\x4e\x71\x47\x68\x75\x4e',
        '\x34\x41\x6d\x6d\x52\x71\x48',
        '\x5f\x63\x72\x65\x61\x74\x65\x42\x75\x74\x74\x6f\x6e\x73',
        '\x31\x34\x33\x34\x34\x33\x30\x75\x4b\x7a\x76\x63\x58',
        '\x72\x65\x66\x72\x65\x73\x68',
        '\x34\x30\x31\x31\x38\x30\x4f\x47\x68\x68\x47\x52',
        '\x5f\x63\x72\x65\x61\x74\x65',
        '\x6d\x6f\x76\x65',
        '\x4e\x65\x77\x42\x75\x74\x74\x6f\x6e',
        '\x70\x75\x73\x68',
        '\x53\x70\x72\x69\x74\x65',
        '\x63\x61\x74\x41\x64\x64',
        '\x6a\x79\x76\x4b\x46',
        '\x73\x6b\x69\x6c\x6c\x73\x54\x72\x65\x65\x43\x61\x74\x65\x67\x6f\x72\x79\x54\x6f\x6f\x6c\x73',
        '\x76\x69\x73\x69\x62\x6c\x65',
        '\x62\x69\x6e\x64',
        '\x42\x41\x53\x49\x43\x20\x76\x65\x72\x73\x69\x6f\x6e\x20\x73\x75\x70\x70\x6f\x72\x74\x73\x20\x6f\x6e\x6c\x79\x20\x6d\x61\x78\x20\x32\x20\x63\x61\x74\x65\x67\x6f\x72\x69\x65\x73\x21',
        '\x5f\x5f\x70\x53\x53\x54\x45\x64\x69\x74\x6f\x72\x53\x65\x6c\x65\x63\x74\x65\x64\x43\x6c\x61\x73\x73\x49\x64',
        '\x32\x37\x34\x32\x39\x36\x39\x4e\x79\x50\x4f\x4d\x6f',
        '\x33\x36\x36\x38\x34\x38\x30\x69\x75\x61\x4b\x55\x7a',
        '\x53\x61\x76\x65\x44\x61\x74\x61\x46\x69\x6c\x65\x46\x6f\x72\x43\x6c\x61\x73\x73',
        '\x35\x37\x34\x36\x33\x38\x68\x44\x6b\x71\x73\x61',
        '\x47\x65\x74\x43\x75\x72\x72\x65\x6e\x74\x44\x61\x74\x61',
        '\x5f\x72\x65\x6d\x6f\x76\x65\x43\x61\x74\x65\x67\x6f\x72\x79',
        '\x5f\x6f\x6e\x50\x6c\x75\x73\x42\x75\x74\x74\x6f\x6e\x43\x6c\x69\x63\x6b',
        '\x55\x74\x69\x6c\x73'
    ];
    _0x444f = function () {
        return _0x473bf8;
    };
    return _0x444f();
}
PKD_SST_ToolTCManager = class PKD_SST_ToolTCManager extends KDCore[_0x4d2d61(0x15b)] {
    constructor() {
        var _0x49b77f = _0x4d2d61;
        super(), this[_0x49b77f(0x157)](), this['\x61\x70\x70\x65\x61\x72'](0x28);
    }
    [_0x4d2d61(0x16e)](_0x14cf92) {
        var _0x6e26fb = _0x4d2d61;
        this[_0x6e26fb(0x177)] = _0x14cf92;
    }
    [_0x4d2d61(0x157)]() {
        var _0xf44e74 = _0x4d2d61;
        this[_0xf44e74(0x14d)] = new KDCore[(_0xf44e74(0x17b))](0xa, this['\x5f\x72\x65\x66\x72\x65\x73\x68'][_0xf44e74(0x160)](this)), this[_0xf44e74(0x16b)](), this[_0xf44e74(0x153)]();
    }
    ['\x5f\x63\x72\x65\x61\x74\x65\x4d\x61\x69\x6e']() {
        var _0x460771 = _0x4d2d61;
        return this[_0x460771(0x181)](PKD_SimpleSkillsTree['\x55\x74\x69\x6c\x73'][_0x460771(0x179)](_0x460771(0x15e)));
    }
    [_0x4d2d61(0x153)]() {
        var _0x39d2f1 = _0x4d2d61;
        this[_0x39d2f1(0x171)] = new Sprite(), this[_0x39d2f1(0x176)] = PKD_SimpleSkillsTree['\x55\x74\x69\x6c\x73']['\x4e\x65\x77\x42\x75\x74\x74\x6f\x6e'](_0x39d2f1(0x172)), this[_0x39d2f1(0x176)]['\x61\x64\x64\x43\x6c\x69\x63\x6b\x48\x61\x6e\x64\x6c\x65\x72'](this[_0x39d2f1(0x170)]['\x62\x69\x6e\x64'](this)), this['\x5f\x62\x75\x74\x74\x6f\x6e\x73']['\x61\x64\x64\x43\x68\x69\x6c\x64'](this[_0x39d2f1(0x176)]), this[_0x39d2f1(0x176)][_0x39d2f1(0x158)](0x1a9, 0x42), this[_0x39d2f1(0x176)][_0x39d2f1(0x15f)] = ![], this[_0x39d2f1(0x17d)] = PKD_SimpleSkillsTree[_0x39d2f1(0x16a)][_0x39d2f1(0x159)](_0x39d2f1(0x15c)), this['\x62\x74\x6e\x4c']['\x61\x64\x64\x43\x6c\x69\x63\x6b\x48\x61\x6e\x64\x6c\x65\x72'](this[_0x39d2f1(0x169)][_0x39d2f1(0x160)](this)), this[_0x39d2f1(0x171)][_0x39d2f1(0x181)](this['\x62\x74\x6e\x4c']), this[_0x39d2f1(0x17d)][_0x39d2f1(0x158)](0x176, 0x42), this[_0x39d2f1(0x181)](this[_0x39d2f1(0x171)]);
    }
    [_0x4d2d61(0x169)]() {
        var _0x1776a2 = _0x4d2d61, _0x1783ef;
        if (PKD_SimpleSkillsTree[_0x1776a2(0x16a)][_0x1776a2(0x16c)]())
            return;
        _0x1783ef = PKD_SimpleSkillsTree[_0x1776a2(0x16a)][_0x1776a2(0x167)]();
        if (_0x1783ef == null)
            return;
        _0x1783ef[_0x1776a2(0x178)] > 0x1 && !PKD_SimpleSkillsTree[_0x1776a2(0x174)]() ? (SoundManager[_0x1776a2(0x14b)](), window[_0x1776a2(0x182)](_0x1776a2(0x161))) : (SoundManager[_0x1776a2(0x16f)](), _0x1783ef[_0x1776a2(0x15a)]([]), this['\x5f\x63\x61\x74\x65\x67\x6f\x72\x69\x65\x73\x53\x70\x72'][_0x1776a2(0x155)](), this['\x5f\x63\x61\x74\x65\x67\x6f\x72\x69\x65\x73\x53\x70\x72']['\x73\x65\x6c\x65\x63\x74\x4c\x61\x73\x74']());
    }
    ['\x5f\x6f\x6e\x4d\x69\x6e\x75\x73\x42\x75\x74\x74\x6f\x6e\x43\x6c\x69\x63\x6b']() {
        var _0x1d7c07 = _0x4d2d61, _0xb06be3, _0x536c9e;
        if (PKD_SimpleSkillsTree[_0x1d7c07(0x16a)][_0x1d7c07(0x16c)]())
            return;
        _0xb06be3 = PKD_SimpleSkillsTree['\x55\x74\x69\x6c\x73'][_0x1d7c07(0x167)]();
        if (_0xb06be3 == null) {
            if ('\x42\x69\x51\x49\x7a' === _0x1d7c07(0x15d))
                return;
            else
                return;
        }
        _0x536c9e = this[_0x1d7c07(0x177)][_0x1d7c07(0x180)];
        if (_0x536c9e === 0x0)
            return;
        if (_0xb06be3[_0x536c9e] == null)
            return;
        SoundManager[_0x1d7c07(0x16f)](), _0xb06be3[_0x536c9e][_0x1d7c07(0x178)] > 0x0 ? PKD_SimpleSkillsTree['\x55\x74\x69\x6c\x73'][_0x1d7c07(0x14a)](_0x1d7c07(0x17e), this[_0x1d7c07(0x168)]['\x62\x69\x6e\x64'](this, _0x536c9e)) : this[_0x1d7c07(0x168)](_0x536c9e);
    }
    [_0x4d2d61(0x168)](_0x52f903) {
        var _0x48dc4f = _0x4d2d61, _0x3a49a3, _0x6b34fb;
        try {
            return PKD_SimpleSkillsTree[_0x48dc4f(0x16a)]['\x47\x65\x74\x43\x75\x72\x72\x65\x6e\x74\x44\x61\x74\x61']()[_0x48dc4f(0x14c)](_0x52f903, 0x1), this['\x5f\x63\x61\x74\x65\x67\x6f\x72\x69\x65\x73\x53\x70\x72'][_0x48dc4f(0x155)](), this[_0x48dc4f(0x177)][_0x48dc4f(0x183)](_0x52f903 - 0x1), _0x3a49a3 = PKD_SimpleSkillsTree['\x55\x74\x69\x6c\x73']['\x47\x65\x74\x43\x75\x72\x72\x65\x6e\x74\x44\x61\x74\x61'](), PKD_SimpleSkillsTree['\x55\x74\x69\x6c\x73'][_0x48dc4f(0x165)]($gameTemp[_0x48dc4f(0x162)], _0x3a49a3);
        } catch (_0x478e2d) {
            return _0x6b34fb = _0x478e2d, KDCore['\x77\x61\x72\x6e\x69\x6e\x67'](_0x6b34fb);
        }
    }
    ['\x5f\x72\x65\x66\x72\x65\x73\x68']() {
        var _0x1839b7 = _0x4d2d61;
        if (this[_0x1839b7(0x177)] == null) {
            if (_0x1839b7(0x14e) === _0x1839b7(0x14f))
                return;
            else
                return;
        }
        this[_0x1839b7(0x176)][_0x1839b7(0x15f)] = this[_0x1839b7(0x177)][_0x1839b7(0x173)] > 0x1, this[_0x1839b7(0x176)]['\x76\x69\x73\x69\x62\x6c\x65'] === !![] && (this['\x62\x74\x6e\x52'][_0x1839b7(0x15f)] = this[_0x1839b7(0x177)][_0x1839b7(0x180)] > 0x0);
    }
    [_0x4d2d61(0x17f)]() {
        var _0x13677c = _0x4d2d61, _0x54dba1;
        super[_0x13677c(0x17f)](), (_0x54dba1 = this[_0x13677c(0x14d)]) != null && _0x54dba1[_0x13677c(0x17f)]();
    }
};

// Generated by CoffeeScript 2.6.1
var PKD_SST_TreesCategories;

PKD_SST_TreesCategories = class PKD_SST_TreesCategories extends KDCore.Sprite {
  constructor() {
    super(...arguments);
    this._create();
  }

  update() {
    super.update();
    return this._updateKeyboardGamepadControls();
  }

  refresh() {
    return this.setupCategoriesCount(PKD_SimpleSkillsTree.Utils.GetCurrentData().length);
  }

  selectLast() {
    return this.selectCategory(this.categoriesCount - 1);
  }

  _create() {
    this._selectedIndex = 0;
    this.categoriesCount = 1;
    this._createMain();
    this._createHelpButtons();
    this._createArrowButtons();
    this._createCategoryTitleText();
  }

  _createMain() {
    return this.addChild(PKD_SimpleSkillsTree.Utils.NewSprite('skillsTreeCategoryMain'));
  }

  _createHelpButtons() {
    this.helpButtonsSpr = PKD_SimpleSkillsTree.Utils.NewSprite('skillsTreeCategoryHelpButtons');
    this.helpButtonsSpr.visible = false;
    return this.addChild(this.helpButtonsSpr);
  }

  _createArrowButtons() {
    this._buttons = new Sprite();
    this.btnR = PKD_SimpleSkillsTree.Utils.NewButton("ra2");
    this.btnR.addClickHandler(this.nextCategoryClick.bind(this));
    this._buttons.addChild(this.btnR);
    this.btnR.move(570, 20);
    this.btnL = PKD_SimpleSkillsTree.Utils.NewButton("la2");
    this.btnL.addClickHandler(this.prevCategoryClick.bind(this));
    this._buttons.addChild(this.btnL);
    this.btnL.move(220, 20);
    this.addChild(this._buttons);
    this._buttons.visible = false;
  }

  _createCategoryTitleText() {
    var t;
    t = new KDCore.UI.Sprite_UIText({
      visible: true,
      size: {
        w: 260,
        h: 34
      },
      alignment: "center",
      font: {
        face: null,
        size: 20,
        italic: false
      },
      margins: {
        x: 0,
        y: 0
      },
      outline: {
        color: null,
        width: 2
      },
      textColor: "#e7c788",
      // ? can be Null or not exists
      shadow: {
        color: "#000",
        opacity: 200,
        margins: {
          x: 1,
          y: 1
        }
      }
    });
    t.x = 280;
    t.y = 18;
    this.addChild(t);
    this.titleTextSpr = t;
  }

  _refreshCategory() {
    this._refreshHelpIcons();
    this.titleTextSpr.draw(this._getCategotyTitle());
  }

  _getCategotyTitle() {
    var categoryNameNote, classData;
    classData = PKD_SimpleSkillsTree.Utils.GetCurrentClass();
    if (classData != null) {
      categoryNameNote = "pSTCatName_" + this._selectedIndex;
      if (String.any(classData.meta[categoryNameNote])) {
        return classData.meta[categoryNameNote];
      } else {
        if (this._selectedIndex === 0) {
          return classData.name;
        } else {
          return "Add title via Note: <pSTCatName_" + this._selectedIndex + ":NAME>";
        }
      }
    } else {
      return "[null]";
    }
  }

  _refreshHelpIcons() {
    this.helpButtonsSpr.visible = this.categoriesCount > 1;
    this._buttons.visible = this.helpButtonsSpr.visible;
  }

  setupCallback(callback) {
    this.callback = callback;
  }

  setupCategoriesCount(categoriesCount) {
    this.categoriesCount = categoriesCount;
    return this.selectCategory(0);
  }

  selectCategory(index) {
    if (this.categoriesCount > 1) {
      if (index < 0) {
        this._selectedIndex = this.categoriesCount - 1;
      } else if (index > this.categoriesCount - 1) {
        this._selectedIndex = 0;
      } else {
        this._selectedIndex = index;
      }
    } else {
      this._selectedIndex = 0;
    }
    this._refreshCategory();
    this.activate();
  }

  nextCategoryClick() {
    if (PKD_SimpleSkillsTree.Utils.IsGlobalModalState()) {
      return;
    }
    SoundManager.playCursor();
    return this.selectCategory(this._selectedIndex + 1);
  }

  prevCategoryClick() {
    if (PKD_SimpleSkillsTree.Utils.IsGlobalModalState()) {
      return;
    }
    SoundManager.playCursor();
    return this.selectCategory(this._selectedIndex - 1);
  }

  activate() {
    if (this.callback == null) {
      return;
    }
    return this.callback(this._selectedIndex);
  }

  _updateKeyboardGamepadControls() {
    if (this.categoriesCount < 2) {
      return;
    }
    if (PKD_SimpleSkillsTree.Utils.IsGlobalModalState()) {
      return;
    }
    if (Input.isTriggered('pageup')) {
      this.nextCategoryClick();
      return Input.clear();
    } else if (Input.isTriggered('pagedown')) {
      this.prevCategoryClick();
      return Input.clear();
    }
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_SST_UniversalChoiceListWindow;

PKD_SST_UniversalChoiceListWindow = class PKD_SST_UniversalChoiceListWindow extends Window_Selectable {
  constructor() {
    super(...arguments);
    this.setBackgroundType(2);
  }

  setData(_data) {
    this._data = _data;
    return this.refresh();
  }

  maxItems() {
    if (this._data != null) {
      return this._data.length;
    } else {
      return 0;
    }
  }

  maxCols() {
    return 3;
  }

  colSpacing() {
    return 16;
  }

  item() {
    return this.itemAt(this.index());
  }

  itemAt(index) {
    if ((this._data != null) && index >= 0) {
      return this._data[index];
    } else {
      return null;
    }
  }

  drawItem(index) {
    var dx, e, item, rect, t;
    try {
      this.contents.fontSize = 14;
      item = this.itemAt(index);
      if (item == null) {
        return;
      }
      rect = this.itemLineRect(index);
      dx = 0;
      if (String.any(item.image)) {
        this._drawItemImage(item.image, rect);
        dx += 38;
      } else if (item.iconIndex != null) {
        this._drawItemIcon(item.iconIndex, rect);
        dx += 38;
      }
      t = "[" + item.value + "] " + item.text;
      this.drawText(t, rect.x + dx, rect.y, rect.width, 'left');
      return this.resetFontSettings();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _drawItemIcon(iconIndex, rect) {
    return this.drawIcon(iconIndex, rect.x - 2, rect.y + 2);
  }

  _drawItemImage(image, rect) {
    var e;
    try {
      return KDCore.Utils.loadImageAsync("pSimpleSkillsTree", image).then(this._drawItemImageBody.bind(this, rect));
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _drawItemImageBody(rect, b) {
    var e;
    try {
      return this.contents.drawOnMe(b, rect.x - 4, rect.y, 36, 36);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

};


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Boot.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__start, _;
  //@[DEFINES]
  _ = Scene_Boot.prototype;
  //@[ALIAS]
  ALIAS__start = _.start;
  _.start = function() {
    ALIAS__start.call(this, ...arguments);
    PKD_SimpleSkillsTree.LoadPluginSettings();
    PKD_SimpleSkillsTree.Utils.LoadSkillsTrees();
  };
})();

// ■ END Scene_Boot.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Menu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createCommandWindow, ALIAS__onPersonalOk, _;
  //@[DEFINES]
  _ = Scene_Menu.prototype;
  //@[ALIAS]
  ALIAS__createCommandWindow = _.createCommandWindow;
  _.createCommandWindow = function() {
    var e;
    ALIAS__createCommandWindow.call(this, ...arguments);
    if (!PKD_SimpleSkillsTree.PP.isShowCommandInMM()) {
      return;
    }
    try {
      this._commandWindow.setHandler('pSkillTree', this.commandPersonal.bind(this));
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  //@[ALIAS]
  ALIAS__onPersonalOk = _.onPersonalOk;
  _.onPersonalOk = function() {
    if (this._commandWindow.currentSymbol() === 'pSkillTree') {
      return this.pOnSkillTreeOk();
    } else {
      return ALIAS__onPersonalOk.call(this, ...arguments);
    }
  };
})();

// ■ END Scene_Menu.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Menu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Menu.prototype;
  _.pOnSkillTreeOk = function() {
    var actor, e;
    try {
      if (KDCore.isMV()) {
        actor = $gameParty.members()[this._statusWindow.index()];
      } else {
        actor = this._statusWindow.actor(this._statusWindow.index());
      }
      if (actor != null) {
        window.OpenSkillTreeForActor(actor.actorId());
      } else {
        this.onPersonalCancel();
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.onPersonalCancel();
    }
  };
})();

// ■ END Scene_Menu.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_MenuCommand.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__addMainCommands, _;
  //@[DEFINES]
  _ = Window_MenuCommand.prototype;
  //@[ALIAS]
  ALIAS__addMainCommands = _.addMainCommands;
  _.addMainCommands = function() {
    var e;
    ALIAS__addMainCommands.call(this, ...arguments);
    try {
      if (PKD_SimpleSkillsTree.PP.isShowCommandInMM()) {
        return this._pAddSkillTreeViewCommand();
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END Window_MenuCommand.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_MenuCommand.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_MenuCommand.prototype;
  _._pAddSkillTreeViewCommand = function() {
    var e, title;
    try {
      title = PKD_SimpleSkillsTree.PP.getCommandTitle();
      return this.addCommand(title, "pSkillTree", true);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END Window_MenuCommand.coffee
//---------------------------------------------------------------------------

//Plugin PKD_SimpleSkillsTree builded by PKD PluginBuilder 2.2 - 07.06.2023