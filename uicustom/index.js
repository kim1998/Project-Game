
const hexColors = [
    '#ffffff',
    '#20A0D6',
    '#FF784C',
    '#66CC40',
    '#99CCFF',
    '#CCC0FF',
    '#FFFFA0',
    '#808080',
    '#C0C0C0',
    '#2080CC',
    '#FF3810',
    '#00A010',
    '#3E9ADE',
    '#A098FF',
    '#FFCC20',
    '#000000',
    '#84AAFF',
    '#FFFF40',
    '#FF2020',
    '#202040',
    '#E08040',
    '#F0C040',
    '#4080C0',
    '#40C0F0',
    '#80FF80',
    '#C08080',
    '#8080FF',
    '#FF80FF',
    '#00A040',
    '#00E060',
    '#A060E0',
    '#C080FF',
]

function colorCodeToHex(color) {
    return hexColors[color] || '#ffffff';
}


const getTemplate2 = (name) => {
    return {
        'rows': {
            nameX: -30,
            nameY: 10,
            classX: -10,
            classY: 10,
            levelX: -76,
            levelY: -10,
            hpGaugeX: -10,
            statusEffectsX: 190,
            shadowBoxX: 200,
            shadowBoxGradientPower: 100,
        },
        'columns': {
            statusOrientation: "columns",
            commandOrientation: "top",
            actorImageHorzAlign: "center",
            actorImageVertAlign: "top",
            actorImageOffsetY: 20,
            nameHorzAlign: "center",
            nameX: 0,
            showName: true,
            nameVertAlign: "middle",
            nameY: -20,
            nameTextAlign: "center",
            nameWidth: 100,
            nameBackgroundType: "none",
            classHorzAlign: "center",
            classX: 0,
            classVertAlign: "middle",
            classY: 10,
            classTextAlign: "center",
            classWidth: 200,
            levelX: 0,
            levelY: 50,
            levelInfoHorzAlign: "center",
            levelInfoVertAlign: "middle",
            hpGaugeX: 0,
            hpGaugeHorzAlign: "center",
            hpGaugeY: -10,
            statusEffectsX: 20,
            statusEffectsVertAlign: "bottom",
            statusEffectsY: -120,
            shadowBoxX: 0,
            shadowBoxY: 120,
            shadowBoxGradientDirection: "top",
            shadowBoxGradientPower: 40,
        },
        'singleActor': {
            statusOrientation: "single actor",
            nameVertAlign: "middle",
            nameY: 80,
            hpGaugeVertAlign: "bottom",
            levelX: 40,
            nameFontSize: 2,
            actorImageOffsetX: 0,
            actorImageCropX: 0,
            actorImageScaleX: 200,
            actorImageScaleY: 200,
            actorImageHorzAlign: "center",
            actorImageVertAlign: "top",
            hpGaugeHorzAlign: "right",
            hpGaugeWidth: 260,
            hpGaugeY: -40,
            actorImageOffsetY: 40,
            nameBackgroundType: "gradient",
            classHorzAlign: "center",
            classVertAlign: "middle",
            classTextAlign: "right",
            nameTextAlign: "left",
            nameX: 0,
            classX: 0,
            classY: 80,
            levelInfoVertAlign: "bottom",
            levelY: -40,
            showShadowBox: false,
            commandWidth: 300,
            levelInfoHorzAlign: "left",
            hpGaugeX: -40,
            statusEffectsHorzAlign: "right",
            statusEffectsX: -40,
            statusEffectsVertAlign: "bottom",
            statusEffectsY: -150,
        },
        'noStatus': {
            statusOrientation: "none",
            commandWidth: 900,
            commandNumberOfColumns: 4,
            commandNumberOfLines: 2,
            commandItemHeight: 100,
            commandTextAlign: "center",
        }
    }[name];
}

const getTemplate = (name) => {
    const template = {
        gameInfoTextLeft: "\\I[190]\n\\I[314]",
        gameInfoTextRight: "\\}\\C[3]\\MN\n\\$ \\C[16]\\G",
        unknownMapName: "\\C[8]Unknown Region",
        gaugeColorHp1: "#A16207",
        gaugeColorHp2: "#F59E0B",
        gaugeColorHpCrisis1: "#991B1B",
        gaugeColorHpCrisis2: "#DC2626",
        gaugeColorMp1: "#1D4ED8",
        gaugeColorMp2: "#3B82F6",
        gaugeColorTp1: "#15803D",
        gaugeColorTp2: "#22C55E",
        gaugeColorAtb1: "#D980FA",
        gaugeColorAtb2: "#FDA7DF",
        gaugeColorExp1: '#888888',
        gaugeColorExp2: '#FFFFFF',
        gaugeColorExpMaxed1: '#FFC107',
        gaugeColorExpMaxed2: '#FFEB3B',
        gaugeBackgroundColorHp: '#222222',
        gaugeBackgroundColorHpCrisis: '#222222',
        gaugeBackgroundColorHpDead: '#440000',
        gaugeBackgroundColorMp: '#222222',
        gaugeBackgroundColorTp: '#222222',
        gaugeBackgroundColorAtb: '#222222',
        gaugeBackgroundColorExp: '#222222',
        gaugeBackgroundColorExpMaxed: '#222222',
    }
    Object.entries(getTemplate2(name || 'rows')).forEach(([key, value]) => template[key] = value);
    
    return template;
}


let config = getTemplate();

function loadConfig() {
    try {
        const fs = require('fs');
        fs.readFile(
            'uicustom/config.json',
            'utf-8',
            (error, data) => {
                config = data ? JSON.parse(data) : getTemplate();
                syncFormInputs();
            },
        );
    
    } catch (error) {
        console.error(error);
    } finally {
        syncFormInputs();
    }
}

