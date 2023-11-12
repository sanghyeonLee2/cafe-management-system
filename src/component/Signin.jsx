import React, {useState} from 'react';
import {useSetRecoilState} from "recoil";
import {SigninPopupAtom} from "../recoil/PopupAtom";
import {UserIdAtom} from "../recoil/UserAuth";
import {PopupLayout} from "../styles/PopupLayout";
import axios from "axios";
import {useNavigate} from "react-router-dom";


function Signin() {
    const setIsSignin = useSetRecoilState(UserIdAtom)
    const [signInform, setSignInform] = useState({
        userId:"", userPassword:""});
    const navigate = useNavigate();
    const signinInputOnChg= (e) =>{
        setSignInform((prev)=>({
                ...prev, [e.target.name]: e.target.value
            }))
    }
    const signinBtn = async () => {
        const result = await axios.post("http://localhost:8080/user/signin",
            signInform, {withCredentials: true}) //요청에 쿠키를 포함시키라는 지시
        if(result.status === 200){
            setIsSignin(result.data.userId);
            setPopupValue(false);
            navigate("/admin");
        }
        else{
            alert("로그인 실패")
        }
    }

    const setPopupValue = useSetRecoilState(SigninPopupAtom)
    return (
        <PopupLayout>
            <legend>로그인</legend>
            <span onClick={()=>setPopupValue(false)}>뒤로가기</span>
            <br/>
            <input type={"text"} name={"userId"} onChange={signinInputOnChg}/>
            <br/>
            <input type={"text"} name={"userPassword"} onChange={signinInputOnChg}/>
            <br/>
            <button type={"button"} onClick={signinBtn}>확인</button>
        </PopupLayout>
    );
}

export default Signin;