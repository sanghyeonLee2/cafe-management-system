import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { CenterLayout } from "../styles/CenterSortLayout";
import { TextAlignCenter } from "../styles/TextAlignCenter";

function Order(props) {
  const location = useLocation().state;
  console.log(location);
  const [userOrderInfo, setUserOrderInfo] = useState([]);
  useEffect(() => {
    const fetchOrderInfo = async () => {
      const result = await axios.get("http://localhost:8080/menu-order/info", {
        params: {
          menuOrderNum: location,
        },
      });
      if (result.status === 200) {
        //result.data.map((ele)=>{ele.materialUsage= ""})
        setUserOrderInfo(result.data);
      } else {
        alert("재료를 불러오지 못했습니다.");
      }
    };
    fetchOrderInfo();
  }, []);
  return (
    <div>
      <CenterLayout>
        <table border={"1"}>
          <caption>
            <h2>주문상세</h2>
          </caption>
          <thead>
            <tr>
              <th>메뉴 번호</th>
              <th>메뉴 이름</th>
              <th>메뉴 수량</th>
              <th>메뉴 가격</th>
              <th>메뉴 분류</th>
              <th>특별 메뉴 여부</th>
            </tr>
          </thead>
          <tbody>
            {userOrderInfo.length > 0 ? (
              userOrderInfo.map((ele, idx) => (
                <tr key={idx}>
                  <td>{ele.menu_item_num}</td>
                  <td>{ele.menu_item_name}</td>
                  <td>{ele.order_detail_quantity}</td>
                  <td>{ele.menu_item_price}</td>
                  <td>{ele.menu_item_classification}</td>
                  <td>{ele.menu_item_is_special_menu === 1 ? "O" : "X"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>주문이 없습니다</td>
              </tr>
            )}
          </tbody>
        </table>
      </CenterLayout>
    </div>
  );
}

export default Order;
