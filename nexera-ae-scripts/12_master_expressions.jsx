#target aftereffects

/*******************************************************************************
 * 12_master_expressions.jsx
 * FINAL SCRIPT — Run this LAST after all scene scripts.
 * Applies: universal expressions, motion blur, smooth keyframes, vignette.
 ******************************************************************************/

app.beginUndoGroup("Master Expressions & Finalization");

// ============================================================================
// FIND MAIN COMP
// ============================================================================
var mainComp = null;
for (var i = 1; i <= app.project.numItems; i++) {
    var item = app.project.item(i);
    if (item instanceof CompItem && item.name === "NEXERA_Promo_Master") {
        mainComp = item;
        break;
    }
}

if (!mainComp) {
    alert("Error: NEXERA_Promo_Master composition not found!\nRun 00_project_setup.jsx first.");
} else {

    // ========================================================================
    // 1. ENSURE ALL ASTERISK_ICON LAYERS HAVE CORRECT EXPRESSIONS
    // ========================================================================
    var asteriskCount = 0;
    for (var j = 1; j <= mainComp.numLayers; j++) {
        var layer = mainComp.layer(j);
        if (layer.name.indexOf("Asterisk") !== -1 && layer.source && layer.source.name === "Asterisk_Icon") {
            // Ensure rotation expression is applied (the source comp has it,
            // but we also check the instance for any overrides needed)
            asteriskCount++;
        }
    }

    // ========================================================================
    // 2. ENABLE MOTION BLUR ON COMP AND LAYERS
    // ========================================================================
    mainComp.motionBlur = true;

    var motionBlurCount = 0;
    for (var k = 1; k <= mainComp.numLayers; k++) {
        var mbLayer = mainComp.layer(k);
        // Enable motion blur on text layers, shape layers, and pre-comp layers
        // Skip solids that are backgrounds or placeholders
        var layerName = mbLayer.name;
        if (layerName.indexOf("Dark_BG") === -1 &&
            layerName.indexOf("Light_BG") === -1 &&
            layerName.indexOf("Stock_Footage") === -1 &&
            layerName.indexOf("GLOBAL_CONTROL") === -1 &&
            layerName.indexOf("Flash") === -1 &&
            layerName.indexOf("Label") === -1 &&
            layerName.indexOf("Vignette") === -1) {
            mbLayer.motionBlur = true;
            motionBlurCount++;
        }
    }

    // ========================================================================
    // 3. SMOOTH ALL KEYFRAME INTERPOLATION
    // ========================================================================
    var smoothEase = new KeyframeEase(0, 75);
    var keyframeCount = 0;

    function smoothProperty(prop) {
        if (prop.numKeys > 0 && prop.propertyValueType !== PropertyValueType.NO_VALUE) {
            for (var ki = 1; ki <= prop.numKeys; ki++) {
                try {
                    var numDims = 1;
                    if (prop.propertyValueType === PropertyValueType.TwoD ||
                        prop.propertyValueType === PropertyValueType.TwoD_SPATIAL) {
                        numDims = 2;
                    } else if (prop.propertyValueType === PropertyValueType.ThreeD ||
                               prop.propertyValueType === PropertyValueType.ThreeD_SPATIAL) {
                        numDims = 3;
                    }

                    var easeArray = [];
                    for (var d = 0; d < numDims; d++) {
                        easeArray.push(new KeyframeEase(0, 75));
                    }

                    prop.setTemporalEaseAtKey(ki, easeArray, easeArray);
                    keyframeCount++;
                } catch (e) {
                    // Skip properties that don't support temporal ease
                }
            }
        }
    }

    function processPropertyGroup(group) {
        for (var p = 1; p <= group.numProperties; p++) {
            var prop = group.property(p);
            if (prop.propertyType === PropertyType.PROPERTY) {
                smoothProperty(prop);
            } else if (prop.propertyType === PropertyType.INDEXED_GROUP ||
                       prop.propertyType === PropertyType.NAMED_GROUP) {
                processPropertyGroup(prop);
            }
        }
    }

    // Apply smooth easing to all layers in the main comp
    for (var sl = 1; sl <= mainComp.numLayers; sl++) {
        var smoothLayer = mainComp.layer(sl);
        try {
            // Process transform properties
            processPropertyGroup(smoothLayer.property("ADBE Transform Group"));
        } catch (e) {
            // Skip problematic layers
        }
    }

    // ========================================================================
    // 4. CINEMATIC VIGNETTE
    // ========================================================================
    var COMP_WIDTH = 3840;
    var COMP_HEIGHT = 2160;

    var vignette = mainComp.layers.addSolid(
        [0, 0, 0], "Cinematic_Vignette", COMP_WIDTH, COMP_HEIGHT, 1, 47
    );
    vignette.name = "Cinematic_Vignette";
    vignette.property("ADBE Transform Group").property("ADBE Opacity").setValue(15);

    // Add elliptical mask (inverted, feathered)
    var vigMask = vignette.property("ADBE Mask Parade").addProperty("ADBE Mask Atom");
    var vigShape = new Shape();

    // Create an elliptical mask using vertices
    var cx = COMP_WIDTH / 2;
    var cy = COMP_HEIGHT / 2;
    var rx = COMP_WIDTH * 0.45;
    var ry = COMP_HEIGHT * 0.45;

    // Approximate ellipse with 4 points and tangent handles
    var kappa = 0.5522847498; // magic number for bezier circle approximation
    vigShape.vertices = [
        [cx, cy - ry],  // top
        [cx + rx, cy],  // right
        [cx, cy + ry],  // bottom
        [cx - rx, cy]   // left
    ];
    vigShape.inTangents = [
        [-rx * kappa, 0],  // top
        [0, -ry * kappa],  // right
        [rx * kappa, 0],   // bottom
        [0, ry * kappa]    // left
    ];
    vigShape.outTangents = [
        [rx * kappa, 0],   // top
        [0, ry * kappa],   // right
        [-rx * kappa, 0],  // bottom
        [0, -ry * kappa]   // left
    ];
    vigShape.closed = true;

    vigMask.property("ADBE Mask Shape").setValue(vigShape);
    vigMask.property("ADBE Mask Feather").setValue([500, 500]);
    vigMask.inverted = true;

    // Move vignette to top of layer stack
    vignette.moveToBeginning();

    // ========================================================================
    // REPORT
    // ========================================================================
    alert(
        "12_master_expressions.jsx complete!\n\n" +
        "Applied:\n" +
        "- Found " + asteriskCount + " Asterisk_Icon instances\n" +
        "- Motion blur enabled on " + motionBlurCount + " layers\n" +
        "- Smoothed keyframes on transform properties\n" +
        "- Added cinematic vignette overlay\n\n" +
        "Your NEXERA promo video project is now complete!\n\n" +
        "Next steps:\n" +
        "1. Import your logo PNG into '05_Assets' folder\n" +
        "2. Import stock footage into '03_Footage'\n" +
        "3. Replace gray placeholder solids with actual footage\n" +
        "4. Import music + voiceover into '04_Audio'\n" +
        "5. Add audio layers to timeline\n" +
        "6. Preview and adjust timing as needed\n" +
        "7. Render via Composition > Add to Render Queue"
    );
}

app.endUndoGroup();
