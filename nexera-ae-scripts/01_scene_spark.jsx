#target aftereffects

/*******************************************************************************
 * 01_scene_spark.jsx
 * Scene 1: "Everything starts with a Spark" (0:00 – 0:02.5)
 * Features: word-by-word reveal, animated cursor click, spark pill pop-in,
 *           particle burst, flash overlay, floating asterisk icon.
 ******************************************************************************/

app.beginUndoGroup("Scene 1 - Spark");

// ============================================================================
// COLOR PALETTE
// ============================================================================
var DARK_BG_1    = [10/255, 26/255, 61/255];
var DARK_BG_2    = [6/255, 18/255, 48/255];
var AURORA_GLOW  = [49/255, 93/255, 234/255];
var BRAND_BLUE   = [49/255, 93/255, 234/255];
var LIGHT_BLUE   = [91/255, 138/255, 255/255];
var GLOW_BLUE    = [123/255, 164/255, 255/255];
var WHITE        = [1, 1, 1];

var FPS = 30;
var COMP_WIDTH  = 3840;
var COMP_HEIGHT = 2160;

function smoothEase() { return new KeyframeEase(0, 75); }
function setSmooth(prop, idx) {
    prop.setTemporalEaseAtKey(idx, [smoothEase()], [smoothEase()]);
}

// ============================================================================
// FIND MAIN COMP AND PRE-COMPS
// ============================================================================
var mainComp = null;
var darkBGComp = null;
var asteriskComp = null;

for (var i = 1; i <= app.project.numItems; i++) {
    var item = app.project.item(i);
    if (item instanceof CompItem) {
        if (item.name === "NEXERA_Promo_Master") mainComp = item;
        if (item.name === "Dark_BG") darkBGComp = item;
        if (item.name === "Asterisk_Icon") asteriskComp = item;
    }
}

if (!mainComp) { alert("Error: Run 00_project_setup.jsx first!"); }

// ============================================================================
// 1. DARK_BG INSTANCE (covers Scenes 1-3: 0s to 10.5s)
// ============================================================================
var darkBG = mainComp.layers.add(darkBGComp);
darkBG.name = "Dark_BG_Scenes1-3";
darkBG.startTime = 0;
darkBG.inPoint = 0;
darkBG.outPoint = 10.5;

// ============================================================================
// 2. AURORA_GLOW_EXTRA (subtle ambient glow)
// ============================================================================
var auroraExtra = mainComp.layers.addSolid(
    [BRAND_BLUE[0], BRAND_BLUE[1], BRAND_BLUE[2]],
    "Aurora_Glow_Extra", 2000, 2000, 1, 10.5
);
auroraExtra.startTime = 0;
auroraExtra.inPoint = 0;
auroraExtra.outPoint = 10.5;
auroraExtra.property("ADBE Transform Group").property("ADBE Position").setValue([1200, 1080]);
auroraExtra.property("ADBE Transform Group").property("ADBE Opacity").setValue(6);

// Gaussian Blur
var auroraBlur = auroraExtra.property("ADBE Effect Parade").addProperty("ADBE Gaussian Blur 2");
auroraBlur.property("ADBE Gaussian Blur 2-0001").setValue(400);
auroraBlur.property("ADBE Gaussian Blur 2-0003").setValue(true); // Repeat Edge Pixels

// Slow drift expression
auroraExtra.property("ADBE Transform Group").property("ADBE Position").expression =
    "[value[0] + Math.sin(time*0.2)*80, value[1] + Math.cos(time*0.3)*50]";

// Move below dark BG
auroraExtra.moveAfter(darkBG);

// ============================================================================
// 3. TEXT: "Everything starts with a" (single text layer with animator)
// ============================================================================
var mainText = mainComp.layers.addText("Everything starts with a");
mainText.name = "Text_Everything_starts_with_a";
mainText.inPoint = 0;
mainText.outPoint = 2.5;

