import React, { useEffect, useState } from "react";
import App from "./uploader/uploader";
import Authentication from "./authentication/authentication";
import { getItem, removeItem, setItem } from "./utils/function";
import { UPLOAD_CARE_KEY } from "./utils/constants";

const Route = () => {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const localApiKey = await getItem(UPLOAD_CARE_KEY);
      if (localApiKey) {
        setApiKey(localApiKey);
      }
    };

    fetch();
  }, []);

  const handleChangeKey = async () => {
    await removeItem(UPLOAD_CARE_KEY);
    setApiKey("");
  };

  const handleAPIKey = async (uploadcare_api_key) => {
    await setItem(UPLOAD_CARE_KEY, uploadcare_api_key);
    setApiKey(uploadcare_api_key);
  };

  return apiKey ? (
    <App apiKey={apiKey} handleChangeKey={handleChangeKey} />
  ) : (
    <Authentication handleAPIKey={handleAPIKey} />
  );
};

export default Route;
