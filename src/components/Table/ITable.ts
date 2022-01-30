import ITableCell from './ITableCell';

interface ITable {
  header: ITableCell[];
  rows: ITableCell[][];
};

export default ITable;
