// SimpleMapShade.js Ver.1.4.0
// MIT License (C) 2024 あわやまたな
// http://opensource.org/licenses/mit-license.php

/*:
* @target MZ
* @plugindesc It represents the shade.
* @author あわやまたな (Awaya_Matana)
* @url https://awaya3ji.seesaa.net/article/503958183.html
* @help Ver.1.4.0
* Darkens the character when there is a map shadow under their feet.
* It also supports half step movement and dot movement plugins.
*
* Adding <shadeFlagOnly> to a map's notes will switch it into Single-Picture Map mode,
* allowing you to set only the shade flags, without displaying shadows.
*
* @param shadeDepth
* @text Shade Depth
* @desc Specify 0-255.
* @type number
* @max 255
* @default 64
*
* @param updateFrequency
* @text Update Frequency
* @desc High: Always checks while moving
* Low: Checks before and after moving (same as bushes)
* @type boolean
* @on High
* @off Low
* @default true
*
* @param regionId
* @text Region ID
* @desc Do not display shadows on the region (flag only).
* @default 0
*
* @param terrainTag
* @text Terrain Tag
* @desc Do not display shadows on the terrain (flag only).
* @default 0
*
*/

/*:ja
* @target MZ
* @plugindesc 日陰を表現します。
* @author あわやまたな (Awaya_Matana)
* @url https://awaya3ji.seesaa.net/article/503958183.html
* @help 足元にマップの影がある時にキャラクターを暗くします。
* 半歩移動、ドット移動プラグインなどにも対応。
*
* <shadeFlagOnly>とマップのメモに書くと一枚絵マップ用モードとなり、
* 影を表示せずに日陰の判定のみの配置が可能となります。
*
* [更新履歴]
* 2024/07/11：Ver.1.0.0　公開。
* 2024/07/15：Ver.1.1.0　判定を拡張。
* 2024/07/16：Ver.1.1.1　影を反映する対象が間違っていたので修正。
* 2024/07/18：Ver.1.1.2　足元算出の計算式が間違っていたので修正。
* 2024/07/28：Ver.1.1.3　一枚絵マップ用に<shadeFlagOnly>タグを追加。
* 2024/07/30：Ver.1.2.0　リージョンや地形タグで影を表示しない範囲を指定可能にしました。
* 2024/11/03：Ver.1.3.0　処理を削減しました。
* 2025/01/31：Ver.1.4.0　挙動を修正しました。
*
* @param shadeDepth
* @text 影の濃さ
* @desc 0-255で指定。
* @type number
* @max 255
* @default 64
*
* @param updateFrequency
* @text 更新頻度
* @desc 高：移動中は常時判定
* 低：移動前後に判定（茂み判定と同じ）
* @type boolean
* @on 高
* @off 低
* @default true
*
* @param regionId
* @text リージョンID
* @desc そのリージョンでは影を表示しません（判定のみ）。
* @default 0
*
* @param terrainTag
* @text 地形タグ
* @desc その地形では影を表示しません（判定のみ）。
* @default 0
*
*/

