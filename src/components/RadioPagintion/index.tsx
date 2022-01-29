import { useState } from "react";

const RadioPagination = ({
  group,
  options,
  defaultOptionI,
  setPagination,
}: {
  group: string;
  options: number[];
  defaultOptionI: number;
  setPagination: (pagination: number) => void;
}) => {
  const [selected, setSelected] = useState(options[defaultOptionI]);
  const handleSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.currentTarget.value;
    let vint = parseInt(value);
    setSelected(vint);
    setPagination(vint);
  };
  return (
    <div>
      <b>Page Length</b>
      {options.map((option) => (
        <div key={`radio-group-${group}-opt-${option}`}>
          <input
            type="radio"
            id={`pagitoggle-${option}`}
            name={group}
            value={option}
            checked={selected === option}
            onChange={handleSelected}
          />
          <label htmlFor={`pagitoggle-${option}`}>{option}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioPagination;
