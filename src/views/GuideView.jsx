import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Receipt,
  ShieldAlert,
  Video,
  Scale,
  Rocket,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

const CHAPTERS = [
  {
    id: 'flujo',
    icon: Sparkles,
    tone: 'peach',
    titulo: '1. Cómo funciona el sistema paso a paso (de punta a punta)',
    resumen: 'Reemplazá formularios en papel, traslados innecesarios y búsquedas manuales por un embudo automático.',
    puntos: [
      'Captación digital dual: dos links públicos simples (uno para postulantes a niñeras y otro para familias). Los datos entran directo a tu base de datos ordenados por zona, horarios, edades y presupuesto.',
      'Filtro y Verificación previa: antes de que una niñera aparezca disponible para hacer Match, validás 4 cosas: foto de DNI, Certificado de Antecedentes Penales (se tramita online en Argentina), 2 referencias telefónicas reales y una mini-entrevista filtro de 10 minutos por videollamada.',
      'Match Inteligente ("Tipo Tinder" + Automático): el sistema calcula compatibilidad según barrio, franja horaria, edades de los chicos y requisitos (bebés, RCP, inglés, mascotas). Le muestra a la familia las 3 mejores opciones sin revelar el teléfono ni dirección todavía.',
      'Entrevista 100% Virtual: al haber Match, se agenda una videollamada de 15 minutos con confirmación obligatoria 2 horas antes. Nadie se pierde y vos no perdés el día viajando.',
      'Activación y Seguimiento: si se eligen, firman acuerdo digital, se gestiona el cobro y queda habilitado tu soporte/moderación y la garantía de reemplazo.',
    ],
  },
  {
    id: 'facturacion',
    icon: Receipt,
    tone: 'mint',
    titulo: '2. El problema de cobrar $100–$200/h y cómo facturar bien (ARCA / Monotributo)',
    resumen: 'Por qué tu esquema actual te hace trabajar a pérdida y los 3 modelos reales que usan las agencias rentables.',
    puntos: [
      '¿Por qué $100–$200/h no funciona? En Argentina, una hora de niñera ronda $4.000–$6.000. Sacar $150/h representa apenas un 3%: no cubre ni el costo de una entrevista que falla, ni tu tiempo coordinando reemplazos, ni comisiones de Mercado Pago/bancos, ni el Monotributo.',
      '¡Cuidado con cobrar todo vos y transferirle a la chica! Si la familia te transfiere $200.000 y vos le pasás $190.000 a la niñera, para ARCA (ex-AFIP) e Ingresos Brutos vos facturaste $200.000. Eso puede recategorizarte o sacarte del Monotributo por plata que NO es tuya.',
      'Modelo Recomendado A — Fee de Búsqueda + Garantía (Cero intermediación de sueldos): cobrás un arancel único a la familia por encontrar, validar y entrevistar a la niñera (ej: equivalente a 1 o 2 semanas de trabajo, con garantía de reemplazo gratis por 30 días). Luego la familia le paga directo a la niñera. Vos facturás limpiamente tu servicio de selección.',
      'Modelo Recomendado B — Membresía Mensual "Club Familias" + Comisión 10–15% con Split: las familias pagan una suscripción mensual accesible (que incluye acceso a niñeras SOS si la suya se enferma) y si cobrás horas por la plataforma, usás Mercado Pago Split (Marketplace) para que el 85–90% vaya directo a la cuenta de la niñera y solo tu 10–15% entre a tu cuenta y se facture.',
      'Importante: siempre consultá con un contador/a para encuadrar tu actividad (Intermediación / Selección de personal / Plataforma digital) en Monotributo y evitar retenciones de SIRCREB.',
    ],
  },
  {
    id: 'puenteo',
    icon: ShieldAlert,
    tone: 'lilac',
    titulo: '3. Cómo evitar el "puenteo" (que la familia y la niñera arreglen por fuera)',
    resumen: 'Es el mayor miedo de toda agencia de niñeras. Se resuelve dando valor constante que NO pueden replicar solas.',
    puntos: [
      'No muestres teléfono ni dirección antes del acuerdo: el primer contacto y la entrevista virtual ocurren a través del enlace de tu plataforma.',
      'Vendé "Tranquilidad y Reemplazo SOS", no solo un contacto: si la familia sabe que pagando tu membresía o comisión tiene garantizada una niñera backup verificada cuando su niñera se enferma o falta, NO te van a puentear.',
      'Para la niñera, tu plataforma es su respaldo: le asegurás cobros puntuales, historial verificado de reputación (estrellas/reseñas para conseguir mejores trabajos) y mediación ante cualquier conflicto.',
      'Si elegís el modelo de "Fee de Búsqueda único" (placement), ¡el puenteo deja de ser un problema! Porque vos ya cobraste tu honorario al inicio del vínculo.',
    ],
  },
  {
    id: 'sos',
    icon: Video,
    tone: 'butter',
    titulo: '4. Protocolo Anti-Plantón (para que nunca más se pierda una niñera)',
    resumen: 'Reglas simples para blindar tu reputación frente a las familias.',
    puntos: [
      'Doble confirmación automática: 24 horas antes y 2 horas antes de la entrevista virtual, el sistema envía un mensaje de WhatsApp con botón "Confirmo asistencia".',
      'Regla de las 2 horas: si la niñera no confirmó 2 horas antes, la entrevista se marca automáticamente "En riesgo" y tu panel te sugiere las 3 mejores candidatas backup disponibles en esa zona.',
      'Sistema de Puntualidad y Confianza interno: cada inasistencia sin aviso baja el puntaje de puntualidad de la niñera y la saca de la prioridad de Match. Las más responsables reciben más ofertas.',
      'Seña de entrevista para familias (opcional): pedir una pequeña seña o validación de tarjeta a familias nuevas evita que también te hagan perder tiempo consultando sin intención real de contratar.',
    ],
  },
  {
    id: 'legal',
    icon: Scale,
    tone: 'sky',
    titulo: '5. Seguridad, Confianza y Marco Legal (Argentina)',
    resumen: 'Qué tenés que dejar por escrito para protegerte a vos, a los chicos y a las familias.',
    puntos: [
      'Tu rol es Intermediaria / Agencia de Selección, NO empleadora directa: dejalo explícito en Términos y Condiciones firmados digitalmente. En Argentina, quien contrata habitualmente a una niñera en su hogar se rige por la Ley 26.844 (Régimen de Personal de Casas Particulares — categoría "Asistencia y cuidado de personas").',
      'Documentación obligatoria de cada postulante: foto frente y dorso del DNI, selfie sosteniendo el DNI, Certificado Nacional de Antecedentes Penales (trámite online oficial), CV/experiencia y mínimo 2 referencias comprobadas por teléfono.',
      'Moderación y Registro de Quejas: todo reclamo por mail o plataforma queda guardado con fecha y respuesta (trazabilidad). Ante una falta grave de seguridad, suspensión inmediata del perfil.',
      'Privacidad de menores: prohibir a las niñeras sacar o publicar fotos de los niños en redes sociales (incluir cláusula expresa en el código de conducta).',
    ],
  },
  {
    id: 'tecnologia',
    icon: Rocket,
    tone: 'peach',
    titulo: '6. Qué necesita tecnológicamente para lanzarlo real (por etapas sin gastar de más)',
    resumen: 'No hace falta invertir una fortuna el día 1. Podés crecer en 2 fases ordenadas.',
    puntos: [
      'Fase 1 — Lanzamiento Rápido (MVP en 2–4 semanas): Web responsive como esta conectada a una base de datos real (Supabase / PostgreSQL con login de coordinadora, formularios públicos de niñeras y familias, algoritmo de Auto-Match, enlaces automáticos de Google Meet/Jitsi, emails automáticos con Resend y cobros por link de Mercado Pago).',
      'Fase 2 — Plataforma Autogestionable (Escala): Panel propio con usuario y clave para cada familia y niñera, Swipe "Tinder de Niñeras" desde el celular de los padres, recordatorios automáticos por WhatsApp Business API, Mercado Pago Split automático y facturación electrónica conectada a ARCA.',
      'Costos operativos iniciales muy bajos: dominio propio (.com.ar o .ar), hosting web moderno (Vercel/Cloudflare), base de datos Supabase (plan gratuito/inicial) y cuenta de correo profesional (hola@tunombre.com.ar).',
    ],
  },
];

