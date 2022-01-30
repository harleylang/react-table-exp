import { assign } from "xstate";

import { ITableMachineContext } from "../..";

const reset = assign<ITableMachineContext>(
  ({ filters, sorters, ripcord, ...rest }: ITableMachineContext) => {
    let newContext: ITableMachineContext = {
      ...rest,
      filters: [],
      sorters: [],
      rowsFiltered: [],
      rowsSorted: [],
      ripcord: ripcord + 1,
    };
    return newContext;
  }
);

export default reset;
