'use client'

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { SortDirection } from '../model/model';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { NoDataRow } from './no-data-row';
import { PaginationResult } from '../hook/use-pagination';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

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
  pagination: PaginationResult,
  isLoading: boolean,
}

// const filterIcon: Record<SortDirection | 'NONE', any> = {
//   'ASC': <ArrowDownwardIcon color='success'/>,
//   'DESC': <ArrowUpwardIcon color='success'/>,
//   'NONE': <ArrowUpwardIcon color='disabled'/>
// }



export default function DsTable<Row extends { id: number; [key: string]: any }>({
  columnsDefinition,
  rows,
  pagination,
  isLoading = true
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
  const renderSkeletonCells = () => {
    return [1,2,3].map(row =>
      <TableRow>
        {
          columnsDefinition.map(col =>
            <TableCell>
              <Skeleton count={10} height={'100px'}/>
            </TableCell>  
          )
        }
      </TableRow> 
      )
  }
  
  const transformValueToDisplayFormat = (columnDefinition: ColumnDefinition<keyof Row>, value: any) => {
    return columnDefinition?.format?.(value) ?? value
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    <TableContainer sx={{ height: '70vh' }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columnsDefinition.map((columnDef) => (
              <TableCell
                key={columnDef.key.toString()}
                align={columnDef.align ?? 'justify'}
                style={{ minWidth: columnDef.minWidth, fontWeight: 'bold' }}
                width={ columnDef.minWidth }
              >
                {columnDef.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>          
          
          { isLoading && renderSkeletonCells() }
          { !isLoading && rows.length == 0 && <NoDataRow/> }
            
          {rows.map(row => {
              return (
                <TableRow hover tabIndex={-1} key={row.id}>
                  {columnsDefinition.map(columnDef => {
                    // Skip 'id' column and any other that is not defined in definition(could come from row object but its ignored)
                    const columnDefinition = columnsDefinition.find(cd => cd.key == columnDef.key)
                    if(!columnDefinition) return null
                    const value = row[columnDef.key];
                    return (
                      <TableCell key={row.id + columnDef.key.toString()} align={columnDefinition?.align}>
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
    <TablePagination
     rowsPerPageOptions={[10, 25, 50]}
     component="div"
     count={-1}
     rowsPerPage={pagination.itemsPerPage}
     page={pagination.currentPage}
     onPageChange={(e, page) => { pagination.handlePageChange(page) }}
     onRowsPerPageChange={(e) => { pagination.handleItemsPerPageChange(+e.target.value)}}
   />
   }
  </Paper>
  );
}