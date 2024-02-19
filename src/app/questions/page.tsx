'use client'

import Image from "next/image";
import styles from "./question.module.css";
import DsTable, { ColumnDefinition } from "../common/ds-table";
import { Box, Chip, Input, InputLabel, TextField } from "@mui/material";
import { AnswersGroup } from "./answers-group";
import { Question } from "../model/model";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse, DsHeaders, HeaderKey } from "../common/api";
import usePagination from "../hook/use-pagination";
import InfiniteScroll from "react-infinite-scroll-component";


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
    format: (values: { id: number, text: string, correct: boolean }[]) =>
      <AnswersGroup answers={values}/>
  },
  {
    key: 'questionType',
    label: 'Type',
    minWidth: 90,
    format: ({ id }) => <Chip label={id} />,
  }
];



export default function Questions() {

  const pagination = usePagination({itemsPerPage: 20})

  const [text, setText] = useState("")
  
  const { isLoading, error, data: response, refetch } = useQuery<ApiResponse<Question[]>>({
    queryKey: ['QUESTIONS'],
    queryFn: async () => {
      const url = `http://localhost:8080/api/questions?page=${pagination.currentPage}&size=${pagination.itemsPerPage}`
      const response =  await fetch(url)
      const questions = await response.json()
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
    <div style={{ padding: '1rem', maxWidth: '1280px', margin: 'auto' }}>
      <DsTable<Question>
        columnsDefinition={columnsDefinition}
        rows={response?.questions || []}
        isLoading={isLoading}
        pagination={pagination}
      />
      {
        JSON.stringify(pagination)
      }

    </div>
  );
}
