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
      <p className="help-section-paragraph">
        For more information, you can refer to{" "}
        <a
          href="https://medium.com/@raghav.dhingra15/personal-pinterest-with-uploadcare-chrome-extension-5ec00de74c2e"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Started
        </a>
      </p>
    </>
  );
};

export default Help;
