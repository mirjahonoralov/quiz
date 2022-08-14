import React from "react";
import {
  MapContainer,
  MapContent,
  Score,
  Select,
  StopTest,
  TestNum,
} from "./style";
import { InfoCircleOutlined } from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
import { useState } from "react";
import { setFinished, setQuestionNumber } from "../../store/slices/quiz-slice";
import { useDispatch, useSelector } from "react-redux";

const Map = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const quizState = useSelector((state) => state.quiz);
  const { questions, questionNumber, score, isFinished } = quizState;
  const testsAmount = questions.length;

  const showModal = () => setIsModalVisible(true);

  const handleOk = () => {
    setIsModalVisible(false);
    dispatch(setFinished());
  };

  const handleCancel = () => setIsModalVisible(false);

  return (
    <MapContainer>
      <MapContent padding={testsAmount > 20}>
        {questions &&
          questions.map((item, index) => (
            <Select currentTest={questionNumber === index} key={item.id}>
              <TestNum
                onClick={() => dispatch(setQuestionNumber(index))}
                isTrue={item?.status}
              >
                {index + 1}
              </TestNum>
            </Select>
          ))}
      </MapContent>
      <StopTest
        isFinished={isFinished}
        onClick={!isFinished ? showModal : undefined}
      >
        <InfoCircleOutlined /> Stop the Test
      </StopTest>
      {isFinished && <p>Test finished</p>}

      <Modal
        title={
          <p style={{ color: "red", margin: "0" }}>Are you sure to stop test</p>
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Score>
          <h2>
            You scored <span>{score}</span> out of {testsAmount}
          </h2>
        </Score>
      </Modal>
    </MapContainer>
  );
};

export default Map;