function syncFormInputs() {
    
    // Touch UI
    noTouchUI.checked = config.noTouchUI;

    // Common Layout Settings
    toggleButton('#commandInputModeLeft',           'left' == config.commandInputMode);
    toggleButton('#commandInputModeRight',          'left' != config.commandInputMode);

    toggleButton('#statusOrientationRows',          'rows' == config.statusOrientation || !config.statusOrientation);
    toggleButton('#statusOrientationColumns',       'columns' == config.statusOrientation);
    toggleButton('#statusOrientationSingleActor',   'single actor' == config.statusOrientation);
    toggleButton('#statusOrientationNone',          'none' == config.statusOrientation);

    visibleActors.value                             = config.visibleActors || 4;
    autoAdjustVisibleActors.checked                 = config.autoAdjustVisibleActors;
    visibleActorsMax.value                          = config.visibleActorsMax;

    toggleVisibility('#visibleActorsBox',           ['rows', 'columns'].includes(config.statusOrientation) || !config.statusOrientation);
    toggleVisibility('#visibleActorsWave',          config.autoAdjustVisibleActors);
    toggleVisibility('#visibleActorsMax',           config.autoAdjustVisibleActors);

    toggleVisibility('#commandOrientationBox',      'none' != config.statusOrientation);
    toggleVisibility('#centerOnlyHint',             'none' == config.statusOrientation);

    toggleButton('#commandOrientationSide',         'side' == config.commandOrientation || !config.commandOrientation);
    toggleButton('#commandOrientationTop',          'top' == config.commandOrientation);
    toggleButton('#commandOrientationBottom',       'bottom' == config.commandOrientation);

    toggleVisibility('#commandWidthBox',            shouldShowCommandWidth());
    toggleVisibility('#commandNumberOfColumnsBox',  shouldShowCommandColumnsAndLines());
    toggleVisibility('#commandNumberOfLinesBox',    shouldShowCommandColumnsAndLines());

    commandWidth.value                      = config.commandWidth || 240;
    commandNumberOfColumns.value            = config.commandNumberOfColumns || 4;
    commandNumberOfLines.value              = config.commandNumberOfLines || 2;
    commandItemHeight.value                 = config.commandItemHeight;

    // Layout 2
    shouldOverrideCommandRectangle.checked  = config.overrideCommandRectangle;
    shouldOverrideStatusRectangle.checked   = config.overrideStatusRectangle;
    shouldOverrideGoldRectangle.checked     = config.overrideGoldRectangle;

    toggleVisibility('#commandRectangleByValues',   config.overrideCommandRectangle);
    toggleVisibility('#statusRectangleByValues',    config.overrideStatusRectangle);
    toggleVisibility('#goldRectangleByValues',      config.overrideGoldRectangle);

    ['command', 'status', 'gold'].forEach(windowType =>
        ['x', 'y', 'width', 'height'].forEach(param => {
            const value = config[windowType + 'Rectangle_' + param];
            window[windowType + 'Rectangle_' + param].value = value;
        })
    );

    // Windows General
    windowOpacity.value             = config.windowOpacity;
    windowLineHeight.value          = config.windowLineHeight;
    windowItemHeight.value          = config.windowItemHeight;
    windowItemPadding.value         = config.windowItemPadding;
    windowRowSpacing.value          = config.windowRowSpacing;
    windowColumnSpacing.value       = config.windowColumnSpacing;

    toggleVisibility('#cursorStyleBox', 'image' == config.cursorStyle);
    cursorStyle.value = config.cursorStyle || 'default';
    cursorAdjustX.value = config.cursorAdjustX;
    cursorAdjustY.value = config.cursorAdjustY;
    blinkCursor.checked = config.blinkCursor !== false;

    disabledTextOpacity.value = config.disabledTextOpacity;
    overrideDisabledTextColor.checked = config.overrideDisabledTextColor;
    toggleVisibility('#disabledTextColor', overrideDisabledTextColor.checked);
    disabledTextColor.value = config.disabledTextColor;

    // Scene General
    sceneBackgroundType.value       = config.sceneBackgroundType || 'mapSprite';
    sceneBackgroundEffects.value    = config.sceneBackgroundEffects || 'blurred';

    toggleVisibility('#sceneBackgroundEffectsBox',  'mapSprite' == sceneBackgroundType.value);
    toggleVisibility('#sceneBackgroundFileBox',     'image' == sceneBackgroundType.value);

    // Party Status
    statusOpacity.value                 = config.statusOpacity;
    statusRowSpacing.value              = config.statusRowSpacing;
    statusColumnSpacing.value           = config.statusColumnSpacing;
    shouldOverrideStatusWindow.checked  = config.overrideStatusWindow;
    statusBackgroundType.value          = config.statusBackgroundType || 'window';
    statusItemBackgroundType.value      = config.statusItemBackgroundType || 'dimmed';
    statusCursorBackgroundType.value    = config.statusCursorBackgroundType || 'default';
    statusBlinkCursor.checked           = config.statusBlinkCursor;
    statusPendingBackgroundType.value   = config.statusPendingBackgroundType || 'default';
    
    toggleVisibility('#statusWindowFileBox',            config.overrideStatusWindow);
    toggleVisibility('#statusBackgroundFileBox',        'image' == config.statusBackgroundType);
    toggleVisibility('#statusItemBackgroundFileBox',    'image' == config.statusItemBackgroundType);
    toggleVisibility('#statusCursorBackgroundFileBox',  'image' == config.statusCursorBackgroundType);
    toggleVisibility('#statusBlinkCursorBox',           'image' == config.statusCursorBackgroundType);
    toggleVisibility('#statusPendingBackgroundFileBox', 'image' == config.statusPendingBackgroundType);

    // Actor Images
    toggleVisibility('#actorImageBox',          'none' != config.statusRenderType);
    toggleVisibility('#portraitNotetagHint',    'portrait' == config.statusRenderType);

    toggleButton('#actorImageHorzAlignLeft',    'left' == config.actorImageHorzAlign || !config.actorImageHorzAlign);
    toggleButton('#actorImageHorzAlignCenter',  'center' == config.actorImageHorzAlign);
    toggleButton('#actorImageHorzAlignRight',   'right' == config.actorImageHorzAlign);

    toggleButton('#actorImageVertAlignTop',     'top' == config.actorImageVertAlign);
    toggleButton('#actorImageVertAlignMiddle',  'middle' == config.actorImageVertAlign || !config.actorImageVertAlign);
    toggleButton('#actorImageVertAlignBottom',  'bottom' == config.actorImageVertAlign);

    statusRenderType.value  = config.statusRenderType || 'face';
    actorImageOffsetX.value = config.actorImageOffsetX;
    actorImageOffsetY.value = config.actorImageOffsetY;
    actorImageCropX.value   = config.actorImageCropX;
    actorImageCropY.value   = config.actorImageCropY;
    actorImageScaleX.value  = config.actorImageScaleX;
    actorImageScaleY.value  = config.actorImageScaleY;

    // Shadow Box
    showShadowBox.checked = config.showShadowBox !== false;
    toggleVisibility('#actorShadowBoxBox', showShadowBox.checked);

    shadowBoxX.value                = config.shadowBoxX;
    shadowBoxY.value                = config.shadowBoxY;
    shadowBoxWidth.value            = config.shadowBoxWidth;
    shadowBoxHeight.value           = config.shadowBoxHeight;
    shadowBoxColor.value            = config.shadowBoxColor || 'rgb(0, 0, 0)';
    shadowBoxOpacity.value          = config.shadowBoxOpacity;
    shadowBoxGradientPower.value    = config.shadowBoxGradientPower;

    toggleButton('#shadowBoxGradientTop',           'top' == config.shadowBoxGradientDirection);
    toggleButton('#shadowBoxGradientBottom',        'bottom' == config.shadowBoxGradientDirection);
    toggleButton('#shadowBoxGradientLeft',          'left' == config.shadowBoxGradientDirection || !config.shadowBoxGradientDirection);
    toggleButton('#shadowBoxGradientRight',         'right' == config.shadowBoxGradientDirection);
    toggleButton('#shadowBoxGradientNone',          'none' == config.shadowBoxGradientDirection);
    toggleVisibility('#shadowBoxGradientPowerBox',  'none' != config.shadowBoxGradientDirection)

    // Name
    shouldShowName.checked = config.showName !== false;
    toggleVisibility('#actorNameBox', shouldShowName.checked);

    toggleButton('#nameHorzAlignLeft',      'left' == config.nameHorzAlign);
    toggleButton('#nameHorzAlignCenter',    'center' == config.nameHorzAlign || !config.nameHorzAlign);
    toggleButton('#nameHorzAlignRight',     'right' == config.nameHorzAlign);
    toggleButton('#nameVertAlignTop',       'top' == config.nameVertAlign || !config.nameVertAlign);
    toggleButton('#nameVertAlignMiddle',    'middle' == config.nameVertAlign);
    toggleButton('#nameVertAlignBottom',    'bottom' == config.nameVertAlign);

    nameX.value = config.nameX;
    nameY.value = config.nameY;
    nameWidth.value = config.nameWidth;
    nameFontSize.innerHTML = String(config.nameFontSize || 0);
    nameBackgroundType.value = config.nameBackgroundType || 'gradient';

    toggleButton('#nameTextAlignLeft',      'left' == config.nameTextAlign || !config.nameTextAlign);
    toggleButton('#nameTextAlignCenter',    'center' == config.nameTextAlign);
    toggleButton('#nameTextAlignRight',     'right' == config.nameTextAlign);

    // Class
    shouldShowClass.checked = config.showClass !== false;
    toggleVisibility('#actorClassBox', shouldShowClass.checked);

    toggleButton('#classHorzAlignLeft',     'left' == config.classHorzAlign);
    toggleButton('#classHorzAlignCenter',   'center' == config.classHorzAlign);
    toggleButton('#classHorzAlignRight',    'right' == config.classHorzAlign || !config.classHorzAlign);
    toggleButton('#classVertAlignTop',      'top' == config.classVertAlign || !config.classVertAlign);
    toggleButton('#classVertAlignMiddle',   'middle' == config.classVertAlign);
    toggleButton('#classVertAlignBottom',   'bottom' == config.classVertAlign);

    classX.value = config.classX;
    classY.value = config.classY;
    classWidth.value = config.classWidth;
    classFontSize.innerHTML = String(config.classFontSize || 0);

    toggleButton('#classTextAlignLeft',     'left' == config.classTextAlign);
    toggleButton('#classTextAlignCenter',   'center' == config.classTextAlign);
    toggleButton('#classTextAlignRight',    'right' == config.classTextAlign || !config.classTextAlign);

    $('#nameTextColorSpan').css('text-decoration-color',    colorCodeToHex(config.nameTextColor));
    $('#classTextColorSpan').css('text-decoration-color',   colorCodeToHex(config.classTextColor));

    // Level
    showLevelMode.value = config.showLevelMode || 'gauge';

    toggleVisibility('#levelPositionBox',       'none' != showLevelMode.value);
    toggleVisibility('#levelGapBox',            'text' == showLevelMode.value);
    toggleVisibility('#levelEmptyBox',          'text' == showLevelMode.value);
    toggleVisibility('#expGaugeWidthBox',       'gauge' == showLevelMode.value);
    toggleVisibility('#expGaugeHeightBox',      'gauge' == showLevelMode.value);
    toggleVisibility('#levelAsTextBox',         'text' == showLevelMode.value);

    toggleButton('#levelInfoHorzAlignLeft',     'left' == config.levelInfoHorzAlign);
    toggleButton('#levelInfoHorzAlignCenter',   'center' == config.levelInfoHorzAlign || !config.levelInfoHorzAlign);
    toggleButton('#levelInfoHorzAlignRight',    'right' == config.levelInfoHorzAlign);
    toggleButton('#levelInfoVertAlignTop',      'top' == config.levelInfoVertAlign);
    toggleButton('#levelInfoVertAlignMiddle',   'middle' == config.levelInfoVertAlign);
    toggleButton('#levelInfoVertAlignBottom',   'bottom' == config.levelInfoVertAlign || !config.levelInfoVertAlign);

    levelX.value = config.levelX;
    levelY.value = config.levelY;
    levelGap.value = config.levelGap;
    levelFontSize.innerHTML = String(config.levelFontSize || 0);
    
    $('#levelTextColor1Span').css('text-decoration-color', colorCodeToHex(config.levelTextColor1));
    $('#levelTextColor2Span').css('text-decoration-color', colorCodeToHex(config.levelTextColor2));

    expGaugeWidth.value = config.expGaugeWidth;
    expGaugeHeight.value = config.expGaugeHeight;

    // HP Gauges
    showHp.checked = config.showHp !== false;
    toggleVisibility('#actorHpBox', showHp.checked);

    toggleButton('#hpGaugeHorzAlignLeft',   'left' == config.hpGaugeHorzAlign);
    toggleButton('#hpGaugeHorzAlignCenter', 'center' == config.hpGaugeHorzAlign);
    toggleButton('#hpGaugeHorzAlignRight',  'right' == config.hpGaugeHorzAlign || !config.hpGaugeHorzAlign);

    toggleButton('#hpGaugeVertAlignTop',    'top' == config.hpGaugeVertAlign);
    toggleButton('#hpGaugeVertAlignMiddle', 'middle' == config.hpGaugeVertAlign);
    toggleButton('#hpGaugeVertAlignBottom', 'bottom' == config.hpGaugeVertAlign || !config.hpGaugeVertAlign);

    hpGaugeX.value      = config.hpGaugeX;
    hpGaugeY.value      = config.hpGaugeY;
    hpGaugeWidth.value  = config.hpGaugeWidth;
    hpGaugeHeight.value = config.hpGaugeHeight;

    // Status Effects
    toggleButton('#statusEffectsHorzAlignLeft',   'left' == config.statusEffectsHorzAlign || !config.statusEffectsHorzAlign);
    toggleButton('#statusEffectsHorzAlignCenter', 'center' == config.statusEffectsHorzAlign);
    toggleButton('#statusEffectsHorzAlignRight',  'right' == config.statusEffectsHorzAlign);

    toggleButton('#statusEffectsVertAlignTop',    'top' == config.statusEffectsVertAlign);
    toggleButton('#statusEffectsVertAlignMiddle', 'middle' == config.statusEffectsVertAlign || !config.statusEffectsVertAlign);
    toggleButton('#statusEffectsVertAlignBottom', 'bottom' == config.statusEffectsVertAlign);

    statusEffectsX.value            = config.statusEffectsX;
    statusEffectsY.value            = config.statusEffectsY;
    statusEffectsMaxIcons.value     = config.statusEffectsMaxIcons || 8;

    // Command Window
    toggleButton('#commandTextAlignLeft',               'left' == config.commandTextAlign || !config.commandTextAlign);
    toggleButton('#commandTextAlignCenter',             'center' == config.commandTextAlign);
    toggleButton('#commandTextAlignRight',              'right' == config.commandTextAlign);
    toggleVisibility('#commandWindowFileBox',           config.overrideCommandWindow);
    toggleVisibility('#commandBackgroundFileBox',       'image' == config.commandBackgroundFile);
    toggleVisibility('#commandItemBackgroundFileBox',   'image' == config.commandItemBackgroundType);

    commandOpacity.value                = config.commandOpacity;
    commandItemHeight.value             = config.commandItemHeight;
    commandRowSpacing.value             = config.commandRowSpacing;
    commandColumnSpacing.value          = config.commandColumnSpacing;
    commandStyle.value                  = config.commandStyle || 'iconAndText';
    shouldOverrideCommandWindow.checked = config.overrideCommandWindow;
    commandBackgroundType.value         = config.commandBackgroundType || 'window';
    commandItemBackgroundType.value     = config.commandItemBackgroundType || 'dimmed';

    // Game Info
    showGoldWindow.checked                  = config.showGoldWindow !== false;
    toggleVisibility('#goldWindowBox',      showGoldWindow.checked);
    
    gameInfoTextLeft.value      = config.gameInfoTextLeft;
    gameInfoTextRight.value     = config.gameInfoTextRight;
    unknownMapName.value        = config.unknownMapName;

    goldBackgroundType.value = config.goldBackgroundType || 'window';
    toggleVisibility('#goldBackgroundFileBox', 'image' == config.goldBackgroundType);

    // Gauge Colors
    ['Hp', 'HpCrisis', 'Mp', 'Tp', 'Atb', 'Exp', 'ExpMaxed'].forEach(type => {
        window['gaugeColor' + type + '1'].value = config['gaugeColor' + type + '1'];
        window['gaugeColor' + type + '2'].value = config['gaugeColor' + type + '2'];
    });
    
    ['Hp', 'HpCrisis', 'HpDead', 'Mp', 'Tp', 'Atb', 'Exp', 'ExpMaxed'].forEach(type => {
        window['gaugeBackgroundColor' + type].value = config['gaugeBackgroundColor' + type];
    });
}

