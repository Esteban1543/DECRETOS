
// import { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import PropTypes from 'prop-types'

const documentStyle = getComputedStyle(document.documentElement);
const textColor = documentStyle.getPropertyValue('--text-color');
const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

export default function ChartBarras({ apiData }) {

  // console.log(apiData)

  // const ventasVendedor = !!apiData && apiData.data.data.map( m => ({
  //   label: m.vendedor,
  //   data: [m.total_facturas, m.pago_abonos],
  //   borderWidth: 1,
  // }));

  const vendedores = !!apiData && apiData.data.data.map(m => m.vendedor)
  const montoVendido = !!apiData && apiData.data.data.map(m => m.total_facturas);
  const montoCobrado = !!apiData && apiData.data.data.map(m => m.pago_abonos);

  const data = {
    // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    labels: vendedores,
    datasets: [
      {
        label: 'Monto Vendido',
        backgroundColor: documentStyle.getPropertyValue('--green-400'),
        borderColor: documentStyle.getPropertyValue('--green-400'),
        // data: [65, 59, 80, 81, 56, 55, 40]
        data: montoVendido
      },
      {
        label: 'Monto Cobrado',
        backgroundColor: documentStyle.getPropertyValue('--orange-400'),
        borderColor: documentStyle.getPropertyValue('--orange-400'),
        // data: [28, 48, 40, 19, 86, 27, 90]
        data: montoCobrado
      }
    ]
  };

  const options = {
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
      <h4>Montos por Vendedor</h4>
      <Chart type="bar" data={data} options={options} height='312px'/>
    </div>
  )
}

ChartBarras.propTypes = {
  apiData: PropTypes.object
}