import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useRecoilState } from "recoil";
import { ButtonLayout } from "../../../styles/ButtonLayout";
import { PopupAtom } from "../../../recoil/PopupAtom";

const CreateSupplier = () => {
  const [form, setForm] = useState({
    supplierName: "",
    supplierAddress: "",
  });
  const [popup, setPopup] = useRecoilState(PopupAtom);
  const { setTrigger, trigger } = popup.popupData || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:8080/admin/suppliers",
        form
      );
      if (result.status === 200) {
        alert("공급업체가 추가되었습니다.");
        if (setTrigger) setTrigger(!trigger);
        setPopup({ isOpen: false, popupType: "", popupData: {} });
      } else {
        alert("추가에 실패했습니다.");
      }
    } catch (err) {
      console.error(err);
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        공급업체명
        <Input
          type="text"
          name="supplierName"
          value={form.supplierName}
          onChange={handleChange}
          required
        />
      </Label>
      <Label>
        공급업체 주소
        <Input
          type="text"
          name="supplierAddress"
          value={form.supplierAddress}
          onChange={handleChange}
          required
        />
      </Label>
      <ButtonLayout type="submit">추가</ButtonLayout>
    </Form>
  );
};

export default CreateSupplier;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  gap: 5px;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;
