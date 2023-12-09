import styled from "styled-components";

export const TableLayout = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  font-size: 14px;
  border-radius: 8px;
  overflow: hidden;

  caption {
    padding: 30px;
    font-size: 20px;
    font-weight: bold;
  }

  th,
  td {
    padding: 12px;
    border: 1px solid #eee;
    text-align: center;
  }

  thead {
    background-color: #f2f2f2;
  }

  tbody tr:hover {
    background-color: #fafafa;
  }
`;
