//========================================================================================
//=== TSR_TransferTrigger === A Plugin by The Northern Frog ==============================
//========================================================================================

var TSR = TSR || {};
TSR.transferTrg = TSR.transferTrg || {};
TSR.transferTrg.version = 1.02;
TSR.transferTrg.name = 'TSR_TransferTrigger';

var Imported = Imported || {};
Imported[TSR.transferTrg.name] = true;

//========================================================================================

/*:
 * @target MZ
 * @plugindesc v1.0.2 Trigger events from a distance and allow movement outside the 
 *                 map before transfer
 * 
 * @author TSR, The Northern Frog, 2021      
 * @help 
 * =========================================================================================
 * == About this Plugin ====================================================================
 * =========================================================================================
 * 
 *  EVENTS COMMENT TAGS:
 * 
 *      Lines trigger
 *      =============
 *      Map events (with touch trigger) having the following comment tags will 
 *      activate from a number of tiles specified by the distance argument, 
 *      in the relevant direction.
 * 
 *      <TRIGGER DOWN: distance>
 *      <TRIGGER LEFT: distance>
 *      <TRIGGER RIGHT: distance>
 *      <TRIGGER UP: distance>
 *      
 *      *Example: a map event with the tag <TRIGGER UP: 3> will activate when 
 *                player walk on the event or up to 3 tiles above it.
 * 
 * 
 *      Square trigger
 *      ==============
 *      Map events (with touch trigger) having the following comment tags will 
 *      activate within the square defined by the X and Y arguments, using the
 *      event itself as the origin. Negatives values can be used.
 *           
 *      <SQUARE TRIGGER: X, Y>
 * 
 *      *Example 1: a map event with the tag <TRIGGER SQUARE: 2, 2> will form a
 *                  triggering square of 3 tiles horizontal by 3 tiles vertical,
 *                  with the event on the top left corner.
 * 
 *      *Example 2: a map event with the tag <TRIGGER SQUARE: -2, -2> will form a
 *                  triggering square of 3 tiles horizontal by 3 tiles vertical,
 *                  with the event on the bottom right corner.
 * 
 * 
 *      Map edge trigger
 *      ================
 *      Map events (with touch trigger) having the following comment tag won't
 *      activate when player walk on it. Instead, standing on the event will
 *      allow the player to make a move outside the map (screen). The transfer
 *      command of the event will then activate once the player has left the map.
 * 
 *      <OUTSIDE MAP TRIGGER>
 *  
 *      *For obvious reason, this system is designed for tranfer events on the
 *       edge of a map. If you put this comment tag in an event not on map edge,
 *       nothing will happen.
 * 
 * 
 * 
 * =======================================================================================
 * == Term of Usage ======================================================================
 * =======================================================================================
 * 
 * Use in any independant RPG Maker MZ and MV projects, including commercials.
 *
 * Credit is required for using this Plugin. 
 * For crediting, use 'TSR' along with one of
 * the following terms: 
 *      'The Northern Frog' or 'A frog from the north'
 * 
 * Do not change the Header or the Terms of usage.
 * 
 * Do not change the main Object name.
 *
 * Editing of the script is allowed for your personal use for your project. 
 *
 * DO NOT REDISTRIBUTE!
 * If you want to share it, share the link to my itch.io account: 
 * https://the-northern-frog.itch.io/
 * 
 *
 * =======================================================================================
 * == Version and compatibility ==========================================================
 * =======================================================================================
 * 26/10/2021 completed plugin,                                 v1.0.0
 * 28/01/2022 instruction for public release,                   v1.0.1
 * 10/11/2023 add square trigger comment tag,                   v1.0.2
 *
 * =======================================================================================
 * == END ================================================================================                                             
 * =======================================================================================
 *
 *                              "Have fun!"
 *                                                  TSR, The Northern Frog
 *
 * =======================================================================================
 *
 */


//== PARAMETERS ============================================================================

TSR.Parameters = PluginManager.parameters(TSR.transferTrg.name);



//=== GAME ===========================================


//=== Game_CharacterBase ===

TSR.transferTrg._Game_CharacterBase_canPass =
Game_CharacterBase.prototype.canPass;
Game_CharacterBase.prototype.canPass = function(x, y, d) {
    if ($gameMap.isOnOuterMapEvent(x, y, d)) {
        return true;
    } else {
        return TSR.transferTrg._Game_CharacterBase_canPass.apply(this, arguments);
    }
};

TSR.transferTrg._Game_CharacterBase_isCollidedWithChar = 
Game_CharacterBase.prototype.isCollidedWithCharacters;
Game_CharacterBase.prototype.isCollidedWithCharacters = function(x, y) {
    if ($gameMap.eventsXyDist(x, y).some(e => e.isOuterTrigger())) {
        return false;
    } else {
        return TSR.transferTrg._Game_CharacterBase_isCollidedWithChar.apply(this, arguments);
    }
};


//=== Game_Map ===

Game_Map.prototype.isInsideMap = function(x, y) {
    return x >= 0 && x < this.width() && y >= 0 && y < this.height();
};

Game_Map.prototype.isOnOuterMapEvent = function(x, y, d) {
    const x2 = $gameMap.roundXWithDirection(x, d);
    const y2 = $gameMap.roundYWithDirection(y, d);
    return this.eventsXyDist(x, y).some(e => e.isOuterTrigger()) &&
           this.isInsideMap(x, y) && 
           !this.isInsideMap(x2, y2) 
};

