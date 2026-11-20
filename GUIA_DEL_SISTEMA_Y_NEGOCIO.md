# Arrullo — Guía del Sistema, Modelo de Negocio y Puesta en Marcha

Esta guía explica cómo funcionaría el sistema de agencia/plataforma de niñeras en el mundo real y responde cada punto clave del audio y las capturas: base de datos, matching estilo "app de citas" + automático, entrevistas virtuales, reemplazos de emergencia, facturación/rentabilidad (Argentina / ARCA), moderación de quejas y seguridad.

---

## 1. Cómo funciona el sistema paso a paso

1. **Ingreso digital a la Base de Datos (sin formularios en papel):**
   - **Postulación de Niñeras:** Cada chica completa un formulario online con zona/barrio, barrios a los que viaja, disponibilidad horaria, edades con las que tiene experiencia (recién nacidos, primera infancia, primaria), certificaciones (RCP, maestra jardinera, inglés), tarifa pretendida, foto DNI, certificado de antecedentes penales y 2 referencias telefónicas.
   - **Solicitud de Familias:** Cada familia carga su barrio, cantidad y edades de los hijos, días/horarios, requisitos especiales (bebés, mascotas, ayuda escolar, movilidad) y presupuesto estimado.

2. **Selección Inteligente (2 formas complementarias):**
   - **Auto-Match Inteligente:** El sistema cruza automáticamente zona, franja horaria, edades, requisitos y presupuesto, y arma un ranking porcentual de compatibilidad (ej. `96% Match`).
   - **Modo Tarjetas ("Tipo app de citas"):** Vos (o directamente la familia cuando escales el sistema) puede deslizar las candidatas mejor puntuadas a la derecha (*Match*), guardar como *Plan B* o pasar, viendo perfiles resumidos **sin mostrar el teléfono ni la dirección** hasta confirmar.

3. **Entrevistas 100% Virtuales + Protocolo Anti-Plantón (Plan B SOS):**
   - Nunca más tenés que trasladarte a una casa y arriesgarte a que la niñera se pierda o no aparezca.
   - Cuando hay Match se genera un enlace de videollamada (Google Meet / Jitsi) de 15 minutos con un **recordatorio automático 2 horas antes** por WhatsApp/mail para confirmar asistencia.
   - Si la niñera no confirma 2 horas antes, la entrevista se marca **"En riesgo"** y con 1 clic el botón **Reemplazo SOS** te muestra las 3 mejores niñeras backup de esa misma zona para cubrir el horario al instante.

4. **Moderación de Quejas y Soporte por Mail:**
   - Toda queja, demora, cancelación o duda de pagos entra como ticket en una bandeja ordenada con plantillas rápidas de respuesta por correo electrónico e historial por perfil (sistema de reputación y puntualidad).

---

## 2. El tema más importante: Facturación, Comisiones y Rentabilidad

### ¿Por qué sacar $100 o $200 por hora NO es sostenible?
Con una tarifa promedio de niñera en Argentina entre **$4.000 y $6.000 ARS/hora**, cobrar $100–$200/h representa apenas un **2% a 4%**. Ese margen:
- No cubre tu tiempo de entrevista, validación de referencias ni coordinación.
- Se esfuma completo si una niñera falta o si un cliente paga por un medio electrónico que cobra comisión (Mercado Pago ronda 3%–6%).
- No te deja margen para cubrir impuestos (Monotributo / Ingresos Brutos) ni mantenimiento de la plataforma.

### La trampa fiscal de cobrar TODO vos y transferirle a la chica
> **Atención (ARCA / ex-AFIP e Ingresos Brutos):**  
> Si una familia te transfiere **$200.000** a tu cuenta personal y vos luego le transferís **$190.000** a la niñera para quedarte con **$10.000**, para el banco y para ARCA **ingresaron $200.000 como facturación tuya**. En pocos meses podés pasarte de categoría en el Monotributo (o quedar excluida) pagando impuestos sobre dinero que en realidad era el salario de la niñera.

### 3 Modelos Rentables y Sanos para Cobrar

