import { useEffect } from "react";
import PropTypes from "prop-types";
import Informes from "../../templates/Informes";
import { useGetData } from "../../../hooks/useGetData";
import { URI } from "../../../config";
import { formatPercents } from "../../../helpers/formatPercents";

export default function CardInformesDasbh({ nombres}) {


  //🔸 Traer datos de ventas por vendedor
  const { data, loading } = useGetData(`${URI}/InformeVendedores/2024-01-01/2024-05-31`);
  // console.log(data)
    
  let porcentaje_v1 = formatPercents(data?.data[0].facturas_saldadas, data?.data[0].ventas_realizadas) || '0%'
  let porcentaje_v2 = formatPercents(data?.data[1].facturas_saldadas, data?.data[1].ventas_realizadas) || '0%'
  let porcentaje_v3 = formatPercents(data?.data[2].facturas_saldadas, data?.data[2].ventas_realizadas) || '0%'
  let porcentaje_v4 = formatPercents(data?.data[3].facturas_saldadas, data?.data[3].ventas_realizadas) || '0%'

  // console.log(porcentaje_v1, porcentaje_v2, porcentaje_v3, porcentaje_v4)
  useEffect(() => {
    //🔸 Configurar las variables con el porcentaje para las barras en CSS
    const vendedor1 = document.getElementById("vendedor1");
    vendedor1.style.setProperty("--porcentaje-1", porcentaje_v1);

    const vendedor2 = document.getElementById("vendedor2");
    vendedor2.style.setProperty("--porcentaje-2", porcentaje_v2);

    const vendedor3 = document.getElementById("vendedor3");
    vendedor3.style.setProperty("--porcentaje-3", porcentaje_v3);

    const vendedor4 = document.getElementById("vendedor4");
    vendedor4.style.setProperty("--porcentaje-4", porcentaje_v4);

  }, [porcentaje_v1, porcentaje_v2, porcentaje_v3, porcentaje_v4]);


  return (
    <aside className="card_informes">
      <header className="titulo_card_informes">
        <h3>Informes</h3>
        <div className="tag_card_information" style={{width:'40px'}}>Cobros</div>
        <Informes nombres={nombres} />
      </header>

      <article className="container_porcentajes">
        <section>
          <div className="label_porcentajes">
            <span>{loading ? '...' : `${data?.data[0].alias} - ${data?.data[0].vendedor}`}</span>
            <span>{loading ? '0%' : porcentaje_v1}</span>
          </div>

          <div className="barras_porcentaje">
            <div id="vendedor1" />
          </div>
        </section>

        <section>
          <div className="label_porcentajes">
            <span>{loading ? '...' : `${data?.data[1].alias} - ${data?.data[1].vendedor}`}</span>  
            <span>{loading ? '0%' : porcentaje_v2}</span>
          </div>

          <div className="barras_porcentaje">
            <div id="vendedor2" />
          </div>
        </section>

        <section>
          <div className="label_porcentajes">
          <span>{loading ? '...' : `${data?.data[2].alias} - ${data?.data[2].vendedor}`}</span>
            <span>{loading ? '0%' : porcentaje_v3}</span>
          </div>

          <div className="barras_porcentaje">
            <div id="vendedor3" />
          </div>
        </section>

        <section>
          <div className="label_porcentajes">
          <span>{loading ? '...' : `${data?.data[3].alias} - ${data?.data[3].vendedor}`}</span>
            <span>{loading ? '0%' : porcentaje_v4}</span>
          </div>

          <div className="barras_porcentaje">
            <div id="vendedor4" />
          </div>
        </section>

      </article>
    </aside>
  );
}

CardInformesDasbh.propTypes = {
  porcentaje_saldos: PropTypes.string,
  porcentaje_deudores: PropTypes.string,
};