function shouldShowCommandWidth() {
    return (
        'none' == config.statusOrientation ||
        'side' == config.commandOrientation ||
        !config.commandOrientation
    );
}

function shouldShowCommandColumnsAndLines() {
    return (
        'none' == config.statusOrientation ||
        'top' == config.commandOrientation ||
        'bottom' == config.commandOrientation
    );
}

function toggleButton(elementId, b) {
    b
        ? $(elementId).removeClass('btn-outline-primary').addClass('btn-primary')
        : $(elementId).removeClass('btn-primary').addClass('btn-outline-primary');
}

function toggleVisibility(elementId, b) {
    b
        ? $(elementId).show()
        : $(elementId).hide();
}

function onSave() {
    const fs = require('fs');
    fs.writeFile(
        'uicustom/config.json',
        JSON.stringify(config, null, 2),
        'utf-8',
        (error) => error && alert("Something went wrong: " + error),
    );
}

function onRestoreDefaults() {
    onQuickTemplate('rows');
}

function onQuickTemplate(template) {
    config = getTemplate(template);

    syncFormInputs();
    onSave();
}

function onNoTouchUIChange(checked) {
    config.noTouchUI = checked;
    onSave();
}

function onCommandInputMode(direction) {
    toggleButton('#commandInputModeLeft', 'left' == direction);
    toggleButton('#commandInputModeRight', 'right' == direction);
    
    config.commandInputMode = direction;
    onSave();
}

