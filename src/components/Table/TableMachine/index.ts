import { createMachine } from "xstate";

import { ITableMachineContext } from "components/Table";

import filterClear from "./filterClear";
import filterReset from "./filterReset";
import filterUpdate from "./filterUpdate";

import pageIndex from "./pageIndex";
import pageLength from "./pageLength";

import rowsTransformedByFilters from "./rowsTransformedByFilters";
import rowsTransformedByPagination from "./rowsTransformedByPagination";

import setup from "./setup";

import sorterClear from "./sorterClear";
import sorterUpdate from "./sorterUpdate";

/**
 * TableMachine -- state machine
 * @description
 * A state machine that encapsulates ALL logic that transforms the data 
 * presented within a `<Table />` component. Simply drop in the master list
 * of content you want to display, hook up inputs to control filters, sorting,
 * and pagination, and send messaages to the machine. From there, this machine 
 * will automatically transform the row data based on the user's selected 
 * filters, sorting, and pagination configuration.
 * @example
  // setup your header and rows
  const header = [['whatever']];
  const rows = [['test']];
  // configure machine by dropping-in header and rows to display
  const configuredTableMachine = TableMachine.withConfig(
    {},
    {
      ...TableMachine.context,
      header: header,
      rows: rows,
    }
  );
  // within a parent component, define the state machine hook and link
  // the table component to that state
  const Example = () => {
    const [state, updateMachine] = useMachine(configuredTableMachine, {
      devTools: true,
    });
    return (
      <Table header={state.context.header} rows={state.context.rows} />
    );
  }
 */
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
      sorters: [],
      ripcord: 0,
      pagination: 10,
      page: 1,
    },
    states: {
      init: {
        always: {
          actions: ["setup"],
          target: "filtering",
        },
      },
      filtering: {
        always: {
          actions: ["rowsTransformedByFilters"],
          target: "sorting",
        },
      },
      sorting: {
        always: {
          // TODO: setup action to handle sorting here
          target: "paginating",
        },
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
          SORTER_CLEAR: { actions: ["sorterClear"], target: "filtering" },
          SORTER_UPDATE: { actions: ["sorterUpdate"], target: "filtering" },
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
      sorterClear: sorterClear,
      sorterUpdate: sorterUpdate,
    },
  }
);

export default TableMachine;
