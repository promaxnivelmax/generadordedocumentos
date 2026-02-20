
import React, { useState } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
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
    setView('LANDING');
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
              className="mb-8 flex items-center text-slate-400 hover:text-white transition-colors group bg-white/5 px-4 py-2 rounded-full border border-white/10 font-bold"
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
              className="mb-6 flex items-center text-slate-400 hover:text-white transition-colors group font-bold bg-white/5 px-4 py-2 rounded-full border border-white/10"
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

      <footer className="relative z-10 py-16 text-center border-t border-white/5 bg-stone-950/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          
          {/* Columna WhatsApp & Info */}
          <div className="space-y-4">
            <h5 className="text-red-600 font-black text-xs uppercase tracking-[0.3em] mb-4">Canal de Noticias</h5>
            <p className="text-slate-400 text-sm leading-relaxed">
              Únete a mi canal de WhatsApp donde comparto diariamente postulaciones laborales e información de interés general.
            </p>
            <a 
              href="https://whatsapp.com/channel/0029VayXoKp1XqufpYCZaB1Z" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase transition-all shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg>
              Unirme al Canal
            </a>
          </div>

          {/* Columna Ubicaciones */}
          <div className="space-y-4">
            <h5 className="text-red-600 font-black text-xs uppercase tracking-[0.3em] mb-4">Nuestros Locales</h5>
            <div className="space-y-4">
              <div className="group border-l-2 border-white/5 pl-4 hover:border-red-600 transition-colors">
                <p className="text-white font-bold text-sm mb-1 uppercase tracking-tight">Internet La 52</p>
                <p className="text-slate-500 text-[11px] mb-2">Calle 52A #34H-101 Local 1, Primero de Mayo</p>
                <a href="https://www.google.com/maps/dir//Internet+la+52,+687033,+Barrancabermeja,+Santander/@7.0549504,-73.8525184,15z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x8e42ed189cfafd2d:0x23e44f8c97fcaf72!2m2!1d-73.8439027!2d7.0634863?entry=ttu" target="_blank" rel="noopener noreferrer" className="text-red-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors underline">Ver cómo llegar →</a>
              </div>
              <div className="group border-l-2 border-white/5 pl-4 hover:border-red-600 transition-colors">
                <p className="text-white font-bold text-sm mb-1 uppercase tracking-tight">Trámites y Servicios Laura</p>
                <p className="text-slate-500 text-[11px] mb-2">Cl. 51 #5-15, Sector Comercial</p>
                <a href="https://www.google.com/maps/dir//Tr%C3%A1mites+y+servicios+Laura,+Cl.+51+%235+15,+Barrancabermeja,+Santander/@7.0549504,-73.8525184,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x8e42ed76b3bdc673:0xdf538a2bc594a2c6!2m2!1d-73.8721086!2d7.061113?hl=es-419&authuser=0&entry=ttu" target="_blank" rel="noopener noreferrer" className="text-red-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors underline">Ver cómo llegar →</a>
              </div>
            </div>
          </div>

          {/* Columna Redes & Autor */}
          <div className="space-y-4">
            <h5 className="text-red-600 font-black text-xs uppercase tracking-[0.3em] mb-4">Conéctate Conmigo</h5>
            <div className="flex gap-4 mb-6">
              <a href="https://www.instagram.com/ivangrodriguezb" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-3 rounded-2xl hover:bg-gradient-to-tr hover:from-purple-600 hover:to-pink-500 hover:scale-110 transition-all border border-white/10 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-slate-400 group-hover:text-white" viewBox="0 0 16 16"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8.001 16c2.172 0 2.444-.01 3.298-.048.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.281.11-.705.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/></svg>
              </a>
              <a href="https://fb.com/ivangrodriguez" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-3 rounded-2xl hover:bg-blue-600 hover:scale-110 transition-all border border-white/10 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-slate-400 group-hover:text-white" viewBox="0 0 16 16"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/></svg>
              </a>
            </div>
            <p className="text-white font-black text-lg mb-1 tracking-tighter uppercase leading-none">Iván Rodriguez</p>
            <p className="text-slate-500 text-[10px] font-medium tracking-widest italic uppercase">Liderazgo & Servicio Social</p>
          </div>

        </div>
        
        <div className="mt-16 text-[9px] text-slate-600 font-bold uppercase tracking-[0.4em] opacity-40">
           Barrancabermeja - Santander - Colombia - {new Date().getFullYear()}
        </div>
      </footer>
      
      <SpeedInsights />
    </div>
  );
};

export default App;
