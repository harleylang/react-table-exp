import { assign } from "xstate";

import { ITableMachineContext } from "../..";

const pageLength = assign<ITableMachineContext>(
  ({ ...rest }: ITableMachineContext, event: any) => {
    let paginationUpdate: number = (event as any).pagination;
    let newContext: ITableMachineContext = {
      ...rest,
      pagination: paginationUpdate,
    };
    return newContext;
  }
);

export default pageLength;
