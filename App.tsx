import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingButtons } from './components/FloatingButtons';
import { LandingPage } from './pages/LandingPage';
import { SimulatorPage } from './pages/SimulatorPage';
import { LoanRequestPage } from './pages/LoanRequestPage';
import { ViewState } from './types';
import { buildHashForView, getViewFromHash } from './utils/navigation';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(() => getViewFromHash());

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentView(getViewFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    if (typeof window === 'undefined') {
      return;
    }

    const nextHash = buildHashForView(view);
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'simulator':
        return <SimulatorPage onNavigate={handleNavigate} />;
      case 'apply':
        return <LoanRequestPage onNavigate={handleNavigate} />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-white focus:text-brand-900 focus:rounded-md focus:shadow-lg"
      >
        Saltar al contenido principal
      </a>
      <Header currentView={currentView} onNavigate={handleNavigate} />
      <main id="main-content" tabIndex={-1} className="flex-grow focus:outline-none">
        {renderView()}
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default App;
