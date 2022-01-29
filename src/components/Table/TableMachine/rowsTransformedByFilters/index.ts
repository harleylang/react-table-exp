import { assign } from "xstate";

import { ITableMachineContext } from "../..";

const rowsTransformedByFilters = assign<ITableMachineContext>(
  ({ filters, ...rest }: ITableMachineContext, event: any) => {
    let newRows = rest.rowsOG;
    // iterate over filter functions
    for (let f = 0; f < filters.length; f++) {
      let fx = filters[f].logic;
      newRows = fx(newRows);
    };
    let newContext: ITableMachineContext = {
      ...rest,
      filters: filters,
      rowsFiltered: newRows,
    };
    return newContext;
  }
);

export default rowsTransformedByFilters;
