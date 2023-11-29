import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { PopupAtom } from "../../../recoil/PopupAtom";
import styled from "styled-components";

function MenuRecipeInfo() {
  const [popup] = useRecoilState(PopupAtom);
  const { menuItemNum } = popup.popupData;

  const [showMenuRecipeInfo, setShowMenuRecipeInfo] = useState([]);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const fetchMenuRecipe = async () => {
      try {
        const result = await axios.get(
          `http://localhost:8080/menus/recipe/${menuItemNum}`
        );
        if (result.status === 200) {
          setShowMenuRecipeInfo(result.data);
        } else {
          alert("레시피 정보를 불러오지 못했습니다.");
        }
      } catch (err) {
        console.error(err);
        alert("오류 발생");
      }
    };
    fetchMenuRecipe();
  }, [menuItemNum, trigger]);

  const udtRecipeBtn = async (menuRecipeNum, usageValue) => {
    try {
      const result = await axios.patch(
        `http://localhost:8080/menus/recipe/${menuRecipeNum}`,
        { menuRecipeUsage: usageValue }
      );
      if (result.status === 200) {
        alert("수정이 완료되었습니다");
        setTrigger((prev) => !prev);
      } else {
        alert("수정 실패");
      }
    } catch (err) {
      console.error(err);
      alert("오류 발생");
    }
  };

  const delRecipeBtn = async (menuRecipeNum) => {
    try {
      const result = await axios.delete(
        `http://localhost:8080/menus/recipe/${menuRecipeNum}`
      );
      if (result.status === 200) {
        alert("삭제가 완료되었습니다");
        setTrigger((prev) => !prev);
      } else {
        alert("삭제 실패");
      }
    } catch (err) {
      console.error(err);
      alert("오류 발생");
    }
  };

  return (
    <div>
      <SubTitle>메뉴번호: {menuItemNum}</SubTitle>
      {showMenuRecipeInfo.length > 0 ? (
        showMenuRecipeInfo.map((elem) => (
          <RecipeCard key={elem.menuRecipeNum}>
            <p>재료번호: {elem.materialNum}</p>
            <p>재료명: {elem.Material?.material_name || "알 수 없음"}</p>
            <p>레시피 번호: {elem.menuRecipeNum}</p>
            <UsageRow>
              사용량:{" "}
              <UsageInput
                type="number"
                name={`usage-${elem.menuRecipeNum}`}
                defaultValue={elem.menuRecipeUsage}
                id={`usage-${elem.menuRecipeNum}`}
              />
              <span>{elem.Material?.material_unit}</span>
            </UsageRow>
            <ButtonRow>
              <ActionButton
                onClick={() => {
                  const input = document.getElementById(
                    `usage-${elem.menuRecipeNum}`
                  );
                  udtRecipeBtn(elem.menuRecipeNum, input.value);
                }}
              >
                수정
              </ActionButton>
              <ActionButton
                $danger
                onClick={() => delRecipeBtn(elem.menuRecipeNum)}
              >
                삭제
              </ActionButton>
            </ButtonRow>
          </RecipeCard>
        ))
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
}

export default MenuRecipeInfo;

const SubTitle = styled.h3`
  margin: 10px 0 20px;
`;

const RecipeCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
  background-color: #fafafa;
`;

const UsageRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
`;

const UsageInput = styled.input`
  padding: 6px;
  width: 80px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  background-color: ${(props) => (props.$danger ? "#c0392b" : "#5e2ca5")};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.$danger ? "#a93226" : "#4a2196")};
  }
`;
