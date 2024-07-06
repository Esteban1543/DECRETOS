/* eslint-disable react/react-in-jsx-scope */
import { Tooltip } from '@mui/material';
import { DatosEncabezadoType, DecretoType } from '../../helpers/Types';
import { URI } from '../../config';
import axios from 'axios';

interface DescargaPDFProps {
  datosEncabezado: DatosEncabezadoType;
  decretosAnexados: DecretoType[];
  activarBoton: boolean;
}

const DescargaPDF = ({ datosEncabezado, decretosAnexados, activarBoton }: DescargaPDFProps) => {

  const handleDownload = async () => {
    console.log('Datos a enviar:', datosEncabezado, decretosAnexados);

    try {
      const response = await axios.post(`${URI}/downloadActa`, { datosEncabezado, decretosAnexados },
        {
          responseType: 'blob',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      // console.log('Response:', response);

      //🔸 Crear una URL para el blob
      const url = window.URL.createObjectURL(new Blob([response.data]));

      //🔸 Desencadenar una descarga
      const a = window.document.createElement('a');
      a.href = url;
      a.setAttribute('download', `AutoDecretaMedida_${datosEncabezado.radicado}.pdf`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error descargando el PDF', error);
    }
  };

  return (
    <Tooltip
      title={!activarBoton && "Para descargar, debe confirma el documento"}
      placement="top"
    >
      <button
        className={activarBoton ? 'pdf_button pdf_button_active' : 'pdf_button'}
        style={!activarBoton ? { opacity: '.5' } : undefined}
        // disabled={!activarBoton}
        onClick={activarBoton ? handleDownload : undefined}
      >
        <img
          src="/icons/pdf.svg"
          alt="Descargar PDf"
          height={'48px'}
          width={'48px'}
        />
      </button>
    </Tooltip>
  );
};

export default DescargaPDF;