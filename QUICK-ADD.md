# Quick Add Guide - Add a Coffee Shop in 5 Minutes

## Step 1: Open the Data File
Edit: `/data/coffee-shops.json`

## Step 2: Copy This Template & Fill It Out

```json
{
  "id": "7",
  "name": "Coffee Shop Name Here",
  "slug": "coffee-shop-name-here-gulshan",
  "locationSlug": "gulshan",
  "address": "House XX, Road YY, Gulshan",
  "area": "Gulshan",
  "phone": "+880 1XXX-XXXXXX",
  "hours": {
    "weekday": "8:00 AM - 10:00 PM",
    "weekend": "9:00 AM - 11:00 PM"
  },
  "rating": 4.5,
  "totalReviews": 100,
  "priceRange": "৳৳",
  "description": "One sentence description of what makes this place special.",
  "reviews": [
    {
      "author": "Customer Name",
      "rating": 5,
      "date": "1 week ago",
      "text": "Great coffee and cozy atmosphere. Perfect for working!"
    },
    {
      "author": "Another Customer",
      "rating": 4,
      "date": "2 weeks ago",
      "text": "Good coffee but can get crowded. Still worth visiting."
    },
    {
      "author": "Third Customer",
      "rating": 5,
      "date": "1 month ago",
      "text": "Best latte in the area. Friendly staff and clean space."
    }
  ],
  "drinks": [
    {
      "category": "Hot Coffee",
      "items": ["Espresso", "Americano", "Latte", "Cappuccino", "Mocha"]
    },
    {
      "category": "Iced Coffee",
      "items": ["Iced Latte", "Iced Americano", "Cold Brew"]
    }
  ],
  "amenities": ["Free WiFi", "Air Conditioned", "Power Outlets"]
}
```

## Step 3: Paste into JSON File

Add a comma after the last shop object, then paste your new shop.

## Step 4: Build

```bash
npm run build
```

Done! Your shop is live at `/shops/coffee-shop-name-here-gulshan`

## Quick Reference

**Price Ranges:**
- `৳` = Budget (under 200 BDT)
- `৳৳` = Moderate (200-500 BDT)
- `৳৳৳` = Premium (500+ BDT)

**Locations (pick one):**
- gulshan
- banani
- dhanmondi
- kuril
- panthapath

**Common Amenities:**
Free WiFi, Power Outlets, Air Conditioned, Outdoor Seating, Parking, Pet Friendly, Meeting Rooms, Mall Location

**Slug Format:**
Always lowercase with hyphens: `shop-name-location`

## Example: Real Addition

```json
{
  "id": "7",
  "name": "Brew & Bites",
  "slug": "brew-and-bites-banani",
  "locationSlug": "banani",
  "address": "House 35, Road 11, Banani",
  "area": "Banani",
  "phone": "+880 1890-123456",
  "hours": {
    "weekday": "7:00 AM - 11:00 PM",
    "weekend": "8:00 AM - 12:00 AM"
  },
  "rating": 4.6,
  "totalReviews": 223,
  "priceRange": "৳৳",
  "description": "Modern café specializing in artisan coffee and fresh pastries. Popular brunch spot with a vibrant community atmosphere.",
  "reviews": [
    {
      "author": "Sarah Ahmed",
      "rating": 5,
      "date": "3 days ago",
      "text": "Amazing brunch menu! The avocado toast and flat white combo is perfection."
    },
    {
      "author": "Rizwan Khan",
      "rating": 4,
      "date": "1 week ago",
      "text": "Great coffee and good vibes. Parking can be tricky though."
    },
    {
      "author": "Mira Hassan",
      "rating": 5,
      "date": "2 weeks ago",
      "text": "My favorite weekend spot! The croissants are fresh and the staff is super friendly."
    }
  ],
  "drinks": [
    {
      "category": "Espresso Based",
      "items": ["Espresso", "Americano", "Cappuccino", "Latte", "Flat White", "Macchiato"]
    },
    {
      "category": "Cold Drinks",
      "items": ["Iced Latte", "Cold Brew", "Iced Mocha", "Frappe"]
    },
    {
      "category": "Non-Coffee",
      "items": ["Matcha Latte", "Hot Chocolate", "Chai Tea", "Fresh Juice"]
    }
  ],
  "amenities": ["Free WiFi", "Air Conditioned", "Outdoor Seating", "Brunch Menu", "Pet Friendly"]
}
```

Now just add this to your `/data/coffee-shops.json` and run `npm run build`!

## Token Savings

Traditional way: ~3,000 tokens per shop page
This way: 0 tokens (manual JSON edit)

To add 50 shops:
- Old: 150,000 tokens
- New: 0 tokens + 10 minutes of copy-paste
