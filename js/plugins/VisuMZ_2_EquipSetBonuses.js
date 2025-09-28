//=============================================================================
// VisuStella MZ - Equipment Set Bonuses
// VisuMZ_2_EquipSetBonuses.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_EquipSetBonuses = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EquipSetBonuses = VisuMZ.EquipSetBonuses || {};
VisuMZ.EquipSetBonuses.version = 1.05;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.05] [EquipSetBonuses]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Equipment_Set_Bonuses_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_ItemsEquipsCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is a RPG Maker MZ plugin that allows you to set equipment to be a part
 * of various sets. When multiple pieces of the set are equipped, (for example:
 * Warrior Shield, Warrior Helm, Warrior Armor), then bonuses are applied.
 * Bonuses can be applied at different stages, too, depending on how many set
 * pieces are being currently equipped. The art (faces, map sprites, battler,
 * and various portraits for other plugins) for an actor can also change based
 * on the number of equipment sets worn.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Create an unlimited amount of Equipment Sets to apply to actors when
 *   wearing matching sets of weapons and/or armor.
 * * Each equipment set can apply bonuses at various stages depending on the
 *   number of set pieces equipped up to a total of 20 per Equipment Set.
 * * A tooltip window to show extra data to show the player what bonuses are
 *   applied when different numbers of set pieces are equipped.
 * * Apply different appearances to actor graphics (face, map sprites, battler,
 *   and portraits) depending on the number of equipment pieces equipped for
 *   certain sets.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_ItemsEquipsCore
 * * VisuMZ_1_SkillsStatesCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Equipment Set Graphics
 * 
 * If an actor has equipment set graphics defined, they will overwrite the face
 * graphic, map character sprite graphic, battler graphic, and any portraits
 * that have been added through the VisuStella MZ plugins. The equipment set
 * graphics will take priority over the default graphics.
 * 
 * If an actor has multiple equipment sets on at the same time, each with their
 * own set graphics, the set with the highest number of pieces that has defined
 * graphics will be given priority.
 * 
 * ---
 * 
 * Change Actor Images Event Command
 * 
 * When changing an actor's graphics through the "Change Actor Images" event
 * command, these changes will take priority over the Equipment Set Graphics.
 * If you want to remove these priority graphics, set the "Change Actor Images"
 * images to "(None)".
 * 
 * Keep in mind that this means you cannot make an "invisible" graphic through
 * the "(None)" selection anymore. Instead, you need to make a work around by
 * making a custom graphic image that is fully transparent.
 *
 * ---
 *
 * ============================================================================
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_1_BattleCore
 * 
 * VisuMZ_1_MainMenuCore
 *
 * If the Battle Core and/or the Main Menu Core is installed, the Equipment
 * Set Graphics also gives access to notetags that alter their battle portraits
 * and/or menu portraits based on whatever Equipment Sets are equipped.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === Equipment Set Declaration-Related Notetags ===
 * 
 * ---
 *
 * <Equip Set: name>
 *
 * - Used for: Weapon, Armor Notetags
 * - This assigns this item to an equipment set.
 * - Replace 'name' with the set name you're going to associate this equip
 *   with. Names must equal the Equipment Set names declared in the Plugin
 *   Parameters or else they will not have any effect.
 * - If you want to make a piece of equipment be a part of two different
 *   equipment sets, use multiple copies of this notetag.
 *
 * ---
 * 
 * <Equip Set Wildcard>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Assigns a wildcard effect for this equipment piece.
 * - Cannot be assigned to regular equipment set pieces.
 * - This will add +1 to every currently equipped equipment set on the actor.
 *   - Equip sets that are NOT equipped will not have their effects applied.
 *   - If multiple equipment bonus sets are equipped, the +1 effect will be
 *     applied to each of them.
 * 
 * ---
 * 
 * <Equip Set Wildcards: name, name, name>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Assigns a limited wildcard effect for this equipment piece for specific
 *   equipment sets.
 * - Replace 'name' with the set name you're going to associate the limited
 *   pool of wildcard for.
 * - This will add +1 to every listed limited set that is currently equipped on 
 *   the actor.
 *   - Equip sets that are NOT equipped will not have their effects applied.
 *   - If multiple equipment bonus sets are equipped, the +1 effect will be
 *     applied to each of them if they are listed as a wildcard 'name'.
 * 
 * ---
 * 
 * === Equipment Set Graphics-Related Notetags ===
 * 
 * ---
 *
 * <name Set, x Pieces Face: filename, index>
 * <name Set, x+ Pieces Face: filename, index>
 * <name Set, x to y Pieces Face: filename, index>
 *
 * - Used for: Actor Notetags
 * - Gives this actor an Equipment Set face graphic.
 * - Replace 'name' with the Equipment Set name to apply to. Use the set names
 *   that are declared in the Plugin Parameters or there will be no effect.
 * - Replace 'x' with the exact number of pieces to apply this graphic to.
 *   This does NOT apply to larger number numbers, only exactly that amount.
 * - The 'x+' variant will apply the graphic from 'x' to higher numbers.
 * - The 'x to y' variant will apply the graphic for a range of pieces to be
 *   equipped in order to apply the graphic.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/faces/ folder. Do not include the file extension.
 * - Replace 'index' with the index of the graphic. Index values start at 0.
 * - 
 *
 * ---
 *
 * <name Set, x Pieces Character: filename, index>
 * <name Set, x+ Pieces Character: filename, index>
 * <name Set, x to y Pieces Character: filename, index>
 *
 * - Used for: Actor Notetags
 * - Gives this actor an Equipment Set face graphic.
 * - Replace 'name' with the Equipment Set name to apply to. Use the set names
 *   that are declared in the Plugin Parameters or there will be no effect.
 * - Replace 'x' with the exact number of pieces to apply this graphic to.
 *   This does NOT apply to larger number numbers, only exactly that amount.
 * - The 'x+' variant will apply the graphic from 'x' to higher numbers.
 * - The 'x to y' variant will apply the graphic for a range of pieces to be
 *   equipped in order to apply the graphic.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/characters/ folder. Do not include the file extension.
 * - Replace 'index' with the index of the graphic. Index values start at 0.
 * - 
 *
 * ---
 *
 * <name Set, x Pieces Battler: filename>
 * <name Set, x+ Pieces Battler: filename>
 * <name Set, x to y Pieces Battler: filename>
 *
 * - Used for: Actor Notetags
 * - Gives this actor an Equipment Set face graphic.
 * - Replace 'name' with the Equipment Set name to apply to. Use the set names
 *   that are declared in the Plugin Parameters or there will be no effect.
 * - Replace 'x' with the exact number of pieces to apply this graphic to.
 *   This does NOT apply to larger number numbers, only exactly that amount.
 * - The 'x+' variant will apply the graphic from 'x' to higher numbers.
 * - The 'x to y' variant will apply the graphic for a range of pieces to be
 *   equipped in order to apply the graphic.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/sv_actors/ folder. Do not include the file extension.
 * - 
 *
 * ---
 *
 * <name Set, x Pieces Menu Portrait: filename>
 * <name Set, x+ Pieces Menu Portrait: filename>
 * <name Set, x to y Pieces Menu Portrait: filename>
 *
 * - Used for: Actor Notetags
 * - Requires VisuMZ_1_MainMenuCore!
 * - Gives this actor an Equipment Set face graphic.
 * - Replace 'name' with the Equipment Set name to apply to. Use the set names
 *   that are declared in the Plugin Parameters or there will be no effect.
 * - Replace 'x' with the exact number of pieces to apply this graphic to.
 *   This does NOT apply to larger number numbers, only exactly that amount.
 * - The 'x+' variant will apply the graphic from 'x' to higher numbers.
 * - The 'x to y' variant will apply the graphic for a range of pieces to be
 *   equipped in order to apply the graphic.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/pictures/ folder. Do not include the file extension.
 * - 
 *
 * ---
 *
 * <name Set, x Pieces Battle Portrait: filename>
 * <name Set, x+ Pieces Battle Portrait: filename>
 * <name Set, x to y Pieces Battle Portrait: filename>
 *
 * - Used for: Actor Notetags
 * - Requires VisuMZ_1_BattleCore!
 * - Gives this actor an Equipment Set face graphic.
 * - Replace 'name' with the Equipment Set name to apply to. Use the set names
 *   that are declared in the Plugin Parameters or there will be no effect.
 * - Replace 'x' with the exact number of pieces to apply this graphic to.
 *   This does NOT apply to larger number numbers, only exactly that amount.
 * - The 'x+' variant will apply the graphic from 'x' to higher numbers.
 * - The 'x to y' variant will apply the graphic for a range of pieces to be
 *   equipped in order to apply the graphic.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/pictures/ folder. Do not include the file extension.
 * - 
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equipment Sets Settings
 * ============================================================================
 *
 * This is where you put all your equipment sets used in the game.
 * Adjust their settings here.
 *
 * ---
 *
 * Equipment Set
 * 
 *   Equipment Set Name:
 *   - This set's name used for databasing and in-game.
 *   - Register equips to sets using <Equip Set: x> notetag.
 * 
 *   Icon:
 *   - This is the icon used to repesent the set name.
 *   - Use 0 to not show an icon.
 * 
 *   Bonuses:
 * 
 *   1 Piece Bonus:
 *   2 Pieces Bonus:
 *   3 Pieces Bonus:
 *   4 Pieces Bonus:
 *   5 Pieces Bonus:
 *   6 Pieces Bonus:
 *   7 Pieces Bonus:
 *   8 Pieces Bonus:
 *   9 Pieces Bonus:
 *   10 Pieces Bonus:
 *   11 Pieces Bonus:
 *   12 Pieces Bonus:
 *   13 Pieces Bonus:
 *   14 Pieces Bonus:
 *   15 Pieces Bonus:
 *   16 Pieces Bonus:
 *   17 Pieces Bonus:
 *   18 Pieces Bonus:
 *   19 Pieces Bonus:
 *   20 Pieces Bonus:
 *   - Bonuses applied for having this number of pieces equipped.
 *   - These settings stack with later bonuses in the same set.
 *
 * ---
 *
 * 1-20 Piece(s) Bonus
 * 
 *   Text:
 *   - Text that appears next to each piece in the tooltip window.
 *   - Use 'auto' if you want this to be done automatically.
 * 
 *     Show in Tooltip?:
 *     - Show this in the tooltip?
 * 
 *   Bonuses:
 * 
 *     Passive States:
 *     - States that will be given out as passives when the required piece
 *       count is equipped.
 * 
 *     Basic Parameters:
 *     - Bonuses applied to the Basic Parameters when the required piece count
 *       is equipped.
 * 
 *     X Parameters:
 *     - Bonuses applied to the X Parameters when the required piece count is
 *       equipped.
 * 
 *     S Parameters:
 *     - Bonuses applied to the S Parameters when the required piece count is
 *       equipped.
 *
 * ---
 *
 * Basic Parameters
 * 
 *   MaxHP:
 *   MaxMP:
 *   ATK:
 *   DEF:
 *   MAT:
 *   MDF:
 *   AGI:
 *   LUK:
 * 
 *   Rate:
 *   - Multiplicative bonus for this param when the required piece count is
 *     equipped.
 *   - 1.0 is 100%.
 * 
 *   Add:
 *   - Additive bonus for this param when the required piece count is equipped.
 *   - 0 is +0.
 *
 * ---
 *
 * X Parameters
 * 
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 * 
 *   Rate:
 *   - Multiplicative bonus for this param when the required piece count is
 *     equipped.
 *   - 1.0 is 100%.
 * 
 *   Add:
 *   - Additive bonus for this param when the required piece count is equipped.
 *   - 0.0 is +0%.
 *
 * ---
 *
 * S Parameters
 * 
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 * 
 *   Rate:
 *   - Multiplicative bonus for this param when the required piece count is
 *     equipped.
 *   - 1.0 is 100%.
 * 
 *   Add:
 *   - Additive bonus for this param when the required piece count is equipped.
 *   - 0.0 is +0%.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Mechanics settings for Equipment Set Bonuses.
 *
 * ---
 *
 * Settings
 * 
 *   Base Parameter Add:
 *   X Parameter Add:
 *   S Parameter Add:
 *   - When do you wish to apply the "Add" bonus parameters?
 *   - Typical Formula: (base + plus) * rate + flat
 *     - Plus - Apply Before Rate
 *     - Flat - Apply After Rate
 *   - For the purpose of keeping the bonuses consistent without confusing any
 *     players, there will be no notetags to shift between the two settings as
 *     an exception for an equip bonus.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Tooltip Settings
 * ============================================================================
 *
 * Tooltip settings for Equipment Set Bonuses. The tooltip window will appear
 * when selecting equipment with the <Equip Set: name> notetag.
 * 
 * By default, it will by anchored towards the upper left. However, if the
 * position of the tooltip would extend past the bottom of the screen, then the
 * tooltip window will change its anchor towards the bottom left as to not
 * cover the name of the item it is displaying information for.
 *
 * ---
 *
 * Appearance
 * 
 *   Show Tooltip?:
 *   - Show tooltips for Equipment Set Bonuses?
 * 
 *   Scale:
 *   - What scale size do you want for the tooltip?
 *   - Use 1.0 for normal size.
 * 
 *   Skin Filename:
 *   - What window skin do you want to use for the tooltip?
 * 
 *   Skin Opacity:
 *   - What opacity setting is used for the tooltip?
 *   - Use a number between 0 and 255.
 *
 * ---
 *
 * Offset
 * 
 *   Offset X:
 *   - Offset the tooltip X position from the mouse?
 *   - Negative: left. Positive: right.
 * 
 *   Offset Y:
 *   - Offset the tooltip Y position from the mouse?
 *   - Negative: up. Positive: down. 
 *   - Inversed when low on screen.
 *
 * ---
 * 
 * Vocabulary
 * 
 *   Set Title Format:
 *   - How does the set title appear?
 *   - %1 - Set Name, %2 - Icon
 *   
 *   Set Piece Format:
 *   - How do the set pieces appear?
 *   - %1 - Set Name, %2 - Effects
 *   
 *   Separator Format:
 *   - How do you wish to separate effects?
 *   - %1 - Previous Effect, %2 - Next Effect
 *   
 *   Passive State Format:
 *   - How are passive state effects displayed?
 *   - %1 - State Name, %2 - Icon
 *   
 *   Param Rate Format:
 *   - How are Parameter Rate effects displayed?
 *   - %1 - Param Name, %2 - Effect
 *   
 *   Add(+) Format:
 *   - How are positive Parameter Add effects displayed?
 *   - %1 - Param Name, %2 - Effect
 *   
 *   Add(-) Format:
 *   - How are negative Parameter Add effects displayed?
 *   - %1 - Param Name, %2 - Effect
 *   
 *   Wildcard Format:
 *   - How are wildcard sets displayed?
 *   - %1 - Wildcard Sets
 *   
 *   Wildcard: Any Set:
 *   - What text is used when the wildcard can be used for any set? 
 * 
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.05: October 17, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Equip Set Wildcard>
 * **** Assigns a wildcard effect for this equipment piece.
 * **** This will add +1 to every currently equipped equipment set on actor.
 * **** See help file for more information.
 * *** <Equip Set Wildcards: name, name, name>
 * **** Assigns a limited wildcard effect for this equipment piece for specific
 *      equipment sets.
 * **** This will add +1 to every listed limited set that is currently equipped
 *      on the actor.
 * **** See help file for more information.
 * ** New Plugin Parameters added by Arisu:
 * *** Parameters > Tooltip Settings > Vocabulary > Wildcard Format
 * *** Parameters > Tooltip Settings > Vocabulary > Wildcard: Any Set
 * **** See help file for more information.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: August 17, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.03: January 20, 2023
 * * Bug Fixes!
 * ** Fixed a bug that prevented character map sprites from being updated.
 *    Fix made by Irina.
 * 
 * Version 1.02: November 3, 2022
 * * Bug Fixes!
 * ** Fixed a problem with Custom text parameter that caused certain lines to
 *    not show up properly. Fix made by Irina.
 * 
 * Version 1.01: October 7, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.00 Official Release Date: March 8, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param EquipSetBonuses
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param EquipSets:arraystruct
 * @text Equipment Sets
 * @type struct<EquipSet>[]
 * @desc This is where you put all your equipment sets used in the
 * game. Adjust their settings here.
 * @default ["{\"SetName:str\":\"Hearty\",\"Icon:num\":\"84\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+50\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+25\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.05\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{\\\\\\\"HIT\\\\\\\":\\\\\\\"Hit Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EVA\\\\\\\":\\\\\\\"Evasion Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CRI\\\\\\\":\\\\\\\"Critical Hit\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CEV\\\\\\\":\\\\\\\"Critical Evasion\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MEV\\\\\\\":\\\\\\\"Magic Evasion\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MRF\\\\\\\":\\\\\\\"Magic Reflect\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CNT\\\\\\\":\\\\\\\"Counter Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"HRG\\\\\\\":\\\\\\\"HP Regen Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.05\\\\\\\",\\\\\\\"MRG\\\\\\\":\\\\\\\"Magic Regen Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TRG\\\\\\\":\\\\\\\"TP Regen Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}","{\"SetName:str\":\"Sorcery\",\"Icon:num\":\"79\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+20\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+10\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{\\\\\\\"HIT\\\\\\\":\\\\\\\"Hit Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EVA\\\\\\\":\\\\\\\"Evasion Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CRI\\\\\\\":\\\\\\\"Critical Hit\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CEV\\\\\\\":\\\\\\\"Critical Evasion\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MEV\\\\\\\":\\\\\\\"Magic Evasion\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MRF\\\\\\\":\\\\\\\"Magic Reflect\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CNT\\\\\\\":\\\\\\\"Counter Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"HRG\\\\\\\":\\\\\\\"HP Regen Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MRG\\\\\\\":\\\\\\\"Magic Regen Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.05\\\\\\\",\\\\\\\"TRG\\\\\\\":\\\\\\\"TP Regen Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"-0.10\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}","{\"SetName:str\":\"Power\",\"Icon:num\":\"77\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+30\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+15\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{\\\\\\\"HIT\\\\\\\":\\\\\\\"Hit Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EVA\\\\\\\":\\\\\\\"Evasion Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CRI\\\\\\\":\\\\\\\"Critical Hit\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.05\\\\\\\",\\\\\\\"CEV\\\\\\\":\\\\\\\"Critical Evasion\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MEV\\\\\\\":\\\\\\\"Magic Evasion\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MRF\\\\\\\":\\\\\\\"Magic Reflect\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CNT\\\\\\\":\\\\\\\"Counter Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"HRG\\\\\\\":\\\\\\\"HP Regen Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MRG\\\\\\\":\\\\\\\"Magic Regen Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TRG\\\\\\\":\\\\\\\"TP Regen Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.20\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}","{\"SetName:str\":\"Guardian\",\"Icon:num\":\"81\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+40\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+30\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"-0.10\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}","{\"SetName:str\":\"Wizard\",\"Icon:num\":\"78\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+10\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+20\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+30\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}","{\"SetName:str\":\"Alchemist\",\"Icon:num\":\"79\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+10\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+20\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.10\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}","{\"SetName:str\":\"Speedy\",\"Icon:num\":\"82\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+30\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+20\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{\\\\\\\"HIT\\\\\\\":\\\\\\\"Hit Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EVA\\\\\\\":\\\\\\\"Evasion Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.05\\\\\\\",\\\\\\\"CRI\\\\\\\":\\\\\\\"Critical Hit\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CEV\\\\\\\":\\\\\\\"Critical Evasion\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MEV\\\\\\\":\\\\\\\"Magic Evasion\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MRF\\\\\\\":\\\\\\\"Magic Reflect\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CNT\\\\\\\":\\\\\\\"Counter Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"HRG\\\\\\\":\\\\\\\"HP Regen Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MRG\\\\\\\":\\\\\\\"Magic Regen Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TRG\\\\\\\":\\\\\\\"TP Regen Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"-0.10\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}","{\"SetName:str\":\"Fortuna\",\"Icon:num\":\"87\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.25\\\\\\\"}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.50\\\\\\\"}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}"]
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Mechanics settings for Equipment Set Bonuses.
 * @default {"BaseParamAdd:str":"flat","XParamAdd:str":"flat","SParamAdd:str":"flat"}
 *
 * @param Tooltip:struct
 * @text Tooltip Settings
 * @type struct<Tooltip>
 * @desc Tooltip settings for Equipment Set Bonuses.
 * @default {"Appearance":"","Show:eval":"true","Scale:num":"0.6","WindowSkin:str":"Window","WindowOpacity:num":"240","Offset":"","OffsetX:num":"+24","OffsetY:num":"+40","Vocabulary":"","SetTitleFmt:str":"%2\\C[5]%1 Set Bonuses\\C[0]","SetPieceFmt:str":"\\C[5]∙%1 Set Effect:\\C[0] %2","SeparatorFmt:str":"%1, %2","StateFmt:str":"%2%1","RateFmt:str":"%1:%2","AddPosFmt:str":"%1+%2","AddNegFmt:str":"%1-%2"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipSet:
 *
 * @param SetName:str
 * @text Equipment Set Name
 * @desc This set's name used for databasing and in-game.
 * Register equips to sets using <Equip Set: x> notetag.
 * @default Untitled
 *
 * @param Icon:num
 * @text Icon
 * @parent SetName:str
 * @desc This is the icon used to repesent the set name.
 * Use 0 to not show an icon.
 * @default 160
 *
 * @param Bonuses
 *
 * @param Piece1:struct
 * @text 1 Piece Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece2:struct
 * @text 2 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece3:struct
 * @text 3 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece4:struct
 * @text 4 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece5:struct
 * @text 5 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece6:struct
 * @text 6 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece7:struct
 * @text 7 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece8:struct
 * @text 8 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece9:struct
 * @text 9 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece10:struct
 * @text 10 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece11:struct
 * @text 11 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece12:struct
 * @text 12 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece13:struct
 * @text 13 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece14:struct
 * @text 14 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece15:struct
 * @text 15 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece16:struct
 * @text 16 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece17:struct
 * @text 17 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece18:struct
 * @text 18 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece19:struct
 * @text 19 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece20:struct
 * @text 20 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Set Pieces Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipSetPieces:
 *
 * @param Text:str
 * @text Text
 * @desc Text that appears next to each piece in the tooltip window.
 * Use 'auto' if you want this to be done automatically.
 * @default auto
 *
 * @param ShowText:eval
 * @text Show in Tooltip?
 * @parent Text
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this in the tooltip?
 * @default true
 * 
 * @param Bonuses
 * 
 * @param PassiveStates:arraynum
 * @text Passive States
 * @parent Bonuses
 * @type state[]
 * @desc States that will be given out as passives when the
 * required piece count is equipped.
 * @default []
 *
 * @param Param:struct
 * @text Basic Parameters
 * @parent Bonuses
 * @type struct<Param>
 * @desc Bonuses applied to the Basic Parameters when the
 * required piece count is equipped.
 * @default {}
 *
 * @param XParam:struct
 * @text X Parameters
 * @parent Bonuses
 * @type struct<XParam>
 * @desc Bonuses applied to the X Parameters when the
 * required piece count is equipped.
 * @default {}
 *
 * @param SParam:struct
 * @text S Parameters
 * @parent Bonuses
 * @type struct<SParam>
 * @desc Bonuses applied to the S Parameters when the
 * required piece count is equipped.
 * @default {}
 *
 */
/* ----------------------------------------------------------------------------
 * Param Bonuses Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param MaxHP
 * @default Maximum Hit Points
 *
 * @param Rate0:num
 * @text Rate
 * @parent MaxHP
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus0:num
 * @text Add
 * @parent MaxHP
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 * @param MaxMP
 * @default Maximum Magic Points
 *
 * @param Rate1:num
 * @text Rate
 * @parent MaxMP
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus1:num
 * @text Add
 * @parent MaxMP
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 * @param ATK
 * @default Attack
 *
 * @param Rate2:num
 * @text Rate
 * @parent ATK
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus2:num
 * @text Add
 * @parent ATK
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 * @param DEF
 * @default Defense
 *
 * @param Rate3:num
 * @text Rate
 * @parent DEF
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus3:num
 * @text Add
 * @parent DEF
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 * @param MAT
 * @default Magic Attack
 *
 * @param Rate4:num
 * @text Rate
 * @parent MAT
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus4:num
 * @text Add
 * @parent MAT
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 * @param MDF
 * @default Magic Defense
 *
 * @param Rate5:num
 * @text Rate
 * @parent MDF
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus5:num
 * @text Add
 * @parent MDF
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 * @param AGI
 * @default Agility
 *
 * @param Rate6:num
 * @text Rate
 * @parent AGI
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus6:num
 * @text Add
 * @parent AGI
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 * @param LUK
 * @default Luck
 *
 * @param Rate7:num
 * @text Rate
 * @parent LUK
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus7:num
 * @text Add
 * @parent LUK
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * X Param Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~XParam:
 *
 * @param HIT
 * @default Hit Rate
 *
 * @param Rate0:num
 * @text Rate
 * @parent HIT
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus0:num
 * @text Add
 * @parent HIT
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param EVA
 * @default Evasion Rate
 *
 * @param Rate1:num
 * @text Rate
 * @parent EVA
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus1:num
 * @text Add
 * @parent EVA
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param CRI
 * @default Critical Hit
 *
 * @param Rate2:num
 * @text Rate
 * @parent CRI
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus2:num
 * @text Add
 * @parent CRI
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param CEV
 * @default Critical Evasion
 *
 * @param Rate3:num
 * @text Rate
 * @parent CEV
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus3:num
 * @text Add
 * @parent CEV
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param MEV
 * @default Magic Evasion
 *
 * @param Rate4:num
 * @text Rate
 * @parent MEV
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus4:num
 * @text Add
 * @parent MEV
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param MRF
 * @default Magic Reflect
 *
 * @param Rate5:num
 * @text Rate
 * @parent MRF
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus5:num
 * @text Add
 * @parent MRF
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param CNT
 * @default Counter Rate
 *
 * @param Rate6:num
 * @text Rate
 * @parent CNT
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus6:num
 * @text Add
 * @parent CNT
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param HRG
 * @default HP Regen Rate
 *
 * @param Rate7:num
 * @text Rate
 * @parent HRG
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus7:num
 * @text Add
 * @parent HRG
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param MRG
 * @default Magic Regen Rate
 *
 * @param Rate8:num
 * @text Rate
 * @parent MRG
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus8:num
 * @text Add
 * @parent MRG
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param TRG
 * @default TP Regen Rate
 *
 * @param Rate9:num
 * @text Rate
 * @parent TRG
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus9:num
 * @text Add
 * @parent TRG
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 */
/* ----------------------------------------------------------------------------
 * S Param Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SParam:
 *
 * @param TGR
 * @default Target Rate
 *
 * @param Rate0:num
 * @text Rate
 * @parent TGR
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus0:num
 * @text Add
 * @parent TGR
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param GRD
 * @default Guard Rate
 *
 * @param Rate1:num
 * @text Rate
 * @parent GRD
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus1:num
 * @text Add
 * @parent GRD
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param REC
 * @default Recovery Rate
 *
 * @param Rate2:num
 * @text Rate
 * @parent REC
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus2:num
 * @text Add
 * @parent REC
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param PHA
 * @default Pharmacology Rate
 *
 * @param Rate3:num
 * @text Rate
 * @parent PHA
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus3:num
 * @text Add
 * @parent PHA
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param MCR
 * @default MP Cost Rate
 *
 * @param Rate4:num
 * @text Rate
 * @parent MCR
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus4:num
 * @text Add
 * @parent MCR
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param TCR
 * @default TP Charge Rate
 *
 * @param Rate5:num
 * @text Rate
 * @parent TCR
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus5:num
 * @text Add
 * @parent TCR
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param PDR
 * @default Physical Damage Rate
 *
 * @param Rate6:num
 * @text Rate
 * @parent PDR
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus6:num
 * @text Add
 * @parent PDR
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param MDR
 * @default Magical Damage Rate
 *
 * @param Rate7:num
 * @text Rate
 * @parent MDR
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus7:num
 * @text Add
 * @parent MDR
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param FDR
 * @default Floor Damage Rate
 *
 * @param Rate8:num
 * @text Rate
 * @parent FDR
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus8:num
 * @text Add
 * @parent FDR
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param EXR
 * @default Experience Gain Rate
 *
 * @param Rate9:num
 * @text Rate
 * @parent EXR
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus9:num
 * @text Add
 * @parent EXR
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param BaseParamAdd:str
 * @text Base Parameter Add
 * @type select
 * @option Plus - Apply Before Rate
 * @value plus
 * @option Flat - Apply After Rate
 * @value flat
 * @desc When do you wish to apply the "Add" bonus parameters?
 * Typical Formula: (base + plus) * rate + flat
 * @default flat
 *
 * @param XParamAdd:str
 * @text X Parameter Add
 * @type select
 * @option Plus - Apply Before Rate
 * @value plus
 * @option Flat - Apply After Rate
 * @value flat
 * @desc When do you wish to apply the "Add" bonus parameters?
 * Typical Formula: (base + plus) * rate + flat
 * @default flat
 *
 * @param SParamAdd:str
 * @text S Parameter Add
 * @type select
 * @option Plus - Apply Before Rate
 * @value plus
 * @option Flat - Apply After Rate
 * @value flat
 * @desc When do you wish to apply the "Add" bonus parameters?
 * Typical Formula: (base + plus) * rate + flat
 * @default flat
 *
 */
/* ----------------------------------------------------------------------------
 * Tooltip Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Tooltip:
 *
 * @param Appearance
 *
 * @param Show:eval
 * @text Show Tooltip?
 * @parent Appearance
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show tooltips for Equipment Set Bonuses?
 * @default true
 *
 * @param Scale:num
 * @text Scale
 * @parent Appearance
 * @desc What scale size do you want for the tooltip?
 * Use 1.0 for normal size.
 * @default 0.6
 *
 * @param WindowSkin:str
 * @text Skin Filename
 * @parent Appearance
 * @type file
 * @dir img/system/
 * @desc What window skin do you want to use for the tooltip?
 * @default Window
 *
 * @param WindowOpacity:num
 * @text Skin Opacity
 * @parent Appearance
 * @type number
 * @min 0
 * @max 255
 * @desc What opacity setting is used for the tooltip?
 * Use a number between 0 and 255.
 * @default 240
 *
 * @param Offset
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Offset the tooltip X position from the mouse?
 * Negative: left. Positive: right.
 * @default +24
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Offset the tooltip Y position from the mouse?
 * Negative: up. Positive: down. Inversed when low on screen.
 * @default +40
 *
 * @param Vocabulary
 *
 * @param SetTitleFmt:str
 * @text Set Title Format
 * @parent Vocabulary
 * @desc How does the set title appear?
 * %1 - Set Name, %2 - Icon
 * @default %2\C[5]%1 Set Bonuses\C[0]
 *
 * @param SetPieceFmt:str
 * @text Set Piece Format
 * @parent Vocabulary
 * @desc How do the set pieces appear?
 * %1 - Set Name, %2 - Effects
 * @default \C[5]∙%1 Set Effect:\C[0] %2
 *
 * @param SeparatorFmt:str
 * @text Separator Format
 * @parent Vocabulary
 * @desc How do you wish to separate effects?
 * %1 - Previous Effect, %2 - Next Effect
 * @default %1, %2
 *
 * @param StateFmt:str
 * @text Passive State Format
 * @parent Vocabulary
 * @desc How are passive state effects displayed?
 * %1 - State Name, %2 - Icon
 * @default %2%1
 *
 * @param RateFmt:str
 * @text Param Rate Format
 * @parent Vocabulary
 * @desc How are Parameter Rate effects displayed?
 * %1 - Param Name, %2 - Effect
 * @default %1:%2
 *
 * @param AddPosFmt:str
 * @text Add(+) Format
 * @parent Vocabulary
 * @desc How are positive Parameter Add effects displayed?
 * %1 - Param Name, %2 - Effect
 * @default %1+%2
 *
 * @param AddNegFmt:str
 * @text Add(-) Format
 * @parent Vocabulary
 * @desc How are negative Parameter Add effects displayed?
 * %1 - Param Name, %2 - Effect
 * @default %1-%2
 *
 * @param equipSetWildcardFmt:str
 * @text Wildcard Format
 * @parent Vocabulary
 * @desc How are wildcard sets displayed?
 * %1 - Wildcard Sets
 * @default \C[5]Wildcard Sets:\c[0] %1
 *
 * @param equipSetWildcardAny:str
 * @text Wildcard: Any Set
 * @parent Vocabulary
 * @desc What text is used when the wildcard can be used for any set?
 * @default Any
 *
 */
//=============================================================================

const _0x3539a7=_0x19ea;function _0x3a51(){const _0x3aefe8=['hide','_armorEquipSetWildcards','Scene_Base_createWindowLayer','refreshActorPortrait','createAutoPieceText','callUpdateHelp','refreshEquipSetBonuses','_equipSetWildcards','Window_ShopSell','Game_BattlerBase_paramPlus','getActorEquipSetFaceName','exit','BaseParamAdd','push','SHOW_TOOLTIP','getMenuImage','addChild','Show','Game_Actor_setup','getBattlePortraitFilename','Settings','trim','CEV','itemPadding','5Tgjymy','clampPosition','format','MAT','Piece%1','hideEquipSetBonusTooltipWindow','releaseUnequippableItems','createEquipSetBonusTooltipWindow','padding','_armorEquipSets','plus','SeparatorFmt','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','faceName','paramRate','MRG','_priorityMenuImage','sparamPlus','Tooltip','refreshEquipSetTooltip','WINDOW_SKIN_FILENAME','map','sparamRate','actorEquipSetFaceName','MEV','length','pushLineOpacity','OffsetX','ParseEquipSetWildcards','_equipSetBonusTooltipWindow','Plus%1','588smdcMH','25268LXmTke','ShowText','getActorEquipSetCharacterName','setFaceImage','DEF','SetFaceNameRange','\x5cI[%1]','PDR','createWindowLayer','equipSetRate','getEquipSetPieces','EquipSets','characterIndex','TGR','addPassiveStatesFromOtherPlugins','abs','_priorityCharacterIndex','SetMenuPortraitPlus','active','Scale','HIT','SetTitleFmt','includes','SetMenuPortrait','drawing','isSceneBattle','Game_Actor_faceName','scale','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','paramPlus','WildcardAny','SetBattlePortraitRange','WildcardSet','VisuMZ_1_SkillsStatesCore','addWildcardText','setCharacterImage','addPieceDataText','itemRect','Actor-%1-SetName-%2-Pieces-%3','PHA','return\x200','ParseEquipSets','_activeWindow','SetBattlerName','WINDOW_SKIN_OPACITY','updatePosition','height','onNumberOk','onNumberCancel','drawTextEx','PassiveStates','AGI','loadSystem','SetCharaName','EVA','getEquipSetWildcards','equipSetBonusParamPlus','NUM','OffsetY','_cache','split','actorId','EQUIP_SET_S_PARAM_PLUS_FLAT','295674OpcDij','SetFaceNamePlus','toUpperCase','_equipSetBonusCount','Any','MAXHP','REC','XParam','status','note','backOpacity','5197527PTeVLf','GRD','changePaintOpacity','prototype','create','applyEquipSetWildcards','EQUIP_SET_X_PARAM_PLUS_FLAT','setMenuImage','name','registerEquipSetBonusTooltipWindow','MOUSE_OFFSET_X','xparamFlatBonus','clamp','_priorityBattlePortrait','Icon','WINDOW_SCALE','equipSetWildcardFmt','equipSetPieceFmt','_equipSetBonusSets','VisuMZ_1_ItemsEquipsCore','RegExp','AddPosFmt','showEquipSetBonusTooltipWindow','Game_Actor_setFaceImage','updateEquipSetBonusTooltip','Game_BattlerBase_xparamRate','3611810dgVUsr','Game_BattlerBase_paramRate','Game_BattlerBase_xparamPlus','SParamAdd','_item','ANY','Param','EXR','ParseActorNotetags','FDR','applyEquipSetBonuses','Game_BattlerBase_addPassiveStatesFromOtherPlugins','9aMdXHZ','WindowOpacity','SetMenuPortraitRange','loadWindowskin','getActorEquipSetFaceIndex','Scene_Shop_onNumberOk','equips','Window_EquipSlot','version','EQUIP_SET_BASE_PARAM_PLUS_FLAT','battlerName','actorEquipSetFaceIndex','description','getEquipSets','getActorEquipSetBattlerName','EVAL','actorEquipSetCharacterName','windowskin','EquipSetBonuses','processNewLine','_priorityCharacterName','actorEquipSetBattlerName','getEquipSetsSortedByMostPieces','SetBattlerNamePlus','Game_BattlerBase_xparamFlatBonus','WindowSkin','Game_Actor_faceIndex','Game_Actor_characterIndex','Game_Actor_getMenuImage','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','clearEquipSetBonusCache','_weaponEquipSetWildcards','MAXMP','SParam','filter','equipSetBonusParamRate','changeEquip','Window_Selectable_initialize','Game_BattlerBase_sparamPlus','update','LUK','Game_Actor_characterName','Rate%1','actorEquipSetCharacterIndex','Game_BattlerBase_sparamFlatBonus','STR','characterName','actorEquipSetBattlePortrait','_statusWindow','paramFlatBonus','equipSetTitleFmt','parameters','registerActorEquipSetImages','call','Game_Actor_setBattlerImage','contents','_text','getEquipSetData','xparamPlus','Game_Actor_setBattlePortrait','EQUIP_SET_BONUS_WINDOWS','537430ZhoXaI','getActorEquipSetCharacterIndex','SetPieceFmt','Window_BattleItem','width','resizeWindow','_weaponEquipSets','createContents','createAutoParamText','ARRAYSTRUCT','Text','index','SetName','onDatabaseLoaded','refresh','SetCharaNamePlus','isSupportMessageKeywords','2170930wNkvbt','initialize','addPassiveStatesFromEquipSetBonuses','shift','setActiveWindow','_equipSets','setBattlePortrait','toLowerCase','process_VisuMZ_EquipSetBonus_Notetags','Game_BattlerBase_paramFlatBonus','3216HqJuqL','equipSetPlusPos','constructor','round','checkRefreshEquipSetBonuses','Game_Actor_getBattlePortraitFilename','Game_Actor_releaseUnequippableItems','setBattlerImage','resetFontSettings','faceIndex','Scene_Shop_onSellOk','ARRAYEVAL','addSetDataText','UNTITLED','requestRefresh','hasEquipSetBonusTooltipWindow','_priorityFaceIndex','floor','_priorityFaceName','equipSetPieceSeparator','getActorEquipSetMenuPortrait','equipSetPlusNeg','Window_EquipItem','MCR','AddNegFmt','ConvertParams','parse','SetBattlePortrait','SetCharaNameRange','xparamRate','item','TCR','Mechanics','getActiveWindow','actorEquipSetMenuPortrait','Window_Selectable_callUpdateHelp','Game_BattlerBase_sparamRate','visible','Set','setItem','flat','Scene_Shop_onNumberCancel','equipSetWildcardAny','sort','_priorityBattlerName','Game_Actor_battlerName','MOUSE_OFFSET_Y','_requestRefresh','convertMessageKeywords','SetFaceName','sparamFlatBonus','baseTextRect','setup','_lineOpacity','Game_Actor_setCharacterImage','updateBackOpacity','battleMembers','MDR','match','ParseAllNotetags','isArmor','SetBattlerNameRange','_scene'];_0x3a51=function(){return _0x3aefe8;};return _0x3a51();}(function(_0x47a8fe,_0x242e0b){const _0x1fc941=_0x19ea,_0x58cc3f=_0x47a8fe();while(!![]){try{const _0x45cc39=parseInt(_0x1fc941(0x106))/0x1+parseInt(_0x1fc941(0x117))/0x2+-parseInt(_0x1fc941(0xc9))/0x3*(-parseInt(_0x1fc941(0x198))/0x4)+-parseInt(_0x1fc941(0x178))/0x5*(-parseInt(_0x1fc941(0x1d7))/0x6)+parseInt(_0x1fc941(0x197))/0x7*(-parseInt(_0x1fc941(0x121))/0x8)+-parseInt(_0x1fc941(0x1e2))/0x9+-parseInt(_0x1fc941(0xbd))/0xa;if(_0x45cc39===_0x242e0b)break;else _0x58cc3f['push'](_0x58cc3f['shift']());}catch(_0x12dd92){_0x58cc3f['push'](_0x58cc3f['shift']());}}}(_0x3a51,0xaf751));var label='EquipSetBonuses',tier=tier||0x0,dependencies=['VisuMZ_0_CoreEngine',_0x3539a7(0xb6),_0x3539a7(0x1b9)],pluginData=$plugins[_0x3539a7(0xeb)](function(_0x4a9699){const _0x1e618c=_0x3539a7;return _0x4a9699[_0x1e618c(0x1df)]&&_0x4a9699[_0x1e618c(0xd5)][_0x1e618c(0x1ae)]('['+label+']');})[0x0];VisuMZ[label][_0x3539a7(0x174)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x3539a7(0x13a)]=function(_0x33a6e6,_0x36e25c){const _0x48a80d=_0x3539a7;for(const _0x315272 in _0x36e25c){if(_0x315272[_0x48a80d(0x15b)](/(.*):(.*)/i)){const _0x35aa35=String(RegExp['$1']),_0x29c3df=String(RegExp['$2'])[_0x48a80d(0x1d9)]()['trim']();let _0x3d6f18,_0x54025d,_0xcfb11b;switch(_0x29c3df){case _0x48a80d(0x1d1):_0x3d6f18=_0x36e25c[_0x315272]!==''?Number(_0x36e25c[_0x315272]):0x0;break;case'ARRAYNUM':_0x54025d=_0x36e25c[_0x315272]!==''?JSON[_0x48a80d(0x13b)](_0x36e25c[_0x315272]):[],_0x3d6f18=_0x54025d[_0x48a80d(0x18d)](_0x569e0e=>Number(_0x569e0e));break;case _0x48a80d(0xd8):_0x3d6f18=_0x36e25c[_0x315272]!==''?eval(_0x36e25c[_0x315272]):null;break;case _0x48a80d(0x12c):_0x54025d=_0x36e25c[_0x315272]!==''?JSON[_0x48a80d(0x13b)](_0x36e25c[_0x315272]):[],_0x3d6f18=_0x54025d[_0x48a80d(0x18d)](_0x1669c2=>eval(_0x1669c2));break;case'JSON':_0x3d6f18=_0x36e25c[_0x315272]!==''?JSON[_0x48a80d(0x13b)](_0x36e25c[_0x315272]):'';break;case'ARRAYJSON':_0x54025d=_0x36e25c[_0x315272]!==''?JSON[_0x48a80d(0x13b)](_0x36e25c[_0x315272]):[],_0x3d6f18=_0x54025d[_0x48a80d(0x18d)](_0x50dd66=>JSON[_0x48a80d(0x13b)](_0x50dd66));break;case'FUNC':_0x3d6f18=_0x36e25c[_0x315272]!==''?new Function(JSON[_0x48a80d(0x13b)](_0x36e25c[_0x315272])):new Function(_0x48a80d(0x1c0));break;case'ARRAYFUNC':_0x54025d=_0x36e25c[_0x315272]!==''?JSON[_0x48a80d(0x13b)](_0x36e25c[_0x315272]):[],_0x3d6f18=_0x54025d[_0x48a80d(0x18d)](_0x1fe251=>new Function(JSON['parse'](_0x1fe251)));break;case _0x48a80d(0xf6):_0x3d6f18=_0x36e25c[_0x315272]!==''?String(_0x36e25c[_0x315272]):'';break;case'ARRAYSTR':_0x54025d=_0x36e25c[_0x315272]!==''?JSON[_0x48a80d(0x13b)](_0x36e25c[_0x315272]):[],_0x3d6f18=_0x54025d['map'](_0x8cc645=>String(_0x8cc645));break;case'STRUCT':_0xcfb11b=_0x36e25c[_0x315272]!==''?JSON[_0x48a80d(0x13b)](_0x36e25c[_0x315272]):{},_0x3d6f18=VisuMZ[_0x48a80d(0x13a)]({},_0xcfb11b);break;case _0x48a80d(0x10f):_0x54025d=_0x36e25c[_0x315272]!==''?JSON[_0x48a80d(0x13b)](_0x36e25c[_0x315272]):[],_0x3d6f18=_0x54025d[_0x48a80d(0x18d)](_0x11ff78=>VisuMZ['ConvertParams']({},JSON['parse'](_0x11ff78)));break;default:continue;}_0x33a6e6[_0x35aa35]=_0x3d6f18;}}return _0x33a6e6;},(_0x2d1ea5=>{const _0x4d3878=_0x3539a7,_0xfed9a4=_0x2d1ea5[_0x4d3878(0x1ea)];for(const _0x35318b of dependencies){if(!Imported[_0x35318b]){alert(_0x4d3878(0x184)[_0x4d3878(0x17a)](_0xfed9a4,_0x35318b)),SceneManager['exit']();break;}}const _0x19ec03=_0x2d1ea5['description'];if(_0x19ec03[_0x4d3878(0x15b)](/\[Version[ ](.*?)\]/i)){const _0x29919c=Number(RegExp['$1']);_0x29919c!==VisuMZ[label][_0x4d3878(0xd1)]&&(alert(_0x4d3878(0x1b4)[_0x4d3878(0x17a)](_0xfed9a4,_0x29919c)),SceneManager[_0x4d3878(0x16b)]());}if(_0x19ec03['match'](/\[Tier[ ](\d+)\]/i)){const _0x414298=Number(RegExp['$1']);_0x414298<tier?(alert(_0x4d3878(0xe6)['format'](_0xfed9a4,_0x414298,tier)),SceneManager['exit']()):tier=Math['max'](_0x414298,tier);}VisuMZ[_0x4d3878(0x13a)](VisuMZ[label][_0x4d3878(0x174)],_0x2d1ea5[_0x4d3878(0xfc)]);})(pluginData),VisuMZ[_0x3539a7(0xdb)][_0x3539a7(0xb7)]={'Set':/<(?:EQUIP|EQUIPMENT) SET:[ ](.*)>/gi,'WildcardAny':/<(?:EQUIP|EQUIPMENT) SET WILDCARD(?:|S)>/gi,'WildcardSet':/<(?:EQUIP|EQUIPMENT) SET WILDCARD(?:|S):[ ](.*)>/gi,'SetFaceName':/<(.*)[ ]SET,[ ](\d+)[ ](?:PIECE|PIECES)[ ]FACE:[ ](.*),[ ](\d+)>/gi,'SetFaceNamePlus':/<(.*)[ ]SET,[ ](\d+)\+[ ](?:PIECE|PIECES)[ ]FACE:[ ](.*),[ ](\d+)>/gi,'SetFaceNameRange':/<(.*)[ ]SET,[ ](\d+)[ ]TO[ ](\d+)[ ](?:PIECE|PIECES)[ ]FACE:[ ](.*),[ ](\d+)>/gi,'SetCharaName':/<(.*)[ ]SET,[ ](\d+)[ ](?:PIECE|PIECES)[ ](?:CHARACTER|CHARA|SPRITE):[ ](.*),[ ](\d+)>/gi,'SetCharaNamePlus':/<(.*)[ ]SET,[ ](\d+)\+[ ](?:PIECE|PIECES)[ ](?:CHARACTER|CHARA|SPRITE):[ ](.*),[ ](\d+)>/gi,'SetCharaNameRange':/<(.*)[ ]SET,[ ](\d+)[ ]TO[ ](\d+)[ ](?:PIECE|PIECES)[ ](?:CHARACTER|CHARA|SPRITE):[ ](.*),[ ](\d+)>/gi,'SetBattlerName':/<(.*)[ ]SET,[ ](\d+)[ ](?:PIECE|PIECES)[ ](?:BATTLER|SV_ACTOR|SV ACTOR|SVACTOR):[ ](.*)>/gi,'SetBattlerNamePlus':/<(.*)[ ]SET,[ ](\d+)\+[ ](?:PIECE|PIECES)[ ](?:BATTLER|SV_ACTOR|SV ACTOR|SVACTOR):[ ](.*)>/gi,'SetBattlerNameRange':/<(.*)[ ]SET,[ ](\d+)[ ]TO[ ](\d+)[ ](?:PIECE|PIECES)[ ](?:BATTLER|SV_ACTOR|SV ACTOR|SVACTOR):[ ](.*)>/gi,'SetMenuPortrait':/<(.*)[ ]SET,[ ](\d+)[ ](?:PIECE|PIECES)[ ]MENU (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'SetMenuPortraitPlus':/<(.*)[ ]SET,[ ](\d+)\+[ ](?:PIECE|PIECES)[ ]MENU (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'SetMenuPortraitRange':/<(.*)[ ]SET,[ ](\d+)[ ]TO[ ](\d+)[ ](?:PIECE|PIECES)[ ]MENU (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'SetBattlePortrait':/<(.*)[ ]SET,[ ](\d+)[ ](?:PIECE|PIECES)[ ]BATTLE (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'SetBattlePortraitPlus':/<(.*)[ ]SET,[ ](\d+)\+[ ](?:PIECE|PIECES)[ ]BATTLE (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'SetBattlePortraitRange':/<(.*)[ ]SET,[ ](\d+)[ ]TO[ ](\d+)[ ](?:PIECE|PIECES)[ ]BATTLE (?:PORTRAIT|IMAGE):[ ](.*)>/gi},VisuMZ[_0x3539a7(0xdb)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot['prototype'][_0x3539a7(0x113)],Scene_Boot[_0x3539a7(0x1e5)][_0x3539a7(0x113)]=function(){const _0x56be62=_0x3539a7;VisuMZ[_0x56be62(0xdb)]['Scene_Boot_onDatabaseLoaded']['call'](this),this['process_VisuMZ_EquipSetBonus_Notetags']();},Scene_Boot[_0x3539a7(0x1e5)][_0x3539a7(0x11f)]=function(){const _0x2338e7=_0x3539a7;if(VisuMZ[_0x2338e7(0x15c)])return;for(const _0x348ae0 of $dataActors){if(!_0x348ae0)continue;ImageManager[_0x2338e7(0xfd)](_0x348ae0);}},VisuMZ[_0x3539a7(0xdb)][_0x3539a7(0xc5)]=VisuMZ['ParseActorNotetags'],VisuMZ[_0x3539a7(0xc5)]=function(_0xfae2bf){const _0x34284c=_0x3539a7;VisuMZ[_0x34284c(0xdb)]['ParseActorNotetags'][_0x34284c(0xfe)](this,_0xfae2bf),ImageManager[_0x34284c(0xfd)](_0xfae2bf);},DataManager[_0x3539a7(0xd6)]=function(_0x1ef607){const _0x32e964=_0x3539a7;if(this['isWeapon'](_0x1ef607))return this[_0x32e964(0x10c)]=this[_0x32e964(0x10c)]||{},!this[_0x32e964(0x10c)][_0x1ef607['id']]&&(this['_weaponEquipSets'][_0x1ef607['id']]=VisuMZ[_0x32e964(0xdb)][_0x32e964(0x1c1)](_0x1ef607)),this[_0x32e964(0x10c)][_0x1ef607['id']];else return this[_0x32e964(0x15d)](_0x1ef607)?(this['_armorEquipSets']=this[_0x32e964(0x181)]||{},!this['_armorEquipSets'][_0x1ef607['id']]&&(this[_0x32e964(0x181)][_0x1ef607['id']]=VisuMZ['EquipSetBonuses'][_0x32e964(0x1c1)](_0x1ef607)),this['_armorEquipSets'][_0x1ef607['id']]):[];},VisuMZ['EquipSetBonuses']['ParseEquipSets']=function(_0x3460e7){const _0x2c3bf4=_0x3539a7,_0x355c22=VisuMZ[_0x2c3bf4(0xdb)][_0x2c3bf4(0xb7)],_0x144f5a=_0x3460e7['note'],_0x226662=[],_0x4e1dc0=_0x144f5a[_0x2c3bf4(0x15b)](_0x355c22['Set']);if(_0x4e1dc0)for(const _0xb7dd6a of _0x4e1dc0){_0xb7dd6a[_0x2c3bf4(0x15b)](_0x355c22[_0x2c3bf4(0x147)]);const _0x55cf72=String(RegExp['$1'])[_0x2c3bf4(0x1d9)]()['trim']();!!DataManager[_0x2c3bf4(0x102)](_0x55cf72)&&_0x226662['push'](_0x55cf72);}return _0x226662;},DataManager['getEquipSetData']=function(_0x2cfc84){const _0x4bad98=_0x3539a7;_0x2cfc84=_0x2cfc84['toUpperCase']()[_0x4bad98(0x175)]();if(this[_0x4bad98(0x11c)]===undefined){this[_0x4bad98(0x11c)]={};const _0x2a84a4=VisuMZ['EquipSetBonuses'][_0x4bad98(0x174)][_0x4bad98(0x1a3)];for(const _0x3160d5 of _0x2a84a4){const _0x517179=_0x3160d5[_0x4bad98(0x112)][_0x4bad98(0x1d9)]()[_0x4bad98(0x175)]();if(_0x517179==='')continue;if(_0x517179===_0x4bad98(0x12e))continue;this[_0x4bad98(0x11c)][_0x517179]=_0x3160d5;}}return this['_equipSets'][_0x2cfc84]||null;},DataManager[_0x3539a7(0x1cf)]=function(_0x767310){const _0x39d7e9=_0x3539a7;if(_0x767310&&DataManager[_0x39d7e9(0xd6)](_0x767310)[_0x39d7e9(0x191)]>0x0)return[];if(this['isWeapon'](_0x767310))return this[_0x39d7e9(0xe8)]=this[_0x39d7e9(0xe8)]||{},!this[_0x39d7e9(0xe8)][_0x767310['id']]&&(this[_0x39d7e9(0xe8)][_0x767310['id']]=VisuMZ[_0x39d7e9(0xdb)][_0x39d7e9(0x194)](_0x767310)),this[_0x39d7e9(0xe8)][_0x767310['id']];else return this[_0x39d7e9(0x15d)](_0x767310)?(this[_0x39d7e9(0x161)]=this[_0x39d7e9(0x161)]||{},!this[_0x39d7e9(0x161)][_0x767310['id']]&&(this[_0x39d7e9(0x161)][_0x767310['id']]=VisuMZ[_0x39d7e9(0xdb)]['ParseEquipSetWildcards'](_0x767310)),this[_0x39d7e9(0x161)][_0x767310['id']]):[];},VisuMZ[_0x3539a7(0xdb)][_0x3539a7(0x194)]=function(_0x27e7b4){const _0x1cf263=_0x3539a7,_0x5458c6=VisuMZ[_0x1cf263(0xdb)]['RegExp'],_0x3cb850=_0x27e7b4[_0x1cf263(0x1e0)],_0x279f8b=[];_0x3cb850['match'](_0x5458c6[_0x1cf263(0x1b6)])&&_0x279f8b['push'](_0x1cf263(0xc2));const _0x4ca990=_0x3cb850['match'](_0x5458c6[_0x1cf263(0x1b8)]);if(_0x4ca990)for(const _0x4c3760 of _0x4ca990){_0x4c3760[_0x1cf263(0x15b)](_0x5458c6[_0x1cf263(0x1b8)]);const _0x5880be=String(RegExp['$1'])[_0x1cf263(0x1d4)](',')[_0x1cf263(0x18d)](_0x3c669b=>_0x3c669b[_0x1cf263(0x1d9)]()[_0x1cf263(0x175)]());for(const _0x9e5986 of _0x5880be){!!DataManager[_0x1cf263(0x102)](_0x9e5986)&&_0x279f8b[_0x1cf263(0x16d)](_0x9e5986);}}return _0x279f8b;},ImageManager['actorEquipSetFaceName']={},ImageManager[_0x3539a7(0xd4)]={},ImageManager[_0x3539a7(0xd9)]={},ImageManager[_0x3539a7(0xf4)]={},ImageManager[_0x3539a7(0xde)]={},ImageManager['actorEquipSetMenuPortrait']={},ImageManager[_0x3539a7(0xf8)]={},ImageManager[_0x3539a7(0xfd)]=function(_0x4db995){const _0x4b325e=_0x3539a7;if(!_0x4db995)return;const _0x2abe55=VisuMZ[_0x4b325e(0xdb)][_0x4b325e(0xb7)],_0x4a1d93=_0x4db995[_0x4b325e(0x1e0)],_0x3d935d=_0x4db995['id'],_0x350591=_0x4a1d93[_0x4b325e(0x15b)](_0x2abe55[_0x4b325e(0x152)]);if(_0x350591)for(const _0x1444da of _0x350591){if(!_0x1444da)continue;_0x1444da[_0x4b325e(0x15b)](_0x2abe55[_0x4b325e(0x152)]);const _0x40cbc9=String(RegExp['$1'])[_0x4b325e(0x1d9)]()[_0x4b325e(0x175)](),_0x50880c=Number(RegExp['$2'])||0x1,_0x5a5e5e=String(RegExp['$3'])['trim'](),_0x4e4b3f=Number(RegExp['$4']);if(!DataManager[_0x4b325e(0x102)](_0x40cbc9))continue;const _0x6260ae=_0x4b325e(0x1be)['format'](_0x3d935d,_0x40cbc9,_0x50880c);ImageManager[_0x4b325e(0x18f)][_0x6260ae]=_0x5a5e5e,ImageManager['actorEquipSetFaceIndex'][_0x6260ae]=_0x4e4b3f;}const _0x58400e=_0x4a1d93[_0x4b325e(0x15b)](_0x2abe55[_0x4b325e(0x1d8)]);if(_0x58400e)for(const _0x1abac3 of _0x58400e){if(!_0x1abac3)continue;_0x1abac3[_0x4b325e(0x15b)](_0x2abe55[_0x4b325e(0x1d8)]);const _0x5de4ec=String(RegExp['$1'])[_0x4b325e(0x1d9)]()[_0x4b325e(0x175)](),_0xc506e6=Number(RegExp['$2'])||0x1,_0x382d05=0x14,_0x3c1382=String(RegExp['$3'])[_0x4b325e(0x175)](),_0x4a9500=Number(RegExp['$4']);if(!DataManager['getEquipSetData'](_0x5de4ec))continue;for(let _0x58d479=_0xc506e6;_0x58d479<=_0x382d05;_0x58d479++){const _0x554733=_0x4b325e(0x1be)[_0x4b325e(0x17a)](_0x3d935d,_0x5de4ec,_0x58d479);ImageManager[_0x4b325e(0x18f)][_0x554733]=_0x3c1382,ImageManager[_0x4b325e(0xd4)][_0x554733]=_0x4a9500;}}const _0x2069c3=_0x4a1d93[_0x4b325e(0x15b)](_0x2abe55[_0x4b325e(0x19d)]);if(_0x2069c3)for(const _0x3a0f8f of _0x2069c3){if(!_0x3a0f8f)continue;_0x3a0f8f[_0x4b325e(0x15b)](_0x2abe55[_0x4b325e(0x19d)]);const _0x1f0976=String(RegExp['$1'])[_0x4b325e(0x1d9)]()['trim'](),_0x4c9dcc=Number(RegExp['$2'])||0x1,_0x5bc0a2=Number(RegExp['$3'])||0x1,_0x5b8d95=String(RegExp['$4'])['trim'](),_0x3a1ca8=Number(RegExp['$5']);if(!DataManager[_0x4b325e(0x102)](_0x1f0976))continue;for(let _0x292743=_0x4c9dcc;_0x292743<=_0x5bc0a2;_0x292743++){const _0xfc8856=_0x4b325e(0x1be)[_0x4b325e(0x17a)](_0x3d935d,_0x1f0976,_0x292743);ImageManager[_0x4b325e(0x18f)][_0xfc8856]=_0x5b8d95,ImageManager['actorEquipSetFaceIndex'][_0xfc8856]=_0x3a1ca8;}}const _0x3c5b1e=_0x4a1d93['match'](_0x2abe55[_0x4b325e(0x1cd)]);if(_0x3c5b1e)for(const _0x328228 of _0x3c5b1e){if(!_0x328228)continue;_0x328228[_0x4b325e(0x15b)](_0x2abe55[_0x4b325e(0x1cd)]);const _0x3bb82f=String(RegExp['$1'])['toUpperCase']()['trim'](),_0x3e7207=Number(RegExp['$2'])||0x1,_0x4b4680=String(RegExp['$3'])['trim'](),_0x575964=Number(RegExp['$4']);if(!DataManager['getEquipSetData'](_0x3bb82f))continue;const _0x34cae1=_0x4b325e(0x1be)[_0x4b325e(0x17a)](_0x3d935d,_0x3bb82f,_0x3e7207);ImageManager['actorEquipSetCharacterName'][_0x34cae1]=_0x4b4680,ImageManager[_0x4b325e(0xf4)][_0x34cae1]=_0x575964;}const _0x1b359c=_0x4a1d93[_0x4b325e(0x15b)](_0x2abe55['SetCharaNamePlus']);if(_0x1b359c)for(const _0xa6823 of _0x1b359c){if(!_0xa6823)continue;_0xa6823[_0x4b325e(0x15b)](_0x2abe55[_0x4b325e(0x115)]);const _0x4bb124=String(RegExp['$1'])[_0x4b325e(0x1d9)]()[_0x4b325e(0x175)](),_0x50739f=Number(RegExp['$2'])||0x1,_0x2584eb=0x14,_0x3dea13=String(RegExp['$3'])[_0x4b325e(0x175)](),_0x4eb21e=Number(RegExp['$4']);if(!DataManager[_0x4b325e(0x102)](_0x4bb124))continue;for(let _0x5d6e4d=_0x50739f;_0x5d6e4d<=_0x2584eb;_0x5d6e4d++){const _0x3cc115=_0x4b325e(0x1be)['format'](_0x3d935d,_0x4bb124,_0x5d6e4d);ImageManager[_0x4b325e(0xd9)][_0x3cc115]=_0x3dea13,ImageManager[_0x4b325e(0xf4)][_0x3cc115]=_0x4eb21e;}}const _0x3368d6=_0x4a1d93[_0x4b325e(0x15b)](_0x2abe55[_0x4b325e(0x13d)]);if(_0x3368d6)for(const _0x3387cd of _0x3368d6){if(!_0x3387cd)continue;_0x3387cd[_0x4b325e(0x15b)](_0x2abe55[_0x4b325e(0x13d)]);const _0xdcfd97=String(RegExp['$1'])[_0x4b325e(0x1d9)]()[_0x4b325e(0x175)](),_0x1a0514=Number(RegExp['$2'])||0x1,_0x1e0b98=Number(RegExp['$3'])||0x1,_0x4e1c50=String(RegExp['$4'])['trim'](),_0x212226=Number(RegExp['$5']);if(!DataManager[_0x4b325e(0x102)](_0xdcfd97))continue;for(let _0x27eff2=_0x1a0514;_0x27eff2<=_0x1e0b98;_0x27eff2++){const _0x122fff=_0x4b325e(0x1be)[_0x4b325e(0x17a)](_0x3d935d,_0xdcfd97,_0x27eff2);ImageManager[_0x4b325e(0xd9)][_0x122fff]=_0x4e1c50,ImageManager['actorEquipSetCharacterIndex'][_0x122fff]=_0x212226;}}const _0x3ad8b5=_0x4a1d93[_0x4b325e(0x15b)](_0x2abe55['SetBattlerName']);if(_0x3ad8b5)for(const _0x1c57fd of _0x3ad8b5){if(!_0x1c57fd)continue;_0x1c57fd[_0x4b325e(0x15b)](_0x2abe55[_0x4b325e(0x1c3)]);const _0x9c3b8f=String(RegExp['$1'])[_0x4b325e(0x1d9)]()[_0x4b325e(0x175)](),_0x592c5e=Number(RegExp['$2'])||0x1,_0xec565d=String(RegExp['$3'])[_0x4b325e(0x175)]();if(!DataManager[_0x4b325e(0x102)](_0x9c3b8f))continue;const _0x2fbc2a=_0x4b325e(0x1be)[_0x4b325e(0x17a)](_0x3d935d,_0x9c3b8f,_0x592c5e);ImageManager[_0x4b325e(0xde)][_0x2fbc2a]=_0xec565d;}const _0x1c893d=_0x4a1d93[_0x4b325e(0x15b)](_0x2abe55[_0x4b325e(0xe0)]);if(_0x1c893d)for(const _0x5ef00f of _0x1c893d){if(!_0x5ef00f)continue;_0x5ef00f[_0x4b325e(0x15b)](_0x2abe55[_0x4b325e(0xe0)]);const _0x20c4bd=String(RegExp['$1'])[_0x4b325e(0x1d9)]()[_0x4b325e(0x175)](),_0x4e2a70=Number(RegExp['$2'])||0x1,_0x13ed57=0x14,_0x531f10=String(RegExp['$3'])['trim']();if(!DataManager[_0x4b325e(0x102)](_0x20c4bd))continue;for(let _0x358c92=_0x4e2a70;_0x358c92<=_0x13ed57;_0x358c92++){const _0x31b214='Actor-%1-SetName-%2-Pieces-%3'['format'](_0x3d935d,_0x20c4bd,_0x358c92);ImageManager[_0x4b325e(0xde)][_0x31b214]=_0x531f10;}}const _0x5aa933=_0x4a1d93[_0x4b325e(0x15b)](_0x2abe55[_0x4b325e(0x15e)]);if(_0x5aa933)for(const _0x12d42c of _0x5aa933){if(!_0x12d42c)continue;_0x12d42c['match'](_0x2abe55[_0x4b325e(0x15e)]);const _0x4c8797=String(RegExp['$1'])['toUpperCase']()[_0x4b325e(0x175)](),_0x2a8c19=Number(RegExp['$2'])||0x1,_0x57f2cb=Number(RegExp['$3'])||0x1,_0x973ca3=String(RegExp['$4'])[_0x4b325e(0x175)]();if(!DataManager[_0x4b325e(0x102)](_0x4c8797))continue;for(let _0x57ad44=_0x2a8c19;_0x57ad44<=_0x57f2cb;_0x57ad44++){const _0x40551e='Actor-%1-SetName-%2-Pieces-%3'[_0x4b325e(0x17a)](_0x3d935d,_0x4c8797,_0x57ad44);ImageManager[_0x4b325e(0xde)][_0x40551e]=_0x973ca3;}}const _0x46d2c4=_0x4a1d93[_0x4b325e(0x15b)](_0x2abe55['SetMenuPortrait']);if(_0x46d2c4)for(const _0x12d407 of _0x46d2c4){if(!_0x12d407)continue;_0x12d407[_0x4b325e(0x15b)](_0x2abe55[_0x4b325e(0x1af)]);const _0x17fe39=String(RegExp['$1'])[_0x4b325e(0x1d9)]()[_0x4b325e(0x175)](),_0x461a13=Number(RegExp['$2'])||0x1,_0x410cdf=String(RegExp['$3'])[_0x4b325e(0x175)]();if(!DataManager['getEquipSetData'](_0x17fe39))continue;const _0x542260=_0x4b325e(0x1be)[_0x4b325e(0x17a)](_0x3d935d,_0x17fe39,_0x461a13);ImageManager['actorEquipSetMenuPortrait'][_0x542260]=_0x410cdf;}const _0x599a94=_0x4a1d93[_0x4b325e(0x15b)](_0x2abe55[_0x4b325e(0x1a9)]);if(_0x599a94)for(const _0x4506e0 of _0x599a94){if(!_0x4506e0)continue;_0x4506e0[_0x4b325e(0x15b)](_0x2abe55[_0x4b325e(0x1a9)]);const _0x32d217=String(RegExp['$1'])[_0x4b325e(0x1d9)]()[_0x4b325e(0x175)](),_0x280dfa=Number(RegExp['$2'])||0x1,_0x356a25=0x14,_0x2fda5c=String(RegExp['$3'])[_0x4b325e(0x175)]();if(!DataManager[_0x4b325e(0x102)](_0x32d217))continue;for(let _0x180215=_0x280dfa;_0x180215<=_0x356a25;_0x180215++){const _0x284707=_0x4b325e(0x1be)[_0x4b325e(0x17a)](_0x3d935d,_0x32d217,_0x180215);ImageManager[_0x4b325e(0x143)][_0x284707]=_0x2fda5c;}}const _0x477fd1=_0x4a1d93[_0x4b325e(0x15b)](_0x2abe55['SetMenuPortraitRange']);if(_0x477fd1)for(const _0x448d45 of _0x477fd1){if(!_0x448d45)continue;_0x448d45[_0x4b325e(0x15b)](_0x2abe55[_0x4b325e(0xcb)]);const _0x3f7a6d=String(RegExp['$1'])[_0x4b325e(0x1d9)]()[_0x4b325e(0x175)](),_0x5cfef8=Number(RegExp['$2'])||0x1,_0x3ca9a9=Number(RegExp['$3'])||0x1,_0x13412e=String(RegExp['$4'])['trim']();if(!DataManager[_0x4b325e(0x102)](_0x3f7a6d))continue;for(let _0xcb432c=_0x5cfef8;_0xcb432c<=_0x3ca9a9;_0xcb432c++){const _0x576b73=_0x4b325e(0x1be)[_0x4b325e(0x17a)](_0x3d935d,_0x3f7a6d,_0xcb432c);ImageManager['actorEquipSetMenuPortrait'][_0x576b73]=_0x13412e;}}const _0x1ab6e2=_0x4a1d93[_0x4b325e(0x15b)](_0x2abe55[_0x4b325e(0x13c)]);if(_0x1ab6e2)for(const _0x293187 of _0x1ab6e2){if(!_0x293187)continue;_0x293187['match'](_0x2abe55[_0x4b325e(0x13c)]);const _0x2c9939=String(RegExp['$1'])[_0x4b325e(0x1d9)]()[_0x4b325e(0x175)](),_0x4dd94f=Number(RegExp['$2'])||0x1,_0x2e0c8c=String(RegExp['$3'])[_0x4b325e(0x175)]();if(!DataManager['getEquipSetData'](_0x2c9939))continue;const _0x329c1a=_0x4b325e(0x1be)[_0x4b325e(0x17a)](_0x3d935d,_0x2c9939,_0x4dd94f);ImageManager[_0x4b325e(0xf8)][_0x329c1a]=_0x2e0c8c;}const _0x10e88e=_0x4a1d93[_0x4b325e(0x15b)](_0x2abe55[_0x4b325e(0x13c)]);if(_0x10e88e)for(const _0x33c79d of _0x10e88e){if(!_0x33c79d)continue;_0x33c79d[_0x4b325e(0x15b)](_0x2abe55[_0x4b325e(0x13c)]);const _0x2698c9=String(RegExp['$1'])[_0x4b325e(0x1d9)]()[_0x4b325e(0x175)](),_0x3ea7e6=Number(RegExp['$2'])||0x1,_0x3eb5ca=0x14,_0x5b1c3d=String(RegExp['$3'])[_0x4b325e(0x175)]();if(!DataManager[_0x4b325e(0x102)](_0x2698c9))continue;for(let _0x5a0df6=_0x3ea7e6;_0x5a0df6<=_0x3eb5ca;_0x5a0df6++){const _0x1d9e8d=_0x4b325e(0x1be)[_0x4b325e(0x17a)](_0x3d935d,_0x2698c9,_0x5a0df6);ImageManager['actorEquipSetBattlePortrait'][_0x1d9e8d]=_0x5b1c3d;}}const _0x477f5b=_0x4a1d93[_0x4b325e(0x15b)](_0x2abe55['SetBattlePortraitRange']);if(_0x477f5b)for(const _0x4769bb of _0x477f5b){if(!_0x4769bb)continue;_0x4769bb[_0x4b325e(0x15b)](_0x2abe55[_0x4b325e(0x1b7)]);const _0x579691=String(RegExp['$1'])[_0x4b325e(0x1d9)]()[_0x4b325e(0x175)](),_0x1b6df0=Number(RegExp['$2'])||0x1,_0x4c1b3d=Number(RegExp['$3'])||0x1,_0x2b2099=String(RegExp['$4'])[_0x4b325e(0x175)]();if(!DataManager[_0x4b325e(0x102)](_0x579691))continue;for(let _0x30d6fc=_0x1b6df0;_0x30d6fc<=_0x4c1b3d;_0x30d6fc++){const _0x1e1302=_0x4b325e(0x1be)[_0x4b325e(0x17a)](_0x3d935d,_0x579691,_0x30d6fc);ImageManager['actorEquipSetBattlePortrait'][_0x1e1302]=_0x2b2099;}}},ImageManager[_0x3539a7(0x16a)]=function(_0x3616fd,_0x2c3422,_0x166768){const _0x3c20b0=_0x3539a7;if(!_0x3616fd||!_0x2c3422||!_0x166768)return'';const _0x5d8210=_0x3c20b0(0x1be)['format'](_0x3616fd[_0x3c20b0(0x1d5)](),_0x2c3422[_0x3c20b0(0x1d9)]()[_0x3c20b0(0x175)](),_0x166768);return ImageManager[_0x3c20b0(0x18f)][_0x5d8210]||'';},ImageManager[_0x3539a7(0xcd)]=function(_0x298371,_0x2131dd,_0x1116ca){const _0x11c2bf=_0x3539a7;if(!_0x298371||!_0x2131dd||!_0x1116ca)return undefined;const _0x13b96b='Actor-%1-SetName-%2-Pieces-%3'['format'](_0x298371[_0x11c2bf(0x1d5)](),_0x2131dd[_0x11c2bf(0x1d9)]()[_0x11c2bf(0x175)](),_0x1116ca);return ImageManager[_0x11c2bf(0xd4)][_0x13b96b]||undefined;},ImageManager[_0x3539a7(0x19a)]=function(_0x11b93e,_0x5e392b,_0x947aad){const _0x1a586a=_0x3539a7;if(!_0x11b93e||!_0x5e392b||!_0x947aad)return'';const _0x338058=_0x1a586a(0x1be)[_0x1a586a(0x17a)](_0x11b93e[_0x1a586a(0x1d5)](),_0x5e392b[_0x1a586a(0x1d9)]()['trim'](),_0x947aad);return ImageManager[_0x1a586a(0xd9)][_0x338058]||'';},ImageManager[_0x3539a7(0x107)]=function(_0x4142d7,_0x13a93e,_0x137a46){const _0x52b188=_0x3539a7;if(!_0x4142d7||!_0x13a93e||!_0x137a46)return undefined;const _0x504632=_0x52b188(0x1be)[_0x52b188(0x17a)](_0x4142d7[_0x52b188(0x1d5)](),_0x13a93e['toUpperCase']()[_0x52b188(0x175)](),_0x137a46);return ImageManager['actorEquipSetCharacterIndex'][_0x504632]||undefined;},ImageManager['getActorEquipSetBattlerName']=function(_0x375b63,_0x31e376,_0xf819d0){const _0x4c4b28=_0x3539a7;if(!_0x375b63||!_0x31e376||!_0xf819d0)return'';const _0x31c654=_0x4c4b28(0x1be)[_0x4c4b28(0x17a)](_0x375b63['actorId'](),_0x31e376['toUpperCase']()[_0x4c4b28(0x175)](),_0xf819d0);return ImageManager[_0x4c4b28(0xde)][_0x31c654]||'';},ImageManager[_0x3539a7(0x135)]=function(_0x2876e3,_0x5c8172,_0x3e80f9){const _0x578f46=_0x3539a7;if(!_0x2876e3||!_0x5c8172||!_0x3e80f9)return'';const _0x2d2f92='Actor-%1-SetName-%2-Pieces-%3'[_0x578f46(0x17a)](_0x2876e3[_0x578f46(0x1d5)](),_0x5c8172[_0x578f46(0x1d9)]()['trim'](),_0x3e80f9);return ImageManager[_0x578f46(0x143)][_0x2d2f92]||'';},ImageManager['getActorEquipSetBattlePortrait']=function(_0xf49d21,_0x4aca6f,_0x37ad05){const _0x318174=_0x3539a7;if(!_0xf49d21||!_0x4aca6f||!_0x37ad05)return'';const _0x51bf25='Actor-%1-SetName-%2-Pieces-%3'[_0x318174(0x17a)](_0xf49d21[_0x318174(0x1d5)](),_0x4aca6f[_0x318174(0x1d9)]()[_0x318174(0x175)](),_0x37ad05);return ImageManager[_0x318174(0xf8)][_0x51bf25]||'';},TextManager[_0x3539a7(0xfb)]=VisuMZ[_0x3539a7(0xdb)]['Settings'][_0x3539a7(0x18a)][_0x3539a7(0x1ad)],TextManager[_0x3539a7(0x1f3)]=VisuMZ['EquipSetBonuses'][_0x3539a7(0x174)][_0x3539a7(0x18a)][_0x3539a7(0x108)],TextManager[_0x3539a7(0x134)]=VisuMZ[_0x3539a7(0xdb)]['Settings'][_0x3539a7(0x18a)][_0x3539a7(0x183)],TextManager['equipSetState']=VisuMZ[_0x3539a7(0xdb)][_0x3539a7(0x174)]['Tooltip']['StateFmt'],TextManager[_0x3539a7(0x1a1)]=VisuMZ[_0x3539a7(0xdb)][_0x3539a7(0x174)][_0x3539a7(0x18a)]['RateFmt'],TextManager[_0x3539a7(0x122)]=VisuMZ[_0x3539a7(0xdb)][_0x3539a7(0x174)]['Tooltip'][_0x3539a7(0xb8)],TextManager[_0x3539a7(0x136)]=VisuMZ[_0x3539a7(0xdb)][_0x3539a7(0x174)]['Tooltip'][_0x3539a7(0x139)],TextManager[_0x3539a7(0x1f2)]=VisuMZ[_0x3539a7(0xdb)]['Settings'][_0x3539a7(0x18a)]['equipSetWildcardFmt']??'\x5cC[5]Wildcard\x20Sets:\x5cc[0]\x20%1',TextManager[_0x3539a7(0x14b)]=VisuMZ[_0x3539a7(0xdb)][_0x3539a7(0x174)][_0x3539a7(0x18a)][_0x3539a7(0x14b)]??_0x3539a7(0x1db),SceneManager[_0x3539a7(0x18b)]=function(){const _0x215e57=_0x3539a7,_0x3e9850=this[_0x215e57(0x15f)];if(!_0x3e9850)return;const _0x37d9e6=_0x3e9850['_equipSetBonusTooltipWindow'];if(_0x37d9e6)_0x37d9e6[_0x215e57(0x12f)]();},Game_BattlerBase['EQUIP_SET_BASE_PARAM_PLUS_FLAT']=VisuMZ[_0x3539a7(0xdb)][_0x3539a7(0x174)][_0x3539a7(0x141)][_0x3539a7(0x16c)],Game_BattlerBase[_0x3539a7(0x1e8)]=VisuMZ['EquipSetBonuses'][_0x3539a7(0x174)]['Mechanics']['XParamAdd'],Game_BattlerBase[_0x3539a7(0x1d6)]=VisuMZ[_0x3539a7(0xdb)][_0x3539a7(0x174)]['Mechanics'][_0x3539a7(0xc0)],Game_BattlerBase['prototype'][_0x3539a7(0x1d0)]=function(_0x22f901,_0x34f03b){return 0x0;},Game_BattlerBase[_0x3539a7(0x1e5)][_0x3539a7(0xec)]=function(_0x12adec,_0x216ada){return 0x1;},VisuMZ['EquipSetBonuses'][_0x3539a7(0x169)]=Game_BattlerBase[_0x3539a7(0x1e5)][_0x3539a7(0x1b5)],Game_BattlerBase['prototype']['paramPlus']=function(_0x2cd282){const _0x27766f=_0x3539a7;let _0x5500b4=VisuMZ[_0x27766f(0xdb)][_0x27766f(0x169)]['call'](this,_0x2cd282);return Game_BattlerBase[_0x27766f(0xd2)]===_0x27766f(0x182)&&(_0x5500b4+=this[_0x27766f(0x1d0)](_0x27766f(0xc3),_0x2cd282)),_0x5500b4;},VisuMZ['EquipSetBonuses']['Game_BattlerBase_paramRate']=Game_BattlerBase[_0x3539a7(0x1e5)][_0x3539a7(0x186)],Game_BattlerBase[_0x3539a7(0x1e5)][_0x3539a7(0x186)]=function(_0x3665b4){const _0x46f24a=_0x3539a7;let _0x1b1597=VisuMZ[_0x46f24a(0xdb)][_0x46f24a(0xbe)][_0x46f24a(0xfe)](this,_0x3665b4);return _0x1b1597*this['equipSetBonusParamRate'](_0x46f24a(0xc3),_0x3665b4);},VisuMZ[_0x3539a7(0xdb)][_0x3539a7(0x120)]=Game_BattlerBase[_0x3539a7(0x1e5)][_0x3539a7(0xfa)],Game_BattlerBase[_0x3539a7(0x1e5)][_0x3539a7(0xfa)]=function(_0x1399ca){const _0x42b25f=_0x3539a7;let _0x2ec9e3=VisuMZ['EquipSetBonuses']['Game_BattlerBase_paramFlatBonus'][_0x42b25f(0xfe)](this,_0x1399ca);return Game_BattlerBase[_0x42b25f(0xd2)]===_0x42b25f(0x149)&&(_0x2ec9e3+=this['equipSetBonusParamPlus'](_0x42b25f(0xc3),_0x1399ca)),_0x2ec9e3;},VisuMZ[_0x3539a7(0xdb)][_0x3539a7(0xbf)]=Game_BattlerBase[_0x3539a7(0x1e5)][_0x3539a7(0x103)],Game_BattlerBase[_0x3539a7(0x1e5)]['xparamPlus']=function(_0x29b303){const _0x14a4c7=_0x3539a7;let _0x3ee610=VisuMZ[_0x14a4c7(0xdb)]['Game_BattlerBase_xparamPlus'][_0x14a4c7(0xfe)](this,_0x29b303);return Game_BattlerBase[_0x14a4c7(0x1e8)]===_0x14a4c7(0x182)&&(_0x3ee610+=this[_0x14a4c7(0x1d0)](_0x14a4c7(0x1de),_0x29b303)),_0x3ee610;},VisuMZ[_0x3539a7(0xdb)][_0x3539a7(0xbc)]=Game_BattlerBase[_0x3539a7(0x1e5)][_0x3539a7(0x13e)],Game_BattlerBase[_0x3539a7(0x1e5)]['xparamRate']=function(_0x1ae91e){const _0x38c2f5=_0x3539a7;let _0x21d0f9=VisuMZ[_0x38c2f5(0xdb)][_0x38c2f5(0xbc)][_0x38c2f5(0xfe)](this,_0x1ae91e);return _0x21d0f9*this[_0x38c2f5(0xec)]('XParam',_0x1ae91e);},VisuMZ[_0x3539a7(0xdb)][_0x3539a7(0xe1)]=Game_BattlerBase['prototype']['xparamFlatBonus'],Game_BattlerBase[_0x3539a7(0x1e5)][_0x3539a7(0x1ed)]=function(_0x4f7f02){const _0x4fdff3=_0x3539a7;let _0x3dd8dc=VisuMZ[_0x4fdff3(0xdb)][_0x4fdff3(0xe1)][_0x4fdff3(0xfe)](this,_0x4f7f02);return Game_BattlerBase[_0x4fdff3(0x1e8)]==='flat'&&(_0x3dd8dc+=this[_0x4fdff3(0x1d0)]('XParam',_0x4f7f02)),_0x3dd8dc;},VisuMZ['EquipSetBonuses'][_0x3539a7(0xef)]=Game_BattlerBase[_0x3539a7(0x1e5)]['sparamPlus'],Game_BattlerBase[_0x3539a7(0x1e5)][_0x3539a7(0x189)]=function(_0x2a60a3){const _0x226372=_0x3539a7;let _0x28111e=VisuMZ[_0x226372(0xdb)]['Game_BattlerBase_sparamPlus'][_0x226372(0xfe)](this,_0x2a60a3);return Game_BattlerBase[_0x226372(0x1d6)]===_0x226372(0x182)&&(_0x28111e+=this[_0x226372(0x1d0)]('SParam',_0x2a60a3)),_0x28111e;},VisuMZ[_0x3539a7(0xdb)][_0x3539a7(0x145)]=Game_BattlerBase[_0x3539a7(0x1e5)][_0x3539a7(0x18e)],Game_BattlerBase['prototype'][_0x3539a7(0x18e)]=function(_0x5e8fa8){const _0x3192e5=_0x3539a7;let _0x2ace15=VisuMZ['EquipSetBonuses'][_0x3192e5(0x145)][_0x3192e5(0xfe)](this,_0x5e8fa8);return _0x2ace15*this[_0x3192e5(0xec)](_0x3192e5(0xea),_0x5e8fa8);},VisuMZ[_0x3539a7(0xdb)][_0x3539a7(0xf5)]=Game_BattlerBase[_0x3539a7(0x1e5)][_0x3539a7(0x153)],Game_BattlerBase['prototype'][_0x3539a7(0x153)]=function(_0x2e2037){const _0x657e65=_0x3539a7;let _0x5eb3f9=VisuMZ[_0x657e65(0xdb)][_0x657e65(0xf5)][_0x657e65(0xfe)](this,_0x2e2037);return Game_BattlerBase[_0x657e65(0x1d6)]===_0x657e65(0x149)&&(_0x5eb3f9+=this[_0x657e65(0x1d0)](_0x657e65(0xea),_0x2e2037)),_0x5eb3f9;},VisuMZ[_0x3539a7(0xdb)][_0x3539a7(0xc8)]=Game_BattlerBase[_0x3539a7(0x1e5)][_0x3539a7(0x1a6)],Game_BattlerBase[_0x3539a7(0x1e5)]['addPassiveStatesFromOtherPlugins']=function(){const _0x268465=_0x3539a7;VisuMZ['EquipSetBonuses'][_0x268465(0xc8)]['call'](this),this[_0x268465(0x119)]();},Game_BattlerBase[_0x3539a7(0x1e5)][_0x3539a7(0x119)]=function(){},VisuMZ[_0x3539a7(0xdb)][_0x3539a7(0x172)]=Game_Actor[_0x3539a7(0x1e5)][_0x3539a7(0x155)],Game_Actor[_0x3539a7(0x1e5)][_0x3539a7(0x155)]=function(_0x4e58b2){const _0x1dd773=_0x3539a7;VisuMZ[_0x1dd773(0xdb)][_0x1dd773(0x172)][_0x1dd773(0xfe)](this,_0x4e58b2),this[_0x1dd773(0x166)]();},VisuMZ[_0x3539a7(0xdb)]['Game_Actor_releaseUnequippableItems']=Game_Actor[_0x3539a7(0x1e5)][_0x3539a7(0x17e)],Game_Actor[_0x3539a7(0x1e5)][_0x3539a7(0x17e)]=function(_0x511acc){const _0xee308=_0x3539a7;VisuMZ['EquipSetBonuses'][_0xee308(0x127)][_0xee308(0xfe)](this,_0x511acc),this[_0xee308(0x166)]();},Game_Actor[_0x3539a7(0x1e5)][_0x3539a7(0x125)]=function(_0x382f03){const _0x48d5e3=_0x3539a7;(this[_0x48d5e3(0x1f4)]===undefined||this[_0x48d5e3(0x1da)]===undefined||this[_0x48d5e3(0x167)]===undefined)&&this['refreshEquipSetBonuses']();},Game_Actor['prototype'][_0x3539a7(0x166)]=function(){const _0x38bd50=_0x3539a7;this[_0x38bd50(0xe7)](),this[_0x38bd50(0xc7)](),this[_0x38bd50(0x1e7)]();if(this['_tempActor'])return;SceneManager[_0x38bd50(0x18b)]();},Game_Actor[_0x3539a7(0x1e5)]['clearEquipSetBonusCache']=function(){const _0x24db8e=_0x3539a7;this['_equipSetBonusSets']=[],this[_0x24db8e(0x1da)]={},this[_0x24db8e(0x167)]={};},Game_Actor[_0x3539a7(0x1e5)]['applyEquipSetBonuses']=function(){const _0x349fe7=_0x3539a7;for(const _0x3a9838 of this[_0x349fe7(0xcf)]()){if(!_0x3a9838)continue;const _0x82f36d=DataManager[_0x349fe7(0xd6)](_0x3a9838);for(const _0x48b47c of _0x82f36d){!this[_0x349fe7(0x1f4)][_0x349fe7(0x1ae)](_0x48b47c)&&this[_0x349fe7(0x1f4)][_0x349fe7(0x16d)](_0x48b47c),this[_0x349fe7(0x1da)][_0x48b47c]=this[_0x349fe7(0x1da)][_0x48b47c]||0x0,this[_0x349fe7(0x1da)][_0x48b47c]++;}}},Game_Actor[_0x3539a7(0x1e5)][_0x3539a7(0xd6)]=function(){const _0x663bf7=_0x3539a7;return this[_0x663bf7(0x125)](),this[_0x663bf7(0x1f4)];},Game_Actor[_0x3539a7(0x1e5)][_0x3539a7(0x1a2)]=function(_0x44c228){const _0x1d4c73=_0x3539a7;this[_0x1d4c73(0x125)](),_0x44c228=_0x44c228[_0x1d4c73(0x1d9)]()[_0x1d4c73(0x175)]();const _0x5c28fe=this[_0x1d4c73(0x1da)][_0x44c228]||0x0,_0x58d018=this[_0x1d4c73(0x1cf)](_0x44c228);return(_0x5c28fe+_0x58d018)[_0x1d4c73(0x1ee)](0x0,0x14);},Game_Actor['prototype'][_0x3539a7(0xdf)]=function(){const _0x1a48f7=_0x3539a7;let _0x1b8819=this['getEquipSets']()['clone']();return _0x1b8819[_0x1a48f7(0x14c)]((_0x110260,_0x588905)=>{const _0x4a867c=_0x1a48f7,_0x51fead=this[_0x4a867c(0x1a2)](_0x110260),_0x3aa185=this[_0x4a867c(0x1a2)](_0x588905);if(_0x51fead!==_0x3aa185)return _0x3aa185-_0x51fead;return 0x0;}),_0x1b8819;},Game_Actor[_0x3539a7(0x1e5)][_0x3539a7(0x1cf)]=function(_0x54dda1){const _0x318ec2=_0x3539a7;return this['_equipSetWildcards']===undefined&&(this[_0x318ec2(0x167)]={},this['applyEquipSetWildcards']()),(this['_equipSetWildcards'][_0x54dda1]||0x0)+(this[_0x318ec2(0x167)][_0x318ec2(0xc2)]||0x0);},Game_Actor[_0x3539a7(0x1e5)][_0x3539a7(0x1e7)]=function(){const _0x34b58b=_0x3539a7;for(const _0x3b1005 of this[_0x34b58b(0xcf)]()){if(!_0x3b1005)continue;const _0xa16fc=DataManager[_0x34b58b(0x1cf)](_0x3b1005);for(const _0x3f3bff of _0xa16fc){this[_0x34b58b(0x167)][_0x3f3bff]=this[_0x34b58b(0x167)][_0x3f3bff]||0x0,this[_0x34b58b(0x167)][_0x3f3bff]++;}}},Game_Actor[_0x3539a7(0x1e5)][_0x3539a7(0x1d0)]=function(_0x17dd17,_0x544b03){const _0x4ec240=_0x3539a7;this[_0x4ec240(0x125)]();let _0x3d24d5=0x0;for(const _0x29f280 of this[_0x4ec240(0xd6)]()){const _0x4e1b34=DataManager[_0x4ec240(0x102)](_0x29f280);if(!_0x4e1b34)continue;const _0x181dde=this['getEquipSetPieces'](_0x29f280);for(let _0x2cac1a=0x1;_0x2cac1a<=_0x181dde;_0x2cac1a++){const _0x485994=_0x4ec240(0x17c)['format'](_0x2cac1a);if(_0x4e1b34[_0x485994]&&_0x4e1b34[_0x485994][_0x17dd17]){const _0x4455ac=_0x4ec240(0x196)[_0x4ec240(0x17a)](_0x544b03);_0x3d24d5+=_0x4e1b34[_0x485994][_0x17dd17][_0x4455ac]||0x0;}}}return _0x3d24d5;},Game_Actor[_0x3539a7(0x1e5)]['equipSetBonusParamRate']=function(_0x4bc847,_0x2885bf){const _0x20bd25=_0x3539a7;this[_0x20bd25(0x125)]();let _0x35d54c=0x1;for(const _0x32368e of this[_0x20bd25(0xd6)]()){const _0x530bb9=DataManager['getEquipSetData'](_0x32368e);if(!_0x530bb9)continue;const _0x3ca033=this[_0x20bd25(0x1a2)](_0x32368e);for(let _0x9a18b4=0x1;_0x9a18b4<=_0x3ca033;_0x9a18b4++){const _0x2f59f6=_0x20bd25(0x17c)[_0x20bd25(0x17a)](_0x9a18b4);if(_0x530bb9[_0x2f59f6]&&_0x530bb9[_0x2f59f6][_0x4bc847]){const _0x2d8476=_0x20bd25(0xf3)[_0x20bd25(0x17a)](_0x2885bf);_0x35d54c*=Math[_0x20bd25(0x1a7)](_0x530bb9[_0x2f59f6][_0x4bc847][_0x2d8476]||0x1);}}}return _0x35d54c;},Game_Actor[_0x3539a7(0x1e5)][_0x3539a7(0x119)]=function(){const _0x2788b3=_0x3539a7;this[_0x2788b3(0x125)]();const _0x49abf5=this[_0x2788b3(0x1d3)]['passiveStates'];for(const _0x5d3524 of this['getEquipSets']()){const _0x311058=DataManager[_0x2788b3(0x102)](_0x5d3524);if(!_0x311058)continue;const _0x471cde=this['getEquipSetPieces'](_0x5d3524);for(let _0xc98479=0x1;_0xc98479<=_0x471cde;_0xc98479++){const _0x2d9b36=_0x2788b3(0x17c)[_0x2788b3(0x17a)](_0xc98479);if(_0x311058[_0x2d9b36]&&_0x311058[_0x2d9b36]['PassiveStates'])for(const _0x309d44 of _0x311058[_0x2d9b36][_0x2788b3(0x1ca)]){_0x49abf5[_0x2788b3(0x16d)](_0x309d44);}}}},VisuMZ[_0x3539a7(0xdb)][_0x3539a7(0xba)]=Game_Actor[_0x3539a7(0x1e5)][_0x3539a7(0x19b)],Game_Actor[_0x3539a7(0x1e5)][_0x3539a7(0x19b)]=function(_0x473a26,_0x3cb9ea){const _0x4a41fa=_0x3539a7;_0x473a26!==''?(this['_priorityFaceName']=_0x473a26,this[_0x4a41fa(0x131)]=_0x3cb9ea):(this[_0x4a41fa(0x133)]=undefined,this[_0x4a41fa(0x131)]=undefined);},VisuMZ[_0x3539a7(0xdb)][_0x3539a7(0x1b2)]=Game_Actor['prototype'][_0x3539a7(0x185)],Game_Actor[_0x3539a7(0x1e5)]['faceName']=function(){const _0x1aad22=_0x3539a7;if(this[_0x1aad22(0x133)]!==undefined)return this[_0x1aad22(0x133)];const _0x431222=this[_0x1aad22(0xdf)]();for(const _0x3f342e of _0x431222){const _0xa0aedf=this[_0x1aad22(0x1a2)](_0x3f342e),_0x5c0921=ImageManager['getActorEquipSetFaceName'](this,_0x3f342e,_0xa0aedf);if(_0x5c0921)return _0x5c0921;}return VisuMZ[_0x1aad22(0xdb)][_0x1aad22(0x1b2)][_0x1aad22(0xfe)](this);},VisuMZ['EquipSetBonuses'][_0x3539a7(0xe3)]=Game_Actor['prototype'][_0x3539a7(0x12a)],Game_Actor[_0x3539a7(0x1e5)][_0x3539a7(0x12a)]=function(){const _0x49d595=_0x3539a7;if(this['_priorityFaceIndex']!==undefined)return this[_0x49d595(0x131)];const _0x507942=this[_0x49d595(0xdf)]();for(const _0x1aa013 of _0x507942){const _0x42ad66=this['getEquipSetPieces'](_0x1aa013),_0x215988=ImageManager[_0x49d595(0xcd)](this,_0x1aa013,_0x42ad66);if(_0x215988!==undefined)return _0x215988;}return VisuMZ['EquipSetBonuses']['Game_Actor_faceIndex']['call'](this);},VisuMZ[_0x3539a7(0xdb)][_0x3539a7(0x157)]=Game_Actor[_0x3539a7(0x1e5)][_0x3539a7(0x1bb)],Game_Actor['prototype']['setCharacterImage']=function(_0x388d44,_0x11c49e){const _0x1c4e82=_0x3539a7;_0x388d44!==''?(this[_0x1c4e82(0xdd)]=_0x388d44,this[_0x1c4e82(0x1a8)]=_0x11c49e):(this['_priorityCharacterName']=undefined,this['_priorityCharacterIndex']=undefined);},VisuMZ[_0x3539a7(0xdb)]['Game_Actor_characterName']=Game_Actor['prototype'][_0x3539a7(0xf7)],Game_Actor[_0x3539a7(0x1e5)]['characterName']=function(){const _0x137ac9=_0x3539a7;if(this['_priorityCharacterName']!==undefined)return this['_priorityCharacterName'];const _0x5e9e23=this['getEquipSetsSortedByMostPieces']();for(const _0x4a72f7 of _0x5e9e23){const _0xcdee3d=this['getEquipSetPieces'](_0x4a72f7),_0x4a5529=ImageManager[_0x137ac9(0x19a)](this,_0x4a72f7,_0xcdee3d);if(_0x4a5529)return _0x4a5529;}return VisuMZ[_0x137ac9(0xdb)][_0x137ac9(0xf2)][_0x137ac9(0xfe)](this);},VisuMZ[_0x3539a7(0xdb)][_0x3539a7(0xe4)]=Game_Actor['prototype'][_0x3539a7(0x1a4)],Game_Actor[_0x3539a7(0x1e5)][_0x3539a7(0x1a4)]=function(){const _0x2deb2d=_0x3539a7;if(this[_0x2deb2d(0x1a8)]!==undefined)return this[_0x2deb2d(0x1a8)];const _0x3070b1=this[_0x2deb2d(0xdf)]();for(const _0x99e684 of _0x3070b1){const _0x3c0095=this[_0x2deb2d(0x1a2)](_0x99e684),_0x2f02b1=ImageManager['getActorEquipSetCharacterIndex'](this,_0x99e684,_0x3c0095);if(_0x2f02b1!==undefined)return _0x2f02b1;}return VisuMZ['EquipSetBonuses']['Game_Actor_characterIndex'][_0x2deb2d(0xfe)](this);},VisuMZ[_0x3539a7(0xdb)][_0x3539a7(0xff)]=Game_Actor[_0x3539a7(0x1e5)]['setBattlerImage'],Game_Actor[_0x3539a7(0x1e5)][_0x3539a7(0x128)]=function(_0x391b0a){const _0x71d428=_0x3539a7;_0x391b0a!==''?this['_priorityBattlerName']=_0x391b0a:this[_0x71d428(0x14d)]=undefined;},VisuMZ['EquipSetBonuses'][_0x3539a7(0x14e)]=Game_Actor[_0x3539a7(0x1e5)][_0x3539a7(0xd3)],Game_Actor['prototype'][_0x3539a7(0xd3)]=function(){const _0x5cf1b4=_0x3539a7;if(this[_0x5cf1b4(0x14d)]!==undefined)return this[_0x5cf1b4(0x14d)];const _0x470a50=this['getEquipSetsSortedByMostPieces']();for(const _0x31dd0e of _0x470a50){const _0x155f2f=this['getEquipSetPieces'](_0x31dd0e),_0x453532=ImageManager[_0x5cf1b4(0xd7)](this,_0x31dd0e,_0x155f2f);if(_0x453532)return _0x453532;}return VisuMZ['EquipSetBonuses'][_0x5cf1b4(0x14e)][_0x5cf1b4(0xfe)](this);;},VisuMZ['EquipSetBonuses']['Game_Actor_setMenuImage']=Game_Actor[_0x3539a7(0x1e5)][_0x3539a7(0x1e9)],Game_Actor[_0x3539a7(0x1e5)][_0x3539a7(0x1e9)]=function(_0x44c2c0){const _0x261a76=_0x3539a7;_0x44c2c0!==''?this[_0x261a76(0x188)]=_0x44c2c0:this[_0x261a76(0x188)]=undefined;},VisuMZ[_0x3539a7(0xdb)][_0x3539a7(0xe5)]=Game_Actor[_0x3539a7(0x1e5)][_0x3539a7(0x16f)],Game_Actor[_0x3539a7(0x1e5)][_0x3539a7(0x16f)]=function(){const _0x3456e8=_0x3539a7;if(this[_0x3456e8(0x188)]!==undefined)return this[_0x3456e8(0x188)];const _0x4aabf7=this[_0x3456e8(0xdf)]();for(const _0x4fda9c of _0x4aabf7){const _0x3c1843=this['getEquipSetPieces'](_0x4fda9c),_0x431722=ImageManager['getActorEquipSetMenuPortrait'](this,_0x4fda9c,_0x3c1843);if(_0x431722)return _0x431722;}return VisuMZ[_0x3456e8(0xdb)]['Game_Actor_getMenuImage'][_0x3456e8(0xfe)](this);;},VisuMZ['EquipSetBonuses'][_0x3539a7(0x104)]=Game_Actor[_0x3539a7(0x1e5)][_0x3539a7(0x11d)],Game_Actor[_0x3539a7(0x1e5)][_0x3539a7(0x11d)]=function(_0x50e319){const _0x2580d0=_0x3539a7;_0x50e319!==''?this[_0x2580d0(0x1ef)]=_0x50e319:this[_0x2580d0(0x1ef)]=undefined;if(SceneManager[_0x2580d0(0x1b1)]()&&$gameParty[_0x2580d0(0x159)]()['includes'](this)){const _0x22aea3=SceneManager[_0x2580d0(0x15f)][_0x2580d0(0xf9)];if(_0x22aea3)_0x22aea3[_0x2580d0(0x163)](this);}},VisuMZ[_0x3539a7(0xdb)][_0x3539a7(0x126)]=Game_Actor[_0x3539a7(0x1e5)]['getBattlePortraitFilename'],Game_Actor[_0x3539a7(0x1e5)][_0x3539a7(0x173)]=function(){const _0x5a2d37=_0x3539a7;if(this[_0x5a2d37(0x1ef)]!==undefined)return this[_0x5a2d37(0x1ef)];const _0x342515=this[_0x5a2d37(0xdf)]();for(const _0x4c5031 of _0x342515){const _0x30fe9e=this[_0x5a2d37(0x1a2)](_0x4c5031),_0x40b171=ImageManager['getActorEquipSetBattlePortrait'](this,_0x4c5031,_0x30fe9e);if(_0x40b171)return _0x40b171;}return VisuMZ[_0x5a2d37(0xdb)]['Game_Actor_getBattlePortraitFilename'][_0x5a2d37(0xfe)](this);;},VisuMZ[_0x3539a7(0xdb)]['Game_Actor_changeEquip']=Game_Actor[_0x3539a7(0x1e5)]['changeEquip'],Game_Actor[_0x3539a7(0x1e5)][_0x3539a7(0xed)]=function(_0x25acb6,_0x24dd70){const _0x44ce71=_0x3539a7;VisuMZ[_0x44ce71(0xdb)]['Game_Actor_changeEquip'][_0x44ce71(0xfe)](this,_0x25acb6,_0x24dd70),$gamePlayer[_0x44ce71(0x114)]();},VisuMZ[_0x3539a7(0xdb)][_0x3539a7(0x162)]=Scene_Base[_0x3539a7(0x1e5)]['createWindowLayer'],Scene_Base[_0x3539a7(0x1e5)][_0x3539a7(0x1a0)]=function(){const _0x1bf6f2=_0x3539a7;VisuMZ[_0x1bf6f2(0xdb)]['Scene_Base_createWindowLayer'][_0x1bf6f2(0xfe)](this),this[_0x1bf6f2(0x17f)]();},Scene_Base[_0x3539a7(0x1e5)][_0x3539a7(0x17f)]=function(){const _0x4c83ec=_0x3539a7;if(!Window_EquipSetBonusTooltip[_0x4c83ec(0x16e)])return;this[_0x4c83ec(0x195)]=new Window_EquipSetBonusTooltip(),this[_0x4c83ec(0x170)](this['_equipSetBonusTooltipWindow']);},Scene_Base[_0x3539a7(0x1e5)][_0x3539a7(0x17d)]=function(){const _0x4e4643=_0x3539a7;this['_equipSetBonusTooltipWindow']&&this[_0x4e4643(0x195)][_0x4e4643(0x160)]();},Scene_Base['prototype']['showEquipSetBonusTooltipWindow']=function(){const _0x4d5cd7=_0x3539a7;this[_0x4d5cd7(0x195)]&&this[_0x4d5cd7(0x195)]['refresh']();},VisuMZ[_0x3539a7(0xdb)]['Scene_Shop_onBuyOk']=Scene_Shop[_0x3539a7(0x1e5)]['onBuyOk'],Scene_Shop['prototype']['onBuyOk']=function(){const _0x38da88=_0x3539a7;VisuMZ[_0x38da88(0xdb)]['Scene_Shop_onBuyOk'][_0x38da88(0xfe)](this),this['hideEquipSetBonusTooltipWindow']();},VisuMZ['EquipSetBonuses'][_0x3539a7(0x12b)]=Scene_Shop['prototype']['onSellOk'],Scene_Shop['prototype']['onSellOk']=function(){const _0x18dd8b=_0x3539a7;VisuMZ[_0x18dd8b(0xdb)]['Scene_Shop_onSellOk'][_0x18dd8b(0xfe)](this),this[_0x18dd8b(0x17d)]();},VisuMZ[_0x3539a7(0xdb)][_0x3539a7(0xce)]=Scene_Shop['prototype'][_0x3539a7(0x1c7)],Scene_Shop['prototype'][_0x3539a7(0x1c7)]=function(){const _0x431e39=_0x3539a7;VisuMZ['EquipSetBonuses']['Scene_Shop_onNumberOk'][_0x431e39(0xfe)](this),this[_0x431e39(0xb9)]();},VisuMZ[_0x3539a7(0xdb)]['Scene_Shop_onNumberCancel']=Scene_Shop[_0x3539a7(0x1e5)][_0x3539a7(0x1c8)],Scene_Shop[_0x3539a7(0x1e5)][_0x3539a7(0x1c8)]=function(){const _0x510e7d=_0x3539a7;VisuMZ[_0x510e7d(0xdb)][_0x510e7d(0x14a)][_0x510e7d(0xfe)](this),this['showEquipSetBonusTooltipWindow']();},Window_Selectable[_0x3539a7(0x105)]=[_0x3539a7(0x109),'Window_ItemList',_0x3539a7(0x137),_0x3539a7(0xd0),'Window_ShopBuy',_0x3539a7(0x168)],VisuMZ[_0x3539a7(0xdb)][_0x3539a7(0xee)]=Window_Selectable[_0x3539a7(0x1e5)][_0x3539a7(0x118)],Window_Selectable[_0x3539a7(0x1e5)][_0x3539a7(0x118)]=function(_0x53a6f9){const _0xf90a3a=_0x3539a7;VisuMZ[_0xf90a3a(0xdb)][_0xf90a3a(0xee)][_0xf90a3a(0xfe)](this,_0x53a6f9),this[_0xf90a3a(0x1eb)]();},Window_Selectable[_0x3539a7(0x1e5)][_0x3539a7(0x1eb)]=function(){const _0x1dcffc=_0x3539a7;if(!this[_0x1dcffc(0x130)]())return;const _0x142682=SceneManager[_0x1dcffc(0x15f)];if(!_0x142682)return;this['_equipSetBonusTooltipWindow']=_0x142682[_0x1dcffc(0x195)]||null,this[_0x1dcffc(0x165)]();},Window_Selectable[_0x3539a7(0x1e5)]['hasEquipSetBonusTooltipWindow']=function(){const _0x530823=_0x3539a7;if(!Window_EquipSetBonusTooltip['SHOW_TOOLTIP'])return![];return Window_Selectable[_0x530823(0x105)]['includes'](this[_0x530823(0x123)][_0x530823(0x1ea)]);},VisuMZ[_0x3539a7(0xdb)][_0x3539a7(0x144)]=Window_Selectable['prototype'][_0x3539a7(0x165)],Window_Selectable[_0x3539a7(0x1e5)]['callUpdateHelp']=function(){const _0x440eee=_0x3539a7;VisuMZ['EquipSetBonuses'][_0x440eee(0x144)]['call'](this),this['updateEquipSetBonusTooltip']();},Window_Selectable[_0x3539a7(0x1e5)][_0x3539a7(0xbb)]=function(){const _0x42fe03=_0x3539a7,_0x36f2f4=this[_0x42fe03(0x195)];if(_0x36f2f4&&this[_0x42fe03(0x13f)]){_0x36f2f4[_0x42fe03(0x11b)](this);const _0x9cae17=_0x36f2f4[_0x42fe03(0x142)]();_0x9cae17===this&&_0x36f2f4['setItem'](this[_0x42fe03(0x13f)]());}};function _0x19ea(_0x11d751,_0xdfe3d8){const _0x3a51ef=_0x3a51();return _0x19ea=function(_0x19ea3d,_0x184257){_0x19ea3d=_0x19ea3d-0xb6;let _0x2a35a0=_0x3a51ef[_0x19ea3d];return _0x2a35a0;},_0x19ea(_0x11d751,_0xdfe3d8);}function Window_EquipSetBonusTooltip(){this['initialize'](...arguments);}Window_EquipSetBonusTooltip[_0x3539a7(0x1e5)]=Object[_0x3539a7(0x1e6)](Window_Base[_0x3539a7(0x1e5)]),Window_EquipSetBonusTooltip[_0x3539a7(0x1e5)][_0x3539a7(0x123)]=Window_EquipSetBonusTooltip,Window_EquipSetBonusTooltip[_0x3539a7(0x16e)]=VisuMZ[_0x3539a7(0xdb)]['Settings'][_0x3539a7(0x18a)][_0x3539a7(0x171)],Window_EquipSetBonusTooltip[_0x3539a7(0x1f1)]=VisuMZ[_0x3539a7(0xdb)]['Settings']['Tooltip'][_0x3539a7(0x1ab)],Window_EquipSetBonusTooltip['WINDOW_SKIN_FILENAME']=VisuMZ[_0x3539a7(0xdb)][_0x3539a7(0x174)][_0x3539a7(0x18a)][_0x3539a7(0xe2)],Window_EquipSetBonusTooltip[_0x3539a7(0x1c4)]=VisuMZ[_0x3539a7(0xdb)][_0x3539a7(0x174)]['Tooltip'][_0x3539a7(0xca)],Window_EquipSetBonusTooltip[_0x3539a7(0x1ec)]=VisuMZ['EquipSetBonuses'][_0x3539a7(0x174)][_0x3539a7(0x18a)][_0x3539a7(0x193)],Window_EquipSetBonusTooltip[_0x3539a7(0x14f)]=VisuMZ['EquipSetBonuses']['Settings'][_0x3539a7(0x18a)][_0x3539a7(0x1d2)],Window_EquipSetBonusTooltip[_0x3539a7(0x1e5)][_0x3539a7(0x118)]=function(){const _0x324379=_0x3539a7,_0x42a3fe=new Rectangle(0x0,0x0,Graphics[_0x324379(0x10a)],Graphics[_0x324379(0x1c6)]);Window_Base[_0x324379(0x1e5)][_0x324379(0x118)][_0x324379(0xfe)](this,_0x42a3fe),this['scale']['x']=this[_0x324379(0x1b3)]['y']=Window_EquipSetBonusTooltip['WINDOW_SCALE'],this['hide'](),this[_0x324379(0xc1)]=null,this[_0x324379(0x1c2)]=null;},Window_EquipSetBonusTooltip['prototype'][_0x3539a7(0xcc)]=function(){const _0x288ea8=_0x3539a7;this[_0x288ea8(0xda)]=ImageManager[_0x288ea8(0x1cc)](Window_EquipSetBonusTooltip[_0x288ea8(0x18c)]);},Window_EquipSetBonusTooltip[_0x3539a7(0x1e5)][_0x3539a7(0x158)]=function(){const _0x4a4bc3=_0x3539a7;this[_0x4a4bc3(0x1e1)]=Window_EquipSetBonusTooltip[_0x4a4bc3(0x1c4)];},Window_EquipSetBonusTooltip[_0x3539a7(0x1e5)][_0x3539a7(0x148)]=function(_0x26908d){const _0x21e8e6=_0x3539a7;if(this['_item']===_0x26908d)return;this[_0x21e8e6(0xc1)]=_0x26908d,this[_0x21e8e6(0xc1)]?this[_0x21e8e6(0x12f)]():this['hide']();},Window_EquipSetBonusTooltip[_0x3539a7(0x1e5)][_0x3539a7(0x142)]=function(){const _0x2af29a=_0x3539a7;return this[_0x2af29a(0x1c2)]||null;},Window_EquipSetBonusTooltip[_0x3539a7(0x1e5)]['setActiveWindow']=function(_0x234689){const _0x15457f=_0x3539a7;if(!_0x234689[_0x15457f(0x1aa)])return;this[_0x15457f(0x1c2)]=_0x234689,this[_0x15457f(0x1c5)]();},Window_EquipSetBonusTooltip[_0x3539a7(0x1e5)][_0x3539a7(0x114)]=function(){const _0x46919d=_0x3539a7;this[_0x46919d(0x100)]['clear'](),this['setupText']();if(this[_0x46919d(0x101)]['length']>0x0){this[_0x46919d(0x10b)]();const _0x4dda65=this[_0x46919d(0x154)]();this['resetFontSettings'](),DataManager[_0x46919d(0x1cf)](this[_0x46919d(0xc1)])[_0x46919d(0x191)]>0x0?this[_0x46919d(0x1e4)](!![]):this[_0x46919d(0x1e4)](this[_0x46919d(0x156)][_0x46919d(0x11a)]()),this[_0x46919d(0x1c9)](this[_0x46919d(0x101)],_0x4dda65['x'],_0x4dda65['y'],_0x4dda65[_0x46919d(0x10a)]),this['show']();}else this[_0x46919d(0x160)]();},Window_EquipSetBonusTooltip[_0x3539a7(0x1e5)]['processNewLine']=function(_0x37e613){const _0x45bda9=_0x3539a7;Window_Base[_0x45bda9(0x1e5)][_0x45bda9(0xdc)][_0x45bda9(0xfe)](this,_0x37e613),_0x37e613[_0x45bda9(0x1b0)]&&this['changePaintOpacity'](this[_0x45bda9(0x156)][_0x45bda9(0x11a)]());},Window_EquipSetBonusTooltip[_0x3539a7(0x1e5)][_0x3539a7(0x151)]=function(_0x47a477){return _0x47a477;},Window_EquipSetBonusTooltip[_0x3539a7(0x1e5)][_0x3539a7(0x116)]=function(){return![];},Window_EquipSetBonusTooltip[_0x3539a7(0x1e5)]['setupText']=function(){const _0x5c3093=_0x3539a7;this[_0x5c3093(0x101)]='',this[_0x5c3093(0x156)]=[];if(!this['_item'])return;for(const _0x6cc972 of DataManager[_0x5c3093(0xd6)](this[_0x5c3093(0xc1)])){const _0x3fdc35=DataManager[_0x5c3093(0x102)](_0x6cc972);if(!_0x3fdc35)continue;this[_0x5c3093(0x12d)](_0x3fdc35);}DataManager[_0x5c3093(0x1cf)](this[_0x5c3093(0xc1)])['length']>0x0&&this[_0x5c3093(0x1ba)](),this[_0x5c3093(0x101)]=this['_text'][_0x5c3093(0x175)]();},Window_EquipSetBonusTooltip[_0x3539a7(0x1e5)][_0x3539a7(0x12d)]=function(_0x144289){const _0x353f14=_0x3539a7;if(!_0x144289)return;const _0x3d067e=_0x144289['SetName'],_0x2b0bc9=_0x144289[_0x353f14(0x1f0)]?'\x5cI[%1]'[_0x353f14(0x17a)](_0x144289[_0x353f14(0x1f0)]):'';this[_0x353f14(0x101)]+=TextManager[_0x353f14(0xfb)][_0x353f14(0x17a)](_0x3d067e,_0x2b0bc9)+'\x0a',this['_lineOpacity']['push'](!![]);for(let _0x38454d=0x1;_0x38454d<=0x14;_0x38454d++){const _0x4cfe94=_0x144289[_0x353f14(0x17c)[_0x353f14(0x17a)](_0x38454d)];this[_0x353f14(0x1bc)](_0x144289,_0x4cfe94,_0x38454d);}},Window_EquipSetBonusTooltip[_0x3539a7(0x1e5)][_0x3539a7(0x1bc)]=function(_0x601fd0,_0x2a5228,_0x227751){const _0x5efe45=_0x3539a7;if(!_0x2a5228)return;if(_0x2a5228['Text']===undefined)return;if(!_0x2a5228[_0x5efe45(0x199)])return;let _0x549699='';_0x2a5228[_0x5efe45(0x110)][_0x5efe45(0x11e)]()[_0x5efe45(0x175)]()!=='auto'?_0x549699=_0x2a5228['Text']:_0x549699=this['createAutoPieceText'](_0x2a5228),_0x549699[_0x5efe45(0x175)]()!==''&&(this[_0x5efe45(0x101)]+=TextManager[_0x5efe45(0x1f3)][_0x5efe45(0x17a)](_0x227751,_0x549699)+'\x0a',this[_0x5efe45(0x192)](_0x601fd0,_0x227751));},Window_EquipSetBonusTooltip['prototype'][_0x3539a7(0x164)]=function(_0xcaa375){const _0x442daf=_0x3539a7;let _0x46bfa7='';const _0x11702e=[];if(_0xcaa375[_0x442daf(0x1ca)])for(const _0x3f15a0 of _0xcaa375['PassiveStates']){const _0x171c17=$dataStates[_0x3f15a0];if(!_0x171c17)continue;if(_0x171c17['iconIndex']<=0x0)continue;if(_0x171c17[_0x442daf(0x1ea)][_0x442daf(0x175)]()==='')continue;if(_0x171c17[_0x442daf(0x1ea)][_0x442daf(0x15b)](/-----/i))continue;const _0x46856e=_0x442daf(0x19e)[_0x442daf(0x17a)](_0x171c17['iconIndex']),_0x14796d=TextManager['equipSetState'][_0x442daf(0x17a)](_0x171c17[_0x442daf(0x1ea)],_0x46856e);_0x11702e['push'](_0x14796d);}if(_0xcaa375[_0x442daf(0xc3)]){const _0x3e4ddf=[_0x442daf(0x1dc),_0x442daf(0xe9),'ATK',_0x442daf(0x19c),_0x442daf(0x17b),'MDF',_0x442daf(0x1cb),_0x442daf(0xf1)],_0x2f4977=this[_0x442daf(0x10e)](_0xcaa375,_0x442daf(0xc3),_0x3e4ddf);while(_0x2f4977['length']>0x0)_0x11702e[_0x442daf(0x16d)](_0x2f4977['shift']());}if(_0xcaa375[_0x442daf(0x1de)]){const _0x2cbf0b=[_0x442daf(0x1ac),_0x442daf(0x1ce),'CRI',_0x442daf(0x176),_0x442daf(0x190),'MRF','CNT','HRG',_0x442daf(0x187),'TRG'],_0x45e698=this[_0x442daf(0x10e)](_0xcaa375,_0x442daf(0x1de),_0x2cbf0b);while(_0x45e698['length']>0x0)_0x11702e[_0x442daf(0x16d)](_0x45e698[_0x442daf(0x11a)]());}if(_0xcaa375[_0x442daf(0xea)]){const _0x3e24c8=[_0x442daf(0x1a5),_0x442daf(0x1e3),_0x442daf(0x1dd),_0x442daf(0x1bf),_0x442daf(0x138),_0x442daf(0x140),_0x442daf(0x19f),_0x442daf(0x15a),_0x442daf(0xc6),_0x442daf(0xc4)],_0x2146a2=this[_0x442daf(0x10e)](_0xcaa375,_0x442daf(0xea),_0x3e24c8);while(_0x2146a2[_0x442daf(0x191)]>0x0)_0x11702e['push'](_0x2146a2['shift']());}for(const _0x4ebbab of _0x11702e){if(_0x4ebbab[_0x442daf(0x191)]<=0x0)continue;_0x46bfa7[_0x442daf(0x191)]<=0x0?_0x46bfa7+=_0x4ebbab:_0x46bfa7=TextManager['equipSetPieceSeparator'][_0x442daf(0x17a)](_0x46bfa7,_0x4ebbab);}return _0x46bfa7[_0x442daf(0x175)]();},Window_EquipSetBonusTooltip['prototype'][_0x3539a7(0x10e)]=function(_0x55ddb5,_0x369cf0,_0x590b63){const _0x20638f=_0x3539a7,_0x4976d2=[],_0xb9c590=_0x590b63[_0x20638f(0x191)];for(let _0xb6b066=0x0;_0xb6b066<_0xb9c590;_0xb6b066++){const _0xf1b455=TextManager['paramName'](_0x590b63[_0xb6b066]),_0x3bc852=Number(_0x55ddb5[_0x369cf0][_0x20638f(0xf3)[_0x20638f(0x17a)](_0xb6b066)]||0x1),_0xaf2949=Number(_0x55ddb5[_0x369cf0][_0x20638f(0x196)[_0x20638f(0x17a)](_0xb6b066)]||0x0);if(_0x3bc852!==0x1){const _0x22b31e=TextManager[_0x20638f(0x1a1)],_0x3b8988=Math[_0x20638f(0x132)](_0x3bc852*0x64)+'%',_0xde015f=_0x22b31e[_0x20638f(0x17a)](_0xf1b455,_0x3b8988);_0x4976d2[_0x20638f(0x16d)](_0xde015f);}if(_0xaf2949!==0x0){const _0x5450ef=_0xaf2949>0x0?TextManager[_0x20638f(0x122)]:TextManager[_0x20638f(0x136)];let _0x318dfc=Math[_0x20638f(0x1a7)](_0xaf2949);_0x369cf0!=='Param'&&(_0x318dfc=Math[_0x20638f(0x132)](_0x318dfc*0x64)+'%');const _0x2e4cff=_0x5450ef[_0x20638f(0x17a)](_0xf1b455,_0x318dfc);_0x4976d2[_0x20638f(0x16d)](_0x2e4cff);}}return _0x4976d2;},Window_EquipSetBonusTooltip[_0x3539a7(0x1e5)][_0x3539a7(0x192)]=function(_0x5bddbf,_0x54a6a8){const _0x54bd4b=_0x3539a7,_0x1dc5b2=SceneManager[_0x54bd4b(0x15f)];if(['Scene_Equip'][_0x54bd4b(0x1ae)](_0x1dc5b2[_0x54bd4b(0x123)]['name'])){const _0x1263dc=_0x1dc5b2['actor'](),_0x20152c=_0x5bddbf['SetName'][_0x54bd4b(0x1d9)]()['trim'](),_0x189248=_0x1263dc['getEquipSetPieces'](_0x20152c);this[_0x54bd4b(0x156)][_0x54bd4b(0x16d)](_0x189248>=_0x54a6a8);}else this['_lineOpacity'][_0x54bd4b(0x16d)](!![]);},Window_EquipSetBonusTooltip['prototype']['addWildcardText']=function(){const _0x42786b=_0x3539a7,_0x59d4b3=DataManager[_0x42786b(0x1cf)](this[_0x42786b(0xc1)]),_0x3747fd=TextManager[_0x42786b(0x1f2)],_0x37b20c=TextManager['equipSetPieceSeparator'];let _0x257dba='';if(_0x59d4b3['includes'](_0x42786b(0xc2))){const _0x1ecb14=TextManager[_0x42786b(0x14b)];this['_text']+=_0x3747fd['format'](_0x1ecb14);}else{for(const _0x21637d of _0x59d4b3){const _0x3c17ba=DataManager[_0x42786b(0x102)](_0x21637d);if(!_0x3c17ba)continue;const _0x3cb701=_0x3c17ba[_0x42786b(0x112)]||'';if(_0x3cb701[_0x42786b(0x191)]<=0x0)continue;_0x257dba[_0x42786b(0x191)]<=0x0?_0x257dba+=_0x3cb701:_0x257dba=_0x37b20c[_0x42786b(0x17a)](_0x257dba,_0x3cb701);}this['_text']+=_0x3747fd['format'](_0x257dba);}},Window_EquipSetBonusTooltip[_0x3539a7(0x1e5)][_0x3539a7(0x10b)]=function(){const _0x4c3a7d=_0x3539a7,_0x2d1ece=this['textSizeEx'](this['_text']);this[_0x4c3a7d(0x10a)]=_0x2d1ece['width']+(this[_0x4c3a7d(0x177)]()+this[_0x4c3a7d(0x180)])*0x2,this['height']=_0x2d1ece[_0x4c3a7d(0x1c6)]+this['padding']*0x2,this[_0x4c3a7d(0x10d)](),this[_0x4c3a7d(0x129)]();},Window_EquipSetBonusTooltip[_0x3539a7(0x1e5)]['update']=function(){const _0x834d72=_0x3539a7;Window_Base[_0x834d72(0x1e5)][_0x834d72(0xf0)][_0x834d72(0xfe)](this),this[_0x834d72(0x150)]&&(this[_0x834d72(0x150)]=![],this[_0x834d72(0x114)]()),this[_0x834d72(0x1c5)]();},Window_EquipSetBonusTooltip[_0x3539a7(0x1e5)]['requestRefresh']=function(){this['_requestRefresh']=!![];},Window_EquipSetBonusTooltip[_0x3539a7(0x1e5)][_0x3539a7(0x1c5)]=function(){const _0x518b6b=_0x3539a7;if(!this[_0x518b6b(0x146)])return;if(!this['_activeWindow'])return;if(!this[_0x518b6b(0x1c2)][_0x518b6b(0x1aa)])return;const _0x5d5446=SceneManager[_0x518b6b(0x15f)]['_windowLayer'],_0x480086=this['_activeWindow'][_0x518b6b(0x1bd)](this[_0x518b6b(0x1c2)][_0x518b6b(0x111)]()),_0x3386df=this[_0x518b6b(0x1c2)][_0x518b6b(0x1b3)]['x']||0x1,_0x10762b=Math[_0x518b6b(0x124)](this['_activeWindow'][_0x518b6b(0x180)]*_0x3386df),_0x179cb4=this[_0x518b6b(0x1c6)]*(Window_EquipSetBonusTooltip['WINDOW_SCALE']||0.01);this['x']=this[_0x518b6b(0x1c2)]['x']+_0x5d5446['x']+_0x480086['x']+_0x10762b+Window_EquipSetBonusTooltip[_0x518b6b(0x1ec)],this['y']=this[_0x518b6b(0x1c2)]['y']+_0x5d5446['y']+_0x480086['y']*_0x3386df+Math[_0x518b6b(0x124)](_0x480086[_0x518b6b(0x1c6)]/0x2*_0x3386df)+_0x10762b+Window_EquipSetBonusTooltip[_0x518b6b(0x14f)]*_0x3386df**0x4,this['y']+_0x179cb4>Graphics['height']&&(this['y']=this[_0x518b6b(0x1c2)]['y']+_0x5d5446['y']+(_0x480086['y']+_0x3386df)+Math[_0x518b6b(0x124)](_0x480086[_0x518b6b(0x1c6)]/0x2*_0x3386df)-_0x179cb4-Window_EquipSetBonusTooltip['MOUSE_OFFSET_Y']*_0x3386df**0x4),this[_0x518b6b(0x179)]();},Window_EquipSetBonusTooltip[_0x3539a7(0x1e5)][_0x3539a7(0x179)]=function(){const _0xadf2e1=_0x3539a7,_0x291419=this[_0xadf2e1(0x10a)]*(Window_EquipSetBonusTooltip[_0xadf2e1(0x1f1)]||0.01),_0x294cd7=this[_0xadf2e1(0x1c6)]*(Window_EquipSetBonusTooltip[_0xadf2e1(0x1f1)]||0.01);this['x']=Math['round'](this['x']['clamp'](0x0,Graphics[_0xadf2e1(0x10a)]-_0x291419)),this['y']=Math[_0xadf2e1(0x124)](this['y'][_0xadf2e1(0x1ee)](0x0,Graphics[_0xadf2e1(0x1c6)]-_0x294cd7));};