var mainTextDoc = mainText.property("ADBE Text Properties").property("ADBE Text Document");
var td = mainTextDoc.value;
td.resetCharStyle();
td.fontSize = 144;
td.fillColor = WHITE;
td.font = "Montserrat-Light";
td.justification = ParagraphJustification.CENTER_JUSTIFY;
td.tracking = 20;
mainTextDoc.setValue(td);

mainText.property("ADBE Transform Group").property("ADBE Position").setValue([COMP_WIDTH/2, 1000]);

// Scale animation: 95% -> 100%
var mainScale = mainText.property("ADBE Transform Group").property("ADBE Transform Scale");
mainScale.setValueAtTime(0, [95, 95, 100]);
mainScale.setValueAtTime(0.5, [100, 100, 100]);
setSmooth(mainScale, 1);
setSmooth(mainScale, 2);

// Opacity: 0 -> 100
var mainOpacity = mainText.property("ADBE Transform Group").property("ADBE Opacity");
mainOpacity.setValueAtTime(0, 0);
mainOpacity.setValueAtTime(0.5, 100);
setSmooth(mainOpacity, 1);
setSmooth(mainOpacity, 2);

// Add Text Animator for word-by-word reveal
var textProp = mainText.property("ADBE Text Properties").property("ADBE Text Animators");
var animator1 = textProp.addProperty("ADBE Text Animator");
animator1.name = "WordReveal";

// Animator properties
var animProp = animator1.property("ADBE Text Animator Properties");
animProp.addProperty("ADBE Text Opacity");
animProp.property("ADBE Text Opacity").setValue(0);

var animXPos = animProp.addProperty("ADBE Text Position");
animXPos.setValue([-40, 0]);

// Range selector
var selector1 = animator1.property("ADBE Text Selectors").property(1);
selector1.property("ADBE Text Selector Mode").setValue(1); // Based on: Words (approximation)
var rangeStart = selector1.property("ADBE Text Percent Start");
var rangeEnd = selector1.property("ADBE Text Percent End");

// Animate the range to reveal words over time
rangeEnd.setValueAtTime(0, 0);
rangeEnd.setValueAtTime(0.5, 25);   // "Everything"
rangeEnd.setValueAtTime(0.7, 50);   // "starts"
rangeEnd.setValueAtTime(0.9, 75);   // "with"
rangeEnd.setValueAtTime(1.0, 100);  // "a"

for (var k = 1; k <= rangeEnd.numKeys; k++) { setSmooth(rangeEnd, k); }

// ============================================================================
// 4. CURSOR (triangle/arrow pointer shape)
// ============================================================================
var cursor = mainComp.layers.addShape();
cursor.name = "Cursor_Arrow";
cursor.inPoint = 0;
cursor.outPoint = 2.5;

var curGrp = cursor.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
curGrp.name = "CursorShape";
var curContents = curGrp.property("ADBE Vectors Group");

// Triangle path
var triPath = curContents.addProperty("ADBE Vector Shape - Group");
var triShape = new Shape();
triShape.vertices = [[0, 0], [0, 48], [34, 36]];
triShape.inTangents = [[0,0],[0,0],[0,0]];
triShape.outTangents = [[0,0],[0,0],[0,0]];
triShape.closed = true;
triPath.property("ADBE Vector Shape").setValue(triShape);

var triFill = curContents.addProperty("ADBE Vector Graphic - Fill");
triFill.property("ADBE Vector Fill Color").setValue([1, 1, 1, 1]);

// Drop shadow effect
var cursorShadow = cursor.property("ADBE Effect Parade").addProperty("ADBE Drop Shadow");
cursorShadow.property("ADBE Drop Shadow-0002").setValue(4);  // Distance
cursorShadow.property("ADBE Drop Shadow-0003").setValue(10); // Softness
cursorShadow.property("ADBE Drop Shadow-0001").setValue([0, 0, 0, 0.5]); // Color

// Position keyframes: off to the side -> near text
var curPos = cursor.property("ADBE Transform Group").property("ADBE Position");
curPos.setValueAtTime(0, [3200, 1800]);
curPos.setValueAtTime(1.0, [2600, 1100]);
setSmooth(curPos, 1);
setSmooth(curPos, 2);

