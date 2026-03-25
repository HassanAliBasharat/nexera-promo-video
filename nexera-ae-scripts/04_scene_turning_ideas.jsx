#target aftereffects

/*******************************************************************************
 * 04_scene_turning_ideas.jsx
 * Scene 4: Stock footage + "Turning visions into digital reality" (0:10.5 – 0:14.5)
 * Features: stock footage placeholder with blur/darken, dot grid overlay,
 *           word-by-word text with highlight markers, typewriter reveal.
 ******************************************************************************/

app.beginUndoGroup("Scene 4 - Turning Ideas");

// ============================================================================
// COLOR PALETTE
// ============================================================================
var DARK_BG_2    = [6/255, 18/255, 48/255];
var BRAND_BLUE   = [49/255, 93/255, 234/255];
var LIGHT_BLUE   = [91/255, 138/255, 255/255];
var WHITE        = [1, 1, 1];

var COMP_WIDTH  = 3840;
var COMP_HEIGHT = 2160;

function smoothEase() { return new KeyframeEase(0, 75); }
function setSmooth(prop, idx) {
    prop.setTemporalEaseAtKey(idx, [smoothEase()], [smoothEase()]);
}

// Find comps
var mainComp = null;
var dotGridComp = null;
var asteriskComp = null;
for (var i = 1; i <= app.project.numItems; i++) {
    var item = app.project.item(i);
    if (item instanceof CompItem) {
        if (item.name === "NEXERA_Promo_Master") mainComp = item;
        if (item.name === "Dot_Grid") dotGridComp = item;
        if (item.name === "Asterisk_Icon") asteriskComp = item;
    }
}

// ============================================================================
// 1. STOCK FOOTAGE PLACEHOLDER
// ============================================================================
var footagePlaceholder = mainComp.layers.addSolid(
    [0.15, 0.15, 0.2], "STOCK_FOOTAGE_1_REPLACE_ME", COMP_WIDTH, COMP_HEIGHT, 1, 4
);
footagePlaceholder.name = "Stock_Footage_1_REPLACE";
footagePlaceholder.startTime = 10.5;
footagePlaceholder.inPoint = 10.5;
footagePlaceholder.outPoint = 14.5;

// NOTE: Replace this solid with your stock footage clip
// Download free from pexels.com — search "web developer working at computer"
// Look for a dark/moody office shot with monitor glow

// Apply Gaussian Blur
var ftBlur = footagePlaceholder.property("ADBE Effect Parade").addProperty("ADBE Gaussian Blur 2");
ftBlur.property("ADBE Gaussian Blur 2-0001").setValue(4);
ftBlur.property("ADBE Gaussian Blur 2-0003").setValue(true);

// Apply Brightness/Contrast (darken)
var ftBC = footagePlaceholder.property("ADBE Effect Parade").addProperty("ADBE Brightness & Contrast 2");
ftBC.property("ADBE Brightness & Contrast 2-0001").setValue(-30);

// Add placeholder label text
var labelText = mainComp.layers.addText("[ REPLACE WITH STOCK FOOTAGE ]\nSearch: 'web developer working'\npexels.com");
labelText.name = "Footage_Label_DELETE";
labelText.inPoint = 10.5;
labelText.outPoint = 14.5;

var labelTD = labelText.property("ADBE Text Properties").property("ADBE Text Document");
var ltd = labelTD.value;
ltd.resetCharStyle();
ltd.fontSize = 48;
ltd.fillColor = [0.5, 0.5, 0.5];
ltd.font = "Arial";
ltd.justification = ParagraphJustification.CENTER_JUSTIFY;
labelTD.setValue(ltd);
labelText.property("ADBE Transform Group").property("ADBE Position").setValue([COMP_WIDTH / 2, COMP_HEIGHT / 2 + 300]);

