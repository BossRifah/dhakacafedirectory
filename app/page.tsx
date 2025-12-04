import Link from 'next/link';
import { getAllCoffeeShops } from '@/lib/coffeeShops';

export default function Home() {
  const coffeeShops = getAllCoffeeShops();

  return (
    <main className="min-h-screen" style={{background: 'var(--off-white)'}}>
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{background: 'var(--navy-dark)'}}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{color: 'var(--white)'}}>
              Discover Dhaka's Best Coffee Shops
            </h1>
            <p className="text-lg md:text-xl mb-8" style={{color: 'var(--gray-light)'}}>
              Explore {coffeeShops.length} carefully curated coffee destinations. From specialty roasters to cozy cafés, find your perfect spot.
            </p>
            <a href="#directory" className="inline-block px-8 py-4 font-semibold text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-lg" style={{background: 'var(--red-accent)'}}>
              Browse Coffee Shops
            </a>
          </div>
        </div>
      </section>

      {/* Directory Grid */}
      <section id="directory" className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2" style={{color: 'var(--navy-dark)'}}>
              All Coffee Shops
            </h2>
            <p style={{color: 'var(--gray)'}}>
              {coffeeShops.length} locations to explore
            </p>
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {coffeeShops.map((shop) => (
            <Link key={shop.id} href={`/shops/${shop.slug}`}>
              <div className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 h-64 bg-white">
                {/* Image Background with Gradient Overlay */}
                <div className="absolute inset-0" style={{
                  background: `linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)`
                }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-8xl opacity-20 group-hover:scale-110 transition-transform duration-500">
                      ☕
                    </div>
                  </div>
                </div>

                {/* Dark Overlay for Better Text Contrast */}
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
      </section>

      {/* About Section */}
      <section className="py-20" style={{background: 'var(--navy-dark)'}}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{color: 'var(--white)'}}>
              About This Directory
            </h2>
            <p className="text-lg mb-12" style={{color: 'var(--gray-light)'}}>
              Your comprehensive guide to Dhaka's coffee culture. We've curated the finest cafés and roasters across the city, helping you discover your next favorite spot.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: '🗺️', title: 'City-Wide', desc: 'Coverage across all major areas' },
                { icon: '⭐', title: 'Verified', desc: 'Real reviews from coffee lovers' },
                { icon: '📋', title: 'Detailed', desc: 'Complete info on every shop' },
              ].map((item, idx) => (
                <div key={idx} className="p-6 rounded-xl" style={{background: 'var(--navy-light)'}}>
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-2" style={{color: 'var(--white)'}}>{item.title}</h3>
                  <p style={{color: 'var(--gray-light)'}}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
