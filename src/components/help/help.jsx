import React from "react";
import { HELP_SECTION_LIST } from "../../utils/constants";

import "./help.css";

const Help = () => {
  return (
    <>
      <ol className="help-section-list">
        {HELP_SECTION_LIST.map((item, index) => {
          const { description } = item;

          return (
            <li className="help-section-list-item" key={`description-${index}`}>
              <span dangerouslySetInnerHTML={{ __html: description }} />
            </li>
          );
        })}
      </ol>
      <p>For more information, you can refer to </p>
    </>
  );
};

export default Help;
