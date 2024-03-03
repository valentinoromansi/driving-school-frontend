
import React, { useState } from 'react'
import { InfiniteScroll } from '../common/infinite-scroll'
import { Question } from '../model/model'
import { AnswerGiven, AnswersGroup } from './answers-group'
import { Box, Button, Card, CardContent, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material'
import { Cancel, SearchOutlined, Visibility } from '@mui/icons-material'
import { useForm } from 'react-hook-form';
import { API_ENDPOINT, BASE_URL, getQuestions } from '../common/api'
import { QuestionsFilter } from '../model/filter'

const answersGiven: AnswerGiven[] = [
  { id: 1, checked: true },
  { id: 2, checked: true },
  { id: 3, checked: true },
  { id: 4, checked: false },
  { id: 5, checked: false },
  { id: 6, checked: true }
]

const MobilePage = () => {

  const [filter, setFilter] = useState<QuestionsFilter>({
    text: ''
  });
  const [appliedFilter, setAppliedFilter] = useState<QuestionsFilter>({
    text: ''
  });

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden'}}>
      <Card sx={{ padding: '16px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '0.5rem' }}>
          <FormControl sx={{ flexGrow: 1 }}>
            <InputLabel>Title</InputLabel>
            <OutlinedInput
              onChange={(e) => { setFilter({...filter, text: e.target.value}) }}
              value={filter.text}
              label="Title"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => { setFilter({...filter, text: ''}) }}
                  >
                    {
                      filter.text && <Cancel/>
                    } 
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Box sx={{ flexShrink: 1 }}>
            <Button 
              onClick={() => { setAppliedFilter({text: filter.text}) }}
              sx={{ flexBasis: '100%', height: '100%'}} variant="contained" endIcon={<SearchOutlined />}
            >
              Search
            </Button>
          </Box>
        </Box>

      </Card>      
      <InfiniteScroll<Question>
        itemWrapperSx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
        pageSize={10}
        filter={{ ...appliedFilter }}
        //url={BASE_URL + API_ENDPOINT}
        fetchFunction={getQuestions}
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
              {
                question.resources?.map(resource => <img style={{ maxWidth: '100%', maxHeight: '12rem' }} src={'https://' + resource.uri}></img>)
              }
          <AnswersGroup answers={question.answers} answersGiven={answersGiven}/>
        </CardContent>
      </Card>
  )
}



export default MobilePage