import React, { useState } from "react";
import CopyContainer from "../../components/copyContainer/copyContainer";
import { UPLOAD_CARE_FILE_NUMBER } from "../../utils/constants";
import { fetchHistoryList } from "../../utils/function";
import Button from "../button/button";

import "./history.css";

const HistoryList = ({ historyFiles, setHistoryFiles }) => {
  const [isLoadDisabled, setLoadDisabled] = useState(false);

  async function handleLoadMore() {
    const nextItems = await fetchHistoryList(historyFiles.length);
    if (nextItems.length < UPLOAD_CARE_FILE_NUMBER) {
      setLoadDisabled(true);
    }
    setHistoryFiles((prev) => [...prev, ...nextItems]);
  }

  return historyFiles && historyFiles.length > 0 ? (
    <ul className="history-container">
      {historyFiles.map((file, index) => (
        <li key={`file-history-${index}`} className="history-list-item">
          <div
            className="history-image"
            style={{ backgroundImage: `url(${file}-/preview/50x50/)` }}
          />
          <CopyContainer data={file} />
        </li>
      ))}
      {!isLoadDisabled && (
        <li className="history-list-item-button">
          <Button
            title="Load More"
            onClick={handleLoadMore}
            disabled={isLoadDisabled}
            className="history-list-load-button"
          />
        </li>
      )}
    </ul>
  ) : (
    <h4 className="history-no-image-header">No images Found</h4>
  );
};

export default HistoryList;
