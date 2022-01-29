import ITable from "components/Table/ITable";
import { Filter } from "machines/SmartTable";
import { useState } from "react";

const RadioGroup = ({
  group,
  options,
  filter,
  setFilter,
  clearFilter,
}: {
  group: string;
  options: string[];
  filter?: (value: string) => Filter;
  setFilter?: (f: Filter) => void;
  clearFilter?: (id: string) => void;
}) => {
  const [selected, setSelected] = useState(options[0]);

  const handleSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.currentTarget.value;
    setSelected(value);
    filter && setFilter && setFilter(filter(value));

  };
  const handleClear = () => {
    setSelected("all");
    if (clearFilter) clearFilter("color");
  };
  return (
    <div>
      {options.map((option) => (
        <div key={`radio-group-${group}-opt-${option}`}>
          <input
            type="radio"
            id={option}
            name={group}
            value={option}
            checked={selected === option}
            onChange={handleSelected}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
      <button onClick={handleClear}>Clear Filter</button>
    </div>
  );
};

export default RadioGroup;
