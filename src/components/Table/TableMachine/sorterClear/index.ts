import { assign } from "xstate";

import { ITableMachineContext, ISorter } from "../..";

const sorterClear = assign<ITableMachineContext>(
  ({ sorters, ...rest }: ITableMachineContext, event: any) => {
    let newSorters = sorters;
    let sorterIdToClear: ISorter["id"] = (event as any).sorter.id;
    newSorters = newSorters.filter((s) => s.id !== sorterIdToClear);
    let newContext: ITableMachineContext = {
      ...rest,
      sorters: newSorters,
    };
    return newContext;
  }
);

export default sorterClear;

