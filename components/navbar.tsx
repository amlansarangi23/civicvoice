"use client";

import { signOut, useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { Bell, User, Menu, X } from "lucide-react";
import Link from "next/link";

export const Navbar = () => {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close user dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md p-4 relative flex items-center justify-between">
      {/* Left: Logo and mobile hamburger */}
      <div className="flex items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          CivicVoice
        </Link>
        {/* Hamburger icon for mobile */}
        <button
          className="ml-4 md:hidden"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Middle: Navigation Tabs (visible on md and up) */}
      <div className="hidden md:flex space-x-6">
        {session && (
          <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
            Dashboard
          </Link>
        )}
        <Link href="/about" className="text-gray-700 hover:text-blue-600">
          About Us
        </Link>
        <Link href="/services" className="text-gray-700 hover:text-blue-600">
          Services
        </Link>
        <Link href="/contact" className="text-gray-700 hover:text-blue-600">
          Contact Us
        </Link>
      </div>

      {/* Right: Notifications & User Dropdown/Sign In */}
      <div className="flex items-center space-x-4">
        {/* Notification Bell */}
        <button className="p-2 rounded-full hover:bg-gray-200">
          <Bell className="h-6 w-6 text-gray-700" />
        </button>

        {/* User Icon & Dropdown if signed in, else Sign In button */}
        {status === "authenticated" ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center p-2 rounded-full hover:bg-gray-200"
            >
              <User className="h-6 w-6 text-gray-700" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-10">
                <div className="p-4 border-b">
                  <p className="font-semibold text-gray-900">
                    {session.user.username}
                  </p>
                  <p className="text-sm text-gray-900">{session.user.email}</p>
                  <p className="text-sm text-gray-900">
                    {session.user.localityName}
                  </p>
                </div>
                <ul>
                  <li>
                    <Link
                      href="/citizenissues"
                      className="block px-4 py-2 text-slate-700 hover:bg-gray-100"
                    >
                      Issues
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full text-left px-4 py-2 text-slate-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/signin"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Sign In
          </Link>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden">
          <div className="flex flex-col p-4 space-y-4">
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 hover:text-blue-600"
            >
              About Us
            </Link>
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 hover:text-blue-600"
            >
              Services
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 hover:text-blue-600"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
