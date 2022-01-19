import React, { useState } from "react";
import axios from "axios";
import Button from "../button/button";
import UploadCareHeader from "../uploadCareHeader/uploadCareHeader";

import "./apiKeyComponent.css";

const ApiKeyComponent = ({ handleAPIKey }) => {
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAPIKeyRequest = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("UPLOADCARE_PUB_KEY", apiKey);
    const { data } = await axios({
      url: "https://upload.uploadcare.com/base/?jsonerrors=1",
      method: "POST",
      data: formData,
    });
    console.log(data.error);
    if (
      data?.error &&
      data.error.error_code === "FilesRequiredError" &&
      data.error.status_code === 400
    ) {
      handleAPIKey(apiKey);
    } else {
      setError("UploadCare Public Key is Invalid");
    }
    setIsLoading(false);
  };

  return (
    <div className="apiKey">
      <UploadCareHeader />
      <div className="apiKey-input-container">
        <input
          type="text"
          className="apiKey-input"
          placeholder="UploadCare Public Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
      </div>
      <div className="apiKey-button-container">
        <Button
          className="apiKey-button"
          disabled={!apiKey}
          title="Select Key"
          isLoading={isLoading}
          onClick={handleAPIKeyRequest}
        />
      </div>
      {error && <p className="apiKey-error">{error}</p>}
    </div>
  );
};

export default ApiKeyComponent;