'use strict';
{
	const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
	const parameters = PluginManager.parameters(pluginName);
	const shadeDepth = +parameters.shadeDepth;
	const regionId = +parameters.regionId;
	const terrainTag = +parameters.terrainTag;
	const updateFrequency = parameters.updateFrequency !== "false";

	//-----------------------------------------------------------------------------
	// Game_Map

	Game_Map.prototype.shadeDepth = function() {
		return shadeDepth;
	};

	Game_Map.prototype.isShade = function(x, y, mode) {
		switch (mode) {
		case 0://影が周囲にある
			return this.isShade0(x, y);
		case 1://影が足元にある
			return this.isShade1(x, y);
		default:
			return this.isShade2(x, y);
		}
	};

	Game_Map.prototype.isShade0 = function(x, y) {
		const dx = x % 1;
		const dy = y % 1;
		const isHalfX = 0.25 < dx && dx <= 0.75;
		const isHalfY = 0 < dy && dy <= 0.5;
		if (0.75 < dx) {
			x++;
		}
		if (0.5 < dy) {
			y++;
		}
		const x0 = $gameMap.roundX(Math.trunc(x));
		const y0 = $gameMap.roundY(Math.trunc(y));
		const x1 = $gameMap.roundX(x0+1);
		const y1 = $gameMap.roundY(y0+1);
		if (!isHalfX && !isHalfY) {
			const shadowBits1 = this.shadowBits(x0, y0);
			const pattern1 = (0.75 < dx || dx < 1/6) && shadowBits1 & (1 << 0) && shadowBits1 & (1 << 2);
			const pattern2 = (dx <= 0.75 || 0.75 + 1/6 < dx) && shadowBits1 & (1 << 1) && shadowBits1 & (1 << 3);
			return pattern1 || pattern2;
		}
		if (!isHalfX) {
			const shadowBits1 = this.shadowBits(x0, y0);
			const shadowBits2 = this.shadowBits(x0, y1);
			const pattern1 = (0.75 < dx || dx < 1/6) && shadowBits1 & (1 << 2) && shadowBits2 & (1 << 0);
			const pattern2 = (dx <= 0.75 || 0.75 + 1/6 < dx) && shadowBits1 & (1 << 3) && shadowBits2 & (1 << 1);
			return pattern1 || pattern2;
		}
		if (!isHalfY) {
			const shadowBits1 = this.shadowBits(x0, y0);
			const shadowBits2 = this.shadowBits(x1, y0);
			const pattern1 = (dx <= 0.5 + 1/6) && shadowBits1 & (1 << 1) && shadowBits1 & (1 << 3);
			const pattern2 = (0.25 + 1/6 < dx) && (shadowBits2 & (1 << 0) && shadowBits2 & (1 << 2));
			return pattern1 || pattern2;
		}
		const shadowBits1 = this.shadowBits(x0, y0);
		const shadowBits2 = this.shadowBits(x1, y0);
		const shadowBits3 = this.shadowBits(x0, y1);
		const shadowBits4 = this.shadowBits(x1, y1);
		const pattern1 = (dx <= 0.5 + 1/6) && shadowBits1 & (1 << 3) && shadowBits3 & (1 << 1);
		const pattern2 = (0.25 + 1/6 < dx) && shadowBits2 & (1 << 2) && shadowBits4 & (1 << 0);
		return pattern1 || pattern2;
	};

	Game_Map.prototype.isShade1 = function(x, y) {
		const dx = x % 1;
		const dy = y % 1;
		const isHalfX = 0.25 < dx && dx <= 0.75;
		const isHalfY = 0 < dy && dy <= 0.5;
		if (0.75 < dx) {
			x++;
		}
		if (0.5 < dy) {
			y++;
		}
		const x0 = $gameMap.roundX(Math.trunc(x));
		const y0 = $gameMap.roundY(Math.trunc(y));
		const x1 = $gameMap.roundX(x0+1);
		const y1 = $gameMap.roundY(y0+1);
		if (!isHalfX && !isHalfY) {
			const shadowBits1 = this.shadowBits(x0, y0);
			const shadowBits2 = this.shadowBits(x1, y0);
			const pattern1 = (0.75 < dx || dx < 1/6) && (shadowBits1 & (1 << 2));
			const pattern2 = (dx <= 0.75 || 0.75 + 1/6 < dx) && (shadowBits1 & (1 << 3));
			return  pattern1 || pattern2;
		}
		if (!isHalfX) {
			const shadowBits1 = this.shadowBits(x0, y1);
			const shadowBits2 = this.shadowBits(x1, y1);
			const pattern1 = (0.75 < dx || dx < 1/6) && (shadowBits1 & (1 << 0));
			const pattern2 = (dx <= 0.75 || 0.75 + 1/6 < dx) && (shadowBits1 & (1 << 1));
			return pattern1 || pattern2;
		}
		if (!isHalfY) {
			const shadowBits1 = this.shadowBits(x0, y0);
			const shadowBits2 = this.shadowBits(x1, y0);
			const pattern1 = (dx <= 0.5 + 1/6) && (shadowBits1 & (1 << 3));
			const pattern2 = (0.25 + 1/6 < dx) && (shadowBits2 & (1 << 2));
			return pattern1 || pattern2;
		}
		const shadowBits1 = this.shadowBits(x0, y1);
		const shadowBits2 = this.shadowBits(x1, y1);
		const pattern1 = (dx <= 0.5 + 1/6) && (shadowBits1 & (1 << 1));
		const pattern2 = (0.25 + 1/6 < dx) && (shadowBits2 & (1 << 0));
		return pattern1 || pattern2;
	};

	Game_Map.prototype.isShade2 = function(x, y) {
		return false;
	};

	Game_Map.prototype.shadowBits = function(x, y) {
		return this.isValid(x, y) ? this.tileId(x, y, 4) : 0;
	};

	Game_Map.prototype.allTerrainTags = function(x, y) {
		const tags = [];
		if (this.isValid(x, y)) {
			const flags = this.tilesetFlags();
			const tiles = this.layeredTiles(x, y);
			for (const tile of tiles) {
				const tag = flags[tile] >> 12;
				if (tag > 0) {
					tags.push(tag);
				}
			}
		}
		return tags;
	};

	const _Game_Map_setup = Game_Map.prototype.setup;
	Game_Map.prototype.setup = function(mapId) {
		_Game_Map_setup.call(this, mapId);
		const data = $dataMap;
		this._shadeFlagOnly = !!(data.meta && data.meta.shadeFlagOnly);
	};

	Game_Map.prototype.replaceShadowBits = function(x, y) {
		if (!this.isValid(x, y)) {
			return;
		}
		const index =  (4 * $dataMap.height + y) * $dataMap.width + x;
		const shadowBits = $dataMap.data[index] || 0;
		$dataMap.data[index] = shadowBits & 0xF;
		if (shadowBits && this._shadeFlagOnly || (regionId && this.regionId(x, y) === regionId) || (terrainTag && this.allTerrainTags(x, y).some(tag => tag === terrainTag))) {
			$dataMap.data[index] = shadowBits | 0x10;
		}
	};

	//-----------------------------------------------------------------------------
	// Game_CharacterBase

	const _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
	Game_CharacterBase.prototype.initMembers = function() {
		_Game_CharacterBase_initMembers.call(this);
		this._shadeDepth = 0;
	};

	const _Game_CharacterBase_refreshBushDepth = Game_CharacterBase.prototype.refreshBushDepth;
	Game_CharacterBase.prototype.refreshBushDepth = function() {
		_Game_CharacterBase_refreshBushDepth.call(this);
		this.refreshShadeDepth();
	};

	if (updateFrequency) {
		const _Game_CharacterBase_updateMove = Game_CharacterBase.prototype.updateMove;
		Game_CharacterBase.prototype.updateMove = function() {
			_Game_CharacterBase_updateMove.call(this);
			this.refreshShadeDepth();
		};
	}

	Game_CharacterBase.prototype.refreshShadeDepth = function() {
		if (
			!this.isObjectCharacter() &&
			!this.isTile() &&
			this.isInShade()
		) {
			this._shadeDepth = $gameMap.shadeDepth();
		} else {
			this._shadeDepth = 0;
		}
	};

	Game_CharacterBase.prototype.isInShade = function() {
		return $gameMap.isShade(this._realX, this._realY - this.shiftY() / $gameMap.tileHeight(), this._priorityType);
	};

	Game_CharacterBase.prototype.shadeDepth = function() {
		return this._shadeDepth;
	};

	//-----------------------------------------------------------------------------
	// Sprite_Character

	const _Sprite_Character_initialize = Sprite_Character.prototype.initialize;
	Sprite_Character.prototype.initialize = function(character) {
		this._shadeDepth = 0;
		_Sprite_Character_initialize.call(this, character);
	};

	Sprite_Character.prototype.getShadeDepth = function() {
		return this._shadeDepth;
	};

	Sprite_Character.prototype.setShadeDepth = function(depth) {
		if (this._shadeDepth !== depth) {
			this._shadeDepth = depth;
			this._updateColorFilter();
		}
	};

	if (Sprite.prototype._updateColorFilter === Sprite_Character.prototype._updateColorFilter) {
		Sprite_Character.prototype._updateColorFilter = function() {
			Sprite.prototype._updateColorFilter.apply(this, arguments);
		};
	}

	const _Sprite_Character__updateColorFilter = Sprite_Character.prototype._updateColorFilter;
	Sprite_Character.prototype._updateColorFilter = function() {
		_Sprite_Character__updateColorFilter.call(this);
		this._colorFilter.setBrightness(255 - this._shadeDepth);
	};

	const _Sprite_Character_updateOther = Sprite_Character.prototype.updateOther;
	Sprite_Character.prototype.updateOther = function() {
		_Sprite_Character_updateOther.call(this);
		this.setShadeDepth(this._character.shadeDepth());
	};

	//-----------------------------------------------------------------------------
	// Spriteset_Map

	const _Spriteset_Map_loadTileset = Spriteset_Map.prototype.loadTileset;
	Spriteset_Map.prototype.loadTileset = function() {
		this.replaceShadowBits();
		_Spriteset_Map_loadTileset.call(this);
	};

	Spriteset_Map.prototype.replaceShadowBits = function() {
		if ($gameMap._shadeFlagOnly || regionId || terrainTag) {
			for (let x = 0; x < $dataMap.width; x++) {
				for (let y = 0; y < $dataMap.height; y++) {
					$gameMap.replaceShadowBits(x, y);
				}
			}
		}
	};

	//-----------------------------------------------------------------------------
	// Tilemap

	const _Tilemap__addShadow = Tilemap.prototype._addShadow;
	Tilemap.prototype._addShadow = function(layer, shadowBits, dx, dy) {
		if (!(shadowBits & 0x10)) _Tilemap__addShadow.apply(this, arguments);
	};
}