# Red and Blue – Landing Page

## Descripción

Proyecto de desarrollo de una landing page corporativa, profesional y optimizada para SEO orgánico. Diseñada con un enfoque minimalista, moderno e innovador, centrada en la conversión de clientes potenciales.

**Empresa:** Red and Blue
**Servicios:** Desarrollo web a medida · Automatización de procesos · Integración con IA
**Deploy:** Vercel (deploy continuo)

---

## Tecnologías

- HTML5, CSS3, JavaScript ES6+ (sin frameworks pesados)
- Vite (opcional, para bundling y dev server)
- GSAP / anime.js para animaciones
- Vercel para despliegue
- Spec Kit para especificación y generación de código

---

## Estructura del Proyecto

```
├── .claude/
│   └── commands/           # Slash commands de Spec Kit para Claude
├── .specify/
│   ├── memory/             # Artefactos del proyecto (spec-kit)
│   │   ├── constitution.md # Principios y gobernanza del proyecto
│   │   ├── spec.md         # Especificación de requerimientos
│   │   ├── plan.md         # Plan de implementación técnica
│   │   ├── tasks.md        # Tareas accionables
│   │   └── implement.md    # Guía de implementación con SEO
│   ├── templates/          # Plantillas para spec, plan, tasks
│   └── scripts/            # Scripts de automatización PowerShell
├── agents/
│   └── claude.json         # Configuración del agente Claude
├── templates/
│   └── servicios.json      # Template sección de servicios
├── specify-cli-config.json # Configuración general de Spec Kit
├── tasks.json              # Tareas automatizadas del flujo
└── README.md
```

---

## Secciones de la Landing

1. **Hero** — Mensaje central, CTA (formulario, WhatsApp, correo), animaciones
2. **Servicios** — Tarjetas interactivas: desarrollo web, IA, automatización
3. **Tecnologías** — Ventajas competitivas en tarjetas con hover effects
4. **Contacto / CTA** — Formulario funcional, WhatsApp, microinteractions
5. **Footer** — Links corporativos, branding minimalista

---

## Flujo de Trabajo con Spec Kit

### 1. Instalar Spec Kit

```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
```

### 2. Inicializar el proyecto

```bash
specify init . --ai claude --script ps
```

### 3. Ejecutar el flujo de desarrollo

```
/speckit.constitution   → Establecer principios del proyecto
/speckit.specify        → Definir especificación
/speckit.plan           → Crear plan técnico
/speckit.tasks          → Generar tareas accionables
/speckit.implement      → Ejecutar implementación
```

### 4. Comandos opcionales de calidad

```
/speckit.clarify        → Clarificar áreas ambiguas (antes de plan)
/speckit.checklist      → Validar completitud de requerimientos
/speckit.analyze        → Reporte de consistencia entre artefactos
```

### 5. Deploy a Vercel

```bash
vercel --prod
```

---

## SEO

- `<title>`: Red and Blue – Desarrollo Web a Medida
- `<meta description>`: Desarrollo web a medida, automatización de procesos e integración de IA para tu negocio.
- Open Graph configurado para sharing social
- robots: `index, follow`
- sitemap.xml incluido

---

## Performance

- Lighthouse score objetivo: >90
- Carga objetivo: <2s
- Accesibilidad: WCAG AA
- Lazy loading y optimización de assets

---

## Notas de Seguridad

> `agents/claude.json` contiene un placeholder `"apiKey": "YOUR_API_KEY"`.
> **Nunca** incluyas claves reales en el repositorio. Usá variables de entorno en Vercel.
