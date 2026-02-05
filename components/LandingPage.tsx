
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
    id: 'GENERAL_PETITION',
    title: 'Petición General',
    description: 'Derecho de petición estándar dirigido a cualquier entidad o persona.',
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
    description: 'Solicitud específica de prescripción de multas de convivencia (RNMC) de la Policía Nacional.',
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
    description: 'Carta de renuncia formal e irrevocable con lenguaje técnico profesional.',
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
    description: 'Certificación de conducta bajo gravedad de juramento para trámites.',
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
    description: 'Certificación formal de parentesco y honorabilidad familiar.',
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
    description: 'Autorización legal amplia para que terceros gestionen sus trámites.',
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
      <div className="text-center mb-16">
        <div className="inline-block px-4 py-1 mb-4 text-xs font-bold tracking-widest text-white uppercase bg-red-800/80 rounded-full border border-red-600/50 shadow-lg shadow-red-900/20">
          Servicios Gratuitos de Iván Rodriguez
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white">
          Oficina Virtual <span className="text-red-600">Comunitaria</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
          Genere formatos profesionales en segundos o acceda a los principales portales de trámites nacionales. Herramienta diseñada para servir a Barrancabermeja.
        </p>
        
        <button
          onClick={onOpenDirectory}
          className="inline-flex items-center gap-3 px-10 py-5 bg-white text-red-900 rounded-2xl font-black text-xl hover:bg-red-50 transition-all shadow-2xl shadow-red-900/40 border-b-4 border-red-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 11V6.94l3 3V11M10 14h4M10 17h4" />
          </svg>
          DIRECTORIO DE TRÁMITES
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => onSelectService(service.id)}
            className="group relative glass-card p-8 rounded-3xl border border-white/5 hover:border-red-500/30 transition-all text-left overflow-hidden transform hover:-translate-y-1"
          >
            {/* Resplandor de fondo */}
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${service.color} opacity-5 group-hover:opacity-15 blur-2xl transition-opacity`}></div>
            
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-6 shadow-lg shadow-black/20 group-hover:scale-110 transition-transform`}>
              {service.icon}
            </div>
            
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-red-400 transition-colors">
              {service.title}
            </h3>
            
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {service.description}
            </p>
            
            <div className="flex items-center text-xs font-bold text-red-500 uppercase tracking-widest group-hover:translate-x-1 transition-transform">
              Generar ahora
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-20 p-8 glass-card rounded-3xl border border-red-800/20 text-center max-w-3xl mx-auto">
        <h4 className="text-lg font-bold mb-2 text-white">¿Necesita asesoría personalizada?</h4>
        <p className="text-slate-400 mb-6">Iván Rodriguez está a su disposición para ayudarle con tramites digitales en Barrancabermeja.</p>
        <a 
          href="https://wa.me/573052319414" 
          target="_blank" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold transition-all shadow-xl shadow-green-900/30"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.891-11.891 3.181 0 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.402 0 6.556-5.332 11.891-11.891 11.891-2.01 0-3.987-.512-5.747-1.484l-6.249 1.643zm6.471-3.64c1.559.925 3.327 1.413 5.352 1.413 5.518 0 10.011-4.493 10.011-10.011 0-5.518-4.493-10.011-10.011-10.011-2.67 0-5.183 1.042-7.071 2.931s-2.93 4.401-2.93 7.08c0 2.124.582 4.197 1.682 6.001l-.251.417-1.117 4.08 4.195-1.103-.23.133zm11.378-7.508c-.287-.144-1.7-.839-1.963-.933-.264-.093-.455-.144-.646.144-.19.287-.738.933-.905 1.122-.167.189-.333.212-.619.069-.287-.144-1.21-.447-2.305-1.423-.852-.759-1.426-1.7-1.593-1.986-.167-.287-.018-.442.125-.584.129-.127.287-.333.43-.5.144-.167.191-.287.287-.478.096-.191.048-.359-.024-.503-.072-.144-.646-1.554-.885-2.128-.233-.559-.47-.482-.646-.492l-.549-.01c-.19 0-.501.072-.763.359-.263.287-1 1.004-1 2.447 0 1.442 1.051 2.836 1.196 3.028.144.191 2.067 3.156 5.006 4.428.699.303 1.246.484 1.671.62.702.223 1.341.191 1.847.116.564-.083 1.7-.694 1.939-1.364.239-.67.239-1.243.167-1.363-.071-.121-.263-.192-.549-.336z"/>
          </svg>
          WhatsApp de Iván Rodriguez
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
