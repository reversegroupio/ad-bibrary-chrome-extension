# BigQuery Export Setup Guide

This guide explains how to configure the BigQuery export functionality for the Facebook Ad Library Scraper extension.

## Prerequisites

1. A Google Cloud Platform (GCP) account
2. A GCP project with billing enabled
3. BigQuery API enabled in your project

## Step 1: Enable BigQuery API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select or create a project
3. Navigate to **APIs & Services** > **Library**
4. Search for "BigQuery API" and enable it

## Step 2: Create OAuth 2.0 Credentials

1. In Google Cloud Console, go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth client ID**
3. If prompted, configure the OAuth consent screen:
   - User Type: External (or Internal for Workspace users)
   - App name: "Ad Library Scraper"
   - Add your email as support email and developer contact
   - Add the scope: `https://www.googleapis.com/auth/bigquery`
4. Create OAuth client ID:
   - Application type: **Chrome Extension**
   - Name: "Ad Library Scraper"
   - Item ID: Your extension's ID (see Step 3 to get this)

## Step 3: Get Your Extension ID

### Option A: Load the extension first
1. Go to `chrome://extensions/`
2. Enable "Developer mode" (top right)
3. Click "Load unpacked" and select the `extension` folder
4. Copy the extension ID shown (e.g., `abcdefghijklmnopqrstuvwxyz123456`)

### Option B: Generate a consistent key
To get a consistent extension ID during development:

1. Generate a key using this command:
```bash
openssl genrsa 2048 | openssl pkcs8 -topk8 -nocrypt -out key.pem
openssl rsa -in key.pem -pubout -outform DER | openssl base64 -A
```

2. Copy the base64 output and add it to `manifest.json` as the `key` field

