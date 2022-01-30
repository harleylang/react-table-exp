import ISorter from "../ISorter";
import ITableTh from "./ITableTh";
import SortButtons from "./SortButtons/SortButtons";
import StyledTh from "./TableTh.styles";

const TableTh = ({
  data,
  component,
  sorter,
  setSorter,
  clearSorter,
}: ITableTh & {
  setSorter?: (f: ISorter) => void;
  clearSorter?: (f: ISorter) => void;
}) => {
  return (
    <StyledTh>
      {component(data)}
      {sorter && setSorter && clearSorter && (
        <SortButtons
          sorter={sorter}
          setSorter={setSorter}
          clearSorter={clearSorter}
        />
      )}
    </StyledTh>
  );
};

export default TableTh;
