import React from "react";
import { WEDDING_DATA } from "@/config/weddingData";
import { GaneshaEmblem, KalashIcon, GoldDivider, CornerFlourish } from "./OrnamentalMotifs";

export function DevotionalInvocation() {
  return (
    <section id="invocations" className="relative py-14 sm:py-20 px-4 bg-gradient-to-b from-[#42101F] via-[#2A0B14] to-[#42101F] text-cream-ivory overflow-hidden">
      {/* Background Subtle Ornamental Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#C6A15B_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-4xl mx-auto border-2 border-gold-antique/60 rounded-3xl p-6 sm:p-12 bg-gradient-to-b from-[#641B2E]/90 to-[#42101F]/95 shadow-royal text-center">
        {/* Corner Flourishes */}
        <div className="absolute top-2 left-2"><CornerFlourish position="tl" /></div>
        <div className="absolute top-2 right-2"><CornerFlourish position="tr" /></div>
        <div className="absolute bottom-2 left-2"><CornerFlourish position="bl" /></div>
        <div className="absolute bottom-2 right-2"><CornerFlourish position="br" /></div>

        {/* Double Inset Framing */}
        <div className="absolute inset-3 sm:inset-4 rounded-2xl border border-gold-champagne/20 pointer-events-none" />

        {/* Auspicious Deity Emblem */}
        <div className="flex items-center justify-center space-x-4 mb-4">
          <KalashIcon className="w-10 h-10 sm:w-12 sm:h-12 text-gold-antique" />
          <GaneshaEmblem className="w-14 h-14 sm:w-18 sm:h-18" />
          <KalashIcon className="w-10 h-10 sm:w-12 sm:h-12 text-gold-antique transform scale-x-[-1]" />
        </div>

        <span className="font-ceremonial text-xs sm:text-sm tracking-[0.25em] text-gold-champagne/90 uppercase font-semibold">
          Divine Blessings & Auspicious Invocations
        </span>

        <GoldDivider className="my-4" symbol="om" />

        {/* Five Sacred Invocations */}
        <div className="space-y-3 sm:space-y-4 my-6">
          {WEDDING_DATA.invocations.deityMantras.map((mantra, index) => (
            <div
              key={index}
              className="group py-1 transition-transform duration-300 hover:scale-105"
            >
              <p className="font-heading text-lg sm:text-2xl md:text-3xl font-semibold tracking-wider text-gold-champagne drop-shadow">
                {mantra}
              </p>
            </div>
          ))}
        </div>

        <GoldDivider className="my-5" symbol="kalash" />

        {/* Three Sacred Telugu Blessings: SRI RASTU | SHUBHAMASTU | MANGALAMASTU */}
        <div className="mt-6 pt-2">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-6 py-2.5 rounded-full border border-gold-antique/70 bg-[#42101F]/80 shadow-gold-subtle">
            {WEDDING_DATA.invocations.traditionalBlessings.map((blessing, idx) => (
              <React.Fragment key={idx}>
                <span className="font-ceremonial font-bold text-xs sm:text-base tracking-[0.2em] text-gold-light uppercase">
                  {blessing}
                </span>
                {idx < WEDDING_DATA.invocations.traditionalBlessings.length - 1 && (
                  <span className="text-gold-antique font-serif text-sm">|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
