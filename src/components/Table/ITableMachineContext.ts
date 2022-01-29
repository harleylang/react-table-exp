import { ITable, IFilter } from ".";
export default interface ITableMachineContext {
  header: ITable["header"];
  rowsOG: ITable["rows"];
  rowsFiltered: ITable["rows"];
  rows: ITable["rows"];
  filters: IFilter[];
  ripcord: string;
  pagination: number;
  page: number;
}