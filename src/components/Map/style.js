import styled from "styled-components";

export const MapContainer = styled.div`
  background-color: #303030;
  padding: 25px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  a {
    text-decoration: none;
  }
`;

export const MapContent = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(4, auto);
  gap: 20px;
  box-shadow: 0 0 10px #303030;
  max-height: 220px;
  overflow-y: auto;
  padding-right: ${({ padding }) => padding && "10px"};
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  @media (max-width: 700px) {
    display: flex;
    flex-wrap: wrap;
  }

  @media (max-width: 450px) {
    gap: 15px;
  }
`;

export const Select = styled.div`
  border-bottom: ${(props) => props.currentTest && "2px solid #fff"};
  padding-bottom: ${(props) => props.currentTest && "5px"};
`;

export const TestNum = styled.div`
  user-select: none;
  width: 25px;
  height: 25px;
  padding: 5px;
  border-radius: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${(props) => (props.isAnswerSelected ? "coral" : "white")};
  background-color: ${({ isTrue }) =>
    isTrue ? "#7cfc00" : isTrue === false && "red"};
  color: ${({ isTrue }) => isTrue === false && "#fff"};
`;

export const StopTest = styled.button`
  width: 170px;
  margin-top: 20px;
  padding: 5px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #fff;
  display: flex;
  align-items: center;
  transition: 0.3s;
  text-decoration: none;
  color: #000;
  opacity: ${({ isFinished }) => isFinished && "0.7"};
  cursor: ${({ isFinished }) => isFinished && "not-allowed"};

  svg {
    margin-right: 10px;
    color: red;
    font-size: 20px;
  }

  &:hover {
    transform: ${({ isFinished }) => !isFinished && "scale(1.05)"};
    background-color: ${({ isFinished }) => !isFinished && "red"};
    color: ${({ isFinished }) => !isFinished && "#fff"};
    svg {
      color: ${({ isFinished }) => !isFinished && "#fff"};
    }
  }
`;

export const Score = styled.div`
  text-align: center;
  span {
    color: coral;
    font-size: 25px;
  }

  h3 {
    color: red;
  }
`;
