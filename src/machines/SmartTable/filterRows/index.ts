import { assign } from "xstate";

import { ISmartTableContext } from "..";

const filterRows = assign<ISmartTableContext>(
  ({ filters, ...rest }: ISmartTableContext, event: any) => {
    let newRows = rest.rowsOG;
    // iterate over filter functions
    for (let f = 0; f < filters.length; f++) {
      let fx = filters[f].logic;
      newRows = fx(newRows);
    };
    return {
      ...rest,
      rowsF: newRows,
    };
  }
);

export default filterRows;