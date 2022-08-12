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

const Map = ({
  questions,
  questionNumber,
  setQuestionNumber,
  testsAmount,
  score,
  setIsFinished,
  isFinished,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setIsFinished(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <MapContainer>
      <MapContent padding={testsAmount > 20}>
        {questions &&
          questions.map((item, index) => (
            <Select currentTest={questionNumber === index} key={item.id}>
              <TestNum
                onClick={() => setQuestionNumber(index)}
                //  isAnswerSelected={test.selectedAnswer}
                isTrue={item?.status}
              >
                {index + 1}
              </TestNum>
            </Select>
          ))}
      </MapContent>
      <StopTest isFinished={isFinished} onClick={!isFinished && showModal}>
        <InfoCircleOutlined /> Stop the Test
      </StopTest>

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
