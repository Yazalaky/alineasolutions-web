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
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => handleNav('home')}
          >
            <div className="relative w-10 h-10">
              <svg viewBox="0 0 100 100" className="w-full h-full text-brand-900 fill-current">
                {/* Stylized 'a' symbol approximation based on brand reference */}
                <path d="M65.4,30.2c-5.8-5.6-13.9-8.5-23.4-8.5c-15.6,0-29.5,9.2-34.6,22.8c-1.4,3.7-2.1,7.8-2.1,12c0,16.8,11.2,31.2,26.7,35.4 c3.4,0.9,7,1.4,10.6,1.4c8.4,0,16.2-2.8,22.4-7.6V88h12V48.5C97,33.5,82.8,21.7,65.4,30.2z M65,74.2c-3.6,3.4-8.4,5.4-13.6,5.4 c-9.6,0-17.6-6.8-19.6-15.8c-0.6-2.6-0.9-5.3-0.9-8.1c0-2.3,0.2-4.5,0.6-6.7c2.2-10.6,11.5-18.6,22.6-18.6c4.5,0,8.7,1.3,12.3,3.7 L65,74.2z" />
                <path d="M66.4,26.5c2.6-2.5,5.6-4.5,9-5.8c3.4-1.3,7.1-2,10.9-2c2.1,0,4.2,0.2,6.2,0.6V7.4c-2.3-0.6-4.8-1-7.4-1 c-5.8,0-11.2,1.5-16,4.2L66.4,26.5z" />
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-logo font-bold text-3xl text-brand-900 leading-none tracking-tight pb-1">
                alinea
              </span>
              <span className="text-[10px] font-medium text-gray-500 uppercase tracking-[0.35em] leading-none ml-1">
                soluciones
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            <button 
              onClick={() => handleNav('home')}
              className={`text-sm font-medium transition-colors ${currentView === 'home' ? 'text-accent-500' : 'text-gray-500 hover:text-accent-500'}`}
            >
              Inicio
            </button>
            <button 
              onClick={() => handleNav('simulator')}
              className={`text-sm font-medium transition-colors ${currentView === 'simulator' ? 'text-accent-500' : 'text-gray-500 hover:text-accent-500'}`}
            >
              Simulador
            </button>
            
            {/* PSE Button Desktop */}
            <a 
              href="https://micrositios.avalpaycenter.com/alinea-soluciones-sas-ma" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full transition-all group"
              title="Ir a Pagos PSE"
            >
              <PseLogo className="w-6 h-6" />
              <span className="text-sm font-bold text-gray-700 group-hover:text-brand-900">Pagos PSE</span>
            </a>

            <button 
              onClick={() => handleNav('apply')}
              className="px-6 py-2.5 text-sm font-bold text-white bg-brand-900 hover:bg-brand-800 rounded-full transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
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
              className="block w-full text-left px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Inicio
            </button>
            <button 
              onClick={() => handleNav('simulator')}
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