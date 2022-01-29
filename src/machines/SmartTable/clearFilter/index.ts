import { assign } from "xstate";

import { ISmartTableContext, Filter } from "..";

const clearFilter = assign<ISmartTableContext>(
  ({ filters, ...rest }: ISmartTableContext, event: any) => {
    let newFilters = filters;
    let filterIdToClear: Filter["id"] = (event as any).id;
    newFilters = newFilters.filter((f) => f.id !== filterIdToClear);
    return {
      ...rest,
      filters: newFilters,
    };
  }
);

export default clearFilter;