Game_Map.prototype.eventsXyDist = function(x, y) {
    const events = this.eventsXy(x, y);
    for (const event of this.events()) {
        if (event._triggerSquare) {
            const sqrX = event._triggerSquare[0];
            const sqrY = event._triggerSquare[1];
            for (let i = 0; i < Math.abs(sqrX) + 1; i++) {
                const distX = sqrX > 0 ? event.x + i :  event.x - i;
                if (distX === x && event.y === y) {
                    if (!events.includes(event)) events.push(event);
                }
                for (let j = 1; j < Math.abs(sqrY) + 1; j++) {
                    const distY = sqrY > 0 ? event.y + j :  event.y - j;
                    if (distX === x && distY === y) {
                        if (!events.includes(event)) events.push(event);
                    }
                }
            } 
        }  else {
            if (event._triggerDown) {
                for (let i = 1; i < event._triggerDown + 1; i++) {
                    if (event.y + i === y && event.x === x) {
                        if (!events.includes(event)) events.push(event);
                    }
                }              
            }
            if (event._triggerLeft) {
                for (let i = 1; i < event._triggerLeft + 1; i++) {
                    if (event.x - i === x && event.y === y) {
                        if (!events.includes(event)) events.push(event);
                    }
                }              
            } 
            if (event._triggerRight) {
                for (let i = 1; i < event._triggerRight + 1; i++) {
                    if (event.x + i === x && event.y === y) {
                        if (!events.includes(event)) events.push(event);
                    }
                }           
            } 
            if (event._triggerUp) {
                for (let i = 1; i < event._triggerUp + 1; i++) {
                    if (event.y - i === y && event.x === x) {
                        if (!events.includes(event)) events.push(event);
                    }
                }              
            }          
        }     
    }
    return events
};

Game_Map.prototype.startDistantMapEvent = function(x, y, triggers) {
    const events = this.eventsXyDist(x, y);
    for (const event of events) {
        $gamePlayer.startMapEvent(event.x, event.y, triggers, false);
    }
    return events.length > 0;
};


//=== Game_Player ===

TSR.transferTrg._Game_Player_checkEventTriggerHere = 
Game_Player.prototype.checkEventTriggerHere;
Game_Player.prototype.checkEventTriggerHere = function(triggers) {
    TSR.transferTrg._Game_Player_checkEventTriggerHere.call(this, triggers);
    if (this.canStartLocalEvents()) {
        if (!$gameMap.isInsideMap(this.x, this.y)) {
            const d = this.direction();
            const bd = this.reverseDir(d);
            const bx = $gameMap.roundXWithDirection(this.x, bd);
            const by = $gameMap.roundYWithDirection(this.y, bd);
            this.startMapEvent(bx, by, triggers, false);
            if (!$gameMap.startDistantMapEvent(bx, by, triggers)) {
                const horz = d === 2 || d === 8 ? 1 : 0;
                const vert = horz ? 0 : 1;
                if (!$gameMap.startDistantMapEvent(bx + horz, by + vert, triggers)) {
                    $gameMap.startDistantMapEvent(bx - horz, by - vert, triggers)
                }
            }
        } else {
            $gameMap.startDistantMapEvent(this.x, this.y, triggers);
        }
    }
};

TSR.transferTrg._Game_Player_startMapEvent = Game_Player.prototype.startMapEvent; 
Game_Player.prototype.startMapEvent = function(x, y, triggers, normal) {
    for (const event of $gameMap.eventsXy(x, y)) {
        if (event.isOuterTrigger() && $gameMap.isValid(this.x, this.y)) return;
    }
    return TSR.transferTrg._Game_Player_startMapEvent.apply(this, arguments);
};


//=== Game_Event ===

TSR.transferTrg._Game_Event_setupPage = Game_Event.prototype.setupPage
Game_Event.prototype.setupPage = function() {
  TSR.transferTrg._Game_Event_setupPage.call(this);
  this.checkEventTriggerTag();
};

Game_Event.prototype.checkEventTriggerTag = function() {
    if (!this.page()) return;
    this._triggerSquare = false;
    const tag1 = /<(?:TRIGGER DOWN|HIT DOWN):[ ](\d+)>/i;
    const tag2 = /<(?:TRIGGER LEFT|HIT LEFT):[ ](\d+)>/i;
    const tag3 = /<(?:TRIGGER RIGHT|HIT RIGHT):[ ](\d+)>/i;
    const tag4 = /<(?:TRIGGER UP|HIT UP):[ ](\d+)>/i;
    const tag5 = /<(?:TRIGGER SQUARE|HIT SQUARE):[ ]-*(\d+), -*(\d+)>/i;
    for (const cmd of this.list()) {
      if ([108, 408].includes(cmd.code)) {
        const cmt = cmd.parameters[0];
        if (cmt.match(tag1)) {
            const dist = parseInt(RegExp.$1);
            this._triggerDown = dist;
        } else if (cmt.match(tag2)) {
            const dist = parseInt(RegExp.$1);
            this._triggerLeft = dist;
        } else if (cmt.match(tag3)) {
            const dist = parseInt(RegExp.$1);
            this._triggerRight = dist;
        } else if (cmt.match(tag4)) {
            const dist = parseInt(RegExp.$1);
            this._triggerUp = dist;
        } else if (cmt.match(tag5)) {
            const ar = cmt.slice(cmt.indexOf(':') + 1, cmt.indexOf('>')).split(',');
            const distX = parseInt(ar[0]);
            const distY = parseInt(ar[1]);
            this._triggerSquare = [distX, distY];
        } 
      } 
    }
  };

  Game_Event.prototype.isOuterTrigger = function() {
    if (!this.page()) return;
    const tag = /<(?:OUTER TRIGGER|OUTSIDE MAP TRIGGER)>/i;
    for (const cmd of this.list()) {
      if ([108, 408].includes(cmd.code)) {
        if (cmd.parameters[0].match(tag)) {
            return true;
        }
      } 
    }
    return false;
};


//=== END ==============================================================================
//======================================================================================