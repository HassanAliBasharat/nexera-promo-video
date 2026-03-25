#target aftereffects

/*******************************************************************************
 * 09_scene_clear_actions.jsx
 * Scene 10: Bento grid + flowing tube (0:33 – 0:36)
 * Features: 8-10 rectangles flying into bento grid, curved flowing tube
 *           with Trim Paths, "Clear actions" text.
 ******************************************************************************/

app.beginUndoGroup("Scene 10 - Clear Actions");

// ============================================================================
// COLOR PALETTE
// ============================================================================
var DARK_BG_2    = [6/255, 18/255, 48/255];
var BRAND_BLUE   = [49/255, 93/255, 234/255];
var LIGHT_BLUE   = [91/255, 138/255, 255/255];
var GLOW_BLUE    = [123/255, 164/255, 255/255];
var WHITE        = [1, 1, 1];

var COMP_WIDTH  = 3840;
var COMP_HEIGHT = 2160;

function smoothEase() { return new KeyframeEase(0, 75); }
function setSmooth(prop, idx) {
    prop.setTemporalEaseAtKey(idx, [smoothEase()], [smoothEase()]);
}

// Find comps
var mainComp = null;
var asteriskComp = null;
for (var i = 1; i <= app.project.numItems; i++) {
    var item = app.project.item(i);
    if (item instanceof CompItem) {
        if (item.name === "NEXERA_Promo_Master") mainComp = item;
        if (item.name === "Asterisk_Icon") asteriskComp = item;
    }
}

// ============================================================================
// 1. BENTO GRID RECTANGLES (fly in from scattered positions)
// ============================================================================
var gridCards = [
    { w: 600, h: 400, endX: 800,  endY: 500,  color: DARK_BG_2 },
    { w: 500, h: 400, endX: 1450, endY: 500,  color: BRAND_BLUE },
    { w: 700, h: 400, endX: 2200, endY: 500,  color: DARK_BG_2 },
    { w: 400, h: 400, endX: 2800, endY: 500,  color: LIGHT_BLUE },
    { w: 500, h: 350, endX: 700,  endY: 950,  color: LIGHT_BLUE },
    { w: 600, h: 350, endX: 1350, endY: 950,  color: DARK_BG_2 },
    { w: 500, h: 350, endX: 2000, endY: 950,  color: BRAND_BLUE },
    { w: 600, h: 350, endX: 2650, endY: 950,  color: DARK_BG_2 },
    { w: 700, h: 300, endX: 900,  endY: 1350, color: BRAND_BLUE },
    { w: 800, h: 300, endX: 2200, endY: 1350, color: DARK_BG_2 }
];

// Scattered start positions (off-screen or random)
var scatterPositions = [
    [-400, -300], [4200, -200], [-300, 2400], [4300, 2500],
    [-500, 1000], [4400, 800], [1920, -500], [1920, 2700],
    [-600, 1600], [4500, 1400]
];

for (var gc = 0; gc < gridCards.length; gc++) {
    var card = gridCards[gc];
    var bentoCard = mainComp.layers.addShape();
    bentoCard.name = "Bento_Card_" + (gc + 1);
    bentoCard.inPoint = 33;
    bentoCard.outPoint = 36;

    var bcGrp = bentoCard.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
    var bcC = bcGrp.property("ADBE Vectors Group");
    var bcRect = bcC.addProperty("ADBE Vector Shape - Rect");
    bcRect.property("ADBE Vector Rect Size").setValue([card.w, card.h]);
    bcRect.property("ADBE Vector Rect Roundness").setValue(20);
    var bcFill = bcC.addProperty("ADBE Vector Graphic - Fill");
    bcFill.property("ADBE Vector Fill Color").setValue([card.color[0], card.color[1], card.color[2], 1]);

    // For DARK_BG_2 cards, reduce opacity slightly
    if (card.color === DARK_BG_2) {
        bcFill.property("ADBE Vector Fill Opacity").setValue(70);
    }

    // Add subtle stroke
    var bcStroke = bcC.addProperty("ADBE Vector Graphic - Stroke");
    bcStroke.property("ADBE Vector Stroke Color").setValue([LIGHT_BLUE[0], LIGHT_BLUE[1], LIGHT_BLUE[2], 1]);
    bcStroke.property("ADBE Vector Stroke Width").setValue(1);
    bcStroke.property("ADBE Vector Stroke Opacity").setValue(20);

    // Position: scattered -> grid (staggered timing)
    var staggerDelay = gc * 0.08;
    var bcPos = bentoCard.property("ADBE Transform Group").property("ADBE Position");
    bcPos.setValueAtTime(33 + staggerDelay, scatterPositions[gc]);
    bcPos.setValueAtTime(33.5 + staggerDelay, [card.endX, card.endY]);
    setSmooth(bcPos, 1);
    setSmooth(bcPos, 2);

    // Scale: slight overshoot
    var bcScale = bentoCard.property("ADBE Transform Group").property("ADBE Transform Scale");
    bcScale.setValueAtTime(33 + staggerDelay, [80, 80, 100]);
    bcScale.setValueAtTime(33.5 + staggerDelay, [103, 103, 100]);
    bcScale.setValueAtTime(33.65 + staggerDelay, [100, 100, 100]);
    for (var bs = 1; bs <= 3; bs++) { setSmooth(bcScale, bs); }

    // Opacity
    var bcOp = bentoCard.property("ADBE Transform Group").property("ADBE Opacity");
    bcOp.setValueAtTime(33 + staggerDelay, 0);
    bcOp.setValueAtTime(33.3 + staggerDelay, 100);
}

