import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useRecoilValue} from "recoil";
import {UserIdAtom} from "../../recoil/UserAuth";

function OrderManagement(props) {
    const [showMaterial, setShowMaterial] = useState([])
    const userIdValue = useRecoilValue(UserIdAtom)

    useEffect(() => {
        const fetchOrderInfo = async () => {
            const result = await
                axios.get("http://localhost:8080/admin/order", {
                    params: {
                        userId: userIdValue
                    }
                })
            if (result.status === 200) {
                //result.data.map((ele)=>{ele.materialUsage= ""})
                setShowMaterial(result.data)
            } else {
                alert("재료를 불러오지 못했습니다.")
            }
        }
        fetchOrderInfo()
    }, []);
    return (
        <div>
            <table border={"1"}>
                <caption><h2>주문관리</h2></caption>
                <thead>
                <tr>
                    <th>주문번호</th>
                    <th>고객 ID</th>
                    <th>고객 이름</th>
                    <th>고객 이름</th>
                    <th>고객 연락처</th>
                    <th>주문 날짜</th>
                    <th>결제수단</th>
                    <th>배송지</th>
                    <th>총 주문금액</th>
                </tr>
                </thead>
                <tbody>
                {showMaterial.map((ele) =>
                    <tr key={ele.materialNum}>
                        <th>주문번호</th>
                        <th>고객 ID</th>
                        <th>고객 이름</th>
                        <th>고객 이름</th>
                        <th>고객 연락처</th>
                        <th>주문 날짜</th>
                        <th>결제수단</th>
                        <th>배송지</th>
                        <th>총 주문금액</th>
                    </tr>)
                }
                </tbody>
            </table>
        </div>
    );
}

export default OrderManagement;