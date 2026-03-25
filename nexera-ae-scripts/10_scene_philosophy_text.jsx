#target aftereffects

/*******************************************************************************
 * 10_scene_philosophy_text.jsx
 * Scenes 11-12: "All crafted to move people forward" + "Because great design..."
 * (0:36 – 0:42)
 * Features: word-by-word reveals, doodle characters, flower petal drawing,
 *           bold BRAND_BLUE emphasis on key words.
 ******************************************************************************/

app.beginUndoGroup("Scenes 11-12 - Philosophy Text");

// ============================================================================
// COLOR PALETTE
// ============================================================================
var DARK_BG_2    = [6/255, 18/255, 48/255];
var BRAND_BLUE   = [49/255, 93/255, 234/255];
var LIGHT_BLUE   = [91/255, 138/255, 255/255];
var WHITE        = [1, 1, 1];
var PALE_BLUE    = [160/255, 180/255, 212/255];

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
var doodleFace1 = null;
var doodleFace2 = null;
for (var i = 1; i <= app.project.numItems; i++) {
    var item = app.project.item(i);
    if (item instanceof CompItem) {
        if (item.name === "NEXERA_Promo_Master") mainComp = item;
        if (item.name === "Dark_BG") darkBGComp = item;
        if (item.name === "Asterisk_Icon") asteriskComp = item;
        if (item.name === "Doodle_Face_1") doodleFace1 = item;
        if (item.name === "Doodle_Face_2") doodleFace2 = item;
    }
}

// ============================================================================
// 1. DARK BG (covers scenes 11-12: 36–42)
// ============================================================================
var darkBG = mainComp.layers.add(darkBGComp);
darkBG.name = "Dark_BG_Scenes11-12";
darkBG.startTime = 36;
darkBG.inPoint = 36;
darkBG.outPoint = 42;

// ============================================================================
// SCENE 11: "All crafted to move people forward" (0:36–0:39)
// ============================================================================

// "All" — light white
var allText = mainComp.layers.addText("All");
allText.name = "Text_All";
allText.inPoint = 36;
allText.outPoint = 39;

var allTD = allText.property("ADBE Text Properties").property("ADBE Text Document");
var atd = allTD.value;
atd.resetCharStyle();
atd.fontSize = 96;
atd.fillColor = WHITE;
atd.font = "Montserrat-Light";
atd.justification = ParagraphJustification.LEFT_JUSTIFY;
allTD.setValue(atd);
allText.property("ADBE Transform Group").property("ADBE Position").setValue([800, 900]);

var allOp = allText.property("ADBE Transform Group").property("ADBE Opacity");
allOp.setValueAtTime(36.2, 0);
allOp.setValueAtTime(36.5, 100);
setSmooth(allOp, 1); setSmooth(allOp, 2);

// "crafted" — bold BRAND_BLUE
var craftedText = mainComp.layers.addText("crafted");
craftedText.name = "Text_crafted";
craftedText.inPoint = 36;
craftedText.outPoint = 39;

var crTD = craftedText.property("ADBE Text Properties").property("ADBE Text Document");
var crtd = crTD.value;
crtd.resetCharStyle();
crtd.fontSize = 104;
crtd.fillColor = [BRAND_BLUE[0], BRAND_BLUE[1], BRAND_BLUE[2]];
crtd.font = "Montserrat-Bold";
crtd.justification = ParagraphJustification.LEFT_JUSTIFY;
crTD.setValue(crtd);
craftedText.property("ADBE Transform Group").property("ADBE Position").setValue([1020, 900]);

var crOp = craftedText.property("ADBE Transform Group").property("ADBE Opacity");
crOp.setValueAtTime(36.5, 0);
crOp.setValueAtTime(36.8, 100);
setSmooth(crOp, 1); setSmooth(crOp, 2);

// "to move" — light white
var toMoveText = mainComp.layers.addText("to move");
toMoveText.name = "Text_to_move";
toMoveText.inPoint = 36;
toMoveText.outPoint = 39;

var tmTD = toMoveText.property("ADBE Text Properties").property("ADBE Text Document");
var tmtd = tmTD.value;
tmtd.resetCharStyle();
tmtd.fontSize = 96;
tmtd.fillColor = WHITE;
tmtd.font = "Montserrat-Light";
tmtd.justification = ParagraphJustification.LEFT_JUSTIFY;
tmTD.setValue(tmtd);
toMoveText.property("ADBE Transform Group").property("ADBE Position").setValue([800, 1050]);

var tmOp = toMoveText.property("ADBE Transform Group").property("ADBE Opacity");
tmOp.setValueAtTime(36.8, 0);
tmOp.setValueAtTime(37.1, 100);
setSmooth(tmOp, 1); setSmooth(tmOp, 2);

// "people" — light white
var peopleText = mainComp.layers.addText("people");
peopleText.name = "Text_people";
peopleText.inPoint = 36;
peopleText.outPoint = 39;

