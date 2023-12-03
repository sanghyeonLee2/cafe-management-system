import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { TableLayout } from "../../styles/TableLayout";
import { PopupAtom } from "../../recoil/PopupAtom";
import { ButtonLayout } from "../../styles/ButtonLayout";

function MenuManagement() {
  const setPopup = useSetRecoilState(PopupAtom);
  const [showMenuList, setShowMenuList] = useState([]);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const fetchMenuList = async () => {
      try {
        const res = await axios.get("http://localhost:8080/menus");
        if (res.status === 200) {
          setShowMenuList(res.data);
        } else {
          alert("메뉴를 불러오지 못했습니다.");
        }
      } catch (err) {
        console.error(err);
        alert("오류가 발생했습니다.");
      }
    };
    fetchMenuList();
  }, [trigger]);

  const handleMenuDelete = async (e) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/admin/menus/${e.target.name}`
      );
      if (res.status === 200) {
        alert("메뉴가 삭제되었습니다.");
        setTrigger((prev) => !prev);
      } else {
        alert("삭제 실패");
      }
    } catch (err) {
      console.error(err);
      alert("삭제 중 오류 발생");
    }
  };

  const openUpdatePopup = (menuItem) => {
    setPopup({
      isOpen: true,
      popupType: "메뉴수정",
      popupData: { ...menuItem, trigger, setTrigger },
    });
  };

  const openRecipePopup = (menuItemNum) => {
    setPopup({
      isOpen: true,
      popupType: "레시피보기",
      popupData: { menuItemNum },
    });
  };

  const openAddPopup = () => {
    setPopup({
      isOpen: true,
      popupType: "메뉴추가",
      popupData: { trigger, setTrigger },
    });
  };

  return (
    <TableLayout>
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
          <th>수정/삭제</th>
          <th>레시피</th>
        </tr>
      </thead>
      <tbody>
        {showMenuList.map((item) => (
          <tr key={item.menuItemNum}>
            <td>{item.menuItemNum}</td>
            <td>{item.menuItemPrice}</td>
            <td>{item.menuItemClassification}</td>
            <td>{item.menuItemIsSpecialMenu === 1 ? "O" : "X"}</td>
            <td>{item.menuItemName}</td>
            <td>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <ButtonLayout onClick={() => openUpdatePopup(item)}>
                  수정
                </ButtonLayout>
                <ButtonLayout
                  name={item.menuItemNum}
                  onClick={handleMenuDelete}
                >
                  삭제
                </ButtonLayout>
              </div>
            </td>
            <td>
              <ButtonLayout onClick={() => openRecipePopup(item.menuItemNum)}>
                레시피 보기
              </ButtonLayout>
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan="7">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ButtonLayout onClick={openAddPopup}>메뉴 추가</ButtonLayout>
            </div>
          </td>
        </tr>
      </tbody>
    </TableLayout>
  );
}

export default MenuManagement;
