import { createMachine } from "xstate";

import { ITableMachineContext } from "components/Table";
import filterClear from "./filterClear";
import filterReset from "./filterReset";
import filterUpdate from "./filterUpdate";
import pageIndex from "./pageIndex";
import pageLength from "./pageLength";
import paginateRows from "./paginateRows";
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
      filterRows: filterRows,
      paginateRows: paginateRows,
    },
  }
);

export default TableMachine;
