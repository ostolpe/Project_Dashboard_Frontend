import React from "react";

import "./Dropdown.css";

export default function Dropdown({
  children,
  display,
  ariaLabel,
  onToggle,
  open,
}) {
  const dropdownClass =
    display === "right"
      ? "dropdown-container--right"
      : "dropdown-container--left";

  return (
    <div className="dropdown-wrapper">
      <button
        aria-label={ariaLabel}
        aria-expanded={open}
        className={`dropdown-btn ${open ? "dropdown-btn--active" : ""}`}
        onClick={() => onToggle(!open)}
      >
        <i className="fa-solid fa-ellipsis"></i>
        <span className="sr-only">{ariaLabel}</span>
      </button>
      <div
        style={open ? { display: "block" } : { display: "none" }}
        aria-hidden={!open}
        className={`dropdown-container ${dropdownClass}`}
      >
        <div className="dropdown-content">{children}</div>
      </div>
    </div>
  );
}
