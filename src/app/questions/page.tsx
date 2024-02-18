'use client'

import Image from "next/image";
import styles from "./question.module.css";
import DsTable, { ColumnDefinition } from "../common/ds-table";
import { Box, Chip } from "@mui/material";
import { AnswersGroup } from "./answers-group";
import { Question } from "../model/model";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";


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





export default function Questions() {

  const { isLoading, error, data: questions } = useQuery<Question[]>({
    queryKey: ['QUESTIONS'],
    queryFn: () =>
      fetch('http://localhost:8080/api/questions?page=0&size=50').then((res) =>
        res.json(),
      ),
  })

  return (
    <div style={{ padding: '1rem', maxWidth: '1280px', margin: 'auto' }}>
      
      <DsTable<Question>
        columnsDefinition={columnsDefinition}
        rows={questions || []}
        isLoading={isLoading}
      />
    </div>
  );
}
