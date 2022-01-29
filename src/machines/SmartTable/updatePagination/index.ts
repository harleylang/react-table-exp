import { assign } from "xstate";

import { ISmartTableContext } from "..";

const updatePagination = assign<ISmartTableContext>(
  ({ ...rest }: ISmartTableContext, event: any) => {
    let paginationUpdate: number = (event as any).pagination;
    return {
      ...rest,
      pagination: paginationUpdate,
    };
  }
);

export default updatePagination;
