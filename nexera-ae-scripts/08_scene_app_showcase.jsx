#target aftereffects

/*******************************************************************************
 * 08_scene_app_showcase.jsx
 * Scene 9: Tablet/App UI showcase (0:29 – 0:33)
 * Features: dark bg with subtle grid, 3D tablet frame with oscillating rotation,
 *           simplified app dashboard inside, "Smart layouts" text with border.
 ******************************************************************************/

app.beginUndoGroup("Scene 9 - App Showcase");

// ============================================================================
// COLOR PALETTE
// ============================================================================
var DARK_BG_2    = [6/255, 18/255, 48/255];
var BRAND_BLUE   = [49/255, 93/255, 234/255];
var LIGHT_BLUE   = [91/255, 138/255, 255/255];
var GLOW_BLUE    = [123/255, 164/255, 255/255];
var WHITE        = [1, 1, 1];
var PALE_BLUE    = [160/255, 180/255, 212/255];
var CARD_BG      = [17/255, 27/255, 58/255];
var CARD_BORDER  = [30/255, 46/255, 90/255];

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

var folderComps = null;
for (var f = 1; f <= app.project.numItems; f++) {
    if (app.project.item(f) instanceof FolderItem && app.project.item(f).name === "01_Comps") {
        folderComps = app.project.item(f);
        break;
    }
}

// ============================================================================
// 1. SUBTLE GRID LINES (dark bg decoration)
// ============================================================================
var gridLines = mainComp.layers.addShape();
gridLines.name = "Grid_Lines_Scene9";
gridLines.inPoint = 29;
gridLines.outPoint = 33;

var glRoot = gridLines.property("ADBE Root Vectors Group");

// Create horizontal lines
for (var gl = 0; gl < 12; gl++) {
    var lineGrp = glRoot.addProperty("ADBE Vector Group");
    var lineC = lineGrp.property("ADBE Vectors Group");
    var linePath = lineC.addProperty("ADBE Vector Shape - Group");
    var lineShape = new Shape();
    var yPos = gl * 200;
    lineShape.vertices = [[0, yPos], [COMP_WIDTH, yPos]];
    lineShape.inTangents = [[0,0],[0,0]];
    lineShape.outTangents = [[0,0],[0,0]];
    lineShape.closed = false;
    linePath.property("ADBE Vector Shape").setValue(lineShape);
    var lineStroke = lineC.addProperty("ADBE Vector Graphic - Stroke");
    lineStroke.property("ADBE Vector Stroke Color").setValue([BRAND_BLUE[0], BRAND_BLUE[1], BRAND_BLUE[2], 1]);
    lineStroke.property("ADBE Vector Stroke Width").setValue(1);
    lineStroke.property("ADBE Vector Stroke Opacity").setValue(8);
}

// Create vertical lines
for (var vl = 0; vl < 20; vl++) {
    var vLineGrp = glRoot.addProperty("ADBE Vector Group");
    var vLineC = vLineGrp.property("ADBE Vectors Group");
    var vLinePath = vLineC.addProperty("ADBE Vector Shape - Group");
    var vLineShape = new Shape();
    var xPos = vl * 200;
    vLineShape.vertices = [[xPos, 0], [xPos, COMP_HEIGHT]];
    vLineShape.inTangents = [[0,0],[0,0]];
    vLineShape.outTangents = [[0,0],[0,0]];
    vLineShape.closed = false;
    vLinePath.property("ADBE Vector Shape").setValue(vLineShape);
    var vLineStroke = vLineC.addProperty("ADBE Vector Graphic - Stroke");
    vLineStroke.property("ADBE Vector Stroke Color").setValue([BRAND_BLUE[0], BRAND_BLUE[1], BRAND_BLUE[2], 1]);
    vLineStroke.property("ADBE Vector Stroke Width").setValue(1);
    vLineStroke.property("ADBE Vector Stroke Opacity").setValue(8);
}

// ============================================================================
// 2. TABLET APP PRE-COMP (2800x1800)
// ============================================================================
var appComp = app.project.items.addComp("App_Dashboard_UI", 2800, 1800, 1, 10, 30);
if (folderComps) appComp.parentFolder = folderComps;

// Dark background fill
var appBG = appComp.layers.addSolid([DARK_BG_2[0], DARK_BG_2[1], DARK_BG_2[2]], "App_BG", 2800, 1800, 1, 10);

