#target aftereffects

/*******************************************************************************
 * 05_scene_growth_clarity.jsx
 * Scenes 5-6: GROWTH cascade + CLARITY cascade (0:14.5 – 0:19)
 * Features: flash to light theme, scrolling text cascades, gradient arc
 *           fragments assembly, asterisk floating with cascade.
 ******************************************************************************/

app.beginUndoGroup("Scenes 5-6 - Growth & Clarity");

// ============================================================================
// COLOR PALETTE
// ============================================================================
var DARK_BG_2    = [6/255, 18/255, 48/255];
var BRAND_BLUE   = [49/255, 93/255, 234/255];
var LIGHT_BLUE   = [91/255, 138/255, 255/255];
var GLOW_BLUE    = [123/255, 164/255, 255/255];
var LIGHT_BG_1   = [240/255, 244/255, 255/255];
var LIGHT_BG_2   = [224/255, 232/255, 248/255];
var WHITE        = [1, 1, 1];
var DARK_TEXT    = [10/255, 26/255, 61/255];

var COMP_WIDTH  = 3840;
var COMP_HEIGHT = 2160;

function smoothEase() { return new KeyframeEase(0, 75); }
function setSmooth(prop, idx) {
    prop.setTemporalEaseAtKey(idx, [smoothEase()], [smoothEase()]);
}

// Find comps
var mainComp = null;
var lightBGComp = null;
var asteriskComp = null;
for (var i = 1; i <= app.project.numItems; i++) {
    var item = app.project.item(i);
    if (item instanceof CompItem) {
        if (item.name === "NEXERA_Promo_Master") mainComp = item;
        if (item.name === "Light_BG") lightBGComp = item;
        if (item.name === "Asterisk_Icon") asteriskComp = item;
    }
}

// ============================================================================
// 1. FLASH TO LIGHT THEME
// ============================================================================
var flashToLight = mainComp.layers.addSolid([1, 1, 1], "Flash_To_Light", COMP_WIDTH, COMP_HEIGHT, 1, 1);
flashToLight.startTime = 14;
flashToLight.inPoint = 14;
flashToLight.outPoint = 15;

var ftlOp = flashToLight.property("ADBE Transform Group").property("ADBE Opacity");
ftlOp.setValueAtTime(14.3, 0);
ftlOp.setValueAtTime(14.5, 100);
ftlOp.setValueAtTime(14.7, 0);
for (var fl = 1; fl <= 3; fl++) { setSmooth(ftlOp, fl); }

// ============================================================================
// 2. LIGHT BG (covers through ribbon scene: 14.5 – 24)
// ============================================================================
var lightBG = mainComp.layers.add(lightBGComp);
lightBG.name = "Light_BG_Scenes5-7";
lightBG.startTime = 14.5;
lightBG.inPoint = 14.5;
lightBG.outPoint = 24;

// ============================================================================
// 3. LARGE CIRCLE DECORATION
// ============================================================================
var circleDecor = mainComp.layers.addShape();
circleDecor.name = "Large_Circle_Decoration";
circleDecor.inPoint = 14.5;
circleDecor.outPoint = 19;

var cdGrp = circleDecor.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
var cdC = cdGrp.property("ADBE Vectors Group");
var cdEll = cdC.addProperty("ADBE Vector Shape - Ellipse");
cdEll.property("ADBE Vector Ellipse Size").setValue([2000, 2000]);
var cdFill = cdC.addProperty("ADBE Vector Graphic - Fill");
cdFill.property("ADBE Vector Fill Color").setValue([LIGHT_BG_2[0], LIGHT_BG_2[1], LIGHT_BG_2[2], 1]);
cdFill.property("ADBE Vector Fill Opacity").setValue(40);

circleDecor.property("ADBE Transform Group").property("ADBE Position").setValue([-200, 1080]);

// ============================================================================
// 4. GROWTH CASCADE PRE-COMP
// ============================================================================
var growthCascadeComp = app.project.items.addComp("GROWTH_Cascade", COMP_WIDTH, 4000, 1, COMP_DURATION, 30);

// Find folder
var folderComps = null;
for (var f = 1; f <= app.project.numItems; f++) {
    if (app.project.item(f) instanceof FolderItem && app.project.item(f).name === "01_Comps") {
        folderComps = app.project.item(f);
        break;
    }
}
if (folderComps) growthCascadeComp.parentFolder = folderComps;

