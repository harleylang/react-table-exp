import { ITable, IFilter, ISorter } from ".";

/**
 * ITableMachineContext -- interface
 * @param header {ITable['header']} The header to display in the table.
 * @param rowsOG {ITable['rows']} A copy of the original rows provided by the dev.
 * This copy is iterated on each time the filters, sorting, and pagination are updated.
 * @param rowsFiltered {ITable['rows']} A reduced version of rowsOG based on the filters
 * binded to other inputs that are siblings to this machine. Is used internally before
 * sorting and pagination.
 * @param rows {ITable['rows']} The final transformed version of the table rows to present
 * to the user. This value can be configured at start-up of the machine, as the initialize
 * state will save a copy to rowOG. Thereafter, this value is what remains of the rows after
 * reducing itself following filters, sorting, and pagination.
 * @param filters {IFilter[]} The filter logic applied to rowsOG during state updates.
 * @param sorters {ISorter[]} The sort logic applied to rowsFiltered during state updates.
 * @param ripcord {number} An incremented value that is triggered when filters are reset.
 * Bind this value to a string-literal key (e.g., `input-colour-${state.context.ripcord})`) to
 * refresh all filters when the user triggers the "FILTERS_RESET" action. Changing a react
 * component's key will force a rerendering of that component.
 * @param pagination {number} The current pagination length.
 * @param page {number} The current page of the table that the user is viewing.
 */
export default interface ITableMachineContext {
  header: ITable["header"];
  rowsOG: ITable["rows"];
  rowsFiltered: ITable["rows"];
  rows: ITable["rows"];
  filters: IFilter[];
  sorters: ISorter[];
  ripcord: number;
  pagination: number;
  page: number;
}
