import React, { useState, useEffect } from "react";
import Button from "../button/button";

import "./copyContainer.css";

const CopyContainer = ({ data, initialStateCopied }) => {
  const [isCopied, setIsCopied] = useState(initialStateCopied || false);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    }
  }, [isCopied]);

  const handleClick = () => {
    if (!isCopied && data) {
      navigator.clipboard.writeText(data);
      setIsCopied(true);
    }
  };

  return (
    <div
      className={`code-block-container ${isCopied ? "code-block-copied" : ""}`}
    >
      <code className="code-block">{data}</code>
      <Button title={isCopied ? "Copied" : "Copy"} onClick={handleClick} />
    </div>
  );
};

export default CopyContainer;
