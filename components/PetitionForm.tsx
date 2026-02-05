
import React, { useState } from 'react';
import { DocumentData, FormStatus, ServiceType } from '../types';
import { generateDocument } from '../services/docGenerator';

interface PetitionFormProps {
  serviceType: ServiceType;
}

const PetitionForm: React.FC<PetitionFormProps> = ({ serviceType }) => {
  const [formData, setFormData] = useState<DocumentData>({
    ciudadFecha: `Barrancabermeja, ${new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })}`,
    nombresApellidos: '',
    tipoDocumento: 'Cédula de Ciudadanía',
    numeroDocumento: '',
    ciudadResidencia: 'Barrancabermeja',
    correoElectronico: '',
    telefono: '',
    // Dynamic fields
    numeroComparendo: '',
    numeroExpediente: '',
    fechaComparendo: '',
    numeroTurno: '',
    entidadDirigida: '',
    asuntoPeticion: 'DERECHO DE PETICIÓN',
    hechosPeticion: '',
    pretensionesPeticion: '',
    empresaNombre: '',
    cargoDesempenado: '',
    ultimoDiaLaboral: '',
    nombreReferenciado: '',
    cedulaReferenciado: '',
    tiempoConocimiento: '',
    parentesco: '',
    nombreApoderado: '',
    cedulaApoderado: '',
    tramiteEspecifico: ''
  });

  const [status, setStatus] = useState<FormStatus>(FormStatus.IDLE);

  const getServiceTitle = () => {
    switch(serviceType) {
      case 'PETITION': return 'Prescripción RNMC (Policía)';
      case 'GENERAL_PETITION': return 'Derecho de Petición General';
      case 'RESIGNATION': return 'Renuncia Voluntaria';
      case 'PERSONAL_REF': return 'Referencia Personal';
      case 'FAMILY_REF': return 'Referencia Familiar';
      case 'WORK_REF': return 'Referencia Laboral';
      case 'POWER_OF_ATTORNEY': return 'Poder Amplio';
      default: return 'Formulario';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(FormStatus.GENERATING);
    
    try {
      await generateDocument(serviceType, formData);
      setStatus(FormStatus.SUCCESS);
      setTimeout(() => setStatus(FormStatus.IDLE), 3000);
    } catch (error) {
      console.error(error);
      setStatus(FormStatus.ERROR);
    }
  };

  return (
    <div className="glass-card p-8 rounded-3xl border border-white/10 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">{getServiceTitle()}</h2>
          <p className="text-slate-400 text-sm">Trámite gratuito gestionado por Iván Rodriguez.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-red-400 bg-red-400/10 px-3 py-1.5 rounded-full border border-red-400/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Seguridad Institucional
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300 ml-1">Sus Nombres y Apellidos (Quien firma)</label>
            <input
              required
              type="text"
              name="nombresApellidos"
              value={formData.nombresApellidos}
              onChange={handleChange}
              placeholder="Ej. Juan Pérez"
              className="w-full bg-stone-900/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-600/50 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300 ml-1">Ciudad y Fecha</label>
            <input
              required
              type="text"
              name="ciudadFecha"
              value={formData.ciudadFecha}
              onChange={handleChange}
              className="w-full bg-stone-900/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-600/50 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300 ml-1">Su Tipo Identificación</label>
            <select name="tipoDocumento" value={formData.tipoDocumento} onChange={handleChange} className="w-full bg-stone-900/50 border border-white/5 rounded-xl px-4 py-3 text-white">
              <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
              <option value="Cédula de Extranjería">Cédula de Extranjería</option>
              <option value="Pasaporte">Pasaporte</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300 ml-1">Su No. Documento</label>
            <input required type="text" name="numeroDocumento" value={formData.numeroDocumento} onChange={handleChange} className="w-full bg-stone-900/50 border border-white/5 rounded-xl px-4 py-3 text-white" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300 ml-1">Ciudad de Residencia</label>
            <input required type="text" name="ciudadResidencia" value={formData.ciudadResidencia} onChange={handleChange} className="w-full bg-stone-900/50 border border-white/5 rounded-xl px-4 py-3 text-white" />
          </div>
        </div>

        <div className="p-6 bg-red-950/20 rounded-2xl border border-red-800/10 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">Detalles del Requerimiento</h3>
          
          {serviceType === 'GENERAL_PETITION' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dirigido a</label>
                  <input required name="entidadDirigida" value={formData.entidadDirigida} onChange={handleChange} placeholder="Ej. Alcaldía de Barrancabermeja" className="w-full bg-stone-900/80 border border-white/5 rounded-xl px-4 py-2.5 text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Asunto</label>
                  <input required name="asuntoPeticion" value={formData.asuntoPeticion} onChange={handleChange} className="w-full bg-stone-900/80 border border-white/5 rounded-xl px-4 py-2.5 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Relato de los Hechos</label>
                <textarea required name="hechosPeticion" value={formData.hechosPeticion} onChange={handleChange} placeholder="Explique lo ocurrido..." className="w-full bg-stone-900/80 border border-white/5 rounded-xl px-4 py-2.5 text-white h-24" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Solicitud / Pretensiones</label>
                <textarea required name="pretensionesPeticion" value={formData.pretensionesPeticion} onChange={handleChange} placeholder="Escriba claramente su petición..." className="w-full bg-stone-900/80 border border-white/5 rounded-xl px-4 py-2.5 text-white h-24" />
              </div>
            </div>
          )}

          {serviceType === 'PETITION' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">No. Comparendo</label>
                <input required name="numeroComparendo" value={formData.numeroComparendo} onChange={handleChange} className="w-full bg-stone-900/80 border border-white/5 rounded-xl px-4 py-2.5 text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">No. Expediente RNMC</label>
                <input required name="numeroExpediente" value={formData.numeroExpediente} onChange={handleChange} className="w-full bg-stone-900/80 border border-white/5 rounded-xl px-4 py-2.5 text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Fecha Infracción</label>
                <input required name="fechaComparendo" value={formData.fechaComparendo} onChange={handleChange} className="w-full bg-stone-900/80 border border-white/5 rounded-xl px-4 py-2.5 text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Turno Inspección</label>
                <input required name="numeroTurno" value={formData.numeroTurno} onChange={handleChange} className="w-full bg-stone-900/80 border border-white/5 rounded-xl px-4 py-2.5 text-white" />
              </div>
            </div>
          )}

          {serviceType === 'RESIGNATION' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Nombre de la Empresa</label>
                <input required name="empresaNombre" value={formData.empresaNombre} onChange={handleChange} className="w-full bg-stone-900/80 border border-white/5 rounded-xl px-4 py-2.5 text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Cargo Desempeñado</label>
                <input required name="cargoDesempenado" value={formData.cargoDesempenado} onChange={handleChange} className="w-full bg-stone-900/80 border border-white/5 rounded-xl px-4 py-2.5 text-white" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Fecha de Retiro Efectivo</label>
                <input required name="ultimoDiaLaboral" value={formData.ultimoDiaLaboral} onChange={handleChange} className="w-full bg-stone-900/80 border border-white/5 rounded-xl px-4 py-2.5 text-white" />
              </div>
            </div>
          )}

          {(serviceType === 'PERSONAL_REF' || serviceType === 'FAMILY_REF') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Nombre de la Persona que Referencia</label>
                <input required name="nombreReferenciado" value={formData.nombreReferenciado} onChange={handleChange} placeholder="Ej. Maria Lopez" className="w-full bg-stone-900/80 border border-white/5 rounded-xl px-4 py-2.5 text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Cédula del Referenciado</label>
                <input required name="cedulaReferenciado" value={formData.cedulaReferenciado} onChange={handleChange} className="w-full bg-stone-900/80 border border-white/5 rounded-xl px-4 py-2.5 text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Tiempo de Conocimiento (Años/Meses)</label>
                <input required name="tiempoConocimiento" value={formData.tiempoConocimiento} onChange={handleChange} placeholder="Ej. 5 años" className="w-full bg-stone-900/80 border border-white/5 rounded-xl px-4 py-2.5 text-white" />
              </div>
              {serviceType === 'FAMILY_REF' && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Parentesco</label>
                  <input required name="parentesco" value={formData.parentesco} onChange={handleChange} placeholder="Ej. Hermano, Primo" className="w-full bg-stone-900/80 border border-white/5 rounded-xl px-4 py-2.5 text-white" />
                </div>
              )}
            </div>
          )}

          {serviceType === 'POWER_OF_ATTORNEY' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Nombre del Apoderado (Autorizado)</label>
                <input required name="nombreApoderado" value={formData.nombreApoderado} onChange={handleChange} className="w-full bg-stone-900/80 border border-white/5 rounded-xl px-4 py-2.5 text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Cédula del Apoderado</label>
                <input required name="cedulaApoderado" value={formData.cedulaApoderado} onChange={handleChange} className="w-full bg-stone-900/80 border border-white/5 rounded-xl px-4 py-2.5 text-white" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Trámite Específico a Autorizar</label>
                <textarea required name="tramiteEspecifico" value={formData.tramiteEspecifico} onChange={handleChange} placeholder="Ej. Reclamar resultados médicos, retirar documentos de la alcaldía..." className="w-full bg-stone-900/80 border border-white/5 rounded-xl px-4 py-2.5 text-white h-20" />
              </div>
            </div>
          )}
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300 ml-1">Correo de Notificación</label>
            <input required type="email" name="correoElectronico" value={formData.correoElectronico} onChange={handleChange} className="w-full bg-stone-900/50 border border-white/5 rounded-xl px-4 py-3 text-white" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300 ml-1">Teléfono Móvil</label>
            <input required type="text" name="telefono" value={formData.telefono} onChange={handleChange} className="w-full bg-stone-900/50 border border-white/5 rounded-xl px-4 py-3 text-white" />
          </div>
        </div>

        <button
          type="submit"
          disabled={status === FormStatus.GENERATING}
          className={`w-full py-5 rounded-2xl font-bold text-lg transition-all transform active:scale-[0.98] ${
            status === FormStatus.GENERATING 
              ? 'bg-stone-800 text-slate-500 opacity-50' 
              : status === FormStatus.SUCCESS
              ? 'bg-green-600 text-white'
              : 'bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 text-white shadow-xl shadow-red-900/20'
          }`}
        >
          {status === FormStatus.GENERATING ? 'Generando documento...' : 'Generar Documento Word'}
        </button>
      </form>
    </div>
  );
};

export default PetitionForm;
