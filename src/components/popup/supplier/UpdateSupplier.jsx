import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import axios from "axios";
import { PopupAtom } from "../../../recoil/PopupAtom";
import { ButtonLayout } from "../../../styles/ButtonLayout";

const UpdateSupplier = () => {
  const [popup, setPopup] = useRecoilState(PopupAtom);
  const { supplierNum, supplierName, supplierAddress, trigger, setTrigger } =
    popup.popupData;

  const [form, setForm] = useState({
    supplierName: "",
    supplierAddress: "",
  });

  useEffect(() => {
    setForm({
      supplierName: supplierName || "",
      supplierAddress: supplierAddress || "",
    });
  }, [supplierName, supplierAddress]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const result = await axios.put(
        `http://localhost:8080/admin/suppliers/${supplierNum}`,
        {
          supplierInfo: form,
        }
      );

      if (result.status === 200) {
        alert("공급업체 수정 완료");
        setTrigger(!trigger);
        setPopup({ isOpen: false, popupType: "", popupData: {} });
      } else {
        alert("수정 실패");
      }
    } catch (err) {
      console.error(err);
      alert("에러 발생");
    }
  };

  return (
    <Wrap>
      <p>공급업체 번호: {supplierNum}</p>
      <Input
        name="supplierName"
        value={form.supplierName}
        onChange={handleChange}
        placeholder="업체명"
      />
      <Input
        name="supplierAddress"
        value={form.supplierAddress}
        onChange={handleChange}
        placeholder="업체 주소"
      />
      <ButtonLayout onClick={handleSubmit}>수정완료</ButtonLayout>
    </Wrap>
  );
};

export default UpdateSupplier;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 300px;
  padding: 10px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  width: 100%;
  &:focus {
    outline: none;
    border-color: #5e2ca5;
  }
`;
