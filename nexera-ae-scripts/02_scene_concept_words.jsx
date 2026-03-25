#target aftereffects

/*******************************************************************************
 * 02_scene_concept_words.jsx
 * Scene 2: Idea / Sketch / Question (0:02.5 – 0:07)
 * Features: orbital arcs with traveling dots, glowing ring, tumble-in text
 *           animations, light flare transitions, asterisk icon movement.
 ******************************************************************************/

app.beginUndoGroup("Scene 2 - Concept Words");

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

// ============================================================================
// FIND COMPS
// ============================================================================
var mainComp = null;
var asteriskComp = null;
for (var i = 1; i <= app.project.numItems; i++) {
    var item = app.project.item(i);
    if (item instanceof CompItem) {
        if (item.name === "NEXERA_Promo_Master") mainComp = item;
        if (item.name === "Asterisk_Icon") asteriskComp = item;
    }
}
if (!mainComp) { alert("Error: Run 00_project_setup.jsx first!"); }

// ============================================================================
// 1. ORBITAL ARCS (3 circles + traveling dots)
// ============================================================================
var orbitalArcs = mainComp.layers.addShape();
orbitalArcs.name = "Orbital_Arcs";
orbitalArcs.inPoint = 2.5;
orbitalArcs.outPoint = 7;

var orbRoot = orbitalArcs.property("ADBE Root Vectors Group");
var arcRadii = [600, 1000, 1400];
var arcOpacities = [20, 15, 10];
var arcStrokes = [2, 1.5, 1];
var arcSpeeds = [8, -5, 3];

for (var a = 0; a < 3; a++) {
    var arcGrp = orbRoot.addProperty("ADBE Vector Group");
    arcGrp.name = "Arc_" + (a + 1);
    var arcC = arcGrp.property("ADBE Vectors Group");

    var arcEll = arcC.addProperty("ADBE Vector Shape - Ellipse");
    arcEll.property("ADBE Vector Ellipse Size").setValue([arcRadii[a] * 2, arcRadii[a] * 2]);

    var arcStroke = arcC.addProperty("ADBE Vector Graphic - Stroke");
    arcStroke.property("ADBE Vector Stroke Color").setValue([BRAND_BLUE[0], BRAND_BLUE[1], BRAND_BLUE[2], 1]);
    arcStroke.property("ADBE Vector Stroke Width").setValue(arcStrokes[a]);
    arcStroke.property("ADBE Vector Stroke Opacity").setValue(arcOpacities[a]);
}

orbitalArcs.property("ADBE Transform Group").property("ADBE Position").setValue([COMP_WIDTH / 2, COMP_HEIGHT / 2]);

// Slow rotation on the entire shape layer
orbitalArcs.property("ADBE Transform Group").property("ADBE Rotate Z").expression = "time * 3";

// Traveling dots (separate shape layers for expression-based movement)
for (var d = 0; d < 3; d++) {
    var dotLayer = mainComp.layers.addShape();
    dotLayer.name = "Traveling_Dot_" + (d + 1);
    dotLayer.inPoint = 2.5;
    dotLayer.outPoint = 7;

    var dotGrp = dotLayer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
    var dotC = dotGrp.property("ADBE Vectors Group");
    var dotEll = dotC.addProperty("ADBE Vector Shape - Ellipse");
    dotEll.property("ADBE Vector Ellipse Size").setValue([8, 8]);
    var dotFill = dotC.addProperty("ADBE Vector Graphic - Fill");
    dotFill.property("ADBE Vector Fill Color").setValue([LIGHT_BLUE[0], LIGHT_BLUE[1], LIGHT_BLUE[2], 1]);

    // Position expression: travel along circle path
    var radius = arcRadii[d];
    var speed = arcSpeeds[d];
    dotLayer.property("ADBE Transform Group").property("ADBE Position").expression =
        "var r = " + radius + ";" +
        "var spd = " + speed + ";" +
        "var angle = time * spd * Math.PI / 180;" +
        "[1920 + r * Math.cos(angle), 1080 + r * Math.sin(angle)]";
}

// ============================================================================
// 2. GLOWING RING
// ============================================================================
var glowRing = mainComp.layers.addShape();
glowRing.name = "Glowing_Ring";
glowRing.inPoint = 2.5;
glowRing.outPoint = 3.5;

var ringGrp = glowRing.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
var ringC = ringGrp.property("ADBE Vectors Group");
var ringEll = ringC.addProperty("ADBE Vector Shape - Ellipse");
ringEll.property("ADBE Vector Ellipse Size").setValue([400, 400]);
var ringStroke = ringC.addProperty("ADBE Vector Graphic - Stroke");
ringStroke.property("ADBE Vector Stroke Color").setValue([GLOW_BLUE[0], GLOW_BLUE[1], GLOW_BLUE[2], 1]);
ringStroke.property("ADBE Vector Stroke Width").setValue(6);

glowRing.property("ADBE Transform Group").property("ADBE Position").setValue([COMP_WIDTH / 2, COMP_HEIGHT / 2]);

