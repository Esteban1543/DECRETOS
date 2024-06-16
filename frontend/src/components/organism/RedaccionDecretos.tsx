import React from "react";
import HeaderRedaccion from "../atoms/HeaderRedaccion";
import AñadirDecretos from "../atoms/AñadirDecretos";
import DecretosInputs from "../atoms/DecretosInputs";
import Button from '@mui/material/Button';
import CardLoading from "../atoms/CardLoading";
import { DecretoType, InputDataDecretoType } from "../../helpers/Types";

import { decretosDatos } from "../../helpers/datosPrueba"; //Pruebas

interface RedaccionDecretosProps {
  nombre_demandado: string,
  handlePage: (page: number) => void,
  decretosAnexados: DecretoType[],
  setDecretosAnexados: React.Dispatch<React.SetStateAction<DecretoType[]>>,
}

export default function RedaccionDecretos({ nombre_demandado, handlePage, decretosAnexados, setDecretosAnexados, fn_submit }: RedaccionDecretosProps) {

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

    // setDecretosAnexados([...decretosAnexados, decreto]);
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



  const handleDatosDecretos = () => {
    handlePage(3);
    fn_submit()
  }

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
          >Volver</Button>

          <Button
            variant="contained"
            size='large'
            onClick={handleDatosDecretos}
          >Continuar</Button>
        </footer>

      </section>
    </>
  );
}