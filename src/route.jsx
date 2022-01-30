import React, { useEffect, useState } from "react";
import App from "./uploader/App";
import ApiKeyComponent from "./apiKeyComponent/apiKeyComponent";
import { getItem, removeItem, setItem } from "./utils/function";
import { UPLOAD_CARE_KEY } from "./utils/constants";

const Route = () => {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const fetch = async () => {
      // const localApiKey = localStorage.getItem(UPLOAD_CARE_KEY);
      const localApiKey = await getItem(UPLOAD_CARE_KEY);
      if (localApiKey) {
        setApiKey(localApiKey);
      }
    };

    fetch();
  }, []);

  const handleChangeKey = async () => {
    // localStorage.removeItem(UPLOAD_CARE_KEY);
    await removeItem(UPLOAD_CARE_KEY);
    setApiKey("");
  };

  const handleAPIKey = async (uploadcare_api_key) => {
    // localStorage.setItem(UPLOAD_CARE_KEY, key);
    await setItem(UPLOAD_CARE_KEY, uploadcare_api_key);
    setApiKey(uploadcare_api_key);
  };

  return apiKey ? (
    <App apiKey={apiKey} handleChangeKey={handleChangeKey} />
  ) : (
    <ApiKeyComponent handleAPIKey={handleAPIKey} />
  );
};

export default Route;
