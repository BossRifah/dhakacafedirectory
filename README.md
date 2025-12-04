# Dhaka Coffee Directory ☕

A comprehensive directory website listing the best coffee shops in Dhaka, Bangladesh. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Coffee Shop Directory**: Browse all coffee shops in Dhaka with detailed information
- **Individual Shop Pages**: Each shop has its own dedicated page with:
  - Shop name and description
  - Location and address with map placeholder
  - Google Maps-style reviews and ratings
  - Complete drinks menu categorized by type
  - Operating hours and contact information
  - Amenities and price range
- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI**: Beautiful Tailwind CSS styling with amber/coffee theme
- **Dynamic Routing**: SEO-friendly URLs for each coffee shop

## Coffee Shops Included

Currently featuring 6 popular coffee shops across Dhaka:
- North End Coffee Roasters (Gulshan)
- Coffee Holic (Kuril)
- The Coffee Bean (Gulshan)
- Café Mango (Dhanmondi)
- Gloria Jean's Coffees (Panthapath)
- Barista Lavazza (Banani)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Geist Sans & Geist Mono

## Getting Started

First, install dependencies if not already installed:

```bash
npm install --cache /tmp/npm-cache
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the directory.

## Project Structure

```
app/
├── components/
│   └── Navigation.tsx           # Main navigation component
├── shop/
│   └── [slug]/
│       └── page.tsx            # Dynamic route for individual shop pages
├── page.tsx                    # Homepage with shop directory
├── layout.tsx                  # Root layout with navigation
└── globals.css                 # Global styles
lib/
└── coffeeShops.ts              # Coffee shop data and helper functions
```

## Adding New Coffee Shops

To add a new coffee shop, edit `/lib/coffeeShops.ts` and add a new entry to the `coffeeShops` array with all required information including name, location, reviews, drinks menu, and amenities.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
