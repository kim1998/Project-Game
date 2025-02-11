//-----------------------------------------------------------------------------
// Dungeonmind - DM Item Categories
// DM_ItemCategories.js
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.DM_ItemCategories = true;

var Dungeonmind = Dungeonmind || {};
Dungeonmind.IC = Dungeonmind.IC || {};
Dungeonmind.IC.version = 1.07;

/*:
 * DM_ItemCategories.js
 * Version 1.07
 *
 * @plugindesc [Rpg Maker MZ] [Tier 2] [Version 1.07] - This plugin will help you change various 
 * important settings for the item categories.
 *
 * @url https://www.dmplugins.com
 * @target MZ
 * @author Dungeonmind
 *
 * @author Dungeonmind
 *
 * @param Category Font Size
 * @type number
 * @min 1
 * @default 28
 * @desc Choose the font size for the item categories.
 *
 * @param Category Style
 * @type select
 * @option Show Icons Only
 * @option Show Command Text Under Icon
 * @option Show Icon Beside Command (default)
 * @default Show Icon Beside Command (default)
 *
 * @param Item Categories
 * @type struct<itemCategories>[]
 * @desc Define all the possible item categories in your game.
 * Reserved Symbols: 'all',item','weapon','armor','keyItem'
 * @default ["{\"Category Command Text\":\"All\",\"Category Icon\":\"208\",\"Category Symbol\":\"all\"}","{\"Category Command Text\":\"Item\",\"Category Icon\":\"176\",\"Category Symbol\":\"item\"}","{\"Category Command Text\":\"Weapon\",\"Category Icon\":\"96\",\"Category Symbol\":\"weapon\"}","{\"Category Command Text\":\"Armor\",\"Category Icon\":\"128\",\"Category Symbol\":\"armor\"}","{\"Category Command Text\":\"Key Item\",\"Category Icon\":\"300\",\"Category Symbol\":\"keyItem\"}"]
 *
 * @help
 *
 * ===========================================================================
 * Terms and Condtions
 * ===========================================================================
 *
 * You may use this plugin for free in a non-commercial game only. However, 
 * commercial license is available. Read down below. Please credit me as
 * Dungeonmind or Justin Lamarche.
 *
 * Don't take any code for your own released plugins. You can edit the code 
 * for your own projects only.
 *
 * You must obtain a license from www.dmplugins.com before using this plugin
 * in a commercial project. More information about that license can be found
 * on the plugin page you downloaded it from.
 *
 * I am not responsible or liable if you choose to use this plugin in your
 * project. It is up to you to figure out if its a right fit (part of the 
 * reason why the full version is always available for you to download and 
 * try out first).
 *
 * What I can Promise : I won't just disappear, I am a full time game dev and
 * my plugins will be kept up to date. Just make sure you have the latest build
 * by visiting the plugin page for the one you want.
 *
 * ===========================================================================
 * Warning!
 * ===========================================================================
 *
 * PLEASE CAREFULLY READ YOUR LICENSE THAT IS AVAILABLE ON THE PLUGIN PAGE YOU
 * DOWNLOADED FROM DMPLUGINS.COM. IF YOU WANT TO USE ANY PLUGIN MADE BY ME IN
 * IN A COMMERCIAL PROJECT, YOU MIGHT HAVE TO BUY THE APPROPRIATE LICENSE FIRST. 
 * (ALSO, AVAILABLE ON THE PLUGIN PAGE.)
 *
 * I am not responsible if this plugin doesn't work for other versions of 
 * rpg maker MZ other than the latest version, 1.8.0. Please report any bugs
 * in the comments at www.dmplugins.com.
 *
 * ===========================================================================
 * How to Use
 * ===========================================================================
 * This plugin will let you create as many categories as you want in your 
 * game. You can then set custom categories through note tags for items, 
 * weapons, armors, and key items in the database for your project.
 *
 * ===========================================================================
 * Plugin Parameters - Item Categories
 * ===========================================================================
 *
 * ---------------------------------------------------------------------------
 * CATEGORY COMMAND TEXT
 * ---------------------------------------------------------------------------
 * *Set the text you want the players to see for the category.
 *
 * ---------------------------------------------------------------------------
 * CATEGORY ICON
 * ---------------------------------------------------------------------------
 * *Set the icon you want to use for the category.
 *
 * ---------------------------------------------------------------------------
 * CATEGORY COMMAND SYMBOL
 * ---------------------------------------------------------------------------
 * *Set the symbol for the category. This will be used to set an item, weapon
 * armor or key item to appear in a custom category. It must be unique!
 *
 * One thing to keep in mind is to not use any of the reserved symbols for
 * your custom categories because they are used for the default categories. 
 * If you do not want to use the default categories, you can just delete them 
 * and make new categories. I've also added an extra default category that
 * will just display all items from the database regardless of category set.
 *
 * RESERVED SYMBOLS : 
 * 'all' Displays every type of item from database regardless of category set.
 * 'item' : Displays all items from database regardless of category set.
 * 'weapon' : Displays all weapons from database regardless of category set.
 * 'armor' : Displays all armors from database regardless of category set.
 * 'keyItem' : Displays all key items from database regardless of category set.
 *
 * NOTE : If you decide to delete any of the default categories, you will
 * have to manually set the relevant categories in the notetags for each item
 * in the database, or else no items will appear in the list.
 *
 * ===========================================================================
 * Note tags for $dataItems, $dataWeapons and $dataArmors
 * ===========================================================================
 * 
 * ---------------------------------------------------------------------------
 * <Categories>
 * x
 * x
 * </Categories>
 * ---------------------------------------------------------------------------
 * x : Set the item's category by symbol. It will then show up in each 
 * category that is set for it.
 *
 * ===========================================================================
 * Script Calls
 * ===========================================================================
 * 
 * ---------------------------------------------------------------------------
 * $gameCategories.setCustomCategories(string);
 * ---------------------------------------------------------------------------
 * *Changes the categories available to the player. This will affect all scenes
 * including my limited inventory and shop core plugins.
 *
 * string ➔ It's a string with a list of category symbols separated by commas.
 *
 * Examples :
 * $gameCategories.setCustomCategories('consumable, weapon');
 *  ➔ This will only include categories that have 'consumable' or 'weapon' as 
 * their symbols for the player to access items from.
 * $gameCategories.setCustomCategories('armor, keyItem');
 *  ➔ This will only include categories that have 'armor' or 'keyItem' as 
 * their symbols for the player to access items from.
 *
 * ---------------------------------------------------------------------------
 * $gameCategories.resetCategories();
 * ---------------------------------------------------------------------------
 * *Changes the categories available to the player. This will affect all scenes
 * including my limited inventory and shop core plugins.
 *
 * No Arguments ➔ This script call doesn't have any arguments.
 *
 * Examples :
 * $gameCategories.resetCategories();
 *  ➔ This will set the categories available to the player back to
 * normal.
 *
 * @command setCustomCategories
 * @text Set Custom Categories
 * @desc Changes the categories available to the player. This will 
 * affect all scenes including limited inventory and shop core.
 *
 * @arg categories
 * @text Categories
 * @default ["all","item","weapon","armor","keyItem"]
 * @type text[]
 * @desc The list of symbols for categories you want to set 
 * available to the player.
 *
 * @command resetCategories
 * @text Reset Categories
 * @desc This will set the available categories back to normal
 * for the player.
 */

  /*~struct~itemCategories:
    @param Category Command Text
    @desc Set the text for this category.
    @default Category

    @param Category Icon
    @desc Choose the icon you want to use for this category.
    @default 210

    @param Category Symbol
    @desc Set the symbol for this category.
    @default category
 */

