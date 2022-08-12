import { CheckCircleOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useState } from "react";
import Map from "../Map";
import {
  Answers,
  Btn,
  Card,
  CardContent,
  Check,
  Container,
  Controls,
  Option,
  QuestionText,
  Wrapper,
} from "./style";

const Quiz = ({ questionData }) => {
  const [questions, setQuestions] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(
    questions?.[questionNumber]
  );
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const next = () => {
    questionNumber + 1 < questions.length &&
      setQuestionNumber((prev) => prev + 1);
    setSelectedAnswer(null);
  };
  const prev = () =>
    questionNumber > 0 && setQuestionNumber((prev) => prev - 1);

  const check = () => {
    if (currentQuestion.correct_answer === selectedAnswer.option) {
      setScore(score + 1);

      setQuestions((prev) => {
        return prev.map((item) => {
          if (item.id === currentQuestion.id)
            return {
              ...currentQuestion,
              checked: true,
              status: true,
              selectedAnswer,
              answers,
            };
          else return item;
        });
      });
    } else
      setQuestions((prev) => {
        return prev.map((item) => {
          if (item.id === currentQuestion.id)
            return {
              ...currentQuestion,
              checked: true,
              status: false,
              selectedAnswer,
              answers,
            };
          else return item;
        });
      });
  };

  useEffect(() => {
    if (questions) {
      const currentQuestion = questions[questionNumber];
      setCurrentQuestion(currentQuestion);

      if (currentQuestion) {
        const randomAnswers = [
          ...currentQuestion?.incorrect_answers,
          currentQuestion?.correct_answer,
        ].sort(() => Math.random() - 0.5);
        setAnswers(randomAnswers);
      }
    }
  }, [questions, questionNumber]);

  useEffect(() => {
    if (questionData)
      setQuestions([
        ...questionData.map((question) => ({
          ...question,
          id: Math.random() * 99999999999,
          checked: false,
        })),
      ]);
  }, [questionData]);

  useEffect(() => {
    if (currentQuestion?.selectedAnswer)
      setSelectedAnswer(currentQuestion.selectedAnswer);
  }, [questionNumber, currentQuestion]);

  useEffect(() => setSelectedAnswer(null), [questionNumber]);

  if (currentQuestion)
    return (
      <Container>
        <Wrapper>
          <Card>
            <CardContent>
              <p>
                QUESTION - <span>{questionNumber + 1}</span> /{" "}
                {questionData.length}
              </p>
              <h2>
                Score: <span>{score}</span>
              </h2>
            </CardContent>
            <QuestionText>{currentQuestion?.question}</QuestionText>
            <Answers>
              {(currentQuestion.checked
                ? currentQuestion.answers
                : answers
              ).map((item, id) => (
                <Option
                  onClick={() =>
                    !currentQuestion.checked &&
                    !isFinished &&
                    setSelectedAnswer({ id, option: item })
                  }
                  selected={selectedAnswer?.option === item}
                  key={id}
                  status={
                    selectedAnswer?.option === item &&
                    currentQuestion.checked &&
                    "false"
                  }
                  correctAnswer={
                    currentQuestion.checked &&
                    item === currentQuestion.correct_answer
                  }
                  isFinished={
                    isFinished && item === currentQuestion.correct_answer
                  }
                >
                  {item}
                </Option>
              ))}
            </Answers>
          </Card>
          <Controls>
            <Btn onClick={prev}>Prev</Btn>
            <Check
              onClick={selectedAnswer && check}
              disabled={
                currentQuestion.checked || isFinished || !selectedAnswer
              }
            >
              check <CheckCircleOutlined />
            </Check>
            <Btn onClick={next}>Next</Btn>
          </Controls>
        </Wrapper>
        <Map
          questions={questions}
          questionNumber={questionNumber}
          setQuestionNumber={setQuestionNumber}
          testsAmount={questions.length}
          score={score}
          setIsFinished={setIsFinished}
          isFinished={isFinished}
        />
      </Container>
    );
};

export default Quiz;