// ============================================================================
// 2. DOT GRID OVERLAY
// ============================================================================
var dotGrid = mainComp.layers.add(dotGridComp);
dotGrid.name = "Dot_Grid_Overlay_Scene4";
dotGrid.startTime = 10.5;
dotGrid.inPoint = 10.5;
dotGrid.outPoint = 14.5;
dotGrid.property("ADBE Transform Group").property("ADBE Opacity").setValue(40);

// ============================================================================
// 3. TEXT: "Turning" (slide up reveal)
// ============================================================================
var turningText = mainComp.layers.addText("Turning");
turningText.name = "Text_Turning";
turningText.inPoint = 11;
turningText.outPoint = 14.5;

var turnTD = turningText.property("ADBE Text Properties").property("ADBE Text Document");
var ttd = turnTD.value;
ttd.resetCharStyle();
ttd.fontSize = 96;
ttd.fillColor = WHITE;
ttd.font = "Montserrat-Light";
ttd.justification = ParagraphJustification.LEFT_JUSTIFY;
turnTD.setValue(ttd);

turningText.property("ADBE Transform Group").property("ADBE Position").setValue([1200, 950]);

// Slide up + fade in
var turnOp = turningText.property("ADBE Transform Group").property("ADBE Opacity");
turnOp.setValueAtTime(11.3, 0);
turnOp.setValueAtTime(11.6, 100);
setSmooth(turnOp, 1);
setSmooth(turnOp, 2);

var turnPos = turningText.property("ADBE Transform Group").property("ADBE Position");
turnPos.setValueAtTime(11.3, [1200, 990]);
turnPos.setValueAtTime(11.6, [1200, 950]);
setSmooth(turnPos, 1);
setSmooth(turnPos, 2);

// ============================================================================
// 4. TEXT: "visions" WITH HIGHLIGHT
// ============================================================================
// Highlight shape
var visHighlight = mainComp.layers.addShape();
visHighlight.name = "Visions_Highlight_BG";
visHighlight.inPoint = 11.5;
visHighlight.outPoint = 14.5;

var vhGrp = visHighlight.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
var vhC = vhGrp.property("ADBE Vectors Group");
var vhRect = vhC.addProperty("ADBE Vector Shape - Rect");
vhRect.property("ADBE Vector Rect Size").setValue([340, 120]);
vhRect.property("ADBE Vector Rect Roundness").setValue(12);
var vhFill = vhC.addProperty("ADBE Vector Graphic - Fill");
vhFill.property("ADBE Vector Fill Color").setValue([BRAND_BLUE[0], BRAND_BLUE[1], BRAND_BLUE[2], 1]);
vhFill.property("ADBE Vector Fill Opacity").setValue(80);

visHighlight.property("ADBE Transform Group").property("ADBE Position").setValue([1200, 1100]);

// Wipe reveal
var vhScale = visHighlight.property("ADBE Transform Group").property("ADBE Transform Scale");
vhScale.setValueAtTime(11.8, [0, 100, 100]);
vhScale.setValueAtTime(12.2, [100, 100, 100]);
setSmooth(vhScale, 1);
setSmooth(vhScale, 2);

// "visions" text
var visText = mainComp.layers.addText("visions");
visText.name = "Text_visions";
visText.inPoint = 11.5;
visText.outPoint = 14.5;

var visTD = visText.property("ADBE Text Properties").property("ADBE Text Document");
var vtd = visTD.value;
vtd.resetCharStyle();
vtd.fontSize = 104;
vtd.fillColor = WHITE;
vtd.font = "Montserrat-Bold";
vtd.justification = ParagraphJustification.LEFT_JUSTIFY;
visTD.setValue(vtd);

visText.property("ADBE Transform Group").property("ADBE Position").setValue([1200, 1100]);

var visOp = visText.property("ADBE Transform Group").property("ADBE Opacity");
visOp.setValueAtTime(11.8, 0);
visOp.setValueAtTime(12.0, 100);
setSmooth(visOp, 1);
setSmooth(visOp, 2);

