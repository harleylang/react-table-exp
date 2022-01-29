import { ITable } from ".";

export default interface Filter {
  id: string;
  logic: (rows: ITable["rows"]) => ITable["rows"];
};