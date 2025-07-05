'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Wallet,
  Banknote,
  FileText,
  Settings,
  Menu,
  X,
} from 'lucide-react';

const navLinks = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Expenses', href: '/expenses', icon: Wallet },
  { name: 'Revenue', href: '/revenue', icon: Banknote },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 5);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black border-b border-gray-800 shadow-lg' : 'bg-black'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        {/* LOGO */}
        <div className="text-white font-extrabold text-xl tracking-widest flex items-center gap-2">
          <LayoutDashboard className="text-blue-500" />
          FinScope
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map(({ name, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group relative uppercase text-white tracking-widest text-sm font-semibold flex items-center gap-2"
            >
              <Icon size={18} className="text-blue-400 transition group-hover:scale-110" />
              <span className="relative block">
                <span className="group-hover:text-blue-400 transition duration-300">
                  {name}
                </span>
                <span className="block h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-500 mt-[3px]"></span>
              </span>
            </Link>
          ))}
        </nav>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE NAV */}
      {mobileOpen && (
        <div className="md:hidden fixed top-[65px] w-full bg-black text-white py-6 px-6 space-y-4 border-t border-gray-800 shadow-inner">
          {navLinks.map(({ name, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 text-base font-semibold uppercase tracking-wide border-b border-gray-800 pb-2"
            >
              <Icon size={18} className="text-blue-400" />
              {name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
