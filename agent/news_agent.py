#!/usr/bin/env python3
"""
AI Malayalam News Agent
Fetches today's top tech/AI news, writes Malayalam articles,
and auto-publishes to ai-malayalam.com
"""

import os
import json
import random
import hashlib
import logging
import requests
import feedparser
from datetime import datetime, timezone, timedelta
from dateutil import parser as dateparser
from anthropic import Anthropic
from sources import SOURCES, CATEGORY_IMAGE_KEYWORDS

# ── Logging ────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
log = logging.getLogger(__name__)

# ── Config from environment ────────────────────────────────────
ANTHROPIC_API_KEY   = os.environ["ANTHROPIC_API_KEY"]
UNSPLASH_ACCESS_KEY = os.environ["UNSPLASH_ACCESS_KEY"]
SITE_URL            = os.environ.get("SITE_URL", "https://ai-malayalam.com")
AGENT_SECRET        = os.environ["AGENT_SECRET"]
ARTICLES_PER_DAY    = int(os.environ.get("ARTICLES_PER_DAY", "5"))

client = Anthropic(api_key=ANTHROPIC_API_KEY)

# ── Slugify ────────────────────────────────────────────────────
def slugify(text: str) -> str:
    import re
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_-]+", "-", text)
    text = re.sub(r"^-+|-+$", "", text)
    return text[:80]

# ── Fetch RSS feeds ────────────────────────────────────────────
def fetch_articles_from_source(source: dict) -> list[dict]:
    try:
        feed = feedparser.parse(source["url"])
        articles = []
        cutoff = datetime.now(timezone.utc) - timedelta(hours=36)

        for entry in feed.entries[:15]:
            pub = entry.get("published", entry.get("updated", ""))
            try:
                pub_dt = dateparser.parse(pub)
                if pub_dt and pub_dt.tzinfo is None:
                    pub_dt = pub_dt.replace(tzinfo=timezone.utc)
                if pub_dt and pub_dt < cutoff:
                    continue
            except Exception:
                pass

            summary = entry.get("summary", "")
            # Strip HTML tags from summary
            from bs4 import BeautifulSoup
            summary = BeautifulSoup(summary, "html.parser").get_text()[:500]

            articles.append({
                "title":    entry.get("title", ""),
                "summary":  summary,
                "url":      entry.get("link", ""),
                "category": source["category"],
                "image_keyword": source["image_keyword"],
                "priority": source["priority"],
                "published": pub,
            })
        return articles
    except Exception as e:
        log.warning(f"Failed to fetch {source['url']}: {e}")
        return []

def fetch_all_articles() -> list[dict]:
    all_articles = []
    for source in SOURCES:
        articles = fetch_articles_from_source(source)
        all_articles.extend(articles)
        log.info(f"Fetched {len(articles)} articles from {source['url']}")
    return all_articles

# ── Deduplicate & select best mix ─────────────────────────────
def select_best_articles(articles: list[dict], count: int = 5) -> list[dict]:
    # Deduplicate by title hash
    seen = set()
    unique = []
    for a in articles:
        h = hashlib.md5(a["title"].lower().encode()).hexdigest()
        if h not in seen and len(a["title"]) > 20:
            seen.add(h)
            unique.append(a)

    # Sort by priority (1 = high)
    unique.sort(key=lambda x: x["priority"])

    # Pick one from each category if possible, then fill remaining
    categories = ["ai-news", "tech", "smartphones", "how-to", "ai-tutorials"]
    selected = []
    used_hashes = set()

    for cat in categories:
        if len(selected) >= count:
            break
        cat_articles = [a for a in unique if a["category"] == cat]
        if cat_articles:
            pick = cat_articles[0]
            h = hashlib.md5(pick["title"].lower().encode()).hexdigest()
            if h not in used_hashes:
                selected.append(pick)
                used_hashes.add(h)

    # Fill remaining slots
    for a in unique:
        if len(selected) >= count:
            break
        h = hashlib.md5(a["title"].lower().encode()).hexdigest()
        if h not in used_hashes:
            selected.append(a)
            used_hashes.add(h)

    return selected[:count]

