"use client";

import React from "react";
import { WEDDING_DATA } from "@/config/weddingData";
import { GoldDivider, CornerFlourish } from "./OrnamentalMotifs";
import { Hotel, Phone, MessageSquare, AlertCircle, Sparkles, CheckCircle2 } from "lucide-react";

export function GuestAccommodation() {
  const { accommodation } = WEDDING_DATA;

  return (
    <section
      id="accommodation"
      className="relative py-16 sm:py-24 px-4 bg-gradient-to-b from-[#2A0B14] via-[#42101F] to-[#2A0B14] text-cream-ivory overflow-hidden"
    >
      {/* Background Subtle Motifs */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#C6A15B_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12">
          <span className="font-ceremonial text-xs sm:text-sm tracking-[0.25em] text-gold-champagne uppercase font-semibold">
            Warm Hospitality & Comfort
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-5xl text-gold-champagne tracking-wider mt-2">
            {accommodation.title}
          </h2>
          <p className="font-display italic text-gold-antique text-sm sm:text-base mt-2">
            {accommodation.subtitle}
          </p>
          <GoldDivider className="my-4" symbol="lotus" />
        </div>

        {/* Main Accommodation Card */}
        <div className="relative bg-gradient-to-b from-[#641B2E]/90 to-[#42101F]/95 border-2 border-gold-antique/70 rounded-3xl p-6 sm:p-12 shadow-royal overflow-hidden">
          <div className="absolute top-2 left-2"><CornerFlourish position="tl" /></div>
          <div className="absolute top-2 right-2"><CornerFlourish position="tr" /></div>
          <div className="absolute bottom-2 left-2"><CornerFlourish position="bl" /></div>
          <div className="absolute bottom-2 right-2"><CornerFlourish position="br" /></div>

          <div className="absolute inset-3 rounded-2xl border border-gold-champagne/20 pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto pt-2">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gold-dark/20 border border-gold-antique text-gold-champagne mb-5 shadow-gold-subtle">
              <Sparkles className="w-4 h-4 text-gold-antique animate-pulse" />
              <span className="font-ceremonial text-xs uppercase tracking-widest font-bold">
                {accommodation.badge}
              </span>
            </div>

            {/* Central Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#42101F] border border-gold-antique text-gold-champagne mb-4 shadow-gold-subtle">
              <Hotel className="w-8 h-8 text-gold-champagne" />
            </div>

            {/* Exact User Intro Text */}
            <p className="font-body text-base sm:text-lg text-cream-ivory leading-relaxed">
              For the convenience of our out-of-town guests, we have arranged{" "}
              <strong className="text-gold-light font-heading font-bold text-lg sm:text-xl underline decoration-gold-antique/60 decoration-2">
                24 air-conditioned rooms
              </strong>
              .
            </p>

            {/* Notice Callout Box */}
            <div className="my-6 p-5 sm:p-6 rounded-2xl bg-[#2A0B14]/80 border border-gold-antique/40 text-left space-y-3 shadow-inner">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-gold-antique flex-shrink-0 mt-0.5" />
                <p className="font-body text-sm sm:text-base text-cream-warm/95 leading-relaxed">
                  {accommodation.reservationNote}
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
                <p className="font-body text-sm sm:text-base text-cream-warm/95 leading-relaxed">
                  {accommodation.limitedNotice}
                </p>
              </div>
            </div>

            {/* Highlighted Call to Action */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-gold-dark/20 via-gold-antique/30 to-gold-dark/20 border border-gold-antique/50 text-center mb-8">
              <p className="font-heading font-bold text-base sm:text-lg text-gold-champagne tracking-wide">
                {accommodation.callToAction}
              </p>
              <p className="font-display italic text-cream-ivory text-sm sm:text-base mt-1">
                {accommodation.closingGreeting}
              </p>
            </div>

            {/* Reservation Contact Cards */}
            <div className="text-center mb-4">
              <span className="font-ceremonial text-xs uppercase tracking-widest text-gold-champagne font-bold block mb-3">
                Contact Family For Room Reservations
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {accommodation.contacts.map((contact, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#2A0B14]/70 border border-gold-antique/40 flex flex-col justify-between shadow-sm hover:border-gold-antique transition-colors text-left"
                >
                  <div>
                    <span className="font-ceremonial text-[11px] text-gold-champagne font-bold tracking-wider uppercase block">
                      {contact.name}
                    </span>
                    <a
                      href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                      className="font-heading text-base font-bold text-gold-light hover:text-white transition-colors block mt-1"
                    >
                      {contact.phone}
                    </a>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-gold-antique/20 flex items-center justify-between">
                    <a
                      href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                      className="text-xs font-heading font-semibold text-gold-champagne hover:underline inline-flex items-center space-x-1"
                    >
                      <Phone className="w-3.5 h-3.5 text-gold-antique" />
                      <span>Call</span>
                    </a>
                    <a
                      href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                        "Namaste! Regarding the wedding of Kiran & Maheswari, I would like to request room accommodation for out-of-town guests."
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-heading font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center space-x-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Shortcut to RSVP */}
            <div className="mt-8 pt-6 border-t border-gold-antique/20 text-center">
              <a
                href="#rsvp"
                className="inline-flex items-center space-x-2 text-xs sm:text-sm font-heading font-semibold text-gold-champagne hover:text-gold-light tracking-wider uppercase underline underline-offset-4"
              >
                <span>Or Request Accommodation via RSVP Form Below ↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
