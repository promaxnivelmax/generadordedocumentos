
import React, { useState, useRef } from 'react';
import { DocumentData, FormStatus, ServiceType, StudyEntry, ExperienceEntry, ReferenceEntry } from '../types';
import { generateDocument } from '../services/docGenerator';

interface PetitionFormProps {
  serviceType: ServiceType;
}

const PREDEFINED_PROFILES = [
  { label: "Liderazgo", text: "Profesional con alta capacidad de liderazgo y toma de decisiones estratégicas. Experto en gestión de equipos multidisciplinarios, optimización de procesos y cumplimiento de metas institucionales bajo presión." },
  { label: "Administrativo", text: "Profesional enfocado en la organización, gestión documental y soporte administrativo eficiente. Poseo excelentes habilidades en herramientas ofimáticas y mejora continua de flujos de trabajo." },
  { label: "Servicio", text: "Persona carismática con fuertes habilidades de comunicación asertiva y resolución de conflictos. Comprometido con brindar una experiencia de usuario excepcional y mantener altos estándares de satisfacción." },
  { label: "Operativo", text: "Trabajador dinámico con gran capacidad física y mental para el desarrollo de tareas operativas y técnicas. Enfocado en la seguridad industrial, el orden, la puntualidad y la eficiencia en la ejecución." },
  { label: "General", text: "Persona proactiva, responsable y con gran deseo de aprendizaje continuo. Cuento con excelentes calidades humanas, adaptabilidad a diferentes entornos laborales y compromiso institucional." }
];

