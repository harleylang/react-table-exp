import { assign } from "xstate";

import { ITableMachineContext } from "../..";

const filterReset = assign<ITableMachineContext>(
  ({ filters, ripcord, ...rest }: ITableMachineContext) => {
    let newContext: ITableMachineContext = {
      ...rest,
      filters: [],
      rowsFiltered: rest.rowsOG,
      ripcord: ripcord + "a",
    };
    return newContext;
  }
);

export default filterReset;
