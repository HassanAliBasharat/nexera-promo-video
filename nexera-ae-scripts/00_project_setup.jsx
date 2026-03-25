#target aftereffects

/*******************************************************************************
 * 00_project_setup.jsx
 * Creates AE project, main comp, folder structure, shared pre-comps, and
 * global controls for the NEXERA 47-second promo video.
 * Run this script FIRST before any other scene scripts.
 ******************************************************************************/

app.beginUndoGroup("NEXERA Project Setup");

// ============================================================================
// COLOR PALETTE
// ============================================================================
var DARK_BG_1    = [10/255, 26/255, 61/255];
var DARK_BG_2    = [6/255, 18/255, 48/255];
var AURORA_GLOW  = [49/255, 93/255, 234/255];
var LIGHT_BG_1   = [240/255, 244/255, 255/255];
var LIGHT_BG_2   = [224/255, 232/255, 248/255];
var BRAND_BLUE   = [49/255, 93/255, 234/255];
var LIGHT_BLUE   = [91/255, 138/255, 255/255];
var GLOW_BLUE    = [123/255, 164/255, 255/255];
var WHITE        = [1, 1, 1];
var PALE_BLUE    = [160/255, 180/255, 212/255];
var DARK_TEXT    = [10/255, 26/255, 61/255];

// ============================================================================
// COMP SETTINGS
// ============================================================================
var FPS           = 30;
var COMP_DURATION = 47;
var COMP_WIDTH    = 3840;
var COMP_HEIGHT   = 2160;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
function rgbToArray(r, g, b) { return [r/255, g/255, b/255]; }

function smoothEase() { return new KeyframeEase(0, 75); }

function setEaseOut(prop, keyIndex) {
    prop.setTemporalEaseAtKey(keyIndex, [smoothEase()], [smoothEase()]);
}

function findOrCreateFolder(parentFolder, name) {
    for (var i = 1; i <= parentFolder.numItems; i++) {
        if (parentFolder.item(i).name === name && parentFolder.item(i) instanceof FolderItem) {
            return parentFolder.item(i);
        }
    }
    return parentFolder.items.addFolder(name);
}

// ============================================================================
// 1. CREATE PROJECT (or use current)
// ============================================================================
if (!app.project) { app.newProject(); }

// ============================================================================
// 2. CREATE FOLDER STRUCTURE
// ============================================================================
var rootFolder  = app.project.rootFolder;
var folderComps     = findOrCreateFolder(rootFolder, "01_Comps");
var folderSolids    = findOrCreateFolder(rootFolder, "02_Solids");
var folderFootage   = findOrCreateFolder(rootFolder, "03_Footage");
var folderAudio     = findOrCreateFolder(rootFolder, "04_Audio");
var folderAssets    = findOrCreateFolder(rootFolder, "05_Assets");

// ============================================================================
// 3. CREATE MAIN COMPOSITION
// ============================================================================
var mainComp = null;
// Check if it already exists
for (var i = 1; i <= app.project.numItems; i++) {
    if (app.project.item(i).name === "NEXERA_Promo_Master" && app.project.item(i) instanceof CompItem) {
        mainComp = app.project.item(i);
        break;
    }
}
if (!mainComp) {
    mainComp = app.project.items.addComp("NEXERA_Promo_Master", COMP_WIDTH, COMP_HEIGHT, 1, COMP_DURATION, FPS);
}
mainComp.bgColor = [0, 0, 0];
mainComp.parentFolder = folderComps;

