import React, { useEffect, useState } from "react";
import App from "./uploader/App";
import ApiKeyComponent from "./apiKeyComponent/apiKeyComponent";

const UPLOAD_CARE_KEY = "upload-care-api-key";

const Route = () => {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    // const localApiKey = localStorage.getItem(UPLOAD_CARE_KEY);
    let localApiKey;
    window.chrome.storage.local.get([UPLOAD_CARE_KEY], function (result) {
      localApiKey = result[UPLOAD_CARE_KEY];
      if (localApiKey) {
        setApiKey(localApiKey);
      }
    });
  }, []);

  const handleChangeKey = () => {
    // localStorage.removeItem(UPLOAD_CARE_KEY);
    window.chrome.storage.local.clear();
    setApiKey("");
  };

  const handleAPIKey = (key) => {
    // localStorage.setItem(UPLOAD_CARE_KEY, key);
    window.chrome.storage.local.set({ [UPLOAD_CARE_KEY]: key });
    setApiKey(key);
  };

  return apiKey ? (
    <App apiKey={apiKey} handleChangeKey={handleChangeKey} />
  ) : (
    <ApiKeyComponent handleAPIKey={handleAPIKey} />
  );
};

export default Route;
