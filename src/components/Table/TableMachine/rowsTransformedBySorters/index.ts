import { assign } from "xstate";

import { ITableMachineContext } from "../..";

const rowsTransformedBySorters = assign<ITableMachineContext>(
  ({ sorters, ...rest }: ITableMachineContext) => {
    let newRows = [...rest.rowsFiltered]; // mke new array, so we do not mutate original obj
    // sort sorters by priority level
    let sortersByPriority = sorters
        .sort((a, b) => (b.priority as number) - (a.priority as number));
    // iterate over sorters
    for (let sorter of sortersByPriority) {
        let c = sorter.coli; 
        if (typeof sorter.direction !== undefined) {
            newRows = newRows.sort((a, b) => {
                if(a[c].data < b[c].data) return sorter.direction === 'ascending' ? -1 : 1;
                if(a[c].data > b[c].data) return sorter.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        };
    };
    let newContext: ITableMachineContext = {
      ...rest,
      sorters: sorters,
      rowsSorted: newRows,
    };
    return newContext;
  }
);

export default rowsTransformedBySorters;