function onCommandOrientation(orientation) {
    config.commandOrientation = orientation;
    
    toggleButton('#commandOrientationSide',         'side' == orientation);
    toggleButton('#commandOrientationTop',          'top' == orientation);
    toggleButton('#commandOrientationBottom',       'bottom' == orientation);
    toggleVisibility('#commandWidthBox',            shouldShowCommandWidth());
    toggleVisibility('#commandNumberOfColumnsBox',  shouldShowCommandColumnsAndLines());
    toggleVisibility('#commandNumberOfLinesBox',    shouldShowCommandColumnsAndLines());

    onSave();
}

function onCommandWidthChange(width) {
    config.commandWidth = Number(width);
    onSave();
}

function onCommandNumberOfColumnsChange(nCols) {
    config.commandNumberOfColumns = Number(nCols);
    onSave();
}

function onCommandNumberOfLinesChange(nLines) {
    config.commandNumberOfLines = Number(nLines);
    onSave();
}

function onStatusWindowModeChange(orientation) {
    config.statusOrientation = orientation;
    
    toggleButton('#statusOrientationRows',          'rows' == orientation);
    toggleButton('#statusOrientationColumns',       'columns' == orientation);
    toggleButton('#statusOrientationSingleActor',   'single actor' == orientation);
    toggleButton('#statusOrientationNone',          'none' == orientation);
    toggleVisibility('#visibleActorsBox',           ['rows', 'columns'].includes(orientation));
    toggleVisibility('#commandOrientationBox',      'none' != orientation);
    toggleVisibility('#centerOnlyHint',             'none' == orientation);
    toggleVisibility('#commandWidthBox',            shouldShowCommandWidth());
    toggleVisibility('#commandNumberOfColumnsBox',  shouldShowCommandColumnsAndLines());
    toggleVisibility('#commandNumberOfLinesBox',    shouldShowCommandColumnsAndLines());
    
    onSave();
}

