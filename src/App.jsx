import Header from"./components/Header"
import Quizz from"./components/Quizz"
import SelectQuizzes from "./components/SelectQuizzes"
import { QuizProvider } from "./QuizContext";


function App() {

  return (
     <QuizProvider>
    <>
      <Header/>
      <SelectQuizzes/>
      <Quizz/>
      <p>Quizzes created by chatgpt, not me</p>
    </>
    </QuizProvider>
  )
}

export default App
