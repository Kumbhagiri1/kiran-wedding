import React from "react";
import { WEDDING_DATA } from "@/config/weddingData";
import { GoldDivider, RoyalArch, CornerFlourish } from "./OrnamentalMotifs";
import { AkshinthaluShower } from "./AkshinthaluShower";

export function TheInvitation() {
  const { cordialInvitation, groom, bride } = WEDDING_DATA;

  return (
    <section id="invitation" className="relative py-16 sm:py-24 px-4 bg-cream-ivory text-darkText overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#641B2E_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="relative max-w-4xl mx-auto">
        {/* Top Decorative Arch */}
        <div className="flex justify-center mb-6">
          <RoyalArch className="w-full max-w-lg h-12 text-gold-antique" />
        </div>

        {/* Traditional Invitation Card Layout */}
        <div className="relative bg-gradient-to-b from-[#FFFDF9] via-[#FFF9EF] to-[#F5EBDD] border-2 border-gold-antique/70 rounded-3xl p-6 sm:p-14 shadow-royal">
          {/* Corner Flourishes */}
          <div className="absolute top-2 left-2"><CornerFlourish position="tl" /></div>
          <div className="absolute top-2 right-2"><CornerFlourish position="tr" /></div>
          <div className="absolute bottom-2 left-2"><CornerFlourish position="bl" /></div>
          <div className="absolute bottom-2 right-2"><CornerFlourish position="br" /></div>

          {/* Double Thin Inset Border */}
          <div className="absolute inset-2 sm:inset-4 rounded-2xl border border-gold-antique/30 pointer-events-none" />

          {/* Section Header */}
          <div className="text-center pt-2 sm:pt-4">
            <span className="font-ceremonial text-xs sm:text-sm tracking-[0.25em] text-maroon font-semibold uppercase block">
              Sacred Matrimonial Alliance
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-5xl text-maroon-deep tracking-wider mt-2">
              {cordialInvitation.heading}
            </h2>
            <GoldDivider className="my-4" symbol="lotus" />
          </div>

          {/* Invitation Prose */}
          <div className="font-body text-base sm:text-lg leading-relaxed text-darkText/90 space-y-6 text-center max-w-3xl mx-auto mt-6">
            <p className="italic font-display text-maroon-dark/95 text-lg sm:text-xl leading-relaxed">
              &ldquo;{cordialInvitation.paragraphs[0]}&rdquo;
            </p>

            <div className="py-2">
              <p className="text-sm sm:text-base uppercase tracking-widest text-gold-dark font-medium">
                On the joyous occasion of the wedding of our beloved son,
              </p>

              {/* Prominent Groom Name */}
              <div className="my-3">
                <span className="font-ceremonial text-xs sm:text-sm text-gold-antique tracking-widest uppercase mr-2 font-bold">
                  {groom.honorific}
                </span>
                <span className="font-heading font-bold text-2xl sm:text-4xl text-maroon tracking-wider">
                  {groom.name}
                </span>
              </div>

              <div className="font-display italic text-lg sm:text-xl text-gold-dark my-1 font-semibold">
                with
              </div>

              {/* Prominent Bride Name */}
              <div className="my-3">
                <span className="font-ceremonial text-xs sm:text-sm text-gold-antique tracking-widest uppercase mr-2 font-bold">
                  {bride.honorific}
                </span>
                <span className="font-heading font-bold text-2xl sm:text-4xl text-maroon tracking-wider">
                  {bride.name}
                </span>
              </div>

              <p className="text-sm sm:text-base text-darkText/90 mt-3 max-w-2xl mx-auto">
                we consider it our privilege and immense pleasure to cordially invite you and your family to grace this sacred celebration with your gracious presence.
              </p>
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-darkText/80">
              {cordialInvitation.paragraphs[2]}
            </p>

            <p className="text-sm sm:text-base leading-relaxed text-darkText/80">
              {cordialInvitation.paragraphs[3]}
            </p>

            {/* Sacred Highlight Box */}
            <div className="my-8 p-6 rounded-2xl bg-gradient-to-r from-cream-warm via-[#FFF9EF] to-cream-warm border border-gold-antique/60 shadow-inner">
              <p className="font-heading font-bold text-lg sm:text-2xl text-maroon-deep tracking-wide">
                {cordialInvitation.highlightQuote}
              </p>
              <p className="font-display italic text-sm sm:text-base text-maroon-dark mt-1">
                {cordialInvitation.subQuote}
              </p>
            </div>

            {/* Interactive Akshinthalu Shower Action */}
            <AkshinthaluShower />
          </div>
        </div>
      </div>
    </section>
  );
}
