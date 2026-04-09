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
    'nav.cta':                  'Hablemos de tu proyecto',
    'nav.lang.label':           'EN',
    'nav.lang.aria':            'Switch to English',
    'hero.aria':                'Introducción',
    'hero.tag':                 'DESARROLLO · CLOUD · IA · AUTOMATIZACIÓN · DISEÑO',
    'hero.title':               'Tu operación escala.<br /><em>Sin escalar el equipo.</em>',
    'hero.subtitle':            'Cada proceso que sigue corriendo en planillas o emails es productividad que perdés. Construimos el software, la automatización y la IA que lo resuelven — y que se pagan solos.',
    'hero.cta.primary':         'Quiero una solución a medida',
    'hero.cta.secondary':       'Ver qué hacemos',
    'hero.scroll.aria':         'Desplazarse a servicios',
    'hero.badge.top':           'Proyectos activos',
    'hero.badge.bottom':        'Proyectos entregados',
    'faq.tag':                  '¿Tienes dudas?',
    'faq.heading':              'Las preguntas que <em>todos hacen</em>',
    'faq.desc':                 'Antes de hablar con nosotros, probablemente tenés estas dudas. Acá van las respuestas honestas.',
    'faq.cta':                  'Hablemos sin compromiso',
    'faq.q1':                   '¿Cómo sé si realmente necesito desarrollo a medida?',
    'faq.a1':                   'Si tenés procesos que corren en planillas, pasos que dependen de personas específicas, o herramientas que obligan a tu equipo a hacer workarounds, el desarrollo a medida deja de ser un lujo y pasa a ser una ventaja competitiva real.',
    'faq.q2':                   '¿No es más barato usar herramientas del mercado como Salesforce o HubSpot?',
    'faq.a2':                   'Puede serlo al principio. Pero las licencias crecen con el equipo, los workarounds se acumulan y terminás pagando más en tiempo perdido que en la solución misma. Hacemos el análisis juntos para que tomes la decisión informada.',
    'faq.q3':                   '¿Tengo que dedicarle mucho tiempo si trabajo con ustedes?',
    'faq.a3':                   'Te pedimos entre 2 y 4 horas por semana para validaciones. No más. El resto lo manejamos nosotros y te mantenemos al tanto con actualizaciones claras — sin tecnicismos.',
    'faq.q4':                   'Me prometieron proyectos en 2 semanas y tardaron 6 meses. ¿Por qué sería diferente?',
    'faq.a4':                   'Estimamos con buffers reales, hitos verificables y entregas parciales. Si algo cambia, lo comunicamos antes, no después. Trabajamos en iteraciones cortas para que siempre veas progreso concreto.',
    'faq.q5':                   'Terminan el proyecto y desaparecen. ¿Qué pasa con el soporte?',
    'faq.a5':                   'El lanzamiento activa el contrato de soporte. Monitoreo, mejoras iterativas, corrección de bugs — seguimos ahí. La mayoría de nuestros clientes trabajan con nosotros más de un año después del lanzamiento.',
    'services.tag':             'Qué hacemos',
    'services.heading':         'Tecnología que resuelve<br /><em>problemas reales</em>',
    'services.intro':           'No vendemos proyectos. Resolvemos los cuellos de botella que frenan tu crecimiento — con la tecnología exacta que cada problema necesita.',
    'services.web.kicker':      'Cuando el software genérico ya no alcanza',
    'services.web.title':       'Desarrollo Web a Medida',
    'services.web.desc':        'Tu negocio tiene procesos propios que ninguna herramienta del mercado entiende. Construimos la plataforma que encaja exactamente con tu operación — sin workarounds, sin limitaciones que te frenen.',
    'services.web.b1':          'Aplicaciones web escalables y seguras',
    'services.web.b2':          'Arquitectura de microservicios',
    'services.web.b3':          'Integraciones con sistemas existentes (ERP, CRM)',
    'services.web.b4':          'Panel de administración personalizado',
    'services.web.b5':          'Optimización de rendimiento y SEO',
    'services.ai.kicker':       'Poné la IA a trabajar en tu operación hoy',
    'services.ai.title':        'Integración de IA',
    'services.ai.desc':         'No es un experimento ni una demo. Implementamos IA que resuelve tareas concretas en tu operación: clasifica, responde, predice y extrae. Resultados medibles desde las primeras semanas.',
    'services.ai.b1':           'Chatbots y asistentes inteligentes',
    'services.ai.b2':           'Análisis predictivo de datos',
    'services.ai.b3':           'Procesamiento de lenguaje natural (NLP)',
    'services.ai.b4':           'Automatización de documentos con IA',
    'services.ai.b5':           'Dashboards inteligentes con insights',
    'services.auto.kicker':     'Tu equipo para pensar. Las máquinas para lo repetitivo.',
    'services.auto.title':      'Automatización de Procesos',
    'services.auto.desc':       'Mientras tu equipo gasta horas en tareas manuales, tu competencia escala. Automatizamos tus flujos de trabajo para que tu gente se enfoque en lo que realmente genera valor.',
    'services.auto.b1':         'Workflows automatizados end-to-end',
    'services.auto.b2':         'Integración de APIs y servicios',
    'services.auto.b3':         'Reducción de errores operativos',
    'services.auto.b4':         'Reportes y alertas automáticas',
    'services.auto.b5':         'Escalabilidad sin aumentar equipo',
    'services.cta':             'Quiero saber más',
    'services.ux.kicker':       'Interfaces que convierten, no solo que se ven bien',
    'services.ux.title':        'Experiencia Digital y UX',
    'services.ux.desc':         'Un producto lento o confuso pierde usuarios antes de que puedan comprarte. Diseñamos experiencias que guían, retienen y convierten — alineadas a tus métricas de negocio.',
    'services.ux.b1':           'Investigación de usuarios y benchmarking',
    'services.ux.b2':           'Arquitectura de información y flujos',
    'services.ux.b3':           'Design systems y UI kits',
    'services.ux.b4':           'Prototipado y testing de usabilidad',
    'services.ux.b5':           'Optimización de conversión y accesibilidad',
    'services.data.kicker':     'Dejá de decidir por intuición',
    'services.data.title':      'Analítica y Data Intelligence',
    'services.data.desc':       'Si no medís, no gestionás. Instrumentamos todo tu ecosistema para que tengas los datos correctos en el momento que los necesitás — no el día siguiente.',
    'services.data.b1':         'Tracking de eventos y embudos',
    'services.data.b2':         'Integración de fuentes y ETL',
    'services.data.b3':         'Dashboards ejecutivos y BI',
    'services.data.b4':         'Métricas y OKRs operativos',
    'services.data.b5':         'Alertas y monitoreo continuo',
    'services.cloud.kicker':    'Infraestructura que no te da sorpresas a fin de mes',
    'services.cloud.title':     'Cloud y DevOps',
    'services.cloud.desc':      'Los sistemas caídos, los deploys manuales y los costos de cloud fuera de control frenan tu crecimiento. Construimos la infraestructura que escala contigo — sin drama, sin factura sorpresa.',
    'services.cloud.b1':        'Infraestructura como codigo (IaC)',
    'services.cloud.b2':        'CI/CD y despliegues automatizados',
    'services.cloud.b3':        'Observabilidad, logs y alertas',
    'services.cloud.b4':        'Hardening y seguridad en cloud',
    'services.cloud.b5':        'Optimizacion de costos y rendimiento',
    'showcase.tag':             'Productos Digitales a Medida',
    'showcase.heading':         'Tecnología que trabaja<br/><em>para vos, no al revés.</em>',
    'showcase.desc':            'Construimos lo que tu negocio necesita hoy y lo dejamos listo para crecer mañana.',
    'showcase.feat1.title':     'Hecho para tu negocio, no para el mercado',
    'showcase.feat1.desc':      'No adaptamos una plantilla. Entendemos tu operación y construimos exactamente lo que necesitás, con soporte real de personas que conocen tu proyecto.',
    'showcase.feat2.title':     'Funciona desde el primer día',
    'showcase.feat2.desc':      'Sin meses de capacitación ni implementaciones interminables. Entregamos software que tu equipo puede usar de inmediato y que crece con vos.',
    'showcase.feat3.title':     'Velocidad sin comprometer la seguridad',
    'showcase.feat3.desc':      'Arquitectura robusta, código auditado y monitoreo continuo. Tu negocio corre rápido sin exponerse a riesgos innecesarios.',
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
    'contact.heading':          '¿Tenés un proyecto en mente?<br /><em>Hablemos.</em>',
    'contact.desc':             'Contanos qué necesitás y en menos de 24 horas te respondemos con ideas concretas — no con una propuesta genérica. Sin compromiso.',
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
    "why.heading":              "No somos un proveedor más.<br/><em>Somos parte de tu equipo.</em>",
    "why.desc":                 "La mayoría de los proyectos tech fracasan por falta de comunicación, no de código. Con nosotros sabés en todo momento qué se está construyendo, por qué y cuándo va a estar listo. Y cuando termina, el código te pertenece.",
    "why.cta.primary":          "Arranquemos hoy",
    "why.card1.desc":           "Usamos las herramientas que los equipos de mayor rendimiento usan hoy. No te vendemos tecnología por moda: elegimos lo que resuelve mejor tu problema específico.",
    "why.card2.desc":           "Nuestro éxito se mide por el tuyo. No entregamos código y desaparecemos. Acompañamos, iteramos y escalamos junto con tu negocio.",
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
    'nav.cta':                  'Talk about your project',
    'nav.lang.label':           'ES',
    'nav.lang.aria':            'Cambiar a español',
    'hero.aria':                'Introduction',
    'hero.tag':                 'DEVELOPMENT · CLOUD · AI · AUTOMATION · DESIGN',
    'hero.title':               'Your operations scale.<br /><em>Your headcount doesn\'t have to.</em>',
    'hero.subtitle':            'Every process still running on spreadsheets or emails is productivity you\'re losing. We build the software, automation, and AI that fix it — and that pay for themselves.',
    'hero.cta.primary':         'Get a custom solution',
    'hero.cta.secondary':       'See what we do',
    'hero.scroll.aria':         'Scroll to services',
    'hero.badge.top':           'Active projects',
    'hero.badge.bottom':        'Delivered projects',
    'faq.tag':                  'Got questions?',
    'faq.heading':              'The questions <em>everyone asks</em>',
    'faq.desc':                 'Before reaching out, you probably have these on your mind. Here are the honest answers.',
    'faq.cta':                  "Let's talk, no strings attached",
    'faq.q1':                   'How do I know if I actually need custom development?',
    'faq.a1':                   'If you have processes running on spreadsheets, steps that depend on specific people, or tools that force your team into workarounds, custom development stops being a luxury and becomes a real competitive advantage.',
    'faq.q2':                   "Isn't it cheaper to use tools like Salesforce or HubSpot?",
    'faq.a2':                   "It can be — at first. But licenses grow with your team, workarounds stack up, and you end up paying more in lost time than the solution itself would have cost. We do the analysis together so you can make an informed call.",
    'faq.q3':                   'Do I have to dedicate a lot of time while working with you?',
    'faq.a3':                   'We ask for 2 to 4 hours per week for sign-offs. That\'s it. We handle the rest and keep you updated with clear progress reports — no technical jargon.',
    'faq.q4':                   "I've been promised 2-week projects that dragged on for 6 months. Why would this be different?",
    'faq.a4':                   "We estimate with real buffers, verifiable milestones, and partial deliveries. If something changes, you hear it from us before it's a problem — not after. You always see concrete progress.",
    'faq.q5':                   'You finish the project and then you\'re gone. What about support?',
    'faq.a5':                   "Launch activates the support contract. Monitoring, iterative improvements, bug fixes — we stay. Most of our clients work with us for over a year after the initial launch.",
    'services.tag':             'What we do',
    'services.heading':         'Technology that solves<br /><em>real problems</em>',
    'services.intro':           'We don\'t sell projects. We remove the bottlenecks that are slowing your growth — with the right technology for each problem.',
    'services.web.kicker':      'When off-the-shelf software is no longer enough',
    'services.web.title':       'Custom Web Development',
    'services.web.desc':        'Your business has workflows that no market tool understands. We build the platform that fits your operation exactly — no workarounds, no limitations holding you back.',
    'services.web.b1':          'Scalable and secure web applications',
    'services.web.b2':          'Microservices architecture',
    'services.web.b3':          'Integrations with existing systems (ERP, CRM)',
    'services.web.b4':          'Custom admin dashboard',
    'services.web.b5':          'Performance and SEO optimization',
    'services.ai.kicker':       'Put AI to work in your operation today',
    'services.ai.title':        'AI Integration',
    'services.ai.desc':         'Not an experiment, not a demo. We implement AI that handles concrete tasks in your workflow: classify, respond, predict, extract. Measurable results within the first weeks.',
    'services.ai.b1':           'Chatbots and intelligent assistants',
    'services.ai.b2':           'Predictive data analysis',
    'services.ai.b3':           'Natural language processing (NLP)',
    'services.ai.b4':           'AI-powered document automation',
    'services.ai.b5':           'Intelligent dashboards with insights',
    'services.auto.kicker':     'Your team for thinking. Machines for the repetitive stuff.',
    'services.auto.title':      'Process Automation',
    'services.auto.desc':       'While your team handles manual work, your competitors are scaling. We automate your workflows so your people can focus on what actually creates value.',
    'services.auto.b1':         'End-to-end automated workflows',
    'services.auto.b2':         'API and service integrations',
    'services.auto.b3':         'Reduced operational errors',
    'services.auto.b4':         'Automated reports and alerts',
    'services.auto.b5':         'Scalability without adding headcount',
    'services.cta':             'Tell me more',
    'services.ux.kicker':       'Interfaces that convert, not just look good',
    'services.ux.title':        'Digital Experience and UX',
    'services.ux.desc':         'A slow or confusing product loses users before they can buy. We design experiences that guide, retain, and convert — tied directly to your business metrics.',
    'services.ux.b1':           'User research and benchmarking',
    'services.ux.b2':           'Information architecture and flows',
    'services.ux.b3':           'Design systems and UI kits',
    'services.ux.b4':           'Prototyping and usability testing',
    'services.ux.b5':           'Conversion optimization and accessibility',
    'services.data.kicker':     'Stop making decisions on gut feeling',
    'services.data.title':      'Analytics and Data Intelligence',
    'services.data.desc':       'If you can\'t measure it, you can\'t manage it. We instrument your entire ecosystem so you have the right data when you need it — not the next morning.',
    'services.data.b1':         'Event tracking and funnels',
    'services.data.b2':         'Source integration and ETL',
    'services.data.b3':         'Executive dashboards and BI',
    'services.data.b4':         'Operational metrics and OKRs',
    'services.data.b5':         'Alerts and continuous monitoring',
    'services.cloud.kicker':    'Infrastructure without surprises at the end of the month',
    'services.cloud.title':     'Cloud and DevOps',
    'services.cloud.desc':      'Downtime, manual deploys, and runaway cloud costs are holding your growth back. We build infrastructure that scales with you — without the drama or the unexpected bill.',
    'services.cloud.b1':        'Infrastructure as code (IaC)',
    'services.cloud.b2':        'CI/CD and automated deployments',
    'services.cloud.b3':        'Observability, logs, and alerts',
    'services.cloud.b4':        'Cloud security hardening',
    'services.cloud.b5':        'Cost and performance optimization',
    'showcase.tag':             'Custom Digital Products',
    'showcase.heading':         'Technology that works<br/><em>for you, not against you.</em>',
    'showcase.desc':            'We build what your business needs today and make sure it\'s ready to scale tomorrow.',
    'showcase.feat1.title':     'Built for your business, not the market',
    'showcase.feat1.desc':      'We don\'t adapt a template. We understand your operation and build exactly what you need, backed by people who actually know your project.',
    'showcase.feat2.title':     'Working from day one',
    'showcase.feat2.desc':      'No months of training or endless rollouts. We deliver software your team can use right away — and that grows with you.',
    'showcase.feat3.title':     'Speed without security trade-offs',
    'showcase.feat3.desc':      'Solid architecture, audited code, and continuous monitoring. Move fast without exposing your business to unnecessary risk.',
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
    'contact.heading':          'Got a project in mind?<br /><em>Let\'s talk.</em>',
    'contact.desc':             'Tell us what you need and within 24 hours we\'ll get back to you with concrete ideas — not a generic pitch. No commitment required.',
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
    "why.heading":              "We're not just a vendor.<br/><em>We're part of your team.</em>",
    "why.desc":                 "Most tech projects fail due to poor communication, not bad code. With us, you always know what's being built, why, and when it'll be done. And when the project ends, the code is yours.",
    "why.cta.primary":          "Let's start today",
    "why.card1.desc":           "We work with the tools top-performing teams rely on. We don't sell technology for the sake of trends — we choose what actually solves your specific problem.",
    "why.card2.desc":           "Our success is measured by yours. We don't ship code and disappear. We stay, iterate, and scale alongside your business.",
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
