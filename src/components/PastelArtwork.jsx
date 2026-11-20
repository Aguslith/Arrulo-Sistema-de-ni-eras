import React, { useId } from 'react';

const AVATAR_THEMES = {
  peach: { bg: '#FFE6DF', ring: '#FFC5B8', shirt: '#F4866E', accent: '#FFF3F0' },
  mint: { bg: '#DDF7EC', ring: '#A5E8CC', shirt: '#4DC096', accent: '#EDFBF5' },
  sky: { bg: '#DFEEFF', ring: '#B2D9FE', shirt: '#5DA9F6', accent: '#EEF7FF' },
  lilac: { bg: '#ECE4FF', ring: '#D2BFFF', shirt: '#9F7AEA', accent: '#F5F1FF' },
  butter: { bg: '#FEF3C7', ring: '#FDE084', shirt: '#E5A124', accent: '#FFFBEB' },
};

const HAIR_COLORS = ['#4A312C', '#7A4B3A', '#2E2320', '#9E6240', '#5A3A2E', '#3A2825'];
const SKIN_TONES = ['#F7D5BE', '#F0C4A8', '#E5B090', '#F8DEC9', '#D9A07D', '#F3CCB2'];

export function ArrulloLogo({ size = 42, className = '' }) {
  const uid = useId();
  const bgId = `${uid}-bg`;
  const moonId = `${uid}-moon`;
  const starId = `${uid}-star`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      <defs>
        <linearGradient id={bgId} x1="6" y1="4" x2="58" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFE6DC" />
          <stop offset="55%" stopColor="#FFF4D8" />
          <stop offset="100%" stopColor="#DFF7EC" />
        </linearGradient>
        <linearGradient id={moonId} x1="16" y1="14" x2="46" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F59076" />
          <stop offset="100%" stopColor="#DF6246" />
        </linearGradient>
        <linearGradient id={starId} x1="36" y1="18" x2="47" y2="33" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFE07D" />
          <stop offset="100%" stopColor="#F4B731" />
        </linearGradient>
      </defs>

      {/* Soft rounded pastel squircle */}
      <rect x="2" y="2" width="60" height="60" rx="18" fill={`url(#${bgId})`} />
      <rect x="2.75" y="2.75" width="58.5" height="58.5" rx="17.25" stroke="#F2CFC1" strokeWidth="1.5" />

      {/* Warm lullaby glow */}
      <circle cx="40.5" cy="25.5" r="12.5" fill="#FFFFFF" opacity="0.58" />

      {/* Gracefully tapered cradling crescent moon */}
      <path
        d="M35.8 13.2C24.2 13.8 15.2 23.1 15.4 34.4C15.6 44.8 24.1 52.2 34.4 52.2C40.9 52.2 46.6 48.9 49.8 43.8C45.2 45.9 39.4 45.6 34.7 42.6C28.4 38.6 26.2 30.2 29.8 23.4C31.3 20.5 33.4 16.4 35.8 13.2Z"
        fill={`url(#${moonId})`}
      />

      {/* Glowing golden star inside the crescent */}
      <path
        d="M41.5 17C42.2 21.3 44.2 23.3 48.5 24C44.2 24.7 42.2 26.7 41.5 31C40.8 26.7 38.8 24.7 34.5 24C38.8 23.3 40.8 21.3 41.5 17Z"
        fill={`url(#${starId})`}
      />
      {/* Companion mint sparkle dot */}
      <circle cx="50" cy="15.2" r="2.3" fill="#4DC096" />

      {/* Fluffy protective cloud cleanly cradling the base */}
      <path
        d="M25.2 53.4H45.6C49.7 53.4 53 50.2 53 46.2C53 42.6 50.3 39.6 46.8 39.1C45.7 34.8 41.8 31.8 37.2 31.8C32.8 31.8 29.1 34.6 27.9 38.6C24 39 21 42.2 21 46.2C21 50.2 22.8 53.4 25.2 53.4Z"
        fill="#FFFFFF"
      />
      {/* Gentle sage-mint cradling smile */}
      <path
        d="M29.4 47.6C32.9 50.1 39.5 50.1 43 47.6"
        stroke="#4DC096"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrulloWordmark({ size = 'md', subtitle = 'Cuidado de confianza' }) {
  const iconSize = size === 'sm' ? 36 : size === 'lg' ? 48 : 44;
  const titleClass =
    size === 'sm'
      ? 'text-[19px]'
      : size === 'lg'
      ? 'text-2xl'
      : 'text-[22px]';

  return (
    <div className="flex items-center gap-3">
      <ArrulloLogo size={iconSize} className="drop-shadow-[0_4px_10px_rgba(223,98,70,0.16)]" />
      <div className="text-left">
        <div className={`font-display font-semibold ${titleClass} leading-none tracking-[-0.02em] text-[#2F2522] flex items-baseline gap-0.5`}>
          <span>Arrullo</span>
          <span
            aria-hidden="true"
            className="inline-block w-1.5 h-1.5 rounded-full bg-[#E56A50] mb-0.5"
          />
        </div>
        {subtitle && (
          <div className="text-[11px] font-bold text-[#7A6A63] mt-1 tracking-wide">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}

export function NannyAvatar({ name = 'N', theme = 'peach', variant = 0, size = 56, className = '' }) {
  const palette = AVATAR_THEMES[theme] || AVATAR_THEMES.peach;
  const hair = HAIR_COLORS[variant % HAIR_COLORS.length];
  const skin = SKIN_TONES[variant % SKIN_TONES.length];

  return (
    <div
      style={{ width: size, height: size, backgroundColor: palette.bg, borderColor: palette.ring }}
      className={`relative rounded-full border-2 overflow-hidden shrink-0 select-none ${className}`}
      title={name}
    >
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        {/* Soft backdrop circle */}
        <circle cx="40" cy="40" r="40" fill={palette.bg} />
        <circle cx="64" cy="18" r="10" fill={palette.accent} opacity="0.8" />
        {/* Hair back */}
        {variant % 3 === 0 && (
          <path d="M18 38C18 22 27 14 40 14C53 14 62 22 62 38L60 58H20L18 38Z" fill={hair} />
        )}
        {variant % 3 === 1 && (
          <>
            <circle cx="22" cy="30" r="9" fill={hair} />
            <circle cx="58" cy="30" r="9" fill={hair} />
            <circle cx="40" cy="34" r="19" fill={hair} />
          </>
        )}
        {variant % 3 === 2 && (
          <>
            <circle cx="40" cy="15" r="9" fill={hair} />
            <path d="M21 36C21 23 29 16 40 16C51 16 59 23 59 36V48H21V36Z" fill={hair} />
          </>
        )}
        {/* Shoulders / Sweater */}
        <path d="M15 80C17 64 26 57 40 57C54 57 63 64 65 80H15Z" fill={palette.shirt} />
        {/* White collar detail */}
        <path d="M32 57.5L40 65L48 57.5" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {/* Neck */}
        <rect x="35" y="49" width="10" height="10" rx="5" fill={skin} />
        {/* Face */}
        <ellipse cx="40" cy="37" rx="15" ry="16" fill={skin} />
        {/* Rosy pastel cheeks */}
        <circle cx="30" cy="41" r="2.8" fill="#F4866E" opacity="0.32" />
        <circle cx="50" cy="41" r="2.8" fill="#F4866E" opacity="0.32" />
        {/* Bangs / Hair front */}
        <path
          d="M24 34C25 22 33 18 42 19C50 20 55 26 56 34C51 28 45 26 39 27C33 28 28 30 24 34Z"
          fill={hair}
        />
        {/* Eyes */}
        <circle cx="34.5" cy="36.5" r="2" fill="#2F2522" />
        <circle cx="45.5" cy="36.5" r="2" fill="#2F2522" />
        <circle cx="35.1" cy="35.8" r="0.6" fill="#FFFFFF" />
        <circle cx="46.1" cy="35.8" r="0.6" fill="#FFFFFF" />
        {/* Warm smile */}
        <path
          d="M35.5 43.2C37.2 45.2 42.8 45.2 44.5 43.2"
          stroke="#7A4236"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export function FamilyAvatar({ theme = 'sky', size = 48, className = '' }) {
  const palette = AVATAR_THEMES[theme] || AVATAR_THEMES.sky;
  return (
    <div
      style={{ width: size, height: size, backgroundColor: palette.bg, borderColor: palette.ring }}
      className={`relative rounded-2xl border-2 flex items-center justify-center shrink-0 overflow-hidden ${className}`}
    >
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        <rect width="64" height="64" fill={palette.bg} />
        {/* Little cozy house + heart */}
        <path
          d="M14 31L32 16L50 31V49C50 50.6 48.6 52 47 52H17C15.4 52 14 50.6 14 49V31Z"
          fill="#FFFFFF"
        />
        <path
          d="M11 32L32 14L53 32"
          stroke={palette.shirt}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32 43.5C32 43.5 25.5 39.6 25.5 35.4C25.5 33.4 27.1 32 29 32C30.2 32 31.3 32.6 32 33.6C32.7 32.6 33.8 32 35 32C36.9 32 38.5 33.4 38.5 35.4C38.5 39.6 32 43.5 32 43.5Z"
          fill={palette.shirt}
        />
      </svg>
    </div>
  );
}
