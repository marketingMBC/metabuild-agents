"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Plataforma", href: "/platform" },
    { label: "Soluciones", href: "/#soluciones" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contacto", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <span className="text-xl font-bold text-white">MetaBuild</span>
            <span className="text-xl font-bold text-cyan">Agents</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-cyan transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button and Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden sm:inline-block px-6 py-2 bg-cyan text-navy font-semibold rounded-lg hover:bg-cyan-light transition-all duration-200 glow-cyan-sm"
            >
              Comenzar Gratis
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-surface-light transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-cyan" />
              ) : (
                <Menu className="w-6 h-6 text-cyan" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-cyan/20">
            <div className="flex flex-col gap-2 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-cyan hover:bg-surface/50 rounded-lg transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mx-4 px-4 py-2 bg-cyan text-navy font-semibold rounded-lg hover:bg-cyan-light transition-all duration-200 text-center"
                onClick={() => setIsOpen(false)}
              >
                Comenzar Gratis
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
