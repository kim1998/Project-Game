//=============================================================================
// Drag_CommonEventTrigger.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc A plugin to trigger common event at specific moment in your game.
 * v0.1.0
 * @author Drag
 *
 * @url https://discord.gg/ckYyc8hHGb
 *
 * @help 
 * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
 * A question, a suggestion, an issue ? Please join me on my dedicated
 * discord server thanks to the dedicated link above.
 *
 * This plugin will let you run a specified common event at specific
 * times in your game, inside the plugin parameters.
 *
 *
 *
 * @param Player Movement
 * @desc Player Movement
 * @type select
 *
 * @param OnPlayerMove
 * @parent Player Movement
 * @text On Player Move (Before)
 * @desc Run this common event just before the player move (walk and dash).
 * @type common_event
 * @default 0
 *
 * @param OnPlayerMoved
 * @parent Player Movement
 * @text On Player Move (After)
 * @desc Run this common event just after the player move (walk and dash).
 * @type common_event
 * @default 0
 *
 * @param OnPlayerWalk
 * @parent Player Movement
 * @text On Player Walk (Before)
 * @desc Run this common event just before the player walk.
 * @type common_event
 * @default 0
 *
 * @param OnPlayerWalked
 * @parent Player Movement
 * @text On Player Walk (After)
 * @desc Run this common event just after the player walk.
 * @type common_event
 * @default 0
 *
 * @param OnPlayerDash
 * @parent Player Movement
 * @text On Player Dash (Before)
 * @desc Run this common event just before the player dash.
 * @type common_event
 * @default 0
 *
 * @param OnPlayerDashed
 * @parent Player Movement
 * @text On Player Dash (After)
 * @desc Run this common event just after the player dash.
 * @type common_event
 * @default 0
 *
 * @param OnPlayerChangeDirection
 * @parent Player Movement
 * @text On Player Change Direction
 * @desc Run this common event when the player change direction.
 * @type common_event
 * @default 0
 * 
 * @param OnPlayerCollide
 * @parent Player Movement
 * @text On Player Collide
 * @desc Run this common event when the player collide with an unpassable tile. (Fail to move)
 * @type common_event
 * @default 0
 *
 *
 * @param Player Jump
 * @desc Player Jump
 * @type select
 *
 * @param OnJump
 * @parent Player Jump
 * @text On Player Jump (Before)
 * @desc Run this common event just before the player jump.
 * @type common_event
 * @default 0
 *
 * @param OnJumped
 * @parent Player Jump
 * @text On Player Jump (After)
 * @desc Run this common event just after the player jump.
 * @type common_event
 * @default 0
 *
 *
 * @param Player Transfer
 * @desc Player Transfer
 * @type select
 *
 * @param OnPlayerTransfered
 * @parent Player Transfer
 * @text On Player Transfer
 * @desc Run this common event when the player has transfered from a map to another.
 * @type common_event
 * @default 0
 *
 *
 * @param Level Up
 * @desc Level Up
 * @type select
 *
 * @param OnCharacterLevelUp
 * @parent Level Up
 * @text On Character Level Up (Player And Followers)
 * @desc Run this common event when a character level up (player and followers).
 * @type common_event
 * @default 0
 *
 * @param OnPlayerLevelUp
 * @parent Level Up
 * @text On Player Level Up (Player Only)
 * @desc Run this common event when the player level up.
 * @type common_event
 * @default 0
 *
 * @param OnFollowerLevelUp
 * @parent Level Up
 * @text On Follower Level Up (Followers Only)
 * @desc Run this common event when one of the followers level up.
 * @type common_event
 * @default 0
 *
 *
 * @param Level Down
 * @desc Level Down
 * @type select
 *
 * @param OnCharacterLevelDown
 * @parent Level Down
 * @text On Character Level Down (Player And Followers)
 * @desc Run this common event when a character level down (player and followers).
 * @type common_event
 * @default 0
 *
 * @param OnPlayerLevelDown
 * @parent Level Down
 * @text On Player Level Down (Player Only)
 * @desc Run this common event when the player level down.
 * @type common_event
 * @default 0
 *
 * @param OnFollowerLevelDown
 * @parent Level Down
 * @text On Follower Level Down (Followers Only)
 * @desc Run this common event when one of the followers level down.
 * @type common_event
 * @default 0
 *
 *
 * @param EXP Change
 * @desc EXP Change
 * @type select
 *
 * @param OnCharacterChangeEXP
 * @parent EXP Change
 * @text On Character Change EXP (Gain And Lose)
 * @desc Run this common event when a character has his EXP changed. (gain and lose).
 * @type common_event
 * @default 0
 *
 * @param OnCharacterGainEXP
 * @parent EXP Change
 * @text On Character Gain EXP
 * @desc Run this common event when a character gain EXP.
 * @type common_event
 * @default 0
 *
 * @param OnCharacterLoseEXP
 * @parent EXP Change
 * @text On Character Lose EXP
 * @desc Run this common event when a character lose EXP.
 * @type common_event
 * @default 0
 *
 */

var Imported = Imported || {};
Imported.Drag_CommonEventTrigger = true;

