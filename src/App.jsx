import Header from "./component/Header";
import styled from "styled-components";
import {Outlet} from "react-router-dom";
import Signin from "./component/Signin";
import { useRecoilValue, useSetRecoilState} from "recoil";
import {SigninPopupAtom, SignupPopupAtom} from "./recoil/PopupAtom";
import Signup from "./component/Signup";
import {useEffect} from "react";
import axios from "axios";
import {UserIdAtom, UserInfoAtom} from "./recoil/UserAuth";
import {MenuItemAtom} from "./recoil/MenuItemAtom";
import Supplier from "./pages/Supplier";

function App() {
    const userIdState = useRecoilValue(UserIdAtom)
    const setUserInfo = useSetRecoilState(UserInfoAtom)
    const setMenuItem = useSetRecoilState(MenuItemAtom)


    useEffect(() => {
            const fetchUserInfo = async () => {
                const result = await
                    axios.get("http://localhost:4000/signin/success")
                if (result.data.user) {
                    console.log(result.data.user)
                    setUserInfo({
                        address: result.data.user.userAddress,
                        username: result.data.user.username,
                        phoneNum: result.data.user.userPhoneNum
                    });
                } else if (result.status === 404) {
                    console.log("실패")
                    userIdState(null);
                }
            }
            fetchUserInfo();
        }
        , [setUserInfo,userIdState]);

    useEffect(() => {
            const fetchMenuItem = async () => {
                const result = await
                    axios.get("http://localhost:4000/get-menu")
                setMenuItem(result.data);
                if (result.status === 200) {
                } else {
                    alert("메뉴를 불러오지 못했습니다.")
                }
            }
            fetchMenuItem();
        }
        , [setMenuItem]);

    const signinPopupValue = useRecoilValue(SigninPopupAtom)
    const signupPopupValue = useRecoilValue(SignupPopupAtom)
    return (
        <div>
            <div>
                {signinPopupValue && <Signin/>}
            </div>
            <div>
                {signupPopupValue && <Signup/>}
            </div>
            <OuterLayout>
                <InnerLayout>
                    <Header/>
                </InnerLayout>
                <Outlet/>
            </OuterLayout>
        </div>
    );
}

const InnerLayout = styled.div`
  width: 100%;
  display: flex;
  align-items: center `
const OuterLayout = styled.div`
  background-color: #e3e3e3;
  height: 1200px`

export default App;
