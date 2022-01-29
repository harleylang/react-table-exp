import { createMachine } from "xstate";

import ITable from "components/Table/ITable";
import updateFilter from "./updateFilter";
import clearFilter from "./clearFilter";
import resetFilters from "./resetFilters";
import updatePage from "./updatePage";
import paginateRows from "./paginateRows";
import updatePagination from "./updatePagination";
import filterRows from "./filterRows";

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
    initial: "filtering",
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
      filtering: {
        always: {
          actions: ["filterRows"],
          target: "paginating"
        }
      },
      paginating: {
        always: {
          actions: ["paginateRows"],
          target: "idle",
        },
      },
      idle: {
        on: {
          CLEAR: { actions: ["clearFilter"], target: "filtering" },
          RESET: { actions: ["resetFilters"], target: "filtering" },
          UPDATE: { actions: ["updateFilter"], target: "filtering" },
          PAGE: { actions: ["updatePage"], target: "filtering" },
          PAGINATION: { actions: ["updatePagination"], target: "filtering" },
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
      filterRows: filterRows,
      paginateRows: paginateRows,
    },
  }
);

export default SmartTable;
