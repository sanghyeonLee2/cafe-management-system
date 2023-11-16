import React, { useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { OrderListAtom } from "../recoil/OrderListAtom";
import axios from "axios";
import { UserIdAtom } from "../recoil/UserAuth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function OrderListForm({ totalPriceRef }) {
  const navigate = useNavigate();
  const [orderListState, setOrderListState] = useRecoilState(OrderListAtom);
  const userIdValue = useRecoilValue(UserIdAtom);
  const [selectPayment, setSelectPayment] = useState("");

  const selectPaymentFtn = (e) => {
    setSelectPayment(e.target.value);
  };

  const orderQuantityOnChg = (e, idx) => {
    totalPriceRef.current.value =
      Number(totalPriceRef.current.value) +
      (e.target.value - 1) * orderListState[idx].menuItemPrice;
    setOrderListState((prev) =>
      prev.map((item, index) =>
        index !== idx ? item : { ...item, menuItemQuantity: e.target.value }
      )
    ); //gpt사용
  };

  const orderBtn = async (e) => {
    e.preventDefault();
    let newOrderDetailArr = [];
    //menuItemNum,orderDetailQuantity
    orderListState.map((elem) => {
      const tempObj = {
        menuItemNum: elem.menuItemNum,
        orderDetailQuantity: elem.menuItemQuantity,
      };
      newOrderDetailArr.push(tempObj);
    });

    const orderObj = {
      orderList: newOrderDetailArr,
      menuOrder: {
        menuOrderPayment: selectPayment,
        userId: userIdValue,
        menuOrderTotalPrice: totalPriceRef.current.value,
      },
    };
    const result = await axios.post(
      "http://localhost:8080/menu-order",
      orderObj
    );
    if (result.status === 200) {
      alert("주문을 완료하였습니다");
      setOrderListState([]);
      totalPriceRef.current.value = 0;
      navigate("/");
    } else {
      alert("주문 실패");
    }
  };
  //주문 요청 필요 데이터: payment, user_phone_num
  return (
    <OrderListLayout>
      <fieldset>
        <legend>
          <h2>장바구니</h2>
        </legend>
        {orderListState.length !== 0 ? (
          orderListState.map((ele, idx) => {
            return (
              <div key={ele.menuItemNum}>
                <ul>
                  <li>메뉴이름 : {ele.menuItemName}</li>
                  <li>메뉴 가격 : {ele.menuItemPrice}</li>
                  <li>
                    수량 : <br />
                    <input
                      type={"number"}
                      onChange={(e) => orderQuantityOnChg(e, idx)}
                      defaultValue={ele.menuItemQuantity}
                    />
                    개
                  </li>
                </ul>
              </div>
            );
          })
        ) : (
          <h2>장바구니 목록이 없습니다.</h2>
        )}
        <form onSubmit={orderBtn}>
          <div>
            <h3>총 결제금액</h3>
            <TotalPriceInput
              type={"number"}
              ref={totalPriceRef}
              readOnly
              defaultValue={0}
            />{" "}
            원
          </div>
          <div>
            <h3>결제방식</h3>
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
          </div>
          <button type={"submit"}>결제하기</button>
        </form>
      </fieldset>
    </OrderListLayout>
  );
}

const OrderListLayout = styled.div`
  text-align: center;
`;
const TotalPriceInput = styled.input`
  border: 0;
  background-color: unset;
  width: 80px;
`;

export default OrderListForm;
