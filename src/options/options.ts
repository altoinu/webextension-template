interface UserSettings {
  featureEnabled: boolean;
  username: string;
}

const loadSettings = async (): Promise<void> => {
  try {
    const result = await browser.storage.local.get(['featureEnabled', 'username']);
    const featureToggle = document.getElementById('feature-toggle') as HTMLInputElement;
    const usernameInput = document.getElementById('username') as HTMLInputElement;

    if (featureToggle) {
      featureToggle.checked = result.featureEnabled || false;
    }

    if (usernameInput) {
      usernameInput.value = result.username || '';
    }
  } catch (error) {
    console.error('Failed to load settings:', error);
  }
};

const saveSettings = async (): Promise<void> => {
  const featureToggle = document.getElementById('feature-toggle') as HTMLInputElement;
  const statusMsg = document.getElementById('status-message') as HTMLSpanElement;
  const usernameInput = document.getElementById('username') as HTMLInputElement;

  const settings: UserSettings = {
    featureEnabled: featureToggle ? featureToggle.checked : false,
    username: usernameInput ? usernameInput.value.trim() : '',
  };

  try {
    // Commit to the web extension local storage pipeline
    await browser.storage.local.set(settings as any);

    if (statusMsg) {
      statusMsg.textContent = 'Settings saved successfully!';
      statusMsg.style.color = '#28a745';
      statusMsg.style.opacity = '1';

      setTimeout(() => {
        statusMsg.style.opacity = '0';
      }, 2000);
    }
  } catch (error) {
    console.error('Failed to save settings:', error);
    if (statusMsg) {
      statusMsg.textContent = 'Error saving settings.';
      statusMsg.style.color = '#dc3545';
      statusMsg.style.opacity = '1';
    }
  }
};

const initializeOptions = (): void => {
  loadSettings();

  const saveBtn = document.getElementById('save-btn');
  if (saveBtn) {
    saveBtn.addEventListener('click', saveSettings);
  }
};

document.addEventListener('DOMContentLoaded', initializeOptions);
