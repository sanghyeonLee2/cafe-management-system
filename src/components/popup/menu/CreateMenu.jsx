import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { PopupAtom } from "../../../recoil/PopupAtom";

function CreateMenu() {
  const [popup, setPopup] = useRecoilState(PopupAtom);
  const { setTrigger, trigger } = popup.popupData;

  const [menuFormState, setMenuFormState] = useState({
    menuItemPrice: 0,
    menuItemClassification: "",
    menuItemIsSpecialMenu: 0,
    menuItemName: "",
  });

  const [materialList, setMaterialList] = useState([]);
  const [recipeUsage, setRecipeUsage] = useState({});

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const result = await axios.get("http://localhost:8080/admin/materials");
        if (result.status === 200) {
          setMaterialList(result.data);
        }
      } catch (err) {
        alert("재료 목록을 불러오지 못했습니다.");
      }
    };
    fetchMaterials();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleUsageChange = (e, materialNum) => {
    const value = e.target.value;
    setRecipeUsage((prev) => ({ ...prev, [materialNum]: value }));
  };

  const handleSubmit = async () => {
    const finalMenuRecipe = Object.entries(recipeUsage)
      .filter(([_, usage]) => usage > 0)
      .map(([materialNum, usage]) => ({
        materialNum: parseInt(materialNum),
        menuRecipeUsage: parseInt(usage),
      }));

    try {
      const result = await axios.post("http://localhost:8080/admin/menus", {
        ...menuFormState,
        finalMenuRecipe,
      });
      if (result.status === 200) {
        alert("메뉴 추가 완료");
        setTrigger(!trigger);
        setPopup({ isOpen: false, popupType: "", popupData: {} });
      }
    } catch (err) {
      alert("메뉴 추가 실패");
    }
  };

  return (
    <FormWrap>
      <Input name="menuItemName" placeholder="이름" onChange={handleChange} />
      <Input
        name="menuItemPrice"
        type="number"
        placeholder="가격"
        onChange={handleChange}
      />
      <Select name="menuItemClassification" onChange={handleChange}>
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
      <Select name="menuItemIsSpecialMenu" onChange={handleChange}>
        <option value="0">X</option>
        <option value="1">O</option>
      </Select>

      <Divider />
      <h4>사용 재료 입력</h4>
      {materialList.map((mat) => (
        <MaterialRow key={mat.materialNum}>
          <MaterialInfo>
            <strong>{mat.materialName}</strong> ({mat.materialUnit})
            <QuantityText>재고: {mat.materialQuantity}</QuantityText>
          </MaterialInfo>
          <Input
            type="number"
            min={0}
            max={mat.materialQuantity}
            placeholder="사용량"
            onChange={(e) => handleUsageChange(e, mat.materialNum)}
          />
        </MaterialRow>
      ))}

      <ButtonGroup>
        <Button onClick={handleSubmit}>추가</Button>
        <Button
          $cancel
          onClick={() =>
            setPopup({ isOpen: false, popupType: "", popupData: {} })
          }
        >
          취소
        </Button>
      </ButtonGroup>
    </FormWrap>
  );
}

export default CreateMenu;

const FormWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  min-width: 320px;
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

const Divider = styled.hr`
  width: 100%;
  margin: 12px 0;
  border: 1px dashed #ccc;
`;

const MaterialRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  span {
    flex: 1;
    font-size: 14px;
  }

  input {
    width: 80px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;
const MaterialInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  font-size: 14px;
  min-width: 180px;
`;

const QuantityText = styled.span`
  font-size: 12px;
  color: #666;
  margin-top: 2px;
`;

const Button = styled.button`
  padding: 8px 14px;
  background-color: ${(props) => (props.$cancel ? "#888" : "#5e2ca5")};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.$cancel ? "#555" : "#4a2196")};
  }
`;
