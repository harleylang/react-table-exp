import styled from "styled-components";
import ITable from "./ITable";

const Table = ({ header, rows }: ITable) => {
  return (
    <>
      <table>
        <thead>
          <StyledTr>
            {header.map((cell) => (
              <th key={`header-key-${cell.data}`}>{cell.component(cell.data)}</th>
            ))}
          </StyledTr>
        </thead>
        {rows.length > 0 && (
          <tbody>
            {rows.map((row, r) => (
              <StyledTr key={`row-${r}`}>
                {row.map((cell, c) => (
                  <StyledTd key={`row-${r}-cell-${c}`}>{cell.component(cell.data)}</StyledTd>
                ))}
              </StyledTr>
            ))}
          </tbody>
        )}
      </table>
      {rows.length === 0 && "NO RESULTS TO DISPLAY"}
    </>
  );
};

const StyledTr = styled.tr`
  text-align: center;
`;

const StyledTd = styled.td`
  width: auto;
  padding-left: 32px;
  padding-right: 32px;
`;

export default Table;
