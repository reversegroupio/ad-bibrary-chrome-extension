// Facebook Ad Library Scraper - Background Service Worker
// Handles message passing and data storage

// Storage keys
const STORAGE_KEYS = {
  COLLECTED_ADS: 'collectedAds',
  SCRAPE_HISTORY: 'scrapeHistory',
  SETTINGS: 'settings',
  BIGQUERY_SETTINGS: 'bigquerySettings'
};

// Default settings
const DEFAULT_SETTINGS = {
  baseDelay: 2000,
  randomVariation: 1500,
  longPauseChance: 0.15
};

// State
let currentScrapeData = null;

// Storage helpers
async function getStorage(keys) {
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, resolve);
  });
}

async function setStorage(data) {
  return new Promise((resolve) => {
    chrome.storage.local.set(data, resolve);
  });
}

// Save collected ads to storage
async function saveAdsToStorage(data) {
  const { scrapeHistory = [] } = await getStorage([STORAGE_KEYS.SCRAPE_HISTORY]);
  
  const scrapeEntry = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    pageUrl: data.scrapeInfo.pageUrl,
    advertiser: data.scrapeInfo.advertiser,
    totalAds: data.scrapeInfo.totalAds,
    ads: data.ads
  };

  scrapeHistory.push(scrapeEntry);

  // Keep only last 50 scrapes to manage storage
  if (scrapeHistory.length > 50) {
    scrapeHistory.shift();
  }

  await setStorage({
    [STORAGE_KEYS.COLLECTED_ADS]: data,
    [STORAGE_KEYS.SCRAPE_HISTORY]: scrapeHistory
  });

  return scrapeEntry.id;
}

// Export data as JSON
function exportAsJson(data) {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  chrome.downloads.download({
    url: url,
    filename: `ad_library_export_${Date.now()}.json`,
    saveAs: true
  });
}

// Export data as CSV
function exportAsCsv(data) {
  if (!data.ads || data.ads.length === 0) {
    console.log('No ads to export');
    return;
  }

  // CSV headers
  const headers = [
    'libraryId',
    'status',
    'dateStart',
    'dateEnd',
    'platforms',
    'hasEuTransparency',
    'advertiserName',
    'adCopy',
    'mediaUrl',
    'mediaType',
    'landingPageUrl',
    'headline',
    'ctaText',
    'numAdsUsingCreative',
    'scrapedAt'
  ];

  // Convert ads to CSV rows
  const rows = data.ads.map(ad => [
    ad.libraryId || '',
    ad.status || '',
    ad.dateRange?.start || '',
    ad.dateRange?.end || '',
    (ad.platforms || []).join('; '),
    ad.hasEuTransparency ? 'Yes' : 'No',
    ad.advertiserName || '',
    (ad.adCopy || '').replace(/"/g, '""').replace(/\n/g, ' '),
    ad.mediaUrl || '',
    ad.mediaType || '',
    ad.landingPageUrl || '',
    (ad.headline || '').replace(/"/g, '""'),
    ad.ctaText || '',
    ad.numAdsUsingCreative || '',
    ad.scrapedAt || ''
  ]);

  // Build CSV content
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  chrome.downloads.download({
    url: url,
    filename: `ad_library_export_${Date.now()}.csv`,
    saveAs: true
  });
}

// Message listener
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('[Service Worker] Received message:', message.type);

  switch (message.type) {
    case 'PROGRESS_UPDATE':
      // Store current progress
      currentScrapeData = message.data;
      break;

    case 'SCRAPING_COMPLETE':
      // Save completed scrape data
      saveAdsToStorage({
        scrapeInfo: {
          pageUrl: sender.tab?.url || 'unknown',
          advertiser: 'Unknown',
          totalAds: message.data.adsCollected,
          scrapedAt: new Date().toISOString()
        },
        ads: message.data.ads
      }).then(id => {
        console.log('[Service Worker] Saved scrape with ID:', id);
      });
      break;

    case 'EXPORT_JSON':
      getStorage([STORAGE_KEYS.COLLECTED_ADS]).then(result => {
        if (result[STORAGE_KEYS.COLLECTED_ADS]) {
          exportAsJson(result[STORAGE_KEYS.COLLECTED_ADS]);
          sendResponse({ success: true });
        } else {
          sendResponse({ success: false, error: 'No data to export' });
        }
      });
      return true;

    case 'EXPORT_CSV':
      getStorage([STORAGE_KEYS.COLLECTED_ADS]).then(result => {
        if (result[STORAGE_KEYS.COLLECTED_ADS]) {
          exportAsCsv(result[STORAGE_KEYS.COLLECTED_ADS]);
          sendResponse({ success: true });
        } else {
          sendResponse({ success: false, error: 'No data to export' });
        }
      });
      return true;

    case 'GET_STORED_DATA':
      getStorage([STORAGE_KEYS.COLLECTED_ADS]).then(result => {
        sendResponse(result[STORAGE_KEYS.COLLECTED_ADS] || null);
      });
      return true;

    case 'GET_SCRAPE_HISTORY':
      getStorage([STORAGE_KEYS.SCRAPE_HISTORY]).then(result => {
        sendResponse(result[STORAGE_KEYS.SCRAPE_HISTORY] || []);
      });
      return true;

    case 'CLEAR_DATA':
      // Preserve BigQuery settings when clearing data
      getStorage([STORAGE_KEYS.BIGQUERY_SETTINGS]).then(result => {
        const bqSettings = result[STORAGE_KEYS.BIGQUERY_SETTINGS];
        chrome.storage.local.clear().then(() => {
          if (bqSettings) {
            setStorage({ [STORAGE_KEYS.BIGQUERY_SETTINGS]: bqSettings });
          }
          sendResponse({ success: true });
        });
      });
      return true;
  }
});

// Listen for tab updates to reset state when navigating away
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url?.includes('facebook.com/ads/library')) {
    console.log('[Service Worker] Ad Library page loaded:', tab.url);
  }
});

console.log('[Service Worker] Facebook Ad Library Scraper service worker loaded');
