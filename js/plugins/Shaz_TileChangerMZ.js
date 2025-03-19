

//=============================================================================
// Tile Changer (Shaz_TileChangerMZ.js)
// by Shaz, edited by SeaPhoenix for compatibility with MZ
// Last Updated: 2023.10.16 v1.20
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Change tiles on map or copy tiles from another map
 * @author Shaz (edited by SeaPhoenix to work on MZ, with some minor changes)
 *
 * @help
 * This plugin allows you to copy a block of tiles from another map to the 
 * current map, or from one place on the current map to another, or to 
 * change an individual tile to a specific tile id.
 *
 * To Use:
 * -------
 *
 * To copy tiles from other maps, you must set up references to the map id
 * in the current map's note box.  This consists of the mapId, for
 * each map you want to copy tiles from.  The format should be as follows:
 *
 * If you want to copy tiles from just one map, e.g., map 5: 
 * <load:[5]> 
 * 
 * If you want to copy tiles from two or more maps, e.g., maps 5, 10, and 12:
 * <load:[5, 10, 12]> 
 *
 * This will then allow you to run the Copy Tiles plugin command, and refer to
 * the maps by their map ids.
 *
 * If you only wish to copy tile areas from the current map to another place
 * on the current map, you do not need to set up the map notes.  This is only
 * required if you want to copy from other maps.
 *
 * The current map and the maps being copied must use the same tileset, or at
 * least have the same or similar tiles in the same location on the tileset.
 * This plugin does not copy the tile image, just the tile id, so if the source
 * map has a vase of flowers, and the current map has a teddy bear in the same
 * location on the tileset, a teddy bear is what will appear when you copy the
 * tiles.
 *
 * If you only wish to use the Change Tile plugin command, you do not need to 
 * set up the map notes.
 *
 * To find the tile id, see this very helpful thread by Llareian:
 * https://forums.rpgmakerweb.com/index.php?threads/how-to-determine-your-tileid.91129/
 * 
 * Plugin Commands:
 * ----------------
 *
 * Copy Tiles: Copy tiles from a different map, or from the same map. You can copy
 * either a single tile or a rectangular block (you specify the source's upper left 
 * x and y, and the lower right x and y). You can copy all layers (including 
 * shadow and region), or choose which layers you want to copy.
 *
 * Change Tile: Change one tile at a specific location and layer.
 *
 * When using the plugin commands, you can enter either a number or a script call 
 * for the coordinates, z-layer, and mapId. 
*
 * For example, if you want to change a tile where the coordinates are determined 
 * by variables 10 and 11, set the x-coordinate to $gameVariables.value(10) and
 * the y-coordinate to $gameVariables.value(11). 
 * 
 * Change Log:
 * -----------
 * 2023.10.16  1.20  Modified by SeaPhoenix for MZ
 * 2018.03.24  1.10  Save tile changes (fixes issue with returning to map
 *                   after menu or battle, and loading games) - no longer any
 *                   need for an event to re-do tile changes when map is
 *                   reloaded.
 *
 * @command copyTiles
 * @text Copy tiles
 * @desc Select tiles to copy to a destination from a source.
 *
 * @arg destX
 * @type string
 * @text Destination x
 * @desc x-coordinate of the top left destination area
 *  
 * @arg destY
 * @type string
 * @text Destination y
 * @desc y-coordinate of the top left destination area
 * 
 * @arg source
 * @type string
 * @text Source map id
 * @desc Source (mapId), 0 for current map
 * @min 0
 * @default 0
 *
 * @arg sourceX1
 * @type string
 * @text Source x1
 * @desc x-coordinate of the top left source area
 *  
 * @arg sourceY1
 * @type string
 * @text Source y1
 * @desc y-coordinate of the top left destination area
 * 
 * @arg sourceX2
 * @type string
 * @text Source x2
 * @desc x-coordinate of the bottom right source area
 *  
 * @arg sourceY2
 * @type string
 * @text Source y2
 * @desc y-coordinate of the bottom right destination area
 * 
 * @arg copyAll
 * @type boolean
 * @text Copy all layers?
 * @desc Set to ON if all layers should be copied. Otherwise, set this to OFF, and list layers in the next field.
 * @on On
 * @off Off
 * @default true
 * 
 * @arg layers
 * @type string[]
 * @text Copy which layers?
 * @desc If not all layers, copy which layers (0: lower ground, 1: upper ground, 2: lower, 3: upper, 4: shadow, 5: region)
 * 
 * @command changeTile
 * @text Change tile
 * @desc Changes the tile at the specified coordinates/layer to the tile id. No auto-formatting of autotiles happens.
 *
 * @arg coordX
 * @type string
 * @text x-coordinate
 * @desc x-coordinate of the tile to be changed
 * 
 * @arg coordY
 * @type string
 * @text y-coordinate
 * @desc y-coordinate of the tile to be changed
 *  
 * @arg layerZ
 * @type string
 * @text Z-layer
 * @desc Ground (0), ground (1), lower (2), upper (3), shadow (4), region (5)
 *  
 * @arg tileId
 * @type string
 * @text Tile ID
 * @desc Change to this tile id (from the same tileset)
 * 
 */
