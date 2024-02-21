import React from 'react'
import { InfiniteScroll } from '../common/infinite-scroll'
import { Question } from '../model/model'
import { AnswersGroup } from './answers-group'
import { Card, CardContent, Typography } from '@mui/material'

const MobilePage = () => {
  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden'}}>
      <InfiniteScroll<Question>
        itemWrapperSx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
        pageSize={10}
        url={'http://localhost:8080/api/questions'}
        itemComponent={item => 
          <QuestionCard {...item}/>
        }>
      </InfiniteScroll>
    </div>
  )
}

//border: '1px solid gray', padding: '12px'

const QuestionCard = ({ text, answers }: Question) => {
  return(
      <Card variant="outlined">
        <CardContent>
          <Typography fontWeight={'bold'}>{text}</Typography>
          <br/>
          <AnswersGroup answers={answers}/>
        </CardContent>
      </Card>
  )
}



export default MobilePage