// ============================================================================
// 4. SCENE MARKERS ON MAIN COMP
// ============================================================================
var sceneMarkers = [
    { time: 0,     comment: "Scene 1: Spark" },
    { time: 2.5,   comment: "Scene 2: Concept Words" },
    { time: 7,     comment: "Scene 3: What If Grow" },
    { time: 10.5,  comment: "Scene 4: Turning Ideas" },
    { time: 14.5,  comment: "Scene 5: Growth Cascade" },
    { time: 17.5,  comment: "Scene 6: Clarity Cascade" },
    { time: 19,    comment: "Scene 7: Ribbon Footage" },
    { time: 24,    comment: "Scene 8: Dashboard" },
    { time: 29,    comment: "Scene 9: App Showcase" },
    { time: 33,    comment: "Scene 10: Clear Actions" },
    { time: 36,    comment: "Scene 11: Crafted" },
    { time: 39,    comment: "Scene 12: Great Design" },
    { time: 42,    comment: "Scene 13: How It Works" },
    { time: 44,    comment: "Scene 14: Ready to Grow" }
];
for (var m = 0; m < sceneMarkers.length; m++) {
    var marker = new MarkerValue(sceneMarkers[m].comment);
    mainComp.markerProperty.setValueAtTime(sceneMarkers[m].time, marker);
}

// ============================================================================
// 5a. SHARED PRE-COMP: Asterisk_Icon (200x200, 47s)
// ============================================================================
var asteriskComp = app.project.items.addComp("Asterisk_Icon", 200, 200, 1, COMP_DURATION, FPS);
asteriskComp.parentFolder = folderComps;

var asteriskShape = asteriskComp.layers.addShape();
asteriskShape.name = "Asterisk_Petals";
var grp = asteriskShape.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
grp.name = "PetalGroup";
var contentsGrp = grp.property("ADBE Vectors Group");

// Create 8 petal ellipses at 45-degree increments
for (var p = 0; p < 8; p++) {
    var ellipse = contentsGrp.addProperty("ADBE Vector Shape - Ellipse");
    ellipse.property("ADBE Vector Ellipse Size").setValue([60, 20]);

    // Wrap each petal in its own group for individual rotation
    // Since we can't easily rotate individual ellipses in the same group,
    // we'll position them using a transform approach. Instead, build 8 groups.
}

// Better approach: 8 separate groups each with an ellipse and rotated transform
// Remove the initial group and rebuild
asteriskShape.remove();
asteriskShape = asteriskComp.layers.addShape();
asteriskShape.name = "Asterisk_Petals";
var rootVectors = asteriskShape.property("ADBE Root Vectors Group");

for (var p = 0; p < 8; p++) {
    var petalGrp = rootVectors.addProperty("ADBE Vector Group");
    petalGrp.name = "Petal_" + (p + 1);
    var petalContents = petalGrp.property("ADBE Vectors Group");

    var ell = petalContents.addProperty("ADBE Vector Shape - Ellipse");
    ell.property("ADBE Vector Ellipse Size").setValue([60, 20]);

    var fill = petalContents.addProperty("ADBE Vector Graphic - Fill");
    // Alternate between BRAND_BLUE and LIGHT_BLUE for gradient effect
    if (p % 2 === 0) {
        fill.property("ADBE Vector Fill Color").setValue([BRAND_BLUE[0], BRAND_BLUE[1], BRAND_BLUE[2], 1]);
    } else {
        fill.property("ADBE Vector Fill Color").setValue([LIGHT_BLUE[0], LIGHT_BLUE[1], LIGHT_BLUE[2], 1]);
    }

    // Rotate each petal
    var petalTransform = petalGrp.property("ADBE Vector Transform Group");
    petalTransform.property("ADBE Vector Rotation").setValue(p * 45);
}

// Add Glow effect
var glowEffect = asteriskShape.property("ADBE Effect Parade").addProperty("ADBE Glo2");
glowEffect.property("ADBE Glo2-0002").setValue(60);  // Glow Threshold
glowEffect.property("ADBE Glo2-0003").setValue(30);  // Glow Radius
glowEffect.property("ADBE Glo2-0004").setValue(0.8); // Glow Intensity

// Rotation expression: 45 degrees per second
asteriskShape.property("ADBE Transform Group").property("ADBE Rotate Z").expression = "time * 45";

