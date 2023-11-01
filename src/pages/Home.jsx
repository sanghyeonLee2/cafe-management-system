import React from 'react';
import styled from "styled-components";
import {useRecoilState, useRecoilValue} from "recoil";
import {MenuItemAtom} from "../recoil/MenuItemAtom";
import Order from "../component/Order";
import OrderListForm from "../component/OrderListForm";
import {OrderListAtom} from "../recoil/OrderListAtom";

function Home() {
    const menuItemValue = useRecoilValue(MenuItemAtom)
    const [orderList, setOrderList] = useRecoilState(OrderListAtom)
    const putInOrderList = (e,menuInfo) => {
        const orderListObj = {
            menuNum: menuInfo.num,
            menuName: menuInfo.menu_name,
            menuPrice: menuInfo.price,
            menuQuantity: e.target.previousSibling.value
        }
        setOrderList([...orderList,orderListObj])
    }
    return (
        <>
            <ItemOuterLayout>
                {menuItemValue.length === 0 ? <h3>메뉴가 없습니다</h3> :
                    <>
                        {menuItemValue.map((ele) => {
                            return (
                                <ItemLayout key={ele.num}>
                                    <ul>
                                        <li>
                                            메뉴 번호:{ele.num}
                                        </li>
                                        <li>
                                            이름: {ele.menu_name}
                                        </li>
                                        <li>
                                            가격: {ele.price}
                                        </li>
                                        <li>
                                            분류: {ele.classification}
                                        </li>
                                        <li>
                                            <div>수량<input type={"number"} placeholder={"수량을 입력하세요"} defaultValue={1}
                                                          name={"menuQuantity"}/>
                                                <button type={"button"} onClick={(e)=>putInOrderList(e,ele)}>주문목록에 담기</button>
                                            </div>
                                        </li>
                                    </ul>
                                </ItemLayout>
                            )
                        })}
                    </>}
            </ItemOuterLayout>
            <Order/>
            <OrderListForm/>
        </>
    );
}

export default Home;

const ItemOuterLayout = styled.section`
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
`
const ItemLayout = styled.div`
  height: 230px;
  width: 170px;
  background-color: aqua`