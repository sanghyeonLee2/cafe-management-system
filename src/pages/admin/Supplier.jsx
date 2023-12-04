import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { ButtonLayout } from "../../styles/ButtonLayout";

function Supplier() {
  const location = useLocation();
  const [supplyPeriodPayment, setSupplyPeriodPayment] = useState();
  const [materialArr, setMaterialArr] = useState([
    {
      materialName: "",
      materialQuantity: "",
      materialUnit: "",
      materialPrice: "",
    },
  ]);
  const supplierInfo = location.state;

  const supplyOnsubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post(
      "http://localhost:8080/admin/suppliers/supply",
      {
        supplyInfo: {
          supplyPeriodPayment,
          supplierNum: supplierInfo.supplierNum,
        },
        materialArr,
      }
    );

    if (result.status === 200) {
      alert("공급을 완료하였습니다");
    } else {
      alert("공급 실패");
    }
  };

  const formInputChg = (e, idx) => {
    setMaterialArr((prev) =>
      prev.map((item, index) =>
        index !== idx ? item : { ...item, [e.target.name]: e.target.value }
      )
    );
  };

  return (
    <div>
      <InfoBox>
        <h2>공급업체</h2>
        <p>업체번호: {supplierInfo.supplierNum}</p>
        <p>이름: {supplierInfo.supplierName}</p>
        <p>주소: {supplierInfo.supplierAddress}</p>
      </InfoBox>
      <InfoBox>
        <form onSubmit={supplyOnsubmit}>
          <h2>재료 공급</h2>
          <Label>
            납기일자
            <Input
              type="date"
              required
              onChange={(e) => setSupplyPeriodPayment(e.target.value)}
            />
          </Label>

          {materialArr.map((val, idx) => (
            <MaterialRow key={idx}>
              <Label>
                재료이름
                <Input
                  type="text"
                  name="materialName"
                  required
                  onChange={(e) => formInputChg(e, idx)}
                />
              </Label>
              <Label>
                수량
                <Input
                  type="number"
                  name="materialQuantity"
                  required
                  onChange={(e) => formInputChg(e, idx)}
                />
              </Label>
              <Label>
                단위
                <Input
                  type="text"
                  name="materialUnit"
                  required
                  onChange={(e) => formInputChg(e, idx)}
                />
              </Label>
              <Label>
                금액
                <Input
                  type="number"
                  name="materialPrice"
                  required
                  onChange={(e) => formInputChg(e, idx)}
                />
              </Label>
            </MaterialRow>
          ))}

          <ButtonGroup>
            <ButtonLayout
              type="button"
              onClick={() =>
                setMaterialArr([
                  ...materialArr,
                  { materialName: "", materialQuantity: "", materialUnit: "" },
                ])
              }
            >
              공급재료 추가
            </ButtonLayout>

            <ButtonLayout
              type="button"
              onClick={() =>
                setMaterialArr(materialArr.slice(0, materialArr.length - 1))
              }
            >
              공급재료 삭제
            </ButtonLayout>

            <ButtonLayout type="submit">공급요청</ButtonLayout>
          </ButtonGroup>
        </form>
      </InfoBox>
    </div>
  );
}

export default Supplier;

const InfoBox = styled.div`
  background: #ffffff;
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 24px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  line-height: 2;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: 500;
  font-size: 14px;
`;

const MaterialRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 12px;
  align-items: flex-end;

  > label {
    flex: 1 1 200px;
  }
`;

const Input = styled.input`
  padding: 10px;
  margin-top: 6px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;

  button {
    width: 100%;
    padding: 12px;
    font-weight: bold;
  }
`;
