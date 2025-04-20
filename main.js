// Cookie consent management
const COOKIE_TYPES = {
  necessary: {
    name: 'Necessary',
    description: 'Essential for website function',
    required: true
  },
  analytics: {
    name: 'Analytics',
    description: 'Help improve our website',
    required: false
  },
  functional: {
    name: 'Functional',
    description: 'Enhanced features',
    required: false
  }
};

function getCookiePreferences() {
  const preferences = localStorage.getItem('cookiePreferences');
  return preferences ? JSON.parse(preferences) : null;
}

function saveCookiePreferences(preferences) {
  localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
}

function showFullCookieSettings() {
  const banner = document.querySelector('.cookie-banner');
  if (banner) {
    banner.innerHTML = `
      <div class="cookie-content">
        <div class="cookie-header">
          <h3>Cookie Settings</h3>
        </div>
        <div class="cookie-options">
          <div class="cookie-option">
            <div class="cookie-option-header">
              <label>
                <input type="checkbox" checked disabled>
                <span>${COOKIE_TYPES.necessary.name}</span>
              </label>
              <span class="required-badge">Required</span>
            </div>
          </div>
          <div class="cookie-option">
            <div class="cookie-option-header">
              <label>
                <input type="checkbox" name="analytics" class="cookie-checkbox">
                <span>${COOKIE_TYPES.analytics.name}</span>
              </label>
            </div>
          </div>
          <div class="cookie-option">
            <div class="cookie-option-header">
              <label>
                <input type="checkbox" name="functional" class="cookie-checkbox">
                <span>${COOKIE_TYPES.functional.name}</span>
              </label>
            </div>
          </div>
        </div>
        <div class="cookie-footer">
          <div class="cookie-buttons">
            <button class="cookie-button accept-selected">Save</button>
            <button class="cookie-button reject-all">Reject All</button>
          </div>
        </div>
      </div>
    `;

    setupCookieButtons(banner);
  }
}

function setupCookieButtons(banner) {
  banner.querySelector('.accept-selected')?.addEventListener('click', () => {
    const preferences = {
      necessary: true,
      analytics: banner.querySelector('input[name="analytics"]')?.checked || false,
      functional: banner.querySelector('input[name="functional"]')?.checked || false,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    saveCookiePreferences(preferences);
    banner.remove();
  });

  banner.querySelector('.reject-all')?.addEventListener('click', () => {
    const preferences = {
      necessary: true,
      analytics: false,
      functional: false,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    saveCookiePreferences(preferences);
    banner.remove();
  });

  banner.querySelector('.customize-cookies')?.addEventListener('click', (e) => {
    e.preventDefault();
    showFullCookieSettings();
  });

  banner.querySelector('.accept-all')?.addEventListener('click', () => {
    const preferences = {
      necessary: true,
      analytics: true,
      functional: true,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    saveCookiePreferences(preferences);
    banner.remove();
  });
}

function initCookieConsent() {
  const preferences = getCookiePreferences();
  if (!preferences) {
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
      <div class="cookie-content">
        <div class="cookie-header">
          <p>We use cookies to enhance your experience.</p>
        </div>
        <div class="cookie-footer">
          <div class="cookie-buttons">
            <button class="cookie-button accept-all">Accept All</button>
            <button class="cookie-button customize-cookies">Customize</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(banner);
    setupCookieButtons(banner);
  }
}

function addCookieSettings() {
  const footer = document.querySelector('.footer-links');
  if (footer) {
    const settingsButton = document.createElement('a');
    settingsButton.href = '#';
    settingsButton.textContent = 'Cookie Settings';
    settingsButton.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('cookiePreferences');
      initCookieConsent();
    });
    footer.appendChild(settingsButton);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initCookieConsent();
  addCookieSettings();
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});