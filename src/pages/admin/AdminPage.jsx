import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function AdminPage() {
  return (
    <Container>
      <Title>관리자 페이지</Title>
      <List>
        <li>
          <StyledLink to="/admin/menu-management">메뉴관리</StyledLink>
        </li>
        <li>
          <StyledLink to="/admin/user-management">고객관리</StyledLink>
        </li>
        <li>
          <StyledLink to="/admin/order-management">주문관리</StyledLink>
        </li>
        <li>
          <StyledLink to="/admin/material-management">재료관리</StyledLink>
        </li>
        <li>
          <StyledLink to="/admin/supplier-management">공급업체 목록</StyledLink>
        </li>
      </List>
    </Container>
  );
}

export default AdminPage;

const Container = styled.div`
  margin: 50px auto;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 30px;
  padding-bottom: 60px;
  font-weight: bold;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledLink = styled(Link)`
  font-size: 18px;
  color: #5e2ca5;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
    color: #4a2196;
  }
`;
