//=============================================================================
// MPP_MapLight.js
//=============================================================================
// Copyright (c) 2018 - 2024 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc Allows you to set the brightness of the map.
 * @author Mokusei Penguin
 * @url 
 *
 * @help [version 4.0.3]
 * - This plugin is for RPG Maker MV and MZ.
 * 
 * ▼ Specification
 *  - Only one CharLight and one FrontLight can be added to each character.
 *  - Lights created on events and maps will be reset by changing the map.
 *  - The player's lights will remain even if the map is changed.
 *  - Event lights whose Priority is set to [Above characters]
 *    will be displayed above other lights.
 * 
 * ▼ Plugin command
 *  - In MV, the variable N is referred to by writing v [N] in the item for
 *    inputting a numerical value.
 *  - In MZ, in the item to enter a numerical value, select the text and
 *    write v [N] to refer to the variable N.
 *  - For the color index (c), specify the one set in the plug-in parameter
 *    [Light Colors].
 * 
 *  〇 MV / MZ
 * 
 *  〇 SetCharLight evId r c a  / setCharLight
 *      evId : -1:Player, 0:This event, 1..:EventID
 *      r    : radius(1 = 1 tile)
 *      c    : color index(Erase with 0)
 *      a    : amplitude(Specify from 0-100 / No blinking at 0 / Not set is 0)
 *   - The light is displayed around the character.
 * 
 *  〇 SetPosLight x y r c a  / setPosLight
 *      x   : X coordinate
 *      y   : Y coordinate
 *      r   : radius(1 = 1 tile)
 *      c   : color index(Erase with 0)
 *      a   : amplitude(Specify from 0-100 / No blinking at 0 / Not set is 0)
 *   - Lights up at the specified coordinates (x, y).
 * 
 *  〇 SetFrontLight evId c a  / setFrontLight
 *      evId : -1:Player, 0:This event, 1..:EventID
 *      c    : color index(Erase with 0)
 *      a    : amplitude(Specify from 0-100 / No blinking at 0 / Not set is 0)
 *   - A light is displayed in front of the character.
 * 
 *  〇 SetCharLightOffset evId x y  / setCharLightOffset
 *      evId : -1:Player, 0:This event, 1..:EventID
 *      x    : X coordinate(1 = 1px)
 *      y    : Y coordinate(1 = 1px)
 *   - Shift the center position of CharLight.
 * 
 *  〇 EraseCharLight evId  / eraseCharLight
 *      evId : -1:Player, 0:This event, 1..:EventID
 *   - Turns off the lights centered on the character.
 * 
 *  〇 ErasePosLight x y  / erasePosLight
 *      x   : X coordinate
 *      y   : Y coordinate
 *   - Turns off the light at the specified coordinates (x, y).
 * 
 *  〇 EraseFrontLight evId  / eraseFrontLight
 *      evId : -1:Player, 0:This event, 1..:EventID
 *   - Turns off the light that illuminates the front of the character.
 * 
 *  〇 SetMapDarkness d  / setDarkness
 *      d : Map darkness(Specify from 0-100)
 *   - Change the darkness of the map.
 * 
 *  〇 MoveMapDarkness d t  / moveDarkness
 *      d : Map darkness(Specify from 0-100)
 *      t : duration
 *   - Gradually change the darkness of the map.
 * 
 *  〇 SetMapDarknessColor r g b  / setDarknessColor
 *   - Change the darkness color of the map.
 *   - Colors are processed by multiplication. (White cannot be used)
 * 
 * ▼ Map notes
 *  〇 <Darkness:n>
 *      n : Map darkness(Specify from 0-100)
 *   - Specifies the darkness of the map.
 *   - By writing v[n], the value of the nth variable is referenced.
 *   - However, it is only referenced when you switch maps.
 * 
 *  〇 <DarknessColor:r,g,b>
 *   - Specifies the darkness color of the map.
 *   - Colors are processed by multiplication. (White cannot be used)
 * 
 *  〇 <PosLight X,Y:r,c,a>
 *      X   : X coordinate
 *      Y   : Y coordinate
 *      r   : radius(1 = 1 tile)
 *      c   : color index
 *      a   : amplitude(Specify from 0-100 / No blinking at 0 / Not set is 0)
 *   - Places the light at the specified coordinates (x, y).
 * 
 * ▼ Annotation of event execution content
 *  〇 CharLight r c a
 *      r   : radius(1 = 1 tile)
 *      c   : color index
 *      a   : amplitude(Specify from 0-100 / No blinking at 0 / Not set is 0)
 *   - Lights are displayed around this event.
 *   - This command applies only to the first annotation of the execution.
 * 
 *  〇 FrontLight c a
 *      c   : color index
 *      a   : amplitude(Specify from 0-100 / No blinking at 0 / Not set is 0)
 *   - Shows the lights that illuminate the front of this event.
 *   - This command applies only to the first annotation of the execution.
 * 
 *  〇 LightOffset x y
 *      x : X coordinate(1 = 1px)
 *      Y : Y coordinate(1 = 1px)
 *   - Displays the light position shifted by the specified coordinates.
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @command setCharLight
 *      @desc 
 *      @arg character
 *          @desc -1:Player, 0:This event, 1..:EventID
 *          @type number
 *              @min -1
 *              @max 999
 *          @default 0
 *      @arg radius
 *          @desc 1 = 1 tile
 *          @type number
 *              @min 0
 *              @max 99
 *          @default 1
 *      @arg colorIndex
 *          @desc Specified by plug-in parameter [Light Colors] / 0:erase
 *          @type number
 *              @min 0
 *              @max 99
 *          @default 1
 *      @arg amplitude
 *          @desc 0-100
 *          @type number
 *              @min 0
 *              @max 100
 *          @default 0
 * 
 *  @command setPosLight
 *      @desc 
 *      @arg x
 *          @desc 
 *          @type number
 *              @min -9999
 *              @max 9999
 *          @default 0
 *      @arg y
 *          @desc 
 *          @type number
 *              @min -9999
 *              @max 9999
 *          @default 0
 *      @arg radius
 *          @desc 1 = 1 tile
 *          @type number
 *              @min 0
 *              @max 99
 *          @default 1
 *      @arg colorIndex
 *          @desc Specified by plug-in parameter [Light Colors] / 0:erase
 *          @type number
 *              @min 0
 *              @max 99
 *          @default 1
 *      @arg amplitude
 *          @desc 0-100
 *          @type number
 *              @min 0
 *              @max 100
 *          @default 0
 * 
 *  @command setFrontLight
 *      @desc 
 *      @arg character
 *          @desc -1:Player, 0:This event, 1..:EventID
 *          @type number
 *              @min -1
 *              @max 999
 *          @default 0
 *      @arg colorIndex
 *          @desc Specified by plug-in parameter [Light Colors] / 0:erase
 *          @type number
 *              @min 0
 *              @max 99
 *          @default 1
 *      @arg amplitude
 *          @desc 0-100
 *          @type number
 *              @min 0
 *              @max 100
 *          @default 0
 * 
 *  @command setCharLightOffset
 *      @desc 
 *      @arg character
 *          @desc -1:Player, 0:This event, 1..:EventID
 *          @type number
 *              @min -1
 *              @max 999
 *          @default 0
 *      @arg offsetX
 *          @desc 1 = 1px
 *          @type number
 *              @min -9999
 *              @max 9999
 *          @default 0
 *      @arg offsetY
 *          @desc 1 = 1px
 *          @type number
 *              @min -9999
 *              @max 9999
 *          @default 0
 * 
 *  @command eraseCharLight
 *      @desc 
 *      @arg character
 *          @desc -1:Player, 0:This event, 1..:EventID
 *          @type number
 *              @min -1
 *              @max 999
 *          @default 0
 * 
 *  @command erasePosLight
 *      @desc 
 *      @arg x
 *          @desc 
 *          @type number
 *              @min -9999
 *              @max 9999
 *          @default 0
 *      @arg y
 *          @desc 
 *          @type number
 *              @min -9999
 *              @max 9999
 *          @default 0
 * 
 *  @command eraseFrontLight
 *      @desc 
 *      @arg character
 *          @desc -1:Player, 0:This event, 1..:EventID
 *          @type number
 *              @min -1
 *              @max 999
 *          @default 0
 * 
 *  @command setDarkness
 *      @desc 
 *      @arg darkness
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 100
 *          @default 100
 * 
 *  @command moveDarkness
 *      @desc 
 *      @arg darkness
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 100
 *          @default 100
 *      @arg duration
 *          @desc 
 *          @type number
 *              @min 1
 *              @max 999
 *          @default 60
 * 
 *  @command setDarknessColor
 *      @desc Colors are processed by multiplication. (White cannot be used)
 *      @arg rgb
 *          @desc 
 *          @default 0,0,0
 * 
 * 
 *  @param Light Colors
 *      @desc 
 *      @type string[]
 *      @default ["255,255,255","192,128,64","32,32,32","192,192,192"]
 * 
 *  @param Front Light
 *      @desc 
 *      @type struct<FrontLight>
 *      @default {"Radius":"6","Angle":"90","Oy":"4","Turn Duration":"24"}
 * 
 *  @param Darkness Size
 *      @desc Resolution per tile
 *      @type number
 *          @min 1
 *          @max 48
 *      @default 3
 *
 *  @param Additive Alpha
 *      @desc The opacity of the layer that displays the color of the light in addition. 0:none, 100:max
 *      @type number
 *          @min 0
 *          @max 100
 *      @default 50
 *
 *  @param Darkness Priority
 *      @desc 
 *      @type select
 *          @option below characters
 *              @value 2
 *          @option above characters
 *              @value 7
 *          @option above animation
 *              @value 9
 *      @default 9
 *
 */

