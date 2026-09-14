---
title: "Google Gemini September Update — 3.5 Transcribe Launch, Code Repository Upload, Workspace Custom Instructions!"
slug: "google-gemini-3-5-transcribe-workspace-updates-september-2026"
category: "ai-news"
summary: "Google Gemini September 2026 major updates: Gemini 3.5 Transcribe — 85+ languages speech-to-text generally available. Entire code repository (1,000 files, 100MB) upload ചെയ്‌ത് analyze ചെയ്യൂ. Workspace custom instructions expand ആകൂ. Google Home Gemini improvements. gemini-omni-flash-preview September 30-ന് deprecated. India developers-ന് Gemini API guide."
coverImage: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=800"
author: "AI എഡിറ്റർ"
publishedAt: "2026-09-13T14:00:00+05:30"
status: "published"
tags: ["Google Gemini", "Gemini 3.5", "Transcribe", "Workspace", "AI Update", "September 2026"]
featured: false
---

Google Gemini September-ൽ ഒന്നിലധികം major updates — developers-ൻ്റ് ജീവിതം easier ആകൂ!

## Gemini 3.5 Transcribe — Generally Available

**Launch date:** September 2026
**Status:** GA (Generally Available) — production use ചെയ്യൂ

### Key Features

**85+ languages support:** Malayalam, Tamil, Telugu, Hindi, Bengali — fully support ചെയ്‌ത്

**High accuracy + low latency:**
- Non-streaming speech-to-text
- Word-level timestamps
- Speaker diarization (ആര് speak ചെയ്‌തു automatically identify ചെയ്‌ത്)

**Comparison:**
| Feature | Gemini 3.5 Transcribe | Whisper (OpenAI) | AWS Transcribe |
|---------|----------------------|-----------------|----------------|
| Languages | 85+ | 99 | 75+ |
| Malayalam | ✅ Good | ✅ Fair | ❌ |
| Speaker ID | ✅ Yes | ❌ | ✅ Yes |
| Streaming | ❌ | ❌ | ✅ |
| Price | Low | Free/Paid | Pay-per-use |

### Kerala Developers-ന് Use Cases

**Court recordings:**
```python
# Gemini Transcribe — Malayalam court proceedings
import google.generativeai as genai

audio_file = genai.upload_file("court_hearing.mp3")
model = genai.GenerativeModel("gemini-3.5-transcribe")
result = model.generate_content(audio_file)
print(result.text)  # Malayalam transcript with speaker labels
```

**Medical documentation:** Doctor-patient conversation → automatic medical notes
**Journalism:** Interview recordings → article draft
**Education:** Lecture recordings → study notes

## Code Repository Upload — Game Changer!

Gemini-ൻ്റ് biggest developer feature:

**New:** ഒരു **entire code repository** Gemini-ൽ upload ചെയ്‌ത് analyze ചെയ്യൂ!

**Limits:**
- 1 folder per conversation
- Max 1,000 files
- Max 100MB folder size
- Directly device-ൽ നിന്ന് upload

**Use ചെയ്‌ത് ചെയ്‌ത് ചെയ്‌ത് ചെയ്‌ത് ഇങ്ങനെ:**
```
Gemini.google.com → + button → Upload folder →
"ഈ entire codebase review ചെയ്‌ത് security vulnerabilities identify ചെയ്‌ത്"
```

**Kerala startup founders-ന് practical use:**
- "ഈ React app-ൻ്റ് performance bottlenecks explain ചെയ്‌ത്"
- "ഈ Python backend-ൽ SQL injection vulnerabilities ഉണ്ടോ?"
- "ഈ codebase-ൻ്റ് architecture diagram create ചെയ്‌ത്"
- "ഈ functions-് test cases write ചെയ്‌ത്"

## Workspace Custom Instructions — Expanded

Google Workspace-ൽ Gemini custom instructions ഇനി more surfaces-ൽ:

**Before:** Only Google Docs
**Now:** Gmail, Sheets, Slides, Meet-ലും

**Setup:**
```
Google Workspace → Gemini Settings → Custom Instructions →
"Professional Malayalam responses prefer ചെയ്‌ത്.
Kerala business context-ൽ answer ചെയ്‌ത്.
Technical terms English-ൽ, explanations Malayalam-ൽ."
```

**Practical benefit:** ഒരിക്കൽ set ചെയ്‌ത് — every Gemini interaction automatically personalized!

## Google Home — Gemini Improvements

**Fixed issues (September update):**
- Voice commands: Media + smart home combined commands ഇനി work ആകൂ
  - "Play Malayalam songs and dim the bedroom lights" — ഒരേ command-ൽ!
- Alarms: "Set alarm for 6 AM" — previously failed, ഇനി fixed
- Google Keep: "Add milk to my shopping list" — voice through Home speaker

**Kerala smart home users:**
- "OK Google, AC 22 degrees-ൽ set ചെയ്‌ത് bedroom light off ചെയ്‌ത്" — ഇനി single command!

## Important: gemini-omni-flash-preview Deprecated

**Alert:** September 30, 2026-ഓടെ `gemini-omni-flash-preview` endpoint deprecated ആകൂ!

**Developers ഇന്ന് migrate ചെയ്യൂ:**
```python
# Old (deprecated September 30)
model = "gemini-omni-flash-preview"

# New (use this)
model = "gemini-2.5-flash"  # or gemini-3.5-flash
```

**Action:** API usage check ചെയ്‌ത് old model references update ചെയ്‌ത് — production break ആകൂ September 30 after.

## Gemini API — India Pricing

Free tier (developers):
- Gemini 2.5 Flash: 1M tokens/day free
- Gemini 3.5 Transcribe: 60 minutes/day free
- Image generation: 100 images/day free

Paid tier:
- Gemini 2.5 Pro: $0.00125/1K tokens input
- Gemini 3.5 Transcribe: $0.003/minute

**India advantage:** Rupee billing available — GST invoice കിട്ടൂ, TDS claim ചെയ്യൂ.

Gemini 3.5 Transcribe ഇന്ന് try ചെയ്‌ത് — Malayalam audio AI transcript ആക്കൂ! aistudio.google.com-ൽ free access. 🎙️✨
