import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./Quizz.css";
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Quizz() {
  const [showAnswer,setShowAnswer] = useState(false)
  const [questions, setQuestions] = useState(null);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [selected,setSelected] = useState(null)
  //seed tha đổi => tạo order mới để play again
  const [seed, setSeed] = useState(0);

  const file = 'questions2.vi.json'; 
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}${file}`)
      .then((res) => res.json())
      .then(setQuestions)
      .catch(console.error);
  }, []);
  // tạo và xáo 1 mảng stt có độ dài QUESTIONS.length
  const order = useMemo(() => {
    if (!questions) {
      return [];
    }
    return shuffle(Array.from({ length: questions.length }, (_, i) => i));
  }, [seed, questions]);
  const total = order.length;
  //chuyền vào current 1 câu hỏi có stt ngẫu nhiên đã đc xáo
  const current = questions && order.length ? questions[order[idx]] : null;

  function handleNext() {
      console.log(current.answer);
      console.log(selected)
      if(!showAnswer){
        if (current && current.answer === selected) {
          setScore((prev) => prev + 1);
        }
        setShowAnswer(true)
        return;
      }

      setShowAnswer(false);
      setSelected(null)
      setIdx((prev) => {
        const next = prev + 1;
        if (next >= total) {
          setDone(true);
          return prev;
        }
        return next;
      });
    }
  
  

  const handleRestart = useCallback(() => {
    setSeed((s) => s + 1);
    setIdx(0);
    setScore(0);
    setDone(false);
    showAnswer(false)
  });

  if (!questions || order.length === 0) {
    return <div>Loading quizz…</div>;
  }
  if (done) {
    return (
      <div>
        <h1>{score < total ? "You Lose" : "You win"}</h1>
        <h3>score: {Math.round((score/total)*100)}%</h3>
        <button onClick={handleRestart}>Play again</button>
      </div>
    );
  }

  return (
    <div>
      <div>
        <p>quizz {idx + 1}/{total} score: {score}</p>

      <h2>
        quizz {idx + 1}: {current.q}
      </h2>
      <ul>
        {current.options.map((opt, index) => (
          <li key={opt}>
            <button className={showAnswer? opt === current.answer? "correct": selected === opt? "wrong": "": selected === opt? "selected": ""}
             onClick={() => !showAnswer&&setSelected(opt)} disabled={showAnswer}>
              {index + 1}. {opt}
            </button>
          </li>
        ))}
      </ul>
      </div>
      <div className="btn-next"><button onClick={handleNext}>{!showAnswer?"check":selected?"next":"skip"}</button></div>
      
    </div>
  );
}
