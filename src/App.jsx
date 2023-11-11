import Header from "./component/Header";
import styled from "styled-components";
import {Outlet} from "react-router-dom";
import Signin from "./component/Signin";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {SigninPopupAtom, SignupPopupAtom} from "./recoil/PopupAtom";
import Signup from "./component/Signup";
import {useEffect} from "react";
import axios from "axios";
import {UserIdAtom, UserInfoAtom} from "./recoil/UserAuth";
import {MenuItemAtom} from "./recoil/MenuItemAtom";

function App() {
    const userIdState = useRecoilValue(UserIdAtom)
    const setUserInfo = useSetRecoilState(UserInfoAtom)
    const setMenuItem = useSetRecoilState(MenuItemAtom)


    useEffect(() => {
            const fetchUserInfo = async () => {
                const result = await
                    axios.get("http://localhost:8080/user/signin/success", {withCredentials: true})
                if (result.status === 200) {
                    setUserInfo(result.data);//userId는 어따씀?
                    return;
                }
                if (result.status === 404) {
                    userIdState(null);
                }
            }
            fetchUserInfo();
        }
        , [setUserInfo, userIdState]);
        useEffect(() => {
                const fetchMenuItem = async () => {
                    const result = await
                        axios.get("http://localhost:8080/menu-item")
                    if (result.status === 200) {
                        setMenuItem(result.data);
                        return
                    }
                    alert("메뉴를 불러오지 못했습니다.")
                }
                fetchMenuItem();
            }
            , []);



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
