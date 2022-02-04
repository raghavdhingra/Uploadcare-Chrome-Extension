import { IS_DEVELOPEMENT, ENVIRONMENT_LIST } from "./constants";

export const getItem = (key) => {
  return new Promise((res, rej) => {
    if (IS_DEVELOPEMENT === ENVIRONMENT_LIST.DEVELOPMENT) {
      return res(localStorage.getItem(key));
    }
    window.chrome.storage.local.get([key], function (result) {
      return res(result[key]);
    });
  });
};

export const setItem = (key, value) => {
  return new Promise((res, rej) => {
    if (IS_DEVELOPEMENT === ENVIRONMENT_LIST.DEVELOPMENT) {
      return res(localStorage.setItem(key, value));
    }
    window.chrome.storage.local.set({ [key]: value }, function (result) {
      return res(result);
    });
  });
};

export const removeItem = (key) => {
  return new Promise((res, rej) => {
    if (IS_DEVELOPEMENT === ENVIRONMENT_LIST.DEVELOPMENT) {
      return res(localStorage.removeItem(key));
    }
    window.chrome.storage.local.remove([key], function (result) {
      return res(result);
    });
  });
};
