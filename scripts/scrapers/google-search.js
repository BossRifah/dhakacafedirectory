/**
 * Google Search scraper (educational purposes only)
 *
 * LEGAL DISCLAIMER:
 * This scraper is for educational purposes. Google's Terms of Service prohibit
 * automated access. Use at your own risk. Consider using Google Places API instead.
 *
 * LIMITATIONS:
 * - Will likely get blocked after 5-10 requests
 * - Requires CAPTCHA solving for scale
 * - HTML structure changes frequently
 */

const axios = require('axios');
const cheerio = require('cheerio');
const { getHeaders } = require('../utils/user-agents');
const { shortDelay } = require('../utils/delays');
const logger = require('../utils/logger');

/**
 * Search Google for a coffee shop
 * @param {string} shopName - Name of the coffee shop
 * @param {string} area - Area/neighborhood
 * @returns {Promise<Object>} Search results
 */
async function searchGoogle(shopName, area) {
  try {
    const query = encodeURIComponent(`${shopName} ${area} Dhaka coffee shop`);
    const url = `https://www.google.com/search?q=${query}`;

    logger.info(`Searching Google for: ${shopName} in ${area}`);

    const response = await axios.get(url, {
      headers: getHeaders(),
      timeout: 10000
    });

    const $ = cheerio.load(response.data);

    // Extract basic info from search results
    const result = {
      googleMapsLink: null,
      rating: null,
      reviewCount: null,
      address: null,
      phone: null,
      hours: null,
      snippet: null
    };

    // Try to find Google Maps link
    $('a[href*="maps.google.com"], a[href*="goo.gl/maps"]').each((i, el) => {
      if (!result.googleMapsLink) {
        result.googleMapsLink = $(el).attr('href');
      }
    });

    // Try to extract rating from knowledge panel
    const ratingText = $('span:contains("★")').first().parent().text();
    const ratingMatch = ratingText.match(/([0-9.]+)\s*★/);
    if (ratingMatch) {
      result.rating = parseFloat(ratingMatch[1]);
    }

    // Try to extract review count
    const reviewText = $('span:contains("reviews"), span:contains("review")').first().text();
    const reviewMatch = reviewText.match(/([0-9,]+)\s*reviews?/i);
    if (reviewMatch) {
      result.reviewCount = parseInt(reviewMatch[1].replace(/,/g, ''));
    }

    // Extract address if visible
    $('span:contains("Address")').parent().find('span').each((i, el) => {
      const text = $(el).text();
      if (text.includes('Dhaka') && !result.address) {
        result.address = text.trim();
      }
    });

    // Extract phone if visible
    $('a[href^="tel:"]').each((i, el) => {
      if (!result.phone) {
        result.phone = $(el).text().trim();
      }
    });

    // Get first snippet
    $('.VwiC3b, .aCOpRe').first().each((i, el) => {
      result.snippet = $(el).text().trim();
    });

    await shortDelay();

    if (result.googleMapsLink) {
      logger.success(`Found Google Maps link for ${shopName}`);
    } else {
      logger.warn(`No Google Maps link found for ${shopName}`);
    }

    return result;

  } catch (error) {
    if (error.response && error.response.status === 429) {
      logger.warn('Rate limited by Google. Consider using Google Places API.');
    } else {
      await logger.error(`Failed to search Google for ${shopName}`, error);
    }
    return null;
  }
}

/**
 * Extract place ID from Google Maps URL
 */
function extractPlaceId(mapsUrl) {
  if (!mapsUrl) return null;

  const placeIdMatch = mapsUrl.match(/!1s([^!]+)/);
  if (placeIdMatch) {
    return placeIdMatch[1];
  }

  return null;
}

module.exports = {
  searchGoogle,
  extractPlaceId
};
