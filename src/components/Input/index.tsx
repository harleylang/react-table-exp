import { useState } from "react";

const Input = ({
  min,
  max,
  val,
  type,
}: {
  min: number;
  max: number;
  val: number;
  type: React.InputHTMLAttributes<HTMLInputElement>["type"];
}) => {
  const [value, setValue] = useState(val);
  return (
    <input
      min={min}
      max={max}
      value={value}
      type={type}
      onChange={({ currentTarget: t }) => setValue(parseInt(t.value))}
    />
  );
};

export default Input;
