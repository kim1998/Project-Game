// ============================================================================
//  LordValinar Plugin - Follower Trail Visual Limit
//  LvMZ_FollowerTrailLimit.js
// ============================================================================

var Imported = Imported || {};
Imported["LvMZ_FollowerTrailLimit"] = true;

// import essentials from core
if (!Imported["LvMZ_Core"]) {
	function LvParams() {
		this.initialize(...arguments);
	}

	LvParams.prototype.initialize = function(pluginName) {
		this._data = PluginManager.parameters(pluginName);
	};

	LvParams.prototype.value = function(key, type='') {
		switch (type) {
			case 'arr':  return this._data[key].split(",");
			case 'bool': return this._data[key].toLowerCase() === "true";
			case 'eval': return eval(this._data[key]);
			case 'jnum': return JSON.parse(this._data[key]).map(e => Number(e));
			case 'json': return JSON.parse(this._data[key]).map(e => JSON.parse(e));
			case 'num':  return Number(this._data[key]);
			case 'obj':  return JSON.parse(this._data[key]);
			case 'strL': return this._data[key].toLowerCase();
			case 'strU': return this._data[key].toUpperCase();
			default:     return this._data[key];
		}	
	};
}; // end of import

/*:
 * @target MZ
 * @plugindesc [v1.0] Lets you control the visual limit of followers.
 * @author LordValinar
 * @url https://github.com/DarkArchon85/RMMZ-Plugins
 *
 * @param id
 * @text Variable ID
 * @type variable
 * @desc The ID of the variable to control the visual 
 * limit of followers on the map.
 * @default 0
 *
 *
 * @help
 * ----------------------------------------------------------------------------
 * Instructions
 * ----------------------------------------------------------------------------
 *
 * Assign a variable to be the controlling value. If this variable value 
 * is ever > 0, then the party visual trail will be limited.
 *
 * ----------------------------------------------------------------------------
 * Terms of Use
 * ----------------------------------------------------------------------------
 *
 * Free to use and modify for commercial and noncommercial games, with credit.
 * Do NOT remove my name from the Author of this plugin
 * Do NOT reupload this plugin (modified or otherwise) anywhere other than the 
 * RPG Maker Web main forums: https://forums.rpgmakerweb.com/index.php
 *
 * ----------------------------------------------------------------------------
 * Changelog
 * ----------------------------------------------------------------------------
 *
 * v1.0 - Plugin finished!
 *
 * ----------------------------------------------------------------------------
 */

var LvMZ = LvMZ || {};
LvMZ.FollowerTrail = {
	name: "Follower Trail",
	desc: "Limits the visual number of followers on the map",
	version: 1.0
};

(() => {
'use strict';

const params = new LvParams("LvMZ_FollowerTrailLimit");
const varID  = params.value('id', 'num');

/******************************************************************************
	rmmz_objects.js
******************************************************************************/



Game_Follower.prototype.actor = function() {
    return $gameParty.members()[this._memberIndex];
};

Game_Followers.prototype.setup = function() {
    this._data = [];
    for (let i = 1; i < 5; i++) {
        this._data.push(new Game_Follower(i));
    }
};



})();