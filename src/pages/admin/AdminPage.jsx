import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";

function AdminPage(props) {
    return (
        <>
            <AdminTitleLayout>
                관리자 페이지
            </AdminTitleLayout>
            <ul>
                <li><Link to={"/admin/menu-management"}>메뉴관리</Link></li>
                <li><Link to={"/admin/user-management"}>고객관리</Link></li>
                <li><Link to={"/admin/order-management"}>주문관리</Link></li>
                <li><Link to={"/admin/material-management"}>재료관리/메뉴생성</Link></li>
                <li><Link to={"/admin/supplier-management"}>공급업체 목록</Link></li>
            </ul>
        </>
    );
}

const AdminTitleLayout = styled.h2`
  display: flex;
  justify-content: center;
`
export default AdminPage;