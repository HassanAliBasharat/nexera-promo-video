# NEXERA Promo Video — After Effects Script Suite

Auto-build a 47-second cinematic promotional video for **NEXERA** (nexera.space) using After Effects ExtendScript.

## Prerequisites

1. **Adobe After Effects 2023** (version 23.x or later)
2. **Montserrat font family** — download and install all weights from:
   https://fonts.google.com/specimen/Montserrat
   - Required weights: Light, Regular, SemiBold, Bold, Black
   - Install system-wide before launching After Effects
3. Minimum **16 GB RAM** recommended for 4K composition
4. GPU acceleration enabled in AE preferences for smoother preview

## Asset Preparation

### 1. Logo
- Download or export your NEXERA logo as a **white PNG on transparent background**
- Recommended size: 1000x300px or larger
- Place in the `05_Assets` project folder after running scripts

### 2. Stock Footage (2 clips needed)

**Clip 1 — Developer/Designer Working (dark mood)**
- Search on [Pexels.com](https://www.pexels.com/search/videos/web%20developer%20working/): "web developer working at computer"
- Look for: dark/moody office, monitor glow, close-up of hands on keyboard
- Duration: at least 5 seconds
- Resolution: 4K (3840x2160) preferred, 1080p minimum
- Used in Scene 4 (0:10.5 – 0:14.5)

**Clip 2 — Person Working on Laptop (bright/clean)**
- Search on [Pexels.com](https://www.pexels.com/search/videos/woman%20working%20laptop/): "woman working laptop office"
- Look for: bright natural light, clean desk, modern workspace
- Duration: at least 6 seconds
- Resolution: 4K preferred
- Used in Scene 7 (0:19 – 0:24)

### 3. Background Music
- Search on [Pixabay.com](https://pixabay.com/music/search/ambient%20corporate/) or [Uppbeat.io](https://uppbeat.io/)
- Search terms: "ambient corporate", "cinematic technology", "modern minimal"
- Duration: 45–60 seconds
- Style: subtle, building energy, no lyrics

### 4. Voiceover
- Record using the script below, or use AI TTS:
  - [ElevenLabs](https://elevenlabs.io/) (high quality, paid)
  - [Murf.ai](https://murf.ai/) (natural voices, free tier)
  - Google Cloud TTS (free tier available)
- Voice style: calm, confident, modern — male or female
- Export as WAV or MP3, 44.1kHz

**Voiceover Script:**
```
0:00 - "Everything starts with a spark."
0:03 - "An idea."
0:04 - "A sketch."
0:05 - "A question."
0:07 - "What if this could grow?"
0:10 - (pause)
0:12 - "Turning visions into digital reality."
0:15 - "Growth."
0:17 - "Clarity."
0:20 - "Not complexity. Not delays. Just performance and results."
0:25 - "Smart layouts. Clear actions."
0:28 - "Design shapes the journey."
0:31 - (pause for UI showcase)
0:36 - "All crafted to move people forward."
0:40 - "Because great design isn't just how it looks."
0:43 - "It's how it works."
0:45 - "Ready to grow?"
```

## Running the Scripts

**Run each script in order. Do not skip any script.**

1. Open **After Effects 2023**
2. Go to **File > Scripts > Run Script File...**
3. Run scripts in this exact order:

| Order | File | What It Creates |
|-------|------|-----------------|
| 1 | `00_project_setup.jsx` | Project, main comp, folders, shared pre-comps, controls |
| 2 | `01_scene_spark.jsx` | Scene 1: "Everything starts with a Spark" |
| 3 | `02_scene_concept_words.jsx` | Scene 2: Idea / Sketch / Question |
| 4 | `03_scene_what_if_grow.jsx` | Scene 3: "What if this could grow?" |
| 5 | `04_scene_turning_ideas.jsx` | Scene 4: Stock footage + text overlay |
| 6 | `05_scene_growth_clarity.jsx` | Scenes 5-6: GROWTH + CLARITY cascades |
| 7 | `06_scene_ribbon_footage.jsx` | Scene 7: Stock footage with ribbon wrap |
| 8 | `07_scene_dashboard.jsx` | Scene 8: Dashboard UI showcase |
| 9 | `08_scene_app_showcase.jsx` | Scene 9: Tablet/App UI |
| 10 | `09_scene_clear_actions.jsx` | Scene 10: Bento grid + flowing tube |
| 11 | `10_scene_philosophy_text.jsx` | Scenes 11-12: Philosophy text sequences |
| 12 | `11_scene_closing.jsx` | Scenes 13-14: Closing + branding |
| 13 | `12_master_expressions.jsx` | Motion blur, smooth easing, vignette |

Each script shows a confirmation alert when complete.

## After Running All Scripts

1. **Import your logo** PNG into the `05_Assets` folder in the Project panel
2. **Import stock footage** clips into `03_Footage`
3. **Replace placeholder solids:**
   - Find layers named `Stock_Footage_1_REPLACE` and `Stock_Footage_2_REPLACE`
   - Alt+drag your imported footage onto these layers to replace them
   - Delete the `Footage_Label_DELETE` text layers
4. **Import audio** (music + voiceover) into `04_Audio`
5. **Add audio to timeline:**
   - Drag music track to bottom of layer stack in the master comp
   - Drag voiceover above the music
   - Use scene markers (visible on the timeline) to sync voiceover
6. **Preview** using spacebar or RAM Preview
7. **Adjust timing** as needed — nudge text layers to match voiceover

## Render Settings

See `render_settings.md` for detailed export instructions.

**Quick render:**
1. Select `NEXERA_Promo_Master` composition
2. Composition > Add to Render Queue
3. Output Module: H.264 (or use Media Encoder)
4. Resolution: Full (3840x2160)
5. Click Render

## Troubleshooting

- **"Font not found" warnings:** Install Montserrat from Google Fonts and restart AE
- **Script errors:** Ensure you run scripts in order starting with `00_project_setup.jsx`
- **Slow preview:** Lower preview resolution to Half or Quarter in the preview panel
- **Missing Glow effect:** Ensure "ADBE Glo2" (Glow) effect is available — it ships with AE by default
- **Layer ordering issues:** Some layers may need manual reordering. Background layers should be at the bottom

## Project Structure

```
NEXERA_Promo_Master (3840x2160, 30fps, 47s)
├── Scene markers at each scene transition
├── GLOBAL_CONTROL (null with slider effects)
├── Cinematic_Vignette (top layer)
├── Scene layers (organized by time)
├── Background layers (Dark_BG, Light_BG instances)
└── Pre-comps in 01_Comps folder:
    ├── Asterisk_Icon (rotating 8-petal flower)
    ├── Dark_BG (navy gradient)
    ├── Light_BG (pale blue gradient)
    ├── Dot_Grid (repeating dot pattern)
    ├── Doodle_Face_1, Doodle_Face_2
    ├── GROWTH_Cascade, CLARITY_Cascade
    ├── Dashboard_UI
    └── App_Dashboard_UI
```
