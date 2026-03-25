#target aftereffects

/*******************************************************************************
 * 11_scene_closing.jsx
 * Scenes 13-14: "It's how it works" + "Ready to grow?" + branding (0:42 – 0:47)
 * Features: flash to light theme, highlight marker wipe, staggered branding
 *           elements, asterisk icon, NEXERA logo text, tagline.
 ******************************************************************************/

app.beginUndoGroup("Scenes 13-14 - Closing");

// ============================================================================
// COLOR PALETTE
// ============================================================================
var BRAND_BLUE   = [49/255, 93/255, 234/255];
var LIGHT_BLUE   = [91/255, 138/255, 255/255];
var GLOW_BLUE    = [123/255, 164/255, 255/255];
var WHITE        = [1, 1, 1];
var DARK_TEXT    = [10/255, 26/255, 61/255];
var LIGHT_BG_1   = [240/255, 244/255, 255/255];

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
// 1. FLASH TRANSITION TO LIGHT THEME
// ============================================================================
var flashLight = mainComp.layers.addSolid([1, 1, 1], "Flash_To_Light_Closing", COMP_WIDTH, COMP_HEIGHT, 1, 1);
flashLight.startTime = 41.5;
flashLight.inPoint = 41.5;
flashLight.outPoint = 42.5;

var flOp = flashLight.property("ADBE Transform Group").property("ADBE Opacity");
flOp.setValueAtTime(41.8, 0);
flOp.setValueAtTime(42.0, 100);
flOp.setValueAtTime(42.3, 0);
for (var fl = 1; fl <= 3; fl++) { setSmooth(flOp, fl); }

// ============================================================================
// 2. LIGHT BG (42–47)
// ============================================================================
var lightBG = mainComp.layers.add(lightBGComp);
lightBG.name = "Light_BG_Closing";
lightBG.startTime = 42;
lightBG.inPoint = 42;
lightBG.outPoint = 47;

// ============================================================================
// SCENE 13: "It's how it works" (0:42–0:44)
// ============================================================================

// "It's how it" — light, dark text
var itsText = mainComp.layers.addText("It's how it");
itsText.name = "Text_Its_how_it";
itsText.inPoint = 42;
itsText.outPoint = 44;

var itsTD = itsText.property("ADBE Text Properties").property("ADBE Text Document");
var itstd = itsTD.value;
itstd.resetCharStyle();
itstd.fontSize = 96;
itstd.fillColor = [DARK_TEXT[0], DARK_TEXT[1], DARK_TEXT[2]];
itstd.font = "Montserrat-Light";
itstd.justification = ParagraphJustification.CENTER_JUSTIFY;
itsTD.setValue(itstd);

itsText.property("ADBE Transform Group").property("ADBE Position").setValue([COMP_WIDTH / 2, 1000]);

var itsOp = itsText.property("ADBE Transform Group").property("ADBE Opacity");
itsOp.setValueAtTime(42.2, 0);
itsOp.setValueAtTime(42.5, 100);
setSmooth(itsOp, 1); setSmooth(itsOp, 2);

// "works" with blue highlight marker behind it
var worksHighlight = mainComp.layers.addShape();
worksHighlight.name = "Works_Highlight_BG";
worksHighlight.inPoint = 42;
worksHighlight.outPoint = 44;

var whGrp = worksHighlight.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
var whC = whGrp.property("ADBE Vectors Group");
var whRect = whC.addProperty("ADBE Vector Shape - Rect");
whRect.property("ADBE Vector Rect Size").setValue([320, 110]);
whRect.property("ADBE Vector Rect Roundness").setValue(12);
var whFill = whC.addProperty("ADBE Vector Graphic - Fill");
whFill.property("ADBE Vector Fill Color").setValue([BRAND_BLUE[0], BRAND_BLUE[1], BRAND_BLUE[2], 1]);
whFill.property("ADBE Vector Fill Opacity").setValue(85);

worksHighlight.property("ADBE Transform Group").property("ADBE Position").setValue([COMP_WIDTH / 2, 1130]);

// Wipe animation (scaleX 0 -> 100)
var whScale = worksHighlight.property("ADBE Transform Group").property("ADBE Transform Scale");
whScale.setValueAtTime(42.7, [0, 100, 100]);
whScale.setValueAtTime(43.1, [100, 100, 100]);
setSmooth(whScale, 1); setSmooth(whScale, 2);

// "works" text (dark on highlight)
var worksText = mainComp.layers.addText("works");
worksText.name = "Text_works";
worksText.inPoint = 42;
worksText.outPoint = 44;