# ── Unsplash image fetch ───────────────────────────────────────
def fetch_cover_image(keyword: str) -> str:
    try:
        url = "https://api.unsplash.com/photos/random"
        params = {
            "query": keyword,
            "orientation": "landscape",
            "content_filter": "high",
        }
        headers = {"Authorization": f"Client-ID {UNSPLASH_ACCESS_KEY}"}
        resp = requests.get(url, params=params, headers=headers, timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            return data["urls"]["regular"]
    except Exception as e:
        log.warning(f"Unsplash fetch failed for '{keyword}': {e}")

    # Fallback to picsum with random seed
    seed = random.randint(200, 999)
    return f"https://picsum.photos/800/450?random={seed}"

# ── Claude: Write Malayalam article ───────────────────────────
def write_malayalam_article(article: dict) -> dict | None:
    prompt = f"""You are a Malayalam tech journalist writing for AI മലയാളം blog (ai-malayalam.com).

SOURCE ARTICLE:
Title: {article['title']}
Summary: {article['summary']}
URL: {article['url']}
Category: {article['category']}

YOUR TASK:
Write a complete Malayalam blog article based on this news. Output ONLY valid JSON, nothing else.

RULES:
1. Title: Catchy Malayalam title (not a direct translation, make it engaging)
2. Summary: 5-8 sentence Malayalam summary — this is the MAIN content shown on homepage cards
3. Body: Full article in Malayalam with ## headings, bullet points, and good detail (300-500 words)
4. All user-facing content MUST be in Malayalam (Unicode)
5. Tags: 3-5 relevant English/Malayalam tags
6. Slug: Short English slug (URL friendly, max 60 chars)

OUTPUT FORMAT (JSON only, no markdown):
{{
  "title": "Malayalam title here",
  "slug": "english-slug-here",
  "summary": "5-8 sentence Malayalam summary here",
  "body": "Full Malayalam article body with ## headings and bullet points",
  "tags": ["tag1", "tag2", "tag3"],
  "featured": false
}}"""

    try:
        resp = client.messages.create(
            model="claude-haiku-4-5",
            max_tokens=2000,
            messages=[{"role": "user", "content": prompt}],
        )
        text = resp.content[0].text.strip()

        # Extract JSON from response
        if "```json" in text:
            text = text.split("```json")[1].split("```")[0].strip()
        elif "```" in text:
            text = text.split("```")[1].split("```")[0].strip()

        data = json.loads(text)

        # Validate required fields
        for field in ["title", "slug", "summary", "body", "tags"]:
            if field not in data:
                raise ValueError(f"Missing field: {field}")

        return data

    except Exception as e:
        log.error(f"Claude failed for article '{article['title']}': {e}")
        return None

# ── Publish to ai-malayalam.com ────────────────────────────────
def publish_article(article_payload: dict) -> bool:
    try:
        resp = requests.post(
            f"{SITE_URL}/api/articles",
            json=article_payload,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {AGENT_SECRET}",
            },
            timeout=20,
        )
        if resp.status_code in (200, 201):
            log.info(f"✅ Published: {article_payload['title']}")
            return True
        else:
            log.error(f"❌ Publish failed ({resp.status_code}): {resp.text[:200]}")
            return False
    except Exception as e:
        log.error(f"❌ Publish exception: {e}")
        return False

# ── Main ───────────────────────────────────────────────────────
def main():
    today = datetime.now(timezone(timedelta(hours=4)))  # GST = UTC+4
    log.info(f"🚀 AI Malayalam News Agent starting — {today.strftime('%Y-%m-%d %H:%M GST')}")

    # 1. Fetch all articles from RSS sources
    log.info("📡 Fetching RSS feeds...")
    all_articles = fetch_all_articles()
    log.info(f"Total raw articles fetched: {len(all_articles)}")

    # 2. Select best 5 (one per category mix)
    selected = select_best_articles(all_articles, ARTICLES_PER_DAY)
    log.info(f"Selected {len(selected)} articles to publish")

    # 3. Write & publish each
    published_count = 0
    for i, source_article in enumerate(selected, 1):
        log.info(f"\n📝 [{i}/{len(selected)}] Writing: {source_article['title'][:60]}...")

        # Write Malayalam article with Claude
        malayalam = write_malayalam_article(source_article)
        if not malayalam:
            continue

        # Fetch relevant cover image from Unsplash
        image_keyword = source_article.get("image_keyword",
            CATEGORY_IMAGE_KEYWORDS.get(source_article["category"], "technology"))
        cover_image = fetch_cover_image(image_keyword)
        log.info(f"🖼️  Image: {cover_image[:60]}...")

        # Build article payload
        now_iso = today.isoformat()
        payload = {
            "title":       malayalam["title"],
            "slug":        malayalam["slug"],
            "category":    source_article["category"],
            "summary":     malayalam["summary"],
            "coverImage":  cover_image,
            "author":      "AI എഡിറ്റർ",
            "publishedAt": now_iso,
            "status":      "published",
            "tags":        malayalam.get("tags", []),
            "featured":    malayalam.get("featured", False),
            "content":     malayalam["body"],
        }

        # Publish to website
        success = publish_article(payload)
        if success:
            published_count += 1

    log.info(f"\n🎉 Done! Published {published_count}/{len(selected)} articles to {SITE_URL}")

if __name__ == "__main__":
    main()
