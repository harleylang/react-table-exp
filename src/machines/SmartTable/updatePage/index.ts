import { assign } from "xstate";

import { ISmartTableContext } from "..";

const updatePage = assign<ISmartTableContext>(
  ({ ...rest }: ISmartTableContext, event: any) => {
    let pageUpdate: number = (event as any).page;
    return {
      ...rest,
      page: pageUpdate,
    };
  }
);

export default updatePage;
