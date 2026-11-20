import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video,
  Copy,
  CheckCircle2,
  AlertTriangle,
  Clock,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  X,
  MessageCircle,
  ClipboardCheck,
  UserCheck,
} from 'lucide-react';
import { NannyAvatar, FamilyAvatar } from '../components/PastelArtwork';
import { calculateMatch, formatARS } from '../data/mockData';

export default function InterviewsView({
  interviews,
  families,
  nannies,
  initialSosInterview,
  onClearInitialSos,
  onReplaceNannySos,
  onUpdateInterview,
  onApproveInterview,
  showToast,
}) {
  const [sosInterview, setSosInterview] = useState(null);
  const [roomInterview, setRoomInterview] = useState(null);
  const [roomNotes, setRoomNotes] = useState('');

  useEffect(() => {
    if (initialSosInterview) {
      setSosInterview(initialSosInterview);
      onClearInitialSos?.();
    }
  }, [initialSosInterview, onClearInitialSos]);

  const activeRoom = roomInterview
    ? interviews.find((i) => i.id === roomInterview.id) || roomInterview
    : null;

  const sosFamily = sosInterview
    ? families.find((f) => f.id === sosInterview.familyId)
    : null;

  const backupCandidates = sosInterview && sosFamily
    ? nannies
        .filter((n) => n.id !== sosInterview.nannyId && n.estado !== 'En revisión')
        .map((nanny) => ({
          nanny,
          match: calculateMatch(nanny, sosFamily),
        }))
        .sort((a, b) => {
          // Prioritize SOS-ready nannies with high match
          const bonusA = a.nanny.disponibleSos ? 8 : 0;
          const bonusB = b.nanny.disponibleSos ? 8 : 0;
          return b.match.total + bonusB - (a.match.total + bonusA);
        })
        .slice(0, 3)
    : [];

  const copyLink = (link) => {
    navigator.clipboard?.writeText(link).catch(() => {});
    showToast('Enlace de videollamada copiado para enviar por WhatsApp');
  };

  const copyWhatsappOffer = (nanny, family, iv) => {
    const msg = `¡Hola ${nanny.nombre.split(' ')[0]}! Desde Arrullo tenemos una entrevista virtual hoy (${iv.hora}) con ${family.apellido} en ${family.zona} (${family.hijos}, ${family.diasHorario}). ¡Sos una de nuestras mejores candidatas! ¿Podés sumarte al link ${iv.link}?`;
    navigator.clipboard?.writeText(msg).catch(() => {});
    showToast(`Mensaje de oferta copiado para ${nanny.nombre.split(' ')[0]}`);
  };

  const openRoom = (iv) => {
    setRoomInterview(iv);
    setRoomNotes(iv.notas || '');
  };

  const toggleChecklist = (key) => {
    if (!activeRoom) return;
    onUpdateInterview(activeRoom.id, {
      checklist: {
        ...activeRoom.checklist,
        [key]: !activeRoom.checklist[key],
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#2F2522]">
            Entrevistas Virtuales &amp; Plan B SOS
          </h1>
          <p className="text-sm text-[#6B5B55] mt-1">
            Chau traslados innecesarios y plantones: videollamadas confirmadas 2 hs antes y reemplazo en 1 clic.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#EEF7FF] border border-[#CFE4FF] text-xs font-extrabold text-[#1A4B7F] self-start">
          <Video className="w-4 h-4 text-[#5DA9F6]" />
          100% Virtual • Confirmación automática 2h antes
        </div>
      </div>

      {/* Interview Cards */}
      <div className="space-y-4">
        {interviews.map((iv) => {
          const family = families.find((f) => f.id === iv.familyId);
          const nanny = nannies.find((n) => n.id === iv.nannyId);
          const isRisk = iv.estado === 'En riesgo';
          const isDone = iv.estado === 'Completada';

          return (
            <motion.article
              key={iv.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-[26px] border p-5 pastel-shadow transition-colors ${
                isRisk
                  ? 'bg-[#FFFDF5] border-[#F4B93B]'
                  : isDone
                  ? 'bg-white border-[#D6EFE3]'
                  : 'bg-white border-[#EFE4D8]'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                {/* Left Info */}
                <div className="flex items-start gap-4">
                  <div className="flex -space-x-3 shrink-0 pt-0.5">
                    <FamilyAvatar theme={family?.avatarTheme || 'sky'} size={50} />
                    <NannyAvatar
                      name={nanny?.nombre}
                      theme={nanny?.avatarTheme || 'peach'}
                      variant={nanny?.avatarVariant || 0}
                      size={50}
                      className="ring-2 ring-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#FAF2E8] text-[#2F2522]">
                        <Clock className="w-3.5 h-3.5 text-[#E56A50]" />
                        {iv.fecha} • {iv.hora}
                      </span>
                      <span
                        className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                          isRisk
                            ? 'bg-[#FFE3DC] text-[#9C3A26]'
                            : isDone
                            ? 'bg-[#DCF7EC] text-[#145941]'
                            : 'bg-[#EEF7FF] text-[#1A4B7F]'
                        }`}
                      >
                        {iv.estado}
                      </span>
                    </div>

                    <h2 className="font-display text-lg font-semibold text-[#2F2522]">
                      {family?.apellido || 'Familia'} × {nanny?.nombre || 'Niñera'}
                    </h2>

                    <p className="text-xs font-semibold text-[#6B5B55]">
                      {family?.zona} • {family?.hijos} • {family?.diasHorario}
                    </p>

                    {/* Dual confirmation pills */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-1 rounded-xl bg-[#EDFBF5] text-[#145941]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Familia: {iv.confirmacionFamilia}
                      </span>
                      <button
                        onClick={() => {
                          if (isDone) return;
                          const nextRisk = !isRisk;
                          onUpdateInterview(iv.id, {
                            estado: nextRisk ? 'En riesgo' : 'Lista',
                            confirmacionNinera: nextRisk
                              ? 'Sin confirmar (Riesgo)'
                              : 'Confirmada',
                          });
                          showToast(
                            nextRisk
                              ? 'Simulaste falta de confirmación: probá activar el Plan B SOS'
                              : 'Asistencia de niñera marcada como Confirmada'
                          );
                        }}
                        title="Hacé clic para alternar estado de confirmación"
                        className={`inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-1 rounded-xl transition-colors cursor-pointer ${
                          isRisk
                            ? 'bg-[#FFE3DC] text-[#9C3A26] hover:bg-[#FFD1C6]'
                            : 'bg-[#EDFBF5] text-[#145941] hover:bg-[#D5F5E7]'
                        }`}
                      >
                        {isRisk ? (
                          <AlertTriangle className="w-3.5 h-3.5" />
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        )}
                        Niñera: {iv.confirmacionNinera}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex flex-wrap sm:flex-nowrap lg:flex-col items-stretch sm:items-center lg:items-end gap-2 shrink-0">
                  {isRisk && (
                    <button
                      onClick={() => setSosInterview(iv)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-[#E56A50] hover:bg-[#D55A40] text-white text-xs font-extrabold shadow-xs transition-colors cursor-pointer"
                    >
                      <HeartHandshake className="w-4 h-4" />
                      Activar Reemplazo SOS (Plan B)
                    </button>
                  )}

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyLink(iv.link)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF2E8] hover:bg-[#F0E2D2] text-[#2F2522] text-xs font-extrabold transition-colors cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      Link Meet
                    </button>

                    <button
                      onClick={() => openRoom(iv)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2568AD] hover:bg-[#1D558F] text-white text-xs font-extrabold transition-colors cursor-pointer"
                    >
                      <ClipboardCheck className="w-3.5 h-3.5" />
                      {isDone ? 'Ver resumen' : 'Sala y Checklist'}
                    </button>
                  </div>

                  {!isRisk && !isDone && (
                    <button
                      onClick={() => setSosInterview(iv)}
                      className="text-[11px] font-extrabold text-[#9C3A26] hover:underline cursor-pointer"
                    >
                      ¿Canceló a último momento? Buscar Plan B
                    </button>
                  )}
                </div>
              </div>

              {iv.notas && (
                <div className="mt-3.5 pt-3 border-t border-[#F4EAE0] text-xs text-[#6B5B55]">
                  <strong className="text-[#2F2522]">Nota:</strong> {iv.notas}
                </div>
              )}
            </motion.article>
          );
        })}
      </div>

      {/* PLAN B SOS REPLACEMENT MODAL */}
      <AnimatePresence>
        {sosInterview && sosFamily && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#2F2522]/45 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setSosInterview(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 18 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-[30px] border-2 border-[#F8DB8B] p-6 pastel-shadow-lg space-y-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#FEF1C3] text-[#855706] flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-[#2F2522]">
                      Reemplazo Express (Plan B SOS)
                    </h2>
                    <p className="text-xs sm:text-sm text-[#6B5B55] mt-0.5">
                      Top 3 niñeras verificadas compatibles para salvar la entrevista con{' '}
                      <strong>{sosFamily.apellido}</strong> ({sosFamily.zona} • {sosInterview.hora}).
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSosInterview(null)}
                  aria-label="Cerrar modal de reemplazo"
                  className="p-2 rounded-xl bg-[#FAF2E8] text-[#6B5B55] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                {backupCandidates.map(({ nanny, match }, i) => (
                  <div
                    key={nanny.id}
                    className="rounded-2xl bg-[#FFFBF5] border border-[#EDE2D5] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5">
                      <NannyAvatar
                        name={nanny.nombre}
                        theme={nanny.avatarTheme}
                        variant={nanny.avatarVariant}
                        size={52}
                      />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-display font-semibold text-base text-[#2F2522]">
                            #{i + 1} {nanny.nombre}
                          </h3>
                          <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-[#DCF7EC] text-[#145941] tabular-nums">
                            {match.total}% Match
                          </span>
                          {nanny.disponibleSos && (
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#FEF1C3] text-[#855706]">
                              Lista SOS
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-bold text-[#6B5B55] mt-0.5">
                          {nanny.zona} • {formatARS(nanny.tarifaHora)}/h • Puntualidad {nanny.puntualidad}%
                        </p>
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {match.highlights.slice(0, 3).map((h) => (
                            <span
                              key={h}
                              className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-white border border-[#EDE2D5] text-[#5C4B44]"
                            >
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col gap-2 shrink-0">
                      <button
                        onClick={() => {
                          onReplaceNannySos(sosInterview.id, nanny.id);
                          setSosInterview(null);
                        }}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#1F7A5A] hover:bg-[#176348] text-white text-xs font-extrabold transition-colors cursor-pointer"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        Asignar ahora
                      </button>
                      <button
                        onClick={() => copyWhatsappOffer(nanny, sosFamily, sosInterview)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#E6D8C8] hover:bg-[#FAF2E8] text-[#2F2522] text-xs font-bold transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#1F7A5A]" />
                        Copiar WhatsApp
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VIRTUAL INTERVIEW ROOM + DIGITAL CHECKLIST MODAL */}
      <AnimatePresence>
        {activeRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#2F2522]/45 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setRoomInterview(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 18 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-white rounded-[30px] border border-[#EFE4D8] p-6 pastel-shadow-lg space-y-5 max-h-[90vh] overflow-y-auto"
            >
              {(() => {
                const fam = families.find((f) => f.id === activeRoom.familyId);
                const nan = nannies.find((n) => n.id === activeRoom.nannyId);
                return (
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="font-display text-xl font-semibold text-[#2F2522]">
                          Sala Virtual y Checklist
                        </h2>
                        <p className="text-xs font-bold text-[#6B5B55] mt-0.5">
                          {fam?.apellido} × {nan?.nombre} • {activeRoom.fecha} {activeRoom.hora}
                        </p>
                      </div>
                      <button
                        onClick={() => setRoomInterview(null)}
                        aria-label="Cerrar sala virtual"
                        className="p-2 rounded-xl bg-[#FAF2E8] text-[#6B5B55] cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Simulated Video Call Preview Banner */}
                    <div className="rounded-2xl bg-gradient-to-br from-[#EEF7FF] to-[#F5F1FF] border border-[#D4E6FF] p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <FamilyAvatar theme={fam?.avatarTheme || 'sky'} size={54} />
                        <div className="text-center">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-[#1A4B7F] text-[11px] font-extrabold shadow-2xs">
                            <Video className="w-3.5 h-3.5" />
                            En vivo (15 min)
                          </span>
                        </div>
                        <NannyAvatar
                          name={nan?.nombre}
                          theme={nan?.avatarTheme || 'peach'}
                          variant={nan?.avatarVariant || 0}
                          size={54}
                        />
                      </div>
                      <button
                        onClick={() => copyLink(activeRoom.link)}
                        className="px-3.5 py-2 rounded-xl bg-white text-[#1A4B7F] text-xs font-extrabold border border-[#C6E0FF] hover:bg-[#F5FAFF] cursor-pointer"
                      >
                        Copiar link sala
                      </button>
                    </div>

                    {/* Digital Interview Checklist */}
                    <div className="space-y-2.5">
                      <h3 className="font-display text-base font-semibold text-[#2F2522] flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#1F7A5A]" />
                        Guía de evaluación (reemplaza el formulario en papel)
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[
                          { key: 'puntualidad', label: 'Se conectó puntual y con cámara' },
                          { key: 'experiencia', label: 'Experiencia acorde a las edades' },
                          { key: 'disponibilidad', label: 'Horarios y traslado confirmados' },
                          { key: 'quimica', label: 'Buena química con la familia' },
                        ].map((item) => {
                          const checked = activeRoom.checklist?.[item.key];
                          return (
                            <button
                              key={item.key}
                              type="button"
                              onClick={() => toggleChecklist(item.key)}
                              className={`flex items-center gap-2.5 p-3 rounded-2xl text-xs font-bold border text-left transition-colors cursor-pointer ${
                                checked
                                  ? 'bg-[#EDFBF5] border-[#A5E8CC] text-[#145941]'
                                  : 'bg-[#FFFBF5] border-[#EDE2D5] text-[#6B5B55]'
                              }`}
                            >
                              <CheckCircle2
                                className={`w-4 h-4 shrink-0 ${
                                  checked ? 'text-[#1F7A5A]' : 'text-[#C8B8AB]'
                                }`}
                              />
                              {item.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-extrabold text-[#6B5B55]">
                        Notas de la entrevista y acuerdos (tarifa, fecha de inicio)
                      </label>
                      <textarea
                        rows={3}
                        value={roomNotes}
                        onChange={(e) => setRoomNotes(e.target.value)}
                        onBlur={() => onUpdateInterview(activeRoom.id, { notas: roomNotes })}
                        className="mt-1 w-full rounded-2xl bg-[#FFFBF5] border border-[#E7D8C9] p-3 text-sm font-semibold text-[#2F2522]"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2">
                      <button
                        onClick={() => setRoomInterview(null)}
                        className="px-4 py-2.5 rounded-2xl bg-[#FAF2E8] text-[#6B5B55] font-bold text-sm cursor-pointer"
                      >
                        Guardar y cerrar
                      </button>
                      {activeRoom.estado !== 'Completada' && (
                        <button
                          onClick={() => {
                            onApproveInterview(activeRoom.id, roomNotes);
                            setRoomInterview(null);
                          }}
                          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-[#1F7A5A] hover:bg-[#176348] text-white font-bold text-sm cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Aprobar Match y Asignar Niñera
                        </button>
                      )}
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
