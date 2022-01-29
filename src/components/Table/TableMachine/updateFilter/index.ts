import { assign } from "xstate";

import { ITableMachineContext, IFilter } from "../..";

const updateFilter = assign<ITableMachineContext>(
  ({ filters, ...rest }: ITableMachineContext, event: any) => {
    let newFilters = filters;
    let filterUpdate: IFilter = (event as any).filter;
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
