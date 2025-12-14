#!/usr/bin/env node

/**
 * Interactive Coffee Shop Data Entry Tool
 *
 * This script makes it SUPER EASY to add real coffee shop data
 * without any scraping, tokens, or technical knowledge.
 *
 * Usage: node scripts/add-shop-interactive.js
 */

const readline = require('readline');
const fs = require('fs').promises;
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║     Coffee Shop Data Entry Tool - Zero Tokens Needed!      ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  console.log('This tool will help you add REAL coffee shop data quickly.\n');
  console.log('Instructions:');
  console.log('1. Have Google Maps open for the shop');
  console.log('2. Copy-paste info as you see it');
  console.log('3. Press Enter to skip optional fields\n');

  const dataFilePath = path.join(process.cwd(), 'data', 'coffee-shops.json');

  // Load existing data
  let data;
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf8');
    data = JSON.parse(fileContent);
  } catch (error) {
    console.error('❌ Could not read coffee-shops.json');
    process.exit(1);
  }

  const newId = String(data.shops.length + 1);

  console.log('\n📝 BASIC INFORMATION\n');

  const name = await question('Shop name (e.g., "Crimson Cup Coffee"): ');
  if (!name) {
    console.log('❌ Shop name is required');
    process.exit(1);
  }

  const area = await question('Area (e.g., "Gulshan", "Banani"): ');
  if (!area) {
    console.log('❌ Area is required');
    process.exit(1);
  }

  const slug = name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') + '-' + area.toLowerCase().replace(/\s+/g, '-');

  console.log(`✓ Generated slug: ${slug}`);

  const address = await question('Full address: ');
  const phone = await question('Phone number (with +880): ');

  console.log('\n⏰ HOURS\n');
  const weekdayHours = await question('Weekday hours (e.g., "9:00 AM - 10:00 PM"): ');
  const weekendHours = await question('Weekend hours (e.g., "10:00 AM - 11:00 PM"): ');

  console.log('\n⭐ RATING\n');
  const rating = await question('Google rating (e.g., "4.5"): ');
  const totalReviews = await question('Total reviews (e.g., "342"): ');

  console.log('\n💰 PRICING\n');
  console.log('Price range:');
  console.log('  ৳   = Budget (< 200 BDT)');
  console.log('  ৳৳  = Moderate (200-500 BDT)');
  console.log('  ৳৳৳ = Premium (> 500 BDT)');
  const priceRange = await question('Enter price range: ');

  console.log('\n📝 DESCRIPTION\n');
  const description = await question('Brief description (1-2 sentences): ');

  console.log('\n☕ MENU (Coffee drinks offered)\n');
  console.log('Enter drinks separated by commas');
  const hotCoffee = await question('Hot coffee (e.g., "Espresso, Latte, Cappuccino"): ');
  const coldCoffee = await question('Cold coffee (e.g., "Iced Latte, Cold Brew"): ');

  const drinks = [];
  if (hotCoffee) {
    drinks.push({
      category: "Hot Coffee",
      items: hotCoffee.split(',').map(s => s.trim()).filter(Boolean)
    });
  }
  if (coldCoffee) {
    drinks.push({
      category: "Cold Coffee",
      items: coldCoffee.split(',').map(s => s.trim()).filter(Boolean)
    });
  }

  console.log('\n🏢 AMENITIES\n');
  console.log('Enter amenities separated by commas');
  console.log('(e.g., "Free WiFi, Air Conditioned, Parking")');
  const amenitiesInput = await question('Amenities: ');
  const amenities = amenitiesInput.split(',').map(s => s.trim()).filter(Boolean);

  console.log('\n💬 REVIEWS (Optional - add 3 reviews)\n');
  console.log('Tip: Copy real reviews from Google Maps!\n');

  const reviews = [];
  for (let i = 1; i <= 3; i++) {
    console.log(`Review ${i}:`);
    const author = await question('  Reviewer name (or Enter to skip): ');
    if (!author) break;

    const reviewRating = await question('  Rating (1-5): ');
    const date = await question('  Date (e.g., "1 week ago"): ');
    const text = await question('  Review text: ');

    reviews.push({
      author,
      rating: parseInt(reviewRating) || 5,
      date: date || 'Recently',
      text
    });
  }

  // Create new shop object
  const newShop = {
    id: newId,
    name,
    slug,
    locationSlug: area.toLowerCase().replace(/\s+/g, '-'),
    address: address || `${area}, Dhaka`,
    area,
    phone: phone || '+880 1XXX-XXXXXX',
    hours: {
      weekday: weekdayHours || '9:00 AM - 10:00 PM',
      weekend: weekendHours || weekdayHours || '9:00 AM - 10:00 PM'
    },
    rating: parseFloat(rating) || 4.5,
    totalReviews: parseInt(totalReviews) || 100,
    priceRange: priceRange || '৳৳',
    description: description || `Coffee shop in ${area}`,
    reviews: reviews.length > 0 ? reviews : [
      {
        author: "Sample Review",
        rating: 5,
        date: "Recently",
        text: "Great coffee shop!"
      }
    ],
    drinks: drinks.length > 0 ? drinks : [
      {
        category: "Coffee",
        items: ["Espresso", "Latte", "Cappuccino"]
      }
    ],
    amenities: amenities.length > 0 ? amenities : ["Free WiFi", "Air Conditioned"]
  };

  console.log('\n📋 SUMMARY\n');
  console.log(JSON.stringify(newShop, null, 2));

  const confirm = await question('\n✅ Add this shop? (yes/no): ');

  if (confirm.toLowerCase() === 'yes' || confirm.toLowerCase() === 'y') {
    // Add to data
    data.shops.push(newShop);

    // Save backup
    const backupPath = path.join(process.cwd(), 'data', 'coffee-shops-backup.json');
    try {
      await fs.writeFile(backupPath, JSON.stringify(data, null, 2));
      console.log(`✓ Backup saved to ${backupPath}`);
    } catch (err) {
      console.error('⚠️  Could not create backup');
    }

    // Save updated data
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));

    console.log('\n✅ SUCCESS! Coffee shop added to data/coffee-shops.json');
    console.log(`\n📊 Total shops: ${data.shops.length}`);
    console.log(`\n🚀 Next steps:`);
    console.log(`   1. Run: npm run build`);
    console.log(`   2. Push to GitHub`);
    console.log(`   3. Vercel will auto-deploy!\n`);
  } else {
    console.log('\n❌ Cancelled. No changes made.');
  }

  rl.close();
}

main().catch(console.error);
