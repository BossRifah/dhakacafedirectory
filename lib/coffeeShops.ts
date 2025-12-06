import coffeeShopsData from '../data/coffee-shops.json';

export interface CoffeeShop {
  id: string;
  name: string;
  slug: string;
  locationSlug: string;
  address: string;
  area: string;
  phone: string;
  hours: {
    weekday: string;
    weekend: string;
  };
  rating: number;
  totalReviews: number;
  priceRange: string;
  description: string;
  reviews: {
    author: string;
    rating: number;
    date: string;
    text: string;
  }[];
  drinks: {
    category: string;
    items: string[];
  }[];
  amenities: string[];
  image?: string;
}

export const coffeeShops: CoffeeShop[] = coffeeShopsData.shops;

export function getCoffeeShopBySlug(slug: string): CoffeeShop | undefined {
  return coffeeShops.find(shop => shop.slug === slug);
}

export function getAllCoffeeShops(): CoffeeShop[] {
  return coffeeShops;
}

export function getCoffeeShopsByLocation(locationSlug: string): CoffeeShop[] {
  return coffeeShops.filter(shop => shop.locationSlug === locationSlug);
}

export function getAllLocations(): { slug: string; name: string; count: number }[] {
  const locationMap = new Map<string, { name: string; count: number }>();

  coffeeShops.forEach(shop => {
    const existing = locationMap.get(shop.locationSlug);
    if (existing) {
      existing.count++;
    } else {
      locationMap.set(shop.locationSlug, { name: shop.area, count: 1 });
    }
  });

  return Array.from(locationMap.entries()).map(([slug, data]) => ({
    slug,
    name: data.name,
    count: data.count
  }));
}

export const locationContent: Record<string, { description: string; highlights: string[] }> = {
  gulshan: {
    description: "Gulshan is Dhaka's premier diplomatic and upscale residential area, home to some of the city's finest specialty coffee shops. Known for its tree-lined avenues and cosmopolitan atmosphere, this neighborhood attracts coffee enthusiasts seeking quality and ambiance.",
    highlights: [
      "Premium specialty coffee roasters",
      "Modern, minimalist café designs",
      "Popular among expats and professionals",
      "Higher-end coffee experience"
    ]
  },
  banani: {
    description: "Banani is a bustling commercial and residential area known for its vibrant café culture. The neighborhood offers an excellent mix of international coffee chains and boutique cafés, making it a favorite destination for both business meetings and casual hangouts.",
    highlights: [
      "Diverse café options",
      "Great for business meetings",
      "Lively atmosphere",
      "Mix of local and international brands"
    ]
  },
  dhanmondi: {
    description: "Dhanmondi is one of Dhaka's most beloved residential areas, offering a more relaxed and community-focused coffee culture. The neighborhood is popular among students, artists, and locals who appreciate cozy, neighborhood cafés with character.",
    highlights: [
      "Cozy neighborhood cafés",
      "Student-friendly pricing",
      "Relaxed, homely atmosphere",
      "Strong local community feel"
    ]
  },
  kuril: {
    description: "Kuril, home to Jamuna Future Park (one of South Asia's largest shopping malls), offers convenient café options for shoppers and mall-goers. The area provides accessible coffee experiences in a modern retail environment.",
    highlights: [
      "Mall-based cafés",
      "Convenient shopping location",
      "Family-friendly environment",
      "Easy accessibility"
    ]
  },
  panthapath: {
    description: "Panthapath is a major commercial hub in Dhaka, housing the iconic Bashundhara City Shopping Complex. The area's coffee shops cater to busy shoppers and urban professionals looking for quality coffee in a convenient location.",
    highlights: [
      "Central location",
      "Shopping mall cafés",
      "High foot traffic area",
      "Convenient transit connections"
    ]
  },
  uttara: {
    description: "Uttara is a planned residential area in northern Dhaka, known for its wide roads and modern infrastructure. The area offers a growing café scene with specialty coffee roasters and comfortable spaces perfect for work and socializing.",
    highlights: [
      "Modern planned community",
      "Spacious café environments",
      "Good parking facilities",
      "Growing specialty coffee scene"
    ]
  },
  bashundhara: {
    description: "Bashundhara Residential Area is one of Dhaka's largest planned communities, featuring modern amenities and family-friendly environments. Coffee shops here offer calm retreats from the city's hustle with comfortable seating and warm atmospheres.",
    highlights: [
      "Peaceful residential setting",
      "Family-friendly cafés",
      "Modern infrastructure",
      "Comfortable work spaces"
    ]
  },
  mirpur: {
    description: "Mirpur is a densely populated area in northwestern Dhaka with a vibrant local culture. The emerging coffee scene brings quality specialty coffee to the community with affordable prices and modern aesthetics.",
    highlights: [
      "Growing coffee culture",
      "Affordable pricing",
      "Local community focus",
      "Modern café spaces"
    ]
  }
};
