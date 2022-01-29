import { createMachine } from "xstate";

import { ITableMachineContext } from "components/Table";

import filterClear from "./filterClear";
import filterReset from "./filterReset";
import filterUpdate from "./filterUpdate";

import pageIndex from "./pageIndex";
import pageLength from "./pageLength";

import rowsTransformedByFilters from "./rowsTransformedByFilters";
import rowsTransformedByPagination from "./rowsTransformedByPagination";

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
          actions: ["rowsTransformedByFilters"],
          target: "paginating"
        }
      },
      paginating: {
        always: {
          actions: ["rowsTransformedByPagination"],
          target: "idle",
        },
      },
      idle: {
        on: {
          FILTER_CLEAR: { actions: ["filterClear"], target: "filtering" },
          FILTER_RESET: { actions: ["filterReset"], target: "filtering" },
          FILTER_UPDATE: { actions: ["filterUpdate"], target: "filtering" },
          PAGING_INDEX: { actions: ["pageIndex"], target: "filtering" },
          PAGING_LENGTH: { actions: ["pageLength"], target: "filtering" },
        },
      },
    },
  },
  {
    actions: {
      filterClear: filterClear,
      filterReset: filterReset,
      filterUpdate: filterUpdate,
      pageIndex: pageIndex,
      pageLength: pageLength,
      rowsTransformedByFilters: rowsTransformedByFilters,
      rowsTransformedByPagination: rowsTransformedByPagination,
    },
  }
);

export default TableMachine;
