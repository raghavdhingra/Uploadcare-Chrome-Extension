import React from "react";

import "./uploadCareHeader.css";

const UploadCareHeader = () => {
  return (
    <header className="uploadCare-header">
      <img
        src="/upload-care.png"
        className="upload-care-logo"
        alt="UploadCare"
      />
      <h2>UploadCare</h2>
    </header>
  );
};

export default UploadCareHeader;