var peTD = peopleText.property("ADBE Text Properties").property("ADBE Text Document");
var petd = peTD.value;
petd.resetCharStyle();
petd.fontSize = 96;
petd.fillColor = WHITE;
petd.font = "Montserrat-Light";
petd.justification = ParagraphJustification.LEFT_JUSTIFY;
peTD.setValue(petd);
peopleText.property("ADBE Transform Group").property("ADBE Position").setValue([1300, 1050]);

var peOp = peopleText.property("ADBE Transform Group").property("ADBE Opacity");
peOp.setValueAtTime(37.1, 0);
peOp.setValueAtTime(37.4, 100);
setSmooth(peOp, 1); setSmooth(peOp, 2);

// "forward." — light white
var forwardText = mainComp.layers.addText("forward.");
forwardText.name = "Text_forward";
forwardText.inPoint = 36;
forwardText.outPoint = 39;

var fwTD = forwardText.property("ADBE Text Properties").property("ADBE Text Document");
var fwtd = fwTD.value;
fwtd.resetCharStyle();
fwtd.fontSize = 96;
fwtd.fillColor = WHITE;
fwtd.font = "Montserrat-Light";
fwtd.justification = ParagraphJustification.LEFT_JUSTIFY;
fwTD.setValue(fwtd);
forwardText.property("ADBE Transform Group").property("ADBE Position").setValue([800, 1200]);

var fwOp = forwardText.property("ADBE Transform Group").property("ADBE Opacity");
fwOp.setValueAtTime(37.4, 0);
fwOp.setValueAtTime(37.7, 100);
setSmooth(fwOp, 1); setSmooth(fwOp, 2);

// Doodle characters
if (doodleFace1) {
    var df1 = mainComp.layers.add(doodleFace1);
    df1.name = "Doodle_Scene11_1";
    df1.inPoint = 36.5;
    df1.outPoint = 39;
    df1.property("ADBE Transform Group").property("ADBE Position").setValue([2600, 800]);
    df1.property("ADBE Transform Group").property("ADBE Transform Scale").setValue([70, 70, 100]);
    df1.property("ADBE Transform Group").property("ADBE Position").expression =
        "[value[0], value[1] + Math.sin(time*1.5)*8]";
}

if (doodleFace2) {
    var df2 = mainComp.layers.add(doodleFace2);
    df2.name = "Doodle_Scene11_2";
    df2.inPoint = 37;
    df2.outPoint = 39;
    df2.property("ADBE Transform Group").property("ADBE Position").setValue([2800, 1100]);
    df2.property("ADBE Transform Group").property("ADBE Transform Scale").setValue([60, 60, 100]);
    df2.property("ADBE Transform Group").property("ADBE Position").expression =
        "[value[0] + Math.sin(time*0.8)*5, value[1] + Math.cos(time*1.2)*7]";
}

// ============================================================================
// SCENE 12: "Because great design isn't just how it looks" (0:39–0:42)
// ============================================================================

// Fade out scene 11 text
// (handled by outPoints at 39)

// "Because great design" — line 1
var becauseText = mainComp.layers.addText("Because great design");
becauseText.name = "Text_Because_great_design";
becauseText.inPoint = 39;
becauseText.outPoint = 42;

var beTD = becauseText.property("ADBE Text Properties").property("ADBE Text Document");
var betd = beTD.value;
betd.resetCharStyle();
betd.fontSize = 84;
betd.fillColor = WHITE;
betd.font = "Montserrat-Light";
betd.justification = ParagraphJustification.LEFT_JUSTIFY;
beTD.setValue(betd);
becauseText.property("ADBE Transform Group").property("ADBE Position").setValue([600, 800]);

var beOp = becauseText.property("ADBE Transform Group").property("ADBE Opacity");
beOp.setValueAtTime(39.0, 0);
beOp.setValueAtTime(39.3, 100);
setSmooth(beOp, 1); setSmooth(beOp, 2);

var bePos = becauseText.property("ADBE Transform Group").property("ADBE Position");
bePos.setValueAtTime(39.0, [600, 840]);
bePos.setValueAtTime(39.3, [600, 800]);
setSmooth(bePos, 1); setSmooth(bePos, 2);

// "isn't just" — line 2
var isntText = mainComp.layers.addText("isn't just");
isntText.name = "Text_isnt_just";
isntText.inPoint = 39;
isntText.outPoint = 42;

var isTD = isntText.property("ADBE Text Properties").property("ADBE Text Document");
var istd = isTD.value;
istd.resetCharStyle();
istd.fontSize = 84;
istd.fillColor = WHITE;
istd.font = "Montserrat-Light";
istd.justification = ParagraphJustification.LEFT_JUSTIFY;
isTD.setValue(istd);
isntText.property("ADBE Transform Group").property("ADBE Position").setValue([600, 940]);

var isOp = isntText.property("ADBE Transform Group").property("ADBE Opacity");
isOp.setValueAtTime(39.5, 0);
isOp.setValueAtTime(39.8, 100);
setSmooth(isOp, 1); setSmooth(isOp, 2);

