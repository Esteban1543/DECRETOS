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
  cod_folio: string,
}