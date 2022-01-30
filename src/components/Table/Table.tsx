import styled from "styled-components";
import ISorter from "./ISorter";
import ITable from "./ITable";
import TableTh from "./TableTh/TableTh";

const Table = ({
  header,
  rows,
  setSorter,
  clearSorter,
}: ITable & {
  setSorter?: (f: ISorter) => void;
  clearSorter?: (f: ISorter) => void;
}) => {
  return (
    <>
      <table>
        <thead>
          <StyledTr>
            {header.map((cell) => (
              <TableTh
                key={`header-key-${cell.data}`}
                {...cell}
                setSorter={setSorter}
                clearSorter={clearSorter}
              />
            ))}
          </StyledTr>
        </thead>
        {rows.length > 0 && (
          <tbody>
            {rows.map((row, r) => (
              <StyledTr key={`row-${r}`}>
                {row.map((cell, c) => (
                  <StyledTd key={`row-${r}-cell-${c}`}>
                    {cell.component(cell.data)}
                  </StyledTd>
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