// "how it looks" — bold BRAND_BLUE, line 3
var looksText = mainComp.layers.addText("how it looks");
looksText.name = "Text_how_it_looks";
looksText.inPoint = 39;
looksText.outPoint = 42;

var loTD = looksText.property("ADBE Text Properties").property("ADBE Text Document");
var lotd = loTD.value;
lotd.resetCharStyle();
lotd.fontSize = 96;
lotd.fillColor = [BRAND_BLUE[0], BRAND_BLUE[1], BRAND_BLUE[2]];
lotd.font = "Montserrat-Bold";
lotd.justification = ParagraphJustification.LEFT_JUSTIFY;
loTD.setValue(lotd);
looksText.property("ADBE Transform Group").property("ADBE Position").setValue([600, 1080]);

var loOp = looksText.property("ADBE Transform Group").property("ADBE Opacity");
loOp.setValueAtTime(40.0, 0);
loOp.setValueAtTime(40.3, 100);
setSmooth(loOp, 1); setSmooth(loOp, 2);

var loPos = looksText.property("ADBE Transform Group").property("ADBE Position");
loPos.setValueAtTime(40.0, [600, 1120]);
loPos.setValueAtTime(40.3, [600, 1080]);
setSmooth(loPos, 1); setSmooth(loPos, 2);

// ============================================================================
// THIN-LINE FLOWER PETAL (bottom-right, Trim Paths growing)
// ============================================================================
var flowerPetal = mainComp.layers.addShape();
flowerPetal.name = "Flower_Petal_Drawing";
flowerPetal.inPoint = 39.5;
flowerPetal.outPoint = 42;

var fpRoot = flowerPetal.property("ADBE Root Vectors Group");

// Create 6 petal paths
for (var pe = 0; pe < 6; pe++) {
    var petalGrp = fpRoot.addProperty("ADBE Vector Group");
    petalGrp.name = "Petal_" + (pe + 1);
    var petalC = petalGrp.property("ADBE Vectors Group");

    var petalPath = petalC.addProperty("ADBE Vector Shape - Group");
    var pShape = new Shape();
    var petalAngle = (pe / 6) * Math.PI * 2;
    var petalLen = 120;
    var tipX = Math.cos(petalAngle) * petalLen;
    var tipY = Math.sin(petalAngle) * petalLen;
    var ctrlLen = petalLen * 0.6;

    pShape.vertices = [[0, 0], [tipX, tipY], [0, 0]];
    pShape.inTangents = [
        [0, 0],
        [Math.cos(petalAngle + 0.8) * ctrlLen, Math.sin(petalAngle + 0.8) * ctrlLen],
        [-Math.cos(petalAngle - 0.8) * ctrlLen, -Math.sin(petalAngle - 0.8) * ctrlLen]
    ];
    pShape.outTangents = [
        [Math.cos(petalAngle + 0.8) * ctrlLen, Math.sin(petalAngle + 0.8) * ctrlLen],
        [-Math.cos(petalAngle - 0.8) * ctrlLen, -Math.sin(petalAngle - 0.8) * ctrlLen],
        [0, 0]
    ];
    pShape.closed = true;
    petalPath.property("ADBE Vector Shape").setValue(pShape);

    var petalStroke = petalC.addProperty("ADBE Vector Graphic - Stroke");
    petalStroke.property("ADBE Vector Stroke Color").setValue([LIGHT_BLUE[0], LIGHT_BLUE[1], LIGHT_BLUE[2], 1]);
    petalStroke.property("ADBE Vector Stroke Width").setValue(2);
    petalStroke.property("ADBE Vector Stroke Opacity").setValue(40);

    // Trim Paths growing
    var petalTrim = petalC.addProperty("ADBE Vector Filter - Trim");
    var petalEnd = petalTrim.property("ADBE Vector Trim End");
    petalEnd.setValueAtTime(39.5 + pe * 0.15, 0);
    petalEnd.setValueAtTime(40.5 + pe * 0.15, 100);
}

flowerPetal.property("ADBE Transform Group").property("ADBE Position").setValue([2900, 1600]);

// Asterisk icon
var philAst = mainComp.layers.add(asteriskComp);
philAst.name = "Asterisk_Scene11-12";
philAst.inPoint = 36;
philAst.outPoint = 42;
philAst.property("ADBE Transform Group").property("ADBE Position").setValue([3100, 700]);
philAst.property("ADBE Transform Group").property("ADBE Transform Scale").setValue([30, 30, 100]);
philAst.property("ADBE Transform Group").property("ADBE Position").expression =
    "[value[0], value[1] + Math.sin(time*2)*8]";

// Move dark BG to back
darkBG.moveToEnd();

app.endUndoGroup();
alert("10_scene_philosophy_text.jsx complete!\nScenes 11-12 (0:36 – 0:42) built.\nRun 11_scene_closing.jsx next.");
