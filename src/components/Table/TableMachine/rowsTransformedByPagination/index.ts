import { assign } from "xstate";

import { ITableMachineContext } from "../..";

const rowsTransformedByPagination = assign<ITableMachineContext>(
  ({ page, ...rest }: ITableMachineContext) => {
    let istart = rest.pagination * (page - 1);
    let newPage = page;
    if (rest.rowsFiltered.length < istart) {
      // catch case where on page that no longer exists due to filtering
      newPage = Math.ceil(rest.rowsFiltered.length / rest.pagination);
      istart = rest.pagination * (newPage - 1);
    }
    let iend = istart + rest.pagination;
    let newRows = rest.rowsFiltered.slice(istart, iend);
    let newContext: ITableMachineContext = {
      ...rest,
      rows: newRows,
      page: newPage,
    };
    return newContext;
  }
);

export default rowsTransformedByPagination;
