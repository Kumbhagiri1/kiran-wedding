"use client";

import React, { useState } from "react";
import { WEDDING_DATA } from "@/config/weddingData";
import { GoldDivider, CornerFlourish } from "./OrnamentalMotifs";
import { Send, CheckCircle2, Phone, Mail, MessageSquare, Heart } from "lucide-react";
import confetti from "canvas-confetti";

export function RSVPSection() {
  const { rsvp, groom, bride } = WEDDING_DATA;
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("2");
  const [status, setStatus] = useState<"attending_both" | "attending_wedding" | "attending_haldi" | "regrets">("attending_both");
  const [wishes, setWishes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitted(true);

    // Festive flower confetti for RSVP submission
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#C6A15B", "#641B2E", "#E8D6AD", "#FFD700", "#F59E0B"],
    });
  };

  const getStatusLabel = () => {
    switch (status) {
      case "attending_both":
        return "Attending Both Celebrations (Haldi & Wedding)";
      case "attending_wedding":
        return "Attending Wedding Ceremony Only (02 Dec)";
      case "attending_haldi":
        return "Attending Haldi & Music Ceremony Only (01 Dec)";
      case "regrets":
        return "Sending Warm Blessings from Afar";
    }
  };

  const generateWhatsappMessage = () => {
    const text = `*Wedding RSVP for ${groom.name} & ${bride.name}*\n\n` +
      `*Guest Name:* ${name || "Guest"}\n` +
      `*Attendance:* ${getStatusLabel()}\n` +
      `*Number of Guests:* ${guests}\n` +
      (wishes ? `*Wishes:* ${wishes}\n\n` : "\n") +
      `Looking forward to celebrating with the Kumbhagiri & Gangalla families!`;

    const encoded = encodeURIComponent(text);
    return `https://wa.me/${rsvp.defaultWhatsappNumber}?text=${encoded}`;
  };

  return (
    <section id="rsvp" className="relative py-16 sm:py-24 px-4 bg-gradient-to-b from-[#42101F] via-[#2A0B14] to-[#42101F] text-cream-ivory overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#C6A15B_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="font-ceremonial text-xs sm:text-sm tracking-[0.25em] text-gold-champagne uppercase font-semibold">
            We Value Your Gracious Presence
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-5xl text-gold-champagne tracking-wider mt-2">
            {rsvp.title}
          </h2>
          <p className="font-body text-sm sm:text-base text-cream-warm/90 max-w-xl mx-auto mt-2">
            {rsvp.description}
          </p>
          <GoldDivider className="my-4" symbol="lotus" />
        </div>

        <div className="relative bg-gradient-to-b from-[#641B2E]/90 to-[#42101F]/95 border-2 border-gold-antique/70 rounded-3xl p-6 sm:p-12 shadow-royal overflow-hidden">
          <div className="absolute top-2 left-2"><CornerFlourish position="tl" /></div>
          <div className="absolute top-2 right-2"><CornerFlourish position="tr" /></div>
          <div className="absolute bottom-2 left-2"><CornerFlourish position="bl" /></div>
          <div className="absolute bottom-2 right-2"><CornerFlourish position="br" /></div>

          <div className="absolute inset-3 rounded-2xl border border-gold-champagne/20 pointer-events-none" />

          {/* Family Contact Numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 mb-8">
            {rsvp.contactPlaceholders.map((contact, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#2A0B14]/70 border border-gold-antique/40 flex flex-col justify-between shadow-sm hover:border-gold-antique transition-colors">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-[#42101F] border border-gold-antique/60 flex items-center justify-center flex-shrink-0 text-gold-champagne">
                    <Phone className="w-4 h-4 text-gold-antique" />
                  </div>
                  <div>
                    <span className="font-ceremonial text-[11px] text-gold-champagne font-bold tracking-wider uppercase block">
                      {contact.label}
                    </span>
                    <a
                      href={`tel:${contact.contact.replace(/\s+/g, '')}`}
                      className="font-heading text-base font-bold text-gold-light hover:text-white transition-colors block mt-0.5"
                    >
                      {contact.contact}
                    </a>
                    <p className="text-[10px] text-cream-warm/70 italic mt-0.5">
                      {contact.note}
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-gold-antique/20 flex items-center justify-between">
                  <a
                    href={`tel:${contact.contact.replace(/\s+/g, '')}`}
                    className="text-[11px] font-heading font-semibold text-gold-champagne hover:underline flex items-center space-x-1"
                  >
                    <span>Call Now</span>
                  </a>
                  <a
                    href={`https://wa.me/${contact.contact.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Namaste! Regarding the wedding of Kiran & Maheshwari:")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-heading font-semibold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1"
                  >
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive RSVP Form */}
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-gold-champagne mx-auto animate-bounce" />
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-gold-light">
                Thank You, {name}!
              </h3>
              <p className="font-body text-sm sm:text-base text-cream-warm max-w-md mx-auto">
                Your RSVP confirmation and auspicious wishes have been received with immense joy by the Kumbhagiri Family.
              </p>

              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <a
                  href={generateWhatsappMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-heading font-bold text-sm tracking-wider uppercase shadow-lg hover:scale-105 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Forward RSVP via WhatsApp</span>
                </a>

                <button
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#42101F] border border-gold-antique text-gold-champagne font-heading font-semibold text-sm tracking-wider uppercase hover:bg-[#641B2E]"
                >
                  <span>Submit Another Response</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 max-w-xl mx-auto">
              <div>
                <label className="block font-ceremonial text-xs uppercase tracking-widest text-gold-champagne font-semibold mb-1.5">
                  Your Full Name / Family Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Srikanth Reddy & Family"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#2A0B14]/80 border border-gold-antique/40 text-cream-ivory placeholder-cream-warm/40 focus:outline-none focus:ring-2 focus:ring-gold-antique font-body text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-ceremonial text-xs uppercase tracking-widest text-gold-champagne font-semibold mb-1.5">
                    Which Celebrations Will You Grace?
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as "attending_both" | "attending_wedding" | "attending_haldi" | "regrets")}
                    className="w-full px-4 py-3 rounded-xl bg-[#2A0B14]/80 border border-gold-antique/40 text-cream-ivory focus:outline-none focus:ring-2 focus:ring-gold-antique font-body text-sm"
                  >
                    <option value="attending_both">Joyfully Attending Both Days (Haldi & Wedding)</option>
                    <option value="attending_wedding">Wedding Ceremony Only (02 Dec)</option>
                    <option value="attending_haldi">Haldi & Music Ceremony Only (01 Dec)</option>
                    <option value="regrets">Sending Blessings from Afar</option>
                  </select>
                </div>

                <div>
                  <label className="block font-ceremonial text-xs uppercase tracking-widest text-gold-champagne font-semibold mb-1.5">
                    Total Guests Attending
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#2A0B14]/80 border border-gold-antique/40 text-cream-ivory focus:outline-none focus:ring-2 focus:ring-gold-antique font-body text-sm"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5+">5+ (With Family)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-ceremonial text-xs uppercase tracking-widest text-gold-champagne font-semibold mb-1.5">
                  Heartfelt Blessings & Wishes for the Couple
                </label>
                <textarea
                  rows={3}
                  placeholder="May your married life be filled with everlasting joy, harmony and divine prosperity..."
                  value={wishes}
                  onChange={(e) => setWishes(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#2A0B14]/80 border border-gold-antique/40 text-cream-ivory placeholder-cream-warm/40 focus:outline-none focus:ring-2 focus:ring-gold-antique font-body text-sm"
                />
              </div>

              <div className="pt-2 text-center">
                <button
                  type="submit"
                  className="inline-flex items-center space-x-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-dark via-gold-antique to-gold-dark text-maroon-dark font-heading font-bold text-base tracking-widest uppercase shadow-gold-glow hover:scale-105 transition-all"
                >
                  <Send className="w-4 h-4 fill-maroon-dark" />
                  <span>Confirm RSVP</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