// Helper to create simple card
function createAppCard(comp, name, x, y, w, h) {
    var card = comp.layers.addShape();
    card.name = name;
    var cGrp = card.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
    var cC = cGrp.property("ADBE Vectors Group");
    var cRect = cC.addProperty("ADBE Vector Shape - Rect");
    cRect.property("ADBE Vector Rect Size").setValue([w, h]);
    cRect.property("ADBE Vector Rect Roundness").setValue(20);
    var cFill = cC.addProperty("ADBE Vector Graphic - Fill");
    cFill.property("ADBE Vector Fill Color").setValue([CARD_BG[0], CARD_BG[1], CARD_BG[2], 1]);
    var cStroke = cC.addProperty("ADBE Vector Graphic - Stroke");
    cStroke.property("ADBE Vector Stroke Color").setValue([CARD_BORDER[0], CARD_BORDER[1], CARD_BORDER[2], 1]);
    cStroke.property("ADBE Vector Stroke Width").setValue(1);
    card.property("ADBE Transform Group").property("ADBE Position").setValue([x, y]);
    return card;
}

function addAppText(comp, text, x, y, size, color, fontName) {
    var txt = comp.layers.addText(text);
    var tDoc = txt.property("ADBE Text Properties").property("ADBE Text Document");
    var td = tDoc.value;
    td.resetCharStyle();
    td.fontSize = size;
    td.fillColor = color;
    td.font = fontName || "Montserrat-Regular";
    td.justification = ParagraphJustification.LEFT_JUSTIFY;
    tDoc.setValue(td);
    txt.property("ADBE Transform Group").property("ADBE Position").setValue([x, y]);
    return txt;
}

// Navigation sidebar
createAppCard(appComp, "Sidebar", 120, 900, 200, 1700);
addAppText(appComp, "Dashboard", 50, 200, 18, WHITE, "Montserrat-Bold");
addAppText(appComp, "Analytics", 50, 250, 18, PALE_BLUE, "Montserrat-Light");
addAppText(appComp, "Projects", 50, 300, 18, PALE_BLUE, "Montserrat-Light");
addAppText(appComp, "Settings", 50, 350, 18, PALE_BLUE, "Montserrat-Light");

// Main content cards
createAppCard(appComp, "Card_Revenue", 700, 250, 500, 200);
addAppText(appComp, "Revenue", 500, 190, 20, PALE_BLUE, "Montserrat-Regular");
addAppText(appComp, "$42,580", 500, 240, 40, WHITE, "Montserrat-Bold");

createAppCard(appComp, "Card_Users", 1260, 250, 500, 200);
addAppText(appComp, "Active Users", 1060, 190, 20, PALE_BLUE, "Montserrat-Regular");
addAppText(appComp, "8,429", 1060, 240, 40, WHITE, "Montserrat-Bold");

createAppCard(appComp, "Card_Tasks", 1820, 250, 500, 200);
addAppText(appComp, "Tasks", 1620, 190, 20, PALE_BLUE, "Montserrat-Regular");
addAppText(appComp, "156", 1620, 240, 40, WHITE, "Montserrat-Bold");

// Large chart area
createAppCard(appComp, "Card_MainChart", 1100, 700, 1600, 500);
addAppText(appComp, "Performance Overview", 380, 500, 22, PALE_BLUE, "Montserrat-Regular");

// Chart bars
var barHeights = [180, 240, 160, 300, 220, 280, 200, 260, 190, 320, 250, 210];
for (var bh = 0; bh < 12; bh++) {
    var bar = appComp.layers.addShape();
    bar.name = "Chart_Bar_" + (bh+1);
    var barGrp = bar.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
    var barC = barGrp.property("ADBE Vectors Group");
    var barRect = barC.addProperty("ADBE Vector Shape - Rect");
    barRect.property("ADBE Vector Rect Size").setValue([60, barHeights[bh]]);
    barRect.property("ADBE Vector Rect Roundness").setValue(8);
    var barFill = barC.addProperty("ADBE Vector Graphic - Fill");
    if (bh % 3 === 0) {
        barFill.property("ADBE Vector Fill Color").setValue([BRAND_BLUE[0], BRAND_BLUE[1], BRAND_BLUE[2], 1]);
    } else {
        barFill.property("ADBE Vector Fill Color").setValue([LIGHT_BLUE[0], LIGHT_BLUE[1], LIGHT_BLUE[2], 1]);
        barFill.property("ADBE Vector Fill Opacity").setValue(60);
    }
    bar.property("ADBE Transform Group").property("ADBE Position").setValue([420 + bh * 120, 900 - barHeights[bh]/2]);
}

