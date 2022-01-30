import { assign } from "xstate";

import { ITableMachineContext, IFilter } from "../..";

const filterUpdate = assign<ITableMachineContext>(
  ({ filters, ...rest }: ITableMachineContext, event: any) => {
    let newFilters = filters;
    let filterUpdate: IFilter = (event as any).filter;
    if (newFilters.map((f) => f.id).includes(filterUpdate.id)) {
      let i = newFilters.findIndex((f) => f.id === filterUpdate.id);
      newFilters[i] = filterUpdate;
    } else {
      newFilters.push(filterUpdate);
    }
    let newContext: ITableMachineContext = {
      ...rest,
      filters: newFilters,
    };
    return newContext;
  }
);

export default filterUpdate;
