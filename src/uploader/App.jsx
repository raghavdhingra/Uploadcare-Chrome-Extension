import React, { useEffect, useRef, useState } from "react";
import uploadcare from "uploadcare-widget";
import Button from "../button/button";
import UploadCareHeader from "../uploadCareHeader/uploadCareHeader";

import "./App.css";

function App({ apiKey, handleChangeKey }) {
  const widgetRef = useRef(null);
  const [fileUrl, setFileUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    widgetRef.current = uploadcare.Widget("#uploader", {
      publicKey: apiKey,
      clearable: true,
      tabs: "file url facebook gdrive gphotos",
    });

    widgetRef.current.openDialog();

    widgetRef.current.onUploadComplete((data) => setFileUrl(data.cdnUrl));
  }, [apiKey]);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    }
  }, [isCopied]);

  const handleClick = () => {
    if (!isCopied && fileUrl) {
      navigator.clipboard.writeText(fileUrl);
      setIsCopied(true);
    }
  };

  return (
    <div className="app-container">
      <div className="App">
        <UploadCareHeader />
        <div className="upload-input-container">
          <input id="uploader" type="hidden" />
        </div>
        {fileUrl && (
          <div
            className={`code-block-container ${
              isCopied ? "code-block-copied" : ""
            }`}
          >
            <code className="code-block">{fileUrl}</code>
            <Button
              title={isCopied ? "Copied" : "Copy"}
              onClick={handleClick}
            />
          </div>
        )}
      </div>
      <div className="change-key-button-container">
        <Button title="Change Key" onClick={handleChangeKey} />
      </div>
    </div>
  );
}

export default App;
