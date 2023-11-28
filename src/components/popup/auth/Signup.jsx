import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { PopupAtom } from "../../../recoil/PopupAtom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { ButtonLayout } from "../../../styles/ButtonLayout";

function Signup() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    userId: "",
    userPassword: "",
    userName: "",
    userAddress: "",
    userPhoneNum: "",
    userIsAdmin: false,
  });

  const setPopupAtom = useSetRecoilState(PopupAtom);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:8080/auth/signup",
        userInfo
      );
      if (result.status === 200) {
        alert("회원가입 성공! 로그인을 해주세요.");
        setPopupAtom({ popupData: {}, popupType: "", isOpen: false });
        navigate("/");
      } else {
        alert("회원가입 실패");
      }
    } catch (err) {
      alert("회원가입 실패");
      console.error(err);
    }
  };

  return (
    <Form onSubmit={handleSignup}>
      <Input
        type="text"
        name="userName"
        onChange={handleInputChange}
        placeholder="이름 입력"
        required
      />
      <Input
        type="text"
        name="userId"
        onChange={handleInputChange}
        placeholder="아이디 입력"
        required
      />
      <Input
        type="password"
        name="userPassword"
        onChange={handleInputChange}
        placeholder="비밀번호 입력"
        required
      />
      <Input
        type="text"
        name="userAddress"
        onChange={handleInputChange}
        placeholder="주소 입력"
        required
      />
      <Input
        type="tel"
        name="userPhoneNum"
        onChange={handleInputChange}
        placeholder="전화번호 입력"
        required
      />
      <CheckboxLabel>
        <input
          type="checkbox"
          name="userIsAdmin"
          onChange={handleInputChange}
        />
        관리자 여부
      </CheckboxLabel>
      <ButtonLayout type="submit">확인</ButtonLayout>
    </Form>
  );
}

export default Signup;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 12px;
`;

export const Title = styled.h2`
  font-size: 20px;
  text-align: center;
  color: #5e2ca5;
  margin-bottom: 16px;
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
  }
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #333;
  padding-left: 2px;
`;
