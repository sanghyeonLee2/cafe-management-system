import React, {useState} from 'react';
import {useRecoilValue} from "recoil";
import {OrderListAtom} from "../recoil/OrderListAtom";
import axios from "axios";
import {UserIdAtom} from "../recoil/UserAuth";
import {useNavigate} from "react-router-dom";


function OrderListForm(props) {
    const navigate= useNavigate();
    const orderListValue = useRecoilValue(OrderListAtom)
    const userIdValue = useRecoilValue(UserIdAtom)
    const [selectPayment, setSelectPayment] = useState("");
    let totalPrice = 0;
    const calTotalPrice = () => {
        orderListValue.map((ele) => {
            return (
                totalPrice += ele.menuPrice)
        })
        return totalPrice;
    }
    const selectPaymentFtn = (e) => {
        setSelectPayment(e.target.value)
    }
    const newArrFtn = ()=> {
        return (orderListValue.map((ele) => {
            const {menuName, menuPrice, ...rest} = ele
            return rest;
        }))
    }
    //gpt도움
    const orderBtn = async (e) => {
        e.preventDefault();

        const newArrFtn = ()=> {
            return orderListValue.filter((ele) => {
                const {menuName, menuPrice, ...rest} = ele
                return rest;
            })
        }

        const orderObj = {
            orderList: newArrFtn()
            ,
            order: {
                payment: selectPayment,
                userId: userIdValue,
            }
        }
        console.log(orderObj)
        const result = await axios.post("http://localhost:4000/order", orderObj)
        if (result.status === 200) {
            alert("주문을 완료하였습니다")
            navigate("/");
        } else {
            alert("주문 실패")
        }
    }
    //주문 요청 필요 데이터: payment, user_phone_num
    return (
        <div>
            <fieldset>
                <legend><h2>주문목록</h2></legend>
                {orderListValue.length !== 0 ?
                    orderListValue.map((ele) => {
                            return (
                                <div key={ele.menuNum}>
                                    <ul>
                                        <li>
                                            메뉴이름 : {ele.menuName}
                                        </li>
                                        <li>메뉴 가격 : {ele.menuPrice}</li>
                                        <li>수량 : {ele.menuQuantity}</li>
                                    </ul>
                                </div>
                            )
                        }
                    )
                    : <h2>주문목록이 없습니다.</h2>
                }
                <form onSubmit={orderBtn}>
                    <div>
                        <h3>총 결제금액</h3>
                        {calTotalPrice()} 원
                    </div>
                    <div>
                        <h3>결제방식</h3>
                        <input type={"radio"} name={"payment"} value={"cash"} onChange={selectPaymentFtn}/>현금
                        <input type={"radio"} name={"payment"} value={"creditCard"} onChange={selectPaymentFtn}/>신용카드
                        <input type={"radio"} name={"payment"} value={"check"} onChange={selectPaymentFtn}/>수표
                    </div>
                    <button type={"submit"}>결제하기</button>
                </form>
            </fieldset>
        </div>
    )
        ;
}

export default OrderListForm;