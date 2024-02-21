
import { Box, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import DraftsIcon from '@mui/icons-material/Drafts';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

type Answer = { id: number, text: string, correct: boolean }

type AnswersGroupProps = {
  answers: Answer[]
}

export const AnswersGroup = ({answers}: AnswersGroupProps) => {

  if(!answers || answers.length == 0)
    return <></>
  
  return <>
    <ListItem sx={{ flexDirection: 'column', gap: '4px' }} alignItems="flex-start" disablePadding>
      {
        answers.map(answer =>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '0.5rem' }} >
            { answer.correct 
              ? <CheckCircleIcon sx={{ alignSelf: 'center' }} color="success"/>
              : <CancelIcon sx={{ alignSelf: 'center' }} color="error"/>} 
            <Box  sx={{ fontWeight: 'medium' }}>{answer.text}</Box >
          </Box>
      )}
    </ListItem>
  </>
} 