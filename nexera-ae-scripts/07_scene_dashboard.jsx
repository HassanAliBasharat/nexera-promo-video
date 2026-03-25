#target aftereffects

/*******************************************************************************
 * 07_scene_dashboard.jsx
 * Scene 8: Dashboard UI showcase (0:24 – 0:29)
 * Features: Dark theme return, 3D-perspective dashboard pre-comp with 8 UI
 *           cards, assembly animation, floating asterisk, staggered text.
 ******************************************************************************/

app.beginUndoGroup("Scene 8 - Dashboard");

// ============================================================================
// COLOR PALETTE
// ============================================================================
var DARK_BG_1    = [10/255, 26/255, 61/255];
var DARK_BG_2    = [6/255, 18/255, 48/255];
var BRAND_BLUE   = [49/255, 93/255, 234/255];
var LIGHT_BLUE   = [91/255, 138/255, 255/255];
var GLOW_BLUE    = [123/255, 164/255, 255/255];
var WHITE        = [1, 1, 1];
var PALE_BLUE    = [160/255, 180/255, 212/255];
var DARK_TEXT    = [10/255, 26/255, 61/255];

var CARD_BG       = [17/255, 27/255, 58/255]; // #111B3A
var CARD_BORDER   = [30/255, 46/255, 90/255]; // #1E2E5A

var COMP_WIDTH  = 3840;
var COMP_HEIGHT = 2160;

function smoothEase() { return new KeyframeEase(0, 75); }
function setSmooth(prop, idx) {
    prop.setTemporalEaseAtKey(idx, [smoothEase()], [smoothEase()]);
}

// Find comps
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

var folderComps = null;
for (var f = 1; f <= app.project.numItems; f++) {
    if (app.project.item(f) instanceof FolderItem && app.project.item(f).name === "01_Comps") {
        folderComps = app.project.item(f);
        break;
    }
}

// ============================================================================
// 1. DARK BG (Scenes 8-10: 24–36)
// ============================================================================
var darkBG = mainComp.layers.add(darkBGComp);
darkBG.name = "Dark_BG_Scenes8-10";
darkBG.startTime = 24;
darkBG.inPoint = 24;
darkBG.outPoint = 36;

// Cross-fade: Light fades out is implied from previous scene ending at 24

// ============================================================================
// 2. BUILD DASHBOARD UI PRE-COMP (3200x2400)
// ============================================================================
var dashComp = app.project.items.addComp("Dashboard_UI", 3200, 2400, 1, 10, 30);
if (folderComps) dashComp.parentFolder = folderComps;

// Helper: create a card background
function createCard(comp, name, x, y, w, h, roundness) {
    var card = comp.layers.addShape();
    card.name = name;
    var cGrp = card.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
    var cC = cGrp.property("ADBE Vectors Group");
    var cRect = cC.addProperty("ADBE Vector Shape - Rect");
    cRect.property("ADBE Vector Rect Size").setValue([w, h]);
    cRect.property("ADBE Vector Rect Roundness").setValue(roundness || 24);
    var cFill = cC.addProperty("ADBE Vector Graphic - Fill");
    cFill.property("ADBE Vector Fill Color").setValue([CARD_BG[0], CARD_BG[1], CARD_BG[2], 1]);
    var cStroke = cC.addProperty("ADBE Vector Graphic - Stroke");
    cStroke.property("ADBE Vector Stroke Color").setValue([CARD_BORDER[0], CARD_BORDER[1], CARD_BORDER[2], 1]);
    cStroke.property("ADBE Vector Stroke Width").setValue(1);
    card.property("ADBE Transform Group").property("ADBE Position").setValue([x, y]);
    return card;
}

