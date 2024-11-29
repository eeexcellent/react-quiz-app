import { useCallback, useState } from "react";
import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

import QUESTIONS from "../questions.js";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevAnswers) => {
      return [selectedAnswer, ...prevAnswers];
    });
  }

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img
          src={quizCompleteImg}
          alt="Image that identifies that quiz was completed"
        />
        <h2>Quiz Completed</h2>
      </div>
    );
  }

  const currentQuestion = QUESTIONS[activeQuestionIndex];
  const shuffledAnswers = [...currentQuestion.answers];
  shuffledAnswers.sort((a, b) => Math.random() - 0.5);

  const handleTimeExpired = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleTimeExpired}
        />
        <h2>{currentQuestion.text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