// Scale click effect
var curScale = cursor.property("ADBE Transform Group").property("ADBE Transform Scale");
curScale.setValueAtTime(1.5, [100, 100, 100]);
curScale.setValueAtTime(1.57, [88, 88, 100]);
curScale.setValueAtTime(1.63, [100, 100, 100]);
for (var c = 1; c <= 3; c++) { setSmooth(curScale, c); }

// ============================================================================
// 5. SPARK PILL (rounded rectangle with "Spark" text)
// ============================================================================
var sparkPill = mainComp.layers.addShape();
sparkPill.name = "Spark_Pill";
sparkPill.inPoint = 0;
sparkPill.outPoint = 2.5;

var pillGrp = sparkPill.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
pillGrp.name = "PillShape";
var pillContents = pillGrp.property("ADBE Vectors Group");

// Rounded rectangle
var pillRect = pillContents.addProperty("ADBE Vector Shape - Rect");
pillRect.property("ADBE Vector Rect Size").setValue([280, 96]);
pillRect.property("ADBE Vector Rect Roundness").setValue(48);

// Fill: BRAND_BLUE
var pillFill = pillContents.addProperty("ADBE Vector Graphic - Fill");
pillFill.property("ADBE Vector Fill Color").setValue([BRAND_BLUE[0], BRAND_BLUE[1], BRAND_BLUE[2], 1]);

sparkPill.property("ADBE Transform Group").property("ADBE Position").setValue([2650, 1000]);

// Scale keyframes: 0% -> 108% -> 100% (bounce)
var pillScale = sparkPill.property("ADBE Transform Group").property("ADBE Transform Scale");
pillScale.setValueAtTime(1.3, [0, 0, 100]);
pillScale.setValueAtTime(1.6, [108, 108, 100]);
pillScale.setValueAtTime(1.7, [100, 100, 100]);
for (var s = 1; s <= 3; s++) { setSmooth(pillScale, s); }

// Opacity
var pillOpacity = sparkPill.property("ADBE Transform Group").property("ADBE Opacity");
pillOpacity.setValueAtTime(1.3, 0);
pillOpacity.setValueAtTime(1.6, 100);
setSmooth(pillOpacity, 1);
setSmooth(pillOpacity, 2);

// "Spark" text layer
var sparkText = mainComp.layers.addText("Spark");
sparkText.name = "Text_Spark";
sparkText.inPoint = 1.3;
sparkText.outPoint = 2.5;

var sparkTD = sparkText.property("ADBE Text Properties").property("ADBE Text Document");
var sTD = sparkTD.value;
sTD.resetCharStyle();
sTD.fontSize = 32;
sTD.fillColor = WHITE;
sTD.font = "Montserrat-Bold";
sTD.justification = ParagraphJustification.CENTER_JUSTIFY;
sparkTD.setValue(sTD);

sparkText.property("ADBE Transform Group").property("ADBE Position").setValue([2620, 1010]);
sparkText.property("ADBE Transform Group").property("ADBE Opacity").setValueAtTime(1.3, 0);
sparkText.property("ADBE Transform Group").property("ADBE Opacity").setValueAtTime(1.6, 100);

// Small Asterisk_Icon instance next to "Spark"
var sparkAsterisk = mainComp.layers.add(asteriskComp);
sparkAsterisk.name = "Spark_Pill_Asterisk";
sparkAsterisk.inPoint = 1.3;
sparkAsterisk.outPoint = 2.5;
sparkAsterisk.property("ADBE Transform Group").property("ADBE Position").setValue([2750, 1000]);
sparkAsterisk.property("ADBE Transform Group").property("ADBE Transform Scale").setValue([20, 20, 100]);
sparkAsterisk.property("ADBE Transform Group").property("ADBE Opacity").setValueAtTime(1.3, 0);
sparkAsterisk.property("ADBE Transform Group").property("ADBE Opacity").setValueAtTime(1.6, 100);

// ============================================================================
// 6. PARTICLE BURST (10 small circles exploding outward)
// ============================================================================
var burstCenter = [2650, 1000];
var numParticles = 10;