const PetitionForm: React.FC<PetitionFormProps> = ({ serviceType }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<DocumentData>({
    ciudadFecha: `Barrancabermeja, ${new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })}`,
    nombresApellidos: '',
    cargoProfesion: '',
    numeroDocumento: '',
    tipoDocumento: 'Cédula de Ciudadanía',
    lugarExpedicion: '',
    fechaNacimiento: '',
    lugarNacimiento: '',
    telefono: '',
    correoElectronico: '',
    direccion: '',
    barrio: '',
    ciudadResidencia: 'Barrancabermeja',
    perfilProfesional: '',
    fotoBase64: '',
    estudios: [],
    experiencias: [],
    referencias: [],
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
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [currentStudy, setCurrentStudy] = useState<Partial<StudyEntry>>({ nivel: 'Bachiller' });
  const [currentExp, setCurrentExp] = useState<Partial<ExperienceEntry>>({});
  const [currentRef, setCurrentRef] = useState<Partial<ReferenceEntry>>({ tipo: 'Personal' });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      alert("No se pudo acceder a la cámara.");
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
      setFormData(prev => ({ ...prev, fotoBase64: canvas.toDataURL('image/jpeg') }));
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
    setIsCameraActive(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const saveStudy = () => {
    if (!currentStudy.titulo || !currentStudy.institucion) return;
    const newEntry = { ...currentStudy, id: editingId || Date.now().toString() } as StudyEntry;
    setFormData(prev => {
      const filtered = prev.estudios?.filter(s => s.id !== editingId) || [];
      const updated = [...filtered, newEntry].sort((a, b) => b.fechaGrado.localeCompare(a.fechaGrado));
      return { ...prev, estudios: updated };
    });
    setCurrentStudy({ nivel: 'Bachiller' });
    setEditingId(null);
  };

  const saveExperience = () => {
    if (!currentExp.empresa || !currentExp.cargo) return;
    const newEntry = { ...currentExp, id: editingId || Date.now().toString() } as ExperienceEntry;
    setFormData(prev => {
      const filtered = prev.experiencias?.filter(e => e.id !== editingId) || [];
      const updated = [...filtered, newEntry].sort((a, b) => b.fechaInicio.localeCompare(a.fechaInicio));
      return { ...prev, experiencias: updated };
    });
    setCurrentExp({});
    setEditingId(null);
  };

  const saveReference = () => {
    if (!currentRef.nombre || !currentRef.celular) return;
    const newEntry = { ...currentRef, id: editingId || Date.now().toString() } as ReferenceEntry;
    setFormData(prev => ({
      ...prev,
      referencias: [...(prev.referencias?.filter(r => r.id !== editingId) || []), newEntry]
    }));
    setCurrentRef({ tipo: 'Personal' });
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (serviceType === 'RESUME' && step < 4) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setStatus(FormStatus.GENERATING);
    try {
      await generateDocument(serviceType, formData);
      setStatus(FormStatus.SUCCESS);
      setTimeout(() => setStatus(FormStatus.IDLE), 3000);
    } catch (error) {
      setStatus(FormStatus.ERROR);
    }
  };

  const serviceTitles: Record<ServiceType, string> = {
    'RESUME': 'Hoja de Vida Premium',
    'PETITION': 'Prescripción de Comparendo (RNMC)',
    'GENERAL_PETITION': 'Derecho de Petición General',
    'RESIGNATION': 'Renuncia Voluntaria',
    'PERSONAL_REF': 'Certificado de Referencia Personal',
    'FAMILY_REF': 'Certificado de Referencia Familiar',
    'POWER_OF_ATTORNEY': 'Poder Amplio y Suficiente',
    'WORK_REF': 'Referencia Laboral'
  };

  if (serviceType === 'RESUME') {
    return (
      <div className="glass-card p-8 rounded-3xl border border-white/10 shadow-2xl max-w-5xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4 border-b border-white/5 pb-6">
          <div className="text-left w-full md:w-auto">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
              <span className="bg-red-600 px-3 py-1 rounded-xl shadow-lg">CV</span>
              {serviceTitles[serviceType]}
            </h2>
            <p className="text-slate-400 text-sm mt-1">Paso {step} de 4: {step === 1 ? 'Información y Perfil' : step === 2 ? 'Formación' : step === 3 ? 'Experiencia' : 'Referencias'}</p>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`h-2.5 w-12 rounded-full transition-all duration-700 ${step >= i ? 'bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]' : 'bg-white/5'}`}></div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col lg:flex-row gap-10">
                <div className="w-full lg:w-1/3 flex flex-col items-center">
                  <div className={`group aspect-[3/4] w-full max-w-[260px] rounded-[2.5rem] border-2 border-dashed ${formData.fotoBase64 ? 'border-red-600/50' : 'border-white/10'} bg-white/5 flex flex-col items-center justify-center overflow-hidden relative shadow-2xl`}>
                    {isCameraActive ? (
                      <div className="relative w-full h-full">
                        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                        <button type="button" onClick={capturePhoto} className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-red-600 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase shadow-2xl hover:scale-105 active:scale-95 transition-all">CAPTURAR</button>
                      </div>
                    ) : formData.fotoBase64 ? (
                      <div className="w-full h-full relative">
                        <img src={formData.fotoBase64} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-4 transition-opacity">
                          <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-white text-black px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">SUBIR ARCHIVO</button>
                          <button type="button" onClick={startCamera} className="bg-red-600 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">TOMAR OTRA</button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-8 flex flex-col items-center gap-5">
                        <div className="w-24 h-24 bg-red-600/10 rounded-full flex items-center justify-center border border-red-600/20">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>
                        </div>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">FOTO DE PERFIL</p>
                        <div className="flex flex-col gap-3 w-full">
                          <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-white/10 hover:bg-white/20 px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">SUBIR ARCHIVO</button>
                          <button type="button" onClick={startCamera} className="bg-red-600 hover:bg-red-500 px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-red-900/20">USAR CÁMARA</button>
                        </div>
                      </div>
                    )}
                  </div>
                  <input type="file" ref={fileInputRef} onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setFormData(prev => ({ ...prev, fotoBase64: reader.result as string }));
                      reader.readAsDataURL(file);
                    }
                  }} accept="image/*" className="hidden" />
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-[11px] font-black text-slate-500 uppercase ml-2 tracking-wider">Nombre Completo</label>
                    <input required name="nombresApellidos" value={formData.nombresApellidos} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-[1.2rem] px-6 py-4 text-white focus:ring-2 focus:ring-red-600/40 outline-none" />
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-[11px] font-black text-slate-500 uppercase ml-2 tracking-wider">Profesión o Cargo Principal</label>
                    <input required name="cargoProfesion" value={formData.cargoProfesion} onChange={handleChange} placeholder="Ej. Administrador / Ingeniero / Operario" className="w-full bg-white/5 border border-white/10 rounded-[1.2rem] px-6 py-4 text-white focus:ring-2 focus:ring-red-600/40 outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-slate-500 uppercase ml-2 tracking-wider">Tipo de Documento</label>
                    <select name="tipoDocumento" value={formData.tipoDocumento} onChange={handleChange} className="w-full bg-stone-900 border border-white/10 rounded-[1.2rem] px-6 py-4 text-white outline-none">
                      <option>Cédula de Ciudadanía</option><option>Cédula de Extranjería</option><option>Pasaporte</option><option>PPT</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-slate-500 uppercase ml-2 tracking-wider">Número de Identificación</label>
                    <input required name="numeroDocumento" value={formData.numeroDocumento} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-[1.2rem] px-6 py-4 text-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-slate-500 uppercase ml-2 tracking-wider">Lugar de Expedición</label>
                    <input required name="lugarExpedicion" value={formData.lugarExpedicion} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-[1.2rem] px-6 py-4 text-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-slate-500 uppercase ml-2 tracking-wider">Fecha de Nacimiento</label>
                    <input required type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-[1.2rem] px-6 py-4 text-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-slate-500 uppercase ml-2 tracking-wider">Lugar de Nacimiento</label>
                    <input required name="lugarNacimiento" value={formData.lugarNacimiento} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-[1.2rem] px-6 py-4 text-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-slate-500 uppercase ml-2 tracking-wider">Celular / WhatsApp</label>
                    <input required name="telefono" value={formData.telefono} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-[1.2rem] px-6 py-4 text-white" />
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-[11px] font-black text-slate-500 uppercase ml-2 tracking-wider">Correo Electrónico</label>
                    <input required name="correoElectronico" value={formData.correoElectronico} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-[1.2rem] px-6 py-4 text-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-slate-500 uppercase ml-2 tracking-wider">Dirección</label>
                    <input required name="direccion" value={formData.direccion} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-[1.2rem] px-6 py-4 text-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-slate-500 uppercase ml-2 tracking-wider">Barrio</label>
                    <input required name="barrio" value={formData.barrio} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-[1.2rem] px-6 py-4 text-white" />
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-[11px] font-black text-slate-500 uppercase ml-2 tracking-wider">Ciudad de Residencia</label>
                    <input required name="ciudadResidencia" value={formData.ciudadResidencia} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-[1.2rem] px-6 py-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in duration-500 space-y-8">
              <div className="bg-red-600/5 p-8 rounded-[2rem] border border-red-600/10 border-l-8 border-l-red-600 shadow-xl">
                <h3 className="text-xl font-black text-white mb-6 uppercase tracking-tight">{editingId ? 'EDITAR ESTUDIO' : 'AÑADIR ESTUDIO'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase">Nivel</label>
                    <select value={currentStudy.nivel} onChange={e => setCurrentStudy({...currentStudy, nivel: e.target.value})} className="w-full bg-stone-900 border border-white/10 rounded-2xl px-5 py-3 text-white">
                      <option>Bachiller</option><option>Técnico</option><option>Tecnólogo</option><option>Profesional</option><option>Postgrado</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase">Institución Educativa</label>
                    <input placeholder="Nombre de la Institución" value={currentStudy.institucion || ''} onChange={e => setCurrentStudy({...currentStudy, institucion: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase">Título Obtenido</label>
                    <input placeholder="Ej. Técnico en Contabilidad" value={currentStudy.titulo || ''} onChange={e => setCurrentStudy({...currentStudy, titulo: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase">Año de Grado</label>
                    <input type="text" placeholder="Ej. 2022" value={currentStudy.fechaGrado || ''} onChange={e => setCurrentStudy({...currentStudy, fechaGrado: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button type="button" onClick={saveStudy} className="flex-1 bg-red-600 text-white font-black py-4 rounded-2xl shadow-xl hover:bg-red-500 transition-all uppercase tracking-[0.2em] text-xs">{editingId ? 'GUARDAR CAMBIOS' : 'AGREGAR ESTUDIO'}</button>
                  {editingId && <button type="button" onClick={() => {setEditingId(null); setCurrentStudy({});}} className="px-8 bg-white/10 rounded-2xl font-black text-[10px] uppercase">CANCELAR</button>}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {formData.estudios?.map(s => (
                  <div key={s.id} className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5 group hover:border-red-600/30 transition-all">
                    <div>
                       <p className="text-white font-black uppercase text-lg">{s.titulo}</p>
                       <p className="text-red-500 font-bold text-sm tracking-wide">{s.institucion}</p>
                       <p className="text-slate-500 text-xs mt-1 uppercase font-semibold">{s.nivel} | Año: {s.fechaGrado}</p>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => {setEditingId(s.id); setCurrentStudy(s); window.scrollTo({top: 0, behavior: 'smooth'});}} className="bg-blue-600/10 text-blue-400 px-5 py-2 rounded-xl text-[10px] font-black uppercase transition-all">Editar</button>
                      <button type="button" onClick={() => setFormData(prev => ({...prev, estudios: prev.estudios?.filter(x => x.id !== s.id)}))} className="bg-red-600/10 text-red-500 px-5 py-2 rounded-xl text-[10px] font-black uppercase transition-all">Borrar</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in duration-500 space-y-8">
              <div className="bg-red-600/5 p-8 rounded-[2rem] border border-red-600/10 border-l-8 border-l-red-600 shadow-xl">
                <h3 className="text-xl font-black text-white mb-6 uppercase tracking-tight">{editingId ? 'EDITAR EXPERIENCIA' : 'AÑADIR EXPERIENCIA'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase">Empresa</label>
                    <input value={currentExp.empresa || ''} onChange={e => setCurrentExp({...currentExp, empresa: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase">Cargo</label>
                    <input value={currentExp.cargo || ''} onChange={e => setCurrentExp({...currentExp, cargo: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase">Fecha Inicio</label>
                    <input type="text" placeholder="Ej. Enero 2020" value={currentExp.fechaInicio || ''} onChange={e => setCurrentExp({...currentExp, fechaInicio: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase">Fecha Fin</label>
                    <input type="text" placeholder="Ej. Actualidad" value={currentExp.fechaFinal || ''} onChange={e => setCurrentExp({...currentExp, fechaFinal: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button type="button" onClick={saveExperience} className="flex-1 bg-red-600 text-white font-black py-4 rounded-2xl shadow-xl hover:bg-red-500 transition-all uppercase tracking-[0.2em] text-xs">{editingId ? 'GUARDAR CAMBIOS' : 'AGREGAR EXPERIENCIA'}</button>
                  {editingId && <button type="button" onClick={() => {setEditingId(null); setCurrentExp({});}} className="px-8 bg-white/10 rounded-2xl font-black text-[10px] uppercase">CANCELAR</button>}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {formData.experiencias?.map(e => (
                  <div key={e.id} className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5 group hover:border-red-600/30 transition-all">
                    <div>
                       <p className="text-white font-black uppercase text-lg">{e.cargo}</p>
                       <p className="text-red-500 font-bold text-sm tracking-wide">{e.empresa}</p>
                       <p className="text-slate-500 text-xs mt-1 uppercase font-semibold">{e.fechaInicio} — {e.fechaFinal || 'Actual'}</p>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => {setEditingId(e.id); setCurrentExp(e); window.scrollTo({top: 0, behavior: 'smooth'});}} className="bg-blue-600/10 text-blue-400 px-5 py-2 rounded-xl text-[10px] font-black uppercase transition-all">Editar</button>
                      <button type="button" onClick={() => setFormData(prev => ({...prev, experiencias: prev.experiencias?.filter(x => x.id !== e.id)}))} className="bg-red-600/10 text-red-500 px-5 py-2 rounded-xl text-[10px] font-black uppercase transition-all">Borrar</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-in fade-in duration-500 space-y-10">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Perfil Profesional</label>
                  <div className="flex flex-wrap gap-2">
                    {PREDEFINED_PROFILES.map((p, idx) => (
                      <button key={idx} type="button" onClick={() => setFormData({...formData, perfilProfesional: p.text})} className="bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white border border-red-600/30 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all">
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
                <textarea 
                  name="perfilProfesional" 
                  value={formData.perfilProfesional} 
                  onChange={handleChange} 
                  className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-6 text-white h-44 resize-none text-sm leading-relaxed outline-none focus:ring-2 focus:ring-red-600/40" 
                  placeholder="Redacte su resumen profesional o use uno sugerido..."
                />
              </div>

              <div className="bg-red-600/5 p-8 rounded-[2rem] border border-red-600/10 border-l-8 border-l-red-600 shadow-xl">
                <h3 className="text-xl font-black text-white mb-6 uppercase tracking-tight">{editingId ? 'EDITAR REFERENCIA' : 'AÑADIR REFERENCIA'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase">Tipo</label>
                    <select value={currentRef.tipo} onChange={e => setCurrentRef({...currentRef, tipo: e.target.value as any})} className="w-full bg-stone-900 border border-white/10 rounded-2xl px-5 py-3 text-white">
                      <option value="Personal">Personal</option><option value="Familiar">Familiar</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase">Nombre</label>
                    <input value={currentRef.nombre || ''} onChange={e => setCurrentRef({...currentRef, nombre: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase">Profesión</label>
                    <input value={currentRef.profesion || ''} onChange={e => setCurrentRef({...currentRef, profesion: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase">Celular</label>
                    <input value={currentRef.celular || ''} onChange={e => setCurrentRef({...currentRef, celular: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button type="button" onClick={saveReference} className="flex-1 bg-red-600 text-white font-black py-4 rounded-2xl shadow-xl hover:bg-red-500 transition-all uppercase tracking-[0.2em] text-xs">{editingId ? 'GUARDAR CAMBIOS' : 'AGREGAR REFERENCIA'}</button>
                  {editingId && <button type="button" onClick={() => {setEditingId(null); setCurrentRef({});}} className="px-8 bg-white/10 rounded-2xl font-black text-[10px] uppercase">CANCELAR</button>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.referencias?.map(r => (
                  <div key={r.id} className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5 group">
                    <div>
                       <p className="text-white font-black uppercase text-sm">{r.nombre}</p>
                       <p className="text-red-500 font-bold text-[10px] uppercase tracking-wider">{r.tipo}</p>
                       <p className="text-slate-500 text-[11px] mt-1 italic">{r.profesion} | {r.celular}</p>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => {setEditingId(r.id); setCurrentRef(r);}} className="bg-white/10 text-white p-2.5 rounded-xl hover:bg-red-600 transition-all"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                      <button type="button" onClick={() => setFormData(prev => ({...prev, referencias: prev.referencias?.filter(x => x.id !== r.id)}))} className="bg-red-600/10 text-red-500 p-2.5 rounded-xl"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-4 pt-10 border-t border-white/5 mt-10">
            {step > 1 && (
              <button type="button" onClick={() => { setStep(step - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex-1 py-5 bg-white/5 hover:bg-white/10 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all border border-white/10">ATRÁS</button>
            )}
            <button
              type="submit"
              disabled={status === FormStatus.GENERATING}
              className={`flex-[2] py-5 rounded-[1.5rem] font-black text-lg transition-all shadow-[0_15px_30px_rgba(220,38,38,0.3)] flex items-center justify-center gap-3 tracking-widest uppercase ${
                status === FormStatus.GENERATING ? 'bg-stone-800 text-slate-500' : 'bg-gradient-to-r from-red-600 to-red-800 text-white hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {step < 4 ? 'SIGUIENTE PASO' : status === FormStatus.GENERATING ? 'GENERANDO...' : 'DESCARGAR HOJA DE VIDA'}
              {step < 4 && <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="glass-card p-8 rounded-3xl border border-white/10 shadow-2xl max-w-4xl mx-auto mb-10">
      <h2 className="text-2xl font-black text-white mb-8 uppercase tracking-tighter flex items-center gap-3 border-b border-white/5 pb-6">
         <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/40">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
           </svg>
         </div>
         {serviceTitles[serviceType]}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 space-y-1">
            <label className="text-[11px] font-black text-slate-500 uppercase ml-2 tracking-wider">Nombre Completo</label>
            <input required name="nombresApellidos" value={formData.nombresApellidos} onChange={handleChange} placeholder="Como aparece en su cédula" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-red-600/40 outline-none" />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-black text-slate-500 uppercase ml-2 tracking-wider">Documento</label>
            <input required name="numeroDocumento" value={formData.numeroDocumento} onChange={handleChange} placeholder="No. de Identificación" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white" />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-black text-slate-500 uppercase ml-2 tracking-wider">Celular</label>
            <input required name="telefono" value={formData.telefono} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white" />
          </div>
          <div className="md:col-span-2 space-y-1">
            <label className="text-[11px] font-black text-slate-500 uppercase ml-2 tracking-wider">Ciudad y Fecha</label>
            <input required name="ciudadFecha" value={formData.ciudadFecha} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white" />
          </div>
        </div>

        {serviceType === 'GENERAL_PETITION' && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <div className="space-y-1">
              <label className="text-[11px] font-black text-slate-500 uppercase ml-2 tracking-wider">Entidad Dirigida</label>
              <input required name="entidadDirigida" value={formData.entidadDirigida} onChange={handleChange} placeholder="Ej: Alcaldía Municipal de..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-red-600/40 outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-black text-slate-500 uppercase ml-2 tracking-wider">Hechos</label>
              <textarea required name="hechosPeticion" value={formData.hechosPeticion} onChange={handleChange} placeholder="Describa lo sucedido..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white h-32 resize-none" />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-black text-slate-500 uppercase ml-2 tracking-wider">Pretensiones</label>
              <textarea required name="pretensionesPeticion" value={formData.pretensionesPeticion} onChange={handleChange} placeholder="¿Qué solicita específicamente?" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white h-32 resize-none" />
            </div>
          </div>
        )}

        {serviceType === 'PETITION' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-500">
            <div className="md:col-span-2 space-y-1">
              <label className="text-[11px] font-black text-slate-500 uppercase ml-2 tracking-wider">Ciudad de Residencia</label>
              <input required name="ciudadResidencia" value={formData.ciudadResidencia} onChange={handleChange} placeholder="Ciudad actual" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white" />
            </div>
            <input required name="numeroComparendo" value={formData.numeroComparendo} onChange={handleChange} placeholder="No. Comparendo" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white" />
            <input required name="numeroExpediente" value={formData.numeroExpediente} onChange={handleChange} placeholder="No. Expediente RNMC" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white" />
            <input required name="fechaComparendo" value={formData.fechaComparendo} onChange={handleChange} placeholder="Fecha Comparendo" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white" />
            <input required name="numeroTurno" value={formData.numeroTurno} onChange={handleChange} placeholder="Número de Turno" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white" />
            <div className="md:col-span-2 space-y-1">
              <label className="text-[11px] font-black text-slate-500 uppercase ml-2 tracking-wider">Correo para respuesta</label>
              <input required name="correoElectronico" value={formData.correoElectronico} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white" />
            </div>
          </div>
        )}

        {serviceType === 'RESIGNATION' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-500">
            <input required name="empresaNombre" value={formData.empresaNombre} onChange={handleChange} placeholder="Nombre de la Empresa" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white md:col-span-2" />
            <input required name="cargoDesempenado" value={formData.cargoDesempenado} onChange={handleChange} placeholder="Cargo que entrega" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white" />
            <input required type="date" name="ultimoDiaLaboral" value={formData.ultimoDiaLaboral} onChange={handleChange} placeholder="Último día laboral" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white" />
          </div>
        )}

        {(serviceType === 'PERSONAL_REF' || serviceType === 'FAMILY_REF') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-500">
            <input required name="nombreReferenciado" value={formData.nombreReferenciado} onChange={handleChange} placeholder="Nombre del referido" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white md:col-span-2" />
            <input required name="cedulaReferenciado" value={formData.cedulaReferenciado} onChange={handleChange} placeholder="Cédula del referido" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white" />
            <input required name="tiempoConocimiento" value={formData.tiempoConocimiento} onChange={handleChange} placeholder="Tiempo de conocerse" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white" />
          </div>
        )}

        {serviceType === 'POWER_OF_ATTORNEY' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-500">
            <input required name="nombreApoderado" value={formData.nombreApoderado} onChange={handleChange} placeholder="Nombre del apoderado" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white md:col-span-2" />
            <input required name="cedulaApoderado" value={formData.cedulaApoderado} onChange={handleChange} placeholder="Cédula del apoderado" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white" />
            <input required name="tramiteEspecifico" value={formData.tramiteEspecifico} onChange={handleChange} placeholder="Trámite a autorizar" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white" />
          </div>
        )}

        <button 
          type="submit" 
          disabled={status === FormStatus.GENERATING}
          className="w-full py-5 rounded-3xl bg-red-600 text-white font-black text-xl hover:bg-red-500 transition-all uppercase tracking-widest shadow-xl shadow-red-900/20 disabled:opacity-50"
        >
          {status === FormStatus.GENERATING ? 'GENERANDO ARCHIVO...' : 'DESCARGAR DOCUMENTO PROFESIONAL'}
        </button>
      </form>
    </div>
  );
};

export default PetitionForm;