var Imported = Imported || {};
Imported.Shaz_TileChangerMZ = true;
var Shaz = Shaz || {};
Shaz.TC = Shaz.TC || {};
Shaz.TC.Version = 1.20;
(function() {
    const pluginName = 'Shaz_TileChangerMZ';
    
    PluginManager.registerCommand(pluginName, 'copyTiles', args => {  // SPX modified for MZ
        $gameMap.copyTiles(args);
    });
    PluginManager.registerCommand(pluginName, 'changeTile', args => {  // SPX modified for MZ
        $gameMap.changeTile(args);
    });
    var _Shaz_TC_DataManager_onLoad = DataManager.onLoad;
    DataManager.onLoad = function(object) {
        _Shaz_TC_DataManager_onLoad.call(this, object);
        if (object === $dataMap) {
            $dataMap.extraMaps = {};
            $dataMap.extraMapCount = 0;
            if ($dataMap.meta.load) {
                $dataMap.meta.load = JSON.parse($dataMap.meta.load);
                for (var i = 0; i < $dataMap.meta.load.length; i++) {
                    var mapId = parseInt($dataMap.meta.load[i]); // SPX modified map references: only mapIds are used
                    var name = 'map' + mapId;
                    var filename = 'Map%1.json'.format(mapId.padZero(3));
                    this.loadExtraMap(name, filename);
                }
            }
        }
    };
    DataManager.loadExtraMap = function(name, src) {
        var xhr = new XMLHttpRequest();
        var url = 'data/' + src;
        xhr.open('GET', url);
        xhr.overrideMimeType('application/json');
        xhr.onload = function() {
            if (xhr.status < 400) {
                var data = JSON.parse(xhr.responseText);
                $dataMap.extraMaps[name] = {};
                $dataMap.extraMaps[name].width = data.width;
                $dataMap.extraMaps[name].height = data.height;
                $dataMap.extraMaps[name].data = data.data;
                $dataMap.extraMapCount -= 1;
            } else {
                this.onXhrError(name, src, url);  // SPX added based on MZ's code
            }
        }
        xhr.onerror = () => this.onXhrError(name, src, url);  // SPX modified based on MZ's code
        $dataMap.extraMaps[name] = null;
        $dataMap.extraMapCount += 1;
        xhr.send();
    };
    var _Shaz_TC_DataManager_isMapLoaded = DataManager.isMapLoaded;
    DataManager.isMapLoaded = function() {
        return _Shaz_TC_DataManager_isMapLoaded.call(this) && $dataMap.extraMapCount === 0;  // SPX note: do we need to add isEventTest
    };
    var _Shaz_TC_Spriteset_Map_updateTilemap = Spriteset_Map.prototype.updateTilemap;
    Spriteset_Map.prototype.updateTilemap = function() {
        _Shaz_TC_Spriteset_Map_updateTilemap.call(this);
        if ($gameTemp.needMapDataRefresh()) {
            this._tilemap.setData($gameMap.width(), $gameMap.height(), $gameMap.data());
            this._tilemap.refresh();
            $gameTemp.setMapDataRefresh(false);
        }
    };
    var _Shaz_TC_Game_Temp_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function() {
        _Shaz_TC_Game_Temp_initialize.call(this);
        this._needMapDataRefresh = false;
    };
    Game_Temp.prototype.needMapDataRefresh = function() {
        return this._needMapDataRefresh;
    };
    Game_Temp.prototype.setMapDataRefresh = function(refresh) {
        this._needMapDataRefresh = refresh;
    };
    var _Shaz_TC_Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Shaz_TC_Game_System_initialize.call(this);
        this._mapTiles = [];
    };
    Game_System.prototype.saveMapTile = function(location, tileId) {
        var mapId = $gameMap.mapId();
        if (!this._mapTiles[mapId]) {
            this._mapTiles[mapId] = {};
        }
        this._mapTiles[mapId][location] = tileId;
    };
    Game_System.prototype.restoreMapTiles = function(mapId) {
        var tiles = this._mapTiles[mapId] || {};
        Object.keys(tiles).forEach(function(location) {
            $dataMap.data[location] = tiles[location];
        }.bind(this));
        $gameTemp.setMapDataRefresh(true);
    };
    Game_Map.prototype.copyTiles = function(args) {
        // SPX modified function slightly for MZ
        var dtlx = eval(args.destX);
        var dtly = eval(args.destY);
        var src = eval(args.source);
        var stlx = eval(args.sourceX1);
        var stly = eval(args.sourceY1);
        var sbrx = eval(args.sourceX2);
        var sbry = eval(args.sourceY2);
        var copyAll = args.copyAll === 'true';
        let zarray;
        if (copyAll) {
            zarray = [0, 1, 2, 3, 4, 5];
        } else {
            const layers = JSON.parse(args.layers).map(x => eval(x));
            zarray = [];
            for (var i = 0; i < layers.length; i++) {
                zarray.push(layers[i]);
            }
        }
        if (src === 0) {
            var source = $dataMap;
        } else {
            var source = $dataMap.extraMaps['map' + src];
        }
        var sw = sbrx - stlx + 1;
        var sh = sbry - stly + 1;
        for (var z1 = 0; z1 < zarray.length; z1++) {
            for (var y = 0; y < sh; y++) {
                for (var x = 0; x < sw; x++) {
                    var sx = stlx + x;
                    var sy = stly + y;
                    var dx = dtlx + x;
                    var dy = dtly + y;
                    var z = zarray[z1];
                    var dIndex = this.calcIndex($dataMap, dx, dy, z);
                    var sIndex = this.calcIndex(source, sx, sy, z);
                    var tileId = source.data[sIndex];
                    $dataMap.data[dIndex] = tileId;
                    $gameSystem.saveMapTile(dIndex, tileId);
                }
            }
        }
        $gameTemp.setMapDataRefresh(true);
    };
    Game_Map.prototype.changeTile = function(args) {
        var x = eval(args.coordX);
        var y = eval(args.coordY);
        var z = eval(args.layerZ);
        var tileId = eval(args.tileId);
        var mapLoc = this.calcIndex($dataMap, x, y, z);
        $dataMap.data[mapLoc] = tileId;
        $gameSystem.saveMapTile(mapLoc, tileId);
        $gameTemp.setMapDataRefresh(true);
    };
    Game_Map.prototype.calcIndex = function(dataMap, x, y, z) {
        var w = dataMap.width;
        var h = dataMap.height;
        return (z * w * h) + (y * w) + x;
    };
    var _Shaz_TC_Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function() {
        $gameSystem.restoreMapTiles(this._transfer ? $gamePlayer.newMapId() : $gameMap.mapId());
        _Shaz_TC_Scene_Map_onMapLoaded.call(this);
    };
})();

