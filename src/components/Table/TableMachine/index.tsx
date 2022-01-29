import { createMachine } from "xstate";

import { ITableMachineContext } from "components/Table";

import filterClear from "./filterClear";
import filterReset from "./filterReset";
import filterUpdate from "./filterUpdate";

import pageIndex from "./pageIndex";
import pageLength from "./pageLength";

import rowsTransformedByFilters from "./rowsTransformedByFilters";
import rowsTransformedByPagination from "./rowsTransformedByPagination";

import setup from './setup';

const TableMachine = createMachine<ITableMachineContext>(
  {
    id: "tableMachine",
    initial: "init",
    context: {
      header: [],
      rowsOG: [[]],
      rowsFiltered: [[]],
      rows: [[]],
      filters: [],
      ripcord: "",
      pagination: 10,
      page: 1,
    },
    states: {
      init: {
        always: {
          actions: ['setup'],
          target: 'filtering',
        }
      },
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
      setup: setup,
    },
  }
);

export default TableMachine;
