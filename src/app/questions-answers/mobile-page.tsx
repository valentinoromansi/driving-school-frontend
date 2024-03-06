
import React, { useState } from 'react'
import { InfiniteScroll } from '../common/component/infinite-scroll'
import { Question } from '../model/model'
import { AnswerGiven, AnswersGroup } from '../common/component/answers-group'
import { Box, Button, Card, CardContent, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material'
import { Cancel, SearchOutlined, Visibility } from '@mui/icons-material'
import { useForm } from 'react-hook-form';
import { API_ENDPOINT, BASE_URL, getQuestions } from '../common/api'
import { QuestionsFilter } from '../model/filter'
import { QuestionCard } from '../common/component/question-card'

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
        fetchFunction={getQuestions}
        itemComponent={question => {
          return <QuestionCard question={question}/>
        }
        }>
      </InfiniteScroll>
    </div>
  )
}




export default MobilePage