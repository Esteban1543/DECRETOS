import React, { useEffect, useState } from 'react'
import { InputDataDecretoType } from '../../helpers/Types.ts'

/*
  Componente para extraer los datos necesarios para
  Decretos de Establecimientos, Inmuebles y Vehiculos 📌
*/

interface FormDecreto3inputsProps {
  nombre_demandado: string,
  secciones_descripcion: Array<string>,
  tipo_decreto: string,
  positionList: number,
  fn_agregarInputData: (positionObject: number, dataInputs: InputDataDecretoType) => void,
  data_inputs?: InputDataDecretoType
}


const FormDecreto3inputs: React.FC<FormDecreto3inputsProps> = ({ nombre_demandado, positionList, secciones_descripcion, tipo_decreto, fn_agregarInputData, data_inputs }) => {
  // console.log('formDecreto3inputs >> ', data_inputs)

  //🔸 Estructuras para cada tipo de Decreto
  const estado_inmueble = {
    demandado: nombre_demandado,
    direccion: data_inputs?.direccion || ''
  }
  const estado_establecimientos = {
    nombreEstablecimiento: data_inputs?.nombreEstablecimiento || '',
    direccion: data_inputs?.direccion || '',
    demandado: nombre_demandado,
  }
  const estado_vehiculos = {
    placa: data_inputs?.placa || '',
    marca: data_inputs?.marca || '',
    demandado: nombre_demandado,
  }

  const estado_inicial = tipo_decreto == 'Establecimiento' ? estado_establecimientos : tipo_decreto == 'Inmueble' ? estado_inmueble : estado_vehiculos;

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

    fn_agregarInputData(positionList, dataInputs);

    //❗ No se puede añadir la fn_agregarInputData al array de dependencias porque genera bucle infinito
  }, [dataInputs, positionList])


  return (
    <>
      {
        tipo_decreto === 'Establecimiento'
          ? (
            <>
              {secciones_descripcion[0]}

              < input
                type="text"
                placeholder='Nombre Establecimiento'
                className='input_decreto'
                name='nombreEstablecimiento'
                onChange={handleChange}
                value={estado_establecimientos.nombreEstablecimiento}
                style={{ width: '300px' }}
              />

              {secciones_descripcion[1]}

              < input
                type="text"
                placeholder='854648, Ubicado en ...'
                className='input_decreto'
                name='direccion'
                onChange={handleChange}
                value={estado_establecimientos.direccion}
                style={{ width: '450px' }}
              />

              {secciones_descripcion[2]}

            </>
          ) : tipo_decreto === 'Inmueble' ? (
            <>
              {secciones_descripcion[0]}

              < input
                type="text"
                placeholder='F. M. I.  070-79028'
                className='input_decreto'
                name='direccion'
                onChange={handleChange}
                value={estado_inmueble.direccion}
                style={{ width: '450px' }}
              />

            </>
          ) : (
            <>
              {secciones_descripcion[0]}

              < input
                type="text"
                placeholder='Placa'
                className='input_decreto'
                name='placa'
                onChange={handleChange}
                value={estado_vehiculos.placa}
                style={{ width: '100px' }}
              />

              {secciones_descripcion[1]}

              < input
                type="text"
                placeholder='Marca'
                className='input_decreto'
                name='marca'
                onChange={handleChange}
                value={estado_vehiculos.marca}
              />

              {secciones_descripcion[2]}

            </>
          )
      }
    </>
  )
}

export default FormDecreto3inputs