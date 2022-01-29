import { assign } from "xstate";

import { ITableMachineContext, IFilter } from "../..";

const filterClear = assign<ITableMachineContext>(
  ({ filters, ...rest }: ITableMachineContext, event: any) => {
    let newFilters = filters;
    let filterIdToClear: IFilter["id"] = (event as any).id;
    newFilters = newFilters.filter((f) => f.id !== filterIdToClear);
    let newContext: ITableMachineContext = {
      ...rest,
      filters: newFilters,
    };
    return newContext;
  }
);

export default filterClear;
