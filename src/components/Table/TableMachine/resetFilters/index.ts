import { assign } from "xstate";

import { ITableMachineContext } from "../..";

const resetFilters = assign<ITableMachineContext>(
  ({ filters, ripcord, ...rest }: ITableMachineContext) => {
    return {
      ...rest,
      filters: [],
      rowsF: rest.rowsOG,
      ripcord: ripcord + "a",
    };
  }
);

export default resetFilters;