const TONE_MAP = {
  peach: { iconBg: 'bg-[#FFE3DC] text-[#9C3A26]', border: 'border-[#FFD2C7]' },
  mint: { iconBg: 'bg-[#DCF7EC] text-[#145941]', border: 'border-[#BCECD8]' },
  lilac: { iconBg: 'bg-[#ECE4FF] text-[#462B80]', border: 'border-[#D9C7FF]' },
  butter: { iconBg: 'bg-[#FEF1C3] text-[#855706]', border: 'border-[#F8DC8A]' },
  sky: { iconBg: 'bg-[#DFEEFF] text-[#1A4B7F]', border: 'border-[#C2DFFE]' },
};

export default function GuideView({ onNavigate }) {
  const [openIds, setOpenIds] = useState(['flujo', 'facturacion']);

  const toggle = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-[28px] bg-gradient-to-br from-[#EEF7FF] via-[#FFFBF5] to-[#F5F1FF] border border-[#E5DDD5] p-6 sm:p-7 pastel-shadow flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="max-w-2xl">
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#2F2522]">
            Guía Completa: Cómo Funciona y Qué Necesita tu Negocio
          </h1>
          <p className="mt-2 text-sm text-[#6B5B55] leading-relaxed">
            Acá tenés respondidas todas las dudas de tu audio y tus mensajes: cómo automatizar el matching, cómo facturar sin perder plata ni tener problemas con ARCA, cómo evitar plantones y qué necesitás para lanzarlo profesionalmente.
          </p>
        </div>

        <button
          onClick={() => onNavigate('billing')}
          className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#E56A50] hover:bg-[#D55A40] text-white text-xs sm:text-sm font-extrabold transition-colors self-start lg:self-center cursor-pointer"
        >
          Ir al Simulador de Ganancias
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Expandable Chapters */}
      <div className="space-y-3.5">
        {CHAPTERS.map((chap) => {
          const Icon = chap.icon;
          const isOpen = openIds.includes(chap.id);
          const style = TONE_MAP[chap.tone];

          return (
            <section
              key={chap.id}
              className={`bg-white rounded-[26px] border transition-colors pastel-shadow overflow-hidden ${
                isOpen ? style.border : 'border-[#EFE4D8]'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(chap.id)}
                className="w-full p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4 text-left hover:bg-[#FFFDF9] transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${style.iconBg}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-display text-lg font-semibold text-[#2F2522]">
                      {chap.titulo}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#6B5B55] mt-0.5">{chap.resumen}</p>
                  </div>
                </div>

                <ChevronDown
                  className={`w-5 h-5 text-[#7A6A63] shrink-0 mt-1 sm:mt-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-[#F4EAE0] space-y-3">
                      {chap.puntos.map((punto, idx) => {
                        const [lead, ...rest] = punto.split(':');
                        return (
                          <div key={idx} className="flex items-start gap-3 text-sm text-[#4D3F3A]">
                            <CheckCircle2 className="w-4 h-4 text-[#4DC096] shrink-0 mt-1" />
                            <p className="leading-relaxed">
                              {rest.length > 0 ? (
                                <>
                                  <strong className="text-[#2F2522]">{lead}:</strong>
                                  {rest.join(':')}
                                </>
                              ) : (
                                punto
                              )}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          );
        })}
      </div>
    </div>
  );
}
