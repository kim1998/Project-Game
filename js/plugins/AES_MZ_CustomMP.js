var Imported = Imported || {};
Imported.AES_CustomMP = true;
var Aesica = Aesica || {};
Aesica.CMP = Aesica.CMP || {};
Aesica.CMP.version = 1.9;
Aesica.Toolkit = Aesica.Toolkit || {};
Aesica.Toolkit.customMpVersion = 1.0;
/*:
* @target MZ
* @plugindesc v1.9 Adds the ability to customize MP styling and recovery for each class
*
* @author Aesica
*
* @param Default MP Gauge Color 1
* @desc The default color 1 for MP gauges.  Default: 22
* @default 22
*
* @param Default MP Gauge Color 2
* @desc The default color 2 for MP gauges.  Default: 23
* @default 23
*
* @param Default MP Cost Color
* @desc The default color for the MP cost in skill lists:  Default 23
* @default 23
*
* @param Skill Cost Font Size
* @desc Font size for skill costs.  Plugin Default: 20, RM Default: 28
* @type number
* @default 20
*
* @help
* For terms of use, see:  https://github.com/Aesica/RMMV/blob/master/README.md
* Support me on Patreon:  https://www.patreon.com/aesica
*
* IMPORTANT - NOTE TAGS: The note tags used by this plugin are flexible,
* allowing for two different interchangeable formats:
* Format 1: <Note Tag: x>
* Format 2: <Note Tag>x</Note Tag>
* When using eval in note tags (specifically the > sign) the second format is
* necessary if you want to avoid closing the tag prematurely.
* 
* <Note>value > 5</Note>    Eval:  "value > 5" (good)
* <Note: value > 5>			Eval:  "value "    (bad)
*
* ----------------------------------------------------------------------
* VisuStella Compatibility
* ----------------------------------------------------------------------
*
* This plugin is compatible, however a few extra steps will need to be taken on
* your end if you're using VisuMZ_1_SkillsStatesCore:
*
* In the plugin's parameters, navigate to the following:
*
* Skill Cost Types -> "MP" -> JS: Draw Gauge
*
* Locate and replace the following lines:
*
* const color1 = ColorManager.mpGaugeColor1();
* const color2 = ColorManager.mpGaugeColor2();
* const label = TextManager.mpA;
*
* With the following in their respective locations:
*
* const color1 = sprite._color1;
* const color2 = sprite._color2;
* const label = user.mpA;
*
* It should now work as expected, but full compatibility is not guaranteed.
*
* ----------------------------------------------------------------------
* MP Bar Styling
* ----------------------------------------------------------------------
* Enables different classes to have different styling for their MP bar,
* such as name and color, via note tags:
* 
* <MP Name: x>
* Changes the abbr. term "MP" into x for a given class.
* <MP Name: EN>
* All instances of "MP" will show as "EN" in the combat window, main window,
* status window, etc for any actor using a class with this note tag.  The term
* can be accessed for other uses using Game_BattlerBase.prototype.mpA (so
* a.mpA in the combat formula box etc).
*
* <MP Full Name: x>
* Allows for renaming the full term for MP into x for a given class.
* <MP Full Name: Energy>
* Will allow the use of Game_BattlerBase.prototype.mpName (so a.mpName in the
* damage formula box, etc) with other functions/plugins/customizations.  Note
* That unlike <MP Name: x>, this won't change anything
* 
* <MP Icon: x>
* Changes the icon for "MP" into x for a given class.
* <MP Icon: 80>
* Replaces all instances of the default MP icon (if specified in the plugin
* parameters) with a different icon.  This icon can be accessed for other uses
* using Game_BattlerBase.prototype.mpI (so a.mpI in the combat formula box etc).
* This setting has no effect if MP is set to empty (to enable text labels) in
* the Gauge Icons plugin paramter.
*
* <MP Gauge Color: color1, color2>
* Changes the color1 and color2 of the MP gauge for a given class.  This can
* be an indexed color based on /img/system/Window.png, or it can be a hex
* value in #rrggbb format:
* <MP Gauge Color: 22, 23>
* <MP Gauge Color: #00ffff, #aaffff>
*
* <MP Cost Color: color>
* Changes the color of the skill's MP cost, ideally to match the color of
* the aliased MP gauge.  This can be either an indexed color or a hex
* value like with the MP Gauge Color tag above:
* <MP Cost Color: 23>
* <MP Cost COlor: #00ffff>
*
* ----------------------------------------------------------------------
*
* In-combat MP regen
*
* <Hide MP Regen>
* Setting this tag on a class will prevent any between-rounds MP regen from
* popping up any numbers.  Useful mainly for classes intended to gain decent
* chunks of MP every round innately.  This will not prevent other sources of
* MP recovery from showing up though, such as items and skill effects.
*
* Additionally, Game_Battler.prototype.gainSilentMp(x) can be used to give or
* take MP from a battler without displaying numbers, thus:
* a.gainSilentMp(25)
* In a skill's formula box will give 25 mp to the actor using the skill
* without popping up any numbers.
*
* ----------------------------------------------------------------------
*
* "Recover All" functionality
*
* <Recover All HP: x>
* <Recover All MP: x>
* Affects how "Recover All" sets HP or MP, with x representing a value
* between 0 for 0% (dead) and 1 for 100% (full)
*
* ----------------------------------------------------------------------
*
* Cost Displays
* 
* This plugin also improves the appearance and clarity of skill costs
* by allowing MP and TP costs to display together for skills requiring both.
*
* ----------------------------------------------------------------------
*
* Rage-like MP gain
*
* Actor, enemy, class, equip, and state note tags
* <Offensive MP Gain: x>
* <Offensive MP Gain: x, ...filters>
* <Defensive MP Gain: x>
* <Defensive MP Gain: x, ...filters>
*
* During battle, either using skills to deal damage or receiving damage can
* also restore X amount of MP.  Note that X is processed as an eval, so it can
* be a fixed amount per hit, vary by damage, or whatever else.  These effects
* are additive, so an actor that gains 5 MP per hit wearing a ring that gains
* 15 MP per magical hit will result in 5 mp per hit and 20 per magical hit.
*
* The eval recognizes the following parameters:  actor, damage
*
* Filters (physical, magical, certain) can be added to only generate mp
* when the matching type of attack is used.  More than one filter can be
* applied at once. (ie, physical, magical in the same tag)
*
* Actor, enemy, class, equip, state, skill, and item note tag:
* <MP Gain Modifier: X>
* 
* Can be added to apply a multiplier to the amount of MP restored.
* 
* Some sample usage:
*
* <Defensive MP Gain: 50 * damage / actor.mhp>
* This is the same formula used for generating TP by default.  The amount
* gained depends on the severity of the hit received in relation to the max
* hp of the actor taking the damage.
* 
* <Offensive MP Gain: 25 * damage / actor.mhp>
* Similar to the above, except the damage dealt by the actor generates mp
* based on how the amount vs the actor's max hp.  Basing it on the enemy's
* hp is generally a bad idea due to balance issues when dealing with really
* low or really high hp foes.
*
* <Defensive MP Gain: 15, magical>
* Gain 15 mp every time the actor takes magical damage
*
* <Defensive MP Gain: Math.randomInt(10) + 1, physical, certain>
* Gain 1-10 mp every time the actor takes physical or certain hit damage.
*
* <MP Gain Modifier: 0>
* Multiplies the result by 0, effectively preventing any mp gains.  This
* is ideal on skills that cost MP so players don't end up abusing endless
* positive-gain loops by spamming powerful skills.
*
* <MP Gain Modifier: 1.5>
* Increases all mp gains by 50%.
*
* ----------------------------------------------------------------------
*
* Recover HP/MP/Revive after each battle
*
* <After Battle Revive>
* Actors with this note tag can auto-revive after battles with 1 HP,
* regardless of whether or not the death state is set to be removed after
* combat.
*
* <After Battle Recover HP: x>
* <After Battle Recover MP: x>
* Actors with these note tags will recover the specified amount of HP or
* MP after every battle if they are alive.
*
* For both the HP and MP versions, "x" is processed as an eval so:
* <After Battle Recover MP: actor.mmp * 0.25> 
* will allow the actor affected by this note tag to recover 25% of his/her HP
* after each battle.  
* 
* This value can also be negative to take away HP or MP
* instead:
* <After Battle Recover MP: -actor.mp>
* will set the actor's mp to 0 after each battle.
*
* These note tags can be placed on actors, classes, equips, and states.
 */
