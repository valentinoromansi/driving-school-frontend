import React from 'react'
import { InfiniteScroll } from '../common/infinite-scroll'
import { Question } from '../model/model'
import { AnswerGiven, AnswersGroup } from './answers-group'
import { Card, CardContent, Typography } from '@mui/material'

const answersGiven: AnswerGiven[] = [
  { id: 1, checked: true },
  { id: 2, checked: true },
  { id: 3, checked: true },
  { id: 4, checked: false },
  { id: 5, checked: false },
  { id: 6, checked: true }
]

const MobilePage = () => {
  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden'}}>
      <InfiniteScroll<Question>
        itemWrapperSx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
        pageSize={10}
        url={'http://localhost:8080/api/questions'}
        itemComponent={question => {
          return <QuestionCard question={question} answersGiven={answersGiven}/>
        }
        }>
      </InfiniteScroll>
    </div>
  )
}

//border: '1px solid gray', padding: '12px'

type QuestionCardProps = {
  question: Question,
  answersGiven: AnswerGiven[]
}
const QuestionCard = ({ question, answersGiven }: QuestionCardProps) => {

  return(
      <Card variant="outlined">
        <CardContent>
          <Typography fontWeight={'bold'}>{question.text}</Typography>
          <br/>
          <AnswersGroup answers={question.answers} answersGiven={answersGiven}/>
        </CardContent>
      </Card>
  )
}



export default MobilePage