// ============================================================================
// 2. FLOWING CURVED TUBE (thick stroke with Trim Paths)
// ============================================================================
var tube = mainComp.layers.addShape();
tube.name = "Flowing_Tube";
tube.inPoint = 33;
tube.outPoint = 36;

var tubeGrp = tube.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
tubeGrp.name = "TubePath";
var tubeC = tubeGrp.property("ADBE Vectors Group");

var tubePath = tubeC.addProperty("ADBE Vector Shape - Group");
var tubeShape = new Shape();
tubeShape.vertices = [
    [200, 1700], [800, 1500], [1600, 1800], [2400, 1600], [3200, 1750], [3600, 1500]
];
tubeShape.inTangents = [
    [0, 0], [-200, 100], [-300, -100], [-300, 100], [-200, 50], [-200, 100]
];
tubeShape.outTangents = [
    [200, -100], [300, -100], [300, 100], [200, -100], [200, -50], [0, 0]
];
tubeShape.closed = false;
tubePath.property("ADBE Vector Shape").setValue(tubeShape);

var tubeStroke = tubeC.addProperty("ADBE Vector Graphic - Stroke");
tubeStroke.property("ADBE Vector Stroke Color").setValue([BRAND_BLUE[0], BRAND_BLUE[1], BRAND_BLUE[2], 1]);
tubeStroke.property("ADBE Vector Stroke Width").setValue(40);
tubeStroke.property("ADBE Vector Stroke Line Cap").setValue(2); // Round

// Trim Paths drawing animation
var tubeTrim = tubeC.addProperty("ADBE Vector Filter - Trim");
var tubeEnd = tubeTrim.property("ADBE Vector Trim End");
tubeEnd.setValueAtTime(33.5, 0);
tubeEnd.setValueAtTime(35.0, 100);
setSmooth(tubeEnd, 1);
setSmooth(tubeEnd, 2);

// Add glow
var tubeGlow = tube.property("ADBE Effect Parade").addProperty("ADBE Glo2");
tubeGlow.property("ADBE Glo2-0002").setValue(20);
tubeGlow.property("ADBE Glo2-0003").setValue(0.6);

// ============================================================================
// 3. TEXT: "Clear actions"
// ============================================================================
// "Clear"
var clearText = mainComp.layers.addText("Clear");
clearText.name = "Text_Clear";
clearText.inPoint = 34.5;
clearText.outPoint = 36;

var clTD = clearText.property("ADBE Text Properties").property("ADBE Text Document");
var cltd = clTD.value;
cltd.resetCharStyle();
cltd.fontSize = 96;
cltd.fillColor = WHITE;
cltd.font = "Montserrat-Light";
cltd.justification = ParagraphJustification.LEFT_JUSTIFY;
clTD.setValue(cltd);

clearText.property("ADBE Transform Group").property("ADBE Position").setValue([1400, 1100]);

var clOp = clearText.property("ADBE Transform Group").property("ADBE Opacity");
clOp.setValueAtTime(34.5, 0);
clOp.setValueAtTime(34.8, 100);
setSmooth(clOp, 1); setSmooth(clOp, 2);

// "actions"
var actionsText = mainComp.layers.addText("actions");
actionsText.name = "Text_actions";
actionsText.inPoint = 34.8;
actionsText.outPoint = 36;

var acTD = actionsText.property("ADBE Text Properties").property("ADBE Text Document");
var actd = acTD.value;
actd.resetCharStyle();
actd.fontSize = 104;
actd.fillColor = [BRAND_BLUE[0], BRAND_BLUE[1], BRAND_BLUE[2]];
actd.font = "Montserrat-Bold";
actd.justification = ParagraphJustification.LEFT_JUSTIFY;
acTD.setValue(actd);

actionsText.property("ADBE Transform Group").property("ADBE Position").setValue([1850, 1100]);

var acOp = actionsText.property("ADBE Transform Group").property("ADBE Opacity");
acOp.setValueAtTime(34.8, 0);
acOp.setValueAtTime(35.1, 100);
setSmooth(acOp, 1); setSmooth(acOp, 2);

// ============================================================================
// 4. ASTERISK ICON
// ============================================================================
var bentoAst = mainComp.layers.add(asteriskComp);
bentoAst.name = "Asterisk_Scene10";
bentoAst.inPoint = 33;
bentoAst.outPoint = 36;
bentoAst.property("ADBE Transform Group").property("ADBE Position").setValue([3200, 400]);
bentoAst.property("ADBE Transform Group").property("ADBE Transform Scale").setValue([30, 30, 100]);
bentoAst.property("ADBE Transform Group").property("ADBE Position").expression =
    "[value[0], value[1] + Math.sin(time*2)*8]";

app.endUndoGroup();
alert("09_scene_clear_actions.jsx complete!\nScene 10 (0:33 – 0:36) built.\nRun 10_scene_philosophy_text.jsx next.");
