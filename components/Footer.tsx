"use client";

import Link from "next/link";
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-8 left-0 right-0">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Section: Branding and Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Branding */}
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-2xl font-bold text-white">
              CivicVoice
            </Link>
            <p className="text-sm">Empowering Civic Engagement</p>
          </div>
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center space-x-6">
            <Link href="/about" className="hover:text-white">
              About Us
            </Link>
            <Link href="/services" className="hover:text-white">
              Services
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
            <Link href="/issues" className="hover:text-white">
              Issues
            </Link>
          </div>
        </div>
        {/* Middle Section: Social Icons
        <div className="mt-8 flex justify-center space-x-4">
          <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <Twitter className="h-5 w-5" />
          </Link>
          <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <Facebook className="h-5 w-5" />
          </Link>
          <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <Instagram className="h-5 w-5" />
          </Link>
          <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <Linkedin className="h-5 w-5" />
          </Link>
        </div> */}
        {/* Bottom Section: Copyright */}
        <div className="mt-8 text-center text-sm">
          &copy; {new Date().getFullYear()} CivicVoice. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
