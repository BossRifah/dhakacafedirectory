/**
 * Logger utility for tracking scraper progress and errors
 */

const fs = require('fs').promises;
const path = require('path');

class Logger {
  constructor() {
    this.logFile = path.join(process.cwd(), 'scrape-errors.log');
    this.progressFile = path.join(process.cwd(), 'scrape-progress.json');
  }

  /**
   * Log info message to console
   */
  info(message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ℹ️  ${message}`);
  }

  /**
   * Log success message to console
   */
  success(message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ✅ ${message}`);
  }

  /**
   * Log warning message to console
   */
  warn(message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ⚠️  ${message}`);
  }

  /**
   * Log error message to console and file
   */
  async error(message, error) {
    const timestamp = new Date().toISOString();
    const errorMessage = `[${timestamp}] ❌ ${message}`;
    console.error(errorMessage);

    if (error) {
      console.error(error);
      await this.writeToFile(`${errorMessage}\n${error.stack}\n\n`);
    } else {
      await this.writeToFile(`${errorMessage}\n\n`);
    }
  }

  /**
   * Write error to log file
   */
  async writeToFile(message) {
    try {
      await fs.appendFile(this.logFile, message);
    } catch (err) {
      console.error('Failed to write to log file:', err);
    }
  }

  /**
   * Save progress to resume later
   */
  async saveProgress(progress) {
    try {
      await fs.writeFile(
        this.progressFile,
        JSON.stringify(progress, null, 2)
      );
    } catch (err) {
      console.error('Failed to save progress:', err);
    }
  }

  /**
   * Load saved progress
   */
  async loadProgress() {
    try {
      const data = await fs.readFile(this.progressFile, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      return null;
    }
  }

  /**
   * Clear logs
   */
  async clearLogs() {
    try {
      await fs.unlink(this.logFile);
    } catch (err) {
      // File doesn't exist, ignore
    }
  }
}

module.exports = new Logger();
