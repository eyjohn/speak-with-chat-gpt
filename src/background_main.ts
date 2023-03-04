export function main(browser: typeof chrome) {
  console.log('Extension loaded!');
  chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed!');
  });
}