// ============================================================================
// 5. TEXT: "into" (slide up)
// ============================================================================
var intoText = mainComp.layers.addText("into");
intoText.name = "Text_into";
intoText.inPoint = 12;
intoText.outPoint = 14.5;

var intoTD = intoText.property("ADBE Text Properties").property("ADBE Text Document");
var intd = intoTD.value;
intd.resetCharStyle();
intd.fontSize = 96;
intd.fillColor = WHITE;
intd.font = "Montserrat-Light";
intd.justification = ParagraphJustification.LEFT_JUSTIFY;
intoTD.setValue(intd);

intoText.property("ADBE Transform Group").property("ADBE Position").setValue([1200, 1250]);

var intoOp = intoText.property("ADBE Transform Group").property("ADBE Opacity");
intoOp.setValueAtTime(12.5, 0);
intoOp.setValueAtTime(12.8, 100);
setSmooth(intoOp, 1);
setSmooth(intoOp, 2);

var intoPos = intoText.property("ADBE Transform Group").property("ADBE Position");
intoPos.setValueAtTime(12.5, [1200, 1290]);
intoPos.setValueAtTime(12.8, [1200, 1250]);
setSmooth(intoPos, 1);
setSmooth(intoPos, 2);

// ============================================================================
// 6. TEXT: "digital reality" (typewriter reveal)
// ============================================================================
var drText = mainComp.layers.addText("digital reality");
drText.name = "Text_digital_reality";
drText.inPoint = 12.5;
drText.outPoint = 14.5;

var drTD = drText.property("ADBE Text Properties").property("ADBE Text Document");
var drtd = drTD.value;
drtd.resetCharStyle();
drtd.fontSize = 96;
drtd.fillColor = WHITE;
drtd.font = "Montserrat-Light";
drtd.justification = ParagraphJustification.LEFT_JUSTIFY;
drTD.setValue(drtd);

drText.property("ADBE Transform Group").property("ADBE Position").setValue([1200, 1400]);

// Typewriter animator
var drAnimators = drText.property("ADBE Text Properties").property("ADBE Text Animators");
var drAnim = drAnimators.addProperty("ADBE Text Animator");
drAnim.name = "Typewriter";

var drAnimProps = drAnim.property("ADBE Text Animator Properties");
drAnimProps.addProperty("ADBE Text Opacity").setValue(0);

var drSel = drAnim.property("ADBE Text Selectors").property(1);
var drStart = drSel.property("ADBE Text Percent Start");
drStart.setValueAtTime(12.8, 0);
drStart.setValueAtTime(13.5, 100);
setSmooth(drStart, 1);
setSmooth(drStart, 2);

// ============================================================================
// 7. ASTERISK ICON (bottom center, glowing)
// ============================================================================
var astIcon = mainComp.layers.add(asteriskComp);
astIcon.name = "Asterisk_Scene4";
astIcon.inPoint = 10.5;
astIcon.outPoint = 14.5;
astIcon.property("ADBE Transform Group").property("ADBE Position").setValue([COMP_WIDTH / 2, 1800]);
astIcon.property("ADBE Transform Group").property("ADBE Transform Scale").setValue([35, 35, 100]);

var astGlow = astIcon.property("ADBE Effect Parade").addProperty("ADBE Glo2");
astGlow.property("ADBE Glo2-0002").setValue(30);
astGlow.property("ADBE Glo2-0003").setValue(1.2);

astIcon.property("ADBE Transform Group").property("ADBE Position").expression =
    "[value[0], value[1] + Math.sin(time*1.5)*8]";

// Move background layers to back
footagePlaceholder.moveToEnd();

app.endUndoGroup();
alert("04_scene_turning_ideas.jsx complete!\nScene 4 (0:10.5 – 0:14.5) built.\nRun 05_scene_growth_clarity.jsx next.");