function onVisibleActorsChange(n) {
    config.visibleActors = Number(n);
    onSave();
}

function onVisibleActorsMaxChange(n) {
    config.visibleActorsMax = Number(n);
    onSave();
}

function onAutoAdjustVisibleActorsChange(checked) {
    toggleVisibility('#visibleActorsWave', checked);
    toggleVisibility('#visibleActorsMax', checked);
    
    config.autoAdjustVisibleActors = checked;
    onSave();
}

function onOverrideCommandRectangleChange(checked) {
    toggleVisibility('#commandRectangleByValues', checked);

    config.overrideCommandRectangle = checked;
    onSave();
}

function onOverrideStatusRectangleChange(checked) {
    toggleVisibility('#statusRectangleByValues', checked);

    config.overrideStatusRectangle = checked;
    onSave();
}

function onOverrideGoldRectangleChange(checked) {
    toggleVisibility('#goldRectangleByValues', checked);

    config.overrideGoldRectangle = checked;
    onSave();
}

function onRectangleValueChange(windowType, param, value) {
    config[windowType + 'Rectangle_' + param] = Number(value);
    onSave();
}

function onWindowOpacityChange(value) {
    config.windowOpacity = value !== '' ? Number(value) : undefined;
    onSave();
}

function onWindowLineHeightChange(value) {
    config.windowLineHeight = value !== '' ? Number(value) : undefined;
    onSave();
}

function onWindowItemHeightChange(value) {
    config.windowItemHeight = value !== '' ? Number(value) : undefined;
    onSave();
}

function onWindowItemPaddingChange(value) {
    config.windowItemPadding = value !== '' ? Number(value) : undefined;
    onSave();
}

function onWindowRowSpacingChange(value) {
    config.windowRowSpacing = value !== '' ? Number(value) : undefined;
    onSave();
}

function onWindowColumnSpacingChange(value) {
    config.windowColumnSpacing = value !== '' ? Number(value) : undefined;
    onSave();
}

function onCursorStyleChange(style) {
    toggleVisibility('#cursorStyleBox', 'image' == style);
    
    config.cursorStyle = style;
    onSave();
}

function extractFileName(file) {
    return file
        ? file.replace(/\\/g, '/').split('/').pop().split('.')[0]
        : undefined;
}

function onCursorBackgroundFileChange(file) {
    config.cursorBackgroundFile = extractFileName(file);
    onSave();
}

function onCursorAdjustXChange(x) {
    config.cursorAdjustX = x || x === 0 ? Number(x) : undefined;
    onSave();
}

function onCursorAdjustYChange(y) {
    config.cursorAdjustY = y || y === 0 ? Number(y) : undefined;
    onSave();
}

function onBlinkCursorChange(checked) {
    config.blinkCursor = checked;
    onSave();
}

function onOverrideCursorTextColorChange(checked) {
    toggleVisibility('#cursorTextColor', checked);

    config.overrideCursorTextColor = checked;
    onSave();
}

function onCursorTextColorChange(value) {
    config.cursorTextColor = value;
    onSave();
}

function onDisabledTextOpacityChange(value) {
    config.disabledTextOpacity = value !== "" ? Number(value) : undefined;
    onSave();
}

function onOverrideDisabledTextColorChange(checked) {
    toggleVisibility('#disabledTextColor', checked);
    
    config.overrideDisabledTextColor = checked;
    onSave();
}

function onDisabledTextColorChange(value) {
    config.disabledTextColor = value;
    onSave();
}

function onSceneBackgroundTypeChange(type) {
    toggleVisibility('#sceneBackgroundEffectsBox', 'mapSprite' == type);
    toggleVisibility('#sceneBackgroundFileBox', 'image' == type);

    config.sceneBackgroundType = type;
    onSave();
}

function onSceneBackgroundEffectsChange(effects) {
    config.sceneBackgroundEffects = effects;
    onSave();
}

function onSceneBackgroundFileChange(file) {
    config.sceneBackgroundFile = userFileToLocalFile('img', file);
    onSave();
}

function onStatusOpacityChange(value) {
    config.statusOpacity = value !== "" ? Number(value) : undefined;
    onSave();
}

