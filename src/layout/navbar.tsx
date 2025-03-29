/* eslint-disable no-restricted-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, User, Wallet} from 'lucide-react';
import CustomConnectButton from '@/components/connect-wallet/custom-connect-wallet';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import logo from "../../public/img/newlogo.png";

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'Explore', href: '/explore' },
  { name: 'For Creators', href: '/creators' },
  { name: 'For Platforms', href: '/platforms' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Change header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-900/90 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-10 h-10 mr-2">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600" />
              <div className="absolute inset-0.5 rounded-full bg-black flex items-center justify-center">
                <Image src={logo} alt='logo' width={200} height={100}/>
              </div>
            </div>
            <span className="text-2xl font-bold text-white">Clarylisk</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors ${
                  link.name === 'Explore' ? 'font-medium text-white' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Custom Connect Wallet Button */}
            <CustomConnectButton />

            {/* Profile Dropdown
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full border-white/20 text-white hover:bg-white/10">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-gray-800 border border-white/10 text-white">
                <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <CustomConnectButton />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center justify-center p-2 rounded-lg text-white hover:bg-white/10"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-gray-900/95 backdrop-blur-lg md:hidden z-40 p-4">
          <div className="flex flex-col h-full">
            <nav className="flex flex-col space-y-2 mt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            
            <div className="mt-auto mb-8 space-y-4">
              <Button
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}