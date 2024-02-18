import Image from "next/image";
import styles from "./question.module.css";
import DsTable, { ColumnDefinition } from "../common/ds-table";
import { Chip } from "@mui/material";
import { AnswersGroup } from "./answers-group";
//import { useEffect, useState } from "react";

// type QuestionKeys = 'id' | 'text' | 'questionType'

//const questionKeysList = ['id', 'text', 'questionType'] as const;
//type QuestionKeys = typeof questionKeysList[number];
//
//type Question = {
//  [K in QuestionKeys]: K extends 'id' ? number : string;
//};
type Question = {
  id: number,
  text: string,
  questionType: { id: string },
  answers: { id: number, text: string, correct: boolean }[],
  description: string,
}



const columnsDefinition: ColumnDefinition<keyof Question>[] = [
  { 
    key: 'text',
    label: 'Question',
    minWidth: 100,
  },
  {
    key: 'questionType',
    label: 'Type',
    minWidth: 90,
    format: ({ id }) => <Chip label={id} />,
  },
  {
    key: 'answers',
    label: 'Answers',
    minWidth: 370,
    format: (values: { id: number, text: string, correct: boolean }[]) =>
      <AnswersGroup answers={values}/>
  },
];





export default async function Questions() {

  const questions: Question[] = await fetch(
    'http://localhost:8080/api/questions?page=0&size=60', 
    { cache: 'no-store' })
  .then(response => response.json())


  return (
    <div style={{ padding: '1rem', maxWidth: '1280px', margin: 'auto' }}>

      <DsTable<Question>
        columnsDefinition={columnsDefinition}
        rows={questions}

      />

      {
          questions.map((q) => {
            return (
              <p>
                { q.text }
              </p>
            )
          })
        }
    </div>
  );
}
