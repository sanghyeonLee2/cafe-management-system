import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import axios from "axios";

function Supplier(props) {
    const location = useLocation();
    const [periodPayment, setPeriodPayment] = useState();
    const [materialArr, setMaterialArr] = useState([{
        materialNum: "", materialName: "", materialQuantity: "", materialPrice: "", materialUnit: ""
    }])
    console.log(materialArr)
    const supplierInfo = location.state
    const supplyOnsubmit = async (e) => {
        e.preventDefault()
        const result = await axios.post("http://localhost:4000/supply", {
            supplyInfo: {
                periodPayment,
                supplierNum: supplierInfo.num
            },
            supplyDetail: materialArr
        })//작성중
        if (result.status === 200) {
            alert("공급을 완료하였습니다")
        } else {
            alert("공급 실패")
        }
    }
    const formInputChg = (e, idx) => {
        setMaterialArr((prev) =>
            prev.map((item, index) =>
                index !== idx
                    ? item
                    : {...item, [e.target.name]: e.target.value}
            )) //gpt사용
    }
    return (
        <div>
            <>
                <h2>공급업체</h2>
                <h3>이름: {supplierInfo.supplier_name}</h3>
                <h3>주소: {supplierInfo.address}</h3>
            </>
            <div>
                <form onSubmit={supplyOnsubmit}>
                    <h3>재료 공급</h3>
                    납기<input type={"date"} name={"materialDate"} onChange={(e) => setPeriodPayment(e.target.value)}/>
                    {[...Array(materialArr.length)].map((val, idx) => {
                        return (<div key={idx}>
                            재료번호<input type={"number"} name={"materialNum"} onChange={(e) => formInputChg(e, idx)}/>
                            재료이름<input type={"text"} name={"materialName"} onChange={(e) => formInputChg(e, idx)}/>
                            개수<input type={"number"} name={"materialQuantity"} onChange={(e) => formInputChg(e, idx)}/>
                            가격<input type={"number"} name={"materialPrice"} onChange={(e) => formInputChg(e, idx)}/>
                            재료단위<input type={"text"} name={"materialUnit"} onChange={(e) => formInputChg(e, idx)}/>
                        </div>)
                    })}
                    <button type={"button"} onClick={() => setMaterialArr([...materialArr, {
                        materialName: "",
                        materialQuantity: "",
                        materialDate: "",
                        materialPrice: ""
                    }])}>공급재료 추가
                    </button>
                    <button type={"button"}
                            onClick={() => setMaterialArr(materialArr.slice(0, materialArr.length - 1))}>공급재료 삭제
                    </button>
                    <button type={"submit"}>공급</button>
                </form>
            </div>
        </div>);
}

export default Supplier;