import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CenterLayout } from "../../styles/CenterSortLayout";
import { TextAlignCenter } from "../../styles/TextAlignCenter";

function SupplierManagement(props) {
  const [showSupplierInfo, setShowSupplierInfo] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [supplierInfo, setSupplierInfo] = useState({
    supplierName: "",
    supplierAddress: "",
  });
  const [trigger, setTrigger] = useState(false); //상품 보여줄떄 값 변화로 useEFfect의존성 배열에 값을 넣어 useEffect훅 실행하기 위함

  useEffect(() => {
    const fetchSupplierInfo = async () => {
      const result = await axios.get("http://localhost:8080/supplier/");
      if (result.status === 200) {
        setShowSupplierInfo(result.data);
        return;
      }
      alert("메뉴를 불러오지 못했습니다.");
    };
    fetchSupplierInfo();
  }, [trigger]);

  const insertSupplierBtn = async () => {
    const result = await axios.post(
      "http://localhost:8080/supplier/",
      supplierInfo
    );
    if (result.status === 200) {
      alert("공급업체가 추가되었습니다.");
      setTrigger(!trigger);
      return;
    }
    alert("공급업체 추가 실패");
  };
  const udtSupplierForm = (ele) => {
    setSupplierInfo({
      supplierName: `${ele.supplierName}`,
      supplierAddress: `${ele.supplierAddress}`,
    });
    setIsPopupOpen(ele.supplierNum);
  };

  const udtSupplierBtn = async () => {
    const result = await axios.put("http://localhost:8080/supplier/", {
      supplierNum: isPopupOpen,
      supplierInfo,
    });
    if (result.status === 200) {
      alert("공급업체가 수정되었습니다.");
      setIsPopupOpen(false);
      setTrigger(!trigger);
      return;
    }
    alert("공급업체 수정 실패");
    setIsPopupOpen(false);
  };

  const delSupplierBtn = async (supplierNum) => {
    const result = await axios.delete("http://localhost:8080/supplier/", {
      data: { supplierNum },
    });
    if (result.status === 200) {
      alert("공급업체가 삭제되었습니다.");
      setTrigger(!trigger);
      return;
    }
    alert("공급업체 삭제 실패");
  };

  const handleInputChg = (e) => {
    setSupplierInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //수정기능 하기
  return (
    <>
      <TextAlignCenter>
        {isPopupOpen && (
          <div>
            <input type={"text"} defaultValue={isPopupOpen} disabled />
            <input
              type={"text"}
              defaultValue={supplierInfo.supplierName}
              name={"supplierName"}
              onChange={handleInputChg}
            />
            <input
              type={"text"}
              defaultValue={supplierInfo.supplierAddress}
              name={"supplierAddress"}
              onChange={handleInputChg}
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
      </TextAlignCenter>
      <CenterLayout>
        <table border={"1"}>
          <caption>
            <h2>공급업체 관리</h2>
          </caption>
          <thead>
            <tr>
              <th>공급업체번호</th>
              <th>이름</th>
              <th>주소</th>
              <th>추가</th>
            </tr>
          </thead>
          <tbody>
            {showSupplierInfo.length !== 0 &&
              showSupplierInfo.map((ele) => {
                return (
                  <tr key={ele.supplierNum}>
                    <td>
                      <Link
                        to={"/admin/supplier-management/supplier/"}
                        state={ele}
                      >
                        {ele.supplierNum}
                      </Link>
                    </td>
                    <td>{ele.supplierName} </td>
                    <td>{ele.supplierAddress}</td>
                    <td>
                      <button
                        type={"button"}
                        onClick={() => udtSupplierForm(ele)}
                      >
                        수정
                      </button>
                      <button
                        type={"button"}
                        onClick={() => delSupplierBtn(ele.supplierNum)}
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                );
              })}
            <tr>
              <td>
                <input
                  type={"text"}
                  placeholder={"업체번호 자동생성"}
                  disabled
                />
              </td>
              <td>
                <input
                  type={"text"}
                  name={"supplierName"}
                  onChange={handleInputChg}
                />
              </td>
              <td>
                <input
                  type={"text"}
                  name={"supplierAddress"}
                  onChange={handleInputChg}
                />
              </td>
              <td>
                <button type={"button"} onClick={insertSupplierBtn}>
                  추가
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </CenterLayout>
    </>
  );
}

export default SupplierManagement;
