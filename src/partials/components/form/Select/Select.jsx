import React, { useState, useEffect } from "react";
import FormField from "../FormField/FormField";

import "./Select.css";

const Select = ({ name, label, value, options, setSelectedValues }) => {
  const [internalValue, setInternalValue] = useState(value || "");

  useEffect(() => {
    if (!value && !setSelectedValues && options.length > 0) {
      setInternalValue(options[0].id);
    }
  }, [value, options, setSelectedValues]);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;

    if (setSelectedValues) {
      setSelectedValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setInternalValue(value);
    }
  };

  const selectedValue = setSelectedValues ? value : internalValue;
  return (
    <FormField label={label}>
      <select
        className="select-field"
        name={name}
        value={selectedValue}
        onChange={handleSelectChange}
      >
        {options.map((option, index) => {
          return (
            <option key={`option-${index}`} value={option.id}>
              {option.name}
            </option>
          );
        })}
      </select>
    </FormField>
  );
};

export default Select;
