import React, { useEffect, useRef, useState } from "react";
import uploadcare from "uploadcare-widget";
import Button from "../components/button/button";
import CopyContainer from "../components/copyContainer/copyContainer";
import UploadCareHeader from "../components/header/header";
import HistoryList from "../components/history/history";
import { UPLOAD_CARE_FILES } from "../utils/constants";
import {
  fetchHistoryList,
  getItem,
  removeItem,
  setItem,
} from "../utils/function";

import "./uploader.css";

function App({ apiKey, handleChangeKey }) {
  const widgetRef = useRef(null);
  const [fileUrl, setFileUrl] = useState("");
  const [isHistory, setIsHistory] = useState(false);
  const [historyFiles, setHistoryFiles] = useState([]);

  useEffect(() => {
    fetchHistoryList().then((data) => setHistoryFiles(data));
  }, []);

  useEffect(() => {
    if (!isHistory) {
      widgetRef.current = uploadcare.Widget("#uploader", {
        publicKey: apiKey,
        clearable: true,
        tabs: "file url facebook gdrive gphotos",
      });

      widgetRef.current.onDialogOpen((dialog) => {
        function uploadFromClipboard(e) {
          let data = e.clipboardData;
          if (!!data && !!data.items.length) {
            // check if clipboard data is image
            if (data.items[0].type.indexOf("image") !== 0) {
              alert("No image in the clipboard");
              return;
            }
            let blob = e.clipboardData.items[0].getAsFile();
            dialog.addFiles("object", [blob]);
          }
        }
        window.addEventListener("paste", uploadFromClipboard);
      });

      widgetRef.current.onUploadComplete(async (data) => {
        const { cdnUrl: fileURL } = data;
        setFileUrl(fileURL);
        navigator.clipboard.writeText(fileURL);
        setHistoryFiles((prev) => [fileURL, ...prev]);

        const uploadcareFile = await getItem(UPLOAD_CARE_FILES);

        if (uploadcareFile) {
          const dataFiles = JSON.parse(uploadcareFile);

          if (Array.isArray(dataFiles)) {
            const newFileList = [fileURL, ...dataFiles];
            const dataListString = JSON.stringify(newFileList);
            await setItem(UPLOAD_CARE_FILES, dataListString);
          }
        } else {
          const dataFiles = [fileURL];
          await setItem(UPLOAD_CARE_FILES, JSON.stringify(dataFiles));
        }
      });

      widgetRef.current.openDialog();
    }
  }, [apiKey, isHistory]);

  const handleClearHistory = () => {
    removeItem(UPLOAD_CARE_FILES);
    setHistoryFiles([]);
  };

  return (
    <div className="uploader-component">
      <div className="uploader-wrapper">
        <UploadCareHeader />
        {isHistory ? (
          <HistoryList
            historyFiles={historyFiles}
            setHistoryFiles={setHistoryFiles}
          />
        ) : (
          <>
            <div className="upload-input-container">
              <input id="uploader" type="hidden" />
            </div>
            {fileUrl && <CopyContainer initialStateCopied data={fileUrl} />}
          </>
        )}
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
