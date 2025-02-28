//=============================================================================
// VisuStella MZ - Animated Message Text Effects
// VisuMZ_2_AniMsgTextEffects.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_AniMsgTextEffects = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AniMsgTextEffects = VisuMZ.AniMsgTextEffects || {};
VisuMZ.AniMsgTextEffects.version = 1.03;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.03] [AniMsgTextEffects]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Animated_Message_Text_Effects_VisuStella_MZ
 * @base VisuMZ_1_MessageCore
 * @orderAfter VisuMZ_1_MessageCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Ever wanted to animate the text that appears in your Message Window in order
 * to add just a bit more character to their lines? Perhaps a stagger effect or
 * a shivering effect? Maybe a swinging effect like a pendulum or a glowing
 * effect for a specific color? This plugin comes with a plethora of text
 * effects to pick and use from in addition to letting you create your very own
 * custom text effects through the Plugin Parameters and just by adjusting the
 * various effect properties.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Animate text shown in the Message Window with more than 40+ number of
 *   custom text effects with many having three different variations each.
 * * Add in your own custom text effects or modify existing text effects. There
 *   is an endless number of custom text effects you can add.
 * * Options command for players to turn on/off Message Text Effects in case
 *   the text effects may interfere with their ability to read.
 * * Angle-type text effects will sway back and forth by the angle or
 *   constantly spin in a certain direction.
 * * Color-type text effects will allow for hue shifts or color tone patterns
 *   to be applied to your message text.
 * * Opacity-type text effects can cause the opacity of a letter to fade in/out
 *   and/or use custom opacity patterns that can also be used to determine
 *   fade level.
 * * Positioning-type text effects can shake randomly in specified directions
 *   or move back and forth for specified directions in a wave.
 * * Scaling-type text effects can flip to its front and back sides or grow
 *   and shrink in size by a certain amount like a pulse.
 * * You can combine text effects with one another as long as they are of
 *   different types.
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
 * * VisuMZ_1_MessageCore
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
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin.
 * 
 * While the \Effect<name> part of the text code is hardcoded, the actual
 * settings for each of the text effect types can be modified through the
 * Plugin Parameters.
 * 
 * These Text Effects can ONLY be used for the Message Window and nothing else.
 * Everything else will have the text be displayed normally. This means you
 * CANNOT use Animated Message Text Effects for the Help Window, Choice Window,
 * Status Window, etc. Only the main Message Window can support them.
 * 
 * ---
 *
 * === General Text Effect-Related Text Codes ===
 * 
 * ---
 *
 * --------------------   -----------------------------------------------------
 * Text Code              Animated Text Effect (Message Window Only)
 * --------------------   -----------------------------------------------------
 * 
 * \Effect<name>          Changes the text effect to "name" where "name" is
 *                        based on the Plugin Parameter "Name" setting. The
 *                        text effect will then be applied to regular text
 *                        characters and icons. Other visual text code graphics
 *                        won't have custom text effects applied to them.
 * 
 * \Effect<Normal>        Returns the text effect type to "normal". No shaking,
 *                        angle changing, etc. effects will be seen. Just plain
 *                        old normal text.
 * 
 * <Clear Effect>         Same as \Effect<Normal> as it will return the text
 *                        effect type to "normal". There are no differences
 *                        between usage as it is up to personal preference on
 *                        which you want to use.
 * 
 * ---
 *
 * === Angle-Type Text Effect-Related Text Codes ===
 * 
 * ---
 * 
 * --------------------   -----------------------------------------------------
 * Text Code              Pendulum-Subtype Text Effect (Message Window Only)
 * --------------------   -----------------------------------------------------
 * 
 * \Effect<Swing>         Angle of letters swing uniformly back and forth.
 * \Effect<SlowSwing>     Slower version of "Swing" text effect.
 * \Effect<FastSwing>     Faster version of "Swing" text effect.
 * 
 * \Effect<Wag>           Angle of letters swing in a sequence back and forth.
 * \Effect<SlowWag>       Slower version of "Wag" text effect.
 * \Effect<FastWag>       Faster version of "Wag" text effect.
 * 
 * \Effect<Jelly>         Angle and position move back and forth in a sequence.
 * \Effect<SlowJelly>     Slower version of "Jelly" text effect.
 * \Effect<FastJelly>     Faster version of "Jelly" text effect.
 * 
 * ---
 * 
 * --------------------   -----------------------------------------------------
 * Text Code              Rotation-Subtype Text Effect (Message Window Only)
 * --------------------   -----------------------------------------------------
 * 
 * \Effect<SpinCW>        Letters rotate clockwise uniformly.
 * \Effect<SlowSpinCW>    Slower version of "SpinCW" text effect.
 * \Effect<FastSpinCW>    Faster version of "SpinCW" text effect.
 * 
 * \Effect<SpinCCW>       Letters rotate counter-clockwise uniformly.
 * \Effect<SlowSpinCCW>   Slower version of "SpinCCW" text effect.
 * \Effect<FastSpinCCW>   Faster version of "SpinCCW" text effect.
 * 
 * \Effect<RollCW>        Letters rotate clockwise in a sequence.
 * \Effect<SlowRollCW>    Slower version of "RollCW" text effect.
 * \Effect<FastRollCW>    Faster version of "RollCW" text effect.
 * 
 * \Effect<RollCCW>       Letters rotate counter-clockwise in a sequence.
 * \Effect<SlowRollCCW>   Slower version of "RollCCW" text effect.
 * \Effect<FastRollCCW>   Faster version of "RollCCW" text effect.
 * 
 * ---
 *
 * === Color-Type Text Effect-Related Text Codes ===
 * 
 * ---
 * 
 * --------------------   -----------------------------------------------------
 * Text Code              Hue-Subtype Text Effect (Message Window Only)
 * --------------------   -----------------------------------------------------
 * 
 * \Effect<Prism>         Letters will hue shift uniformly.
 * \Effect<SlowPrism>     Slower version of "Prism" text effect.
 * \Effect<FastPrism>     Faster version of "Prism" text effect.
 * 
 * \Effect<Rainbow>       Letters will hue shift in a sequence.
 * \Effect<SlowRainbow>   Slower version of "Rainbow" text effect.
 * \Effect<FastRainbow>   Faster version of "Rainbow" text effect.
 * 
 * \Effect<Gamer>         Letters will hue shift in a stagger.
 * \Effect<SlowGamer>     Slower version of "Gamer" text effect.
 * \Effect<FastGamer>     Faster version of "Gamer" text effect.
 * 
 * ---
 * 
 * --------------------   -----------------------------------------------------
 * Text Code              Tone-Subtype Text Effect (Message Window Only)
 * --------------------   -----------------------------------------------------
 * 
 * \Effect<Red>           A static red tone on the text.
 * \Effect<SoftRed>       Smoothly transition red tone on the text.
 * \Effect<HardRed>       Instant transition red tone on the text.
 * 
 * \Effect<Green>         A static green tone on the text.
 * \Effect<SoftGreen>     Smoothly transition green tone on the text.
 * \Effect<HardGreen>     Instant transition green tone on the text.
 * 
 * \Effect<Blue>          A static blue tone on the text.
 * \Effect<SoftBlue>      Smoothly transition blue tone on the text.
 * \Effect<HardBlue>      Instant transition blue tone on the text.
 * 
 * \Effect<Yellow>        A static yellow tone on the text.
 * \Effect<SoftYellow>    Smoothly transition yellow tone on the text.
 * \Effect<HardYellow>    Instant transition yellow tone on the text.
 * 
 * \Effect<Cyan>          A static cyan tone on the text.
 * \Effect<SoftCyan>      Smoothly transition cyan tone on the text.
 * \Effect<HardCyan>      Instant transition cyan tone on the text.
 * 
 * \Effect<Magenta>       A static magenta tone on the text.
 * \Effect<SoftMagenta>   Smoothly transition magenta tone on the text.
 * \Effect<HardMagenta>   Instant transition magenta tone on the text.
 * 
 * \Effect<RGB>           Smooth shifting RGB tones in a sequence.
 * \Effect<SlowRGB>       Slower version of "RGB" text effect.
 * \Effect<FastRGB>       Faster version of "RGB" text effect.
 * 
 * \Effect<Fes>           Instant shifting Red/Green tones in a sequence.
 * \Effect<SlowFes>       Slower version of "Fes" text effect.
 * \Effect<FastFes>       Faster version of "Fes" text effect.
 * 
 * \Effect<Gig>           Smooth shifting base tones in a sequence.
 * \Effect<SlowGig>       Slower version of "Gig" text effect.
 * \Effect<FastGig>       Faster version of "Gig" text effect.
 * 
 * ---
 *
 * === Opacity-Type Text Effect-Related Text Codes ===
 * 
 * ---
 * 
 * --------------------   -----------------------------------------------------
 * Text Code              Glow-Subtype Text Effect (Message Window Only)
 * --------------------   -----------------------------------------------------
 * 
 * \Effect<Glow>          Letters fade in and out uniformly.
 * \Effect<SlowGlow>      Slower version of "Glow" text effect.
 * \Effect<FastGlow>      Faster version of "Glow" text effect.
 * 
 * \Effect<Flow>          Letters fade in and out in a sequence.
 * \Effect<SlowFlow>      Slower version of "Flow" text effect.
 * \Effect<FastFlow>      Faster version of "Flow" text effect.
 * 
 * \Effect<Blink>         Letters blink in and out in a stagger.
 * \Effect<SlowBlink>     Slower version of "Blink" text effect.
 * \Effect<FastBlink>     Faster version of "Blink" text effect.
 * 
 * ---
 * 
 * --------------------   -----------------------------------------------------
 * Text Code              Pattern-Subtype Text Effect (Message Window Only)
 * --------------------   -----------------------------------------------------
 * 
 * \Effect<Campfire>      A specified blinking light pattern for letters.
 * \Effect<Candle>        A specified blinking light pattern for letters.
 * \Effect<Fade>          A specified blinking light pattern for letters.
 * \Effect<Flicker>       A specified blinking light pattern for letters.
 * \Effect<Fluorescent>   A specified blinking light pattern for letters.
 * \Effect<Halogen>       A specified blinking light pattern for letters.
 * \Effect<Strobe>        A specified blinking light pattern for letters.
 * \Effect<Torch>         A specified blinking light pattern for letters.
 * \Effect<Underwater>    A specified blinking light pattern for letters.
 * 
 * ---
 *
 * === Position-Type Text Effect-Related Text Codes ===
 * 
 * ---
 * 
 * --------------------   -----------------------------------------------------
 * Text Code              Frantic-Subtype Text Effect (Message Window Only)
 * --------------------   -----------------------------------------------------
 * 
 * \Effect<Shake>         Shakes frantically and randomly in any direction.
 * \Effect<SoftShake>     Less frantic version of "Shake" text effect.
 * \Effect<HardShake>     More frantic version of "Shake" text effect.
 * 
 * \Effect<Shiver>        Shivers frantically in the left/right direction.
 * \Effect<SoftShiver>    Less frantic version of "Shiver" text effect.
 * \Effect<HardShiver>    More frantic version of "Shiver" text effect.
 * 
 * \Effect<Vibe>          Vibrates frantically in the up/down direction.
 * \Effect<SoftVibe>      Less frantic version of "Vibe" text effect.
 * \Effect<HardVibe>      More frantic version of "Vibe" text effect.
 * 
 * ---
 * 
 * --------------------   -----------------------------------------------------
 * Text Code              Wave-Subtype Text Effect (Message Window Only)
 * --------------------   -----------------------------------------------------
 * 
 * \Effect<Stagger>       Moves with letters staggered up and down.
 * \Effect<SlowStagger>   Slower version of "Stagger" text effect.
 * \Effect<FastStagger>   Faster version of "Stagger" text effect.
 * 
 * \Effect<Saw>           Moves uniformly left and right.
 * \Effect<SlowSaw>       Slower version of "Saw" text effect.
 * \Effect<FastSaw>       Faster version of "Saw" text effect.
 * 
 * \Effect<Bounce>        Moves uniformly up and down.
 * \Effect<SlowBounce>    Slower version of "Bounce" text effect.
 * \Effect<FastBounce>    Faster version of "Bounce" text effect.
 * 
 * \Effect<Wave>          Waves by letter in all directions.
 * \Effect<SlowWave>      Slower version of "Wave" text effect.
 * \Effect<FastWave>      Faster version of "Wave" text effect.
 * 
 * \Effect<HorzWave>      Waves by letter in horizontal direction.
 * \Effect<SlowHorzWave>  Slower version of "HorzWave" text effect.
 * \Effect<FastHorzWave>  Faster version of "HorzWave" text effect.
 * 
 * \Effect<VertWave>      Waves by letter in vertical direction.
 * \Effect<SlowVertWave>  Slower version of "VertWave" text effect.
 * \Effect<FastVertWave>  Faster version of "VertWave" text effect.
 * 
 * ---
 *
 * === Scaling-Type Text Effect-Related Text Codes ===
 * 
 * ---
 * 
 * ----------------------   ---------------------------------------------------
 * Text Code                Flip-Subtype Text Effect (Message Window Only)
 * ----------------------   ---------------------------------------------------
 * 
 * \Effect<HorzCard>        Horizontally uniform flipping effect.
 * \Effect<SlowHorzCard>    Slower version of "HorzCard" text effect.
 * \Effect<FastHorzCard>    Faster version of "HorzCard" text effect.
 * 
 * \Effect<VertCard>        Vertically uniform flipping effect.
 * \Effect<SlowVertCard>    Slower version of "VertCard" text effect.
 * \Effect<FastVertCard>    Faster version of "VertCard" text effect.
 * 
 * \Effect<HorzRibbon>      Horizontally folding flipping effect.
 * \Effect<SlowHorzRibbon>  Slower version of "HorzRibbon" text effect.
 * \Effect<FastHorzRibbon>  Faster version of "HorzRibbon" text effect.
 * 
 * \Effect<VertRibbon>      Vertically folding flipping effect.
 * \Effect<SlowVertRibbon>  Slower version of "VertRibbon" text effect.
 * \Effect<FastVertRibbon>  Faster version of "VertRibbon" text effect.
 * 
 * ---
 * 
 * --------------------   -----------------------------------------------------
 * Text Code              Pulse-Subtype Text Effect (Message Window Only)
 * --------------------   -----------------------------------------------------
 * 
 * \Effect<Pulse>         Letters grow bigger and smaller uniformly.
 * \Effect<SmallPulse>    Smaller version of "Pulse" text effect.
 * \Effect<BigPulse>      Larger version of "Pulse" text effect.
 * 
 * \Effect<Jiggle>        Letters grow bigger and smaller in a sequence.
 * \Effect<SmallJiggle>   Smaller version of "Jiggle" text effect.
 * \Effect<BigJiggle>     Larger version of "Jiggle" text effect.
 * 
 * \Effect<Gooey>         Letters grow bigger and smaller in a stretched form.
 * \Effect<SmallGooey>    Smaller version of "Gooey" text effect.
 * \Effect<BigGooey>      Larger version of "Gooey" text effect.
 * 
 * ---
 * 
 * === Combining Text Effects ===
 * 
 * ---
 * 
 * \Effect<type, type>
 * \Effect<type, type, type>
 * \Effect<type, type, type, type>
 * \Effect<type, type, type, type, type>
 * 
 * You can combine text effects with one another provided that they are of
 * different types (NOT subtypes). What this means is you can pick an
 * angle-type text effect, combine it with a color-type text effect along with
 * something like a positioning-type text effect and produce results.
 * 
 * You cannot combine same types together such as a positioning-type with
 * another positioning type.
 * 
 * Examples:
 * 
 * \Effect<Swing, Rainbow>
 * \Effect<Wag, Flow, HorzWave>
 * \Effect<Jelly, Shiver, HorzCard>
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Angle Effects Settings
 * ============================================================================
 *
 * Setup the various settings for angle-type Text Effects here.
 *
 * ---
 *
 * General
 * 
 *   Name:
 *   - UNIQUE name of this message text effect type.
 *   - Used in place of 'name' in \Effect<name> for text codes.
 *
 * ---
 * 
 * Angles > Pendulum Effect
 * 
 *   Arc Size:
 *   - What is the pendulum arc size?
 * 
 *   Speed Modifier:
 *   - Arc speed rate for pendulum effect.
 * 
 *   Offset Modifier:
 *   - Arc offset modifier for pendulum effect.
 * 
 * ---
 * 
 * Angles > Rotation Effect
 * 
 *   Speed Modifier:
 *   - Speed to determine many angles will rotate per frame.
 * 
 *   Offset Modifier:
 *   - Initial angle offset modifier for rotation effect.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Effects Settings
 * ============================================================================
 *
 * Setup the various settings for color-type Text Effects here.
 *
 * ---
 *
 * General
 * 
 *   Name:
 *   - UNIQUE name of this message text effect type.
 *   - Used in place of 'name' in \Effect<name> for text codes.
 *
 * ---
 *
 * Color
 * 
 *   Forced Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *   - Leave empty to not use.
 * 
 * ---
 * 
 * Color > Hue Change Effect
 * 
 *   Hue Shift:
 *   - Shift hue by how much each frame?
 * 
 *   Offset Modifier:
 *   - Initial hue offset modifier for hue shift.
 * 
 * ---
 * 
 * Color > Tone Effect
 * 
 *   Color Tone(s):
 *   - What tone(s) do you want for the letters?
 *   - Format: [Red, Green, Blue, Gray]
 * 
 *   Frame Delay:
 *   - What is the frame delay between tone changes?
 * 
 *   Offset Modifier:
 *   - Initial tone offset modifier for tone change.
 * 
 *   Smooth Transition?:
 *   - Make a smooth transition for tone changes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Opacity Effects Settings
 * ============================================================================
 *
 * Setup the various settings for opacity-type Text Effects here.
 *
 * ---
 *
 * General
 * 
 *   Name:
 *   - UNIQUE name of this message text effect type.
 *   - Used in place of 'name' in \Effect<name> for text codes.
 *
 * ---
 * 
 * Opacity
 * 
 *   Base Opacity:
 *   - What is the starting opacity value?
 * 
 * ---
 * 
 * Opacity > Glow Effect
 * 
 *   Glow Rate:
 *   - What is the glow change for this effect?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Glow Speed:
 *   - What is the speed at which glow oscillates at?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Offset Modifier:
 *   - Initial opacity offset modifier for glow effect.
 * 
 * ---
 * 
 * Opacity > Intensity Pattern
 * 
 *   Custom Pattern:
 *   - Create a custom pattern with letters from a to z.
 *   - Where 'a' is transparent and 'z' is opaque.
 * 
 *   Frame Delay:
 *   - What is the frame delay between pattern updates?
 * 
 *   Offset Modifier:
 *   - Initial opacity offset modifier for pattern effect.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Positioning Effects Settings
 * ============================================================================
 *
 * Setup the various settings for positioning-type Text Effects here.
 *
 * ---
 *
 * General
 * 
 *   Name:
 *   - UNIQUE name of this message text effect type.
 *   - Used in place of 'name' in \Effect<name> for text codes.
 *
 * ---
 *
 * Positioning > Wave (Horz) Effect
 * 
 *   Distance:
 *   - Horizontal distance for wave effect.
 * 
 *   Speed Modifier:
 *   - Horizontal speed rate for wave effect.
 * 
 *   Offset Modifier:
 *   - Horizontal offset modifier for wave effect.
 * 
 * ---
 * 
 * Positioning > Wave (Vert) Effect
 * 
 *   Distance:
 *   - Vertical distance for wave effect.
 * 
 *   Speed Modifier:
 *   - Vertical speed rate for wave effect.
 * 
 *   Offset Modifier:
 *   - Vertical offset modifier for wave effect.
 * 
 * ---
 *
 * Positioning > Frantic Effect
 * 
 *   Horz Strength:
 *   - Horizontal frantic randomization strength.
 *   - Determines random horizontal position for frantic effect.
 * 
 *   Vert Strength:
 *   - Vertical frantic randomization strength.
 *   - Determines random vertical position for frantic effect.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Scaling Effects Settings
 * ============================================================================
 *
 * Setup the various settings for scaling-type Text Effects here.
 *
 * ---
 *
 * General
 * 
 *   Name:
 *   - UNIQUE name of this message text effect type.
 *   - Used in place of 'name' in \Effect<name> for text codes.
 *
 * ---
 * 
 * Scaling > Flip (Horz) Effect
 * 
 *   Speed Modifier:
 *   - Horizontal speed rate for flip effect.
 * 
 *   Offset Modifier:
 *   - Horizontal offset modifier for flip effect.
 * 
 * ---
 * 
 * Scaling > Flip (Vert) Effect
 * 
 *   Speed Modifier:
 *   - Vertical speed rate for flip effect.
 * 
 *   Offset Modifier:
 *   - Vertical offset modifier for flip effect.
 * 
 * ---
 * 
 * Scaling > Pulse (Horz) Effect
 * 
 *   Growth:
 *   - Horizontal growth pulse effect.
 * 
 *   Speed Modifier:
 *   - Horizontal speed rate for pulse effect.
 * 
 *   Offset Modifier:
 *   - Horizontal offset modifier for pulse effect.
 * 
 * ---
 * 
 * Scaling > Pulse (Vert) Effect
 * 
 *   Growth:
 *   - Vertical growth pulse effect.
 * 
 *   Speed Modifier:
 *   - Vertical speed rate for pulse effect.
 * 
 *   Offset Modifier:
 *   - Vertical offset modifier for pulse effect.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Options Settings
 * ============================================================================
 *
 * Options settings for Animated Message Text Effects.
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the 'Animated Text Effects' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
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
 * * Irina
 * * Arisu
 * * Olivia
 * * Yanfly
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.03: March 14, 2024
 * * Compatibility Update!
 * ** Updated compatibility with VisuMZ_2_ExtMessageFunc when the button
 *    console is located at the top of the message window. Update by Irina.
 * 
 * Version 1.02: March 16, 2023
 * * Bug Fixes!
 * ** Animated text that has been sized up with \{ text codes will no longer be
 *    cut off visually, especially with larger outline effects and certain font
 *    types. Fix made by Irina.
 * 
 * Version 1.01: February 16, 2023
 * * Bug Fixes!
 * ** <Clear Effect> text code was not working properly before. Now, it should
 *    work fine and clear effects. Fix made by Irina.
 * ** Color Tone effects applied to large quantities of text should no longer
 *    cause interrupted breaks. Fix made by Irina.
 * 
 * Version 1.00 Official Release Date: February 27, 2023
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
 * @param AniMsgTextEffects
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param TextEffects
 * @text Text Effect Settings
 *
 * @param AngleEffects:arraystruct
 * @text Angle Effects
 * @parent TextEffects
 * @type struct<AngleEffect>[]
 * @desc Setup the various settings for angle-type Text Effects here.
 * @default ["{\"Name:str\":\"Swing\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.25\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"SlowSwing\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.10\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"FastSwing\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.40\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"Wag\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.25\",\"PendulumOffset:num\":\"8\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"SlowWag\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.10\",\"PendulumOffset:num\":\"8\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"FastWag\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.40\",\"PendulumOffset:num\":\"8\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"Jelly\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.25\",\"PendulumOffset:num\":\"15\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"SlowJelly\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.10\",\"PendulumOffset:num\":\"15\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"FastJelly\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.40\",\"PendulumOffset:num\":\"12\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"SpinCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"-2.4\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"SlowSpinCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"-1.8\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"FastSpinCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"-3.6\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"SpinCCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"+2.4\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"SlowSpinCCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"+1.8\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"FastSpinCCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"+3.6\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"RollCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"-2.4\",\"RotationOffset:num\":\"-12\"}","{\"Name:str\":\"SlowRollCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"-1.8\",\"RotationOffset:num\":\"-9\"}","{\"Name:str\":\"FastRollCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"-3.6\",\"RotationOffset:num\":\"-15\"}","{\"Name:str\":\"RollCCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"+2.4\",\"RotationOffset:num\":\"12\"}","{\"Name:str\":\"SlowRollCCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"+1.8\",\"RotationOffset:num\":\"9\"}","{\"Name:str\":\"FastRollCCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"+3.6\",\"RotationOffset:num\":\"15\"}"]
 *
 * @param ColorEffects:arraystruct
 * @text Color Effects
 * @parent TextEffects
 * @type struct<ColorEffect>[]
 * @desc Setup the various settings for color-type Text Effects here.
 * @default ["{\"Name:str\":\"Prism\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-6\",\"InitialHueOffset:num\":\"0\"}","{\"Name:str\":\"SlowPrism\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-3\",\"InitialHueOffset:num\":\"0\"}","{\"Name:str\":\"FastPrism\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-9\",\"InitialHueOffset:num\":\"0\"}","{\"Name:str\":\"Rainbow\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-6\",\"InitialHueOffset:num\":\"36\"}","{\"Name:str\":\"SlowRainbow\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-3\",\"InitialHueOffset:num\":\"36\"}","{\"Name:str\":\"FastRainbow\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-9\",\"InitialHueOffset:num\":\"36\"}","{\"Name:str\":\"Gamer\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-6\",\"InitialHueOffset:num\":\"-216\"}","{\"Name:str\":\"SlowGamer\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-3\",\"InitialHueOffset:num\":\"-216\"}","{\"Name:str\":\"FastGamer\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-9\",\"InitialHueOffset:num\":\"-216\"}","{\"Name:str\":\"Red\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"SoftRed\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"HardRed\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"Green\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[0, 255, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"SoftGreen\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[0, 255, 0, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"HardGreen\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[0, 255, 0, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"Blue\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[0, 0, 255, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"SoftBlue\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[0, 0, 255, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"HardBlue\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[0, 0, 255, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"Yellow\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 255, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"SoftYellow\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 255, 0, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"HardYellow\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 255, 0, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"Cyan\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[0, 255, 255, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"SoftCyan\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[0, 255, 255, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"HardCyan\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[0, 255, 255, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"Magenta\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 255, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"SoftMagenta\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 255, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"HardMagenta\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 255, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"RGB\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\",\\\"[255, 255, 0, 0]\\\",\\\"[0, 255, 0, 0]\\\",\\\"[0, 255, 255, 0]\\\",\\\"[0, 0, 255, 0]\\\",\\\"[255, 0, 255, 0]\\\"]\",\"toneDelay:num\":\"20\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"SlowRGB\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\",\\\"[255, 255, 0, 0]\\\",\\\"[0, 255, 0, 0]\\\",\\\"[0, 255, 255, 0]\\\",\\\"[0, 0, 255, 0]\\\",\\\"[255, 0, 255, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"FastRGB\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\",\\\"[255, 255, 0, 0]\\\",\\\"[0, 255, 0, 0]\\\",\\\"[0, 255, 255, 0]\\\",\\\"[0, 0, 255, 0]\\\",\\\"[255, 0, 255, 0]\\\"]\",\"toneDelay:num\":\"10\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"Fes\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\",\\\"[0, 255, 0, 0]\\\"]\",\"toneDelay:num\":\"20\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"SlowFes\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\",\\\"[0, 255, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"FastFes\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\",\\\"[0, 255, 0, 0]\\\"]\",\"toneDelay:num\":\"10\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"Gig\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\",\\\"[0, 255, 0, 0]\\\",\\\"[0, 0, 255, 0]\\\"]\",\"toneDelay:num\":\"20\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"SlowGig\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\",\\\"[0, 255, 0, 0]\\\",\\\"[0, 0, 255, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"FastGig\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\",\\\"[0, 255, 0, 0]\\\",\\\"[0, 0, 255, 0]\\\"]\",\"toneDelay:num\":\"10\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"true\"}"]
 *
 * @param OpacityEffects:arraystruct
 * @text Opacity Effects
 * @parent TextEffects
 * @type struct<OpacityEffect>[]
 * @desc Setup the various settings for opacity-type Text Effects here.
 * @default ["{\"Name:str\":\"Glow\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.25\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"SlowGlow\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.10\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"FastGlow\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.40\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Flow\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.25\",\"glowOffset:num\":\"2\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"SlowFlow\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.10\",\"glowOffset:num\":\"2\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"FastFlow\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.40\",\"glowOffset:num\":\"2\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Blink\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.25\",\"glowOffset:num\":\"15\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"SlowBlink\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.10\",\"glowOffset:num\":\"30\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"FastBlink\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.40\",\"glowOffset:num\":\"8\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Campfire\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"mmmaaammmaaammmabcdefaaaammmmabcdefmmmaaaa\",\"patternDelay:num\":\"2\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Candle\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"mmmmmaaaaammmmmaaaaaabcdefgabcdefg\",\"patternDelay:num\":\"2\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Fade\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"abcdefghijklmnopqrrqponmlkjihgfedcba\",\"patternDelay:num\":\"4\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Flicker\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"nmonqnmomnmomomno\",\"patternDelay:num\":\"4\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Fluorescent\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"mmamammmmammamamaaamammma\",\"patternDelay:num\":\"4\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Halogen\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"mmnmmommommnonmmonqnmmo\",\"patternDelay:num\":\"4\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Strobe\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"mamamamamama\",\"patternDelay:num\":\"4\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Torch\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"mmmaaaabcdefgmmmmaaaammmaamm\",\"patternDelay:num\":\"2\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Underwater\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"mmnnmmnnnmmnn\",\"patternDelay:num\":\"4\",\"patternOffset:num\":\"0\"}"]
 *
 * @param PositionEffects:arraystruct
 * @text Positioning Effects
 * @parent TextEffects
 * @type struct<PositionEffect>[]
 * @desc Setup the various settings for color-type Text Effects here.
 * @default ["{\"Name:str\":\"Shake\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"2\",\"ShakeStrengthVert:num\":\"2\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"SoftShake\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"1\",\"ShakeStrengthVert:num\":\"1\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"HardShake\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"3\",\"ShakeStrengthVert:num\":\"3\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"Shiver\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"2\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"SoftShiver\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"1\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"HardShiver\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"3\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"Vibe\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"2\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"SoftVibe\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"1\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"HardVibe\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"3\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"Stagger\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"4\",\"WaveSpeedY:num\":\"0.25\",\"WaveOffsetY:num\":\"15\"}","{\"Name:str\":\"SlowStagger\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"4\",\"WaveSpeedY:num\":\"0.10\",\"WaveOffsetY:num\":\"30\"}","{\"Name:str\":\"FastStagger\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"4\",\"WaveSpeedY:num\":\"0.50\",\"WaveOffsetY:num\":\"30\"}","{\"Name:str\":\"Saw\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.25\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"SlowSaw\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.10\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"FastSaw\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.40\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"Bounce\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.25\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"SlowBounce\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.10\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"FastBounce\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.40\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"Wave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.25\",\"WaveOffsetX:num\":\"1\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.25\",\"WaveOffsetY:num\":\"2\"}","{\"Name:str\":\"SlowWave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.10\",\"WaveOffsetX:num\":\"1\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.10\",\"WaveOffsetY:num\":\"2\"}","{\"Name:str\":\"FastWave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.40\",\"WaveOffsetX:num\":\"1\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.40\",\"WaveOffsetY:num\":\"2\"}","{\"Name:str\":\"HorzWave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.25\",\"WaveOffsetX:num\":\"1\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"SlowHorzWave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.10\",\"WaveOffsetX:num\":\"1\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"FastHorzWave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.40\",\"WaveOffsetX:num\":\"1\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"VertWave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.25\",\"WaveOffsetY:num\":\"2\"}","{\"Name:str\":\"SlowVertWave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.10\",\"WaveOffsetY:num\":\"2\"}","{\"Name:str\":\"FastVertWave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.40\",\"WaveOffsetY:num\":\"2\"}"]
 *
 * @param ScaleEffects:arraystruct
 * @text Scaling Effects
 * @parent TextEffects
 * @type struct<ScaleEffects>[]
 * @desc Setup the various settings for color-type Text Effects here.
 * @default ["{\"Name:str\":\"HorzCard\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0.10\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"SlowHorzCard\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0.08\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"FastHorzCard\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0.15\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"VertCard\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0.10\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"SlowVertCard\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0.08\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"FastVertCard\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0.15\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"HorzRibbon\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0.10\",\"FlipOffsetX:num\":\"2\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"SlowHorzRibbon\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0.08\",\"FlipOffsetX:num\":\"2\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"FastHorzRibbon\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0.15\",\"FlipOffsetX:num\":\"2\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"VertRibbon\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0.10\",\"FlipOffsetY:num\":\"2\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"SlowVertRibbon\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0.08\",\"FlipOffsetY:num\":\"2\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"FastVertRibbon\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0.15\",\"FlipOffsetY:num\":\"2\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"Pulse\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.30\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0.30\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"SmallPulse\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.10\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0.10\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"BigPulse\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.40\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0.40\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"Jiggle\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.30\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"2\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0.30\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"2\"}","{\"Name:str\":\"SmallJiggle\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.10\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"2\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0.10\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"2\"}","{\"Name:str\":\"BigJiggle\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.40\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"2\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0.40\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"2\"}","{\"Name:str\":\"Gooey\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.30\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"33\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"-0.30\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"33\"}","{\"Name:str\":\"SmallGooey\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.10\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"33\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"-0.10\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"33\"}","{\"Name:str\":\"BigGooey\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.40\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"33\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"-0.40\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"33\"}"]
 *
 * @param Options:struct
 * @text Options Settings
 * @type struct<Options>
 * @desc Options settings for Animated Message Text Effects.
 * @default {"Options":"","AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Effects"}
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
 * Angle Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AngleEffect:
 *
 * @param Name:str
 * @text Name
 * @desc UNIQUE name of this message text effect type.
 * Used in place of 'name' in \Effect<name> for text codes.
 * @default Untitled
 * 
 * @param Angles
 * 
 * @param Pendulum
 * @text Pendulum Effect
 * @parent Angles
 *
 * @param PendulumArc:num
 * @text Arc Size
 * @parent Pendulum
 * @type number
 * @desc What is the pendulum arc size?
 * @default 0
 *
 * @param PendulumSpeed:num
 * @text Speed Modifier
 * @parent Pendulum
 * @desc Arc speed rate for pendulum effect.
 * @default 0
 *
 * @param PendulumOffset:num
 * @text Offset Modifier
 * @parent Pendulum
 * @desc Arc offset modifier for pendulum effect.
 * @default 0
 * 
 * @param Rotation
 * @text Rotation Effect
 * @parent Angles
 *
 * @param RotationSpeed:num
 * @text Speed Modifier
 * @parent Rotation
 * @desc Speed to determine many angles will rotate per frame.
 * @default 0
 *
 * @param RotationOffset:num
 * @text Offset Modifier
 * @parent Rotation
 * @desc Initial angle offset modifier for rotation effect.
 * @default 0
 * 
 */
/* ----------------------------------------------------------------------------
 * Color Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ColorEffect:
 *
 * @param Name:str
 * @text Name
 * @desc UNIQUE name of this message text effect type.
 * Used in place of 'name' in \Effect<name> for text codes.
 * @default Untitled
 * 
 * @param Color
 *
 * @param ForcedColor:str
 * @text Forced Color
 * @parent Color
 * @desc Use #rrggbb for custom colors or regular numbers for text
 * colors from the Window Skin. Leave empty to not use.
 * @default 
 * 
 * @param Hue
 * @text Hue Change Effect
 * @parent Color
 *
 * @param HueShift:num
 * @text Hue Shift
 * @parent Hue
 * @desc Shift hue by how much each frame?
 * @default 0
 *
 * @param InitialHueOffset:num
 * @text Offset Modifier
 * @parent Hue
 * @desc Initial hue offset modifier for hue shift.
 * @default 0
 * 
 * @param Tone
 * @text Tone Effect
 * @parent Color
 *
 * @param colorTones:arrayeval
 * @text Color Tone(s)
 * @parent Tone
 * @type string[]
 * @desc What tone(s) do you want for the letters?
 * Format: [Red, Green, Blue, Gray]
 * @default []
 *
 * @param toneDelay:num
 * @text Frame Delay
 * @parent Tone
 * @type number
 * @desc What is the frame delay between tone changes?
 * @default 0
 *
 * @param InitialToneOffset:num
 * @text Offset Modifier
 * @parent Tone
 * @desc Initial tone offset modifier for tone change.
 * @default 0
 *
 * @param SmoothToneChange:eval
 * @text Smooth Transition?
 * @parent Tone
 * @type boolean
 * @on Smooth
 * @off Instant
 * @desc Make a smooth transition for tone changes?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Opacity Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OpacityEffect:
 *
 * @param Name:str
 * @text Name
 * @desc UNIQUE name of this message text effect type.
 * Used in place of 'name' in \Effect<name> for text codes.
 * @default Untitled
 * 
 * @param Opacity
 *
 * @param InitialOpacity:num
 * @text Base Opacity
 * @parent Opacity
 * @desc What is the starting opacity value?
 * @default 255
 * 
 * @param Glow
 * @text Glow Effect
 * @parent Opacity
 *
 * @param glowRate:num
 * @text Glow Rate
 * @parent Glow
 * @desc What is the glow change for this effect?
 * Use a decimal number between 0 and 1.
 * @default 0
 *
 * @param glowSpeed:num
 * @text Glow Speed
 * @parent Glow
 * @desc What is the speed at which glow oscillates at?
 * Use a decimal number between 0 and 1.
 * @default 0
 *
 * @param glowOffset:num
 * @text Offset Modifier
 * @parent Glow
 * @desc Initial opacity offset modifier for glow effect.
 * @default 0
 * 
 * @param Pattern
 * @text Intensity Pattern
 * @parent Opacity
 *
 * @param pattern:str
 * @text Custom Pattern
 * @parent Pattern
 * @desc Create a custom pattern with letters from a to z.
 * Where 'a' is transparent and 'z' is opaque.
 * @default 
 *
 * @param patternDelay:num
 * @text Frame Delay
 * @parent Pattern
 * @type number
 * @desc What is the frame delay between pattern updates?
 * @default 0
 *
 * @param patternOffset:num
 * @text Offset Modifier
 * @parent Pattern
 * @desc Initial opacity offset modifier for pattern effect.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Position Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PositionEffect:
 *
 * @param Name:str
 * @text Name
 * @desc UNIQUE name of this message text effect type.
 * Used in place of 'name' in \Effect<name> for text codes.
 * @default Untitled
 * 
 * @param Positioning
 * 
 * @param Shake
 * @text Frantic Effect
 * @parent Positioning
 *
 * @param ShakeStrengthHorz:num
 * @text Horz Strength
 * @parent Shake
 * @type number
 * @desc Horizontal frantic randomization strength.
 * Determines random horizontal position for frantic effect.
 * @default 0
 *
 * @param ShakeStrengthVert:num
 * @text Vert Strength
 * @parent Shake
 * @type number
 * @desc 
 * @default 0
 * 
 * @param WaveX
 * @text Wave (Horz) Effect
 * @parent Positioning
 *
 * @param WaveDistanceX:num
 * @text Distance
 * @parent WaveX
 * @type number
 * @desc Horizontal distance for wave effect.
 * @default 0
 *
 * @param WaveSpeedX:num
 * @text Speed Modifier
 * @parent WaveX
 * @desc Horizontal speed rate for wave effect.
 * @default 0
 *
 * @param WaveOffsetX:num
 * @text Offset Modifier
 * @parent WaveX
 * @desc Horizontal offset modifier for wave effect.
 * @default 0
 * 
 * @param WaveY
 * @text Wave (Vert) Effect
 * @parent Positioning
 *
 * @param WaveDistanceY:num
 * @text Distance
 * @parent WaveY
 * @type number
 * @desc Vertical distance for wave effect.
 * @default 0
 *
 * @param WaveSpeedY:num
 * @text Speed Modifier
 * @parent WaveY
 * @desc Vertical speed rate for wave effect.
 * @default 0
 *
 * @param WaveOffsetY:num
 * @text Offset Modifier
 * @parent WaveY
 * @desc Vertical offset modifier for wave effect.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Scaling Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScaleEffects:
 *
 * @param Name:str
 * @text Name
 * @desc UNIQUE name of this message text effect type.
 * Used in place of 'name' in \Effect<name> for text codes.
 * @default Untitled
 * 
 * @param Scaling
 * 
 * @param FlipX
 * @text Flip (Horz) Effect
 * @parent Scaling
 *
 * @param FlipSpeedX:num
 * @text Speed Modifier
 * @parent FlipX
 * @desc Horizontal speed rate for flip effect.
 * @default 0
 *
 * @param FlipOffsetX:num
 * @text Offset Modifier
 * @parent FlipX
 * @desc Horizontal offset modifier for flip effect.
 * @default 0
 * 
 * @param FlipY
 * @text Flip (Vert) Effect
 * @parent Scaling
 *
 * @param FlipSpeedY:num
 * @text Speed Modifier
 * @parent FlipY
 * @desc Vertical speed rate for flip effect.
 * @default 0
 *
 * @param FlipOffsetY:num
 * @text Offset Modifier
 * @parent FlipY
 * @desc Vertical offset modifier for flip effect.
 * @default 0
 * 
 * @param PulseX
 * @text Pulse (Horz) Effect
 * @parent Scaling
 *
 * @param PulseGrowthX:num
 * @text Growth
 * @parent PulseX
 * @desc Horizontal growth pulse effect.
 * @default 0
 *
 * @param PulseSpeedX:num
 * @text Speed Modifier
 * @parent PulseX
 * @desc Horizontal speed rate for pulse effect.
 * @default 0
 *
 * @param PulseOffsetX:num
 * @text Offset Modifier
 * @parent PulseX
 * @desc Horizontal offset modifier for pulse effect.
 * @default 0
 * 
 * @param PulseY
 * @text Pulse (Vert) Effect
 * @parent Scaling
 *
 * @param PulseGrowthY:num
 * @text Growth
 * @parent PulseY
 * @desc Vertical growth pulse effect.
 * @default 0
 *
 * @param PulseSpeedY:num
 * @text Speed Modifier
 * @parent PulseY
 * @desc Vertical speed rate for pulse effect.
 * @default 0
 *
 * @param PulseOffsetY:num
 * @text Offset Modifier
 * @parent PulseY
 * @desc Vertical offset modifier for pulse effect.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Options:
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Effects' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Text Effects
 *
 */
//=============================================================================

const _0x26443f=_0x251d;(function(_0x42d88e,_0x2527ba){const _0x52d945=_0x251d,_0x4098de=_0x42d88e();while(!![]){try{const _0x1c9db9=parseInt(_0x52d945(0x240))/0x1*(parseInt(_0x52d945(0x274))/0x2)+-parseInt(_0x52d945(0x1b6))/0x3*(parseInt(_0x52d945(0x22a))/0x4)+-parseInt(_0x52d945(0x201))/0x5*(-parseInt(_0x52d945(0x180))/0x6)+parseInt(_0x52d945(0x25a))/0x7+-parseInt(_0x52d945(0x189))/0x8+-parseInt(_0x52d945(0x1f9))/0x9*(-parseInt(_0x52d945(0x241))/0xa)+parseInt(_0x52d945(0x1de))/0xb*(-parseInt(_0x52d945(0x1be))/0xc);if(_0x1c9db9===_0x2527ba)break;else _0x4098de['push'](_0x4098de['shift']());}catch(_0x22956f){_0x4098de['push'](_0x4098de['shift']());}}}(_0x18b4,0xd4efc));var label='AniMsgTextEffects',tier=tier||0x0,dependencies=[_0x26443f(0x257)],pluginData=$plugins[_0x26443f(0x273)](function(_0x4c8e48){const _0x5c523e=_0x26443f;return _0x4c8e48[_0x5c523e(0x1a0)]&&_0x4c8e48[_0x5c523e(0x19e)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x26443f(0x1c7)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x26443f(0x1c5)]=function(_0xc2a688,_0x55af6f){const _0x4a728f=_0x26443f;for(const _0x15fd97 in _0x55af6f){if(_0x15fd97[_0x4a728f(0x1e5)](/(.*):(.*)/i)){const _0x358137=String(RegExp['$1']),_0x14f444=String(RegExp['$2'])[_0x4a728f(0x27c)]()[_0x4a728f(0x234)]();let _0x385c04,_0x16d664,_0x3de318;switch(_0x14f444){case _0x4a728f(0x19f):_0x385c04=_0x55af6f[_0x15fd97]!==''?Number(_0x55af6f[_0x15fd97]):0x0;break;case _0x4a728f(0x21c):_0x16d664=_0x55af6f[_0x15fd97]!==''?JSON[_0x4a728f(0x215)](_0x55af6f[_0x15fd97]):[],_0x385c04=_0x16d664[_0x4a728f(0x277)](_0xee48f=>Number(_0xee48f));break;case _0x4a728f(0x172):_0x385c04=_0x55af6f[_0x15fd97]!==''?eval(_0x55af6f[_0x15fd97]):null;break;case _0x4a728f(0x1c9):_0x16d664=_0x55af6f[_0x15fd97]!==''?JSON[_0x4a728f(0x215)](_0x55af6f[_0x15fd97]):[],_0x385c04=_0x16d664[_0x4a728f(0x277)](_0x3c42bf=>eval(_0x3c42bf));break;case'JSON':_0x385c04=_0x55af6f[_0x15fd97]!==''?JSON[_0x4a728f(0x215)](_0x55af6f[_0x15fd97]):'';break;case'ARRAYJSON':_0x16d664=_0x55af6f[_0x15fd97]!==''?JSON[_0x4a728f(0x215)](_0x55af6f[_0x15fd97]):[],_0x385c04=_0x16d664[_0x4a728f(0x277)](_0x466528=>JSON[_0x4a728f(0x215)](_0x466528));break;case _0x4a728f(0x1a4):_0x385c04=_0x55af6f[_0x15fd97]!==''?new Function(JSON['parse'](_0x55af6f[_0x15fd97])):new Function(_0x4a728f(0x19a));break;case _0x4a728f(0x246):_0x16d664=_0x55af6f[_0x15fd97]!==''?JSON[_0x4a728f(0x215)](_0x55af6f[_0x15fd97]):[],_0x385c04=_0x16d664['map'](_0x5d4376=>new Function(JSON[_0x4a728f(0x215)](_0x5d4376)));break;case _0x4a728f(0x1ca):_0x385c04=_0x55af6f[_0x15fd97]!==''?String(_0x55af6f[_0x15fd97]):'';break;case _0x4a728f(0x1b4):_0x16d664=_0x55af6f[_0x15fd97]!==''?JSON[_0x4a728f(0x215)](_0x55af6f[_0x15fd97]):[],_0x385c04=_0x16d664[_0x4a728f(0x277)](_0xe1389d=>String(_0xe1389d));break;case _0x4a728f(0x22c):_0x3de318=_0x55af6f[_0x15fd97]!==''?JSON['parse'](_0x55af6f[_0x15fd97]):{},_0x385c04=VisuMZ[_0x4a728f(0x1c5)]({},_0x3de318);break;case _0x4a728f(0x24a):_0x16d664=_0x55af6f[_0x15fd97]!==''?JSON['parse'](_0x55af6f[_0x15fd97]):[],_0x385c04=_0x16d664[_0x4a728f(0x277)](_0x127238=>VisuMZ[_0x4a728f(0x1c5)]({},JSON['parse'](_0x127238)));break;default:continue;}_0xc2a688[_0x358137]=_0x385c04;}}return _0xc2a688;},(_0x59ea6b=>{const _0x4892bd=_0x26443f,_0x2cfe04=_0x59ea6b[_0x4892bd(0x17f)];for(const _0x3a7aea of dependencies){if(!Imported[_0x3a7aea]){if('ADSVc'!==_0x4892bd(0x1e0)){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x2cfe04,_0x3a7aea)),SceneManager[_0x4892bd(0x199)]();break;}else{const _0x54621f=this['effectData'](),_0x1029cf=_0x54621f['WaveDistanceX']??0x0;if(_0x1029cf===0x0)return;const _0x56d078=_0x54621f[_0x4892bd(0x263)]??0x0;if(_0x56d078===0x0)return;const _0x19967b=_0x54621f[_0x4892bd(0x244)]??0x0,_0x4e01bc=_0x3fa23a[_0x4892bd(0x1b5)]+_0x19967b*this[_0x4892bd(0x1e3)];this['x']+=_0x5c2aad['round'](_0x275ef3['cos'](_0x4e01bc*_0x56d078)*_0x1029cf);}}}const _0xe433d6=_0x59ea6b[_0x4892bd(0x19e)];if(_0xe433d6[_0x4892bd(0x1e5)](/\[Version[ ](.*?)\]/i)){const _0x1ebdfa=Number(RegExp['$1']);_0x1ebdfa!==VisuMZ[label][_0x4892bd(0x196)]&&(_0x4892bd(0x1e4)===_0x4892bd(0x1e4)?(alert(_0x4892bd(0x26e)[_0x4892bd(0x223)](_0x2cfe04,_0x1ebdfa)),SceneManager[_0x4892bd(0x199)]()):this[_0x4892bd(0x1c8)][_0x3a979d]=(this[_0x4892bd(0x1c8)][_0x5f1dd6]*(_0x56be47-0x1)+_0x3f6ebc[_0x170baa])/_0x2ae3a7);}if(_0xe433d6[_0x4892bd(0x1e5)](/\[Tier[ ](\d+)\]/i)){const _0x3951cd=Number(RegExp['$1']);_0x3951cd<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x4892bd(0x223)](_0x2cfe04,_0x3951cd,tier)),SceneManager['exit']()):_0x4892bd(0x24d)===_0x4892bd(0x207)?(this[_0x4892bd(0x276)]=_0x590f50,this[_0x4892bd(0x1dd)]=_0x102dc9[_0x4892bd(0x1dd)],this[_0x4892bd(0x235)]=_0x4a84f1[_0x4892bd(0x215)](_0x15c6ca['stringify'](_0x4210ae)),this['_offset']=_0x36d0f4,_0x4bb6a1['prototype'][_0x4892bd(0x25b)][_0x4892bd(0x228)](this),this[_0x4892bd(0x1ac)](),this[_0x4892bd(0x222)](),this[_0x4892bd(0x1a8)](),this[_0x4892bd(0x27d)]()):tier=Math[_0x4892bd(0x20a)](_0x3951cd,tier);}VisuMZ[_0x4892bd(0x1c5)](VisuMZ[label]['Settings'],_0x59ea6b[_0x4892bd(0x1df)]);})(pluginData),VisuMZ[_0x26443f(0x1fa)][_0x26443f(0x1c6)]=Scene_Boot[_0x26443f(0x183)][_0x26443f(0x19c)],Scene_Boot['prototype']['onDatabaseLoaded']=function(){const _0x183d14=_0x26443f;VisuMZ['AniMsgTextEffects'][_0x183d14(0x1c6)][_0x183d14(0x228)](this),this[_0x183d14(0x253)]();},VisuMZ['AniMsgTextEffects'][_0x26443f(0x1e9)]={},Scene_Boot[_0x26443f(0x183)][_0x26443f(0x253)]=function(){const _0x532845=_0x26443f,_0x26f3b0=['AngleEffects',_0x532845(0x261),'OpacityEffects','PositionEffects','ScaleEffects'];for(const _0x5adc36 of _0x26f3b0){if(_0x532845(0x1f5)!==_0x532845(0x1f5))return _0x4cc5ce=_0x480c1c[_0x532845(0x1e7)](/\x1bEFFECT<(.*?)>/gi,''),_0x58a00b=_0x5e0b2b[_0x532845(0x1e7)](/<CLEAR EFFECT(?:|S)>/gi,''),_0x37e770;else for(const _0x58c593 of VisuMZ[_0x532845(0x1fa)]['Settings'][_0x5adc36]){if(!_0x58c593)continue;const _0x881127=_0x58c593[_0x532845(0x1b1)][_0x532845(0x1f7)]()[_0x532845(0x234)]();if(_0x881127==='')continue;if(_0x881127===_0x532845(0x265))continue;VisuMZ[_0x532845(0x1fa)]['Effects'][_0x881127]=VisuMZ[_0x532845(0x1fa)][_0x532845(0x1e9)][_0x881127]||{};const _0x558e79=VisuMZ[_0x532845(0x1fa)][_0x532845(0x1e9)][_0x881127];for(const _0x487cc7 in _0x58c593){_0x532845(0x208)===_0x532845(0x208)?_0x558e79[_0x487cc7]=_0x58c593[_0x487cc7]:this[_0x532845(0x1fd)][_0x44e61b]=_0x2883fe[_0xcbc60e];}if(_0x881127===_0x532845(0x197))console['log'](_0x558e79);}}},ConfigManager[_0x26443f(0x17d)]=!![],VisuMZ[_0x26443f(0x1fa)][_0x26443f(0x193)]=ConfigManager['makeData'],ConfigManager[_0x26443f(0x192)]=function(){const _0x55d6ca=_0x26443f,_0x1b4826=VisuMZ['AniMsgTextEffects'][_0x55d6ca(0x193)]['call'](this);return _0x1b4826[_0x55d6ca(0x17d)]=this[_0x55d6ca(0x17d)],_0x1b4826;},VisuMZ[_0x26443f(0x1fa)]['ConfigManager_applyData']=ConfigManager[_0x26443f(0x1da)],ConfigManager[_0x26443f(0x1da)]=function(_0x5bc3b2){const _0x28f07b=_0x26443f;VisuMZ['AniMsgTextEffects'][_0x28f07b(0x1c4)][_0x28f07b(0x228)](this,_0x5bc3b2),this[_0x28f07b(0x1bc)](_0x5bc3b2,'textEffects',!![]);if(_0x28f07b(0x17d)in _0x5bc3b2){if(_0x28f07b(0x18f)!==_0x28f07b(0x1d9))this['textEffects']=_0x5bc3b2[_0x28f07b(0x17d)];else{let _0x177e75=this[_0x28f07b(0x179)];_0x177e75*=this[_0x28f07b(0x1c3)],_0x177e75*=this['_pulseScaleX'];let _0x24af4a=this[_0x28f07b(0x179)];_0x24af4a*=this['_flipScaleY'],_0x24af4a*=this['_pulseScaleY'];if(this[_0x28f07b(0x1aa)]['x']!==_0x177e75)this[_0x28f07b(0x1aa)]['x']=_0x177e75;if(this['scale']['y']!==_0x24af4a)this[_0x28f07b(0x1aa)]['y']=_0x24af4a;}}else this[_0x28f07b(0x17d)]=!![];},ColorManager[_0x26443f(0x23c)]=function(_0x2d3496){const _0x384fa4=_0x26443f;_0x2d3496=String(_0x2d3496);if(_0x2d3496[_0x384fa4(0x1e5)](/#(.*)/i)){if(_0x384fa4(0x205)!==_0x384fa4(0x23e))return _0x384fa4(0x1b8)[_0x384fa4(0x223)](String(RegExp['$1']));else{if(this[_0x384fa4(0x235)][_0x384fa4(0x20f)]!==_0x1795a8)this[_0x384fa4(0x1af)]=_0x49579a[_0x384fa4(0x1e2)]+0x4,this[_0x384fa4(0x1ab)]=_0x370ff1[_0x384fa4(0x200)]+0x4;else{const _0x8b8f51=this[_0x384fa4(0x235)]['buffer'];this['_textWidth']=this['_msgWindow'][_0x384fa4(0x1e6)](_0x8b8f51),this[_0x384fa4(0x1ab)]=this[_0x384fa4(0x235)][_0x384fa4(0x1d5)];}this[_0x384fa4(0x21d)]['x']=0.5,this[_0x384fa4(0x21d)]['y']=0.5;}}else return this['textColor'](Number(_0x2d3496));},TextManager[_0x26443f(0x17d)]=VisuMZ[_0x26443f(0x1fa)][_0x26443f(0x1c7)]['Options'][_0x26443f(0x1b1)]||'',VisuMZ[_0x26443f(0x1fa)]['Scene_Message_createAllWindows']=Scene_Message[_0x26443f(0x183)][_0x26443f(0x23d)],Scene_Message[_0x26443f(0x183)][_0x26443f(0x23d)]=function(){const _0x1772ec=_0x26443f;VisuMZ[_0x1772ec(0x1fa)][_0x1772ec(0x1cc)][_0x1772ec(0x228)](this),this[_0x1772ec(0x242)]();},Scene_Message['prototype'][_0x26443f(0x242)]=function(){const _0x13d96=_0x26443f;this[_0x13d96(0x1d6)]=new Sprite(),this[_0x13d96(0x233)](this['_AniMsgTextEffectsContainer']),this['_messageWindow'][_0x13d96(0x181)](this[_0x13d96(0x1d6)]);};function _0x251d(_0x11c7e3,_0x35f55f){const _0x18b448=_0x18b4();return _0x251d=function(_0x251d19,_0x5adfde){_0x251d19=_0x251d19-0x16c;let _0x4bfc23=_0x18b448[_0x251d19];return _0x4bfc23;},_0x251d(_0x11c7e3,_0x35f55f);}function _0x18b4(){const _0x3d59c4=['loFlV','LCasL','applyData','open','charCodeAt','_textEffect','11VDplfN','parameters','NvqVW','WaveSpeedY','iconWidth','_offset','UPcLz','match','textWidth','replace','yNBff','Effects','length','playMessageSound','ceil','Window_Options_addGeneralOptions','PulseSpeedY','fQhUf','loadSystem','EvfRF','outlineWidth','center','fQcTo','YuuiK','PendulumArc','toLowerCase','drawText','585afLCtM','AniMsgTextEffects','fontItalic','updateWaveY','bitmap','ipaBo','drawing','iconHeight','5YIslrh','random','Window_Message_preFlushTextState','moveCustomMessageCursorPauseSign','NBKoR','VisuMZ_2_ExtMessageFunc','UJajf','dNYry','processTextEffectCharacter','max','addGeneralOptions','applyColorModifiers','setHue','updateAngleEffects','iconIndex','fontSize','_rotationAngle','EFFECT','InitialHueOffset','_toneIndex','parse','addTextEffectsCommands','processEscapeCharacter','PulseOffsetX','preFlushTextState','patternDelay','_baseAngle','ARRAYNUM','anchor','removeChild','VisuMZ_3_MessageSounds','setupScaleModifiers','effectData','createBitmap','format','ciqik','updatePulseX','ShakeStrengthHorz','patternOffset','call','updateRotationAngle','388QdNbun','_pulseScaleY','STRUCT','initMembers','WaveOffsetY','PulseGrowthX','nqXnz','InitialToneOffset','JenEr','addWindow','trim','_textState','WaveDistanceY','WaveDistanceX','children','updateOpacityPatternEffect','updateScaleEffects','updateOpacityEffects','getColor','createAllWindows','XFbTU','\x1bCLEAREFFECT[0]','815341pojGnC','43270zeMtqo','createAniMsgTextEffectsContainer','CLEAREFFECT','WaveOffsetX','randomInt','ARRAYFUNC','setupOpacityModifiers','createTextBitmap','applyAngleModifiers','ARRAYSTRUCT','updateFlipX','newPage','DvlGU','cos','_textEffectData','clearTextEffects','PulseSpeedX','colorTones','process_VisuMZ_AniMsgTextEffects','contents','fontBold','updateFlipY','VisuMZ_1_MessageCore','updateGlowEffect','round','6804812LyLsDY','initialize','PendulumOffset','addTemplatetextEffectsCommand','addCommand','RevMC','_flipScaleY','ColorEffects','applyOpacityModifiers','WaveSpeedX','LmbCf','untitled','updatePendulumnAngle','Window_Message_newPage','Window_Base_processDrawIcon','PulseGrowthY','Window_Message_close','updateColorEffects','prRbW','setupAngleModifiers','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Window_Message_processEscapeCharacter','KXJJy','glowOffset','vXmCr','filter','4PLVVlt','pattern','_msgWindow','map','HueShift','buffer','Window_Message','normal','toUpperCase','update','Options','Afykc','jmDMK','processDrawIcon','updateWaveX','wApQx','EVAL','_pendulumAngle','updatePulseY','applyScaleModifiers','padding','_pulseScaleX','postFlushTextState','_baseScale','Window_Message_open','preConvertEscapeCharacters','ndVmZ','textEffects','Window_Message_initMembers','name','6609648uxxMxR','setTextEffectContainer','Window_Base_preConvertEscapeCharacters','prototype','toneDelay','isTopButtonConsolePosition','updateToneShift','convertTextEffectEscapeCodes','destroy','9775912zWZkBq','constructor','split','IconSet','AddOption','obtainEscapeString','UuIVL','createIconBitmap','textColor','makeData','ConfigManager_makeData','Window_Message_postFlushTextState','setupColorModifiers','version','show','FlipSpeedX','exit','return\x200','angle','onDatabaseLoaded','close','description','NUM','status','clone','updateOriginPosition','setFrame','FUNC','create','_textEffectReturnState','FlipSpeedY','createEffectData','jmuQI','scale','_textHeight','setupLocation','processDrawIconTextEffect','updateHueShift','_textWidth','BUTTON_HEIGHT','Name','hide','top','ARRAYSTR','frameCount','53787XUbbhV','floor','#%1','paintOpacity','_targetOpacity','stringify','readFlag','_patternIndex','1828452fVusqg','outLineColor','KSPzb','_hueValue','InitialOpacity','_flipScaleX','ConfigManager_applyData','ConvertParams','Scene_Boot_onDatabaseLoaded','Settings','_currentTone','ARRAYEVAL','STR','addChild','Scene_Message_createAllWindows','glowSpeed','updatePositionEffects','FlipOffsetX','obtainEscapeParam','updateRandomShake','RotationOffset','glowRate','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','height','_AniMsgTextEffectsContainer','ForcedColor'];_0x18b4=function(){return _0x3d59c4;};return _0x18b4();}function Sprite_TextEffect(){const _0xbac749=_0x26443f;this[_0xbac749(0x25b)](...arguments);}Sprite_TextEffect['prototype']=Object[_0x26443f(0x1a5)](Sprite[_0x26443f(0x183)]),Sprite_TextEffect['prototype'][_0x26443f(0x18a)]=Sprite_TextEffect,Sprite_TextEffect[_0x26443f(0x183)][_0x26443f(0x25b)]=function(_0x318f9b,_0x502184,_0x627540){const _0x549aee=_0x26443f;this[_0x549aee(0x276)]=_0x318f9b,this[_0x549aee(0x1dd)]=_0x318f9b[_0x549aee(0x1dd)],this[_0x549aee(0x235)]=JSON[_0x549aee(0x215)](JSON[_0x549aee(0x1bb)](_0x502184)),this[_0x549aee(0x1e3)]=_0x627540,Sprite['prototype']['initialize'][_0x549aee(0x228)](this),this[_0x549aee(0x1ac)](),this['createBitmap'](),this[_0x549aee(0x1a8)](),this['update']();},Sprite_TextEffect['prototype'][_0x26443f(0x1ac)]=function(){const _0x11720e=_0x26443f;if(this['_textState'][_0x11720e(0x20f)]!==undefined)this[_0x11720e(0x1af)]=ImageManager['iconWidth']+0x4,this[_0x11720e(0x1ab)]=ImageManager[_0x11720e(0x200)]+0x4;else{const _0x577f4b=this[_0x11720e(0x235)][_0x11720e(0x279)];this['_textWidth']=this['_msgWindow'][_0x11720e(0x1e6)](_0x577f4b),this[_0x11720e(0x1ab)]=this[_0x11720e(0x235)][_0x11720e(0x1d5)];}this[_0x11720e(0x21d)]['x']=0.5,this[_0x11720e(0x21d)]['y']=0.5;},Sprite_TextEffect[_0x26443f(0x183)][_0x26443f(0x222)]=function(){const _0x52170d=_0x26443f;this[_0x52170d(0x235)][_0x52170d(0x20f)]!==undefined?'vXmCr'===_0x52170d(0x272)?this[_0x52170d(0x190)]():(_0x574260(_0x52170d(0x1d4)[_0x52170d(0x223)](_0x4d799a,_0x599189,_0x563194)),_0x54660a[_0x52170d(0x199)]()):this['createTextBitmap']();},Sprite_TextEffect[_0x26443f(0x183)][_0x26443f(0x190)]=function(){const _0x10b520=_0x26443f;this['bitmap']=ImageManager[_0x10b520(0x1f0)](_0x10b520(0x18c));const _0x459cf7=ImageManager[_0x10b520(0x1e2)],_0x532fbb=ImageManager[_0x10b520(0x200)],_0x4392ef=this[_0x10b520(0x235)][_0x10b520(0x20f)]%0x10*_0x459cf7,_0x5c7d4a=Math[_0x10b520(0x1b7)](this[_0x10b520(0x235)][_0x10b520(0x20f)]/0x10)*_0x532fbb;this[_0x10b520(0x1a3)](_0x4392ef,_0x5c7d4a,_0x459cf7,_0x532fbb);},Sprite_TextEffect['prototype'][_0x26443f(0x248)]=function(){const _0x5c54ef=_0x26443f,_0xecf806=this['_textState']['buffer'],_0x17bec2=Math[_0x5c54ef(0x1ec)](this['_msgWindow'][_0x5c54ef(0x1e6)](_0xecf806)*1.5),_0x56bf5b=Math['ceil'](this[_0x5c54ef(0x235)][_0x5c54ef(0x1d5)]*1.5);this['bitmap']=new Bitmap(_0x17bec2,_0x56bf5b);const _0x221de9=this['_msgWindow'][_0x5c54ef(0x254)],_0x11c312=['fontFace',_0x5c54ef(0x210),_0x5c54ef(0x255),_0x5c54ef(0x1fb),_0x5c54ef(0x191),_0x5c54ef(0x1bf),_0x5c54ef(0x1f2),_0x5c54ef(0x1b9)];for(const _0x4a1afa of _0x11c312){_0x5c54ef(0x16e)===_0x5c54ef(0x16e)?this[_0x5c54ef(0x1fd)][_0x4a1afa]=_0x221de9[_0x4a1afa]:(_0x295741[_0x5c54ef(0x1fa)][_0x5c54ef(0x194)][_0x5c54ef(0x228)](this,_0x2ec776),this['_textEffectReturnState']!==_0x228dc4&&(_0x5eeead[_0x5c54ef(0x1ff)]=!![],this['_textEffectReturnState']=_0x1152ae,_0x101d6e[_0x5c54ef(0x206)]&&this['moveCustomMessageCursorPauseSign'](_0xdcfdba)));}const _0x8e3ff3=this[_0x5c54ef(0x221)]();_0x8e3ff3[_0x5c54ef(0x1d7)]!==undefined&&_0x8e3ff3['ForcedColor']!==''&&(this[_0x5c54ef(0x1fd)][_0x5c54ef(0x191)]=ColorManager[_0x5c54ef(0x23c)](_0x8e3ff3['ForcedColor'])),this[_0x5c54ef(0x1fd)][_0x5c54ef(0x1f8)](_0xecf806,0x0,0x0,_0x17bec2,_0x56bf5b,_0x5c54ef(0x1f3));},Sprite_TextEffect['prototype'][_0x26443f(0x1a8)]=function(){const _0xff553=_0x26443f;this[_0xff553(0x24f)]={};const _0x3780fe=this[_0xff553(0x1dd)][_0xff553(0x18b)](',')['map'](_0x3bac0c=>_0x3bac0c[_0xff553(0x1f7)]()[_0xff553(0x234)]());for(const _0x40ed26 of _0x3780fe){if('BswTX'===_0xff553(0x1fe))this[_0xff553(0x25b)](...arguments);else{const _0x357ec5=VisuMZ[_0xff553(0x1fa)][_0xff553(0x1e9)][_0x40ed26];if(!_0x357ec5)continue;for(const _0x483bf6 in _0x357ec5){this['_textEffectData'][_0x483bf6]=_0x357ec5[_0x483bf6];}}}},Sprite_TextEffect[_0x26443f(0x183)][_0x26443f(0x221)]=function(){const _0x1d14e4=_0x26443f;if(this[_0x1d14e4(0x24f)]===undefined)this[_0x1d14e4(0x1a8)]();return this[_0x1d14e4(0x24f)]||{};},Sprite_TextEffect[_0x26443f(0x183)][_0x26443f(0x27d)]=function(){const _0x4c6531=_0x26443f;Sprite['prototype']['update'][_0x4c6531(0x228)](this),this[_0x4c6531(0x1ce)](),this[_0x4c6531(0x20e)](),this[_0x4c6531(0x23a)](),this['updateOpacityEffects'](),this[_0x4c6531(0x26b)]();},Sprite_TextEffect['prototype']['updatePositionEffects']=function(){const _0x5ad732=_0x26443f;this['updateOriginPosition'](),this[_0x5ad732(0x1d1)](),this[_0x5ad732(0x170)](),this[_0x5ad732(0x1fc)]();},Sprite_TextEffect[_0x26443f(0x183)][_0x26443f(0x1a2)]=function(){const _0x53f615=_0x26443f;this['x']=this[_0x53f615(0x235)]['x'],this['x']+=this[_0x53f615(0x276)]['x']+this[_0x53f615(0x276)][_0x53f615(0x176)],this['x']+=this[_0x53f615(0x1af)]/0x2,this['y']=this['_textState']['y'],this['y']+=this[_0x53f615(0x276)]['y']+this[_0x53f615(0x276)][_0x53f615(0x176)],this['y']+=this[_0x53f615(0x1ab)]/0x2;if(this[_0x53f615(0x185)]()){if(_0x53f615(0x264)!==_0x53f615(0x264))this[_0x53f615(0x209)](_0x49ced2),this[_0x53f615(0x1a6)]=!![],_0x5a0ff1[_0x53f615(0x21f)]&&this[_0x53f615(0x1eb)](_0x1c0c9b),_0x5b1186[_0x53f615(0x1ff)]=![];else{const _0x1b4748=Window_ButtonConsole[_0x53f615(0x1b0)]||0x0;this['y']+=_0x1b4748;}}},Sprite_TextEffect[_0x26443f(0x183)]['isTopButtonConsolePosition']=function(){const _0x8a5ffb=_0x26443f;if(!Imported[_0x8a5ffb(0x206)])return![];return Window_ButtonConsole['POSITION'][_0x8a5ffb(0x1f7)]()[_0x8a5ffb(0x234)]()===_0x8a5ffb(0x1b3);},Sprite_TextEffect[_0x26443f(0x183)][_0x26443f(0x1d1)]=function(){const _0xde4a11=_0x26443f,_0x3882f4=this[_0xde4a11(0x221)](),_0x43934d=_0x3882f4[_0xde4a11(0x226)]??0x0,_0x13ad21=_0x3882f4['ShakeStrengthVert']??0x0;if(_0x43934d===0x0&&_0x13ad21===0x0)return;this['x']+=Math[_0xde4a11(0x245)](_0x43934d+0x1)*(Math[_0xde4a11(0x202)]()<0.5?-0x1:0x1),this['y']+=Math[_0xde4a11(0x245)](_0x13ad21+0x1)*(Math[_0xde4a11(0x202)]()<0.5?-0x1:0x1);},Sprite_TextEffect[_0x26443f(0x183)]['updateWaveX']=function(){const _0x4b0c39=_0x26443f,_0x159e3a=this[_0x4b0c39(0x221)](),_0x14a328=_0x159e3a[_0x4b0c39(0x237)]??0x0;if(_0x14a328===0x0)return;const _0x156d6a=_0x159e3a[_0x4b0c39(0x263)]??0x0;if(_0x156d6a===0x0)return;const _0x11218e=_0x159e3a[_0x4b0c39(0x244)]??0x0,_0x10ffbc=Graphics[_0x4b0c39(0x1b5)]+_0x11218e*this[_0x4b0c39(0x1e3)];this['x']+=Math['round'](Math[_0x4b0c39(0x24e)](_0x10ffbc*_0x156d6a)*_0x14a328);},Sprite_TextEffect[_0x26443f(0x183)][_0x26443f(0x1fc)]=function(){const _0x5402ee=_0x26443f,_0x4a5e56=this[_0x5402ee(0x221)](),_0x57b2d8=_0x4a5e56[_0x5402ee(0x236)]??0x0;if(_0x57b2d8===0x0)return;const _0x30e8f0=_0x4a5e56[_0x5402ee(0x1e1)]??0x0;if(_0x30e8f0===0x0)return;const _0x582c29=_0x4a5e56[_0x5402ee(0x22e)]??0x0,_0x1a24a2=Graphics['frameCount']+_0x582c29*this[_0x5402ee(0x1e3)];this['y']+=Math[_0x5402ee(0x259)](Math[_0x5402ee(0x24e)](_0x1a24a2*_0x30e8f0)*_0x57b2d8);},Sprite_TextEffect[_0x26443f(0x183)][_0x26443f(0x20e)]=function(){const _0xf0b804=_0x26443f;this[_0xf0b804(0x26d)](),this[_0xf0b804(0x266)](),this[_0xf0b804(0x229)](),this[_0xf0b804(0x249)]();},Sprite_TextEffect[_0x26443f(0x183)][_0x26443f(0x26d)]=function(){const _0x253e5b=_0x26443f;this[_0x253e5b(0x21b)]=0x0,this['_pendulumAngle']=0x0;},Sprite_TextEffect[_0x26443f(0x183)][_0x26443f(0x266)]=function(){const _0x126d08=_0x26443f,_0x507dc6=this[_0x126d08(0x221)](),_0x502561=_0x507dc6[_0x126d08(0x1f6)]??0x0;if(_0x502561===0x0)return;const _0x18d61d=_0x507dc6['PendulumSpeed']??0x0;if(_0x18d61d===0x0)return;const _0x3c6342=_0x507dc6[_0x126d08(0x25c)]??0x0,_0x60c41c=Graphics[_0x126d08(0x1b5)]+_0x3c6342*this[_0x126d08(0x1e3)];this[_0x126d08(0x173)]=Math[_0x126d08(0x259)](Math[_0x126d08(0x24e)](_0x60c41c*_0x18d61d)*_0x502561);},Sprite_TextEffect[_0x26443f(0x183)][_0x26443f(0x229)]=function(){const _0x573281=_0x26443f,_0x1ab686=this[_0x573281(0x221)](),_0x1ede22=_0x1ab686['RotationSpeed']??0x0;if(_0x1ede22===0x0)return;const _0xae7ec6=(_0x1ab686[_0x573281(0x1d2)]??0x0)*this[_0x573281(0x1e3)];this[_0x573281(0x211)]=this[_0x573281(0x211)]??_0xae7ec6,this[_0x573281(0x211)]-=_0x1ede22;while(this[_0x573281(0x211)]>0x168)this[_0x573281(0x211)]-=0x168;while(this['_rotationAngle']<0x0)this[_0x573281(0x211)]+=0x168;},Sprite_TextEffect[_0x26443f(0x183)][_0x26443f(0x249)]=function(){const _0x1c1c8b=_0x26443f;let _0x5ea52e=this[_0x1c1c8b(0x21b)];_0x5ea52e+=this['_pendulumAngle'];if(this[_0x1c1c8b(0x211)]!==undefined){if('kdBgm'===_0x1c1c8b(0x1d8)){let _0x5766fe=this['_baseAngle'];_0x5766fe+=this['_pendulumAngle'];this[_0x1c1c8b(0x211)]!==_0x47ec89&&(_0x5766fe+=this[_0x1c1c8b(0x211)]);if(this[_0x1c1c8b(0x19b)]!==_0x5766fe)this[_0x1c1c8b(0x19b)]=_0x5766fe;}else _0x5ea52e+=this[_0x1c1c8b(0x211)];}if(this[_0x1c1c8b(0x19b)]!==_0x5ea52e)this[_0x1c1c8b(0x19b)]=_0x5ea52e;},Sprite_TextEffect[_0x26443f(0x183)]['updateScaleEffects']=function(){const _0x3000c4=_0x26443f;this[_0x3000c4(0x220)](),this[_0x3000c4(0x24b)](),this[_0x3000c4(0x256)](),this[_0x3000c4(0x225)](),this[_0x3000c4(0x174)](),this['applyScaleModifiers']();},Sprite_TextEffect[_0x26443f(0x183)][_0x26443f(0x220)]=function(){const _0x2fc314=_0x26443f;this[_0x2fc314(0x179)]=0x1;if(this[_0x2fc314(0x276)]){if(_0x2fc314(0x1e8)===_0x2fc314(0x1c0)){const _0x317927=_0xcbd226[_0x2fc314(0x1b0)]||0x0;this['y']+=_0x317927;}else this['_baseScale']*=Math[_0x2fc314(0x20a)](this[_0x2fc314(0x276)][_0x2fc314(0x1aa)]['x'],this[_0x2fc314(0x276)][_0x2fc314(0x1aa)]['y']);}this[_0x2fc314(0x1c3)]=0x1,this['_flipScaleY']=0x1,this[_0x2fc314(0x177)]=0x1,this[_0x2fc314(0x22b)]=0x1;},Sprite_TextEffect[_0x26443f(0x183)]['updateFlipX']=function(){const _0x2f9d03=_0x26443f,_0x3d9b5c=this['effectData'](),_0x572441=_0x3d9b5c[_0x2f9d03(0x198)]??0x0;if(_0x572441===0x0)return;const _0x26a57f=_0x3d9b5c[_0x2f9d03(0x1cf)]??0x0,_0x288555=Graphics[_0x2f9d03(0x1b5)]+_0x26a57f*this[_0x2f9d03(0x1e3)];this[_0x2f9d03(0x1c3)]=Math['cos'](_0x288555*_0x572441);},Sprite_TextEffect[_0x26443f(0x183)]['updateFlipY']=function(){const _0x3fe4ee=_0x26443f,_0x152b7c=this[_0x3fe4ee(0x221)](),_0x5a8066=_0x152b7c[_0x3fe4ee(0x1a7)]??0x0;if(_0x5a8066===0x0)return;const _0x3a0ee3=_0x152b7c['FlipOffsetY']??0x0,_0x415705=Graphics['frameCount']+_0x3a0ee3*this[_0x3fe4ee(0x1e3)];this[_0x3fe4ee(0x260)]=Math[_0x3fe4ee(0x24e)](_0x415705*_0x5a8066);},Sprite_TextEffect[_0x26443f(0x183)]['updatePulseX']=function(){const _0x4d028f=_0x26443f,_0x38fffb=this[_0x4d028f(0x221)](),_0x352b92=(_0x38fffb[_0x4d028f(0x22f)]??0x0)/0x2;if(_0x352b92===0x0)return;const _0x73895=_0x38fffb[_0x4d028f(0x251)]??0x0;if(_0x73895===0x0)return;const _0x57e9eb=_0x38fffb[_0x4d028f(0x218)]??0x0,_0x1445a4=Graphics[_0x4d028f(0x1b5)]+_0x57e9eb*this[_0x4d028f(0x1e3)];this[_0x4d028f(0x177)]+=Math[_0x4d028f(0x24e)](_0x1445a4*_0x73895)*_0x352b92;},Sprite_TextEffect[_0x26443f(0x183)][_0x26443f(0x174)]=function(){const _0x3c4f95=_0x26443f,_0x18533e=this[_0x3c4f95(0x221)](),_0x378f7e=(_0x18533e[_0x3c4f95(0x269)]??0x0)/0x2;if(_0x378f7e===0x0)return;const _0x90151c=_0x18533e[_0x3c4f95(0x1ee)]??0x0;if(_0x90151c===0x0)return;const _0x5a5f08=_0x18533e['PulseOffsetY']??0x0,_0x389a4d=Graphics[_0x3c4f95(0x1b5)]+_0x5a5f08*this[_0x3c4f95(0x1e3)];this['_pulseScaleY']+=Math[_0x3c4f95(0x24e)](_0x389a4d*_0x90151c)*_0x378f7e;},Sprite_TextEffect[_0x26443f(0x183)][_0x26443f(0x175)]=function(){const _0xc5c73d=_0x26443f;let _0x39c822=this['_baseScale'];_0x39c822*=this['_flipScaleX'],_0x39c822*=this[_0xc5c73d(0x177)];let _0x5cca1f=this[_0xc5c73d(0x179)];_0x5cca1f*=this[_0xc5c73d(0x260)],_0x5cca1f*=this[_0xc5c73d(0x22b)];if(this['scale']['x']!==_0x39c822)this[_0xc5c73d(0x1aa)]['x']=_0x39c822;if(this[_0xc5c73d(0x1aa)]['y']!==_0x5cca1f)this['scale']['y']=_0x5cca1f;},Sprite_TextEffect[_0x26443f(0x183)][_0x26443f(0x23b)]=function(){const _0x39887e=_0x26443f;this['setupOpacityModifiers'](),this[_0x39887e(0x239)](),this[_0x39887e(0x258)](),this[_0x39887e(0x262)]();},Sprite_TextEffect[_0x26443f(0x183)][_0x26443f(0x247)]=function(){const _0x10cba3=_0x26443f,_0x297d2e=this[_0x10cba3(0x221)]();this[_0x10cba3(0x1ba)]=_0x297d2e[_0x10cba3(0x1c2)]??0xff;},Sprite_TextEffect['prototype'][_0x26443f(0x239)]=function(){const _0x7cf94b=_0x26443f,_0x2ad823=this[_0x7cf94b(0x221)](),_0x24dca9=(_0x2ad823[_0x7cf94b(0x275)]??'')['toLowerCase']()['trim']();if(_0x24dca9==='')return;if(_0x24dca9===undefined)return;const _0x4c33dc=Math[_0x7cf94b(0x20a)](_0x2ad823[_0x7cf94b(0x21a)]??0x1,0x1),_0x257197=_0x2ad823[_0x7cf94b(0x227)]??0x0,_0x3b128d=Graphics['frameCount'];this['_patternIndex']=this[_0x7cf94b(0x1bd)]??_0x257197*this['_offset'];while(this['_patternIndex']>=_0x24dca9[_0x7cf94b(0x1ea)])this[_0x7cf94b(0x1bd)]-=_0x24dca9[_0x7cf94b(0x1ea)];while(this[_0x7cf94b(0x1bd)]<0x0)this[_0x7cf94b(0x1bd)]+=_0x24dca9['length'];const _0x36bf48=(_0x24dca9[_0x7cf94b(0x1dc)](this['_patternIndex'])-0x61)['clamp'](0x0,0x19),_0x25e513=_0x36bf48/0x19;this['_targetOpacity']*=_0x25e513;if(_0x3b128d%_0x4c33dc===0x0){this[_0x7cf94b(0x1bd)]++;while(this[_0x7cf94b(0x1bd)]>=_0x24dca9[_0x7cf94b(0x1ea)])this[_0x7cf94b(0x1bd)]-=_0x24dca9[_0x7cf94b(0x1ea)];}},Sprite_TextEffect[_0x26443f(0x183)][_0x26443f(0x258)]=function(){const _0xf1b64c=_0x26443f,_0x11ac9d=this[_0xf1b64c(0x221)](),_0x3e6809=(_0x11ac9d[_0xf1b64c(0x1d3)]??0x0)/0x2*0xff;if(_0x3e6809===0x0)return;const _0xfe9dcb=_0x11ac9d[_0xf1b64c(0x1cd)]??0x0;if(_0xfe9dcb===0x0)return;const _0x16dac1=_0x11ac9d[_0xf1b64c(0x271)]??0x0,_0x323dd4=Graphics['frameCount']+_0x16dac1*this[_0xf1b64c(0x1e3)];this[_0xf1b64c(0x1ba)]+=Math['round'](Math['cos'](_0x323dd4*_0xfe9dcb)*_0x3e6809-_0x3e6809);},Sprite_TextEffect[_0x26443f(0x183)][_0x26443f(0x262)]=function(){const _0x4dac97=_0x26443f;this['opacity']=this[_0x4dac97(0x1ba)];},Sprite_TextEffect['prototype'][_0x26443f(0x26b)]=function(){const _0x37d4d1=_0x26443f;this['setupColorModifiers'](),this[_0x37d4d1(0x1ae)](),this[_0x37d4d1(0x186)](),this[_0x37d4d1(0x20c)]();},Sprite_TextEffect[_0x26443f(0x183)][_0x26443f(0x195)]=function(){},Sprite_TextEffect[_0x26443f(0x183)][_0x26443f(0x1ae)]=function(){const _0x3ba6b8=_0x26443f,_0x2c8c28=this[_0x3ba6b8(0x221)](),_0x109443=_0x2c8c28[_0x3ba6b8(0x278)]??0x0;if(_0x109443===0x0)return;if(this[_0x3ba6b8(0x1c1)]===undefined){if(_0x3ba6b8(0x232)!==_0x3ba6b8(0x1f1)){const _0x57e9ad=_0x2c8c28[_0x3ba6b8(0x213)]??0x0,_0x20b839=_0x57e9ad*this[_0x3ba6b8(0x1e3)];this[_0x3ba6b8(0x1c1)]=_0x20b839;}else{if(this[_0x3ba6b8(0x18a)]['name']===_0x3ba6b8(0x27a)&&this[_0x3ba6b8(0x1dd)]&&_0x16d7de[_0x3ba6b8(0x1ff)]){this['processDrawIconTextEffect'](_0x21e113,_0x2467a7);return;}_0x23fb43['AniMsgTextEffects']['Window_Base_processDrawIcon']['call'](this,_0x154d74,_0x34250a);}}this[_0x3ba6b8(0x1c1)]+=_0x109443;while(this[_0x3ba6b8(0x1c1)]>0x168)this[_0x3ba6b8(0x1c1)]-=0x168;while(this[_0x3ba6b8(0x1c1)]<0x168)this[_0x3ba6b8(0x1c1)]+=0x168;},Sprite_TextEffect[_0x26443f(0x183)]['updateToneShift']=function(){const _0x3334f8=_0x26443f,_0x3fc4ee=this[_0x3334f8(0x221)](),_0x10f734=_0x3fc4ee[_0x3334f8(0x252)]??[];if(_0x10f734[_0x3334f8(0x1ea)]<=0x0)return;if(this['_currentTone']===undefined){const _0x8b1837=_0x3fc4ee[_0x3334f8(0x231)]??0x0,_0x813be1=Math[_0x3334f8(0x1b7)](Graphics[_0x3334f8(0x1b5)]/Math[_0x3334f8(0x20a)](_0x3fc4ee[_0x3334f8(0x184)]??0x1,0x1));this[_0x3334f8(0x214)]=_0x8b1837*this[_0x3334f8(0x1e3)]+_0x813be1;while(this[_0x3334f8(0x214)]>=_0x10f734['length'])this[_0x3334f8(0x214)]-=_0x10f734[_0x3334f8(0x1ea)];while(this[_0x3334f8(0x214)]<0x0)this[_0x3334f8(0x214)]+=_0x10f734[_0x3334f8(0x1ea)];this[_0x3334f8(0x1c8)]=_0x10f734[this[_0x3334f8(0x214)]][_0x3334f8(0x1a1)]();}if(_0x10f734[_0x3334f8(0x1ea)]<=0x1)return;const _0x318556=Math[_0x3334f8(0x20a)](_0x3fc4ee[_0x3334f8(0x184)]??0x1,0x1),_0x18740d=Graphics[_0x3334f8(0x1b5)];if(_0x18740d%_0x318556===0x0){if('TKPyC'!==_0x3334f8(0x1f4)){this[_0x3334f8(0x214)]++;while(this['_toneIndex']>=_0x10f734[_0x3334f8(0x1ea)])this[_0x3334f8(0x214)]-=_0x10f734['length'];this[_0x3334f8(0x1c8)]=_0x10f734[this[_0x3334f8(0x214)]][_0x3334f8(0x1a1)]();}else _0xa0f1b5[_0x424efa]=_0x130bfc[_0x59c4f2];}else{if(_0x3fc4ee['SmoothToneChange']){const _0x1d6dcc=_0x318556-_0x18740d%_0x318556,_0x2ec312=(this[_0x3334f8(0x214)]+0x1)%_0x10f734[_0x3334f8(0x1ea)],_0x546a2f=_0x10f734[_0x2ec312];if(!_0x546a2f)return;for(let _0x4dc8a3=0x0;_0x4dc8a3<0x4;_0x4dc8a3++){this['_currentTone'][_0x4dc8a3]=(this[_0x3334f8(0x1c8)][_0x4dc8a3]*(_0x1d6dcc-0x1)+_0x546a2f[_0x4dc8a3])/_0x1d6dcc;}}}},Sprite_TextEffect[_0x26443f(0x183)][_0x26443f(0x20c)]=function(){const _0x1a1767=_0x26443f;if(this[_0x1a1767(0x1c1)]!==undefined)this[_0x1a1767(0x20d)](this[_0x1a1767(0x1c1)]);if(this[_0x1a1767(0x1c8)]!==undefined)this['setColorTone'](this['_currentTone']);},VisuMZ[_0x26443f(0x1fa)][_0x26443f(0x182)]=Window_Base[_0x26443f(0x183)]['preConvertEscapeCharacters'],Window_Base[_0x26443f(0x183)][_0x26443f(0x17b)]=function(_0x5799bb){const _0x1bc8b5=_0x26443f;return _0x5799bb=this[_0x1bc8b5(0x187)](_0x5799bb),VisuMZ[_0x1bc8b5(0x1fa)]['Window_Base_preConvertEscapeCharacters'][_0x1bc8b5(0x228)](this,_0x5799bb);},Window_Base['prototype'][_0x26443f(0x187)]=function(_0x2bd863){const _0x25ca7f=_0x26443f;return _0x2bd863=_0x2bd863[_0x25ca7f(0x1e7)](/\x1bEFFECT<(.*?)>/gi,''),_0x2bd863=_0x2bd863[_0x25ca7f(0x1e7)](/<CLEAR EFFECT(?:|S)>/gi,''),_0x2bd863;},VisuMZ[_0x26443f(0x1fa)][_0x26443f(0x268)]=Window_Base['prototype'][_0x26443f(0x16f)],Window_Base[_0x26443f(0x183)]['processDrawIcon']=function(_0x29de77,_0x39905a){const _0x35bd61=_0x26443f;if(this['constructor']['name']===_0x35bd61(0x27a)&&this[_0x35bd61(0x1dd)]&&_0x39905a[_0x35bd61(0x1ff)]){this[_0x35bd61(0x1ad)](_0x29de77,_0x39905a);return;}VisuMZ[_0x35bd61(0x1fa)][_0x35bd61(0x268)][_0x35bd61(0x228)](this,_0x29de77,_0x39905a);},VisuMZ[_0x26443f(0x1fa)][_0x26443f(0x17e)]=Window_Message[_0x26443f(0x183)][_0x26443f(0x22d)],Window_Message[_0x26443f(0x183)][_0x26443f(0x22d)]=function(){const _0x386ced=_0x26443f;VisuMZ[_0x386ced(0x1fa)][_0x386ced(0x17e)]['call'](this),this[_0x386ced(0x1dd)]='';},Window_Message[_0x26443f(0x183)][_0x26443f(0x181)]=function(_0x5695a0){this['_AniMsgTextEffectsContainer']=_0x5695a0;},Window_Message[_0x26443f(0x183)][_0x26443f(0x187)]=function(_0x9dc0a8){const _0x5344a9=_0x26443f;return _0x9dc0a8=_0x9dc0a8['replace'](/<CLEAR EFFECT(?:|S)>/gi,_0x5344a9(0x23f)),_0x9dc0a8;},VisuMZ[_0x26443f(0x1fa)][_0x26443f(0x26f)]=Window_Message[_0x26443f(0x183)][_0x26443f(0x217)],Window_Message[_0x26443f(0x183)]['processEscapeCharacter']=function(_0x5ad0aa,_0x1f92c6){const _0x3c1eaf=_0x26443f;if(_0x5ad0aa===_0x3c1eaf(0x212)){let _0x43bfe4=this[_0x3c1eaf(0x18e)](_0x1f92c6);if(_0x1f92c6[_0x3c1eaf(0x1ff)]&&ConfigManager[_0x3c1eaf(0x17d)]){_0x43bfe4=_0x43bfe4[_0x3c1eaf(0x1e7)](/\x1bC\[(.*?)\]/gi,''),_0x43bfe4=_0x43bfe4[_0x3c1eaf(0x1e7)](/\x1bPREVCOLOR\[(.*?)\]/gi,''),this['_textEffect']=_0x43bfe4[_0x3c1eaf(0x1f7)]()[_0x3c1eaf(0x234)]();if(this['_textEffect']===_0x3c1eaf(0x27b))this[_0x3c1eaf(0x1dd)]='';}}else{if(_0x5ad0aa===_0x3c1eaf(0x243))_0x3c1eaf(0x1a9)!=='QFkWm'?(this[_0x3c1eaf(0x1d0)](_0x1f92c6),this[_0x3c1eaf(0x1dd)]=''):_0x1e4791+=this[_0x3c1eaf(0x211)];else{if('rVSqD'===_0x3c1eaf(0x25f)){const _0x3f8c07=this[_0x3c1eaf(0x221)](),_0x32476d=(_0x3f8c07[_0x3c1eaf(0x1d3)]??0x0)/0x2*0xff;if(_0x32476d===0x0)return;const _0x4f7c8f=_0x3f8c07['glowSpeed']??0x0;if(_0x4f7c8f===0x0)return;const _0xb6da41=_0x3f8c07['glowOffset']??0x0,_0x51b484=_0x42551a['frameCount']+_0xb6da41*this['_offset'];this['_targetOpacity']+=_0x2ad62c['round'](_0x21fc93[_0x3c1eaf(0x24e)](_0x51b484*_0x4f7c8f)*_0x32476d-_0x32476d);}else VisuMZ[_0x3c1eaf(0x1fa)][_0x3c1eaf(0x26f)][_0x3c1eaf(0x228)](this,_0x5ad0aa,_0x1f92c6);}}},VisuMZ['AniMsgTextEffects'][_0x26443f(0x203)]=Window_Message[_0x26443f(0x183)][_0x26443f(0x219)],Window_Message[_0x26443f(0x183)][_0x26443f(0x219)]=function(_0x2f2f76){const _0x363ba6=_0x26443f;VisuMZ[_0x363ba6(0x1fa)][_0x363ba6(0x203)][_0x363ba6(0x228)](this,_0x2f2f76),this[_0x363ba6(0x1dd)]!==''&&_0x2f2f76[_0x363ba6(0x1ff)]&&(_0x363ba6(0x171)!==_0x363ba6(0x171)?(_0x3e75f9[_0x363ba6(0x1fa)][_0x363ba6(0x26a)]['call'](this),this[_0x363ba6(0x1d6)]&&this[_0x363ba6(0x1d6)]['hide']()):(this[_0x363ba6(0x209)](_0x2f2f76),this[_0x363ba6(0x1a6)]=!![],Imported[_0x363ba6(0x21f)]&&this['playMessageSound'](_0x2f2f76),_0x2f2f76[_0x363ba6(0x1ff)]=![]));},VisuMZ[_0x26443f(0x1fa)]['Window_Message_postFlushTextState']=Window_Message[_0x26443f(0x183)][_0x26443f(0x178)],Window_Message[_0x26443f(0x183)][_0x26443f(0x178)]=function(_0x3739a8){const _0xfb7150=_0x26443f;VisuMZ[_0xfb7150(0x1fa)][_0xfb7150(0x194)][_0xfb7150(0x228)](this,_0x3739a8),this['_textEffectReturnState']!==undefined&&(_0x3739a8[_0xfb7150(0x1ff)]=!![],this[_0xfb7150(0x1a6)]=undefined,Imported['VisuMZ_2_ExtMessageFunc']&&this[_0xfb7150(0x204)](_0x3739a8));},Window_Message['prototype']['processTextEffectCharacter']=function(_0x139110){const _0x15a176=_0x26443f;if(!this['_AniMsgTextEffectsContainer'])return;const _0x5f4913=_0x139110[_0x15a176(0x279)][_0x15a176(0x18b)](''),_0x1848b4=JSON[_0x15a176(0x215)](JSON['stringify'](_0x139110));for(const _0x7dfbf1 of _0x5f4913){if(_0x15a176(0x26c)!==_0x15a176(0x26c)){if(!this['_AniMsgTextEffectsContainer'])return;const _0xad5c6c=_0x26bebf[_0x15a176(0x279)][_0x15a176(0x18b)](''),_0xd7c96=_0x452d13['parse'](_0x23bc6b[_0x15a176(0x1bb)](_0xef0823));for(const _0x4c2bbf of _0xad5c6c){_0xd7c96[_0x15a176(0x279)]=_0x4c2bbf;if(_0x4c2bbf[_0x15a176(0x234)]()!==''){const _0x10a2ff=this[_0x15a176(0x1d6)][_0x15a176(0x238)][_0x15a176(0x1ea)],_0x264cfb=new _0x44062f(this,_0xd7c96,_0x10a2ff);this[_0x15a176(0x1d6)]['addChild'](_0x264cfb);}const _0x56fd66=this['textWidth'](_0x4c2bbf);_0xd7c96['x']+=_0x56fd66;}}else{_0x1848b4[_0x15a176(0x279)]=_0x7dfbf1;if(_0x7dfbf1[_0x15a176(0x234)]()!==''){if(_0x15a176(0x17c)!==_0x15a176(0x17c)){const _0x25a6f0=this[_0x15a176(0x221)](),_0x5631d9=_0x25a6f0[_0x15a176(0x236)]??0x0;if(_0x5631d9===0x0)return;const _0x141c0a=_0x25a6f0[_0x15a176(0x1e1)]??0x0;if(_0x141c0a===0x0)return;const _0x579ef9=_0x25a6f0[_0x15a176(0x22e)]??0x0,_0x406797=_0x100e83[_0x15a176(0x1b5)]+_0x579ef9*this[_0x15a176(0x1e3)];this['y']+=_0x4aaf3b[_0x15a176(0x259)](_0x492a2b['cos'](_0x406797*_0x141c0a)*_0x5631d9);}else{const _0x3e2093=this[_0x15a176(0x1d6)][_0x15a176(0x238)][_0x15a176(0x1ea)],_0x5f2924=new Sprite_TextEffect(this,_0x1848b4,_0x3e2093);this[_0x15a176(0x1d6)][_0x15a176(0x1cb)](_0x5f2924);}}const _0x3fe231=this['textWidth'](_0x7dfbf1);_0x1848b4['x']+=_0x3fe231;}}},Window_Base[_0x26443f(0x183)][_0x26443f(0x1ad)]=function(_0x24bcd9,_0x477030){const _0x26e96c=_0x26443f,_0x4e5274=JSON['parse'](JSON[_0x26e96c(0x1bb)](_0x477030));_0x4e5274[_0x26e96c(0x20f)]=_0x24bcd9;const _0x3f039d=this[_0x26e96c(0x1d6)][_0x26e96c(0x238)][_0x26e96c(0x1ea)],_0xc1f386=new Sprite_TextEffect(this,_0x4e5274,_0x3f039d);this[_0x26e96c(0x1d6)][_0x26e96c(0x1cb)](_0xc1f386),_0x477030['x']+=ImageManager[_0x26e96c(0x1e2)]+0x4;},VisuMZ[_0x26443f(0x1fa)][_0x26443f(0x267)]=Window_Message[_0x26443f(0x183)]['newPage'],Window_Message[_0x26443f(0x183)][_0x26443f(0x24c)]=function(_0x206150){const _0x4654c5=_0x26443f;VisuMZ[_0x4654c5(0x1fa)][_0x4654c5(0x267)][_0x4654c5(0x228)](this,_0x206150),this[_0x4654c5(0x1dd)]='',this[_0x4654c5(0x250)]();},Window_Message[_0x26443f(0x183)][_0x26443f(0x250)]=function(){const _0x48732d=_0x26443f;if(!this['_AniMsgTextEffectsContainer'])return;while(this['_AniMsgTextEffectsContainer'][_0x48732d(0x238)][_0x48732d(0x1ea)]>0x0){if(_0x48732d(0x16d)===_0x48732d(0x16d)){const _0x32fea7=this['_AniMsgTextEffectsContainer'][_0x48732d(0x238)][0x0];this[_0x48732d(0x1d6)][_0x48732d(0x21e)](_0x32fea7),_0x32fea7[_0x48732d(0x235)][_0x48732d(0x20f)]===undefined&&(_0x48732d(0x1ef)!==_0x48732d(0x270)?_0x32fea7[_0x48732d(0x188)]():this[_0x48732d(0x24f)][_0x27ff29]=_0x322f58[_0x5a1206]);}else this['updateOriginPosition'](),this['updateRandomShake'](),this['updateWaveX'](),this[_0x48732d(0x1fc)]();}},VisuMZ[_0x26443f(0x1fa)][_0x26443f(0x17a)]=Window_Message[_0x26443f(0x183)][_0x26443f(0x1db)],Window_Message[_0x26443f(0x183)][_0x26443f(0x1db)]=function(){const _0x387a13=_0x26443f;VisuMZ['AniMsgTextEffects'][_0x387a13(0x17a)][_0x387a13(0x228)](this),this[_0x387a13(0x1d6)]&&this[_0x387a13(0x1d6)][_0x387a13(0x197)]();},VisuMZ[_0x26443f(0x1fa)][_0x26443f(0x26a)]=Window_Message['prototype'][_0x26443f(0x19d)],Window_Message[_0x26443f(0x183)][_0x26443f(0x19d)]=function(){const _0x4038db=_0x26443f;VisuMZ[_0x4038db(0x1fa)][_0x4038db(0x26a)][_0x4038db(0x228)](this);if(this[_0x4038db(0x1d6)]){if(_0x4038db(0x230)===_0x4038db(0x224))return this[_0x4038db(0x191)](_0x1a24f7(_0x1be11a));else this[_0x4038db(0x1d6)][_0x4038db(0x1b2)]();}},VisuMZ['AniMsgTextEffects'][_0x26443f(0x1ed)]=Window_Options[_0x26443f(0x183)][_0x26443f(0x20b)],Window_Options[_0x26443f(0x183)]['addGeneralOptions']=function(){const _0x6374db=_0x26443f;VisuMZ['AniMsgTextEffects'][_0x6374db(0x1ed)]['call'](this),this[_0x6374db(0x216)]();},Window_Options['prototype'][_0x26443f(0x216)]=function(){const _0x1b7e8b=_0x26443f;VisuMZ[_0x1b7e8b(0x1fa)]['Settings'][_0x1b7e8b(0x16c)][_0x1b7e8b(0x18d)]&&this[_0x1b7e8b(0x25d)]();},Window_Options['prototype'][_0x26443f(0x25d)]=function(){const _0x46beb9=_0x26443f,_0x57c487=TextManager[_0x46beb9(0x17d)],_0xf94a35=_0x46beb9(0x17d);this[_0x46beb9(0x25e)](_0x57c487,_0xf94a35);};