#target aftereffects

/*******************************************************************************
 * 03_scene_what_if_grow.jsx
 * Scene 3: "What if this could grow?" (0:07 – 0:10.5)
 * Features: glowing blob, rotating diamond, asterisk, text with highlight
 *           marker, floating particles, flash transition out.
 ******************************************************************************/

app.beginUndoGroup("Scene 3 - What If Grow");

// ============================================================================
// COLOR PALETTE
// ============================================================================
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
// 1. GLOW BLOB (ambient background element)
// ============================================================================
var glowBlob = mainComp.layers.addSolid(
    [GLOW_BLUE[0], GLOW_BLUE[1], GLOW_BLUE[2]],
    "Glow_Blob", 1200, 1200, 1, 3.5
);
glowBlob.name = "Glow_Blob_Scene3";
glowBlob.startTime = 7;
glowBlob.inPoint = 7;
glowBlob.outPoint = 10.5;
glowBlob.property("ADBE Transform Group").property("ADBE Position").setValue([2600, 1100]);
glowBlob.property("ADBE Transform Group").property("ADBE Opacity").setValue(20);

var blobBlur = glowBlob.property("ADBE Effect Parade").addProperty("ADBE Gaussian Blur 2");
blobBlur.property("ADBE Gaussian Blur 2-0001").setValue(300);
blobBlur.property("ADBE Gaussian Blur 2-0003").setValue(true);

glowBlob.property("ADBE Transform Group").property("ADBE Position").expression =
    "[value[0] + Math.sin(time*0.4)*60, value[1] + Math.cos(time*0.3)*40]";

// ============================================================================
// 2. ROTATING DIAMOND (rounded rect, stroke only)
// ============================================================================
var diamond = mainComp.layers.addShape();
diamond.name = "Rotating_Diamond";
diamond.inPoint = 7;
diamond.outPoint = 10.5;

var diaGrp = diamond.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
var diaC = diaGrp.property("ADBE Vectors Group");
var diaRect = diaC.addProperty("ADBE Vector Shape - Rect");
diaRect.property("ADBE Vector Rect Size").setValue([400, 400]);
diaRect.property("ADBE Vector Rect Roundness").setValue(48);
var diaStroke = diaC.addProperty("ADBE Vector Graphic - Stroke");
diaStroke.property("ADBE Vector Stroke Color").setValue([LIGHT_BLUE[0], LIGHT_BLUE[1], LIGHT_BLUE[2], 1]);
diaStroke.property("ADBE Vector Stroke Width").setValue(6);

diamond.property("ADBE Transform Group").property("ADBE Position").setValue([2400, 800]);

// Glow effect
var diaGlow = diamond.property("ADBE Effect Parade").addProperty("ADBE Glo2");
diaGlow.property("ADBE Glo2-0002").setValue(25);
diaGlow.property("ADBE Glo2-0003").setValue(1.2);

// Rotation: starts 45° (diamond), continuous rotation
diamond.property("ADBE Transform Group").property("ADBE Rotate Z").expression = "45 + time * 20";

// Scale bounce-in
var diaScale = diamond.property("ADBE Transform Group").property("ADBE Transform Scale");
diaScale.setValueAtTime(7, [0, 0, 100]);
diaScale.setValueAtTime(7.5, [105, 105, 100]);
diaScale.setValueAtTime(7.7, [100, 100, 100]);
for (var ds = 1; ds <= 3; ds++) { setSmooth(diaScale, ds); }

// ============================================================================
// 3. ASTERISK INSIDE DIAMOND
// ============================================================================
var diaAsterisk = mainComp.layers.add(asteriskComp);
diaAsterisk.name = "Asterisk_In_Diamond";
diaAsterisk.inPoint = 7;
diaAsterisk.outPoint = 10.5;
diaAsterisk.property("ADBE Transform Group").property("ADBE Position").setValue([2400, 800]);
diaAsterisk.property("ADBE Transform Group").property("ADBE Transform Scale").setValue([60, 60, 100]);

// Extra glow
var diaAstGlow = diaAsterisk.property("ADBE Effect Parade").addProperty("ADBE Glo2");
diaAstGlow.property("ADBE Glo2-0002").setValue(40);
diaAstGlow.property("ADBE Glo2-0003").setValue(1.5);

