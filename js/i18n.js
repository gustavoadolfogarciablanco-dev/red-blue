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
    'services.heading':         'Estrategias digitales que<br /><em>impulsan resultados</em>',
    'services.intro':           'Cada servicio está diseñado para resolver desafíos reales de negocio con tecnología de vanguardia y las mejores prácticas de la industria.',
    'services.web.kicker':      'Plataformas robustas para empresas en crecimiento',
    'services.web.title':       'Desarrollo Web a Medida',
    'services.web.desc':        'Diseñamos y construimos soluciones web únicas adaptadas a las necesidades específicas de tu empresa. Desde portales corporativos hasta plataformas complejas con lógica personalizada.',
    'services.web.b1':          'Aplicaciones web escalables y seguras',
    'services.web.b2':          'Arquitectura de microservicios',
    'services.web.b3':          'Integraciones con sistemas existentes (ERP, CRM)',
    'services.web.b4':          'Panel de administración personalizado',
    'services.web.b5':          'Optimización de rendimiento y SEO',
    'services.ai.kicker':       'Inteligencia artificial aplicada a tu operación',
    'services.ai.title':        'Integración de IA',
    'services.ai.desc':         'Implementamos modelos de IA que automatizan decisiones, analizan datos y maximizan la capacidad operativa de tu empresa con resultados medibles.',
    'services.ai.b1':           'Chatbots y asistentes inteligentes',
    'services.ai.b2':           'Análisis predictivo de datos',
    'services.ai.b3':           'Procesamiento de lenguaje natural (NLP)',
    'services.ai.b4':           'Automatización de documentos con IA',
    'services.ai.b5':           'Dashboards inteligentes con insights',
    'services.auto.kicker':     'Eficiencia operativa sin tareas repetitivas',
    'services.auto.title':      'Automatización de Procesos',
    'services.auto.desc':       'Eliminamos tareas repetitivas, reducimos errores y mejoramos la eficiencia operativa de tu empresa con flujos de trabajo automatizados y conectados.',
    'services.auto.b1':         'Workflows automatizados end-to-end',
    'services.auto.b2':         'Integración de APIs y servicios',
    'services.auto.b3':         'Reducción de errores operativos',
    'services.auto.b4':         'Reportes y alertas automáticas',
    'services.auto.b5':         'Escalabilidad sin aumentar equipo',
    'services.cta':             'Solicitar información',
    'services.ux.kicker':       'Experiencias digitales centradas en el usuario',
    'services.ux.title':        'Experiencia Digital y UX',
    'services.ux.desc':         'Investigamos, diseñamos y optimizamos interfaces que convierten y escalan, alineadas a tu marca y objetivos de negocio.',
    'services.ux.b1':           'Investigación de usuarios y benchmarking',
    'services.ux.b2':           'Arquitectura de información y flujos',
    'services.ux.b3':           'Design systems y UI kits',
    'services.ux.b4':           'Prototipado y testing de usabilidad',
    'services.ux.b5':           'Optimización de conversión y accesibilidad',
    'services.data.kicker':     'Decisiones basadas en datos confiables',
    'services.data.title':      'Analítica y Data Intelligence',
    'services.data.desc':       'Instrumentamos medición, integración y visualización para transformar datos en decisiones rápidas y accionables.',
    'services.data.b1':         'Tracking de eventos y embudos',
    'services.data.b2':         'Integración de fuentes y ETL',
    'services.data.b3':         'Dashboards ejecutivos y BI',
    'services.data.b4':         'Métricas y OKRs operativos',
    'services.data.b5':         'Alertas y monitoreo continuo',
    'services.cloud.kicker':    'Infraestructura confiable para escalar sin friccion',
    'services.cloud.title':     'Cloud y DevOps',
    'services.cloud.desc':      'Disenamos, automatizamos y optimizamos entornos cloud para acelerar despliegues, mejorar la estabilidad y reducir costos operativos.',
    'services.cloud.b1':        'Infraestructura como codigo (IaC)',
    'services.cloud.b2':        'CI/CD y despliegues automatizados',
    'services.cloud.b3':        'Observabilidad, logs y alertas',
    'services.cloud.b4':        'Hardening y seguridad en cloud',
    'services.cloud.b5':        'Optimizacion de costos y rendimiento',

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
    'contact.email.aria':       'Enviar correo a contact@redandblue.dev',
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
    'footer.made':              'Hecho con precisión en Uruguay.',
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
    'services.heading':         'Digital strategies that<br /><em>drive results</em>',
    'services.intro':           'Each service is designed to solve real business challenges with cutting-edge technology and industry best practices.',
    'services.web.kicker':      'Robust platforms for growing companies',
    'services.web.title':       'Custom Web Development',
    'services.web.desc':        'We design and build unique web solutions tailored to your company\'s needs. From corporate portals to complex platforms with custom logic.',
    'services.web.b1':          'Scalable and secure web applications',
    'services.web.b2':          'Microservices architecture',
    'services.web.b3':          'Integrations with existing systems (ERP, CRM)',
    'services.web.b4':          'Custom admin dashboard',
    'services.web.b5':          'Performance and SEO optimization',
    'services.ai.kicker':       'Artificial intelligence applied to your operation',
    'services.ai.title':        'AI Integration',
    'services.ai.desc':         'We implement AI models that automate decisions, analyze data, and maximize your company\'s operational capacity with measurable results.',
    'services.ai.b1':           'Chatbots and intelligent assistants',
    'services.ai.b2':           'Predictive data analysis',
    'services.ai.b3':           'Natural language processing (NLP)',
    'services.ai.b4':           'AI-powered document automation',
    'services.ai.b5':           'Intelligent dashboards with insights',
    'services.auto.kicker':     'Operational efficiency without repetitive tasks',
    'services.auto.title':      'Process Automation',
    'services.auto.desc':       'We eliminate repetitive tasks, reduce errors, and improve your company\'s operational efficiency with automated, connected workflows.',
    'services.auto.b1':         'End-to-end automated workflows',
    'services.auto.b2':         'API and service integrations',
    'services.auto.b3':         'Reduced operational errors',
    'services.auto.b4':         'Automated reports and alerts',
    'services.auto.b5':         'Scalability without adding headcount',
    'services.cta':             'Request information',
    'services.ux.kicker':       'User-centered digital experiences',
    'services.ux.title':        'Digital Experience and UX',
    'services.ux.desc':         'We research, design, and optimize interfaces that convert and scale, aligned with your brand and business goals.',
    'services.ux.b1':           'User research and benchmarking',
    'services.ux.b2':           'Information architecture and flows',
    'services.ux.b3':           'Design systems and UI kits',
    'services.ux.b4':           'Prototyping and usability testing',
    'services.ux.b5':           'Conversion optimization and accessibility',
    'services.data.kicker':     'Decisions driven by reliable data',
    'services.data.title':      'Analytics and Data Intelligence',
    'services.data.desc':       'We instrument measurement, integration, and visualization to turn data into fast, actionable decisions.',
    'services.data.b1':         'Event tracking and funnels',
    'services.data.b2':         'Source integration and ETL',
    'services.data.b3':         'Executive dashboards and BI',
    'services.data.b4':         'Operational metrics and OKRs',
    'services.data.b5':         'Alerts and continuous monitoring',
    'services.cloud.kicker':    'Reliable infrastructure to scale without friction',
    'services.cloud.title':     'Cloud and DevOps',
    'services.cloud.desc':      'We design, automate, and optimize cloud environments to accelerate deployments, improve stability, and reduce operating costs.',
    'services.cloud.b1':        'Infrastructure as code (IaC)',
    'services.cloud.b2':        'CI/CD and automated deployments',
    'services.cloud.b3':        'Observability, logs, and alerts',
    'services.cloud.b4':        'Cloud security hardening',
    'services.cloud.b5':        'Cost and performance optimization',

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
    'contact.email.aria':       'Send email to contact@redandblue.dev',
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
    'footer.made':              'Made with precision in Uruguay.',
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
