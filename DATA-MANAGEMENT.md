# Coffee Shop Data Management Guide

This guide explains how to add, update, and manage coffee shop data in your Dhaka Coffee Directory without using tokens or Claude Code.

## Quick Start

All coffee shop data is stored in a single JSON file:
```
/data/coffee-shops.json
```

To add new coffee shops, simply edit this file manually. No code generation needed!

## How It Works

The system uses **programmatic SEO** with dynamic routing:

1. All data lives in `/data/coffee-shops.json`
2. Next.js reads this file at build time
3. Pages are automatically generated for:
   - Individual shop pages: `/shops/[slug]`
   - Location pages: `/coffee-shops-in-[location]`

**No individual page files needed!** The templates handle everything.

## Adding a New Coffee Shop

### Step 1: Copy This Template

```json
{
  "id": "7",
  "name": "Your Coffee Shop Name",
  "slug": "your-coffee-shop-name-location",
  "locationSlug": "banani",
  "address": "House XX, Road YY, Area Name",
  "area": "Banani",
  "phone": "+880 1XXX-XXXXXX",
  "hours": {
    "weekday": "8:00 AM - 10:00 PM",
    "weekend": "9:00 AM - 11:00 PM"
  },
  "rating": 4.5,
  "totalReviews": 100,
  "priceRange": "৳৳",
  "description": "Brief description of the coffee shop...",
  "reviews": [
    {
      "author": "Customer Name",
      "rating": 5,
      "date": "1 week ago",
      "text": "Great coffee and atmosphere!"
    }
  ],
  "drinks": [
    {
      "category": "Hot Coffee",
      "items": ["Espresso", "Latte", "Cappuccino"]
    }
  ],
  "amenities": ["Free WiFi", "Air Conditioned", "Parking"]
}
```

### Step 2: Edit the Values

- `id`: Increment from the last shop (current max is 6)
- `slug`: Use format `shop-name-location` (lowercase, hyphens)
- `locationSlug`: Must match one of: `gulshan`, `banani`, `dhanmondi`, `kuril`, `panthapath`
- `priceRange`: Use `৳` (budget), `৳৳` (moderate), or `৳৳৳` (premium)

### Step 3: Add to JSON File

Open `/data/coffee-shops.json` and add your new shop object to the `shops` array:

```json
{
  "shops": [
    {
      "id": "1",
      "name": "North End Coffee Roasters",
      ...
    },
    {
      "id": "7",
      "name": "Your New Coffee Shop",
      ...
    }
  ]
}
```

### Step 4: Rebuild the Site

```bash
npm run build
```

That's it! Your new page will be live at `/shops/your-coffee-shop-name-location`

## Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier (increment from last) |
| `name` | string | Yes | Full name of the coffee shop |
| `slug` | string | Yes | URL-friendly version (lowercase-with-hyphens) |
| `locationSlug` | string | Yes | Area identifier (gulshan, banani, dhanmondi, kuril, panthapath) |
| `address` | string | Yes | Full street address |
| `area` | string | Yes | Neighborhood name (proper case) |
| `phone` | string | Yes | Contact number with country code |
| `hours.weekday` | string | Yes | Opening hours Mon-Fri |
| `hours.weekend` | string | Yes | Opening hours Sat-Sun |
| `rating` | number | Yes | Rating out of 5 (e.g., 4.5) |
| `totalReviews` | number | Yes | Total number of reviews |
| `priceRange` | string | Yes | Price indicator (৳, ৳৳, or ৳৳৳) |
| `description` | string | Yes | 1-2 sentence description |
| `reviews` | array | Yes | At least 3 customer reviews |
| `drinks` | array | Yes | Categorized menu items |
| `amenities` | array | Yes | List of features/facilities |
| `image` | string | No | Optional image URL |

## Adding Reviews

Each review should have:
```json
{
  "author": "Full Name",
  "rating": 5,
  "date": "1 week ago",
  "text": "The review text goes here..."
}
```

Aim for 3-5 reviews per shop for authenticity.

## Adding Drinks Menu

Group drinks by category:
```json
{
  "category": "Espresso Based",
  "items": ["Espresso", "Americano", "Latte", "Cappuccino"]
}
```

Common categories:
- Espresso Based
- Filter Coffee
- Cold Coffee
- Specialty Drinks
- Non-Coffee

## Available Locations

Current supported areas (must match exactly):
- `gulshan` → Gulshan
- `banani` → Banani
- `dhanmondi` → Dhanmondi
- `kuril` → Kuril
- `panthapath` → Panthapath

To add a new location, you'll need to:
1. Add location content to `/lib/coffeeShops.ts` in the `locationContent` object
2. The system will automatically create a page if shops exist for that location

## Common Amenities

Standard amenities to choose from:
- Free WiFi
- Power Outlets
- Air Conditioned
- Outdoor Seating
- Indoor Seating
- Parking
- Pet Friendly
- Premium Seating
- Private Booths
- Meeting Rooms
- Mall Location
- Breakfast Menu

## Updating Existing Shops

To update a shop's information:
1. Find the shop by its `id` in `/data/coffee-shops.json`
2. Edit the fields you want to change
3. Save the file
4. Run `npm run build`

## Removing a Coffee Shop

Simply delete the entire shop object from the `shops` array in `/data/coffee-shops.json`.

## Development vs Production

**Development Mode** (npm run dev):
- Changes may require server restart
- Hot reload might not catch JSON changes

**Production Mode** (npm run build):
- All pages generated at build time
- Super fast, zero token usage after deployment

## Validation Tips

Before rebuilding, check:
- [ ] Valid JSON syntax (use a JSON validator)
- [ ] All required fields present
- [ ] Unique `id` for each shop
- [ ] Unique `slug` for each shop
- [ ] `locationSlug` matches available locations
- [ ] Rating is between 0-5
- [ ] At least 3 reviews per shop
- [ ] At least 1 drink category
- [ ] At least 1 amenity

## Token Savings

Old way (generating each page):
- 50 shops × 3,000 tokens = 150,000 tokens

New way (data-driven):
- 1 JSON file edit = 0 tokens
- System automatically generates all pages

## Troubleshooting

**Problem**: New shop not appearing
- Solution: Run `npm run build` to regenerate pages

**Problem**: Build fails
- Solution: Validate JSON syntax at jsonlint.com

**Problem**: Page shows incorrect data
- Solution: Clear `.next` folder and rebuild

**Problem**: Location page not working
- Solution: Ensure `locationSlug` matches exactly (lowercase)

## Advanced: Bulk Import

To add many shops at once:
1. Create a spreadsheet with columns matching the data structure
2. Convert to JSON using a tool like csvjson.com
3. Paste into the `shops` array
4. Validate JSON
5. Build

## Next Steps

Want to add more features? You can manually edit:
- `/app/shops/[slug]/page.tsx` - Individual shop page template
- `/app/coffee-shops-in-[location]/page.tsx` - Location page template
- `/app/page.tsx` - Homepage
- `/lib/coffeeShops.ts` - Data loading functions

But for 99% of updates, you just need to edit `/data/coffee-shops.json`!
