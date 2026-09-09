(() => {
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ── Navbar scroll ──
  const navbar = $('#navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ── Mobile menu ──
  const hamburger = $('#hamburger');
  const navLinks = $('.nav-links');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // ── Typing effect ──
  const typed = $('#typed');
  const phrases = [
    'Developpeur Python Full Stack',
    'Automatisation & Scripting',
    'Data & Machine Learning',
    'API REST & Microservices',
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function typeLoop() {
    const current = phrases[phraseIdx];

    if (!deleting) {
      typed.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
      setTimeout(typeLoop, 60);
    } else {
      typed.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(typeLoop, 400);
        return;
      }
      setTimeout(typeLoop, 35);
    }
  }
  typeLoop();

  // ── Scroll reveal ──
  const revealTargets = $$('.skill-card, .project-card, .stat-card, .about-text, .contact-info, .contact-form');
  revealTargets.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealTargets.forEach((el) => observer.observe(el));

  // ── Skill bars ──
  const skillBars = $$('.skill-fill');
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.width + '%';
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  skillBars.forEach((bar) => skillObserver.observe(bar));

  // ── Stat counters ──
  const statNumbers = $$('.stat-number');
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = +el.dataset.target;
          let current = 0;
          const step = Math.ceil(target / 40);
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = current;
          }, 30);
          statObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );
  statNumbers.forEach((el) => statObserver.observe(el));

  // ── Contact form ──
  const form = $('#contact-form');
  const status = $('#form-status');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#name').value.trim();
    const email = $('#email').value.trim();
    const message = $('#message').value.trim();

    if (!name || !email || !message) {
      status.textContent = 'Veuillez remplir tous les champs.';
      status.style.color = '#fb923c';
      return;
    }

    status.textContent = 'Message envoye ! Merci.';
    status.style.color = '#4ade80';
    form.reset();

    setTimeout(() => {
      status.textContent = '';
    }, 4000);
  });
})();
