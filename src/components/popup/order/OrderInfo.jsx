import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import axios from "axios";
import { PopupAtom } from "../../../recoil/PopupAtom";
import { TableLayout } from "../../../styles/TableLayout";

const OrderInfo = () => {
  const { popupData } = useRecoilValue(PopupAtom);
  const {
    menuOrderNum,
    menuOrderDate,
    menuOrderPayment,
    menuOrderTotalPrice,
    User: { userName, userPhoneNum, userAddress } = {},
  } = popupData;

  const [userOrderInfo, setUserOrderInfo] = useState([]);

  useEffect(() => {
    const fetchOrderInfo = async () => {
      try {
        const result = await axios.get(
          `http://localhost:8080/orders/${menuOrderNum}`
        );
        if (result.status === 200) {
          setUserOrderInfo(result.data);
        } else {
          alert("주문 상세 정보를 불러오지 못했습니다.");
        }
      } catch (err) {
        alert("오류 발생");
        console.error(err);
      }
    };

    if (menuOrderNum) fetchOrderInfo();
  }, [menuOrderNum]);

  return (
    <div>
      <InfoRow>
        <strong>주문번호</strong> <span>{menuOrderNum}</span>
      </InfoRow>
      <InfoRow>
        <strong>주문일자</strong> <span>{formatDate(menuOrderDate)}</span>
      </InfoRow>
      <InfoRow>
        <strong>고객명</strong> <span>{userName}</span>
      </InfoRow>
      <InfoRow>
        <strong>전화번호</strong> <span>{userPhoneNum}</span>
      </InfoRow>
      <InfoRow>
        <strong>주소</strong> <span>{userAddress}</span>
      </InfoRow>
      <InfoRow>
        <strong>결제수단</strong> <span>{menuOrderPayment}</span>
      </InfoRow>
      <InfoRow>
        <strong>총 금액</strong> <span>{menuOrderTotalPrice}원</span>
      </InfoRow>

      <TableLayout>
        <thead>
          <tr>
            <th>상세번호</th>
            <th>메뉴명</th>
            <th>수량</th>
            <th>가격</th>
            <th>분류</th>
            <th>특별여부</th>
          </tr>
        </thead>
        <tbody>
          {userOrderInfo.length > 0 ? (
            userOrderInfo.map(
              ({ orderDetailNum, orderDetailQuantity, MenuItem }) => {
                const {
                  menu_item_name,
                  menu_item_price,
                  menu_item_classification,
                  menu_item_is_special_menu,
                } = MenuItem || {};

                return (
                  <tr key={orderDetailNum}>
                    <td>{orderDetailNum}</td>
                    <td>{menu_item_name}</td>
                    <td>{orderDetailQuantity}</td>
                    <td>{menu_item_price}</td>
                    <td>{menu_item_classification}</td>
                    <td>{menu_item_is_special_menu ? "O" : "X"}</td>
                  </tr>
                );
              }
            )
          ) : (
            <tr>
              <td colSpan={6}>상세 주문 내역이 없습니다</td>
            </tr>
          )}
        </tbody>
      </TableLayout>
    </div>
  );
};

const formatDate = (isoString) => {
  if (!isoString) return "";
  return isoString.replace(
    /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}).*/,
    (_, y, m, d, h, min) => `${y}-${m}-${d} ${h}:${min}`
  );
};

export default OrderInfo;

const InfoRow = styled.div`
  height: 30px;
  display: flex;
  padding: 0 10px;
  justify-content: space-between;
`;
