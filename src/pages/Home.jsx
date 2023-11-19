import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { MenuItemAtom } from "../recoil/MenuItemAtom";
import OrderListForm from "../component/OrderListForm";
import { OrderListAtom } from "../recoil/OrderListAtom";
import { Link } from "react-router-dom";

function Home() {
  const menuItemValue = useRecoilValue(MenuItemAtom);
  const [orderList, setOrderList] = useRecoilState(OrderListAtom);
  const [showMenuItem, setShowMenuItem] = useState(menuItemValue);
  const totalPriceRef = useRef();
  const putInOrderList = (e, menuInfo) => {
    totalPriceRef.current.value =
      Number(totalPriceRef.current.value) + menuInfo.menuItemPrice;
    const orderListObj = {
      menuItemNum: menuInfo.menuItemNum,
      menuItemName: menuInfo.menuItemName,
      menuItemPrice: menuInfo.menuItemPrice,
      menuItemQuantity: 1,
    };
    setOrderList([...orderList, orderListObj]);
  };
  useEffect(() => {
    setShowMenuItem(menuItemValue);
  }, [menuItemValue]);

  const searchMenu = (e) => {
    const searchResult = menuItemValue.filter((elem) => {
      return elem.menuItemName.includes(e.target.value);
    });
    setShowMenuItem(searchResult);
  };
  return (
    <>
      <div>
        <SearchBox>
          검색{" "}
          <input
            type="search"
            name="text"
            onChange={searchMenu}
            required
            className="search-form"
          />
        </SearchBox>
      </div>
      <ItemOuterLayout>
        {showMenuItem.length === 0 ? (
          <h3>메뉴가 없습니다</h3>
        ) : (
          <>
            {showMenuItem.map((ele) => {
              return (
                <ItemLayout key={ele.menuItemNum}>
                  <ul>
                    <li>메뉴 번호:{ele.menuItemNum}</li>
                    <li>이름: {ele.menuItemName}</li>
                    <li>가격: {ele.menuItemPrice}</li>
                    <li>분류: {ele.menuItemClassification}</li>
                    <li>
                      <button
                        type={"button"}
                        onClick={(e) => putInOrderList(e, ele)}
                      >
                        주문목록에 담기
                      </button>
                    </li>
                    <li>
                      <Link to={"/menuItemInfo"} state={ele}>
                        <button type={"button"}>메뉴 상세정보</button>
                      </Link>
                    </li>
                  </ul>
                </ItemLayout>
              );
            })}
          </>
        )}
      </ItemOuterLayout>
      <OrderListForm totalPriceRef={totalPriceRef} />
    </>
  );
}

export default Home;

const ItemOuterLayout = styled.section`
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
`;
const ItemLayout = styled.div`
  text-align: center;
  height: 230px;
  width: 170px;
  background-color: white;
  transition: box-shadow 0.2s ease;
`;
const SearchBox = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  justify-content: center;
`;
