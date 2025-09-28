//=============================================================================
// VisuStella MZ - Weakness Popups
// VisuMZ_4_WeaknessPopups.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_WeaknessPopups = true;

var VisuMZ = VisuMZ || {};
VisuMZ.WeaknessPopups = VisuMZ.WeaknessPopups || {};
VisuMZ.WeaknessPopups.version = 1.09;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.09] [WeaknessPopups]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Weakness_Popups_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * When striking enemies with elemental attacks, it's difficult for the player
 * to know at first glance if he or she has hit a weakness or resistance,
 * especially if they are unfamiliar with how much damage the enemy should take
 * normally. This plugin creates popups that appear upon being hit at various
 * elemental rates, from 200% to 101% for Weaknesses, 99% to 1% for resistance,
 * 0% for immunity, and under that for absorption.
 * 
 * Critical hits also gain an extra popup effect to indicate landing a critical
 * hit in case they've missed the extra flash that comes with one by default.
 * This plugin helps relay information to the player in a more visible form.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Create popups that appear in battle whenever battlers take elemental
 *   damage that results in weaknesses, resistances, immunities, or absorption.
 * * Critical hits will also generate popups.
 * * Popups can use images or generate bitmap text on the spot.
 * * Move the popups through various means like scaling and acceleration.
 * * Elemental rates can generate different popups depending on the rate.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 * 
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
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
 * If you decide to use front view with the VisuStella MZ Battle Core, Weakness
 * Popups will show up for actors above the Battle Status Window. Normally,
 * they would not appear in front view without the Battle Core because normal
 * damage popups don't appear there either.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Popup Settings
 * ============================================================================
 *
 * Popups are created from a similar template. These are used for Critical Hits
 * and Elemental Rates. The Critical Hit popups will only appear once critical
 * hits are applied in battle. Elemental Rate popups will only appear once
 * certain damage thresholds are met through the element rate calculations.
 *
 * ---
 *
 * General
 * 
 *   Enabled:
 *   - Is this popup enabled?
 * 
 *   Stack Offset X:
 *   - Offsets the popup x position if stacked with a weakness.
 *   - Negative: left. Positive: right.
 *   - For Critical Hit Popups ONLY!
 * 
 *   Stack Offset Y:
 *   - Offsets the popup y position if stacked with a weakness.
 *   - Negative: up. Positive: down.
 *   - For Critical Hit Popups ONLY!
 *
 * ---
 *
 * Custom Image
 * 
 *   Filename:
 *   - Select an image from img/system/ to use as a custom image popup.
 *   - If you use this, ignore the Render settings.
 *
 * ---
 *
 * Render
 * 
 *   Text:
 *   - Type in the text you want displayed for the popup.
 * 
 *   Bitmap Width:
 *   Bitmap Height:
 *   - What is the maximum width/height of this popup?
 * 
 *   Font Name:
 *   - What font do you wish to use for this popup?
 * 
 *   Font Size:
 *   - What's the font size to use for the popup text?
 * 
 *   Bold?:
 *   Italic?
 *   - Do you wish to make the text bold/italic?
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Outline Size:
 *   - What size do you want to use for the outline?
 * 
 *   Outline Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Offset
 * 
 *   Offset: X:
 *   Offset: Y:
 *   - How much do you wish to offset the X/Y position by?
 * 
 *   Variance:
 *   - How much variance should be given to offset X?
 *
 * ---
 *
 * Scale
 * 
 *   Duration:
 *   - How many frames should it take the scaling to reach the target scale?
 * 
 *   Starting Scale: X:
 *   Starting Scale: Y:
 *   - What scale X/Y value should the popup start at?
 * 
 *   Target Scale: X:
 *   Target Scale: Y:
 *   - What scale X/Y value should the popup end at?
 *
 * ---
 *
 * Acceleration
 * 
 *   Starting Speed: X:
 *   Starting Speed: Y:
 *   - How much should the starting X/Y speed of the popup be?
 * 
 *   Delta Speed: X:
 *   Delta Speed: Y:
 *   - How much should the growing X/Y speed of the popup be?
 *
 * ---
 *
 * Fading
 * 
 *   Opaque Duration:
 *   - How many frames should the popup stay opaque?
 * 
 *   Fade Duration:
 *   - After the opaque duration wears off, how many frames will it take for
 *     the popup to vanish?
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
 * Version 1.09: June 13, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Critical > Stack Offset X
 * *** Plugin Parameters > Critical > Stack Offset Y
 * **** Offsets the popup x/y position if stacked with a weakness popup.
 * 
 * Version 1.08: May 16, 2024
 * * Compatibility Update!
 * ** Added better compatibility with VisuStella MZ Frontview Battle UI.
 * 
 * Version 1.07: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a problem with certain elemental rates displaying the wrong popup.
 *    Fix made by Irina.
 * 
 * Version 1.06: October 27, 2022
 * * Bug Fixes!
 * ** Fixed a bug where "HP Drain" damage type would not proc weakness popups.
 *    Fix made by Olivia.
 * 
 * Version 1.05: December 30, 2021
 * * Bug Fixes!
 * ** Corrected a bug that caused 0 damage/healing when this plugin is on.
 *    Fix made by Olivia.
 * 
 * Version 1.04: December 23, 2021
 * * Compatibility Update!
 * ** Weakness Popups now ignore the notetags involving caster element damage
 *    when calculating the type of popup to display. Update made by Olivia.
 * 
 * Version 1.03: June 4, 2021
 * * Compatibility Update!
 * ** Added automatic offset for those using UI Areas and Widths with different
 *    values from their screen resolutions once the Action Sequence Camera
 *    plugin is enabled. Update made by Irina.
 * 
 * Version 1.02: March 5, 2021
 * * Bug Fixes!
 * ** Weakness Popups for front view actors will no longer appear at the top
 *    of the screen. Fix made by Irina.
 * ** Weakness Popups will no longer shift positions prior to an actor's status
 *    window positioning anchor. Fix made by Irina.
 * * Documentation Update!
 * ** Added "Extra Features" section for more clarity on what having the Battle
 *    Core enables for Front View games.
 * 
 * Version 1.01: January 1, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** Plugin Parameters for the Popup Settings now have a Variance factor for
 *    Offset X and Offset Y. Added by Yanfly.
 *
 * Version 1.00: November 27, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param WeaknessPopups
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Critical
 *
 * @param Critical:struct
 * @text Critical Popup Settings
 * @parent Critical
 * @type struct<Popup>
 * @desc Settings for the Critical Popup!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"CRITICAL!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ec008c","outlineSize:num":"5","outlineColor:str":"rgba(255, 255, 255, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"-25","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.10","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param CritStackOffsetX:num
 * @text Stack Offset X
 * @parent Critical:struct
 * @desc Offsets the popup x position if stacked with a weakness.
 * Negative: left. Positive: right.
 * @default +48
 *
 * @param CritStackOffsetY:num
 * @text Stack Offset Y
 * @parent Critical:struct
 * @desc Offsets the popup y position if stacked with a weakness.
 * Negative: up. Positive: down.
 * @default -48
 * 
 * @param Element
 * @text Element Rates
 *
 * @param Element200:struct
 * @text Rate >= 200%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 200%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element175:struct
 * @text Rate >= 175%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 150%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"46","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element150:struct
 * @text Rate >= 150%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 150%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"44","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element125:struct
 * @text Rate >= 125%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 125%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"42","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element110:struct
 * @text Rate >= 110%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 110%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"40","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element105:struct
 * @text Rate >= 105%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 105%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"38","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element101:struct
 * @text Rate >= 101%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 105%!
 * @default {"General":"","enabled:eval":"false","Image":"","filename:str":"","Render":"","text:str":"DISABLED","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"2","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.10","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element99:struct
 * @text Rate <= 99%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 95%!
 * @default {"General":"","enabled:eval":"false","Image":"","filename:str":"","Render":"","text:str":"DISABLED","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"2","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.10","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element95:struct
 * @text Rate <= 95%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 95%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"38","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element90:struct
 * @text Rate <= 90%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 90%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"40","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element75:struct
 * @text Rate <= 75%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 75%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"42","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element50:struct
 * @text Rate <= 50%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 50%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"44","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element25:struct
 * @text Rate <= 25%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 25%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"46","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element0:struct
 * @text Rate = 0%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is exactly 0%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"IMMUNE!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#6dcff6","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param ElementNegative:struct
 * @text Rate < 0%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is under 0%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"ABSORB!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#bd8cbf","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
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
 * Popup Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Popup:
 *
 * @param General
 *
 * @param enabled:eval
 * @text Enabled
 * @parent General
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc Is this popup enabled?
 * @default true
 *
 * @param Image
 * @text Custom Image
 *
 * @param filename:str
 * @text Filename
 * @parent Image
 * @type file
 * @dir img/system/
 * @require 1
 * @desc Select an image from img/system/ to use as a custom image
 * popup. If you use this, ignore the Render settings.
 * @default 
 *
 * @param Render
 *
 * @param text:str
 * @text Text
 * @parent Render
 * @desc Type in the text you want displayed for the popup.
 * @default Text!
 *
 * @param bitmapWidth:num
 * @text Bitmap Width
 * @parent Render
 * @type number
 * @min 1
 * @desc What is the maximum width of this popup?
 * @default 600
 *
 * @param bitmapHeight:num
 * @text Bitmap Height
 * @parent Render
 * @type number
 * @min 1
 * @desc What is the maximum height of this popup?
 * @default 200
 *
 * @param fontFace:str
 * @text Font Name
 * @parent Render
 * @desc What font do you wish to use for this popup?
 * @default Impact
 *
 * @param fontSize:num
 * @text Font Size
 * @parent fontFace:str
 * @type number
 * @min 1
 * @desc What's the font size to use for the popup text?
 * @default 48
 *
 * @param fontBold:eval
 * @text Bold?
 * @parent fontFace:str
 * @type boolean
 * @on Bold
 * @off Normal
 * @desc Do you wish to make the text bold?
 * @default true
 *
 * @param fontItalic:eval
 * @text Italic?
 * @parent fontFace:str
 * @type boolean
 * @on Italic
 * @off Normal
 * @desc Do you wish to make the text italic?
 * @default false
 *
 * @param textColor:str
 * @text Text Color
 * @parent Render
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param outlineSize:num
 * @text Outline Size
 * @parent Render
 * @type number
 * @min 0
 * @desc What size do you want to use for the outline?
 * @default 5
 *
 * @param outlineColor:str
 * @text Outline Color
 * @parent outlineSize:num
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1)
 *
 * @param Offset
 *
 * @param offsetX:num
 * @text Offset: X
 * @parent Offset
 * @desc How much do you wish to offset the X position by?
 * @default 0
 *
 * @param offsetXvariance:num
 * @text Variance
 * @type number
 * @parent offsetX:num
 * @desc How much variance should be given to offset X?
 * @default 0
 *
 * @param offsetY:num
 * @text Offset: Y
 * @parent Offset
 * @desc How much do you wish to offset the Y position by?
 * @default 0
 *
 * @param offsetYvariance:num
 * @text Variance
 * @type number
 * @parent offsetY:num
 * @desc How much variance should be given to offset Y?
 * @default 0
 *
 * @param Scale
 *
 * @param scaleDuration:num
 * @text Duration
 * @parent Scale
 * @type number
 * @min 1
 * @desc How many frames should it take the scaling to reach the target scale?
 * @default 20
 *
 * @param startScaleX:num
 * @text Starting Scale: X
 * @parent Scale
 * @desc What scale X value should the popup start at?
 * @default 2.0
 *
 * @param startScaleY:num
 * @text Starting Scale: Y
 * @parent Scale
 * @desc What scale Y value should the popup start at?
 * @default 2.0
 *
 * @param targetScaleX:num
 * @text Target Scale: X
 * @parent Scale
 * @desc What scale X value should the popup end at?
 * @default 1.0
 *
 * @param targetScaleY:num
 * @text Target Scale: Y
 * @parent Scale
 * @desc What scale Y value should the popup end at?
 * @default 1.0
 *
 * @param Acceleration
 *
 * @param startSpeedX:num
 * @text Starting Speed: X
 * @parent Acceleration
 * @desc How much should the starting X speed of the popup be?
 * Negative: Left, Positive: Right
 * @default 0
 *
 * @param startSpeedY:num
 * @text Starting Speed: Y
 * @parent Acceleration
 * @desc How much should the starting Y speed of the popup be?
 * Negative: Up, Positive: Down
 * @default 0
 *
 * @param deltaSpeedX:num
 * @text Delta Speed: X
 * @parent Acceleration
 * @desc How much should the growing X speed of the popup be?
 * Negative: Left, Positive: Right
 * @default -0.10
 *
 * @param deltaSpeedY:num
 * @text Delta Speed: Y
 * @parent Acceleration
 * @desc How much should the growing Y speed of the popup be?
 * Negative: Up, Positive: Down
 * @default 0
 *
 * @param Fading
 *
 * @param opaqueDuration:num
 * @text Opaque Duration
 * @parent Fading
 * @type number
 * @min 1
 * @desc How many frames should the popup stay opaque?
 * @default 40
 *
 * @param fadeDuration:num
 * @text Fade Duration
 * @parent Fading
 * @type number
 * @min 1
 * @desc After the opaque duration wears off, how many frames will
 * it take for the popup to vanish?
 * @default 20
 *
 */
//=============================================================================

function _0x2563(_0x6f53b2,_0x19f94f){const _0x5df98a=_0x1d57();return _0x2563=function(_0x3681c9,_0x4f4cd8){_0x3681c9=_0x3681c9-(0x25e5+-0x1923+-0xc3b);let _0x534bc6=_0x5df98a[_0x3681c9];return _0x534bc6;},_0x2563(_0x6f53b2,_0x19f94f);}function _0x1d57(){const _0x47cfee=['bypassUser','Sprite','fadeDurati','e\x20Plugin\x20M','updateOpac','420381pJaBsw','ageRate','ElementBon','ease\x20updat','UEmRs','YsjIX','trim','gXGUS','VuLVh','DoAdS','_speedX','SJTEY','bitmapHeig','KLGQr','nessPopupT','TAIdG','Settings','OEABR','ainer','adjustFlip','_opaqueDur','boxHeight','anager.','startSpeed','ARRAYJSON','extraPosit','isFlipped','eRate','nZYFP','yRXYD','bitmapWidt','ist\x20from\x20s','jcEAN','DefaultPop','ffsetY','getWeaknes','createBitm','tfHsw','type','wmUYE','BhjhF','Element110','loadSystem','cBAJV','fontItalic','bDlFj','tainer','YLqDp','constructo','wcdNK','_targetSca','parameters','VisuMZ_1_B','_createWea','pKtYb','updatePosi','sPopupCont','4zTtJTO','ementDamag','1490ZXFaux','ElementDam','opupContai','STR','vfwbl','ffsetX','KsGkX','XgoHE','RSsFH','ugqif','_battler','ion','dOzoU','TjhDR','ugin\x27s.\x20Pl','centerFron','n_calcUser','cyrjZ','Battle_cre','loadWeakne','Critical','2|3|1|5','EVAL','critical','t\x20match\x20pl','offsetX','Element101','opacity','FfeDL','dOtsR','iner','format','ZqTMh','1081130VCxTJX','Impact','IAXVJ','qODrd','BuzZl','rgba(1,\x201,','createDama','isSceneBat','aced\x20on\x20th','ARRAYEVAL','offsetYvar','rrectly\x20pl','nessPopup','TjDrP','ist.\x0aIt\x20is','_baseY','outlineSiz','STRUCT','_baseX','s.\x0aPlease\x20','createWeak','apImage','anchor','ier\x20number','updateScal','descriptio','4|0|8|6|7|','PTyQr','createBatt','nhngi','qKeBh','KXKXG','Container','calcUserEl','deltaSpeed','status','ForElement','ing','amage','ateBattleF','162qeJdxA','BZatn','ner','randomInt','cSFck','WeaknessPo','rrNdw','lzsRy','abs','mallest\x20to','eAojw','none','filename','ity','ttleUI','Lobja','_statusWin','eFlat','tion','bviFJ','smiho','Battle_upd','1144DXoNYQ','pedBattlef','other\x20Tier','return\x200','exit','11517408OxqUfX','filter','removeChil','_data','ation','fontFace','WGYWq','ceil','attleCore','ing\x20a\x20requ','AqvyZ','getColor','tle','LqqOf','startScale','Element50','offsetY','_createDam','ionX','destroy','Yjijo','#%1','qrBRt','CritStackO','sSKiH','fontBold','TTzib','includes','fdFaL','height','Element105','parent','ePlus','width','Battlefiel','#ffffff','map','Plugin\x20Man','Spriteset_','Element99','Wqcba','nIuGg','0|4|2|5|1|','Zowyu','_damageCon','addChild','prototype','ionY','UvINM','geContaine','sNelo','ageContain','WCDNO','dow','_speedY','NhCRf','isDrain','age','nmZRC','lTmwg','aced\x20over\x20','mmcnD','Element0','isDamage','textColor','Rate','scaleDurat','scale','n.\x0aPlease\x20','\x20largest\x20t','isActor','sPopupData','qtqVH','_scene','ustFlipped','result','kAqAs','_weaknessP','findTarget','AlBTN','executeDam','tleStatus_','CRITICAL_S','ARRAYSTR','BattleCore','LFdEr','EWkML','ager.','jtNOv','leField','tRate','ageFlat','e\x20plugin\x20l','ARRAYSTRUC','leX','\x20a\x20Tier\x20%2','ElementNeg','version','call','isSideView','knessPopup','install\x20%2','iance','ield','219891epQJMl','UzFzN','RJllL','_fadeDurat','cyyWO','ative','Game_Actio','0|2|1|3|4','7677879vnUMfk','4|2|1|3|0','40jyZjcf','parse','_battleFie','ConvertPar','pups','update','outlineCol','IenOO','ctSeqCamer','rvTps','leY','%1\x27s\x20versi','updateWeak','text','ueaoL','targetScal','offsetXvar','bitmap','\x20plugin\x20pl','_scaleDura','reorder\x20th','Element90','enabled','nessPopups','initPositi','opupsConta','ate','%1\x20is\x20inco','TACK_OFFSE','IdhAu','agePlus','n_executeD','split','ARRAYFUNC','initMember','WXXSs','index','Window_Bat','3545010sSlHJY','initialize','ForCritica','ORMGK','\x20into\x20the\x20','zSCDQ','rxlCj','match','boxWidth','PllXx','Element75','ams'];_0x1d57=function(){return _0x47cfee;};return _0x1d57();}const _0x255529=_0x2563;(function(_0x15fb46,_0x51cef1){const _0x963ec6=_0x2563,_0x323f33=_0x15fb46();while(!![]){try{const _0xcb9fba=parseInt(_0x963ec6(0x11f))/(-0x2*-0x74+0x8b6*0x2+0x1253*-0x1)+-parseInt(_0x963ec6(0xfc))/(-0x1873+0x22c4+-0xa4f)*(parseInt(_0x963ec6(0xc3))/(0x524*0x7+-0x17e*-0x10+-0x3bd9))+parseInt(_0x963ec6(0x15d))/(0x23c5*0x1+-0xa16+-0x1*0x19ab)*(parseInt(_0x963ec6(0xfe))/(-0x1493+0x20a9+-0xc11))+-parseInt(_0x963ec6(0x147))/(0x2553+0x234c+-0x4899)*(-parseInt(_0x963ec6(0x1ca))/(0xa67+-0x1e77+0x1417))+parseInt(_0x963ec6(0x162))/(0x3cd*0x4+-0x1*0xc88+-0x2a4)+parseInt(_0x963ec6(0xb2))/(-0x192+-0x3ed*0x3+0xd62)+parseInt(_0x963ec6(0x8c))/(0x844*0x2+0x2355*0x1+-0x33d3)*(-parseInt(_0x963ec6(0x8a))/(0x1*-0x23b5+0x1229+0x1197));if(_0xcb9fba===_0x51cef1)break;else _0x323f33['push'](_0x323f33['shift']());}catch(_0x2bf6b3){_0x323f33['push'](_0x323f33['shift']());}}}(_0x1d57,-0x8a7d5*0x1+0xb05c9*-0x1+0x1f8457));var label=_0x255529(0x14c)+_0x255529(0x90),tier=tier||0x1ea0+0x35*-0x46+-0x1022,dependencies=[],pluginData=$plugins[_0x255529(0x163)](function(_0x39d7d3){const _0x5029cb=_0x255529,_0x59c9c8={'IdhAu':function(_0x250aa9,_0x2dd96e){return _0x250aa9+_0x2dd96e;},'TphPU':function(_0x240d73,_0x839e4c){return _0x240d73+_0x839e4c;}};return _0x39d7d3[_0x5029cb(0x142)]&&_0x39d7d3[_0x5029cb(0x138)+'n'][_0x5029cb(0x17d)](_0x59c9c8[_0x5029cb(0xa9)](_0x59c9c8['TphPU']('[',label),']'));})[-0x1*0x7e2+0x2591+-0x95*0x33];VisuMZ[label][_0x255529(0xd3)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x255529(0x8f)+_0x255529(0xbd)]=function(_0x2d37ec,_0x640335){const _0x575c84=_0x255529,_0x1e590e={'rvTps':function(_0x595111,_0x5eb8d7){return _0x595111(_0x5eb8d7);},'Cbehg':function(_0xbc9b54,_0x45b58e){return _0xbc9b54(_0x45b58e);},'WCDNO':'NUM','yRXYD':function(_0x2c28d2,_0xd8d88d){return _0x2c28d2!==_0xd8d88d;},'sSKiH':'ARRAYNUM','AqvyZ':function(_0xf3dd56,_0x217cc8){return _0xf3dd56!==_0x217cc8;},'NhCRf':_0x575c84(0x114),'KrhhN':_0x575c84(0x128),'XgoHE':function(_0x481948,_0x14a173){return _0x481948!==_0x14a173;},'IenOO':'JSON','LFdEr':_0x575c84(0xdb),'Wqcba':function(_0x23d527,_0x29f683){return _0x23d527!==_0x29f683;},'QwbpD':'FUNC','FfeDL':function(_0x214dfc,_0x5a5d13){return _0x214dfc!==_0x5a5d13;},'cSFck':_0x575c84(0x160),'sNelo':_0x575c84(0xad),'bviFJ':_0x575c84(0x101),'tfHsw':function(_0x5ddca9,_0x371e0b){return _0x5ddca9!==_0x371e0b;},'IAXVJ':_0x575c84(0x1b5),'BuzZl':_0x575c84(0x130),'nZYFP':function(_0x50b3bb,_0x268004){return _0x50b3bb!==_0x268004;},'VuLVh':_0x575c84(0x1bf)+'T'};for(const _0x326ca4 in _0x640335){if(_0x326ca4[_0x575c84(0xb9)](/(.*):(.*)/i)){const _0x2948e6=_0x1e590e[_0x575c84(0x95)](String,RegExp['$1']),_0x55ccca=_0x1e590e['Cbehg'](String,RegExp['$2'])['toUpperCas'+'e']()[_0x575c84(0xc9)]();let _0x3ddbe6,_0x4aced3,_0x4ce820;switch(_0x55ccca){case _0x1e590e[_0x575c84(0x196)]:_0x3ddbe6=_0x1e590e[_0x575c84(0xe0)](_0x640335[_0x326ca4],'')?_0x1e590e['rvTps'](Number,_0x640335[_0x326ca4]):0xeaf+-0x1240+-0x391*-0x1;break;case _0x1e590e[_0x575c84(0x17a)]:_0x4aced3=_0x1e590e[_0x575c84(0x16c)](_0x640335[_0x326ca4],'')?JSON['parse'](_0x640335[_0x326ca4]):[],_0x3ddbe6=_0x4aced3['map'](_0x2e6989=>Number(_0x2e6989));break;case _0x1e590e[_0x575c84(0x199)]:_0x3ddbe6=_0x1e590e[_0x575c84(0x16c)](_0x640335[_0x326ca4],'')?_0x1e590e['Cbehg'](eval,_0x640335[_0x326ca4]):null;break;case _0x1e590e['KrhhN']:_0x4aced3=_0x1e590e[_0x575c84(0x105)](_0x640335[_0x326ca4],'')?JSON[_0x575c84(0x8d)](_0x640335[_0x326ca4]):[],_0x3ddbe6=_0x4aced3[_0x575c84(0x186)](_0x3125fd=>eval(_0x3125fd));break;case _0x1e590e[_0x575c84(0x93)]:_0x3ddbe6=_0x1e590e[_0x575c84(0x105)](_0x640335[_0x326ca4],'')?JSON['parse'](_0x640335[_0x326ca4]):'';break;case _0x1e590e[_0x575c84(0x1b7)]:_0x4aced3=_0x1e590e['Wqcba'](_0x640335[_0x326ca4],'')?JSON[_0x575c84(0x8d)](_0x640335[_0x326ca4]):[],_0x3ddbe6=_0x4aced3[_0x575c84(0x186)](_0x26b1ce=>JSON[_0x575c84(0x8d)](_0x26b1ce));break;case _0x1e590e['QwbpD']:_0x3ddbe6=_0x1e590e[_0x575c84(0x11a)](_0x640335[_0x326ca4],'')?new Function(JSON['parse'](_0x640335[_0x326ca4])):new Function(_0x1e590e[_0x575c84(0x14b)]);break;case _0x1e590e[_0x575c84(0x194)]:_0x4aced3=_0x1e590e[_0x575c84(0x105)](_0x640335[_0x326ca4],'')?JSON[_0x575c84(0x8d)](_0x640335[_0x326ca4]):[],_0x3ddbe6=_0x4aced3[_0x575c84(0x186)](_0x94a6a0=>new Function(JSON['parse'](_0x94a6a0)));break;case _0x1e590e[_0x575c84(0x15a)]:_0x3ddbe6=_0x1e590e[_0x575c84(0xe8)](_0x640335[_0x326ca4],'')?_0x1e590e['Cbehg'](String,_0x640335[_0x326ca4]):'';break;case _0x1e590e[_0x575c84(0x121)]:_0x4aced3=_0x1e590e[_0x575c84(0x18a)](_0x640335[_0x326ca4],'')?JSON[_0x575c84(0x8d)](_0x640335[_0x326ca4]):[],_0x3ddbe6=_0x4aced3['map'](_0x172db6=>String(_0x172db6));break;case _0x1e590e[_0x575c84(0x123)]:_0x4ce820=_0x1e590e[_0x575c84(0xdf)](_0x640335[_0x326ca4],'')?JSON[_0x575c84(0x8d)](_0x640335[_0x326ca4]):{},_0x3ddbe6=VisuMZ['ConvertPar'+_0x575c84(0xbd)]({},_0x4ce820);break;case _0x1e590e[_0x575c84(0xcb)]:_0x4aced3=_0x1e590e[_0x575c84(0x18a)](_0x640335[_0x326ca4],'')?JSON[_0x575c84(0x8d)](_0x640335[_0x326ca4]):[],_0x3ddbe6=_0x4aced3['map'](_0x52894d=>VisuMZ[_0x575c84(0x8f)+'ams']({},JSON[_0x575c84(0x8d)](_0x52894d)));break;default:continue;}_0x2d37ec[_0x2948e6]=_0x3ddbe6;}}return _0x2d37ec;},(_0x4e4cac=>{const _0x412cca=_0x255529,_0x52f921={'zSCpA':function(_0x8c52a6,_0x5be950){return _0x8c52a6(_0x5be950);},'dOzoU':'%1\x20is\x20miss'+_0x412cca(0x16b)+'ired\x20plugi'+_0x412cca(0x1a6)+_0x412cca(0x1c7)+_0x412cca(0xb6)+_0x412cca(0x187)+_0x412cca(0x1b9),'qrBRt':function(_0x58c592,_0x47fc1e){return _0x58c592!==_0x47fc1e;},'PllXx':function(_0x5ee9dc,_0x32f56f){return _0x5ee9dc(_0x32f56f);},'qdCGb':_0x412cca(0x97)+'on\x20does\x20no'+_0x412cca(0x116)+_0x412cca(0x10c)+_0x412cca(0xc6)+'e\x20it\x20in\x20th'+_0x412cca(0xc1)+_0x412cca(0xd9),'cyrjZ':function(_0x1d8199,_0x2cc797){return _0x1d8199(_0x2cc797);},'bDlFj':function(_0x1da4c5,_0x4078a6){return _0x1da4c5<_0x4078a6;},'tNZhM':function(_0x9af4b4,_0x58f279){return _0x9af4b4(_0x58f279);},'eoyfi':_0x412cca(0xa7)+_0x412cca(0x12a)+_0x412cca(0x127)+_0x412cca(0x1be)+_0x412cca(0x12d)+_0x412cca(0x1c1)+_0x412cca(0x9e)+_0x412cca(0x19e)+_0x412cca(0x15f)+'\x20%3\x20plugin'+_0x412cca(0x132)+_0x412cca(0xa0)+_0x412cca(0x1be)+_0x412cca(0xe2)+_0x412cca(0x150)+_0x412cca(0x1a7)+_0x412cca(0x136)+'s.'},_0x1eb81f=_0x4e4cac['name'];for(const _0x3decda of dependencies){if(!Imported[_0x3decda]){_0x52f921['zSCpA'](alert,_0x52f921[_0x412cca(0x10a)][_0x412cca(0x11d)](_0x1eb81f,_0x3decda)),SceneManager[_0x412cca(0x161)]();break;}}const _0x25be20=_0x4e4cac[_0x412cca(0x138)+'n'];if(_0x25be20[_0x412cca(0xb9)](/\[Version[ ](.*?)\]/i)){const _0xd3067=_0x52f921['zSCpA'](Number,RegExp['$1']);_0x52f921[_0x412cca(0x178)](_0xd3067,VisuMZ[label][_0x412cca(0x1c3)])&&(_0x52f921[_0x412cca(0xbb)](alert,_0x52f921['qdCGb'][_0x412cca(0x11d)](_0x1eb81f,_0xd3067)),SceneManager['exit']());}if(_0x25be20['match'](/\[Tier[ ](\d+)\]/i)){const _0x394551=_0x52f921[_0x412cca(0x10f)](Number,RegExp['$1']);_0x52f921[_0x412cca(0xf0)](_0x394551,tier)?(_0x52f921['tNZhM'](alert,_0x52f921['eoyfi'][_0x412cca(0x11d)](_0x1eb81f,_0x394551,tier)),SceneManager[_0x412cca(0x161)]()):tier=Math['max'](_0x394551,tier);}VisuMZ[_0x412cca(0x8f)+'ams'](VisuMZ[label]['Settings'],_0x4e4cac[_0x412cca(0xf6)]);})(pluginData),ColorManager[_0x255529(0x16d)]=function(_0x588e36){const _0x43161b=_0x255529,_0x42a693={'Zowyu':function(_0x4b8cdf,_0x596a38){return _0x4b8cdf(_0x596a38);},'nmZRC':_0x43161b(0x177),'qKeBh':function(_0x2613a0,_0x11ea96){return _0x2613a0(_0x11ea96);},'cBAJV':function(_0x3ef854,_0x37cc1a){return _0x3ef854(_0x37cc1a);}};return _0x588e36=_0x42a693[_0x43161b(0x18d)](String,_0x588e36),_0x588e36[_0x43161b(0xb9)](/#(.*)/i)?_0x42a693[_0x43161b(0x19c)][_0x43161b(0x11d)](_0x42a693[_0x43161b(0x13d)](String,RegExp['$1'])):this['textColor'](_0x42a693[_0x43161b(0xee)](Number,_0x588e36));},SceneManager[_0x255529(0x126)+_0x255529(0x16e)]=function(){const _0xda4b8c=_0x255529,_0x55cb19={'RJllL':function(_0x4c5841,_0x4a1306){return _0x4c5841===_0x4a1306;}};return this['_scene']&&_0x55cb19[_0xda4b8c(0x1cc)](this['_scene'][_0xda4b8c(0xf3)+'r'],Scene_Battle);},VisuMZ[_0x255529(0x14c)+_0x255529(0x90)][_0x255529(0x88)+_0x255529(0xab)+'amage']=Game_Action['prototype'][_0x255529(0x1b2)+_0x255529(0x19b)],Game_Action['prototype'][_0x255529(0x1b2)+_0x255529(0x19b)]=function(_0x39122f,_0x48c8c0){const _0x2270f1=_0x255529;VisuMZ['WeaknessPo'+'pups'][_0x2270f1(0x88)+_0x2270f1(0xab)+_0x2270f1(0x145)][_0x2270f1(0x1c4)](this,_0x39122f,_0x48c8c0),this[_0x2270f1(0x133)+_0x2270f1(0xa3)](_0x39122f,_0x48c8c0);},Game_Action[_0x255529(0x190)][_0x255529(0x133)+_0x255529(0xa3)]=function(_0xc21c8c,_0x3447d7){const _0x434a15=_0x255529;if(!SceneManager[_0x434a15(0x126)+_0x434a15(0x16e)]())return;if(!this[_0x434a15(0x1a1)]()&&!this[_0x434a15(0x19a)]())return;this[_0x434a15(0x133)+'nessPopups'+_0x434a15(0x143)+_0x434a15(0x1a3)](_0xc21c8c,_0x3447d7),this[_0x434a15(0x133)+'nessPopups'+_0x434a15(0xb4)+'l'](_0xc21c8c,_0x3447d7);},Game_Action['prototype'][_0x255529(0x133)+_0x255529(0xa3)+_0x255529(0xb4)+'l']=function(_0x382d7d,_0x8407d3){const _0x508237=_0x255529,_0x4cb0fe={'qzPiR':_0x508237(0x112)},_0x5b091c=_0x382d7d[_0x508237(0x1ad)]();if(!_0x5b091c[_0x508237(0x115)])return;const _0x5524fb=SceneManager[_0x508237(0x1ab)]['_spriteset'];if(!_0x5524fb)return;_0x5524fb[_0x508237(0x133)+'nessPopupT'+'ype'](_0x382d7d,_0x4cb0fe['qzPiR']);},Game_Action[_0x255529(0x190)][_0x255529(0x133)+_0x255529(0xa3)+_0x255529(0x143)+'Rate']=function(_0x48768e,_0x2413f9){const _0x1185df=_0x255529,_0x5f58e9={'pXlZI':'none','EWkML':function(_0x44411f,_0x2cd4a2){return _0x44411f===_0x2cd4a2;},'ywmmh':_0x1185df(0x1a0),'SJTEY':function(_0x5089b5,_0x4ab4fa){return _0x5089b5<_0x4ab4fa;},'ueaoL':_0x1185df(0x1c2)+_0x1185df(0x87),'TTzib':function(_0x1eafe7,_0x54cdbf){return _0x1eafe7>=_0x54cdbf;},'nhngi':'Element200','rxlCj':'Element175','rrNdw':'Element150','eAojw':'Element125','mmcnD':function(_0x575be8,_0x52e0a2){return _0x575be8>=_0x52e0a2;},'jmHBD':_0x1185df(0xec),'gXGUS':_0x1185df(0x180),'lTmwg':_0x1185df(0x118),'TAIdG':function(_0x3db6e3,_0x3aecd6){return _0x3db6e3<=_0x3aecd6;},'DuyUO':'Element25','EdgGb':function(_0x48bf25,_0x1d831b){return _0x48bf25<=_0x1d831b;},'KLGQr':_0x1185df(0x171),'DoAdS':function(_0x21183c,_0x1e51d4){return _0x21183c<=_0x1e51d4;},'jcEAN':_0x1185df(0xbc),'OEABR':_0x1185df(0xa1),'vfwbl':function(_0x40da2c,_0x3c22f1){return _0x40da2c<=_0x3c22f1;},'IVfEN':'Element95','ORMGK':function(_0x781888,_0x225a1c){return _0x781888<=_0x225a1c;},'Yjijo':_0x1185df(0x189)},_0x571774=SceneManager[_0x1185df(0x1ab)]['_spriteset'];if(!_0x571774)return;$gameTemp['bypassUser'+_0x1185df(0xc5)+'us']=!![];const _0x52798b=this['calcElemen'+_0x1185df(0x1bc)](_0x48768e);$gameTemp[_0x1185df(0xbe)+_0x1185df(0xc5)+'us']=![];let _0x4bf193=_0x5f58e9['pXlZI'];if(_0x5f58e9[_0x1185df(0x1b8)](_0x52798b,-0x1*0x2113+-0xb28+0x2c3b))_0x4bf193=_0x5f58e9['ywmmh'];else{if(_0x5f58e9[_0x1185df(0xce)](_0x52798b,0x2*-0xc7a+-0x1*0x186c+0x3160))_0x4bf193=_0x5f58e9[_0x1185df(0x9a)];else{if(_0x5f58e9['TTzib'](_0x52798b,0x35*-0x3d+0x1ce1*0x1+0x42*-0x3f))_0x4bf193=_0x5f58e9[_0x1185df(0x13c)];else{if(_0x5f58e9[_0x1185df(0x17c)](_0x52798b,-0x7*0xd+0x1ad2+-0x1a76+0.75))_0x4bf193=_0x5f58e9[_0x1185df(0xb8)];else{if(_0x5f58e9[_0x1185df(0x17c)](_0x52798b,-0x18e7+0xef*-0x6+0x1e82+0.5))_0x4bf193=_0x5f58e9[_0x1185df(0x14d)];else{if(_0x5f58e9[_0x1185df(0x17c)](_0x52798b,0x9e0+-0x1c4e*-0x1+0x1*-0x262d+0.25))_0x4bf193=_0x5f58e9[_0x1185df(0x151)];else{if(_0x5f58e9[_0x1185df(0x19f)](_0x52798b,0x11*-0x1c7+0xb3*-0x1d+0x327f+0.10000000000000009))_0x4bf193=_0x5f58e9['jmHBD'];else{if(_0x5f58e9[_0x1185df(0x19f)](_0x52798b,0x21a9*-0x1+-0x1*-0x19d9+0x7d1+0.050000000000000044))_0x4bf193=_0x5f58e9[_0x1185df(0xca)];else{if(_0x5f58e9[_0x1185df(0x19f)](_0x52798b,0xe7c+-0x23ee+-0x1573*-0x1+0.010000000000000009))_0x4bf193=_0x5f58e9[_0x1185df(0x19d)];else{if(_0x5f58e9[_0x1185df(0xd2)](_0x52798b,0x270d+-0x1*0x892+-0x1e7b+0.25))_0x4bf193=_0x5f58e9['DuyUO'];else{if(_0x5f58e9['EdgGb'](_0x52798b,-0xcef*0x1+0x183e+0xc1*-0xf+0.5))_0x4bf193=_0x5f58e9[_0x1185df(0xd0)];else{if(_0x5f58e9[_0x1185df(0xcc)](_0x52798b,-0x26ba+-0x41*-0x5f+0xe9b*0x1+0.75))_0x4bf193=_0x5f58e9[_0x1185df(0xe3)];else{if(_0x5f58e9[_0x1185df(0xcc)](_0x52798b,-0x1*-0xeb6+-0x16e4+0x82e+0.9))_0x4bf193=_0x5f58e9[_0x1185df(0xd4)];else{if(_0x5f58e9[_0x1185df(0x102)](_0x52798b,-0x1d*-0xc7+0x3e*0x47+-0x27bd+0.95))_0x4bf193=_0x5f58e9['IVfEN'];else _0x5f58e9[_0x1185df(0xb5)](_0x52798b,-0x1a7e+-0xa*-0x1a7+0x9f8+0.99)&&(_0x4bf193=_0x5f58e9[_0x1185df(0x176)]);}}}}}}}}}}}}}_0x571774[_0x1185df(0x133)+_0x1185df(0xd1)+'ype'](_0x48768e,_0x4bf193);},VisuMZ[_0x255529(0x14c)+_0x255529(0x90)][_0x255529(0x88)+_0x255529(0x10e)+_0x255529(0xff)+_0x255529(0xaa)]=Game_Action[_0x255529(0x190)]['calcUserEl'+'ementDamag'+_0x255529(0x182)],Game_Action[_0x255529(0x190)][_0x255529(0x140)+_0x255529(0xfd)+_0x255529(0x182)]=function(_0x2b2fc8,_0x13b4d4){const _0x346c00=_0x255529;if($gameTemp[_0x346c00(0xbe)+_0x346c00(0xc5)+'us'])return-0x1*-0x2615+0x5a8+-0x1*0x2bbd;return VisuMZ['WeaknessPo'+_0x346c00(0x90)]['Game_Actio'+_0x346c00(0x10e)+_0x346c00(0xff)+_0x346c00(0xaa)][_0x346c00(0x1c4)](this,_0x2b2fc8,_0x13b4d4);},VisuMZ[_0x255529(0x14c)+'pups'][_0x255529(0x88)+_0x255529(0x10e)+_0x255529(0xff)+'ageRate']=Game_Action[_0x255529(0x190)]['calcUserEl'+_0x255529(0xfd)+_0x255529(0xde)],Game_Action[_0x255529(0x190)][_0x255529(0x140)+_0x255529(0xfd)+_0x255529(0xde)]=function(_0x41e361,_0x68ff1b){const _0x4e87a3=_0x255529;if($gameTemp[_0x4e87a3(0xbe)+'ElementBon'+'us'])return-0xcb9+-0x72*0x4f+0x248*0x15;return VisuMZ['WeaknessPo'+_0x4e87a3(0x90)][_0x4e87a3(0x88)+_0x4e87a3(0x10e)+_0x4e87a3(0xff)+_0x4e87a3(0xc4)][_0x4e87a3(0x1c4)](this,_0x41e361,_0x68ff1b);},VisuMZ[_0x255529(0x14c)+'pups'][_0x255529(0x88)+_0x255529(0x10e)+_0x255529(0xff)+'ageFlat']=Game_Action[_0x255529(0x190)]['calcUserEl'+_0x255529(0xfd)+_0x255529(0x158)],Game_Action[_0x255529(0x190)]['calcUserEl'+_0x255529(0xfd)+_0x255529(0x158)]=function(_0x4fbbfa,_0x1a9bca){const _0x45f15f=_0x255529;if($gameTemp[_0x45f15f(0xbe)+_0x45f15f(0xc5)+'us'])return 0x1*-0x1f05+-0x1f3a*-0x1+0x35*-0x1;return VisuMZ[_0x45f15f(0x14c)+_0x45f15f(0x90)][_0x45f15f(0x88)+_0x45f15f(0x10e)+_0x45f15f(0xff)+_0x45f15f(0x1bd)][_0x45f15f(0x1c4)](this,_0x4fbbfa,_0x1a9bca);};function Sprite_WeaknessPopup(){const _0x5d14b2=_0x255529;this[_0x5d14b2(0xb3)](...arguments);}Sprite_WeaknessPopup[_0x255529(0x190)]=Object['create'](Sprite[_0x255529(0x190)]),Sprite_WeaknessPopup[_0x255529(0x190)]['constructo'+'r']=Sprite_WeaknessPopup,Sprite_WeaknessPopup[_0x255529(0x1b4)+_0x255529(0xa8)+'T']={'offsetX':VisuMZ[_0x255529(0x14c)+'pups'][_0x255529(0xd3)][_0x255529(0x179)+_0x255529(0x103)],'offsetY':VisuMZ[_0x255529(0x14c)+_0x255529(0x90)][_0x255529(0xd3)][_0x255529(0x179)+_0x255529(0xe5)]},Sprite_WeaknessPopup[_0x255529(0x190)][_0x255529(0xb3)]=function(_0x39008c,_0x38bc81){const _0x4b5a64=_0x255529,_0x35155d={'TjDrP':_0x4b5a64(0x18c)+'3'},_0x18df9f=_0x35155d[_0x4b5a64(0x12c)][_0x4b5a64(0xac)]('|');let _0x5486d4=-0x4d0+-0x21f0+0x10*0x26c;while(!![]){switch(_0x18df9f[_0x5486d4++]){case'0':this['_battler']=_0x39008c;continue;case'1':this[_0x4b5a64(0xe7)+'ap']();continue;case'2':this[_0x4b5a64(0xae)+'s']();continue;case'3':this[_0x4b5a64(0xa4)+'on']();continue;case'4':this[_0x4b5a64(0x165)]=_0x38bc81;continue;case'5':Sprite['prototype'][_0x4b5a64(0xb3)]['call'](this);continue;}break;}},Sprite_WeaknessPopup[_0x255529(0x190)][_0x255529(0xe7)+'ap']=function(){const _0x33d407=_0x255529;this[_0x33d407(0x165)][_0x33d407(0x153)]?this['loadWeakne'+'ssPopupBit'+'map']():this['createBitm'+_0x33d407(0x134)]();},Sprite_WeaknessPopup[_0x255529(0x190)][_0x255529(0x111)+'ssPopupBit'+_0x255529(0x186)]=function(){const _0x433055=_0x255529;this[_0x433055(0x9d)]=ImageManager[_0x433055(0xed)](this[_0x433055(0x165)][_0x433055(0x153)]);},Sprite_WeaknessPopup['prototype']['createBitm'+'apImage']=function(){const _0x53e1c9=_0x255529,_0x3afaeb={'YsjIX':_0x53e1c9(0x139)+_0x53e1c9(0x113),'dOtsR':'center'},_0x7c1b40=_0x3afaeb[_0x53e1c9(0xc8)][_0x53e1c9(0xac)]('|');let _0x46a02c=-0x1159+-0x1*0x73c+0xd9*0x1d;while(!![]){switch(_0x7c1b40[_0x46a02c++]){case'0':this['bitmap'][_0x53e1c9(0x167)]=this[_0x53e1c9(0x165)][_0x53e1c9(0x167)];continue;case'1':this[_0x53e1c9(0x9d)]['outlineCol'+'or']=this['_data'][_0x53e1c9(0x92)+'or'];continue;case'2':this['bitmap'][_0x53e1c9(0x1a2)]=ColorManager[_0x53e1c9(0x16d)](this[_0x53e1c9(0x165)]['textColor']);continue;case'3':this[_0x53e1c9(0x9d)]['outlineSiz'+'e']=this['_data'][_0x53e1c9(0x12f)+'e'];continue;case'4':this[_0x53e1c9(0x9d)]=new Bitmap(this[_0x53e1c9(0x165)][_0x53e1c9(0xe1)+'h'],this[_0x53e1c9(0x165)][_0x53e1c9(0xcf)+'ht']);continue;case'5':this[_0x53e1c9(0x9d)]['drawText'](this['_data'][_0x53e1c9(0x99)],-0x4c*-0xc+-0x106*-0x1c+-0x2038*0x1,0x120a*-0x1+-0xfad+0x21b7,this[_0x53e1c9(0x9d)][_0x53e1c9(0x183)],this[_0x53e1c9(0x9d)][_0x53e1c9(0x17f)],_0x3afaeb[_0x53e1c9(0x11b)]);continue;case'6':this['bitmap']['fontBold']=this['_data'][_0x53e1c9(0x17b)];continue;case'7':this[_0x53e1c9(0x9d)]['fontItalic']=this['_data'][_0x53e1c9(0xef)];continue;case'8':this[_0x53e1c9(0x9d)]['fontSize']=this[_0x53e1c9(0x165)]['fontSize'];continue;}break;}},Sprite_WeaknessPopup[_0x255529(0x190)]['initMember'+'s']=function(){const _0x5f59a7=_0x255529,_0x94d4b8={'WXXSs':_0x5f59a7(0x89)},_0xd13bca=_0x94d4b8[_0x5f59a7(0xaf)][_0x5f59a7(0xac)]('|');let _0x4c946d=-0x815+0x62d+0x1e8;while(!![]){switch(_0xd13bca[_0x4c946d++]){case'0':this['_speedX']=this['_data'][_0x5f59a7(0xda)+'X'];continue;case'1':this[_0x5f59a7(0xd7)+_0x5f59a7(0x166)]=this[_0x5f59a7(0x165)]['opaqueDura'+_0x5f59a7(0x159)];continue;case'2':this[_0x5f59a7(0x198)]=this[_0x5f59a7(0x165)][_0x5f59a7(0xda)+'Y'];continue;case'3':this[_0x5f59a7(0x1cd)+_0x5f59a7(0x109)]=this[_0x5f59a7(0x165)][_0x5f59a7(0xc0)+'on'];continue;case'4':this[_0x5f59a7(0x9f)+_0x5f59a7(0x159)]=this['_data'][_0x5f59a7(0x1a4)+'ion'];continue;}break;}},Sprite_WeaknessPopup[_0x255529(0x190)][_0x255529(0xa4)+'on']=function(){const _0x230c9d=_0x255529,_0x40117a={'KsGkX':function(_0x38279b,_0x24a601){return _0x38279b*_0x24a601;},'WGYWq':function(_0xed9eb5,_0x23452f){return _0xed9eb5>=_0x23452f;},'wcdNK':function(_0x44ebfe,_0x43600f){return _0x44ebfe-_0x43600f;},'UvINM':function(_0x4ab977,_0x3c3613){return _0x4ab977-_0x3c3613;}},_0x57a4f0=SceneManager[_0x230c9d(0x1ab)]['_statusWin'+_0x230c9d(0x197)];!$gameSystem['isSideView']()&&this[_0x230c9d(0x108)][_0x230c9d(0x108)][_0x230c9d(0x1a8)]()&&(Imported[_0x230c9d(0xf7)+'attleCore']&&_0x57a4f0[_0x230c9d(0x10d)+'tViewSprit'+'e'](this[_0x230c9d(0x108)]['_battler'][_0x230c9d(0xb0)]()));this['x']=this['_battler'][_0x230c9d(0x131)]??this[_0x230c9d(0x108)]['x'],this['x']+=this[_0x230c9d(0x165)][_0x230c9d(0x117)];Imported['VisuMZ_3_F'+'rontviewBa'+_0x230c9d(0x155)]&&this['_battler']['_battler'][_0x230c9d(0x1a8)]()&&!$gameSystem[_0x230c9d(0x1c5)]()?this['y']=-(-0x1283+-0x1384+0x262b):(this['y']=this[_0x230c9d(0x108)][_0x230c9d(0x12e)]??this[_0x230c9d(0x108)]['y'],this['y']-=_0x40117a[_0x230c9d(0x104)](this[_0x230c9d(0x108)][_0x230c9d(0x17f)],this[_0x230c9d(0x108)]['scale']['y']),this['y']+=this[_0x230c9d(0x165)]['offsetY']);if(Imported[_0x230c9d(0xf7)+_0x230c9d(0x16a)]&&_0x40117a[_0x230c9d(0x168)](VisuMZ[_0x230c9d(0x1b6)][_0x230c9d(0x1c3)],-0x127*0x7+0x112*0x1+0x700+0.3799999999999999)){this['x']+=this['_battler'][_0x230c9d(0xdc)+_0x230c9d(0x174)]();const _0x1e4e06=this['_battler']['_distortio'+'nSprite'][_0x230c9d(0x1a5)]['y'];this['y']+=this['_battler'][_0x230c9d(0xdc)+_0x230c9d(0x191)]();}const _0x236c15=this[_0x230c9d(0x165)][_0x230c9d(0x9c)+'iance']||-0xb7d+-0x1*-0x23f3+-0xca*0x1f,_0x1beca1=this['_data'][_0x230c9d(0x129)+_0x230c9d(0x1c8)]||-0x710+0x5da*-0x5+0x2452;this['x']+=_0x40117a[_0x230c9d(0xf4)](Math[_0x230c9d(0x14a)](_0x40117a['KsGkX'](_0x236c15,-0x3d1*-0x3+0x1b0d+0x133f*-0x2)),_0x236c15),this['y']+=_0x40117a[_0x230c9d(0x192)](Math[_0x230c9d(0x14a)](_0x40117a[_0x230c9d(0x104)](_0x1beca1,0x49*0x21+0xe06*0x2+-0x2573*0x1)),_0x1beca1),this[_0x230c9d(0x135)]['x']=0x5*-0x61+-0xc70*0x1+0xe55+0.5,this[_0x230c9d(0x135)]['y']=-0x1f76+0x12a*0x10+-0x66b*-0x2+0.5,this[_0x230c9d(0x1a5)]['x']=this[_0x230c9d(0x165)][_0x230c9d(0x170)+'X'],this[_0x230c9d(0x1a5)]['y']=this[_0x230c9d(0x165)][_0x230c9d(0x170)+'Y'],this[_0x230c9d(0xf5)+_0x230c9d(0x1c0)]=this[_0x230c9d(0x165)]['targetScal'+'eX'],this[_0x230c9d(0xf5)+_0x230c9d(0x96)]=this[_0x230c9d(0x165)][_0x230c9d(0x9b)+'eY'];},Sprite_WeaknessPopup[_0x255529(0x190)][_0x255529(0x91)]=function(){const _0x314ece=_0x255529;Sprite[_0x314ece(0x190)][_0x314ece(0x91)][_0x314ece(0x1c4)](this),this['updatePosi'+_0x314ece(0x159)](),this[_0x314ece(0x137)+_0x314ece(0x144)](),this[_0x314ece(0xc2)+_0x314ece(0x154)]();},Sprite_WeaknessPopup[_0x255529(0x190)][_0x255529(0xfa)+_0x255529(0x159)]=function(){const _0x374466=_0x255529;this['x']+=this[_0x374466(0xcd)],this['y']+=this['_speedY'],this['_speedX']+=this[_0x374466(0x165)][_0x374466(0x141)+'X'],this['_speedY']+=this[_0x374466(0x165)][_0x374466(0x141)+'Y'];},Sprite_WeaknessPopup['prototype'][_0x255529(0x137)+_0x255529(0x144)]=function(){const _0x2d579c=_0x255529,_0x33ed12={'jtNOv':function(_0x41e9bc,_0x38bba3){return _0x41e9bc>_0x38bba3;},'ZqTMh':function(_0x3685dc,_0x1411c0){return _0x3685dc/_0x1411c0;},'RSsFH':function(_0x58a42a,_0x4c2091){return _0x58a42a+_0x4c2091;},'Lobja':function(_0xd6a71b,_0x2803f7){return _0xd6a71b*_0x2803f7;},'KXKXG':function(_0x48808e,_0x42c48f){return _0x48808e-_0x42c48f;},'LqqOf':function(_0x538d75,_0x340dd1){return _0x538d75+_0x340dd1;},'gxTpg':function(_0x1df8f0,_0x305902){return _0x1df8f0-_0x305902;}};if(_0x33ed12[_0x2d579c(0x1ba)](this['_scaleDura'+_0x2d579c(0x159)],-0x10fa+0x28d*0x7+-0xe1)){const _0x118a69=this[_0x2d579c(0x9f)+_0x2d579c(0x159)];this[_0x2d579c(0x1a5)]['x']=_0x33ed12['ZqTMh'](_0x33ed12[_0x2d579c(0x106)](_0x33ed12[_0x2d579c(0x156)](this[_0x2d579c(0x1a5)]['x'],_0x33ed12[_0x2d579c(0x13e)](_0x118a69,0x206*-0xa+-0x1*0x2027+0x3464)),this[_0x2d579c(0xf5)+_0x2d579c(0x1c0)]),_0x118a69),this[_0x2d579c(0x1a5)]['y']=_0x33ed12[_0x2d579c(0x11e)](_0x33ed12[_0x2d579c(0x16f)](_0x33ed12[_0x2d579c(0x156)](this['scale']['y'],_0x33ed12['gxTpg'](_0x118a69,0x156b+-0x1d52+0x7e8)),this['_targetSca'+'leY']),_0x118a69),this[_0x2d579c(0x9f)+_0x2d579c(0x159)]--;}else this[_0x2d579c(0x1a5)]['x']=0x9*0x329+-0xb7b*-0x2+0x102*-0x33,this['scale']['y']=-0x1f*0x3a+0xda3+0x2f*-0x24;},Sprite_WeaknessPopup['prototype'][_0x255529(0xc2)+'ity']=function(){const _0x1dc775=_0x255529,_0x5ac300={'PTyQr':function(_0x2f171e,_0x4abbe5){return _0x2f171e>_0x4abbe5;},'qtqVH':function(_0x32e0a9,_0x2f4744){return _0x32e0a9>_0x2f4744;},'YLqDp':function(_0xbd72e5,_0x9990df){return _0xbd72e5/_0x9990df;},'cpScA':function(_0x4ab401,_0xa1a4e3){return _0x4ab401+_0xa1a4e3;},'smiho':function(_0x49cc67,_0x3e73c2){return _0x49cc67*_0x3e73c2;},'zSCDQ':function(_0x19553c,_0x2e34b9){return _0x19553c-_0x2e34b9;}};if(_0x5ac300[_0x1dc775(0x13a)](this[_0x1dc775(0xd7)+_0x1dc775(0x166)]--,-0xba7*-0x1+0x2240+-0x2de7))return;if(_0x5ac300[_0x1dc775(0x1aa)](this[_0x1dc775(0x1cd)+_0x1dc775(0x109)],-0x2545+-0x3e5*-0x8+0x61d)){const _0x21caa2=this[_0x1dc775(0x1cd)+_0x1dc775(0x109)];this[_0x1dc775(0x119)]=_0x5ac300[_0x1dc775(0xf2)](_0x5ac300['cpScA'](_0x5ac300[_0x1dc775(0x15b)](this['opacity'],_0x5ac300[_0x1dc775(0xb7)](_0x21caa2,-0xa1+-0x1a4+-0x61*-0x6)),0x249d+0xfb9*-0x2+-0x52b),_0x21caa2),this[_0x1dc775(0x1cd)+_0x1dc775(0x109)]--;}else{const _0x1faf11=this[_0x1dc775(0x181)];_0x1faf11&&(_0x1faf11[_0x1dc775(0x164)+'d'](this),this[_0x1dc775(0x175)]());}},VisuMZ[_0x255529(0x14c)+_0x255529(0x90)][_0x255529(0x188)+_0x255529(0x110)+_0x255529(0x146)+_0x255529(0x1c9)]=Spriteset_Battle[_0x255529(0x190)]['createBatt'+'leField'],Spriteset_Battle[_0x255529(0x190)][_0x255529(0x13b)+_0x255529(0x1bb)]=function(){const _0x120dd1=_0x255529;VisuMZ[_0x120dd1(0x14c)+_0x120dd1(0x90)][_0x120dd1(0x188)+'Battle_cre'+_0x120dd1(0x146)+'ield']['call'](this),this[_0x120dd1(0x133)+'nessPopups'+_0x120dd1(0x13f)]();},Spriteset_Battle[_0x255529(0x190)][_0x255529(0x133)+_0x255529(0xa3)+'Container']=function(){const _0x2bca38=_0x255529,_0x531d4f={'ugqif':function(_0x127467,_0x567793){return _0x127467/_0x567793;},'qODrd':function(_0xf2b971,_0x12664f){return _0xf2b971-_0x12664f;},'lzsRy':function(_0x3d7f3d,_0x3b0fb4){return _0x3d7f3d/_0x3b0fb4;},'QMZaJ':function(_0xe2c4da,_0x4e5c8f){return _0xe2c4da-_0x4e5c8f;}};if(this[_0x2bca38(0x1af)+'opupsConta'+_0x2bca38(0x11c)])return;this[_0x2bca38(0x1af)+_0x2bca38(0xa5)+_0x2bca38(0x11c)]=new Sprite(),this['_weaknessP'+'opupsConta'+_0x2bca38(0x11c)]['x']=this[_0x2bca38(0x8e)+'ld']['x'],this[_0x2bca38(0x1af)+_0x2bca38(0xa5)+_0x2bca38(0x11c)]['y']=this['_battleFie'+'ld']['y'];const _0x2662e8=Math[_0x2bca38(0x169)](_0x531d4f[_0x2bca38(0x107)](_0x531d4f[_0x2bca38(0x122)](Graphics[_0x2bca38(0x183)],Graphics['boxWidth']),-0xeb+0x14*0xee+-0x11ab*0x1)),_0x30c879=Math[_0x2bca38(0x169)](_0x531d4f[_0x2bca38(0x14e)](_0x531d4f['QMZaJ'](Graphics[_0x2bca38(0x17f)],Graphics[_0x2bca38(0xd8)]),-0x186c+-0xe*-0x3d+-0x384*-0x6));this[_0x2bca38(0x1af)+_0x2bca38(0xa5)+_0x2bca38(0x11c)]['x']+=_0x2662e8,this['_weaknessP'+_0x2bca38(0xa5)+'iner']['y']+=_0x30c879,this[_0x2bca38(0x18f)](this[_0x2bca38(0x1af)+_0x2bca38(0xa5)+_0x2bca38(0x11c)]);},VisuMZ[_0x255529(0x14c)+'pups'][_0x255529(0x188)+'Battle_adj'+_0x255529(0x1ac)+_0x255529(0x184)+'d']=Spriteset_Battle[_0x255529(0x190)]['adjustFlip'+'pedBattlef'+_0x255529(0x1c9)],Spriteset_Battle[_0x255529(0x190)][_0x255529(0xd6)+_0x255529(0x15e)+_0x255529(0x1c9)]=function(){const _0x2ef072=_0x255529,_0x5e547b={'kAqAs':_0x2ef072(0x8b),'AlBTN':function(_0x1f2043,_0x51d5a0){return _0x1f2043+_0x51d5a0;}},_0x44cc53=_0x5e547b[_0x2ef072(0x1ae)][_0x2ef072(0xac)]('|');let _0x227c2f=-0x2f4+0x1*0x17da+-0x14e6;while(!![]){switch(_0x44cc53[_0x227c2f++]){case'0':this[_0x2ef072(0x1af)+'opupsConta'+_0x2ef072(0x11c)]['x']=_0x5e547b[_0x2ef072(0x1b1)](this[_0x2ef072(0x8e)+'ld']['x'],this['_battleFie'+'ld'][_0x2ef072(0x183)]);continue;case'1':if(!this[_0x2ef072(0xdd)]())return;continue;case'2':!this[_0x2ef072(0x1af)+_0x2ef072(0xa5)+_0x2ef072(0x11c)]&&this[_0x2ef072(0x133)+_0x2ef072(0xa3)+'Container']();continue;case'3':this[_0x2ef072(0x1af)+'opupsConta'+_0x2ef072(0x11c)][_0x2ef072(0x1a5)]['x']=-(0x10c+-0xe59+-0xd4e*-0x1);continue;case'4':VisuMZ['WeaknessPo'+'pups'][_0x2ef072(0x188)+'Battle_adj'+'ustFlipped'+_0x2ef072(0x184)+'d'][_0x2ef072(0x1c4)](this);continue;}break;}},VisuMZ[_0x255529(0x14c)+'pups']['Spriteset_'+'Battle_upd'+_0x255529(0xa6)]=Spriteset_Battle['prototype']['update'],Spriteset_Battle['prototype']['update']=function(){const _0x484538=_0x255529;VisuMZ['WeaknessPo'+_0x484538(0x90)][_0x484538(0x188)+_0x484538(0x15c)+_0x484538(0xa6)]['call'](this),this[_0x484538(0x98)+_0x484538(0xa3)+'Container']();},Spriteset_Battle[_0x255529(0x190)][_0x255529(0x98)+_0x255529(0xa3)+_0x255529(0x13f)]=function(){const _0x532daa=_0x255529,_0x11a218={'BhjhF':function(_0x41043b,_0x11a553){return _0x41043b/_0x11a553;},'cyyWO':function(_0x1b078f,_0x462212){return _0x1b078f-_0x462212;},'wmUYE':function(_0x15a1ad,_0x58959d){return _0x15a1ad-_0x58959d;}};if(!this[_0x532daa(0x1af)+_0x532daa(0xa5)+'iner'])return;if(!this['_damageCon'+'tainer'])return;this[_0x532daa(0x1af)+_0x532daa(0xa5)+'iner']['x']=this[_0x532daa(0x18e)+_0x532daa(0xf1)]['x'],this['_weaknessP'+_0x532daa(0xa5)+_0x532daa(0x11c)]['y']=this[_0x532daa(0x18e)+_0x532daa(0xf1)]['y'];if(!Imported['VisuMZ_3_A'+_0x532daa(0x94)+'a'])return;const _0x299630=Math[_0x532daa(0x169)](_0x11a218['BhjhF'](_0x11a218[_0x532daa(0x1ce)](Graphics[_0x532daa(0x183)],Graphics[_0x532daa(0xba)]),0x1e8a*0x1+0x1879+-0x3701)),_0x2bbcde=Math[_0x532daa(0x169)](_0x11a218[_0x532daa(0xeb)](_0x11a218[_0x532daa(0xea)](Graphics[_0x532daa(0x17f)],Graphics[_0x532daa(0xd8)]),-0x17ca+-0x24*-0x9+0x1688));this[_0x532daa(0x1af)+_0x532daa(0xa5)+_0x532daa(0x11c)]['x']+=_0x299630,this[_0x532daa(0x1af)+_0x532daa(0xa5)+_0x532daa(0x11c)]['y']+=_0x2bbcde;},Spriteset_Battle[_0x255529(0x190)][_0x255529(0x133)+_0x255529(0xd1)+'ype']=function(_0x4e670a,_0x5708ec){const _0xa434ba=_0x255529;if(!_0x4e670a)return;if(!this[_0xa434ba(0x1af)+'opupsConta'+_0xa434ba(0x11c)])return;const _0x39271f=this['getWeaknes'+'sPopupData'](_0x5708ec);if(!_0x39271f)return;if(!_0x39271f[_0xa434ba(0xa2)])return;this['createWeak'+_0xa434ba(0x12b)](_0x4e670a,_0x39271f);},VisuMZ[_0x255529(0x14c)+_0x255529(0x90)][_0x255529(0xe4)+'upSettings']=function(){const _0x49a9ee=_0x255529,_0x30408f={'fdFaL':'TEXT','aSOgW':_0x49a9ee(0x120),'BZatn':_0x49a9ee(0x185),'TjhDR':_0x49a9ee(0x124)+'\x201,\x201)'};return{'enabled':!![],'filename':'','text':_0x30408f[_0x49a9ee(0x17e)],'bitmapWidth':0x258,'bitmapHeight':0xc8,'fontFace':_0x30408f['aSOgW'],'fontSize':0x24,'fontBold':![],'fontItalic':![],'textColor':_0x30408f[_0x49a9ee(0x148)],'outlineSize':0x5,'outlineColor':_0x30408f[_0x49a9ee(0x10b)],'offsetX':0x0,'offsetY':0x0,'scaleDuration':0x14,'startScaleX':0x2,'startScaleY':0x2,'targetScaleX':0x1,'targetScaleY':0x1,'startSpeedX':0x0,'startSpeedY':0x0,'deltaSpeedX':0x0,'deltaSpeedY':0x0,'opaqueDuration':0x28,'fadeDuration':0x14};},Spriteset_Battle[_0x255529(0x190)]['getWeaknes'+_0x255529(0x1a9)]=function(_0x519a96){const _0x504271=_0x255529,_0x45621a={'nIuGg':function(_0x3c1528,_0x7d4a5d){return _0x3c1528===_0x7d4a5d;},'UzFzN':_0x504271(0x152)},_0x1b921a=VisuMZ['WeaknessPo'+_0x504271(0x90)][_0x504271(0xd3)];if(!_0x1b921a)return null;if(_0x45621a[_0x504271(0x18b)](_0x519a96,_0x45621a[_0x504271(0x1cb)]))return null;const _0x1e922e=_0x1b921a[_0x519a96];return _0x1e922e[_0x504271(0xe9)]=_0x519a96,_0x1e922e;},Spriteset_Battle[_0x255529(0x190)][_0x255529(0x133)+_0x255529(0x12b)]=function(_0x902ce5,_0xbbcf36){const _0x1878e7=_0x255529,_0x4feb4d={'dZGdV':function(_0x4d4605,_0x183212){return _0x4d4605===_0x183212;},'UEmRs':_0x1878e7(0x112),'pKtYb':function(_0x5e6206,_0x5d0510){return _0x5e6206/_0x5d0510;}};if(!_0x902ce5)return;if(!_0xbbcf36)return;if(!_0xbbcf36['enabled'])return;if(!this['_weaknessP'+'opupsConta'+_0x1878e7(0x11c)])return;if(!Imported[_0x1878e7(0xf7)+_0x1878e7(0x16a)]&&_0x902ce5[_0x1878e7(0x1a8)]()&&!$gameSystem[_0x1878e7(0x1c5)]())return;const _0x43786f=this[_0x1878e7(0x1b0)+_0x1878e7(0xbf)](_0x902ce5);if(!_0x43786f)return;const _0x4eee3a=new Sprite_WeaknessPopup(_0x43786f,_0xbbcf36),_0x42adae=this[_0x1878e7(0xe6)+_0x1878e7(0xfb)+_0x1878e7(0xd5)](_0x43786f);if(_0x4feb4d['dZGdV'](_0xbbcf36[_0x1878e7(0xe9)],_0x4feb4d[_0x1878e7(0xc7)])){const _0x2cd73c=Math[_0x1878e7(0x169)](_0x4feb4d[_0x1878e7(0xf9)](_0xbbcf36[_0x1878e7(0xe1)+'h'],0x14a1+-0x5*0x313+-0x53e)),_0x58c59a=Math[_0x1878e7(0x169)](_0x4feb4d[_0x1878e7(0xf9)](_0xbbcf36['bitmapHeig'+'ht'],0x2068+-0x1*0x50c+-0x1b5a));if(_0x42adae['children']['some'](_0xcf0188=>Math[_0x1878e7(0x14f)](_0xcf0188['x']-_0x4eee3a['x'])<_0x2cd73c&&Math[_0x1878e7(0x14f)](_0xcf0188['y']-_0x4eee3a['y'])<_0x58c59a)){const _0x86195a=Sprite_WeaknessPopup[_0x1878e7(0x1b4)+_0x1878e7(0xa8)+'T'];_0x4eee3a['x']+=_0x86195a[_0x1878e7(0x117)],_0x4eee3a['y']+=_0x86195a[_0x1878e7(0x172)];}}_0x42adae[_0x1878e7(0x18f)](_0x4eee3a);},Spriteset_Battle[_0x255529(0x190)][_0x255529(0xe6)+_0x255529(0xfb)+_0x255529(0xd5)]=function(_0x6dcfb9){const _0x3419ca=_0x255529;return!$gameSystem['isSideView']()&&_0x6dcfb9[_0x3419ca(0x108)][_0x3419ca(0x1a8)]()?SceneManager[_0x3419ca(0x1ab)][_0x3419ca(0x157)+'dow']['_weaknessP'+_0x3419ca(0x100)+_0x3419ca(0x149)]:this[_0x3419ca(0x1af)+_0x3419ca(0xa5)+_0x3419ca(0x11c)];},VisuMZ[_0x255529(0x14c)+_0x255529(0x90)][_0x255529(0xb1)+_0x255529(0x1b3)+_0x255529(0x125)+_0x255529(0x193)+'r']=Window_BattleStatus[_0x255529(0x190)][_0x255529(0x173)+_0x255529(0x195)+'er'],Window_BattleStatus['prototype'][_0x255529(0x173)+_0x255529(0x195)+'er']=function(){const _0x44dc4e=_0x255529;this['_createWea'+_0x44dc4e(0x1c6)+_0x44dc4e(0x13f)](),VisuMZ[_0x44dc4e(0x14c)+_0x44dc4e(0x90)]['Window_Bat'+_0x44dc4e(0x1b3)+_0x44dc4e(0x125)+_0x44dc4e(0x193)+'r']['call'](this);},Window_BattleStatus[_0x255529(0x190)][_0x255529(0xf8)+_0x255529(0x1c6)+_0x255529(0x13f)]=function(){const _0x842491=_0x255529;this[_0x842491(0x1af)+'opupContai'+'ner']=new Sprite(),this[_0x842491(0x18f)](this['_weaknessP'+_0x842491(0x100)+_0x842491(0x149)]);};