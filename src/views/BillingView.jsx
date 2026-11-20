import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Receipt,
  Calculator,
  CheckCircle2,
  Clock,
  Plus,
  FileText,
  AlertTriangle,
  Sparkles,
  ArrowRightLeft,
  X,
  Printer,
  TrendingUp,
} from 'lucide-react';
import { formatARS } from '../data/mockData';
import { ArrulloLogo } from '../components/PastelArtwork';

export default function BillingView({
  billing,
  families,
  nannies,
  onToggleBillingStatus,
  onAddBillingRecord,
  showToast,
}) {
  const [subTab, setSubTab] = useState('ledger'); // 'ledger' | 'simulator'
  const [receiptItem, setReceiptItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New shift form
  const [newRecord, setNewRecord] = useState({
    familyId: families[0]?.id || '',
    nannyId: nannies[0]?.id || '',
    periodo: 'Semana 18–22 Nov',
    horas: 15,
    tarifaNinera: 4800,
    comisionAgenciaPorHora: 750,
    metodoPago: 'Split Mercado Pago',
  });

  // Profitability Simulator state (tailored to her audio!)
  const [simFamilias, setSimFamilias] = useState(12);
  const [simHorasSem, setSimHorasSem] = useState(16);
  const [simTarifaHora, setSimTarifaHora] = useState(4800);
  const [simComisionActual, setSimComisionActual] = useState(150);

  const totalCobradoFamilias = billing.reduce(
    (acc, b) => acc + b.horas * (b.tarifaNinera + b.comisionAgenciaPorHora),
    0
  );
  const totalParaNineras = billing.reduce((acc, b) => acc + b.horas * b.tarifaNinera, 0);
  const totalTuComision = billing.reduce((acc, b) => acc + b.horas * b.comisionAgenciaPorHora, 0);

  // Simulator calculations (monthly = 4.2 weeks)
  const horasMesTotales = Math.round(simFamilias * simHorasSem * 4.2);
  const volumenBrutoMes = horasMesTotales * simTarifaHora;

  const modelosSimulados = [
    {
      id: 'actual',
      nombre: 'Tu modelo actual',
      badge: 'Riesgo de pérdida',
      tone: 'peach',
      descripcion: `Cobrando solo ${formatARS(simComisionActual)}/hora fija. No cubre entrevistas fallidas, tiempo ni impuestos.`,
      ingresoMensual: horasMesTotales * simComisionActual,
      detalle: `${horasMesTotales} hs/mes × ${formatARS(simComisionActual)}`,
      facturableArca: horasMesTotales * simComisionActual,
      nota: 'Con este margen, si perdés 3 horas en una entrevista que falla, trabajaste gratis toda la semana.',
    },
    {
      id: 'comision15',
      nombre: 'Comisión 15% + Split',
      badge: 'Escalable',
      tone: 'sky',
      descripcion: 'La familia paga con Split de pago: 85% va directo a la niñera y 15% a tu cuenta (facturás solo tu 15%).',
      ingresoMensual: Math.round(volumenBrutoMes * 0.15),
      detalle: `15% sobre ${formatARS(volumenBrutoMes)} (${formatARS(Math.round(simTarifaHora * 0.15))}/h)`,
      facturableArca: Math.round(volumenBrutoMes * 0.15),
      nota: 'Al usar Split o mandato, ARCA (ex-AFIP) solo te computa tu comisión real y no te sube de categoría en Monotributo.',
    },
    {
      id: 'hibrido',
      nombre: 'Híbrido: Membresía + 10%',
      badge: 'Recomendado',
      tone: 'mint',
      descripcion: 'Abono mensual accesible por familia ($18.000/mes por garantía SOS y soporte) + 10% por hora coordinada.',
      ingresoMensual: simFamilias * 18000 + Math.round(volumenBrutoMes * 0.1),
      detalle: `${simFamilias} membresías + 10% gestión`,
      facturableArca: simFamilias * 18000 + Math.round(volumenBrutoMes * 0.1),
      nota: 'Genera ingresos fijos previsibles y evita el "puenteo": la familia paga el abono para tener reemplazo SOS ilimitado.',
    },
    {
      id: 'placement',
      nombre: 'Fee de Búsqueda (1 pago)',
      badge: 'Cero intermediación',
      tone: 'lilac',
      descripcion: 'Cobrás un arancel único de selección (ej. 35% del 1er mes) por cada nueva familia colocada + garantía 30 días.',
      ingresoMensual: Math.round(Math.max(2, simFamilias * 0.35) * (simHorasSem * 4.2 * simTarifaHora * 0.35)),
      detalle: `Est. ${Math.max(2, Math.round(simFamilias * 0.35))} búsquedas cerradas/mes`,
      facturableArca: Math.round(Math.max(2, simFamilias * 0.35) * (simHorasSem * 4.2 * simTarifaHora * 0.35)),
      nota: 'La familia le paga directo a la niñera todos los meses. Vos NO tocás plata de terceros ni liquidás horas.',
    },
  ];

  const handleAddSubmit = (e) => {
    e.preventDefault();
    onAddBillingRecord({
      id: `b-${Date.now()}`,
      ...newRecord,
      horas: Number(newRecord.horas) || 10,
      tarifaNinera: Number(newRecord.tarifaNinera) || 4800,
      comisionAgenciaPorHora: Number(newRecord.comisionAgenciaPorHora) || 750,
      modelo: 'Gestión Arrullo',
      estadoFamilia: 'Pendiente',
      estadoNinera: 'Por transferir',
      comprobanteNro: `AR-2026-0${145 + billing.length}`,
      fechaPago: 'Pendiente',
    });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header + Sub-tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#2F2522]">
            Cobros, Pagos y Facturación
          </h1>
          <p className="text-sm text-[#6B5B55] mt-1">
            Controlá lo que te abonan las familias, transferí a las niñeras y simulá cómo cobrar de forma rentable.
          </p>
        </div>

        <div className="inline-flex p-1.5 rounded-2xl bg-[#F4EAE0] border border-[#E9DCD0] self-start">
          <button
            onClick={() => setSubTab('ledger')}
            className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-colors cursor-pointer ${
              subTab === 'ledger' ? 'text-[#145941]' : 'text-[#6B5B55]'
            }`}
          >
            {subTab === 'ledger' && (
              <motion.span
                layoutId="billing-subtab"
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                className="absolute inset-0 bg-white rounded-xl shadow-xs"
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Receipt className="w-4 h-4 text-[#1F7A5A]" />
              Control de Pagos
            </span>
          </button>

          <button
            onClick={() => setSubTab('simulator')}
            className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-colors cursor-pointer ${
              subTab === 'simulator' ? 'text-[#9C3A26]' : 'text-[#6B5B55]'
            }`}
          >
            {subTab === 'simulator' && (
              <motion.span
                layoutId="billing-subtab"
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                className="absolute inset-0 bg-white rounded-xl shadow-xs"
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-[#E56A50]" />
              Simulador de Tarifas y ARCA
            </span>
          </button>
        </div>
      </div>

      {subTab === 'ledger' ? (
        <div className="space-y-6">
          {/* Financial Flow Strip: Family -> Split -> Nanny + Agency */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-[24px] bg-[#EEF7FF] border border-[#CEE4FF] p-5">
              <div className="text-xs font-extrabold text-[#1A4B7F]">
                1. Total facturado a Familias
              </div>
              <div className="mt-1.5 font-display text-2xl sm:text-3xl font-semibold text-[#1A4B7F] tabular-nums">
                {formatARS(totalCobradoFamilias)}
              </div>
              <p className="mt-1 text-xs font-semibold text-[#3B6A9C]">
                Incluye honorarios de niñeras + comisión de agencia
              </p>
            </div>

            <div className="rounded-[24px] bg-[#FFFBF5] border border-[#EBDCCB] p-5">
              <div className="text-xs font-extrabold text-[#6B5B55] flex items-center gap-1.5">
                <ArrowRightLeft className="w-3.5 h-3.5 text-[#E56A50]" />
                2. Fondos de Niñeras (Terceros)
              </div>
              <div className="mt-1.5 font-display text-2xl sm:text-3xl font-semibold text-[#2F2522] tabular-nums">
                {formatARS(totalParaNineras)}
              </div>
              <p className="mt-1 text-xs font-semibold text-[#7A6A63]">
                No debería figurar como ganancia propia en ARCA
              </p>
            </div>

            <div className="rounded-[24px] bg-[#EDFBF5] border border-[#BDECD8] p-5">
              <div className="text-xs font-extrabold text-[#145941]">
                3. Tu Comisión Neta (Facturable)
              </div>
              <div className="mt-1.5 font-display text-2xl sm:text-3xl font-semibold text-[#145941] tabular-nums">
                {formatARS(totalTuComision)}
              </div>
              <p className="mt-1 text-xs font-semibold text-[#2B735B]">
                Monto real a facturar por servicio de intermediación
              </p>
            </div>
          </div>

          {/* Action Header */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-xl font-semibold text-[#2F2522]">
              Liquidaciones y Transferencias
            </h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#1F7A5A] hover:bg-[#176348] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Registrar horas / cobro
            </button>
          </div>

          {/* Ledger Items */}
          <div className="space-y-3">
            {billing.map((item) => {
              const fam = families.find((f) => f.id === item.familyId);
              const nan = nannies.find((n) => n.id === item.nannyId);
              const totalFamilia = item.horas * (item.tarifaNinera + item.comisionAgenciaPorHora);
              const pagoNinera = item.horas * item.tarifaNinera;
              const tuComision = item.horas * item.comisionAgenciaPorHora;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-[24px] border border-[#EFE4D8] p-4 sm:p-5 pastel-shadow flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#FAF2E8] text-[#6B5B55] tabular-nums">
                        {item.comprobanteNro}
                      </span>
                      <span className="text-xs font-bold text-[#7A6A63]">{item.periodo}</span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-[#EEF7FF] text-[#1A4B7F]">
                        {item.metodoPago}
                      </span>
                    </div>
                    <h3 className="font-display text-base sm:text-lg font-semibold text-[#2F2522]">
                      {fam?.apellido || 'Familia'} → {nan?.nombre || 'Niñera'}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-bold text-[#6B5B55] tabular-nums">
                      <span>{item.horas} hs trabajadas</span>
                      <span>• Cobro Familia: <strong className="text-[#2F2522]">{formatARS(totalFamilia)}</strong></span>
                      <span>• Niñera: <strong className="text-[#2F2522]">{formatARS(pagoNinera)}</strong></span>
                      <span>• Tu comisión: <strong className="text-[#145941]">{formatARS(tuComision)}</strong></span>
                    </div>
                  </div>

                  {/* Interactive Status Toggles + Receipt Button */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      onClick={() => onToggleBillingStatus(item.id, 'estadoFamilia')}
                      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold border transition-colors cursor-pointer ${
                        item.estadoFamilia === 'Pagado'
                          ? 'bg-[#EDFBF5] border-[#A5E8CC] text-[#145941]'
                          : 'bg-[#FFFBEB] border-[#F6D782] text-[#855706]'
                      }`}
                    >
                      {item.estadoFamilia === 'Pagado' ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <Clock className="w-3.5 h-3.5" />
                      )}
                      Familia: {item.estadoFamilia}
                    </button>

                    <button
                      onClick={() => onToggleBillingStatus(item.id, 'estadoNinera')}
                      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold border transition-colors cursor-pointer ${
                        item.estadoNinera === 'Transferido'
                          ? 'bg-[#DCF7EC] border-[#A5E8CC] text-[#145941]'
                          : 'bg-[#FFF3F0] border-[#FFC5B8] text-[#9C3A26]'
                      }`}
                    >
                      {item.estadoNinera === 'Transferido' ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <Clock className="w-3.5 h-3.5" />
                      )}
                      Niñera: {item.estadoNinera}
                    </button>

                    <button
                      onClick={() => setReceiptItem(item)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF2E8] hover:bg-[#EFE2D3] text-[#2F2522] text-xs font-extrabold transition-colors cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Recibo
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* TAB 2: PROFITABILITY & BILLING MODEL SIMULATOR */
        <div className="space-y-6">
          {/* Interactive Sliders Box */}
          <div className="bg-white rounded-[28px] border border-[#EFE4D8] p-5 sm:p-6 pastel-shadow space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="font-display text-xl font-semibold text-[#2F2522]">
                  Calculadora de Rentabilidad para tu Agencia
                </h2>
                <p className="text-xs sm:text-sm text-[#6B5B55]">
                  Mové los controles para comparar cuánto ganás con $150/h vs. modelos profesionales de agencia.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF2E8] text-xs font-extrabold text-[#2F2522] tabular-nums self-start">
                <TrendingUp className="w-3.5 h-3.5 text-[#1F7A5A]" />
                {horasMesTotales} hs/mes totales
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-extrabold">
                  <span className="text-[#6B5B55]">Familias activas</span>
                  <span className="text-[#2F2522] tabular-nums">{simFamilias} familias</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={40}
                  value={simFamilias}
                  onChange={(e) => setSimFamilias(Number(e.target.value))}
                  className="w-full accent-[#E56A50] cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-extrabold">
                  <span className="text-[#6B5B55]">Horas/sem por familia</span>
                  <span className="text-[#2F2522] tabular-nums">{simHorasSem} hs</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={35}
                  value={simHorasSem}
                  onChange={(e) => setSimHorasSem(Number(e.target.value))}
                  className="w-full accent-[#5DA9F6] cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-extrabold">
                  <span className="text-[#6B5B55]">Tarifa niñera / hora</span>
                  <span className="text-[#2F2522] tabular-nums">{formatARS(simTarifaHora)}</span>
                </div>
                <input
                  type="range"
                  min={3000}
                  max={8000}
                  step={200}
                  value={simTarifaHora}
                  onChange={(e) => setSimTarifaHora(Number(e.target.value))}
                  className="w-full accent-[#4DC096] cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-extrabold">
                  <span className="text-[#6B5B55]">Tu comisión hoy / hora</span>
                  <span className="text-[#9C3A26] tabular-nums">{formatARS(simComisionActual)}</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={600}
                  step={50}
                  value={simComisionActual}
                  onChange={(e) => setSimComisionActual(Number(e.target.value))}
                  className="w-full accent-[#9F7AEA] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* 4 Models Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modelosSimulados.map((mod) => {
              const toneMap = {
                peach: {
                  bg: 'bg-[#FFF7F5]',
                  border: 'border-[#FFC5B8]',
                  badge: 'bg-[#FFE3DC] text-[#9C3A26]',
                  num: 'text-[#9C3A26]',
                },
                sky: {
                  bg: 'bg-[#F5FAFF]',
                  border: 'border-[#C5E0FF]',
                  badge: 'bg-[#DFEEFF] text-[#1A4B7F]',
                  num: 'text-[#1A4B7F]',
                },
                mint: {
                  bg: 'bg-[#F2FCF8]',
                  border: 'border-[#9AE3C4]',
                  badge: 'bg-[#DCF7EC] text-[#145941]',
                  num: 'text-[#145941]',
                },
                lilac: {
                  bg: 'bg-[#FAF7FF]',
                  border: 'border-[#DCCBFF]',
                  badge: 'bg-[#ECE4FF] text-[#462B80]',
                  num: 'text-[#462B80]',
                },
              }[mod.tone];

              return (
                <div
                  key={mod.id}
                  className={`rounded-[26px] border-2 ${toneMap.bg} ${toneMap.border} p-5 flex flex-col justify-between space-y-4`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-lg font-semibold text-[#2F2522]">
                        {mod.nombre}
                      </h3>
                      <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${toneMap.badge}`}>
                        {mod.badge}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-[#5E4E48] leading-relaxed">
                      {mod.descripcion}
                    </p>
                  </div>

                  <div>
                    <div className="text-[11px] font-extrabold uppercase tracking-wide text-[#7A6A63]">
                      Tu ganancia mensual estimada
                    </div>
                    <div className={`font-display text-3xl font-bold tabular-nums mt-0.5 ${toneMap.num}`}>
                      {formatARS(mod.ingresoMensual)}
                      <span className="text-xs font-sans font-bold text-[#7A6A63]"> /mes</span>
                    </div>
                    <div className="text-xs font-bold text-[#6B5B55] mt-1">{mod.detalle}</div>
                  </div>

                  <div className="rounded-2xl bg-white/85 border border-[#EDE2D5] p-3 text-xs text-[#4D3F3A]">
                    <Sparkles className="w-3.5 h-3.5 inline mr-1.5 text-[#E56A50]" />
                    {mod.nota}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Critical ARCA / Monotributo Advisory Card */}
          <div className="rounded-[26px] bg-[#FFF6DC] border border-[#F6D782] p-5 sm:p-6 flex flex-col sm:flex-row items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-[#FDE084] text-[#855706] flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-display text-lg font-semibold text-[#664100]">
                ¡Ojo con la trampa fiscal al cobrar vos y transferirle a la niñera!
              </h3>
              <p className="text-xs sm:text-sm text-[#6E4D12] leading-relaxed">
                En tu simulación, por tus manos pasarían <strong>{formatARS(volumenBrutoMes)}/mes</strong>. Si las familias te transfieren el total a tu cuenta personal y vos luego le transferís a cada niñera, para <strong>ARCA (ex-AFIP)</strong> e Ingresos Brutos parecerá que facturás todo ese volumen — aunque tu ganancia real sea una fracción pequeña.
              </p>
              <p className="text-xs sm:text-sm text-[#6E4D12] leading-relaxed font-bold">
                Solución: usá <strong>Split de Pagos (Mercado Pago Marketplace)</strong> para que el dinero se divida en origen, o cobrá únicamente tu <strong>comisión / membresía / fee de búsqueda</strong> mientras la familia le abona sus horas directamente a la niñera. (Ver detalles en la Guía del Negocio).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* RECEIPT / LIQUIDATION PREVIEW MODAL */}
      <AnimatePresence>
        {receiptItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#2F2522]/45 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setReceiptItem(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 18 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white rounded-[28px] border border-[#EFE4D8] p-6 pastel-shadow-lg space-y-4"
            >
              {(() => {
                const fam = families.find((f) => f.id === receiptItem.familyId);
                const nan = nannies.find((n) => n.id === receiptItem.nannyId);
                const subNinera = receiptItem.horas * receiptItem.tarifaNinera;
                const subComision = receiptItem.horas * receiptItem.comisionAgenciaPorHora;
                const total = subNinera + subComision;

                return (
                  <>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <ArrulloLogo size={36} />
                        <div>
                          <div className="font-display text-lg font-semibold text-[#2F2522] leading-tight">
                            Comprobante Arrullo
                          </div>
                          <div className="text-xs font-bold text-[#7A6A63]">
                            Nro. {receiptItem.comprobanteNro} • {receiptItem.periodo}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setReceiptItem(null)}
                        aria-label="Cerrar comprobante"
                        className="p-2 rounded-xl bg-[#FAF2E8] text-[#6B5B55] cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="rounded-2xl bg-[#FFFBF5] border border-[#EDE2D5] p-4 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#7A6A63] font-bold">Familia:</span>
                        <span className="font-extrabold text-[#2F2522]">{fam?.apellido}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#7A6A63] font-bold">Niñera asignada:</span>
                        <span className="font-extrabold text-[#2F2522]">{nan?.nombre}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#7A6A63] font-bold">Horas registradas:</span>
                        <span className="font-extrabold text-[#2F2522] tabular-nums">
                          {receiptItem.horas} horas
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#7A6A63] font-bold">Medio de pago:</span>
                        <span className="font-extrabold text-[#1A4B7F]">{receiptItem.metodoPago}</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm border-t border-b border-[#EFE4D8] py-3.5 tabular-nums">
                      <div className="flex justify-between">
                        <span className="text-[#6B5B55] text-xs font-bold">
                          Honorarios Niñera (por cuenta de terceros)
                        </span>
                        <span className="font-bold">{formatARS(subNinera)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#145941] text-xs font-bold">
                          Gestión y Seguro SOS Arrullo (Facturable)
                        </span>
                        <span className="font-extrabold text-[#145941]">{formatARS(subComision)}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-dashed border-[#E7D8C9] font-display text-lg font-semibold text-[#2F2522]">
                        <span>Total a abonar</span>
                        <span>{formatARS(total)}</span>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          showToast('Comprobante preparado para enviar por email / imprimir');
                          setReceiptItem(null);
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#2F2522] text-white text-xs font-extrabold cursor-pointer"
                      >
                        <Printer className="w-4 h-4" />
                        Enviar / Imprimir PDF
                      </button>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ADD BILLING RECORD MODAL */}
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
              onSubmit={handleAddSubmit}
              className="w-full max-w-md bg-white rounded-[28px] border border-[#EFE4D8] p-6 pastel-shadow-lg space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold text-[#2F2522]">
                  Registrar Horas y Cobro
                </h2>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  aria-label="Cerrar formulario"
                  className="p-2 rounded-xl bg-[#FAF2E8] text-[#6B5B55] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-extrabold text-[#6B5B55]">Familia</label>
                  <select
                    value={newRecord.familyId}
                    onChange={(e) => setNewRecord({ ...newRecord, familyId: e.target.value })}
                    className="mt-1 w-full rounded-xl bg-[#FFFBF5] border border-[#E7D8C9] px-3 py-2 text-sm font-bold"
                  >
                    {families.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.apellido}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-extrabold text-[#6B5B55]">Niñera</label>
                  <select
                    value={newRecord.nannyId}
                    onChange={(e) => setNewRecord({ ...newRecord, nannyId: e.target.value })}
                    className="mt-1 w-full rounded-xl bg-[#FFFBF5] border border-[#E7D8C9] px-3 py-2 text-sm font-bold"
                  >
                    {nannies.map((n) => (
                      <option key={n.id} value={n.id}>
                        {n.nombre} ({formatARS(n.tarifaHora)}/h)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-extrabold text-[#6B5B55]">Horas trabajadas</label>
                    <input
                      type="number"
                      min={1}
                      value={newRecord.horas}
                      onChange={(e) => setNewRecord({ ...newRecord, horas: e.target.value })}
                      className="mt-1 w-full rounded-xl bg-[#FFFBF5] border border-[#E7D8C9] px-3 py-2 text-sm font-bold tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-extrabold text-[#6B5B55]">Tarifa niñera / h</label>
                    <input
                      type="number"
                      step={100}
                      value={newRecord.tarifaNinera}
                      onChange={(e) => setNewRecord({ ...newRecord, tarifaNinera: e.target.value })}
                      className="mt-1 w-full rounded-xl bg-[#FFFBF5] border border-[#E7D8C9] px-3 py-2 text-sm font-bold tabular-nums"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-extrabold text-[#6B5B55]">Tu comisión / h</label>
                    <input
                      type="number"
                      step={50}
                      value={newRecord.comisionAgenciaPorHora}
                      onChange={(e) =>
                        setNewRecord({ ...newRecord, comisionAgenciaPorHora: e.target.value })
                      }
                      className="mt-1 w-full rounded-xl bg-[#FFFBF5] border border-[#E7D8C9] px-3 py-2 text-sm font-bold tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-extrabold text-[#6B5B55]">Período</label>
                    <input
                      type="text"
                      value={newRecord.periodo}
                      onChange={(e) => setNewRecord({ ...newRecord, periodo: e.target.value })}
                      className="mt-1 w-full rounded-xl bg-[#FFFBF5] border border-[#E7D8C9] px-3 py-2 text-sm font-semibold"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-[#EDFBF5] border border-[#BDECD8] p-3 text-xs font-bold text-[#145941] flex justify-between tabular-nums">
                <span>Tu comisión en este turno:</span>
                <span>
                  {formatARS(
                    (Number(newRecord.horas) || 0) * (Number(newRecord.comisionAgenciaPorHora) || 0)
                  )}
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-2xl bg-[#FAF2E8] text-[#6B5B55] font-bold text-sm cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-2xl bg-[#1F7A5A] text-white font-bold text-sm cursor-pointer"
                >
                  Crear liquidación
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
