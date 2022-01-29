import { assign } from "xstate";

import { ISmartTableContext } from "..";

const updatePagination = assign<ISmartTableContext>(
  ({ filters, ...rest }: ISmartTableContext, event: any) => {
    let newRows = rest.rowsOG;
    let paginationUpdate: number = (event as any).pagination;
    // iterate over filter functions
    for (let f = 0; f < filters.length; f++) {
      let fx = filters[f].logic;
      newRows = fx(newRows);
    }
    return {
      ...rest,
      rows: newRows,
      pagination: paginationUpdate,
    };
  }
);

export default updatePagination;
