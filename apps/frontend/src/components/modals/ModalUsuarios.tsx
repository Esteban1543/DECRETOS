import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EastIcon from '@mui/icons-material/East';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import CircleUser from '../atoms/CircleUser';
import { UsuariosType } from '../../helpers/Types';
import ModalDesactivar from './ModalDesactivar';
import ModalEditarUsuario from './ModalEditarUsuario';


interface ModalUsuariosProps {
  datosUsuarios: UsuariosType[],
  refetch: () => void,
}

export default function ModalUsuarios({ datosUsuarios, refetch }: ModalUsuariosProps) {

  //🔸 Manejo de apertura y cierre para Modal
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // console.log(datosUsuarios)

  return (
    <>

      <Button
        onClick={handleClickOpen}
        variant="contained"
        style={{ width: '100%', margin: 'auto', backgroundColor: 'var(--color-azul-deep2)' }}
        endIcon={<EastIcon />}
      >Ver todo</Button>

      <Dialog
        fullWidth
        maxWidth={'md'}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          <strong className='titulo_modal'>Usuarios</strong>
        </DialogTitle>

        <DialogContent>
          <section
            className='container_rows_users'
            style={{ overflow: 'scroll' }}
          >
            {
              !datosUsuarios || datosUsuarios.length < 1
                ? <h3>No hay Información disponible</h3>
                : (
                  datosUsuarios.map(m => (
                    <article
                      className='container_row_card'
                      style={{ gridTemplateColumns: '18% auto 22%', cursor: 'auto', position: 'relative' }}
                      key={m.n_identificacion}
                    >
                      <CircleUser
                        inicial={m.nombre_1.charAt(0)}
                        medida='100px'
                      />

                      <section className='section_datos_personales'
                        style={{ cursor: 'auto' }}
                      >
                        <h3>{`${m.nombre_1} ${m.nombre_2 || ''} ${m.apellido_1} ${m.apellido_2 || ''}`}</h3>
                        <span>{`${m.fk_tipo_identificacion} ${m.n_identificacion}`}</span>
                        <span>{m.alias}</span>
                        <span>{m.telefono}</span>
                        <span style={{ fontSize: '.8rem' }}>
                          <a href={`mailto:${m.correo}`}>{m.correo}</a>
                        </span>
                      </section>

                      <ModalEditarUsuario
                        datos_usuario={m}
                        refetch={refetch}
                      />

                      <section style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', height: '50%' }}>
                        {
                          m.estado_persona === 1
                            ? <TaskAltIcon sx={{ color: '#06D001' }} />
                            : <UnpublishedIcon color='action' />
                        }
                        {
                          m.alias.toLocaleLowerCase() !== 'admin' &&
                          <ModalDesactivar
                            id_usuario={m.n_identificacion}
                            estado_usuario={m.estado_persona}
                            refetch={refetch}
                          />
                        }
                      </section>

                    </article >

                  ))
                )
            }
          </section>
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