(function($$)
{
	$$.pluginParameters = PluginManager.parameters("AES_MZ_CustomMP");
	$$.params = {};
	$$.params.mpGaugeColor1Default = +$$.pluginParameters["Default MP Gauge Color 1"] || 22;
	$$.params.mpGaugeColor2Default = +$$.pluginParameters["Default MP Gauge Color 2"] || 23;
	$$.params.mpCostColorDefault = +$$.pluginParameters["Default MP Cost Color"] || 23;
	$$.params.skillCostFontSize = +$$.pluginParameters["Skill Cost Font Size"] || 18;
	$$.params.gaugeIcons = String($$.pluginParameters["Gauge Icons"]).split(",").map(x => { x = x.trim(); return (x === "" ? undefined : (+x || 0)) });
/**-------------------------------------------------------------------
	Aesica.Toolkit: Note tag parsing functions
//-------------------------------------------------------------------*/	
	if ((Aesica.Toolkit.version || 0) < Aesica.Toolkit.customMpVersion)
	{
		Aesica.Toolkit.version = Aesica.Toolkit.customMpVersion;
		Aesica.Toolkit.getTag = function(tag)
		{
			var result;
			var note = this.note || "";
			if (Aesica.Toolkit.tagExists.call(this, "\\/" + tag)) result = note.match(RegExp("<" + tag + ">([^]+)<\\/" + tag + ">", "i"));
			else result = note.match(RegExp("<" + tag + ":[ ]*([^>]+)>", "i"));
			return result ? result[1].trim() : Aesica.Toolkit.tagExists.call(this, tag);
		}
		Aesica.Toolkit.tagExists = function(tag)
		{
			var note = this.note || "";
			return RegExp("<" + tag + "(?::[^>]+)?>", "i").test(note);
		}
		Game_BattlerBase.prototype.getTag = function(tag, deepScan=false)
		{
			var value = [];
			var isActor = this.isActor();
			var actor = isActor ? this.actor() : this.enemy();
			var equip, state;
			if (Aesica.Toolkit.tagExists.call(actor, tag)) value.push(Aesica.Toolkit.getTag.call(actor, tag));
			if (deepScan)
			{
				if (isActor)
				{
					if (Aesica.Toolkit.tagExists.call($dataClasses[this._classId], tag)) value.push(Aesica.Toolkit.getTag.call($dataClasses[this._classId], tag));
					equip = this.weapons().concat(this.armors());
					for (let e of equip){ if (Aesica.Toolkit.tagExists.call(e, tag)) value.push(Aesica.Toolkit.getTag.call(e, tag)); }
				}
				state = this.states();
				for (let s of state){ if (Aesica.Toolkit.tagExists.call(s, tag)) value.push(Aesica.Toolkit.getTag.call(s, tag)); }
			}
			return deepScan ? value : (value[0] ? value[0] : false);
		}
	}
/**-------------------------------------------------------------------
	MP Aliasing functions
//-------------------------------------------------------------------*/
	Object.defineProperties(Game_BattlerBase.prototype,
	{
		mpName: { get: function()
		{
			var sReturn;
			if (this.isActor()) sReturn = Aesica.Toolkit.getTag.call($dataClasses[this._classId], "MP Full Name");
			else sReturn = Aesica.Toolkit.getTag.call(this.enemy(), "MP Full Name");		
			return sReturn || TextManager.mp;
		}, configurable: true },
		mpA: { get: function()
		{
			var sReturn;
			if (this.isActor()) sReturn = Aesica.Toolkit.getTag.call($dataClasses[this._classId], "MP Name");
			else sReturn = Aesica.Toolkit.getTag.call(this.enemy(), "MP Name");		
			return sReturn || TextManager.mpA;
		}, configurable: true },
		mpI: { get: function()
		{
			let result;
			if (this.isActor()) result = Aesica.Toolkit.getTag.call($dataClasses[this._classId], "MP Icon");
			else result = Aesica.Toolkit.getTag.call(this.enemy(), "MP Icon");
			return result || 0;
		}, configurable: true },
		mpColor1: { get: function()
		{
			var result;
			var customColor = this.isActor() ? Aesica.Toolkit.getTag.call($dataClasses[this._classId], "MP Gauge Color") : this.getTag("MP Gauge Color");
			if (customColor)
			{
				customColor = customColor.split(",")[0];
				if (customColor === undefined) customColor = 0;
				else result = isNaN(+customColor) ? customColor : +customColor;
			}
			else result = $$.params.mpGaugeColor1Default;
			this._mpColor1 = result;
			return result;
		}, configurable: true },
		mpColor2: { get: function()
		{
			var result;
			var customColor = this.isActor() ? Aesica.Toolkit.getTag.call($dataClasses[this._classId], "MP Gauge Color") : this.getTag("MP Gauge Color");
			if (customColor)
			{
				customColor = customColor.split(",")[1];
				if (customColor === undefined) customColor = 0;
				else result = isNaN(+customColor) ? customColor : +customColor;
			}
			else result = $$.params.mpGaugeColor2Default;
			this._mpColor2 = result;
			return result;
		}, configurable: true },
	});
	Game_BattlerBase.prototype.mpCostColor = function()
	{
		var sReturn;
		if (this.isActor()) sReturn = Aesica.Toolkit.getTag.call($dataClasses[this._classId], "MP Cost Color");
		return sReturn || $$.params.mpCostColorDefault;
	}
	Game_Battler.prototype.gainSilentMp = function(value){ this.setMp(this.mp + value); }
	Game_Battler.prototype.regenerateMp = function()
	{
		var value = Math.floor(this.mmp * this.mrg);
		if (value !== 0)
		{
			if (Aesica.Toolkit.tagExists.call($dataClasses[this._classId], "Hide MP Regen")) this.gainSilentMp(value);
			else this.gainMp(value);
		}
	}
	ColorManager.mpGaugeColor1 = function(){ return ColorManager.textColor($$.params.mpGaugeColor1Default); }
	ColorManager.mpGaugeColor2 = function(){ return ColorManager.textColor($$.params.mpGaugeColor2Default); }
	$$.Sprite_Gauge_setup = Sprite_Gauge.prototype.setup;
	Sprite_Gauge.prototype.setup = function(battler, statusType)
	{
		if (statusType === "hp")
		{
			this._label = TextManager.hpA;
			this._color1 = ColorManager.hpGaugeColor1();
			this._color2 = ColorManager.hpGaugeColor2();
		}
		else if (statusType === "mp")
		{
			let color1 = battler.mpColor1;
			let color2 = battler.mpColor2;
			if (typeof color1 === "number") color1 = ColorManager.textColor(color1);
			if (typeof color2 === "number") color2 = ColorManager.textColor(color2);
			this._label = battler.mpA;
			this._color1 = color1;
			this._color2 = color2;
		}
		else if (statusType === "tp")
		{
			this._label = TextManager.tpA;
			this._color1 = ColorManager.tpGaugeColor1();
			this._color2 = ColorManager.tpGaugeColor2();
		}
		else if (statusType === "time")
		{
			// don't cache the colors so AES_CoreEngine's dynamic coloring can work its magic
			this._label = "";
		}
		else
		{
			this._label = "";
			this._color1 = ColorManager.normalColor();
			this._color2 = ColorManager.normalColor();
		}
		$$.Sprite_Gauge_setup.call(this, battler, statusType);		
	};
	Sprite_Gauge.prototype.label = function(){ return this._label; };
	$$.Sprite_Gauge_gaugeColor1 = Sprite_Gauge.prototype.gaugeColor1;
	Sprite_Gauge.prototype.gaugeColor1 = function()
	{
		return this._color1 === undefined ? $$.Sprite_Gauge_gaugeColor1.call(this) : this._color1;
	};
	$$.Sprite_Gauge_gaugeColor2 = Sprite_Gauge.prototype.gaugeColor2;
	Sprite_Gauge.prototype.gaugeColor2 = function()
	{
		return this._color2 === undefined ? $$.Sprite_Gauge_gaugeColor2.call(this) : this._color2;
	};
	/*
	Window_StatusBase.prototype.placeGauge = function(actor, type, x, y, icon=null)
	{
		const key = "actor%1-gauge-%2".format(actor.actorId(), type);
		const sprite = this.createInnerSprite(key, Sprite_Gauge);
		sprite.setup(actor, type);
		sprite.move(x + 32, y);
		if (icon === null)
		{
			if (type === "hp") icon = $$.params.gaugeIcons[0] || 0;
			else if (type === "mp") icon = sprite._battler.mpI ? sprite._battler.mpI : ($$.params.gaugeIcons[1] || 0);
			else if (type === "tp") icon = $$.params.gaugeIcons[2] || 0;
		}
		if (icon !== undefined) sprite._label = "";
		if (icon) this.drawTextEx("\\i[" + icon + "]", x, y, ImageManager.iconWidth);
		sprite.show();
	};
	*/
	Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width)
	{
		this.contents.fontSize = $$.params.skillCostFontSize;
		var text, color, dw = width;
		if (this._actor.skillTpCost(skill) > 0)
		{
			this.changeTextColor(ColorManager.tpCostColor());
			text = this._actor.skillTpCost(skill) + TextManager.tpA;
			this.drawText(text, x, y, dw, 'right');
			dw = dw - this.textWidth(text) - 4;
		}
		if (this._actor.skillMpCost(skill) > 0)
		{
			color = this._actor.mpCostColor();
			if (!isNaN(+color)) color = ColorManager.textColor(color);
			this.changeTextColor(color);
			text = this._actor.skillMpCost(skill) + this._actor.mpA;
			this.drawText(text, x, y, dw, 'right');
			dw = dw - this.textWidth(text) - 4;
		}
		if (Imported.YEP_SkillCore) // TODO
		{
			if (this._actor.skillHpCost(skill) > 0)
			{
				this.changeTextColor(ColorManager.textColor(Yanfly.Param.SCCHpTextColor));
				text = this._actor.skillHpCost(skill) + TextManager.hpA;
				this.drawText(text, x, y, dw, 'right');
				dw = dw - this.textWidth(text) - 4;
			}
			this.drawOtherCost(skill, x, y, dw);
		}
		this.resetFontSettings();
	};
	Window_BattleLog.prototype.makeMpDamageText = function(target)
	{
		var result = target.result();
		var damage = result.mpDamage;
		var isActor = target.isActor();
		var fmt;
		if (damage > 0 && result.drain) {
			fmt = isActor ? TextManager.actorDrain : TextManager.enemyDrain;
			return fmt.format(target.name(), target.mpName || TextManager.mp, damage);
		} else if (damage > 0) {
			fmt = isActor ? TextManager.actorLoss : TextManager.enemyLoss;
			return fmt.format(target.name(), target.mpName || TextManager.mp, damage);
		} else if (damage < 0) {
			fmt = isActor ? TextManager.actorRecovery : TextManager.enemyRecovery;
			return fmt.format(target.name(), target.mpName || TextManager.mp, -damage);
		} else {
			return '';
		}
	};
/**-------------------------------------------------------------------
	Recovery functions
//-------------------------------------------------------------------*/
	
	$$.BattleManager_endBattle = BattleManager.endBattle;
	BattleManager.endBattle = function(result)
	{	
		$$.BattleManager_endBattle.call(this, result);
		$gameParty.afterBattleRecovery();
	};
	
	Game_Party.prototype.afterBattleRecovery = function()
	{
		for (let member of $gameParty.members()) member.afterBattleRecovery();
	};
	Game_BattlerBase.prototype.afterBattleRecovery = function()
	{
		var hpFormulaList, mpFormulaList, rawEval;
		var actor = this;
		if (actor.isActor())
		{
			if (actor.isDead() && actor.getTag("After Battle Revive", true).length > 0) actor.removeState(1);
			hpFormulaList = actor.getTag("After Battle Recover HP", true);
			mpFormulaList = actor.getTag("After Battle Recover MP", true);
			if (!actor.isStateAffected(1))
			{
				for (let f of hpFormulaList)
				{
					try
					{
						rawEval = f;
						actor.gainHp(Math.floor(+eval(rawEval)) || 0);
					}
					catch(e)
					{
						console.log("AES_CustomMP: Eval error in <After Battle Recover HP> => " + rawEval);
					}
				}
				for (let f of mpFormulaList)
				{
					try
					{
						rawEval = f;
						actor.gainMp(Math.floor(+eval(rawEval)) || 0);
					}
					catch(e)
					{
						console.log("AES_CustomMP: Eval error in <After Battle Recover MP> => " + rawEval);
					}
				}
				actor.refresh();
			}
		}
	};	
	Game_BattlerBase.prototype.recoverAll = function()
	{
		this.clearStates();
		this._hp = Aesica.Toolkit.tagExists.call($dataClasses[this._classId], "Recover All HP") ? Math.floor(+Aesica.Toolkit.getTag.call($dataClasses[this._classId], "Recover All HP") * this.mhp) : this.mhp;
		this._mp = Aesica.Toolkit.tagExists.call($dataClasses[this._classId], "Recover All MP") ? Math.floor(+Aesica.Toolkit.getTag.call($dataClasses[this._classId], "Recover All MP") * this.mmp) : this.mmp;
		this.refresh();
	};
/**-------------------------------------------------------------------
	Action-based MP gain functions
//-------------------------------------------------------------------*/
	Game_Battler.prototype.chargeMpByDamage = function(damage, gainTypeTag, hitType, skillModifier=1)
	{
		var offensiveGainList = this.getTag(gainTypeTag, true);
		var modifierList = this.getTag("MP Gain Modifier", true);
		var result = 0;
		var multiplier = 1;
		var actor = this;
		var hitList = ["certain", "physical", "magical"];
		var current, formula;
		for (let g of offensiveGainList)
		{
			current = g.split(",");
			formula = current.shift();
			if (current.length === 0 || current.join(" ").search(hitList[hitType]) > -1)
			{
				try
				{
					result += +eval(formula) || 0;
				}
				catch(e)
				{
					console.log("AES_CustomMP: Eval error in <" + gainTypeTag + "> => " + formula);
				}
			}
		}
		for (let m of modifierList)
		{
			multiplier = +eval(m);
			if (isNaN(multiplier)) multiplier = 1;
			result *= multiplier;
		}
		result = Math.floor(result * skillModifier);
		if (result)
		{
			if (this.isActor())
			{
				if (Aesica.Toolkit.tagExists.call($dataClasses[this._classId], "Hide MP Regen")) this.gainSilentMp(result);
				else this.gainMp(result);
			}
			else
			{
				if (Aesica.Toolkit.tagExists.call(this.enemy(), "Hide MP Regen")) this.gainSilentMp(result);
				else this.gainMp(result);
			}
		}
	}
	$$.Game_Action_executeHpDamage = Game_Action.prototype.executeHpDamage
	Game_Action.prototype.executeHpDamage = function(target, value)
	{
		$$.Game_Action_executeHpDamage.call(this, target, value);
		var item = this.item();
		var subject = this.subject();
		var skillModifier = Aesica.Toolkit.tagExists.call(item, "MP Gain Modifier") ? +eval(Aesica.Toolkit.getTag.call(item, "MP Gain Modifier")) : 1;
		if (isNaN(skillModifier)) skillModifier = 1;
		if (value > 0)
		{
			subject.chargeMpByDamage(value, "Offensive MP Gain", item.hitType, skillModifier);
			target.chargeMpByDamage(value, "Defensive MP Gain", item.hitType, skillModifier);
		}
	}	
})(Aesica.CMP);