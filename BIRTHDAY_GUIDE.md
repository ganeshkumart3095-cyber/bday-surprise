# Thangachii Birthday Surprise — Customising Guide

All text, photos, videos and music are set in **`src/config/birthday.ts`**.

## Folders
```
public/images/   → 20 photos (01.jpg … 20.jpg)
public/videos/   → 1–3 videos (.mp4)
public/audio/    → her favourite song (.mp3)
```

## Photos
Upload images to `public/images/`, then in the config replace each `src` with e.g. `"/images/01.jpg"` and edit `caption` / `alt`.
Tip: resize to ~1200px wide for fast loading on phones.

## Videos
Upload to `public/videos/`, set `src: "/videos/clip1.mp4"`, plus `title` and `caption`. Empty `src` shows a "coming soon" card.

## Music
Upload to `public/audio/`, set `musicSrc: "/audio/song.mp3"`. Music only plays when she taps the 🎵 button.

## Text
- `welcomeMessage`, `question`, `finalMessage`
- `letter` — one string per paragraph
- `signature`
- `reasons` — emoji, title, text (add as many as you like)

## Hidden surprises
- Tap anywhere on the background → heart burst
- The wiggling 🎁 under "Why You're Special" reveals secret messages
- The "No" button runs away 😄