// Glow effect
var ringGlow = glowRing.property("ADBE Effect Parade").addProperty("ADBE Glo2");
ringGlow.property("ADBE Glo2-0002").setValue(40);
ringGlow.property("ADBE Glo2-0003").setValue(1.5);

// Scale: 0 -> 100 -> 115 -> 100
var ringScale = glowRing.property("ADBE Transform Group").property("ADBE Transform Scale");
ringScale.setValueAtTime(2.5, [0, 0, 100]);
ringScale.setValueAtTime(2.8, [100, 100, 100]);
ringScale.setValueAtTime(3.0, [115, 115, 100]);
ringScale.setValueAtTime(3.2, [100, 100, 100]);
for (var r = 1; r <= 4; r++) { setSmooth(ringScale, r); }

// Opacity: 0 -> 100 -> 0
var ringOp = glowRing.property("ADBE Transform Group").property("ADBE Opacity");
ringOp.setValueAtTime(2.5, 0);
ringOp.setValueAtTime(2.8, 100);
ringOp.setValueAtTime(3.0, 100);
ringOp.setValueAtTime(3.2, 0);
for (var r2 = 1; r2 <= 4; r2++) { setSmooth(ringOp, r2); }

// ============================================================================
// 3. TEXT: "Idea" (tumble-in characters)
// ============================================================================
var ideaText = mainComp.layers.addText("Idea");
ideaText.name = "Text_Idea";
ideaText.inPoint = 2.5;
ideaText.outPoint = 4.2;

var ideaTD = ideaText.property("ADBE Text Properties").property("ADBE Text Document");
var itd = ideaTD.value;
itd.resetCharStyle();
itd.fontSize = 128;
itd.fillColor = WHITE;
itd.font = "Montserrat-Light";
itd.justification = ParagraphJustification.CENTER_JUSTIFY;
itd.tracking = 30;
ideaTD.setValue(itd);

ideaText.property("ADBE Transform Group").property("ADBE Position").setValue([COMP_WIDTH / 2, COMP_HEIGHT / 2]);

// Text Animator: character tumble-in
var ideaAnimators = ideaText.property("ADBE Text Properties").property("ADBE Text Animators");
var ideaAnim = ideaAnimators.addProperty("ADBE Text Animator");
ideaAnim.name = "TumbleIn";

var ideaAnimProps = ideaAnim.property("ADBE Text Animator Properties");
var ideaRotProp = ideaAnimProps.addProperty("ADBE Text Rotation");
ideaRotProp.setValue(30);
var ideaPosYProp = ideaAnimProps.addProperty("ADBE Text Position");
ideaPosYProp.setValue([0, -40]);
var ideaOpProp = ideaAnimProps.addProperty("ADBE Text Opacity");
ideaOpProp.setValue(0);

var ideaSel = ideaAnim.property("ADBE Text Selectors").property(1);
var ideaStart = ideaSel.property("ADBE Text Percent Start");
ideaStart.setValueAtTime(2.8, 0);
ideaStart.setValueAtTime(3.2, 100);
setSmooth(ideaStart, 1);
setSmooth(ideaStart, 2);

// Exit: fade out + scale down
var ideaOp = ideaText.property("ADBE Transform Group").property("ADBE Opacity");
ideaOp.setValueAtTime(3.8, 100);
ideaOp.setValueAtTime(4.0, 0);
setSmooth(ideaOp, 1);
setSmooth(ideaOp, 2);

var ideaSc = ideaText.property("ADBE Transform Group").property("ADBE Transform Scale");
ideaSc.setValueAtTime(3.8, [100, 100, 100]);
ideaSc.setValueAtTime(4.0, [80, 80, 100]);
setSmooth(ideaSc, 1);
setSmooth(ideaSc, 2);

// ============================================================================
// 4. LIGHT FLARE TRANSITION (between Idea and Sketch)
// ============================================================================
var lightFlare = mainComp.layers.addSolid(
    [1, 1, 1], "Light_Flare_Transition", COMP_WIDTH, COMP_HEIGHT, 1, 1
);
lightFlare.name = "Light_Flare_1";
lightFlare.startTime = 3.5;
lightFlare.inPoint = 3.5;
lightFlare.outPoint = 4.3;
lightFlare.blendingMode = BlendingMode.ADD;

var flareScale = lightFlare.property("ADBE Transform Group").property("ADBE Transform Scale");
flareScale.setValueAtTime(3.9, [0, 0, 100]);
flareScale.setValueAtTime(4.0, [300, 300, 100]);
flareScale.setValueAtTime(4.1, [0, 0, 100]);
for (var fl = 1; fl <= 3; fl++) { setSmooth(flareScale, fl); }

var flareOp = lightFlare.property("ADBE Transform Group").property("ADBE Opacity");
flareOp.setValueAtTime(3.9, 0);
flareOp.setValueAtTime(4.0, 60);
flareOp.setValueAtTime(4.1, 0);

// ============================================================================
// 5. TEXT: "Sketch" (tumble-in)
// ============================================================================
var sketchText = mainComp.layers.addText("Sketch");
sketchText.name = "Text_Sketch";
sketchText.inPoint = 4.0;
sketchText.outPoint = 5.7;