var growthTexts = ["GROWTH", "GROWTH", "GROWTH", "GROWTH", "GROWTH", "GROWTH", "GROWTH"];
var growthOpacities = [6, 15, 30, 100, 30, 15, 6];
var growthYPositions = [400, 620, 840, 1060, 1280, 1500, 1720];

for (var g = 0; g < 7; g++) {
    var gText = growthCascadeComp.layers.addText(growthTexts[g]);
    gText.name = "GROWTH_" + (g + 1);

    var gTD = gText.property("ADBE Text Properties").property("ADBE Text Document");
    var gtd = gTD.value;
    gtd.resetCharStyle();
    gtd.fontSize = 160;
    gtd.justification = ParagraphJustification.CENTER_JUSTIFY;
    gtd.tracking = 40;

    if (growthOpacities[g] === 100) {
        gtd.fillColor = [BRAND_BLUE[0], BRAND_BLUE[1], BRAND_BLUE[2]];
        gtd.font = "Montserrat-Black";
    } else {
        gtd.fillColor = [DARK_TEXT[0], DARK_TEXT[1], DARK_TEXT[2]];
        gtd.font = "Montserrat-Black";
    }
    gTD.setValue(gtd);

    gText.property("ADBE Transform Group").property("ADBE Position").setValue([COMP_WIDTH / 2, growthYPositions[g]]);
    gText.property("ADBE Transform Group").property("ADBE Opacity").setValue(growthOpacities[g]);
}

// Place GROWTH cascade in master comp
var growthLayer = mainComp.layers.add(growthCascadeComp);
growthLayer.name = "GROWTH_Cascade_Layer";
growthLayer.inPoint = 14.5;
growthLayer.outPoint = 17.5;

// Scroll position Y upward over 3 seconds
var growthPos = growthLayer.property("ADBE Transform Group").property("ADBE Position");
growthPos.setValueAtTime(14.5, [COMP_WIDTH / 2, COMP_HEIGHT / 2 + 400]);
growthPos.setValueAtTime(17.5, [COMP_WIDTH / 2, COMP_HEIGHT / 2 - 400]);

// ============================================================================
// 5. ASTERISK WITH GROWTH CASCADE
// ============================================================================
var growthAst = mainComp.layers.add(asteriskComp);
growthAst.name = "Asterisk_Growth";
growthAst.inPoint = 14.5;
growthAst.outPoint = 17.5;
growthAst.property("ADBE Transform Group").property("ADBE Transform Scale").setValue([40, 40, 100]);

// Follow the cascade movement
growthAst.property("ADBE Transform Group").property("ADBE Position").expression =
    'var growthLayer = thisComp.layer("GROWTH_Cascade_Layer");' +
    'var baseY = growthLayer.transform.position[1] - 260;' +
    '[2600, baseY + Math.sin(time*2)*10]';

var growthAstGlow = growthAst.property("ADBE Effect Parade").addProperty("ADBE Glo2");
growthAstGlow.property("ADBE Glo2-0002").setValue(25);
growthAstGlow.property("ADBE Glo2-0003").setValue(1.0);

// ============================================================================
// 6. CLARITY TRANSITION: GRADIENT ARC FRAGMENTS
// ============================================================================
var arcPositionsStart = [
    [600, 400], [3200, 300], [500, 1800], [3400, 1700], [1800, 200]
];
var arcPositionsEnd = [
    [1500, 800], [2300, 800], [1200, 1200], [2600, 1200], [1920, 1000]
];
var arcRotStart = [45, -30, 120, -60, 90];
var arcRotEnd = [0, 0, 0, 0, 0];

