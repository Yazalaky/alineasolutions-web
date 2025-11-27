import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingButtons } from './components/FloatingButtons';
import { LandingPage } from './pages/LandingPage';
import { SimulatorPage } from './pages/SimulatorPage';
import { LoanRequestPage } from './pages/LoanRequestPage';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <LandingPage onNavigate={setCurrentView} />;
      case 'simulator':
        return <SimulatorPage onNavigate={setCurrentView} />;
      case 'apply':
        return <LoanRequestPage />;
      default:
        return <LandingPage onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      <Header currentView={currentView} onNavigate={setCurrentView} />
      <main className="flex-grow">
        {renderView()}
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default App;
