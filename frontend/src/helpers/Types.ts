
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
  porcentaje?: number,
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
  origen: string;
}

export type CiudadesType = {
  ciudad: string
}

export type ProccesosType = {
  proceso: string
}