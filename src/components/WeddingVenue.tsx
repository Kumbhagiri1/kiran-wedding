import React from "react";
import { WEDDING_DATA } from "@/config/weddingData";
import { GoldDivider, CornerFlourish } from "./OrnamentalMotifs";
import { MapPin, Navigation, ExternalLink, Car, Train, Building2 } from "lucide-react";

export function WeddingVenue() {
  const { venue } = WEDDING_DATA;

  return (
    <section id="venue" className="relative py-16 sm:py-24 px-4 bg-gradient-to-b from-[#42101F] via-[#2A0B14] to-[#42101F] text-cream-ivory overflow-hidden">
      {/* Background Subtle Motifs */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#C6A15B_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12">
          <span className="font-ceremonial text-xs sm:text-sm tracking-[0.25em] text-gold-champagne uppercase font-semibold">
            Sacred Celebration Destination
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-5xl text-gold-champagne tracking-wider mt-2">
            The Wedding Venue
          </h2>
          <GoldDivider className="my-4" symbol="lotus" />
        </div>

        {/* Venue Information Card */}
        <div className="relative bg-gradient-to-b from-[#641B2E]/90 to-[#42101F]/95 border-2 border-gold-antique/70 rounded-3xl p-6 sm:p-10 shadow-royal overflow-hidden">
          <div className="absolute top-2 left-2"><CornerFlourish position="tl" /></div>
          <div className="absolute top-2 right-2"><CornerFlourish position="tr" /></div>
          <div className="absolute bottom-2 left-2"><CornerFlourish position="bl" /></div>
          <div className="absolute bottom-2 right-2"><CornerFlourish position="br" /></div>

          <div className="absolute inset-3 rounded-2xl border border-gold-champagne/20 pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto pt-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#42101F] border border-gold-antique text-gold-champagne mb-3 shadow-gold-subtle">
              <Building2 className="w-7 h-7 text-gold-champagne" />
            </div>

            <h3 className="font-heading font-bold text-2xl sm:text-4xl text-gold-light tracking-wider">
              {venue.name}
            </h3>

            <p className="font-display italic text-gold-antique text-sm sm:text-base mt-1">
              {venue.tagline}
            </p>

            <div className="h-[1px] w-24 bg-gold-antique/40 mx-auto my-4" />

            <div className="flex items-center justify-center space-x-2 text-cream-ivory text-base sm:text-lg font-body">
              <MapPin className="w-5 h-5 text-gold-antique flex-shrink-0" />
              <span>{venue.fullAddress}</span>
            </div>

            {/* Action Buttons: Get Directions & Open Map */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={venue.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold-dark via-gold-antique to-gold-dark text-maroon-dark font-heading font-bold text-sm tracking-wider uppercase shadow-gold-glow hover:scale-105 transition-all"
              >
                <Navigation className="w-4 h-4 fill-maroon-dark" />
                <span>Get Directions (Google Maps)</span>
              </a>

              <a
                href={venue.mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#42101F] border border-gold-antique/70 text-gold-champagne font-heading font-semibold text-sm tracking-wider uppercase hover:bg-[#641B2E] transition-all"
              >
                <ExternalLink className="w-4 h-4 text-gold-antique" />
                <span>View Full Screen Map</span>
              </a>
            </div>
          </div>

          {/* Interactive Google Maps Embed */}
          <div className="mt-8 rounded-2xl overflow-hidden border-2 border-gold-antique/50 shadow-inner bg-[#2A0B14]">
            <div className="relative w-full h-72 sm:h-96">
              <iframe
                title="Krishna Kalyanamandapam Kadapa Map Location"
                src={venue.embedMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter contrast-105"
              />
            </div>
          </div>

          {/* Travel & Transit Assistance Details */}
          <div className="mt-8 pt-6 border-t border-gold-antique/20 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-[#2A0B14]/40 border border-gold-antique/20">
              <Train className="w-5 h-5 text-gold-antique flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading font-bold text-sm text-gold-champagne uppercase tracking-wider">
                  By Rail & Bus
                </h4>
                <p className="font-body text-xs text-cream-warm/90 mt-1">
                  Centrally located on Madras Road, Kadapa. Easily accessible by auto-rickshaw or taxi from Kadapa Railway Station (HX) and Kadapa APSRTC Bus Station.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-[#2A0B14]/40 border border-gold-antique/20">
              <Car className="w-5 h-5 text-gold-antique flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading font-bold text-sm text-gold-champagne uppercase tracking-wider">
                  Guest Parking & Hospitality
                </h4>
                <p className="font-body text-xs text-cream-warm/90 mt-1">
                  Dedicated guest parking and welcome reception will be available at the Krishna Kalyanamandapam premises.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
