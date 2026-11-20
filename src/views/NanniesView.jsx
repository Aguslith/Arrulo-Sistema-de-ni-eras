import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  UserPlus,
  ShieldCheck,
  MapPin,
  Star,
  Clock,
  CheckCircle2,
  XCircle,
  Link2,
  X,
  Phone,
  Mail,
  Zap,
} from 'lucide-react';
import { NannyAvatar } from '../components/PastelArtwork';
import { ZONAS, TURNOS, ESPECIALIDADES, formatARS } from '../data/mockData';

const EMPTY_FORM = {
  nombre: '',
  edad: 24,
  zona: 'Palermo',
  tarifaHora: 4600,
  experienciaAnios: 2,
  disponibilidad: ['Tarde'],
  especialidades: ['Primera infancia (1-4 años)'],
  disponibleSos: true,
  telefono: '',
  email: '',
  bio: '',
};

export default function NanniesView({ nannies, onAddNanny, onToggleVerification, showToast }) {
  const [search, setSearch] = useState('');
  const [zonaFilter, setZonaFilter] = useState('Todas');
  const [onlySos, setOnlySos] = useState(false);
  const [selectedNanny, setSelectedNanny] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const filtered = useMemo(() => {
    return nannies.filter((n) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        n.nombre.toLowerCase().includes(q) ||
        n.zona.toLowerCase().includes(q) ||
        n.especialidades.some((e) => e.toLowerCase().includes(q));
      const matchZona = zonaFilter === 'Todas' || n.zona === zonaFilter || n.barriosCercanos?.includes(zonaFilter);
      const matchSos = !onlySos || n.disponibleSos;
      return matchSearch && matchZona && matchSos;
    });
  }, [nannies, search, zonaFilter, onlySos]);

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
    if (!form.nombre.trim()) return;
    const themes = ['peach', 'mint', 'sky', 'lilac', 'butter'];
    const newNanny = {
      id: `n-${Date.now()}`,
      nombre: form.nombre.trim(),
      edad: Number(form.edad) || 24,
      zona: form.zona,
      barriosCercanos: [form.zona],
      tarifaHora: Number(form.tarifaHora) || 4500,
      experienciaAnios: Number(form.experienciaAnios) || 1,
      rating: 4.8,
      horasCompletadas: 0,
      disponibilidad: form.disponibilidad.length ? form.disponibilidad : ['Tarde'],
      especialidades: form.especialidades.length ? form.especialidades : ['Primera infancia (1-4 años)'],
      verificada: { dni: true, antecedentes: false, referencias: false, entrevista: false },
      disponibleSos: form.disponibleSos,
      bio: form.bio.trim() || 'Nueva postulante cargada en la base de datos Arrullo.',
      telefono: form.telefono.trim() || '+54 9 11 0000-0000',
      email: form.email.trim() || 'postulante@ejemplo.com',
      referenciaDestacada: 'Pendiente de validar referencias telefónicas.',
      avatarTheme: themes[nannies.length % themes.length],
      avatarVariant: nannies.length % 6,
      puntualidad: 100,
      estado: 'Disponible',
    };
    onAddNanny(newNanny);
    setForm(EMPTY_FORM);
    setShowAddModal(false);
  };

  const copyPublicLink = () => {
    navigator.clipboard?.writeText('https://arrullo.ar/postularme-ninera').catch(() => {});
    showToast('Enlace público de postulación copiado (las chicas se cargan solas a tu base)');
  };

  const currentSelected = selectedNanny
    ? nannies.find((n) => n.id === selectedNanny.id) || selectedNanny
    : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#2F2522]">
            Base de Datos de Niñeras
          </h1>
          <p className="text-sm text-[#6B5B55] mt-1">
            Perfiles verificados con disponibilidad, tarifas, referencias y aptitud para reemplazos SOS.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={copyPublicLink}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-[#FAF2E8] border border-[#E9DCD0] text-[#2F2522] text-xs sm:text-sm font-bold transition-colors cursor-pointer"
          >
            <Link2 className="w-4 h-4 text-[#5DA9F6]" />
            Link de postulación
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#1F7A5A] hover:bg-[#176348] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            Nueva niñera
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl border border-[#EFE4D8] p-4 pastel-shadow flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#8C7A72] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre, barrio o habilidad (ej: RCP, bebés, inglés)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FFFBF5] border border-[#EDE2D5] text-sm font-semibold text-[#2F2522] placeholder:text-[#96847B]"
          />
        </div>

        <select
          value={zonaFilter}
          onChange={(e) => setZonaFilter(e.target.value)}
          className="px-3.5 py-2.5 rounded-2xl bg-[#FFFBF5] border border-[#EDE2D5] text-sm font-bold text-[#2F2522] cursor-pointer"
        >
          <option value="Todas">Todas las zonas</option>
          {ZONAS.map((z) => (
            <option key={z} value={z}>
              {z}
            </option>
          ))}
        </select>

        <button
          onClick={() => setOnlySos((v) => !v)}
          className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-extrabold border transition-colors cursor-pointer ${
            onlySos
              ? 'bg-[#FEF1C3] border-[#F6D782] text-[#855706]'
              : 'bg-[#FFFBF5] border-[#EDE2D5] text-[#6B5B55] hover:bg-[#FAF2E8]'
          }`}
        >
          <Zap className="w-4 h-4" />
          Solo Backup SOS
        </button>
      </div>

      {/* Nannies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((nanny) => {
          const checksDone = Object.values(nanny.verificada).filter(Boolean).length;
          return (
            <motion.article
              key={nanny.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[26px] border border-[#EFE4D8] p-5 pastel-shadow hover:border-[#DFCBB8] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <NannyAvatar
                      name={nanny.nombre}
                      theme={nanny.avatarTheme}
                      variant={nanny.avatarVariant}
                      size={58}
                    />
                    <div>
                      <h2 className="font-display text-lg font-semibold text-[#2F2522] leading-tight">
                        {nanny.nombre}
                      </h2>
                      <div className="mt-1 flex items-center gap-2 text-xs font-bold text-[#6B5B55]">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#E56A50]" />
                          {nanny.zona}
                        </span>
                        <span>• {nanny.edad} años</span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full shrink-0 ${
                      nanny.estado === 'Disponible'
                        ? 'bg-[#DCF7EC] text-[#145941]'
                        : nanny.estado === 'Asignada'
                        ? 'bg-[#EEF7FF] text-[#1A4B7F]'
                        : 'bg-[#FFE3DC] text-[#9C3A26]'
                    }`}
                  >
                    {nanny.estado}
                  </span>
                </div>

                {/* Rating & Rate */}
                <div className="mt-4 flex items-center justify-between text-xs font-bold bg-[#FFFBF5] rounded-2xl px-3.5 py-2.5 border border-[#F3E9DD]">
                  <span className="inline-flex items-center gap-1 text-[#2F2522]">
                    <Star className="w-3.5 h-3.5 text-[#E5A124] fill-[#FDE084]" />
                    {nanny.rating}
                    <span className="text-[#7A6A63] font-semibold">
                      ({nanny.puntualidad}% puntual)
                    </span>
                  </span>
                  <span className="font-display text-sm font-semibold text-[#2F2522] tabular-nums">
                    {formatARS(nanny.tarifaHora)}/h
                  </span>
                </div>

                <p className="mt-3 text-xs text-[#6B5B55] leading-relaxed line-clamp-2">
                  {nanny.bio}
                </p>

                {/* Specialties */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {nanny.especialidades.slice(0, 3).map((esp) => (
                    <span
                      key={esp}
                      className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-[#FAF2E8] text-[#5C4B44]"
                    >
                      {esp}
                    </span>
                  ))}
                  {nanny.especialidades.length > 3 && (
                    <span className="text-[11px] font-bold px-2 py-1 rounded-xl bg-[#F5F1FF] text-[#5E3FA3]">
                      +{nanny.especialidades.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-3.5 border-t border-[#F3E9DD] flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <ShieldCheck
                    className={`w-4 h-4 ${
                      checksDone === 4 ? 'text-[#1F7A5A]' : 'text-[#E5A124]'
                    }`}
                  />
                  <span className="text-[#6B5B55]">{checksDone}/4 validaciones</span>
                </div>
                <button
                  onClick={() => setSelectedNanny(nanny)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#FFF3F0] hover:bg-[#FFE3DC] text-[#9C3A26] text-xs font-extrabold transition-colors cursor-pointer"
                >
                  Ver ficha completa
                </button>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Nanny Detail Slide-Over Drawer */}
      <AnimatePresence>
        {currentSelected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNanny(null)}
              className="fixed inset-0 bg-[#2F2522]/40 backdrop-blur-xs z-40"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 360, damping: 32 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#FFFBF5] border-l border-[#EFE4D8] z-50 overflow-y-auto p-6 pastel-shadow-lg space-y-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <NannyAvatar
                    name={currentSelected.nombre}
                    theme={currentSelected.avatarTheme}
                    variant={currentSelected.avatarVariant}
                    size={64}
                  />
                  <div>
                    <h2 className="font-display text-xl font-semibold text-[#2F2522]">
                      {currentSelected.nombre}
                    </h2>
                    <p className="text-xs font-bold text-[#6B5B55]">
                      {currentSelected.edad} años • {currentSelected.zona} •{' '}
                      {formatARS(currentSelected.tarifaHora)}/hora
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedNanny(null)}
                  className="p-2 rounded-xl bg-white border border-[#EFE4D8] text-[#6B5B55] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm text-[#4D3F3A] bg-white rounded-2xl p-4 border border-[#EFE4D8]">
                {currentSelected.bio}
              </p>

              {/* Interactive Verification Checklist */}
              <div className="bg-white rounded-2xl p-4 border border-[#EFE4D8] space-y-3">
                <h3 className="font-display text-base font-semibold text-[#2F2522]">
                  Validación de Seguridad (clic para marcar)
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: 'dni', label: 'DNI verificado' },
                    { key: 'antecedentes', label: 'Antecedentes OK' },
                    { key: 'referencias', label: 'Referencias llamadas' },
                    { key: 'entrevista', label: 'Entrevista filtro' },
                  ].map((item) => {
                    const checked = currentSelected.verificada[item.key];
                    return (
                      <button
                        key={item.key}
                        onClick={() => onToggleVerification(currentSelected.id, item.key)}
                        className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-extrabold border text-left transition-colors cursor-pointer ${
                          checked
                            ? 'bg-[#EDFBF5] border-[#A5E8CC] text-[#145941]'
                            : 'bg-[#FFF3F0] border-[#FFC5B8] text-[#9C3A26]'
                        }`}
                      >
                        {checked ? (
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 shrink-0" />
                        )}
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Availability & Contact */}
              <div className="bg-white rounded-2xl p-4 border border-[#EFE4D8] space-y-3 text-xs">
                <div className="flex items-center gap-2 font-bold text-[#2F2522]">
                  <Clock className="w-4 h-4 text-[#5DA9F6]" />
                  Turnos: {currentSelected.disponibilidad.join(' • ')}
                </div>
                <div className="flex items-center gap-2 font-bold text-[#2F2522]">
                  <Phone className="w-4 h-4 text-[#1F7A5A]" />
                  {currentSelected.telefono}
                </div>
                <div className="flex items-center gap-2 font-bold text-[#2F2522]">
                  <Mail className="w-4 h-4 text-[#9F7AEA]" />
                  {currentSelected.email}
                </div>
              </div>

              <div className="rounded-2xl bg-[#EEF7FF] border border-[#D4E8FF] p-4">
                <div className="text-xs font-extrabold text-[#1A4B7F]">Referencia destacada</div>
                <p className="mt-1 text-xs text-[#2B537E] italic">
                  {currentSelected.referenciaDestacada}
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Add Nanny Modal */}
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
                <h2 className="font-display text-xl font-semibold text-[#2F2522]">
                  Postular / Cargar Niñera
                </h2>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="p-2 rounded-xl bg-[#FAF2E8] text-[#6B5B55] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-xs font-extrabold text-[#6B5B55]">Nombre y apellido *</label>
                  <input
                    required
                    type="text"
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    placeholder="Ej: Milagros Romero"
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
                  <label className="text-xs font-extrabold text-[#6B5B55]">Tarifa pretendida (ARS/h)</label>
                  <input
                    type="number"
                    step={100}
                    value={form.tarifaHora}
                    onChange={(e) => setForm({ ...form, tarifaHora: e.target.value })}
                    className="mt-1 w-full rounded-xl bg-[#FFFBF5] border border-[#E7D8C9] px-3.5 py-2 text-sm font-bold tabular-nums"
                  />
                </div>
                <div>
                  <label className="text-xs font-extrabold text-[#6B5B55]">Edad</label>
                  <input
                    type="number"
                    min={18}
                    max={65}
                    value={form.edad}
                    onChange={(e) => setForm({ ...form, edad: e.target.value })}
                    className="mt-1 w-full rounded-xl bg-[#FFFBF5] border border-[#E7D8C9] px-3.5 py-2 text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-extrabold text-[#6B5B55]">Años de experiencia</label>
                  <input
                    type="number"
                    min={0}
                    max={30}
                    value={form.experienciaAnios}
                    onChange={(e) => setForm({ ...form, experienciaAnios: e.target.value })}
                    className="mt-1 w-full rounded-xl bg-[#FFFBF5] border border-[#E7D8C9] px-3.5 py-2 text-sm font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#6B5B55]">Disponibilidad horaria</label>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {TURNOS.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => toggleMulti('disponibilidad', t)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition-colors cursor-pointer ${
                        form.disponibilidad.includes(t)
                          ? 'bg-[#DCF7EC] border-[#A5E8CC] text-[#145941]'
                          : 'bg-[#FFFBF5] border-[#E7D8C9] text-[#6B5B55]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#6B5B55]">Especialidades y habilidades</label>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {ESPECIALIDADES.map((esp) => (
                    <button
                      type="button"
                      key={esp}
                      onClick={() => toggleMulti('especialidades', esp)}
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        form.especialidades.includes(esp)
                          ? 'bg-[#ECE4FF] border-[#D2BFFF] text-[#462B80]'
                          : 'bg-[#FFFBF5] border-[#E7D8C9] text-[#6B5B55]'
                      }`}
                    >
                      {esp}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#6B5B55]">Presentación breve</label>
                <textarea
                  rows={2}
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  placeholder="Contá estudios, experiencia con bebés/niños y estilo de cuidado..."
                  className="mt-1 w-full rounded-xl bg-[#FFFBF5] border border-[#E7D8C9] px-3.5 py-2 text-sm font-semibold"
                />
              </div>

              <label className="flex items-center gap-2.5 text-xs font-extrabold text-[#855706] bg-[#FFFBEB] border border-[#F9E39E] rounded-xl p-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.disponibleSos}
                  onChange={(e) => setForm({ ...form, disponibleSos: e.target.checked })}
                  className="accent-[#E56A50] w-4 h-4"
                />
                Disponible para reemplazos rápidos (Plan B SOS)
              </label>

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
                  className="px-5 py-2.5 rounded-2xl bg-[#1F7A5A] hover:bg-[#176348] text-white font-bold text-sm cursor-pointer"
                >
                  Guardar en base de datos
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
