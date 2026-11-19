import React from "react";
import { WEDDING_DATA } from "@/config/weddingData";
import { KalashIcon, GoldDivider } from "./OrnamentalMotifs";
import { RoyalWeddingProcession } from "./RoyalWeddingProcession";

export function InvitationFooter() {
  const { groom, bride, muhurtham, venue } = WEDDING_DATA;

  return (
    <footer className="relative bg-[#150308] text-cream-warm overflow-hidden">
      {/* 1. Festive Wedding Procession, Riding Elephant, Dhol Beats & Dancing Theme */}
      <RoyalWeddingProcession />

      {/* 2. Traditional Closing Family Blessings & Credits */}
      <div className="relative max-w-4xl mx-auto py-12 px-4 space-y-6 text-center">
        <div className="flex justify-center mb-2">
          <KalashIcon className="w-10 h-10 text-gold-antique" />
        </div>

        <div>
          <h4 className="font-heading font-bold text-2xl sm:text-3xl text-gold-champagne tracking-wider">
            {groom.name} & {bride.name}
          </h4>
          <p className="font-ceremonial text-xs text-gold-antique tracking-widest uppercase mt-1">
            {muhurtham.day}, {muhurtham.date} • {venue.name}, {venue.city}
          </p>
        </div>

        <GoldDivider className="my-3" symbol="om" />

        <div className="font-ceremonial text-xs sm:text-sm tracking-[0.25em] text-gold-champagne/90 uppercase font-semibold">
          SRI RASTU • SHUBHAMASTU • MANGALAMASTU
        </div>

        <p className="font-body text-xs text-cream-warm/70 max-w-lg mx-auto leading-relaxed">
          Celebrated with love, Vedic traditions, echoing wedding dhol, and family blessings. Crafted for the auspicious union of Kumbhagiri & Gangalla families.
        </p>

        <div className="text-[10px] text-cream-warm/40 tracking-wider">
          © {new Date().getFullYear()} The Kumbhagiri Family • All Auspicious Rights Reserved
        </div>
      </div>
    </footer>
  );
}