//-----------------------------------------------------------------------------
// Parameters
//-----------------------------------------------------------------------------

 Dungeonmind.IC.parameters = PluginManager.parameters('DM_ItemCategories');

 Dungeonmind.IC.categoryFontSize = Number(Dungeonmind.IC.parameters['Category Font Size']);
 Dungeonmind.IC.itemCategoryStyle = Dungeonmind.IC.parameters['Category Style'];
 Dungeonmind.IC.itemCategories = JSON.parse(Dungeonmind.IC.parameters['Item Categories']);

//-----------------------------------------------------------------------------
// *Register Plugin Commands
//-----------------------------------------------------------------------------

PluginManager.registerCommand('DM_ItemCategories', 'setCustomCategories' , args => {
  const arg0 = JSON.parse(args.categories);
  $gameCategories.setCustomCategories(arg0);
});

PluginManager.registerCommand('DM_ItemCategories', 'resetCategories' , args => {
  $gameCategories.resetCategories();
});

//-----------------------------------------------------------------------------
// Game_Categories
//
// The game object class for handling dm categories.

function Game_Categories() {
    this.initialize(...arguments);
}

Game_Categories.prototype.initialize = function() {
    this.convertParamCategories();
    this.convertToSymbols();
};

Game_Categories.prototype.convertParamCategories = function() {
    this._table = [];
    let itemArray = {};
    for(let i = 0; i < Dungeonmind.IC.itemCategories.length; i++) {
        itemArray = JSON.parse(Dungeonmind.IC.itemCategories[i]);
        itemArray.isHidden = false;
        this._table.push(itemArray);
    }
};

