import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { PopupAtom } from "../../recoil/PopupAtom";
import { TableLayout } from "./../../styles/TableLayout";
import styled from "styled-components";
import { ButtonLayout } from "../../styles/ButtonLayout";

function SupplierManagement() {
  const [showSupplierInfo, setShowSupplierInfo] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const setPopup = useSetRecoilState(PopupAtom);

  useEffect(() => {
    const fetchSupplierInfo = async () => {
      const result = await axios.get("http://localhost:8080/admin/suppliers");
      if (result.status === 200) {
        setShowSupplierInfo(result.data);
      } else {
        alert("공급업체를 불러오지 못했습니다.");
      }
    };
    fetchSupplierInfo();
  }, [trigger]);

  const openEditPopup = (ele) => {
    setPopup({
      isOpen: true,
      popupType: "공급업체 수정",
      popupData: {
        ...ele,
        setTrigger,
        trigger,
      },
    });
  };

  const openCreatePopup = () => {
    setPopup({
      isOpen: true,
      popupType: "공급업체 추가",
      popupData: {
        setTrigger,
        trigger,
      },
    });
  };

  const delSupplierBtn = async (supplierNum) => {
    const result = await axios.delete(
      `http://localhost:8080/admin/suppliers/${supplierNum}`
    );
    if (result.status === 200) {
      alert("공급업체가 삭제되었습니다.");
      setTrigger(!trigger);
    } else {
      alert("공급업체 삭제 실패");
    }
  };

  return (
    <TableLayout>
      <caption>
        <h2>공급업체 관리</h2>
      </caption>
      <thead>
        <tr>
          <th>공급업체번호</th>
          <th>이름</th>
          <th>주소</th>
          <th>수정/삭제</th>
        </tr>
      </thead>
      <tbody>
        {showSupplierInfo.map((ele) => (
          <tr key={ele.supplierNum}>
            <td>
              <Link to={`${ele.supplierNum}`} state={ele}>
                {ele.supplierNum} (상세보기)
              </Link>
            </td>
            <td>{ele.supplierName}</td>
            <td>{ele.supplierAddress}</td>
            <td>
              <VerticalButtonGroup>
                <ButtonLayout onClick={() => openEditPopup(ele)}>
                  수정
                </ButtonLayout>
                <ButtonLayout onClick={() => delSupplierBtn(ele.supplierNum)}>
                  삭제
                </ButtonLayout>
              </VerticalButtonGroup>
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan={4} style={{ textAlign: "right", paddingTop: "16px" }}>
            <ButtonLayout onClick={openCreatePopup}>공급업체 추가</ButtonLayout>
          </td>
        </tr>
      </tbody>
    </TableLayout>
  );
}

export default SupplierManagement;

const VerticalButtonGroup = styled.div`
  display: flex;
  gap: 6px;
`;
