/**
 * Red and Blue – Main JavaScript
 * Handles: theme toggle, GSAP animations, scroll reveal, form validation & submission
 */
import { initI18n, t } from './i18n.js';

/* ─────────────────────────────────────────
   i18n – MUST RUN FIRST
───────────────────────────────────────── */
initI18n();


/* ─────────────────────────────────────────
   THEME TOGGLE (light / dark / auto)
───────────────────────────────────────── */
const THEME_KEY = 'rb-theme';

function getStoredTheme() {
  return localStorage.getItem(THEME_KEY);
}

function applyTheme(theme) {
  if (theme === 'dark' || theme === 'light') {
    document.documentElement.dataset.theme = theme;
  } else {
    delete document.documentElement.dataset.theme;
  }
}

function toggleTheme() {
  const current = getStoredTheme();
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = current === 'dark' || (!current && systemDark);
  const next = isDark ? 'light' : 'dark';
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
}

// Init theme on load
applyTheme(getStoredTheme());
document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);


/* ─────────────────────────────────────────
   NAV SCROLL STATE
   Toggles .scrolled from the very first pixel of scroll so the
   nav always has readable contrast over the hero background.
───────────────────────────────────────── */
const nav = document.querySelector('.nav');

function updateNavScroll() {
  nav?.classList.toggle('scrolled', window.scrollY > 0);
}

window.addEventListener('scroll', updateNavScroll, { passive: true });
updateNavScroll(); // apply correct state on load


/* ─────────────────────────────────────────
   GSAP ANIMATIONS
───────────────────────────────────────── */
function initAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  // Enable CSS opacity:0 initial states now that GSAP is confirmed
  document.documentElement.classList.add('gsap-ready');

  gsap.registerPlugin(ScrollTrigger);

  // ── Hero staggered reveal ──
  const heroReveals = gsap.utils.toArray('.hero .js-reveal');
  if (heroReveals.length) {
    gsap.fromTo(
      heroReveals,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.2,
      }
    );
  }

  const heroRight = document.querySelector('.hero .js-reveal-right');
  if (heroRight) {
    gsap.fromTo(
      heroRight,
      { opacity: 0, x: 48 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
    );
  }

  // ── Generic section reveals ──
  gsap.utils.toArray('.js-reveal:not(.hero .js-reveal)').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      }
    );
  });

  // ── Right reveals ──
  gsap.utils.toArray('.js-reveal-right:not(.hero .js-reveal-right)').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, x: 40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      }
    );
  });

  // ── Stagger groups ──
  const staggerGroups = {};

  gsap.utils.toArray('.js-stagger').forEach((el) => {
    const parent = el.parentElement;
    if (!parent) return;
    if (!staggerGroups[parent]) staggerGroups[parent] = [];
    staggerGroups[parent].push(el);
  });

  Object.values(staggerGroups).forEach((group) => {
    gsap.fromTo(
      group,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: group[0].parentElement,
          start: 'top 82%',
          once: true,
        },
      }
    );
  });
}

// Wait for GSAP to be available
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimations);
} else {
  // GSAP scripts are synchronous, slight delay for safety
  setTimeout(initAnimations, 50);
}


/* ─────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────── */
const form      = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const success   = document.getElementById('formSuccess');

const VALIDATORS = {
  name:    (v) => v.trim().length >= 2  ? '' : t('contact.error.name'),
  email:   (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : t('contact.error.email'),
  message: (v) => v.trim().length >= 10 ? '' : t('contact.error.message'),
};

function getField(name) {
  return form?.querySelector(`[name="${name}"]`);
}
function getError(name) {
  return form?.querySelector(`[name="${name}"]`)?.parentElement?.querySelector('.field__error');
}

function validateField(name) {
  const input = getField(name);
  const error = getError(name);
  if (!input || !error) return true;

  const msg = VALIDATORS[name]?.(input.value) ?? '';
  error.textContent = msg;
  input.classList.toggle('is-error', !!msg);
  return !msg;
}

function validateAll() {
  return Object.keys(VALIDATORS)
    .map((name) => validateField(name))
    .every(Boolean);
}

// Live validation on blur
Object.keys(VALIDATORS).forEach((name) => {
  getField(name)?.addEventListener('blur', () => validateField(name));
  getField(name)?.addEventListener('input', () => {
    if (getField(name)?.classList.contains('is-error')) validateField(name);
  });
});

// Submit
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!validateAll()) return;

  submitBtn?.classList.add('btn--loading');
  submitBtn.disabled = true;

  const payload = {
    name:    getField('name')?.value.trim(),
    email:   getField('email')?.value.trim(),
    message: getField('message')?.value.trim(),
  };

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error('Server error');

    // Show success
    form.reset();
    if (success) {
      success.hidden = false;
      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

  } catch {
    // Fallback: open mailto
    const subject = encodeURIComponent('Consulta desde redandblue.dev');
    const body    = encodeURIComponent(
      `Nombre: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`
    );
    window.location.href = `mailto:contact@redandblue.dev?subject=${subject}&body=${body}`;
  } finally {
    submitBtn?.classList.remove('btn--loading');
    submitBtn.disabled = false;
  }
});


/* ─────────────────────────────────────────
   SMOOTH ANCHOR SCROLL (offset for nav)
───────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;

    e.preventDefault();
    const navHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '68'
    );
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
