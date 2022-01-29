import { assign } from "xstate";

import { ITableMachineContext } from "../..";

const pageIndex = assign<ITableMachineContext>(
  ({ ...rest }: ITableMachineContext, event: any) => {
    let pageUpdate: number = (event as any).page;
    return {
      ...rest,
      page: pageUpdate,
    };
  }
);

export default pageIndex;
