/* eslint-disable react/react-in-jsx-scope */
import { ActasType } from '../../../helpers/Types';
import { useGetData } from '../../../hooks/useGetData';
import { URI } from '../../../config';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


interface CardFacturasListaProps {
  id_persona: number,
  fecha_inicio?: string,
  fecha_fin?: string,
  titulo_card: string,
  endpoint: string,
}

function CardFacturasLista({ endpoint, id_persona, fecha_inicio, fecha_fin, titulo_card }: CardFacturasListaProps) {

  //🔸 Traer datos de facturas por vendedor
  const { loading, data, error } = useGetData<ActasType>(`${URI}${endpoint}/${id_persona}`);
  if (!loading && error) {
    console.log(error);
    return null;
  }

  return (
    <section className='container_sells'>

      <header>
        <h2>{titulo_card}</h2>
        {/* <h3>{fecha_inicio.split('T')[0]} / {fecha_fin.split('T')[0]}</h3> */}
      </header>

      <section className='container_listado_facturas'>
        {
          id_persona === 0
            ? <h3>Seleccione un Usuario📌</h3>
            : (
              <>
                {
                  !loading
                    ? (data?.data &&
                      data?.data?.length !== 0
                      ? (
                        data?.data.map((r, i) => (
                          <details
                            key={i}
                            className='card_despliegue_facturas'
                          >
                            <summary>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <ExpandMoreIcon />
                                Acta con Radicado:
                              </div>

                              <div>
                                {r.id_acta}
                              </div>
                            </summary>

                            <section className='section_desplegable'>
                              <div className='details_datos_cliente'>

                                <strong>Demandante</strong>
                                <span>{r.demandante}</span>

                                <strong>Demandando</strong>
                                <span>{`${r.demandado}`}</span>

                                <strong>Proceso</strong>
                                <span>{`${r.proceso}`}</span>

                                <strong>Fecha</strong>
                                <span>{r.fecha_registro?.split('T')[0]}</span>

                                <strong>Provincia</strong>
                                <span>{`${r.provincia}`}</span>
                              </div>

                              <div className='details_valores_factura'>
                                <h4>Decretos Anexados: {r.decretos.split(',').length}</h4>
                                {
                                  r.decretos.split(',').map((m, i) => (
                                    <li
                                      key={i + 'decreto'}
                                    >
                                      ▪️{m}
                                    </li>
                                  ))
                                }
                              </div>
                            </section>
                          </details>
                        ))
                      ) : (
                        <div style={{width: '80%', margin: 'auto'}}>
                          <h3> El sistema no registra Actas digitadas por este usuario. 😔</h3>
                        </div>
                      )
                    ) : (
                      <h3>Cargando...</h3>
                    )
                }
                <p
                  className='footer_text_sells'
                >Total de actas:
                  <strong> {data?.data?.length || 0}</strong>
                </p>
              </>
            )
        }
      </section>
    </section>
  )
}

export default CardFacturasLista