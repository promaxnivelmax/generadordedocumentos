
import React from 'react';

const BackgroundAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Fondo base oscuro profundo */}
      <div className="absolute inset-0 bg-stone-950"></div>

      {/* Círculos rojos dinámicos (Efecto de lava/fuego) */}
      <div className="absolute top-[-10%] -left-[10%] w-[600px] h-[600px] bg-red-900 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-blob"></div>
      <div className="absolute top-[20%] -right-[10%] w-[500px] h-[500px] bg-red-600 rounded-full mix-blend-screen filter blur-[100px] opacity-15 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-[20%] left-[20%] w-[700px] h-[700px] bg-orange-900 rounded-full mix-blend-screen filter blur-[140px] opacity-10 animate-blob animation-delay-4000"></div>
      
      {/* Efecto de Brillos/Chispas (Shimmer) */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse blur-[1px]"></div>
        <div className="absolute top-3/4 left-1/3 w-1 h-1 bg-red-400 rounded-full animate-pulse animation-delay-2000 blur-[1px]"></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-red-500 rounded-full animate-pulse animation-delay-4000 blur-[1px]"></div>
      </div>

      {/* Patrón de ruido y grilla sutil */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-25 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]"></div>
      
      {/* Degradado de viñeta para centrar atención */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/50"></div>
    </div>
  );
};

export default BackgroundAnimation;
