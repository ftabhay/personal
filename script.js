/* =============================================
   SCRIPT.JS — Personal Website
   Interactions, Animations, Terminal Typer
   ============================================= */

(function () {
  'use strict';

  /* ——————————————————————————————————————
     0. HERO TYPEWRITER
  —————————————————————————————————————— */
  const tyEl = document.getElementById('hero-typewriter');
  if (tyEl) {
    const phrases = [
      'fast web apps.',
      'secure systems.',
      'clean APIs.',
      'great UX.',
      'full-stack products.',
    ];
    let pi = 0, ci = 0, deleting = false;

    function tick() {
      const phrase = phrases[pi];
      if (!deleting) {
        tyEl.textContent = phrase.slice(0, ++ci);
        if (ci === phrase.length) {
          deleting = true;
          setTimeout(tick, 1600); return;
        }
        setTimeout(tick, 68 + Math.random() * 40);
      } else {
        tyEl.textContent = phrase.slice(0, --ci);
        if (ci === 0) {
          deleting = false;
          pi = (pi + 1) % phrases.length;
          setTimeout(tick, 400); return;
        }
        setTimeout(tick, 35);
      }
    }
    setTimeout(tick, 800);
  }

  /* ——————————————————————————————————————
     1. NAV — Active link on scroll + smooth close

  —————————————————————————————————————— */
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  function setActiveNav(id) {
    navLinks.forEach(l => {
      l.classList.toggle('active', l.dataset.section === id);
    });
  }

  // IntersectionObserver to track which section is visible
  const sectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setActiveNav(e.target.id);
      });
    },
    { threshold: 0.4 }
  );
  sections.forEach(s => sectionObserver.observe(s));

  // Smooth scroll on nav link click + close mobile drawer
  const allNavLinks = document.querySelectorAll('[data-section]');
  allNavLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.dataset.section;
      const target = document.getElementById(id);
      if (target) {
        const top = target.offsetTop - parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'));
        window.scrollTo({ top, behavior: 'smooth' });
      }
      closeMobileDrawer();
    });
  });

  /* ——————————————————————————————————————
     2. HAMBURGER — Mobile nav toggle
  —————————————————————————————————————— */
  const hamburger = document.getElementById('hamburger');
  const mobileDrawer = document.getElementById('mobile-drawer');

  function closeMobileDrawer() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    mobileDrawer.classList.toggle('open', isOpen);
    mobileDrawer.setAttribute('aria-hidden', !isOpen);
  });

  // Close drawer on outside click
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !mobileDrawer.contains(e.target)) {
      closeMobileDrawer();
    }
  });

  /* ——————————————————————————————————————
     3. THEME TOGGLE — Dark / Light mode
  —————————————————————————————————————— */
  const themeToggle = document.getElementById('theme-toggle');
  const THEME_KEY = 'ft-theme';

  // Apply saved theme on load (default: dark)
  // Icons are controlled purely by CSS [data-theme] selectors — no JS needed for icons
  const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
  document.body.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.body.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.body.setAttribute('data-theme', next);
      localStorage.setItem(THEME_KEY, next);
    });
  }


  /* ——————————————————————————————————————
     3. SCROLL REVEAL — Cards animate in
  —————————————————————————————————————— */

  // Skill cards: alternate left/right slide with stagger
  document.querySelectorAll('.skill-card').forEach((el, i) => {
    el.classList.add(i % 2 === 0 ? 'reveal-left' : 'reveal-right');
    el.style.transitionDelay = `${(i % 3) * 0.1}s`;
  });

  // Blog cards: alternate right/left slide with stagger
  document.querySelectorAll('.blog-card').forEach((el, i) => {
    el.classList.add(i % 2 === 0 ? 'reveal-right' : 'reveal-left');
    el.style.transitionDelay = `${(i % 3) * 0.12}s`;
  });

  // Everything else: standard fade-up
  const revealElements = document.querySelectorAll(
    '.project-card, .section-header, .contact-inner, .id-card, .hero-portrait'
  );
  revealElements.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  });

  // One observer for all three reveal classes
  const allRevealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  allRevealEls.forEach(el => revealObserver.observe(el));


  /* ——————————————————————————————————————
     4. BACK-TO-TOP BUTTON
  —————————————————————————————————————— */
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ——————————————————————————————————————
     5. HEADER — Shrink on scroll
  —————————————————————————————————————— */
  const siteHeader = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    siteHeader.style.borderBottomWidth = window.scrollY > 60 ? '1px' : '2px';
  }, { passive: true });

  /* ——————————————————————————————————————
     6. TERMINAL — Typing animation in footer
  —————————————————————————————————————— */
  const terminalCmd = document.getElementById('terminal-cmd');
  const commands = [
    'whoami',
    'ls -la ./projects',
    'git status',
    'npm run build',
    'cat README.md',
    'ssh ftabhay@portfolio.dev',
    'python3 exploit.py',
    'nmap -sV target.local',
    'docker ps',
    'cat /etc/passwd | grep ft',
  ];

  let cmdIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;

  function typeCommand() {
    const current = commands[cmdIndex];

    if (!isDeleting) {
      terminalCmd.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        typingDelay = 1800; // wait before delete
      } else {
        typingDelay = Math.random() * 50 + 60;
      }
    } else {
      terminalCmd.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        cmdIndex = (cmdIndex + 1) % commands.length;
        typingDelay = 400;
      } else {
        typingDelay = 40;
      }
    }
    setTimeout(typeCommand, typingDelay);
  }

  // Start typing animation when footer is near
  const footerObserver = new IntersectionObserver(
    entries => {
      if (entries[0].isIntersecting) {
        typeCommand();
        footerObserver.disconnect();
      }
    },
    { threshold: 0.3 }
  );
  const footer = document.querySelector('.site-footer');
  if (footer) footerObserver.observe(footer);
  else typeCommand(); // fallback

  /* ——————————————————————————————————————
     7. CONTACT FORM — Basic validation + mock submit
  —————————————————————————————————————— */
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      feedback.textContent = '';
      feedback.className = 'form-feedback';

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const subject = form.subject.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !subject || !message) {
        feedback.textContent = '// ERROR: All fields are required.';
        feedback.classList.add('error');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        feedback.textContent = '// ERROR: Invalid email address.';
        feedback.classList.add('error');
        return;
      }

      // Simulate async submit
      const btnText = submitBtn.querySelector('.btn-text');
      const originalText = btnText.textContent;
      btnText.textContent = 'SENDING...';
      submitBtn.disabled = true;

      setTimeout(() => {
        feedback.textContent = '// SUCCESS: Message sent. I\'ll get back to you soon!';
        feedback.classList.add('success');
        form.reset();
        btnText.textContent = originalText;
        submitBtn.disabled = false;
      }, 1600);
    });
  }

  /* ——————————————————————————————————————
     8. SKILL BAR — Animate when in view
  —————————————————————————————————————— */
  const skillBars = document.querySelectorAll('.skill-bar');
  const barObserver = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('animated');
          barObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  skillBars.forEach(b => barObserver.observe(b));

  /* ——————————————————————————————————————
     9. EASTER EGG — Konami Code
  —————————————————————————————————————— */
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;
  document.addEventListener('keydown', e => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        konamiIndex = 0;
        showEasterEgg();
      }
    } else {
      konamiIndex = 0;
    }
  });

  function showEasterEgg() {
    const msg = document.createElement('div');
    msg.style.cssText = `
      position: fixed; top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      background: #000; color: #00cc66;
      font-family: 'JetBrains Mono', monospace;
      font-size: 1rem; padding: 24px 32px;
      border: 2px solid #00cc66; z-index: 9999;
      text-align: center; pointer-events: none;
      animation: fadeInUp 0.4s ease;
    `;
    msg.innerHTML = '// ACCESS GRANTED //<br><br>Welcome, hacker. 🎉';
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
  }

  /* ——————————————————————————————————————
     10. SCROLL — Throttle for performance
  —————————————————————————————————————— */
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => { ticking = false; });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

})();
