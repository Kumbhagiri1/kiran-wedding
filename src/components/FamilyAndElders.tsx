import React from "react";
import { WEDDING_DATA } from "@/config/weddingData";
import { GoldDivider, CornerFlourish, KalashIcon } from "./OrnamentalMotifs";
import { Users, HeartHandshake, Sparkles } from "lucide-react";

export function FamilyAndElders() {
  const { elders, brothers, compliments } = WEDDING_DATA;

  // Elders split into the two traditional family branches
  const firstBranch = elders.list.slice(0, 3);
  const secondBranch = elders.list.slice(3, 6);

  return (
    <section id="family" className="relative py-16 sm:py-24 px-4 bg-cream-ivory text-darkText overflow-hidden">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#641B2E_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="relative max-w-4xl mx-auto">
        {/* Main Card */}
        <div className="relative bg-gradient-to-b from-[#FFFDF9] via-[#FFF9EF] to-[#F5EBDD] border-2 border-gold-antique/70 rounded-3xl p-6 sm:p-14 shadow-royal">
          <div className="absolute top-2 left-2"><CornerFlourish position="tl" /></div>
          <div className="absolute top-2 right-2"><CornerFlourish position="tr" /></div>
          <div className="absolute bottom-2 left-2"><CornerFlourish position="bl" /></div>
          <div className="absolute bottom-2 right-2"><CornerFlourish position="br" /></div>

          <div className="absolute inset-3 rounded-2xl border border-gold-antique/30 pointer-events-none" />

          {/* SECTION 7: Blessings of Our Elders */}
          <div className="text-center pt-2 sm:pt-4">
            <div className="flex justify-center mb-2">
              <Users className="w-8 h-8 text-maroon" />
            </div>

            <span className="font-ceremonial text-xs sm:text-sm tracking-[0.25em] text-gold-dark font-semibold uppercase block">
              Sacred Heritage & Guidance
            </span>

            <h2 className="font-heading font-bold text-2xl sm:text-4xl text-maroon-deep tracking-wider mt-2">
              {elders.title}
            </h2>

            <GoldDivider className="my-4" symbol="om" />

            {/* Elders Grid: Symmetrical Traditional Grouping */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 max-w-2xl mx-auto">
              <div className="p-5 rounded-2xl bg-cream-warm/80 border border-gold-antique/40 shadow-sm text-center">
                <span className="text-[11px] font-ceremonial text-gold-dark font-bold uppercase tracking-widest block mb-3">
                  Paternal Elders
                </span>
                <div className="space-y-2.5">
                  {firstBranch.map((name, i) => (
                    <p key={i} className="font-heading font-bold text-base sm:text-lg text-maroon tracking-wide">
                      {name}
                    </p>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-cream-warm/80 border border-gold-antique/40 shadow-sm text-center">
                <span className="text-[11px] font-ceremonial text-gold-dark font-bold uppercase tracking-widest block mb-3">
                  Maternal & Respected Elders
                </span>
                <div className="space-y-2.5">
                  {secondBranch.map((name, i) => (
                    <p key={i} className="font-heading font-bold text-base sm:text-lg text-maroon tracking-wide">
                      {name}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* BROTHERS SECTION */}
            <div className="my-8 pt-6 border-t border-gold-antique/30 max-w-lg mx-auto">
              <span className="font-ceremonial text-xs tracking-[0.25em] text-maroon uppercase font-bold block mb-3">
                {brothers.title}
              </span>

              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8">
                {brothers.list.map((brother, idx) => (
                  <div
                    key={idx}
                    className="px-6 py-2 rounded-full bg-cream-warm border border-gold-antique/50 text-maroon font-heading font-bold text-base sm:text-lg shadow-sm"
                  >
                    {brother}
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 8: With Best Compliments From */}
            <div className="my-10 pt-8 border-t-2 border-gold-antique/40">
              <div className="flex justify-center mb-2">
                <HeartHandshake className="w-8 h-8 text-gold-dark" />
              </div>

              <span className="font-ceremonial text-xs sm:text-sm tracking-[0.25em] text-maroon font-semibold uppercase block">
                Gracious Host & Inviting Family
              </span>

              <h3 className="font-heading font-bold text-xl sm:text-3xl text-maroon-deep tracking-wider mt-1 mb-4">
                {compliments.title}
              </h3>

              <div className="p-6 rounded-2xl bg-gradient-to-r from-cream-warm via-[#FFF9EF] to-cream-warm border border-gold-antique max-w-xl mx-auto shadow-sm">
                <p className="font-heading font-bold text-xl sm:text-2xl text-maroon tracking-wider">
                  {compliments.hosts}
                </p>
                <div className="h-[1px] w-20 bg-gold-antique/50 mx-auto my-2" />
                <p className="font-body text-xs sm:text-sm text-darkText/80 italic">
                  {compliments.footerNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
