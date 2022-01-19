import React, { useEffect, useState } from "react";
import App from "./uploader/App";
import ApiKeyComponent from "./apiKeyComponent/apiKeyComponent";

const Route = () => {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const localApiKey = localStorage.getItem("upload-care-api-key");
    // let localApiKey;
    // window.chrome.storage.sync.get(["upload-care-api-key"], function (result) {
    //   localApiKey = result.key;
    // });
    if (localApiKey) {
      setApiKey(localApiKey);
    }
  }, []);

  const handleAPIKey = (key) => {
    localStorage.setItem("upload-care-api-key", key);
    // window.chrome.storage.sync.set({ "upload-care-api-key": key });
    setApiKey(key);
  };

  return apiKey ? (
    <App apiKey={apiKey} />
  ) : (
    <ApiKeyComponent handleAPIKey={handleAPIKey} />
  );
};

export default Route;
