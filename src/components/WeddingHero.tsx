"use client";

import React from "react";
import { WEDDING_DATA } from "@/config/weddingData";
import { GaneshaEmblem, KalashIcon, RoyalArch, GoldDivider, CornerFlourish } from "./OrnamentalMotifs";
import { Calendar, MapPin, Sparkles, Navigation } from "lucide-react";

export function WeddingHero() {
  const { groom, bride, muhurtham, venue } = WEDDING_DATA;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 bg-gradient-to-b from-[#2A0B14] via-[#42101F] to-[#641B2E] text-cream-ivory text-center overflow-hidden">
      {/* Background Mandala & Radial Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(198,161,91,0.18)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C6A15B_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      {/* Grand Framed Royal Banner */}
      <div className="relative max-w-4xl w-full border-4 border-gold-antique rounded-3xl p-6 sm:p-14 bg-gradient-to-b from-[#42101F]/90 via-[#641B2E]/85 to-[#42101F]/95 shadow-royal">
        <div className="absolute top-2 left-2"><CornerFlourish position="tl" /></div>
        <div className="absolute top-2 right-2"><CornerFlourish position="tr" /></div>
        <div className="absolute bottom-2 left-2"><CornerFlourish position="bl" /></div>
        <div className="absolute bottom-2 right-2"><CornerFlourish position="br" /></div>

        <div className="absolute inset-3 sm:inset-4 rounded-2xl border border-gold-champagne/30 pointer-events-none" />
        <div className="absolute inset-5 rounded-xl border border-gold-champagne/15 pointer-events-none" />

        {/* Top Sacred Auspicious Invocation */}
        <div className="pt-2">
          <div className="flex justify-center mb-3">
            <GaneshaEmblem className="w-16 h-16 sm:w-20 sm:h-20" />
          </div>

          <h2 className="font-heading text-lg sm:text-2xl font-bold tracking-widest text-gold-champagne drop-shadow">
            {WEDDING_DATA.openingBlessing}
          </h2>

          <p className="font-display italic text-xs sm:text-sm text-cream-warm/90 mt-1 max-w-md mx-auto">
            {WEDDING_DATA.openingSubBlessing}
          </p>

          <GoldDivider className="my-4 sm:my-5" symbol="om" />
        </div>

        {/* Grand Wedding Announcement */}
        <div className="my-4 sm:my-6">
          <span className="font-ceremonial text-xs sm:text-sm tracking-[0.3em] text-gold-light uppercase font-bold block mb-3">
            {WEDDING_DATA.invitationTitle}
          </span>

          <div className="my-6 space-y-2">
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-gold-light tracking-wider drop-shadow-lg">
              {groom.name}
            </h1>

            <div className="flex items-center justify-center space-x-3 my-2">
              <div className="h-[1px] w-12 sm:w-20 bg-gold-antique/60" />
              <span className="font-display italic text-2xl sm:text-3xl text-gold-champagne font-semibold">&</span>
              <div className="h-[1px] w-12 sm:w-20 bg-gold-antique/60" />
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-gold-light tracking-wider drop-shadow-lg">
              {bride.name}
            </h1>
          </div>

          {/* Date Badge */}
          <div className="inline-flex items-center space-x-2.5 px-6 py-2.5 rounded-full border-2 border-gold-antique bg-[#2A0B14] shadow-royal my-3">
            <Calendar className="w-4 h-4 text-gold-antique" />
            <span className="font-ceremonial text-sm sm:text-lg font-bold text-gold-champagne tracking-widest uppercase">
              {WEDDING_DATA.eventDateDisplay}
            </span>
            <span className="text-gold-antique">•</span>
            <span className="font-heading text-xs sm:text-sm text-cream-warm tracking-wider">
              {muhurtham.day}
            </span>
          </div>

          {/* Two-Day Festivities Sub-Badge */}
          <div className="mt-1 flex flex-wrap items-center justify-center gap-2 text-xs font-ceremonial text-cream-warm/90">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-200">
              01 Dec: Haldi & Music (4:00 PM)
            </span>
            <span className="text-gold-antique">•</span>
            <span className="px-3 py-1 rounded-full bg-rose-900/40 border border-gold-antique/50 text-gold-champagne">
              02 Dec: Wedding Muhurtham (09:04 AM)
            </span>
          </div>
        </div>

        {/* Quick Action Navigation Pills */}
        <div className="mt-8 pt-6 border-t border-gold-antique/30 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => scrollToSection("invitation")}
            className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-gold-dark to-gold-antique text-maroon-dark font-heading font-bold text-xs sm:text-sm tracking-wider uppercase shadow-gold-subtle hover:scale-105 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Read Invitation</span>
          </button>

          <button
            onClick={() => scrollToSection("itinerary")}
            className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-full bg-amber-500/20 border border-amber-400/80 text-amber-200 font-heading font-semibold text-xs sm:text-sm tracking-wider uppercase hover:bg-amber-500/30 transition-all"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-300" />
            <span>2-Day Schedule</span>
          </button>

          <button
            onClick={() => scrollToSection("muhurtham")}
            className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-full bg-[#42101F] border border-gold-antique/70 text-gold-champagne font-heading font-semibold text-xs sm:text-sm tracking-wider uppercase hover:bg-[#641B2E] transition-all"
          >
            <Calendar className="w-3.5 h-3.5 text-gold-antique" />
            <span>Wedding Muhurtham</span>
          </button>

          <button
            onClick={() => scrollToSection("venue")}
            className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-full bg-[#42101F] border border-gold-antique/70 text-gold-champagne font-heading font-semibold text-xs sm:text-sm tracking-wider uppercase hover:bg-[#641B2E] transition-all"
          >
            <Navigation className="w-3.5 h-3.5 text-gold-antique" />
            <span>Venue & Directions</span>
          </button>
        </div>
      </div>
    </section>
  );
}
