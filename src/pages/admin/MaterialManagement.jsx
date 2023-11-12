import React, {useEffect, useState} from 'react';
import axios from "axios";

function MaterialManagement(props) {
    const [showMaterial, setShowMaterial] = useState([])

    useEffect(() => {
        const fetchMaterialInfo = async () => {
            const result = await
                axios.get("http://localhost:8080/material/")
            if (result.status === 200) {
                //result.data.map((ele)=>{ele.materialUsage= ""})
                setShowMaterial(result.data)
            } else {
                alert("재료를 불러오지 못했습니다.")
            }
        }
        fetchMaterialInfo()
    }, []);
    return (
        <div>
            <table border={"1"}>
                <caption><h2>재료관리</h2></caption>
                <thead>
                <tr>
                    <th>항목번호</th>
                    <th>재료단위</th>
                    <th>이름</th>
                    <th>수량</th>
                </tr>
                </thead>
                <tbody>
                {showMaterial.map((ele) =>
                    <tr key={ele.materialNum}>
                        <td>{ele.materialNum}</td>
                        <td>{ele.materialUnit}</td>
                        <td>{ele.materialName}</td>
                        <td>{ele.materialQuantity}</td>
                    </tr>)
                }
                </tbody>
            </table>
        </div>
    );
}

export default MaterialManagement;