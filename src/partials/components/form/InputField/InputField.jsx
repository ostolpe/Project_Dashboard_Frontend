import React, { useState } from "react";
import FormField from "../FormField/FormField";

import "./InputField.css";

const InputField = ({ value, label, type, placeholder, name }) => {
  const [inputValue, setInputValue] = useState(value || "");
  return (
    <FormField label={label}>
      <input
        name={name}
        className="input-field"
        type={type}
        value={inputValue}
        placeholder={placeholder}
        onChange={(e) => setInputValue(e.target.value)}
      ></input>
    </FormField>
  );
};

export default InputField;