## Step 4: Update manifest.json
[
  {
    "cardIndex": 0,
    "totalLinks": 210,
    "externalLinks": [
      {
        "href": "https://metastatus.com/ads-transparency",
        "text": "System status",
        "className": "x1i10hfl x1qjc9v5 xjqpnuy xc5r6h4 xqeqjp1 x1phubyo x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xdl72j9 x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak x2lwn1j xeuugli x16tdsg8 xggy1nq x1ja2u2z x1n2onr6 x1q0g3np xxymvpz x1ejq31n x18oe1m7 x1sy0etr xstzfhl x87ps6o x1t137rt xlh3980 xvmahel x1hl2dhg x1lku1pv x78zum5 x1iyjqo2 xs83m0k x1i5p2am x1whfx0g xr2y4jy x1ihp6rs xo1l8bm x108nfp6 x1v911su x1y1aw1k xwib8y2 xf7dkkf xv54qhq"
      }
    ],
    "redirectLinks": [
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHsVURnbOrV3nNQ3pNlQNKEkUz0wAepVVLW1kA4esOEjEGM0jvJH2V7KSgzhC_aem_G6MKgyjny9eZzRZ_cFN3Rg&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHr-dl5MnM_AsdceELTyaNsbIDSnkxq6CbaBF9p5t7-Wc5XX4QbSVNz_A6Yj8_aem_ZsER4WC5DsbimnRdTubwNg&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHieK3gLKXaEZzZJ6LJYWVdaf9mVoEBEhbKjAhd2Cb2DzwCPe0zTnzt04k4IJ_aem_Ta6qIKUYC28n_aG0RIHBNQ&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHsVURnbOrV3nNQ3pNlQNKEkUz0wAepVVLW1kA4esOEjEGM0jvJH2V7KSgzhC_aem_G6MKgyjny9eZzRZ_cFN3Rg&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHr-dl5MnM_AsdceELTyaNsbIDSnkxq6CbaBF9p5t7-Wc5XX4QbSVNz_A6Yj8_aem_ZsER4WC5DsbimnRdTubwNg&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHotNv_WGuqHP8OY2V2c56Hkp1mw6Cpq7F7FOyYgoohlBPZLrjZs7_4hlbmeV_aem_OHc-hgI71T2THO1uILYk3Q&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-asian%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHqjMRsJZ1psNf1iYgB1JXWV_FKmfxzBC7VtYgJRUfg6WFoULxRvovlqct0xC_aem_tHhpab2vPejT86hMziq7xA&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTH2 Spots Left for New Year Asian Fasting!Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHoj1PHdSh8AXwKdzO0r_U4NVifAxwHlRuxjMUqpT1wYErFBVE8XfXpaHOQHg_aem_Gj1TLHNsciWhrl6Q_M6sOA&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Learn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-asian%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHotNv_WGuqHP8OY2V2c56Hkp1mw6Cpq7F7FOyYgoohlBPZLrjZs7_4hlbmeV_aem_OHc-hgI71T2THO1uILYk3Q&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-asian%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHr-dl5MnM_AsdceELTyaNsbIDSnkxq6CbaBF9p5t7-Wc5XX4QbSVNz_A6Yj8_aem_ZsER4WC5DsbimnRdTubwNg&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTH2 Spots Left for New Year Asian Fasting!Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHsVURnbOrV3nNQ3pNlQNKEkUz0wAepVVLW1kA4esOEjEGM0jvJH2V7KSgzhC_aem_G6MKgyjny9eZzRZ_cFN3Rg&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHieK3gLKXaEZzZJ6LJYWVdaf9mVoEBEhbKjAhd2Cb2DzwCPe0zTnzt04k4IJ_aem_Ta6qIKUYC28n_aG0RIHBNQ&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHuHpg23Rl_IiFT9oGQ-NC-E3YvbS1RLbcUkBpT5KMcCFJBp3xYPGJlPp0y3M_aem_p68XcF7vyVDRH_V8UXr8PQ&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-asian%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHieK3gLKXaEZzZJ6LJYWVdaf9mVoEBEhbKjAhd2Cb2DzwCPe0zTnzt04k4IJ_aem_Ta6qIKUYC28n_aG0RIHBNQ&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTH2 Spots Left for New Year Asian Fasting!Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHieK3gLKXaEZzZJ6LJYWVdaf9mVoEBEhbKjAhd2Cb2DzwCPe0zTnzt04k4IJ_aem_Ta6qIKUYC28n_aG0RIHBNQ&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%2F%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHuHpg23Rl_IiFT9oGQ-NC-E3YvbS1RLbcUkBpT5KMcCFJBp3xYPGJlPp0y3M_aem_p68XcF7vyVDRH_V8UXr8PQ&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHqjMRsJZ1psNf1iYgB1JXWV_FKmfxzBC7VtYgJRUfg6WFoULxRvovlqct0xC_aem_tHhpab2vPejT86hMziq7xA&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHsVURnbOrV3nNQ3pNlQNKEkUz0wAepVVLW1kA4esOEjEGM0jvJH2V7KSgzhC_aem_G6MKgyjny9eZzRZ_cFN3Rg&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHqjMRsJZ1psNf1iYgB1JXWV_FKmfxzBC7VtYgJRUfg6WFoULxRvovlqct0xC_aem_tHhpab2vPejT86hMziq7xA&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Learn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHqjMRsJZ1psNf1iYgB1JXWV_FKmfxzBC7VtYgJRUfg6WFoULxRvovlqct0xC_aem_tHhpab2vPejT86hMziq7xA&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-asian%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHoj1PHdSh8AXwKdzO0r_U4NVifAxwHlRuxjMUqpT1wYErFBVE8XfXpaHOQHg_aem_Gj1TLHNsciWhrl6Q_M6sOA&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTH2 Spots Left for New Year Asian Fasting!Learn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHr-dl5MnM_AsdceELTyaNsbIDSnkxq6CbaBF9p5t7-Wc5XX4QbSVNz_A6Yj8_aem_ZsER4WC5DsbimnRdTubwNg&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-asian%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHqjMRsJZ1psNf1iYgB1JXWV_FKmfxzBC7VtYgJRUfg6WFoULxRvovlqct0xC_aem_tHhpab2vPejT86hMziq7xA&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTH2 Spots Left for New Year Asian Fasting!Learn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHotNv_WGuqHP8OY2V2c56Hkp1mw6Cpq7F7FOyYgoohlBPZLrjZs7_4hlbmeV_aem_OHc-hgI71T2THO1uILYk3Q&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHuHpg23Rl_IiFT9oGQ-NC-E3YvbS1RLbcUkBpT5KMcCFJBp3xYPGJlPp0y3M_aem_p68XcF7vyVDRH_V8UXr8PQ&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-asian%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHieK3gLKXaEZzZJ6LJYWVdaf9mVoEBEhbKjAhd2Cb2DzwCPe0zTnzt04k4IJ_aem_Ta6qIKUYC28n_aG0RIHBNQ&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "REVERSE.HEALTHSimple Asian Fasting Plan for 2026👉 Discover your ideal fasting timing in minutes, ba",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHotNv_WGuqHP8OY2V2c56Hkp1mw6Cpq7F7FOyYgoohlBPZLrjZs7_4hlbmeV_aem_OHc-hgI71T2THO1uILYk3Q&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHotNv_WGuqHP8OY2V2c56Hkp1mw6Cpq7F7FOyYgoohlBPZLrjZs7_4hlbmeV_aem_OHc-hgI71T2THO1uILYk3Q&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHotNv_WGuqHP8OY2V2c56Hkp1mw6Cpq7F7FOyYgoohlBPZLrjZs7_4hlbmeV_aem_OHc-hgI71T2THO1uILYk3Q&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHpn2Dq1Py394BVtODdsFHLoBwABRNULxTRRiVD-ZqswB3jkkM9mg4K14OIj5_aem_-fLyrcHiaU6zoEo0_EDaeQ&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHotNv_WGuqHP8OY2V2c56Hkp1mw6Cpq7F7FOyYgoohlBPZLrjZs7_4hlbmeV_aem_OHc-hgI71T2THO1uILYk3Q&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHgVOJc_wKxi7uI1Kvi5hDkm4RRhktKuRTVlrMWtR6PvMOVmxmtpHyENMBdxv_aem_mwSzsYffPOT7lf_bskybqg&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHpn2Dq1Py394BVtODdsFHLoBwABRNULxTRRiVD-ZqswB3jkkM9mg4K14OIj5_aem_-fLyrcHiaU6zoEo0_EDaeQ&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-asian%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHuHpg23Rl_IiFT9oGQ-NC-E3YvbS1RLbcUkBpT5KMcCFJBp3xYPGJlPp0y3M_aem_p68XcF7vyVDRH_V8UXr8PQ&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHieK3gLKXaEZzZJ6LJYWVdaf9mVoEBEhbKjAhd2Cb2DzwCPe0zTnzt04k4IJ_aem_Ta6qIKUYC28n_aG0RIHBNQ&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHoj1PHdSh8AXwKdzO0r_U4NVifAxwHlRuxjMUqpT1wYErFBVE8XfXpaHOQHg_aem_Gj1TLHNsciWhrl6Q_M6sOA&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHotNv_WGuqHP8OY2V2c56Hkp1mw6Cpq7F7FOyYgoohlBPZLrjZs7_4hlbmeV_aem_OHc-hgI71T2THO1uILYk3Q&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHrDzvzhhQXpJNFlC_Yo1mwPuTSLYys401nV-Ltoncei3H53_z1PXap6fPAd6_aem__NpMuxsWB_R-VQHh5aRK6w&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHpn2Dq1Py394BVtODdsFHLoBwABRNULxTRRiVD-ZqswB3jkkM9mg4K14OIj5_aem_-fLyrcHiaU6zoEo0_EDaeQ&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHsVURnbOrV3nNQ3pNlQNKEkUz0wAepVVLW1kA4esOEjEGM0jvJH2V7KSgzhC_aem_G6MKgyjny9eZzRZ_cFN3Rg&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHieK3gLKXaEZzZJ6LJYWVdaf9mVoEBEhbKjAhd2Cb2DzwCPe0zTnzt04k4IJ_aem_Ta6qIKUYC28n_aG0RIHBNQ&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHgVOJc_wKxi7uI1Kvi5hDkm4RRhktKuRTVlrMWtR6PvMOVmxmtpHyENMBdxv_aem_mwSzsYffPOT7lf_bskybqg&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHoj1PHdSh8AXwKdzO0r_U4NVifAxwHlRuxjMUqpT1wYErFBVE8XfXpaHOQHg_aem_Gj1TLHNsciWhrl6Q_M6sOA&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHsVURnbOrV3nNQ3pNlQNKEkUz0wAepVVLW1kA4esOEjEGM0jvJH2V7KSgzhC_aem_G6MKgyjny9eZzRZ_cFN3Rg&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHr-dl5MnM_AsdceELTyaNsbIDSnkxq6CbaBF9p5t7-Wc5XX4QbSVNz_A6Yj8_aem_ZsER4WC5DsbimnRdTubwNg&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHuHpg23Rl_IiFT9oGQ-NC-E3YvbS1RLbcUkBpT5KMcCFJBp3xYPGJlPp0y3M_aem_p68XcF7vyVDRH_V8UXr8PQ&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHuHpg23Rl_IiFT9oGQ-NC-E3YvbS1RLbcUkBpT5KMcCFJBp3xYPGJlPp0y3M_aem_p68XcF7vyVDRH_V8UXr8PQ&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHsVURnbOrV3nNQ3pNlQNKEkUz0wAepVVLW1kA4esOEjEGM0jvJH2V7KSgzhC_aem_G6MKgyjny9eZzRZ_cFN3Rg&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHieK3gLKXaEZzZJ6LJYWVdaf9mVoEBEhbKjAhd2Cb2DzwCPe0zTnzt04k4IJ_aem_Ta6qIKUYC28n_aG0RIHBNQ&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Learn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHuHpg23Rl_IiFT9oGQ-NC-E3YvbS1RLbcUkBpT5KMcCFJBp3xYPGJlPp0y3M_aem_p68XcF7vyVDRH_V8UXr8PQ&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHotNv_WGuqHP8OY2V2c56Hkp1mw6Cpq7F7FOyYgoohlBPZLrjZs7_4hlbmeV_aem_OHc-hgI71T2THO1uILYk3Q&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHgVOJc_wKxi7uI1Kvi5hDkm4RRhktKuRTVlrMWtR6PvMOVmxmtpHyENMBdxv_aem_mwSzsYffPOT7lf_bskybqg&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHotNv_WGuqHP8OY2V2c56Hkp1mw6Cpq7F7FOyYgoohlBPZLrjZs7_4hlbmeV_aem_OHc-hgI71T2THO1uILYk3Q&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHr-dl5MnM_AsdceELTyaNsbIDSnkxq6CbaBF9p5t7-Wc5XX4QbSVNz_A6Yj8_aem_ZsER4WC5DsbimnRdTubwNg&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Learn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHgVOJc_wKxi7uI1Kvi5hDkm4RRhktKuRTVlrMWtR6PvMOVmxmtpHyENMBdxv_aem_mwSzsYffPOT7lf_bskybqg&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHrDzvzhhQXpJNFlC_Yo1mwPuTSLYys401nV-Ltoncei3H53_z1PXap6fPAd6_aem__NpMuxsWB_R-VQHh5aRK6w&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHieK3gLKXaEZzZJ6LJYWVdaf9mVoEBEhbKjAhd2Cb2DzwCPe0zTnzt04k4IJ_aem_Ta6qIKUYC28n_aG0RIHBNQ&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHqjMRsJZ1psNf1iYgB1JXWV_FKmfxzBC7VtYgJRUfg6WFoULxRvovlqct0xC_aem_tHhpab2vPejT86hMziq7xA&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Learn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHqjMRsJZ1psNf1iYgB1JXWV_FKmfxzBC7VtYgJRUfg6WFoULxRvovlqct0xC_aem_tHhpab2vPejT86hMziq7xA&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%3Fregion%3Djoin%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHoj1PHdSh8AXwKdzO0r_U4NVifAxwHlRuxjMUqpT1wYErFBVE8XfXpaHOQHg_aem_Gj1TLHNsciWhrl6Q_M6sOA&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Learn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-asian%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHr-dl5MnM_AsdceELTyaNsbIDSnkxq6CbaBF9p5t7-Wc5XX4QbSVNz_A6Yj8_aem_ZsER4WC5DsbimnRdTubwNg&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTH2 Spots Left for New Year Asian Fasting!Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%2F%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHrDzvzhhQXpJNFlC_Yo1mwPuTSLYys401nV-Ltoncei3H53_z1PXap6fPAd6_aem__NpMuxsWB_R-VQHh5aRK6w&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-asian%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHoj1PHdSh8AXwKdzO0r_U4NVifAxwHlRuxjMUqpT1wYErFBVE8XfXpaHOQHg_aem_Gj1TLHNsciWhrl6Q_M6sOA&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTH2 Spots Left for New Year Asian Fasting!Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-asian%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHsVURnbOrV3nNQ3pNlQNKEkUz0wAepVVLW1kA4esOEjEGM0jvJH2V7KSgzhC_aem_G6MKgyjny9eZzRZ_cFN3Rg&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTH2 Spots Left for New Year Asian Fasting!Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%2F%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHotNv_WGuqHP8OY2V2c56Hkp1mw6Cpq7F7FOyYgoohlBPZLrjZs7_4hlbmeV_aem_OHc-hgI71T2THO1uILYk3Q&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-asian%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHotNv_WGuqHP8OY2V2c56Hkp1mw6Cpq7F7FOyYgoohlBPZLrjZs7_4hlbmeV_aem_OHc-hgI71T2THO1uILYk3Q&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-asian%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHsVURnbOrV3nNQ3pNlQNKEkUz0wAepVVLW1kA4esOEjEGM0jvJH2V7KSgzhC_aem_G6MKgyjny9eZzRZ_cFN3Rg&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTH2 Spots Left for New Year Asian Fasting!Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-asian%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHrDzvzhhQXpJNFlC_Yo1mwPuTSLYys401nV-Ltoncei3H53_z1PXap6fPAd6_aem__NpMuxsWB_R-VQHh5aRK6w&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTH2 Spots Left for New Year Asian Fasting!Learn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%2F%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHuHpg23Rl_IiFT9oGQ-NC-E3YvbS1RLbcUkBpT5KMcCFJBp3xYPGJlPp0y3M_aem_p68XcF7vyVDRH_V8UXr8PQ&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%2F%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHuHpg23Rl_IiFT9oGQ-NC-E3YvbS1RLbcUkBpT5KMcCFJBp3xYPGJlPp0y3M_aem_p68XcF7vyVDRH_V8UXr8PQ&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%2F%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHgVOJc_wKxi7uI1Kvi5hDkm4RRhktKuRTVlrMWtR6PvMOVmxmtpHyENMBdxv_aem_mwSzsYffPOT7lf_bskybqg&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "What's stopping you?Learn More",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%2F%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHgVOJc_wKxi7uI1Kvi5hDkm4RRhktKuRTVlrMWtR6PvMOVmxmtpHyENMBdxv_aem_mwSzsYffPOT7lf_bskybqg&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%2F%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHr-dl5MnM_AsdceELTyaNsbIDSnkxq6CbaBF9p5t7-Wc5XX4QbSVNz_A6Yj8_aem_ZsER4WC5DsbimnRdTubwNg&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-asian%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHpn2Dq1Py394BVtODdsFHLoBwABRNULxTRRiVD-ZqswB3jkkM9mg4K14OIj5_aem_-fLyrcHiaU6zoEo0_EDaeQ&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%2F%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHqjMRsJZ1psNf1iYgB1JXWV_FKmfxzBC7VtYgJRUfg6WFoULxRvovlqct0xC_aem_tHhpab2vPejT86hMziq7xA&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-asian%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHoj1PHdSh8AXwKdzO0r_U4NVifAxwHlRuxjMUqpT1wYErFBVE8XfXpaHOQHg_aem_Gj1TLHNsciWhrl6Q_M6sOA&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "REVERSE.HEALTHSimple Asian Fasting Plan for 2026👉 Discover your ideal fasting timing in minutes, ba",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-asian%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHuHpg23Rl_IiFT9oGQ-NC-E3YvbS1RLbcUkBpT5KMcCFJBp3xYPGJlPp0y3M_aem_p68XcF7vyVDRH_V8UXr8PQ&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTH2 Spots Left for New Year Asian Fasting!Learn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%2F%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHuHpg23Rl_IiFT9oGQ-NC-E3YvbS1RLbcUkBpT5KMcCFJBp3xYPGJlPp0y3M_aem_p68XcF7vyVDRH_V8UXr8PQ&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%2F%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHoj1PHdSh8AXwKdzO0r_U4NVifAxwHlRuxjMUqpT1wYErFBVE8XfXpaHOQHg_aem_Gj1TLHNsciWhrl6Q_M6sOA&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%2F%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHqjMRsJZ1psNf1iYgB1JXWV_FKmfxzBC7VtYgJRUfg6WFoULxRvovlqct0xC_aem_tHhpab2vPejT86hMziq7xA&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%2F%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHoj1PHdSh8AXwKdzO0r_U4NVifAxwHlRuxjMUqpT1wYErFBVE8XfXpaHOQHg_aem_Gj1TLHNsciWhrl6Q_M6sOA&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "What's stopping you?Learn More",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%2F%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHuHpg23Rl_IiFT9oGQ-NC-E3YvbS1RLbcUkBpT5KMcCFJBp3xYPGJlPp0y3M_aem_p68XcF7vyVDRH_V8UXr8PQ&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%2F%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHoj1PHdSh8AXwKdzO0r_U4NVifAxwHlRuxjMUqpT1wYErFBVE8XfXpaHOQHg_aem_Gj1TLHNsciWhrl6Q_M6sOA&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%2F%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHotNv_WGuqHP8OY2V2c56Hkp1mw6Cpq7F7FOyYgoohlBPZLrjZs7_4hlbmeV_aem_OHc-hgI71T2THO1uILYk3Q&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%2F%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHoj1PHdSh8AXwKdzO0r_U4NVifAxwHlRuxjMUqpT1wYErFBVE8XfXpaHOQHg_aem_Gj1TLHNsciWhrl6Q_M6sOA&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%2F%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHuHpg23Rl_IiFT9oGQ-NC-E3YvbS1RLbcUkBpT5KMcCFJBp3xYPGJlPp0y3M_aem_p68XcF7vyVDRH_V8UXr8PQ&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "What's stopping you?Learn More",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%2F%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHuHpg23Rl_IiFT9oGQ-NC-E3YvbS1RLbcUkBpT5KMcCFJBp3xYPGJlPp0y3M_aem_p68XcF7vyVDRH_V8UXr8PQ&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%2F%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHotNv_WGuqHP8OY2V2c56Hkp1mw6Cpq7F7FOyYgoohlBPZLrjZs7_4hlbmeV_aem_OHc-hgI71T2THO1uILYk3Q&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-asian%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHuHpg23Rl_IiFT9oGQ-NC-E3YvbS1RLbcUkBpT5KMcCFJBp3xYPGJlPp0y3M_aem_p68XcF7vyVDRH_V8UXr8PQ&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "REVERSE.HEALTHSimple Asian Fasting Plan for 2026👉 Discover your ideal fasting timing in minutes, ba",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%2F%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHr-dl5MnM_AsdceELTyaNsbIDSnkxq6CbaBF9p5t7-Wc5XX4QbSVNz_A6Yj8_aem_ZsER4WC5DsbimnRdTubwNg&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%2F%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHsVURnbOrV3nNQ3pNlQNKEkUz0wAepVVLW1kA4esOEjEGM0jvJH2V7KSgzhC_aem_G6MKgyjny9eZzRZ_cFN3Rg&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%2F%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHrDzvzhhQXpJNFlC_Yo1mwPuTSLYys401nV-Ltoncei3H53_z1PXap6fPAd6_aem__NpMuxsWB_R-VQHh5aRK6w&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "TOUR.REVERSE.HEALTHWhat's stopping you?Reverse HealthLearn more",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%2F%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHsVURnbOrV3nNQ3pNlQNKEkUz0wAepVVLW1kA4esOEjEGM0jvJH2V7KSgzhC_aem_G6MKgyjny9eZzRZ_cFN3Rg&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "What's stopping you?Learn More",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      },
      {
        "href": "https://l.facebook.com/l.php?u=https%3A%2F%2Ftour.reverse.health%2Fnutrition-fasting-menopause%2F%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExQW5QbU55NHJta0Y0bDB2dXNydGMGYXBwX2lkDzU0MTYzOTQ5Mzg4OTAyNQABHieK3gLKXaEZzZJ6LJYWVdaf9mVoEBEhbKjAhd2Cb2DzwCPe0zTnzt04k4IJ_aem_Ta6qIKUYC28n_aG0RIHBNQ&h=AT33kCKtnn1PAoL9B3OKISBB6ooVc77MhXqmRtKDR_G_E8ZrPHSeexUDWVPuZ1ZWmVnRxDP8P58Yq_hd0NZE18Ro6FPYyYd2R58vuXSg8G2Av-EXTN_wU8DliQzA_P4OYjImHAP0",
        "text": "",
        "className": "x1hl2dhg x1lku1pv x8t9es0 x1fvot60 xxio538 xjnfcd9 xq9mrsl x1yc453h x1h4wwuj x1fcty0u x1lliihq"
      }
    ],
    "domainPatterns": null
  }
]
Replace the placeholder values in `extension/manifest.json`:

