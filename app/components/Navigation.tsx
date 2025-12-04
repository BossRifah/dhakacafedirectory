import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg shadow-sm" style={{background: 'rgba(26, 29, 41, 0.95)', borderBottom: '1px solid rgba(255,255,255,0.1)'}}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="text-3xl group-hover:scale-110 transition-transform duration-300">☕</div>
            <div>
              <div className="text-xl font-bold" style={{color: 'var(--white)'}}>
                Dhaka Coffee
              </div>
              <div className="text-xs" style={{color: 'var(--gray-light)'}}>
                Directory
              </div>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link href="/" className="font-medium hover:text-white transition-colors" style={{color: 'var(--gray-light)'}}>
              Home
            </Link>
            <Link href="/#directory" className="font-medium hover:text-white transition-colors" style={{color: 'var(--gray-light)'}}>
              Browse
            </Link>
            <Link href="/#about" className="font-medium hover:text-white transition-colors" style={{color: 'var(--gray-light)'}}>
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