// ============================================================================
// 4. TEXT: "What if this could"
// ============================================================================
var whatText = mainComp.layers.addText("What if this could");
whatText.name = "Text_What_if_this_could";
whatText.inPoint = 7;
whatText.outPoint = 10.5;

var whatTD = whatText.property("ADBE Text Properties").property("ADBE Text Document");
var wtd = whatTD.value;
wtd.resetCharStyle();
wtd.fontSize = 84;
wtd.fillColor = WHITE;
wtd.font = "Montserrat-Light";
wtd.justification = ParagraphJustification.LEFT_JUSTIFY;
whatTD.setValue(wtd);

whatText.property("ADBE Transform Group").property("ADBE Position").setValue([700, 1600]);

// Fade in
var whatOp = whatText.property("ADBE Transform Group").property("ADBE Opacity");
whatOp.setValueAtTime(7.5, 0);
whatOp.setValueAtTime(8.0, 100);
setSmooth(whatOp, 1);
setSmooth(whatOp, 2);

// ============================================================================
// 5. TEXT: "grow" WITH HIGHLIGHT MARKER
// ============================================================================
// Highlight background shape
var growHighlight = mainComp.layers.addShape();
growHighlight.name = "Grow_Highlight_BG";
growHighlight.inPoint = 8;
growHighlight.outPoint = 10.5;

var ghGrp = growHighlight.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
var ghC = ghGrp.property("ADBE Vectors Group");
var ghRect = ghC.addProperty("ADBE Vector Shape - Rect");
ghRect.property("ADBE Vector Rect Size").setValue([200, 100]);
ghRect.property("ADBE Vector Rect Roundness").setValue(12);
var ghFill = ghC.addProperty("ADBE Vector Graphic - Fill");
ghFill.property("ADBE Vector Fill Color").setValue([BRAND_BLUE[0], BRAND_BLUE[1], BRAND_BLUE[2], 1]);
ghFill.property("ADBE Vector Fill Opacity").setValue(80);

growHighlight.property("ADBE Transform Group").property("ADBE Position").setValue([700, 1700]);

// Wipe reveal: scaleX 0 -> 100
var ghScale = growHighlight.property("ADBE Transform Group").property("ADBE Transform Scale");
ghScale.setValueAtTime(8.3, [0, 100, 100]);
ghScale.setValueAtTime(8.7, [100, 100, 100]);
setSmooth(ghScale, 1);
setSmooth(ghScale, 2);

// "grow" text
var growText = mainComp.layers.addText("grow");
growText.name = "Text_grow";
growText.inPoint = 8;
growText.outPoint = 10.5;

var growTD = growText.property("ADBE Text Properties").property("ADBE Text Document");
var gtd = growTD.value;
gtd.resetCharStyle();
gtd.fontSize = 84;
gtd.fillColor = WHITE;
gtd.font = "Montserrat-Bold";
gtd.justification = ParagraphJustification.LEFT_JUSTIFY;
growTD.setValue(gtd);

growText.property("ADBE Transform Group").property("ADBE Position").setValue([700, 1700]);

var growOp = growText.property("ADBE Transform Group").property("ADBE Opacity");
growOp.setValueAtTime(8.3, 0);
growOp.setValueAtTime(8.5, 100);
setSmooth(growOp, 1);
setSmooth(growOp, 2);

// ============================================================================
// 6. TEXT: "?" (pop-in bounce)
// ============================================================================
var qMarkText = mainComp.layers.addText("?");
qMarkText.name = "Text_QuestionMark";
qMarkText.inPoint = 8.5;
qMarkText.outPoint = 10.5;

var qmTD = qMarkText.property("ADBE Text Properties").property("ADBE Text Document");
var qmtd = qmTD.value;
qmtd.resetCharStyle();
qmtd.fontSize = 84;
qmtd.fillColor = WHITE;
qmtd.font = "Montserrat-Light";
qmTD.setValue(qmtd);

qMarkText.property("ADBE Transform Group").property("ADBE Position").setValue([910, 1700]);

