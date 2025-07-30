/*:
 * @plugindesc 
 * Show the TileID of the current tile the player is standing on.
 * 
 * @author Digital Religion
 *
 * @help Welcome to the Tile ID Finder plugin for RPG Maker MZ!
 * 
 * With this plugin, you can easily find the ID of tiles.
 * Simply create a new map or use an existing one, and place
 * the tiles you want to identify. Then, while testing the game,
 * walk over the tile, and the corresponding ID will be displayed 
 * for you. It's a handy tool to help you manage and organize 
 * your game's tiles effectively. Happy game developing!
 */

(() => {
    // Plugin name and parameters.
    const pluginName = "TileIDDisplayMZ";
    const parameters = PluginManager.parameters(pluginName);

    // Constants: IDs for tracking the display of the welcome message.
    const WELCOME_SWITCH_ID = 1;
  
    // State variable to check if the tile ID has been displayed after the player stops moving.
    let hasDisplayedTileID = false;

    // Function to retrieve and display the tile ID.
    function displayTileID() {
      const x = $gamePlayer.x;
      const y = $gamePlayer.y;
      let tileId = 0;

      // Loop to check all layers from topmost to ground for the tile ID.
      for (let z = 3; z >= 0; z--) {
        tileId = $gameMap.tileId(x, y, z);
        if (tileId !== 0) {
          break;
        }
      }
      
      // Display the tile ID in the game message window and console.
      $gameMessage.add("Tile ID - " + tileId);
      console.log("Tile ID - " + tileId);

      // Update the state variable.
      hasDisplayedTileID = true;
    }

    // Overriding the moveStraight function to reset the state variable.
    const _Game_Player_moveStraight = Game_Player.prototype.moveStraight;
    Game_Player.prototype.moveStraight = function(d) {
      hasDisplayedTileID = false;
      _Game_Player_moveStraight.call(this, d);
    };

    // Overriding the updateStop function to display tile ID when the player stops moving.
    const _Game_Player_updateStop = Game_Player.prototype.updateStop;
    Game_Player.prototype.updateStop = function() {
        _Game_Player_updateStop.call(this);
        if (this.isStopping() && !this.isMoving() && !hasDisplayedTileID) {
            displayTileID();
        }
    };

    // Display the welcome message on starting a new map.
    const _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _Scene_Map_start.call(this);

        // Check if the welcome switch is OFF.
        if (!$gameSwitches.value(WELCOME_SWITCH_ID)) {
            // Display the welcome message.
            $gameMessage.add("Welcome to the Tile ID Finder plugin for RPG Maker MZ!\nWith this plugin, you can easily find the ID of tiles.\nSimply create a new map or use an existing one, and place\nthe tiles you want to identify. Then, while testing the game,\nwalk over the tile, and the corresponding ID will be displayed for you.\nIt's a handy tool to help you manage and organize your game's tiles effectively.\nHappy game developing!");
        }
    };

    // Override the isPassable function to make all tiles walkable.
    Game_Map.prototype.isPassable = function(x, y, d) {
        return true;
    };
  
    // Override the performDamage function to prevent the character from taking any damage.
    Game_Battler.prototype.performDamage = function() {};
})();
