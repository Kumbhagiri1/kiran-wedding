"use client";

import React, { useState } from "react";
import { Download, Printer, X, FileText } from "lucide-react";
import { WEDDING_DATA } from "@/config/weddingData";
import { GaneshaEmblem, KalashIcon, GoldDivider, CornerFlourish } from "./OrnamentalMotifs";

export function DownloadInvitation() {
  const [showPreview, setShowPreview] = useState(false);
  const { groom, bride, muhurtham, venue, elders, compliments, closing } = WEDDING_DATA;

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="flex justify-center my-6">
        <button
          onClick={() => setShowPreview(true)}
          className="inline-flex items-center space-x-2.5 px-6 py-3 rounded-full bg-cream-warm border-2 border-gold-antique text-maroon font-heading font-bold text-sm tracking-widest uppercase shadow-md hover:bg-gold-champagne/40 hover:scale-105 transition-all"
        >
          <FileText className="w-4 h-4 text-maroon" />
          <span>View / Download Printable Invitation Card (PDF)</span>
        </button>
      </div>

      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in print:p-0 print:bg-white print:static">
          <div className="relative w-full max-w-2xl bg-[#FFFDF9] text-darkText rounded-3xl border-4 border-gold-antique p-6 sm:p-12 shadow-2xl my-8 print:border-none print:shadow-none print:my-0 print:p-6 print:rounded-none">
            {/* Action Bar (Hidden when printing) */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gold-antique/30 print:hidden">
              <span className="font-ceremonial text-xs uppercase tracking-widest text-maroon font-bold">
                Printable Royal Invitation
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-maroon text-gold-champagne text-xs font-heading font-semibold hover:bg-maroon-dark transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save as PDF</span>
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-1 rounded-full text-maroon hover:bg-gold-champagne/30"
                  aria-label="Close printable card"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Card Body */}
            <div className="text-center relative">
              <div className="absolute top-0 left-0"><CornerFlourish position="tl" /></div>
              <div className="absolute top-0 right-0"><CornerFlourish position="tr" /></div>
              <div className="absolute bottom-0 left-0"><CornerFlourish position="bl" /></div>
              <div className="absolute bottom-0 right-0"><CornerFlourish position="br" /></div>

              <div className="flex justify-center mb-2">
                <GaneshaEmblem className="w-16 h-16" />
              </div>

              <h2 className="font-heading font-bold text-lg text-maroon">
                {WEDDING_DATA.openingBlessing}
              </h2>
              <p className="font-display italic text-xs text-darkText/70">
                {WEDDING_DATA.openingSubBlessing}
              </p>

              <GoldDivider className="my-3" symbol="om" />

              <span className="font-ceremonial text-xs tracking-widest text-gold-dark font-bold uppercase block mb-1">
                A ROYAL WEDDING CELEBRATION
              </span>

              <div className="my-4">
                <span className="font-ceremonial text-xs text-gold-antique font-bold uppercase mr-1">
                  {groom.honorific}
                </span>
                <span className="font-heading font-bold text-2xl sm:text-3xl text-maroon tracking-wider">
                  {groom.name}
                </span>
                <p className="font-body text-xs text-darkText/80 mt-0.5">
                  ({groom.relation} {groom.parents})
                </p>

                <div className="font-display italic text-lg text-gold-dark my-1 font-semibold">
                  with
                </div>

                <span className="font-ceremonial text-xs text-gold-antique font-bold uppercase mr-1">
                  {bride.honorific}
                </span>
                <span className="font-heading font-bold text-2xl sm:text-3xl text-maroon tracking-wider">
                  {bride.name}
                </span>
                <p className="font-body text-xs text-darkText/80 mt-0.5">
                  ({bride.relation} {bride.parents})
                </p>
              </div>

              {/* Two-Day Auspicious Schedule & Venue Box */}
              <div className="my-5 p-4 rounded-xl border border-gold-antique/60 bg-cream-warm/60 space-y-3">
                <p className="font-ceremonial text-xs tracking-widest text-maroon font-bold uppercase">
                  Two-Day Auspicious Wedding Schedule
                </p>

                {/* Event 1 */}
                <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-300 text-center">
                  <span className="font-ceremonial text-[10px] tracking-wider text-amber-900 font-bold uppercase block">
                    EVENT 1: TRADITIONAL HALDI & MUSIC CEREMONY
                  </span>
                  <p className="font-heading font-bold text-base text-amber-950">
                    Tuesday, 01 December 2026
                  </p>
                  <p className="font-body text-xs text-amber-900 font-semibold">
                    Guest Arrival Time: 04:00 PM
                  </p>
                </div>

                {/* Event 2 */}
                <div className="p-2.5 rounded-lg bg-rose-50 border border-gold-antique/50 text-center">
                  <span className="font-ceremonial text-[10px] tracking-wider text-maroon font-bold uppercase block">
                    EVENT 2: THE AUSPICIOUS WEDDING MUHURTHAM
                  </span>
                  <p className="font-heading font-bold text-base text-maroon-deep">
                    Wednesday, 02 December 2026
                  </p>
                  <p className="font-display font-semibold text-xs text-gold-dark">
                    Sumuhurtham: 09:04 AM – 09:37 AM
                  </p>
                  <p className="font-body text-[11px] text-darkText/80 mt-0.5">
                    {muhurtham.nakshatra} • {muhurtham.tithi} • {muhurtham.lagna}
                  </p>
                </div>

                <div className="h-[1px] w-20 bg-gold-antique/40 mx-auto my-1" />
                <p className="font-heading font-bold text-xs sm:text-sm text-maroon uppercase">
                  Venue: {venue.name}
                </p>
                <p className="font-body text-xs text-darkText/80">
                  {venue.fullAddress}
                </p>
              </div>

              {/* Family & Elders */}
              <div className="my-4 text-xs font-body text-darkText/80">
                <p className="font-ceremonial font-bold text-maroon uppercase tracking-wider mb-1">
                  {elders.title}
                </p>
                <p className="leading-relaxed">
                  {elders.list.join(" • ")}
                </p>
              </div>

              <div className="my-3 text-xs font-body">
                <span className="font-ceremonial font-bold text-maroon uppercase tracking-wider block">
                  {compliments.title}
                </span>
                <span className="font-heading font-bold text-sm text-maroon-deep">
                  {compliments.hosts}
                </span>
                <span className="block text-[11px] text-darkText/70 italic mt-0.5">
                  {compliments.footerNote}
                </span>
              </div>

              <div className="pt-3 border-t border-gold-antique/30">
                <span className="font-ceremonial text-xs tracking-[0.25em] text-maroon font-bold uppercase">
                  {closing.finalBlessing}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
