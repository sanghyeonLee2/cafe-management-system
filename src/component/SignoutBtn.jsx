import React from 'react';
import {useSetRecoilState} from "recoil";
import {UserIdAtom} from "../recoil/UserAuth";
import {useNavigate} from "react-router-dom";
import {OrderListAtom} from "../recoil/OrderListAtom";

function SignoutBtn(props) {
    const navigate = useNavigate() ;
    const userIdState = useSetRecoilState(UserIdAtom);
    const setOrderListState = useSetRecoilState(OrderListAtom);
    const signoutBtn = () => {
        userIdState(null);
        setOrderListState([]);
        navigate("/");
    }
    return (
        <div><p onClick={signoutBtn}>로그아웃</p></div>
    );
}

export default SignoutBtn;