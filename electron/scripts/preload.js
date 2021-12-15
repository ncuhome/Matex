window.addEventListener('DOMContentLoaded', () => {
  const inject = () => {
    const { ipcRenderer } = require('electron');
    window.ipc = ipcRenderer;
    injectAxios();
  };

  for (const type of ['chrome', 'node', 'electron']) {
    inject();
  }
});

const injectAxios = () => {
  const axios = require('axios');
  const signale = require('signale');
  axios.interceptors.request.use(
    (config) => {
      signale.debug(config);
      return config;
    },
    (error) => Promise.reject(error)
  );
  window.Mixos = axios;
};
