window.addEventListener('DOMContentLoaded', () => {
  const inject = () => {
    const { ipcRenderer } = require('electron');
    window.ipc = ipcRenderer;
  };

  for (const type of ['chrome', 'node', 'electron']) {
    inject();
  }
});
