import React from 'react';
import styled from "styled-components";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {SigninPopupAtom, SignupPopupAtom} from "../recoil/PopupAtom";
import {UserIdAtom} from "../recoil/UserAuth";
import SignoutBtn from "./SignoutBtn";
import {useNavigate} from "react-router-dom";

function Header() {
    const userIdValue = useRecoilValue(UserIdAtom)
    const setSigninPopup = useSetRecoilState(SigninPopupAtom);
    const setSignupPopup = useSetRecoilState(SignupPopupAtom)
    const navigate = useNavigate(-1)
    return (
        <HeaderLayout>
            {userIdValue ? <SignoutBtn/> :
                <div>
                    <p onClick={() => setSignupPopup(true)}>회원가입</p>
                    <p onClick={() => setSigninPopup(true)}>로그인</p>
                </div>
            }
            <div><p onClick={() => navigate(-1)}> 뒤로가기</p></div>
            <TitleLayout>Coffee</TitleLayout>
        </HeaderLayout>
    );
}

const HeaderLayout = styled.div`
  p {
    display: inline-block;
    cursor: pointer;
    margin-left: 20px
  }
`

const TitleLayout = styled.h1`
  display: flex;
  margin: 40px 450px;
  justify-content: center;
  align-items: center;
`
export default Header;