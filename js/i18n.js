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
  es: {
    // SEO
    'seo.title':                'Red and Blue – Desarrollo Web a Medida',
    'seo.description':          'Desarrollo web a medida, automatización de procesos e integración de IA para tu negocio. Soluciones rápidas, seguras y escalables.',
    'nav.aria':                 'Navegación principal',
    'nav.logo.aria':            'Red and Blue – Inicio',
    'nav.cta':                  'Iniciar proyecto',
    'nav.lang.label':           'EN',
    'nav.lang.aria':            'Switch to English',
    'hero.aria':                'Introducción',
    'hero.tag':                 'Desarrollo · IA · Automatización',
    'hero.title':               'Desarrollo web<br /><em>a medida</em>,<br />seguro y escalable',
    'hero.subtitle':            'Construimos soluciones digitales que transforman tu negocio. Rápidas, precisas y diseñadas para crecer con vos.',
    'hero.cta.primary':         'Iniciar proyecto',
    'hero.cta.secondary':       'Ver servicios',
    'hero.scroll.aria':         'Desplazarse a servicios',
    'hero.badge.top':           'Proyectos activos',
    'hero.badge.bottom':        'Proyectos entregados',
    'faq.tag':                  '¿Tienes dudas?',
    'faq.heading':              'Todo lo que necesitás <em>saber</em>',
    'faq.desc':                 'Reunimos las preguntas que más nos hacen para que tomes decisiones con información clara.',
    'faq.cta':                  'Hablemos',
    'faq.q1':                   '¿En qué tipo de proyectos se especializan?',
    'faq.a1':                   'Trabajamos principalmente en productos digitales a medida: plataformas web, automatizaciones y sistemas con IA integrada. Si tenés una idea o un proceso que querés digitalizar, podemos ayudarte.',
    'faq.q2':                   '¿Por qué no usar una solución genérica del mercado?',
    'faq.a2':                   'Las herramientas genéricas obligan a tu negocio a adaptarse a ellas. Nosotros hacemos lo contrario: construimos algo que encaja exactamente con cómo trabajás, sin funciones que no necesitás ni limitaciones que te frenen.',
    'faq.q3':                   '¿Qué tan involucrado tengo que estar durante el desarrollo?',
    'faq.a3':                   'Lo que vos quieras. Hay clientes que prefieren validar cada decisión y otros que nos dan libertad total. Nos adaptamos a tu disponibilidad y siempre te mantenemos informado del avance.',
    'faq.q4':                   '¿Cuánto tiempo tarda en estar listo mi proyecto?',
    'faq.a4':                   'Un MVP puede estar operativo en 4 a 8 semanas. Para soluciones más complejas, trabajamos con entregas parciales para que puedas usar el producto mientras seguimos construyendo.',
    'faq.q5':                   '¿Qué pasa después de que el proyecto se lanza?',
    'faq.a5':                   'No desaparecemos. Ofrecemos soporte continuo, mejoras iterativas y monitoreo. El lanzamiento es el comienzo, no el final.',
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
    'services.cloud.desc':      'Diseñamos, automatizamos y optimizamos entornos cloud para acelerar despliegues, mejorar la estabilidad y reducir costos operativos.',
    'services.cloud.b1':        'Infraestructura como codigo (IaC)',
    'services.cloud.b2':        'CI/CD y despliegues automatizados',
    'services.cloud.b3':        'Observabilidad, logs y alertas',
    'services.cloud.b4':        'Hardening y seguridad en cloud',
    'services.cloud.b5':        'Optimizacion de costos y rendimiento',
    'showcase.tag':             'Productos Digitales a Medida',
    'showcase.heading':         'Transformá tus procesos con <em>tecnología</em>',
    'showcase.desc':            'Diseñamos soluciones que simplifican tu operación y hacen crecer tu negocio.',
    'showcase.feat1.title':     'A tu medida, con soporte real',
    'showcase.feat1.desc':      'Construimos productos que se adaptan a cómo trabajás, no al revés. Tu equipo siempre tiene a alguien con quien contar.',
    'showcase.feat2.title':     'Listo para usar desde el día uno',
    'showcase.feat2.desc':      'Software que funciona desde el primer día y evoluciona con tu negocio. Sin fricciones, sin curvas de aprendizaje interminables.',
    'showcase.feat3.title':     'Rendimiento alto, riesgos bajos',
    'showcase.feat3.desc':      'Tecnología robusta con seguridad integrada para que puedas enfocarte en lo que importa.',
    'tech.tag':                 'Stack tecnológico',
    'tech.heading':             'Herramientas que <em>potencian resultados</em>',
    'tech.desc':                'Dominamos un ecosistema completo de tecnologías de vanguardia, desde frontend y backend hasta inteligencia artificial e infraestructura cloud.',
    'tech.filters.aria':        'Filtros de tecnología',
    'tech.filter.all':          'Todos',
    'tech.filter.frontend':     'Frontend',
    'tech.filter.backend':      'Backend',
    'tech.filter.ai':           'Inteligencia Artificial',
    'tech.filter.data':         'Data y Analitica',
    'tech.filter.automation':   'Automatizacion',
    'tech.filter.cloud':        'Cloud y DevOps',
    'tech.filter.ux':           'UX y Producto',
    'tech.filter.infra':        'Infraestructura',
    'tech.count.label':         'Mostrando',
    'tech.count.suffix':        'tecnologias',
    'tech.cat.frontend':        'Frontend',
    'tech.cat.backend':         'Backend',
    'tech.cat.ai':              'Inteligencia Artificial',
    'tech.cat.infra':           'Infraestructura',
    'tech.card.react':          'Ecosistema lider para interfaces dinamicas con arquitectura basada en componentes, ideal para productos escalables y UI complejas.',
    'tech.card.next':           'Framework full stack con SSR e ISR que mejora el SEO y acelera cargas en experiencias empresariales.',
    'tech.card.angular':        'Plataforma enterprise con tipado estricto, CLI robusta e integraciones maduras para grandes equipos.',
    'tech.card.javascript':     'Lenguaje base del front moderno para interacciones ricas, compatibilidad amplia y alto rendimiento.',
    'tech.card.nuxt':           'Framework Vue para SSR con routing avanzado, rendimiento optimizado y DX empresarial.',
    'tech.card.vue':            'Framework progresivo con excelente performance y curva de aprendizaje rapida para equipos agiles.',
    'tech.card.typescript':     'Tipado estatico para codigo mantenible, menos bugs y mayor previsibilidad en produccion.',
    'tech.card.htmlcss':        'Interfaces semanticas, accesibles y optimizadas para SEO con estilos modernos y consistentes.',
    'tech.card.figma':          'Diseno colaborativo para prototipos, UI kits y handoff fluido entre producto y desarrollo.',
    'tech.card.designsystems':  'Sistemas escalables que aseguran consistencia visual, gobernanza y velocidad de entrega.',
    'tech.card.storybook':      'Catalogo vivo de componentes para equipos distribuidos, con documentacion y testing visual.',
    'tech.card.n8n':            'Workflows flexibles para integraciones y automatizacion operativa con conectores personalizados.',
    'tech.card.zapier':         'Automatizacion no-code para conectar apps y procesos sin friccion ni desarrollo pesado.',
    'tech.card.airflow':        'Orquestacion de pipelines y trabajos criticos con scheduling, monitoreo y retries.',
    'tech.card.uipath':         'RPA para procesos repetitivos y tareas de backoffice con trazabilidad y control.',
    'tech.card.node':           'Runtime de alta concurrencia para APIs y servicios en tiempo real con ecosistema amplio.',
    'tech.card.python':         'APIs, data pipelines y automatizacion con frameworks productivos y rapido time-to-market.',
    'tech.card.java':           'Microservicios empresariales con alta disponibilidad, performance y ecosistema maduro.',
    'tech.card.dotnet':         'Plataforma robusta para servicios empresariales, seguridad y rendimiento en produccion.',
    'tech.card.go':             'Servicios eficientes para alta concurrencia y baja latencia, con despliegue liviano.',
    'tech.card.graphql':        'APIs flexibles para integrar frontend, mobile y partners con control de datos y versionado.',
    'tech.card.postgres':       'Base de datos relacional con ACID, replicacion, extensiones y analitica avanzada.',
    'tech.card.mongo':          'NoSQL flexible para datos semi estructurados, escalado horizontal y rapidez de iteracion.',
    'tech.card.snowflake':      'Data warehouse elastico para analitica empresarial con costos optimizados por uso.',
    'tech.card.bigquery':       'Analitica serverless con consultas masivas en segundos y escalado automatico.',
    'tech.card.kafka':          'Streaming de eventos para integraciones en tiempo real y arquitecturas orientadas a datos.',
    'tech.card.dbt':            'Transformacion de datos con versionado, pruebas y gobernanza para equipos de analytics.',
    'tech.card.rust':           'Servicios seguros y de alto rendimiento para sistemas criticos y cargas intensivas.',
    'tech.card.nest':           'Framework Node enterprise con arquitectura modular, testing y escalabilidad nativa.',
    'tech.card.redis':          'Cache y colas para respuestas ultrarrapidas, sesiones y workloads en tiempo real.',
    'tech.card.splunk':         'Observabilidad y analitica operativa con busqueda en tiempo real y alertas avanzadas.',
    'tech.card.amplitude':      'Producto y analytics para mejorar activacion, retencion y conversion con insights claros.',
    'tech.card.openai':         'Modelos de lenguaje para automatizacion, analisis y generacion de contenido con seguridad.',
    'tech.card.claude':         'LLM avanzado para razonamiento, analisis documental y flujos de asistencia confiables.',
    'tech.card.langchain':      'Orquestacion de agentes, RAG y flujos de razonamiento con integraciones a datos.',
    'tech.card.vector':         'Pinecone, Weaviate y FAISS para busquedas semanticas y retrieval eficiente.',
    'tech.card.vision':         'Deteccion de objetos, OCR y analitica visual automatizada para procesos industriales.',
    'tech.card.ml':             'Modelos predictivos con TensorFlow y PyTorch para produccion y despliegue escalable.',
    'tech.card.nlp':            'Procesamiento de lenguaje para insights, resumen y entidades en grandes volumenes.',
    'tech.card.aws':            'Servicios cloud globales para computo, storage y redes con alta disponibilidad.',
    'tech.card.azure':          'Cloud enterprise con integracion a ecosistemas Microsoft y seguridad corporativa.',
    'tech.card.gcp':            'Infraestructura escalable con foco en datos, IA y herramientas gestionadas.',
    'tech.card.docker':         'Contenedores y orquestacion para despliegues reproducibles y entornos consistentes.',
    'tech.card.vercel':         'Deploys atomicos y edge network para performance global y entregas continuas.',
    'tech.card.gha':            'CI/CD automatizado con testing, validaciones y despliegue continuo confiable.',
    'tech.card.terraform':      'Infraestructura como codigo para provisioning repetible y control de cambios.',
    'tech.card.observability':  'Observabilidad, alertas y metricas para operaciones confiables y respuesta rapida.',
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
    'footer.logo.aria':         'Red and Blue – Inicio',
    'footer.nav.aria':          'Navegación de pie de página',
    'footer.nav.home':          'Inicio',
    'footer.nav.services':      'Servicios',
    'footer.nav.tech':          'Tecnologías',
    'footer.nav.contact':       'Contacto',
    'footer.copy':              '© 2026 Red and Blue. Todos los derechos reservados.',
    'footer.made':              'Hecho con precisión en Uruguay.',
    'loading.label':            'Cargando',
    'loading.aria':             'Cargando contenido',
    "why.tag":                  "¿Por qué nosotros?",
    "why.heading":              "Soluciones tecnológicas <em>alineadas a tus objetivos</em>",
    "why.desc":                 "Nos integramos con tu forma de trabajar para que obtengas resultados sin complicaciones. Desde entender tu necesidad, implementarla y dar soporte. Al finalizar, el código te pertenece, dándote control total sobre tu solución.",
    "why.cta.primary":          "Empecemos tu proyecto",
    "why.card1.desc":           "Evolucionamos constantemente nuestras herramientas y procesos para ofrecerte soluciones tecnológicas funcionales, seguras y preparadas para el futuro.",
    "why.card2.desc":           "Somos tu socio estratégico para convertir ideas en resultados reales. Nuestro compromiso es claro: calidad en cada paso y soluciones que hacen crecer tu negocio.",
    "cform.subject.label": "Asunto",
    "cform.subject.opt0": "Seleccioná un asunto",
    "cform.subject.opt1": "Desarrollo a medida",
    "cform.subject.opt2": "Automatización de procesos",
    "cform.subject.opt3": "Consultoría tecnológica",
    "cform.subject.opt4": "Integración con IA",
    "cform.subject.opt5": "Otro",
    "cform.name.label": "Nombre Completo",
    "cform.name.placeholder": "Tu nombre completo",
    "cform.email.label": "Correo",
    "cform.email.placeholder": "correo@ejemplo.com",
    "cform.company.label": "Nombre de la empresa",
    "cform.company.placeholder": "Mi Empresa",
    "cform.phone.label": "Teléfono",
    "cform.phone.placeholder": "123 456 7890",
    "cform.message.label": "Mensaje",
    "cform.message.placeholder": "Cuéntanos sobre ti o sobre tu proyecto...",
    "cform.error.required": "Completá todos los campos obligatorios.",
    "cform.error.email": "Ingresá un correo válido.",
    "cform.privacy": "Estoy de acuerdo con la <a href=\"/privacidad\" target=\"_blank\">Política de Privacidad</a> y los <a href=\"/terminos\" target=\"_blank\">Términos del Servicio</a>",
    "cform.newsletter": "Estoy de acuerdo en recibir boletines, actualizaciones y ofertas especiales por correo electrónico.",
    "cform.submit": "Enviar",
    "cform.success.title": "¡Mensaje enviado!",
    "cform.success.desc": "Te contactamos en menos de 24hs.",
    "toast.success.contact": "Tu mensaje fue enviado con éxito. Nos pondremos en contacto pronto.",
    "toast.error.contact": "Hubo un error al enviar tu mensaje. Por favor, intentá nuevamente en unos minutos.",
    "toast.error.privacy": "Por favor, aceptá los términos y condiciones para continuar."
  },
  en: {
    'seo.title':                'Red and Blue – Custom Web Development',
    'seo.description':          'Custom web development, process automation, and AI integration for your business. Fast, secure, and scalable solutions.',
    'nav.aria':                 'Main navigation',
    'nav.logo.aria':            'Red and Blue – Home',
    'nav.cta':                  'Start a project',
    'nav.lang.label':           'ES',
    'nav.lang.aria':            'Cambiar a español',
    'hero.aria':                'Introduction',
    'hero.tag':                 'Development · AI · Automation',
    'hero.title':               'Custom web<br /><em>development</em>,<br />secure and scalable',
    'hero.subtitle':            'We build digital solutions that transform your business. Fast, precise, and designed to grow with you.',
    'hero.cta.primary':         'Start a project',
    'hero.cta.secondary':       'See services',
    'hero.scroll.aria':         'Scroll to services',
    'hero.badge.top':           'Active projects',
    'hero.badge.bottom':        'Delivered projects',
    'faq.tag':                  'Got questions?',
    'faq.heading':              'Everything you need <em>to know</em>',
    'faq.desc':                 'We put together the questions we hear most so you can make informed decisions from the start.',
    'faq.cta':                  "Let's talk",
    'faq.q1':                   'What kind of projects do you specialize in?',
    'faq.a1':                   'We focus on custom digital products: web platforms, process automation, and AI-powered systems. If you have an idea or a workflow you want to digitize, we can make it happen.',
    'faq.q2':                   'Why not just use an off-the-shelf solution?',
    'faq.a2':                   'Generic tools force your business to adapt to them. We do the opposite — we build something that fits exactly how you work, without unnecessary features or limitations that slow you down.',
    'faq.q3':                   'How involved do I need to be during development?',
    'faq.a3':                   'As much or as little as you want. Some clients validate every decision, others give us full autonomy. We adapt to your availability and always keep you in the loop.',
    'faq.q4':                   'How long does it take to build my project?',
    'faq.a4':                   'An MVP can be live in 4 to 8 weeks. For more complex solutions, we work in partial deliveries so you can start using the product while we keep building.',
    'faq.q5':                   'What happens after the project launches?',
    'faq.a5':                   "We don't disappear. We offer ongoing support, iterative improvements, and monitoring. The launch is the beginning, not the end.",
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
    'showcase.tag':             'Custom Digital Products',
    'showcase.heading':         'Turn your workflows into <em>smart systems</em>',
    'showcase.desc':            'We build solutions that streamline your operations and accelerate your business growth.',
    'showcase.feat1.title':     'Built for you, backed by us',
    'showcase.feat1.desc':      'Every product is shaped around how your team actually works — with ongoing support every step of the way.',
    'showcase.feat2.title':     'Ready to run from day one',
    'showcase.feat2.desc':      'Software that delivers value immediately and scales as you grow. No steep learning curves, no friction.',
    'showcase.feat3.title':     'High performance, low risk',
    'showcase.feat3.desc':      'Robust technology with built-in security so you can stay focused on what truly matters.',
    'tech.tag':                 'Tech Stack',
    'tech.heading':             'Tools that <em>drive results</em>',
    'tech.desc':                'We master a full ecosystem of cutting-edge technology, from frontend and backend to AI and cloud infrastructure.',
    'tech.filters.aria':        'Technology filters',
    'tech.filter.all':          'All',
    'tech.filter.frontend':     'Frontend',
    'tech.filter.backend':      'Backend',
    'tech.filter.ai':           'Artificial Intelligence',
    'tech.filter.data':         'Data and Analytics',
    'tech.filter.automation':   'Automation',
    'tech.filter.cloud':        'Cloud and DevOps',
    'tech.filter.ux':           'UX and Product',
    'tech.filter.infra':        'Infrastructure',
    'tech.count.label':         'Showing',
    'tech.count.suffix':        'technologies',
    'tech.cat.frontend':        'Frontend',
    'tech.cat.backend':         'Backend',
    'tech.cat.ai':              'Artificial Intelligence',
    'tech.cat.infra':           'Infrastructure',
    'tech.card.react':          'Leading ecosystem for dynamic interfaces with component-driven architecture and scalable UI delivery.',
    'tech.card.next':           'Full stack framework with SSR and ISR that improves SEO and load times for enterprise apps.',
    'tech.card.angular':        'Enterprise-grade platform with strict typing, robust tooling, and mature integrations.',
    'tech.card.javascript':     'Core language for modern frontends with rich interactions and broad compatibility.',
    'tech.card.nuxt':           'Vue framework for SSR with advanced routing, performance tuning, and enterprise DX.',
    'tech.card.vue':            'Progressive framework with strong performance and fast onboarding for agile teams.',
    'tech.card.typescript':     'Static typing for maintainable, predictable production code and safer refactors.',
    'tech.card.htmlcss':        'Semantic, accessible interfaces optimized for SEO with modern layout techniques.',
    'tech.card.figma':          'Collaborative design for prototypes, UI kits, and smooth handoff to engineering.',
    'tech.card.designsystems':  'Scalable systems that ensure consistency, governance, and faster delivery.',
    'tech.card.storybook':      'Living component catalog for distributed teams, documentation, and visual testing.',
    'tech.card.n8n':            'Flexible workflows for integrations and operational automation with custom connectors.',
    'tech.card.zapier':         'No-code automation to connect apps and processes without heavy engineering.',
    'tech.card.airflow':        'Orchestration of pipelines and mission-critical jobs with scheduling and retries.',
    'tech.card.uipath':         'RPA for repetitive processes and back-office tasks with full traceability.',
    'tech.card.node':           'High-concurrency runtime for APIs and real-time services with broad ecosystem support.',
    'tech.card.python':         'APIs, data pipelines, and automation with production-ready frameworks and fast iteration.',
    'tech.card.java':           'Enterprise microservices with high availability, performance, and a mature ecosystem.',
    'tech.card.dotnet':         'Robust platform for enterprise services, security, and reliable production workloads.',
    'tech.card.go':             'Efficient services for high concurrency and low latency with lightweight deployments.',
    'tech.card.graphql':        'Flexible APIs to connect frontend, mobile, and partners with precise data control.',
    'tech.card.postgres':       'Relational database with ACID, replication, extensions, and advanced analytics.',
    'tech.card.mongo':          'Flexible NoSQL for semi-structured data, horizontal scaling, and rapid iteration.',
    'tech.card.snowflake':      'Elastic data warehouse for enterprise analytics with usage-based optimization.',
    'tech.card.bigquery':       'Serverless analytics with massive queries in seconds and automatic scaling.',
    'tech.card.kafka':          'Event streaming for real-time integrations and data-driven architectures.',
    'tech.card.dbt':            'Data transformation with versioning, testing, and governance for analytics teams.',
    'tech.card.rust':           'Secure, high-performance services for critical systems and heavy workloads.',
    'tech.card.nest':           'Enterprise Node framework with modular, scalable architecture and testing support.',
    'tech.card.redis':          'Cache and queues for ultra-fast responses, sessions, and real-time workloads.',
    'tech.card.splunk':         'Operational observability and analytics with real-time search and alerting.',
    'tech.card.amplitude':      'Product analytics to improve activation, retention, and conversion with clear insights.',
    'tech.card.openai':         'Language models for automation, analysis, and content generation with guardrails.',
    'tech.card.claude':         'Advanced LLM for reasoning, document analysis, and reliable assistants.',
    'tech.card.langchain':      'Agent orchestration, RAG, and reasoning workflows with data integrations.',
    'tech.card.vector':         'Pinecone, Weaviate, and FAISS for semantic search and efficient retrieval.',
    'tech.card.vision':         'Object detection, OCR, and automated visual analytics for industrial workflows.',
    'tech.card.ml':             'Predictive models with TensorFlow and PyTorch for production and scalable deployment.',
    'tech.card.nlp':            'Language processing for insights, summarization, and entity extraction at scale.',
    'tech.card.aws':            'Global cloud services for compute, storage, and networking with high availability.',
    'tech.card.azure':          'Enterprise cloud with deep Microsoft ecosystem integration and security.',
    'tech.card.gcp':            'Scalable infrastructure with a focus on data, AI, and managed tooling.',
    'tech.card.docker':         'Containers and orchestration for reproducible deployments and consistent environments.',
    'tech.card.vercel':         'Atomic deploys and edge network for global performance and continuous delivery.',
    'tech.card.gha':            'Automated CI/CD with testing, validations, and reliable continuous delivery.',
    'tech.card.terraform':      'Infrastructure as code for repeatable provisioning and change control.',
    'tech.card.observability':  'Observability, alerts, and metrics for reliable operations and fast response.',
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
    'footer.logo.aria':         'Red and Blue – Home',
    'footer.nav.aria':          'Footer navigation',
    'footer.nav.home':          'Home',
    'footer.nav.services':      'Services',
    'footer.nav.tech':          'Technologies',
    'footer.nav.contact':       'Contact',
    'footer.copy':              '© 2026 Red and Blue. All rights reserved.',
    'footer.made':              'Made with precision in Uruguay.',
    'loading.label':            'Loading',
    'loading.aria':             'Loading content',
    "why.tag":                  "Why us?",
    "why.heading":              "Technology solutions <em>aligned with your goals</em>",
    "why.desc":                 "We integrate with your workflow so you can achieve results without complications. From understanding your needs to implementation and ongoing support. In the end, the code is yours—giving you full control over your solution.",
    "why.cta.primary":          "Start your project",
    "why.card1.desc":           "We continuously evolve our tools and processes to deliver functional, secure, and future-ready technology solutions.",
    "why.card2.desc":           "We are your strategic partner to turn ideas into real results. Our commitment is clear: quality at every step and solutions that help your business grow.",
    "cform.subject.label": "Subject",
    "cform.subject.opt0": "Select a subject",
    "cform.subject.opt1": "Custom development",
    "cform.subject.opt2": "Process automation",
    "cform.subject.opt3": "Technology consulting",
    "cform.subject.opt4": "AI integration",
    "cform.subject.opt5": "Other",
    "cform.name.label": "Full Name",
    "cform.name.placeholder": "Your full name",
    "cform.email.label": "Email",
    "cform.email.placeholder": "email@example.com",
    "cform.company.label": "Company name",
    "cform.company.placeholder": "My Company",
    "cform.phone.label": "Phone",
    "cform.phone.placeholder": "123 456 7890",
    "cform.message.label": "Message",
    "cform.message.placeholder": "Tell us about yourself or your project...",
    "cform.error.required": "Please fill in all required fields.",
    "cform.error.email": "Please enter a valid email address.",
    "cform.privacy": "I agree to the <a href=\"/privacidad\" target=\"_blank\">Privacy Policy</a> and the <a href=\"/terminos\" target=\"_blank\">Terms of Service</a>",
    "cform.newsletter": "I agree to receive newsletters, updates, and special offers via email.",
    "cform.submit": "Send",
    "cform.success.title": "Message sent!",
    "cform.success.desc": "We will contact you within 24 hours.",
    "toast.success.contact": "Your message was sent successfully. We’ll get in touch soon.",
    "toast.error.contact": "There was an error sending your message. Please try again in a few minutes.",
    "toast.error.privacy": "Please accept the terms and conditions to continue."
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

  localStorage.setItem(LANG_KEY, langCode);

  document.documentElement.setAttribute('lang', langCode);

  document.title = t('seo.title');
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', t('seo.description'));

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const value = t(el.dataset.i18n);
    if (value !== el.dataset.i18n) el.textContent = value;
  });

  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const value = t(el.dataset.i18nHtml);
    if (value !== el.dataset.i18nHtml) el.innerHTML = value;
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const value = t(el.dataset.i18nPlaceholder);
    if (value !== el.dataset.i18nPlaceholder) el.placeholder = value;
  });

  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    const value = t(el.dataset.i18nAria);
    if (value !== el.dataset.i18nAria) el.setAttribute('aria-label', value);
  });

  const langBtn = document.getElementById('langToggle');
  if (langBtn) {
    langBtn.textContent = t('nav.lang.label');
    langBtn.setAttribute('aria-label', t('nav.lang.aria'));
  }

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
export function initI18n(onReady) {
  const init = () => {
    const lang = detectLanguage();
    applyLanguage(lang);

    if (typeof onReady === 'function') {
      onReady(lang);
    }

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
