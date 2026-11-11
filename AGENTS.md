# AGENTS.md

This repo contains "Advanced Web Design" learning materials: HTML/CSS/JS examples, font assets, and design guidance.

## Structure

- `*.html` — topic pages (flex, events, objects, game, etc.)
- `css/` — stylesheets (ldd.css, flex.css, svg005.css)
- `js/` — no dedicated folder; scripts inline or in HTML
- `font/` — iconfont assets (woff2, woff, ttf + demo.html, demo.css)
- `cdn/` — third‑party webfonts (lucide,fontawesome)
- `SKILL/frontend-design/SKILL.md` — frontend design principles

## How to view

Open any `*.html` file in a browser. No build step, no dev server required.

## Font assets

- `font/iconfont.*` — project icon set; reference `font/demo.html` / `font/demo.css` for usage
- `cdn/webfonts/` and `cdn/css/` — external icon fonts (Font Awesome, Lucide); cached for offline use

## Design guidance

Review `SKILL/frontend-design/SKILL.md` before making UI changes. It covers deliberate palette, typography, and layout choices — avoid templated/default designs.

## Adding new content

Place new `*.html` alongside existing topic pages. Add corresponding CSS in `css/` and update `font/` or `cdn/` as needed. Keep design choices intentional per the SKILL guidance.

## Code commenting rules

### New HTML files (mandatory)

Every newly created `*.html` file MUST begin with a comment block inside `<head>` (before `<title>`) containing the author, creation time, the AI model used, and the feature name:

```html
<!--
  作者: 刘丁荣
  建立时间: YYYY-MM-DD HH:mm
  使用大模型: <model name, e.g. GLM-5.3-Flash>
  功能名称: <页面功能简述>
-->
```

### JavaScript functions (mandatory)

Every function in `<script>` blocks MUST have a comment (single-line `//` directly above the function) describing its main functionality, e.g.:

```js
// 实现：点击徽章按钮时购物袋数量 +1，超过 99 显示为 99+
function ldr_increaseBadge() { ... }
```