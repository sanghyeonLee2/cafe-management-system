import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ButtonLayout } from "../styles/ButtonLayout";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Title>404</Title>
      <Message>페이지를 찾을 수 없습니다.</Message>
      <ButtonLayout onClick={() => navigate("/")}>홈으로 이동</ButtonLayout>
    </Wrapper>
  );
};

export default PageNotFound;

const Wrapper = styled.div`
  button {
    width: 100px;
  }
  height: 55vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Message = styled.p`
  font-size: 16px;
  margin-bottom: 16px;
`;
