import React from "react";
import { WEDDING_DATA } from "@/config/weddingData";
import { GaneshaEmblem, KalashIcon, GoldDivider } from "./OrnamentalMotifs";
import { Heart } from "lucide-react";

export function InvitationFooter() {
  const { groom, bride, muhurtham, venue } = WEDDING_DATA;

  return (
    <footer className="relative bg-[#1A050B] text-cream-warm py-12 px-4 border-t-2 border-gold-antique/50 text-center overflow-hidden">
      <div className="relative max-w-4xl mx-auto space-y-6">
        <div className="flex justify-center mb-2">
          <KalashIcon className="w-10 h-10 text-gold-antique" />
        </div>

        <div>
          <h4 className="font-heading font-bold text-xl sm:text-2xl text-gold-champagne tracking-wider">
            {groom.name} & {bride.name}
          </h4>
          <p className="font-ceremonial text-xs text-gold-antique tracking-widest uppercase mt-1">
            {muhurtham.day}, {muhurtham.date} • {venue.name}, {venue.city}
          </p>
        </div>

        <GoldDivider className="my-3" symbol="om" />

        <div className="font-ceremonial text-xs tracking-[0.25em] text-gold-champagne/80 uppercase">
          SRI RASTU • SHUBHAMASTU • MANGALAMASTU
        </div>

        <p className="font-body text-xs text-cream-warm/60 max-w-lg mx-auto leading-relaxed">
          Celebrated with love, Vedic traditions, and family blessings. Crafted for the auspicious union of Kumbhagiri & Gangalla families.
        </p>

        <div className="text-[10px] text-cream-warm/40 tracking-wider">
          © {new Date().getFullYear()} The Kumbhagiri Family • All Auspicious Rights Reserved
        </div>
      </div>
    </footer>
  );
}
