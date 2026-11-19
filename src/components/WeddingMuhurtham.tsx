import React from "react";
import { WEDDING_DATA } from "@/config/weddingData";
import { GoldDivider, CornerFlourish, KalashIcon } from "./OrnamentalMotifs";
import { CountdownTimer } from "./CountdownTimer";
import { Calendar, Clock, Star, Compass, Moon } from "lucide-react";

export function WeddingMuhurtham() {
  const { muhurtham, eventDateIso, calendar } = WEDDING_DATA;

  // Add to Google Calendar handler
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    calendar.title
  )}&dates=${calendar.startDate}/${calendar.endDate}&details=${encodeURIComponent(
    calendar.description
  )}&location=${encodeURIComponent(calendar.location)}`;

  // Download ICS File handler
  const handleDownloadIcs = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Kumbhagiri Wedding//Wedding Invitation//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `SUMMARY:${calendar.title}`,
      `DESCRIPTION:${calendar.description}`,
      `LOCATION:${calendar.location}`,
      `DTSTART:${calendar.startDate}`,
      `DTEND:${calendar.endDate}`,
      "STATUS:CONFIRMED",
      "SEQUENCE:0",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "Kiran_Maheswari_Wedding.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="muhurtham" className="relative py-16 sm:py-24 px-4 bg-cream-ivory text-darkText overflow-hidden">
      {/* Subtle Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#641B2E_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="relative max-w-4xl mx-auto">
        {/* Main Muhurtham Card */}
        <div className="relative bg-gradient-to-b from-[#FFFDF9] via-[#FFF9EF] to-[#F5EBDD] border-4 border-gold-antique rounded-3xl p-6 sm:p-14 shadow-royal">
          {/* Corner Flourishes */}
          <div className="absolute top-2 left-2"><CornerFlourish position="tl" /></div>
          <div className="absolute top-2 right-2"><CornerFlourish position="tr" /></div>
          <div className="absolute bottom-2 left-2"><CornerFlourish position="bl" /></div>
          <div className="absolute bottom-2 right-2"><CornerFlourish position="br" /></div>

          {/* Double Gold Inset Borders */}
          <div className="absolute inset-3 sm:inset-4 rounded-2xl border border-gold-antique/40 pointer-events-none" />
          <div className="absolute inset-5 rounded-xl border border-gold-antique/20 pointer-events-none" />

          {/* Section Header */}
          <div className="text-center pt-2 sm:pt-4">
            <div className="flex justify-center mb-2">
              <KalashIcon className="w-12 h-12 text-gold-antique" />
            </div>

            <span className="font-ceremonial text-xs sm:text-sm tracking-[0.25em] text-maroon font-semibold uppercase block">
              Sacred Panchangam Details
            </span>

            <h2 className="font-heading font-bold text-2xl sm:text-4xl lg:text-5xl text-maroon-deep tracking-wider mt-2">
              {muhurtham.sectionTitle}
            </h2>

            <GoldDivider className="my-4" symbol="om" />
          </div>

          {/* Prominent Date Display with Large Gold Ornamental Framing */}
          <div className="my-6 sm:my-8 text-center">
            <div className="inline-block p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-[#42101F] to-[#2A0B14] border-2 border-gold-antique shadow-2xl text-cream-ivory max-w-xl w-full relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-antique to-transparent" />

              <span className="font-ceremonial text-sm sm:text-base tracking-[0.3em] text-gold-champagne uppercase font-bold block mb-1">
                {muhurtham.day}
              </span>

              <div className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-gold-light tracking-wide drop-shadow-md my-2">
                {muhurtham.date}
              </div>

              <div className="h-[1px] w-32 bg-gold-antique/60 mx-auto my-3" />

              <div className="inline-flex items-center space-x-2 text-gold-champagne font-display font-semibold text-lg sm:text-2xl">
                <Clock className="w-5 h-5 text-gold-antique animate-pulse" />
                <span>{muhurtham.timeWindow}</span>
              </div>
            </div>
          </div>

          {/* Vedic Astrology / Panchangam Attributes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto my-6 text-center">
            <div className="p-3.5 rounded-xl bg-cream-warm border border-gold-antique/50 shadow-sm">
              <div className="flex items-center justify-center space-x-1.5 text-gold-dark text-xs uppercase tracking-widest font-semibold mb-1">
                <Star className="w-3.5 h-3.5 text-maroon" />
                <span>Nakshatram</span>
              </div>
              <p className="font-heading font-bold text-maroon text-base sm:text-lg">
                {muhurtham.nakshatra}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-cream-warm border border-gold-antique/50 shadow-sm">
              <div className="flex items-center justify-center space-x-1.5 text-gold-dark text-xs uppercase tracking-widest font-semibold mb-1">
                <Moon className="w-3.5 h-3.5 text-maroon" />
                <span>Tithi</span>
              </div>
              <p className="font-heading font-bold text-maroon text-base sm:text-lg">
                {muhurtham.tithi}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-cream-warm border border-gold-antique/50 shadow-sm">
              <div className="flex items-center justify-center space-x-1.5 text-gold-dark text-xs uppercase tracking-widest font-semibold mb-1">
                <Compass className="w-3.5 h-3.5 text-maroon" />
                <span>Lagnam</span>
              </div>
              <p className="font-heading font-bold text-maroon text-base sm:text-lg">
                {muhurtham.lagna}
              </p>
            </div>
          </div>

          {/* Live Countdown Timer */}
          <div className="mt-8">
            <CountdownTimer targetDateIso={eventDateIso} />
          </div>

          {/* Add to Calendar Action Buttons */}
          <div className="mt-8 pt-4 border-t border-gold-antique/30 flex flex-wrap items-center justify-center gap-3">
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-maroon text-gold-champagne font-heading font-semibold text-xs sm:text-sm tracking-wider uppercase hover:bg-maroon-dark border border-gold-antique transition-all shadow-md hover:scale-105"
            >
              <Calendar className="w-4 h-4 text-gold-antique" />
              <span>Add to Google Calendar</span>
            </a>

            <button
              onClick={handleDownloadIcs}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-cream-warm text-maroon-deep font-heading font-semibold text-xs sm:text-sm tracking-wider uppercase hover:bg-gold-champagne/40 border border-gold-antique transition-all shadow-md hover:scale-105"
            >
              <Calendar className="w-4 h-4 text-maroon" />
              <span>Download iCal / Outlook (.ics)</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
