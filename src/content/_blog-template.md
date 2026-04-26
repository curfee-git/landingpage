---
# Blog post template: copy this file into `src/content/blog/` and rename to
# your slug (e.g. `your_post_title.md`). Filename without extension becomes
# the URL slug. This file itself sits outside `src/content/blog/` so it is
# never picked up by the blog collection.
#
# Structure mirrors the canonical post `ai_generated_code_exposes_your_pipeline.md`:
#   - frontmatter (below)
#   - intro: 2–3 short paragraphs, no heading
#   - 6–7 H2 sections, no H3 sub-headings
#   - all external references cited inline as Markdown links
#   - one internal CTA woven into the body near the end
#     (e.g. `[a structural diagnosis](/#services)` or `[Curfee](/)`)
#
# Do NOT add a manual "References" section. External links cited inline
# are collected automatically by `extractReferences()` in
# `src/utils/blog.ts` and rendered as the numbered references card at
# the bottom of the post (see `src/pages/blog/[slug].astro`). A manual
# list would duplicate that card.

title: "Your post title here"
excerpt: "One- or two-sentence summary used on the blog index, in previews, and as meta description."

# Required: when this post was first published. Fixed. Do not change after publish.
createdAt: 2026-04-14

# Optional: when content was last meaningfully updated. Update only on substantive edits.
# If omitted, only `createdAt` is shown. If set, an "Updated" date appears alongside.
# updatedAt: 2026-04-20

# Required: primary topic. Used for filtering on the blog index page.
# Suggested values: "Decision Enforcement" | "Architecture" | "System Landscape" |
# "Standards & Conventions" | "Pipelines & CI" | "Onboarding" | "Knowledge Transfer" |
# "AI-Assisted Development"
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
---

Opening paragraph. Two to four sentences that set the scene: the observation, situation, or trigger that led to this post. Be specific. Tie it to a concrete pattern from the system landscape work. No heading above this paragraph. The post title in the frontmatter is rendered as H1.

Second paragraph. Extend the opening: name the tension or contradiction this post resolves, the part that is usually misread, or the assumption the rest of the post will dismantle. Keep it concrete. No jargon, no questions, no opening with "I".

## First substantive section

Opens with a concrete claim and supports it with one example, one mechanism, or one piece of evidence. Two to four short paragraphs. Cite external sources inline as Markdown links, e.g. [architectural fitness functions](https://martinfowler.com/articles/evo-arch-forward.html), which will be collected into the references card at the bottom automatically.

## Second substantive section

The "and the consequence is" section. Extend the mechanism, show what breaks when it is missing, or describe the second-order effect.

## Third substantive section

Often: "and what changes when this is in place". Name the shift concretely. Avoid abstractions that could apply to any post.

## Fourth substantive section

If the argument needs it. Most posts benefit from four to six H2 sections; skip any that do not earn their place. Never nest H3 sub-headings. If a section needs them, it is two sections.

## What this changes for the architect / the team / the system

Near the end, include one section that translates the argument into a role-level consequence. This is where the internal CTA belongs, e.g. "If this pattern applies to your current situation, [a structural diagnosis](/#services) is often the quickest way to identify where the system is absorbing the load." Keep it one sentence, natural, not a banner.

## Closing section

Two to three short paragraphs that close the loop opened in the intro. Restate what changed, what is now possible, or what the reader should take away. End with a single short line (one sentence, sometimes a fragment) that lands the argument.
