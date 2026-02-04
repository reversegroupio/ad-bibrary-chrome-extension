// BigQuery Integration Module for Facebook Ad Library Scraper

const BigQueryClient = {
  // Configuration
  SCOPES: [
    'https://www.googleapis.com/auth/bigquery',
    'https://www.googleapis.com/auth/bigquery.insertdata'
  ],
  
  // BigQuery API endpoints
  API_BASE: 'https://bigquery.googleapis.com/bigquery/v2',
  
  // Table schema for Facebook Ads
  TABLE_SCHEMA: {
    fields: [
      { name: 'library_id', type: 'STRING', mode: 'NULLABLE', description: 'Facebook Ad Library ID' },
      { name: 'status', type: 'STRING', mode: 'NULLABLE', description: 'Ad status (Active/Inactive)' },
      { name: 'date_start', type: 'STRING', mode: 'NULLABLE', description: 'Ad start date' },
      { name: 'date_end', type: 'STRING', mode: 'NULLABLE', description: 'Ad end date' },
      { name: 'platforms', type: 'STRING', mode: 'REPEATED', description: 'Platforms where ad appeared' },
      { name: 'has_eu_transparency', type: 'BOOLEAN', mode: 'NULLABLE', description: 'Has EU transparency info' },
      { name: 'advertiser_name', type: 'STRING', mode: 'NULLABLE', description: 'Name of advertiser' },
      { name: 'ad_copy', type: 'STRING', mode: 'NULLABLE', description: 'Ad copy text' },
      { name: 'media_url', type: 'STRING', mode: 'NULLABLE', description: 'URL of ad media' },
      { name: 'media_type', type: 'STRING', mode: 'NULLABLE', description: 'Type of media (image/video)' },
      { name: 'landing_page_url', type: 'STRING', mode: 'NULLABLE', description: 'Landing page URL' },
      { name: 'headline', type: 'STRING', mode: 'NULLABLE', description: 'Ad headline' },
      { name: 'cta_text', type: 'STRING', mode: 'NULLABLE', description: 'Call to action text' },
      { name: 'num_ads_using_creative', type: 'INTEGER', mode: 'NULLABLE', description: 'Number of ads using this creative' },
      { name: 'scraped_at', type: 'TIMESTAMP', mode: 'NULLABLE', description: 'When the ad was scraped' },
      { name: 'scrape_page_url', type: 'STRING', mode: 'NULLABLE', description: 'URL of the scraped page' },
      { name: 'scrape_advertiser', type: 'STRING', mode: 'NULLABLE', description: 'Advertiser from scrape info' },
      { name: 'inserted_at', type: 'TIMESTAMP', mode: 'NULLABLE', description: 'When the row was inserted into BigQuery' }
    ]
  },
  
  // Get OAuth token using Chrome Identity API
  async getAuthToken(interactive = true) {
    return new Promise((resolve, reject) => {
      chrome.identity.getAuthToken({ interactive }, (token) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else if (token) {
          resolve(token);
        } else {
          reject(new Error('No token received'));
        }
      });
    });
  },
  
  // Remove cached auth token
  async revokeAuthToken() {
    try {
      const token = await this.getAuthToken(false);
      return new Promise((resolve) => {
        chrome.identity.removeCachedAuthToken({ token }, () => {
          // Also revoke from Google
          fetch(`https://accounts.google.com/o/oauth2/revoke?token=${token}`)
            .finally(() => resolve());
        });
      });
    } catch (e) {
      // No token to revoke
      return Promise.resolve();
    }
  },
  
  // Check if user is authenticated
  async isAuthenticated() {
    try {
      await this.getAuthToken(false);
      return true;
    } catch (e) {
      return false;
    }
  },
  
  // Make authenticated API request
  async apiRequest(url, options = {}) {
    const token = await this.getAuthToken(true);
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: { message: response.statusText } }));
      throw new Error(error.error?.message || `API request failed: ${response.status}`);
    }
    
    return response.json();
  },
  
  // Check if dataset exists
  async datasetExists(projectId, datasetId) {
    try {
      await this.apiRequest(
        `${this.API_BASE}/projects/${projectId}/datasets/${datasetId}`
      );
      return true;
    } catch (e) {
      return false;
    }
  },
  
  // Create dataset
  async createDataset(projectId, datasetId) {
    return this.apiRequest(
      `${this.API_BASE}/projects/${projectId}/datasets`,
      {
        method: 'POST',
        body: JSON.stringify({
          datasetReference: {
            projectId,
            datasetId
          },
          location: 'US'
        })
      }
    );
  },
  
  // Check if table exists
  async tableExists(projectId, datasetId, tableId) {
    try {
      await this.apiRequest(
        `${this.API_BASE}/projects/${projectId}/datasets/${datasetId}/tables/${tableId}`
      );
      return true;
    } catch (e) {
      return false;
    }
  },
  
  // Create table with schema
  async createTable(projectId, datasetId, tableId) {
    return this.apiRequest(
      `${this.API_BASE}/projects/${projectId}/datasets/${datasetId}/tables`,
      {
        method: 'POST',
        body: JSON.stringify({
          tableReference: {
            projectId,
            datasetId,
            tableId
          },
          schema: this.TABLE_SCHEMA,
          description: 'Facebook Ad Library scraped ads data'
        })
      }
    );
  },
  
  // Ensure dataset and table exist
  async ensureTableExists(projectId, datasetId, tableId, autoCreate = true) {
    if (!autoCreate) {
      const exists = await this.tableExists(projectId, datasetId, tableId);
      if (!exists) {
        throw new Error(`Table ${projectId}.${datasetId}.${tableId} does not exist`);
      }
      return;
    }
    
    // Check/create dataset
    const datasetExists = await this.datasetExists(projectId, datasetId);
    if (!datasetExists) {
      console.log(`Creating dataset: ${datasetId}`);
      await this.createDataset(projectId, datasetId);
    }
    
    // Check/create table
    const tableExists = await this.tableExists(projectId, datasetId, tableId);
    if (!tableExists) {
      console.log(`Creating table: ${tableId}`);
      await this.createTable(projectId, datasetId, tableId);
    }
  },
  
  // Convert ad data to BigQuery row format
  transformAdToRow(ad, scrapeInfo) {
    return {
      library_id: ad.libraryId || null,
      status: ad.status || null,
      date_start: ad.dateRange?.start || null,
      date_end: ad.dateRange?.end || null,
      platforms: ad.platforms || [],
      has_eu_transparency: ad.hasEuTransparency || false,
      advertiser_name: ad.advertiserName || null,
      ad_copy: ad.adCopy || null,
      media_url: ad.mediaUrl || null,
      media_type: ad.mediaType || null,
      landing_page_url: ad.landingPageUrl || null,
      headline: ad.headline || null,
      cta_text: ad.ctaText || null,
      num_ads_using_creative: ad.numAdsUsingCreative || null,
      scraped_at: ad.scrapedAt ? new Date(ad.scrapedAt).toISOString() : null,
      scrape_page_url: scrapeInfo?.pageUrl || null,
      scrape_advertiser: scrapeInfo?.advertiser || null,
      inserted_at: new Date().toISOString()
    };
  },
  
  // Insert rows using streaming insert API
  async insertRows(projectId, datasetId, tableId, rows) {
    const insertRows = rows.map((row, index) => ({
      insertId: `${Date.now()}_${index}`,
      json: row
    }));
    
    // BigQuery streaming insert has a limit of 10,000 rows per request
    const BATCH_SIZE = 500;
    const batches = [];
    
    for (let i = 0; i < insertRows.length; i += BATCH_SIZE) {
      batches.push(insertRows.slice(i, i + BATCH_SIZE));
    }
    
    const results = {
      successCount: 0,
      errorCount: 0,
      errors: []
    };
    
    for (const batch of batches) {
      try {
        const response = await this.apiRequest(
          `${this.API_BASE}/projects/${projectId}/datasets/${datasetId}/tables/${tableId}/insertAll`,
          {
            method: 'POST',
            body: JSON.stringify({
              kind: 'bigquery#tableDataInsertAllRequest',
              rows: batch
            })
          }
        );
        
        if (response.insertErrors && response.insertErrors.length > 0) {
          results.errorCount += response.insertErrors.length;
          results.errors.push(...response.insertErrors.map(e => e.errors));
        }
        
        results.successCount += batch.length - (response.insertErrors?.length || 0);
      } catch (e) {
        results.errorCount += batch.length;
        results.errors.push({ message: e.message });
      }
    }
    
    return results;
  },
  
  // Export data to BigQuery
  async exportToBigQuery(data, config, onProgress) {
    const { projectId, datasetId, tableId, autoCreate } = config;
    
    if (!projectId || !datasetId || !tableId) {
      throw new Error('Missing BigQuery configuration. Please configure project, dataset, and table.');
    }
    
    if (!data.ads || data.ads.length === 0) {
      throw new Error('No ads data to export');
    }
    
    onProgress?.({ stage: 'auth', message: 'Authenticating with Google...' });
    
    // Verify authentication
    await this.getAuthToken(true);
    
    onProgress?.({ stage: 'setup', message: 'Checking BigQuery table...' });
    
    // Ensure table exists
    await this.ensureTableExists(projectId, datasetId, tableId, autoCreate);
    
    onProgress?.({ stage: 'transform', message: 'Preparing data...' });
    
    // Transform ads to BigQuery row format
    const rows = data.ads.map(ad => this.transformAdToRow(ad, data.scrapeInfo));
    
    onProgress?.({ 
      stage: 'upload', 
      message: `Uploading ${rows.length} rows to BigQuery...`,
      total: rows.length,
      current: 0
    });
    
    // Insert rows
    const results = await this.insertRows(projectId, datasetId, tableId, rows);
    
    onProgress?.({ 
      stage: 'complete', 
      message: `Export complete! ${results.successCount} rows inserted.`,
      total: rows.length,
      current: rows.length
    });
    
    return results;
  },
  
  // List user's BigQuery projects
  async listProjects() {
    try {
      const response = await this.apiRequest(
        'https://cloudresourcemanager.googleapis.com/v1/projects'
      );
      return response.projects || [];
    } catch (e) {
      console.warn('Could not list projects:', e);
      return [];
    }
  }
};

// Export for use in popup.js
window.BigQueryClient = BigQueryClient;