function onStatusRowSpacingChange(value) {
    config.statusRowSpacing = value !== "" ? Number(value) : undefined;
    onSave();
}

function onStatusColumnSpacingChange(value) {
    config.statusColumnSpacing = value !== "" ? Number(value) : undefined;
    onSave();
}

function onOverrideStatusWindowChange(b) {
    toggleVisibility('#statusWindowFileBox', b);
    
    config.overrideStatusWindow = b;
    onSave();
}

function onStatusWindowFileChange(file) {
    config.statusWindowFile = extractFileName(file);
    onSave();
}

function onStatusBackgroundTypeChange(type) {
    toggleVisibility('#statusBackgroundFileBox', 'image' == type);
    
    config.statusBackgroundType = type;
    onSave();
}

function onStatusBackgroundFileChange(file) {
    config.statusBackgroundFile = userFileToLocalFile('img', file);
    onSave();
}

function userFileToLocalFile(folder, filepath) {
    return filepath
        ? folder + '/' + filepath.replace(/\\/g, '/').split('/' + folder + '/')[1]
        : null;
}

function onStatusItemBackgroundTypeChange(type) {
    toggleVisibility('#statusItemBackgroundFileBox', 'image' == type);
    
    config.statusItemBackgroundType = type;
    onSave();
}

function onStatusItemBackgroundFileChange(file) {
    config.statusItemBackgroundFile = userFileToLocalFile('img', file);
    onSave();
}

function onStatusCursorBackgroundTypeChange(type) {
    toggleVisibility('#statusCursorBackgroundFileBox',  'image' == type);
    toggleVisibility('#statusBlinkCursorBox',           'image' == type);
    
    config.statusCursorBackgroundType = type;
    onSave();
}

function onStatusCursorBackgroundFileChange(file) {
    config.statusCursorBackgroundFile = userFileToLocalFile('img', file);
    onSave();
}

function onStatusBlinkCursorChange(b) {
    config.statusBlinkCursor = b;
    onSave();
}

function onStatusPendingBackgroundTypeChange(type) {
    toggleVisibility('#statusPendingBackgroundFileBox', 'image' == type);
    
    config.statusPendingBackgroundType = type;
    onSave();
}

function onStatusPendingBackgroundFileChange(file) {
    config.statusPendingBackgroundFile = userFileToLocalFile('img', file);
    onSave();
}

function onStatusRenderTypeChange(type) {
    toggleVisibility('#portraitNotetagHint', 'portrait' == type);
    toggleVisibility('#actorImageBox', 'none' != type);
    
    config.statusRenderType = type;
    onSave();
}

function onActorImageHorzAlign(align) {
    toggleButton('#actorImageHorzAlignLeft',    'left' == align);
    toggleButton('#actorImageHorzAlignCenter',  'center' == align);
    toggleButton('#actorImageHorzAlignRight',   'right' == align);

    config.actorImageHorzAlign = align;
    onSave();
}

function onActorImageVertAlign(align) {
    toggleButton('#actorImageVertAlignTop',     'top' == align);
    toggleButton('#actorImageVertAlignMiddle',  'middle' == align);
    toggleButton('#actorImageVertAlignBottom',  'bottom' == align);

    config.actorImageVertAlign = align;
    onSave();
}

function onActorImageOffsetXChange(xOffset) {
    config.actorImageOffsetX = Number(xOffset);
    onSave();
}

function onActorImageOffsetYChange(yOffset) {
    config.actorImageOffsetY = Number(yOffset);
    onSave();
}

function onActorImageCropXChange(xCrop) {
    config.actorImageCropX = Number(xCrop);
    onSave();
}

function onActorImageCropYChange(yCrop) {
    config.actorImageCropY = Number(yCrop);
    onSave();
}

function onActorImageScaleXChange(xScale) {
    config.actorImageScaleX = Number(xScale);
    onSave();
}

function onActorImageScaleYChange(yScale) {
    config.actorImageScaleY = Number(yScale);
    onSave();
}

function onShowShadowBoxChange(checked) {
    toggleVisibility('#actorShadowBoxBox', checked);

    config.showShadowBox = checked;
    onSave();
}

function onShadowBoxXChange(x) {
    config.shadowBoxX = Number(x);
    onSave();
}

function onShadowBoxYChange(y) {
    config.shadowBoxY = Number(y);
    onSave();
}

function onShadowBoxWidthChange(width) {
    config.shadowBoxWidth = Number(width);
    onSave();
}

function onShadowBoxHeightChange(height) {
    config.shadowBoxHeight = Number(height);
    onSave();
}

function onShadowBoxColorChange(color) {
    config.shadowBoxColor = color;
    onSave();
}

function onShadowBoxOpacityChange(value) {
    config.shadowBoxOpacity = Number(value);
    onSave();
}

function onShadowBoxGradientChange(direction) {
    toggleButton('#shadowBoxGradientTop',           'top' == direction);
    toggleButton('#shadowBoxGradientBottom',        'bottom' == direction);
    toggleButton('#shadowBoxGradientLeft',          'left' == direction);
    toggleButton('#shadowBoxGradientRight',         'right' == direction);
    toggleButton('#shadowBoxGradientNone',          'none' == direction);
    toggleVisibility('#shadowBoxGradientPowerBox',  'none' != direction)

    config.shadowBoxGradientDirection = direction;
    onSave();
}

function onShadowBoxGradientPowerChange(value) {
    config.shadowBoxGradientPower = Number(value);
    onSave();
}

function onShowNameChange(checked) {
    toggleVisibility('#actorNameBox', checked);
    
    config.showName = checked;
    onSave();
}

function onNameHorzAlign(align) {
    toggleButton('#nameHorzAlignLeft',      'left' == align);
    toggleButton('#nameHorzAlignCenter',    'center' == align);
    toggleButton('#nameHorzAlignRight',     'right' == align);
    
    config.nameHorzAlign = align;
    onSave();
}

function onNameVertAlign(align) {
    toggleButton('#nameVertAlignTop',       'top' == align);
    toggleButton('#nameVertAlignMiddle',    'middle' == align);
    toggleButton('#nameVertAlignBottom',    'bottom' == align);
    
    config.nameVertAlign = align;
    onSave();
}

