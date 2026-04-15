---
# Blog post template — copy this file, rename to your slug (e.g. `your-post-title.md`),
# and place under `src/content/blog/de/` or `src/content/blog/en/` depending on locale.
# Filename without extension becomes the URL slug.
# Files starting with `_` are ignored by Astro Content Collections.

title: "Your post title here"
excerpt: "One- or two-sentence summary used on the blog index, in previews, and as meta description."

# Required: when this post was first published. Fixed — do not change after publish.
createdAt: 2026-04-14

# Optional: when content was last meaningfully updated. Update only on substantive edits.
# If omitted, only `createdAt` is shown. If set, an "Updated" date appears alongside.
# updatedAt: 2026-04-20

# Required: primary topic. Used for filtering on the blog index page.
# Suggested values: "Decision Enforcement" | "Architecture" | "System Landscape" |
# "Standards & Conventions" | "Pipelines & CI" | "Onboarding" | "Knowledge Transfer"
topic: "Decision Enforcement"

# Optional: additional tags shown as labels on the post and used for filtering.
tags:
  - example
  - architecture

# Optional. Default: "Philipp Höllinger". Override only for guest posts.
# author: "Philipp Höllinger"

# Optional. If omitted, computed from word count at build time (~225 wpm).
# readingTimeMinutes: 5

# Optional cover image (path under /public/ or full URL) and alt text.
# coverImage: "/assets/blog/your-cover.webp"
# coverImageAlt: "Description of the cover image"

# Optional flags.
draft: true        # true = never rendered. Set to false to publish.
featured: false    # true = pinned to top of blog index, regardless of date.
---

## TL;DR

One short paragraph. The single most important takeaway, written so a busy reader can
stop here and still get value. Plain language, no jargon, no questions, no opening with "I".

## Intro

Two to four sentences setting the scene: what observation, situation, or trigger led to
this post. Be specific. Tie to a concrete pattern from the system landscape work.

## Main section 1

The first substantive section. Opens with a concrete claim and supports it with one
example, one mechanism, or one piece of evidence. Two to four short paragraphs.

### Sub-point (optional)

Use sub-headings only when the structure earns it. Most posts are stronger with two or
three top-level sections than with deep nesting.

## Main section 2

The second substantive section. Often: "and the consequence is", "and the mechanism is",
or "and what changes when this is in place".

## Main section 3 (optional)

Only if the post genuinely needs three sections. Otherwise skip — two sections plus
intro and conclusion is plenty for most posts.

## Conclusion

Two to three sentences that close the loop opened in the intro. Restate what changed,
what is now possible, or what the reader should take away.

## Key takeaways

- One sentence. The most important point.
- One sentence. The second most important point.
- One sentence. The third, if relevant. Three to five total, never more than seven.

## Related

- [Related Curfee service or page](/services-or-page-link)
- [Another relevant post](/blog/other-post)
