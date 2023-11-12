import React, {useEffect, useState} from 'react';
import axios from "axios";

function MenuRecipeInfo({menuItemNum}) {
    const [showMenuRecipeInfo, setShowMenuRecipeInfo] = useState([])
    const [udtRecipeUsageState, setUdtRecipeUsageState] = useState(
        {menuRecipeNum: "", menuRecipeUsage: ""}
    )
    const [trigger, setTrigger] = useState(false);
    useEffect(() => {
        const fetchMenuInfo = async () => {
            const result = await
                axios.get("http://localhost:8080/menu-item/recipe", {params: {menuItemNum}})
            if (result.status === 200) {
                setShowMenuRecipeInfo(result.data)
                return;
            }
            alert("메뉴를 불러오지 못했습니다.")
        }
        fetchMenuInfo()
    }, [trigger]);

    const udtRecipeUsage = (e, menuRecipeNum) => {
        setUdtRecipeUsageState(
            {
                menuRecipeUsage: e.target.value,
                menuRecipeNum
            }
        )
    }
    const udtRecipeBtn = async () => {
        const result = await axios.patch("http://localhost:8080/menu-item/recipe", udtRecipeUsageState)
        if (result.status === 200) {
            alert("수정이 완료되었습니다")
            return;
        }
        alert("수정 실패")
    }

    const delRecipeBtn = async (menuRecipeNum) =>{
        console.log(menuRecipeNum)
        const result = await axios.delete("http://localhost:8080/menu-item/recipe", {data: {menuRecipeNum}})
        if (result.status === 200) {
            alert("삭제가 완료되었습니다")
            setTrigger(!trigger)
            return;
        }
        alert("삭제 실패")
    }

    return (
        <>
            {showMenuRecipeInfo.length > 0 ? (
                <>
                    <h2>메뉴이름 : {showMenuRecipeInfo[0].menuItemNum}</h2>
                    {showMenuRecipeInfo.map((elem, idx) => {
                        return (
                            <ul key={idx}>
                                <li>재료이름 : {elem.materialNum}</li>
                                <li>레시피 번호 : {elem.menuRecipeNum}</li>
                                <li>
                                    재료 사용량 : <input type={"number"} name={"menuRecipeUsage"}
                                                    onChange={(e) => udtRecipeUsage(e, elem.menuRecipeNum)}
                                                    defaultValue={elem.menuRecipeUsage}/>
                                    <button type={"button"} onClick={udtRecipeBtn}>수정</button>
                                </li>
                                <li>
                                    <button type={"button"} onClick={()=>delRecipeBtn(elem.menuRecipeNum)}>삭제</button>
                                </li>
                            </ul>
                        );
                    })}
                </>
            ) : (
                <h2>로딩 중...</h2>
            )}
        </>
    );
}

export default MenuRecipeInfo;