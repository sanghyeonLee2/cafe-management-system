import React, { useEffect, useState } from "react";
import axios from "axios";
import { ButtonLayout } from "../../styles/ButtonLayout";
import { useSetRecoilState } from "recoil";
import { PopupAtom } from "../../recoil/PopupAtom";
import { TableLayout } from "../../styles/TableLayout";

function MaterialManagement() {
  const [materials, setMaterials] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const setPopup = useSetRecoilState(PopupAtom);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const { data, status } = await axios.get(
          "http://localhost:8080/admin/materials"
        );
        if (status === 200) setMaterials(data);
      } catch {
        alert("재료를 불러오지 못했습니다.");
      }
    };
    fetchMaterials();
  }, [trigger]);

  const openPopup = (material) => {
    setPopup({
      popupType: "재료수정",
      isOpen: true,
      popupData: { ...material, setTrigger, trigger },
    });
  };

  return (
    <TableLayout>
      <caption>
        <h2>재료관리</h2>
      </caption>
      <thead>
        <tr>
          <th>재료번호</th>
          <th>단위</th>
          <th>이름</th>
          <th>수량</th>
          <th>수정</th>
        </tr>
      </thead>
      <tbody>
        {materials.map((mat) => (
          <tr key={mat.materialNum}>
            <td>{mat.materialNum}</td>
            <td>{mat.materialUnit}</td>
            <td>{mat.materialName}</td>
            <td>{mat.materialQuantity}</td>
            <td>
              <ButtonLayout onClick={() => openPopup(mat)}>수정</ButtonLayout>
            </td>
          </tr>
        ))}
      </tbody>
    </TableLayout>
  );
}

export default MaterialManagement;
