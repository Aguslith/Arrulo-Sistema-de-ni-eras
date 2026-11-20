import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
  MapPin,
  Clock,
  Sparkles,
  Link2,
  X,
  Baby,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { FamilyAvatar, NannyAvatar } from '../components/PastelArtwork';
import { ZONAS, TURNOS, ESPECIALIDADES, formatARS, calculateMatch } from '../data/mockData';

const EMPTY_FAMILY = {
  apellido: '',
  contacto: '',
  zona: 'Palermo',
  hijos: '',
  turnosNecesarios: ['Tarde'],
  diasHorario: 'Lun a Vie • 14:00 a 18:00 hs',
  horasSemanales: 20,
  presupuestoHora: 4800,
  requisitos: ['Primera infancia (1-4 años)'],
  notas: '',
  telefono: '',
  email: '',
};

export default function FamiliesView({
  families,
  nannies,
  onAddFamily,
  onOpenMatchForFamily,
  showToast,
}) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todas');
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FAMILY);

  const filtered = useMemo(() => {
    return families.filter((f) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        f.apellido.toLowerCase().includes(q) ||
        f.zona.toLowerCase().includes(q) ||
        f.hijos.toLowerCase().includes(q);
      const matchStatus = statusFilter === 'Todas' || f.estado === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [families, search, statusFilter]);

  const toggleMulti = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.apellido.trim()) return;
    const themes = ['sky', 'peach', 'lilac', 'mint', 'butter'];
    const newFamily = {
      id: `f-${Date.now()}`,
      apellido: form.apellido.trim().startsWith('Familia')
        ? form.apellido.trim()
        : `Familia ${form.apellido.trim()}`,
      contacto: form.contacto.trim() || form.apellido.trim(),
      zona: form.zona,
      hijos: form.hijos.trim() || '1 niño (3 años)',
      rangoEdad: form.requisitos[0] || 'Primera infancia (1-4 años)',
      turnosNecesarios: form.turnosNecesarios.length ? form.turnosNecesarios : ['Tarde'],
      diasHorario: form.diasHorario.trim() || 'A convenir',
      horasSemanales: Number(form.horasSemanales) || 15,
      presupuestoHora: Number(form.presupuestoHora) || 4800,
      requisitos: form.requisitos.length ? form.requisitos : ['Primera infancia (1-4 años)'],
      notas: form.notas.trim() || 'Solicitud digital cargada desde el formulario online.',
      telefono: form.telefono.trim() || '+54 9 11 0000-0000',
      email: form.email.trim() || 'familia@ejemplo.com',
      estado: 'Buscando',
      nineraAsignadaId: null,
      avatarTheme: themes[families.length % themes.length],
    };
    onAddFamily(newFamily);
    setForm(EMPTY_FAMILY);
    setShowAddModal(false);
  };

  const copyFamilyFormLink = () => {
    navigator.clipboard?.writeText('https://arrullo.ar/solicitar-ninera').catch(() => {});
    showToast('Enlace del formulario digital copiado (reemplaza las planillas en papel)');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#2F2522]">
            Base de Datos de Familias
          </h1>
          <p className="text-sm text-[#6B5B55] mt-1">
            Solicitudes digitales con edades, horarios y requisitos listos para el Auto-Match.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={copyFamilyFormLink}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-[#FAF2E8] border border-[#E9DCD0] text-[#2F2522] text-xs sm:text-sm font-bold transition-colors cursor-pointer"
          >
            <Link2 className="w-4 h-4 text-[#5DA9F6]" />
            Link formulario familia
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#2568AD] hover:bg-[#1D558F] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Nueva familia
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl border border-[#EFE4D8] p-4 pastel-shadow flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#8C7A72] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar familia por apellido, barrio o edades..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FFFBF5] border border-[#EDE2D5] text-sm font-semibold text-[#2F2522] placeholder:text-[#96847B]"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {['Todas', 'Reemplazo SOS', 'Buscando', 'En Entrevista', 'Activa'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-extrabold transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#2F2522] text-[#FFFBF5]'
                  : 'bg-[#FAF2E8] text-[#6B5B55] hover:bg-[#EFE2D3]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Family Cards List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filtered.map((family) => {
          const assignedNanny = family.nineraAsignadaId
            ? nannies.find((n) => n.id === family.nineraAsignadaId)
            : null;
          const bestMatch = nannies
            .filter((n) => n.estado === 'Disponible')
            .map((n) => ({ nanny: n, score: calculateMatch(n, family).total }))
            .sort((a, b) => b.score - a.score)[0];

          const isSos = family.estado === 'Reemplazo SOS';

          return (
            <motion.article
              key={family.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white rounded-[26px] border p-5 pastel-shadow flex flex-col justify-between ${
                isSos ? 'border-[#F4866E] bg-[#FFFDFB]' : 'border-[#EFE4D8]'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <FamilyAvatar theme={family.avatarTheme} size={52} />
                    <div>
                      <h2 className="font-display text-lg font-semibold text-[#2F2522]">
                        {family.apellido}
                      </h2>
                      <p className="text-xs font-bold text-[#6B5B55]">
                        Contacto: {family.contacto}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-1 rounded-full shrink-0 ${
                      isSos
                        ? 'bg-[#FFE3DC] text-[#9C3A26]'
                        : family.estado === 'Activa'
                        ? 'bg-[#DCF7EC] text-[#145941]'
                        : family.estado === 'En Entrevista'
                        ? 'bg-[#ECE4FF] text-[#462B80]'
                        : 'bg-[#EEF7FF] text-[#1A4B7F]'
                    }`}
                  >
                    {isSos && <AlertTriangle className="w-3 h-3" />}
                    {family.estado}
                  </span>
                </div>

                {/* Details Box */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 rounded-2xl bg-[#FFFBF5] border border-[#F2E6DA] p-3.5 text-xs">
                  <div className="flex items-center gap-2 font-bold text-[#2F2522]">
                    <Baby className="w-4 h-4 text-[#E56A50] shrink-0" />
                    <span>{family.hijos}</span>
                  </div>
                  <div className="flex items-center gap-2 font-bold text-[#2F2522]">
                    <MapPin className="w-4 h-4 text-[#5DA9F6] shrink-0" />
                    <span>{family.zona}</span>
                  </div>
                  <div className="flex items-center gap-2 font-bold text-[#6B5B55] sm:col-span-2">
                    <Clock className="w-4 h-4 text-[#9F7AEA] shrink-0" />
                    <span>
                      {family.diasHorario} ({family.horasSemanales} hs/sem) • Tope{' '}
                      <strong className="text-[#145941]">
                        {formatARS(family.presupuestoHora)}/h
                      </strong>
                    </span>
                  </div>
                </div>

                {/* Requirements */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {family.requisitos.map((req) => (
                    <span
                      key={req}
                      className="text-[11px] font-extrabold px-2.5 py-1 rounded-xl bg-[#EEF7FF] text-[#1A4B7F]"
                    >
                      {req}
                    </span>
                  ))}
                </div>

                <p className="mt-3 text-xs text-[#6B5B55] leading-relaxed">{family.notas}</p>
              </div>

              {/* Footer Action */}
              <div className="mt-4 pt-3.5 border-t border-[#F3E9DD] flex flex-wrap items-center justify-between gap-3">
                {assignedNanny ? (
                  <div className="flex items-center gap-2">
                    <NannyAvatar
                      name={assignedNanny.nombre}
                      theme={assignedNanny.avatarTheme}
                      variant={assignedNanny.avatarVariant}
                      size={32}
                    />
                    <div className="text-xs">
                      <span className="font-bold text-[#7A6A63]">Niñera: </span>
                      <span className="font-extrabold text-[#2F2522]">{assignedNanny.nombre}</span>
                    </div>
                  </div>
                ) : bestMatch ? (
                  <div className="text-xs font-bold text-[#145941] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Sugerida: {bestMatch.nanny.nombre.split(' ')[0]} ({bestMatch.score}% match)
                  </div>
                ) : (
                  <span className="text-xs font-semibold text-[#7A6A63]">Sin asignar</span>
                )}

                <button
                  onClick={() => onOpenMatchForFamily(family.id)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#ECE4FF] hover:bg-[#DFD2FF] text-[#462B80] text-xs font-extrabold transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {assignedNanny ? 'Ver alternativas' : 'Buscar Match'}
                </button>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Add Family Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#2F2522]/45 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.form
              initial={{ scale: 0.92, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSubmit}
              className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-[30px] border border-[#EFE4D8] p-6 pastel-shadow-lg space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-xl font-semibold text-[#2F2522]">
                    Formulario Digital de Familia
                  </h2>
                  <p className="text-xs text-[#7A6A63]">
                    Al guardar, el sistema calcula automáticamente qué niñeras encajan
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="p-2 rounded-xl bg-[#FAF2E8] text-[#6B5B55] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-extrabold text-[#6B5B55]">Apellido de la familia *</label>
                  <input
                    required
                    type="text"
                    value={form.apellido}
                    onChange={(e) => setForm({ ...form, apellido: e.target.value })}
                    placeholder="Ej: Familia López"
                    className="mt-1 w-full rounded-xl bg-[#FFFBF5] border border-[#E7D8C9] px-3.5 py-2 text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs font-extrabold text-[#6B5B55]">Madre / Padre contacto</label>
                  <input
                    type="text"
                    value={form.contacto}
                    onChange={(e) => setForm({ ...form, contacto: e.target.value })}
                    placeholder="Ej: Paula López"
                    className="mt-1 w-full rounded-xl bg-[#FFFBF5] border border-[#E7D8C9] px-3.5 py-2 text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs font-extrabold text-[#6B5B55]">Barrio / Zona</label>
                  <select
                    value={form.zona}
                    onChange={(e) => setForm({ ...form, zona: e.target.value })}
                    className="mt-1 w-full rounded-xl bg-[#FFFBF5] border border-[#E7D8C9] px-3 py-2 text-sm font-bold"
                  >
                    {ZONAS.map((z) => (
                      <option key={z}>{z}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-extrabold text-[#6B5B55]">Presupuesto tope (ARS/h)</label>
                  <input
                    type="number"
                    step={100}
                    value={form.presupuestoHora}
                    onChange={(e) => setForm({ ...form, presupuestoHora: e.target.value })}
                    className="mt-1 w-full rounded-xl bg-[#FFFBF5] border border-[#E7D8C9] px-3.5 py-2 text-sm font-bold tabular-nums"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-extrabold text-[#6B5B55]">Cantidad y edades de los niños *</label>
                  <input
                    required
                    type="text"
                    value={form.hijos}
                    onChange={(e) => setForm({ ...form, hijos: e.target.value })}
                    placeholder="Ej: León (1 año) y Sofía (4 años)"
                    className="mt-1 w-full rounded-xl bg-[#FFFBF5] border border-[#E7D8C9] px-3.5 py-2 text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs font-extrabold text-[#6B5B55]">Días y horarios</label>
                  <input
                    type="text"
                    value={form.diasHorario}
                    onChange={(e) => setForm({ ...form, diasHorario: e.target.value })}
                    className="mt-1 w-full rounded-xl bg-[#FFFBF5] border border-[#E7D8C9] px-3.5 py-2 text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs font-extrabold text-[#6B5B55]">Horas por semana</label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={form.horasSemanales}
                    onChange={(e) => setForm({ ...form, horasSemanales: e.target.value })}
                    className="mt-1 w-full rounded-xl bg-[#FFFBF5] border border-[#E7D8C9] px-3.5 py-2 text-sm font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#6B5B55]">Turnos necesarios</label>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {TURNOS.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => toggleMulti('turnosNecesarios', t)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition-colors cursor-pointer ${
                        form.turnosNecesarios.includes(t)
                          ? 'bg-[#EEF7FF] border-[#B2D9FE] text-[#1A4B7F]'
                          : 'bg-[#FFFBF5] border-[#E7D8C9] text-[#6B5B55]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#6B5B55]">Requisitos importantes</label>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {ESPECIALIDADES.map((esp) => (
                    <button
                      type="button"
                      key={esp}
                      onClick={() => toggleMulti('requisitos', esp)}
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        form.requisitos.includes(esp)
                          ? 'bg-[#DCF7EC] border-[#A5E8CC] text-[#145941]'
                          : 'bg-[#FFFBF5] border-[#E7D8C9] text-[#6B5B55]'
                      }`}
                    >
                      {esp}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#6B5B55]">Notas / Detalles del hogar</label>
                <textarea
                  rows={2}
                  value={form.notas}
                  onChange={(e) => setForm({ ...form, notas: e.target.value })}
                  placeholder="Alergias, mascotas, rutinas, horarios de siesta..."
                  className="mt-1 w-full rounded-xl bg-[#FFFBF5] border border-[#E7D8C9] px-3.5 py-2 text-sm font-semibold"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-2xl bg-[#FAF2E8] text-[#6B5B55] font-bold text-sm cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-2xl bg-[#2568AD] hover:bg-[#1D558F] text-white font-bold text-sm cursor-pointer"
                >
                  Guardar y buscar niñera
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
