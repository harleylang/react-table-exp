import { assign } from "xstate";

import { ISmartTableContext } from "..";

const paginateRows = assign<ISmartTableContext>(
  ({ rowsF, page, pagination, ...rest }: ISmartTableContext) => {
    let istart = pagination * (page - 1);
    let newPage = page;
    if (rowsF.length < istart) {
      // catch case where on page that no longer exists due to filtering
      newPage = Math.ceil(rowsF.length / pagination);
      istart = pagination * (newPage - 1);
    }
    let iend = istart + pagination;
    let newRows = rowsF.slice(istart, iend);
    return {
      ...rest,
      rows: newRows,
      page: newPage,
    };
  }
);

export default paginateRows;
