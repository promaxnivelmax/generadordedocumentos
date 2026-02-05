
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import PetitionForm from './components/PetitionForm';
import DirectoryPage from './components/DirectoryPage';
import BackgroundAnimation from './components/BackgroundAnimation';
import { ServiceType } from './types';

const App: React.FC = () => {
  const [activeService, setActiveService] = useState<ServiceType | null>(null);
  const [view, setView] = useState<'LANDING' | 'DIRECTORY'>('LANDING');

  const handleSelectService = (service: ServiceType) => {
    setActiveService(service);
    setView('LANDING'); // Si selecciona un servicio, estamos en modo formulario
  };

  const handleBack = () => {
    setActiveService(null);
    setView('LANDING');
  };

  const toggleDirectory = () => {
    setView(view === 'LANDING' ? 'DIRECTORY' : 'LANDING');
    setActiveService(null);
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-stone-950">
      <BackgroundAnimation />
      
      <main className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
        {view === 'DIRECTORY' ? (
          <div className="w-full max-w-6xl animate-in fade-in zoom-in duration-500">
            <button 
              onClick={handleBack}
              className="mb-8 flex items-center text-slate-400 hover:text-white transition-colors group bg-white/5 px-4 py-2 rounded-full border border-white/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al Inicio
            </button>
            <DirectoryPage />
          </div>
        ) : !activeService ? (
          <LandingPage onSelectService={handleSelectService} onOpenDirectory={toggleDirectory} />
        ) : (
          <div className="w-full max-w-4xl animate-in fade-in duration-700 slide-in-from-bottom-10">
            <button 
              onClick={handleBack}
              className="mb-6 flex items-center text-slate-400 hover:text-white transition-colors group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al Portafolio
            </button>
            <PetitionForm serviceType={activeService} />
          </div>
        )}
      </main>

      <footer className="relative z-10 py-10 text-center border-t border-white/5 bg-stone-950/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-white font-bold text-lg mb-1">Iván Rodriguez</p>
          <p className="text-red-600 font-semibold text-sm mb-4 uppercase tracking-widest">Servicios Legales Gratuitos</p>
          <div className="h-px w-20 bg-red-800 mx-auto mb-6"></div>
          <p className="text-slate-500 text-xs mb-2">© {new Date().getFullYear()} Barrancabermeja, Colombia</p>
          <p className="text-slate-500 text-xs italic">Comprometidos con la justicia y el servicio social.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
