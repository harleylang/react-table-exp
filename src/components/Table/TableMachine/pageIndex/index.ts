import { assign } from "xstate";

import { ITableMachineContext } from "../..";

const pageIndex = assign<ITableMachineContext>(
  ({ ...rest }: ITableMachineContext, event: any) => {
    let pageUpdate: number = (event as any).page;
    let newContext: ITableMachineContext = {
      ...rest,
      page: pageUpdate,
    };
    return newContext;
  }
);

export default pageIndex;
