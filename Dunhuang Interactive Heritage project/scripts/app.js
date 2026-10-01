(function(){
  'use strict';
  var root = document.documentElement;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- language ---------- */
  var langButtons = Array.prototype.slice.call(document.querySelectorAll('[data-lang]'));
  var translatable = Array.prototype.slice.call(document.querySelectorAll('[data-en][data-zh]'));
  var pageTitle = { en: 'Stone Reveal — Dunhuang Interactive Heritage', zh: '石之显影 — 敦煌互动文化遗产' };
  function setLang(lang){
    var lg = lang === 'zh' ? 'zh' : 'en';
    translatable.forEach(function(el){
      var v = el.getAttribute(lg === 'zh' ? 'data-zh' : 'data-en');
      if (v === null) return;
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') { el.setAttribute('placeholder', v); return; }
      el.innerHTML = v;
    });
    langButtons.forEach(function(b){
      var active = b.getAttribute('data-lang') === lg;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    root.setAttribute('lang', lg === 'zh' ? 'zh-CN' : 'en');
    document.title = pageTitle[lg];
    try { localStorage.setItem('dunhuang-page-lang', lg); } catch(e){}
  }
  var saved = 'en';
  try { saved = localStorage.getItem('dunhuang-page-lang') === 'zh' ? 'zh' : 'en'; } catch(e){}
  setLang(saved);
  langButtons.forEach(function(btn){
    btn.addEventListener('click', function(){ setLang(btn.getAttribute('data-lang')); });
  });

  /* ---------- smooth anchor scroll with header offset ---------- */
  var siteHeader = document.querySelector('.site-header');
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var hash = a.getAttribute('href');
      if(!hash || hash.charAt(0) !== '#' || hash.length < 2) return;
      var target = document.querySelector(hash);
      if(!target) return;
      e.preventDefault();
      var y = target.getBoundingClientRect().top + window.scrollY - (siteHeader ? siteHeader.offsetHeight + 14 : 90);
      window.scrollTo({ top: Math.max(0, y), behavior: reduced ? 'auto' : 'smooth' });
      try { history.replaceState(null, '', hash); } catch(err){}
      document.querySelectorAll('.nav-link').forEach(function(n){
        n.classList.toggle('active', n.getAttribute('href') === hash);
      });
    });
  });
  document.getElementById('downArrow').addEventListener('click', function(){
    var t = document.getElementById('acts');
    var y = t.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top: Math.max(0, y), behavior: reduced ? 'auto' : 'smooth' });
  });

  /* ---------- scroll line-mask + fade reveals ---------- */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('.ml, .fade-up').forEach(function(el, i){
    if (el.classList.contains('fade-up')) el.style.transitionDelay = Math.min((i % 4) * 90, 270) + 'ms';
    io.observe(el);
  });

  /* ---------- cinematic parallax : images breathe with scroll ---------- */
  var pxImgs = Array.prototype.slice.call(document.querySelectorAll('.px-frame .px'));
  var ticking = false;
  function parallax(){
    ticking = false;
    if (reduced) return;
    var vh = window.innerHeight;
    pxImgs.forEach(function(img){
      var frame = img.parentElement;
      if(frame.closest && frame.closest('.act')){img.style.transform='none';return;}
      var r = frame.getBoundingClientRect();
      if (r.bottom < -vh || r.top > vh * 2) return;
      var p = (vh - r.top) / (vh + r.height);
      p = Math.max(0, Math.min(1, p));
      var scale = 1.22 - p * 0.14;
      var y = (p - 0.5) * 10;
      img.style.transform = 'scale(' + scale.toFixed(4) + ') translateY(' + y.toFixed(2) + '%)';
    });
  }
  function onScroll(){ if (!ticking) { ticking = true; requestAnimationFrame(parallax); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  parallax();

  /* ---------- film card : click to play ---------- */
  var filmCard = document.getElementById('filmCard');
  var filmError = document.getElementById('filmError');
  var filmSrc = 'https://raw.githubusercontent.com/CoolEli/dunhuang-gesture-buddha/main/dunhuang-interaction-demo.mp4';
  function playFilm(){
    if (filmCard.classList.contains('playing')) return;
    filmCard.classList.add('playing');
    filmError.hidden = true;
    filmCard.removeAttribute('role');
    filmCard.removeAttribute('tabindex');
    var v = document.createElement('video');
    v.setAttribute('controls', '');
    v.setAttribute('playsinline', '');
    v.setAttribute('preload', 'metadata');
    v.src = filmSrc;
    v.addEventListener('error', function(){
      v.remove();
      filmCard.classList.remove('playing');
      filmCard.setAttribute('role', 'button');
      filmCard.setAttribute('tabindex', '0');
      filmError.hidden = false;
    });
    filmCard.appendChild(v);
    var pr = v.play();
    if (pr && pr.catch) pr.catch(function(){});
  }
  filmCard.addEventListener('click', playFilm);
  filmCard.addEventListener('keydown', function(e){
    if (e.target !== filmCard || filmCard.classList.contains('playing')) return;
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); playFilm(); }
  });

  /* ---------- demo : small window default, manual fullscreen toggle ---------- */
  var wrap = document.getElementById('experienceWrap');
  var enterFs = document.getElementById('experienceEnterFs');
  var exitFs = document.getElementById('experienceExitFs');
  var openExternal = document.getElementById('experienceOpenExternal');
  var experienceFrame = wrap.querySelector('iframe');
  function enterFullscreen(){
    wrap.classList.add('is-fullscreen');
    document.body.classList.add('demo-fullscreen');
    enterFs.hidden = true; exitFs.hidden = false;
    exitFs.focus({ preventScroll: true });
  }
  function exitFullscreen(){
    wrap.classList.remove('is-fullscreen');
    document.body.classList.remove('demo-fullscreen');
    enterFs.hidden = false; exitFs.hidden = true;
    enterFs.focus({ preventScroll: true });
  }
  enterFs.addEventListener('click', enterFullscreen);
  exitFs.addEventListener('click', exitFullscreen);
  openExternal.addEventListener('click', function(){
    window.open(experienceFrame.src, '_blank', 'noopener,noreferrer');
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && wrap.classList.contains('is-fullscreen')) exitFullscreen();
  });

  /* ---------- back to top ---------- */
  document.getElementById('backToTop').addEventListener('click', function(){
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  });
})();