for (var ac = 0; ac < 5; ac++) {
    var arcFrag = mainComp.layers.addShape();
    arcFrag.name = "Arc_Fragment_" + (ac + 1);
    arcFrag.inPoint = 17.3;
    arcFrag.outPoint = 18.5;

    var afGrp = arcFrag.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
    var afC = afGrp.property("ADBE Vectors Group");

    // Create arc path
    var afPath = afC.addProperty("ADBE Vector Shape - Group");
    var arcShape = new Shape();
    var arcRadius = 200 + ac * 60;
    var segments = 8;
    var verts = [];
    var inTans = [];
    var outTans = [];
    for (var s = 0; s <= segments; s++) {
        var angle = (s / segments) * Math.PI / 2; // quarter circle
        verts.push([arcRadius * Math.cos(angle), -arcRadius * Math.sin(angle)]);
        var tanLen = arcRadius * 0.15;
        inTans.push([-tanLen * Math.sin(angle), -tanLen * Math.cos(angle)]);
        outTans.push([tanLen * Math.sin(angle), tanLen * Math.cos(angle)]);
    }
    arcShape.vertices = verts;
    arcShape.inTangents = inTans;
    arcShape.outTangents = outTans;
    arcShape.closed = false;
    afPath.property("ADBE Vector Shape").setValue(arcShape);

    var afStroke = afC.addProperty("ADBE Vector Graphic - Stroke");
    if (ac % 2 === 0) {
        afStroke.property("ADBE Vector Stroke Color").setValue([BRAND_BLUE[0], BRAND_BLUE[1], BRAND_BLUE[2], 1]);
    } else {
        afStroke.property("ADBE Vector Stroke Color").setValue([LIGHT_BLUE[0], LIGHT_BLUE[1], LIGHT_BLUE[2], 1]);
    }
    afStroke.property("ADBE Vector Stroke Width").setValue(40);

    // Animate position: scattered -> assembled
    var afPos = arcFrag.property("ADBE Transform Group").property("ADBE Position");
    afPos.setValueAtTime(17.3, arcPositionsStart[ac]);
    afPos.setValueAtTime(18.0, arcPositionsEnd[ac]);
    setSmooth(afPos, 1);
    setSmooth(afPos, 2);

    // Animate rotation: random -> 0
    var afRot = arcFrag.property("ADBE Transform Group").property("ADBE Rotate Z");
    afRot.setValueAtTime(17.3, arcRotStart[ac]);
    afRot.setValueAtTime(18.0, arcRotEnd[ac]);
    setSmooth(afRot, 1);
    setSmooth(afRot, 2);

    // Opacity
    var afOp = arcFrag.property("ADBE Transform Group").property("ADBE Opacity");
    afOp.setValueAtTime(17.3, 0);
    afOp.setValueAtTime(17.6, 100);
    afOp.setValueAtTime(18.3, 100);
    afOp.setValueAtTime(18.5, 0);
}

// ============================================================================
// 7. CLARITY CASCADE PRE-COMP
// ============================================================================
var clarityCascadeComp = app.project.items.addComp("CLARITY_Cascade", COMP_WIDTH, 4000, 1, COMP_DURATION, 30);
if (folderComps) clarityCascadeComp.parentFolder = folderComps;

var clarityOpacities = [6, 15, 30, 100, 30, 15, 6];
var clarityYPositions = [400, 620, 840, 1060, 1280, 1500, 1720];

for (var c = 0; c < 7; c++) {
    var cText = clarityCascadeComp.layers.addText("CLARITY");
    cText.name = "CLARITY_" + (c + 1);

    var cTD = cText.property("ADBE Text Properties").property("ADBE Text Document");
    var ctd = cTD.value;
    ctd.resetCharStyle();
    ctd.fontSize = 160;
    ctd.justification = ParagraphJustification.CENTER_JUSTIFY;
    ctd.tracking = 40;

    if (clarityOpacities[c] === 100) {
        ctd.fillColor = [BRAND_BLUE[0], BRAND_BLUE[1], BRAND_BLUE[2]];
        ctd.font = "Montserrat-Black";
    } else {
        ctd.fillColor = [DARK_TEXT[0], DARK_TEXT[1], DARK_TEXT[2]];
        ctd.font = "Montserrat-Black";
    }
    cTD.setValue(ctd);

    cText.property("ADBE Transform Group").property("ADBE Position").setValue([COMP_WIDTH / 2, clarityYPositions[c]]);
    cText.property("ADBE Transform Group").property("ADBE Opacity").setValue(clarityOpacities[c]);
}

// Place CLARITY cascade in master comp
var clarityLayer = mainComp.layers.add(clarityCascadeComp);
clarityLayer.name = "CLARITY_Cascade_Layer";
clarityLayer.inPoint = 17.5;
clarityLayer.outPoint = 19.0;

// Scroll position Y upward
var clarityPos = clarityLayer.property("ADBE Transform Group").property("ADBE Position");
clarityPos.setValueAtTime(17.5, [COMP_WIDTH / 2, COMP_HEIGHT / 2 + 300]);
clarityPos.setValueAtTime(19.0, [COMP_WIDTH / 2, COMP_HEIGHT / 2 - 200]);

// Move backgrounds to back
lightBG.moveToEnd();

app.endUndoGroup();
alert("05_scene_growth_clarity.jsx complete!\nScenes 5-6 (0:14.5 – 0:19) built.\nRun 06_scene_ribbon_footage.jsx next.");
