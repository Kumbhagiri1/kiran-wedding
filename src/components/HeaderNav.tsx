"use client";

import React, { useState, useEffect } from "react";
import { Share2, Menu, X, Heart, Calendar } from "lucide-react";
import { WEDDING_DATA } from "@/config/weddingData";
import { ShareModal } from "./ShareModal";

export function HeaderNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Invocations", href: "#invocations" },
    { label: "Invitation", href: "#invitation" },
    { label: "Bride & Groom", href: "#couple" },
    { label: "2-Day Schedule", href: "#itinerary" },
    { label: "Muhurtham", href: "#muhurtham" },
    { label: "Venue", href: "#venue" },
    { label: "Stay", href: "#accommodation" },
    { label: "Family", href: "#family" },
    { label: "RSVP", href: "#rsvp" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#42101F]/95 backdrop-blur-md border-b border-gold-antique/40 py-2.5 shadow-royal"
            : "bg-gradient-to-b from-[#2A0B14]/80 to-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center space-x-2 group"
          >
            <span className="w-8 h-8 rounded-full border border-gold-antique bg-[#641B2E] flex items-center justify-center font-heading text-gold-champagne font-bold text-sm shadow-gold-subtle group-hover:scale-105 transition-transform">
              ॐ
            </span>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-sm sm:text-base text-gold-champagne tracking-wider leading-none">
                Kiran & Maheswari
              </span>
              <span className="font-ceremonial text-[9px] text-cream-warm/70 tracking-widest uppercase">
                02 Dec 2026
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-ceremonial text-xs uppercase tracking-wider text-cream-ivory hover:text-gold-champagne transition-colors py-1 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold-antique transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Quick Actions (Share & Mobile Menu) */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setShareOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#641B2E] border border-gold-antique/60 text-gold-champagne text-xs font-heading font-semibold hover:bg-gold-antique hover:text-maroon-dark transition-all"
              title="Share Invitation"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>

            <a
              href="#rsvp"
              onClick={(e) => handleNavClick(e, "#rsvp")}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-gold-dark to-gold-antique text-maroon-dark text-xs font-heading font-bold tracking-wider uppercase shadow-gold-subtle hover:scale-105 transition-all"
            >
              <span>RSVP</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-cream-ivory hover:text-gold-champagne"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#42101F]/98 border-b border-gold-antique/40 px-4 pt-2 pb-6 space-y-2 shadow-2xl backdrop-blur-lg">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block font-ceremonial text-sm uppercase tracking-wider text-cream-ivory hover:text-gold-champagne py-2 px-3 rounded-lg hover:bg-[#641B2E]/60 border-l-2 border-transparent hover:border-gold-antique"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Share Modal */}
      <ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} />
    </>
  );
}
