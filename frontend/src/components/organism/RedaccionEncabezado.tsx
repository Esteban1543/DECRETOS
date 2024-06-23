
import React, { FormEvent, useEffect, useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { Tooltip } from '@mui/material';
import { DatosEncabezadoType } from '../../helpers/Types.js';
import { toast } from 'sonner';
import { useGetData } from '../../hooks/useGetData.js';
import { URI } from '../../config.js';
import { JuzgadosType, CiudadesType, ProccesosType } from '../../helpers/Types.js';
import HeaderRedaccion from "../atoms/HeaderRedaccion.js";


interface RedaccionEncabezadoProps {
  handlePage: (page: number) => void,
  datosEncabezado: DatosEncabezadoType;
  setDatosEncabezado: React.Dispatch<React.SetStateAction<DatosEncabezadoType>>,
  setContenido: React.Dispatch<React.SetStateAction<string>>
}




export default function RedaccionEncabezado({ handlePage, datosEncabezado, setDatosEncabezado, setContenido }: RedaccionEncabezadoProps) {

  //🔸 Fecth de Datos para Selects
  const juzgadosApi = useGetData<JuzgadosType>(`${URI}/origen`);
  const procesosApi = useGetData<ProccesosType>(`${URI}/proceso`);
  const ciudadesApi = useGetData<CiudadesType>(`${URI}/ciudad`);

  //🔸 Manejo de Datos en Formulario (Selects)
  const [juzgado, setJuzgado] = useState(datosEncabezado.juzgado);
  const [ciudad, setCiudad] = useState(datosEncabezado.ciudad);
  const [origin, setOrigin] = useState(datosEncabezado.origen);
  const [process, setProcess] = useState(datosEncabezado.proceso);
  const handleChangeValueSelects = (event: SelectChangeEvent) => {
    const { name, value } = event.target;

    if (name == 'origen') setOrigin(event.target.value as string)
    else if (name == 'proceso') setProcess(event.target.value as string)
    else if (name == 'juzgado') setJuzgado(event.target.value as string)
    else if (name == 'ciudad') setCiudad(event.target.value as string)


    setDatosEncabezado((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //🔸 Manejo de Datos en Formulario (inputs)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setDatosEncabezado((prevData) => ({
      ...prevData,
      // [name]: value ,
      [name]: value.toString().toUpperCase(),
    }));


  };

  //🔸 Verificar diligenciamiento de campos/inputs
  useEffect(() => {
    const validarCamposLlenos = () => {
      return Object.values(datosEncabezado).every(valor => valor.trim() !== '');
    };

    const formulario_lleno = validarCamposLlenos();
    formulario_lleno ? setactivarBoton(true) : setactivarBoton(false);
  }, [datosEncabezado]);

  //🔸 Verificación para continuar a la siguiente página
  const [activarBoton, setactivarBoton] = useState(false);
  const handleNextPage = (e: FormEvent) => {
    e.preventDefault();
    activarBoton
      ? handlePage(2)
      : toast.info('Diligencia todos los campos para poder continuar')
  }


  return (
    <>
      <HeaderRedaccion titulo="Datos Encabezado" />

      <form className="form_section_datosEncabezado" onSubmit={handleNextPage}>

        <article className="section_inputs_encabezados" >

          <FormControl>
            <InputLabel>Juzgado</InputLabel>
            <Select
              // displayEmpty
              value={juzgado}
              name="juzgado"
              onChange={handleChangeValueSelects}
              label='Juzgado'
              size="small"
            >
              <MenuItem disabled value='' >
                <em style={{ opacity: '.6' }}>Juzgado *</em>
              </MenuItem>
              {
                (!juzgadosApi.loading && juzgadosApi.data?.data?.map((name, index) => (
                  <MenuItem
                    key={'juzgado-' + index}
                    value={name.origen}
                  >
                    {name.origen}
                  </MenuItem>
                )))
                ?? <MenuItem value="">No hay Juzgados disponibles</MenuItem>
              }
            </Select>

            <FormHelperText>Seleccione el Juzgado remitente</FormHelperText>
          </FormControl>

          <div style={{ display: 'grid', gap: '5%', gridTemplateColumns: '55% auto' }}>
            <TextField
              name='juez'
              label="Juez *"
              placeholder="MANUELA GÓMEZ ÁNGEL RANGEL"
              onChange={handleChange}
              value={datosEncabezado.juez}
              helperText="Ingrese solo Letras"
              size="small"
            />

            <FormControl>
              <InputLabel>Ciudad</InputLabel>
              <Select
                value={ciudad}
                name="ciudad"
                onChange={handleChangeValueSelects}
                label='Ciudad'
                size="small"
              >
                <MenuItem disabled value='' >
                  <em style={{ opacity: '.6' }}>Ciudad *</em>
                </MenuItem>
                {
                  (!ciudadesApi.loading && ciudadesApi.data?.data?.map((name) => (
                    <MenuItem
                      key={name.ciudad}
                      value={name.ciudad}
                    >
                      {name.ciudad}
                    </MenuItem>
                  )))
                  ?? <MenuItem value="">No hay Ciudades disponibles</MenuItem>
                }
              </Select>

              <FormHelperText>Seleccione la Ciudad</FormHelperText>
            </FormControl>
          </div>

          <FormControl>
            <InputLabel>Origen</InputLabel>
            <Select
              size="small"
              value={origin}
              name="origen"
              label='Origen'
              onChange={handleChangeValueSelects}
            >
              <MenuItem disabled value='' >
                <em style={{ opacity: '.6' }}>Origen *</em>
              </MenuItem>
              {
                (!juzgadosApi.loading && juzgadosApi.data?.data?.map((name, index) => (
                  <MenuItem
                    key={'origen-' + index}
                    value={name.origen}
                  >
                    {name.origen}
                  </MenuItem>
                )))
                ?? <MenuItem value="">No hay Juzgados disponibles</MenuItem>
              }
            </Select>
            <FormHelperText>Seleccione el Origen</FormHelperText>
          </FormControl>

          <TextField
            name='radicado'
            label="Radicado *"
            placeholder="2023-00501-00"
            onChange={handleChange}
            value={datosEncabezado.radicado}
            helperText="Ingrese numero de radicado con lineas ( - )"
            size="small"
          />

          <TextField
            name='demandante'
            label="Demandante *"
            placeholder="ROSALBA SANDOVAL JIMÉNEZ"
            onChange={handleChange}
            value={datosEncabezado.demandante}
            helperText="Ingrese solo Letras"
            size="small"
          />

          <TextField
            name='demandado'
            label="Demandado *"
            placeholder="ÓSCAR GARCÍA PLAZAS"
            onChange={handleChange}
            value={datosEncabezado.demandado}
            helperText="Ingrese solo Letras"
            size="small"
          />

          <FormControl>
            <InputLabel>Proceso</InputLabel>
            <Select
              size="small"
              name="proceso"
              value={process}
              onChange={handleChangeValueSelects}
              label='Proceso'
            >
              <MenuItem disabled value="">
                <em style={{ opacity: '.6' }}>Proceso *</em>
              </MenuItem>
              {
                (!procesosApi.loading && procesosApi.data?.data?.map((name) => (
                  <MenuItem
                    key={name.proceso}
                    value={name.proceso}
                  >
                    {name.proceso}
                  </MenuItem>
                )))
                ?? <MenuItem value="">No hay Procesos disponibles</MenuItem>
              }
            </Select>
            <FormHelperText>Seleccione el Tipo de Proceso</FormHelperText>
          </FormControl>

          <TextField
            name='provincia'
            label="Provincia *"
            placeholder="1"
            onChange={handleChange}
            value={datosEncabezado.provincia}
            helperText="Ingrese el código alfanumérico"
            size="small"
          />

        </article>


        <footer className='footer_redaccion_container'>
          <Button
            variant="outlined"
            size='large'
            onClick={() => setContenido('tabla')}
            style={{borderColor: 'var(--color-azul-deep2)', color: 'var(--color-azul-deep2)'}}
          >Cancelar</Button>

          <Tooltip
            title={!activarBoton && "Diligencia todos los campos"}
            placement="top"
          >
            <Button
              variant="contained"
              size='large'
              type='submit'
              style={{background: 'var(--color-azul-deep2)'}}
            // onClick={activarBoton ? () => handlePage(2) : ()=> toast.info('Diligencia todos los campos para poder continuar')}
            >Siguiente</Button>
          </Tooltip>

        </footer>

      </form>

    </>
  );
}