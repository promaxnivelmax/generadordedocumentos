
export type ServiceType = 
  | 'PETITION' 
  | 'GENERAL_PETITION'
  | 'RESIGNATION' 
  | 'PERSONAL_REF' 
  | 'FAMILY_REF' 
  | 'POWER_OF_ATTORNEY' 
  | 'WORK_REF'
  | 'RESUME';

export interface StudyEntry {
  id: string;
  nivel: string;
  institucion: string;
  titulo: string;
  fechaGrado: string;
  ciudad: string;
}

export interface ExperienceEntry {
  id: string;
  empresa: string;
  cargo: string;
  fechaInicio: string;
  fechaFinal: string;
  ciudad: string;
}

export interface ReferenceEntry {
  id: string;
  nombre: string;
  profesion: string;
  celular: string;
  tipo: 'Personal' | 'Familiar';
}

export interface DocumentData {
  nombresApellidos: string;
  cargoProfesion: string;
  numeroDocumento: string;
  tipoDocumento: string;
  lugarExpedicion: string;
  fechaNacimiento: string;
  lugarNacimiento: string;
  telefono: string;
  correoElectronico: string;
  direccion: string;
  barrio: string;
  ciudadResidencia: string;
  ciudadFecha: string;
  perfilProfesional?: string;
  fotoBase64?: string;
  estudios?: StudyEntry[];
  experiencias?: ExperienceEntry[];
  referencias?: ReferenceEntry[];
  numeroComparendo?: string;
  numeroExpediente?: string;
  fechaComparendo?: string;
  numeroTurno?: string; // Nuevo campo requerido
  entidadDirigida?: string;
  asuntoPeticion?: string;
  hechosPeticion?: string;
  pretensionesPeticion?: string;
  empresaNombre?: string;
  cargoDesempenado?: string;
  ultimoDiaLaboral?: string;
  nombreReferenciado?: string;
  cedulaReferenciado?: string;
  tiempoConocimiento?: string;
  parentesco?: string;
  nombreApoderado?: string;
  cedulaApoderado?: string;
  tramiteEspecifico?: string;
}

export enum FormStatus {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
