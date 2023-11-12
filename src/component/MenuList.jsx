import React, {useState} from 'react';
import {useRecoilState} from "recoil";
import {MenuItemAtom} from "../recoil/MenuItemAtom";
import axios from "axios";

function MenuList(props) {
    const [menuFormState, setMenuFormState] = useState({
        menuPrice: 0,
        menuClassification: "",
        isSpecialMenu: false,
        menuName: ""
    })
    const [menuList,setMenuList] = useRecoilState(MenuItemAtom);
    const inputFormChg = (e) => {
        setMenuFormState((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const insertMenuBtn = async () => {
        const result = await axios.post("http://localhost:4000/insert-menu", menuFormState)
        if (result.status === 200) {
            setMenuList([...menuList,result.data])
            alert("메뉴가 추가되었습니다.")
        } else {
            alert("로그인 실패")
        }
    }
    const delMenuBtn = async (e) =>{
        const result = await axios.delete("http://localhost:4000/menu-item/delete",{data: {itemNum: e.target.name}})
        if (result.status === 200) {
            alert("메뉴가 삭제되었습니다.")
        } else {
            alert("삭제 실패")
        }
    }

    const udtMenuBtn = async () => {
        const result = await axios.put("http://localhost:4000/update-menu", menuFormState)
        if (result.status === 200) {
            alert("메뉴가 수정되었습니다.")
        } else {
            alert("메뉴 수정 실패")
        }
    }
    return (
        <div>
            <table border={"1"}>
                <caption><h2>메뉴관리</h2></caption>
                <thead>
                <tr>
                    <th>항목번호</th>
                    <th>가격</th>
                    <th>분류</th>
                    <th>특별메뉴구분</th>
                    <th>이름</th>
                    <th>추가/수정/삭제</th>
                    <th>레시피 보기</th>
                </tr>
                </thead>
                <tbody>
                {menuList.length !== 0 &&
                    menuList.map((ele) => {
                        return (
                            <tr key={ele.num}>
                                <td><input type={"text"} defaultValue={ele.num}/></td>
                                <td><input type={"text"} defaultValue={ele.price} name={"menuPrice"}
                                           onChange={inputFormChg
                                           }/></td>
                                <td>
                                    <select defaultValue={`${ele.classification}`} name={"menuClassification"}
                                            onChange={inputFormChg
                                            }>
                                        <option value={"커피"}>커피</option>
                                        <option value={"차"}>차</option>
                                        <option value={"음료"}>음료</option>
                                        <option value={"제과"}>제과</option>
                                        <option value={"상품"}>상품</option>
                                        <option value={"세트메뉴"}>세트메뉴</option>
                                        <option value={"상품권"}>상품권</option>
                                        <option value={"무선인터넷"}>무선인터넷</option>
                                    </select>
                                </td>
                                <td><select defaultValue={`${ele.is_special_menu}`} name={"isSpecialMenu"} onChange={inputFormChg
                                }>
                                    <option value={"1"}>1</option>
                                    <option value={"0"}>0</option>
                                </select></td>
                                <td><input type={"text"} defaultValue={ele.menu_item_name} name={"menuName"} onChange={inputFormChg
                                }/></td>
                                <td>
                                    <button type={"button"} onClick={udtMenuBtn}>수정</button>
                                    <button type={"button"} name={`${ele.num}`} onClick={delMenuBtn}>삭제</button>
                                </td>
                            </tr>
                        )
                    })
                }
                <tr>
                    <td><input type={"text"} placeholder={"입력 X"}/></td>
                    <td><input type={"text"} name={"menuPrice"} onChange={inputFormChg
                    }/></td>
                    <td>
                        <select name={"menuClassification"} onChange={inputFormChg
                        }>
                            <option>커피</option>
                            <option>차</option>
                            <option>음료</option>
                            <option>제과</option>
                            <option>상품</option>
                            <option>세트메뉴</option>
                            <option>상품권</option>
                            <option>무선인터넷</option>
                        </select>
                    </td>
                    <td><select name={"isSpecialMenu"} onChange={inputFormChg
                    }>
                        <option>1</option>
                        <option>0</option>
                    </select></td>
                    <td><input type={"text"} name={"menuName"} onChange={inputFormChg
                    }/></td>
                    <td>
                        <button type={"button"} onClick={insertMenuBtn}>추가</button>
                    </td>
                </tr>
                </tbody>
            </table>

        </div>
    );
}

export default MenuList;