# Tasks: Landing Page Red and Blue

## 1️⃣ Hero / Introducción
- [x] Crear estructura HTML minimalista
  - [x] Title principal con mensaje "Desarrollo a medida, seguro, rápido y escalable"
  - [x] Subtítulo breve
  - [x] CTA principal: formulario, WhatsApp, correo
- [x] Aplicar tipografía refinada y paleta corporativa (Syne + DM Sans)
- [x] Agregar fondo con gradient mesh + grain overlay
- [x] Implementar animaciones de carga
  - [x] Staggered reveals de título y CTA (GSAP)
  - [x] Fade-in sutil de elementos secundarios
- [x] Test de responsividad y accesibilidad

## 2️⃣ Servicios
- [x] Crear tarjetas interactivas para cada servicio
  - [x] Desarrollo web a medida
  - [x] Soluciones con IA (card featured con gradiente)
  - [x] Automatización de procesos
- [x] Añadir iconografía SVG inline
- [x] Implementar hover effects y scroll-triggered reveals
- [x] Layout dinámico: asimétrico, overlapping, negative space generoso
- [x] Revisar performance y animaciones suaves

## 3️⃣ Tecnologías
- [x] Listar tecnologías y ventajas competitivas en tarjetas
- [x] Agregar hover effects con línea gradiente inferior
- [x] Mantener minimalismo y estilo corporativo
- [x] Revisar responsividad y performance

## 4️⃣ Contacto / CTA
- [x] Crear formulario funcional (nombre, email, mensaje)
- [x] Integrar botón de WhatsApp y enlace de correo
- [x] Validación de inputs y feedback visual
- [x] Agregar microinteractions en botones y campos
- [x] Posicionar estratégicamente para máxima conversión
- [x] Seguridad: sanitización de inputs en serverless function

## 5️⃣ Footer
- [x] Crear links corporativos esenciales
- [x] Mantener estilo minimalista y jerarquía visual
- [x] Revisar responsividad y accesibilidad

## 6️⃣ Interacciones y Animaciones Generales
- [x] Microinteractions estratégicas: botones, tarjetas, enlaces clave
- [x] Scroll-triggered animations en secciones principales (GSAP ScrollTrigger)
- [x] Staggered reveals en hero y tarjetas
- [x] Ajuste de timing y easing para animaciones suaves y profesionales
- [x] Fix: guard `.gsap-ready` para fallback cuando GSAP no carga desde CDN

## 7️⃣ Performance y QA
- [x] Optimizar imágenes y assets (favicon, preview-image, logo)
- [ ] Test Lighthouse score >90 (pendiente post-deploy)
- [ ] Validación de accesibilidad AA (pendiente post-deploy)
- [x] Test responsividad mobile, tablet y desktop

## 8️⃣ Deployment
- [x] Configurar repositorio en GitHub (gustavoadolfogarciablanco-dev/red-blue)
- [x] vercel.json con headers de seguridad y cache
- [x] Fix: eliminar clave `routes` conflictiva en vercel.json (incompatible con `headers`)
- [ ] Configurar deploy continuo en Vercel (en progreso)
- [ ] Agregar variable de entorno RESEND_API_KEY en Vercel
- [ ] Reemplazar TUNUMERO en index.html con número WhatsApp real
- [ ] Verificar formulario de contacto en producción
