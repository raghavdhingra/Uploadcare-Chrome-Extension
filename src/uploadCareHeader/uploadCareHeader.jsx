import React from "react";

import "./uploadCareHeader.css";

const UploadCareHeader = () => {
  return (
    <header className="uploadCare-header">
      <img
        src="/upload-care.png"
        className="upload-care-logo"
        alt="Uploadcare"
      />
      <h2>Uploadcare</h2>
    </header>
  );
};

export default UploadCareHeader;
