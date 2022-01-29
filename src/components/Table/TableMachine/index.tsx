import { createMachine } from "xstate";

import { ITableMachineContext } from "components/Table";
import filterClear from "./filterClear";
import filterReset from "./filterReset";
import filterUpdate from "./filterUpdate";
import updatePage from "./updatePage";
import paginateRows from "./paginateRows";
import updatePagination from "./updatePagination";
import filterRows from "./filterRows";

const TableMachine = createMachine<ITableMachineContext>(
  {
    id: "tableMachine",
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
          FILTER_CLEAR: { actions: ["filterClear"], target: "filtering" },
          FILTER_RESET: { actions: ["filterReset"], target: "filtering" },
          FILTER_UPDATE: { actions: ["filterUpdate"], target: "filtering" },
          PAGE: { actions: ["updatePage"], target: "filtering" },
          PAGINATION: { actions: ["updatePagination"], target: "filtering" },
        },
      },
    },
  },
  {
    actions: {
      filterClear: filterClear,
      filterReset: filterReset,
      filterUpdate: filterUpdate,
      updatePage: updatePage,
      updatePagination: updatePagination,
      filterRows: filterRows,
      paginateRows: paginateRows,
    },
  }
);

export default TableMachine;
