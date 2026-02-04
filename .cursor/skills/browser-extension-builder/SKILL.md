---
name: browser-extension-builder
description: Build Chrome/Firefox browser extensions using Manifest V3 architecture. Use when creating browser extensions, content scripts, popup UIs, background service workers, or when the user mentions chrome extension, browser extension, or manifest.json.
---

# Browser Extension Builder

Build browser extensions using Manifest V3 architecture with content scripts, popup UI, and background service workers.

## Project Structure

```
extension/
├── manifest.json           # Extension configuration (required)
├── popup/
│   ├── popup.html          # Popup UI
│   ├── popup.css           # Popup styles
│   └── popup.js            # Popup logic
├── content/
│   └── content.js          # Runs on web pages
├── background/
│   └── service-worker.js   # Background logic
├── options/
│   ├── options.html        # Settings page (optional)
│   └── options.js
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## Manifest V3 Template

```json
{
  "manifest_version": 3,
  "name": "Extension Name",
  "version": "1.0.0",
  "description": "Brief description",
  "permissions": ["storage", "activeTab"],
  "host_permissions": ["https://example.com/*"],
  "action": {
    "default_popup": "popup/popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  "content_scripts": [
    {
      "matches": ["https://example.com/*"],
      "js": ["content/content.js"],
      "run_at": "document_end"
    }
  ],
  "background": {
    "service_worker": "background/service-worker.js"
  },
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  }
}
```

## Key Components

### Content Scripts
Run in the context of web pages. Use for DOM manipulation and data extraction.

```javascript
// content/content.js
(function() {
  'use strict';
  
  // Listen for messages from popup/background
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getData') {
      const data = extractData();
      sendResponse({ success: true, data });
    }
    return true; // Keep channel open for async response
  });
  
  function extractData() {
    // DOM manipulation here
  }
})();
```

### Background Service Worker
Handles events, manages state, coordinates between components.

```javascript
// background/service-worker.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'save') {
    chrome.storage.local.set({ data: request.data });
    sendResponse({ success: true });
  }
  return true;
});
```

### Popup UI
User interface when clicking the extension icon.

```javascript
// popup/popup.js
document.addEventListener('DOMContentLoaded', () => {
  // Send message to content script
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'getData' }, (response) => {
      if (response?.success) {
        displayData(response.data);
      }
    });
  });
});
```

## Common Permissions

| Permission | Use Case |
|------------|----------|
| `storage` | Save data locally |
| `activeTab` | Access current tab |
| `scripting` | Programmatically inject scripts |
| `tabs` | Access tab URLs/titles |
| `downloads` | Download files |
| `identity` | OAuth authentication |

## Message Passing

```javascript
// Popup → Content Script
chrome.tabs.sendMessage(tabId, { action: 'doSomething' }, callback);

// Content Script → Background
chrome.runtime.sendMessage({ action: 'save', data }, callback);

// Background → Content Script
chrome.tabs.sendMessage(tabId, { action: 'update' }, callback);
```

## Storage API

```javascript
// Save
chrome.storage.local.set({ key: value });

// Load
chrome.storage.local.get(['key'], (result) => {
  console.log(result.key);
});

// Clear
chrome.storage.local.clear();
```

## Creating Icons

Generate placeholder icons with Python:

```python
from PIL import Image
for size in [16, 48, 128]:
    img = Image.new('RGB', (size, size), color='#4285f4')
    img.save(f'extension/icons/icon{size}.png')
```

## Testing

1. Open `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `extension` folder
5. Click extension icon to test popup
6. Navigate to target site to test content script

## Debugging

- **Popup**: Right-click extension icon → "Inspect popup"
- **Content script**: Regular DevTools on the page (Console shows content script logs)
- **Service worker**: Click "service worker" link in `chrome://extensions/`

## Best Practices

1. **Use IIFE in content scripts** to avoid global namespace pollution
2. **Return true** from message listeners for async responses
3. **Check for errors** with `chrome.runtime.lastError`
4. **Use host_permissions** instead of broad permissions
5. **Minimize permissions** to what's actually needed
