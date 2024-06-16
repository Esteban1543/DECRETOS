// import React, { useRef } from 'react'

import inmueblesSVG from '/icons/inmuebles.svg'
import establecimientoSVG from '/icons/inmuebles1.svg'
import salarioSVG from '/icons/salario.svg'
import saldos_bancoSVG from '/icons/saldo_bancarios.svg'
import vehiculosSVG from '/icons/vehiculos.svg'
import pensionSVG from '/icons/pension2.svg'

interface AñadirDecretosProps {
  nombre_decreto: string,
  click_agregar: () => void,
  click_eliminar: () => void
}

const AñadirDecretos = ({ nombre_decreto, click_agregar, click_eliminar }: AñadirDecretosProps) => {

  const handleImageSource = () => {
    if (nombre_decreto === "Inmueble") return inmueblesSVG
    if (nombre_decreto === "Establecimiento") return establecimientoSVG
    else if (nombre_decreto === "Banco") return saldos_bancoSVG
    else if (nombre_decreto === "Salario") return salarioSVG
    else if (nombre_decreto === "Automovil") return vehiculosSVG
    else if (nombre_decreto === "Fondo de Pensiones") return pensionSVG
    else return salarioSVG
  }

  return (
    <article className='container_show_decreto'>
      <img
        src={handleImageSource()}
        alt="Icon"
      />

      <span>{nombre_decreto}</span>

      <div className='section_botones_decretos'>
        <button
          onClick={click_agregar}
        >+</button>

        <button
          onClick={click_eliminar}
        >-</button>
      </div>

    </article>
  )
}

export default AñadirDecretos