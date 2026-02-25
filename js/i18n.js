/**
 * Red and Blue – i18n Module
 * Handles: language detection, dictionary lookup, DOM application, localStorage persistence
 *
 * Public API:
 *   initI18n()          — initialize on DOMContentLoaded (call once)
 *   applyLanguage(code) — switch to 'es' or 'en'
 *   t(key)              — get translated string for current language
 *   getCurrentLang()    — returns current language code
 */

const LANG_KEY  = 'rb-lang';
const SUPPORTED = ['es', 'en'];
const DEFAULT   = 'es';

/* ─────────────────────────────────────────
   TRANSLATION DICTIONARIES
───────────────────────────────────────── */
const translations = {

  /* ── ESPAÑOL ── */
  es: {
    // SEO
    'seo.title':                'Red and Blue – Desarrollo Web a Medida',
    'seo.description':          'Desarrollo web a medida, automatización de procesos e integración de IA para tu negocio. Soluciones rápidas, seguras y escalables.',

    // Navigation
    'nav.aria':                 'Navegación principal',
    'nav.logo.aria':            'Red and Blue – Inicio',
    'nav.cta':                  'Iniciar proyecto',
    'nav.lang.label':           'EN',
    'nav.lang.aria':            'Switch to English',

    // Hero
    'hero.aria':                'Introducción',
    'hero.tag':                 'Desarrollo · IA · Automatización',
    'hero.title':               'Desarrollo web<br /><em>a medida</em>,<br />seguro y escalable',
    'hero.subtitle':            'Construimos soluciones digitales que transforman tu negocio. Rápidas, precisas y diseñadas para crecer con vos.',
    'hero.cta.primary':         'Iniciar proyecto',
    'hero.cta.secondary':       'Ver servicios',
    'hero.scroll.aria':         'Desplazarse a servicios',
    'hero.badge.top':           'Proyectos activos',
    'hero.badge.bottom':        'Proyectos entregados',

    // Services
    'services.tag':             'Qué hacemos',
    'services.heading':         'Soluciones que<br /><em>impulsan</em> tu negocio',
    'services.web.title':       'Desarrollo Web Personalizado',
    'services.web.desc':        'Soluciones únicas adaptadas a las necesidades de tu negocio. Desde landing pages hasta plataformas complejas con lógica a medida.',
    'services.ai.title':        'Integración con IA',
    'services.ai.desc':         'Inteligencia Artificial aplicada a tus sistemas para automatizar decisiones, analizar datos y maximizar la capacidad operativa.',
    'services.auto.title':      'Automatización de Procesos',
    'services.auto.desc':       'Eliminamos tareas repetitivas, reducimos errores y mejoramos la eficiencia operativa de tu empresa con flujos automatizados.',

    // Technologies
    'tech.tag':                 'Stack tecnológico',
    'tech.heading':             'Herramientas de<br /><em>clase mundial</em>',
    'tech.desc':                'Trabajamos con las tecnologías más modernas y probadas para garantizar resultados robustos, rápidos y escalables.',
    'tech.label.ai':            'IA',
    'tech.label.backend-ai':    'Backend / IA',
    'tech.label.db':            'Base de datos',

    // Contact
    'contact.tag':              'Hablemos',
    'contact.heading':          'Contáctanos para<br /><em>desarrollo a medida</em>',
    'contact.desc':             'Convertimos tus ideas en soluciones digitales. Escribinos o contactanos directamente por WhatsApp.',
    'contact.wa.aria':          'Contactar por WhatsApp',
    'contact.email.aria':       'Enviar correo a hola@redandblue.com',
    'contact.form.aria':        'Formulario de contacto para desarrollo a medida',
    'contact.name.label':       'Nombre completo',
    'contact.name.placeholder': 'Tu nombre',
    'contact.email.label':      'Correo electrónico',
    'contact.email.placeholder':'tu@empresa.com',
    'contact.msg.label':        '¿En qué podemos ayudarte?',
    'contact.msg.placeholder':  'Contanos sobre tu proyecto...',
    'contact.submit':           'Enviar mensaje',
    'contact.success':          '✓ Mensaje enviado. Te contactamos en menos de 24hs.',
    'contact.error.name':       'Por favor ingresá tu nombre.',
    'contact.error.email':      'Ingresá un email válido.',
    'contact.error.message':    'El mensaje debe tener al menos 10 caracteres.',

    // Footer
    'footer.logo.aria':         'Red and Blue – Inicio',
    'footer.nav.aria':          'Navegación de pie de página',
    'footer.nav.home':          'Inicio',
    'footer.nav.services':      'Servicios',
    'footer.nav.tech':          'Tecnologías',
    'footer.nav.contact':       'Contacto',
    'footer.copy':              '© 2026 Red and Blue. Todos los derechos reservados.',
    'footer.made':              'Hecho con precisión en Argentina.',
  },

  /* ── ENGLISH ── */
  en: {
    // SEO
    'seo.title':                'Red and Blue – Custom Web Development',
    'seo.description':          'Custom web development, process automation, and AI integration for your business. Fast, secure, and scalable solutions.',

    // Navigation
    'nav.aria':                 'Main navigation',
    'nav.logo.aria':            'Red and Blue – Home',
    'nav.cta':                  'Start a project',
    'nav.lang.label':           'ES',
    'nav.lang.aria':            'Cambiar a español',

    // Hero
    'hero.aria':                'Introduction',
    'hero.tag':                 'Development · AI · Automation',
    'hero.title':               'Custom web<br /><em>development</em>,<br />secure and scalable',
    'hero.subtitle':            'We build digital solutions that transform your business. Fast, precise, and designed to grow with you.',
    'hero.cta.primary':         'Start a project',
    'hero.cta.secondary':       'See services',
    'hero.scroll.aria':         'Scroll to services',
    'hero.badge.top':           'Active projects',
    'hero.badge.bottom':        'Delivered projects',

    // Services
    'services.tag':             'What we do',
    'services.heading':         'Solutions that<br /><em>drive</em> your business',
    'services.web.title':       'Custom Web Development',
    'services.web.desc':        'Unique solutions tailored to your business needs. From landing pages to complex platforms with custom logic.',
    'services.ai.title':        'AI Integration',
    'services.ai.desc':         'Artificial Intelligence applied to your systems to automate decisions, analyze data, and maximize operational capacity.',
    'services.auto.title':      'Process Automation',
    'services.auto.desc':       'We eliminate repetitive tasks, reduce errors, and improve your company\'s operational efficiency with automated workflows.',

    // Technologies
    'tech.tag':                 'Tech Stack',
    'tech.heading':             'World-class<br /><em>tools</em>',
    'tech.desc':                'We work with the most modern and proven technologies to guarantee robust, fast, and scalable results.',
    'tech.label.ai':            'AI',
    'tech.label.backend-ai':    'Backend / AI',
    'tech.label.db':            'Database',

    // Contact
    'contact.tag':              "Let's talk",
    'contact.heading':          'Contact us for<br /><em>custom development</em>',
    'contact.desc':             'We turn your ideas into digital solutions. Write to us or reach us directly via WhatsApp.',
    'contact.wa.aria':          'Contact via WhatsApp',
    'contact.email.aria':       'Send email to hola@redandblue.com',
    'contact.form.aria':        'Contact form for custom development',
    'contact.name.label':       'Full name',
    'contact.name.placeholder': 'Your name',
    'contact.email.label':      'Email address',
    'contact.email.placeholder':'you@company.com',
    'contact.msg.label':        'How can we help you?',
    'contact.msg.placeholder':  'Tell us about your project...',
    'contact.submit':           'Send message',
    'contact.success':          "✓ Message sent. We'll reach out within 24 hours.",
    'contact.error.name':       'Please enter your name.',
    'contact.error.email':      'Please enter a valid email address.',
    'contact.error.message':    'Message must be at least 10 characters.',

    // Footer
    'footer.logo.aria':         'Red and Blue – Home',
    'footer.nav.aria':          'Footer navigation',
    'footer.nav.home':          'Home',
    'footer.nav.services':      'Services',
    'footer.nav.tech':          'Technologies',
    'footer.nav.contact':       'Contact',
    'footer.copy':              '© 2026 Red and Blue. All rights reserved.',
    'footer.made':              'Made with precision in Argentina.',
  },
};

