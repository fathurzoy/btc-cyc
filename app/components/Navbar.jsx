'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TrendingUp, Moon, Home, BookOpen, Menu, X, Star } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/wcl', label: 'WCL Chart', icon: TrendingUp },
    { href: '/moon', label: 'Moon Phases', icon: Moon },
    { href: '/ath-atl', label: 'ATH-ATL', icon: BookOpen },
    { href: '/time-trading', label: 'Time Trading', icon: Star },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-purple-500/30 sticky top-0 z-50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" onClick={closeMobileMenu}>
            <div className="relative">
              <div className="absolute inset-0 bg-purple-600 rounded-full blur-md group-hover:blur-lg transition-all"></div>
              <TrendingUp className="w-8 h-8 text-purple-400 relative z-10" />
            </div>
            <span className="text-white font-bold text-lg sm:text-xl">
              Crypto Cycle
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/50'
                      : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-base font-medium">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:bg-slate-800 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-purple-500/30 bg-slate-900/95 backdrop-blur-lg">
          <div className="px-4 py-3 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/50'
                      : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-base font-medium">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}