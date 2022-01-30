export const getItem = (key) => {
  return new Promise((res, rej) => {
    window.chrome.storage.local.get([key], function (result) {
      return res(result[key]);
    });
  });
};

export const setItem = (key, value) => {
  return new Promise((res, rej) => {
    window.chrome.storage.local.set({ [key]: value }, function (result) {
      return res(result);
    });
  });
};

export const removeItem = (key) => {
  return new Promise((res, rej) => {
    window.chrome.storage.local.remove([key], function (result) {
      return res(result);
    });
  });
};
