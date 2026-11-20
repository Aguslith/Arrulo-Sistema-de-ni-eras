# Arrullo — Red de Niñeras de Confianza

> **Sistema web interactivo, animado y responsive** para la gestión integral de una agencia/plataforma de niñeras y familias, diseñado con una estética pastel infantil profesional (crema cálido, melocotón, menta, celeste cielo, lavanda y amarillo suave).

---

## Tabla de contenidos

1. [Resumen del proyecto](#1-resumen-del-proyecto)
2. [Stack tecnológico](#2-stack-tecnológico)
3. [Estructura del proyecto](#3-estructura-del-proyecto)
4. [Explicación detallada de cada apartado y sus funciones](#4-explicación-detallada-de-cada-apartado-y-sus-funciones)
5. [Guía de instalación y uso local](#5-guía-de-instalación-y-uso-local)
6. [Cuestionario de preguntas para la clienta (mejoras y paso a producción)](#6-cuestionario-de-preguntas-para-la-clienta-mejoras-y-paso-a-producción)
7. [Hoja de ruta recomendada para producción](#7-hoja-de-ruta-recomendada-para-producción)

---

## 1. Resumen del proyecto

**Arrullo** nace para automatizar el trabajo diario de una coordinadora de niñeras que necesita:

- Centralizar en una **base de datos ordenada** a las postulantes a niñeras y a las familias que buscan cuidado infantil.
- Resolver de forma rápida e intuitiva **qué niñera encaja mejor con cada familia** (combinando un modo visual de tarjetas deslizables + un motor de compatibilidad automática).
- Reemplazar las entrevistas presenciales y formularios en papel por **entrevistas 100% virtuales** con confirmación previa y un protocolo **Plan B SOS** ante cancelaciones de último momento.
- Ordenar los **cobros, transferencias y la estrategia de facturación** (incluyendo un simulador financiero pensado para el contexto argentino / ARCA-Monotributo).
- Moderar quejas, reclamos y consultas desde una bandeja unificada con respuestas rápidas por correo electrónico.

Todos los cambios realizados durante la demostración (altas de niñeras/familias, matches, reemplazos SOS, estados de pago y tickets) se guardan automáticamente en `localStorage`, con un botón en el menú lateral para restaurar los datos demo en cualquier momento.

---

## 2. Stack tecnológico

- **React 19 + Vite 6:** interfaz rápida y modular.
- **Tailwind CSS v4:** sistema de diseño pastel personalizado, responsive mobile-first y tipografía cuidada (`Fredoka` para títulos + `Nunito` para lectura y números tabulares).
- **Framer Motion:** transiciones suaves entre pantallas, físicas reales de arrastre (*swipe*) en tarjetas, pills animadas y modales responsivos.
- **Lucide React + Ilustraciones SVG propias:** iconografía uniforme, logotipo vectorial artesanal (`ArrulloLogo` + `public/favicon.svg`) y avatares ilustrados pastel para niñeras y familias.

---

## 3. Estructura del proyecto

```text
sistema de niñeras/
├── public/
│   └── favicon.svg                 # Favicon vectorial pastel de Arrullo
├── src/
│   ├── components/
│   │   ├── Layout.jsx              # Shell responsive (sidebar desktop, bottom bar y drawer móvil, toasts)
│   │   └── PastelArtwork.jsx       # Logo Arrullo, wordmark y avatares SVG ilustrados
│   ├── data/
│   │   └── mockData.js             # Datos iniciales realistas + motor calculateMatch() y formato ARS
│   ├── views/
│   │   ├── DashboardView.jsx       # Inicio y panel operativo general
│   │   ├── MatchView.jsx           # Selección Inteligente (Modo Tarjetas Swipe + Auto-Match)
│   │   ├── NanniesView.jsx         # Base de datos de niñeras y validaciones de seguridad
│   │   ├── FamiliesView.jsx        # Base de datos de familias y formulario digital
│   │   ├── InterviewsView.jsx      # Agenda de entrevistas virtuales, sala checklist y Plan B SOS
│   │   ├── BillingView.jsx         # Cobros/pagos, recibos y Simulador de Tarifas y ARCA
│   │   ├── ModerationView.jsx      # Bandeja de quejas, reclamos y plantillas de email
│   │   └── GuideView.jsx           # Guía interactiva de negocio y puesta en marcha
│   ├── App.jsx                     # Estado global, persistencia localStorage y enrutamiento de vistas
│   ├── index.css                   # Tokens de color pastel, fuentes y utilidades visuales
│   └── main.jsx                    # Punto de entrada React
├── GUIA_DEL_SISTEMA_Y_NEGOCIO.md   # Documento estratégico completo sobre operación, pagos y marco legal
├── index.html                      # Título, meta theme-color y enlaces de favicon/fuentes
└── package.json
```

---

## 4. Explicación detallada de cada apartado y sus funciones

### 4.1. Inicio (`DashboardView.jsx`)
Panel de control operativo pensado para ver el estado de toda la agencia de un vistazo:
- **Resumen ejecutivo:** cantidad de niñeras verificadas, familias en búsqueda activa, comisión acumulada del mes y pagos pendientes de transferir.
- **Alerta Anti-Plantón (SOS):** destaca automáticamente las entrevistas virtuales donde la niñera aún no confirmó asistencia, con un botón directo para activar el **Reemplazo SOS**.
- **Familias esperando niñera:** muestra cada solicitud junto con la candidata #1 recomendada automáticamente por el algoritmo y su porcentaje de compatibilidad.
- **Agenda rápida de entrevistas virtuales y accesos directos:** atajos hacia carga de niñeras, alta de familias, moderación de quejas y simulador financiero.

### 4.2. Elegir Niñera — Selección Inteligente (`MatchView.jsx`)
Combina dos formas complementarias de cruzar niñeras con las necesidades de cada familia:
- **Selector de familia activa:** permite elegir cualquier familia de la base y ver al instante sus requisitos (barrio, edades de los niños, días/horarios y presupuesto tope).
- **Modo Tarjetas (Swipe):** tarjetas arrastrables con físicas reales (mouse, dedo en celular, botones táctiles o flechas `←` / `→` del teclado):
  - **Deslizar derecha / Corazón verde:** genera un Match y abre el modal para **agendar la entrevista virtual** en 1 clic.
  - **Marcador amarillo:** guarda a la candidata en la columna **Guardadas como Plan B** como respaldo.
  - **Deslizar izquierda / Cruz:** descarta la candidata para esa búsqueda.
- **Modo Auto-Match Inteligente:** muestra el ranking completo de candidatas con el desglose transparente del algoritmo `calculateMatch()` en 5 ejes:
  1. **Ubicación** (mismo barrio o barrio lindero).
  2. **Disponibilidad horaria** (mañana, tarde, noche, fines de semana).
  3. **Necesidades y edades** (recién nacidos, primera infancia, apoyo escolar, RCP, inglés, cocina, mascotas, movilidad).
  4. **Presupuesto** (comparación tarifa pretendida vs. tope familiar).
  5. **Verificación y puntualidad** (validaciones completadas + historial de puntualidad).

### 4.3. Base de Datos de Niñeras (`NanniesView.jsx`)
- **Buscador y filtros combinables:** búsqueda por nombre, barrio o especialidad, filtro por zona y filtro rápido **Solo Backup SOS**.
- **Ficha completa deslizable (Drawer):** bio, tarifa por hora, contacto, referencia destacada y **checklist interactivo de seguridad** (DNI verificado, Antecedentes Penales, Referencias llamadas, Entrevista filtro) editable con un clic.
- **Alta de nuevas niñeras (`+ Nueva niñera`):** formulario completo que agrega la postulante inmediatamente a la base y al algoritmo de selección.
- **Botón `Link de postulación`:** copia el enlace público pensado para que en producción las chicas se carguen solas sin intervención manual.

### 4.4. Base de Datos de Familias (`FamiliesView.jsx`)
- **Reemplazo de formularios en papel:** modal `+ Nueva familia` que registra contacto, barrio, cantidad y edades de los chicos, franjas horarias, horas semanales, presupuesto, requisitos y notas del hogar.
- **Filtros por estado:** `Reemplazo SOS`, `Buscando`, `En Entrevista` y `Activa`.
- **Conexión directa con el Match:** cada tarjeta muestra la niñera asignada o la mejor candidata sugerida, con botón directo para abrir la selección para esa familia.

### 4.5. Entrevistas Virtuales & Plan B SOS (`InterviewsView.jsx`)
Diseñado para eliminar los traslados presenciales y los plantones:
- **Agenda 100% virtual:** cada entrevista tiene enlace autogenerado (`meet.arrullo.ar/...`), botón de copiado rápido para WhatsApp y doble indicador de confirmación (Familia y Niñera).
- **Simulación interactiva de riesgo:** haciendo clic sobre el pill de confirmación de la niñera se puede alternar entre *Confirmada* y *Sin confirmar (Riesgo)* para probar el protocolo de emergencia.
- **Sala Virtual y Checklist digital:** modal de entrevista con 4 criterios evaluables (puntualidad/cámara, experiencia real, disponibilidad confirmada y química familiar), cuadro de notas y botón **Aprobar Match y Asignar Niñera**.
- **Reemplazo Express (Plan B SOS):** al activarse, escanea automáticamente toda la base y propone el **Top 3 de niñeras compatibles disponibles** (priorizando perfiles aptos SOS), permitiendo reasignar la entrevista en 1 clic y copiar un mensaje de oferta prearmado para WhatsApp.

### 4.6. Cobros, Pagos y Facturación (`BillingView.jsx`)
Dividido en dos pestañas clave:
1. **Control de Pagos (Familia → Agencia → Niñera):**
   - Tarjetas separando **Total facturado a familias**, **Fondos de niñeras (terceros)** y **Comisión neta facturable**.
   - Liquidaciones semanales/eventuales con toggles interactivos (`Familia: Pagado/Pendiente` y `Niñera: Transferido/Por transferir`), alta de nuevas jornadas (`+ Registrar horas / cobro`) y modal de **Comprobante Arrullo** desglosado y listo para imprimir/enviar.
2. **Simulador de Tarifas y ARCA:**
   - Controles deslizables interactivos (familias activas, horas/semana, tarifa por hora de niñera y comisión actual).
   - Comparativa en tiempo real entre 4 esquemas: **Modelo actual ($150/h)**, **Comisión 15% + Split**, **Híbrido (Membresía Club Familias + 10%)** y **Fee de Búsqueda (pago único sin intermediación)**.
   - Alerta fiscal explicando el riesgo de recibir dinero de terceros en cuenta personal frente a **ARCA (ex-AFIP) / Monotributo** y cómo resolverlo con Split de Pagos o cobro directo.

### 4.7. Moderación de Quejas y Soporte (`ModerationView.jsx`)
- **Bandeja unificada tipo Helpdesk:** filtros por estado (`Abierto`, `En revisión`, `Resuelto`), prioridad (`Alta`, `Media`, `Baja`) y remitente (`Familia` o `Niñera`).
- **Hilo de conversación + Plantillas rápidas por email:** respuestas prearmadas (Disculpa + Reemplazo SOS, Confirmación de transferencia, Advertencia de puntualidad) y registro de nuevas incidencias.

### 4.8. Guía del Negocio (`GuideView.jsx` y `GUIA_DEL_SISTEMA_Y_NEGOCIO.md`)
Manual interactivo en formato acordeón dentro de la propia aplicación cubriendo flujo operativo, facturación, cómo evitar el "puenteo", protocolo anti-plantón, seguridad/marco legal (Ley 26.844 en Argentina) y plan técnico por etapas.

---

## 5. Guía de instalación y uso local

Requisitos: **Node.js 18+** y **npm**.

```bash
# 1. Clonar el repositorio
git clone https://github.com/Aguslith/Arrulo-Sistema-de-ni-eras.git
cd Arrulo-Sistema-de-ni-eras

# 2. Instalar dependencias
npm install

# 3. Levantar el servidor de desarrollo
npm run dev

# 4. Compilar para producción (opcional)
npm run build
```

---

## 6. Cuestionario de preguntas para la clienta (mejoras y paso a producción)

Antes de conectar la base de datos real, los pagos y las cuentas de usuarios, conviene definir con la clienta estas preguntas clave:

### A. Modelo de negocio, tarifas y facturación
1. **¿Qué modelo de cobro preferís adoptar finalmente?**
   - *Opción 1:* Fee único de búsqueda a la familia (ej. 30%–40% del primer mes con garantía de reemplazo por 30 días) y luego la familia le paga directo a la niñera.
   - *Opción 2:* Membresía mensual para familias ("Club Arrullo" con reemplazos SOS incluidos) + comisión moderada por turnos eventuales.
   - *Opción 3:* Comisión fija o porcentual por hora trabajada usando Split de Mercado Pago para no mezclar plata de terceros en tu cuenta.
2. **¿Querés manejar turnos fijos mensuales (niñera estable), cuidados eventuales por horas (salidas nocturnas/eventos), o ambos?**
3. **¿Cuál es la tarifa hora promedio de referencia en tu ciudad/barrio y cómo se actualizaría por inflación?** (por ejemplo, atada a la escala oficial de Casas Particulares — 4ta categoría).
4. **¿Ya contás con Monotributo y contador/a para definir el encuadre fiscal y el medio de cobro (Mercado Pago Marketplace, transferencia, links de pago)?**

### B. Experiencia de familias y niñeras (Roles de usuario)
5. **¿Quién va a hacer el "Swipe / Selección" en la primera etapa?**
   - ¿Preferís hacerlo **vos como coordinadora** y mandarle a la familia las 2–3 finalistas por WhatsApp/mail?
   - ¿O querés que las **familias se registren con usuario y clave** y elijan ellas mismas desde su celular entre las candidatas pre-aprobadas?
6. **¿Qué datos deben permanecer ocultos antes de confirmar?** (teléfono, apellido completo, dirección exacta, foto de rostro).
7. **¿Querés un formulario público independiente para que las niñeras carguen su DNI, certificado de antecedentes penales y referencias directamente desde el celular?**

### C. Entrevistas virtuales y protocolo Anti-Plantón
8. **¿Qué plataforma de videollamada te resulta más cómoda para las entrevistas?** (Google Meet, Zoom, Jitsi integrado o videollamada de WhatsApp).
9. **¿Vas a participar siempre vos en la entrevista entre la familia y la niñera, o solo hacés una entrevista filtro previa con la niñera y luego ellas se reúnen solas?**
10. **¿Qué regla de penalización/reputación querés aplicar si una niñera cancela sobre la hora o no se presenta?** (ej. 1er aviso baja prioridad, 2do aviso pausa de 30 días).
11. **¿Pedirías una pequeña seña o registro previo a las familias nuevas para evitar consultas que luego no responden?**

### D. Alcance geográfico, perfilado y seguridad
12. **¿En qué ciudad, localidades o barrios vas a operar inicialmente?** (para cargar el listado exacto de zonas y cercanías en el algoritmo de compatibilidad).
13. **¿Qué especialidades o filtros propios de tus clientas faltan agregar?** (ej. experiencia con niños neurodivergentes / TEA, cuidado de mellizos, manejo de auto propio, acompañamiento en vacaciones, idiomas específicos).
14. **¿Qué documentos obligatorios vas a exigir sí o sí antes de aprobar a una niñera?** (DNI, antecedentes penales, constancia de domicilio, certificado de RCP, referencias laborales comprobadas).
15. **¿Necesitás que el sistema genere un acuerdo digital / Términos y Condiciones con aceptación de checkbox para familias y niñeras?** (aclarando rol de intermediación y prohibición de publicar fotos de los menores).

### E. Moderación, comunicación y marca
16. **¿Querés que las notificaciones de confirmación (24 hs y 2 hs antes) salgan por Email automático, WhatsApp, o ambos?**
17. **¿Cómo te gustaría moderar las quejas?** ¿Solo por correo electrónico conectado al panel, o con un formulario dentro de la app para que familias y niñeras carguen reclamos y calificaciones con estrellas?
18. **Identidad visual y dominio:** ¿Te quedás con el nombre **Arrullo**, la paleta pastel y el logotipo actual, o querés ajustar nombre, colores o tipografía antes de registrar el dominio (`.com.ar` / `.ar`)?

---

## 7. Hoja de ruta recomendada para producción

| Etapa | Alcance | Herramientas sugeridas |
| :--- | :--- | :--- |
| **Fase 1 — MVP Real (2 a 4 semanas)** | Base de datos real, login de coordinadora, formularios públicos de niñeras y familias, subida segura de DNI/antecedentes, Auto-Match real, links de entrevista y bandeja de soporte por mail. | React + Vite + **Supabase** (PostgreSQL, Auth, Storage) + **Resend** (emails) + **Vercel** (hosting). |
| **Fase 2 — Autogestión y Cobros** | Portal propio para familias (Swipe móvil) y niñeras (disponibilidad e historial), pagos integrados, recibos PDF automáticos y recordatorios 2h antes. | **Mercado Pago** (Links / Suscripciones / Split) + **WhatsApp Business API**. |
| **Fase 3 — Escala y Facturación** | Emisión automatizada de comprobantes electrónicos, métricas de retención y expansión por zonas. | Integración de facturación electrónica (**ARCA**) + analítica operativa. |
