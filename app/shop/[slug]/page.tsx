import { getCoffeeShopBySlug, getAllCoffeeShops } from '@/lib/coffeeShops';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const shops = getAllCoffeeShops();
  return shops.map((shop) => ({
    slug: shop.slug,
  }));
}

export default async function ShopPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const shop = getCoffeeShopBySlug(slug);

  if (!shop) {
    notFound();
  }

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="text-yellow-500 text-xl">★</span>
        ))}
        {hasHalfStar && <span className="text-yellow-500 text-xl">☆</span>}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300 text-xl">★</span>
        ))}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-white">
      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-amber-100 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-amber-900 hover:text-amber-700 font-medium transition-colors">
              ← Back to All Shops
            </Link>
          </div>
        </div>
      </div>

      {/* Header */}
      <section className="relative bg-gradient-to-br from-amber-950 via-amber-900 to-orange-900 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtNi42MjcgNS4zNzMtMTIgMTItMTJzMTIgNS4zNzMgMTIgMTItNS4zNzMgMTItMTIgMTItMTItNS4zNzMtMTItMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-6xl">☕</span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold border border-white/30">
                {shop.priceRange}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-amber-100 to-amber-200 bg-clip-text text-transparent">
              {shop.name}
            </h1>
            <div className="flex items-center gap-6 mb-6 flex-wrap">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/20">
                {renderStars(shop.rating)}
                <span className="text-2xl font-bold">{shop.rating}</span>
              </div>
              <span className="text-amber-100 text-lg">({shop.totalReviews} reviews)</span>
              <span className="flex items-center gap-2 text-amber-200 text-lg">
                <span>📍</span>
                {shop.area}
              </span>
            </div>
            <p className="text-xl text-amber-50 leading-relaxed max-w-3xl">
              {shop.description}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Location & Contact */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-100">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-amber-900 to-orange-800 bg-clip-text text-transparent">
                Location & Contact
              </h2>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg">
                    📍
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{shop.address}</p>
                    <p className="text-amber-700 text-sm font-medium">{shop.area}, Dhaka</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg">
                    📞
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-700 text-sm">{shop.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg">
                    🕐
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Hours</h3>
                    <p className="text-gray-700 text-sm">Weekdays: {shop.hours.weekday}</p>
                    <p className="text-gray-700 text-sm">Weekends: {shop.hours.weekend}</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <div className="bg-gradient-to-br from-amber-200 via-orange-200 to-amber-300 h-72 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMTZjMC02LjYyNyA1LjM3My0xMiAxMi0xMnMxMiA1LjM3MyAxMiAxMi01LjM3MyAxMi0xMiAxMi0xMi01LjM3My0xMi0xMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
                  <div className="relative z-10 text-center">
                    <div className="text-7xl mb-4">🗺️</div>
                    <p className="text-2xl font-bold text-amber-900 mb-2">{shop.address}</p>
                    <p className="text-lg text-gray-700 mb-4">{shop.area}, Dhaka</p>
                    <button className="bg-amber-900 text-white px-8 py-3 rounded-xl font-semibold hover:bg-amber-800 transition-all shadow-xl hover:shadow-2xl hover:scale-105">
                      Open in Google Maps
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-100">
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-amber-900 to-orange-800 bg-clip-text text-transparent">
                Menu
              </h2>
              <div className="space-y-8">
                {shop.drinks.map((category, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-xl p-6 border border-amber-100">
                    <h3 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-3">
                      <span className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center text-xl">
                        ☕
                      </span>
                      {category.category}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {category.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                          <span className="text-amber-600 text-lg">•</span>
                          <span className="text-gray-800 font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Google Reviews */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-100">
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-amber-900 to-orange-800 bg-clip-text text-transparent">
                Customer Reviews
              </h2>
              <div className="space-y-6">
                {shop.reviews.map((review, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-amber-50 to-orange-50/30 rounded-xl p-6 border border-amber-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 text-white flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-lg">
                        {review.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg">{review.author}</h3>
                            <p className="text-sm text-gray-500">{review.date}</p>
                          </div>
                          <div className="flex gap-1 bg-white px-3 py-1 rounded-lg shadow-sm">
                            {[...Array(review.rating)].map((_, i) => (
                              <span key={i} className="text-yellow-500 text-lg">★</span>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{review.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl text-center border border-amber-200">
                <p className="text-gray-800 text-lg">
                  <span className="font-bold text-amber-900">Google Rating:</span> {shop.rating}/5 based on {shop.totalReviews} reviews
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24 border border-amber-100">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-amber-900 to-orange-800 bg-clip-text text-transparent">
                Amenities
              </h2>
              <div className="space-y-3">
                {shop.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gradient-to-r from-amber-50 to-orange-50/50 rounded-lg border border-amber-100">
                    <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-gray-800 font-medium">{amenity}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-amber-200">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Price Range</h3>
                <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-4 rounded-xl border border-amber-200">
                  <p className="text-3xl font-bold text-amber-900 mb-2">{shop.priceRange}</p>
                  <p className="text-sm text-gray-700 font-medium">
                    {shop.priceRange === '৳৳৳' && 'Premium pricing'}
                    {shop.priceRange === '৳৳' && 'Moderate pricing'}
                    {shop.priceRange === '৳' && 'Budget friendly'}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/"
                  className="block w-full bg-gradient-to-r from-amber-900 to-orange-800 text-white text-center px-6 py-4 rounded-xl hover:from-amber-800 hover:to-orange-700 transition-all font-bold shadow-lg hover:shadow-xl hover:scale-105"
                >
                  ← Back to Directory
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
