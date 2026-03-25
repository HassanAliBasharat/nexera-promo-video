# NEXERA Promo Video — Assets Guide

Complete list of assets needed to finalize the video after running the scripts.

---

## Fonts

### Montserrat (Required)
- **Download:** https://fonts.google.com/specimen/Montserrat
- **Weights needed:** Light (300), Regular (400), SemiBold (600), Bold (700), Black (900)
- **Installation:** Download the ZIP, extract, and install all .ttf files system-wide
- **Restart After Effects** after installing fonts
- **Fallback:** Scripts reference "Arial" as fallback, but Montserrat is strongly recommended for the intended look

---

## Stock Footage

### Clip 1 — Developer Working (Dark Mood)
- **Used in:** Scene 4 (0:10.5 – 0:14.5)
- **Layer to replace:** `Stock_Footage_1_REPLACE`
- **Duration needed:** 4+ seconds
- **Resolution:** 3840x2160 (4K) preferred, 1920x1080 minimum

**Where to find:**
| Source | Search Terms | Notes |
|--------|-------------|-------|
| [Pexels.com](https://www.pexels.com/search/videos/web%20developer%20working/) | "web developer working" | Free, no attribution required |
| [Pexels.com](https://www.pexels.com/search/videos/coding%20at%20night/) | "coding at night" | Alternative search |
| [Pixabay.com](https://pixabay.com/videos/search/programmer%20working/) | "programmer working" | Free, no attribution |
| [Coverr.co](https://coverr.co/) | "developer", "coding" | Free |

**What to look for:**
- Dark/moody office environment
- Monitor glow illuminating the person
- Close-up of hands on keyboard or screen with code
- Avoid footage with visible branding or distracting UI

### Clip 2 — Person Working on Laptop (Bright/Clean)
- **Used in:** Scene 7 (0:19 – 0:24)
- **Layer to replace:** `Stock_Footage_2_REPLACE`
- **Duration needed:** 5+ seconds
- **Resolution:** 3840x2160 (4K) preferred

**Where to find:**
| Source | Search Terms | Notes |
|--------|-------------|-------|
| [Pexels.com](https://www.pexels.com/search/videos/woman%20working%20laptop/) | "woman working laptop" | Free |
| [Pexels.com](https://www.pexels.com/search/videos/creative%20workspace/) | "creative workspace" | Alternative |
| [Pixabay.com](https://pixabay.com/videos/search/laptop%20office/) | "laptop office" | Free |
| [Coverr.co](https://coverr.co/) | "laptop", "workspace" | Free |

**What to look for:**
- Bright, natural lighting
- Clean modern desk/workspace
- Person actively working (not posed)
- Neutral or minimal background

---

## Background Music

- **Duration needed:** 45–60 seconds (will be trimmed to 47s)
- **Style:** Ambient corporate, cinematic technology, modern minimal
- **Key characteristics:** Building energy, no lyrics, subtle and professional

**Where to find:**
| Source | Search Terms | License |
|--------|-------------|---------|
| [Pixabay.com/music](https://pixabay.com/music/search/ambient%20corporate/) | "ambient corporate" | Free, no attribution |
| [Pixabay.com/music](https://pixabay.com/music/search/cinematic%20technology/) | "cinematic technology" | Free |
| [Uppbeat.io](https://uppbeat.io/) | "corporate ambient" | Free with attribution |
| [Artlist.io](https://artlist.io/) | "tech corporate" | Subscription |
| [Epidemic Sound](https://www.epidemicsound.com/) | "ambient technology" | Subscription |

**Recommended Pixabay tracks (search these exact titles):**
- "Ambient Corporate" by various artists
- "Technology Corporate" by various artists
- "Inspiring Cinematic" by various artists

---

## NEXERA Logo

- **Format:** PNG with transparent background
- **Color:** White (for dark backgrounds) — the scripts use it on both dark and light scenes
- **Recommended size:** 1000x300px or larger
- **Source:** Export from nexera.space brand assets, or request from your designer
- **Placement:** Import into `05_Assets` folder, then drag onto the `NEXERA_Logo_Text` layer in Scene 14 (or place above it and hide the text placeholder)

---

## Voiceover

### Script
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

### Recording Options

**AI Text-to-Speech (Recommended for speed):**
| Service | Quality | Cost | Notes |
|---------|---------|------|-------|
| [ElevenLabs](https://elevenlabs.io/) | Excellent | Free tier (10k chars/mo) | Most natural sounding |
| [Murf.ai](https://murf.ai/) | Very Good | Free tier available | Good studio voices |
| [Play.ht](https://play.ht/) | Good | Free tier | Many voice options |
| [Google Cloud TTS](https://cloud.google.com/text-to-speech) | Good | Free tier (1M chars/mo) | WaveNet voices recommended |

**Voice characteristics to select:**
- Gender: Male or Female (both work well)
- Tone: Calm, confident, modern
- Speed: Medium (not rushed)
- Accent: Neutral/American English

**Recording tips (if recording yourself):**
- Use a quiet room with minimal echo
- Speak at a steady, confident pace
- Leave 0.5s silence at start and end
- Export as WAV (44.1kHz, 16-bit) or high-quality MP3 (320kbps)

---

## How to Replace Placeholder Layers

1. Import your footage/audio into the appropriate project folder
2. In the master comp timeline, find the placeholder solid layer
3. **Alt+click+drag** (Option+drag on Mac) your imported file onto the placeholder layer
4. This replaces the source while keeping all effects, masks, and timing
5. Delete any `_Label_DELETE` text layers (they're just reminders)
