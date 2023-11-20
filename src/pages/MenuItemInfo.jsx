import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { UserIdAtom } from "../recoil/UserAuth";
import styled from "styled-components";

function MenuItemInfo(props) {
  const navigate = useNavigate();
  const [recipeInfo, setRecipeInfo] = useState([]);
  const [selectPayment, setSelectPayment] = useState("");
  const [directOrderQuantity, setDirectOrderQuantity] = useState(1);
  const [directOrderPopUp, setDirectOrderPopUp] = useState(false);
  const userIdValue = useRecoilValue(UserIdAtom);
  const menuItemInfo = useLocation().state;
  const selectPaymentFtn = (e) => {
    setSelectPayment(e.target.value);
  };

  const directOrder = async () => {
    const menuOrderObj = {
      orderList: [
        {
          menuItemNum: menuItemInfo.menuItemNum,
          orderDetailQuantity: directOrderQuantity,
        },
      ], // 여기부터
      menuOrder: {
        menuOrderPayment: selectPayment,
        userId: userIdValue,
        menuOrderTotalPrice: menuItemInfo.menuItemPrice,
      },
    };
    const result = await axios.post(
      "http://localhost:8080/menu-order",
      menuOrderObj
    );
    if (result.status === 200) {
      alert("주문이 완료되었습니다");
      navigate("/");
      return;
    }
    alert("주문 실패");
  };

  useEffect(() => {
    const fetchMenuInfo = async () => {
      const result = await axios.get("http://localhost:8080/menu-item/recipe", {
        params: { menuItemNum: menuItemInfo.menuItemNum },
      });
      if (result.status === 200) {
        setRecipeInfo(result.data);
        return;
      }
      alert("재료를 불러오지 못했습니다.");
    };
    fetchMenuInfo();
  }, []);
  return (
    <MenuItemInfoLayout>
      {directOrderPopUp && (
        <div>
          <h3>결제 수단 선택</h3>
          <input
            type={"radio"}
            name={"menuOrderPayment"}
            value={"cash"}
            onChange={selectPaymentFtn}
          />
          현금
          <input
            type={"radio"}
            name={"menuOrderPayment"}
            value={"creditCard"}
            onChange={selectPaymentFtn}
          />
          신용카드
          <input
            type={"radio"}
            name={"menuOrderPayment"}
            value={"check"}
            onChange={selectPaymentFtn}
          />
          수표
          <button type={"button"} onClick={directOrder}>
            완료
          </button>
        </div>
      )}
      <h3>메뉴 상세 정보</h3>
      <div>
        <ul>
          <li>메뉴번호: {menuItemInfo.menuItemNum}</li>
          <li>
            특별 메뉴 여부:{" "}
            {menuItemInfo.menuItemIsSpecialMenu === 1 ? "O" : "X"}
          </li>
          <li>분류: {menuItemInfo.menuItemClassification}</li>
          <li>이름: {menuItemInfo.menuItemName}</li>
          <li>가격: {menuItemInfo.menuItemPrice}원</li>
        </ul>
      </div>
      <div>
        <h3>레시피</h3>
        <ul>
          {recipeInfo.map((info, idx) => (
            <div key={idx}>
              <li>재료 번호: {info.materialNum}</li>
              <li>재료 사용량: {info.menuRecipeUsage}</li>
            </div>
          ))}
        </ul>
      </div>
      <input
        type={"number"}
        defaultValue={1}
        onChange={(e) => setDirectOrderQuantity(e.target.value)}
      />
      <br />
      <button type={"button"} onClick={() => setDirectOrderPopUp(true)}>
        바로구매
      </button>
    </MenuItemInfoLayout>
  );
}
const MenuItemInfoLayout = styled.div`
  text-align: center;
`;
export default MenuItemInfo;
