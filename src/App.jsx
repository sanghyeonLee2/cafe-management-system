import Header from "./components/ui/Header";
import { styled, createGlobalStyle } from "styled-components";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { PopupAtom } from "./recoil/PopupAtom";
import { useEffect } from "react";
import axios from "axios";
import { UserInfoAtom } from "./recoil/UserAuth";
import Popup from "./components/popup/Popup";

function App() {
  const [userInfo, setUserInfo] = useRecoilState(UserInfoAtom);
  const popup = useRecoilValue(PopupAtom);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const result = await axios.get(
          "http://localhost:8080/auth/signin/success",
          { withCredentials: true }
        );

        if (result.status === 200) {
          setUserInfo(result.data);
        } else {
          setUserInfo(null);
        }
      } catch {
        setUserInfo(null);
      }
    };

    fetchUserInfo();
  }, [setUserInfo]);

  useEffect(() => {
    if (!userInfo?.userId) return;

    const isAdmin = userInfo.isAdmin === true;
    const isAdminRoute = location.pathname.startsWith("/admin");

    if (isAdmin !== isAdminRoute) {
      navigate(isAdmin ? "/admin" : "/", { replace: true });
    }
  }, [userInfo, navigate, location.pathname]);
  return (
    <>
      <GlobalStyle />
      <AppLayout>
        {popup.isOpen && <Popup />}
        <Header />
        <TitleWrap className="center">
          <Link to="/">
            <h1 className="title">커피 판매 시스템</h1>
          </Link>
        </TitleWrap>
        <MainContent>
          <Outlet />
        </MainContent>
      </AppLayout>
    </>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #f8f8f8;
    color: #333;
  }

  a {
    color: #5a2ea6;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }

  ul {
    list-style: none;
  }
`;

const AppLayout = styled.div`
  padding: 20px;
  width: 100%;
`;

const MainContent = styled.main`
  min-height: 600px;
`;

const TitleWrap = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