for (var p = 0; p < numParticles; p++) {
    var angle = (p / numParticles) * 2 * Math.PI; // evenly spaced
    var endX = burstCenter[0] + Math.cos(angle) * 120;
    var endY = burstCenter[1] + Math.sin(angle) * 120;
    var particleColor = (p % 2 === 0) ? LIGHT_BLUE : WHITE;

    var particle = mainComp.layers.addShape();
    particle.name = "Particle_" + (p + 1);
    particle.inPoint = 1.5;
    particle.outPoint = 2.3;

    var pGrp = particle.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
    var pContents = pGrp.property("ADBE Vectors Group");
    var pEll = pContents.addProperty("ADBE Vector Shape - Ellipse");
    pEll.property("ADBE Vector Ellipse Size").setValue([8, 8]);
    var pFill = pContents.addProperty("ADBE Vector Graphic - Fill");
    pFill.property("ADBE Vector Fill Color").setValue([particleColor[0], particleColor[1], particleColor[2], 1]);

    // Position: center -> outward
    var pPos = particle.property("ADBE Transform Group").property("ADBE Position");
    pPos.setValueAtTime(1.6, burstCenter);
    pPos.setValueAtTime(2.2, [endX, endY]);
    setSmooth(pPos, 1);
    setSmooth(pPos, 2);

    // Opacity: 100 -> 0
    var pOp = particle.property("ADBE Transform Group").property("ADBE Opacity");
    pOp.setValueAtTime(1.6, 100);
    pOp.setValueAtTime(2.2, 0);

    // Scale: 100 -> 40
    var pSc = particle.property("ADBE Transform Group").property("ADBE Transform Scale");
    pSc.setValueAtTime(1.6, [100, 100, 100]);
    pSc.setValueAtTime(2.2, [40, 40, 100]);
}

// ============================================================================
// 7. FLASH OVERLAY (blue-tinted flash at click moment)
// ============================================================================
var flashOverlay = mainComp.layers.addSolid(
    [BRAND_BLUE[0], BRAND_BLUE[1], BRAND_BLUE[2]],
    "Flash_Overlay", COMP_WIDTH, COMP_HEIGHT, 1, 2.5
);
flashOverlay.name = "Flash_Overlay_Click";
flashOverlay.inPoint = 0;
flashOverlay.outPoint = 2.5;
flashOverlay.blendingMode = BlendingMode.ADD;

var flashOp = flashOverlay.property("ADBE Transform Group").property("ADBE Opacity");
flashOp.setValueAtTime(1.6, 0);
flashOp.setValueAtTime(1.7, 35);
flashOp.setValueAtTime(2.0, 0);
for (var f = 1; f <= 3; f++) { setSmooth(flashOp, f); }

// ============================================================================
// 8. FLOATING ASTERISK_ICON (decorative)
// ============================================================================
var floatAsterisk = mainComp.layers.add(asteriskComp);
floatAsterisk.name = "Asterisk_Float_Scene1";
floatAsterisk.inPoint = 0;
floatAsterisk.outPoint = 2.5;
floatAsterisk.property("ADBE Transform Group").property("ADBE Position").setValue([1600, 900]);
floatAsterisk.property("ADBE Transform Group").property("ADBE Transform Scale").setValue([30, 30, 100]);
floatAsterisk.property("ADBE Transform Group").property("ADBE Position").expression =
    "[value[0], value[1] + Math.sin(time*2)*10]";

// Add extra glow
var floatGlow = floatAsterisk.property("ADBE Effect Parade").addProperty("ADBE Glo2");
floatGlow.property("ADBE Glo2-0003").setValue(25);
floatGlow.property("ADBE Glo2-0004").setValue(1.0);

// ============================================================================
// LAYER ORDERING: move Dark_BG to bottom
// ============================================================================
darkBG.moveToEnd();
auroraExtra.moveToEnd();

app.endUndoGroup();
alert("01_scene_spark.jsx complete!\nScene 1 (0:00 – 0:02.5) built.\nRun 02_scene_concept_words.jsx next.");
