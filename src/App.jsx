import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/Layout';
import DashboardView from './views/DashboardView';
import MatchView from './views/MatchView';
import NanniesView from './views/NanniesView';
import FamiliesView from './views/FamiliesView';
import InterviewsView from './views/InterviewsView';
import BillingView from './views/BillingView';
import ModerationView from './views/ModerationView';
import GuideView from './views/GuideView';
import {
  INITIAL_NANNIES,
  INITIAL_FAMILIES,
  INITIAL_INTERVIEWS,
  INITIAL_BILLING,
  INITIAL_TICKETS,
} from './data/mockData';

const STORAGE_KEY = 'arrullo_state_v1';

function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.nannies && parsed.families) return parsed;
    }
  } catch {
    // fallback to defaults
  }
  return {
    nannies: INITIAL_NANNIES,
    families: INITIAL_FAMILIES,
    interviews: INITIAL_INTERVIEWS,
    billing: INITIAL_BILLING,
    tickets: INITIAL_TICKETS,
  };
}

export default function App() {
  const [data, setData] = useState(loadInitialState);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedFamilyId, setSelectedFamilyId] = useState(
    () => loadInitialState().families[0]?.id || 'f-1'
  );
  const [initialSosInterview, setInitialSosInterview] = useState(null);
  const [toast, setToast] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore storage quota issues
    }
  }, [data]);

  const showToast = useCallback((message) => {
    setToast(message);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 3600);
    return () => clearTimeout(t);
  }, [toast]);

  const handleResetDemo = () => {
    const fresh = {
      nannies: INITIAL_NANNIES,
      families: INITIAL_FAMILIES,
      interviews: INITIAL_INTERVIEWS,
      billing: INITIAL_BILLING,
      tickets: INITIAL_TICKETS,
    };
    setData(fresh);
    setSelectedFamilyId(fresh.families[0].id);
    localStorage.removeItem(STORAGE_KEY);
    showToast('Datos de demostración restaurados correctamente');
  };

  // Actions
  const handleAddNanny = (newNanny) => {
    setData((prev) => ({ ...prev, nannies: [newNanny, ...prev.nannies] }));
    showToast(`${newNanny.nombre} sumada a la base de datos de niñeras`);
  };

  const handleToggleVerification = (nannyId, field) => {
    setData((prev) => ({
      ...prev,
      nannies: prev.nannies.map((n) =>
        n.id === nannyId
          ? { ...n, verificada: { ...n.verificada, [field]: !n.verificada[field] } }
          : n
      ),
    }));
    showToast('Estado de verificación actualizado');
  };

  const handleAddFamily = (newFamily) => {
    setData((prev) => ({ ...prev, families: [newFamily, ...prev.families] }));
    setSelectedFamilyId(newFamily.id);
    showToast(`${newFamily.apellido} cargada — ¡ya podés buscarle Match!`);
  };

  const handleOpenMatchForFamily = (familyId) => {
    setSelectedFamilyId(familyId);
    setActiveTab('match');
  };

  const handleCreateInterviewFromMatch = ({ familyId, nannyId, fecha, hora, matchScore }) => {
    const family = data.families.find((f) => f.id === familyId);
    const nanny = data.nannies.find((n) => n.id === nannyId);
    const slug = (family?.apellido || 'sala').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newIv = {
      id: `int-${Date.now()}`,
      familyId,
      nannyId,
      fecha,
      hora,
      link: `https://meet.arrullo.ar/${slug}-${Math.floor(100 + Math.random() * 899)}`,
      confirmacionFamilia: 'Confirmada',
      confirmacionNinera: 'Confirmada',
      estado: 'Programada',
      notas: `Match automático del ${matchScore}%. Videollamada agendada desde Match Mágico.`,
      checklist: { puntualidad: false, experiencia: false, disponibilidad: false, quimica: false },
    };

    setData((prev) => ({
      ...prev,
      interviews: [newIv, ...prev.interviews],
      families: prev.families.map((f) =>
        f.id === familyId ? { ...f, estado: 'En Entrevista', nineraAsignadaId: nannyId } : f
      ),
    }));
    showToast(
      `¡Videollamada agendada! ${family?.apellido} × ${nanny?.nombre} (${fecha} ${hora})`
    );
    setActiveTab('interviews');
  };

  const handleTriggerSosForInterview = (interview) => {
    setInitialSosInterview(interview);
    setActiveTab('interviews');
  };

  const handleReplaceNannySos = (interviewId, newNannyId) => {
    const newNanny = data.nannies.find((n) => n.id === newNannyId);
    const targetIv = data.interviews.find((i) => i.id === interviewId);
    setData((prev) => ({
      ...prev,
      interviews: prev.interviews.map((iv) =>
        iv.id === interviewId
          ? {
              ...iv,
              nannyId: newNannyId,
              confirmacionNinera: 'Confirmada (Plan B SOS)',
              estado: 'Lista',
              notas: `Reemplazo SOS activado: ${newNanny?.nombre} tomó el lugar y confirmó asistencia virtual.`,
            }
          : iv
      ),
      families: prev.families.map((f) =>
        f.id === targetIv?.familyId
          ? { ...f, estado: 'En Entrevista', nineraAsignadaId: newNannyId }
          : f
      ),
    }));
    showToast(`¡Reemplazo SOS exitoso! ${newNanny?.nombre} asignada a la entrevista`);
  };

  const handleUpdateInterview = (interviewId, patch) => {
    setData((prev) => ({
      ...prev,
      interviews: prev.interviews.map((iv) => (iv.id === interviewId ? { ...iv, ...patch } : iv)),
    }));
  };

  const handleApproveInterview = (interviewId, notes) => {
    const iv = data.interviews.find((i) => i.id === interviewId);
    if (!iv) return;
    const nanny = data.nannies.find((n) => n.id === iv.nannyId);
    const family = data.families.find((f) => f.id === iv.familyId);

    setData((prev) => ({
      ...prev,
      interviews: prev.interviews.map((item) =>
        item.id === interviewId ? { ...item, estado: 'Completada', notas: notes } : item
      ),
      families: prev.families.map((f) =>
        f.id === iv.familyId ? { ...f, estado: 'Activa', nineraAsignadaId: iv.nannyId } : f
      ),
      nannies: prev.nannies.map((n) =>
        n.id === iv.nannyId ? { ...n, estado: 'Asignada' } : n
      ),
    }));
    showToast(`¡${nanny?.nombre} aprobada y asignada a ${family?.apellido}!`);
  };

  const handleToggleBillingStatus = (billingId, field) => {
    setData((prev) => ({
      ...prev,
      billing: prev.billing.map((b) => {
        if (b.id !== billingId) return b;
        if (field === 'estadoFamilia') {
          const next = b.estadoFamilia === 'Pagado' ? 'Pendiente' : 'Pagado';
          return { ...b, estadoFamilia: next };
        }
        const next = b.estadoNinera === 'Transferido' ? 'Por transferir' : 'Transferido';
        return { ...b, estadoNinera: next };
      }),
    }));
    showToast('Estado de cobro/transferencia actualizado');
  };

  const handleAddBillingRecord = (record) => {
    setData((prev) => ({ ...prev, billing: [record, ...prev.billing] }));
    showToast(`Liquidación ${record.comprobanteNro} registrada`);
  };

  const handleReplyTicket = (ticketId, text) => {
    setData((prev) => ({
      ...prev,
      tickets: prev.tickets.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              estado: t.estado === 'Abierto' ? 'En revisión' : t.estado,
              mensajes: [
                ...t.mensajes,
                { autor: 'Coordinación Arrullo', rol: 'admin', fecha: 'Ahora', texto: text },
              ],
            }
          : t
      ),
    }));
    showToast('Respuesta enviada por email y guardada en el historial');
  };

  const handleChangeTicketStatus = (ticketId, estado) => {
    setData((prev) => ({
      ...prev,
      tickets: prev.tickets.map((t) => (t.id === ticketId ? { ...t, estado } : t)),
    }));
    showToast(`Incidencia marcada como "${estado}"`);
  };

  const handleAddTicket = (ticket) => {
    setData((prev) => ({ ...prev, tickets: [ticket, ...prev.tickets] }));
    showToast('Nueva incidencia registrada en la bandeja de moderación');
  };

  const badges = {
    interviews: data.interviews.filter((i) => i.estado === 'En riesgo').length,
    moderation: data.tickets.filter((t) => t.estado !== 'Resuelto').length,
    families: data.families.filter((f) => f.estado === 'Buscando' || f.estado === 'Reemplazo SOS')
      .length,
  };

  return (
    <Layout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      badges={badges}
      onResetDemo={handleResetDemo}
      toast={toast}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {activeTab === 'dashboard' && (
            <DashboardView
              nannies={data.nannies}
              families={data.families}
              interviews={data.interviews}
              billing={data.billing}
              tickets={data.tickets}
              onNavigate={setActiveTab}
              onOpenMatchForFamily={handleOpenMatchForFamily}
              onTriggerSosForInterview={handleTriggerSosForInterview}
            />
          )}

          {activeTab === 'match' && (
            <MatchView
              nannies={data.nannies}
              families={data.families}
              selectedFamilyId={selectedFamilyId}
              onSelectFamily={setSelectedFamilyId}
              onCreateInterviewFromMatch={handleCreateInterviewFromMatch}
              showToast={showToast}
            />
          )}

          {activeTab === 'nannies' && (
            <NanniesView
              nannies={data.nannies}
              onAddNanny={handleAddNanny}
              onToggleVerification={handleToggleVerification}
              showToast={showToast}
            />
          )}

          {activeTab === 'families' && (
            <FamiliesView
              families={data.families}
              nannies={data.nannies}
              onAddFamily={handleAddFamily}
              onOpenMatchForFamily={handleOpenMatchForFamily}
              showToast={showToast}
            />
          )}

          {activeTab === 'interviews' && (
            <InterviewsView
              interviews={data.interviews}
              families={data.families}
              nannies={data.nannies}
              initialSosInterview={initialSosInterview}
              onClearInitialSos={() => setInitialSosInterview(null)}
              onReplaceNannySos={handleReplaceNannySos}
              onUpdateInterview={handleUpdateInterview}
              onApproveInterview={handleApproveInterview}
              showToast={showToast}
            />
          )}

          {activeTab === 'billing' && (
            <BillingView
              billing={data.billing}
              families={data.families}
              nannies={data.nannies}
              onToggleBillingStatus={handleToggleBillingStatus}
              onAddBillingRecord={handleAddBillingRecord}
              showToast={showToast}
            />
          )}

          {activeTab === 'moderation' && (
            <ModerationView
              tickets={data.tickets}
              onReplyTicket={handleReplyTicket}
              onChangeTicketStatus={handleChangeTicketStatus}
              onAddTicket={handleAddTicket}
            />
          )}

          {activeTab === 'guide' && <GuideView onNavigate={setActiveTab} />}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}
