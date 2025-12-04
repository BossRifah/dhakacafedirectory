import { getCoffeeShopsByLocation, getAllLocations, locationContent } from '@/lib/coffeeShops';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const locations = getAllLocations();
  return locations.map((location) => ({
    location: location.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ location: string }> }): Promise<Metadata> {
  const { location } = await params;
  const locations = getAllLocations();
  const locationData = locations.find(loc => loc.slug === location);

  if (!locationData) {
    return {
      title: 'Location Not Found',
    };
  }

  return {
    title: `Best Coffee Shops in ${locationData.name}, Dhaka - Dhaka Coffee Directory`,
    description: `Discover the best coffee shops in ${locationData.name}. Find ${locationData.count} cafés with reviews, menus, and locations. Your guide to ${locationData.name}'s coffee culture.`,
  };
}

export default async function LocationPage({ params }: { params: Promise<{ location: string }> }) {
  const { location } = await params;
  const shops = getCoffeeShopsByLocation(location);
  const locations = getAllLocations();
  const locationData = locations.find(loc => loc.slug === location);
  const content = locationContent[location];

  if (!locationData || shops.length === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen" style={{background: 'var(--off-white)'}}>
      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="hover:underline" style={{color: 'var(--gray)'}}>
              Home
            </Link>
            <span style={{color: 'var(--gray)'}}>→</span>
            <span style={{color: 'var(--navy-dark)'}} className="font-medium">
              Coffee Shops in {locationData.name}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{background: 'var(--navy-dark)'}}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{color: 'var(--white)'}}>
              Coffee Shops in {locationData.name}
            </h1>
            <p className="text-lg md:text-xl mb-8" style={{color: 'var(--gray-light)'}}>
              {content?.description || `Explore ${locationData.count} coffee ${locationData.count === 1 ? 'shop' : 'shops'} in ${locationData.name}, Dhaka.`}
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="px-6 py-3 rounded-lg backdrop-blur-sm" style={{background: 'rgba(255,255,255,0.1)', borderWidth: '1px', borderColor: 'rgba(255,255,255,0.2)'}}>
                <span className="text-2xl font-bold" style={{color: 'var(--white)'}}>{locationData.count}</span>
                <span className="ml-2" style={{color: 'var(--gray-light)'}}>Coffee {locationData.count === 1 ? 'Shop' : 'Shops'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Area Highlights */}
            {content && (
              <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-gray-200">
                <h2 className="text-2xl font-bold mb-4" style={{color: 'var(--navy-dark)'}}>
                  Why Visit {locationData.name}?
                </h2>
                <ul className="space-y-3">
                  {content.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{background: 'var(--red-accent)'}}>
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Coffee Shops Grid */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-6" style={{color: 'var(--navy-dark)'}}>
                All Coffee Shops in {locationData.name}
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {shops.map((shop) => (
                  <Link key={shop.id} href={`/shops/${shop.slug}`}>
                    <div className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 h-64 bg-white">
                      {/* Gradient Background */}
                      <div className="absolute inset-0" style={{
                        background: `linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)`
                      }}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-8xl opacity-20 group-hover:scale-110 transition-transform duration-500">
                            ☕
                          </div>
                        </div>
                      </div>

                      {/* Dark Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/90 transition-all duration-300"></div>

                      {/* Content */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-between">
                        {/* Top: Rating Badge */}
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur-sm" style={{background: 'rgba(255,255,255,0.2)'}}>
                            <span className="text-yellow-400 text-sm">★</span>
                            <span className="text-white text-sm font-semibold">{shop.rating}</span>
                          </div>
                          <div className="px-3 py-1 rounded-full backdrop-blur-sm text-xs font-medium" style={{background: 'rgba(255,255,255,0.2)', color: 'white'}}>
                            {shop.priceRange}
                          </div>
                        </div>

                        {/* Bottom: Shop Info */}
                        <div>
                          <h3 className="text-white text-xl font-bold mb-2 group-hover:translate-x-1 transition-transform duration-300">
                            {shop.name}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            <svg className="w-4 h-4 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-white text-sm opacity-90">{shop.area}</span>
                          </div>
                          <p className="text-white text-xs opacity-70 line-clamp-2">
                            {shop.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
              <h2 className="text-2xl font-bold mb-6" style={{color: 'var(--navy-dark)'}}>
                Map of Coffee Shops in {locationData.name}
              </h2>
              <div className="rounded-xl overflow-hidden">
                <div className="bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 h-96 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMTZjMC02LjYyNyA1LjM3My0xMiAxMi0xMnMxMiA1LjM3MyAxMiAxMi01LjM3MyAxMi0xMiAxMi0xMi01LjM3My0xMi0xMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
                  <div className="relative z-10 text-center">
                    <div className="text-7xl mb-4">🗺️</div>
                    <p className="text-2xl font-bold mb-2" style={{color: 'var(--navy-dark)'}}>
                      {locationData.name}, Dhaka
                    </p>
                    <p className="text-lg text-gray-700 mb-4">
                      {locationData.count} coffee {locationData.count === 1 ? 'shop' : 'shops'} in this area
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24 border border-gray-200">
              <h3 className="text-xl font-bold mb-4" style={{color: 'var(--navy-dark)'}}>
                Other Locations
              </h3>
              <div className="space-y-3">
                {locations.filter(loc => loc.slug !== location).map((loc) => (
                  <Link
                    key={loc.slug}
                    href={`/coffee-shops-in-${loc.slug}`}
                    className="block p-3 rounded-lg hover:shadow-md transition-shadow"
                    style={{background: 'var(--off-white)'}}
                  >
                    <div className="font-semibold" style={{color: 'var(--navy-dark)'}}>{loc.name}</div>
                    <div className="text-sm" style={{color: 'var(--gray)'}}>
                      {loc.count} coffee {loc.count === 1 ? 'shop' : 'shops'}
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link
                  href="/"
                  className="block w-full text-center px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  style={{background: 'var(--red-accent)', color: 'var(--white)'}}
                >
                  View All Shops
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
