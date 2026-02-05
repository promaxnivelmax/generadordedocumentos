
export type ServiceType = 
  | 'PETITION' 
  | 'GENERAL_PETITION'
  | 'RESIGNATION' 
  | 'PERSONAL_REF' 
  | 'FAMILY_REF' 
  | 'POWER_OF_ATTORNEY' 
  | 'WORK_REF';

export interface DocumentData {
  // Common fields
  ciudadFecha: string;
  nombresApellidos: string;
  tipoDocumento: string;
  numeroDocumento: string;
  ciudadResidencia: string;
  correoElectronico: string;
  telefono: string;
  
  // Petition (Prescription) specific
  numeroComparendo?: string;
  numeroExpediente?: string;
  fechaComparendo?: string;
  numeroTurno?: string;
  
  // General Petition specific
  entidadDirigida?: string;
  asuntoPeticion?: string;
  hechosPeticion?: string;
  pretensionesPeticion?: string;
  
  // Resignation specific
  empresaNombre?: string;
  cargoDesempenado?: string;
  ultimoDiaLaboral?: string;
  
  // Reference specific
  nombreReferenciado?: string;
  cedulaReferenciado?: string;
  tiempoConocimiento?: string;
  parentesco?: string;
  
  // Power of Attorney specific
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
