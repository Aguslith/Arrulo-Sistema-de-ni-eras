import React, { useState, useMemo, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import {
  Heart,
  X,
  Bookmark,
  Sparkles,
  MapPin,
  Clock,
  Star,
  ShieldCheck,
  Video,
  SlidersHorizontal,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Zap,
} from 'lucide-react';
import { NannyAvatar, FamilyAvatar } from '../components/PastelArtwork';
import { calculateMatch, formatARS } from '../data/mockData';

function SwipeCard({ candidate, onSwipe, isTop }) {
  const { nanny, match } = candidate;
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 0, 220], [-14, 0, 14]);
  const likeOpacity = useTransform(x, [40, 130], [0, 1]);
  const passOpacity = useTransform(x, [-130, -40], [1, 0]);

  const handleDragEnd = (_, info) => {
    if (info.offset.x > 110 || info.velocity.x > 500) {
      onSwipe('right', candidate);
    } else if (info.offset.x < -110 || info.velocity.x < -500) {
      onSwipe('left', candidate);
    }
  };

  return (
    <motion.div
      style={isTop ? { x, rotate } : undefined}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.85}
      onDragEnd={isTop ? handleDragEnd : undefined}
      initial={isTop ? { scale: 0.96, y: 12 } : { scale: 0.94, y: 16 }}
      animate={{
        scale: isTop ? 1 : 0.95,
        y: isTop ? 0 : 14,
      }}
      exit={{
        x: 240,
        opacity: 0,
        scale: 0.92,
        transition: { duration: 0.2 },
      }}
      transition={{ type: 'spring', stiffness: 340, damping: 28 }}
      className={`rounded-[30px] border-2 overflow-hidden flex flex-col select-none ${
        isTop
          ? 'relative z-20 bg-white border-[#EFE3D6] pastel-shadow-lg cursor-grab active:cursor-grabbing'
          : 'absolute inset-0 z-10 bg-[#FAF2E8] border-[#E7D8C9] pointer-events-none'
      }`}
    >
      {!isTop ? (
        <div className="h-full w-full bg-gradient-to-b from-[#FAF2E8] to-[#F3E7D8]" aria-hidden="true" />
      ) : (
        <>
          {/* Dynamic Swipe Stamps */}
          <motion.div
            style={{ opacity: likeOpacity }}
            className="pointer-events-none absolute top-6 left-6 z-30 px-4 py-1.5 rounded-2xl border-3 border-[#1F7A5A] bg-[#EDFBF5]/95 text-[#145941] font-display font-bold text-lg -rotate-12"
          >
            ¡MATCH!
          </motion.div>
          <motion.div
            style={{ opacity: passOpacity }}
            className="pointer-events-none absolute top-6 right-6 z-30 px-4 py-1.5 rounded-2xl border-3 border-[#E56A50] bg-[#FFF3F0]/95 text-[#9C3A26] font-display font-bold text-lg rotate-12"
          >
            PASAR
          </motion.div>

          {/* Pastel Card Header Banner */}
          <div className="relative bg-gradient-to-br from-[#FFF1EB] via-[#F5F1FF] to-[#EDFBF5] px-5 pt-5 pb-4 border-b border-[#F2E6DA]">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3.5 min-w-0">
                <NannyAvatar
                  name={nanny.nombre}
                  theme={nanny.avatarTheme}
                  variant={nanny.avatarVariant}
                  size={68}
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-display text-lg sm:text-xl font-semibold text-[#2F2522] leading-tight">
                      {nanny.nombre}, {nanny.edad}
                    </h3>
                    {nanny.verificada.dni && nanny.verificada.antecedentes && (
                      <span
                        title="Identidad y antecedentes verificados"
                        className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-[#DCF7EC] text-[#145941]"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verificada
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold text-[#6B5B55]">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#E56A50]" />
                      {nanny.zona}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-[#E5A124] fill-[#FDE084]" />
                      {nanny.rating} ({nanny.horasCompletadas}h)
                    </span>
                    <span>{nanny.experienciaAnios} años exp.</span>
                  </div>
                </div>
              </div>

              {/* Match Compatibility Score Pill */}
              <div className="shrink-0 text-center bg-white/95 border border-[#E7D8C9] rounded-2xl px-3 py-1.5 shadow-2xs">
                <div className="font-display text-2xl font-bold leading-none text-[#145941] tabular-nums">
                  {match.total}%
                </div>
                <div className="text-[10px] font-extrabold uppercase tracking-wide text-[#7A6A63] mt-0.5">
                  Match
                </div>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-5 space-y-3.5">
            {/* Bio */}
            <p className="text-sm text-[#4D3F3A] leading-relaxed">{nanny.bio}</p>

            {/* Why she matches this family */}
            <div className="rounded-2xl bg-[#FFFBF5] border border-[#F2E6DA] p-3.5 space-y-2.5">
              <div className="text-xs font-extrabold text-[#462B80] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#9F7AEA]" />
                Por qué encaja con esta familia
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
                {match.breakdown.slice(0, 4).map((item) => (
                  <div key={item.key} className="text-xs min-w-0">
                    <div className="flex items-center justify-between gap-2 font-bold text-[#6B5B55]">
                      <span className="truncate">
                        {item.key === 'requisitos' ? 'Necesidades' : item.label}
                      </span>
                      <span className="tabular-nums text-[#2F2522] shrink-0">{item.score}%</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-[#EFE4D8] overflow-hidden">
                      <div
                        style={{ width: `${item.score}%` }}
                        className={`h-full rounded-full ${
                          item.score >= 80
                            ? 'bg-[#4DC096]'
                            : item.score >= 55
                            ? 'bg-[#F4B93B]'
                            : 'bg-[#F4866E]'
                        }`}
                      />
                    </div>
                    <div className="text-[11px] text-[#7A6A63] mt-0.5 truncate">{item.detail}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specialties Chips */}
            <div className="flex flex-wrap gap-1.5">
              {nanny.especialidades.map((esp) => {
                const isRequired = match.matchedReqs.includes(esp);
                return (
                  <span
                    key={esp}
                    className={`text-xs font-bold px-2.5 py-1 rounded-xl ${
                      isRequired
                        ? 'bg-[#DCF7EC] text-[#145941] border border-[#A5E8CC]'
                        : 'bg-[#FAF2E8] text-[#6B5B55]'
                    }`}
                  >
                    {esp}
                  </span>
                );
              })}
            </div>

            {/* Rate & Availability Footer inside card */}
            <div className="pt-3 border-t border-[#F2E6DA] flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#6B5B55] min-w-0">
                <Clock className="w-4 h-4 text-[#5DA9F6] shrink-0" />
                <span className="truncate">{nanny.disponibilidad.join(' • ')}</span>
              </div>
              <div className="font-display font-semibold text-base text-[#2F2522] tabular-nums shrink-0">
                {formatARS(nanny.tarifaHora)}
                <span className="text-xs font-sans font-semibold text-[#7A6A63]">/hora</span>
              </div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}

export default function MatchView({
  nannies,
  families,
  selectedFamilyId,
  onSelectFamily,
  onCreateInterviewFromMatch,
  showToast,
}) {
  const [mode, setMode] = useState('swipe'); // 'swipe' | 'auto'
  const [swipedIds, setSwipedIds] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [matchedModal, setMatchedModal] = useState(null);
  const [interviewDay, setInterviewDay] = useState('Mañana');
  const [interviewTime, setInterviewTime] = useState('18:00 hs');

  const activeFamily = useMemo(
    () => families.find((f) => f.id === selectedFamilyId) || families[0],
    [families, selectedFamilyId]
  );

  // Reset swipe deck when family changes
  useEffect(() => {
    setSwipedIds([]);
  }, [activeFamily?.id]);

  const rankedCandidates = useMemo(() => {
    if (!activeFamily) return [];
    return nannies
      .map((nanny) => ({
        nanny,
        match: calculateMatch(nanny, activeFamily),
      }))
      .sort((a, b) => b.match.total - a.match.total);
  }, [nannies, activeFamily]);

  const remainingDeck = useMemo(
    () => rankedCandidates.filter((c) => !swipedIds.includes(c.nanny.id)),
    [rankedCandidates, swipedIds]
  );

  const handleSwipe = (direction, candidate) => {
    if (!candidate) return;
    setSwipedIds((prev) => [...prev, candidate.nanny.id]);

    if (direction === 'right') {
      setMatchedModal(candidate);
    } else if (direction === 'save') {
      setSavedIds((prev) =>
        prev.includes(candidate.nanny.id) ? prev : [...prev, candidate.nanny.id]
      );
      showToast(`${candidate.nanny.nombre} guardada como favorita para ${activeFamily.apellido}`);
    } else {
      showToast(`Pasaste a ${candidate.nanny.nombre.split(' ')[0]}`);
    }
  };

  // Keyboard support for swipe mode
  useEffect(() => {
    if (mode !== 'swipe' || matchedModal || remainingDeck.length === 0) return;
    const onKeyDown = (e) => {
      if (e.target.tagName === 'SELECT' || e.target.tagName === 'INPUT') return;
      if (e.key === 'ArrowRight') handleSwipe('right', remainingDeck[0]);
      if (e.key === 'ArrowLeft') handleSwipe('left', remainingDeck[0]);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mode, matchedModal, remainingDeck]);

  const confirmScheduleInterview = () => {
    if (!matchedModal || !activeFamily) return;
    onCreateInterviewFromMatch({
      familyId: activeFamily.id,
      nannyId: matchedModal.nanny.id,
      fecha: interviewDay,
      hora: interviewTime,
      matchScore: matchedModal.match.total,
    });
    setMatchedModal(null);
  };

  return (
    <div className="space-y-6">
      {/* Header + Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#2F2522]">
            Selección Inteligente de Niñeras
          </h1>
          <p className="text-sm text-[#6B5B55] mt-1">
            Deslizá perfiles en tarjetas interactivas o dejá que Arrullo ordene automáticamente quién encaja mejor.
          </p>
        </div>

        {/* Animated Mode Pill Switch */}
        <div className="inline-flex p-1.5 rounded-2xl bg-[#F4EAE0] border border-[#E9DCD0] self-start">
          <button
            onClick={() => setMode('swipe')}
            className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-colors cursor-pointer ${
              mode === 'swipe' ? 'text-[#462B80]' : 'text-[#6B5B55] hover:text-[#2F2522]'
            }`}
          >
            {mode === 'swipe' && (
              <motion.span
                layoutId="match-mode-pill"
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                className="absolute inset-0 bg-white rounded-xl shadow-xs -z-0"
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-[#E56A50]" />
              Modo Tarjetas (Swipe)
            </span>
          </button>

          <button
            onClick={() => setMode('auto')}
            className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-colors cursor-pointer ${
              mode === 'auto' ? 'text-[#145941]' : 'text-[#6B5B55] hover:text-[#2F2522]'
            }`}
          >
            {mode === 'auto' && (
              <motion.span
                layoutId="match-mode-pill"
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                className="absolute inset-0 bg-white rounded-xl shadow-xs -z-0"
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-[#1F7A5A]" />
              Auto-Match Inteligente
            </span>
          </button>
        </div>
      </div>

      {/* Family Context Selector Bar */}
      {activeFamily && (
        <div className="rounded-3xl bg-white border border-[#EFE4D8] p-4 sm:p-5 pastel-shadow flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <FamilyAvatar theme={activeFamily.avatarTheme} size={52} />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <label htmlFor="family-match-select" className="text-xs font-extrabold text-[#7A6A63]">
                  Buscando niñera para:
                </label>
                <select
                  id="family-match-select"
                  value={activeFamily.id}
                  onChange={(e) => onSelectFamily(e.target.value)}
                  className="font-display font-semibold text-base bg-[#FFF6EE] border border-[#EBDCCB] rounded-xl px-3 py-1 text-[#2F2522] cursor-pointer"
                >
                  {families.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.apellido} ({f.zona}) — {f.estado}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-bold text-[#6B5B55]">
                <span>{activeFamily.hijos}</span>
                <span>• {activeFamily.diasHorario}</span>
                <span className="text-[#145941]">
                  • Tope {formatARS(activeFamily.presupuestoHora)}/h
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {activeFamily.requisitos.map((req) => (
              <span
                key={req}
                className="text-[11px] font-extrabold px-2.5 py-1 rounded-xl bg-[#EEF7FF] text-[#1A4B7F] border border-[#D4E8FF]"
              >
                {req}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* MODE 1: SWIPE DECK */}
      {mode === 'swipe' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 flex flex-col items-center">
            <div className="w-full max-w-[460px] rounded-[34px] nursery-dots border border-[#EFE4D8] p-4 sm:p-6 flex flex-col items-center">
              {/* Deck Stage */}
              <div className="relative w-full min-h-[460px] pb-4">
                <AnimatePresence mode="popLayout">
                  {remainingDeck.length > 0 ? (
                    remainingDeck
                      .slice(0, 2)
                      .reverse()
                      .map((candidate, idx, arr) => (
                        <SwipeCard
                          key={candidate.nanny.id}
                          candidate={candidate}
                          isTop={idx === arr.length - 1}
                          onSwipe={handleSwipe}
                        />
                      ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="h-full bg-white rounded-[30px] border-2 border-dashed border-[#DFCEBC] flex flex-col items-center justify-center text-center p-8"
                    >
                      <div className="w-16 h-16 rounded-3xl bg-[#F5F1FF] text-[#5E3FA3] flex items-center justify-center mb-4">
                        <Sparkles className="w-8 h-8" />
                      </div>
                      <h3 className="font-display text-xl font-semibold text-[#2F2522]">
                        ¡Revisaste todas las candidatas!
                      </h3>
                      <p className="text-sm text-[#6B5B55] mt-2 max-w-xs">
                        Podés volver a ver la lista desde el principio o pasar al modo Auto-Match para compararlas lado a lado.
                      </p>
                      <button
                        onClick={() => setSwipedIds([])}
                        className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#E56A50] text-white font-bold text-sm hover:bg-[#D55A40] transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Ver candidatas de nuevo
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Tactile Action Controls */}
              {remainingDeck.length > 0 && (
                <div className="mt-5 flex items-center justify-center gap-4">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.06 }}
                    onClick={() => handleSwipe('left', remainingDeck[0])}
                    aria-label="Pasar niñera"
                    className="w-14 h-14 rounded-full bg-white border-2 border-[#FFD2C7] text-[#E56A50] flex items-center justify-center pastel-shadow hover:bg-[#FFF3F0] cursor-pointer"
                  >
                    <X className="w-6 h-6" strokeWidth={2.6} />
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.06 }}
                    onClick={() => handleSwipe('save', remainingDeck[0])}
                    aria-label="Guardar como backup"
                    className="w-12 h-12 rounded-full bg-white border-2 border-[#FDE084] text-[#855706] flex items-center justify-center pastel-shadow hover:bg-[#FFFBEB] cursor-pointer"
                  >
                    <Bookmark className="w-5 h-5" strokeWidth={2.4} />
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.08 }}
                    onClick={() => handleSwipe('right', remainingDeck[0])}
                    aria-label="Hacer Match e invitar a entrevista virtual"
                    className="w-16 h-16 rounded-full bg-[#4DC096] border-4 border-[#DCF7EC] text-white flex items-center justify-center pastel-shadow hover:bg-[#3AAF85] cursor-pointer"
                  >
                    <Heart className="w-7 h-7 fill-white" />
                  </motion.button>
                </div>
              )}

              <p className="mt-3 text-[11px] font-bold text-[#7A6A63] text-center">
                Arrastrá la tarjeta a la derecha para hacer Match (o usá las flechas ← / →)
              </p>
            </div>
          </div>

          {/* Right Sidebar: Saved Favorites & Live Tips */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-[26px] border border-[#EFE4D8] p-5 pastel-shadow">
              <h2 className="font-display text-lg font-semibold text-[#2F2522]">
                Guardadas como Plan B ({savedIds.length})
              </h2>
              <p className="text-xs text-[#7A6A63] mt-0.5">
                Si la primera opción cancela o no confirma, estas chicas quedan listas como respaldo.
              </p>

              {savedIds.length === 0 ? (
                <div className="mt-4 rounded-2xl bg-[#FFFBF5] border border-dashed border-[#E6D8C8] p-4 text-center text-xs font-semibold text-[#7A6A63]">
                  Tocá el botón amarillo de marcador para guardar candidatas de respaldo.
                </div>
              ) : (
                <div className="mt-3 space-y-2.5">
                  {savedIds.map((id) => {
                    const found = rankedCandidates.find((c) => c.nanny.id === id);
                    if (!found) return null;
                    return (
                      <div
                        key={id}
                        className="flex items-center justify-between gap-2 p-2.5 rounded-2xl bg-[#FFFBEB] border border-[#F9E39E]"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <NannyAvatar
                            name={found.nanny.nombre}
                            theme={found.nanny.avatarTheme}
                            variant={found.nanny.avatarVariant}
                            size={36}
                          />
                          <div className="min-w-0">
                            <div className="text-xs font-extrabold text-[#2F2522] truncate">
                              {found.nanny.nombre}
                            </div>
                            <div className="text-[11px] font-bold text-[#855706]">
                              {found.match.total}% Match • {found.nanny.zona}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => setMatchedModal(found)}
                          className="shrink-0 px-2.5 py-1.5 rounded-xl bg-white text-[#145941] text-[11px] font-extrabold border border-[#C7EEDB] hover:bg-[#EDFBF5] cursor-pointer"
                        >
                          Invitar
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="rounded-[26px] bg-[#F5F1FF] border border-[#DFD2FF] p-5 space-y-2">
              <div className="flex items-center gap-2 font-display font-semibold text-base text-[#462B80]">
                <Zap className="w-4 h-4 text-[#7C5AC2]" />
                ¿Cómo funciona en producción?
              </div>
              <p className="text-xs text-[#59418D] leading-relaxed">
                En el sistema real, la familia recibe solo las <strong>3 mejores candidatas pre-filtradas</strong> por vos o por el algoritmo. Si ambos dan &ldquo;Me gusta&rdquo;, se habilita automáticamente la <strong>videollamada virtual</strong> sin compartir teléfonos ni direcciones hasta confirmar la contratación.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* MODE 2: AUTO-MATCH INTELLIGENT RANKING */
        <div className="space-y-4">
          {rankedCandidates.map(({ nanny, match }, index) => (
            <motion.div
              key={nanny.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="bg-white rounded-[26px] border border-[#EFE4D8] p-5 pastel-shadow hover:border-[#DFCBB8] transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <NannyAvatar
                      name={nanny.nombre}
                      theme={nanny.avatarTheme}
                      variant={nanny.avatarVariant}
                      size={64}
                    />
                    {index === 0 && (
                      <span className="absolute -top-2 -left-2 px-2 py-0.5 rounded-full bg-[#FDE084] text-[#664100] text-[10px] font-extrabold shadow-xs">
                        #1 Top
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-lg font-semibold text-[#2F2522]">
                        {nanny.nombre}
                      </h3>
                      <span
                        className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full tabular-nums ${
                          match.total >= 85
                            ? 'bg-[#DCF7EC] text-[#145941]'
                            : match.total >= 65
                            ? 'bg-[#FEF1C3] text-[#855706]'
                            : 'bg-[#FFE3DC] text-[#9C3A26]'
                        }`}
                      >
                        {match.total}% Compatibilidad
                      </span>
                      {nanny.disponibleSos && (
                        <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-[#EEF7FF] text-[#1A4B7F]">
                          Apta Reemplazo SOS
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-[#6B5B55] mt-1">
                      {nanny.zona} • {nanny.experienciaAnios} años exp. • {formatARS(nanny.tarifaHora)}/hora • Puntualidad {nanny.puntualidad}%
                    </p>
                    <p className="text-xs text-[#7A6A63] mt-1.5 max-w-2xl">{nanny.bio}</p>
                  </div>
                </div>

                <div className="flex sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2 shrink-0">
                  <button
                    onClick={() => setMatchedModal({ nanny, match })}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-[#E56A50] hover:bg-[#D55A40] text-white text-xs font-extrabold transition-colors cursor-pointer"
                  >
                    <Video className="w-4 h-4" />
                    Agendar entrevista virtual
                  </button>
                  <span className="text-[11px] font-bold text-[#7A6A63] text-center lg:text-right">
                    Estado: {nanny.estado}
                  </span>
                </div>
              </div>

              {/* Transparent Match Score Breakdown Bars */}
              <div className="mt-4 pt-4 border-t border-[#F4EAE0] grid grid-cols-2 sm:grid-cols-5 gap-3">
                {match.breakdown.map((b) => (
                  <div key={b.key}>
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#6B5B55]">
                      <span>{b.label}</span>
                      <span className="tabular-nums text-[#2F2522]">{b.score}%</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-[#F2E8DD] overflow-hidden">
                      <div
                        style={{ width: `${b.score}%` }}
                        className={`h-full rounded-full ${
                          b.score >= 80
                            ? 'bg-[#4DC096]'
                            : b.score >= 55
                            ? 'bg-[#F4B93B]'
                            : 'bg-[#F4866E]'
                        }`}
                      />
                    </div>
                    <div className="mt-1 text-[11px] text-[#7A6A63] truncate" title={b.detail}>
                      {b.detail}
                    </div>
                  </div>
                ))}
              </div>

              {match.missingReqs.length > 0 && (
                <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-[#9C3A26]">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  Requisitos no declarados por esta niñera: {match.missingReqs.join(', ')}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* CELEBRATORY MATCH MODAL -> SCHEDULE VIRTUAL INTERVIEW */}
      <AnimatePresence>
        {matchedModal && activeFamily && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#2F2522]/45 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setMatchedModal(null)}
          >
            <motion.div
              initial={{ scale: 0.88, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 12, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 360, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white rounded-[32px] border-2 border-[#EFE3D6] p-6 sm:p-7 pastel-shadow-lg text-center relative overflow-hidden"
            >
              {/* Pastel celebration dots */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-10 -left-10 w-36 h-36 rounded-full bg-[#FFE3DC]/70 blur-xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-10 -right-10 w-36 h-36 rounded-full bg-[#D3F5E6]/70 blur-xl"
              />

              <div className="relative">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#DCF7EC] text-[#145941] text-xs font-extrabold">
                  <Sparkles className="w-3.5 h-3.5" />
                  ¡{matchedModal.match.total}% de Compatibilidad!
                </div>

                <h2 className="mt-3 font-display text-2xl font-semibold text-[#2F2522]">
                  ¡Es un Match!
                </h2>
                <p className="text-sm text-[#6B5B55] mt-1">
                  Coordiná la entrevista 100% virtual entre{' '}
                  <strong>{activeFamily.apellido}</strong> y{' '}
                  <strong>{matchedModal.nanny.nombre}</strong>.
                </p>

                {/* Paired Avatars */}
                <div className="mt-5 flex items-center justify-center gap-4">
                  <FamilyAvatar theme={activeFamily.avatarTheme} size={64} />
                  <div className="w-10 h-10 rounded-full bg-[#FFE3DC] text-[#E56A50] flex items-center justify-center">
                    <Heart className="w-5 h-5 fill-[#E56A50]" />
                  </div>
                  <NannyAvatar
                    name={matchedModal.nanny.nombre}
                    theme={matchedModal.nanny.avatarTheme}
                    variant={matchedModal.nanny.avatarVariant}
                    size={64}
                  />
                </div>

                {/* Quick schedule picker */}
                <div className="mt-6 grid grid-cols-2 gap-3 text-left">
                  <div>
                    <label className="text-xs font-extrabold text-[#6B5B55]">Día sugerido</label>
                    <select
                      value={interviewDay}
                      onChange={(e) => setInterviewDay(e.target.value)}
                      className="mt-1 w-full rounded-xl bg-[#FFFBF5] border border-[#E7D8C9] px-3 py-2 text-sm font-bold text-[#2F2522]"
                    >
                      <option>Hoy</option>
                      <option>Mañana</option>
                      <option>Jueves</option>
                      <option>Viernes</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-extrabold text-[#6B5B55]">Horario</label>
                    <select
                      value={interviewTime}
                      onChange={(e) => setInterviewTime(e.target.value)}
                      className="mt-1 w-full rounded-xl bg-[#FFFBF5] border border-[#E7D8C9] px-3 py-2 text-sm font-bold text-[#2F2522]"
                    >
                      <option>10:30 hs</option>
                      <option>15:00 hs</option>
                      <option>18:00 hs</option>
                      <option>19:30 hs</option>
                    </select>
                  </div>
                </div>

                <div className="mt-3 rounded-2xl bg-[#EEF7FF] border border-[#D4E8FF] p-3 text-left flex items-start gap-2.5 text-xs text-[#1A4B7F]">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    Se generará un link de videollamada automático con recordatorio de confirmación 2 horas antes (evitás ir presencialmente).
                  </span>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={() => setMatchedModal(null)}
                    className="flex-1 px-4 py-2.5 rounded-2xl bg-[#FAF2E8] hover:bg-[#F1E4D5] text-[#6B5B55] font-bold text-sm transition-colors cursor-pointer"
                  >
                    Seguir viendo
                  </button>
                  <button
                    onClick={confirmScheduleInterview}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-[#E56A50] hover:bg-[#D55A40] text-white font-bold text-sm transition-colors cursor-pointer"
                  >
                    <Video className="w-4 h-4" />
                    Confirmar videollamada
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
