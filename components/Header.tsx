import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ViewState } from '../types';

interface HeaderProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const PseLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <circle cx="50" cy="50" r="50" fill="#183660" />
    {/* Yellow Circuit Lines */}
    <path d="M15,50 L25,50 L30,42" fill="none" stroke="#FABD00" strokeWidth="3" strokeLinecap="round" />
    <circle cx="15" cy="50" r="4" fill="#FABD00" />
    <circle cx="28" cy="35" r="3" fill="#FABD00" />
    <circle cx="20" cy="65" r="3" fill="#FABD00" />
    {/* Text PSE approximation */}
    <path d="M35,40 C35,40 45,38 45,48 C45,58 35,58 35,58 L35,70" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <path d="M55,60 C55,60 50,60 50,55 C50,50 60,50 60,45 C60,40 55,40 55,40" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <path d="M70,55 H80 V40 H70 V70 H80" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <text x="38" y="32" fill="white" fontSize="12" fontFamily="sans-serif" fontWeight="bold">ach</text>
  </svg>
);

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNav = (view: ViewState) => {
    onNavigate(view);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-28">
          {/* Logo */}
          <button
            type="button"
            className="flex items-center cursor-pointer group bg-transparent border-0 p-0"
            onClick={() => handleNav('home')}
            aria-label="Ir al inicio"
          >
            <img
              src="/logo-alinea.png"
              srcSet="/logo-alinea@2x.png 2x"
              alt="Alinea Soluciones"
              className="h-20 sm:h-22 md:h-24 w-auto object-contain"
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            <button 
              onClick={() => handleNav('home')}
              aria-current={currentView === 'home' ? 'page' : undefined}
              className={`text-base font-semibold transition-colors ${currentView === 'home' ? 'text-accent-500' : 'text-gray-500 hover:text-accent-500'}`}
            >
              Inicio
            </button>
            <button 
              onClick={() => handleNav('simulator')}
              aria-current={currentView === 'simulator' ? 'page' : undefined}
              className={`text-base font-semibold transition-colors ${currentView === 'simulator' ? 'text-accent-500' : 'text-gray-500 hover:text-accent-500'}`}
            >
              Simulador
            </button>
            
            {/* PSE Button Desktop */}
            <a 
              href="https://micrositios.avalpaycenter.com/alinea-soluciones-sas-ma" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full transition-all group"
              title="Ir a Pagos PSE"
            >
              <PseLogo className="w-7 h-7" />
              <span className="text-base font-bold text-gray-700 group-hover:text-brand-900">Pagos PSE</span>
            </a>

            <button 
              onClick={() => handleNav('apply')}
              aria-current={currentView === 'apply' ? 'page' : undefined}
              className="px-7 py-3 text-base font-bold text-white bg-brand-900 hover:bg-brand-800 rounded-full transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Solicita tu crédito
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-brand-900 hover:text-accent-500 focus:outline-none transition-colors"
            >
              {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg z-50">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <button 
              onClick={() => handleNav('home')}
              aria-current={currentView === 'home' ? 'page' : undefined}
              className="block w-full text-left px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Inicio
            </button>
            <button 
              onClick={() => handleNav('simulator')}
              aria-current={currentView === 'simulator' ? 'page' : undefined}
              className="block w-full text-left px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Simulador
            </button>
            
            <a 
              href="https://micrositios.avalpaycenter.com/alinea-soluciones-sas-ma"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center gap-3 px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"
            >
              <PseLogo className="w-6 h-6" />
              Pagos en Línea (PSE)
            </a>

            <button 
              onClick={() => handleNav('apply')}
              aria-current={currentView === 'apply' ? 'page' : undefined}
              className="block w-full text-left px-3 py-3 text-base font-bold text-white bg-brand-900 rounded-md mt-4 text-center"
            >
              Solicita tu crédito
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
