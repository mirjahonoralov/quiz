import { CheckCircleOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import Map from "../Map";
import { useSelector, useDispatch } from "react-redux";
import {
  Answers,
  Btn,
  Card,
  CardContent,
  Check,
  Container,
  Controls,
  QuestionText,
  Wrapper,
} from "./style";
import {
  check,
  next,
  onChangeQuestion,
  prev,
} from "../../store/slices/quiz-slice";
import Answer from "./Answer";
import Loading from "../Loading";

const Quiz = () => {
  const quizState = useSelector((state) => state.quiz);
  const {
    questions,
    questionNumber,
    currentQuestion,
    score,
    isFinished,
    isDataFetched,
  } = quizState;

  const dispatch = useDispatch();

  useEffect(() => {
    if (questions) dispatch(onChangeQuestion());
  }, [dispatch, questionNumber, questions]);

  if (!isDataFetched) return <Loading />;

  return (
    <Container>
      <Wrapper>
        <Card>
          <CardContent>
            <p>
              QUESTION - <span>{questionNumber + 1}</span> / {questions.length}
            </p>
            <h2>
              Score: <span>{score}</span>
            </h2>
          </CardContent>
          <QuestionText>{currentQuestion?.question}</QuestionText>
          <Answers>
            {currentQuestion?.answers.map((item, id) => (
              <Answer id={id} item={item} />
            ))}
          </Answers>
        </Card>
        <Controls>
          <Btn onClick={() => dispatch(prev())}>Prev</Btn>
          <Check
            onClick={() => currentQuestion.selectedAnswer && dispatch(check())}
            disabled={
              currentQuestion.checked ||
              isFinished ||
              !currentQuestion.selectedAnswer
            }
          >
            check <CheckCircleOutlined />
          </Check>
          <Btn onClick={() => dispatch(next())}>Next</Btn>
        </Controls>
      </Wrapper>
      <Map />
    </Container>
  );
};

export default Quiz;
