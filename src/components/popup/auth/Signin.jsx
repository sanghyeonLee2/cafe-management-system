import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { PopupAtom } from "../../../recoil/PopupAtom";
import { UserInfoAtom } from "../../../recoil/UserAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ButtonLayout } from "../../../styles/ButtonLayout";

function Signin() {
  const setUserInfo = useSetRecoilState(UserInfoAtom);
  const setPopupAtom = useSetRecoilState(PopupAtom);
  const [signInform, setSignInform] = useState({
    userId: "",
    userPassword: "",
  });
  const navigate = useNavigate();

  const signinInputOnChg = (e) => {
    const { name, value } = e.target;
    setSignInform((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        "http://localhost:8080/auth/signin",
        signInform,
        { withCredentials: true }
      );

      if (result.status === 200) {
        if (result.status === 200) {
          alert("로그인에 성공했습니다");
          setUserInfo(result.data);
          setPopupAtom({ popupData: {}, popupType: "", isOpen: false });
          navigate("/");
        }
      } else {
        alert("로그인 실패");
      }
    } catch (err) {
      alert("로그인 실패");
      console.error(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="userId"
        onChange={signinInputOnChg}
        placeholder="아이디 입력"
        required
      />
      <Input
        type="password"
        name="userPassword"
        onChange={signinInputOnChg}
        placeholder="비밀번호 입력"
        required
      />
      <ButtonLayout type="submit">확인</ButtonLayout>
    </Form>
  );
}

export default Signin;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Input = styled.input`
  height: 42px;
  padding: 0 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #fff;
  color: #333;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    border-color: #5e2ca5;
    outline: none;
    box-shadow: 0 0 0 2px rgba(94, 44, 165, 0.1);
  }
`;