var wkTD = worksText.property("ADBE Text Properties").property("ADBE Text Document");
var wktd = wkTD.value;
wktd.resetCharStyle();
wktd.fontSize = 104;
wktd.fillColor = WHITE;
wktd.font = "Montserrat-Bold";
wktd.justification = ParagraphJustification.CENTER_JUSTIFY;
wkTD.setValue(wktd);

worksText.property("ADBE Transform Group").property("ADBE Position").setValue([COMP_WIDTH / 2, 1130]);

var wkOp = worksText.property("ADBE Transform Group").property("ADBE Opacity");
wkOp.setValueAtTime(42.7, 0);
wkOp.setValueAtTime(43.0, 100);
setSmooth(wkOp, 1); setSmooth(wkOp, 2);

// ============================================================================
// Transition between scenes 13 and 14
// ============================================================================
// Fade out scene 13 elements at 43.5-44
var s13Layers = [itsText, worksHighlight, worksText];
for (var s = 0; s < s13Layers.length; s++) {
    var s13Op = s13Layers[s].property("ADBE Transform Group").property("ADBE Opacity");
    s13Op.setValueAtTime(43.5, 100);
    s13Op.setValueAtTime(44.0, 0);
}

// ============================================================================
// SCENE 14: "Ready to grow?" + branding (0:44–0:47)
// ============================================================================

// Asterisk icon on left
var closingAst = mainComp.layers.add(asteriskComp);
closingAst.name = "Asterisk_Closing";
closingAst.inPoint = 44;
closingAst.outPoint = 47;
closingAst.property("ADBE Transform Group").property("ADBE Position").setValue([1550, 850]);
closingAst.property("ADBE Transform Group").property("ADBE Transform Scale").setValue([30, 30, 100]);

var caOp = closingAst.property("ADBE Transform Group").property("ADBE Opacity");
caOp.setValueAtTime(44.0, 0);
caOp.setValueAtTime(44.3, 100);
setSmooth(caOp, 1); setSmooth(caOp, 2);

// "Ready to grow?" text
var readyText = mainComp.layers.addText("Ready to grow?");
readyText.name = "Text_Ready_to_grow";
readyText.inPoint = 44;
readyText.outPoint = 47;

var rdTD = readyText.property("ADBE Text Properties").property("ADBE Text Document");
var rdtd = rdTD.value;
rdtd.resetCharStyle();
rdtd.fontSize = 96;
rdtd.fillColor = [DARK_TEXT[0], DARK_TEXT[1], DARK_TEXT[2]];
rdtd.font = "Montserrat-Bold";
rdtd.justification = ParagraphJustification.CENTER_JUSTIFY;
rdTD.setValue(rdtd);

readyText.property("ADBE Transform Group").property("ADBE Position").setValue([COMP_WIDTH / 2, 850]);

var rdOp = readyText.property("ADBE Transform Group").property("ADBE Opacity");
rdOp.setValueAtTime(44.0, 0);
rdOp.setValueAtTime(44.3, 100);
setSmooth(rdOp, 1); setSmooth(rdOp, 2);

var rdPos = readyText.property("ADBE Transform Group").property("ADBE Position");
rdPos.setValueAtTime(44.0, [COMP_WIDTH / 2, 890]);
rdPos.setValueAtTime(44.3, [COMP_WIDTH / 2, 850]);
setSmooth(rdPos, 1); setSmooth(rdPos, 2);

// ============================================================================
// BRANDING STACK (staggered 0.3s delays)
// ============================================================================

// "NEXERA" logo text (placeholder — user will replace with PNG logo)
var logoText = mainComp.layers.addText("NEXERA");
logoText.name = "NEXERA_Logo_Text";
logoText.inPoint = 44;
logoText.outPoint = 47;

var lgTD = logoText.property("ADBE Text Properties").property("ADBE Text Document");
var lgtd = lgTD.value;
lgtd.resetCharStyle();
lgtd.fontSize = 144;
lgtd.fillColor = [DARK_TEXT[0], DARK_TEXT[1], DARK_TEXT[2]];
lgtd.font = "Montserrat-Bold";
lgtd.justification = ParagraphJustification.CENTER_JUSTIFY;
lgtd.tracking = 160;
lgTD.setValue(lgtd);

logoText.property("ADBE Transform Group").property("ADBE Position").setValue([COMP_WIDTH / 2, 1100]);

