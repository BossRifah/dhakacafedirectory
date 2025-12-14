#!/usr/bin/env node

/**
 * Coffee Shop Data Scraper using Apify Google Places Crawler
 *
 * This uses Apify's professional scraping service to get real data
 * without getting blocked. Much more reliable than DIY scraping.
 *
 * Setup:
 *   1. Sign up at apify.com (free tier: $5/month = ~100 places)
 *   2. Get API token from: https://console.apify.com/account/integrations
 *   3. Set environment variable: export APIFY_TOKEN="your_token_here"
 *
 * Usage:
 *   node scripts/scrape-with-apify.js
 *   node scripts/scrape-with-apify.js --shop "shop-slug"
 */

const { ApifyClient } = require('apify-client');
const fs = require('fs').promises;
const path = require('path');
const logger = require('./utils/logger');

// Initialize Apify client
const APIFY_TOKEN = process.env.APIFY_TOKEN || 'YOUR_APIFY_TOKEN_HERE';

if (APIFY_TOKEN === 'YOUR_APIFY_TOKEN_HERE') {
  console.error('\n❌ Error: APIFY_TOKEN not set\n');
  console.log('Please set your Apify API token:');
  console.log('  export APIFY_TOKEN="your_token_here"\n');
  console.log('Get your token from: https://console.apify.com/account/integrations\n');
  process.exit(1);
}

const client = new ApifyClient({ token: APIFY_TOKEN });

class ApifyScraper {
  constructor() {
    this.dataPath = path.join(process.cwd(), 'data', 'coffee-shops.json');
    this.backupPath = path.join(process.cwd(), 'data', 'coffee-shops-backup.json');
    this.scrapedCount = 0;
    this.failedCount = 0;
  }

