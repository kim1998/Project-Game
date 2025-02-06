//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.52;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.52] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
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
 * Dim Background Extension
 * 
 * Before, when using the Dim Background as a part of a Show Text event, its
 * size is only the same as the message window's width itself. This looked
 * really ugly because it had hard edges cutting off while gradients are seen
 * elsewhere. To make it look better, we extended the dimmed background to span
 * the width of the screen instead.
 * 
 * ---
 * 
 * Extended Messages
 * 
 * If you decide to expand the size of the message window to allow for more
 * rows to be displayed, you can type in the data for them by chaining together
 * Show Message events. They will take data from each other and display them in
 * the same message window as long as there are enough rows.
 * 
 * ---
 *
 * Extended Choice Lists
 * 
 * Choice lists can be extended by just chaining one Choice List event after
 * the other in succession along the same indentation. They do not extend if
 * there is any event other than a Choice List option between them on the same
 * indentation level.
 *
 * ---
 *
 * ============================================================================
 * Text Language Information
 * ============================================================================
 *
 * As of Message Core version 1.46, Text Language has been added. 
 * 
 * The "Text Language" feature allows your players to switch between different
 * languages for your game to allow people from around the globe to enjoy what
 * story you have to tell.
 * 
 * Disclaimers: This is not an automatic translation tool. Translations made
 * through the "Text Language" feature of the VisuStella MZ Message Core
 * will require manual input by the game developer.
 *
 * ---
 * 
 * === How to Enable Switching ===
 * 
 * Text Language is NOT enabled by default. Here's what you have to do:
 * 
 * #1. Open up the Message Core's Plugin Parameters
 * #2. Plugin Parameters > Text Language Settings > Enable Switching?
 * #3. Change the "Enable Switching?" parameter setting to "true".
 * #4. Adjust any other settings as needed.
 * #5. Save the Plugin Parameter changes.
 * #6. Save your game.
 * 
 * Now, it's time to get the CSV file that will contain all of the text used to
 * translate your game's script.
 * 
 * #1. Play test your game. Make sure Play test mode is NOT disabled.
 * #2. A popup will appear asking to create a language CSV file.
 * #3. Click "OK" and let the plugin do its thing.
 * #4. The project's /data/ folder will appear with Language.csv made.
 * #5. The plugin will then ask you to restart your game.
 * 
 * '''IMPORTANT!''' The separator used for the CSV file must be a semicolon (;)
 * and not a comma (,) as to reduce the amount of punctuation conflicts. Keep
 * this in mind as most CSV editors will default to comma (,) instead of the
 * semicolon (;) for their separator.
 * 
 * ---
 * 
 * === How to Edit the Language CSV ===
 * 
 * The Language CSV is structured as a normal CSV file would be, which also
 * means it can be modified in programs like Microsoft Excel or Google Sheets.
 * We recommend using either of those programs to modify the text.
 * 
 * We do not recommend modifying the CSV file in programs like notepad directly
 * due to the way certain things like commas (,) are handled and how easy it is
 * to be error-prone.
 * 
 * The table will appear something like this at first:
 * 
 *     Key        English    Chinese    Japanese     Korean
 *     Greeting   Hello      你好       こんにちは    안녕하세요
 *     Farewell   Good-bye   再见       さようなら    안녕히
 *     Wow        Wow        哇         ワオ          와우
 * 
 * The "Key" column refers to the reference key used to determine which lines
 * will be inserted into the text. The columns with the languages will utilize
 * the respective phrases for that language.
 * 
 * You can remove columns containing languages that you aren't planning to
 * translate for your game.
 * 
 * ---
 * 
 * === Things to Keep in Mind ===
 * 
 * When adding text to the CSV file via the spreadsheet editor (Excel or Google
 * Sheets), there's a few things to keep in mind.
 * 
 * ---
 * 
 * ==== How to Load the CSV in Google Sheets ====
 * 
 * If you are using Google Sheets and wish to edit the CSV without it
 * converting all the separators into commas, here's what you do:
 * 
 * #1. Go to "sheets.google.com"
 * #2. Create a "Blank spreadsheet"
 * #3. File > Import > Upload > Select the CSV file that was created in your
 *     game project's /data/ folder.
 * #4. For "Separator Type", change it to "Custom" and insert the Semicolon ";"
 * #5. Uncheck "Convert text to numbers, dates, and formulas"
 * 
 * ==== Line Breaks ====
 * 
 * When you want to insert line breaks into the translated phrases, use the
 * <br> text code. This is best used for text that is to be transferred into
 * the message window or help window.
 * 
 * ==== Text Codes ====
 * 
 * Text codes like \C[2] can be inserted normally. However, they only work in
 * windows that support text codes, such as the message window or help window.
 * Otherwise, the text codes will not transfer over properly.
 * 
 * ==== Semicolons ====
 * 
 * Due to the nature of the CSV file, we used the semicolon (;) as the
 * separator. As such, semicolons should not be used in the text entries.
 * Though some sentences will work with the semicolon, not all of them will. If
 * you do want to use a semicolon, use the text code <semicolon> instead.
 * 
 *   Example:
 * 
 *   "The pancakes were delicious<semicolon> they were fluffy and sweet."
 * 
 * Other variations of the semicolon text code are <semi> and <semi-colon>.
 * The <semicolon> text code and variants only work with the Language CSV and
 * are ignored otherwise when typed in a regular message box entry.
 * 
 * ---
 * 
 * ==== Macros and Language Switches ====
 * 
 * For those using both text macros and text language switches, macros will be
 * converted to text before language switches as it allows for better text
 * transitions that way.
 * 
 * ---
 * 
 * === How to Use the Reference Keys ===
 * 
 * Remember the "Key" column and the reference keys? Those are used to
 * determine which lines will be inserted into the text for the message window
 * and just about any other window. However, there's a specific way these keys
 * must be used in order for them to work.
 * 
 * The "text code" format works like this. Use any of the following:
 * 
 *   \tl{keyName}
 *   \translate{keyName}
 *   \loc{keyName}
 *   \locale{keyName}
 *   \localize{keyName}
 * 
 * or for those coming from different translation plugins but want to switch
 * over to the VisuStella MZ Message Core's translation system:
 * 
 *   ${keyName}
 * 
 * For example, to use one of the default keys made with the Language CSV:
 * 
 *   \tl{Greeting}
 * 
 * This will yield "Hello" in English, "你好" in Chinese, "こんにちは" in
 * Japanese, and "안녕하세요" in Korean.
 * 
 * Key names are not case sensitive and any trailing spaces will be removed
 * from them in order to make sure the CSV table is stable to reference any
 * translated text from.
 * 
 * You can insert these language "text codes" into item names, skill names,
 * etc. as well as system entries like for Attack, Defense, etc.
 * 
 * ---
 * 
 * === Naming Weapon Types, Armor Types, Equip Types, Item Categories ===
 * 
 * You might have noticed that if you've decided to use \tl{keyName} for weapon
 * or other database types, other parts of the game will error out. Don't
 * worry, for these, you don't have to change the currently used database name.
 * Go straight to the CSV and insert in a new key for that particular database
 * name. For example, the equip type "Accessory" will use "Accessory" as the
 * automatic key to look for a translated phrase. If there isn't any in the CSV
 * file, then the default database text entry will be used.
 * 
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned. *Note1*
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned. *Note1*
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned. *Note1*
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start. Does not work with Word Wrap.
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 * Word Wrap also cannot be used together with <left>, <center>, or <right> and
 * will disable itself if text alignment text codes are detected.
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 *
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Map Name)
 * ------------------   -------------------------------------------------------
 * <left>               Makes map name align to left side of screen.
 * <center>             Makes map name align to horizontally center of screen.
 * <right>              Makes map name align to right side of screen.
 * 
 * <top>                Makes map name align to top of screen.
 * <middle>             Makes map name align to vertically middle of screen.
 * <bottom>             Makes map name align to bottom of screen.
 * 
 * <X: +n>              Adjusts the horizontal position of map name by n.
 * <X: -n>              Adjusts the horizontal position of map name by n.
 * 
 * <Y: +n>              Adjusts the vertical position of map name by n.
 * <Y: -n>              Adjusts the vertical position of map name by n.
 * 
 * Note: All of these text codes require VisuMZ_0_CoreEngine installed and its
 * "Map Name Text Code" plugin parameter enabled.
 * 
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <Caps>               Makes all text after this capitalized.
 *                      Turns off other auto-text case modes.
 *                      ie: "hello world" becomes "HELLO WORLD"
 * </Caps>              Turns off auto text-casing effects.
 * 
 * <Upper>              Makes the first letter of any word after a space to be
 *                      capitalized. Other letters are left alone.
 *                      Turns off other auto-text case modes.
 *                      ie. "old mcDonald" becomes "Old McDonald"
 * </Upper>             Turns off auto text-casing effects.
 * 
 * <Lower>              Makes all text after this lowercase.
 *                      Turns off other auto-text case modes.
 *                      ie: "THE QUICK BROWN FOX" becomes "the quick brown fox"
 * </Lower>             Turns off auto text-casing effects.
 * 
 * <Alt>                Makes all text after this alternate between uppercase
 *                      and lowercase. Turns off other auto-text case modes.
 *                      ie: "Hello" becomes "HeLlO"
 * </Alt>               Turns off auto text-casing effects.
 * 
 * <Chaos>              Makes all text after this randomize between uppercase
 *                      and lowercase. Turns off other auto-text case modes.
 *                      ie: "Wassup" becomes "waSsUP" or "WasSuP"
 * </Chaos>             Turns off auto text-casing effects.
 * 
 * **Clarity:** In case you're wondering, the text codes </Caps>, </Upper>,
 * </Lower>, </Alt>, and </Chaos> all do the same thing and can be used
 * interchangeably with each other. For example, you can do this:
 * <Caps>hello world</Lower> and it would still accomplish the same effect, but
 * you won't do that because you're not a monster of a developer.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Next Page>          Ends the current message page at this line. This is
 *                      used for messages when rows are at 5 or above and the
 *                      message lines don't match the amount. This is used to
 *                      prevent grabbing message windows from following message
 *                      events. Any lines following <Next Page> in the same
 *                      message event will be ignored.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * ----------------------------   ---------------------------------------------
 * Text Code                      Effect (Battle Only)
 * ----------------------------   ---------------------------------------------
 * <Current Battle Target>        Replaces text code with the current target of
 *                                an action in battle.
 * <Current Battle User>          Replaces text code with the currently active
 *                                user in battle.
 * <Current Battle Action>        Replaces text code with the current battle
 *                                action's name with an icon in front.
 * <Current Battle Action Name>   Replaces text code with the current battle
 *                                action's name without an icon.
 * 
 * If there is no battle, no target, no user, or no action, then the text code
 * will just be replaced with no text.
 * 
 * These text codes are NOT recommended to be used inside of Help Descriptions.
 * They are best used with "Show Text" event commands.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 * 
 * <Choice Width: x>              Sets the minimum text area width to x.
 *                                Applies to whole choice window.
 * <Choice Indent: x>             Sets the indent to x value. Applies to
 *                                current choice selection only.
 * 
 * <BgColor: x>                   Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to 'x' text color. This
 *                                will be combined with a fading
 * <BgColor: x,y>                 Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to 'x' to 'y' gradient
 *                                text color.
 * <BgColor: #rrggbb>             Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to '#rrggbb' color using
 *                                hex color values.
 * <BgColor: #rrggbb, #rrggbb>    Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to '#rrggbb' gradient
 *                                using hex color values.
 * 
 * <Help> text </Help>            Makes a help window appear and have it show
 *                                'text' in its contents. The help window will
 *                                disappear if no text is displayed.
 * 
 * <Shuffle>                      Shuffles the order of all choices. Any cancel
 *                                shortcuts other than "Branch" will be undone.
 * <Shuffle: x>                   Shuffles the order of all choices and only
 *                                x number of them will appear. Any cancel
 *                                shortcuts other than "Branch" will be undone.
 *                                Hidden choices do not count towards x number.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Background Effects (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * 
 * <BgImg: filename>              Creates a background image from img/pictures/
 *                                stretched across the choice rectangle.
 * <BgImg LowerLeft: filename>    Creates a background image from img/pictures/
 *                                scaled to the lower left of choice rect.
 * <BgImg LowerCenter: filename>  Creates a background image from img/pictures/
 *                                scaled to the lower center of choice rect.
 * <BgImg LowerRight: filename>   Creates a background image from img/pictures/
 *                                scaled to the lower right of choice rect.
 * <BgImg MidLeft: filename>      Creates a background image from img/pictures/
 *                                scaled to the middle left of choice rect.
 * <BgImg Center: filename>       Creates a background image from img/pictures/
 *                                scaled to the center of choice rect.
 * <BgImg MidRight: filename>     Creates a background image from img/pictures/
 *                                scaled to the middle right of choice rect.
 * <BgImg UpperLeft: filename>    Creates a background image from img/pictures/
 *                                scaled to the upper left of choice rect.
 * <BgImg UpperCenter: filename>  Creates a background image from img/pictures/
 *                                scaled to the upper center of choice rect.
 * <BgImg UpperRight: filename>   Creates a background image from img/pictures/
 *                                scaled to the upper right of choice rect.
 * 
 * *Note:* For the <BgImg: filename> text code variants, even if the background
 * image is smaller than the choice contents, it will overscale to match its
 * choice rectangle dimensions.
 * 
 * *Note:* Using a background image will clear the dimmed background rectangle
 * that is normally behind each selectable choice.
 * 
 * *Note:* Each choice can only have one background image but can use a
 * combination of one background and one foreground image.
 * 
 * *Note:* Images in the background will appear behind the select cursor.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Foreground Effects (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * 
 * <FgImg: filename>              Creates a foreground image from img/pictures/
 *                                stretched across the choice rectangle.
 * <FgImg LowerLeft: filename>    Creates a foreground image from img/pictures/
 *                                scaled to the lower left of choice rect.
 * <FgImg LowerCenter: filename>  Creates a foreground image from img/pictures/
 *                                scaled to the lower center of choice rect.
 * <FgImg LowerRight: filename>   Creates a foreground image from img/pictures/
 *                                scaled to the lower right of choice rect.
 * <FgImg MidLeft: filename>      Creates a foreground image from img/pictures/
 *                                scaled to the middle left of choice rect.
 * <FgImg Center: filename>       Creates a foreground image from img/pictures/
 *                                scaled to the center of choice rect.
 * <FgImg MidRight: filename>     Creates a foreground image from img/pictures/
 *                                scaled to the middle right of choice rect.
 * <FgImg UpperLeft: filename>    Creates a foreground image from img/pictures/
 *                                scaled to the upper left of choice rect.
 * <FgImg UpperCenter: filename>  Creates a foreground image from img/pictures/
 *                                scaled to the upper center of choice rect.
 * <FgImg UpperRight: filename>   Creates a foreground image from img/pictures/
 *                                scaled to the upper right of choice rect.
 * 
 * *Note:* For the <FgImg: filename> text code variants, unlike the background
 * variant, the foreground image will not overscale past its original size.
 * Instead, it will maintain its original size or be smaller, so long as it can
 * be scaled to exist within the choice rectangle unless it is intended to be
 * stretched by using the <FgImg: filename> variant.
 * 
 * *Note:* Text is then written on top of the foreground image.
 * 
 * *Note:* Each choice can only have one foreground image but can use a
 * combination of one background and one foreground image.
 * 
 * *Note:* Images in the foreground will appear behind the select cursor.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 * 
 * -------------------------------   ------------------------------------------
 * Text Code                         Effect (Message Window Only)
 * -------------------------------   ------------------------------------------
 * 
 * <Position: x, y, width, height>   Forces the message window to exact listed
 *                                   coordinates and dimensions. Replace each
 *                                   of the arguments with numbers. *Note*
 * 
 * <Coordinates: x, y>               Forces the message window to the exact
 *                                   listed coordinates. Replace each of the
 *                                   arguments with numbers. *Note*
 * 
 * <Dimensions: width, height>       Forces the message window size to the
 *                                   exact listed dimensions. Replace each of
 *                                   the arguments with numbers. *Note*
 * 
 * <Offset: +x, +y>                  Quickly adjust the message window offset
 * <Offset: -x, -y>                  values to the x and y amounts. The values
 * <Offset: +x, -y>                  will replace the previous offset settings
 * <Offset: -x, +y>                  if there were any.
 * 
 * *NOTE* These text codes do not work with Word Wrap.
 * 
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Requires VisuMZ_0_CoreEngine)
 * ------------------   -------------------------------------------------------
 * <Up Button>          Display's VisuMZ_0_CoreEngine's button assist text.
 * <Left Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * <Right Button>       Display's VisuMZ_0_CoreEngine's button assist text.
 * <Down Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * <Ok Button>          Display's VisuMZ_0_CoreEngine's button assist text.
 * <Cancel Button>      Display's VisuMZ_0_CoreEngine's button assist text.
 * <Shift Button>       Display's VisuMZ_0_CoreEngine's button assist text.
 * <Menu Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * <Page Up Button>     Display's VisuMZ_0_CoreEngine's button assist text.
 * <Page Down Button>   Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * ---
 * 
 * === Random Text Pool ===
 * 
 * <RNG> text1 | text2 | text3 </RNG>
 * 
 * Using the above text code format in a Show Message entry, you can get a
 * random result out of the various inserted texts. Use "|" (without quotes) as
 * a separator between text entries. You can have unlimited entries. The result
 * will have any excess white space trimmed.
 * 
 * This text code cannot be inserted into a macro and parsed properly.
 * 
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<?>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<?>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace '?' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments. These will only alter the
 *   window dimensions when the text has arrived at that point. They will not
 *   alter the window preemptively. This is not used as a window positioner.
 *   Use the <Position: x, y, width, height> text code for that.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * Note: These text codes only work with the Message Window. Keep in mind that
 *   even if some windows might look like the Message Window, it may not
 *   necessarily be one.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
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
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * Message: X/Y Offsets
 * - Change the X and Y Offsets of the Message Window.
 * - The offset value(s) will be saved and stored.
 * 
 *   Offset X:
 *   - Offset Message Window horizontally.
 *   - Negative: Left; Positive: Right
 *   - Message Window coordinates are still restricted via clamping.
 * 
 *   Offset Y:
 *   - Offset Message Window vertically.
 *   - Negative: Up; Positive: Down
 *   - Message Window coordinates are still restricted via clamping.
 * 
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 * 
 * Choices: Distance
 * - Change the distance from choice window to the message window.
 * 
 *   Distance:
 *   - Change distance between the choice and message windows.
 *   - Default distance is 0.
 *   - Use negative to center align with remaining space.
 * 
 * ---
 *
 * Choices: Properties
 * - Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 * 
 *   Minimum Choice Width:
 *   - What is the minimum width size for each choice?
 *   - 96 is the default width.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 * 
 * === Select Plugin Commands ===
 * 
 * ---
 * 
 * Select: Weapon
 * - Opens the Event Select Item Window to let the player pick a weapon to
 *   choose from.
 * - Can be opened while the Message Window is open.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected weapon.
 *   - It will result in 0 otherwise.
 * 
 *   Weapon Type ID:
 *   - Reduce all the weapons to a specific weapon type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * Select: Armor
 * - Opens the Event Select Item Window to let the player pick an armor to
 *   choose from.
 * - Can be opened while the Message Window is open.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected armor.
 *   - It will result in 0 otherwise.
 * 
 *   Armor Type ID:
 *   - Reduce all the armors to a specific armor type.
 *   - Leave at 0 to not use filters.
 * 
 *   Equip Type ID:
 *   - Reduce all the armors to a specific equip type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * Select: Skill
 * - Opens the Event Select Item Window to let the player pick a skill to
 *   choose from.
 * - Requires VisuMZ_1_SkillsStatesCore!
 * - Can be opened while the Message Window is open.
 * - Skills will not be listed if they are hidden by the actor.
 * - Skills will not be listed if the actor lacks access to their Skill Type.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected skill.
 *   - It will result in 0 otherwise.
 * 
 *   Actor ID:
 *   - Select an actor to get the skill list from.
 *   - Use 0 to select from the party leader.
 * 
 *   Skill Type ID:
 *   - Reduce all the skills to a specific skill type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Change Text
 * - Change text for target picture(s) to show.
 * - You may use text codes.
 * - Text will adapt to picture's properties.
 * - Settings will be erased if picture is erased.
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to set text to.
 * 
 *   Padding:
 *   - How much padding from the sides should there be?
 * 
 *   Text:
 * 
 *     Upper Left:
 *     Upper Center:
 *     Upper Right:
 *     Middle Left:
 *     Middle Center:
 *     Middle Right:
 *     Lower Left:
 *     Lower Center:
 *     Lower Right:
 *     - The text that's aligned to this picture's side.
 *     - You may use text codes.
 * 
 * ---
 * 
 * Picture: Erase Text
 * - Erase all text for target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to erase text for.
 * 
 * ---
 * 
 * Picture: Refresh Text
 * - Refreshes the text used for all on-screen pictures.
 * - To be used if any dynamic text codes are updated like \n[x].
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset Message Window horizontally or vertically.
 *   - Horizontal: Left; Positive: Right
 *   - Veritcal: Negative: Up; Positive: Down
 * 
 *   Stretch Dimmed BG:
 *   - Stretch dimmed window background to fit the whole screen.
 * 
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 * 
 *   Each Message Start:
 *   Each Message End:
 *   - This is text that is added at the start/end of each message.
 *   - You may use text codes.
 *   - Keep in mind that if a message extends to a different page (due to word
 *     wrap, excess lines, etc), that does not mean the starting text will
 *     be added to where the next page begins or the ending text will be added
 *     where the previous page ends.
 *   - Can be used for things like adding "<center>" to the start of each 
 *     message without having to type it every time.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 * 
 *   Minimum Choice Width:
 *   - What is the minimum choice width for each choice?
 *   - 96 is the default width.
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Font Manager
 * ============================================================================
 *
 * Custom fonts that aren't the message or number fonts cannot be used without
 * registration. If you try to use custom fonts in RPG Maker MZ without
 * registering their font family first, you will find out that they will not
 * work. These plugin parameters allow you to register your game's custom fonts
 * here.
 * 
 * ---
 * 
 * Settings:
 * 
 *   Font Family:
 *   - This will be what's used by RPG Maker MZ and plugins to reference this
 *     specific font.
 *   - NO filename extensions!
 * 
 *   Filename:
 *   - What is the filename of the custom font you would like to use?
 *   - Located inside the project's "fonts" folder.
 * 
 * ---
 * 
 * Examples:
 * 
 *   Font Family: WildWords
 *   Filename: WildWords-Regular.ttf
 * 
 * How you would use this in other plugins as a preface to the font face or
 * font family would be to use "WildWords" as the font face/family name. Then
 * RPG Maker MZ will use its own innate FontManager to refer that to the
 * "WildWords-Regular.ttf" file found in the game's "fonts" folder.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 * 
 * This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 * Use the method stated before with the brackets to [MacroName] instead.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Language Settings
 * ============================================================================
 *
 * The "Text Language" feature allows your players to switch between different
 * languages for your game to allow people from around the globe to enjoy what
 * story you have to tell.
 * 
 * Disclaimers: This is not an automatic translation tool. Translations made
 * through the "Text Language" feature of the VisuStella MZ Message Core
 * will require manual input by the game developer.
 * 
 * See the "Text Language Information" for more information.
 *
 * ---
 * 
 * Main Settings:
 * 
 *   Enable Switching?:
 *   - Enable language switching settings for this plugin?
 * 
 *   CSV Filename:
 *   - What is the filename of the CSV file to read from?
 *   - Located within the project's /data/ folder.
 * 
 * ---
 * 
 * Options:
 * 
 *   Add Option?:
 *   - Add the 'Text Language' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
 * 
 * ---
 * 
 * Languages:
 * 
 *   Default Language:
 *   - What is the default language used for this game?
 * 
 *   Supported Languages:
 *   - What are all the supported languages supported by this game's
 *     script?
 *   - Remove any that aren't translated.
 * 
 * ---
 * 
 * Language Names:
 * 
 *   Bengali:
 *   Chinese (Simplified):
 *   Chinese (Traditional):
 *   Czech:
 *   Danish:
 *   Dutch:
 *   English:
 *   Finnish:
 *   French:
 *   German:
 *   Greek:
 *   Hindi:
 *   Hungarian:
 *   Indonesian:
 *   Italian:
 *   Japanese:
 *   Korean:
 *   Norwegian:
 *   Polish:
 *   Portuguese:
 *   Romanian:
 *   Russian:
 *   Slovak:
 *   Spanish:
 *   Swedish:
 *   Tamil:
 *   Thai:
 *   Turkish:
 *   - How does this language appear in the in-game options?
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Language Fonts
 * ============================================================================
 *
 * Different default fonts used for different languages. This allows different
 * stylistic choices to be made for different languages in case the current
 * font you're using doesn't have support for other language types.
 * 
 * Keep in mind that players can override this with Options Core if they select
 * a text option other than 'Default' for the 'Text Font' option.
 * 
 * Make sure any new custom fonts used for different languages are registered
 * with the 'Custom Font Manager' found in this plugin's Plugin Parameters.
 *
 * ---
 * 
 * Languages:
 * 
 *   Bengali:
 *   Chinese (Simplified):
 *   Chinese (Traditional):
 *   Czech:
 *   Danish:
 *   Dutch:
 *   English:
 *   Finnish:
 *   French:
 *   German:
 *   Greek:
 *   Hindi:
 *   Hungarian:
 *   Indonesian:
 *   Italian:
 *   Japanese:
 *   Korean:
 *   Norwegian:
 *   Polish:
 *   Portuguese:
 *   Romanian:
 *   Russian:
 *   Slovak:
 *   Spanish:
 *   Swedish:
 *   Tamil:
 *   Thai:
 *   Turkish:
 *   - What font face is used for this language?
 *   - Make sure it is registered under Custom Font Manager.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Language Images
 * ============================================================================
 *
 * Allows different images to be used when different languages are used. This
 * is for images that have text on it that you want to appear in different
 * languages based on the text language selected by the player.
 * 
 * There are two ways this works:
 * 
 *   #1: Folder Name
 *   - The name of the folder containing those images will be named something
 *     like "Scrolls[XX]"
 *   - When a different language is picked, like English, it can reference
 *     the 'Scrolls[EN]' folder instead. If Japanese is used, it can refer to
 *     the 'Scrolls[JP]' folder as well.
 *   - The text used to replace the [XX] in the folder name can be determined
 *     in the Plugin Parameters.
 *     - Make sure you change the settings for each language you wish to use to
 *       have translated images for.
 * 
 *   #2: Filename
 *   - The filename of the image to be translated can be named something like
 *     ReidProfile[XX].png
 *   - When a different language is picked, like English, it will reference the
 *     'ReidProfile[EN].png' image instead. For Japanese, it will reference the
 *     'ReidProfile[JP].png' as well.
 *   - The text used to replace the [XX] in the filename can be determined in
 *     the Plugin Parameters.
 *     - Make sure you change the settings for each language you wish to use to
 *       have translated images for.
 *
 * ---
 * 
 * Settings
 * 
 *   Convert Default?
 *   - ON: Default language uses converted marker.
 *   - OFF: Default languages uses [XX] as marker.
 * 
 * Here's an explanation of what this does:
 * 
 *   - The default language picked is English and the player has English picked
 *     as their desired language.
 *   - If the "Convert Default?" Plugin Parameter is ON, then 'ReidProfile[XX]'
 *     will reference and look for the 'ReidProfile[EN]' image.
 *   - If the "Convert Default?" Plugin Parameter is OFF, 'ReidProfile[XX]' is
 *     then used for the English language instead of 'ReidProfile[EN]'.
 *     - This is to avoid duplicate images and save on file space.
 *   - The reasoning behind the [XX] is that there needs to be an anchor image
 *     used for the RPG Maker MZ client in order to have something to reference
 *     before branching out to different languages.
 * 
 * ---
 * 
 * Languages 
 * 
 *   Bengali:
 *   Chinese (Simplified):
 *   Chinese (Traditional):
 *   Czech:
 *   Danish:
 *   Dutch:
 *   English:
 *   Finnish:
 *   French:
 *   German:
 *   Greek:
 *   Hindi:
 *   Hungarian:
 *   Indonesian:
 *   Italian:
 *   Japanese:
 *   Korean:
 *   Norwegian:
 *   Polish:
 *   Portuguese:
 *   Romanian:
 *   Russian:
 *   Slovak:
 *   Spanish:
 *   Swedish:
 *   Tamil:
 *   Thai:
 *   Turkish:
 *   - This text will replace [XX] with in image folder names and filenames
 *     when this language is selected.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 * 
 * Word wrap only supports left-to-right alphabetical languages that utilize
 * spaces.
 * 
 * Word Wrap also cannot be used together with <left>, <center>, or <right> and
 * will disable itself if text alignment text codes are detected.
 * 
 * As of the v1.44 update, some Asian languages such as Chinese and Japanese
 * are now supported for word wrap. Korean language is only supported if spaces
 * are used.
 * 
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
 * 
 *   End Padding:
 *   - Add extra padding to your window to make text wrap further away from the
 *     end of the window.
 *   - This will default to 0.
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
 * Version 1.52: December 19, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Text Codes added by Arisu:
 * *** <left>
 * *** <center>
 * *** <right>
 * **** When used in the Map Name, instead of aligning the text which is
 *      centered by default, the text code will align the horizontal position
 *      of the name displayed on the screen.
 * *** <top>
 * *** <middle>
 * *** <bottom>
 * **** When used in the Map Name, the text code will align the vertical
 *      position of the name displayed on the screen.
 * *** <X: +n>
 * *** <X: -n>
 * *** <Y: +n>
 * *** <Y: -n>
 * **** Adjusts the horizontal/vertical position of map name by 'n' value.
 * *** All of these text codes require VisuMZ_0_CoreEngine installed and its
 *     "Map Name Text Code" plugin parameter enabled.
 * 
 * Version 1.51: October 17, 2024
 * * Bug Fixes!
 * ** Fixed a bug where \LastGainObj text code did not work with text language
 *    key codes. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added note to Text Language Information > How to Enable Switching
 * *** IMPORTANT! The separator used for the CSV file must be a semicolon (;)
 *     and not a comma (,) as to reduce the amount of punctuation conflicts.
 *     Keep this in mind as most CSV editors will default to comma (,) instead
 *     of the semicolon (;) for their separator.
 * ** Added note to Text Language Information > Naming Weapon Types, etc:
 * *** You might have noticed that if you've decided to use \tl{keyName} for
 *     weapon or other database types, other parts of the game will error out.
 *     Don't worry, for these, you don't have to change the currently used
 *     database name. Go straight to the CSV and insert in a new key for that
 *     particular database name. For example, the equip type "Accessory" will
 *     use "Accessory" as the automatic key to look for a translated phrase. If
 *     there isn't any in the CSV file, then the default database text entry
 *     will be used.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Parameters > Text Language Settings > Language Fonts
 * **** Different default fonts used for different languages. This allows
 *      different stylistic choices to be made for different languages in case
 *      the current font you're using doesn't have support for other language
 *      types.
 * **** Keep in mind that players can override this with Options Core if they
 *      select a text option other than 'Default' for the 'Text Font' option.
 * **** Make sure any new custom fonts used for different languages are
 *      registered with the 'Custom Font Manager' found in this plugin's Plugin
 *      Parameters.
 * *** Parameters > Text Language Settings > Language Images
 * **** Allows different images to be used when different languages are used.
 *      This is for images that have text on it that you want to appear in
 *      different languages based on the text language selected by the player.
 * 
 * Version 1.50: July 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New text codes added by Irina:
 * *** <Caps> </Caps>
 * *** <Upper> </Upper>
 * *** <Lower> </Lower>
 * **** Auto-text case textcodes will automatically adjust text inserted
 *      between them to respectively be completely capitalized, first-letter
 *      capitalized, or completely lowercase.
 * **** More information in the help file.
 * *** <Alt> </Alt>
 * **** Alternates between uppercase and lowercase for letters.
 * *** <Chaos> </Chaos>
 * **** Randomly uses uppercase and lowercase for letters.
 * 
 * 
 * Version 1.49: May 16, 2024
 * * Bug Fixes!
 * ** Fixed a problem where using text codes to get database object names did
 *    not apply translated text.
 * * Documentation Update!
 * ** Added note for Message Window Only text code effects:
 * *** These text codes only work with the Message Window. Keep in mind that
 *     even if some windows might look like the Message Window, it may not
 *     necessarily be one.
 * * Feature Update!
 * ** Added a failsafe for when Choice List Window doesn't have any viable
 *    options (due to being hidden or disabled). Update made by Irina.
 * ** Added a failsafe for Language CSV when empty rows are added.
 * ** Updated some default Text Code actions in order to make sure they're only
 *    used by the Message Window and not anything else. Update made by Irina.
 * 
 * Version 1.48: April 18, 2024
 * * Bug Fixes!
 * ** Added fail safe for help description checks parsing from objects without
 *    help descriptions normally. Fix made by Irina.
 * 
 * Version 1.47: February 15, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > Custom Font Manager
 * **** Register custom fonts here.
 * **** Custom fonts that aren't the message or number fonts cannot be used
 *      without registration.
 * **** See help file for more information.
 * 
 * Version 1.46: January 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where script calls used to create message choices would not
 *    work properly. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Text Language Switching added by Irina:
 * *** Plugin Parameters > Text Language Settings
 * **** The "Text Language" feature allows your players to switch between
 *      different languages for your game to allow people from around the globe
 *      to enjoy what story you have to tell.
 * **** Disclaimers: This is not an automatic translation tool. Translations
 *      made through the "Text Language" feature of the VisuStella MZ Message
 *      Core will require manual input by the game developer.
 * **** Read more about it in detail within the "Text Language Information"
 *      section in the help file.
 * ** New Plugin Parameter added by Irina:
 * *** Choices: Distance
 * **** Change the distance from choice window to the message window.
 * ** New parameter added to Plugin Command "Choices: Properties" by Irina:
 * *** Minimum Choice Width
 * **** What is the minimum width size for each choice?
 * ** New Plugin Parameter for "Message Window" added by Irina:
 * *** Parameters > Message Window: Choice List Window> Minimum Choice Width
 * **** What is the minimum width size for each choice?
 * ** New Text Codes for Choice Window added by Irina:
 * *** <BgImg: filename> and variants
 * *** <FgImg: filename> and variants
 * **** These text codes allow adding a background or foreground image to a
 *      choice rectangle in stretched/scaled size.
 * 
 * Version 1.45: December 14, 2023
 * * Bug Fixes!
 * ** Punctuation was, for some reason, excluded when using Wordwrap with
 *    Japanese and Chinese languages. This should be fixed now. Fixed by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added clarity to the <left>, <center>, and <right> being unable to be
 *    used together with word wrap.
 * *** Word Wrap also cannot be used together with <left>, <center>, or <right>
 *     and will disable itself if text alignment text codes are detected.
 * * Feature Update!
 * ** Wordwrap <br> now works properly with Japanese and Chinese languages.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > General Settings > Each Message Start
 * *** Plugin Parameters > General Settings > Each Message End
 * **** This is text that is added at the start/end of each message.
 * **** Keep in mind that if a message extends to a different page (due to word
 *      wrap, excess lines, etc), that does not mean the starting text will
 *      be added to where the next page begins or the ending text will be added
 *      where the previous page ends.
 * **** Can be used for things like adding "<center>" to the start of each 
 *      message without having to type it every time.
 * 
 * Version 1.44: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated "Plugin Parameters: Word Wrap Settings" section:
 * *** As of the v1.44 update, some Asian languages such as Chinese and
 *     Japanese are now supported for word wrap. Korean language is only
 *     supported if spaces are used.
 * * Feature Update!
 * ** Word Wrap is now supported for Japanese and Chinese languages.
 * ** Feature updated by Irina and sponsored by AndyL.
 * * New Features!
 * ** New text codes added by Irina for "Show Choices" event command.
 * *** <Shuffle>
 * **** Shuffles the order of all choices. Any cancel shortcuts other than
 *      "Branch" will be undone.
 * *** <Shuffle: x>
 * **** Shuffles the order of all choices and only x number of them appear. Any
 *      cancel shortcuts other than "Branch" will be undone. Hidden choices do
 *      not count towards x number.
 * 
 * Version 1.43: April 13, 2023
 * * Compatibility Update!
 * ** Fixed incompatibilities with auto message positioning with the Map Zoom
 *    plugin. Update made by Irina.
 * 
 * Version 1.42: March 16, 2023
 * * Bug Fixes!
 * ** Fixed some text codes that would capture way too much data than intended.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New text code added by Irina for Show Choice Window only:
 * *** <Help> text </Help>
 * **** Makes a help window appear and have it show 'text' in its contents.
 * **** The help window will disappear if no text is displayed.
 * ** New Plugin Commands added by Arisu:
 * *** Select: Weapon
 * *** Select: Armor
 * *** Select: Skill
 * **** Opens the Event Select Item Window to let the player pick a weapon,
 *      armor, or skill to choose from. The selected object will have its ID
 *      recorded in a variable. These can be opened while the Message Window is
 *      opened just like the event "Select Item".
 * 
 * Version 1.41: December 15, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New text codes added by Irina!
 * *** For the Choice Window Only text codes:
 * **** <BgColor: x>
 * **** <BgColor: x, y>
 * **** <BgColor: #rrggbb>
 * **** <BgColor: #rrggbb, #rrggbb>
 * ***** Requires VisuMZ_0_CoreEngine! Sets the background color of this choice
 *       to 'x' text color, 'x' to 'y' gradient text color, or using '#rrggbb'
 *       hex color values.
 * 
 * Version 1.40: November 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New text code added by Irina:
 * *** <RNG> text1 | text2 | text3 </RNG>
 * **** Using the above text code format in a Show Message entry, you can get a
 *      random result out of the various inserted texts. Use "|" (without
 *      quotes) as a separator between text entries. You can have unlimited
 *      entries. The result will have any excess white space trimmed.
 * **** This text code cannot be inserted into a macro and parsed properly.
 * 
 * Version 1.39: September 22, 2022
 * * Bug Fixes!
 * ** Macros now support quotes (' and ") in the STR: Text. Fix made by Irina.
 * 
 * Version 1.38: July 21, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.37: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Picture texts with \v[x] text codes are now updated automatically.
 * ** This is the only dynamic text code that updates this way for optimization
 *    purposes and to prevent overabundant CPU usage.
 * ** Everything else will require the new Plugin Command.
 * * New Features!
 * ** New Plugin Command added by Irina:
 * *** Picture: Refresh Text
 * **** Refreshes the text used for all on-screen pictures.
 * **** To be used if any dynamic text codes are updated like \n[x].
 * * New Features!
 * ** New text codes added by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** <Up Button>, <Left Button>, <Right Button>, <Down Button>
 * *** <Ok Button>, <Cancel Button>, <Shift Button>, <Menu Button>
 * *** <Page Up Button>, <Page Down Button>
 * **** Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * Version 1.36: April 7, 2022
 * * Feature Update!
 * ** Auto size related text codes should now automatically disable word wrap
 *    effects as they should have before. Update made by Irina.
 * 
 * Version 1.35: March 31, 2022
 * * Bug Fixes!
 * ** Bug fixed where if autosizing is used and it goes from a message that is
 *    shorter to longer, an extra key press is needed. This should no longer be
 *    the case. Fix made by Irina.
 * 
 * Version 1.34: February 24, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Choice Window Text Codes made by Irina and sponsored by AndyL:
 * *** <Choice Width: x>
 * **** Sets the minimum text area width to x. Applies to whole choice window.
 * *** <Choice Indent: x>
 * **** Sets the indent to x value. Applies to current choice selection only.
 * 
 * Version 1.33: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Picture: Change Text
 * **** This new plugin command allows you to place text on top of pictures
 *      (usually in the form of empty pages or cards) to function as stationary
 *      or other uses. Text codes are allowed.
 * **** Text codes are supported.
 * *** Picture: Erase Text
 * **** Removes text from target picture(s).
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Extra Show Choice notetags will now be properly hidden. Fix by Irina.
 * * Compatibility Update!
 * ** Self Switches are now made compatible with work with Show Choices. Update
 *    made by Irina.
 * 
 * Version 1.31: December 9, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New hard-coded message-only text code added by Irina:
 * *** <Next Page>
 * **** Ends the current message page at this line. This is used for messages
 *      when rows are at 5 or above and the message lines don't match the
 *      amount. This is used to prevent grabbing message windows from following
 *      message events. Any lines following <Next Page> in the same message
 *      event will be ignored.
 * 
 * Version 1.30: November 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for removed "Center Window X" bit.
 * * Feature Update!
 * ** Message: Properties now has "Center Window X?" removed
 * *** Changes will now be automatically centered.
 * *** This change is made for the new Plugin Command added for offsets which
 *     more or less replaces them.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Puddor:
 * *** Message: X/Y Offsets
 * **** Change the X and Y Offsets of the Message Window.
 * **** The offset value(s) will be saved and stored.
 * ** New Plugin Parameters added by Irina and sponsored by Puddor:
 * *** Plugin Parameters > General Settings > Message Window > Offset X
 * *** Plugin Parameters > General Settings > Message Window > Offset Y
 * **** Allows you to offset the horizontal and/or vertical positions of the
 *      message window accordingly.
 * ** New Text Codes added by Irina and sponsored by Puddor:
 * *** <Offset: +x, +y>
 * *** <Offset: -x, -y>
 * *** <Offset: +x, -y>
 * *** <Offset: -x, +y>
 * **** Quickly adjust the message window offset values to the x and y amounts.
 *      The values will replace the previous offset settings if there were any.
 * 
 * Version 1.29: October 21, 2021
 * * Feature Update
 * ** Word Wrap flags are now properly adjusted when converting macros and
 *    adding bypasses towards regular messages. Update by Irina.
 * 
 * Version 1.28: October 14, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.27: October 7, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** Macros should now work properly with any \x<n> based text codes.
 *    Fix made by Irina.
 * 
 * Version 1.25: August 27, 2021
 * * Feature Update!
 * ** Macros should now work with the <WordWrap> text code. Update by Irina.
 * 
 * Version 1.24: August 20, 2021
 * * Feature Update!
 * ** Macros should now work with window placement and resize options.
 *    Update made by Irina.
 * ** Macros should now work with choice-related enable and visibility options.
 *    Update made by Irina.
 * 
 * Version 1.23: July 16, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Word Wrap Settings > End Padding
 * **** Add extra padding to your window to make text wrap further away from
 *      the end of the window. This will default to 0.
 * 
 * Version 1.22: July 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Text Codes added by Irina and sponsored by AndyL:
 * *** <Current Battle Target>
 * *** <Current Battle User>
 * **** Replaces the text code with the current target or current user's name
 *      in-battle. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * *** <Current Battle Action>
 * *** <Current Battle Action Name>
 * **** Replaces the text code with the current battle action's name with the
 *      icon or without it respectively. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * 
 * Version 1.21: June 4, 2021
 * * Documentation Update!
 * ** Added extra note to the new <Position: x, y, width, height> text codes
 *    that they do not work with Word Wrap.
 * * Feature Update!
 * ** Added fail safe for preventing Common Events that don't exist from being
 *    ran at all by the Message Window. Added by Arisu.
 * 
 * Version 1.20: May 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added additional clarity for \WindowMoveTo<?> and \WindowMoveBy<?> and
 *    \WindowReset text codes with "Note 2".
 * *** Replace '?' with the following format: targetX, targetY, targetWidth,
 *     targetHeight, duration, easingType. Only targetX and targetY are
 *     required arguments. These will only alter the window dimensions when the
 *     text has arrived at that point. They will not alter the window
 *     preemptively. This is not used as a window positioner. Use the
 *     <Position: x, y, width, height> text code for that.
 * * New Features!
 * ** New hard-coded text codes added for Message Window Only. Added by Irina.
 * *** <Position: x, y, width, height>
 * *** <Coordinates: x, y>
 * *** <Dimensions: width, height>
 * 
 * Version 1.19: May 14, 2021
 * * Feature Updates!
 * ** <br> line breaks can now be used by Show Choices. Make sure that there is
 *    enough room to contain the text through Plugin Commands. Update by Irina.
 * 
 * Version 1.18: April 30, 2021
 * * Bug Fixes!
 * ** Moving windows with 0 duration via text code should now instantly move
 *    the windows to the desired location with no delay. Fix made by Olivia.
 * 
 * Version 1.17: April 9, 2021
 * * Feature Update!
 * ** <Auto> text codes for message windows will round up calculations for the
 *    message width to the nearest even number for better calculations.
 * 
 * Version 1.16: April 2, 2021
 * * Bug Fixes!
 * ** \CommonEvent[x] text code will no longer run upon message window size
 *    calculation. Fix made by Arisu.
 * * Documentation Update!
 * ** Added further clarification for "Text Macros" section.
 * *** This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 *     Use the method stated before with the brackets to [MacroName] instead.
 * 
 * Version 1.15: March 5, 2021
 * * Bug Fixes!
 * ** Hidden choices by switches will no longer count towards the maximum line
 *    count for Show Choice options. Fix made by Irina.
 * 
 * Version 1.14: February 12, 2021
 * * Bug Fixes!
 * ** Auto positioned messages in battle will no longer cover the battler in
 *    question. Fix made by Irina.
 * 
 * Version 1.13: February 5, 2021
 * * Bug Fixes!
 * ** Choice List Window with a dimmed background should now have a more
 *    consistent sized dim sprite. Fix made by Irina.
 * 
 * Version 1.12: January 22, 2021
 * * Feature Update!
 * ** Name Box Window Default Color is now disabled by default to 0 because
 *    users do not understand why their names are showing up yellow and did not
 *    bother reading the documentation. If users want this feature turned on,
 *    they will have to do it manually from now on. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 8, 2021
 * * Bug Fixes!
 * ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Auto Color Plugin Parameters now have their default settings set to 0.
 *    This is due to an influx of "bug reports" from users who do not
 *    understand how this feature works, and the VisuStella team has decided it
 *    is better for the feature to default to an inactive state until users
 *    decide to search and utilize it themselves. Update made by Irina.
 * 
 * Version 1.09: January 1, 2021
 * * Feature Update!
 * ** Auto-color no longer applies to database names that are only numbers.
 *    Auto-color entries that are only numbers will also be ignored. This is to
 *    prevent breaking the text code parsing. Update made by Yanfly.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 * 
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
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
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowXyOffsets
 * @text Message: X/Y Offsets
 * @desc Change the X and Y Offsets of the Message Window.
 * The offset value(s) will be saved and stored.
 *
 * @arg OffsetX:eval
 * @text Offset X
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Choice
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowDistance
 * @text Choices: Distance
 * @desc Change the distance from choice window to the message window.
 *
 * @arg Distance:eval
 * @text Distance
 * @desc Change distance between the choice and message windows.
 * Default distance is 0. Use negative to center align.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Choice Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MinWidth:num
 * @text Minimum Choice Width
 * @type number
 * @min 0
 * @desc What is the minimum width size for each choice?
 * 96 is the default width.
 * @default 96
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Select
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectWeapon
 * @text Select: Weapon
 * @desc Opens the Event Select Item Window to let the player
 * pick a weapon to choose from.
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected weapon. It will result in 0 otherwise.
 * @default 1
 *
 * @arg WeaponTypeID:num
 * @text Weapon Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the weapons to a specific weapon type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectArmor
 * @text Select: Armor
 * @desc Opens the Event Select Item Window to let the player
 * pick an armor to choose from.
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected armor. It will result in 0 otherwise.
 * @default 1
 *
 * @arg ArmorTypeID:num
 * @text Armor Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the armors to a specific armor type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @arg EquipTypeID:num
 * @text Equip Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the armors to a specific equip type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectSkill
 * @text Select: Skill
 * @desc Opens the Event Select Item Window to let the player
 * pick a skill to choose from. Requires VisuMZ_1_SkillsStatesCore!
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected skill. It will result in 0 otherwise.
 * @default 1
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select an actor to get the skill list from.
 * Use 0 to select from the party leader.
 * @default 0
 *
 * @arg SkillTypeID:num
 * @text Skill Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the skills to a specific skill type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextChange
 * @text Picture: Change Text
 * @desc Change text for target picture(s) to show.
 * You may use text codes.
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID(s) of the picture(s) to set text to.
 * @default ["1"]
 *
 * @arg Padding:eval
 * @text Padding
 * @parent PictureIDs:arraynum
 * @desc How much padding from the sides should there be?
 * @default $gameSystem.windowPadding()
 * 
 * @arg Text
 *
 * @arg upperleft:json
 * @text Upper Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg up:json
 * @text Upper Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg upperright:json
 * @text Upper Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg left:json
 * @text Middle Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg center:json
 * @text Middle Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg right:json
 * @text Middle Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerleft:json
 * @text Lower Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg down:json
 * @text Lower Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerright:json
 * @text Lower Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextErase
 * @text Picture: Erase Text
 * @desc Erase all text for target picture(s).
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID(s) of the picture(s) to erase text for.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextRefresh
 * @text Picture: Refresh Text
 * @desc Refreshes the text used for all on-screen pictures.
 * To be used if any dynamic text codes are updated like \n[x].
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
 * @param MessageCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param CustomFonts:arraystruct
 * @text Custom Font Manager
 * @type struct<CustomFont>[]
 * @desc Register custom fonts here. Custom fonts that aren't the
 * message or number fonts cannot be used without this.
 * @default []
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (this instanceof Window_Message) {\\\\n    if (textState.drawing) {\\\\n        const filename = data[0].trim();\\\\n        const index = parseInt(data[1] || '0');\\\\n        $gameMessage.setFaceImage(filename, index);\\\\n        this.loadMessageFace();\\\\n        const rtl = $gameMessage.isRTL();\\\\n        const width = ImageManager.faceWidth;\\\\n        const height = this.innerHeight;\\\\n        const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n        this.contents.clearRect(x, 0, width, height);\\\\n        this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n    }\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (this instanceof Window_Message) {\\\\n    if (textState.drawing) {\\\\n        const filename = $gameMessage.faceName();\\\\n        $gameMessage.setFaceImage(filename, index);\\\\n        this.loadMessageFace();\\\\n        const rtl = $gameMessage.isRTL();\\\\n        const width = ImageManager.faceWidth;\\\\n        const height = this.innerHeight;\\\\n        const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n        this.contents.clearRect(x, 0, width, height);\\\\n        this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n    }\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (this instanceof Window_Message) {\\\\n    if (textState.drawing && this.constructor === Window_Message) {\\\\n        this.setTextDelay(delay);\\\\n    }\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"heart\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"3\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjIcon\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectIcon();\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Code Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * Format style: [MacroName]
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param Localization:struct
 * @text Text Language Settings
 * @type struct<Localization>
 * @desc Text Language settings for this plugin.
 * @default {"Main":"","Enable:eval":"false","CsvFilename:str":"Languages.csv","Options":"","AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Language","Localized":"","DefaultLocale:str":"English","Languages:arraystr":"[\"Bengali\",\"Chinese(Simplified)\",\"Chinese(Traditional)\",\"Czech\",\"Danish\",\"Dutch\",\"English\",\"Finnish\",\"French\",\"German\",\"Greek\",\"Hindi\",\"Hungarian\",\"Indonesian\",\"Italian\",\"Japanese\",\"Korean\",\"Norwegian\",\"Polish\",\"Portuguese\",\"Romanian\",\"Russian\",\"Slovak\",\"Spanish\",\"Swedish\",\"Tamil\",\"Thai\",\"Turkish\"]","LangNames":"","Bengali:str":"বাংলা","Chinese(Simplified):str":"简体中文","Chinese(Traditional):str":"繁體中文","Czech:str":"Čeština","Danish:str":"Dansk","Dutch:str":"Nederlands","English:str":"English","Finnish:str":"Suomi","French:str":"Français","German:str":"Deutsch","Greek:str":"Ελληνικά","Hindi:str":"हिन्दी","Hungarian:str":"Magyar","Indonesian:str":"Bahasa Indo","Italian:str":"Italiano","Japanese:str":"日本語","Korean:str":"한국어","Norwegian:str":"Norsk","Polish:str":"Polski","Portuguese:str":"Português","Romanian:str":"Română","Russian:str":"Русский","Slovak:str":"Slovenčina","Spanish:str":"Español","Swedish:str":"Svenska","Tamil:str":"தமிழ்","Thai:str":"ไทย","Turkish:str":"Türkçe"}
 *
 * @param LanguageFonts:struct
 * @text Language Fonts
 * @parent Localization:struct
 * @type struct<LanguageFonts>
 * @desc Different default fonts used for different languages.
 * Players can override this with Options Core.
 * @default {"Bengali:str":"rmmz-mainfont","Chinese(Simplified):str":"rmmz-mainfont","Chinese(Traditional):str":"rmmz-mainfont","Czech:str":"rmmz-mainfont","Danish:str":"rmmz-mainfont","Dutch:str":"rmmz-mainfont","English:str":"rmmz-mainfont","Finnish:str":"rmmz-mainfont","French:str":"rmmz-mainfont","German:str":"rmmz-mainfont","Greek:str":"rmmz-mainfont","Hindi:str":"rmmz-mainfont","Hungarian:str":"rmmz-mainfont","Indonesian:str":"rmmz-mainfont","Italian:str":"rmmz-mainfont","Japanese:str":"rmmz-mainfont","Korean:str":"rmmz-mainfont","Norwegian:str":"rmmz-mainfont","Polish:str":"rmmz-mainfont","Portuguese:str":"rmmz-mainfont","Romanian:str":"rmmz-mainfont","Russian:str":"rmmz-mainfont","Slovak:str":"rmmz-mainfont","Spanish:str":"rmmz-mainfont","Swedish:str":"rmmz-mainfont","Tamil:str":"rmmz-mainfont","Thai:str":"rmmz-mainfont","Turkish:str":"rmmz-mainfont"}
 *
 * @param LanguageImages:struct
 * @text Language Images
 * @parent Localization:struct
 * @type struct<LanguageImages>
 * @desc Allows different images to be used when different
 * languages are used. See help for more information.
 * @default {"ConvertDefault:eval":"false","Languages":"","Bengali:str":"[XX]","Chinese(Simplified):str":"[XX]","Chinese(Traditional):str":"[XX]","Czech:str":"[XX]","Danish:str":"[XX]","Dutch:str":"[XX]","English:str":"[XX]","Finnish:str":"[XX]","French:str":"[XX]","German:str":"[XX]","Greek:str":"[XX]","Hindi:str":"[XX]","Hungarian:str":"[XX]","Indonesian:str":"[XX]","Italian:str":"[XX]","Japanese:str":"[XX]","Korean:str":"[XX]","Norwegian:str":"[XX]","Polish:str":"[XX]","Portuguese:str":"[XX]","Romanian:str":"[XX]","Russian:str":"[XX]","Slovak:str":"[XX]","Spanish:str":"[XX]","Swedish:str":"[XX]","Tamil:str":"[XX]","Thai:str":"[XX]","Turkish:str":"[XX]"}
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false","EndPadding:num":"0"}
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
/*~struct~General:
 *
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param MsgWindowOffsetX:num
 * @text Offset X
 * @parent MessageWindow
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @param MsgWindowOffsetY:num
 * @text Offset Y
 * @parent MessageWindow
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param EachMessageStart:json
 * @text Each Message Start
 * @parent MessageWindow
 * @type note
 * @desc This is text that is added at the start of each message.
 * You may use text codes.
 * @default ""
 *
 * @param EachMessageEnd:json
 * @text Each Message End
 * @parent MessageWindow
 * @type note
 * @desc This is text that is added at the end of each message.
 * You may use text codes.
 * @default ""
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 0
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMinWidth:num
 * @text Minimum Choice Width
 * @parent ChoiceListWindow
 * @type number
 * @min 0
 * @desc What is the minimum choice width for each choice?
 * 96 is the default width.
 * @default 96
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default rmmz-mainfont
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Font Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomFont:
 *
 * @param FontFamily:str
 * @text Font Family
 * @desc This will be what's used by RPG Maker MZ and plugins to
 * reference this specific font. NO filename extensions!
 * @default Unnamed
 *
 * @param Filename:str
 * @text Filename
 * @desc What is the filename of the font you would like to use?
 * Located inside the project's "fonts" folder.
 * @default Unnamed.ttf
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Localization Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Localization:
 *
 * @param Main
 * @text Main Settings
 *
 * @param Enable:eval
 * @text Enable Switching?
 * @parent Main
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Enable language switching settings for this plugin?
 * @default false
 *
 * @param CsvFilename:str
 * @text CSV Filename
 * @parent Main
 * @desc What is the filename of the CSV file to read from?
 * Located within the project's /data/ folder.
 * @default Languages.csv
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
 * @desc Add the 'Language' option to the Options menu?
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
 * @default Text Language
 *
 * @param Localized
 * @text Languages
 *
 * @param DefaultLocale:str
 * @text Default Language
 * @parent Localized
 * @type select
 * @option Bengali
 * @option Chinese(Simplified)
 * @option Chinese(Traditional)
 * @option Czech
 * @option Danish
 * @option Dutch
 * @option English
 * @option Finnish
 * @option French
 * @option German
 * @option Greek
 * @option Hindi
 * @option Hungarian
 * @option Indonesian
 * @option Italian
 * @option Japanese
 * @option Korean
 * @option Norwegian
 * @option Polish
 * @option Portuguese
 * @option Romanian
 * @option Russian
 * @option Slovak
 * @option Spanish
 * @option Swedish
 * @option Tamil
 * @option Thai
 * @option Turkish
 * @desc What is the default language used for this game?
 * @default English
 *
 * @param Languages:arraystr
 * @text Supported Languages
 * @parent Localized
 * @type select[]
 * @option Bengali
 * @option Chinese(Simplified)
 * @option Chinese(Traditional)
 * @option Czech
 * @option Danish
 * @option Dutch
 * @option English
 * @option Finnish
 * @option French
 * @option German
 * @option Greek
 * @option Hindi
 * @option Hungarian
 * @option Indonesian
 * @option Italian
 * @option Japanese
 * @option Korean
 * @option Norwegian
 * @option Polish
 * @option Portuguese
 * @option Romanian
 * @option Russian
 * @option Slovak
 * @option Spanish
 * @option Swedish
 * @option Tamil
 * @option Thai
 * @option Turkish
 * @desc What are all the supported languages supported by this
 * game's script? Remove any that aren't translated.
 * @default ["Bengali","Chinese(Simplified)","Chinese(Traditional)","Czech","Danish","Dutch","English","Finnish","French","German","Greek","Hindi","Hungarian","Indonesian","Italian","Japanese","Korean","Norwegian","Polish","Portuguese","Romanian","Russian","Slovak","Spanish","Swedish","Tamil","Thai","Turkish"]
 *
 * @param LangNames
 * @text Language Names
 *
 * @param Bengali:str
 * @text Bengali
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default বাংলা
 * 
 * @param Chinese(Simplified):str
 * @text Chinese (Simplified)
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 简体中文
 * 
 * @param Chinese(Traditional):str
 * @text Chinese (Traditional)
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 繁體中文
 * 
 * @param Czech:str
 * @text Czech
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Čeština
 * 
 * @param Danish:str
 * @text Danish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Dansk
 * 
 * @param Dutch:str
 * @text Dutch
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Nederlands
 * 
 * @param English:str
 * @text English
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default English
 * 
 * @param Finnish:str
 * @text Finnish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Suomi
 * 
 * @param French:str
 * @text French
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Français
 * 
 * @param German:str
 * @text German
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Deutsch
 * 
 * @param Greek:str
 * @text Greek
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Ελληνικά
 * 
 * @param Hindi:str
 * @text Hindi
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default हिन्दी
 * 
 * @param Hungarian:str
 * @text Hungarian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Magyar
 * 
 * @param Indonesian:str
 * @text Indonesian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Bahasa Indo
 * 
 * @param Italian:str
 * @text Italian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Italiano
 * 
 * @param Japanese:str
 * @text Japanese
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 日本語
 * 
 * @param Korean:str
 * @text Korean
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 한국어
 * 
 * @param Norwegian:str
 * @text Norwegian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Norsk
 * 
 * @param Polish:str
 * @text Polish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Polski
 * 
 * @param Portuguese:str
 * @text Portuguese
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Português
 * 
 * @param Romanian:str
 * @text Romanian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Română
 * 
 * @param Russian:str
 * @text Russian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Русский
 * 
 * @param Slovak:str
 * @text Slovak
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Slovenčina
 * 
 * @param Spanish:str
 * @text Spanish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Español
 * 
 * @param Swedish:str
 * @text Swedish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Svenska
 * 
 * @param Tamil:str
 * @text Tamil
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default தமிழ்
 * 
 * @param Thai:str
 * @text Thai
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default ไทย
 * 
 * @param Turkish:str
 * @text Turkish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Türkçe
 *
 */
/* ----------------------------------------------------------------------------
 * Language Fonts Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LanguageFonts:
 *
 * @param Bengali:str
 * @text Bengali
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Chinese(Simplified):str
 * @text Chinese (Simplified)
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Chinese(Traditional):str
 * @text Chinese (Traditional)
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Czech:str
 * @text Czech
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Danish:str
 * @text Danish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Dutch:str
 * @text Dutch
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param English:str
 * @text English
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Finnish:str
 * @text Finnish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param French:str
 * @text French
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param German:str
 * @text German
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Greek:str
 * @text Greek
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Hindi:str
 * @text Hindi
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Hungarian:str
 * @text Hungarian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Indonesian:str
 * @text Indonesian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Italian:str
 * @text Italian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Japanese:str
 * @text Japanese
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Korean:str
 * @text Korean
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Norwegian:str
 * @text Norwegian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Polish:str
 * @text Polish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Portuguese:str
 * @text Portuguese
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Romanian:str
 * @text Romanian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Russian:str
 * @text Russian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Slovak:str
 * @text Slovak
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Spanish:str
 * @text Spanish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Swedish:str
 * @text Swedish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Tamil:str
 * @text Tamil
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Thai:str
 * @text Thai
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Turkish:str
 * @text Turkish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 *
 */
/* ----------------------------------------------------------------------------
 * Language Images Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LanguageImages:
 *
 * @param ConvertDefault:eval
 * @text Convert Default?
 * @type boolean
 * @on Convert
 * @off Don't
 * @desc ON: Default language uses converted marker.
 * OFF: Default languages uses [XX] as marker.
 * @default false
 *
 * @param Languages
 * @text Languages
 *
 * @param Bengali:str
 * @text Bengali
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Chinese(Simplified):str
 * @text Chinese (Simplified)
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Chinese(Traditional):str
 * @text Chinese (Traditional)
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Czech:str
 * @text Czech
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Danish:str
 * @text Danish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Dutch:str
 * @text Dutch
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param English:str
 * @text English
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Finnish:str
 * @text Finnish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param French:str
 * @text French
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param German:str
 * @text German
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Greek:str
 * @text Greek
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Hindi:str
 * @text Hindi
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Hungarian:str
 * @text Hungarian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Indonesian:str
 * @text Indonesian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Italian:str
 * @text Italian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Japanese:str
 * @text Japanese
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Korean:str
 * @text Korean
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Norwegian:str
 * @text Norwegian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Polish:str
 * @text Polish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Portuguese:str
 * @text Portuguese
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Romanian:str
 * @text Romanian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Russian:str
 * @text Russian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Slovak:str
 * @text Slovak
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Spanish:str
 * @text Spanish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Swedish:str
 * @text Swedish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Tamil:str
 * @text Tamil
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Thai:str
 * @text Thai
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Turkish:str
 * @text Turkish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 * @param EndPadding:num
 * @text End Padding
 * @parent Rules
 * @type number
 * @desc Add extra padding to your window to make text wrap further away from the end of the window.
 * @default 0
 *
 */
//=============================================================================

function _0x3be8(_0x28e9c4,_0x27caa1){const _0x2bcdc7=_0x2bcd();return _0x3be8=function(_0x3be864,_0x4fe38a){_0x3be864=_0x3be864-0x1b2;let _0x1b3b8d=_0x2bcdc7[_0x3be864];return _0x1b3b8d;},_0x3be8(_0x28e9c4,_0x27caa1);}const _0x44fc42=_0x3be8;(function(_0x14ea64,_0x18f02e){const _0x5b38c9=_0x3be8,_0x475e4f=_0x14ea64();while(!![]){try{const _0x559fb5=-parseInt(_0x5b38c9(0x457))/0x1*(parseInt(_0x5b38c9(0x414))/0x2)+parseInt(_0x5b38c9(0x335))/0x3*(-parseInt(_0x5b38c9(0x57f))/0x4)+-parseInt(_0x5b38c9(0x542))/0x5+-parseInt(_0x5b38c9(0x502))/0x6+parseInt(_0x5b38c9(0x3ef))/0x7*(parseInt(_0x5b38c9(0x23c))/0x8)+parseInt(_0x5b38c9(0x34f))/0x9*(-parseInt(_0x5b38c9(0x1d7))/0xa)+parseInt(_0x5b38c9(0x1f7))/0xb*(parseInt(_0x5b38c9(0x269))/0xc);if(_0x559fb5===_0x18f02e)break;else _0x475e4f['push'](_0x475e4f['shift']());}catch(_0x4e6526){_0x475e4f['push'](_0x475e4f['shift']());}}}(_0x2bcd,0xd9e43));var label=_0x44fc42(0x4cc),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x44fc42(0x2be)](function(_0x19c6c1){const _0x19dc54=_0x44fc42;return _0x19c6c1[_0x19dc54(0x4bc)]&&_0x19c6c1['description']['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x44fc42(0x416)]||{},VisuMZ[_0x44fc42(0x2e1)]=function(_0x29be6c,_0x405e11){const _0x5865a3=_0x44fc42;for(const _0x34da71 in _0x405e11){if(_0x34da71[_0x5865a3(0x523)](/(.*):(.*)/i)){const _0x453d5f=String(RegExp['$1']),_0x406523=String(RegExp['$2'])[_0x5865a3(0x3bb)]()[_0x5865a3(0x504)]();let _0x541818,_0x4c5a22,_0x1f93cd;switch(_0x406523){case _0x5865a3(0x412):_0x541818=_0x405e11[_0x34da71]!==''?Number(_0x405e11[_0x34da71]):0x0;break;case _0x5865a3(0x45a):_0x4c5a22=_0x405e11[_0x34da71]!==''?JSON[_0x5865a3(0x322)](_0x405e11[_0x34da71]):[],_0x541818=_0x4c5a22['map'](_0x12d132=>Number(_0x12d132));break;case'EVAL':_0x541818=_0x405e11[_0x34da71]!==''?eval(_0x405e11[_0x34da71]):null;break;case _0x5865a3(0x374):_0x4c5a22=_0x405e11[_0x34da71]!==''?JSON[_0x5865a3(0x322)](_0x405e11[_0x34da71]):[],_0x541818=_0x4c5a22[_0x5865a3(0x44d)](_0xca8484=>eval(_0xca8484));break;case _0x5865a3(0x1d9):_0x541818=_0x405e11[_0x34da71]!==''?JSON[_0x5865a3(0x322)](_0x405e11[_0x34da71]):'';break;case _0x5865a3(0x27b):_0x4c5a22=_0x405e11[_0x34da71]!==''?JSON[_0x5865a3(0x322)](_0x405e11[_0x34da71]):[],_0x541818=_0x4c5a22[_0x5865a3(0x44d)](_0x5441ad=>JSON[_0x5865a3(0x322)](_0x5441ad));break;case _0x5865a3(0x390):_0x541818=_0x405e11[_0x34da71]!==''?new Function(JSON['parse'](_0x405e11[_0x34da71])):new Function(_0x5865a3(0x47e));break;case _0x5865a3(0x2d4):_0x4c5a22=_0x405e11[_0x34da71]!==''?JSON[_0x5865a3(0x322)](_0x405e11[_0x34da71]):[],_0x541818=_0x4c5a22[_0x5865a3(0x44d)](_0x2b6f22=>new Function(JSON[_0x5865a3(0x322)](_0x2b6f22)));break;case _0x5865a3(0x3eb):_0x541818=_0x405e11[_0x34da71]!==''?String(_0x405e11[_0x34da71]):'';break;case _0x5865a3(0x531):_0x4c5a22=_0x405e11[_0x34da71]!==''?JSON['parse'](_0x405e11[_0x34da71]):[],_0x541818=_0x4c5a22[_0x5865a3(0x44d)](_0x83cdf7=>String(_0x83cdf7));break;case _0x5865a3(0x206):_0x1f93cd=_0x405e11[_0x34da71]!==''?JSON['parse'](_0x405e11[_0x34da71]):{},_0x29be6c[_0x453d5f]={},VisuMZ['ConvertParams'](_0x29be6c[_0x453d5f],_0x1f93cd);continue;case'ARRAYSTRUCT':_0x4c5a22=_0x405e11[_0x34da71]!==''?JSON[_0x5865a3(0x322)](_0x405e11[_0x34da71]):[],_0x541818=_0x4c5a22[_0x5865a3(0x44d)](_0x5bfb31=>VisuMZ['ConvertParams']({},JSON[_0x5865a3(0x322)](_0x5bfb31)));break;default:continue;}_0x29be6c[_0x453d5f]=_0x541818;}}return _0x29be6c;},(_0x4fbab5=>{const _0xf0ff96=_0x44fc42,_0x11b3e8=_0x4fbab5[_0xf0ff96(0x247)];for(const _0x540517 of dependencies){if(!Imported[_0x540517]){alert(_0xf0ff96(0x30d)[_0xf0ff96(0x20d)](_0x11b3e8,_0x540517)),SceneManager['exit']();break;}}const _0x1bd39c=_0x4fbab5[_0xf0ff96(0x350)];if(_0x1bd39c['match'](/\[Version[ ](.*?)\]/i)){const _0x166e46=Number(RegExp['$1']);_0x166e46!==VisuMZ[label][_0xf0ff96(0x40e)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x11b3e8,_0x166e46)),SceneManager[_0xf0ff96(0x279)]());}if(_0x1bd39c[_0xf0ff96(0x523)](/\[Tier[ ](\d+)\]/i)){const _0x5507b6=Number(RegExp['$1']);_0x5507b6<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x11b3e8,_0x5507b6,tier)),SceneManager[_0xf0ff96(0x279)]()):tier=Math[_0xf0ff96(0x267)](_0x5507b6,tier);}VisuMZ[_0xf0ff96(0x2e1)](VisuMZ[label][_0xf0ff96(0x416)],_0x4fbab5[_0xf0ff96(0x464)]);})(pluginData),PluginManager[_0x44fc42(0x265)](pluginData[_0x44fc42(0x247)],_0x44fc42(0x318),_0x197d28=>{const _0x109bec=_0x44fc42;VisuMZ[_0x109bec(0x2e1)](_0x197d28,_0x197d28);const _0x337ce1=Number(_0x197d28[_0x109bec(0x4d8)])||0x0;$gameSystem[_0x109bec(0x260)](_0x337ce1);}),PluginManager[_0x44fc42(0x265)](pluginData[_0x44fc42(0x247)],_0x44fc42(0x3c5),_0x2770bd=>{const _0x4e9dd0=_0x44fc42;VisuMZ[_0x4e9dd0(0x2e1)](_0x2770bd,_0x2770bd);const _0x719e61=_0x2770bd[_0x4e9dd0(0x456)]||$gameSystem[_0x4e9dd0(0x359)]()||0x1,_0x1e58c0=_0x2770bd[_0x4e9dd0(0x2f0)]??0x60,_0x5e2c4d=_0x2770bd[_0x4e9dd0(0x33e)]||$gameSystem[_0x4e9dd0(0x3a5)]()||0x1,_0x3df837=_0x2770bd[_0x4e9dd0(0x308)]||$gameSystem['getChoiceListMaxColumns']()||0x1,_0x11338b=_0x2770bd[_0x4e9dd0(0x2ae)][_0x4e9dd0(0x4cf)]()||_0x4e9dd0(0x2c2);$gameSystem[_0x4e9dd0(0x2e6)](_0x719e61),$gameSystem[_0x4e9dd0(0x2b2)](_0x1e58c0),$gameSystem[_0x4e9dd0(0x550)](_0x5e2c4d),$gameSystem['setChoiceListMaxColumns'](_0x3df837),$gameSystem['setChoiceListTextAlign'](_0x11338b);}),PluginManager[_0x44fc42(0x265)](pluginData[_0x44fc42(0x247)],_0x44fc42(0x3b3),_0x548526=>{const _0x52e79f=_0x44fc42;VisuMZ['ConvertParams'](_0x548526,_0x548526);const _0x1fe366=_0x548526['Rows']||$gameSystem[_0x52e79f(0x493)]()||0x1,_0x190f0e=_0x548526[_0x52e79f(0x437)]||$gameSystem[_0x52e79f(0x3d6)]()||0x1;$gameTemp[_0x52e79f(0x444)]=!![];const _0x3c557d=_0x548526[_0x52e79f(0x54a)]['toLowerCase']();$gameSystem[_0x52e79f(0x4a2)](_0x1fe366),$gameSystem['setMessageWindowWidth'](_0x190f0e);['true',_0x52e79f(0x220)][_0x52e79f(0x4f0)](_0x3c557d)&&$gameSystem[_0x52e79f(0x4a1)](eval(_0x3c557d));const _0xc877c5=SceneManager['_scene'][_0x52e79f(0x39a)];_0xc877c5&&(_0xc877c5['resetWordWrap'](),_0xc877c5[_0x52e79f(0x3a4)](),_0xc877c5[_0x52e79f(0x569)]());}),PluginManager[_0x44fc42(0x265)](pluginData[_0x44fc42(0x247)],_0x44fc42(0x551),_0x1fc90e=>{const _0x554ef1=_0x44fc42;VisuMZ[_0x554ef1(0x2e1)](_0x1fc90e,_0x1fc90e),$gameSystem[_0x554ef1(0x491)](_0x1fc90e[_0x554ef1(0x411)],_0x1fc90e[_0x554ef1(0x26d)]);const _0x56d63e=SceneManager[_0x554ef1(0x52f)][_0x554ef1(0x39a)];_0x56d63e&&(_0x56d63e[_0x554ef1(0x4a4)](),_0x56d63e['updateDimensions'](),_0x56d63e['createContents']());}),PluginManager[_0x44fc42(0x265)](pluginData[_0x44fc42(0x247)],_0x44fc42(0x30b),_0x3b22ad=>{const _0x16116a=_0x44fc42;VisuMZ[_0x16116a(0x2e1)](_0x3b22ad,_0x3b22ad),$gameMessage[_0x16116a(0x3cb)](_0x3b22ad[_0x16116a(0x37b)]||0x0,_0x3b22ad[_0x16116a(0x259)]||0x0);const _0x217685=$gameTemp[_0x16116a(0x512)]();if(_0x217685)_0x217685[_0x16116a(0x497)]('message');}),PluginManager['registerCommand'](pluginData[_0x44fc42(0x247)],_0x44fc42(0x3ac),_0x1fee17=>{const _0x2bee03=_0x44fc42;VisuMZ['ConvertParams'](_0x1fee17,_0x1fee17),$gameMessage['setArmorChoice'](_0x1fee17[_0x2bee03(0x37b)]||0x0,_0x1fee17['ArmorTypeID']||0x0,_0x1fee17[_0x2bee03(0x3f9)]||0x0);const _0x578f42=$gameTemp[_0x2bee03(0x512)]();if(_0x578f42)_0x578f42[_0x2bee03(0x497)](_0x2bee03(0x32c));}),PluginManager[_0x44fc42(0x265)](pluginData[_0x44fc42(0x247)],_0x44fc42(0x28b),_0x4ad420=>{const _0x1922d7=_0x44fc42;VisuMZ[_0x1922d7(0x2e1)](_0x4ad420,_0x4ad420),$gameMessage[_0x1922d7(0x4c4)](_0x4ad420[_0x1922d7(0x37b)]||0x0,_0x4ad420[_0x1922d7(0x1e2)]||0x0,_0x4ad420[_0x1922d7(0x50f)]||0x0);const _0x1a0278=$gameTemp[_0x1922d7(0x512)]();if(_0x1a0278)_0x1a0278[_0x1922d7(0x497)](_0x1922d7(0x32c));}),PluginManager['registerCommand'](pluginData[_0x44fc42(0x247)],_0x44fc42(0x273),_0x10c31c=>{const _0x1e8e42=_0x44fc42;VisuMZ[_0x1e8e42(0x2e1)](_0x10c31c,_0x10c31c);const _0x1c8d65=_0x10c31c[_0x1e8e42(0x294)]||[],_0xfb2065=_0x10c31c['Padding']||0x0,_0xefffe1=[_0x1e8e42(0x2ce),'up',_0x1e8e42(0x3b0),'left','center',_0x1e8e42(0x4ec),_0x1e8e42(0x582),_0x1e8e42(0x37f),_0x1e8e42(0x2c7)];for(const _0x22aa46 of _0x1c8d65){$gameScreen[_0x1e8e42(0x4f9)](_0x22aa46,_0xfb2065);for(const _0x1b0647 of _0xefffe1){if(_0x10c31c[_0x1b0647]===undefined)continue;$gameScreen[_0x1e8e42(0x42e)](_0x22aa46,_0x10c31c[_0x1b0647],_0x1b0647);}}}),PluginManager[_0x44fc42(0x265)](pluginData['name'],_0x44fc42(0x547),_0x215de7=>{const _0x36bbac=_0x44fc42;VisuMZ[_0x36bbac(0x2e1)](_0x215de7,_0x215de7);const _0xc8c285=_0x215de7[_0x36bbac(0x294)]||[];for(const _0x2e9d91 of _0xc8c285){$gameScreen['eraseAllPictureTexts'](_0x2e9d91),$gameScreen[_0x36bbac(0x4c2)](_0x2e9d91);}}),PluginManager['registerCommand'](pluginData[_0x44fc42(0x247)],_0x44fc42(0x381),_0x45a30d=>{const _0x567cf1=_0x44fc42;$gameScreen[_0x567cf1(0x391)]();}),VisuMZ['MessageCore']['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x44fc42(0x532)][_0x44fc42(0x4f3)],Scene_Boot[_0x44fc42(0x532)][_0x44fc42(0x4f3)]=function(){const _0x5af118=_0x44fc42;VisuMZ['MessageCore'][_0x5af118(0x24e)][_0x5af118(0x1d8)](this),VisuMZ['MessageCore'][_0x5af118(0x55d)](),this[_0x5af118(0x257)](),this[_0x5af118(0x1c5)](),this[_0x5af118(0x3c9)](),this[_0x5af118(0x4df)]();},VisuMZ[_0x44fc42(0x4cc)]['CheckCompatibility']=function(){const _0x4fe3d5=_0x44fc42;if(Imported[_0x4fe3d5(0x2f1)]&&VisuMZ[_0x4fe3d5(0x314)][_0x4fe3d5(0x40e)]<1.09){let _0x2e6930='';_0x2e6930+=_0x4fe3d5(0x360),_0x2e6930+=_0x4fe3d5(0x570),alert(_0x2e6930),SceneManager[_0x4fe3d5(0x279)]();}},VisuMZ['MessageCore'][_0x44fc42(0x369)]=function(_0x49a21c){const _0xbcd357=_0x44fc42,_0xdef45a=VisuMZ[_0xbcd357(0x4cc)][_0xbcd357(0x416)][_0x49a21c];_0xdef45a[_0xbcd357(0x25a)]((_0xa2a8e0,_0x3db2bc)=>{const _0x5e6923=_0xbcd357;if(!_0xa2a8e0||!_0x3db2bc)return-0x1;return _0x3db2bc[_0x5e6923(0x345)][_0x5e6923(0x2a3)]-_0xa2a8e0[_0x5e6923(0x345)]['length'];});},Scene_Boot[_0x44fc42(0x532)][_0x44fc42(0x257)]=function(){const _0x2a50d1=_0x44fc42;VisuMZ[_0x2a50d1(0x4cc)]['SortObjectByKeyLength']('TextCodeActions');for(const _0x4f44d8 of VisuMZ['MessageCore'][_0x2a50d1(0x416)]['TextCodeActions']){_0x4f44d8['Match']=_0x4f44d8[_0x2a50d1(0x345)][_0x2a50d1(0x3bb)](),_0x4f44d8[_0x2a50d1(0x1fe)]=new RegExp('\x1b'+_0x4f44d8[_0x2a50d1(0x345)],'gi'),_0x4f44d8[_0x2a50d1(0x2ec)]='\x1b'+_0x4f44d8[_0x2a50d1(0x345)];if(_0x4f44d8[_0x2a50d1(0x39d)]==='')_0x4f44d8[_0x2a50d1(0x2ec)]+='[0]';}},Scene_Boot[_0x44fc42(0x532)]['process_VisuMZ_MessageCore_TextCodes_Replace']=function(){const _0x1c0671=_0x44fc42;VisuMZ['MessageCore'][_0x1c0671(0x369)]('TextCodeReplace');for(const _0x45ff5f of VisuMZ['MessageCore']['Settings'][_0x1c0671(0x2e0)]){_0x45ff5f[_0x1c0671(0x1fe)]=new RegExp('\x1b'+_0x45ff5f[_0x1c0671(0x345)]+_0x45ff5f[_0x1c0671(0x39d)],'gi'),_0x45ff5f['TextStr']!==''&&_0x45ff5f[_0x1c0671(0x24d)]!==_0x1c0671(0x541)?_0x45ff5f[_0x1c0671(0x2ec)]=new Function('return\x20\x27'+_0x45ff5f[_0x1c0671(0x24d)][_0x1c0671(0x251)](/\\/g,'\x1b')+'\x27'):_0x45ff5f[_0x1c0671(0x2ec)]=_0x45ff5f[_0x1c0671(0x253)];}},Scene_Boot[_0x44fc42(0x532)][_0x44fc42(0x3c9)]=function(){const _0x1db192=_0x44fc42;for(const _0x199615 of VisuMZ[_0x1db192(0x4cc)]['Settings'][_0x1db192(0x4b6)]){_0x199615['textCodeCheck']=new RegExp('\x5c['+_0x199615[_0x1db192(0x345)]+'\x5c]','gi');if(_0x199615[_0x1db192(0x24d)]!==''&&_0x199615[_0x1db192(0x24d)]!==_0x1db192(0x541)){let _0x4f1310=_0x199615['TextStr'];_0x4f1310=_0x4f1310[_0x1db192(0x251)](/\\/g,'\x1b'),_0x4f1310=_0x4f1310[_0x1db192(0x251)]('\x27','\x5c\x27'),_0x4f1310=_0x4f1310['replace']('\x22','\x5c\x22'),_0x199615[_0x1db192(0x2ec)]=new Function('return\x20\x27'+_0x4f1310+'\x27');}else _0x199615[_0x1db192(0x2ec)]=_0x199615[_0x1db192(0x253)];}},Scene_Boot[_0x44fc42(0x532)]['process_VisuMZ_MessageCore_AutoColor']=function(){const _0xe47d39=_0x44fc42,_0x4552ae=VisuMZ[_0xe47d39(0x4cc)][_0xe47d39(0x416)][_0xe47d39(0x328)];!VisuMZ[_0xe47d39(0x2b9)]&&(VisuMZ[_0xe47d39(0x4cc)][_0xe47d39(0x4e8)]($dataClasses,_0x4552ae[_0xe47d39(0x348)]),VisuMZ['MessageCore'][_0xe47d39(0x4e8)]($dataSkills,_0x4552ae['Skills']),VisuMZ['MessageCore'][_0xe47d39(0x4e8)]($dataItems,_0x4552ae[_0xe47d39(0x3d8)]),VisuMZ[_0xe47d39(0x4cc)][_0xe47d39(0x4e8)]($dataWeapons,_0x4552ae[_0xe47d39(0x3f7)]),VisuMZ[_0xe47d39(0x4cc)]['AddAutoColor']($dataArmors,_0x4552ae['Armors']),VisuMZ[_0xe47d39(0x4cc)][_0xe47d39(0x4e8)]($dataEnemies,_0x4552ae[_0xe47d39(0x45b)]),VisuMZ[_0xe47d39(0x4cc)][_0xe47d39(0x4e8)]($dataStates,_0x4552ae['States'])),VisuMZ['MessageCore']['CreateAutoColorRegExpLists']();},VisuMZ['MessageCore'][_0x44fc42(0x413)]=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^',_0x44fc42(0x288),_0x44fc42(0x4ee),_0x44fc42(0x1d5),_0x44fc42(0x587),_0x44fc42(0x24c),_0x44fc42(0x1bf),'<CENTER>','</CENTER>',_0x44fc42(0x2ba),'</RIGHT>','<COLORLOCK>',_0x44fc42(0x3ff),_0x44fc42(0x2a6),')))',_0x44fc42(0x33f),_0x44fc42(0x1fa),_0x44fc42(0x36e),_0x44fc42(0x2da),_0x44fc42(0x2bc),_0x44fc42(0x2c9),_0x44fc42(0x540),'WAIT',_0x44fc42(0x4f5),_0x44fc42(0x4be),_0x44fc42(0x3d3),_0x44fc42(0x3e0),_0x44fc42(0x56f),_0x44fc42(0x420),_0x44fc42(0x298),'ANY'],VisuMZ[_0x44fc42(0x4cc)]['AddAutoColor']=function(_0x5e4c95,_0xfdcf28){const _0x1b7676=_0x44fc42;if(_0xfdcf28<=0x0)return;const _0x1df777=_0x5e4c95;for(const _0x5ed4b3 of _0x1df777){if(!_0x5ed4b3)continue;VisuMZ[_0x1b7676(0x4cc)]['CreateAutoColorFor'](_0x5ed4b3,_0xfdcf28);}},VisuMZ['MessageCore'][_0x44fc42(0x34d)]=function(){const _0xbe0e04=_0x44fc42;VisuMZ[_0xbe0e04(0x4cc)][_0xbe0e04(0x4fb)]=[];for(let _0x44edb1=0x1;_0x44edb1<=0x1f;_0x44edb1++){const _0x2f10ad='TextColor%1'[_0xbe0e04(0x20d)](_0x44edb1),_0x9d28df=VisuMZ[_0xbe0e04(0x4cc)]['Settings'][_0xbe0e04(0x328)][_0x2f10ad];_0x9d28df[_0xbe0e04(0x25a)]((_0x1995ec,_0x4c2895)=>{const _0x443cc7=_0xbe0e04;if(!_0x1995ec||!_0x4c2895)return-0x1;return _0x4c2895['length']-_0x1995ec[_0x443cc7(0x2a3)];}),this[_0xbe0e04(0x4d6)](_0x9d28df,_0x44edb1);}},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x4d6)]=function(_0x4a7f24,_0xae5656){const _0x4fa93=_0x44fc42;for(const _0x49fe05 of _0x4a7f24){if(_0x49fe05['length']<=0x0)continue;if(/^\d+$/[_0x4fa93(0x51f)](_0x49fe05))continue;let _0x51d3a7=VisuMZ[_0x4fa93(0x4cc)][_0x4fa93(0x2cb)](_0x49fe05);if(_0x49fe05[_0x4fa93(0x523)](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g))var _0x4a4c23=new RegExp(_0x51d3a7,'i');else var _0x4a4c23=new RegExp('\x5cb'+_0x51d3a7+'\x5cb','g');VisuMZ['MessageCore'][_0x4fa93(0x4fb)][_0x4fa93(0x3a1)]([_0x4a4c23,_0x4fa93(0x3dc)['format'](_0xae5656,_0x49fe05)]);}},VisuMZ['MessageCore']['ConvertTextAutoColorRegExpFriendly']=function(_0x48b7a6){const _0x4481f2=_0x44fc42;return _0x48b7a6=_0x48b7a6[_0x4481f2(0x251)](/(\W)/gi,(_0x1cadde,_0x33ae43)=>'\x5c%1'[_0x4481f2(0x20d)](_0x33ae43)),_0x48b7a6;},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x54d)]=VisuMZ[_0x44fc42(0x54d)],VisuMZ[_0x44fc42(0x54d)]=function(_0x465bf4){const _0x351c49=_0x44fc42;VisuMZ['MessageCore'][_0x351c49(0x54d)][_0x351c49(0x1d8)](this,_0x465bf4);const _0xc39e0c=VisuMZ[_0x351c49(0x4cc)]['Settings'][_0x351c49(0x328)];VisuMZ[_0x351c49(0x4cc)][_0x351c49(0x474)](_0x465bf4,_0xc39e0c[_0x351c49(0x348)]);},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x311)]=VisuMZ['ParseSkillNotetags'],VisuMZ[_0x44fc42(0x311)]=function(_0x2db992){const _0x2fcb74=_0x44fc42;VisuMZ[_0x2fcb74(0x4cc)][_0x2fcb74(0x311)][_0x2fcb74(0x1d8)](this,_0x2db992);const _0x39899e=VisuMZ[_0x2fcb74(0x4cc)]['Settings'][_0x2fcb74(0x328)];VisuMZ[_0x2fcb74(0x4cc)][_0x2fcb74(0x474)](_0x2db992,_0x39899e['Skills']);},0x7,VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x588)]=VisuMZ['ParseItemNotetags'],VisuMZ[_0x44fc42(0x588)]=function(_0x2ca079){const _0x1b6051=_0x44fc42;VisuMZ[_0x1b6051(0x4cc)][_0x1b6051(0x588)][_0x1b6051(0x1d8)](this,_0x2ca079);const _0x4fd5a=VisuMZ['MessageCore'][_0x1b6051(0x416)]['AutoColor'];VisuMZ[_0x1b6051(0x4cc)][_0x1b6051(0x474)](_0x2ca079,_0x4fd5a['Items']);},VisuMZ[_0x44fc42(0x4cc)]['ParseWeaponNotetags']=VisuMZ[_0x44fc42(0x511)],VisuMZ['ParseWeaponNotetags']=function(_0x448b7c){const _0x3374cb=_0x44fc42;VisuMZ[_0x3374cb(0x4cc)]['ParseWeaponNotetags'][_0x3374cb(0x1d8)](this,_0x448b7c);const _0x3ca8f0=VisuMZ['MessageCore'][_0x3374cb(0x416)][_0x3374cb(0x328)];VisuMZ[_0x3374cb(0x4cc)][_0x3374cb(0x474)](_0x448b7c,_0x3ca8f0[_0x3374cb(0x3f7)]);},VisuMZ['MessageCore']['ParseArmorNotetags']=VisuMZ[_0x44fc42(0x3e4)],VisuMZ['ParseArmorNotetags']=function(_0x2b528b){const _0x5b45e8=_0x44fc42;VisuMZ[_0x5b45e8(0x4cc)][_0x5b45e8(0x3e4)][_0x5b45e8(0x1d8)](this,_0x2b528b);const _0x399f57=VisuMZ[_0x5b45e8(0x4cc)][_0x5b45e8(0x416)][_0x5b45e8(0x328)];VisuMZ['MessageCore'][_0x5b45e8(0x474)](_0x2b528b,_0x399f57[_0x5b45e8(0x4e4)]);},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x353)]=VisuMZ[_0x44fc42(0x353)],VisuMZ[_0x44fc42(0x353)]=function(_0x5e6b98){const _0x3f30ea=_0x44fc42;VisuMZ[_0x3f30ea(0x4cc)]['ParseEnemyNotetags'][_0x3f30ea(0x1d8)](this,_0x5e6b98);const _0x4a373a=VisuMZ[_0x3f30ea(0x4cc)][_0x3f30ea(0x416)][_0x3f30ea(0x328)];VisuMZ['MessageCore'][_0x3f30ea(0x474)](_0x5e6b98,_0x4a373a['Enemies']);},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x435)]=VisuMZ[_0x44fc42(0x435)],VisuMZ[_0x44fc42(0x435)]=function(_0xf70c9a){const _0x4840ab=_0x44fc42;VisuMZ[_0x4840ab(0x4cc)][_0x4840ab(0x435)]['call'](this,_0xf70c9a);const _0x7c70b8=VisuMZ[_0x4840ab(0x4cc)][_0x4840ab(0x416)][_0x4840ab(0x328)];VisuMZ[_0x4840ab(0x4cc)][_0x4840ab(0x474)](_0xf70c9a,_0x7c70b8[_0x4840ab(0x299)]);},VisuMZ[_0x44fc42(0x4cc)]['CreateAutoColorFor']=function(_0x4d300a,_0x51cccd){const _0x307271=_0x44fc42;if(_0x51cccd<=0x0)return;const _0x22f3ab=VisuMZ[_0x307271(0x4cc)][_0x307271(0x416)]['AutoColor']['TextColor'+_0x51cccd];let _0x40aa0a=_0x4d300a['name'][_0x307271(0x504)]();if(/^\d+$/[_0x307271(0x51f)](_0x40aa0a))return;if(VisuMZ[_0x307271(0x4cc)][_0x307271(0x413)]['includes'](_0x40aa0a[_0x307271(0x3bb)]()))return;_0x40aa0a=_0x40aa0a[_0x307271(0x251)](/\\I\[(\d+)\]/gi,''),_0x40aa0a=_0x40aa0a[_0x307271(0x251)](/\x1bI\[(\d+)\]/gi,'');if(_0x40aa0a[_0x307271(0x2a3)]<=0x0)return;if(_0x40aa0a[_0x307271(0x523)](/-----/i))return;_0x22f3ab[_0x307271(0x3a1)](_0x40aa0a);},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x237)]=Scene_Boot[_0x44fc42(0x532)][_0x44fc42(0x2fe)],Scene_Boot['prototype'][_0x44fc42(0x2fe)]=function(){const _0x3947b6=_0x44fc42;VisuMZ[_0x3947b6(0x4cc)][_0x3947b6(0x237)][_0x3947b6(0x1d8)](this),this[_0x3947b6(0x2d6)]();},Scene_Boot[_0x44fc42(0x532)][_0x44fc42(0x2d6)]=function(){const _0x531b2b=_0x44fc42,_0x22696b=VisuMZ[_0x531b2b(0x4cc)][_0x531b2b(0x416)]['CustomFonts']||[];for(const _0x133913 of _0x22696b){if(!_0x133913)continue;const _0x4af06c=_0x133913['FontFamily'];if(_0x4af06c['trim']()==='')continue;if(_0x4af06c[_0x531b2b(0x4cf)]()[_0x531b2b(0x504)]()===_0x531b2b(0x432))continue;const _0x5114fc=_0x133913[_0x531b2b(0x495)];if(_0x5114fc===_0x531b2b(0x500))continue;FontManager[_0x531b2b(0x4a3)](_0x4af06c,_0x5114fc);}},VisuMZ['MessageCore']['DataManager_loadDatabase']=DataManager['loadDatabase'],DataManager[_0x44fc42(0x262)]=function(){const _0x13a3e9=_0x44fc42;VisuMZ['MessageCore']['DataManager_loadDatabase'][_0x13a3e9(0x1d8)](this),this['loadLocalization']();},DataManager['loadLocalization']=function(){const _0x380576=_0x44fc42;if(!TextManager[_0x380576(0x250)]())return;const _0x55fc3d=VisuMZ['MessageCore']['Settings'][_0x380576(0x28d)],_0x3aef89=_0x55fc3d[_0x380576(0x25b)]||'';if(!_0x3aef89)return;const _0x19d867=_0x380576(0x1d4),_0x525fc5=new XMLHttpRequest(),_0x2a84bf='data/'+_0x3aef89;window[_0x19d867]=null,_0x525fc5['open'](_0x380576(0x552),_0x2a84bf),_0x525fc5[_0x380576(0x2a1)](_0x380576(0x301)),_0x525fc5[_0x380576(0x242)]=()=>this[_0x380576(0x46d)](_0x525fc5,_0x19d867),_0x525fc5['onerror']=()=>this[_0x380576(0x29a)](),_0x525fc5[_0x380576(0x3bd)]();},DataManager['onLocalizationXhrLoad']=function(_0x28dbbc,_0x247604){const _0x2fecbb=_0x44fc42;if(_0x28dbbc['status']>=0x190)return;const _0x5d3c23=_0x28dbbc['responseText'];window[_0x247604]=VisuMZ[_0x2fecbb(0x4cc)]['ParseLocalizationCsv'](_0x5d3c23);},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x397)]=function(_0x51122f){const _0x25155b=_0x44fc42,_0x5a6089=_0x51122f[_0x25155b(0x43a)]('\x0a'),_0x5396e4=_0x5a6089[0x0][_0x25155b(0x43a)](';'),_0x54a580={};return _0x5a6089[_0x25155b(0x492)](0x1)[_0x25155b(0x52e)](_0x1afdf7=>{const _0x1ebbb5=_0x25155b;let _0x4d2da4=[],_0x454080='',_0x496189=![];for(let _0x271545=0x0;_0x271545<_0x1afdf7['length'];_0x271545++){let _0x2d67fb=_0x1afdf7[_0x271545];if(_0x2d67fb==='\x22')_0x496189&&_0x1afdf7[_0x271545+0x1]==='\x22'?(_0x454080+=_0x2d67fb,_0x271545++):_0x496189=!_0x496189;else _0x2d67fb===';'&&!_0x496189?(_0x4d2da4['push'](_0x454080),_0x454080=''):_0x454080+=_0x2d67fb;}if(_0x454080)_0x4d2da4[_0x1ebbb5(0x3a1)](_0x454080);if(!_0x4d2da4[0x0])_0x4d2da4[0x0]='';const _0x1aeda7=_0x4d2da4[0x0][_0x1ebbb5(0x251)](/^"|"$/g,'')['toLowerCase']()[_0x1ebbb5(0x504)]();_0x54a580[_0x1aeda7]=_0x5396e4[_0x1ebbb5(0x492)](0x1)[_0x1ebbb5(0x3f6)]((_0x3dcd58,_0x92aff7,_0x206593)=>{const _0x139dc3=_0x1ebbb5;return _0x3dcd58[_0x92aff7]=(_0x4d2da4[_0x206593+0x1]||'')[_0x139dc3(0x251)](/^"|"$/g,''),_0x3dcd58;},{});}),_0x54a580;},DataManager[_0x44fc42(0x29a)]=function(){const _0x4aceb0=_0x44fc42;let _0x42bb41='';_0x42bb41+='You\x20do\x20not\x20have\x20a\x20language\x20CSV\x20set\x20up.\x0a',_0x42bb41+=_0x4aceb0(0x3c6),confirm(_0x42bb41)?Utils[_0x4aceb0(0x2ee)](_0x4aceb0(0x51f))?(_0x42bb41=_0x4aceb0(0x25e),alert(_0x42bb41),this['createLocalizationCsvFile'](),this[_0x4aceb0(0x238)](),_0x42bb41=''):_0x42bb41='CSV\x20file\x20cannot\x20be\x20created.\x0aPlease\x20enter\x20Playtest\x20mode.\x0a':_0x42bb41=_0x4aceb0(0x1e4),_0x42bb41+=_0x4aceb0(0x23d),alert(_0x42bb41),SceneManager[_0x4aceb0(0x279)]();},DataManager[_0x44fc42(0x47d)]=function(){const _0x4b140f=_0x44fc42,_0x3645ea=[_0x4b140f(0x39c),_0x4b140f(0x4c6),_0x4b140f(0x55e),_0x4b140f(0x441),'Chinese(Traditional)','Czech',_0x4b140f(0x4ac),_0x4b140f(0x225),'Finnish',_0x4b140f(0x45c),_0x4b140f(0x393),_0x4b140f(0x4f2),'Hindi','Hungarian',_0x4b140f(0x378),_0x4b140f(0x2fc),_0x4b140f(0x20c),'Korean',_0x4b140f(0x25f),'Polish',_0x4b140f(0x3ba),_0x4b140f(0x57d),'Russian',_0x4b140f(0x3ee),'Spanish',_0x4b140f(0x57a),'Tamil',_0x4b140f(0x4d7),_0x4b140f(0x448)],_0x3980ef=[_0x4b140f(0x2b3),'Hello',_0x4b140f(0x36a),'你好','你好',_0x4b140f(0x2d0),_0x4b140f(0x337),'Hallo',_0x4b140f(0x477),_0x4b140f(0x341),'Hallo',_0x4b140f(0x286),'नमस्ते',_0x4b140f(0x48a),_0x4b140f(0x1db),_0x4b140f(0x439),_0x4b140f(0x4e7),_0x4b140f(0x3b7),_0x4b140f(0x477),'Cześć',_0x4b140f(0x3e5),_0x4b140f(0x526),'Привет',_0x4b140f(0x2d0),'Hola',_0x4b140f(0x337),_0x4b140f(0x291),_0x4b140f(0x27c),_0x4b140f(0x34c)],_0x3e148b=[_0x4b140f(0x3fb),_0x4b140f(0x50b),_0x4b140f(0x578),'再见','再見',_0x4b140f(0x340),_0x4b140f(0x3aa),_0x4b140f(0x224),_0x4b140f(0x52c),_0x4b140f(0x354),'Auf\x20Wiedersehen','Αντίο',_0x4b140f(0x514),_0x4b140f(0x1cd),_0x4b140f(0x553),_0x4b140f(0x47f),_0x4b140f(0x1b5),'안녕히\x20가세요',_0x4b140f(0x405),_0x4b140f(0x310),_0x4b140f(0x2fa),'La\x20revedere',_0x4b140f(0x245),_0x4b140f(0x480),_0x4b140f(0x51d),'Hejdå',_0x4b140f(0x4d9),_0x4b140f(0x2f5),_0x4b140f(0x442)],_0x3cab06=[_0x4b140f(0x4bf),_0x4b140f(0x4bf),_0x4b140f(0x3e7),'哇','哇','Ó','Wow',_0x4b140f(0x26c),_0x4b140f(0x343),_0x4b140f(0x1e1),_0x4b140f(0x4bf),'Ουάου',_0x4b140f(0x54f),_0x4b140f(0x408),_0x4b140f(0x300),_0x4b140f(0x4bf),'ワオ','와우','Oi','O','Uau',_0x4b140f(0x3c0),_0x4b140f(0x472),'Ó',_0x4b140f(0x3d2),'Oj',_0x4b140f(0x40b),_0x4b140f(0x56d),_0x4b140f(0x4e5)],_0x1e8430=[_0x3645ea,_0x3980ef,_0x3e148b,_0x3cab06],_0x326d84=_0x1e8430[_0x4b140f(0x44d)](_0x5ab1ea=>_0x5ab1ea[_0x4b140f(0x545)](';'))[_0x4b140f(0x545)]('\x0a'),_0x3a6275=VisuMZ[_0x4b140f(0x4cc)]['Settings'][_0x4b140f(0x28d)],_0x34c2a5=_0x3a6275[_0x4b140f(0x25b)]||'Languages.csv',_0x1801b5=require(_0x4b140f(0x20a)),_0x3cb73b=_0x1801b5[_0x4b140f(0x513)](process[_0x4b140f(0x490)][_0x4b140f(0x2ff)]),_0x473fb6=_0x1801b5[_0x4b140f(0x545)](_0x3cb73b,_0x4b140f(0x3d4)),_0x3326cf=_0x473fb6+_0x34c2a5,_0xecc9df=require('fs');return _0xecc9df[_0x4b140f(0x49a)](_0x3326cf,_0x326d84),_0x3326cf;},DataManager[_0x44fc42(0x238)]=function(){const _0x45a90f=_0x44fc42,{exec:_0x1bfc1d}=require('child_process');_0x1bfc1d(_0x45a90f(0x470)),_0x1bfc1d('open\x20.\x5cdata');},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x466)]=ImageManager[_0x44fc42(0x3e2)],ImageManager['loadBitmap']=function(_0x37d1e5,_0x4b839a){const _0x265b73=_0x44fc42;if(ConfigManager['textLocale']!==undefined){const _0xcd94e3=VisuMZ[_0x265b73(0x4cc)][_0x265b73(0x416)]['Localization']||{},_0x652692=_0xcd94e3[_0x265b73(0x274)]||_0x265b73(0x4c6),_0x990923=VisuMZ[_0x265b73(0x4cc)]['Settings'][_0x265b73(0x295)]||{},_0x28f517=ConfigManager['textLocale']||_0x652692;if(_0x28f517===_0x652692&&!_0x990923[_0x265b73(0x1bc)]){}else{const _0x54ee64=_0x990923[_0x28f517]||'[XX]';_0x37d1e5&&_0x37d1e5[_0x265b73(0x523)](/\[XX\]/g)&&console[_0x265b73(0x396)](_0x37d1e5,_0x4b839a),_0x4b839a&&_0x4b839a['match'](/\[XX\]/g)&&(_0x4b839a=_0x4b839a['replace'](/\[XX\]/g,_0x54ee64));}}return VisuMZ[_0x265b73(0x4cc)]['ImageManager_loadBitmap'][_0x265b73(0x1d8)](this,_0x37d1e5,_0x4b839a);},SceneManager['isSceneBattle']=function(){const _0x517d34=_0x44fc42;return this[_0x517d34(0x52f)]&&this[_0x517d34(0x52f)][_0x517d34(0x233)]===Scene_Battle;},SceneManager[_0x44fc42(0x249)]=function(){const _0x598247=_0x44fc42;return this[_0x598247(0x52f)]&&this[_0x598247(0x52f)][_0x598247(0x233)]===Scene_Map;},ConfigManager[_0x44fc42(0x1e8)]=VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x416)][_0x44fc42(0x28d)][_0x44fc42(0x274)]||'English',ConfigManager[_0x44fc42(0x1b3)]=VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x416)][_0x44fc42(0x575)][_0x44fc42(0x25d)],VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x31e)]=ConfigManager[_0x44fc42(0x2e9)],ConfigManager[_0x44fc42(0x2e9)]=function(){const _0x5bae9a=_0x44fc42,_0x5cca54=VisuMZ[_0x5bae9a(0x4cc)][_0x5bae9a(0x31e)][_0x5bae9a(0x1d8)](this);return TextManager[_0x5bae9a(0x250)]()&&(_0x5cca54['textLocale']=this[_0x5bae9a(0x1e8)]),_0x5cca54[_0x5bae9a(0x1b3)]=this[_0x5bae9a(0x1b3)],_0x5cca54;},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x521)]=ConfigManager['applyData'],ConfigManager['applyData']=function(_0x264744){const _0x59e5b8=_0x44fc42;VisuMZ[_0x59e5b8(0x4cc)][_0x59e5b8(0x521)]['call'](this,_0x264744),TextManager['isVisuMzLocalizationEnabled']()&&(_0x59e5b8(0x1e8)in _0x264744?this[_0x59e5b8(0x1e8)]=String(_0x264744[_0x59e5b8(0x1e8)]):this['textLocale']=VisuMZ[_0x59e5b8(0x4cc)]['Settings'][_0x59e5b8(0x28d)][_0x59e5b8(0x274)]||'English'),'textSpeed'in _0x264744?this[_0x59e5b8(0x1b3)]=Number(_0x264744[_0x59e5b8(0x1b3)])[_0x59e5b8(0x1b6)](0x1,0xb):this[_0x59e5b8(0x1b3)]=VisuMZ[_0x59e5b8(0x4cc)][_0x59e5b8(0x416)][_0x59e5b8(0x575)][_0x59e5b8(0x25d)];},TextManager[_0x44fc42(0x28a)]=VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x416)][_0x44fc42(0x28d)][_0x44fc42(0x4ae)],TextManager[_0x44fc42(0x529)]=VisuMZ[_0x44fc42(0x4cc)]['Settings']['TextSpeed']['Name'],TextManager[_0x44fc42(0x436)]=VisuMZ[_0x44fc42(0x4cc)]['Settings'][_0x44fc42(0x575)][_0x44fc42(0x243)],VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x386)]=TextManager[_0x44fc42(0x32c)],TextManager[_0x44fc42(0x32c)]=function(_0x2d2c74){const _0x53160b=_0x44fc42,_0x2ce0ed=['levelUp',_0x53160b(0x430),_0x53160b(0x42b),_0x53160b(0x313),_0x53160b(0x26a),_0x53160b(0x549),_0x53160b(0x4f6),_0x53160b(0x560),_0x53160b(0x1eb),_0x53160b(0x3ae)];let _0x165e1d=VisuMZ[_0x53160b(0x4cc)][_0x53160b(0x386)][_0x53160b(0x1d8)](this,_0x2d2c74);return _0x2ce0ed['includes'](_0x2d2c74)&&(_0x165e1d=_0x53160b(0x1fa)+_0x165e1d),_0x165e1d;},TextManager['isVisuMzLocalizationEnabled']=function(){const _0x293349=_0x44fc42;return VisuMZ[_0x293349(0x4cc)][_0x293349(0x416)][_0x293349(0x28d)][_0x293349(0x387)];},TextManager['parseLocalizedText']=function(_0xcf6f26){const _0x2684ab=_0x44fc42;if(!this[_0x2684ab(0x250)]())return _0xcf6f26;return _0xcf6f26=String(_0xcf6f26)[_0x2684ab(0x251)](/\$(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi,(_0x55a8fc,_0x1fe2dd)=>this[_0x2684ab(0x565)](String(_0x1fe2dd))),_0xcf6f26=String(_0xcf6f26)[_0x2684ab(0x251)](/\\(?:KEY|TL|TRANSLATE|LOC|LOCALIZE|LOCALE)(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi,(_0x31666b,_0x31eaf8)=>this[_0x2684ab(0x565)](String(_0x31eaf8))),_0xcf6f26=String(_0xcf6f26)[_0x2684ab(0x251)](/\x1b(?:KEY|TL|TRANSLATE|LOC|LOCALIZE|LOCALE)(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi,(_0x4b8a0d,_0x3c66bb)=>this['getLocalizedText'](String(_0x3c66bb))),_0xcf6f26;},TextManager[_0x44fc42(0x565)]=function(_0x54839a){const _0x5fc523=_0x44fc42;if(!$dataLocalization)return'';const _0x608ed6=$dataLocalization[_0x54839a[_0x5fc523(0x4cf)]()[_0x5fc523(0x504)]()];if(!_0x608ed6)return;const _0x3a4272=ConfigManager[_0x5fc523(0x1e8)]||_0x5fc523(0x4c6);let _0x4239b5=_0x608ed6[_0x3a4272]||_0x5fc523(0x264);return _0x4239b5=_0x4239b5[_0x5fc523(0x251)](/\\/g,'\x1b'),_0x4239b5=_0x4239b5[_0x5fc523(0x251)](/<SEMI(?:|-COLON|COLON)>/gi,';'),_0x4239b5;},TextManager[_0x44fc42(0x45e)]=function(_0x44a103){const _0x47dde5=_0x44fc42;return VisuMZ['MessageCore'][_0x47dde5(0x416)][_0x47dde5(0x28d)][_0x44a103]||'';},TextManager['getCurrentLanguage']=function(){const _0xa45e9c=_0x44fc42,_0x16abf2=ConfigManager[_0xa45e9c(0x1e8)]||_0xa45e9c(0x4c6);return this[_0xa45e9c(0x45e)](_0x16abf2);},TextManager[_0x44fc42(0x1c3)]=function(_0x46f30b){const _0x273ec2=_0x44fc42,_0x34945c=VisuMZ[_0x273ec2(0x4cc)][_0x273ec2(0x416)]['Localization'][_0x273ec2(0x482)]||[];let _0x46c65c=_0x34945c[_0x273ec2(0x1e3)](ConfigManager['textLocale']||_0x273ec2(0x4c6));_0x46c65c+=_0x46f30b;const _0x1d7ea3=_0x34945c[_0x46c65c]||'';return this[_0x273ec2(0x45e)](_0x1d7ea3);},VisuMZ[_0x44fc42(0x4cc)]['Game_System_mainFontFace']=Game_System['prototype']['mainFontFace'],Game_System[_0x44fc42(0x532)]['mainFontFace']=function(){const _0x344ffd=_0x44fc42;let _0x5604c3=VisuMZ[_0x344ffd(0x4cc)]['Game_System_mainFontFace'][_0x344ffd(0x1d8)](this);if(ConfigManager&&ConfigManager[_0x344ffd(0x327)]!==undefined&&ConfigManager['textFont']>0x0)return _0x5604c3;else{const _0x14e09b=ConfigManager['textLocale']||_0x344ffd(0x4c6),_0x501bd2=VisuMZ[_0x344ffd(0x4cc)]['Settings'][_0x344ffd(0x26f)];return _0x501bd2[_0x14e09b]!==undefined&&(_0x5604c3=_0x501bd2[_0x14e09b]+',\x20'+$dataSystem['advanced'][_0x344ffd(0x418)]),_0x5604c3;}},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x326)]=Window_Command[_0x44fc42(0x532)]['addCommand'],Window_Command['prototype'][_0x44fc42(0x431)]=function(_0x4a2fe4,_0x489da9,_0x112d87,_0x541cf3){const _0x18523d=_0x44fc42;if(TextManager[_0x18523d(0x423)]&&TextManager['isVisuMzLocalizationEnabled']()){const _0x753879=String(_0x4a2fe4)[_0x18523d(0x4cf)]()[_0x18523d(0x504)]();if($dataLocalization[_0x753879]&&_0x753879[_0x18523d(0x2a3)]>0x0){const _0x4a0d69=ConfigManager[_0x18523d(0x1e8)]||_0x18523d(0x4c6);_0x4a2fe4=$dataLocalization[_0x753879][_0x4a0d69]||_0x18523d(0x264);}}VisuMZ[_0x18523d(0x4cc)][_0x18523d(0x326)]['call'](this,_0x4a2fe4,_0x489da9,_0x112d87,_0x541cf3);},Window_StatusBase[_0x44fc42(0x532)][_0x44fc42(0x379)]=function(_0x1158e2,_0x1e042a){const _0x4e3b62=_0x44fc42,_0x1c098c=_0x1158e2[_0x4e3b62(0x4ff)]();let _0x191a83=$dataSystem['equipTypes'][_0x1c098c[_0x1e042a]];if(TextManager['parseLocalizedText']){const _0xfd4214=String(_0x191a83)[_0x4e3b62(0x4cf)]()[_0x4e3b62(0x504)]();if(TextManager[_0x4e3b62(0x250)]()&&$dataLocalization[_0xfd4214]){const _0x3cd8b6=ConfigManager[_0x4e3b62(0x1e8)]||'English';_0x191a83=$dataLocalization[_0xfd4214][_0x3cd8b6]||'UNDEFINED!';}}return _0x191a83;},Game_Temp[_0x44fc42(0x532)][_0x44fc42(0x401)]=function(_0x394b79){this['_lastPluginCommandInterpreter']=_0x394b79;},Game_Temp['prototype'][_0x44fc42(0x512)]=function(){return this['_lastPluginCommandInterpreter'];},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x458)]=Game_Interpreter['prototype'][_0x44fc42(0x258)],Game_Interpreter[_0x44fc42(0x532)]['command357']=function(_0x195634){const _0x2aaada=_0x44fc42;return $gameTemp[_0x2aaada(0x401)](this),VisuMZ[_0x2aaada(0x4cc)]['Game_Interpreter_PluginCommand']['call'](this,_0x195634);},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x2c5)]=Game_System[_0x44fc42(0x532)][_0x44fc42(0x4ef)],Game_System[_0x44fc42(0x532)]['initialize']=function(){const _0x4a17e4=_0x44fc42;VisuMZ['MessageCore']['Game_System_initialize'][_0x4a17e4(0x1d8)](this),this[_0x4a17e4(0x4f1)]();},Game_System['prototype']['initMessageCore']=function(){const _0x4e1090=_0x44fc42,_0x2aacee=VisuMZ[_0x4e1090(0x4cc)]['Settings'][_0x4e1090(0x282)],_0x129f7b=VisuMZ[_0x4e1090(0x4cc)][_0x4e1090(0x416)][_0x4e1090(0x54a)];this['_MessageCoreSettings']={'messageRows':_0x2aacee[_0x4e1090(0x40d)],'messageWidth':_0x2aacee[_0x4e1090(0x2bf)],'messageWordWrap':_0x129f7b[_0x4e1090(0x3a6)],'helpWordWrap':_0x129f7b[_0x4e1090(0x1f6)],'choiceLineHeight':_0x2aacee[_0x4e1090(0x478)],'choiceMinWidth':_0x2aacee[_0x4e1090(0x4f8)]??0x60,'choiceRows':_0x2aacee[_0x4e1090(0x530)],'choiceCols':_0x2aacee[_0x4e1090(0x3b4)],'choiceTextAlign':_0x2aacee[_0x4e1090(0x50e)],'choiceDistance':0x0},this[_0x4e1090(0x38e)]===undefined&&(this['_messageOffsetX']=_0x2aacee[_0x4e1090(0x44e)],this[_0x4e1090(0x4e3)]=_0x2aacee[_0x4e1090(0x244)]);},Game_System[_0x44fc42(0x532)][_0x44fc42(0x493)]=function(){const _0x5be49e=_0x44fc42;if(this[_0x5be49e(0x26b)]===undefined)this[_0x5be49e(0x4f1)]();if(this['_MessageCoreSettings'][_0x5be49e(0x2b7)]===undefined)this[_0x5be49e(0x4f1)]();return this[_0x5be49e(0x26b)]['messageRows'];},Game_System[_0x44fc42(0x532)][_0x44fc42(0x4a2)]=function(_0x305eaa){const _0x4af37a=_0x44fc42;if(this['_MessageCoreSettings']===undefined)this[_0x4af37a(0x4f1)]();if(this[_0x4af37a(0x26b)][_0x4af37a(0x2b7)]===undefined)this['initMessageCore']();this['_MessageCoreSettings'][_0x4af37a(0x2b7)]=_0x305eaa||0x1;},Game_System[_0x44fc42(0x532)][_0x44fc42(0x3d6)]=function(){const _0x172f16=_0x44fc42;if(this[_0x172f16(0x26b)]===undefined)this[_0x172f16(0x4f1)]();if(this['_MessageCoreSettings'][_0x172f16(0x51c)]===undefined)this[_0x172f16(0x4f1)]();return this[_0x172f16(0x26b)][_0x172f16(0x51c)];},Game_System[_0x44fc42(0x532)][_0x44fc42(0x2cd)]=function(_0x4445f3){const _0x502d01=_0x44fc42;if(this[_0x502d01(0x26b)]===undefined)this[_0x502d01(0x4f1)]();if(this[_0x502d01(0x26b)][_0x502d01(0x51c)]===undefined)this[_0x502d01(0x4f1)]();_0x4445f3=Math[_0x502d01(0x398)](_0x4445f3);if(_0x4445f3%0x2!==0x0)_0x4445f3+=0x1;this[_0x502d01(0x26b)][_0x502d01(0x51c)]=_0x4445f3||0x2;},Game_System['prototype']['isMessageWindowWordWrap']=function(){const _0x20e008=_0x44fc42;if(this[_0x20e008(0x26b)]===undefined)this['initMessageCore']();if(this[_0x20e008(0x26b)][_0x20e008(0x53e)]===undefined)this['initMessageCore']();return this[_0x20e008(0x26b)][_0x20e008(0x53e)];},Game_System[_0x44fc42(0x532)][_0x44fc42(0x4a1)]=function(_0x5ee6d8){const _0xf5d0b6=_0x44fc42;if(this[_0xf5d0b6(0x26b)]===undefined)this[_0xf5d0b6(0x4f1)]();if(this[_0xf5d0b6(0x26b)][_0xf5d0b6(0x53e)]===undefined)this[_0xf5d0b6(0x4f1)]();this[_0xf5d0b6(0x26b)][_0xf5d0b6(0x53e)]=_0x5ee6d8;},Game_System[_0x44fc42(0x532)]['getMessageWindowXyOffsets']=function(){const _0x4aae42=_0x44fc42;if(this['_messageOffsetX']===undefined){const _0x320948=VisuMZ['MessageCore'][_0x4aae42(0x416)][_0x4aae42(0x282)];this[_0x4aae42(0x38e)]=_0x320948[_0x4aae42(0x44e)],this[_0x4aae42(0x4e3)]=_0x320948['MsgWindowOffsetY'];}return{'x':this['_messageOffsetX']||0x0,'y':this['_messageOffsetY']||0x0};},Game_System[_0x44fc42(0x532)]['setMessageWindowXyOffsets']=function(_0x1ada95,_0x247a86){const _0x15c427=_0x44fc42;if(this[_0x15c427(0x26b)]===undefined)this['initMessageCore']();this[_0x15c427(0x38e)]=_0x1ada95,this['_messageOffsetY']=_0x247a86;},Game_System[_0x44fc42(0x532)][_0x44fc42(0x352)]=function(){const _0x123d62=_0x44fc42;if(this[_0x123d62(0x26b)]===undefined)this[_0x123d62(0x4f1)]();if(this[_0x123d62(0x26b)]['helpWordWrap']===undefined)this[_0x123d62(0x4f1)]();return this[_0x123d62(0x26b)][_0x123d62(0x479)];},Game_System[_0x44fc42(0x532)]['setHelpWindowWordWrap']=function(_0x57c140){const _0xbd3992=_0x44fc42;if(this[_0xbd3992(0x26b)]===undefined)this[_0xbd3992(0x4f1)]();if(this[_0xbd3992(0x26b)][_0xbd3992(0x479)]===undefined)this['initMessageCore']();this[_0xbd3992(0x26b)][_0xbd3992(0x479)]=_0x57c140;},Game_System[_0x44fc42(0x532)][_0x44fc42(0x359)]=function(){const _0x1c9e82=_0x44fc42;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x1c9e82(0x26b)][_0x1c9e82(0x2e7)]===undefined)this[_0x1c9e82(0x4f1)]();return this[_0x1c9e82(0x26b)][_0x1c9e82(0x2e7)];},Game_System[_0x44fc42(0x532)][_0x44fc42(0x2e6)]=function(_0x10f7f4){const _0x3dc780=_0x44fc42;if(this[_0x3dc780(0x26b)]===undefined)this[_0x3dc780(0x4f1)]();if(this[_0x3dc780(0x26b)]['choiceLineHeight']===undefined)this[_0x3dc780(0x4f1)]();this[_0x3dc780(0x26b)][_0x3dc780(0x2e7)]=_0x10f7f4||0x1;},Game_System[_0x44fc42(0x532)][_0x44fc42(0x2ef)]=function(){const _0x30e9fc=_0x44fc42;if(this[_0x30e9fc(0x26b)]===undefined)this[_0x30e9fc(0x4f1)]();return this[_0x30e9fc(0x26b)][_0x30e9fc(0x56b)]??0x60;},Game_System[_0x44fc42(0x532)][_0x44fc42(0x2b2)]=function(_0x32064c){const _0x3f7cb6=_0x44fc42;if(this[_0x3f7cb6(0x26b)]===undefined)this[_0x3f7cb6(0x4f1)]();this[_0x3f7cb6(0x26b)][_0x3f7cb6(0x56b)]=_0x32064c||0x0;},Game_System['prototype'][_0x44fc42(0x3a5)]=function(){const _0x287949=_0x44fc42;if(this[_0x287949(0x26b)]===undefined)this[_0x287949(0x4f1)]();if(this[_0x287949(0x26b)][_0x287949(0x415)]===undefined)this['initMessageCore']();return this[_0x287949(0x26b)][_0x287949(0x415)];},Game_System[_0x44fc42(0x532)][_0x44fc42(0x550)]=function(_0x4870c3){const _0x55e535=_0x44fc42;if(this[_0x55e535(0x26b)]===undefined)this['initMessageCore']();if(this[_0x55e535(0x26b)][_0x55e535(0x415)]===undefined)this[_0x55e535(0x4f1)]();this[_0x55e535(0x26b)][_0x55e535(0x415)]=_0x4870c3||0x1;},Game_System['prototype'][_0x44fc42(0x27f)]=function(){const _0x4da9a6=_0x44fc42;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x4da9a6(0x26b)][_0x4da9a6(0x4b4)]===undefined)this[_0x4da9a6(0x4f1)]();return this[_0x4da9a6(0x26b)][_0x4da9a6(0x4b4)];},Game_System[_0x44fc42(0x532)][_0x44fc42(0x2dc)]=function(_0x369815){const _0x5a15cf=_0x44fc42;if(this[_0x5a15cf(0x26b)]===undefined)this['initMessageCore']();if(this[_0x5a15cf(0x26b)][_0x5a15cf(0x4b4)]===undefined)this[_0x5a15cf(0x4f1)]();this[_0x5a15cf(0x26b)][_0x5a15cf(0x4b4)]=_0x369815||0x1;},Game_System['prototype'][_0x44fc42(0x2e8)]=function(){const _0x398982=_0x44fc42;if(this[_0x398982(0x26b)]===undefined)this[_0x398982(0x4f1)]();if(this[_0x398982(0x26b)]['choiceTextAlign']===undefined)this[_0x398982(0x4f1)]();return this[_0x398982(0x26b)][_0x398982(0x508)];},Game_System[_0x44fc42(0x532)]['setChoiceListTextAlign']=function(_0x9a590a){const _0x191bfc=_0x44fc42;if(this[_0x191bfc(0x26b)]===undefined)this[_0x191bfc(0x4f1)]();if(this['_MessageCoreSettings'][_0x191bfc(0x508)]===undefined)this['initMessageCore']();this[_0x191bfc(0x26b)][_0x191bfc(0x508)]=_0x9a590a[_0x191bfc(0x4cf)]();},Game_System[_0x44fc42(0x532)][_0x44fc42(0x2b8)]=function(){const _0x593287=_0x44fc42;if(this[_0x593287(0x26b)]===undefined)this['initMessageCore']();return this[_0x593287(0x26b)][_0x593287(0x3ea)]||0x0;},Game_System[_0x44fc42(0x532)][_0x44fc42(0x260)]=function(_0x5ecd86){const _0xddadf=_0x44fc42;if(this[_0xddadf(0x26b)]===undefined)this[_0xddadf(0x4f1)]();this[_0xddadf(0x26b)]['choiceDistance']=_0x5ecd86||0x0;},Game_Message[_0x44fc42(0x532)][_0x44fc42(0x3cb)]=function(_0x302815,_0x3807e8){const _0x523786=_0x44fc42;this[_0x523786(0x3c1)]=_0x302815,this[_0x523786(0x453)]='weapon',this[_0x523786(0x236)]=_0x3807e8,this[_0x523786(0x2f2)]=0x0;},Game_Message['prototype']['itemChoiceWtypeId']=function(){const _0x4a08a2=_0x44fc42;return this[_0x4a08a2(0x236)]||0x0;},Game_Message[_0x44fc42(0x532)][_0x44fc42(0x2b4)]=function(_0x1bcc23,_0x4db99e,_0xd12623){const _0x53e38b=_0x44fc42;this['_itemChoiceVariableId']=_0x1bcc23,this['_itemChoiceItypeId']=_0x53e38b(0x216),this[_0x53e38b(0x1b7)]=_0x4db99e,this[_0x53e38b(0x2f2)]=_0xd12623;},Game_Message['prototype']['itemChoiceAtypeId']=function(){const _0x114f2b=_0x44fc42;return this[_0x114f2b(0x1b7)]||0x0;},Game_Message[_0x44fc42(0x532)][_0x44fc42(0x48d)]=function(){return this['_itemChoiceEtypeId']||0x0;},Game_Message['prototype']['setSkillChoice']=function(_0x1f92d7,_0x24b16e,_0xedcadd){const _0x2cb37e=_0x44fc42;this[_0x2cb37e(0x3c1)]=_0x1f92d7,this[_0x2cb37e(0x453)]=_0x2cb37e(0x4db),this['_itemChoiceActorId']=_0x24b16e,this[_0x2cb37e(0x23b)]=_0xedcadd;},Game_Message[_0x44fc42(0x532)]['itemChoiceActorId']=function(){const _0x58a963=_0x44fc42;return this[_0x58a963(0x372)]||0x0;},Game_Message['prototype'][_0x44fc42(0x234)]=function(){const _0x46db74=_0x44fc42;return $gameActors[_0x46db74(0x1c1)](this[_0x46db74(0x23a)]())||$gameParty[_0x46db74(0x34a)]()||null;},Game_Message[_0x44fc42(0x532)][_0x44fc42(0x2aa)]=function(){const _0x4d8a4c=_0x44fc42;return this[_0x4d8a4c(0x23b)]||0x0;},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x2b5)]=Game_Message[_0x44fc42(0x532)]['setChoices'],Game_Message['prototype'][_0x44fc42(0x246)]=function(_0xa123ad,_0x21d7c2,_0x15c139){const _0x1f6b80=_0x44fc42;this[_0x1f6b80(0x548)]=!![],VisuMZ[_0x1f6b80(0x4cc)][_0x1f6b80(0x2b5)][_0x1f6b80(0x1d8)](this,_0xa123ad,_0x21d7c2,_0x15c139);},Game_Message[_0x44fc42(0x532)][_0x44fc42(0x3bf)]=function(){const _0x1a6289=_0x44fc42;this[_0x1a6289(0x548)]=![],this['_choiceIndexArray']=[];const _0x55fb7a=this[_0x1a6289(0x3d5)][_0x1a6289(0x2a3)];this[_0x1a6289(0x316)]=_0x55fb7a;let _0x52d3e8=![];for(let _0x4af2fc=0x0;_0x4af2fc<_0x55fb7a;_0x4af2fc++){let _0x3e8e08=this[_0x1a6289(0x3d5)][_0x4af2fc];_0x3e8e08[_0x1a6289(0x523)](/<SHUFFLE>/gi)&&(_0x52d3e8=!![],_0x3e8e08=_0x3e8e08['replace'](/<SHUFFLE>/gi,'')),_0x3e8e08[_0x1a6289(0x523)](/<SHUFFLE:[ ](\d+)>/gi)&&(_0x52d3e8=!![],this[_0x1a6289(0x316)]=Math[_0x1a6289(0x375)](Number(RegExp['$1']),this[_0x1a6289(0x316)]),_0x3e8e08=_0x3e8e08[_0x1a6289(0x251)](/<SHUFFLE:[ ](\d+)>/gi,'')),_0x3e8e08[_0x1a6289(0x523)](/<SHUFFLE: VAR[ ](\d+)>/gi)&&(_0x52d3e8=!![],this['_maxShuffleChoices']=Math[_0x1a6289(0x375)]($gameVariables[_0x1a6289(0x317)](Number(RegExp['$1']))||0x1,this[_0x1a6289(0x316)]),_0x3e8e08=_0x3e8e08['replace'](/<SHUFFLE:[ ]VAR (\d+)>/gi,'')),this['_choiceIndexArray'][_0x1a6289(0x3a1)](_0x4af2fc),this[_0x1a6289(0x3d5)][_0x4af2fc]=_0x3e8e08;}if(_0x52d3e8){this[_0x1a6289(0x252)]=VisuMZ[_0x1a6289(0x4cc)][_0x1a6289(0x556)](this['_choiceIndexArray']);if(this[_0x1a6289(0x29d)]()!==-0x2)this['_choiceCancelType']=-0x1;}},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x556)]=function(_0x19c32f){const _0x4b1013=_0x44fc42;var _0x3b9af8,_0x4bed60,_0x3957bc;for(_0x3957bc=_0x19c32f[_0x4b1013(0x2a3)]-0x1;_0x3957bc>0x0;_0x3957bc--){_0x3b9af8=Math[_0x4b1013(0x388)](Math[_0x4b1013(0x275)]()*(_0x3957bc+0x1)),_0x4bed60=_0x19c32f[_0x3957bc],_0x19c32f[_0x3957bc]=_0x19c32f[_0x3b9af8],_0x19c32f[_0x3b9af8]=_0x4bed60;}return _0x19c32f;},Game_Message['prototype'][_0x44fc42(0x296)]=function(){if(!this['_choiceIndexArray'])this['setupShuffleChoices']();return this['_choiceIndexArray'];},Game_Message[_0x44fc42(0x532)]['maxShuffleChoices']=function(){const _0x1eeef5=_0x44fc42;if(this[_0x1eeef5(0x316)]===undefined)this[_0x1eeef5(0x3bf)]();return this[_0x1eeef5(0x316)];},VisuMZ[_0x44fc42(0x4cc)]['Game_Screen_clearPictures']=Game_Screen[_0x44fc42(0x532)]['clearPictures'],Game_Screen[_0x44fc42(0x532)][_0x44fc42(0x1dc)]=function(){const _0x4ce251=_0x44fc42;VisuMZ[_0x4ce251(0x4cc)]['Game_Screen_clearPictures']['call'](this),this[_0x4ce251(0x44a)]();},Game_Screen[_0x44fc42(0x532)][_0x44fc42(0x44a)]=function(){const _0x4966c1=_0x44fc42;this[_0x4966c1(0x45d)]=[],this[_0x4966c1(0x489)]=[],this['_pictureTextRefresh']=[];},Game_Screen['prototype'][_0x44fc42(0x362)]=function(_0x8fe4dc){const _0x279e3d=_0x44fc42;if(this[_0x279e3d(0x45d)]===undefined)this[_0x279e3d(0x44a)]();const _0x56235f=this[_0x279e3d(0x280)](_0x8fe4dc);return this[_0x279e3d(0x45d)][_0x56235f]=this[_0x279e3d(0x45d)][_0x56235f]||{},this[_0x279e3d(0x45d)][_0x56235f];},Game_Screen[_0x44fc42(0x532)][_0x44fc42(0x4d1)]=function(_0x471e4d,_0x2ba087){const _0xec2084=_0x44fc42;return _0x2ba087=_0x2ba087[_0xec2084(0x4cf)]()['trim'](),this[_0xec2084(0x362)](_0x471e4d)[_0x2ba087]||'';},Game_Screen[_0x44fc42(0x532)][_0x44fc42(0x42e)]=function(_0x5ef681,_0x7e3102,_0x3e0188){const _0x2f93eb=_0x44fc42;_0x3e0188=_0x3e0188['toLowerCase']()[_0x2f93eb(0x504)](),this['getPictureTextData'](_0x5ef681)[_0x3e0188]=_0x7e3102||'',this[_0x2f93eb(0x2f4)](_0x5ef681,!![]);},Game_Screen[_0x44fc42(0x532)][_0x44fc42(0x42f)]=function(_0x466364){const _0xf8fa56=_0x44fc42;if(this['_pictureText']===undefined)this[_0xf8fa56(0x44a)]();const _0x3dad36=this[_0xf8fa56(0x280)](_0x466364);this[_0xf8fa56(0x45d)][_0x3dad36]=null,this[_0xf8fa56(0x2f4)](_0x466364,!![]);},Game_Screen[_0x44fc42(0x532)]['getPictureTextBuffer']=function(_0x1eb2c2){const _0x5237dc=_0x44fc42;if(this['_pictureText']===undefined)this[_0x5237dc(0x44a)]();const _0x4e255a=this[_0x5237dc(0x280)](_0x1eb2c2);return this['_pictureTextBuffer'][_0x4e255a]||0x0;},Game_Screen['prototype']['setPictureTextBuffer']=function(_0x54bc6b,_0x1d651c){const _0x21ea1a=_0x44fc42;if(this['_pictureText']===undefined)this[_0x21ea1a(0x44a)]();const _0x4caf91=this[_0x21ea1a(0x280)](_0x54bc6b);this[_0x21ea1a(0x489)][_0x4caf91]=Math[_0x21ea1a(0x267)](0x0,_0x1d651c);},Game_Screen[_0x44fc42(0x532)][_0x44fc42(0x4c2)]=function(_0x1568fb){const _0x2edb0b=_0x44fc42;if(this[_0x2edb0b(0x45d)]===undefined)this[_0x2edb0b(0x44a)]();const _0x19838a=this[_0x2edb0b(0x280)](_0x1568fb);this[_0x2edb0b(0x489)][_0x19838a]=undefined;},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x240)]=Game_Screen[_0x44fc42(0x532)][_0x44fc42(0x2a5)],Game_Screen[_0x44fc42(0x532)][_0x44fc42(0x2a5)]=function(_0x5b892f){const _0x223aaa=_0x44fc42;VisuMZ['MessageCore'][_0x223aaa(0x240)][_0x223aaa(0x1d8)](this,_0x5b892f),this['eraseAllPictureTexts'](_0x5b892f),this[_0x223aaa(0x4c2)](_0x5b892f),this[_0x223aaa(0x2f4)](_0x5b892f,!![]);},Game_Screen['prototype'][_0x44fc42(0x391)]=function(){const _0x28b10d=_0x44fc42;for(const _0x3d9842 of this[_0x28b10d(0x2cc)]){if(_0x3d9842){let _0x198668=this[_0x28b10d(0x2cc)][_0x28b10d(0x1e3)](_0x3d9842);this[_0x28b10d(0x2f4)](_0x198668);}}},Game_Screen[_0x44fc42(0x532)]['requestPictureTextRefresh']=function(_0x2df01b,_0xa1dd56){const _0x558657=_0x44fc42;this[_0x558657(0x223)]=this[_0x558657(0x223)]||[],(this[_0x558657(0x293)](_0x2df01b)||_0xa1dd56)&&this['_pictureTextRefresh']['push'](_0x2df01b);},Game_Screen[_0x44fc42(0x532)][_0x44fc42(0x3db)]=function(_0x3081b3){const _0x1543a3=_0x44fc42;return this[_0x1543a3(0x223)]=this[_0x1543a3(0x223)]||[],this[_0x1543a3(0x223)]['includes'](_0x3081b3);},Game_Screen[_0x44fc42(0x532)][_0x44fc42(0x4b3)]=function(_0x2ddf4e){const _0x398f07=_0x44fc42;this[_0x398f07(0x223)]=this[_0x398f07(0x223)]||[],this[_0x398f07(0x223)]['remove'](_0x2ddf4e);},Game_Screen[_0x44fc42(0x532)][_0x44fc42(0x293)]=function(_0x42e233){const _0x5ed3fb=_0x44fc42,_0x5549b1=[_0x5ed3fb(0x2ce),'up','upperright','left',_0x5ed3fb(0x4a8),_0x5ed3fb(0x4ec),'lowerleft','down',_0x5ed3fb(0x2c7)];return _0x5549b1[_0x5ed3fb(0x460)](_0x224321=>this[_0x5ed3fb(0x4d1)](_0x42e233,_0x224321)!=='');},VisuMZ['MessageCore']['Game_Party_initialize']=Game_Party[_0x44fc42(0x532)][_0x44fc42(0x4ef)],Game_Party[_0x44fc42(0x532)][_0x44fc42(0x4ef)]=function(){const _0x3ba3f7=_0x44fc42;VisuMZ['MessageCore'][_0x3ba3f7(0x55b)][_0x3ba3f7(0x1d8)](this),this[_0x3ba3f7(0x4f1)]();},Game_Party['prototype'][_0x44fc42(0x4f1)]=function(){const _0x4ecddd=_0x44fc42;this[_0x4ecddd(0x56a)]={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party[_0x44fc42(0x532)][_0x44fc42(0x2c4)]=function(){const _0x8ee634=_0x44fc42;if(this[_0x8ee634(0x56a)]===undefined)this[_0x8ee634(0x4f1)]();return this[_0x8ee634(0x56a)];},Game_Party[_0x44fc42(0x532)]['setLastGainedItemData']=function(_0x28fbad,_0x419ab2){const _0xe5b65b=_0x44fc42;if(this[_0xe5b65b(0x56a)]===undefined)this[_0xe5b65b(0x4f1)]();if(!_0x28fbad)return;if(DataManager[_0xe5b65b(0x2d1)](_0x28fbad))this[_0xe5b65b(0x56a)]['type']=0x0;else{if(DataManager[_0xe5b65b(0x48b)](_0x28fbad))this[_0xe5b65b(0x56a)]['type']=0x1;else DataManager['isArmor'](_0x28fbad)&&(this[_0xe5b65b(0x56a)][_0xe5b65b(0x3b8)]=0x2);}this['_lastGainedItemData']['id']=_0x28fbad['id'],this['_lastGainedItemData']['quantity']=_0x419ab2;},VisuMZ['MessageCore'][_0x44fc42(0x1ec)]=Game_Party[_0x44fc42(0x532)][_0x44fc42(0x30c)],Game_Party[_0x44fc42(0x532)][_0x44fc42(0x30c)]=function(_0x27d3c3,_0x5226c6,_0x573a38){const _0x2691ba=_0x44fc42;VisuMZ['MessageCore'][_0x2691ba(0x1ec)][_0x2691ba(0x1d8)](this,_0x27d3c3,_0x5226c6,_0x573a38),_0x5226c6>0x0&&this[_0x2691ba(0x27d)](_0x27d3c3,_0x5226c6);},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x3df)]=Game_Map['prototype']['initialize'],Game_Map[_0x44fc42(0x532)]['initialize']=function(){const _0x56f530=_0x44fc42;VisuMZ[_0x56f530(0x4cc)]['Game_Map_initialize'][_0x56f530(0x1d8)](this),this[_0x56f530(0x33b)]=[];},VisuMZ[_0x44fc42(0x4cc)]['Game_Map_setupEvents']=Game_Map[_0x44fc42(0x532)][_0x44fc42(0x4b9)],Game_Map[_0x44fc42(0x532)][_0x44fc42(0x4b9)]=function(){const _0x34ca7a=_0x44fc42;VisuMZ['MessageCore']['Game_Map_setupEvents'][_0x34ca7a(0x1d8)](this),this['_messageCommonEvents']=[];},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x4c7)]=Game_Map['prototype'][_0x44fc42(0x2ed)],Game_Map[_0x44fc42(0x532)][_0x44fc42(0x2ed)]=function(){const _0x12a8b6=_0x44fc42;VisuMZ['MessageCore'][_0x12a8b6(0x4c7)][_0x12a8b6(0x1d8)](this),this[_0x12a8b6(0x239)]();},Game_Map[_0x44fc42(0x532)][_0x44fc42(0x1d1)]=function(_0x3ac4c3){const _0x3ece4e=_0x44fc42;if(!$dataCommonEvents[_0x3ac4c3])return;this[_0x3ece4e(0x33b)]=this['_messageCommonEvents']||[];const _0x815868=this[_0x3ece4e(0x268)][_0x3ece4e(0x297)],_0x4a1cc6=new Game_MessageCommonEvent(_0x3ac4c3,_0x815868);this[_0x3ece4e(0x33b)][_0x3ece4e(0x3a1)](_0x4a1cc6);},Game_Map['prototype']['updateMessageCommonEvents']=function(){const _0x4a73ac=_0x44fc42;this[_0x4a73ac(0x33b)]=this['_messageCommonEvents']||[];for(const _0x1a7f74 of this['_messageCommonEvents']){!_0x1a7f74[_0x4a73ac(0x268)]?this['_messageCommonEvents']['remove'](_0x1a7f74):_0x1a7f74[_0x4a73ac(0x41d)]();}},VisuMZ[_0x44fc42(0x4cc)]['Game_Map_refresh']=Game_Map[_0x44fc42(0x532)][_0x44fc42(0x4fd)],Game_Map[_0x44fc42(0x532)][_0x44fc42(0x4fd)]=function(){const _0x2a0030=_0x44fc42;VisuMZ[_0x2a0030(0x4cc)]['Game_Map_refresh'][_0x2a0030(0x1d8)](this),$gameScreen[_0x2a0030(0x391)]();},Game_Interpreter[_0x44fc42(0x2ad)]=pluginData[_0x44fc42(0x247)],Game_Interpreter[_0x44fc42(0x532)][_0x44fc42(0x49d)]=function(_0x4626a3){const _0x8025e9=_0x44fc42;if($gameMessage['isBusy']())return![];return this[_0x8025e9(0x498)](_0x4626a3),this['addContinuousShowTextCommands'](_0x4626a3),this[_0x8025e9(0x579)](_0x4626a3),this[_0x8025e9(0x497)]('message'),!![];},Game_Interpreter['prototype'][_0x44fc42(0x498)]=function(_0x5b48cf){const _0x2fed62=_0x44fc42;$gameMessage[_0x2fed62(0x49b)](_0x5b48cf[0x0],_0x5b48cf[0x1]),$gameMessage[_0x2fed62(0x385)](_0x5b48cf[0x2]),$gameMessage[_0x2fed62(0x210)](_0x5b48cf[0x3]),$gameMessage['setSpeakerName'](_0x5b48cf[0x4]);},Game_Interpreter[_0x44fc42(0x532)][_0x44fc42(0x35c)]=function(_0x296e4d){const _0xa2ad38=_0x44fc42;while(this[_0xa2ad38(0x3d9)]()){this[_0xa2ad38(0x1dd)]++;if(this[_0xa2ad38(0x581)]()['code']===0x191){let _0x346842=this[_0xa2ad38(0x581)]()[_0xa2ad38(0x464)][0x0];_0x346842=VisuMZ['MessageCore'][_0xa2ad38(0x1d3)](_0x346842),$gameMessage[_0xa2ad38(0x501)](_0x346842);}if(this[_0xa2ad38(0x21d)]())break;}},Game_Interpreter[_0x44fc42(0x532)][_0x44fc42(0x3d9)]=function(){const _0x4eb4bb=_0x44fc42;return this['nextEventCode']()===0x65&&$gameSystem[_0x4eb4bb(0x493)]()>0x4?!![]:this[_0x4eb4bb(0x2ea)]()===0x191;},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x1d3)]=function(_0x2e79b5){const _0x1173db=_0x44fc42,_0x58e8de=VisuMZ['MessageCore']['Settings']['General'];return _0x2e79b5=(_0x58e8de[_0x1173db(0x535)]||'')+_0x2e79b5+(_0x58e8de['EachMessageEnd']||''),_0x2e79b5=_0x2e79b5[_0x1173db(0x251)](/<(?:NEXT PAGE|NEXTPAGE)>/gi,''),_0x2e79b5=_0x2e79b5['replace'](/<(?:RNG|RAND|RANDOM)>(.*?)<\/(?:RNG|RAND|RANDOM)>/gi,(_0x3267fc,_0x24e1dc)=>this[_0x1173db(0x2e3)](_0x24e1dc)),_0x2e79b5;},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x2e3)]=function(_0x39b2f6){const _0x27c9bd=_0x44fc42,_0x4fb6f8=_0x39b2f6[_0x27c9bd(0x43a)]('|')['map'](_0x6f888d=>_0x6f888d['trim']())[_0x27c9bd(0x486)]('')[_0x27c9bd(0x486)](null);return _0x4fb6f8[Math[_0x27c9bd(0x263)](_0x4fb6f8['length'])];},Game_Interpreter[_0x44fc42(0x532)][_0x44fc42(0x21d)]=function(){const _0x18acc1=_0x44fc42;if(this[_0x18acc1(0x581)]()&&this[_0x18acc1(0x581)]()['parameters'][0x0][_0x18acc1(0x523)](/<(?:NEXT PAGE|NEXTPAGE)>/gi))return!![];return $gameMessage[_0x18acc1(0x21c)]['length']>=$gameSystem[_0x18acc1(0x493)]()&&this[_0x18acc1(0x2ea)]()!==0x191;},Game_Interpreter[_0x44fc42(0x532)][_0x44fc42(0x579)]=function(_0xf23b7e){const _0x2649f4=_0x44fc42;switch(this[_0x2649f4(0x2ea)]()){case 0x66:this[_0x2649f4(0x1dd)]++,this['setupChoices'](this[_0x2649f4(0x581)]()[_0x2649f4(0x464)]);break;case 0x67:this['_index']++,this[_0x2649f4(0x203)](this['currentCommand']()[_0x2649f4(0x464)]);break;case 0x68:this[_0x2649f4(0x1dd)]++,this['setupItemChoice'](this['currentCommand']()['parameters']);break;case 0x165:const _0x3cf1b7=this['_list'][this[_0x2649f4(0x1dd)]+0x1],_0x29c2ec=_0x3cf1b7[_0x2649f4(0x464)];_0x29c2ec[0x0]===Game_Interpreter[_0x2649f4(0x2ad)]&&this['prepareShowTextPluginCommandFollowups'](_0x29c2ec);break;}},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x3c2)]=Game_Interpreter[_0x44fc42(0x532)][_0x44fc42(0x519)],Game_Interpreter[_0x44fc42(0x532)][_0x44fc42(0x519)]=function(_0x2349b5){const _0x4d2b42=_0x44fc42;_0x2349b5=this[_0x4d2b42(0x201)](),VisuMZ[_0x4d2b42(0x4cc)]['Game_Interpreter_setupChoices'][_0x4d2b42(0x1d8)](this,_0x2349b5),$gameMessage[_0x4d2b42(0x3bf)]();},Game_Interpreter[_0x44fc42(0x532)]['addContinuousShowChoices']=function(){const _0x1cafab=_0x44fc42,_0xda825c=this[_0x1cafab(0x1dd)],_0x187081=[];let _0x4cca8e=0x0;this[_0x1cafab(0x1dd)]++;while(this['_index']<this[_0x1cafab(0x36b)][_0x1cafab(0x2a3)]){if(this[_0x1cafab(0x581)]()[_0x1cafab(0x2fb)]===this[_0x1cafab(0x476)]){if(this[_0x1cafab(0x581)]()[_0x1cafab(0x21f)]===0x194&&this[_0x1cafab(0x2ea)]()!==0x66)break;else{if(this[_0x1cafab(0x581)]()[_0x1cafab(0x21f)]===0x66)this[_0x1cafab(0x589)](_0x4cca8e,this[_0x1cafab(0x581)](),_0xda825c),this['_index']-=0x2;else this[_0x1cafab(0x581)]()[_0x1cafab(0x21f)]===0x192&&(this[_0x1cafab(0x581)]()['parameters'][0x0]=_0x4cca8e,_0x4cca8e++);}}this[_0x1cafab(0x1dd)]++;}return this['_index']=_0xda825c,this['currentCommand']()[_0x1cafab(0x464)];},Game_Interpreter[_0x44fc42(0x532)][_0x44fc42(0x589)]=function(_0x284244,_0x42f961,_0x19a9a6){const _0x529de7=_0x44fc42;this[_0x529de7(0x57e)](_0x284244,_0x42f961,_0x19a9a6),this[_0x529de7(0x281)](_0x284244,_0x42f961,_0x19a9a6),this[_0x529de7(0x555)](_0x42f961,_0x19a9a6);},Game_Interpreter[_0x44fc42(0x532)][_0x44fc42(0x57e)]=function(_0xddeb1e,_0x5b3869,_0x58fdb0){const _0x2ffb43=_0x44fc42;if(_0x5b3869[_0x2ffb43(0x464)][0x2]<0x0)return;const _0x2ccfed=_0x5b3869[_0x2ffb43(0x464)][0x2]+_0xddeb1e;this[_0x2ffb43(0x36b)][_0x58fdb0]['parameters'][0x2]=_0x2ccfed;},Game_Interpreter[_0x44fc42(0x532)][_0x44fc42(0x281)]=function(_0x3cb9ee,_0x26f039,_0xcfcea5){const _0x39b776=_0x44fc42;if(_0x26f039[_0x39b776(0x464)][0x1]>=0x0){var _0x197ef9=_0x26f039['parameters'][0x1]+_0x3cb9ee;this[_0x39b776(0x36b)][_0xcfcea5][_0x39b776(0x464)][0x1]=_0x197ef9;}else _0x26f039[_0x39b776(0x464)][0x1]===-0x2&&(this[_0x39b776(0x36b)][_0xcfcea5][_0x39b776(0x464)][0x1]=_0x26f039['parameters'][0x1]);},Game_Interpreter[_0x44fc42(0x532)]['addExtraShowChoices']=function(_0x72f682,_0x113542){const _0x3b02ae=_0x44fc42;for(const _0x59841f of _0x72f682[_0x3b02ae(0x464)][0x0]){this[_0x3b02ae(0x36b)][_0x113542][_0x3b02ae(0x464)][0x0][_0x3b02ae(0x3a1)](_0x59841f);}this[_0x3b02ae(0x36b)][_0x3b02ae(0x36c)](this['_index']-0x1,0x2);},Game_Interpreter[_0x44fc42(0x532)][_0x44fc42(0x35d)]=function(_0x46d9d6){const _0x145bb6=_0x44fc42,_0x1ba517=_0x46d9d6[0x1];if(_0x1ba517==='SelectWeapon')this[_0x145bb6(0x1dd)]++,this[_0x145bb6(0x3cb)](_0x46d9d6);else{if(_0x1ba517==='SelectArmor')this[_0x145bb6(0x1dd)]++,this[_0x145bb6(0x2b4)](_0x46d9d6);else _0x1ba517===_0x145bb6(0x28b)&&Imported[_0x145bb6(0x4b0)]&&(this[_0x145bb6(0x1dd)]++,this[_0x145bb6(0x4c4)](_0x46d9d6));}},Game_Interpreter[_0x44fc42(0x532)][_0x44fc42(0x3cb)]=function(_0x4f0bc6){const _0x4804df=_0x44fc42,_0x2a6469=JSON['parse'](JSON['stringify'](_0x4f0bc6[0x3]));VisuMZ[_0x4804df(0x2e1)](_0x2a6469,_0x2a6469),$gameMessage['setWeaponChoice'](_0x2a6469[_0x4804df(0x37b)]||0x0,_0x2a6469[_0x4804df(0x259)]||0x0);},Game_Interpreter['prototype'][_0x44fc42(0x2b4)]=function(_0x2774bf){const _0x16e45a=_0x44fc42,_0x5557ef=JSON['parse'](JSON[_0x16e45a(0x325)](_0x2774bf[0x3]));VisuMZ[_0x16e45a(0x2e1)](_0x5557ef,_0x5557ef),$gameMessage[_0x16e45a(0x2b4)](_0x5557ef[_0x16e45a(0x37b)]||0x0,_0x5557ef[_0x16e45a(0x215)]||0x0,_0x5557ef[_0x16e45a(0x3f9)]||0x0);},Game_Interpreter[_0x44fc42(0x532)][_0x44fc42(0x4c4)]=function(_0x9420c3){const _0x228183=_0x44fc42,_0x31f4b1=JSON['parse'](JSON[_0x228183(0x325)](_0x9420c3[0x3]));VisuMZ['ConvertParams'](_0x31f4b1,_0x31f4b1),$gameMessage[_0x228183(0x4c4)](_0x31f4b1['VariableID']||0x0,_0x31f4b1[_0x228183(0x1e2)]||0x0,_0x31f4b1[_0x228183(0x50f)]||0x0);};function Game_MessageCommonEvent(){const _0x2cb6fa=_0x44fc42;this[_0x2cb6fa(0x4ef)](...arguments);}function _0x2bcd(){const _0x1f758d=['setupEvents','postFlushTextState','\x1bTEXTALIGNMENT','status','messageCoreWindowX','HIDE','Wow','itemRect','drawCustomBackgroundColor','erasePictureTextBuffer','registerResetRect','setSkillChoice','itemRectWithPadding','English','Game_Map_updateEvents','normalColor','\x1bTEXTALIGNMENT[1]','getConfigValue','updateChoiceListHelpWindowPlacement','MessageCore','left','upleft','toLowerCase','addMessageCoreCommands','getPictureText','Window_Base_textSizeEx','choice','down-left','bitmap','CreateAutoColorRegExpListEntries','Thai','Distance','பிரியாவிடை','_pictureId','skill','itemChoiceAtypeId','rtl','up-center','process_VisuMZ_MessageCore_AutoColor','updateAutoPosition','setChoiceListHelpWindow','_helpWindow','_messageOffsetY','Armors','Vay','statusText','こんにちは','AddAutoColor','convertBackslashCharacters','#6dcff6','windowX','right','COLORLOCK','</B>','initialize','includes','initMessageCore','Greek','onDatabaseLoaded','prepareWordWrapEscapeCharacters','SHOW','escapeStart','changeValue','ChoiceWindowMinWidth','setPictureTextBuffer','width','AutoColorRegExp','\x1bCASING[3]','refresh','Window_Base_processEscapeCharacter','equipSlots','Unnamed.ttf','add','6190638zFkxsy','_macroBypassWordWrap','trim','menu','\x1bWrapBreak[0]','clearCommandList','choiceTextAlign','prepareAutoSizeEscapeCharacters','charAt','Good-bye','Window_Message_synchronizeNameBox','preConvertEscapeCharacters','ChoiceWindowTextAlign','SkillTypeID','index','ParseWeaponNotetags','getLastPluginCommandInterpreter','dirname','अलविदा','callCancelHandler','isClosed','drawTextTopAligned','boxHeight','setupChoices','convertLockColorsEscapeCharacters','startPause','messageWidth','Adiós','_spriteset','test','fontFace','ConfigManager_applyData','up\x20right','match','currentExt','battle\x20actor','Salut','setTextDelay','convertVariableEscapeCharacters','messageCoreTextSpeed','CASING','weapon','Näkemiin','down-center','forEach','_scene','ChoiceWindowMaxRows','ARRAYSTR','prototype','autoPositionOffsetX','lowercenter','EachMessageStart','contents','NonSupportedTextCodes','createTextState','_textMacroFound','yellow','changeVolume','autoPositionOffsetY','callOkHandler','messageWordWrap','down\x20right','COMMONEVENT','Undefined','1951200WSGfRl','yes','processCommonEvent','join','messageWindowRect','PictureTextErase','_scriptCall','defeat','WordWrap','switchOutTextForLocalization','processPxTextCode','ParseClassNotetags','Window_Base_processNewLine','वाह','setChoiceListMaxRows','MessageWindowXyOffsets','GET','Selamat\x20tinggal','addedHeight','addExtraShowChoices','ShuffleArray','SplitJpCnCharacters','down\x20center','changeVisuMzTextLocale','_pictureTextSprite','Game_Party_initialize','itemBackColor2','CheckCompatibility','Bengali','_autoColorActorNames','obtainExp','getInputButtonString','convertChoiceMacros','stretchDimmerSprite','anyPictureTextChanges','getLocalizedText','Window_Message_updatePlacement','convertNewPageTextStateMacros','choiceAlignText','createContents','_lastGainedItemData','choiceMinWidth','mainFontSize','ว้าว','Window_Message_processEscapeCharacter','SWITCH','in\x20order\x20for\x20VisuMZ_1_MessageCore\x20to\x20work.','powerDownColor','makeFontBigger','choiceListHelpWindowRect','Bitmap_drawTextTopAligned','TextSpeed','clearActorNameAutoColor','calcMoveEasing','বিদায়','prepareShowTextFollowups','Swedish','downleft','battle\x20enemy','Romanian','adjustShowChoiceDefault','4573796gUwruy','processAutoColorWords','currentCommand','lowerleft','_choiceListHelpWindow','_wholeMoveDuration','_messagePositionReset','Actors','</I>','ParseItemNotetags','adjustShowChoiceExtension','loadPicture','textSpeed','addMessageCoreTextSpeedCommand','さようなら','clamp','_itemChoiceAtypeId','actorName','down\x20left','isVolumeSymbol','maxShuffleChoices','ConvertDefault','_textDelayCount','contentsBack','</LEFT>','midleft','actor','blt','getLanguageAt','commandName','process_VisuMZ_MessageCore_TextCodes_Replace','changeTextSpeed','_moveTargetHeight','FastForwardKey','substring','resetPositionX','makeCommandListShuffle','\x1bWrapJpBreak[0]','Viszontlátásra','activate','isTriggered','startX','addMessageCommonEvent','\x1bCASING[2]','ParseAddedText','$dataLocalization','<I>','resetTextColor','8935930xvWIOU','call','JSON','NameBoxWindowOffsetY','Halo','clearPictures','_index','TextCodeActions','updateRelativePosition','updatePlacement','Waouh','ActorID','indexOf','CSV\x20file\x20has\x20not\x20been\x20made.\x0a','Sprite_Picture_update','resizePictureText','updateTransform','textLocale','processEscapeCharacter','_autoPosRegExp','obtainGold','Game_Party_gainItem','outlineColor','#c69c6d','exec','convertButtonAssistEscapeCharacters','updateOverlappingY','Window_Base_processAllText','addLoadListener','Window_Base_update','boxWidth','HelpWindow','8738642IXtctK','numVisibleRows','upper-center','</WORDWRAP>','createChoiceListWindow','isWordWrapEnabled','#a186be','textCodeCheck','_textColorStack','charCodeAt','addContinuousShowChoices','drawTextEx','setupNumInput','makeCommandListScriptCall','convertShowChoiceEscapeCodes','STRUCT','maxChoiceWidth','_autoSizeCheck','placeCancelButton','path','_moveTargetWidth','Japanese','format','processActorNameAutoColorChanges','FontChangeValue','setPositionType','start','_relativePosition','_showFast','setColorLock','ArmorTypeID','armor','\x1bCOLORLOCK[1]','_forcedPosition','convertTextAlignmentEscapeCharacters','isRTL','move','_texts','isBreakShowTextCommands','makeFontSmaller','code','false','outLineColor','%1,\x20does\x20not\x20support\x20attempted\x20text\x20code\x20usage.','_pictureTextRefresh','Tot\x20ziens','Dutch','getTextAlignment','anchorPictureText','changeTextColor','maxFontSizeInLine','map\x20actor','_nameBoxWindow','processAutoSize','drawText','addWrapBreakAfterPunctuation','convertMessageCoreEscapeReplacements','paintOpacity','processCustomWait','getPictureTextBuffer','constructor','itemChoiceActor','_subject','_itemChoiceWtypeId','Scene_Boot_loadGameFonts','openLocalizationFolder','updateMessageCommonEvents','itemChoiceActorId','_itemChoiceStypeId','16pleFIp','Please\x20restart\x20the\x20game.','processNewLine','crisisColor','Game_Screen_erasePicture','updateMove','onload','Instant','MsgWindowOffsetY','До\x20свидания','setChoices','name','_lastAltCase','isSceneMap','isChoiceWindow','upper-right','<LEFT>','TextStr','Scene_Boot_onDatabaseLoaded','Window_Base_changeTextColor','isVisuMzLocalizationEnabled','replace','_choiceIndexArray','TextJS','drawBackPicture','String_format','processDrawPicture','process_VisuMZ_MessageCore_TextCodes_Action','command357','WeaponTypeID','sort','CsvFilename','PREVCOLOR','Default','CSV\x20file\x20is\x20now\x20created\x20and\x20stored\x20in\x20data\x20folder.\x0a','Norwegian','setChoiceMessageDistance','Window_ChoiceList','loadDatabase','randomInt','UNDEFINED!','registerCommand','updateBitmap','max','_interpreter','84iRVLMH','victory','_MessageCoreSettings','Wauw','OffsetY','upcenter','LanguageFonts','\x1bCOLORLOCK[0]','drawBackground','\x1bI[%1]','PictureTextChange','DefaultLocale','random','\x1bTEXTALIGNMENT[2]','convertCasingEscapeCharacters','_data','exit','convertMessageCoreEscapeActions','ARRAYJSON','สวัสดี','setLastGainedItemData','open','getChoiceListMaxColumns','realPictureId','adjustShowChoiceCancel','General','itemPadding','_textDelay','choicePositionType','Γειά\x20σου','violet','<B>','makeItemList','messageCoreLocalization','SelectSkill','setRelativePosition','Localization','Window_NameBox_updatePlacement','getColor','canMove','வணக்கம்','<%1>','hasPictureText','PictureIDs','LanguageImages','choiceIndexArray','_eventId','ALL','States','onLocalizationXhrError','#ffffff','easeIn','choiceCancelType','outlineWidth','processMessageCoreEscapeActions','_positionType','overrideMimeType','etypeId','length','Window_Base_initialize','erasePicture','(((','changeOutlineColor','updateXyOffsets','white','itemChoiceStypeId','\x1bTEXTALIGNMENT[0]','partyMemberName','MESSAGE_CORE_PLUGIN_NAME','TextAlign','EndPadding','processColorLock','drawItem','setChoiceListMinChoiceWidth','Greeting','setArmorChoice','Game_Message_setChoices','prepareForcedPositionEscapeCharacters','messageRows','getChoiceMessageDistance','ParseAllNotetags','<RIGHT>','maxCols','PICTURE','clearFlags','filter','MessageWidth','anchor','substr','default','parseChoiceText','getLastGainedItemData','Game_System_initialize','contentsHeight','lowerright','lower-center','CENTERPICTURE','textColor','ConvertTextAutoColorRegExpFriendly','_pictures','setMessageWindowWidth','upperleft','applyChoiceHelpDescriptions','Ahoj','isItem','FontSmallerCap','black','ARRAYFUNC','#fbaf5d','loadCustomFontsMessageCore','onChoice','mainFontFace','pagedown','<LINE\x20BREAK>','lineHeight','setChoiceListMaxColumns','updateAutoSizePosition','_resetRect','_wordWrap','TextCodeReplace','ConvertParams','refreshDimmerBitmap','getRandomTextFromPool','convertBaseEscapeCharacters','processTextAlignmentChange','setChoiceListLineHeight','choiceLineHeight','getChoiceListTextAlign','makeData','nextEventCode','Bitmap_drawText','textCodeResult','updateEvents','isOptionValid','getChoiceListMinChoiceWidth','MinWidth','VisuMZ_4_ExtraEnemyDrops','_itemChoiceEtypeId','updatePictureText','requestPictureTextRefresh','ลาก่อน','scale','requestChoiceBackgroundImage','_moveDuration','maxLines','Adeus','indent','Italian','AddOption','loadGameFonts','filename','Wah','application/csv','midright','system','Window_EventItem_includes','fontSize','Window_Options_statusText','onNewPageMessageCore','MaxCols','lower-left','map\x20party','SelectWeapon','gainItem','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','#acacac','moveBy','Do\x20widzenia','ParseSkillNotetags','Window_Options_changeVolume','surprise','ExtraEnemyDrops','convertFontSettingsEscapeCharacters','_maxShuffleChoices','value','ChoiceWindowDistance','Window_Options_isVolumeSymbol','upper-left','#ffc8e0','getStartingChoiceWidth','makeDeepCopy','ConfigManager_makeData','_commonEventId','setText','DefaultOutlineWidth','parse','enabled','isChoiceEnabled','stringify','Window_Command_addCommand','textFont','AutoColor','processControlCharacter','pageup','_moveTargetY','message','findTargetSprite','drawPictureText','_pictureTextWindow','drawChoiceLocationImage','centered','MessageTextDelay','isRunning','dimColor2','3paGgcY','addWindow','Hej','processFsTextCode','currencyUnit','terminateMessage','_messageCommonEvents','LineBreakSpace','changeChoiceBackgroundColor','MaxRows','<WORDWRAP>','Sbohem','Bonjour','onProcessCharacter','Vau','\x1bBOLD[0]','Match','moveTo','quantity','Classes','drawSkillCost','leader','databaseObjectName','Merhaba','CreateAutoColorRegExpLists','list','9qadust','description','processFailsafeChoice','isHelpWindowWordWrap','ParseEnemyNotetags','Au\x20revoir','addChoiceDistance','Sprite_Picture_updateBitmap','isOpen','_targets','getChoiceListLineHeight','convertHardcodedEscapeReplacements','buffer','addContinuousShowTextCommands','prepareShowTextPluginCommandFollowups','faceWidth','processTextCasing','VisuMZ_4_ExtraEnemyDrops\x20needs\x20to\x20be\x20updated\x20','addGeneralOptions','getPictureTextData','isMessageWindowWordWrap','newPage','createChoiceListHelpWindow','WORD_WRAP_PADDING','pink','flushTextState','SortObjectByKeyLength','হ্যালো','_list','splice','setWordWrap','<BR>','postConvertEscapeCharacters','_pictureTextHeight','resetRect','_itemChoiceActorId','\x1bi[%1]%2','ARRAYEVAL','min','updateOffsetPosition','\x1bTEXTALIGNMENT[3]','Indonesian','actorSlotName','getSkillTypes','VariableID','_pictureTextCache','applyDatabaseAutoColor','battleActionName','down','text','PictureTextRefresh','makeCommandList','followers','#7cc576','setBackground','TextManager_message','Enable','floor','down-right','itemHeight','processWrapBreak','createPictureText','isColorLocked','_messageOffsetX','WRAPBREAK','FUNC','requestPictureTextRefreshAll','ITALIC','German','clearChoiceHelpDescriptions','show','log','ParseLocalizationCsv','ceil','updateNameBoxMove','_messageWindow','middleright','Key','Type','drawing','textSizeEx','\x1bCASING[0]','push','Window_Message_newPage','bind','updateDimensions','getChoiceListMaxRows','MessageWindow','itemChoiceItypeId','windowWidth','Scene_Message_createChoiceListWindow','Farvel','addedWidth','SelectArmor','lastGainedObjectQuantity','obtainItem','outputWidth','upperright','calcWindowHeight','WRAPJPBREAK','MessageWindowProperties','ChoiceWindowMaxCols','drawItemContents','VisuMZ_0_CoreEngine','안녕하세요','type','Window_ChoiceList_callCancelHandler','Portuguese','toUpperCase','_refreshPauseSign','send','wtypeId','setupShuffleChoices','Uau','_itemChoiceVariableId','Game_Interpreter_setupChoices','easeInOut','_moveTargetX','ChoiceWindowProperties','Would\x20you\x20like\x20the\x20plugin\x20to\x20create\x20the\x20base\x20CSV\x20file?\x0a\x0a','_target','crisis','process_VisuMZ_MessageCore_TextMacros','item','setWeaponChoice','returnPreservedFontSettings','maxCommands','Scene_Options_maxCommands','_textCasing','Window_NameBox_refresh','_pictureTextWidth','Guau','ENABLE','data/','_choices','getMessageWindowWidth','launchMessageCommonEvent','Items','isContinuePrepareShowTextCommands','attachPictureText','needsPictureTextRefresh','\x1bC[%1]%2\x1bPREVCOLOR[0]','processPyTextCode','AdjustRect','Game_Map_initialize','DISABLE','drawItemNumber','loadBitmap','_autoSizeRegexp','ParseArmorNotetags','Olá','follower','ওহে','Window_Help_refresh','textSpeedStatusText','choiceDistance','STR','iconIndex','_cancelButton','Slovak','1411865zmrZkk','realignMapName','fontItalic','applyMoveEasing','getChoiceIndent','_colorLock','up\x20center','reduce','Weapons','middleleft','EquipTypeID','_textCasingUpperState','Farewell','getMessageWindowXyOffsets','map\x20player','height','</COLORLOCK>','lastGainedObjectName','setLastPluginCommandInterpreter','processCharacter','\x1bCASING[1]','up\x20left','Ha\x20det','openness','close','Hűha','addChildAt','synchronizeNameBox','ஆஹா','shift','MessageRows','version','itemBackColor1','CommonEvent','OffsetX','NUM','AutoColorBypassList','34684bTQtNm','choiceRows','Settings','needsNewPage','fallbackFonts','fontBold','defaultColor','every','drawPictureTextZone','update','colSpacing','refreshWithTextCodeSupport','SWITCHES','#f26c4f','visible','parseLocalizedText','preFlushTextState','innerWidth','textSizeExRaw','processFontChangeItalic','visuMzTextLocaleStatusText','processTextAlignmentX','zoomScale','preemptive','_autoPositionTarget','unshift','setPictureText','eraseAllPictureTexts','emerge','addCommand','unnamed','convertTextMacros','deactivate','ParseStateNotetags','instantTextSpeed','Width','RelativePXPY','Ciao','split','_currentAutoSize','processDrawCenteredPicture','makeSkillList','BOLD','addMessageCoreLocalizationCommand','strokeRect','Chinese(Simplified)','Hoşça\x20kal','Window_ChoiceList_updatePlacement','_centerMessageWindow','isChoiceVisible','convertButtonAssistText','lower\x20left','Turkish','innerHeight','clearAllPictureTexts','setup','hide','map','MsgWindowOffsetX','downright','processAllText','_moveEasingType','obtainEscapeParam','_itemChoiceItypeId','obtainEscapeString','Window_Message_terminateMessage','LineHeight','93aHFdTz','Game_Interpreter_PluginCommand','choices','ARRAYNUM','Enemies','French','_pictureText','getLanguageName','Window_Base_processControlCharacter','some','up-right','Window_ItemList_drawItemNumber','gradientFillRect','parameters','selectDefault','ImageManager_loadBitmap','drawBackCenteredPicture','requestChoiceForegroundImage','Window_Message_needsNewPage','battle\x20party','setTextAlignment','lower\x20center','onLocalizationXhrLoad','textWidth','upper\x20right','start\x20.\x5cdata','FontBiggerCap','Вау','faceName','CreateAutoColorFor','map\x20event','_indent','Hei','ChoiceWindowLineHeight','helpWordWrap','round','isSkill','_choiceHelpDescriptions','createLocalizationCsvFile','return\x200','Arrivederci','Zbohom','StretchDimmedBg','Languages','inputtingAction','isSceneBattle','isAutoColorAffected','remove','apply','clear','_pictureTextBuffer','Szia','isWeapon','battleTargetName','itemChoiceEtypeId','Window_Options_addGeneralOptions','none','mainModule','setMessageWindowXyOffsets','slice','getMessageWindowRows','_textAlignment','Filename','processAutoPosition','setWaitMode','prepareShowTextCommand','itemChoiceWtypeId','writeFileSync','setFaceImage','textSizeExTextAlignment','command101','clearRect','clampPlacementPosition','getPreservedFontSettings','setMessageWindowWordWrap','setMessageWindowRows','load','resetWordWrap','VisuMZ_3_ActSeqCamera','updateHelp','processPreviousColor','center','#707070','_choiceListWindow','upper\x20left','Danish','gray','Name','padding','VisuMZ_1_SkillsStatesCore','outputHeight','members','clearPictureTextRefresh','choiceCols','registerActorNameAutoColorChanges','TextMacros','VisuMZ_1_EventsMoveCore','registerSelfEvent'];_0x2bcd=function(){return _0x1f758d;};return _0x2bcd();}Game_MessageCommonEvent['prototype'][_0x44fc42(0x4ef)]=function(_0x417f3a,_0x1edcf0){const _0x4f8135=_0x44fc42;this[_0x4f8135(0x31f)]=_0x417f3a,this[_0x4f8135(0x297)]=_0x1edcf0||0x0,this[_0x4f8135(0x4fd)]();},Game_MessageCommonEvent[_0x44fc42(0x532)]['event']=function(){const _0x31541d=_0x44fc42;return $dataCommonEvents[this[_0x31541d(0x31f)]];},Game_MessageCommonEvent[_0x44fc42(0x532)][_0x44fc42(0x34e)]=function(){return this['event']()['list'];},Game_MessageCommonEvent[_0x44fc42(0x532)]['refresh']=function(){const _0x12f2b7=_0x44fc42;this[_0x12f2b7(0x268)]=new Game_Interpreter(),this[_0x12f2b7(0x268)][_0x12f2b7(0x44b)](this[_0x12f2b7(0x34e)](),this[_0x12f2b7(0x297)]);},Game_MessageCommonEvent[_0x44fc42(0x532)][_0x44fc42(0x41d)]=function(){const _0x2485c5=_0x44fc42;this['_interpreter']&&(this['_interpreter'][_0x2485c5(0x333)]()?this['_interpreter']['update']():this[_0x2485c5(0x488)]());},Game_MessageCommonEvent[_0x44fc42(0x532)][_0x44fc42(0x488)]=function(){this['_interpreter']=null;},Scene_Message['prototype'][_0x44fc42(0x546)]=function(){const _0x5d309e=_0x44fc42,_0x51fd2a=Math[_0x5d309e(0x375)](Graphics[_0x5d309e(0x4fa)],$gameSystem[_0x5d309e(0x3d6)]()),_0x325494=$gameSystem[_0x5d309e(0x493)](),_0x517881=this[_0x5d309e(0x3b1)](_0x325494,![]),_0x37bc9c=(Graphics['boxWidth']-_0x51fd2a)/0x2,_0x546d71=0x0;return new Rectangle(_0x37bc9c,_0x546d71,_0x51fd2a,_0x517881);},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x3a9)]=Scene_Message[_0x44fc42(0x532)]['createChoiceListWindow'],Scene_Message[_0x44fc42(0x532)][_0x44fc42(0x1fb)]=function(){const _0x1124f8=_0x44fc42;VisuMZ[_0x1124f8(0x4cc)][_0x1124f8(0x3a9)][_0x1124f8(0x1d8)](this),this[_0x1124f8(0x365)]();},Scene_Message[_0x44fc42(0x532)][_0x44fc42(0x365)]=function(){const _0x2d036d=_0x44fc42,_0x2caf25=this[_0x2d036d(0x573)](),_0x141022=new Window_Help(_0x2caf25);_0x141022[_0x2d036d(0x44c)](),this[_0x2d036d(0x4aa)]['setHelpWindow'](_0x141022),this[_0x2d036d(0x39a)]['setChoiceListHelpWindow'](_0x141022),this[_0x2d036d(0x336)](_0x141022),this['_choiceListHelpWindow']=_0x141022;},Scene_Message[_0x44fc42(0x532)][_0x44fc42(0x573)]=function(){const _0x101755=_0x44fc42,_0x20fe3d=0x0,_0x143c99=0x0,_0x162f44=Graphics['boxWidth'],_0x4707fe=this[_0x101755(0x3b1)](0x2,![]);return new Rectangle(_0x20fe3d,_0x143c99,_0x162f44,_0x4707fe);},Window_Message['prototype'][_0x44fc42(0x4e1)]=function(_0x11359f){const _0x58e577=_0x44fc42;this[_0x58e577(0x583)]=_0x11359f;},Window_Message['prototype'][_0x44fc42(0x4cb)]=function(){const _0x599277=_0x44fc42;if(!this[_0x599277(0x583)])return;const _0x162071=this[_0x599277(0x583)];_0x162071&&(_0x162071['y']=this['y']>0x0?0x0:Graphics[_0x599277(0x518)]-_0x162071[_0x599277(0x3fe)]);},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x3ce)]=Scene_Options[_0x44fc42(0x532)][_0x44fc42(0x3cd)],Scene_Options['prototype']['maxCommands']=function(){const _0x27ebda=_0x44fc42;let _0x1918aa=VisuMZ['MessageCore'][_0x27ebda(0x3ce)][_0x27ebda(0x1d8)](this);const _0x5c6298=VisuMZ['MessageCore'][_0x27ebda(0x416)];if(_0x5c6298[_0x27ebda(0x575)][_0x27ebda(0x3de)]){_0x5c6298[_0x27ebda(0x28d)][_0x27ebda(0x2fd)]&&TextManager[_0x27ebda(0x250)]()&&_0x1918aa++;if(_0x5c6298['TextSpeed'][_0x27ebda(0x2fd)])_0x1918aa++;}return _0x1918aa;},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x356)]=Sprite_Picture[_0x44fc42(0x532)][_0x44fc42(0x266)],Sprite_Picture[_0x44fc42(0x532)][_0x44fc42(0x266)]=function(){const _0x44477c=_0x44fc42;VisuMZ[_0x44477c(0x4cc)][_0x44477c(0x356)][_0x44477c(0x1d8)](this),this[_0x44477c(0x38c)]();},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x1e5)]=Sprite_Picture[_0x44fc42(0x532)][_0x44fc42(0x41d)],Sprite_Picture[_0x44fc42(0x532)]['update']=function(){const _0x48fdca=_0x44fc42;VisuMZ[_0x48fdca(0x4cc)][_0x48fdca(0x1e5)][_0x48fdca(0x1d8)](this),this[_0x48fdca(0x2f3)]();},Sprite_Picture[_0x44fc42(0x532)][_0x44fc42(0x2f3)]=function(){const _0x3b9846=_0x44fc42;if(!this[_0x3b9846(0x422)])return;this[_0x3b9846(0x1e6)](),this[_0x3b9846(0x227)](),this[_0x3b9846(0x32e)](),this[_0x3b9846(0x3da)]();},Sprite_Picture[_0x44fc42(0x532)][_0x44fc42(0x38c)]=function(){const _0x569d43=_0x44fc42;if(this[_0x569d43(0x32f)])return;if(this[_0x569d43(0x55a)])return;const _0x362838=new Rectangle(0x0,0x0,0x0,0x0);this[_0x569d43(0x32f)]=new Window_Base(_0x362838),this[_0x569d43(0x32f)][_0x569d43(0x4af)]=0x0,this['_pictureTextSprite']=new Sprite(),this[_0x569d43(0x409)](this[_0x569d43(0x55a)],0x0),this[_0x569d43(0x3d1)]=0x0,this[_0x569d43(0x370)]=0x0,this[_0x569d43(0x37c)]={};},Sprite_Picture[_0x44fc42(0x532)]['resizePictureText']=function(){const _0x5e4729=_0x44fc42;if(!this['_pictureTextWindow'])return;if(this[_0x5e4729(0x3d1)]===this[_0x5e4729(0x4fa)]&&this[_0x5e4729(0x370)]===this['height'])return;this['_pictureTextWidth']=this[_0x5e4729(0x4fa)],this[_0x5e4729(0x370)]=this[_0x5e4729(0x3fe)],this['_pictureTextCache']={},this[_0x5e4729(0x32f)][_0x5e4729(0x21b)](0x0,0x0,this[_0x5e4729(0x4fa)],this[_0x5e4729(0x3fe)]);},Sprite_Picture['prototype'][_0x44fc42(0x227)]=function(){const _0x1ef89e=_0x44fc42;if(!this[_0x1ef89e(0x55a)])return;this[_0x1ef89e(0x55a)][_0x1ef89e(0x2c0)]['x']=this[_0x1ef89e(0x2c0)]['x'],this[_0x1ef89e(0x55a)]['anchor']['y']=this[_0x1ef89e(0x2c0)]['y'];},Sprite_Picture[_0x44fc42(0x532)][_0x44fc42(0x32e)]=function(){const _0x4a23ed=_0x44fc42;if(!this[_0x4a23ed(0x32f)])return;if(!this['anyPictureTextChanges']())return;const _0x21337a=[_0x4a23ed(0x2ce),'up',_0x4a23ed(0x3b0),'left',_0x4a23ed(0x4a8),'right',_0x4a23ed(0x582),'down',_0x4a23ed(0x2c7)];this[_0x4a23ed(0x32f)][_0x4a23ed(0x569)]();for(const _0x114cb8 of _0x21337a){this[_0x4a23ed(0x41c)](_0x114cb8);}},Sprite_Picture[_0x44fc42(0x532)][_0x44fc42(0x564)]=function(){const _0x5b9175=_0x44fc42;if($gameScreen['needsPictureTextRefresh'](this[_0x5b9175(0x4da)]))return!![];const _0x5c362=[_0x5b9175(0x2ce),'up',_0x5b9175(0x3b0),'left',_0x5b9175(0x4a8),_0x5b9175(0x4ec),_0x5b9175(0x582),_0x5b9175(0x37f),_0x5b9175(0x2c7)];for(const _0x4bfed4 of _0x5c362){const _0xf2af9b=$gameScreen['getPictureText'](this[_0x5b9175(0x4da)],_0x4bfed4);if(this[_0x5b9175(0x37c)][_0x4bfed4]===_0xf2af9b)continue;return!![];}return![];},Sprite_Picture[_0x44fc42(0x532)][_0x44fc42(0x41c)]=function(_0x144902){const _0x5069ae=_0x44fc42;$gameScreen['clearPictureTextRefresh'](this[_0x5069ae(0x4da)]);const _0x4eeb4=$gameScreen['getPictureText'](this['_pictureId'],_0x144902);this[_0x5069ae(0x37c)][_0x144902]=_0x4eeb4;const _0x3f76f1=this[_0x5069ae(0x32f)][_0x5069ae(0x39f)](_0x4eeb4);let _0x166d85=$gameScreen[_0x5069ae(0x232)](this[_0x5069ae(0x4da)]),_0x5c97ae=_0x166d85,_0x33d7f9=_0x166d85;if(['up','center',_0x5069ae(0x37f)][_0x5069ae(0x4f0)](_0x144902))_0x5c97ae=Math[_0x5069ae(0x388)]((this[_0x5069ae(0x4fa)]-_0x3f76f1[_0x5069ae(0x4fa)])/0x2);else[_0x5069ae(0x3b0),'right','lowerright'][_0x5069ae(0x4f0)](_0x144902)&&(_0x5c97ae=Math[_0x5069ae(0x388)](this['width']-_0x3f76f1[_0x5069ae(0x4fa)]-_0x166d85));if([_0x5069ae(0x4cd),'center',_0x5069ae(0x4ec)][_0x5069ae(0x4f0)](_0x144902))_0x33d7f9=Math['floor']((this[_0x5069ae(0x3fe)]-_0x3f76f1[_0x5069ae(0x3fe)])/0x2);else[_0x5069ae(0x582),_0x5069ae(0x37f),_0x5069ae(0x2c7)][_0x5069ae(0x4f0)](_0x144902)&&(_0x33d7f9=Math[_0x5069ae(0x388)](this['height']-_0x3f76f1['height']-_0x166d85));this[_0x5069ae(0x32f)][_0x5069ae(0x202)](_0x4eeb4,_0x5c97ae,_0x33d7f9);},Sprite_Picture[_0x44fc42(0x532)][_0x44fc42(0x3da)]=function(){const _0x3662fc=_0x44fc42;if(!this[_0x3662fc(0x32f)])return;if(!this[_0x3662fc(0x55a)])return;this[_0x3662fc(0x55a)][_0x3662fc(0x4d5)]=this[_0x3662fc(0x32f)][_0x3662fc(0x536)];},VisuMZ['MessageCore'][_0x44fc42(0x2a4)]=Window_Base[_0x44fc42(0x532)][_0x44fc42(0x4ef)],Window_Base['prototype'][_0x44fc42(0x4ef)]=function(_0x1e5bd6){const _0x41fd50=_0x44fc42;this['initMessageCore'](_0x1e5bd6),VisuMZ[_0x41fd50(0x4cc)]['Window_Base_initialize'][_0x41fd50(0x1d8)](this,_0x1e5bd6);},Window_Base['prototype'][_0x44fc42(0x4f1)]=function(_0x4c8639){const _0x4aa57c=_0x44fc42;this['initTextAlignement'](),this[_0x4aa57c(0x4a4)](),this[_0x4aa57c(0x4c3)](_0x4c8639);},Window_Base[_0x44fc42(0x532)]['initTextAlignement']=function(){const _0x3342ce=_0x44fc42;this[_0x3342ce(0x46b)](_0x3342ce(0x2c2));},Window_Base[_0x44fc42(0x532)]['setTextAlignment']=function(_0x1940cf){const _0x2b0262=_0x44fc42;this[_0x2b0262(0x494)]=_0x1940cf;},Window_Base[_0x44fc42(0x532)]['getTextAlignment']=function(){const _0x938ead=_0x44fc42;return this[_0x938ead(0x494)];},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x4d2)]=Window_Base[_0x44fc42(0x532)]['textSizeEx'],Window_Base['prototype'][_0x44fc42(0x39f)]=function(_0x529862){const _0x4e096a=_0x44fc42;return this[_0x4e096a(0x4a4)](),VisuMZ[_0x4e096a(0x4cc)]['Window_Base_textSizeEx']['call'](this,_0x529862);},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x426)]=function(_0x3c0e7a){const _0x171f1c=_0x44fc42;return VisuMZ['MessageCore'][_0x171f1c(0x4d2)][_0x171f1c(0x1d8)](this,_0x3c0e7a);},VisuMZ['MessageCore'][_0x44fc42(0x1f2)]=Window_Base['prototype'][_0x44fc42(0x450)],Window_Base[_0x44fc42(0x532)][_0x44fc42(0x450)]=function(_0x5e9fa3){const _0x520c84=_0x44fc42;VisuMZ[_0x520c84(0x4cc)][_0x520c84(0x1f2)][_0x520c84(0x1d8)](this,_0x5e9fa3);if(_0x5e9fa3[_0x520c84(0x39e)])this[_0x520c84(0x46b)](_0x520c84(0x2c2));},Window_Base['prototype'][_0x44fc42(0x4a4)]=function(){const _0x3940f8=_0x44fc42;this[_0x3940f8(0x36d)](![]);},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x1fc)]=function(){const _0xb7b2ec=_0x44fc42;return this[_0xb7b2ec(0x2df)];},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x36d)]=function(_0xfc0920){const _0xd194bb=_0x44fc42;return this[_0xd194bb(0x2df)]=_0xfc0920,'';},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x4c3)]=function(_0x31a950){const _0x33f883=_0x44fc42;this[_0x33f883(0x2de)]=JsonEx['makeDeepCopy'](_0x31a950);},Window_Base[_0x44fc42(0x532)]['resetFontSettings']=function(){const _0x5a3dfc=_0x44fc42;this[_0x5a3dfc(0x536)][_0x5a3dfc(0x520)]=$gameSystem[_0x5a3dfc(0x2d8)](),this[_0x5a3dfc(0x536)][_0x5a3dfc(0x305)]=$gameSystem[_0x5a3dfc(0x56c)](),this[_0x5a3dfc(0x536)][_0x5a3dfc(0x419)]=![],this['contents']['fontItalic']=![],this['_textCasing']=0x0,this[_0x5a3dfc(0x3fa)]=!![],this['resetTextColor']();},Window_Base['prototype']['resetTextColor']=function(){const _0x32a498=_0x44fc42;this[_0x32a498(0x228)](ColorManager[_0x32a498(0x4c8)]()),this[_0x32a498(0x2a7)](ColorManager[_0x32a498(0x1ed)]());const _0x38e024=VisuMZ[_0x32a498(0x4cc)][_0x32a498(0x416)][_0x32a498(0x282)];_0x38e024[_0x32a498(0x321)]===undefined&&(_0x38e024[_0x32a498(0x321)]=0x3),this[_0x32a498(0x536)]['outlineWidth']=_0x38e024['DefaultOutlineWidth'],this[_0x32a498(0x214)](![]);},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x214)]=function(_0x39fc99){const _0x56ecf9=_0x44fc42;this[_0x56ecf9(0x3f4)]=_0x39fc99;},Window_Base[_0x44fc42(0x532)]['isColorLocked']=function(){return this['_colorLock'];},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x485)]=function(){return![];},Window_Base[_0x44fc42(0x532)]['getPreservedFontSettings']=function(){const _0x5c1f34=_0x44fc42,_0x1e3e26=[_0x5c1f34(0x520),_0x5c1f34(0x305),_0x5c1f34(0x419),_0x5c1f34(0x3f1),'textColor',_0x5c1f34(0x221),_0x5c1f34(0x29e),_0x5c1f34(0x230)];let _0x19502b={};for(const _0x82ca1c of _0x1e3e26){_0x19502b[_0x82ca1c]=this[_0x5c1f34(0x536)][_0x82ca1c];}return _0x19502b;},Window_Base['prototype'][_0x44fc42(0x3cc)]=function(_0xd2b1f3){const _0x1fac47=_0x44fc42;for(const _0x93bca9 in _0xd2b1f3){this[_0x1fac47(0x536)][_0x93bca9]=_0xd2b1f3[_0x93bca9];}},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x1f4)]=Window_Base['prototype'][_0x44fc42(0x41d)],Window_Base[_0x44fc42(0x532)][_0x44fc42(0x41d)]=function(){const _0x1470d2=_0x44fc42;VisuMZ[_0x1470d2(0x4cc)]['Window_Base_update'][_0x1470d2(0x1d8)](this),this[_0x1470d2(0x241)]();},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x290)]=function(){return![];},Window_Base[_0x44fc42(0x532)]['updateMove']=function(){const _0x3df580=_0x44fc42;this[_0x3df580(0x2f8)]>0x0&&(this[_0x3df580(0x290)]()&&(this['x']=this['applyMoveEasing'](this['x'],this[_0x3df580(0x3c4)]),this['y']=this[_0x3df580(0x3f2)](this['y'],this[_0x3df580(0x32b)]),this[_0x3df580(0x4fa)]=this[_0x3df580(0x3f2)](this['width'],this['_moveTargetWidth']),this[_0x3df580(0x3fe)]=this[_0x3df580(0x3f2)](this[_0x3df580(0x3fe)],this[_0x3df580(0x1c7)]),this['clampPlacementPosition']()),this[_0x3df580(0x2f8)]--);},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x49f)]=function(_0x3e5da1,_0x459ffb){const _0x55c1bf=_0x44fc42;!_0x3e5da1&&(this[_0x55c1bf(0x4fa)]=Math['min'](this['width'],Graphics[_0x55c1bf(0x4fa)]),this[_0x55c1bf(0x3fe)]=Math['min'](this[_0x55c1bf(0x3fe)],Graphics[_0x55c1bf(0x3fe)]));if(!_0x459ffb){const _0xd76c91=-(Math[_0x55c1bf(0x388)](Graphics[_0x55c1bf(0x4fa)]-Graphics[_0x55c1bf(0x1f5)])/0x2),_0x5c557f=_0xd76c91+Graphics[_0x55c1bf(0x4fa)]-this['width'],_0x189e6f=-(Math[_0x55c1bf(0x388)](Graphics[_0x55c1bf(0x3fe)]-Graphics['boxHeight'])/0x2),_0x259735=_0x189e6f+Graphics[_0x55c1bf(0x3fe)]-this['height'];this['x']=this['x'][_0x55c1bf(0x1b6)](_0xd76c91,_0x5c557f),this['y']=this['y']['clamp'](_0x189e6f,_0x259735);}},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x3f2)]=function(_0x38cca5,_0x2d04ac){const _0x31ba06=_0x44fc42,_0x3bcf7c=this[_0x31ba06(0x2f8)],_0x4e5802=this[_0x31ba06(0x584)],_0x535aa9=this[_0x31ba06(0x577)]((_0x4e5802-_0x3bcf7c)/_0x4e5802),_0x49ee73=this[_0x31ba06(0x577)]((_0x4e5802-_0x3bcf7c+0x1)/_0x4e5802),_0x4f6885=(_0x38cca5-_0x2d04ac*_0x535aa9)/(0x1-_0x535aa9);return _0x4f6885+(_0x2d04ac-_0x4f6885)*_0x49ee73;},Window_Base[_0x44fc42(0x532)]['calcMoveEasing']=function(_0x3a008a){const _0x26c91f=_0x44fc42,_0x16ec76=0x2;switch(this['_moveEasingType']){case 0x0:return _0x3a008a;case 0x1:return this[_0x26c91f(0x29c)](_0x3a008a,_0x16ec76);case 0x2:return this['easeOut'](_0x3a008a,_0x16ec76);case 0x3:return this[_0x26c91f(0x3c3)](_0x3a008a,_0x16ec76);default:return Imported[_0x26c91f(0x3b6)]?VisuMZ[_0x26c91f(0x3f2)](_0x3a008a,this[_0x26c91f(0x451)]):_0x3a008a;}},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x346)]=function(_0x4eaac7,_0x30e3ad,_0x5306c8,_0x3f512f,_0x3fbd66,_0x51cedc){const _0x2b7a32=_0x44fc42;this[_0x2b7a32(0x3c4)]=_0x4eaac7,this[_0x2b7a32(0x32b)]=_0x30e3ad,this[_0x2b7a32(0x20b)]=_0x5306c8||this[_0x2b7a32(0x4fa)],this[_0x2b7a32(0x1c7)]=_0x3f512f||this[_0x2b7a32(0x3fe)],this[_0x2b7a32(0x2f8)]=_0x3fbd66||0x1;if(this[_0x2b7a32(0x2f8)]<=0x0)this['_moveDuration']=0x1;this[_0x2b7a32(0x584)]=this['_moveDuration'],this[_0x2b7a32(0x451)]=_0x51cedc||0x0;if(_0x3fbd66<=0x0)this['updateMove']();},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x30f)]=function(_0x2d029d,_0x2f1e27,_0x204cc6,_0x332cfb,_0x11998f,_0x184696){const _0x162e7a=_0x44fc42;this[_0x162e7a(0x3c4)]=this['x']+_0x2d029d,this[_0x162e7a(0x32b)]=this['y']+_0x2f1e27,this[_0x162e7a(0x20b)]=this[_0x162e7a(0x4fa)]+(_0x204cc6||0x0),this['_moveTargetHeight']=this[_0x162e7a(0x3fe)]+(_0x332cfb||0x0),this[_0x162e7a(0x2f8)]=_0x11998f||0x1;if(this['_moveDuration']<=0x0)this[_0x162e7a(0x2f8)]=0x1;this[_0x162e7a(0x584)]=this[_0x162e7a(0x2f8)],this[_0x162e7a(0x451)]=_0x184696||0x0;if(_0x11998f<=0x0)this[_0x162e7a(0x241)]();},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x371)]=function(_0x181eb5,_0x3366e2){const _0x3be3d3=_0x44fc42;this[_0x3be3d3(0x346)](this[_0x3be3d3(0x2de)]['x'],this['_resetRect']['y'],this[_0x3be3d3(0x2de)][_0x3be3d3(0x4fa)],this[_0x3be3d3(0x2de)]['height'],_0x181eb5,_0x3366e2);},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x24f)]=Window_Base['prototype'][_0x44fc42(0x228)],Window_Base[_0x44fc42(0x532)]['changeTextColor']=function(_0x392bb){const _0x229469=_0x44fc42;if(this[_0x229469(0x38d)]())return;_0x392bb=_0x392bb[_0x229469(0x251)](/\,/g,''),this[_0x229469(0x1ff)]=this[_0x229469(0x1ff)]||[],this[_0x229469(0x1ff)][_0x229469(0x42d)](this[_0x229469(0x536)][_0x229469(0x2ca)]),VisuMZ[_0x229469(0x4cc)][_0x229469(0x24f)]['call'](this,_0x392bb);},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x4a7)]=function(_0x408c12){const _0x3c8f4f=_0x44fc42;this['obtainEscapeParam'](_0x408c12);if(this[_0x3c8f4f(0x38d)]())return;_0x408c12['drawing']&&(this['_textColorStack']=this[_0x3c8f4f(0x1ff)]||[],this['contents']['textColor']=this['_textColorStack'][_0x3c8f4f(0x40c)]()||ColorManager[_0x3c8f4f(0x4c8)]());},Window_Base['prototype']['convertEscapeCharacters']=function(_0x5770b4){const _0x3507c0=_0x44fc42;return _0x5770b4=this[_0x3507c0(0x433)](_0x5770b4),_0x5770b4=this['convertBackslashCharacters'](_0x5770b4),_0x5770b4=this[_0x3507c0(0x528)](_0x5770b4),_0x5770b4=this[_0x3507c0(0x1f0)](_0x5770b4),_0x5770b4=this[_0x3507c0(0x50d)](_0x5770b4),_0x5770b4=this['convertShowChoiceEscapeCodes'](_0x5770b4),_0x5770b4=this['convertFontSettingsEscapeCharacters'](_0x5770b4),_0x5770b4=this[_0x3507c0(0x219)](_0x5770b4),_0x5770b4=this[_0x3507c0(0x51a)](_0x5770b4),_0x5770b4=this[_0x3507c0(0x277)](_0x5770b4),_0x5770b4=this[_0x3507c0(0x2e4)](_0x5770b4),_0x5770b4=this['convertHardcodedEscapeReplacements'](_0x5770b4),_0x5770b4=this[_0x3507c0(0x27a)](_0x5770b4),_0x5770b4=this[_0x3507c0(0x22f)](_0x5770b4),_0x5770b4=this[_0x3507c0(0x36f)](_0x5770b4),_0x5770b4=this[_0x3507c0(0x528)](_0x5770b4),_0x5770b4=this[_0x3507c0(0x580)](_0x5770b4),_0x5770b4=this[_0x3507c0(0x4f4)](_0x5770b4),_0x5770b4;},Window_Base[_0x44fc42(0x532)]['convertTextMacros']=function(_0x1c2e13){const _0x12e9e4=_0x44fc42;this[_0x12e9e4(0x539)]=![];for(const _0x503cc0 of VisuMZ[_0x12e9e4(0x4cc)]['Settings'][_0x12e9e4(0x4b6)]){_0x1c2e13&&_0x1c2e13[_0x12e9e4(0x523)](_0x503cc0[_0x12e9e4(0x1fe)])&&(this[_0x12e9e4(0x539)]=!![],_0x1c2e13=_0x1c2e13['replace'](_0x503cc0[_0x12e9e4(0x1fe)],_0x503cc0['textCodeResult'][_0x12e9e4(0x3a3)](this)));}return _0x1c2e13||'';},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x4e9)]=function(_0x260be7){const _0x509c5d=_0x44fc42;return _0x260be7=_0x260be7[_0x509c5d(0x251)](/\\/g,'\x1b'),_0x260be7=_0x260be7[_0x509c5d(0x251)](/\x1b\x1b/g,'\x5c'),_0x260be7;},Window_Base['prototype']['convertVariableEscapeCharacters']=function(_0x1f783c){const _0x4f2ece=_0x44fc42;for(;;){if(_0x1f783c[_0x4f2ece(0x523)](/\\V\[(\d+)\]/gi))_0x1f783c=_0x1f783c['replace'](/\\V\[(\d+)\]/gi,(_0x479342,_0x41c182)=>this[_0x4f2ece(0x4e9)](String($gameVariables[_0x4f2ece(0x317)](parseInt(_0x41c182)))));else{if(_0x1f783c[_0x4f2ece(0x523)](/\x1bV\[(\d+)\]/gi))_0x1f783c=_0x1f783c[_0x4f2ece(0x251)](/\x1bV\[(\d+)\]/gi,(_0x58dcc0,_0x4ca2a0)=>this[_0x4f2ece(0x4e9)](String($gameVariables[_0x4f2ece(0x317)](parseInt(_0x4ca2a0)))));else break;}}return _0x1f783c;},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x1f0)]=function(_0x288cf0){const _0x4e1e9e=_0x44fc42;return Imported[_0x4e1e9e(0x3b6)]&&(_0x288cf0=_0x288cf0[_0x4e1e9e(0x251)](/<Up (?:KEY|BUTTON)>/gi,this[_0x4e1e9e(0x446)]('up')),_0x288cf0=_0x288cf0[_0x4e1e9e(0x251)](/<Left (?:KEY|BUTTON)>/gi,this[_0x4e1e9e(0x446)](_0x4e1e9e(0x4cd))),_0x288cf0=_0x288cf0['replace'](/<Right (?:KEY|BUTTON)>/gi,this[_0x4e1e9e(0x446)](_0x4e1e9e(0x4ec))),_0x288cf0=_0x288cf0['replace'](/<Down (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x4e1e9e(0x37f))),_0x288cf0=_0x288cf0[_0x4e1e9e(0x251)](/<Ok (?:KEY|BUTTON)>/gi,this[_0x4e1e9e(0x446)]('ok')),_0x288cf0=_0x288cf0['replace'](/<Cancel (?:KEY|BUTTON)>/gi,this[_0x4e1e9e(0x446)]('cancel')),_0x288cf0=_0x288cf0[_0x4e1e9e(0x251)](/<Menu (?:KEY|BUTTON)>/gi,this[_0x4e1e9e(0x446)](_0x4e1e9e(0x505))),_0x288cf0=_0x288cf0['replace'](/<Shift (?:KEY|BUTTON)>/gi,this[_0x4e1e9e(0x446)](_0x4e1e9e(0x40c))),_0x288cf0=_0x288cf0[_0x4e1e9e(0x251)](/<(?:PAGEUP|PAGE UP) (?:KEY|BUTTON)>/gi,this[_0x4e1e9e(0x446)](_0x4e1e9e(0x32a))),_0x288cf0=_0x288cf0[_0x4e1e9e(0x251)](/<(?:PAGEDOWN|PAGEDN|PAGE DOWN) (?:KEY|BUTTON)>/gi,this[_0x4e1e9e(0x446)](_0x4e1e9e(0x2d9)))),_0x288cf0;},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x446)]=function(_0x27860a){const _0x455c0b=_0x44fc42;let _0x3f6b36=TextManager[_0x455c0b(0x561)](_0x27860a)||'';return _0x3f6b36=this[_0x455c0b(0x4e9)](_0x3f6b36),_0x3f6b36=this[_0x455c0b(0x528)](_0x3f6b36),_0x3f6b36[_0x455c0b(0x504)]();},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x50d)]=function(_0x138d2f){const _0x428833=_0x44fc42;return _0x138d2f=this[_0x428833(0x54b)](_0x138d2f),this[_0x428833(0x4b5)](),_0x138d2f;},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x54b)]=function(_0x468e14){return _0x468e14=TextManager['parseLocalizedText'](_0x468e14),_0x468e14;},VisuMZ['MessageCore'][_0x44fc42(0x255)]=String[_0x44fc42(0x532)][_0x44fc42(0x20d)],String[_0x44fc42(0x532)][_0x44fc42(0x20d)]=function(){const _0x23b564=_0x44fc42;let _0x662eb1=this;return _0x662eb1=TextManager[_0x23b564(0x423)](_0x662eb1),VisuMZ[_0x23b564(0x4cc)][_0x23b564(0x255)][_0x23b564(0x487)](_0x662eb1,arguments);},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x2eb)]=Bitmap[_0x44fc42(0x532)]['drawText'],Bitmap[_0x44fc42(0x532)][_0x44fc42(0x22d)]=function(_0x12ee71,_0x27bdc9,_0x5d327a,_0x23e25b,_0x202133,_0x509832){const _0x1af2f9=_0x44fc42;_0x12ee71=TextManager['parseLocalizedText'](_0x12ee71),VisuMZ[_0x1af2f9(0x4cc)][_0x1af2f9(0x2eb)][_0x1af2f9(0x1d8)](this,_0x12ee71,_0x27bdc9,_0x5d327a,_0x23e25b,_0x202133,_0x509832);},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x574)]=Bitmap['prototype']['drawTextTopAligned'],Bitmap['prototype'][_0x44fc42(0x517)]=function(_0x4dce54,_0x274c0e,_0x33dd6b,_0xa77bdb,_0x4e629c,_0x503ab4){const _0x389039=_0x44fc42;_0x4dce54=TextManager[_0x389039(0x423)](_0x4dce54),VisuMZ[_0x389039(0x4cc)][_0x389039(0x574)]['call'](this,_0x4dce54,_0x274c0e,_0x33dd6b,_0xa77bdb,_0x4e629c,_0x503ab4);},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x36f)]=function(_0x30bf0e){return _0x30bf0e;},Window_Base['prototype'][_0x44fc42(0x205)]=function(_0x17fd1c){const _0x922d84=_0x44fc42;return this[_0x922d84(0x24a)]()&&(_0x17fd1c=_0x17fd1c[_0x922d84(0x251)](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/gi,''),_0x17fd1c=_0x17fd1c[_0x922d84(0x251)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x17fd1c=_0x17fd1c[_0x922d84(0x251)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x17fd1c=_0x17fd1c[_0x922d84(0x251)](/<CHOICE WIDTH:[ ](\d+)>/gi,''),_0x17fd1c=_0x17fd1c[_0x922d84(0x251)](/<CHOICE INDENT:[ ](\d+)>/gi,''),_0x17fd1c=_0x17fd1c[_0x922d84(0x251)](/<(?:BGCOLOR|BG COLOR):[ ](.*?)>/gi,''),_0x17fd1c=_0x17fd1c['replace'](/<(?:FG|BG)(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/gi,''),_0x17fd1c=_0x17fd1c[_0x922d84(0x251)](/<(?:FG|BG)(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/gi,'')),_0x17fd1c;},Window_Base[_0x44fc42(0x532)]['isChoiceWindow']=function(){const _0x483d9d=_0x44fc42,_0x26897a=[_0x483d9d(0x261),'Window_MessageLog'];return _0x26897a[_0x483d9d(0x4f0)](this[_0x483d9d(0x233)]['name']);},Window_Base['prototype'][_0x44fc42(0x315)]=function(_0x3c8304){const _0x2016d3=_0x44fc42;return _0x3c8304=_0x3c8304[_0x2016d3(0x251)](/<B>/gi,'\x1bBOLD[1]'),_0x3c8304=_0x3c8304[_0x2016d3(0x251)](/<\/B>/gi,_0x2016d3(0x344)),_0x3c8304=_0x3c8304['replace'](/<I>/gi,'\x1bITALIC[1]'),_0x3c8304=_0x3c8304[_0x2016d3(0x251)](/<\/I>/gi,'\x1bITALIC[0]'),_0x3c8304;},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x219)]=function(_0xa7fea5){const _0x44f7db=_0x44fc42;return _0xa7fea5=_0xa7fea5[_0x44f7db(0x251)](/<LEFT>/gi,_0x44f7db(0x4c9)),_0xa7fea5=_0xa7fea5['replace'](/<\/LEFT>/gi,_0x44f7db(0x2ab)),_0xa7fea5=_0xa7fea5[_0x44f7db(0x251)](/<CENTER>/gi,_0x44f7db(0x276)),_0xa7fea5=_0xa7fea5[_0x44f7db(0x251)](/<\/CENTER>/gi,'\x1bTEXTALIGNMENT[0]'),_0xa7fea5=_0xa7fea5[_0x44f7db(0x251)](/<RIGHT>/gi,_0x44f7db(0x377)),_0xa7fea5=_0xa7fea5[_0x44f7db(0x251)](/<\/RIGHT>/gi,_0x44f7db(0x2ab)),_0xa7fea5;},Window_Base['prototype'][_0x44fc42(0x51a)]=function(_0x3f979f){const _0x286e73=_0x44fc42;return _0x3f979f=_0x3f979f[_0x286e73(0x251)](/<COLORLOCK>/gi,_0x286e73(0x217)),_0x3f979f=_0x3f979f[_0x286e73(0x251)](/<\/COLORLOCK>/gi,_0x286e73(0x270)),_0x3f979f=_0x3f979f[_0x286e73(0x251)](/\(\(\(/gi,_0x286e73(0x217)),_0x3f979f=_0x3f979f[_0x286e73(0x251)](/\)\)\)/gi,'\x1bCOLORLOCK[0]'),_0x3f979f;},Window_Base['prototype']['convertCasingEscapeCharacters']=function(_0x5a2904){const _0x1276be=_0x44fc42;return _0x5a2904=_0x5a2904[_0x1276be(0x251)](/<(?:LC|LOWERCASE|LOWER CASE|LOWER)>/gi,_0x1276be(0x403)),_0x5a2904=_0x5a2904[_0x1276be(0x251)](/<\/(?:LC|LOWERCASE|LOWER CASE|LOWER)>/gi,'\x1bCASING[0]'),_0x5a2904=_0x5a2904[_0x1276be(0x251)](/<(?:UC|UPPERCASE|UPPER CASE|UPPER)>/gi,_0x1276be(0x1d2)),_0x5a2904=_0x5a2904[_0x1276be(0x251)](/<\/(?:UC|UPPERCASE|UPPER CASE|UPPER)>/gi,_0x1276be(0x3a0)),_0x5a2904=_0x5a2904[_0x1276be(0x251)](/<(?:CAPS|CAPSLOCK|CAPS LOCK|CAP)>/gi,_0x1276be(0x4fc)),_0x5a2904=_0x5a2904[_0x1276be(0x251)](/<\/(?:CAPS|CAPSLOCK|CAPS LOCK|CAP)>/gi,_0x1276be(0x3a0)),_0x5a2904=_0x5a2904[_0x1276be(0x251)](/<(?:ALT|ALTERNATE|ALT CASE)>/gi,'\x1bCASING[4]'),_0x5a2904=_0x5a2904['replace'](/<\/(?:ALT|ALTERNATE|ALT CASE)>/gi,_0x1276be(0x3a0)),_0x5a2904=_0x5a2904['replace'](/<(?:CHAOS|CHAOSCASE|CHAOS CASE)>/gi,'\x1bCASING[5]'),_0x5a2904=_0x5a2904[_0x1276be(0x251)](/<\/(?:CHAOS|CHAOSCASE|CHAOS CASE)>/gi,_0x1276be(0x3a0)),_0x5a2904;},Window_Base['prototype'][_0x44fc42(0x2e4)]=function(_0x4ab639){const _0x22e0d6=_0x44fc42;return _0x4ab639=_0x4ab639[_0x22e0d6(0x251)](/\x1bN\[(\d+)\]/gi,(_0x3593bd,_0x46e18e)=>this[_0x22e0d6(0x1b8)](parseInt(_0x46e18e))),_0x4ab639=_0x4ab639[_0x22e0d6(0x251)](/\x1bP\[(\d+)\]/gi,(_0x4bbd52,_0x2801ba)=>this[_0x22e0d6(0x2ac)](parseInt(_0x2801ba))),_0x4ab639=_0x4ab639[_0x22e0d6(0x251)](/\x1bG/gi,TextManager[_0x22e0d6(0x339)]),_0x4ab639;},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x35a)]=function(_0x59c07e){const _0x4ed91c=_0x44fc42;return _0x59c07e=_0x59c07e[_0x4ed91c(0x251)](/\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi,this[_0x4ed91c(0x48c)]()),_0x59c07e=_0x59c07e[_0x4ed91c(0x251)](/\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi,this['battleUserName']()),_0x59c07e=_0x59c07e[_0x4ed91c(0x251)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi,this[_0x4ed91c(0x37e)](!![])),_0x59c07e=_0x59c07e['replace'](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi,this['battleActionName'](![])),_0x59c07e;},Window_Base['prototype'][_0x44fc42(0x48c)]=function(){const _0x296464=_0x44fc42;if(!SceneManager[_0x296464(0x484)]())return'';if(BattleManager[_0x296464(0x3c7)])return BattleManager[_0x296464(0x3c7)][_0x296464(0x247)]();if(BattleManager[_0x296464(0x358)][0x0])return BattleManager['_targets'][0x0][_0x296464(0x247)]();return'';},Window_Base['prototype']['battleUserName']=function(){const _0x476877=_0x44fc42;if(!SceneManager['isSceneBattle']())return'';let _0x5ab2ed=null;return _0x5ab2ed=BattleManager[_0x476877(0x235)],!_0x5ab2ed&&BattleManager['isInputting']()&&(_0x5ab2ed=BattleManager['actor']()),_0x5ab2ed?_0x5ab2ed['name']():'';},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x37e)]=function(_0xe0b3fb){const _0x42618d=_0x44fc42;if(!SceneManager['isSceneBattle']())return'';let _0x40fafe=BattleManager['_action']||null;!_0x40fafe&&BattleManager['isInputting']()&&(_0x40fafe=BattleManager[_0x42618d(0x483)]());if(_0x40fafe&&_0x40fafe['item']()){let _0x1f4b13='';if(_0xe0b3fb)_0x1f4b13+=_0x42618d(0x272)[_0x42618d(0x20d)](_0x40fafe[_0x42618d(0x3ca)]()['iconIndex']);return _0x1f4b13+=_0x40fafe[_0x42618d(0x3ca)]()[_0x42618d(0x247)],_0x1f4b13;}return'';},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x27a)]=function(_0x15fcd0){const _0x293c4e=_0x44fc42;for(const _0x45c6f1 of VisuMZ[_0x293c4e(0x4cc)][_0x293c4e(0x416)][_0x293c4e(0x1de)]){_0x15fcd0[_0x293c4e(0x523)](_0x45c6f1[_0x293c4e(0x1fe)])&&(_0x15fcd0=_0x15fcd0['replace'](_0x45c6f1['textCodeCheck'],_0x45c6f1[_0x293c4e(0x2ec)]),_0x15fcd0=this['convertVariableEscapeCharacters'](_0x15fcd0));}return _0x15fcd0;},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x22f)]=function(_0xb0b109){const _0x5d4acd=_0x44fc42;for(const _0x10079f of VisuMZ[_0x5d4acd(0x4cc)][_0x5d4acd(0x416)][_0x5d4acd(0x2e0)]){_0xb0b109[_0x5d4acd(0x523)](_0x10079f[_0x5d4acd(0x1fe)])&&(_0xb0b109=_0xb0b109[_0x5d4acd(0x251)](_0x10079f[_0x5d4acd(0x1fe)],_0x10079f[_0x5d4acd(0x2ec)][_0x5d4acd(0x3a3)](this)),_0xb0b109=this[_0x5d4acd(0x528)](_0xb0b109));}return _0xb0b109;},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x1b8)]=function(_0x3d8c94){const _0x21aaf8=_0x44fc42,_0x5b554a=_0x3d8c94>=0x1?$gameActors[_0x21aaf8(0x1c1)](_0x3d8c94):null,_0x5d6afe=_0x5b554a?_0x5b554a['name']():'',_0x1286b2=Number(VisuMZ['MessageCore'][_0x21aaf8(0x416)]['AutoColor'][_0x21aaf8(0x586)]);return this[_0x21aaf8(0x485)]()&&_0x1286b2!==0x0?'\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x21aaf8(0x20d)](_0x1286b2,_0x5d6afe):_0x5d6afe;},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x2ac)]=function(_0x557193){const _0x3cbb91=_0x44fc42,_0x34516b=_0x557193>=0x1?$gameParty['members']()[_0x557193-0x1]:null,_0x2914f7=_0x34516b?_0x34516b[_0x3cbb91(0x247)]():'',_0x4ca2be=Number(VisuMZ[_0x3cbb91(0x4cc)][_0x3cbb91(0x416)][_0x3cbb91(0x328)]['Actors']);return this[_0x3cbb91(0x485)]()&&_0x4ca2be!==0x0?_0x3cbb91(0x3dc)['format'](_0x4ca2be,_0x2914f7):_0x2914f7;},Window_Base['prototype'][_0x44fc42(0x580)]=function(_0x26c1ad){const _0x280837=_0x44fc42;return this[_0x280837(0x485)]()&&(_0x26c1ad=this['processStoredAutoColorChanges'](_0x26c1ad),_0x26c1ad=this[_0x280837(0x20e)](_0x26c1ad)),_0x26c1ad;},Window_Base['prototype']['processStoredAutoColorChanges']=function(_0x1eb315){const _0x3a64ee=_0x44fc42;for(autoColor of VisuMZ['MessageCore']['AutoColorRegExp']){_0x1eb315=_0x1eb315[_0x3a64ee(0x251)](autoColor[0x0],autoColor[0x1]);}return _0x1eb315;},Window_Base['prototype'][_0x44fc42(0x576)]=function(){const _0xcf7265=_0x44fc42;this[_0xcf7265(0x55f)]=[];},Window_Base['prototype'][_0x44fc42(0x4b5)]=function(){const _0x116bc5=_0x44fc42;this['clearActorNameAutoColor']();const _0xc22f48=VisuMZ[_0x116bc5(0x4cc)][_0x116bc5(0x416)]['AutoColor'],_0x56d16c=_0xc22f48[_0x116bc5(0x586)];if(_0x56d16c<=0x0)return;for(const _0x169628 of $gameActors[_0x116bc5(0x278)]){if(!_0x169628)continue;const _0x150a24=_0x169628[_0x116bc5(0x247)]();if(_0x150a24[_0x116bc5(0x504)]()[_0x116bc5(0x2a3)]<=0x0)continue;if(/^\d+$/[_0x116bc5(0x51f)](_0x150a24))continue;if(_0x150a24['match'](/-----/i))continue;let _0x2de6fd=VisuMZ[_0x116bc5(0x4cc)][_0x116bc5(0x2cb)](_0x150a24);const _0x242916=new RegExp('\x5cb'+_0x2de6fd+'\x5cb','g'),_0x3a8cdc='\x1bC[%1]%2\x1bPREVCOLOR[0]'['format'](_0x56d16c,_0x150a24);this['_autoColorActorNames'][_0x116bc5(0x3a1)]([_0x242916,_0x3a8cdc]);}},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x20e)]=function(_0x137c40){const _0x1d92d7=_0x44fc42;this[_0x1d92d7(0x55f)]===undefined&&this[_0x1d92d7(0x4b5)]();for(autoColor of this[_0x1d92d7(0x55f)]){_0x137c40=_0x137c40['replace'](autoColor[0x0],autoColor[0x1]);}return _0x137c40;},Window_Base['prototype'][_0x44fc42(0x34b)]=function(_0x32e55e,_0x25c049,_0x1f06f8){const _0x503a81=_0x44fc42;if(!_0x32e55e)return'';const _0x198744=_0x32e55e[_0x25c049];let _0x476278='';if(_0x198744&&_0x1f06f8&&_0x198744[_0x503a81(0x3ec)]){const _0x251fab=_0x503a81(0x373);_0x476278=_0x251fab['format'](_0x198744['iconIndex'],_0x198744[_0x503a81(0x247)]);}else _0x198744?_0x476278=_0x198744[_0x503a81(0x247)]:_0x476278='';return _0x476278=TextManager['parseLocalizedText'](_0x476278),this[_0x503a81(0x485)]()&&(_0x476278=this['applyDatabaseAutoColor'](_0x476278,_0x32e55e)),_0x476278;},Window_Base[_0x44fc42(0x532)]['lastGainedObjectIcon']=function(){const _0x45e153=_0x44fc42,_0x48df1a=$gameParty[_0x45e153(0x2c4)]();if(_0x48df1a['id']<0x0)return'';let _0x3ab55b=null;if(_0x48df1a[_0x45e153(0x3b8)]===0x0)_0x3ab55b=$dataItems[_0x48df1a['id']];if(_0x48df1a['type']===0x1)_0x3ab55b=$dataWeapons[_0x48df1a['id']];if(_0x48df1a['type']===0x2)_0x3ab55b=$dataArmors[_0x48df1a['id']];if(!_0x3ab55b)return'';return'\x1bi[%1]'['format'](_0x3ab55b[_0x45e153(0x3ec)]);},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x400)]=function(_0x677c8a){const _0x3c23a0=_0x44fc42,_0x4aa304=$gameParty[_0x3c23a0(0x2c4)]();if(_0x4aa304['id']<0x0)return'';let _0x82d947=null;if(_0x4aa304['type']===0x0)_0x82d947=$dataItems[_0x4aa304['id']];if(_0x4aa304[_0x3c23a0(0x3b8)]===0x1)_0x82d947=$dataWeapons[_0x4aa304['id']];if(_0x4aa304[_0x3c23a0(0x3b8)]===0x2)_0x82d947=$dataArmors[_0x4aa304['id']];if(!_0x82d947)return'';let _0x4e2897=_0x82d947[_0x3c23a0(0x247)]||'';return TextManager[_0x3c23a0(0x250)]()&&(_0x4e2897=TextManager['parseLocalizedText'](_0x4e2897)),_0x677c8a?_0x3c23a0(0x373)['format'](_0x82d947['iconIndex'],_0x4e2897):_0x4e2897;},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x3ad)]=function(){const _0x47dc26=_0x44fc42,_0x1ecefb=$gameParty['getLastGainedItemData']();if(_0x1ecefb['id']<=0x0)return'';return _0x1ecefb[_0x47dc26(0x347)];},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x37d)]=function(_0x41f729,_0x28ad10){const _0x501584=_0x44fc42,_0x5ebd8a=VisuMZ['MessageCore'][_0x501584(0x416)][_0x501584(0x328)];let _0x17317c=0x0;if(_0x28ad10===$dataActors)_0x17317c=_0x5ebd8a['Actors'];if(_0x28ad10===$dataClasses)_0x17317c=_0x5ebd8a[_0x501584(0x348)];if(_0x28ad10===$dataSkills)_0x17317c=_0x5ebd8a['Skills'];if(_0x28ad10===$dataItems)_0x17317c=_0x5ebd8a['Items'];if(_0x28ad10===$dataWeapons)_0x17317c=_0x5ebd8a['Weapons'];if(_0x28ad10===$dataArmors)_0x17317c=_0x5ebd8a['Armors'];if(_0x28ad10===$dataEnemies)_0x17317c=_0x5ebd8a[_0x501584(0x45b)];if(_0x28ad10===$dataStates)_0x17317c=_0x5ebd8a[_0x501584(0x299)];return _0x17317c>0x0&&(_0x41f729='\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x501584(0x20d)](_0x17317c,_0x41f729)),_0x41f729;},Window_Base['prototype'][_0x44fc42(0x4f4)]=function(_0x5dd91e){const _0x94aa50=_0x44fc42;if(_0x5dd91e['includes'](_0x94aa50(0x4bb)))return this['setWordWrap'](![]),_0x5dd91e=_0x5dd91e['replace'](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a'),_0x5dd91e=_0x5dd91e[_0x94aa50(0x251)](/<(?:WORDWRAP|WORD WRAP)>/gi,''),_0x5dd91e=_0x5dd91e['replace'](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,''),_0x5dd91e=_0x5dd91e[_0x94aa50(0x251)](/<\/(?:NOWORDWRAP|NO WORD WRAP)>/gi,''),_0x5dd91e;_0x5dd91e=_0x5dd91e[_0x94aa50(0x251)](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x179c3e,_0x3876f3)=>this['setWordWrap'](!![])),_0x5dd91e=_0x5dd91e[_0x94aa50(0x251)](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x53abd0,_0x1db59c)=>this[_0x94aa50(0x36d)](![])),_0x5dd91e=_0x5dd91e[_0x94aa50(0x251)](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x1360df,_0x3a0d87)=>this[_0x94aa50(0x36d)](![]));if(_0x5dd91e[_0x94aa50(0x523)](Window_Message[_0x94aa50(0x3e3)]))this[_0x94aa50(0x36d)](![]);else _0x5dd91e['match'](Window_Message[_0x94aa50(0x1ea)])&&this[_0x94aa50(0x36d)](![]);if(!this[_0x94aa50(0x1fc)]())return _0x5dd91e=_0x5dd91e[_0x94aa50(0x251)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a'),_0x5dd91e;if(_0x5dd91e[_0x94aa50(0x2a3)]<=0x0)return _0x5dd91e;return _0x5dd91e[_0x94aa50(0x523)](/[\u3040-\u30FF\u4E00-\u9FFF]/g)&&(_0x5dd91e=VisuMZ['MessageCore']['SplitJpCnCharacters'](_0x5dd91e)['join']('')),VisuMZ['MessageCore'][_0x94aa50(0x416)]['WordWrap'][_0x94aa50(0x33c)]?(_0x5dd91e=_0x5dd91e[_0x94aa50(0x251)](/[\n\r]+/g,'\x20'),_0x5dd91e=_0x5dd91e[_0x94aa50(0x251)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a')):(_0x5dd91e=_0x5dd91e[_0x94aa50(0x251)](/[\n\r]+/g,''),_0x5dd91e=_0x5dd91e[_0x94aa50(0x251)](/<(?:BR|LINEBREAK)>/gi,'\x0a')),_0x5dd91e=this[_0x94aa50(0x22e)](_0x5dd91e),_0x5dd91e=_0x5dd91e[_0x94aa50(0x43a)]('\x20')[_0x94aa50(0x545)]('\x1bWrapBreak[0]'),_0x5dd91e=_0x5dd91e['replace'](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x5dd91e=_0x5dd91e[_0x94aa50(0x251)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x5dd91e;},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x557)]=function(_0x2a57de){const _0x590fb5=_0x44fc42;let _0x1bff9d=[],_0x2e71a1='';while(_0x2a57de['length']>0x0){const _0x7dacfe=_0x2a57de[_0x590fb5(0x50a)](0x0);_0x2a57de=_0x2a57de[_0x590fb5(0x492)](0x1),_0x7dacfe[_0x590fb5(0x523)](/[\u3040-\u30FF\u4E00-\u9FFF]/g)?(_0x2e71a1[_0x590fb5(0x2a3)]>0x0&&(_0x1bff9d[_0x590fb5(0x3a1)](_0x2e71a1),_0x2e71a1=''),_0x1bff9d[_0x590fb5(0x3a1)](_0x7dacfe+_0x590fb5(0x1cc))):_0x2e71a1+=_0x7dacfe;}return _0x2e71a1['length']>0x0&&(_0x1bff9d[_0x590fb5(0x3a1)](_0x2e71a1),_0x2e71a1=''),_0x1bff9d;},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x22e)]=function(_0x5c7e70){return _0x5c7e70;},VisuMZ['MessageCore'][_0x44fc42(0x54e)]=Window_Base[_0x44fc42(0x532)][_0x44fc42(0x23e)],Window_Base['prototype']['processNewLine']=function(_0x593600){const _0x5f0f41=_0x44fc42;VisuMZ[_0x5f0f41(0x4cc)]['Window_Base_processNewLine'][_0x5f0f41(0x1d8)](this,_0x593600),this[_0x5f0f41(0x429)](_0x593600);},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x402)]=function(_0x2a3d46){const _0x3e4d03=_0x44fc42;let _0x2f54d8=_0x2a3d46['text'][_0x2a3d46[_0x3e4d03(0x510)]++];if(_0x2f54d8[_0x3e4d03(0x200)](0x0)<0x20)this['flushTextState'](_0x2a3d46),this[_0x3e4d03(0x329)](_0x2a3d46,_0x2f54d8);else{if(this[_0x3e4d03(0x3cf)]===0x1)_0x2f54d8=_0x2f54d8[_0x3e4d03(0x4cf)]();if(this['_textCasing']===0x2){if(this[_0x3e4d03(0x3fa)])_0x2f54d8=_0x2f54d8[_0x3e4d03(0x3bb)]();this[_0x3e4d03(0x3fa)]=/\s/[_0x3e4d03(0x51f)](_0x2f54d8);}if(this[_0x3e4d03(0x3cf)]===0x3)_0x2f54d8=_0x2f54d8[_0x3e4d03(0x3bb)]();this['_textCasing']===0x4&&(_0x2f54d8=this['_lastAltCase']?_0x2f54d8[_0x3e4d03(0x3bb)]():_0x2f54d8[_0x3e4d03(0x4cf)](),this[_0x3e4d03(0x248)]=!this[_0x3e4d03(0x248)]),this[_0x3e4d03(0x3cf)]===0x5&&(_0x2f54d8=Math['random']()<0.5?_0x2f54d8[_0x3e4d03(0x3bb)]():_0x2f54d8[_0x3e4d03(0x4cf)]()),_0x2a3d46[_0x3e4d03(0x35b)]+=_0x2f54d8;}},VisuMZ['MessageCore'][_0x44fc42(0x45f)]=Window_Base['prototype']['processControlCharacter'],Window_Base['prototype']['processControlCharacter']=function(_0x39f312,_0x4b5645){const _0x194b6d=_0x44fc42;VisuMZ[_0x194b6d(0x4cc)][_0x194b6d(0x45f)]['call'](this,_0x39f312,_0x4b5645);if(_0x4b5645===_0x194b6d(0x506))this['processWrapBreak'](_0x39f312);else _0x4b5645===_0x194b6d(0x1cc)&&this[_0x194b6d(0x38b)](_0x39f312,!![]);},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x454)]=function(_0x133686){const _0x242f84=_0x44fc42;var _0x56f245=/^\<(.*?)\>/[_0x242f84(0x1ef)](_0x133686[_0x242f84(0x380)][_0x242f84(0x492)](_0x133686[_0x242f84(0x510)]));return _0x56f245?(_0x133686[_0x242f84(0x510)]+=_0x56f245[0x0]['length'],String(_0x56f245[0x0]['slice'](0x1,_0x56f245[0x0][_0x242f84(0x2a3)]-0x1))):'';},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x4fe)]=Window_Base[_0x44fc42(0x532)][_0x44fc42(0x1e9)],Window_Base[_0x44fc42(0x532)][_0x44fc42(0x1e9)]=function(_0x3b2b0c,_0x511d16){const _0x3ab992=_0x44fc42;switch(_0x3b2b0c){case'C':_0x511d16[_0x3ab992(0x39e)]?VisuMZ[_0x3ab992(0x4cc)][_0x3ab992(0x4fe)]['call'](this,_0x3b2b0c,_0x511d16):this[_0x3ab992(0x452)](_0x511d16);break;case'I':case'{':case'}':VisuMZ[_0x3ab992(0x4cc)][_0x3ab992(0x4fe)][_0x3ab992(0x1d8)](this,_0x3b2b0c,_0x511d16);break;case'FS':this[_0x3ab992(0x338)](_0x511d16);break;case'PX':this[_0x3ab992(0x54c)](_0x511d16);break;case'PY':this[_0x3ab992(0x3dd)](_0x511d16);break;case _0x3ab992(0x43e):this['processFontChangeBold'](this[_0x3ab992(0x452)](_0x511d16));break;case _0x3ab992(0x52a):this[_0x3ab992(0x35f)](_0x511d16);break;case'CENTERPICTURE':this[_0x3ab992(0x43c)](_0x511d16);break;case _0x3ab992(0x4ed):this[_0x3ab992(0x2b0)](_0x511d16);break;case'COMMONEVENT':this['processCommonEvent'](_0x511d16);break;case _0x3ab992(0x392):this[_0x3ab992(0x427)](this[_0x3ab992(0x452)](_0x511d16));break;case _0x3ab992(0x2bc):this[_0x3ab992(0x256)](_0x511d16);break;case _0x3ab992(0x25c):this['processPreviousColor'](_0x511d16);break;case'TEXTALIGNMENT':this['processTextAlignmentChange'](_0x511d16);break;case'WAIT':this[_0x3ab992(0x231)](_0x511d16);break;case _0x3ab992(0x38f):this[_0x3ab992(0x38b)](_0x511d16);break;case _0x3ab992(0x3b2):this[_0x3ab992(0x38b)](_0x511d16,!![]);break;default:this['processMessageCoreEscapeActions'](_0x3b2b0c,_0x511d16);}},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x29f)]=function(_0x2e86ab,_0x418593){const _0x5aeb2f=_0x44fc42;for(const _0x5f49dc of VisuMZ['MessageCore'][_0x5aeb2f(0x416)]['TextCodeActions']){if(_0x5f49dc[_0x5aeb2f(0x345)]===_0x2e86ab){if(_0x5f49dc[_0x5aeb2f(0x39d)]==='')this[_0x5aeb2f(0x452)](_0x418593);_0x5f49dc['ActionJS']['call'](this,_0x418593);if(this[_0x5aeb2f(0x233)]===Window_Message){const _0x15c836=_0x5f49dc[_0x5aeb2f(0x410)]||0x0;if(_0x15c836>0x0)this[_0x5aeb2f(0x3d7)](_0x15c836);}}}},Window_Base[_0x44fc42(0x532)]['makeFontBigger']=function(){const _0x21ae2b=_0x44fc42;this['contents'][_0x21ae2b(0x305)]+=VisuMZ[_0x21ae2b(0x4cc)]['Settings'][_0x21ae2b(0x282)]['FontChangeValue'],this['contents'][_0x21ae2b(0x305)]=Math['min'](this[_0x21ae2b(0x536)][_0x21ae2b(0x305)],VisuMZ['MessageCore'][_0x21ae2b(0x416)]['General'][_0x21ae2b(0x471)]);},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x21e)]=function(){const _0x55fe69=_0x44fc42;this[_0x55fe69(0x536)][_0x55fe69(0x305)]-=VisuMZ[_0x55fe69(0x4cc)][_0x55fe69(0x416)][_0x55fe69(0x282)][_0x55fe69(0x20f)],this[_0x55fe69(0x536)][_0x55fe69(0x305)]=Math[_0x55fe69(0x267)](this['contents'][_0x55fe69(0x305)],VisuMZ[_0x55fe69(0x4cc)][_0x55fe69(0x416)][_0x55fe69(0x282)]['FontSmallerCap']);},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x338)]=function(_0x4cd690){const _0x5959f0=_0x44fc42,_0x3ccd25=this[_0x5959f0(0x452)](_0x4cd690);this[_0x5959f0(0x536)]['fontSize']=_0x3ccd25['clamp'](VisuMZ['MessageCore'][_0x5959f0(0x416)][_0x5959f0(0x282)][_0x5959f0(0x2d2)],VisuMZ['MessageCore']['Settings'][_0x5959f0(0x282)][_0x5959f0(0x471)]);},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x229)]=function(_0x2c0979){const _0x5efa4e=_0x44fc42;let _0x48237d=this[_0x5efa4e(0x536)][_0x5efa4e(0x305)];const _0x25df0e=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){const _0x532d30=_0x25df0e[_0x5efa4e(0x1ef)](_0x2c0979);if(!_0x532d30)break;const _0x43284f=String(_0x532d30[0x1])[_0x5efa4e(0x3bb)]();if(_0x43284f==='{')this[_0x5efa4e(0x572)]();else{if(_0x43284f==='}')this[_0x5efa4e(0x21e)]();else _0x43284f==='FS'&&(this[_0x5efa4e(0x536)]['fontSize']=parseInt(_0x532d30[0x3])[_0x5efa4e(0x1b6)](VisuMZ[_0x5efa4e(0x4cc)][_0x5efa4e(0x416)][_0x5efa4e(0x282)][_0x5efa4e(0x2d2)],VisuMZ[_0x5efa4e(0x4cc)][_0x5efa4e(0x416)]['General'][_0x5efa4e(0x471)]));}this['contents'][_0x5efa4e(0x305)]>_0x48237d&&(_0x48237d=this[_0x5efa4e(0x536)][_0x5efa4e(0x305)]);}return _0x48237d;},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x54c)]=function(_0x1b7d74){const _0x27059e=_0x44fc42;_0x1b7d74['x']=this[_0x27059e(0x452)](_0x1b7d74),VisuMZ[_0x27059e(0x4cc)]['Settings'][_0x27059e(0x282)][_0x27059e(0x438)]&&(_0x1b7d74['x']+=_0x1b7d74[_0x27059e(0x1d0)]);},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x3dd)]=function(_0x32d1b8){const _0x31240c=_0x44fc42;_0x32d1b8['y']=this[_0x31240c(0x452)](_0x32d1b8),VisuMZ['MessageCore'][_0x31240c(0x416)][_0x31240c(0x282)][_0x31240c(0x438)]&&(_0x32d1b8['y']+=_0x32d1b8['startY']);},Window_Base[_0x44fc42(0x532)]['processFontChangeBold']=function(_0x41ad5b){const _0x16e576=_0x44fc42;this[_0x16e576(0x536)][_0x16e576(0x419)]=!!_0x41ad5b;},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x427)]=function(_0x5c2ca7){const _0x44cd53=_0x44fc42;this[_0x44cd53(0x536)]['fontItalic']=!!_0x5c2ca7;},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x2e5)]=function(_0x457664){const _0xeae34b=_0x44fc42,_0xd27fc=this['obtainEscapeParam'](_0x457664);if(!_0x457664[_0xeae34b(0x39e)])return;switch(_0xd27fc){case 0x0:this['setTextAlignment'](_0xeae34b(0x2c2));return;case 0x1:this[_0xeae34b(0x46b)](_0xeae34b(0x4cd));break;case 0x2:this[_0xeae34b(0x46b)](_0xeae34b(0x4a8));break;case 0x3:this[_0xeae34b(0x46b)]('right');break;}this[_0xeae34b(0x429)](_0x457664);},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x429)]=function(_0x3c17c0){const _0x4a88d4=_0x44fc42;if(!_0x3c17c0[_0x4a88d4(0x39e)])return;if(_0x3c17c0['rtl'])return;if(this[_0x4a88d4(0x226)]()===_0x4a88d4(0x2c2))return;let _0x4ab0ac=_0x3c17c0['text'][_0x4a88d4(0x1e3)](_0x4a88d4(0x4bb),_0x3c17c0['index']+0x1),_0x418331=_0x3c17c0[_0x4a88d4(0x380)][_0x4a88d4(0x1e3)]('\x0a',_0x3c17c0[_0x4a88d4(0x510)]+0x1);if(_0x4ab0ac<0x0)_0x4ab0ac=_0x3c17c0[_0x4a88d4(0x380)][_0x4a88d4(0x2a3)]+0x1;if(_0x418331>0x0)_0x4ab0ac=Math['min'](_0x4ab0ac,_0x418331);const _0x372e49=_0x3c17c0[_0x4a88d4(0x380)]['substring'](_0x3c17c0['index'],_0x4ab0ac),_0x379fc9=this[_0x4a88d4(0x49c)](_0x372e49)[_0x4a88d4(0x4fa)],_0x337050=_0x3c17c0[_0x4a88d4(0x4fa)]||this[_0x4a88d4(0x425)]-0x8,_0x24cbeb=this['constructor']===Window_Message&&$gameMessage[_0x4a88d4(0x473)]()!=='';switch(this['getTextAlignment']()){case _0x4a88d4(0x4cd):_0x3c17c0['x']=_0x3c17c0['startX'];break;case _0x4a88d4(0x4a8):_0x3c17c0['x']=_0x3c17c0[_0x4a88d4(0x1d0)],_0x3c17c0['x']+=Math['floor']((_0x337050-_0x379fc9)/0x2);_0x24cbeb&&(_0x3c17c0['x']-=_0x3c17c0[_0x4a88d4(0x1d0)]/0x2);break;case'right':_0x3c17c0['x']=_0x337050-_0x379fc9+_0x3c17c0[_0x4a88d4(0x1d0)];_0x24cbeb&&(_0x3c17c0['x']-=_0x3c17c0[_0x4a88d4(0x1d0)]);break;}},Window_Base['prototype'][_0x44fc42(0x49c)]=function(_0xfb1cc1){const _0x4c4f7d=_0x44fc42;_0xfb1cc1=_0xfb1cc1['replace'](/\x1b!/g,''),_0xfb1cc1=_0xfb1cc1[_0x4c4f7d(0x251)](/\x1b\|/g,''),_0xfb1cc1=_0xfb1cc1[_0x4c4f7d(0x251)](/\x1b\./g,'');const _0x4af981=this['createTextState'](_0xfb1cc1,0x0,0x0,0x0),_0x327576=this['getPreservedFontSettings']();return _0x4af981[_0x4c4f7d(0x39e)]=![],this['processAllText'](_0x4af981),this['returnPreservedFontSettings'](_0x327576),{'width':_0x4af981[_0x4c4f7d(0x3af)],'height':_0x4af981[_0x4c4f7d(0x4b1)]};},Window_Base[_0x44fc42(0x366)]=VisuMZ['MessageCore']['Settings'][_0x44fc42(0x54a)][_0x44fc42(0x2af)]||0x0,Window_Base['prototype'][_0x44fc42(0x38b)]=function(_0x40bdba,_0x2f112d){const _0x3f5c71=_0x44fc42,_0x1b2d93=(_0x40bdba[_0x3f5c71(0x4dd)]?-0x1:0x1)*this[_0x3f5c71(0x46e)]('\x20');if(!_0x2f112d)_0x40bdba['x']+=_0x1b2d93;if(this[_0x3f5c71(0x452)](_0x40bdba)>0x0&&!_0x2f112d)_0x40bdba['x']+=_0x1b2d93;if(_0x40bdba['rtl'])return;let _0xd0f1d4;_0x2f112d?_0xd0f1d4=_0x40bdba[_0x3f5c71(0x380)]['indexOf'](_0x3f5c71(0x1cc),_0x40bdba[_0x3f5c71(0x510)]+0x1):_0xd0f1d4=_0x40bdba['text'][_0x3f5c71(0x1e3)](_0x3f5c71(0x506),_0x40bdba[_0x3f5c71(0x510)]+0x1);let _0x159ffa=_0x40bdba[_0x3f5c71(0x380)]['indexOf']('\x0a',_0x40bdba[_0x3f5c71(0x510)]+0x1);if(_0xd0f1d4<0x0)_0xd0f1d4=_0x40bdba[_0x3f5c71(0x380)]['length']+0x1;if(_0x159ffa>0x0)_0xd0f1d4=Math['min'](_0xd0f1d4,_0x159ffa);const _0x52dd76=_0x40bdba[_0x3f5c71(0x380)][_0x3f5c71(0x1c9)](_0x40bdba['index'],_0xd0f1d4),_0x22d4d9=this['textSizeExWordWrap'](_0x52dd76)['width'];let _0x3198d9=_0x40bdba[_0x3f5c71(0x4fa)]||this['innerWidth'];_0x3198d9-=Window_Base[_0x3f5c71(0x366)];if(this[_0x3f5c71(0x233)]===Window_Message){const _0x2536e2=$gameMessage[_0x3f5c71(0x473)]()===''?0x0:ImageManager[_0x3f5c71(0x35e)]+0x14;_0x3198d9-=_0x2536e2,VisuMZ[_0x3f5c71(0x4cc)]['Settings'][_0x3f5c71(0x54a)]['TightWrap']&&(_0x3198d9-=_0x2536e2);}let _0x590289=![];_0x40bdba['x']+_0x22d4d9>_0x40bdba[_0x3f5c71(0x1d0)]+_0x3198d9&&(_0x590289=!![]),_0x22d4d9===0x0&&(_0x590289=![]),_0x590289&&(_0x40bdba[_0x3f5c71(0x380)]=_0x40bdba[_0x3f5c71(0x380)][_0x3f5c71(0x492)](0x0,_0x40bdba['index'])+'\x0a'+_0x40bdba[_0x3f5c71(0x380)][_0x3f5c71(0x2c1)](_0x40bdba[_0x3f5c71(0x510)]));},Window_Base[_0x44fc42(0x532)]['textSizeExWordWrap']=function(_0x3c09a4){const _0x6ecc43=_0x44fc42,_0x5a797a=this[_0x6ecc43(0x538)](_0x3c09a4,0x0,0x0,0x0),_0x1279c2=this[_0x6ecc43(0x4a0)]();return _0x5a797a[_0x6ecc43(0x39e)]=![],this[_0x6ecc43(0x36d)](![]),this[_0x6ecc43(0x450)](_0x5a797a),this['setWordWrap'](!![]),this[_0x6ecc43(0x3cc)](_0x1279c2),{'width':_0x5a797a[_0x6ecc43(0x3af)],'height':_0x5a797a[_0x6ecc43(0x4b1)]};},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x544)]=function(_0x46d988){const _0x4557fa=_0x44fc42;return this[_0x4557fa(0x452)](_0x46d988);},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x256)]=function(_0x4f9335){const _0x8e7b98=_0x44fc42,_0x3be48f=this[_0x8e7b98(0x454)](_0x4f9335)[_0x8e7b98(0x43a)](',');if(!_0x4f9335[_0x8e7b98(0x39e)])return;const _0x2302f5=_0x3be48f[0x0][_0x8e7b98(0x504)](),_0x1935e4=_0x3be48f[0x1]||0x0,_0x393a68=_0x3be48f[0x2]||0x0,_0x267af4=ImageManager['loadPicture'](_0x2302f5),_0x3f1e5b=this[_0x8e7b98(0x536)][_0x8e7b98(0x230)];_0x267af4[_0x8e7b98(0x1f3)](this[_0x8e7b98(0x254)][_0x8e7b98(0x3a3)](this,_0x267af4,_0x4f9335['x'],_0x4f9335['y'],_0x1935e4,_0x393a68,_0x3f1e5b));},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x254)]=function(_0x58b52d,_0x2d8964,_0x5d36bc,_0x34ee5f,_0xe5ca76,_0x473cc6){const _0x5cb2cc=_0x44fc42;_0x34ee5f=_0x34ee5f||_0x58b52d[_0x5cb2cc(0x4fa)],_0xe5ca76=_0xe5ca76||_0x58b52d['height'],this['contentsBack']['paintOpacity']=_0x473cc6,this[_0x5cb2cc(0x1be)][_0x5cb2cc(0x1c2)](_0x58b52d,0x0,0x0,_0x58b52d[_0x5cb2cc(0x4fa)],_0x58b52d[_0x5cb2cc(0x3fe)],_0x2d8964,_0x5d36bc,_0x34ee5f,_0xe5ca76),this[_0x5cb2cc(0x1be)][_0x5cb2cc(0x230)]=0xff;},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x43c)]=function(_0x4d2105){const _0x13304f=_0x44fc42,_0x992446=this[_0x13304f(0x454)](_0x4d2105)[_0x13304f(0x43a)](',');if(!_0x4d2105['drawing'])return;const _0x185d11=_0x992446[0x0][_0x13304f(0x504)](),_0x483290=ImageManager[_0x13304f(0x1b2)](_0x185d11),_0x3db54e=JsonEx[_0x13304f(0x31d)](_0x4d2105),_0x3d25c5=this['contents'][_0x13304f(0x230)];_0x483290['addLoadListener'](this[_0x13304f(0x467)][_0x13304f(0x3a3)](this,_0x483290,_0x3db54e,_0x3d25c5));},Window_Base[_0x44fc42(0x532)]['drawBackCenteredPicture']=function(_0x5359dc,_0x45caa3,_0x306cd4){const _0x197f88=_0x44fc42,_0x381c5e=_0x45caa3[_0x197f88(0x4fa)]||this['innerWidth'],_0x49454e=this['_index']!==undefined?this[_0x197f88(0x38a)]():this[_0x197f88(0x449)],_0x492e7a=_0x381c5e/_0x5359dc['width'],_0x483a8a=_0x49454e/_0x5359dc[_0x197f88(0x3fe)],_0x42620c=Math['min'](_0x492e7a,_0x483a8a,0x1),_0x7527da=this['_index']!==undefined?(this['itemRectWithPadding'](0x0)[_0x197f88(0x3fe)]-this['lineHeight']())/0x2:0x0,_0x41a8fb=_0x5359dc[_0x197f88(0x4fa)]*_0x42620c,_0x31abcc=_0x5359dc[_0x197f88(0x3fe)]*_0x42620c,_0x290df1=Math[_0x197f88(0x388)]((_0x381c5e-_0x41a8fb)/0x2)+_0x45caa3[_0x197f88(0x1d0)],_0x429b1b=Math[_0x197f88(0x388)]((_0x49454e-_0x31abcc)/0x2)+_0x45caa3['startY']-_0x7527da*0x2;this[_0x197f88(0x1be)]['paintOpacity']=_0x306cd4,this[_0x197f88(0x1be)]['blt'](_0x5359dc,0x0,0x0,_0x5359dc[_0x197f88(0x4fa)],_0x5359dc[_0x197f88(0x3fe)],_0x290df1,_0x429b1b,_0x41a8fb,_0x31abcc),this[_0x197f88(0x1be)]['paintOpacity']=0xff;},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x2b0)]=function(_0x5f34f4){const _0x329ab2=_0x44fc42,_0x1aea00=this[_0x329ab2(0x452)](_0x5f34f4);if(_0x5f34f4[_0x329ab2(0x39e)])this['setColorLock'](_0x1aea00>0x0);},Window_Base[_0x44fc42(0x532)]['processCustomWait']=function(_0x445672){const _0x3e7cb4=_0x44fc42,_0x8cac64=this[_0x3e7cb4(0x452)](_0x445672);this['constructor']===Window_Message&&_0x445672[_0x3e7cb4(0x39e)]&&this['startWait'](_0x8cac64);},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x35f)]=function(_0x5c9fa8){const _0x4da086=_0x44fc42;this['_textCasing']=this[_0x4da086(0x452)](_0x5c9fa8),this[_0x4da086(0x3fa)]=!![],this[_0x4da086(0x248)]=!![];},VisuMZ['MessageCore'][_0x44fc42(0x537)]=function(_0x5e0021){const _0x44dbeb=_0x44fc42;if($gameTemp['isPlaytest']()){let _0x35a60e=_0x44dbeb(0x222)[_0x44dbeb(0x20d)](_0x5e0021['constructor'][_0x44dbeb(0x247)]);alert(_0x35a60e),SceneManager[_0x44dbeb(0x279)]();}},Window_Base[_0x44fc42(0x532)]['loadMessageFace']=function(){const _0x1dda9c=_0x44fc42;VisuMZ[_0x1dda9c(0x4cc)][_0x1dda9c(0x537)](this);},Window_Base[_0x44fc42(0x532)]['drawMessageFace']=function(){const _0x3b3ea7=_0x44fc42;VisuMZ[_0x3b3ea7(0x4cc)][_0x3b3ea7(0x537)](this);},Window_Base[_0x44fc42(0x532)][_0x44fc42(0x527)]=function(){const _0x5c5892=_0x44fc42;VisuMZ[_0x5c5892(0x4cc)][_0x5c5892(0x537)](this);},Window_Help[_0x44fc42(0x532)]['resetWordWrap']=function(){const _0x2e2c5a=_0x44fc42;this[_0x2e2c5a(0x36d)]($gameSystem[_0x2e2c5a(0x352)]());},Window_Help[_0x44fc42(0x532)][_0x44fc42(0x485)]=function(){return!![];},VisuMZ['MessageCore'][_0x44fc42(0x3e8)]=Window_Help[_0x44fc42(0x532)][_0x44fc42(0x4fd)],Window_Help[_0x44fc42(0x532)][_0x44fc42(0x4fd)]=function(){const _0x3d93cd=_0x44fc42;this[_0x3d93cd(0x576)](),VisuMZ[_0x3d93cd(0x4cc)][_0x3d93cd(0x3e8)]['call'](this),this['resetWordWrap']();},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x48e)]=Window_Options[_0x44fc42(0x532)][_0x44fc42(0x361)],Window_Options['prototype'][_0x44fc42(0x361)]=function(){const _0x59da46=_0x44fc42;VisuMZ[_0x59da46(0x4cc)][_0x59da46(0x48e)][_0x59da46(0x1d8)](this),this[_0x59da46(0x4d0)]();},Window_Options['prototype'][_0x44fc42(0x4d0)]=function(){const _0x2a63af=_0x44fc42;VisuMZ[_0x2a63af(0x4cc)]['Settings'][_0x2a63af(0x28d)][_0x2a63af(0x2fd)]&&TextManager[_0x2a63af(0x250)]()&&this[_0x2a63af(0x43f)](),VisuMZ[_0x2a63af(0x4cc)][_0x2a63af(0x416)][_0x2a63af(0x575)][_0x2a63af(0x2fd)]&&this[_0x2a63af(0x1b4)]();},Window_Options['prototype'][_0x44fc42(0x43f)]=function(){const _0x27985e=_0x44fc42,_0x5117ca=TextManager['messageCoreLocalization'],_0x4b204e=_0x27985e(0x1e8);this[_0x27985e(0x431)](_0x5117ca,_0x4b204e);},Window_Options[_0x44fc42(0x532)]['addMessageCoreTextSpeedCommand']=function(){const _0x8cd70b=_0x44fc42,_0x388630=TextManager[_0x8cd70b(0x529)],_0x5d194c=_0x8cd70b(0x1b3);this[_0x8cd70b(0x431)](_0x388630,_0x5d194c);},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x306)]=Window_Options[_0x44fc42(0x532)]['statusText'],Window_Options[_0x44fc42(0x532)][_0x44fc42(0x4e6)]=function(_0x337223){const _0x32e42b=_0x44fc42,_0x58ecd9=this['commandSymbol'](_0x337223);if(_0x58ecd9===_0x32e42b(0x1e8))return this[_0x32e42b(0x428)]();if(_0x58ecd9===_0x32e42b(0x1b3))return this[_0x32e42b(0x3e9)]();return VisuMZ[_0x32e42b(0x4cc)][_0x32e42b(0x306)][_0x32e42b(0x1d8)](this,_0x337223);},Window_Options['prototype']['visuMzTextLocaleStatusText']=function(){const _0x50233c=_0x44fc42,_0x3511d1=ConfigManager['textLocale'];return TextManager[_0x50233c(0x45e)](_0x3511d1);},Window_Options[_0x44fc42(0x532)]['textSpeedStatusText']=function(){const _0x52577c=_0x44fc42,_0xb35b56=this['getConfigValue'](_0x52577c(0x1b3));return _0xb35b56>0xa?TextManager[_0x52577c(0x436)]:_0xb35b56;},VisuMZ[_0x44fc42(0x4cc)]['Window_Options_isVolumeSymbol']=Window_Options[_0x44fc42(0x532)][_0x44fc42(0x1ba)],Window_Options[_0x44fc42(0x532)][_0x44fc42(0x1ba)]=function(_0x10faa2){const _0xd86cbf=_0x44fc42;if(_0x10faa2===_0xd86cbf(0x1e8))return!![];if(_0x10faa2==='textSpeed')return!![];return VisuMZ[_0xd86cbf(0x4cc)][_0xd86cbf(0x319)]['call'](this,_0x10faa2);},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x312)]=Window_Options[_0x44fc42(0x532)]['changeVolume'],Window_Options[_0x44fc42(0x532)][_0x44fc42(0x53b)]=function(_0x2d92c4,_0x30f91c,_0x2392b0){const _0x3be7ae=_0x44fc42;if(_0x2d92c4==='textLocale')return this[_0x3be7ae(0x559)](_0x30f91c,_0x2392b0);if(_0x2d92c4===_0x3be7ae(0x1b3))return this[_0x3be7ae(0x1c6)](_0x2d92c4,_0x30f91c,_0x2392b0);VisuMZ['MessageCore'][_0x3be7ae(0x312)][_0x3be7ae(0x1d8)](this,_0x2d92c4,_0x30f91c,_0x2392b0);},Window_Options[_0x44fc42(0x532)][_0x44fc42(0x559)]=function(_0x510e4f,_0x1f67e2){const _0x4dd9e7=_0x44fc42,_0x116158=VisuMZ[_0x4dd9e7(0x4cc)][_0x4dd9e7(0x416)][_0x4dd9e7(0x28d)][_0x4dd9e7(0x482)]||[],_0x424df6=ConfigManager[_0x4dd9e7(0x1e8)];let _0x105cbc=_0x116158[_0x4dd9e7(0x1e3)](_0x424df6);_0x105cbc+=_0x510e4f?0x1:-0x1;if(_0x105cbc>=_0x116158[_0x4dd9e7(0x2a3)])_0x105cbc=_0x1f67e2?0x0:_0x116158[_0x4dd9e7(0x2a3)]-0x1;if(_0x105cbc<0x0)_0x105cbc=_0x1f67e2?_0x116158['length']-0x1:0x0;this[_0x4dd9e7(0x4f7)](_0x4dd9e7(0x1e8),_0x116158[_0x105cbc]);},Window_Options[_0x44fc42(0x532)][_0x44fc42(0x1c6)]=function(_0x4e0710,_0x5f484d,_0xd823bd){const _0x450b79=_0x44fc42,_0x3ebb6e=this[_0x450b79(0x4ca)](_0x4e0710),_0x2112a2=0x1,_0x16ce8d=_0x3ebb6e+(_0x5f484d?_0x2112a2:-_0x2112a2);_0x16ce8d>0xb&&_0xd823bd?this[_0x450b79(0x4f7)](_0x4e0710,0x1):this[_0x450b79(0x4f7)](_0x4e0710,_0x16ce8d[_0x450b79(0x1b6)](0x1,0xb));},Window_Message[_0x44fc42(0x532)]['contentsHeight']=function(){const _0x3763b6=_0x44fc42;let _0x318fd1=Window_Base[_0x3763b6(0x532)][_0x3763b6(0x2c6)][_0x3763b6(0x1d8)](this);return _0x318fd1-=this[_0x3763b6(0x554)](),_0x318fd1;},Window_Message[_0x44fc42(0x532)][_0x44fc42(0x2e2)]=function(){const _0x3ffbe7=_0x44fc42;Window_Base[_0x3ffbe7(0x532)][_0x3ffbe7(0x2e2)]['call'](this),VisuMZ[_0x3ffbe7(0x4cc)][_0x3ffbe7(0x416)][_0x3ffbe7(0x282)][_0x3ffbe7(0x481)]&&this[_0x3ffbe7(0x563)]();},Window_Message['prototype'][_0x44fc42(0x563)]=function(){const _0x4d070f=_0x44fc42;this['_dimmerSprite']['x']=Math[_0x4d070f(0x47a)](this[_0x4d070f(0x4fa)]/0x2),this['_dimmerSprite']['anchor']['x']=0.5,this['_dimmerSprite'][_0x4d070f(0x2f6)]['x']=Graphics[_0x4d070f(0x4fa)];},VisuMZ[_0x44fc42(0x4cc)]['Window_Message_clearFlags']=Window_Message[_0x44fc42(0x532)][_0x44fc42(0x2bd)],Window_Message[_0x44fc42(0x532)]['clearFlags']=function(){const _0x20020e=_0x44fc42;VisuMZ[_0x20020e(0x4cc)]['Window_Message_clearFlags']['call'](this),this['clearActorNameAutoColor'](),this[_0x20020e(0x4a4)](),this[_0x20020e(0x214)](![]),this['setTextAlignment'](_0x20020e(0x2c2)),this[_0x20020e(0x527)](VisuMZ[_0x20020e(0x4cc)][_0x20020e(0x416)]['General'][_0x20020e(0x332)]);},Window_Message[_0x44fc42(0x532)][_0x44fc42(0x4a4)]=function(){const _0x89ee5f=_0x44fc42;this[_0x89ee5f(0x36d)]($gameSystem[_0x89ee5f(0x363)]());},Window_Message[_0x44fc42(0x532)][_0x44fc42(0x485)]=function(){return!![];},Window_Message[_0x44fc42(0x532)]['setTextDelay']=function(_0x1bacdf){const _0x3ffafc=_0x44fc42,_0x1e198d=0xb-ConfigManager[_0x3ffafc(0x1b3)];_0x1bacdf=Math[_0x3ffafc(0x47a)](_0x1bacdf*_0x1e198d),this['_textDelayCount']=_0x1bacdf,this[_0x3ffafc(0x284)]=_0x1bacdf;},VisuMZ['MessageCore']['Window_Message_isTriggered']=Window_Message['prototype']['isTriggered'],Window_Message['prototype'][_0x44fc42(0x1cf)]=function(){const _0x18324c=_0x44fc42;return VisuMZ['MessageCore']['Window_Message_isTriggered'][_0x18324c(0x1d8)](this)||Input['isPressed'](VisuMZ['MessageCore'][_0x18324c(0x416)][_0x18324c(0x282)][_0x18324c(0x1c8)]);},VisuMZ[_0x44fc42(0x4cc)]['Window_Message_updatePlacement']=Window_Message[_0x44fc42(0x532)][_0x44fc42(0x1e0)],Window_Message[_0x44fc42(0x532)][_0x44fc42(0x1e0)]=function(){const _0x4c562a=_0x44fc42;let _0x2c49b0=this['y'];this['x']=Math[_0x4c562a(0x47a)]((Graphics['boxWidth']-this[_0x4c562a(0x4fa)])/0x2),VisuMZ[_0x4c562a(0x4cc)][_0x4c562a(0x566)][_0x4c562a(0x1d8)](this);if(this[_0x4c562a(0x42c)])this['y']=_0x2c49b0;this[_0x4c562a(0x2a8)](),this['updateForcedPlacement'](),this[_0x4c562a(0x49f)](),this['updateChoiceListHelpWindowPlacement']();},VisuMZ[_0x44fc42(0x4cc)]['Window_Message_newPage']=Window_Message[_0x44fc42(0x532)][_0x44fc42(0x364)],Window_Message[_0x44fc42(0x532)][_0x44fc42(0x364)]=function(_0x1e3eea){const _0x2c483b=_0x44fc42;this[_0x2c483b(0x567)](_0x1e3eea),this['onNewPageMessageCore'](_0x1e3eea),VisuMZ[_0x2c483b(0x4cc)][_0x2c483b(0x3a2)][_0x2c483b(0x1d8)](this,_0x1e3eea),this['createContents']();},Window_Message['prototype'][_0x44fc42(0x567)]=function(_0xc2e246){const _0x21aefb=_0x44fc42;if(!_0xc2e246)return;this[_0x21aefb(0x503)]=![],_0xc2e246[_0x21aefb(0x380)]=this[_0x21aefb(0x433)](_0xc2e246[_0x21aefb(0x380)]),this[_0x21aefb(0x539)]&&(_0xc2e246[_0x21aefb(0x380)]=this[_0x21aefb(0x4f4)](_0xc2e246[_0x21aefb(0x380)]),this['_macroBypassWordWrap']=!![]);},Window_Message['prototype']['prepareWordWrapEscapeCharacters']=function(_0x37227b){const _0x2c1dca=_0x44fc42;if(this[_0x2c1dca(0x503)])return _0x37227b;return Window_Base[_0x2c1dca(0x532)]['prepareWordWrapEscapeCharacters'][_0x2c1dca(0x1d8)](this,_0x37227b);},Window_Message[_0x44fc42(0x532)][_0x44fc42(0x307)]=function(_0x5398cc){const _0x54eef5=_0x44fc42;this[_0x54eef5(0x2b6)](_0x5398cc),this[_0x54eef5(0x509)](_0x5398cc),this[_0x54eef5(0x3a4)]();},VisuMZ['MessageCore'][_0x44fc42(0x455)]=Window_Message[_0x44fc42(0x532)][_0x44fc42(0x33a)],Window_Message[_0x44fc42(0x532)][_0x44fc42(0x33a)]=function(){const _0x25559f=_0x44fc42;VisuMZ[_0x25559f(0x4cc)][_0x25559f(0x455)]['call'](this),this[_0x25559f(0x2bd)]();if(this['_messagePositionReset'])this['messagePositionReset']();},Window_Message[_0x44fc42(0x532)][_0x44fc42(0x3a4)]=function(){const _0xb12065=_0x44fc42;this[_0xb12065(0x4fa)]=$gameSystem[_0xb12065(0x3d6)]()+this[_0xb12065(0x3ab)]();;this[_0xb12065(0x4fa)]=Math[_0xb12065(0x375)](Graphics[_0xb12065(0x4fa)],this[_0xb12065(0x4fa)]);const _0x185bb0=$gameSystem['getMessageWindowRows']();this['height']=SceneManager['_scene'][_0xb12065(0x3b1)](_0x185bb0,![])+this[_0xb12065(0x554)](),this[_0xb12065(0x3fe)]=Math['min'](Graphics[_0xb12065(0x3fe)],this[_0xb12065(0x3fe)]);if($gameTemp[_0xb12065(0x444)])this[_0xb12065(0x1ca)]();},Window_Message['prototype'][_0x44fc42(0x3ab)]=function(){return 0x0;},Window_Message[_0x44fc42(0x532)]['addedHeight']=function(){return 0x0;},Window_Message['prototype'][_0x44fc42(0x1ca)]=function(){const _0x2a79a5=_0x44fc42;this['x']=(Graphics[_0x2a79a5(0x1f5)]-this[_0x2a79a5(0x4fa)])/0x2,$gameTemp[_0x2a79a5(0x444)]=undefined,this[_0x2a79a5(0x49f)]();},Window_Message[_0x44fc42(0x532)]['updateMove']=function(){const _0x3cd674=_0x44fc42,_0x5045a5={'x':this['x'],'y':this['y']};Window_Base[_0x3cd674(0x532)][_0x3cd674(0x241)][_0x3cd674(0x1d8)](this),this['updateNameBoxMove'](_0x5045a5);},Window_Message[_0x44fc42(0x532)]['canMove']=function(){return!![];},Window_Message[_0x44fc42(0x532)][_0x44fc42(0x399)]=function(_0x22538f){const _0x3018e3=_0x44fc42;this['_nameBoxWindow']&&(this['_nameBoxWindow']['x']+=this['x']-_0x22538f['x'],this[_0x3018e3(0x22b)]['y']+=this['y']-_0x22538f['y']);},Window_Message[_0x44fc42(0x532)]['resetRect']=function(_0x514e55,_0x313ed7){const _0x12a039=_0x44fc42;this[_0x12a039(0x346)](this['_resetRect']['x'],this[_0x12a039(0x2a0)]*(Graphics[_0x12a039(0x518)]-this[_0x12a039(0x3fe)])/0x2,this[_0x12a039(0x2de)][_0x12a039(0x4fa)],this[_0x12a039(0x2de)]['height'],_0x514e55,_0x313ed7);},Window_Message[_0x44fc42(0x532)][_0x44fc42(0x544)]=function(_0x159a78){const _0x2c3b8c=_0x44fc42,_0x2ea7a3=Window_Base[_0x2c3b8c(0x532)][_0x2c3b8c(0x544)][_0x2c3b8c(0x1d8)](this,_0x159a78);_0x159a78[_0x2c3b8c(0x39e)]&&this[_0x2c3b8c(0x3d7)](_0x2ea7a3);},Window_Message[_0x44fc42(0x532)][_0x44fc42(0x3d7)]=function(_0x1d8f17){const _0x1b4674=_0x44fc42;if($gameParty['inBattle']()){}else $gameMap[_0x1b4674(0x1d1)](_0x1d8f17);},Window_Message[_0x44fc42(0x532)][_0x44fc42(0x402)]=function(_0xfdb522){const _0x3d4455=_0x44fc42;this['_textDelayCount']--,this[_0x3d4455(0x1bd)]<=0x0&&(this[_0x3d4455(0x342)](_0xfdb522),Window_Base['prototype'][_0x3d4455(0x402)][_0x3d4455(0x1d8)](this,_0xfdb522));},Window_Message[_0x44fc42(0x532)][_0x44fc42(0x342)]=function(_0x13d616){const _0x1dcc5d=_0x44fc42;this[_0x1dcc5d(0x1bd)]=this[_0x1dcc5d(0x284)];if(this[_0x1dcc5d(0x284)]<=0x0)this[_0x1dcc5d(0x213)]=!![];},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x56e)]=Window_Message[_0x44fc42(0x532)]['processEscapeCharacter'],Window_Message[_0x44fc42(0x532)][_0x44fc42(0x1e9)]=function(_0x8ca1ac,_0xda762d){const _0x49fe0a=_0x44fc42;!_0xda762d[_0x49fe0a(0x39e)]?Window_Base['prototype'][_0x49fe0a(0x1e9)][_0x49fe0a(0x1d8)](this,_0x8ca1ac,_0xda762d):VisuMZ[_0x49fe0a(0x4cc)][_0x49fe0a(0x56e)][_0x49fe0a(0x1d8)](this,_0x8ca1ac,_0xda762d);},VisuMZ[_0x44fc42(0x4cc)]['Window_Message_needsNewPage']=Window_Message[_0x44fc42(0x532)][_0x44fc42(0x417)],Window_Message[_0x44fc42(0x532)][_0x44fc42(0x417)]=function(_0x7a609e){const _0x3b1ad8=_0x44fc42;if(this['_currentAutoSize'])return![];return VisuMZ[_0x3b1ad8(0x4cc)][_0x3b1ad8(0x469)][_0x3b1ad8(0x1d8)](this,_0x7a609e);},Window_Message[_0x44fc42(0x532)][_0x44fc42(0x2b6)]=function(_0x3ab1ad){const _0x5b8748=_0x44fc42;let _0x9582c6=_0x3ab1ad[_0x5b8748(0x380)];this[_0x5b8748(0x218)]={};if(this[_0x5b8748(0x1fc)]())return _0x9582c6;_0x9582c6=_0x9582c6[_0x5b8748(0x251)](/<POSITION:[ ]*(.*?)>/gi,(_0x4c2275,_0x530d34)=>{const _0x292a2d=_0x5b8748,_0x39e7ab=_0x530d34[_0x292a2d(0x43a)](',')[_0x292a2d(0x44d)](_0x754866=>Number(_0x754866)||0x0);if(_0x39e7ab[0x0]!==undefined)this[_0x292a2d(0x218)]['x']=Number(_0x39e7ab[0x0]);if(_0x39e7ab[0x1]!==undefined)this[_0x292a2d(0x218)]['y']=Number(_0x39e7ab[0x1]);if(_0x39e7ab[0x2]!==undefined)this[_0x292a2d(0x218)][_0x292a2d(0x4fa)]=Number(_0x39e7ab[0x2]);if(_0x39e7ab[0x3]!==undefined)this[_0x292a2d(0x218)][_0x292a2d(0x3fe)]=Number(_0x39e7ab[0x3]);return'';}),_0x9582c6=_0x9582c6[_0x5b8748(0x251)](/<COORDINATES:[ ]*(.*?)>/gi,(_0x7ab7c7,_0x3b702e)=>{const _0x39dd47=_0x5b8748,_0x580aa3=_0x3b702e[_0x39dd47(0x43a)](',')[_0x39dd47(0x44d)](_0x1f6114=>Number(_0x1f6114)||0x0);if(_0x580aa3[0x0]!==undefined)this[_0x39dd47(0x218)]['x']=Number(_0x580aa3[0x0]);if(_0x580aa3[0x1]!==undefined)this[_0x39dd47(0x218)]['y']=Number(_0x580aa3[0x1]);return'';}),_0x9582c6=_0x9582c6[_0x5b8748(0x251)](/<DIMENSIONS:[ ]*(.*?)>/gi,(_0x503259,_0x1397fd)=>{const _0x45404f=_0x5b8748,_0x4ce8af=_0x1397fd[_0x45404f(0x43a)](',')[_0x45404f(0x44d)](_0x27cbe0=>Number(_0x27cbe0)||0x0);if(_0x4ce8af[0x0]!==undefined)this[_0x45404f(0x218)][_0x45404f(0x4fa)]=Number(_0x4ce8af[0x2]);if(_0x4ce8af[0x1]!==undefined)this[_0x45404f(0x218)][_0x45404f(0x3fe)]=Number(_0x4ce8af[0x3]);return'';}),_0x9582c6=_0x9582c6[_0x5b8748(0x251)](/<OFFSET:[ ]*(.*?)>/gi,(_0x410e50,_0x3576e3)=>{const _0x4b2713=_0x5b8748,_0x1dffea=_0x3576e3[_0x4b2713(0x43a)](',')[_0x4b2713(0x44d)](_0x2ec0ff=>Number(_0x2ec0ff)||0x0);let _0x3ae9b9=_0x1dffea[0x0]||0x0,_0x1424ac=_0x1dffea[0x1]||0x0;return $gameSystem['setMessageWindowXyOffsets'](_0x3ae9b9,_0x1424ac),'';}),_0x3ab1ad[_0x5b8748(0x380)]=_0x9582c6;},Window_Message[_0x44fc42(0x532)][_0x44fc42(0x2a8)]=function(){const _0x305a0f=_0x44fc42,_0x54044a=$gameSystem[_0x305a0f(0x3fc)]();this['x']+=_0x54044a['x'],this['y']+=_0x54044a['y'];},Window_Message['prototype']['updateForcedPlacement']=function(){const _0x329398=_0x44fc42;this['_forcedPosition']=this[_0x329398(0x218)]||{};const _0x18a8cf=['x','y',_0x329398(0x4fa),_0x329398(0x3fe)];for(const _0x57f822 of _0x18a8cf){this[_0x329398(0x218)][_0x57f822]!==undefined&&(this[_0x57f822]=Number(this[_0x329398(0x218)][_0x57f822]));}},Window_Message[_0x44fc42(0x532)][_0x44fc42(0x509)]=function(_0x537d45){const _0x41a6e9=_0x44fc42;this[_0x41a6e9(0x43b)]=![];let _0x2179f2=_0x537d45[_0x41a6e9(0x380)];_0x2179f2=_0x2179f2[_0x41a6e9(0x251)](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0x4e5428=_0x41a6e9;return this['processAutoSize'](_0x2179f2,!![],!![]),this[_0x4e5428(0x496)]('none'),'';}),_0x2179f2=_0x2179f2[_0x41a6e9(0x251)](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x4c37b9=_0x41a6e9;return this[_0x4c37b9(0x22c)](_0x2179f2,!![],![]),this[_0x4c37b9(0x496)](_0x4c37b9(0x48f)),'';}),_0x2179f2=_0x2179f2[_0x41a6e9(0x251)](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x541c11=_0x41a6e9;return this[_0x541c11(0x22c)](_0x2179f2,![],!![]),this['processAutoPosition'](_0x541c11(0x48f)),'';});if(SceneManager[_0x41a6e9(0x484)]())_0x2179f2=_0x2179f2['replace'](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x1fe61d,_0x4d8528)=>{const _0x10b6ef=_0x41a6e9;return this[_0x10b6ef(0x22c)](_0x2179f2,!![],!![]),this[_0x10b6ef(0x496)](_0x10b6ef(0x525),Number(_0x4d8528)||0x1),'';}),_0x2179f2=_0x2179f2['replace'](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x1f01f1,_0xcb9748)=>{const _0x15c99a=_0x41a6e9;return this[_0x15c99a(0x22c)](_0x2179f2,!![],!![]),this[_0x15c99a(0x496)](_0x15c99a(0x46a),Number(_0xcb9748)||0x0),'';}),_0x2179f2=_0x2179f2['replace'](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x2b1c73,_0x42040c)=>{const _0x29dcdf=_0x41a6e9;return this[_0x29dcdf(0x22c)](_0x2179f2,!![],!![]),this[_0x29dcdf(0x496)](_0x29dcdf(0x57c),Number(_0x42040c)||0x0),'';});else SceneManager[_0x41a6e9(0x249)]()&&(_0x2179f2=_0x2179f2[_0x41a6e9(0x251)](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x497102,_0x27fe5b)=>{const _0x386058=_0x41a6e9;return this[_0x386058(0x22c)](_0x2179f2,!![],!![]),this[_0x386058(0x496)](_0x386058(0x3fd),0x0),'';}),_0x2179f2=_0x2179f2[_0x41a6e9(0x251)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x4fda2d,_0x586012)=>{const _0x187abd=_0x41a6e9;return this[_0x187abd(0x22c)](_0x2179f2,!![],!![]),this[_0x187abd(0x496)](_0x187abd(0x22a),Number(_0x586012)||0x1),'';}),_0x2179f2=_0x2179f2[_0x41a6e9(0x251)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x3292a3,_0x53bc62)=>{const _0x4d83f6=_0x41a6e9;return this['processAutoSize'](_0x2179f2,!![],!![]),this['processAutoPosition'](_0x4d83f6(0x30a),Number(_0x53bc62)||0x0),'';}),_0x2179f2=_0x2179f2['replace'](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x182c39,_0x1e214b)=>{const _0x54e8ac=_0x41a6e9;return this[_0x54e8ac(0x22c)](_0x2179f2,!![],!![]),this[_0x54e8ac(0x496)](_0x54e8ac(0x475),Number(_0x1e214b)||0x0),'';}));_0x537d45[_0x41a6e9(0x380)]=_0x2179f2;},Window_Message['_autoSizeRegexp']=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message[_0x44fc42(0x1ea)]=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message[_0x44fc42(0x532)][_0x44fc42(0x22c)]=function(_0x75309,_0x454660,_0xda9064){const _0xa5ef=_0x44fc42;_0x75309=_0x75309[_0xa5ef(0x251)](Window_Message[_0xa5ef(0x3e3)],''),_0x75309=_0x75309['replace'](Window_Message[_0xa5ef(0x1ea)],''),this[_0xa5ef(0x208)]=!![],this[_0xa5ef(0x43b)]=!![],this[_0xa5ef(0x36d)](![]);const _0x35158e=this[_0xa5ef(0x426)](_0x75309);if(_0x454660){let _0xd5233a=_0x35158e[_0xa5ef(0x4fa)]+$gameSystem['windowPadding']()*0x2+0x6;const _0x50cd18=$gameMessage['faceName']()!=='',_0x3dbcf3=ImageManager[_0xa5ef(0x35e)],_0x14daa6=0x14;_0xd5233a+=_0x50cd18?_0x3dbcf3+_0x14daa6:0x4;if(_0xd5233a%0x2!==0x0)_0xd5233a+=0x1;$gameSystem['setMessageWindowWidth'](_0xd5233a);}if(_0xda9064){let _0x243e7d=Math['ceil'](_0x35158e['height']/this[_0xa5ef(0x2db)]());$gameSystem[_0xa5ef(0x4a2)](_0x243e7d);}this['updateAutoSizePosition'](),this[_0xa5ef(0x3bc)](),this['_autoSizeCheck']=![],this[_0xa5ef(0x585)]=!![];},Window_Message[_0x44fc42(0x532)][_0x44fc42(0x2dd)]=function(){const _0x40a7e4=_0x44fc42;this[_0x40a7e4(0x3a4)](),this[_0x40a7e4(0x1e0)](),this[_0x40a7e4(0x1ca)](),this[_0x40a7e4(0x1e7)](),this['contents'][_0x40a7e4(0x488)](),this[_0x40a7e4(0x569)]();},Window_Message[_0x44fc42(0x532)][_0x44fc42(0x496)]=function(_0x172238,_0x590bf3){const _0x36a56a=_0x44fc42;switch(_0x172238[_0x36a56a(0x4cf)]()['trim']()){case _0x36a56a(0x525):this[_0x36a56a(0x42c)]=$gameActors[_0x36a56a(0x1c1)](_0x590bf3);break;case _0x36a56a(0x46a):this[_0x36a56a(0x42c)]=$gameParty[_0x36a56a(0x4b2)]()[_0x590bf3-0x1];break;case _0x36a56a(0x57c):this[_0x36a56a(0x42c)]=$gameTroop[_0x36a56a(0x4b2)]()[_0x590bf3-0x1];break;case'map\x20player':this[_0x36a56a(0x42c)]=$gamePlayer;break;case _0x36a56a(0x22a):const _0x34ae08=$gameActors[_0x36a56a(0x1c1)](_0x590bf3)[_0x36a56a(0x510)]();_0x34ae08===0x0?this['_autoPositionTarget']=$gamePlayer:this[_0x36a56a(0x42c)]=$gamePlayer[_0x36a56a(0x383)]()[_0x36a56a(0x3e6)](_0x34ae08-0x1);break;case _0x36a56a(0x30a):_0x590bf3===0x1?this['_autoPositionTarget']=$gamePlayer:this[_0x36a56a(0x42c)]=$gamePlayer[_0x36a56a(0x383)]()['follower'](_0x590bf3-0x2);break;case _0x36a56a(0x475):this[_0x36a56a(0x42c)]=$gameMap['event'](_0x590bf3);break;}this[_0x36a56a(0x42c)]&&this[_0x36a56a(0x4e0)]();},VisuMZ['MessageCore']['Window_Message_synchronizeNameBox']=Window_Message[_0x44fc42(0x532)][_0x44fc42(0x40a)],Window_Message[_0x44fc42(0x532)][_0x44fc42(0x40a)]=function(){const _0x3a3065=_0x44fc42;this[_0x3a3065(0x4e0)](),VisuMZ['MessageCore'][_0x3a3065(0x50c)][_0x3a3065(0x1d8)](this);},Window_Message[_0x44fc42(0x532)][_0x44fc42(0x4e0)]=function(){const _0x1d865a=_0x44fc42;if(!this['_autoPositionTarget'])return;const _0x5d91a1=SceneManager[_0x1d865a(0x52f)];if(!_0x5d91a1)return;const _0x1d96d0=_0x5d91a1[_0x1d865a(0x51e)];if(!_0x1d96d0)return;const _0x1411f4=_0x1d96d0[_0x1d865a(0x32d)](this[_0x1d865a(0x42c)]);if(!_0x1411f4)return;let _0x59e5b7=_0x1411f4['x'];if(SceneManager[_0x1d865a(0x249)]())_0x59e5b7*=$gameScreen[_0x1d865a(0x42a)]();else{if(SceneManager['isSceneBattle']()&&Imported[_0x1d865a(0x4a5)]){let _0x52c28a=_0x1411f4['x']-Graphics[_0x1d865a(0x1f5)]*_0x1d96d0[_0x1d865a(0x2c0)]['x'];_0x59e5b7+=_0x52c28a*(_0x1d96d0[_0x1d865a(0x2f6)]['x']-0x1);}}_0x59e5b7-=this['width']/0x2,_0x59e5b7-=(Graphics['width']-Graphics[_0x1d865a(0x1f5)])/0x2,_0x59e5b7+=this[_0x1d865a(0x533)]();let _0x4a91a3=_0x1411f4['y'];if(SceneManager[_0x1d865a(0x249)]())_0x4a91a3-=_0x1411f4['height']+0x8,_0x4a91a3*=$gameScreen['zoomScale'](),_0x4a91a3-=this['height']*$gameScreen[_0x1d865a(0x42a)]();else{if(SceneManager[_0x1d865a(0x484)]()&&Imported[_0x1d865a(0x4a5)]){let _0x567a39=_0x1411f4['height']*_0x1d96d0[_0x1d865a(0x2f6)]['y'];_0x4a91a3-=this[_0x1d865a(0x3fe)]*_0x1d96d0[_0x1d865a(0x2f6)]['y']+_0x567a39+0x8;let _0x1c0906=_0x1411f4['y']-Graphics[_0x1d865a(0x518)]*_0x1d96d0[_0x1d865a(0x2c0)]['y'];_0x4a91a3+=_0x1c0906*(_0x1d96d0[_0x1d865a(0x2f6)]['y']-0x1);}else _0x4a91a3-=_0x1411f4[_0x1d865a(0x3fe)]+0x8,_0x4a91a3-=this[_0x1d865a(0x3fe)];}_0x4a91a3-=(Graphics[_0x1d865a(0x3fe)]-Graphics[_0x1d865a(0x518)])/0x2,_0x4a91a3+=this[_0x1d865a(0x53c)]();const _0x36cf64=$gameSystem[_0x1d865a(0x3fc)]();_0x59e5b7+=_0x36cf64['x'],_0x4a91a3+=_0x36cf64['y'],this['x']=Math['round'](_0x59e5b7),this['y']=Math['round'](_0x4a91a3),this[_0x1d865a(0x49f)](!![],![]),this[_0x1d865a(0x218)]=this[_0x1d865a(0x218)]||{},this['_forcedPosition']['x']=this['x'],this['_forcedPosition']['y']=this['y'],this[_0x1d865a(0x218)][_0x1d865a(0x4fa)]=this[_0x1d865a(0x4fa)],this[_0x1d865a(0x218)][_0x1d865a(0x3fe)]=this['height'],this[_0x1d865a(0x22b)]['updatePlacement']();},Window_Message[_0x44fc42(0x532)][_0x44fc42(0x533)]=function(){return 0x0;},Window_Message[_0x44fc42(0x532)][_0x44fc42(0x53c)]=function(){return 0x0;},Window_Message[_0x44fc42(0x532)]['messagePositionReset']=function(){const _0x1597db=_0x44fc42;this[_0x1597db(0x585)]=![],this['_autoPositionTarget']=undefined,$gameSystem['initMessageCore'](),this['updateAutoSizePosition'](),this[_0x1597db(0x406)]=0x0;},Window_Message[_0x44fc42(0x532)][_0x44fc42(0x50d)]=function(_0x834b70){const _0x64b6a4=_0x44fc42;return Window_Base[_0x64b6a4(0x532)]['preConvertEscapeCharacters'][_0x64b6a4(0x1d8)](this,_0x834b70);},Window_Message['prototype'][_0x44fc42(0x36f)]=function(_0x26125a){const _0x12aecd=_0x44fc42;return Window_Base[_0x12aecd(0x532)][_0x12aecd(0x36f)][_0x12aecd(0x1d8)](this,_0x26125a);},Window_Message[_0x44fc42(0x532)][_0x44fc42(0x368)]=function(_0x208db1){const _0x3deb35=_0x44fc42;this[_0x3deb35(0x424)](_0x208db1),Window_Base[_0x3deb35(0x532)]['flushTextState']['call'](this,_0x208db1),this[_0x3deb35(0x4ba)](_0x208db1);},Window_Message[_0x44fc42(0x532)][_0x44fc42(0x424)]=function(_0x2ade50){},Window_Message[_0x44fc42(0x532)][_0x44fc42(0x4ba)]=function(_0x3df5ae){},Window_NameBox[_0x44fc42(0x532)][_0x44fc42(0x485)]=function(){return![];},Window_NameBox[_0x44fc42(0x532)][_0x44fc42(0x1d6)]=function(){const _0x3730cd=_0x44fc42;Window_Base[_0x3730cd(0x532)]['resetTextColor'][_0x3730cd(0x1d8)](this),this['changeTextColor'](this[_0x3730cd(0x41a)]());},Window_NameBox['prototype']['defaultColor']=function(){const _0xf4dfcf=_0x44fc42,_0x17bbfc=VisuMZ[_0xf4dfcf(0x4cc)][_0xf4dfcf(0x416)][_0xf4dfcf(0x282)]['NameBoxWindowDefaultColor'];return ColorManager['textColor'](_0x17bbfc);},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x28e)]=Window_NameBox[_0x44fc42(0x532)][_0x44fc42(0x1e0)],Window_NameBox[_0x44fc42(0x532)]['updatePlacement']=function(){const _0x593533=_0x44fc42;VisuMZ[_0x593533(0x4cc)]['Window_NameBox_updatePlacement'][_0x593533(0x1d8)](this),this[_0x593533(0x1df)](),this[_0x593533(0x376)](),this[_0x593533(0x49f)](),this[_0x593533(0x1f1)]();},Window_NameBox['prototype'][_0x44fc42(0x50d)]=function(_0x31fdb4){const _0x4e66d9=_0x44fc42;return _0x31fdb4=_0x31fdb4[_0x4e66d9(0x251)](/<LEFT>/gi,this[_0x4e66d9(0x28c)][_0x4e66d9(0x3a3)](this,0x0)),_0x31fdb4=_0x31fdb4[_0x4e66d9(0x251)](/<CENTER>/gi,this[_0x4e66d9(0x28c)][_0x4e66d9(0x3a3)](this,0x5)),_0x31fdb4=_0x31fdb4['replace'](/<RIGHT>/gi,this[_0x4e66d9(0x28c)]['bind'](this,0xa)),_0x31fdb4=_0x31fdb4[_0x4e66d9(0x251)](/<POSITION:[ ](\d+)>/gi,(_0x59323e,_0x284a50)=>this[_0x4e66d9(0x28c)](parseInt(_0x284a50))),_0x31fdb4=_0x31fdb4[_0x4e66d9(0x251)](/<\/LEFT>/gi,''),_0x31fdb4=_0x31fdb4[_0x4e66d9(0x251)](/<\/CENTER>/gi,''),_0x31fdb4=_0x31fdb4[_0x4e66d9(0x251)](/<\/RIGHT>/gi,''),_0x31fdb4=_0x31fdb4[_0x4e66d9(0x504)](),Window_Base[_0x4e66d9(0x532)][_0x4e66d9(0x50d)]['call'](this,_0x31fdb4);},Window_NameBox['prototype'][_0x44fc42(0x28c)]=function(_0x525948){const _0x3804aa=_0x44fc42;return this[_0x3804aa(0x212)]=_0x525948,'';},Window_NameBox['prototype'][_0x44fc42(0x1df)]=function(){const _0x30b731=_0x44fc42;if($gameMessage['isRTL']())return;this[_0x30b731(0x212)]=this['_relativePosition']||0x0;const _0x3b57d9=this[_0x30b731(0x39a)],_0x391055=Math[_0x30b731(0x388)](_0x3b57d9[_0x30b731(0x4fa)]*this[_0x30b731(0x212)]/0xa);this['x']=_0x3b57d9['x']+_0x391055-Math[_0x30b731(0x388)](this[_0x30b731(0x4fa)]/0x2),this['x']=this['x'][_0x30b731(0x1b6)](_0x3b57d9['x'],_0x3b57d9['x']+_0x3b57d9[_0x30b731(0x4fa)]-this[_0x30b731(0x4fa)]);},Window_NameBox[_0x44fc42(0x532)][_0x44fc42(0x376)]=function(){const _0x2e9c7=_0x44fc42;if($gameMessage[_0x2e9c7(0x21a)]())return;this[_0x2e9c7(0x212)]=this[_0x2e9c7(0x212)]||0x0;const _0x2ab2e6=VisuMZ[_0x2e9c7(0x4cc)][_0x2e9c7(0x416)][_0x2e9c7(0x282)]['NameBoxWindowOffsetX'],_0x384177=VisuMZ['MessageCore'][_0x2e9c7(0x416)]['General']['NameBoxWindowOffsetY'],_0x3c8a28=(0x5-this[_0x2e9c7(0x212)])/0x5;this['x']+=Math[_0x2e9c7(0x388)](_0x2ab2e6*_0x3c8a28),this['y']+=_0x384177;},Window_NameBox[_0x44fc42(0x532)][_0x44fc42(0x1f1)]=function(){const _0x14e2f9=_0x44fc42,_0x314201=this[_0x14e2f9(0x39a)],_0x4f4817=_0x314201['y'],_0x4c4edc=VisuMZ[_0x14e2f9(0x4cc)]['Settings'][_0x14e2f9(0x282)][_0x14e2f9(0x1da)];_0x4f4817>this['y']&&_0x4f4817<this['y']+this[_0x14e2f9(0x3fe)]-_0x4c4edc&&(this['y']=_0x314201['y']+_0x314201[_0x14e2f9(0x3fe)]);},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x3d0)]=Window_NameBox[_0x44fc42(0x532)][_0x44fc42(0x4fd)],Window_NameBox[_0x44fc42(0x532)][_0x44fc42(0x4fd)]=function(){const _0x2052af=_0x44fc42;this['_relativePosition']=0x0,VisuMZ['MessageCore'][_0x2052af(0x3d0)][_0x2052af(0x1d8)](this);},Window_ChoiceList[_0x44fc42(0x532)]['isWordWrapEnabled']=function(){return![];},Window_ChoiceList[_0x44fc42(0x532)][_0x44fc42(0x485)]=function(){return!![];},Window_ChoiceList[_0x44fc42(0x532)][_0x44fc42(0x38a)]=function(){const _0x5478e2=_0x44fc42;return $gameSystem[_0x5478e2(0x359)]()+0x8;},Window_ChoiceList['prototype'][_0x44fc42(0x2bb)]=function(){const _0x3cd324=_0x44fc42;return $gameSystem[_0x3cd324(0x27f)]();},Window_ChoiceList[_0x44fc42(0x532)][_0x44fc42(0x211)]=function(){const _0x3551d7=_0x44fc42;this['refresh'](),this[_0x3551d7(0x465)](),this[_0x3551d7(0x27e)](),this[_0x3551d7(0x1ce)](),this[_0x3551d7(0x351)]();},Window_ChoiceList[_0x44fc42(0x532)][_0x44fc42(0x53d)]=function(){const _0x4a0f5c=_0x44fc42;$gameMessage[_0x4a0f5c(0x2d7)](this[_0x4a0f5c(0x524)]()),this[_0x4a0f5c(0x39a)][_0x4a0f5c(0x33a)](),this[_0x4a0f5c(0x407)](),this[_0x4a0f5c(0x4e2)]&&(this[_0x4a0f5c(0x4e2)][_0x4a0f5c(0x488)](),this[_0x4a0f5c(0x4e2)][_0x4a0f5c(0x44c)]());},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x3b9)]=Window_ChoiceList[_0x44fc42(0x532)][_0x44fc42(0x515)],Window_ChoiceList[_0x44fc42(0x532)]['callCancelHandler']=function(){const _0x44c148=_0x44fc42;VisuMZ['MessageCore'][_0x44c148(0x3b9)]['call'](this),this[_0x44c148(0x4e2)]&&(this[_0x44c148(0x4e2)][_0x44c148(0x488)](),this[_0x44c148(0x4e2)]['hide']());},Window_ChoiceList[_0x44fc42(0x532)]['refresh']=function(){const _0x479d3b=_0x44fc42;this[_0x479d3b(0x507)](),this[_0x479d3b(0x382)](),this[_0x479d3b(0x39a)]&&(this[_0x479d3b(0x1e0)](),this[_0x479d3b(0x209)]()),this[_0x479d3b(0x569)](),this['updateBackground'](),this[_0x479d3b(0x2e2)](),Window_Selectable[_0x479d3b(0x532)][_0x479d3b(0x4fd)]['call'](this);},Window_ChoiceList[_0x44fc42(0x532)][_0x44fc42(0x382)]=function(){const _0xede972=_0x44fc42;$gameMessage[_0xede972(0x548)]?this[_0xede972(0x204)]():this[_0xede972(0x1cb)](),this[_0xede972(0x394)](),this[_0xede972(0x2cf)]();},Window_ChoiceList['prototype'][_0x44fc42(0x204)]=function(){const _0x40a491=_0x44fc42,_0x359d26=$gameMessage[_0x40a491(0x459)]();let _0x10eec1=0x0;for(let _0x3c1c45 of _0x359d26){_0x3c1c45=this[_0x40a491(0x562)](_0x3c1c45);if(this['isChoiceVisible'](_0x3c1c45)){const _0x44421b=this[_0x40a491(0x2c3)](_0x3c1c45),_0x229a23=this['isChoiceEnabled'](_0x3c1c45);this['addCommand'](_0x44421b,_0x40a491(0x4d3),_0x229a23,_0x10eec1);}_0x10eec1++;}},Window_ChoiceList[_0x44fc42(0x532)]['makeCommandListShuffle']=function(){const _0x420da5=_0x44fc42,_0x20f31a=$gameMessage[_0x420da5(0x459)](),_0x46a359=$gameMessage[_0x420da5(0x296)](),_0x362428=$gameMessage[_0x420da5(0x1bb)](),_0x801484=_0x20f31a[_0x420da5(0x2a3)];let _0x44cfb0=0x0;for(let _0x4d774c=0x0;_0x4d774c<_0x801484;_0x4d774c++){if(this['_list'][_0x420da5(0x2a3)]>=_0x362428)break;const _0x295181=_0x46a359[_0x4d774c];let _0x20f3dd=_0x20f31a[_0x295181];if(_0x20f3dd===undefined)continue;_0x20f3dd=this[_0x420da5(0x562)](_0x20f3dd);if(this[_0x420da5(0x445)](_0x20f3dd)){const _0x2d8ea7=this[_0x420da5(0x2c3)](_0x20f3dd),_0x37e7f0=this[_0x420da5(0x324)](_0x20f3dd);this[_0x420da5(0x431)](_0x2d8ea7,_0x420da5(0x4d3),_0x37e7f0,_0x295181);}_0x44cfb0++;}},Window_ChoiceList['prototype'][_0x44fc42(0x562)]=function(_0x1569ce){const _0x1655c6=_0x44fc42;return Window_Base[_0x1655c6(0x532)]['convertTextMacros'][_0x1655c6(0x1d8)](this,_0x1569ce);},Window_ChoiceList[_0x44fc42(0x532)]['isChoiceVisible']=function(_0x2c4018){const _0x4f3dfa=_0x44fc42;if(Imported['VisuMZ_1_EventsMoveCore'])$gameMessage[_0x4f3dfa(0x4b8)]();if(_0x2c4018[_0x4f3dfa(0x523)](/<HIDE>/i))return![];if(_0x2c4018['match'](/<SHOW>/i))return!![];if(_0x2c4018[_0x4f3dfa(0x523)](/<SHOW[ ](?:|ALL )(?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x21bcf9=RegExp['$1'][_0x4f3dfa(0x43a)](',')[_0x4f3dfa(0x44d)](_0x42afab=>Number(_0x42afab)||0x0);if(_0x21bcf9['some'](_0x2c0bf8=>!$gameSwitches[_0x4f3dfa(0x317)](_0x2c0bf8)))return![];}if(_0x2c4018[_0x4f3dfa(0x523)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x31a57d=RegExp['$1'][_0x4f3dfa(0x43a)](',')[_0x4f3dfa(0x44d)](_0x4e93fb=>Number(_0x4e93fb)||0x0);if(_0x31a57d[_0x4f3dfa(0x41b)](_0x1bad29=>!$gameSwitches['value'](_0x1bad29)))return![];}if(_0x2c4018['match'](/<HIDE[ ](?:|ALL )(?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x3dac40=RegExp['$1']['split'](',')[_0x4f3dfa(0x44d)](_0x15f746=>Number(_0x15f746)||0x0);if(_0x3dac40[_0x4f3dfa(0x41b)](_0x29857c=>$gameSwitches[_0x4f3dfa(0x317)](_0x29857c)))return![];}if(_0x2c4018[_0x4f3dfa(0x523)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x8e0725=RegExp['$1']['split'](',')[_0x4f3dfa(0x44d)](_0xa792c2=>Number(_0xa792c2)||0x0);if(_0x8e0725[_0x4f3dfa(0x460)](_0x4691c=>$gameSwitches['value'](_0x4691c)))return![];}return!![];},Window_ChoiceList['prototype'][_0x44fc42(0x2c3)]=function(_0x4625a8){const _0x1c2b34=_0x44fc42;let _0x1dd6df=_0x4625a8;return _0x1dd6df=_0x1dd6df['replace'](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x1dd6df=_0x1dd6df[_0x1c2b34(0x251)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x1dd6df;},Window_ChoiceList[_0x44fc42(0x532)][_0x44fc42(0x324)]=function(_0x1f48c9){const _0x3da77d=_0x44fc42;if(Imported[_0x3da77d(0x4b7)])$gameMessage[_0x3da77d(0x4b8)]();if(_0x1f48c9[_0x3da77d(0x523)](/<DISABLE>/i))return![];if(_0x1f48c9[_0x3da77d(0x523)](/<ENABLE>/i))return!![];if(_0x1f48c9['match'](/<ENABLE[ ](?:|ALL )(?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x4ef3eb=RegExp['$1'][_0x3da77d(0x43a)](',')[_0x3da77d(0x44d)](_0x2d9b30=>Number(_0x2d9b30)||0x0);if(_0x4ef3eb[_0x3da77d(0x460)](_0x143d40=>!$gameSwitches[_0x3da77d(0x317)](_0x143d40)))return![];}if(_0x1f48c9['match'](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x80f5aa=RegExp['$1'][_0x3da77d(0x43a)](',')[_0x3da77d(0x44d)](_0x21d8d3=>Number(_0x21d8d3)||0x0);if(_0x80f5aa[_0x3da77d(0x41b)](_0x404a77=>!$gameSwitches[_0x3da77d(0x317)](_0x404a77)))return![];}if(_0x1f48c9[_0x3da77d(0x523)](/<DISABLE[ ](?:|ALL )(?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x3aa00c=RegExp['$1'][_0x3da77d(0x43a)](',')[_0x3da77d(0x44d)](_0x3f9bb7=>Number(_0x3f9bb7)||0x0);if(_0x3aa00c[_0x3da77d(0x41b)](_0x50c0e0=>$gameSwitches[_0x3da77d(0x317)](_0x50c0e0)))return![];}if(_0x1f48c9[_0x3da77d(0x523)](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x46c9ef=RegExp['$1'][_0x3da77d(0x43a)](',')[_0x3da77d(0x44d)](_0x424eb0=>Number(_0x424eb0)||0x0);if(_0x46c9ef[_0x3da77d(0x460)](_0x49c415=>$gameSwitches[_0x3da77d(0x317)](_0x49c415)))return![];}return!![];},Window_ChoiceList[_0x44fc42(0x532)][_0x44fc42(0x394)]=function(){const _0x491842=_0x44fc42;this[_0x491842(0x47c)]={},this['_helpWindow']&&(this['_helpWindow']['clear'](),this[_0x491842(0x4e2)][_0x491842(0x44c)]());},Window_ChoiceList[_0x44fc42(0x532)][_0x44fc42(0x2cf)]=function(){const _0x4375d6=_0x44fc42,_0x57c76b=/<(?:HELP|HELP DESCRIPTION|DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:HELP|HELP DESCRIPTION|DESCRIPTION)>/i;for(const _0x4d6a8a of this[_0x4375d6(0x36b)]){if(!_0x4d6a8a)continue;const _0x429d3d=this['_list']['indexOf'](_0x4d6a8a);if(_0x4d6a8a['name'][_0x4375d6(0x523)](_0x57c76b)){const _0x1f612e=String(RegExp['$1']);this['_choiceHelpDescriptions'][_0x429d3d]=_0x1f612e[_0x4375d6(0x504)](),_0x4d6a8a['name']=_0x4d6a8a[_0x4375d6(0x247)][_0x4375d6(0x251)](_0x57c76b,'')[_0x4375d6(0x504)]();}else this[_0x4375d6(0x47c)][_0x429d3d]='';}},Window_ChoiceList[_0x44fc42(0x532)]['processFailsafeChoice']=function(){const _0x58371f=_0x44fc42;if(this[_0x58371f(0x36b)][_0x58371f(0x460)](_0x2a593e=>_0x2a593e[_0x58371f(0x323)]))return;this[_0x58371f(0x434)](),this[_0x58371f(0x407)](),$gameMessage['_choices']=[],this[_0x58371f(0x39a)][_0x58371f(0x357)]()&&this[_0x58371f(0x39a)][_0x58371f(0x51b)]();},VisuMZ[_0x44fc42(0x4cc)][_0x44fc42(0x443)]=Window_ChoiceList[_0x44fc42(0x532)][_0x44fc42(0x1e0)],Window_ChoiceList[_0x44fc42(0x532)][_0x44fc42(0x1e0)]=function(){const _0x14a85d=_0x44fc42;VisuMZ[_0x14a85d(0x4cc)][_0x14a85d(0x443)][_0x14a85d(0x1d8)](this),this['addChoiceDistance'](),this[_0x14a85d(0x49f)]();},Window_ChoiceList[_0x44fc42(0x532)][_0x44fc42(0x209)]=function(){const _0x43a903=_0x44fc42;if(!this[_0x43a903(0x3ed)])return;const _0x1a2bee=0x8,_0x496312=this[_0x43a903(0x3ed)],_0x3dfdde=this['x']+this['width'],_0x40425e=Math[_0x43a903(0x388)]((Graphics[_0x43a903(0x4fa)]-Graphics['boxWidth'])/0x2);_0x3dfdde>=Graphics[_0x43a903(0x1f5)]+_0x40425e-_0x496312[_0x43a903(0x4fa)]+_0x1a2bee?_0x496312['x']=-_0x496312[_0x43a903(0x4fa)]-_0x1a2bee:_0x496312['x']=this[_0x43a903(0x4fa)]+_0x1a2bee,_0x496312['y']=this['height']/0x2-_0x496312[_0x43a903(0x3fe)]/0x2;},VisuMZ[_0x44fc42(0x4cc)]['Window_ChoiceList_windowX']=Window_ChoiceList[_0x44fc42(0x532)][_0x44fc42(0x4eb)],Window_ChoiceList[_0x44fc42(0x532)][_0x44fc42(0x4eb)]=function(){const _0x4b8968=_0x44fc42;return this[_0x4b8968(0x39a)]?this[_0x4b8968(0x4bd)]():VisuMZ[_0x4b8968(0x4cc)]['Window_ChoiceList_windowX']['call'](this);},Window_ChoiceList['prototype'][_0x44fc42(0x4bd)]=function(){const _0x2bec2f=_0x44fc42,_0x115ae7=$gameMessage[_0x2bec2f(0x285)]();if(_0x115ae7===0x1)return(Graphics[_0x2bec2f(0x1f5)]-this[_0x2bec2f(0x3a8)]())/0x2;else return _0x115ae7===0x2?this[_0x2bec2f(0x39a)]['x']+this[_0x2bec2f(0x39a)][_0x2bec2f(0x4fa)]-this[_0x2bec2f(0x3a8)]():this['_messageWindow']['x'];},Window_ChoiceList[_0x44fc42(0x532)][_0x44fc42(0x3a8)]=function(){const _0x2330dd=_0x44fc42,_0x595c6e=(this[_0x2330dd(0x207)]()+this[_0x2330dd(0x41e)]())*this['maxCols']()+this[_0x2330dd(0x4af)]*0x2;return Math[_0x2330dd(0x375)](_0x595c6e,Graphics[_0x2330dd(0x4fa)]);},Window_ChoiceList[_0x44fc42(0x532)][_0x44fc42(0x1f8)]=function(){const _0x572c24=_0x44fc42,_0x4a12a7=$gameMessage[_0x572c24(0x459)]()[_0x572c24(0x44d)](_0x4674fe=>this[_0x572c24(0x562)](_0x4674fe))[_0x572c24(0x2be)](_0x47faab=>this[_0x572c24(0x445)](_0x47faab));let _0x368f19=Math[_0x572c24(0x398)](_0x4a12a7[_0x572c24(0x2a3)]/this[_0x572c24(0x2bb)]());if(!$gameMessage[_0x572c24(0x548)]){const _0x55b464=$gameMessage[_0x572c24(0x1bb)]();_0x368f19=Math['ceil'](Math[_0x572c24(0x375)](_0x55b464,_0x4a12a7['length'])/this[_0x572c24(0x2bb)]());}return Math['max'](0x1,Math['min'](_0x368f19,this[_0x572c24(0x2f9)]()));},Window_ChoiceList['prototype'][_0x44fc42(0x2f9)]=function(){const _0x273782=_0x44fc42,_0x8771bf=this['_messageWindow'],_0x5a7a14=_0x8771bf?_0x8771bf['y']:0x0,_0x35234f=_0x8771bf?_0x8771bf[_0x273782(0x3fe)]:0x0,_0x11fc99=Graphics[_0x273782(0x518)]/0x2;return _0x5a7a14<_0x11fc99&&_0x5a7a14+_0x35234f>_0x11fc99?0x4:$gameSystem[_0x273782(0x3a5)]();},Window_ChoiceList[_0x44fc42(0x532)][_0x44fc42(0x207)]=function(){const _0x5e826c=_0x44fc42;let _0x3b9729=this[_0x5e826c(0x31c)]();for(const _0x3c8bfe of this['_list']){const _0x347714=_0x3c8bfe[_0x5e826c(0x247)],_0x171a01=this[_0x5e826c(0x3f3)](_0x347714),_0x30049c=this[_0x5e826c(0x39f)](_0x347714)[_0x5e826c(0x4fa)]+_0x171a01,_0xb591b4=Math[_0x5e826c(0x398)](_0x30049c)+this[_0x5e826c(0x283)]()*0x2;_0x3b9729=Math[_0x5e826c(0x267)](_0x3b9729,_0xb591b4);}return _0x3b9729;},Window_ChoiceList[_0x44fc42(0x532)]['getStartingChoiceWidth']=function(){const _0x58f9ea=_0x44fc42;let _0x4ca167=$gameSystem[_0x58f9ea(0x2ef)]();const _0x209fbb=$gameMessage['choices']();for(const _0x1f0558 of _0x209fbb){_0x1f0558[_0x58f9ea(0x523)](/<CHOICE WIDTH:[ ](\d+)>/gi)&&(_0x4ca167=Math[_0x58f9ea(0x267)](_0x4ca167,Number(RegExp['$1'])));}return Math['max'](_0x4ca167,0x1);},Window_ChoiceList['prototype'][_0x44fc42(0x355)]=function(){const _0x434e65=_0x44fc42,_0x1380b5=$gameSystem['getChoiceMessageDistance']()||0x0,_0x17093f=this['_messageWindow']['y'],_0x3e192d=this[_0x434e65(0x39a)][_0x434e65(0x3fe)],_0x37a769=this['_messageWindow'][_0x434e65(0x22b)],_0x5ad544=_0x37a769['openness']>0x0&&_0x37a769['width']>0x0,_0x156166=_0x5ad544?_0x37a769[_0x434e65(0x3fe)]:0x0;if(_0x1380b5<0x0&&(this['_messageWindow'][_0x434e65(0x516)]()||this[_0x434e65(0x39a)]['isClosing']()))this['y']=Math['round']((Graphics[_0x434e65(0x518)]-this['height'])/0x2);else{if(_0x17093f>=Graphics[_0x434e65(0x518)]/0x2)_0x1380b5>=0x0?this['y']-=_0x1380b5:this['y']=Math['floor']((_0x17093f-this[_0x434e65(0x3fe)]-_0x156166)/0x2);else{if(_0x1380b5>=0x0)this['y']+=_0x1380b5;else{const _0x2a2a71=Graphics['boxHeight']-(_0x17093f+_0x3e192d+_0x156166);this['y']+=Math[_0x434e65(0x388)]((_0x2a2a71-this[_0x434e65(0x3fe)])/0x2)+_0x156166;}}}},Window_ChoiceList[_0x44fc42(0x532)][_0x44fc42(0x2b1)]=function(_0x2e7fa9){const _0x3304cf=_0x44fc42,_0x99f602=this['requestChoiceForegroundImage'](_0x2e7fa9);if(_0x99f602){const _0xa84a24=ImageManager['loadPicture'](_0x99f602),_0x4c8a71=this[_0x3304cf(0x568)](),_0x24ecbc=_0x4c8a71+this[_0x3304cf(0x1c4)](_0x2e7fa9),_0x6b841a=this[_0x3304cf(0x4c5)](_0x2e7fa9);_0xa84a24[_0x3304cf(0x1f3)](this[_0x3304cf(0x330)][_0x3304cf(0x3a3)](this,_0x2e7fa9,!![],_0x24ecbc,_0x6b841a,_0xa84a24));return;}this['drawItemContents'](_0x2e7fa9);},Window_ChoiceList['prototype'][_0x44fc42(0x3b5)]=function(_0x4f465c){const _0x25105f=_0x44fc42,_0x51bef9=this[_0x25105f(0x4c5)](_0x4f465c),_0x56e4e2=this[_0x25105f(0x568)](),_0x5cf1ea=_0x56e4e2+this[_0x25105f(0x1c4)](_0x4f465c);this['changePaintOpacity'](this['isCommandEnabled'](_0x4f465c));const _0x27a385=this[_0x25105f(0x39f)](_0x5cf1ea)[_0x25105f(0x3fe)],_0x36dbb0=_0x51bef9['x']+this[_0x25105f(0x3f3)](_0x5cf1ea),_0x240b0b=Math[_0x25105f(0x267)](_0x51bef9['y'],_0x51bef9['y']+Math[_0x25105f(0x47a)]((_0x51bef9[_0x25105f(0x3fe)]-_0x27a385)/0x2));this[_0x25105f(0x202)](_0x5cf1ea,_0x36dbb0,_0x240b0b,_0x51bef9['width']),this[_0x25105f(0x33d)](_0x4f465c),this[_0x25105f(0x2f7)](_0x4f465c,_0x5cf1ea,_0x51bef9);},Window_ChoiceList[_0x44fc42(0x532)]['choiceAlignText']=function(){const _0x590ac0=_0x44fc42;return $gameSystem[_0x590ac0(0x2e8)]()!==_0x590ac0(0x2c2)?_0x590ac0(0x292)[_0x590ac0(0x20d)]($gameSystem[_0x590ac0(0x2e8)]()):'';},Window_ChoiceList['prototype']['getChoiceIndent']=function(_0x3a9393){let _0x128d88=0x0;return _0x3a9393['match'](/<(?:CHOICE|CHOICE |)INDENT:[ ](\d+)>/gi)&&(_0x128d88=Number(RegExp['$1'])),_0x128d88;},Window_ChoiceList[_0x44fc42(0x532)][_0x44fc42(0x33d)]=function(_0x361066){const _0x104c84=_0x44fc42;if(!Imported[_0x104c84(0x3b6)])return;const _0x577b9e=this[_0x104c84(0x1c4)](_0x361066);let _0x3c8698=![],_0x5c19ec=![],_0x2fcf9d=ColorManager['itemBackColor1'](),_0x3fedc7=ColorManager[_0x104c84(0x55c)]();if(_0x577b9e[_0x104c84(0x523)](/<(?:BGCOLOR|BG COLOR):[ ](.*?),(.*?)>/gi))_0x2fcf9d=ColorManager[_0x104c84(0x28f)](RegExp['$1'])['trim'](),_0x3fedc7=ColorManager[_0x104c84(0x28f)](RegExp['$2'])[_0x104c84(0x504)](),_0x3c8698=!![];else{if(_0x577b9e['match'](/<(?:BGCOLOR|BG COLOR):[ ](.*?)>/gi)){let _0x30ec51=String(RegExp['$1'])[_0x104c84(0x4cf)]()[_0x104c84(0x504)]();switch(_0x30ec51){case'red':_0x2fcf9d=_0x3fedc7=_0x104c84(0x421),_0x5c19ec=!![];break;case'orange':_0x2fcf9d=_0x3fedc7=_0x104c84(0x2d5),_0x5c19ec=!![];break;case _0x104c84(0x53a):_0x2fcf9d=_0x3fedc7='#fff799',_0x5c19ec=!![];break;case'green':_0x2fcf9d=_0x3fedc7=_0x104c84(0x384),_0x5c19ec=!![];break;case'blue':_0x2fcf9d=_0x3fedc7=_0x104c84(0x4ea),_0x5c19ec=!![];break;case'purple':case _0x104c84(0x287):_0x2fcf9d=_0x3fedc7=_0x104c84(0x1fd),_0x5c19ec=!![];break;case'brown':_0x2fcf9d=_0x3fedc7=_0x104c84(0x1ee),_0x5c19ec=!![];break;case _0x104c84(0x367):_0x2fcf9d=_0x3fedc7=_0x104c84(0x31b),_0x5c19ec=!![];break;case _0x104c84(0x2a9):_0x2fcf9d=_0x3fedc7=_0x104c84(0x29b),_0x5c19ec=!![];break;case _0x104c84(0x4ad):case'grey':_0x2fcf9d=_0x3fedc7=_0x104c84(0x30e),_0x5c19ec=!![];break;case _0x104c84(0x2d3):_0x2fcf9d=_0x3fedc7=_0x104c84(0x4a9),_0x5c19ec=!![];break;case _0x104c84(0x543):_0x2fcf9d=_0x3fedc7=ColorManager['powerUpColor'](),_0x5c19ec=!![];break;case'no':_0x2fcf9d=_0x3fedc7=ColorManager[_0x104c84(0x571)](),_0x5c19ec=!![];break;case _0x104c84(0x303):_0x2fcf9d=_0x3fedc7=ColorManager['systemColor'](),_0x5c19ec=!![];break;case _0x104c84(0x3c8):_0x2fcf9d=_0x3fedc7=ColorManager[_0x104c84(0x23f)](),_0x5c19ec=!![];break;default:_0x2fcf9d=_0x3fedc7=ColorManager[_0x104c84(0x28f)](_0x30ec51),_0x5c19ec=!![];break;}_0x3c8698=!![];}}if(!_0x3c8698)return;const _0x4b7274=this[_0x104c84(0x4c0)](_0x361066);this[_0x104c84(0x1be)][_0x104c84(0x49e)](_0x4b7274['x'],_0x4b7274['y'],_0x4b7274[_0x104c84(0x4fa)],_0x4b7274['height']),this[_0x104c84(0x4c1)](_0x4b7274,_0x2fcf9d,_0x3fedc7,_0x5c19ec);},Window_ChoiceList['prototype'][_0x44fc42(0x4c1)]=function(_0x3613a6,_0x5e7446,_0x23b46a,_0x57b7f6){const _0x5e4563=_0x44fc42,_0x12a545=ColorManager['itemBackColor1'](),_0x473296=ColorManager[_0x5e4563(0x334)](),_0x17ce59=_0x5e7446??ColorManager[_0x5e4563(0x40f)](),_0x5a2d98=_0x23b46a??_0x5e7446,_0x2b4363=_0x3613a6['x'],_0x4e685f=_0x3613a6['y'],_0x145d11=_0x3613a6[_0x5e4563(0x4fa)],_0x44a433=_0x3613a6['height'];this['contentsBack'][_0x5e4563(0x463)](_0x2b4363,_0x4e685f,_0x145d11,_0x44a433,_0x17ce59,_0x5a2d98,!![]),_0x57b7f6&&this['contentsBack'][_0x5e4563(0x463)](_0x2b4363,_0x4e685f,_0x145d11,_0x44a433,_0x12a545,_0x5a2d98,!![]),this[_0x5e4563(0x1be)][_0x5e4563(0x440)](_0x2b4363,_0x4e685f,_0x145d11,_0x44a433,_0x12a545);},Window_ChoiceList[_0x44fc42(0x532)][_0x44fc42(0x468)]=function(_0x4a827a){const _0x46eb8d=_0x44fc42,_0x307992=this[_0x46eb8d(0x568)](),_0x194e91=_0x307992+this[_0x46eb8d(0x1c4)](_0x4a827a);let _0x420763='';if(_0x194e91[_0x46eb8d(0x523)](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/i))_0x420763=String(RegExp['$1'])['trim']();else _0x194e91['match'](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i)&&(_0x420763=String(RegExp['$2'])[_0x46eb8d(0x504)]());return _0x420763;},Window_ChoiceList[_0x44fc42(0x532)][_0x44fc42(0x2f7)]=function(_0x30bdd2,_0x5d9ad8,_0x37f2a4){const _0x4bb5aa=_0x44fc42;let _0x9ac8e8='';if(_0x5d9ad8[_0x4bb5aa(0x523)](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/i))_0x9ac8e8=String(RegExp['$1'])[_0x4bb5aa(0x504)]();else _0x5d9ad8[_0x4bb5aa(0x523)](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i)&&(_0x9ac8e8=String(RegExp['$2'])[_0x4bb5aa(0x504)]());if(_0x9ac8e8){const _0x2a02f5=ImageManager['loadPicture'](_0x9ac8e8);_0x2a02f5['addLoadListener'](this[_0x4bb5aa(0x330)][_0x4bb5aa(0x3a3)](this,_0x30bdd2,![],_0x5d9ad8,_0x37f2a4,_0x2a02f5));}},Window_ChoiceList['prototype'][_0x44fc42(0x330)]=function(_0x38ce26,_0x1a7831,_0x401baa,_0x182b06,_0x1dfd4f){const _0x39e156=_0x44fc42,_0x3d59a5=this[_0x39e156(0x568)](),_0x3e01c5=_0x3d59a5+this[_0x39e156(0x1c4)](_0x38ce26);if(_0x401baa!==_0x3e01c5)return;const _0x58f5d6=this[_0x39e156(0x4c5)](_0x38ce26);if(['x','y',_0x39e156(0x4fa),_0x39e156(0x3fe)]['some'](_0xb22f01=>_0x58f5d6[_0xb22f01]!==_0x182b06[_0xb22f01]))return;let _0x34fa51=0x0,_0x1fdebe='';if(_0x1a7831&&_0x3e01c5['match'](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/i)){}else{if(_0x1a7831&&_0x3e01c5[_0x39e156(0x523)](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i))_0x1fdebe=String(RegExp['$1'])[_0x39e156(0x4cf)]()[_0x39e156(0x504)]();else!_0x1a7831&&_0x3e01c5[_0x39e156(0x523)](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i)&&(_0x1fdebe=String(RegExp['$1'])[_0x39e156(0x4cf)]()[_0x39e156(0x504)]());}switch(_0x1fdebe){case _0x39e156(0x582):case _0x39e156(0x309):case _0x39e156(0x447):case _0x39e156(0x57b):case _0x39e156(0x4d4):case _0x39e156(0x1b9):case'1':_0x34fa51=0x1;break;case _0x39e156(0x534):case _0x39e156(0x2c8):case _0x39e156(0x46c):case'downcenter':case _0x39e156(0x52d):case _0x39e156(0x558):case _0x39e156(0x37f):case'2':_0x34fa51=0x2;break;case _0x39e156(0x2c7):case'lower-right':case'lower\x20right':case _0x39e156(0x44f):case _0x39e156(0x389):case _0x39e156(0x53f):case'3':_0x34fa51=0x3;break;case _0x39e156(0x1c0):case _0x39e156(0x3f8):case'left':case'4':_0x34fa51=0x4;break;case'midcenter':case'middlecenter':case _0x39e156(0x4a8):case _0x39e156(0x331):case'5':_0x34fa51=0x5;break;case _0x39e156(0x302):case _0x39e156(0x39b):case _0x39e156(0x4ec):case'6':_0x34fa51=0x6;break;case _0x39e156(0x2ce):case _0x39e156(0x31a):case _0x39e156(0x4ab):case _0x39e156(0x4ce):case'up-left':case _0x39e156(0x404):case'7':_0x34fa51=0x7;break;case'uppercenter':case _0x39e156(0x1f9):case'upper\x20center':case _0x39e156(0x26e):case _0x39e156(0x4de):case _0x39e156(0x3f5):case'up':case'8':_0x34fa51=0x8;break;case _0x39e156(0x3b0):case _0x39e156(0x24b):case _0x39e156(0x46f):case'upright':case _0x39e156(0x461):case _0x39e156(0x522):case'9':_0x34fa51=0x9;break;}const _0x39d22a=_0x1a7831?this['contents']:this['contentsBack'],_0x3cd50c=this[_0x39e156(0x4c0)](_0x38ce26);!_0x1a7831&&_0x39d22a[_0x39e156(0x49e)](_0x3cd50c['x']-0x1,_0x3cd50c['y']-0x1,_0x3cd50c[_0x39e156(0x4fa)]+0x2,_0x3cd50c[_0x39e156(0x3fe)]+0x2);const _0x50ba05=_0x3cd50c['x']+0x2,_0x1312e6=_0x3cd50c['y']+0x2,_0x2364c3=_0x3cd50c[_0x39e156(0x4fa)]-0x4,_0x109edc=_0x3cd50c[_0x39e156(0x3fe)]-0x4,_0x326d20=_0x1dfd4f['width'],_0x23eedd=_0x1dfd4f[_0x39e156(0x3fe)];let _0x1295f2=_0x50ba05,_0x10a563=_0x1312e6,_0x451e72=_0x2364c3,_0x29543c=_0x109edc;const _0x81480d=_0x2364c3/_0x326d20,_0x289097=_0x109edc/_0x23eedd;let _0x6f11b6=Math[_0x39e156(0x375)](_0x81480d,_0x289097);if(_0x1a7831)_0x6f11b6=Math[_0x39e156(0x375)](_0x6f11b6,0x1);_0x34fa51!==0x0&&(_0x451e72=Math[_0x39e156(0x47a)](_0x326d20*_0x6f11b6),_0x29543c=Math[_0x39e156(0x47a)](_0x23eedd*_0x6f11b6));switch(_0x34fa51){case 0x1:case 0x4:case 0x7:_0x1295f2=_0x50ba05;break;case 0x2:case 0x5:case 0x8:_0x1295f2+=Math[_0x39e156(0x47a)]((_0x2364c3-_0x451e72)/0x2);break;case 0x3:case 0x6:case 0x9:_0x1295f2+=_0x2364c3-_0x451e72;break;}switch(_0x34fa51){case 0x7:case 0x8:case 0x9:_0x10a563=_0x1312e6;break;case 0x4:case 0x5:case 0x6:_0x10a563+=Math[_0x39e156(0x47a)]((_0x109edc-_0x29543c)/0x2);break;case 0x1:case 0x2:case 0x3:_0x10a563+=_0x109edc-_0x29543c;break;}_0x39d22a[_0x39e156(0x1c2)](_0x1dfd4f,0x0,0x0,_0x326d20,_0x23eedd,_0x1295f2,_0x10a563,_0x451e72,_0x29543c),_0x1a7831&&this[_0x39e156(0x3b5)](_0x38ce26);},Window_ChoiceList['prototype'][_0x44fc42(0x4a6)]=function(){const _0x229550=_0x44fc42;this['_helpWindow'][_0x229550(0x488)]();if(!this['_choiceHelpDescriptions'])return;const _0x48658c=this[_0x229550(0x510)]();this['_choiceHelpDescriptions'][_0x48658c]?(this[_0x229550(0x4e2)][_0x229550(0x320)](this[_0x229550(0x47c)][_0x48658c]),this[_0x229550(0x4e2)][_0x229550(0x395)]()):(this['_helpWindow']['clear'](),this[_0x229550(0x4e2)]['hide']());},Window_EventItem['prototype'][_0x44fc42(0x289)]=function(){const _0x4d8c07=_0x44fc42,_0x581851=$gameMessage[_0x4d8c07(0x3a7)]();_0x581851===_0x4d8c07(0x4db)&&Imported[_0x4d8c07(0x4b0)]?this[_0x4d8c07(0x43d)]():Window_ItemList[_0x4d8c07(0x532)]['makeItemList']['call'](this);},Window_EventItem[_0x44fc42(0x532)][_0x44fc42(0x43d)]=function(){const _0x2517c2=_0x44fc42,_0x339b5c=$gameMessage[_0x2517c2(0x234)]();this['_data']=_0x339b5c?_0x339b5c['skills']()[_0x2517c2(0x2be)](_0x5ad189=>this['includes'](_0x5ad189)):[],this[_0x2517c2(0x4f0)](null)&&this[_0x2517c2(0x278)][_0x2517c2(0x3a1)](null);},VisuMZ['MessageCore'][_0x44fc42(0x304)]=Window_EventItem[_0x44fc42(0x532)][_0x44fc42(0x4f0)],Window_EventItem[_0x44fc42(0x532)]['includes']=function(_0x5605ed){const _0x45e1bc=_0x44fc42,_0x4be559=$gameMessage[_0x45e1bc(0x3a7)]();if(_0x4be559===_0x45e1bc(0x52b)){if(!DataManager[_0x45e1bc(0x48b)](_0x5605ed))return![];const _0x55efef=$gameMessage[_0x45e1bc(0x499)]();if(_0x55efef>0x0){if(_0x5605ed[_0x45e1bc(0x3be)]!==_0x55efef)return![];}return!![];}else{if(_0x4be559===_0x45e1bc(0x216)){if(!DataManager['isArmor'](_0x5605ed))return![];const _0x18c40b=$gameMessage[_0x45e1bc(0x4dc)]();if(_0x18c40b>0x0){if(_0x5605ed['atypeId']!==_0x18c40b)return![];}const _0x40c9a5=$gameMessage[_0x45e1bc(0x48d)]();if(_0x40c9a5>0x0){if(_0x5605ed[_0x45e1bc(0x2a2)]!==_0x40c9a5)return![];}return!![];}else{if(_0x4be559===_0x45e1bc(0x4db)){if(!DataManager[_0x45e1bc(0x47b)](_0x5605ed))return![];const _0x363f52=$gameMessage['itemChoiceActor']();if(_0x363f52['isSkillHidden'](_0x5605ed))return![];if(!_0x363f52['isSkillTypeMatchForUse'](_0x5605ed))return![];const _0x1c4dcb=$gameMessage['itemChoiceStypeId']();if(_0x1c4dcb>0x0){const _0x57be00=DataManager[_0x45e1bc(0x37a)](_0x5605ed);if(!_0x57be00[_0x45e1bc(0x4f0)](_0x1c4dcb))return![];}return!![];}else return VisuMZ['MessageCore'][_0x45e1bc(0x304)][_0x45e1bc(0x1d8)](this,_0x5605ed);}}},VisuMZ['MessageCore'][_0x44fc42(0x462)]=Window_ItemList[_0x44fc42(0x532)][_0x44fc42(0x3e1)],Window_ItemList[_0x44fc42(0x532)][_0x44fc42(0x3e1)]=function(_0x4ca6ce,_0x469cd0,_0x13feec,_0x27f131){const _0x32fb05=_0x44fc42,_0xaff85a=$gameMessage[_0x32fb05(0x3a7)]();if(_0xaff85a===_0x32fb05(0x4db)){const _0xd22962=$gameMessage['itemChoiceActor']();this[_0x32fb05(0x349)](_0xd22962,_0x4ca6ce,_0x469cd0,_0x13feec,_0x27f131);}else VisuMZ[_0x32fb05(0x4cc)][_0x32fb05(0x462)][_0x32fb05(0x1d8)](this,_0x4ca6ce,_0x469cd0,_0x13feec,_0x27f131);},Window_MapName[_0x44fc42(0x532)][_0x44fc42(0x41f)]=function(){const _0x5db1be=_0x44fc42;this['contents']['clear']();let _0x2f7c74=$gameMap['displayName']();if(_0x2f7c74){const _0x425207=this[_0x5db1be(0x425)];this[_0x5db1be(0x271)](0x0,0x0,_0x425207,this[_0x5db1be(0x2db)]()),_0x2f7c74=this[_0x5db1be(0x3f0)](_0x2f7c74);const _0xdaa2b5=this[_0x5db1be(0x39f)](_0x2f7c74)[_0x5db1be(0x4fa)];this['drawTextEx'](_0x2f7c74,Math['floor']((_0x425207-_0xdaa2b5)/0x2),0x0);}},Window_MapName['prototype'][_0x44fc42(0x3f0)]=function(_0xe70aca){const _0x170385=_0x44fc42;if(_0xe70aca[_0x170385(0x523)](/<LEFT>/gi))this['x']=0x0;else{if(_0xe70aca[_0x170385(0x523)](/<CENTER>/gi))this['x']=Math['floor']((Graphics[_0x170385(0x1f5)]-this['width'])/0x2);else _0xe70aca[_0x170385(0x523)](/<RIGHT>/gi)&&(this['x']=Graphics[_0x170385(0x1f5)]-this[_0x170385(0x4fa)]);}_0xe70aca=_0xe70aca[_0x170385(0x251)](/<(?:LEFT|CENTER|RIGHT)>/gi,''),_0xe70aca=_0xe70aca[_0x170385(0x251)](/<\/(?:LEFT|CENTER|RIGHT)>/gi,'');if(_0xe70aca['match'](/<TOP>/gi))this['y']=0x0;else{if(_0xe70aca[_0x170385(0x523)](/<MIDDLE>/gi))this['y']=Math[_0x170385(0x388)]((Graphics[_0x170385(0x518)]-this['height'])/0x2);else _0xe70aca[_0x170385(0x523)](/<BOTTOM>/gi)&&(this['y']=Graphics['boxHeight']-this[_0x170385(0x3fe)]);}return _0xe70aca=_0xe70aca[_0x170385(0x251)](/<(?:TOP|MIDDLE|BOTTOM)>/gi,''),_0xe70aca=_0xe70aca[_0x170385(0x251)](/<\/(?:TOP|MIDDLE|BOTTOM)>/gi,''),_0xe70aca[_0x170385(0x523)](/<X:[ ]([\+\-]\d+)>/gi)&&(this['x']+=Number(RegExp['$1']),_0xe70aca=_0xe70aca[_0x170385(0x251)](/<X:[ ]([\+\-]\d+)>/gi,'')),_0xe70aca[_0x170385(0x523)](/<Y:[ ]([\+\-]\d+)>/gi)&&(this['y']+=Number(RegExp['$1']),_0xe70aca=_0xe70aca[_0x170385(0x251)](/<Y:[ ]([\+\-]\d+)>/gi,'')),_0xe70aca;};