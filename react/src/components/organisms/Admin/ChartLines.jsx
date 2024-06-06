import { ventasPrueba } from '../../../helpers/datosPrueba';
// import { useEffect, useState } from 'react'
import { Chart } from 'primereact/chart';
import PropTypes from 'prop-types'
import { useGetData } from '../../../hooks/useGetData';
import { URI } from '../../../config';

const documentStyle = getComputedStyle(document.documentElement);
const textColor = documentStyle.getPropertyValue('--text-color');
const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

export default function ChartLines() {

  const {data, loading, refetch, error} = useGetData(`${URI}/InformeVentasMes`);
  // console.log(data)

  // const agruparDataMeses = ventasPrueba.reduce((acc, curr) => {
  const agruparDataMeses = data && data.data.reduce((acc, curr) => {
    const { vendedor, ventas } = curr;
    if (!acc[vendedor]) acc[vendedor] = { label: vendedor, data: [] };
    acc[vendedor].data.push(ventas);
    return acc;
  }, {});

  const ventasVendedor = agruparDataMeses && Object.values(agruparDataMeses).map(item => ({
    ...item,
    borderWidth: 1
  }));


  // Datos Grafico Lineas
  const dataVentasLine = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: ventasVendedor
  };

  const optionsVentasLine = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          fontColor: textColor
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
          font: {
            weight: 500
          }
        },
        grid: {
          display: false,
          drawBorder: false
        }
      },
      y: {
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder,
          drawBorder: false
        }
      }
    }
  };

  return (
    <div className="card div_chart">
      <h4>Ventas por Vendedor</h4>
      <Chart type="line" data={dataVentasLine} options={optionsVentasLine} height='312px' />
    </div>
  )
}

ChartLines.propTypes = {
  apiData: PropTypes.object
}