  async run() {
    console.log('\n╔═══════════════════════════════════════════════════════════╗');
    console.log('║     Coffee Shop Scraper - Powered by Apify                ║');
    console.log('╚═══════════════════════════════════════════════════════════╝\n');

    // Load existing data
    logger.info('Loading coffee-shops.json...');
    const data = await this.loadData();

    // Create backup
    await fs.writeFile(this.backupPath, JSON.stringify(data, null, 2));
    logger.success('Backup created');

    logger.info(`\n📊 Scraping ${data.shops.length} coffee shops using Apify\n`);
    logger.info('This will use your Apify credits (~$0.05 per shop)');
    logger.info('Free tier: $5/month = ~100 shops\n');

    // Build search queries
    const searchQueries = data.shops.map(shop =>
      `${shop.name} ${shop.area} Dhaka Bangladesh`
    );

    console.log('🚀 Starting Apify Google Places Crawler...\n');

    try {
      // Run the Apify actor
      const run = await client.actor('compass/crawler-google-places').call({
        searchStringsArray: searchQueries,
        maxReviews: 5,
        language: 'en',
        maxImages: 3,
        exportPlaceUrls: false,
        scrapeReviewId: false,
        scrapeReviewUrl: false,
        scrapeResponseFromOwnerText: false
      });

      logger.success(`✅ Apify run completed: ${run.id}`);
      console.log(`📊 View run: https://console.apify.com/actors/runs/${run.id}\n`);

      // Fetch results
      logger.info('Fetching results...');
      const { items } = await client.dataset(run.defaultDatasetId).listItems();

      logger.success(`✅ Retrieved ${items.length} results\n`);

      // Match results with shops and update
      for (let i = 0; i < data.shops.length; i++) {
        const shop = data.shops[i];
        const query = searchQueries[i];

        // Find matching result
        const result = items.find(item =>
          item.searchString === query && item.title
        );

        if (result) {
          console.log(`\n[${i + 1}/${data.shops.length}] ✅ ${shop.name}`);

          // Update shop with scraped data
          const updates = this.mapApifyData(result);
          data.shops[i] = { ...shop, ...updates };

          // Log what we got
          if (updates.rating) console.log(`   ⭐ Rating: ${updates.rating}`);
          if (updates.totalReviews) console.log(`   💬 Reviews: ${updates.totalReviews}`);
          if (updates.phone) console.log(`   📞 Phone: ${updates.phone}`);
          if (updates.address) console.log(`   📍 Address: ${updates.address}`);
          if (updates.reviews) console.log(`   📝 Scraped ${updates.reviews.length} reviews`);

          this.scrapedCount++;
        } else {
          console.log(`\n[${i + 1}/${data.shops.length}] ❌ ${shop.name} - No data found`);
          this.failedCount++;
        }
      }

      // Save updated data
      await fs.writeFile(this.dataPath, JSON.stringify(data, null, 2));
      logger.success('\n✅ Data saved to coffee-shops.json');

      // Summary
      console.log('\n╔═══════════════════════════════════════════════════════════╗');
      console.log('║                      SUMMARY                               ║');
      console.log('╚═══════════════════════════════════════════════════════════╝\n');
      console.log(`✅ Successfully scraped: ${this.scrapedCount}`);
      console.log(`❌ Failed: ${this.failedCount}`);
      console.log(`💰 Estimated cost: $${(this.scrapedCount * 0.05).toFixed(2)}`);

      console.log(`\n🚀 Next steps:`);
      console.log(`   1. Review: cat data/coffee-shops.json`);
      console.log(`   2. Build: npm run build`);
      console.log(`   3. Push: git push origin main\n`);

    } catch (error) {
      await logger.error('Apify scraping failed', error);

      if (error.message.includes('token')) {
        console.log('\n💡 Make sure your APIFY_TOKEN is set correctly');
      } else if (error.message.includes('insufficient funds')) {
        console.log('\n💡 You need to add credits to your Apify account');
        console.log('   https://console.apify.com/account/billing');
      }

      process.exit(1);
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

  /**
   * Map Apify Google Places data to our coffee shop format
   */
  mapApifyData(apifyResult) {
    const updates = {};

    // Rating
    if (apifyResult.totalScore) {
      updates.rating = parseFloat(apifyResult.totalScore);
    }

    // Review count
    if (apifyResult.reviewsCount) {
      updates.totalReviews = parseInt(apifyResult.reviewsCount);
    }

    // Phone
    if (apifyResult.phone) {
      updates.phone = apifyResult.phone;
    }

    // Address
    if (apifyResult.address) {
      updates.address = apifyResult.address;
    }

    // Hours
    if (apifyResult.openingHours && apifyResult.openingHours.length > 0) {
      const hours = this.parseOpeningHours(apifyResult.openingHours);
      if (hours) {
        updates.hours = hours;
      }
    }

    // Reviews
    if (apifyResult.reviews && apifyResult.reviews.length > 0) {
      updates.reviews = apifyResult.reviews.slice(0, 5).map(review => ({
        author: review.name || 'Anonymous',
        rating: review.stars || 5,
        date: review.publishedAtDate || 'Recently',
        text: review.text || review.textTranslated || 'Great place!'
      }));
    }

    // Images
    if (apifyResult.imageUrls && apifyResult.imageUrls.length > 0) {
      updates.images = apifyResult.imageUrls.slice(0, 3);
    }

    // Website
    if (apifyResult.website) {
      updates.website = apifyResult.website;
    }

    // Categories (for amenities)
    if (apifyResult.categoryName) {
      // Keep existing amenities, just add category info
    }

    return updates;
  }

  /**
   * Parse opening hours from Apify format
   */
  parseOpeningHours(hoursArray) {
    // Apify returns array like: ["Monday: 9:00 AM – 10:00 PM", ...]
    if (!hoursArray || hoursArray.length === 0) return null;

    const weekdayPattern = /(Monday|Tuesday|Wednesday|Thursday|Friday):\s*(.+)/;
    const weekendPattern = /(Saturday|Sunday):\s*(.+)/;

    let weekdayHours = null;
    let weekendHours = null;

    for (const entry of hoursArray) {
      if (!weekdayHours) {
        const match = entry.match(weekdayPattern);
        if (match) weekdayHours = match[2];
      }
      if (!weekendHours) {
        const match = entry.match(weekendPattern);
        if (match) weekendHours = match[2];
      }
    }

    return {
      weekday: weekdayHours || '9:00 AM - 10:00 PM',
      weekend: weekendHours || weekdayHours || '9:00 AM - 10:00 PM'
    };
  }
}

// Run the scraper
const scraper = new ApifyScraper();
scraper.run().catch(error => {
  logger.error('Fatal error', error);
  process.exit(1);
});
