(function () {
  'use strict';

  /* ── Language switcher ─────────────────────────────────── */
  const LANGS = ['en', 'zh', 'ja'];
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

  /* ── Mobile nav toggle ──────────────────────────────────── */
  function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const links  = document.querySelector('.nav-links');
    if (!toggle || !links) return;
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    document.addEventListener('click', e => {
      if (!toggle.contains(e.target) && !links.contains(e.target))
        links.classList.remove('open');
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
          item.classList.toggle('hidden', cat !== 'all' && item.dataset.category !== cat);
        });
        // Scroll to first visible item
        const first = Array.from(items).find(i => !i.classList.contains('hidden'));
        if (first) {
          const offset = first.getBoundingClientRect().top + window.scrollY - 90;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
      });
    });
  }

  /* ── Video play overlay ─────────────────────────────────── */
  function initVideoOverlays() {
    document.querySelectorAll('.video-wrapper').forEach(wrapper => {
      const video   = wrapper.querySelector('video');
      const overlay = wrapper.querySelector('.video-play-overlay');
      if (!video || !overlay) return;

      overlay.addEventListener('click', () => {
        video.play();
        overlay.style.display = 'none';
        video.controls = true;
      });

      video.addEventListener('pause', () => {
        if (video.currentTime > 0 && video.currentTime < video.duration) {
          overlay.style.display = 'flex';
          video.controls = false;
        }
      });

      video.addEventListener('ended', () => {
        overlay.style.display = 'flex';
        video.controls = false;
      });
    });
  }

  /* ── Research map lightbox ──────────────────────────────── */
  function initImageLightbox() {
    const lightbox  = document.getElementById('img-lightbox');
    if (!lightbox) return;
    const lbImg     = document.getElementById('lightbox-img');
    const backdrop  = lightbox.querySelector('.lightbox-backdrop');
    const closeBtn  = lightbox.querySelector('.lightbox-close');

    let scale = 1;
    const MIN_SCALE = 1, MAX_SCALE = 6;

    function openLightbox(src, alt) {
      lbImg.src = src;
      lbImg.alt = alt || '';
      scale = 1;
      lbImg.style.transform = '';
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
      scale = 1;
      lbImg.style.transform = '';
    }

    // Open when research map image is clicked
    document.querySelectorAll('.research-map-figure img').forEach(img => {
      img.addEventListener('click', () => openLightbox(img.src, img.alt));
    });

    backdrop.addEventListener('click', closeLightbox);
    closeBtn.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
    });

    // Scroll-wheel zoom (desktop)
    lbImg.addEventListener('wheel', e => {
      e.preventDefault();
      scale += e.deltaY < 0 ? 0.18 : -0.18;
      scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale));
      lbImg.style.transform = scale === 1 ? '' : `scale(${scale.toFixed(2)})`;
    }, { passive: false });
  }

  /* ── DOM ready ──────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    setLang(localStorage.getItem('yl-lang') || 'en');
    initMobileNav();
    highlightNav();
    initNewsFilter();
    initVideoOverlays();
    initImageLightbox();

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });
  });
})();
