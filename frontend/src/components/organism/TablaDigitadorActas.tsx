import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { ActasType } from '../../helpers/Types.ts';

interface Column {
  id: 'provincia' | 'id_acta' | 'demandado' | 'demandante' | 'fecha_registro';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'id_acta', label: 'Radicado', minWidth: 100 },
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
  { id: 'provincia', label: 'Provincia', minWidth: 170 },
];

interface Data {
  provincia: string;
  id_acta: string;
  demandado: string;
  demandante: string;
  fecha_registro: string;
}

function createData(
  id_acta: string,
  demandado: string,
  demandante: string,
  fecha_registro: string,
  provincia: string,
): Data {
  return { id_acta, demandado, demandante, fecha_registro, provincia };
}

interface TablaDigitadorActasProps {
  datosTabla: Array<ActasType>
}

export default function TablaDigitadorActas({ datosTabla }: TablaDigitadorActasProps) {

  //🔸 Generar filas para tabla
  const filasTabla = datosTabla.map(m => {
    return createData(m.id_acta, m.demandante, m.demandado, m.fecha_registro.split('T')[0], m.provincia)
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
            {filasTabla && filasTabla.length > 0 ? (
              filasTabla
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id_acta}>
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
                  ❗No aparecen actas registradas al usuario 😔
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[6, 10, 25, 100]}
        component="footer"
        count={filasTabla ? filasTabla?.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
