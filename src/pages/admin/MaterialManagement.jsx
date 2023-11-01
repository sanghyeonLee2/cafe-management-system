import React, {useEffect, useState} from 'react';
import axios from "axios";
import MenuList from "../../component/MenuList";
import {useRecoilState} from "recoil";
import {MenuItemAtom} from "../../recoil/MenuItemAtom";

function MaterialManagement(props) {
    const [menuList, setMenuList] = useRecoilState(MenuItemAtom);
    const [menuFormState, setMenuFormState] = useState({
        menuPrice: 0,
        menuClassification: "",
        isSpecialMenu: false,
        menuName: "",
        materialUsage: ""
    })
    const [showMaterial, setShowMaterial] = useState([])
    const [recipeInfo, setRecipeInfo] = useState([])
    console.log("recipeInfo", recipeInfo)
    const inputFormChg = (e, idx) => {
        if (e.target.name === "materialUsage") {
            setRecipeInfo((prev) =>
                prev.map((item, index) =>
                    index !== idx
                        ? item
                        : {...item, [e.target.name]: e.target.value}
                )) //gpt사용
            return
        }
        setMenuFormState((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        const fetchMaterialInfo = async () => {
            const result = await
                axios.get("http://localhost:4000/material/get")
            if (result.status === 200) {
                //result.data.map((ele)=>{ele.materialUsage= ""})
                setShowMaterial(result.data)
            } else {
                alert("메뉴를 불러오지 못했습니다.")
            }
        }
        fetchMaterialInfo()
    }, []);
    const insertMenuBtn = async () => {
        const result = await axios.post("http://localhost:4000/menu/insert", {menuFormState, recipeInfo})
        if (result.status === 200) {
            setMenuList([...menuList, result.data])
            alert("메뉴가 추가되었습니다.")
            return
        }
        alert("로그인 실패")
    }
    const recipe = (idx) => {
        setRecipeInfo((prev) => ([...prev, showMaterial[idx]])) //gpt사용
    }
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
                {showMaterial.map((ele, idx) =>
                    <tr key={ele.num}>
                        <td><input type={"text"} defaultValue={ele.num}/></td>
                        <td><input type={"text"} defaultValue={ele.material_unit}/></td>
                        <td><input type={"text"} defaultValue={ele.material_name}/></td>
                        <td><input type={"text"} defaultValue={ele.material_quantity}/></td>
                        <td>
                            <button type={"button"}>추가</button>
                        </td>
                        <td>
                            <button type={"button"} onClick={() => recipe(idx)}>메뉴 레시피 추가</button>
                        </td>
                    </tr>)
                }
                </tbody>
            </table>
            <div>
                <h2>레시피 생성</h2>
                {recipeInfo.map((ele, idx) => <div key={ele.num}>
                    <h3>항목번호 {ele.num}</h3>
                    <h3>이름: {ele.material_name}</h3>
                    용량<input type={"number"} name={"materialUsage"} onChange={(e) => inputFormChg(e, idx)}
                             defaultValue={1}/>{ele.material_unit}
                </div>)}
                <h3>메뉴 정보 설정</h3>
                메뉴 가격
                <input type={"text"} name={"menuPrice"} onChange={inputFormChg
                }/>
                <select name={"menuClassification"} onChange={inputFormChg
                }>
                    <option>커피</option>
                    <option>차</option>
                    <option>음료</option>
                    <option>제과</option>
                    <option>상품</option>
                </select>
                특별메뉴 구분
                <select name={"isSpecialMenu"} onChange={inputFormChg
                }>
                    <option>1</option>
                    <option>0</option>
                </select>
                메뉴 이름<input type={"text"} name={"menuName"} onChange={inputFormChg
            }/>
                <button type={"button"} onClick={insertMenuBtn}>매뉴추가</button>
            </div>
        </div>
    );
}

export default MaterialManagement;