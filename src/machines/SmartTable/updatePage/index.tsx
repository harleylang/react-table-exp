import { assign } from "xstate";

import { ISmartTableContext } from "..";

const updatePage = assign<ISmartTableContext>(
  ({ filters, ...rest }: ISmartTableContext, event: any) => {
    let newRows = rest.rowsOG;
    let pageUpdate: number = (event as any).page;
    // iterate over filter functions
    for (let f = 0; f < filters.length; f++) {
      let fx = filters[f].logic;
      newRows = fx(newRows);
    }
    return {
      ...rest,
      rows: newRows,
      page: pageUpdate,
    };
  }
);

export default updatePage;
