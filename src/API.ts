import { shuffleArray } from './utils'

export type Question = {
  category: string
  correct_answer: string
  difficulty: string
  incorrect_answers: string[]
  question: string
  type: string
}

export type QuestionState = Question & { answers: string[] }

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'med',
  HARD = 'hard',
}

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty,
) => {
  const endpoint = `https://opentdb.com/api.php?amounts=${amount}&difficulty=${difficulty}&type=multiple`

  try {
    const data = await (await fetch(endpoint)).json()

    if (data.results.length) {
      return data.results.map((question: Question) => ({
        ...question,
        answers: shuffleArray([
          ...question.incorrect_answers,
          question.correct_answer,
        ]),
      }))
    } else {
      throw new Error(`No questions found`)
    }
  } catch (error) {
    throw new Error(error)
  }
}
