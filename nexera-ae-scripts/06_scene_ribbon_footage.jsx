#target aftereffects

/*******************************************************************************
 * 06_scene_ribbon_footage.jsx
 * Scene 7: Stock footage with ribbon wrap (0:19 – 0:24)
 * Features: rounded footage frame, gradient S-curve ribbon with Trim Paths,
 *           text along ribbon, doodle characters, asterisk icon.
 ******************************************************************************/

app.beginUndoGroup("Scene 7 - Ribbon Footage");

// ============================================================================
// COLOR PALETTE
// ============================================================================
var DARK_TEXT    = [10/255, 26/255, 61/255];
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
var asteriskComp = null;
var doodleFace1 = null;
var doodleFace2 = null;
for (var i = 1; i <= app.project.numItems; i++) {
    var item = app.project.item(i);
    if (item instanceof CompItem) {
        if (item.name === "NEXERA_Promo_Master") mainComp = item;
        if (item.name === "Asterisk_Icon") asteriskComp = item;
        if (item.name === "Doodle_Face_1") doodleFace1 = item;
        if (item.name === "Doodle_Face_2") doodleFace2 = item;
    }
}

// ============================================================================
// 1. STOCK FOOTAGE 2 PLACEHOLDER
// ============================================================================
var footage2 = mainComp.layers.addSolid(
    [0.4, 0.4, 0.45], "STOCK_FOOTAGE_2_REPLACE_ME", 2400, 1350, 1, 5
);
footage2.name = "Stock_Footage_2_REPLACE";
footage2.startTime = 19;
footage2.inPoint = 19;
footage2.outPoint = 24;
footage2.property("ADBE Transform Group").property("ADBE Position").setValue([COMP_WIDTH / 2, COMP_HEIGHT / 2]);

// Rounded rectangle mask
var ftMask = footage2.property("ADBE Mask Parade").addProperty("ADBE Mask Atom");
var maskShape = new Shape();
var hw = 1200; var hh = 675; var rnd = 32;
maskShape.vertices = [
    [-hw + rnd, -hh], [hw - rnd, -hh], [hw, -hh + rnd], [hw, hh - rnd],
    [hw - rnd, hh], [-hw + rnd, hh], [-hw, hh - rnd], [-hw, -hh + rnd]
];
maskShape.inTangents = [
    [0, 0], [0, 0], [rnd, 0], [0, 0],
    [0, 0], [0, 0], [-rnd, 0], [0, 0]
];
maskShape.outTangents = [
    [0, 0], [rnd, 0], [0, 0], [0, 0],
    [0, 0], [-rnd, 0], [0, 0], [0, 0]
];
maskShape.closed = true;
ftMask.property("ADBE Mask Shape").setValue(maskShape);
ftMask.property("ADBE Mask Feather").setValue([2, 2]);

// Placeholder label
var label2 = mainComp.layers.addText("[ REPLACE WITH STOCK FOOTAGE ]\nSearch: 'woman working laptop'\npexels.com");
label2.name = "Footage2_Label_DELETE";
label2.inPoint = 19;
label2.outPoint = 24;

var l2TD = label2.property("ADBE Text Properties").property("ADBE Text Document");
var l2td = l2TD.value;
l2td.resetCharStyle();
l2td.fontSize = 40;
l2td.fillColor = [0.6, 0.6, 0.6];
l2td.font = "Arial";
l2td.justification = ParagraphJustification.CENTER_JUSTIFY;
l2TD.setValue(l2td);
label2.property("ADBE Transform Group").property("ADBE Position").setValue([COMP_WIDTH / 2, COMP_HEIGHT / 2]);

// ============================================================================
// 2. GRADIENT RIBBON (S-curve with Trim Paths)
// ============================================================================
var ribbon = mainComp.layers.addShape();
ribbon.name = "Gradient_Ribbon";
ribbon.inPoint = 19;
ribbon.outPoint = 24;

var ribGrp = ribbon.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
ribGrp.name = "RibbonPath";
var ribC = ribGrp.property("ADBE Vectors Group");

// S-curve path around footage frame
var ribPath = ribC.addProperty("ADBE Vector Shape - Group");
var ribbonShape = new Shape();
ribbonShape.vertices = [
    [600, 200],
    [400, 700],
    [400, 1200],
    [1200, 1800],
    [1920, 1900],
    [2700, 1800],
    [3200, 1200],
    [3200, 800]
];
ribbonShape.inTangents = [
    [0, 0],
    [100, -300],
    [0, -200],
    [-400, 0],
    [-300, 100],
    [-300, 100],
    [200, 300],
    [0, 200]
];
ribbonShape.outTangents = [
    [-100, 200],
    [0, 200],
    [0, 300],
    [300, 0],
    [300, 0],
    [300, -100],
    [0, -200],
    [100, -200]
];
ribbonShape.closed = false;
ribPath.property("ADBE Vector Shape").setValue(ribbonShape);

// Gradient stroke
var ribStroke = ribC.addProperty("ADBE Vector Graphic - Stroke");
ribStroke.property("ADBE Vector Stroke Color").setValue([BRAND_BLUE[0], BRAND_BLUE[1], BRAND_BLUE[2], 1]);
ribStroke.property("ADBE Vector Stroke Width").setValue(60);
ribStroke.property("ADBE Vector Stroke Line Cap").setValue(2); // Round cap

