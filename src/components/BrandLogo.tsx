import React from 'react';
import { useEnterprise } from '../context/EnterpriseContext';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  compact?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ variant = 'dark', compact = false }) => {
  const { cms, lang } = useEnterprise();

  if (cms.logo_mode === 'attached_image') {
    return (
      <div className="flex items-center gap-3 shrink-0">
        <img
          src="/assets/aistudio/___c3a244de.png"
          alt="Blue Paradise Logo"
          referrerPolicy="no-referrer"
          className="h-9 w-auto rounded object-contain bg-[#102B46] px-1.5 py-0.5"
        />
        {!compact && (
          <span
            className={`text-lg font-bold tracking-tight whitespace-nowrap shrink-0 ${
              variant === 'light' ? 'text-[#F7F5F0]' : 'text-[#102B46] dark:text-[#F7F5F0]'
            }`}
          >
            {lang === 'ar' ? 'بلو برادايس | Blue Paradise' : 'Blue Paradise | بلو برادايس'}
          </span>
        )}
      </div>
    );
  }

  // Default approved identity per Doc 02: Geometric B & P horizon + sun arc monogram (no airplane)
  return (
    <div className="flex items-center gap-3 shrink-0">
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#102B46] text-[#F7F5F0] border border-[#1E8F91]/50 shrink-0"
        aria-hidden="true"
      >
        <svg viewBox="0 0 40 40" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Sun arc */}
          <path d="M8 24C8 16.268 13.373 10 20 10C26.627 10 32 16.268 32 24" stroke="#E9D8BD" strokeWidth="2.2" strokeLinecap="round" />
          {/* Sea horizon wave */}
          <path d="M5 28.5C10 26.5 15 30.5 20 28.5C25 26.5 30 30.5 35 28.5" stroke="#1E8F91" strokeWidth="2.4" strokeLinecap="round" />
          {/* Geometric BP Monogram */}
          <text x="20" y="23" textAnchor="middle" fill="#F7F5F0" fontSize="11" fontWeight="bold" fontFamily="Arial, sans-serif">
            BP
          </text>
        </svg>
      </div>
      {!compact && (
        <span
          className={`text-lg font-bold tracking-tight whitespace-nowrap shrink-0 ${
            variant === 'light' ? 'text-[#F7F5F0]' : 'text-[#102B46] dark:text-[#F7F5F0]'
          }`}
        >
          {lang === 'ar' ? 'بلو برادايس | Blue Paradise' : 'Blue Paradise | بلو برادايس'}
        </span>
      )}
    </div>
  );
};
