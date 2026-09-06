# YafaiOS

A personal educational notebook for Swift, UIKit, and Apple frameworks.

GitHub Pages publishes **`main` → `/docs`** at **https://yafaios.com**. The source remains Jekyll, Liquid, Markdown, CSS, and a small progressive-enhancement script. No Node build is required.

## Preview and build

With Ruby and Bundler installed:

```sh
cd docs
bundle install
bundle exec jekyll serve
```

Open the local URL printed by Jekyll. For a production-style check, run `bundle exec jekyll build --safe`. Use a UTF-8 locale if your Ruby environment defaults to ASCII. GitHub's repository Markdown preview does not render these layouts or styles.

## Add a note

Create a Markdown file under `docs/notes/`:

```yaml
---
title: "CALayer contentsScale"
layout: note
permalink: /notes/core-animation/contents-scale/
category: Frameworks
topic: Core Animation
description: How a layer maps points to backing pixels.
---
```

Write the note below the front matter. `docs/_config.yml` automatically marks files under `notes/` as notes. Use **Swift**, **UIKit**, or **Frameworks** as the category, and reuse a consistent topic name. The note automatically appears in its category, the topic sidebar, and search. The homepage shows up to twelve notes alphabetically; category indexes include all notes. No global navigation edits are needed for individual notes.

Use `##` and `###` for sections: the layout supplies the page's H1 from `title`. Note sections get an automatic on-page navigation list. Choose a permalink once and retain it when moving or renaming the file. If a URL must change, add the old path to `redirect_from`.

Existing note bodies were retained, including the original top-level headings in the two collection stubs. Those can be changed to section headings when expanding the content.

## Code and callouts

Use fenced code with the lowercase language name `swift`. Rouge handles syntax highlighting at build time; JavaScript adds an optional copy button. Code remains readable and scrollable without JavaScript.

Inline code uses normal Markdown backticks. The stylesheet supports six reusable callout classes:

| Class | Label | Meaning |
| --- | --- | --- |
| `note` | Note | Information |
| `important` | Important | Caution or a key rule |
| `tip` | Tip | A useful approach |
| `warning` | Warning | A failure or error |
| `mental-model` | Mental model | A conceptual explanation |
| `common-mistake` | Common mistake | A frequent pitfall |

```html
<div class="warning" markdown="1">
**Warning:** This crashes at runtime.

Use `markdown="1"` when a callout contains Markdown or fenced code.
</div>
```

Always include the written label so meaning is clear without color. Existing HTML callouts containing `<strong>` also work. The old testing page's inline-color experiments are preserved; prefer the semantic classes for new material because they adapt to dark appearance.

## Where to edit

- `docs/_data/navigation.yml`: major categories and their descriptions.
- `docs/_layouts/default.html`: document shell, navigation, sidebar, and footer.
- `docs/_layouts/page.html`: page title and prose container.
- `docs/_layouts/note.html`: note metadata and section navigation.
- `docs/_layouts/category.html`: automatically grouped note indexes.
- `docs/_includes/head.html`: metadata and stylesheet/script loading.
- `docs/assets/css/notesColoring.css`: typography, spacing, syntax colors, callouts, and responsive rules. Shared colors are defined at the top; dark appearance follows the system preference.
- `docs/assets/js/notes.js`: collapsible mobile navigation, code copying, heading navigation, and search.
- `docs/search.json`: generated full-text index of notes only. Downloaded only when a reader searches.

The sidebar lists topics rather than every note. Search shows up to fifty matches and asks readers to refine larger result sets. For a much larger notebook, measure index download size and build time before adding a search service or changing to collections.

## Stable URLs

| Page | URL |
| --- | --- |
| Home | `/` |
| Swift | `/swift.html` (retained) |
| UIKit | `/uikit.html` (retained) |
| Swift notes | `/notes/swift/100/` |
| Existing Swift alias | `/docs/notes/swift/swift100Notes.md/` → `/notes/swift/100/` |
| UIKit notes | `/notes/uikit/100/` (retained) |
| Experiments | `/notes/swift/testing.html` |
| OAuth callback | `/redirects/oauth/` |
| OAuth legacy alias | `/redirects/oauth.html` → `/redirects/oauth/` |

Aliases use GitHub Pages' supported `jekyll-redirect-from` plugin (HTML redirects, not server-side HTTP 301s). Use the exact canonical OAuth URL in provider settings. The callback remains a static landing page; it does not exchange codes, inspect query parameters, or implement application authentication. Keep `docs/CNAME` and the domain's HTTPS configuration intact.

## Audit of the previous structure

- `/docs` was correctly established as the source root. `_includes` and the other special Jekyll directory names are preserved.
- `_config.yml` only set `header_pages`; it did not explicitly select Minima. The installed GitHub Pages gem otherwise supplies Primer as its default theme. `theme: null` now explicitly disables theme fallback because all required layouts are local.
- `_includes/head.html` replaced the entire head include with a link to the nonexistent `assets/css/custom.css`. The actual stylesheet was `notesColoring.css`. The new head includes viewport, title, description, canonical URL, and the real stylesheet.
- The old homepage used `docs/...` links that did not correspond to the site's generated URLs. Category links now use explicit site URLs through `relative_url`.
- The Swift note's permalink exposed a source-like path. Its original output path is retained as an alias.
- `uikit.md` had a copied “Swift Notes” heading; the category is now correctly titled UIKit.
- Testing and OAuth lacked front matter. GitHub Pages' optional-front-matter plugin can process these files, but metadata and an explicit OAuth permalink were missing. Both are now explicit.
- The Swift and UIKit “100” files are still mostly placeholders; no teaching content has been invented or deleted.
- Root `CNAME` is redundant when publishing `/docs`, but retained. Root `LICENSE` and `docs/LICENSE.md` express different licensing scopes; both are preserved, and the site makes no open-source claim. `docs/LICENSE.md` is excluded from site output.

## Validation and rollout

Validation passed with GitHub Pages 232 / Jekyll 3.10 in safe mode: thirteen HTML pages, 193 internal links/assets/anchors, three search records, Swift token markup, redirect targets, and preserved note text. JavaScript syntax also passed. Desktop/mobile browser interactions and visual appearance have not been automatically tested; review the local preview at both widths before publishing.

The redesign is proposed on `redesign/documentation` for review before merging into `main`. Review the built local site before merging; a merge to `main` triggers your existing Pages publishing flow. Keep the Pages source set to `/docs`.

References: [Jekyll front matter](https://jekyllrb.com/docs/front-matter/), [GitHub Pages and Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll).
