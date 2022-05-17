import React from "react";
import "./style.css";
import { useSelector } from "react-redux";

const Questions = (props) => {

  const results = useSelector((state) => state.quizReducer.results);
  console.log(results);

  const questionLength = results.length;

  function containsEncodedComponents(question) {
    return decodeURIComponent(question);
  }
  containsEncodedComponents(props.question);

  let questionNumber = props.index + 1;
  console.log(questionNumber);

  return (
    <div role="question-container" id="question-container">
      <h3 style={{ color: "white" }}>
        <span id="question-num">
          Question {questionNumber} of {questionLength}:
        </span>
        <br></br>
        {containsEncodedComponents(props.question)}
      </h3>
    </div>
  );
};

export default Questions;