Game_Categories.prototype.convertToSymbols = function() {
    this._symbols = [];
    let newSymbol = "";
    for(let i = 0; i < this._table.length; i++) {
        newSymbol = this._table[i]['Category Symbol'];
        this._symbols.push(newSymbol);
    }
};

Game_Categories.prototype.setCustomCategories = function(categories) {
    if(!Array.isArray(categories)) {
        categories = categories.replaceAll(', ',',');
        categories = categories.split(',');
    }
    for(let i = 0; i < this._table.length; i++) {
        this._table[i].isHidden = true;
        for(let i2 = 0; i2 < categories.length; i2++) {
            if(categories[i2] === this._table[i]['Category Symbol']) {
                this._table[i].isHidden = false;
            }
        }
    }
};

Game_Categories.prototype.resetCategories = function() {
    for(let i = 0; i < this._table.length; i++) {
        this._table[i].isHidden = false;
    }
};

//--------------------------------------------------------------------------------------
// DataManager
//--------------------------------------------------------------------------------------

Dungeonmind.IC.ALIAS_DataManager_createGameObjects = DataManager.createGameObjects;

DataManager.createGameObjects = function() {
    Dungeonmind.IC.ALIAS_DataManager_createGameObjects.call(this);
    $gameCategories = new Game_Categories();
};

Dungeonmind.IC.ALIAS_DataManager_makeSaveContents = DataManager.makeSaveContents;

DataManager.makeSaveContents = function() {
    const contents = Dungeonmind.IC.ALIAS_DataManager_makeSaveContents.call(this);
    contents.gameCategories = $gameCategories;
    return contents;
};

Dungeonmind.IC.ALIAS_DataManager_extractSaveContents = DataManager.extractSaveContents;

DataManager.extractSaveContents = function(contents) {
    Dungeonmind.IC.ALIAS_DataManager_extractSaveContents.call(this, contents);
    $gameCategories = contents.gameCategories;
};

//-----------------------------------------------------------------------------
// Scene_Item
//
// The scene class of the item screen.

Scene_Item.prototype.createCategoryWindow = function() {
    const rect = this.categoryWindowRect();
    this._categoryWindow = new Window_ItemDMCategory(rect);
    this._categoryWindow.setHelpWindow(this._helpWindow);
    this._categoryWindow.setHandler("ok", this.onCategoryOk.bind(this));
    this._categoryWindow.setHandler("cancel", this.popScene.bind(this));
    this.addWindow(this._categoryWindow);
};

//-----------------------------------------------------------------------------
// Window_ItemDMCategory
//
// The window for selecting a category of items on the item and shop screens.

function Window_ItemDMCategory() {
    this.initialize(...arguments);
}

Window_ItemDMCategory.prototype = Object.create(Window_HorzCommand.prototype);
Window_ItemDMCategory.prototype.constructor = Window_ItemDMCategory;

Window_ItemDMCategory.prototype.initialize = function(rect) {
    Window_HorzCommand.prototype.initialize.call(this, rect);
};

Window_ItemDMCategory.prototype.maxCols = function() {
    let cols = 0;
    for(let i = 0; i < $gameCategories._table.length; i++) {
        if(!$gameCategories._table[i].isHidden) {
            cols++;
        }
    }
    return cols;
};

Window_ItemDMCategory.prototype.update = function() {
    Window_HorzCommand.prototype.update.call(this);
    if (this._itemWindow) {
        this._itemWindow.setCategory(this.getCategorySymbol());
    }
    if (this._containerWindow) {
        this._containerWindow.setCategory(this.getCategorySymbol());
    }
    if (this._buyWindow) {
        this._buyWindow.setCategory(this.getCategorySymbol());
    }
};