function onNameXChange(x) {
    config.nameX = Number(x);
    onSave();
}

function onNameYChange(y) {
    config.nameY = Number(y);
    onSave();
}

function onNameWidthChange(width) {
    config.nameWidth = Number(width);
    onSave();
}

function onNameTextAlignChange(align) {
    toggleButton('#nameTextAlignLeft',    'left' == align);
    toggleButton('#nameTextAlignCenter',  'center' == align);
    toggleButton('#nameTextAlignRight',   'right' == align);

    config.nameTextAlign = align;
    onSave();
}

function onNameFontSizeChange(delta) {
    config.nameFontSize = (config.nameFontSize || 0) + delta;
    config.nameFontSize = Math.min(config.nameFontSize, 10);
    config.nameFontSize = Math.max(config.nameFontSize, -2);
    
    nameFontSize.innerHTML = String(config.nameFontSize);
    onSave();
}

function onNameTextColorChange(color) {
    $('#nameTextColorSpan').css('text-decoration-color', colorCodeToHex(color));
    
    config.nameTextColor = Number(color);
    onSave();
}

function onNameBackgroundTypeChange(type) {
    config.nameBackgroundType = type;
    onSave();
}

function onShowClassChange(checked) {
    toggleVisibility('#actorClassBox', checked);
    
    config.showClass = checked;
    onSave();
}

function onClassHorzAlign(align) {
    toggleButton('#classHorzAlignLeft',     'left' == align);
    toggleButton('#classHorzAlignCenter',   'center' == align);
    toggleButton('#classHorzAlignRight',    'right' == align);
    
    config.classHorzAlign = align;
    onSave();
}

function onClassVertAlign(align) {
    toggleButton('#classVertAlignTop',      'top' == align);
    toggleButton('#classVertAlignMiddle',   'middle' == align);
    toggleButton('#classVertAlignBottom',   'bottom' == align);
    
    config.classVertAlign = align;
    onSave();
}

function onClassXChange(x) {
    config.classX = Number(x);
    onSave();
}

function onClassYChange(y) {
    config.classY = Number(y);
    onSave();
}

function onClassWidthChange(width) {
    config.classWidth = Number(width);
    onSave();
}

function onClassTextAlignChange(align) {
    toggleButton('#classTextAlignLeft',    'left' == align);
    toggleButton('#classTextAlignCenter',  'center' == align);
    toggleButton('#classTextAlignRight',   'right' == align);

    config.classTextAlign = align;
    onSave();
}

function onClassFontSizeChange(delta) {
    config.classFontSize = (config.classFontSize || 0) + delta;
    config.classFontSize = Math.min(config.classFontSize, 10);
    config.classFontSize = Math.max(config.classFontSize, -2);
    
    classFontSize.innerHTML = String(config.classFontSize);
    onSave();
}

function onClassTextColorChange(color) {
    $('#classTextColorSpan').css('text-decoration-color', colorCodeToHex(color));
    
    config.classTextColor = Number(color);
    onSave();
}

function onShowHpChange(checked) {
    toggleVisibility('#actorHpBox', checked);

    config.showHp = checked;
    onSave();
}

function onHpGaugeHorzAlign(align) {
    toggleButton('#hpGaugeHorzAlignLeft',   'left' == align);
    toggleButton('#hpGaugeHorzAlignCenter', 'center' == align);
    toggleButton('#hpGaugeHorzAlignRight',  'right' == align);

    config.hpGaugeHorzAlign = align;
    onSave();
}

function onHpGaugeVertAlign(align) {
    toggleButton('#hpGaugeVertAlignTop',    'top' == align);
    toggleButton('#hpGaugeVertAlignMiddle', 'middle' == align);
    toggleButton('#hpGaugeVertAlignBottom', 'bottom' == align);

    config.hpGaugeVertAlign = align;
    onSave();
}

function onHpGaugeXChange(x) {
    config.hpGaugeX = Number(x);
    onSave();
}

function onHpGaugeYChange(y) {
    config.hpGaugeY = Number(y);
    onSave();
}

function onHpGaugeWidthChange(width) {
    config.hpGaugeWidth = Number(width);
    onSave();
}

function onHpGaugeHeightChange(height) {
    config.hpGaugeHeight = Number(height);
    onSave();
}

function onStatusEffectsHorzAlign(align) {
    toggleButton('#statusEffectsHorzAlignLeft',   'left' == align);
    toggleButton('#statusEffectsHorzAlignCenter', 'center' == align);
    toggleButton('#statusEffectsHorzAlignRight',  'right' == align);

    config.statusEffectsHorzAlign = align;
    onSave();
}

function onStatusEffectsVertAlign(align) {
    toggleButton('#statusEffectsVertAlignTop',    'top' == align);
    toggleButton('#statusEffectsVertAlignMiddle', 'middle' == align);
    toggleButton('#statusEffectsVertAlignBottom', 'bottom' == align);

    config.statusEffectsVertAlign = align;
    onSave();
}

function onStatusEffectsXChange(x) {
    config.statusEffectsX = Number(x);
    onSave();
}

function onStatusEffectsYChange(y) {
    config.statusEffectsY = Number(y);
    onSave();
}

function onStatusEffectsMaxIconsChange(value) {
    config.statusEffectsMaxIcons = Number(value);
    onSave();
}

function onCommandOpacityChange(value) {
    config.commandOpacity = value || value === 0 ? Number(value) : undefined;
    onSave();
}

function onCommandItemHeightChange(value) {
    config.commandItemHeight = value || value === 0 ? Number(value) : undefined;
    onSave();
}

function onCommandRowSpacingChange(value) {
    config.commandRowSpacing = value || value === 0 ? Number(value) : undefined;
    onSave();
}

function onCommandColumnSpacingChange(value) {
    config.commandColumnSpacing = value || value === 0 ? Number(value) : undefined;
    onSave();
}

function onCommandStyleChange(value) {
    config.commandStyle = value;
    onSave();
}

