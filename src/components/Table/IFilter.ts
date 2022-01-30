import { ITable } from ".";

export default interface IFilter {
  id: string;
  logic: (rows: ITable["rows"]) => ITable["rows"];
}
