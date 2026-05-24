(function () {
  'use strict';

  /* ── Language switcher ─────────────────────────────────── */
  const LANGS = ['en', 'zh', 'ja'];
  const LANG_LABELS = { en: 'EN', zh: '中文', ja: '日本語' };
  const SITE_TITLES = { en: 'Yingying Liu', zh: '柳莹莹个人主页', ja: 'Yingying Liu' };

  function setLang(lang) {
    if (!LANGS.includes(lang)) lang = 'en';
    document.documentElement.dataset.lang = lang;
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang === 'ja' ? 'ja' : 'en';
    localStorage.setItem('yl-lang', lang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    const brand = document.querySelector('.nav-brand');
    if (brand) brand.textContent = SITE_TITLES[lang];
  }

  function initLang() {
    const saved = localStorage.getItem('yl-lang') || 'en';
    setLang(saved);
  }

  /* ── Mobile nav toggle ──────────────────────────────────── */
  function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const links  = document.querySelector('.nav-links');
    if (!toggle || !links) return;
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    // close on outside click
    document.addEventListener('click', e => {
      if (!toggle.contains(e.target) && !links.contains(e.target)) {
        links.classList.remove('open');
      }
    });
  }

  /* ── Active nav link highlight ──────────────────────────── */
  function highlightNav() {
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
      const href = a.getAttribute('href').split('/').pop();
      a.classList.toggle('active', href === path);
    });
  }

  /* ── News category filter ───────────────────────────────── */
  function initNewsFilter() {
    const btns  = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.news-item');
    if (!btns.length) return;

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.cat;
        items.forEach(item => {
          if (cat === 'all') {
            item.classList.remove('hidden');
          } else {
            item.classList.toggle('hidden', item.dataset.category !== cat);
          }
        });
      });
    });
  }

  /* ── DOM ready ──────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initLang();
    initMobileNav();
    highlightNav();
    initNewsFilter();

    // Wire up lang buttons (added to every page)
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });
  });
})();
