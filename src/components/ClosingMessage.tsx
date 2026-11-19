import React from "react";
import { WEDDING_DATA } from "@/config/weddingData";
import { GoldDivider, CornerFlourish, GaneshaEmblem } from "./OrnamentalMotifs";

export function ClosingMessage() {
  const { closing } = WEDDING_DATA;

  return (
    <section className="relative py-16 sm:py-24 px-4 bg-gradient-to-b from-[#42101F] via-[#2A0B14] to-[#1A050B] text-cream-ivory text-center overflow-hidden">
      {/* Background Subtle Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#C6A15B_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-3xl mx-auto border-2 border-gold-antique/60 rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-[#641B2E]/90 to-[#42101F]/95 shadow-royal">
        <div className="absolute top-2 left-2"><CornerFlourish position="tl" /></div>
        <div className="absolute top-2 right-2"><CornerFlourish position="tr" /></div>
        <div className="absolute bottom-2 left-2"><CornerFlourish position="bl" /></div>
        <div className="absolute bottom-2 right-2"><CornerFlourish position="br" /></div>

        <div className="flex justify-center mb-4">
          <GaneshaEmblem className="w-16 h-16 sm:w-20 sm:h-20" />
        </div>

        <div className="space-y-4 font-body text-base sm:text-lg text-cream-warm max-w-2xl mx-auto">
          <p className="leading-relaxed">
            {closing.firstParagraph}
          </p>
          <p className="leading-relaxed italic font-display text-gold-champagne text-lg sm:text-xl">
            &ldquo;{closing.secondParagraph}&rdquo;
          </p>
        </div>

        <GoldDivider className="my-6" symbol="lotus" />

        <div className="my-6">
          <span className="font-ceremonial text-xs sm:text-sm tracking-[0.25em] text-gold-champagne/80 uppercase font-semibold block mb-2">
            {closing.regardsTitle}
          </span>
          <h3 className="font-heading font-extrabold text-2xl sm:text-4xl text-gold-light tracking-widest drop-shadow">
            {closing.familySignature}
          </h3>
        </div>

        <div className="mt-8 pt-4 border-t border-gold-antique/30">
          <span className="font-ceremonial text-sm sm:text-base font-bold tracking-[0.3em] text-gold-antique uppercase">
            {closing.finalBlessing}
          </span>
        </div>
      </div>
    </section>
  );
}
