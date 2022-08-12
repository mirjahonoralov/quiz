import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 5px 30px;
  background-color: ${({ color }) => color};
  border-radius: 5px;
  font-size: 25px;
  cursor: pointer;
  color: #000;
`;

const Button = ({ children, color, onClick }) => {
  return (
    <Wrapper onClick={onClick} color={color}>
      {children}
    </Wrapper>
  );
};

export default Button;
