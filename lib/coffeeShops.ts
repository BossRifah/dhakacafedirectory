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

export const coffeeShops: CoffeeShop[] = [
  {
    id: "1",
    name: "North End Coffee Roasters",
    slug: "north-end-coffee-roasters-gulshan",
    locationSlug: "gulshan",
    address: "House 13, Road 27, Gulshan 1",
    area: "Gulshan",
    phone: "+880 1234-567890",
    hours: {
      weekday: "8:00 AM - 10:00 PM",
      weekend: "9:00 AM - 11:00 PM"
    },
    rating: 4.8,
    totalReviews: 342,
    priceRange: "৳৳৳",
    description: "A specialty coffee roastery and café serving single-origin beans roasted in-house. Known for their expertly crafted pour-overs and espresso drinks in a modern, minimalist setting.",
    reviews: [
      {
        author: "Mahir Rahman",
        rating: 5,
        date: "2 weeks ago",
        text: "Best coffee in Dhaka! The baristas really know their craft. The cortado was perfectly balanced and the ambiance is great for working."
      },
      {
        author: "Nadia Ahmed",
        rating: 5,
        date: "1 month ago",
        text: "Love this place! Their single-origin pour-over is exceptional. Staff is knowledgeable and friendly. A bit pricey but worth it."
      },
      {
        author: "Rafsan Khan",
        rating: 4,
        date: "2 months ago",
        text: "Great coffee and atmosphere. Can get crowded on weekends. The flat white is my favorite here."
      }
    ],
    drinks: [
      {
        category: "Espresso Based",
        items: ["Espresso", "Americano", "Cappuccino", "Latte", "Flat White", "Cortado", "Macchiato"]
      },
      {
        category: "Filter Coffee",
        items: ["Pour Over", "V60", "Chemex", "Aeropress", "French Press"]
      },
      {
        category: "Cold Coffee",
        items: ["Cold Brew", "Iced Latte", "Iced Americano", "Nitro Cold Brew"]
      },
      {
        category: "Specialty",
        items: ["Mocha", "Caramel Latte", "Vanilla Latte", "Spanish Latte"]
      }
    ],
    amenities: ["Free WiFi", "Power Outlets", "Air Conditioned", "Outdoor Seating", "Parking"]
  },
  {
    id: "2",
    name: "Coffee Holic",
    slug: "coffee-holic-kuril",
    locationSlug: "kuril",
    address: "Level 6, Jamuna Future Park",
    area: "Kuril",
    phone: "+880 1345-678901",
    hours: {
      weekday: "10:00 AM - 10:00 PM",
      weekend: "10:00 AM - 11:00 PM"
    },
    rating: 4.5,
    totalReviews: 567,
    priceRange: "৳৳",
    description: "Popular café chain known for their affordable coffee and cozy atmosphere. Great spot for casual meetups with friends or studying.",
    reviews: [
      {
        author: "Tasnia Haque",
        rating: 5,
        date: "1 week ago",
        text: "My go-to place at Jamuna Future Park. Good coffee at reasonable prices. Love their iced caramel latte!"
      },
      {
        author: "Fahim Islam",
        rating: 4,
        date: "3 weeks ago",
        text: "Decent coffee and nice ambiance. Good for hanging out with friends. Can be noisy during peak hours."
      },
      {
        author: "Sadia Karim",
        rating: 5,
        date: "1 month ago",
        text: "Great place to relax after shopping. Their mocha is delicious and the staff is very friendly."
      }
    ],
    drinks: [
      {
        category: "Hot Coffee",
        items: ["Espresso", "Americano", "Cappuccino", "Latte", "Mocha", "Caramel Macchiato"]
      },
      {
        category: "Iced Coffee",
        items: ["Iced Latte", "Iced Americano", "Iced Mocha", "Iced Caramel Latte", "Frappe"]
      },
      {
        category: "Non-Coffee",
        items: ["Hot Chocolate", "Chai Latte", "Matcha Latte", "Various Teas"]
      }
    ],
    amenities: ["Free WiFi", "Air Conditioned", "Indoor Seating", "Mall Location"]
  },
  {
    id: "3",
    name: "The Coffee Bean",
    slug: "the-coffee-bean-gulshan",
    locationSlug: "gulshan",
    address: "Plot 11, Road 113, Gulshan 2",
    area: "Gulshan",
    phone: "+880 1456-789012",
    hours: {
      weekday: "7:00 AM - 11:00 PM",
      weekend: "8:00 AM - 11:00 PM"
    },
    rating: 4.6,
    totalReviews: 428,
    priceRange: "৳৳৳",
    description: "International coffee chain offering a wide variety of coffee drinks and pastries. Consistent quality and comfortable seating make it ideal for both work and leisure.",
    reviews: [
      {
        author: "Anika Chowdhury",
        rating: 5,
        date: "5 days ago",
        text: "Excellent place for a coffee date or casual business meeting. Their vanilla latte never disappoints."
      },
      {
        author: "Imran Hassan",
        rating: 4,
        date: "2 weeks ago",
        text: "Good coffee and reliable WiFi. A bit expensive but the quality is consistent. Great for working remotely."
      },
      {
        author: "Maliha Tabassum",
        rating: 5,
        date: "3 weeks ago",
        text: "Love the ambiance! Perfect spot for studying. The iced mocha is my favorite."
      }
    ],
    drinks: [
      {
        category: "Espresso Beverages",
        items: ["Espresso", "Double Espresso", "Americano", "Cappuccino", "Latte", "Flat White"]
      },
      {
        category: "Signature Drinks",
        items: ["Vanilla Latte", "Caramel Macchiato", "Mocha", "White Chocolate Mocha", "Hazelnut Latte"]
      },
      {
        category: "Cold Drinks",
        items: ["Iced Latte", "Iced Americano", "Cold Brew", "Iced Mocha", "Frappuccino"]
      },
      {
        category: "Tea & Others",
        items: ["Chai Latte", "Matcha Latte", "Hot Chocolate", "English Breakfast Tea", "Green Tea"]
      }
    ],
    amenities: ["Free WiFi", "Power Outlets", "Air Conditioned", "Comfortable Seating", "Meeting Rooms"]
  },
  {
    id: "4",
    name: "Café Mango",
    slug: "cafe-mango-dhanmondi",
    locationSlug: "dhanmondi",
    address: "House 45, Road 12, Dhanmondi",
    area: "Dhanmondi",
    phone: "+880 1567-890123",
    hours: {
      weekday: "9:00 AM - 10:00 PM",
      weekend: "9:00 AM - 11:00 PM"
    },
    rating: 4.4,
    totalReviews: 289,
    priceRange: "৳৳",
    description: "Cozy neighborhood café with a homely vibe. Known for their delicious food alongside quality coffee. Popular among locals and university students.",
    reviews: [
      {
        author: "Labib Rahman",
        rating: 4,
        date: "1 week ago",
        text: "Nice cozy place in Dhanmondi. Coffee is good and the food is even better. Great for brunch!"
      },
      {
        author: "Nabila Hussain",
        rating: 5,
        date: "2 weeks ago",
        text: "My favorite café in the area! The staff remembers my usual order. Love the relaxed atmosphere."
      },
      {
        author: "Tanvir Ahmed",
        rating: 4,
        date: "1 month ago",
        text: "Good coffee at reasonable prices. The breakfast menu is excellent. Can get a bit crowded during weekends."
      }
    ],
    drinks: [
      {
        category: "Coffee",
        items: ["Espresso", "Americano", "Cappuccino", "Latte", "Mocha", "Caramel Latte"]
      },
      {
        category: "Iced Beverages",
        items: ["Iced Coffee", "Iced Latte", "Iced Mocha", "Cold Brew"]
      },
      {
        category: "Non-Coffee",
        items: ["Hot Chocolate", "Chai", "Lemon Tea", "Milk Tea"]
      }
    ],
    amenities: ["Free WiFi", "Air Conditioned", "Outdoor Seating", "Pet Friendly", "Breakfast Menu"]
  },
  {
    id: "5",
    name: "Gloria Jean's Coffees",
    slug: "gloria-jeans-coffees-panthapath",
    locationSlug: "panthapath",
    address: "Bashundhara City Shopping Mall, Level 7",
    area: "Panthapath",
    phone: "+880 1678-901234",
    hours: {
      weekday: "10:00 AM - 10:00 PM",
      weekend: "10:00 AM - 10:00 PM"
    },
    rating: 4.3,
    totalReviews: 512,
    priceRange: "৳৳",
    description: "International coffee chain located in Bashundhara City. Offers a variety of flavored coffees and comfortable seating. Great place to take a break while shopping.",
    reviews: [
      {
        author: "Riya Sultana",
        rating: 4,
        date: "3 days ago",
        text: "Good spot for a coffee break during shopping. Their hazelnut latte is delicious!"
      },
      {
        author: "Shahriar Kabir",
        rating: 4,
        date: "1 week ago",
        text: "Decent coffee and nice location in the mall. Good service and clean environment."
      },
      {
        author: "Farhana Akter",
        rating: 5,
        date: "2 weeks ago",
        text: "Love their flavored coffees! The vanilla and caramel options are amazing. Staff is very friendly."
      }
    ],
    drinks: [
      {
        category: "Espresso",
        items: ["Espresso", "Long Black", "Cappuccino", "Latte", "Flat White", "Piccolo"]
      },
      {
        category: "Flavored Coffees",
        items: ["Vanilla Latte", "Caramel Latte", "Hazelnut Latte", "Irish Cream Latte", "Butterscotch Latte"]
      },
      {
        category: "Chillers & Frappes",
        items: ["Mocha Chiller", "Caramel Chiller", "Vanilla Frappe", "Chocolate Frappe"]
      },
      {
        category: "Alternative",
        items: ["Hot Chocolate", "Chai Latte", "Tea Selection"]
      }
    ],
    amenities: ["Free WiFi", "Air Conditioned", "Mall Location", "Comfortable Seating"]
  },
  {
    id: "6",
    name: "Barista Lavazza",
    slug: "barista-lavazza-banani",
    locationSlug: "banani",
    address: "House 27, Road 8, Block F, Banani",
    area: "Banani",
    phone: "+880 1789-012345",
    hours: {
      weekday: "8:00 AM - 11:00 PM",
      weekend: "9:00 AM - 11:00 PM"
    },
    rating: 4.7,
    totalReviews: 394,
    priceRange: "৳৳৳",
    description: "Premium Italian coffee experience in the heart of Banani. Serves authentic Lavazza coffee with expert baristas. Elegant interior perfect for business meetings or a quiet coffee break.",
    reviews: [
      {
        author: "Zayan Ahmed",
        rating: 5,
        date: "4 days ago",
        text: "Authentic Italian espresso! The quality is outstanding. A must-visit for coffee lovers in Dhaka."
      },
      {
        author: "Priya Sharma",
        rating: 5,
        date: "1 week ago",
        text: "Beautiful ambiance and excellent coffee. Their cappuccino is perfect. Great place for meetings."
      },
      {
        author: "Karim Benzema",
        rating: 4,
        date: "2 weeks ago",
        text: "Premium coffee at premium prices. Worth it for the quality. The espresso is strong and flavorful."
      }
    ],
    drinks: [
      {
        category: "Classic Espresso",
        items: ["Espresso", "Ristretto", "Lungo", "Americano", "Macchiato"]
      },
      {
        category: "Milk Based",
        items: ["Cappuccino", "Latte", "Flat White", "Cortado", "Café au Lait"]
      },
      {
        category: "Specialty",
        items: ["Affogato", "Espresso Con Panna", "Café Mocha", "Caramel Macchiato"]
      },
      {
        category: "Cold Options",
        items: ["Iced Latte", "Cold Brew", "Shakerato", "Iced Americano"]
      }
    ],
    amenities: ["Free WiFi", "Premium Seating", "Air Conditioned", "Private Booths", "Italian Pastries"]
  }
];

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
  }
};
