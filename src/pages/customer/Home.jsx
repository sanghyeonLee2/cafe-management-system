import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Cart from "../../components/ui/Cart";
import MenuElement from "../../components/ui/MenuElement";

function Home() {
  const [menuList, setMenuList] = useState([]);
  const [showMenuItem, setShowMenuItem] = useState([]);

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const result = await axios.get("http://localhost:8080/menus");

        if (result.status !== 200) throw new Error("메뉴 로딩 실패");

        setMenuList(result.data);
        setShowMenuItem(result.data);
      } catch (err) {
        alert("메뉴를 불러오지 못했습니다.");
        console.error(err);
      }
    };

    fetchMenuItem();
  }, []);

  const searchMenu = (e) => {
    const keyword = e.target.value.trim();
    if (keyword === "") {
      setShowMenuItem(menuList);
      return;
    }

    const searchResult = menuList.filter((elem) =>
      elem.menuItemName.includes(keyword)
    );
    setShowMenuItem(searchResult);
  };

  return (
    <Container>
      <SearchBox>
        <input
          type="search"
          name="text"
          onChange={searchMenu}
          placeholder="메뉴명을 입력하세요..."
          required
        />
      </SearchBox>

      <Cart />

      <ItemOuterLayout>
        {showMenuItem.length === 0 ? (
          <EmptyMessage>메뉴가 없습니다</EmptyMessage>
        ) : (
          showMenuItem.map((ele) => (
            <MenuElement key={ele.menuItemNum} ele={ele} />
          ))
        )}
      </ItemOuterLayout>
    </Container>
  );
}

export default Home;
const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
`;

const SearchBox = styled.form`
  display: flex;
  justify-content: center;

  input[type="search"] {
    width: 400px;
    padding: 10px 15px;
    border: 1px solid #ccc;
    border-radius: 20px;
    font-size: 16px;
    outline: none;
    transition: all 0.3s;

    &::placeholder {
      color: #aaa;
    }

    &:focus {
      border-color: #7b2cbf;
      box-shadow: 0 0 0 3px rgba(123, 44, 191, 0.1);
    }
  }
`;

const ItemOuterLayout = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin: 50px 0;
`;

const EmptyMessage = styled.div`
  padding: 80px 0;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #999;
  width: 100%;
`;
