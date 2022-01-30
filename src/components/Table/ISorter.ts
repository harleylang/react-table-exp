import { ITable } from ".";

export default interface ISorter {
  id: string;
  logic: (rows: ITable["rows"]) => ITable["rows"];
  direction?: "ascending" | "descending";
  priority?: number;
}
