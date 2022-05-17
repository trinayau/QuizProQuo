import React from "react";
import "./style.css";
import { useSelector } from "react-redux";
const Questions = (props) => {
  const results = useSelector((state) => state.quizReducer.results);

  const quizLength = results.length;

  const handleQuestions = (question) => {
    return decodeURIComponent(question);
  };

  handleQuestions(props.question);

  let questionNo = props.index + 1;
  return (
    <>
      <div role="quizCard" id="quizCard">
        <h3 role="heading" id="quiz-heading">
          Question {questionNo} of {quizLength}
        </h3>
        {handleQuestions(props.question)}
      </div>
    </>
  );
};

export default Questions;