// Opacity pulsing expression
asteriskShape.property("ADBE Transform Group").property("ADBE Opacity").expression = "80 + Math.sin(time * 2) * 20";

// Center the shape layer
asteriskShape.property("ADBE Transform Group").property("ADBE Position").setValue([100, 100]);

// ============================================================================
// 5b. SHARED PRE-COMP: Dark_BG (3840x2160, 47s)
// ============================================================================
var darkBGComp = app.project.items.addComp("Dark_BG", COMP_WIDTH, COMP_HEIGHT, 1, COMP_DURATION, FPS);
darkBGComp.parentFolder = folderComps;

// Base solid: DARK_BG_2
var darkBaseSolid = darkBGComp.layers.addSolid(
    [DARK_BG_2[0], DARK_BG_2[1], DARK_BG_2[2]], "Dark_Base", COMP_WIDTH, COMP_HEIGHT, 1, COMP_DURATION
);

// Radial gradient ellipse on top: DARK_BG_1 center fading to transparent
var darkGradShape = darkBGComp.layers.addShape();
darkGradShape.name = "Radial_Gradient_Center";
var dgGrp = darkGradShape.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
var dgContents = dgGrp.property("ADBE Vectors Group");
var dgEllipse = dgContents.addProperty("ADBE Vector Shape - Ellipse");
dgEllipse.property("ADBE Vector Ellipse Size").setValue([4000, 4000]);
var dgFill = dgContents.addProperty("ADBE Vector Graphic - Fill");
dgFill.property("ADBE Vector Fill Color").setValue([DARK_BG_1[0], DARK_BG_1[1], DARK_BG_1[2], 1]);
dgFill.property("ADBE Vector Fill Opacity").setValue(60);
darkGradShape.property("ADBE Transform Group").property("ADBE Position").setValue([COMP_WIDTH/2, COMP_HEIGHT/2]);

// Aurora glow ellipse (upper-right, AURORA_GLOW at 8% opacity)
var auroraShape = darkBGComp.layers.addShape();
auroraShape.name = "Aurora_Glow";
var agGrp = auroraShape.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
var agContents = agGrp.property("ADBE Vectors Group");
var agEllipse = agContents.addProperty("ADBE Vector Shape - Ellipse");
agEllipse.property("ADBE Vector Ellipse Size").setValue([1600, 1600]);
var agFill = agContents.addProperty("ADBE Vector Graphic - Fill");
agFill.property("ADBE Vector Fill Color").setValue([AURORA_GLOW[0], AURORA_GLOW[1], AURORA_GLOW[2], 1]);
auroraShape.property("ADBE Transform Group").property("ADBE Opacity").setValue(8);
auroraShape.property("ADBE Transform Group").property("ADBE Position").setValue([2800, 600]);
auroraShape.property("ADBE Transform Group").property("ADBE Position").expression =
    "[value[0] + Math.sin(time*0.3)*100, value[1] + Math.cos(time*0.4)*60]";

// ============================================================================
// 5c. SHARED PRE-COMP: Light_BG (3840x2160, 47s)
// ============================================================================
var lightBGComp = app.project.items.addComp("Light_BG", COMP_WIDTH, COMP_HEIGHT, 1, COMP_DURATION, FPS);
lightBGComp.parentFolder = folderComps;

// Base solid: LIGHT_BG_1
var lightBaseSolid = lightBGComp.layers.addSolid(
    [LIGHT_BG_1[0], LIGHT_BG_1[1], LIGHT_BG_1[2]], "Light_Base", COMP_WIDTH, COMP_HEIGHT, 1, COMP_DURATION
);

