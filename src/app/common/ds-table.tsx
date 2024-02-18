"use server"

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


export type ColumnDefinition<T> = {
  key: T,
  label: string,
  minWidth: number,
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  format?: (value: any) => any
}

type DsTableProps<Row extends { id: number }> = {
  columnsDefinition: ColumnDefinition<keyof Row>[],
  rows: Row[],
}

export default async function DsTable<Row extends { id: number; [key: string]: any }>({
  columnsDefinition,
  rows
} : DsTableProps<Row>) {
  //const [page, setPage] = React.useState(0);
  //const [rowsPerPage, setRowsPerPage] = React.useState(10);

  //const handleChangePage = (event: unknown, newPage: number) => {
  //  setPage(newPage);
  //};
//
  //const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
  //  setRowsPerPage(+event.target.value);
  //  setPage(0);6gtf2
  //};

  const transformValueToDisplayFormat = (columnDefinition: ColumnDefinition<keyof Row>, value: any) => {
    return columnDefinition?.format?.(value) ?? value
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    <TableContainer sx={{ maxHeight: '70vh' }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columnsDefinition.map((columnDef) => (
              <TableCell
                key={columnDef.key.toString()}
                align={columnDef.align ?? 'justify'}
                style={{ minWidth: columnDef.minWidth }}
              >
                {columnDef.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {Object.keys(row).map((rowKey: string) => {
                    // Skip 'id' column and any other that is not defined in definition(could come from row object but its ignored)
                    const columnDefinition = columnsDefinition.find(cd => cd.key == rowKey)
                    if(!columnDefinition) return null
                    const value = row[rowKey];
                    return (
                      <TableCell key={row.id + rowKey} align={columnDefinition?.align}>
                        {
                          transformValueToDisplayFormat(columnDefinition, value)
                        }
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
   {
    /*
     <TablePagination
      rowsPerPageOptions={[10, 25, 100]}
      component="div"
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    */
   }
  </Paper>
  );
}