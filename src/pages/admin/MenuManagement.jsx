import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { MenuItemAtom } from "../../recoil/MenuItemAtom";
import CreateMenuRecipe from "../../component/CreateMenuRecipe";
import MenuRecipeInfo from "../../component/MenuRecipeInfo";
import { CenterLayout } from "../../styles/CenterSortLayout";

function MenuManagement(props) {
  const [menuFormState, setMenuFormState] = useState({
    menuItemPrice: 0,
    menuItemClassification: "",
    menuItemIsSpecialMenu: 0,
    menuItemName: "",
  });
  const [showMenuList, setShowMenuList] = useRecoilState(MenuItemAtom);
  const [trigger, setTrigger] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isInsertRecipe, setIsInsertRecipe] = useState(false);
  const [showRecipePopUp, setShowRecipePopUp] = useState(false);
  const inputFormChg = (e) => {
    setMenuFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const fetchMenuInfo = async () => {
      const result = await axios.get("http://localhost:8080/menu-item/");
      if (result.status === 200) {
        setShowMenuList(result.data);
        return;
      }
      alert("메뉴를 불러오지 못했습니다.");
    };
    fetchMenuInfo();
  }, [trigger]);

  const delMenuBtn = async (e) => {
    const result = await axios.delete("http://localhost:8080/menu-item/", {
      data: { menuItemNum: e.target.name },
    });
    if (result.status === 200) {
      alert("메뉴가 삭제되었습니다.");
      setTrigger(!trigger);
      return;
    }
    alert("삭제 실패");
  };

  const udtSupplierBtn = async () => {
    const result = await axios.put("http://localhost:8080/menu-item/", {
      menuItemNum: isPopupOpen,
      menuFormState,
    });
    if (result.status === 200) {
      alert("메뉴가 수정되었습니다.");
      setIsPopupOpen(false);
      setTrigger(!trigger);
      return;
    }
    alert("메뉴 수정 실패");
    setIsPopupOpen(false);
  };

  const udtMenuForm = (ele) => {
    setMenuFormState({
      menuItemName: `${ele.menuItemName}`,
      menuItemIsSpecialMenu: `${ele.menuItemIsSpecialMenu}`,
      menuItemClassification: `${ele.menuItemClassification}`,
      menuItemPrice: `${ele.menuItemPrice}`,
    });
    setIsPopupOpen(ele.menuItemNum);
  };
  return (
    <div>
      <div>
        {showRecipePopUp && (
          <MenuRecipeInfo
            menuItemNum={showRecipePopUp}
            setShowRecipePopUp={setShowRecipePopUp}
          />
        )}
      </div>
      {isInsertRecipe && (
        <CreateMenuRecipe
          menuFormState={menuFormState}
          trigger={trigger}
          setTrigger={setTrigger}
          setIsInsertRecipe={setIsInsertRecipe}
        />
      )}
      {isPopupOpen && (
        <div>
          <input type={"text"} defaultValue={isPopupOpen} disabled />
          <input
            type={"number"}
            defaultValue={menuFormState.menuItemPrice}
            name={"menuItemPrice"}
            onChange={inputFormChg}
          />
          <select
            defaultValue={menuFormState.menuItemClassification}
            name={"menuItemClassification"}
            onChange={inputFormChg}
          >
            <option value={"none"}>===분류선택===</option>
            <option value={"커피"}>커피</option>
            <option value={"차"}>차</option>
            <option value={"음료"}>음료</option>
            <option value={"제과"}>제과</option>
            <option value={"상품"}>상품</option>
            <option value={"세트메뉴"}>세트메뉴</option>
            <option value={"상품권"}>상품권</option>
            <option value={"무선인터넷"}>무선인터넷</option>
          </select>
          <select
            defaultValue={menuFormState.menuItemIsSpecialMenu}
            name={"menuItemIsSpecialMenu"}
            onChange={inputFormChg}
          >
            <option value={"1"}>1</option>
            <option value={"0"}>0</option>
          </select>
          <input
            type={"text"}
            defaultValue={menuFormState.menuItemName}
            name={"menuItemName"}
            onChange={inputFormChg}
          />
          <button type={"button"} onClick={udtSupplierBtn}>
            수정완료
          </button>
          <button
            type={"button"}
            onClick={() => {
              setIsPopupOpen(false);
            }}
          >
            취소
          </button>
        </div>
      )}
      <table border={"1"}>
        <caption>
          <h2>메뉴관리</h2>
        </caption>
        <thead>
          <tr>
            <th>항목번호</th>
            <th>가격</th>
            <th>분류</th>
            <th>특별메뉴구분</th>
            <th>이름</th>
            <th>추가/수정/삭제</th>
            <th>레시피</th>
          </tr>
        </thead>
        <tbody>
          {showMenuList.length !== 0 &&
            showMenuList.map((ele) => {
              return (
                <tr key={ele.menuItemNum}>
                  <td>{ele.menuItemNum}</td>
                  <td>{ele.menuItemPrice}</td>
                  <td>{ele.menuItemClassification}</td>
                  <td>{ele.menuItemIsSpecialMenu === 1 ? "O" : "X"}</td>
                  <td>{ele.menuItemName}</td>
                  <td>
                    <button type={"button"} onClick={() => udtMenuForm(ele)}>
                      수정
                    </button>
                    <button
                      type={"button"}
                      name={ele.menuItemNum}
                      onClick={delMenuBtn}
                    >
                      삭제
                    </button>
                  </td>
                  <td>
                    <button
                      type={"button"}
                      onClick={() => setShowRecipePopUp(ele.menuItemNum)}
                    >
                      레시피 보기
                    </button>
                  </td>
                </tr>
              );
            })}
          <tr>
            <td>
              <input
                type={"number"}
                placeholder={"항목번호 자동 생성"}
                disabled
              />
            </td>
            <td>
              <input
                type={"number"}
                name={"menuItemPrice"}
                onChange={inputFormChg}
              />
            </td>
            <td>
              <select name={"menuItemClassification"} onChange={inputFormChg}>
                <option>===분류선택===</option>
                <option>커피</option>
                <option>차</option>
                <option>음료</option>
                <option>제과</option>
                <option>상품</option>
                <option>세트메뉴</option>
                <option>상품권</option>
                <option>무선인터넷</option>
              </select>
            </td>
            <td>
              <select name={"menuItemIsSpecialMenu"} onChange={inputFormChg}>
                <option value={"none"}>===선택===</option>
                <option value={1}>O</option>
                <option value={0}>X</option>
              </select>
            </td>
            <td>
              <input
                type={"text"}
                name={"menuItemName"}
                onChange={inputFormChg}
              />
            </td>
            <td>
              <button type={"button"} onClick={() => setIsInsertRecipe(true)}>
                추가
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MenuManagement;
