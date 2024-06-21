import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useGetData } from '../../hooks/useGetData';
import { URI } from '../../config';

interface Column {
  id: 'provincia' | 'fk_proceso' | 'demandado' | 'demandante' | 'fecha_registro';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'provincia', label: 'Cod. Folio', minWidth: 170 },
  { id: 'fk_proceso', label: 'Radicado', minWidth: 100 },
  {
    id: 'demandado',
    label: 'Demandado',
    minWidth: 170,
    align: 'right',
    // format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'demandante',
    label: 'Demandante',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'fecha_registro',
    label: 'Fecha Digitado',
    minWidth: 170,
    align: 'right',
  },
];

interface Data {
  provincia: string;
  fk_proceso: string;
  demandado: string;
  demandante: string;
  fecha_registro: string;
}

function createData(
  provincia: string,
  fk_proceso: string,
  demandado: string,
  demandante: string,
  fecha_registro: string
): Data {
  return { provincia, fk_proceso, demandado, demandante, fecha_registro };
}

// const rows = [
//   createData('A2312', '2023-00501-00', 'Demandante', 'Demandado', '2024-08-16'),
//   createData('A2312', '2023-00501-01', 'Demandante', 'Demandado', '2024-08-16'),
//   createData('A2312', '2023-00601-00', 'Demandante', 'Demandado', '2024-08-16'),
//   createData('A2312', '2023-00001-00', 'Demandante', 'Demandado', '2024-08-16'),
//   createData('A2312', '2023-00202-00', 'Demandante', 'Demandado', '2024-08-16'),
//   createData('A2312', '2023-00520-00', 'Demandante', 'Demandado', '2024-08-16'),
//   createData('A2312', '2023-00507-00', 'Demandante', 'Demandado', '2024-08-16'),
//   createData('A2312', '2023-00501-00', 'Demandante', 'Demandado', '2024-08-16'),
//   createData('A2312', '2023-00501-00', 'Demandante', 'Demandado', '2024-08-16'),
//   createData('A2312', '2023-00501-00', 'Demandante', 'Demandado', '2024-08-16'),
//   createData('A2312', '2023-00501-00', 'Demandante', 'Demandado', '2024-08-16'),
//   createData('A2312', '2023-00501-00', 'Demandante', 'Demandado', '2024-08-16'),
//   createData('A2312', '2023-00501-00', 'Demandante', 'Demandado', '2024-08-16',),
//   createData('A2312', '2023-00501-00', 'Demandante', 'Demandado', '2024-08-16'),
//   createData('A2312', '2023-00501-00', 'Demandante', 'Demandado', '2024-08-16'),
// ];

interface ActasType {
  id_acta: string;
  fecha_registro: string;
  proceso: string;
  demandante: string;
  demandado: string;
  provincia: string;
  fk_ciudad: string;
  decretos: string;
}

export default function TablaDigitadorActas({ id_digitador }: { id_digitador?: number }) {

  //🔸Fetch de Datos Tabla
  const { data, loading, error, refetch } = useGetData<ActasType>(`${URI}/actasdigitador/${id_digitador}`);
  // console.log(data, loading, error, refetch);

  const datosTabla = !loading && data?.status && data?.data?.map(m => {
    return createData(m.provincia, m.id_acta, m.demandante, m.demandado, m.fecha_registro.split('T')[0])
  })



  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {datosTabla && datosTabla.length > 0 ? (
              datosTabla
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.provincia}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No aparecen actas registradas al usuario
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[6, 10, 25, 100]}
        component="footer"
        count={ datosTabla ? datosTabla?.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
