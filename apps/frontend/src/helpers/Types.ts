
export type DatosPersonaType = {
  id_persona: number,
  fk_tipo_identificacion: string,
  n_identificacion: string,
  nombre_1: string,
  nombre_2?: null | string,
  apellido_1: string,
  apellido_2?: null | string,
  telefono: string,
  direccion: string,
  correo: string,
  alias: string,
  estado_persona: 1
}

export type SessionUserType = {
  rol: number,
  datos_persona: DatosPersonaType[]
}

export type InputDataDecretoType = {
  valor?: string,
  porcentaje?: string,
  empresa?: string,
  fondoPensiones?: string,
  marca?: string,
  placa?: string
  nombreEstablecimiento?: string,
  matriculaInmobiliaria?: string,
  direccion?: string,
  FMI?: string
}

export type DecretoType = {
  id_tipo_embargo?: number,
  tipo: string,
  descripcion: string,
  ley?: string,
  leyes?: Array<string>,
  dataInputs?: InputDataDecretoType
}

export type DatosEncabezadoType = {
  juzgado: string,
  juez: string,
  ciudad: string,
  origen: string,
  radicado: string,
  demandante: string,
  demandado: string,
  proceso: string,
  provincia: string,
}

export type JuzgadosType = {
  origen: string,
  estado: number
}

export type CiudadesType = {
  ciudad: string,
  estado: number
}

export type ProccesosType = {
  proceso: string,
  estado: number
}

export type ActasType = {
  id_acta: string;
  fecha_registro: string;
  proceso: string;
  demandante: string;
  demandado: string;
  provincia: string;
  fk_ciudad: string;
  decretos: string;
  alias?: string;
}

export type UsuariosType = {
  fk_tipo_identificacion: string,
  n_identificacion: number,
  alias: string,
  rol: number,
  nombre_1: string,
  nombre_2: string,
  apellido_1: string,
  apellido_2: string,
  telefono: string,
  correo: string,
  estado_persona: number
}

export type ResponsePatch = {
  status: boolean,
  message: string
}

export type ActasDigitadasType = {
  alias: string,
  digitador: string,
  fk_tipo_identificacion: string,
  n_identificacion: string,
  correo: string,
  actas_digitadas: number
}