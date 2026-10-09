(function () {
  'use strict';

  var IMG = './';
  var RED = '#f2501f', WHITE = '#ffffff';
  var SLICES = 6;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var lang = 'en';

  var WORKS_A = [
    { img: 'desktop-storage.jpg', year: '2018',
      en: 'DESKTOP STORAGE', zh: '桌面收纳',
      descEn: 'A modular pen holder inspired by ancient Chinese city walls. Modules recombine to flexibly adjust storage capacity; two dice with playful faces invite fidgeting — a small ritual for easing stress.',
      descZh: '以中国古代城墙为造型意象的模块化笔筒。模块自由组合，灵活调整收纳容量；两枚表情各异的骰子藏着轻量互动，闲时把玩、顺手解压。' },
    { img: 'harvest-desk-lamp.jpg', year: '2019',
      en: 'HARVEST DESK LAMP', zh: '丰收桌面收纳灯',
      descEn: 'A desk lamp designed around the joy of harvest. Its glowing "fruits" can be picked and placed wherever light is needed; the base doubles as desktop storage.',
      descZh: '以“收获的喜悦”为灵感的桌面台灯。光源化作可摘取的“果实”，随手取用、随处安放；底座兼具桌面置物功能。' },
    { img: 'storytelling-machine.jpg', year: '2019',
      en: 'STORYTELLING MACHINE', zh: '故事演绎机',
      descEn: 'A storytelling companion for children\u2019s imagination and expression. Using "people, events and objects" as narrative threads, it turns wild imagination into scenes you can see and stories you can tell.',
      descZh: '陪伴儿童想象力与表达的故事装置。以“人、事、物”为叙事线索，把天马行空的想象变成看得见、讲得出的故事。' },
    { img: 'white-noise-sleep-aid.jpg', year: '2020',
      en: 'WHITE NOISE SLEEP AID', zh: '白噪音助眠仪',
      descEn: 'Undergraduate thesis project. A white-noise sleep-aid device with chess-game interaction, designed for insomnia \u2014 a common struggle among older adults. Hearing, vision and smell work together to ease users into sleep.',
      descZh: '本科毕业设计。融合棋类互动的白噪音助眠设备，针对老年人常见的失眠困扰，以听觉、视觉与嗅觉三重感官助人安然入睡。' },
    { img: 'treehole-coffee-machine.jpg', year: '2020',
      en: 'TREE HOLE COFFEE MACHINE', zh: '树洞咖啡机',
      descEn: 'Inspired by squirrels stashing food in tree hollows \u2014 every rummage a different surprise. The spirit of "exploration and the unknown" is woven into the coffee ritual.',
      descZh: '灵感来自松鼠在树洞储食——每次翻找都有不同惊喜。将“探索与未知”融进每一次煮咖啡的仪式。' },
    { img: 'mixed-reality-telemedicine-system.jpg', year: '2021',
      en: 'MIXED-REALITY TELEMEDICINE', zh: '混合现实远程医疗系统',
      descEn: 'Bringing mixed reality into telemedicine to extend medical expertise to underserved regions \u2014 synchronizing surgeons\u2019 actions in real time for remote observation and guidance.',
      descZh: '将混合现实引入远程医疗，让优质医疗能力向资源匮乏的地区延伸——实时同步医生操作，清晰呈现异地手术进程。' }
  ];

  var WORKS_B = [
    { img: 'zen-desk-night-lamp.jpg', year: '2023',
      en: 'ZEN DESK NIGHT LAMP', zh: '静山·禅意桌面夜灯',
      descEn: 'Rooted in Eastern Zen aesthetics \u2014 high-fired natural stone base, soft pebble-form shade glowing with moon-like warmth. A quiet visual and spiritual refuge on the desktop.',
      descZh: '以东方禅意美学为灵感：天然石材高温烧制灯座，卵石形态灯罩透出温润如月的光晕，为都市人群营造桌面上的精神栖息地。' },
    { img: 'message-desk-lamp.jpg', year: '2023',
      en: 'MESSAGE DESK LAMP', zh: '光笺·桌面留言台灯',
      descEn: 'The lighting area doubles as a memo space \u2014 a soft halo that sets off handwritten notes. A desktop companion balancing utility and ritual.',
      descZh: '照明区域与留言便签合二为一：灯光亮起时，柔和光晕与手写留言相互映衬，兼顾实用性与仪式感。' },
    { img: 'high-bay-light.jpg', year: '2024',
      en: 'HIGH BAY LIGHT', zh: '工矿灯',
      descEn: 'For high-bay plants, warehouses and industrial workshops in the Middle East \u2014 one-piece die-cast aluminum heatsink, UV- and heat-resistant coating, precision optics and wide-voltage compatibility.',
      descZh: '针对中东高棚厂房、仓储物流与工业车间：高纯度压铸铝一体成型散热、抗紫外线耐高温涂层、精准配光、宽电压适配。' },
    { img: 'tri-proof-light.jpg', year: '2024',
      en: 'TRI-PROOF LIGHT', zh: '三防灯',
      descEn: 'Built for harsh environments \u2014 parking lots, tunnels, chemical plants and cold storage. High ingress protection, anti-corrosion housing, modular quick-connection.',
      descZh: '专为严苛环境打造：停车场、隧道、化工厂及冷库。高防护等级、耐腐蚀外壳、模块化快速拼接。' },
    { img: 'sports-field-light.jpg', year: '2024',
      en: 'SPORTS FIELD LIGHT', zh: '球场灯',
      descEn: 'Multi-module matrix design with anti-glare shields and high-transmittance lenses \u2014 high CRI, flicker-free, meeting the demands of HD-broadcast events.',
      descZh: '多模块矩阵设计，专业防眩光遮光罩与高透光率透镜，高显色、无频闪，满足高清转播级赛事要求。' },
    { img: 'floodlight.jpg', year: '2024',
      en: 'FLOODLIGHT', zh: '泛光灯',
      descEn: 'For facades, ports and plazas \u2014 die-cast aluminum housing, tempered glass, adjustable beam angles, breather valve and dust-sealed interior for desert climates.',
      descZh: '适用于建筑外墙、港口码头与广场：压铸铝外壳、钢化玻璃、可调光学角度，呼吸阀与防尘密封应对沙漠气候。' }
  ];

  var DEFAULTS = {
    A: { en: 'ACADEMIC', zh: '在校设计',
         descEn: 'Product design explorations from undergraduate and master\u2019s studies \u2014 concept development, ergonomics and interactive narratives.',
         descZh: '本科及硕士阶段的产品设计探索，覆盖概念开发、人机工程与交互叙事。' },
    B: { en: 'COMMERCIAL', zh: '商业设计',
         descEn: 'Professional product practice in the lighting industry \u2014 designed for real markets, engineering constraints and mass production.',
         descZh: '任职照明企业的产品实践，面向真实市场、工程约束与量产交付。' }
  };

  var badgeEl = document.getElementById('badge');
  var badgeTarget = null;
  var hintEl = document.getElementById('hint');
  var sections = [];
  var scrollCooldownUntil = 0; /* suppress hover during programmatic centering */
  function memberAt(sec, i) { return sec.membersEl.querySelectorAll('.member')[i]; }

  /* ---------- click viewer: photo expands to half the page ---------- */
  var viewer = document.getElementById('viewer');
  var viewerImg = document.getElementById('viewerImg');
  var viewerKicker = document.getElementById('viewerKicker');
  var viewerNameEl = document.getElementById('viewerName');
  var viewerDesc = document.getElementById('viewerDesc');
  var viewerSec = { nameEl: viewerNameEl, token: 0 }; /* reuses the sliced-name renderer */
  var viewerOpen = false;
  var viewerWork = null; /* {sec, i} */

  /* ---------- viewer zoom: click image to zoom 1x > 2x > 4x > 6x, drag to pan ---------- */
  var ZOOMS = [1, 2, 4, 6];
  var viewZoom = 1, viewPanX = 0, viewPanY = 0;
  function updateImgCursor() {
    viewerImg.style.cursor = viewZoom >= 6 ? 'zoom-out' : (viewZoom > 1 ? 'grab' : 'zoom-in');
  }
  function resetViewZoom() {
    viewZoom = 1; viewPanX = 0; viewPanY = 0;
    viewer.classList.remove('zoomed');
    viewerImg.style.transform = '';
    updateImgCursor();
  }
  function setZoom(nz, cx, cy) {
    var oz = viewZoom;
    var rect = viewerImg.getBoundingClientRect();
    var ix = (cx - rect.left) / oz, iy = (cy - rect.top) / oz;
    var layL = rect.left - viewPanX, layT = rect.top - viewPanY;
    viewZoom = nz;
    if (nz === 1) { viewPanX = 0; viewPanY = 0; }
    else { viewPanX = cx - layL - ix * nz; viewPanY = cy - layT - iy * nz; }
    viewer.classList.toggle('zoomed', nz > 1);
    viewerImg.style.transition = 'transform .38s cubic-bezier(.22,1,.36,1)';
    viewerImg.style.transform = nz === 1 ? '' : 'translate(' + viewPanX.toFixed(1) + 'px,' + viewPanY.toFixed(1) + 'px) scale(' + nz + ')';
    updateImgCursor();
  }

  /* ---------- build a photo row ---------- */
  function buildRow(membersEl, works) {
    works.forEach(function (w, i) {
      var d = document.createElement('div');
      d.className = 'member';
      d.dataset.i = i;
      var img = document.createElement('img');
      img.src = IMG + w.img.replace(/\.jpg$/, '-md.webp');
      img.decoding = 'async';
      img.alt = w.en;
      img.draggable = false;
      img.loading = 'lazy';
      d.appendChild(img);
      membersEl.appendChild(d);
    });
  }

  /* ---------- fit giant text: measure the longest name in current lang ---------- */
  function fitFont(sec) {
    var meas = document.createElement('div');
    meas.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;font-family:Doto,sans-serif;font-weight:900;font-size:100px;line-height:1.15;';
    var longest = '';
    sec.works.forEach(function (w) {
      var t = (lang === 'zh') ? w.zh : w.en;
      if (t.length > longest.length) longest = t;
    });
    var def = (lang === 'zh') ? sec.def.zh : sec.def.en;
    if (def.length > longest.length) longest = def;
    meas.textContent = longest;
    document.body.appendChild(meas);
    var w = meas.offsetWidth || 1;
    document.body.removeChild(meas);
    var target = Math.min(window.innerWidth * 0.96, 1400);
    sec.nameEl.style.fontSize = (100 * target / w) + 'px';
  }

  /* ---------- sliced-letter name rendering (skiper6 language) ---------- */
  function buildName(sec, text, color) {
    var nameEl = sec.nameEl;
    nameEl.innerHTML = '';
    nameEl.style.color = color;
    Array.prototype.forEach.call(text, function (ch) {
      var c = (ch === ' ') ? '\u00A0' : ch;
      var letter = document.createElement('span');
      letter.className = 'letter';
      var sizer = document.createElement('span');
      sizer.className = 'sizer';
      sizer.textContent = c;
      letter.appendChild(sizer);
      var w = 100 / SLICES;
      for (var i = 0; i < SLICES; i++) {
        var s = document.createElement('span');
        s.className = 'slice';
        s.textContent = c;
        var L = Math.max(0, i * w - 0.5);
        var R = Math.max(0, 100 - (i + 1) * w - 0.5);
        s.style.clipPath = 'inset(-15% ' + R + '% -15% ' + L + '%)';
        letter.appendChild(s);
      }
      nameEl.appendChild(letter);
    });
  }

  function animateIn(sec, instant) {
    var letters = Array.prototype.slice.call(sec.nameEl.children);
    letters.forEach(function (letter) {
      var slices = letter.querySelectorAll('.slice');
      Array.prototype.forEach.call(slices, function (s, si) {
        var dir = (si % 2 === 0) ? -1 : 1;
        var dist = 55 + Math.random() * 70;
        if (instant) {
          s.style.transition = 'none';
          s.style.transform = 'none';
          s.style.opacity = '1';
          return;
        }
        s.style.transition = 'none';
        s.style.transform = 'translateY(' + (dir * dist).toFixed(1) + '%) skewY(' + (dir * 4) + 'deg)';
        s.style.opacity = '0';
      });
    });
    if (instant) return;
    void sec.nameEl.offsetWidth;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        letters.forEach(function (letter, li) {
          var slices = letter.querySelectorAll('.slice');
          Array.prototype.forEach.call(slices, function (s, si) {
            var delay = li * 32 + si * 22;
            s.style.transition =
              'transform .6s cubic-bezier(.16,1,.3,1) ' + delay + 'ms,' +
              'opacity .38s ease ' + delay + 'ms';
            s.style.transform = 'translateY(0%) skewY(0deg)';
            s.style.opacity = '1';
          });
        });
      });
    });
  }

  function setName(sec, text, color) {
    var my = ++sec.token;
    if (reduceMotion) { buildName(sec, text, color); return; }
    var letters = Array.prototype.slice.call(sec.nameEl.children);
    if (!letters.length) { buildName(sec, text, color); animateIn(sec, false); return; }
    letters.forEach(function (letter, li) {
      var slices = letter.querySelectorAll('.slice');
      Array.prototype.forEach.call(slices, function (s, si) {
        var dir = (si % 2 === 0) ? -1 : 1;
        var delay = li * 13 + si * 8;
        s.style.transition =
          'transform .22s cubic-bezier(.5,0,.75,0) ' + delay + 'ms,' +
          'opacity .22s ease ' + delay + 'ms';
        s.style.transform = 'translateY(' + (dir * 55) + '%) skewY(' + (dir * 3) + 'deg)';
        s.style.opacity = '0';
      });
    });
    var outTime = 230 + letters.length * 13 + SLICES * 8 + 60;
    setTimeout(function () {
      if (my !== sec.token) return;
      buildName(sec, text, color);
      animateIn(sec, false);
    }, outTime);
  }

  function setDesc(sec, text) {
    if (reduceMotion || sec.descEl.textContent === text) { sec.descEl.textContent = text; return; }
    var my = ++sec.descToken;
    sec.descEl.classList.add('fading');
    setTimeout(function () {
      if (my !== sec.descToken) return;
      sec.descEl.textContent = text;
      sec.descEl.classList.remove('fading');
    }, 200);
  }

  /* ---------- hover wiring per section ---------- */
  function activate(sec, i) {
    if (i === sec.current) return;
    sec.current = i;
    sec.membersEl.classList.add('has-active');
    var mems = sec.membersEl.querySelectorAll('.member');
    Array.prototype.forEach.call(mems, function (el, k) {
      el.classList.toggle('active', k === i);
    });
    /* caption follows the selected row */
    var nextRowFirst = mems[(Math.floor(i / 3) + 1) * 3] || null;
    sec.membersEl.insertBefore(sec.nameWrap, nextRowFirst);
    sec.membersEl.insertBefore(sec.descEl, nextRowFirst);
    badgeTarget = mems[i];
    badgeEl.classList.add('on');
    hintEl.classList.add('gone');
    var w = sec.works[i];
    setName(sec, (lang === 'zh') ? w.zh : w.en, RED);
    setDesc(sec, (lang === 'zh' ? w.descZh : w.descEn) + '  ·  ' + w.year);
    /* center the selected photo if it sits near the viewport edge */
    var r = mems[i].getBoundingClientRect();
    var vh = window.innerHeight;
    var c = r.top + r.height / 2;
    if (c < vh * 0.15 || c > vh * 0.85) {
      scrollCooldownUntil = Date.now() + 650;
      window.scrollTo({ top: window.scrollY + c - vh / 2, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  }
  function deactivate(sec) {
    if (sec.current === -1) return;
    sec.current = -1;
    sec.membersEl.classList.remove('has-active');
    Array.prototype.forEach.call(sec.membersEl.querySelectorAll('.member'), function (el) {
      el.classList.remove('active');
    });
    badgeTarget = null;
    badgeEl.classList.remove('on');
    /* caption back to the end */
    sec.membersEl.appendChild(sec.nameWrap);
    sec.membersEl.appendChild(sec.descEl);
    setName(sec, (lang === 'zh') ? sec.def.zh : sec.def.en, WHITE);
    setDesc(sec, (lang === 'zh') ? sec.def.descZh : sec.def.descEn);
  }

  function createSection(key, works) {
    var sec = {
      key: key,
      works: works,
      def: DEFAULTS[key],
      membersEl: document.getElementById(key === 'A' ? 'membersA' : 'membersB'),
      nameWrap: document.getElementById(key === 'A' ? 'nameWrapA' : 'nameWrapB'),
      nameEl: document.getElementById(key === 'A' ? 'nameA' : 'nameB'),
      descEl: document.getElementById(key === 'A' ? 'descA' : 'descB'),
      current: -1,
      token: 0,
      descToken: 0
    };
    buildRow(sec.membersEl, works);
    sec.membersEl.appendChild(sec.nameWrap); /* caption after the photo grid */
    sec.membersEl.appendChild(sec.descEl);
    sec.membersEl.addEventListener('mouseover', function (e) {
      if (Date.now() < scrollCooldownUntil) return;
      var m = e.target.closest ? e.target.closest('.member') : null;
      if (m) activate(sec, +m.dataset.i);
    });
    sec.membersEl.addEventListener('mouseleave', function () { deactivate(sec); });
    sec.membersEl.addEventListener('click', function (e) {
      var m = e.target.closest ? e.target.closest('.member') : null;
      if (m) openViewer(sec, +m.dataset.i);
    });
    sections.push(sec);
    return sec;
  }

  /* ---------- badge pinned to the active photo's corner ---------- */
  (function badgeLoop() {
    if (badgeTarget) {
      var r = badgeTarget.getBoundingClientRect();
      var x = r.right - 14 - 44;
      var y = r.bottom - 14 - 44;
      badgeEl.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
    }
    requestAnimationFrame(badgeLoop);
  })();

  /* ---------- viewer: open / close ---------- */
  /* Stacked layout: kicker on top, huge 16:9 image (87% width), giant name, desc.
     The viewer scrolls internally so the image is never shrunk by viewport height. */
  function viewerLayout() {
    var vw = window.innerWidth;
    var fs = parseFloat(viewerNameEl.style.fontSize) || 100;
    var titleH = fs * 1.12;
    var padTop = 92;
    var imgW = Math.min(vw * 0.87, 2000);
    var imgH = imgW * 9 / 16;
    var kickerT = padTop;
    var imgT = kickerT + 30 + 16;
    var nameT = imgT + imgH + 24;
    var descT = nameT + titleH + 16;
    return { w: imgW, h: imgH, l: (vw - imgW) / 2, t: imgT,
             kickerT: kickerT, nameT: nameT, descT: descT };
  }

  function viewerLabel(sec) {
    return sec.key === 'A'
      ? ((lang === 'zh') ? '在校设计' : 'Academic')
      : ((lang === 'zh') ? '商业设计' : 'Commercial');
  }
  function viewerNameOf(w) { return (lang === 'zh') ? w.zh : w.en; }
  function viewerDescOf(w) { return (lang === 'zh') ? w.descZh : w.descEn; }

  function fitViewerName(text) {
    var meas = document.createElement('div');
    meas.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;font-family:Doto,sans-serif;font-weight:900;font-size:100px;line-height:1.15;';
    meas.textContent = text;
    document.body.appendChild(meas);
    var w = meas.offsetWidth || 1;
    document.body.removeChild(meas);
    var vw = window.innerWidth;
    var target = (vw <= 860) ? vw * 0.9 : Math.min(vw * 0.84, 1500);
    viewerNameEl.style.fontSize = (100 * target / w) + 'px';
  }

  function placeViewerTexts(L) {
    viewerKicker.style.top = L.kickerT + 'px';
    viewerNameEl.style.top = L.nameT + 'px';
    viewerDesc.style.top = L.descT + 'px';
  }

  function openViewer(sec, i) {
    var w = sec.works[i];
    viewerWork = { sec: sec, i: i };
    deactivate(sec);
    var thumb = memberAt(sec, i).getBoundingClientRect();
    viewerKicker.innerHTML = '<span class="dot">●</span>&nbsp; ' + viewerLabel(sec) + ' · ' + w.year;
    viewerDesc.textContent = viewerDescOf(w);
    viewerImg.alt = w.en;
    viewerImg.src = IMG + w.img;
    document.body.style.overflow = 'hidden';
    viewer.hidden = false;
    viewer.classList.remove('open');
    resetViewZoom();
    var nameText = viewerNameOf(w);
    fitViewerName(nameText);
    buildName(viewerSec, nameText, RED);
    var L = viewerLayout();
    placeViewerTexts(L);
    viewerImg.style.transition = 'none';
    viewerImg.style.transform = '';
    viewerImg.style.left = thumb.left + 'px';
    viewerImg.style.top = thumb.top + 'px';
    viewerImg.style.width = thumb.width + 'px';
    viewerImg.style.height = thumb.height + 'px';
    document.body.classList.add('viewer-open');
    void viewerImg.offsetWidth;
    viewerImg.style.transition = '';
    viewerImg.style.left = L.l + 'px';
    viewerImg.style.top = L.t + 'px';
    viewerImg.style.width = L.w + 'px';
    viewerImg.style.height = L.h + 'px';
    badgeTarget = viewerImg; /* red dot rides the big image's corner */
    badgeEl.classList.add('on');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        viewer.classList.add('open');
        animateIn(viewerSec, reduceMotion);
      });
    });
    viewerOpen = true;
  }

  function closeViewer() {
    if (!viewerOpen) return;
    viewerOpen = false;
    viewer.classList.remove('open');
    document.body.classList.remove('viewer-open');
    var t;
    if (viewerWork) {
      var thumb = memberAt(viewerWork.sec, viewerWork.i).getBoundingClientRect();
      t = { l: thumb.left, t: thumb.top, w: thumb.width, h: thumb.height };
    } else {
      var L0 = viewerLayout();
      t = { l: L0.l, t: L0.t, w: L0.w, h: L0.h };
    }
    viewerImg.style.transition = 'none';
    viewerImg.style.transform = '';
    viewZoom = 1; viewPanX = 0; viewPanY = 0;
    viewer.classList.remove('zoomed');
    void viewerImg.offsetWidth;
    viewerImg.style.transition = '';
    viewerImg.style.left = t.l + 'px';
    viewerImg.style.top = t.t + 'px';
    viewerImg.style.width = t.w + 'px';
    viewerImg.style.height = t.h + 'px';
    setTimeout(function () {
      viewer.hidden = true;
      document.body.style.overflow = '';
      viewerWork = null;
      badgeTarget = null;
      badgeEl.classList.remove('on');
    }, 600);
  }
  viewer.addEventListener('click', function (e) {
    if (e.target === viewerImg) return; /* image click = zoom, handled by pointer logic */
    closeViewer();
  });
  document.getElementById('viewerClose').addEventListener('click', closeViewer);

  /* drag to pan when zoomed; plain click cycles zoom, anchored at the click point */
  var imgDrag = null;
  viewerImg.draggable = false;
  viewerImg.addEventListener('dragstart', function (e) { e.preventDefault(); });
  viewerImg.addEventListener('pointerdown', function (e) {
    if (!viewerOpen) return;
    imgDrag = { x0: e.clientX, y0: e.clientY, px: viewPanX, py: viewPanY, moved: false };
    try { viewerImg.setPointerCapture(e.pointerId); } catch (err) {}
  });
  viewerImg.addEventListener('pointermove', function (e) {
    if (!imgDrag || viewZoom <= 1) return;
    var dx = e.clientX - imgDrag.x0, dy = e.clientY - imgDrag.y0;
    if (!imgDrag.moved && Math.sqrt(dx * dx + dy * dy) > 6) {
      imgDrag.moved = true;
      viewerImg.style.transition = 'none';
      viewerImg.style.cursor = 'grabbing';
    }
    if (imgDrag.moved) {
      viewPanX = imgDrag.px + dx;
      viewPanY = imgDrag.py + dy;
      viewerImg.style.transform = 'translate(' + viewPanX.toFixed(1) + 'px,' + viewPanY.toFixed(1) + 'px) scale(' + viewZoom + ')';
    }
  });
  function imgPointerEnd(e) {
    if (!imgDrag) return;
    var wasDrag = imgDrag.moved;
    imgDrag = null;
    if (!wasDrag && viewerOpen) {
      var idx = ZOOMS.indexOf(viewZoom);
      setZoom(ZOOMS[(idx + 1) % ZOOMS.length], e.clientX, e.clientY);
    } else {
      updateImgCursor();
    }
  }
  viewerImg.addEventListener('pointerup', imgPointerEnd);
  viewerImg.addEventListener('pointercancel', function () { imgDrag = null; updateImgCursor(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeViewer();
  });

  /* ---------- language ---------- */
  function applyLang() {
    document.documentElement.lang = (lang === 'zh') ? 'zh-CN' : 'en';
    Array.prototype.forEach.call(document.querySelectorAll('[data-en]'), function (el) {
      el.textContent = el.dataset[lang];
    });
    document.querySelectorAll('.lang-toggle button').forEach(function (b) {
      b.classList.toggle('on', b.dataset.lang === lang);
    });
    sections.forEach(function (sec) {
      fitFont(sec);
      if (sec.current === -1) {
        buildName(sec, (lang === 'zh') ? sec.def.zh : sec.def.en, WHITE);
        animateIn(sec, true);
        sec.descEl.textContent = (lang === 'zh') ? sec.def.descZh : sec.def.descEn;
      } else {
        var w = sec.works[sec.current];
        buildName(sec, (lang === 'zh') ? w.zh : w.en, RED);
        animateIn(sec, true);
        sec.descEl.textContent = (lang === 'zh' ? w.descZh : w.descEn) + '  ·  ' + w.year;
      }
    });
    if (viewerOpen && viewerWork) {
      var vwSec = viewerWork.sec, vwWork = vwSec.works[viewerWork.i];
      viewerKicker.innerHTML = '<span class="dot">●</span>&nbsp; ' + viewerLabel(vwSec) + ' · ' + vwWork.year;
      viewerDesc.textContent = viewerDescOf(vwWork);
      var vName = viewerNameOf(vwWork);
      fitViewerName(vName);
      buildName(viewerSec, vName, RED);
      animateIn(viewerSec, true);
      var vL = viewerLayout();
      placeViewerTexts(vL);
      resetViewZoom();
      viewerImg.style.transition = 'none';
      viewerImg.style.transform = '';
      viewerImg.style.left = vL.l + 'px';
      viewerImg.style.top = vL.t + 'px';
      viewerImg.style.width = vL.w + 'px';
      viewerImg.style.height = vL.h + 'px';
      void viewerImg.offsetWidth;
      viewerImg.style.transition = '';
    }
  }
  document.querySelector('.lang-toggle').addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('button[data-lang]') : null;
    if (b && b.dataset.lang !== lang) { lang = b.dataset.lang; applyLang(); }
  });

  /* ---------- nav jumps : Academic / Commercial ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
  function setActiveNav(key) {
    navLinks.forEach(function (n) { n.classList.toggle('active', n.dataset.nav === key); });
  }
  navLinks.forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var topbar = document.querySelector('.topbar');
      var y = target.getBoundingClientRect().top + window.scrollY - (topbar ? topbar.offsetHeight + 12 : 80);
      window.scrollTo({ top: Math.max(0, y), behavior: reduceMotion ? 'auto' : 'smooth' });
      setActiveNav(a.dataset.nav);
    });
  });
  window.addEventListener('scroll', function () {
    var probe = window.scrollY + window.innerHeight * 0.4;
    var key = 'a';
    [['a', 'partA'], ['b', 'partB']].forEach(function (pair) {
      var el = document.getElementById(pair[1]);
      if (el && el.offsetTop <= probe) key = pair[0];
    });
    setActiveNav(key);
  }, { passive: true });

  /* ---------- init ---------- */
  function init() {
    createSection('A', WORKS_A);
    createSection('B', WORKS_B);
    sections.forEach(function (sec) {
      fitFont(sec);
      buildName(sec, (lang === 'zh') ? sec.def.zh : sec.def.en, WHITE);
      animateIn(sec, reduceMotion);
      sec.descEl.textContent = (lang === 'zh') ? sec.def.descZh : sec.def.descEn;
    });
    applyLang();
  }
  window.addEventListener('resize', function () {
    sections.forEach(fitFont);
    if (viewerOpen && viewerWork) {
      fitViewerName(viewerNameOf(viewerWork.sec.works[viewerWork.i]));
      var L = viewerLayout();
      placeViewerTexts(L);
      resetViewZoom();
      viewerImg.style.transition = 'none';
      viewerImg.style.transform = '';
      viewerImg.style.left = L.l + 'px';
      viewerImg.style.top = L.t + 'px';
      viewerImg.style.width = L.w + 'px';
      viewerImg.style.height = L.h + 'px';
      void viewerImg.offsetWidth;
      viewerImg.style.transition = '';
    }
  });
  if (document.fonts && document.fonts.ready) {
    var done = false;
    document.fonts.ready.then(function () { if (!done) { done = true; init(); } });
    setTimeout(function () { if (!done) { done = true; init(); } }, 1800);
  } else {
    init();
  }
})();
