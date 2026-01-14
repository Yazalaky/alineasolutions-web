import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingButtons } from './components/FloatingButtons';
import { LandingPage } from './pages/LandingPage';
import { SimulatorPage } from './pages/SimulatorPage';
import { LoanRequestPage } from './pages/LoanRequestPage';
import { ViewState } from './types';

const getViewFromHash = (): ViewState => {
  if (typeof window === 'undefined') {
    return 'home';
  }

  const hash = window.location.hash.replace(/^#\/?/, '');
  if (hash === 'simulator' || hash === 'apply') {
    return hash;
  }
  return 'home';
};

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

    const nextHash = view === 'home' ? '' : `#${view}`;
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
      <Header currentView={currentView} onNavigate={handleNavigate} />
      <main className="flex-grow">
        {renderView()}
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default App;
