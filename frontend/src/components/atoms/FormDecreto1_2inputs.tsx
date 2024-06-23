import React, { useEffect, useState } from 'react'
import { InputDataDecretoType } from '../../helpers/Types.ts'

/*
  Componente para extraer los datos necesarios para
  Decretos de Banco, pensiones y salarios 📌
*/

interface FormDecreto1_2inputsProps {
  secciones_descripcion: Array<string>,
  tipo_decreto: string,
  id_tipo_embargo?: number,
  positionList: number,
  fn_agregarInputData: (positionObject: number, dataInputs: InputDataDecretoType) => void,
  data_inputs?: InputDataDecretoType
}


const FormDecreto1_2inputs: React.FC<FormDecreto1_2inputsProps> = ({ positionList, secciones_descripcion, tipo_decreto, id_tipo_embargo, fn_agregarInputData, data_inputs }) => {
  // console.log('formDecreto 1 2inputs >> ', data_inputs)
  //🔸 Estructuras para cada tipo de Decreto
  const estado_banco = {
    valor: data_inputs?.valor,
  }
  const estado_pensiones = {
    fondoPensiones: data_inputs?.fondoPensiones,
    valor: data_inputs?.valor,
  }
  const estado_salario = {
    porcentaje: data_inputs?.porcentaje,
    empresa: data_inputs?.empresa,
    valor: data_inputs?.valor,
  }

  const estado_inicial = tipo_decreto === 'Fondo de Pensiones' ? estado_pensiones : tipo_decreto === 'Banco' ? estado_banco : estado_salario

  //🔸 Estado del valor de los Inputs
  const [dataInputs, setDataInputs] = useState(estado_inicial);


  //🔸 Función para recibir los cambios en los inputs de acuerdo al usuario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setDataInputs((prev) => ({
      ...prev,
      [name]: value
    }))
  }


  //🔸 Anexar los valores de los inputs a su decreto perteneciente en cada OnChange
  useEffect(() => {
    // if (dataInputs.valor != 0) fn_agregarInputData(positionList, dataInputs);
    fn_agregarInputData(positionList, dataInputs);

    //❗ No se puede añadir la fn_agregarInputData al array de dependencias porque genera bucle infinito
  }, [dataInputs, positionList])


  return (
    <>
      {
        tipo_decreto === 'Banco'
          ? (
            <>
              {secciones_descripcion[0]}

              < input
                type="text"
                placeholder='Valor'
                className='input_decreto'
                name='valor'
                onChange={handleChange}
                value={estado_banco.valor}
              />

              {secciones_descripcion[1]}
            </>
          ) : tipo_decreto === 'Fondo de Pensiones'
            ? (
              <>
                {secciones_descripcion[0]}

                < input
                  type="text"
                  placeholder='Fondo de Pensiones'
                  className='input_decreto'
                  name='fondoPensiones'
                  onChange={handleChange}
                  value={estado_pensiones.fondoPensiones}
                />

                {secciones_descripcion[1]}

                < input
                  type="text"
                  placeholder='Valor'
                  className='input_decreto'
                  name='valor'
                  onChange={handleChange}
                  pattern="[0-9]*"
                  value={estado_pensiones.valor}
                />

                {secciones_descripcion[2]}

              </>
            )
            : (
              <>
                {secciones_descripcion[0]}

                < input
                  type="text"
                  placeholder='Porcentaje'
                  className='input_decreto'
                  name='porcentaje'
                  onChange={handleChange}
                  value={estado_salario.porcentaje}
                  style={{ width: '35px' }}
                />

                {secciones_descripcion[1]}

                < input
                  type="text"
                  placeholder='Empresa'
                  className='input_decreto'
                  name='empresa'
                  onChange={handleChange}
                  value={estado_salario.empresa}
                />

                {secciones_descripcion[2]}

                < input
                  type="text"
                  placeholder='Valor'
                  className='input_decreto'
                  name='valor'
                  onChange={handleChange}
                  pattern="[0-9]*"
                  value={estado_salario.valor}
                />

                {secciones_descripcion[3]}

              </>
            )
      }
    </>
  )
}

export default FormDecreto1_2inputs