// Helper: add text to comp
function addCardText(comp, text, x, y, size, color, fontName) {
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

// --- CARD 1: Welcome / Login (top-left) ---
createCard(dashComp, "Card_Welcome", 360, 280, 640, 400, 24);
addCardText(dashComp, "Hi,", 120, 140, 40, WHITE, "Montserrat-Regular");
addCardText(dashComp, "Welcome back.", 120, 200, 48, WHITE, "Montserrat-Bold");

// Input fields (dark rects with blue left border)
var inputField1 = dashComp.layers.addShape();
inputField1.name = "Input_Email";
var if1Grp = inputField1.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
var if1C = if1Grp.property("ADBE Vectors Group");
var if1Rect = if1C.addProperty("ADBE Vector Shape - Rect");
if1Rect.property("ADBE Vector Rect Size").setValue([520, 48]);
if1Rect.property("ADBE Vector Rect Roundness").setValue(8);
var if1Fill = if1C.addProperty("ADBE Vector Graphic - Fill");
if1Fill.property("ADBE Vector Fill Color").setValue([DARK_BG_2[0], DARK_BG_2[1], DARK_BG_2[2], 1]);
inputField1.property("ADBE Transform Group").property("ADBE Position").setValue([360, 270]);

addCardText(dashComp, "email@example.com", 140, 278, 18, PALE_BLUE, "Montserrat-Light");

var inputField2 = dashComp.layers.addShape();
inputField2.name = "Input_Password";
var if2Grp = inputField2.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
var if2C = if2Grp.property("ADBE Vectors Group");
var if2Rect = if2C.addProperty("ADBE Vector Shape - Rect");
if2Rect.property("ADBE Vector Rect Size").setValue([520, 48]);
if2Rect.property("ADBE Vector Rect Roundness").setValue(8);
var if2Fill = if2C.addProperty("ADBE Vector Graphic - Fill");
if2Fill.property("ADBE Vector Fill Color").setValue([DARK_BG_2[0], DARK_BG_2[1], DARK_BG_2[2], 1]);
inputField2.property("ADBE Transform Group").property("ADBE Position").setValue([360, 340]);

addCardText(dashComp, "••••••••", 140, 348, 18, PALE_BLUE, "Montserrat-Light");

// Login button
var loginBtn = dashComp.layers.addShape();
loginBtn.name = "Login_Button";
var lbGrp = loginBtn.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
var lbC = lbGrp.property("ADBE Vectors Group");
var lbRect = lbC.addProperty("ADBE Vector Shape - Rect");
lbRect.property("ADBE Vector Rect Size").setValue([200, 48]);
lbRect.property("ADBE Vector Rect Roundness").setValue(24);
var lbFill = lbC.addProperty("ADBE Vector Graphic - Fill");
lbFill.property("ADBE Vector Fill Color").setValue([BRAND_BLUE[0], BRAND_BLUE[1], BRAND_BLUE[2], 1]);
loginBtn.property("ADBE Transform Group").property("ADBE Position").setValue([360, 420]);
addCardText(dashComp, "Login", 330, 428, 24, WHITE, "Montserrat-Bold");

// --- CARD 2: Chart (center) ---
createCard(dashComp, "Card_Chart", 1200, 500, 800, 500, 24);
addCardText(dashComp, "graphic update", 860, 310, 24, PALE_BLUE, "Montserrat-Regular");

// Line chart (simplified curved path)
var chartLine = dashComp.layers.addShape();
chartLine.name = "Chart_Line";
var clGrp = chartLine.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
var clC = clGrp.property("ADBE Vectors Group");
var clPath = clC.addProperty("ADBE Vector Shape - Group");
var chartShape = new Shape();
chartShape.vertices = [
    [860, 650], [950, 580], [1050, 520], [1150, 400], [1250, 450], [1400, 500], [1520, 620]
];
chartShape.inTangents = [[0,0],[-30,20],[-30,20],[-40,40],[-30,-20],[-50,-10],[-40,-30]];
chartShape.outTangents = [[30,-20],[30,-20],[40,-40],[40,20],[50,10],[40,30],[0,0]];
chartShape.closed = false;
clPath.property("ADBE Vector Shape").setValue(chartShape);
var clStroke = clC.addProperty("ADBE Vector Graphic - Stroke");
clStroke.property("ADBE Vector Stroke Color").setValue([LIGHT_BLUE[0], LIGHT_BLUE[1], LIGHT_BLUE[2], 1]);
clStroke.property("ADBE Vector Stroke Width").setValue(3);

addCardText(dashComp, "100k", 1120, 385, 20, WHITE, "Montserrat-Bold");

// Bottom stats row
addCardText(dashComp, "1250k    210k    764k    250k", 880, 710, 20, PALE_BLUE, "Montserrat-Light");

// --- CARD 3: Profile (top-right) ---
createCard(dashComp, "Card_Profile", 1800, 380, 400, 600, 24);

// Avatar circle
var avatar = dashComp.layers.addShape();
avatar.name = "Profile_Avatar";
var avGrp = avatar.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
var avC = avGrp.property("ADBE Vectors Group");
var avEll = avC.addProperty("ADBE Vector Shape - Ellipse");
avEll.property("ADBE Vector Ellipse Size").setValue([120, 120]);
var avFill = avC.addProperty("ADBE Vector Graphic - Fill");
avFill.property("ADBE Vector Fill Color").setValue([BRAND_BLUE[0], BRAND_BLUE[1], BRAND_BLUE[2], 1]);
avatar.property("ADBE Transform Group").property("ADBE Position").setValue([1800, 220]);

addCardText(dashComp, "Adam Suley", 1720, 310, 28, WHITE, "Montserrat-Bold");
addCardText(dashComp, "UI/UX Designer", 1725, 345, 20, PALE_BLUE, "Montserrat-Light");

// Follow button
var followBtn = dashComp.layers.addShape();
followBtn.name = "Follow_Button";
var fbGrp = followBtn.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
var fbC = fbGrp.property("ADBE Vectors Group");
var fbRect = fbC.addProperty("ADBE Vector Shape - Rect");
fbRect.property("ADBE Vector Rect Size").setValue([140, 40]);
fbRect.property("ADBE Vector Rect Roundness").setValue(20);
var fbFill = fbC.addProperty("ADBE Vector Graphic - Fill");
fbFill.property("ADBE Vector Fill Color").setValue([BRAND_BLUE[0], BRAND_BLUE[1], BRAND_BLUE[2], 1]);
followBtn.property("ADBE Transform Group").property("ADBE Position").setValue([1740, 400]);
addCardText(dashComp, "follow", 1710, 408, 18, WHITE, "Montserrat-Bold");

// Message button (stroke only)
var msgBtn = dashComp.layers.addShape();
msgBtn.name = "Message_Button";
var mbGrp = msgBtn.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
var mbC = mbGrp.property("ADBE Vectors Group");
var mbRect = mbC.addProperty("ADBE Vector Shape - Rect");
mbRect.property("ADBE Vector Rect Size").setValue([140, 40]);
mbRect.property("ADBE Vector Rect Roundness").setValue(20);
var mbStroke = mbC.addProperty("ADBE Vector Graphic - Stroke");
mbStroke.property("ADBE Vector Stroke Color").setValue([LIGHT_BLUE[0], LIGHT_BLUE[1], LIGHT_BLUE[2], 1]);
mbStroke.property("ADBE Vector Stroke Width").setValue(2);
msgBtn.property("ADBE Transform Group").property("ADBE Position").setValue([1900, 400]);
addCardText(dashComp, "message", 1860, 408, 18, [LIGHT_BLUE[0], LIGHT_BLUE[1], LIGHT_BLUE[2]], "Montserrat-Regular");

// --- CARD 4: Highlights (top-center) ---
createCard(dashComp, "Card_Highlights", 1080, 80, 600, 160, 24);
// 5 avatar circles in a row
for (var h = 0; h < 5; h++) {
    var highCirc = dashComp.layers.addShape();
    highCirc.name = "Highlight_Avatar_" + (h+1);
    var hcGrp = highCirc.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
    var hcC = hcGrp.property("ADBE Vectors Group");
    var hcEll = hcC.addProperty("ADBE Vector Shape - Ellipse");
    hcEll.property("ADBE Vector Ellipse Size").setValue([60, 60]);
    var hcFill = hcC.addProperty("ADBE Vector Graphic - Fill");
    var hue = [
        [BRAND_BLUE[0], BRAND_BLUE[1], BRAND_BLUE[2], 1],
        [LIGHT_BLUE[0], LIGHT_BLUE[1], LIGHT_BLUE[2], 1],
        [GLOW_BLUE[0], GLOW_BLUE[1], GLOW_BLUE[2], 1],
        [BRAND_BLUE[0], BRAND_BLUE[1], BRAND_BLUE[2], 1],
        [LIGHT_BLUE[0], LIGHT_BLUE[1], LIGHT_BLUE[2], 1]
    ];
    hcFill.property("ADBE Vector Fill Color").setValue(hue[h]);
    highCirc.property("ADBE Transform Group").property("ADBE Position").setValue([860 + h * 100, 80]);
}

// --- CARD 5: Pie Chart (right) ---
createCard(dashComp, "Card_PieChart", 2200, 300, 360, 400, 24);
addCardText(dashComp, "Light Intensity", 2070, 160, 22, PALE_BLUE, "Montserrat-Regular");

// Donut arcs
var donut1 = dashComp.layers.addShape();
donut1.name = "Donut_Arc_1";
var d1Grp = donut1.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
var d1C = d1Grp.property("ADBE Vectors Group");
var d1Ell = d1C.addProperty("ADBE Vector Shape - Ellipse");
d1Ell.property("ADBE Vector Ellipse Size").setValue([200, 200]);
var d1Stroke = d1C.addProperty("ADBE Vector Graphic - Stroke");
d1Stroke.property("ADBE Vector Stroke Color").setValue([BRAND_BLUE[0], BRAND_BLUE[1], BRAND_BLUE[2], 1]);
d1Stroke.property("ADBE Vector Stroke Width").setValue(30);
var d1Trim = d1C.addProperty("ADBE Vector Filter - Trim");
d1Trim.property("ADBE Vector Trim Start").setValue(0);
d1Trim.property("ADBE Vector Trim End").setValue(65);
donut1.property("ADBE Transform Group").property("ADBE Position").setValue([2200, 350]);

var donut2 = dashComp.layers.addShape();
donut2.name = "Donut_Arc_2";
var d2Grp = donut2.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
var d2C = d2Grp.property("ADBE Vectors Group");
var d2Ell = d2C.addProperty("ADBE Vector Shape - Ellipse");
d2Ell.property("ADBE Vector Ellipse Size").setValue([200, 200]);
var d2Stroke = d2C.addProperty("ADBE Vector Graphic - Stroke");
d2Stroke.property("ADBE Vector Stroke Color").setValue([LIGHT_BLUE[0], LIGHT_BLUE[1], LIGHT_BLUE[2], 1]);
d2Stroke.property("ADBE Vector Stroke Width").setValue(30);
var d2Trim = d2C.addProperty("ADBE Vector Filter - Trim");
d2Trim.property("ADBE Vector Trim Start").setValue(65);
d2Trim.property("ADBE Vector Trim End").setValue(100);
donut2.property("ADBE Transform Group").property("ADBE Position").setValue([2200, 350]);

// --- CARD 6: Calendar (bottom-center) ---
createCard(dashComp, "Card_Calendar", 1200, 1000, 500, 300, 24);
addCardText(dashComp, "schedule", 1000, 890, 22, PALE_BLUE, "Montserrat-Regular");
addCardText(dashComp, "July 2021", 1000, 925, 20, WHITE, "Montserrat-Bold");
addCardText(dashComp, "5    6    7    8    9    10    11", 1000, 980, 24, PALE_BLUE, "Montserrat-Light");

// Highlight circle on "7"
var calHighlight = dashComp.layers.addShape();
calHighlight.name = "Calendar_Highlight";
var chGrp = calHighlight.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
var chC = chGrp.property("ADBE Vectors Group");
var chEll = chC.addProperty("ADBE Vector Shape - Ellipse");
chEll.property("ADBE Vector Ellipse Size").setValue([40, 40]);
var chFill = chC.addProperty("ADBE Vector Graphic - Fill");
chFill.property("ADBE Vector Fill Color").setValue([BRAND_BLUE[0], BRAND_BLUE[1], BRAND_BLUE[2], 1]);
calHighlight.property("ADBE Transform Group").property("ADBE Position").setValue([1112, 975]);

// --- CARD 7: Chat (bottom-left) ---
createCard(dashComp, "Card_Chat", 360, 900, 400, 400, 24);
addCardText(dashComp, "Messages", 210, 740, 22, PALE_BLUE, "Montserrat-Regular");

// Chat bubbles
var bubbleColors = [CARD_BORDER, BRAND_BLUE, CARD_BORDER];
var bubbleY = [800, 860, 920];
var bubbleW = [280, 200, 240];
for (var b = 0; b < 3; b++) {
    var bubble = dashComp.layers.addShape();
    bubble.name = "Chat_Bubble_" + (b+1);
    var bGrp = bubble.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
    var bC = bGrp.property("ADBE Vectors Group");
    var bRect = bC.addProperty("ADBE Vector Shape - Rect");
    bRect.property("ADBE Vector Rect Size").setValue([bubbleW[b], 40]);
    bRect.property("ADBE Vector Rect Roundness").setValue(20);
    var bFill = bC.addProperty("ADBE Vector Graphic - Fill");
    bFill.property("ADBE Vector Fill Color").setValue([bubbleColors[b][0], bubbleColors[b][1], bubbleColors[b][2], 1]);
    bubble.property("ADBE Transform Group").property("ADBE Position").setValue([
        b === 1 ? 420 : 320, bubbleY[b]
    ]);
}

// --- CARD 8: Air Widget (right-center) ---
createCard(dashComp, "Card_Air", 2200, 800, 320, 200, 24);
addCardText(dashComp, "Air", 2090, 740, 22, PALE_BLUE, "Montserrat-Regular");
addCardText(dashComp, "10°C", 2100, 830, 64, WHITE, "Montserrat-Bold");

// ============================================================================
// 3. PLACE DASHBOARD IN MASTER COMP (3D perspective)
// ============================================================================
var dashLayer = mainComp.layers.add(dashComp);
dashLayer.name = "Dashboard_UI_Layer";
dashLayer.inPoint = 24;
dashLayer.outPoint = 29;
dashLayer.threeDLayer = true;

// 3D orientation (isometric tilt)
dashLayer.property("ADBE Transform Group").property("ADBE Orientation").setValue([15, -15, 0]);
dashLayer.property("ADBE Transform Group").property("ADBE Position").setValue([COMP_WIDTH / 2, COMP_HEIGHT / 2, 0]);

// Assembly animation: scale 30% -> 100%
var dashScale = dashLayer.property("ADBE Transform Group").property("ADBE Transform Scale");
dashScale.setValueAtTime(24.0, [30, 30, 30]);
dashScale.setValueAtTime(24.7, [100, 100, 100]);
setSmooth(dashScale, 1);
setSmooth(dashScale, 2);

var dashOp = dashLayer.property("ADBE Transform Group").property("ADBE Opacity");
dashOp.setValueAtTime(24.0, 0);
dashOp.setValueAtTime(24.7, 100);
setSmooth(dashOp, 1);
setSmooth(dashOp, 2);

// Slow drift
var dashPos = dashLayer.property("ADBE Transform Group").property("ADBE Position");
dashPos.setValueAtTime(28.0, [COMP_WIDTH / 2, COMP_HEIGHT / 2, 0]);
dashPos.setValueAtTime(29.0, [COMP_WIDTH / 2 + 50, COMP_HEIGHT / 2 - 30, 0]);

// ============================================================================
// 4. FLOATING ASTERISK
// ============================================================================
var dashAst = mainComp.layers.add(asteriskComp);
dashAst.name = "Asterisk_Dashboard";
dashAst.inPoint = 24;
dashAst.outPoint = 29;
dashAst.property("ADBE Transform Group").property("ADBE Position").setValue([2800, 500]);
dashAst.property("ADBE Transform Group").property("ADBE Transform Scale").setValue([40, 40, 100]);
dashAst.property("ADBE Transform Group").property("ADBE Position").expression =
    "var t = time - 24;" +
    "[value[0] + Math.sin(t*0.8)*40, value[1] + Math.cos(t*0.6)*30]";

var dashAstGlow = dashAst.property("ADBE Effect Parade").addProperty("ADBE Glo2");
dashAstGlow.property("ADBE Glo2-0002").setValue(25);
dashAstGlow.property("ADBE Glo2-0003").setValue(1.0);

// ============================================================================
// 5. TEXT: "Design shapes the journey" (staggered words at 0:28)
// ============================================================================
// "Design"
var designText = mainComp.layers.addText("Design");
designText.name = "Text_Design";
designText.inPoint = 27.5;
designText.outPoint = 29;

var desTD = designText.property("ADBE Text Properties").property("ADBE Text Document");
var destd = desTD.value;
destd.resetCharStyle();
destd.fontSize = 96;
destd.fillColor = WHITE;
destd.font = "Montserrat-Light";
destd.justification = ParagraphJustification.LEFT_JUSTIFY;
desTD.setValue(destd);

designText.property("ADBE Transform Group").property("ADBE Position").setValue([400, 1700]);

var desOp = designText.property("ADBE Transform Group").property("ADBE Opacity");
desOp.setValueAtTime(28.0, 0);
desOp.setValueAtTime(28.3, 100);
setSmooth(desOp, 1); setSmooth(desOp, 2);

var desPos = designText.property("ADBE Transform Group").property("ADBE Position");
desPos.setValueAtTime(28.0, [400, 1760]);
desPos.setValueAtTime(28.3, [400, 1700]);
setSmooth(desPos, 1); setSmooth(desPos, 2);

// "shapes"
var shapesText = mainComp.layers.addText("shapes");
shapesText.name = "Text_shapes";
shapesText.inPoint = 27.8;
shapesText.outPoint = 29;

var shTD = shapesText.property("ADBE Text Properties").property("ADBE Text Document");
var shtd = shTD.value;
shtd.resetCharStyle();
shtd.fontSize = 104;
shtd.fillColor = [BRAND_BLUE[0], BRAND_BLUE[1], BRAND_BLUE[2]];
shtd.font = "Montserrat-Bold";
shtd.justification = ParagraphJustification.LEFT_JUSTIFY;
shTD.setValue(shtd);

shapesText.property("ADBE Transform Group").property("ADBE Position").setValue([800, 1700]);

var shOp = shapesText.property("ADBE Transform Group").property("ADBE Opacity");
shOp.setValueAtTime(28.3, 0);
shOp.setValueAtTime(28.6, 100);
setSmooth(shOp, 1); setSmooth(shOp, 2);

var shPos = shapesText.property("ADBE Transform Group").property("ADBE Position");
shPos.setValueAtTime(28.3, [800, 1760]);
shPos.setValueAtTime(28.6, [800, 1700]);
setSmooth(shPos, 1); setSmooth(shPos, 2);

// "the journey"
var journeyText = mainComp.layers.addText("the journey");
journeyText.name = "Text_the_journey";
journeyText.inPoint = 28;
journeyText.outPoint = 29;

var jTD = journeyText.property("ADBE Text Properties").property("ADBE Text Document");
var jtd = jTD.value;
jtd.resetCharStyle();
jtd.fontSize = 96;
jtd.fillColor = WHITE;
jtd.font = "Montserrat-Light";
jtd.justification = ParagraphJustification.LEFT_JUSTIFY;
jTD.setValue(jtd);

journeyText.property("ADBE Transform Group").property("ADBE Position").setValue([1500, 1700]);

var jOp = journeyText.property("ADBE Transform Group").property("ADBE Opacity");
jOp.setValueAtTime(28.5, 0);
jOp.setValueAtTime(28.8, 100);
setSmooth(jOp, 1); setSmooth(jOp, 2);

var jPos = journeyText.property("ADBE Transform Group").property("ADBE Position");
jPos.setValueAtTime(28.5, [1500, 1760]);
jPos.setValueAtTime(28.8, [1500, 1700]);
setSmooth(jPos, 1); setSmooth(jPos, 2);

// Asterisk icon next to "journey"
var journeyAst = mainComp.layers.add(asteriskComp);
journeyAst.name = "Asterisk_Journey";
journeyAst.inPoint = 28.5;
journeyAst.outPoint = 29;
journeyAst.property("ADBE Transform Group").property("ADBE Position").setValue([2500, 1680]);
journeyAst.property("ADBE Transform Group").property("ADBE Transform Scale").setValue([20, 20, 100]);

var jaOp = journeyAst.property("ADBE Transform Group").property("ADBE Opacity");
jaOp.setValueAtTime(28.5, 0);
jaOp.setValueAtTime(28.8, 100);

// Move dark BG to back
darkBG.moveToEnd();

app.endUndoGroup();
alert("07_scene_dashboard.jsx complete!\nScene 8 (0:24 – 0:29) built.\nRun 08_scene_app_showcase.jsx next.");
