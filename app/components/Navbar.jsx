'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TrendingUp, Moon, Home, BookOpen, Menu, X, Star, Eclipse } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Modern scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/wcl', label: 'WCL Chart', icon: TrendingUp },
    { href: '/dcl', label: 'DCL Chart', icon: TrendingUp },
    { href: '/moon', label: 'Moon Phases', icon: Moon },
    { href: '/halving', label: 'Halving', icon: Star },
    { href: '/ath-atl', label: 'ATH-ATL', icon: BookOpen },
    { href: '/time-trading', label: 'Time Trade', icon: Star },
    { href: '/astrology', label: 'Astro', icon: Eclipse },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-slate-900/90 backdrop-blur-xl border-b border-purple-500/20 shadow-lg shadow-purple-900/20' 
        : 'bg-slate-900/50 backdrop-blur-lg border-b border-purple-500/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo Area */}
          <Link href="/" className="flex items-center gap-3 group" onClick={closeMobileMenu}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 group-hover:bg-purple-600/40 transition-colors">
              <TrendingUp className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
            </div>
            <span className="text-white font-bold text-lg tracking-wide hidden sm:block group-hover:text-purple-200 transition-colors">
              CryptoCycle
            </span>
          </Link>

          {/* Desktop Navigation (Modern Icon Dock) */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2 bg-slate-800/40 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700/50">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <div key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className={`flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40 scale-105'
                        : 'text-gray-400 hover:bg-slate-700 hover:text-white hover:scale-105'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                  
                  {/* Modern Tooltip */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 px-3 py-1.5 bg-slate-800 text-gray-200 text-xs font-semibold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 border border-slate-700 shadow-2xl">
                    {item.label}
                    {/* Tooltip Arrow */}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 border-t border-l border-slate-700 transform rotate-45"></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-slate-800/50 border border-slate-700/50 text-gray-300 hover:bg-slate-700 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Grid layout) */}
      <div className={`md:hidden absolute w-full transition-all duration-300 ease-in-out origin-top ${
        isMobileMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
      }`}>
        <div className="bg-slate-900/95 backdrop-blur-xl border-b border-purple-500/20 px-4 py-5 shadow-2xl">
          <div className="grid grid-cols-4 gap-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`flex flex-col items-center justify-center gap-2 p-3 rounded-2xl transition-all ${
                    isActive
                      ? 'bg-purple-600/20 border border-purple-500/30 text-purple-300'
                      : 'bg-slate-800/30 border border-slate-700/30 text-gray-400 hover:bg-slate-800 hover:text-gray-200'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isActive ? 'text-purple-400' : ''}`} />
                  <span className="text-[10px] font-semibold text-center leading-tight">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}