/*~struct~FrontLight:
 *  @param Radius
 *      @desc Unit: tile
 *      @type number
 *          @min 1
 *          @max 99
 *      @default 6
 * 
 *  @param Angle
 *      @desc 
 *      @type number
 *          @min 1
 *          @max 180
 *      @default 90
 * 
 *  @param Oy
 *      @desc 
 *      @type number
 *          @min -9999
 *          @max 9999
 *      @default 4
 * 
 *  @param Turn Duration
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 999
 *      @default 24
 * 
 */

/*:ja
 * @target MV MZ
 * @plugindesc マップの明るさを設定できるようにします。
 * @author 木星ペンギン
 * @url 
 *
 * @help [version 4.0.3]
 * - このプラグインはRPGツクールMVおよびMZ用です。
 * 
 * ▼ 仕様
 *  - キャラクター一人に対して付加できる灯りは、キャラ灯りと前方灯りそれぞれ
 *    １つまでです。
 *  - イベントやマップ上に作成した灯りは、マップ切り替えでリセットされます。
 *  - プレイヤーの灯りはマップ移動しても維持されます。
 *  - プライオリティが[通常キャラの上]になっているイベントの灯りは、
 *    他の灯りより上に表示されます。
 * 
 * ▼ プラグインコマンド
 *  - MVでは数値を入力する項目で v[N] と記述することで変数N番を参照します。
 *  - MZでは数値を入力する項目で、テキストを選択して v[N] と記述することで
 *    変数N番を参照します。
 *  - 色番号(c)はプラグインパラメータ[Light Colors]で設定したものを指定してください。
 * 
 *  〇 MV / MZ
 * 
 *  〇 SetCharLight evId r c a  / キャラ灯り設定
 *      evId : イベントID(-1:プレイヤー, 0:このイベント)
 *      r    : 半径(1 = 1タイル)
 *      c    : 色番号(0で消去)
 *      a    : 明滅の振れ幅(0～100で指定 / 0で明滅なし / 未設定は0)
 *   - キャラクターを中心に灯りを表示します。
 * 
 *  〇 SetPosLight x y r c a  / マップ灯り設定
 *      x   : X座標
 *      y   : Y座標
 *      r   : 半径(1 = 1タイル)
 *      c   : 色番号(0で消去)
 *      a   : 明滅の振れ幅(0～100で指定 / 0で明滅なし / 未設定は0)
 *   - 指定した座標(x,y)に灯り表示します。
 * 
 *  〇 SetFrontLight evId c a  / 前方灯り設定
 *      evId : イベントID(-1:プレイヤー, 0:このイベント)
 *      c    : 色番号(0で消去)
 *      a    : 明滅の振れ幅(0～100で指定 / 0で明滅なし / 未設定は0)
 *   - キャラクターの前方に灯りを表示します。
 * 
 *  〇 SetCharLightOffset evId x y  / キャラ灯りオフセット設定
 *      evId : イベントID(-1:プレイヤー, 0:このイベント)
 *      x    : X座標(1 = 1ドット)
 *      y    : Y座標(1 = 1ドット)
 *   - キャラ灯りの中心位置をずらします。
 * 
 *  〇 EraseCharLight evId  / キャラ灯り消去
 *      evId : イベントID(-1:プレイヤー, 0:このイベント)
 *   - キャラクターを中心とした灯りを消去します。
 * 
 *  〇 ErasePosLight x y  / マップ灯り消去
 *      x : X座標
 *      y : Y座標
 *   - 指定した座標(x,y)の灯りを消去します。
 * 
 *  〇 EraseFrontLight evId  / 前方灯り消去
 *      evId : イベントID(-1:プレイヤー, 0:このイベント)
 *   - キャラクターの前方を照らす灯りを消去します。
 * 
 *  〇 SetMapDarkness d  / マップ暗さ設定
 *      d : マップの暗さ(0～100で指定)
 *   - マップの暗さを変更します。
 * 
 *  〇 MoveMapDarkness d t  / マップ暗さ移動
 *      d : マップの暗さ(0～100で指定)
 *      t : 時間
 *   - マップの暗さを徐々に変更します。
 * 
 *  〇 SetMapDarknessColor r g b  / マップ暗さ色設定
 *   - マップの暗さの色を変更します。
 *   - 色は乗算で処理されます。（白はできません）
 * 
 * ▼ マップのメモ
 *  〇 <Darkness:n>
 *      n : マップの暗さ(0～100で指定)
 *   - マップの暗さを指定します。
 *   - v[n] と記述することでn番の変数の値を参照します。
 *   - ただし、参照されるのはマップの切り替えを行ったときのみです。
 * 
 *  〇 <DarknessColor:r,g,b>
 *   - マップの暗さの色を指定します。
 *   - 色は乗算で処理されます。（白はできません）
 * 
 *  〇 <PosLight X,Y:r,c,a>
 *      X   : X座標
 *      Y   : Y座標
 *      r   : 半径(1 = 1タイル)
 *      c   : 色番号
 *      a   : 明滅の振れ幅(0～100で指定 / 0で明滅なし / 未設定は0)
 *   - 指定した座標(x,y)に灯りを配置します。
 * 
 * ▼ イベントの実行内容の注釈
 *  〇 灯り r c a
 *      r   : 半径(1 = 1タイル)
 *      c   : 色番号
 *      a   : 明滅の振れ幅(0～100で指定 / 0で明滅なし / 未設定は0)
 *   - このイベントを中心に灯りを表示します。
 *   - このコマンドは実行内容の最初の注釈のみ適用されます。
 * 
 *  〇 前方灯り c a
 *      c   : 色番号
 *      a   : 明滅の振れ幅(0～100で指定 / 0で明滅なし / 未設定は0)
 *   - このイベントの前方を照らす灯りを表示します。
 *   - このコマンドは実行内容の最初の注釈のみ適用されます。
 * 
 *  〇 灯りオフセット x y
 *      x : X座標(1 = 1ドット)
 *      Y : Y座標(1 = 1ドット)
 *   - 円形の灯りのみに適用可能。
 *   - 灯りの位置を指定した座標分ずらして表示します。
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @command setCharLight
 *      @text キャラ灯り設定
 *      @desc 
 *      @arg character
 *          @text 対象キャラクター
 *          @desc -1:プレイヤー, 0:このイベント, 1..:イベントID
 *          @type number
 *              @min -1
 *              @max 999
 *          @default 0
 *      @arg radius
 *          @text 半径
 *          @desc 1 = 1タイル
 *          @type number
 *              @min 0
 *              @max 99
 *          @default 1
 *      @arg colorIndex
 *          @text 色番号
 *          @desc プラグインパラメータ[Light Colors]で指定 / 0:消去
 *          @type number
 *              @min 0
 *              @max 99
 *          @default 1
 *      @arg amplitude
 *          @text 明滅の振れ幅
 *          @desc 0～100
 *          @type number
 *              @min 0
 *              @max 100
 *          @default 0
 * 
 *  @command setPosLight
 *      @text マップ灯り設定
 *      @desc 
 *      @arg x
 *          @desc 
 *          @type number
 *              @min -9999
 *              @max 9999
 *          @default 0
 *      @arg y
 *          @desc 
 *          @type number
 *              @min -9999
 *              @max 9999
 *          @default 0
 *      @arg radius
 *          @text 半径
 *          @desc 1 = 1タイル
 *          @type number
 *              @min 0
 *              @max 99
 *          @default 1
 *      @arg colorIndex
 *          @text 色番号
 *          @desc プラグインパラメータ[Light Colors]で指定 / 0:消去
 *          @type number
 *              @min 0
 *              @max 99
 *          @default 1
 *      @arg amplitude
 *          @text 明滅の振れ幅
 *          @desc 0～100
 *          @type number
 *              @min 0
 *              @max 100
 *          @default 0
 * 
 *  @command setFrontLight
 *      @text 前方灯り設定
 *      @desc 
 *      @arg character
 *          @text 対象キャラクター
 *          @desc -1:プレイヤー, 0:このイベント, 1..:イベントID
 *          @type number
 *              @min -1
 *              @max 999
 *          @default 0
 *      @arg colorIndex
 *          @text 色番号
 *          @desc プラグインパラメータ[Light Colors]で指定 / 0:消去
 *          @type number
 *              @min 0
 *              @max 99
 *          @default 1
 *      @arg amplitude
 *          @text 明滅の振れ幅
 *          @desc 0～100
 *          @type number
 *              @min 0
 *              @max 100
 *          @default 0
 * 
 *  @command setCharLightOffset
 *      @text キャラ灯りオフセット設定
 *      @desc 
 *      @arg character
 *          @text 対象キャラクター
 *          @desc -1:プレイヤー, 0:このイベント, 1..:イベントID
 *          @type number
 *              @min -1
 *              @max 999
 *          @default 0
 *      @arg offsetX
 *          @text X軸
 *          @desc 1 = 1ドット
 *          @type number
 *              @min -9999
 *              @max 9999
 *          @default 0
 *      @arg offsetY
 *          @text Y軸
 *          @desc 1 = 1ドット
 *          @type number
 *              @min -9999
 *              @max 9999
 *          @default 0
 * 
 *  @command eraseCharLight
 *      @text キャラ灯り消去
 *      @desc 
 *      @arg character
 *          @text 対象キャラクター
 *          @desc -1:プレイヤー, 0:このイベント, 1..:イベントID
 *          @type number
 *              @min -1
 *              @max 999
 *          @default 0
 * 
 *  @command erasePosLight
 *      @text マップ灯り消去
 *      @desc 
 *      @arg x
 *          @desc 
 *          @type number
 *              @min -9999
 *              @max 9999
 *          @default 0
 *      @arg y
 *          @desc 
 *          @type number
 *              @min -9999
 *              @max 9999
 *          @default 0
 * 
 *  @command eraseFrontLight
 *      @text 前方灯り消去
 *      @desc 
 *      @arg character
 *          @text 対象キャラクター
 *          @desc -1:プレイヤー, 0:このイベント, 1..:イベントID
 *          @type number
 *              @min -1
 *              @max 999
 *          @default 0
 * 
 *  @command setDarkness
 *      @text マップ暗さ設定
 *      @desc 
 *      @arg darkness
 *          @text 暗さ
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 100
 *          @default 100
 * 
 *  @command moveDarkness
 *      @text マップ暗さ移動
 *      @desc 
 *      @arg darkness
 *          @text 暗さ
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 100
 *          @default 100
 *      @arg duration
 *          @text 時間
 *          @desc 移動にかける時間をフレーム数で指定
 *          @type number
 *              @min 1
 *              @max 999
 *          @default 60
 * 
 *  @command setDarknessColor
 *      @text マップ暗さ色設定
 *      @desc 色は乗算で処理されます。（白はできません）
 *      @arg rgb
 *          @desc 
 *          @default 0,0,0
 * 
 * 
 *  @param Light Colors
 *      @text 灯りの色の配列
 *      @desc 
 *      @type string[]
 *      @default ["255,255,255","192,128,64","32,32,32","192,192,192"]
 * 
 *  @param Front Light
 *      @text 前方灯りパラメータ
 *      @desc 
 *      @type struct<FrontLight>
 *      @default {"Radius":"6","Angle":"90","Oy":"4","Turn Duration":"24"}
 * 
 *  @param Darkness Size
 *      @text 暗さの解像度
 *      @desc 1タイル当たりの解像度
 *      @type number
 *          @min 1
 *          @max 48
 *      @default 3
 *
 *  @param Additive Alpha
 *      @text 色加算アルファ値
 *      @desc 灯りの色を加算で表示するレイヤーの不透明率。
 * 0:なし, 100:最大
 *      @type number
 *          @min 0
 *          @max 100
 *      @default 50
 *
 *  @param Darkness Priority
 *      @text 灯りレイヤーのプライオリティ
 *      @desc 
 *      @type select
 *          @option 通常キャラの下
 *              @value 2
 *          @option 通常キャラの上
 *              @value 7
 *          @option アニメーションより上
 *              @value 9
 *      @default 9
 *
 */

