import React, { useState } from "react";
import axios from "axios";
import Button from "../components/button/button";
import Header from "../components/header/header";
import Help from "../components/help/help";

import "./authentication.css";

const Authentication = ({ handleAPIKey }) => {
  const [apiKey, setApiKey] = useState("");
  const [isHelp, setIsHelp] = useState(false);
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

    if (
      data?.error &&
      data.error.error_code === "FilesRequiredError" &&
      data.error.status_code === 400
    ) {
      handleAPIKey(apiKey);
    } else {
      setError("Uploadcare Public Key is Invalid");
    }

    setIsLoading(false);
  };

  return (
    <div className="auth">
      <Header />
      {isHelp ? (
        <Help />
      ) : (
        <>
          <div className="auth-input-container">
            <input
              type="text"
              className="auth-input"
              placeholder="Uploadcare Public Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
          <div className="auth-button-container">
            <Button
              className="auth-button"
              disabled={!apiKey}
              title="Select Key"
              isLoading={isLoading}
              onClick={handleAPIKeyRequest}
            />
          </div>

          {error && <p className="auth-error">{error}</p>}
        </>
      )}

      <Button
        title={isHelp ? "I Understood." : "Help?"}
        variant={isHelp ? "default" : "link"}
        onClick={() => setIsHelp(!isHelp)}
        className="auth-help-button"
      />
    </div>
  );
};

export default Authentication;
