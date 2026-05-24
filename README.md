# Yingying Liu — Personal Academic Website

Trilingual (English / 中文 / 日本語) static website for [yingyingtokyo.github.io](https://yingyingtokyo.github.io).

## Local preview

```bash
cd ~/Desktop/claude/website
python3 -m http.server 8000
# open http://localhost:8000
```

## File structure

```
index.html            Home page
news.html             News feed with category filter
publications.html     Publications by year
collaborations.html   Collaboration lab cards
assets/css/style.css  All styles (dark theme, responsive)
assets/js/main.js     Language switcher, mobile menu, news filter
images/               Web-served images (tracked by git)
materials/            Original source files (gitignored, local only)
```

## How to edit content

All content is inline HTML. Each translatable piece uses three sibling elements:

```html
<span class="lang-en">English text</span>
<span class="lang-zh">中文文本</span>
<span class="lang-ja">日本語テキスト</span>
```

The JS/CSS will show only the active language. The homepage self-intro is wrapped in
`.always-all-langs` and will always show all three stacked regardless of the switcher.

### Adding a news item

Copy an existing `<article class="news-item" data-category="...">` block in `news.html`.
Set `data-category` to one of: `publication`, `conference`, `talk`, `grant`, `milestone`.

### Adding a publication

Add a new `<li class="pub-item">` block in `publications.html` under the correct year section.
Create a new `<div class="pub-year-section" id="year-XXXX">` if needed, and add a year link
to the `.year-nav` aside.

### Adding images

Drop the image into `images/` and reference it as `images/filename.ext` in the HTML.

## Deploy to GitHub Pages

1. Create the repository at https://github.com/new — name it exactly `yingyingtokyo.github.io`
2. In this directory, run:
   ```bash
   git remote add origin https://github.com/yingyingtokyo/yingyingtokyo.github.io.git
   git branch -M main
   git push -u origin main
   ```
3. On GitHub → Settings → Pages → Source: Deploy from branch `main` / `/ (root)`
4. Site will be live at https://yingyingtokyo.github.io within a few minutes.

## Pending items

- **Graduation photos (2025)**: Add photos for the "Graduate from Yoshimura Lab" news entry.
  Name them and update `news.html` item `#news-grad-utokyo` accordingly.
- Currently `utokyo1.JPG` and `utokyo2.JPG` are used as placeholders for that entry.
