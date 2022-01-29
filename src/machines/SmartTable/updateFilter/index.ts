import { assign } from "xstate";

import { ISmartTableContext, Filter } from "..";

const updateFilter = assign<ISmartTableContext>(
  ({ filters, ...rest }: ISmartTableContext, event: any) => {
    let newRows = rest.rowsOG;
    let newFilters = filters;
    // iterate over existing filters, checking for updates
    let filterUpdate: Filter = (event as any).filter;
    if (newFilters.map((f) => f.id).includes(filterUpdate.id)) {
      let i = newFilters.findIndex((f) => f.id === filterUpdate.id);
      newFilters[i] = filterUpdate;
    } else {
      newFilters.push(filterUpdate);
    }
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

export default updateFilter;
