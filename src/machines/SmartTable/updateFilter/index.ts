import { assign } from "xstate";

import { ISmartTableContext, Filter } from "..";

const updateFilter = assign<ISmartTableContext>(
  ({ filters, ...rest }: ISmartTableContext, event: any) => {
    let newFilters = filters;
    let filterUpdate: Filter = (event as any).filter;
    if (newFilters.map((f) => f.id).includes(filterUpdate.id)) {
      let i = newFilters.findIndex((f) => f.id === filterUpdate.id);
      newFilters[i] = filterUpdate;
    } else {
      newFilters.push(filterUpdate);
    }
    return {
      ...rest,
      filters: newFilters,
    };
  }
);

export default updateFilter;