| Modelo | Cómo funciona | Ventaja principal | Cómo facturás |
| :--- | :--- | :--- | :--- |
| **1. Fee de Búsqueda (Placement)** | Cobrás a la familia un **pago único** al cerrar la contratación (ej. equivalente a 1 o 2 semanas de sueldo, o 30%–40% del primer mes) con **garantía de reemplazo gratis por 30 días**. Luego la familia le paga directo a la niñera. | **Cero riesgo fiscal** de tocar plata ajena y **cero problema de "puenteo"** (ya cobraste por tu trabajo de selección). | Factura C (Monotributo) por *"Servicio de selección y vinculación de personal"* solo por tu honorario. |
| **2. Comisión 12%–18% + Split de Pagos** | Cobrás un porcentaje saludable (ej. 15% sobre la tarifa) usando **Mercado Pago Split (Marketplace)** para dividir el pago en origen. | Ingreso recurrente todos los meses. El 85% va directo a la cuenta de la niñera y solo el 15% entra a tu cuenta. | Facturás únicamente tu 15% de comisión de intermediación. |
| **3. Híbrido (Recomendado): Club Familias + 10%** | Las familias pagan una **membresía mensual accesible** (ej. $15.000–$22.000/mes) que les da acceso a base verificada, entrevistas virtuales y **Reemplazo SOS garantizado**, más una comisión moderada (10%) por horas coordinadas o turnos eventuales. | Ingresos fijos previsibles todos los meses y **elimina el puenteo**, porque las familias mantienen el abono por la tranquilidad del reemplazo rápido. | Facturás membresías + comisiones propias. |

---

## 3. Cómo evitar el "puenteo" (que arreglen por fuera)
1. **Ocultar datos de contacto** hasta que se concrete el acuerdo / pago inicial.
2. **Vender tranquilidad y respaldo, no solo un teléfono:** si el día que la niñera se enferma vos mandás un reemplazo verificado en el día, la familia valora muchísimo seguir pagando tu servicio.
3. **Beneficios para la niñera:** reputación verificada (estrellas), protección ante malos tratos, cobro ordenado y acceso a más familias cuando tiene horarios libres.

---

## 4. Seguridad, Verificación y Marco Legal (Argentina)
- **Dejar en claro que sos Intermediaria / Agencia de Vinculación, NO empleadora:** incluir Términos y Condiciones firmados digitalmente. En Argentina, la relación laboral estable entre una familia y una niñera se encuadra en la **Ley 26.844** (Régimen Especial de Contrato de Trabajo para el Personal de Casas Particulares — 4ta categoría: *Asistencia y cuidado de personas*).
- **Checklist obligatorio de postulantes:**
  - Foto frente y dorso del DNI + selfie con DNI.
  - Certificado de Antecedentes Penales (se tramita online en Argentina.gob.ar).
  - 2 referencias reales verificadas por llamada.
  - Mini-entrevista virtual de 10 minutos con cámara encendida.
  - Firma de código de conducta (puntualidad, cero pantallas si la familia lo pide, prohibición estricta de subir fotos de los niños a redes sociales).
- **Consultar con un contador/a:** para definir el código de actividad correcto en Monotributo y evitar retenciones bancarias (SIRCREB).

---

## 5. Qué se necesita tecnológicamente para llevarlo a producción real

### Fase 1 — Lanzamiento Rápido (Económico y profesional)
- **Frontend:** Esta misma interfaz web responsive (React + Tailwind + animaciones).
- **Base de datos y autenticación:** **Supabase** (PostgreSQL + almacenamiento seguro de DNIs/certificados + login para vos, familias y niñeras).
- **Formularios públicos:** Dos URLs públicas (`/postularme` y `/buscar-ninera`) que escriben directo a la base de datos.
- **Videollamadas:** Integración con links automáticos de **Google Meet** o **Jitsi Meet**.
- **Emails de moderación y recibos:** **Resend** o correo propio (`hola@arrullo.com.ar`).
- **Cobros:** Links de pago / suscripciones de **Mercado Pago**.

### Fase 2 — Escalado Automático
- Acceso directo para que las familias hagan "Swipe" desde su celular entre sus 3 mejores matches.
- **WhatsApp Business API** para recordatorios automáticos 24h y 2h antes de cada entrevista y alertas SOS.
- **Mercado Pago Marketplace (Split de pagos)** + emisión automática de Factura C vía API de **ARCA**.

---

## 6. Cómo ejecutar este prototipo interactivo en tu computadora

```bash
npm install
npm run dev
```

Luego abrí en tu navegador la dirección local que indique Vite (por ejemplo `http://localhost:5173`). Todos los datos que cargues (nuevas niñeras, nuevas familias, matches, reemplazos SOS, liquidaciones y tickets) se guardan automáticamente en el navegador (`localStorage`) y podés restaurar los datos demo cuando quieras desde el menú lateral.
