import { useState } from "react";

const RadioGroup = ({
  group,
  options,
}: {
  group: string;
  options: string[];
}) => {
  const [selected, setSelected] = useState(options[0]);

  const handleSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(event.currentTarget.value);
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
    </div>
  );
};

export default RadioGroup;
