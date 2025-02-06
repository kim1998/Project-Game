//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.86;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.86] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Auto Save After New Game
 * 
 * Normally, when starting a new game through the "New Game" option, there is
 * no auto save trigger. However, if you start a new game or load a saved game,
 * then go to the Game End screen, return back to the title screen, then start
 * a New Game, the auto save trigger occurs when it shouldn't. The Core Engine
 * will now patch this and prevent the trigger from taking place.
 * 
 * ---
 * 
 * Battle Forced End Action Crash
 * 
 * Depending on various circumstances, currently active battlers can be cleared
 * from the battle system at will due to a number of reasons. However, if it
 * just so happens that the targets are cleared, too, with actions remaining,
 * then a crash will follow up. This plugin will prevent that change. Fix made
 * by Olivia.
 * 
 * ---
 * 
 * Debug Console Refresh Bug
 * 
 * When pressing F5 to refresh while the debug console (DevTools) is open,
 * some graphics will fail to load properly. This started occurring since the
 * RPG Maker MZ 1.5.0 update and the code for loading the images has now been
 * reverted to the 1.4.4 version where it was last stable.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Skill List Active After Party Member Change
 * 
 * If the skill list is active (ie. the player can move the cursor around) and
 * the party member currently being viewed is changed via the button commands,
 * then previously, RPG Maker MZ would still have that window be active despite
 * having the cursor hidden temporarily. Upon pressing direction buttons, the
 * cursor reveals itself and both the skill type window and skill list window
 * are both active, making way for lots of potential problems to happen.
 * 
 * ---
 * 
 * Sprite Removal and Destroy Crash
 * 
 * A texture check will now occur for sprites that are being removed and
 * destroyed in order to prevent crashes. In the off chance that someone
 * creates a sprite through a script call and removes it through such, the
 * likelihood of this occurance becomes higher. This makes the "destroy"
 * property take into account a texture check in order to see if the sprite
 * removal is taking extra steps and will reduce those extra steps.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Water Tile Bug
 * 
 * It seems like there's a new bug that occurs if you create a tileset from
 * scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 * does is it causes many tiles to become water tiles without intending to.
 * You can find this out by turning off all the plugins in your project,
 * putting a Ship or Boat on what are normally ground tiles, and then seeing
 * the Ship or Boat traverse through it.
 * 
 * There are two ways to fix this. We cannot fix it through code in this plugin
 * as it's a problem that involves the tileset json data there are ways to work
 * around it so that you can get the proper water-flags to go where they need
 * to be at.
 * 
 * 1. Copy a working un-bugged tileset onto the currently bugged one and
 *    reapply the tile features like passability, terrain tags, etc. This will
 *    make sure the water-passability tiles get copied over correctly.
 * 
 * 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *    un-bugged tileset (usually a pre-existing tileset when a new project is
 *    made), click the "Copy Page" button, go to the bugged tileset and press
 *    "Paste Page". You'll have to reapply any different properties like
 *    passabilities and terrain tags, but the water tile flags should now be
 *    working properly.
 * 
 * The plugin will not fix the problem itself since flag data is delicate and
 * should not be tampered with midgame as the changes made by the plugin might
 * not match the desired settings.
 * 
 * This plugin, however, will also send out an alert message when coming across
 * such a tile. Pay attention to it and do one of the following two steps above
 * to fix the problem.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
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
 * === Actors-Related Notetags ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes-Related Notetags ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies-Related Notetags ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations-Related Notetags ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life-Related Notetags ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 * 
 * <Scroll Lock X>
 * <Scroll Lock Y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - This will use the display nudge setting found in the Plugin Parameters.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 * 
 * <Scroll Lock X: x>
 * <Scroll Lock Y: y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present and will nudge the map camera slightly.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - Replace 'x' and 'y' with numbers between 0 and 1 to represent how much is
 *   being judged.
 *   - For example, for a 1280x720 resolution, a 27 tile wide map will benefit
 *     from a nudge of 0.15625. Play with these numbers to determine the best
 *     value for your maps.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 *
 * === Basic, X, and S Parameters-Related Notetags ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 * - This does NOT set the max cap to be lower than the default cap.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * 
 * ---
 * 
 * === Tileset-Related Notetags ===
 * 
 * ---
 * 
 * <Taller By x: id>
 * 
 * - Used for: Tileset Notetags
 * - Changes any page B, C, D, E tile marked by terrain tag 'id' to be taller
 *   by 'x' tiles.
 *   - Replace 'x' with a number representing the tiles to be taller by.
 *   - Replace 'id' with a number representing the Terrain Tag you will use to
 *     mark this tile with in the Database editor.
 * - When placing these tiles on the map, all you have to do is just place the
 *   bottom tile.
 *   - ie.: For a tree that's one tile taller, just place the tile at the
 *     bottom where you see the trunk.
 *   - Then, in-game, the tree will appear taller by one tile as marked.
 * - Depending on the priority settings, the tile will appear on different
 *   layers.
 *   - O will place the tile on the below player layer.
 *   - X will place the tile on the same level as the player.
 *   - ★ will place the tile on the above player layer.
 *   - O/X layer tiles have a special property where tall sprites standing in
 *     front of it will no longer clip the top of the sprite, while sprites
 *     standing behind it will be covered by it.
 *   - The X layer sprite will only have a hitbox of 1x1 at the base.
 * - This does not work with events using tiles as graphics. Instead, if you
 *   want to do similar, use the Event & Movement Core's <Tile Expand> notetags
 *   for better control.
 * 
 * ---
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <Grid>
 * <Battle Grid>
 * 
 * <No Grid>
 * <No Battle Grid>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Requires VisuMZ_2_BattleGridSystem!
 * - Changes the battle system to utilize the Battle Grid System or not.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * - If none of these notetags or comment tags are found, refer to the default
 *   settings found in the Plugin Parameters.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Audio Plugin Commands ===
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Volume
 * - Changes the current BGS volume without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Volume:
 *   - Change the current BGS's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pitch
 * - Changes the current BGS pitch without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pitch:
 *   - Change the current BGS's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pan
 * - Changes the current BGS pan without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pan:
 *   - Change the current BGS's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * === Debug Plugin Commands ===
 * 
 * ---
 * 
 * Debug: Current Controller ID
 * - PLAY TEST ONLY.
 * - Shows current controller ID in debug console.
 * - If you press a key on the keyboard, this data will be erased.
 * - Also copies to computer clipboard if possible.
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Rotate by Angle
 * - Rotates target picture by a amount angle over a set duration instead of
 *   continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Adjust Angle:
 *   - What is the angle you wish to rotate the picture by?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Rotate to Angle
 * - Rotates target picture to a certain angle over a set duration
 *   instead of continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Target Angle:
 *   - What is the target angle you wish to rotate the picture?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 * 
 * === Text Popup Command ===
 * 
 * ---
 * 
 * Text Popup: Show Text
 * - Adds text to a text popup window to briefly appear.
 * - Multiple text popups will be queued.
 * - Does not halt the game and works parallel to game activity.
 * 
 *   Text:
 *   - Write the text that you want to appear here.
 *   - You may use text codes.
 * 
 * ---
 * 
 * === Variable Plugin Commands ===
 * 
 * ---
 * 
 * Variable: JS Eval
 * - Pick a variable ID and value to alter through JS.
 * - Allows one line of code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 * 
 * Variable: JS Block
 * - Pick a variable ID and value to alter through JS.
 * - Allows JS block code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 * 
 *   CTRL + n: Quick Load:
 *   - CTRL + a number from 1 to 9 will yield a quick load of that safe file.
 *   - Does not count auto saves.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 *   Shift+R: Recover All:
 *   - For Play Test only!
 *   - During battle, pressing SHIFT + R will refill the whole party's HP
 *     and MP and status.
 * 
 *   Shift+T: Full TP
 *   - For Play Test only! 
 *   - During battle, pressing SHIFT + T will refill the whole party's TP.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 * 
 * Picture-Related
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 * 
 *   Picture Containers > Detach in Battle:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the battle scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 *   Picture Containers > Detach in Map:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the map scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 * 
 *   Map Name Text Code:
 *   - If on, map names will use text codes.
 *   - If off, only the raw map name will be used.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 * 
 *   Shortcut Scripts:
 *   - Enables shortcut-based script variables and functions that can be used
 *     for script calls.
 *   - Shortcut list enabled for this is as follows:
 * 
 *     $commonEvent(id)
 *     - Queues a common event.
 *     - This does not interrupt the current event to run the desired common
 *       event. Any queued common events will run after the current event list
 *       has finished.
 *     - Replace 'id' with the ID of the common event you wish to queue.
 *     - Common events only run in the map scene and battle scene.
 * 
 *     $onceParallel(id)
 *     - Runs a common event in the background as a once parallel event.
 *     - Once parallel events will run in the background like a parallel
 *       process, except that it does not repeat after finishing.
 *     - Replace 'id' with the ID of the common event you wish to run.
 *     - Only works in the map scene and battle scene. Battle scene usage will
 *       require VisuMZ_1_BattleCore.
 * 
 *     $scene
 *     - Returns current scene.
 * 
 *     $spriteset
 *     - Returns current scene's spriteset if there is one.
 * 
 *     $subject
 *     - Returns last recorded identity of the battle's subject/user.
 * 
 *     $targets
 *     - Returns last recorded targets marked in battle.
 * 
 *     $target
 *     - Returns last recorded target marked in battle.
 *     - If multiple targets are recorded, then the first of the recorded
 *       targets will be set for this variable.
 *     - Works better with VisuMZ_1_BattleCore.
 * 
 *     $event
 *     - Returns currently initiated map event.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Finish Entry:
 *   - Text used to describe finish entry.
 * 
 *   Page Change:
 *   - Text used to describe character page changing.
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 * 
 *   Blur Strength:
 *   - Strength used for menu background snapshots.
 *   - Default: 8. Higher is stronger. Lower is weaker.
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Split "Escape":
 *   - Used ONLY for those making their own custom keyboard key input maps.
 *   - "Split" option makes separate instances of "Cancel" and "Menu" keys.
 *   - "Don't" option will consolidate both into "Escape" keys.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Controller Button Assist Settings
 * ============================================================================
 *
 * These are sub-settings for the Button Assist Window Plugin Parameters. Where
 * the Button Assist Window Plugin Parameters are focused on keyboard entries,
 * these sections are focused on gamepad controllers.
 * 
 * Add multiple gamepads to the list to give them different button assist text.
 * If a gamepad is being used but not listed here, the button assist text will
 * default to the keyboard version.
 * 
 * For those looking for more information regarding controllers, visit this
 * site: https://gamepad-tester.com/
 *
 * ---
 *
 * ID Information
 * 
 *   Controller ID Name:
 *   - Exact string used for this controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - Example: Xbox 360 Controller (XInput STANDARD GAMEPAD)
 * 
 *   Similarity Match:
 *   - Partial string used to check for controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - This check occurs secondary to the exact name.
 *   - Example: Xbox
 *
 * ---
 *
 * Directions
 * 
 *   Up:
 *   Left:
 *   Right:
 *   Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * Actions
 * 
 *   OK:
 *   Cancel:
 *   Menu:
 *   Shift:
 *   Page Up:
 *   Page Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *   - *NOTE*: Controllers use a different mapping scheme from keyboards.
 *     - The "cancel" button is separate from the "menu" button though, for the
 *       majority of the button assist window help text, we'll be referring to
 *       the cancel button usually.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 * 
 *   Show Actor Level?:
 *   - Show the actor level when displaying actors?
 *   - Affects for most windows in-game.
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
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
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
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
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 * 
 * Maps
 * 
 *   Scroll Lock Small X?:
 *   Scroll Lock Small Y?:
 *   - Automatically scroll lock X/Y scrolling if the map is too small?
 *   - Useful for 1280x720 resolutions when the map is 27 tiles wide.
 *     - This will get rid of the subtle scrolling when moving from one half of
 *       the screen to the other.
 *   - This setting will be disabled if the map is zoomed in.
 * 
 *   Locked Display X?:
 *   Locked Display Y?:
 *   - What display X/Y value do you want for auto-scroll locked maps?
 *   - Use a number between 0 and 1 for best results.
 * 
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 * 
 *   State Icons Non-Frame:
 *   - Replace sprite frame system for non-frame.
 *   - Better for any instances where icons are zoomed.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 * 
 * These settings also allow you to add scroll bars to scrollable windows,
 * letting the player know how much of the window's contents there are left for
 * scrolling. The scroll bar can be enabled, disabled, have its thickness
 * changed, colors changed, etc.
 *
 * ---
 *
 * Window Defaults
 * 
 *   Enable Masking:
 *   - Enable window masking (windows hide other windows behind them)?
 *   - WARNING: Turning it on can obscure data.
 * 
 *   Correct Skin Bleed:
 *   - Allows you to enable/disable the window skin bleeding correction for
 *     those who wish to use the 95 calculator instead of 96 to augment higher
 *     and larger screen resolutions.
 *   - Read the "Bug Fixes" section if you don't understand what the window
 *     skin bleeding problem is.
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Scroll Bar
 * 
 *   Show Scroll Bar?:
 *   - Show the scroll bar for scrollable windows?
 * 
 *   Thickness:
 *   - How thick do you want the scroll bar to be?
 * 
 *   Offset:
 *   - How much do you want to offset the scroll bar by?
 * 
 *   Bar Body Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Opacity:
 *   - What opacity value do you want the off bar opacity to be?
 *   - Use a number between 0 and 255.
 * 
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
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
 * Version 1.86: January 16, 2025
 * * Bug Fixes!
 * ** Fixed an issue where certain icons were not aligning properly at
 *    different line height settings. Fix made by Olivia.
 * 
 * Version 1.85: October 17, 2024
 * * Feature Updates!
 * ** Updated to fit RPG Maker MZ's updated 1.8.1 version better.
 * 
 * Version 1.84: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New notetags added by Arisu:
 * *** Tileset Notetag: <Taller By x: id>
 * **** Changes any page B, C, D, E tile marked by terrain tag 'id' to be
 *      taller by 'x' tiles.
 * **** When placing these tiles on the map, all you have to do is just place
 *      the bottom tile.
 * ***** ie.: For a tree that's one tile taller, just place the tile at the
 *       bottom where you see the trunk. Then, in-game, the tree will appear
 *       taller by one tile as marked.
 * **** O/X layer tiles have a special property where tall sprites standing in
 *      front of it will no longer clip the top of the sprite, while sprites
 *      standing behind it will be covered by it.
 * **** This does not work with events using tiles as graphics. Instead, if
 *      you want to do similar, use the Event & Movement Core's <Tile Expand>
 *      notetags for better control.
 * 
 * Version 1.83: June 13, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated documentation for <param Max: x> notetag.
 * *** This does not set the max cap to be lower than the default cap.
 * * New Feature!
 * ** New Plugin Parameters added by Olivia:
 * *** Plugin Parameters > UI Settings > State Icons Non-Frame
 * **** Replace sprite frame system for non-frame.
 * **** Better for any instances where icons are zoomed.
 * 
 * Version 1.82: April 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added failsafe for $textPopup when some windows have not been initialized
 *    and requesting the text popup.
 * * New Feature!
 * ** New Plugin Parameter and playtest shortcut added by Arisu:
 * *** Plugin Parameters > QoL Settings > Playtest > CTRL + n: Quick Load
 * **** CTRL + a number from 1 to 9 will yield a quick load of that save file.
 * **** Does not count auto saves.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.81: February 15, 2024
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added for future plugin: VisuMZ_2_BattleGridSystem
 * *** <Grid>
 * *** <No Grid>
 * **** Requires the future plugin VisuMZ_2_BattleGridSystem!
 * **** Read the help section for more information on these.
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > Window > Correct Skin Bleed
 * **** Allows you to enable/disable the window skin bleeding correction for
 *      those who wish to use the 95 calculator instead of 96 to augment higher
 *      and larger screen resolutions.
 * **** Read the "Bug Fixes" section if you don't understand what the window
 *      skin bleeding problem is.
 * 
 * Version 1.80: January 18, 2024
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Auto Save After New Game
 * **** Normally, when starting a new game through the "New Game" option, there
 *      is no auto save trigger. However, if you start a new game or load a
 *      saved game, then go to the Game End screen, return back to the title
 *      screen, then start a New Game, the auto save trigger occurs when it
 *      shouldn't. The Core Engine will now patch this and prevent the trigger
 *      from taking place.
 * 
 * Version 1.79: November 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Plugin Command added by Arisu:
 * ** Text Popup: Show Text
 * *** Adds text to a text popup window to briefly appear.
 * *** Multiple text popups will be queued.
 * *** Does not halt the game and works parallel to game activity.
 * 
 * Version 1.78: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia and sponsored by AndyL:
 * *** QoL Settings > Battle Test > Shift+R: Recover All
 * **** For Play Test only! During battle, pressing SHIFT + R will refill the
 *      whole party's HP and MP and status.
 * *** QoL Settings > Battle Test > Shift+T: Full TP
 * **** For Play Test only! During battle, pressing SHIFT + T will refill the
 *      whole party's TP.
 * 
 * Version 1.77: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause the BGS related Plugin Commands to crash.
 *    Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Scroll-Linked Pictures now work if the image file are in a folder within
 *    the img/pictures/ folder without the folder needing a ! at the start.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Picture: Rotate by Angle
 * **** Rotates target picture by a amount angle over a set duration instead of
 *      continuously.
 * **** View help file for more information on the Plugin Command.
 * *** Picture: Rotate to Angle
 * **** Rotates target picture to a certain angle over a set duration instead
 *      of continuously.
 * **** View help file for more information on the Plugin Command.
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Menu Button Assist > General > Split "Escape":
 * **** Used ONLY for those making their own custom keyboard key input maps.
 * **** "Split" option makes separate instances of "Cancel" and "Menu" keys.
 * **** "Don't" option will consolidate both into "Escape" keys.
 * 
 * Version 1.76: June 15, 2023
 * * Bug Fixes!
 * ** Fixed a bug that displayed the incorrect button press key for name input
 *    processing's cancel action. Fix made by Olivia.
 * 
 * Version 1.75: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** In Scene_Name, when using the Keyboard Input, the button assist windows
 *    will no longer display the keyboard shortcuts for Ok and Cancel, but
 *    instead, show them for ENTER and BKSP. Update made by Arisu.
 * ** In Scene_Name, when manual inputting, the Page Up/Dn keys are now
 *    displayed to show changing character pages.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by AndyL:
 * *** Params > Keyboard Input > Button Assist > Finish Entry
 * **** Text used to describe finish entry.
 * *** Params > Keyboard Input > Button Assist > Page Change
 * **** Text used to describe changing character pages.
 * *** Params > Window Settings > Scroll Bar
 * **** These settings also allow you to add scroll bars to scrollable windows,
 *      letting the player know how much of the window's contents there are
 *      left for scrolling. The scroll bar can be enabled, disabled, have its
 *      thickness changed, colors changed, etc.
 * 
 * Version 1.74: February 16, 2023
 * * Compatibility Update!
 * ** Plugin Commands for: Audio: Change Current BGM/BGS Volume/Pitch/Pan
 *    should now work properly with the updated RPG Maker MZ version and
 *    WebAudio changes. Update made by Arisu.
 * 
 * Version 1.73: January 20, 2023
 * * Compatibility Update!
 * ** Added better Effekseer version compatibility.
 * 
 * Version 1.72: December 15, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Skill List Active After Party Member Change
 * **** If the skill list is active (ie. the player can move the cursor around)
 *      and the party member currently being viewed is changed via the button
 *      commands, then previously, RPG Maker MZ would still have that window be
 *      active despite having the cursor hidden temporarily. Upon pressing
 *      direction buttons, the cursor reveals itself and both the skill type
 *      window and skill list window are both active, making way for lots of
 *      potential problems to happen.
 * ** Water Tile Bug
 * *** It seems like there's a new bug that occurs if you create a tileset from
 *     scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 *     does is it causes many tiles to become water tiles without intending to.
 *     You can find this out by turning off all the plugins in your project,
 *     putting a Ship or Boat on what are normally ground tiles, and then
 *     seeing the Ship or Boat traverse through it.
 * *** There are two ways to fix this. We cannot fix it through code in this
 *     plugin as it's a problem that involves the tileset json data there are
 *     ways to work around it so that you can get the proper water-flags to go
 *     where they need to be at.
 * **** 1. Copy a working un-bugged tileset onto the currently bugged one and
 *      reapply the tile features like passability, terrain tags, etc. This
 *      will make sure the water-passability tiles get copied over correctly.
 * **** 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *      un-bugged tileset (usually a pre-existing tileset when a new project is
 *      made), click the "Copy Page" button, go to the bugged tileset and press
 *      "Paste Page". You'll have to reapply any different properties like
 *      passabilities and terrain tags, but the water tile flags should now be
 *      working properly.
 * *** The plugin will not fix the problem itself since flag data is delicate
 *     and should not be tampered with midgame as the changes made by the
 *     plugin might not match the desired settings.
 * *** This plugin, however, will also send out an alert message when coming
 *     across such a tile. Pay attention to it and do one of the following two
 *     steps above to fix the problem.
 * * Documentation Update!
 * ** Added "Skill List Active After Party Member Change" section to the
 *    "Important Changes: Bug Fixes" section of the help file.
 * ** Added "Water Tile Bug" section to the "Important Changes: Bug Fixes"
 *    section of the help file.
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Menu Backgrounds > Blur Strength
 * **** Strength used for menu background snapshots.
 * 
 * Version 1.71: November 10, 2022
 * * Bug Fixes!
 * ** Title Command Window should now allow for more than 4 custom commands
 *    without hidden commands. Fix made by Irina.
 * ** Fixed a problem with repeating animations from Visual State Effects
 *    causing softlocks. Fix made by Olivia.
 * 
 * Version 1.70: October 6, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** A texture check will now occur for sprites that are being removed and
 *     destroyed in order to prevent crashes. In the off chance that someone
 *     creates a sprite through a script call and removes it through such, the
 *     likelihood of this occurance becomes higher. This makes the destroy
 *     property take into account a texture check in order to see if the sprite
 *     removal is taking extra steps and will reduce those extra steps.
 * * Documentation Update!
 * ** Added "Sprite Removal and Destroy Crash" section to the "Important
 *    Changes: Bug Fixes" section.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.69: September 8, 2022
 * * Bug Fixes!
 * ** Fixed the combination of Button Assist Location: Top with Help Location:
 *    Bottom combination not working properly. Fix made by Irina.
 * 
 * Version 1.68: August 4, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Olivia and sponsored by Archeia:
 * *** Audio: Change Current BGM Volume
 * *** Audio: Change Current BGM Pitch
 * *** Audio: Change Current BGM Pan
 * *** Audio: Change Current BGS Volume
 * *** Audio: Change Current BGS Pitch
 * *** Audio: Change Current BGS Pan
 * **** Changes the current BGM/BGS volume/pitch/pan without changing any of
 *      the current BGM/BGS's other properties and without restarting BGM/BGS.
 * 
 * Version 1.67: July 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added notes for Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * *** This setting will be disabled if the map is zoomed in.
 * * New Features!
 * ** New map notetags added by Irina and sponsored by AndyL:
 * *** <Scroll Lock X>
 * *** <Scroll Lock X: x>
 * *** <Scroll Lock Y>
 * *** <Scroll Lock Y: y>
 * **** Causes the map to not scroll left/right(x) or up/down(y). Useful for
 *      when maps are just slightly smaller than normal and the tiny scrolling
 *      is distracting.
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small X?
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small Y?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display X?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display Y?
 * **** Automatically scroll locks small maps to prevent them from scrolling
 *      horizontally/vertically. Useful for 1280x720 resolutions when the map
 *      is 27 tiles wide. This will get rid of the subtle scrolling when moving
 *      from one half of the screen to the other.
 * **** This setting will be disabled if the map is zoomed in.
 * * Feature Update!
 * ** Warnings added to Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 * Version 1.66: July 14, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Debug Console Refresh Bug
 * **** When pressing F5 to refresh while the debug console (DevTools) is open,
 *      some graphics will fail to load properly. This started occurring since
 *      the RPG Maker MZ 1.5.0 update and the code for loading the images has
 *      now been reverted to the 1.4.4 version where it was last stable.
 * * Documentation Update!
 * ** Help file updated for new major bug fix.
 * 
 * Version 1.65: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Parameter Settings > Show Actor Level?
 * **** Show the actor level when displaying actors?
 * **** Used for most windows in-game.
 * 
 * Version 1.64: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Debug: Current Controller ID
 * **** PLAY TEST ONLY. Shows current controller ID in debug console.
 * **** Also copies to computer clipboard if possible.
 * ** New Plugin Parameters made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Subsettings for Button Assist Window: Controller Button Assist
 * **** These are sub-settings for the Button Assist Window Plugin Parameters.
 *      Where the Button Assist Window Plugin Parameters are focused on
 *      keyboard entries, these sections are focused on gamepad controllers.
 * **** Add multiple gamepads to the list to give them different button assist
 *      text. If a gamepad is being used but not listed here, the button assist
 *      text will default to the keyboard version.
 * 
 * Version 1.63: May 2, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > QoL Settings > Misc > Map Name Text Code
 * **** If on, map names will use text codes.
 * **** If off, only the raw map name will be used.
 * * Feature Update!
 * ** The map name text code change will no longer be on forcefully. It is now
 *    something that can be toggled by Plugin Parameters. Update by Irina.
 * 
 * Version 1.62: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu and sponsored by Archeia:
 * *** Variable: JS Eval
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows one line of code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * *** Variable: JS Block
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows JS block code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * ** Map names can now use text codes. Made by Arisu and sponsored by Archeia.
 * 
 * Version 1.61: April 21, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Battle Forced End Action Crash
 * **** Depending on various circumstances, currently active battlers can be
 *      cleared from the battle system at will due to a number of reasons.
 *      However, if it just so happens that the targets are cleared, too, with
 *      actions remaining, then a crash will follow up. This plugin will
 *      prevent that change. Fix made by Olivia.
 * 
 * Version 1.60: April 14, 2022
 * * Bug Fixes!
 * ** Number Input window will now respond to Home/End keys properly.
 *    Fix made by Olivia.
 * 
 * Version 1.59: April 7, 2022
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.4 compatibility update!
 * *** "Shutdown" command should now be more compatible with other aspects of
 *     the client when running from Node JS client on other OS's.
 * 
 * Version 1.58: March 24, 2022
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.57: March 3, 2022
 * * Compatibility Update!
 * ** The "Shutdown" command from the title screen should now be compatible
 *    with RPG Maker MZ 1.4.4 and up. Update made by Olivia.
 * 
 * Version 1.56: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Arisu and sponsored by Anon:
 * *** Plugin Parameters > QoL > Misc > Shortcut Scripts
 * **** Enables shortcut-based script variables and functions that can be used
 *      for script calls.
 * **** Shortcut list enabled for this is as follows:
 * ***** $commonEvent(id), $onceParallel(id), $scene, $spriteset, $subject, 
 *       $targets, $target, $event
 * ***** For more information on how to use them, review the help file.
 * 
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 * 
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Animation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Audio
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmVolume
 * @text Audio: Change Current BGM Volume
 * @desc Changes the current BGM volume without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGM's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPitch
 * @text Audio: Change Current BGM Pitch
 * @desc Changes the current BGM pitch without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGM's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPan
 * @text Audio: Change Current BGM Pan
 * @desc Changes the current BGM pan without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGM's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsVolume
 * @text Audio: Change Current BGS Volume
 * @desc Changes the current BGS volume without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGS's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPitch
 * @text Audio: Change Current BGS Pitch
 * @desc Changes the current BGS pitch without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGS's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPan
 * @text Audio: Change Current BGS Pan
 * @desc Changes the current BGS pan without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGS's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Debug
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DebugConsoleLastControllerID
 * @text Debug: Current Controller ID
 * @desc PLAY TEST ONLY. Shows current controller ID in debug console.
 * Also copies to computer clipboard if possible.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Export
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Game
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Gold
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold. You may use JS.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Map
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotateBy
 * @text Picture: Rotate By Angle
 * @desc Rotates target picture by a amount angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg AdjustAngle:eval
 * @text Adjust Angle
 * @desc What is the angle you wish to rotate the picture by?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotate
 * @text Picture: Rotate to Angle
 * @desc Rotates target picture to a certain angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg TargetAngle:eval
 * @text Target Angle
 * @desc What is the target angle you wish to rotate the picture?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ScreenShake
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Switch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_TextPopup
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TextPopupShow
 * @text Text Popup: Show Text
 * @desc Adds text to a text popup window to briefly appear.
 * Multiple text popups will be queued.
 *
 * @arg text:json
 * @text Text
 * @type note
 * @desc Write the text that you want to appear here.
 * You may use text codes.
 * @default "Insert message here."
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Variable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableEvalReference
 * @text Variable: JS Eval
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:eval
 * @text Variable ID
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 1
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:eval
 * @text Operand Modifier
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableJsBlock
 * @text Variable: JS Block
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:func
 * @text Variable ID
 * @type note
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet varID = 1;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn varID;"
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:func
 * @text Operand Modifier
 * @type note
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet value = 0;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn value;"
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
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
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","BattleTest":"","BTestItems:eval":"true","BTestWeapons:eval":"true","BTestArmors:eval":"true","BTestAddedQuantity:num":"90","ShiftR_Toggle:eval":"true","ShiftT_Toggle:eval":"true","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Pictures":"","AntiZoomPictures:eval":"true","PictureContainers":"","DetachBattlePictureContainer:eval":"false","DetachMapPictureContainer:eval":"false","Misc":"","AnimationMirrorOffset:eval":"false","AutoStretch:str":"default","FontShadows:eval":"false","FontSmoothing:eval":"true","FontWidthFix:eval":"true","KeyItemProtect:eval":"true","MapNameTextCode:eval":"true","ModernControls:eval":"true","MvAnimationRate:num":"4","NewGameCommonEventAll:num":"0","NoTileShadows:eval":"false","PixelateImageRendering:eval":"false","RequireFocus:eval":"false","ShortcutScripts:eval":"true","SmartEventCollisionPriority:eval":"true","SubfolderParse:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param ControllerButtons:arraystruct
 * @text Controller Button Assist
 * @parent ButtonAssist:struct
 * @type struct<ControllerButtons>[]
 * @desc Make different icons appear for the Button Assist window when using different controllers.
 * @default []
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Maps":"","AutoScrollLockX:eval":"true","AutoScrollLockY:eval":"true","DisplayLockX:num":"0.15625","DisplayLockY:num":"0.00000","Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4","ScrollBar":"","ShowScrollBar:eval":"true","BarThickness:num":"2","BarOffset:num":"+2","BarBodyColor:str":"0","OffBarColor:str":"7","OffBarOpacity:num":"128","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","TextPopup":"","DurationPerChat:num":"1.5","MinDuration:num":"90","MaxDuration:num":"300"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomBetween(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param CtrlQuickLoad:eval
 * @text CTRL + n: Quick Load
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc CTRL + a number from 1 to 9 will yield a quick load of
 * that safe file. Does not count auto saves.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param ShiftR_Toggle:eval
 * @text Shift+R: Recover All
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + R will refill the whole party's HP and MP and status.
 * @default true
 *
 * @param ShiftT_Toggle:eval
 * @text Shift+T: Full TP
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + T will refill the whole party's TP.
 * @default true
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Pictures
 * @text Picture-Related
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Pictures
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 * 
 * @param PictureContainers
 * @text Picture Containers
 * @parent Pictures
 *
 * @param DetachBattlePictureContainer:eval
 * @text Detach in Battle
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the battle scene.
 * @default false
 *
 * @param DetachMapPictureContainer:eval
 * @text Detach in Map
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the map scene.
 * @default false
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param MapNameTextCode:eval
 * @text Map Name Text Code
 * @parent Misc
 * @type boolean
 * @on Text Codes
 * @off Raw Text
 * @desc If on, map names will use text codes.
 * If off, only the raw map name will be used.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param ShortcutScripts:eval
 * @text Shortcut Scripts
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables shortcut-based scripts.
 * View the helpfile for more information.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Finish:str
 * @text Finish Entry
 * @parent ButtonAssist
 * @desc Text used to describe finish entry.
 * @default Finish
 * 
 * @param PageChange:str
 * @text Page Change
 * @parent ButtonAssist
 * @desc Text used to describe character page changing.
 * @default Page
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 * 
 * @param BlurStrength:num
 * @text Blur Strength
 * @desc Strength used for menu background snapshots.
 * Default: 8. Higher is stronger. Lower is weaker.
 * @default 8
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SplitEscape:eval
 * @text Split "Escape"
 * @parent General
 * @type boolean
 * @on Split
 * @off Don't
 * @desc "Split" makes separate instances of "Cancel" and "Menu".
 * "Don't" will consolidate both into "Escape".
 * @default false
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Controller Buttons Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ControllerButtons:
 *
 * @param ID
 * @text ID Information
 *
 * @param Name:str
 * @text Controller ID Name
 * @parent ID
 * @desc Exact string used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 *
 * @param Match:str
 * @text Similarity Match
 * @parent ID
 * @desc Similar text used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 * 
 * @param Directions
 *
 * @param up:str
 * @text Up
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param left:str
 * @text Left
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param right:str
 * @text Right
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param down:str
 * @text Down
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 * 
 * @param Actions
 *
 * @param ok:str
 * @text OK
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param cancel:str
 * @text Cancel
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param menu:str
 * @text Menu
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param shift:str
 * @text Shift
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pageup:str
 * @text Page Up
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pagedown:str
 * @text Page Down
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param ShowActorLevel:eval
 * @text Show Actor Level?
 * @parent BasicParameters
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor level when displaying actors?
 * Affects for most windows in-game.
 * @default true
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param StateIconsNonFrame:eval
 * @text State Icons Non-Frame
 * @parent UIArea
 * @type boolean
 * @on Non-Frame
 * @off Normal
 * @desc Replace sprite frame system for non-frame.
 * Better for any instances where icons are zoomed.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param CorrectSkinBleeding:eval
 * @text Correct Skin Bleed
 * @parent WindowDefaults
 * @type boolean
 * @on Correct
 * @off Don't Correct
 * @desc Corrects window skin bleeding bug when used with higher
 * screen resolutions?
 * @default true
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36. Avoid using odd numbers.
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param ScrollBar
 * @text Scroll Bar
 *
 * @param ShowScrollBar:eval
 * @text Show Scroll Bar?
 * @parent ScrollBar
 * @type boolean
 * @on Show Scroll Bar
 * @off Don't Show
 * @desc Show the scroll bar for scrollable windows?
 * @default true
 *
 * @param BarThickness:num
 * @text Thickness
 * @parent ScrollBar
 * @type number
 * @min 1
 * @desc How thick do you want the scroll bar to be?
 * @default 2
 *
 * @param BarOffset:num
 * @text Offset
 * @parent ScrollBar
 * @desc How much do you want to offset the scroll bar by?
 * @default +2
 *
 * @param BarBodyColor:str
 * @text Bar Body Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param OffBarColor:str
 * @text Off Bar Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param OffBarOpacity:num
 * @text Off Bar Opacity
 * @parent ScrollBar
 * @type number
 * @min 1
 * @max 255
 * @desc What opacity value do you want the off bar opacity
 * to be? Use a number between 0 and 255.
 * @default 128
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No Backgrounds
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 *
 * @param TextPopup
 * @text Text Popup Window
 *
 * @param DurationPerChat:num
 * @text Duration Per Text
 * @parent TextPopup
 * @desc What is the increase in duration per text character?
 * @default 1.5
 *
 * @param MinDuration:num
 * @text Minimum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Minimum duration for window to stay on the screen.
 * @default 90
 *
 * @param MaxDuration:num
 * @text Maximum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Maximum duration for window to stay on the screen.
 * @default 300
 * 
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Maps
 * 
 * @param AutoScrollLockX:eval
 * @text Scroll Lock Small X?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock X scrolling if the map is too small?
 * @default true
 * 
 * @param AutoScrollLockY:eval
 * @text Scroll Lock Small Y?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock Y scrolling if the map is too small?
 * @default true
 * 
 * @param DisplayLockX:num
 * @text Locked Display X?
 * @parent Maps
 * @desc What display X value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.15625
 * 
 * @param DisplayLockY:num
 * @text Locked Display Y?
 * @parent Maps
 * @desc What display Y value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.00000
 * 
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x5ca092=_0xd91e;(function(_0x3bdc49,_0xbab2e3){const _0x520cde=_0xd91e,_0x39e444=_0x3bdc49();while(!![]){try{const _0x4426fd=-parseInt(_0x520cde(0x7b8))/0x1+parseInt(_0x520cde(0x356))/0x2*(parseInt(_0x520cde(0x5be))/0x3)+-parseInt(_0x520cde(0x5f3))/0x4+parseInt(_0x520cde(0x6a2))/0x5+-parseInt(_0x520cde(0x74c))/0x6+-parseInt(_0x520cde(0x792))/0x7*(parseInt(_0x520cde(0x3ec))/0x8)+parseInt(_0x520cde(0x976))/0x9;if(_0x4426fd===_0xbab2e3)break;else _0x39e444['push'](_0x39e444['shift']());}catch(_0x195ff0){_0x39e444['push'](_0x39e444['shift']());}}}(_0x18f6,0xf026b));var label=_0x5ca092(0x865),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x35efcd){const _0x29863f=_0x5ca092;return _0x35efcd['status']&&_0x35efcd['description'][_0x29863f(0x3f8)]('['+label+']');})[0x0];VisuMZ[label][_0x5ca092(0x225)]=VisuMZ[label][_0x5ca092(0x225)]||{},VisuMZ['ConvertParams']=function(_0x40b934,_0x3f3e82){const _0x3bcc6a=_0x5ca092;for(const _0x5ad785 in _0x3f3e82){if(_0x5ad785[_0x3bcc6a(0x345)](/(.*):(.*)/i)){const _0x135533=String(RegExp['$1']),_0x4695f8=String(RegExp['$2'])[_0x3bcc6a(0x351)]()[_0x3bcc6a(0x6d7)]();let _0x3ae1ff,_0x41a643,_0x479699;switch(_0x4695f8){case _0x3bcc6a(0x237):_0x3ae1ff=_0x3f3e82[_0x5ad785]!==''?Number(_0x3f3e82[_0x5ad785]):0x0;break;case'ARRAYNUM':_0x41a643=_0x3f3e82[_0x5ad785]!==''?JSON[_0x3bcc6a(0x414)](_0x3f3e82[_0x5ad785]):[],_0x3ae1ff=_0x41a643[_0x3bcc6a(0x20b)](_0x3bb583=>Number(_0x3bb583));break;case _0x3bcc6a(0x8bd):_0x3ae1ff=_0x3f3e82[_0x5ad785]!==''?eval(_0x3f3e82[_0x5ad785]):null;break;case'ARRAYEVAL':_0x41a643=_0x3f3e82[_0x5ad785]!==''?JSON['parse'](_0x3f3e82[_0x5ad785]):[],_0x3ae1ff=_0x41a643[_0x3bcc6a(0x20b)](_0x3a4bc4=>eval(_0x3a4bc4));break;case _0x3bcc6a(0x7b5):_0x3ae1ff=_0x3f3e82[_0x5ad785]!==''?JSON['parse'](_0x3f3e82[_0x5ad785]):'';break;case _0x3bcc6a(0x3be):_0x41a643=_0x3f3e82[_0x5ad785]!==''?JSON['parse'](_0x3f3e82[_0x5ad785]):[],_0x3ae1ff=_0x41a643[_0x3bcc6a(0x20b)](_0x5b111f=>JSON['parse'](_0x5b111f));break;case _0x3bcc6a(0x527):_0x3ae1ff=_0x3f3e82[_0x5ad785]!==''?new Function(JSON['parse'](_0x3f3e82[_0x5ad785])):new Function(_0x3bcc6a(0x6a7));break;case _0x3bcc6a(0x58a):_0x41a643=_0x3f3e82[_0x5ad785]!==''?JSON['parse'](_0x3f3e82[_0x5ad785]):[],_0x3ae1ff=_0x41a643['map'](_0x2420e2=>new Function(JSON[_0x3bcc6a(0x414)](_0x2420e2)));break;case _0x3bcc6a(0x543):_0x3ae1ff=_0x3f3e82[_0x5ad785]!==''?String(_0x3f3e82[_0x5ad785]):'';break;case'ARRAYSTR':_0x41a643=_0x3f3e82[_0x5ad785]!==''?JSON[_0x3bcc6a(0x414)](_0x3f3e82[_0x5ad785]):[],_0x3ae1ff=_0x41a643[_0x3bcc6a(0x20b)](_0x59f1e9=>String(_0x59f1e9));break;case _0x3bcc6a(0x71c):_0x479699=_0x3f3e82[_0x5ad785]!==''?JSON['parse'](_0x3f3e82[_0x5ad785]):{},_0x40b934[_0x135533]={},VisuMZ[_0x3bcc6a(0x8d0)](_0x40b934[_0x135533],_0x479699);continue;case _0x3bcc6a(0x76c):_0x41a643=_0x3f3e82[_0x5ad785]!==''?JSON[_0x3bcc6a(0x414)](_0x3f3e82[_0x5ad785]):[],_0x3ae1ff=_0x41a643['map'](_0x5825f0=>VisuMZ[_0x3bcc6a(0x8d0)]({},JSON['parse'](_0x5825f0)));break;default:continue;}_0x40b934[_0x135533]=_0x3ae1ff;}}return _0x40b934;},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x530)]=SceneManager[_0x5ca092(0x7c7)],SceneManager[_0x5ca092(0x7c7)]=function(){const _0x100111=_0x5ca092;VisuMZ[_0x100111(0x865)][_0x100111(0x530)][_0x100111(0x481)](this);if(Utils[_0x100111(0x61f)]>='1.4.4'){if(typeof nw===_0x100111(0x593))nw[_0x100111(0x539)]['quit']();}},(_0x285b1a=>{const _0x54edcb=_0x5ca092,_0x4c5b68=_0x285b1a['name'];for(const _0x1b528d of dependencies){if(!Imported[_0x1b528d]){alert(_0x54edcb(0x7eb)[_0x54edcb(0x7c2)](_0x4c5b68,_0x1b528d)),SceneManager[_0x54edcb(0x7c7)]();break;}}const _0x5e50eb=_0x285b1a[_0x54edcb(0x1f8)];if(_0x5e50eb['match'](/\[Version[ ](.*?)\]/i)){const _0x23d424=Number(RegExp['$1']);_0x23d424!==VisuMZ[label][_0x54edcb(0x1f2)]&&(alert(_0x54edcb(0x968)['format'](_0x4c5b68,_0x23d424)),SceneManager[_0x54edcb(0x7c7)]());}if(_0x5e50eb[_0x54edcb(0x345)](/\[Tier[ ](\d+)\]/i)){const _0x3f2386=Number(RegExp['$1']);_0x3f2386<tier?(alert(_0x54edcb(0x51b)[_0x54edcb(0x7c2)](_0x4c5b68,_0x3f2386,tier)),SceneManager[_0x54edcb(0x7c7)]()):tier=Math[_0x54edcb(0x8e4)](_0x3f2386,tier);}VisuMZ[_0x54edcb(0x8d0)](VisuMZ[label][_0x54edcb(0x225)],_0x285b1a[_0x54edcb(0x25d)]);})(pluginData),((()=>{const _0xf3ba5a=_0x5ca092;if(VisuMZ[_0xf3ba5a(0x865)]['Settings']['QoL']['SubfolderParse']??!![])for(const _0xf049ec in $plugins){const _0x58d577=$plugins[_0xf049ec];_0x58d577[_0xf3ba5a(0x7a5)][_0xf3ba5a(0x345)](/(.*)\/(.*)/i)&&(_0x58d577[_0xf3ba5a(0x7a5)]=String(RegExp['$2'][_0xf3ba5a(0x6d7)]()));}})()),PluginManager[_0x5ca092(0x549)](pluginData['name'],_0x5ca092(0x780),_0x40ba33=>{const _0x17aaf5=_0x5ca092;if(!SceneManager['_scene'])return;if(!SceneManager['_scene'][_0x17aaf5(0x5ab)])return;VisuMZ[_0x17aaf5(0x8d0)](_0x40ba33,_0x40ba33);const _0x15c102=Math[_0x17aaf5(0x75e)](_0x40ba33[_0x17aaf5(0x3c4)]),_0x14c669=Math[_0x17aaf5(0x75e)](_0x40ba33[_0x17aaf5(0x5e8)]);$gameTemp[_0x17aaf5(0x67a)](_0x15c102,_0x14c669,_0x40ba33[_0x17aaf5(0x946)],_0x40ba33['Mirror'],_0x40ba33[_0x17aaf5(0x1f0)]);}),PluginManager[_0x5ca092(0x549)](pluginData['name'],_0x5ca092(0x72b),_0x17c670=>{const _0x48ea21=_0x5ca092;VisuMZ[_0x48ea21(0x8d0)](_0x17c670,_0x17c670);const _0x4741c1=Math[_0x48ea21(0x75e)](_0x17c670[_0x48ea21(0x618)])[_0x48ea21(0x266)](0x0,0x64),_0x5a359b=AudioManager['_currentBgm'];_0x5a359b&&(_0x5a359b[_0x48ea21(0x618)]=_0x4741c1,_0x5a359b[_0x48ea21(0x632)]=AudioManager[_0x48ea21(0x319)][_0x48ea21(0x894)](),AudioManager[_0x48ea21(0x39a)](_0x5a359b),AudioManager[_0x48ea21(0x8f7)](_0x5a359b,_0x5a359b['pos']),AudioManager[_0x48ea21(0x319)][_0x48ea21(0x6ba)](_0x5a359b[_0x48ea21(0x632)]));}),PluginManager[_0x5ca092(0x549)](pluginData[_0x5ca092(0x7a5)],'AudioChangeBgmPitch',_0x625eb4=>{const _0x281438=_0x5ca092;VisuMZ[_0x281438(0x8d0)](_0x625eb4,_0x625eb4);const _0x59e8de=Math['round'](_0x625eb4[_0x281438(0x3b8)])['clamp'](0x32,0x96),_0x3592e1=AudioManager[_0x281438(0x36e)];_0x3592e1&&(_0x3592e1[_0x281438(0x3b8)]=_0x59e8de,_0x3592e1[_0x281438(0x632)]=AudioManager[_0x281438(0x319)]['seek'](),AudioManager[_0x281438(0x39a)](_0x3592e1),AudioManager[_0x281438(0x8f7)](_0x3592e1,_0x3592e1[_0x281438(0x632)]),AudioManager['_bgmBuffer']['_startPlaying'](_0x3592e1[_0x281438(0x632)]));}),PluginManager['registerCommand'](pluginData[_0x5ca092(0x7a5)],_0x5ca092(0x493),_0x4370ac=>{const _0x24e01e=_0x5ca092;VisuMZ[_0x24e01e(0x8d0)](_0x4370ac,_0x4370ac);const _0x3120c0=Math[_0x24e01e(0x75e)](_0x4370ac[_0x24e01e(0x41e)])[_0x24e01e(0x266)](-0x64,0x64),_0x16ddfe=AudioManager[_0x24e01e(0x36e)];_0x16ddfe&&(_0x16ddfe[_0x24e01e(0x41e)]=_0x3120c0,_0x16ddfe[_0x24e01e(0x632)]=AudioManager[_0x24e01e(0x319)][_0x24e01e(0x894)](),AudioManager[_0x24e01e(0x39a)](_0x16ddfe),AudioManager['playBgm'](_0x16ddfe,_0x16ddfe[_0x24e01e(0x632)]),AudioManager[_0x24e01e(0x319)][_0x24e01e(0x6ba)](_0x16ddfe[_0x24e01e(0x632)]));}),PluginManager[_0x5ca092(0x549)](pluginData['name'],'AudioChangeBgsVolume',_0xa8b1ff=>{const _0xcc756=_0x5ca092;VisuMZ[_0xcc756(0x8d0)](_0xa8b1ff,_0xa8b1ff);const _0x105e44=Math['round'](_0xa8b1ff[_0xcc756(0x618)])['clamp'](0x0,0x64),_0x500ae3=AudioManager['_currentBgs'];_0x500ae3&&(_0x500ae3[_0xcc756(0x618)]=_0x105e44,_0x500ae3[_0xcc756(0x632)]=AudioManager[_0xcc756(0x66e)]['seek'](),AudioManager[_0xcc756(0x220)](_0x500ae3),AudioManager[_0xcc756(0x5cb)](_0x500ae3,_0x500ae3['pos']),AudioManager['_bgsBuffer']['_startPlaying'](_0x500ae3[_0xcc756(0x632)]));}),PluginManager[_0x5ca092(0x549)](pluginData[_0x5ca092(0x7a5)],_0x5ca092(0x6b5),_0x4fe8a5=>{const _0x5d349f=_0x5ca092;VisuMZ[_0x5d349f(0x8d0)](_0x4fe8a5,_0x4fe8a5);const _0x8a781b=Math[_0x5d349f(0x75e)](_0x4fe8a5[_0x5d349f(0x3b8)])['clamp'](0x32,0x96),_0x29433f=AudioManager[_0x5d349f(0x899)];_0x29433f&&(_0x29433f['pitch']=_0x8a781b,_0x29433f['pos']=AudioManager['_bgsBuffer'][_0x5d349f(0x894)](),AudioManager[_0x5d349f(0x220)](_0x29433f),AudioManager[_0x5d349f(0x5cb)](_0x29433f,_0x29433f[_0x5d349f(0x632)]),AudioManager[_0x5d349f(0x66e)][_0x5d349f(0x6ba)](_0x29433f['pos']));}),PluginManager[_0x5ca092(0x549)](pluginData[_0x5ca092(0x7a5)],_0x5ca092(0x82e),_0x2b94c0=>{const _0x2e60c2=_0x5ca092;VisuMZ[_0x2e60c2(0x8d0)](_0x2b94c0,_0x2b94c0);const _0x577638=Math[_0x2e60c2(0x75e)](_0x2b94c0[_0x2e60c2(0x41e)])[_0x2e60c2(0x266)](-0x64,0x64),_0x3ab8ce=AudioManager[_0x2e60c2(0x899)];_0x3ab8ce&&(_0x3ab8ce['pan']=_0x577638,_0x3ab8ce[_0x2e60c2(0x632)]=AudioManager[_0x2e60c2(0x66e)][_0x2e60c2(0x894)](),AudioManager[_0x2e60c2(0x220)](_0x3ab8ce),AudioManager[_0x2e60c2(0x5cb)](_0x3ab8ce,_0x3ab8ce[_0x2e60c2(0x632)]),AudioManager[_0x2e60c2(0x66e)][_0x2e60c2(0x6ba)](_0x3ab8ce[_0x2e60c2(0x632)]));}),PluginManager['registerCommand'](pluginData['name'],'DebugConsoleLastControllerID',_0x19dc53=>{const _0x568998=_0x5ca092;if(!$gameTemp[_0x568998(0x4be)]())return;const _0x35d92c=Input['getLastUsedGamepadType']();console[_0x568998(0x212)](_0x35d92c);}),PluginManager['registerCommand'](pluginData[_0x5ca092(0x7a5)],_0x5ca092(0x5e1),_0x350128=>{const _0x537dc0=_0x5ca092;if(!$gameTemp[_0x537dc0(0x4be)]())return;if(!Utils[_0x537dc0(0x28c)]())return;SceneManager['_scene']['_active']=![],VisuMZ[_0x537dc0(0x865)]['ExportStrFromAllMaps']();}),PluginManager[_0x5ca092(0x549)](pluginData[_0x5ca092(0x7a5)],_0x5ca092(0x711),_0x53edda=>{const _0x592c57=_0x5ca092;if(!$gameTemp['isPlaytest']())return;if(!Utils['isNwjs']())return;SceneManager[_0x592c57(0x5b6)]['_active']=![],VisuMZ['CoreEngine'][_0x592c57(0x69b)]();}),PluginManager[_0x5ca092(0x549)](pluginData['name'],'ExportCurMapText',_0x5f1c1c=>{const _0x569770=_0x5ca092;if(!$gameTemp[_0x569770(0x4be)]())return;if(!Utils['isNwjs']())return;if(!$gameMap)return;if($gameMap['mapId']()<=0x0)return;VisuMZ[_0x569770(0x8d0)](_0x5f1c1c,_0x5f1c1c);const _0x106be6=_0x569770(0x783)[_0x569770(0x7c2)]($gameMap[_0x569770(0x785)]()[_0x569770(0x936)](0x3)),_0x4bbcd0=VisuMZ['CoreEngine'][_0x569770(0x295)]($gameMap[_0x569770(0x785)]());VisuMZ[_0x569770(0x865)]['ExportString'](_0x4bbcd0,_0x106be6,!![]);}),PluginManager['registerCommand'](pluginData['name'],'ExportCurTroopText',_0x4f1429=>{const _0x583844=_0x5ca092;if(!$gameTemp[_0x583844(0x4be)]())return;if(!Utils[_0x583844(0x28c)]())return;if(!$gameParty[_0x583844(0x8b3)]())return;VisuMZ[_0x583844(0x8d0)](_0x4f1429,_0x4f1429);const _0x1761f1=_0x583844(0x84e)['format']($gameTroop[_0x583844(0x2aa)][_0x583844(0x936)](0x4)),_0xb7c1ba=VisuMZ[_0x583844(0x865)][_0x583844(0x475)]($gameTroop[_0x583844(0x2aa)]);VisuMZ[_0x583844(0x865)][_0x583844(0x580)](_0xb7c1ba,_0x1761f1,!![]);}),VisuMZ[_0x5ca092(0x865)]['ExportString']=function(_0x289a30,_0x2e3c78,_0x223dfe){const _0x4f945e=_0x5ca092,_0x4a295a=require('fs');let _0x386428=_0x4f945e(0x23d)[_0x4f945e(0x7c2)](_0x2e3c78||'0');_0x4a295a[_0x4f945e(0x320)](_0x386428,_0x289a30,_0x110ef7=>{const _0x18ebe0=_0x4f945e;if(_0x110ef7)throw err;else _0x223dfe&&alert(_0x18ebe0(0x545)[_0x18ebe0(0x7c2)](_0x386428));});},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x85d)]=function(){const _0x21d79d=_0x5ca092,_0x3ed71f=[];for(const _0x27ceaf of $dataMapInfos){if(!_0x27ceaf)continue;_0x3ed71f[_0x21d79d(0x4a2)](_0x27ceaf['id']);}const _0x3ec6d1=_0x3ed71f[_0x21d79d(0x839)]*0x64+Math[_0x21d79d(0x2b4)](0x64);alert('Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)'[_0x21d79d(0x7c2)](_0x3ec6d1)),this[_0x21d79d(0x34d)]=[],this['_currentMap']=$dataMap;for(const _0x30ff76 of _0x3ed71f){VisuMZ[_0x21d79d(0x865)][_0x21d79d(0x5a3)](_0x30ff76);}setTimeout(VisuMZ['CoreEngine'][_0x21d79d(0x2ff)][_0x21d79d(0x2da)](this),_0x3ec6d1);},VisuMZ['CoreEngine'][_0x5ca092(0x5a3)]=function(_0x14104e){const _0x18f48d=_0x5ca092,_0x37facc=_0x18f48d(0x7b3)[_0x18f48d(0x7c2)](_0x14104e[_0x18f48d(0x936)](0x3)),_0x4f636c=new XMLHttpRequest(),_0x45bb88='data/'+_0x37facc;_0x4f636c[_0x18f48d(0x5b7)](_0x18f48d(0x548),_0x45bb88),_0x4f636c[_0x18f48d(0x7de)](_0x18f48d(0x92f)),_0x4f636c[_0x18f48d(0x80d)]=()=>this[_0x18f48d(0x913)](_0x4f636c,_0x14104e,_0x37facc,_0x45bb88),_0x4f636c['onerror']=()=>DataManager[_0x18f48d(0x259)](_0x18f48d(0x74f),_0x37facc,_0x45bb88),_0x4f636c[_0x18f48d(0x7fc)]();},VisuMZ['CoreEngine'][_0x5ca092(0x913)]=function(_0x411fb2,_0x568e60,_0x1f9345,_0x299a02){const _0xd2200e=_0x5ca092;$dataMap=JSON[_0xd2200e(0x414)](_0x411fb2['responseText']),DataManager[_0xd2200e(0x8d3)]($dataMap),this['_storedMapText'][_0x568e60]=VisuMZ[_0xd2200e(0x865)][_0xd2200e(0x295)](_0x568e60),$dataMap=this['_currentMap'];},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x2ff)]=function(){const _0x49798a=_0x5ca092,_0x3099ac=_0x49798a(0x393);this[_0x49798a(0x34d)][_0x49798a(0x912)](undefined)[_0x49798a(0x912)]('')[_0x49798a(0x912)](null);const _0x3551b3=this[_0x49798a(0x34d)][_0x49798a(0x63c)](_0x49798a(0x6e5))[_0x49798a(0x6d7)]();VisuMZ[_0x49798a(0x865)][_0x49798a(0x580)](_0x3551b3,_0x3099ac,!![]),SceneManager[_0x49798a(0x5b6)][_0x49798a(0x424)]=!![];},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x295)]=function(_0x4a1e77){const _0x262019=_0x5ca092;if(!$dataMap)return'';let _0xb41d21='█'['repeat'](0x46)+'\x0a\x0a',_0x4aebf9='═'['repeat'](0x46)+'\x0a\x0a',_0xcc0d71='';this['_commonEventLayers']=0x0;for(const _0x5a0bb5 of $dataMap['events']){if(!_0x5a0bb5)continue;let _0x1c30ed=_0x5a0bb5['id'],_0x49fe6d=_0x5a0bb5[_0x262019(0x7a5)],_0x4677ab=_0x5a0bb5[_0x262019(0x5a9)];for(const _0x36005f of _0x4677ab){const _0x32693c=_0x4677ab[_0x262019(0x877)](_0x36005f)+0x1;let _0x3ed864=_0x4aebf9+'《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a',_0x221b89=VisuMZ[_0x262019(0x865)][_0x262019(0x531)](_0x36005f[_0x262019(0x683)]);if(_0x221b89[_0x262019(0x839)]>0x0){if(_0xcc0d71['length']>0x0)_0xcc0d71+=_0x4aebf9+'\x0a\x0a\x0a\x0a\x0a';else{const _0x3f7e57=$dataMapInfos[_0x4a1e77][_0x262019(0x7a5)];_0xcc0d71+=_0xb41d21+_0x262019(0x3e6)[_0x262019(0x7c2)](_0x4a1e77,_0x3f7e57||_0x262019(0x973))+_0xb41d21;}_0xcc0d71+=_0x3ed864[_0x262019(0x7c2)](_0x1c30ed,_0x49fe6d,_0x32693c,_0x221b89);}}}return _0xcc0d71[_0x262019(0x839)]>0x0&&(_0xcc0d71+=_0x4aebf9),_0xcc0d71;},VisuMZ['CoreEngine'][_0x5ca092(0x69b)]=function(){const _0x44c0f0=_0x5ca092,_0x270068=$dataTroops[_0x44c0f0(0x839)]*0xa+Math[_0x44c0f0(0x2b4)](0xa);alert('Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)'['format'](_0x270068));const _0x33d79a=[];for(const _0x5cac1c of $dataTroops){if(!_0x5cac1c)continue;const _0x226583=_0x5cac1c['id'];_0x33d79a[_0x226583]=VisuMZ[_0x44c0f0(0x865)][_0x44c0f0(0x475)](_0x226583);}setTimeout(VisuMZ['CoreEngine'][_0x44c0f0(0x2b1)]['bind'](this,_0x33d79a),_0x270068);},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x475)]=function(_0x3eb1d7){const _0x2475c2=_0x5ca092;if(!$dataTroops[_0x3eb1d7])return'';let _0xdb65c0='█'[_0x2475c2(0x779)](0x46)+'\x0a\x0a',_0x1cb8be='═'[_0x2475c2(0x779)](0x46)+'\x0a\x0a',_0x330dc1='';this[_0x2475c2(0x8fc)]=0x0;const _0x2f353b=$dataTroops[_0x3eb1d7];let _0x1f2511=_0x2f353b[_0x2475c2(0x5a9)];for(const _0x1381d2 of _0x1f2511){const _0x1a4034=_0x1f2511['indexOf'](_0x1381d2)+0x1;let _0x14f66a=_0x1cb8be+'《《《\x20Page\x20%1\x20》》》\x0a%2\x0a',_0x2d50e4=VisuMZ['CoreEngine'][_0x2475c2(0x531)](_0x1381d2[_0x2475c2(0x683)]);_0x2d50e4['length']>0x0&&(_0x330dc1[_0x2475c2(0x839)]>0x0?_0x330dc1+=_0x1cb8be+'\x0a\x0a\x0a\x0a\x0a':_0x330dc1+=_0xdb65c0+_0x2475c2(0x2ee)[_0x2475c2(0x7c2)](_0x3eb1d7,_0x2f353b[_0x2475c2(0x7a5)]||_0x2475c2(0x973))+_0xdb65c0,_0x330dc1+=_0x14f66a[_0x2475c2(0x7c2)](_0x1a4034,_0x2d50e4));}return _0x330dc1[_0x2475c2(0x839)]>0x0&&(_0x330dc1+=_0x1cb8be),_0x330dc1;},VisuMZ['CoreEngine']['exportAllTroopStrings']=function(_0xf5f798){const _0x3645bc=_0x5ca092,_0x5b9bcf=_0x3645bc(0x23a);_0xf5f798[_0x3645bc(0x912)](undefined)[_0x3645bc(0x912)]('')[_0x3645bc(0x912)](null);const _0x24e757=_0xf5f798['join']('\x0a\x0a\x0a\x0a\x0a')['trim']();VisuMZ['CoreEngine'][_0x3645bc(0x580)](_0x24e757,_0x5b9bcf,!![]),SceneManager['_scene'][_0x3645bc(0x424)]=!![];},VisuMZ[_0x5ca092(0x865)]['ExtractStrFromList']=function(_0x2f7a76){const _0x153322=_0x5ca092;let _0x2a0217='\x0a'+'─'[_0x153322(0x779)](0x46)+'\x0a',_0x2db984='\x0a'+'┄'['repeat'](0x46)+'\x0a',_0x2712ef='';for(const _0x459084 of _0x2f7a76){if(!_0x459084)continue;if(_0x459084[_0x153322(0x1d8)]===0x65)_0x2712ef+=_0x2a0217+'\x0a',_0x2712ef+=_0x153322(0x645),_0x459084[_0x153322(0x25d)][0x4]!==''&&_0x459084[_0x153322(0x25d)][0x4]!==undefined&&(_0x2712ef+='【%1】\x0a'[_0x153322(0x7c2)](_0x459084['parameters'][0x4]));else{if(_0x459084[_0x153322(0x1d8)]===0x191)_0x2712ef+='%1\x0a'['format'](_0x459084[_0x153322(0x25d)][0x0]);else{if(_0x459084['code']===0x192)_0x2712ef+=_0x2a0217,_0x2712ef+=_0x153322(0x773)['format'](_0x2db984,_0x459084[_0x153322(0x25d)][0x0]+0x1,_0x459084[_0x153322(0x25d)][0x1]);else{if(_0x459084[_0x153322(0x1d8)]===0x193)_0x2712ef+=_0x2a0217,_0x2712ef+=_0x153322(0x4f3)[_0x153322(0x7c2)](_0x2db984);else{if(_0x459084[_0x153322(0x1d8)]===0x194)_0x2712ef+=_0x2a0217,_0x2712ef+=_0x153322(0x2d5)[_0x153322(0x7c2)](_0x2db984);else{if(_0x459084['code']===0x69)_0x2712ef+=_0x2a0217+'\x0a',_0x2712ef+='〘Scrolling\x20Text〙\x0a';else{if(_0x459084[_0x153322(0x1d8)]===0x6c)_0x2712ef+=_0x2a0217+'\x0a',_0x2712ef+=_0x153322(0x964)[_0x153322(0x7c2)](_0x459084['parameters'][0x0]);else{if(_0x459084[_0x153322(0x1d8)]===0x198)_0x2712ef+=_0x153322(0x774)[_0x153322(0x7c2)](_0x459084[_0x153322(0x25d)][0x0]);else{if(_0x459084[_0x153322(0x1d8)]===0x75){const _0xa0c243=$dataCommonEvents[_0x459084[_0x153322(0x25d)][0x0]];if(_0xa0c243&&this[_0x153322(0x8fc)]<=0xa){this[_0x153322(0x8fc)]++;let _0x3176e6=VisuMZ[_0x153322(0x865)][_0x153322(0x531)](_0xa0c243[_0x153322(0x683)]);_0x3176e6['length']>0x0&&(_0x2712ef+=_0x2a0217,_0x2712ef+=_0x2db984,_0x2712ef+=_0x153322(0x483)[_0x153322(0x7c2)](_0xa0c243['id'],_0xa0c243[_0x153322(0x7a5)]),_0x2712ef+=_0x2db984,_0x2712ef+=_0x3176e6,_0x2712ef+=_0x2db984,_0x2712ef+=_0x153322(0x2bd)[_0x153322(0x7c2)](_0xa0c243['id'],_0xa0c243[_0x153322(0x7a5)]),_0x2712ef+=_0x2db984),this['_commonEventLayers']--;}}}}}}}}}}}return _0x2712ef[_0x153322(0x839)]>0x0&&(_0x2712ef+=_0x2a0217),_0x2712ef;},PluginManager[_0x5ca092(0x549)](pluginData[_0x5ca092(0x7a5)],_0x5ca092(0x20f),_0x50bdcc=>{const _0x4038f1=_0x5ca092;VisuMZ[_0x4038f1(0x8d0)](_0x50bdcc,_0x50bdcc);const _0x449fcc=_0x50bdcc[_0x4038f1(0x850)];VisuMZ[_0x4038f1(0x95b)](_0x449fcc);}),PluginManager[_0x5ca092(0x549)](pluginData[_0x5ca092(0x7a5)],'GoldChange',_0x1c11c8=>{const _0x4fac0a=_0x5ca092;VisuMZ[_0x4fac0a(0x8d0)](_0x1c11c8,_0x1c11c8);const _0x59cc0f=_0x1c11c8[_0x4fac0a(0x4c3)]||0x0;$gameParty[_0x4fac0a(0x60e)](_0x59cc0f);}),PluginManager[_0x5ca092(0x549)](pluginData['name'],'MapOnceParallel',_0x3ed500=>{const _0x5dca4c=_0x5ca092;if(!SceneManager[_0x5dca4c(0x440)]())return;VisuMZ[_0x5dca4c(0x8d0)](_0x3ed500,_0x3ed500);const _0x173031=_0x3ed500[_0x5dca4c(0x248)];SceneManager[_0x5dca4c(0x5b6)][_0x5dca4c(0x50b)](_0x173031);}),PluginManager[_0x5ca092(0x549)](pluginData[_0x5ca092(0x7a5)],_0x5ca092(0x932),_0x11f7fc=>{const _0x129070=_0x5ca092;if(!$gameTemp[_0x129070(0x4be)]())return;if(!Utils[_0x129070(0x28c)]())return;VisuMZ[_0x129070(0x8d0)](_0x11f7fc,_0x11f7fc);const _0x161c22=_0x11f7fc[_0x129070(0x3b7)]||0x1;$gameTemp[_0x129070(0x83c)]=_0x161c22;}),PluginManager[_0x5ca092(0x549)](pluginData['name'],_0x5ca092(0x79d),_0x16589b=>{const _0x2a93e9=_0x5ca092;VisuMZ[_0x2a93e9(0x8d0)](_0x16589b,_0x16589b);const _0x9976ab=_0x16589b[_0x2a93e9(0x823)]||0x1,_0x4c9a71=_0x16589b[_0x2a93e9(0x6be)]||'Linear',_0x4efc63=$gameScreen['picture'](_0x9976ab);_0x4efc63&&_0x4efc63[_0x2a93e9(0x24f)](_0x4c9a71);}),PluginManager['registerCommand'](pluginData[_0x5ca092(0x7a5)],_0x5ca092(0x2f0),_0x53f55a=>{const _0x1a4e51=_0x5ca092;for(let _0x3e58f8=0x1;_0x3e58f8<=0x64;_0x3e58f8++){$gameScreen[_0x1a4e51(0x1ea)](_0x3e58f8);}}),PluginManager[_0x5ca092(0x549)](pluginData['name'],_0x5ca092(0x737),_0x87ebc9=>{const _0x32a720=_0x5ca092;VisuMZ['ConvertParams'](_0x87ebc9,_0x87ebc9);const _0x295427=Math[_0x32a720(0x667)](_0x87ebc9[_0x32a720(0x891)],_0x87ebc9['EndingID']),_0x553b4a=Math[_0x32a720(0x8e4)](_0x87ebc9[_0x32a720(0x891)],_0x87ebc9[_0x32a720(0x6c4)]);for(let _0x52ec40=_0x295427;_0x52ec40<=_0x553b4a;_0x52ec40++){$gameScreen['erasePicture'](_0x52ec40);}}),PluginManager[_0x5ca092(0x549)](pluginData[_0x5ca092(0x7a5)],'PictureRotateBy',_0x494c23=>{const _0x5c7693=_0x5ca092;VisuMZ[_0x5c7693(0x8d0)](_0x494c23,_0x494c23);const _0x130b64=Math[_0x5c7693(0x75e)](_0x494c23[_0x5c7693(0x3b7)])[_0x5c7693(0x266)](0x1,0x64),_0xa1f88e=-Number(_0x494c23[_0x5c7693(0x65a)]||0x0),_0x4b907f=Math[_0x5c7693(0x8e4)](_0x494c23['Duration']||0x0,0x0),_0x15df95=_0x494c23['easingType']||'Linear',_0x45e33e=_0x494c23[_0x5c7693(0x547)],_0x470e4c=$gameScreen[_0x5c7693(0x6ee)](_0x130b64);if(!_0x470e4c)return;_0x470e4c[_0x5c7693(0x7c6)](_0xa1f88e,_0x4b907f,_0x15df95);if(_0x45e33e){const _0x48d5b8=$gameTemp['getLastPluginCommandInterpreter']();if(_0x48d5b8)_0x48d5b8[_0x5c7693(0x2ce)](_0x4b907f);}}),PluginManager[_0x5ca092(0x549)](pluginData[_0x5ca092(0x7a5)],_0x5ca092(0x263),_0x13f0ec=>{const _0x3f22c5=_0x5ca092;VisuMZ[_0x3f22c5(0x8d0)](_0x13f0ec,_0x13f0ec);const _0xd16828=Math['round'](_0x13f0ec[_0x3f22c5(0x3b7)])[_0x3f22c5(0x266)](0x1,0x64),_0xec0e22=-Number(_0x13f0ec[_0x3f22c5(0x4ea)]||0x0),_0x1ad10c=Math[_0x3f22c5(0x8e4)](_0x13f0ec[_0x3f22c5(0x95e)]||0x0,0x0),_0x332b8c=_0x13f0ec[_0x3f22c5(0x6be)]||_0x3f22c5(0x33f),_0x476000=_0x13f0ec[_0x3f22c5(0x547)],_0x6f83a4=$gameScreen[_0x3f22c5(0x6ee)](_0xd16828);if(!_0x6f83a4)return;_0x6f83a4[_0x3f22c5(0x662)](_0xec0e22,_0x1ad10c,_0x332b8c);if(_0x476000){const _0xbef85=$gameTemp[_0x3f22c5(0x66b)]();if(_0xbef85)_0xbef85[_0x3f22c5(0x2ce)](_0x1ad10c);}}),PluginManager[_0x5ca092(0x549)](pluginData[_0x5ca092(0x7a5)],_0x5ca092(0x4bc),_0x1ba970=>{const _0x2f235e=_0x5ca092;VisuMZ['ConvertParams'](_0x1ba970,_0x1ba970);const _0x802455=Math[_0x2f235e(0x75e)](_0x1ba970[_0x2f235e(0x3b7)])[_0x2f235e(0x266)](0x1,0x64),_0x4637a6=_0x1ba970[_0x2f235e(0x225)],_0x16a49e=_0x4637a6[_0x2f235e(0x7e6)]['clamp'](0x0,0x1),_0xaa736a=Math[_0x2f235e(0x75e)](_0x4637a6[_0x2f235e(0x73e)]||0x0),_0x174605=Math[_0x2f235e(0x75e)](_0x4637a6['PositionY']||0x0),_0xc80fd1=Math[_0x2f235e(0x75e)](_0x4637a6[_0x2f235e(0x79a)]||0x0),_0x1b2c1d=Math[_0x2f235e(0x75e)](_0x4637a6[_0x2f235e(0x6c6)]||0x0),_0x438be1=Math[_0x2f235e(0x75e)](_0x4637a6[_0x2f235e(0x5db)])[_0x2f235e(0x266)](0x0,0xff),_0x11cebc=_0x4637a6[_0x2f235e(0x919)],_0x37ab32=_0x2f235e(0x68b),_0x272f71=_0x1ba970[_0x2f235e(0x937)]?_0x2f235e(0x937):_0x2f235e(0x446),_0x1a24eb=_0x37ab32[_0x2f235e(0x7c2)](_0x1ba970[_0x2f235e(0x2f9)],_0x272f71);$gameScreen[_0x2f235e(0x893)](_0x802455,_0x1a24eb,_0x16a49e,_0xaa736a,_0x174605,_0xc80fd1,_0x1b2c1d,_0x438be1,_0x11cebc);}),PluginManager[_0x5ca092(0x549)](pluginData['name'],'ScreenShake',_0x5791a4=>{const _0x5f2c1e=_0x5ca092;VisuMZ[_0x5f2c1e(0x8d0)](_0x5791a4,_0x5791a4);const _0x4844d5=_0x5791a4[_0x5f2c1e(0x6f2)]||_0x5f2c1e(0x64e),_0x4fc7a4=_0x5791a4[_0x5f2c1e(0x960)]['clamp'](0x1,0x9),_0x37d22a=_0x5791a4['Speed'][_0x5f2c1e(0x266)](0x1,0x9),_0x871f39=_0x5791a4[_0x5f2c1e(0x95e)]||0x1,_0x5ef3a7=_0x5791a4[_0x5f2c1e(0x547)];$gameScreen[_0x5f2c1e(0x3ac)](_0x4844d5),$gameScreen[_0x5f2c1e(0x2f3)](_0x4fc7a4,_0x37d22a,_0x871f39);if(_0x5ef3a7){const _0x34c95a=$gameTemp[_0x5f2c1e(0x66b)]();if(_0x34c95a)_0x34c95a[_0x5f2c1e(0x2ce)](_0x871f39);}}),PluginManager['registerCommand'](pluginData[_0x5ca092(0x7a5)],_0x5ca092(0x429),_0x203b12=>{const _0x102025=_0x5ca092;if($gameParty[_0x102025(0x8b3)]())return;VisuMZ[_0x102025(0x8d0)](_0x203b12,_0x203b12);const _0x44d6db=_0x203b12[_0x102025(0x25e)],_0x2dcae6=(_0x203b12[_0x102025(0x40f)]||0x0)/0x64;for(const _0x2e7a28 of _0x44d6db){const _0xf6d03c=Math[_0x102025(0x64e)]()<=_0x2dcae6;$gameSwitches[_0x102025(0x5dc)](_0x2e7a28,_0xf6d03c);}}),PluginManager['registerCommand'](pluginData['name'],'SwitchRandomizeRange',_0x2d5ce4=>{const _0x4d711c=_0x5ca092;if($gameParty[_0x4d711c(0x8b3)]())return;VisuMZ[_0x4d711c(0x8d0)](_0x2d5ce4,_0x2d5ce4);const _0x5ea9af=Math[_0x4d711c(0x667)](_0x2d5ce4[_0x4d711c(0x891)],_0x2d5ce4[_0x4d711c(0x6c4)]),_0x51e963=Math[_0x4d711c(0x8e4)](_0x2d5ce4['StartID'],_0x2d5ce4[_0x4d711c(0x6c4)]),_0x138f7b=(_0x2d5ce4[_0x4d711c(0x40f)]||0x0)/0x64;for(let _0x28f41a=_0x5ea9af;_0x28f41a<=_0x51e963;_0x28f41a++){const _0x43ce0a=Math[_0x4d711c(0x64e)]()<=_0x138f7b;$gameSwitches[_0x4d711c(0x5dc)](_0x28f41a,_0x43ce0a);}}),PluginManager[_0x5ca092(0x549)](pluginData[_0x5ca092(0x7a5)],_0x5ca092(0x8e8),_0x3155da=>{const _0x29a264=_0x5ca092;if($gameParty[_0x29a264(0x8b3)]())return;VisuMZ[_0x29a264(0x8d0)](_0x3155da,_0x3155da);const _0x3de7f8=_0x3155da[_0x29a264(0x25e)];for(const _0x56bddb of _0x3de7f8){const _0x4fb241=$gameSwitches[_0x29a264(0x4c3)](_0x56bddb);$gameSwitches['setValue'](_0x56bddb,!_0x4fb241);}}),PluginManager[_0x5ca092(0x549)](pluginData['name'],'SwitchToggleRange',_0x25366c=>{const _0xd3be4a=_0x5ca092;if($gameParty[_0xd3be4a(0x8b3)]())return;VisuMZ[_0xd3be4a(0x8d0)](_0x25366c,_0x25366c);const _0x14ebc5=Math[_0xd3be4a(0x667)](_0x25366c[_0xd3be4a(0x891)],_0x25366c[_0xd3be4a(0x6c4)]),_0x13fe07=Math['max'](_0x25366c['StartID'],_0x25366c['EndingID']);for(let _0x209418=_0x14ebc5;_0x209418<=_0x13fe07;_0x209418++){const _0x242138=$gameSwitches[_0xd3be4a(0x4c3)](_0x209418);$gameSwitches[_0xd3be4a(0x5dc)](_0x209418,!_0x242138);}}),PluginManager[_0x5ca092(0x549)](pluginData[_0x5ca092(0x7a5)],'SystemSetFontSize',_0x36d725=>{const _0x5693e0=_0x5ca092;VisuMZ[_0x5693e0(0x8d0)](_0x36d725,_0x36d725);const _0x128c3c=_0x36d725[_0x5693e0(0x615)]||0x1;$gameSystem['setMainFontSize'](_0x128c3c);}),PluginManager['registerCommand'](pluginData['name'],'SystemSetSideView',_0x1ae69d=>{const _0x187209=_0x5ca092;if($gameParty[_0x187209(0x8b3)]())return;VisuMZ[_0x187209(0x8d0)](_0x1ae69d,_0x1ae69d);const _0x1534d9=_0x1ae69d[_0x187209(0x615)];if(_0x1534d9[_0x187209(0x345)](/Front/i))$gameSystem[_0x187209(0x8b2)](![]);else _0x1534d9[_0x187209(0x345)](/Side/i)?$gameSystem[_0x187209(0x8b2)](!![]):$gameSystem[_0x187209(0x8b2)](!$gameSystem[_0x187209(0x74e)]());}),PluginManager[_0x5ca092(0x549)](pluginData[_0x5ca092(0x7a5)],_0x5ca092(0x37f),_0x1cd69f=>{const _0x19d329=_0x5ca092;if($gameParty[_0x19d329(0x8b3)]())return;VisuMZ[_0x19d329(0x8d0)](_0x1cd69f,_0x1cd69f);const _0x4ac0cb=[_0x19d329(0x5d4),_0x19d329(0x50a),'me','se'];for(const _0x5d39ba of _0x4ac0cb){const _0x240b7a=_0x1cd69f[_0x5d39ba],_0x50c2e9='%1/'[_0x19d329(0x7c2)](_0x5d39ba);for(const _0x327991 of _0x240b7a){AudioManager[_0x19d329(0x67b)](_0x50c2e9,_0x327991);}}}),PluginManager[_0x5ca092(0x549)](pluginData[_0x5ca092(0x7a5)],'SystemLoadImages',_0x294a96=>{const _0x2e38af=_0x5ca092;if($gameParty[_0x2e38af(0x8b3)]())return;VisuMZ['ConvertParams'](_0x294a96,_0x294a96);const _0x291b45=[_0x2e38af(0x7e7),_0x2e38af(0x731),_0x2e38af(0x846),'characters','enemies',_0x2e38af(0x423),'parallaxes','pictures',_0x2e38af(0x377),_0x2e38af(0x940),_0x2e38af(0x6e0),'tilesets','titles1','titles2'];for(const _0x33a4d0 of _0x291b45){const _0x12fdcd=_0x294a96[_0x33a4d0],_0x27b8c9=_0x2e38af(0x5dd)[_0x2e38af(0x7c2)](_0x33a4d0);for(const _0x4091d7 of _0x12fdcd){ImageManager[_0x2e38af(0x2d6)](_0x27b8c9,_0x4091d7);}}}),PluginManager[_0x5ca092(0x549)](pluginData[_0x5ca092(0x7a5)],'SystemSetBattleSystem',_0x4afb31=>{const _0xba9d2c=_0x5ca092;if($gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x4afb31,_0x4afb31);const _0x2d7842=_0x4afb31[_0xba9d2c(0x615)]['toUpperCase']()[_0xba9d2c(0x6d7)](),_0x5c0812=VisuMZ['CoreEngine'][_0xba9d2c(0x8bc)](_0x2d7842);$gameSystem[_0xba9d2c(0x1f5)](_0x5c0812);}),VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x8bc)]=function(_0x44e826){const _0x254c47=_0x5ca092;_0x44e826=_0x44e826||_0x254c47(0x3a7),_0x44e826=String(_0x44e826)[_0x254c47(0x351)]()['trim']();switch(_0x44e826){case'DTB':return 0x0;case _0x254c47(0x8ab):Imported['VisuMZ_1_OptionsCore']&&(ConfigManager[_0x254c47(0x305)]=!![]);return 0x1;case _0x254c47(0x35f):Imported[_0x254c47(0x886)]&&(ConfigManager['atbActive']=![]);return 0x2;case _0x254c47(0x2fd):if(Imported[_0x254c47(0x398)])return _0x254c47(0x2fd);break;case'STB':if(Imported['VisuMZ_2_BattleSystemSTB'])return _0x254c47(0x7d0);break;case _0x254c47(0x720):if(Imported[_0x254c47(0x76e)])return _0x254c47(0x720);break;case _0x254c47(0x485):if(Imported[_0x254c47(0x7db)])return'FTB';break;case _0x254c47(0x5bc):if(Imported['VisuMZ_2_BattleSystemOTB'])return _0x254c47(0x5bc);break;case _0x254c47(0x27a):if(Imported[_0x254c47(0x6a6)])return _0x254c47(0x27a);break;case _0x254c47(0x4c4):if(Imported[_0x254c47(0x902)])return _0x254c47(0x4c4);break;}return $dataSystem[_0x254c47(0x6d6)];},PluginManager[_0x5ca092(0x549)](pluginData[_0x5ca092(0x7a5)],_0x5ca092(0x7c4),_0x3b1cc9=>{VisuMZ['ConvertParams'](_0x3b1cc9,_0x3b1cc9);const _0x3011eb=_0x3b1cc9['option']||0x1;$gameSystem['setWindowPadding'](_0x3011eb);}),PluginManager[_0x5ca092(0x549)](pluginData[_0x5ca092(0x7a5)],_0x5ca092(0x38d),_0x367010=>{const _0x404878=_0x5ca092;VisuMZ[_0x404878(0x8d0)](_0x367010,_0x367010);const _0x4498e1=_0x367010[_0x404878(0x48d)]||'';$textPopup(_0x4498e1);}),PluginManager[_0x5ca092(0x549)](pluginData[_0x5ca092(0x7a5)],'VariableEvalReference',_0xf7586b=>{const _0xe4a373=_0x5ca092;VisuMZ[_0xe4a373(0x8d0)](_0xf7586b,_0xf7586b);const _0x327f64=_0xf7586b['id']||0x1,_0x14ce43=_0xf7586b[_0xe4a373(0x77d)],_0x3dedcd=_0xf7586b[_0xe4a373(0x65f)]||0x0;let _0x4d4e85=$gameVariables[_0xe4a373(0x4c3)](_0x327f64)||0x0;switch(_0x14ce43){case'=':_0x4d4e85=_0x3dedcd;break;case'+':_0x4d4e85+=_0x3dedcd;break;case'-':_0x4d4e85-=_0x3dedcd;break;case'*':_0x4d4e85*=_0x3dedcd;break;case'/':_0x4d4e85/=_0x3dedcd;break;case'%':_0x4d4e85%=_0x3dedcd;break;}_0x4d4e85=_0x4d4e85||0x0,$gameVariables[_0xe4a373(0x5dc)](_0x327f64,_0x4d4e85);}),PluginManager[_0x5ca092(0x549)](pluginData[_0x5ca092(0x7a5)],_0x5ca092(0x2cb),_0x654110=>{const _0x1e932c=_0x5ca092;VisuMZ[_0x1e932c(0x8d0)](_0x654110,_0x654110);const _0x7a97ae=_0x654110['id']()||0x1,_0xcf0d3a=_0x654110[_0x1e932c(0x77d)],_0x37b0bc=_0x654110[_0x1e932c(0x65f)]()||0x0;let _0x5ab61f=$gameVariables[_0x1e932c(0x4c3)](_0x7a97ae)||0x0;switch(_0xcf0d3a){case'=':_0x5ab61f=_0x37b0bc;break;case'+':_0x5ab61f+=_0x37b0bc;break;case'-':_0x5ab61f-=_0x37b0bc;break;case'*':_0x5ab61f*=_0x37b0bc;break;case'/':_0x5ab61f/=_0x37b0bc;break;case'%':_0x5ab61f%=_0x37b0bc;break;}_0x5ab61f=_0x5ab61f||0x0,$gameVariables[_0x1e932c(0x5dc)](_0x7a97ae,_0x5ab61f);}),VisuMZ['CoreEngine']['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x5ca092(0x923)][_0x5ca092(0x357)],Scene_Boot[_0x5ca092(0x923)]['onDatabaseLoaded']=function(){const _0x37ec7c=_0x5ca092;VisuMZ[_0x37ec7c(0x865)]['Scene_Boot_onDatabaseLoaded'][_0x37ec7c(0x481)](this),this['process_VisuMZ_CoreEngine_RegExp'](),this[_0x37ec7c(0x778)](),this[_0x37ec7c(0x45a)](),this[_0x37ec7c(0x28b)](),this[_0x37ec7c(0x816)](),this[_0x37ec7c(0x636)](),VisuMZ['ParseAllNotetags']();},VisuMZ['CoreEngine']['RegExp']={},Scene_Boot[_0x5ca092(0x923)]['process_VisuMZ_CoreEngine_RegExp']=function(){const _0x18e22d=_0x5ca092,_0x4aad27=['MAXHP','MAXMP',_0x18e22d(0x6d2),'DEF',_0x18e22d(0x6a4),_0x18e22d(0x836),'AGI',_0x18e22d(0x938)],_0x1862a0=[_0x18e22d(0x6f0),_0x18e22d(0x3bc),_0x18e22d(0x551),_0x18e22d(0x2dd),_0x18e22d(0x7d7),_0x18e22d(0x1f4),_0x18e22d(0x368),_0x18e22d(0x58c),_0x18e22d(0x8b0),_0x18e22d(0x870)],_0x2a20f6=['TGR',_0x18e22d(0x91a),'REC',_0x18e22d(0x92e),_0x18e22d(0x28a),_0x18e22d(0x782),_0x18e22d(0x5ea),_0x18e22d(0x747),_0x18e22d(0x323),'EXR'],_0x154296=[_0x4aad27,_0x1862a0,_0x2a20f6],_0x39c6e7=[_0x18e22d(0x63f),_0x18e22d(0x769),_0x18e22d(0x5f7),'Max',_0x18e22d(0x971),_0x18e22d(0x8ba),_0x18e22d(0x6d1),_0x18e22d(0x961),'Flat1',_0x18e22d(0x716)];for(const _0x41ba06 of _0x154296){let _0x524f4d='';if(_0x41ba06===_0x4aad27)_0x524f4d='param';if(_0x41ba06===_0x1862a0)_0x524f4d='xparam';if(_0x41ba06===_0x2a20f6)_0x524f4d=_0x18e22d(0x2c2);for(const _0x68fd61 of _0x39c6e7){let _0x58043c=_0x18e22d(0x63e)['format'](_0x524f4d,_0x68fd61);VisuMZ['CoreEngine']['RegExp'][_0x58043c]=[],VisuMZ[_0x18e22d(0x865)][_0x18e22d(0x8b5)][_0x58043c+'JS']=[];let _0x30e384=_0x18e22d(0x1cf);if([_0x18e22d(0x63f),_0x18e22d(0x961)][_0x18e22d(0x3f8)](_0x68fd61))_0x30e384+=_0x18e22d(0x5cd);else{if(['Plus1',_0x18e22d(0x6d9)][_0x18e22d(0x3f8)](_0x68fd61))_0x30e384+='([\x5c+\x5c-]\x5cd+)([%％])>';else{if([_0x18e22d(0x5f7),_0x18e22d(0x716)][_0x18e22d(0x3f8)](_0x68fd61))_0x30e384+=_0x18e22d(0x708);else{if(_0x68fd61===_0x18e22d(0x294))_0x30e384+='(\x5cd+)>';else{if(_0x68fd61===_0x18e22d(0x8ba))_0x30e384+=_0x18e22d(0x285);else _0x68fd61===_0x18e22d(0x6d1)&&(_0x30e384+=_0x18e22d(0x7a3));}}}}for(const _0x1c1e54 of _0x41ba06){let _0x13b43d=_0x68fd61[_0x18e22d(0x6ff)](/[\d+]/g,'')[_0x18e22d(0x351)]();const _0x2b152f=_0x30e384[_0x18e22d(0x7c2)](_0x1c1e54,_0x13b43d);VisuMZ['CoreEngine']['RegExp'][_0x58043c][_0x18e22d(0x4a2)](new RegExp(_0x2b152f,'i'));const _0x4ca875=_0x18e22d(0x39d)['format'](_0x1c1e54,_0x13b43d);VisuMZ[_0x18e22d(0x865)][_0x18e22d(0x8b5)][_0x58043c+'JS']['push'](new RegExp(_0x4ca875,'i'));}}}},Scene_Boot[_0x5ca092(0x923)]['process_VisuMZ_CoreEngine_Notetags']=function(){if(VisuMZ['ParseAllNotetags'])return;},Scene_Boot[_0x5ca092(0x923)][_0x5ca092(0x45a)]=function(){const _0x9eccbc=_0x5ca092,_0x753a40=VisuMZ[_0x9eccbc(0x865)][_0x9eccbc(0x225)];_0x753a40['QoL'][_0x9eccbc(0x7cd)]&&VisuMZ[_0x9eccbc(0x2c8)](!![]);_0x753a40[_0x9eccbc(0x656)][_0x9eccbc(0x856)]&&(Input['keyMapper'][0x23]='end',Input[_0x9eccbc(0x46e)][0x24]=_0x9eccbc(0x374));if(_0x753a40[_0x9eccbc(0x2d4)]){const _0x12a109=_0x753a40['ButtonAssist'];_0x12a109[_0x9eccbc(0x819)]=_0x12a109[_0x9eccbc(0x819)]||_0x9eccbc(0x1d4),_0x12a109[_0x9eccbc(0x8de)]=_0x12a109[_0x9eccbc(0x8de)]||_0x9eccbc(0x566);}_0x753a40[_0x9eccbc(0x633)]['WASD']&&(Input['keyMapper'][0x57]='up',Input[_0x9eccbc(0x46e)][0x41]=_0x9eccbc(0x841),Input[_0x9eccbc(0x46e)][0x53]=_0x9eccbc(0x621),Input[_0x9eccbc(0x46e)][0x44]=_0x9eccbc(0x254),Input['keyMapper'][0x45]=_0x9eccbc(0x256)),_0x753a40['KeyboardInput'][_0x9eccbc(0x47e)]&&(Input[_0x9eccbc(0x46e)][0x52]=_0x9eccbc(0x8af)),_0x753a40[_0x9eccbc(0x514)]['DisplayedParams']=_0x753a40['Param'][_0x9eccbc(0x847)]['map'](_0x4e9b9e=>_0x4e9b9e[_0x9eccbc(0x351)]()[_0x9eccbc(0x6d7)]()),_0x753a40[_0x9eccbc(0x514)][_0x9eccbc(0x76a)]=_0x753a40[_0x9eccbc(0x514)]['ExtDisplayedParams'][_0x9eccbc(0x20b)](_0x5da451=>_0x5da451[_0x9eccbc(0x351)]()[_0x9eccbc(0x6d7)]()),_0x753a40[_0x9eccbc(0x656)][_0x9eccbc(0x8f8)]=_0x753a40[_0x9eccbc(0x656)][_0x9eccbc(0x8f8)]??!![],_0x753a40[_0x9eccbc(0x656)][_0x9eccbc(0x643)]=_0x753a40[_0x9eccbc(0x656)][_0x9eccbc(0x643)]??!![];},Scene_Boot[_0x5ca092(0x923)][_0x5ca092(0x28b)]=function(){const _0x1394e5=_0x5ca092;this[_0x1394e5(0x6ad)]();},Scene_Boot[_0x5ca092(0x923)]['process_VisuMZ_CoreEngine_jsQuickFunctions']=function(){const _0x1f6721=_0x5ca092,_0x4612b5=VisuMZ[_0x1f6721(0x865)][_0x1f6721(0x225)][_0x1f6721(0x3af)];for(const _0x127177 of _0x4612b5){const _0x216535=_0x127177['FunctionName']['replace'](/[ ]/g,''),_0x5049aa=_0x127177[_0x1f6721(0x34e)];VisuMZ[_0x1f6721(0x865)][_0x1f6721(0x658)](_0x216535,_0x5049aa);}},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x658)]=function(_0x3c284b,_0x27c43f){const _0x48f08b=_0x5ca092;if(!!window[_0x3c284b]){if($gameTemp[_0x48f08b(0x4be)]())console['log'](_0x48f08b(0x410)[_0x48f08b(0x7c2)](_0x3c284b));}const _0x4d9755=_0x48f08b(0x8be)[_0x48f08b(0x7c2)](_0x3c284b,_0x27c43f);window[_0x3c284b]=new Function(_0x4d9755);},Scene_Boot[_0x5ca092(0x923)][_0x5ca092(0x816)]=function(){const _0x3d90f0=_0x5ca092,_0x2ae2c4=VisuMZ[_0x3d90f0(0x865)][_0x3d90f0(0x225)][_0x3d90f0(0x442)];if(!_0x2ae2c4)return;for(const _0x2a8907 of _0x2ae2c4){if(!_0x2a8907)continue;VisuMZ[_0x3d90f0(0x865)]['createCustomParameter'](_0x2a8907);}},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x3f0)]={},VisuMZ[_0x5ca092(0x865)]['CustomParamIcons']={},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x30b)]={},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x62a)]={},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x3cc)]=function(_0x31b1be){const _0x5ae993=_0x5ca092,_0x33ab50=_0x31b1be[_0x5ae993(0x31c)],_0x5eaf21=_0x31b1be[_0x5ae993(0x765)],_0x59d1b8=_0x31b1be[_0x5ae993(0x26d)],_0x2e175d=_0x31b1be[_0x5ae993(0x6f2)],_0x247e41=new Function(_0x31b1be[_0x5ae993(0x927)]);VisuMZ['CoreEngine'][_0x5ae993(0x3f0)][_0x33ab50[_0x5ae993(0x351)]()[_0x5ae993(0x6d7)]()]=_0x5eaf21,VisuMZ[_0x5ae993(0x865)][_0x5ae993(0x95f)][_0x33ab50[_0x5ae993(0x351)]()[_0x5ae993(0x6d7)]()]=_0x59d1b8,VisuMZ[_0x5ae993(0x865)][_0x5ae993(0x30b)][_0x33ab50[_0x5ae993(0x351)]()[_0x5ae993(0x6d7)]()]=_0x2e175d,VisuMZ[_0x5ae993(0x865)][_0x5ae993(0x62a)][_0x33ab50[_0x5ae993(0x351)]()['trim']()]=_0x33ab50,Object[_0x5ae993(0x8d5)](Game_BattlerBase[_0x5ae993(0x923)],_0x33ab50,{'get'(){const _0x705240=_0x5ae993,_0x4dbe1c=_0x247e41[_0x705240(0x481)](this);return _0x2e175d===_0x705240(0x77f)?Math[_0x705240(0x75e)](_0x4dbe1c):_0x4dbe1c;}});},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x55c)]={},VisuMZ['CoreEngine'][_0x5ca092(0x8ce)]={},Scene_Boot[_0x5ca092(0x923)][_0x5ca092(0x636)]=function(){const _0x4fbc91=_0x5ca092,_0x255b2b=VisuMZ[_0x4fbc91(0x865)]['Settings'][_0x4fbc91(0x55c)];for(const _0x2d0eaa of _0x255b2b){const _0x5967c5=(_0x2d0eaa['Name']||'')[_0x4fbc91(0x86b)]()['trim'](),_0x4c8774=(_0x2d0eaa[_0x4fbc91(0x5b3)]||'')[_0x4fbc91(0x86b)]()['trim']();VisuMZ[_0x4fbc91(0x865)][_0x4fbc91(0x55c)][_0x5967c5]=_0x2d0eaa,VisuMZ[_0x4fbc91(0x865)][_0x4fbc91(0x8ce)][_0x4c8774]=_0x5967c5;}},VisuMZ[_0x5ca092(0x4d7)]=function(){const _0x2db7e5=_0x5ca092;for(const _0x5f3bcd of $dataActors){if(_0x5f3bcd)VisuMZ['ParseActorNotetags'](_0x5f3bcd);}for(const _0x34b97e of $dataClasses){if(_0x34b97e)VisuMZ[_0x2db7e5(0x2a5)](_0x34b97e);}for(const _0x565233 of $dataSkills){if(_0x565233)VisuMZ[_0x2db7e5(0x4da)](_0x565233);}for(const _0x18bdca of $dataItems){if(_0x18bdca)VisuMZ[_0x2db7e5(0x363)](_0x18bdca);}for(const _0xdeb600 of $dataWeapons){if(_0xdeb600)VisuMZ[_0x2db7e5(0x5b9)](_0xdeb600);}for(const _0x5f557e of $dataArmors){if(_0x5f557e)VisuMZ[_0x2db7e5(0x227)](_0x5f557e);}for(const _0x31a783 of $dataEnemies){if(_0x31a783)VisuMZ[_0x2db7e5(0x860)](_0x31a783);}for(const _0x25b04c of $dataStates){if(_0x25b04c)VisuMZ[_0x2db7e5(0x6de)](_0x25b04c);}for(const _0x492880 of $dataTilesets){if(_0x492880)VisuMZ[_0x2db7e5(0x521)](_0x492880);}},VisuMZ['ParseActorNotetags']=function(_0x59d1fb){},VisuMZ[_0x5ca092(0x2a5)]=function(_0x3f862e){},VisuMZ[_0x5ca092(0x4da)]=function(_0x318ff8){},VisuMZ[_0x5ca092(0x363)]=function(_0x402fd0){},VisuMZ[_0x5ca092(0x5b9)]=function(_0x4bd674){},VisuMZ[_0x5ca092(0x227)]=function(_0x242741){},VisuMZ[_0x5ca092(0x860)]=function(_0x352305){},VisuMZ[_0x5ca092(0x6de)]=function(_0x5e3694){},VisuMZ['ParseTilesetNotetags']=function(_0x29e61e){},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x6bb)]=VisuMZ[_0x5ca092(0x6bb)],VisuMZ[_0x5ca092(0x6bb)]=function(_0x4beda6){const _0x41dfad=_0x5ca092;VisuMZ[_0x41dfad(0x865)][_0x41dfad(0x6bb)][_0x41dfad(0x481)](this,_0x4beda6);const _0x77644c=_0x4beda6['note'];if(_0x77644c[_0x41dfad(0x345)](/<MAX LEVEL:[ ](\d+)>/i)){_0x4beda6[_0x41dfad(0x43a)]=Number(RegExp['$1']);if(_0x4beda6[_0x41dfad(0x43a)]===0x0)_0x4beda6['maxLevel']=Number['MAX_SAFE_INTEGER'];}_0x77644c[_0x41dfad(0x345)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x4beda6[_0x41dfad(0x970)]=Math[_0x41dfad(0x667)](Number(RegExp['$1']),_0x4beda6[_0x41dfad(0x43a)]));},VisuMZ['CoreEngine'][_0x5ca092(0x2a5)]=VisuMZ['ParseClassNotetags'],VisuMZ[_0x5ca092(0x2a5)]=function(_0x1eb3a1){const _0x551340=_0x5ca092;VisuMZ['CoreEngine'][_0x551340(0x2a5)][_0x551340(0x481)](this,_0x1eb3a1);if(_0x1eb3a1[_0x551340(0x276)])for(const _0x153d2d of _0x1eb3a1[_0x551340(0x276)]){_0x153d2d[_0x551340(0x91e)]['match'](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x153d2d['level']=Math[_0x551340(0x8e4)](Number(RegExp['$1']),0x1));}},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x860)]=VisuMZ['ParseEnemyNotetags'],VisuMZ[_0x5ca092(0x860)]=function(_0x2a22d8){const _0x36923f=_0x5ca092;VisuMZ[_0x36923f(0x865)][_0x36923f(0x860)]['call'](this,_0x2a22d8),_0x2a22d8[_0x36923f(0x53b)]=0x1;const _0x4aa60d=_0x2a22d8['note'];if(_0x4aa60d[_0x36923f(0x345)](/<LEVEL:[ ](\d+)>/i))_0x2a22d8[_0x36923f(0x53b)]=Number(RegExp['$1']);if(_0x4aa60d[_0x36923f(0x345)](/<MAXHP:[ ](\d+)>/i))_0x2a22d8[_0x36923f(0x296)][0x0]=Number(RegExp['$1']);if(_0x4aa60d[_0x36923f(0x345)](/<MAXMP:[ ](\d+)>/i))_0x2a22d8[_0x36923f(0x296)][0x1]=Number(RegExp['$1']);if(_0x4aa60d[_0x36923f(0x345)](/<ATK:[ ](\d+)>/i))_0x2a22d8[_0x36923f(0x296)][0x2]=Number(RegExp['$1']);if(_0x4aa60d[_0x36923f(0x345)](/<DEF:[ ](\d+)>/i))_0x2a22d8['params'][0x3]=Number(RegExp['$1']);if(_0x4aa60d[_0x36923f(0x345)](/<MAT:[ ](\d+)>/i))_0x2a22d8['params'][0x4]=Number(RegExp['$1']);if(_0x4aa60d[_0x36923f(0x345)](/<MDF:[ ](\d+)>/i))_0x2a22d8['params'][0x5]=Number(RegExp['$1']);if(_0x4aa60d[_0x36923f(0x345)](/<AGI:[ ](\d+)>/i))_0x2a22d8[_0x36923f(0x296)][0x6]=Number(RegExp['$1']);if(_0x4aa60d[_0x36923f(0x345)](/<LUK:[ ](\d+)>/i))_0x2a22d8[_0x36923f(0x296)][0x7]=Number(RegExp['$1']);if(_0x4aa60d['match'](/<EXP:[ ](\d+)>/i))_0x2a22d8[_0x36923f(0x240)]=Number(RegExp['$1']);if(_0x4aa60d[_0x36923f(0x345)](/<GOLD:[ ](\d+)>/i))_0x2a22d8['gold']=Number(RegExp['$1']);},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x87b)]=Graphics[_0x5ca092(0x391)],Graphics[_0x5ca092(0x391)]=function(){const _0xef5606=_0x5ca092;switch(VisuMZ[_0xef5606(0x865)][_0xef5606(0x225)]['QoL'][_0xef5606(0x925)]){case _0xef5606(0x238):return!![];case _0xef5606(0x815):return![];default:return VisuMZ[_0xef5606(0x865)][_0xef5606(0x87b)][_0xef5606(0x481)](this);}},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x540)]=Graphics[_0x5ca092(0x8ac)],Graphics[_0x5ca092(0x8ac)]=function(_0x5d57b4,_0x11e11c,_0x501b15=null){const _0x1439ea=_0x5ca092;VisuMZ[_0x1439ea(0x865)][_0x1439ea(0x540)][_0x1439ea(0x481)](this,_0x5d57b4,_0x11e11c,_0x501b15),VisuMZ[_0x1439ea(0x2c8)](![]);},VisuMZ['CoreEngine'][_0x5ca092(0x8c3)]=Graphics[_0x5ca092(0x5c9)],Graphics[_0x5ca092(0x5c9)]=function(_0x1a4bd7){const _0x2db60a=_0x5ca092;VisuMZ['CoreEngine'][_0x2db60a(0x8c3)][_0x2db60a(0x481)](this,_0x1a4bd7),this[_0x2db60a(0x1d9)](_0x1a4bd7);},Graphics[_0x5ca092(0x1d9)]=function(_0x4ffa18){const _0x5d597f=_0x5ca092;VisuMZ[_0x5d597f(0x865)]['Settings']['QoL'][_0x5d597f(0x2ab)]&&(_0x4ffa18[_0x5d597f(0x4bd)][_0x5d597f(0x8aa)]=_0x5d597f(0x854));VisuMZ['CoreEngine']['Settings'][_0x5d597f(0x656)][_0x5d597f(0x4d2)]&&(_0x4ffa18[_0x5d597f(0x4bd)]['image-rendering']=_0x5d597f(0x670));const _0x39d3ad=Math['max'](0x0,Math[_0x5d597f(0x229)](_0x4ffa18[_0x5d597f(0x7b7)]*this['_realScale'])),_0x16b487=Math['max'](0x0,Math[_0x5d597f(0x229)](_0x4ffa18[_0x5d597f(0x2a0)]*this[_0x5d597f(0x2f2)]));_0x4ffa18[_0x5d597f(0x4bd)][_0x5d597f(0x7b7)]=_0x39d3ad+'px',_0x4ffa18[_0x5d597f(0x4bd)]['height']=_0x16b487+'px';},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x41c)]=Bitmap[_0x5ca092(0x923)]['initialize'],Bitmap[_0x5ca092(0x923)]['initialize']=function(_0x558a,_0x583df9){const _0x38c72c=_0x5ca092;VisuMZ[_0x38c72c(0x865)][_0x38c72c(0x41c)][_0x38c72c(0x481)](this,_0x558a,_0x583df9),this['_smooth']=!(VisuMZ[_0x38c72c(0x865)]['Settings'][_0x38c72c(0x656)][_0x38c72c(0x4d2)]??!![]);},Bitmap[_0x5ca092(0x923)]['markCoreEngineModified']=function(){this['_customModified']=!![];},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x58f)]=Sprite[_0x5ca092(0x923)][_0x5ca092(0x3ae)],Sprite[_0x5ca092(0x923)][_0x5ca092(0x3ae)]=function(){const _0x46b8fa=_0x5ca092;if(this[_0x46b8fa(0x1c9)])VisuMZ[_0x46b8fa(0x865)]['Sprite_destroy'][_0x46b8fa(0x481)](this);this['destroyCoreEngineMarkedBitmaps']();},Sprite['prototype'][_0x5ca092(0x3d3)]=function(){const _0x3de56f=_0x5ca092;if(!this[_0x3de56f(0x625)])return;if(!this[_0x3de56f(0x625)][_0x3de56f(0x36f)])return;this[_0x3de56f(0x625)][_0x3de56f(0x3dd)]&&!this['_bitmap']['_baseTexture'][_0x3de56f(0x31a)]&&this[_0x3de56f(0x625)][_0x3de56f(0x3ae)]();},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x3dc)]=Bitmap[_0x5ca092(0x923)][_0x5ca092(0x3d4)],Bitmap['prototype'][_0x5ca092(0x3d4)]=function(_0x4bb49f,_0x3fa8c2){const _0x432ab6=_0x5ca092;VisuMZ['CoreEngine']['Bitmap_resize'][_0x432ab6(0x481)](this,_0x4bb49f,_0x3fa8c2),this[_0x432ab6(0x659)]();},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x67d)]=Bitmap[_0x5ca092(0x923)][_0x5ca092(0x6e6)],Bitmap[_0x5ca092(0x923)][_0x5ca092(0x6e6)]=function(_0x23eb78,_0x211dda,_0x1f3757,_0x45dd6b,_0x41949d,_0x575437,_0x5499b4,_0x3fffc8,_0x11b82e){const _0x20a8b1=_0x5ca092;_0x211dda=Math[_0x20a8b1(0x75e)](_0x211dda),_0x1f3757=Math[_0x20a8b1(0x75e)](_0x1f3757),_0x45dd6b=Math[_0x20a8b1(0x75e)](_0x45dd6b),_0x41949d=Math[_0x20a8b1(0x75e)](_0x41949d),_0x575437=Math[_0x20a8b1(0x75e)](_0x575437),_0x5499b4=Math[_0x20a8b1(0x75e)](_0x5499b4),VisuMZ[_0x20a8b1(0x865)][_0x20a8b1(0x67d)][_0x20a8b1(0x481)](this,_0x23eb78,_0x211dda,_0x1f3757,_0x45dd6b,_0x41949d,_0x575437,_0x5499b4,_0x3fffc8,_0x11b82e),this[_0x20a8b1(0x659)]();},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x292)]=Bitmap[_0x5ca092(0x923)][_0x5ca092(0x555)],Bitmap['prototype'][_0x5ca092(0x555)]=function(_0x8f9d05,_0x284f85,_0x3ede7e,_0x567b4a){const _0x4d0f15=_0x5ca092;VisuMZ[_0x4d0f15(0x865)][_0x4d0f15(0x292)][_0x4d0f15(0x481)](this,_0x8f9d05,_0x284f85,_0x3ede7e,_0x567b4a),this['markCoreEngineModified']();},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x75f)]=Bitmap[_0x5ca092(0x923)]['fillRect'],Bitmap[_0x5ca092(0x923)]['fillRect']=function(_0x3e2a5f,_0x34b465,_0x6abcec,_0x319991,_0x4c5957){const _0x588e27=_0x5ca092;VisuMZ[_0x588e27(0x865)][_0x588e27(0x75f)][_0x588e27(0x481)](this,_0x3e2a5f,_0x34b465,_0x6abcec,_0x319991,_0x4c5957),this[_0x588e27(0x659)]();},VisuMZ['CoreEngine'][_0x5ca092(0x758)]=Bitmap['prototype'][_0x5ca092(0x4e5)],Bitmap['prototype']['strokeRect']=function(_0x5ae27a,_0x223a37,_0x5ed75e,_0x3490ea,_0x561215){const _0x30e27f=_0x5ca092;VisuMZ['CoreEngine'][_0x30e27f(0x758)][_0x30e27f(0x481)](this,_0x5ae27a,_0x223a37,_0x5ed75e,_0x3490ea,_0x561215),this[_0x30e27f(0x659)]();},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x537)]=Bitmap[_0x5ca092(0x923)][_0x5ca092(0x954)],Bitmap[_0x5ca092(0x923)][_0x5ca092(0x954)]=function(_0x29fec6,_0x7375c4,_0x543823,_0x249b59,_0x5ea645,_0x2efe39,_0xada780){const _0x5755a2=_0x5ca092;VisuMZ[_0x5755a2(0x865)][_0x5755a2(0x537)][_0x5755a2(0x481)](this,_0x29fec6,_0x7375c4,_0x543823,_0x249b59,_0x5ea645,_0x2efe39,_0xada780),this[_0x5755a2(0x659)]();},VisuMZ[_0x5ca092(0x865)]['Bitmap_drawCircle']=Bitmap['prototype']['drawCircle'],Bitmap[_0x5ca092(0x923)][_0x5ca092(0x4ef)]=function(_0x3a5efa,_0xe18cf8,_0xd2689f,_0x3a90ae){const _0x4b499c=_0x5ca092;_0x3a5efa=Math[_0x4b499c(0x75e)](_0x3a5efa),_0xe18cf8=Math[_0x4b499c(0x75e)](_0xe18cf8),_0xd2689f=Math[_0x4b499c(0x75e)](_0xd2689f),VisuMZ['CoreEngine'][_0x4b499c(0x516)]['call'](this,_0x3a5efa,_0xe18cf8,_0xd2689f,_0x3a90ae),this[_0x4b499c(0x659)]();},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x818)]=Bitmap[_0x5ca092(0x923)][_0x5ca092(0x691)],Bitmap[_0x5ca092(0x923)][_0x5ca092(0x691)]=function(_0x2b769f){const _0xeb97dc=_0x5ca092;return Math[_0xeb97dc(0x8e7)](VisuMZ[_0xeb97dc(0x865)][_0xeb97dc(0x818)][_0xeb97dc(0x481)](this,_0x2b769f));},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x4a4)]=Bitmap[_0x5ca092(0x923)][_0x5ca092(0x286)],Bitmap[_0x5ca092(0x923)][_0x5ca092(0x286)]=function(_0x2f1f31,_0x10041f,_0x761575,_0x4e432e,_0x48cd9e,_0x4ff07f){const _0x8895ef=_0x5ca092;_0x10041f=Math[_0x8895ef(0x75e)](_0x10041f),_0x761575=Math[_0x8895ef(0x75e)](_0x761575),_0x4e432e=Math['ceil'](_0x4e432e),_0x48cd9e=Math['ceil'](_0x48cd9e),VisuMZ['CoreEngine'][_0x8895ef(0x4a4)]['call'](this,_0x2f1f31,_0x10041f,_0x761575,_0x4e432e,_0x48cd9e,_0x4ff07f),this[_0x8895ef(0x659)]();},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x68f)]=Bitmap[_0x5ca092(0x923)][_0x5ca092(0x3a3)],Bitmap[_0x5ca092(0x923)][_0x5ca092(0x3a3)]=function(_0x4df3c1,_0x3e4304,_0x13efc6,_0x1fc5c9){const _0x15e497=_0x5ca092;VisuMZ['CoreEngine'][_0x15e497(0x225)][_0x15e497(0x656)][_0x15e497(0x364)]?this[_0x15e497(0x677)](_0x4df3c1,_0x3e4304,_0x13efc6,_0x1fc5c9):VisuMZ['CoreEngine'][_0x15e497(0x68f)][_0x15e497(0x481)](this,_0x4df3c1,_0x3e4304,_0x13efc6,_0x1fc5c9);},Bitmap[_0x5ca092(0x923)][_0x5ca092(0x677)]=function(_0x5527a6,_0xc968f3,_0x14bc9d,_0xa682b3){const _0x35e1a8=_0x5ca092,_0x75d029=this['context'];_0x75d029['fillStyle']=this['outlineColor'],_0x75d029[_0x35e1a8(0x810)](_0x5527a6,_0xc968f3+0x2,_0x14bc9d+0x2,_0xa682b3);},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x43d)]=Input[_0x5ca092(0x6e2)],Input[_0x5ca092(0x6e2)]=function(){const _0x25bbd4=_0x5ca092;VisuMZ[_0x25bbd4(0x865)][_0x25bbd4(0x43d)][_0x25bbd4(0x481)](this),this[_0x25bbd4(0x2ec)]=undefined,this['_inputSpecialKeyCode']=undefined,this[_0x25bbd4(0x8db)]=Input[_0x25bbd4(0x61b)];},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x72f)]=Input['update'],Input[_0x5ca092(0x471)]=function(){const _0x22e56b=_0x5ca092;VisuMZ['CoreEngine'][_0x22e56b(0x72f)][_0x22e56b(0x481)](this);if(this[_0x22e56b(0x8db)])this[_0x22e56b(0x8db)]--;},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x62d)]=Input[_0x5ca092(0x631)],Input[_0x5ca092(0x631)]=function(){const _0x301243=_0x5ca092;if(this[_0x301243(0x8db)])return;VisuMZ[_0x301243(0x865)][_0x301243(0x62d)][_0x301243(0x481)](this);},VisuMZ['CoreEngine'][_0x5ca092(0x6f1)]=Input['_setupEventHandlers'],Input[_0x5ca092(0x2df)]=function(){const _0x2e99cb=_0x5ca092;VisuMZ['CoreEngine']['Input_setupEventHandlers'][_0x2e99cb(0x481)](this),document[_0x2e99cb(0x5d7)](_0x2e99cb(0x2e4),this[_0x2e99cb(0x718)][_0x2e99cb(0x2da)](this));},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x94c)]=Input[_0x5ca092(0x408)],Input[_0x5ca092(0x408)]=function(_0x3e71c3){const _0x308925=_0x5ca092;this[_0x308925(0x5f8)]=_0x3e71c3[_0x308925(0x3b2)],VisuMZ[_0x308925(0x865)][_0x308925(0x94c)][_0x308925(0x481)](this,_0x3e71c3),this[_0x308925(0x64c)](null);},Input['_onKeyPress']=function(_0x174a7c){this['_registerKeyInput'](_0x174a7c);},Input['_registerKeyInput']=function(_0x15d043){const _0x59807b=_0x5ca092;this['_inputSpecialKeyCode']=_0x15d043[_0x59807b(0x3b2)];let _0x441197=String[_0x59807b(0x465)](_0x15d043['charCode']);this[_0x59807b(0x2ec)]===undefined?this['_inputString']=_0x441197:this[_0x59807b(0x2ec)]+=_0x441197;},VisuMZ['CoreEngine'][_0x5ca092(0x33c)]=Input[_0x5ca092(0x1f1)],Input[_0x5ca092(0x1f1)]=function(_0x33191c){const _0x1b82e2=_0x5ca092;if(_0x33191c===0x8)return![];return VisuMZ[_0x1b82e2(0x865)]['Input_shouldPreventDefault'][_0x1b82e2(0x481)](this,_0x33191c);},Input[_0x5ca092(0x804)]=function(_0x3f51f6){const _0x3f06be=_0x5ca092;if(_0x3f51f6[_0x3f06be(0x345)](/backspace/i))return this[_0x3f06be(0x5f8)]===0x8;if(_0x3f51f6[_0x3f06be(0x345)](/enter/i))return this['_inputSpecialKeyCode']===0xd;if(_0x3f51f6[_0x3f06be(0x345)](/escape/i))return this[_0x3f06be(0x5f8)]===0x1b;},Input[_0x5ca092(0x1cd)]=function(){const _0x353d10=_0x5ca092;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39]['contains'](this[_0x353d10(0x5f8)]);},Input['isArrowPressed']=function(){const _0x30ba51=_0x5ca092;return[0x25,0x26,0x27,0x28][_0x30ba51(0x2f5)](this['_inputSpecialKeyCode']);},Input[_0x5ca092(0x48a)]=function(){const _0x32c778=_0x5ca092;if(navigator[_0x32c778(0x513)]){const _0x210049=navigator[_0x32c778(0x513)]();if(_0x210049)for(const _0x4fd3f8 of _0x210049){if(_0x4fd3f8&&_0x4fd3f8['connected'])return!![];}}return![];},Input[_0x5ca092(0x519)]=function(){const _0x3906ad=_0x5ca092;if(navigator[_0x3906ad(0x513)]){const _0x1ad9bb=navigator['getGamepads']();if(_0x1ad9bb)for(const _0x5ecaaf of _0x1ad9bb){if(_0x5ecaaf&&_0x5ecaaf['connected']){if(this['isGamepadButtonPressed'](_0x5ecaaf))return!![];if(this[_0x3906ad(0x6b4)](_0x5ecaaf))return!![];}}}return![];},Input[_0x5ca092(0x714)]=function(_0x4c8b9a){const _0x5d8944=_0x5ca092,_0x2a190e=_0x4c8b9a['buttons'];for(let _0x158cf7=0x0;_0x158cf7<_0x2a190e[_0x5d8944(0x839)];_0x158cf7++){if(_0x2a190e[_0x158cf7][_0x5d8944(0x486)])return!![];}return![];},Input[_0x5ca092(0x6b4)]=function(_0x4a1db9){const _0x26dca5=_0x4a1db9['axes'],_0x5ef963=0.5;if(_0x26dca5[0x0]<-_0x5ef963)return!![];if(_0x26dca5[0x0]>_0x5ef963)return!![];if(_0x26dca5[0x1]<-_0x5ef963)return!![];if(_0x26dca5[0x1]>_0x5ef963)return!![];return![];},Input[_0x5ca092(0x7dc)]=function(){return this['_lastGamepad']||null;},Input[_0x5ca092(0x64c)]=function(_0x41ffc8){const _0x461ce5=_0x5ca092;this[_0x461ce5(0x6bc)]=_0x41ffc8;},VisuMZ[_0x5ca092(0x865)]['Input_updateGamepadState']=Input[_0x5ca092(0x42a)],Input[_0x5ca092(0x42a)]=function(_0x3f565f){const _0x433704=_0x5ca092;VisuMZ[_0x433704(0x865)][_0x433704(0x505)][_0x433704(0x481)](this,_0x3f565f),(this[_0x433704(0x714)](_0x3f565f)||this[_0x433704(0x6b4)](_0x3f565f))&&this[_0x433704(0x64c)](_0x3f565f);},Input['getLastUsedGamepadType']=function(){const _0x5e6f84=_0x5ca092;return this[_0x5e6f84(0x6bc)]?this[_0x5e6f84(0x6bc)]['id']:_0x5e6f84(0x4b3);},VisuMZ[_0x5ca092(0x865)]['Tilemap_addShadow']=Tilemap[_0x5ca092(0x923)]['_addShadow'],Tilemap[_0x5ca092(0x923)]['_addShadow']=function(_0x287bf0,_0x1decb3,_0x3c7b6f,_0x438c5c){const _0x6708f2=_0x5ca092;if($gameMap&&$gameMap[_0x6708f2(0x3ff)]())return;VisuMZ[_0x6708f2(0x865)]['Tilemap_addShadow'][_0x6708f2(0x481)](this,_0x287bf0,_0x1decb3,_0x3c7b6f,_0x438c5c);},Tilemap['Renderer'][_0x5ca092(0x923)][_0x5ca092(0x94e)]=function(){const _0x42a11b=_0x5ca092;this[_0x42a11b(0x619)]();for(let _0x325021=0x0;_0x325021<Tilemap['Layer'][_0x42a11b(0x5fe)];_0x325021++){const _0x30505e=new PIXI[(_0x42a11b(0x332))]();_0x30505e[_0x42a11b(0x476)](0x800,0x800),VisuMZ['CoreEngine']['Settings']['QoL']['PixelateImageRendering']&&(_0x30505e['scaleMode']=PIXI[_0x42a11b(0x597)][_0x42a11b(0x977)]),this[_0x42a11b(0x35b)][_0x42a11b(0x4a2)](_0x30505e);}},WindowLayer[_0x5ca092(0x923)][_0x5ca092(0x5f4)]=function(){const _0x540425=_0x5ca092;return SceneManager&&SceneManager['_scene']?SceneManager['_scene'][_0x540425(0x756)]():!![];},VisuMZ['CoreEngine'][_0x5ca092(0x6ce)]=WindowLayer['prototype'][_0x5ca092(0x209)],WindowLayer['prototype'][_0x5ca092(0x209)]=function render(_0x6cb264){const _0x27b719=_0x5ca092;this[_0x27b719(0x5f4)]()?VisuMZ[_0x27b719(0x865)][_0x27b719(0x6ce)]['call'](this,_0x6cb264):this[_0x27b719(0x948)](_0x6cb264);},WindowLayer[_0x5ca092(0x923)][_0x5ca092(0x948)]=function render(_0x31567a){const _0x5976c9=_0x5ca092;if(!this[_0x5976c9(0x577)])return;const _0x1955be=new PIXI['Graphics'](),_0x388f23=_0x31567a['gl'],_0x261383=this['children'][_0x5976c9(0x575)]();_0x31567a[_0x5976c9(0x924)][_0x5976c9(0x333)](),_0x1955be[_0x5976c9(0x908)]=this[_0x5976c9(0x908)],_0x31567a['batch'][_0x5976c9(0x249)](),_0x388f23[_0x5976c9(0x2ad)](_0x388f23[_0x5976c9(0x2f1)]);while(_0x261383[_0x5976c9(0x839)]>0x0){const _0x58d7a8=_0x261383[_0x5976c9(0x906)]();_0x58d7a8[_0x5976c9(0x2c4)]&&_0x58d7a8[_0x5976c9(0x577)]&&_0x58d7a8['openness']>0x0&&(_0x388f23[_0x5976c9(0x663)](_0x388f23['EQUAL'],0x0,~0x0),_0x388f23[_0x5976c9(0x22e)](_0x388f23[_0x5976c9(0x5ba)],_0x388f23[_0x5976c9(0x5ba)],_0x388f23['KEEP']),_0x58d7a8[_0x5976c9(0x209)](_0x31567a),_0x31567a['batch'][_0x5976c9(0x249)](),_0x1955be[_0x5976c9(0x6e2)](),_0x388f23[_0x5976c9(0x663)](_0x388f23[_0x5976c9(0x65c)],0x1,~0x0),_0x388f23[_0x5976c9(0x22e)](_0x388f23['REPLACE'],_0x388f23[_0x5976c9(0x466)],_0x388f23[_0x5976c9(0x466)]),_0x388f23['blendFunc'](_0x388f23[_0x5976c9(0x4ac)],_0x388f23['ONE']),_0x1955be[_0x5976c9(0x209)](_0x31567a),_0x31567a[_0x5976c9(0x556)]['flush'](),_0x388f23[_0x5976c9(0x53c)](_0x388f23['ONE'],_0x388f23[_0x5976c9(0x325)]));}_0x388f23[_0x5976c9(0x853)](_0x388f23[_0x5976c9(0x2f1)]),_0x388f23[_0x5976c9(0x6e2)](_0x388f23[_0x5976c9(0x6dd)]),_0x388f23['clearStencil'](0x0),_0x31567a[_0x5976c9(0x556)][_0x5976c9(0x249)]();for(const _0x2d0ef8 of this[_0x5976c9(0x7a8)]){!_0x2d0ef8[_0x5976c9(0x2c4)]&&_0x2d0ef8[_0x5976c9(0x577)]&&_0x2d0ef8[_0x5976c9(0x209)](_0x31567a);}_0x31567a['batch'][_0x5976c9(0x249)]();},DataManager[_0x5ca092(0x5c0)]=function(_0x11c377){const _0x314daa=_0x5ca092;return this[_0x314daa(0x80e)](_0x11c377)&&_0x11c377[_0x314daa(0x2e1)]===0x2;},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x57e)]=DataManager[_0x5ca092(0x8e3)],DataManager[_0x5ca092(0x8e3)]=function(){const _0x6cd358=_0x5ca092;VisuMZ[_0x6cd358(0x865)]['DataManager_setupNewGame'][_0x6cd358(0x481)](this),this[_0x6cd358(0x1ed)](),this['reserveNewGameCommonEvent']();},DataManager['reservePlayTestNewGameCommonEvent']=function(){const _0x1da6d6=_0x5ca092;if($gameTemp[_0x1da6d6(0x4be)]()){const _0x4fcf11=VisuMZ[_0x1da6d6(0x865)]['Settings']['QoL']['NewGameCommonEvent'];if(_0x4fcf11>0x0)$gameTemp['reserveCommonEvent'](_0x4fcf11);}},DataManager['reserveNewGameCommonEvent']=function(){const _0x31e689=_0x5ca092,_0x2103fa=VisuMZ[_0x31e689(0x865)]['Settings']['QoL'][_0x31e689(0x27c)]||0x0;if(_0x2103fa>0x0)$gameTemp[_0x31e689(0x7ed)](_0x2103fa);},DataManager[_0x5ca092(0x51a)]=function(_0xd656c8){const _0x10bf82=_0x5ca092,_0x258538=$dataTroops[_0xd656c8];if(!_0x258538)return'';let _0x3aeb26='';_0x3aeb26+=_0x258538[_0x10bf82(0x7a5)];for(const _0x963d64 of _0x258538[_0x10bf82(0x5a9)]){for(const _0x56447b of _0x963d64[_0x10bf82(0x683)]){[0x6c,0x198][_0x10bf82(0x3f8)](_0x56447b[_0x10bf82(0x1d8)])&&(_0x3aeb26+='\x0a',_0x3aeb26+=_0x56447b[_0x10bf82(0x25d)][0x0]);}}return _0x3aeb26;};(VisuMZ['CoreEngine'][_0x5ca092(0x225)][_0x5ca092(0x656)][_0x5ca092(0x6b9)]??!![])&&($scene=null,VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x30d)]=Scene_Base[_0x5ca092(0x923)]['create'],Scene_Base['prototype'][_0x5ca092(0x49a)]=function(){const _0x3888dc=_0x5ca092;VisuMZ[_0x3888dc(0x865)][_0x3888dc(0x30d)]['call'](this),$scene=this;},$spriteset=null,VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x520)]=Scene_Map[_0x5ca092(0x923)][_0x5ca092(0x29d)],Scene_Map[_0x5ca092(0x923)][_0x5ca092(0x29d)]=function(){const _0x1b61b1=_0x5ca092;VisuMZ['CoreEngine'][_0x1b61b1(0x520)]['call'](this),$spriteset=this[_0x1b61b1(0x5ab)];},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x726)]=Scene_Battle[_0x5ca092(0x923)][_0x5ca092(0x29d)],Scene_Battle[_0x5ca092(0x923)][_0x5ca092(0x29d)]=function(){const _0x445727=_0x5ca092;VisuMZ[_0x445727(0x865)]['Scene_Battle_createSpriteset']['call'](this),$spriteset=this[_0x445727(0x5ab)];},VisuMZ['CoreEngine'][_0x5ca092(0x298)]=Scene_Base['prototype'][_0x5ca092(0x561)],Scene_Base[_0x5ca092(0x923)][_0x5ca092(0x561)]=function(){const _0x5ed9ff=_0x5ca092;VisuMZ['CoreEngine'][_0x5ed9ff(0x298)][_0x5ed9ff(0x481)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ[_0x5ca092(0x865)]['BattleManager_update']=BattleManager[_0x5ca092(0x471)],BattleManager[_0x5ca092(0x471)]=function(_0x1b8e51){const _0x4f9828=_0x5ca092;VisuMZ[_0x4f9828(0x865)][_0x4f9828(0x327)]['call'](this,_0x1b8e51),this[_0x4f9828(0x97c)]();},BattleManager['updateBattleVariables']=function(){const _0x159e3f=_0x5ca092;$subject=this[_0x159e3f(0x2b2)],$targets=this['_targets'],$target=this['_target']||this[_0x159e3f(0x605)][0x0];},$event=null,VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x389)]=Game_Event[_0x5ca092(0x923)][_0x5ca092(0x412)],Game_Event['prototype'][_0x5ca092(0x412)]=function(){const _0x18ff86=_0x5ca092;VisuMZ[_0x18ff86(0x865)][_0x18ff86(0x389)][_0x18ff86(0x481)](this),$event=this;},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x326)]=Scene_Map[_0x5ca092(0x923)][_0x5ca092(0x471)],Scene_Map[_0x5ca092(0x923)][_0x5ca092(0x471)]=function(){const _0x408cc9=_0x5ca092;VisuMZ[_0x408cc9(0x865)][_0x408cc9(0x326)][_0x408cc9(0x481)](this),$gameMap['updateCurrentEvent']();},Game_Map[_0x5ca092(0x923)][_0x5ca092(0x4fd)]=function(){const _0x1029b1=_0x5ca092;!this[_0x1029b1(0x59a)]()&&$event!==null&&($event=null);},$commonEvent=function(_0x2d98e4){if($gameTemp)$gameTemp['reserveCommonEvent'](_0x2d98e4);});function _0x18f6(){const _0x1feec2=['updatePosition','note','isHandled','outlineColorDmg','updateShadow','Spriteset_Battle_createEnemies','prototype','framebuffer','AutoStretch','currentExp','ValueJS','_animationSprites','xparam','apply','_isButtonHidden','prepare','redraw','PHA','application/json','Scene_Map_initialize','skills','PictureCoordinatesMode','Window_StatusBase_drawActorLevel','Window_Base_createContents','Window_NameInput_cursorUp','padZero','Smooth','LUK','offsetY','isSideButtonLayout','createContents','_stored_pendingColor','HELP','_mapNameWindow','drawGameSubtitle','sv_enemies','currencyUnit','worldTransform','mainAreaTop','makeActionList','forceOutOfPlaytest','AnimationID','XParamVocab1','renderNoMask','getControllerInputButtonMatch','isClosing','_text','Input_onKeyDown','toLocaleString','_createInternalTextures','Sprite_Button_initialize','Game_System_initialize','updateRotation','changeClass','cursorUp','gradientFillRect','_backgroundSprite','Conditional\x20Branch\x20Script\x20Error','_saveFileID','focus','dummyWindowRect','WIN_OEM_CLEAR','openURL','test','endAction','Duration','CustomParamIcons','Power','Flat','IconXParam1','CAPSLOCK','》Comment《\x0a%1\x0a','createChildSprite','targetEvaRate','isAnimationForEach','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','eventsXyNt','Sprite_Picture_loadBitmap','pictures','targetPosition','Game_Interpreter_command111','getCombinedScrollingText','isFullDocumentTitle','initialLevel','Rate','processEscape','Unnamed','addLoadListener','IconXParam4','24404598cTXFcQ','NEAREST','CommandRect','XParamVocab4','CONTEXT_MENU','duration','updateBattleVariables','SellRect','itemRect','CLOSE_PAREN','targetObjects','_stored_crisisColor','BTestArmors','BarOffset','ItemBackColor1','INOUTEXPO','backspace','SceneManager_initialize','buttonAssistOffset5','_closing','DefaultMode','_timerSprite','_texture','XParamVocab9','addQueue','isBottomHelpMode','isNumpadPressed','paramFlatBonus','<%1\x20%2:[\x20]','buttonAssistOffset1','seVolume','updateLastTarget','drawSegment','\x5c}❪SHIFT❫\x5c{','titleCommandWindow','BoxMargin','Sprite_StateIcon_updateFrame','code','_centerElementCoreEngine','_viewportSize','deselect','removeTileExtendSprites','xparamFlat1','PGDN','Window_Base_drawIcon','_number','sellWindowRect','Game_Interpreter_command105','encounterStep','DrawIcons','JUNJA','zoomScale','hide','updateOrigin','OnLoadJS','erasePicture','SLASH','paramName','reservePlayTestNewGameCommonEvent','optionsWindowRect','buttonAssistKey5','Mute','_shouldPreventDefault','version','_textQueue','MRF','setBattleSystem','_duration','statusWindowRect','description','IconSParam1','centerX','backgroundBitmap','ColorCTGauge2','cursorLeft','updateAnglePlus','loadPicture','FontWidthFix','Scene_Map_shouldAutosave','Armor-%1-%2','Window_NameInput_initialize','_stored_ctGaugeColor2','INOUTBACK','paramFlatJS','gaugeBackColor','DEFAULT_SHIFT_Y','render','OS_KEY','map','NUMPAD4','_forcedBattleGridSystem','Window_Base_drawText','OpenURL','applyCoreEasing','itemWindowRect','log','faceHeight','INOUTCUBIC','SHIFT','blockWidth','createKeyJS','setGuard','skillId','innerWidth','Scene_Map_updateMainMultiply','paramWidth','categoryWindowRect','_effectsContainer','GoldBgType','updateBgsParameters','refreshScrollBarBitmap','BottomButtons','encounterStepsMinimum','Sprite_Battler_startMove','Settings','_targetAnchor','ParseArmorNotetags','TAB','floor','buttonAssistKey4','Sprite_Gauge_currentValue','sparamPlus1','buttonAssistOffset3','stencilOp','showIncompleteTilesetError','WIN_OEM_FJ_TOUROKU','EquipMenu','updatePictureSettings','altKey','Padding','VisuMZ_3_EventChainReact','TranslucentOpacity','NUM','stretch','playMiss','AllTroops','_eventId','actorWindowRect','Exported_Script_%1.txt','loadTitle2','levelUp','exp','ItemPadding','_displayX','targetScaleX','LineHeight','button','createDigits','makeAutoBattleActions','CommonEventID','flush','tab','updatePositionCoreEngineShakeHorz','_categoryWindow','InputRect','F17','setEasingType','_pictureContainer','Spriteset_Base_updatePosition','drawActorExpGauge','ActorMPColor','right','ColorMaxLvGauge1','pagedown','Symbol','initRotationCoreEngine','onXhrError','_targetScaleY','Scene_Equip_create','INSINE','parameters','IDs','removeFauxAnimation','touchUI','ParamArrow','openingSpeed','PictureRotate','SParamVocab9','createPointAnimation','clamp','Scene_Title','TitleCommandList','updatePointAnimations','F18','onKeyDownKeysF6F7','SParamVocab1','Icon','textAlign','COMMA','setActorHomeRepositioned','drawParamName','mpColor','KeyUnlisted','_targetOffsetX','SParamVocab3','learnings','_opening','targetY','Enable','ETB','goldWindowRect','NewGameCommonEventAll','DEF','ParamMax','sparamRate1','_coreEasing','_pagedownButton','KeyItemProtect','ProfileBgType','scrollRight','(\x5cd+)([%％])>','drawText','_scrollBarHorz','tilesetNames','requestMotion','MCR','process_VisuMZ_CoreEngine_Functions','isNwjs','filters','targetContentsOpacity','createTileExtendSprites','_encounterCount','drawIconBySize','Bitmap_clearRect','_repositioned','Max','ExtractStrFromMap','params','_goldWindow','Scene_Base_terminate','pow','_pressed','_coreEasingType','maxItems','createSpriteset','OPEN_BRACKET','updateBackOpacity','height','playTestF7','SlotBgType','_fauxAnimationQueue','initDigitGrouping','ParseClassNotetags','drawIcon','cursorDown','tileWidth','MenuLayout','_troopId','FontSmoothing','isArrowPressed','enable','XParamVocab3','checkCacheKey','Finish','exportAllTroopStrings','_subject','paramBase','randomInt','getBattleSystem','angle','makeCoreEngineCommandList','Game_Temp_initialize','updateScene','alwaysDash','constructor','successRate','〘Common\x20Event\x20%1:\x20%2〙\x20End','paramPlusJS','ImgLoad','destroyScrollBarBitmaps','updatePlayTestF7','sparam','consumeItem','_isWindow','_playtestF7Looping','originalJS','_pictureName','ShowDevTools','menu','isInstanceOfSceneMap','VariableJsBlock','Window_Base_drawFace','TILDE','wait','SETTINGS','_buttonType','Scene_Battle_createSpriteset_detach','onerror','makeFontBigger','ButtonAssist','%1〘End\x20Choice\x20Selection〙%1','loadBitmap','UNDERSCORE','playCursorSound','LoadMenu','bind','popScene','IconXParam9','CEV','_helpWindow','_setupEventHandlers','Window_Base_destroyContents','itypeId','FontSize','xparamFlat2','keypress','cursorPageup','_stored_powerUpColor','updateWaitMode','drawGoldItemStyle','invokeCounterAttack','StatusBgType','command111','_inputString','_hovered','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','_forcedTroopView','PictureEraseAll','STENCIL_TEST','_realScale','startShake','buttonAssistText2','contains','lineHeight','buttonAssistText%1','ExtJS','IconIndex','F7key','_backSprite1','updateScrollBarVisibility','CTB','_pauseSignSprite','exportAllMapStrings','isEnemy','Tilemap_addSpotTile','processSoundTimings','uiAreaWidth','rightArrowWidth','atbActive','Scene_MenuBase_helpAreaTop','bgsVolume','INOUTCIRC','_shakeSpeed','DETACH_PICTURE_CONTAINER','CustomParamType','iconHeight','Scene_Base_create','_targetX','Window_NameInput_cursorRight','imageSmoothingEnabled','skipBranch','clearForcedGameTroopSettingsCoreEngine','paramMaxJS','isAnimationOffsetXMirrored','initCoreEngineScreenShake','_itemWindow','VOLUME_UP','cancel','_bgmBuffer','destroyed','makeInputButtonString','Abbreviation','setViewport','command122','mpGaugeColor2','writeFile','Game_Action_updateLastTarget','createFauxAnimationSprite','FDR','Game_Action_itemHit','ONE_MINUS_SRC_ALPHA','Scene_Map_update','BattleManager_update','_pointAnimationSprites','loadTitle1','smoothSelect','DisplayLockY','Window_Scrollable_update','Scene_Name_onInputOk','Game_Picture_updateMove','SLEEP','animationShouldMirror','setBackgroundOpacity','BaseTexture','forceStencil','processCursorMove','XParamVocab2','_actor','_muteSound','addOnceParallelInterpreter','xparamPlusJS','_iconIndex','_anglePlus','Input_shouldPreventDefault','SideView','updateOnceParallelInterpreters','Linear','StatusMenu','WIN_OEM_COPY','useFontWidthFix','nw.gui','HelpBgType','match','loadWindowskin','EQUALS','NumberRect','_playTestFastMode','hpGaugeColor2','IconParam5','updateFrame','_storedMapText','CodeJS','vert','updateMainMultiply','toUpperCase','GoldMax','mute','executeLoad','playTestF6','3766682rlThop','onDatabaseLoaded','AutoScrollLockX','isCursorMovable','Sprite_AnimationMV_updatePosition','_internalTextures','buttonAssistCancel','_animation','deathColor','TPB\x20WAIT','defaultInputMode','F13','layoutSettings','ParseItemNotetags','FontShadows','OUTSINE','playCursor','Game_Character_processMoveCommand','CNT','GoldRect','changeTileset','scrollDown','targetBackOpacity','reduce','_currentBgm','_customModified','hideButtonFromView','_previousClass','Window_Base_update','Scene_Options_create','home','startMove','MinDuration','sv_actors','DisplayLockX','setHandler','sparamPlus2','child_process','Current\x20tileset\x20has\x20incomplete\x20flag\x20data.','LevelUpFullMp','SideButtons','SystemLoadAudio','BTestWeapons','Window_NameInput_cursorLeft','setViewportCoreEngineFix','NUMPAD3','fontSize','scrollbar','subjectHitRate','scaleY','IconParam2','Game_Event_start','Scene_Battle_createSpritesetFix','slice','IconParam4','TextPopupShow','AnimationMirrorOffset','#%1','gaugeHeight','_defaultStretchMode','tilesetFlags','AllMaps','OffBarOpacity','pageup','tileHeight','updatePositionCoreEngineShakeVert','VisuMZ_2_BattleSystemCTB','removeAllPointAnimations','updateBgmParameters','expRate','get','<JS\x20%1\x20%2:[\x20](.*)>','isAlive','_targetY','F12','parseForcedGameTroopSettingsCoreEngine','INOUTSINE','_drawTextOutline','Window_refreshBack','INELASTIC','MINUS','DATABASE','getLevel','adjustX','SPACE','context','setCoreEngineScreenShakeStyle','_screenY','destroy','jsQuickFunc','ColorSystem','drawItem','keyCode','Color','getInputButtonString','anglePlus','measureTextWidthNoRounding','PictureID','pitch','PageChange','randomJS','catchUnknownError','EVA','_lastPluginCommandInterpreter','ARRAYJSON','center','updateDuration','BattleManager_invokeCounterAttack','_colorTone','contentsBack','pointX','expGaugeColor2','mpGaugeColor1','FINAL','itemPadding','_editWindow','_height','_stypeId','createCustomParameter','Scene_Load','_displayY','isGameActive','activate','CommandList','buttonAssistOk','destroyCoreEngineMarkedBitmaps','resize','_allTextHeight','updateAnchor','Game_Action_itemEva','_listWindow','getCustomBackgroundSettings','QUOTE','canUse','Bitmap_resize','_baseTexture','Scene_Item_create','ctGaugeColor1','_commandWindow','SellBgType','command355','areButtonsHidden','initButtonHidden','WIN_OEM_FJ_MASSHOU','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','setTargetAnchor','ColorHPGauge2','_dummyWindow','isTpb','_backSprite2','3461208cIhNwi','nah','createDimmerSprite','statusParamsWindowRect','CustomParamNames','INCUBIC','drawAllParams','createSubSprite','translucentOpacity','BTestAddedQuantity','goto','getColor','includes','win32','ButtonHeight','drawTextEx','_refreshPauseSign','setSkill','font','areTileShadowsHidden','Game_Picture_calcEasing','startAnimation','IconParam6','centerY','setupRate','NoTileShadows','IconSParam2','fillAll','_onKeyDown','refreshSpritesetForExtendedTiles','isSceneBattle','updateDocumentTitle','itemBackColor2','Scene_Map_createMenuButton','target','Chance','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','HANJA','start','_digitGrouping','parse','_cache','dimColor2','applyForcedGameTroopSettingsCoreEngine','_animationQueue','ShowItemBackground','DummyBgType','checkPlayerLocation','Bitmap_initialize','enableDigitGroupingEx','pan','move','isCancelled','SParamVocab0','ButtonFadeSpeed','faces','_active','type','show','CLOSE_CURLY_BRACKET','createPointAnimationSprite','SwitchRandomizeOne','_updateGamepadState','ColorDeath','BlurFilter','updateOpacity','_logWindow','addChildToBack','TimeProgress','playBuzzer','WIN_OEM_PA3','menuShowButton','EXCLAMATION','processKeyboardHandling','_inputWindow','destroyContents','Scene_Name_create','DocumentTitleFmt','maxLevel','INBOUNCE','isClosed','Input_clear','Game_Map_scrollDown','tpCostColor','isSceneMap','setTileFrame','CustomParam','PIPE','updatePositionCoreEngineShakeOriginal','_scrollBarVert','Pixelated','OUTCIRC','LINEAR','gaugeRate','BgFilename1','_onLoad','MvAnimationRate','WIN_OEM_FJ_ROYA','initialize','number','processKeyboardDigitChange','xparamPlus1','TextJS','createFauxAnimation','evaded','performEscape','maxCols','SParameterFormula','Skill-%1-%2','ItemBgType','process_VisuMZ_CoreEngine_Settings','Game_Picture_updateRotation','mev','xdg-open','drawValue','updateScrollBarPosition','buttonAssistText5','_hideTileShadows','Gold','paramRate2','DamageColor','fromCharCode','REPLACE','CTRL','ColorCrisis','resetBattleSystem','setMute','outlineColor','targets','EnableMasking','keyMapper','OUTEXPO','paramRate1','update','Game_Picture_y','gameTitle','setActorHome','ExtractStrFromTroop','setSize','DefaultStyle','processDrawIcon','stringKeyMap','RepositionEnemies','_tileExtendTerrainTags','drawBackgroundRect','CRSEL','DashToggleR','VisuMZ_2_BattleSystemOTB','Game_Picture_angle','call','moveRelativeToResolutionChange','〘Common\x20Event\x20%1:\x20%2〙\x20Start','setBackgroundType','FTB','pressed','horzJS','isFauxAnimationPlaying','setLastPluginCommandInterpreter','isGamepadConnected','calcCoreEasing','normalColor','text','getKeyboardInputButtonString','_stored_tpGaugeColor1','_isPlaytest','ListRect','buttonAssistWindowButtonRect','AudioChangeBgmPan','gaugeLineHeight','setup','Scene_SingleLoadTransition','keys','SceneManager_isGameActive','updatePictureCoordinates','create','src','processKeyboardBackspace','ctrl','mhp','checkCoreEngineDisplayCenter','vertical','filter','push','processHandling','Bitmap_drawText','IconSParam9','Game_Picture_initRotation','_battlerName','optSideView','paramchangeTextColor','INEXPO','EnableNameInput','ZERO','DOUBLE_QUOTE','mainAreaBottom','SParamVocab4','Window_Selectable_drawBackgroundRect','getCoreEngineScreenShakeStyle','ItemHeight','Keyboard','Scene_MenuBase_mainAreaTop','createCustomBackgroundImages','buttonY','nickname','X:\x20%1','switchModes','removeAllFauxAnimations','processTimingData','PictureShowIcon','style','isPlaytest','IconSParam3','wholeDuration','VisuMZ_2_BattleSystemSTB','isActor','value','PTB','ItemBackColor2','cos','Game_Actor_changeClass','SnapshotOpacity','OkText','ListBgType','xparamPlus','_menuButton','calcEasing','_changingClass','ActorRect','ALT','ShowScrollBar','PixelateImageRendering','globalAlpha','ATTN','setupFont','mirror','ParseAllNotetags','_shakePower','Spriteset_Base_destroy','ParseSkillNotetags','Scene_Map_updateScene','NameMenu','shake','SCROLLBAR','WIN_OEM_RESET','Game_Troop_setup','scrollbarHeight','updatePictureAntiZoom','buttonAssistWindowSideRect','Window_ShopSell_isEnabled','strokeRect','DIVIDE','ProfileRect','INOUTQUART','Spriteset_Base_update','TargetAngle','tileset','xparamRate1','checkScrollBarBitmap','maxTp','drawCircle','ColorMPCost','initVisuMZCoreEngine','Game_Interpreter_updateWaitMode','%1〘Choice\x20Cancel〙%1','loadIconBitmap','helpAreaTopSideButtonLayout','CommandBgType','isSmartEventCollisionOn','resetTextColor','Page','SParamVocab5','This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!','arePageButtonsEnabled','updateCurrentEvent','createTilemap','_digitGroupingEx','sparamFlat2','MapNameTextCode','actor','BattleManager_checkSubstitute','adjustBoxSize','Input_updateGamepadState','_coreEngineShakeStyle','updatePadding','tpGaugeColor2','makeTargetSprites','bgs','playOnceParallelInterpreter','OutlineColorGauge','_makeFontNameText','contentsOpacity','processCursorMoveModernControls','EditRect','tpGaugeColor1','outbounce','getGamepads','Param','adjustY','Bitmap_drawCircle','baseTextRect','isLoopVertical','isGamepadTriggered','createTroopNote','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_margin','_stored_deathColor','updateCoreEasing','GoldFontSize','Scene_Map_createSpriteset','ParseTilesetNotetags','isPressed','Scene_MenuBase_createPageButtons','Game_Interpreter_command355','clearZoom','PLAY','FUNC','DigitGroupingGaugeSprites','TextCodeNicknames','allTiles','MultiKeyFmt','_stored_ctGaugeColor1','createFauxAnimationQueue','windowPadding','_CoreEngineSettings','SceneManager_exit','ExtractStrFromList','endAnimation','dropItems','Game_Interpreter_command122','OPEN_CURLY_BRACKET','BACKSPACE','Bitmap_gradientFillRect','setupScrollBarBitmap','App','ctrlKey','level','blendFunc','updateOpen','traitsPi','Game_Map_setup','Graphics_printError','bitmapHeight','Game_Map_setDisplayPos','STR','setAttack','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','buttonAssistKey1','Wait','GET','registerCommand','makeDocumentTitle','StatusRect','IconParam0','Window_NameInput_cursorPagedown','WIN_OEM_JUMP','makeDeepCopy','buttonAssistOffset4','CRI','index','determineSideButtonLayoutValid','isPlaying','clearRect','batch','canAttack','setMainFontSize','platform','createWindowLayer','ActorBgType','ControllerButtons','createCommandWindow','Window_Base_createTextState','horizontal','createBackground','terminate','ImprovedAccuracySystem','subject','buyWindowRect','PictureFilename','\x5c}❪TAB❫\x5c{','measureText','QwertyLayout','onEscapeSuccess','GetParamIcon','setColorTone','_lastScrollBarValues','_statusEquipWindow','helpAreaHeight','IconSParam0','initCoreEngine','removeAnimation','ADD','Scene_Boot_loadSystemImages','numActions','clone','helpAreaTop','visible','currentLevelExp','paramFlat','endBattlerActions','movePageButtonSideButtonLayout','Window','changeTextColor','DataManager_setupNewGame','powerDownColor','ExportString','PLUS','drawGauge','end','_windowskin','windowOpacity','param','_lastCommandSymbol','Spriteset_Map_createTilemap','scale','ARRAYFUNC','setTopRow','HRG','itemHit','systemColor','Sprite_destroy','terms','buttonAssistOffset2','_actorWindow','object','Spriteset_Base_isAnimationPlaying','_skillTypeWindow','checkSmartEventCollision','SCALE_MODES','repositionCancelButtonSideButtonLayout','findSymbol','isEventRunning','isMaxLevel','UpdatePictureCoordinates','snapForBackground','IconSParam4','getLastUsedGamepadType','toFixed','_battleField','getTileExtendTerrainTags','loadMapData','_windowLayer','deactivate','clearCachedKeys','_width','Game_Picture_x','pages','position','_spriteset','_offsetY','command105','maxVisibleItems','isRepeated','itemLineRect','HOME','isBusy','Match','OutlineColorDmg','CANCEL','_scene','open','_sellWindow','ParseWeaponNotetags','KEEP','playTestShiftT','OTB','setDisplayPos','3iWHKkG','prepareNextScene','isKeyItem','hpColor','valueOutlineColor','tilesets','isCollidedWithEvents','smallParamFontSize','ACCEPT','isLoopHorizontal','ShowButtons','_centerElement','NUMPAD7','playBgs','OUTBOUNCE','([\x5c+\x5c-]\x5cd+)>','_url','RightMenus','save','ColorMPGauge2','Center','scrollUp','bgm','GroupDigits','outlineColorGauge','addEventListener','isPhysical','titles1','makeCommandList','Opacity','setValue','img/%1/','Key%1','isAutoColorAffected','animationId','ExportAllMapText','moveMenuButtonSideButtonLayout','processFauxAnimationRequests','allowShiftScrolling','members','mainAreaHeight','_tilemap','pointY','_centerCameraCheck','PDR','Window_Gold_refresh','Sprite_Button_updateOpacity','processMoveCommand','currentValue','Game_Map_changeTileset','MAXHP','_lastIconIndex','mainAreaTopSideButtonLayout','6473716sivKxp','isMaskingEnabled','thickness','PA1','Plus2','_inputSpecialKeyCode','IconSParam6','_statusWindow','onInputBannedWords','substring','statusEquipWindowRect','MAX_GL_TEXTURES','scrollX','textHeight','isDying','offset','bodyColor','_colorCache','_targets','filterArea','_data','_forcedBattleSys','RevertPreserveNumbers','fadeSpeed','Window_Base_initialize','scrollLeft','updateData','gainGold','Window_Selectable_processTouch','_pictureCoordinatesWindow','AGI','_screenX','Game_BattlerBase_initMembers','ParamChange','option','_anchor','VOLUME_DOWN','volume','_destroyInternalTextures','addChild','keyRepeatWait','createEnemies','listWindowRect','_scaleX','RPGMAKER_VERSION','current','down','drawGameTitle','autoRemovalTiming','_stored_systemColor','bitmap','enableDigitGrouping','IconXParam2','mainFontSize','layeredTiles','CustomParamAbb','processDigitChange','sin','Input_pollGamepads','_movementWholeDuration','buttonAssistOffset%1','boxWidth','_pollGamepads','pos','KeyboardInput','WIN_OEM_PA1','ShowJS','process_VisuMZ_CoreEngine_ControllerButtons','title','checkPassage','_opacity','getButtonAssistLocation','adjustSprite','join','PreserveNumbers','%1%2','Plus','isOpening','_pageupButton','enemies','ShiftT_Toggle','createExtendedTileSprite','〘Show\x20Text〙\x0a','Game_Picture_scaleY','select','Window_TitleCommand_selectLast','AccuracyBoost','ColorManager_loadWindowskin','Sprite_Picture_updateOrigin','setLastGamepadUsed','ColorTPGauge2','random','Window_SkillList_includes','BattleSystem','getPointAnimationLayer','Scene_Map_createSpritesetFix','centerCameraCheckData','buttonAssistText3','WIN_OEM_BACKTAB','QoL','_stored_expGaugeColor2','createJsQuickFunction','markCoreEngineModified','AdjustAngle','Scene_Map_updateMain','ALWAYS','WIN_OEM_CUSEL','openness','operand','TextFmt','loadBitmapCoreEngine','setAnglePlusData','stencilFunc','Scene_Battle_createCancelButton','_statusParamsWindow','EnableNumberInput','min','overallWidth','SceneManager_onKeyDown','DrawItemBackgroundJS','getLastPluginCommandInterpreter','ConvertNumberToString','Show\x20Scrolling\x20Text\x20Script\x20Error','_bgsBuffer','F21','pixelated','Scene_Status_create','_dimmerSprite','DimColor1','escape','TextManager_param','DigitGroupingLocale','_drawTextShadow','_tileExtendSprites','_onceParallelInterpreters','requestPointAnimation','createBuffer','updateFrameCoreEngine','Bitmap_blt','_downArrowSprite','padding','_fauxAnimationSprites','offsetX','setFrame','list','_cancelButton','_shiftY','showFauxAnimations','_shakeDuration','%1:\x20Exit\x20','showDevTools','_buyWindow','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','INBACK','isTileExtended','cursorPagedown','Bitmap_drawTextOutline','skillTypes','measureTextWidth','onButtonImageLoad','FadeSpeed','BottomHelp','setupValueFont','consumable','centerSprite','PAUSE','isAnimationPlaying','Basic','ExportStrFromAllTroops','setupButtonImage','updateMove','_mapY','ColorNormal','_optionsWindow','textSizeEx','4723670mgAbgJ','GoldOverlap','MAT','_blank','VisuMZ_2_BattleSystemETB','return\x200','inbounce','anchor','_showDevTools','INSERT','DOLLAR','process_VisuMZ_CoreEngine_jsQuickFunctions','coreEngineRepositionEnemies','areButtonsOutsideMainUI','EXSEL','textWidth','innerHeight','targetScaleY','isGamepadAxisMoved','AudioChangeBgsPitch','StateIconsNonFrame','targetOpacity','rgba(0,\x200,\x200,\x200.7)','ShortcutScripts','_startPlaying','ParseActorNotetags','_lastGamepad','F22','easingType','fillRect','missed','PERCENT','CLEAR','WIN_OEM_ATTN','EndingID','ActorTPColor','ScaleY','itemSuccessRate','offColor','isTriggered','_backSprite','damageColor','GoldIcon','_origin','WindowLayer_render','createButtonAssistWindow','_maxDigits','Rate2','ATK','CallHandlerJS','XParameterFormula','item','battleSystem','trim','playtestQuickLoad','Flat1','Sprite_StateIcon_loadBitmap','xparamFlatJS','boxHeight','STENCIL_BUFFER_BIT','ParseStateNotetags','drawActorSimpleStatus','system','_backgroundFilter','clear','Game_BattlerBase_refresh','smooth','\x0a\x0a\x0a\x0a\x0a','blt','initMembersCoreEngine','displayName','isActiveTpb','MAXMP','commandWindowRows','nextLevelExp','ScreenResolution','picture','close','HIT','Input_setupEventHandlers','Type','LvExpGauge','processTouch','MULTIPLY','Game_Map_scrollRight','Item-%1-%2','Game_Party_consumeItem','DetachBattlePictureContainer','displayX','updateEffekseer','Window_NameInput_processHandling','mainCommandWidth','currentClass','replace','createPageButtons','createTextPopupWindow','createAnimationSprite','moveCancelButtonSideButtonLayout','ItemRect','Sprite_Gauge_gaugeRate','PRINT','Sprite_AnimationMV_processTimingData','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','WIN_OEM_AUTO','VOLUME_MUTE','setAnchor','TextStr','_commandList','_lastX','Control\x20Variables\x20Script\x20Error','_lastY','ExportAllTroopText','loadSystem','EditBgType','isGamepadButtonPressed','WIN_OEM_ENLW','Flat2','updateDashToggle','_onKeyPress','WIN_ICO_CLEAR','processKeyboardDelete','_buttonAssistWindow','STRUCT','loadTileBitmap','addCommand','loadGameImagesCoreEngine','BTB','adjustPictureAntiZoom','CorrectSkinBleeding','DetachMapPictureContainer','SParamVocab6','_numberWindow','Scene_Battle_createSpriteset','selectLast','_pointAnimationQueue','sqrt','Window_EquipItem_isEnabled','AudioChangeBgmVolume','ENTER_SPECIAL','refreshDimmerBitmap','drawParamText','Input_update','mpCostColor','battlebacks1','createCancelButton','0.00','paramRateJS','Window_Base_drawCharacter','_mainSprite','PictureEraseRange','onlyfilename','pagedownShowButton','CtrlQuickLoad','paramX','Subtitle','framesPerChar','PositionX','ENTER','turn','updateMain','Enemy-%1-%2','targetX','ColSpacing','isPointAnimationPlaying','Game_Event_isCollidedWithEvents','MDR','useDigitGroupingEx','stypeId','bgmVolume','key%1','5861436dhzlgk','isMenuButtonAssistEnabled','isSideView','$dataMap','meVolume','doesNameContainBannedWords','needsUpdate','INOUTQUINT','paramValueByName','Weapon-%1-%2','isWindowMaskingEnabled','overallHeight','Bitmap_strokeRect','onClick','SkillTypeBgType','setCommonEvent','_stored_powerDownColor','BgFilename2','round','Bitmap_fillRect','exec','atypeId','Sprite_Actor_setActorHome','itemHeight','IconXParam3','ParamName','_stored_tpCostColor','Scene_Skill_create','_context','Plus1','ExtDisplayedParams','CrisisRate','ARRAYSTRUCT','isUseModernControls','VisuMZ_2_BattleSystemBTB','_textPopupWindow','_patternHeight','Window_NameInput_cursorDown','alpha','%1〘Choice\x20%2〙\x20%3%1','%1\x0a','PRINTSCREEN','hit','paramMax','process_VisuMZ_CoreEngine_Notetags','repeat','_moveEasingType','Actor','NUMPAD6','operation','ColorPowerDown','integer','AnimationPoint','Manual','TCR','Map%1','OptionsBgType','mapId','paramY','setClickHandler','processPointAnimationRequests','_movementDuration','recoverAll','isMapScrollLinked','loadSystemImages','drawGameVersion','_rate','Scene_Base_createWindowLayer','waiting','Game_Action_setAttack','21cRlPBD','Window_NumberInput_processDigitChange','_bypassCanCounterCheck','opacity','EXECUTE','getBackgroundOpacity','RowSpacing','restore','ScaleX','up2','_sideButtonLayout','PictureEasingType','split','textBaseline','Spriteset_Base_initialize','VIEWPORT','Window_Selectable_processCursorMove','(\x5cd+\x5c.?\x5cd+)>','slotWindowRect','name','DOWN','initialBattleSystem','children','WIN_OEM_WSCTRL','SEMICOLON','_tile','Scene_MenuBase_createCancelButton','processKeyboardHome','_tileSprite','IconSet','Version','startAutoNewGame','drawNewParam','Map%1.json','onKeyDown','JSON','setEnemyAction','width','662750qlMaxY','EREOF','Scene_Shop_create','Game_Action_numRepeats','playOk','checkSubstitute','stop','F11','add','isOptionValid','format','WIN_OEM_FINISH','SystemSetWindowPadding','helpAreaBottom','changeAnglePlusData','exit','SCROLL_LOCK','playTestShiftR','numRepeats','bitmapWidth','commandWindowRect','OpenConsole','advanced','Scene_Menu_create','STB','applyEasingAnglePlus','Game_Actor_levelUp','xparamPlus2','WIN_OEM_PA2','createMenuButton','contents','MEV','addWindow','loading','parallaxes','VisuMZ_2_BattleSystemFTB','getLastGamepadUsed','mainAreaHeightSideButtonLayout','overrideMimeType','default','guardSkillId','xparamFlatBonus','IconXParam8','Scene_Battle_update','TextCodeClassNames','StatusEquipRect','Origin','animations','processCursorHomeEndTrigger','_clientArea','Window_Selectable_itemRect','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_timeDuration','reserveCommonEvent','_image','setSideButtonLayout','CategoryBgType','EXR','Game_Interpreter_PluginCommand','skillTypeWindowRect','_lastOrigin','inputWindowRect','MenuBg','refresh','buttonAssistText4','%2%1%3','tpColor','retreat','send','BKSP','_clickHandler','attackSkillId','evade','useDigitGrouping','TGR','isScrollBarVisible','isSpecialCode','removePointAnimation','_drawTextBody','Game_Picture_initBasic','paramPlus','XParamVocab0','State-%1-%2','pop','setEvent','onload','isItem','initMembers','fillText','NUMPAD1','gainSilentTp','top','MODECHANGE','normal','process_VisuMZ_CoreEngine_CustomParameters','_stored_maxLvGaugeColor2','Bitmap_measureTextWidth','KeySHIFT','text%1','saveViewport','DummyRect','ForceNoPlayTest','maxHorz','etypeId','Game_Picture_move','maxGold','mmp','pictureId','subtitle','background','buttonAssistKey3','WIN_OEM_FJ_JISHO','getColorDataFromPluginParameters','setupTileExtendTerrainTags','ColorTPGauge1','Sprite_Animation_processSoundTimings','BarBodyColor','Game_Map_scrollUp','AudioChangeBgsPan','sparamFlat1','_srcBitmap','processBack','applyEasing','isBottomButtonMode','StatusParamsRect','OUTBACK','MDF','Game_Screen_initialize','isEnabled','length','buttonAreaHeight','Scene_Boot_startNormalGame','_pictureCoordinatesMode','addAnimationSpriteToContainer','HelpRect','vertJS','updatePositionCoreEngine','left','_name','\x20Origin:\x20%1','_stored_hpGaugeColor1','F15','battlebacks2','DisplayedParams','INCIRC','maxScrollX','NewGameBoot','XParamVocab8','and\x20add\x20it\x20onto\x20this\x20one.','buttonAssistKey%1','Troop%1','clearOnceParallelInterpreters','URL','removeChild','dimColor1','disable','none','SEPARATOR','ModernControls','OpenSpeed','WIN_ICO_00','NUMPAD0','setupCoreEngine','retrievePointAnimation','NUMPAD8','ExportStrFromAllMaps','setupCoreEasing','onInputOk','ParseEnemyNotetags','yScrollLinkedOffset','Upper\x20Left','drawActorClass','GameEnd','CoreEngine','IconXParam6','_targetOffsetY','initCoreEasing','IconParam3','Sprite_Animation_setViewport','toLowerCase','BACK_QUOTE','paramBaseAboveLevel99','drawing','wtypeId','TRG','REC','OptionsMenu','setActionState','BgType','_scrollDuration','drawBackground','indexOf','RepositionActors','isOpenAndActive','Game_Picture_scaleX','Graphics_defaultStretchMode','_cacheScaleY','updateFauxAnimations','Window_MapName_refresh','crisisColor','LoadError','_upArrowSprite','_stored_hpGaugeColor2','Scene_Map_createSpriteset_detach','BasicParameterFormula','ColorExpGauge1','VisuMZ_1_OptionsCore','_destroyCanvas','OutlineColor','scaleSprite','_onError','setCoreEngineUpdateWindowBg','_hideButtons','Window_NumberInput_start','processKeyboardEnd','setMoveEasingType','_cacheScaleX','StartID','displayY','showPicture','seek','isOpen','CategoryRect','_mirror','refreshActor','_currentBgs','drawRightArrow','catchLoadError','enter','_stored_gaugeBackColor','Game_Actor_paramBase','WIN_ICO_HELP','_originalViewport','origin','drawCharacter','OUTQUAD','scaleX','cursorRight','END','buttonAssistText1','xScrollLinkedOffset','darwin','font-smooth','TPB\x20ACTIVE','printError','_hp','resetFontSettings','dashToggle','MRG','Script\x20Call\x20Error','setSideView','inBattle','isTouchedInsideFrame','RegExp','INOUTELASTIC','OUTELASTIC','isItemStyle','_stored_normalColor','Rate1','traitObjects','CreateBattleSystemID','EVAL','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','createScrollBarSprites','maxLvGaugeColor1','isExpGaugeDrawn','isMVAnimation','Graphics_centerElement','_slotWindow','catchException','Total','Class-%1-%2','buttonAssistSwitch','Game_Picture_show','shouldAutosave','_profileWindow','horz','PRESERVCONVERSION(%1)','ControllerMatches','asin','ConvertParams','ColorTPCost','IconParam1','onLoad','drawActorLevel','defineProperty','loadTileset','LevelUpFullHp','ScreenShake','ItemMenu','deflate','_gamepadWait','sparamRateJS','_tempActor','KeyTAB','_mode','HASH','IconXParam0','ApplyEasing','setupNewGame','max','backOpacity','SParamVocab7','ceil','SwitchToggleOne','BattleManager_processEscape','_stored_mpCostColor','getControllerInputButtonString','enemy','updateTransform','helpWindowRect','XParamVocab6','BuyBgType','startNormalGame','PGUP','MIN_SAFE_INTEGER','cancelShowButton','maxLvGaugeColor2','windowRect','playBgm','ShiftR_Toggle','levelUpRecovery','GREATER_THAN','processTouchModernControls','_commonEventLayers','onActorChange','showPointAnimations','itemHitImprovedAccuracy','animationBaseDelay','repositionEnemiesByResolution','VisuMZ_2_BattleSystemPTB','concat','ASTERISK','maxScrollY','shift','getInputMultiButtonStrings','transform','DigitGroupingDamageSprites','faceWidth','uiAreaHeight','iconWidth','eva','isNormalPriority','createTextState','buttonAssistWindowRect','retrieveFauxAnimation','remove','storeMapData','command357','Scene_Boot_updateDocumentTitle','keyboard','NON_FRAME','_list','BlendMode','GRD','Title','InputBgType'];_0x18f6=function(){return _0x1feec2;};return _0x18f6();};$onceParallel=function(_0x51f4f2,_0x730578){const _0x576a01=_0x5ca092;if(SceneManager['isSceneMap']())SceneManager['_scene'][_0x576a01(0x50b)](_0x51f4f2,_0x730578);else{if(SceneManager[_0x576a01(0x40a)]()){if(Imported['VisuMZ_1_BattleCore'])SceneManager[_0x576a01(0x5b6)]['playOnceParallelInterpreter'](_0x51f4f2);else $gameTemp&&$gameTemp[_0x576a01(0x4be)]()&&alert('Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!');}else $gameTemp&&$gameTemp['isPlaytest']()&&alert(_0x576a01(0x4fb));}},StorageManager['jsonToZip']=function(_0x31a432){return new Promise((_0x592168,_0x36645c)=>{const _0x38e24f=_0xd91e;try{const _0x47487a=pako[_0x38e24f(0x8da)](_0x31a432,{'to':'string','level':0x1});if(_0x47487a[_0x38e24f(0x839)]>=0xc350){}_0x592168(_0x47487a);}catch(_0x10b445){_0x36645c(_0x10b445);}});},TextManager[_0x5ca092(0x479)]=['','','',_0x5ca092(0x5b5),'','',_0x5ca092(0x93d),'',_0x5ca092(0x536),_0x5ca092(0x228),'','',_0x5ca092(0x6c2),_0x5ca092(0x73f),_0x5ca092(0x72c),'',_0x5ca092(0x215),_0x5ca092(0x467),_0x5ca092(0x4d0),_0x5ca092(0x698),_0x5ca092(0x963),'KANA','EISU',_0x5ca092(0x1e5),_0x5ca092(0x3c7),_0x5ca092(0x411),'','ESC','CONVERT','NONCONVERT',_0x5ca092(0x5c6),_0x5ca092(0x814),_0x5ca092(0x3aa),_0x5ca092(0x8f2),_0x5ca092(0x1de),_0x5ca092(0x8a6),_0x5ca092(0x5b1),'LEFT','UP','RIGHT',_0x5ca092(0x7a6),'SELECT',_0x5ca092(0x706),_0x5ca092(0x796),_0x5ca092(0x775),_0x5ca092(0x6ab),'DELETE','','0','1','2','3','4','5','6','7','8','9','COLON',_0x5ca092(0x7aa),'LESS_THAN','EQUALS',_0x5ca092(0x8fa),'QUESTION_MARK','AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x5ca092(0x20a),'',_0x5ca092(0x97a),'',_0x5ca092(0x32f),_0x5ca092(0x859),_0x5ca092(0x811),'NUMPAD2',_0x5ca092(0x383),_0x5ca092(0x20c),'NUMPAD5',_0x5ca092(0x77c),_0x5ca092(0x5ca),_0x5ca092(0x85c),'NUMPAD9',_0x5ca092(0x6f5),_0x5ca092(0x572),_0x5ca092(0x855),'SUBTRACT','DECIMAL',_0x5ca092(0x4e6),'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10',_0x5ca092(0x7bf),_0x5ca092(0x3a0),_0x5ca092(0x361),'F14',_0x5ca092(0x845),'F16',_0x5ca092(0x24e),_0x5ca092(0x26a),'F19','F20',_0x5ca092(0x66f),_0x5ca092(0x6bd),'F23','F24','','','','','','','','','NUM_LOCK',_0x5ca092(0x7c8),_0x5ca092(0x827),_0x5ca092(0x3e5),_0x5ca092(0x230),'WIN_OEM_FJ_LOYA',_0x5ca092(0x44d),'','','','','','','','','','CIRCUMFLEX',_0x5ca092(0x434),_0x5ca092(0x4ad),_0x5ca092(0x8e0),_0x5ca092(0x6ac),_0x5ca092(0x6c1),'AMPERSAND',_0x5ca092(0x2d7),'OPEN_PAREN',_0x5ca092(0x97f),_0x5ca092(0x904),_0x5ca092(0x581),_0x5ca092(0x443),'HYPHEN_MINUS',_0x5ca092(0x535),_0x5ca092(0x427),_0x5ca092(0x2cd),'','','','',_0x5ca092(0x70a),_0x5ca092(0x617),_0x5ca092(0x317),'','',_0x5ca092(0x7aa),_0x5ca092(0x347),_0x5ca092(0x26f),_0x5ca092(0x3a6),'PERIOD',_0x5ca092(0x1eb),_0x5ca092(0x86c),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x5ca092(0x29e),'BACK_SLASH','CLOSE_BRACKET',_0x5ca092(0x3da),'','META','ALTGR','',_0x5ca092(0x89f),_0x5ca092(0x858),'',_0x5ca092(0x719),'','',_0x5ca092(0x4df),_0x5ca092(0x54e),_0x5ca092(0x634),_0x5ca092(0x7d4),_0x5ca092(0x432),_0x5ca092(0x7a9),_0x5ca092(0x65d),_0x5ca092(0x6c3),_0x5ca092(0x7c3),_0x5ca092(0x341),_0x5ca092(0x709),_0x5ca092(0x715),_0x5ca092(0x655),_0x5ca092(0x4d4),_0x5ca092(0x47d),_0x5ca092(0x6b0),_0x5ca092(0x7b9),_0x5ca092(0x526),'ZOOM','',_0x5ca092(0x5f6),_0x5ca092(0x95a),''],TextManager[_0x5ca092(0x3d2)]=VisuMZ['CoreEngine'][_0x5ca092(0x225)][_0x5ca092(0x2d4)][_0x5ca092(0x4c9)],TextManager[_0x5ca092(0x35c)]=VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x225)][_0x5ca092(0x2d4)]['CancelText'],TextManager[_0x5ca092(0x8c8)]=VisuMZ['CoreEngine'][_0x5ca092(0x225)][_0x5ca092(0x2d4)]['SwitchActorText'],VisuMZ[_0x5ca092(0x865)]['TextManager_param']=TextManager[_0x5ca092(0x586)],TextManager[_0x5ca092(0x586)]=function(_0x48880a){const _0x10be16=_0x5ca092;return typeof _0x48880a===_0x10be16(0x44f)?VisuMZ[_0x10be16(0x865)][_0x10be16(0x675)]['call'](this,_0x48880a):this[_0x10be16(0x1ec)](_0x48880a);},TextManager['paramName']=function(_0x5d1c02){const _0x27b95b=_0x5ca092;_0x5d1c02=String(_0x5d1c02||'')[_0x27b95b(0x351)]();const _0x3347f1=VisuMZ[_0x27b95b(0x865)][_0x27b95b(0x225)][_0x27b95b(0x514)];if(_0x5d1c02===_0x27b95b(0x5f0))return $dataSystem[_0x27b95b(0x590)][_0x27b95b(0x296)][0x0];if(_0x5d1c02===_0x27b95b(0x6ea))return $dataSystem['terms'][_0x27b95b(0x296)][0x1];if(_0x5d1c02==='ATK')return $dataSystem[_0x27b95b(0x590)]['params'][0x2];if(_0x5d1c02===_0x27b95b(0x27d))return $dataSystem['terms'][_0x27b95b(0x296)][0x3];if(_0x5d1c02===_0x27b95b(0x6a4))return $dataSystem['terms'][_0x27b95b(0x296)][0x4];if(_0x5d1c02===_0x27b95b(0x836))return $dataSystem[_0x27b95b(0x590)][_0x27b95b(0x296)][0x5];if(_0x5d1c02===_0x27b95b(0x611))return $dataSystem['terms'][_0x27b95b(0x296)][0x6];if(_0x5d1c02===_0x27b95b(0x938))return $dataSystem[_0x27b95b(0x590)][_0x27b95b(0x296)][0x7];if(_0x5d1c02==='HIT')return _0x3347f1[_0x27b95b(0x809)];if(_0x5d1c02===_0x27b95b(0x3bc))return _0x3347f1[_0x27b95b(0x947)];if(_0x5d1c02===_0x27b95b(0x551))return _0x3347f1[_0x27b95b(0x335)];if(_0x5d1c02===_0x27b95b(0x2dd))return _0x3347f1[_0x27b95b(0x2ae)];if(_0x5d1c02===_0x27b95b(0x7d7))return _0x3347f1[_0x27b95b(0x979)];if(_0x5d1c02===_0x27b95b(0x1f4))return _0x3347f1['XParamVocab5'];if(_0x5d1c02===_0x27b95b(0x368))return _0x3347f1[_0x27b95b(0x8ef)];if(_0x5d1c02===_0x27b95b(0x58c))return _0x3347f1['XParamVocab7'];if(_0x5d1c02===_0x27b95b(0x8b0))return _0x3347f1[_0x27b95b(0x84b)];if(_0x5d1c02==='TRG')return _0x3347f1[_0x27b95b(0x1ca)];if(_0x5d1c02===_0x27b95b(0x802))return _0x3347f1[_0x27b95b(0x421)];if(_0x5d1c02===_0x27b95b(0x91a))return _0x3347f1[_0x27b95b(0x26c)];if(_0x5d1c02===_0x27b95b(0x871))return _0x3347f1['SParamVocab2'];if(_0x5d1c02==='PHA')return _0x3347f1[_0x27b95b(0x275)];if(_0x5d1c02===_0x27b95b(0x28a))return _0x3347f1[_0x27b95b(0x4af)];if(_0x5d1c02===_0x27b95b(0x782))return _0x3347f1[_0x27b95b(0x4fa)];if(_0x5d1c02===_0x27b95b(0x5ea))return _0x3347f1[_0x27b95b(0x724)];if(_0x5d1c02===_0x27b95b(0x747))return _0x3347f1[_0x27b95b(0x8e6)];if(_0x5d1c02===_0x27b95b(0x323))return _0x3347f1['SParamVocab8'];if(_0x5d1c02===_0x27b95b(0x7f1))return _0x3347f1[_0x27b95b(0x264)];if(VisuMZ['CoreEngine'][_0x27b95b(0x3f0)][_0x5d1c02])return VisuMZ[_0x27b95b(0x865)][_0x27b95b(0x3f0)][_0x5d1c02];return'';},TextManager['getInputButtonString']=function(_0x37f6c5){const _0x51c71f=_0x5ca092,_0x3178da=Input[_0x51c71f(0x59f)]();return _0x3178da==='Keyboard'?this['getKeyboardInputButtonString'](_0x37f6c5):this[_0x51c71f(0x8eb)](_0x3178da,_0x37f6c5);},TextManager['getKeyboardInputButtonString']=function(_0x373646){const _0x56a825=_0x5ca092,_0x2d981b=VisuMZ['CoreEngine']['Settings']['ButtonAssist']['SplitEscape'];if(!_0x2d981b){if(_0x373646===_0x56a825(0x318))_0x373646=_0x56a825(0x674);if(_0x373646===_0x56a825(0x2c9))_0x373646=_0x56a825(0x674);}let _0x4898fe=[];for(let _0x257fe3 in Input[_0x56a825(0x46e)]){_0x257fe3=Number(_0x257fe3);if(_0x257fe3>=0x60&&_0x257fe3<=0x69)continue;if([0x12,0x20][_0x56a825(0x3f8)](_0x257fe3))continue;_0x373646===Input[_0x56a825(0x46e)][_0x257fe3]&&_0x4898fe[_0x56a825(0x4a2)](_0x257fe3);}for(let _0x56b4c7=0x0;_0x56b4c7<_0x4898fe[_0x56a825(0x839)];_0x56b4c7++){_0x4898fe[_0x56b4c7]=TextManager['stringKeyMap'][_0x4898fe[_0x56b4c7]];}return this[_0x56a825(0x31b)](_0x4898fe);},TextManager[_0x5ca092(0x31b)]=function(_0x5e686e){const _0x390dca=_0x5ca092,_0x5717e9=VisuMZ[_0x390dca(0x865)][_0x390dca(0x225)][_0x390dca(0x2d4)],_0x175ccb=_0x5717e9[_0x390dca(0x273)],_0x2f2a58=_0x5e686e[_0x390dca(0x80b)](),_0x1378e9=_0x390dca(0x5de)['format'](_0x2f2a58);return _0x5717e9[_0x1378e9]?_0x5717e9[_0x1378e9]:_0x175ccb[_0x390dca(0x7c2)](_0x2f2a58);},TextManager[_0x5ca092(0x907)]=function(_0x5b01bb,_0x14cfcc){const _0x794dad=_0x5ca092,_0x4e8b85=VisuMZ[_0x794dad(0x865)][_0x794dad(0x225)][_0x794dad(0x2d4)],_0x15aca9=_0x4e8b85[_0x794dad(0x52b)],_0x2607d1=this[_0x794dad(0x3b4)](_0x5b01bb),_0x5c291c=this[_0x794dad(0x3b4)](_0x14cfcc);return _0x15aca9[_0x794dad(0x7c2)](_0x2607d1,_0x5c291c);},TextManager[_0x5ca092(0x8eb)]=function(_0x5c74c1,_0x4e3cad){const _0x250781=_0x5ca092,_0x3a8d0f=_0x5c74c1['toLowerCase']()['trim'](),_0x121f49=VisuMZ[_0x250781(0x865)]['ControllerButtons'][_0x3a8d0f];if(!_0x121f49)return this[_0x250781(0x949)](_0x5c74c1,_0x4e3cad);return _0x121f49[_0x4e3cad]||this['getKeyboardInputButtonString'](_0x5c74c1,_0x4e3cad);},TextManager[_0x5ca092(0x949)]=function(_0x6a41da,_0x14463b){const _0x457785=_0x5ca092,_0x429c6e=_0x6a41da[_0x457785(0x86b)]()[_0x457785(0x6d7)]();for(const _0xe49745 in VisuMZ['CoreEngine'][_0x457785(0x8ce)]){if(_0x429c6e[_0x457785(0x3f8)](_0xe49745)){const _0xf15c14=VisuMZ[_0x457785(0x865)][_0x457785(0x8ce)][_0xe49745],_0x555ba5=VisuMZ[_0x457785(0x865)][_0x457785(0x55c)][_0xf15c14];return _0x555ba5[_0x14463b]||this[_0x457785(0x48e)](_0x14463b);}}return this['getKeyboardInputButtonString'](_0x14463b);},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x64a)]=ColorManager[_0x5ca092(0x346)],ColorManager[_0x5ca092(0x346)]=function(){const _0x1db875=_0x5ca092;VisuMZ[_0x1db875(0x865)][_0x1db875(0x64a)][_0x1db875(0x481)](this),this[_0x1db875(0x604)]=this['_colorCache']||{};},ColorManager[_0x5ca092(0x828)]=function(_0x17546a,_0x59cd87){const _0x2a0ef7=_0x5ca092;return _0x59cd87=String(_0x59cd87),this[_0x2a0ef7(0x604)]=this[_0x2a0ef7(0x604)]||{},_0x59cd87[_0x2a0ef7(0x345)](/#(.*)/i)?this[_0x2a0ef7(0x604)][_0x17546a]=_0x2a0ef7(0x38f)['format'](String(RegExp['$1'])):this[_0x2a0ef7(0x604)][_0x17546a]=this['textColor'](Number(_0x59cd87)),this[_0x2a0ef7(0x604)][_0x17546a];},ColorManager[_0x5ca092(0x3f7)]=function(_0x32325a){const _0x2474ef=_0x5ca092;return _0x32325a=String(_0x32325a),_0x32325a[_0x2474ef(0x345)](/#(.*)/i)?_0x2474ef(0x38f)[_0x2474ef(0x7c2)](String(RegExp['$1'])):this['textColor'](Number(_0x32325a));},ColorManager[_0x5ca092(0x5a6)]=function(){const _0x108b01=_0x5ca092;this[_0x108b01(0x604)]={};},ColorManager[_0x5ca092(0x48c)]=function(){const _0x2a0fa6=_0x5ca092,_0x2b0951=_0x2a0fa6(0x8b9);this[_0x2a0fa6(0x604)]=this[_0x2a0fa6(0x604)]||{};if(this['_colorCache'][_0x2b0951])return this[_0x2a0fa6(0x604)][_0x2b0951];const _0x419473=VisuMZ[_0x2a0fa6(0x865)][_0x2a0fa6(0x225)][_0x2a0fa6(0x3b3)][_0x2a0fa6(0x69f)];return this[_0x2a0fa6(0x828)](_0x2b0951,_0x419473);},ColorManager[_0x5ca092(0x58e)]=function(){const _0x56aa94=_0x5ca092,_0x2afd63=_0x56aa94(0x624);this[_0x56aa94(0x604)]=this['_colorCache']||{};if(this[_0x56aa94(0x604)][_0x2afd63])return this['_colorCache'][_0x2afd63];const _0x1d3a0c=VisuMZ[_0x56aa94(0x865)][_0x56aa94(0x225)][_0x56aa94(0x3b3)][_0x56aa94(0x3b0)];return this[_0x56aa94(0x828)](_0x2afd63,_0x1d3a0c);},ColorManager[_0x5ca092(0x87f)]=function(){const _0x219eaf=_0x5ca092,_0x2be0d7=_0x219eaf(0x1be);this['_colorCache']=this[_0x219eaf(0x604)]||{};if(this[_0x219eaf(0x604)][_0x2be0d7])return this['_colorCache'][_0x2be0d7];const _0x4009b7=VisuMZ[_0x219eaf(0x865)][_0x219eaf(0x225)][_0x219eaf(0x3b3)][_0x219eaf(0x468)];return this[_0x219eaf(0x828)](_0x2be0d7,_0x4009b7);},ColorManager[_0x5ca092(0x35e)]=function(){const _0x219d51=_0x5ca092,_0x6630c8=_0x219d51(0x51d);this[_0x219d51(0x604)]=this['_colorCache']||{};if(this['_colorCache'][_0x6630c8])return this[_0x219d51(0x604)][_0x6630c8];const _0x418942=VisuMZ['CoreEngine'][_0x219d51(0x225)][_0x219d51(0x3b3)][_0x219d51(0x42b)];return this['getColorDataFromPluginParameters'](_0x6630c8,_0x418942);},ColorManager[_0x5ca092(0x207)]=function(){const _0x1445b5=_0x5ca092,_0x2fe0bf=_0x1445b5(0x89d);this['_colorCache']=this[_0x1445b5(0x604)]||{};if(this['_colorCache'][_0x2fe0bf])return this[_0x1445b5(0x604)][_0x2fe0bf];const _0x8a64c7=VisuMZ[_0x1445b5(0x865)][_0x1445b5(0x225)][_0x1445b5(0x3b3)]['ColorGaugeBack'];return this[_0x1445b5(0x828)](_0x2fe0bf,_0x8a64c7);},ColorManager['hpGaugeColor1']=function(){const _0x57b9ee=_0x5ca092,_0x1fa330=_0x57b9ee(0x844);this[_0x57b9ee(0x604)]=this[_0x57b9ee(0x604)]||{};if(this[_0x57b9ee(0x604)][_0x1fa330])return this['_colorCache'][_0x1fa330];const _0x559f64=VisuMZ['CoreEngine']['Settings'][_0x57b9ee(0x3b3)]['ColorHPGauge1'];return this[_0x57b9ee(0x828)](_0x1fa330,_0x559f64);},ColorManager[_0x5ca092(0x34a)]=function(){const _0x34824f=_0x5ca092,_0x3f0aea=_0x34824f(0x882);this[_0x34824f(0x604)]=this[_0x34824f(0x604)]||{};if(this[_0x34824f(0x604)][_0x3f0aea])return this[_0x34824f(0x604)][_0x3f0aea];const _0x366662=VisuMZ[_0x34824f(0x865)][_0x34824f(0x225)][_0x34824f(0x3b3)][_0x34824f(0x3e8)];return this['getColorDataFromPluginParameters'](_0x3f0aea,_0x366662);},ColorManager[_0x5ca092(0x3c6)]=function(){const _0x400bdf=_0x5ca092,_0xb1eb1a='_stored_mpGaugeColor1';this[_0x400bdf(0x604)]=this[_0x400bdf(0x604)]||{};if(this[_0x400bdf(0x604)][_0xb1eb1a])return this[_0x400bdf(0x604)][_0xb1eb1a];const _0x1d7740=VisuMZ['CoreEngine'][_0x400bdf(0x225)][_0x400bdf(0x3b3)]['ColorMPGauge1'];return this[_0x400bdf(0x828)](_0xb1eb1a,_0x1d7740);},ColorManager[_0x5ca092(0x31f)]=function(){const _0x160716=_0x5ca092,_0x339c6b='_stored_mpGaugeColor2';this['_colorCache']=this['_colorCache']||{};if(this[_0x160716(0x604)][_0x339c6b])return this[_0x160716(0x604)][_0x339c6b];const _0xb22a8c=VisuMZ[_0x160716(0x865)][_0x160716(0x225)]['Color'][_0x160716(0x5d1)];return this[_0x160716(0x828)](_0x339c6b,_0xb22a8c);},ColorManager[_0x5ca092(0x730)]=function(){const _0x55319a=_0x5ca092,_0x3961e7=_0x55319a(0x8ea);this['_colorCache']=this['_colorCache']||{};if(this[_0x55319a(0x604)][_0x3961e7])return this[_0x55319a(0x604)][_0x3961e7];const _0x306341=VisuMZ[_0x55319a(0x865)][_0x55319a(0x225)][_0x55319a(0x3b3)][_0x55319a(0x4f0)];return this[_0x55319a(0x828)](_0x3961e7,_0x306341);},ColorManager['powerUpColor']=function(){const _0x36af10=_0x5ca092,_0x26782c=_0x36af10(0x2e6);this[_0x36af10(0x604)]=this[_0x36af10(0x604)]||{};if(this['_colorCache'][_0x26782c])return this[_0x36af10(0x604)][_0x26782c];const _0x388f7f=VisuMZ[_0x36af10(0x865)]['Settings'][_0x36af10(0x3b3)]['ColorPowerUp'];return this[_0x36af10(0x828)](_0x26782c,_0x388f7f);},ColorManager[_0x5ca092(0x57f)]=function(){const _0x424f7a=_0x5ca092,_0x50e11a=_0x424f7a(0x75c);this[_0x424f7a(0x604)]=this[_0x424f7a(0x604)]||{};if(this[_0x424f7a(0x604)][_0x50e11a])return this[_0x424f7a(0x604)][_0x50e11a];const _0x5a9bad=VisuMZ[_0x424f7a(0x865)][_0x424f7a(0x225)]['Color'][_0x424f7a(0x77e)];return this[_0x424f7a(0x828)](_0x50e11a,_0x5a9bad);},ColorManager[_0x5ca092(0x3df)]=function(){const _0x414286=_0x5ca092,_0x15e1c8=_0x414286(0x52c);this[_0x414286(0x604)]=this[_0x414286(0x604)]||{};if(this[_0x414286(0x604)][_0x15e1c8])return this[_0x414286(0x604)][_0x15e1c8];const _0xa1f684=VisuMZ[_0x414286(0x865)]['Settings']['Color']['ColorCTGauge1'];return this['getColorDataFromPluginParameters'](_0x15e1c8,_0xa1f684);},ColorManager['ctGaugeColor2']=function(){const _0x37fb7f=_0x5ca092,_0x3d87b9=_0x37fb7f(0x204);this['_colorCache']=this[_0x37fb7f(0x604)]||{};if(this[_0x37fb7f(0x604)][_0x3d87b9])return this[_0x37fb7f(0x604)][_0x3d87b9];const _0x2a8c03=VisuMZ[_0x37fb7f(0x865)][_0x37fb7f(0x225)][_0x37fb7f(0x3b3)][_0x37fb7f(0x1fc)];return this[_0x37fb7f(0x828)](_0x3d87b9,_0x2a8c03);},ColorManager[_0x5ca092(0x511)]=function(){const _0x4ee787=_0x5ca092,_0x171f05=_0x4ee787(0x48f);this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0x171f05])return this[_0x4ee787(0x604)][_0x171f05];const _0x4a9c99=VisuMZ[_0x4ee787(0x865)][_0x4ee787(0x225)]['Color'][_0x4ee787(0x82a)];return this[_0x4ee787(0x828)](_0x171f05,_0x4a9c99);},ColorManager[_0x5ca092(0x508)]=function(){const _0x122892=_0x5ca092,_0x406a86='_stored_tpGaugeColor2';this['_colorCache']=this['_colorCache']||{};if(this[_0x122892(0x604)][_0x406a86])return this['_colorCache'][_0x406a86];const _0x426743=VisuMZ[_0x122892(0x865)][_0x122892(0x225)][_0x122892(0x3b3)][_0x122892(0x64d)];return this[_0x122892(0x828)](_0x406a86,_0x426743);},ColorManager[_0x5ca092(0x43f)]=function(){const _0x5bf829=_0x5ca092,_0x58b622=_0x5bf829(0x766);this['_colorCache']=this[_0x5bf829(0x604)]||{};if(this['_colorCache'][_0x58b622])return this['_colorCache'][_0x58b622];const _0x2d34b7=VisuMZ[_0x5bf829(0x865)][_0x5bf829(0x225)][_0x5bf829(0x3b3)][_0x5bf829(0x8d1)];return this[_0x5bf829(0x828)](_0x58b622,_0x2d34b7);},ColorManager['pendingColor']=function(){const _0x3a5372=_0x5ca092,_0x35427a=_0x3a5372(0x93c);this[_0x3a5372(0x604)]=this[_0x3a5372(0x604)]||{};if(this[_0x3a5372(0x604)][_0x35427a])return this[_0x3a5372(0x604)][_0x35427a];const _0x4c20e9=VisuMZ[_0x3a5372(0x865)]['Settings'][_0x3a5372(0x3b3)]['ColorTPCost'];return this['getColorDataFromPluginParameters'](_0x35427a,_0x4c20e9);},ColorManager['expGaugeColor1']=function(){const _0x11e855=_0x5ca092,_0x4445ce='_stored_expGaugeColor1';this['_colorCache']=this[_0x11e855(0x604)]||{};if(this['_colorCache'][_0x4445ce])return this[_0x11e855(0x604)][_0x4445ce];const _0x47f643=VisuMZ[_0x11e855(0x865)][_0x11e855(0x225)][_0x11e855(0x3b3)][_0x11e855(0x885)];return this[_0x11e855(0x828)](_0x4445ce,_0x47f643);},ColorManager[_0x5ca092(0x3c5)]=function(){const _0x2fc244=_0x5ca092,_0x176474=_0x2fc244(0x657);this[_0x2fc244(0x604)]=this['_colorCache']||{};if(this['_colorCache'][_0x176474])return this[_0x2fc244(0x604)][_0x176474];const _0x4cf62e=VisuMZ[_0x2fc244(0x865)][_0x2fc244(0x225)][_0x2fc244(0x3b3)]['ColorExpGauge2'];return this[_0x2fc244(0x828)](_0x176474,_0x4cf62e);},ColorManager[_0x5ca092(0x8c0)]=function(){const _0x28b5c5=_0x5ca092,_0xbdf1e1='_stored_maxLvGaugeColor1';this[_0x28b5c5(0x604)]=this[_0x28b5c5(0x604)]||{};if(this[_0x28b5c5(0x604)][_0xbdf1e1])return this[_0x28b5c5(0x604)][_0xbdf1e1];const _0x3e1656=VisuMZ[_0x28b5c5(0x865)]['Settings'][_0x28b5c5(0x3b3)][_0x28b5c5(0x255)];return this['getColorDataFromPluginParameters'](_0xbdf1e1,_0x3e1656);},ColorManager[_0x5ca092(0x8f5)]=function(){const _0x3d722d=_0x5ca092,_0x34a470=_0x3d722d(0x817);this['_colorCache']=this[_0x3d722d(0x604)]||{};if(this[_0x3d722d(0x604)][_0x34a470])return this[_0x3d722d(0x604)][_0x34a470];const _0x578917=VisuMZ[_0x3d722d(0x865)][_0x3d722d(0x225)]['Color']['ColorMaxLvGauge2'];return this['getColorDataFromPluginParameters'](_0x34a470,_0x578917);},ColorManager[_0x5ca092(0x5c1)]=function(_0x5b15cb){const _0x49312a=_0x5ca092;return VisuMZ['CoreEngine']['Settings'][_0x49312a(0x3b3)]['ActorHPColor'][_0x49312a(0x481)](this,_0x5b15cb);},ColorManager[_0x5ca092(0x272)]=function(_0x3003bf){const _0x4f242c=_0x5ca092;return VisuMZ[_0x4f242c(0x865)][_0x4f242c(0x225)][_0x4f242c(0x3b3)][_0x4f242c(0x253)][_0x4f242c(0x481)](this,_0x3003bf);},ColorManager[_0x5ca092(0x7fa)]=function(_0x1cde64){const _0x3e0f26=_0x5ca092;return VisuMZ[_0x3e0f26(0x865)][_0x3e0f26(0x225)]['Color'][_0x3e0f26(0x6c5)][_0x3e0f26(0x481)](this,_0x1cde64);},ColorManager[_0x5ca092(0x4a9)]=function(_0x30f4f9){const _0x3b64ee=_0x5ca092;return VisuMZ[_0x3b64ee(0x865)][_0x3b64ee(0x225)][_0x3b64ee(0x3b3)][_0x3b64ee(0x614)][_0x3b64ee(0x481)](this,_0x30f4f9);},ColorManager[_0x5ca092(0x6cb)]=function(_0x4bfff8){const _0x1b92e0=_0x5ca092;return VisuMZ[_0x1b92e0(0x865)]['Settings'][_0x1b92e0(0x3b3)][_0x1b92e0(0x464)][_0x1b92e0(0x481)](this,_0x4bfff8);},ColorManager[_0x5ca092(0x46b)]=function(){const _0x4f87db=_0x5ca092;return VisuMZ[_0x4f87db(0x865)][_0x4f87db(0x225)]['Color'][_0x4f87db(0x888)];},ColorManager[_0x5ca092(0x920)]=function(){const _0x280653=_0x5ca092;return VisuMZ[_0x280653(0x865)][_0x280653(0x225)][_0x280653(0x3b3)][_0x280653(0x5b4)]||_0x280653(0x6b8);},ColorManager[_0x5ca092(0x5d6)]=function(){const _0xd9af81=_0x5ca092;return VisuMZ[_0xd9af81(0x865)][_0xd9af81(0x225)][_0xd9af81(0x3b3)][_0xd9af81(0x50c)]||'rgba(0,\x200,\x200,\x201.0)';},ColorManager[_0x5ca092(0x852)]=function(){const _0x35e82f=_0x5ca092;return VisuMZ[_0x35e82f(0x865)]['Settings']['Color'][_0x35e82f(0x673)];},ColorManager[_0x5ca092(0x416)]=function(){const _0x147d60=_0x5ca092;return VisuMZ[_0x147d60(0x865)][_0x147d60(0x225)]['Color']['DimColor2'];},ColorManager['itemBackColor1']=function(){const _0x308ee0=_0x5ca092;return VisuMZ[_0x308ee0(0x865)][_0x308ee0(0x225)][_0x308ee0(0x3b3)][_0x308ee0(0x1c1)];},ColorManager[_0x5ca092(0x40c)]=function(){const _0x2c1ad3=_0x5ca092;return VisuMZ[_0x2c1ad3(0x865)][_0x2c1ad3(0x225)][_0x2c1ad3(0x3b3)][_0x2c1ad3(0x4c5)];},SceneManager['_storedStack']=[],SceneManager[_0x5ca092(0x40a)]=function(){const _0x1a0d33=_0x5ca092;return this[_0x1a0d33(0x5b6)]&&this['_scene'][_0x1a0d33(0x2bb)]===Scene_Battle;},SceneManager[_0x5ca092(0x440)]=function(){const _0x2aa23b=_0x5ca092;return this[_0x2aa23b(0x5b6)]&&this[_0x2aa23b(0x5b6)][_0x2aa23b(0x2bb)]===Scene_Map;},SceneManager[_0x5ca092(0x2ca)]=function(){const _0x4c79c6=_0x5ca092;return this[_0x4c79c6(0x5b6)]&&this[_0x4c79c6(0x5b6)]instanceof Scene_Map;},VisuMZ['CoreEngine'][_0x5ca092(0x1c4)]=SceneManager[_0x5ca092(0x44e)],SceneManager[_0x5ca092(0x44e)]=function(){const _0x562f1=_0x5ca092;VisuMZ['CoreEngine'][_0x562f1(0x1c4)][_0x562f1(0x481)](this),this[_0x562f1(0x4f1)]();},VisuMZ['CoreEngine'][_0x5ca092(0x669)]=SceneManager[_0x5ca092(0x7b4)],SceneManager[_0x5ca092(0x7b4)]=function(_0x5989b6){const _0x1305b4=_0x5ca092;if($gameTemp)this[_0x1305b4(0x26b)](_0x5989b6);VisuMZ[_0x1305b4(0x865)]['SceneManager_onKeyDown'][_0x1305b4(0x481)](this,_0x5989b6);},SceneManager[_0x5ca092(0x26b)]=function(_0x1238ef){const _0x1be5f0=_0x5ca092;if(!_0x1238ef[_0x1be5f0(0x53a)]&&!_0x1238ef[_0x1be5f0(0x233)])switch(_0x1238ef[_0x1be5f0(0x3b2)]){case 0x52:this['playTestShiftR']();break;case 0x54:this[_0x1be5f0(0x5bb)]();break;case 0x75:this[_0x1be5f0(0x355)]();break;case 0x76:if(Input['isPressed'](_0x1be5f0(0x906))||Input[_0x1be5f0(0x522)](_0x1be5f0(0x49d)))return;this[_0x1be5f0(0x2a1)]();break;}else{if(_0x1238ef[_0x1be5f0(0x53a)]){let _0x51e024=_0x1238ef['keyCode'];if(_0x51e024>=0x31&&_0x51e024<=0x39){const _0xf77d24=_0x51e024-0x30;return SceneManager[_0x1be5f0(0x6d8)](_0xf77d24);}else{if(_0x51e024>=0x61&&_0x51e024<=0x69){const _0x194c69=_0x51e024-0x60;return SceneManager[_0x1be5f0(0x6d8)](_0x194c69);}}}}},SceneManager[_0x5ca092(0x355)]=function(){const _0x248bca=_0x5ca092;if($gameTemp[_0x248bca(0x4be)]()&&VisuMZ[_0x248bca(0x865)][_0x248bca(0x225)][_0x248bca(0x656)]['F6key']){ConfigManager['seVolume']!==0x0?(ConfigManager[_0x248bca(0x74a)]=0x0,ConfigManager[_0x248bca(0x307)]=0x0,ConfigManager[_0x248bca(0x750)]=0x0,ConfigManager[_0x248bca(0x1d1)]=0x0):(ConfigManager[_0x248bca(0x74a)]=0x64,ConfigManager[_0x248bca(0x307)]=0x64,ConfigManager[_0x248bca(0x750)]=0x64,ConfigManager[_0x248bca(0x1d1)]=0x64);ConfigManager[_0x248bca(0x5d0)]();if(this[_0x248bca(0x5b6)][_0x248bca(0x2bb)]===Scene_Options){if(this[_0x248bca(0x5b6)][_0x248bca(0x6a0)])this[_0x248bca(0x5b6)][_0x248bca(0x6a0)][_0x248bca(0x7f7)]();if(this[_0x248bca(0x5b6)][_0x248bca(0x3d8)])this[_0x248bca(0x5b6)]['_listWindow'][_0x248bca(0x7f7)]();}}},SceneManager[_0x5ca092(0x2a1)]=function(){const _0x4e3222=_0x5ca092;$gameTemp[_0x4e3222(0x4be)]()&&VisuMZ[_0x4e3222(0x865)][_0x4e3222(0x225)][_0x4e3222(0x656)][_0x4e3222(0x2fa)]&&($gameTemp['_playTestFastMode']=!$gameTemp[_0x4e3222(0x349)]);},SceneManager[_0x5ca092(0x7c9)]=function(){const _0x4b3129=_0x5ca092;if(!VisuMZ[_0x4b3129(0x865)][_0x4b3129(0x225)]['QoL']['ShiftR_Toggle'])return;if(!$gameTemp[_0x4b3129(0x4be)]())return;if(!SceneManager[_0x4b3129(0x40a)]())return;if(!Input[_0x4b3129(0x522)](_0x4b3129(0x906)))return;for(const _0x594b57 of $gameParty[_0x4b3129(0x5e5)]()){if(!_0x594b57)continue;_0x594b57[_0x4b3129(0x78a)]();}},SceneManager[_0x5ca092(0x5bb)]=function(){const _0x457831=_0x5ca092;if(!VisuMZ[_0x457831(0x865)][_0x457831(0x225)][_0x457831(0x656)]['ShiftT_Toggle'])return;if(!$gameTemp[_0x457831(0x4be)]())return;if(!SceneManager[_0x457831(0x40a)]())return;if(!Input[_0x457831(0x522)](_0x457831(0x906)))return;for(const _0xca5fdc of $gameParty[_0x457831(0x5e5)]()){if(!_0xca5fdc)continue;_0xca5fdc[_0x457831(0x812)](_0xca5fdc[_0x457831(0x4ee)]());}},SceneManager[_0x5ca092(0x6d8)]=function(_0x4c8fa1){const _0x5ca80d=_0x5ca092;if(!$gameTemp[_0x5ca80d(0x4be)]())return;if(!DataManager['savefileInfo'](_0x4c8fa1))return;if(!(VisuMZ[_0x5ca80d(0x865)][_0x5ca80d(0x225)][_0x5ca80d(0x656)][_0x5ca80d(0x73a)]??!![]))return;this[_0x5ca80d(0x4a2)](Scene_QuickLoad),this[_0x5ca80d(0x5bf)](_0x4c8fa1);},SceneManager[_0x5ca092(0x4f1)]=function(){const _0x38df9a=_0x5ca092;this[_0x38df9a(0x79c)]=![],this[_0x38df9a(0x88c)]=!VisuMZ[_0x38df9a(0x865)][_0x38df9a(0x225)]['UI'][_0x38df9a(0x5c8)];},SceneManager['setSideButtonLayout']=function(_0x13d592){const _0xd6ec77=_0x5ca092;VisuMZ[_0xd6ec77(0x865)][_0xd6ec77(0x225)]['UI'][_0xd6ec77(0x37e)]&&(this['_sideButtonLayout']=_0x13d592);},SceneManager['isSideButtonLayout']=function(){const _0xf86d3d=_0x5ca092;return this[_0xf86d3d(0x79c)];},SceneManager[_0x5ca092(0x3e3)]=function(){const _0x56c9ec=_0x5ca092;return this[_0x56c9ec(0x88c)];},SceneManager['areButtonsOutsideMainUI']=function(){const _0x5319b3=_0x5ca092;return this[_0x5319b3(0x93a)]();},VisuMZ['CoreEngine']['SceneManager_isGameActive']=SceneManager[_0x5ca092(0x3cf)],SceneManager[_0x5ca092(0x3cf)]=function(){const _0x5b9cf1=_0x5ca092;return VisuMZ[_0x5b9cf1(0x865)][_0x5b9cf1(0x225)][_0x5b9cf1(0x656)]['RequireFocus']?VisuMZ['CoreEngine'][_0x5b9cf1(0x498)]['call'](this):!![];},SceneManager[_0x5ca092(0x8c5)]=function(_0x3bc155){const _0xd7e743=_0x5ca092;if(_0x3bc155 instanceof Error)this['catchNormalError'](_0x3bc155);else _0x3bc155 instanceof Array&&_0x3bc155[0x0]===_0xd7e743(0x880)?this[_0xd7e743(0x89b)](_0x3bc155):this[_0xd7e743(0x3bb)](_0x3bc155);this[_0xd7e743(0x7be)]();},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x8e9)]=BattleManager[_0x5ca092(0x972)],BattleManager[_0x5ca092(0x972)]=function(){const _0x508c48=_0x5ca092;return VisuMZ[_0x508c48(0x865)][_0x508c48(0x225)][_0x508c48(0x656)]['EscapeAlways']?this['processAlwaysEscape']():VisuMZ[_0x508c48(0x865)][_0x508c48(0x8e9)]['call'](this);},BattleManager['processAlwaysEscape']=function(){const _0x4bd4b5=_0x5ca092;return $gameParty[_0x4bd4b5(0x455)](),SoundManager['playEscape'](),this[_0x4bd4b5(0x569)](),!![];},BattleManager[_0x5ca092(0x3ea)]=function(){const _0x1106a2=_0x5ca092;return $gameSystem[_0x1106a2(0x2b5)]()>=0x1;},BattleManager[_0x5ca092(0x6e9)]=function(){const _0x11045a=_0x5ca092;return $gameSystem[_0x11045a(0x2b5)]()===0x1;},VisuMZ['CoreEngine']['Game_Temp_initialize']=Game_Temp['prototype'][_0x5ca092(0x44e)],Game_Temp['prototype']['initialize']=function(){const _0x595aec=_0x5ca092;VisuMZ['CoreEngine'][_0x595aec(0x2b8)][_0x595aec(0x481)](this),this['forceOutOfPlaytest'](),this[_0x595aec(0x52d)](),this['createPointAnimationQueue']();},Game_Temp[_0x5ca092(0x923)][_0x5ca092(0x945)]=function(){const _0x354c1d=_0x5ca092;VisuMZ[_0x354c1d(0x865)]['Settings'][_0x354c1d(0x656)][_0x354c1d(0x81d)]&&(this[_0x354c1d(0x490)]=![]);},Game_Temp['prototype'][_0x5ca092(0x489)]=function(_0x314096){const _0x19d241=_0x5ca092;this[_0x19d241(0x3bd)]=_0x314096;},Game_Temp[_0x5ca092(0x923)][_0x5ca092(0x66b)]=function(){const _0x3d0478=_0x5ca092;return this[_0x3d0478(0x3bd)];},Game_Temp['prototype'][_0x5ca092(0x312)]=function(){const _0x3e6e1b=_0x5ca092;this[_0x3e6e1b(0x2ef)]=undefined,this['_forcedBattleSys']=undefined,this[_0x3e6e1b(0x20d)]=undefined;},Game_Temp[_0x5ca092(0x923)][_0x5ca092(0x417)]=function(_0x398e2b){const _0x379827=_0x5ca092;$gameMap&&$dataMap&&$dataMap[_0x379827(0x91e)]&&this['parseForcedGameTroopSettingsCoreEngine']($dataMap[_0x379827(0x91e)]);const _0x150397=$dataTroops[_0x398e2b];if(_0x150397){let _0x432a28=DataManager[_0x379827(0x51a)](_0x150397['id']);this['parseForcedGameTroopSettingsCoreEngine'](_0x432a28);}},Game_Temp[_0x5ca092(0x923)][_0x5ca092(0x3a1)]=function(_0x2faa0e){const _0x638cbf=_0x5ca092;if(!_0x2faa0e)return;if(_0x2faa0e[_0x638cbf(0x345)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0x638cbf(0x2ef)]='FV';else{if(_0x2faa0e['match'](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this['_forcedTroopView']='SV';else{if(_0x2faa0e[_0x638cbf(0x345)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x574e21=String(RegExp['$1']);if(_0x574e21[_0x638cbf(0x345)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0x638cbf(0x2ef)]='FV';else _0x574e21[_0x638cbf(0x345)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this['_forcedTroopView']='SV');}}}if(_0x2faa0e[_0x638cbf(0x345)](/<(?:DTB)>/i))this[_0x638cbf(0x608)]=0x0;else{if(_0x2faa0e[_0x638cbf(0x345)](/<(?:TPB|ATB)[ ]ACTIVE>/i))this[_0x638cbf(0x608)]=0x1;else{if(_0x2faa0e[_0x638cbf(0x345)](/<(?:TPB|ATB)[ ]WAIT>/i))this[_0x638cbf(0x608)]=0x2;else{if(_0x2faa0e['match'](/<(?:TPB|ATB)>/i))this['_forcedBattleSys']=0x2;else{if(_0x2faa0e[_0x638cbf(0x345)](/<(?:CTB)>/i))Imported[_0x638cbf(0x398)]&&(this['_forcedBattleSys']=_0x638cbf(0x2fd));else{if(_0x2faa0e[_0x638cbf(0x345)](/<(?:STB)>/i))Imported[_0x638cbf(0x4c1)]&&(this[_0x638cbf(0x608)]='STB');else{if(_0x2faa0e[_0x638cbf(0x345)](/<(?:BTB)>/i))Imported[_0x638cbf(0x76e)]&&(this[_0x638cbf(0x608)]=_0x638cbf(0x720));else{if(_0x2faa0e[_0x638cbf(0x345)](/<(?:FTB)>/i))Imported['VisuMZ_2_BattleSystemFTB']&&(this[_0x638cbf(0x608)]=_0x638cbf(0x485));else{if(_0x2faa0e[_0x638cbf(0x345)](/<(?:OTB)>/i))Imported[_0x638cbf(0x47f)]&&(this['_forcedBattleSys']=_0x638cbf(0x5bc));else{if(_0x2faa0e['match'](/<(?:ETB)>/i))Imported[_0x638cbf(0x6a6)]&&(this[_0x638cbf(0x608)]='ETB');else{if(_0x2faa0e['match'](/<(?:PTB)>/i))Imported['VisuMZ_2_BattleSystemPTB']&&(this[_0x638cbf(0x608)]=_0x638cbf(0x4c4));else{if(_0x2faa0e[_0x638cbf(0x345)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x88cafa=String(RegExp['$1']);if(_0x88cafa['match'](/DTB/i))this[_0x638cbf(0x608)]=0x0;else{if(_0x88cafa[_0x638cbf(0x345)](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x638cbf(0x608)]=0x1;else{if(_0x88cafa[_0x638cbf(0x345)](/(?:TPB|ATB)[ ]WAIT/i))this[_0x638cbf(0x608)]=0x2;else{if(_0x88cafa['match'](/CTB/i))Imported[_0x638cbf(0x398)]&&(this[_0x638cbf(0x608)]=_0x638cbf(0x2fd));else{if(_0x88cafa['match'](/STB/i))Imported[_0x638cbf(0x4c1)]&&(this[_0x638cbf(0x608)]='STB');else{if(_0x88cafa['match'](/BTB/i))Imported['VisuMZ_2_BattleSystemBTB']&&(this['_forcedBattleSys']=_0x638cbf(0x720));else{if(_0x88cafa[_0x638cbf(0x345)](/FTB/i))Imported[_0x638cbf(0x7db)]&&(this[_0x638cbf(0x608)]=_0x638cbf(0x485));else{if(_0x88cafa[_0x638cbf(0x345)](/OTB/i))Imported[_0x638cbf(0x47f)]&&(this[_0x638cbf(0x608)]=_0x638cbf(0x5bc));else{if(_0x88cafa['match'](/ETB/i))Imported['VisuMZ_2_BattleSystemETB']&&(this['_forcedBattleSys']=_0x638cbf(0x27a));else _0x88cafa[_0x638cbf(0x345)](/PTB/i)&&(Imported[_0x638cbf(0x902)]&&(this[_0x638cbf(0x608)]=_0x638cbf(0x4c4)));}}}}}}}}}}}}}}}}}}}}if(_0x2faa0e[_0x638cbf(0x345)](/<(?:|BATTLE )GRID>/i))this[_0x638cbf(0x20d)]=!![];else _0x2faa0e[_0x638cbf(0x345)](/<NO (?:|BATTLE )GRID>/i)&&(this[_0x638cbf(0x20d)]=![]);},Game_Temp[_0x5ca092(0x923)][_0x5ca092(0x52d)]=function(){const _0x5a166d=_0x5ca092;this[_0x5a166d(0x2a3)]=[];},Game_Temp[_0x5ca092(0x923)]['requestFauxAnimation']=function(_0x49646a,_0x3ed253,_0x253dc0,_0x59d7ad){const _0x4f561d=_0x5ca092;if(!this[_0x4f561d(0x686)]())return;_0x253dc0=_0x253dc0||![],_0x59d7ad=_0x59d7ad||![];if($dataAnimations[_0x3ed253]){const _0x37f8cf={'targets':_0x49646a,'animationId':_0x3ed253,'mirror':_0x253dc0,'mute':_0x59d7ad};this[_0x4f561d(0x2a3)]['push'](_0x37f8cf);for(const _0x19fea4 of _0x49646a){_0x19fea4['startAnimation']&&_0x19fea4[_0x4f561d(0x401)]();}}},Game_Temp[_0x5ca092(0x923)][_0x5ca092(0x686)]=function(){return!![];},Game_Temp['prototype'][_0x5ca092(0x911)]=function(){const _0x4e98f5=_0x5ca092;return this[_0x4e98f5(0x2a3)][_0x4e98f5(0x906)]();},Game_Temp[_0x5ca092(0x923)]['createPointAnimationQueue']=function(){this['_pointAnimationQueue']=[];},Game_Temp['prototype'][_0x5ca092(0x67a)]=function(_0x528043,_0x19312b,_0x460a61,_0x17b5ad,_0x315552){const _0x50bd97=_0x5ca092;if(!this[_0x50bd97(0x8fe)]())return;_0x17b5ad=_0x17b5ad||![],_0x315552=_0x315552||![];if($dataAnimations[_0x460a61]){const _0x20b25d={'x':_0x528043,'y':_0x19312b,'animationId':_0x460a61,'mirror':_0x17b5ad,'mute':_0x315552};this[_0x50bd97(0x728)][_0x50bd97(0x4a2)](_0x20b25d);}},Game_Temp[_0x5ca092(0x923)][_0x5ca092(0x8fe)]=function(){return!![];},Game_Temp['prototype']['retrievePointAnimation']=function(){const _0x22bd54=_0x5ca092;return this['_pointAnimationQueue'][_0x22bd54(0x906)]();},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x950)]=Game_System[_0x5ca092(0x923)][_0x5ca092(0x44e)],Game_System[_0x5ca092(0x923)][_0x5ca092(0x44e)]=function(){const _0x1b5481=_0x5ca092;VisuMZ['CoreEngine'][_0x1b5481(0x950)][_0x1b5481(0x481)](this),this['initCoreEngine']();},Game_System[_0x5ca092(0x923)][_0x5ca092(0x570)]=function(){const _0x457454=_0x5ca092;this[_0x457454(0x52f)]={'SideView':$dataSystem[_0x457454(0x4a8)],'BattleSystem':this['initialBattleSystem'](),'FontSize':$dataSystem['advanced']['fontSize'],'Padding':0xc};},Game_System['prototype'][_0x5ca092(0x74e)]=function(){const _0x4c2efe=_0x5ca092;if($gameTemp['_forcedTroopView']==='SV')return!![];else{if($gameTemp[_0x4c2efe(0x2ef)]==='FV')return![];}if(this[_0x4c2efe(0x52f)]===undefined)this[_0x4c2efe(0x570)]();if(this['_CoreEngineSettings']['SideView']===undefined)this[_0x4c2efe(0x570)]();return this[_0x4c2efe(0x52f)]['SideView'];},Game_System['prototype'][_0x5ca092(0x8b2)]=function(_0x5f5941){const _0x5b5161=_0x5ca092;if(this[_0x5b5161(0x52f)]===undefined)this[_0x5b5161(0x570)]();if(this[_0x5b5161(0x52f)][_0x5b5161(0x33d)]===undefined)this[_0x5b5161(0x570)]();this[_0x5b5161(0x52f)][_0x5b5161(0x33d)]=_0x5f5941;},Game_System[_0x5ca092(0x923)][_0x5ca092(0x469)]=function(){const _0xc9add7=_0x5ca092;if(this['_CoreEngineSettings']===undefined)this[_0xc9add7(0x570)]();this[_0xc9add7(0x52f)][_0xc9add7(0x650)]=this['initialBattleSystem']();},Game_System[_0x5ca092(0x923)][_0x5ca092(0x7a7)]=function(){const _0x51ae11=_0x5ca092,_0x45a540=(VisuMZ[_0x51ae11(0x865)][_0x51ae11(0x225)][_0x51ae11(0x650)]||_0x51ae11(0x3a7))['toUpperCase']()[_0x51ae11(0x6d7)]();return VisuMZ['CoreEngine'][_0x51ae11(0x8bc)](_0x45a540);},Game_System[_0x5ca092(0x923)]['getBattleSystem']=function(){const _0x54017d=_0x5ca092;if($gameTemp[_0x54017d(0x608)]!==undefined)return $gameTemp[_0x54017d(0x608)];if(this[_0x54017d(0x52f)]===undefined)this[_0x54017d(0x570)]();if(this['_CoreEngineSettings'][_0x54017d(0x650)]===undefined)this['resetBattleSystem']();return this[_0x54017d(0x52f)][_0x54017d(0x650)];},Game_System[_0x5ca092(0x923)]['setBattleSystem']=function(_0x45ce69){const _0x26343f=_0x5ca092;if(this['_CoreEngineSettings']===undefined)this[_0x26343f(0x570)]();if(this[_0x26343f(0x52f)][_0x26343f(0x650)]===undefined)this['resetBattleSystem']();this[_0x26343f(0x52f)]['BattleSystem']=_0x45ce69;},Game_System[_0x5ca092(0x923)][_0x5ca092(0x628)]=function(){const _0x402c5c=_0x5ca092;if(this[_0x402c5c(0x52f)]===undefined)this[_0x402c5c(0x570)]();if(this[_0x402c5c(0x52f)]['FontSize']===undefined)this[_0x402c5c(0x570)]();return this[_0x402c5c(0x52f)][_0x402c5c(0x2e2)];},Game_System[_0x5ca092(0x923)][_0x5ca092(0x558)]=function(_0x2ecf02){const _0x5ae713=_0x5ca092;if(this[_0x5ae713(0x52f)]===undefined)this[_0x5ae713(0x570)]();if(this[_0x5ae713(0x52f)][_0x5ae713(0x430)]===undefined)this[_0x5ae713(0x570)]();this[_0x5ae713(0x52f)]['FontSize']=_0x2ecf02;},Game_System[_0x5ca092(0x923)][_0x5ca092(0x52e)]=function(){const _0x2829ce=_0x5ca092;if(this[_0x2829ce(0x52f)]===undefined)this[_0x2829ce(0x570)]();if(this[_0x2829ce(0x52f)][_0x2829ce(0x234)]===undefined)this[_0x2829ce(0x570)]();return this[_0x2829ce(0x52f)]['Padding'];},Game_System[_0x5ca092(0x923)]['setWindowPadding']=function(_0x379294){const _0x5e5b5d=_0x5ca092;if(this['_CoreEngineSettings']===undefined)this[_0x5e5b5d(0x570)]();if(this['_CoreEngineSettings'][_0x5e5b5d(0x430)]===undefined)this[_0x5e5b5d(0x570)]();this[_0x5e5b5d(0x52f)][_0x5e5b5d(0x234)]=_0x379294;},VisuMZ[_0x5ca092(0x865)]['Game_Screen_initialize']=Game_Screen['prototype']['initialize'],Game_Screen['prototype'][_0x5ca092(0x44e)]=function(){const _0x5babb5=_0x5ca092;VisuMZ[_0x5babb5(0x865)][_0x5babb5(0x837)][_0x5babb5(0x481)](this),this[_0x5babb5(0x315)]();},Game_Screen[_0x5ca092(0x923)][_0x5ca092(0x315)]=function(){const _0x56ecd9=_0x5ca092,_0x57322d=VisuMZ[_0x56ecd9(0x865)]['Settings'][_0x56ecd9(0x8d8)];this[_0x56ecd9(0x506)]=_0x57322d?.[_0x56ecd9(0x477)]||_0x56ecd9(0x64e);},Game_Screen[_0x5ca092(0x923)][_0x5ca092(0x4b1)]=function(){const _0x3c2aa2=_0x5ca092;if(this[_0x3c2aa2(0x506)]===undefined)this[_0x3c2aa2(0x315)]();return this[_0x3c2aa2(0x506)];},Game_Screen['prototype'][_0x5ca092(0x3ac)]=function(_0x7d5af9){const _0x2855dc=_0x5ca092;if(this[_0x2855dc(0x506)]===undefined)this[_0x2855dc(0x315)]();this[_0x2855dc(0x506)]=_0x7d5af9[_0x2855dc(0x86b)]()[_0x2855dc(0x6d7)]();},Game_Picture['prototype'][_0x5ca092(0x78b)]=function(){const _0x5aa410=_0x5ca092;if($gameParty['inBattle']())return![];return this['onlyfilename']()&&this[_0x5aa410(0x738)]()['charAt'](0x0)==='!';},Game_Picture[_0x5ca092(0x923)][_0x5ca092(0x738)]=function(){const _0x1ac31b=_0x5ca092;return this[_0x1ac31b(0x842)][_0x1ac31b(0x79e)]('/')[_0x1ac31b(0x80b)]();},VisuMZ['CoreEngine'][_0x5ca092(0x5a8)]=Game_Picture[_0x5ca092(0x923)]['x'],Game_Picture[_0x5ca092(0x923)]['x']=function(){const _0x552095=_0x5ca092;return this[_0x552095(0x78b)]()?this[_0x552095(0x8a8)]():VisuMZ[_0x552095(0x865)][_0x552095(0x5a8)][_0x552095(0x481)](this);},Game_Picture['prototype']['xScrollLinkedOffset']=function(){const _0x3c54f6=_0x5ca092,_0x3748fb=$gameMap[_0x3c54f6(0x6fa)]()*$gameMap[_0x3c54f6(0x2a8)]();return(this['_x']-_0x3748fb)*$gameScreen[_0x3c54f6(0x1e6)]();},VisuMZ[_0x5ca092(0x865)]['Game_Picture_y']=Game_Picture[_0x5ca092(0x923)]['y'],Game_Picture[_0x5ca092(0x923)]['y']=function(){const _0x1e5785=_0x5ca092;return this[_0x1e5785(0x78b)]()?this[_0x1e5785(0x861)]():VisuMZ[_0x1e5785(0x865)][_0x1e5785(0x472)][_0x1e5785(0x481)](this);},Game_Picture['prototype'][_0x5ca092(0x861)]=function(){const _0x3d678d=_0x5ca092,_0x2664c5=$gameMap[_0x3d678d(0x892)]()*$gameMap['tileHeight']();return(this['_y']-_0x2664c5)*$gameScreen[_0x3d678d(0x1e6)]();},VisuMZ['CoreEngine'][_0x5ca092(0x87a)]=Game_Picture[_0x5ca092(0x923)]['scaleX'],Game_Picture[_0x5ca092(0x923)][_0x5ca092(0x8a4)]=function(){const _0x2f0cc8=_0x5ca092;let _0xd6f94e=VisuMZ[_0x2f0cc8(0x865)]['Game_Picture_scaleX'][_0x2f0cc8(0x481)](this);return this[_0x2f0cc8(0x78b)]()&&(_0xd6f94e*=$gameScreen[_0x2f0cc8(0x1e6)]()),_0xd6f94e;},VisuMZ['CoreEngine']['Game_Picture_scaleY']=Game_Picture['prototype'][_0x5ca092(0x387)],Game_Picture['prototype']['scaleY']=function(){const _0x345ed1=_0x5ca092;let _0x450f56=VisuMZ[_0x345ed1(0x865)][_0x345ed1(0x646)][_0x345ed1(0x481)](this);return this['isMapScrollLinked']()&&(_0x450f56*=$gameScreen[_0x345ed1(0x1e6)]()),_0x450f56;},Game_Picture[_0x5ca092(0x923)]['setEasingType']=function(_0x18b029){const _0x21411a=_0x5ca092;this[_0x21411a(0x29b)]=_0x18b029;},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x400)]=Game_Picture['prototype'][_0x5ca092(0x4cd)],Game_Picture[_0x5ca092(0x923)][_0x5ca092(0x4cd)]=function(_0x119420){const _0x41d447=_0x5ca092;return this['_coreEasingType']=this[_0x41d447(0x29b)]||0x0,[0x0,0x1,0x2,0x3][_0x41d447(0x3f8)](this[_0x41d447(0x29b)])?VisuMZ['CoreEngine'][_0x41d447(0x400)]['call'](this,_0x119420):VisuMZ[_0x41d447(0x8e2)](_0x119420,this[_0x41d447(0x29b)]);},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x4a6)]=Game_Picture[_0x5ca092(0x923)]['initRotation'],Game_Picture[_0x5ca092(0x923)]['initRotation']=function(){const _0x567fad=_0x5ca092;VisuMZ[_0x567fad(0x865)][_0x567fad(0x4a6)][_0x567fad(0x481)](this),this[_0x567fad(0x258)]();},Game_Picture[_0x5ca092(0x923)][_0x5ca092(0x258)]=function(){const _0x31f6bf=_0x5ca092;this['_anglePlus']={'current':0x0,'target':0x0,'duration':0x0,'wholeDuration':0x0,'easingType':_0x31f6bf(0x33f)};},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x480)]=Game_Picture[_0x5ca092(0x923)][_0x5ca092(0x2b6)],Game_Picture['prototype'][_0x5ca092(0x2b6)]=function(){const _0x332505=_0x5ca092;let _0x29caea=VisuMZ[_0x332505(0x865)][_0x332505(0x480)][_0x332505(0x481)](this);return _0x29caea+=this[_0x332505(0x3b5)](),_0x29caea;},Game_Picture[_0x5ca092(0x923)][_0x5ca092(0x3b5)]=function(){const _0x15ac90=_0x5ca092;if(this[_0x15ac90(0x33b)]===undefined)this[_0x15ac90(0x258)]();return this[_0x15ac90(0x33b)][_0x15ac90(0x620)]||0x0;},Game_Picture[_0x5ca092(0x923)][_0x5ca092(0x662)]=function(_0x3e8d8a,_0x1b6ae2,_0x2cf076){const _0x1771a3=_0x5ca092;if(this['_anglePlus']===undefined)this[_0x1771a3(0x258)]();this['_anglePlus'][_0x1771a3(0x40e)]=_0x3e8d8a||0x0,this['_anglePlus'][_0x1771a3(0x97b)]=_0x1b6ae2||0x0,this[_0x1771a3(0x33b)][_0x1771a3(0x4c0)]=_0x1b6ae2||0x0,this[_0x1771a3(0x33b)][_0x1771a3(0x6be)]=_0x2cf076||_0x1771a3(0x33f),_0x1b6ae2<=0x0&&(this[_0x1771a3(0x33b)]['current']=this[_0x1771a3(0x33b)][_0x1771a3(0x40e)]);},Game_Picture[_0x5ca092(0x923)][_0x5ca092(0x7c6)]=function(_0x537f7e,_0x4f833c,_0x2194a1){const _0xea6e1d=_0x5ca092;if(this[_0xea6e1d(0x33b)]===undefined)this['initRotationCoreEngine']();this[_0xea6e1d(0x33b)][_0xea6e1d(0x40e)]+=_0x537f7e||0x0,this[_0xea6e1d(0x33b)]['duration']=_0x4f833c||0x0,this['_anglePlus'][_0xea6e1d(0x4c0)]=_0x4f833c||0x0,this[_0xea6e1d(0x33b)][_0xea6e1d(0x6be)]=_0x2194a1||_0xea6e1d(0x33f),_0x4f833c<=0x0&&(this[_0xea6e1d(0x33b)][_0xea6e1d(0x620)]=this[_0xea6e1d(0x33b)][_0xea6e1d(0x40e)]);},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x45b)]=Game_Picture[_0x5ca092(0x923)][_0x5ca092(0x951)],Game_Picture[_0x5ca092(0x923)][_0x5ca092(0x951)]=function(){const _0x5e97cf=_0x5ca092;VisuMZ[_0x5e97cf(0x865)][_0x5e97cf(0x45b)][_0x5e97cf(0x481)](this),this[_0x5e97cf(0x1fe)]();},Game_Picture[_0x5ca092(0x923)][_0x5ca092(0x1fe)]=function(){const _0x49af39=_0x5ca092;if(this[_0x49af39(0x33b)]===undefined)this[_0x49af39(0x258)]();const _0x2ce3ce=this[_0x49af39(0x33b)];if(_0x2ce3ce[_0x49af39(0x97b)]<=0x0)return;_0x2ce3ce[_0x49af39(0x620)]=this['applyEasingAnglePlus'](_0x2ce3ce['current'],_0x2ce3ce[_0x49af39(0x40e)]),_0x2ce3ce[_0x49af39(0x97b)]--,_0x2ce3ce[_0x49af39(0x97b)]<=0x0&&(_0x2ce3ce[_0x49af39(0x620)]=_0x2ce3ce[_0x49af39(0x40e)]);},Game_Picture[_0x5ca092(0x923)][_0x5ca092(0x7d1)]=function(_0x16cbff,_0x15dbd2){const _0x1ce794=_0x5ca092,_0x3d732a=this[_0x1ce794(0x33b)],_0xd740d3=_0x3d732a['easingType'],_0x1ecad2=_0x3d732a[_0x1ce794(0x97b)],_0x2007c5=_0x3d732a[_0x1ce794(0x4c0)],_0x2b3be4=VisuMZ[_0x1ce794(0x8e2)]((_0x2007c5-_0x1ecad2)/_0x2007c5,_0xd740d3),_0x105bfc=VisuMZ['ApplyEasing']((_0x2007c5-_0x1ecad2+0x1)/_0x2007c5,_0xd740d3),_0x4dd329=(_0x16cbff-_0x15dbd2*_0x2b3be4)/(0x1-_0x2b3be4);return _0x4dd329+(_0x15dbd2-_0x4dd329)*_0x105bfc;},VisuMZ['CoreEngine'][_0x5ca092(0x324)]=Game_Action[_0x5ca092(0x923)][_0x5ca092(0x58d)],Game_Action[_0x5ca092(0x923)][_0x5ca092(0x58d)]=function(_0x101c66){const _0x43b62d=_0x5ca092;return VisuMZ[_0x43b62d(0x865)]['Settings'][_0x43b62d(0x656)][_0x43b62d(0x562)]?this[_0x43b62d(0x8ff)](_0x101c66):VisuMZ['CoreEngine'][_0x43b62d(0x324)]['call'](this,_0x101c66);},Game_Action[_0x5ca092(0x923)][_0x5ca092(0x8ff)]=function(_0x5d4309){const _0x4fea21=_0x5ca092,_0x5e84eb=this['itemSuccessRate'](_0x5d4309),_0x1e8f7c=this['subjectHitRate'](_0x5d4309),_0x3d6f52=this[_0x4fea21(0x966)](_0x5d4309);return _0x5e84eb*(_0x1e8f7c-_0x3d6f52);},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x3d7)]=Game_Action['prototype']['itemEva'],Game_Action[_0x5ca092(0x923)]['itemEva']=function(_0x5cec42){const _0x5e8962=_0x5ca092;return VisuMZ[_0x5e8962(0x865)][_0x5e8962(0x225)][_0x5e8962(0x656)][_0x5e8962(0x562)]?0x0:VisuMZ[_0x5e8962(0x865)][_0x5e8962(0x3d7)][_0x5e8962(0x481)](this,_0x5cec42);},Game_Action['prototype'][_0x5ca092(0x6c7)]=function(_0x1c9d53){const _0xd89c07=_0x5ca092;return this[_0xd89c07(0x6d5)]()[_0xd89c07(0x2bc)]*0.01;},Game_Action[_0x5ca092(0x923)][_0x5ca092(0x386)]=function(_0x405a38){const _0xb97c13=_0x5ca092;if(VisuMZ[_0xb97c13(0x865)]['Settings'][_0xb97c13(0x656)][_0xb97c13(0x649)]&&this[_0xb97c13(0x80e)]())return 0x1;return this[_0xb97c13(0x5d8)]()?VisuMZ[_0xb97c13(0x865)][_0xb97c13(0x225)][_0xb97c13(0x656)][_0xb97c13(0x649)]&&this['subject']()[_0xb97c13(0x4c2)]()?this[_0xb97c13(0x563)]()[_0xb97c13(0x776)]+0.05:this['subject']()['hit']:0x1;},Game_Action[_0x5ca092(0x923)][_0x5ca092(0x966)]=function(_0x22cd9c){const _0x347e1f=_0x5ca092;if(this['subject']()[_0x347e1f(0x4c2)]()===_0x22cd9c['isActor']())return 0x0;if(this['isPhysical']())return VisuMZ[_0x347e1f(0x865)][_0x347e1f(0x225)]['QoL'][_0x347e1f(0x649)]&&_0x22cd9c[_0x347e1f(0x300)]()?_0x22cd9c[_0x347e1f(0x90d)]-0.05:_0x22cd9c['eva'];else return this['isMagical']()?_0x22cd9c[_0x347e1f(0x45c)]:0x0;},VisuMZ['CoreEngine'][_0x5ca092(0x321)]=Game_Action[_0x5ca092(0x923)]['updateLastTarget'],Game_Action[_0x5ca092(0x923)][_0x5ca092(0x1d2)]=function(_0x2d2495){const _0x24fe4f=_0x5ca092;VisuMZ[_0x24fe4f(0x865)][_0x24fe4f(0x321)]['call'](this,_0x2d2495);if(VisuMZ[_0x24fe4f(0x865)][_0x24fe4f(0x225)][_0x24fe4f(0x656)][_0x24fe4f(0x562)])return;const _0x3e6014=_0x2d2495['result']();_0x3e6014['missed']&&(0x1-this['itemEva'](_0x2d2495)>this[_0x24fe4f(0x58d)](_0x2d2495)&&(_0x3e6014[_0x24fe4f(0x6c0)]=![],_0x3e6014[_0x24fe4f(0x454)]=!![]));},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x613)]=Game_BattlerBase[_0x5ca092(0x923)]['initMembers'],Game_BattlerBase[_0x5ca092(0x923)][_0x5ca092(0x80f)]=function(){const _0x201674=_0x5ca092;this[_0x201674(0x415)]={},VisuMZ[_0x201674(0x865)][_0x201674(0x613)][_0x201674(0x481)](this);},VisuMZ['CoreEngine'][_0x5ca092(0x6e3)]=Game_BattlerBase[_0x5ca092(0x923)][_0x5ca092(0x7f7)],Game_BattlerBase[_0x5ca092(0x923)]['refresh']=function(){const _0x28f165=_0x5ca092;this[_0x28f165(0x415)]={},VisuMZ[_0x28f165(0x865)][_0x28f165(0x6e3)][_0x28f165(0x481)](this);},Game_BattlerBase[_0x5ca092(0x923)]['checkCacheKey']=function(_0x230683){const _0x4594e2=_0x5ca092;return this[_0x4594e2(0x415)]=this[_0x4594e2(0x415)]||{},this[_0x4594e2(0x415)][_0x230683]!==undefined;},Game_BattlerBase[_0x5ca092(0x923)][_0x5ca092(0x808)]=function(_0x241369){const _0x57c3a9=_0x5ca092,_0x4d25e5=(_0x1149b4,_0x2afea8)=>{const _0x54d271=_0xd91e;if(!_0x2afea8)return _0x1149b4;if(_0x2afea8[_0x54d271(0x91e)][_0x54d271(0x345)](VisuMZ['CoreEngine'][_0x54d271(0x8b5)]['paramPlus'][_0x241369])){var _0x2979d9=Number(RegExp['$1']);_0x1149b4+=_0x2979d9;}if(_0x2afea8[_0x54d271(0x91e)][_0x54d271(0x345)](VisuMZ[_0x54d271(0x865)]['RegExp'][_0x54d271(0x2be)][_0x241369])){var _0xfd0f92=String(RegExp['$1']);try{_0x1149b4+=eval(_0xfd0f92);}catch(_0x598d63){if($gameTemp[_0x54d271(0x4be)]())console[_0x54d271(0x212)](_0x598d63);}}return _0x1149b4;};return this[_0x57c3a9(0x8bb)]()['reduce'](_0x4d25e5,this['_paramPlus'][_0x241369]);},Game_BattlerBase[_0x5ca092(0x923)][_0x5ca092(0x777)]=function(_0x2871ed){const _0x48985c=_0x5ca092;var _0x40b4fa=_0x48985c(0x69a)+(this['isActor']()?_0x48985c(0x77b):'Enemy')+_0x48985c(0x27e)+_0x2871ed;if(this[_0x48985c(0x2af)](_0x40b4fa))return this['_cache'][_0x40b4fa];this[_0x48985c(0x415)][_0x40b4fa]=eval(VisuMZ[_0x48985c(0x865)][_0x48985c(0x225)][_0x48985c(0x514)][_0x40b4fa]);const _0x394cfd=(_0x255fd7,_0x518537)=>{const _0x304127=_0x48985c;if(!_0x518537)return _0x255fd7;if(_0x518537['note'][_0x304127(0x345)](VisuMZ['CoreEngine'][_0x304127(0x8b5)][_0x304127(0x777)][_0x2871ed])){var _0x383c38=Number(RegExp['$1']);if(_0x383c38===0x0)_0x383c38=Number['MAX_SAFE_INTEGER'];_0x255fd7=Math[_0x304127(0x8e4)](_0x255fd7,_0x383c38);}if(_0x518537['note']['match'](VisuMZ[_0x304127(0x865)][_0x304127(0x8b5)][_0x304127(0x313)][_0x2871ed])){var _0x53c855=String(RegExp['$1']);try{_0x255fd7=Math[_0x304127(0x8e4)](_0x255fd7,Number(eval(_0x53c855)));}catch(_0x939892){if($gameTemp['isPlaytest']())console[_0x304127(0x212)](_0x939892);}}return _0x255fd7;};if(this['_cache'][_0x40b4fa]===0x0)this['_cache'][_0x40b4fa]=Number['MAX_SAFE_INTEGER'];return this[_0x48985c(0x415)][_0x40b4fa]=this['traitObjects']()[_0x48985c(0x36d)](_0x394cfd,this[_0x48985c(0x415)][_0x40b4fa]),this[_0x48985c(0x415)][_0x40b4fa];},Game_BattlerBase['prototype']['paramRate']=function(_0x1acc17){const _0xcbb172=_0x5ca092,_0x24ee29=this[_0xcbb172(0x53e)](Game_BattlerBase['TRAIT_PARAM'],_0x1acc17),_0x538cf8=(_0x2b03d7,_0x112663)=>{const _0x9d96de=_0xcbb172;if(!_0x112663)return _0x2b03d7;if(_0x112663[_0x9d96de(0x91e)][_0x9d96de(0x345)](VisuMZ[_0x9d96de(0x865)]['RegExp'][_0x9d96de(0x470)][_0x1acc17])){var _0x3f1770=Number(RegExp['$1'])/0x64;_0x2b03d7*=_0x3f1770;}if(_0x112663[_0x9d96de(0x91e)]['match'](VisuMZ[_0x9d96de(0x865)][_0x9d96de(0x8b5)][_0x9d96de(0x463)][_0x1acc17])){var _0x3f1770=Number(RegExp['$1']);_0x2b03d7*=_0x3f1770;}if(_0x112663['note']['match'](VisuMZ[_0x9d96de(0x865)][_0x9d96de(0x8b5)][_0x9d96de(0x734)][_0x1acc17])){var _0x184300=String(RegExp['$1']);try{_0x2b03d7*=eval(_0x184300);}catch(_0x12d6e2){if($gameTemp['isPlaytest']())console[_0x9d96de(0x212)](_0x12d6e2);}}return _0x2b03d7;};return this[_0xcbb172(0x8bb)]()[_0xcbb172(0x36d)](_0x538cf8,_0x24ee29);},Game_BattlerBase[_0x5ca092(0x923)][_0x5ca092(0x1ce)]=function(_0x3e0bd0){const _0x52a59f=_0x5ca092,_0x2a125c=(_0x45f93f,_0x1aae75)=>{const _0x3849dd=_0xd91e;if(!_0x1aae75)return _0x45f93f;if(_0x1aae75['note']['match'](VisuMZ['CoreEngine'][_0x3849dd(0x8b5)][_0x3849dd(0x579)][_0x3e0bd0])){var _0x130527=Number(RegExp['$1']);_0x45f93f+=_0x130527;}if(_0x1aae75['note'][_0x3849dd(0x345)](VisuMZ[_0x3849dd(0x865)][_0x3849dd(0x8b5)][_0x3849dd(0x206)][_0x3e0bd0])){var _0x38dee2=String(RegExp['$1']);try{_0x45f93f+=eval(_0x38dee2);}catch(_0x41aa31){if($gameTemp[_0x3849dd(0x4be)]())console['log'](_0x41aa31);}}return _0x45f93f;};return this[_0x52a59f(0x8bb)]()[_0x52a59f(0x36d)](_0x2a125c,0x0);},Game_BattlerBase[_0x5ca092(0x923)][_0x5ca092(0x586)]=function(_0x28e94b){const _0xa897b5=_0x5ca092;let _0x1363a4=_0xa897b5(0x586)+_0x28e94b+'Total';if(this['checkCacheKey'](_0x1363a4))return this[_0xa897b5(0x415)][_0x1363a4];return this['_cache'][_0x1363a4]=Math[_0xa897b5(0x75e)](VisuMZ[_0xa897b5(0x865)][_0xa897b5(0x225)][_0xa897b5(0x514)][_0xa897b5(0x884)][_0xa897b5(0x481)](this,_0x28e94b)),this['_cache'][_0x1363a4];},Game_BattlerBase['prototype'][_0x5ca092(0x4cb)]=function(_0xcbac34){const _0x43a280=_0x5ca092,_0x4d8c41=(_0x2dfdf8,_0x287053)=>{const _0x40c25d=_0xd91e;if(!_0x287053)return _0x2dfdf8;if(_0x287053[_0x40c25d(0x91e)][_0x40c25d(0x345)](VisuMZ['CoreEngine'][_0x40c25d(0x8b5)][_0x40c25d(0x451)][_0xcbac34])){var _0x1062fb=Number(RegExp['$1'])/0x64;_0x2dfdf8+=_0x1062fb;}if(_0x287053[_0x40c25d(0x91e)][_0x40c25d(0x345)](VisuMZ['CoreEngine'][_0x40c25d(0x8b5)][_0x40c25d(0x7d3)][_0xcbac34])){var _0x1062fb=Number(RegExp['$1']);_0x2dfdf8+=_0x1062fb;}if(_0x287053[_0x40c25d(0x91e)][_0x40c25d(0x345)](VisuMZ[_0x40c25d(0x865)][_0x40c25d(0x8b5)][_0x40c25d(0x339)][_0xcbac34])){var _0x28370a=String(RegExp['$1']);try{_0x2dfdf8+=eval(_0x28370a);}catch(_0x248590){if($gameTemp[_0x40c25d(0x4be)]())console[_0x40c25d(0x212)](_0x248590);}}return _0x2dfdf8;};return this[_0x43a280(0x8bb)]()[_0x43a280(0x36d)](_0x4d8c41,0x0);},Game_BattlerBase[_0x5ca092(0x923)]['xparamRate']=function(_0x3452de){const _0xd36a04=_0x5ca092,_0xfc8bc8=(_0x2c7b32,_0x478317)=>{const _0x56ec48=_0xd91e;if(!_0x478317)return _0x2c7b32;if(_0x478317[_0x56ec48(0x91e)][_0x56ec48(0x345)](VisuMZ[_0x56ec48(0x865)][_0x56ec48(0x8b5)][_0x56ec48(0x4ec)][_0x3452de])){var _0xaa127e=Number(RegExp['$1'])/0x64;_0x2c7b32*=_0xaa127e;}if(_0x478317[_0x56ec48(0x91e)][_0x56ec48(0x345)](VisuMZ['CoreEngine']['RegExp']['xparamRate2'][_0x3452de])){var _0xaa127e=Number(RegExp['$1']);_0x2c7b32*=_0xaa127e;}if(_0x478317[_0x56ec48(0x91e)][_0x56ec48(0x345)](VisuMZ[_0x56ec48(0x865)]['RegExp']['xparamRateJS'][_0x3452de])){var _0x3c275d=String(RegExp['$1']);try{_0x2c7b32*=eval(_0x3c275d);}catch(_0x2b7b09){if($gameTemp[_0x56ec48(0x4be)]())console['log'](_0x2b7b09);}}return _0x2c7b32;};return this[_0xd36a04(0x8bb)]()[_0xd36a04(0x36d)](_0xfc8bc8,0x1);},Game_BattlerBase['prototype'][_0x5ca092(0x7e1)]=function(_0x212538){const _0x4efb58=_0x5ca092,_0xb7c104=(_0x3f0989,_0xe4c955)=>{const _0x46e2cb=_0xd91e;if(!_0xe4c955)return _0x3f0989;if(_0xe4c955[_0x46e2cb(0x91e)][_0x46e2cb(0x345)](VisuMZ['CoreEngine']['RegExp'][_0x46e2cb(0x1dd)][_0x212538])){var _0x4b68ef=Number(RegExp['$1'])/0x64;_0x3f0989+=_0x4b68ef;}if(_0xe4c955[_0x46e2cb(0x91e)]['match'](VisuMZ['CoreEngine'][_0x46e2cb(0x8b5)][_0x46e2cb(0x2e3)][_0x212538])){var _0x4b68ef=Number(RegExp['$1']);_0x3f0989+=_0x4b68ef;}if(_0xe4c955[_0x46e2cb(0x91e)]['match'](VisuMZ[_0x46e2cb(0x865)][_0x46e2cb(0x8b5)][_0x46e2cb(0x6db)][_0x212538])){var _0x29bc77=String(RegExp['$1']);try{_0x3f0989+=eval(_0x29bc77);}catch(_0x278248){if($gameTemp[_0x46e2cb(0x4be)]())console[_0x46e2cb(0x212)](_0x278248);}}return _0x3f0989;};return this['traitObjects']()[_0x4efb58(0x36d)](_0xb7c104,0x0);},Game_BattlerBase['prototype'][_0x5ca092(0x929)]=function(_0x48ddd7){const _0x350f6f=_0x5ca092;let _0x2d05c4='xparam'+_0x48ddd7+_0x350f6f(0x8c6);if(this[_0x350f6f(0x2af)](_0x2d05c4))return this[_0x350f6f(0x415)][_0x2d05c4];return this[_0x350f6f(0x415)][_0x2d05c4]=VisuMZ[_0x350f6f(0x865)][_0x350f6f(0x225)][_0x350f6f(0x514)][_0x350f6f(0x6d4)]['call'](this,_0x48ddd7),this[_0x350f6f(0x415)][_0x2d05c4];},Game_BattlerBase[_0x5ca092(0x923)]['sparamPlus']=function(_0x22b8f9){const _0x3b6a90=_0x5ca092,_0x2fb478=(_0x240bb0,_0x4dd0bf)=>{const _0x2b1751=_0xd91e;if(!_0x4dd0bf)return _0x240bb0;if(_0x4dd0bf[_0x2b1751(0x91e)][_0x2b1751(0x345)](VisuMZ[_0x2b1751(0x865)][_0x2b1751(0x8b5)][_0x2b1751(0x22c)][_0x22b8f9])){var _0x3c728f=Number(RegExp['$1'])/0x64;_0x240bb0+=_0x3c728f;}if(_0x4dd0bf[_0x2b1751(0x91e)][_0x2b1751(0x345)](VisuMZ[_0x2b1751(0x865)][_0x2b1751(0x8b5)][_0x2b1751(0x37a)][_0x22b8f9])){var _0x3c728f=Number(RegExp['$1']);_0x240bb0+=_0x3c728f;}if(_0x4dd0bf[_0x2b1751(0x91e)][_0x2b1751(0x345)](VisuMZ['CoreEngine'][_0x2b1751(0x8b5)]['sparamPlusJS'][_0x22b8f9])){var _0x20a918=String(RegExp['$1']);try{_0x240bb0+=eval(_0x20a918);}catch(_0x5c7e28){if($gameTemp['isPlaytest']())console['log'](_0x5c7e28);}}return _0x240bb0;};return this['traitObjects']()[_0x3b6a90(0x36d)](_0x2fb478,0x0);},Game_BattlerBase[_0x5ca092(0x923)]['sparamRate']=function(_0x2a84ce){const _0x10dbc2=_0x5ca092,_0x59ea4f=(_0x106aff,_0x3b4f09)=>{const _0x22637d=_0xd91e;if(!_0x3b4f09)return _0x106aff;if(_0x3b4f09[_0x22637d(0x91e)][_0x22637d(0x345)](VisuMZ['CoreEngine'][_0x22637d(0x8b5)][_0x22637d(0x27f)][_0x2a84ce])){var _0x3edbbe=Number(RegExp['$1'])/0x64;_0x106aff*=_0x3edbbe;}if(_0x3b4f09[_0x22637d(0x91e)]['match'](VisuMZ['CoreEngine'][_0x22637d(0x8b5)]['sparamRate2'][_0x2a84ce])){var _0x3edbbe=Number(RegExp['$1']);_0x106aff*=_0x3edbbe;}if(_0x3b4f09[_0x22637d(0x91e)][_0x22637d(0x345)](VisuMZ['CoreEngine']['RegExp'][_0x22637d(0x8dc)][_0x2a84ce])){var _0x33f553=String(RegExp['$1']);try{_0x106aff*=eval(_0x33f553);}catch(_0x453fc1){if($gameTemp['isPlaytest']())console[_0x22637d(0x212)](_0x453fc1);}}return _0x106aff;};return this[_0x10dbc2(0x8bb)]()[_0x10dbc2(0x36d)](_0x59ea4f,0x1);},Game_BattlerBase[_0x5ca092(0x923)]['sparamFlatBonus']=function(_0x335532){const _0x4cc317=_0x5ca092,_0x1fa43e=(_0x1974ef,_0x469eaa)=>{const _0x42cda9=_0xd91e;if(!_0x469eaa)return _0x1974ef;if(_0x469eaa[_0x42cda9(0x91e)][_0x42cda9(0x345)](VisuMZ[_0x42cda9(0x865)][_0x42cda9(0x8b5)][_0x42cda9(0x82f)][_0x335532])){var _0x5dcbe2=Number(RegExp['$1'])/0x64;_0x1974ef+=_0x5dcbe2;}if(_0x469eaa[_0x42cda9(0x91e)][_0x42cda9(0x345)](VisuMZ[_0x42cda9(0x865)]['RegExp'][_0x42cda9(0x500)][_0x335532])){var _0x5dcbe2=Number(RegExp['$1']);_0x1974ef+=_0x5dcbe2;}if(_0x469eaa[_0x42cda9(0x91e)]['match'](VisuMZ['CoreEngine']['RegExp']['sparamFlatJS'][_0x335532])){var _0x26a653=String(RegExp['$1']);try{_0x1974ef+=eval(_0x26a653);}catch(_0x71d28a){if($gameTemp[_0x42cda9(0x4be)]())console['log'](_0x71d28a);}}return _0x1974ef;};return this[_0x4cc317(0x8bb)]()[_0x4cc317(0x36d)](_0x1fa43e,0x0);},Game_BattlerBase[_0x5ca092(0x923)][_0x5ca092(0x2c2)]=function(_0x34f4ee){const _0x33a5a0=_0x5ca092;let _0xcff02b=_0x33a5a0(0x2c2)+_0x34f4ee+_0x33a5a0(0x8c6);if(this[_0x33a5a0(0x2af)](_0xcff02b))return this[_0x33a5a0(0x415)][_0xcff02b];return this['_cache'][_0xcff02b]=VisuMZ['CoreEngine']['Settings'][_0x33a5a0(0x514)][_0x33a5a0(0x457)][_0x33a5a0(0x481)](this,_0x34f4ee),this['_cache'][_0xcff02b];},Game_BattlerBase[_0x5ca092(0x923)][_0x5ca092(0x754)]=function(_0x4f18bb,_0xf11bc8){const _0x41ab6c=_0x5ca092;if(typeof paramId==='number')return this[_0x41ab6c(0x586)](_0x4f18bb);_0x4f18bb=String(_0x4f18bb||'')['toUpperCase']();if(_0x4f18bb===_0x41ab6c(0x5f0))return this['param'](0x0);if(_0x4f18bb==='MAXMP')return this[_0x41ab6c(0x586)](0x1);if(_0x4f18bb===_0x41ab6c(0x6d2))return this[_0x41ab6c(0x586)](0x2);if(_0x4f18bb===_0x41ab6c(0x27d))return this[_0x41ab6c(0x586)](0x3);if(_0x4f18bb===_0x41ab6c(0x6a4))return this[_0x41ab6c(0x586)](0x4);if(_0x4f18bb===_0x41ab6c(0x836))return this[_0x41ab6c(0x586)](0x5);if(_0x4f18bb===_0x41ab6c(0x611))return this['param'](0x6);if(_0x4f18bb===_0x41ab6c(0x938))return this['param'](0x7);if(_0x4f18bb===_0x41ab6c(0x6f0))return _0xf11bc8?String(Math[_0x41ab6c(0x75e)](this[_0x41ab6c(0x929)](0x0)*0x64))+'%':this['xparam'](0x0);if(_0x4f18bb===_0x41ab6c(0x3bc))return _0xf11bc8?String(Math['round'](this['xparam'](0x1)*0x64))+'%':this[_0x41ab6c(0x929)](0x1);if(_0x4f18bb==='CRI')return _0xf11bc8?String(Math['round'](this[_0x41ab6c(0x929)](0x2)*0x64))+'%':this[_0x41ab6c(0x929)](0x2);if(_0x4f18bb==='CEV')return _0xf11bc8?String(Math[_0x41ab6c(0x75e)](this[_0x41ab6c(0x929)](0x3)*0x64))+'%':this['xparam'](0x3);if(_0x4f18bb===_0x41ab6c(0x7d7))return _0xf11bc8?String(Math['round'](this['xparam'](0x4)*0x64))+'%':this[_0x41ab6c(0x929)](0x4);if(_0x4f18bb===_0x41ab6c(0x1f4))return _0xf11bc8?String(Math[_0x41ab6c(0x75e)](this[_0x41ab6c(0x929)](0x5)*0x64))+'%':this['xparam'](0x5);if(_0x4f18bb===_0x41ab6c(0x368))return _0xf11bc8?String(Math[_0x41ab6c(0x75e)](this['xparam'](0x6)*0x64))+'%':this['xparam'](0x6);if(_0x4f18bb===_0x41ab6c(0x58c))return _0xf11bc8?String(Math[_0x41ab6c(0x75e)](this[_0x41ab6c(0x929)](0x7)*0x64))+'%':this[_0x41ab6c(0x929)](0x7);if(_0x4f18bb===_0x41ab6c(0x8b0))return _0xf11bc8?String(Math[_0x41ab6c(0x75e)](this['xparam'](0x8)*0x64))+'%':this[_0x41ab6c(0x929)](0x8);if(_0x4f18bb===_0x41ab6c(0x870))return _0xf11bc8?String(Math['round'](this[_0x41ab6c(0x929)](0x9)*0x64))+'%':this[_0x41ab6c(0x929)](0x9);if(_0x4f18bb==='TGR')return _0xf11bc8?String(Math[_0x41ab6c(0x75e)](this[_0x41ab6c(0x2c2)](0x0)*0x64))+'%':this['sparam'](0x0);if(_0x4f18bb===_0x41ab6c(0x91a))return _0xf11bc8?String(Math[_0x41ab6c(0x75e)](this['sparam'](0x1)*0x64))+'%':this[_0x41ab6c(0x2c2)](0x1);if(_0x4f18bb===_0x41ab6c(0x871))return _0xf11bc8?String(Math[_0x41ab6c(0x75e)](this['sparam'](0x2)*0x64))+'%':this[_0x41ab6c(0x2c2)](0x2);if(_0x4f18bb===_0x41ab6c(0x92e))return _0xf11bc8?String(Math[_0x41ab6c(0x75e)](this[_0x41ab6c(0x2c2)](0x3)*0x64))+'%':this[_0x41ab6c(0x2c2)](0x3);if(_0x4f18bb===_0x41ab6c(0x28a))return _0xf11bc8?String(Math['round'](this[_0x41ab6c(0x2c2)](0x4)*0x64))+'%':this[_0x41ab6c(0x2c2)](0x4);if(_0x4f18bb===_0x41ab6c(0x782))return _0xf11bc8?String(Math[_0x41ab6c(0x75e)](this['sparam'](0x5)*0x64))+'%':this[_0x41ab6c(0x2c2)](0x5);if(_0x4f18bb===_0x41ab6c(0x5ea))return _0xf11bc8?String(Math[_0x41ab6c(0x75e)](this[_0x41ab6c(0x2c2)](0x6)*0x64))+'%':this[_0x41ab6c(0x2c2)](0x6);if(_0x4f18bb==='MDR')return _0xf11bc8?String(Math[_0x41ab6c(0x75e)](this[_0x41ab6c(0x2c2)](0x7)*0x64))+'%':this['sparam'](0x7);if(_0x4f18bb==='FDR')return _0xf11bc8?String(Math[_0x41ab6c(0x75e)](this[_0x41ab6c(0x2c2)](0x8)*0x64))+'%':this[_0x41ab6c(0x2c2)](0x8);if(_0x4f18bb===_0x41ab6c(0x7f1))return _0xf11bc8?String(Math['round'](this[_0x41ab6c(0x2c2)](0x9)*0x64))+'%':this[_0x41ab6c(0x2c2)](0x9);if(VisuMZ[_0x41ab6c(0x865)][_0x41ab6c(0x62a)][_0x4f18bb]){const _0x8941fe=VisuMZ[_0x41ab6c(0x865)]['CustomParamAbb'][_0x4f18bb],_0x2d75af=this[_0x8941fe];return VisuMZ[_0x41ab6c(0x865)][_0x41ab6c(0x30b)][_0x4f18bb]===_0x41ab6c(0x77f)?_0x2d75af:_0xf11bc8?String(Math[_0x41ab6c(0x75e)](_0x2d75af*0x64))+'%':_0x2d75af;}return'';},Game_BattlerBase[_0x5ca092(0x923)][_0x5ca092(0x601)]=function(){const _0x4e8d7c=_0x5ca092;return this[_0x4e8d7c(0x39e)]()&&this[_0x4e8d7c(0x8ad)]<this[_0x4e8d7c(0x49e)]*VisuMZ[_0x4e8d7c(0x865)][_0x4e8d7c(0x225)][_0x4e8d7c(0x514)][_0x4e8d7c(0x76b)];},Game_Battler[_0x5ca092(0x923)]['performMiss']=function(){const _0x2d800c=_0x5ca092;SoundManager[_0x2d800c(0x239)](),this[_0x2d800c(0x289)](_0x2d800c(0x800));},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x89e)]=Game_Actor[_0x5ca092(0x923)][_0x5ca092(0x2b3)],Game_Actor['prototype'][_0x5ca092(0x2b3)]=function(_0x2c3f0c){const _0x1c660e=_0x5ca092;if(this[_0x1c660e(0x53b)]>0x63)return this[_0x1c660e(0x86d)](_0x2c3f0c);return VisuMZ[_0x1c660e(0x865)][_0x1c660e(0x89e)][_0x1c660e(0x481)](this,_0x2c3f0c);},Game_Actor[_0x5ca092(0x923)][_0x5ca092(0x86d)]=function(_0x13f346){const _0x23baa5=_0x5ca092,_0x35b8b9=this['currentClass']()['params'][_0x13f346][0x63],_0x44390f=this[_0x23baa5(0x6fe)]()[_0x23baa5(0x296)][_0x13f346][0x62];return _0x35b8b9+(_0x35b8b9-_0x44390f)*(this[_0x23baa5(0x53b)]-0x63);},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x4c7)]=Game_Actor['prototype']['changeClass'],Game_Actor[_0x5ca092(0x923)][_0x5ca092(0x952)]=function(_0x277bb9,_0x314a32){const _0x3bc779=_0x5ca092;$gameTemp['_changingClass']=!![],VisuMZ[_0x3bc779(0x865)][_0x3bc779(0x4c7)][_0x3bc779(0x481)](this,_0x277bb9,_0x314a32),$gameTemp[_0x3bc779(0x4ce)]=undefined;},VisuMZ[_0x5ca092(0x865)]['Game_Actor_levelUp']=Game_Actor['prototype'][_0x5ca092(0x23f)],Game_Actor['prototype']['levelUp']=function(){const _0x3b1b3f=_0x5ca092;VisuMZ['CoreEngine'][_0x3b1b3f(0x7d2)][_0x3b1b3f(0x481)](this);if(!$gameTemp[_0x3b1b3f(0x4ce)])this['levelUpRecovery']();},Game_Actor[_0x5ca092(0x923)][_0x5ca092(0x8f9)]=function(){const _0x287adf=_0x5ca092;this[_0x287adf(0x415)]={};if(VisuMZ[_0x287adf(0x865)][_0x287adf(0x225)][_0x287adf(0x656)][_0x287adf(0x8d7)])this[_0x287adf(0x8ad)]=this[_0x287adf(0x49e)];if(VisuMZ[_0x287adf(0x865)][_0x287adf(0x225)][_0x287adf(0x656)][_0x287adf(0x37d)])this['_mp']=this[_0x287adf(0x822)];},Game_Actor[_0x5ca092(0x923)][_0x5ca092(0x39b)]=function(){const _0x30d866=_0x5ca092;if(this[_0x30d866(0x59b)]())return 0x1;const _0x77a659=this[_0x30d866(0x6ec)]()-this[_0x30d866(0x578)](),_0x36629d=this[_0x30d866(0x926)]()-this[_0x30d866(0x578)]();return(_0x36629d/_0x77a659)[_0x30d866(0x266)](0x0,0x1);},Game_Actor['prototype'][_0x5ca092(0x8bb)]=function(){const _0x2d3cc2=_0x5ca092,_0x2dc700=Game_Battler[_0x2d3cc2(0x923)]['traitObjects']['call'](this);for(const _0x1f3753 of this['equips']()){_0x1f3753&&_0x2dc700[_0x2d3cc2(0x4a2)](_0x1f3753);}return _0x2dc700['push'](this[_0x2d3cc2(0x6fe)](),this[_0x2d3cc2(0x502)]()),_0x2dc700;},Object[_0x5ca092(0x8d5)](Game_Enemy[_0x5ca092(0x923)],_0x5ca092(0x53b),{'get':function(){const _0x1ccb71=_0x5ca092;return this[_0x1ccb71(0x3a8)]();},'configurable':!![]}),Game_Enemy['prototype'][_0x5ca092(0x3a8)]=function(){const _0x121be9=_0x5ca092;return this[_0x121be9(0x8ec)]()[_0x121be9(0x53b)];},Game_Enemy['prototype']['moveRelativeToResolutionChange']=function(){const _0x3db3ce=_0x5ca092;!this['_repositioned']&&(this[_0x3db3ce(0x3ad)]+=Math['round']((Graphics[_0x3db3ce(0x2a0)]-0x270)/0x2),this[_0x3db3ce(0x3ad)]-=Math[_0x3db3ce(0x229)]((Graphics[_0x3db3ce(0x2a0)]-Graphics[_0x3db3ce(0x6dc)])/0x2),$gameSystem['isSideView']()?this[_0x3db3ce(0x612)]-=Math['floor']((Graphics[_0x3db3ce(0x7b7)]-Graphics[_0x3db3ce(0x630)])/0x2):this['_screenX']+=Math[_0x3db3ce(0x75e)]((Graphics[_0x3db3ce(0x630)]-0x330)/0x2)),this[_0x3db3ce(0x293)]=!![];},Game_Party['prototype'][_0x5ca092(0x821)]=function(){const _0xdb9acf=_0x5ca092;return VisuMZ[_0xdb9acf(0x865)][_0xdb9acf(0x225)]['Gold'][_0xdb9acf(0x352)];},VisuMZ['CoreEngine'][_0x5ca092(0x6f8)]=Game_Party['prototype'][_0x5ca092(0x2c3)],Game_Party['prototype'][_0x5ca092(0x2c3)]=function(_0x495444){const _0x4f9f0f=_0x5ca092;if(VisuMZ['CoreEngine'][_0x4f9f0f(0x225)][_0x4f9f0f(0x656)][_0x4f9f0f(0x282)]&&DataManager[_0x4f9f0f(0x5c0)](_0x495444))return;VisuMZ[_0x4f9f0f(0x865)][_0x4f9f0f(0x6f8)][_0x4f9f0f(0x481)](this,_0x495444);},Game_Party[_0x5ca092(0x923)]['setupBattleTestItems']=function(){const _0x1c9985=_0x5ca092,_0x3adb30=VisuMZ[_0x1c9985(0x865)][_0x1c9985(0x225)]['QoL'],_0x52a072=_0x3adb30[_0x1c9985(0x3f5)]??0x63;let _0x1f6add=[];(_0x3adb30['BTestItems']??!![])&&(_0x1f6add=_0x1f6add[_0x1c9985(0x903)]($dataItems));(_0x3adb30[_0x1c9985(0x380)]??!![])&&(_0x1f6add=_0x1f6add[_0x1c9985(0x903)]($dataWeapons));(_0x3adb30[_0x1c9985(0x1bf)]??!![])&&(_0x1f6add=_0x1f6add[_0x1c9985(0x903)]($dataArmors));for(const _0x563c0d of _0x1f6add){if(!_0x563c0d)continue;if(_0x563c0d[_0x1c9985(0x7a5)][_0x1c9985(0x6d7)]()<=0x0)continue;if(_0x563c0d[_0x1c9985(0x7a5)]['match'](/-----/i))continue;this['gainItem'](_0x563c0d,_0x52a072);}},VisuMZ[_0x5ca092(0x865)]['Game_Troop_setup']=Game_Troop[_0x5ca092(0x923)][_0x5ca092(0x495)],Game_Troop['prototype'][_0x5ca092(0x495)]=function(_0x5f1db9){const _0x3300a4=_0x5ca092;$gameTemp[_0x3300a4(0x312)](),$gameTemp[_0x3300a4(0x417)](_0x5f1db9),VisuMZ[_0x3300a4(0x865)][_0x3300a4(0x4e0)][_0x3300a4(0x481)](this,_0x5f1db9);},VisuMZ['CoreEngine'][_0x5ca092(0x53f)]=Game_Map['prototype']['setup'],Game_Map[_0x5ca092(0x923)][_0x5ca092(0x495)]=function(_0x48b2f7){const _0x290f4f=_0x5ca092;VisuMZ[_0x290f4f(0x865)][_0x290f4f(0x53f)]['call'](this,_0x48b2f7),this[_0x290f4f(0x49f)](),this[_0x290f4f(0x85a)](_0x48b2f7),this[_0x290f4f(0x829)]();},Game_Map['prototype'][_0x5ca092(0x85a)]=function(){const _0x59d5a7=_0x5ca092;this[_0x59d5a7(0x461)]=VisuMZ['CoreEngine']['Settings'][_0x59d5a7(0x656)][_0x59d5a7(0x405)]||![];const _0x12f382=VisuMZ[_0x59d5a7(0x865)][_0x59d5a7(0x225)][_0x59d5a7(0x6ed)],_0x1d2cfe=$dataMap?$dataMap[_0x59d5a7(0x91e)]||'':'';if(_0x1d2cfe[_0x59d5a7(0x345)](/<SHOW TILE SHADOWS>/i))this['_hideTileShadows']=![];else _0x1d2cfe['match'](/<HIDE TILE SHADOWS>/i)&&(this[_0x59d5a7(0x461)]=!![]);if(_0x1d2cfe['match'](/<SCROLL LOCK X>/i))this[_0x59d5a7(0x653)]()['centerX']=!![],this[_0x59d5a7(0x653)]()[_0x59d5a7(0x6fa)]=_0x12f382[_0x59d5a7(0x378)];else _0x1d2cfe[_0x59d5a7(0x345)](/<SCROLL LOCK X: (.*?)>/i)&&(this[_0x59d5a7(0x653)]()[_0x59d5a7(0x1fa)]=!![],this[_0x59d5a7(0x653)]()[_0x59d5a7(0x6fa)]=Number(RegExp['$1']));if(_0x1d2cfe[_0x59d5a7(0x345)](/<SCROLL LOCK Y>/i))this[_0x59d5a7(0x653)]()[_0x59d5a7(0x403)]=!![],this[_0x59d5a7(0x653)]()[_0x59d5a7(0x892)]=_0x12f382[_0x59d5a7(0x32b)];else _0x1d2cfe[_0x59d5a7(0x345)](/<SCROLL LOCK Y: (.*?)>/i)&&(this[_0x59d5a7(0x653)]()[_0x59d5a7(0x403)]=!![],this[_0x59d5a7(0x653)]()[_0x59d5a7(0x892)]=Number(RegExp['$1']));},Game_Map[_0x5ca092(0x923)][_0x5ca092(0x3ff)]=function(){const _0x13bccb=_0x5ca092;if(this[_0x13bccb(0x461)]===undefined)this[_0x13bccb(0x85a)]();return this[_0x13bccb(0x461)];},Game_Map[_0x5ca092(0x923)][_0x5ca092(0x49f)]=function(){const _0x1b7231=_0x5ca092,_0x3f0e7b=VisuMZ[_0x1b7231(0x865)][_0x1b7231(0x225)][_0x1b7231(0x6ed)];this['_centerCameraCheck']={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0x3f0e7b[_0x1b7231(0x358)]){const _0xcc8dce=Graphics[_0x1b7231(0x7b7)]/this[_0x1b7231(0x2a8)]();_0xcc8dce%0x1!==0x0&&Math[_0x1b7231(0x8e7)](_0xcc8dce)===this[_0x1b7231(0x7b7)]()&&!this[_0x1b7231(0x5c7)]()&&(this['_centerCameraCheck'][_0x1b7231(0x1fa)]=!![],this[_0x1b7231(0x5e9)][_0x1b7231(0x6fa)]=_0x3f0e7b['DisplayLockX']||0x0);}if(_0x3f0e7b['AutoScrollLockY']){const _0x512910=Graphics[_0x1b7231(0x2a0)]/this[_0x1b7231(0x396)]();_0x512910%0x1!==0x0&&Math[_0x1b7231(0x8e7)](_0x512910)===this['height']()&&!this[_0x1b7231(0x518)]()&&(this[_0x1b7231(0x5e9)][_0x1b7231(0x403)]=!![],this[_0x1b7231(0x5e9)]['displayY']=_0x3f0e7b[_0x1b7231(0x32b)]||0x0);}$gameScreen['zoomScale']()===0x1&&(this[_0x1b7231(0x653)]()[_0x1b7231(0x1fa)]&&(this['_displayX']=this[_0x1b7231(0x653)]()[_0x1b7231(0x6fa)]),this['centerCameraCheckData']()['centerY']&&(this[_0x1b7231(0x3ce)]=this[_0x1b7231(0x653)]()[_0x1b7231(0x892)]));},VisuMZ['CoreEngine'][_0x5ca092(0x542)]=Game_Map[_0x5ca092(0x923)][_0x5ca092(0x5bd)],Game_Map['prototype'][_0x5ca092(0x5bd)]=function(_0x45389d,_0x166336){const _0x1527c8=_0x5ca092;VisuMZ[_0x1527c8(0x865)]['Game_Map_setDisplayPos']['call'](this,_0x45389d,_0x166336),$gameScreen[_0x1527c8(0x1e6)]()===0x1&&(!this[_0x1527c8(0x5c7)]()&&this[_0x1527c8(0x653)]()[_0x1527c8(0x1fa)]&&(this['_displayX']=this[_0x1527c8(0x653)]()[_0x1527c8(0x6fa)]),!this[_0x1527c8(0x518)]()&&this[_0x1527c8(0x653)]()[_0x1527c8(0x403)]&&(this[_0x1527c8(0x3ce)]=this['centerCameraCheckData']()['displayY']));},Game_Map['prototype'][_0x5ca092(0x653)]=function(){const _0x5c4b17=_0x5ca092;if(this[_0x5c4b17(0x5e9)]===undefined)this[_0x5c4b17(0x49f)]();return this['_centerCameraCheck'];},VisuMZ['CoreEngine'][_0x5ca092(0x43e)]=Game_Map[_0x5ca092(0x923)][_0x5ca092(0x36b)],Game_Map[_0x5ca092(0x923)][_0x5ca092(0x36b)]=function(_0x5cbc2d){const _0x38ede6=_0x5ca092;if(this['centerCameraCheckData']()[_0x38ede6(0x403)]&&$gameScreen[_0x38ede6(0x1e6)]()===0x1){this[_0x38ede6(0x3ce)]=this[_0x38ede6(0x653)]()[_0x38ede6(0x892)];return;}VisuMZ[_0x38ede6(0x865)][_0x38ede6(0x43e)][_0x38ede6(0x481)](this,_0x5cbc2d);},VisuMZ[_0x5ca092(0x865)]['Game_Map_scrollLeft']=Game_Map[_0x5ca092(0x923)][_0x5ca092(0x60c)],Game_Map[_0x5ca092(0x923)][_0x5ca092(0x60c)]=function(_0x14c852){const _0x55240c=_0x5ca092;if(this[_0x55240c(0x653)]()[_0x55240c(0x1fa)]&&$gameScreen['zoomScale']()===0x1){this[_0x55240c(0x242)]=this[_0x55240c(0x653)]()[_0x55240c(0x6fa)];return;}VisuMZ[_0x55240c(0x865)]['Game_Map_scrollLeft'][_0x55240c(0x481)](this,_0x14c852);},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x6f6)]=Game_Map[_0x5ca092(0x923)][_0x5ca092(0x284)],Game_Map[_0x5ca092(0x923)]['scrollRight']=function(_0x3b1485){const _0xeaf037=_0x5ca092;if(this[_0xeaf037(0x653)]()[_0xeaf037(0x1fa)]&&$gameScreen['zoomScale']()===0x1){this[_0xeaf037(0x242)]=this[_0xeaf037(0x653)]()[_0xeaf037(0x6fa)];return;}VisuMZ[_0xeaf037(0x865)][_0xeaf037(0x6f6)][_0xeaf037(0x481)](this,_0x3b1485);},VisuMZ['CoreEngine'][_0x5ca092(0x82d)]=Game_Map['prototype'][_0x5ca092(0x5d3)],Game_Map[_0x5ca092(0x923)][_0x5ca092(0x5d3)]=function(_0xf2b275){const _0x2dbcbd=_0x5ca092;if(this[_0x2dbcbd(0x653)]()[_0x2dbcbd(0x403)]&&$gameScreen[_0x2dbcbd(0x1e6)]()===0x1){this['_displayY']=this['centerCameraCheckData']()['displayY'];return;}VisuMZ['CoreEngine']['Game_Map_scrollUp']['call'](this,_0xf2b275);},Game_Map[_0x5ca092(0x923)][_0x5ca092(0x829)]=function(){const _0x329147=_0x5ca092;this[_0x329147(0x47b)]={};const _0x1c3aca=this['tileset']();if(!_0x1c3aca)return{};const _0x1f19d7=_0x1c3aca[_0x329147(0x91e)]||'',_0x5cd51f=/<(?:TALLER|EXT|EXTEND|RAISE)[ ]BY[ ](\d+):[ ](.*)>/gi;let _0x213ef3={};const _0x589122=_0x1f19d7[_0x329147(0x345)](_0x5cd51f);if(_0x589122)for(const _0x3020bc of _0x589122){_0x3020bc[_0x329147(0x345)](_0x5cd51f);const _0x5b29a4=Number(RegExp['$1'])['clamp'](0x1,0x10),_0x33c672=String(RegExp['$2'])[_0x329147(0x79e)](',')[_0x329147(0x20b)](_0x2257fd=>Number(_0x2257fd)[_0x329147(0x266)](0x1,0x7));for(const _0x1aacf3 of _0x33c672){_0x213ef3[_0x1aacf3]=_0x5b29a4;}}this[_0x329147(0x47b)]=_0x213ef3;},Game_Map[_0x5ca092(0x923)][_0x5ca092(0x5a2)]=function(){const _0x4ccbe7=_0x5ca092;if(this[_0x4ccbe7(0x47b)]===undefined)this[_0x4ccbe7(0x829)]();return this[_0x4ccbe7(0x47b)];},Game_Map[_0x5ca092(0x923)][_0x5ca092(0x68d)]=function(_0x57fe25){const _0x59253a=_0x5ca092;if(_0x57fe25>=0x400)return![];const _0xc4e488=$gameMap[_0x59253a(0x5a2)]();if(Object['keys'](_0xc4e488)[_0x59253a(0x839)]<=0x0)return![];const _0x3db79f=this[_0x59253a(0x392)](),_0x1366d3=_0x3db79f[_0x57fe25]>>0xc,_0x47cfc8=_0xc4e488[_0x1366d3]||0x0;return _0x47cfc8>0x0;},VisuMZ['CoreEngine'][_0x5ca092(0x5ef)]=Game_Map['prototype'][_0x5ca092(0x36a)],Game_Map[_0x5ca092(0x923)][_0x5ca092(0x36a)]=function(_0xdd1564){const _0x1986a3=_0x5ca092;VisuMZ[_0x1986a3(0x865)]['Game_Map_changeTileset']['call'](this,_0xdd1564),this[_0x1986a3(0x409)](),SceneManager[_0x1986a3(0x5b6)]['_spriteset'][_0x1986a3(0x471)]();},Game_Map['prototype']['refreshSpritesetForExtendedTiles']=function(){const _0x25d58c=_0x5ca092,_0x23d195=this[_0x25d58c(0x5a2)]();if(Object[_0x25d58c(0x497)](_0x23d195)[_0x25d58c(0x839)]<=0x0)return;const _0x3badfd=SceneManager[_0x25d58c(0x5b6)][_0x25d58c(0x5ab)];_0x3badfd&&(_0x3badfd['removeTileExtendSprites']&&_0x3badfd['removeTileExtendSprites'](),_0x3badfd[_0x25d58c(0x28f)]&&_0x3badfd[_0x25d58c(0x28f)]());},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x367)]=Game_Character[_0x5ca092(0x923)][_0x5ca092(0x5ed)],Game_Character['prototype']['processMoveCommand']=function(_0x2f4c1f){const _0x51eefe=_0x5ca092;try{VisuMZ[_0x51eefe(0x865)][_0x51eefe(0x367)][_0x51eefe(0x481)](this,_0x2f4c1f);}catch(_0x50b007){if($gameTemp[_0x51eefe(0x4be)]())console[_0x51eefe(0x212)](_0x50b007);}},Game_Player[_0x5ca092(0x923)]['makeEncounterCount']=function(){const _0x1e5104=_0x5ca092,_0x39bd7a=$gameMap[_0x1e5104(0x1e3)]();this[_0x1e5104(0x290)]=Math['randomInt'](_0x39bd7a)+Math[_0x1e5104(0x2b4)](_0x39bd7a)+this[_0x1e5104(0x223)]();},Game_Player[_0x5ca092(0x923)][_0x5ca092(0x223)]=function(){const _0x2bed3e=_0x5ca092;return $dataMap&&$dataMap[_0x2bed3e(0x91e)]&&$dataMap[_0x2bed3e(0x91e)][_0x2bed3e(0x345)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ[_0x2bed3e(0x865)]['Settings'][_0x2bed3e(0x656)]['EncounterRateMinimum'];},VisuMZ[_0x5ca092(0x865)]['Game_Event_isCollidedWithEvents']=Game_Event[_0x5ca092(0x923)][_0x5ca092(0x5c4)],Game_Event[_0x5ca092(0x923)]['isCollidedWithEvents']=function(_0x25801f,_0x574f7d){const _0x4ac042=_0x5ca092;return this[_0x4ac042(0x4f7)]()?this[_0x4ac042(0x596)](_0x25801f,_0x574f7d):VisuMZ['CoreEngine'][_0x4ac042(0x746)]['call'](this,_0x25801f,_0x574f7d);},Game_Event[_0x5ca092(0x923)][_0x5ca092(0x4f7)]=function(){const _0x597525=_0x5ca092;return VisuMZ[_0x597525(0x865)][_0x597525(0x225)][_0x597525(0x656)]['SmartEventCollisionPriority'];},Game_Event[_0x5ca092(0x923)][_0x5ca092(0x596)]=function(_0x19b42a,_0x276766){const _0xde86ef=_0x5ca092;if(!this[_0xde86ef(0x90e)]())return![];else{const _0x43d8b6=$gameMap[_0xde86ef(0x969)](_0x19b42a,_0x276766)[_0xde86ef(0x4a1)](_0x23700d=>_0x23700d[_0xde86ef(0x90e)]());return _0x43d8b6['length']>0x0;}},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x1e2)]=Game_Interpreter[_0x5ca092(0x923)][_0x5ca092(0x5ad)],Game_Interpreter[_0x5ca092(0x923)][_0x5ca092(0x5ad)]=function(_0x3120a9){const _0x1f69a0=_0x5ca092,_0x34296d=this[_0x1f69a0(0x96e)]();return _0x34296d[_0x1f69a0(0x345)](/\/\/[ ]SCRIPT[ ]CALL/i)?this['runCombinedScrollingTextAsCode'](_0x34296d):VisuMZ[_0x1f69a0(0x865)][_0x1f69a0(0x1e2)]['call'](this,_0x3120a9);},Game_Interpreter[_0x5ca092(0x923)]['getCombinedScrollingText']=function(){const _0x6c9cbf=_0x5ca092;let _0x1226ae='',_0x28d8df=this['_index']+0x1;while(this[_0x6c9cbf(0x918)][_0x28d8df]&&this[_0x6c9cbf(0x918)][_0x28d8df][_0x6c9cbf(0x1d8)]===0x195){_0x1226ae+=this[_0x6c9cbf(0x918)][_0x28d8df]['parameters'][0x0]+'\x0a',_0x28d8df++;}return _0x1226ae;},Game_Interpreter[_0x5ca092(0x923)]['runCombinedScrollingTextAsCode']=function(_0x5d826a){const _0x379b05=_0x5ca092;try{eval(_0x5d826a);}catch(_0x8e4b99){$gameTemp['isPlaytest']()&&(console['log'](_0x379b05(0x66d)),console['log'](_0x8e4b99));}return!![];},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x96d)]=Game_Interpreter['prototype'][_0x5ca092(0x2eb)],Game_Interpreter[_0x5ca092(0x923)]['command111']=function(_0x56f562){const _0x26019c=_0x5ca092;try{VisuMZ['CoreEngine'][_0x26019c(0x96d)][_0x26019c(0x481)](this,_0x56f562);}catch(_0x203cf0){$gameTemp[_0x26019c(0x4be)]()&&(console['log'](_0x26019c(0x956)),console[_0x26019c(0x212)](_0x203cf0)),this[_0x26019c(0x311)]();}return!![];},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x534)]=Game_Interpreter[_0x5ca092(0x923)][_0x5ca092(0x31e)],Game_Interpreter[_0x5ca092(0x923)][_0x5ca092(0x31e)]=function(_0x15cc78){const _0x3813cb=_0x5ca092;try{VisuMZ[_0x3813cb(0x865)][_0x3813cb(0x534)][_0x3813cb(0x481)](this,_0x15cc78);}catch(_0x30cb21){$gameTemp['isPlaytest']()&&(console[_0x3813cb(0x212)](_0x3813cb(0x70f)),console[_0x3813cb(0x212)](_0x30cb21));}return!![];},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x524)]=Game_Interpreter[_0x5ca092(0x923)][_0x5ca092(0x3e2)],Game_Interpreter[_0x5ca092(0x923)][_0x5ca092(0x3e2)]=function(){const _0x41e590=_0x5ca092;try{VisuMZ[_0x41e590(0x865)]['Game_Interpreter_command355'][_0x41e590(0x481)](this);}catch(_0x553ae9){$gameTemp[_0x41e590(0x4be)]()&&(console[_0x41e590(0x212)](_0x41e590(0x8b1)),console[_0x41e590(0x212)](_0x553ae9));}return!![];},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x7f2)]=Game_Interpreter['prototype'][_0x5ca092(0x914)],Game_Interpreter[_0x5ca092(0x923)]['command357']=function(_0x56772a){const _0x5cca06=_0x5ca092;return $gameTemp[_0x5cca06(0x489)](this),VisuMZ[_0x5cca06(0x865)]['Game_Interpreter_PluginCommand'][_0x5cca06(0x481)](this,_0x56772a);},Scene_Base['prototype']['fadeSpeed']=function(){const _0xaefc2c=_0x5ca092;return VisuMZ['CoreEngine'][_0xaefc2c(0x225)]['UI'][_0xaefc2c(0x693)];},Scene_Base[_0x5ca092(0x923)]['isBottomHelpMode']=function(){const _0x20d2e9=_0x5ca092;return VisuMZ['CoreEngine']['Settings']['UI'][_0x20d2e9(0x694)];},Scene_Base[_0x5ca092(0x923)]['isBottomButtonMode']=function(){const _0x467ffb=_0x5ca092;return VisuMZ[_0x467ffb(0x865)][_0x467ffb(0x225)]['UI'][_0x467ffb(0x222)];},Scene_Base[_0x5ca092(0x923)]['isRightInputMode']=function(){const _0x30688c=_0x5ca092;return VisuMZ[_0x30688c(0x865)][_0x30688c(0x225)]['UI'][_0x30688c(0x5cf)];},Scene_Base[_0x5ca092(0x923)][_0x5ca092(0x6fd)]=function(){const _0x390ac2=_0x5ca092;return VisuMZ['CoreEngine'][_0x390ac2(0x225)]['UI']['CommandWidth'];},Scene_Base[_0x5ca092(0x923)][_0x5ca092(0x83a)]=function(){const _0x2f54c6=_0x5ca092;return VisuMZ['CoreEngine'][_0x2f54c6(0x225)]['UI'][_0x2f54c6(0x3fa)];},Scene_Base[_0x5ca092(0x923)][_0x5ca092(0x756)]=function(){const _0x22b246=_0x5ca092;return VisuMZ['CoreEngine'][_0x22b246(0x225)][_0x22b246(0x57c)][_0x22b246(0x46d)];},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x78f)]=Scene_Base[_0x5ca092(0x923)][_0x5ca092(0x55a)],Scene_Base['prototype'][_0x5ca092(0x55a)]=function(){const _0x2e8884=_0x5ca092;VisuMZ[_0x2e8884(0x865)][_0x2e8884(0x78f)][_0x2e8884(0x481)](this),this[_0x2e8884(0x6cf)](),this[_0x2e8884(0x701)](),this[_0x2e8884(0x5a4)]['x']=Math['round'](this['_windowLayer']['x']),this[_0x2e8884(0x5a4)]['y']=Math[_0x2e8884(0x75e)](this[_0x2e8884(0x5a4)]['y']);},Scene_Base[_0x5ca092(0x923)][_0x5ca092(0x6cf)]=function(){},Scene_Base[_0x5ca092(0x923)]['createTextPopupWindow']=function(){const _0x204063=_0x5ca092;this[_0x204063(0x76f)]=new Window_TextPopup(),this[_0x204063(0x61a)](this[_0x204063(0x76f)]);},$textPopup=function(_0x239f03){const _0x53f253=_0x5ca092,_0x2816a3=SceneManager['_scene'][_0x53f253(0x76f)];_0x2816a3&&_0x2816a3[_0x53f253(0x1cb)](_0x239f03);},Scene_Base[_0x5ca092(0x923)][_0x5ca092(0x546)]=function(){const _0x3d4db4=_0x5ca092;return TextManager[_0x3d4db4(0x907)]('pageup',_0x3d4db4(0x256));},Scene_Base[_0x5ca092(0x923)]['buttonAssistKey2']=function(){const _0x55ad54=_0x5ca092;return TextManager[_0x55ad54(0x3b4)](_0x55ad54(0x24a));},Scene_Base[_0x5ca092(0x923)][_0x5ca092(0x826)]=function(){const _0x3461da=_0x5ca092;return TextManager['getInputButtonString'](_0x3461da(0x906));},Scene_Base[_0x5ca092(0x923)][_0x5ca092(0x22a)]=function(){const _0x3b474b=_0x5ca092;return TextManager[_0x3b474b(0x3b4)]('ok');},Scene_Base[_0x5ca092(0x923)][_0x5ca092(0x1ef)]=function(){const _0x197558=_0x5ca092;return TextManager[_0x197558(0x3b4)](_0x197558(0x318));},Scene_Base[_0x5ca092(0x923)][_0x5ca092(0x8a7)]=function(){const _0x2f2b81=_0x5ca092;return this['_pageupButton']&&this[_0x2f2b81(0x641)][_0x2f2b81(0x577)]?TextManager[_0x2f2b81(0x8c8)]:'';},Scene_Base['prototype'][_0x5ca092(0x2f4)]=function(){return'';},Scene_Base[_0x5ca092(0x923)]['buttonAssistText3']=function(){return'';},Scene_Base['prototype']['buttonAssistText4']=function(){const _0x3e6b7a=_0x5ca092;return TextManager[_0x3e6b7a(0x3d2)];},Scene_Base[_0x5ca092(0x923)][_0x5ca092(0x460)]=function(){const _0x3220c4=_0x5ca092;return TextManager[_0x3220c4(0x35c)];},Scene_Base[_0x5ca092(0x923)][_0x5ca092(0x1d0)]=function(){return 0x0;},Scene_Base['prototype'][_0x5ca092(0x591)]=function(){return 0x0;},Scene_Base[_0x5ca092(0x923)][_0x5ca092(0x22d)]=function(){return 0x0;},Scene_Base[_0x5ca092(0x923)][_0x5ca092(0x550)]=function(){return 0x0;},Scene_Base[_0x5ca092(0x923)][_0x5ca092(0x1c5)]=function(){return 0x0;},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x573)]=Scene_Boot[_0x5ca092(0x923)]['loadSystemImages'],Scene_Boot[_0x5ca092(0x923)][_0x5ca092(0x78c)]=function(){const _0x3756de=_0x5ca092;VisuMZ[_0x3756de(0x865)]['Scene_Boot_loadSystemImages'][_0x3756de(0x481)](this),this[_0x3756de(0x71f)]();},Scene_Boot[_0x5ca092(0x923)][_0x5ca092(0x71f)]=function(){const _0x2da750=_0x5ca092,_0x533bca=[_0x2da750(0x7e7),_0x2da750(0x731),_0x2da750(0x846),'characters',_0x2da750(0x642),_0x2da750(0x423),_0x2da750(0x7da),_0x2da750(0x96b),_0x2da750(0x377),_0x2da750(0x940),_0x2da750(0x6e0),_0x2da750(0x5c3),_0x2da750(0x5d9),'titles2'];for(const _0xb8bae1 of _0x533bca){const _0x15c305=VisuMZ[_0x2da750(0x865)]['Settings'][_0x2da750(0x2bf)][_0xb8bae1],_0x5a56fb=_0x2da750(0x5dd)['format'](_0xb8bae1);for(const _0x18f6bf of _0x15c305){ImageManager[_0x2da750(0x2d6)](_0x5a56fb,_0x18f6bf);}}},VisuMZ['CoreEngine'][_0x5ca092(0x83b)]=Scene_Boot['prototype'][_0x5ca092(0x8f1)],Scene_Boot[_0x5ca092(0x923)][_0x5ca092(0x8f1)]=function(){const _0x490181=_0x5ca092;Utils[_0x490181(0x7c1)](_0x490181(0x95c))&&VisuMZ['CoreEngine'][_0x490181(0x225)][_0x490181(0x656)][_0x490181(0x84a)]?this[_0x490181(0x7b1)]():VisuMZ[_0x490181(0x865)]['Scene_Boot_startNormalGame'][_0x490181(0x481)](this);},Scene_Boot['prototype']['startAutoNewGame']=function(){const _0x318aee=_0x5ca092;this[_0x318aee(0x41b)](),DataManager[_0x318aee(0x8e3)](),SceneManager[_0x318aee(0x3f6)](Scene_Map);},Scene_Boot[_0x5ca092(0x923)][_0x5ca092(0x504)]=function(){const _0x1a47be=_0x5ca092,_0x40fe04=$dataSystem[_0x1a47be(0x7ce)][_0x1a47be(0x303)],_0x3885d4=$dataSystem[_0x1a47be(0x7ce)][_0x1a47be(0x90b)],_0x4e9fc8=VisuMZ[_0x1a47be(0x865)][_0x1a47be(0x225)]['UI']['BoxMargin'];Graphics[_0x1a47be(0x630)]=_0x40fe04-_0x4e9fc8*0x2,Graphics[_0x1a47be(0x6dc)]=_0x3885d4-_0x4e9fc8*0x2,this[_0x1a47be(0x553)]();},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x915)]=Scene_Boot[_0x5ca092(0x923)][_0x5ca092(0x40b)],Scene_Boot[_0x5ca092(0x923)]['updateDocumentTitle']=function(){const _0x4495b0=_0x5ca092;this[_0x4495b0(0x96f)]()?this[_0x4495b0(0x54a)]():VisuMZ[_0x4495b0(0x865)][_0x4495b0(0x915)][_0x4495b0(0x481)](this);},Scene_Boot[_0x5ca092(0x923)][_0x5ca092(0x96f)]=function(){const _0x36eafb=_0x5ca092;if(Scene_Title[_0x36eafb(0x824)]==='')return![];if(Scene_Title[_0x36eafb(0x824)]==='Subtitle')return![];if(Scene_Title[_0x36eafb(0x1f2)]==='')return![];if(Scene_Title['version']===_0x36eafb(0x733))return![];return!![];},Scene_Boot[_0x5ca092(0x923)][_0x5ca092(0x54a)]=function(){const _0x48b8fd=_0x5ca092,_0x2fbd70=$dataSystem[_0x48b8fd(0x473)],_0x125eb4=Scene_Title[_0x48b8fd(0x824)]||'',_0x2cdc9e=Scene_Title[_0x48b8fd(0x1f2)]||'',_0x259c34=VisuMZ[_0x48b8fd(0x865)][_0x48b8fd(0x225)]['MenuLayout'][_0x48b8fd(0x91b)][_0x48b8fd(0x439)],_0x1ea715=_0x259c34[_0x48b8fd(0x7c2)](_0x2fbd70,_0x125eb4,_0x2cdc9e);document[_0x48b8fd(0x637)]=_0x1ea715;},Scene_Boot[_0x5ca092(0x923)][_0x5ca092(0x553)]=function(){const _0x14bb04=_0x5ca092;if(VisuMZ['CoreEngine']['Settings']['UI'][_0x14bb04(0x37e)]){const _0x144f9a=Graphics[_0x14bb04(0x7b7)]-Graphics[_0x14bb04(0x630)]-VisuMZ['CoreEngine'][_0x14bb04(0x225)]['UI'][_0x14bb04(0x1d6)]*0x2,_0x4c3005=Sprite_Button['prototype'][_0x14bb04(0x216)][_0x14bb04(0x481)](this)*0x4;if(_0x144f9a>=_0x4c3005)SceneManager[_0x14bb04(0x7ef)](!![]);}},Scene_Title['subtitle']=VisuMZ[_0x5ca092(0x865)]['Settings']['MenuLayout'][_0x5ca092(0x91b)][_0x5ca092(0x73c)],Scene_Title['version']=VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x225)]['MenuLayout'][_0x5ca092(0x91b)][_0x5ca092(0x7b0)],Scene_Title['pictureButtons']=VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x225)]['TitlePicButtons'],VisuMZ[_0x5ca092(0x865)]['Scene_Title_drawGameTitle']=Scene_Title['prototype'][_0x5ca092(0x622)],Scene_Title[_0x5ca092(0x923)][_0x5ca092(0x622)]=function(){const _0x1bad43=_0x5ca092;VisuMZ['CoreEngine'][_0x1bad43(0x225)][_0x1bad43(0x2a9)][_0x1bad43(0x91b)]['drawGameTitle'][_0x1bad43(0x481)](this);if(Scene_Title[_0x1bad43(0x824)]!==''&&Scene_Title[_0x1bad43(0x824)]!==_0x1bad43(0x73c))this['drawGameSubtitle']();if(Scene_Title[_0x1bad43(0x1f2)]!==''&&Scene_Title['version']!==_0x1bad43(0x733))this[_0x1bad43(0x78d)]();},Scene_Title[_0x5ca092(0x923)][_0x5ca092(0x93f)]=function(){const _0x1b1148=_0x5ca092;VisuMZ['CoreEngine'][_0x1b1148(0x225)][_0x1b1148(0x2a9)][_0x1b1148(0x91b)][_0x1b1148(0x93f)][_0x1b1148(0x481)](this);},Scene_Title['prototype']['drawGameVersion']=function(){const _0x5b5a38=_0x5ca092;VisuMZ[_0x5b5a38(0x865)][_0x5b5a38(0x225)][_0x5b5a38(0x2a9)]['Title'][_0x5b5a38(0x78d)][_0x5b5a38(0x481)](this);},Scene_Title[_0x5ca092(0x923)][_0x5ca092(0x55d)]=function(){const _0x173132=_0x5ca092;this['createTitleButtons']();const _0xdced77=$dataSystem[_0x173132(0x1d5)][_0x173132(0x825)],_0xd94b3a=this[_0x173132(0x7cc)]();this[_0x173132(0x3e0)]=new Window_TitleCommand(_0xd94b3a),this[_0x173132(0x3e0)][_0x173132(0x484)](_0xdced77);const _0x142650=this[_0x173132(0x7cc)]();this[_0x173132(0x3e0)][_0x173132(0x41f)](_0x142650['x'],_0x142650['y'],_0x142650[_0x173132(0x7b7)],_0x142650['height']),this[_0x173132(0x3e0)][_0x173132(0x93b)](),this[_0x173132(0x3e0)]['refresh'](),this['_commandWindow'][_0x173132(0x727)](),this[_0x173132(0x7d8)](this[_0x173132(0x3e0)]);},Scene_Title[_0x5ca092(0x923)][_0x5ca092(0x6eb)]=function(){const _0x3d0a56=_0x5ca092;return this['_commandWindow']?this[_0x3d0a56(0x3e0)][_0x3d0a56(0x29c)]():VisuMZ[_0x3d0a56(0x865)][_0x3d0a56(0x225)][_0x3d0a56(0x268)][_0x3d0a56(0x839)];},Scene_Title['prototype']['commandWindowRect']=function(){const _0x2cab5d=_0x5ca092;return VisuMZ[_0x2cab5d(0x865)]['Settings'][_0x2cab5d(0x2a9)][_0x2cab5d(0x91b)][_0x2cab5d(0x978)][_0x2cab5d(0x481)](this);},Scene_Title['prototype']['createTitleButtons']=function(){const _0x18975e=_0x5ca092;for(const _0x566e66 of Scene_Title['pictureButtons']){const _0x346e04=new Sprite_TitlePictureButton(_0x566e66);this[_0x18975e(0x61a)](_0x346e04);}},VisuMZ[_0x5ca092(0x865)]['Scene_Map_initialize']=Scene_Map[_0x5ca092(0x923)][_0x5ca092(0x44e)],Scene_Map[_0x5ca092(0x923)][_0x5ca092(0x44e)]=function(){const _0x41ae0f=_0x5ca092;VisuMZ[_0x41ae0f(0x865)][_0x41ae0f(0x930)][_0x41ae0f(0x481)](this),$gameTemp[_0x41ae0f(0x312)](),this[_0x41ae0f(0x84f)]();},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x21b)]=Scene_Map[_0x5ca092(0x923)]['updateMainMultiply'],Scene_Map['prototype'][_0x5ca092(0x350)]=function(){const _0x55627e=_0x5ca092;VisuMZ[_0x55627e(0x865)]['Scene_Map_updateMainMultiply'][_0x55627e(0x481)](this),$gameTemp[_0x55627e(0x349)]&&!$gameMessage[_0x55627e(0x5b2)]()&&(this[_0x55627e(0x741)](),SceneManager[_0x55627e(0x6fb)]());},Scene_Map['prototype'][_0x5ca092(0x561)]=function(){const _0x542453=_0x5ca092;Scene_Message[_0x542453(0x923)][_0x542453(0x561)][_0x542453(0x481)](this),!SceneManager['isNextScene'](Scene_Battle)&&(this[_0x542453(0x5ab)][_0x542453(0x471)](),this[_0x542453(0x93e)][_0x542453(0x1e7)](),this[_0x542453(0x5a4)][_0x542453(0x577)]=![],SceneManager[_0x542453(0x59d)]()),$gameScreen[_0x542453(0x525)](),this['clearOnceParallelInterpreters']();},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x40d)]=Scene_Map[_0x5ca092(0x923)][_0x5ca092(0x7d5)],Scene_Map['prototype'][_0x5ca092(0x7d5)]=function(){const _0x4f45ee=_0x5ca092;VisuMZ[_0x4f45ee(0x865)][_0x4f45ee(0x40d)]['call'](this),SceneManager[_0x4f45ee(0x93a)]()&&this[_0x4f45ee(0x5e2)]();},Scene_Map[_0x5ca092(0x923)][_0x5ca092(0x5e2)]=function(){const _0x87f844=_0x5ca092;this[_0x87f844(0x4cc)]['x']=Graphics['boxWidth']+0x4;},VisuMZ[_0x5ca092(0x865)]['Scene_Map_updateScene']=Scene_Map[_0x5ca092(0x923)][_0x5ca092(0x2b9)],Scene_Map[_0x5ca092(0x923)][_0x5ca092(0x2b9)]=function(){const _0x26926c=_0x5ca092;VisuMZ['CoreEngine'][_0x26926c(0x4db)][_0x26926c(0x481)](this),this[_0x26926c(0x717)]();},Scene_Map['prototype']['updateDashToggle']=function(){const _0x6d14cb=_0x5ca092;Input[_0x6d14cb(0x6c9)](_0x6d14cb(0x8af))&&(ConfigManager[_0x6d14cb(0x2ba)]=!ConfigManager[_0x6d14cb(0x2ba)],ConfigManager['save']());},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x65b)]=Scene_Map['prototype'][_0x5ca092(0x741)],Scene_Map[_0x5ca092(0x923)]['updateMain']=function(){const _0x111b3c=_0x5ca092;VisuMZ[_0x111b3c(0x865)][_0x111b3c(0x65b)][_0x111b3c(0x481)](this),this[_0x111b3c(0x33e)]();},Scene_Map[_0x5ca092(0x923)][_0x5ca092(0x84f)]=function(){const _0x2c84d7=_0x5ca092;this[_0x2c84d7(0x679)]=[];},Scene_Map[_0x5ca092(0x923)]['updateOnceParallelInterpreters']=function(){const _0x1abbb4=_0x5ca092;if(!this[_0x1abbb4(0x679)])return;for(const _0x56aa3b of this[_0x1abbb4(0x679)]){_0x56aa3b&&_0x56aa3b['update']();}},Scene_Map[_0x5ca092(0x923)]['playOnceParallelInterpreter']=function(_0x53e58c,_0x4d4a10){const _0x18d0a5=_0x5ca092,_0x2882aa=$dataCommonEvents[_0x53e58c];if(!_0x2882aa)return;const _0x1bfdf7=new Game_OnceParallelInterpreter();this[_0x18d0a5(0x338)](_0x1bfdf7),_0x1bfdf7[_0x18d0a5(0x75b)](_0x53e58c),_0x1bfdf7[_0x18d0a5(0x80c)](_0x4d4a10);},Scene_Map[_0x5ca092(0x923)][_0x5ca092(0x338)]=function(_0x266153){const _0x45c72d=_0x5ca092;this[_0x45c72d(0x679)]=this[_0x45c72d(0x679)]||[],this[_0x45c72d(0x679)][_0x45c72d(0x4a2)](_0x266153);},Scene_Map[_0x5ca092(0x923)]['removeOnceParallelInterpreter']=function(_0x523fa1){const _0x218ec4=_0x5ca092;this[_0x218ec4(0x679)]=this[_0x218ec4(0x679)]||[],this[_0x218ec4(0x679)][_0x218ec4(0x912)](_0x523fa1);};function Game_OnceParallelInterpreter(){const _0x430b12=_0x5ca092;this[_0x430b12(0x44e)](...arguments);}Game_OnceParallelInterpreter[_0x5ca092(0x923)]=Object['create'](Game_Interpreter[_0x5ca092(0x923)]),Game_OnceParallelInterpreter[_0x5ca092(0x923)][_0x5ca092(0x2bb)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter[_0x5ca092(0x923)]['setCommonEvent']=function(_0x136cbe){const _0x6e1644=_0x5ca092,_0x40843b=$dataCommonEvents[_0x136cbe];_0x40843b?this['setup'](_0x40843b[_0x6e1644(0x683)],0x0):this[_0x6e1644(0x561)]();},Game_OnceParallelInterpreter[_0x5ca092(0x923)][_0x5ca092(0x80c)]=function(_0xa0d853){const _0x70d4d6=_0x5ca092;this[_0x70d4d6(0x23b)]=_0xa0d853||0x0;},Game_OnceParallelInterpreter[_0x5ca092(0x923)][_0x5ca092(0x561)]=function(){const _0x572e24=_0x5ca092;if(!SceneManager['isSceneMap']())return;SceneManager[_0x572e24(0x5b6)]['removeOnceParallelInterpreter'](this),Game_Interpreter[_0x572e24(0x923)][_0x572e24(0x561)][_0x572e24(0x481)](this);},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x306)]=Scene_MenuBase[_0x5ca092(0x923)][_0x5ca092(0x576)],Scene_MenuBase[_0x5ca092(0x923)]['helpAreaTop']=function(){const _0x386ba9=_0x5ca092;let _0x1c73ed=0x0;return SceneManager[_0x386ba9(0x6af)]()?_0x1c73ed=this[_0x386ba9(0x4f5)]():_0x1c73ed=VisuMZ[_0x386ba9(0x865)][_0x386ba9(0x306)][_0x386ba9(0x481)](this),_0x1c73ed;},Scene_MenuBase['prototype'][_0x5ca092(0x4f5)]=function(){const _0x425c77=_0x5ca092;return this[_0x425c77(0x1cc)]()?this[_0x425c77(0x4ae)]():0x0;},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x4b4)]=Scene_MenuBase[_0x5ca092(0x923)][_0x5ca092(0x943)],Scene_MenuBase['prototype'][_0x5ca092(0x943)]=function(){const _0x4e58eb=_0x5ca092;return SceneManager['areButtonsOutsideMainUI']()?this[_0x4e58eb(0x5f2)]():VisuMZ['CoreEngine'][_0x4e58eb(0x4b4)][_0x4e58eb(0x481)](this);},Scene_MenuBase[_0x5ca092(0x923)][_0x5ca092(0x5f2)]=function(){const _0x1343b5=_0x5ca092;if(!this[_0x1343b5(0x1cc)]())return this[_0x1343b5(0x7c5)]();else return this[_0x1343b5(0x74d)]()&&this[_0x1343b5(0x63a)]()===_0x1343b5(0x813)?Window_ButtonAssist['prototype']['lineHeight']():0x0;},VisuMZ[_0x5ca092(0x865)]['Scene_MenuBase_mainAreaHeight']=Scene_MenuBase[_0x5ca092(0x923)][_0x5ca092(0x5e6)],Scene_MenuBase[_0x5ca092(0x923)][_0x5ca092(0x5e6)]=function(){const _0x26c086=_0x5ca092;let _0x15e1b7=0x0;return SceneManager[_0x26c086(0x6af)]()?_0x15e1b7=this['mainAreaHeightSideButtonLayout']():_0x15e1b7=VisuMZ[_0x26c086(0x865)]['Scene_MenuBase_mainAreaHeight'][_0x26c086(0x481)](this),this['isMenuButtonAssistEnabled']()&&this[_0x26c086(0x63a)]()!==_0x26c086(0x245)&&(_0x15e1b7-=Window_ButtonAssist[_0x26c086(0x923)][_0x26c086(0x2f6)]()),_0x15e1b7;},Scene_MenuBase['prototype'][_0x5ca092(0x7dd)]=function(){const _0x3b8b6f=_0x5ca092;return Graphics['boxHeight']-this[_0x3b8b6f(0x56e)]();},VisuMZ[_0x5ca092(0x865)]['Scene_MenuBase_createBackground']=Scene_MenuBase[_0x5ca092(0x923)][_0x5ca092(0x560)],Scene_MenuBase['prototype'][_0x5ca092(0x560)]=function(){const _0x26f727=_0x5ca092,_0x3e9c49=VisuMZ[_0x26f727(0x865)][_0x26f727(0x225)]['MenuBg']['BlurStrength']??0x8;this[_0x26f727(0x6e1)]=new PIXI[(_0x26f727(0x28d))]['BlurFilter'](_0x3e9c49),this[_0x26f727(0x955)]=new Sprite(),this['_backgroundSprite'][_0x26f727(0x625)]=SceneManager[_0x26f727(0x1fb)](),this[_0x26f727(0x955)][_0x26f727(0x28d)]=[this['_backgroundFilter']],this['addChild'](this[_0x26f727(0x955)]),this[_0x26f727(0x331)](0xc0),this[_0x26f727(0x331)](this[_0x26f727(0x797)]()),this['createCustomBackgroundImages']();},Scene_MenuBase[_0x5ca092(0x923)]['getBackgroundOpacity']=function(){const _0x45a753=_0x5ca092,_0x541ee5=String(this[_0x45a753(0x2bb)][_0x45a753(0x7a5)]),_0x3d77ac=this[_0x45a753(0x3d9)](_0x541ee5);return _0x3d77ac?_0x3d77ac[_0x45a753(0x4c8)]:0xc0;},Scene_MenuBase[_0x5ca092(0x923)][_0x5ca092(0x4b5)]=function(){const _0xb97623=_0x5ca092,_0x5204b6=String(this[_0xb97623(0x2bb)]['name']),_0x1ef755=this['getCustomBackgroundSettings'](_0x5204b6);_0x1ef755&&(_0x1ef755[_0xb97623(0x44a)]!==''||_0x1ef755[_0xb97623(0x75d)]!=='')&&(this['_backSprite1']=new Sprite(ImageManager[_0xb97623(0x329)](_0x1ef755[_0xb97623(0x44a)])),this[_0xb97623(0x3eb)]=new Sprite(ImageManager[_0xb97623(0x23e)](_0x1ef755['BgFilename2'])),this[_0xb97623(0x61a)](this['_backSprite1']),this[_0xb97623(0x61a)](this[_0xb97623(0x3eb)]),this[_0xb97623(0x2fb)]['bitmap'][_0xb97623(0x974)](this[_0xb97623(0x63b)][_0xb97623(0x2da)](this,this[_0xb97623(0x2fb)])),this['_backSprite2']['bitmap'][_0xb97623(0x974)](this['adjustSprite'][_0xb97623(0x2da)](this,this[_0xb97623(0x3eb)])));},Scene_MenuBase[_0x5ca092(0x923)][_0x5ca092(0x3d9)]=function(_0x51dd42){const _0x5580f2=_0x5ca092;return VisuMZ[_0x5580f2(0x865)]['Settings'][_0x5580f2(0x7f6)][_0x51dd42]||VisuMZ['CoreEngine'][_0x5580f2(0x225)][_0x5580f2(0x7f6)]['Scene_Unlisted'];},Scene_MenuBase[_0x5ca092(0x923)][_0x5ca092(0x63b)]=function(_0x3fdca7){const _0x2552f2=_0x5ca092;this[_0x2552f2(0x889)](_0x3fdca7),this[_0x2552f2(0x697)](_0x3fdca7);},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x7ac)]=Scene_MenuBase['prototype'][_0x5ca092(0x732)],Scene_MenuBase[_0x5ca092(0x923)]['createCancelButton']=function(){const _0x387aab=_0x5ca092;VisuMZ[_0x387aab(0x865)][_0x387aab(0x7ac)][_0x387aab(0x481)](this),SceneManager[_0x387aab(0x93a)]()&&this[_0x387aab(0x703)]();},Scene_MenuBase[_0x5ca092(0x923)][_0x5ca092(0x703)]=function(){const _0x492ca9=_0x5ca092;this['_cancelButton']['x']=Graphics[_0x492ca9(0x630)]+0x4;},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x523)]=Scene_MenuBase[_0x5ca092(0x923)][_0x5ca092(0x700)],Scene_MenuBase['prototype'][_0x5ca092(0x700)]=function(){const _0x34f486=_0x5ca092;VisuMZ[_0x34f486(0x865)][_0x34f486(0x523)][_0x34f486(0x481)](this),SceneManager[_0x34f486(0x93a)]()&&this[_0x34f486(0x57b)]();},Scene_MenuBase['prototype'][_0x5ca092(0x57b)]=function(){const _0x377d66=_0x5ca092;this[_0x377d66(0x641)]['x']=-0x1*(this[_0x377d66(0x641)][_0x377d66(0x7b7)]+this[_0x377d66(0x281)][_0x377d66(0x7b7)]+0x8),this[_0x377d66(0x281)]['x']=-0x1*(this[_0x377d66(0x281)]['width']+0x4);},Scene_MenuBase['prototype'][_0x5ca092(0x74d)]=function(){const _0x2fefb2=_0x5ca092;return VisuMZ[_0x2fefb2(0x865)][_0x2fefb2(0x225)]['ButtonAssist'][_0x2fefb2(0x279)];},Scene_MenuBase[_0x5ca092(0x923)][_0x5ca092(0x63a)]=function(){const _0x169988=_0x5ca092;return SceneManager[_0x169988(0x93a)]()||SceneManager['areButtonsHidden']()?VisuMZ[_0x169988(0x865)][_0x169988(0x225)][_0x169988(0x2d4)]['Location']:'button';},Scene_MenuBase[_0x5ca092(0x923)][_0x5ca092(0x6cf)]=function(){const _0x73e2df=_0x5ca092;if(!this[_0x73e2df(0x74d)]())return;const _0x205a16=this[_0x73e2df(0x910)]();this[_0x73e2df(0x71b)]=new Window_ButtonAssist(_0x205a16),this[_0x73e2df(0x7d8)](this[_0x73e2df(0x71b)]);},Scene_MenuBase['prototype'][_0x5ca092(0x910)]=function(){const _0x1f011f=_0x5ca092;return this[_0x1f011f(0x63a)]()==='button'?this[_0x1f011f(0x492)]():this[_0x1f011f(0x4e3)]();},Scene_MenuBase[_0x5ca092(0x923)][_0x5ca092(0x492)]=function(){const _0x3ce19f=_0x5ca092,_0x3118ee=ConfigManager[_0x3ce19f(0x260)]?(Sprite_Button[_0x3ce19f(0x923)]['blockWidth']()+0x6)*0x2:0x0,_0x38f395=this[_0x3ce19f(0x4b6)](),_0x35cc5e=Graphics[_0x3ce19f(0x630)]-_0x3118ee*0x2,_0x2190f2=this[_0x3ce19f(0x83a)]();return new Rectangle(_0x3118ee,_0x38f395,_0x35cc5e,_0x2190f2);},Scene_MenuBase[_0x5ca092(0x923)][_0x5ca092(0x4e3)]=function(){const _0x1b45ff=_0x5ca092,_0x558c63=Graphics['boxWidth'],_0xc63a53=Window_ButtonAssist[_0x1b45ff(0x923)][_0x1b45ff(0x2f6)](),_0x33de1c=0x0;let _0x235a01=0x0;return this[_0x1b45ff(0x63a)]()===_0x1b45ff(0x813)?_0x235a01=0x0:_0x235a01=Graphics[_0x1b45ff(0x6dc)]-_0xc63a53,new Rectangle(_0x33de1c,_0x235a01,_0x558c63,_0xc63a53);},Scene_Menu['layoutSettings']=VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x225)][_0x5ca092(0x2a9)]['MainMenu'],VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x7cf)]=Scene_Menu[_0x5ca092(0x923)]['create'],Scene_Menu[_0x5ca092(0x923)][_0x5ca092(0x49a)]=function(){const _0x3d6ae0=_0x5ca092;VisuMZ['CoreEngine'][_0x3d6ae0(0x7cf)][_0x3d6ae0(0x481)](this),this[_0x3d6ae0(0x88b)]();},Scene_Menu['prototype'][_0x5ca092(0x88b)]=function(){const _0x3eb77c=_0x5ca092;this[_0x3eb77c(0x3e0)]&&this[_0x3eb77c(0x3e0)][_0x3eb77c(0x484)](Scene_Menu[_0x3eb77c(0x362)][_0x3eb77c(0x4f6)]),this[_0x3eb77c(0x297)]&&this[_0x3eb77c(0x297)][_0x3eb77c(0x484)](Scene_Menu[_0x3eb77c(0x362)][_0x3eb77c(0x21f)]),this[_0x3eb77c(0x5fa)]&&this['_statusWindow'][_0x3eb77c(0x484)](Scene_Menu[_0x3eb77c(0x362)][_0x3eb77c(0x2ea)]);},Scene_Menu[_0x5ca092(0x923)]['commandWindowRect']=function(){const _0x4f278e=_0x5ca092;return Scene_Menu['layoutSettings'][_0x4f278e(0x978)][_0x4f278e(0x481)](this);},Scene_Menu[_0x5ca092(0x923)]['goldWindowRect']=function(){const _0x5bdf6f=_0x5ca092;return Scene_Menu[_0x5bdf6f(0x362)][_0x5bdf6f(0x369)]['call'](this);},Scene_Menu[_0x5ca092(0x923)][_0x5ca092(0x1f7)]=function(){const _0x2685b9=_0x5ca092;return Scene_Menu[_0x2685b9(0x362)][_0x2685b9(0x54b)][_0x2685b9(0x481)](this);},Scene_Item[_0x5ca092(0x362)]=VisuMZ[_0x5ca092(0x865)]['Settings'][_0x5ca092(0x2a9)][_0x5ca092(0x8d9)],VisuMZ[_0x5ca092(0x865)]['Scene_Item_create']=Scene_Item[_0x5ca092(0x923)][_0x5ca092(0x49a)],Scene_Item[_0x5ca092(0x923)]['create']=function(){const _0x30804c=_0x5ca092;VisuMZ['CoreEngine'][_0x30804c(0x3de)][_0x30804c(0x481)](this),this[_0x30804c(0x88b)]();},Scene_Item[_0x5ca092(0x923)]['setCoreEngineUpdateWindowBg']=function(){const _0x1f0bad=_0x5ca092;this['_helpWindow']&&this[_0x1f0bad(0x2de)][_0x1f0bad(0x484)](Scene_Item[_0x1f0bad(0x362)][_0x1f0bad(0x344)]),this['_categoryWindow']&&this[_0x1f0bad(0x24c)]['setBackgroundType'](Scene_Item[_0x1f0bad(0x362)]['CategoryBgType']),this[_0x1f0bad(0x316)]&&this[_0x1f0bad(0x316)][_0x1f0bad(0x484)](Scene_Item[_0x1f0bad(0x362)][_0x1f0bad(0x459)]),this[_0x1f0bad(0x592)]&&this[_0x1f0bad(0x592)][_0x1f0bad(0x484)](Scene_Item[_0x1f0bad(0x362)][_0x1f0bad(0x55b)]);},Scene_Item['prototype']['helpWindowRect']=function(){const _0x7b0b71=_0x5ca092;return Scene_Item[_0x7b0b71(0x362)]['HelpRect']['call'](this);},Scene_Item[_0x5ca092(0x923)]['categoryWindowRect']=function(){const _0x5b1c04=_0x5ca092;return Scene_Item[_0x5b1c04(0x362)][_0x5b1c04(0x896)]['call'](this);},Scene_Item['prototype']['itemWindowRect']=function(){const _0x3b5595=_0x5ca092;return Scene_Item[_0x3b5595(0x362)]['ItemRect'][_0x3b5595(0x481)](this);},Scene_Item[_0x5ca092(0x923)]['actorWindowRect']=function(){const _0x614b3a=_0x5ca092;return Scene_Item[_0x614b3a(0x362)][_0x614b3a(0x4cf)][_0x614b3a(0x481)](this);},Scene_Skill[_0x5ca092(0x362)]=VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x225)][_0x5ca092(0x2a9)]['SkillMenu'],VisuMZ['CoreEngine']['Scene_Skill_create']=Scene_Skill[_0x5ca092(0x923)][_0x5ca092(0x49a)],Scene_Skill[_0x5ca092(0x923)][_0x5ca092(0x49a)]=function(){const _0x38573e=_0x5ca092;VisuMZ['CoreEngine'][_0x38573e(0x767)]['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Skill[_0x5ca092(0x923)][_0x5ca092(0x88b)]=function(){const _0x2db5d0=_0x5ca092;this[_0x2db5d0(0x2de)]&&this['_helpWindow'][_0x2db5d0(0x484)](Scene_Skill['layoutSettings'][_0x2db5d0(0x344)]),this[_0x2db5d0(0x595)]&&this[_0x2db5d0(0x595)][_0x2db5d0(0x484)](Scene_Skill[_0x2db5d0(0x362)][_0x2db5d0(0x75a)]),this[_0x2db5d0(0x5fa)]&&this[_0x2db5d0(0x5fa)][_0x2db5d0(0x484)](Scene_Skill['layoutSettings'][_0x2db5d0(0x2ea)]),this[_0x2db5d0(0x316)]&&this[_0x2db5d0(0x316)][_0x2db5d0(0x484)](Scene_Skill[_0x2db5d0(0x362)][_0x2db5d0(0x459)]),this[_0x2db5d0(0x592)]&&this['_actorWindow'][_0x2db5d0(0x484)](Scene_Skill[_0x2db5d0(0x362)][_0x2db5d0(0x55b)]);},Scene_Skill[_0x5ca092(0x923)][_0x5ca092(0x8ee)]=function(){const _0x55f4ce=_0x5ca092;return Scene_Skill[_0x55f4ce(0x362)][_0x55f4ce(0x83e)]['call'](this);},Scene_Skill['prototype'][_0x5ca092(0x7f3)]=function(){const _0x562e60=_0x5ca092;return Scene_Skill['layoutSettings']['SkillTypeRect'][_0x562e60(0x481)](this);},Scene_Skill[_0x5ca092(0x923)]['statusWindowRect']=function(){const _0x14189f=_0x5ca092;return Scene_Skill[_0x14189f(0x362)][_0x14189f(0x54b)][_0x14189f(0x481)](this);},Scene_Skill[_0x5ca092(0x923)][_0x5ca092(0x211)]=function(){const _0x555d79=_0x5ca092;return Scene_Skill[_0x555d79(0x362)][_0x555d79(0x704)]['call'](this);},Scene_Skill[_0x5ca092(0x923)][_0x5ca092(0x23c)]=function(){const _0x5eb4d7=_0x5ca092;return Scene_Skill[_0x5eb4d7(0x362)][_0x5eb4d7(0x4cf)]['call'](this);},Scene_Equip[_0x5ca092(0x362)]=VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x225)][_0x5ca092(0x2a9)][_0x5ca092(0x231)],VisuMZ['CoreEngine'][_0x5ca092(0x25b)]=Scene_Equip[_0x5ca092(0x923)][_0x5ca092(0x49a)],Scene_Equip[_0x5ca092(0x923)][_0x5ca092(0x49a)]=function(){const _0x1690c5=_0x5ca092;VisuMZ[_0x1690c5(0x865)][_0x1690c5(0x25b)][_0x1690c5(0x481)](this),this[_0x1690c5(0x88b)]();},Scene_Equip['prototype'][_0x5ca092(0x88b)]=function(){const _0x2cf811=_0x5ca092;this[_0x2cf811(0x2de)]&&this[_0x2cf811(0x2de)][_0x2cf811(0x484)](Scene_Equip[_0x2cf811(0x362)]['HelpBgType']),this[_0x2cf811(0x5fa)]&&this[_0x2cf811(0x5fa)][_0x2cf811(0x484)](Scene_Equip[_0x2cf811(0x362)][_0x2cf811(0x2ea)]),this[_0x2cf811(0x3e0)]&&this[_0x2cf811(0x3e0)][_0x2cf811(0x484)](Scene_Equip[_0x2cf811(0x362)][_0x2cf811(0x4f6)]),this[_0x2cf811(0x8c4)]&&this[_0x2cf811(0x8c4)]['setBackgroundType'](Scene_Equip[_0x2cf811(0x362)][_0x2cf811(0x2a2)]),this[_0x2cf811(0x316)]&&this[_0x2cf811(0x316)][_0x2cf811(0x484)](Scene_Equip[_0x2cf811(0x362)][_0x2cf811(0x459)]);},Scene_Equip[_0x5ca092(0x923)][_0x5ca092(0x8ee)]=function(){const _0x221efe=_0x5ca092;return Scene_Equip[_0x221efe(0x362)][_0x221efe(0x83e)]['call'](this);},Scene_Equip[_0x5ca092(0x923)]['statusWindowRect']=function(){const _0x62ff8c=_0x5ca092;return Scene_Equip[_0x62ff8c(0x362)]['StatusRect'][_0x62ff8c(0x481)](this);},Scene_Equip[_0x5ca092(0x923)][_0x5ca092(0x7cc)]=function(){const _0x3f7ded=_0x5ca092;return Scene_Equip[_0x3f7ded(0x362)][_0x3f7ded(0x978)][_0x3f7ded(0x481)](this);},Scene_Equip['prototype'][_0x5ca092(0x7a4)]=function(){return Scene_Equip['layoutSettings']['SlotRect']['call'](this);},Scene_Equip[_0x5ca092(0x923)][_0x5ca092(0x211)]=function(){const _0x5ca281=_0x5ca092;return Scene_Equip['layoutSettings'][_0x5ca281(0x704)][_0x5ca281(0x481)](this);},Scene_Status[_0x5ca092(0x362)]=VisuMZ['CoreEngine'][_0x5ca092(0x225)]['MenuLayout'][_0x5ca092(0x340)],VisuMZ['CoreEngine']['Scene_Status_create']=Scene_Status[_0x5ca092(0x923)]['create'],Scene_Status['prototype'][_0x5ca092(0x49a)]=function(){const _0xf94fa1=_0x5ca092;VisuMZ[_0xf94fa1(0x865)][_0xf94fa1(0x671)]['call'](this),this[_0xf94fa1(0x88b)]();},Scene_Status['prototype'][_0x5ca092(0x88b)]=function(){const _0x2f473e=_0x5ca092;this[_0x2f473e(0x8cb)]&&this[_0x2f473e(0x8cb)][_0x2f473e(0x484)](Scene_Status[_0x2f473e(0x362)][_0x2f473e(0x283)]),this[_0x2f473e(0x5fa)]&&this[_0x2f473e(0x5fa)][_0x2f473e(0x484)](Scene_Status['layoutSettings'][_0x2f473e(0x2ea)]),this[_0x2f473e(0x665)]&&this['_statusParamsWindow']['setBackgroundType'](Scene_Status[_0x2f473e(0x362)]['StatusParamsBgType']),this[_0x2f473e(0x56d)]&&this[_0x2f473e(0x56d)][_0x2f473e(0x484)](Scene_Status[_0x2f473e(0x362)]['StatusEquipBgType']);},Scene_Status[_0x5ca092(0x923)]['profileWindowRect']=function(){const _0x5f196f=_0x5ca092;return Scene_Status[_0x5f196f(0x362)][_0x5f196f(0x4e7)][_0x5f196f(0x481)](this);},Scene_Status[_0x5ca092(0x923)]['statusWindowRect']=function(){const _0x416ddf=_0x5ca092;return Scene_Status['layoutSettings'][_0x416ddf(0x54b)]['call'](this);},Scene_Status[_0x5ca092(0x923)][_0x5ca092(0x3ef)]=function(){const _0x59f574=_0x5ca092;return Scene_Status[_0x59f574(0x362)][_0x59f574(0x834)][_0x59f574(0x481)](this);},Scene_Status[_0x5ca092(0x923)][_0x5ca092(0x5fd)]=function(){const _0xf0ddbb=_0x5ca092;return Scene_Status[_0xf0ddbb(0x362)][_0xf0ddbb(0x7e5)][_0xf0ddbb(0x481)](this);},Scene_Options['layoutSettings']=VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x225)]['MenuLayout'][_0x5ca092(0x872)],VisuMZ['CoreEngine'][_0x5ca092(0x373)]=Scene_Options[_0x5ca092(0x923)][_0x5ca092(0x49a)],Scene_Options[_0x5ca092(0x923)][_0x5ca092(0x49a)]=function(){const _0x2cc487=_0x5ca092;VisuMZ[_0x2cc487(0x865)][_0x2cc487(0x373)]['call'](this),this[_0x2cc487(0x88b)]();},Scene_Options[_0x5ca092(0x923)][_0x5ca092(0x88b)]=function(){const _0x1e4b14=_0x5ca092;this[_0x1e4b14(0x6a0)]&&this['_optionsWindow'][_0x1e4b14(0x484)](Scene_Options[_0x1e4b14(0x362)][_0x1e4b14(0x784)]);},Scene_Options[_0x5ca092(0x923)][_0x5ca092(0x1ee)]=function(){const _0x2cb797=_0x5ca092;return Scene_Options['layoutSettings']['OptionsRect'][_0x2cb797(0x481)](this);},Scene_Save[_0x5ca092(0x362)]=VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x225)]['MenuLayout']['SaveMenu'],Scene_Save[_0x5ca092(0x923)][_0x5ca092(0x49a)]=function(){const _0x40c34c=_0x5ca092;Scene_File[_0x40c34c(0x923)][_0x40c34c(0x49a)][_0x40c34c(0x481)](this),this[_0x40c34c(0x88b)]();},Scene_Save[_0x5ca092(0x923)][_0x5ca092(0x88b)]=function(){const _0x4ac342=_0x5ca092;this[_0x4ac342(0x2de)]&&this[_0x4ac342(0x2de)][_0x4ac342(0x484)](Scene_Save[_0x4ac342(0x362)][_0x4ac342(0x344)]),this[_0x4ac342(0x3d8)]&&this['_listWindow']['setBackgroundType'](Scene_Save['layoutSettings'][_0x4ac342(0x4ca)]);},Scene_Save[_0x5ca092(0x923)][_0x5ca092(0x8ee)]=function(){const _0x2ea715=_0x5ca092;return Scene_Save[_0x2ea715(0x362)]['HelpRect']['call'](this);},Scene_Save['prototype'][_0x5ca092(0x61d)]=function(){const _0x4458a2=_0x5ca092;return Scene_Save[_0x4458a2(0x362)][_0x4458a2(0x491)]['call'](this);},Scene_Load[_0x5ca092(0x362)]=VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x225)]['MenuLayout'][_0x5ca092(0x2d9)],Scene_Load['prototype'][_0x5ca092(0x49a)]=function(){const _0x55488a=_0x5ca092;Scene_File[_0x55488a(0x923)]['create'][_0x55488a(0x481)](this),this[_0x55488a(0x88b)]();},Scene_Load['prototype'][_0x5ca092(0x88b)]=function(){const _0x147591=_0x5ca092;this[_0x147591(0x2de)]&&this['_helpWindow']['setBackgroundType'](Scene_Load['layoutSettings'][_0x147591(0x344)]),this[_0x147591(0x3d8)]&&this[_0x147591(0x3d8)]['setBackgroundType'](Scene_Load[_0x147591(0x362)][_0x147591(0x4ca)]);},Scene_Load[_0x5ca092(0x923)][_0x5ca092(0x8ee)]=function(){const _0x18665c=_0x5ca092;return Scene_Load[_0x18665c(0x362)][_0x18665c(0x83e)][_0x18665c(0x481)](this);},Scene_Load['prototype'][_0x5ca092(0x61d)]=function(){const _0x4c1681=_0x5ca092;return Scene_Load[_0x4c1681(0x362)][_0x4c1681(0x491)][_0x4c1681(0x481)](this);};function Scene_QuickLoad(){const _0x3a16d3=_0x5ca092;this[_0x3a16d3(0x44e)](...arguments);}Scene_QuickLoad[_0x5ca092(0x923)]=Object[_0x5ca092(0x49a)](Scene_Load[_0x5ca092(0x923)]),Scene_QuickLoad[_0x5ca092(0x923)]['constructor']=Scene_QuickLoad,Scene_QuickLoad[_0x5ca092(0x923)][_0x5ca092(0x44e)]=function(){const _0x22088b=_0x5ca092;Scene_Load['prototype']['initialize'][_0x22088b(0x481)](this);},Scene_QuickLoad[_0x5ca092(0x923)][_0x5ca092(0x49a)]=function(){const _0x1ab994=_0x5ca092;this[_0x1ab994(0x354)](this[_0x1ab994(0x957)]);},Scene_QuickLoad[_0x5ca092(0x923)][_0x5ca092(0x92c)]=function(_0x3b2633){const _0x48a494=_0x5ca092;this[_0x48a494(0x957)]=_0x3b2633;},Scene_QuickLoad[_0x5ca092(0x923)][_0x5ca092(0x412)]=function(){const _0x195f95=_0x5ca092;Scene_MenuBase[_0x195f95(0x923)]['start']['call'](this);},Scene_GameEnd[_0x5ca092(0x362)]=VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x225)][_0x5ca092(0x2a9)]['GameEnd'],VisuMZ[_0x5ca092(0x865)]['Scene_GameEnd_createBackground']=Scene_GameEnd[_0x5ca092(0x923)]['createBackground'],Scene_GameEnd[_0x5ca092(0x923)][_0x5ca092(0x560)]=function(){const _0xbbef2c=_0x5ca092;Scene_MenuBase[_0xbbef2c(0x923)][_0xbbef2c(0x560)][_0xbbef2c(0x481)](this);},Scene_GameEnd[_0x5ca092(0x923)][_0x5ca092(0x55d)]=function(){const _0x2bd23e=_0x5ca092,_0x5e0528=this[_0x2bd23e(0x7cc)]();this[_0x2bd23e(0x3e0)]=new Window_GameEnd(_0x5e0528),this[_0x2bd23e(0x3e0)][_0x2bd23e(0x379)](_0x2bd23e(0x318),this[_0x2bd23e(0x2db)][_0x2bd23e(0x2da)](this)),this[_0x2bd23e(0x7d8)](this[_0x2bd23e(0x3e0)]),this[_0x2bd23e(0x3e0)][_0x2bd23e(0x484)](Scene_GameEnd[_0x2bd23e(0x362)]['CommandBgType']);},Scene_GameEnd[_0x5ca092(0x923)][_0x5ca092(0x7cc)]=function(){const _0xdfc859=_0x5ca092;return Scene_GameEnd[_0xdfc859(0x362)][_0xdfc859(0x978)][_0xdfc859(0x481)](this);},Scene_Shop[_0x5ca092(0x362)]=VisuMZ['CoreEngine'][_0x5ca092(0x225)]['MenuLayout']['ShopMenu'],VisuMZ[_0x5ca092(0x865)]['Scene_Shop_create']=Scene_Shop[_0x5ca092(0x923)][_0x5ca092(0x49a)],Scene_Shop['prototype'][_0x5ca092(0x49a)]=function(){const _0x20768d=_0x5ca092;VisuMZ['CoreEngine'][_0x20768d(0x7ba)]['call'](this),this[_0x20768d(0x88b)]();},Scene_Shop[_0x5ca092(0x923)][_0x5ca092(0x88b)]=function(){const _0x1c0fce=_0x5ca092;this[_0x1c0fce(0x2de)]&&this['_helpWindow'][_0x1c0fce(0x484)](Scene_Shop['layoutSettings'][_0x1c0fce(0x344)]),this[_0x1c0fce(0x297)]&&this[_0x1c0fce(0x297)][_0x1c0fce(0x484)](Scene_Shop['layoutSettings']['GoldBgType']),this[_0x1c0fce(0x3e0)]&&this['_commandWindow'][_0x1c0fce(0x484)](Scene_Shop[_0x1c0fce(0x362)][_0x1c0fce(0x4f6)]),this['_dummyWindow']&&this[_0x1c0fce(0x3e9)][_0x1c0fce(0x484)](Scene_Shop[_0x1c0fce(0x362)][_0x1c0fce(0x41a)]),this[_0x1c0fce(0x725)]&&this[_0x1c0fce(0x725)]['setBackgroundType'](Scene_Shop[_0x1c0fce(0x362)]['NumberBgType']),this['_statusWindow']&&this[_0x1c0fce(0x5fa)]['setBackgroundType'](Scene_Shop[_0x1c0fce(0x362)][_0x1c0fce(0x2ea)]),this['_buyWindow']&&this[_0x1c0fce(0x68a)][_0x1c0fce(0x484)](Scene_Shop[_0x1c0fce(0x362)][_0x1c0fce(0x8f0)]),this['_categoryWindow']&&this[_0x1c0fce(0x24c)][_0x1c0fce(0x484)](Scene_Shop[_0x1c0fce(0x362)][_0x1c0fce(0x7f0)]),this['_sellWindow']&&this[_0x1c0fce(0x5b8)]['setBackgroundType'](Scene_Shop[_0x1c0fce(0x362)][_0x1c0fce(0x3e1)]);},Scene_Shop[_0x5ca092(0x923)]['helpWindowRect']=function(){const _0x4dbe1a=_0x5ca092;return Scene_Shop['layoutSettings'][_0x4dbe1a(0x83e)][_0x4dbe1a(0x481)](this);},Scene_Shop['prototype'][_0x5ca092(0x27b)]=function(){const _0x5ce626=_0x5ca092;return Scene_Shop[_0x5ce626(0x362)][_0x5ce626(0x369)][_0x5ce626(0x481)](this);},Scene_Shop[_0x5ca092(0x923)][_0x5ca092(0x7cc)]=function(){const _0x5083cf=_0x5ca092;return Scene_Shop[_0x5083cf(0x362)][_0x5083cf(0x978)][_0x5083cf(0x481)](this);},Scene_Shop[_0x5ca092(0x923)][_0x5ca092(0x959)]=function(){const _0x4fe6e8=_0x5ca092;return Scene_Shop['layoutSettings'][_0x4fe6e8(0x81c)]['call'](this);},Scene_Shop[_0x5ca092(0x923)]['numberWindowRect']=function(){const _0x1e11f3=_0x5ca092;return Scene_Shop[_0x1e11f3(0x362)][_0x1e11f3(0x348)][_0x1e11f3(0x481)](this);},Scene_Shop[_0x5ca092(0x923)]['statusWindowRect']=function(){const _0x3d4011=_0x5ca092;return Scene_Shop[_0x3d4011(0x362)][_0x3d4011(0x54b)][_0x3d4011(0x481)](this);},Scene_Shop[_0x5ca092(0x923)][_0x5ca092(0x564)]=function(){const _0xc1d4df=_0x5ca092;return Scene_Shop[_0xc1d4df(0x362)]['BuyRect'][_0xc1d4df(0x481)](this);},Scene_Shop[_0x5ca092(0x923)][_0x5ca092(0x21d)]=function(){const _0x265fdc=_0x5ca092;return Scene_Shop[_0x265fdc(0x362)][_0x265fdc(0x896)][_0x265fdc(0x481)](this);},Scene_Shop['prototype'][_0x5ca092(0x1e1)]=function(){const _0x501dad=_0x5ca092;return Scene_Shop[_0x501dad(0x362)][_0x501dad(0x97d)][_0x501dad(0x481)](this);},Scene_Name['layoutSettings']=VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x225)][_0x5ca092(0x2a9)][_0x5ca092(0x4dc)],VisuMZ[_0x5ca092(0x865)]['Scene_Name_create']=Scene_Name[_0x5ca092(0x923)]['create'],Scene_Name[_0x5ca092(0x923)][_0x5ca092(0x49a)]=function(){const _0x4b3599=_0x5ca092;VisuMZ[_0x4b3599(0x865)][_0x4b3599(0x438)][_0x4b3599(0x481)](this),this[_0x4b3599(0x88b)]();},Scene_Name['prototype'][_0x5ca092(0x88b)]=function(){const _0x499959=_0x5ca092;this[_0x499959(0x3c9)]&&this['_editWindow']['setBackgroundType'](Scene_Name[_0x499959(0x362)][_0x499959(0x713)]),this[_0x499959(0x436)]&&this['_inputWindow']['setBackgroundType'](Scene_Name['layoutSettings'][_0x499959(0x91c)]);},Scene_Name[_0x5ca092(0x923)][_0x5ca092(0x56e)]=function(){return 0x0;},Scene_Name[_0x5ca092(0x923)]['editWindowRect']=function(){const _0x48c762=_0x5ca092;return Scene_Name['layoutSettings'][_0x48c762(0x510)][_0x48c762(0x481)](this);},Scene_Name['prototype'][_0x5ca092(0x7f5)]=function(){const _0x28c326=_0x5ca092;return Scene_Name['layoutSettings'][_0x28c326(0x24d)]['call'](this);},Scene_Name['prototype'][_0x5ca092(0x4ab)]=function(){const _0x3c59d8=_0x5ca092;if(!this[_0x3c59d8(0x436)])return![];return VisuMZ[_0x3c59d8(0x865)][_0x3c59d8(0x225)][_0x3c59d8(0x633)][_0x3c59d8(0x4ab)];},Scene_Name[_0x5ca092(0x923)][_0x5ca092(0x546)]=function(){const _0x24c8c3=_0x5ca092;if(this['EnableNameInput']()&&this[_0x24c8c3(0x436)][_0x24c8c3(0x8df)]!==_0x24c8c3(0x916))return TextManager['getInputMultiButtonStrings'](_0x24c8c3(0x395),_0x24c8c3(0x256));return Scene_MenuBase['prototype'][_0x24c8c3(0x546)][_0x24c8c3(0x481)](this);},Scene_Name[_0x5ca092(0x923)][_0x5ca092(0x826)]=function(){const _0x1d731f=_0x5ca092;return this[_0x1d731f(0x4ab)]()?TextManager[_0x1d731f(0x3b4)](_0x1d731f(0x24a)):Scene_MenuBase[_0x1d731f(0x923)][_0x1d731f(0x826)]['call'](this);},Scene_Name[_0x5ca092(0x923)][_0x5ca092(0x22a)]=function(){const _0x506f6c=_0x5ca092;if(this[_0x506f6c(0x4ab)]()&&this['_inputWindow'][_0x506f6c(0x8df)]===_0x506f6c(0x916))return TextManager[_0x506f6c(0x31b)]([_0x506f6c(0x73f)]);return Scene_MenuBase[_0x506f6c(0x923)][_0x506f6c(0x22a)][_0x506f6c(0x481)](this);},Scene_Name[_0x5ca092(0x923)][_0x5ca092(0x1ef)]=function(){const _0x287e0d=_0x5ca092;if(this['EnableNameInput']()&&this[_0x287e0d(0x436)][_0x287e0d(0x8df)]==='keyboard')return TextManager['makeInputButtonString']([_0x287e0d(0x7fd)]);return Scene_MenuBase['prototype'][_0x287e0d(0x1ef)][_0x287e0d(0x481)](this);},Scene_Name['prototype'][_0x5ca092(0x8a7)]=function(){const _0x47cb53=_0x5ca092;if(this[_0x47cb53(0x4ab)]()&&this[_0x47cb53(0x436)][_0x47cb53(0x8df)]!=='keyboard'){const _0x16d67e=VisuMZ[_0x47cb53(0x865)]['Settings'][_0x47cb53(0x633)];return _0x16d67e[_0x47cb53(0x3b9)]||'Page';}return Scene_MenuBase[_0x47cb53(0x923)]['buttonAssistText1']['call'](this);},Scene_Name[_0x5ca092(0x923)][_0x5ca092(0x654)]=function(){const _0x113847=_0x5ca092;if(this['EnableNameInput']()){const _0x1af036=VisuMZ[_0x113847(0x865)][_0x113847(0x225)][_0x113847(0x633)];return this[_0x113847(0x436)][_0x113847(0x8df)]===_0x113847(0x916)?_0x1af036['Keyboard']||_0x113847(0x4b3):_0x1af036['Manual']||_0x113847(0x781);}else return Scene_MenuBase[_0x113847(0x923)]['buttonAssistText3']['call'](this);},Scene_Name['prototype'][_0x5ca092(0x7f8)]=function(){const _0x1ac220=_0x5ca092;if(this['EnableNameInput']()){const _0x9834ee=VisuMZ[_0x1ac220(0x865)][_0x1ac220(0x225)][_0x1ac220(0x633)];if(this['_inputWindow'][_0x1ac220(0x8df)]==='keyboard')return _0x9834ee[_0x1ac220(0x2b0)]||'Finish';}return Scene_MenuBase[_0x1ac220(0x923)]['buttonAssistText4'][_0x1ac220(0x481)](this);},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x32d)]=Scene_Name[_0x5ca092(0x923)][_0x5ca092(0x85f)],Scene_Name[_0x5ca092(0x923)][_0x5ca092(0x85f)]=function(){const _0x4a883b=_0x5ca092;this[_0x4a883b(0x751)]()?this[_0x4a883b(0x5fb)]():VisuMZ[_0x4a883b(0x865)][_0x4a883b(0x32d)][_0x4a883b(0x481)](this);},Scene_Name[_0x5ca092(0x923)]['doesNameContainBannedWords']=function(){const _0x131cb3=_0x5ca092,_0x59e81c=VisuMZ['CoreEngine']['Settings'][_0x131cb3(0x633)];if(!_0x59e81c)return![];const _0x390b63=_0x59e81c['BannedWords'];if(!_0x390b63)return![];const _0xc669e8=this['_editWindow'][_0x131cb3(0x7a5)]()[_0x131cb3(0x86b)]();for(const _0x2f4a5f of _0x390b63){if(_0xc669e8[_0x131cb3(0x3f8)](_0x2f4a5f['toLowerCase']()))return!![];}return![];},Scene_Name[_0x5ca092(0x923)][_0x5ca092(0x5fb)]=function(){const _0x27bf4f=_0x5ca092;SoundManager[_0x27bf4f(0x431)]();},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x7e3)]=Scene_Battle[_0x5ca092(0x923)][_0x5ca092(0x471)],Scene_Battle[_0x5ca092(0x923)][_0x5ca092(0x471)]=function(){const _0x569de6=_0x5ca092;VisuMZ['CoreEngine'][_0x569de6(0x7e3)][_0x569de6(0x481)](this);if($gameTemp[_0x569de6(0x349)])this[_0x569de6(0x2c1)]();},Scene_Battle[_0x5ca092(0x923)]['updatePlayTestF7']=function(){const _0x3ed4d4=_0x5ca092;!BattleManager['isInputting']()&&!this[_0x3ed4d4(0x2c5)]&&!$gameMessage[_0x3ed4d4(0x5b2)]()&&(this[_0x3ed4d4(0x2c5)]=!![],this[_0x3ed4d4(0x471)](),SceneManager[_0x3ed4d4(0x6fb)](),this['_playtestF7Looping']=![]);},VisuMZ['CoreEngine'][_0x5ca092(0x664)]=Scene_Battle[_0x5ca092(0x923)][_0x5ca092(0x732)],Scene_Battle['prototype']['createCancelButton']=function(){const _0x55c004=_0x5ca092;VisuMZ[_0x55c004(0x865)][_0x55c004(0x664)][_0x55c004(0x481)](this),SceneManager[_0x55c004(0x93a)]()&&this[_0x55c004(0x598)]();},Scene_Battle[_0x5ca092(0x923)][_0x5ca092(0x598)]=function(){const _0x40337e=_0x5ca092;this[_0x40337e(0x684)]['x']=Graphics[_0x40337e(0x630)]+0x4,this[_0x40337e(0x833)]()?this[_0x40337e(0x684)]['y']=Graphics[_0x40337e(0x6dc)]-this[_0x40337e(0x83a)]():this[_0x40337e(0x684)]['y']=0x0;},VisuMZ['CoreEngine'][_0x5ca092(0x94f)]=Sprite_Button['prototype']['initialize'],Sprite_Button['prototype'][_0x5ca092(0x44e)]=function(_0x33dceb){const _0x5befc6=_0x5ca092;VisuMZ[_0x5befc6(0x865)][_0x5befc6(0x94f)][_0x5befc6(0x481)](this,_0x33dceb),this[_0x5befc6(0x3e4)]();},Sprite_Button[_0x5ca092(0x923)][_0x5ca092(0x3e4)]=function(){const _0x4ee044=_0x5ca092,_0x4e9d0a=VisuMZ[_0x4ee044(0x865)][_0x4ee044(0x225)]['UI'];this['_isButtonHidden']=![];switch(this[_0x4ee044(0x2d0)]){case'cancel':this['_isButtonHidden']=!_0x4e9d0a[_0x4ee044(0x8f4)];break;case _0x4ee044(0x395):case _0x4ee044(0x256):this[_0x4ee044(0x92b)]=!_0x4e9d0a[_0x4ee044(0x739)];break;case _0x4ee044(0x621):case'up':case'down2':case _0x4ee044(0x79b):case'ok':this[_0x4ee044(0x92b)]=!_0x4e9d0a['numberShowButton'];break;case _0x4ee044(0x2c9):this[_0x4ee044(0x92b)]=!_0x4e9d0a[_0x4ee044(0x433)];break;}},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x5ec)]=Sprite_Button[_0x5ca092(0x923)][_0x5ca092(0x42d)],Sprite_Button['prototype'][_0x5ca092(0x42d)]=function(){const _0x15f298=_0x5ca092;SceneManager[_0x15f298(0x3e3)]()||this[_0x15f298(0x92b)]?this[_0x15f298(0x370)]():VisuMZ[_0x15f298(0x865)]['Sprite_Button_updateOpacity'][_0x15f298(0x481)](this);},Sprite_Button[_0x5ca092(0x923)][_0x5ca092(0x370)]=function(){const _0x112c03=_0x5ca092;this[_0x112c03(0x577)]=![],this[_0x112c03(0x795)]=0x0,this['x']=Graphics[_0x112c03(0x7b7)]*0xa,this['y']=Graphics[_0x112c03(0x2a0)]*0xa;},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x224)]=Sprite_Battler[_0x5ca092(0x923)][_0x5ca092(0x375)],Sprite_Battler[_0x5ca092(0x923)]['startMove']=function(_0xeca94e,_0x5dcc84,_0x3ca3a5){const _0x2d80fe=_0x5ca092;(this[_0x2d80fe(0x274)]!==_0xeca94e||this[_0x2d80fe(0x867)]!==_0x5dcc84)&&(this[_0x2d80fe(0x88f)](_0x2d80fe(0x33f)),this[_0x2d80fe(0x62e)]=_0x3ca3a5),VisuMZ[_0x2d80fe(0x865)][_0x2d80fe(0x224)]['call'](this,_0xeca94e,_0x5dcc84,_0x3ca3a5);},Sprite_Battler[_0x5ca092(0x923)][_0x5ca092(0x88f)]=function(_0x3e4c04){const _0xa0e6a1=_0x5ca092;this[_0xa0e6a1(0x77a)]=_0x3e4c04;},Sprite_Battler[_0x5ca092(0x923)][_0x5ca092(0x69d)]=function(){const _0x4939ef=_0x5ca092;if(this[_0x4939ef(0x789)]<=0x0)return;const _0xe83a99=this[_0x4939ef(0x789)],_0x21a662=this['_movementWholeDuration'],_0x229789=this[_0x4939ef(0x77a)];this['_offsetX']=this[_0x4939ef(0x832)](this['_offsetX'],this[_0x4939ef(0x274)],_0xe83a99,_0x21a662,_0x229789),this['_offsetY']=this['applyEasing'](this[_0x4939ef(0x5ac)],this[_0x4939ef(0x867)],_0xe83a99,_0x21a662,_0x229789),this['_movementDuration']--;if(this['_movementDuration']<=0x0)this['onMoveEnd']();},Sprite_Battler[_0x5ca092(0x923)][_0x5ca092(0x832)]=function(_0x30cf9a,_0x526d9e,_0x64f33f,_0x20e899,_0x31a492){const _0x39c1e1=_0x5ca092,_0x1785fc=VisuMZ['ApplyEasing']((_0x20e899-_0x64f33f)/_0x20e899,_0x31a492||_0x39c1e1(0x33f)),_0x5960b4=VisuMZ[_0x39c1e1(0x8e2)]((_0x20e899-_0x64f33f+0x1)/_0x20e899,_0x31a492||'Linear'),_0x505a59=(_0x30cf9a-_0x526d9e*_0x1785fc)/(0x1-_0x1785fc);return _0x505a59+(_0x526d9e-_0x505a59)*_0x5960b4;},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x762)]=Sprite_Actor[_0x5ca092(0x923)][_0x5ca092(0x474)],Sprite_Actor['prototype'][_0x5ca092(0x474)]=function(_0x40fc6b){const _0x2e3d28=_0x5ca092;VisuMZ[_0x2e3d28(0x865)][_0x2e3d28(0x225)]['UI'][_0x2e3d28(0x878)]?this[_0x2e3d28(0x270)](_0x40fc6b):VisuMZ['CoreEngine'][_0x2e3d28(0x762)][_0x2e3d28(0x481)](this,_0x40fc6b);},Sprite_Actor['prototype'][_0x5ca092(0x270)]=function(_0x18fe26){const _0x2b3d5c=_0x5ca092;let _0x1540ba=Math['round'](Graphics[_0x2b3d5c(0x7b7)]/0x2+0xc0);_0x1540ba-=Math['floor']((Graphics[_0x2b3d5c(0x7b7)]-Graphics[_0x2b3d5c(0x630)])/0x2),_0x1540ba+=_0x18fe26*0x20;let _0x430a8c=Graphics[_0x2b3d5c(0x2a0)]-0xc8-$gameParty['maxBattleMembers']()*0x30;_0x430a8c-=Math['floor']((Graphics[_0x2b3d5c(0x2a0)]-Graphics[_0x2b3d5c(0x6dc)])/0x2),_0x430a8c+=_0x18fe26*0x30,this['setHome'](_0x1540ba,_0x430a8c);},Sprite_Actor[_0x5ca092(0x923)][_0x5ca092(0x7fb)]=function(){this['startMove'](0x4b0,0x0,0x78);},Sprite_Animation[_0x5ca092(0x923)][_0x5ca092(0x46a)]=function(_0x57563c){const _0x29284d=_0x5ca092;this[_0x29284d(0x337)]=_0x57563c;},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x82b)]=Sprite_Animation['prototype']['processSoundTimings'],Sprite_Animation[_0x5ca092(0x923)][_0x5ca092(0x302)]=function(){const _0x4a0eea=_0x5ca092;if(this[_0x4a0eea(0x337)])return;VisuMZ['CoreEngine'][_0x4a0eea(0x82b)]['call'](this);},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x86a)]=Sprite_Animation[_0x5ca092(0x923)][_0x5ca092(0x31d)],Sprite_Animation[_0x5ca092(0x923)]['setViewport']=function(_0x101345){const _0x399ba9=_0x5ca092;this[_0x399ba9(0x314)]()?this[_0x399ba9(0x382)](_0x101345):VisuMZ['CoreEngine'][_0x399ba9(0x86a)]['call'](this,_0x101345);},Sprite_Animation['prototype']['isAnimationOffsetXMirrored']=function(){const _0x43df8d=_0x5ca092;if(!this[_0x43df8d(0x35d)])return![];const _0x4ebe0a=this[_0x43df8d(0x35d)][_0x43df8d(0x7a5)]||'';if(_0x4ebe0a['match'](/<MIRROR OFFSET X>/i))return!![];if(_0x4ebe0a[_0x43df8d(0x345)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ['CoreEngine']['Settings'][_0x43df8d(0x656)][_0x43df8d(0x38e)];},Sprite_Animation[_0x5ca092(0x923)][_0x5ca092(0x382)]=function(_0x39ff8a){const _0x3467d4=_0x5ca092,_0x52337c=this[_0x3467d4(0x1da)],_0x1018ee=this[_0x3467d4(0x1da)],_0x4aa4b4=this[_0x3467d4(0x35d)][_0x3467d4(0x681)]*(this[_0x3467d4(0x897)]?-0x1:0x1)-_0x52337c/0x2,_0x378cf1=this[_0x3467d4(0x35d)][_0x3467d4(0x939)]-_0x1018ee/0x2,_0xbd5cf9=this[_0x3467d4(0x96c)](_0x39ff8a);_0x39ff8a['gl']['viewport'](_0x4aa4b4+_0xbd5cf9['x'],_0x378cf1+_0xbd5cf9['y'],_0x52337c,_0x1018ee);},Sprite_Animation['prototype']['targetSpritePosition']=function(_0x1cc678){const _0x98e4cb=_0x5ca092;if(_0x1cc678[_0x98e4cb(0x736)]){}const _0xc0d49d=this[_0x98e4cb(0x35d)][_0x98e4cb(0x7a5)];let _0x8ee492=_0x1cc678[_0x98e4cb(0x2a0)]*_0x1cc678[_0x98e4cb(0x589)]['y'],_0x58fecc=0x0,_0x4f5b50=-_0x8ee492/0x2;if(_0xc0d49d[_0x98e4cb(0x345)](/<(?:HEAD|HEADER|TOP)>/i))_0x4f5b50=-_0x8ee492;if(_0xc0d49d[_0x98e4cb(0x345)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x4f5b50=0x0;if(this[_0x98e4cb(0x35d)]['alignBottom'])_0x4f5b50=0x0;if(_0xc0d49d['match'](/<(?:LEFT)>/i))_0x58fecc=-_0x1cc678[_0x98e4cb(0x7b7)]/0x2;if(_0xc0d49d['match'](/<(?:RIGHT)>/i))_0x58fecc=_0x1cc678['width']/0x2;_0xc0d49d['match'](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0x58fecc=Number(RegExp['$1'])*_0x1cc678[_0x98e4cb(0x7b7)]);_0xc0d49d[_0x98e4cb(0x345)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x4f5b50=(0x1-Number(RegExp['$1']))*-_0x8ee492);_0xc0d49d[_0x98e4cb(0x345)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x58fecc=Number(RegExp['$1'])*_0x1cc678[_0x98e4cb(0x7b7)],_0x4f5b50=(0x1-Number(RegExp['$2']))*-_0x8ee492);if(_0xc0d49d['match'](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x58fecc+=Number(RegExp['$1']);if(_0xc0d49d['match'](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x4f5b50+=Number(RegExp['$1']);_0xc0d49d[_0x98e4cb(0x345)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x58fecc+=Number(RegExp['$1']),_0x4f5b50+=Number(RegExp['$2']));const _0x246fd4=new Point(_0x58fecc,_0x4f5b50);return _0x1cc678[_0x98e4cb(0x8ed)](),_0x1cc678[_0x98e4cb(0x942)][_0x98e4cb(0x92a)](_0x246fd4);},Sprite_AnimationMV[_0x5ca092(0x923)][_0x5ca092(0x404)]=function(){const _0x1424d6=_0x5ca092;this[_0x1424d6(0x78e)]=VisuMZ[_0x1424d6(0x865)]['Settings'][_0x1424d6(0x656)][_0x1424d6(0x44c)]??0x4,this['setupCustomRateCoreEngine'](),this[_0x1424d6(0x78e)]=this[_0x1424d6(0x78e)][_0x1424d6(0x266)](0x1,0xa);},Sprite_AnimationMV[_0x5ca092(0x923)]['setupCustomRateCoreEngine']=function(){const _0x5e2fab=_0x5ca092;if(!this['_animation']);const _0x452d9d=this[_0x5e2fab(0x35d)][_0x5e2fab(0x7a5)]||'';_0x452d9d[_0x5e2fab(0x345)](/<RATE:[ ](\d+)>/i)&&(this[_0x5e2fab(0x78e)]=(Number(RegExp['$1'])||0x1)['clamp'](0x1,0xa));},Sprite_AnimationMV[_0x5ca092(0x923)]['setMute']=function(_0x49afe7){const _0x3accbb=_0x5ca092;this[_0x3accbb(0x337)]=_0x49afe7;},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x707)]=Sprite_AnimationMV[_0x5ca092(0x923)][_0x5ca092(0x4bb)],Sprite_AnimationMV[_0x5ca092(0x923)]['processTimingData']=function(_0x47858a){const _0x2ea7a1=_0x5ca092;this[_0x2ea7a1(0x337)]&&(_0x47858a=JsonEx[_0x2ea7a1(0x54f)](_0x47858a),_0x47858a['se']&&(_0x47858a['se'][_0x2ea7a1(0x618)]=0x0)),VisuMZ[_0x2ea7a1(0x865)][_0x2ea7a1(0x707)][_0x2ea7a1(0x481)](this,_0x47858a);},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x35a)]=Sprite_AnimationMV[_0x5ca092(0x923)][_0x5ca092(0x91d)],Sprite_AnimationMV[_0x5ca092(0x923)]['updatePosition']=function(){const _0x55db32=_0x5ca092;VisuMZ['CoreEngine']['Sprite_AnimationMV_updatePosition']['call'](this);if(this[_0x55db32(0x35d)][_0x55db32(0x5aa)]===0x3){if(this['x']===0x0)this['x']=Math[_0x55db32(0x75e)](Graphics[_0x55db32(0x7b7)]/0x2);if(this['y']===0x0)this['y']=Math[_0x55db32(0x75e)](Graphics[_0x55db32(0x2a0)]/0x2);}},Sprite_Damage[_0x5ca092(0x923)][_0x5ca092(0x246)]=function(_0x4f8ccd){const _0x69ac41=_0x5ca092;let _0x1bcd4a=Math['abs'](_0x4f8ccd)['toString']();this[_0x69ac41(0x801)]()&&(_0x1bcd4a=VisuMZ[_0x69ac41(0x5d5)](_0x1bcd4a));const _0x1b9fe1=this[_0x69ac41(0x384)](),_0x31da29=Math[_0x69ac41(0x229)](_0x1b9fe1*0.75);for(let _0x382316=0x0;_0x382316<_0x1bcd4a[_0x69ac41(0x839)];_0x382316++){const _0x367120=this[_0x69ac41(0x965)](_0x31da29,_0x1b9fe1);_0x367120[_0x69ac41(0x625)][_0x69ac41(0x286)](_0x1bcd4a[_0x382316],0x0,0x0,_0x31da29,_0x1b9fe1,_0x69ac41(0x3bf)),_0x367120['x']=(_0x382316-(_0x1bcd4a['length']-0x1)/0x2)*_0x31da29,_0x367120['dy']=-_0x382316;}},Sprite_Damage['prototype'][_0x5ca092(0x801)]=function(){const _0x10b483=_0x5ca092;return VisuMZ[_0x10b483(0x865)][_0x10b483(0x225)][_0x10b483(0x656)][_0x10b483(0x909)];},Sprite_Damage['prototype'][_0x5ca092(0x5c2)]=function(){const _0x581916=_0x5ca092;return ColorManager[_0x581916(0x920)]();},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x705)]=Sprite_Gauge['prototype'][_0x5ca092(0x449)],Sprite_Gauge['prototype']['gaugeRate']=function(){const _0x3ae624=_0x5ca092;return VisuMZ[_0x3ae624(0x865)][_0x3ae624(0x705)][_0x3ae624(0x481)](this)[_0x3ae624(0x266)](0x0,0x1);},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x22b)]=Sprite_Gauge[_0x5ca092(0x923)][_0x5ca092(0x5ee)],Sprite_Gauge[_0x5ca092(0x923)][_0x5ca092(0x5ee)]=function(){const _0x7d3d70=_0x5ca092;let _0x339265=VisuMZ['CoreEngine'][_0x7d3d70(0x22b)][_0x7d3d70(0x481)](this);return _0x339265;},Sprite_Gauge[_0x5ca092(0x923)][_0x5ca092(0x45e)]=function(){const _0x23a561=_0x5ca092;let _0x23976f=this[_0x23a561(0x5ee)]();this['useDigitGrouping']()&&(_0x23976f=VisuMZ[_0x23a561(0x5d5)](_0x23976f));const _0x5961c3=this[_0x23a561(0x7cb)]()-0x1,_0x3076d8=this[_0x23a561(0x600)]?this[_0x23a561(0x600)]():this[_0x23a561(0x541)]();this[_0x23a561(0x695)](),this[_0x23a561(0x625)][_0x23a561(0x286)](_0x23976f,0x0,0x0,_0x5961c3,_0x3076d8,_0x23a561(0x254));},Sprite_Gauge['prototype']['valueOutlineWidth']=function(){return 0x3;},Sprite_Gauge['prototype']['useDigitGrouping']=function(){const _0x2dc335=_0x5ca092;return VisuMZ[_0x2dc335(0x865)][_0x2dc335(0x225)][_0x2dc335(0x656)][_0x2dc335(0x528)];},Sprite_Gauge['prototype'][_0x5ca092(0x5c2)]=function(){return ColorManager['outlineColorGauge']();},Sprite_StateIcon[_0x5ca092(0x917)]=VisuMZ['CoreEngine'][_0x5ca092(0x225)]['UI'][_0x5ca092(0x6b6)]??!![],VisuMZ['CoreEngine'][_0x5ca092(0x6da)]=Sprite_StateIcon[_0x5ca092(0x923)][_0x5ca092(0x2d6)],Sprite_StateIcon['prototype'][_0x5ca092(0x2d6)]=function(){const _0x25b9db=_0x5ca092;Sprite_StateIcon[_0x25b9db(0x917)]?this[_0x25b9db(0x661)]():VisuMZ[_0x25b9db(0x865)][_0x25b9db(0x6da)][_0x25b9db(0x481)](this);},Sprite_StateIcon[_0x5ca092(0x923)][_0x5ca092(0x661)]=function(){const _0x5e2bc1=_0x5ca092;this['bitmap']=new Bitmap(ImageManager[_0x5e2bc1(0x90c)],ImageManager[_0x5e2bc1(0x30c)]),this[_0x5e2bc1(0x830)]=ImageManager[_0x5e2bc1(0x712)](_0x5e2bc1(0x7af));},VisuMZ['CoreEngine']['Sprite_StateIcon_updateFrame']=Sprite_StateIcon['prototype'][_0x5ca092(0x34c)],Sprite_StateIcon[_0x5ca092(0x923)][_0x5ca092(0x34c)]=function(){const _0x1c8304=_0x5ca092;Sprite_StateIcon[_0x1c8304(0x917)]?this[_0x1c8304(0x67c)]():VisuMZ[_0x1c8304(0x865)][_0x1c8304(0x1d7)]['call'](this);},Sprite_StateIcon[_0x5ca092(0x923)][_0x5ca092(0x67c)]=function(){const _0x188a43=_0x5ca092;if(this[_0x188a43(0x5f1)]===this[_0x188a43(0x33a)])return;this[_0x188a43(0x5f1)]=this['_iconIndex'];const _0x56ba52=ImageManager[_0x188a43(0x90c)],_0x4f3af2=ImageManager['iconHeight'],_0x32c9cd=this[_0x188a43(0x33a)]%0x10*_0x56ba52,_0x550926=Math['floor'](this[_0x188a43(0x33a)]/0x10)*_0x4f3af2,_0x574236=this['_srcBitmap'],_0x4fa8df=this[_0x188a43(0x625)];_0x4fa8df[_0x188a43(0x6e2)](),_0x4fa8df['blt'](_0x574236,_0x32c9cd,_0x550926,_0x56ba52,_0x4f3af2,0x0,0x0,_0x4fa8df[_0x188a43(0x7b7)],_0x4fa8df[_0x188a43(0x2a0)]);},VisuMZ[_0x5ca092(0x865)]['Sprite_Picture_loadBitmap']=Sprite_Picture[_0x5ca092(0x923)][_0x5ca092(0x2d6)],Sprite_Picture['prototype'][_0x5ca092(0x2d6)]=function(){const _0x53ba3a=_0x5ca092;this[_0x53ba3a(0x2c7)]&&this[_0x53ba3a(0x2c7)][_0x53ba3a(0x345)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this[_0x53ba3a(0x4f4)](Number(RegExp['$1'])):VisuMZ['CoreEngine'][_0x53ba3a(0x96a)]['call'](this);},Sprite_Picture[_0x5ca092(0x923)][_0x5ca092(0x4f4)]=function(_0x44aaa8){const _0x511a86=_0x5ca092,_0x237dde=ImageManager[_0x511a86(0x90c)],_0x4b5d91=ImageManager[_0x511a86(0x30c)],_0x281c84=this[_0x511a86(0x2c7)][_0x511a86(0x345)](/SMOOTH/i);this[_0x511a86(0x625)]=new Bitmap(_0x237dde,_0x4b5d91);const _0x276067=ImageManager[_0x511a86(0x712)](_0x511a86(0x7af)),_0x50d838=_0x44aaa8%0x10*_0x237dde,_0x45f4e9=Math[_0x511a86(0x229)](_0x44aaa8/0x10)*_0x4b5d91;this[_0x511a86(0x625)][_0x511a86(0x6e4)]=_0x281c84,this[_0x511a86(0x625)][_0x511a86(0x6e6)](_0x276067,_0x50d838,_0x45f4e9,_0x237dde,_0x4b5d91,0x0,0x0,_0x237dde,_0x4b5d91);};function Sprite_TitlePictureButton(){const _0x55f3ea=_0x5ca092;this[_0x55f3ea(0x44e)](...arguments);}Sprite_TitlePictureButton[_0x5ca092(0x923)]=Object['create'](Sprite_Clickable[_0x5ca092(0x923)]),Sprite_TitlePictureButton[_0x5ca092(0x923)][_0x5ca092(0x2bb)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x5ca092(0x923)][_0x5ca092(0x44e)]=function(_0x322bf0){const _0x3b5377=_0x5ca092;Sprite_Clickable[_0x3b5377(0x923)][_0x3b5377(0x44e)][_0x3b5377(0x481)](this),this[_0x3b5377(0x607)]=_0x322bf0,this[_0x3b5377(0x7fe)]=null,this['setup']();},Sprite_TitlePictureButton[_0x5ca092(0x923)][_0x5ca092(0x495)]=function(){const _0xb45e9c=_0x5ca092;this['x']=Graphics['width'],this['y']=Graphics[_0xb45e9c(0x2a0)],this[_0xb45e9c(0x577)]=![],this[_0xb45e9c(0x69c)]();},Sprite_TitlePictureButton[_0x5ca092(0x923)][_0x5ca092(0x69c)]=function(){const _0x3cf9dc=_0x5ca092;this[_0x3cf9dc(0x625)]=ImageManager[_0x3cf9dc(0x1ff)](this[_0x3cf9dc(0x607)][_0x3cf9dc(0x565)]),this[_0x3cf9dc(0x625)][_0x3cf9dc(0x974)](this[_0x3cf9dc(0x692)]['bind'](this));},Sprite_TitlePictureButton[_0x5ca092(0x923)]['onButtonImageLoad']=function(){const _0x2ccd31=_0x5ca092;this[_0x2ccd31(0x607)][_0x2ccd31(0x1e9)][_0x2ccd31(0x481)](this),this[_0x2ccd31(0x607)]['PositionJS']['call'](this),this[_0x2ccd31(0x787)](this['_data']['CallHandlerJS'][_0x2ccd31(0x2da)](this));},Sprite_TitlePictureButton[_0x5ca092(0x923)][_0x5ca092(0x471)]=function(){const _0x427901=_0x5ca092;Sprite_Clickable[_0x427901(0x923)][_0x427901(0x471)]['call'](this),this[_0x427901(0x42d)](),this['processTouch']();},Sprite_TitlePictureButton[_0x5ca092(0x923)]['fadeSpeed']=function(){const _0x5d1f56=_0x5ca092;return VisuMZ[_0x5d1f56(0x865)][_0x5d1f56(0x225)][_0x5d1f56(0x2a9)][_0x5d1f56(0x91b)][_0x5d1f56(0x422)];},Sprite_TitlePictureButton[_0x5ca092(0x923)]['updateOpacity']=function(){const _0x50cd06=_0x5ca092;this[_0x50cd06(0x29a)]||this[_0x50cd06(0x2ed)]?this['opacity']=0xff:(this['opacity']+=this['visible']?this[_0x50cd06(0x60a)]():-0x1*this['fadeSpeed'](),this[_0x50cd06(0x795)]=Math[_0x50cd06(0x667)](0xc0,this['opacity']));},Sprite_TitlePictureButton['prototype'][_0x5ca092(0x787)]=function(_0x42ee07){this['_clickHandler']=_0x42ee07;},Sprite_TitlePictureButton[_0x5ca092(0x923)][_0x5ca092(0x759)]=function(){const _0x4563ba=_0x5ca092;this[_0x4563ba(0x7fe)]&&this['_clickHandler']();};function Sprite_ExtendedTile(){this['initialize'](...arguments);}Sprite_ExtendedTile[_0x5ca092(0x923)]=Object[_0x5ca092(0x49a)](Sprite[_0x5ca092(0x923)]),Sprite_ExtendedTile[_0x5ca092(0x923)]['constructor']=Sprite_ExtendedTile,Sprite_ExtendedTile[_0x5ca092(0x923)]['initialize']=function(_0x3d49ca,_0x34c1bc,_0x23bbe7,_0x2626e5){const _0x5c7241=_0x5ca092;this[_0x5c7241(0x685)]=Game_CharacterBase[_0x5c7241(0x208)]||-0x6,this['_mapX']=_0x3d49ca,this['_mapY']=_0x34c1bc,this[_0x5c7241(0x7ab)]=_0x23bbe7,this[_0x5c7241(0x770)]=_0x2626e5,Sprite[_0x5c7241(0x923)][_0x5c7241(0x44e)][_0x5c7241(0x481)](this),this[_0x5c7241(0x3f3)](),this['loadTileBitmap'](),this[_0x5c7241(0x441)](),this['update']();},Sprite_ExtendedTile[_0x5ca092(0x923)]['createSubSprite']=function(){const _0x53640f=_0x5ca092;this[_0x53640f(0x7ae)]=new Sprite(),this['_tileSprite']['anchor']['x']=0.5,this[_0x53640f(0x7ae)]['anchor']['y']=0x1,this[_0x53640f(0x7ae)]['y']=-this[_0x53640f(0x685)]+0x1,this[_0x53640f(0x61a)](this[_0x53640f(0x7ae)]);},Sprite_ExtendedTile[_0x5ca092(0x923)][_0x5ca092(0x71d)]=function(){const _0x24f2b7=_0x5ca092,_0x26a6f4=$gameMap['tileset'](),_0x20cd5c=0x5+Math[_0x24f2b7(0x229)](this[_0x24f2b7(0x7ab)]/0x100);this['_tileSprite']['bitmap']=ImageManager[_0x24f2b7(0x8d6)](_0x26a6f4[_0x24f2b7(0x288)][_0x20cd5c]);},Sprite_ExtendedTile[_0x5ca092(0x923)][_0x5ca092(0x441)]=function(){const _0x10b6b5=_0x5ca092,_0x26c6c1=this[_0x10b6b5(0x7ab)],_0x19f85b=$gameMap['tileWidth'](),_0x5c4443=$gameMap['tileHeight'](),_0x553645=(Math[_0x10b6b5(0x229)](_0x26c6c1/0x80)%0x2*0x8+_0x26c6c1%0x8)*_0x19f85b,_0x362b06=Math[_0x10b6b5(0x229)](_0x26c6c1%0x100/0x8)%0x10*_0x5c4443,_0x50ce38=this[_0x10b6b5(0x770)]*_0x5c4443;this[_0x10b6b5(0x7ae)][_0x10b6b5(0x682)](_0x553645,_0x362b06-_0x50ce38,_0x19f85b,_0x5c4443+_0x50ce38);},Sprite_ExtendedTile['prototype']['update']=function(){const _0x47e697=_0x5ca092;Sprite[_0x47e697(0x923)][_0x47e697(0x471)]['call'](this),this[_0x47e697(0x91d)]();},Sprite_ExtendedTile[_0x5ca092(0x923)][_0x5ca092(0x91d)]=function(){const _0x425f1d=_0x5ca092,_0x4174e0=$gameMap['tileWidth'](),_0x145f37=$gameMap[_0x425f1d(0x396)](),_0x9e280a=this['_mapX'],_0x21ba74=this[_0x425f1d(0x69e)];this['x']=Math['floor'](($gameMap[_0x425f1d(0x3a9)](_0x9e280a)+0.5)*_0x4174e0),this['y']=Math[_0x425f1d(0x229)](($gameMap[_0x425f1d(0x515)](_0x21ba74)+0x1)*_0x145f37)+this[_0x425f1d(0x685)]-0x1;},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x7a0)]=Spriteset_Base[_0x5ca092(0x923)]['initialize'],Spriteset_Base[_0x5ca092(0x923)]['initialize']=function(){const _0x19ffe5=_0x5ca092;VisuMZ['CoreEngine'][_0x19ffe5(0x7a0)]['call'](this),this['initMembersCoreEngine']();},Spriteset_Base[_0x5ca092(0x923)][_0x5ca092(0x6e7)]=function(){const _0x152773=_0x5ca092;this['_fauxAnimationSprites']=[],this[_0x152773(0x328)]=[],this['_cacheScaleX']=this[_0x152773(0x589)]['x'],this[_0x152773(0x87c)]=this[_0x152773(0x589)]['y'];},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x4d9)]=Spriteset_Base[_0x5ca092(0x923)][_0x5ca092(0x3ae)],Spriteset_Base['prototype']['destroy']=function(_0x14e88e){const _0x49372d=_0x5ca092;this[_0x49372d(0x4ba)](),this['removeAllPointAnimations'](),VisuMZ[_0x49372d(0x865)][_0x49372d(0x4d9)]['call'](this,_0x14e88e);},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x4e9)]=Spriteset_Base[_0x5ca092(0x923)]['update'],Spriteset_Base[_0x5ca092(0x923)][_0x5ca092(0x471)]=function(){const _0x31995f=_0x5ca092;VisuMZ[_0x31995f(0x865)][_0x31995f(0x4e9)]['call'](this),this[_0x31995f(0x232)](),this[_0x31995f(0x4e2)](),this[_0x31995f(0x87d)](),this[_0x31995f(0x269)]();},Spriteset_Base[_0x5ca092(0x923)][_0x5ca092(0x232)]=function(){},Spriteset_Base[_0x5ca092(0x923)][_0x5ca092(0x4e2)]=function(){const _0x3d33b5=_0x5ca092;if(!VisuMZ['CoreEngine'][_0x3d33b5(0x225)][_0x3d33b5(0x656)]['AntiZoomPictures'])return;if(this[_0x3d33b5(0x890)]===this[_0x3d33b5(0x589)]['x']&&this[_0x3d33b5(0x87c)]===this[_0x3d33b5(0x589)]['y'])return;this[_0x3d33b5(0x721)](),this[_0x3d33b5(0x890)]=this[_0x3d33b5(0x589)]['x'],this['_cacheScaleY']=this[_0x3d33b5(0x589)]['y'];},Spriteset_Base['prototype'][_0x5ca092(0x721)]=function(){const _0x48d1d3=_0x5ca092;if(SceneManager[_0x48d1d3(0x440)]()&&Spriteset_Map['DETACH_PICTURE_CONTAINER'])return;else{if(SceneManager[_0x48d1d3(0x40a)]()&&Spriteset_Battle[_0x48d1d3(0x30a)])return;}this[_0x48d1d3(0x589)]['x']!==0x0&&(this[_0x48d1d3(0x250)][_0x48d1d3(0x589)]['x']=0x1/this[_0x48d1d3(0x589)]['x'],this[_0x48d1d3(0x250)]['x']=-(this['x']/this[_0x48d1d3(0x589)]['x'])),this['scale']['y']!==0x0&&(this[_0x48d1d3(0x250)][_0x48d1d3(0x589)]['y']=0x1/this[_0x48d1d3(0x589)]['y'],this[_0x48d1d3(0x250)]['y']=-(this['y']/this[_0x48d1d3(0x589)]['y']));},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x251)]=Spriteset_Base['prototype'][_0x5ca092(0x91d)],Spriteset_Base['prototype']['updatePosition']=function(){const _0x55a08b=_0x5ca092;VisuMZ[_0x55a08b(0x865)][_0x55a08b(0x251)]['call'](this),this[_0x55a08b(0x840)]();},Spriteset_Base['prototype'][_0x5ca092(0x840)]=function(){const _0x4154d2=_0x5ca092;if(!$gameScreen)return;if($gameScreen[_0x4154d2(0x687)]<=0x0)return;this['x']-=Math[_0x4154d2(0x75e)]($gameScreen['shake']());const _0x5225df=$gameScreen['getCoreEngineScreenShakeStyle']();switch($gameScreen[_0x4154d2(0x4b1)]()){case'original':this[_0x4154d2(0x444)]();break;case _0x4154d2(0x55f):this['updatePositionCoreEngineShakeHorz']();break;case _0x4154d2(0x4a0):this[_0x4154d2(0x397)]();break;default:this['updatePositionCoreEngineShakeRand']();break;}},Spriteset_Base[_0x5ca092(0x923)]['updatePositionCoreEngineShakeOriginal']=function(){const _0x51ba61=_0x5ca092,_0x37cc59=VisuMZ['CoreEngine'][_0x51ba61(0x225)]['ScreenShake'];if(_0x37cc59&&_0x37cc59[_0x51ba61(0x2c6)])return _0x37cc59[_0x51ba61(0x2c6)][_0x51ba61(0x481)](this);this['x']+=Math[_0x51ba61(0x75e)]($gameScreen[_0x51ba61(0x4dd)]());},Spriteset_Base[_0x5ca092(0x923)]['updatePositionCoreEngineShakeRand']=function(){const _0x3e81bc=_0x5ca092,_0x1d6ce1=VisuMZ[_0x3e81bc(0x865)]['Settings'][_0x3e81bc(0x8d8)];if(_0x1d6ce1&&_0x1d6ce1[_0x3e81bc(0x3ba)])return _0x1d6ce1[_0x3e81bc(0x3ba)][_0x3e81bc(0x481)](this);const _0x4dd2fb=$gameScreen['_shakePower']*0.75,_0x506945=$gameScreen[_0x3e81bc(0x309)]*0.6,_0x43e9fa=$gameScreen[_0x3e81bc(0x687)];this['x']+=Math[_0x3e81bc(0x75e)](Math[_0x3e81bc(0x2b4)](_0x4dd2fb)-Math[_0x3e81bc(0x2b4)](_0x506945))*(Math[_0x3e81bc(0x667)](_0x43e9fa,0x1e)*0.5),this['y']+=Math['round'](Math[_0x3e81bc(0x2b4)](_0x4dd2fb)-Math['randomInt'](_0x506945))*(Math[_0x3e81bc(0x667)](_0x43e9fa,0x1e)*0.5);},Spriteset_Base[_0x5ca092(0x923)][_0x5ca092(0x24b)]=function(){const _0x5c805b=_0x5ca092,_0x595486=VisuMZ[_0x5c805b(0x865)]['Settings']['ScreenShake'];if(_0x595486&&_0x595486[_0x5c805b(0x487)])return _0x595486[_0x5c805b(0x487)]['call'](this);const _0x15c9d3=$gameScreen[_0x5c805b(0x4d8)]*0.75,_0x41ebfe=$gameScreen[_0x5c805b(0x309)]*0.6,_0x3a6598=$gameScreen['_shakeDuration'];this['x']+=Math['round'](Math[_0x5c805b(0x2b4)](_0x15c9d3)-Math['randomInt'](_0x41ebfe))*(Math[_0x5c805b(0x667)](_0x3a6598,0x1e)*0.5);},Spriteset_Base[_0x5ca092(0x923)]['updatePositionCoreEngineShakeVert']=function(){const _0x6a8f2b=_0x5ca092,_0x4c2248=VisuMZ['CoreEngine'][_0x6a8f2b(0x225)][_0x6a8f2b(0x8d8)];if(_0x4c2248&&_0x4c2248[_0x6a8f2b(0x83f)])return _0x4c2248[_0x6a8f2b(0x83f)][_0x6a8f2b(0x481)](this);const _0x39a412=$gameScreen['_shakePower']*0.75,_0x26222f=$gameScreen['_shakeSpeed']*0.6,_0x21dda5=$gameScreen[_0x6a8f2b(0x687)];this['y']+=Math[_0x6a8f2b(0x75e)](Math[_0x6a8f2b(0x2b4)](_0x39a412)-Math[_0x6a8f2b(0x2b4)](_0x26222f))*(Math[_0x6a8f2b(0x667)](_0x21dda5,0x1e)*0.5);},Spriteset_Base[_0x5ca092(0x923)]['updateFauxAnimations']=function(){const _0x356d48=_0x5ca092;for(const _0x12d80e of this['_fauxAnimationSprites']){!_0x12d80e[_0x356d48(0x554)]()&&this[_0x356d48(0x25f)](_0x12d80e);}this[_0x356d48(0x5e3)]();},Spriteset_Base[_0x5ca092(0x923)][_0x5ca092(0x5e3)]=function(){const _0x26ba06=_0x5ca092;for(;;){const _0x3ee326=$gameTemp[_0x26ba06(0x911)]();if(_0x3ee326)this[_0x26ba06(0x453)](_0x3ee326);else break;}},Spriteset_Base[_0x5ca092(0x923)]['createFauxAnimation']=function(_0x83759f){const _0x1da87f=_0x5ca092,_0x4a9b10=$dataAnimations[_0x83759f[_0x1da87f(0x5e0)]],_0x483d17=_0x83759f[_0x1da87f(0x46c)],_0x234d12=_0x83759f['mirror'],_0x38ab1e=_0x83759f['mute'];let _0x1e9ea6=this[_0x1da87f(0x900)]();const _0x4946e5=this['animationNextDelay']();if(this['isAnimationForEach'](_0x4a9b10))for(const _0xa69f58 of _0x483d17){this[_0x1da87f(0x322)]([_0xa69f58],_0x4a9b10,_0x234d12,_0x1e9ea6,_0x38ab1e),_0x1e9ea6+=_0x4946e5;}else this[_0x1da87f(0x322)](_0x483d17,_0x4a9b10,_0x234d12,_0x1e9ea6,_0x38ab1e);},Spriteset_Base[_0x5ca092(0x923)][_0x5ca092(0x702)]=function(_0x51d245,_0x389cd2,_0xbc2528,_0x23a0c9){const _0x2463a3=_0x5ca092,_0x89fd0b=this['isMVAnimation'](_0x389cd2),_0x1b6ea0=new(_0x89fd0b?Sprite_AnimationMV:Sprite_Animation)(),_0x341950=this['makeTargetSprites'](_0x51d245),_0xd29b28=this[_0x2463a3(0x900)](),_0x262d21=_0x23a0c9>_0xd29b28?this['lastAnimationSprite']():null;this[_0x2463a3(0x330)](_0x51d245[0x0])&&(_0xbc2528=!_0xbc2528),_0x1b6ea0[_0x2463a3(0x980)]=_0x51d245,_0x1b6ea0[_0x2463a3(0x495)](_0x341950,_0x389cd2,_0xbc2528,_0x23a0c9,_0x262d21),this[_0x2463a3(0x83d)](_0x1b6ea0),this[_0x2463a3(0x928)][_0x2463a3(0x4a2)](_0x1b6ea0);},Spriteset_Base[_0x5ca092(0x923)][_0x5ca092(0x322)]=function(_0x2a2607,_0x5de205,_0x195c4a,_0x1e65fa,_0x30bc0a){const _0x456820=_0x5ca092,_0x262f3b=this[_0x456820(0x8c2)](_0x5de205),_0x55c0f1=new(_0x262f3b?Sprite_AnimationMV:Sprite_Animation)(),_0x5725ec=this[_0x456820(0x509)](_0x2a2607);this[_0x456820(0x330)](_0x2a2607[0x0])&&(_0x195c4a=!_0x195c4a);_0x55c0f1[_0x456820(0x980)]=_0x2a2607,_0x55c0f1[_0x456820(0x495)](_0x5725ec,_0x5de205,_0x195c4a,_0x1e65fa),_0x55c0f1['setMute'](_0x30bc0a),this[_0x456820(0x83d)](_0x55c0f1);if(this[_0x456820(0x928)])this[_0x456820(0x928)]['remove'](_0x55c0f1);this['_fauxAnimationSprites'][_0x456820(0x4a2)](_0x55c0f1);},Spriteset_Base[_0x5ca092(0x923)][_0x5ca092(0x83d)]=function(_0x369bd5){const _0xa3a8c7=_0x5ca092;this[_0xa3a8c7(0x21e)][_0xa3a8c7(0x61a)](_0x369bd5);},Spriteset_Base[_0x5ca092(0x923)][_0x5ca092(0x571)]=function(_0x11cc7f){const _0x3e848f=_0x5ca092;this[_0x3e848f(0x928)]['remove'](_0x11cc7f),this['removeAnimationFromContainer'](_0x11cc7f);for(const _0x1a2723 of _0x11cc7f[_0x3e848f(0x980)]){_0x1a2723[_0x3e848f(0x532)]&&_0x1a2723[_0x3e848f(0x532)]();}_0x11cc7f[_0x3e848f(0x3ae)]();},Spriteset_Base['prototype'][_0x5ca092(0x25f)]=function(_0x1ec058){const _0x4cf296=_0x5ca092;this[_0x4cf296(0x680)]['remove'](_0x1ec058),this['removeAnimationFromContainer'](_0x1ec058);for(const _0x502bcb of _0x1ec058['targetObjects']){_0x502bcb[_0x4cf296(0x532)]&&_0x502bcb[_0x4cf296(0x532)]();}_0x1ec058[_0x4cf296(0x3ae)]();},Spriteset_Base[_0x5ca092(0x923)]['removeAnimationFromContainer']=function(_0x4142ad){const _0x313475=_0x5ca092;this[_0x313475(0x21e)][_0x313475(0x851)](_0x4142ad);},Spriteset_Base[_0x5ca092(0x923)]['removeAllFauxAnimations']=function(){const _0x5b7b16=_0x5ca092;for(const _0x4da769 of this[_0x5b7b16(0x680)]){this[_0x5b7b16(0x25f)](_0x4da769);}},Spriteset_Base['prototype'][_0x5ca092(0x488)]=function(){const _0x3a4d43=_0x5ca092;return this[_0x3a4d43(0x680)][_0x3a4d43(0x839)]>0x0;},Spriteset_Base[_0x5ca092(0x923)]['updatePointAnimations']=function(){const _0x26babb=_0x5ca092;for(const _0x5bd5a6 of this[_0x26babb(0x328)]){!_0x5bd5a6[_0x26babb(0x554)]()&&this[_0x26babb(0x805)](_0x5bd5a6);}this[_0x26babb(0x788)]();},Spriteset_Base[_0x5ca092(0x923)][_0x5ca092(0x788)]=function(){const _0x341903=_0x5ca092;for(;;){const _0x44d1fc=$gameTemp[_0x341903(0x85b)]();if(_0x44d1fc)this[_0x341903(0x265)](_0x44d1fc);else break;}},Spriteset_Base[_0x5ca092(0x923)][_0x5ca092(0x265)]=function(_0x15e19b){const _0x204df3=_0x5ca092,_0x4de0b4=$dataAnimations[_0x15e19b[_0x204df3(0x5e0)]],_0x99a1d4=this['createPointAnimationTargets'](_0x15e19b),_0x12a920=_0x15e19b[_0x204df3(0x4d6)],_0x83e002=_0x15e19b[_0x204df3(0x353)];let _0x3c88b3=this[_0x204df3(0x900)]();const _0x1bf46b=this['animationNextDelay']();if(this[_0x204df3(0x967)](_0x4de0b4))for(const _0x32471b of _0x99a1d4){this[_0x204df3(0x428)]([_0x32471b],_0x4de0b4,_0x12a920,_0x3c88b3,_0x83e002),_0x3c88b3+=_0x1bf46b;}else this[_0x204df3(0x428)](_0x99a1d4,_0x4de0b4,_0x12a920,_0x3c88b3,_0x83e002);},Spriteset_Base[_0x5ca092(0x923)]['createPointAnimationTargets']=function(_0x2c8cc7){const _0x2f06b0=_0x5ca092,_0x5ae41f=new Sprite_Clickable(),_0x2a92df=this[_0x2f06b0(0x651)]();_0x5ae41f['x']=_0x2c8cc7['x']-_0x2a92df['x'],_0x5ae41f['y']=_0x2c8cc7['y']-_0x2a92df['y'],_0x5ae41f['z']=0x64;const _0x4f2058=this[_0x2f06b0(0x651)]();return _0x4f2058[_0x2f06b0(0x61a)](_0x5ae41f),[_0x5ae41f];},Spriteset_Base[_0x5ca092(0x923)][_0x5ca092(0x651)]=function(){return this;},Spriteset_Map[_0x5ca092(0x923)][_0x5ca092(0x651)]=function(){const _0x231165=_0x5ca092;return this[_0x231165(0x5e7)]||this;},Spriteset_Battle[_0x5ca092(0x923)]['getPointAnimationLayer']=function(){const _0x36c4ca=_0x5ca092;return this[_0x36c4ca(0x5a1)]||this;},Spriteset_Base['prototype'][_0x5ca092(0x428)]=function(_0x298a95,_0x53c41f,_0x336b9e,_0x3bb677,_0x485bec){const _0xaef097=_0x5ca092,_0x46138c=this[_0xaef097(0x8c2)](_0x53c41f),_0x3e031a=new(_0x46138c?Sprite_AnimationMV:Sprite_Animation)();_0x3e031a[_0xaef097(0x980)]=_0x298a95,_0x3e031a[_0xaef097(0x495)](_0x298a95,_0x53c41f,_0x336b9e,_0x3bb677),_0x3e031a[_0xaef097(0x46a)](_0x485bec),this[_0xaef097(0x83d)](_0x3e031a),this[_0xaef097(0x328)][_0xaef097(0x4a2)](_0x3e031a);},Spriteset_Base['prototype'][_0x5ca092(0x805)]=function(_0x5c9512){const _0x2499a7=_0x5ca092;this[_0x2499a7(0x328)]['remove'](_0x5c9512),this[_0x2499a7(0x21e)]['removeChild'](_0x5c9512);for(const _0x1096bd of _0x5c9512[_0x2499a7(0x980)]){_0x1096bd[_0x2499a7(0x532)]&&_0x1096bd[_0x2499a7(0x532)]();const _0x215442=this[_0x2499a7(0x651)]();if(_0x215442)_0x215442[_0x2499a7(0x851)](_0x1096bd);}_0x5c9512[_0x2499a7(0x3ae)]();},Spriteset_Base[_0x5ca092(0x923)][_0x5ca092(0x399)]=function(){const _0x6c4ed4=_0x5ca092;for(const _0x447a37 of this['_pointAnimationSprites']){this[_0x6c4ed4(0x805)](_0x447a37);}},Spriteset_Base[_0x5ca092(0x923)]['isPointAnimationPlaying']=function(){const _0x145b30=_0x5ca092;return this[_0x145b30(0x328)][_0x145b30(0x839)]>0x0;},VisuMZ[_0x5ca092(0x865)]['Spriteset_Base_isAnimationPlaying']=Spriteset_Base[_0x5ca092(0x923)][_0x5ca092(0x699)],Spriteset_Base['prototype'][_0x5ca092(0x699)]=function(){const _0x562889=_0x5ca092;return VisuMZ[_0x562889(0x865)][_0x562889(0x594)][_0x562889(0x481)](this)||this[_0x562889(0x745)]();},Spriteset_Map[_0x5ca092(0x30a)]=VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x225)][_0x5ca092(0x656)][_0x5ca092(0x723)]||![],VisuMZ['CoreEngine'][_0x5ca092(0x883)]=Scene_Map[_0x5ca092(0x923)]['createSpriteset'],Scene_Map[_0x5ca092(0x923)][_0x5ca092(0x29d)]=function(){const _0x2c84db=_0x5ca092;VisuMZ[_0x2c84db(0x865)]['Scene_Map_createSpriteset_detach'][_0x2c84db(0x481)](this);if(!Spriteset_Map[_0x2c84db(0x30a)])return;const _0x518dff=this[_0x2c84db(0x5ab)];if(!_0x518dff)return;this['_pictureContainer']=_0x518dff[_0x2c84db(0x250)];if(!this['_pictureContainer'])return;this[_0x2c84db(0x61a)](this[_0x2c84db(0x250)]);},VisuMZ[_0x5ca092(0x865)]['Spriteset_Map_createTilemap']=Spriteset_Map[_0x5ca092(0x923)]['createTilemap'],Spriteset_Map[_0x5ca092(0x923)][_0x5ca092(0x4fe)]=function(){const _0x5ee651=_0x5ca092;VisuMZ[_0x5ee651(0x865)][_0x5ee651(0x588)]['call'](this),this['createTileExtendSprites']();},Spriteset_Map[_0x5ca092(0x923)]['createTileExtendSprites']=function(){const _0x5de34f=_0x5ca092,_0x4fd60b=$gameMap[_0x5de34f(0x4eb)]();if(!_0x4fd60b)return;const _0x448bdf=$gameMap['getTileExtendTerrainTags']();if(Object['keys'](_0x448bdf)[_0x5de34f(0x839)]<=0x0)return;const _0x581f8f=$gameMap[_0x5de34f(0x392)]();this[_0x5de34f(0x678)]=this[_0x5de34f(0x678)]||[];for(let _0xa48789=0x0;_0xa48789<$gameMap[_0x5de34f(0x2a0)]();_0xa48789++){for(let _0x44c41f=0x0;_0x44c41f<$gameMap[_0x5de34f(0x7b7)]();_0x44c41f++){for(const _0x15f4b3 of $gameMap[_0x5de34f(0x629)](_0x44c41f,_0xa48789)){const _0x5f1316=_0x581f8f[_0x15f4b3]>>0xc,_0xb01c91=_0x448bdf[_0x5f1316]||0x0;if(_0xb01c91<=0x0)continue;this['createExtendedTileSprite'](_0x44c41f,_0xa48789,_0x15f4b3,_0xb01c91);}}}},Spriteset_Map[_0x5ca092(0x923)][_0x5ca092(0x1dc)]=function(){const _0xd1677a=_0x5ca092;this[_0xd1677a(0x678)]=this[_0xd1677a(0x678)]||[];for(const _0x9c2d58 of this[_0xd1677a(0x678)]){this[_0xd1677a(0x5e7)]['removeChild'](_0x9c2d58);}this[_0xd1677a(0x678)]=[];},Spriteset_Map['prototype'][_0x5ca092(0x644)]=function(_0xd820c9,_0x375b8c,_0x530ba8,_0x21bee1){const _0x56936b=_0x5ca092,_0x49186c=new Sprite_ExtendedTile(_0xd820c9,_0x375b8c,_0x530ba8,_0x21bee1),_0x2675c0=$gameMap[_0x56936b(0x392)]();_0x2675c0[_0x530ba8]&0x10?_0x49186c['z']=0x4:_0x49186c['z']=0x3,this[_0x56936b(0x5e7)]['addChild'](_0x49186c),this['_tileExtendSprites'][_0x56936b(0x4a2)](_0x49186c);},VisuMZ[_0x5ca092(0x865)]['Tilemap_addSpotTile']=Tilemap[_0x5ca092(0x923)]['_addSpotTile'],Tilemap['prototype']['_addSpotTile']=function(_0x3f84e2,_0x557d9f,_0x44eba2){const _0x39a5b7=_0x5ca092;if($gameMap[_0x39a5b7(0x68d)](_0x3f84e2))return;VisuMZ['CoreEngine'][_0x39a5b7(0x301)]['call'](this,_0x3f84e2,_0x557d9f,_0x44eba2);},Spriteset_Battle[_0x5ca092(0x30a)]=VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x225)][_0x5ca092(0x656)][_0x5ca092(0x6f9)]||![],VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x2d1)]=Scene_Battle['prototype']['createSpriteset'],Scene_Battle[_0x5ca092(0x923)][_0x5ca092(0x29d)]=function(){const _0x50e392=_0x5ca092;VisuMZ['CoreEngine'][_0x50e392(0x2d1)][_0x50e392(0x481)](this);if(!Spriteset_Battle[_0x50e392(0x30a)])return;const _0x2fc918=this['_spriteset'];if(!_0x2fc918)return;this[_0x50e392(0x250)]=_0x2fc918[_0x50e392(0x250)];if(!this['_pictureContainer'])return;this[_0x50e392(0x61a)](this[_0x50e392(0x250)]);},Spriteset_Battle['prototype']['createBackground']=function(){const _0x3cf242=_0x5ca092;this['_backgroundFilter']=new PIXI['filters'][(_0x3cf242(0x42c))](clamp=!![]),this[_0x3cf242(0x955)]=new Sprite(),this[_0x3cf242(0x955)][_0x3cf242(0x625)]=SceneManager[_0x3cf242(0x1fb)](),this['_backgroundSprite']['filters']=[this[_0x3cf242(0x6e1)]],this['_baseSprite'][_0x3cf242(0x61a)](this[_0x3cf242(0x955)]);},VisuMZ['CoreEngine'][_0x5ca092(0x922)]=Spriteset_Battle[_0x5ca092(0x923)][_0x5ca092(0x61c)],Spriteset_Battle['prototype'][_0x5ca092(0x61c)]=function(){const _0x5f255f=_0x5ca092;this[_0x5f255f(0x6ae)]()&&this[_0x5f255f(0x901)](),VisuMZ['CoreEngine'][_0x5f255f(0x922)][_0x5f255f(0x481)](this);},Spriteset_Battle['prototype'][_0x5ca092(0x6ae)]=function(){const _0x20bc81=_0x5ca092,_0x2591ee=VisuMZ[_0x20bc81(0x865)]['Settings'][_0x20bc81(0x6ed)];if(!_0x2591ee)return![];if(Utils[_0x20bc81(0x61f)]>='1.3.0'&&!_0x2591ee['RepositionEnemies130'])return![];return _0x2591ee[_0x20bc81(0x47a)];},Spriteset_Battle[_0x5ca092(0x923)][_0x5ca092(0x901)]=function(){const _0x34600c=_0x5ca092;for(member of $gameTroop[_0x34600c(0x5e5)]()){member[_0x34600c(0x482)]();}},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x60b)]=Window_Base[_0x5ca092(0x923)]['initialize'],Window_Base['prototype'][_0x5ca092(0x44e)]=function(_0x5bd449){const _0x1d30da=_0x5ca092;_0x5bd449['x']=Math[_0x1d30da(0x75e)](_0x5bd449['x']),_0x5bd449['y']=Math[_0x1d30da(0x75e)](_0x5bd449['y']),_0x5bd449[_0x1d30da(0x7b7)]=Math['round'](_0x5bd449[_0x1d30da(0x7b7)]),_0x5bd449[_0x1d30da(0x2a0)]=Math[_0x1d30da(0x75e)](_0x5bd449['height']),this[_0x1d30da(0x2a4)](),VisuMZ[_0x1d30da(0x865)][_0x1d30da(0x60b)]['call'](this,_0x5bd449),this[_0x1d30da(0x868)]();},Window_Base[_0x5ca092(0x923)][_0x5ca092(0x2a4)]=function(){const _0x54d7e0=_0x5ca092;this['_digitGrouping']=VisuMZ['CoreEngine'][_0x54d7e0(0x225)][_0x54d7e0(0x656)]['DigitGroupingStandardText'],this[_0x54d7e0(0x4ff)]=VisuMZ[_0x54d7e0(0x865)][_0x54d7e0(0x225)][_0x54d7e0(0x656)]['DigitGroupingExText'];},Window_Base[_0x5ca092(0x923)]['lineHeight']=function(){const _0x5eb3fb=_0x5ca092;return VisuMZ[_0x5eb3fb(0x865)][_0x5eb3fb(0x225)]['Window'][_0x5eb3fb(0x244)];},Window_Base['prototype'][_0x5ca092(0x3c8)]=function(){const _0x56d29d=_0x5ca092;return VisuMZ['CoreEngine'][_0x56d29d(0x225)]['Window'][_0x56d29d(0x241)];},Window_Base[_0x5ca092(0x923)][_0x5ca092(0x29f)]=function(){const _0x14370f=_0x5ca092;$gameSystem[_0x14370f(0x585)]?this[_0x14370f(0x8e5)]=$gameSystem[_0x14370f(0x585)]():this['backOpacity']=VisuMZ['CoreEngine'][_0x14370f(0x225)][_0x14370f(0x57c)]['BackOpacity'];},Window_Base['prototype'][_0x5ca092(0x3f4)]=function(){const _0x2c84a3=_0x5ca092;return VisuMZ[_0x2c84a3(0x865)][_0x2c84a3(0x225)][_0x2c84a3(0x57c)][_0x2c84a3(0x236)];},Window_Base[_0x5ca092(0x923)][_0x5ca092(0x262)]=function(){const _0x28b90e=_0x5ca092;return VisuMZ['CoreEngine'][_0x28b90e(0x225)][_0x28b90e(0x57c)][_0x28b90e(0x857)];},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x372)]=Window_Base[_0x5ca092(0x923)][_0x5ca092(0x471)],Window_Base[_0x5ca092(0x923)][_0x5ca092(0x471)]=function(){const _0x9abc7e=_0x5ca092;VisuMZ['CoreEngine'][_0x9abc7e(0x372)][_0x9abc7e(0x481)](this),this[_0x9abc7e(0x51e)]();},Window_Base[_0x5ca092(0x923)][_0x5ca092(0x53d)]=function(){const _0x2a8777=_0x5ca092;this['_opening']&&(this[_0x2a8777(0x65e)]+=this['openingSpeed'](),this[_0x2a8777(0x895)]()&&(this[_0x2a8777(0x277)]=![]));},Window_Base[_0x5ca092(0x923)]['updateClose']=function(){const _0x4d0a23=_0x5ca092;this[_0x4d0a23(0x1c6)]&&(this['openness']-=this['openingSpeed'](),this[_0x4d0a23(0x43c)]()&&(this[_0x4d0a23(0x1c6)]=![]));},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x20e)]=Window_Base[_0x5ca092(0x923)]['drawText'],Window_Base[_0x5ca092(0x923)][_0x5ca092(0x286)]=function(_0x2ad05c,_0x5796c5,_0x5cfa46,_0x3bc75b,_0x26d39d){const _0x30075b=_0x5ca092;if(this[_0x30075b(0x801)]())_0x2ad05c=VisuMZ['GroupDigits'](_0x2ad05c);VisuMZ['CoreEngine'][_0x30075b(0x20e)][_0x30075b(0x481)](this,_0x2ad05c,_0x5796c5,_0x5cfa46,_0x3bc75b,_0x26d39d);},Window_Base[_0x5ca092(0x923)][_0x5ca092(0x801)]=function(){const _0x6b7461=_0x5ca092;return this[_0x6b7461(0x413)];},VisuMZ['CoreEngine'][_0x5ca092(0x55e)]=Window_Base[_0x5ca092(0x923)][_0x5ca092(0x90f)],Window_Base[_0x5ca092(0x923)][_0x5ca092(0x90f)]=function(_0x14eb88,_0x5020b4,_0x554426,_0x52da0a){const _0x187c23=_0x5ca092;var _0x5c28c0=VisuMZ[_0x187c23(0x865)]['Window_Base_createTextState'][_0x187c23(0x481)](this,_0x14eb88,_0x5020b4,_0x554426,_0x52da0a);if(this[_0x187c23(0x748)]())_0x5c28c0[_0x187c23(0x48d)]=String(VisuMZ['GroupDigits'](_0x5c28c0[_0x187c23(0x48d)]))||'';return _0x5c28c0;},Window_Base['prototype']['useDigitGroupingEx']=function(){const _0x26a2fd=_0x5ca092;return this[_0x26a2fd(0x4ff)];},Window_Base[_0x5ca092(0x923)][_0x5ca092(0x626)]=function(_0x130a0b){const _0x5699e0=_0x5ca092;this[_0x5699e0(0x413)]=_0x130a0b;},Window_Base[_0x5ca092(0x923)][_0x5ca092(0x41d)]=function(_0x3bb52e){this['_digitGroupingEx']=_0x3bb52e;},VisuMZ['CoreEngine'][_0x5ca092(0x1df)]=Window_Base[_0x5ca092(0x923)][_0x5ca092(0x2a6)],Window_Base[_0x5ca092(0x923)]['drawIcon']=function(_0x4c3ee8,_0x258955,_0x2e32af){const _0x4c9fd3=_0x5ca092;_0x258955=Math[_0x4c9fd3(0x75e)](_0x258955),_0x2e32af=Math[_0x4c9fd3(0x75e)](_0x2e32af),VisuMZ['CoreEngine']['Window_Base_drawIcon'][_0x4c9fd3(0x481)](this,_0x4c3ee8,_0x258955,_0x2e32af);},VisuMZ['CoreEngine'][_0x5ca092(0x2cc)]=Window_Base['prototype']['drawFace'],Window_Base[_0x5ca092(0x923)]['drawFace']=function(_0x15d2ed,_0xd41db3,_0x751faa,_0x5954e6,_0x45fb6e,_0x5a3a9f){const _0x23c102=_0x5ca092;_0x45fb6e=_0x45fb6e||ImageManager[_0x23c102(0x90a)],_0x5a3a9f=_0x5a3a9f||ImageManager[_0x23c102(0x213)],_0x751faa=Math[_0x23c102(0x75e)](_0x751faa),_0x5954e6=Math[_0x23c102(0x75e)](_0x5954e6),_0x45fb6e=Math[_0x23c102(0x75e)](_0x45fb6e),_0x5a3a9f=Math[_0x23c102(0x75e)](_0x5a3a9f),VisuMZ[_0x23c102(0x865)]['Window_Base_drawFace'][_0x23c102(0x481)](this,_0x15d2ed,_0xd41db3,_0x751faa,_0x5954e6,_0x45fb6e,_0x5a3a9f);},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x735)]=Window_Base[_0x5ca092(0x923)][_0x5ca092(0x8a2)],Window_Base['prototype']['drawCharacter']=function(_0x572cfa,_0x1c37a0,_0x4ea595,_0x560923){const _0x20e886=_0x5ca092;_0x4ea595=Math[_0x20e886(0x75e)](_0x4ea595),_0x560923=Math[_0x20e886(0x75e)](_0x560923),VisuMZ[_0x20e886(0x865)][_0x20e886(0x735)][_0x20e886(0x481)](this,_0x572cfa,_0x1c37a0,_0x4ea595,_0x560923);},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x7ea)]=Window_Selectable['prototype'][_0x5ca092(0x97e)],Window_Selectable[_0x5ca092(0x923)][_0x5ca092(0x97e)]=function(_0x58c8fb){const _0x28658d=_0x5ca092;let _0x2df8f3=VisuMZ[_0x28658d(0x865)][_0x28658d(0x7ea)][_0x28658d(0x481)](this,_0x58c8fb);return _0x2df8f3['x']=Math[_0x28658d(0x75e)](_0x2df8f3['x']),_0x2df8f3['y']=Math['round'](_0x2df8f3['y']),_0x2df8f3[_0x28658d(0x7b7)]=Math[_0x28658d(0x75e)](_0x2df8f3[_0x28658d(0x7b7)]),_0x2df8f3[_0x28658d(0x2a0)]=Math[_0x28658d(0x75e)](_0x2df8f3[_0x28658d(0x2a0)]),_0x2df8f3;},VisuMZ[_0x5ca092(0x865)]['Window_StatusBase_drawActorSimpleStatus']=Window_StatusBase[_0x5ca092(0x923)]['drawActorSimpleStatus'],Window_StatusBase[_0x5ca092(0x923)][_0x5ca092(0x6df)]=function(_0xc8144f,_0x47dced,_0x30d8e4){const _0x391ecc=_0x5ca092;_0x47dced=Math['round'](_0x47dced),_0x30d8e4=Math['round'](_0x30d8e4),VisuMZ[_0x391ecc(0x865)]['Window_StatusBase_drawActorSimpleStatus'][_0x391ecc(0x481)](this,_0xc8144f,_0x47dced,_0x30d8e4);},Window_Base[_0x5ca092(0x923)]['initCoreEasing']=function(){const _0xefc2d7=_0x5ca092;this[_0xefc2d7(0x280)]={'duration':0x0,'wholeDuration':0x0,'type':'LINEAR','targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0xefc2d7(0x589)]['x'],'targetScaleY':this[_0xefc2d7(0x589)]['y'],'targetOpacity':this[_0xefc2d7(0x795)],'targetBackOpacity':this[_0xefc2d7(0x8e5)],'targetContentsOpacity':this['contentsOpacity']};},Window_Base[_0x5ca092(0x923)][_0x5ca092(0x51e)]=function(){const _0x4d2c61=_0x5ca092;if(!this[_0x4d2c61(0x280)])return;if(this[_0x4d2c61(0x280)]['duration']<=0x0)return;this['x']=this[_0x4d2c61(0x210)](this['x'],this[_0x4d2c61(0x280)][_0x4d2c61(0x743)]),this['y']=this[_0x4d2c61(0x210)](this['y'],this[_0x4d2c61(0x280)][_0x4d2c61(0x278)]),this['scale']['x']=this[_0x4d2c61(0x210)](this[_0x4d2c61(0x589)]['x'],this[_0x4d2c61(0x280)][_0x4d2c61(0x243)]),this[_0x4d2c61(0x589)]['y']=this['applyCoreEasing'](this['scale']['y'],this['_coreEasing'][_0x4d2c61(0x6b3)]),this[_0x4d2c61(0x795)]=this[_0x4d2c61(0x210)](this[_0x4d2c61(0x795)],this['_coreEasing'][_0x4d2c61(0x6b7)]),this[_0x4d2c61(0x8e5)]=this[_0x4d2c61(0x210)](this[_0x4d2c61(0x8e5)],this[_0x4d2c61(0x280)][_0x4d2c61(0x36c)]),this[_0x4d2c61(0x50e)]=this['applyCoreEasing'](this[_0x4d2c61(0x50e)],this[_0x4d2c61(0x280)][_0x4d2c61(0x28e)]),this[_0x4d2c61(0x280)][_0x4d2c61(0x97b)]--;},Window_Base[_0x5ca092(0x923)][_0x5ca092(0x210)]=function(_0x4d2020,_0x4d0eff){const _0x325a24=_0x5ca092;if(!this['_coreEasing'])return _0x4d0eff;const _0x5716d8=this[_0x325a24(0x280)][_0x325a24(0x97b)],_0x16d067=this[_0x325a24(0x280)][_0x325a24(0x4c0)],_0x4d7d39=this['calcCoreEasing']((_0x16d067-_0x5716d8)/_0x16d067),_0x67d0ec=this[_0x325a24(0x48b)]((_0x16d067-_0x5716d8+0x1)/_0x16d067),_0x5d4686=(_0x4d2020-_0x4d0eff*_0x4d7d39)/(0x1-_0x4d7d39);return _0x5d4686+(_0x4d0eff-_0x5d4686)*_0x67d0ec;},Window_Base['prototype']['calcCoreEasing']=function(_0x2af255){const _0x17ac65=_0x5ca092;if(!this['_coreEasing'])return _0x2af255;return VisuMZ['ApplyEasing'](_0x2af255,this[_0x17ac65(0x280)][_0x17ac65(0x425)]||_0x17ac65(0x448));},Window_Base[_0x5ca092(0x923)]['anchorCoreEasing']=function(_0x110816,_0x51bd97){const _0x4e5469=_0x5ca092;if(!this[_0x4e5469(0x280)])return;this['x']=this[_0x4e5469(0x280)][_0x4e5469(0x743)],this['y']=this['_coreEasing'][_0x4e5469(0x278)],this[_0x4e5469(0x589)]['x']=this[_0x4e5469(0x280)][_0x4e5469(0x243)],this[_0x4e5469(0x589)]['y']=this[_0x4e5469(0x280)][_0x4e5469(0x6b3)],this[_0x4e5469(0x795)]=this[_0x4e5469(0x280)][_0x4e5469(0x6b7)],this[_0x4e5469(0x8e5)]=this[_0x4e5469(0x280)][_0x4e5469(0x36c)],this[_0x4e5469(0x50e)]=this[_0x4e5469(0x280)][_0x4e5469(0x28e)],this[_0x4e5469(0x85e)](_0x110816,_0x51bd97,this['x'],this['y'],this[_0x4e5469(0x589)]['x'],this[_0x4e5469(0x589)]['y'],this[_0x4e5469(0x795)],this[_0x4e5469(0x8e5)],this[_0x4e5469(0x50e)]);},Window_Base[_0x5ca092(0x923)][_0x5ca092(0x85e)]=function(_0x1d7834,_0x211c2e,_0x395cf6,_0x338257,_0x405547,_0x4cd2dc,_0x163428,_0x454bba,_0x2b6619){const _0x5d8400=_0x5ca092;this[_0x5d8400(0x280)]={'duration':_0x1d7834,'wholeDuration':_0x1d7834,'type':_0x211c2e,'targetX':_0x395cf6,'targetY':_0x338257,'targetScaleX':_0x405547,'targetScaleY':_0x4cd2dc,'targetOpacity':_0x163428,'targetBackOpacity':_0x454bba,'targetContentsOpacity':_0x2b6619};},Window_Base[_0x5ca092(0x923)]['drawCurrencyValue']=function(_0x552209,_0x2fded8,_0x5b8706,_0x2a1cfa,_0x364c2c){const _0x4815e0=_0x5ca092;this[_0x4815e0(0x8ae)](),this['contents']['fontSize']=VisuMZ[_0x4815e0(0x865)]['Settings'][_0x4815e0(0x462)][_0x4815e0(0x51f)];const _0x4ec9f8=VisuMZ[_0x4815e0(0x865)][_0x4815e0(0x225)][_0x4815e0(0x462)]['GoldIcon'];if(_0x4ec9f8>0x0&&_0x2fded8===TextManager[_0x4815e0(0x941)]){const _0x349e87=_0x2a1cfa+(this[_0x4815e0(0x2f6)]()-ImageManager[_0x4815e0(0x30c)])/0x2;this['drawIcon'](_0x4ec9f8,_0x5b8706+(_0x364c2c-ImageManager['iconWidth']),_0x349e87),_0x364c2c-=ImageManager[_0x4815e0(0x90c)]+0x4;}else this[_0x4815e0(0x57d)](ColorManager[_0x4815e0(0x58e)]()),this[_0x4815e0(0x286)](_0x2fded8,_0x5b8706,_0x2a1cfa,_0x364c2c,_0x4815e0(0x254)),_0x364c2c-=this[_0x4815e0(0x6b1)](_0x2fded8)+0x6;this[_0x4815e0(0x4f8)]();const _0x4ab122=this['textWidth'](this[_0x4815e0(0x413)]?VisuMZ[_0x4815e0(0x5d5)](_0x552209):_0x552209);_0x4ab122>_0x364c2c?this[_0x4815e0(0x286)](VisuMZ[_0x4815e0(0x865)][_0x4815e0(0x225)]['Gold'][_0x4815e0(0x6a3)],_0x5b8706,_0x2a1cfa,_0x364c2c,'right'):this['drawText'](_0x552209,_0x5b8706,_0x2a1cfa,_0x364c2c,'right'),this[_0x4815e0(0x8ae)]();},Window_Base[_0x5ca092(0x923)][_0x5ca092(0x291)]=function(_0x2a49c0,_0x3519d3,_0x321400,_0x34542b,_0x551be2){const _0x3d593f=_0x5ca092,_0x342262=ImageManager[_0x3d593f(0x712)](_0x3d593f(0x7af)),_0x189880=ImageManager['iconWidth'],_0x24c891=ImageManager[_0x3d593f(0x30c)],_0x4424c3=_0x2a49c0%0x10*_0x189880,_0x53c177=Math[_0x3d593f(0x229)](_0x2a49c0/0x10)*_0x24c891,_0x40a7e4=_0x34542b,_0x534ba5=_0x34542b;this[_0x3d593f(0x7d6)][_0x3d593f(0x768)][_0x3d593f(0x310)]=_0x551be2,this['contents'][_0x3d593f(0x6e6)](_0x342262,_0x4424c3,_0x53c177,_0x189880,_0x24c891,_0x3519d3,_0x321400,_0x40a7e4,_0x534ba5),this['contents'][_0x3d593f(0x768)]['imageSmoothingEnabled']=!![];},Window_Base[_0x5ca092(0x923)][_0x5ca092(0x582)]=function(_0x17c048,_0x242074,_0xbd40ca,_0x3d4a15,_0x100d1c,_0x2ba233){const _0x507c1d=_0x5ca092,_0x1de977=Math[_0x507c1d(0x229)]((_0xbd40ca-0x2)*_0x3d4a15),_0xd4b7fa=Sprite_Gauge['prototype'][_0x507c1d(0x390)][_0x507c1d(0x481)](this),_0x216ef1=_0x242074+this['lineHeight']()-_0xd4b7fa-0x2;this[_0x507c1d(0x7d6)][_0x507c1d(0x6bf)](_0x17c048,_0x216ef1,_0xbd40ca,_0xd4b7fa,ColorManager['gaugeBackColor']()),this[_0x507c1d(0x7d6)][_0x507c1d(0x954)](_0x17c048+0x1,_0x216ef1+0x1,_0x1de977,_0xd4b7fa-0x2,_0x100d1c,_0x2ba233);},Window_Scrollable[_0x5ca092(0x4de)]={'enabled':VisuMZ['CoreEngine'][_0x5ca092(0x225)]['Window'][_0x5ca092(0x4d1)]??!![],'thickness':VisuMZ['CoreEngine'][_0x5ca092(0x225)]['Window']['BarThickness']??0x2,'offset':VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x225)]['Window'][_0x5ca092(0x1c0)]??0x2,'bodyColor':VisuMZ[_0x5ca092(0x865)]['Settings']['Window'][_0x5ca092(0x82c)]??0x0,'offColor':VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x225)][_0x5ca092(0x57c)]['OffBarColor']??0x7,'offOpacity':VisuMZ['CoreEngine'][_0x5ca092(0x225)][_0x5ca092(0x57c)][_0x5ca092(0x394)]??0x80},Window_Base[_0x5ca092(0x923)][_0x5ca092(0x803)]=function(){const _0x29930a=_0x5ca092;return Window_Scrollable[_0x29930a(0x4de)]['enabled']&&Window_Scrollable[_0x29930a(0x4de)][_0x29930a(0x5f5)]>0x0;},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x934)]=Window_Base[_0x5ca092(0x923)][_0x5ca092(0x93b)],Window_Base['prototype'][_0x5ca092(0x93b)]=function(){const _0x33b9d5=_0x5ca092;VisuMZ[_0x33b9d5(0x865)][_0x33b9d5(0x934)]['call'](this),this[_0x33b9d5(0x8bf)](),this[_0x33b9d5(0x538)](!![]),this[_0x33b9d5(0x538)](![]);},Window_Base[_0x5ca092(0x923)][_0x5ca092(0x8bf)]=function(){const _0x1fb11a=_0x5ca092;if(!this[_0x1fb11a(0x803)]())return;if(this[_0x1fb11a(0x287)]||this[_0x1fb11a(0x445)])return;this[_0x1fb11a(0x56c)]={'horz':null,'vert':null,'maxHorz':null,'maxVert':null},this[_0x1fb11a(0x287)]=new Sprite(),this['_scrollBarVert']=new Sprite(),this[_0x1fb11a(0x61a)](this[_0x1fb11a(0x287)]),this[_0x1fb11a(0x61a)](this[_0x1fb11a(0x445)]);},Window_Base['prototype'][_0x5ca092(0x538)]=function(_0x42df24){const _0x37dbb9=_0x5ca092,_0x8eca98=_0x42df24?this[_0x37dbb9(0x287)]:this['_scrollBarVert'];if(!_0x8eca98)return;const _0xf5c12b=Window_Scrollable[_0x37dbb9(0x4de)],_0x2546c=_0xf5c12b[_0x37dbb9(0x5f5)],_0x6e7614=_0x42df24?this['innerWidth']-_0x2546c*0x2:_0x2546c,_0x48efef=_0x42df24?_0x2546c:this[_0x37dbb9(0x6b2)]-_0x2546c*0x2;_0x8eca98[_0x37dbb9(0x625)]=new Bitmap(_0x6e7614,_0x48efef),_0x8eca98[_0x37dbb9(0x682)](0x0,0x0,_0x6e7614,_0x48efef),this['updateScrollBarPosition'](_0x42df24);},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x2e0)]=Window_Base[_0x5ca092(0x923)]['destroyContents'],Window_Base[_0x5ca092(0x923)][_0x5ca092(0x437)]=function(){const _0x3f17a3=_0x5ca092;VisuMZ[_0x3f17a3(0x865)][_0x3f17a3(0x2e0)][_0x3f17a3(0x481)](this),this[_0x3f17a3(0x2c0)]();},Window_Base['prototype'][_0x5ca092(0x2c0)]=function(){const _0x15ac0f=_0x5ca092,_0x2de95e=[this[_0x15ac0f(0x287)],this['_scrollBarVert']];for(const _0x17448c of _0x2de95e){if(_0x17448c&&_0x17448c[_0x15ac0f(0x625)])_0x17448c[_0x15ac0f(0x625)][_0x15ac0f(0x3ae)]();}},VisuMZ['CoreEngine'][_0x5ca092(0x32c)]=Window_Scrollable['prototype']['update'],Window_Scrollable[_0x5ca092(0x923)]['update']=function(){const _0x17192e=_0x5ca092;VisuMZ[_0x17192e(0x865)][_0x17192e(0x32c)][_0x17192e(0x481)](this),this['updateScrollBars']();},Window_Scrollable[_0x5ca092(0x923)]['updateScrollBars']=function(){const _0x2c6d22=_0x5ca092;this[_0x2c6d22(0x2fc)](),this[_0x2c6d22(0x4ed)](!![]),this[_0x2c6d22(0x4ed)](![]),this[_0x2c6d22(0x45f)](!![]),this[_0x2c6d22(0x45f)](![]);},Window_Scrollable[_0x5ca092(0x923)][_0x5ca092(0x2fc)]=function(){const _0x4447c2=_0x5ca092,_0x3c6f63=[this['_scrollBarHorz'],this['_scrollBarVert']];for(const _0x1d11cd of _0x3c6f63){_0x1d11cd&&(_0x1d11cd['visible']=this[_0x4447c2(0x803)]()&&this[_0x4447c2(0x895)]());}},Window_Scrollable['prototype'][_0x5ca092(0x4ed)]=function(_0x2e9c3f){const _0x3fc01f=_0x5ca092;if(!this[_0x3fc01f(0x56c)])return;const _0x182445=this[_0x3fc01f(0x385)](_0x2e9c3f),_0xa85675=this['maxScrollbar'](_0x2e9c3f),_0x448f74=_0x2e9c3f?_0x3fc01f(0x8cc):_0x3fc01f(0x34f),_0x1f3bc9=_0x2e9c3f?_0x3fc01f(0x81e):'maxVert';(this[_0x3fc01f(0x56c)][_0x448f74]!==_0x182445||this[_0x3fc01f(0x56c)][_0x1f3bc9]!==_0xa85675)&&(this['_lastScrollBarValues'][_0x448f74]=_0x182445,this[_0x3fc01f(0x56c)][_0x1f3bc9]=_0xa85675,this[_0x3fc01f(0x221)](_0x2e9c3f,_0x182445,_0xa85675));},Window_Scrollable['prototype'][_0x5ca092(0x385)]=function(_0x180f66){const _0x47ed89=_0x5ca092;if(this['_allTextHeight']!==undefined)return _0x180f66?this[_0x47ed89(0x5ff)]():this[_0x47ed89(0x8a1)]['y'];return _0x180f66?this['scrollX']():this['scrollY']();},Window_Scrollable[_0x5ca092(0x923)]['maxScrollbar']=function(_0x2b6b80){const _0x65e584=_0x5ca092;if(this[_0x65e584(0x3d5)]!==undefined)return _0x2b6b80?this[_0x65e584(0x849)]():Math['max'](0x0,this[_0x65e584(0x3d5)]-this['innerHeight']);return _0x2b6b80?this[_0x65e584(0x849)]():this[_0x65e584(0x905)]();},Window_Scrollable['prototype'][_0x5ca092(0x4e1)]=function(){const _0x338d47=_0x5ca092;if(this['_allTextHeight']!==undefined)return Math[_0x338d47(0x8e4)](0x0,this['_allTextHeight']);return this[_0x338d47(0x757)]();},Window_Scrollable['prototype'][_0x5ca092(0x221)]=function(_0x5a91ca,_0x47c930,_0x16a3a6){const _0x39789f=_0x5ca092,_0x41dd40=_0x5a91ca?this[_0x39789f(0x287)]:this['_scrollBarVert'];if(!_0x41dd40)return;if(!_0x41dd40['bitmap'])return;const _0x1b5873=_0x41dd40[_0x39789f(0x625)];_0x1b5873[_0x39789f(0x6e2)]();if(_0x16a3a6<=0x0)return;const _0x51d6cd=_0x5a91ca?this[_0x39789f(0x21a)]/this[_0x39789f(0x668)]():this[_0x39789f(0x6b2)]/this[_0x39789f(0x4e1)](),_0x593c9a=_0x5a91ca?Math[_0x39789f(0x75e)](_0x47c930*_0x51d6cd):0x0,_0x350a36=_0x5a91ca?0x0:Math['round'](_0x47c930*_0x51d6cd),_0x323b2d=_0x5a91ca?Math[_0x39789f(0x75e)](_0x1b5873[_0x39789f(0x7b7)]*_0x51d6cd):_0x1b5873['width'],_0x5eca1a=_0x5a91ca?_0x1b5873[_0x39789f(0x2a0)]:Math['round'](_0x1b5873[_0x39789f(0x2a0)]*_0x51d6cd),_0x54507f=Window_Scrollable[_0x39789f(0x4de)],_0x279165=ColorManager[_0x39789f(0x3f7)](_0x54507f[_0x39789f(0x6c8)]),_0x52bc4e=ColorManager[_0x39789f(0x3f7)](_0x54507f[_0x39789f(0x603)]),_0x2fbf2e=_0x54507f['offOpacity'];_0x1b5873['paintOpacity']=_0x2fbf2e,_0x1b5873[_0x39789f(0x407)](_0x279165),_0x1b5873['paintOpacity']=0xff,_0x1b5873[_0x39789f(0x6bf)](_0x593c9a,_0x350a36,_0x323b2d,_0x5eca1a,_0x52bc4e);},Window_Base[_0x5ca092(0x923)]['updateScrollBarPosition']=function(_0x2760a5){const _0x183247=_0x5ca092,_0x4ba564=_0x2760a5?this[_0x183247(0x287)]:this[_0x183247(0x445)];if(!_0x4ba564)return;const _0xe46ec6=Window_Scrollable[_0x183247(0x4de)],_0x2e4cd7=_0xe46ec6[_0x183247(0x5f5)],_0x486824=_0xe46ec6[_0x183247(0x602)];if(!_0x4ba564[_0x183247(0x908)])return;_0x4ba564['x']=this['padding']+(_0x2760a5?_0x2e4cd7:this[_0x183247(0x21a)]+_0x486824),_0x4ba564['y']=this['padding']+(_0x2760a5?this[_0x183247(0x6b2)]+_0x486824:_0x2e4cd7);},Window_Selectable[_0x5ca092(0x923)]['cursorDown']=function(_0x4c5b67){const _0x13b18c=_0x5ca092;let _0x3f6bd3=this['index']();const _0x3f06f7=this[_0x13b18c(0x29c)](),_0x443003=this[_0x13b18c(0x456)]();if(this[_0x13b18c(0x76d)]()&&(_0x3f6bd3<_0x3f06f7||_0x4c5b67&&_0x443003===0x1)){_0x3f6bd3+=_0x443003;if(_0x3f6bd3>=_0x3f06f7)_0x3f6bd3=_0x3f06f7-0x1;this[_0x13b18c(0x32a)](_0x3f6bd3);}else!this[_0x13b18c(0x76d)]()&&((_0x3f6bd3<_0x3f06f7-_0x443003||_0x4c5b67&&_0x443003===0x1)&&this[_0x13b18c(0x32a)]((_0x3f6bd3+_0x443003)%_0x3f06f7));},VisuMZ['CoreEngine']['Window_Selectable_cursorDown']=Window_Selectable[_0x5ca092(0x923)][_0x5ca092(0x2a7)],Window_Selectable[_0x5ca092(0x923)][_0x5ca092(0x2a7)]=function(_0x522d30){const _0x3379a7=_0x5ca092;this['isUseModernControls']()&&_0x522d30&&this[_0x3379a7(0x456)]()===0x1&&this[_0x3379a7(0x552)]()===this[_0x3379a7(0x29c)]()-0x1?this[_0x3379a7(0x32a)](0x0):VisuMZ[_0x3379a7(0x865)]['Window_Selectable_cursorDown'][_0x3379a7(0x481)](this,_0x522d30);},Window_Selectable[_0x5ca092(0x923)][_0x5ca092(0x953)]=function(_0x11b783){const _0x410e91=_0x5ca092;let _0x24db5b=Math[_0x410e91(0x8e4)](0x0,this[_0x410e91(0x552)]());const _0x1a40d7=this[_0x410e91(0x29c)](),_0x29a9fe=this[_0x410e91(0x456)]();if(this[_0x410e91(0x76d)]()&&_0x24db5b>0x0||_0x11b783&&_0x29a9fe===0x1){_0x24db5b-=_0x29a9fe;if(_0x24db5b<=0x0)_0x24db5b=0x0;this[_0x410e91(0x32a)](_0x24db5b);}else!this['isUseModernControls']()&&((_0x24db5b>=_0x29a9fe||_0x11b783&&_0x29a9fe===0x1)&&this[_0x410e91(0x32a)]((_0x24db5b-_0x29a9fe+_0x1a40d7)%_0x1a40d7));},VisuMZ[_0x5ca092(0x865)]['Window_Selectable_cursorUp']=Window_Selectable[_0x5ca092(0x923)][_0x5ca092(0x953)],Window_Selectable[_0x5ca092(0x923)]['cursorUp']=function(_0x51044c){const _0xe523e7=_0x5ca092;this['isUseModernControls']()&&_0x51044c&&this[_0xe523e7(0x456)]()===0x1&&this[_0xe523e7(0x552)]()===0x0?this[_0xe523e7(0x32a)](this[_0xe523e7(0x29c)]()-0x1):VisuMZ[_0xe523e7(0x865)]['Window_Selectable_cursorUp'][_0xe523e7(0x481)](this,_0x51044c);},Window_Selectable[_0x5ca092(0x923)][_0x5ca092(0x76d)]=function(){const _0x7937b9=_0x5ca092;return VisuMZ[_0x7937b9(0x865)][_0x7937b9(0x225)][_0x7937b9(0x656)]['ModernControls'];},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x7a2)]=Window_Selectable['prototype'][_0x5ca092(0x334)],Window_Selectable[_0x5ca092(0x923)][_0x5ca092(0x334)]=function(){const _0x13199a=_0x5ca092;this[_0x13199a(0x76d)]()?(this[_0x13199a(0x50f)](),this[_0x13199a(0x7e8)]()):VisuMZ['CoreEngine'][_0x13199a(0x7a2)][_0x13199a(0x481)](this);},Window_Selectable[_0x5ca092(0x923)][_0x5ca092(0x5e4)]=function(){return!![];},Window_Selectable[_0x5ca092(0x923)][_0x5ca092(0x50f)]=function(){const _0x3d10a3=_0x5ca092;if(this[_0x3d10a3(0x359)]()){const _0x53e891=this[_0x3d10a3(0x552)]();Input[_0x3d10a3(0x5af)](_0x3d10a3(0x621))&&(Input['isPressed'](_0x3d10a3(0x906))&&this[_0x3d10a3(0x5e4)]()?this[_0x3d10a3(0x68e)]():this[_0x3d10a3(0x2a7)](Input[_0x3d10a3(0x6c9)](_0x3d10a3(0x621)))),Input[_0x3d10a3(0x5af)]('up')&&(Input[_0x3d10a3(0x522)](_0x3d10a3(0x906))&&this[_0x3d10a3(0x5e4)]()?this['cursorPageup']():this[_0x3d10a3(0x953)](Input['isTriggered']('up'))),Input[_0x3d10a3(0x5af)]('right')&&this[_0x3d10a3(0x8a5)](Input[_0x3d10a3(0x6c9)]('right')),Input['isRepeated']('left')&&this['cursorLeft'](Input['isTriggered'](_0x3d10a3(0x841))),!this[_0x3d10a3(0x91f)](_0x3d10a3(0x256))&&Input[_0x3d10a3(0x5af)](_0x3d10a3(0x256))&&this[_0x3d10a3(0x68e)](),!this[_0x3d10a3(0x91f)](_0x3d10a3(0x395))&&Input[_0x3d10a3(0x5af)](_0x3d10a3(0x395))&&this[_0x3d10a3(0x2e5)](),this[_0x3d10a3(0x552)]()!==_0x53e891&&this[_0x3d10a3(0x2d8)]();}},Window_Selectable[_0x5ca092(0x923)]['processCursorHomeEndTrigger']=function(){const _0x100e27=_0x5ca092;if(this[_0x100e27(0x359)]()){const _0x154cc1=this[_0x100e27(0x552)]();Input['isTriggered'](_0x100e27(0x374))&&this['smoothSelect'](Math['min'](this[_0x100e27(0x552)](),0x0)),Input['isTriggered'](_0x100e27(0x583))&&this['smoothSelect'](Math[_0x100e27(0x8e4)](this[_0x100e27(0x552)](),this[_0x100e27(0x29c)]()-0x1)),this[_0x100e27(0x552)]()!==_0x154cc1&&this[_0x100e27(0x2d8)]();}},VisuMZ[_0x5ca092(0x865)]['Window_Selectable_processTouch']=Window_Selectable[_0x5ca092(0x923)][_0x5ca092(0x6f4)],Window_Selectable[_0x5ca092(0x923)]['processTouch']=function(){const _0xc71c35=_0x5ca092;this[_0xc71c35(0x76d)]()?this[_0xc71c35(0x8fb)]():VisuMZ[_0xc71c35(0x865)][_0xc71c35(0x60f)][_0xc71c35(0x481)](this);},Window_Selectable[_0x5ca092(0x923)][_0x5ca092(0x8fb)]=function(){const _0xdce5c=_0x5ca092;VisuMZ[_0xdce5c(0x865)][_0xdce5c(0x60f)]['call'](this);},Window_Selectable['prototype']['colSpacing']=function(){const _0x21f8f1=_0x5ca092;return VisuMZ[_0x21f8f1(0x865)][_0x21f8f1(0x225)][_0x21f8f1(0x57c)][_0x21f8f1(0x744)];},Window_Selectable[_0x5ca092(0x923)]['rowSpacing']=function(){const _0xeb0a3f=_0x5ca092;return VisuMZ[_0xeb0a3f(0x865)][_0xeb0a3f(0x225)]['Window'][_0xeb0a3f(0x798)];},Window_Selectable[_0x5ca092(0x923)][_0x5ca092(0x763)]=function(){const _0x4baf9e=_0x5ca092;return Window_Scrollable['prototype'][_0x4baf9e(0x763)][_0x4baf9e(0x481)](this)+VisuMZ['CoreEngine']['Settings'][_0x4baf9e(0x57c)][_0x4baf9e(0x4b2)];;},VisuMZ[_0x5ca092(0x865)]['Window_Selectable_drawBackgroundRect']=Window_Selectable[_0x5ca092(0x923)][_0x5ca092(0x47c)],Window_Selectable[_0x5ca092(0x923)]['drawBackgroundRect']=function(_0x2de541){const _0x3d4e08=_0x5ca092,_0x577c32=VisuMZ[_0x3d4e08(0x865)][_0x3d4e08(0x225)][_0x3d4e08(0x57c)];if(_0x577c32[_0x3d4e08(0x419)]===![])return;_0x577c32[_0x3d4e08(0x66a)]?_0x577c32[_0x3d4e08(0x66a)][_0x3d4e08(0x481)](this,_0x2de541):VisuMZ['CoreEngine'][_0x3d4e08(0x4b0)][_0x3d4e08(0x481)](this,_0x2de541);},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x5eb)]=Window_Gold[_0x5ca092(0x923)][_0x5ca092(0x7f7)],Window_Gold[_0x5ca092(0x923)][_0x5ca092(0x7f7)]=function(){const _0x2b933f=_0x5ca092;this[_0x2b933f(0x8b8)]()?this[_0x2b933f(0x2e8)]():VisuMZ['CoreEngine'][_0x2b933f(0x5eb)][_0x2b933f(0x481)](this);},Window_Gold[_0x5ca092(0x923)][_0x5ca092(0x8b8)]=function(){const _0x2347c9=_0x5ca092;if(TextManager[_0x2347c9(0x941)]!==this['currencyUnit']())return![];return VisuMZ[_0x2347c9(0x865)][_0x2347c9(0x225)][_0x2347c9(0x462)]['ItemStyle'];},Window_Gold[_0x5ca092(0x923)][_0x5ca092(0x2e8)]=function(){const _0x42400c=_0x5ca092;this[_0x42400c(0x8ae)](),this[_0x42400c(0x7d6)][_0x42400c(0x6e2)](),this['contents'][_0x42400c(0x384)]=VisuMZ[_0x42400c(0x865)][_0x42400c(0x225)][_0x42400c(0x462)][_0x42400c(0x51f)];const _0x24973e=VisuMZ['CoreEngine'][_0x42400c(0x225)][_0x42400c(0x462)][_0x42400c(0x6cc)],_0x327fe1=this[_0x42400c(0x5b0)](0x0);if(_0x24973e>0x0){const _0x1280e7=_0x327fe1['y']+(this[_0x42400c(0x2f6)]()-ImageManager[_0x42400c(0x30c)])/0x2;this[_0x42400c(0x2a6)](_0x24973e,_0x327fe1['x'],_0x1280e7);const _0x40f99e=ImageManager[_0x42400c(0x90c)]+0x4;_0x327fe1['x']+=_0x40f99e,_0x327fe1[_0x42400c(0x7b7)]-=_0x40f99e;}this[_0x42400c(0x57d)](ColorManager[_0x42400c(0x58e)]()),this[_0x42400c(0x286)](this[_0x42400c(0x941)](),_0x327fe1['x'],_0x327fe1['y'],_0x327fe1['width'],'left');const _0x52854e=this['textWidth'](this[_0x42400c(0x941)]())+0x6;;_0x327fe1['x']+=_0x52854e,_0x327fe1[_0x42400c(0x7b7)]-=_0x52854e,this[_0x42400c(0x4f8)]();const _0x3c56b9=this[_0x42400c(0x4c3)](),_0x40b188=this[_0x42400c(0x6b1)](this[_0x42400c(0x413)]?VisuMZ[_0x42400c(0x5d5)](this[_0x42400c(0x4c3)]()):this[_0x42400c(0x4c3)]());_0x40b188>_0x327fe1[_0x42400c(0x7b7)]?this[_0x42400c(0x286)](VisuMZ[_0x42400c(0x865)][_0x42400c(0x225)][_0x42400c(0x462)][_0x42400c(0x6a3)],_0x327fe1['x'],_0x327fe1['y'],_0x327fe1[_0x42400c(0x7b7)],'right'):this['drawText'](this['value'](),_0x327fe1['x'],_0x327fe1['y'],_0x327fe1[_0x42400c(0x7b7)],_0x42400c(0x254)),this[_0x42400c(0x8ae)]();},Window_StatusBase[_0x5ca092(0x923)][_0x5ca092(0x72e)]=function(_0x5d7fbc,_0x2f356f,_0x19420d,_0x45a592,_0x306adb){const _0x2c80dc=_0x5ca092;_0x45a592=String(_0x45a592||'')[_0x2c80dc(0x351)]();if(VisuMZ[_0x2c80dc(0x865)][_0x2c80dc(0x225)][_0x2c80dc(0x514)][_0x2c80dc(0x1e4)]){const _0x2fa9a2=VisuMZ['GetParamIcon'](_0x45a592);if(_0x306adb)this[_0x2c80dc(0x291)](_0x2fa9a2,_0x5d7fbc,_0x2f356f,this[_0x2c80dc(0x494)]()),_0x19420d-=this[_0x2c80dc(0x494)]()+0x2,_0x5d7fbc+=this[_0x2c80dc(0x494)]()+0x2;else{let _0x85d9a9=0x2;this[_0x2c80dc(0x2f6)]()>0x24&&(_0x85d9a9=Math[_0x2c80dc(0x229)]((this[_0x2c80dc(0x2f6)]()-ImageManager[_0x2c80dc(0x30c)])/0x2)),this[_0x2c80dc(0x2a6)](_0x2fa9a2,_0x5d7fbc+0x2,_0x2f356f+_0x85d9a9),_0x19420d-=ImageManager['iconWidth']+0x4,_0x5d7fbc+=ImageManager[_0x2c80dc(0x90c)]+0x4;}}const _0x699402=TextManager['param'](_0x45a592);this[_0x2c80dc(0x8ae)](),this['changeTextColor'](ColorManager['systemColor']()),_0x306adb?(this['contents']['fontSize']=this[_0x2c80dc(0x5c5)](),this[_0x2c80dc(0x7d6)][_0x2c80dc(0x286)](_0x699402,_0x5d7fbc,_0x2f356f,_0x19420d,this[_0x2c80dc(0x494)](),_0x2c80dc(0x841))):this['drawText'](_0x699402,_0x5d7fbc,_0x2f356f,_0x19420d),this[_0x2c80dc(0x8ae)]();},Window_StatusBase[_0x5ca092(0x923)][_0x5ca092(0x5c5)]=function(){const _0x255d8f=_0x5ca092;return $gameSystem[_0x255d8f(0x628)]()-0x8;},Window_StatusBase[_0x5ca092(0x923)][_0x5ca092(0x863)]=function(_0x39cc75,_0x3f309c,_0x155df4,_0x210bff){const _0x1d84bb=_0x5ca092;_0x210bff=_0x210bff||0xa8,this['resetTextColor']();if(VisuMZ[_0x1d84bb(0x865)][_0x1d84bb(0x225)]['UI'][_0x1d84bb(0x7e4)])this[_0x1d84bb(0x3fb)](_0x39cc75[_0x1d84bb(0x6fe)]()['name'],_0x3f309c,_0x155df4,_0x210bff);else{const _0x47997a=_0x39cc75[_0x1d84bb(0x6fe)]()['name'][_0x1d84bb(0x6ff)](/\\I\[(\d+)\]/gi,'');this[_0x1d84bb(0x286)](_0x47997a,_0x3f309c,_0x155df4,_0x210bff);}},Window_StatusBase['prototype']['drawActorNickname']=function(_0x2cd3fa,_0x54307d,_0x46391e,_0x2a8be1){const _0x58575c=_0x5ca092;_0x2a8be1=_0x2a8be1||0x10e,this[_0x58575c(0x4f8)]();if(VisuMZ[_0x58575c(0x865)]['Settings']['UI'][_0x58575c(0x529)])this['drawTextEx'](_0x2cd3fa['nickname'](),_0x54307d,_0x46391e,_0x2a8be1);else{const _0x8b03ee=_0x2cd3fa[_0x58575c(0x4b7)]()[_0x58575c(0x6ff)](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x2cd3fa[_0x58575c(0x4b7)](),_0x54307d,_0x46391e,_0x2a8be1);}},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x933)]=Window_StatusBase[_0x5ca092(0x923)][_0x5ca092(0x8d4)],Window_StatusBase[_0x5ca092(0x923)][_0x5ca092(0x8d4)]=function(_0x2dae92,_0x3b2ce8,_0x7510e3){const _0x452244=_0x5ca092;if(VisuMZ[_0x452244(0x865)][_0x452244(0x225)][_0x452244(0x514)]['ShowActorLevel']===![])return;if(this[_0x452244(0x8c1)]())this[_0x452244(0x252)](_0x2dae92,_0x3b2ce8,_0x7510e3);VisuMZ[_0x452244(0x865)][_0x452244(0x933)]['call'](this,_0x2dae92,_0x3b2ce8,_0x7510e3);},Window_StatusBase[_0x5ca092(0x923)][_0x5ca092(0x8c1)]=function(){const _0x14d8b6=_0x5ca092;return VisuMZ[_0x14d8b6(0x865)][_0x14d8b6(0x225)]['UI'][_0x14d8b6(0x6f3)];},Window_StatusBase['prototype'][_0x5ca092(0x252)]=function(_0x62b940,_0x383cd5,_0x21bc0b){const _0x3ac7aa=_0x5ca092;if(!_0x62b940)return;if(!_0x62b940['isActor']())return;const _0x306ca9=0x80,_0x5cd861=_0x62b940[_0x3ac7aa(0x39b)]();let _0x3571ce=ColorManager['expGaugeColor1'](),_0x39fb8f=ColorManager[_0x3ac7aa(0x3c5)]();_0x5cd861>=0x1&&(_0x3571ce=ColorManager[_0x3ac7aa(0x8c0)](),_0x39fb8f=ColorManager[_0x3ac7aa(0x8f5)]()),this[_0x3ac7aa(0x582)](_0x383cd5,_0x21bc0b,_0x306ca9,_0x5cd861,_0x3571ce,_0x39fb8f);},Window_EquipStatus[_0x5ca092(0x923)][_0x5ca092(0x3f2)]=function(){const _0x4101fe=_0x5ca092;let _0x5ee589=0x0;for(const _0x1b7d9a of VisuMZ['CoreEngine'][_0x4101fe(0x225)]['Param'][_0x4101fe(0x847)]){const _0x3955ff=this[_0x4101fe(0x3c8)](),_0x3e1185=this[_0x4101fe(0x786)](_0x5ee589);this['drawItem'](_0x3955ff,_0x3e1185,_0x1b7d9a),_0x5ee589++;}},Window_EquipStatus[_0x5ca092(0x923)][_0x5ca092(0x271)]=function(_0x2d7c77,_0x18f058,_0x4c7b1d){const _0x2fd154=_0x5ca092,_0x9e3549=this[_0x2fd154(0x73b)]()-this[_0x2fd154(0x3c8)]()*0x2;this[_0x2fd154(0x72e)](_0x2d7c77,_0x18f058,_0x9e3549,_0x4c7b1d,![]);},Window_EquipStatus[_0x5ca092(0x923)]['drawCurrentParam']=function(_0x4d97ba,_0x3baf2,_0x72f1f6){const _0x450a30=_0x5ca092,_0x1606cd=this[_0x450a30(0x21c)]();this[_0x450a30(0x4f8)](),this[_0x450a30(0x286)](this['_actor'][_0x450a30(0x754)](_0x72f1f6,!![]),_0x4d97ba,_0x3baf2,_0x1606cd,_0x450a30(0x254));},Window_EquipStatus[_0x5ca092(0x923)][_0x5ca092(0x89a)]=function(_0x2ed149,_0x57276e){const _0x43c231=_0x5ca092,_0x294726=this[_0x43c231(0x304)]();this['changeTextColor'](ColorManager[_0x43c231(0x58e)]());const _0x3931a5=VisuMZ[_0x43c231(0x865)][_0x43c231(0x225)]['UI'][_0x43c231(0x261)];this[_0x43c231(0x286)](_0x3931a5,_0x2ed149,_0x57276e,_0x294726,'center');},Window_EquipStatus[_0x5ca092(0x923)][_0x5ca092(0x7b2)]=function(_0x1049a4,_0x146b19,_0x1aad71){const _0x266e4a=_0x5ca092,_0x16c0cb=this[_0x266e4a(0x21c)](),_0x384b08=this[_0x266e4a(0x8dd)][_0x266e4a(0x754)](_0x1aad71),_0x1cd1a9=_0x384b08-this['_actor'][_0x266e4a(0x754)](_0x1aad71);this[_0x266e4a(0x57d)](ColorManager[_0x266e4a(0x4a9)](_0x1cd1a9)),this[_0x266e4a(0x286)](this[_0x266e4a(0x8dd)][_0x266e4a(0x754)](_0x1aad71,!![]),_0x1049a4,_0x146b19,_0x16c0cb,_0x266e4a(0x254));},VisuMZ[_0x5ca092(0x865)]['Window_EquipItem_isEnabled']=Window_EquipItem[_0x5ca092(0x923)][_0x5ca092(0x838)],Window_EquipItem[_0x5ca092(0x923)]['isEnabled']=function(_0x54031c){const _0x55d543=_0x5ca092;return _0x54031c&&this['_actor']?this['_actor']['canEquip'](_0x54031c):VisuMZ[_0x55d543(0x865)][_0x55d543(0x72a)]['call'](this,_0x54031c);},Window_StatusParams[_0x5ca092(0x923)][_0x5ca092(0x29c)]=function(){const _0xd8c71a=_0x5ca092;return VisuMZ[_0xd8c71a(0x865)][_0xd8c71a(0x225)][_0xd8c71a(0x514)][_0xd8c71a(0x847)]['length'];},Window_StatusParams[_0x5ca092(0x923)][_0x5ca092(0x3b1)]=function(_0x476cb3){const _0x137bf1=_0x5ca092,_0x3eb201=this['itemLineRect'](_0x476cb3),_0x247110=VisuMZ[_0x137bf1(0x865)]['Settings']['Param'][_0x137bf1(0x847)][_0x476cb3],_0x284442=TextManager[_0x137bf1(0x586)](_0x247110),_0x3ac746=this[_0x137bf1(0x336)][_0x137bf1(0x754)](_0x247110,!![]);this[_0x137bf1(0x72e)](_0x3eb201['x'],_0x3eb201['y'],0xa0,_0x247110,![]),this[_0x137bf1(0x4f8)](),this[_0x137bf1(0x286)](_0x3ac746,_0x3eb201['x']+0xa0,_0x3eb201['y'],0x3c,_0x137bf1(0x254));};if(VisuMZ[_0x5ca092(0x865)]['Settings'][_0x5ca092(0x633)][_0x5ca092(0x4ab)]){VisuMZ[_0x5ca092(0x865)]['Settings'][_0x5ca092(0x633)][_0x5ca092(0x568)]&&(Window_NameInput['LATIN1']=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x5ca092(0x4f9),'OK']);;VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x203)]=Window_NameInput[_0x5ca092(0x923)][_0x5ca092(0x44e)],Window_NameInput[_0x5ca092(0x923)][_0x5ca092(0x44e)]=function(_0x45ac54){const _0x2fe916=_0x5ca092;this[_0x2fe916(0x8df)]=this[_0x2fe916(0x360)](),VisuMZ[_0x2fe916(0x865)][_0x2fe916(0x203)][_0x2fe916(0x481)](this,_0x45ac54),this[_0x2fe916(0x8df)]===_0x2fe916(0x7df)?this[_0x2fe916(0x647)](0x0):(Input[_0x2fe916(0x6e2)](),this[_0x2fe916(0x1db)]());},Window_NameInput['prototype'][_0x5ca092(0x360)]=function(){const _0x8b102a=_0x5ca092;if(Input[_0x8b102a(0x48a)]())return'default';return VisuMZ[_0x8b102a(0x865)][_0x8b102a(0x225)]['KeyboardInput'][_0x8b102a(0x1c7)]||'keyboard';},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x6fc)]=Window_NameInput[_0x5ca092(0x923)][_0x5ca092(0x4a3)],Window_NameInput[_0x5ca092(0x923)][_0x5ca092(0x4a3)]=function(){const _0x3337f8=_0x5ca092;if(!this[_0x3337f8(0x895)]())return;if(!this['active'])return;if(this[_0x3337f8(0x8df)]===_0x3337f8(0x916)&&Input[_0x3337f8(0x519)]())this[_0x3337f8(0x4b9)]('default');else{if(Input[_0x3337f8(0x804)](_0x3337f8(0x1c3)))Input[_0x3337f8(0x6e2)](),this[_0x3337f8(0x831)]();else{if(Input[_0x3337f8(0x6c9)]('tab'))Input[_0x3337f8(0x6e2)](),this['_mode']==='keyboard'?this[_0x3337f8(0x4b9)]('default'):this[_0x3337f8(0x4b9)]('keyboard');else{if(this['_mode']===_0x3337f8(0x916))this['processKeyboardHandling']();else Input[_0x3337f8(0x804)]('escape')?(Input[_0x3337f8(0x6e2)](),this['switchModes'](_0x3337f8(0x916))):VisuMZ['CoreEngine'][_0x3337f8(0x6fc)]['call'](this);}}}},VisuMZ['CoreEngine']['Window_NameInput_processTouch']=Window_NameInput[_0x5ca092(0x923)][_0x5ca092(0x6f4)],Window_NameInput[_0x5ca092(0x923)]['processTouch']=function(){const _0x7aa67e=_0x5ca092;if(!this[_0x7aa67e(0x879)]())return;if(this[_0x7aa67e(0x8df)]===_0x7aa67e(0x916)){if(TouchInput[_0x7aa67e(0x6c9)]()&&this[_0x7aa67e(0x8b4)]())this[_0x7aa67e(0x4b9)](_0x7aa67e(0x7df));else TouchInput['isCancelled']()&&this['switchModes'](_0x7aa67e(0x7df));}else VisuMZ[_0x7aa67e(0x865)]['Window_NameInput_processTouch']['call'](this);},Window_NameInput['prototype'][_0x5ca092(0x435)]=function(){const _0x5d72d0=_0x5ca092;if(Input[_0x5d72d0(0x804)](_0x5d72d0(0x89c)))Input[_0x5d72d0(0x6e2)](),this['onNameOk']();else{if(Input[_0x5d72d0(0x2ec)]!==undefined){let _0x59c37e=Input[_0x5d72d0(0x2ec)],_0x57fbe3=_0x59c37e[_0x5d72d0(0x839)];for(let _0x1a9175=0x0;_0x1a9175<_0x57fbe3;++_0x1a9175){this['_editWindow'][_0x5d72d0(0x7c0)](_0x59c37e[_0x1a9175])?SoundManager[_0x5d72d0(0x7bc)]():SoundManager[_0x5d72d0(0x431)]();}Input[_0x5d72d0(0x6e2)]();}}},Window_NameInput['prototype']['switchModes']=function(_0x2d84ec){const _0x4840e7=_0x5ca092;let _0x2773d4=this[_0x4840e7(0x8df)];this['_mode']=_0x2d84ec,_0x2773d4!==this[_0x4840e7(0x8df)]&&(this[_0x4840e7(0x7f7)](),SoundManager[_0x4840e7(0x7bc)](),this[_0x4840e7(0x8df)]==='default'?this[_0x4840e7(0x647)](0x0):this[_0x4840e7(0x647)](-0x1));},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x771)]=Window_NameInput[_0x5ca092(0x923)]['cursorDown'],Window_NameInput[_0x5ca092(0x923)][_0x5ca092(0x2a7)]=function(_0xa0707c){const _0x3c44f7=_0x5ca092;if(this[_0x3c44f7(0x8df)]===_0x3c44f7(0x916)&&!Input[_0x3c44f7(0x2ac)]())return;if(Input[_0x3c44f7(0x1cd)]())return;VisuMZ[_0x3c44f7(0x865)]['Window_NameInput_cursorDown'][_0x3c44f7(0x481)](this,_0xa0707c),this[_0x3c44f7(0x4b9)](_0x3c44f7(0x7df));},VisuMZ[_0x5ca092(0x865)]['Window_NameInput_cursorUp']=Window_NameInput[_0x5ca092(0x923)][_0x5ca092(0x953)],Window_NameInput[_0x5ca092(0x923)][_0x5ca092(0x953)]=function(_0x5cfa31){const _0x1d299d=_0x5ca092;if(this[_0x1d299d(0x8df)]==='keyboard'&&!Input[_0x1d299d(0x2ac)]())return;if(Input[_0x1d299d(0x1cd)]())return;VisuMZ['CoreEngine'][_0x1d299d(0x935)][_0x1d299d(0x481)](this,_0x5cfa31),this['switchModes'](_0x1d299d(0x7df));},VisuMZ['CoreEngine'][_0x5ca092(0x30f)]=Window_NameInput[_0x5ca092(0x923)][_0x5ca092(0x8a5)],Window_NameInput[_0x5ca092(0x923)][_0x5ca092(0x8a5)]=function(_0xfd6a80){const _0x1b3ccf=_0x5ca092;if(this[_0x1b3ccf(0x8df)]===_0x1b3ccf(0x916)&&!Input[_0x1b3ccf(0x2ac)]())return;if(Input[_0x1b3ccf(0x1cd)]())return;VisuMZ[_0x1b3ccf(0x865)][_0x1b3ccf(0x30f)][_0x1b3ccf(0x481)](this,_0xfd6a80),this[_0x1b3ccf(0x4b9)](_0x1b3ccf(0x7df));},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x381)]=Window_NameInput[_0x5ca092(0x923)][_0x5ca092(0x1fd)],Window_NameInput[_0x5ca092(0x923)][_0x5ca092(0x1fd)]=function(_0x49f173){const _0x559d8b=_0x5ca092;if(this[_0x559d8b(0x8df)]===_0x559d8b(0x916)&&!Input[_0x559d8b(0x2ac)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x559d8b(0x865)]['Window_NameInput_cursorLeft']['call'](this,_0x49f173),this['switchModes'](_0x559d8b(0x7df));},VisuMZ[_0x5ca092(0x865)]['Window_NameInput_cursorPagedown']=Window_NameInput[_0x5ca092(0x923)][_0x5ca092(0x68e)],Window_NameInput[_0x5ca092(0x923)]['cursorPagedown']=function(){const _0x4a61b8=_0x5ca092;if(this[_0x4a61b8(0x8df)]===_0x4a61b8(0x916))return;if(Input[_0x4a61b8(0x1cd)]())return;VisuMZ['CoreEngine'][_0x4a61b8(0x54d)][_0x4a61b8(0x481)](this),this[_0x4a61b8(0x4b9)](_0x4a61b8(0x7df));},VisuMZ[_0x5ca092(0x865)]['Window_NameInput_cursorPageup']=Window_NameInput[_0x5ca092(0x923)][_0x5ca092(0x2e5)],Window_NameInput[_0x5ca092(0x923)]['cursorPageup']=function(){const _0x2ca0eb=_0x5ca092;if(this[_0x2ca0eb(0x8df)]==='keyboard')return;if(Input[_0x2ca0eb(0x1cd)]())return;VisuMZ[_0x2ca0eb(0x865)]['Window_NameInput_cursorPageup'][_0x2ca0eb(0x481)](this),this[_0x2ca0eb(0x4b9)](_0x2ca0eb(0x7df));},VisuMZ['CoreEngine']['Window_NameInput_refresh']=Window_NameInput[_0x5ca092(0x923)][_0x5ca092(0x7f7)],Window_NameInput[_0x5ca092(0x923)][_0x5ca092(0x7f7)]=function(){const _0x1c3af7=_0x5ca092;if(this[_0x1c3af7(0x8df)]===_0x1c3af7(0x916)){this[_0x1c3af7(0x7d6)][_0x1c3af7(0x6e2)](),this[_0x1c3af7(0x3c3)][_0x1c3af7(0x6e2)](),this[_0x1c3af7(0x4f8)]();let _0x587070=VisuMZ['CoreEngine'][_0x1c3af7(0x225)][_0x1c3af7(0x633)]['NameInputMessage'][_0x1c3af7(0x79e)]('\x0a'),_0x1ec694=_0x587070[_0x1c3af7(0x839)],_0x18a5e3=(this[_0x1c3af7(0x6b2)]-_0x1ec694*this[_0x1c3af7(0x2f6)]())/0x2;for(let _0x22c3c1=0x0;_0x22c3c1<_0x1ec694;++_0x22c3c1){let _0x30b460=_0x587070[_0x22c3c1],_0x3c6166=this[_0x1c3af7(0x6a1)](_0x30b460)[_0x1c3af7(0x7b7)],_0x592c3e=Math[_0x1c3af7(0x229)]((this[_0x1c3af7(0x7d6)]['width']-_0x3c6166)/0x2);this[_0x1c3af7(0x3fb)](_0x30b460,_0x592c3e,_0x18a5e3),_0x18a5e3+=this[_0x1c3af7(0x2f6)]();}}else VisuMZ[_0x1c3af7(0x865)]['Window_NameInput_refresh']['call'](this);};};VisuMZ['CoreEngine'][_0x5ca092(0x4e4)]=Window_ShopSell[_0x5ca092(0x923)][_0x5ca092(0x838)],Window_ShopSell[_0x5ca092(0x923)][_0x5ca092(0x838)]=function(_0x1166f1){const _0x4f55a4=_0x5ca092;return VisuMZ[_0x4f55a4(0x865)]['Settings'][_0x4f55a4(0x656)][_0x4f55a4(0x282)]&&DataManager[_0x4f55a4(0x5c0)](_0x1166f1)?![]:VisuMZ['CoreEngine'][_0x4f55a4(0x4e4)][_0x4f55a4(0x481)](this,_0x1166f1);},Window_NumberInput[_0x5ca092(0x923)][_0x5ca092(0x76d)]=function(){return![];};VisuMZ[_0x5ca092(0x865)]['Settings'][_0x5ca092(0x633)][_0x5ca092(0x666)]&&(VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x88d)]=Window_NumberInput[_0x5ca092(0x923)][_0x5ca092(0x412)],Window_NumberInput[_0x5ca092(0x923)][_0x5ca092(0x412)]=function(){const _0x38b422=_0x5ca092;VisuMZ[_0x38b422(0x865)][_0x38b422(0x88d)][_0x38b422(0x481)](this),this['select'](this['_maxDigits']-0x1),Input['clear']();},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x793)]=Window_NumberInput[_0x5ca092(0x923)][_0x5ca092(0x62b)],Window_NumberInput[_0x5ca092(0x923)]['processDigitChange']=function(){const _0x2c9e8f=_0x5ca092;if(!this[_0x2c9e8f(0x879)]())return;if(Input[_0x2c9e8f(0x1cd)]())this['processKeyboardDigitChange']();else{if(Input[_0x2c9e8f(0x804)](_0x2c9e8f(0x1c3)))this[_0x2c9e8f(0x49c)]();else{if(Input[_0x2c9e8f(0x5f8)]===0x2e)this['processKeyboardDelete']();else{if(Input['_inputSpecialKeyCode']===0x24)this[_0x2c9e8f(0x7ad)]();else Input[_0x2c9e8f(0x5f8)]===0x23?this['processKeyboardEnd']():VisuMZ[_0x2c9e8f(0x865)][_0x2c9e8f(0x793)][_0x2c9e8f(0x481)](this);}}}},Window_NumberInput[_0x5ca092(0x923)]['processCursorMove']=function(){const _0x3de7db=_0x5ca092;if(!this[_0x3de7db(0x359)]())return;Input[_0x3de7db(0x1cd)]()?this[_0x3de7db(0x450)]():Window_Selectable['prototype'][_0x3de7db(0x334)]['call'](this);},Window_NumberInput[_0x5ca092(0x923)][_0x5ca092(0x7e8)]=function(){},Window_NumberInput[_0x5ca092(0x923)][_0x5ca092(0x450)]=function(){const _0x26f271=_0x5ca092;if(String(this[_0x26f271(0x1e0)])[_0x26f271(0x839)]>=this[_0x26f271(0x6d0)])return;const _0x26bc22=Number(String(this[_0x26f271(0x1e0)])+Input[_0x26f271(0x2ec)]);if(isNaN(_0x26bc22))return;this[_0x26f271(0x1e0)]=_0x26bc22;const _0x2ca609='9'[_0x26f271(0x779)](this[_0x26f271(0x6d0)]);this[_0x26f271(0x1e0)]=this[_0x26f271(0x1e0)][_0x26f271(0x266)](0x0,_0x2ca609),Input['clear'](),this['refresh'](),SoundManager[_0x26f271(0x366)](),this[_0x26f271(0x647)](this['_maxDigits']-0x1);},Window_NumberInput[_0x5ca092(0x923)][_0x5ca092(0x49c)]=function(){const _0x4d0ec4=_0x5ca092;this[_0x4d0ec4(0x1e0)]=Number(String(this[_0x4d0ec4(0x1e0)])[_0x4d0ec4(0x38b)](0x0,-0x1)),this[_0x4d0ec4(0x1e0)]=Math[_0x4d0ec4(0x8e4)](0x0,this[_0x4d0ec4(0x1e0)]),Input[_0x4d0ec4(0x6e2)](),this['refresh'](),SoundManager[_0x4d0ec4(0x366)](),this[_0x4d0ec4(0x647)](this[_0x4d0ec4(0x6d0)]-0x1);},Window_NumberInput[_0x5ca092(0x923)][_0x5ca092(0x71a)]=function(){const _0x303028=_0x5ca092;this[_0x303028(0x1e0)]=Number(String(this['_number'])[_0x303028(0x5fc)](0x1)),this['_number']=Math[_0x303028(0x8e4)](0x0,this['_number']),Input[_0x303028(0x6e2)](),this['refresh'](),SoundManager[_0x303028(0x366)](),this['select'](this[_0x303028(0x6d0)]-0x1);},Window_NumberInput[_0x5ca092(0x923)][_0x5ca092(0x7ad)]=function(){const _0x3f9ae3=_0x5ca092;if(this[_0x3f9ae3(0x552)]()===0x0)return;Input[_0x3f9ae3(0x6e2)](),this[_0x3f9ae3(0x7f7)](),SoundManager[_0x3f9ae3(0x366)](),this[_0x3f9ae3(0x647)](0x0);},Window_NumberInput[_0x5ca092(0x923)][_0x5ca092(0x88e)]=function(){const _0x58d1b2=_0x5ca092;if(this[_0x58d1b2(0x552)]()===this[_0x58d1b2(0x6d0)]-0x1)return;Input[_0x58d1b2(0x6e2)](),this[_0x58d1b2(0x7f7)](),SoundManager[_0x58d1b2(0x366)](),this[_0x58d1b2(0x647)](this['_maxDigits']-0x1);});;VisuMZ['CoreEngine'][_0x5ca092(0x87e)]=Window_MapName[_0x5ca092(0x923)][_0x5ca092(0x7f7)],Window_MapName[_0x5ca092(0x923)]['refresh']=function(){const _0xf7b1c7=_0x5ca092;VisuMZ['CoreEngine'][_0xf7b1c7(0x225)][_0xf7b1c7(0x656)][_0xf7b1c7(0x501)]?this['refreshWithTextCodeSupport']():VisuMZ[_0xf7b1c7(0x865)][_0xf7b1c7(0x87e)][_0xf7b1c7(0x481)](this);},Window_MapName[_0x5ca092(0x923)]['refreshWithTextCodeSupport']=function(){const _0x435298=_0x5ca092;this[_0x435298(0x7d6)][_0x435298(0x6e2)]();if($gameMap[_0x435298(0x6e8)]()){const _0x4461ea=this[_0x435298(0x21a)];this[_0x435298(0x876)](0x0,0x0,_0x4461ea,this['lineHeight']());const _0x5a5fe9=this[_0x435298(0x6a1)]($gameMap[_0x435298(0x6e8)]())[_0x435298(0x7b7)];this[_0x435298(0x3fb)]($gameMap[_0x435298(0x6e8)](),Math['floor']((_0x4461ea-_0x5a5fe9)/0x2),0x0);}},Window_TitleCommand[_0x5ca092(0x70d)]=VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x225)]['TitleCommandList'],Window_TitleCommand[_0x5ca092(0x923)][_0x5ca092(0x5da)]=function(){const _0xda4d72=_0x5ca092;this[_0xda4d72(0x2b7)]();},Window_TitleCommand['prototype'][_0x5ca092(0x2b7)]=function(){const _0x4c2336=_0x5ca092;for(const _0x5ba3ae of Window_TitleCommand['_commandList']){if(_0x5ba3ae[_0x4c2336(0x635)][_0x4c2336(0x481)](this)){const _0x596bc5=_0x5ba3ae[_0x4c2336(0x257)];let _0x3568cc=_0x5ba3ae[_0x4c2336(0x70c)];if(['','Untitled'][_0x4c2336(0x3f8)](_0x3568cc))_0x3568cc=_0x5ba3ae[_0x4c2336(0x452)][_0x4c2336(0x481)](this);const _0x24243b=_0x5ba3ae['EnableJS'][_0x4c2336(0x481)](this),_0xe74d44=_0x5ba3ae['ExtJS']['call'](this);this[_0x4c2336(0x71e)](_0x3568cc,_0x596bc5,_0x24243b,_0xe74d44),this[_0x4c2336(0x379)](_0x596bc5,_0x5ba3ae[_0x4c2336(0x6d3)][_0x4c2336(0x2da)](this,_0xe74d44));}}},VisuMZ['CoreEngine'][_0x5ca092(0x648)]=Window_TitleCommand[_0x5ca092(0x923)]['selectLast'],Window_TitleCommand[_0x5ca092(0x923)][_0x5ca092(0x727)]=function(){const _0x17bec6=_0x5ca092;VisuMZ[_0x17bec6(0x865)][_0x17bec6(0x648)]['call'](this);if(!Window_TitleCommand[_0x17bec6(0x587)])return;const _0x1efcbe=this[_0x17bec6(0x599)](Window_TitleCommand[_0x17bec6(0x587)]),_0x52ef7d=Math[_0x17bec6(0x229)](this[_0x17bec6(0x5ae)]()/0x2)-0x1;this[_0x17bec6(0x32a)](_0x1efcbe),this[_0x17bec6(0x875)]>0x1&&(this[_0x17bec6(0x875)]=0x1,this['updateSmoothScroll']()),this[_0x17bec6(0x58b)](_0x1efcbe-_0x52ef7d);},Window_GameEnd['_commandList']=VisuMZ['CoreEngine'][_0x5ca092(0x225)][_0x5ca092(0x2a9)][_0x5ca092(0x864)][_0x5ca092(0x3d1)],Window_GameEnd[_0x5ca092(0x923)][_0x5ca092(0x5da)]=function(){const _0x21a386=_0x5ca092;this[_0x21a386(0x2b7)]();},Window_GameEnd[_0x5ca092(0x923)][_0x5ca092(0x2b7)]=function(){const _0x4abc2c=_0x5ca092;for(const _0x373d88 of Window_GameEnd[_0x4abc2c(0x70d)]){if(_0x373d88[_0x4abc2c(0x635)]['call'](this)){const _0xa9a0ce=_0x373d88[_0x4abc2c(0x257)];let _0x41db66=_0x373d88['TextStr'];if(['','Untitled'][_0x4abc2c(0x3f8)](_0x41db66))_0x41db66=_0x373d88['TextJS'][_0x4abc2c(0x481)](this);const _0x46db14=_0x373d88['EnableJS']['call'](this),_0x5aee83=_0x373d88[_0x4abc2c(0x2f8)]['call'](this);this[_0x4abc2c(0x71e)](_0x41db66,_0xa9a0ce,_0x46db14,_0x5aee83),this[_0x4abc2c(0x379)](_0xa9a0ce,_0x373d88[_0x4abc2c(0x6d3)][_0x4abc2c(0x2da)](this,_0x5aee83));}}};function _0xd91e(_0x475abb,_0x34f408){const _0x18f620=_0x18f6();return _0xd91e=function(_0xd91e34,_0x218956){_0xd91e34=_0xd91e34-0x1be;let _0x1e10a7=_0x18f620[_0xd91e34];return _0x1e10a7;},_0xd91e(_0x475abb,_0x34f408);}function Window_ButtonAssist(){const _0x4b5f87=_0x5ca092;this[_0x4b5f87(0x44e)](...arguments);}Window_ButtonAssist[_0x5ca092(0x923)]=Object[_0x5ca092(0x49a)](Window_Base[_0x5ca092(0x923)]),Window_ButtonAssist['prototype'][_0x5ca092(0x2bb)]=Window_ButtonAssist,Window_ButtonAssist['prototype'][_0x5ca092(0x44e)]=function(_0x328ee7){const _0x39d04e=_0x5ca092;this['_data']={},Window_Base[_0x39d04e(0x923)][_0x39d04e(0x44e)][_0x39d04e(0x481)](this,_0x328ee7),this[_0x39d04e(0x484)](VisuMZ[_0x39d04e(0x865)][_0x39d04e(0x225)][_0x39d04e(0x2d4)][_0x39d04e(0x874)]||0x0),this[_0x39d04e(0x7f7)]();},Window_ButtonAssist[_0x5ca092(0x923)]['lineHeight']=function(){const _0x4b9e85=_0x5ca092;return this[_0x4b9e85(0x6b2)]||Window_Base[_0x4b9e85(0x923)][_0x4b9e85(0x2f6)][_0x4b9e85(0x481)](this);},Window_ButtonAssist['prototype'][_0x5ca092(0x2d3)]=function(){const _0x1278fe=_0x5ca092;this[_0x1278fe(0x7d6)][_0x1278fe(0x384)]<=0x60&&(this[_0x1278fe(0x7d6)][_0x1278fe(0x384)]+=0x6);},Window_ButtonAssist[_0x5ca092(0x923)]['makeFontSmaller']=function(){const _0x1f81c1=_0x5ca092;this[_0x1f81c1(0x7d6)]['fontSize']>=0x18&&(this[_0x1f81c1(0x7d6)][_0x1f81c1(0x384)]-=0x6);},Window_ButtonAssist['prototype'][_0x5ca092(0x471)]=function(){const _0x21a5fb=_0x5ca092;Window_Base[_0x21a5fb(0x923)][_0x21a5fb(0x471)][_0x21a5fb(0x481)](this),this['updateKeyText']();},Window_ButtonAssist[_0x5ca092(0x923)][_0x5ca092(0x507)]=function(){const _0x189420=_0x5ca092;this[_0x189420(0x67f)]=SceneManager[_0x189420(0x5b6)][_0x189420(0x63a)]()!==_0x189420(0x245)?0x0:0x8;},Window_ButtonAssist[_0x5ca092(0x923)]['updateKeyText']=function(){const _0x333553=_0x5ca092,_0x1f84c5=SceneManager['_scene'];for(let _0xc87f1b=0x1;_0xc87f1b<=0x5;_0xc87f1b++){if(this['_data'][_0x333553(0x74b)[_0x333553(0x7c2)](_0xc87f1b)]!==_0x1f84c5[_0x333553(0x84d)[_0x333553(0x7c2)](_0xc87f1b)]())return this['refresh']();if(this['_data'][_0x333553(0x81a)[_0x333553(0x7c2)](_0xc87f1b)]!==_0x1f84c5[_0x333553(0x2f7)[_0x333553(0x7c2)](_0xc87f1b)]())return this[_0x333553(0x7f7)]();}},Window_ButtonAssist[_0x5ca092(0x923)][_0x5ca092(0x7f7)]=function(){const _0x14edd0=_0x5ca092;this['contents'][_0x14edd0(0x6e2)]();for(let _0x7f69d8=0x1;_0x7f69d8<=0x5;_0x7f69d8++){this[_0x14edd0(0x1d3)](_0x7f69d8);}},Window_ButtonAssist[_0x5ca092(0x923)][_0x5ca092(0x1d3)]=function(_0x15ac47){const _0x437ba1=_0x5ca092,_0xfe8d8c=this['innerWidth']/0x5,_0x510368=SceneManager[_0x437ba1(0x5b6)],_0x4a91f5=_0x510368[_0x437ba1(0x84d)['format'](_0x15ac47)](),_0x2b726d=_0x510368['buttonAssistText%1'[_0x437ba1(0x7c2)](_0x15ac47)]();this['_data']['key%1'['format'](_0x15ac47)]=_0x4a91f5,this[_0x437ba1(0x607)][_0x437ba1(0x81a)[_0x437ba1(0x7c2)](_0x15ac47)]=_0x2b726d;if(_0x4a91f5==='')return;if(_0x2b726d==='')return;const _0x2cc27f=_0x510368[_0x437ba1(0x62f)[_0x437ba1(0x7c2)](_0x15ac47)](),_0x5b5a47=this[_0x437ba1(0x3c8)](),_0x10c76c=_0xfe8d8c*(_0x15ac47-0x1)+_0x5b5a47+_0x2cc27f,_0x17f9eb=VisuMZ[_0x437ba1(0x865)][_0x437ba1(0x225)][_0x437ba1(0x2d4)][_0x437ba1(0x660)];this[_0x437ba1(0x3fb)](_0x17f9eb[_0x437ba1(0x7c2)](_0x4a91f5,_0x2b726d),_0x10c76c,0x0,_0xfe8d8c-_0x5b5a47*0x2);},VisuMZ[_0x5ca092(0x865)]['Game_Interpreter_updateWaitMode']=Game_Interpreter[_0x5ca092(0x923)][_0x5ca092(0x2e7)],Game_Interpreter[_0x5ca092(0x923)][_0x5ca092(0x2e7)]=function(){const _0x594862=_0x5ca092;if($gameTemp[_0x594862(0x83c)]!==undefined)return VisuMZ['CoreEngine'][_0x594862(0x59c)]();return VisuMZ[_0x594862(0x865)][_0x594862(0x4f2)][_0x594862(0x481)](this);},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x59c)]=function(){const _0x1502f6=_0x5ca092,_0x46ee4b=$gameTemp['_pictureCoordinatesMode']||0x0;(_0x46ee4b<0x0||_0x46ee4b>0x64||TouchInput[_0x1502f6(0x420)]()||Input[_0x1502f6(0x6c9)](_0x1502f6(0x318)))&&($gameTemp['_pictureCoordinatesMode']=undefined,Input[_0x1502f6(0x6e2)](),TouchInput['clear']());const _0x494b00=$gameScreen['picture'](_0x46ee4b);return _0x494b00&&(_0x494b00['_x']=TouchInput['_x'],_0x494b00['_y']=TouchInput['_y']),VisuMZ['CoreEngine'][_0x1502f6(0x499)](),$gameTemp[_0x1502f6(0x83c)]!==undefined;},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x499)]=function(){const _0x3b6cd4=_0x5ca092,_0x5d2c6a=SceneManager[_0x3b6cd4(0x5b6)];if(!_0x5d2c6a)return;!_0x5d2c6a[_0x3b6cd4(0x610)]&&(SoundManager['playLoad'](),_0x5d2c6a['_pictureCoordinatesWindow']=new Window_PictureCoordinates(),_0x5d2c6a[_0x3b6cd4(0x61a)](_0x5d2c6a[_0x3b6cd4(0x610)])),$gameTemp[_0x3b6cd4(0x83c)]===undefined&&(SoundManager['playCancel'](),_0x5d2c6a[_0x3b6cd4(0x851)](_0x5d2c6a['_pictureCoordinatesWindow']),_0x5d2c6a[_0x3b6cd4(0x610)]=undefined);};function Window_PictureCoordinates(){const _0x3fc7bb=_0x5ca092;this[_0x3fc7bb(0x44e)](...arguments);}Window_PictureCoordinates[_0x5ca092(0x923)]=Object[_0x5ca092(0x49a)](Window_Base[_0x5ca092(0x923)]),Window_PictureCoordinates[_0x5ca092(0x923)]['constructor']=Window_PictureCoordinates,Window_PictureCoordinates[_0x5ca092(0x923)][_0x5ca092(0x44e)]=function(){const _0x5d12ea=_0x5ca092;this[_0x5d12ea(0x7f4)]='nah',this[_0x5d12ea(0x70e)]='nah',this[_0x5d12ea(0x710)]=_0x5d12ea(0x3ed);const _0x15f3be=this[_0x5d12ea(0x8f6)]();Window_Base[_0x5d12ea(0x923)]['initialize'][_0x5d12ea(0x481)](this,_0x15f3be),this['setBackgroundType'](0x2);},Window_PictureCoordinates[_0x5ca092(0x923)][_0x5ca092(0x8f6)]=function(){const _0x581e0e=_0x5ca092;let _0x1fb3eb=0x0,_0x119884=Graphics[_0x581e0e(0x2a0)]-this['lineHeight'](),_0x7c6994=Graphics[_0x581e0e(0x7b7)],_0x112f08=this['lineHeight']();return new Rectangle(_0x1fb3eb,_0x119884,_0x7c6994,_0x112f08);},Window_PictureCoordinates[_0x5ca092(0x923)][_0x5ca092(0x507)]=function(){this['padding']=0x0;},Window_PictureCoordinates[_0x5ca092(0x923)][_0x5ca092(0x471)]=function(){const _0x516250=_0x5ca092;Window_Base[_0x516250(0x923)]['update'][_0x516250(0x481)](this),this[_0x516250(0x60d)]();},Window_PictureCoordinates[_0x5ca092(0x923)][_0x5ca092(0x60d)]=function(){const _0x59e5c9=_0x5ca092;if(!this['needsUpdate']())return;this[_0x59e5c9(0x7f7)]();},Window_PictureCoordinates['prototype'][_0x5ca092(0x752)]=function(){const _0x47b29a=_0x5ca092,_0x18cfbc=$gameTemp['_pictureCoordinatesMode'],_0x26c0ce=$gameScreen[_0x47b29a(0x6ee)](_0x18cfbc);return _0x26c0ce?this[_0x47b29a(0x7f4)]!==_0x26c0ce[_0x47b29a(0x6cd)]||this['_lastX']!==_0x26c0ce['_x']||this['_lastY']!==_0x26c0ce['_y']:![];},Window_PictureCoordinates[_0x5ca092(0x923)]['refresh']=function(){const _0x3572ca=_0x5ca092;this[_0x3572ca(0x7d6)][_0x3572ca(0x6e2)]();const _0x3e9489=$gameTemp[_0x3572ca(0x83c)],_0x75903a=$gameScreen[_0x3572ca(0x6ee)](_0x3e9489);if(!_0x75903a)return;this[_0x3572ca(0x7f4)]=_0x75903a[_0x3572ca(0x6cd)],this['_lastX']=_0x75903a['_x'],this[_0x3572ca(0x710)]=_0x75903a['_y'];const _0x569e53=ColorManager['itemBackColor1']();this[_0x3572ca(0x7d6)][_0x3572ca(0x6bf)](0x0,0x0,this[_0x3572ca(0x21a)],this['innerHeight'],_0x569e53);const _0x554ce8=_0x3572ca(0x843)[_0x3572ca(0x7c2)](_0x75903a[_0x3572ca(0x6cd)]===0x0?_0x3572ca(0x862):_0x3572ca(0x5d2)),_0x5b2eed=_0x3572ca(0x4b8)[_0x3572ca(0x7c2)](_0x75903a['_x']),_0x3696ea='Y:\x20%1'['format'](_0x75903a['_y']),_0x2456c1=_0x3572ca(0x688)[_0x3572ca(0x7c2)](TextManager['getInputButtonString'](_0x3572ca(0x318)));let _0x2e168b=Math[_0x3572ca(0x229)](this[_0x3572ca(0x21a)]/0x4);this[_0x3572ca(0x286)](_0x554ce8,_0x2e168b*0x0,0x0,_0x2e168b),this['drawText'](_0x5b2eed,_0x2e168b*0x1,0x0,_0x2e168b,_0x3572ca(0x3bf)),this[_0x3572ca(0x286)](_0x3696ea,_0x2e168b*0x2,0x0,_0x2e168b,_0x3572ca(0x3bf));const _0x56d2a4=this[_0x3572ca(0x6a1)](_0x2456c1)['width'],_0x57bf82=this[_0x3572ca(0x21a)]-_0x56d2a4;this[_0x3572ca(0x3fb)](_0x2456c1,_0x57bf82,0x0,_0x56d2a4);};function Window_TextPopup(){const _0x4f3817=_0x5ca092;this[_0x4f3817(0x44e)](...arguments);}Window_TextPopup[_0x5ca092(0x923)]=Object[_0x5ca092(0x49a)](Window_Base['prototype']),Window_TextPopup['prototype'][_0x5ca092(0x2bb)]=Window_TextPopup,Window_TextPopup[_0x5ca092(0x2cf)]={'framesPerChar':VisuMZ[_0x5ca092(0x865)]['Settings'][_0x5ca092(0x57c)]['DurationPerChat']??1.5,'framesMin':VisuMZ['CoreEngine'][_0x5ca092(0x225)][_0x5ca092(0x57c)][_0x5ca092(0x376)]??0x5a,'framesMax':VisuMZ['CoreEngine']['Settings']['Window']['MaxDuration']??0x12c},Window_TextPopup[_0x5ca092(0x923)]['initialize']=function(){const _0x1f7055=_0x5ca092,_0x413f94=new Rectangle(0x0,0x0,0x1,0x1);Window_Base['prototype'][_0x1f7055(0x44e)][_0x1f7055(0x481)](this,_0x413f94),this['openness']=0x0,this[_0x1f7055(0x94b)]='',this[_0x1f7055(0x1f3)]=[],this[_0x1f7055(0x7ec)]=0x0;},Window_TextPopup[_0x5ca092(0x923)][_0x5ca092(0x5df)]=function(){return!![];},Window_TextPopup[_0x5ca092(0x923)]['addQueue']=function(_0x4c2bc7){const _0x219808=_0x5ca092;if(this[_0x219808(0x1f3)][this['_textQueue'][_0x219808(0x839)]-0x1]===_0x4c2bc7)return;this[_0x219808(0x1f3)][_0x219808(0x4a2)](_0x4c2bc7),SceneManager['_scene'][_0x219808(0x61a)](this);},Window_TextPopup[_0x5ca092(0x923)][_0x5ca092(0x471)]=function(){const _0x1e103a=_0x5ca092;Window_Base['prototype']['update'][_0x1e103a(0x481)](this),this['updateText'](),this[_0x1e103a(0x3c0)]();},Window_TextPopup['prototype']['updateText']=function(){const _0x3d8528=_0x5ca092;if(this['_text']!=='')return;if(this[_0x3d8528(0x1f3)][_0x3d8528(0x839)]<=0x0)return;if(!this[_0x3d8528(0x43c)]())return;this[_0x3d8528(0x94b)]=this[_0x3d8528(0x1f3)][_0x3d8528(0x906)]();const _0x1c42a7=Window_TextPopup[_0x3d8528(0x2cf)],_0x1f25b6=Math['ceil'](this[_0x3d8528(0x94b)]['length']*_0x1c42a7[_0x3d8528(0x73d)]);this['_timeDuration']=_0x1f25b6[_0x3d8528(0x266)](_0x1c42a7['framesMin'],_0x1c42a7['framesMax']);const _0x404217=this[_0x3d8528(0x6a1)](this['_text']);let _0x13d970=_0x404217[_0x3d8528(0x7b7)]+this[_0x3d8528(0x3c8)]()*0x2;_0x13d970+=$gameSystem[_0x3d8528(0x52e)]()*0x2;let _0x7ecae3=Math['max'](_0x404217[_0x3d8528(0x2a0)],this[_0x3d8528(0x2f6)]());_0x7ecae3+=$gameSystem[_0x3d8528(0x52e)]()*0x2;const _0x40294b=Math[_0x3d8528(0x75e)]((Graphics['width']-_0x13d970)/0x2),_0x412575=Math['round']((Graphics[_0x3d8528(0x2a0)]-_0x7ecae3)/0x2),_0x542fbe=new Rectangle(_0x40294b,_0x412575,_0x13d970,_0x7ecae3);this[_0x3d8528(0x41f)](_0x542fbe['x'],_0x542fbe['y'],_0x542fbe[_0x3d8528(0x7b7)],_0x542fbe[_0x3d8528(0x2a0)]),this[_0x3d8528(0x93b)](),this[_0x3d8528(0x7f7)](),this[_0x3d8528(0x5b7)](),SceneManager[_0x3d8528(0x5b6)][_0x3d8528(0x61a)](this);},Window_TextPopup[_0x5ca092(0x923)][_0x5ca092(0x7f7)]=function(){const _0x385b83=_0x5ca092,_0x3ab683=this[_0x385b83(0x517)]();this[_0x385b83(0x7d6)][_0x385b83(0x6e2)](),this[_0x385b83(0x3fb)](this[_0x385b83(0x94b)],_0x3ab683['x'],_0x3ab683['y'],_0x3ab683[_0x385b83(0x7b7)]);},Window_TextPopup[_0x5ca092(0x923)][_0x5ca092(0x3c0)]=function(){const _0xea521f=_0x5ca092;if(this[_0xea521f(0x640)]()||this[_0xea521f(0x94a)]())return;if(this[_0xea521f(0x7ec)]<=0x0)return;this['_timeDuration']--,this[_0xea521f(0x7ec)]<=0x0&&(this[_0xea521f(0x6ef)](),this[_0xea521f(0x94b)]='');},VisuMZ['ShowDevTools']=function(_0x415d89){const _0x55a724=_0x5ca092;if(Utils[_0x55a724(0x7c1)](_0x55a724(0x95c))){var _0x122b79=require(_0x55a724(0x343))['Window'][_0x55a724(0x39c)]();SceneManager[_0x55a724(0x689)]();if(_0x415d89)setTimeout(_0x122b79[_0x55a724(0x958)]['bind'](_0x122b79),0x190);}},VisuMZ[_0x5ca092(0x8e2)]=function(_0x3f410d,_0x5bda52){const _0x3d596e=_0x5ca092;_0x5bda52=_0x5bda52[_0x3d596e(0x351)]();var _0x2ca32f=1.70158,_0x1d2075=0.7;switch(_0x5bda52){case _0x3d596e(0x448):return _0x3f410d;case _0x3d596e(0x25c):return-0x1*Math[_0x3d596e(0x4c6)](_0x3f410d*(Math['PI']/0x2))+0x1;case _0x3d596e(0x365):return Math[_0x3d596e(0x62c)](_0x3f410d*(Math['PI']/0x2));case _0x3d596e(0x3a2):return-0.5*(Math[_0x3d596e(0x4c6)](Math['PI']*_0x3f410d)-0x1);case'INQUAD':return _0x3f410d*_0x3f410d;case _0x3d596e(0x8a3):return _0x3f410d*(0x2-_0x3f410d);case'INOUTQUAD':return _0x3f410d<0.5?0x2*_0x3f410d*_0x3f410d:-0x1+(0x4-0x2*_0x3f410d)*_0x3f410d;case _0x3d596e(0x3f1):return _0x3f410d*_0x3f410d*_0x3f410d;case'OUTCUBIC':var _0x528beb=_0x3f410d-0x1;return _0x528beb*_0x528beb*_0x528beb+0x1;case _0x3d596e(0x214):return _0x3f410d<0.5?0x4*_0x3f410d*_0x3f410d*_0x3f410d:(_0x3f410d-0x1)*(0x2*_0x3f410d-0x2)*(0x2*_0x3f410d-0x2)+0x1;case'INQUART':return _0x3f410d*_0x3f410d*_0x3f410d*_0x3f410d;case'OUTQUART':var _0x528beb=_0x3f410d-0x1;return 0x1-_0x528beb*_0x528beb*_0x528beb*_0x528beb;case _0x3d596e(0x4e8):var _0x528beb=_0x3f410d-0x1;return _0x3f410d<0.5?0x8*_0x3f410d*_0x3f410d*_0x3f410d*_0x3f410d:0x1-0x8*_0x528beb*_0x528beb*_0x528beb*_0x528beb;case'INQUINT':return _0x3f410d*_0x3f410d*_0x3f410d*_0x3f410d*_0x3f410d;case'OUTQUINT':var _0x528beb=_0x3f410d-0x1;return 0x1+_0x528beb*_0x528beb*_0x528beb*_0x528beb*_0x528beb;case _0x3d596e(0x753):var _0x528beb=_0x3f410d-0x1;return _0x3f410d<0.5?0x10*_0x3f410d*_0x3f410d*_0x3f410d*_0x3f410d*_0x3f410d:0x1+0x10*_0x528beb*_0x528beb*_0x528beb*_0x528beb*_0x528beb;case _0x3d596e(0x4aa):if(_0x3f410d===0x0)return 0x0;return Math[_0x3d596e(0x299)](0x2,0xa*(_0x3f410d-0x1));case _0x3d596e(0x46f):if(_0x3f410d===0x1)return 0x1;return-Math['pow'](0x2,-0xa*_0x3f410d)+0x1;case _0x3d596e(0x1c2):if(_0x3f410d===0x0||_0x3f410d===0x1)return _0x3f410d;var _0x1c484c=_0x3f410d*0x2,_0x1d5912=_0x1c484c-0x1;if(_0x1c484c<0x1)return 0.5*Math[_0x3d596e(0x299)](0x2,0xa*_0x1d5912);return 0.5*(-Math['pow'](0x2,-0xa*_0x1d5912)+0x2);case _0x3d596e(0x848):var _0x1c484c=_0x3f410d/0x1;return-0x1*(Math[_0x3d596e(0x729)](0x1-_0x1c484c*_0x3f410d)-0x1);case _0x3d596e(0x447):var _0x528beb=_0x3f410d-0x1;return Math[_0x3d596e(0x729)](0x1-_0x528beb*_0x528beb);case _0x3d596e(0x308):var _0x1c484c=_0x3f410d*0x2,_0x1d5912=_0x1c484c-0x2;if(_0x1c484c<0x1)return-0.5*(Math['sqrt'](0x1-_0x1c484c*_0x1c484c)-0x1);return 0.5*(Math[_0x3d596e(0x729)](0x1-_0x1d5912*_0x1d5912)+0x1);case _0x3d596e(0x68c):return _0x3f410d*_0x3f410d*((_0x2ca32f+0x1)*_0x3f410d-_0x2ca32f);case _0x3d596e(0x835):var _0x1c484c=_0x3f410d/0x1-0x1;return _0x1c484c*_0x1c484c*((_0x2ca32f+0x1)*_0x1c484c+_0x2ca32f)+0x1;break;case _0x3d596e(0x205):var _0x1c484c=_0x3f410d*0x2,_0x3363a5=_0x1c484c-0x2,_0x5380b8=_0x2ca32f*1.525;if(_0x1c484c<0x1)return 0.5*_0x1c484c*_0x1c484c*((_0x5380b8+0x1)*_0x1c484c-_0x5380b8);return 0.5*(_0x3363a5*_0x3363a5*((_0x5380b8+0x1)*_0x3363a5+_0x5380b8)+0x2);case _0x3d596e(0x3a5):if(_0x3f410d===0x0||_0x3f410d===0x1)return _0x3f410d;var _0x1c484c=_0x3f410d/0x1,_0x1d5912=_0x1c484c-0x1,_0x1d1896=0x1-_0x1d2075,_0x5380b8=_0x1d1896/(0x2*Math['PI'])*Math[_0x3d596e(0x8cf)](0x1);return-(Math[_0x3d596e(0x299)](0x2,0xa*_0x1d5912)*Math[_0x3d596e(0x62c)]((_0x1d5912-_0x5380b8)*(0x2*Math['PI'])/_0x1d1896));case _0x3d596e(0x8b7):var _0x1d1896=0x1-_0x1d2075,_0x1c484c=_0x3f410d*0x2;if(_0x3f410d===0x0||_0x3f410d===0x1)return _0x3f410d;var _0x5380b8=_0x1d1896/(0x2*Math['PI'])*Math[_0x3d596e(0x8cf)](0x1);return Math[_0x3d596e(0x299)](0x2,-0xa*_0x1c484c)*Math[_0x3d596e(0x62c)]((_0x1c484c-_0x5380b8)*(0x2*Math['PI'])/_0x1d1896)+0x1;case _0x3d596e(0x8b6):var _0x1d1896=0x1-_0x1d2075;if(_0x3f410d===0x0||_0x3f410d===0x1)return _0x3f410d;var _0x1c484c=_0x3f410d*0x2,_0x1d5912=_0x1c484c-0x1,_0x5380b8=_0x1d1896/(0x2*Math['PI'])*Math['asin'](0x1);if(_0x1c484c<0x1)return-0.5*(Math['pow'](0x2,0xa*_0x1d5912)*Math[_0x3d596e(0x62c)]((_0x1d5912-_0x5380b8)*(0x2*Math['PI'])/_0x1d1896));return Math[_0x3d596e(0x299)](0x2,-0xa*_0x1d5912)*Math[_0x3d596e(0x62c)]((_0x1d5912-_0x5380b8)*(0x2*Math['PI'])/_0x1d1896)*0.5+0x1;case _0x3d596e(0x5cc):var _0x1c484c=_0x3f410d/0x1;if(_0x1c484c<0x1/2.75)return 7.5625*_0x1c484c*_0x1c484c;else{if(_0x1c484c<0x2/2.75){var _0x3363a5=_0x1c484c-1.5/2.75;return 7.5625*_0x3363a5*_0x3363a5+0.75;}else{if(_0x1c484c<2.5/2.75){var _0x3363a5=_0x1c484c-2.25/2.75;return 7.5625*_0x3363a5*_0x3363a5+0.9375;}else{var _0x3363a5=_0x1c484c-2.625/2.75;return 7.5625*_0x3363a5*_0x3363a5+0.984375;}}}case _0x3d596e(0x43b):var _0x3466fe=0x1-VisuMZ[_0x3d596e(0x8e2)](0x1-_0x3f410d,_0x3d596e(0x512));return _0x3466fe;case'INOUTBOUNCE':if(_0x3f410d<0.5)var _0x3466fe=VisuMZ[_0x3d596e(0x8e2)](_0x3f410d*0x2,_0x3d596e(0x6a8))*0.5;else var _0x3466fe=VisuMZ['ApplyEasing'](_0x3f410d*0x2-0x1,_0x3d596e(0x512))*0.5+0.5;return _0x3466fe;default:return _0x3f410d;}},VisuMZ[_0x5ca092(0x56a)]=function(_0x569336){const _0x27bbef=_0x5ca092;_0x569336=String(_0x569336)[_0x27bbef(0x351)]();const _0x4aea9a=VisuMZ[_0x27bbef(0x865)][_0x27bbef(0x225)][_0x27bbef(0x514)];if(_0x569336===_0x27bbef(0x5f0))return _0x4aea9a[_0x27bbef(0x54c)];if(_0x569336===_0x27bbef(0x6ea))return _0x4aea9a[_0x27bbef(0x8d2)];if(_0x569336===_0x27bbef(0x6d2))return _0x4aea9a[_0x27bbef(0x388)];if(_0x569336===_0x27bbef(0x27d))return _0x4aea9a[_0x27bbef(0x869)];if(_0x569336===_0x27bbef(0x6a4))return _0x4aea9a[_0x27bbef(0x38c)];if(_0x569336===_0x27bbef(0x836))return _0x4aea9a[_0x27bbef(0x34b)];if(_0x569336===_0x27bbef(0x611))return _0x4aea9a[_0x27bbef(0x402)];if(_0x569336===_0x27bbef(0x938))return _0x4aea9a['IconParam7'];if(_0x569336===_0x27bbef(0x6f0))return _0x4aea9a[_0x27bbef(0x8e1)];if(_0x569336===_0x27bbef(0x3bc))return _0x4aea9a[_0x27bbef(0x962)];if(_0x569336==='CRI')return _0x4aea9a[_0x27bbef(0x627)];if(_0x569336===_0x27bbef(0x2dd))return _0x4aea9a[_0x27bbef(0x764)];if(_0x569336===_0x27bbef(0x7d7))return _0x4aea9a[_0x27bbef(0x975)];if(_0x569336===_0x27bbef(0x1f4))return _0x4aea9a['IconXParam5'];if(_0x569336===_0x27bbef(0x368))return _0x4aea9a[_0x27bbef(0x866)];if(_0x569336==='HRG')return _0x4aea9a['IconXParam7'];if(_0x569336===_0x27bbef(0x8b0))return _0x4aea9a[_0x27bbef(0x7e2)];if(_0x569336==='TRG')return _0x4aea9a[_0x27bbef(0x2dc)];if(_0x569336===_0x27bbef(0x802))return _0x4aea9a[_0x27bbef(0x56f)];if(_0x569336===_0x27bbef(0x91a))return _0x4aea9a[_0x27bbef(0x1f9)];if(_0x569336==='REC')return _0x4aea9a[_0x27bbef(0x406)];if(_0x569336===_0x27bbef(0x92e))return _0x4aea9a[_0x27bbef(0x4bf)];if(_0x569336===_0x27bbef(0x28a))return _0x4aea9a[_0x27bbef(0x59e)];if(_0x569336===_0x27bbef(0x782))return _0x4aea9a['IconSParam5'];if(_0x569336===_0x27bbef(0x5ea))return _0x4aea9a[_0x27bbef(0x5f9)];if(_0x569336===_0x27bbef(0x747))return _0x4aea9a['IconSParam7'];if(_0x569336===_0x27bbef(0x323))return _0x4aea9a['IconSParam8'];if(_0x569336===_0x27bbef(0x7f1))return _0x4aea9a[_0x27bbef(0x4a5)];if(VisuMZ[_0x27bbef(0x865)][_0x27bbef(0x95f)][_0x569336])return VisuMZ[_0x27bbef(0x865)]['CustomParamIcons'][_0x569336]||0x0;return 0x0;},VisuMZ[_0x5ca092(0x66c)]=function(_0x4373f3,_0x325d43,_0x22b1de){const _0x1be54d=_0x5ca092;if(_0x22b1de===undefined&&_0x4373f3%0x1===0x0)return _0x4373f3;if(_0x22b1de!==undefined&&[_0x1be54d(0x5f0),_0x1be54d(0x6ea),_0x1be54d(0x6d2),_0x1be54d(0x27d),'MAT',_0x1be54d(0x836),_0x1be54d(0x611),'LUK'][_0x1be54d(0x3f8)](String(_0x22b1de)['toUpperCase']()['trim']()))return _0x4373f3;_0x325d43=_0x325d43||0x0;if(VisuMZ['CoreEngine'][_0x1be54d(0x62a)][_0x22b1de])return VisuMZ[_0x1be54d(0x865)][_0x1be54d(0x30b)][_0x22b1de]===_0x1be54d(0x77f)?_0x4373f3:String((_0x4373f3*0x64)[_0x1be54d(0x5a0)](_0x325d43))+'%';return String((_0x4373f3*0x64)[_0x1be54d(0x5a0)](_0x325d43))+'%';},VisuMZ[_0x5ca092(0x5d5)]=function(_0x3c375d){const _0x3c8a06=_0x5ca092;_0x3c375d=String(_0x3c375d);if(!_0x3c375d)return _0x3c375d;if(typeof _0x3c375d!=='string')return _0x3c375d;const _0x2add11=VisuMZ[_0x3c8a06(0x865)][_0x3c8a06(0x225)][_0x3c8a06(0x656)][_0x3c8a06(0x676)]||'en-US',_0x107261={'maximumFractionDigits':0x6};_0x3c375d=_0x3c375d[_0x3c8a06(0x6ff)](/\[(.*?)\]/g,(_0x70b6e8,_0x575ea9)=>{const _0x1268cf=_0x3c8a06;return VisuMZ[_0x1268cf(0x63d)](_0x575ea9,'[',']');}),_0x3c375d=_0x3c375d[_0x3c8a06(0x6ff)](/<(.*?)>/g,(_0x571b45,_0x4fe57a)=>{const _0xd29707=_0x3c8a06;return VisuMZ[_0xd29707(0x63d)](_0x4fe57a,'<','>');}),_0x3c375d=_0x3c375d[_0x3c8a06(0x6ff)](/\{\{(.*?)\}\}/g,(_0xe8d5ca,_0x2356f7)=>{const _0x316286=_0x3c8a06;return VisuMZ[_0x316286(0x63d)](_0x2356f7,'','');}),_0x3c375d=_0x3c375d['replace'](/(\d+\.?\d*)/g,(_0x34aa9f,_0x646adc)=>{const _0x2b7cef=_0x3c8a06;let _0x216585=_0x646adc;if(_0x216585[0x0]==='0')return _0x216585;if(_0x216585[_0x216585[_0x2b7cef(0x839)]-0x1]==='.')return Number(_0x216585)[_0x2b7cef(0x94d)](_0x2add11,_0x107261)+'.';else return _0x216585[_0x216585[_0x2b7cef(0x839)]-0x1]===','?Number(_0x216585)[_0x2b7cef(0x94d)](_0x2add11,_0x107261)+',':Number(_0x216585)[_0x2b7cef(0x94d)](_0x2add11,_0x107261);});let _0xea0544=0x3;while(_0xea0544--){_0x3c375d=VisuMZ[_0x3c8a06(0x609)](_0x3c375d);}return _0x3c375d;},VisuMZ[_0x5ca092(0x63d)]=function(_0xccaa25,_0x6be60e,_0x32f4d6){const _0x2a9e6e=_0x5ca092;return _0xccaa25=_0xccaa25[_0x2a9e6e(0x6ff)](/(\d)/gi,(_0x5b2e32,_0x220b8a)=>_0x2a9e6e(0x8cd)[_0x2a9e6e(0x7c2)](Number(_0x220b8a))),_0x2a9e6e(0x7f9)[_0x2a9e6e(0x7c2)](_0xccaa25,_0x6be60e,_0x32f4d6);},VisuMZ['RevertPreserveNumbers']=function(_0x2f14b4){const _0x3b1591=_0x5ca092;return _0x2f14b4=_0x2f14b4[_0x3b1591(0x6ff)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x134ea0,_0x1095fa)=>Number(parseInt(_0x1095fa))),_0x2f14b4;},VisuMZ[_0x5ca092(0x95b)]=function(_0xa6405){const _0x542cfc=_0x5ca092;SoundManager[_0x542cfc(0x7bc)]();if(!Utils['isNwjs']()){const _0x38353e=window[_0x542cfc(0x5b7)](_0xa6405,_0x542cfc(0x6a5));}else{const _0x3f27c2=process[_0x542cfc(0x559)]==_0x542cfc(0x8a9)?'open':process['platform']==_0x542cfc(0x3f9)?_0x542cfc(0x412):_0x542cfc(0x45d);require(_0x542cfc(0x37b))[_0x542cfc(0x760)](_0x3f27c2+'\x20'+_0xa6405);}},VisuMZ[_0x5ca092(0x217)]=function(_0x615091,_0x38c0db){const _0x248e40=_0x5ca092;if(!_0x615091)return'';const _0x37f032=_0x615091['baseId']||_0x615091['id'];let _0x551fdc='';return _0x615091[_0x248e40(0x970)]!==undefined&&_0x615091[_0x248e40(0x4b7)]!==undefined&&(_0x551fdc='Actor-%1-%2'[_0x248e40(0x7c2)](_0x37f032,_0x38c0db)),_0x615091['expParams']!==undefined&&_0x615091[_0x248e40(0x276)]!==undefined&&(_0x551fdc=_0x248e40(0x8c7)['format'](_0x37f032,_0x38c0db)),_0x615091[_0x248e40(0x749)]!==undefined&&_0x615091['requiredWtypeId1']!==undefined&&(_0x551fdc=_0x248e40(0x458)[_0x248e40(0x7c2)](_0x37f032,_0x38c0db)),_0x615091['itypeId']!==undefined&&_0x615091[_0x248e40(0x696)]!==undefined&&(_0x551fdc=_0x248e40(0x6f7)[_0x248e40(0x7c2)](_0x37f032,_0x38c0db)),_0x615091[_0x248e40(0x86f)]!==undefined&&_0x615091[_0x248e40(0x81f)]===0x1&&(_0x551fdc=_0x248e40(0x755)['format'](_0x37f032,_0x38c0db)),_0x615091[_0x248e40(0x761)]!==undefined&&_0x615091['etypeId']>0x1&&(_0x551fdc=_0x248e40(0x202)[_0x248e40(0x7c2)](_0x37f032,_0x38c0db)),_0x615091[_0x248e40(0x533)]!==undefined&&_0x615091['battlerHue']!==undefined&&(_0x551fdc=_0x248e40(0x742)[_0x248e40(0x7c2)](_0x37f032,_0x38c0db)),_0x615091[_0x248e40(0x623)]!==undefined&&_0x615091['maxTurns']!==undefined&&(_0x551fdc=_0x248e40(0x80a)[_0x248e40(0x7c2)](_0x37f032,_0x38c0db)),_0x551fdc;},Window_Base[_0x5ca092(0x923)][_0x5ca092(0x478)]=function(_0x81ef3c,_0x1fcb28){const _0x32f067=_0x5ca092;if(_0x1fcb28[_0x32f067(0x86e)]){let _0x2d6ea7=0x2;this[_0x32f067(0x2f6)]()>0x24&&(_0x2d6ea7=Math[_0x32f067(0x229)]((this[_0x32f067(0x2f6)]()-ImageManager['iconHeight'])/0x2)),this[_0x32f067(0x2a6)](_0x81ef3c,_0x1fcb28['x']+0x2,_0x1fcb28['y']+_0x2d6ea7);}_0x1fcb28['x']+=ImageManager[_0x32f067(0x90c)]+0x4;},Game_Picture['prototype'][_0x5ca092(0x6a9)]=function(){const _0xc64670=_0x5ca092;return this[_0xc64670(0x616)];},VisuMZ['CoreEngine'][_0x5ca092(0x807)]=Game_Picture[_0x5ca092(0x923)]['initBasic'],Game_Picture[_0x5ca092(0x923)]['initBasic']=function(){const _0x3bd79a=_0x5ca092;VisuMZ[_0x3bd79a(0x865)]['Game_Picture_initBasic'][_0x3bd79a(0x481)](this),this[_0x3bd79a(0x616)]={'x':0x0,'y':0x0},this[_0x3bd79a(0x226)]={'x':0x0,'y':0x0};},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x32e)]=Game_Picture['prototype'][_0x5ca092(0x69d)],Game_Picture[_0x5ca092(0x923)][_0x5ca092(0x69d)]=function(){const _0x10339c=_0x5ca092;this[_0x10339c(0x3d6)]();const _0x101a2d=this[_0x10339c(0x1f6)];VisuMZ[_0x10339c(0x865)][_0x10339c(0x32e)]['call'](this),_0x101a2d>0x0&&this[_0x10339c(0x1f6)]<=0x0&&(this['_x']=this[_0x10339c(0x30e)],this['_y']=this[_0x10339c(0x39f)],this[_0x10339c(0x61e)]=this['_targetScaleX'],this['_scaleY']=this[_0x10339c(0x25a)],this[_0x10339c(0x639)]=this['_targetOpacity'],this[_0x10339c(0x616)]&&(this[_0x10339c(0x616)]['x']=this['_targetAnchor']['x'],this['_anchor']['y']=this[_0x10339c(0x226)]['y']));},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x8c9)]=Game_Picture[_0x5ca092(0x923)][_0x5ca092(0x426)],Game_Picture[_0x5ca092(0x923)][_0x5ca092(0x426)]=function(_0x230036,_0x36fdf3,_0x581f47,_0x4a420b,_0x5850a1,_0x372138,_0x551344,_0x3c9aae){const _0x3c5444=_0x5ca092;VisuMZ[_0x3c5444(0x865)]['Game_Picture_show']['call'](this,_0x230036,_0x36fdf3,_0x581f47,_0x4a420b,_0x5850a1,_0x372138,_0x551344,_0x3c9aae),this[_0x3c5444(0x70b)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x36fdf3]||{'x':0x0,'y':0x0});},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x820)]=Game_Picture[_0x5ca092(0x923)]['move'],Game_Picture[_0x5ca092(0x923)][_0x5ca092(0x41f)]=function(_0x4bda96,_0x238d14,_0x34d0dd,_0x36b3a6,_0x4d1fd0,_0x546e43,_0x2f0b01,_0x92476b,_0x44e2b6){const _0x2e359a=_0x5ca092;VisuMZ[_0x2e359a(0x865)][_0x2e359a(0x820)]['call'](this,_0x4bda96,_0x238d14,_0x34d0dd,_0x36b3a6,_0x4d1fd0,_0x546e43,_0x2f0b01,_0x92476b,_0x44e2b6),this['setTargetAnchor']([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x4bda96]||{'x':0x0,'y':0x0});},Game_Picture[_0x5ca092(0x923)][_0x5ca092(0x3d6)]=function(){const _0x3c8e3b=_0x5ca092;this[_0x3c8e3b(0x1f6)]>0x0&&(this[_0x3c8e3b(0x616)]['x']=this[_0x3c8e3b(0x832)](this[_0x3c8e3b(0x616)]['x'],this['_targetAnchor']['x']),this[_0x3c8e3b(0x616)]['y']=this[_0x3c8e3b(0x832)](this[_0x3c8e3b(0x616)]['y'],this[_0x3c8e3b(0x226)]['y']));},Game_Picture[_0x5ca092(0x923)][_0x5ca092(0x70b)]=function(_0x4e69ac){const _0x1dea28=_0x5ca092;this[_0x1dea28(0x616)]=_0x4e69ac,this[_0x1dea28(0x226)]=JsonEx[_0x1dea28(0x54f)](this[_0x1dea28(0x616)]);},Game_Picture[_0x5ca092(0x923)][_0x5ca092(0x3e7)]=function(_0x321485){const _0x2bdfe3=_0x5ca092;this[_0x2bdfe3(0x226)]=_0x321485;},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x64b)]=Sprite_Picture[_0x5ca092(0x923)][_0x5ca092(0x1e8)],Sprite_Picture[_0x5ca092(0x923)]['updateOrigin']=function(){const _0x316e7c=_0x5ca092,_0x4eb456=this['picture']();!_0x4eb456[_0x316e7c(0x6a9)]()?VisuMZ['CoreEngine'][_0x316e7c(0x64b)][_0x316e7c(0x481)](this):(this[_0x316e7c(0x6a9)]['x']=_0x4eb456[_0x316e7c(0x6a9)]()['x'],this[_0x316e7c(0x6a9)]['y']=_0x4eb456[_0x316e7c(0x6a9)]()['y']);},Game_Action[_0x5ca092(0x923)][_0x5ca092(0x7b6)]=function(_0x3c8128){const _0x7187=_0x5ca092;if(_0x3c8128){const _0x203746=_0x3c8128[_0x7187(0x219)];if(_0x203746===0x1&&this['subject']()[_0x7187(0x7ff)]()!==0x1)this[_0x7187(0x544)]();else _0x203746===0x2&&this['subject']()[_0x7187(0x7e0)]()!==0x2?this[_0x7187(0x218)]():this[_0x7187(0x3fd)](_0x203746);}else this['clear']();},Game_Actor[_0x5ca092(0x923)]['usableSkills']=function(){const _0x39217e=_0x5ca092;return this[_0x39217e(0x931)]()[_0x39217e(0x4a1)](_0x549c57=>this[_0x39217e(0x3db)](_0x549c57)&&this[_0x39217e(0x690)]()[_0x39217e(0x3f8)](_0x549c57[_0x39217e(0x749)]));},Window_Base[_0x5ca092(0x923)][_0x5ca092(0x3ee)]=function(){const _0xba707b=_0x5ca092;this[_0xba707b(0x672)]=new Sprite(),this['_dimmerSprite'][_0xba707b(0x625)]=new Bitmap(0x0,0x0),this[_0xba707b(0x672)]['x']=0x0,this[_0xba707b(0x42f)](this['_dimmerSprite']);},Window_Base['prototype'][_0x5ca092(0x72d)]=function(){const _0x1acb0e=_0x5ca092;if(this[_0x1acb0e(0x672)]){const _0x213a1c=this['_dimmerSprite'][_0x1acb0e(0x625)],_0x367078=this['width'],_0x5af5d5=this[_0x1acb0e(0x2a0)],_0x33c2d7=this[_0x1acb0e(0x67f)],_0x5530f8=ColorManager[_0x1acb0e(0x852)](),_0x4d2a6a=ColorManager[_0x1acb0e(0x416)]();_0x213a1c[_0x1acb0e(0x3d4)](_0x367078,_0x5af5d5),_0x213a1c[_0x1acb0e(0x954)](0x0,0x0,_0x367078,_0x33c2d7,_0x4d2a6a,_0x5530f8,!![]),_0x213a1c['fillRect'](0x0,_0x33c2d7,_0x367078,_0x5af5d5-_0x33c2d7*0x2,_0x5530f8),_0x213a1c[_0x1acb0e(0x954)](0x0,_0x5af5d5-_0x33c2d7,_0x367078,_0x33c2d7,_0x5530f8,_0x4d2a6a,!![]),this[_0x1acb0e(0x672)][_0x1acb0e(0x682)](0x0,0x0,_0x367078,_0x5af5d5);}},Game_Actor['prototype'][_0x5ca092(0x247)]=function(){const _0x3322b8=_0x5ca092;for(let _0xaea909=0x0;_0xaea909<this[_0x3322b8(0x574)]();_0xaea909++){const _0x3ddef7=this[_0x3322b8(0x944)]();let _0x35f8c7=Number[_0x3322b8(0x8f3)];this['setAction'](_0xaea909,_0x3ddef7[0x0]);for(const _0x32b75c of _0x3ddef7){const _0x1c36b0=_0x32b75c['evaluate']();_0x1c36b0>_0x35f8c7&&(_0x35f8c7=_0x1c36b0,this['setAction'](_0xaea909,_0x32b75c));}}this[_0x3322b8(0x873)](_0x3322b8(0x790));},Window_BattleItem['prototype'][_0x5ca092(0x838)]=function(_0x2c4793){const _0x12aac5=_0x5ca092;return BattleManager[_0x12aac5(0x502)]()?BattleManager[_0x12aac5(0x502)]()['canUse'](_0x2c4793):Window_ItemList[_0x12aac5(0x923)][_0x12aac5(0x838)]['call'](this,_0x2c4793);},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x652)]=Scene_Map['prototype'][_0x5ca092(0x29d)],Scene_Map[_0x5ca092(0x923)][_0x5ca092(0x29d)]=function(){const _0x43e694=_0x5ca092;VisuMZ[_0x43e694(0x865)][_0x43e694(0x652)][_0x43e694(0x481)](this);const _0x291650=this['_spriteset'][_0x43e694(0x1c8)];if(_0x291650)this['addChild'](_0x291650);},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x38a)]=Scene_Battle[_0x5ca092(0x923)]['createSpriteset'],Scene_Battle[_0x5ca092(0x923)][_0x5ca092(0x29d)]=function(){const _0x2933e8=_0x5ca092;VisuMZ[_0x2933e8(0x865)][_0x2933e8(0x38a)][_0x2933e8(0x481)](this);const _0x26ed32=this['_spriteset']['_timerSprite'];if(_0x26ed32)this['addChild'](_0x26ed32);},Sprite_Actor['prototype'][_0x5ca092(0x471)]=function(){const _0x590d62=_0x5ca092;Sprite_Battler[_0x590d62(0x923)][_0x590d62(0x471)]['call'](this),this[_0x590d62(0x921)]();if(this[_0x590d62(0x336)])this['updateMotion']();else this[_0x590d62(0x4a7)]!==''&&(this['_battlerName']='');},Window['prototype']['_refreshArrows']=function(){const _0x12da6a=_0x5ca092,_0x3f5754=this[_0x12da6a(0x5a7)],_0x13b5e0=this[_0x12da6a(0x3ca)],_0x45adeb=0x18,_0x258f3e=_0x45adeb/0x2,_0xade8a0=0x60+_0x45adeb,_0x55b305=0x0+_0x45adeb;this[_0x12da6a(0x67e)][_0x12da6a(0x625)]=this[_0x12da6a(0x584)],this[_0x12da6a(0x67e)][_0x12da6a(0x6a9)]['x']=0.5,this[_0x12da6a(0x67e)][_0x12da6a(0x6a9)]['y']=0.5,this[_0x12da6a(0x67e)][_0x12da6a(0x682)](_0xade8a0+_0x258f3e,_0x55b305+_0x258f3e+_0x45adeb,_0x45adeb,_0x258f3e),this[_0x12da6a(0x67e)][_0x12da6a(0x41f)](Math[_0x12da6a(0x75e)](_0x3f5754/0x2),Math[_0x12da6a(0x75e)](_0x13b5e0-_0x258f3e)),this[_0x12da6a(0x881)][_0x12da6a(0x625)]=this[_0x12da6a(0x584)],this[_0x12da6a(0x881)][_0x12da6a(0x6a9)]['x']=0.5,this['_upArrowSprite'][_0x12da6a(0x6a9)]['y']=0.5,this[_0x12da6a(0x881)][_0x12da6a(0x682)](_0xade8a0+_0x258f3e,_0x55b305,_0x45adeb,_0x258f3e),this[_0x12da6a(0x881)][_0x12da6a(0x41f)](Math['round'](_0x3f5754/0x2),Math[_0x12da6a(0x75e)](_0x258f3e));},Window[_0x5ca092(0x923)][_0x5ca092(0x3fc)]=function(){const _0x148d27=_0x5ca092,_0x3bf3cf=0x90,_0x5d0b88=0x60,_0x5c6c6d=0x18;this[_0x148d27(0x2fe)][_0x148d27(0x625)]=this[_0x148d27(0x584)],this[_0x148d27(0x2fe)][_0x148d27(0x6a9)]['x']=0.5,this[_0x148d27(0x2fe)][_0x148d27(0x6a9)]['y']=0x1,this[_0x148d27(0x2fe)][_0x148d27(0x41f)](Math[_0x148d27(0x75e)](this[_0x148d27(0x5a7)]/0x2),this[_0x148d27(0x3ca)]),this[_0x148d27(0x2fe)][_0x148d27(0x682)](_0x3bf3cf,_0x5d0b88,_0x5c6c6d,_0x5c6c6d),this[_0x148d27(0x2fe)][_0x148d27(0x772)]=0xff;},Window[_0x5ca092(0x923)]['_updateFilterArea']=function(){const _0x4c4648=_0x5ca092,_0x31329e=this['_clientArea'][_0x4c4648(0x942)][_0x4c4648(0x92a)](new Point(0x0,0x0)),_0x30036f=this[_0x4c4648(0x7e9)][_0x4c4648(0x606)];_0x30036f['x']=_0x31329e['x']+this[_0x4c4648(0x8a1)]['x'],_0x30036f['y']=_0x31329e['y']+this['origin']['y'],_0x30036f[_0x4c4648(0x7b7)]=Math[_0x4c4648(0x8e7)](this[_0x4c4648(0x21a)]*this[_0x4c4648(0x589)]['x']),_0x30036f[_0x4c4648(0x2a0)]=Math[_0x4c4648(0x8e7)](this[_0x4c4648(0x6b2)]*this[_0x4c4648(0x589)]['y']);},VisuMZ['CoreEngine'][_0x5ca092(0x3a4)]=Window['prototype']['_refreshBack'],Window['prototype']['_refreshBack']=function(){const _0x7ad9bf=_0x5ca092,_0x36b88f=VisuMZ[_0x7ad9bf(0x865)][_0x7ad9bf(0x225)]['Window'][_0x7ad9bf(0x722)]??!![];if(!_0x36b88f)return VisuMZ[_0x7ad9bf(0x865)][_0x7ad9bf(0x3a4)][_0x7ad9bf(0x481)](this);const _0xb43e13=this[_0x7ad9bf(0x51c)],_0x4fc9be=Math['max'](0x0,this[_0x7ad9bf(0x5a7)]-_0xb43e13*0x2),_0xf85528=Math[_0x7ad9bf(0x8e4)](0x0,this[_0x7ad9bf(0x3ca)]-_0xb43e13*0x2),_0x515087=this[_0x7ad9bf(0x6ca)],_0x39bb5d=_0x515087[_0x7ad9bf(0x7a8)][0x0];_0x515087[_0x7ad9bf(0x625)]=this['_windowskin'],_0x515087['setFrame'](0x0,0x0,0x60,0x60),_0x515087[_0x7ad9bf(0x41f)](_0xb43e13,_0xb43e13),_0x515087[_0x7ad9bf(0x589)]['x']=_0x4fc9be/0x60,_0x515087[_0x7ad9bf(0x589)]['y']=_0xf85528/0x60,_0x39bb5d[_0x7ad9bf(0x625)]=this[_0x7ad9bf(0x584)],_0x39bb5d[_0x7ad9bf(0x682)](0x0,0x60,0x60,0x60),_0x39bb5d[_0x7ad9bf(0x41f)](0x0,0x0,_0x4fc9be,_0xf85528),_0x39bb5d[_0x7ad9bf(0x589)]['x']=0x1/_0x515087['scale']['x'],_0x39bb5d['scale']['y']=0x1/_0x515087[_0x7ad9bf(0x589)]['y'],_0x515087[_0x7ad9bf(0x56b)](this[_0x7ad9bf(0x3c2)]);},Game_Temp[_0x5ca092(0x923)]['sceneTerminationClearEffects']=function(){const _0x42a569=_0x5ca092;this[_0x42a569(0x418)]=[],this[_0x42a569(0x2a3)]=[],this[_0x42a569(0x728)]=[],this['_balloonQueue']=[];},VisuMZ['CoreEngine']['Scene_Base_terminateAnimationClearBugFix']=Scene_Base['prototype'][_0x5ca092(0x561)],Scene_Base[_0x5ca092(0x923)][_0x5ca092(0x561)]=function(){const _0x5e83fa=_0x5ca092;if($gameTemp)$gameTemp['sceneTerminationClearEffects']();VisuMZ[_0x5e83fa(0x865)]['Scene_Base_terminateAnimationClearBugFix'][_0x5e83fa(0x481)](this);},Bitmap[_0x5ca092(0x923)][_0x5ca092(0x3b6)]=function(_0x2c6c7a){const _0xa1b1c=_0x5ca092,_0x5499e4=this[_0xa1b1c(0x3ab)];_0x5499e4[_0xa1b1c(0x5d0)](),_0x5499e4[_0xa1b1c(0x3fe)]=this['_makeFontNameText']();const _0x22b1c1=_0x5499e4[_0xa1b1c(0x567)](_0x2c6c7a)[_0xa1b1c(0x7b7)];return _0x5499e4[_0xa1b1c(0x799)](),_0x22b1c1;},Window_Message[_0x5ca092(0x923)][_0x5ca092(0x6b1)]=function(_0x4a741e){const _0xcc4d9a=_0x5ca092;return this[_0xcc4d9a(0x342)]()?this[_0xcc4d9a(0x7d6)][_0xcc4d9a(0x3b6)](_0x4a741e):Window_Base['prototype'][_0xcc4d9a(0x6b1)][_0xcc4d9a(0x481)](this,_0x4a741e);},Window_Message[_0x5ca092(0x923)]['useFontWidthFix']=function(){const _0x304ac2=_0x5ca092;return VisuMZ[_0x304ac2(0x865)][_0x304ac2(0x225)][_0x304ac2(0x656)][_0x304ac2(0x200)]??!![];},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x7bb)]=Game_Action['prototype']['numRepeats'],Game_Action['prototype'][_0x5ca092(0x7ca)]=function(){const _0x4d5a77=_0x5ca092;return this[_0x4d5a77(0x6d5)]()?VisuMZ[_0x4d5a77(0x865)][_0x4d5a77(0x7bb)][_0x4d5a77(0x481)](this):0x0;},VisuMZ['CoreEngine'][_0x5ca092(0x791)]=Game_Action[_0x5ca092(0x923)][_0x5ca092(0x544)],Game_Action['prototype'][_0x5ca092(0x544)]=function(){const _0x30099b=_0x5ca092;if(this[_0x30099b(0x563)]()&&this[_0x30099b(0x563)]()[_0x30099b(0x557)]())VisuMZ[_0x30099b(0x865)][_0x30099b(0x791)][_0x30099b(0x481)](this);else BattleManager[_0x30099b(0x794)]?VisuMZ[_0x30099b(0x865)][_0x30099b(0x791)]['call'](this):this[_0x30099b(0x6e2)]();},VisuMZ['CoreEngine']['BattleManager_invokeCounterAttack']=BattleManager[_0x5ca092(0x2e9)],BattleManager[_0x5ca092(0x2e9)]=function(_0x8cb46b,_0x5dfb80){const _0x150ddd=_0x5ca092;this['_bypassCanCounterCheck']=!![],VisuMZ[_0x150ddd(0x865)][_0x150ddd(0x3c1)][_0x150ddd(0x481)](this,_0x8cb46b,_0x5dfb80),this[_0x150ddd(0x794)]=undefined;},Sprite_Name[_0x5ca092(0x923)]['bitmapHeight']=function(){return 0x24;},Sprite_Name[_0x5ca092(0x923)][_0x5ca092(0x92d)]=function(){const _0x2a6035=_0x5ca092,_0x246af3=this[_0x2a6035(0x7a5)](),_0x4d41f0=this['bitmapWidth'](),_0x30c974=this[_0x2a6035(0x541)]();this[_0x2a6035(0x4d5)](),this[_0x2a6035(0x625)][_0x2a6035(0x6e2)](),this['bitmap']['drawTextTopAligned'](_0x246af3,0x4,0x0,_0x4d41f0-0xa,_0x30c974,_0x2a6035(0x841));},Bitmap[_0x5ca092(0x923)]['drawTextTopAligned']=function(_0x36f5bc,_0x4b05a5,_0xf788c0,_0x26044c,_0xd45316,_0x2d5f8e){const _0x15ba1e=_0x5ca092,_0x2705c3=this['context'],_0x595326=_0x2705c3['globalAlpha'];_0x26044c=_0x26044c||0xffffffff;let _0x259959=_0x4b05a5,_0xfaf5cb=Math[_0x15ba1e(0x75e)](_0xf788c0+0x18/0x2+this['fontSize']*0.35);_0x2d5f8e==='center'&&(_0x259959+=_0x26044c/0x2),_0x2d5f8e===_0x15ba1e(0x254)&&(_0x259959+=_0x26044c),_0x2705c3[_0x15ba1e(0x5d0)](),_0x2705c3[_0x15ba1e(0x3fe)]=this[_0x15ba1e(0x50d)](),_0x2705c3[_0x15ba1e(0x26e)]=_0x2d5f8e,_0x2705c3[_0x15ba1e(0x79f)]='alphabetic',_0x2705c3[_0x15ba1e(0x4d3)]=0x1,this['_drawTextOutline'](_0x36f5bc,_0x259959,_0xfaf5cb,_0x26044c),_0x2705c3[_0x15ba1e(0x4d3)]=_0x595326,this[_0x15ba1e(0x806)](_0x36f5bc,_0x259959,_0xfaf5cb,_0x26044c),_0x2705c3[_0x15ba1e(0x799)](),this['_baseTexture'][_0x15ba1e(0x471)]();},VisuMZ[_0x5ca092(0x865)]['BattleManager_checkSubstitute']=BattleManager[_0x5ca092(0x7bd)],BattleManager['checkSubstitute']=function(_0x2a1ca7){const _0x59bb2d=_0x5ca092;if(this['_action']['isForFriend']())return![];return VisuMZ[_0x59bb2d(0x865)][_0x59bb2d(0x503)][_0x59bb2d(0x481)](this,_0x2a1ca7);},BattleManager[_0x5ca092(0x95d)]=function(){const _0x413087=_0x5ca092;if(this['_subject'])this[_0x413087(0x42e)]['endAction'](this[_0x413087(0x2b2)]);this['_phase']=_0x413087(0x740),this[_0x413087(0x2b2)]&&this[_0x413087(0x2b2)][_0x413087(0x574)]()===0x0&&(this[_0x413087(0x57a)](this[_0x413087(0x2b2)]),this[_0x413087(0x2b2)]=null);},Bitmap[_0x5ca092(0x923)]['_startLoading']=function(){const _0x311a0d=_0x5ca092;this['_image']=new Image(),this[_0x311a0d(0x7ee)][_0x311a0d(0x80d)]=this[_0x311a0d(0x44b)][_0x311a0d(0x2da)](this),this['_image'][_0x311a0d(0x2d2)]=this[_0x311a0d(0x88a)][_0x311a0d(0x2da)](this),this[_0x311a0d(0x887)](),this['_loadingState']=_0x311a0d(0x7d9),Utils['hasEncryptedImages']()?this['_startDecrypting']():(this[_0x311a0d(0x7ee)][_0x311a0d(0x49b)]=this[_0x311a0d(0x5ce)],![]&&this['_image'][_0x311a0d(0x7b7)]>0x0&&(this[_0x311a0d(0x7ee)][_0x311a0d(0x80d)]=null,this['_onLoad']()));},Scene_Skill[_0x5ca092(0x923)]['onActorChange']=function(){const _0x47ea64=_0x5ca092;Scene_MenuBase['prototype'][_0x47ea64(0x8fd)]['call'](this),this[_0x47ea64(0x898)](),this[_0x47ea64(0x316)][_0x47ea64(0x5a5)](),this[_0x47ea64(0x316)][_0x47ea64(0x1db)](),this[_0x47ea64(0x595)][_0x47ea64(0x3d0)]();},Scene_Skill[_0x5ca092(0x923)][_0x5ca092(0x4fc)]=function(){const _0x1a29e1=_0x5ca092;return this[_0x1a29e1(0x595)]&&this[_0x1a29e1(0x595)]['active'];},Game_Map['prototype'][_0x5ca092(0x638)]=function(_0x3bc8ee,_0x346d3f,_0x2004f1){const _0x2205cc=_0x5ca092,_0x41d391=this[_0x2205cc(0x392)](),_0x3660db=this[_0x2205cc(0x52a)](_0x3bc8ee,_0x346d3f);for(const _0x577469 of _0x3660db){const _0x591d43=_0x41d391[_0x577469];if(_0x591d43===undefined||_0x591d43===null){if($gameTemp[_0x2205cc(0x4be)]()&&!DataManager['isEventTest']()){let _0x949468=_0x2205cc(0x37c)+'\x0a';_0x949468+='Click\x20\x22Copy\x20Page\x22\x20from\x20another\x20tileset\x27s\x20pages'+'\x0a',_0x949468+=_0x2205cc(0x84c),this[_0x2205cc(0x22f)]()?(alert(_0x949468),SceneManager[_0x2205cc(0x7c7)]()):(console['log'](_0x949468),!$gameTemp['_showDevTools']&&($gameTemp[_0x2205cc(0x6aa)]=!![],SceneManager[_0x2205cc(0x689)]()));}}if((_0x591d43&0x10)!==0x0)continue;if((_0x591d43&_0x2004f1)===0x0)return!![];if((_0x591d43&_0x2004f1)===_0x2004f1)return![];}return![];},Game_Map['prototype']['showIncompleteTilesetError']=function(){const _0x55bffe=_0x5ca092;if(Imported[_0x55bffe(0x235)])return!![];if(Imported['VisuMZ_4_UniqueTileEffects'])return!![];return![];},Sprite_Animation['prototype'][_0x5ca092(0x81b)]=function(_0x295209){const _0x59f3f9=_0x5ca092;!this[_0x59f3f9(0x8a0)]&&(this[_0x59f3f9(0x8a0)]=_0x295209['gl']['getParameter'](_0x295209['gl'][_0x59f3f9(0x7a1)]));},VisuMZ[_0x5ca092(0x865)][_0x5ca092(0x201)]=Scene_Map[_0x5ca092(0x923)][_0x5ca092(0x8ca)],Scene_Map['prototype']['shouldAutosave']=function(){const _0x1d5331=_0x5ca092,_0x2042c6=SceneManager[_0x1d5331(0x371)][_0x1d5331(0x7a5)];if([_0x1d5331(0x267),_0x1d5331(0x3cd),'Scene_TitleTransition',_0x1d5331(0x496)][_0x1d5331(0x3f8)](_0x2042c6))return![];return VisuMZ[_0x1d5331(0x865)]['Scene_Map_shouldAutosave'][_0x1d5331(0x481)](this);},VisuMZ[_0x5ca092(0x865)]['Window_SkillList_includes']=Window_SkillList['prototype'][_0x5ca092(0x3f8)],Window_SkillList[_0x5ca092(0x923)][_0x5ca092(0x3f8)]=function(_0x5a07dc){const _0xfdd285=_0x5ca092;if(this[_0xfdd285(0x3cb)]<=0x0)return![];return VisuMZ[_0xfdd285(0x865)][_0xfdd285(0x64f)][_0xfdd285(0x481)](this,_0x5a07dc);};