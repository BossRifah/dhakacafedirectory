#!/usr/bin/env node

/**
 * Coffee Shop Data Scraper
 *
 * DISCLAIMER: This is for educational purposes. Google's ToS prohibit scraping.
 * Expected to work for 5-10 shops before getting blocked.
 *
 * Usage:
 *   node scripts/scrape-complete-data.js
 *   node scripts/scrape-complete-data.js --shop "shop-slug"
 *   node scripts/scrape-complete-data.js --dry-run
 *   node scripts/scrape-complete-data.js --resume
 */

const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const logger = require('./utils/logger');
const { mediumDelay, shortDelay, longDelay } = require('./utils/delays');
const { getHeaders } = require('./utils/user-agents');

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const shouldResume = args.includes('--resume');
const specificShop = args.find(arg => arg.startsWith('--shop'))?.split('=')[1];

class CoffeeShopScraper {
  constructor() {
    this.dataPath = path.join(process.cwd(), 'data', 'coffee-shops.json');
    this.backupPath = path.join(process.cwd(), 'data', 'coffee-shops-backup.json');
    this.reportPath = path.join(process.cwd(), 'scrape-report.html');
    this.scrapedCount = 0;
    this.failedCount = 0;
    this.blockedCount = 0;
    this.results = [];
  }

  async run() {
    console.log('\n╔═══════════════════════════════════════════════════════════╗');
    console.log('║        Coffee Shop Data Scraper (Educational)             ║');
    console.log('╚═══════════════════════════════════════════════════════════╝\n');

    if (isDryRun) {
      console.log('🔍 DRY RUN MODE - No files will be modified\n');
    }

    // Load existing data
    logger.info('Loading coffee-shops.json...');
    const data = await this.loadData();

    if (!isDryRun) {
      // Create backup
      await fs.writeFile(this.backupPath, JSON.stringify(data, null, 2));
      logger.success('Backup created at coffee-shops-backup.json');
    }

    // Load progress if resuming
    let progress = {};
    if (shouldResume) {
      progress = await logger.loadProgress() || {};
      logger.info(`Resuming from previous run (${Object.keys(progress).length} shops completed)`);
    }

    // Filter shops to scrape
    let shopsToScrape = data.shops;
    if (specificShop) {
      shopsToScrape = data.shops.filter(s => s.slug === specificShop);
      if (shopsToScrape.length === 0) {
        logger.error(`Shop "${specificShop}" not found`);
        return;
      }
    } else if (shouldResume) {
      shopsToScrape = data.shops.filter(s => !progress[s.id]);
    }

    logger.info(`\n📊 Scraping ${shopsToScrape.length} coffee shops\n`);
    logger.warn('⚠️  Google will likely block after 5-10 requests');
    logger.warn('⚠️  Consider using Google Places API for reliable data\n');

    // Scrape each shop
    for (let i = 0; i < shopsToScrape.length; i++) {
      const shop = shopsToScrape[i];
      const shopIndex = data.shops.findIndex(s => s.id === shop.id);

      console.log(`\n[${ i + 1}/${shopsToScrape.length}] Processing: ${shop.name} (${shop.area})`);
      console.log('─'.repeat(60));

      try {
        const scrapedData = await this.scrapeShop(shop);

        if (scrapedData.blocked) {
          this.blockedCount++;
          logger.warn('🚫 Blocked by Google. Stopping scraper.');
          logger.info('💡 Recommendation: Use Google Places API instead');
          logger.info('   Or try again with a VPN/different IP');
          break;
        }

        if (scrapedData.success) {
          this.scrapedCount++;

          // Update shop data
          if (!isDryRun) {
            data.shops[shopIndex] = { ...shop, ...scrapedData.data };

            // Save progress after each shop
            await fs.writeFile(this.dataPath, JSON.stringify(data, null, 2));
            progress[shop.id] = true;
            await logger.saveProgress(progress);
          }

          this.results.push({
            shop: shop.name,
            status: 'success',
            data: scrapedData.data
          });

          logger.success(`✅ Successfully scraped ${shop.name}`);
        } else {
          this.failedCount++;
          this.results.push({
            shop: shop.name,
            status: 'failed',
            error: scrapedData.error
          });
          logger.warn(`⚠️  Failed to scrape ${shop.name}: ${scrapedData.error}`);
        }

        // Delay between shops
        if (i < shopsToScrape.length - 1) {
          logger.info('⏱️  Waiting before next shop...');
          await mediumDelay();
        }

      } catch (error) {
        this.failedCount++;
        await logger.error(`Error scraping ${shop.name}`, error);
        this.results.push({
          shop: shop.name,
          status: 'error',
          error: error.message
        });
      }
    }

    // Generate report
    await this.generateReport();

    // Summary
    console.log('\n╔═══════════════════════════════════════════════════════════╗');
    console.log('║                      SUMMARY                               ║');
    console.log('╚═══════════════════════════════════════════════════════════╝\n');
    console.log(`✅ Successfully scraped: ${this.scrapedCount}`);
    console.log(`❌ Failed: ${this.failedCount}`);
    console.log(`🚫 Blocked: ${this.blockedCount > 0 ? 'Yes' : 'No'}`);
    console.log(`\n📄 Report saved to: ${this.reportPath}`);

    if (!isDryRun && this.scrapedCount > 0) {
      console.log(`\n🚀 Next steps:`);
      console.log(`   1. Review: cat data/coffee-shops.json`);
      console.log(`   2. Build: npm run build`);
      console.log(`   3. Push: git push origin main\n`);
    }
  }

