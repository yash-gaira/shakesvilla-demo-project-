/**
 * SHAKESVILLA — HALDWANI
 * Exact 1:1 Creative Replica Interactions of DVERSO STUDIO (dversostudio.io)
 * 3D Card Parallax // Loading Screen // Audio Haptics // Theme Switcher // Dossier Drawer
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Signature Dverso Loader with Percentage Counter
     ========================================================================== */
  const loader = document.getElementById('loader');
  const loadingBar = document.getElementById('loading-bar');
  const loaderPctText = document.getElementById('loader-pct-text');

  let progress = 0;
  const loadInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 8;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadInterval);
      if (loadingBar) loadingBar.style.setProperty('--completion', '100%');
      if (loaderPctText) loaderPctText.textContent = 'LOADING 100%';

      setTimeout(() => {
        if (loader) {
          loader.classList.add('hide');
        }
      }, 350);
    } else {
      if (loadingBar) loadingBar.style.setProperty('--completion', `${progress}%`);
      if (loaderPctText) loaderPctText.textContent = `LOADING ${progress}%`;
    }
  }, 45);

  /* ==========================================================================
     2. Live Haldwani Local Time (IST // UTC+5:30)
     ========================================================================== */
  const headerClock = document.getElementById('live-header-clock');

  function updateHaldwaniClock() {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const ist = new Date(utc + (3600000 * 5.5));

    const h = String(ist.getHours()).padStart(2, '0');
    const m = String(ist.getMinutes()).padStart(2, '0');
    const s = String(ist.getSeconds()).padStart(2, '0');

    if (headerClock) {
      headerClock.textContent = `${h}:${m}:${s}`;
    }
  }

  updateHaldwaniClock();
  setInterval(updateHaldwaniClock, 1000);

  /* ==========================================================================
     3. Theme Switcher (Signature Cream vs Dark Mode)
     ========================================================================== */
  const htmlRoot = document.documentElement;
  const themeToggle = document.getElementById('btn-theme-toggle');
  const themeLabel = document.getElementById('theme-btn-label');

  // Check persisted or default to signature cream
  const savedTheme = localStorage.getItem('dverso_coffee_theme') || 'cream';
  applyTheme(savedTheme);

  function applyTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem('dverso_coffee_theme', theme);
    if (themeLabel) {
      themeLabel.textContent = theme === 'cream' ? 'THEME: DARK' : 'THEME: CREAM';
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = htmlRoot.getAttribute('data-theme') || 'cream';
      const next = current === 'cream' ? 'dark' : 'cream';
      applyTheme(next);
      playHapticTone(1400, 'triangle', 0.04);
    });
  }

  /* ==========================================================================
     4. Web Audio API Minimal Studio Haptics
     ========================================================================== */
  let audioCtx = null;
  let audioEnabled = true;
  const audioToggle = document.getElementById('btn-audio-toggle');
  const audioIcon = document.getElementById('audio-icon');

  function getAudioContext() {
    if (!audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        audioCtx = new AudioCtxClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playHapticTone(freq = 1200, type = 'sine', duration = 0.035) {
    if (!audioEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  if (audioToggle) {
    audioToggle.addEventListener('click', () => {
      audioEnabled = !audioEnabled;
      if (audioIcon) {
        audioIcon.textContent = audioEnabled ? '🔊' : '🔇';
      }
      if (audioEnabled) {
        playHapticTone(1600, 'triangle', 0.05);
      }
    });
  }

  /* ==========================================================================
     4.5 3D Interactive Typography Vessel & Liquid Coffee Engine
     - 3D perspective tilt on mouse movement
     - Fills with rich coffee waves on cursor movement
     - Drains & vanishes completely on scroll
     ========================================================================== */
  const heroTitleStage = document.getElementById('hero-title-stage');
  const waveFront = document.getElementById('coffee-wave-front');
  const waveBack = document.getElementById('coffee-wave-back');
  const foamCrest = document.getElementById('coffee-foam-crest');
  const liquidGroup = document.getElementById('coffee-liquid-group');
  const depthText = document.querySelector('.dverso_svg_text_depth');
  const bubblesLayer = document.getElementById('coffee-bubbles-layer');

  if (heroTitleStage && waveFront) {
    let coffeeFillTarget = 0.82;
    let coffeeFillCurrent = 0.0;
    let wavePhase = 0;
    let titleRotX = 0;
    let titleRotY = 0;
    let curTitleRotX = 0;
    let curTitleRotY = 0;
    let sloshAngle = 0;
    let curSloshAngle = 0;
    let scrollDrainRatio = 0;
    let lastMouseMoveTime = performance.now();

    // Crema Micro-Bubbles
    const bubbles = [];
    if (bubblesLayer) {
      for (let i = 0; i < 9; i++) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('r', (2 + Math.random() * 3.5).toFixed(1));
        circle.setAttribute('fill', '#ffd285');
        circle.setAttribute('opacity', '0.65');
        bubblesLayer.appendChild(circle);
        bubbles.push({
          el: circle,
          x: 180 + Math.random() * 1040,
          y: 80 + Math.random() * 130,
          speed: 0.6 + Math.random() * 0.9,
          id: i
        });
      }
    }

    // Mouse Movement: 3D perspective tilt & coffee pouring fill energy
    window.addEventListener('mousemove', (e) => {
      lastMouseMoveTime = performance.now();
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;

      // 3D Perspective Rotation for Hero Title
      titleRotY = nx * 14;
      titleRotX = -ny * 12;

      // Slosh angle lag
      sloshAngle = titleRotY * 1.8;

      // Mouse movement fills the hollow letters with coffee
      const vel = Math.hypot(e.movementX || 0, e.movementY || 0);
      coffeeFillTarget = Math.min(1.0, coffeeFillTarget + vel * 0.009 + 0.025);
    });

    // Scroll: Liquid drains & vanishes smoothly
    window.addEventListener('scroll', () => {
      const heroHeight = window.innerHeight;
      scrollDrainRatio = Math.min(1, Math.max(0, window.scrollY / (heroHeight * 0.55)));
    }, { passive: true });

    // 60fps Liquid Simulation RAF Loop
    function renderHeroCoffeeEngine() {
      // Idle settle
      const timeSinceMove = performance.now() - lastMouseMoveTime;
      if (timeSinceMove > 1800) {
        coffeeFillTarget = 0.78 + Math.sin(wavePhase * 0.5) * 0.04;
      }

      // Lerp Fill Level
      coffeeFillCurrent += (coffeeFillTarget - coffeeFillCurrent) * 0.06;

      // Drain when scrolling away from hero
      const effectiveFill = Math.max(0, coffeeFillCurrent * (1 - scrollDrainRatio * 1.25));

      // Calculate Liquid Surface Y inside letters (Empty: 232px, Full: 68px)
      const surfaceY = 232 - (effectiveFill * 164);

      // Lerp 3D Perspective Tilt
      curTitleRotX += (titleRotX - curTitleRotX) * 0.08;
      curTitleRotY += (titleRotY - curTitleRotY) * 0.08;
      curSloshAngle += (sloshAngle - curSloshAngle) * 0.06;

      // 3D Tilt Transform on Title Stage
      heroTitleStage.style.transform = `translate(-50%, -50%) perspective(1200px) rotateX(${curTitleRotX.toFixed(2)}deg) rotateY(${curTitleRotY.toFixed(2)}deg) translateZ(8px)`;

      // Dynamic 3D Extrusion Layer Behind
      if (depthText) {
        const depthX = 4 + curTitleRotY * 0.65;
        const depthY = 7 - curTitleRotX * 0.65;
        depthText.style.transform = `translate(${depthX.toFixed(1)}px, ${depthY.toFixed(1)}px)`;
      }

      // Liquid Opacity fades to 0 on scroll
      if (liquidGroup) {
        liquidGroup.style.opacity = (effectiveFill > 0.01) ? Math.min(1, (1 - scrollDrainRatio * 1.25)).toFixed(2) : '0';
      }

      // Compute Fluid Wave Meniscus
      wavePhase += 0.045;
      const frontPoints = [];
      const backPoints = [];
      const foamPoints = [];
      const startX = -80;
      const endX = 1480;
      const step = 32;

      for (let x = startX; x <= endX; x += step) {
        const normX = (x - 700) / 700;
        const slosh = normX * Math.tan(curSloshAngle * Math.PI / 180) * 420;

        // Front rich espresso ripples
        const rFront = Math.sin((x * 0.014) + wavePhase) * 6.5 + Math.cos((x * 0.024) - wavePhase * 0.7) * 2.8;
        const yFront = surfaceY + slosh + rFront;
        frontPoints.push(`${x.toFixed(1)},${yFront.toFixed(1)}`);
        foamPoints.push(`${x.toFixed(1)},${(yFront + 0.5).toFixed(1)}`);

        // Back wave with phase offset
        const rBack = Math.sin((x * 0.017) + wavePhase + 1.2) * 8.5 + Math.cos((x * 0.02) + wavePhase * 0.4) * 3.5;
        const yBack = surfaceY + slosh + rBack - 3;
        backPoints.push(`${x.toFixed(1)},${yBack.toFixed(1)}`);
      }

      waveFront.setAttribute('d', `M ${startX},340 L ${frontPoints.join(' L ')} L ${endX},340 Z`);
      waveBack.setAttribute('d', `M ${startX},340 L ${backPoints.join(' L ')} L ${endX},340 Z`);
      foamCrest.setAttribute('d', `M ${foamPoints.join(' L ')}`);

      // Update Bubbles
      if (bubbles.length > 0) {
        bubbles.forEach(b => {
          b.y -= b.speed;
          b.x += Math.sin(wavePhase * 2 + b.id) * 0.4;
          if (b.y < surfaceY || b.y < 70) {
            b.y = Math.min(220, surfaceY + 60 + Math.random() * 70);
            b.x = 220 + Math.random() * 960;
          }
          b.el.setAttribute('cx', b.x.toFixed(1));
          b.el.setAttribute('cy', b.y.toFixed(1));
          b.el.setAttribute('opacity', (effectiveFill * 0.7).toFixed(2));
        });
      }

      requestAnimationFrame(renderHeroCoffeeEngine);
    }

    renderHeroCoffeeEngine();
  }

  /* ==========================================================================
     5. 3D Menu Cards Dynamic Parallax & Carousel Navigation
     ========================================================================== */
  const allTiltCards = document.querySelectorAll('.tilt-card, .dverso_card');
  const cardsStage = document.getElementById('cards-stage');
  const btnCardsPrev = document.getElementById('btn-cards-prev');
  const btnCardsNext = document.getElementById('btn-cards-next');

  if (cardsStage) {
    if (btnCardsPrev) {
      btnCardsPrev.addEventListener('click', () => {
        cardsStage.scrollBy({ left: -340, behavior: 'smooth' });
        playHapticTone(1400, 'triangle', 0.04);
      });
    }
    if (btnCardsNext) {
      btnCardsNext.addEventListener('click', () => {
        cardsStage.scrollBy({ left: 340, behavior: 'smooth' });
        playHapticTone(1600, 'triangle', 0.04);
      });
    }
  }

  let targetRotX = 0;
  let targetRotY = 0;
  let currentRotX = 0;
  let currentRotY = 0;

  if (window.matchMedia('(pointer: fine)').matches && allTiltCards.length > 0) {
    window.addEventListener('mousemove', (e) => {
      // Normalized screen coordinates (-1 to 1)
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;

      targetRotY = nx * 14;
      targetRotX = -ny * 12;
    });

    // Smooth RAF Lerp for all moving cards
    function animate3DCards() {
      currentRotX += (targetRotX - currentRotX) * 0.08;
      currentRotY += (targetRotY - currentRotY) * 0.08;

      allTiltCards.forEach((card, index) => {
        // Organic phase factor per card so all cards tilt harmoniously
        const phase = 1 - (index * 0.1);
        const rotY = (currentRotY * phase).toFixed(2);
        const rotX = (currentRotX * phase).toFixed(2);
        card.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      });

      // Update real-time HUD telemetry on cards.html if present
      const hudRotX = document.getElementById('hud-rot-x');
      const hudRotY = document.getElementById('hud-rot-y');
      if (hudRotX) hudRotX.textContent = `${currentRotX >= 0 ? '+' : ''}${currentRotX.toFixed(2)}°`;
      if (hudRotY) hudRotY.textContent = `${currentRotY >= 0 ? '+' : ''}${currentRotY.toFixed(2)}°`;

      requestAnimationFrame(animate3DCards);
    }
    animate3DCards();

    const btnResetTilt = document.getElementById('btn-reset-tilt');
    if (btnResetTilt) {
      btnResetTilt.addEventListener('click', () => {
        targetRotX = 0;
        targetRotY = 0;
        playHapticTone(1500, 'triangle', 0.04);
      });
    }
  }

  /* ==========================================================================
     6. Slide-Out Project Dossier Modal
     ========================================================================== */
  const modal = document.getElementById('project-modal');
  const backdrop = document.getElementById('modal-backdrop');
  const btnCloseModal = document.getElementById('btn-modal-close');
  const btnRequestSpec = document.getElementById('btn-request-spec');

  const mName = document.getElementById('m-name');
  const mRegion = document.getElementById('m-region');
  const mProcess = document.getElementById('m-process');
  const mElev = document.getElementById('m-elev');
  const mScore = document.getElementById('m-score');
  const mRoast = document.getElementById('m-roast');
  const mNotes = document.getElementById('m-notes');

  function openDossier(data) {
    if (!modal) return;
    if (mName) mName.textContent = data.name || 'SINGLE ORIGIN HARVEST';
    if (mRegion) mRegion.textContent = data.region || 'Terroir Specified';
    if (mProcess) mProcess.textContent = data.process || 'Washed';
    if (mElev) mElev.textContent = data.elev || '1,800M';
    if (mScore) mScore.textContent = data.score || '88.0 SCA';
    if (mRoast) mRoast.textContent = data.roast || 'Omni Roast';
    if (mNotes) mNotes.textContent = data.notes || 'Clean citrus, florals, brown sugar sweetness.';

    modal.classList.add('is-open');
    if (backdrop) backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    playHapticTone(1800, 'triangle', 0.05);
  }

  function closeDossier() {
    if (!modal) return;
    modal.classList.remove('is-open');
    if (backdrop) backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // Bind project rows
  document.querySelectorAll('.project').forEach(row => {
    row.addEventListener('click', () => {
      openDossier({
        name: row.dataset.name,
        process: row.dataset.type,
        elev: row.dataset.elevation,
        region: row.dataset.region,
        score: row.dataset.score,
        notes: row.dataset.notes,
        roast: row.dataset.roast
      });
    });

    row.addEventListener('mouseenter', () => {
      playHapticTone(1100, 'sine', 0.02);
    });
  });

  // Bind card items to open related dossiers
  document.querySelectorAll('.card-item').forEach(item => {
    item.addEventListener('click', () => {
      const ref = item.dataset.originRef;
      // Match with row or default
      const matchingRow = document.querySelector(`.project[data-name*="${item.querySelector('span').textContent.slice(0, 5)}"]`);
      if (matchingRow) {
        matchingRow.click();
      } else {
        openDossier({
          name: item.querySelector('span').textContent,
          process: item.querySelector('.item-spec').textContent,
          elev: '424M // HALDWANI LAB',
          region: 'Himalayan Foothills Sub-Surface gaula runoff',
          score: 'CALIBRATED',
          notes: 'Acoustic cavitation kinetic extraction. Zero astringency.',
          roast: 'Micro-Batch Fluid Roasting'
        });
      }
    });
  });

  /* ==========================================================================
     6.1 Menu Category Filtering Logic
     ========================================================================== */
  const filterPills = document.querySelectorAll('.filter_pill');
  if (filterPills.length > 0) {
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('is-active'));
        pill.classList.add('is-active');

        const filter = pill.dataset.filter;
        const projects = document.querySelectorAll('.project');

        projects.forEach(proj => {
          if (filter === 'all' || proj.dataset.category === filter) {
            proj.classList.remove('is-hidden');
          } else {
            proj.classList.add('is-hidden');
          }
        });
        playHapticTone(1500, 'triangle', 0.04);
      });
    });
  }

  if (btnCloseModal) btnCloseModal.addEventListener('click', closeDossier);
  if (backdrop) backdrop.addEventListener('click', closeDossier);

  if (btnRequestSpec) {
    btnRequestSpec.addEventListener('click', () => {
      btnRequestSpec.textContent = 'ORDER QUEUED FOR PREPARATION ✓';
      btnRequestSpec.style.backgroundColor = '#ff4c00';
      btnRequestSpec.style.color = '#ffffff';
      playHapticTone(2200, 'sine', 0.08);

      setTimeout(() => {
        btnRequestSpec.textContent = 'REQUEST BATCH SPECIMEN';
        btnRequestSpec.style.backgroundColor = '';
        btnRequestSpec.style.color = '';
      }, 3000);
    });
  }

  /* ==========================================================================
     7. Fullscreen Blurred Dverso Menu Overlay
     ========================================================================== */
  const menuOverlay = document.getElementById('menu-overlay');
  const btnOpenMenu = document.getElementById('btn-open-menu');
  const btnCloseMenu = document.getElementById('btn-close-menu');

  function openMenu() {
    if (!menuOverlay) return;
    menuOverlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    playHapticTone(1500, 'triangle', 0.04);
  }

  function closeMenu() {
    if (!menuOverlay) return;
    menuOverlay.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  if (btnOpenMenu) btnOpenMenu.addEventListener('click', openMenu);
  if (btnCloseMenu) btnCloseMenu.addEventListener('click', closeMenu);

  // Menu navigation links
  document.querySelectorAll('.menu-nav-anchor').forEach(item => {
    item.addEventListener('click', () => {
      const targetId = item.dataset.target;
      closeMenu();
      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (item.dataset.action === 'dossier') {
        const firstProject = document.querySelector('.project');
        if (firstProject) firstProject.click();
      } else if (item.dataset.action === 'contact') {
        window.location.href = 'mailto:dispatch@shakesvilla.in?subject=Haldwani%20Roastery%20Inquiry';
      }
    });
  });

  // Global ESC handler
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDossier();
      closeMenu();
    }
  });

  /* ==========================================================================
     8. CTA Buttons & Quick Jumps
     ========================================================================== */
  const scrollCta = document.getElementById('scroll-cta');
  const btnExploreBrews = document.getElementById('btn-explore-brews');
  const btnExploreOrigins = document.getElementById('btn-explore-origins');
  const btnReserve = document.getElementById('btn-reserve');
  const btnBookLab = document.getElementById('btn-book-lab');

  function scrollToProjects() {
    const pSec = document.getElementById('projects-section');
    if (pSec) {
      pSec.scrollIntoView({ behavior: 'smooth' });
      playHapticTone(1300, 'sine', 0.03);
    }
  }

  if (scrollCta) scrollCta.addEventListener('click', scrollToProjects);
  if (btnExploreBrews) btnExploreBrews.addEventListener('click', scrollToProjects);
  if (btnExploreOrigins) btnExploreOrigins.addEventListener('click', scrollToProjects);

  if (btnReserve) {
    btnReserve.addEventListener('click', () => {
      openDossier({
        name: 'BATCH #047 RESERVATION',
        process: 'Limited Microlot Allocation',
        elev: 'Himalayan Foothills',
        region: 'Haldwani Sensory Lab',
        score: 'ALLOCATION ONLY',
        notes: 'Priority degas nitrogen canisters reserved for monthly subscribers and partner espresso bars.',
        roast: 'Omni Extraction'
      });
    });
  }

  if (btnBookLab) {
    btnBookLab.addEventListener('click', () => {
      window.location.href = 'mailto:lab@shakesvilla.in?subject=Cupping%20Session%20Booking%20Haldwani';
      playHapticTone(1900, 'triangle', 0.05);
    });
  }
});
