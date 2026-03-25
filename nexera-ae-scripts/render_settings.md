# NEXERA Promo Video — Render Settings Guide

## Option 1: After Effects Render Queue (Simple)

### Steps
1. Select `NEXERA_Promo_Master` in the Project panel
2. Go to **Composition > Add to Render Queue** (Ctrl+Shift+/)
3. Configure the Render Queue:

### Output Module Settings
- Click on the output module link (e.g., "Lossless")
- **Format:** QuickTime (for intermediate) or H.264 (for final)
- For **QuickTime** (highest quality intermediate):
  - Video Codec: Apple ProRes 422 HQ (or DNxHR HQ on Windows)
  - Resolution: Full (3840 x 2160)
  - Channels: RGB
  - Depth: Millions of Colors (8-bit) or Trillions (16-bit for grading)
  - Audio: AAC or PCM, 48kHz, Stereo
- For **H.264** (final delivery):
  - Bitrate: 25-35 Mbps for 4K
  - Profile: High
  - Level: 5.1

### Render Settings
- Click on the render settings link (e.g., "Best Settings")
- **Quality:** Best
- **Resolution:** Full
- **Frame Rate:** Use Comp's Frame Rate (30fps)
- **Time Span:** Length of Comp

### Output To
- Click the filename to set your output location
- Recommended filename: `NEXERA_Promo_4K_30fps.mp4`

### Render
- Click the **Render** button
- Estimated render time: 15-45 minutes depending on hardware

---

## Option 2: Adobe Media Encoder (Recommended)

### Steps
1. Select `NEXERA_Promo_Master` in the Project panel
2. Go to **Composition > Add to Adobe Media Encoder Queue** (Ctrl+Alt+M)
3. Adobe Media Encoder will open with the comp queued

### Preset Selection
- **Format:** H.264
- **Preset:** "Match Source - High Bitrate" (then customize)

### Custom Settings (click the preset name to edit)

#### Video Tab
| Setting | Value |
|---------|-------|
| Width | 3840 |
| Height | 2160 |
| Frame Rate | 30 |
| Field Order | Progressive |
| Aspect | Square Pixels (1.0) |
| Profile | High |
| Level | 5.1 |
| Bitrate Encoding | VBR, 2 Pass |
| Target Bitrate | 25 Mbps |
| Maximum Bitrate | 35 Mbps |

#### Audio Tab
| Setting | Value |
|---------|-------|
| Audio Codec | AAC |
| Sample Rate | 48000 Hz |
| Channels | Stereo |
| Audio Quality | High |
| Bitrate | 320 kbps |

### Alternative Presets for Different Uses

**Social Media (Instagram/TikTok vertical crop needed separately):**
- Format: H.264
- Resolution: 1920x1080 (export at 1080p)
- Bitrate: 10-15 Mbps

**YouTube 4K:**
- Format: H.264
- Resolution: 3840x2160
- Bitrate: 35-45 Mbps
- Or use VP9/WebM for better YouTube processing

**Vimeo 4K:**
- Format: H.264
- Resolution: 3840x2160
- Bitrate: 30-40 Mbps

**Client Review (smaller file):**
- Format: H.264
- Resolution: 1920x1080
- Bitrate: 8-12 Mbps
- Estimated file size: ~50-70 MB

---

## Option 3: Intermediate Render + Premiere Pro

For maximum quality and flexibility:

### Step 1: Render Intermediate from AE
- Format: QuickTime ProRes 422 HQ (or DNxHR)
- Resolution: Full 4K
- No compression artifacts
- File size: ~15-25 GB for 47 seconds

### Step 2: Import into Premiere Pro
- Create new Premiere project
- Import the intermediate render
- Import audio files (music + voiceover) separately
- Fine-tune audio sync, add fades, adjust levels
- Add any final color grading (Lumetri Color)

### Step 3: Export from Premiere
- Use Media Encoder settings from Option 2 above
- Advantage: better audio mixing and final color control

---

## File Size Expectations

| Resolution | Bitrate | Duration | Approximate File Size |
|-----------|---------|----------|-----------------------|
| 3840x2160 | 30 Mbps | 47s | ~175 MB |
| 3840x2160 | 20 Mbps | 47s | ~120 MB |
| 1920x1080 | 12 Mbps | 47s | ~70 MB |
| 1920x1080 | 8 Mbps | 47s | ~47 MB |

---

## Adding Audio If Not Done in AE

### Using DaVinci Resolve (Free)
1. Download from [blackmagicdesign.com](https://www.blackmagicdesign.com/products/davinciresolve)
2. Create new project, set timeline to 3840x2160, 30fps
3. Import your rendered video (without audio)
4. Import music and voiceover audio files
5. Drag all to timeline, sync voiceover using scene markers
6. Adjust audio levels: music at -12dB to -18dB, voiceover at -6dB to -3dB
7. Export: Deliver page > H.264, match source settings

### Using Adobe Premiere Pro
1. Create project matching AE settings (4K, 30fps)
2. Import rendered video + audio files
3. Place on timeline, sync audio
4. Audio mixing: Essential Sound panel for quick levels
5. Export via Media Encoder with settings above

### Using FFmpeg (Command Line)
```bash
# Combine video with audio (no re-encoding of video)
ffmpeg -i NEXERA_Promo_4K.mp4 -i music.mp3 -i voiceover.wav \
  -filter_complex "[1:a]volume=0.3[music];[2:a]volume=0.9[vo];[music][vo]amix=inputs=2:duration=first[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 320k \
  NEXERA_Promo_FINAL.mp4
```

---

## Quality Checklist Before Final Export

- [ ] All placeholder solids replaced with actual footage
- [ ] Logo imported and positioned correctly
- [ ] Music and voiceover synced to scene markers
- [ ] Audio levels balanced (voiceover audible over music)
- [ ] Preview full video at full resolution (RAM preview)
- [ ] Check text readability at 1080p (for viewers on smaller screens)
- [ ] No flickering or artifacts at scene transitions
- [ ] Color consistency between scenes
- [ ] Motion blur looks smooth (not excessive)
- [ ] Final frame holds long enough (NEXERA branding visible for 2-3 seconds)
