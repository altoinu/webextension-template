const initializePopup = (): void => {
  const openOptionsBtn = document.getElementById('open-options');

  if (openOptionsBtn) {
    openOptionsBtn.addEventListener('click', () => {
      // Leverages the native API to open the settings view in a new tab
      browser.runtime.openOptionsPage();
    });
  }
};

document.addEventListener('DOMContentLoaded', initializePopup);
