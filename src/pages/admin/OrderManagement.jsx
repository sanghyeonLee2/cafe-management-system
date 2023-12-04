import React, { useEffect, useState } from "react";
import axios from "axios";
import { TableLayout } from "../../styles/TableLayout";
import { ButtonLayout } from "../../styles/ButtonLayout";
import { useSetRecoilState } from "recoil";
import { PopupAtom } from "../../recoil/PopupAtom";

function OrderManagement() {
  const [showMaterial, setShowMaterial] = useState([]);
  const setPopup = useSetRecoilState(PopupAtom);

  const formatDate = (isoString) => {
    if (!isoString) return "";
    return isoString.replace(
      /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}).*/,
      (_, y, m, d, h, min) => `${y}-${m}-${d} ${h}:${min}`
    );
  };

  useEffect(() => {
    const fetchOrderInfo = async () => {
      try {
        const result = await axios.get("http://localhost:8080/admin/orders");
        if (result.status === 200) {
          setShowMaterial(result.data);
        } else {
          alert("주문를 불러오지 못했습니다.");
        }
      } catch (err) {
        console.error(err);
        alert("오류 발생");
      }
    };
    fetchOrderInfo();
  }, []);

  const handleDetailClick = (orderInfo) => {
    setPopup({
      isOpen: true,
      popupType: "주문상세",
      popupData: orderInfo,
    });
  };

  return (
    <TableLayout>
      <caption>
        <h2>주문관리</h2>
      </caption>
      <thead>
        <tr>
          <th>주문번호</th>
          <th>고객 ID</th>
          <th>고객 이름</th>
          <th>고객 연락처</th>
          <th>주문 날짜</th>
          <th>결제수단</th>
          <th>주소</th>
          <th>총 주문금액</th>
          <th>주문 상세</th>
        </tr>
      </thead>
      <tbody>
        {showMaterial.length > 0 ? (
          showMaterial.map((ele) => (
            <tr key={ele.menuOrderNum}>
              <td>{ele.menuOrderNum}</td>
              <td>{ele.userId}</td>
              <td>{ele.User?.userName}</td>
              <td>{ele.User?.userPhoneNum}</td>
              <td>{formatDate(ele.menuOrderDate)}</td>
              <td>{ele.menuOrderPayment}</td>
              <td>{ele.User?.userAddress}</td>
              <td>{ele.menuOrderTotalPrice}</td>
              <td>
                <ButtonLayout onClick={() => handleDetailClick(ele)}>
                  상세
                </ButtonLayout>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={9}>주문이 없습니다</td>
          </tr>
        )}
      </tbody>
    </TableLayout>
  );
}

export default OrderManagement;
