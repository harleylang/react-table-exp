import { assign } from "xstate";

import { ITableMachineContext, ISorter } from "../..";

const sorterUpdate = assign<ITableMachineContext>(
  ({ sorters, ...rest }: ITableMachineContext, event: any) => {
    let newSorters = sorters;
    let sorterUpdate: ISorter = (event as any).sorter;
    if (newSorters.map((s) => s.id).includes(sorterUpdate.id)) {
      let i = newSorters.findIndex((s) => s.id === sorterUpdate.id);
      newSorters[i] = sorterUpdate;
    } else {
      newSorters.push(sorterUpdate);
    }
    let newContext: ITableMachineContext = {
      ...rest,
      sorters: newSorters,
    };
    return newContext;
  }
);

export default sorterUpdate;

