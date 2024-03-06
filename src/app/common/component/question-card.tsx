import { Card, CardContent, Typography } from "@mui/material"
import { Question } from "../../model/model"
import { AnswerGiven, AnswersGroup } from "./answers-group"

type QuestionCardProps = {
    question: Question,
    answersGiven?: AnswerGiven[]
  }
  
export const QuestionCard = ({ question, answersGiven }: QuestionCardProps) => {
  
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