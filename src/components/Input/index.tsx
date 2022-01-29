import { IFilter } from "components/Table";
import { useState } from "react";

const Input = ({
  min,
  max,
  val,
  type,
  filter,
  setFilter,
  clearFilter,
}: {
  min: number;
  max: number;
  val: number;
  type: React.InputHTMLAttributes<HTMLInputElement>["type"];
  filter?: (value: number) => IFilter;
  setFilter?: (f: IFilter) => void;
  clearFilter?: (id: string) => void;
}) => {
  const [value, setValue] = useState(val);
  const handleChange = ({ value: v }: EventTarget & HTMLInputElement) => {
    let vint = parseInt(v);
    setValue(vint);
    filter && setFilter && setFilter(filter(vint));
  };
  const handleClear = () => {
    setValue(10);
    if (clearFilter) clearFilter("number");
  };
  return (
    <div>
      <input
        min={min}
        max={max}
        value={value}
        type={type}
        onChange={({ currentTarget: t }) => handleChange(t)}
      />
      <button onClick={handleClear}>Clear Filter</button>
    </div>
  );
};

export default Input;