var Drag = Drag || {};
Drag.CommonEventTrigger = Drag.CommonEventTrigger || {};

(function() {
	
	//------------------------------------------------------------------------------------------------------------
	// global variables
	
	Drag.CommonEventTrigger.pluginName = "Drag_CommonEventTrigger";
	Drag.CommonEventTrigger._playerDirection;
	Drag.CommonEventTrigger.jumpCache = false;
	
	//-----------------------------------------------------------------------------
	// plugin parameters
	
    Drag.CommonEventTrigger.params = PluginManager.parameters(Drag.CommonEventTrigger.pluginName) || null;
	if (Drag.CommonEventTrigger.params) {
		Drag.CommonEventTrigger.params.OnPlayerMove = parseInt(Drag.CommonEventTrigger.params.OnPlayerMove) || 0; 
		Drag.CommonEventTrigger.params.OnPlayerMoved = parseInt(Drag.CommonEventTrigger.params.OnPlayerMoved) || 0;
		Drag.CommonEventTrigger.params.OnPlayerWalk = parseInt(Drag.CommonEventTrigger.params.OnPlayerWalk) || 0; 
		Drag.CommonEventTrigger.params.OnPlayerWalked = parseInt(Drag.CommonEventTrigger.params.OnPlayerWalked) || 0;
		Drag.CommonEventTrigger.params.OnPlayerDash = parseInt(Drag.CommonEventTrigger.params.OnPlayerDash) || 0; 
		Drag.CommonEventTrigger.params.OnPlayerDashed = parseInt(Drag.CommonEventTrigger.params.OnPlayerDashed) || 0;
		Drag.CommonEventTrigger.params.OnPlayerChangeDirection = parseInt(Drag.CommonEventTrigger.params.OnPlayerChangeDirection) || 0;
		Drag.CommonEventTrigger.params.OnPlayerCollide = parseInt(Drag.CommonEventTrigger.params.OnPlayerCollide) || 0;
		
		Drag.CommonEventTrigger.params.OnJump = parseInt(Drag.CommonEventTrigger.params.OnJump) || 0;
		Drag.CommonEventTrigger.params.OnJumped = parseInt(Drag.CommonEventTrigger.params.OnJumped) || 0;
		
		Drag.CommonEventTrigger.params.OnPlayerTransfered = parseInt(Drag.CommonEventTrigger.params.OnPlayerTransfered) || 0;
		
		Drag.CommonEventTrigger.params.OnCharacterLevelUp = parseInt(Drag.CommonEventTrigger.params.OnCharacterLevelUp) || 0;
		Drag.CommonEventTrigger.params.OnPlayerLevelUp = parseInt(Drag.CommonEventTrigger.params.OnPlayerLevelUp) || 0;
		Drag.CommonEventTrigger.params.OnFollowerLevelUp = parseInt(Drag.CommonEventTrigger.params.OnFollowerLevelUp) || 0;
		
		Drag.CommonEventTrigger.params.OnCharacterLevelDown = parseInt(Drag.CommonEventTrigger.params.OnCharacterLevelDown) || 0;
		Drag.CommonEventTrigger.params.OnPlayerLevelDown = parseInt(Drag.CommonEventTrigger.params.OnPlayerLevelDown) || 0;
		Drag.CommonEventTrigger.params.OnFollowerLevelDown = parseInt(Drag.CommonEventTrigger.params.OnFollowerLevelDown) || 0;
		
		Drag.CommonEventTrigger.params.OnCharacterLevelDown = parseInt(Drag.CommonEventTrigger.params.OnCharacterLevelDown) || 0;
		Drag.CommonEventTrigger.params.OnPlayerLevelDown = parseInt(Drag.CommonEventTrigger.params.OnPlayerLevelDown) || 0;
		Drag.CommonEventTrigger.params.OnFollowerLevelDown = parseInt(Drag.CommonEventTrigger.params.OnFollowerLevelDown) || 0;
		
		Drag.CommonEventTrigger.params.OnCharacterChangeEXP = parseInt(Drag.CommonEventTrigger.params.OnCharacterChangeEXP) || 0;
		Drag.CommonEventTrigger.params.OnCharacterGainEXP = parseInt(Drag.CommonEventTrigger.params.OnCharacterGainEXP) || 0;
		Drag.CommonEventTrigger.params.OnCharacterLoseEXP = parseInt(Drag.CommonEventTrigger.params.OnCharacterLoseEXP) || 0;
	}
	
	Drag.CommonEventTrigger.runCommonEvent = function(commonEventId) {
		if (!commonEventId)
			return;
		let commonEvent = {...$dataCommonEvents[commonEventId]};
		if (commonEvent) {
			commonEvent.list.unshift({code: 230, indent: 0, parameters: [0]});
			if ($gameMap._interpreter._list) {
				$gameMap._interpreter._list = $gameMap._interpreter._list.concat(commonEvent.list);
			} else { 
				$gameMap._interpreter._index = 0;
				$gameMap._interpreter._list = commonEvent.list;
			}
		}
	};
	
	//--------------------------------------------------------------------------------------------------------
	// Game Player
	
	var Drag_Game_Player_moveStraight = Game_Player.prototype.moveStraight;
	Game_Player.prototype.moveStraight = function(d) {
		let isPassable = this.canPass(this.x, this.y, d);
		if (Drag.CommonEventTrigger._playerDirection !== d)
			Drag.CommonEventTrigger.runCommonEvent(Drag.CommonEventTrigger.params.OnPlayerChangeDirection);
		Drag.CommonEventTrigger._playerDirection = d;
		Drag.CommonEventTrigger.runCommonEvent(Drag.CommonEventTrigger.params.OnPlayerMove);
		if (this.isDashing())
			Drag.CommonEventTrigger.runCommonEvent(Drag.CommonEventTrigger.params.OnPlayerDash);
		else
			Drag.CommonEventTrigger.runCommonEvent(Drag.CommonEventTrigger.params.OnPlayerWalk);
		Drag_Game_Player_moveStraight.call(this, d);
		if (isPassable) {
			Drag.CommonEventTrigger.runCommonEvent(Drag.CommonEventTrigger.params.OnPlayerMoved);
			if (this.isDashing())
				Drag.CommonEventTrigger.runCommonEvent(Drag.CommonEventTrigger.params.OnPlayerDashed);
			else
				Drag.CommonEventTrigger.runCommonEvent(Drag.CommonEventTrigger.params.OnPlayerWalked);
		} else {
			Drag.CommonEventTrigger.runCommonEvent(Drag.CommonEventTrigger.params.OnPlayerCollide);
		}
	};
	
	var Drag_Game_Player_reserveTransfer = Game_Player.prototype.reserveTransfer;
	Game_Player.prototype.reserveTransfer = function(mapId, x, y, d, fadeType) {
		Drag_Game_Player_reserveTransfer.apply(this, arguments);
		Drag.CommonEventTrigger.runCommonEvent(Drag.CommonEventTrigger.params.OnPlayerTransfered);
	};
	
	var Drag_Game_Player_jump = Game_Player.prototype.jump;
	Game_Player.prototype.jump = function(xPlus, yPlus) {
		Drag.CommonEventTrigger.runCommonEvent(Drag.CommonEventTrigger.params.OnJump);
		Drag_Game_Player_jump.call(this, xPlus, yPlus);
		Drag.CommonEventTrigger.jumpCache = true;
	};
	
	var Drag_Game_Player_updateJump = Game_Player.prototype.updateJump;
	Game_Player.prototype.updateJump = function() {
		Drag_Game_Player_updateJump.call(this);
		if (Drag.CommonEventTrigger.jumpCache && this._jumpCount <= 0) {
			Drag.CommonEventTrigger.runCommonEvent(Drag.CommonEventTrigger.params.OnJumped);
			Drag.CommonEventTrigger.jumpCache = false;
		}
	};
	
	//--------------------------------------------------------------------------------------------------------
	// Game Actor
	
	var Drag_Game_Actor_levelUp = Game_Actor.prototype.levelUp;
	Game_Actor.prototype.levelUp = function() {
		Drag_Game_Actor_levelUp.call(this);
		if ($gameParty.leader() === this)
			Drag.CommonEventTrigger.runCommonEvent(Drag.CommonEventTrigger.params.OnPlayerLevelUp);
		else if ($gameParty.allMembers)
			Drag.CommonEventTrigger.runCommonEvent(Drag.CommonEventTrigger.params.OnFollowerLevelUp);
		Drag.CommonEventTrigger.runCommonEvent(Drag.CommonEventTrigger.params.OnCharacterLevelUp);
	};
	
	var Drag_Game_Actor_levelDown = Game_Actor.prototype.levelDown;
	Game_Actor.prototype.levelDown = function() {
		Drag_Game_Actor_levelDown.call(this);
		if ($gameParty.leader() === this)
			Drag.CommonEventTrigger.runCommonEvent(Drag.CommonEventTrigger.params.OnPlayerLevelDown);
		else if ($gameParty.allMembers)
			Drag.CommonEventTrigger.runCommonEvent(Drag.CommonEventTrigger.params.OnFollowerLevelDown);
		Drag.CommonEventTrigger.runCommonEvent(Drag.CommonEventTrigger.params.OnCharacterLevelDown);
	};
	
	var Drag_Game_Actor_changeExp = Game_Actor.prototype.changeExp;
	Game_Actor.prototype.changeExp = function(exp, show) {
		let isGain;
		if (exp > this.currentExp())
			isGain = true;
		else 
			isGain = false;
		Drag_Game_Actor_changeExp.apply(this, arguments);
		Drag.CommonEventTrigger.runCommonEvent(Drag.CommonEventTrigger.params.OnCharacterChangeEXP);
		if (isGain) {
			Drag.CommonEventTrigger.runCommonEvent(Drag.CommonEventTrigger.params.OnCharacterGainEXP);
		} else {
			Drag.CommonEventTrigger.runCommonEvent(Drag.CommonEventTrigger.params.OnCharacterLoseEXP);
		}
	};
	
})();