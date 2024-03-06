import React, { useEffect } from 'react'
import usePagination from '../hook/use-pagination'
import DsTable, { ColumnDefinition } from '../common/component/ds-table'
import { Question } from '../model/model'
import { Answer, AnswersGroup } from '../common/component/answers-group';
import { Chip } from '@mui/material';
import axios from 'axios';
import { ApiResponse, DsHeaders } from '../common/api';
import { useQuery } from '@tanstack/react-query';

const columnsDefinition: ColumnDefinition<keyof Question>[] = [
  { 
    key: 'text',
    label: 'Question',
    minWidth: 280,
  },
  {
    key: 'answers',
    label: 'Answers',
    minWidth: 370,
    format: (values: Answer[]) =>
      <AnswersGroup answers={values}/>
  },
  {
    key: 'questionType',
    label: 'Type',
    minWidth: 90,
    format: ({ id }) => <Chip label={id} />,
  }
];


const DesktopPage = () => {
  
  const pagination = usePagination({itemsPerPage: 20})

  const { isLoading, error, data: response, refetch } = useQuery<ApiResponse<Question[]>>({
   queryKey: ['QUESTIONS'],
   queryFn: async () => {
   const url = `http://localhost:8080/api/questions`
     const response = await axios.get(url, { params: { page: pagination.currentPage,  size: pagination.itemsPerPage }})
     const questions = response.data
     const headers = new DsHeaders(response.headers);
   const totalItems = headers.getAsNumber('X-Total-Count') 
     if(totalItems)
       pagination.handleTotalItemsChange(totalItems)
     return { questions, headers }
   }
 })
  
 useEffect(() => {
   refetch()
  }, [pagination.currentPage])


  
  return (
    <div>
      <DsTable<Question>
          columnsDefinition={columnsDefinition}
          rows={response?.questions || []}
          isLoading={isLoading}
          pagination={pagination}
        />
    </div>
  )
}

export default DesktopPage