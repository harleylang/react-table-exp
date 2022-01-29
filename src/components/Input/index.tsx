import ITable from "components/Table/ITable";
import { Filter } from "machines/SmartTable";
import { useState } from "react";

const Input = ({
  min,
  max,
  val,
  type,
  setFilter,
}: {
  min: number;
  max: number;
  val: number;
  type: React.InputHTMLAttributes<HTMLInputElement>["type"];
  setFilter?: (f: Filter) => void;
}) => {
  const [value, setValue] = useState(val);
  const handleChange = ({ value: v }: EventTarget & HTMLInputElement) => {
    let vint = parseInt(v);
    setValue(vint);
    setFilter &&
      setFilter({
        id: "number",
        logic: (rows: ITable["rows"]) => {
          // custom logic for handling input changes!
          let targetColumn = 1;
          let newRows = [];
          for (let r = 0; r < rows.length; r++) {
            let row = rows[r];
            let target = parseInt(row[targetColumn]);
            if (target <= vint) newRows.push(row);
          }
          return newRows;
        },
      });
  };
  return (
    <input
      min={min}
      max={max}
      value={value}
      type={type}
      onChange={({ currentTarget: t }) => handleChange(t)}
    />
  );
};

export default Input;
