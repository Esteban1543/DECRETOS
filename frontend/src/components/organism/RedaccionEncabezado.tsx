
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { Tooltip } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DatosEncabezadoType } from '../../helpers/Types.js';
import { origenes, procesos } from '../../helpers/constantes.js';
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
      [name]: value,
    }));


  };

  //🔸 Manejo de Datos en Formulario (Selects)
  const [origin, setOrigin] = useState(datosEncabezado.origen);
  const [process, setProcess] = useState(datosEncabezado.proceso);

  const handleChangeValueSelects = (event: SelectChangeEvent) => {
    const { name, value } = event.target;

    name == 'origen'
      ? setOrigin(event.target.value as string)
      : setProcess(event.target.value as string)
      ;

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

          <Select
            displayEmpty
            value={origin}
            name="origen"
            onChange={handleChangeValueSelects}
            style={{ marginBottom: '6.5%' }}

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

          <TextField
            name='radicado'
            label="Radicado *"
            placeholder="2023-00501-00"
            // style={{ background: 'white' }}
            onChange={handleChange}
            value={datosEncabezado.radicado}
            helperText="Ingrese numero de radicado con lineas ( - )"
          />

          <TextField
            name='demandante'
            label="Demandante *"
            placeholder="ROSALBA SANDOVAL JIMÉNEZ"
            // style={{ background: 'white' }}
            onChange={handleChange}
            value={datosEncabezado.demandante}
            helperText="Ingrese solo Letras"
          />

          <TextField
            name='demandado'
            label="Demandado *"
            placeholder="ÓSCAR GARCÍA PLAZAS"
            // style={{ background: 'white' }}
            onChange={handleChange}
            value={datosEncabezado.demandado}
            helperText="Ingrese solo Letras"
          />

          <Select
            displayEmpty
            name="proceso"
            value={process}
            onChange={handleChangeValueSelects}
            style={{ marginBottom: '6.5%' }}
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

          <TextField
            name='cod_folio'
            label="Cod. Folio *"
            placeholder=""
            // style={{ background: 'white' }}
            onChange={handleChange}
            value={datosEncabezado.cod_folio}
            helperText="Ingrese el código alfanumérico"
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