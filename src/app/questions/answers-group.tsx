
import { Box, ListItem, ListItemButton, ListItemText, SxProps, Theme, Typography } from "@mui/material"
import DraftsIcon from '@mui/icons-material/Drafts';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

type Answer = { id: number, text: string, correct: boolean, isChecked: boolean }

type AnswerState = 'default' | 'correct-not-answered' | 'wrong-not-answered' | 'correct' | 'wrong' 


type AnswersGroupProps = {
  answers: Answer[]
}


const questionSxs: Record<AnswerState, SxProps<Theme>> = {
  'default': { border: '1px solid black' },
  'correct': { background: '#33ce84', color:'white'},
  'wrong': { background: '#f55151', color:'white' },
  'correct-not-answered': { border: '1px solid lime' }
}

const getStyleByAnswer = ({ correct, isChecked }: Answer): SxProps<Theme> => {
  if(correct && isChecked) 
    return questionSxs['correct']
  if(correct && !isChecked) 
    return questionSxs['correct-not-answered']
  if(!correct && isChecked) 
    return questionSxs['wrong']
  return questionSxs['default']
}


export const AnswersGroup = ({ answers }: AnswersGroupProps) => {

  if(!answers || answers.length == 0)
    return <></>
  
  return <>
    <ListItem sx={{ flexDirection: 'column', gap: '4px' }} alignItems="flex-start" disablePadding>
      {
        answers.map(answer => {
          answer.isChecked = true;
          const sx = getStyleByAnswer(answer)
          return ( 
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', borderRadius: '0.65rem', padding: '0.7rem', gap: '0.5rem', ...sx }} >
            { answer.correct
              ? <CheckCircleIcon sx={{ alignSelf: 'center', color: 'white' }} color="success"/>
              : <CancelIcon sx={{ alignSelf: 'center', color: 'white' }}/>} 
            <Box sx={{ fontWeight: 'medium' }}>
              <Typography sx={{ marginTop: '1px' }}>{answer.text}</Typography>
            </Box >
          </Box>
        )}
      )}
    </ListItem>
  </>
} 