// Calendar card
createAppCard(appComp, "Card_AppCalendar", 1100, 1300, 800, 400);
addAppText(appComp, "Upcoming Events", 760, 1140, 20, PALE_BLUE, "Montserrat-Regular");
addAppText(appComp, "Team Meeting  •  2:00 PM", 760, 1200, 18, WHITE, "Montserrat-Regular");
addAppText(appComp, "Design Review  •  4:30 PM", 760, 1240, 18, WHITE, "Montserrat-Regular");

// Gauge card
createAppCard(appComp, "Card_Gauge", 1800, 1300, 600, 400);
addAppText(appComp, "Server Load", 1560, 1140, 20, PALE_BLUE, "Montserrat-Regular");
addAppText(appComp, "67%", 1720, 1310, 56, WHITE, "Montserrat-Bold");

// Gauge arc
var gauge = appComp.layers.addShape();
gauge.name = "Gauge_Arc";
var gaGrp = gauge.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
var gaC = gaGrp.property("ADBE Vectors Group");
var gaEll = gaC.addProperty("ADBE Vector Shape - Ellipse");
gaEll.property("ADBE Vector Ellipse Size").setValue([160, 160]);
var gaStroke = gaC.addProperty("ADBE Vector Graphic - Stroke");
gaStroke.property("ADBE Vector Stroke Color").setValue([BRAND_BLUE[0], BRAND_BLUE[1], BRAND_BLUE[2], 1]);
gaStroke.property("ADBE Vector Stroke Width").setValue(12);
var gaTrim = gaC.addProperty("ADBE Vector Filter - Trim");
gaTrim.property("ADBE Vector Trim Start").setValue(0);
gaTrim.property("ADBE Vector Trim End").setValue(67);
gauge.property("ADBE Transform Group").property("ADBE Position").setValue([1800, 1280]);

// ============================================================================
// 3. TABLET FRAME (rounded rect, stroke only, glow)
// ============================================================================
var tabletFrame = mainComp.layers.addShape();
tabletFrame.name = "Tablet_Frame";
tabletFrame.inPoint = 29;
tabletFrame.outPoint = 33;
tabletFrame.threeDLayer = true;

var tfGrp = tabletFrame.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
var tfC = tfGrp.property("ADBE Vectors Group");
var tfRect = tfC.addProperty("ADBE Vector Shape - Rect");
tfRect.property("ADBE Vector Rect Size").setValue([2900, 1900]);
tfRect.property("ADBE Vector Rect Roundness").setValue(48);
var tfStroke = tfC.addProperty("ADBE Vector Graphic - Stroke");
tfStroke.property("ADBE Vector Stroke Color").setValue([LIGHT_BLUE[0], LIGHT_BLUE[1], LIGHT_BLUE[2], 1]);
tfStroke.property("ADBE Vector Stroke Width").setValue(4);

tabletFrame.property("ADBE Transform Group").property("ADBE Position").setValue([COMP_WIDTH / 2, COMP_HEIGHT / 2, 0]);

// Glow
var tfGlow = tabletFrame.property("ADBE Effect Parade").addProperty("ADBE Glo2");
tfGlow.property("ADBE Glo2-0002").setValue(20);
tfGlow.property("ADBE Glo2-0003").setValue(0.8);

// Gentle Y rotation oscillation expression
tabletFrame.property("ADBE Transform Group").property("ADBE Rotate Y").expression =
    "Math.sin((time - 29) * 0.8) * 8";

// Scale entrance
var tfScale = tabletFrame.property("ADBE Transform Group").property("ADBE Transform Scale");
tfScale.setValueAtTime(29, [0, 0, 100]);
tfScale.setValueAtTime(29.5, [102, 102, 100]);
tfScale.setValueAtTime(29.7, [100, 100, 100]);
for (var ts = 1; ts <= 3; ts++) { setSmooth(tfScale, ts); }

// ============================================================================
// 4. APP DASHBOARD LAYER (inside tablet)
// ============================================================================
var appLayer = mainComp.layers.add(appComp);
appLayer.name = "App_Dashboard_Layer";
appLayer.inPoint = 29;
appLayer.outPoint = 33;
appLayer.threeDLayer = true;

