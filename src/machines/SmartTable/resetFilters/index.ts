import { assign } from "xstate";

import { ISmartTableContext } from "..";

const resetFilters = assign<ISmartTableContext>(
  ({ filters, ripcord, ...rest }: ISmartTableContext) => {
    return {
      ...rest,
      filters: [],
      rowsF: rest.rowsOG,
      ripcord: ripcord + "a",
    };
  }
);

export default resetFilters;
