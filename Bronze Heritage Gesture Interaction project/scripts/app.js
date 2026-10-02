(function(){
  'use strict';
  var root = document.documentElement;
  var langButtons = Array.prototype.slice.call(document.querySelectorAll('[data-lang]'));
  var translatable = Array.prototype.slice.call(document.querySelectorAll('[data-en][data-zh]'));
  var title = { en: 'Bronze Heritage Gesture Interaction', zh: '青铜器手势交互' };



  function setLang(lang){
    root.lang = lang === 'zh' ? 'zh-CN' : 'en';
    translatable.forEach(function(el){
      var next = el.dataset[lang];
      if (next == null) return;
      if (/<\/?[a-z][\s\S]*>/i.test(next)) el.innerHTML = next;
      else el.textContent = next;
    });
    langButtons.forEach(function(btn){
      var on = btn.dataset.lang === lang;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    document.title = title[lang];
    try { localStorage.setItem('bronze-page-lang', lang); } catch(e){}
  }
  var saved = 'en';
  try { saved = localStorage.getItem('bronze-page-lang') === 'zh' ? 'zh' : 'en'; } catch(e){}
  setLang(saved);
  langButtons.forEach(function(btn){
    btn.addEventListener('click', function(){ setLang(btn.dataset.lang); });
  });

  /* anchor nav */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('[data-nav]'));
  function setActiveNav(id){
    navLinks.forEach(function(n){ n.classList.toggle('active', n.dataset.nav === id); });
  }
  ['intro','demo','video'].forEach(function(id){
    var sec = document.getElementById(id);
    if (!sec) return;
    new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if (e.isIntersecting) setActiveNav(id); });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: .01 }).observe(sec);
  });
  /* nav jumps — explicit smooth scroll with sticky-header offset */
  var siteHeader = document.querySelector('.site-header');
  navLinks.forEach(function(a){
    a.addEventListener('click', function(e){
      var hash = a.getAttribute('href');
      if(!hash || hash.charAt(0) !== '#' || hash.length < 2) return;
      var target = document.querySelector(hash);
      if(!target) return;
      e.preventDefault();
      var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var y = target.getBoundingClientRect().top + window.scrollY - (siteHeader ? siteHeader.offsetHeight + 14 : 90);
      window.scrollTo({ top: Math.max(0, y), behavior: reduce ? 'auto' : 'smooth' });
      try { history.replaceState(null, '', hash); } catch(err){}
    });
  });

  /* demo: small window default, manual fullscreen toggle */
  var wrap = document.getElementById('experienceWrap');
  var enterFs = document.getElementById('experienceEnterFs');
  var exitFs = document.getElementById('experienceExitFs');
  var openExternal = document.getElementById('experienceOpenExternal');
  function enterFullscreen(){
    wrap.classList.add('is-fullscreen');
    enterFs.hidden = true; exitFs.hidden = false;
  }
  function exitFullscreen(){
    wrap.classList.remove('is-fullscreen');
    enterFs.hidden = false; exitFs.hidden = true;
  }
  enterFs.addEventListener('click', enterFullscreen);
  exitFs.addEventListener('click', exitFullscreen);
  openExternal.addEventListener('click', function(){
    window.open('https://cooleli.github.io/Bronze-Ware-Interaction/', '_blank', 'noopener,noreferrer');
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && wrap.classList.contains('is-fullscreen')) exitFullscreen();
  });

  /* back to top — bottom-right, with text label */
  var backToTop = document.getElementById('backToTop');
  backToTop.addEventListener('click', function(){
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });
})();
(function(){
  'use strict';
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* scroll reveal */
  var revealSel = '.hero-panel, .section-kicker, .section h2, .section-intro, .subhead,'
    + ' .outline-card, .demo-tip, .experience-frame-wrap, .demo-note,'
    + ' .video-frame, .video-note, .bronzes';
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(revealSel));
  revealEls.forEach(function(el){ el.classList.add('reveal'); });
  if(reduced || !('IntersectionObserver' in window)){
    revealEls.forEach(function(el){ el.classList.add('in'); });
  } else {
    var ro = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('in'); ro.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function(el){ ro.observe(el); });
  }
  /* five bronzes: horizontal swipe carousel */
  var carTrack = document.getElementById('carTrack');
  var carCards = carTrack ? Array.prototype.slice.call(carTrack.querySelectorAll('.car-card')) : [];
  var carCount = document.getElementById('carCount');
  var carDots = Array.prototype.slice.call(document.querySelectorAll('#carDots button'));
  var carTicking = false;
  function carStep(){ return carCards.length ? carCards[0].offsetWidth + 18 : 320; }
  function carIndex(){
    var center = carTrack.scrollLeft + carTrack.clientWidth / 2, best = 0, bestD = Infinity;
    carCards.forEach(function(c, i){
      var d = Math.abs((c.offsetLeft + c.offsetWidth / 2) - center);
      if(d < bestD){ bestD = d; best = i; }
    });
    return best;
  }
  function carUpdate(){
    carTicking = false;
    if(!carCards.length) return;
    var i = carIndex();
    if(carCount) carCount.textContent = ('0' + (i + 1)).slice(-2) + ' / 05';
    carDots.forEach(function(d, k){ d.classList.toggle('on', k === i); });
  }
  function carRequest(){ if(!carTicking){ carTicking = true; requestAnimationFrame(carUpdate); } }
  if(carTrack && carCards.length){
    carTrack.addEventListener('scroll', carRequest, { passive: true });
    window.addEventListener('resize', carRequest);
    document.getElementById('carPrev').addEventListener('click', function(){
      carTrack.scrollBy({ left: -carStep(), behavior: 'smooth' });
    });
    document.getElementById('carNext').addEventListener('click', function(){
      carTrack.scrollBy({ left: carStep(), behavior: 'smooth' });
    });
    carDots.forEach(function(d, i){
      d.addEventListener('click', function(){
        carCards[i].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      });
    });
    /* mouse drag to swipe (touch uses native swipe) */
    var mDown = false, mX = 0, mScroll = 0;
    carTrack.addEventListener('pointerdown', function(e){
      if(e.pointerType !== 'mouse') return;
      if(e.target.closest && e.target.closest('.sc-wipe-knob')) return;
      mDown = true; mX = e.clientX; mScroll = carTrack.scrollLeft;
      carTrack.classList.add('dragging');
    });
    window.addEventListener('pointermove', function(e){
      if(!mDown) return;
      carTrack.scrollLeft = mScroll - (e.clientX - mX);
    });
    window.addEventListener('pointerup', function(){
      mDown = false; carTrack.classList.remove('dragging');
    });
    carTrack.addEventListener('dragstart', function(e){ e.preventDefault(); });
    carUpdate();
  }
  /* hero spotlight: mouse illuminates the particle backdrop */
  var heroPanel = document.querySelector('.hero-panel');
  if(heroPanel){
    heroPanel.addEventListener('pointermove', function(e){
      var r = heroPanel.getBoundingClientRect();
      heroPanel.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(2) + '%');
      heroPanel.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(2) + '%');
      heroPanel.classList.add('lit');
    });
    heroPanel.addEventListener('pointerleave', function(){ heroPanel.classList.remove('lit'); });
  }
  /* card state: two-state toggle + per-card wipe slider */
  function setCardWipe(card, pct, instant){
    pct = Math.max(0, Math.min(100, pct));
    if(instant) card.classList.add('wiping');
    card.style.setProperty('--wipe', pct + '%');
    return pct;
  }
  var toggleWrap = document.getElementById('stackToggle');
  var toggleBtns = toggleWrap ? Array.prototype.slice.call(toggleWrap.querySelectorAll('.st-btn')) : [];
  function markToggle(state){
    toggleBtns.forEach(function(b){
      var on = (b.getAttribute('data-s') === state);
      b.classList.toggle('on', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
  }
  if(toggleWrap){
    toggleBtns.forEach(function(btn){
      btn.addEventListener('click', function(){
        var pct = btn.getAttribute('data-s') === 'solid' ? 100 : 0;
        carCards.forEach(function(card){
          card.classList.remove('wiping');
          setCardWipe(card, pct, false);
        });
        markToggle(btn.getAttribute('data-s'));
      });
    });
  }
  /* drag the knob to morph particle <-> solid */
  carCards.forEach(function(card){
    var knob = card.querySelector('.sc-wipe-knob');
    var media = card.querySelector('.sc-media');
    if(!knob || !media) return;
    var wiping = false;
    knob.addEventListener('pointerdown', function(e){
      e.stopPropagation();
      wiping = true;
      knob.setPointerCapture(e.pointerId);
    });
    knob.addEventListener('pointermove', function(e){
      if(!wiping) return;
      var r = media.getBoundingClientRect();
      var pct = setCardWipe(card, (e.clientX - r.left) / r.width * 100, true);
      if(pct > 0 && pct < 100) markToggle('none');
      else markToggle(pct === 100 ? 'solid' : 'particle');
    });
    function endWipe(){
      wiping = false;
      card.classList.remove('wiping');
    }
    knob.addEventListener('pointerup', endWipe);
    knob.addEventListener('pointercancel', endWipe);
  });
})();
