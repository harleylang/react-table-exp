import ISorter from "../ISorter";

interface ITableTh {
  data: string;
  component: (data: string) => JSX.Element;
  sorter?: ISorter;
}

export default ITableTh;
