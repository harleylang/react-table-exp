import ITable from "components/Table/ITable";
import { Filter } from "machines/SmartTable";
import { useState } from "react";

const RadioGroup = ({
  group,
  options,
  setFilter,
  clearFilter,
}: {
  group: string;
  options: string[];
  setFilter?: (f: Filter) => void;
  clearFilter?: (id: string) => void;
}) => {
  const [selected, setSelected] = useState(options[0]);

  const handleSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.currentTarget.value;
    setSelected(value);
    setFilter &&
      setFilter({
        id: "color",
        logic: (rows: ITable["rows"]) => {
          // custom logic for handling input changes!
          let targetColumn = 2;
          if (value === "all") return rows;
          let newRows = [];
          for (let r = 0; r < rows.length; r++) {
            let row = rows[r];
            let target = row[targetColumn];
            if (target === value) newRows.push(row);
          }
          return newRows;
        },
      });
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
