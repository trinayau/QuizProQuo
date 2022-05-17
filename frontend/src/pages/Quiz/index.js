import React from "react";
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

  return (
      <div role="quiz-page" id="quiz-page">
        <Questions question={question} index={index} />
        <Answers answer={answer} index={index} />
      </div>
  );
};

export default Quiz;