var lgOp = logoText.property("ADBE Transform Group").property("ADBE Opacity");
lgOp.setValueAtTime(44.6, 0);
lgOp.setValueAtTime(44.9, 100);
setSmooth(lgOp, 1); setSmooth(lgOp, 2);

var lgPos = logoText.property("ADBE Transform Group").property("ADBE Position");
lgPos.setValueAtTime(44.6, [COMP_WIDTH / 2, 1140]);
lgPos.setValueAtTime(44.9, [COMP_WIDTH / 2, 1100]);
setSmooth(lgPos, 1); setSmooth(lgPos, 2);

// "nexera.space" URL
var urlText = mainComp.layers.addText("nexera.space");
urlText.name = "Text_nexera_space";
urlText.inPoint = 44;
urlText.outPoint = 47;

var urlTD = urlText.property("ADBE Text Properties").property("ADBE Text Document");
var urltd = urlTD.value;
urltd.resetCharStyle();
urltd.fontSize = 36;
urltd.fillColor = [BRAND_BLUE[0], BRAND_BLUE[1], BRAND_BLUE[2]];
urltd.font = "Montserrat-Regular";
urltd.justification = ParagraphJustification.CENTER_JUSTIFY;
urlTD.setValue(urltd);

urlText.property("ADBE Transform Group").property("ADBE Position").setValue([COMP_WIDTH / 2, 1230]);

var urlOp = urlText.property("ADBE Transform Group").property("ADBE Opacity");
urlOp.setValueAtTime(44.9, 0);
urlOp.setValueAtTime(45.2, 100);
setSmooth(urlOp, 1); setSmooth(urlOp, 2);

var urlPos = urlText.property("ADBE Transform Group").property("ADBE Position");
urlPos.setValueAtTime(44.9, [COMP_WIDTH / 2, 1270]);
urlPos.setValueAtTime(45.2, [COMP_WIDTH / 2, 1230]);
setSmooth(urlPos, 1); setSmooth(urlPos, 2);

// "PLAN. BUILD. GROW." tagline
var taglineText = mainComp.layers.addText("PLAN.  BUILD.  GROW.");
taglineText.name = "Text_Tagline";
taglineText.inPoint = 44;
taglineText.outPoint = 47;

var tagTD = taglineText.property("ADBE Text Properties").property("ADBE Text Document");
var tagtd = tagTD.value;
tagtd.resetCharStyle();
tagtd.fontSize = 24;
tagtd.fillColor = [DARK_TEXT[0], DARK_TEXT[1], DARK_TEXT[2]];
tagtd.font = "Montserrat-Regular";
tagtd.justification = ParagraphJustification.CENTER_JUSTIFY;
tagtd.tracking = 80;
tagTD.setValue(tagtd);

taglineText.property("ADBE Transform Group").property("ADBE Position").setValue([COMP_WIDTH / 2, 1320]);
taglineText.property("ADBE Transform Group").property("ADBE Opacity").setValue(50);

var tagOp = taglineText.property("ADBE Transform Group").property("ADBE Opacity");
tagOp.setValueAtTime(45.2, 0);
tagOp.setValueAtTime(45.5, 50);
setSmooth(tagOp, 1); setSmooth(tagOp, 2);

var tagPos = taglineText.property("ADBE Transform Group").property("ADBE Position");
tagPos.setValueAtTime(45.2, [COMP_WIDTH / 2, 1360]);
tagPos.setValueAtTime(45.5, [COMP_WIDTH / 2, 1320]);
setSmooth(tagPos, 1); setSmooth(tagPos, 2);

// ============================================================================
// FINAL ASTERISK (decorative, floating near branding)
// ============================================================================
var finalAst = mainComp.layers.add(asteriskComp);
finalAst.name = "Asterisk_Final";
finalAst.inPoint = 45;
finalAst.outPoint = 47;
finalAst.property("ADBE Transform Group").property("ADBE Position").setValue([2400, 1100]);
finalAst.property("ADBE Transform Group").property("ADBE Transform Scale").setValue([25, 25, 100]);

var faOp = finalAst.property("ADBE Transform Group").property("ADBE Opacity");
faOp.setValueAtTime(45.0, 0);
faOp.setValueAtTime(45.3, 80);

finalAst.property("ADBE Transform Group").property("ADBE Position").expression =
    "[value[0], value[1] + Math.sin(time*2)*6]";

// Move light BG to back
lightBG.moveToEnd();

app.endUndoGroup();
alert("11_scene_closing.jsx complete!\nScenes 13-14 (0:42 – 0:47) built.\nRun 12_master_expressions.jsx next as the FINAL step.");
