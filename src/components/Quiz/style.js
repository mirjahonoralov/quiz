const { default: styled } = require("styled-components");

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 5%;
  width: 100%;
  gap: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 450px) {
    padding: 0 3%;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 70%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Btn = styled.button`
  cursor: pointer;
  padding: 10px 20px;
  font-size: 20px;
  background-color: rgba(255, 255, 255, 0.3);
  color: #000;
  backdrop-filter: blur(100px);
  border: none;
  display: flex;
  align-items: center;
  transition: 0.1s;
  user-select: none;

  &:active {
    background-color: #fff;
    transform: scale(0.95);
  }

  @media (max-width: 450px) {
    padding: 5px 10px;
  }
`;

export const Card = styled.div`
  width: 100%;
  padding: 30px 70px 70px;
  background-color: #303030;
  color: #fff;
  border-radius: 10px;
  min-height: 400px;
  box-shadow: 0 0 15px #303030;

  @media (max-width: 900px) {
    padding: 30px 40px 40px;
  }
  @media (max-width: 450px) {
    padding: 15px 20px 20px;
  }
`;

export const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  p {
    margin-bottom: 20px;
    span {
      font-size: 25px;
      font-weight: bold;
      color: coral;
    }
  }

  h2 {
    color: #fff;
    span {
      font-size: 25px;
      font-weight: bold;
      color: coral;
    }
  }
`;

export const QuestionText = styled.div`
  font-size: 20px;

  @media (max-width: 450px) {
    font-size: 15px;
  }
`;

export const Answers = styled.div`
  display: grid;
  grid-template: repeat(2, 1fr) / repeat(2, 1fr);
  gap: 30px;
  margin-top: 50px;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }
`;

export const Option = styled.div`
  padding: 15px 0;
  padding-left: 10px;
  background-color: ${({ selected }) => (selected ? "coral" : "white")};
  background-color: ${({ status }) => status === "false" && "red"};
  background-color: ${({ correctAnswer }) => correctAnswer && "#7cfc00"};
  background-color: ${({ isFinished }) => isFinished && "#7cfc00"};
  color: #000;
  border-radius: 5px;
  &:hover {
    background-color: ${({ isFinished, correctAnswer, status }) =>
      !(isFinished || correctAnswer || status === "false") && "coral"};
    cursor: pointer;
  }

  @media (max-width: 450px) {
    padding: 8px 0;
    padding-left: 10px;
  }
`;

export const Check = styled.button`
  border: none;
  padding: 10px 20px;
  background: #7cfc00;
  font-size: 20px;
  cursor: pointer;
  user-select: none;
  cursor: ${({ disabled }) => disabled && "not-allowed"};

  &:disabled {
    opacity: 0.7;
  }

  &:active {
    background-color: ${({ disabled }) => !disabled && "#fff"};
    transform: ${({ disabled }) => !disabled && "scale(0.95)"};
  }

  @media (max-width: 450px) {
    padding: 5px 10px;
  }
`;
