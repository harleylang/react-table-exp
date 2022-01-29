import styled from "styled-components";

const Table = ({ header, rows }: { header: string[]; rows: string[][] }) => {
  return (
    <table>
      <thead>
        <StyledTr>
          {header.map((title) => (
            <th key={`header-key-${title}`}>{title}</th>
          ))}
        </StyledTr>
      </thead>
      <tbody>
        {rows.map((row, r) => (
          <StyledTr key={`row-${r}`}>
            {row.map((cell, c) => (
              <StyledTd key={`row-${r}-cell-${c}`}>{cell}</StyledTd>
            ))}
          </StyledTr>
        ))}
      </tbody>
    </table>
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