appLayer.property("ADBE Transform Group").property("ADBE Position").setValue([COMP_WIDTH / 2, COMP_HEIGHT / 2, 0]);
appLayer.property("ADBE Transform Group").property("ADBE Transform Scale").setValue([95, 95, 100]);

// Match tablet frame rotation
appLayer.property("ADBE Transform Group").property("ADBE Rotate Y").expression =
    "Math.sin((time - 29) * 0.8) * 8";

// Scale entrance matching frame
var appScale = appLayer.property("ADBE Transform Group").property("ADBE Transform Scale");
appScale.setValueAtTime(29, [0, 0, 100]);
appScale.setValueAtTime(29.5, [97, 97, 100]);
appScale.setValueAtTime(29.7, [95, 95, 100]);
for (var as = 1; as <= 3; as++) { setSmooth(appScale, as); }

// ============================================================================
// 5. TEXT: "Smart layouts" (end of scene)
// ============================================================================
// "Smart"
var smartText = mainComp.layers.addText("Smart");
smartText.name = "Text_Smart";
smartText.inPoint = 31.5;
smartText.outPoint = 33;

var smTD = smartText.property("ADBE Text Properties").property("ADBE Text Document");
var smtd = smTD.value;
smtd.resetCharStyle();
smtd.fontSize = 72;
smtd.fillColor = WHITE;
smtd.font = "Montserrat-Bold";
smtd.justification = ParagraphJustification.LEFT_JUSTIFY;
smTD.setValue(smtd);

smartText.property("ADBE Transform Group").property("ADBE Position").setValue([300, 1900]);

var smOp = smartText.property("ADBE Transform Group").property("ADBE Opacity");
smOp.setValueAtTime(31.5, 0);
smOp.setValueAtTime(31.8, 100);
setSmooth(smOp, 1); setSmooth(smOp, 2);

// "layouts"
var layoutsText = mainComp.layers.addText("layouts");
layoutsText.name = "Text_layouts";
layoutsText.inPoint = 31.8;
layoutsText.outPoint = 33;

var layTD = layoutsText.property("ADBE Text Properties").property("ADBE Text Document");
var laytd = layTD.value;
laytd.resetCharStyle();
laytd.fontSize = 72;
laytd.fillColor = PALE_BLUE;
laytd.font = "Montserrat-Light";
laytd.justification = ParagraphJustification.LEFT_JUSTIFY;
layTD.setValue(laytd);

layoutsText.property("ADBE Transform Group").property("ADBE Position").setValue([680, 1900]);

var layOp = layoutsText.property("ADBE Transform Group").property("ADBE Opacity");
layOp.setValueAtTime(31.8, 0);
layOp.setValueAtTime(32.1, 100);
setSmooth(layOp, 1); setSmooth(layOp, 2);

// Dashed border rect around text pair
var dashBorder = mainComp.layers.addShape();
dashBorder.name = "Smart_Layouts_Border";
dashBorder.inPoint = 32;
dashBorder.outPoint = 33;

var dbGrp = dashBorder.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
var dbC = dbGrp.property("ADBE Vectors Group");
var dbRect = dbC.addProperty("ADBE Vector Shape - Rect");
dbRect.property("ADBE Vector Rect Size").setValue([700, 100]);
dbRect.property("ADBE Vector Rect Roundness").setValue(12);
var dbStroke = dbC.addProperty("ADBE Vector Graphic - Stroke");
dbStroke.property("ADBE Vector Stroke Color").setValue([PALE_BLUE[0], PALE_BLUE[1], PALE_BLUE[2], 1]);
dbStroke.property("ADBE Vector Stroke Width").setValue(2);
dbStroke.property("ADBE Vector Stroke Dashes").addProperty("ADBE Vector Stroke Dash 1").setValue(10);
dbStroke.property("ADBE Vector Stroke Dashes").addProperty("ADBE Vector Stroke Gap 1").setValue(8);

dashBorder.property("ADBE Transform Group").property("ADBE Position").setValue([570, 1890]);

var dbOp = dashBorder.property("ADBE Transform Group").property("ADBE Opacity");
dbOp.setValueAtTime(32.0, 0);
dbOp.setValueAtTime(32.3, 60);
setSmooth(dbOp, 1); setSmooth(dbOp, 2);

// Move grid to back
gridLines.moveToEnd();

app.endUndoGroup();
alert("08_scene_app_showcase.jsx complete!\nScene 9 (0:29 – 0:33) built.\nRun 09_scene_clear_actions.jsx next.");
