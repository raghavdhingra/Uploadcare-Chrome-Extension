import React, { useEffect, useRef, useState } from "react";
import uploadcare from "uploadcare-widget";
import Button from "../button/button";
import CopyContainer from "../copyContainer/copyContainer";
import UploadCareHeader from "../uploadCareHeader/uploadCareHeader";
import { UPLOAD_CARE_FILES } from "../utils/constants";
import { getItem, removeItem, setItem } from "../utils/function";

import "./App.css";

function App({ apiKey, handleChangeKey }) {
  const widgetRef = useRef(null);
  const [fileUrl, setFileUrl] = useState("");
  const [isHistory, setIsHistory] = useState(false);
  const [historyFiles, setHistoryFiles] = useState([]);

  useEffect(() => {
    if (!isHistory) {
      widgetRef.current = uploadcare.Widget("#uploader", {
        publicKey: apiKey,
        clearable: true,
        tabs: "file url facebook gdrive gphotos",
      });

      widgetRef.current.openDialog();

      widgetRef.current.onUploadComplete(async (data) => {
        setFileUrl(data.cdnUrl);

        // const uploadcareFile = localStorage.getItem(UPLOAD_CARE_FILES);
        const uploadcareFile = await getItem(UPLOAD_CARE_FILES);

        if (uploadcareFile) {
          const dataFiles = JSON.parse(uploadcareFile);

          if (Array.isArray(dataFiles)) {
            const newFileList = [...JSON.parse(uploadcareFile), data.cdnUrl];
            setHistoryFiles(newFileList);

            const dataListString = JSON.stringify(newFileList);

            // localStorage.setItem(
            //   UPLOAD_CARE_FILES,
            //   dataListString
            // );

            await setItem(UPLOAD_CARE_FILES, dataListString);
          }
        } else {
          // localStorage.setItem(
          //   UPLOAD_CARE_FILES,
          //   JSON.stringify([data.cdnUrl])
          // );

          await setItem(UPLOAD_CARE_FILES, JSON.stringify([data.cdnUrl]));
        }
      });
    }
  }, [apiKey, isHistory]);

  useEffect(() => {
    const fetch = async () => {
      // const uploadcareFile = localStorage.getItem(UPLOAD_CARE_FILES);
      const uploadcareFile = await getItem(UPLOAD_CARE_FILES);

      if (uploadcareFile) {
        const dataFiles = JSON.parse(uploadcareFile);

        if (Array.isArray(dataFiles)) {
          setHistoryFiles([...dataFiles]);
        }
      }
    };

    fetch();
  }, []);

  const handleClearHistory = () => {
    // localStorage.removeItem(UPLOAD_CARE_FILES);
    removeItem(UPLOAD_CARE_FILES);
    setHistoryFiles([]);
  };

  return (
    <div className="app-container">
      <div className="App">
        <UploadCareHeader />
        {!isHistory && (
          <>
            <div className="upload-input-container">
              <input id="uploader" type="hidden" />
            </div>
            {fileUrl && <CopyContainer data={fileUrl} />}
          </>
        )}
        {isHistory &&
          (historyFiles && historyFiles.length === 0 ? (
            <h4 className="history-no-image-header">No images Found</h4>
          ) : (
            <ul className="history-container">
              {historyFiles.map((file, index) => (
                <li key={`file-history-${index}`} className="history-list-item">
                  <div
                    className="history-image"
                    style={{ backgroundImage: `url(${file})` }}
                  />
                  <CopyContainer data={file} />
                </li>
              ))}
            </ul>
          ))}
      </div>

      <footer className="change-key-button-container">
        <div className="change-key-button-wrapper">
          <Button
            title={isHistory ? "Clear History" : "Change Key"}
            variant="danger"
            onClick={isHistory ? handleClearHistory : handleChangeKey}
          />
        </div>
        <div>
          <Button
            variant="link"
            title={isHistory ? "Back to uploader" : "View History"}
            onClick={() => setIsHistory(!isHistory)}
          />
        </div>
      </footer>
    </div>
  );
}

export default App;
