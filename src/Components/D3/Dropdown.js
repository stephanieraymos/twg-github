import React from "react";

const Dropdown = ({ options, id, onSelectedValueChange, selectedValue }) => {
  return (
    <div>
      <select
        id={id}
        onChange={(event) => onSelectedValueChange(event.target.value)}
      >
        {options.map(({ value, label }) => {
          return (
            <option value={value} selected={value === selectedValue}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Dropdown;
