/**
 * Delay utilities for rate limiting and anti-detection
 */

/**
 * Sleep for a specified number of milliseconds
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Random delay between min and max seconds
 */
async function randomDelay(minSeconds = 3, maxSeconds = 7) {
  const ms = (minSeconds + Math.random() * (maxSeconds - minSeconds)) * 1000;
  await sleep(ms);
}

/**
 * Short random delay (for between requests)
 */
async function shortDelay() {
  await randomDelay(1, 3);
}

/**
 * Medium delay (for between shops)
 */
async function mediumDelay() {
  await randomDelay(3, 5);
}

/**
 * Long delay (if we detect rate limiting)
 */
async function longDelay() {
  await randomDelay(10, 15);
}

module.exports = {
  sleep,
  randomDelay,
  shortDelay,
  mediumDelay,
  longDelay
};
