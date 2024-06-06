
import PropTypes from 'prop-types';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatPrices } from '../../../helpers/formatPrices';
import { URI } from '../../../config.js';
import { solicitudPost } from '../../../helpers/solicitudPost.js'
import { useEffect, useState } from 'react'

//🔸 Funciones para formato de precios en celdas
const formatTotal = (value) => {
  return formatPrices(value.total)
};
const formatSaldo = (value) => {
  return formatPrices(value.saldo)
};
const formatFecha = (value) => {
  return value.fecha_registro.split('T')[0]
}
const formatEstado = (value) => {
  // console.log(value)
  return value.saldo != 0 ? '⌛' : '✅'
};

export default function DataTableVentas({ id_vendedor }) {

  const [datosVentas, setdatosVentas] = useState(null)

  useEffect(() => {
    (async () => {
      const ventasVendedor = await solicitudPost(`${URI}/InformeVendedorVentas/${id_vendedor}`, {
        "fecha_inicio": "2024-01-01",
        "fecha_fin": "2024-06-30"
      });
      // console.log(ventasVendedor)

      if (ventasVendedor.status) return setdatosVentas(ventasVendedor.data)

    })()
  }, [id_vendedor])


  return (
    <div className="card">
      <DataTable
        value={datosVentas}
        paginator
        rows={6}
        // rowsPerPageOptions={[6, 10, 25, 50]}
        tableStyle={{ minWidth: '50rem' }}
        // sortMode="multiple"
        sortField="cod_factura"
        sortOrder={-1}
      >
        <Column
          field="cod_factura"
          header="Factura"
          sortable
        />
        <Column
          field="fecha_registro"
          header="Fecha"
          body={formatFecha}
          sortable
        />
        <Column
          field="cliente"
          header="Cliente"
          sortable
        />
        <Column
          field="total"
          header="Monto"
          body={formatTotal}
          sortable
        />
        <Column
          field="pago_total"
          header="Estado"
          body={formatEstado}
          sortable
        />
        <Column
          field="saldo"
          header="Saldo"
          body={formatSaldo}
          sortable
        />
      </DataTable>
    </div>
  );
}

DataTableVentas.propTypes = {
  id_vendedor: PropTypes.number
}