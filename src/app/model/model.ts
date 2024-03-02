
export const SortDirection = {
  ASC: 'ASC',
  DESC: 'DESC'
} as const
export type SortDirection = keyof typeof SortDirection


export const QuestionType = {
  SELECTED: 'SELECTED',
  TYPED: 2
} as const
export type QuestionType = keyof typeof QuestionType

export type Question = {
  id: number,
  text: string,
  questionType: { id: string },
  answers: { id: number, text: string, correct: boolean }[],
  resources: { id: number, uri: string }[],
  description: string,
}