function onCommandTextAlign(align) {
    toggleButton('#commandTextAlignLeft',    'left' == align);
    toggleButton('#commandTextAlignCenter',  'center' == align);
    toggleButton('#commandTextAlignRight',   'right' == align);

    config.commandTextAlign = align;
    onSave();
}

function onShowLevelModeChange(mode) {
    toggleVisibility('#levelPositionBox',   'none' != mode);
    toggleVisibility('#levelGapBox',        'text' == mode);
    toggleVisibility('#levelEmptyBox',      'text' == mode);
    toggleVisibility('#expGaugeWidthBox',   'gauge' == mode);
    toggleVisibility('#expGaugeHeightBox',  'gauge' == mode);
    toggleVisibility('#levelAsTextBox',     'text' == mode);

    config.showLevelMode = mode;
    onSave();
}

function onLevelInfoHorzAlign(align) {
    toggleButton('#levelInfoHorzAlignLeft',     'left' == align);
    toggleButton('#levelInfoHorzAlignCenter',   'center' == align);
    toggleButton('#levelInfoHorzAlignRight',    'right' == align);

    config.levelInfoHorzAlign = align;
    onSave();
}

function onLevelInfoVertAlign(align) {
    toggleButton('#levelInfoVertAlignTop',      'top' == align);
    toggleButton('#levelInfoVertAlignMiddle',   'middle' == align);
    toggleButton('#levelInfoVertAlignBottom',   'bottom' == align);

    config.levelInfoVertAlign = align;
    onSave();
}

function onLevelXChange(x) {
    config.levelX = Number(x);
    onSave();
}

function onLevelYChange(y) {
    config.levelY = Number(y);
    onSave();
}

function onLevelGapChange(gap) {
    config.levelGap = Number(gap);
    onSave();
}

function onExpGaugeWidthChange(value) {
    config.expGaugeWidth = Number(value);
    onSave();
}

function onExpGaugeHeightChange(value) {
    config.expGaugeHeight = Number(value);
    onSave();
}

function onLevelFontSizeChange(delta) {
    config.levelFontSize = (config.levelFontSize || 0) + delta;
    config.levelFontSize = Math.min(config.levelFontSize, 10);
    config.levelFontSize = Math.max(config.levelFontSize, -2);
    
    levelFontSize.innerHTML = String(config.levelFontSize);
    onSave();
}

function onLevelTextColor1Change(color) {
    $('#levelTextColor1Span').css('text-decoration-color', colorCodeToHex(color));
    
    config.levelTextColor1 = Number(color);
    onSave();
}

function onLevelTextColor2Change(color) {
    $('#levelTextColor2Span').css('text-decoration-color', colorCodeToHex(color));
    
    config.levelTextColor2 = Number(color);
    onSave();
}

function onExpGaugeColorChange(type, color) {
    config['expGaugeColor' + type] = color;
    onSave();
}

function onOverrideCommandWindowChange(b) {
    toggleVisibility('#commandWindowFileBox', b);

    config.overrideCommandWindow = b;
    onSave();
}

function onCommandWindowFileChange(file) {
    config.commandWindowFile = userFileToLocalFile('img', file);
    onSave();
}

function onCommandBackgroundTypeChange(type) {
    toggleVisibility('#commandBackgroundFileBox', 'image' == type);
    
    config.commandBackgroundType = type;
    onSave();
}

function onCommandBackgroundFileChange(file) {
    config.commandBackgroundFile = userFileToLocalFile('img', file);
    onSave();
}

function onCommandItemBackgroundTypeChange(type) {
    toggleVisibility('#commandItemBackgroundFileBox', 'image' == type);
    
    config.commandItemBackgroundType = type;
    onSave();
}

function onCommandItemBackgroundFileChange(file) {
    config.commandItemBackgroundFile = userFileToLocalFile('img', file);
    onSave();
}

function onShowGoldChange(checked) {
    toggleVisibility('#goldWindowBox', checked);
    
    config.showGoldWindow = checked;
    onSave();
}

function onGameInfoTextLeftChange(text) {
    config.gameInfoTextLeft = text;
    onSave();
}

function onGameInfoTextRightChange(text) {
    config.gameInfoTextRight = text;
    onSave();
}

function onUnknownMapNameChange(text) {
    config.unknownMapName = text;
    onSave();
}

function onGoldBackgroundTypeChange(type) {
    toggleVisibility('#goldBackgroundFileBox', 'image' == type);
    
    config.goldBackgroundType = type;
    onSave();
}

function onGoldBackgroundFileChange(file) {
    config.goldBackgroundFile = userFileToLocalFile('img', file);
    onSave();
}

function onPreviewGaugeColor(type) {
    config.previewGaugeColor = type;
    onSave();
    config.previewGaugeColor = undefined;
}

function onGaugeColorChange(type, color) {
    config['gaugeColor' + type] = color;
    onSave();
}

function onResetGaugeColor(type) {
    window['gaugeColor' + type + '1'].value = getTemplate()['gaugeColor' + type + '1'];
    window['gaugeColor' + type + '2'].value = getTemplate()['gaugeColor' + type + '2'];

    config['gaugeColor' + type + '1'] = getTemplate()['gaugeColor' + type + '1'];
    config['gaugeColor' + type + '2'] = getTemplate()['gaugeColor' + type + '2'];
    onSave();
}

function onGaugeBackgroundColorChange(type, color) {
    config['gaugeBackgroundColor' + type] = color;
    onSave();
}

function onResetGaugeBackgroundColor(type) {
    window['gaugeBackgroundColor' + type].value = getTemplate()['gaugeBackgroundColor' + type];

    config['gaugeBackgroundColor' + type] = getTemplate()['gaugeBackgroundColor' + type];
    onSave();
}


$(document).ready(() =>
    $('.initially-hidden')
        .css('display', 'none')
        .removeClass('initially-hidden')
)
$(document).ready(() => {
    $('.my-color-picker').each((_, element) => {
        hexColors.forEach((hex, i) => $(element)
            .append($('<option></option>')
                .val(i)
                .css('background-color', hex)
            ))
    });
});
$(document).ready(() => loadConfig());
