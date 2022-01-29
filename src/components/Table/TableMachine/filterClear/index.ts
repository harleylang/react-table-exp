import { assign } from "xstate";

import { ITableMachineContext, IFilter } from "../..";

const filterClear = assign<ITableMachineContext>(
  ({ filters, ...rest }: ITableMachineContext, event: any) => {
    let newFilters = filters;
    let filterIdToClear: IFilter["id"] = (event as any).id;
    newFilters = newFilters.filter((f) => f.id !== filterIdToClear);
    return {
      ...rest,
      filters: newFilters,
    };
  }
);

export default filterClear;
