import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Send,
  Plus,
  CheckCircle2,
  AlertCircle,
  Clock,
  X,
  Sparkles,
} from 'lucide-react';

const REPLY_TEMPLATES = [
  {
    label: 'Disculpa + Reemplazo SOS',
    text: 'Hola! Lamentamos mucho el inconveniente. Ya activamos nuestro protocolo de Reemplazo SOS y en los próximos 20 minutos te enviamos 2 perfiles verificados disponibles en tu zona para reprogramar la entrevista virtual hoy mismo.',
  },
  {
    label: 'Confirmar transferencia',
    text: '¡Hola! Te confirmamos que la liquidación ya fue verificada y el comprobante de transferencia se envía hoy antes de las 17:00 hs a tu correo registrado. Cualquier duda respondé este mail.',
  },
  {
    label: 'Advertencia puntualidad',
    text: 'Hola! Registramos una demora/inasistencia en la entrevista coordinada. Recordá que confirmar 2 horas antes es clave para mantener tu perfil activo en la prioridad de Match. Contanos si ocurrió algún imprevisto.',
  },
];

export default function ModerationView({
  tickets,
  onReplyTicket,
  onChangeTicketStatus,
  onAddTicket,
}) {
  const [selectedId, setSelectedId] = useState(tickets[0]?.id || null);
  const [filter, setFilter] = useState('Todos');
  const [replyText, setReplyText] = useState('');
  const [showNewModal, setShowNewModal] = useState(false);
  const [newTicket, setNewTicket] = useState({
    asunto: '',
    categoria: 'Inasistencia / Cancelación',
    prioridad: 'Alta',
    reportadoPor: '',
    tipoRemitente: 'Familia',
    emailRemitente: '',
    mensaje: '',
  });

  const filtered = tickets.filter((t) => filter === 'Todos' || t.estado === filter);
  const selected = tickets.find((t) => t.id === selectedId) || filtered[0] || null;

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!selected || !replyText.trim()) return;
    onReplyTicket(selected.id, replyText.trim());
    setReplyText('');
  };

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!newTicket.asunto.trim() || !newTicket.mensaje.trim()) return;
    const created = {
      id: `t-${Date.now()}`,
      asunto: newTicket.asunto.trim(),
      categoria: newTicket.categoria,
      prioridad: newTicket.prioridad,
      estado: 'Abierto',
      reportadoPor: newTicket.reportadoPor.trim() || 'Usuario',
      tipoRemitente: newTicket.tipoRemitente,
      emailRemitente: newTicket.emailRemitente.trim() || 'contacto@ejemplo.com',
      fecha: 'Ahora',
      mensajes: [
        {
          autor: `${newTicket.reportadoPor.trim() || 'Usuario'} (${newTicket.tipoRemitente})`,
          rol: 'externo',
          fecha: 'Ahora',
          texto: newTicket.mensaje.trim(),
        },
      ],
    };
    onAddTicket(created);
    setSelectedId(created.id);
    setShowNewModal(false);
    setNewTicket({
      asunto: '',
      categoria: 'Inasistencia / Cancelación',
      prioridad: 'Alta',
      reportadoPor: '',
      tipoRemitente: 'Familia',
      emailRemitente: '',
      mensaje: '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#2F2522]">
            Moderación de Quejas y Soporte
          </h1>
          <p className="text-sm text-[#6B5B55] mt-1">
            Centralizá reclamos de familias y niñeras en una bandeja ordenada con respuestas rápidas por email.
          </p>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#E56A50] hover:bg-[#D55A40] text-white text-xs sm:text-sm font-bold transition-colors self-start cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Registrar incidencia
        </button>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {['Todos', 'Abierto', 'En revisión', 'Resuelto'].map((st) => (
          <button
            key={st}
            onClick={() => setFilter(st)}
            className={`px-3.5 py-2 rounded-2xl text-xs font-extrabold transition-colors cursor-pointer ${
              filter === st
                ? 'bg-[#2F2522] text-[#FFFBF5]'
                : 'bg-white border border-[#EFE4D8] text-[#6B5B55] hover:bg-[#FAF2E8]'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Split Inbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Ticket List */}
        <div className="lg:col-span-5 space-y-2.5">
          {filtered.map((t) => {
            const isSelected = selected?.id === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedId(t.id)}
                className={`w-full text-left rounded-[22px] border p-4 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#FFF5F2] border-[#F4866E] pastel-shadow'
                    : 'bg-white border-[#EFE4D8] hover:border-[#DFCBB8]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      t.prioridad === 'Alta'
                        ? 'bg-[#FFE3DC] text-[#9C3A26]'
                        : t.prioridad === 'Media'
                        ? 'bg-[#FEF1C3] text-[#855706]'
                        : 'bg-[#EEF7FF] text-[#1A4B7F]'
                    }`}
                  >
                    Prioridad {t.prioridad}
                  </span>
                  <span className="text-[11px] font-bold text-[#7A6A63]">{t.fecha}</span>
                </div>
                <h2 className="mt-2 font-display text-sm sm:text-base font-semibold text-[#2F2522] leading-snug">
                  {t.asunto}
                </h2>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#6B5B55]">
                    {t.reportadoPor} • {t.tipoRemitente}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 font-extrabold text-[11px] ${
                      t.estado === 'Resuelto'
                        ? 'text-[#145941]'
                        : t.estado === 'Abierto'
                        ? 'text-[#9C3A26]'
                        : 'text-[#855706]'
                    }`}
                  >
                    {t.estado === 'Resuelto' ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : t.estado === 'Abierto' ? (
                      <AlertCircle className="w-3.5 h-3.5" />
                    ) : (
                      <Clock className="w-3.5 h-3.5" />
                    )}
                    {t.estado}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Conversation Thread & Email Composer */}
        <div className="lg:col-span-7 bg-white rounded-[26px] border border-[#EFE4D8] p-5 sm:p-6 pastel-shadow">
          {selected ? (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-[#F2E6DA]">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#7A6A63]">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FAF2E8] text-[#2F2522]">
                      {selected.categoria}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-[#5DA9F6]" />
                      {selected.emailRemitente}
                    </span>
                  </div>
                  <h2 className="mt-2 font-display text-xl font-semibold text-[#2F2522]">
                    {selected.asunto}
                  </h2>
                </div>

                <select
                  value={selected.estado}
                  onChange={(e) => onChangeTicketStatus(selected.id, e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#FFFBF5] border border-[#E7D8C9] text-xs font-extrabold text-[#2F2522] self-start cursor-pointer"
                >
                  <option>Abierto</option>
                  <option>En revisión</option>
                  <option>Resuelto</option>
                </select>
              </div>

              {/* Messages */}
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {selected.mensajes.map((m, idx) => (
                  <div
                    key={idx}
                    className={`rounded-2xl p-4 text-sm leading-relaxed ${
                      m.rol === 'admin'
                        ? 'bg-[#EDFBF5] border border-[#C6EEDD] ml-6'
                        : 'bg-[#FFFBF5] border border-[#EFE4D8] mr-6'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-extrabold mb-1">
                      <span className={m.rol === 'admin' ? 'text-[#145941]' : 'text-[#2F2522]'}>
                        {m.autor}
                      </span>
                      <span className="text-[#7A6A63] font-semibold">{m.fecha}</span>
                    </div>
                    <p className="text-[#4D3F3A] text-xs sm:text-sm">{m.texto}</p>
                  </div>
                ))}
              </div>

              {/* Quick Templates */}
              <div className="space-y-2 pt-2 border-t border-[#F2E6DA]">
                <div className="text-xs font-extrabold text-[#462B80] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#9F7AEA]" />
                  Plantillas rápidas de respuesta por correo:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {REPLY_TEMPLATES.map((tpl) => (
                    <button
                      key={tpl.label}
                      type="button"
                      onClick={() => setReplyText(tpl.text)}
                      className="px-3 py-1.5 rounded-xl bg-[#F5F1FF] hover:bg-[#ECE4FF] text-[#462B80] text-xs font-bold transition-colors cursor-pointer"
                    >
                      {tpl.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reply Box */}
              <form onSubmit={handleSendReply} className="space-y-2.5">
                <textarea
                  rows={3}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Responder por mail a ${selected.emailRemitente}...`}
                  className="w-full rounded-2xl bg-[#FFFBF5] border border-[#E7D8C9] p-3.5 text-sm font-semibold text-[#2F2522] placeholder:text-[#96847B]"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#2F2522] hover:bg-[#443530] text-white text-xs sm:text-sm font-extrabold transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    Enviar respuesta por Email
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="py-12 text-center text-sm font-semibold text-[#7A6A63]">
              Seleccioná una incidencia para moderar y responder por mail.
            </div>
          )}
        </div>
      </div>

      {/* New Ticket Modal */}
      <AnimatePresence>
        {showNewModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#2F2522]/45 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setShowNewModal(false)}
          >
            <motion.form
              initial={{ scale: 0.92, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleCreateTicket}
              className="w-full max-w-md bg-white rounded-[28px] border border-[#EFE4D8] p-6 pastel-shadow-lg space-y-3.5"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold text-[#2F2522]">
                  Registrar Queja o Consulta
                </h2>
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="p-2 rounded-xl bg-[#FAF2E8] text-[#6B5B55] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#6B5B55]">Asunto *</label>
                <input
                  required
                  type="text"
                  value={newTicket.asunto}
                  onChange={(e) => setNewTicket({ ...newTicket, asunto: e.target.value })}
                  placeholder="Ej: Demora en llegada del martes"
                  className="mt-1 w-full rounded-xl bg-[#FFFBF5] border border-[#E7D8C9] px-3 py-2 text-sm font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-extrabold text-[#6B5B55]">Remitente</label>
                  <input
                    type="text"
                    value={newTicket.reportadoPor}
                    onChange={(e) => setNewTicket({ ...newTicket, reportadoPor: e.target.value })}
                    placeholder="Nombre o Familia"
                    className="mt-1 w-full rounded-xl bg-[#FFFBF5] border border-[#E7D8C9] px-3 py-2 text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs font-extrabold text-[#6B5B55]">Tipo</label>
                  <select
                    value={newTicket.tipoRemitente}
                    onChange={(e) => setNewTicket({ ...newTicket, tipoRemitente: e.target.value })}
                    className="mt-1 w-full rounded-xl bg-[#FFFBF5] border border-[#E7D8C9] px-3 py-2 text-sm font-bold"
                  >
                    <option>Familia</option>
                    <option>Niñera</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-extrabold text-[#6B5B55]">Categoría</label>
                  <select
                    value={newTicket.categoria}
                    onChange={(e) => setNewTicket({ ...newTicket, categoria: e.target.value })}
                    className="mt-1 w-full rounded-xl bg-[#FFFBF5] border border-[#E7D8C9] px-3 py-2 text-xs font-bold"
                  >
                    <option>Inasistencia / Cancelación</option>
                    <option>Pagos y Liquidación</option>
                    <option>Trato / Cuidado</option>
                    <option>Coordinación de Turnos</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-extrabold text-[#6B5B55]">Prioridad</label>
                  <select
                    value={newTicket.prioridad}
                    onChange={(e) => setNewTicket({ ...newTicket, prioridad: e.target.value })}
                    className="mt-1 w-full rounded-xl bg-[#FFFBF5] border border-[#E7D8C9] px-3 py-2 text-xs font-bold"
                  >
                    <option>Alta</option>
                    <option>Media</option>
                    <option>Baja</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#6B5B55]">Detalle del reclamo *</label>
                <textarea
                  required
                  rows={3}
                  value={newTicket.mensaje}
                  onChange={(e) => setNewTicket({ ...newTicket, mensaje: e.target.value })}
                  className="mt-1 w-full rounded-xl bg-[#FFFBF5] border border-[#E7D8C9] p-3 text-sm font-semibold"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 rounded-2xl bg-[#FAF2E8] text-[#6B5B55] font-bold text-sm cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-2xl bg-[#E56A50] text-white font-bold text-sm cursor-pointer"
                >
                  Guardar ticket
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
