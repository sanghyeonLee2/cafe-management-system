import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { SignupPopupAtom } from "../recoil/PopupAtom";
import { useNavigate } from "react-router-dom";
import { PopupLayout } from "../styles/PopupLayout";
import axios from "axios";

function Signup(props) {
  //const API_KEY = process.env.REACT_APP_API_KEY;
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    userId: "",
    userPassword: "",
    userName: "",
    userAddress: "",
    userPhoneNum: "",
    userIsAdmin: false,
  });
  const setPopupAtom = useSetRecoilState(SignupPopupAtom);
  const handleInputChange = (e) => {
    setUserInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      userIsAdmin: e.target.checked,
    }));
  };
  console.log(userInfo);
  const handleSignup = async (e) => {
    e.preventDefault();
    const result = await axios.post(
      "http://localhost:8080/user/signup",
      userInfo
    );
    try {
      if (result.status === 200) {
        alert("회원가입 성공 로그인을 하세요");
        setPopupAtom(false);
        navigate("/");
        return;
      }
      alert("실패");
    } catch (err) {
      alert("실패");
      console.log(err);
    }
  };
  return (
    <PopupLayout>
      <legend>회원 정보 입력</legend>
      <form onSubmit={handleSignup}>
        <span onClick={() => setPopupAtom(false)}>뒤로가기</span>
        <br />
        <input
          type="text"
          name={"userName"}
          onChange={handleInputChange}
          placeholder={"이름 입력"}
        />
        <br />
        <input
          type="text"
          name={"userId"}
          onChange={handleInputChange}
          placeholder={"아이디 입력"}
        />
        <br />
        <input
          type="text"
          name={"userPassword"}
          onChange={handleInputChange}
          placeholder={"비밀번호 입력"}
        />
        <br />
        <input
          type="text"
          name={"userAddress"}
          onChange={handleInputChange}
          placeholder={"주소 입력"}
        />
        <br />
        <input
          type="text"
          name={"userPhoneNum"}
          onChange={handleInputChange}
          placeholder={"전화번호 입력"}
        />
        <br />
        관리자 여부
        <input
          type="checkbox"
          name={"userIsAdmin"}
          onChange={handleInputChange}
        />
        <button type="submit">확인</button>
      </form>
    </PopupLayout>
  );
}

export default Signup;
