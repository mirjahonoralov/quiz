import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedAnswer } from "../../store/slices/quiz-slice";
import { Option } from "./style";

const Answer = ({ id, item }) => {
  const quizState = useSelector((state) => state.quiz);
  const { currentQuestion, isFinished } = quizState;

  const dispatch = useDispatch();
  return (
    <Option
      onClick={() =>
        !currentQuestion.checked &&
        !isFinished &&
        dispatch(setSelectedAnswer({ id, option: item }))
      }
      selected={currentQuestion.selectedAnswer?.option === item}
      key={id}
      status={
        ((currentQuestion.selectedAnswer?.option === item &&
          currentQuestion.checked) ||
          (currentQuestion.selectedAnswer?.option === item &&
            currentQuestion.status === false)) &&
        "false"
      }
      correctAnswer={
        currentQuestion.checked && item === currentQuestion.correct_answer
      }
      isFinished={isFinished && item === currentQuestion.correct_answer}
    >
      {item}
    </Option>
  );
};

export default Answer;
