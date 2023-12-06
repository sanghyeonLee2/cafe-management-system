import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { PopupAtom } from "../../recoil/PopupAtom";
import { ButtonLayout } from "../../styles/ButtonLayout";
import MenuImage from "../../components/ui/MenuImage";
import { OrderListAtom } from "../../recoil/OrderListAtom";

function MenuItemInfo(props) {
  const [recipeInfo, setRecipeInfo] = useState([]);
  const setOrderListState = useSetRecoilState(OrderListAtom);
  const [directOrderQuantity, setDirectOrderQuantity] = useState(1);
  const setPopup = useSetRecoilState(PopupAtom);

  const menuItemInfo = useLocation().state;

  useEffect(() => {
    const fetchMenuInfo = async () => {
      const result = await axios.get(
        `http://localhost:8080/menus/recipe/${menuItemInfo.menuItemNum}`
      );
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
      <Card>
        <h3>메뉴 상세 정보</h3>
        <MenuFlex>
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
          <MenuImage ele={menuItemInfo} width={"25%"} height={"140px"} />
        </MenuFlex>
      </Card>
      <Card>
        <h3>레시피</h3>
        <ul>
          {recipeInfo.map((info, idx) => (
            <li key={idx}>
              {info.Material?.material_name} : {info.menuRecipeUsage}
              {info.Material?.material_unit}
              {` ( 재료 번호${info.materialNum} )`}
            </li>
          ))}
        </ul>
      </Card>
      <PurchaseControls>
        <div>
          <span>개</span>
          <input
            type="number"
            min="1"
            value={directOrderQuantity}
            onChange={(e) => setDirectOrderQuantity(e.target.value)}
          />
        </div>
        <ButtonLayout
          onClick={() => {
            setOrderListState([
              {
                ...menuItemInfo,
                orderDetailQuantity: directOrderQuantity,
              },
            ]);
            setPopup({
              popupType: "결제수단 선택",
              isOpen: true,
            });
          }}
        >
          바로구매
        </ButtonLayout>
      </PurchaseControls>
    </MenuItemInfoLayout>
  );
}

export default MenuItemInfo;

const MenuFlex = styled.div`
  display: flex;
  justify-content: space-between;
`;
const MenuItemInfoLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
`;

const Card = styled.div`
  width: 100%;
  margin-bottom: 24px;
  padding: 24px;
  border: 1px solid #eee;
  border-radius: 12px;
  background-color: white;

  h3 {
    margin-bottom: 12px;
    font-size: 20px;
    font-weight: 600;
    color: #5a1e99;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 6px;
    }
  }
`;

const PurchaseControls = styled.div`
  > div {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    margin-bottom: 24px;
  }

  width: 100%;
  button {
    width: 100%;
  }
  input[type="number"] {
    width: 80px;
    padding: 6px;
    font-size: 16px;
  }
`;
