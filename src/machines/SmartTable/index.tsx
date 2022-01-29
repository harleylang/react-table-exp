import { createMachine } from "xstate";

import ITable from "components/Table/ITable";
import updateFilter from "./updateFilter";
import clearFilter from "./clearFilter";
import resetFilters from "./resetFilters";
import updatePage from "./updatePage";

export interface ISmartTableContext {
  headerOG: ITable["header"];
  rowsOG: ITable["rows"];
  header: ITable["header"];
  rows: ITable["rows"];
  filters: Filter[];
  ripcord: string;
  pagination: number;
  page: number;
}

export interface Filter {
  id: string;
  logic: (rows: ITable["rows"]) => ITable["rows"];
}

const SmartTable = createMachine<ISmartTableContext>(
  {
    id: "smartTable",
    initial: "idle",
    context: {
      headerOG: [],
      rowsOG: [[]],
      header: [],
      rows: [[]],
      filters: [],
      ripcord: "",
      pagination: 10,
      page: 1,
    },
    states: {
      idle: {
        on: {
          CLEAR: { actions: ["clearFilter"] },
          RESET: { actions: ["resetFilters"] },
          UPDATE: { actions: ["updateFilter"] },
          PAGE: { actions: ['updatePage' ]},
        },
      },
    },
  },
  {
    actions: {
      clearFilter: clearFilter,
      resetFilters: resetFilters,
      updateFilter: updateFilter,
      updatePage: updatePage,
    },
  }
);

export default SmartTable;
