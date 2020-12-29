import * as React from 'react'
// Components
import { Quiz } from './components/Quiz'
// Styles
import styles from './App.module.scss'

function App() {
  return (
    <>
      <div className={styles.App}>
        <h1 className={styles.heading}>REACT + TS QUIZ</h1>
        <Quiz />
      </div>
    </>
  )
}

export default App
