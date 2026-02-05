
import React from 'react';

const BackgroundAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Círculos rojos dinámicos */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-red-900 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-red-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-stone-100 rounded-full mix-blend-soft-light filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      
      {/* Patrón de ruido y grilla sutil */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:50px_50px]"></div>
    </div>
  );
};

export default BackgroundAnimation;