  async loadData() {
    try {
      const content = await fs.readFile(this.dataPath, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      logger.error('Failed to load coffee-shops.json', error);
      process.exit(1);
    }
  }

  async scrapeShop(shop) {
    try {
      // Search Google for the shop
      const searchQuery = `${shop.name} ${shop.area} Dhaka site:google.com/maps`;
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;

      logger.info(`🔍 Searching: ${searchQuery}`);

      const response = await axios.get(searchUrl, {
        headers: getHeaders(),
        timeout: 15000,
        validateStatus: () => true // Accept any status code
      });

      // Check if blocked
      if (response.status === 429 || response.data.includes('unusual traffic')) {
        logger.warn('Detected CAPTCHA or rate limiting');
        return { blocked: true, success: false };
      }

      const $ = cheerio.load(response.data);

      const result = {
        success: false,
        data: {},
        error: null
      };

      // Try to extract Google Maps link
      let mapsLink = null;
      $('a').each((i, el) => {
        const href = $(el).attr('href');
        if (href && href.includes('maps.google.com')) {
          mapsLink = href;
          return false; // break
        }
      });

      if (!mapsLink) {
        logger.warn('No Google Maps link found in search results');
        result.error = 'No Maps link found';
        return result;
      }

      logger.info(`📍 Found Maps link: ${mapsLink.substring(0, 50)}...`);
      await shortDelay();

      // Scrape the Maps page
      const mapsData = await this.scrapeMapsPage(mapsLink);

      if (mapsData.blocked) {
        return { blocked: true, success: false };
      }

      if (mapsData.success) {
        result.success = true;
        result.data = mapsData.data;

        // Log what we found
        if (mapsData.data.rating) logger.info(`   ⭐ Rating: ${mapsData.data.rating}`);
        if (mapsData.data.totalReviews) logger.info(`   💬 Reviews: ${mapsData.data.totalReviews}`);
        if (mapsData.data.phone) logger.info(`   📞 Phone: ${mapsData.data.phone}`);
        if (mapsData.data.reviews) logger.info(`   📝 Scraped ${mapsData.data.reviews.length} reviews`);
      } else {
        result.error = mapsData.error || 'Failed to scrape Maps page';
      }

      return result;

    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        return { success: false, error: 'Request timeout' };
      }
      throw error;
    }
  }

