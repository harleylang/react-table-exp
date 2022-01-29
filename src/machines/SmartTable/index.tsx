import { createMachine } from "xstate";

import ITable from "components/Table/ITable";
import updateFilter from "./updateFilter";
import clearFilter from "./clearFilter";
import resetFilters from "./resetFilters";
import updatePage from "./updatePage";
import paginateRows from "./paginateRows";
import updatePagination from "./updatePagination";

export interface ISmartTableContext {
  header: ITable["header"];
  rowsOG: ITable["rows"];
  rowsF: ITable["rows"];
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
    initial: "pagination",
    context: {
      header: [],
      rowsOG: [[]],
      rowsF: [[]],
      rows: [[]],
      filters: [],
      ripcord: "",
      pagination: 10,
      page: 1,
    },
    states: {
      idle: {
        on: {
          CLEAR: { actions: ["clearFilter"], target: "pagination" },
          RESET: { actions: ["resetFilters"], target: "pagination" },
          UPDATE: { actions: ["updateFilter"], target: "pagination" },
          PAGE: { actions: ["updatePage"], target: "pagination" },
          PAGINATION: { actions: ["updatePagination"], target: "pagination" },
        },
      },
      pagination: {
        always: {
          actions: ["paginateRows"],
          target: "idle",
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
      updatePagination: updatePagination,
      paginateRows: paginateRows,
    },
  }
);

export default SmartTable;
