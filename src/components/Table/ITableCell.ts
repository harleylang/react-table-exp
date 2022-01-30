interface ITableCell {
  data: string;
  component: (data: string) => JSX.Element;
}

export default ITableCell;