// Trim Paths animation: ribbon draws itself
var trimPaths = ribC.addProperty("ADBE Vector Filter - Trim");
var trimEnd = trimPaths.property("ADBE Vector Trim End");
trimEnd.setValueAtTime(19.5, 0);
trimEnd.setValueAtTime(21.5, 100);
setSmooth(trimEnd, 1);
setSmooth(trimEnd, 2);

// ============================================================================
// 3. TEXT ON RIBBON (LEFT SIDE)
// ============================================================================
var ribTextLeft = mainComp.layers.addText("Not complexity . . . Not delays");
ribTextLeft.name = "Text_Ribbon_Left";
ribTextLeft.inPoint = 20.5;
ribTextLeft.outPoint = 24;

var rtlTD = ribTextLeft.property("ADBE Text Properties").property("ADBE Text Document");
var rtltd = rtlTD.value;
rtltd.resetCharStyle();
rtltd.fontSize = 28;
rtltd.fillColor = WHITE;
rtltd.font = "Montserrat-Light";
rtlTD.setValue(rtltd);

ribTextLeft.property("ADBE Transform Group").property("ADBE Position").setValue([500, 900]);
ribTextLeft.property("ADBE Transform Group").property("ADBE Rotate Z").setValue(-30);

var rtlOp = ribTextLeft.property("ADBE Transform Group").property("ADBE Opacity");
rtlOp.setValueAtTime(21.0, 0);
rtlOp.setValueAtTime(21.5, 100);
setSmooth(rtlOp, 1);
setSmooth(rtlOp, 2);

// ============================================================================
// 4. TEXT ON RIBBON (BOTTOM)
// ============================================================================
var ribTextBottom = mainComp.layers.addText("Just performance and results");
ribTextBottom.name = "Text_Ribbon_Bottom";
ribTextBottom.inPoint = 21;
ribTextBottom.outPoint = 24;

var rtbTD = ribTextBottom.property("ADBE Text Properties").property("ADBE Text Document");
var rtbtd = rtbTD.value;
rtbtd.resetCharStyle();
rtbtd.fontSize = 28;
rtbtd.fillColor = WHITE;
rtbtd.font = "Montserrat-Light";
rtbTD.setValue(rtbtd);

ribTextBottom.property("ADBE Transform Group").property("ADBE Position").setValue([1800, 1700]);
ribTextBottom.property("ADBE Transform Group").property("ADBE Rotate Z").setValue(-5);

var rtbOp = ribTextBottom.property("ADBE Transform Group").property("ADBE Opacity");
rtbOp.setValueAtTime(21.5, 0);
rtbOp.setValueAtTime(22.0, 100);
setSmooth(rtbOp, 1);
setSmooth(rtbOp, 2);

// ============================================================================
// 5. DOODLE FACES
// ============================================================================
if (doodleFace1) {
    var df1 = mainComp.layers.add(doodleFace1);
    df1.name = "Doodle_Face_Near_Ribbon_1";
    df1.inPoint = 20;
    df1.outPoint = 24;
    df1.property("ADBE Transform Group").property("ADBE Position").setValue([700, 600]);
    df1.property("ADBE Transform Group").property("ADBE Transform Scale").setValue([60, 60, 100]);
    df1.property("ADBE Transform Group").property("ADBE Position").expression =
        "[value[0], value[1] + Math.sin(time*1.5)*8]";
}

if (doodleFace2) {
    var df2 = mainComp.layers.add(doodleFace2);
    df2.name = "Doodle_Face_Near_Ribbon_2";
    df2.inPoint = 20;
    df2.outPoint = 24;
    df2.property("ADBE Transform Group").property("ADBE Position").setValue([3100, 1500]);
    df2.property("ADBE Transform Group").property("ADBE Transform Scale").setValue([70, 70, 100]);
    df2.property("ADBE Transform Group").property("ADBE Position").expression =
        "[value[0], value[1] + Math.cos(time*1.2)*10]";
}

// Third doodle near bottom
if (doodleFace1) {
    var df3 = mainComp.layers.add(doodleFace1);
    df3.name = "Doodle_Face_Near_Ribbon_3";
    df3.inPoint = 20.5;
    df3.outPoint = 24;
    df3.property("ADBE Transform Group").property("ADBE Position").setValue([2200, 1950]);
    df3.property("ADBE Transform Group").property("ADBE Transform Scale").setValue([50, 50, 100]);
    df3.property("ADBE Transform Group").property("ADBE Position").expression =
        "[value[0] + Math.sin(time*0.8)*6, value[1] + Math.cos(time*1.3)*7]";
}

// ============================================================================
// 6. ASTERISK ICON (near bottom-right)
// ============================================================================
var ribAst = mainComp.layers.add(asteriskComp);
ribAst.name = "Asterisk_Scene7";
ribAst.inPoint = 19;
ribAst.outPoint = 24;
ribAst.property("ADBE Transform Group").property("ADBE Position").setValue([3000, 1600]);
ribAst.property("ADBE Transform Group").property("ADBE Transform Scale").setValue([25, 25, 100]);

ribAst.property("ADBE Transform Group").property("ADBE Position").expression =
    "[value[0], value[1] + Math.sin(time*2)*6]";

// Move footage to back
footage2.moveToEnd();

app.endUndoGroup();
alert("06_scene_ribbon_footage.jsx complete!\nScene 7 (0:19 – 0:24) built.\nRun 07_scene_dashboard.jsx next.");
