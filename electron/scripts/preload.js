window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    window.isMain = true;
    const element = document.getElementById(selector);
    if (element) element.className = 'main';
  };

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText('root', process.versions[type]?.toString());
  }
});
