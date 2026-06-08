# RSS Feed Sources — categorized by topic
# Each source maps to a category and image search keyword

SOURCES = [
    # ── AI NEWS ──────────────────────────────────────────────
    {
        "url": "https://techcrunch.com/category/artificial-intelligence/feed/",
        "category": "ai-news",
        "image_keyword": "artificial intelligence technology",
        "priority": 1,
    },
    {
        "url": "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml",
        "category": "ai-news",
        "image_keyword": "artificial intelligence robot",
        "priority": 1,
    },
    {
        "url": "https://feeds.feedburner.com/venturebeat/SZYF",
        "category": "ai-news",
        "image_keyword": "machine learning data",
        "priority": 2,
    },

    # ── TECH NEWS ─────────────────────────────────────────────
    {
        "url": "https://gadgets360.com/rss/news",
        "category": "tech",
        "image_keyword": "technology gadget india",
        "priority": 1,
    },
    {
        "url": "https://techcrunch.com/feed/",
        "category": "tech",
        "image_keyword": "technology innovation",
        "priority": 2,
    },
    {
        "url": "https://www.digit.in/rss/news/",
        "category": "tech",
        "image_keyword": "technology computer",
        "priority": 1,
    },

    # ── SMARTPHONES ───────────────────────────────────────────
    {
        "url": "https://www.gsmarena.com/rss-news-reviews.php3",
        "category": "smartphones",
        "image_keyword": "smartphone mobile phone",
        "priority": 1,
    },
    {
        "url": "https://91mobiles.com/news/feed/",
        "category": "smartphones",
        "image_keyword": "mobile phone india",
        "priority": 1,
    },
    {
        "url": "https://www.androidauthority.com/news/feed/",
        "category": "smartphones",
        "image_keyword": "android smartphone",
        "priority": 2,
    },

    # ── SOCIAL MEDIA TIPS (WhatsApp / Facebook / Instagram) ───
    {
        "url": "https://wabetainfo.com/feed/",
        "category": "how-to",
        "image_keyword": "whatsapp mobile messaging",
        "priority": 1,
    },
    {
        "url": "https://www.androidauthority.com/apps/whatsapp/feed/",
        "category": "how-to",
        "image_keyword": "whatsapp social media",
        "priority": 2,
    },
    {
        "url": "https://about.fb.com/feed/",
        "category": "how-to",
        "image_keyword": "facebook social media",
        "priority": 2,
    },
    {
        "url": "https://9to5google.com/feed/",
        "category": "how-to",
        "image_keyword": "google android tips",
        "priority": 2,
    },

    # ── AI TUTORIALS ──────────────────────────────────────────
    {
        "url": "https://www.makeuseof.com/feed/",
        "category": "ai-tutorials",
        "image_keyword": "tutorial technology learning",
        "priority": 2,
    },
    {
        "url": "https://towardsdatascience.com/feed",
        "category": "ai-tutorials",
        "image_keyword": "data science ai tutorial",
        "priority": 2,
    },
]

# Category image keyword fallbacks
CATEGORY_IMAGE_KEYWORDS = {
    "ai-news": "artificial intelligence technology",
    "ai-tutorials": "tutorial learning technology",
    "tech": "technology innovation",
    "smartphones": "smartphone mobile",
    "how-to": "mobile apps social media",
}
