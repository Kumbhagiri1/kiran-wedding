import React from "react";
import { WEDDING_DATA } from "@/config/weddingData";
import { GoldDivider, RoyalMonogramPlaceholder, CornerFlourish } from "./OrnamentalMotifs";
import { MapPin, Home, Heart } from "lucide-react";

export function CoupleProfiles() {
  const { groom, bride } = WEDDING_DATA;

  return (
    <section id="couple" className="relative py-16 sm:py-24 px-4 bg-gradient-to-b from-[#42101F] via-[#2A0B14] to-[#42101F] text-cream-ivory overflow-hidden">
      {/* Background Decorative Texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#C6A15B_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="font-ceremonial text-xs sm:text-sm tracking-[0.25em] text-gold-champagne uppercase font-semibold">
            Two Souls, Bound by Vedic Destiny
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-5xl text-gold-champagne tracking-wider mt-2">
            Meet the Bride & Groom
          </h2>
          <GoldDivider className="my-4" symbol="lotus" />
        </div>

        {/* Grand Centerpiece Royal Couple Portrait */}
        {WEDDING_DATA.coupleImage && (
          <div className="mb-12 sm:mb-16 max-w-3xl mx-auto text-center px-2">
            <div className="relative rounded-3xl border-4 border-gold-antique p-2 sm:p-3 shadow-royal bg-gradient-to-b from-[#641B2E] via-[#42101F] to-[#2A0B14] overflow-hidden group">
              <div className="absolute inset-2 sm:inset-3 rounded-2xl border border-gold-champagne/30 pointer-events-none z-10" />
              <img
                src={WEDDING_DATA.coupleImage}
                alt={`${groom.name} & ${bride.name}`}
                className="w-full h-auto max-h-[460px] object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-700 filter contrast-105"
              />
              <div className="absolute bottom-4 left-0 right-0 z-20 text-center">
                <span className="inline-block px-6 py-2 rounded-full bg-[#42101F]/95 border-2 border-gold-antique text-gold-champagne font-heading font-bold text-xs sm:text-base tracking-widest uppercase shadow-gold-glow">
                  Ch. Sai Kiran & Ch. Sou. Maheswari
                </span>
              </div>
            </div>
            <p className="font-display italic text-gold-antique text-sm sm:text-base mt-3">
              United in sacred love, blessed by elders, bound for eternity.
            </p>
          </div>
        )}

        {/* Symmetrical Profiles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* THE GROOM CARD */}
          <div className="relative bg-gradient-to-b from-[#641B2E]/90 to-[#42101F]/95 border-2 border-gold-antique/70 rounded-3xl p-6 sm:p-10 shadow-royal flex flex-col justify-between overflow-hidden">
            <div className="absolute top-2 left-2"><CornerFlourish position="tl" /></div>
            <div className="absolute top-2 right-2"><CornerFlourish position="tr" /></div>
            <div className="absolute inset-3 rounded-2xl border border-gold-champagne/20 pointer-events-none" />

            <div>
              {/* Header Badge */}
              <div className="text-center mb-6">
                <span className="inline-block px-4 py-1 rounded-full border border-gold-antique/50 bg-[#42101F] text-gold-champagne font-ceremonial text-xs tracking-[0.2em] uppercase font-bold">
                  {groom.title}
                </span>
              </div>

              {/* Royal Portrait or Placeholder */}
              <div className="mb-6 flex justify-center">
                {groom.image ? (
                  <div className="relative w-48 h-56 sm:w-56 sm:h-64 rounded-t-full border-2 border-gold-antique bg-gradient-to-b from-[#42101F] to-[#2A0B14] p-1.5 shadow-royal overflow-hidden group">
                    <div className="absolute inset-1.5 rounded-t-full border border-gold-champagne/40 pointer-events-none z-10" />
                    <img
                      src={groom.image}
                      alt={groom.name}
                      className="w-full h-full object-cover rounded-t-full group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                    />
                    <div className="absolute bottom-2 left-0 right-0 z-20 text-center">
                      <span className="px-3 py-0.5 rounded-full bg-[#42101F]/90 border border-gold-antique/70 font-ceremonial text-[10px] text-gold-champagne tracking-wider uppercase">
                        Ch. Sai Kiran
                      </span>
                    </div>
                  </div>
                ) : (
                  <RoyalMonogramPlaceholder initials="SK" label="Kumbhagiri Sai Kiran" gender="groom" />
                )}
              </div>

              {/* Groom Name & Honorific */}
              <div className="text-center mb-6">
                <span className="font-ceremonial text-sm text-gold-antique font-semibold tracking-widest uppercase block mb-1">
                  {groom.honorific}
                </span>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-gold-champagne tracking-wider">
                  {groom.name}
                </h3>
                <div className="h-[1px] w-24 bg-gold-antique/40 mx-auto mt-3" />
              </div>

              {/* Family Lineage & Details */}
              <div className="space-y-4 font-body text-sm sm:text-base text-cream-ivory/90 text-center max-w-md mx-auto">
                <div className="p-3.5 rounded-xl bg-[#42101F]/60 border border-gold-antique/30">
                  <span className="block text-xs uppercase tracking-widest text-gold-antique font-semibold mb-1">
                    {groom.relation}
                  </span>
                  <p className="font-heading font-semibold text-base sm:text-lg text-gold-champagne">
                    {groom.parents}
                  </p>
                </div>

                <div className="flex items-start justify-center space-x-2 text-left p-3 rounded-xl bg-[#2A0B14]/40 border border-gold-antique/20">
                  <MapPin className="w-5 h-5 text-gold-antique flex-shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-cream-warm leading-relaxed">
                    {groom.nativePlace}
                  </p>
                </div>

                <div className="flex items-start justify-center space-x-2 text-left p-3 rounded-xl bg-[#2A0B14]/40 border border-gold-antique/20">
                  <Home className="w-5 h-5 text-gold-antique flex-shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-cream-warm leading-relaxed">
                    {groom.currentResidence}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Auspicious Crest */}
            <div className="mt-8 pt-4 border-t border-gold-antique/20 text-center">
              <span className="text-xs font-serif text-gold-antique tracking-widest uppercase">
                ॥ Kalyana Sundara ॥
              </span>
            </div>
          </div>

          {/* THE BRIDE CARD */}
          <div className="relative bg-gradient-to-b from-[#641B2E]/90 to-[#42101F]/95 border-2 border-gold-antique/70 rounded-3xl p-6 sm:p-10 shadow-royal flex flex-col justify-between overflow-hidden">
            <div className="absolute top-2 left-2"><CornerFlourish position="tl" /></div>
            <div className="absolute top-2 right-2"><CornerFlourish position="tr" /></div>
            <div className="absolute inset-3 rounded-2xl border border-gold-champagne/20 pointer-events-none" />

            <div>
              {/* Header Badge */}
              <div className="text-center mb-6">
                <span className="inline-block px-4 py-1 rounded-full border border-gold-antique/50 bg-[#42101F] text-gold-champagne font-ceremonial text-xs tracking-[0.2em] uppercase font-bold">
                  {bride.title}
                </span>
              </div>

              {/* Royal Portrait or Placeholder */}
              <div className="mb-6 flex justify-center">
                {bride.image ? (
                  <div className="relative w-48 h-56 sm:w-56 sm:h-64 rounded-t-full border-2 border-gold-antique bg-gradient-to-b from-[#42101F] to-[#2A0B14] p-1.5 shadow-royal overflow-hidden group">
                    <div className="absolute inset-1.5 rounded-t-full border border-gold-champagne/40 pointer-events-none z-10" />
                    <img
                      src={bride.image}
                      alt={bride.name}
                      className="w-full h-full object-cover object-[center_20%] rounded-t-full group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                    />
                    <div className="absolute bottom-2 left-0 right-0 z-20 text-center">
                      <span className="px-3 py-0.5 rounded-full bg-[#42101F]/90 border border-gold-antique/70 font-ceremonial text-[10px] text-gold-champagne tracking-wider uppercase">
                        Ch. Sou. Maheswari
                      </span>
                    </div>
                  </div>
                ) : (
                  <RoyalMonogramPlaceholder initials="GM" label="Gangalla Maheswari" gender="bride" />
                )}
              </div>

              {/* Bride Name & Honorific */}
              <div className="text-center mb-6">
                <span className="font-ceremonial text-sm text-gold-antique font-semibold tracking-widest uppercase block mb-1">
                  {bride.honorific}
                </span>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-gold-champagne tracking-wider">
                  {bride.name}
                </h3>
                <div className="h-[1px] w-24 bg-gold-antique/40 mx-auto mt-3" />
              </div>

              {/* Family Lineage & Details */}
              <div className="space-y-4 font-body text-sm sm:text-base text-cream-ivory/90 text-center max-w-md mx-auto">
                <div className="p-3.5 rounded-xl bg-[#42101F]/60 border border-gold-antique/30">
                  <span className="block text-xs uppercase tracking-widest text-gold-antique font-semibold mb-1">
                    {bride.relation}
                  </span>
                  <p className="font-heading font-semibold text-base sm:text-lg text-gold-champagne">
                    {bride.parents}
                  </p>
                </div>

                <div className="flex items-start justify-center space-x-2 text-left p-3 rounded-xl bg-[#2A0B14]/40 border border-gold-antique/20">
                  <MapPin className="w-5 h-5 text-gold-antique flex-shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-cream-warm leading-relaxed">
                    {bride.nativePlace}
                  </p>
                </div>

                <div className="flex items-start justify-center space-x-2 text-center p-3 rounded-xl bg-[#2A0B14]/40 border border-gold-antique/20">
                  <Heart className="w-5 h-5 text-gold-antique flex-shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-cream-warm leading-relaxed">
                    Entering into sacred matrimony with the divine blessings of Sri Lakshmi Venkateshwara Swamy.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Auspicious Crest */}
            <div className="mt-8 pt-4 border-t border-gold-antique/20 text-center">
              <span className="text-xs font-serif text-gold-antique tracking-widest uppercase">
                ॥ Soubhagyavathi ॥
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
