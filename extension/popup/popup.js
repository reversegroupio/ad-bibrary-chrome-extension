// Facebook Ad Library Scraper - Popup Script

document.addEventListener('DOMContentLoaded', async () => {
  // DOM Elements
  const notOnPageNotice = document.getElementById('not-on-page');
  const mainContent = document.getElementById('main-content');
  const statusDot = document.getElementById('status-dot');
  const statusText = document.getElementById('status-text');
  const adsCount = document.getElementById('ads-count');
  const scrollCount = document.getElementById('scroll-count');
  const startBtn = document.getElementById('start-btn');
  const stopBtn = document.getElementById('stop-btn');
  const exportJsonBtn = document.getElementById('export-json-btn');
  const exportCsvBtn = document.getElementById('export-csv-btn');
  const exportBigQueryBtn = document.getElementById('export-bigquery-btn');
  const clearDataBtn = document.getElementById('clear-data-btn');
  
  // BigQuery DOM Elements
  const bqStatus = document.getElementById('bq-status');
  const bqConnectBtn = document.getElementById('bq-connect-btn');
  const bqDisconnectBtn = document.getElementById('bq-disconnect-btn');
  const bqConfig = document.getElementById('bq-config');
  const bqProjectInput = document.getElementById('bq-project');
  const bqDatasetInput = document.getElementById('bq-dataset');
  const bqTableInput = document.getElementById('bq-table');
  const bqAutoCreateCheckbox = document.getElementById('bq-auto-create');
  const bqSaveSettingsBtn = document.getElementById('bq-save-settings');

  let currentTabId = null;
  let statusCheckInterval = null;
  
  // BigQuery settings storage key
  const BQ_SETTINGS_KEY = 'bigquerySettings';

  // Check if we're on an Ad Library page
  async function checkCurrentPage() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      currentTabId = tab.id;

      if (tab.url && tab.url.includes('facebook.com/ads/library')) {
        notOnPageNotice.style.display = 'none';
        mainContent.style.display = 'block';
        await getStatus();
        startStatusPolling();
      } else {
        notOnPageNotice.style.display = 'block';
        mainContent.style.display = 'none';
      }
    } catch (error) {
      console.error('Error checking page:', error);
      notOnPageNotice.style.display = 'block';
      mainContent.style.display = 'none';
    }
  }

  // Send message to content script
  async function sendToContentScript(message) {
    try {
      const response = await chrome.tabs.sendMessage(currentTabId, message);
      return response;
    } catch (error) {
      console.error('Error sending message to content script:', error);
      return null;
    }
  }

  // Get current status from content script
  async function getStatus() {
    const response = await sendToContentScript({ type: 'GET_STATUS' });
    if (response) {
      updateUI(response);
    }
  }

  // Update UI with current state
  function updateUI(state) {
    adsCount.textContent = state.adsCollected || 0;
    scrollCount.textContent = state.scrollCount || 0;

    if (state.isActive) {
      setActiveState();
    } else if (state.adsCollected > 0) {
      setCompleteState();
    } else {
      setReadyState();
    }

    // Enable/disable export buttons based on data availability
    const hasData = state.adsCollected > 0;
    exportJsonBtn.disabled = !hasData;
    exportCsvBtn.disabled = !hasData;
    updateBigQueryExportButton(hasData);
  }
  
  // Update BigQuery export button state
  async function updateBigQueryExportButton(hasData) {
    const isConnected = await BigQueryClient.isAuthenticated();
    const settings = await loadBigQuerySettings();
    const hasConfig = settings.projectId && settings.datasetId && settings.tableId;
    exportBigQueryBtn.disabled = !hasData || !isConnected || !hasConfig;
  }

  function setReadyState() {
    statusDot.className = 'dot inactive';
    statusText.textContent = 'Ready';
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }

  function setActiveState() {
    statusDot.className = 'dot active';
    statusText.textContent = 'Scraping...';
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }

  function setCompleteState() {
    statusDot.className = 'dot complete';
    statusText.textContent = 'Complete';
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }

  // Status polling
  function startStatusPolling() {
    if (statusCheckInterval) {
      clearInterval(statusCheckInterval);
    }
    statusCheckInterval = setInterval(getStatus, 1000);
  }

  function stopStatusPolling() {
    if (statusCheckInterval) {
      clearInterval(statusCheckInterval);
      statusCheckInterval = null;
    }
  }

  // Event Listeners
  startBtn.addEventListener('click', async () => {
    const response = await sendToContentScript({ type: 'START_SCRAPING' });
    if (response && response.success) {
      setActiveState();
    }
  });

  stopBtn.addEventListener('click', async () => {
    const response = await sendToContentScript({ type: 'STOP_SCRAPING' });
    if (response && response.success) {
      await getStatus();
    }
  });

  exportJsonBtn.addEventListener('click', async () => {
    // Get data directly from content script and download
    const data = await sendToContentScript({ type: 'GET_DATA' });
    if (data && data.ads && data.ads.length > 0) {
      downloadJson(data);
    } else {
      alert('No data to export');
    }
  });

  exportCsvBtn.addEventListener('click', async () => {
    // Get data directly from content script and download
    const data = await sendToContentScript({ type: 'GET_DATA' });
    if (data && data.ads && data.ads.length > 0) {
      downloadCsv(data);
    } else {
      alert('No data to export');
    }
  });

  clearDataBtn.addEventListener('click', async () => {
    if (confirm('Are you sure you want to clear all collected data?')) {
      await chrome.runtime.sendMessage({ type: 'CLEAR_DATA' });
      adsCount.textContent = '0';
      scrollCount.textContent = '0';
      setReadyState();
      exportJsonBtn.disabled = true;
      exportCsvBtn.disabled = true;
      exportBigQueryBtn.disabled = true;
    }
  });
  
  // =====================
  // BigQuery Functions
  // =====================
  
  // Load BigQuery settings from storage
  async function loadBigQuerySettings() {
    return new Promise((resolve) => {
      chrome.storage.local.get([BQ_SETTINGS_KEY], (result) => {
        resolve(result[BQ_SETTINGS_KEY] || {
          projectId: '',
          datasetId: 'ad_library_data',
          tableId: 'facebook_ads',
          autoCreate: true
        });
      });
    });
  }
  
  // Save BigQuery settings to storage
  async function saveBigQuerySettings(settings) {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [BQ_SETTINGS_KEY]: settings }, resolve);
    });
  }
  
  // Update BigQuery connection status UI
  async function updateBigQueryStatus() {
    try {
      const isConnected = await BigQueryClient.isAuthenticated();
      
      if (isConnected) {
        bqStatus.textContent = 'Connected';
        bqStatus.className = 'bq-status connected';
        bqConnectBtn.style.display = 'none';
        bqDisconnectBtn.style.display = 'inline-flex';
        bqConfig.style.display = 'flex';
      } else {
        bqStatus.textContent = 'Not Connected';
        bqStatus.className = 'bq-status disconnected';
        bqConnectBtn.style.display = 'inline-flex';
        bqDisconnectBtn.style.display = 'none';
        bqConfig.style.display = 'none';
      }
      
      // Update export button state
      const state = await sendToContentScript({ type: 'GET_STATUS' });
      updateBigQueryExportButton(state?.adsCollected > 0);
    } catch (e) {
      console.error('Error updating BigQuery status:', e);
      bqStatus.textContent = 'Error';
      bqStatus.className = 'bq-status error';
    }
  }
  
  // Initialize BigQuery settings UI
  async function initBigQuerySettings() {
    const settings = await loadBigQuerySettings();
    bqProjectInput.value = settings.projectId || '';
    bqDatasetInput.value = settings.datasetId || 'ad_library_data';
    bqTableInput.value = settings.tableId || 'facebook_ads';
    bqAutoCreateCheckbox.checked = settings.autoCreate !== false;
    
    await updateBigQueryStatus();
  }
  
  // BigQuery Connect button
  bqConnectBtn.addEventListener('click', async () => {
    try {
      bqConnectBtn.disabled = true;
      bqConnectBtn.textContent = 'Connecting...';
      
      await BigQueryClient.getAuthToken(true);
      await updateBigQueryStatus();
      
      showToast('Successfully connected to Google!', 'success');
    } catch (e) {
      console.error('BigQuery connect error:', e);
      showToast('Failed to connect: ' + e.message, 'error');
    } finally {
      bqConnectBtn.disabled = false;
      bqConnectBtn.innerHTML = `
        <svg class="btn-icon-svg" viewBox="0 0 24 24" width="16" height="16">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Connect Google Account
      `;
    }
  });
  
  // BigQuery Disconnect button
  bqDisconnectBtn.addEventListener('click', async () => {
    try {
      await BigQueryClient.revokeAuthToken();
      await updateBigQueryStatus();
      showToast('Disconnected from Google', 'info');
    } catch (e) {
      console.error('BigQuery disconnect error:', e);
    }
  });
  
  // Save BigQuery settings button
  bqSaveSettingsBtn.addEventListener('click', async () => {
    const settings = {
      projectId: bqProjectInput.value.trim(),
      datasetId: bqDatasetInput.value.trim() || 'ad_library_data',
      tableId: bqTableInput.value.trim() || 'facebook_ads',
      autoCreate: bqAutoCreateCheckbox.checked
    };
    
    if (!settings.projectId) {
      showToast('Please enter a Project ID', 'error');
      bqProjectInput.focus();
      return;
    }
    
    await saveBigQuerySettings(settings);
    showToast('Settings saved!', 'success');
    
    // Update export button state
    const state = await sendToContentScript({ type: 'GET_STATUS' });
    updateBigQueryExportButton(state?.adsCollected > 0);
  });
  
  // Export to BigQuery button
  exportBigQueryBtn.addEventListener('click', async () => {
    const data = await sendToContentScript({ type: 'GET_DATA' });
    if (!data || !data.ads || data.ads.length === 0) {
      showToast('No data to export', 'error');
      return;
    }
    
    const settings = await loadBigQuerySettings();
    
    if (!settings.projectId) {
      showToast('Please configure BigQuery settings first', 'error');
      document.getElementById('bigquery-settings').open = true;
      return;
    }
    
    // Show export modal
    const modal = createExportModal();
    document.body.appendChild(modal);
    
    try {
      exportBigQueryBtn.disabled = true;
      
      const result = await BigQueryClient.exportToBigQuery(data, settings, (progress) => {
        updateExportModal(modal, progress);
      });
      
      if (result.errorCount > 0) {
        showToast(`Exported with ${result.errorCount} errors. ${result.successCount} rows inserted.`, 'warning');
      } else {
        showToast(`Successfully exported ${result.successCount} rows to BigQuery!`, 'success');
      }
    } catch (e) {
      console.error('BigQuery export error:', e);
      showToast('Export failed: ' + e.message, 'error');
      updateExportModal(modal, { stage: 'error', message: e.message });
    } finally {
      exportBigQueryBtn.disabled = false;
      // Remove modal after delay
      setTimeout(() => {
        if (modal.parentNode) {
          modal.parentNode.removeChild(modal);
        }
      }, 2000);
    }
  });
  
  // Create export progress modal
  function createExportModal() {
    const modal = document.createElement('div');
    modal.className = 'export-modal';
    modal.innerHTML = `
      <div class="export-modal-content">
        <h3>Exporting to BigQuery</h3>
        <p class="export-status">Initializing...</p>
        <div class="export-progress-bar">
          <div class="export-progress-fill" style="width: 0%"></div>
        </div>
      </div>
    `;
    return modal;
  }
  
  // Update export modal with progress
  function updateExportModal(modal, progress) {
    const statusEl = modal.querySelector('.export-status');
    const progressFill = modal.querySelector('.export-progress-fill');
    
    statusEl.textContent = progress.message;
    
    if (progress.stage === 'auth') {
      progressFill.style.width = '10%';
    } else if (progress.stage === 'setup') {
      progressFill.style.width = '25%';
    } else if (progress.stage === 'transform') {
      progressFill.style.width = '40%';
    } else if (progress.stage === 'upload') {
      const percent = progress.total ? Math.round((progress.current / progress.total) * 50) + 50 : 50;
      progressFill.style.width = `${percent}%`;
    } else if (progress.stage === 'complete') {
      progressFill.style.width = '100%';
      progressFill.style.background = '#31a24c';
    } else if (progress.stage === 'error') {
      progressFill.style.width = '100%';
      progressFill.style.background = '#fa383e';
    }
  }
  
  // Toast notification helper
  function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
      existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 16px;
      left: 50%;
      transform: translateX(-50%);
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      z-index: 1001;
      animation: slideUp 0.3s ease;
      ${type === 'success' ? 'background: #d4edda; color: #155724;' : ''}
      ${type === 'error' ? 'background: #f8d7da; color: #721c24;' : ''}
      ${type === 'warning' ? 'background: #fff3cd; color: #856404;' : ''}
      ${type === 'info' ? 'background: #d1ecf1; color: #0c5460;' : ''}
    `;
    
    document.body.appendChild(toast);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
      if (toast.parentNode) {
        toast.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }
    }, 4000);
  }

  // Download functions
  function downloadJson(data) {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ad_library_export_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function downloadCsv(data) {
    if (!data.ads || data.ads.length === 0) {
      alert('No ads to export');
      return;
    }

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

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ad_library_export_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Listen for messages from background/content script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'PROGRESS_UPDATE') {
      updateUI(message.data);
    } else if (message.type === 'SCRAPING_COMPLETE') {
      updateUI({
        isActive: false,
        adsCollected: message.data.adsCollected,
        scrollCount: message.data.scrollCount
      });
    }
  });

  // Cleanup on popup close
  window.addEventListener('unload', () => {
    stopStatusPolling();
  });

  // Initialize
  await checkCurrentPage();
  await initBigQuerySettings();
});
