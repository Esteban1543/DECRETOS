
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { Tooltip } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DatosEncabezadoType } from '../../helpers/Types.js';
import { origenes, procesos, juzgados, ciudades } from '../../helpers/constantes.js';
import HeaderRedaccion from "../atoms/HeaderRedaccion.js";


interface RedaccionEncabezadoProps {
  handlePage: (page: number) => void,
  datosEncabezado: DatosEncabezadoType;
  setDatosEncabezado: React.Dispatch<React.SetStateAction<DatosEncabezadoType>>;
}

export default function RedaccionEncabezado({ handlePage, datosEncabezado, setDatosEncabezado }: RedaccionEncabezadoProps) {

  const [activarBoton, setactivarBoton] = useState(false);

  //🔸 Manejo de Datos en Formulario (inputs)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setDatosEncabezado((prevData) => ({
      ...prevData,
      // [name]: value ,
      [name]: value.toString().toUpperCase(),
    }));


  };

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

  //🔸 Verificar diligenciamiento de campos/inputs
  useEffect(() => {
    const validarCamposLlenos = () => {
      return Object.values(datosEncabezado).every(valor => valor.trim() !== '');
    };

    const formulario_lleno = validarCamposLlenos();
    formulario_lleno ? setactivarBoton(true) : setactivarBoton(false);
  }, [datosEncabezado]);


  return (
    <>
      <HeaderRedaccion titulo="Datos Encabezado" />

      <section className="form_section_datosEncabezado">

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
                juzgados.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                  >
                    {name}
                  </MenuItem>
                ))
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
                  ciudades.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                    >
                      {name}
                    </MenuItem>
                  ))
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
                origenes.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                  >
                    {name}
                  </MenuItem>
                ))
              }
            </Select>
            <FormHelperText>Seleccione el Origen</FormHelperText>
          </FormControl>

          <TextField
            name='radicado'
            label="Radicado *"
            placeholder="2023-00501-00"
            // style={{ background: 'white' }}
            onChange={handleChange}
            value={datosEncabezado.radicado}
            helperText="Ingrese numero de radicado con lineas ( - )"
            size="small"
          />

          <TextField
            name='demandante'
            label="Demandante *"
            placeholder="ROSALBA SANDOVAL JIMÉNEZ"
            // style={{ background: 'white' }}
            onChange={handleChange}
            value={datosEncabezado.demandante}
            helperText="Ingrese solo Letras"
            size="small"
          />

          <TextField
            name='demandado'
            label="Demandado *"
            placeholder="ÓSCAR GARCÍA PLAZAS"
            // style={{ background: 'white' }}
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
                procesos.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                  >
                    {name}
                  </MenuItem>
                ))
              }
            </Select>
            <FormHelperText>Seleccione el Tipo de Proceso</FormHelperText>
          </FormControl>

          <TextField
            name='cod_folio'
            label="Cod. Folio *"
            placeholder=""
            // style={{ background: 'white' }}
            onChange={handleChange}
            value={datosEncabezado.cod_folio}
            helperText="Ingrese el código alfanumérico"
            size="small"
          />

        </article>


        <footer className='footer_redaccion_container'>
          <Button
            variant="outlined"
            size='large'
            disabled
            onClick={() => handlePage(1)}
          >Cancelar</Button>

          <Tooltip
            title={!activarBoton && "Diligencia todos los campos"}
            placement="top"
          >
            <Button
              variant="contained"
              size='large'
              onClick={activarBoton ? () => handlePage(2) : undefined}
            // disabled={!activarBoton}
            >Continuar</Button>
          </Tooltip>

        </footer>

      </section>

    </>
  );
}