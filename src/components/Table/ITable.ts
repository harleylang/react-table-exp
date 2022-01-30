import ITableCell from "./ITableCell";
import ITableTh from "./TableTh/ITableTh";

interface ITable {
  header: ITableTh[];
  rows: ITableCell[][];
}

export default ITable;
