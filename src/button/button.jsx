import React from "react";

import "./button.css";

const Button = ({ title, onClick, className, disabled, isLoading }) => {
  return (
    <button
      type="button"
      className={`button ${className || ""}`}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? "Processing..." : title}
    </button>
  );
};

export default Button;