```json
{
  "oauth2": {
    "client_id": "YOUR_ACTUAL_CLIENT_ID.apps.googleusercontent.com",
    "scopes": [
      "https://www.googleapis.com/auth/bigquery",
      "https://www.googleapis.com/auth/bigquery.insertdata"
    ]
  },
  "key": "YOUR_EXTENSION_KEY_HERE"
}
```

- Replace `YOUR_ACTUAL_CLIENT_ID.apps.googleusercontent.com` with the Client ID from Step 2
- Replace `YOUR_EXTENSION_KEY_HERE` with the key from Step 3 (or remove this line if not using a fixed key)

## Step 5: Reload the Extension

1. Go to `chrome://extensions/`
2. Click the refresh icon on your extension
3. If you see any errors, check the console for details

## Using BigQuery Export

1. Open the extension popup on a Facebook Ad Library page
2. Scrape some ads using the "Start Scraping" button
3. Expand the **BigQuery Settings** section
4. Click **Connect Google Account** and authorize the extension
5. Enter your BigQuery configuration:
   - **Project ID**: Your GCP project ID (e.g., `my-project-123`)
   - **Dataset ID**: The dataset to store data (default: `ad_library_data`)
   - **Table Name**: The table name (default: `facebook_ads`)
   - **Auto-create table**: Check this to automatically create the dataset/table if they don't exist
