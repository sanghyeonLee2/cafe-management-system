import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { PopupAtom } from "../../../recoil/PopupAtom";
import axios from "axios";
import styled from "styled-components";

const UpdateMenu = () => {
  const [popup, setPopup] = useRecoilState(PopupAtom);
  const {
    menuItemNum,
    menuItemPrice,
    menuItemClassification,
    menuItemIsSpecialMenu,
    menuItemName,
    trigger,
    setTrigger,
  } = popup.popupData;

  const [form, setForm] = useState({
    menuItemPrice,
    menuItemClassification,
    menuItemIsSpecialMenu,
    menuItemName,
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onUpdate = async () => {
    try {
      const result = await axios.put(
        `http://localhost:8080/admin/menus/${menuItemNum}`,
        {
          menuFormState: form,
        }
      );
      if (result.status === 200) {
        alert("수정 완료");
        setTrigger(!trigger);
        setPopup({ isOpen: false, popupType: "", popupData: null });
      }
    } catch {
      alert("수정 실패");
    }
  };

  return (
    <FormWrap>
      <Input disabled value={menuItemNum} />
      <Input
        name="menuItemPrice"
        type="number"
        value={form.menuItemPrice}
        onChange={onChange}
        placeholder="가격"
      />
      <Select
        name="menuItemClassification"
        value={form.menuItemClassification}
        onChange={onChange}
      >
        <option value="">===분류선택===</option>
        <option value="커피">커피</option>
        <option value="차">차</option>
        <option value="음료">음료</option>
        <option value="제과">제과</option>
        <option value="상품">상품</option>
        <option value="세트메뉴">세트메뉴</option>
        <option value="상품권">상품권</option>
        <option value="무선인터넷">무선인터넷</option>
      </Select>
      <Select
        name="menuItemIsSpecialMenu"
        value={form.menuItemIsSpecialMenu}
        onChange={onChange}
      >
        <option value={0}>X</option>
        <option value={1}>O</option>
      </Select>
      <Input
        name="menuItemName"
        value={form.menuItemName}
        onChange={onChange}
        placeholder="이름"
      />
      <ButtonGroup>
        <Button onClick={onUpdate}>수정완료</Button>
        <Button
          onClick={() =>
            setPopup({ isOpen: false, popupType: "", popupData: null })
          }
          $cancel
        >
          취소
        </Button>
      </ButtonGroup>
    </FormWrap>
  );
};

export default UpdateMenu;

const FormWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  min-width: 300px;
`;

const Input = styled.input`
  padding: 8px;
  width: 100%;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Select = styled.select`
  padding: 8px;
  width: 100%;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 8px 14px;
  background-color: ${(props) => (props.$cancel ? "#aaa" : "#5e2ca5")};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.$cancel ? "#888" : "#4a2196")};
  }
`;