/* ─────────────────────────────────────────
   STATE
───────────────────────────────────────── */
let currentLang = DEFAULT;

/* ─────────────────────────────────────────
   PUBLIC API
───────────────────────────────────────── */

/**
 * Look up a translation key for the current language.
 * Returns the key itself as fallback (never throws).
 */
export function t(key) {
  return translations[currentLang]?.[key] ?? key;
}

/** Returns the active language code: 'es' | 'en' */
export function getCurrentLang() {
  return currentLang;
}

/**
 * Apply a language to the entire page:
 * - Persists choice in localStorage
 * - Updates <html lang>
 * - Updates document.title and meta description
 * - Updates all [data-i18n-*] elements
 * - Updates the lang toggle button
 */
export function applyLanguage(langCode) {
  if (!SUPPORTED.includes(langCode)) return;
  currentLang = langCode;

  // Persist
  localStorage.setItem(LANG_KEY, langCode);

  // Declared page language (accessibility + SEO)
  document.documentElement.setAttribute('lang', langCode);

  // SEO metadata
  document.title = t('seo.title');
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', t('seo.description'));

  // Text content (simple strings)
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });

  // HTML content (strings containing <br>, <em>, etc.)
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });

  // Placeholder attributes
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });

  // aria-label attributes
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    el.setAttribute('aria-label', t(el.dataset.i18nAria));
  });

  // Update lang toggle button label (shows OTHER language)
  const langBtn = document.getElementById('langToggle');
  if (langBtn) {
    langBtn.textContent = t('nav.lang.label');
    langBtn.setAttribute('aria-label', t('nav.lang.aria'));
  }

  // Screen reader announcement
  const announcer = document.getElementById('lang-announcer');
  if (announcer) {
    announcer.textContent = langCode === 'en' ? 'Language: English' : 'Idioma: Español';
  }
}

/**
 * Detect the user's preferred language.
 * Priority: localStorage → navigator.language → default 'es'
 */
function detectLanguage() {
  const stored = localStorage.getItem(LANG_KEY);
  if (stored && SUPPORTED.includes(stored)) return stored;

  const browser = (navigator.language || '').slice(0, 2).toLowerCase();
  if (SUPPORTED.includes(browser)) return browser;

  return DEFAULT;
}

/**
 * Initialize i18n on page load.
 * Call once, before GSAP animations.
 */
export function initI18n() {
  const init = () => {
    const lang = detectLanguage();
    applyLanguage(lang);

    const langBtn = document.getElementById('langToggle');
    if (langBtn && !langBtn.dataset.i18nBound) {
      langBtn.addEventListener('click', () => {
        const next = getCurrentLang() === 'es' ? 'en' : 'es';
        applyLanguage(next);
      });
      langBtn.dataset.i18nBound = 'true';
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
}
