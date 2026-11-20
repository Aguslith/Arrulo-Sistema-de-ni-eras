import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Video,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Calculator,
  UserPlus,
  Home,
  HeartHandshake,
} from 'lucide-react';
import { NannyAvatar, FamilyAvatar } from '../components/PastelArtwork';
import { calculateMatch, formatARS } from '../data/mockData';

export default function DashboardView({
  nannies,
  families,
  interviews,
  billing,
  tickets,
  onNavigate,
  onOpenMatchForFamily,
  onTriggerSosForInterview,
}) {
  const verifiedNannies = nannies.filter(
    (n) => n.verificada.dni && n.verificada.antecedentes
  ).length;
  const searchingFamilies = families.filter(
    (f) => f.estado === 'Buscando' || f.estado === 'Reemplazo SOS'
  );
  const atRiskInterviews = interviews.filter((i) => i.estado === 'En riesgo');
  const openTickets = tickets.filter((t) => t.estado !== 'Resuelto').length;

  const totalComisionMes = billing.reduce(
    (acc, item) => acc + item.horas * item.comisionAgenciaPorHora,
    0
  );
  const pendientesTransferir = billing.filter(
    (b) => b.estadoFamilia === 'Pagado' && b.estadoNinera === 'Por transferir'
  ).length;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Top Welcome Hero Strip */}
      <motion.section
        variants={itemVariants}
        className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#FFF1EB] via-[#FFF9F2] to-[#EBF9F3] border border-[#F0E3D6] p-6 sm:p-8 pastel-shadow"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -bottom-12 w-56 h-56 rounded-full bg-[#FFE1D6]/70 blur-2xl"
        />
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-xl">
            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#2F2522] leading-tight">
              Tu agencia de niñeras, organizada y en piloto automático
            </h1>
            <p className="mt-2.5 text-sm sm:text-base text-[#6B5B55] leading-relaxed">
              Conectá familias y niñeras verificadas según sus necesidades reales, coordiná entrevistas
              100% virtuales y controlá tus cobros sin perder horas ni quedar expuesta a cancelaciones.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <button
                onClick={() => onNavigate('match')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#E56A50] hover:bg-[#D55A40] text-white font-bold text-sm transition-all shadow-sm hover:shadow cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                Elegir Niñera
              </button>
              <button
                onClick={() => onNavigate('billing')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-[#FAF2E8] text-[#2F2522] border border-[#E9DCD0] font-bold text-sm transition-colors cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-[#1F7A5A]" />
                Simular facturación y tarifas
              </button>
              <button
                onClick={() => onNavigate('guide')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#EEF7FF] hover:bg-[#DFEEFF] text-[#1A4B7F] font-bold text-sm transition-colors cursor-pointer"
              >
                Ver guía de negocio
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right compact operational summary */}
          <div className="grid grid-cols-2 gap-3 shrink-0 lg:w-76">
            <div className="rounded-2xl bg-white/90 border border-[#EFE3D6] p-3.5">
              <div className="text-xs font-bold text-[#7A6A63]">Niñeras verificadas</div>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="font-display text-2xl font-semibold text-[#145941] tabular-nums">
                  {verifiedNannies}
                </span>
                <span className="text-xs font-bold text-[#7A6A63]">/ {nannies.length}</span>
              </div>
            </div>
            <div className="rounded-2xl bg-white/90 border border-[#EFE3D6] p-3.5">
              <div className="text-xs font-bold text-[#7A6A63]">Familias buscando</div>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="font-display text-2xl font-semibold text-[#1A4B7F] tabular-nums">
                  {searchingFamilies.length}
                </span>
                <span className="text-xs font-bold text-[#7A6A63]">activas</span>
              </div>
            </div>
            <div className="rounded-2xl bg-white/90 border border-[#EFE3D6] p-3.5 col-span-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#7A6A63]">Comisión acumulada (Nov)</span>
                <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#DCF7EC] text-[#145941] whitespace-nowrap shrink-0">
                  {pendientesTransferir} por transferir
                </span>
              </div>
              <div className="mt-1 font-display text-2xl font-semibold text-[#2F2522] tabular-nums">
                {formatARS(totalComisionMes)}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Live SOS Anti-Plantón Alert Banner (directly mirrors the audio story!) */}
      {atRiskInterviews.length > 0 && (
        <motion.section
          variants={itemVariants}
          className="rounded-3xl bg-[#FFF6DC] border border-[#F8DB8B] p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 pastel-shadow"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#FDE084] text-[#855706] flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-base sm:text-lg font-semibold text-[#664100]">
                Alerta Anti-Plantón: {atRiskInterviews.length} entrevista virtual sin confirmar
              </h2>
              <p className="text-sm text-[#7A5410] mt-0.5 leading-snug">
                {(() => {
                  const iv = atRiskInterviews[0];
                  const fam = families.find((f) => f.id === iv.familyId);
                  const nan = nannies.find((n) => n.id === iv.nannyId);
                  return `${nan?.nombre || 'La postulante'} aún no confirmó la videollamada de ${iv.fecha} (${iv.hora}) con ${fam?.apellido}. Activá el Plan B para ofrecerle el puesto al instante a una niñera backup de la misma zona.`;
                })()}
              </p>
            </div>
          </div>
          <button
            onClick={() => onTriggerSosForInterview(atRiskInterviews[0])}
            className="shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-[#2F2522] hover:bg-[#443530] text-[#FFFBF5] text-sm font-bold transition-colors cursor-pointer"
          >
            <HeartHandshake className="w-4 h-4 text-[#FDE084]" />
            Activar Reemplazo SOS
          </button>
        </motion.section>
      )}

      {/* Main Two-Column Asymmetric Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 cols: Smart Match Suggestions for Waiting Families */}
        <motion.section
          variants={itemVariants}
          className="lg:col-span-7 bg-white rounded-[26px] border border-[#EFE4D8] p-5 sm:p-6 pastel-shadow space-y-4"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-xl font-semibold text-[#2F2522]">
                Familias esperando niñera
              </h2>
              <p className="text-xs sm:text-sm text-[#7A6A63]">
                El algoritmo ya calculó la mejor candidata disponible para cada necesidad
              </p>
            </div>
            <button
              onClick={() => onNavigate('families')}
              className="text-xs font-extrabold text-[#9C3A26] hover:underline shrink-0 cursor-pointer"
            >
              Ver todas
            </button>
          </div>

          <div className="space-y-3">
            {families.slice(0, 4).map((family) => {
              const availableNannies = nannies.filter((n) => n.estado === 'Disponible');
              const topMatch = availableNannies
                .map((n) => ({ nanny: n, score: calculateMatch(n, family) }))
                .sort((a, b) => b.score.total - a.score.total)[0];

              const statusStyles = {
                'Reemplazo SOS': 'bg-[#FFE3DC] text-[#9C3A26]',
                Buscando: 'bg-[#EEF7FF] text-[#1A4B7F]',
                'En Entrevista': 'bg-[#F5F1FF] text-[#462B80]',
                Activa: 'bg-[#EDFBF5] text-[#145941]',
              };

              return (
                <div
                  key={family.id}
                  className="rounded-2xl bg-[#FFFBF7] border border-[#F2E6DA] p-4 hover:border-[#E2CEBA] transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <FamilyAvatar theme={family.avatarTheme} size={46} />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-display font-semibold text-base text-[#2F2522]">
                            {family.apellido}
                          </h3>
                          <span
                            className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${
                              statusStyles[family.estado] || 'bg-[#FAF2E8] text-[#6B5B55]'
                            }`}
                          >
                            {family.estado}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-[#6B5B55] mt-0.5">
                          {family.zona} • {family.hijos}
                        </p>
                        <p className="text-xs text-[#7A6A63] mt-0.5">{family.diasHorario}</p>
                      </div>
                    </div>

                    {topMatch && family.estado !== 'Activa' ? (
                      <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F2E6DA]">
                        <div className="flex items-center gap-2">
                          <NannyAvatar
                            name={topMatch.nanny.nombre}
                            theme={topMatch.nanny.avatarTheme}
                            variant={topMatch.nanny.avatarVariant}
                            size={34}
                          />
                          <div className="text-left">
                            <div className="text-xs font-extrabold text-[#145941]">
                              {topMatch.score.total}% Match
                            </div>
                            <div className="text-[11px] font-semibold text-[#6B5B55]">
                              {topMatch.nanny.nombre.split(' ')[0]}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => onOpenMatchForFamily(family.id)}
                          className="px-3.5 py-2 rounded-xl bg-[#ECE4FF] hover:bg-[#DFD2FF] text-[#462B80] text-xs font-extrabold transition-colors cursor-pointer"
                        >
                          Elegir
                        </button>
                      </div>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#145941] bg-[#EDFBF5] px-3 py-1.5 rounded-xl self-start sm:self-center">
                        <CheckCircle2 className="w-4 h-4" />
                        Cubierta
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Right 5 cols: Virtual Interviews & Quick Shortcuts */}
        <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">
          {/* Upcoming Virtual Interviews */}
          <section className="bg-white rounded-[26px] border border-[#EFE4D8] p-5 sm:p-6 pastel-shadow space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-[#2F2522]">
                Entrevistas virtuales
              </h2>
              <button
                onClick={() => onNavigate('interviews')}
                className="text-xs font-extrabold text-[#1A4B7F] hover:underline cursor-pointer"
              >
                Ver agenda
              </button>
            </div>

            <div className="space-y-3">
              {interviews.slice(0, 3).map((iv) => {
                const fam = families.find((f) => f.id === iv.familyId);
                const nan = nannies.find((n) => n.id === iv.nannyId);
                const isRisk = iv.estado === 'En riesgo';

                return (
                  <div
                    key={iv.id}
                    className={`rounded-2xl p-3.5 border transition-colors ${
                      isRisk
                        ? 'bg-[#FFF9E8] border-[#F6D782]'
                        : 'bg-[#F8FBFF] border-[#E0EEFF]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#2F2522]">
                        <Clock className="w-3.5 h-3.5 text-[#5DA9F6]" />
                        {iv.fecha} • {iv.hora}
                      </span>
                      <span
                        className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full ${
                          isRisk
                            ? 'bg-[#FFE3DC] text-[#9C3A26]'
                            : iv.estado === 'Completada'
                            ? 'bg-[#DCF7EC] text-[#145941]'
                            : 'bg-[#DFEEFF] text-[#1A4B7F]'
                        }`}
                      >
                        {iv.estado}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm font-bold text-[#2F2522]">
                      {fam?.apellido} × {nan?.nombre}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#6B5B55]">
                        <Video className="w-3.5 h-3.5 text-[#5DA9F6]" />
                        Videollamada sin traslado
                      </span>
                      <button
                        onClick={() =>
                          isRisk ? onTriggerSosForInterview(iv) : onNavigate('interviews')
                        }
                        className="text-xs font-extrabold text-[#9C3A26] hover:underline cursor-pointer"
                      >
                        {isRisk ? 'Reemplazar SOS' : 'Abrir sala'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Quick Action Pastel Tiles */}
          <section className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onNavigate('nannies')}
              className="rounded-2xl bg-[#EDFBF5] hover:bg-[#DCF7EC] border border-[#C5EFE0] p-4 text-left transition-colors cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-white text-[#1F7A5A] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                <UserPlus className="w-4 h-4" />
              </div>
              <div className="mt-3 font-display font-semibold text-sm text-[#145941]">
                Sumar Niñera
              </div>
              <div className="text-[11px] font-semibold text-[#2E725A] mt-0.5">
                Cargar postulante a la base
              </div>
            </button>

            <button
              onClick={() => onNavigate('families')}
              className="rounded-2xl bg-[#EEF7FF] hover:bg-[#DFEEFF] border border-[#CCE4FF] p-4 text-left transition-colors cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-white text-[#2568AD] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                <Home className="w-4 h-4" />
              </div>
              <div className="mt-3 font-display font-semibold text-sm text-[#1A4B7F]">
                Nueva Familia
              </div>
              <div className="text-[11px] font-semibold text-[#326498] mt-0.5">
                Formulario digital rápido
              </div>
            </button>

            <button
              onClick={() => onNavigate('moderation')}
              className="col-span-2 rounded-2xl bg-[#F5F1FF] hover:bg-[#ECE4FF] border border-[#DFD2FF] p-4 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white text-[#5E3FA3] flex items-center justify-center shadow-2xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-display font-semibold text-sm text-[#462B80]">
                    Bandeja de Moderación y Quejas
                  </div>
                  <div className="text-[11px] font-semibold text-[#644B9A]">
                    {openTickets} ticket{openTickets === 1 ? '' : 's'} para responder por mail o WhatsApp
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#5E3FA3]" />
            </button>
          </section>
        </motion.div>
      </div>
    </motion.div>
  );
}
