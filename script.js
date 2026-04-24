// ===== HERO VIDEO FADE + TITLE =====
(function() {
  const video = document.querySelector('.hero-video');
  const w1 = document.querySelector('.hw-word-1');
  const w2 = document.querySelector('.hw-word-2');

  function startTyping() {
    if (w1) w1.classList.add('start-anim');
    if (w2) w2.classList.add('start-anim');
  }

  if (video) {
    video.addEventListener('playing', function handler() {
      video.classList.add('fade-in');
      setTimeout(startTyping, 400);
      video.removeEventListener('playing', handler);
    });
    setTimeout(() => {
      video.classList.add('fade-in');
      startTyping();
    }, 3000);
  } else {
    startTyping();
  }
})();

// ===== NAV SCROLL =====
const nav = document.getElementById('main-nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileClose = document.getElementById('mobile-close');

if (hamburger && mobileMenu && mobileClose) {
  hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
  mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

// ===== SCROLL REVEAL =====
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

// ===== STAGGERED REVEAL =====
document.querySelectorAll('.stagger-parent').forEach(parent => {
  parent.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;
  });
});

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const num = Math.floor(eased * target);
    el.innerHTML = num + '<span class="stat-suffix">' + suffix + '</span>';
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => {
  counterObserver.observe(el);
});

// ===== CONTACT FORM =====
// Form is handled by Formspree (native POST) — no JS interception needed.

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) current = section.id;
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--text)' : '';
  });
}, { passive: true });


// ===== TESTIMONIAL CAROUSEL =====
document.addEventListener('DOMContentLoaded', function() {
  var tCurrent = 0;
  var slides = document.querySelectorAll('.testimonial-slide');
  var dots = document.querySelectorAll('.testimonial-dot');

  function showSlide(n) {
    if (!slides.length) return;
    slides.forEach(function(s) { s.classList.remove('active'); });
    dots.forEach(function(d) { d.classList.remove('active'); });
    tCurrent = (n + slides.length) % slides.length;
    slides[tCurrent].classList.add('active');
    if (dots[tCurrent]) dots[tCurrent].classList.add('active');
  }

  window.testimonialNext = function() { showSlide(tCurrent + 1); };
  window.testimonialPrev = function() { showSlide(tCurrent - 1); };
  window.testimonialGo  = function(n) { showSlide(n); };

  // Auto-advance every 6 seconds
  setInterval(function() { showSlide(tCurrent + 1); }, 16000);
});