Window_ItemDMCategory.prototype.drawItem = function(index) {
    const rect = this.itemLineRect(index);
    var align = this.itemTextAlign();
    var sum = 0;
    var align = "left";
    var sum = 36;
    this.contents.fontSize = Dungeonmind.IC.categoryFontSize;
    if(Dungeonmind.IC.itemCategoryStyle === 'Show Icon Beside Command (default)') {
        this.drawIcon(this._storedIconIds[index], rect.x, rect.y + 2);
        this.drawText(this.commandName(index), rect.x + sum, rect.y, rect.width, align);
    } else if(Dungeonmind.IC.itemCategoryStyle === 'Show Icons Only') {
        this.drawIcon(this._storedIconIds[index], rect.x + rect.width / 2 - 16, rect.y + 2);
    } else if(Dungeonmind.IC.itemCategoryStyle === 'Show Command Text Under Icon') {
        this.drawIcon(this._storedIconIds[index], rect.x + rect.width / 2 - 16, rect.y + 2);
        const itemWidth = this.textWidth(this.commandName(index)) + this.itemPadding();
        this.drawText(this.commandName(index), rect.x + rect.width / 2 - this.textWidth(this.commandName(index)) / 2, rect.y + 12, this.textWidth(this.commandName(index)), align);
    }
};

Window_ItemDMCategory.prototype.getCategorySymbol = function() {
    return $gameCategories._list[this.index()];
};

Window_ItemDMCategory.prototype.makeCommandList = function() {
	$gameCategories._list = [];
    this._storedIconIds = [];
    for(let i = 0; i < $gameCategories._table.length; i++) {
        if (this.needsCommand($gameCategories._table[i]['Command Symbol']) && !$gameCategories._table[i].isHidden) {
            this.addCommand($gameCategories._table[i]['Category Command Text'], $gameCategories._table[i]['Category Symbol']);
            $gameCategories._list.push($gameCategories._table[i]['Category Symbol']);
            var symbol = $gameCategories._table[i]['Category Symbol'];
            index = $gameCategories._table.map(function(obj) { return obj['Category Symbol'] }).indexOf(symbol);
            iconIndex = Number($gameCategories._table[index]['Category Icon']);
            this._storedIconIds.push(iconIndex);
        }
    }
};

Window_ItemDMCategory.prototype.needsCommand = function(name) {
    const table = $gameCategories._symbols;
    const index = table.indexOf(name);
    if (index >= 0) {
        return $dataSystem.itemCategories[index];
    }
    return true;
};

Window_ItemDMCategory.prototype.setItemWindow = function(itemWindow) {
    this._itemWindow = itemWindow;
};

Window_ItemDMCategory.prototype.needsSelection = function() {
    return this.maxItems() >= 1;
};

Window_ItemDMCategory.prototype.setContainerWindow = function(containerWindow) {
    this._containerWindow = containerWindow;
};

Window_ItemDMCategory.prototype.refresh = function() {
    this.clearCommandList();
    this.makeCommandList();
    Window_Selectable.prototype.refresh.call(this);
};

//-----------------------------------------------------------------------------
// Window_ItemList
//
// The window for selecting an item on the item screen.

Window_ItemList.prototype.includes = function(item) {
    switch (this._category) {
        case "all":
            return item !== null;
        case "item":
            return DataManager.isItem(item) && item.itypeId === 1;
        case "weapon":
            return DataManager.isWeapon(item);
        case "armor":
            return DataManager.isArmor(item);
        case "keyItem":
            return DataManager.isItem(item) && item.itypeId === 2;
        default:
            return this.includeNewCategories(item);
    }
};

Window_ItemList.prototype.includeNewCategories = function(item) {
    for(let i = 0; i < $gameCategories._symbols.length; i++) {
        if(item !== null && this.getCategories(item, $gameCategories._symbols[i]) && this._category === $gameCategories._symbols[i]) {
            return true;
        }
    }
    return false;
};

Window_ItemList.prototype.getCategories = function(item, symbol) {
    if(item.meta.Categories) {
        item.categories = item.note.split('<Categories>');
        item.categories = item.categories[1].split('</Categories>');
        item.categories = item.categories[0].split('\n');
        item.categories.filter((str) => str !== '');
    } else {
        return false;
    }
    for(let i = 0; i < item.categories.length; i++) {
        cat = item.categories[i];
        if(cat === symbol) {
            return true;
        }
    }
    return false;
};
