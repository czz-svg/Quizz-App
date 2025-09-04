import { createContext, useState } from "react";

export const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [quizFile, setQuizFile] = useState("questions2.vi.json"); // mặc định

  return (
    <QuizContext.Provider value={{ quizFile, setQuizFile }}>
      {children}
    </QuizContext.Provider>
  );
}
