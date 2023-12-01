import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { UserInfoAtom } from "../../../recoil/UserAuth";
import axios from "axios";
import { ButtonLayout } from "../../../styles/ButtonLayout";
import { PopupAtom } from "../../../recoil/PopupAtom";
import {
  OrderListAtom,
  TotalOrderPriceSelector,
} from "../../../recoil/OrderListAtom";
import styled from "styled-components";

const Payments = () => {
  const userInfo = useRecoilValue(UserInfoAtom);
  const userId = userInfo?.userId;
  const [orderListState, setOrderListState] = useRecoilState(OrderListAtom);
  const totalPrice = useRecoilValue(TotalOrderPriceSelector);
  const navigate = useNavigate();
  const [selectPayment, setSelectPayment] = useState("creditCard");
  const setPopupAtom = useSetRecoilState(PopupAtom);

  const directOrder = async () => {
    const newOrderDetailArr = orderListState.map(
      ({ menuItemNum, orderDetailQuantity }) => ({
        menuItemNum,
        orderDetailQuantity,
      })
    );
    const menuOrderObj = {
      orderList: newOrderDetailArr,
      menuOrder: {
        menuOrderPayment: selectPayment,
        userId,
        menuOrderTotalPrice: totalPrice,
      },
    };

    try {
      const result = await axios.post(
        "http://localhost:8080/users/order",
        menuOrderObj
      );

      if (result.status === 200) {
        alert("주문이 완료되었습니다");
        setOrderListState([]);
        navigate("/");
      } else {
        alert("주문 실패");
      }
    } catch (error) {
      console.error("주문 처리 중 오류 발생:", error);
      alert("주문 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setPopupAtom({ popupData: {}, popupType: "", isOpen: false });
    }
  };

  const selectPaymentFtn = (e) => {
    setSelectPayment(e.target.value);
  };
  return (
    <Wrap>
      <RadioGroup>
        <label>
          <input
            type="radio"
            name="menuOrderPayment"
            value="현금"
            onChange={selectPaymentFtn}
          />
          현금
        </label>
        <label>
          <input
            type="radio"
            name="menuOrderPayment"
            value="카드"
            onChange={selectPaymentFtn}
            defaultChecked
          />
          신용카드
        </label>
        <label>
          <input
            type="radio"
            name="menuOrderPayment"
            value="수표"
            onChange={selectPaymentFtn}
          />
          수표
        </label>
      </RadioGroup>
      <ButtonWrap>
        <ButtonLayout onClick={directOrder}>완료</ButtonLayout>
      </ButtonWrap>
    </Wrap>
  );
};

export default Payments;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 16px;
  font-size: 16px;

  label {
    display: flex;
    align-items: center;
    gap: 3px;
  }
`;

const ButtonWrap = styled.div`
  margin-top: 8px;
  width: 100%;
`;
