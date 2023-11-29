import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { PopupAtom } from "../../../recoil/PopupAtom";
import axios from "axios";
import { ButtonLayout } from "../../../styles/ButtonLayout";

const MaterialUpdate = () => {
  const [materialFormState, setMaterialFormState] = useState({
    materialNum: "",
    materialUnit: "",
    materialName: "",
    materialQuantity: "",
  });

  const [popup, setPopup] = useRecoilState(PopupAtom);

  useEffect(() => {
    setMaterialFormState({
      materialUnit: popup.popupData.materialUnit,
      materialName: popup.popupData.materialName,
      materialQuantity: popup.popupData.materialQuantity,
    });
  }, []);

  const inputFormChg = (e) => {
    setMaterialFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      materialNum: popup.popupData.materialNum,
    }));
  };

  const materialUdtBtn = async () => {
    const result = await axios.put(
      `http://localhost:8080/admin/materials/${popup.popupData.materialNum}`,
      materialFormState
    );
    if (result.status === 200) {
      alert("재료수정 성공");
      popup.popupData.setTrigger(!popup.popupData.trigger);
      setPopup(false);
      return;
    }
    alert("수정 실패");
  };

  return (
    <Wrapper>
      <SubTitle>재료번호: {popup.popupData.materialNum}</SubTitle>
      <PopupInput
        type="text"
        name="materialUnit"
        onChange={inputFormChg}
        defaultValue={popup.popupData.materialUnit}
        placeholder="단위"
      />
      <PopupInput
        type="text"
        name="materialName"
        defaultValue={popup.popupData.materialName}
        onChange={inputFormChg}
        placeholder="이름"
      />
      <PopupInput
        type="number"
        name="materialQuantity"
        defaultValue={popup.popupData.materialQuantity}
        onChange={inputFormChg}
        placeholder="수량"
      />
      <ButtonLayout onClick={materialUdtBtn}>완료</ButtonLayout>
    </Wrapper>
  );
};

export default MaterialUpdate;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  min-width: 300px;
`;

const SubTitle = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
  font-weight: bold;
`;

const PopupInput = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #5e2ca5;
  }
`;