// Ellipse gradient overlay
var lightGradShape = lightBGComp.layers.addShape();
lightGradShape.name = "Radial_Gradient_Off_Center";
var lgGrp = lightGradShape.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
var lgContents = lgGrp.property("ADBE Vectors Group");
var lgEllipse = lgContents.addProperty("ADBE Vector Shape - Ellipse");
lgEllipse.property("ADBE Vector Ellipse Size").setValue([3000, 3000]);
var lgFill = lgContents.addProperty("ADBE Vector Graphic - Fill");
lgFill.property("ADBE Vector Fill Color").setValue([LIGHT_BG_2[0], LIGHT_BG_2[1], LIGHT_BG_2[2], 1]);
lgFill.property("ADBE Vector Fill Opacity").setValue(50);
lightGradShape.property("ADBE Transform Group").property("ADBE Position").setValue([1400, 1080]);

// ============================================================================
// 5d. SHARED PRE-COMP: Dot_Grid (3840x2160, 10s loopable)
// ============================================================================
var dotGridComp = app.project.items.addComp("Dot_Grid", COMP_WIDTH, COMP_HEIGHT, 1, 10, FPS);
dotGridComp.parentFolder = folderComps;

var dotShape = dotGridComp.layers.addShape();
dotShape.name = "Dot_Grid_Pattern";
var dotRoot = dotShape.property("ADBE Root Vectors Group");
var dotGrp = dotRoot.addProperty("ADBE Vector Group");
dotGrp.name = "DotPatternGroup";
var dotContents = dotGrp.property("ADBE Vectors Group");

// Single dot
var dotEllipse = dotContents.addProperty("ADBE Vector Shape - Ellipse");
dotEllipse.property("ADBE Vector Ellipse Size").setValue([8, 8]);
var dotFill = dotContents.addProperty("ADBE Vector Graphic - Fill");
dotFill.property("ADBE Vector Fill Color").setValue([BRAND_BLUE[0], BRAND_BLUE[1], BRAND_BLUE[2], 1]);
dotFill.property("ADBE Vector Fill Opacity").setValue(35);

// Horizontal repeater
var hRepeat = dotContents.addProperty("ADBE Vector Filter - Repeater");
hRepeat.property("ADBE Vector Repeater Copies").setValue(96);
hRepeat.property("ADBE Vector Repeater Transform").property("ADBE Vector Repeater Position").setValue([40, 0]);

// Vertical repeater (added to the group level)
var vRepeat = dotRoot.addProperty("ADBE Vector Filter - Repeater");
vRepeat.property("ADBE Vector Repeater Copies").setValue(54);
vRepeat.property("ADBE Vector Repeater Transform").property("ADBE Vector Repeater Position").setValue([0, 40]);

// Position grid to start from top-left
dotShape.property("ADBE Transform Group").property("ADBE Position").setValue([40, 40]);

