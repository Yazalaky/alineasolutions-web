import React from 'react';

interface PseLogoProps {
  className?: string;
}

export const PseLogo: React.FC<PseLogoProps> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    <circle cx="50" cy="50" r="50" fill="#183660" />
    <path d="M15,50 L25,50 L30,42" fill="none" stroke="#FABD00" strokeWidth="3" strokeLinecap="round" />
    <circle cx="15" cy="50" r="4" fill="#FABD00" />
    <circle cx="28" cy="35" r="3" fill="#FABD00" />
    <circle cx="20" cy="65" r="3" fill="#FABD00" />
    <path d="M35,40 C35,40 45,38 45,48 C45,58 35,58 35,58 L35,70" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <path d="M55,60 C55,60 50,60 50,55 C50,50 60,50 60,45 C60,40 55,40 55,40" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <path d="M70,55 H80 V40 H70 V70 H80" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <text x="38" y="32" fill="white" fontSize="12" fontFamily="sans-serif" fontWeight="bold">ach</text>
  </svg>
);
