import { assign } from "xstate";

import { ITableMachineContext } from "../..";

const setup = assign<ITableMachineContext>(
  ({ ...rest }: ITableMachineContext) => {
    return {
      ...rest,
      rowsOG: rest.rows, // save a copy of the initial rows sent by the dev
    };
  }
);

export default setup;
