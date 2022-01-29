import { assign } from "xstate";

import { ITableMachineContext } from "../..";

const pageLength = assign<ITableMachineContext>(
  ({ ...rest }: ITableMachineContext, event: any) => {
    let paginationUpdate: number = (event as any).pagination;
    return {
      ...rest,
      pagination: paginationUpdate,
    };
  }
);

export default pageLength;
