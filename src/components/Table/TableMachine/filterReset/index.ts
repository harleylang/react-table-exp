import { assign } from "xstate";

import { ITableMachineContext } from "../..";

const filterReset = assign<ITableMachineContext>(
  ({ filters, ripcord, ...rest }: ITableMachineContext) => {
    let newContext: ITableMachineContext = {
      ...rest,
      filters: [],
      rowsFiltered: rest.rowsOG,
      ripcord: ripcord+1,
    };
    return newContext;
  }
);

export default filterReset;