  async scrapeMapsPage(url) {
    try {
      logger.info('📱 Fetching Google Maps page...');

      const response = await axios.get(url, {
        headers: getHeaders(),
        timeout: 20000,
        validateStatus: () => true
      });

      if (response.status === 429 || response.data.includes('unusual traffic')) {
        return { blocked: true, success: false };
      }

      const $ = cheerio.load(response.data);

      const data = {};

      // Try to extract rating
      $('[role="img"][aria-label*="star"]').each((i, el) => {
        const label = $(el).attr('aria-label');
        const match = label?.match(/([0-9.]+)\s*star/i);
        if (match) {
          data.rating = parseFloat(match[1]);
        }
      });

      // Try to extract review count
      $('button:contains("review")').each((i, el) => {
        const text = $(el).text();
        const match = text.match(/([0-9,]+)\s*review/i);
        if (match) {
          data.totalReviews = parseInt(match[1].replace(/,/g, ''));
        }
      });

      // Try to extract phone
      $('[data-tooltip="Copy phone number"]').each((i, el) => {
        const phone = $(el).text().trim();
        if (phone) {
          data.phone = phone;
        }
      });

      // Try to extract address
      $('[data-tooltip="Copy address"]').each((i, el) => {
        const address = $(el).text().trim();
        if (address && address.includes('Dhaka')) {
          data.address = address;
        }
      });

      // Try to extract hours
      // (This is complex as Google Maps uses dynamic content)
      // Leaving as placeholder for now

      // Try to extract reviews (limited without JavaScript)
      const reviews = [];
      $('.jftiEf').each((i, el) => {
        if (i >= 5) return false; // Only get 5 reviews

        const author = $(el).find('.d4r55').text().trim();
        const reviewText = $(el).find('.wiI7pd').text().trim();
        const ratingEl = $(el).find('[role="img"]').attr('aria-label');
        const ratingMatch = ratingEl?.match(/([0-9])\s*star/i);

        if (author && reviewText) {
          reviews.push({
            author,
            rating: ratingMatch ? parseInt(ratingMatch[1]) : 5,
            date: 'Recently',
            text: reviewText
          });
        }
      });

      if (reviews.length > 0) {
        data.reviews = reviews;
      }

      const success = Object.keys(data).length > 0;

      return {
        success,
        blocked: false,
        data,
        error: success ? null : 'No data extracted from Maps page'
      };

    } catch (error) {
      logger.error('Error scraping Maps page', error);
      return { success: false, blocked: false, error: error.message };
    }
  }

  async generateReport() {
    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Scrape Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
    .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
    h1 { color: #333; }
    .summary { display: flex; gap: 20px; margin: 20px 0; }
    .stat { background: #f0f0f0; padding: 15px; border-radius: 4px; flex: 1; }
    .stat-value { font-size: 32px; font-weight: bold; color: #2196F3; }
    .stat-label { color: #666; margin-top: 5px; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background: #2196F3; color: white; }
    .success { color: #4CAF50; }
    .failed { color: #f44336; }
    .blocked { color: #ff9800; }
  </style>
</head>
<body>
  <div class="container">
    <h1>☕ Coffee Shop Scraper Report</h1>
    <p>Generated: ${new Date().toLocaleString()}</p>

    <div class="summary">
      <div class="stat">
        <div class="stat-value">${this.scrapedCount}</div>
        <div class="stat-label">Successfully Scraped</div>
      </div>
      <div class="stat">
        <div class="stat-value">${this.failedCount}</div>
        <div class="stat-label">Failed</div>
      </div>
      <div class="stat">
        <div class="stat-value">${this.blockedCount > 0 ? 'Yes' : 'No'}</div>
        <div class="stat-label">Blocked</div>
      </div>
    </div>

    <h2>Results</h2>
    <table>
      <thead>
        <tr>
          <th>Shop Name</th>
          <th>Status</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        ${this.results.map(r => `
          <tr>
            <td>${r.shop}</td>
            <td class="${r.status}">${r.status.toUpperCase()}</td>
            <td>${r.status === 'success'
              ? `Found: ${Object.keys(r.data || {}).join(', ')}`
              : r.error || 'N/A'
            }</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    ${this.blockedCount > 0 ? `
      <div style="background: #fff3cd; padding: 15px; border-radius: 4px; margin: 20px 0;">
        <h3>🚫 Blocked by Google</h3>
        <p>The scraper was blocked. Recommendations:</p>
        <ul>
          <li>Use Google Places API (legal, reliable, $200/month free)</li>
          <li>Try again with a VPN or different IP address</li>
          <li>Use the manual data entry tool: <code>node scripts/add-shop-interactive.js</code></li>
        </ul>
      </div>
    ` : ''}
  </div>
</body>
</html>
    `;

    await fs.writeFile(this.reportPath, html);
  }
}

// Run the scraper
const scraper = new CoffeeShopScraper();
scraper.run().catch(error => {
  logger.error('Fatal error', error);
  process.exit(1);
});
