import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeQuestion, endQuestions } from "../../actions";
import "./style.css";
const Answers = (props) => {
  const nextQuestion = (answer) => dispatch(changeQuestion(answer));
  const endQuestions = (finalAnswer) => dispatch(endQuestions(finalAnswer));
  const results = useSelector((state) => state.quizReducer.results);
  const quizLength = results.length;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuestions = (question) => {
    return decodeURIComponent(question);
  };

  let answers = handleQuestions(props.answers);

  const finalAnswer = async () => {
    endQuestions(props.answer);
    navigate("./scoreboard");
  };

  if (props.index === quizLength - 1) {
    return (
      <button role="button"  id="cards" onClick={finalAnswer}>
        {answers}
      </button>
    );
  } else {
    return (
      <button role="button" id="cards" onClick={() => nextQuestion(props.answer)}>
        {answers}
      </button>
    );
  }
};

export default Answers;
