import React, { useEffect, useState } from "react";
import HeaderRedaccion from "../atoms/HeaderRedaccion";
import AñadirDecretos from "../atoms/AñadirDecretos";
import DecretosInputs from "../atoms/DecretosInputs";
import Button from '@mui/material/Button';
import { Tooltip } from "@mui/material";
import CardLoading from "../atoms/CardLoading";
import { DecretoType, InputDataDecretoType } from "../../helpers/Types";

import { decretosDatos } from "../../helpers/datosPrueba"; //Pruebas
import { toast } from "sonner";

interface RedaccionDecretosProps {
  nombre_demandado: string,
  handlePage: (page: number) => void,
  decretosAnexados: DecretoType[],
  setDecretosAnexados: React.Dispatch<React.SetStateAction<DecretoType[]>>,
}

export default function RedaccionDecretos({ nombre_demandado, handlePage, decretosAnexados, setDecretosAnexados }: RedaccionDecretosProps) {

  //🔸 Manejo de Boton para seguir
  const [activarBoton, setactivarBoton] = useState(false);
  //🔸 Activar boton si hay decretos 
  useEffect(() => {
    decretosAnexados && decretosAnexados.length > 0 ? setactivarBoton(true) : setactivarBoton(false);
  }, [decretosAnexados])


  //🔸 Función para anexar los Decretos al Acta
  const handleAgregarDecretos = (decreto: DecretoType, tipo_accion: string) => {

    // 🔸 Agregar Decreto
    if (tipo_accion == 'agregar') return setDecretosAnexados([...decretosAnexados, decreto]);

    // 🔸 Remover Decreto (Pendiente)
    let buscarCoincidencias = true;
    const decreto_remover = decretosAnexados.reverse().filter(decretoSelec => {
      if (decretoSelec.id_tipo_embargo === decreto.id_tipo_embargo && buscarCoincidencias) {
        buscarCoincidencias = false;
        return false;
      }
      return true;
    });

    setDecretosAnexados(decreto_remover.reverse());

  };

  //🔸 Función para añadir los datps de los Inputs a cada Decreto Anexado 
  const agregarInputDataDecretosAnexados = (positionObject: number, dataInputs: InputDataDecretoType) => {
    // console.log('agregarInputDataDecretosAnexados >> ', positionObject, dataInputs)

    setDecretosAnexados(prevDecretosAnexados =>
      prevDecretosAnexados.map((decreto, index) => {
        if (index === positionObject) {
          return {
            ...decreto,
            dataInputs
          };
        }

        return decreto;
      })
    );
  };


  return (
    <>
      <HeaderRedaccion titulo="Cargue de Decretos" />

      <section className="container_añadir_decretos">

        <article className="article_decretos">

          <aside className="container_select_decretos">
            {
              decretosDatos.map(m => (
                <AñadirDecretos
                  key={m.id_tipo_embargo}
                  nombre_decreto={m.tipo}
                  click_agregar={() => handleAgregarDecretos(m, 'agregar')}
                  click_eliminar={() => handleAgregarDecretos(m, 'eliminar')}
                />
              ))
            }
          </aside>

          <section className="container_decretos_editar">
            {
              !decretosAnexados || decretosAnexados.length === 0
                ?
                <>
                  <h4>No hay Decretos anexados</h4>
                  {/* <p style={{textAlign: 'left', width: '100%'}}>
                    Recomendaciones para el ingreso de Datos: <br/>
                    Ingresar valores con puntos y descripción: 12.250.000 millones
                  </p> */}
                  <CardLoading />
                  <CardLoading />
                </>
                : decretosAnexados.map((m, index) => (
                  <DecretosInputs
                    key={index}
                    positionList={index}
                    nombre_demandado={nombre_demandado}
                    tipo_decreto={m.tipo}
                    descripcion={m.descripcion}
                    id_tipo_embargo={m.id_tipo_embargo}
                    data_inputs={m?.dataInputs}
                    fn_agregarInputData={agregarInputDataDecretosAnexados}
                  />
                ))
            }
          </section>
        </article>

        <footer className='footer_redaccion_container'>
          <Button
            variant="outlined"
            size='large'
            onClick={() => handlePage(1)}
          >Atrás</Button>

          <Tooltip
            title={!activarBoton && "Agrega algún decreto"}
            placement="top"
          >
            <Button
              variant="contained"
              size='large'
              onClick={activarBoton ? () => handlePage(3) : ()=> toast.info('Anexa al menos 1 Decreto al documento')}
            >Siguiente</Button>
          </Tooltip>
        </footer>

      </section>
    </>
  );
}