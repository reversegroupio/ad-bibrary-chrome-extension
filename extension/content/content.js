// Facebook Ad Library Scraper - Content Script
// Extracts ad data from the DOM without clicking any elements

(function() {
  'use strict';

  // State management
  let isScrapingActive = false;
  let collectedAds = new Map(); // Use Map to dedupe by libraryId
  let scrollCount = 0;
  let lastScrollTime = 0;

  // Scroll configuration for human-like behavior
  const scrollConfig = {
    baseDelay: 2000,           // 2s base between scrolls
    randomVariation: 1500,     // 0-1.5s random added delay
    longPauseChance: 0.15,     // 15% chance of 5-10s pause
    longPauseMin: 5000,        // Minimum long pause duration
    longPauseMax: 10000,       // Maximum long pause duration
    scrollAmount: 400,         // Base pixels per scroll
    scrollVariation: 200,      // Random variation in scroll distance
  };

  // Utility functions
  function randomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function getScrollDelay() {
    // Check for long pause
    if (Math.random() < scrollConfig.longPauseChance) {
      return randomDelay(scrollConfig.longPauseMin, scrollConfig.longPauseMax);
    }
    // Normal delay with variation
    return scrollConfig.baseDelay + randomDelay(0, scrollConfig.randomVariation);
  }

  function getScrollAmount() {
    return scrollConfig.scrollAmount + randomDelay(-scrollConfig.scrollVariation, scrollConfig.scrollVariation);
  }

  // DOM Parsing Functions
  function parseAdCard(cardElement) {
    try {
      const ad = {
        libraryId: null,
        status: null,
        dateRange: { start: null, end: null },
        platforms: [],
        hasEuTransparency: false,
        advertiserName: null,
        adCopy: null,
        mediaUrl: null,
        mediaType: null,
        landingPageUrl: null,
        headline: null,
        ctaText: null,
        numAdsUsingCreative: null,
        scrapedAt: new Date().toISOString()
      };

      // Get all text content for searching
      const cardText = cardElement.textContent || '';

      // Extract Library ID - look for pattern "Library ID: XXXXXXXXX"
      const libraryIdMatch = cardText.match(/Library ID:\s*(\d+)/);
      if (libraryIdMatch) {
        ad.libraryId = libraryIdMatch[1];
      }

      // Extract Status (Active/Inactive) - usually in a badge/span near the top
      if (cardText.includes('Active') && !cardText.includes('Inactive')) {
        ad.status = 'Active';
      } else if (cardText.includes('Inactive')) {
        ad.status = 'Inactive';
      }

      // Extract Date Range - pattern like "Jun 17, 2025 - Jul 23, 2025" or "Started running on..."
      const dateRangeMatch = cardText.match(/([A-Z][a-z]{2}\s+\d{1,2},\s+\d{4})\s*-\s*([A-Z][a-z]{2}\s+\d{1,2},\s+\d{4})/);
      if (dateRangeMatch) {
        ad.dateRange.start = dateRangeMatch[1];
        ad.dateRange.end = dateRangeMatch[2];
      } else {
        // Try to find "Started running on" pattern
        const startedMatch = cardText.match(/Started running on\s+([A-Z][a-z]{2}\s+\d{1,2},\s+\d{4})/);
        if (startedMatch) {
          ad.dateRange.start = startedMatch[1];
        }
      }

      // Extract Platforms - look for platform icon containers
      // Facebook uses aria-labels or specific image patterns
      const platformsText = cardText.toLowerCase();
      const platformPatterns = [
        { name: 'facebook', patterns: ['facebook', 'fb'] },
        { name: 'instagram', patterns: ['instagram'] },
        { name: 'messenger', patterns: ['messenger'] },
        { name: 'audience_network', patterns: ['audience network'] },
        { name: 'threads', patterns: ['threads'] }
      ];

      // Check for "Platforms" section text
      if (cardText.includes('Platforms')) {
        const platformsSection = cardElement.querySelector('[aria-label*="platform" i]') || 
                                  cardElement.querySelector('div:has(> img)');
        if (platformsSection) {
          const imgs = platformsSection.querySelectorAll('img');
          imgs.forEach(img => {
            const alt = (img.alt || img.getAttribute('aria-label') || '').toLowerCase();
            const src = (img.src || '').toLowerCase();
            platformPatterns.forEach(p => {
              if (p.patterns.some(pattern => alt.includes(pattern) || src.includes(pattern))) {
                if (!ad.platforms.includes(p.name)) {
                  ad.platforms.push(p.name);
                }
              }
            });
          });
        }
      }

      // Check EU Transparency
      ad.hasEuTransparency = cardText.includes('EU transparency');

      // Extract Advertiser Name - usually a link with the page name
      // Look for the first prominent link that's not a navigation element
      const advertiserLinks = cardElement.querySelectorAll('a[href*="facebook.com"]');
      for (const link of advertiserLinks) {
        const text = link.textContent.trim();
        // Skip navigation links and empty links
        if (text && text.length > 0 && text.length < 100 && 
            !text.includes('See ad details') && !text.includes('Learn more') &&
            !link.href.includes('/ads/library/?')) {
          ad.advertiserName = text;
          break;
        }
      }

      // Extract Ad Copy - usually the longest text block in the card
      // Look for the main content area, excluding buttons and links
      const textBlocks = [];
      const walker = document.createTreeWalker(
        cardElement,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );

      let node;
      while (node = walker.nextNode()) {
        const text = node.textContent.trim();
        // Filter out short text and navigation/button text
        if (text.length > 50 && 
            !text.includes('Library ID') && 
            !text.includes('See ad details') &&
            !text.includes('EU transparency')) {
          textBlocks.push(text);
        }
      }

      if (textBlocks.length > 0) {
        // Get the longest text block as the ad copy
        ad.adCopy = textBlocks.reduce((a, b) => a.length > b.length ? a : b);
      }

      // Extract Media URL
      // Look for images first
      const images = cardElement.querySelectorAll('img');
      for (const img of images) {
        const src = img.src || img.dataset.src || '';
        // Skip small images (likely icons) and profile pictures
        if (src && img.width > 100 && !src.includes('profile') && !src.includes('icon')) {
          ad.mediaUrl = src;
          ad.mediaType = 'image';
          break;
        }
      }

      // Check for video if no suitable image found
      if (!ad.mediaUrl) {
        const videos = cardElement.querySelectorAll('video');
        if (videos.length > 0) {
          const video = videos[0];
          ad.mediaUrl = video.poster || video.src || video.querySelector('source')?.src;
          ad.mediaType = 'video';
        }
      }

      // Extract Landing Page URL from Facebook redirect links
      // Facebook wraps external URLs in redirect links like: 
      // https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fpath%3Fparam%3Dvalue&h=...
      // We need to extract and decode the 'u' parameter to get the actual landing page URL
      const allLinks = cardElement.querySelectorAll('a[href]');
      for (const link of allLinks) {
        const href = link.href || '';
        
        // Check for Facebook redirect links (l.facebook.com/l.php?u=...)
        if (href.includes('l.facebook.com/l.php')) {
          try {
            const url = new URL(href);
            const encodedDestination = url.searchParams.get('u');
            if (encodedDestination) {
              // The 'u' parameter contains the URL-encoded destination
              // decodeURIComponent will decode it to the actual URL
              ad.landingPageUrl = decodeURIComponent(encodedDestination);
              break;
            }
          } catch (e) {
            // Invalid URL, continue to next link
          }
        }
        // Also check for direct external links (not wrapped in redirect)
        else if (href && 
            !href.includes('facebook.com') && 
            !href.includes('fb.com') &&
            !href.startsWith('javascript:') &&
            href.startsWith('http')) {
          ad.landingPageUrl = href;
          break;
        }
      }

      // Extract Headline - look for bold/emphasized text or specific containers
      // Headlines are usually shorter than ad copy but distinct
      const headlineElements = cardElement.querySelectorAll('span[style*="font-weight"], strong, b');
      for (const el of headlineElements) {
        const text = el.textContent.trim();
        if (text.length > 10 && text.length < 100 && 
            text !== ad.advertiserName && 
            !text.includes('Sponsored')) {
          ad.headline = text;
          break;
        }
      }

      // Extract CTA Text - look for button-like elements
      const ctaPatterns = ['Learn more', 'Shop now', 'Sign up', 'Get offer', 'Book now', 
                          'Download', 'Contact us', 'Apply now', 'Subscribe', 'Get quote'];
      for (const pattern of ctaPatterns) {
        if (cardText.includes(pattern)) {
          ad.ctaText = pattern;
          break;
        }
      }

      // Extract "X ads use this creative" count
      const creativeCountMatch = cardText.match(/(\d+)\s+ads?\s+use\s+this\s+creative/i);
      if (creativeCountMatch) {
        ad.numAdsUsingCreative = parseInt(creativeCountMatch[1], 10);
      }

      return ad;
    } catch (error) {
      console.error('Error parsing ad card:', error);
      return null;
    }
  }

  function findAdCards() {
    // Facebook Ad Library uses various container structures
    // We need to find the ad card containers
    
    // Strategy 1: Look for containers with "Library ID" text
    const allElements = document.querySelectorAll('div');
    const adCards = [];
    
    for (const el of allElements) {
      const text = el.textContent || '';
      // Ad cards contain "Library ID:" and are substantial in size
      if (text.includes('Library ID:') && 
          el.offsetHeight > 200 && 
          el.offsetWidth > 300) {
        // Check if this is a direct card container (not a parent of multiple cards)
        const libraryIdCount = (text.match(/Library ID:/g) || []).length;
        if (libraryIdCount === 1) {
          adCards.push(el);
        }
      }
    }
    
    return adCards;
  }

  function collectVisibleAds() {
    const adCards = findAdCards();
    let newAdsCount = 0;

    for (const card of adCards) {
      const ad = parseAdCard(card);
      if (ad && ad.libraryId && !collectedAds.has(ad.libraryId)) {
        collectedAds.set(ad.libraryId, ad);
        newAdsCount++;
      }
    }

    return newAdsCount;
  }

  async function performScroll() {
    const scrollAmount = getScrollAmount();
    window.scrollBy({
      top: scrollAmount,
      behavior: 'smooth'
    });
    scrollCount++;
    lastScrollTime = Date.now();
  }

  function isAtBottom() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    
    // Consider at bottom if within 100px of the end
    return scrollTop + clientHeight >= scrollHeight - 100;
  }

  function checkForMoreContent() {
    // Look for "See more" button or loading indicator
    const seeMoreButton = document.querySelector('button[aria-label*="See more"], button:contains("See more")');
    const loadingIndicator = document.querySelector('[role="progressbar"], [aria-busy="true"]');
    
    return seeMoreButton || loadingIndicator;
  }

  async function scrapingLoop() {
    console.log('[Ad Library Scraper] Starting scraping loop...');
    
    while (isScrapingActive) {
      // Collect visible ads
      const newAds = collectVisibleAds();
      console.log(`[Ad Library Scraper] Collected ${newAds} new ads. Total: ${collectedAds.size}`);

      // Send progress update
      chrome.runtime.sendMessage({
        type: 'PROGRESS_UPDATE',
        data: {
          adsCollected: collectedAds.size,
          scrollCount: scrollCount,
          isActive: isScrapingActive
        }
      });

      // Check if we're at the bottom
      if (isAtBottom()) {
        // Try to trigger more content loading by clicking "See more" if exists
        const seeMoreButton = Array.from(document.querySelectorAll('button')).find(
          btn => btn.textContent.trim().toLowerCase().includes('see more')
        );
        
        if (seeMoreButton) {
          console.log('[Ad Library Scraper] Clicking "See more" button...');
          seeMoreButton.click();
          await sleep(2000); // Wait for content to load
        } else {
          // No more content to load
          console.log('[Ad Library Scraper] Reached end of content.');
          
          // Wait a bit and check again (content might still be loading)
          await sleep(3000);
          if (isAtBottom() && !checkForMoreContent()) {
            console.log('[Ad Library Scraper] Scraping complete - no more content.');
            stopScraping();
            break;
          }
        }
      }

      // Perform human-like scroll
      if (isScrapingActive) {
        await performScroll();
        
        // Wait with random delay
        const delay = getScrollDelay();
        console.log(`[Ad Library Scraper] Waiting ${delay}ms before next scroll...`);
        await sleep(delay);
      }
    }

    // Final collection
    collectVisibleAds();
    
    // Send final data
    chrome.runtime.sendMessage({
      type: 'SCRAPING_COMPLETE',
      data: {
        adsCollected: collectedAds.size,
        scrollCount: scrollCount,
        ads: Array.from(collectedAds.values())
      }
    });
  }

  function startScraping() {
    if (isScrapingActive) {
      console.log('[Ad Library Scraper] Already scraping...');
      return;
    }

    console.log('[Ad Library Scraper] Starting scraper...');
    isScrapingActive = true;
    collectedAds.clear();
    scrollCount = 0;

    // Initial collection before scrolling
    const initialAds = collectVisibleAds();
    console.log(`[Ad Library Scraper] Initial collection: ${initialAds} ads`);

    // Start the scraping loop
    scrapingLoop();
  }

  function stopScraping() {
    console.log('[Ad Library Scraper] Stopping scraper...');
    isScrapingActive = false;
  }

  function getCollectedData() {
    return {
      scrapeInfo: {
        pageUrl: window.location.href,
        advertiser: document.querySelector('h1')?.textContent || 'Unknown',
        totalAds: collectedAds.size,
        scrapedAt: new Date().toISOString()
      },
      ads: Array.from(collectedAds.values())
    };
  }

  // Message listener
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('[Ad Library Scraper] Received message:', message);

    switch (message.type) {
      case 'START_SCRAPING':
        startScraping();
        sendResponse({ success: true, message: 'Scraping started' });
        break;

      case 'STOP_SCRAPING':
        stopScraping();
        sendResponse({ success: true, message: 'Scraping stopped' });
        break;

      case 'GET_STATUS':
        sendResponse({
          isActive: isScrapingActive,
          adsCollected: collectedAds.size,
          scrollCount: scrollCount
        });
        break;

      case 'GET_DATA':
        sendResponse(getCollectedData());
        break;

      default:
        sendResponse({ error: 'Unknown message type' });
    }

    return true; // Keep channel open for async response
  });

  // Notify that content script is loaded
  console.log('[Ad Library Scraper] Content script loaded on:', window.location.href);
})();
