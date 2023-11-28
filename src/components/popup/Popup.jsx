import { useRecoilState } from "recoil";
import styled from "styled-components";
import Payments from "./order/Payments";
import { PopupAtom } from "../../recoil/PopupAtom";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import MaterialUpdate from "./material/MaterialUpdate";
import UpdateMenu from "./menu/UpdateMenu";
import CreateMenu from "./menu/CreateMenu";
import MenuRecipeInfo from "./menu/MenuRecipeInfo";
import OrderInfo from "./order/OrderInfo";
import UpdateSupplier from "./supplier/UpdateSupplier";
import CreateSupplier from "./supplier/CreateSupplier";

const Popup = () => {
  const [popup, setPopup] = useRecoilState(PopupAtom);
  return (
    <ModalWrap>
      <PaymentPopupWrap
        $isScrollable={
          popup.popupType === "레시피보기" || popup.popupType === "메뉴추가"
        }
      >
        <CloseButton
          onClick={() =>
            setPopup({ popupType: "", isOpen: false, popupData: {} })
          }
        >
          ×
        </CloseButton>
        <h3>{popup.popupType}</h3>
        {popup.popupType === "결제수단 선택" && <Payments />}
        {popup.popupType === "로그인" && <Signin />}
        {popup.popupType === "회원가입" && <Signup />}
        {popup.popupType === "재료수정" && <MaterialUpdate />}
        {popup.popupType === "메뉴수정" && <UpdateMenu />}
        {popup.popupType === "메뉴추가" && <CreateMenu />}
        {popup.popupType === "공급업체 수정" && <UpdateSupplier />}
        {popup.popupType === "공급업체 추가" && <CreateSupplier />}
        {popup.popupType === "레시피보기" && <MenuRecipeInfo />}
        {popup.popupType === "주문상세" && <OrderInfo />}
      </PaymentPopupWrap>
    </ModalWrap>
  );
};

export default Popup;

const PaymentPopupWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 24px;
  border-radius: 12px;
  background-color: #f2f0ff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  min-width: 280px;
  text-align: center;
  max-height: ${({ $isScrollable }) => ($isScrollable ? "600px" : "auto")};
  overflow-y: ${({ $isScrollable }) => ($isScrollable ? "auto" : "visible")};

  h3 {
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: bold;
  }

  input[type="radio"] {
    margin: 0 6px 0 12px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 12px;
  background: none;
  border: none;
  font-size: 22px;
  font-weight: bold;
  color: #555;
  cursor: pointer;

  &:hover {
    color: #000;
  }
`;
const ModalWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;