6. Click **Save Settings**
7. Click **Export to BigQuery** to upload your scraped ads

## BigQuery Table Schema

The extension creates a table with the following schema:

| Field | Type | Description |
|-------|------|-------------|
| library_id | STRING | Facebook Ad Library ID |
| status | STRING | Ad status (Active/Inactive) |
| date_start | STRING | Ad start date |
| date_end | STRING | Ad end date |
| platforms | STRING (REPEATED) | Platforms where ad appeared |
| has_eu_transparency | BOOLEAN | Has EU transparency info |
| advertiser_name | STRING | Name of advertiser |
| ad_copy | STRING | Ad copy text |
| media_url | STRING | URL of ad media |
| media_type | STRING | Type of media (image/video) |
| landing_page_url | STRING | Landing page URL |
| headline | STRING | Ad headline |
| cta_text | STRING | Call to action text |
| num_ads_using_creative | INTEGER | Number of ads using this creative |
| scraped_at | TIMESTAMP | When the ad was scraped |
| scrape_page_url | STRING | URL of the scraped page |
| scrape_advertiser | STRING | Advertiser from scrape info |
| inserted_at | TIMESTAMP | When the row was inserted into BigQuery |

## Querying Your Data

Example BigQuery SQL queries:

```sql
-- Get all ads for a specific advertiser
SELECT * FROM `your-project.ad_library_data.facebook_ads`
WHERE advertiser_name = 'Example Brand'
ORDER BY scraped_at DESC;

-- Count ads by platform
SELECT platform, COUNT(*) as count
FROM `your-project.ad_library_data.facebook_ads`,
UNNEST(platforms) as platform
GROUP BY platform;

-- Get active ads from the last 7 days
SELECT * FROM `your-project.ad_library_data.facebook_ads`
WHERE status = 'Active'
  AND inserted_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY);
```

## Troubleshooting

### "Not authorized" error
- Make sure you've authorized the extension with a Google account that has BigQuery access
- Check that your GCP project has BigQuery API enabled

### "Project not found" error
- Verify the Project ID is correct (it's case-sensitive)
- Ensure your Google account has access to the project

### "Dataset/Table creation failed"
- Your account needs BigQuery Data Editor role or higher
- Try creating the dataset manually in BigQuery Console first

### OAuth popup doesn't appear
- Check that the `client_id` in manifest.json is correct
- Make sure the OAuth consent screen is configured
- Try disconnecting and reconnecting
