/* =============================================
   INFLUENCEX — ENHANCED JAVASCRIPT
============================================= */

// ─── CUSTOM CURSOR ─────────────────────────
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

// Smooth follower
function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;

  follower.style.left = followerX + 'px';
  follower.style.top  = followerY + 'px';

  requestAnimationFrame(animateFollower);
}
animateFollower();

// Hover effect on interactive elements
const hoverTargets = document.querySelectorAll('a, button, .service-card, .cat-card, .faq-question, .testi-card');

hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => follower.classList.add('hovering'));
  el.addEventListener('mouseleave', () => follower.classList.remove('hovering'));
});

// Hide cursor when it leaves window
document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
  follower.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
  follower.style.opacity = '1';
});

// ─── NAVBAR SCROLL BEHAVIOUR ───────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ─── HAMBURGER / MOBILE MENU ────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ─── TYPING ANIMATION ───────────────────────
const words = [
  "Find your next creator partner...",
  "Your next paid deal starts here...",
  "Connect. Create. Collaborate...",
  "Influence more. Earn more. Grow faster...",
  "Search 10,000+ verified creators..."
];

let wordIndex  = 0;
let charIndex  = 0;
let isDeleting = false;
const typingEl = document.getElementById('typing');

function typeEffect() {
  if (!typingEl) return;
  const currentWord = words[wordIndex];

  if (!isDeleting) {
    typingEl.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }
  } else {
    typingEl.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 40 : 80);
}

typeEffect();

// ─── POPUP ──────────────────────────────────
const overlay   = document.getElementById('popupOverlay');
const popupBox  = document.getElementById('popupBox');
const popupClose = document.getElementById('popupClose');

function openPopup() {
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePopup() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('joinBtn')?.addEventListener('click', openPopup);
document.getElementById('ctaBtn')?.addEventListener('click', openPopup);
popupClose?.addEventListener('click', closePopup);

overlay?.addEventListener('click', (e) => {
  if (e.target === overlay) closePopup();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePopup();
});

// ─── WORKFLOW TABS ───────────────────────────
const tabBtns = document.querySelectorAll('.tab-btn');
const panels  = document.querySelectorAll('.workflow-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    const target = document.getElementById('tab-' + btn.dataset.tab);
    if (target) target.classList.add('active');
  });
});

// ─── FAQ ACCORDION ───────────────────────────
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  item.querySelector('.faq-question').addEventListener('click', () => {
    const isOpen = item.classList.contains('active');

    // Close all
    faqItems.forEach(f => f.classList.remove('active'));

    // Open clicked if it was closed
    if (!isOpen) item.classList.add('active');
  });
});

// ─── STATS COUNTER ANIMATION ────────────────
const statNums  = document.querySelectorAll('.stat-num');
let statsAnimated = false;

function animateStats() {
  if (statsAnimated) return;
  statsAnimated = true;

  statNums.forEach(num => {
    const target = parseInt(num.dataset.target, 10);
    const duration = 1800;
    const steps    = 60;
    const increment = target / steps;
    let current  = 0;
    let step     = 0;

    const timer = setInterval(() => {
      step++;
      // Ease out
      current = Math.min(Math.round(increment * step * (1 - step / (steps * 2))), target);
      num.textContent = current.toLocaleString();

      if (step >= steps || current >= target) {
        clearInterval(timer);
        num.textContent = target.toLocaleString();
      }
    }, duration / steps);
  });
}

// Observe stats section
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) animateStats();
    });
  }, { threshold: 0.3 });

  statsObserver.observe(statsSection);
}

// ─── SCROLL REVEAL ──────────────────────────
const revealEls = document.querySelectorAll(
  '.service-card, .section-header, .cat-card, .stat-item, .testi-card, .faq-item, .wf-step, .workflow-visual'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger within a group
      const siblings = [...entry.target.parentElement.children].filter(c => c.classList.contains('reveal'));
      const idx = siblings.indexOf(entry.target);
      const delay = idx * 80;

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

// ─── SERVICE CARD 3D TILT ────────────────────
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x    = e.clientX - rect.left;
    const y    = e.clientY - rect.top;
    const cx   = rect.width  / 2;
    const cy   = rect.height / 2;
    const rx   = ((y - cy) / cy) * -8;
    const ry   = ((x - cx) / cx) *  8;

    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)';
    card.style.transition = 'transform 0.5s ease';
  });

  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.15s ease, background 0.35s, border-color 0.35s';
  });
});

// ─── SMOOTH ANCHOR SCROLL ───────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const id = this.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── HERO PARALLAX (subtle) ──────────────────
const heroVisual = document.getElementById('heroVisual');
const heroOrbs   = document.querySelectorAll('.orb');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  heroOrbs.forEach((orb, i) => {
    const speed = 0.08 + i * 0.04;
    orb.style.transform = `translateY(${scrollY * speed}px)`;
  });
}, { passive: true });

// ─── SEARCH BTN ─────────────────────────────
document.querySelector('.search-btn')?.addEventListener('click', () => {
  // Connect to your search functionality here
  alert('Search feature coming soon!');
});