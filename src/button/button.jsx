import React from "react";

import "./button.css";

const Button = ({
  title,
  onClick,
  className,
  disabled,
  isLoading,
  variant,
}) => {
  const variantList = {
    default: "default",
    link: "link",
    danger: "danger",
  };

  const selectedButtonVariant = variantList[variant] || variantList.default;

  return (
    <button
      type="button"
      className={`button ${className || ""} button-${selectedButtonVariant}`}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? "Processing..." : title}
    </button>
  );
};

export default Button;
