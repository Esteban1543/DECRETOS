import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import GavelIcon from '@mui/icons-material/Gavel';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

import '../../assets/styles/ModalDatosEncabezados.css';
import Redirigir from '../atoms/Redirigir.tsx';
import { URI } from '../../config.ts';
import { useGetData } from '../../hooks/useGetData.tsx';
import { JuzgadosType, CiudadesType, ProccesosType } from '../../helpers/Types.ts';
import RowDesplegableDatosEncabezados from '../organism/admin/RowDesplegableDatosEncabezados.tsx';

export default function ModalDatosEncabezados() {

  //🔸 Manejo de apertura y cierre para Modal
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true)
    handleRefetch()
  };
  const handleClose = () => setOpen(false);

  //🔸 Fecth de Datos para Selects
  const juzgadosApi = useGetData<JuzgadosType>(`${URI}/origen`);
  const procesosApi = useGetData<ProccesosType>(`${URI}/proceso`);
  const ciudadesApi = useGetData<CiudadesType>(`${URI}/ciudad`);

  const handleRefetch = () => {
    juzgadosApi.refetch()
    procesosApi.refetch()
    ciudadesApi.refetch()
  }

  return (
    <>
      <Redirigir
        click={handleClickOpen}
      />

      <Dialog
        fullWidth
        maxWidth={'sm'}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          <h2
            style={{ margin: 0, color: '#31363F', textAlign: 'center' }}
          >Datos Encabezados</h2>
        </DialogTitle>

        <DialogContent>
          <article className='cont_rows_datosEncabezados'>
            <RowDesplegableDatosEncabezados
              titulo='Juzgados'
              listado={juzgadosApi.data?.data || []}
              refetch={juzgadosApi.refetch}
              tipo='origen'
            >
              <GavelIcon fontSize='large' />
            </RowDesplegableDatosEncabezados>

            <RowDesplegableDatosEncabezados
              titulo='Procesos'
              listado={procesosApi.data?.data || []}
              refetch={procesosApi.refetch}
              tipo='proceso'
            >
              <AccountTreeIcon fontSize='large' />
            </RowDesplegableDatosEncabezados>

            <RowDesplegableDatosEncabezados
              titulo='Ciudades'
              listado={ciudadesApi.data?.data || []}
              refetch={ciudadesApi.refetch}
              tipo='ciudad'
            >
              <ApartmentIcon fontSize='large' />
            </RowDesplegableDatosEncabezados>
          </article>
        </DialogContent>

        <DialogActions>
          <Button
            color='error'
            onClick={handleClose}
          >Cerrar</Button>
        </DialogActions>

      </Dialog>
    </>
  );
}