var sketchTD = sketchText.property("ADBE Text Properties").property("ADBE Text Document");
var sktd = sketchTD.value;
sktd.resetCharStyle();
sktd.fontSize = 128;
sktd.fillColor = WHITE;
sktd.font = "Montserrat-SemiBold";
sktd.justification = ParagraphJustification.CENTER_JUSTIFY;
sktd.tracking = 30;
sketchTD.setValue(sktd);

sketchText.property("ADBE Transform Group").property("ADBE Position").setValue([2100, 1100]);

// Tumble-in animator
var skAnimators = sketchText.property("ADBE Text Properties").property("ADBE Text Animators");
var skAnim = skAnimators.addProperty("ADBE Text Animator");
skAnim.name = "TumbleIn";

var skAnimProps = skAnim.property("ADBE Text Animator Properties");
skAnimProps.addProperty("ADBE Text Rotation").setValue(30);
skAnimProps.addProperty("ADBE Text Position").setValue([0, -40]);
skAnimProps.addProperty("ADBE Text Opacity").setValue(0);

var skSel = skAnim.property("ADBE Text Selectors").property(1);
var skStart = skSel.property("ADBE Text Percent Start");
skStart.setValueAtTime(4.0, 0);
skStart.setValueAtTime(4.4, 100);
setSmooth(skStart, 1);
setSmooth(skStart, 2);

// Exit fade
var skOp = sketchText.property("ADBE Transform Group").property("ADBE Opacity");
skOp.setValueAtTime(5.3, 100);
skOp.setValueAtTime(5.5, 0);
setSmooth(skOp, 1);
setSmooth(skOp, 2);

// ============================================================================
// 6. TEXT: "Question" (typewriter effect)
// ============================================================================
var questionText = mainComp.layers.addText("Question");
questionText.name = "Text_Question";
questionText.inPoint = 5.5;
questionText.outPoint = 7.2;

var qTD = questionText.property("ADBE Text Properties").property("ADBE Text Document");
var qtd = qTD.value;
qtd.resetCharStyle();
qtd.fontSize = 128;
qtd.fillColor = WHITE;
qtd.font = "Montserrat-Regular";
qtd.justification = ParagraphJustification.CENTER_JUSTIFY;
qtd.tracking = 30;
qTD.setValue(qtd);

questionText.property("ADBE Transform Group").property("ADBE Position").setValue([1400, 1100]);

// Typewriter animator (character-by-character opacity)
var qAnimators = questionText.property("ADBE Text Properties").property("ADBE Text Animators");
var qAnim = qAnimators.addProperty("ADBE Text Animator");
qAnim.name = "Typewriter";

var qAnimProps = qAnim.property("ADBE Text Animator Properties");
qAnimProps.addProperty("ADBE Text Opacity").setValue(0);

var qSel = qAnim.property("ADBE Text Selectors").property(1);
var qStart = qSel.property("ADBE Text Percent Start");
qStart.setValueAtTime(5.5, 0);
qStart.setValueAtTime(6.2, 100);
setSmooth(qStart, 1);
setSmooth(qStart, 2);

// ============================================================================
// 7. ASTERISK ICON (moves between words)
// ============================================================================
var astIcon = mainComp.layers.add(asteriskComp);
astIcon.name = "Asterisk_Scene2";
astIcon.inPoint = 2.5;
astIcon.outPoint = 7;

var astPos = astIcon.property("ADBE Transform Group").property("ADBE Position");
astPos.setValueAtTime(2.5, [2200, 900]);
astPos.setValueAtTime(4.0, [2200, 900]);
astPos.setValueAtTime(4.5, [1600, 850]);
astPos.setValueAtTime(5.5, [1600, 850]);
astPos.setValueAtTime(6.0, [1100, 1050]);
for (var ak = 1; ak <= 5; ak++) { setSmooth(astPos, ak); }

var astScale = astIcon.property("ADBE Transform Group").property("ADBE Transform Scale");
astScale.setValueAtTime(2.5, [25, 25, 100]);
astScale.setValueAtTime(4.5, [30, 30, 100]);
astScale.setValueAtTime(6.0, [35, 35, 100]);
for (var as2 = 1; as2 <= 3; as2++) { setSmooth(astScale, as2); }

// Extra glow on word reveals
var astGlow = astIcon.property("ADBE Effect Parade").addProperty("ADBE Glo2");
astGlow.property("ADBE Glo2-0002").setValue(30);
var astGlowInt = astGlow.property("ADBE Glo2-0003");
astGlowInt.setValueAtTime(2.5, 0.5);
astGlowInt.setValueAtTime(3.0, 1.5);
astGlowInt.setValueAtTime(3.5, 0.5);
astGlowInt.setValueAtTime(4.2, 1.5);
astGlowInt.setValueAtTime(4.8, 0.5);
astGlowInt.setValueAtTime(5.7, 1.5);
astGlowInt.setValueAtTime(6.3, 0.5);

app.endUndoGroup();
alert("02_scene_concept_words.jsx complete!\nScene 2 (0:02.5 – 0:07) built.\nRun 03_scene_what_if_grow.jsx next.");
