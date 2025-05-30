import React, { useEffect, useState } from "react";
import axios from "axios";
import { TableLayout } from "../../styles/TableLayout";

function UserManagement(props) {
  const [showUserInfo, setShowUserInfo] = useState([]);

  useEffect(() => {
    const fetchMaterialInfo = async () => {
      const result = await axios.get("http://localhost:8080/admin/users");
      if (result.status === 200) {
        setShowUserInfo(result.data);
      } else {
        alert("고객을 불러오지 못했습니다.");
      }
    };
    fetchMaterialInfo();
  }, []);
  return (
    <TableLayout border={"1"}>
      <caption>
        <h2>고객관리</h2>
      </caption>
      <thead>
        <tr>
          <th>고객아이디</th>
          <th>고객주소</th>
          <th>고객이름</th>
          <th>고객전화번호</th>
        </tr>
      </thead>
      <tbody>
        {showUserInfo.length > 0
          ? showUserInfo.map((ele, idx) => (
              <tr key={idx}>
                <td>{ele.userId}</td>
                <td>{ele.userAddress}</td>
                <td>{ele.userName}</td>
                <td>{ele.userPhoneNum}</td>
              </tr>
            ))
          : null}
      </tbody>
    </TableLayout>
  );
}

export default UserManagement;