// ============================================================================
// 5e. SHARED PRE-COMPS: Doodle_Face_1, Doodle_Face_2 (100x100)
// ============================================================================
function createDoodleFace(name, mouthCurve) {
    var faceComp = app.project.items.addComp(name, 100, 100, 1, COMP_DURATION, FPS);
    faceComp.parentFolder = folderComps;

    // Head circle (stroke only)
    var headShape = faceComp.layers.addShape();
    headShape.name = "Head";
    var hGrp = headShape.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
    var hC = hGrp.property("ADBE Vectors Group");
    var headEll = hC.addProperty("ADBE Vector Shape - Ellipse");
    headEll.property("ADBE Vector Ellipse Size").setValue([80, 80]);
    var headStroke = hC.addProperty("ADBE Vector Graphic - Stroke");
    headStroke.property("ADBE Vector Stroke Color").setValue([1, 1, 1, 1]);
    headStroke.property("ADBE Vector Stroke Width").setValue(2);
    headShape.property("ADBE Transform Group").property("ADBE Position").setValue([50, 50]);

    // Left eye
    var eyeL = faceComp.layers.addShape();
    eyeL.name = "Eye_Left";
    var elGrp = eyeL.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
    var elC = elGrp.property("ADBE Vectors Group");
    var elEll = elC.addProperty("ADBE Vector Shape - Ellipse");
    elEll.property("ADBE Vector Ellipse Size").setValue([6, 6]);
    var elFill = elC.addProperty("ADBE Vector Graphic - Fill");
    elFill.property("ADBE Vector Fill Color").setValue([1, 1, 1, 1]);
    eyeL.property("ADBE Transform Group").property("ADBE Position").setValue([38, 42]);

    // Right eye
    var eyeR = faceComp.layers.addShape();
    eyeR.name = "Eye_Right";
    var erGrp = eyeR.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
    var erC = erGrp.property("ADBE Vectors Group");
    var erEll = erC.addProperty("ADBE Vector Shape - Ellipse");
    erEll.property("ADBE Vector Ellipse Size").setValue([6, 6]);
    var erFill = erC.addProperty("ADBE Vector Graphic - Fill");
    erFill.property("ADBE Vector Fill Color").setValue([1, 1, 1, 1]);
    eyeR.property("ADBE Transform Group").property("ADBE Position").setValue([62, 42]);

    // Mouth (curved path)
    var mouth = faceComp.layers.addShape();
    mouth.name = "Mouth";
    var mGrp = mouth.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
    var mC = mGrp.property("ADBE Vectors Group");
    var mPath = mC.addProperty("ADBE Vector Shape - Group");
    var mouthShape = new Shape();
    mouthShape.vertices = [[-10, 0], [0, mouthCurve], [10, 0]];
    mouthShape.inTangents = [[0, 0], [-5, 0], [0, 0]];
    mouthShape.outTangents = [[0, 0], [5, 0], [0, 0]];
    mouthShape.closed = false;
    mPath.property("ADBE Vector Shape").setValue(mouthShape);
    var mStroke = mC.addProperty("ADBE Vector Graphic - Stroke");
    mStroke.property("ADBE Vector Stroke Color").setValue([1, 1, 1, 1]);
    mStroke.property("ADBE Vector Stroke Width").setValue(2);
    mouth.property("ADBE Transform Group").property("ADBE Position").setValue([50, 60]);

    return faceComp;
}

var doodleFace1 = createDoodleFace("Doodle_Face_1", 6);   // smile
var doodleFace2 = createDoodleFace("Doodle_Face_2", -4);   // slight frown/neutral

// ============================================================================
// 6. GLOBAL_CONTROL NULL OBJECT
// ============================================================================
var globalCtrl = mainComp.layers.addNull();
globalCtrl.name = "GLOBAL_CONTROL";
globalCtrl.property("ADBE Transform Group").property("ADBE Opacity").setValue(0);

// Add slider controls
var sceneProgress = globalCtrl.property("ADBE Effect Parade").addProperty("ADBE Slider Control");
sceneProgress.name = "Scene_Progress";
sceneProgress.property("ADBE Slider Control-0001").setValue(0);

var glowIntensity = globalCtrl.property("ADBE Effect Parade").addProperty("ADBE Slider Control");
glowIntensity.name = "Glow_Intensity";
glowIntensity.property("ADBE Slider Control-0001").setValue(80);

var iconScale = globalCtrl.property("ADBE Effect Parade").addProperty("ADBE Slider Control");
iconScale.name = "Icon_Scale";
iconScale.property("ADBE Slider Control-0001").setValue(100);

// ============================================================================
// DONE
// ============================================================================
app.endUndoGroup();
alert("00_project_setup.jsx complete!\n\nCreated:\n- NEXERA_Promo_Master comp (3840x2160, 30fps, 47s)\n- Folder structure (01_Comps through 05_Assets)\n- Asterisk_Icon pre-comp\n- Dark_BG pre-comp\n- Light_BG pre-comp\n- Dot_Grid pre-comp\n- Doodle_Face_1 & Doodle_Face_2 pre-comps\n- GLOBAL_CONTROL null with sliders\n- Scene markers on timeline\n\nProceed to run 01_scene_spark.jsx next.");
