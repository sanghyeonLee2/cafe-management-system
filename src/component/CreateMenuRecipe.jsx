import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";

function CreateMenuRecipe({setIsInsertRecipe,trigger, setTrigger, menuFormState}) {
    const [showMaterial, setShowMaterial] = useState([])
    const [materialInMenu, setMaterialInMenu] = useState([]);
    const [selectMaterial, setSelectMaterial] = useState()
    const [selectedMaterial, setSelectedMaterial] = useState([])

    const usageRef = useRef();

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
    const recipeOnsubmit = (e, elem) => {
        const menuRecipeUsage = e.target.parentNode.previousSibling.firstChild.value
        setMaterialInMenu([...materialInMenu, {menuRecipeUsage, materialNum: elem.materialNum}])
    }

    const materialNumSelect = (e) => {
        const selectMaterialTemp = showMaterial.filter((elem) => {
            return elem.materialName === e.target.value
        })
        setSelectMaterial(selectMaterialTemp[0])
    }

    const addMaterial = () => {
        selectMaterial["menuRecipeUsage"] = usageRef.current.value
        setSelectedMaterial([...selectedMaterial, selectMaterial])
    }
    const createMenu = async () => {
        let finalMenuRecipe = [];
        selectedMaterial.map((elem)=>{
            const newObj = {
                menuRecipeUsage:elem.menuRecipeUsage,
                materialNum:elem.materialNum
            }
            finalMenuRecipe.push(newObj)
        })
        const result = await axios.post("http://localhost:8080/menu-item", {menuFormState, finalMenuRecipe})
        if(result.status === 200){
            alert("메뉴 추가가 완료 되었습니다.")
            setIsInsertRecipe(false)
            setTrigger(!trigger)
            return;
        }
        alert("메뉴 추가실패")
    }
    return (
        <div>
            <>
                <select onChange={materialNumSelect}>
                    <option>===선택===</option>
                    {showMaterial.map((elem) => {
                        return (
                            <option key={elem.materialNum}>
                                {elem.materialName}
                            </option>)
                    })}
                </select>
                <input type={"number"} ref={usageRef} placeholder={"수량 입력"}/>
                <button type={"button"} onClick={addMaterial}> 추가</button>
                <button type={"button"} onClick={()=>{setIsInsertRecipe(false)}}> 취소</button>
            </>
            <div>
                {selectedMaterial.length !== 0 ?
                    selectedMaterial.map((elem) => {
                        return (
                            <div key={elem.materialNum}>
                                재료번호: {elem.materialNum}
                                재료이름: {elem.materialName}
                                재료단위: {elem.materialUnit}
                                용량: {elem.menuRecipeUsage}
                            </div>
                        )
                    }) :
                    <h2>추가한 레시피가 없습니다.</h2>
                }
            </div>
            <button type={"button"} onClick={createMenu}>메뉴추가 완료</button>
        </div>
    )
}

export default CreateMenuRecipe;