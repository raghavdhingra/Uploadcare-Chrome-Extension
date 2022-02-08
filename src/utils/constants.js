export const UPLOAD_CARE_KEY = "UPLOADCARE_API_KEY";
export const UPLOAD_CARE_FILES = "UPLOAD_CARE_FILES";
export const UPLOAD_CARE_FILE_NUMBER = 5;

export const ENVIRONMENT_LIST = {
  DEVELOPMENT: "DEVELOPMENT",
  PRODUCTION: "PRODUCTION",
};

export const IS_DEVELOPEMENT =
  process?.env?.NODE_ENV === "development"
    ? ENVIRONMENT_LIST.DEVELOPMENT
    : ENVIRONMENT_LIST.PRODUCTION;

const anchorLink = (text, link) => {
  return `<a href='${link}' target='_blank' rel='noopener noreferrer'>${text}</a>`;
};

export const HELP_SECTION_LIST = [
  {
    description: `Go to ${anchorLink(
      "uploadcare.com",
      "https://uploadcare.com"
    )} and create an account.`,
  },
  {
    description: `After logging, go to Uploadcare dashboard (${anchorLink(
      "app.uploadcare.com",
      "https://app.uploadcare.com"
    )})`,
  },
  {
    description: `Select API Keys tab from the left navigation panel and copy the public API key.`,
  },
  {
    description: `Paste the API key in the input box of chrome extension.`,
  },
];
