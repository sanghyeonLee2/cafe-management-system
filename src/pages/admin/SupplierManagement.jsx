import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

function SupplierManagement(props) {
    const [showSupplierInfo, setShowSupplierInfo] = useState([])
    useEffect(() => {
        const fetchSupplierInfo = async () => {
            const result = await
                axios.get("http://localhost:4000/supplier/get")
            if (result.status === 200) {
                setShowSupplierInfo(result.data)
            } else {
                alert("메뉴를 불러오지 못했습니다.")
            }
        }
        fetchSupplierInfo()
    }, []);
    const [supplierInfo, setSupplierInfo] = useState({
        supplierName: "",
        supplierAddress: ""
    })
    const insertSupplierBtn = async () => {
        const result = await axios.post("http://localhost:4000/supplier/insert", supplierInfo)
        if (result.status === 200) {
            alert("공급업체가 추가되었습니다.")
            setShowSupplierInfo([...showSupplierInfo, result.data])
        } else {
            alert("로그인 실패")
        }
    }
    const handleInputChg = (e) => {
        setSupplierInfo((prev) => (
            {
                ...prev, [e.target.name]: e.target.value
            }))
    }
    return (
        <div><h2>공급업체 관리</h2>
            <table border={"1"}>
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
                            <tr key={ele.num}>
                                <td><Link to={"/admin/supplier-management/supplier/"} state={ele}><input type={"number"}
                                                                                             defaultValue={ele.num}/>
                                </Link></td>
                                <td><input type={"text"} defaultValue={ele.supplier_name}/></td>
                                <td><input type={"text"} defaultValue={ele.address}/></td>
                            </tr>
                        )
                    })}
                <tr>
                    <td><input type={"text"}/></td>
                    <td><input type={"text"} name={"supplierName"} onChange={handleInputChg}/></td>
                    <td><input type={"text"} name={"supplierAddress"} onChange={handleInputChg}/></td>
                    <td>
                        <button type={"button"} onClick={insertSupplierBtn}>추가</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

    );
}

export default SupplierManagement;