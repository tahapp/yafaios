---
layout: page
title: The notebook
permalink: /
description: Deep notes on Swift, UIKit, and Apple's development frameworks.
---

A notes-style knowledge base for learning and teaching Apple development. Concise rules, explanations, experiments, and code.

<div class="category-grid">
{% for item in site.data.navigation %}{% if item.category %}
<a class="category-card" href="{{ item.url | relative_url }}"><h2>{{ item.title }} <span aria-hidden="true">↗</span></h2><p>{{ item.description }}</p></a>
{% endif %}{% endfor %}
</div>

## Explore the notes

{% assign notes = site.pages | where: 'is_note', true | sort: 'title' %}
{% include note-list.html notes=notes limit=12 %}
