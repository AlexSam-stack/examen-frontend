export type Rol = "AGRICULTOR" | "ADMIN";

export type EstadoCultivo = "ACTIVO" | "COSECHADO" | "PERDIDO";

export type NivelRiesgo = "BAJO" | "MEDIO" | "ALTO";

export type MetodoRiego = "goteo" | "aspersion" | "manual" | string;

export type TipoAbono = "organico" | "quimico" | "foliar" | string;


export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: Rol;
  creadoEn: string;
}

export interface Terreno {
  id: number;
  usuario: Usuario;
  nombre: string;
  ubicacion: string | null;
  latitud: number | null;
  longitud: number | null;
  areaHectareas: number | null;
  tipoSuelo: string | null;
  creadoEn: string;
}

export interface TipoPlanta {
  id: number;
  nombre: string;
  nombreCientifico: string | null;
  descripcion: string | null;
  condicionesOptimas: string | null;
  diasCosecha: number | null;
}

export interface Cultivo {
  id: number;
  terreno: Terreno | null;
  tipoPlanta: TipoPlanta | null;
  tipoPlantaId?: number;
  fechaSiembra: string; // 
  estado: EstadoCultivo;
  observaciones: string | null;
  creadoEn: string;
}

export interface Riego {
  id: number;
  cultivo: Cultivo;
  fecha: string; // ISO-8601
  cantidadLitros: number | null;
  metodo: MetodoRiego | null;
  observaciones: string | null;
}

export interface Abono {
  id: number;
  cultivo: Cultivo;
  fecha: string;
  tipoAbono: TipoAbono;
  cantidadKg: number | null;
  observaciones: string | null;
}

export interface Enfermedad {
  id: number;
  nombre: string;
  tipoPlanta: TipoPlanta | null;
  sintomas: string | null;
  tratamiento: string | null;
  nivelRiesgo: NivelRiesgo;
}

export interface AnalisisFoto {
  id: number;
  cultivo: Cultivo;
  fecha: string;
  imagenUrl: string | null;
  diagnostico: string | null;
  confianza: number | null; //
  resultadoRaw: string | null; // 
  recomendacion: string | null;
}

export interface AnalisisTierra {
  id: number;
  terreno: Terreno;
  fecha: string;
  ph: number | null;
  nitrogenoPpm: number | null;
  fosforoPpm: number | null;
  potasioPpm: number | null;
  materiaOrganicaPc: number | null;
  humedadPc: number | null;
  recomendacion: string | null;
}



export interface LoginRequest {

  email: string;
  password: string;
}

export interface RegistroRequest {
  nombre: string;
  email: string;
  password: string;
}

export interface TerrenoRequest {
  usuarioId: number;
  nombre: string;
  ubicacion?: string;
  latitud?: number;
  longitud?: number;
  areaHectareas?: number;
  tipoSuelo?: string;
}

export interface CultivoRequest {
  terrenoId: number;
  tipoPlantaId: number;
  fechaSiembra: string; // yyyy-MM-dd
  estado?: EstadoCultivo;
  observaciones?: string;
}

export interface RiegoRequest {
  cultivoId: number;
  cantidadLitros?: number;
  metodo?: MetodoRiego;
  observaciones?: string;
}

export interface AbonoRequest {
  cultivoId: number;
  tipoAbono: TipoAbono;
  cantidadKg?: number;
  observaciones?: string;
}

export interface AnalisisTierraRequest {
  terrenoId: number;
  ph?: number;
  nitrogenoPpm?: number;
  fosforoPpm?: number;
  potasioPpm?: number;
  materiaOrganicaPc?: number;
  humedadPc?: number;
}



export interface PrediccionDTO {
  clase: string;
  confianza: number; // 0-100
}

export interface AnalisisFotoResponse {
  id: number;
  cultivoId: number;
  fecha: string;
  diagnostico: string | null;
  confianza: number | null;
  recomendacion: string | null;
  predicciones: PrediccionDTO[];
}

export interface ApiError {
  status: number;
  mensaje: string;
  fecha: string;
}


export type ValidationErrors = Record<string, string>;


export const ESTADO_CULTIVO_LABELS: Record<EstadoCultivo, string> = {
  ACTIVO: "Activo",
  COSECHADO: "Cosechado",
  PERDIDO: "Perdido",
};

export const NIVEL_RIESGO_LABELS: Record<NivelRiesgo, string> = {
  BAJO: "Bajo",
  MEDIO: "Medio",
  ALTO: "Alto",
};
