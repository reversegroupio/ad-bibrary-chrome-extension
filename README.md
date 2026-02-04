# Facebook Ad Library Scraper Chrome Extension

A Chrome extension that captures ad data from Facebook Ad Library pages with human-like scrolling behavior to avoid rate limiting.

## Features

- Scrape ad data from Facebook Ad Library without clicking individual ads
- Human-like scrolling with random delays to avoid detection
- Captures comprehensive ad information including:
  - Library ID
  - Ad status (Active/Inactive)
  - Date range
  - Platforms (Facebook, Instagram, etc.)
  - Advertiser name
  - Ad copy
  - Media URLs (images/videos)
  - Landing page URLs (full URL with path and parameters)
  - CTA text
  - Number of ads using the same creative
- Export data as JSON or CSV
- Optional BigQuery integration for data storage

## Installation

1. Clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the `extension` folder
5. The extension icon will appear in your toolbar

## Usage

1. Navigate to a Facebook Ad Library page (e.g., `https://www.facebook.com/ads/library/?...`)
2. Click the extension icon to open the popup
3. Click "Start Scraping" to begin collecting ad data
4. The extension will automatically scroll and collect ads
5. Click "Stop Scraping" when done
6. Export your data using the JSON or CSV buttons

## Data Captured

| Field | Description |
|-------|-------------|
| libraryId | Facebook's unique ad library identifier |
| status | Active or Inactive |
| dateRange | Start and end dates of the ad |
| platforms | Where the ad runs (Facebook, Instagram, etc.) |
| advertiserName | Name of the advertising page |
| adCopy | Main text content of the ad |
| mediaUrl | URL of the ad's image or video |
| mediaType | Type of media (image/video) |
| landingPageUrl | Full destination URL with tracking parameters |
| headline | Ad headline if present |
| ctaText | Call-to-action button text |
| numAdsUsingCreative | Number of ads using the same creative |

## Configuration

The extension uses conservative scrolling settings to avoid rate limiting:

- Base delay: 2 seconds between scrolls
- Random variation: 0-1.5 seconds additional delay
- 15% chance of longer 5-10 second pauses
- Variable scroll distances to mimic human behavior

## BigQuery Integration (Optional)

See [BIGQUERY_SETUP.md](BIGQUERY_SETUP.md) for instructions on setting up BigQuery integration to automatically store scraped data.

## File Structure

```
extension/
├── manifest.json           # Extension configuration
├── popup/
│   ├── popup.html          # Popup UI
│   ├── popup.css           # Popup styles
│   ├── popup.js            # Popup logic
│   └── bigquery.js         # BigQuery integration
├── content/
│   └── content.js          # Content script for scraping
├── background/
│   └── service-worker.js   # Background service worker
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## License

MIT

## Disclaimer

This tool is for research and analysis purposes. Please respect Facebook's Terms of Service and rate limits when using this extension. The developers are not responsible for any misuse of this tool.
