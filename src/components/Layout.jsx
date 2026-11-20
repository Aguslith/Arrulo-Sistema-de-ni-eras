import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Sparkles,
  Users,
  Home,
  Video,
  Receipt,
  MessageSquareWarning,
  BookOpen,
  Menu,
  X,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import { ArrulloWordmark } from './PastelArtwork';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Inicio', shortLabel: 'Inicio', icon: LayoutDashboard, tone: 'peach' },
  { id: 'match', label: 'Elegir Niñera', shortLabel: 'Elegir', icon: Sparkles, tone: 'lilac' },
  { id: 'nannies', label: 'Niñeras', shortLabel: 'Niñeras', icon: Users, tone: 'mint' },
  { id: 'families', label: 'Familias', shortLabel: 'Familias', icon: Home, tone: 'sky' },
  { id: 'interviews', label: 'Entrevistas & SOS', shortLabel: 'Entrevistas', icon: Video, tone: 'butter' },
  { id: 'billing', label: 'Cobros y Facturación', shortLabel: 'Pagos', icon: Receipt, tone: 'mint' },
  { id: 'moderation', label: 'Moderación', shortLabel: 'Quejas', icon: MessageSquareWarning, tone: 'peach' },
  { id: 'guide', label: 'Guía del Negocio', shortLabel: 'Guía', icon: BookOpen, tone: 'sky' },
];

const ACTIVE_PILL_STYLES = {
  peach: 'bg-[#FFE7E0] text-[#9C3A26]',
  mint: 'bg-[#DCF7EC] text-[#145941]',
  sky: 'bg-[#DFEEFF] text-[#1A4B7F]',
  lilac: 'bg-[#ECE4FF] text-[#462B80]',
  butter: 'bg-[#FEF1C3] text-[#855706]',
};

