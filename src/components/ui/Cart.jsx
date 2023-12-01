import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  OrderListAtom,
  TotalOrderPriceSelector,
} from "../../recoil/OrderListAtom";
import styled from "styled-components";
import { PopupAtom } from "../../recoil/PopupAtom";
import { ButtonLayout } from "../../styles/ButtonLayout";
import MenuImage from "./MenuImage";

function Cart() {
  const [orderListState, setOrderListState] = useRecoilState(OrderListAtom);

  const [isOpen, setIsOpen] = useState(false);
  const totalPrice = useRecoilValue(TotalOrderPriceSelector);
  const setPopup = useSetRecoilState(PopupAtom);

  const orderQuantityOnChg = (e, idx) => {
    const value = parseInt(e.target.value);
    setOrderListState((prev) =>
      prev.map((item, index) =>
        index !== idx ? item : { ...item, orderDetailQuantity: value }
      )
    );
  };

  const orderBtn = async (e) => {
    e.preventDefault();
    setPopup({
      isOpen: true,
      popupType: "결제수단 선택",
    });
  };

  return (
    <FixedCartWrapper>
      <ButtonLayout onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? "▼ 장바구니 접기" : "▲ 장바구니 열기"}
      </ButtonLayout>
      {isOpen && (
        <OrderListLayout>
          <fieldset>
            <legend>
              <h2>장바구니</h2>
            </legend>
            {orderListState.length !== 0 ? (
              orderListState.map((ele, idx) => (
                <OrderListItem key={ele.menuItemNum}>
                  <ul>
                    <li>메뉴이름 : {ele.menuItemName}</li>
                    <li>메뉴 가격 : {ele.menuItemPrice}</li>
                    <li>
                      <input
                        min="1"
                        type="number"
                        onChange={(e) => orderQuantityOnChg(e, idx)}
                        value={ele.orderDetailQuantity}
                      />
                      개
                    </li>
                  </ul>
                  <MenuImage ele={ele} width={"30%"} height={"110px"} />
                </OrderListItem>
              ))
            ) : (
              <h2>장바구니 목록이 없습니다.</h2>
            )}
            <form onSubmit={orderBtn}>
              <div>
                <h3>총 결제금액</h3>
                <TotalPriceInput type="number" readOnly value={totalPrice} />원
              </div>
              <ButtonLayout type="submit">결제하기</ButtonLayout>
            </form>
          </fieldset>
        </OrderListLayout>
      )}
    </FixedCartWrapper>
  );
}

export default Cart;
const FixedCartWrapper = styled.div`
  > button {
    background-color: #f4f4f4;
    color: #222;

    &:hover {
      background-color: #d5d5d5;
      color: #000;
    }
    box-shadow: 0 -3px 6px rgba(0, 0, 0, 0.05), 0 3px 6px rgba(0, 0, 0, 0.05);
    margin-top: 0;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  transform: translateX(-50%);
  position: fixed;
  bottom: 0;
  left: 50%;
  width: 100%;
  background: #f9f9f9;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.08);
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OrderListItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  margin: 16px 0;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #fefefe;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
  transition: background-color 0.3s ease;
  ul {
    padding: 5px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  li {
    margin-bottom: 5px;
    font-size: 14px;
    line-height: 1.5;
  }

  input[type="number"] {
    width: 60px;
    padding: 5px;
    font-size: 14px;
    margin-top: 4px;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
`;

const OrderListLayout = styled.div`
  max-height: 45vh;
  overflow-y: auto;
  width: 100%;
  max-width: 480px;
  padding: 16px 24px;
  font-size: 15px;
  button {
    margin-top: 10px;
  }
  fieldset {
    border: none;
    padding: 0;

    legend {
      font-size: 21px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    h2 {
      font-size: 19px;
    }
  }

  form {
    margin-top: 16px;
    text-align: center;

    h3 {
      margin: 13px 0 8px;
      font-size: 16px;
    }

    input[type="radio"] {
      margin-right: 6px;
      margin-left: 12px;
    }
  }
`;

const TotalPriceInput = styled.input`
  border: none;
  background-color: transparent;
  font-size: 19px;
  font-weight: bold;
  width: 100px;
  text-align: center;
  color: #222;
`;
