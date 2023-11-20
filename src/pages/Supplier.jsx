import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Supplier(props) {
  const location = useLocation();
  const [supplyPeriodPayment, setSupplyPeriodPayment] = useState();
  const [materialArr, setMaterialArr] = useState([
    {
      materialName: "",
      materialQuantity: "",
      materialUnit: "",
    },
  ]);
  const supplierInfo = location.state;
  const supplyOnsubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post("http://localhost:8080/supply", {
      supplyInfo: {
        supplyPeriodPayment,
        supplierNum: supplierInfo.supplierNum,
      },
      materialArr,
    }); //작성중
    if (result.status === 200) {
      alert("공급을 완료하였습니다");
      return;
    }
    alert("공급 실패");
  };
  const formInputChg = (e, idx) => {
    setMaterialArr((prev) =>
      prev.map((item, index) =>
        index !== idx ? item : { ...item, [e.target.name]: e.target.value }
      )
    ); //gpt사용
  };
  return (
    <div>
      <>
        <h2>공급업체</h2>
        <h3>업체번호: {supplierInfo.supplierNum}</h3>
        <h3>이름: {supplierInfo.supplierName}</h3>
        <h3>주소: {supplierInfo.supplierAddress}</h3>
      </>
      <div>
        <form onSubmit={supplyOnsubmit}>
          <h3>재료 공급</h3>
          납기
          <input
            type={"date"}
            required
            onChange={(e) => setSupplyPeriodPayment(e.target.value)}
          />
          {[...Array(materialArr.length)].map((val, idx) => {
            return (
              <div key={idx}>
                재료이름
                <input
                  type={"text"}
                  required
                  name={"materialName"}
                  onChange={(e) => formInputChg(e, idx)}
                />
                개수
                <input
                  type={"number"}
                  required
                  name={"materialQuantity"}
                  onChange={(e) => formInputChg(e, idx)}
                />
                재료단위
                <input
                  type={"text"}
                  required
                  name={"materialUnit"}
                  onChange={(e) => formInputChg(e, idx)}
                />
              </div>
            );
          })}
          <button
            type={"button"}
            onClick={() =>
              setMaterialArr([
                ...materialArr,
                {
                  materialName: "",
                  materialQuantity: "",
                  materialUnit: "",
                },
              ])
            }
          >
            공급재료 추가
          </button>
          <button
            type={"button"}
            onClick={() =>
              setMaterialArr(materialArr.slice(0, materialArr.length - 1))
            }
          >
            공급재료 삭제
          </button>
          <button type={"submit"}>공급요청</button>
        </form>
      </div>
    </div>
  );
}

export default Supplier;
