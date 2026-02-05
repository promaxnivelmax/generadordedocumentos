
import React from 'react';
import { ServiceType } from '../types';

interface LandingPageProps {
  onSelectService: (service: ServiceType) => void;
  onOpenDirectory: () => void;
}

interface ServiceCard {
  id: ServiceType;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const services: ServiceCard[] = [
  {
    id: 'RESUME',
    title: 'Hoja de Vida Premium',
    description: 'Generador exclusivo de currículum profesional en PDF con diseño moderno, iconos y estructura optimizada.',
    color: 'from-red-600 to-red-800',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    )
  },
  {
    id: 'GENERAL_PETITION',
    title: 'Petición General',
    description: 'Derecho de petición estándar premium dirigido a cualquier entidad o persona.',
    color: 'from-red-700 to-red-900',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    )
  },
  {
    id: 'PETITION',
    title: 'RNMC Prescripción',
    description: 'Solicitud premium de prescripción de multas de convivencia (RNMC) de la Policía Nacional.',
    color: 'from-red-600 to-red-800',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    id: 'RESIGNATION',
    title: 'Renuncia Voluntaria',
    description: 'Carta de renuncia formal premium con lenguaje técnico profesional especializado.',
    color: 'from-stone-700 to-stone-900',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
    )
  },
  {
    id: 'PERSONAL_REF',
    title: 'Referencia Personal',
    description: 'Certificación premium de conducta para trámites oficiales de alta importancia.',
    color: 'from-red-800 to-stone-900',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  {
    id: 'FAMILY_REF',
    title: 'Referencia Familiar',
    description: 'Certificación formal premium de parentesco y honorabilidad familiar.',
    color: 'from-red-900 to-red-700',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  {
    id: 'POWER_OF_ATTORNEY',
    title: 'Poder Amplio',
    description: 'Autorización legal premium para que terceros gestionen sus trámites con validez oficial.',
    color: 'from-stone-600 to-red-900',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
      </svg>
    )
  }
];

const LandingPage: React.FC<LandingPageProps> = ({ onSelectService, onOpenDirectory }) => {
  return (
    <div className="w-full max-w-6xl mx-auto py-12 animate-in fade-in duration-1000">
      <div className="text-center mb-16 relative">
        <div className="inline-block px-4 py-1 mb-4 text-xs font-bold tracking-widest text-white uppercase bg-red-800/80 rounded-full border border-red-600/50 shadow-lg shadow-red-900/20">
          Servicios Premium de Iván Rodriguez
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white">
          Oficina Virtual <span className="text-red-600">Comunitaria</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-20">
          Genere formatos de alta calidad en segundos o acceda a nuestro exclusivo directorio de trámites nacionales.
        </p>
        
        <div className="relative inline-block group">
          {/* Indicador visual reposicionado: Flota a la derecha del botón */}
          <div className="absolute top-1/2 -right-16 md:-right-24 -translate-y-1/2 flex items-center gap-2 animate-bounce pointer-events-none z-20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500 rotate-90 hidden md:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M7 11l5-5m0 0l5 5m-5-5v12" />
            </svg>
            <div className="bg-red-600 text-white font-black px-4 py-2 rounded-2xl shadow-2xl border-2 border-red-400/50 flex flex-col items-center">
               <span className="text-[10px] tracking-tighter uppercase leading-none mb-1">Presiona aquí</span>
               <span className="text-xs whitespace-nowrap">CONSULTE EL DIRECTORIO</span>
            </div>
          </div>
          
          <button
            onClick={onOpenDirectory}
            className="relative z-10 inline-flex items-center gap-4 px-12 py-7 bg-white text-red-900 rounded-3xl font-black text-2xl hover:bg-red-50 transition-all shadow-[0_20px_50px_rgba(185,28,28,0.4)] border-b-8 border-red-700 active:translate-y-2 active:border-b-0 hover:scale-105"
          >
            <div className="p-3 bg-red-600 rounded-2xl text-white shadow-inner">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" />
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 11V6.94l3 3V11M10 14h4M10 17h4" />
               </svg>
            </div>
            DIRECTORIO DE TRÁMITES
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 mt-8">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => onSelectService(service.id)}
            className="group relative glass-card p-8 rounded-3xl border border-white/5 hover:border-red-500/40 transition-all text-left overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-900/20"
          >
            <div className="absolute top-4 right-4 bg-red-600/20 border border-red-500/30 text-[10px] font-black text-red-400 px-2 py-0.5 rounded uppercase tracking-tighter">Premium</div>
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${service.color} opacity-5 group-hover:opacity-15 blur-2xl transition-opacity`}></div>
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-6 shadow-xl shadow-black/20 group-hover:scale-110 transition-transform`}>
              {service.icon}
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-red-400 transition-colors">
              {service.title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {service.description}
            </p>
            <div className="flex items-center text-xs font-black text-red-500 uppercase tracking-widest group-hover:translate-x-2 transition-transform">
              Generar Documento
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
