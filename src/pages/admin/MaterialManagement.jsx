import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { CenterLayout } from "../../styles/CenterSortLayout";

function MaterialManagement(props) {
  const [showMaterial, setShowMaterial] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [materialFormState, setMaterialFormState] = useState({
    materialNum: "",
    materialUnit: "",
    materialName: "",
    materialQuantity: "",
  });
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const fetchMaterialInfo = async () => {
      try {
        const result = await axios.get("http://localhost:8080/material/");
        if (result.status === 200) {
          //result.data.map((ele)=>{ele.materialUsage= ""})
          setShowMaterial(result.data);
          return;
        }
      } catch (err) {
        alert("재료를 불러오지 못했습니다.");
        throw err;
      }
    };
    fetchMaterialInfo();
  }, [trigger]);

  const inputFormChg = (e) => {
    setMaterialFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      materialNum: popUp.materialNum,
    }));
  };

  const materialUdtBtn = async () => {
    const result = await axios.put(
      "http://localhost:8080/material/",
      materialFormState
    );
    if (result.status === 200) {
      alert("재료수정 성공");
      setTrigger(!trigger);
      return;
    }
    alert("수정 실패");
  };

  const popUpOpen = (ele) => {
    setMaterialFormState({
      materialNum: ele.materialNum,
      materialUnit: ele.materialUnit,
      materialName: ele.materialName,
      materialQuantity: ele.materialQuantity,
    });
    setPopUp(ele);
  };
  return (
    <>
      {popUp && (
        <MaterialPageLayout>
          <h3>재료번호 : {popUp.materialNum}</h3>
          재료단위 :{" "}
          <input
            type={"text"}
            name={"materialUnit"}
            onChange={inputFormChg}
            defaultValue={popUp.materialUnit}
          />
          이름 :{" "}
          <input
            type={"text"}
            name={"materialName"}
            defaultValue={popUp.materialName}
            onChange={inputFormChg}
          />
          수량 :{" "}
          <input
            type={"number"}
            name={"materialQuantity"}
            defaultValue={popUp.materialQuantity}
            onChange={inputFormChg}
          />
          <button type={"button"} onClick={() => materialUdtBtn()}>
            완료
          </button>
          <button type={"button"} onClick={() => setPopUp(false)}>
            취소
          </button>
        </MaterialPageLayout>
      )}
      <CenterLayout>
        <table border={"1"}>
          <caption>
            <h2>재료관리</h2>
          </caption>
          <thead>
            <tr>
              <th>항목번호</th>
              <th>재료단위</th>
              <th>이름</th>
              <th>수량</th>
              <th>수정</th>
            </tr>
          </thead>
          <tbody>
            {showMaterial.length > 0 &&
              showMaterial.map((ele) => (
                <tr key={ele.materialNum}>
                  <td>{ele.materialNum}</td>
                  <td>{ele.materialUnit}</td>
                  <td>{ele.materialName}</td>
                  <td>{ele.materialQuantity}</td>
                  <td>
                    <button type={"button"} onClick={() => popUpOpen(ele)}>
                      수정
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </CenterLayout>
    </>
  );
}

const MaterialPageLayout = styled.div`
  text-align: center;
`;

export default MaterialManagement;
