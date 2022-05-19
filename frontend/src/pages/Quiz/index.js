import React, { useState, useEffect } from "react";
import "./style.css";
import { Questions, Answers } from "../../components";
import { useSelector } from "react-redux";

const Quiz = () => {
  const currentQuestion = useSelector(
    (state) => state.quizReducer.current_question_index
  );
  const result = useSelector((state) => state.quizReducer.results);
  const index = result.indexOf(result[currentQuestion]);
  const question = result[currentQuestion].question;
  const answer = result[currentQuestion].answers;
  const [time, setTime] = useState(15);
  // const [isActive, setIsActive] = useState(true);
  // const resetTimer = () => {
  //   setIsActive(false);
  // };

  // useEffect(() => {
  //    let interval = null;
  //   if (isActive) {
  //     interval = setInterval(() => {
  //       setTime((seconds) => seconds - 1);
  //     }, 1000);
  //   } else if (!isActive) {
  //     clearInterval(interval);
  //   }
  //   return () => clearInterval(interval);
  // }, [isActive, time]);

  return (
      <div role="quiz-page" id="quiz-page">
         <p id="timer"> {time} seconds left</p>
        <Questions question={question} index={index} />
        <Answers answer={answer} index={index} />
      </div>
  );
};

export default Quiz;
