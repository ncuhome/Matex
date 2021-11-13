window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector: string, text: string) => {
    console.log(window.addEventListener);
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, <string>process.versions[type]);
  }
});
