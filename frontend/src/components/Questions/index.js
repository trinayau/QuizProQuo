import React from "react";
import "./style.css";
import { useSelector } from "react-redux";

const Questions = (props) => {

  const results = useSelector((state) => state.quizReducer.results);

  const questionLength = results.length;

  function containsEncodedComponents(question) {
    return decodeURIComponent(question);
  }
  const decodedQuestion = containsEncodedComponents(props.question);

  let questionNumber = props.index + 1;

  return (
    <div role="question-container" id="question-container">
      <h3 style={{ color: "white" }}>
        <span id="question-num">
          Question {questionNumber} of {questionLength}:
        </span>
        <br></br>
        {decodedQuestion}
      </h3>
    </div>
  );
};

export default Questions;
