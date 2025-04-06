import React from "react";

import "./FormField.css";

const FormField = ({ label, children }) => {
  return (
    <div className="form-field">
      <label className="form-field-label">
        <span className="form-field-text">{label}</span>
        {children}
      </label>
    </div>
  );
};

export default FormField;
