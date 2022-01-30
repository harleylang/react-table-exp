import { ITable } from ".";

/**
 * ISorter -- interface
 * @description
 * A specification for how to sort a table column.
 * @param id {string} A unique, readible (non-uuid) id for this sorter.
 * @param coli {number} The index for the column corresponding to this specification.
 * @param direction {"ascending" | "descending" | undefined} The way to sort the corresponding column.
 * @param priority {number | undefined} The higher the priority, the earlier this sort is performed.
 * ISorters of equal priority are sorted in the order they are added to the TableMachine.
 */
export default interface ISorter {
  id: string;
  coli: number;
  direction?: "ascending" | "descending";
  priority?: number;
}