/*~struct~FrontLight:ja
 *  @param Radius
 *      @text 距離
 *      @desc 単位:タイル
 *      @type number
 *          @min 1
 *          @max 99
 *      @default 6
 * 
 *   @param Angle
 *      @text 角度
 *      @desc 
 *      @type number
 *          @min 1
 *          @max 180
 *      @default 90
 * 
 *  @param Oy
 *      @text 原点Y
 *      @desc 
 *      @type number
 *          @min -9999
 *          @max 9999
 *      @default 4
 * 
 *  @param Turn Duration
 *      @text 回転時間
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 999
 *      @default 24
 * 
 */

(() => {
    'use strict';

    const pluginName = 'MPP_MapLight';
    
    // Plugin Parameters
    const parameters = PluginManager.parameters(pluginName);
    const paramReplace = (key, value) => {
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    };
    const param_LightColors = JSON.parse(parameters['Light Colors']);
    const param_FrontLight = JSON.parse(parameters['Front Light'], paramReplace);
    const param_DarknessSize = Number(parameters['Darkness Size'] || 3);
    const param_AdditiveAlpha = Number(parameters['Additive Alpha'] || 0);
    const param_DarknessPriority = Number(parameters['Darkness Priority'] || 9);
    
    // Dealing with other plugins
    const _importedPlugin = (...names) => {
        return names.some(name => PluginManager._scripts.includes(name));
    };
    
    const __base = (obj, prop) => {
        if (obj.hasOwnProperty(prop)) {
            return obj[prop];
        } else {
            const proto = Object.getPrototypeOf(obj);
            return function () { return proto[prop].apply(this, arguments); };
        }
    };

    const number_clamp = (x, min, max) => {
        return Math.max(Math.min(x, max), min);
    };

    //-------------------------------------------------------------------------
    // Bitmap
    
    if (!Bitmap.prototype.destroy) {
        
        Bitmap.prototype.destroy = function() {
            if (this._baseTexture) {
                this._baseTexture.destroy();
                this.__baseTexture = null;
            }
            this._destroyCanvas();
        };
        
        Bitmap.prototype._destroyCanvas = function() {
            if (this._canvas) {
                this._canvas.width = 0;
                this._canvas.height = 0;
                this.__canvas = null;
            }
        };
        
    }

    Bitmap.prototype.mppBlur = function(level) {
        const { canvas, context, width:w, height:h } = this;
        const tempCanvas = document.createElement('canvas');
        const tempContext = tempCanvas.getContext('2d');
        tempCanvas.width = w + 2;
        tempCanvas.height = h + 2;
        for (let i = 0; i < level; i++) {
            tempContext.clearRect(0, 0, w + 2, h + 2);
            tempContext.drawImage(canvas, 0, 0, w, h, 1, 1, w, h);
            tempContext.drawImage(canvas, 0, 0, w, 1, 1, 0, w, 1);
            tempContext.drawImage(canvas, 0, 0, 1, h, 0, 1, 1, h);
            tempContext.drawImage(canvas, 0, h - 1, w, 1, 1, h + 1, w, 1);
            tempContext.drawImage(canvas, w - 1, 0, 1, h, w + 1, 1, 1, h);
            tempContext.drawImage(canvas, 0, 0, 1, 1, 0, 0, 1, 1);
            tempContext.drawImage(canvas, w - 1, 0, 1, 1, w + 1, 0, 1, 1);
            tempContext.drawImage(canvas, 0, h - 1, 1, 1, 0, h + 1, 1, 1);
            tempContext.drawImage(canvas, w - 1, h - 1, 1, 1, w + 1, h + 1, 1, 1);
            context.save();
            context.clearRect(0, 0, w, h);
            context.globalCompositeOperation = 'lighter';
            context.globalAlpha = 1 / 9;
            for (let y = 0; y < 3; y++) {
                for (let x = 0; x < 3; x++) {
                    context.drawImage(tempCanvas, x, y, w, h, 0, 0, w, h);
                }
            }
            context.restore();
        }
        tempCanvas.width = 0;
        tempCanvas.height = 0;
        this._baseTexture.update();
    };

    //-------------------------------------------------------------------------
    // Tilemap

    const _Tilemap_initialize = Tilemap.prototype.initialize;
    Tilemap.prototype.initialize = function() {
        _Tilemap_initialize.apply(this, arguments);
        this._layerLights = [];
        this._needsRepaint = true;
    };

    const _Tilemap_destroy = __base(Tilemap.prototype, 'destroy');
    Tilemap.prototype.destroy = function() {
        this.destroyDarknessBitmap();
        _Tilemap_destroy.apply(this, arguments);
    };

    Tilemap.prototype.destroyDarknessBitmap = function() {
        if (this._darknessLayer.bitmap) {
            this._darknessLayer.bitmap.destroy();
        }
        if (this._additiveLayer && this._additiveLayer.bitmap) {
            this._additiveLayer.bitmap.destroy();
        }
    };

    const _Tilemap__createLayers = Tilemap.prototype._createLayers;
    Tilemap.prototype._createLayers = function() {
        _Tilemap__createLayers.apply(this, arguments);
        this._createDarknessLayer();
    };

    Tilemap.prototype._createDarknessLayer = function() {
        if (this._darknessLayer) {
            this.destroyDarknessBitmap();
            this.createDarknessBitmap();
        } else {
            const z = param_DarknessPriority;
            this._darknessLayer = new DarknessLayer();
            this._darknessLayer.z = z;
            this.addChild(this._darknessLayer);
            if (param_AdditiveAlpha > 0) {
                this._additiveLayer = new AdditiveLayer();
                this._additiveLayer.z = 9;
                this.addChild(this._additiveLayer);
            }
        }
    };

    Tilemap.prototype.createDarknessBitmap = function() {
        const size = param_DarknessSize;
        const widthWithMargin = this.width + this._margin * 2;
        const heightWithMargin = this.height + this._margin * 2;
        const tileCols = Math.ceil(widthWithMargin / this.tileWidth) + 1;
        const tileRows = Math.ceil(heightWithMargin / this.tileHeight) + 1;
        const width = tileCols * size;
        const height = tileRows * size;
        const scaleX = this.tileWidth / size;
        const scaleY = this.tileHeight / size;
        this.createLayerBitmap(this._darknessLayer, width, height);
        this._darknessLayer.scale.set(scaleX, scaleY);
        if (this._additiveLayer) {
            this.createLayerBitmap(this._additiveLayer, width, height);
            this._additiveLayer.scale.set(scaleX, scaleY);
        }
    };

    Tilemap.prototype.createLayerBitmap = function(layer, width, height) {
        layer.bitmap = new Bitmap(width, height);
        layer.bitmap.smooth = true;
    };

    const _Tilemap_update = Tilemap.prototype.update;
    Tilemap.prototype.update = function() {
        _Tilemap_update.apply(this, arguments);
        this.updateLayerLights();
    };

    Tilemap.prototype.updateLayerLights = function() {
        const allMapLights = $gameMap.allMapLights();
        const allLayerLights = this._layerLights;
        const max = Math.max(allMapLights.length, allLayerLights.length);
        allMapLights.sort((a, b) => a.layerZ() - b.layerZ());
        for (let i = 0; i < max; i++) {
            const mapLight = allMapLights[i];
            let layerLight = allLayerLights[i];
            if (!layerLight) {
                layerLight = new DarknessLayer.Light();
                allLayerLights.push(layerLight);
            }
            if (mapLight) {
                layerLight.setMapLight(mapLight, i);
            } else {
                layerLight.clear();
            }
            layerLight.update();
        }
    };

    const _Tilemap_updateTransform = Tilemap.prototype.updateTransform;
    Tilemap.prototype.updateTransform = function() {
        const ox = Math.ceil(this.origin.x);
        const oy = Math.ceil(this.origin.y);
        const startX = Math.floor((ox - this._margin) / this.tileWidth);
        const startY = Math.floor((oy - this._margin) / this.tileHeight);
        const mx = startX * this.tileWidth - ox;
        const my = startY * this.tileHeight - oy;
        if (this._needsRepaint) {
            this._checkDarknessBitmap();
        }
        this._moveDarkness(mx, my);
        _Tilemap_updateTransform.apply(this, arguments);
        if (this._darknessLayer.bitmap && this._darknessLayer.opacity > 0) {
            this._paintDarknessLayer(startX, startY);
        }
    };

    Tilemap.prototype._checkDarknessBitmap = function() {
        const bitmap = this._darknessLayer.bitmap;
        if (!bitmap) {
            this.createDarknessBitmap();
            return;
        }
        const size = param_DarknessSize;
        const widthWithMargin = this.width + this._margin * 2;
        const heightWithMargin = this.height + this._margin * 2;
        const tileCols = Math.ceil(widthWithMargin / this.tileWidth) + 1;
        const tileRows = Math.ceil(heightWithMargin / this.tileHeight) + 1;
        const width = tileCols * size;
        const height = tileRows * size;
        if (bitmap.width !== width || bitmap.height !== height) {
            this.destroyDarknessBitmap();
            this.createDarknessBitmap();
        }
    };

    Tilemap.prototype._moveDarkness = function(x, y) {
        const opacity = $gameMap.darknessOpacity();
        this._darknessLayer.move(x, y);
        this._darknessLayer.opacity = opacity;
        if (this._additiveLayer) {
            this._additiveLayer.move(x, y);
            this._additiveLayer.opacity = opacity * param_AdditiveAlpha / 100;
        }
    };

    Tilemap.prototype._paintDarknessLayer = function(startX, startY) {
        const sx = startX - this.origin.x / this.tileWidth;
        const sy = startY - this.origin.y / this.tileHeight;
        this._paintFillDarkness();
        this._paintLayerLights(this._darknessLayer, sx, sy);
        if (this._additiveLayer) {
            this._additiveLayer.clear();
            this._paintLayerLights(this._additiveLayer, sx, sy);
        }
    };

    Tilemap.prototype._paintLayerLights = function(layer, sx, sy) {
        for (const layerLight of this._layerLights) {
            const alpha = layerLight.alpha;
            if (alpha > 0) {
                const dx = layerLight.x - sx + 0.5;
                const dy = layerLight.y - sy + 0.4;
                const rgb = layerLight.rgb;
                if (layerLight.isFront()) {
                    layer.paintFrontLight(dx, dy, rgb, layerLight.angle, alpha);
                } else {
                    layer.paintNormalMapLight(dx, dy, rgb, layerLight.radius, alpha);
                }
            }
        }
    };

    Tilemap.prototype._paintFillDarkness = function() {
        this._darknessLayer.fillAll($gameMap.darknessColor());
    };

    //-------------------------------------------------------------------------
    // ShaderTilemap
    
    if (Utils.RPGMAKER_NAME === 'MV') {

        const _ShaderTilemap_updateTransform = ShaderTilemap.prototype.updateTransform;
        ShaderTilemap.prototype.updateTransform = function() {
            const ox = this.roundPixels ? Math.floor(this.origin.x) : this.origin.x;
            const oy = this.roundPixels ? Math.floor(this.origin.y) : this.origin.y;
            const startX = Math.floor((ox - this._margin) / this.tileWidth);
            const startY = Math.floor((oy - this._margin) / this.tileHeight);
            if (this._needsRepaint) {
                this._checkDarknessBitmap();
            }
            this._moveDarkness(startX * this.tileWidth - ox, startY * this.tileHeight - oy);
            _ShaderTilemap_updateTransform.apply(this, arguments);
            if (this._darknessLayer.opacity > 0) {
                this._paintDarknessLayer(startX, startY);
            }
        };

        const _ShaderTilemap__createLayers = ShaderTilemap.prototype._createLayers;
        ShaderTilemap.prototype._createLayers = function() {
            _ShaderTilemap__createLayers.apply(this, arguments);
            this._createDarknessLayer();
        };

    }

    //-----------------------------------------------------------------------------
    // DarknessLayer
    
    function DarknessLayer() {
        this.initialize(...arguments);
    }
    
    if (_importedPlugin('MPP_MapLight_Op2')) {
        window.DarknessLayer = DarknessLayer;
    }

    DarknessLayer.prototype = Object.create(Sprite.prototype);
    DarknessLayer.prototype.constructor = DarknessLayer;

    DarknessLayer._frontBitmaps = {};

    DarknessLayer.createFrontBitmap = function(rgb) {
        const dict = this._frontBitmaps;
        if (!dict[rgb]) {
            const { Radius: radius = 6, Angle: angle = 90 } = param_FrontLight;
            const r = radius * 4;
            const bitmap = new Bitmap(r * 2 + 4, r + 4);
            const context = bitmap.context;
            context.save();

            const startAngle = (90 - angle / 2) / 180 * Math.PI;
            const endAngle = (90 + angle / 2) / 180 * Math.PI;
            context.beginPath();
            context.moveTo(r + 2, 2);
            context.arc(r + 2, 2, r, startAngle, endAngle);
            context.closePath();

            const grad = context.createRadialGradient(r + 2, 2, 0, r + 2, 2, r);
            grad.addColorStop(0, `rgba(${rgb},1)`);
            grad.addColorStop(1, `rgba(${rgb},0)`);
            context.fillStyle = grad;
            context.fill();
            context.restore();
            bitmap.mppBlur(2);
            dict[rgb] = bitmap;
        }
        return dict[rgb];
    };

    DarknessLayer.destroyFrontBitmap = function() {
        for (const bitmap of Object.values(this._frontBitmaps)) {
            bitmap.destroy();
        }
        this._frontBitmaps = {};
    };

    DarknessLayer.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);
        this.blendMode = 2;
    };

    DarknessLayer.prototype.destroy = function() {
        DarknessLayer.destroyFrontBitmap();
        Sprite.prototype.destroy.call(this);
    };

    DarknessLayer.prototype.clear = function() {
        this.bitmap.clear();
    };

    DarknessLayer.prototype.fillAll = function(color) {
        const bitmap = this.bitmap;
        const context = bitmap.context;
        context.globalCompositeOperation = 'copy';
        bitmap.fillAll(color);
    };

    DarknessLayer.prototype.paintFrontLight = function(x, y, rgb, angle, alpha) {
        const frontBitmap = DarknessLayer.createFrontBitmap(rgb);
        const size = param_DarknessSize;
        const bitmap = this.bitmap;
        const context = bitmap.context;
        const { width:sw, height:sh } = frontBitmap;
        const dx = -sw / 2 * size / 4;
        const dy = -param_FrontLight.Oy * size / 4;
        const dw = sw * size / 4;
        const dh = sh * size / 4;
        context.save();
        context.translate(x * size, y * size);
        context.rotate(angle * Math.PI / 180);
        context.globalAlpha = alpha;
        bitmap.blt(frontBitmap, 0, 0, sw, sh, dx, dy, dw, dh);
        context.restore();
    };

    DarknessLayer.prototype.paintNormalMapLight = function(x, y, rgb, r, alpha) {
        const size = param_DarknessSize;
        const dx = x * size;
        const dy = y * size;
        const dr = r * size;
        const bitmap = this.bitmap;
        const context = bitmap.context;
        const grad = context.createRadialGradient(dx, dy, 0, dx, dy, dr);
        grad.addColorStop(0, `rgba(${rgb},1)`);
        grad.addColorStop(1, `rgba(${rgb},0)`);
        context.globalAlpha = alpha;
        context.globalCompositeOperation = 'lighter';
        bitmap.drawCircle(dx, dy, dr, grad);
        context.globalAlpha = 1;
    };

    //-------------------------------------------------------------------------
    // DarknessLayer.Light
    
    DarknessLayer.Light = function() {
        this.initialize(...arguments);
    }

    DarknessLayer.Light.prototype.initialize = function() {
        this._mapLight = null;
        this.x = 0;
        this.y = 0;
        this.alpha = 0;
        this.rgb = '';
        this.type = '';
        this.angle = 0;
        this.radius = 0;
    };

    DarknessLayer.Light.prototype.clear = function() {
        this._mapLight = null;
        this.alpha = 0;
    };

    DarknessLayer.Light.prototype.isFront = function() {
        return this.type === 'front';
    };

    DarknessLayer.Light.prototype.setMapLight = function(mapLight) {
        this._mapLight = mapLight;
    };

    DarknessLayer.Light.prototype.update = function() {
        const mapLight = this._mapLight;
        if (mapLight) {
            this.x = mapLight.scrolledX();
            this.y = mapLight.scrolledY();
            this.alpha = mapLight.opacity / 255;
            this.rgb = mapLight.rgb();
            this.type = mapLight.type();
            this.angle = mapLight.angle;
            this.radius = mapLight.radius;

            // MVで size = 4, angle = 0 の場合、他の値の小数点以下が無視されるため、その対処
            if (param_DarknessSize === 4 && Utils.RPGMAKER_NAME === 'MV') {
                this.angle += 0.1;
            }
        }
    };

    //-------------------------------------------------------------------------
    // AdditiveLayer
    
    function AdditiveLayer() {
        this.initialize(...arguments);
    }

    AdditiveLayer.prototype = Object.create(DarknessLayer.prototype);
    AdditiveLayer.prototype.constructor = AdditiveLayer;

    AdditiveLayer.prototype.initialize = function() {
        DarknessLayer.prototype.initialize.call(this);
        this.blendMode = 1;
    };

    AdditiveLayer.prototype.destroy = function() {
        Sprite.prototype.destroy.call(this);
    };

    //-------------------------------------------------------------------------
    // Game_MapLight

    function Game_MapLight() {
        this.initialize.apply(this, arguments);
    }

    window.Game_MapLight = Game_MapLight;

    Object.defineProperties(Game_MapLight.prototype, {
        colorIndex: {
            get() { return this._colorIndex; },
            configurable: true
        },
        radius: {
            get() { return this._radius; },
            configurable: true
        },
        opacity: {
            get() { return this._opacity; },
            configurable: true
        },
        angle: {
            get() { return this._angle; },
            configurable: true
        }
    });

    Game_MapLight.prototype.initialize = function() {
        this._eventId = 0;
        this._x = 0;
        this._y = 0;
        this._colorIndex = 0;
        this._radius = 0;
        this._targetRadius = 0;
        this._type = 'normal';
        this._opacity = 0;
        this._targetOpacity = 0;
        this._amplitude = 0;
        this._moveDuration = 0;
        this._angle = 0;
        this._subjectDirection = 0;
        this._angleDuration = 0;
        this._offsetX = 0;
        this._offsetY = 0;
    };

    Game_MapLight.prototype.subject = function() {
        if (this._eventId < 0) {
            return $gamePlayer;
        } else if (this._eventId > 0) {
            return $gameMap.event(this._eventId);
        }
        return null;
    };

    Game_MapLight.prototype.rgb = function() {
        return this._colorIndex > 0
            ? param_LightColors[this._colorIndex - 1]
            : null;
    };

    Game_MapLight.prototype.type = function() {
        return this._type;
    };

    Game_MapLight.prototype.setCharLight = function(
        eventId, radius, colorIndex, amplitude
    ) {
        this._type = 'normal';
        this._eventId = eventId;
        this._targetRadius = radius;
        this._colorIndex = colorIndex;
        this._targetOpacity = 255;
        this._amplitude = amplitude;
        this._moveDuration = 16;
        this._subjectDirection = 0;
        this._angleDuration = 0;
        this._offsetX = 0;
        this._offsetY = 0;
    };

    Game_MapLight.prototype.setPosLight = function(
        x, y, radius, colorIndex, amplitude
    ) {
        this._type = 'normal';
        this._x = x;
        this._y = y;
        this._targetRadius = radius;
        this._colorIndex = colorIndex;
        this._targetOpacity = 255;
        this._amplitude = amplitude;
        this._moveDuration = 16;
        this._eventId = 0;
        this._subjectDirection = 0;
        this._angleDuration = 0;
        this._offsetX = 0;
        this._offsetY = 0;
    };

    Game_MapLight.prototype.setFrontLight = function(
        eventId, colorIndex, amplitude
    ) {
        this._eventId = eventId;
        const subject = this.subject();
        this._type = 'front';
        this._colorIndex = colorIndex;
        this._targetOpacity = 255;
        this._amplitude = amplitude;
        this._moveDuration = 16;
        this._angle = this.directionAngle(subject);
        this._subjectDirection = subject ? subject.direction() : 0;
        this._angleDuration = 0;
        this._radius = 0;
        this._offsetX = 0;
        this._offsetY = 0;
    };

    Game_MapLight.prototype.setOffset = function(x, y) {
        this._offsetX = x;
        this._offsetY = y;
    };

    Game_MapLight.prototype.skip = function() {
        const subject = this.subject();
        this._radius = this._targetRadius;
        this._opacity = this._targetOpacity;
        if (subject) {
            this._subjectDirection = subject.direction();
            this._angle = this.directionAngle(subject);
        }
        this.setupAmplitude();
    };

    Game_MapLight.prototype.setupAmplitude = function() {
        if (this._targetOpacity > 0 && this._amplitude > 0) {
            this._targetOpacity = 255 - Math.randomInt(255 * this._amplitude / 100);
            this._moveDuration = 8;
        } else {
            this._moveDuration = 0;
        }
    };

    Game_MapLight.prototype.update = function() {
        this.updateMove();
        this.updateAngle();
    };

    Game_MapLight.prototype.updateMove = function() {
        if (this._moveDuration > 0) {
            const d = this._moveDuration--;
            this._radius = (this._radius * (d - 1) + this._targetRadius) / d;
            this._opacity = (this._opacity * (d - 1) + this._targetOpacity) / d;
            if (this._moveDuration === 0) this.setupAmplitude();
        }
    };

    Game_MapLight.prototype.updateAngle = function() {
        if (this._type === 'front') {
            const subject = this.subject();
            if (subject) {
                if (this._subjectDirection !== subject.direction()) {
                    this._subjectDirection = subject.direction();
                    this.startAngle(subject);
                }
                if (this._angleDuration > 0) {
                    const d = this._angleDuration--;
                    const target = this.targetAngle(subject);
                    const max = d * (d + 1) / 2;
                    this._angle += (target - this._angle) * d / max;
                    this._angle = (this._angle + 360) % 360;
                }
            }
        }
    };

    Game_MapLight.prototype.startAngle = function(subject) {
        this._angleDuration = param_FrontLight['Turn Duration'] || 0;
        if (this._angleDuration === 0) {
            this._angle = this.directionAngle(subject);
        }
    };

    Game_MapLight.prototype.targetAngle = function(subject) {
        let result = this.directionAngle(subject);
        const sa = this._angle - result;
        if (Math.abs(sa) > Math.abs(sa - 360)) result += 360;
        if (Math.abs(sa) > Math.abs(sa + 360)) result -= 360;
        return result;
    };

    Game_MapLight.prototype.directionAngle = function(subject) {
        if (subject) {
            switch (subject.mapLightDirection()) {
                case 2: return 0;
                case 4: return 90;
                case 6: return 270;
                case 8: return 180;
                case 1: return 45;
                case 3: return 315;
                case 7: return 135;
                case 9: return 225;
            }
        }
        return 0;
    };

    Game_MapLight.prototype.scrolledX = function() {
        const subject = this.subject();
        const objX = subject ? subject.scrolledX() : $gameMap.adjustX(this._x);
        return objX + (this._offsetX || 0) / $gameMap.tileWidth();
    };

    Game_MapLight.prototype.scrolledY = function() {
        const subject = this.subject();
        const objY = subject ? subject.scrolledY() : $gameMap.adjustY(this._y);
        return objY + (this._offsetY || 0) / $gameMap.tileHeight();
    };

    Game_MapLight.prototype.layerZ = function() {
        const subject = this.subject();
        return subject && subject.screenZ() > 3 ? 1 : 0;
    };

    //-------------------------------------------------------------------------
    // Game_Map

    const _Game_Map_initialize = Game_Map.prototype.initialize;
    Game_Map.prototype.initialize = function() {
        _Game_Map_initialize.apply(this, arguments);
        this._mapLights = {};
    };

    const _Game_Map_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function(mapId) {
        this._mapLights = {};
        _Game_Map_setup.apply(this, arguments);
        this._darknessDuration = 0;
        this._targetDarkness = 0;
        this._darkness = 0;
        this._darknessColor = 'black';
        if (mapId > 0) {
            this.setupMapLightCommand();
            this.skipMapLights();
        }
    };

    Game_Map.prototype.setupMapLightCommand = function() {
        for (const [name, param] of Object.entries($dataMap.meta)) {
            const match = /^PosLight\s+(\d+)\s*,\s*(\d+)\s*$/.exec(name);
            if (match) {
                const x = +match[1];
                const y = +match[2];
                const data = param.split(',').map(Number);
                this.setPosLight(x, y, ...data);
            } else if (name === 'Darkness') {
                const value = PluginManager.mppValue(param);
                this._darkness = number_clamp(value, 0, 100);
            } else if (name === 'DarknessColor') {
                this._darknessColor = `rgb(${param})`;
            }
        }
    };

    Game_Map.prototype.skipMapLights = function() {
        for (const light of Object.values(this._mapLights)) {
            light.skip();
        }
    };

    Game_Map.prototype.darknessOpacity = function() {
        return 255 * this._darkness / 100;
    };

    Game_Map.prototype.darknessColor = function() {
        return this._darknessColor || 'black';
    };

    Game_Map.prototype.setDarkness = function(opacity) {
        this._darkness = number_clamp(opacity, 0, 100);
        this._targetDarkness = this._darkness;
        this._darknessDuration = 0;
    };

    Game_Map.prototype.moveDarkness = function(opacity, duration) {
        this._targetDarkness = number_clamp(opacity, 0, 100);
        this._darknessDuration = duration;
    };

    Game_Map.prototype.setDarknessColor = function(color) {
        this._darknessColor = color;
    };

    Game_Map.prototype.allMapLights = function() {
        return [
            ...Object.values(this._mapLights),
            ...$gamePlayer.allMapLights()
        ];
    };

    Game_Map.prototype.getMapLight = function(key) {
        const dict = this._mapLights;
        if (!dict[key]) {
            dict[key] = new Game_MapLight();
        }
        return dict[key];
    };

    Game_Map.prototype.setCharLight = function(eventId, r = 0, c = 0, a = 0) {
        this.getMapLight(`char${eventId}`).setCharLight(eventId, r, c, a);
    };

    Game_Map.prototype.setPosLight = function(x, y, r = 0, c = 0, a = 0) {
        this.getMapLight(`pos${x},${y}`).setPosLight(x, y, r, c, a);
    };

    Game_Map.prototype.setFrontLight = function(eventId, c = 0, a = 0) {
        this.getMapLight(`front${eventId}`).setFrontLight(eventId, c, a);
    };

    Game_Map.prototype.setCharLightOffset = function(eventId, offsetX, offsetY) {
        const mapLight = this.getMapLight(`char${eventId}`);
        if (mapLight) {
            mapLight.setOffset(offsetX, offsetY);
        }
    };

    Game_Map.prototype.setPosLightOffset = function(x, y, offsetX, offsetY) {
        const mapLight = this.getMapLight(`pos${x},${y}`);
        if (mapLight) {
            mapLight.setOffset(offsetX, offsetY);
        }
    };

    Game_Map.prototype.eraseCharLight = function(eventId) {
        this.eraseLight(`char${eventId}`);
    };

    Game_Map.prototype.erasePosLight = function(x, y) {
        this.eraseLight(`pos${x},${y}`);
    };

    Game_Map.prototype.eraseFrontLight = function(eventId) {
        this.eraseLight(`front${eventId}`);
    };

    Game_Map.prototype.eraseLight = function(key) {
        delete this._mapLights[key];
    };

    const _Game_Map_update = Game_Map.prototype.update;
    Game_Map.prototype.update = function(sceneActive) {
        _Game_Map_update.apply(this, arguments);
        this.updateMapLights();
        this.updateDarkness();
    };

    Game_Map.prototype.updateMapLights = function() {
        for (const light of this.allMapLights()) {
            light.update();
        }
    };

    Game_Map.prototype.updateDarkness = function() {
        if (this._darknessDuration > 0) {
            const d = this._darknessDuration;
            this._darkness = (this._darkness * (d - 1) + this._targetDarkness) / d;
            this._darknessDuration--;
        }
    };

    //-------------------------------------------------------------------------
    // Game_Character

    Game_Character.prototype.mapLightDirection = function() {
        return this.direction();
    };
    
    //-------------------------------------------------------------------------
    // Game_Event

    const _Game_Event_clearPageSettings = Game_Event.prototype.clearPageSettings;
    Game_Event.prototype.clearPageSettings = function() {
        _Game_Event_clearPageSettings.apply(this, arguments);
        this.clearCharLight();
        this.clearFrontLight();
    };
    
    Game_Event.prototype.clearCharLight = function() {
        $gameMap.eraseCharLight(this.eventId());
    };
    
    Game_Event.prototype.clearFrontLight = function() {
        $gameMap.eraseFrontLight(this.eventId());
    };
    
    Game_Event.prototype.startCharLight = function(r = 0, c = 0, a = 0) {
        $gameMap.setCharLight(this.eventId(), r, c, a);
    };
    
    Game_Event.prototype.startFrontLight = function(c = 0, a = 0) {
        $gameMap.setFrontLight(this.eventId(), c, a);
    };
    
    Game_Event.prototype.setLightOffset = function(x, y) {
        $gameMap.setCharLightOffset(this.eventId(), x, y);
    };
    
    const _Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
    Game_Event.prototype.setupPageSettings = function() {
        _Game_Event_setupPageSettings.apply(this, arguments);
        this.setupCharLight()
        this.setupFrontLight()
        this.setupCharLightOffset()
    };

    Game_Event.prototype.setupCharLight = function() {
        const comment = this.findCommentCommand('CharLight', '灯り');
        if (comment) {
            const [_, ...args] = comment;
            this.startCharLight(...args.map(Number));
        } else {
            this.clearCharLight();
        }
    };

    Game_Event.prototype.setupFrontLight = function() {
        const command = this.findCommentCommand('FrontLight', '前方灯り');
        if (command) {
            const [_, ...args] = command;
            this.startFrontLight(...args.map(Number));
        } else {
            this.clearFrontLight();
        }
    };

    Game_Event.prototype.setupCharLightOffset = function() {
        const command = this.findCommentCommand('LightOffset', '灯りオフセット');
        if (command) {
            this.setLightOffset(+command[1], +command[2]);
        }
    };

    Game_Event.prototype.findCommentCommand = function(...commandNames) {
        for (const evCom of this.list()) {
            if (evCom.code === 108 || evCom.code === 408) {
                const comment = evCom.parameters[0];
                if (commandNames.some(name => comment.startsWith(name))) {
                    return comment.split(' ');
                }
            } else {
                return null;
            }
        }
        return null;
    };

    //-------------------------------------------------------------------------
    // Game_Player

    const _Game_Player_initMembers = Game_Player.prototype.initMembers;
    Game_Player.prototype.initMembers = function() {
        _Game_Player_initMembers.apply(this, arguments);
        this._charLight = null;
        this._frontLight = null;
    };
    
    Game_Player.prototype.allMapLights = function() {
        return [this._charLight, this._frontLight].filter(Boolean);
    };
    
    Game_Player.prototype.clearCharLight = function() {
        this._charLight = null;
    };
    
    Game_Player.prototype.clearFrontLight = function() {
        this._frontLight = null;
    };
    
    Game_Player.prototype.startCharLight = function(r = 0, c = 0, a = 0) {
        if (!this._charLight) {
            this._charLight = new Game_MapLight();
        }
        this._charLight.setCharLight(-1, r, c, a);
    };
    
    Game_Player.prototype.startFrontLight = function(c = 0, a = 0) {
        if (!this._frontLight) {
            this._frontLight = new Game_MapLight();
        }
        this._frontLight.setFrontLight(-1, c, a);
    };
    
    Game_Player.prototype.setLightOffset = function(x, y) {
        if (this._charLight) {
            this._charLight.setOffset(x, y);
        }
    };
    
    //-------------------------------------------------------------------------
    // Game_Interpreter

    const _mzCommands = {
        SetCharLight: {
            name:'setCharLight',
            keys:['character', 'radius', 'colorIndex', 'amplitude']
        },
        SetPosLight: {
            name:'setPosLight',
            keys:['x', 'y', 'radius', 'colorIndex', 'amplitude']
        },
        SetFrontLight: {
            name:'setFrontLight',
            keys:['character', 'colorIndex', 'amplitude']
        },
        SetCharLightOffset: {
            name:'setCharLightOffset',
            keys:['character', 'offsetX', 'offsetY']
        },
        EraseCharLight: { name:'eraseCharLight', keys:['character'] },
        ErasePosLight: { name:'erasePosLight', keys:['x', 'y'] },
        EraseFrontLight: { name:'eraseFrontLight', keys:['character'] },
        SetMapDarkness: { name:'setDarkness', keys:['darkness'] },
        MoveMapDarkness: { name:'moveDarkness', keys:['darkness', 'duration'] },
        SetMapDarknessColor: { name:'setDarknessColor', keys:[], join:'rgb' }
    };
    Object.assign(_mzCommands, {
        'キャラ灯り設定': _mzCommands.SetCharLight,
        'マップ灯り設定': _mzCommands.SetPosLight,
        '前方灯り設定': _mzCommands.SetFrontLight,
        'キャラ灯りオフセット設定': _mzCommands.SetCharLightOffset,
        'キャラ灯り消去': _mzCommands.EraseCharLight,
        'マップ灯り消去': _mzCommands.ErasePosLight,
        '前方灯り消去': _mzCommands.EraseFrontLight,
        'マップ暗さ設定': _mzCommands.SetMapDarkness,
        'マップ暗さ移動': _mzCommands.MoveMapDarkness,
        'マップ暗さ色設定': _mzCommands.SetMapDarknessColor
    });

    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.apply(this, arguments);
        const mzCommand = _mzCommands[command];
        if (mzCommand) {
            const args2 = Object.assign(
                {}, ...mzCommand.keys.map((k, i) => ({ [k]: args[i] || '' }))
            );
            if (mzCommand.join) {
                args2[mzCommand.join] = args.join();
            }
            PluginManager.callCommandMV(this, pluginName, mzCommand.name, args2);
        }
    };

    //-------------------------------------------------------------------------
    // PluginManager
    
    if (!PluginManager.registerCommand && !PluginManager._commandsMV) {
        PluginManager._commandsMV = {};

        PluginManager.registerCommandMV = function(pluginName, commandName, func) {
            const key = pluginName + ':' + commandName;
            this._commandsMV[key] = func;
        };
        
        PluginManager.callCommandMV = function(self, pluginName, commandName, args) {
            const key = pluginName + ':' + commandName;
            const func = this._commandsMV[key];
            if (typeof func === 'function') {
                func.bind(self)(args);
            }
        };
    }

    const _registerCommandName = PluginManager.registerCommand
        ? 'registerCommand'
        : 'registerCommandMV';
    
    PluginManager[_registerCommandName](pluginName, 'setCharLight', function(args) {
        const mppValue = PluginManager.mppValue;
        const character = this.character(mppValue(args.character));
        const r = mppValue(args.radius);
        const c = mppValue(args.colorIndex);
        const a = mppValue(args.amplitude || '0');
        if (character) {
            character.startCharLight(r, c, a);
        }
    });

    PluginManager[_registerCommandName](pluginName, 'setPosLight', args => {
        const mppValue = PluginManager.mppValue;
        const x = mppValue(args.x);
        const y = mppValue(args.y);
        const r = mppValue(args.radius);
        const c = mppValue(args.colorIndex);
        const a = mppValue(args.amplitude || '0');
        $gameMap.setPosLight(x, y, r, c, a);
    });

    PluginManager[_registerCommandName](pluginName, 'setFrontLight', function(args) {
        const mppValue = PluginManager.mppValue;
        const character = this.character(mppValue(args.character));
        const c = mppValue(args.colorIndex);
        const a = mppValue(args.amplitude || '0');
        if (character) {
            character.startFrontLight(c, a);
        }
    });

    PluginManager[_registerCommandName](pluginName, 'setCharLightOffset', function(args) {
        const mppValue = PluginManager.mppValue;
        const character = this.character(mppValue(args.character));
        const offsetX = mppValue(args.offsetX);
        const offsetY = mppValue(args.offsetY);
        if (character) {
            character.setLightOffset(offsetX, offsetY);
        }
    });

    PluginManager[_registerCommandName](pluginName, 'eraseCharLight', function(args) {
        const character = this.character(PluginManager.mppValue(args.character));
        if (character) {
            character.clearCharLight();
        }
    });

    PluginManager[_registerCommandName](pluginName, 'erasePosLight', args => {
        const x = PluginManager.mppValue(args.x);
        const y = PluginManager.mppValue(args.y);
        $gameMap.erasePosLight(x, y);
    });

    PluginManager[_registerCommandName](pluginName, 'eraseFrontLight', function(args) {
        const character = this.character(PluginManager.mppValue(args.character));
        if (character) {
            character.clearFrontLight();
        }
    });

    PluginManager[_registerCommandName](pluginName, 'setDarkness', args => {
        const darkness = PluginManager.mppValue(args.darkness);
        $gameMap.setDarkness(darkness);
    });

    PluginManager[_registerCommandName](pluginName, 'moveDarkness', args => {
        const darkness = PluginManager.mppValue(args.darkness);
        const duration = PluginManager.mppValue(args.duration);
        $gameMap.moveDarkness(darkness, duration);
    });

    PluginManager[_registerCommandName](pluginName, 'setDarknessColor', args => {
        const rgb = args.rgb
            .split(',')
            .map(str => number_clamp(PluginManager.mppValue(str), 0, 255))
            .join();
        $gameMap.setDarknessColor(`rgb(${rgb})`);
    });

    PluginManager.mppValue = function(value) {
        const match = /^V\[(\d+)\]$/i.exec(value);
        return match ? $gameVariables.value(+match[1]) : +value;
    };
    
})();
