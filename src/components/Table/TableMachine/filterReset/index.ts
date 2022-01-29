import { assign } from "xstate";

import { ITableMachineContext } from "../..";

const filterReset = assign<ITableMachineContext>(
  ({ filters, ripcord, ...rest }: ITableMachineContext) => {
    return {
      ...rest,
      filters: [],
      rowsFiltered: rest.rowsOG,
      ripcord: ripcord + "a",
    };
  }
);

export default filterReset;
