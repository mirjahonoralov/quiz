import styled from "styled-components";

export const Container = styled.div`
  height: 90vh;
  background-color: coral;
`;

export const Wrapper = styled.div`
  padding: 100px;
  background-color: #303030;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 40px;

  @media (max-width: 750px) {
    padding: 50px;
    flex-direction: column;
  }
  @media (max-width: 345px) {
    padding: 30px;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  h3 {
    color: #fff;
  }
`;

export const Top = styled.div`
  display: flex;
  gap: 50px;

  @media (max-width: 750px) {
    gap: 30px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
