import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { UserInfoAtom } from "../../recoil/UserAuth";
import { PopupAtom } from "../../recoil/PopupAtom";

const OrderList = () => {
  const userInfo = useRecoilValue(UserInfoAtom);
  const userId = userInfo?.userId;
  const [orders, setOrders] = useState([]);
  const setPopup = useSetRecoilState(PopupAtom);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await axios.get("http://localhost:8080/users/orders", {
          params: { userId },
        });
        if (result.status === 200) {
          setOrders(result.data);
        }
      } catch (err) {
        alert("주문 목록 조회 실패");
        console.error(err);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>내 주문 목록</h2>
      <OrderTable>
        <thead>
          <tr>
            <th>주문번호</th>
            <th>결제방법</th>
            <th>총 금액</th>
            <th>주문일시</th>
            <th>상세보기</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.menuOrderNum}>
                <td>{order.menuOrderNum}</td>
                <td>{order.menuOrderPayment}</td>
                <td>{order.menuOrderTotalPrice}</td>
                <td>{new Date(order.menuOrderDate).toLocaleString()}</td>
                <td>
                  <button
                    onClick={() =>
                      setPopup({
                        isOpen: true,
                        popupType: "주문상세",
                        popupData: order,
                      })
                    }
                  >
                    보기
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">주문 내역이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </OrderTable>
    </div>
  );
};

export default OrderList;

const OrderTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: center;
  }

  th {
    background-color: #f0f0f0;
    font-weight: bold;
  }

  tr:hover {
    background-color: #f9f9f9;
  }

  button {
    padding: 6px 12px;
    background-color: #5e2ca5;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #4a218d;
  }
`;
