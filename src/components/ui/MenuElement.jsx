import React from "react";
import { useRecoilState } from "recoil";
import { OrderListAtom } from "../../recoil/OrderListAtom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MenuImage from "./MenuImage";
import { ButtonLayout } from "../../styles/ButtonLayout";

const MenuElement = ({ ele }) => {
  const [orderList, setOrderList] = useRecoilState(OrderListAtom);
  const putInOrderList = (menuInfo) => {
    const existing = orderList.find(
      (item) => item.menuItemNum === menuInfo.menuItemNum
    );

    alert("장바구니에 담겼습니다.");

    if (existing) {
      const newOrderList = orderList.map((item) =>
        item.menuItemNum === menuInfo.menuItemNum
          ? { ...item, orderDetailQuantity: item.orderDetailQuantity + 1 }
          : item
      );
      return setOrderList(newOrderList);
    } else {
      const newItem = {
        ...ele,
        orderDetailQuantity: 1,
      };
      setOrderList([...orderList, newItem]);
    }
  };

  return (
    <ItemLayout key={ele.menuItemNum}>
      <MenuImage ele={ele} height={"140px"} />
      <ul>
        <li>메뉴 번호: {ele.menuItemNum}</li>
        <li>이름: {ele.menuItemName}</li>
        <li>가격: {ele.menuItemPrice}</li>
        <li>분류: {ele.menuItemClassification}</li>
        <li>
          <ButtonLayout onClick={() => putInOrderList(ele)}>
            주문목록에 담기
          </ButtonLayout>
        </li>
        <li>
          <Link to={`/menuItemInfo/${ele.menuItemNum}`} state={ele}>
            <button type={"button"}>메뉴 상세정보</button>
          </Link>
        </li>
      </ul>
    </ItemLayout>
  );
};

export default MenuElement;

const ItemLayout = styled.div`
  cursor: pointer;
  width: 220px;
  padding: 16px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;
  text-align: left;

  &:hover {
    transform: translateY(-4px);
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 8px;
      font-size: 14px;
    }

    a button {
      padding: 10px 0;
      cursor: pointer;
      border-radius: 6px;
      border: none;
      width: 100%;
      background-color: #e0e0e0;
      color: #333;

      &:hover {
        background-color: #cfcfcf;
      }
    }
  }
`;
