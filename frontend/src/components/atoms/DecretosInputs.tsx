/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
// import React, { useEffect, useState } from 'react'
import FormDecreto1_2inputs from './FormDecreto1_2inputs';
import { InputDataDecretoType } from '../../helpers/Types.ts';
import FormDecreto3inputs from './FormDecreto3inputs';
import { formatNumeracionDecretos } from '../../helpers/formatNumeracion';


interface DecretosInputsProps {
  descripcion: string,
  nombre_demandado: string,
  tipo_decreto: string,
  positionList: number,
  fn_agregarInputData: (positionObject: number, dataInputs: InputDataDecretoType) => void,
  data_inputs?: InputDataDecretoType
}


const DecretosInputs: React.FC<DecretosInputsProps> = ({ nombre_demandado, descripcion, tipo_decreto, positionList, fn_agregarInputData, data_inputs }) => {
  // console.log(data_inputs)

  //🔸 Setear el nombre del DEMANDADO en los decretos
  const desc_demandado = descripcion.replace("°##", nombre_demandado || '-DATO PENDIENTE-');

  //🔸 Subdividir el decreto para añadir inputs
  const secciones_descripcion = desc_demandado.split('°');
  // console.log(secciones_descripcion)


  return (
    <article className='container_decreto_inputs'>

      <header className='titulo_card_decreto'>
        <h4>Decreto por {tipo_decreto}</h4>
        <h4>{formatNumeracionDecretos(positionList + 1)}</h4>
      </header>

      {
        tipo_decreto == 'Salario' || tipo_decreto == 'Banco' || tipo_decreto == 'Fondo de Pensiones'
          ? <FormDecreto1_2inputs
            nombre_demandado={nombre_demandado}
            tipo_decreto={tipo_decreto}
            secciones_descripcion={secciones_descripcion}
            positionList={positionList}
            fn_agregarInputData={fn_agregarInputData}
            data_inputs={data_inputs}
          />
          : tipo_decreto == 'Inmueble' || tipo_decreto == 'Establecimiento' || tipo_decreto == 'Automovil'
            ? <FormDecreto3inputs
              nombre_demandado={nombre_demandado}
              tipo_decreto={tipo_decreto}
              secciones_descripcion={secciones_descripcion}
              positionList={positionList}
              fn_agregarInputData={fn_agregarInputData}
              data_inputs={data_inputs}
            />
            :
            <h5>No hay formato para Decreto seleccionado</h5>
      }
    </article>
  )
}

export default DecretosInputs