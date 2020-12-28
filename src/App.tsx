import * as React from 'react'
import { fetchQuizQuestions } from './API'
// Components
import QuestionCard from './components/QuestionCard'
// Types
import { QuestionState, Difficulty } from './API'
// Styles
import styles from './App.module.scss'

export type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

const TOTAL_QUESTIONS = 10

function App() {
  const [loading, setLoading] = React.useState(false)
  const [questions, setQuestions] = React.useState<QuestionState[]>([])
  const [number, setNumber] = React.useState(0)
  const [userAnswers, setUserAnswers] = React.useState<AnswerObject[]>([])
  const [score, setScore] = React.useState(0)
  const [gameOver, setGameOver] = React.useState(true)

  console.log()

  const startTrivia = async () => {
    setLoading(true)
    setGameOver(false)

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY,
    )

    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // Users answer
      const answer = e.currentTarget.value
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer
      e.currentTarget.classList.add(correct ? 'correct' : 'incorrect')
      // Add score if answer is correct
      if (correct) setScore(prev => prev + 1)
      // Save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }

      setUserAnswers(prev => [...prev, answerObject])
    }
  }

  const nextQuestion = () => {
    // Move on to the next question if not the last question

    const nextQuestion = number + 1

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setNumber(nextQuestion)
    }
  }

  return (
    <>
      <div className={styles.App}>
        <h1>REACT + TS QUIZ</h1>

        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className={styles.start} onClick={startTrivia}>
            START
          </button>
        ) : null}

        {!gameOver ? <p className="score">Score: {score}</p> : null}

        {loading && <p>Loading Questions...</p>}

        {!loading && !gameOver && (
          <QuestionCard
            questionNumber={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}

        {!gameOver &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className={styles.next} onClick={nextQuestion}>
            NEXT QUESTION
          </button>
        ) : null}
      </div>
    </>
  )
}

export default App
