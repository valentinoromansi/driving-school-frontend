'use client'

import Image from "next/image";
import styles from "./question.module.css";
import DsTable, { ColumnDefinition } from "../common/ds-table";
import { Box, Chip } from "@mui/material";
import { AnswersGroup } from "./answers-group";
import { Question } from "../model/model";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import usePagination from "@mui/material/usePagination/usePagination";
import { DsHeaders, HeaderKey } from "../common/ds-headers";


//import { useEffect, useState } from "react";

// type QuestionKeys = 'id' | 'text' | 'questionType'

//const questionKeysList = ['id', 'text', 'questionType'] as const;
//type QuestionKeys = typeof questionKeysList[number];
//
//type Question = {
//  [K in QuestionKeys]: K extends 'id' ? number : string;
//};


export type Filter = {
  question: string;
}



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


type ApiResponse = {
  questions: Question[];
  headers: DsHeaders
}


export default function Questions() {

  //const { items } = usePagination()

  const { isLoading, error, data: response } = useQuery<ApiResponse>({
    queryKey: ['QUESTIONS'],
    queryFn: async () => {
      const response =  await fetch('http://localhost:8080/api/questions?page=0&size=50')
      const questions = await response.json()
      const headers = response.headers;
      console.log(headers.get(HeaderKey["X-Total-Count"]))
      return { questions, headers: new DsHeaders(headers) }
    }
  })

  return (
    <div style={{ padding: '1rem', maxWidth: '1280px', margin: 'auto' }}>
      <p>
        {
          JSON.stringify(response?.headers.get('X-Total-Count'))
        }
      </p>
      <DsTable<Question>
        columnsDefinition={columnsDefinition}
        rows={response?.questions || []}
        isLoading={isLoading}
      />
    </div>
  );
}
