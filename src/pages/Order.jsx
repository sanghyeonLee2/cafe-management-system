import React, {useEffect, useState} from 'react';
import {UserInfoAtom} from "../recoil/UserAuth";
import {useRecoilValue} from "recoil";
import axios from "axios";
import {Link} from "react-router-dom";
import {CenterLayout} from "../styles/CenterSortLayout";
import {TextAlignCenter} from "../styles/TextAlignCenter";

function Order(props) {
    const userId = useRecoilValue(UserInfoAtom).userId
    const [userOrderInfo, setUserOrderInfo] = useState([])
    useEffect(() => {
        const fetchOrderInfo = async () => {
            const result = await
                axios.get("http://localhost:8080/menu-order/", {
                    params: {
                        userId
                    }
                })
            if (result.status === 200) {
                //result.data.map((ele)=>{ele.materialUsage= ""})
                setUserOrderInfo(result.data)
            } else {
                alert("메뉴를 불러오지 못했습니다.")
            }
        }
        fetchOrderInfo()
    }, []);
    return (
        <>
        <TextAlignCenter>
           <h3> {userId}님의 주문내역</h3>
        </TextAlignCenter>
        <CenterLayout>

            <table border={"1"}>
                <caption><h2>주문관리</h2></caption>
                <thead>
                <tr>
                    <th>주문번호</th>
                    <th>결제수단</th>
                    <th>주문 날짜</th>
                    <th>총 주문금액</th>
                    <th>상세내역</th>
                </tr>
                </thead>
                <tbody>
                {userOrderInfo.length > 0 ?
                    userOrderInfo.map((ele, idx) =>
                        <tr key={idx}>
                            <td>{ele.menuOrderNum}</td>
                            <td>{ele.menuOrderPayment}</td>
                            <td>{ele.menuOrderDate}</td>
                            <td>{ele.menuOrderTotalPrice}</td>
                            <td>
                                <Link to={"/order-info"} state={ele.menuOrderNum}>
                                    <button type={"button"}>
                                        상세내역보기
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    )
                    :
                    <tr>
                        <td>주문이 없습니다</td>
                    </tr>
                }
                </tbody>
            </table>
        </CenterLayout>
        </>
    );
}

export default Order;