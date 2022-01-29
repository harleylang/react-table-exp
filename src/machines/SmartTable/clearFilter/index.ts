import { assign } from "xstate";

import { ISmartTableContext, Filter } from "..";

const clearFilter = assign<ISmartTableContext>(
  ({ filters, ...rest }: ISmartTableContext, event: any) => {
    let newRows = rest.rowsOG;
    let newFilters = filters;
    // iterate over existing filters, checking for updates
    let filterIdToClear: Filter["id"] = (event as any).id;
    newFilters = newFilters.filter((f) => f.id !== filterIdToClear);
    // iterate over filter functions
    for (let f = 0; f < newFilters.length; f++) {
      let fx = newFilters[f].logic;
      newRows = fx(newRows);
    }
    return {
      ...rest,
      filters: newFilters,
      rowsF: newRows,
    };
  }
);

export default clearFilter;