export default function Layout({
  activeTab,
  setActiveTab,
  badges = {},
  onResetDemo,
  toast,
  children,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelect = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  const bottomNavIds = ['dashboard', 'match', 'interviews', 'billing', 'guide'];

  return (
    <div className="min-h-screen flex bg-[#FFFBF5] text-[#2F2522] relative overflow-x-clip">
      {/* Subtle ambient pastel nursery shapes in background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -top-24 -right-24 w-96 h-96 rounded-full bg-[#FFE6DF]/55 blur-3xl -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-12 left-48 w-80 h-80 rounded-full bg-[#DDF7EC]/55 blur-3xl -z-10"
      />

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-68 lg:shrink-0 sticky top-0 h-screen bg-white/90 backdrop-blur-md border-r border-[#EFE4D8] px-4 py-5 justify-between z-20">
        <div>
          {/* Brand Header */}
          <button
            onClick={() => handleSelect('dashboard')}
            className="w-full px-2 py-1.5 rounded-2xl hover:bg-[#FFF6EE] transition-colors text-left cursor-pointer"
          >
            <ArrulloWordmark size="md" subtitle="Cuidado de confianza" />
          </button>

          {/* Navigation */}
          <nav className="mt-6 space-y-1" aria-label="Navegación principal">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const badgeCount = badges[item.id] || 0;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`relative w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-bold transition-colors cursor-pointer ${
                    isActive
                      ? ACTIVE_PILL_STYLES[item.tone]
                      : 'text-[#6B5B55] hover:bg-[#FAF2E8] hover:text-[#2F2522]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-active-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className={`absolute inset-0 rounded-2xl -z-10 ${ACTIVE_PILL_STYLES[item.tone]}`}
                    />
                  )}
                  <span className="flex items-center gap-3">
                    <Icon className="w-[18px] h-[18px] shrink-0" strokeWidth={2.2} />
                    <span>{item.label}</span>
                  </span>
                  {badgeCount > 0 && (
                    <span
                      className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full tabular-nums ${
                        item.id === 'interviews' || item.id === 'moderation'
                          ? 'bg-[#E56A50] text-white'
                          : 'bg-white/90 text-[#2F2522] border border-[#EBDED1]'
                      }`}
                    >
                      {badgeCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom coordinator card */}
        <div className="space-y-2.5 pt-4 border-t border-[#F0E6DA]">
          <div className="rounded-2xl bg-[#FFF6EE] border border-[#F2E4D6] p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FFE3DC] text-[#9C3A26] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-extrabold text-[#2F2522] truncate">Panel Coordinadora</p>
              <p className="text-[11px] font-semibold text-[#7A6A63] truncate">
                Datos guardados en local
              </p>
            </div>
          </div>

          <button
            onClick={onResetDemo}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-[#7A6A63] hover:text-[#2F2522] hover:bg-[#FAF2E8] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restaurar datos demo
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-0">
        {/* Mobile & Tablet Header */}
        <header className="lg:hidden sticky top-0 z-30 bg-white/92 backdrop-blur-md border-b border-[#EFE4D8] px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => handleSelect('dashboard')}
            className="cursor-pointer"
          >
            <ArrulloWordmark
              size="sm"
              subtitle={NAV_ITEMS.find((n) => n.id === activeTab)?.label}
            />
          </button>

          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Abrir menú"
            className="p-2.5 rounded-xl bg-[#FAF2E8] text-[#2F2522] hover:bg-[#F2E5D6] transition-colors cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
        </header>

        {/* Page Container */}
        <main className="flex-1 w-full max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
          {children}
        </main>
      </div>

      {/* Mobile Slide-Over Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#2F2522]/35 backdrop-blur-xs z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 360, damping: 34 }}
              className="fixed right-0 top-0 bottom-0 w-76 max-w-[85vw] bg-[#FFFBF5] border-l border-[#EFE4D8] z-50 p-5 flex flex-col justify-between lg:hidden pastel-shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#EFE4D8]">
                  <ArrulloWordmark size="sm" subtitle="Cuidado de confianza" />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Cerrar menú"
                    className="p-2 rounded-xl bg-[#FAF2E8] text-[#6B5B55] cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="mt-4 space-y-1.5">
                  {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    const badgeCount = badges[item.id] || 0;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelect(item.id)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-bold transition-colors cursor-pointer ${
                          isActive
                            ? ACTIVE_PILL_STYLES[item.tone]
                            : 'text-[#6B5B55] hover:bg-[#FAF2E8]'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <Icon className="w-4 h-4" />
                          {item.label}
                        </span>
                        {badgeCount > 0 && (
                          <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-[#E56A50] text-white">
                            {badgeCount}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <button
                onClick={() => {
                  onResetDemo();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-[#EFE4D8] text-xs font-bold text-[#6B5B55] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Restaurar datos demo
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation */}
      <nav
        aria-label="Accesos rápidos móvil"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#EFE4D8] px-2 py-1.5 flex items-center justify-around"
      >
        {bottomNavIds.map((id) => {
          const item = NAV_ITEMS.find((n) => n.id === id);
          const Icon = item.icon;
          const isActive = activeTab === id;
          const badgeCount = badges[id] || 0;
          return (
            <button
              key={id}
              onClick={() => handleSelect(id)}
              className={`relative flex flex-col items-center justify-center px-3 py-1.5 rounded-2xl text-[11px] font-bold transition-colors cursor-pointer ${
                isActive ? 'text-[#9C3A26] bg-[#FFF0EC]' : 'text-[#7A6A63]'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" strokeWidth={isActive ? 2.4 : 2} />
              <span>{item.shortLabel}</span>
              {badgeCount > 0 && (
                <span className="absolute top-1 right-1.5 w-2 h-2 rounded-full bg-[#E56A50]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Global Floating Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-50 max-w-sm bg-[#2F2522] text-[#FFFBF5] px-4 py-3 rounded-2xl pastel-shadow-lg flex items-center gap-3 border border-[#4D3D38]"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#7ED4B8] shrink-0" />
            <p className="text-sm font-semibold leading-snug">{toast}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
