import React, { useState } from 'react'
import FontDownloadOutlinedIcon from '@mui/icons-material/FontDownloadOutlined';
import Button from '@mui/material/Button';
import SeccionRedaccionActas from './SeccionRedaccionActas';
import TablaDigitadorActas from '../organism/TablaDigitadorActas';
import HeaderRedaccion from '../atoms/HeaderRedaccion';
import { ActasType } from '../../helpers/Types';

interface ContenidoHomeDigitadorProps {
  id_digitador: number,
  datosTabla: Array<ActasType>,
  refetch: ()=> void
}

const ContenidoHomeDigitador = ({ id_digitador, datosTabla, refetch }: ContenidoHomeDigitadorProps) => {
  //🔸 Setear Contenido 
  const [contenido, setContenido] = useState('tabla');

  return (
    <article className="container_contenido_digitador">
      {
        contenido !== 'tabla'
          ? (
            <SeccionRedaccionActas
              id_digitador={id_digitador}
              setContenido={setContenido}
              refetch={refetch}
            />
          ) : (
            <>
              <header className="header_contenido_digitador">
                <span className="header_title">Sistema Digitación</span>

                <div className='container_boton_contenido'>
                  <Button
                    variant="outlined"
                    size='large'
                    endIcon={<FontDownloadOutlinedIcon />}
                    onClick={() => setContenido('redaccion')}
                    style={{ height: '70%' }}
                  >
                    Iniciar Redacción
                  </Button>
                </div>
              </header>

              <section className="card_contenido_digitador container_tabla_digitador">
                <HeaderRedaccion titulo="Actas Digitadas" />

                <article className="section_tabla_ventas">
                  <TablaDigitadorActas
                    datosTabla={datosTabla}
                  />
                </article>

              </section>
            </>
          )
      }

    </article>
  )
}

export default ContenidoHomeDigitador