var qmScale = qMarkText.property("ADBE Transform Group").property("ADBE Transform Scale");
qmScale.setValueAtTime(8.7, [0, 0, 100]);
qmScale.setValueAtTime(8.9, [120, 120, 100]);
qmScale.setValueAtTime(9.0, [100, 100, 100]);
for (var q = 1; q <= 3; q++) { setSmooth(qmScale, q); }

// ============================================================================
// 7. FLOATING PARTICLES (6 small circles with drift)
// ============================================================================
var particlePositions = [
    [800, 400], [3000, 600], [500, 1400], [3200, 1600], [1500, 300], [2800, 1900]
];

for (var fp = 0; fp < 6; fp++) {
    var fPart = mainComp.layers.addShape();
    fPart.name = "Float_Particle_" + (fp + 1);
    fPart.inPoint = 7;
    fPart.outPoint = 10.5;

    var fpGrp = fPart.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
    var fpC = fpGrp.property("ADBE Vectors Group");
    var fpEll = fpC.addProperty("ADBE Vector Shape - Ellipse");
    fpEll.property("ADBE Vector Ellipse Size").setValue([6, 6]);
    var fpFill = fpC.addProperty("ADBE Vector Graphic - Fill");
    fpFill.property("ADBE Vector Fill Color").setValue([LIGHT_BLUE[0], LIGHT_BLUE[1], LIGHT_BLUE[2], 1]);
    fPart.property("ADBE Transform Group").property("ADBE Opacity").setValue(60);

    fPart.property("ADBE Transform Group").property("ADBE Position").setValue(particlePositions[fp]);
    var seedX = fp * 1.7;
    var seedY = fp * 2.3;
    fPart.property("ADBE Transform Group").property("ADBE Position").expression =
        "[value[0] + Math.sin(time*0.5 + " + seedX + ")*30, value[1] + Math.cos(time*0.4 + " + seedY + ")*25]";
}

// ============================================================================
// 8. FLASH TRANSITION OUT
// ============================================================================
// Asterisk scales up as transition
var transAsterisk = mainComp.layers.add(asteriskComp);
transAsterisk.name = "Asterisk_Transition_Out";
transAsterisk.inPoint = 9.5;
transAsterisk.outPoint = 10.5;
transAsterisk.property("ADBE Transform Group").property("ADBE Position").setValue([2400, 800]);

var taScale = transAsterisk.property("ADBE Transform Group").property("ADBE Transform Scale");
taScale.setValueAtTime(10.0, [60, 60, 100]);
taScale.setValueAtTime(10.5, [200, 200, 100]);
setSmooth(taScale, 1);
setSmooth(taScale, 2);

var taOp = transAsterisk.property("ADBE Transform Group").property("ADBE Opacity");
taOp.setValueAtTime(10.0, 100);
taOp.setValueAtTime(10.5, 0);

// Glow ramp
var taGlow = transAsterisk.property("ADBE Effect Parade").addProperty("ADBE Glo2");
taGlow.property("ADBE Glo2-0002").setValue(60);
var taGlowInt = taGlow.property("ADBE Glo2-0003");
taGlowInt.setValueAtTime(10.0, 1.0);
taGlowInt.setValueAtTime(10.5, 3.0);

// White flash
var flashOut = mainComp.layers.addSolid([1, 1, 1], "Flash_Out_Scene3", COMP_WIDTH, COMP_HEIGHT, 1, 1);
flashOut.startTime = 10;
flashOut.inPoint = 10;
flashOut.outPoint = 10.7;

var flashOutOp = flashOut.property("ADBE Transform Group").property("ADBE Opacity");
flashOutOp.setValueAtTime(10.2, 0);
flashOutOp.setValueAtTime(10.35, 50);
flashOutOp.setValueAtTime(10.5, 0);
for (var fo = 1; fo <= 3; fo++) { setSmooth(flashOutOp, fo); }

// Move glow blob to back
glowBlob.moveToEnd();

app.endUndoGroup();
alert("03_scene_what_if_grow.jsx complete!\nScene 3 (0:07 – 0:10.5) built.\nRun 04_scene_turning_ideas.jsx next.");
