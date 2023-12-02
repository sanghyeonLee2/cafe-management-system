import React from "react";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { PopupAtom } from "../../recoil/PopupAtom";
import { UserInfoAtom } from "../../recoil/UserAuth";
import SignoutBtn from "./SignoutBtn";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const userInfo = useRecoilValue(UserInfoAtom);
  const setPopup = useSetRecoilState(PopupAtom);
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <HeaderInner>
        <div className="left">
          {userInfo?.userId ? (
            <>
              <SignoutBtn />
              <Link to="/order-list">나의 주문 내역</Link>
            </>
          ) : (
            <>
              <p
                onClick={() =>
                  setPopup({
                    isOpen: true,
                    popupData: {},
                    popupType: "회원가입",
                  })
                }
              >
                회원가입
              </p>
              <p
                onClick={() =>
                  setPopup({
                    isOpen: true,
                    popupData: {},
                    popupType: "로그인",
                  })
                }
              >
                로그인
              </p>
            </>
          )}
        </div>
        <div className="right">
          <p onClick={() => navigate(-1)}>뒤로가기</p>
        </div>
      </HeaderInner>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  padding-bottom: 10px;
`;

const HeaderInner = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background-color: #fff;
  position: relative;

  .left,
  .right {
    display: flex;
    gap: 16px;
  }

  .right {
    justify-content: flex-end;
  }

  p,
  a {
    cursor: pointer;
    margin: 0;
    font-weight: 500;
    color: #333;
    text-decoration: none;
  }

  p:hover,
  a:hover {
    color: #7b2cbf;
  }
`;

export default Header;
