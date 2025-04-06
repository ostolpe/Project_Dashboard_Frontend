import React, { useState } from "react";
import FormField from "../FormField/FormField";

import "./TextAreaField.css";

const TextAreaField = ({ value, label, name }) => {
  const [textAreaValue, setTextAreaValue] = useState(value || "");
  return (
    <FormField label={label}>
      <textarea
        name={name}
        className="text-area-field"
        value={textAreaValue}
        onChange={(e) => setTextAreaValue(e.target.value)}
      ></textarea>
    </FormField>
  );
};

export default TextAreaField;
