
import { Box, ListItem, ListItemButton, ListItemText, SxProps, Theme, Typography } from "@mui/material"
import DraftsIcon from '@mui/icons-material/Drafts';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export type Answer = { id: number, text: string, correct: boolean }
export type AnswerGiven = { id: number, checked: boolean }

type AnswerState = 'default' | 'correct-not-answered' | 'correct' | 'wrong' 


type AnswersGroupProps = {
  answers: Answer[],
  answersGiven: AnswerGiven[]
}


const questionSxs: Record<AnswerState, { wrapper: SxProps<Theme>, icon: SxProps<Theme> }> = {
  'default': {
    wrapper: { border: '2px solid grey' },
    icon: { color: 'grey' }
  },
  'correct': {
    wrapper: { background: '#3eaf3f', color:'white', borderColor: '#3eaf3f'},
    icon: {}
  },
  'wrong': {
    wrapper: { border: '2px solid #f55151', background: '#fde9ea', color: '#f55151'},
    icon: {}
  },
  'correct-not-answered': {
    wrapper: { border: '2px solid #3ebd3f', background: '#f0f9ee', color: '#3eaf3f'},
    icon: { color: '#3ebd3f' }
  }
}

const getStyleByAnswer = (answer: Answer, answerGiven: AnswerGiven | undefined): { wrapper: SxProps<Theme>, icon: SxProps<Theme> } => {
  if(answer.correct && answerGiven?.checked) 
    return questionSxs['correct']
  if(answer.correct && !answerGiven?.checked) 
    return questionSxs['correct-not-answered']
  if(!answer.correct && answerGiven?.checked) 
    return questionSxs['wrong']
  return questionSxs['default']
}


export const AnswersGroup = ({ answers, answersGiven }: AnswersGroupProps) => {

  if(!answers || answers.length == 0)
    return <></>
  
  return <>
    <ListItem sx={{ flexDirection: 'column', gap: '4px' }} alignItems="flex-start" disablePadding>
      {
        answers.map(answer => {
          const answerGiven = answersGiven?.find(ag => ag.id == answer.id);
          const sx = getStyleByAnswer(answer, answerGiven)
          return ( 
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', borderRadius: '0.65rem', padding: '0.7rem', gap: '0.5rem', ...sx.wrapper }} >
            { answer.correct
              ? <CheckCircleIcon sx={{ alignSelf: 'center', ...sx.icon }}/>
              : <CancelIcon sx={{ alignSelf: 'center', ...sx.icon }}/>
            } 
            <Typography sx={{ marginTop: '1px' }}>{answer.text}</Typography>
          </Box>
        )}
      )}
    </ListItem>
  </>
} 