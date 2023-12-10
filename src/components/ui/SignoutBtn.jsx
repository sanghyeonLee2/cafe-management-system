import React from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { UserInfoAtom } from "../../recoil/UserAuth";
import { OrderListAtom } from "../../recoil/OrderListAtom";

function SignoutBtn() {
  const navigate = useNavigate();
  const setUserInfo = useSetRecoilState(UserInfoAtom);
  const setOrderListState = useSetRecoilState(OrderListAtom);

  const signoutBtn = () => {
    setUserInfo(null);
    setOrderListState([]);
    navigate("/");
  };

  return <p onClick={signoutBtn}>로그아웃</p>;
}

export default SignoutBtn;
